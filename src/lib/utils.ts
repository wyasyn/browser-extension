import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useThemeStore, type Theme } from "@/store/theme-store";

// Helper function to apply theme to DOM and update actualTheme
export const applyTheme = (theme: Theme) => {
  const root = window.document.documentElement;
  root.classList.remove("light", "dark");

  let actualTheme: Theme;

  if (theme === "system") {
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    root.classList.add(systemTheme);
    actualTheme = systemTheme;
  } else {
    root.classList.add(theme);
    actualTheme = theme;
  }

  // Update the actualTheme in store
  useThemeStore.setState({ actualTheme });
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
