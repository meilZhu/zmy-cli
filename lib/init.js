/***
 * @FileName: init 初始化项目
 * @Author: manyao.zhu
 * @Date: 2020-06-04 10:44:33
 */
const program = require('commander');
const inquirer = require('inquirer');
const chalk = require('chalk');
const logSymbols = require('log-symbols');

const download = require('./download');
const generator = require('./generator');
const rewriteUtil = require('./rewrite');
const config = require('../config');

const init = (folderName) => {
  if (!folderName) {
    // folderName 必填
    // 相当于执行命令的--help选项，显示help信息，这是commander内置的一个命令选项
    program.help();
    return;
  }
  next = Promise.resolve(folderName);
  next && go();
}

function go() {
  next.then(folderName => {
    return download['downloadTemplate'](folderName).then(target => {
      return {
        name: folderName,
        root: folderName,
        downloadTemp: target
      }
    }).then(context => {
      return inquirer.prompt([
        {
          name: config.names.projectName,
          message: '项目名称',
          default: context.name
        },
        {
          name: config.names.projectVersion,
          message: '项目版本',
          default: '1.0.0'
        },
        {
          name: config.names.projectDescription,
          message: '项目描述',
          default: 'a project named' + ' ' +context.name
        },
        {
          name: config.names.port,
          message: '项目的端口号',
          default: '3434'
        }, 
        {
          name: config.names.prefix,
          message: '项目组件、指令的前缀',
          default: 'zmy'
        }
      ]).then(answers => {
        return {
          ...context,
          metadata: {
            ...answers,
            ...config.gitHooksDetail
          }
        }
      })
    }).then(context => {
      //删除临时文件夹，将文件移动到目标目录下
      return generator.generator(context)
    }).then(context => {
       // 成功用绿色显示，给出积极的反馈
       console.log(logSymbols.success, chalk.green("创建成功:)"));
       rewriteUtil.rewritePackage(context.downloadTemp, () => {
         try {
           process.chdir(context.root);
           download["downloadDependencies"]();
           // console.log(`New directory: ${process.cwd()}`);
         } catch (err) {
           console.error(`chdir: ${err}`);
         }
       });

    }).catch( err => {
      // 失败了用红色，增强提示
      console.log(err);
      console.error(logSymbols.error, chalk.red(`创建失败：${err.message}`));
    })
  })
}

module.exports = {
  init
}