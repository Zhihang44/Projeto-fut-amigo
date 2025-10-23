const UserPreference = require('../models/userPreference');
const { verificaTokens } = require('../middlewares/verificaTokens');

const obtendoPreferencias = async (authHeader) => {
    try {
        const decodedToken = await verificaTokens(authHeader);

        let preferencias = await UserPreference.findOne({ where: { userId: decodedToken.id } });

        // Se não existir preferências, cria com valores padrão
        if (!preferencias) {
            preferencias = await UserPreference.create({
                userId: decodedToken.id,
                emailNotifications: true,
                twoFactorAuth: false,
                theme: 'system',
                language: 'pt-BR'
            });
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
            // Cria novas preferências
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