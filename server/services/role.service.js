import Role from '../models/role.model.js';

const RoleService = {
    getAll: async function () {
        const roles = await Role.find();
        return roles;
    },
    getOne: async function (roleName) {
        const role = await Role.findOne({ value: roleName });
        return role;
    },
    create: async function (roleName) {
        const role = await Role.create(roleName);
        return role;
    }
};

export default RoleService;
