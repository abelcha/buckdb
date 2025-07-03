//! BuckDB Executor Library
//!
//! This library provides the core functionality for managing isolated DuckDB instances
//! per browser session with resource limiting and filesystem isolation.

pub mod error_utils;
mod result_serializer;

use duckdb::{Connection, Result as DuckResult};
use result_serializer::ResultSerializer;

// The json_error macro is automatically available at crate root due to #[macro_export]
use std::collections::HashMap;
use std::path::{Path, PathBuf};
use std::sync::{Arc, Mutex};
use std::thread;
use std::time::{Duration, Instant};
use std::{env, fs};

/// Request structure for SQL queries
#[derive(Debug)]
pub struct QueryRequest {
    pub session_id: String,
    pub sql: String,
}

/// Individual session managing a DuckDB connection
pub struct Session {
    pub id: String,
    pub connection: Connection,
    pub data_path: PathBuf,
    pub last_accessed: Instant,
}

impl Session {
    /// Create a new session with isolated filesystem and memory limits
    pub fn new(id: String) -> DuckResult<Self> {
        let tempdir = "/tmp/buckdb";
        let data_path = PathBuf::from(format!("{}/session_{}", tempdir, id));

        // Create isolated directory
        if let Err(e) = fs::create_dir_all(&data_path) {
            return Err(duckdb::Error::ToSqlConversionFailure(Box::new(
                std::io::Error::new(
                    std::io::ErrorKind::Other,
                    format!("Failed to create session directory: {}", e),
                ),
            )));
        }
        let db_path = data_path.join("session.db");
        let new_cwd = Path::new(&data_path);
        env::set_current_dir(new_cwd).expect("Failed to set current working directory");

        // Verify the current working directory
        let cwd = env::current_dir();
        println!("Current working directory: {:?}", cwd);
        // Create DuckDB connection with security configuration
        let config = duckdb::Config::default()
            // .with("allowed_paths", "/tmp")?
            // .with("home_directory", format!("'{}'", data_path.to_string_lossy()))?
            // .with(key, value)
            // .enable_external_access(false)?
            .max_memory("1024MB")?
            .threads(2)?;

        let connection = match Connection::open_with_flags(&db_path, config) {
            Ok(conn) => conn,
            Err(e) => {
                return Err(duckdb::Error::ToSqlConversionFailure(Box::new(
                    std::io::Error::new(
                        std::io::ErrorKind::Other,
                        format!("Failed to create DuckDB connection: {}", e),
                    ),
                )))
            }
        };
        if let Err(e) = connection.execute_batch(&format!(
            "SET allowed_directories = ['{}']; SET home_directory = '{}'; ",
            data_path.display(),
            data_path.display()
        )) {
            return Err(duckdb::Error::ToSqlConversionFailure(Box::new(
                std::io::Error::new(
                    std::io::ErrorKind::Other,
                    format!("Failed to set security configuration: {}", e),
                ),
            )));
        }

        // Load default extensions
        let extensions = ["spatial", "httpfs", "sqlite", "hostfs from community"];
        for ext in &extensions {
            println!("Loading extension: {}", ext);
            if let Err(e) = connection.execute_batch(&format!(
                "INSTALL {}; LOAD {};",
                ext,
                ext.split(" ").next().unwrap()
            )) {
                println!("Warning: Failed to load extension {}: {}", ext, e);
            }
        }

        Ok(Session {
            id,
            connection,
            data_path,
            last_accessed: Instant::now(),
        })
    }

    /// Helper function to format Arrow data types in a clean way
    fn format_data_type(data_type: &arrow::datatypes::DataType) -> String {
        use arrow::datatypes::DataType;
        match data_type {
            DataType::List(field) => format!("List<{}>", Self::format_data_type(field.data_type())),
            DataType::LargeList(field) => {
                format!("LargeList<{}>", Self::format_data_type(field.data_type()))
            }
            DataType::Struct(fields) => {
                let field_types: Vec<String> = fields
                    .iter()
                    .map(|f| format!("{}: {}", f.name(), Self::format_data_type(f.data_type())))
                    .collect();
                format!("Struct<{}>", field_types.join(", "))
            }
            DataType::Map(field, _) => {
                format!("Map<{}>", Self::format_data_type(field.data_type()))
            }
            _ => data_type.to_string(),
        }
    }

