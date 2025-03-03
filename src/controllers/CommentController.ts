import ICommentService, { CommentService } from "@src/services/CommentService";
import { IReq, IRes } from "./common";
import HttpStatusCodes from "@src/common/HttpStatusCodes";
import RetCode from "@src/common/RetCode";
import FailureReason from "@src/common/Reason";
import { decodeToken } from "@src/util/token";
import { UserService } from "@src/services/UserService";

class CommentController {
    static commentService: ICommentService;

    static async createService() {
        if (!CommentController.commentService) {
            CommentController.commentService = await CommentService.createService();
        }
    }

    static async add(req: IReq, res: IRes) {
        try {
            await CommentController.createService();

            const tokenPayload: any = await CommentController.verifyUserLoginAuth(req, res);
            const { content, note, upperComment } = req.body;
            const result = CommentController.commentService.addComment({
                creator: tokenPayload.uid,
                content: content,
                note: note,
                upperComment: upperComment
            })

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

    static async update(req: IReq, res:IRes) {
        try {
            await CommentController.createService();

            const tokenPayload: any = await CommentController.verifyUserLoginAuth(req, res);
            const { cid, content } = req.body;

            const result = await CommentController.commentService.updateComment(cid, tokenPayload.uid, content);
            if (result.length <= 0) {
                res.json({
                    code: RetCode.FAILURE,
                    reason: FailureReason.NO_RIGHT_TO_EDIT_COMMENT,
                    message: 'No right to update'
                })
                return;
            }
            res.json({
                code: RetCode.SUCCESS,
                message: 'update successfully',
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

    static async remove(req: IReq, res:IRes) {
        try {
            await CommentController.createService();

            const tokenPayload: any = await CommentController.verifyUserLoginAuth(req, res);
            const cid = req.params.id;
            const result = await CommentController.commentService.removeComment(cid, tokenPayload.uid);

            if (result.length < 0) {
                res.json({
                    code: RetCode.FAILURE,
                    reason: FailureReason.NO_RIGHT_TO_REMOVE_COMMENT,
                    message: 'No right to remove comment created by others'
                })
                return;
            }
            res.json({
                code: RetCode.SUCCESS,
                message: 'remove successfully',
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

    static async list(req: IReq, res:IRes) {
        try {
            await CommentController.createService();

            const nid = req.params.id;
            const result = await CommentController.commentService.listComment(nid);

            res.json({
                code: RetCode.SUCCESS,
                message: "OK",
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

    static async listByUser(req: IReq, res:IRes) {
        try {
            await CommentController.createService();

            const uid = req.params.id;
            const result = await CommentController.commentService.listCommentByUser(uid);

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

export default CommentController;