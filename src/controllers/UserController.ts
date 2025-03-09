import { Status } from "@src/common/constants";
import { IReq, IRes } from "./common";
import HttpStatusCodes from "@src/common/HttpStatusCodes";
import RetCode from "@src/common/RetCode";
import UserInfoType from "@src/common/UserInfoType";
import IUserService, { UserService } from "@src/services/UserService";
import multer from 'multer'
import { decodeToken, generateToken } from "@src/util/token";
import FailureReason from "@src/common/Reason";
import path from "path";
import fs from 'fs';
import { DataError } from "@src/common/Errors";

class UserController {
    static userService: IUserService;
    static iterations = 10000;

    static avatarPath = './public/images/avatar';

    static avatarStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            let uploadPath: string | any;
            const authorizationHeader = req.headers['x-mn-authorization'];
            try {
                if (!authorizationHeader) {
                    cb(null, '');
                    return;
                }
                const tokenPayload : any = decodeToken(authorizationHeader);
                if (typeof tokenPayload.uid !== 'number') {
                    cb(new DataError("Properties 'uid' does not a number"), '');
                }
                uploadPath = path.join(this.avatarPath, tokenPayload.uid.toString());
                fs.mkdir(uploadPath, { recursive: true }, (err) => {
                    if (err) {
                        cb (err, uploadPath);
                    }
                    cb (err, uploadPath);
                })
            } catch (error) {
                cb(error, uploadPath);
            }
        },
        filename: (req, file, cb) => {
            try {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                const extension = path.extname(file.originalname);
                cb(null, uniqueSuffix + extension);
            } catch (error) {
                cb(error, '');
            }
        }
    })

    static avatarUpload = multer({storage: UserController.avatarStorage});

    static async createService() {
        if (!UserController.userService) {
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
            const tokenPayload: any = await UserController.verifyUserLoginAuth(req, res);

            let result;

            switch (userInfoType) {
                case UserInfoType.USERNAME:
                    result = await UserController.userService.updateUserInfo(UserInfoType.USERNAME, tokenPayload.uid, value);
                    break;
                case UserInfoType.NICKNAME:
                    result = await UserController.userService.updateUserInfo(UserInfoType.NICKNAME, tokenPayload.uid, value);
                    break;
                default: 
                    res.status(HttpStatusCodes.BAD_REQUEST).json({
                        code: RetCode.BAD_REQUEST,
                        message: 'UserInfoType error!'
                    })
                    break;
            }

            res.json({
                code: RetCode.SUCCESS,
                message: 'Update successfully',
                data: {
                    uid: tokenPayload.uid,
                    value: value,
                    result: result
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
            const tokenPayload: any = await UserController.verifyUserLoginAuth(req, res);
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
            console.error(error);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
                code: RetCode.INTERNAL_SERVER_ERROR,
                message: error.message,
                data: error
            })
        }
    }

    static async updateAvatar(req: IReq, res: IRes) {
        try {
            await UserController.createService();
            const tokenPayload: any = await UserController.verifyUserLoginAuth(req, res);
            if (!req.file) {
                res.status(HttpStatusCodes.BAD_REQUEST).json({
                    code: RetCode.BAD_REQUEST,
                    message: 'no image upload'
                });
                return;
            }

            let path = req.file.path;
            path = UserController.processUserAvatarPath(path);

            await UserController.userService.updateUserInfo(UserInfoType.AVATAR, tokenPayload.uid, path);

            res.json({
                code: RetCode.SUCCESS,
                message: 'Update image successfully',
                data: {
                    uid: tokenPayload.uid,
                    avatar: path
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

    static async remove(req: IReq, res: IRes) {
        try {
            await UserController.createService();
            const tokenPayload: any = await UserController.verifyUserLoginAuth(req, res);
            const password = req.body.password;
            const result = await UserController.userService.removeUser(tokenPayload.uid, password);

            if (!result.success) {
                res.json({
                    code: RetCode.FAILURE,
                    message: result.message,
                    reason: result.reason
                })
            }

            res.json({
                code: RetCode.SUCCESS,
                message: 'Remove user successfully',
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

    static async getUserProfile(req: IReq, res: IRes) {
        try {
            await UserController.createService();

            const tokenPayload: any = await UserController.verifyUserLoginAuth(req, res);

            const userProfile = await UserController.userService.getUserById(tokenPayload.uid);

            res.status(HttpStatusCodes.OK).json({
                code: RetCode.SUCCESS,
                message: 'OK',
                data: userProfile
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

    private static async verifyUserLoginAuth(req: IReq, res: IRes) {
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

        if (!(await UserController.userService.verifyPasshashCorrection(decodePayload.uid , decodePayload.password))) {
            res.json({
                code: RetCode.FAILURE,
                reason: FailureReason.TOKEN_INVALID,
                message: 'Verification infos invalid'
            })
            return false;
        }

        return decodePayload;
    }

    static processUserAvatarPath(fullPath: string) {
        const pathGroups = fullPath.split("/");
        return `/${pathGroups[pathGroups.length - 2]}/${pathGroups[pathGroups.length - 1]}`;
    }

    static getUidOnPath(path: string) {
        const pathGroups = path.split('/');
        return parseInt(pathGroups[1]);
    }
}

export default UserController;