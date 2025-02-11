import UserRepository from "./impl";

export interface IUserRepository {
    /**
     * 添加用户
     * @param UserData 
     * @returns 
     */
    addUser: (UserData: {username: string, nickname: string, password: string, passwordSalt: string}) => Promise<any>;

    /**
     * 通过用户ID获取用户
     * @param uid 用户ID
     * @returns 
     */
    getUserById: (uid: number) => Promise<any>;

    /**
     * 通过用户名获取用户
     * @param username 用户名
     * @returns 
     */
    getUserByUsername: (username: string) => Promise<any>;

    /**
     * 更新用户名
     * @param uid 用户ID 
     * @param username 用户名
     * @returns 
     */
    updateUsername: (uid: number ,username: string) => Promise<any>;

    /**
     * 更新昵称
     * @param uid 用户ID
     * @param nickname 用户昵称
     * @returns 
     */
    updateNickname: (uid: number, nickname: string) => Promise<any>;

    /**
     * 更新用户密码
     * @param uid 用户ID
     * @param password 密码(请自行HASH)
     * @returns 
     */
    updatePassword: (uid: number, password: string) => Promise<any>;

    /**
     * 更新用户头像
     * @param uid 用户ID
     * @param avatar 头像(路径)
     * @returns 
     */
    updateAvatar: (uid: number, avatar: string) => Promise<any>;

    /**
     * 删除用户
     * @param uid 用户ID
     * @returns 
     */
    removeUser: (uid: number) => Promise<any>;

    /**
     * 查询用户名与HASH过后的密码(用于login)
     * @param username 
     * @param password 
     * @returns 
     */
    queryUsernameAndPwd: (username: string, password: string) => Promise<any>;

    /**
     * 查询用户ID与HASH过后的密码(用于auth)
     * @param uid 
     * @param password 
     * @returns 
     */
    queryIdAndPwd: (uid: number, password: string) => Promise<any>;
}

export { UserRepository };

export default IUserRepository;