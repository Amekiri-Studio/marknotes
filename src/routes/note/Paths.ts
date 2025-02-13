export default {
    base: '/note',
    add: '/add',
    get: '/get/:id',
    search: '/search/:keyword',
    update: '/update/:id',
    remove: '/remove/:id',
    list: '/list',
    listById: '/list/:id',
    image: '/image',
    setPublic: '/public',
    setPrivate: '/private',
    setPublicEdit: '/public/edit',
    setPrivateEdit: '/private/edit'
} as const;