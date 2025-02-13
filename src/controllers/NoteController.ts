import INoteService, { NoteService } from "@src/services/NoteService";
import { IReq, IRes } from "./common";
import HttpStatusCodes from "@src/common/HttpStatusCodes";
import RetCode from "@src/common/RetCode";
import FailureReason from "@src/common/Reason";
import { decodeToken } from "@src/util/token";
import { UserService } from "@src/services/UserService";

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

            const tokenPayload: any = await NoteController.verifyUserLoginAuth(req, res);

            const result = await NoteController.noteService.addNote({
                title, creator: tokenPayload.uid, language: pLang, content, isShare, allowPublicEdit
            })

            res.json({
                code: RetCode.SUCCESS,
                message: 'ok',
                data: result
            });
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

            if (!result.isShare) {
                const userService = await UserService.createService();
                const authorizationHeader = req.headers['x-mn-authorization'];
                if (!authorizationHeader) {
                    res.json({
                        code: RetCode.FAILURE,
                        reason: FailureReason.PRIVATE_NOTE,
                        message: 'This note is private'
                    })
                    return;
                }
                const tokenPayload: any = decodeToken(authorizationHeader);
                if (!tokenPayload) {
                    res.json({
                        code: RetCode.FAILURE,
                        reason: FailureReason.PRIVATE_NOTE,
                        message: 'This note is private'
                    })
                    return;
                }

                if (!(await userService.verifyPasshashCorrection(tokenPayload.uid, tokenPayload.password))) {
                    res.json({
                        code: RetCode.FAILURE,
                        reason: FailureReason.PRIVATE_NOTE,
                        message: 'This note is private'
                    })
                    return;
                }
            }

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

            const tokenPayload: any = await this.verifyUserLoginAuth(req, res);
            const { nid, title, content } = req.body;

            const result = NoteController.noteService.updateNote(nid, tokenPayload.uid, {title, content});
            res.json({
                code: RetCode.SUCCESS,
                message: 'Update successfully',
                data: {
                    nid,
                    title,
                    result
                }
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

    static async search(req: IReq, res: IRes) {
        try {
            await NoteController.createService();

            const keyword = req.params.keyword;
        } catch (error) {
            console.error(error);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
                code: RetCode.INTERNAL_SERVER_ERROR,
                message: error.message,
                data: error
            })
        }
    }

    static async remove(req: IReq, res: IRes) {

    }

    static async list(req: IReq, res: IRes) {

    }

    static async listById(req: IReq, res: IRes) {

    }

    static async uploadImage(req: IReq, res: IRes) {

    }

    static async setNotePublic(req: IReq, res: IRes) {

    }

    static async setNotePrivate(req: IReq, res: IRes) {

    }

    static async setNotePublicEdit(req: IReq, res: IRes) {

    }

    static async setNotePrivateEdit(req: IReq, res: IRes) {

    }

    private static async verifyUserLoginAuth(req: IReq, res: IRes) {
        const authorizationHeader = req.headers['x-mn-authorization'];

        if (!authorizationHeader) {
            res.json({
                code: RetCode.FAILURE,
                reason: FailureReason.LACK_OF_AUTH,
                message: 'Lack of authorization information'
            })
            return false;
        }
        
        const decodePayload: any = decodeToken(authorizationHeader);

        const userService = await UserService.createService();

        if (!(await userService.verifyPasshashCorrection(decodePayload.uid , decodePayload.password))) {
            res.json({
                code: RetCode.FAILURE,
                reason: FailureReason.TOKEN_INVALID,
                message: 'Verification infos invalid'
            })
            return false;
        }

        return decodePayload;
    }
}

export default NoteController;