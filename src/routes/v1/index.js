const express = require('express');
const router=express.Router();
const {InfoController}=require('../../controllers');
const airplaneRoutes=require('./airplane-routes')
const cityRoutes=require('./city-route')
const airportRoutes=require('./airport-route')
const flightRoutes=require('./flight-route')

router.use('/airplanes',airplaneRoutes)
router.use('/cities',cityRoutes)
router.use('/airports',airportRoutes)
router.use('/flights',flightRoutes)
router.get('/info',InfoController.info)
module.exports=router