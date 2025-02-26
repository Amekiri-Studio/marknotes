export interface IFollowService {
    /**
     * 关注某人
     * @param followed 
     * @param following 
     * @returns 
     */
    follow: (followed: number | any, following: number | any) => Promise<any>;

    /**
     * 取消关注某人
     * @param followed 
     * @param following 
     * @returns 
     */
    cancelFollow: (followed: number | any, following: number | any) => Promise<any>;

    /**
     * 列出某用户的关注列表
     * @param following 用户ID
     * @returns 
     */
    listFollowed: (following: number | any) => Promise<any>;

    /**
     * 列出某用户的粉丝
     * @param followed 用户ID
     * @returns 
     */
    listFollowing: (followed: number | any) => Promise<any>;
}

export default IFollowService;