const {AirplaneRepository} = require('../repositories');
const {StatusCodes}=require('http-status-codes')
const AppError = require('../utils/errors/app-error');

const airplaneRepository= new AirplaneRepository()

async function createAirplane(data){
    try {
        const airplane = await airplaneRepository.create(data)
        return airplane;
    } catch (error) {
        console.log(error)
        if(error.name=='TypeError'){
            throw new AppError('Something went wrong while creating airplane',StatusCodes.BAD_REQUEST)
        }
        throw new AppError('Cannot create airplane',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirplanes(data){
    try {
        const airplanes = await airplaneRepository.getAll(data)
        return airplanes;
    } catch (error) {
        throw new AppError('Error in fetching airplanes',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirplane(data){
    try {
        const airplane = await airplaneRepository.get(data)
        return airplane;
    } catch (error) {
        if(error.statusCode==StatusCodes.NOT_FOUND){
            throw new AppError('The airline you are searching is not present',error.statusCode);
        }
        throw new AppError('Error in fetching airplanes',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


async function destroyAirplane(data){
    try {
        const airplane = await airplaneRepository.destroy(data)
        return airplane;
    } catch (error) {
        if(error.statusCode==StatusCodes.NOT_FOUND){
            throw new AppError('The airline you are deleting is not present',error.statusCode);
        }
        throw new AppError('Error in deleting airplanes',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateAirplane(id,data){
    try {
        const airplane = await airplaneRepository.update(id,data)
        if (JSON.stringify(airplane) == JSON.stringify([0])){
            throw new AppError('Update on airline failed',StatusCodes.BAD_GATEWAY)
        }
        return airplane;
    } catch (error) {
        if(error.statusCode==StatusCodes.NOT_FOUND){
            throw new AppError('The airplane you are updating is not present',error.statusCode);
        }
        throw new AppError('Error in updating airplane',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports={
    createAirplane,
    getAirplanes,
    getAirplane,
    destroyAirplane,
    updateAirplane
}