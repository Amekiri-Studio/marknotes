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
}

export default FailureReason;