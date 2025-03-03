import IFollowRepository, { FollowRepository } from "@src/repos/Follow";
import IFollowService from ".";
import IUserService, { UserService } from "../UserService";

class FollowService implements IFollowService {

    private followRepository : IFollowRepository;
    private userService: IUserService | any;

    private constructor(followRepository: IFollowRepository) {
        this.followRepository = followRepository;
    }

    static async createService() {
        return new FollowService(await FollowRepository.createRepository());
    }

    async follow (followed: number | any, following: number | any) {
        const followRes = await this.followRepository.follow(followed, following);
        return followRes;
    }

    async cancelFollow (followed: number | any, following: number | any) {
        const result = await this.followRepository.cancelFollow(followed, following);
        return result;
    }

    async listFollowed (following: number | any) {
        const result = await this.followRepository.listFollowed(following);
        const followedIds = result.map((followed: { followed: any; }) => followed.followed);
        
        if (!this.userService) {
            this.userService = await UserService.createService();
        }
        if (result.length > 0) {
            const usersData = await this.userService.getUserByIds(followedIds);

            for (let i = 0; i < result.length;i++) {
                const followedId = result[i].followed;
                const userData = usersData.find((user: { uid: any; }) => user.uid === followedId);
                result[i].followed = userData;
            }
        }
        return result;
    }

    async listFollowing (followed: number | any) {
        const result = await this.followRepository.listFollowing(followed);
        const followingIds = result.map((following: { following: any; }) => following.following);
        if (!this.userService) {
            this.userService = await UserService.createService();
        }

        if (result.length > 0) {
            const usersData = await this.userService.getUserByIds(followingIds);

            for (let i = 0;i < result.length;i++) {
                const followingId = result[i].following;
                const userData = usersData.find((user: { uid: any; }) => user.uid === followingId);
                result[i].following = userData;
            }
        }
        return result;
    }
    
    async checkIsFollowed(uid: number | any, followed: number | any) {
        const result = await this.followRepository.checkIsFollowed(uid, followed);
        if (result) {
            return true;
        } else {
            return false;
        }
    }
}

export default FollowService;