import IFollowService, { FollowService } from "@src/services/FollowService";
import { IReq, IRes } from "./common";
import HttpStatusCodes from "@src/common/HttpStatusCodes";
import RetCode from "@src/common/RetCode";
import FailureReason from "@src/common/Reason";
import IUserService, { UserService } from "@src/services/UserService";
import { decodeToken } from "@src/util/token";

class FollowController {
    static followService : IFollowService;

    static async createService() {
        if (!FollowController.followService) {
            FollowController.followService = await FollowService.createService();
        }
    }

    static async follow(req: IReq, res: IRes) {
        try {
            await FollowController.createService()
            const uid = req.params.id;

            const tokenPayload = await FollowController.verifyUserLoginAuth(req, res);

            if (!tokenPayload) {
                return;
            }

            const result = await FollowController.followService.follow(uid, tokenPayload.uid);

            res.json({
                code: RetCode.SUCCESS,
                message: 'OK',
                data: result
            });
        } catch (error) {
            console.error(error);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
                code: RetCode.INTERNAL_SERVER_ERROR,
                message: error.message,
                data: error
            })
        }
    }

    static async cancelFollow(req: IReq, res: IRes) {
        try {
            await FollowController.createService();
            const uid = req.params.id;

            const tokenPayload = await FollowController.verifyUserLoginAuth(req, res);
            const result = await FollowController.followService.cancelFollow(uid, tokenPayload.uid);

            if (!tokenPayload) {
                return;
            }

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

    static async listFollowed(req: IReq, res: IRes) {
        try {
            await FollowController.createService();

            const uid = req.params.id;
            const result = await FollowController.followService.listFollowed(uid);

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

    static async listFollowing(req: IReq, res: IRes) {
        try {
            await FollowController.createService();

            const uid = req.params.id;
            const result = await FollowController.followService.listFollowing(uid);

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

    static async check(req: IReq, res: IRes) {
        try {
            await FollowController.createService();

            const followed = req.params.id;
            const tokenPayload = await FollowController.verifyUserLoginAuth(req, res);

            if (!tokenPayload) {
                return;
            }

            const result = await FollowController.followService.checkIsFollowed(tokenPayload.uid, followed);

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

        const userService : IUserService = await UserService.createService();

        if (!(await userService.verifyPasshashCorrection(decodePayload.uid, decodePayload.password))) {
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

export default FollowController;