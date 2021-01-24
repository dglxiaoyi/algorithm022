// 递推模板
const recursion = (level, params) =>{
    // recursion terminator 递归终止条件
    if (level > MAX_LEVEL) {
        process_result
        return
    }
    // process current level 当前层逻辑
    process(level, params)
    //drill down 下探到下一层
    recursion(level+1, params)
    //clean current level status if needed 清除当前层状态（例如指针型变量）
}
// 分治模板
divide_conquer = (problem, params) => {
    // recursion terminator
    if (problem == null) {
        process_result
        return
    }
    // process current problem 处理子问题
    subproblems = split_problem(problem, data)
    subresult1 = divide_conquer(subproblem[0], p1)
    subresult2 = divide_conquer(subproblem[1], p1)
    subresult3 = divide_conquer(subproblem[2], p1)
    // ...
    // merge 合并结果
    result = process_result(subresult1, subresult2, subresult3)
    // revert the current level status
}

/** 动态规划关键点和步骤
 * 1. 最优子结构
 * 2. Dp 方程（状态转移方程）
 * 3. 递推公式
 */

/** 最小路径和
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function(grid) {
    console.log(grid);
    let rLen = grid.length
    let cLen = grid[0].length
    for (let i = 0; i < rLen; i++) {
        for (let j = 0; j < cLen; j++) {
            let topNum = i === 0 ? 0 : grid[i - 1][j]
            let leftNum = j === 0 ? 0 : grid[i][j - 1]
            let min = 0
            if (i === 0 && j === 0) {
                min = 0
            } else if (i === 0) {
                min = leftNum
            } else if (j === 0) {
                min = topNum
            } else {
                min = Math.min(topNum, leftNum)
            }
            grid[i][j] += min
        }
    }
    return grid[rLen - 1][cLen - 1] || 0
};

// let grid = [[1,3,1],[1,5,1],[4,2,1]]
// let res = minPathSum(grid)
// console.log(res);

/** 编码方法
 * @param {string} s
 * @return {number}
 */
var numDecodings = function(s) {
    if (s[0] === '0') {
        return 0
    }
    let len = s.length
    let pre = 1 // s - 2
    let cur = 1 // s - 1
    for (let i = 0; i < len; i++) {
        let tem = cur
        let char = s[i]
        let dChar = s[i - 1] + s[i]
        if (char === '0') {
            if (s[i - 1] === '1' || s[i -1] === '2') cur = pre
            else return 0
        } else if (dChar <= 26 && s[i - 1] !== '0'){
            cur += pre
        }
        pre = tem
    }
    return cur
};
// let s = '226'
// let res = numDecodings(s)
// console.log(res);

/** 最大正方形
 * @param {character[][]} matrix
 * @return {number}
 */
var maximalSquare = function(matrix) {
    if (!(matrix && matrix.length && matrix[0].length)) {
        return 0
    }
    let height = matrix.length
    let width = matrix[0].length
    let dp = []
    let maxSlide = 0
    for (let i = 0; i <= height; i++) {
        dp.push([0])
    }
    for (let j = 0; j < width; j++) {
        dp[0].push(0)
    }
    for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
            if (matrix[row][col] === '1') {
                dp[row + 1][col + 1] = Math.min(dp[row][col], dp[row + 1][col], dp[row][col + 1]) + 1
                maxSlide = Math.max(maxSlide, dp[row + 1][col + 1])
            } else {
                dp[row + 1][col + 1] = 0
            }
        }
    }
    return maxSlide * maxSlide
};

// let matrix = [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]
// let res = maximalSquare(matrix)
// console.log(res);

/** 任务调度器
 * @param {character[]} tasks
 * @param {number} n
 * @return {number}
 */
var leastInterval = function(tasks, n) {
    if (!(tasks && tasks.length)) return 0
    if (n < 1) return tasks.length
    let taskMap = {}
    tasks.forEach(item => {
        if (taskMap[item]) {
            taskMap[item]++
        } else {
            taskMap[item] = 1
        }
    })
    let taskStatic = Object.values(taskMap).sort((a, b) => b - a)
    let maxTask = taskStatic[0]

    let len = tasks.length
    let lastRowTask = 1
    for (let i = 1; i < taskStatic.length; i++) {
        if (taskStatic[i] === maxTask) {
            lastRowTask++
        } else {
            break
        }
    }
    return Math.max(len, (maxTask - 1) * (n + 1) + lastRowTask)
};

