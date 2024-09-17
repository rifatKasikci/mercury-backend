const errorHandler = require('../core/handlers/errorHandler')

const errorMiddleware = async (err, req, res, next) => {
    if (!errorHandler.isTrustedError(err)) {
        next(err)
    }
    return await errorHandler.handleError(err, res)
}

module.exports = errorMiddleware 
