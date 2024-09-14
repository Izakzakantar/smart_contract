const {Sequelize}=require('sequelize');
require("dotenv").config();
const config=require('../../config.json')
const sequelize=new Sequelize(config.DB_NAME,config.DB_USER,config.DB_PASSWORD,{
    host:"localhost",
    dialect:"mysql",
    port:3306,
    logging:console.log
    
})
module.exports=sequelize;
