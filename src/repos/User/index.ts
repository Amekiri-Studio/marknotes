import UserRepository from "./impl";

export interface IUserRepository {
    addUser: (UserData: {username: string, nickname: string, password: string, passwordSalt: string}) => Promise<any>;
    getUserById: (uid: number) => Promise<any>;
    getUserByUsername: (username: string) => Promise<any>;
    updateUsername: (uid: number ,username: string) => Promise<any>;
    updateNickname: (uid: number, nickname: string) => Promise<any>;
    updatePassword: (uid: number, password: string) => Promise<any>;
    updateAvatar: (uid: number, avatar: string) => Promise<any>;
    removeUser: (uid: number) => Promise<any>;
    queryUsernameAndPwd: (username: string, password: string) => Promise<any>;
    queryIdAndPwd: (uid: number, password: string) => Promise<any>;
}

export { UserRepository };

export default IUserRepository;