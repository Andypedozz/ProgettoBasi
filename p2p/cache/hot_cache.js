/**
 * Minimal Distributed Key-Value Store
 */

const HotCacheActionPerformer = require("./actions");

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
        if (this.#searchNode(tel)) {
            throw new ItemNotFoundError();
        }

        this.cache.delete(tel);
    }

    getNode(tel) {
        if (!(this.#searchNode)) {
            throw ItemNotFoundError();
        }

        return this.cache.get(tel);
    }

    assignNeighborhood(key) {
        let seed = this.#setSeedSize();
        
        if (seed === 0) {
            throw NoNeighborhoodError();
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
        let dim = this.cache.size();

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
            for (const node in list) {
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