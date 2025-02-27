import FollowRepository from "./impl";
export interface IFollowRepository {

    /**
     * 关注某人
     * @param followed 被关注者
     * @param following 关注者
     * @returns 
     */
    follow: (followed: number, following: number) => Promise<any>;

    /**
     * 取消关注某人
     * @param followed 被关注者
     * @param following 关注者
     * @returns 
     */
    cancelFollow: (followed: number, following: number) => Promise<any>;

    /**
     * 列出某用户的关注列表
     * @param following 用户ID
     * @returns 
     */
    listFollowed: (following: number) => Promise<any>;

    /**
     * 列出某用户的粉丝
     * @param followed 用户ID
     * @returns 
     */
    listFollowing: (followed: number) => Promise<any>;

    /**
     * 检查当前用户是否已被"我"关注
     * @param followed 
     * @returns 
     */
    checkIsFollowed: (uid: number, followed: number) => Promise<any>;
}

export { FollowRepository }

export default IFollowRepository;