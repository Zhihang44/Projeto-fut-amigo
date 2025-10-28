const Sequelize = require('sequelize');
const dbConfig = require('../config/database');
const User = require('../models/user');
const UserPreference = require('../models/userPreference');
const Club = require('../models/club');
const Player = require('../models/player');
const PlayerImage = require('../models/playerImage');
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
Club.init(connection); // inicializa os modelos clubes
Player.init(connection); // inicializa os modelos jogadores
PlayerImage.init(connection); // inicializa os modelos de imagens dos jogadores

User.associate(connection.models); // associa usuários com preferencias do usuário
UserPreference.associate(connection.models); // associa preferencias do usuário com usuários
Club.associate(connection.models); // associa clubes com jogadores
Player.associate(connection.models); // associa jogadores com clubes
PlayerImage.associate(connection.models); // associa imagens dos jogadores com jogadores

module.exports = connection; // exporta a conexão 