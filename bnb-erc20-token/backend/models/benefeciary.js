const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');  // Import the Sequelize instance

const Beneficiary = sequelize.define('Beneficiary', {
  beneficiary_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  first_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING(15),
  },
}, {
  tableName: 'Beneficiaries',
  timestamps: false,  // Disable createdAt and updatedAt fields
});

module.exports = Beneficiary;
