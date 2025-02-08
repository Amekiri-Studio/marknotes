export default {
    base: '/note',
    add: '/add',
    get: '/get/:id',
    search: '/search/:keyword',
    remove: '/remove/:id'
} as const;