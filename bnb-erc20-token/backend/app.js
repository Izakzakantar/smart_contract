const connection=require('./config/connect');
const sequelize=require('./config/db');
const valid=require('./middlewares/validation');
const createUser=require('./controllers/userController');
const limit=require('./middlewares/rateLimit');
const express=require('express');
const app=express();
app.use(express.json());
app.use(limit)
app.post('/register',valid.registerValidation,createUser.createUser)
async function dbConnect(){
    try {
        await connection.dbConnection();
        await sequelize.sync();
        console.log("Database synchronized");
        app.listen(3000,()=>{
            console.log("server is running on port 3000 !");
        })
        
    } catch (error) {
        console.log(error);
    }
}
dbConnect()
