const userFunctions = require('../middlewares/crud');

async function createUser(req, res) {
    try {
        const { name, email, password, phone, user_type } = req.body;
        const result = await userFunctions.registration(name, email, password, phone, user_type);

        if (result.status === 'error') {
            return res.status(400).json(result); 
        }
        res.status(200).json({ message: `successful registration: ${JSON.stringify(result, null, 2)}` });
    } catch (err) {
        res.status(500).json({ message: 'An internal server error occurred.' });
    }
}
async function userDashboard(req,res){
    try {
        const user_id=req.params.id;
        const user=await userFunctions.displayUserInformation(user_id);
        if(!user){
            res.status(404).json({message:'User not found'});
        }
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ message: 'An internal server error occurred.' });
    }
}
async function logiN(req,res){
    try {
        const result=await userFunctions.login(req.body.email,req.body.password);
        res.cookie("user_token",result.token,{
            httpOnly:true,
            //secure:true send the token in https (only in production)
            maxAge: 3600000
        })
        res.status(200).json({message:result.message});

    } catch (error) {
        res.status(500).json({ message: 'An internal server error occurred.' });
    }
}
module.exports = { userDashboard,createUser,logiN };
