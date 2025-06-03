import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'AI 학습 플랫폼 | 연습 문제',
  description: '다양한 난이도의 문제를 직접 풀고 AI의 해설을 통해 복습할 수 있습니다.',
};

export default function PracticeLayout({ children }: { children: ReactNode }) {
  return <div className='bg-background min-h-[90vh] w-full'>{children}</div>;
}
