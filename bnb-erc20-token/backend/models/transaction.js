const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Wallet = require('./wallet');  // Importing the Wallet model for foreign key reference
const Beneficiary = require('./beneficiary');  // Importing the Beneficiary model
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
    type: DataTypes.ENUM('Buy', 'Transfer'),
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
    onDelete: 'CASCADE',
  },
  beneficiary_id: {
    type: DataTypes.UUID,
    references: {
      model: Beneficiary,  // References the Beneficiaries model
      key: 'beneficiary_id',
    },
    onDelete: 'CASCADE',
  },
  smartcontract_id: {
    type: DataTypes.UUID,
    references: {
      model: SmartContract,  // References the SmartContracts model
      key: 'contract_id',
    },
    onDelete: 'CASCADE',
  },
}, {
  tableName: 'Transactions',
  timestamps: false,
});

Wallet.hasMany(Transaction, { foreignKey: 'wallet_id', onDelete: 'CASCADE' });
Transaction.belongsTo(Wallet, { foreignKey: 'wallet_id' });

Beneficiary.hasMany(Transaction, { foreignKey: 'beneficiary_id', onDelete: 'CASCADE' });
Transaction.belongsTo(Beneficiary, { foreignKey: 'beneficiary_id' });

SmartContract.hasMany(Transaction, { foreignKey: 'smartcontract_id', onDelete: 'CASCADE' });
Transaction.belongsTo(SmartContract, { foreignKey: 'smartcontract_id' });

module.exports = Transaction;
