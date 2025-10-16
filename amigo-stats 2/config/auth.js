const authConfig = {
    jwt: {
        secret: process.env.JWT_SECRET || 'ZhihangSecretKey',
        expiresIn: '1d'
    },
};

export default authConfig;
