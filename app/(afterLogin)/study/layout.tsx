import { ChapterSidebar } from '@/src/features/study/ui/ChapterSidebar';
import { ReactNode } from 'react';

export default function StudyLayout({ children }: { children: ReactNode }) {
  return (
    <div className='relative mx-auto flex min-h-screen max-w-7xl pt-8'>
      <aside className='sticky top-8 h-fit'>
        <ChapterSidebar />
      </aside>
      <main className='ml-8 flex-1'>{children}</main>
    </div>
  );
}
