const {AirplaneService} =require('../services')
const {StatusCodes}=require('http-status-codes')
const {SuccessResponse,ErrorResponse}= require('../utils/common')
async function createAirplane(req,res){
    try {
        const airplane = await AirplaneService.createAirplane({
            modelNumber: req.body.modelNumber,
            capacity: req.body.capacity
        }) 
        SuccessResponse.message="Successfully created airplane";
        SuccessResponse.data=airplane;
        return res
                .status(StatusCodes.CREATED).
                json(SuccessResponse)
    } catch (error) {
        ErrorResponse.message="Something went wrong when creating airplane";
        ErrorResponse.error=error;
        return res
                .status(error.statusCode).
                json(ErrorResponse)
    }
}

async function getAirplanes(req,res){
    try {
        const airplanes = await AirplaneService.getAirplanes()
        SuccessResponse.data=airplanes;
        return res
                .status(StatusCodes.OK).
                json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error=error;
        return res
                .status(error.statusCode).
                json(ErrorResponse)
    }
}

async function getAirplane(req,res){
    try {
        const id=req.params.id
        const airplane = await AirplaneService.getAirplane(id)
        SuccessResponse.data=airplane;
        return res
                .status(StatusCodes.OK).
                json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error=error;
        return res
                .status(error.statusCode).
                json(ErrorResponse)
    }
}


async function updateAirplane(req,res){
    try {
        const id=req.params.id
        const airplane = await AirplaneService.updateAirplane(id,{
            capacity: req.body.capacity
        })
        SuccessResponse.data=airplane;
        return res
                .status(StatusCodes.OK).
                json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error=error;
        return res
                .status(error.statusCode).
                json(ErrorResponse)
    }
}

async function destroyAirplane(req,res){
    try {
        const id=req.params.id
        const airplane = await AirplaneService.updateAirplane(id)
        SuccessResponse.data=airplane;
        return res
                .status(StatusCodes.OK).
                json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error=error;
        return res
                .status(error.statusCode).
                json(ErrorResponse)
    }
}

module.exports={
    createAirplane,
    getAirplanes,
    getAirplane,
    destroyAirplane,
    updateAirplane
}