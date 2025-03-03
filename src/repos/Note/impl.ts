import Note from "@src/models/Note";
import { sequelize, authenticate, syncModels } from '@src/database'
import { Publicness, Status } from "@src/common/constants";
import INoteRepository from ".";
import { Op, Sequelize } from "sequelize";

class NoteRepository implements INoteRepository {
    private constructor() {

    }

    static async createRepository() {
        await Promise.all([authenticate(), syncModels({force: false})]);
        return new NoteRepository();
    }

    async addNote(noteData: {title: string, creator: number, language: string, content: string, isShare?: boolean, allowPublicEdit?: boolean}) {
        return await Note.create(noteData)
    }

    async getNoteById(nid: number) {
        return await Note.findOne({
            where: {
                nid,
                noteStatus: Status.Normal
            }
        })
    }

    async updateNote(nid: number, creator: number, noteData: {title: string, content: string}) {
        return await Note.update({
            title: noteData.title,
            content: noteData.content
        }, {
            where: {
                nid, creator
            }
        })
    }

    async setNotePublic(nid: number, creator: number) {
        return await Note.update({
            isShare: Publicness.PUBLIC
        }, {
            where: {
                nid, creator
            }
        })
    }

    async setNotePrivate(nid: number, creator: number) {
        return await Note.update({
            isShare: Publicness.PRIVATE
        }, {
            where: {
                nid, creator
            }
        })
    }

    async setNotePublicEdit(nid: number, creator: number) {
        return await Note.update({
            allowPublicEdit: Publicness.PUBLIC
        }, {
            where: {
                nid, creator
            }
        })
    }

    async setNotePrivateEdit(nid: number, creator: number) {
        return await Note.update({
            allowPublicEdit: Publicness.PRIVATE
        }, {
            where: {
                nid, creator
            }
        })
    }

    async removeNote(nid: number, creator: number) {
        return await Note.update({
            noteStatus: Status.Removed
        }, {
            where: {
                nid, creator
            }
        })
    }

    async searchNote(keyword: string) {
        return await Note.findAll({
            where: {
                [Op.and]: Sequelize.literal(`MATCH(title, content) AGAINST(:keyword IN BOOLEAN MODE)`),
                isShare: true,
                noteStatus: Status.Normal
            },
            replacements: { keyword }
        })
    }

    async listNote(uid: number, isPublic: boolean) {
        return await Note.findAll({
            where: {
                isShare: isPublic,
                creator: uid
            }
        });
    }
}

export default NoteRepository;