const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');  

// Define the model for the 'Users' table
const User = sequelize.define('User', {
  user_id: {
    type: DataTypes.CHAR(36),  
    defaultValue: DataTypes.UUIDV4,  
    primaryKey: true, 
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,  
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING(15),  
  },
  userType: {
    type: DataTypes.ENUM('Donor', 'Beneficiary'),  
    allowNull: false,
  }
}, {
  tableName: 'Users',  
  timestamps: true,  
});

module.exports = User;
