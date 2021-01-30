/** 实现字典树
 * Initialize your data structure here.
 */
var Trie = function() {
    this.trie = {}
};

/**
 * Inserts a word into the trie. 
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function(word) {
    if (!word) return false

    let node = this.trie
    for (let c of word) {
        if (!node[c]) {
            node[c] = {}
        }
        node = node[c]
    }
    node.isWord = true
};

Trie.prototype.traverse = function(word) {
    let node = this.trie
    for (let c of word) {
        if (!node[c]) {
            return null
        }
        node = node[c]
    }
    return node
};

/**
 * Returns if the word is in the trie. 
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function(word) {
    let node = this.traverse(word)
    return !!(node && node.isWord)
};

/**
 * Returns if there is any word in the trie that starts with the given prefix. 
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function(prefix) {
    return !!this.traverse(prefix)
};

/**
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */
// let trie = new Trie();

// trie.insert("apple");
// trie.search("apple");   // 返回 true
// trie.search("app");     // 返回 false
// trie.startsWith("app"); // 返回 true
// trie.insert("app");   
// trie.search("app");     // 返回 



/** 被围绕的区域  并查集解法
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */

class unionFind {
    constructor (n) {
        this.count = n // 当前分组
        this.parent = new Array(n) // 长度的n的数组 用来缓存每个i的根
        for (let i = 0; i < n; i++) {
            this.parent[i] = i // 每个个体默认的根为自身
        }
    }

    findRoot (i) {
        let root = i // 默认的根为自身
        while (this.parent[root] !== root) {
            root = this.parent[root] // 寻找真正的根
        }
        // 合并路径
        while (this.parent[i] !== i) {
            let x = i // 缓存当前个体
            i = this.parent[i] // 找到下一个个体
            this.parent[x] = root // 更新根
        }
        return root
    }

    union (a, b) { // 合并a 和 b 的根，即将a的根指向b的根
        const rootA = this.findRoot(a)
        const rootB = this.findRoot(b)
        if (rootA === rootB) return true
        if (rootB > rootA) {
            this.parent[rootA] = rootB
        } else {
            this.parent[rootB] = rootA
        }
        this.count--
    }

    isConnected (a, b) {
        const rootA = this.findRoot(a)
        const rootB = this.findRoot(b)
        return rootA === rootB 
    }
}

var solve = function(board) {
    if (!board) return
    const row = board.length
    if (!row) return
    const col = board[0].length

    const dummy = row * col
    let uf = new unionFind(dummy + 1)
    const dx = [1, 0, -1, 0]
    const dy = [0, 1, 0, -1]

    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            if (board[i][j] === 'O') {
                if (i === 0 || i === row - 1 || j === 0 || j === col - 1) {
                    uf.union(i * col + j, dummy)
                } else {
                    for (let k = 0; k < 4; k++) {
                        // 与相邻的O合并 
                        //因为从左至右扫描 只需考虑 右和下
                        const newX = i + dx[k]
                        const newY = j + dy[k]
                        if (board[newX][newY]) {
                            uf.union(i * col + j, newX * col + newY)
                        }
                    }
                }
            }
        }
    }

    // 连接完之后 再扫描一遍 找出被包围的点 无需考虑边界
    for (let i = 1; i < row - 1; i++) {
        for (let j = 1; j < col - 1; j++) {
            if (board[i][j] === 'O' && !uf.isConnected(i * col + j, dummy)) {
                board[i][j] = 'X'
            }
        }
    }
    return board

};
