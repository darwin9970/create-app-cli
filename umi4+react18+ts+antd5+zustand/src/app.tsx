// 运行时配置
import { useUserStore } from '@/stores';
import { requestConfig } from '@/utils/request';
import { UserInfo } from './services';

export interface InitialState {
  userInfo?: UserInfo | null;
}

/**
 * 全局初始化数据配置
 * @see https://umijs.org/docs/api/runtime-config#getinitialstate
 */
export async function getInitialState(): Promise<InitialState> {
  // 使用 Zustand store 的 getState 方法获取当前状态
  return { userInfo: useUserStore.getState().userInfo };
}

// 请求配置
export const request = requestConfig;
