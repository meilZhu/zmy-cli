/***
 * @FileName: 文件配置信息
 * @Author: manyao.zhu
 * @Date: 2020-06-04 14:48:45
 */

// 模板变量前缀
const prefix = 'zmyTemplate_'

// 模板变量名称
const names = {
  projectName: `${prefix}projectName`, // 项目名称
  projectVersion: `${prefix}projectVersion`, // 项目版本
  projectDescription: `${prefix}projectDescription`, // 项目描述
  port: `${prefix}port`, // 运行端口
  prefix: `${prefix}prefix`, // 组件、指令前缀
  gitHooks: `${prefix}gitHooks`, // git hooks
}

// git hooks 内容，插入到模板中
const gitHooksDetail = {
  [names.gitHooks]: "ng lint"
};

// 可模板替换的白名单
const whiteList = [".json", ".ts", ".html", ".js"];

//可模板替换的黑名单
// prettier-ignore
const blackList = ["src\\assets\\i18n\\zh-CN.json", "src\\assets\\i18n\\en.json"];

// 项目在gitHub 的地址
const frontPureUrl = `https://github.com/meilZhu/clean-express-ejs-template.git`;

// ora 样式的配置信息
const oraSpinnerConf = {
  interval: 80,
  frames: [
    "🕛 ",
    "🕐 ",
    "🕑 ",
    "🕒 ",
    "🕓 ",
    "🕔 ",
    "🕕 ",
    "🕖 ",
    "🕗 ",
    "🕘 ",
    "🕙 ",
    "🕚"
  ]
}

module.exports = {
  prefix,
  names,
  gitHooksDetail,
  whiteList,
  blackList,
  frontPureUrl,
  oraSpinnerConf
}
 
