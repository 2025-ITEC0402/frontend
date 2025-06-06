'use client';

import { AskChat } from '@/src/features/ask/ui/AskChat';

export default function AskMainPage() {
  return (
    <>
      <main className='flex h-full flex-1 flex-col p-8'>
        <AskChat />
      </main>
    </>
  );
}
