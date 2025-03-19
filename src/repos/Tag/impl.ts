import Tag from "@src/models/Tag";
import ITagRepository from ".";
import { authenticate, syncModels } from "@src/database";

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
        const valueArray = [];
        for (let i = 0; i < tagIds.length; i++) {
            const val = {
                tid: tagIds[i],
                isRemoved: true
            }

            valueArray.push(val);
        }

        return await Tag.bulkCreate(valueArray, {
            updateOnDuplicate: ['isRemoved']
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
}

export default TagRepository;