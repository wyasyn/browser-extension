import { applyTheme } from "@/lib/utils";
import { useThemeStore } from "@/store/theme-store";
import { useEffect } from "react";

export const useTheme = () => {
  const { theme, setTheme, actualTheme, initializeTheme } = useThemeStore();

  useEffect(() => {
    initializeTheme();

    // Listen for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if (useThemeStore.getState().theme === "system") {
        applyTheme("system");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [initializeTheme]);

  return { theme, setTheme, actualTheme };
};
