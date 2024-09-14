const express=require('express');
const valid=require('../middlewares/validation')
const registration=require('../controllers/userController');
const router=express.Router();
router.post('/api/v1/users/register',valid.registerValidation,registration.createUser);
module.exports=router;