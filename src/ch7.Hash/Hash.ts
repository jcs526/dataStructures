class HashTable {
    private storage: any[][];
    private tableSize: number;

    // 생성자
    constructor(size: number) {
        this.tableSize = size;
        this.storage = Array(size);
        for (let i = 0; i < size; i++) {
            this.storage[i] = [];
        }
    }

    // Hash 로직
    private hash(key: string): number {
        let hash = 0;
        for (let i = 0; i < key.length; i++) {
            hash = (hash + key.charCodeAt(i) * i) % this.tableSize;
        }
        return hash;
    }

    // 중복값을 Array로 처리하는 Set
    public set(key: string, value: any): void {
        const index = this.hash(key);
        const bucket = this.storage[index];
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket[i][1] = value;
                return;
            }
        }
        bucket.push([key, value]);
    }

    // 중복값을 Array로 처리하는 Get
    public get(key: string): any {
        const index = this.hash(key);
        const bucket = this.storage[index];
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                return bucket[i][1];
            }
        }
        return undefined;
    }

    // 중복값을 Array로 처리하는 Remove
    public remove(key: string): boolean {
        const index = this.hash(key);
        const bucket = this.storage[index];
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket.splice(i, 1);
                return true;
            }
        }
        return false;
    }
}

const hashTable = new HashTable(10); // Create a hash table of size 10
hashTable.set("name", "Grimoire");
hashTable.set("level", "Wizard");
console.log(hashTable.get("name")); // Output: Grimoire
console.log(hashTable.get("level")); // Output: Wizard
hashTable.remove("name");
console.log(hashTable.get("name")); // Output: undefined
