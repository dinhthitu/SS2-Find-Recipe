'use strict';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: true, // Lưu URL của avatar từ Google
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true, // Allow null for Google auth users
      },
      googleId: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      savedRecipes: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      role: {
        type: DataTypes.ENUM('user', 'admin'),
        defaultValue: 'user',
        allowNull: false,
      },
    },
    {
      tableName: 'Users',
      timestamps: true,
      paranoid: true,
    }
  );

  User.associate = (models) => {
    User.hasMany(models.Recipe, {
      as: 'recipes',
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });

    User.belongsToMany(models.Recipe, {
      as: 'wishlist',
      through: 'UserWishlist',
      foreignKey: 'userId',
      otherKey: 'recipeId',
    });
  };

  User.beforeCreate(async (user) => {
    if (user.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    }
  });

  User.prototype.comparePassword = async function (candidatePassword) {
    return candidatePassword && this.password ? await bcrypt.compare(candidatePassword, this.password) : false;
  };

  User.prototype.getJwtToken = function () {
    return jwt.sign({ id: this.id, role: this.role }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE || '1d',
    });
  };

  return User;
};