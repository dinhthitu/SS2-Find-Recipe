'use strict';
const jwt = require('jsonwebtoken');
const dotenv = require ('dotenv')
dotenv.config()
module.exports = (sequelize, DataTypes) => {
  const OtpUser = sequelize.define(
    'OtpUser',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      otp: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      expiresAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      tableName: 'Otps',
      timestamps: true,
    }
  );

  // Generate JWT token
  OtpUser.prototype.getJwtToken = function () {
    return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIREOTP || '3m',
    });
  };

  return OtpUser;
};
