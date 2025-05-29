/**
 * Errors 
 */

class ItemAlreadyExistError extends Error {
    constructor(errorMessage) {
        super(errorMessage);
    }
}

class ItemNotFoundError extends Error {
    constructor(errorMessage) {
        super(errorMessage);
    }
}

class NoNeighborhoodError extends Error {
    constructor(errorMessage) {
        super(errorMessage);
    }
}


module.exports = {
    ItemAlreadyExistError,
    ItemNotFoundError,
    NoNeighborhoodError
};


