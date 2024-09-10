const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Wallet = require('./wallet');
const Donation = require('./donation');

const Transaction = sequelize.define('Transaction', {
  transaction_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  transaction_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  transaction_type: {
    type: DataTypes.ENUM('Send', 'Receive'),
    allowNull: false,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  wallet_id: {
    type: DataTypes.UUID,
    references: {
      model: 'Wallets',
      key: 'address',
    },
    onDelete: 'CASCADE',
  },
  donation_id: {
    type: DataTypes.UUID,
    references: {
      model: 'Donations',
      key: 'donation_id',
    },
    onDelete: 'CASCADE',
  },
}, {
  tableName: 'Transactions',
  timestamps: false,
});

Wallet.hasMany(Transaction, { foreignKey: 'wallet_id' });
Transaction.belongsTo(Wallet, { foreignKey: 'wallet_id' });

Donation.hasMany(Transaction, { foreignKey: 'donation_id' });
Transaction.belongsTo(Donation, { foreignKey: 'donation_id' });

module.exports = Transaction;
