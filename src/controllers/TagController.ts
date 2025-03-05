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
            await TagController.createService();

            await TagController.verifyUserLoginAuth(req, res);

            const tags = req.body.tags;
            const result = await TagController.tagService.addTags(tags);
            res.status(HttpStatusCodes.OK).json({
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

    static async remove(req: IReq, res: IRes) {
        try {
            await TagController.createService();

            await TagController.verifyUserLoginAuth(req, res);

            const tags = req.body.tags;
            const result = await TagController.tagService.removeTags(tags);
            res.status(HttpStatusCodes.OK).json({
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

    static async listTagWithNote(req: IReq, res: IRes) {
        try {
            await TagController.createService();

            const tag = req.params.tag;
            const result = await TagController.tagService.listTagWithNote(tag);

            res.status(HttpStatusCodes.OK).json({
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

    static async listTagsByNote(req: IReq, res: IRes) {
        try {
            await TagController.createService();

            const id = req.params.id;
            const result = await TagController.tagService.listTagsByNote(id);

            res.status(HttpStatusCodes.OK).json({
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