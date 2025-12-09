import { create } from 'zustand';

interface AppState {
  collapsed: boolean;
}

interface AppActions {
  setCollapsed: (collapsed: boolean) => void;
  toggleCollapsed: () => void;
}

type AppStore = AppState & AppActions;

export const useAppStore = create<AppStore>()((set) => ({
  collapsed: false,
  setCollapsed: (collapsed) => set({ collapsed }),
  toggleCollapsed: () => set((state) => ({ collapsed: !state.collapsed }))
}));
