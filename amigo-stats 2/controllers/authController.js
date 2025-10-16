const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');
const authService = require('../services/authService');

module.exports = {
    async criarUsuario (req, res){
            try {
                const { name, email, password, role, lastLogin } = req.body;
                const usuario = await authService.criarUsuario(name, email, password, role, lastLogin);
                return res.json(usuario);
            } catch (error) {
                await transaction.rollback()
                return res.status(500).json({ error: error.message });
            }
        },
    }