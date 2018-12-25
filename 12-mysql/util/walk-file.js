const fs = require('fs')

// 遍历目录下的文件
const walkFile = function(pathResolve, mime) {

    console.log('遍历目录下的文件')

    // readdirSync方法将返回一个包含“指定目录下所有文件名称”的数组对象。
    let files = fs.readdirSync(pathResolve)
    console.log('files:', files)
    let fileList = {}
    for (let [i, item] of files.entries()) {
        let itemArr = item.split('\.')
        console.log('itemArr:', itemArr)

        let itemMime = (itemArr.length > 1) ? itemArr[itemArr.length - 1] : 'undefined'
        console.log('itemMime:', itemMime)

        if (mime === itemMime) {
            fileList[item] = pathResolve + item
        }
        console.log('fileList:', fileList)
    }
    return fileList
}

module.exports = walkFile