import mongoose from 'mongoose';
import config from 'config';
import { DB_CONFIG, DB_CLOUD_CONFIG } from '../config/db.config.js';
import chalk from 'chalk';
import models from '../models/index.js';
import counterMock from '../mockData/counter.json' assert { type: 'json' };
import bannersMock from '../mockData/banners.json' assert { type: 'json' };
import roomMock from '../mockData/rooms.json' assert { type: 'json' };
import iconMock from '../mockData/icons.json' assert { type: 'json' };
import roomTypeMock from '../mockData/roomTypes.json' assert { type: 'json' };
import userMock from '../mockData/users.json' assert { type: 'json' };
import roleMock from '../mockData/roles.json' assert { type: 'json' };
import db from '../models/index.js';

const URL = DB_CLOUD_CONFIG.URL;
const generateSimpleEntity = (data, model) => {
    return Promise.all(
        data.map(async ({ _id, ...exampleData }) => {
            try {
                const exm = await model.find({
                    name: exampleData.name
                });
                if (exm.length !== 0) {
                    return exm[0];
                }
                const newExm = new model(exampleData);
                await newExm.save();
                return newExm;
            } catch (error) {
                throw new Error(error);
            }
        })
    );
};

const findIcons = (iconIds, icons) => {
    if (typeof iconIds === 'object') {
        const items = [];
        for (const icon of iconMock) {
            for (const itemId of iconIds) {
                if (itemId === icon._id) {
                    for (const item of icons) {
                        if (item.name === icon.name) items.push(item._id);
                    }
                }
            }
        }
        return items;
    }
    for (const icon of iconMock) {
        if (iconIds === icon._id) {
            for (const item of icons) {
                if (item.name === icon.name) return item._id;
            }
        }
    }
};

const findRoomType = (typeId, types) => {
    for (const type of roomTypeMock) {
        if (typeId === type._id) {
            for (const item of types) {
                if (item.name === type.name) return item._id;
            }
        }
    }
};

async function setInitialData() {
    const countersData = await generateSimpleEntity(counterMock, db.counter);
    if (countersData.length) {
        console.log(`${chalk.yellow('Counter in DB')} ${chalk.green('✓')}`);
    } else {
        console.log(`${chalk.red('Counter resolved DB x')}`);
    }

    const bannersData = await generateSimpleEntity(bannersMock, db.banners);
    if (bannersData.length) {
        console.log(`${chalk.yellow('Banners in DB')} ${chalk.green('✓')}`);
    } else {
        console.log(`${chalk.red('Banners resolved DB x')}`);
    }

    const iconsData = await generateSimpleEntity(iconMock, db.icon);
    if (iconsData.length) {
        console.log(`${chalk.yellow('Icons in DB')} ${chalk.green('✓')}`);
    } else {
        console.log(`${chalk.red('Icons resolved DB x')}`);
    }

    const roomTypeData = await generateSimpleEntity(roomTypeMock, db.roomType);
    if (roomTypeData.length) {
        console.log(`${chalk.yellow('RoomTypes in DB')} ${chalk.green('✓')}`);
    } else {
        console.log(`${chalk.red('RoomTypes resolved DB x')}`);
    }

    const rolesData = await generateSimpleEntity(roleMock, db.role);
    if (rolesData.length) {
        console.log(`${chalk.yellow('Roles in DB')} ${chalk.green('✓')}`);
    } else {
        console.log(`${chalk.red('Roles resolved DB x')}`);
    }

    const usersData = await generateSimpleEntity(userMock, db.user);
    if (usersData.length) {
        console.log(`${chalk.yellow('Users in DB')} ${chalk.green('✓')}`);
    } else {
        console.log(`${chalk.red('Users resolved DB x')}`);
    }
    const rooms = await Promise.all(
        roomMock.map(async ({ _id, ...roomData }) => {
            try {
                const room = await models.rooms.find({
                    name: roomData.name
                });

                if (room.length !== 0) {
                    return room[0];
                }
                roomData.amenities = findIcons(roomData.amenities, iconsData);
                if (roomData.properties) {
                    roomData.properties = roomData.properties.map((property) => {
                        return { ...property, icon: findIcons(property.icon, iconsData) };
                    });
                }
                roomData.type = findRoomType(roomData.type, roomTypeData);
                const newRoom = new models.rooms(roomData);
                await newRoom.save();
                return newRoom;
            } catch (error) {
                throw new Error(error);
            }
        })
    );
    if (rooms.length) {
        console.log(`${chalk.yellow('Rooms in DB')} ${chalk.green('✓')}`);
    } else {
        console.log(`${chalk.red('Rooms resolved DB x')}`);
    }
}

export async function startDB() {
    try {
        const db = mongoose.connection;
        db.on('error', () => {
            console.log(`${chalk.red('x MongoDB stasus: not connected')}`);
        });
        db.once('open', function () {
            setInitialData();
            console.log(`${chalk.yellow('MongoDB status: ')}${chalk.green('Connected ✓')}`);
        });
        await mongoose.connect(config.get('mongoUri'), { dbName: 'hotel' });

        // await mongoose.connect(`mongodb://${DB_CONFIG.HOST}:${DB_CONFIG.PORT}/${DB_CONFIG.DB}`);
    } catch (error) {
        console.log(chalk.red(error.message));
    }
}
