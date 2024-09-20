const walletfunctions = require('../middlewares/walletCreation');
const jwt = require('../utils/jsonWebToken');  
const config = require('../config/config');    
async function createWallet(req, res) {
  try {
    const { balance, address, smartcontract_id } = req.body;
    // Extract token from cookies or authorization header
    const token = req.cookies.token || req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }
    let decoded;
    try {
      decoded = await jwt.verify(token, config.jwt_key);  
    } catch (err) {
      return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
    }
    const result = await walletfunctions.createWallet(balance, address, decoded.user_id, smartcontract_id);
    //console.log(result);
    res.status(200).json({ message: "Wallet has been created successfully!" });
  } catch (error) {
    console.error("Error creating wallet:", error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
}

module.exports = { createWallet };
