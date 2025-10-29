const playerService = require('../services/playerService');

module.exports = {
    async criarJogador(req, res) {
        try {
            const { name, age, nationality, position, clubId, height, weight, preferredFoot, overallRating, potential, birthDate } = req.body;

            if (!name || !age || !nationality || !position || !clubId || !height || !weight || !preferredFoot || !overallRating || !potential || !birthDate) {          
                return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
            }

            const novoJogador = await playerService.criandoJogador({
                name,
                age,
                nationality,
                position,
                clubId,
                height,
                weight,
                preferredFoot,
                overallRating,
                potential,
                birthDate
            });

            return res.status(201).json(novoJogador);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao criar jogador.' });
        }
    },
     async atualizarEspecifico(req, res){
            try {
                const { id } = req.params;
                const { name, age, nationality, position, clubId, height, weight, preferredFoot, overallRating, potential, birthDate } = req.body;
                const jogador = await playerService.atualizandoPorID(id, { name, age, nationality, position, clubId, height, weight, preferredFoot, overallRating, potential, birthDate });
                return res.json(jogador);
            } catch (error) {
                return res.status(500).json({ error: error.message });
            }   
     },
     async deletar(req, res){
        try {
             const { id } = req.params;
             await playerService.deletarPorID(id);
             return res.json({ message: 'Usuário deletado com sucesso.' });
         } catch (error) {
             return res.status(500).json({ error: error.message });
         }
    },
    async obterJogadorEspecifico(req, res){
            try {
                const { id } = req.params;
                const jogador = await playerService.obterPorID(id);
                return res.json(jogador);
            } catch (error) {
                return res.status(500).json({ error: error.message });
            }
    }
};      