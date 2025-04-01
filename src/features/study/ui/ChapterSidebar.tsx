'use client';

import { ScrollArea } from '@/src/shared/ui/scroll-area';
import { Separator } from '@/src/shared/ui/separator';
import Link from 'next/link';
import * as React from 'react';

const chapters = Array.from({ length: 25 }).map((_, i) => ({
  label: `Chapter ${i + 1}`,
  href: `/study/${i + 1}`,
}));

export function ChapterSidebar() {
  return (
    <ScrollArea className='h-180 w-40 rounded-md border'>
      <div className='p-4 text-center'>
        <h4 className='mb-6 text-sm leading-none font-medium'>목차</h4>
        {chapters.map((chapter) => (
          <React.Fragment key={chapter.label}>
            <Link
              href={chapter.href}
              className='text-muted-foreground hover:text-foreground block text-sm transition-colors'
            >
              {chapter.label}
            </Link>
            <Separator className='my-2' />
          </React.Fragment>
        ))}
      </div>
    </ScrollArea>
  );
}
