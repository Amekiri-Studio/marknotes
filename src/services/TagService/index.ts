import TagService from "./impl";
export interface ITagService {

    /**
     * 添加标签(批量)
     * @param tagData 
     * @returns 
     */
    addTags: (tagData: Array<{ tagName: string, associatedNote: number }> | any) => Promise<any>;

    /**
     * 删除标签(批量)
     * @param tagIds 
     * @returns 
     */
    removeTags: (tagIds: Array<number> | any) => Promise<any>;

    /**
     * 删除标签
     * @param tid 
     * @returns 
     */
    removeTag: (tid: number | any) => Promise<any>;

    /**
     * 列出与标签有关的笔记
     * @param tagName 
     * @returns 
     */
    listTagWithNote: (tagName: string | any) => Promise<any>;

    /**
     * 通过笔记查找对应的标签
     * @param pid 
     * @returns 
     */
    listTagsByNote: (pid: number | any) => Promise<any>;
}

export { TagService }

export default ITagService;