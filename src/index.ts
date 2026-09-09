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


// INTERFACES: Commonly used to define object shapes.
// TYPE ALIASES: Can define object shapes as well as unions,
// intersections, literal types, and other type compositions.

interface Username {
    username: string;
    email: string;
}

// use with functions
interface discountCalculator {
    (price: number): number
}

const apply: discountCalculator = (p) => {
    return p * 0.5; 
}


// use with objects
interface teaMachine {
    start(): void;
    stop(): void
}


const machine: teaMachine = {
    start(){
        console.log("start")
    },

    stop(){
        console.log("stop")
    }

}

// use with index signatures
interface chaiRatings{
    [flavour: string]: number
}

const ratings: chaiRatings = {
    masala: 4.5,
    ginger: 5.9
}

// merging in interfaces
interface newUser {
    name: string
}

interface newUser {
    age: number
}

const user1: newUser = {
    name: "Paul",
    age: 45
}


// extend in interface
interface A {a: string}
interface B {b: string}

interface C extends A, B {
    c: boolean
}


// TYPE ALIAS: Type aliases are more suitable for defining complex types.

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

const order1: coffeeOrder  = { size: "medium", type: "latte", sugar: true };
const order2: coffeeOrder = { size: "large", type: "espresso" };

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

// // example-1:
// const inputElement = document.getElementById("myInput") as HTMLInputElement;

// if (inputElement) {
//     inputElement.value = "Hello, TypeScript!";
// }

// example-2:
type book = {
    name: string;
}

let bookString = '{"name": "The Great Gatsby"}';

// Forceful type assertion
let bookObject = JSON.parse(bookString) as book;

console.log(bookObject);

// example-3:
// const strData: string = Data as string; // Forceful type assertion


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


// TYPE ALIASES

// Intersection: types allow you to combine multiple types into one. 
// This is useful when you want to create a new type that has all the properties of the combined types.

type baseChai = {tealeaves: number}
type extra = {masala: number}

type specialChai = baseChai & extra;

const myChai: specialChai = {
    tealeaves: 10,
    masala: 5
};

console.log(myChai); // Output: { tealeaves: 10, masala: 5 }


// READONLY PROPERTIES

type config = {
    readonly apiKey: string;
    readonly endpoint: string;
};

const myConfig: config = {
    apiKey: "12345",
    endpoint: "https://api.example.com"
};

// myConfig.apiKey = "67890"; // Error



// STRUCTURAL TYPING
// TypeScript cares about the shape of an object, not necessarily the name of its type.


// example:1
type Cup = {
    size: string
};

let smallCup: Cup = {
    size: "200ml"
}

let bigCup = {
    size: "500ml",
    material: "steel"
};

smallCup = bigCup


// example:2
type Brew = {
    brewTime: number
};

const coffee = {
    brewTime: 5,
    beans: "Arabica"
}

const chaiBrew: Brew = coffee



// NESTED OBJECT TYPES
// An object type can contain other custom object types.

type Item = {name: string, quantity: number}
type Address = {street: string, pin: number}

type Order = {
    id: string;
    items: Item[];
    address: Address
}


// PARTIAL

type Tea = {
    name: string;
    price: number;
    isHot: boolean
}

const updateChai = (updates: Partial<Tea>) => {
    console.log("updating chai with: ", updates);
}

updateChai({price: 25})
updateChai({isHot: false})
updateChai({})


// REQUIRED

type teaOrder = {
    name? : string;
    quantity?: number
}

const placeOrder = (order: Required<teaOrder>) => {
    console.log(order);
}

placeOrder({name: "masala chai", quantity: 2})


// PICK

type tea = {
    name: string;
    price: number;
    isHot: boolean;
    ingredients: string[]
}

type basicTeaInfo = Pick<tea, "name" | "price">;

const teaInfo: basicTeaInfo = {
    name: "lemon tea",
    price: 50
}


// OMIT

type newTea = {
    name: string;
    price: number;
    isHot: boolean;
    secretIngredients: string
}; 

type publicChai = Omit<newTea, "secretIngredients">



// FUNCTIONS

// define datatypes of params
function makeCoffee(type: string, cups: number){
    console.log(`Making ${cups} cups ${type}`)
}

makeCoffee("arabica", 5)


// define datatype of return value
function count(a: number, b: number): number {
    return a + b
}

// VOID: when fn is not returning any datatype
function logChai(): void {
    console.log(`Chai is ready`)
};

// OPTIONAL & DEFAULT PARAM
function orderChai(type?: string){
    console.log()
};

