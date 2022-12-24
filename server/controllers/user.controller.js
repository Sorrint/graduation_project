import UserService from '../services/user.service.js';

const UserController = {
    create: async function (req, res) {
        try {
            const user = await UserService.create(req.body);
            return res.status(201).json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getAll: async function (req, res) {
        try {
            const users = await UserService.getAll(req.body);
            return res.status(200).json(users);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    update: async function (req, res) {
        try {
            const updatedUser = await UserService.update(req.body);
            return res.status(200).json(updatedUser);
        } catch (error) {
            res.status(500).json(error.message);
        }
    },
    getOne: async function (req, res) {
        try {
            console.log(req.params);
            const user = await UserService.getOne(req.params.id);
            return res.status(200).json(user);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }
};

export default UserController;
