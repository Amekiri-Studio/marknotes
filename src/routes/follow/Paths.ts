export default {
    base: '/follow',
    follow: '/:id',
    cancelFollow: '/cancel/:id',
    listFollowed: '/list/:id',
    listFollowing: '/list/following/:id'
} as const;