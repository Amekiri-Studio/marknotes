import { UserRepository, IUserRepository } from "@src/repos/User";
import { IReq, IRes } from "./common";
import { getRandomStringByLen } from "@src/util/random";
import { hashSHA512 } from "@src/util/hash";
import HttpStatusCodes from "@src/common/HttpStatusCodes";
import RetCode from "@src/common/RetCode";
import UserInfoType from "@src/common/UserInfoType";

class UserController {
    static userRepo: IUserRepository;
    static iterations = 10000;

    static async createUserRepo() {
        if (!this.userRepo) {
            this.userRepo = await UserRepository.createRepository();
        }
    }

    static async add(req: IReq, res: IRes) {
        try {
            await this.createUserRepo();
            const {username, nickname, password} = req.body;

            if (!username || !nickname || !password) {
                res.status(HttpStatusCodes.BAD_REQUEST).json({
                    code: RetCode.BAD_REQUEST,
                    message: 'Please provide all required fields'
                });
                return;
            }
            
            if (typeof username === 'string' &&
                typeof nickname === 'string' &&
                typeof password === 'string'
            ) {
                const passwordSalt = getRandomStringByLen(100);
                const hashPwd = hashSHA512(password, passwordSalt, this.iterations)

                const result = await this.userRepo.addUser({
                    username,
                    nickname,
                    password: hashPwd,
                    passwordSalt
                })

                res.status(HttpStatusCodes.OK).json({
                    code: RetCode.SUCCESS,
                    message: 'Create user successfully',
                    data: result
                })
            }
            else {
                res.status(HttpStatusCodes.BAD_REQUEST).json({ code: 400 ,error: 'Data type error' })
            }
        } catch (error) {
            console.error(error);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
                code: RetCode.INTERNAL_SERVER_ERROR,
                message: error.message,
                data: error
            })
        }
    }

    static async get(req: IReq, res: IRes) {

    }

    static async update(req: IReq, res: IRes) {
        try {
            await this.createUserRepo();
        } catch (error) {
            console.error(error);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
                code: RetCode.INTERNAL_SERVER_ERROR,
                message: error.message,
                data: error
            })
        }
    }

    static async remove(req: IReq, res: IRes) {

    }
}

export default UserController;