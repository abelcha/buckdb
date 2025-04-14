import { DNumericField, DVarcharField } from "../src/.buck/types";

// // Base Field interface that all DField types must respect
// interface Field {
//     // Common properties for all fields (can be empty or extended later)
//     // e.g., optional metadata
//     description?: string;
// }

// // Generic DField interface requiring inferredTo
// interface DField<T> extends Field {
//     inferredTo: T; // Enforces that every DField specifies its native type
// }

// // Specific field types respecting DField
// export interface DVarchar {
//     // Additional DVarcharField-specific properties
//     maxLength?: number;
// }
// type DVarcharField = DVarchar & { inferredTo: string };
// export interface DNumeric {
//     // Additional DNumericField-specific properties
//     min?: number;
//     max?: number;
// }
// // type DNumericField = DNumeric & { inferredTo: number };



// Helper type to extract the inferred type
type GetInferredType<T> = T extends { inferredTo: infer U } ? U : never;

// Main generic type transformer
type MapNativeType<T> = T extends boolean[]
    ? { [K in keyof T]: GetInferredType<T[K]> }
    : T extends object
    ? { [K in keyof T]: GetInferredType<T[K]> }
    : never;

// Example usage
type ArrayExample = [DNumericField, DVarcharField];
type ObjectExample = {
    name: DVarcharField;
    age: DNumericField;
};

// Test types
type MappedArray = MapNativeType<ArrayExample>;    // [number, string]
type MappedObject = MapNativeType<ObjectExample>;  // { name: string; age: number }

// Verification
const testArray: MappedArray = [42, 'hello'];       // Works
const testObject: MappedObject = {                  // Works
    name: 'John',
    age: 30,
};

type xx = MapNativeType<[DNumericField, DVarcharField]>

// type State = "initialized" | "processing" | "succeeded" | "failed";

// interface Pipeline<T extends State> {
//     state: T;
//     start(this: Pipeline<"initialized">): Pipeline<"processing">;
//     finish(this: Pipeline<"processing">): Pipeline<"succeeded">;
//     retry(this: Pipeline<"failed">): Pipeline<"processing">;
// }

// declare const pipe: Pipeline<"initialized">;

// pipe.start()
//     .retry().
// // ; // Valid: "initialized" -> "processing"
// // pipe.retry(); // Invalid: "retry" requires "failed", but p is "initialized"