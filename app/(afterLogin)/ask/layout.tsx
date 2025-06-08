import { AskSidebar } from '@/src/features/ask/ui/AskSidebar';
import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'AI 학습 플랫폼 | AI 튜터',
  description: '궁금한 내용을 AI에게 질문하고, 이전 질문 기록도 확인해보세요.',
};

export default function AskLayout({ children }: { children: ReactNode }) {
  return (
    <div className='bg-background flex h-[calc(100vh-4rem)] w-full justify-center'>
      <div className='flex w-full max-w-7xl min-w-0'>
        <AskSidebar />
        <main className='min-w-0 flex-1 overflow-hidden'>{children}</main>
      </div>
    </div>
  );
}
