//! Result Serializer for DuckDB Query Results
//!
//! This module provides functionality to serialize DuckDB query results to JSON format,
//! supporting both object and array serialization modes.

use arrow::array::Array;
use arrow::datatypes::DataType;
use base64::{Engine as _, engine::general_purpose};
use serde_json::{Map, Value as JsonValue};

/// Result serializer for converting DuckDB query results to JSON
pub struct ResultSerializer {
    /// Whether to set invalid values (NaN, Inf) to null
    pub set_invalid_values_to_null: bool,
}

impl ResultSerializer {
    /// Create a new ResultSerializer instance
    pub fn new() -> Self {
        Self {
            set_invalid_values_to_null: true,
        }
    }

    /// Serialize query result internally
    pub fn serialize_internal(
        &self,
        batches: Vec<arrow::record_batch::RecordBatch>,
        values_as_array: bool,
    ) -> Result<JsonValue, String> {
        let mut result_array = Vec::new();

        for batch in batches {
            self.serialize_chunk(&batch, &mut result_array, values_as_array)?;
        }

        Ok(JsonValue::Array(result_array))
    }

    /// Serialize a single chunk (RecordBatch)
    fn serialize_chunk(
        &self,
        chunk: &arrow::record_batch::RecordBatch,
        append_root: &mut Vec<JsonValue>,
        values_as_array: bool,
    ) -> Result<(), String> {
        let row_count = chunk.num_rows();
        let schema = chunk.schema();
        let field_names: Vec<String> = schema.fields().iter().map(|f| f.name().clone()).collect();
        let field_types: Vec<DataType> = schema.fields().iter().map(|f| f.data_type().clone()).collect();

        for row_idx in 0..row_count {
            let row_value = if values_as_array {
                self.serialize_row_as_array(chunk, row_idx, &field_types)?
            } else {
                self.serialize_row_as_object(chunk, row_idx, &field_names, &field_types)?
            };
            append_root.push(row_value);
        }

        Ok(())
    }

    /// Serialize a row as an array
    fn serialize_row_as_array(
        &self,
        chunk: &arrow::record_batch::RecordBatch,
        row_idx: usize,
        types: &[DataType],
    ) -> Result<JsonValue, String> {
        let column_count = chunk.num_columns();
        let mut row_array = Vec::new();

        for col_idx in 0..column_count {
            let column = chunk.column(col_idx);
            let data_type = &types[col_idx];
            let value = self.serialize_value(column, row_idx, data_type)?;
            row_array.push(value);
        }

        Ok(JsonValue::Array(row_array))
    }

    /// Serialize a row as an object
    fn serialize_row_as_object(
        &self,
        chunk: &arrow::record_batch::RecordBatch,
        row_idx: usize,
        names: &[String],
        types: &[DataType],
    ) -> Result<JsonValue, String> {
        let column_count = chunk.num_columns();
        let mut row_object = Map::new();

        for col_idx in 0..column_count {
            let column = chunk.column(col_idx);
            let field_name = &names[col_idx];
            let data_type = &types[col_idx];
            let value = self.serialize_value(column, row_idx, data_type)?;
            row_object.insert(field_name.clone(), value);
        }

        Ok(JsonValue::Object(row_object))
    }

