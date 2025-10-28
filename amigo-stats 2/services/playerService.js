const Player = require('../models/player');

const criandoJogador = async (dadosJogador) => {
    try {
        const novoJogador = await Player.create(dadosJogador);
        return novoJogador;
    } catch (error) {
        console.error('Erro ao criar jogador:', error);
        throw error;
    }
};
const atualizandoPorID = async (id, dadosAtualizados) => {
    try {
        const novoJogador = await Player.findOne({ where: { id } });
        if (!novoJogador) {
            throw new Error('Usuário não encontrado');
        }
        await novoJogador.update(dadosAtualizados);
        return novoJogador;
    } catch (error) {
        console.error('Erro ao atualizar jogador:', error);
        throw error;
    }
};
const deletarPorID = async (id) => {
    try {
        const player = await Player.findOne({ where: { id } });
        if (!player) {
            throw new Error('Usuário não encontrado');
        }
        await player.destroy();
    } catch (error) {
        throw new Error('Erro ao deletar usuário: ' + error.message);
    }
};
const obterPorID = async (id) => {
    try {
        const jogador = await Player.findOne({ where: { id } });
        if (!jogador) {
            throw new Error('Jogador não encontrado');
        }
        return jogador;
    } catch (error) {
        throw new Error('Erro ao buscar jogador: ' + error.message);
    }
};

module.exports = {
    criandoJogador,
    atualizandoPorID,
    deletarPorID,
    obterPorID
};