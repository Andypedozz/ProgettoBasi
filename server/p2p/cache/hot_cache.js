/**
 * Minimal Distributed Key-Value Store
 */

const {
    ItemAlreadyExistError,
    ItemNotFoundError,
    NoNeighborhoodError
} = require('./errors.js');

class HotCache {
    constructor() {
        this.cache = new Map();
    }

    addNode(tel, addr) {
        if (this.#searchNode(tel)) {
            throw new ItemAlreadyExistError("Item Already Exist");
        }

        this.cache.set(tel, addr);
    }

    deleteNode(tel) {
        if (!(this.#searchNode(tel))) {
            throw new ItemNotFoundError("Item Not Found!");
        }

        this.cache.delete(tel);
    }

    getNode(tel) {
        if (!(this.#searchNode(tel))) {
            throw ItemNotFoundError("Item Not Found!");
        }

        return this.cache.get(tel);
    }

    assignNeighborhood(key, N = 2) {
        let addrSlice = [];

        if (!this.#searchNode(key)) {
            throw new ItemNotFoundError("Item Not Found!");
        }
    
        const totalNodes = this.cache.size;
    
        if (totalNodes <= 1) {
            throw new NoNeighborhoodError("No Neighbor Available!");
        }
    
        const allKeys = Array.from(this.cache.keys()).filter(k => k !== key);

        for (const key of allKeys) {
            let valueAddr = this.cache.get(key);
            addrSlice.push(valueAddr);
        }
    
        // Se vuoi massimo N vicini, ma ce ne sono di meno, li restituisci tutti
        const neighbors = this.#pickRandom(addrSlice, Math.min(N, addrSlice.length));
        
        return neighbors;
    }
    
    #pickRandom(array, count) {
        const shuffled = [...array].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }


    #searchNode(key) {
        return this.cache.has(key);
    }

}

module.exports = HotCache;