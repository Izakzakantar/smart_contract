const register = require('../middlewares/crud');

async function createUser(req, res) {
    try {
        const { name, email, password, phone, user_type } = req.body;
        const result = await register.registration(name, email, password, phone, user_type);

        if (result.status === 'error') {
            return res.status(400).json(result); 
        }
        res.status(200).json({ message: `successful registration: ${JSON.stringify(result, null, 2)}` });
    } catch (err) {
        res.status(500).json({ message: 'An internal server error occurred.' });
    }
}

module.exports = { createUser };
