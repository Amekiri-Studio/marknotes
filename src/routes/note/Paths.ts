export default {
    base: '/note',
    add: '/add',
    get: '/get/:id',
    search: '/search/:keyword',
    update: '/update/:id',
    edit: '/edit/:id',
    remove: '/remove/:id',
    list: '/list',
    listById: '/list/:id',
    image: '/image',
    setPublic: '/public/:id',
    setPrivate: '/private/:id',
    setPublicEdit: '/public/edit/:id',
    setPrivateEdit: '/private/edit/:id'
} as const;