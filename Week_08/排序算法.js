let array = [3, 2, 1]
// 选择排序 选择最小的 放到第一位
function selectionSort (array) {
    let length = array.length
    for (let i = 0; i < length; i++) {
        let min = array[i]
        let minIndex = i
        for (let j = i; j < length; j++) {
            if (array[j] < min) {
                min = array[j]
                minIndex = j
            }
        }
        if (i !== minIndex) {
            let tem = array[i]
            array[i] = min
            array[minIndex] = tem
        }
    }
    return array
}
// console.log(selectionSort(array))

// 插入排序 下一个往前插入到对应位置
function insertSort (array) {
    let length = array.length
    for (let i = 1; i < length; i++) {
        let insert = array[i]
        let index = i
        for (let j = i - 1; j >=0; j--) {
            if (insert < array[j]) {
                array[j + 1] = array[j]
                index = j
            } else {
                break
            }
        }
        array[index] = insert
    }
    return array
}
// console.log(insertSort(array))

function bubbleSort (array) {
    let length = array.length
    for (let i = length - 1; i >= 0; i--) {
        for (let j = 0; j < i; j++) {
            if (array[j] > array[j + 1]) {
                let tem = array[j + 1]
                array[j + 1] = array[j]
                array[j] = tem
            }
        }
    }
    return array
}
// console.log(bubbleSort(array))

// 快速排序
function quickSort (array, left, right) {
    if (left >= right) return
    let pivot = partition(array, left, right)
    quickSort(array, left, pivot - 1)
    quickSort(array, pivot + 1, right)
}

function partition (array, left, right) {
    // pivot 标杆位置 counter: 小于pivot元素的个数
    let pivot = right, counter = left
    for (let i = left; i < right; i++) {
        if (array[i] < array[pivot]) {
            let tem 
            tem = array[counter], array[counter] = array[i], array[i] = tem
            counter++
        }
    }
    let tem 
    tem = array[counter], array[counter] = array[pivot], array[pivot] = tem
    return counter        
}
// quickSort(array, 0, array.length - 1)
// console.log(array)

// 归并排序
function mergeSort (array, left, right) {
    if (left >= right) return
    let mid = (left + right) >> 1
    mergeSort(array, left, mid)
    mergeSort(array, mid + 1, right)
    merge(array, left, mid, right)
}
function merge(array, left, mid, right) {
    let res = []
    let i = left, j = mid + 1, k = 0
    while(i <= mid && j <= right) {
        res[k++] = array[i] <= array[j] ? array[i++] : array[j++]
    }

    while (i <= mid) {
        res[k++] = array[i++]
    }

    while (j <= right) {
        res[k++] = array[j++]
    }
    for (let m = 0; m < right - left + 1; m++) {
        array[left + m] = res[m]
    }
}
// mergeSort(array, 0, array.length - 1)
// console.log(array)

// 桶排序
function heapSort (array) {
    let length = array.length
    if (!length) return

    // 建堆
    for (let i = (length >> 1) - 1; i >= 0; i--) {
        heapify(array, length, i)
    }

    // 排序
    for (let i = length - 1; i >= 0; i--) {
        [array[0], array[i]] = [array[i], array[0]]
        // 对0 - i 建堆
        heapify(array, i, 0)
    }
}
function heapify (array, length, i) {
    let left = i * 2 + 1
    let right = i * 2 + 2
    let largest = i

    if (left < length && array[left] > array[largest]) {
        largest = left
    }

    if (right < length && array[right] > array[largest]) {
        largest = right
    }

    if (largest !== i) {
        [array[i], array[largest]] = [array[largest], array[i]]
        heapify(array, length, largest)
    }
}

// heapSort(array)
// console.log(array)
