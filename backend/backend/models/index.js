const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const db = {};
const User = require('./User')(sequelize, require('sequelize').DataTypes);
const Recipe = require('./Recipe')(sequelize, require('sequelize').DataTypes);
const UserWishlist = require('./UserWishList')(sequelize, require('sequelize').DataTypes);

const models = { User, Recipe, UserWishlist };
Object.values(models).forEach(model => {
  if (model.associate) {
    model.associate(models);
  }
});

module.exports = models;
fs.readdirSync(__dirname)
  .filter(file => file !== 'index.js' && file.endsWith('.js'))
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes); // Gọi hàm factory
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;