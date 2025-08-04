const donationOperations=require('../middlewares/crudDonations');
const jwt=require('../utils/jsonWebToken');
async function newDonation(req,res){
    try {
        const {firstName, donorAddress, amount, remark} =req.body
        //console.log(req.body);
        // Extract token from cookies or authorization header
        const token = req.cookies.tokenn || req.headers.authorization.split(" ")[1];
        console.log(token);
        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }
        let decoded;
        try {
            console.log(decoded);
            decoded = await jwt.verify(token);  
            console.log(decoded);
        } catch (err) {
        return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
        };
        const result=await donationOperations.createDonations(firstName,decoded.userId,donorAddress,amount,remark);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({status:'error',message:"Internal server error"});
    }
}
module.exports={newDonation};
