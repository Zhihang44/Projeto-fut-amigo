const Sequelize = require('sequelize');
const dbConfig = require('../config/database');
const User = require('../models/user');

const connection = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    {
        host: dbConfig.host,
        dialect: dbConfig.dialect
    }
);

User.init(connection);

module.exports = connection;