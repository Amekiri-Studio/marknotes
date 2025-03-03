export default {
    base: '/note',
    add: '/add',
    get: '/get/:id',
    search: '/search/:keyword',
    update: '/update',
    edit: '/edit',
    remove: '/remove/:id',
    list: '/list',
    listById: '/list/:id',
    image: '/image',
    setPublic: '/public/:id',
    setPrivate: '/private/:id',
    setPublicEdit: '/public/edit/:id',
    setPrivateEdit: '/private/edit/:id'
} as const;