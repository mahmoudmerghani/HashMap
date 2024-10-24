class HashMap {
    constructor() {
        this.initialize();
    }
    
    initialize() {
        this.LOAD_FACTOR = 0.8;
        this.capacity = 16;
        this.buckets = [];
        this.length = 0;

        for (let i = 0; i < this.capacity; i++) {
            this.buckets.push([]);
        }
    }

    checkLoad() {
        if (this.length > this.LOAD_FACTOR * this.capacity) {
            this.capacity *= 2;
            const tempEntries = this.entries();
            this.buckets = [];
            this.length = 0;

            for (let i = 0; i < this.capacity; i++) {
                this.buckets.push([]);
            }

            for (const [key, value] of tempEntries) {
                this.set(key, value);
            }
        }
    }
    
    hash(key) {
        let hashCode = 0;
        const primeNumber = 31;
        
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }

        return Math.abs(hashCode);
    }

    getBucket(key) {
        const hashCode = this.hash(key) % this.capacity;
        return this.buckets[hashCode];
    }

    set(key, value) {
        const bucket = this.getBucket(key);

        for (const entry of bucket) {
            if (entry.key === key) {
                entry.value = value;
                return;
            }
        }
        
        bucket.push({key, value});
        this.length++;
        this.checkLoad();
    }

    get(key) {
        const bucket = this.getBucket(key);

        for (const entry of bucket) {
            if (entry.key === key) {
                return entry.value;
            }
        }

        return null;
    }

    has(key) {
        const bucket = this.getBucket(key);

        for (const entry of bucket) {
            if (entry.key === key) {
                return true;
            }
        }

        return false;
    }

    remove(key) {
        const bucket = this.getBucket(key);

        for (const entry of bucket) {
            if (entry.key === key) {
                bucket.splice(bucket.indexOf(entry), 1);
                this.length--;
                return true;
            }
        }

        return false;
    }

    clear() {
        this.initialize();
    }

    keys() {
        const array = [];

        for (const bucket of this.buckets) {
            for (const entry of bucket) {
                array.push(entry.key);
            }
        }

        return array;
    }

    values() {
        const array = [];

        for (const bucket of this.buckets) {
            for (const entry of bucket) {
                array.push(entry.value);
            }
        }

        return array;
    }

    entries() {
        const array = [];

        for (const bucket of this.buckets) {
            for (const entry of bucket) {
                const entryArray = [entry.key, entry.value];
                array.push(entryArray);
            }
        }

        return array;
    }
}