// let tasks = ["A","A","A", "C" ,"B","B","B"], n = 2
// let res = leastInterval(tasks, n)
// console.log(res);

/** 回文子串
 * @param {string} s
 * @return {number}
 */
var countSubstrings = function(s) {
    if (!s) return 0
    let len = s.length
    let dp = new Array()
    for (let i = 0; i < len; i++) {
        let item = new Array(len).fill(false)
        dp.push(item)
    }

    // let res = []
    let res = 0
    for (let right = 0; right < len; right++) {
        for (let left = 0; left <= right; left++) {
            console.log('kaishi', left, right);
            if (s[left] !== s[right]) {
                continue
            }
            if (right - left <= 1) {
                dp[left][right] = true
            } else {
                dp[left][right] = dp[left + 1][right - 1]
            }
            dp[left][right] && res++
        }
    }
    // for (let i = 0; i < len; i++) {
    //     for (let j = i; j < len; j++) {
    //         dp[i][j] && res.push(s.slice(i, j + 1))
    //     }        
    // }
    return res
};
// let s = 'sss'
// let res = countSubstrings(s)
// console.log(res);

/** 最长有效括号
 * @param {string} s
 * @return {number}
 */
var longestValidParentheses = function(s) {
    if (!s) {
        return 0
    }
    let len = s.length
    let dp = new Array(len).fill(0)
    let max = 0
    for (let i = 1; i < len; i++) {
        if (s[i] === ')') {
            if (s[i - 1] === '(') {
                dp[i] = i > 1 ? dp[i - 2] + 2 : 2
            } else if (dp[i - 1]) {
                let index = (i - dp[i - 1] -1)
                if ( index >= 0 && s[index] === '(') {
                    dp[i] = dp[i - 1] + 2
 
                    if (index > 1) {
                        dp[i] += dp[index - 1]
                    }
                }
            }
        }
        max = Math.max(max, dp[i])
    }
    return max
};

// let res = longestValidParentheses( "()(()" )
// console.log(res);

/** 编辑距离
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function(word1, word2) {
    let len1 = word1.length
    let len2 = word2.length

    if (! (len1 * len2)) {
        return len1 + len2
    }
    let dp = []
    for (let i = 0; i <= len1; i++) {
        dp.push([i])
    }
    for (let j = 0; j <= len2; j++) {
        dp[0][j] = j
    }
    for (let i = 1; i <= len1; i++) {
        for (let j = 1; j <= len2; j++) {
            let left = dp[i - 1][j] + 1
            let down = dp[i][j - 1] + 1
            let left_down = dp[i - 1][j - 1]
            if (word1[i - 1] !== word2[j - 1]) {
                left_down += 1
            }
            dp[i][j] = Math.min(left_down, left, down)
        }   
    }
    return dp[len1][len2]
};
// let word1 = 'word', word2 = 'aaa'
// let res = minDistance(word1, word2)
// console.log(res);

/** 矩形区域不超过 K 的最大数值和 (未理解)
 * @param {number[][]} matrix
 * @param {number} k
 * @return {number}
 */
