// 存储 key
export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER_INFO: 'userInfo',
  THEME: 'theme',
  LOCALE: 'locale'
} as const;

// 请求状态码
export const HTTP_STATUS = {
  SUCCESS: 200,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500
} as const;

// 分页默认配置
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: ['10', '20', '50', '100']
} as const;

// 日期格式
export const DATE_FORMAT = {
  DATE: 'YYYY-MM-DD',
  TIME: 'HH:mm:ss',
  DATETIME: 'YYYY-MM-DD HH:mm:ss',
  DATETIME_SHORT: 'YYYY-MM-DD HH:mm',
  MONTH: 'YYYY-MM'
} as const;

// 正则表达式
export const REGEX = {
  /** 手机号 */
  PHONE: /^1[3-9]\d{9}$/,
  /** 邮箱 */
  EMAIL: /^[\w.-]+@[\w.-]+\.\w+$/,
  /** 身份证号 */
  ID_CARD: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
  /** 密码：6-20位，必须包含字母和数字 */
  PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,20}$/,
  /** 用户名：4-16位，字母数字下划线 */
  USERNAME: /^[a-zA-Z0-9_]{4,16}$/,
  /** URL */
  URL: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
  /** IPv4 */
  IPV4: /^((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$/
} as const;

// 文件类型
export const FILE_TYPES = {
  IMAGE: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  DOCUMENT: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ],
  EXCEL: [
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ]
} as const;

// 文件大小限制（字节）
export const FILE_SIZE_LIMIT = {
  IMAGE: 5 * 1024 * 1024, // 5MB
  DOCUMENT: 20 * 1024 * 1024, // 20MB
  EXCEL: 10 * 1024 * 1024 // 10MB
} as const;

// 通用状态
export const COMMON_STATUS = {
  ENABLE: 1,
  DISABLE: 0
} as const;

export const COMMON_STATUS_OPTIONS = [
  { label: '启用', value: COMMON_STATUS.ENABLE },
  { label: '禁用', value: COMMON_STATUS.DISABLE }
] as const;
