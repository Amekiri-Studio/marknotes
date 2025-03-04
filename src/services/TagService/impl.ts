import ITagRepository, { TagRepository } from "@src/repos/Tag";
import ITagService from ".";
import INoteService, { NoteService } from "../NoteService";

class TagService implements ITagService {
    private tagRepository: ITagRepository;
    private noteService: INoteService | any;
    private constructor(tagRepository: ITagRepository) {
        this.tagRepository = tagRepository
    }

    static async createService() {
        return new TagService(await TagRepository.createRepository());
    }

    async addTags(tagData: Array<{ tagName: string; associatedNote: number; }> | any) {
        return await this.tagRepository.addTags(tagData);
    }

    async removeTags(tagIds: Array<number> | any) {
        return await this.tagRepository.removeTags(tagIds);
    }

    async listTagWithNote(tagName: string | any) {
        const noteIds = await this.tagRepository.listTagWithNote(tagName);
        if (!this.noteService) {
            this.noteService = await NoteService.createService();
        }

        const notes = await this.noteService.getNoteByIds(noteIds);

        return notes;
    }

    async listTagsByNote(pid: number | any) {
        return await this.tagRepository.listTagsByNote(pid);
    }

}

export default TagService;