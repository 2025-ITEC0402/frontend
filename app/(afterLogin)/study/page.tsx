'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/src/shared/ui/card';

export default function ChapterPage() {
  return (
    <div className='flex min-h-screen w-full items-center justify-center'>
      <Card className='border-muted bg-muted/40 min-h-[100vh] w-full max-w-5xl shadow-md'>
        <div className='flex h-full flex-col items-center justify-center px-6 py-12'>
          <CardHeader className='w-full items-center'>
            <CardTitle className='text-center text-xl'>
              좌측에서 원하는 단원을 선택해주세요.
            </CardTitle>
          </CardHeader>
          <br />
          <CardContent className='text-muted-foreground flex flex-col items-center justify-center gap-2 text-center text-sm'>
            <p>해당 단원의 공학수학 개념이 이곳에 표시됩니다.</p>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}
