const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');  // Assuming Sequelize instance is configured

const SmartContract = sequelize.define('SmartContract', {
  contract_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  contract_address: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,  // Ensures the contract address is unique
  },
  deployment_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,  // Automatically set the current date and time
  },
  description: {
    type: DataTypes.STRING(255),
    allowNull: true,  // Optional description field
  }
}, {
  tableName: 'SmartContracts',
  timestamps: false,  // Disable automatic timestamps (createdAt, updatedAt)
});

module.exports = SmartContract;
