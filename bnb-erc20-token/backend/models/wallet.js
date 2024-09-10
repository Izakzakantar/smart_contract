const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user');

const Wallet = sequelize.define('Wallet', {
  address: {
    type: DataTypes.STRING(255),
    primaryKey: true,
    allowNull: false,
  },
  balance: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.UUID,
    references: {
      model: 'Users',
      key: 'user_id',
    },
    onDelete: 'CASCADE',
  },
}, {
  tableName: 'Wallets',
  timestamps: true,
});

User.hasMany(Wallet, { foreignKey: 'user_id' });// A user can have multiple wallets
Wallet.belongsTo(User, { foreignKey: 'user_id' }); // A wallet belongs to a user

module.exports = Wallet;
