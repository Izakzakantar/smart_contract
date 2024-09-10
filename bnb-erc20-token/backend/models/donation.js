const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Donor = require('./Donor');

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
      model: 'Donors',
      key: 'donor_id',
    },
    onDelete: 'CASCADE',
  },
}, {
  tableName: 'Donations',
  timestamps: false,
});

Donor.hasMany(Donation, { foreignKey: 'donor_id' });
Donation.belongsTo(Donor, { foreignKey: 'donor_id' });

module.exports = Donation;
