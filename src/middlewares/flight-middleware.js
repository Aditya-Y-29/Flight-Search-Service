const {StatusCodes}=require('http-status-codes')
const {ErrorResponse}=require('../utils/common')
const AppError = require('../utils/errors/app-error')
const {DateTimeHelper}=require('../utils/helper')
function validateCreateRequest(req,res,next){
    if(!req.body.flightNumber){
        ErrorResponse.message="Something went wrong when creating flight"
        ErrorResponse.error= new AppError(["flightNumber not found in incoming request"],StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST).
                json(ErrorResponse)
    }
    if(!req.body.airplaneId){
        ErrorResponse.message="Something went wrong when creating flight"
        ErrorResponse.error= new AppError(["airplaneId not found incoming request"],StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST).
                json(ErrorResponse)
    }
    if(!req.body.departureAirportId){
        ErrorResponse.message="Something went wrong when creating flight"
        ErrorResponse.error= new AppError(["departureAirportId not found incoming request"],StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST).
                json(ErrorResponse)
    }
    if(!req.body.arrivalAirportId){
        ErrorResponse.message="Something went wrong when creating flight"
        ErrorResponse.error= new AppError(["arrivalAirportId not found incoming request"],StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST).
                json(ErrorResponse)
    }
    if(!req.body.arrivalTime){
        ErrorResponse.message="Something went wrong when creating flight"
        ErrorResponse.error= new AppError(["arrivalTime not found incoming request"],StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST).
                json(ErrorResponse)
    }if(!req.body.departureTime){
        ErrorResponse.message="Something went wrong when creating flight"
        ErrorResponse.error= new AppError(["departureTime not found incoming request"],StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST).
                json(ErrorResponse)
    }
    if(!req.body.price){
        ErrorResponse.message="Something went wrong when creating flight"
        ErrorResponse.error= new AppError(["price not found incoming request"],StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST).
                json(ErrorResponse)
    }
    if(!req.body.totalSeats){
        ErrorResponse.message="Something went wrong when creating flight"
        ErrorResponse.error= new AppError(["totalSeats not found incoming request"],StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST).
                json(ErrorResponse)
    }
    next()
}

function validateFlightTiming(req,res,next){
    departureTime=req.body.departureTime;
    arrivalTime=req.body.arrivalTime;
    if(DateTimeHelper.compareDates(departureTime,arrivalTime)){
        ErrorResponse.message="Flight Timing validation failed"
        ErrorResponse.error= new AppError(["Departure time greater than arrival time"],StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST).
                json(ErrorResponse)
    }
    next()
}

module.exports={
    validateCreateRequest,
    validateFlightTiming
}