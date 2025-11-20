import inquirer from 'inquirer';
import chalk from 'chalk';
import { validateProjectName } from './validator.js';
import { getAvailableTemplates } from './utils.js';

/**
 * 获取项目配置
 * @param {string} projectName - 命令行传入的项目名称
 * @returns {Promise<{projectName: string, template: string, installDeps: boolean, packageManager: string, initGit: boolean}>}
 */
export async function getProjectConfig(projectName) {
  const templates = await getAvailableTemplates();

  if (templates.length === 0) {
    throw new Error('没有找到可用的模板');
  }

  const questions = [];

  // 如果没有提供项目名称，则询问
  if (!projectName) {
    questions.push({
      type: 'input',
      name: 'projectName',
      message: '请输入项目名称:',
      default: 'my-app',
      validate: (input) => {
        const result = validateProjectName(input);
        return result.valid ? true : result.error;
      },
      filter: (input) => input.trim()
    });
  }

  // 选择模板
  questions.push({
    type: 'list',
    name: 'template',
    message: '请选择项目模板:',
    choices: templates.map(t => ({
      name: `${chalk.cyan(t.name)} - ${chalk.gray(t.description)}`,
      value: t.name,
      short: t.name
    })),
    pageSize: 10
  });

  // 是否安装依赖
  questions.push({
    type: 'confirm',
    name: 'installDeps',
    message: '是否自动安装依赖?',
    default: true
  });

  const answers = await inquirer.prompt(questions);

  // 如果选择安装依赖，让用户选择包管理器
  let packageManager = 'npm';
  if (answers.installDeps) {
    const pmAnswer = await inquirer.prompt([
      {
        type: 'list',
        name: 'packageManager',
        message: '选择包管理器:',
        choices: [
          { name: 'npm', value: 'npm' },
          { name: 'yarn', value: 'yarn' },
          { name: 'pnpm', value: 'pnpm' }
        ],
        default: 'npm'
      }
    ]);
    packageManager = pmAnswer.packageManager;
  }

  // 是否初始化 Git
  const gitAnswer = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'initGit',
      message: '是否初始化 Git 仓库?',
      default: true
    }
  ]);

  return {
    projectName: projectName || answers.projectName,
    template: answers.template,
    installDeps: answers.installDeps,
    packageManager: packageManager,
    initGit: gitAnswer.initGit
  };
}

/**
 * 询问是否覆盖现有目录
 * @param {string} dirName - 目录名称
 * @returns {Promise<boolean>}
 */
export async function confirmOverwrite(dirName) {
  const { overwrite } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'overwrite',
      message: `目录 ${chalk.cyan(dirName)} 已存在。是否覆盖?`,
      default: false
    }
  ]);

  return overwrite;
}

/**
 * 询问是否继续（当目录非空时）
 * @param {string} dirName - 目录名称
 * @returns {Promise<boolean>}
 */
export async function confirmContinue(dirName) {
  const { continueAnyway } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'continueAnyway',
      message: `目录 ${chalk.cyan(dirName)} 不为空。是否继续?`,
      default: false
    }
  ]);

  return continueAnyway;
}

/**
 * 选择包管理器
 * @returns {Promise<string>}
 */
export async function selectPackageManager() {
  const { packageManager } = await inquirer.prompt([
    {
      type: 'list',
      name: 'packageManager',
      message: '选择包管理器:',
      choices: [
        { name: 'npm', value: 'npm' },
        { name: 'yarn', value: 'yarn' },
        { name: 'pnpm', value: 'pnpm' }
      ],
      default: 'npm'
    }
  ]);

  return packageManager;
}
