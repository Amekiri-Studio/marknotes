import ICommontRepository from ".";

class CommontRepository implements ICommontRepository {

    private constructor() {
        
    }

    async addComment (commentData: { creator: number; content: string; note: number; upperComment: number; }) {

    }

    async updateComment (cid: number, creator: number, commentData: { content: string; upperComment: number; }) {

    }

    async removeComment (cid: number) {

    }

    async listComment (nid: number) {

    }

    async listCommentByUser (uid: number) {

    }
    
}

export default CommontRepository;