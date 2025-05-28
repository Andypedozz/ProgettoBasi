/**
 * Errors 
 */

class ItemAlreadyExistError extends Error {
    constructor(errorMessage) {
        super(errorMessage);
    }
}

class ItemNotFoundError extends Error {
    constructor() {
        super();
        this.text = "Node Not Found!";
    }

    get getText() {
        return this.text;
    }
}

class NoNeighborhoodError extends Error {
    constructor() {
        super();
        this.text = "No Neighborhood Present";
    }

    get getText() {
        return this.text;
    }
}


