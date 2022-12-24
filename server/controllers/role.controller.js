import RoleService from '../services/role.service.js';

const RoleController = {
    getAll: async function (req, res) {
        try {
            const roles = await RoleService.getAll();
            return res.status(200).json(roles);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    create: async function (req, res) {
        try {
            const role = await RoleService.create(req.body);
            return res.status(200).json(role);
        } catch (error) {
            res.status(500).json(error);
        }
    }
};

export default RoleController;
