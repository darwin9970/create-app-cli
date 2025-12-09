import { STORAGE_KEYS } from '@/constants';
import { UserInfo } from '@/services';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  userInfo: UserInfo | null;
}

interface UserActions {
  setUserInfo: (userInfo: UserInfo | null) => void;
  clearUser: () => void;
}

type UserStore = UserState & UserActions;

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      userInfo: null,
      setUserInfo: (userInfo) => {
        set({ userInfo });
        // 同步 token 到 localStorage（用于请求拦截器）
        if (userInfo?.token) {
          localStorage.setItem(STORAGE_KEYS.TOKEN, userInfo.token);
        } else {
          localStorage.removeItem(STORAGE_KEYS.TOKEN);
        }
      },
      clearUser: () => {
        set({ userInfo: null });
        localStorage.removeItem(STORAGE_KEYS.TOKEN);
      }
    }),
    {
      name: STORAGE_KEYS.USER_INFO
    }
  )
);
