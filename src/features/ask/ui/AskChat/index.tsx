'use client';

import { useSendMessage } from '@/src/features/ask/api/useSendMessage';
import { ChatroomDetailResponse, Message } from '@/src/shared/types/chatroom';
import { Button } from '@/src/shared/ui/button';
import { Input } from '@/src/shared/ui/input';
import { Image, Send } from 'lucide-react';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import ChatMessageBubble from './ChatMessageBubble';
import { ImagePreview } from './ImagePreview';

interface AskChatProps {
  chatroom: ChatroomDetailResponse;
}

export function AskChat({ chatroom }: AskChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutate: sendMessage, isPending } = useSendMessage();

  useEffect(() => {
    const initialMessages: Message[] = chatroom.messageList.map((m) => ({
      messageId: String(m.messageId),
      senderType: m.senderType as 'USER' | 'AI',
      content: m.content,
      createdAt: new Date(m.createdAt),
      imageUrl: m.imageUrl,
    }));
    setMessages(initialMessages);
  }, [chatroom]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleSend = (e?: FormEvent) => {
    e?.preventDefault();
    if (!input.trim() && !imageFile) {
      toast.warning('이미지 첨부 또는 질문을 입력해 주세요!');
      return;
    }

    const newMessage: Message = {
      messageId: Date.now().toString(),
      content: input,
      senderType: 'USER',
      createdAt: new Date(),
      imageUrl: imageFile ? URL.createObjectURL(imageFile) : undefined,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput('');
    setImageFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';

    sendMessage(
      {
        chatRoomId: chatroom.chatRoomId,
        content: input.trim(),
        imageFile: imageFile ?? undefined,
      },
      {
        onSuccess: (res) => {
          const aiMessage: Message = {
            messageId: Date.now().toString(),
            senderType: 'AI',
            content: res.answer,
            createdAt: new Date(res.created_at),
          };
          setMessages((prev) => [...prev, aiMessage]);
        },
        onError: () => {
          toast.error('메시지 전송에 실패했습니다.');
        },
      },
    );
  };

  return (
    <div className='bg-card/80 mx-auto flex h-full w-full max-w-4xl flex-col rounded-xl border p-6 shadow-lg dark:bg-gray-900/50'>
      <div className='scrollbar-hide mb-4 flex-1 space-y-4 overflow-y-auto pr-2'>
        {messages.map((message) => (
          <ChatMessageBubble key={message.messageId} message={message} />
        ))}
      </div>

      {imageFile && (
        <ImagePreview image={URL.createObjectURL(imageFile)} onRemove={() => setImageFile(null)} />
      )}

      <form className='flex gap-2' onSubmit={handleSend}>
        <input
          type='file'
          accept='image/*'
          onChange={handleImageSelect}
          ref={fileInputRef}
          className='hidden'
        />
        <Button
          variant='outline'
          type='button'
          onClick={() => fileInputRef.current?.click()}
          disabled={isPending}
        >
          <Image className='h-4 w-4' />
        </Button>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='질문을 입력하세요...'
          className='flex-1'
          disabled={isPending}
        />
        <Button type='submit' disabled={isPending}>
          <Send className='h-4 w-4' />
        </Button>
      </form>
    </div>
  );
}

export default AskChat;
