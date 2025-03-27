'use client';

import darkLogo from '@/public/images/darkLogo.png';
import lightLogo from '@/public/images/lightLogo.png';
import { ThemeToggleButton } from '@/src/widgets/theme-toggle';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
  { label: '개념 학습', href: '/study' },
  { label: '연습 문제', href: '/practice' },
  { label: '질문하기', href: '/ask' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className='w-full border-b border-dashed border-gray-300 bg-white dark:border-gray-700 dark:bg-[var(--background)]'>
      <div className='mx-auto flex h-16 max-w-7xl items-center justify-between px-4'>
        <div className='flex items-center gap-2'>
          <Link href='/' className='transition-transform duration-200 ease-in-out hover:scale-110'>
            <Image
              src={lightLogo}
              alt='Light Logo'
              width={32}
              height={32}
              className='block dark:hidden'
            />
            <Image
              src={darkLogo}
              alt='Dark Logo'
              width={32}
              height={32}
              className='hidden dark:block'
            />
          </Link>
        </div>

        <div className='flex items-center gap-8'>
          {menuItems.map(({ label, href }) => {
            const isActive = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={clsx(
                  'text-sm transition-all duration-200 ease-in-out',
                  isActive
                    ? 'font-semibold text-black dark:text-white'
                    : 'text-gray-400 hover:scale-[1.05] hover:font-medium hover:text-black dark:text-gray-500 dark:hover:text-white',
                )}
              >
                {label}
              </Link>
            );
          })}
          <ThemeToggleButton />
        </div>
      </div>
    </nav>
  );
}
