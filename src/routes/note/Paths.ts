export default {
    base: '/note',
    add: '/add',
    get: '/get/:id',
    search: '/search/:keyword',
    update: '/update/:id',
    remove: '/remove/:id'
} as const;