    /// Execute a SQL query and return results as JSON string with metadata
    pub fn execute_query(&mut self, sql: &str) -> Result<String, String> {
        println!("Executing query: {}", sql);
        self.last_accessed = Instant::now();

        // Split SQL by semicolon and execute all but the last statement
        let sqsl_statements: Vec<&str> = sql.split(';').filter(|s| !s.trim().is_empty()).collect();
        println!("Split SQL: {:?}", sqsl_statements);
        let n = sqsl_statements.len();

        // Execute all sqsl_statements except the last one
        for stmt_sql in &sqsl_statements[..n - 1] {
            if !stmt_sql.trim().is_empty() {
                if let Err(e) = self.connection.execute(stmt_sql, []) {
                    return Err(json_error!("Failed to execute statement: ", e));
                }
            }
        }
        let st = sqsl_statements.last().unwrap_or(&"select []");
        println!("STATEMENT: {}", st);
        let mut stmt = match self.connection.prepare(st) {
            Ok(stmt) => stmt,
            Err(e) => return Err(json_error!("Failed to prepare statement: ", e)),
        };
        // Execute the last statement and get arrow results
        let arrow = match stmt.query_arrow([]) {
            Ok(arrow) => arrow,
            Err(e) => return Err(json_error!("Failed to execute query: ", e)),
        };

        // Collect all batches
        let batches: Vec<arrow::record_batch::RecordBatch> = arrow.collect();

        if batches.is_empty() {
            return Ok("{\"meta\": [], \"data\": []}".to_string());
        }

        // Build metadata from schema
        let schema = batches[0].schema();
        let meta = schema
            .fields()
            .iter()
            .map(|f| {
                format!(
                    "{{\"name\": \"{}\", \"type\": \"{}\"}}",
                    f.name(),
                    Self::format_data_type(f.data_type())
                )
            })
            .collect::<Vec<_>>();

        // Use ResultSerializer to serialize data as arrays
        let serializer = ResultSerializer::new();
        let serialized_data = serializer
            .serialize_internal(batches, true)
            .map_err(|e| json_error!("Failed to serialize data", e))?;

        let data_json = serde_json::to_string(&serialized_data)
            .map_err(|e| json_error!("Failed to convert to JSON", e))?;

        Ok(format!(
            "{{\"meta\": [{}], \"data\": {}}}",
            meta.join(","),
            data_json
        ))
    }

    /// Check if session has expired (30 minutes of inactivity)
    pub fn is_expired(&self) -> bool {
        let elapsed = self.last_accessed.elapsed();
        println!(
            "Checking session expiry. Time since last access: {:?}",
            elapsed
        );
        let is_expired = elapsed > Duration::from_secs(30 * 60);
        println!("Session expired: {}", is_expired);
        is_expired
    }
}

impl Drop for Session {
    fn drop(&mut self) {
        // Clean up session directory
        if self.data_path.exists() {
            let _ = fs::remove_dir_all(&self.data_path);
        }
    }
}

/// Server managing multiple sessions
pub struct Server {
    sessions: Arc<Mutex<HashMap<String, Session>>>,
}

impl Server {
    /// Create a new server instance
    pub fn new() -> Self {
        let server = Server {
            sessions: Arc::new(Mutex::new(HashMap::new())),
        };

        // Start cleanup thread
        let sessions_clone = Arc::clone(&server.sessions);
        thread::spawn(move || {
            loop {
                thread::sleep(Duration::from_secs(60)); // Check every minute
                let mut sessions = match sessions_clone.lock() {
                    Ok(sessions) => sessions,
                    Err(poisoned) => {
                        // Recover from poisoned mutex by taking the guard
                        poisoned.into_inner()
                    }
                };
                sessions.retain(|_, session| !session.is_expired());
            }
        });

        server
    }

    /// Execute a query, creating a new session if needed
    /// Returns (session_id, query_result)
    pub fn execute_query(&self, request: QueryRequest) -> Result<(String, String), String> {
        let mut sessions = match self.sessions.lock() {
            Ok(sessions) => sessions,
            Err(poisoned) => {
                // Recover from poisoned mutex by taking the guard
                poisoned.into_inner()
            }
        };
        let session_id = match request.session_id {
            id if sessions.contains_key(&id) => id,
            _ => {
                // Create new session
                match Session::new(request.session_id) {
                    Ok(session) => {
                        let id = session.id.replace("/", "").clone();
                        println!("Created new session with id: {}", id);
                        sessions.insert(id.clone(), session);
                        id
                    }
                    Err(e) => {
                        return Err(json_error!("Failed to create session: ", e));
                    }
                }
            }
        };
        if let Some(session) = sessions.get_mut(&session_id) {
            match session.execute_query(&request.sql) {
                Ok(result) => Ok((session_id, result)),
                Err(e) => Err(e),
            }
        } else {
            Err("Session not found".to_string())
        }
    }

    /// Get the number of active sessions
    pub fn session_count(&self) -> usize {
        match self.sessions.lock() {
            Ok(sessions) => sessions.len(),
            Err(poisoned) => poisoned.into_inner().len(),
        }
    }

    /// Clean up expired sessions manually
    pub fn cleanup_expired_sessions(&self) {
        let mut sessions = match self.sessions.lock() {
            Ok(sessions) => sessions,
            Err(poisoned) => poisoned.into_inner(),
        };
        sessions.retain(|_, session| !session.is_expired());
    }

    // Method for testing - allows access to sessions for test manipulation
    #[doc(hidden)]
    pub fn get_sessions_for_testing(&self) -> Arc<Mutex<HashMap<String, Session>>> {
        Arc::clone(&self.sessions)
    }
}

impl Default for Server {
    fn default() -> Self {
        Self::new()
    }
}
