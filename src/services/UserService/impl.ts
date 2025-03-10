import IUserService from ".";
import IUserRepository, { UserRepository } from "@src/repos/User";
import { getRandomStringByLen } from "@src/util/random";
import { hashSHA512 } from "@src/util/hash";
import { ArgumentError, DataError } from "@src/common/Errors";
import UserInfoType from "@src/common/UserInfoType";
import FailureReason from "@src/common/Reason";

class UserService implements IUserService {
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
        if (userInfoType === UserInfoType.BIO) {

        } else {
            if (typeof uid !== 'number' || typeof value !== 'string') {
                throw new ArgumentError("'uid' must be a number and 'value' must be a string");
            }
        }

        switch (userInfoType) {
            case UserInfoType.USERNAME: 
                return await this.userRepository.updateUsername(uid, value);
            case UserInfoType.NICKNAME:
                return await this.userRepository.updateNickname(uid, value);
            case UserInfoType.AVATAR:
                return await this.userRepository.updateAvatar(uid, value);
            case UserInfoType.BIO:
                return await this.userRepository.updateUserBio(uid, value);
        }
    }

    async removeUser(uid: number | any, password: string | any) {
        if (typeof uid !== 'number' || typeof password !== 'string') {
            throw new ArgumentError("'uid' must be a number and 'password' must be a string");
        }

        const userObj = await this.userRepository.getUserById(uid);
        if (!userObj) {
            return {
                success: false,
                reason: FailureReason.USER_NOT_EXISTS,
                message: 'User does not exists'
            }
        }

        const pwdSalt = userObj.passwordSalt;
        const pwdhashDb = userObj.password;

        if (typeof pwdSalt !== 'string') {
            throw new DataError('Error: passwordSalt type error!');
        }
        if (typeof pwdhashDb !== 'string') {
            throw new DataError('Error: password type error!');
        }

        const pwdhash = hashSHA512(password, pwdSalt, this.iterations);

        if (pwdhash !== pwdhashDb) {
            return {
                success: false,
                reason: FailureReason.PASSWORD_WRONG,
                message: 'Password error!'
            }
        }
        
        const removeResult = await this.userRepository.removeUser(uid);
        return {
            success: true,
            message: 'Remove user successfully',
            data: removeResult
        }
    }

    async userLogin(username: string | any, password: string | any) {
        if (typeof username !== 'string' || typeof password !== 'string') {
            throw new ArgumentError("'username' and 'password' must be strings");
        }

        const userObj = await this.userRepository.getUserByUsername(username);
        if (!userObj) {
            return {
                success: false,
                reason: FailureReason.USER_NOT_EXISTS,
                message: 'User does not exists'
            }
        }

        const pwdSalt = userObj.passwordSalt;
        const pwdhashDb = userObj.password;

        if (typeof pwdSalt !== 'string') {
            throw new DataError('Error: passwordSalt type error!');
        }
        if (typeof pwdhashDb !== 'string') {
            throw new DataError('Error: password type error!');
        }

        const pwdhash = hashSHA512(password, pwdSalt, this.iterations);

        if (pwdhash !== pwdhashDb) {
            return {
                success: false,
                reason: FailureReason.PASSWORD_WRONG,
                message: 'Password error!'
            }
        }

        return {
            success: true,
            data: {
                uid: userObj.uid,
                passhash: pwdhashDb
            }
        }
    }

    async verifyPasshashCorrection(uid: number | any, passhash: string | any) {
        const result = await this.userRepository.queryIdAndPwd(uid, passhash);

        if (!result) {
            return false;
        }

        return true;
    }

    async updatePassword(uid: number ,oldPass: string | any, newPass: string | any) {
        if (typeof uid !== 'number' ||
            typeof oldPass !== 'string' ||
            typeof newPass !== 'string'
        ) {
            throw new ArgumentError("'uid' must be a number, 'oldPass' and 'newPass' must be strings");
        }

        const userObj = await this.userRepository.getUserById(uid);
        if (!userObj) {
            return {
                success: false,
                reason: FailureReason.USER_NOT_EXISTS,
                message: 'User does not exists'
            }
        }

        const pwdSalt = userObj.passwordSalt;
        const pwdhashDb = userObj.password;

        const pwdhash = hashSHA512(oldPass, pwdSalt, this.iterations);

        if (pwdhash !== pwdhashDb) {
            return {
                success: false,
                reason: FailureReason.OLD_PASSWORD_WRONG,
                message: 'Old password are not correct'
            }
        }

        const newPwdhash = hashSHA512(newPass, pwdSalt, this.iterations);

        if (pwdhashDb === newPwdhash) {
            return {
                success: false,
                reason: FailureReason.SAME_PASSWORD,
                message: 'New password are same as the old password'
            }
        }

        const result = await this.userRepository.updatePassword(uid, newPwdhash);

        return {
            success: true,
            data: result
        }
    }

    async getUserByIds(ids: Array<number> | any) {
        return await this.userRepository.getUserByIds(ids);
    }
}

export default UserService;