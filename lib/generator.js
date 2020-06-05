/***
 * @FileName: 修改模板内容
 * @Author: manyao.zhu
 * @Date: 2020-06-04 11:39:00
 */

const Metalsmith = require('metalsmith');
const Handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');
const utils = require('./utils');

const generator = (context) => {
  let metadata = context.metadata;
  let src = context.downloadTemp
  let dest = './' + context.root;

  if (!src) {
    return Promise.reject(new Error('无效的' + src))
  }

  return new Promise((resolve, reject) => {
    const metalsmith = Metalsmith(process.cwd())
      .metadata(metadata)
      .clean(false)
      .source(src)
      .destination(dest);
    // 判断下载的项目模板中是否有templates.ignore
    const ignoreFile = path.resolve(
      process.cwd(),
      path.join(src, "templates.ignore")
    );

    if (fs.existsSync(ignoreFile)) {
      // 定义一个用于移除模板中被忽略文件的metalsmith插件
      metalsmith.use((files, metalsmith, done) => {
        const meta = metalsmith.metadata();
        // 先对ignore文件进行渲染，然后按行切割ignore文件的内容，拿到被忽略清单
        const ignores = Handlebars.compile(
          fs.readFileSync(ignoreFile).toString()
        )(meta)
          .split("\n")
          .map(s => s.trim().replace(/\//g, "\\"))
          .filter(item => item.length);
        //删除被忽略的文件
        for (let ignorePattern of ignores) {
          if (files.hasOwnProperty(ignorePattern)) {
            delete files[ignorePattern];
          }
        }
        done();
      });
    }

    metalsmith
      .use((files, metalsmith, done) => {
        const meta = metalsmith.metadata();
        // console.log("meta:", meta); // 输入的元数据
        // console.log("files:", files); // 全部的文件
        Object.keys(files).forEach(fileName => {
          if (!utils.canFormate(fileName)) {
            return;
          }
          const t = files[fileName].contents.toString(); // 获取到指定文件的文件内容
          files[fileName].contents = Buffer.from(Handlebars.compile(t)(meta)); // 根据元数据的名称和模板中名称匹配塞值
        });
        done();
      })
      .build(err => {
        err ? reject(err) : resolve(context);
      });
  })
}

module.exports = {
  generator
}