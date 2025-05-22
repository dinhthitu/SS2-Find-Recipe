'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        field: 'username',   // ánh xạ tên thuộc tính 'name' vào cột 'username' trong DB
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      savedRecipes: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: 'user',
      },
    },
    {
      tableName: 'Users',
      timestamps: true,
      paranoid: true, // để dùng deletedAt
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

  return User;
};
