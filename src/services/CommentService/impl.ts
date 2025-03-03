import { ArgumentError } from "@src/common/Errors";
import ICommentService from ".";
import IUserService, { UserService } from "../UserService";
import ICommentRepository, { CommentRepository } from "@src/repos/Comment";

class CommentService implements ICommentService {

    private commenRepository: ICommentRepository;
    private userService: IUserService | any;

    private constructor(commenRepository: ICommentRepository) {
        this.commenRepository = commenRepository;
    }

    static async createService() {
        return new CommentService(await CommentRepository.createRepository());
    }

    async addComment(commentData: { creator: number | any; content: string | any; note: number | any; upperComment?: number | any; }) {
        if (typeof commentData.creator !== 'number' || typeof commentData.content !== 'string' || typeof commentData.note !== 'number') {
            throw new ArgumentError('commentData.creator and commentData.note must be numbers and ommentData.content must be a string');
        }
        return await this.commenRepository.addComment(commentData);
    }

    async updateComment(cid: number | any, creator: number | any, content: string | any) {
        return await this.commenRepository.updateComment(cid, creator, content);
    }

    async removeComment(cid: number | any, creator: number | any) {
        if (typeof cid !== 'number') {
            throw new ArgumentError('cid must be a number');
        }
        return await this.commenRepository.removeComment(cid, creator);
    }

    async listComment(nid: number | any) {
        const result = await this.commenRepository.listComment(nid);
        const creatorIds = result.map((comment: { creator: any; }) => comment.creator);
        if (creatorIds.length > 0) {
            if (!this.userService) {
                this.userService = await UserService.createService();
            }
            const usersData = await this.userService.getUserByIds(creatorIds);

            for (let i = 0; i < result.length; i++) {
                const userId = result[i].creator;
                const userData = usersData.find((user: { uid: any; }) => user.uid === userId);
                result[i].creator = userData;
            }
        }

        return result;
    }

    async listCommentByUser(uid: number | any) {
        return await this.commenRepository.listCommentByUser(uid);
    }

}

export default CommentService;