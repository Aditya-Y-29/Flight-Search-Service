const {StatusCodes}=require('http-status-codes')
const {ErrorResponse}=require('../utils/common')
const AppError = require('../utils/errors/app-error')
function validateCreateRequest(req,res,next){
    if(!req.body.name){
        ErrorResponse.message="Something went wrong when creating city"
        ErrorResponse.error= new AppError(["name not found incoming request"],StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST).
                json(ErrorResponse)
    }
    next()
}

module.exports={
    validateCreateRequest
}