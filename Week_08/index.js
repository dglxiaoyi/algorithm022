/**  位1的个数
 * @param {number} n - a positive integer
 * @return {number}
 */
var hammingWeight = function(n) {
    let count = 0
    while(n != 0) {
        count++
        n = n & (n - 1)
    }
    return count
};

/**  2的幂
 * @param {number} n
 * @return {boolean}
 */
var isPowerOfTwo = function(n) {
    return n > 0 && (n & (n - 1)) === 0
};

/** 颠倒二进制位
 * @param {number} n - a positive integer
 * @return {number} - a positive integer
 */
var reverseBits = function(n) {
    let res = 0
    for (let i = 0; i < 32; i++) {
        res = (n & 1) | (res << 1)
        n = n >> 1
    }
    // 最后需要无符号右移 *>>>*表示无符号右移，也叫逻辑右移，即若该数为正，则高位补0，而若该数为负数，则右移后高位同样补0
    return res >>> 0
};
