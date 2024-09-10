const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

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
}, {
  tableName: 'Receipts',
  timestamps: false,  // Disable automatic timestamps like createdAt and updatedAt
});

module.exports = Receipt;
