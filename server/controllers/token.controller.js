import TokenService from '../services/token.service.js';

function isTokenInvalid(data, dbToken) {
    return !data || !dbToken || data._id !== dbToken?.user?.toString();
}

const TokenController = {
    refresh: async function (req, res) {
        try {
            const { refreshToken } = req.body;
            const data = TokenService.validateToken(refreshToken);
            const dbToken = await TokenService.findToken(refreshToken);
            if (isTokenInvalid(data, dbToken)) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            const tokens = TokenService.generateAccessToken({ _id: data._id });
            await TokenService.saveRefreshToken(data._id, tokens.refreshToken);
            res.status(200).json({ ...tokens, userId: data._id });
        } catch (error) {
            res.status(500).json({ message: 'На сервере произошла ошибка. Попробуйте позже' });
        }
    }
};

export default TokenController;
