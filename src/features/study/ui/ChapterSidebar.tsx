'use client';

import { chapters } from '@/src/shared/types/chapters';
import { usePathname, useRouter } from 'next/navigation';

export function ChapterSidebar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <nav className='bg-muted/40 w-72 rounded-xl border p-4'>
      <ul className='flex flex-col gap-2'>
        {chapters.map((ch) => (
          <li key={ch.chapterId}>
            <button
              className={`w-full rounded-lg px-4 py-2 text-left font-semibold transition ${
                pathname.endsWith(`/study/${ch.chapterId}`)
                  ? 'bg-primary/10 text-primary'
                  : 'hover:bg-primary/5 text-gray-700 dark:text-gray-200'
              }`}
              onClick={() => router.push(`/study/${ch.chapterId}`)}
            >
              {ch.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
