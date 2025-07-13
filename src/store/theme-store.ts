import { applyTheme } from "@/lib/utils";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Theme = "dark" | "light" | "system";

export interface ThemeStore {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  actualTheme: Theme;
  initializeTheme: () => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      theme: "system",
      actualTheme: "light",
      setTheme: (theme: Theme) => {
        set({ theme });
        applyTheme(theme);
      },
      initializeTheme: () => {
        const { theme } = get();
        applyTheme(theme);
      },
    }),
    {
      name: "vite-ui-theme",
      partialize: (state) => ({ theme: state.theme }),
    }
  )
);
