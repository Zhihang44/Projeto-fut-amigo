const authService = require('../services/authService');

module.exports = {
    async criarUsuario(req, res) {
        try {
            const { name, email, password, role } = req.body;
            
            if (!name || !email || !password) {
                return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
            }

            const usuario = await authService.criarUsuario(name, email, password, role || 'user');
            
            // Remove a senha do objeto retornado
            const { password: _, ...usuarioSemSenha } = usuario.toJSON();
            return res.status(201).json(usuarioSemSenha);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    async login(req, res) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ error: 'Email e senha são obrigatórios' });
            }

            const auth = await authService.login(email, password);
            return res.json(auth);
        } catch (error) {
            return res.status(401).json({ error: error.message });
        }
    }
}