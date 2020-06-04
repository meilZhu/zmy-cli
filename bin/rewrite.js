/***
 * @FileName: 重写文件内容
 * @Author: manyao.zhu
 * @Date: 2020-06-04 11:38:39
 */
const fse = require('fs-extra');
const chalk = require('chalk');

// 重写package.json 的git校验
async function rewirtePackage(currentPath, cb) {
  try{
    const filePath = `${currentPath}/package.json`;
    const isExist = await fse.pathExists(filePath);  // 该文件是否存在
    if (!isExist) {
      return;
    }

    const json = await fse.readJson(filePath);  // 读取该文件的内容
    // 这里是angular用的
    json.husky = {
      hooks: {
        "pre-commit": "ng lint"
      }
    }

    await fse.writeJson(filePath, json, { spaces: "\t" })  // 重写该文件
    console.log(chalk.green('rewrite package.json success!'))
    cb && cb();  // 这句代码的意思就是， 是否有传递回调函数cb来，有的话就调用改函数
  } catch {
    console.log(chalk.red('rewrite package.json error'))
  }
}

module.exports = {
  rewirtePackage
}