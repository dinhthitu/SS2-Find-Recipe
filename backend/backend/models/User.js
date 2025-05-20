module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
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
      validate: { isEmail: true },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    savedRecipes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    role: { type: DataTypes.STRING, defaultValue: 'user' }
  }, {
    timestamps: true,
    paranoid: true
  });

  User.associate = (models) => {
    User.hasMany(models.Recipe, { 
      as: 'recipes',
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
    
    User.belongsToMany(models.Recipe, {
      as: 'wishlist',
      through: 'UserWishlist',
      foreignKey: 'userId',
      otherKey: 'recipeId'
    });
  };

  return User;
};
