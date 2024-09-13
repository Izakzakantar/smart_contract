const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');  // Assuming Sequelize instance is configured
const User = require('../models/User');  // Importing the Users model for foreign key reference

const Wallet = sequelize.define('Wallet', {
  wallet_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  balance: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  user_id: {
    type: DataTypes.UUID,
    references: {
      model: User, // References the Users model
      key: 'user_id',
    },
    onDelete: 'CASCADE',  // If a user is deleted, their wallets are deleted
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    onUpdate: DataTypes.NOW,
  },
}, {
  tableName: 'Wallets',
  timestamps: true,  // Automatically handles createdAt and updatedAt
});

User.hasMany(Wallet, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Wallet.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Wallet;
