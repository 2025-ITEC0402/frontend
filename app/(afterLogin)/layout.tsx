import Navbar from '@/src/app/layouts/Navbar';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '단원 학습',
  description: '단원 학습 페이지',
}

export default function AfterLoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}
