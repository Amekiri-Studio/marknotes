import ICommentService, { CommentService } from "@src/services/CommentService";
import { IReq, IRes } from "./common";

class CommentController {
    static commentService: ICommentService;

    static async createService() {
        if (!CommentController.commentService) {
            CommentController.commentService = await CommentService.createService();
        }
    }

    static async add(req: IReq, res: IRes) {
        
    }

    static async update(req: IReq, res:IRes) {

    }

    static async remove(req: IReq, res:IRes) {
        
    }

    static async list(req: IReq, res:IRes) {
        
    }

    static async listByUser(req: IReq, res:IRes) {
        
    }
}

export default CommentController;