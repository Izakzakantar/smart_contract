const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const SmartContract = sequelize.define('SmartContract', {
  contract_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  contract_address: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
  },
  deployment_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  description: {
    type: DataTypes.STRING(255),
  },
}, {
  tableName: 'SmartContracts',
  timestamps: false,
});

module.exports = SmartContract;
