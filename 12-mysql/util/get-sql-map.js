const fs = require('fs')
const walkFile = require('./walk-file')

// 获取sql目录下的文件目录数据
function getSqlMap() {

    console.log('获取sql目录下的文件目录数据')

    let basePath = __dirname
    basePath = basePath.replace(/\\/g, '\/')
    console.log('basePath:', basePath)

    let pathArr = basePath.split('\/')
    pathArr = pathArr.splice(0, pathArr.length - 1)
    basePath = pathArr.join('/') + '/sql/'
    console.log('basePath:', basePath)

    let fileList = walkFile(basePath, 'sql')
    console.log('fileList:', fileList)
    return fileList
}

module.exports = getSqlMap