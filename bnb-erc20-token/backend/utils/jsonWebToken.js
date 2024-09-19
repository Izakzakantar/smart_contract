const config=require('../../config.json');
const jwt=require('jsonwebtoken');
async function createToken(user_id){
    return await jwt.sign({userId:user_id},config.jwt_key,{
        expiresIn:"1h"
    })
}
module.exports={createToken};