    /// Serialize a single value based on its Arrow data type
    fn serialize_value(
        &self,
        column: &dyn Array,
        row_idx: usize,
        data_type: &DataType,
    ) -> Result<JsonValue, String> {
        if column.is_null(row_idx) {
            return Ok(JsonValue::Null);
        }

        match data_type {
            DataType::Null => Ok(JsonValue::Null),
            
            DataType::Boolean => {
                let array = column.as_any().downcast_ref::<arrow::array::BooleanArray>()
                    .ok_or("Failed to downcast to BooleanArray")?;
                Ok(JsonValue::Bool(array.value(row_idx)))
            }
            
            DataType::Int8 => {
                let array = column.as_any().downcast_ref::<arrow::array::Int8Array>()
                    .ok_or("Failed to downcast to Int8Array")?;
                Ok(JsonValue::Number(serde_json::Number::from(array.value(row_idx) as i64)))
            }
            
            DataType::Int16 => {
                let array = column.as_any().downcast_ref::<arrow::array::Int16Array>()
                    .ok_or("Failed to downcast to Int16Array")?;
                Ok(JsonValue::Number(serde_json::Number::from(array.value(row_idx) as i64)))
            }
            
            DataType::Int32 => {
                let array = column.as_any().downcast_ref::<arrow::array::Int32Array>()
                    .ok_or("Failed to downcast to Int32Array")?;
                Ok(JsonValue::Number(serde_json::Number::from(array.value(row_idx) as i64)))
            }
            
            DataType::Int64 => {
                let array = column.as_any().downcast_ref::<arrow::array::Int64Array>()
                    .ok_or("Failed to downcast to Int64Array")?;
                Ok(JsonValue::Number(serde_json::Number::from(array.value(row_idx))))
            }
            
            DataType::UInt8 => {
                let array = column.as_any().downcast_ref::<arrow::array::UInt8Array>()
                    .ok_or("Failed to downcast to UInt8Array")?;
                Ok(JsonValue::Number(serde_json::Number::from(array.value(row_idx) as u64)))
            }
            
            DataType::UInt16 => {
                let array = column.as_any().downcast_ref::<arrow::array::UInt16Array>()
                    .ok_or("Failed to downcast to UInt16Array")?;
                Ok(JsonValue::Number(serde_json::Number::from(array.value(row_idx) as u64)))
            }
            
            DataType::UInt32 => {
                let array = column.as_any().downcast_ref::<arrow::array::UInt32Array>()
                    .ok_or("Failed to downcast to UInt32Array")?;
                Ok(JsonValue::Number(serde_json::Number::from(array.value(row_idx) as u64)))
            }
            
            DataType::UInt64 => {
                let array = column.as_any().downcast_ref::<arrow::array::UInt64Array>()
                    .ok_or("Failed to downcast to UInt64Array")?;
                Ok(JsonValue::Number(serde_json::Number::from(array.value(row_idx))))
            }
            
            DataType::Float32 => {
                let array = column.as_any().downcast_ref::<arrow::array::Float32Array>()
                    .ok_or("Failed to downcast to Float32Array")?;
                let val = array.value(row_idx) as f64;
                if val.is_nan() || val.is_infinite() {
                    if self.set_invalid_values_to_null {
                        Ok(JsonValue::Null)
                    } else {
                        Ok(JsonValue::String(val.to_string()))
                    }
                } else {
                    Ok(JsonValue::Number(serde_json::Number::from_f64(val)
                        .unwrap_or(serde_json::Number::from(0))))
                }
            }
            
            DataType::Float64 => {
                let array = column.as_any().downcast_ref::<arrow::array::Float64Array>()
                    .ok_or("Failed to downcast to Float64Array")?;
                let val = array.value(row_idx);
                if val.is_nan() || val.is_infinite() {
                    if self.set_invalid_values_to_null {
                        Ok(JsonValue::Null)
                    } else {
                        Ok(JsonValue::String(val.to_string()))
                    }
                } else {
                    Ok(JsonValue::Number(serde_json::Number::from_f64(val)
                        .unwrap_or(serde_json::Number::from(0))))
                }
            }
            
            DataType::Utf8 => {
                let array = column.as_any().downcast_ref::<arrow::array::StringArray>()
                    .ok_or("Failed to downcast to StringArray")?;
                Ok(JsonValue::String(array.value(row_idx).to_string()))
            }
            
            DataType::LargeUtf8 => {
                let array = column.as_any().downcast_ref::<arrow::array::LargeStringArray>()
                    .ok_or("Failed to downcast to LargeStringArray")?;
                Ok(JsonValue::String(array.value(row_idx).to_string()))
            }
            
            DataType::Binary => {
                let array = column.as_any().downcast_ref::<arrow::array::BinaryArray>()
                    .ok_or("Failed to downcast to BinaryArray")?;
                let bytes = array.value(row_idx);
                // Convert binary to base64 or hex string
                Ok(JsonValue::String(general_purpose::STANDARD.encode(bytes)))
            }
            
            DataType::LargeBinary => {
                let array = column.as_any().downcast_ref::<arrow::array::LargeBinaryArray>()
                    .ok_or("Failed to downcast to LargeBinaryArray")?;
                let bytes = array.value(row_idx);
                Ok(JsonValue::String(general_purpose::STANDARD.encode(bytes)))
            }
            
            DataType::Date32 | DataType::Date64 => {
                // Convert to string representation
                Ok(JsonValue::String(format!("{:?}", column.slice(row_idx, 1))))
            }
            
            DataType::Time32(_) | DataType::Time64(_) => {
                Ok(JsonValue::String(format!("{:?}", column.slice(row_idx, 1))))
            }
            
            DataType::Timestamp(_, _) => {
                Ok(JsonValue::String(format!("{:?}", column.slice(row_idx, 1))))
            }
            
            DataType::Interval(_) => {
                Ok(JsonValue::String(format!("{:?}", column.slice(row_idx, 1))))
            }
            
            DataType::List(field) => {
                let array = column.as_any().downcast_ref::<arrow::array::ListArray>()
                    .ok_or("Failed to downcast to ListArray")?;
                let list_array = array.value(row_idx);
                let mut list_values = Vec::new();
                
                for i in 0..list_array.len() {
                    let value = self.serialize_value(list_array.as_ref(), i, field.data_type())?;
                    list_values.push(value);
                }
                
                Ok(JsonValue::Array(list_values))
            }
            
            DataType::LargeList(field) => {
                let array = column.as_any().downcast_ref::<arrow::array::LargeListArray>()
                    .ok_or("Failed to downcast to LargeListArray")?;
                let list_array = array.value(row_idx);
                let mut list_values = Vec::new();
                
                for i in 0..list_array.len() {
                    let value = self.serialize_value(list_array.as_ref(), i, field.data_type())?;
                    list_values.push(value);
                }
                
                Ok(JsonValue::Array(list_values))
            }
            
            DataType::Struct(fields) => {
                let array = column.as_any().downcast_ref::<arrow::array::StructArray>()
                    .ok_or("Failed to downcast to StructArray")?;
                
                // Check if all field names are empty (unnamed struct)
                let all_keys_empty = fields.iter().all(|f| f.name().is_empty());
                
                if all_keys_empty {
                    // Create array for unnamed struct
                    let mut struct_array = Vec::new();
                    for (i, field) in fields.iter().enumerate() {
                        let child_column = array.column(i);
                        let value = self.serialize_value(child_column.as_ref(), row_idx, field.data_type())?;
                        struct_array.push(value);
                    }
                    Ok(JsonValue::Array(struct_array))
                } else {
                    // Create object for named struct
                    let mut struct_object = Map::new();
                    for (i, field) in fields.iter().enumerate() {
                        let child_column = array.column(i);
                        let value = self.serialize_value(child_column.as_ref(), row_idx, field.data_type())?;
                        struct_object.insert(field.name().clone(), value);
                    }
                    Ok(JsonValue::Object(struct_object))
                }
            }
            
            DataType::Map(field, _) => {
                let array = column.as_any().downcast_ref::<arrow::array::MapArray>()
                    .ok_or("Failed to downcast to MapArray")?;
                let map_array = array.value(row_idx);
                let mut map_object = Map::new();
                
                // Map arrays contain struct arrays with key-value pairs
                if let DataType::Struct(struct_fields) = field.data_type() {
                    if struct_fields.len() == 2 {
                        let struct_array = map_array.as_any().downcast_ref::<arrow::array::StructArray>()
                            .ok_or("Failed to downcast map entries to StructArray")?;
                        
                        let key_column = struct_array.column(0);
                        let value_column = struct_array.column(1);
                        
                        for i in 0..struct_array.len() {
                            // Get key as string
                            let key_value = self.serialize_value(key_column.as_ref(), i, struct_fields[0].data_type())?;
                            let key_str = match key_value {
                                JsonValue::String(s) => s,
                                _ => key_value.to_string(),
                            };
                            
                            // Get value
                            let value = self.serialize_value(value_column.as_ref(), i, struct_fields[1].data_type())?;
                            map_object.insert(key_str, value);
                        }
                    }
                }
                
                Ok(JsonValue::Object(map_object))
            }
            
            DataType::Union(_, _) => {
                // Union types are complex, convert to string for now
                Ok(JsonValue::String(format!("{:?}", column.slice(row_idx, 1))))
            }
            
            DataType::Dictionary(_, _) => {
                // Dictionary arrays need special handling
                Ok(JsonValue::String(format!("{:?}", column.slice(row_idx, 1))))
            }
            
            DataType::Decimal128(_, _) | DataType::Decimal256(_, _) => {
                // Convert decimal to string to preserve precision
                Ok(JsonValue::String(format!("{:?}", column.slice(row_idx, 1))))
            }
            
            // Unsupported types - convert to string or null
            _ => {
                if self.set_invalid_values_to_null {
                    Ok(JsonValue::Null)
                } else {
                    Ok(JsonValue::String(format!("Unsupported type: {:?}", data_type)))
                }
            }
        }
    }
}

impl Default for ResultSerializer {
    fn default() -> Self {
        Self::new()
    }
}