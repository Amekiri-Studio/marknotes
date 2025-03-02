import IFollowRepository, { FollowRepository } from "@src/repos/Follow";
import IFollowService from ".";

class FollowService implements IFollowService {

    private followRepository : IFollowRepository;

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
        return result;
    }

    async listFollowing (followed: number | any) {
        const result = await this.followRepository.listFollowing(followed);
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