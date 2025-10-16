const User = require('../models/user');

const criarUsuario = (name, email, password, role, lastLogin) => {
    try {
        return User.create({ name, email, password, role, lastLogin });
    } catch (error) {
        throw new Error('Error creating user: ' + error.message);
    }
};

module.exports = {
    criarUsuario
};

