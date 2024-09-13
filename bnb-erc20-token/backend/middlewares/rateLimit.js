const rateLimit=require('express-rate-limit');
const limiter=rateLimit({
    windowMs: 100 * 1000,//10 minutes
    max: 5,// 5 request per 10 seconds
    headers: true, // send rate limit info in the response headers
    handler:(req,res,options)=>{//this is function which will log information if the ip has been rate limited
        console.log(`IP : ${req.ip} has been rate limited`);
        res.status(429).json({message: "Too many requests, you are blocked for 10 minutes",})
    },
    standardHeaders: true,  // use RateLimit-* headers for response
})
module.exports=limiter;