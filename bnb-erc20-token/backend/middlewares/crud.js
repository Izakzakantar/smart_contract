const User = require('../models/User');
const bcrypt = require('bcrypt');

async function registration(...args) {
    const saltRounds = 10;
    try {
        const hashedPassword = await bcrypt.hash(args[2], saltRounds);
        const query = await User.create({
            name: args[0],
            email: args[1],
            password: hashedPassword,
            phoneNumber: args[3],
            userType: args[4]
        });
        return query.toJSON();
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            const duplicateField = error.errors[0].path; // 'phoneNumber' or 'email'
            const duplicateValue = error.errors[0].value;

            return {
                status: 'error',
                message: `${duplicateField} already exists.`,
                field: duplicateField,
                value: duplicateValue
            };
        }
        // Handle any other errors
        return { status: 'error', message: 'An internal server error occurred.' };
    }
}

module.exports = { registration };
