import IFollowRepository from ".";
import { sequelize, authenticate, syncModels } from '@src/database'
import Follow from "@src/models/Follow";

class FollowRepository implements IFollowRepository {
    private constructor() {

    }

    static async createRepository() {
        await Promise.all([authenticate(), syncModels({force: false})]);
        return new FollowRepository();
    }

    async follow (followed: number, following: number) {
        return await Follow.create({
            followed, following
        })
    }

    async cancelFollow (followed: number, following: number) {
        return await Follow.update({
            isRemoved: true
        }, {
            where: {
                followed, following
            }
        })
    }

    async listFollowed (following: number) {
        return await Follow.findAll({
            where: {
                following,
                isRemoved: true
            }
        })
    }

    async listFollowing (followed: number) {
        return await Follow.findAll({
            where: {
                followed,
                isRemoved: true
            }
        })
    }
    
}

export default FollowRepository;