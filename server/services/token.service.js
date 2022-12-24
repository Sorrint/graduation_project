import jwt from 'jsonwebtoken';
import config from 'config';
import Token from '../models/token.model.js';

const TokenService = {
    generateAccessToken: (payload) => {
        const accessToken = jwt.sign(payload, config.get('accessSecret'), {
            expiresIn: '1h'
        });
        const refreshToken = jwt.sign(payload, config.get('refreshSecret'));
        return { accessToken, refreshToken, expiresIn: 3600 };
    },
    saveRefreshToken: async (user, refreshToken) => {
        const data = await Token.findOne({ user });
        if (data) {
            data.refreshToken = refreshToken;
            return data.save();
        }
        const token = await Token.create({ user, refreshToken });
        return token;
    },
    validateToken: (refreshToken) => {
        try {
            return jwt.verify(refreshToken, config.get('refreshSecret'));
        } catch (error) {
            return null;
        }
    },
    findToken: async (refreshToken) => {
        try {
            return await Token.findOne({ refreshToken });
        } catch (error) {
            return null;
        }
    }
};

export default TokenService;
