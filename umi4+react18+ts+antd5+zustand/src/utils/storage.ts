/**
 * 类型安全的 Storage 封装
 */

type StorageType = 'local' | 'session';

interface StorageOptions {
  /** 存储类型，默认 localStorage */
  type?: StorageType;
  /** 过期时间（毫秒），不设置则永不过期 */
  expire?: number;
}

interface StorageData<T> {
  value: T;
  /** 过期时间戳 */
  expire?: number;
}

const getStorageInstance = (type: StorageType): Storage => {
  return type === 'session' ? sessionStorage : localStorage;
};

/**
 * 存储数据
 */
export function setStorage<T>(
  key: string,
  value: T,
  options: StorageOptions = {}
): void {
  const { type = 'local', expire } = options;
  const storage = getStorageInstance(type);

  const data: StorageData<T> = {
    value,
    expire: expire ? Date.now() + expire : undefined
  };

  try {
    storage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Storage setItem error for key "${key}":`, error);
  }
}

/**
 * 获取数据
 */
export function getStorage<T>(
  key: string,
  options: StorageOptions = {}
): T | null {
  const { type = 'local' } = options;
  const storage = getStorageInstance(type);

  try {
    const item = storage.getItem(key);
    if (!item) return null;

    const data: StorageData<T> = JSON.parse(item);

    // 检查是否过期
    if (data.expire && Date.now() > data.expire) {
      storage.removeItem(key);
      return null;
    }

    return data.value;
  } catch (error) {
    console.error(`Storage getItem error for key "${key}":`, error);
    return null;
  }
}

/**
 * 移除数据
 */
export function removeStorage(key: string, options: StorageOptions = {}): void {
  const { type = 'local' } = options;
  const storage = getStorageInstance(type);
  storage.removeItem(key);
}

/**
 * 清空存储
 */
export function clearStorage(options: StorageOptions = {}): void {
  const { type = 'local' } = options;
  const storage = getStorageInstance(type);
  storage.clear();
}

/**
 * 便捷方法：localStorage
 */
export const local = {
  get: <T>(key: string) => getStorage<T>(key, { type: 'local' }),
  set: <T>(key: string, value: T, expire?: number) =>
    setStorage(key, value, { type: 'local', expire }),
  remove: (key: string) => removeStorage(key, { type: 'local' }),
  clear: () => clearStorage({ type: 'local' })
};

/**
 * 便捷方法：sessionStorage
 */
export const session = {
  get: <T>(key: string) => getStorage<T>(key, { type: 'session' }),
  set: <T>(key: string, value: T, expire?: number) =>
    setStorage(key, value, { type: 'session', expire }),
  remove: (key: string) => removeStorage(key, { type: 'session' }),
  clear: () => clearStorage({ type: 'session' })
};
