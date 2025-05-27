/**
 * Errors 
 */


class ItemAlreadyExistError extends Error {
    constructor() {
        super();
        this.text = "Node Already Exist!";
    }

    getText() {
        return this.text;
    }
}

class ItemNotFoundError extends Error {
    constructor() {
        super();
        this.text = "Node Not Found!";
    }

    getText() {
        return this.text;
    }
}

class NoNeighborhoodError extends Error {
    constructor() {
        super();
        this.text = "No Neighborhood Present";
    }

    getText() {
        return this.text;
    }
}


