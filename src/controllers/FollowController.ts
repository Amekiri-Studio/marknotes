import IFollowService from "@src/services/FollowService";
import FollowService from "@src/services/FollowService/impl";
import { IReq, IRes } from "./common";
import HttpStatusCodes from "@src/common/HttpStatusCodes";
import RetCode from "@src/common/RetCode";

class FollowController {
    static followService : IFollowService;

    static async createService() {
        if (!FollowController.followService) {
            FollowController.followService = await FollowService.createService();
        }
    }

    static async follow(req: IReq, res: IRes) {
        try {
            
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
            
        } catch (error) {
            console.error(error);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
                code: RetCode.INTERNAL_SERVER_ERROR,
                message: error.message,
                data: error
            })
        }
    }
}

export default FollowController;