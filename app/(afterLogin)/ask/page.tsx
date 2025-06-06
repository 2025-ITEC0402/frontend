'use client';

import { AskDefaultInput } from '@/src/features/ask/ui/AskDefaultInput';

export default function AskDefaultPage() {
  return (
    <div className='bg-background flex min-h-[calc(100vh-4rem)] w-full items-center justify-center px-8 py-16'>
      <div className='flex w-full max-w-2xl flex-col items-center'>
        <h1 className='mb-12 text-3xl font-semibold text-black dark:text-white'>
          무엇을 도와드릴까요?
        </h1>
        <AskDefaultInput />
      </div>
    </div>
  );
}
