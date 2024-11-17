const validator = require('validator');

function registerValidation(req, res, next) {
    const { name, email, password, phone, user_type } = req.body;

    if (!validator.isLength(name, { min: 10, max: 50 })) {
        return res.status(400).json({ message: "Name must be between 10 and 50 characters." });
    }

    const obj = {
        name: name,
        password: password,
        phone: phone
    };

    // input validation :preventing from server-side XSS
    //-------------------------------------------------------------------------
    if (/&lt;|&gt;|&amp;|&quot;|&#x27;|&#x2F;/.test(validator.escape(obj.name))) {
        return res.status(400).json({ message: "Enter valid username!" });
    }

    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "Invalid email" });
    }

    //-------------------------------------------------------------------------
    if (!validator.isLength(email, { max: 50 })) {
        return res.status(400).json({ message: "Email must be under 50 characters" });
    }
    if (!validator.isLength(email, { min: 5 })) {
        return res.status(400).json({ message: "Invalid email" });
    }

    // input validation :preventing from server-side XSS
    //-------------------------------------------------------------------------
    if (/&lt;|&gt;|&amp;|&quot;|&#x27;|&#x2F;/.test(validator.escape(obj.password))) {
        return res.status(400).json({ message: "Please enter a valid password" });
    }
    if (!validator.isLength(obj.password, { min: 10, max: 50 })) {
        return res.status(400).json({ message: "Password must be between 10 and 50 characters." });
    }

    if (/&lt;|&gt;|&amp;|&quot;|&#x27;|&#x2F;/.test(validator.escape(obj.phone))) {
        return res.status(400).json({ message: "Please enter a valid phone number" });
    }
    if (!validator.isMobilePhone(phone, 'any')) {
        return res.status(400).json({ message: "Please enter a valid phone number." });
    }

    const allowedUserTypes = ['Donor', 'Beneficiary'];
    if (user_type !== allowedUserTypes[0] && user_type !== allowedUserTypes[1]) {
        return res.status(400).json({ message: "Please choose Donor or Beneficiary" });
    }

    //--------------------------------------------------------------------------

    next();
}

module.exports = { registerValidation };
