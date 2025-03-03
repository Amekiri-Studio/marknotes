import NoteService from "./impl";

export interface INoteService {
    /**
     * 添加笔记
     * @param noteData 笔记数据
     * @returns 
     */
    addNote: (noteData: {title: string | any,
        creator: number | any, 
        language: string | any, 
        content: string | any, 
        isShare?: boolean | any, 
        allowPublicEdit?: boolean | any}) => Promise<any>;
    
    /**
     * 通过笔记ID获取笔记
     * @param nid 笔记ID
     * @returns 
     */
    getNoteById: (nid: number | any) => Promise<any>;

    /**
     * 更新笔记
     * @param nid 笔记ID
     * @param creator 笔记创建者
     * @param noteData 笔记数据
     * @returns 
     */
    updateNote: (nid: number | any, creator: number, noteData: {title: string | any, content: string | any}) => Promise<any>;

    /**
     * 设置笔记为公开可见
     * @param nid 笔记ID
     * @param creator 笔记创建者
     * @returns 
     */
    setNotePublic: (nid: number | any, creator: number | any) => Promise<any>;

    /**
     * 设置笔记为私有(不可见)
     * @param nid 笔记ID
     * @param creator 笔记创建者
     * @returns 
     */
    setNotePrivate: (nid: number | any, creator: number | any) => Promise<any>;

    /**
     * 设置笔记为可公开编辑(要设置笔记为公开可见)
     * @param nid 笔记ID
     * @param creator 笔记创建者
     * @returns 
     */
    setNotePublicEdit: (nid: number | any, creator: number | any) => Promise<any>;

    /**
     * 设置笔记为不可公开编辑
     * @param nid 笔记ID
     * @param creator 笔记创建者
     * @returns 
     */
    setNotePrivateEdit: (nid: number | any, creator: number | any) => Promise<any>;

    /**
     * 删除笔记
     * @param nid 笔记ID
     * @param creator 笔记创建者
     * @returns 
     */
    removeNote: (nid: number | any, creator: number | any) => Promise<any>;

    /**
     * 搜索笔记
     * @param keyword 关键字
     * @returns 
     */
    searchNote: (keyword: string | any) => Promise<any>;

    /**
     * 列出笔记(根据用户)
     * @param uid 用户ID
     * @param isPublic 
     * @returns 
     */
    listNote: (uid: number | any, isPublic: boolean) => Promise<any>;

    /**
     * 编辑笔记(编辑公开笔记)
     * @param nid 
     * @returns 
     */
    editNote: (nid: number | any, noteData: {title: string | any, content: string | any}) => Promise<any>;
}

export {NoteService}

export default INoteService;