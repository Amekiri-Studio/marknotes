import CommontRepository from "./impl";

export interface ICommontRepository {
    
    /**
     * 添加笔记评论
     * @param commentData 评论数据体
     * @returns 
     */
    addComment: (commentData: {creator: number, content: string, note: number, upperComment: number}) => Promise<any>;

    /**
     * 更新笔记评论
     * @param cid 笔记ID
     * @param creator 笔记创建者
     * @param commentData 笔记数据体
     * @returns 
     */
    updateComment: (cid: number, creator: number, content: string) => Promise<any>;

    /**
     * 删除笔记评论
     * @param cid 笔记ID
     * @returns 
     */
    removeComment: (cid: number) => Promise<any>;

    /**
     * 列出当前笔记下的所有评论
     * @param nid 笔记ID
     * @returns 
     */
    listComment: (nid: number) => Promise<any>;

    /**
     * 列出当前用户发表的所有评论
     * @param uid 用户ID
     * @returns 
     */
    listCommentByUser: (uid: number) => Promise<any>;
}

export { CommontRepository }

export default ICommontRepository;