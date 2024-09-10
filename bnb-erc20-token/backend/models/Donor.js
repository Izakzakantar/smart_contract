const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Donor = sequelize.define('Donor', {
  donor_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  first_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
}, {
  tableName: 'Donors',
  timestamps: false,
});

module.exports = Donor;
