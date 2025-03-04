import NoteRepository from "./impl";
export interface INoteRepository {
    /**
     * 添加笔记
     * @param noteData Note数据结构体
     * @returns 
     */
    addNote: (noteData: {title: string, creator: number, language: string, content: string, isShare?: boolean, allowPublicEdit?: boolean}) => Promise<any>;
    
    /**
     * 通过笔记ID获取笔记
     * @param nid 笔记ID
     * @returns 
     */
    getNoteById: (nid: number) => Promise<any>;

    /**
     * 更新笔记
     * @param nid 笔记ID
     * @param creator 笔记创建者
     * @param noteData 笔记数据
     * @returns 
     */
    updateNote: (nid: number, creator: number, noteData: {title: string, content: string}) => Promise<any>;

    /**
     * 设置笔记为公开可见
     * @param nid 笔记ID
     * @param creator 笔记创建者
     * @returns 
     */
    setNotePublic: (nid: number, creator: number) => Promise<any>;

    /**
     * 设置笔记为私有(不公开可见)
     * @param nid 笔记ID
     * @param creator 笔记创建者
     * @returns 
     */
    setNotePrivate: (nid: number, creator: number) => Promise<any>;

    /**
     * 设置笔记为公开可编辑
     * @param nid 笔记ID
     * @param creator 笔记创建者
     * @returns 
     */
    setNotePublicEdit: (nid: number, creator: number) => Promise<any>;

    /**
     * 设置笔记为私有可编辑(只有创建者可以编辑)
     * @param nid 笔记ID
     * @param creator 笔记创建者
     * @returns 
     */
    setNotePrivateEdit: (nid: number, creator: number) => Promise<any>;

    /**
     * 删除笔记
     * @param nid 笔记ID
     * @param creator 笔记创建者
     * @returns 
     */
    removeNote: (nid: number, creator: number) => Promise<any>;

    /**
     * 搜索笔记
     * @param keyword 关键字
     * @returns 
     */
    searchNote: (keyword: string) => Promise<any>;

    /**
     * 列出笔记(根据用户)
     * @param uid 用户ID
     * @param isPublic 是否公开
     * @returns 
     */
    listNote: (uid: number, isPublic: boolean) => Promise<any>;

    /**
     * 批量查询笔记(通过ID)
     * @param nids 笔记ID，数组
     * @returns 
     */
    getNoteByIds: (nids: Array<number>, isShare: boolean) => Promise<any>;
}

export { NoteRepository }

export default INoteRepository;