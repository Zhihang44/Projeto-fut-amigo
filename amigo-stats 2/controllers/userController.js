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
    async opterPerfilEspecifico (req, res){
        try {
            const { id } = req.params;
            const perfil = await userService.opterPorID(id);
            return res.json(perfil);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },
    async atualizarEspecifico (req, res){
        try {
            const id = req.params.id;
            const { name, email, password, role, lastLogin } = req.body;

            console.log(id, name, email, password, role, lastLogin);
            const usuario = await userService.atualizandoPorID(id, { name, email, password, role, lastLogin });
            return res.json(usuario);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
};
