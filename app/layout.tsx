import QueryProvider from '@/src/shared/provider/QueryProvider';
import ThemeProvider from '@/src/shared/provider/ThemeProvider';
import SonnerToaster from '@/src/shared/ui/sonner-toaster';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'EMA',
  description: '공업수학 AI 학습 플랫폼',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ko'>
      <body className={`antialiased`}>
        <ThemeProvider>
          <QueryProvider>
            {children}
            <SonnerToaster />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
