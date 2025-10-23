const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');
const User = require('../models/user');

// Função para verificar e decodificar o token JWT
const verificaTokens = async (authHeader) => {
    if (!authHeader) {
        throw new Error('Token não fornecido');
    }

    const [, token] = authHeader.split(' ');

    if (!token) {
        throw new Error('Token mal formatado');
    }

    try {
        const decoded = jwt.verify(token, authConfig.jwt.secret);
        return decoded;
    } catch (error) {
        throw new Error('Token inválido ou expirado');
    }
};

// Middleware para proteger rotas que exigem autenticação
const verificaAutenticacao = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const decoded = await verificaTokens(authHeader);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ error: error.message });
    }
};

module.exports = {
    verificaTokens,
    verificaAutenticacao
};
