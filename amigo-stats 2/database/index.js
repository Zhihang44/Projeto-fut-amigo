const Sequelize = require('sequelize');
const dbConfig = require('../config/database');
const User = require('../models/user');
const UserPreference = require('../models/userPreference');

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
UserPreference.init(connection);
UserPreference.associate(connection.models);

module.exports = connection;