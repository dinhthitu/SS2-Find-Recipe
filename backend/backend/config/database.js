const { Sequelize } = require('sequelize');
const Database = require('better-sqlite3');
const db = new Database('./database.sqlite', { verbose: console.log });

module.exports = db;
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: false
});

const fs = require('fs');
const path = require('path');

const initSql = fs.readFileSync(path.join(__dirname, 'database.sql'), 'utf8');
sequelize.query(initSql).then(() => {
  sequelize.sync();
});

module.exports = sequelize;