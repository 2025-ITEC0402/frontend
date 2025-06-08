'use client';

import { useDeleteChatroom } from '@/src/features/ask/api/useDeleteChatroom';
import { useFetchChatList } from '@/src/features/ask/api/useFetchChatList';
import { useUpdateChatroomTitle } from '@/src/features/ask/api/useUpdateChatroomTitle';
import { ChatRoomList } from '@/src/features/ask/ui/ChatRoomList';
import { Button } from '@/src/shared/ui/button';
import { Plus } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function AskSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const rawId = pathname.split('/')[2];
  const selectedId = rawId ? Number(rawId) : null;

  const { data: chatList, isLoading, isError } = useFetchChatList();
  const updateTitleMutation = useUpdateChatroomTitle();
  const deleteChatroomMutation = useDeleteChatroom();

  const handleSelect = (id: number) => router.push(`/ask/${id}`);
  const handleEditTitle = (id: number, newTitle: string) => {
    updateTitleMutation.mutate(
      { chatRoomId: id, newTitle },
      {
        onSuccess: () => toast.success('채팅방 제목 수정 성공'),
        onError: () => toast.error('채팅방 제목 수정 실패'),
      },
    );
  };
  const handleDelete = (id: number) => {
    deleteChatroomMutation.mutate(
      { chatRoomId: id },
      {
        onSuccess: () => toast.success('채팅방 삭제 완료'),
        onError: () => toast.error('채팅방 삭제 실패'),
      },
    );
  };

  if (isLoading)
    return <div className='p-4 text-sm text-gray-500'>채팅방 목록을 불러오는 중...</div>;
  if (isError || !chatList) return <div className='p-4 text-sm text-red-500'>불러오기 실패</div>;

  return (
    <aside className='relative flex h-full min-h-0 w-80 flex-col border-x border-dashed border-gray-200 bg-white/50 p-6 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/50'>
      <div className='mb-6 flex items-center justify-between'>
        <h2 className='text-xl font-semibold text-gray-900 dark:text-white'>대화 목록</h2>
        <Button
          size='sm'
          variant='ghost'
          className='h-8 w-8 rounded-full p-0 hover:bg-gray-100 dark:hover:bg-gray-800'
          onClick={() => router.push('/ask')}
        >
          <Plus className='h-4 w-4' />
        </Button>
      </div>

      <div className='flex-1 overflow-hidden'>
        <ChatRoomList
          chatList={chatList}
          selectedId={selectedId}
          onSelect={handleSelect}
          onEditTitle={handleEditTitle}
          onDelete={handleDelete}
        />
      </div>

      <div className='absolute bottom-0 left-0 w-full bg-gradient-to-t from-white via-white/80 p-6 dark:from-gray-900 dark:via-gray-900/80'>
        <Button
          variant='outline'
          className='w-full border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
          onClick={() => router.push('/ask')}
        >
          새 질문하기
        </Button>
      </div>
    </aside>
  );
}
