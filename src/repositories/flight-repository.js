const CrudRepository = require('./crud-repository');
const {Flight,Airplane,Airport,City} = require('../models');
const { Op } = require('sequelize');
const {Sequelize}=require('sequelize');
const { on } = require('nodemon');

class FlightRepository extends CrudRepository{
    constructor(){
        super(Flight)
    }

    async getAllFlights(filter,sort){
        const response = await this.model.findAll({
            where: filter,
            order: sort,
            include: [
                {
                    model: Airplane,
                    required: true,
                    as: 'airplaneDetail'
                },
                {
                    model: Airport,
                    required: true,
                    as: 'departureAirport',
                    on: {
                        col1: Sequelize.where(Sequelize.col("Flight.departureAirportId"),"=",Sequelize.col("departureAirport.code"))
                    },
                    include:{
                        model: City
                    }
                },
                {
                    model: Airport,
                    required: true,
                    as: 'arrivalAirport',
                    on: {
                        col1: Sequelize.where(Sequelize.col("Flight.arrivalAirportId"),"=",Sequelize.col("arrivalAirport.code"))
                    },
                    include:{
                        model: City
                    }
                }
            ]
        })
        return response
    }
    
}

module.exports=FlightRepository;