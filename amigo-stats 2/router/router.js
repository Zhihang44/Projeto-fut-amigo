const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const verificaAdmin = require('../middlewares/verificaAdmin');
const { verificaAutenticacao } = require('../middlewares/verificaTokens');
const userPreferenceController = require('../controllers/userPreferenceController');

const routes = express.Router();
const prefix = '/api/';

// Rotas de autenticação (públicas)
routes.post(`${prefix}auth/register`, authController.criarUsuario);
routes.post(`${prefix}auth/login`, authController.login);
routes.post(`${prefix}auth/change-password`, verificaAutenticacao, authController.mudarSenha);

// Rotas de preferências do usuário (protegidas) - DEVE VIR ANTES DE /user/:id
routes.get(`${prefix}user/preferences`, verificaAutenticacao, userPreferenceController.obterPreferencias);
routes.put(`${prefix}user/preferences`, verificaAutenticacao, userPreferenceController.atualizarPreferencias);

// Rotas de perfil do usuário autenticado (protegidas) - DEVE VIR ANTES DE /user/:id
routes.get(`${prefix}user/profile`, verificaAutenticacao, userController.obterAutenticado);
routes.put(`${prefix}user/profile`, verificaAutenticacao, userController.atualizarPerfilAutenticado);

// Rotas de usuários (protegidas - admin)
routes.get(`${prefix}user`, verificaAdmin, userController.listaToda);
routes.get(`${prefix}user/:id`, verificaAdmin, userController.obterPerfilEspecifico);
routes.put(`${prefix}user/:id`, verificaAdmin, userController.atualizarEspecifico);
routes.delete(`${prefix}user/:id`, verificaAdmin, userController.deletar);

module.exports = routes;
