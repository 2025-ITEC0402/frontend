import Navbar from '@/src/app/layouts/Navbar';
import RefreshTokenProvider from '@/src/shared/provider/RefreshTokenProvider';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI 학습 플랫폼 | 대시보드',
  description: '문제 풀이 현황, 스트릭, 추천 문제 등 학습 현황을 한눈에 확인하세요.',
};

export default function AfterLoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <RefreshTokenProvider />
      <Navbar />
      {children}
    </>
  );
}
