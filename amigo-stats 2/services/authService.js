const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const authConfig = require('../config/auth');

const criarUsuario = async (name, email, password, role) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        
        return User.create({ 
            name, 
            email, 
            password: hashedPassword, 
            role,
            lastLogin: new Date()
        });
    } catch (error) {
        throw new Error('Erro ao criar usuário: ' + error.message);
    }
};

const login = async (email, password) => {
    try {
        const user = await User.findOne({ where: { email }});
        
        if (!user) {
            throw new Error('Usuário não encontrado');
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        
        if (!isValidPassword) {
            throw new Error('Senha inválida');
        }
        await user.update({ lastLogin: new Date() });

        const token = jwt.sign(
            { 
                id: user.id,
                email: user.email,
                role: user.role 
            },
            authConfig.jwt.secret,
            { expiresIn: authConfig.jwt.expiresIn }
        );

        return {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            token
        };
    } catch (error) {
        throw new Error('Erro na autenticação: ' + error.message);
    }
};

module.exports = {
    criarUsuario,
    login
};
