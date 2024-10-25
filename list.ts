export { List };

function assert(expr: unknown, msg: string): asserts expr {
    if (!expr) throw Error(msg);
}

class ListNode<T> {
    constructor(
        public value: T,
        public next?: ListNode<T>,
    ) {}
}

class List<T> {
    public head?: ListNode<T>;
    public tail?: ListNode<T>;

    private _size = 0;

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
            prev?.next,
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
                prev?.next,
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

        return `${string}undefined`;
    }
}
