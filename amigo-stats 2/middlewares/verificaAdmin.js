const tokens = require('./verificaTokens');

const verificaAdmin = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    try {
        const userAdmin = await tokens.verificaTokens(authHeader, res);

            if (userAdmin.role !== 'admin') {
                return res.status(403).json({ error: 'Acesso negado. Apenas administradores podem realizar esta ação.' });
            }
        
            return next()
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({ error: 'Erro na verificação de administrador' });
    }
};

module.exports = verificaAdmin;