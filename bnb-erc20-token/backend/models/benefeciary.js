const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('..models/user');  // Importing the Users model for foreign key reference

const Beneficiary = sequelize.define('Beneficiary', {
  beneficiary_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  first_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING(15),
    allowNull:false,
    unique:true
  },
  user_id: {
    type: DataTypes.UUID,
    references: {
      model: User,  // References the Users model
      key: 'user_id',
    },
    onDelete: 'CASCADE',  // Automatically deletes beneficiary if the associated user is deleted
  }
}, {
  tableName: 'Beneficiaries',
  timestamps: false,  // Disable timestamps
});

User.hasMany(Beneficiary, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Beneficiary.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Beneficiary;
