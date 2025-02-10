import User from "@src/models/User";
import { sequelize, authenticate, syncModels } from '@src/database'

export interface IUserRepository {
    addUser: (UserData: {username: string, nickname: string, password: string, passwordSalt: string}) => Promise<any>;
    getUserById: (uid: number) => Promise<any>;
    getUserByUsername: (username: string) => Promise<any>;
    updateUsername: (uid: number ,username: string) => Promise<any>;
}

export class UserRepository implements IUserRepository {
    private constructor() {
        
    }

    static async createRepository() {
        await Promise.all([authenticate(), syncModels({force: true})]);
        return new UserRepository();
    }

    async addUser(UserData: {username: string, nickname: string, password: string, passwordSalt: string}) {
        return await User.create(UserData);
    }

    async getUserById(uid: number) {
        return await User.findByPk(uid)
    }

    async getUserByUsername(username: string) {
        return await User.findOne({
            where: {
                username
            }
        })
    }

    async updateUsername(uid: number ,username: string) {
        return await User.update({
            username
        }, {
            where: {
                uid
            }
        })
    }

    async updateNickname(uid: number, nickname: string) {
        return await User.update({
            nickname
        }, {
            where: {
                uid
            }
        });
    }

    async updatePassword(uid: number, password: string) {
        return await User.update({
            password
        }, {
            where: {
                uid
            }
        })
    }
}

export default IUserRepository