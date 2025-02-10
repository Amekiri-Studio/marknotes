import IUserRepository, { UserRepository } from "@src/repos/User";
import { getRandomStringByLen } from "@src/util/random";
import { hashSHA512 } from "@src/util/hash";
import { ArgumentError } from "@src/common/Errors";
export interface IUserService {
    addUser: (UserData: {username: string | any, nickname: string | any, password : string | any}) => Promise<any>;
    getUserById: (uid: number | any) => Promise<any>;
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
}

export default IUserService;