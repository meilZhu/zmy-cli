/***
 * @file: 工具类
 * @author: linkun.he
 * @Date: 2019-10-30 15:30:40
 */
const CONFIG = require("../config");

/***
 * @desc 是否可以进行格式化模板
 * @param path {string}  文件路径 e.g `package.json`、`src\environments\environment.ts`,匹配的时候需要转义`src\\environments\\environment.ts`
 * */
function canFormate(path) {
  return isOnWhiteList(path) && !isOnBlackList(path) ? true : false;
}

/***
 * @desc 白名单， 根据文件格式匹配
 * @param path {string}  文件路径
 * */
function isOnWhiteList(path) {
  const isOn = CONFIG["whiteList"].some(w => {
    return path.lastIndexOf(w) > -1;
  });

  return isOn;
}

/***
 * @desc 黑名单， 根据文件路径精确匹配
 * @param path {string}  文件路径
 * */
function isOnBlackList(path) {
  const isOn = CONFIG["blackList"].some(b => {
    return b === path;
  });

  return isOn;
}

module.exports = {
  isOnWhiteList,
  isOnBlackList,
  canFormate
};
