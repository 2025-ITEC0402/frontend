'use client';

import lightLogo from '@/public/images/lightLogo.png';
import { ThemeToggleButton } from '@/src/widgets/theme-toggle';
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
    <nav className='w-full border-b border-dashed border-gray-300 bg-white'>
      <div className='mx-auto flex h-12 max-w-7xl items-center justify-between px-4'>
        <div className='flex items-center gap-2'>
          <Image src={lightLogo} alt='logo' width={32} height={32} />
        </div>

        {/* 메뉴 영역 */}
        <div className='flex items-center gap-8'>
          {menuItems.map(({ label, href }) => {
            const isActive = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`text-sm ${isActive ? 'font-bold text-black' : 'text-gray-400'}`}
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
