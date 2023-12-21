const {CityRepository} = require('../repositories');
const {StatusCodes}=require('http-status-codes')
const AppError = require('../utils/errors/app-error');

const cityRepository= new CityRepository()

async function createCity(data){
    try {
        const city = await cityRepository.create(data)
        return city;
    } catch (error) {
        console.log(error)
        if(error.name=='TypeError'){
            throw new AppError('Something went wrong while creating city',StatusCodes.BAD_REQUEST)
        }
        throw new AppError('Cannot create city',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function destroyCity(data){
    try {
        const city = await cityRepository.destroy(data)
        return city;
    } catch (error) {
        if(error.statusCode==StatusCodes.NOT_FOUND){
            throw new AppError('The city you are deleting is not present',error.statusCode);
        }
        throw new AppError('Error in deleting city',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateCity(id,data){
    try {
        const city = await cityRepository.update(id,data)
        if (JSON.stringify(city) == JSON.stringify([0])){
            throw new AppError('Update on city failed',StatusCodes.BAD_GATEWAY)
        }
        return city;
    } catch (error) {
        if(error.statusCode==StatusCodes.NOT_FOUND){
            throw new AppError('The city you are updating is not present',error.statusCode);
        }
        throw new AppError('Error in updating city',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports={
    createCity,
    updateCity,
    destroyCity
}