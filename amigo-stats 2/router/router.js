const express = require('express');
const userController = require('../controllers/userController'); 
const authController = require('../controllers/authController');
const verificaAdmin = require('../middlewares/verificaAdmin');
const userPreferenceController = require('../controllers/userPreferenceController');

const routes = express.Router();
const prefix = '/api/';

// Rotas de autenticação
routes.post(`${prefix}auth/register`, verificaAdmin, authController.criarUsuario);
routes.post(`${prefix}auth/login`, authController.login);
routes.post(`${prefix}auth/change-password`, authController.mudarSenha);

// Rotas de usuários
routes.get(`${prefix}user`,  verificaAdmin, userController.listaToda);
routes.delete(`${prefix}user/:id`, verificaAdmin, userController.deletar);
routes.get(`${prefix}user/profile`, userController.obterAutenticado);
routes.get(`${prefix}user/:id`, verificaAdmin, userController.obterPerfilEspecifico);
routes.put(`${prefix}user/profile`, userController.atualizarPerfilAutenticado);
routes.put(`${prefix}user/:id`, verificaAdmin, userController.atualizarEspecifico);

// Rotas do userPreference
routes.get(`${prefix}user/preferences`, userPreferenceController.obterPreferencias);
routes.put(`${prefix}user/preferences`, userPreferenceController.atualizarPreferencias);


module.exports = routes;
