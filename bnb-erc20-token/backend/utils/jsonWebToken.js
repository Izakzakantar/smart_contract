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
//console.log(createToken("27cc5009-e2cb-4aff-a798-1abca8b3dcce").then((result)=>{
    //console.log(result);
//}));
module.exports={createToken,verify};