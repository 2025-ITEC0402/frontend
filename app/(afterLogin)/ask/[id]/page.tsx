'use client';

import { useFetchChatroomDetail } from '@/src/features/ask/api/useFetchChatroomDetail';
import { AskChat } from '@/src/features/ask/ui/AskChat';
import { Spinner } from '@/src/shared/ui/spinner';
import { useParams } from 'next/navigation';

export default function AskMainPage() {
  const params = useParams();
  const chatRoomId = Number(params.id);

  const { data, isLoading, isError } = useFetchChatroomDetail(chatRoomId);

  if (isLoading)
    return (
      <div className='flex h-full w-full items-center justify-center'>
        <Spinner />
      </div>
    );

  if (isError || !data)
    return (
      <div className='text-destructive flex h-full w-full items-center justify-center text-sm'>
        채팅방 정보를 불러올 수 없습니다.
      </div>
    );

  return (
    <main className='flex h-full flex-1 flex-col p-4'>
      <AskChat chatroom={data} />
    </main>
  );
}
