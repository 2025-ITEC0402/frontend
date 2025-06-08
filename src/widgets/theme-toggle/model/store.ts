import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ToggleState {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const useDarkModeStore = create<ToggleState>()(
  persist(
    (set) => ({
      darkMode: false,
      toggleDarkMode: () =>
        set((state) => {
          const newTheme = !state.darkMode;
          if (typeof window !== 'undefined') {
            localStorage.setItem('dark-mode', JSON.stringify(newTheme));
          }
          return { darkMode: newTheme };
        }),
    }),
    {
      name: 'dark-mode',
    },
  ),
);

export const useDarkMode = () => useDarkModeStore((state) => state.darkMode);
export const useToggleDarkMode = () => useDarkModeStore((state) => state.toggleDarkMode);
