import type { Metadata } from 'next';
import { ReactNode } from 'react';

import { ChapterSidebar } from '@/src/features/study/ui/ChapterSidebar';

export const metadata: Metadata = {
  title: 'AI 학습 플랫폼 | 개념 학습',
  description: '공업수학 주요 개념들을 문장 단위로 학습하고, AI 해설을 통해 이해도를 높이세요.',
};

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
