'use client';

import { useToggleDarkMode } from '@/src/widgets/theme-toggle';

const ThemeToggleButton = () => {
  const toggleDarkMode = useToggleDarkMode();

  return (
    <svg
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      className="transition hover:scale-125 dark:fill-slate-300 dark:hover:fill-slate-100"
      onClick={toggleDarkMode}
    >
      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM12 20.5V3.5C16.6944 3.5 20.5 7.30558 20.5 12C20.5 16.6944 16.6944 20.5 12 20.5Z" />
    </svg>
  );
};

export default ThemeToggleButton;
