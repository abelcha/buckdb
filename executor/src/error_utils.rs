//! Error utilities for JSON formatting
//!
//! This module provides utilities for formatting errors as JSON strings
//! to maintain consistent error response format across the application.

use serde_json::json;

/// Converts an error message to a JSON string format
/// 
/// # Arguments
/// * `error_msg` - The error message to format
/// * `error_type` - Optional error type/category (defaults to "error")
/// 
/// # Returns
/// A JSON string containing the error information
/// 
/// # Example
/// ```
/// let json_error = jsonify_error("Database connection failed", Some("database"));
/// // Returns: {"error":"Database connection failed","type":"database"}
/// ```
pub fn jsonify_error(error_msg: &str, error_type: Option<&str>) -> String {
    let error_obj = json!({
        "error": error_msg,
        "type": error_type.unwrap_or("error")
    });
    
    error_obj.to_string()
}

/// Converts a standard Error trait object to a JSON string
/// 
/// # Arguments
/// * `error` - Any error that implements std::error::Error or Display
/// * `error_type` - Optional error type/category
/// 
/// # Returns
/// A JSON string containing the error information
pub fn jsonify_std_error<E: std::fmt::Display>(error: E, error_type: Option<&str>) -> String {
    jsonify_error(&error.to_string(), error_type)
}

/// Macro for quick JSON error formatting
/// 
/// # Usage
/// ```
/// return Err(json_error!("Failed to connect"));
/// return Err(json_error!("Database error", "database"));
/// return Err(json_error!(some_error));
/// ```
#[macro_export]
macro_rules! json_error {
    // For string literals
    ($msg:literal) => {
        $crate::error_utils::jsonify_error($msg, None)
    };
    ($msg:literal, $error_type:literal) => {
        $crate::error_utils::jsonify_error($msg, Some($error_type))
    };
    // For string literal with error object
    ($msg:literal, $error:expr) => {
        $crate::error_utils::jsonify_error(&format!("{}{}", $msg, $error), None)
    };
    // For error objects (expressions)
    ($error:expr) => {
        $crate::error_utils::jsonify_std_error($error, None)
    };
    ($error:expr, $error_type:literal) => {
        $crate::error_utils::jsonify_std_error($error, Some($error_type))
    };
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_jsonify_error() {
        let result = jsonify_error("Test error", None);
        assert!(result.contains("Test error"));
        assert!(result.contains("error"));
    }

    #[test]
    fn test_jsonify_error_with_type() {
        let result = jsonify_error("Database error", Some("database"));
        assert!(result.contains("Database error"));
        assert!(result.contains("database"));
    }

    #[test]
    fn test_jsonify_std_error() {
        let io_error = std::io::Error::new(std::io::ErrorKind::NotFound, "File not found");
        let result = jsonify_std_error(io_error, Some("io"));
        assert!(result.contains("File not found"));
        assert!(result.contains("io"));
    }
}