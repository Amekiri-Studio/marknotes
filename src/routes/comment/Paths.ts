export default {
    base: '/comment',
    add: '/add',
    update: '/update',
    remove: '/remove/:id',
    list: '/list/:id',
    listByUser: '/list/user/:id'
} as const;