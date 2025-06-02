const { Sequelize } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: false,
});

sequelize.sync({ force: false })
  .then(() => console.log('Database synced'))
  .catch(err => console.error('Database sync error:', err));

module.exports = sequelize;

