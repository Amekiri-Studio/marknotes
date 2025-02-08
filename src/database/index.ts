import { Sequelize } from "sequelize";
import config from "./config";

export const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    port: config.port,
    dialect: config.dialect
})

export const authenticate = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

export const syncModels = async (option: any | null | undefined) => {
    return await sequelize.sync(option);
}