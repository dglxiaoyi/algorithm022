/**
 * 柠檬水找零
 * @param {number[]} bills
 * @return {boolean}
 */
var lemonadeChange = function(bills) {
    let keys = [20, 10, 5]
    let price = 5
    let total = {}
    keys.forEach(item => {
        total[item] = 0
    })
    let res = true
    for (let i = 0; i < bills.length; i++) {
        let item = bills[i]
        let ling = item - price
        
        keys.forEach(item => {
            let num = parseInt(ling / item)
            if (num > total[item]) {
                ling -= total[item] * item
                total[item] = 0
            } else {
                total[item] -= num
                ling = ling % item
            }
        })

        let values = Object.values(total)
        
        if (ling || values.some(item => item < 0)) {
            res = false
            break
        } else {
            total[item]++
        }
    }
    return res
};


/**
 * 买卖股票的最佳时机 II
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    let len = prices.length
    if (len < 2) {
        return 0
    }
    let res = 0
    for (let i = 1; i < len; i++) {
        let liyi = prices[i] - prices[i - 1]
        if (liyi > 0) {
            res += liyi
        }
    }
    return res
};

/**
 * 分发饼干
 * @param {number[]} g
 * @param {number[]} s
 * @return {number}
 */
var findContentChildren = function(g, s) {
    g = g.sort((a, b) => a - b)
    s = s.sort((a, b) => a - b)
    let i = 0
    let j = 0
    let lenG = g.length
    let lenS = s.length
    while (i < lenG && j < lenS) {
        if (g[i] <= s[j]) {
            i++
        }
        j++
    }
    return i
};

/**
 * 模拟行走机器人
 * @param {number[]} commands
 * @param {number[][]} obstacles
 * @return {number}
 */
var robotSim = function(commands, obstacles) {
    let x = 0
    let y = 0
    let angle = 1
    let dx = [1, 0, -1, 0]
    let dy = [0, 1, 0, -1]
    let obstaclesMap = {}
    obstacles.forEach(item => {
        obstaclesMap[item] = true
    })

    let ans = 0

    commands.forEach(item => {
        switch(item) {
            case -2:
                angle = (angle + 1) % 4
                break
            case -1:
                angle = (angle + 3) % 4
                break
            default:
                for (let i = 0; i < item; i++) {
                    let nx = x + dx[angle]
                    let ny = y + dy[angle]
                    let code = `${nx},${ny}`
                    if (obstaclesMap[code]) {
                        break
                    } else {
                        x = nx
                        y = ny
                        ans = Math.max(ans, x * x + y * y) 
                    }
                }
        }
    })
    return ans
};

/**
 * 单词接龙
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {number}
 */
const ladderLength = (beginWord, endWord, wordList) => {
    const wordSet = new Set(wordList);
    const queue = [];
    queue.push([beginWord, 1]);
  
    while (queue.length) {
      const [word, level] = queue.shift();  // 当前出列的单词
      if (word == endWord) {
        return level;
      }
      for (let i = 0; i < word.length; i++) { // 遍历当前单词的所有字符
        for (let c = 97; c <= 122; c++) { // 对应26个字母
          const newWord = word.slice(0, i) + String.fromCharCode(c) + word.slice(i + 1); // 形成新词
          if (wordSet.has(newWord)) { // 单词表里有这个新词
            queue.push([newWord, level + 1]); // 作为下一层的词入列
            wordSet.delete(newWord);  // 避免该词重复入列
          }
        }
      }
    }
    return 0; // bfs结束，始终没有遇到终点
  };

/**
 * 岛屿数量
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function(grid) {
    if (grid === null || grid.length === 0) {
        return 0
    }
    const nr = grid.length
    const nc = grid[0].length
    let islandsNum = 0
    for (let r = 0; r < nr; r++) {
        for (let c = 0; c < nc; c++) {
            if (grid[r][c] === '1') {
                islandsNum++
                dfs(grid, r, c) // 将相邻岛屿清空
            }
        }
    }
    return islandsNum

    function dfs (grid, r, c) {
        const nr = grid.length
        const nc = grid[0].length
        if (r < 0 || c < 0 || r >= nr || c >= nc || grid[r][c] === '0') {
            return
        }
        grid[r][c] = '0'
        dfs(grid, r + 1, c)
        dfs(grid, r - 1, c)
        dfs(grid, r, c + 1)
        dfs(grid, r, c - 1)
    }
};
// let grid = [
//     ["1","1","1","1","0"],
//     ["1","1","0","1","0"],
//     ["1","1","0","1","0"],
//     ["0","0","0","1","1"]
//   ]
// let res = numIslands(grid)
// console.log(res);


/**
 * 扫雷游戏
 * @param {character[][]} board
 * @param {number[]} click
 * @return {character[][]}
 */
