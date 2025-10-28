const clubService = require('../services/clubService');

module.exports = {
    async obterClubEspecifico (req, res){
            try {
                const { id } = req.params;
                const club = await clubService.obterPorID(id);
                return res.json(club);
            } catch (error) {
                return res.status(500).json({ error: error.message });
            }
        },
    async criarClub (req, res){
        try {
            const { name, country, location, league, stadium, capacity, president, email, website, phone, primaryColor, secondaryColor, description, logo } = req.body;

            if (!name || !country || !location || !league || !stadium || !capacity || !president || !email || !website || !phone || !primaryColor || !secondaryColor || !description || !logo) {
                return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
            }

            const club = await clubService.criandoClub(name, country, location, league, stadium, capacity, president, email, website, phone, primaryColor, secondaryColor, description, logo);
            return res.status(201).json(club);
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
    async deletar(req, res){
        try {
            const { id } = req.params;
            await userService.deletarPorID(id);
            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },
    async obterPlayerDosClubs (req, res){
        try {            
            const clubId = req.params.id;
            const players = await clubService.obtendoPlayerDosClubs(clubId);
            return res.json(players);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
};
