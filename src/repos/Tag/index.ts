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
     * @returns 
     */
    listTagWithPost: (tagName: string) => Promise<any>;
}

export default TagRepository;