import Note from "@src/models/Note";
import { sequelize, authenticate, syncModels } from '@src/database'
import { Status } from "@src/common/constants";
import INoteRepository from ".";

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

    }

    async setNotePublic(nid: number, creator: number) {

    }

    async setNotePrivate(nid: number, creator: number) {

    }

    async setNotePublicEdit(nid: number, creator: number) {

    }

    async setNotePrivateEdit(nid: number, creator: number) {

    }

    async removeNote(nid: number, creator: number) {

    }
}

export default NoteRepository;