/**
 * 格式化工具函数
 */

/**
 * 日期格式化
 * @param date 日期对象、时间戳或日期字符串
 * @param format 格式化模板，默认 'YYYY-MM-DD HH:mm:ss'
 */
export function formatDate(
  date: Date | number | string | undefined | null,
  format: string = 'YYYY-MM-DD HH:mm:ss'
): string {
  if (!date) return '-';

  const d = new Date(date);
  if (isNaN(d.getTime())) return '-';

  const padZero = (n: number): string => n.toString().padStart(2, '0');

  const year = d.getFullYear();
  const month = padZero(d.getMonth() + 1);
  const day = padZero(d.getDate());
  const hours = padZero(d.getHours());
  const minutes = padZero(d.getMinutes());
  const seconds = padZero(d.getSeconds());

  return format
    .replace('YYYY', year.toString())
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds);
}

/**
 * 相对时间格式化
 * @param date 日期
 */
export function formatRelativeTime(date: Date | number | string): string {
  const d = new Date(date);
  if (isNaN(d.getTime())) return '-';

  const now = Date.now();
  const diff = now - d.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return '刚刚';
  if (minutes < 60) return `${minutes}分钟前`;
  if (hours < 24) return `${hours}小时前`;
  if (days < 30) return `${days}天前`;

  return formatDate(d, 'YYYY-MM-DD');
}

/**
 * 数字格式化（千分位）
 * @param num 数字
 * @param decimals 小数位数，默认 2
 */
export function formatNumber(
  num: number | string | undefined | null,
  decimals: number = 2
): string {
  if (num === null || num === undefined || num === '') return '-';

  const n = typeof num === 'string' ? parseFloat(num) : num;
  if (isNaN(n)) return '-';

  return n.toLocaleString('zh-CN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
}

/**
 * 金额格式化
 * @param amount 金额
 * @param prefix 前缀，默认 '¥'
 */
export function formatMoney(
  amount: number | string | undefined | null,
  prefix: string = '¥'
): string {
  if (amount === null || amount === undefined || amount === '') return '-';

  const n = typeof amount === 'string' ? parseFloat(amount) : amount;
  if (isNaN(n)) return '-';

  return `${prefix}${formatNumber(n, 2)}`;
}

/**
 * 百分比格式化
 * @param value 数值（0-1 或 0-100）
 * @param isDecimal 是否为小数形式（0-1），默认 true
 * @param decimals 小数位数，默认 2
 */
export function formatPercent(
  value: number | undefined | null,
  isDecimal: boolean = true,
  decimals: number = 2
): string {
  if (value === null || value === undefined) return '-';

  const percent = isDecimal ? value * 100 : value;
  return `${percent.toFixed(decimals)}%`;
}

/**
 * 文件大小格式化
 * @param bytes 字节数
 */
export function formatFileSize(bytes: number | undefined | null): string {
  if (bytes === null || bytes === undefined || bytes < 0) return '-';

  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let unitIndex = 0;
  let size = bytes;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(2)} ${units[unitIndex]}`;
}

/**
 * 手机号脱敏
 * @param phone 手机号
 */
export function maskPhone(phone: string | undefined | null): string {
  if (!phone) return '-';
  return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
}

/**
 * 身份证号脱敏
 * @param idCard 身份证号
 */
export function maskIdCard(idCard: string | undefined | null): string {
  if (!idCard) return '-';
  return idCard.replace(/(\d{6})\d{8}(\d{4})/, '$1********$2');
}

/**
 * 邮箱脱敏
 * @param email 邮箱地址
 */
export function maskEmail(email: string | undefined | null): string {
  if (!email) return '-';
  const [name, domain] = email.split('@');
  if (!domain) return email;
  const maskedName =
    name.length > 2 ? `${name[0]}***${name[name.length - 1]}` : '***';
  return `${maskedName}@${domain}`;
}

/**
 * 字符串截断
 * @param str 字符串
 * @param maxLength 最大长度
 * @param suffix 截断后缀，默认 '...'
 */
export function truncate(
  str: string | undefined | null,
  maxLength: number,
  suffix: string = '...'
): string {
  if (!str) return '-';
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - suffix.length) + suffix;
}
