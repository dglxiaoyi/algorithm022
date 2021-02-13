/** 不同路径 ||
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
/**
 * 状态转移方程
 * dp[i, j] 是空地
 * dp[i, j] = dp[i-1, j] + dp[i, j - 1]
 * dp[i, j] 是障碍
 * dp[i, j] = 0
 */
var uniquePathsWithObstacles = function(obstacleGrid) {
    let col = obstacleGrid.length
    if (!col) return 0
    let row = obstacleGrid[0].length
    let dp = obstacleGrid
    dp[0][0] = dp[0][0] ? 0 : 1
    for (let i = 1; i < col; i++) {
        dp[i][0] = dp[i][0] ? 0 : dp[i - 1][0]
    }
    for (let j = 1; j < row; j++) {
        dp[0][j] = dp[0][j] ? 0 : dp[0][j - 1]
    }
    for (let i = 1; i < col; i++) {
        for (let j = 1; j < row; j++) {
            dp[i][j] = dp[i][j] ? 0 : dp[i - 1][j] + dp[i][j - 1]
        }
    }
    return dp[col - 1][row - 1]
};
// console.log(uniquePathsWithObstacles([[0,0,0],[0,1,0],[0,0,0]]))
