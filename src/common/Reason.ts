enum FailureReason {
    /**
     * 失败原因：用户不存在
     */
    USER_NOT_EXISTS = -100,

    /**
     * 失败原因：密码错误
     */
    PASSWORD_WRONG = -101,
    
    /**
     * 失败原因：缺少授权信息
     */
    LACK_OF_AUTH = -102,

    /**
     * 失败原因：授权信息无效
     */
    TOKEN_INVALID = -103,

    /**
     * 失败原因：旧密码无效
     */
    OLD_PASSWORD_WRONG = -104,

    /**
     * 失败原因：新密码与旧密码相同
     */
    SAME_PASSWORD = -105,

    /**
     * 失败原因：前端未提供语言，且无法读取到浏览器默认语言
     */
    LACK_OF_DEFAULT_LANGUAGE = -106,

    /**
     * 失败原因：笔记为私有，无法直接访问
     */
    PRIVATE_NOTE = -107,

    /**
     * 失败原因：用户名已存在，无法使用
     */
    USERNAME_EXISTS = -108,

    /**
     * 失败原因：笔记不允许公开编辑
     */
    NOTE_NOT_PUBLIC_EDIT = -109,

    /**
     * 失败原因：不允许编辑非本人的笔记
     */
    NO_RIGHT_TO_EDIT_NOTE = -110,

    /**
     * 失败原因：不允许编辑非本人的评论
     */
    NO_RIGHT_TO_EDIT_COMMENT = -111,

    /**
     * 失败原因：不允许删除非本人的评论
     */
    NO_RIGHT_TO_REMOVE_COMMENT = -112,

    /**
     * 失败原因：笔记不存在
     */
    NOTE_NOT_EXISTS = -113,
}

export default FailureReason;