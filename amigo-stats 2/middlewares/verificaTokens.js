const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

module.exports = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'token não encontrado' });
    }

    try {
        const decoded = jwt.verify(token, authConfig.jwt.secret);
        req.userId = decoded.id;
        return next();
    } catch (error) {
        return res.status(401).json({ error: 'Token inválido' });
    }
};
