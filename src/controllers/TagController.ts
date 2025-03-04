import ITagService, { TagService } from "@src/services/TagService";
import { IReq, IRes } from "./common";

class TagController {
    static tagService: ITagService;

    static async createService() {
        if (!TagController.tagService) {
            TagController.tagService = await TagService.createService();
        }
    }

    static async add(req: IReq, res: IRes) {

    }

    static async remove(req: IReq, res: IRes) {

    }

    static async listTagWithNote(req: IReq, res: IRes) {

    }

    static async listTagsByNote(req: IReq, res: IRes) {

    }
}

export default TagController;