import fs from 'fs-extra';
import path from 'path';
import validatePackageName from 'validate-npm-package-name';

/**
 * 验证项目名称是否合法
 * @param {string} name - 项目名称
 * @returns {{valid: boolean, error?: string}}
 */
export function validateProjectName(name) {
  if (!name || typeof name !== 'string') {
    return {
      valid: false,
      error: '项目名称不能为空'
    };
  }

  // 去除首尾空格
  const trimmedName = name.trim();

  if (trimmedName.length === 0) {
    return {
      valid: false,
      error: '项目名称不能为空'
    };
  }

  // 验证是否为有效的 npm 包名
  const result = validatePackageName(trimmedName);

  if (!result.validForNewPackages) {
    const errors = [...(result.errors || []), ...(result.warnings || [])];
    return {
      valid: false,
      error: `无效的项目名称: ${errors.join(', ')}`
    };
  }

  return { valid: true };
}

/**
 * 验证目标路径是否可用
 * @param {string} targetPath - 目标路径
 * @returns {{valid: boolean, error?: string, isEmpty?: boolean}}
 */
export async function validateTargetPath(targetPath) {
  try {
    const exists = await fs.pathExists(targetPath);

    if (!exists) {
      return { valid: true, isEmpty: false };
    }

    // 检查是否为目录
    const stats = await fs.stat(targetPath);
    if (!stats.isDirectory()) {
      return {
        valid: false,
        error: '目标路径已存在且不是一个目录'
      };
    }

    // 检查目录是否为空
    const files = await fs.readdir(targetPath);
    const isEmpty = files.length === 0;

    return {
      valid: true,
      isEmpty
    };
  } catch (error) {
    return {
      valid: false,
      error: `无法访问目标路径: ${error.message}`
    };
  }
}

/**
 * 验证模板路径是否存在
 * @param {string} templatePath - 模板路径
 * @returns {{valid: boolean, error?: string}}
 */
export async function validateTemplatePath(templatePath) {
  try {
    const exists = await fs.pathExists(templatePath);

    if (!exists) {
      return {
        valid: false,
        error: `模板路径不存在: ${templatePath}`
      };
    }

    const stats = await fs.stat(templatePath);
    if (!stats.isDirectory()) {
      return {
        valid: false,
        error: '模板路径必须是一个目录'
      };
    }

    // 检查是否包含 package.json
    const packageJsonPath = path.join(templatePath, 'package.json');
    const hasPackageJson = await fs.pathExists(packageJsonPath);

    if (!hasPackageJson) {
      return {
        valid: false,
        error: '模板目录缺少 package.json 文件'
      };
    }

    return { valid: true };
  } catch (error) {
    return {
      valid: false,
      error: `验证模板路径时出错: ${error.message}`
    };
  }
}

/**
 * 验证命令是否可用
 * @param {string} command - 命令名称
 * @returns {boolean}
 */
export function isCommandAvailable(command) {
  try {
    const { execSync } = require('child_process');
    execSync(`which ${command}`, { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}
