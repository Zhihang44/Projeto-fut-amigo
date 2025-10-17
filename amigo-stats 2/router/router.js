const express = require('express');
const userController = require('../controllers/userController'); 
const authController = require('../controllers/authController');
const verificaToken = require('../middlewares/verificaTokens');
const verificaAdmin = require('../middlewares/verificaAdmin');

const routes = express.Router();
const prefix = '/api/';

// Rotas de autenticação
routes.post(`${prefix}auth/register`, verificaToken, verificaAdmin, authController.criarUsuario);
routes.post(`${prefix}auth/login`, authController.login);

// Rotas de usuários
routes.get(`${prefix}user`, verificaToken, verificaAdmin, userController.listaToda);
routes.delete(`${prefix}user/:id`, verificaToken, verificaAdmin, userController.deletar);
routes.get(`${prefix}user/:id`, verificaToken, verificaAdmin, userController.opterPerfilEspecifico);
routes.put(`${prefix}user/:id`, verificaToken, verificaAdmin, userController.atualizarEspecifico);

module.exports = routes;
