const userService = require('../services/userService');

module.exports = {

    async listaToda (req, res){
        try {
            const usuarios = await userService.acharTudo();
            return res.json(usuarios);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    async deletar (req, res){
        try {
            const { id } = req.params;
            await userService.deletando(id);
            return res.json({ message: 'Usuário deletado com sucesso.' });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },
    async obterPerfilEspecifico (req, res){
        try {
            const { id } = req.params;
            const perfil = await userService.obterPorID(id);
            return res.json(perfil);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },
    async atualizarEspecifico (req, res){
        try {
            const { id } = req.params;
            const { name, email, password, role, lastLogin } = req.body;
            const usuario = await userService.atualizandoPorID(id, { name, email, password, role, lastLogin });
            return res.json(usuario);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },
    async atualizarPerfilAutenticado (req , res){
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader) {
                return res.status(401).json({ error: 'Token não fornecido' });
            }
            const { name, email, password, role, lastLogin } = req.body;
            const usuario = await userService.atualizaAutenticado(authHeader, { name, email, password, role, lastLogin });
            return res.json(usuario);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },
    async obterAutenticado (req, res){
        try {
            const authHeader = req.headers.authorization;

            if (!authHeader) {
                return res.status(401).json({ error: 'Token não fornecido' });
            }
            const usuario = await userService.obterAutenticado(authHeader);
            return res.json(usuario);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
};
