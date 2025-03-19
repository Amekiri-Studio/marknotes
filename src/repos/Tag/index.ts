import TagRepository from "./impl";
export interface ITagRepository {
    /**
     * 添加标签(Tag)
     * @param tagData 标签数据体
     * @returns 
     */
    addTags: (tagData: Array<{tagName: string, associatedNote: number}>) => Promise<any>;

    /**
     * 删除标签
     * @param tagId 标签ID
     * @returns 
     */
    removeTags: (tagIds: Array<number>) => Promise<any>;

    /**
     * 删除单个标签
     * @param tid 标签ID
     * @returns 
     */
    removeTag: (tid: number) => Promise<any>;

    /**
     * 列出与标签有关的笔记
     * @param tagName 标签名
     * @returns 只返回笔记ID
     */
    listTagWithNote: (tagName: string) => Promise<any>;

    /**
     * 列出当前笔记的标签
     * @param pid 笔记ID
     * @returns 
     */
    listTagsByNote: (pid: number) => Promise<any>;

    /**
     * 列出笔记对应的标签(批量)
     * @param pids 
     * @returns 
     */
    listTagsByNotes: (pids: Array<number>) => Promise<any>;
}

export { TagRepository }

export default ITagRepository;