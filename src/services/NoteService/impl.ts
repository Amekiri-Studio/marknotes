import { ArgumentError } from "@src/common/Errors";
import INoteService from ".";
import INoteRepository, { NoteRepository } from "@src/repos/Note";

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

    async updateNote (nid: number, creator: number, noteData: { title: string; content: string; }) {
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

    }

    async setNotePrivate (nid: number | any, creator: number | any) {

    }

    async setNotePublicEdit (nid: number | any, creator: number | any) {

    }

    async setNotePrivateEdit (nid: number | any, creator: number | any) {

    }

    async removeNote (nid: number | any, creator: number | any) {

    }

    async searchNote (keyword: string | any) {
        
    }
    
}

export default NoteService;