//暴力枚举 + 动态规划优化 2020-12-27
var maxSumSubmatrix = function (matrix, k) {
    // 前面主函数部分其实就是枚举的矩形而已,耐着性子可以看懂,
    // 枚举的矩形巧妙转换为一维数组rowSum，从而可以使用最大子序列和的动规算法去进行优化（执行用时可由300+毫秒优化至100+毫秒）
    // 枚举出的每一个矩形再传递给子函数getMax去得出不大于k的最大值
    let [row, col, max] = [matrix.length, matrix[0].length, -Infinity];
    for (let l = 0; l < col; l++) {
        let rowSum = new Array(row).fill(0);
        for (let r = l; r < col; r++) {
            for (let i = 0; i < row; i++) {
                rowSum[i] += matrix[i][r];
            }
            max = Math.max(max, getMax(rowSum)); //这里getMax送去给子函数
            if (max == k) return max;
        }
    }
    return max == -Infinity ? -1 : max;

    // 这里是子函数，用来求矩形不大于k的最大值
    function getMax(rowSum) {
        // 前面o(n)部分是判定最大子序和是否小于等于k,如果满足就没有必要再进行后面的o(n^2)部分了
        let [max, curr] = [rowSum[0] > k ? -Infinity : rowSum[0], rowSum[0]];
        for (let i = 1; i < rowSum.length; i++) {
            curr = Math.max(rowSum[i], rowSum[i] + curr);
            max = Math.max(curr, max);
        }
        if (max <= k) return max;
        // 后面o(n^2)暴力枚举部分在最大子序和大于k时才有必要使用
        //如果不用前面的最大子序和来优化，光用这里也是可以跑起来的,不过执行用时会变成300+
        max = -Infinity;
        for (let l = 0; l < rowSum.length; l++) {
            curr = 0;
            for (let r = l; r < rowSum.length; r++) {
                curr = rowSum[r] + curr;
                if (curr < k) max = Math.max(curr, max);
                if (curr == k) return max = k;
            }
        }
        return max;
    }
};

/** 青蛙过河
 * @param {number[]} stones
 * @return {boolean}
 */
var canCross = function(stones) {
    let map = {}
    stones.forEach(item => {
        map[item] = []
    })
    let len = stones.length
    for (let i = 0; i < len; i++) {
        const cur = stones[i];
        if (i === 0) {
            if (map[1]) {
                map[1].push(1)
            } else {
                return false
            }
            delete map[cur]
        } else {
            map[cur].forEach(item => {
                for (let step = item -1; step <= item + 1; step++) {
                    let nextStone = cur + step
                    if (step > 0 && map[nextStone] && !map[nextStone].includes(step)) {
                        map[nextStone].push(step)
                    }
                }
            })
            i < len - 1 && delete map[cur]
        }
    }
    console.log(2);
    return !!map[stones[len - 1]].length
};

// let stones = [0,1,3,5,6,8,12,17]
// let stones = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247,248,249,250,251,252,253,254,255,256,257,258,259,260,261,262,263,264,265,266,267,268,269,270,271,272,273,274,275,276,277,278,279,280,281,282,283,284,285,286,287,288,289,290,291,292,293,294,295,296,297,298,299,300,301,302,303,304,305,306,307,308,309,310,311,312,313,314,315,316,317,318,319,320,321,322,323,324,325,326,327,328,329,330,331,332,333,334,335,336,337,338,339,340,341,342,343,344,345,346,347,348,349,350,351,352,353,354,355,356,357,358,359,360,361,362,363,364,365,366,367,368,369,370,371,372,373,374,375,376,377,378,379,380,381,382,383,384,385,386,387,388,389,390,391,392,393,394,395,396,397,398,399,400,401,402,403,404,405,406,407,408,409,410,411,412,413,414,415,416,417,418,419,420,421,422,423,424,425,426,427,428,429,430,431,432,433,434,435,436,437,438,439,440,441,442,443,444,445,446,447,448,449,450,451,452,453,454,455,456,457,458,459,460,461,462,463,464,465,466,467,468,469,470,471,472,473,474,475,476,477,478,479,480,481,482,483,484,485,486,487,488,489,490,491,492,493,494,495,496,497,498,499,500,501,502,503,504,505,506,507,508,509,510,511,512,513,514,515,516,517,518,519,520,521,522,523,524,525,526,527,528,529,530,531,532,533,534,535,536,537,538,539,540,541,542,543,544,545,546,547,548,549,550,551,552,553,554,555,556,557,558,559,560,561,562,563,564,565,566,567,568,569,570,571,572,573,574,575,576,577,578,579,580,581,582,583,584,585,586,587,588,589,590,591,592,593,594,595,596,597,598,599,600,601,602,603,604,605,606,607,608,609,610,611,612,613,614,615,616,617,618,619,620,621,622,623,624,625,626,627,628,629,630,631,632,633,634,635,636,637,638,639,640,641,642,643,644,645,646,647,648,649,650,651,652,653,654,655,656,657,658,659,660,661,662,663,664,665,666,667,668,669,670,671,672,673,674,675,676,677,678,679,680,681,682,683,684,685,686,687,688,689,690,691,692,693,694,695,696,697,698,699,700,701,702,703,704,705,706,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744,745,746,747,748,749,750,751,752,753,754,755,756,757,758,759,760,761,762,763,764,765,766,767,768,769,770,771,772,773,774,775,776,777,778,779,780,781,782,783,784,785,786,787,788,789,790,791,792,793,794,795,796,797,798,799,800,801,802,803,804,805,806,807,808,809,810,811,812,813,814,815,816,817,818,819,820,821,822,823,824,825,826,827,828,829,830,831,832,833,834,835,836,837,838,839,840,841,842,843,844,845,846,847,848,849,850,851,852,853,854,855,856,857,858,859,860,861,862,863,864,865,866,867,868,869,870,871,872,873,874,875,876,877,878,879,880,881,882,883,884,885,886,887,888,889,890,891,892,893,894,895,896,897,898,899,900,901,902,903,904,905,906,907,908,909,910,911,912,913,914,915,916,917,918,919,920,921,922,923,924,925,926,927,928,929,930,931,932,933,934,935,936,937,938,939,940,941,942,943,944,945,946,947,948,949,950,951,952,953,954,955,956,957,958,959,960,961,962,963,964,965,966,967,968,969,970,971,972,973,974,975,976,977,978,979,980,981,982,983,984,985,986,987,988,989,990,991,992,993,994,995,996,997,998,999]
// let res = canCross(stones)
// console.log(res);

