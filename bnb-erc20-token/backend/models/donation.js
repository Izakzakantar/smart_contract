const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Donor = require('./donor');  // Importing the Donor model for foreign key reference
const Beneficiary = require('./beneficiary');  // Importing the Beneficiary model

const Donation = sequelize.define('Donation', {
  donation_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  date_of_donation: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  donation_type: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  remark: {
    type: DataTypes.STRING(255),
  },
  donor_id: {
    type: DataTypes.UUID,
    references: {
      model: Donor,  // References the Donors model
      key: 'donor_id',
    },
    onDelete: 'CASCADE',  // Automatically deletes donation if the donor is deleted
  },
  beneficiary_id: {
    type: DataTypes.UUID,
    references: {
      model: Beneficiary,  // References the Beneficiaries model
      key: 'beneficiary_id',
    },
    onDelete: 'CASCADE',  // Automatically deletes donation if the beneficiary is deleted
  }
}, {
  tableName: 'Donations',
  timestamps: false,  // Disable automatic timestamps
});

// Define associations
Donor.hasMany(Donation, { foreignKey: 'donor_id', onDelete: 'CASCADE' });
Donation.belongsTo(Donor, { foreignKey: 'donor_id' });

Beneficiary.hasMany(Donation, { foreignKey: 'beneficiary_id', onDelete: 'CASCADE' });
Donation.belongsTo(Beneficiary, { foreignKey: 'beneficiary_id' });

module.exports = Donation;
