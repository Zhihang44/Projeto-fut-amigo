const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const verificaAdmin = require('../middlewares/verificaAdmin');
const { verificaAutenticacao } = require('../middlewares/verificaTokens');
const userPreferenceController = require('../controllers/userPreferenceController');
const clubController = require('../controllers/clubController');
const playerController = require('../controllers/playerController');   
const playerImageController = require('../controllers/playerImageController');


const routes = express.Router();
const prefix = '/api/';

// Rotas de autenticação
routes.post(`${prefix}auth/register`, authController.criarUsuario);
routes.post(`${prefix}auth/login`, authController.login);
routes.post(`${prefix}auth/change-password`, verificaAutenticacao, authController.mudarSenha);

// Rotas de preferências do usuário (protegidas) - DEVE VIR ANTES DE /user/:id
routes.get(`${prefix}user/preferences`, userPreferenceController.obterPreferencias);
routes.put(`${prefix}user/preferences`, userPreferenceController.atualizarPreferencias);
routes.post(`${prefix}user/preferences`, userPreferenceController.criarPreferencias);

// Rotas de perfil do usuário autenticado (protegidas) - DEVE VIR ANTES DE /user/:id
routes.get(`${prefix}user/profile`, verificaAutenticacao, userController.obterAutenticado);
routes.put(`${prefix}user/profile`, verificaAutenticacao, userController.atualizarPerfilAutenticado);

// Rotas de usuários (protegidas - admin)
routes.get(`${prefix}user`, verificaAdmin, userController.listaToda);
routes.delete(`${prefix}user/:id`, verificaAdmin, userController.deletar);
routes.get(`${prefix}user/:id`, verificaAdmin, userController.obterPerfilEspecifico);
routes.put(`${prefix}user/:id`, verificaAdmin, userController.atualizarEspecifico);

// Rotas de clubes
routes.post(`${prefix}club`, clubController.criarClub);
routes.get(`${prefix}club/:id/players`, clubController.obterPlayerDosClubs);
routes.get(`${prefix}club/:id`, clubController.obterClubEspecifico);


// Rotas de Player
routes.post(`${prefix}player`, playerController.criarJogador);
routes.put(`${prefix}player/:id`, playerController.atualizarEspecifico);
routes.get(`${prefix}player/:id`, playerController.obterJogadorEspecifico);
routes.delete(`${prefix}player/:id`, playerController.deletar);

// Rotas de PlayerImage
routes.delete(`${prefix}players/:id/images/:imageId`,playerImageController.removeImage);
routes.post(`${prefix}players/:id/images`, playerImageController.addImage);

module.exports = routes;  