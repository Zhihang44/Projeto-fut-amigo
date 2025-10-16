const User = require('../models/user');

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
const opterPorID = async (id) => {
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
        await usuario.update({ name, email, password, role, lastLogin });
        return usuario;
    } catch (error) {
        throw new Error('Error updating user: ' + error.message);
    }
};

module.exports = {
    acharTudo,
    deletando,
    opterPorID,
    atualizandoPorID
};