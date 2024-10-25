# Linked Lists

This project is a part of [The Odin Project's JavaScript course](https://www.theodinproject.com/paths/full-stack-javascript/courses/javascript).

## Overview

The Linked Lists project is a TypeScript implementation of a singly linked list data structure. This project provides a comprehensive set of methods to manipulate the linked list, allowing users to perform operations such as adding, removing, and searching for elements.

## Features

-   **Append:** add element to the end of the list.
-   **Prepend:** add element to the beginning of the list.
-   **Pop:** remove the last element from the list.
-   **Insert at Index:** insert element at a specific index in the list.
-   **Remove at Index:** remove element from a specific index in the list.
-   **At**: retrieve the node at a specific index.
-   **Find:** search for an element and retrieve its index.
-   **Contains:** check if an element exists in the list.
-   **Size:** retrieve the current size of the list.
-   **To String:** convert the list to a string representation for easy visualization.

## Examples

-   **Usage**

```typescript
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
```

-   **ListNode Class**

```typescript
class ListNode<T> {
    constructor(
        public value: T,
        public next?: ListNode<T>,
    ) {}
}
```

-   **List Class**

```typescript
class List<T> {
    public head?: ListNode<T>;
    public tail?: ListNode<T>;

    private _size: number = 0;

    public size(): number {
        return this._size;
    }

    public append(value: T): List<T> {
        const node = new ListNode(value);

        if (!this.head) {
            this.head = node;
            this.tail = this.head;
        } else {
            assert(
                this.tail,
                'Tail of the list should be defined at this point',
            );

            this.tail.next = node;
            this.tail = this.tail.next;
        }

        this._size += 1;
        return this;
    }

    public prepend(value: T): List<T> {
        const node = new ListNode(value, this.head);

        this.head = node;
        this.tail ??= this.head;

        this._size += 1;
        return this;
    }

    public pop(): T | undefined {
        if (!this.head) return undefined;

        const popped = this.tail?.value;

        if (this.head === this.tail) {
            this.head = undefined;
            this.tail = undefined;
        } else {
            let current = this.head;

            while (current.next && current.next !== this.tail) {
                current = current.next;
            }

            current.next = undefined;
            this.tail = current;
        }

        this._size -= 1;
        return popped;
    }

    public insertAt(index: number, value: T): List<T> {
        if (index < 0 || index > this._size) return this;

        if (index === 0) return this.prepend(value);
        if (index === this._size) return this.append(value);

        const prev = this.at(index - 1);

        assert(
            prev && prev.next,
            `Node at index ${index - 1} and node next to it should be defined at this point`,
        );

        const node = new ListNode(value, prev.next);
        prev.next = node;

        this._size += 1;
        return this;
    }

    public removeAt(index: number): T | undefined {
        if (index < 0 || index >= this._size) return undefined;

        let removed: ListNode<T> | undefined = undefined;

        if (index === 0) {
            removed = this.head;
            this.head = this.head?.next;

            if (!this.head) {
                this.tail = undefined;
            }
        } else {
            const prev = this.at(index - 1);

            assert(
                prev && prev.next,
                `Node at index ${index - 1} and node next to it should be defined at this point`,
            );

            removed = prev.next;
            prev.next = removed.next;

            if (removed === this.tail) {
                this.tail = prev;
            }
        }

        if (removed) {
            this._size -= 1;
            return removed.value;
        }

        return undefined;
    }

    public at(index: number): ListNode<T> | undefined {
        if (index < 0 || index >= this._size) return undefined;

        if (index === 0) return this.head;
        if (index === this._size - 1) return this.tail;

        let node = this.head;

        for (let i = 0; i < index; i += 1) {
            assert(node, `Node at ${index} should be defined at this point`);
            node = node.next;
        }

        return node;
    }

    public find(value: T): number | undefined {
        let node = this.head;

        for (let index = 0; node && index < this._size; index += 1) {
            if (node.value === value) return index;
            node = node.next;
        }

        return undefined;
    }

    public contains(value: T): boolean {
        return this.find(value) !== undefined;
    }

    public toString(): string {
        let string = '';
        let node = this.head;

        while (node) {
            string += `( ${node.value} ) -> `;
            node = node.next;
        }

        return string + 'undefined';
    }
}
```
