/** 字符串中的第一个唯一字符
 * @param {string} s
 * @return {number}
 */
var firstUniqChar = function(s) {
    let map = {}
    for (let c of s) {
        console.log(c)
        if (map[c]) {
            map[c]++
        } else {
            map[c] = 1
        }
    }
    console.log(map)
    for (let i = 0, len = s.length; i < len; i++) {
        if (map[s[i]] === 1) {
            return i
        }
    }
    return -1
};
// console.log(firstUniqChar('leetcode'))

/** 反转字符串 II
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
var reverseStr = function(s, k) {
    if (k <= 1) return s
    let len = s.length
    let res = ''
    let l= 0
    let r = Math.min(l + k - 1, len - 1)
    let nextL = Math.min(l + 2 * k, len)

    while (l < len) {
        for (let i = r; i>= l; i--) {
            res += s[i]
        }
        for (let j = r + 1; j < nextL; j++) {
            res += s[j]
        }
        l = nextL
        nextL = Math.min(l + 2 * k, len)
        r = Math.min(l + k - 1, len - 1)
    }
    return res
};
// var reverseStr = function(s, k) {
//     if (k <= 1) return s
//     s = s.split('')
//     let len = s.length
//     let l= 0, r = Math.min(l + k - 1, len - 1)

//     while (l < len) {
//         while(l < r) {
//             [s[l], s[r]] = [s[r], s[l]]
//             l++
//             r--
//         }
//         l = l + 2 * k - 1
//         r = Math.min(l + k - 1, len - 1)
//     }
//     return s.join('')
// };
// console.log(reverseStr('abcdefg', 2))

/** 翻转字符串里的单词
 * @param {string} s
 * @return {string}
 */
var reverseWords = function(s) {
    return s.trim().split(/\s+/).reverse().join(' ')
};
// console.log(reverseWords(' the sky is blue '))

/** 仅仅反转字母
 * @param {string} S
 * @return {string}
 */
var reverseOnlyLetters = function(S) {
    if (!S) return S
    let len = S.length
    let l = 0, r = len - 1
    let res = S.split('')
    while (l < r) {
        while(!isZimu(res[l]) && l < r) {
            l++
        }
        while(!isZimu(res[r]) && l < r) {
            r--
        }
        [res[l], res[r]] = [res[r], res[l]]
        l++
        r--
    }
    return res.join('')
};
function isZimu (a) {
    if (!a) return false
    let unicode = a.charCodeAt(0)
    let res = (unicode >= 65 && unicode <= 90) || (unicode >= 97 && unicode <= 122)
    return res
}

//console.log(reverseOnlyLetters("a-bC-dEf-ghIj"))
