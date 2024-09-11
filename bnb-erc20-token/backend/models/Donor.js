const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('..models/user');

const Donor = sequelize.define('Donor', {
  donor_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  first_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  user_id: {
    type: DataTypes.UUID,
    references: {
      model: User,
      key: 'user_id',
    },
    onDelete: 'CASCADE',  // Automatically deletes donor if the associated user is deleted
  }
}, {
  tableName: 'Donors',
  timestamps: false,  // No timestamps needed
});

User.hasMany(Donor, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Donor.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Donor;
