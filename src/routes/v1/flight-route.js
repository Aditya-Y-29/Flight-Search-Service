const express = require('express');
const {FlightController}= require('../../controllers')
const router=express.Router();
const {FlightMiddleware}=require('../../middlewares');
const { validateRemainingSeatRequest } = require('../../middlewares/flight-middleware');

router.post('/',
            FlightMiddleware.validateCreateRequest,
            FlightMiddleware.validateFlightTiming,
            FlightController.createFlight);

router.get('/',
            FlightController.getAllFlights);

router.get('/:id',
            FlightController.getFlight);

router.patch('/:id/seats',
            FlightMiddleware.validateRemainingSeatRequest,
            FlightController.updateSeats);
            
module.exports=router

