const { BaseError } = require('../utils/errors')
const { ErrorResult } = require('../utils/results/results')

class ErrorHandler {
    async handleError(err, res) {
        return res.status(err.httpCode).json(new ErrorResult(err.description))
    }

    isTrustedError(error) {
        if (error instanceof BaseError) {
            return error.isOperational;
        }
        return false;
    }
}
const errorHandler = new ErrorHandler();
module.exports = errorHandler
