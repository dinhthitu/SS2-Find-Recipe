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
    // Không cần gọi addIndex vì chỉ mục đã được định nghĩa trong model
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('UserWishlists');
  }
};