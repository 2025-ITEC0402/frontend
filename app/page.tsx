'use client';

import { ThemeToggleButton, useDarkMode } from '@/src/widgets/theme-toggle';

export default function Home() {
  const darkMode = useDarkMode();

  return (
    <>
      <ThemeToggleButton />
    </>
  );
}
