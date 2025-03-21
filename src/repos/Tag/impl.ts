import Tag from "@src/models/Tag";
import ITagRepository from ".";
import { authenticate, syncModels } from "@src/database";
import { where } from "sequelize";

class TagRepository implements ITagRepository {
    private constructor() {

    }

    static async createRepository() {
        await Promise.all([authenticate(), syncModels({force: false})]);
        return new TagRepository();
    }

    async addTags(tagData: Array<{ tagName: string, associatedNote: number }>) {
        return await Tag.bulkCreate(tagData);
    }

    async removeTags(tagIds: Array<number>) {
        console.log(tagIds);
        const ids = [];
        for (let i = 0; i < tagIds.length; i++) {
            ids.push(tagIds[i])
        }

        return await Tag.update({
            isRemoved: true
        }, {
            where: {
                tid: ids
            }
        })

    }

    async removeTag(tid: number) {
        return await Tag.update({
            isRemoved: true
        }, {
            where: {
                tid
            }
        })
    }

    async listTagWithNote(tagName: string) {
        return await Tag.findAll({
            where: {
                tagName
            }
        })
    }

    async listTagsByNote(pid: number) {
        return await Tag.findAll({
            where: {
                associatedNote: pid,
                isRemoved: false
            }
        })
    }

    async listTagsByNotes(nids: Array<number>) {
        return await Tag.findAll({
            where: {
                associateNote: nids,
                isRemoved: false
            }
        });
    }

    async listTags() {
        return await Tag.findAll({
            where: {
                isRemoved: false
            }
        });
    }
}

export default TagRepository;