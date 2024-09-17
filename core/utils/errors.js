const HttpStatusCode = {
    OK: 200,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER: 500,
    AUTHORIZATION_ERROR:401
}

class BaseError extends Error {
    constructor(name, httpCode, description, isOperational) {
        super(description)
        Object.setPrototypeOf(this, new.target.prototype);

        this.name = name;
        this.httpCode = httpCode;
        this.isOperational = isOperational;
        this.description = description
        
        Error.captureStackTrace(this);
    }
}

class APIError extends BaseError {
    constructor(name, httpCode = HttpStatusCode.INTERNAL_SERVER, isOperational = true, description = 'internal server error') {
        super(name, httpCode, description, isOperational);
    }
}

class HTTP400Error extends BaseError {
    constructor(description = 'bad request') {
        super('NOT FOUND',HttpStatusCode.BAD_REQUEST, description, true)
    }
}

class AuthError extends BaseError {
    constructor(description = 'bad request') {
        super('Authentication Error', HttpStatusCode.AUTHORIZATION_ERROR, description, true);
    }
}

class ReCaptchaError extends BaseError {
    constructor(description = 'ReCaptcha Error') {
        super('ReCaptcha Error', HttpStatusCode.AUTHORIZATION_ERROR, description, true);
    }
}

module.exports = { BaseError, APIError, HTTP400Error, AuthError, ReCaptchaError}
