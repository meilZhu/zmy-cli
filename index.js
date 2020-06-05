#!/usr/bin/env node

/***
 * @FileName: 
 * @Author: manyao.zhu
 * @Date: 2020-06-04 14:48:37
 */
const program = require("commander");
const init = require("./lib/init");
const packageInfo = require("./package.json");


program.version("v" + packageInfo.version, "-v, --version");

program
  .command("init <name>")
  .description("create a new project")
  .alias("i")
  .action(argv => {
    init.init(argv);
  });

program.parse(process.argv);

if (!program.args.length) {
  program.help();
}
