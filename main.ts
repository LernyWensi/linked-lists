import { List } from './list.ts';

const list = new List<number>();

// Append elements
list.append(10);
list.append(20);
list.append(30);
console.log(list.toString()); // Output: ( 10 ) -> ( 20 ) -> ( 30 ) -> undefined
console.log(`Size: ${list.size()}`); // Output: Size: 3

// Prepend an element
list.prepend(5);
console.log(list.toString()); // Output: ( 5 ) -> ( 10 ) -> ( 20 ) -> ( 30 ) -> undefined
console.log(`Size: ${list.size()}`); // Output: Size: 4

// Insert at a specific index
list.insertAt(2, 15);
console.log(list.toString()); // Output: ( 5 ) -> ( 10 ) -> ( 15 ) -> ( 20 ) -> ( 30 ) -> undefined
console.log(`Size: ${list.size()}`); // Output: Size: 5

// Remove an element at a specific index
list.removeAt(3);
console.log(list.toString()); // Output: ( 5 ) -> ( 10 ) -> ( 15 ) -> ( 30 ) -> undefined
console.log(`Size: ${list.size()}`); // Output: Size: 4

// Find an element
const index = list.find(15);
console.log(`Index of 15: ${index}`); // Output: Index of 15: 2

// Retrieve an element
const element = list.at(2)?.value;
console.log(`Element at 2: ${element}`); // Output: Element at 2: 15

// Check if an element exists
const exists = list.contains(20);
console.log(`Contains 20: ${exists}`); // Output: Contains 20: false

// Pop the last element
const popped = list.pop();
console.log(`Popped value: ${popped}`); // Output: Popped value: 30
console.log(list.toString()); // Output: ( 5 ) -> ( 10 ) -> ( 15 ) -> undefined
console.log(`Size: ${list.size()}`); // Output: Size: 3
