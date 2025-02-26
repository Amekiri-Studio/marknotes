export default {
    base: '/comment',
    add: '/add',
    update: '/update',
    remove: '/remove',
    list: '/list/:id',
    listByUser: '/list/user/:id'
} as const;