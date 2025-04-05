import { ChapterSidebar } from '@/src/features/study/ui/ChapterSidebar';
import { ReactNode } from 'react';

export default function StudyLayout({ children }: { children: ReactNode }) {
  return (
    <div className='relative mx-auto flex min-h-screen max-w-7xl pt-8'>
      <div className='sticky h-fit top-1/2 -translate-y-1/2'>
        <ChapterSidebar />
      </div>
      <main className='ml-8 flex-1'>{children}</main>
    </div>
  );
}
