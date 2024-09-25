const express=require('express');
const donations=require('../controllers/donationController')
const router=express.Router();
router.post('/api/v1/donations/create',donations.newDonation);
module.exports=router