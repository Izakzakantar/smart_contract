const connection=require('./config/connect');
const sequelize=require('./config/db');
const userRouter=require('./routes/userRoutes');
const donationRouter=require('./routes/donationRoutes')
const limit=require('./middlewares/rateLimit');
const express=require('express');
const cors=require('cors');
const cookieParser = require('cookie-parser');
const app=express();
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed HTTP methods
    credentials: true // Allow cookies or authorization headers
}));
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
        app.listen(1234,()=>{
            console.log("server is running on port 1234 !");
        })
        
    } catch (error) {
        console.log(error);
    }
}
dbConnect()

