'use client';

import { useDarkMode } from '@/src/widgets/theme-toggle/model/store';
import ThemeToggleButton from '@/src/widgets/theme-toggle/ui/themeToggleButton';

export default function Home() {
  const darkMode = useDarkMode();

  return (
    <>
      <ThemeToggleButton />
    </>
  );
}