var updateBoard = function(board, click) {
    let dx = [-1, 1, 0, 0, -1, 1, -1, 1]
    let dy = [0, 0, -1, 1, -1, 1, 1, -1]
    let [x, y] = click
    if (board[x][y] === 'M') {
        board[x][y] = 'X'
    } else {
        // 如果是空地则进行 广度优先遍历 深度优先占用内存太大
        const maxY = board[0].length
        const maxX = board.length
        let queue = []
        let visited = []
        for (let i = 0; i < maxX; i++) {
            visited.push([])
            for (let j = 0; j < maxY; j++) {
                visited[i].push(false)
            }
        }
        queue.push([x, y])
        
        while (queue.length) {
            let [x, y] = queue.shift()
            visited[x][y] = true
            if (board[x][y] !== 'E') {
                continue
            }
            // 统计附近8格的雷数
            let cut = 0
            for (let i = 0; i < 8; i++) {
                const nx = x + dx[i]
                const ny = y + dy[i]
                if (nx < 0 || ny < 0 || nx >= maxX || ny >= maxY) {
                    continue
                }
                if (board[nx][ny] === 'M') {
                    cut++
                }
            }
            if (cut > 0) {
                board[x][y] = cut + ''
            } else {
                board[x][y] = 'B'
                for (let i = 0; i < 8; i++) {
                    const nx = x + dx[i]
                    const ny = y + dy[i]
                    if (nx < 0 || ny < 0 || nx >= maxX || ny >= maxY || visited[nx][ny]) {
                        continue
                    }
                    queue.push([nx, ny])
                }
            }
        }
    }
    return board
};
// let board = [
//     ['E', 'E', 'E', 'E', 'E'],
//     ['E', 'E', 'M', 'E', 'E'],
//     ['E', 'E', 'E', 'E', 'E'],
//     ['E', 'E', 'E', 'E', 'E']]
// let board = [["M"],["M"],["E"],["M"],["E"]]
// let click = [2, 0]
// let res = updateBoard(board, click)
// console.log(res);
/**
 * 跳跃数组
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function(nums) {
    let maxPosition = 0
    let len = nums.length
    for (let i = 0; i < len; i++) {
        if (i <= maxPosition) {
            maxPosition = Math.max(maxPosition, i + nums[i])
            if (maxPosition >= len - 1) {
                return true
            }
        }
    }
    return false
};

/**
 * 搜索旋转排序数组
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
// nums = [4,5,6,7,0,1,2], target = 0
var search = function(nums, target) {
    let l = 0
    let r = nums.length - 1
    while (l <= r) {
        let mid = parseInt((l + r) / 2)
        if (nums[mid] === target) {
            return mid
        }
        if (nums[mid] >= nums[l]) {
            if (target < nums[mid] && target >= nums[l]) {
                r = mid - 1
            } else {
                l = mid + 1
            }
        } else {
            if (target > nums[mid] && target <= nums[r]) {
                l = mid + 1
            } else {
                r = mid - 1 
            }
        }
    }
    return -1
};
// let res = search([4,5,6,7,0,1,2], 4)
// console.log(res);

/**
 * 搜索二维矩阵
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function(matrix, target) {
    let l = 0
    let r = matrix.length - 1
    let len = matrix[r].length
    if (target < matrix[0][0] || target > matrix[r][len - 1]) {
        return false
    }
    while (l <= r) {
        let mid = parseInt((l + r) / 2)
        if (matrix[mid][0] === target) {
            return true
        }
        if (l === r) {
            break
        }
        if (matrix[mid][0] > target) {
            r = mid - 1
        } else {
            l = mid + 1
        }
        
    }
    let i = r + (target > matrix[r][0] ? 0 : -1)
    l = 0
    r = matrix[i].length
    while (l <= r) {
        let mid = parseInt((l + r) / 2)
        if (matrix[i][mid] === target) {
            return true
        }
        if (matrix[i][mid] > target) {
            r = mid - 1
        } else {
            l = mid + 1
        }
    }
    return false
};
// let matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3;
// let res = searchMatrix(matrix, 15)
// console.log(res);
/**
 * 寻找旋转排序数组中的最小值
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function(nums) {
    let l = 0
    let r = nums.length - 1
    if (r < 2) {
        return Math.min(...nums)
    }
    while (l <= r) {
        let mid = parseInt((l + r) / 2)
        if (nums[mid] < nums[mid - 1]) {
            return nums[mid]
        }
        if (nums[l] >= nums[r]) {
            if (nums[mid] >= nums[l]) {
                l = mid + 1
            } else {
                r = mid - 1
            }
        } else {
            return nums[l]
        }
    }
};

/**
 * 跳跃数组2
 * @param {number[]} nums
 * @return {number}
 */
var jump = function(nums) {
    let maxPosition = 0
    let end = 0
    let step = 0
    let len = nums.length
    if (len <= 1) {
        return 0
    }
    for (let i = 0; i < len; i++) {
        maxPosition = Math.max(maxPosition, i + nums[i])
        if (maxPosition >= len - 1) {
            return step + 1
        }
        if (i === end) {
            step++
            end = maxPosition
        }
    }
    return step
};
/**
 * 单词接龙  太难了 竟然还超时了
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {string[][]}
 */
var findLadders = function(beginWord, endWord, wordList) {
    if (wordList.indexOf(endWord) < 0) {
        return []
    }
    let queue = [[beginWord, [beginWord]]]
    const wordUMap = {}
    wordList.forEach(item => {
        wordUMap[item] = 1
    })
    let level = 0
    let res = []
    let wordLen = beginWord.length
    while (queue.length) {
        let [word, path] = queue.shift()
        if (word === endWord) {
            if (!level || path.length <= level) {
                res.push(path)
                level = path.length
            }
            continue
        }
        if (level && path.length > level) {
            continue
        }
        for (let i =0; i < wordLen; i++) {
            for (let c = 97; c < 123; c++) {
                const newWord = word.slice(0, i) + String.fromCharCode(c) + word.slice(i + 1)
                if (wordUMap[newWord] && !path.includes(newWord)) {
                    queue.push([newWord, [...path, newWord]])
                }
            }
        }
    }
    return res
};

// let wordList = ["ted","tex","red","tax","tad","den","rex","pee"],
//     beginWord = "red",
//     endWord = "tax";
// let res = findLadders(beginWord, endWord, wordList)
// console.log(res);
