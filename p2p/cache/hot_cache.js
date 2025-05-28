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

    assignNeighborhood(key) {
        let seed = this.#setSeedSize();
        
        if (seed === 0) {
            throw new NoNeighborhoodError("No Neighbor Avaliable!");
        } else if (seed === 1) {
            let list = this.cache.keys();

            return this.#getNeighbor(key)
        }

        // TODO
        return null;
    }

    #searchNode(key) {
        return this.cache.has(key);
    }

    #setSeedSize() {
        let dim = this.cache.size;

        if (dim === 1) {
            return 0;
        } else if (dim === 2) {
            return 1;
        }

        return 2;
    }

    #getNeighbor(key, seed) {
        let list = this.cache.keys();
        let victim;

        if (seed === 1) {
            for (const node of list) {
                if (node != key) {
                    victim = node;                
                    break;
                }                    
            }
        } else {
            // TODO
        }

        return victim;
    }
}

module.exports = HotCache;