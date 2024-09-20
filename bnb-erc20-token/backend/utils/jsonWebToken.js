const config=require('../../config.json');
const jwt=require('jsonwebtoken');
async function createToken(user_id){
    return await jwt.sign({userId:user_id},config.jwt_key,{
        expiresIn:"1h"
    })
}
async function verify(token){
    return await jwt.verify(token,config.jwt_key);
}
module.exports={createToken,verify};