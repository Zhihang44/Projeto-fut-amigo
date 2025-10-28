const Club = require('../models/club');

const obterPorID = async (id) => {
    try {
        const club = await Club.findOne({ where: { id } });
        if (!club) {
            throw new Error('Clube não encontrado');
        }
        return club;
    } catch (error) {
        throw new Error('Erro ao buscar clube: ' + error.message);
    }
};
const criandoClub = async (name, country, location, league, stadium, capacity, president, email, website, phone, primaryColor, secondaryColor, description, logo) => {
    try {
        const club = await Club.create({
            name,
            country,
            location,
            league,
            stadium,
            capacity,
            president,
            email,
            website,
            phone,
            primaryColor,
            secondaryColor,
            description,
            logo
        });
        return club;
    } catch (error) {
        throw new Error('Erro ao criar clube: ' + error.message);
    }
};  

const atualizandoPorID = async (id, dadosAtualizados) => {
    try {
        const club = await Club.findOne({ where: { id } });
        if (!club) {
            throw new Error('Clube não encontrado');
        }
        await club.update(dadosAtualizados);
        return club;
    } catch (error) {
        throw new Error('Erro ao atualizar clube: ' + error.message);
    }
};
const deletandoPorID = async (id) => {
    try {
        const club = await Club.findOne({ where: { id } });
        if (!club) {
            throw new Error('Clube não encontrado');
        }
        await club.destroy();
    } catch (error) {
        throw new Error('Erro ao deletar clube: ' + error.message);
    }
};
const obtendoPlayerDosClubs = async (clubId) => {
    try {
        const club = await Club.findOne({ where: { id: clubId }, include: 'players' });
        if (!club) {
            throw new Error('Clube não encontrado');
        }
        return club.players;
    } catch (error) {
        throw new Error('Erro ao obter jogadores do clube: ' + error.message);
    }
};

module.exports = {
    obterPorID,
    criandoClub,
    atualizandoPorID,
    obtendoPlayerDosClubs,
    deletandoPorID
};