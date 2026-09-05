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
//# sourceMappingURL=basics.js.map