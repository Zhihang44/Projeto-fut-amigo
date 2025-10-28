const UserPreference = require('../models/userPreference');
const { verificaTokens } = require('../middlewares/verificaTokens');

const criandoPreferencias = async (authHeader, preferencias) => {
    if(!preferencias.theme || !preferencias.language || !preferencias.emailNotifications || !preferencias.twoFactorAuth) {
        throw new Error('Todos os campos são obrigatórios');
    }
    const decodedToken = await verificaTokens(authHeader);
    preferencias.userId = decodedToken.id;

    await UserPreference.create(preferencias);
    return preferencias;
};

const obtendoPreferencias = async (authHeader) => {
    try {
    
        const decodedToken = await verificaTokens(authHeader);

        let preferencias = await UserPreference.findOne({ 
            where: {
                userId: decodedToken.id 
            }
        });  
             
        if (!preferencias) {
            throw new Error('Preferências não encontradas');
        }

        return preferencias;
    } catch (error) {
        throw new Error('Erro ao obter preferências do usuário: ' + error.message);
    }
};

const atualizandoPreferencias = async (authHeader, preferencias) => {
    try {
        const user = await verificaTokens(authHeader);

        let userPreferences = await UserPreference.findOne({ where: { userId: user.id } });
        if (userPreferences) {
            // Atualiza apenas os campos fornecidos
            await userPreferences.update(preferencias);
        } else {
            throw new Error('Preferências não encontradas');
        }

        return userPreferences;
    } catch (error) {
        throw new Error('Erro ao atualizar preferências do usuário: ' + error.message);
    }
};

module.exports = {
    obtendoPreferencias,
    atualizandoPreferencias,
    criandoPreferencias
};