const authConfig = {
    jwt: {
        secret: process.env.JWT_SECRET || 'ZhihangSecretKey',
        expiresIn: '1d'
    },
};

module.exports = authConfig;
