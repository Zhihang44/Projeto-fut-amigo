const userPreferenceService = require('../services/userPreferenceService');

module.exports = {
    
    async obterPreferencias (req, res){
        try { 
            const authHeader = req.headers.authorization;
            if (!authHeader) {
                return res.status(401).json({ error: 'Token não fornecido' });
            }
            const preferencias = await userPreferenceService.obtendoPreferencias(authHeader);
            return res.json(preferencias);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    async atualizarPreferencias (req, res){
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader) {
                return res.status(401).json({ error: 'Token não fornecido' });
            }
            const { theme, notifications, language } = req.body;
            const preferencias = await userPreferenceService.atualizandoPreferencias(authHeader, { theme, notifications, language });
            return res.json(preferencias);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },  
}   