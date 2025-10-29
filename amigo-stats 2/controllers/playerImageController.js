const playerImageService = require('../services/playerImageService');

module.exports = {
    async addImage(req, res) {
        try {
            const image = {
                playerId: req.params.id,
                imageUrl: req.body.urlImage
            }

            if (!image.imageUrl) {
                return res.status(400).json({ error: 'O campo ulrImage é obrigatório' });
            }

            const addImage = await playerImageService.addImage(image);

            return res.status(201).json(addImage);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao adicionar imagem ao jogador.' });
        }
    },
    async removeImage(req,res){
        try {
                    const { id } = req.params;
                    const { imageId } = req.params;
                    await playerImageService.removeImage(id , imageId);
                    return res.json({ message: 'Imagem deletado com sucesso.' });
                } catch (error) {
                    return res.status(500).json({ error: error.message });
                }
    }
}