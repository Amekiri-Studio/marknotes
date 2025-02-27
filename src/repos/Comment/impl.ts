import Comment from "@src/models/Comment";
import ICommontRepository from ".";
import { sequelize, authenticate, syncModels } from '@src/database'

class CommontRepository implements ICommontRepository {

    private constructor() {
        
    }

    static async createRepository() {
        await Promise.all([authenticate(), syncModels({ force: false })]);
        return new CommontRepository();
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

    }

    async listComment (nid: number) {

    }

    async listCommentByUser (uid: number) {

    }
    
}

export default CommontRepository;