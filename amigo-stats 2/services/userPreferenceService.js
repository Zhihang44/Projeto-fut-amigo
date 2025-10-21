const UserPreference = require('../models/userPreference');
const tokens = require('../middlewares/verificaTokens'); 

const obtendoPreferencias = async (authHeader) => {
    try {
        const user = await tokens.verificaTokens(authHeader);
        if (!user) {
            throw new Error('Usuário não encontrado...');
        }
        return await UserPreference.findOne({ where: { userId: user.id } });
    } catch (error) {   
        throw new Error('Erro ao obter preferências do usuário: ' + error.message);
    }   
};

const atualizandoPreferencias = async (authHeader, preferencias) => {
    try {
        const user = await tokens.verificaTokens(authHeader);
        if (!user) {
            throw new Error('Usuário não encontrado...');
        }

        let userPreferences = await UserPreference.findOne({ where: { userId: user.id } });
        if (userPreferences) {
            await userPreferences.update(preferencias);
        } else {
            preferencias.userId = user.id;
            userPreferences = await UserPreference.create(preferencias);
        }
        return userPreferences;
    } catch (error) {
        throw new Error('Erro ao atualizar preferências do usuário: ' + error.message);
    }
};  

module.exports = {
    obtendoPreferencias,
    atualizandoPreferencias
};  