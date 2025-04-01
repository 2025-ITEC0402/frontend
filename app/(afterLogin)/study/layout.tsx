import { ChapterSidebar } from '@/src/features/study/ui/ChapterSidebar';
import { ReactNode } from 'react';

export default function StudyLayout({ children }: { children: ReactNode }) {
  return (
    <div className='mx-auto flex min-h-screen max-w-7xl pt-8'>
      <div className='pt-6'>
        <ChapterSidebar />
      </div>
      <main className='ml-8 flex-1 p-6'>{children}</main>
    </div>
  );
}
