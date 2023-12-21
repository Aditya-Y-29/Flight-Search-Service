const express =require('express');
const {serverConfig, logger}=require('./config');

const apiRoutes = require('./routes');
const { where } = require('sequelize');

const app=express()

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use('/api',apiRoutes)

app.listen(serverConfig.PORT,()=>{
    console.log(`successfully started server at ${serverConfig.PORT}`);
    logger.info({
        level: 'info',
        message: `successfully started server at ${serverConfig.PORT}`,
    });
})