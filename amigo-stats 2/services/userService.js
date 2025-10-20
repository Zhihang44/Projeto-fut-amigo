const User = require('../models/user');
const bcrypt = require('bcryptjs');
const tokens = require('../middlewares/verificaTokens');

const acharTudo = () => {
    try {
        return User.findAll();
    } catch (error) {
        throw new Error('Error fetching users: ' + error.message);
    }
};
const deletando = async (id) => {
    try {
        const usuario = await User.findOne({ where: { id } });
        if (!usuario) {
            throw new Error('Usuário não encontrado...');
        }
        await usuario.destroy();
    } catch (error) {
        throw new Error('Error deleting user: ' + error.message);
    }
};
const obterPorID = async (id) => {
    try {
        const usuario = await User.findOne({ where: { id } });
        if (!usuario) {
            throw new Error('Usuário não encontrado...');
        }
        return usuario;
    } catch (error) {
        throw new Error('Error fetching user by ID: ' + error.message);
    }
};
const atualizandoPorID = async (id, { name, email, password, role, lastLogin }) => {
    try {
        const usuario = await User.findOne({ where: { id } });
        if (!usuario) {
            throw new Error('Usuário não encontrado...');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await usuario.update({ name, email, password: hashedPassword, role, lastLogin });
        return usuario;
    } catch (error) {
        throw new Error('Error updating user: ' + error.message);
    }
};
const atualizaAutenticado = async (authHeader, { name, email, password, role, lastLogin }) => {
    try {
        const user = await tokens.verificaTokens(authHeader);
        const usuario = await User.findOne({ where: { id: user.id } });
        if (!usuario) {
            throw new Error('Usuário não encontrado...');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await usuario.update({ name, email, password: hashedPassword, role, lastLogin });
        return usuario;
    } catch (error) {
        throw new Error('Error updating authenticated user: ' + error.message);
    }
};
const obterAutenticado = async (req, res) => {
    try {
        const authHeader = req;
        const user = await tokens.verificaTokens(authHeader);
        const usuario = await User.findOne({ where: { id: user.id } });
        if (!usuario) {
            throw new Error('Usuário não encontrado...');
        }
        return usuario;
    } catch (error) {
        throw new Error('Error fetching authenticated user: ' + error.message);
    }
};

module.exports = {
    acharTudo,
    deletando,
    obterPorID,
    obterAutenticado,
    atualizandoPorID,
    atualizaAutenticado
};