// 二叉树最近公共祖先
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function(root, p, q) {
    if (!root) {
        return null
    }
    if (root === p || root === q) {
        return root
    }
    const lNode = lowestCommonAncestor(root.left, p, q)
    const rNode = lowestCommonAncestor(root.right, p, q)
    if (lNode && rNode) {
        return root
    } else {
        return lNode || rNode
    }
};

// 前序 + 中序 => 二叉树
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function(preorder, inorder) {
    if (inorder.length == 0) return null;
    const root = new TreeNode(preorder[0]);
    const mid = inorder.indexOf(preorder[0]);
    root.left = buildTree(preorder.slice(1, mid + 1), inorder.slice(0, mid));
    root.right = buildTree(preorder.slice(mid + 1), inorder.slice(mid + 1));
    return root;
};


// 组合
/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */

var combine = function(n, k) {
    let res = []
    if (k < 0 || n < k) {
        return res
    }
    let used = []
    res = def(n, k, 1, res, used)
    return res
};

function def (n, k, index, res, used) {
    let length = used.length
    if (length === k) {
        res.push([...used])
        return res
    }
    for (let i = index; i <= n - (k - length) + 1; i++) {
        used.push(i)
        res = def(n, k, i + 1, res, used)
        used.pop()
    }
    return res
}

// 排列
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
    let length = nums.length
    let res = []
    if (length === 0) {
        return res
    }
    let path = []
    let used = []
    res = dfs(nums, length, 0, used, path, res)
    return res
};

function dfs (nums, len, depth, used, path, res) {
    if (path.length === len) {
        res.push([...path])
        return res
    }
    for (let i = 0; i < len; i++) {
        if (!used[i]) {
            path.push(nums[i])
            used[i] = true
            res = dfs(nums, len, depth + 1, used, path, res)
            used[i] = false
            path.pop()
        }
    }
    return res
}

// 排序2
// 在循环前添加判断进行剪枝
if (i > 0 && nums[i] == nums[i - 1] && !used[i - 1]) {
    continue
}
