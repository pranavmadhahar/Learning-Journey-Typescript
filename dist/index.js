"use strict";
// INSTALLS:
// npm init -y
// npm install -D typescript
// npx tsc --init
Object.defineProperty(exports, "__esModule", { value: true });
// then run: npx tsc --noEmit
// without npx tsc --init:
// npx tsc --noEmit basics.ts
function greet(name) {
    return `Hello, ${name}!`;
}
console.log(greet("World"));
const user = "Alice";
console.log(greet(user));
// TYPE ANNOTATION & TYPE INFERENCE
// Type Annotation
let age = 30;
let isStudent = true;
let hobbies = ["reading", "gaming", "coding"];
let person = { name: "Bob", age: 25 };
// Type Inference
let city = "New York"; // inferred as string
let score = 95; // inferred as number
let isActive = false; // inferred as boolean
let colors = ["red", "green", "blue"]; // inferred as string[]
let userInfo = { username: "john_doe", email: "john@example.com" }; // inferred as { username: string; email: string }
// UNION TYPES
function printId(id) {
    console.log(`ID: ${id}`);
}
printId(123); // valid
printId("abc"); // valid
// printId(true); // Error: Argument of type 'boolean' is not assignable to parameter of type 'string | number'.
// LITERAL TYPES: datatype  is specific literal value
let apiRequestStatus = "pending";
const username = {
    username: "jane_doe",
    email: "jane@example.com"
};
// AVOID USING ANY: NOT RECOMMENDED
const orders = ["12, 34", "56, 78", "90, 12"];
// let currentOrder: any; // Avoid using 'any' type 
// let currentOrder: unknown; unknown type is safer than any, but still not ideal
let currentOrder;
for (const order of orders) {
    if (order === "56") {
        currentOrder = order;
        break;
    }
}
console.log(currentOrder); // Output: undefined (if "56" is not found in the orders array)
// TYPE NARROWING
function processValue(value) {
    if (typeof value === "string") {
        console.log(`String value: ${value.toUpperCase()}`);
    }
    else {
        console.log(`Number value: ${value.toFixed(2)}`);
    }
}
processValue("hello"); // Output: String value: HELLO
processValue(42); // Output: Number value: 42.00
let n = 10;
console.log(typeof n.toFixed(2));
//# sourceMappingURL=index.js.map