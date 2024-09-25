const User = require('../models/User');
const Wallet=require('../models/wallet');
const bcrypt = require('bcrypt');
const jwt=require('../utils/jsonWebToken');
const { use } = require('../routes/userRoutes');
async function registration(...args) {
    const saltRounds = 10;
    try {
        const hashedPassword = await bcrypt.hash(args[2], saltRounds);
        const query = await User.create({
            name: args[0],
            email: args[1],
            password: hashedPassword,
            phoneNumber: args[3],
            userType: args[4]
        });
        return query.toJSON();
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            const duplicateField = error.errors[0].path; 
            const duplicateValue = error.errors[0].value;

            return {
                status: 'error',
                message: `${duplicateField} already exists.`,
                field: duplicateField,
                value: duplicateValue
            };
        }
        
        return { status: 'error', message: 'An internal server error occurred.' };
    }
}
async function displayUserInformation(userId){
    try {
        
        const [user_info,wallet_info]=await Promise.all([
            User.findByPk(userId),
            Wallet.findOne({ where: { user_id: userId } })

        ])
        const dashabord={user_info,wallet_info};
        return dashabord;
    } catch (error) {
        return { status: 'error', message: 'An internal server error occurred.' }; 
    }
}
async function login(email,password){
    try{
        const user=await User.findOne({where:{email:email}});
        if(!user){
            return {status:"error",message:"User not found"}
        }
        else{
            const matchPassword=await bcrypt.compare(password,user.password);
            if(!matchPassword){
                return {status:"error",message:"Incorrect password"};
            }
            else{
                const token=await jwt.createToken(user.user_id);
                return {status:"success",message:"Logged in successfully",token:token};
            }
        }
    }catch(err){
        return {status:"error",message:"An internal server error occurred."}
    }
}
console.log(displayUserInformation("27cc5009-e2cb-4aff-a798-1abca8b3dcce").then((result)=>{
    console.log(result);
}));
module.exports = { registration,displayUserInformation ,login};
