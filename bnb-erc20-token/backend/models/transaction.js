const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Wallet = require('./wallet');  // Importing the Wallet model for foreign key reference
const Donation = require('./donation');  // Importing the Donation model
const SmartContract = require('./smartcontract');  // Importing the SmartContract model

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
      model: Wallet,  // References the Wallets model
      key: 'wallet_id',
    },
    onDelete: 'CASCADE',  // Automatically deletes transaction if the wallet is deleted
  },
  donation_id: {
    type: DataTypes.UUID,
    references: {
      model: Donation,  // References the Donations model
      key: 'donation_id',
    },
    onDelete: 'CASCADE',  // Automatically deletes transaction if the donation is deleted
  },
  smartcontract_id: {
    type: DataTypes.UUID,
    references: {
      model: SmartContract,  // References the SmartContracts model
      key: 'contract_id',
    },
    onDelete: 'CASCADE',  // Automatically deletes transaction if the smart contract is deleted
  },
}, {
  tableName: 'Transactions',  // Points to Transactions table
  timestamps: false,  // Disable automatic timestamps
});

// Define associations
Wallet.hasMany(Transaction, { foreignKey: 'wallet_id', onDelete: 'CASCADE' });
Transaction.belongsTo(Wallet, { foreignKey: 'wallet_id' });

Donation.hasMany(Transaction, { foreignKey: 'donation_id', onDelete: 'CASCADE' });
Transaction.belongsTo(Donation, { foreignKey: 'donation_id' });

SmartContract.hasMany(Transaction, { foreignKey: 'smartcontract_id', onDelete: 'CASCADE' });
Transaction.belongsTo(SmartContract, { foreignKey: 'smartcontract_id' });

module.exports = Transaction;
