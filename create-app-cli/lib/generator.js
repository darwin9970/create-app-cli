import fs from 'fs-extra';
import path from 'path';
import { execSync } from 'child_process';
import chalk from 'chalk';
import ora from 'ora';
import {
  getTemplateRoot,
  copyDirectory,
  updatePackageJson,
  safeRemoveDir,
  getPackageManager,
  isInGitRepository
} from './utils.js';
import {
  validateProjectName,
  validateTargetPath,
  validateTemplatePath
} from './validator.js';
import { confirmOverwrite, confirmContinue } from './prompts.js';

export class Generator {
  constructor(projectName, templateName, options = {}) {
    this.projectName = projectName;
    this.templateName = templateName;
    this.options = {
      installDeps: options.installDeps !== false,
      initGit: options.initGit !== false,
      cwd: options.cwd || process.cwd()
    };
    this.targetPath = path.join(this.options.cwd, projectName);
    this.templatePath = path.join(getTemplateRoot(), templateName);
  }

  /**
   * 验证所有输入
   */
  async validate() {
    const spinner = ora('验证项目配置...').start();

    try {
      // 验证项目名称
      const nameValidation = validateProjectName(this.projectName);
      if (!nameValidation.valid) {
        spinner.fail('项目名称验证失败');
        throw new Error(nameValidation.error);
      }

      // 验证模板路径
      const templateValidation = await validateTemplatePath(this.templatePath);
      if (!templateValidation.valid) {
        spinner.fail('模板验证失败');
        throw new Error(templateValidation.error);
      }

      // 验证目标路径
      const pathValidation = await validateTargetPath(this.targetPath);
      if (!pathValidation.valid) {
        spinner.fail('目标路径验证失败');
        throw new Error(pathValidation.error);
      }

      // 如果目录存在且不为空，询问用户
      if (pathValidation.isEmpty === false) {
        spinner.stop();
        const shouldContinue = await confirmContinue(this.projectName);
        if (!shouldContinue) {
          throw new Error('用户取消操作');
        }
        spinner.start('继续创建项目...');
      }

      spinner.succeed('验证通过');
      return true;
    } catch (error) {
      spinner.fail('验证失败');
      throw error;
    }
  }

  /**
   * 复制模板文件
   */
  async copyTemplate() {
    const spinner = ora(`复制模板文件 ${chalk.cyan(this.templateName)}...`).start();

    try {
      // 确保目标目录存在
      await fs.ensureDir(this.targetPath);

      // 排除不需要复制的文件
      const excludes = [
        'node_modules',
        'dist',
        '.git',
        'package-lock.json',
        'yarn.lock',
        'pnpm-lock.yaml',
        '.DS_Store',
        '.output',
        '.wxt'
      ];

      // 复制模板
      await copyDirectory(this.templatePath, this.targetPath, excludes);

      spinner.succeed('模板文件复制成功');
    } catch (error) {
      spinner.fail('复制模板文件失败');
      // 清理失败的目录
      await safeRemoveDir(this.targetPath);
      throw new Error(`复制模板失败: ${error.message}`);
    }
  }

  /**
   * 更新项目配置
   */
  async updateProjectConfig() {
    const spinner = ora('更新项目配置...').start();

    try {
      const packageJsonPath = path.join(this.targetPath, 'package.json');
      await updatePackageJson(packageJsonPath, this.projectName);
      spinner.succeed('项目配置更新成功');
    } catch (error) {
      spinner.fail('更新项目配置失败');
      throw new Error(`更新配置失败: ${error.message}`);
    }
  }

  /**
   * 安装依赖
   */
  async installDependencies() {
    if (!this.options.installDeps) {
      console.log(chalk.yellow('跳过依赖安装'));
      return;
    }

    const packageManager = getPackageManager();
    const spinner = ora(`使用 ${chalk.cyan(packageManager)} 安装依赖...`).start();

    try {
      let installCommand;
      switch (packageManager) {
        case 'yarn':
          installCommand = 'yarn install';
          break;
        case 'pnpm':
          installCommand = 'pnpm install';
          break;
        default:
          installCommand = 'npm install';
      }

      execSync(installCommand, {
        cwd: this.targetPath,
        stdio: 'ignore'
      });

      spinner.succeed('依赖安装成功');
    } catch (error) {
      spinner.fail('依赖安装失败');
      console.log(chalk.yellow('\n您可以稍后手动安装依赖:'));
      console.log(chalk.cyan(`  cd ${this.projectName}`));
      console.log(chalk.cyan(`  npm install`));
    }
  }

  /**
   * 初始化 Git 仓库
   */
  async initGitRepository() {
    if (!this.options.initGit) {
      console.log(chalk.yellow('跳过 Git 初始化'));
      return;
    }

    const spinner = ora('初始化 Git 仓库...').start();

    try {
      // 检查是否已经在 Git 仓库中
      const inGitRepo = await isInGitRepository(this.targetPath);
      if (inGitRepo) {
        spinner.info('目录已经是 Git 仓库');
        return;
      }

      // 初始化 Git
      execSync('git init', {
        cwd: this.targetPath,
        stdio: 'ignore'
      });

      // 创建 .gitignore（如果模板中没有）
      const gitignorePath = path.join(this.targetPath, '.gitignore');
      const hasGitignore = await fs.pathExists(gitignorePath);
      
      if (!hasGitignore) {
        const defaultGitignore = `node_modules/
dist/
.DS_Store
*.log
.env.local
.env.*.local
`;
        await fs.writeFile(gitignorePath, defaultGitignore);
      }

      // 添加初始提交
      try {
        execSync('git add -A', { cwd: this.targetPath, stdio: 'ignore' });
        execSync('git commit -m "Initial commit from create-app-cli"', {
          cwd: this.targetPath,
          stdio: 'ignore'
        });
        spinner.succeed('Git 仓库初始化成功');
      } catch {
        spinner.warn('Git 仓库已初始化，但未创建初始提交');
      }
    } catch (error) {
      spinner.fail('Git 初始化失败');
      console.log(chalk.yellow('\n您可以稍后手动初始化 Git:'));
      console.log(chalk.cyan(`  cd ${this.projectName}`));
      console.log(chalk.cyan(`  git init`));
    }
  }

  /**
   * 生成项目
   */
  async generate() {
    try {
      console.log();
      console.log(chalk.bold.blue('🚀 开始创建项目...\n'));

      // 验证
      await this.validate();

      // 复制模板
      await this.copyTemplate();

      // 更新配置
      await this.updateProjectConfig();

      // 安装依赖
      await this.installDependencies();

      // 初始化 Git
      await this.initGitRepository();

      // 成功提示
      this.printSuccessMessage();

      return true;
    } catch (error) {
      console.error(chalk.red(`\n❌ 创建项目失败: ${error.message}\n`));
      
      // 如果是用户取消，不显示错误堆栈
      if (error.message !== '用户取消操作') {
        console.error(chalk.gray(error.stack));
      }
      
      return false;
    }
  }

  /**
   * 打印成功消息
   */
  printSuccessMessage() {
    console.log();
    console.log(chalk.bold.green('✨ 项目创建成功!\n'));
    console.log(chalk.cyan('下一步操作:\n'));
    console.log(chalk.white(`  cd ${this.projectName}`));
    
    if (!this.options.installDeps) {
      const packageManager = getPackageManager();
      console.log(chalk.white(`  ${packageManager} install`));
    }
    
    console.log(chalk.white(`  npm run dev`));
    console.log();
    console.log(chalk.gray('Happy coding! 🎉\n'));
  }
}
