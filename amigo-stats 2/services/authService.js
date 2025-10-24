const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const authConfig = require('../config/auth');
const { verificaTokens } = require('../middlewares/verificaTokens');

const criarUsuario = async (name, email, password, role) => {
    try {
        // Verifica se o email já existe
        const usuarioExistente = await User.findOne({ where: { email } });
        if (usuarioExistente) {
            throw new Error('Email já cadastrado');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const usuario = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
            lastLogin: new Date()
        });

        // Retorna usuário sem a senha
        const { password: _, ...usuarioSemSenha } = usuario.toJSON();
        return usuarioSemSenha;
    } catch (error) {
        throw new Error('Erro ao criar usuário: ' + error.message);
    }
};

const login = async (email, password) => {
    try {
        const user = await User.findOne({ where: { email }});

        if (!user) {
            throw new Error('Credenciais inválidas');
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            throw new Error('Credenciais inválidas');
        }

        // Atualiza o último login
        await user.update({ lastLogin: new Date() });

        // Gera o token JWT
        const token = jwt.sign(
            { 
                id: user.id,
                email: user.email,
                role: user.role 
            },
            authConfig.jwt.secret,
            { expiresIn: authConfig.jwt.expiresIn }
        );

        return token;

    } catch (error) {
        throw error;
    }
};

const mudarSenha = async (email, oldPassword, newPassword, authHeader) => {
    try {
        const decodedToken = await verificaTokens(authHeader);

        // Verifica se o email corresponde ao token
        if (decodedToken.email !== email) {
            throw new Error('Email não corresponde ao token fornecido');
        }

        // Busca o usuário no banco
        const user = await User.findOne({ where: { id: decodedToken.id } });

        if (!user) {
            throw new Error('Usuário não encontrado');
        }

        // Verifica se a senha antiga está correta
        const isValidPassword = await bcrypt.compare(oldPassword, user.password);

        if (!isValidPassword) {
            throw new Error('Senha antiga inválida');
        }

        // Valida a nova senha
        if (newPassword.length < 6) {
            throw new Error('A nova senha deve ter pelo menos 6 caracteres');
        }

        // Atualiza a senha
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        await user.update({ password: hashedNewPassword });

        // Retorna usuário sem a senha
        const { password, ...usuarioSemSenha } = user.toJSON();
        return usuarioSemSenha;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    criarUsuario,
    login,
    mudarSenha
};
