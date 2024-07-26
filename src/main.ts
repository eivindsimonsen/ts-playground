///////////////////////////////////////////////// Basics /////////////////////////////////////////////////
let age: number = 20;

console.log("Inital age => " + age);

if (age < 50) {
  // age = age + 10;
  age += 10; // The same as above, but shorter
}

console.log("New age => " + age);

let sales: number = 123_456_789;
let course: string = "TypeScript";
let published: boolean = true;
let level; // TS assumes type :any

function render(document: any) {
  console.log(document);
}

render("This comes from a function of type :any");

function stringRender(document: string) {
  console.log(document);
}

stringRender("This comes from a function of type :string");

// let numbers: number[] = [1, 2, 3];
let numbers: number[] = [];

// Tuple 
let user: [number, string] = [1, "Admin"];
user.push(1);
console.log(user);

///////////////////////////////////////////////// Enum /////////////////////////////////////////////////
/* const small = 1;
const medium = 2;
const large = 3; */

const enum Size { // teller fra 0, nesten som en struct, const her kompiler koden mer kompakt
  Small = 1,
  Medium = 2, 
  Large = 3
}

let mySize: Size = Size.Medium;
console.log("My size => " + mySize);

function prettifyHighNumbers(income: number): string { // Returning string for formatted output
  if (income > 100000) {
    return income.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "_");
  }
  return income.toString();
}

// Example usage
console.log(prettifyHighNumbers(1234567)); // Outputs: 1_234_567
console.log(prettifyHighNumbers(98765));   // Outputs: 98765

///////////////////////////////////////////////// Objects /////////////////////////////////////////////////
// Version 1
let employee: {
  readonly id: number,
  name?: string, // Optional
} = {
  id: 1,
  name: "Eivind"
}

// employee.id = 2; // Not valid, read only
employee.name = "Eivind Simonsen";
console.log(employee);

// Version 2
type Employee = {
  readonly id: number,
  name?: string, // Optional
}

let employee2: Employee = {
  id: 2,
  name: "Eivind S",
}

console.log(employee2);

///////////////////////////////////////////////// Union types /////////////////////////////////////////////////
function lbsToKg(weight: number | string): number { // Can receieve both number and string
  // Narrowing
  if (typeof weight === "number") {
    return weight * 2.2;
  } else {
    return parseInt(weight) * 2.2;
  }
}

// Both valid
console.log(lbsToKg(100));
console.log(lbsToKg("100"));

///////////////////////////////////////////////// Intersection types /////////////////////////////////////////////////
type Draggable = {
  drag: () => void
};

type Resizeable = {
  resize: () => void
}

type UIWidget = Draggable & Resizeable;

let textBox: UIWidget = {
  drag: () => {},
  resize: () => {}
}

///////////////////////////////////////////////// Literal types /////////////////////////////////////////////////
// Literal (exact, specific)

type Quantity = 50 | 100;
let quantity: Quantity = 100;
console.log(quantity);

///////////////////////////////////////////////// Nullable types /////////////////////////////////////////////////
function greet (name: string | null | undefined) {
  if (name)
    console.log(name.toUpperCase());
  else
    console.log("No name!");
}

greet(null);

///////////////////////////////////////////////// Optional chaining /////////////////////////////////////////////////
type Customer = {
  birthday: Date
};

function getCustomer(id: number): Customer | null | undefined {
  return id === 0 ? null : { birthday: new Date() };
}

let customer = getCustomer(1);

// One way
if (customer !== null && customer !== undefined)
  console.log(customer.birthday);

// Optional property access operator
console.log(customer?.birthday);

///////////////////////////////////////////////// Fun /////////////////////////////////////////////////
let consoleIsOpen = false;

function detectConsoleOpen() {
  const start: any = new Date();
  // debugger; // Trigger the debugger to pause execution
  const end: any = new Date();
  if (end - start > 100) { // If the execution time is significantly longer, console is likely open
    return true;
  }
  return false;
}

document.getElementById("btn")!.addEventListener("click", () => {
  alert("It does nothing <3 - Open the console (F12)");
})

// Continuously check if the console is open
setInterval(() => {
  consoleIsOpen = detectConsoleOpen();
  if (consoleIsOpen) {
    document.getElementById('btn')!.textContent = "Console is Open";
  } else {
    document.getElementById('btn')!.textContent = "Open Console";
  }
}, 1000);
