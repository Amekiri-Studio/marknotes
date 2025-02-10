export class ArgumentError extends Error {
    constructor(message: string) {
        super(message)
    }
}

export class DataError extends Error {
    constructor(message: string) {
        super(message);
    }
}