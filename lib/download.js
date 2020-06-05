/***
 * @FileName: 下载模板
 * @Author: manyao.zhu
 * @Date: 2020-06-04 11:38:07
 */
const ora = require('ora');
const crossSpawn = require('cross-spawn');
const del = require('./delete');
const config = require('../config');

const currentPath = process.cwd().replace(/\\/g, '/') + '/';

var spinner;

// 下载模板  folderName: 文件夹名称

const downloadTemplate = (folderName) => {
  return new Promise((resolve, reject) => {
    startSpinner('正在下载资源...')
    const result = crossSpawn.sync(
      'git', 
      ['clone', config.frontPureUrl, folderName],
      {
        stdio: 'ignore'
      } 
    );
    if (result.error) {
      failSpinner(),
      reject(result.error);
      return;
    } else {
      successSpinner();
      const nowPath = currentPath + folderName;
      // 这里是用来删除git文件（中gitHub上带来的）
      del.removeDir(nowPath + '/.git' )
      resolve(nowPath)
    }
  })
}

// 启动项目
const runProject = () => {
  startSpinner('正在启动项目...');
  const result = crossSpawn.sync(
    'npm',
    ['start'],
    {
      stdio: 'inherit',
    }
  );
  if (result.error) {
    failSpinner();
    return;
  } else {
    successSpinner()
  }
}

// 下载依赖包
const downloadDependencies = () => {
  startSpinner('正在下载依赖...')
  const result = crossSpawn.sync(
    'yarn',
    {
      stdio: 'ignore'
    }
  );
  if (result.error) {
    failSpinner();
    return;
  } else {
    successSpinner();
    runProject();
  }
}


async function startSpinner(title) {
  spinner = ora(title);
  spinner.spinner = config.oraSpinnerConf;
  await spinner.start()
}

function failSpinner() {
  spinner.fail()
}

function successSpinner() {
  spinner.succeed()
}


module.exports= {
  downloadTemplate,
  runProject,
  downloadDependencies
}