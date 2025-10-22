const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');
const User = require('../models/user');

const verificaTokens = async (req, res) => {
    try {

        const authHeader = req;

        if (!authHeader) {
            return res.status(401).json({ error: 'Token não fornecido' });
        }

        const [, token] = authHeader.split(' ');

        try {
            const decoded = jwt.verify(token, authConfig.jwt.secret);

            // const user = await User.findOne({ where: { id: decoded.id } });
            
            // if (!user) {
            //     return res.status(401).json({ error: 'Usuário não encontrado' });
            // }

            return decoded;
        } catch (error) {
            return res.status(401).json({ error: 'Token inválido' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Erro na autenticação' });
    }
};

module.exports = {
    verificaTokens
};
