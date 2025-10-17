const tokens = require('./verificaTokens');

const verificaAdmin = async (req, res, next) => {
    try {
        const user = await tokens.verificaTokens(req, res);
            
            if (!userAdmin) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }

            if (userAdmin.role !== 'admin') {
                return res.status(403).json({ error: 'Acesso negado. Apenas administradores podem realizar esta ação.' });
            }

            return true;
    } catch (error) {
        return res.status(500).json({ error: 'Erro na verificação de administrador' });
    }
};

module.exports = verificaAdmin;