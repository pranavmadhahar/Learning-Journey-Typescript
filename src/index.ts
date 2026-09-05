// INSTALLS:
// npm init -y
// npm install -D typescript
// npx tsc --init

// then run: npx tsc --noEmit

// without npx tsc --init:
// npx tsc --noEmit basics.ts



function greet(name: string): string {
    return `Hello, ${name}!`;
}
console.log(greet("World"));

const user: string = "Alice";

console.log(greet(user));


// TYPE ANNOTATION & TYPE INFERENCE

// Type Annotation
let age: number = 30;
let isStudent: boolean = true;
let hobbies: string[] = ["reading", "gaming", "coding"];
let person: { name: string; age: number } = { name: "Bob", age: 25 };

// Type Inference
let city = "New York"; // inferred as string
let score = 95; // inferred as number
let isActive = false; // inferred as boolean
let colors = ["red", "green", "blue"]; // inferred as string[]
let userInfo = { username: "john_doe", email: "john@example.com" }; // inferred as { username: string; email: string }


// UNION TYPES

function printId(id: number | string) {
    console.log(`ID: ${id}`);
}

printId(123); // valid
printId("abc"); // valid
// printId(true); // Error: Argument of type 'boolean' is not assignable to parameter of type 'string | number'.


// LITERAL TYPES: datatype  is specific literal value

let apiRequestStatus: "success" | "error" | "pending" = "pending";


// INTERFACES

interface Username {
    username: string;
    email: string;
}

// or 

// type Username = {
//     username: string;
//     email: string;
// };

const username: Username = {
    username: "jane_doe",
    email: "jane@example.com"
};


// AVOID USING ANY: NOT RECOMMENDED

const orders = ["12, 34", "56, 78", "90, 12"];

// let currentOrder: any; // Avoid using 'any' type 
// let currentOrder: unknown; unknown type is safer than any, but still not ideal

let currentOrder: string | undefined;

for (const order of orders) {
    if (order === "56") {
        currentOrder = order;
        break;
    }
}

console.log(currentOrder); // Output: undefined (if "56" is not found in the orders array)


// TYPE NARROWING

function processValue(value: string | number) {
    if (typeof value === "string") {
        console.log(`String value: ${value.toUpperCase()}`);
    } else {
        console.log(`Number value: ${value.toFixed(2)}`);
    }
}

processValue("hello"); // Output: String value: HELLO
processValue(42); // Output: Number value: 42.00

// optional arguments

function greetUser(name: string, age?: number): string {
    if (age !== undefined) {
        return `Hello, ${name}! You are ${age} years old.`;
    }
    return `Hello, ${name}!`;
}

console.log(greetUser("Alice")); // Output: Hello, Alice!
console.log(greetUser("Bob", 25)); // Output: Hello, Bob! You are 25 years old.


// TYPE GUARDS 

type coffeeOrder = {
    size: "small" | "medium" | "large";
    type: "espresso" | "latte" | "cappuccino";
    sugar?: boolean; // optional property
};

function isCoffeeOrder(obj: any): obj is coffeeOrder {
    return (
        typeof obj === "object" &&
        obj !== null &&
        (obj.size === "small" || obj.size === "medium" || obj.size === "large") &&
        (obj.type === "espresso" || obj.type === "latte" || obj.type === "cappuccino")
    );
}

function serveCoffeeOrder(order: coffeeOrder | string) {
    if (typeof order === "string") {
        console.log(`Serving a ${order}.`);
    } else {
        console.log(`Serving a ${order.size} ${order.type}${order.sugar ? " with sugar" : ""}.`);
    }
}

const order1 = { size: "medium", type: "latte", sugar: true };
const order2 = { size: "large", type: "espresso" };

serveCoffeeOrder(order1);
serveCoffeeOrder(order2);


type MasalaChai = {type: "masala"; "spice-level": number};
type GingerChai = {type: "ginger"; "amount": number};
type ElaichiChai = {type: "elaichi"; "aroma": number};

type Chai = MasalaChai | GingerChai | ElaichiChai;

function MakeChai(order: Chai) {
    switch (order.type) {
        case "masala":
            console.log(`Making masala chai with spice level ${order["spice-level"]}.`);
            break;
        case "ginger":
            console.log(`Making ginger chai with amount ${order.amount}.`);
            break;
        case "elaichi":
            console.log(`Making elaichi chai with aroma level ${order.aroma}.`);
            break;
        default:
            const _exhaustiveCheck: never = order; // This line ensures all cases are handled
            throw new Error(`Unhandled chai type: ${_exhaustiveCheck}`);
    }
}

const masalaOrder: MasalaChai = { type: "masala", "spice-level": 5 };
const gingerOrder: GingerChai = { type: "ginger", amount: 3 };
const elaichiOrder: ElaichiChai = { type: "elaichi", aroma: 7 };

MakeChai(masalaOrder);
MakeChai(gingerOrder);
MakeChai(elaichiOrder);


// FORCEFUL TYPE ASSERTION

// example-1:
const inputElement = document.getElementById("myInput") as HTMLInputElement;

if (inputElement) {
    inputElement.value = "Hello, TypeScript!";
}

// example-2:
type book = {
    name: string;
}

let bookString = '{"name": "The Great Gatsby"}';

// Forceful type assertion
let bookObject = JSON.parse(bookString) as book;

console.log(bookObject);


// TRY CATCH


function parseJSON(jsonString: string): any {
    try {
        return JSON.parse(jsonString);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("Failed to parse JSON:", error.message);
        } else {
            console.error("Failed to parse JSON:", error);
        }
    }
}

const validJSON = '{"name": "Alice", "age": 30}';
const invalidJSON = '{"name": "Bob", "age": }';

console.log(parseJSON(validJSON)); // Output: { name: 'Alice', age: 30 }
console.log(parseJSON(invalidJSON)); // Output: Failed to parse JSON: Unexpected token } in JSON at position 20

