const express = require('express');
const userController = require('../controllers/userController');
const routes = express.Router();
const prefix = '/api/';

//users 
routes.post(`${prefix}user`, userController.criarUsuario);
routes.get(`${prefix}user`, userController.listaToda);
routes.delete(`${prefix}user/:id`, userController.deletar);
routes.get(`${prefix}user/:id`, userController.opterPerfilEspecifico);
routes.put(`${prefix}user/:id`, userController.atualizarEspecifico);

module.exports = routes;