function orderCoffee(type: string = "arabica"){
    console.log()
};


// ARRAYS, ENUM

const colours: string[] = ["red", 'black', 'yellow', 'blue']
const price: number[] = [20, 30, 40, 50]

// arrays can also be defined like this
const ranks: Array<number> = [1, 3, 6, 9]

// Array of objects

type drinks = {
    name: string;
    price: number
}

const menu : drinks[] = [
    {name: "lemonade", price: 50},
    {name: "fruit-punch", price: 170},   
]


// Readonly array

const cities: readonly string[] = ["delhi", "jaipur"]
// cities.push('banglore') : this will throw error

// Multi-dimentional arrays

const table: number[][] = [
    [1, 3, 5, 7],
    [2, 4, 6, 8],
    [3, 6, 9, 12]
]

// TUPLES

let chaiTuple: [string, number];

chaiTuple = ["ginger", 50]

let userData:[string, number, boolean?];

userData = ['PM', 77]
userData = ['PM', 77, true]

// Readonly Tuple
const location: readonly [number, number] = [25.77, 29.77]


// Named Tuple
const lists: [name: string, price: number] = ["lemonade", 75]


// ENUMS 
// enums are used to restrict the size or options

enum cupSize {
    SMALL,
    MEDIUM,
    LARGE
}

const size = cupSize.LARGE

// auto increment values
// always explicitly define all the values
enum Status {
    PENDING = 100,
    SERVED, // 101 - will auto assign value if not explicitly defined
    CANCELLED // 102 - will auto assign value if not explicitly defined
}

enum teaType {
    MASALA = "masala",
    GINGER = "ginger"
}

function makeTea(type: teaType){
    console.log(`Making ${type}`)
}

makeTea(teaType.GINGER) // now fn can be called with limited values only 
makeTea(teaType.MASALA)


// OOPS

class Drink {
    flavour: string;
    price: number

    constructor(flavour: string, price: number){
        this.flavour = flavour
        this.price = price
    }
}

const masalaTea = new Drink("masala", 20)
masalaTea.flavour = "ginger"

console.log(masalaTea.flavour)

// Access Modifiers

// PUBLIC, PRIVATE, PROTECTED 
class newDrink {
    public flavor: string = "masala"

    private secretIngredients = "cardamom"

    reveal(){
        return this.secretIngredients
    }
   
}

const c = new newDrink()
console.log(c.reveal())


class Shop {
     protected shopName = "Chai Corner"
}

class Branch extends Shop {
    getName(){
        return this.shopName
    }
}


// READONLY

class newCup {

    readonly capacity: number = 250

    constructor(capacity: number){
        this.capacity = capacity

    }
}

class modernChai {
    private _sugar = 2

    get sugar(){
        return this._sugar
    }

    set sugar(value: number){
        if (value > 5) throw new Error("too sweet");
        this._sugar = value
    }
}

const t = new modernChai()
t.sugar = 3
console.log(t.sugar)


// STATIC METHODS

class ekChai {
    static shopName = "chaicode cafe"

    constructor(public flavour: string){
        this.flavour = flavour
    }
}
console.log(ekChai.shopName)


// ABSTRACT CLASS

abstract class Beverage{
    abstract make(): void
}

class myDrink extends Beverage {
    make(){
        console.log("Making Tea")
    }
}


// COMPOSITION

class Heater{
    heat(){}
}

class chaiMaker{
    constructor(private heater: Heater){}

    make(){
        this.heater.heat
    }
}


// GENERICS 
// act like a template with flexi datatype

// example:1
function wrapInArray<T>(item: T): T[]{
    return [item]
}

const arr1 = wrapInArray("masala")
const arr2 = wrapInArray(72)
const arr3 = wrapInArray({flavour: "ginger"})

console.log(arr1)
console.log(arr2)
console.log(arr3)

// example:2
function pair <A, B>(a: A, b: B): [A, B] {
    return [a, b]
}

const p1 = pair("ginger", 75)
const p2 = pair("masala", 50)
const p3 = pair("tea", {flavour: "ginger"})

console.log(p1)
console.log(p2)
console.log(p3)

// example:3
interface Box<T> {
    content: T
}

const numberBoxOne: Box<number> = {
    content: 10
}

const numberBoxTwo: Box<string> = {
    content: "This is numberBoxTwo"
}

// generic use case example
interface ApiPromise<T>{
    status: number,
    data: T
}

const res: ApiPromise <{flavour: string}> = {
    status: 20,
    data: {flavour: "ginger"}
}




