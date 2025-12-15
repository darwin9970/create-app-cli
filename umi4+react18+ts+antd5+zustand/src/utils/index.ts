/**
 * 工具函数统一导出
 */

// Storage 工具
export {
  clearStorage,
  getStorage,
  local,
  removeStorage,
  session,
  setStorage
} from './storage';

// 格式化工具
export {
  formatDate,
  formatFileSize,
  formatMoney,
  formatNumber,
  formatPercent,
  formatRelativeTime,
  maskEmail,
  maskIdCard,
  maskPhone,
  truncate
} from './format';

// 请求工具
export { default as request, requestConfig } from './request';
