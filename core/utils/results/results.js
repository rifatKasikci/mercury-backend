class Result {
    constructor(success=false,message=null){
        this.success = success
        this.message = message
    }
}

class DataResult extends Result {
    constructor(success=false, message=null, data=null) {
        super(success, message)
        this.data = data
    }
}

class SuccessResult extends Result{
    constructor(message){
        super(true, message)
    }
}

class ErrorResult extends Result{
    constructor(message){
        super(false, message)
    }
}

class SuccessDataResult extends DataResult{
    constructor(message, data){
        super(true, message, data)
    }
}

class ErrorDataResult extends DataResult{
    constructor(message, data){
        super(false, message, data)
    }
}

module.exports = { SuccessResult, ErrorResult, SuccessDataResult, ErrorDataResult}
