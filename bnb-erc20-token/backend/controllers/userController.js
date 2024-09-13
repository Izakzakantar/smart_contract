const User=require('../models/User');

async function createUser(req,res){
    try{
        const {name,email,password,phone,user_type}=req.body;
        res.send("it worked")


    }
    catch(errr){

   
    }
}
module.exports={createUser};