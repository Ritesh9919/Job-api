class UnauthenticatedError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
    }
}


module.exports = UnauthenticatedError;