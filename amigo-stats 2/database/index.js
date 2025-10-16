const Sequelize = require(`sequelize`);
const dbConfig = require(`../config/database`);
const users = require(`../models/user`)

const connection = new Sequelize(dbConfig);

users.init(connection);
/*users.associate(connection.models);*/

module.exports = connection;