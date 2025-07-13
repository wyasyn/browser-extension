import { create } from "zustand";
import { persist } from "zustand/middleware";
import extensionsData from "../data/extensions.json";

// Types and interfaces
export interface Extension {
  id: string;
  logo: string;
  name: string;
  description: string;
  isActive: boolean;
}

export interface ExtensionInput {
  id?: string;
  logo: string;
  name: string;
  description: string;
  isActive: boolean;
}

export interface ExtensionStats {
  total: number;
  active: number;
  inactive: number;
}

export const FILTER_TYPES = {
  ALL: "all",
  ACTIVE: "active",
  INACTIVE: "inactive",
} as const;

export type FilterType = (typeof FILTER_TYPES)[keyof typeof FILTER_TYPES];

interface ExtensionsState {
  extensions: Extension[];
  filter: FilterType;
}

interface ExtensionsActions {
  toggleExtension: (id: string) => void;
  removeExtension: (id: string) => void;
  setFilter: (filterType: FilterType) => void;
  getFilteredExtensions: () => Extension[];
  getExtensionById: (id: string) => Extension | undefined;
  getActiveExtensions: () => Extension[];
  getInactiveExtensions: () => Extension[];
  getStats: () => ExtensionStats;
  activateAll: () => void;
  deactivateAll: () => void;
  resetExtensions: () => void;
}

export type ExtensionsStore = ExtensionsState & ExtensionsActions;

// Utility functions
const generateId = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
};

// Prepare initial extensions
const initialExtensions: Extension[] = (extensionsData as ExtensionInput[]).map(
  (ext) => ({
    ...ext,
    id: ext.id || generateId(ext.name),
  })
);

// Create the store with persistence
const useExtensionsStore = create<ExtensionsStore>()(
  persist(
    (set, get) => ({
      // State
      extensions: initialExtensions,
      filter: FILTER_TYPES.ALL,

      // Actions
      toggleExtension: (id: string) => {
        set((state) => ({
          extensions: state.extensions.map((ext) =>
            ext.id === id ? { ...ext, isActive: !ext.isActive } : ext
          ),
        }));
      },

      removeExtension: (id: string) => {
        set((state) => ({
          extensions: state.extensions.filter((ext) => ext.id !== id),
        }));
      },

      setFilter: (filterType: FilterType) => {
        set({ filter: filterType });
      },

      getFilteredExtensions: (): Extension[] => {
        const { extensions, filter } = get();

        switch (filter) {
          case FILTER_TYPES.ACTIVE:
            return extensions.filter((ext) => ext.isActive);
          case FILTER_TYPES.INACTIVE:
            return extensions.filter((ext) => !ext.isActive);
          default:
            return extensions;
        }
      },

      getExtensionById: (id: string): Extension | undefined => {
        const { extensions } = get();
        return extensions.find((ext) => ext.id === id);
      },

      getActiveExtensions: (): Extension[] => {
        const { extensions } = get();
        return extensions.filter((ext) => ext.isActive);
      },

      getInactiveExtensions: (): Extension[] => {
        const { extensions } = get();
        return extensions.filter((ext) => !ext.isActive);
      },

      getStats: (): ExtensionStats => {
        const { extensions } = get();
        const total = extensions.length;
        const active = extensions.filter((ext) => ext.isActive).length;
        const inactive = total - active;
        return { total, active, inactive };
      },

      activateAll: () => {
        set((state) => ({
          extensions: state.extensions.map((ext) => ({
            ...ext,
            isActive: true,
          })),
        }));
      },

      deactivateAll: () => {
        set((state) => ({
          extensions: state.extensions.map((ext) => ({
            ...ext,
            isActive: false,
          })),
        }));
      },

      resetExtensions: () => {
        set({
          extensions: initialExtensions,
          filter: FILTER_TYPES.ALL,
        });
      },
    }),
    {
      name: "extensions-storage", // localStorage key
      partialize: (state) => ({
        extensions: state.extensions,
        filter: state.filter,
      }),
    }
  )
);

export default useExtensionsStore;
