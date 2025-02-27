export interface TagRepository {
    /**
     * 添加标签(Tag)
     * @param tagData 标签数据体
     * @returns 
     */
    addTag: (tagData:{tagName: string, associatedNote: string}) => Promise<any>;

    /**
     * 删除标签
     * @param tagId 标签ID
     * @returns 
     */
    removeTag: (tagId: number) => Promise<any>;

    /**
     * 列出与标签有关的笔记
     * @param tagName 标签名
     * @returns 只返回笔记ID
     */
    listTagWithPost: (tagName: string) => Promise<any>;

    /**
     * 列出当前笔记的标签
     * @param pid 笔记ID
     * @returns 
     */
    listTagByPost: (pid: number) => Promise<any>;
}

export default TagRepository;