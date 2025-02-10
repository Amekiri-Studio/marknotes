import { Status } from "@src/common/constants";
import { IReq, IRes } from "./common";
import HttpStatusCodes from "@src/common/HttpStatusCodes";
import RetCode from "@src/common/RetCode";
import UserInfoType from "@src/common/UserInfoType";
import IUserService, { UserService } from "@src/services/UserService";
import multer from 'multer'
import { decodeToken, generateToken } from "@src/util/token";
import FailureReason from "@src/common/Reason";

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
            
            const addResult = await UserController.userService.addUser({
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
        try {
            await UserController.createService();
            const idStr = req.params.id;
            let id;
            if (typeof idStr === 'string') {
                id = parseInt(idStr);
            }
            const result = await UserController.userService.getUserById(id);
            res.json({
                code: RetCode.SUCCESS,
                message: 'OK',
                data: result
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

    static async getName(req: IReq, res: IRes) {
        try {
            await UserController.createService();
            const username = req.params.username;
            const result = await UserController.userService.getUserByName(username);
            res.json({
                code: RetCode.SUCCESS,
                message: 'OK',
                data: result
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

    static async update(req: IReq, res: IRes) {
        try {
            await UserController.createService();
            const { userInfoType, value } = req.body;
            const tokenPayload: any = UserController.verifyUserLoginAuth(req, res);
            if (!tokenPayload) {
                return;
            }

            let result;

            switch (userInfoType) {
                case UserInfoType.USERNAME:
                    result = await UserController.userService.updateUserInfo(UserInfoType.USERNAME, tokenPayload.uid, value);
                    break;
                case UserInfoType.NICKNAME:
                    result = await UserController.userService.updateUserInfo(UserInfoType.NICKNAME, tokenPayload.uid, value);
                    break;
            }

            res.json({
                code: RetCode.SUCCESS,
                message: 'Update successfully',
                data: {
                    uid: tokenPayload.uid,
                    value: value
                }
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

    static async updatePassword(req: IReq, res: IRes) {
        try {
            await UserController.createService();
            const tokenPayload: any = UserController.verifyUserLoginAuth(req, res);
            if (!tokenPayload) {
                return;
            }

            const {oldPassword, newPassword} = req.body;

            const result = await UserController.userService.updatePassword(tokenPayload.uid, oldPassword, newPassword);

            if (!result.success) {
                res.json({
                    code: RetCode.FAILURE,
                    reason: result.reason,
                    message: result.message
                })
            }

            res.json({
                code: RetCode.SUCCESS,
                message: 'Update password successfully',
                data: result.data
            })
        } catch (error) {
            throw error;
        }
    }

    static async updateAvatar(req: IReq, res: IRes) {

    }

    static async remove(req: IReq, res: IRes) {

    }

    static async login(req: IReq, res: IRes) {
        try {
            await UserController.createService();
            const { username, password } = req.body;
            const result = await UserController.userService.userLogin(username, password);
            if (!result.success) {
                res.json({
                    code: RetCode.FAILURE,
                    reason: result.reason,
                    message: result.message
                })

                return;
            }

            const token = generateToken(result.data.uid, result.data.passhash);

            res.json({
                code: RetCode.SUCCESS,
                message: 'Login successfully',
                data: {
                    token
                }
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

    private static verifyUserLoginAuth(req: IReq, res: IRes) {
        const authorizationHeader = req.headers['x-mn-authorization'];

        if (!authorizationHeader) {
            res.json({
                code: RetCode.FAILURE,
                reason: FailureReason.LACK_OF_AUTH,
                message: 'Lack of authorization information'
            })
            return false;
        }
        
        const decodePayload: any = decodeToken(authorizationHeader);

        if (!UserController.userService.verifyPasshashCorrection(decodePayload.uid , decodePayload.pwdhas)) {
            res.json({
                code: RetCode.FAILURE,
                reason: FailureReason.TOKEN_INVALID,
                message: 'Verification infos invalid'
            })
            return false;
        }

        return decodePayload;
    }
}

export default UserController;