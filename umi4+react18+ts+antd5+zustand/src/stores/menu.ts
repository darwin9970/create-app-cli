import { MenuItem } from '@/services/menu';
import { create } from 'zustand';

interface MenuState {
  /** 动态菜单数据 */
  menus: MenuItem[];
  /** 是否已加载 */
  loaded: boolean;
}

interface MenuActions {
  setMenus: (menus: MenuItem[]) => void;
  clearMenus: () => void;
}

type MenuStore = MenuState & MenuActions;

export const useMenuStore = create<MenuStore>()((set) => ({
  menus: [],
  loaded: false,
  setMenus: (menus) => set({ menus, loaded: true }),
  clearMenus: () => set({ menus: [], loaded: false })
}));
