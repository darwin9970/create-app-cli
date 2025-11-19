#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs-extra';
import { create, listTemplates } from '../lib/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 读取 package.json
const packageJson = await fs.readJson(join(__dirname, '../package.json'));

const program = new Command();

// 配置 CLI
program
  .name('create-app')
  .description('🚀 快速创建项目脚手架工具')
  .version(packageJson.version, '-v, --version', '显示版本号')
  .usage('<project-name> [options]');

// 主命令：创建项目
program
  .argument('[project-name]', '项目名称')
  .option('--no-install', '跳过依赖安装')
  .option('--no-git', '跳过 Git 初始化')
  .action(async (projectName, options) => {
    try {
      await create(projectName, {
        installDeps: options.install,
        initGit: options.git
      });
    } catch (error) {
      console.error(chalk.red(`\n错误: ${error.message}`));
      process.exit(1);
    }
  });

// list 命令：列出所有可用模板
program
  .command('list')
  .alias('ls')
  .description('列出所有可用的模板')
  .action(async () => {
    try {
      await listTemplates();
    } catch (error) {
      console.error(chalk.red(`\n错误: ${error.message}`));
      process.exit(1);
    }
  });

// help 命令
program
  .command('help')
  .description('显示帮助信息')
  .action(() => {
    program.help();
  });

// 自定义帮助信息
program.on('--help', () => {
  console.log();
  console.log(chalk.bold('使用示例:'));
  console.log();
  console.log(chalk.cyan('  $ create-app my-project'));
  console.log(chalk.gray('    创建一个新项目'));
  console.log();
  console.log(chalk.cyan('  $ create-app my-project --no-install'));
  console.log(chalk.gray('    创建项目但不安装依赖'));
  console.log();
  console.log(chalk.cyan('  $ create-app list'));
  console.log(chalk.gray('    查看所有可用模板'));
  console.log();
});

// 解析命令行参数
program.parse(process.argv);
