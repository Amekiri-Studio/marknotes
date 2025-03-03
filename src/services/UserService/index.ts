import UserInfoType from "@src/common/UserInfoType";
import UserService from "./impl";

export interface IUserService {
    /**
     * 添加用户
     */
    addUser: (userData: {username: string | any, nickname: string | any, password : string | any}) => Promise<any>;

    /**
     * 通过用户名获取用户
     * @param username 用户名
     * @returns 
     */
    getUserByName: (username: string | any) => Promise<any>

    /**
     * 通过用户UID获取用户
     * @param uid 用户ID
     * @returns 
     */
    getUserById: (uid: number | any) => Promise<any>;

    /**
     * 更新用户信息
     * @param userInfoType 必须在UserInfoType.USERNAME，UserInfoType.NICKNAME，UserInfoType.AVATAR中选择
     * @param uid 用户ID
     * @param value 欲修改的值
     * @returns 
     */
    updateUserInfo: (userInfoType: UserInfoType, uid: string | any, value: string | any) => Promise<any>;

    /**
     * 删除用户(注销用户)
     * @param uid 用户
     * @param password 用户密码
     * @returns 
     */
    removeUser: (uid: number | any, password: string | any) => Promise<any>;

    /**
     * 用户登录
     * @param username 用户名
     * @param password 密码
     * @returns 
     */
    userLogin: (username: string | any, password: string | any) => Promise<any>;

    /**
     * 验证UID与HASH密码是否相同(验证TOKEN合法性)
     * @param uid 用户ID
     * @param passhash HASH后的密码
     * @returns 
     */
    verifyPasshashCorrection: (uid: number | any, passhash: string | any) => Promise<any>;

    /**
     * 更新用户密码
     * @param uid 用户ID
     * @param oldPass 旧密码
     * @param newPass 新密码
     * @returns 
     */
    updatePassword: (uid: number ,oldPass: string | any, newPass: string | any) => Promise<any>;

    /**
     * 批量查询用户(通过UID)
     * @param ids 
     * @returns 
     */
    getUserByIds: (ids: Array<number> | any) => Promise<any>;
}

export { UserService }

export default IUserService;