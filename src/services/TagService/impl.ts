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

    async removeTag(tid: number | any) {
        return await this.tagRepository.removeTag(tid);
    }

    async listTagWithNote(tagName: string | any) {
        const noteBody = await this.tagRepository.listTagWithNote(tagName);
        const noteIds = noteBody.map((item: any) => item.associatedNote);
        if (!this.noteService) {
            this.noteService = await NoteService.createService();
        }

        const notes = await this.noteService.getNoteByIds(noteIds);

        return notes;
    }

    async listTagsByNote(pid: number | any) {
        return await this.tagRepository.listTagsByNote(pid);
    }

    async listTags() {
        return await this.tagRepository.listTags();
    }
}

export default TagService;