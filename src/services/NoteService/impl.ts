import { ArgumentError } from "@src/common/Errors";
import INoteService from ".";
import INoteRepository, { NoteRepository } from "@src/repos/Note";
import RetCode from "@src/common/RetCode";
import FailureReason from "@src/common/Reason";

class NoteService implements INoteService {
    private noteRepository: INoteRepository;

    private constructor(noteRepository: INoteRepository) {
        this.noteRepository = noteRepository;
    }

    static async createService() {
        return new NoteService(await NoteRepository.createRepository());
    }

    async addNote (noteData: { title: string | any; 
        creator: number | any; 
        language: string | any; 
        content: string | any; 
        isShare?: boolean | any; 
        allowPublicEdit?: boolean | any; }) {

        if (typeof noteData.creator !== 'number' || 
            typeof noteData.language !== 'string' ||
            typeof noteData.content !== 'string'
        ) {
            throw new ArgumentError(`'noteData: { title: string | any; 
            creator: number | any; 
            language: string | any; 
            content: string | any; }'
            arguments type error! `);
        }
        
        const addResult = this.noteRepository.addNote(noteData);
        return addResult;
    }

    async getNoteById (nid: number | any) {
        return this.noteRepository.getNoteById(nid);
    }

    async updateNote (nid: number | any, creator: number | any, noteData: { title: string | any; content: string | any; }) {
        if (typeof nid !== 'number' ||
            typeof creator !== 'number' ||
            typeof noteData.title !== 'string' ||
            typeof noteData.content !== 'string'
        ) {
            throw new ArgumentError(`'nid: number, creator: number, noteData: { title: string; content: string; }': arguments type error!`);
        }

        const updateRes = await this.noteRepository.updateNote(nid, creator, noteData);
        return updateRes;
    }

    async setNotePublic (nid: number | any, creator: number | any) {
        return await this.noteRepository.setNotePublic(nid, creator);
    }

    async setNotePrivate (nid: number | any, creator: number | any) {
        return await this.noteRepository.setNotePrivate(nid, creator);
    }

    async setNotePublicEdit (nid: number | any, creator: number | any) {
        return await this.noteRepository.setNotePublicEdit(nid, creator);
    }

    async setNotePrivateEdit (nid: number | any, creator: number | any) {
        return await this.noteRepository.setNotePrivateEdit(nid, creator);
    }

    async removeNote (nid: number | any, creator: number | any) {
        return await this.noteRepository.removeNote(nid, creator);
    }

    async searchNote (keyword: string | any) {
        if (typeof keyword !== 'string') {
            throw new ArgumentError(`Argument 'keyword' must be a string`);
        }

        return await this.noteRepository.searchNote(keyword);
    }

    async listNote (uid: number | any, isPublic: boolean = true) {
        if (typeof uid !== 'number') {
            throw new ArgumentError(`Argument 'uid' must be a number`);
        }

        return await this.noteRepository.listNote(uid, isPublic);
    }

    async editNote(nid: number | any, noteData: {title: string | any, content: string | any}) {
        const noteBody = await this.noteRepository.getNoteById(nid);
        if (!noteBody) {
            return {
                code: RetCode.FAILURE,
                reason: FailureReason.NOTE_NOT_PUBLIC_EDIT,
                message: 'Note are private to edit'
            }
        }

        const creator = noteBody.creator;

        const result = await this.noteRepository.updateNote(nid, creator, noteData);
        return {
            code: RetCode.SUCCESS,
            message: 'OK',
            data: result
        }
    }

    async getNoteByIds(nids: Array<any> | any) {
        
    }
}

export default NoteService;