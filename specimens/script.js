console.groupCollapsed("Functions");

function multiply(a, b) {
  return a * b;
}

let times = multiply;
console.log(times(3, 4));

let timesAgain = function (a, b) {
  return a * b;
};

console.log(timesAgain(4, 5));

function printHello() {
  console.log("Hello, friend!");
}

let output = printHello();
console.log(output); // undefined

function greet(name) {
  console.log("Hello, " + name + "!");
}

greet("Betty");

setTimeout(function () {
  greet("Alice");
}, 4000);

function logWithCallback(stringToLog, callback) {
  console.log(stringToLog); // some slow operation
  callback();
}

logWithCallback("This is the string to log", printHello);

console.groupEnd("Functions");
console.groupCollapsed("Arrow functions");

let sum = (a, b) => {
  return a + b;
};

console.log(sum(3, 4));

let addToItself = (a) => a + a;

console.log(addToItself(4));

let printHelloWorld = () => console.log("Hello, world!");
printHelloWorld();

// Hoisting

regular();
function regular() {
  console.log("regular non-arrow function");
}

const arrow = () => console.log("arrow function");
// arrow();

setTimeout(() => {
  console.log(sum(10, 20));
}, 2000);

console.groupEnd("Arrow functions");
console.groupCollapsed("Scope");

let val = 2;
console.log(val);

if (val == 2) {
  let innerVal = 4;
  console.log("val is 2");
  console.log(innerVal + val);

  let innerVarVal = 8;
}

console.log(innerVarVal);

var innerVarVal = 16;
console.log(innerVarVal);

const DAYS_OF_WEEK = 7;
let daysInMonth = 4 * DAYS_OF_WEEK;

function printNumbersUpTo(limit) {
  for (let i = 1; i <= limit; i++) {
    console.log(i);
  }

  // will work if variable was declared with `var`
  // console.log(i);
}

printNumbersUpTo(5);

let firstName = "Jane";
let lastName = "Smith";

function printName(firstName) {
  let lastName = "Jones";
  console.log("local scope: ", lastName);

  function innerPrintName() {
    console.log(firstName + " " + lastName);
  }

  innerPrintName();
}

printName("Jack");

console.log("global scope: ", lastName);

// let lastName = "Me!!";

console.groupEnd("Scope");

// Create a list of players in JS
const players = [
  {
    name: "Alice",
  },
  {
    name: "Laura",
  },
  {
    name: "Ben",
    isCaptain: true,
  },
];

// Get a reference to the parent element
let playerList = document.querySelector(".roster__player-list");
console.log(playerList);

// Create a list item element for one player
// let playerItem = document.createElement("li");

// Add content to the list item
// playerItem.innerText = players[0];
// console.log(playerItem);

// Append it to the parent
// playerList.appendChild(playerItem);

// Create a list item element for each player
for (let i = 0; i < players.length; i++) {
  let player = players[i];

  let playerItem = document.createElement("li");
  playerItem.innerText = player.name;
  playerItem.classList.add("roster__player");

  if (player.isCaptain) {
    playerItem.classList.add("roster__player--captain");
  }

  playerList.appendChild(playerItem);
}
