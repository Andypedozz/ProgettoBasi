
class SubNetContainer {
    constructor() {
        this.container = new Map();
    }

    addNeighbor(key, addr) {
        this.container.set(key, addr);
    }

    deleteNeighbor(key) {
        this.container.delete(key);
    }

    get getAll() {
        return this.container.entries();
    }

    get getNodes() {
        return this.container.values();
    }
}

module.exports = SubNetContainer;
