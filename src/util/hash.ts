import crypto from 'crypto';

export function hashSHA512(value: string, salt: string | any, iterations: number) {
    let result = value + salt; // 初始值是密码和盐的组合

    for (let i = 0; i < iterations; i++) {
        const hash = crypto.createHash('sha512', salt);
        hash.update(result);
        result = hash.digest('hex');
    }

    return result;
}

