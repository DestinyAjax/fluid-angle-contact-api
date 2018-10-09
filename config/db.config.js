const database = require('./config');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    database.development.database, 
    database.development.username, 
    database.development.password, 
    {
        host: database.development.host,
        dialect: database.development.dialect,
        operatorsAliases: false,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models/tables
db.users = require('../models/user.model')(sequelize, Sequelize);

module.exports = db;