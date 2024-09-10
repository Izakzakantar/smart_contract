const sequelize=require('./db')
async function dbConnection(){
    try{
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");

    }catch(error){
        console.log(error);
    }
}
module.exports={dbConnection};