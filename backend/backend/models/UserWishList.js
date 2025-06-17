module.exports = (sequelize, DataTypes) => {
  const UserWishlist = sequelize.define('UserWishlist', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users', // Sửa từ 'User' thành 'Users'
        key: 'id'
      }
    },
    recipeId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Recipes', // Sửa từ 'Recipe' thành 'Recipes'
        key: 'id'
      }
    }
  }, {
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['userId', 'recipeId']
      }
    ]
  });

  return UserWishlist;
};
