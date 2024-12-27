const nodemailer = require("nodemailer");
const config = require("../../config.json");
const otp = require("../utils/otpCode");
const redis = require("redis");

async function emailSendCode(req,res) {
  try {
    const redisClient = await redis.createClient({
      socket: {
        host: "127.0.0.1",
        port: 6379,
      },
    });

    redisClient.on("error", (err) => {
      console.error("Redis Client Error:", err);
    });

    await redisClient.connect();
    console.log("Redis connected successfully!");

    const otp_code = otp.generateNumericOTP();
    const otp_obj = {
      key: "otp",
      value: otp_code,
      ttl: 45,
    };

    await redisClient.setEx(otp_obj.key, otp_obj.ttl, otp_obj.value);
    console.log(
      `Key: ${otp_obj.key} inserted with value: ${otp_obj.value} and will expire in ${otp_obj.ttl} second.`
    );

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.email,
        pass: config.ApplicationPassword,
      },
    });
    await transporter.sendMail({
        from:config.email,
        to:req.body.email,
        subject:"Your Otp Code",
        text:`Your OTP code is ${otp_obj.value} `
    });
    res.status(200).json({message:"The code has been sent your email"})

   
  } catch (error) {
    console.error("Error in emailverification function:", error);
  }
}
//next step is to create a route which allows us to send the code 
//before that we must redirect the user to an otp page then we use the "emailverification" function to send the code
//after that he will send the code in another api endpoint then we will verify it with redis.get 
//and if the code is valid we redirect him to the dashboard 
//and if no he will be redicted again to the /email-verification endpoint 
//emailverification();
module.exports={emailSendCode};