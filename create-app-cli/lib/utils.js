import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import chalk from 'chalk';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * 获取模板根目录
 * @returns {string}
 */
export function getTemplateRoot() {
  // create-app-cli/lib -> create-app-cli -> template
  return path.resolve(__dirname, '../../');
}

/**
 * 获取可用的模板列表
 * @returns {Promise<Array<{name: string, path: string, description: string}>>}
 */
export async function getAvailableTemplates() {
  const templateRoot = getTemplateRoot();
  
  const templates = [
    {
      name: 'vit6+vue3',
      path: path.join(templateRoot, 'vit6+vue3'),
      description: 'Vite 6 + Vue 3 + Vant (移动端)'
    },
    {
      name: 'vite6+react19',
      path: path.join(templateRoot, 'vite6+react19'),
      description: 'Vite 6 + React 19 + Ant Design'
    },
    {
      name: 'vite6+react19+ts5',
      path: path.join(templateRoot, 'vite6+react19+ts5'),
      description: 'Vite 6 + React 19 + TypeScript 5 + Ant Design'
    },
    {
      name: 'vite6+vue3+ts5',
      path: path.join(templateRoot, 'vite6+vue3+ts5'),
      description: 'Vite 6 + Vue 3 + TypeScript 5 + Ant Design Vue'
    },
    {
      name: 'wxt+vue3',
      path: path.join(templateRoot, 'wxt+vue3'),
      description: 'WXT + Vue 3 (浏览器扩展)'
    }
  ];

  // 验证所有模板是否存在
  const validTemplates = [];
  for (const template of templates) {
    try {
      const exists = await fs.pathExists(template.path);
      if (exists) {
        validTemplates.push(template);
      }
    } catch (error) {
      // 忽略无法访问的模板
      console.warn(chalk.yellow(`警告: 无法访问模板 ${template.name}`));
    }
  }

  return validTemplates;
}

/**
 * 复制目录，排除特定文件
 * @param {string} src - 源目录
 * @param {string} dest - 目标目录
 * @param {Array<string>} excludes - 要排除的文件/目录名
 */
export async function copyDirectory(src, dest, excludes = []) {
  try {
    await fs.ensureDir(dest);
    const entries = await fs.readdir(src, { withFileTypes: true });

    for (const entry of entries) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);

      // 跳过排除的文件
      if (excludes.includes(entry.name)) {
        continue;
      }

      if (entry.isDirectory()) {
        await copyDirectory(srcPath, destPath, excludes);
      } else {
        await fs.copy(srcPath, destPath);
      }
    }
  } catch (error) {
    throw new Error(`复制目录失败: ${error.message}`);
  }
}

/**
 * 更新 package.json 中的项目名称
 * @param {string} packageJsonPath - package.json 路径
 * @param {string} projectName - 新项目名称
 */
export async function updatePackageJson(packageJsonPath, projectName) {
  try {
    const packageJson = await fs.readJson(packageJsonPath);
    packageJson.name = projectName;
    packageJson.version = '0.0.0';
    await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
  } catch (error) {
    throw new Error(`更新 package.json 失败: ${error.message}`);
  }
}

/**
 * 安全地删除目录
 * @param {string} dirPath - 目录路径
 */
export async function safeRemoveDir(dirPath) {
  try {
    const exists = await fs.pathExists(dirPath);
    if (exists) {
      await fs.remove(dirPath);
    }
  } catch (error) {
    console.error(chalk.red(`删除目录失败: ${error.message}`));
  }
}

/**
 * 格式化文件大小
 * @param {number} bytes - 字节数
 * @returns {string}
 */
export function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

/**
 * 获取包管理器
 * @returns {string} npm, yarn, 或 pnpm
 */
export function getPackageManager() {
  const userAgent = process.env.npm_config_user_agent;
  if (userAgent) {
    if (userAgent.includes('pnpm')) return 'pnpm';
    if (userAgent.includes('yarn')) return 'yarn';
  }
  return 'npm';
}

/**
 * 清理路径，确保安全
 * @param {string} inputPath - 输入路径
 * @returns {string}
 */
export function sanitizePath(inputPath) {
  // 移除危险字符
  return inputPath.replace(/[<>:"|?*]/g, '');
}

/**
 * 检查是否在 Git 仓库中
 * @param {string} cwd - 当前工作目录
 * @returns {Promise<boolean>}
 */
export async function isInGitRepository(cwd) {
  try {
    const gitDir = path.join(cwd, '.git');
    return await fs.pathExists(gitDir);
  } catch {
    return false;
  }
}
