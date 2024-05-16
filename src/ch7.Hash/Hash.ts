class HashTable<V> {
    private storage: [string, V][][];
    private tableSize: number;
    private count: number;

    constructor(size: number = 16) {
        this.tableSize = size;
        this.count = 0;
        this.storage = Array(size).fill(null).map(() => []);
    }

    // 간단한 hash 함수
    private hash(key: string): number {
        let hash = 0;
        for (let i = 0; i < key.length; i++) {
            hash = (hash + key.charCodeAt(i) * i) % this.tableSize;
        }
        return hash;
    }

    // 테이블 확장
    private resize(newSize: number): void {
        const oldStorage = this.storage;
        this.tableSize = newSize;
        this.storage = Array(newSize).fill(null).map(() => []);
        this.count = 0;

        for (const bucket of oldStorage) {
            for (const [key, value] of bucket) {
                this.set(key, value);
            }
        }
    }

    // 체이닝 set
    public set(key: string, value: V): void {
        const index = this.hash(key);
        const bucket = this.storage[index];

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket[i][1] = value;
                return;
            }
        }
        bucket.push([key, value]);
        this.count++;

        // 75% 이상 사용시 테이블 확장
        if (this.count / this.tableSize > 0.75) {
            this.resize(this.tableSize * 2);
        }
    }

    // 체이닝 get
    public get(key: string): V | undefined {
        const index = this.hash(key);
        const bucket = this.storage[index];

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                return bucket[i][1];
            }
        }
        return undefined;
    }

    // 체이닝 remove
    public remove(key: string): boolean {
        const index = this.hash(key);
        const bucket = this.storage[index];

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                // 일치하는 데이터 추출
                bucket.splice(i, 1);
                this.count--;

                if (this.tableSize > 16 && this.count / this.tableSize < 0.25) {
                    this.resize(Math.floor(this.tableSize / 2));
                }
                return true;
            }
        }
        return false;
    }
}

const hashTable = new HashTable<string>();
hashTable.set("name", "Grimoire");
hashTable.set("level", "Wizard");
console.log(hashTable.get("name")); // Output: Grimoire
console.log(hashTable.get("level")); // Output: Wizard
hashTable.remove("name");
console.log(hashTable.get("name")); // Output: undefined
