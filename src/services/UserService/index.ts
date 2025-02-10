import UserInfoType from "@src/common/UserInfoType";
import UserService from "./impl";

export interface IUserService {
    addUser: (UserData: {username: string | any, nickname: string | any, password : string | any}) => Promise<any>;
    getUserByName: (username: string | any) => Promise<any>
    getUserById: (uid: number | any) => Promise<any>;
    updateUserInfo: (userInfoType: UserInfoType, uid: string | any, value: string | any) => Promise<any>;
    removeUser: (uid: number | any) => Promise<any>;
    userLogin: (username: string | any, password: string | any) => Promise<any>;
    verifyPasshashCorrection: (uid: number | any, passhash: string | any) => Promise<any>;
    updatePassword: (uid: number ,oldPass: string | any, newPass: string | any) => Promise<any>;
}

export { UserService }

export default IUserService;