const express=require('express');
const wallets=require('../controllers/walletController')
const router=express.Router();
router.post(' /api/v1/wallets/create',wallets.createWallet);
module.exports=router;