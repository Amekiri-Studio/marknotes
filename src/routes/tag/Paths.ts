export default {
    base: '/tag',
    add: '/add',
    remove: '/remove/:id',
    removeTags: '/remove/tags',
    list: '/list/:tag',
    listByNote: '/list/note/:id'
} as const;