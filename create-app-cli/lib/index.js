import chalk from 'chalk';
import { Generator } from './generator.js';
import { getProjectConfig } from './prompts.js';
import { getAvailableTemplates } from './utils.js';

/**
 * 主函数
 * @param {string} projectName - 项目名称
 * @param {object} options - 选项
 */
export async function create(projectName, options = {}) {
  try {
    // 获取配置
    const config = await getProjectConfig(projectName);

    // 创建生成器实例
    const generator = new Generator(config.projectName, config.template, {
      installDeps: config.installDeps,
      initGit: config.initGit,
      cwd: options.cwd || process.cwd()
    });

    // 生成项目
    const success = await generator.generate();

    if (!success) {
      process.exit(1);
    }
  } catch (error) {
    if (error.message === '用户取消操作') {
      console.log(chalk.yellow('\n操作已取消'));
      process.exit(0);
    } else {
      console.error(chalk.red(`\n错误: ${error.message}`));
      process.exit(1);
    }
  }
}

/**
 * 列出所有可用模板
 */
export async function listTemplates() {
  try {
    console.log(chalk.bold.blue('\n📋 可用模板:\n'));

    const templates = await getAvailableTemplates();

    if (templates.length === 0) {
      console.log(chalk.yellow('没有找到可用的模板'));
      return;
    }

    templates.forEach((template, index) => {
      console.log(
        chalk.white(`${index + 1}. `) +
        chalk.cyan(template.name.padEnd(25)) +
        chalk.gray(template.description)
      );
    });

    console.log();
  } catch (error) {
    console.error(chalk.red(`\n错误: ${error.message}`));
    process.exit(1);
  }
}
