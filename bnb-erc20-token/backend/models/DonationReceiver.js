const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Donation = require('../models/donation');
const Donor = require('../models/donor');

const DonationReceiver = sequelize.define('DonationReceiver', {
  receiver_id: {
    type: DataTypes.CHAR(36),
    primaryKey: true,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
  },
  donation_id: {
    type: DataTypes.CHAR(36),
    allowNull: false,
    references: {
      model: Donation,
      key: 'donation_id',
    },
    onDelete: 'CASCADE',
  },
  donation_time: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  donor_address: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  donor_id: {
    type: DataTypes.CHAR(36),
    allowNull: false,
    references: {
      model: Donor,
      key: 'donor_id',
    },
    onDelete: 'CASCADE',
  },
}, {
  tableName: 'DonationReceiver',
  timestamps: false,
});

Donation.hasMany(DonationReceiver, { foreignKey: 'donation_id', onDelete: 'CASCADE' });
DonationReceiver.belongsTo(Donation, { foreignKey: 'donation_id' });
Donor.hasMany(DonationReceiver, { foreignKey: 'donor_id', onDelete: 'CASCADE' });
DonationReceiver.belongsTo(Donor, { foreignKey: 'donor_id' });

module.exports = DonationReceiver;
