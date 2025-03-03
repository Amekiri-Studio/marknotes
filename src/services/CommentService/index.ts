import CommentService from "./impl";
export interface ICommentService {
    /**
     * 添加评论
     * @param commentData 
     * @returns 
     */
    addComment: (commentData: { creator: number | any; content: string | any; note: number | any; upperComment: number | any; }) => Promise<any>;

    /**
     * 更新评论
     * @param cid 
     * @param creator 
     * @param content 
     * @returns 
     */
    updateComment: (cid: number | any, creator: number | any, content: string | any) => Promise<any>;

    /**
     * 删除评论
     * @param cid 
     * @returns 
     */
    removeComment: (cid: number | any) => Promise<any>;

    /**
     * 列出当前笔记的所有评论
     * @param nid 
     * @returns 
     */
    listComment: (nid: number | any) => Promise<any>;

    /**
     * 列出当前用户的所有评论
     * @param uid 
     * @returns 
     */
    listCommentByUser: (uid: number) => Promise<any>;
}

export { CommentService }

export default ICommentService;