/** 分割数组的最大值 （未理解）
 * @param {number[]} nums
 * @param {number} m
 * @return {number}
 */
var splitArray = function(nums, m) {
    let len = nums.length,
      sumList = Array(len + 1).fill(0),
      dp = Array.from({ length: len + 1 }, () => Array(m + 1).fill(Number.MAX_VALUE));
  
    // 逐位增加，反面后面根据区间求区间和
    for (let i = 0; i < len; i++) {
      sumList[i + 1] = sumList[i] + nums[i];
    }
  
    // 默认值
    dp[0][0] = 0;
  
    for (let i = 1; i <= len; i++) {
      for (let j = 1; j <= Math.min(m, i); j++) {
        // 前i个数分成j段
        for (let x = j - 1; x < i; x++) {
          // x最后一段的起点
          // perv本轮分割完成 分段中最大的和
          let prev = Math.max(dp[x][j - 1], sumList[i] - sumList[x])
          // 该分割情况下最大分段和的最小值
          dp[i][j] = Math.min(prev, dp[i][j])
        }
      }
    }
  
    return dp[len][m]
  };

/** 学生出勤记录2
 * @param {number} n
 * @return {number}
 */
// var checkRecord = function(n) {
//     let M = 1e9 + 7
//     let dp = []
//     dp[0] = 1
//     dp[1] = 2
//     dp[2] = 4
//     dp[3] = 7
//     for (let i = 4; i <= n; i++) {
//         dp[i] = ((2 * dp[i - 1]) % M + (M - dp[i - 4])) % M
//     }
//     // 621118180   48985598554
//     let sum = dp[n]
//     // console.log(sum);
//     for (let i = 1; i <= n; i++) {
//         // 从这里开始和java不一致 乘积超出js最大安全数
//         console.log(dp[i - 1] * dp[n - i]);
//         sum += (dp[i - 1] * dp[n - i]) % M
//     }
//     console.log(sum);
//     return sum % M
// };
var checkRecord = function (n) {
    const mod = 1e9 + 7;
    const transitions = [[0, 1, 3], [0, 2, 3], [0, 3], [3, 4], [3, 5], [3]];
    let counts = [1, 0, 0, 0, 0, 0];
    for (let i = 0; i < n; i++) {
        const counts2 = Array(6).fill(0);
        for (let i = 0; i < counts.length; i++) {
            const count = counts[i];
            for (const state of transitions[i]) {
                counts2[state] += count;
                counts2[state] %= mod;
            }
        }
        counts = counts2;
    }
    return counts.reduce((a, b) => a + b) % mod;
};
// console.log(checkRecord(100));
