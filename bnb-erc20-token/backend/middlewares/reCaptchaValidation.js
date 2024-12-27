const axios = require("axios");
const config = require("../../config.json");

async function recaptchaValidation(req, res, next) {
  const { captchaToken } = req.body;
  console.log(req.body);
  
  if (!captchaToken) {
    return res.status(400).json({ message: "Captcha token is required." });
  }
  try {
    const verificationUrl = "https://www.google.com/recaptcha/api/siteverify";
    const response = await axios.post(verificationUrl, null, {
      params: {
        secret: config.reCaptcha_backend_key,
        response: captchaToken,
      },
    });
    if (!response.data.success) {
      return res.status(400).json({
        message: "Captcha verification failed.",
        errors: response.data.errorCodes || [],
      });
    }
    next();
  } catch (error) {
    
    console.error("Error during captcha validation:", error.message);
    return res.status(500).json({ message: "Internal server error." });
  }
}

module.exports = {recaptchaValidation};
