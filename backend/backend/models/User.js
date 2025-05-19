module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    name: { type: DataTypes.STRING },
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
