export default {
    base: '/user',
    add: '/add',
    get: '/get/id/:id',
    getName: '/get/username/:username',
    update: '/update',
    updatePwd: '/update/password',
    updateAvatar: '/update/avatar',
    remove: '/remove',
    login: '/login',
    profile: '/profile'
} as const