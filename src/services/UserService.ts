import IUserRepository, { UserRepository } from "@src/repos/User";
import { getRandomStringByLen } from "@src/util/random";
import { hashSHA512 } from "@src/util/hash";
import { ArgumentError } from "@src/common/Errors";
import UserInfoType from "@src/common/UserInfoType";
export interface IUserService {
    addUser: (UserData: {username: string | any, nickname: string | any, password : string | any}) => Promise<any>;
    getUserByName: (username: string | any) => Promise<any>
    getUserById: (uid: number | any) => Promise<any>;
    updateUserInfo: (userInfoType: UserInfoType, uid: string | any, value: string | any) => Promise<any>;
    removeUser: (uid: number | any) => Promise<any>;
    userLogin: (username: string | any, password: string | any) => Promise<any>
}

export class UserService implements IUserService {
    private userRepository: IUserRepository;
    private iterations = 10000;

    private constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    static async createService() {
        return new UserService(await UserRepository.createRepository());
    }

    async addUser(UserData: {username: string | any, nickname: string | any, password :string | any}) {
        if (typeof UserData.username === 'string' &&
            typeof UserData.nickname === 'string' &&
            typeof UserData.password === 'string'
        ) {
            const passwordSalt = getRandomStringByLen(100);
            const hashPwd = hashSHA512(UserData.password, passwordSalt, this.iterations)
            return await this.userRepository.addUser({
                username: UserData.username,
                nickname: UserData.nickname,
                password: hashPwd,
                passwordSalt: passwordSalt
            })
        } else {
            throw new ArgumentError('username, nickname, password must be a string instead of other type');
        }
    }

    async getUserById(uid: number | any) {
        if (typeof uid === 'number') {
            const queryResult = await this.userRepository.getUserById(uid);
            return queryResult;
        } else {
            throw new ArgumentError("'uid' must be a number");
        }
    }

    async getUserByName(username: string | any) {
        if (typeof username === 'string') {
            return await this.userRepository.getUserByUsername(username);
        } else {
            throw new ArgumentError("'username' must be a string");
        }
    }

    async updateUserInfo(userInfoType: UserInfoType, uid: string | any, value: string | any) {
        if (typeof uid !== 'number' || typeof value !== 'string') {
            throw new ArgumentError("'uid' must be a number and 'value' must be a string");
        }

        switch (userInfoType) {
            case UserInfoType.USERNAME: 
                return await this.userRepository.updateUsername(uid, value);
            case UserInfoType.NICKNAME:
                return await this.userRepository.updateNickname(uid, value);
            case UserInfoType.PASSWORD:
                return await this.userRepository.updatePassword(uid, value);
        }
    }

    async removeUser(uid: number | any) {
        if (typeof uid !== 'number') {
            throw new ArgumentError("'uid' must be a number");
        }

        return await this.userRepository.removeUser(uid);
    }

    async userLogin(username: string | any, password: string | any) {
        if (typeof username !== 'string' || typeof password !== 'string') {
            throw new ArgumentError("'username' and 'password' must be a string");
        }

        const userObj = await this.userRepository.getUserByUsername(username);
        if (!userObj) {
            return {
                success: false,
                message: 'User does not exists'
            }
        }
    }
}

export default IUserService;