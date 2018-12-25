const fs = require('fs')
const getSqlMap = require('./get-sql-map')

let sqlContentMap = {}

// 读取sql文件内容
// fileName 文件名称  path 文件所在的路径
function getSqlContent(fileName, path) {
    let content = fs.readFileSync(path, 'binary')
    sqlContentMap[fileName] = content
}

// 封装所有sql文件脚本内容
function getSqlContentMap() {
    console.log('封装所有sql文件脚本内容')

    let sqlMap = getSqlMap()
    for (const key in sqlMap) {
        getSqlContent(key, sqlMap[key])
    }
    console.log('sqlContentMap:', sqlContentMap)
    return sqlContentMap
}

module.exports = getSqlContentMap