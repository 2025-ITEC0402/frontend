import { Card, CardContent, CardHeader, CardTitle } from '@/src/shared/ui/card';

export default function StudyDefaultPage() {
  return (
    <div className='flex min-h-screen w-full items-center justify-center'>
      <Card className='border-muted bg-muted/40 min-h-[200vh] w-full max-w-5xl shadow-md'>
        <div className='flex h-full flex-col items-center justify-center px-6 py-12'>
          <CardHeader className='w-full items-center'>
            <CardTitle className='text-center text-xl'>단원을 선택해주세요!</CardTitle>
          </CardHeader>
          <br />
          <CardContent className='text-muted-foreground flex flex-col items-center justify-center gap-2 text-center text-sm'>
            <p>왼쪽 목차에서 학습할 단원을 선택하면,</p>
            <p>해당 단원의 공학수학 개념이 이곳에 표시됩니다.</p>
            <p>궁금한 개념이나 이해가 필요한 주제를 선택해보세요 ✨</p>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}
