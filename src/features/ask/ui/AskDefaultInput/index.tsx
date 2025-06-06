'use client';

import { useCreateChatroom } from '@/src/features/ask/api/useCreateChatroom';
import { queryClient } from '@/src/shared/provider/QueryProvider';
import { Button } from '@/src/shared/ui/button';
import { Input } from '@/src/shared/ui/input';
import { Image, Send } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FormEvent, useRef, useState } from 'react';
import { toast } from 'sonner';

export function AskDefaultInput() {
  const [input, setInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { mutate: createChatroom, isPending } = useCreateChatroom();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) {
      toast.warning('이미지 첨부 또는 질문을 입력해 주세요!');
      return;
    }

    createChatroom(
      { content: input.trim() },
      {
        onSuccess: (data) => {
          toast.success('새로운 채팅방이 생성되었습니다!');
          queryClient.invalidateQueries({ queryKey: ['chatList'] });
          router.push(`/ask/${data.chatroomId}`);
        },
        onError: () => {
          toast.error('채팅방 생성에 실패했습니다.');
        },
      },
    );

    setInput('');
  };

  return (
    <div className='w-[600px] max-w-full rounded-3xl border border-gray-200 bg-white px-4 py-4 shadow-sm dark:border-gray-700 dark:bg-gray-900'>
      <form className='flex gap-2' onSubmit={handleSubmit}>
        <Button
          variant='outline'
          type='button'
          onClick={() => fileInputRef.current?.click()}
          disabled
        >
          <Image className='h-4 w-4' />
        </Button>
        <input type='file' ref={fileInputRef} className='hidden' disabled />
        <Input
          placeholder='질문을 입력하세요...'
          className='flex-1'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isPending}
        />
        <Button type='submit' disabled={isPending}>
          <Send className='h-4 w-4' />
        </Button>
      </form>
    </div>
  );
}
