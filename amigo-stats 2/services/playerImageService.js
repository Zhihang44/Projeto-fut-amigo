const PlayerImage = require('../models/playerImage');
const Player = require('../models/player')

const addImage = async (image) => {
    try {
        const playerImage = await PlayerImage.create(image);

        return playerImage;
    } catch (error) {
        throw new Error('Erro ao adicionar imagem ao jogador: ' + error.message);
    }
};
const removeImage = async (id , imageId ) =>{
    try {
        const player = await Player.findOne({ where: { id } });
        if (!player) {
            throw new Error('jogador não encontrado');
        }
        const playerImage = await PlayerImage.findOne({ where: { id: imageId } });
        if (!player) {
            throw new Error('Imagem do jogador não encontrado');
        }
        await playerImage.destroy();
    } catch (error) {
        throw new Error('Erro ao deletar imagem: ' + error.message);
    }
}

module.exports = {
    addImage,
    removeImage
}