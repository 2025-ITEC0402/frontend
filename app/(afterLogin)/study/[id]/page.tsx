'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/src/shared/ui/card';
import { useParams } from 'next/navigation';

export default function ChapterPage() {
  const params = useParams();
  const chapterId = params.id;

  return (
    <div className='flex min-h-screen w-full items-center justify-center'>
      <Card className='border-muted bg-muted/40 min-h-[200vh] w-full max-w-5xl shadow-md'>
        <div className='flex h-full flex-col items-center justify-center px-6 py-12'>
          <CardHeader className='w-full items-center'>
            <CardTitle className='text-center text-xl'>
              📘 Chapter {chapterId}
            </CardTitle>
          </CardHeader>
          <br />
          <CardContent className='text-muted-foreground flex flex-col items-center justify-center gap-2 text-center text-sm'>
            <p>Chapter {chapterId}의 내용</p>
            <p>해당 단원의 공학수학 개념이 이곳에 표시됩니다.</p>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}
