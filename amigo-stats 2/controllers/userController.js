const userService = require('../services/userService');
const Sequelize = require('../database');

module.exports = {

    async listaToda (req, res){
        try {
            const usuarios = await userService.acharTudo();
            return res.json(usuarios);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    async criarUsuario (req, res){
        const transaction = await Sequelize.transaction();

        try {
            const { name, email, password, role, lastLogin } = req.body;

            const usuario = await userService.criarUsuario({name, email, password, role, lastLogin}, transaction);
            await transaction.commit();
            return res.json(usuario);
        } catch (error) {
            await transaction.rollback()
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
