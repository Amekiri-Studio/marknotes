import INoteService, { NoteService } from "@src/services/NoteService";
import { IReq, IRes } from "./common";
import HttpStatusCodes from "@src/common/HttpStatusCodes";
import RetCode from "@src/common/RetCode";
import UserController from "./UserController";
import FailureReason from "@src/common/Reason";

class NoteController {
    static noteService: INoteService;

    static noteImagePath = './public/images/notes';

    static async createService() {
        if (!NoteController.noteService) {
            NoteController.noteService = await NoteService.createService();
        }
    }

    static async add(req: IReq, res: IRes) {
        try {
            await NoteController.createService();
            const { title, language, content, isShare, allowPublicEdit } = req.body;

            let pLang = language;
            if (!pLang) {
                const acceptedLanguages = req.headers['accept-language'];
                if (!acceptedLanguages) {
                    res.json({
                        code: RetCode.FAILURE,
                        reason: FailureReason.LACK_OF_DEFAULT_LANGUAGE,
                        message: 'lack of browser default language and user does not provide language'
                    })
                    return;
                }
                const languages = acceptedLanguages.split(',');
                const defaultLanguage = languages[0].split(';')[0];
                pLang = defaultLanguage;
            }

            if (!title || !content) {
                res.status(HttpStatusCodes.BAD_REQUEST).json({
                    code: RetCode.BAD_REQUEST,
                    message: 'Please provide title, language and content properities'
                });
                return;
            }

            const tokenPayload: any = UserController.verifyUserLoginAuth(req, res);

            NoteController.noteService.addNote({
                title, creator: tokenPayload.uid, language: pLang, content, isShare, allowPublicEdit
            })
        } catch (error) {
            console.error(error);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
                code: RetCode.INTERNAL_SERVER_ERROR,
                message: error.message,
                data: error
            })
        }
    }

    static async get(req: IReq, res: IRes) {
        try {
            await NoteController.createService();
            const idStr = req.params.id;
            if (!idStr) {
                res.status(HttpStatusCodes.BAD_REQUEST).json({
                    code: RetCode.BAD_REQUEST,
                    message: 'You must provide "id" parameter'
                });
                return;
            }
            let id;
            if (typeof idStr === 'string') {
                id = parseInt(idStr);
            }

            const result = await NoteController.noteService.getNoteById(id);

            res.json({
                code: RetCode.SUCCESS,
                message: 'OK',
                data: result
            })
        } catch (error) {
            console.error(error);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
                code: RetCode.INTERNAL_SERVER_ERROR,
                message: error.message,
                data: error
            })
        }
    }

    static async update(req: IReq, res: IRes) {
        try {
            await NoteController.createService();
        } catch (error) {
            console.error(error);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
                code: RetCode.INTERNAL_SERVER_ERROR,
                message: error.message,
                data: error
            })
        }
    }

    static async search(req: IReq, res: IRes) {

    }

    static async remove(req: IReq, res: IRes) {
        
    }
}

export default NoteController;