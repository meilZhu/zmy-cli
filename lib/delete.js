/***
 * @FileName: 删除文件
 * @Author: manyao.zhu
 * @Date: 2020-06-04 11:38:20
 */
const fse= require('fs-extra');
const chalk = require('chalk');

async function removeDir(path, cb) {
  try {
    await fse.remove(path)
    cb && cb()
  } catch (err) {
    console.log(chalk.red(err))
  }
}

module.exports = {
  removeDir
}