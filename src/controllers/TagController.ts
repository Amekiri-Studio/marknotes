import ITagService, { TagService } from "@src/services/TagService";
import { IReq, IRes } from "./common";
import RetCode from "@src/common/RetCode";
import FailureReason from "@src/common/Reason";
import { decodeToken } from "@src/util/token";
import { UserService } from "@src/services/UserService";
import HttpStatusCodes from "@src/common/HttpStatusCodes";

class TagController {
    static tagService: ITagService;

    static async createService() {
        if (!TagController.tagService) {
            TagController.tagService = await TagService.createService();
        }
    }

    static async add(req: IReq, res: IRes) {
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

    static async remove(req: IReq, res: IRes) {
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

    static async listTagWithNote(req: IReq, res: IRes) {
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

    static async listTagsByNote(req: IReq, res: IRes) {
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

        const userService = await UserService.createService();

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

export default TagController;