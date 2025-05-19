module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('UserWishlists', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      recipeId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Recipes',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.addIndex('UserWishlists', ['userId', 'recipeId'], {
      unique: true
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('UserWishlists');
  }
};