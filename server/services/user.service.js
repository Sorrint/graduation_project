import User from '../models/user.model.js';

const UserService = {
    checkUser: async function (email) {
        const checkResponse = await User.findOne({ email });
        return checkResponse;
    },
    getOne: async function (id) {
        if (!id) {
            throw new Error('не указан ID');
        }
        const user = await User.findById(id);
        return user;
    },
    getAll: async function () {
        const users = await User.find();
        return users;
    },
    create: async function (user) {
        const createdUser = await User.create(user);
        return createdUser;
    },
    update: async function (user) {
        const updatedUser = await User.findByIdAndUpdate(user._id, user, { new: true });
        return updatedUser;
    },
    delete: async function (id) {
        if (!id) {
            throw new Error('не указан ID');
        }
        const user = await User.findByIdAndDelete(id);
        return user;
    }
};

export default UserService;
