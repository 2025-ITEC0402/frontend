import Navbar from '@/src/app/layouts/Navbar';
import RefreshTokenProvider from '@/src/shared/provider/RefreshTokenProvider';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Main',
  description: '메인 페이지',
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
