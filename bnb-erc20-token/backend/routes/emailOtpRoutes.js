const express=require('express');
const emailverification=require('../services/emailVerification');
const router=express.Router();
router.get('/api/v1/email-verification',emailverification);
