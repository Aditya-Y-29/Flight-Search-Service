const {FlightRepository} = require('../repositories');
const {StatusCodes}=require('http-status-codes')
const AppError = require('../utils/errors/app-error');
const {Op} =require('sequelize')
const flightRepository= new FlightRepository()

async function createFlight(data){
    try {
        const flight = await flightRepository.create(data)
        return flight;
    } catch (error) {
        console.log(error)
        if(error.name=='TypeError'){
            throw new AppError('Something went wrong while creating city',StatusCodes.BAD_REQUEST)
        }
        throw new AppError('Cannot create city',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function createFlight(data){
    try {
        const flight = await flightRepository.create(data)
        return flight;
    } catch (error) {
        if(error.name=='TypeError'){
            throw new AppError('Something went wrong while creating city',StatusCodes.BAD_REQUEST)
        }
        throw new AppError('Cannot create city',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAllFlights(query){
    let customFilter={}
    let sortFilter=[]
    if(query.trips){
        [departureAirportId,arrivalAirportId]=query.trips.split("-");
        customFilter.departureAirportId=departureAirportId;
        customFilter.arrivalAirportId=arrivalAirportId;
    }
    if(query.price){
        [minPrice,maxPrice]=query.price.split("-");
        customFilter.price= {
            [Op.between]: [minPrice,(maxPrice==undefined)?20000:maxPrice]
        }
    }
    if(query.travellers){
        customFilter.totalSeats= {
            [Op.gte]: query.travellers
        }
    }
    if(query.tripDate){
        const endTripTime=query.tripDate+" 23:59:59"
        customFilter.departureTime={
            [Op.between]: [query.tripDate,endTripTime]
        }
    }
    if(query.sort){
        const params=query.sort.split(",")
        const sortFilters=params.map((param)=>param.split("_"))
        sortFilter=sortFilters
    }
    try {
        const flights = await flightRepository.getAllFlights(customFilter,sortFilter)
        return flights;
    } catch (error) {
        throw new AppError('Cannot fetch all the flights',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getFlight(data){
    try {
        const flight = await flightRepository.get(data)
        return flight;
    } catch (error) {
        if(error.statusCode==StatusCodes.NOT_FOUND){
            throw new AppError('The airline you are searching is not present',error.statusCode);
        }
        throw new AppError('Error in fetching airplanes',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateSeats(data){
    try {
        const response = await flightRepository.updateRemainingSeats(data.flightId,data.seats,data.dec);
        return response;
    } catch (error) {
        console.log(error)
        throw new AppError('Error in fetching airplanes',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports={
    createFlight,
    getAllFlights,
    getFlight,
    updateSeats
}