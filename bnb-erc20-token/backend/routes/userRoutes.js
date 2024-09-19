const express=require('express');
const valid=require('../middlewares/validation')
const userMidllewares=require('../controllers/userController');
const router=express.Router();
router.post('/api/v1/users/register',valid.registerValidation,userMidllewares.createUser);
router.get('/api/v1/users/:id',userMidllewares.userDashboard);
router.post('/api/v1/users/login',userMidllewares.logiN)
module.exports=router;