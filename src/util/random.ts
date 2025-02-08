import stringRandom from 'string-random'

export function getRandomStringByLen(len: number) {
    let result = stringRandom(len);
    return result;
}