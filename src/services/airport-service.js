const {AirportRepository} = require('../repositories');
const {StatusCodes}=require('http-status-codes')
const AppError = require('../utils/errors/app-error');

const airportRepository= new AirportRepository()

async function createAirport(data){
    try {
        const airport = await airportRepository.create(data)
        return airport;
    } catch (error) {
        console.log(error)
        if(error.name=='TypeError'){
            throw new AppError('Something went wrong while creating airport',StatusCodes.BAD_REQUEST)
        }
        throw new AppError('Cannot create airport',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirports(data){
    try {
        const airports = await airportRepository.getAll(data)
        return airports;
    } catch (error) {
        throw new AppError('Error in fetching airports',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirport(data){
    try {
        const airport = await airportRepository.get(data)
        return airport;
    } catch (error) {
        if(error.statusCode==StatusCodes.NOT_FOUND){
            throw new AppError('The airport you are searching is not present',error.statusCode);
        }
        throw new AppError('Error in fetching airport',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


async function destroyAirport(data){
    try {
        const airport = await airportRepository.destroy(data)
        return airport;
    } catch (error) {
        if(error.statusCode==StatusCodes.NOT_FOUND){
            throw new AppError('The airport you are deleting is not present',error.statusCode);
        }
        throw new AppError('Error in deleting airport',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateAirport(id,data){
    try {
        const airport = await airportRepository.update(id,data)
        if (JSON.stringify(airport) == JSON.stringify([0])){
            throw new AppError('Update on airport failed',StatusCodes.BAD_GATEWAY)
        }
        return airport;
    } catch (error) {
        if(error.statusCode==StatusCodes.NOT_FOUND){
            throw new AppError('The airport you are updating is not present',error.statusCode);
        }
        throw new AppError('Error in updating airport',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports={
    createAirport,
    getAirports,
    getAirport,
    destroyAirport,
    updateAirport
}