const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { verificaTokens } = require('../middlewares/verificaTokens');

const acharTudo = async () => {
    try {
        const usuarios = await User.findAll({
            attributes: { exclude: ['password'] }
        });
        return usuarios;
    } catch (error) {
        throw new Error('Erro ao buscar usuários: ' + error.message);
    }
};

const deletando = async (id) => {
    try {
        const usuario = await User.findOne({ where: { id } });
        if (!usuario) {
            throw new Error('Usuário não encontrado');
        }
        await usuario.destroy();
    } catch (error) {
        throw new Error('Erro ao deletar usuário: ' + error.message);
    }
};

const obterPorID = async (id) => {
    try {
        const usuario = await User.findOne({
            where: { id },
            attributes: { exclude: ['password'] }
        });
        if (!usuario) {
            throw new Error('Usuário não encontrado');
        }
        return usuario;
    } catch (error) {
        throw new Error('Erro ao buscar usuário: ' + error.message);
    }
};

const atualizandoPorID = async (id, dados) => {
    try {
        const usuario = await User.findOne({ where: { id } });
        if (!usuario) {
            throw new Error('Usuário não encontrado');
        }

        // Apenas faz hash se a senha foi fornecida
        if (dados.password) {
            dados.password = await bcrypt.hash(dados.password, 10);
        } else {
            delete dados.password; // Remove do objeto se não foi fornecida
        }
        if (dados.role !== "admin") {
            throw new Error('Role inválido');
        }   

        await usuario.update(dados);

        // Retorna usuário sem a senha
        const { password, ...usuarioSemSenha } = usuario.toJSON();
        return usuarioSemSenha;
    } catch (error) {
        throw new Error('Erro ao atualizar usuário: ' + error.message);
    }
};

const atualizaAutenticado = async (authHeader, dados) => {
    try {
        const userToken = await verificaTokens(authHeader);
        const usuario = await User.findOne({ where: { id: userToken.id } });

        if (!usuario) {
            throw new Error('Usuário não encontrado');
        }

        // Não permite que usuário comum altere o próprio role
        if (userToken.role !== 'admin') {
            delete dados.role;
        }

        // Apenas faz hash se a senha foi fornecida
        if (dados.password) {
            dados.password = await bcrypt.hash(dados.password, 10);
        } else {
            delete dados.password;
        }
        if (dados.role !== "admin") {
            throw new Error('Role inválido');
        }   
        await usuario.update(dados);

        // Retorna usuário sem a senha
        const { password, ...usuarioSemSenha } = usuario.toJSON();
        return usuarioSemSenha;
    } catch (error) {
        throw new Error('Erro ao atualizar usuário autenticado: ' + error.message);
    }
};

const obterAutenticado = async (authHeader) => {
    try {
        const userToken = await verificaTokens(authHeader);
        const usuario = await User.findOne({
            where: { id: userToken.id },
            attributes: { exclude: ['password'] }
        });

        if (!usuario) {
            throw new Error('Usuário não encontrado');
        }

        return usuario;
    } catch (error) {
        throw new Error('Erro ao buscar usuário autenticado: ' + error.message);
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