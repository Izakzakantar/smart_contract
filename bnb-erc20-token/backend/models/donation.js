const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Donor = require('../models/donor');  // Importing the Donor model for foreign key reference
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
  
}, {
  tableName: 'Donations',
  timestamps: false,  // Disable automatic timestamps
});

// Define associations
Donor.hasMany(Donation, { foreignKey: 'donor_id', onDelete: 'CASCADE' });
Donation.belongsTo(Donor, { foreignKey: 'donor_id' });
module.exports = Donation;