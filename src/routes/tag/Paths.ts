export default {
    base: '/tag',
    add: '/add',
    remove: '/remove/:id',
    removeTags: '/remove/tag/ids',
    list: '/list/:tag',
    listByNote: '/list/note/:id',
    recommend: '/recommend',
} as const;