const { verificaTokens } = require('./verificaTokens');

const verificaAdmin = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const user = await verificaTokens(authHeader);

        if (user.role !== 'admin') {
            return res.status(403).json({ error: 'Acesso negado. Apenas administradores podem realizar esta ação.' });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ error: error.message });
    }
};

module.exports = verificaAdmin;