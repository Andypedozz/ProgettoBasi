
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

    get getRandomNode() {
        const random = Math.floor(Math.random() * 2) + 1;
        let pool = this.container.values();

        return pool[random];
    }

    get getAll() {
        return this.container.entries();
    }

    get getNodes() {
        return this.container.values();
    }
}

module.exports = SubNetContainer;
