const path = require('path')
const fs = require('fs')
const Busboy = require('busboy')
const os = require('os')
const inspect = require('util').inspect

// 同步创建文件目录
function mkdirsSync(dirname) {

    // 以同步的方法检测目录是否存在
    if (fs.existsSync(dirname)) {
        return true
    } else {

        // path.dirname去掉文件名，返回目录
        // 'a/b.js' --- 'a'
        if (mkdirsSync(path.dirname(dirname))) {

            // 同步的方式创建目录
            fs.mkdirSync(dirname)
            return true
        }
    }
}

// 获取上传文件的后缀名
function getSuffixName(fileName) {
    let nameList = fileName.split('.')
    return nameList[nameList.length - 1]
}

// 上传文件
function uploadFile(ctx, options) {
    let req = ctx.req
        // let res = ctx.res

    // req为node原生请求
    let busboy = new Busboy({ headers: req.headers })

    // 获取类型
    let fileType = options.fileType || 'common'
    let filePath = path.join(options.path, fileType)
    console.log('filePath:', filePath)
    mkdirsSync(filePath)

    return new Promise((resolve, reject) => {
        console.log('file is uploading.....')
        let result = {
            success: false,
            formData: {},
        }

        // 解析请求文件事件
        busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
            let fileName = Math.random().toString(16).substr(2) + '.' + getSuffixName(filename)
            let _uploadFilePath = path.join(filePath, fileName)
            console.log('_uploadFilePath:', _uploadFilePath)
            let saveTo = path.join(_uploadFilePath)
            console.log('saveTo:', saveTo)

            // 文件保存到指定路径
            file.pipe(fs.createWriteStream(saveTo))

            // 文件写入事件结束
            file.on('end', function() {
                result.success = true
                result.message = "文件上传成功"
                console.log('success')
            })
        })

        // 解析表单中其他字段信息
        busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
            console.log(fieldname + '->表单字段数据:' + inspect(val))
            result.formData[fieldname] = inspect(val)
        })

        busboy.on('finish', function() {
            console.log('finish!!!')
            resolve(result)
        })

        // 解析错误
        busboy.on('error', function(err) {
            console.log('err:', err)
            reject(result)
        })

        req.pipe(busboy)
    })
}

module.exports = {
    uploadFile
}