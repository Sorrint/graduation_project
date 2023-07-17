import UserService from '../services/user.service.js';
import RoleService from '../services/role.service.js';
import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';
import TokenService from '../services/token.service.js';

const AuthController = {
    signUp: async function (req, res) {
        try {
            const errors = validationResult(req.body);
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: 'Ошибка при регистрации', errors });
            }
            const { email, password } = req.body;
            const candidate = await UserService.checkUser(email);
            if (candidate) {
                return res.status(400).json({ message: 'Email уже зарегистрирован' });
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            const userRole = await RoleService.getOne('user');
            const newUser = await UserService.create({ ...req.body, password: hashPassword, roles: [userRole.value] });
            const tokens = TokenService.generateAccessToken({ _id: newUser._id });
            await TokenService.saveRefreshToken(newUser._id, tokens.refreshToken);
            return res.status(201).json({ ...tokens, userId: newUser._id });
        } catch (error) {
            res.status(500).json({ message: 'SignUp error' });
        }
    },
    login: async function (req, res) {
        try {
            console.log(req);
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: 'Ошибка при входе в систему', errors });
            }
            const { email, password } = req.body;
            const user = await UserService.checkUser(email);
            if (!user) {
                return res.status(400).json({ message: 'Пользователь не найден' });
            }
            const validPassword = bcrypt.compareSync(password, user.password);
            if (!validPassword) {
                return res.status(400).json({ message: 'Введен неверный пароль' });
            }
            const tokens = TokenService.generateAccessToken({ _id: user._id });
            await TokenService.saveRefreshToken(user._id, tokens.refreshToken);
            return res.status(200).json({ ...tokens, userId: user._id, roles: user.roles });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Login error' });
        }
    },
    refresh: async function (req, res) {
        try {
            const { refreshToken } = req.body;
            const data = TokenService.validateToken(refreshToken);
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ message: 'На сервере произошла ошибка' });
        }
    },
    getRoles: async function (req, res) {
        try {
            const { userId } = req.body;
            const data = await UserService.getOne(userId);
            res.status(200).json(data.roles);
        } catch (error) {
            res.status(500).json({ message: 'На сервере произошла ошибка' });
        }
    }
};

export default AuthController;
