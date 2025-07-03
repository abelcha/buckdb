use buckdb_executor::{QueryRequest, Server, json_error};
use std::sync::Arc;
use std::thread;
use tiny_http::{Header, Method, Response, Server as HttpServer};
use uuid::Uuid;

// Extract session_id from cookies
fn extract_session_from_cookies(cookie_header: &str) -> Option<String> {
    for cookie in cookie_header.split(';') {
        let cookie = cookie.trim();
        if cookie.starts_with("session_id=") {
            let session_id = cookie[11..].trim(); // Remove "session_id="
            if !session_id.is_empty() {
                return Some(session_id.to_string());
            }
        }
    }
    None
}

// Get or generate session ID
fn get_session_id(headers: &[Header]) -> String {
    // Check for existing session in cookies
    for header in headers {
        if header.field.as_str().to_ascii_lowercase() == "cookie" {
            if let Some(session_id) = extract_session_from_cookies(header.value.as_str()) {
                return session_id;
            }
        }
    }

    // Generate new session ID
    let unknown = "unknown".to_string();
    let browser_agent = headers
        .iter()
        .find(|h| h.field.as_str().to_ascii_lowercase() == "user-agent")
        .map(|h| h.value.as_str())
        .unwrap_or(&unknown);
    
    let timestamp = std::time::SystemTime::now()
        .duration_since(std::time::UNIX_EPOCH)
        .unwrap()
        .as_secs();
    let random_id = Uuid::new_v4().to_string().split_off(8);
    format!("{}-{}-{}", browser_agent, timestamp, random_id)
}

fn main() {
    let server = Arc::new(Server::new());
    let env_port = std::env::var("PORT").unwrap_or("8080".to_string());
    let http_server = HttpServer::http(format!("127.0.0.1:{}", env_port)).unwrap();
    println!("Server running on http://127.0.0.1:{}", env_port);

    for mut request in http_server.incoming_requests() {
        let server = Arc::clone(&server);
        
        thread::spawn(move || {
            let method = request.method();
            let url = request.url();
            let path = url.split('?').next().unwrap_or(url);
            let headers: Vec<Header> = request.headers().iter().cloned().collect();

            match (method, path) {
                (&Method::Post, "/query") | (&Method::Post, "/duckdb") => {
                    // Get session ID
                    let session_id = get_session_id(&headers);
                    
                    // Read request body using as_reader() instead of into_reader()
                    let mut body = String::new();
                    match request.as_reader().read_to_string(&mut body) {
                        Ok(_) => {
                            println!("Received JSON body: {}", body);
                            
                            let query_request = QueryRequest {
                                session_id: session_id.clone(),
                                sql: body,
                            };
                            
                            println!("Parsed SQL: '{}'", query_request.sql);
                            
                            match server.execute_query(query_request) {
                                Ok((session_id, json_response)) => {
                                    let cookie_value = format!("session_id={}; Path=/; HttpOnly; SameSite=Lax", session_id);
                                    let response = Response::from_string(json_response.clone())
                                        .with_header(Header::from_bytes(&b"Content-Type"[..], &b"application/json"[..]).unwrap())
                                        .with_header(Header::from_bytes(&b"Access-Control-Allow-Origin"[..], &b"*"[..]).unwrap())
                                        .with_header(Header::from_bytes(&b"Set-Cookie"[..], cookie_value.as_bytes()).unwrap());
                                    
                                    let _ = request.respond(response);
                                    println!("Response sent: {}", json_response.len());
                                }
                                Err(error) => {
                                    let error_response = error.clone(); // error is already JSON formatted
                                    let response = Response::from_string(error_response)
                                        .with_status_code(500)
                                        .with_header(Header::from_bytes(&b"Content-Type"[..], &b"application/json"[..]).unwrap())
                                        .with_header(Header::from_bytes(&b"Access-Control-Allow-Origin"[..], &b"*"[..]).unwrap());
                                    
                                    let _ = request.respond(response);
                                    println!("Error sent: {}", error);
                                }
                            }
                        }
                        Err(e) => {
                            let error_response = json_error!("Failed to read request body:", e);
                            let response = Response::from_string(error_response)
                                .with_status_code(400)
                                .with_header(Header::from_bytes(&b"Content-Type"[..], &b"application/json"[..]).unwrap())
                                .with_header(Header::from_bytes(&b"Access-Control-Allow-Origin"[..], &b"*"[..]).unwrap());
                            
                            let _ = request.respond(response);
                            println!("Error reading request body: {}", e);
                        }
                    }
                }
                (&Method::Options, "/query") => {
                    let response = Response::from_string("")
                        .with_header(Header::from_bytes(&b"Access-Control-Allow-Origin"[..], &b"*"[..]).unwrap())
                        .with_header(Header::from_bytes(&b"Access-Control-Allow-Methods"[..], &b"POST, OPTIONS"[..]).unwrap())
                        .with_header(Header::from_bytes(&b"Access-Control-Allow-Headers"[..], &b"Content-Type"[..]).unwrap());
                    let _ = request.respond(response);
                }
                _ => {
                    let response = Response::from_string("Not Found")
                        .with_status_code(404)
                        .with_header(Header::from_bytes(&b"Access-Control-Allow-Origin"[..], &b"*"[..]).unwrap());
                    let _ = request.respond(response);
                }
            }
        });
    }
}
