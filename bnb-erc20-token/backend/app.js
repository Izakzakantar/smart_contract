const connection=require('./config/connect');
const sequelize=require('./config/db');
const userRouter=require('./routes/userRoutes');
const donationRouter=require('./routes/donationRoutes')
const limit=require('./middlewares/rateLimit');
const express=require('express');
const cookieParser = require('cookie-parser');
const app=express();
app.use(cookieParser());
app.use(express.json());
app.use(limit)
app.use(userRouter);
app.use(donationRouter)
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

