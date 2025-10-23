const Sequelize = require('sequelize');
const dbConfig = require('../config/database');
const User = require('../models/user');
const UserPreference = require('../models/userPreference');
const dotenv = require('dotenv');

dotenv.config(); //init dotenv

const connection = new Sequelize( // use env variables, cria o tunel para conexão com o banco
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'postgres'
    }
);

User.init(connection); // inicializa os modelos
UserPreference.init(connection); // inicializa os modelos preferencias do usuário
UserPreference.associate(connection.models); // associa preferencias do usuário com usuário

module.exports = connection; // exporta a conexão 