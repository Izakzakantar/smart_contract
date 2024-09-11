const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Donation = require('./donation');  // Importing the Donation model for foreign key reference

const Receipt = sequelize.define('Receipt', {
  receipt_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  receipt_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  pdf_file: {
    type: DataTypes.BLOB('long'),  // Storing the PDF file as binary data
  },
  donation_id: {
    type: DataTypes.UUID,
    references: {
      model: Donation,  // References the Donations model
      key: 'donation_id',
    },
    onDelete: 'CASCADE',  // Automatically deletes receipt if the associated donation is deleted
  }
}, {
  tableName: 'Receipts',
  timestamps: false,  // Disable automatic timestamps
});

// Define association with the Donation model
Donation.hasMany(Receipt, { foreignKey: 'donation_id', onDelete: 'CASCADE' });
Receipt.belongsTo(Donation, { foreignKey: 'donation_id' });

module.exports = Receipt;
