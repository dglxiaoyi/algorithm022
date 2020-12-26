/**
 * 前k个高频数字
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function(nums, k) {
    let map = new Map()
    nums.forEach(item => {
        if (map.has(item)) {
            let tem = map.get(item)
            map.set(item, tem +1)
        } else {
            map.set(item, 1)
        }
    })

    let arr = []
    for (let [key, value] of map) {
        if (arr[value]) {
            arr[value].push(key)
        } else {
            arr[value] = [key]
        }
    }

    let i = 0
    let j = arr.length - 1
    let res = []
    while (i < k && j > 0) {
        if (arr[j]) {
            for (let n = 0; n < arr[j].length; n++) {
                res.push(arr[j][n])
                i++
            }
        }
        j--
    }
    return res
};

/**
 * 丑数
 * @param {number} n
 * @return {number}
 */
var nthUglyNumber = function(n) {
    let deque = [1]
    let p2 = 0,p3 = 0,p5 = 0
    for (let i = 1; i < n; i++) {
        let n2 = deque[p2] * 2,n3 = deque[p3] * 3, n5 = deque[p5] * 5;
        deque[i] = Math.min(n2, n3, n5)
        if (deque[i] === n2) p2++
        if (deque[i] === n3) p3++
        if (deque[i] === n5) p5++
    }
    return deque[n-1]
};
