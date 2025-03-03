import Comment from "@src/models/Comment";
import ICommentRepository from ".";
import { sequelize, authenticate, syncModels } from '@src/database'

class CommentRepository implements ICommentRepository {

    private constructor() {
        
    }

    static async createRepository() {
        await Promise.all([authenticate(), syncModels({ force: false })]);
        return new CommentRepository();
    }

    async addComment (commentData: { creator: number; content: string; note: number; upperComment: number; }) {
        return await Comment.create(commentData);
    }

    async updateComment (cid: number, creator: number, content: string) {
        return await Comment.update({
            content
        }, {
            where: {
                cid,
                creator,
                isRemoved: false
            }
        })
    }

    async removeComment (cid: number) {
        return await Comment.update({
            isRemoved: true
        }, {
            where: {
                cid
            }
        });
    }

    async listComment (nid: number) {
        return await Comment.findAll({
            where: {
                note: nid
            }
        })
    }

    async listCommentByUser (uid: number) {
        return await Comment.findAll({
            where: {
                creator: uid
            }
        })
    }
    
}

export default CommentRepository;