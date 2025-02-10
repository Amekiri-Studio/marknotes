import { IReq, IRes } from "./common";
import HttpStatusCodes from "@src/common/HttpStatusCodes";
import RetCode from "@src/common/RetCode";
import UserInfoType from "@src/common/UserInfoType";
import IUserService, { UserService } from "@src/services/UserService";

class UserController {
    static userService: IUserService;
    static iterations = 10000;

    static async createService() {
        if (!this.userService) {
            UserController.userService = await UserService.createService();
        }
    }

    static async add(req: IReq, res: IRes) {
        try {
            await UserController.createService();
            const {username, nickname, password} = req.body;

            if (!username || !nickname || !password) {
                res.status(HttpStatusCodes.BAD_REQUEST).json({
                    code: RetCode.BAD_REQUEST,
                    message: 'Please provide all required fields'
                });
                return;
            }
            
            const addResult = await this.userService.addUser({
                username, nickname, password
            })

            res.status(HttpStatusCodes.OK).json({
                code: RetCode.SUCCESS,
                message: 'added user successfully',
                data: addResult
            })
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
            await UserController.createService();
            const { userInfoType, value } = req.body;
            
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

    static async login(req: IReq, res: IRes) {
        
    }
}

export default UserController;