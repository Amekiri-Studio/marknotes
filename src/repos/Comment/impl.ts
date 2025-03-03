import Comment from "@src/models/Comment";
import ICommentRepository from ".";
import { sequelize, authenticate, syncModels } from '@src/database'
import { Status } from "@src/common/constants";

class CommentRepository implements ICommentRepository {

    private constructor() {
        
    }

    static async createRepository() {
        await Promise.all([authenticate(), syncModels({ force: false })]);
        return new CommentRepository();
    }

    async addComment (commentData: { creator: number; content: string; note: number; upperComment?: number; }) {
        return await Comment.create(commentData);
    }

    async updateComment (cid: number, creator: number, content: string) {
        return await Comment.update({
            content
        }, {
            where: {
                cid,
                creator,
                commentStatus: Status.Normal
            }
        })
    }

    async removeComment (cid: number, creator: number) {
        return await Comment.update({
            commentStatus: Status.Removed
        }, {
            where: {
                cid,
                creator
            }
        });
    }

    async listComment (nid: number) {
        return await Comment.findAll({
            where: {
                note: nid,
                commentStatus: Status.Normal
            }
        })
    }

    async listCommentByUser (uid: number) {
        return await Comment.findAll({
            where: {
                creator: uid,
                commentStatus: Status.Normal
            }
        })
    }
    
}

export default CommentRepository;