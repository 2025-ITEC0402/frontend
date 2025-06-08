'use client';

import { Image, Send } from 'lucide-react';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

import { useSendMessage } from '@/src/features/ask/api/useSendMessage';
import { ChatroomDetailResponse, Message } from '@/src/shared/types/chatroom';
import { Button } from '@/src/shared/ui/button';
import { Input } from '@/src/shared/ui/input';

import ChatMessageBubble from './ChatMessageBubble';
import { ImagePreview } from './ImagePreview';
import StepProgressBar from './StepProgressbar';

interface AskChatProps {
  chatroom: ChatroomDetailResponse;
}

export default function AskChat({ chatroom }: AskChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [step, setStep] = useState(0);
  const [isProgressVisible, setIsProgressVisible] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { mutate: sendMessage } = useSendMessage();

  useEffect(() => {
    setMessages(
      chatroom.messageList.map((m) => ({
        messageId: String(m.messageId),
        senderType: m.senderType as 'USER' | 'AI',
        content: m.content,
        createdAt: new Date(m.createdAt),
        imageUrl: m.imageUrl,
      })),
    );
  }, [chatroom]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImageFile(file);
  };

  const resetInput = () => {
    setInput('');
    setImageFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const appendMessage = (msg: Message) => {
    setMessages((prev) => [...prev, msg]);
  };

  const handleSend = (e?: FormEvent) => {
    e?.preventDefault();
    if (!input.trim() && !imageFile) {
      toast.warning('이미지 첨부 또는 질문을 입력해 주세요!');
      return;
    }

    const userMessage: Message = {
      messageId: Date.now().toString(),
      content: input,
      senderType: 'USER',
      createdAt: new Date(),
      imageUrl: imageFile ? URL.createObjectURL(imageFile) : undefined,
    };

    appendMessage(userMessage);
    resetInput();

    setIsProgressVisible(true);
    setStep(0);

    sendMessage(
      {
        chatRoomId: chatroom.chatRoomId,
        content: input.trim(),
        imageFile: imageFile ?? undefined,
      },
      {
        onSuccess: (res) => {
          appendMessage({
            messageId: Date.now().toString(),
            senderType: 'AI',
            content: res.answer,
            createdAt: new Date(res.created_at),
          });
          setStep(3);
          setTimeout(() => setIsProgressVisible(false), 1500);
        },
        onError: () => {
          toast.error('메시지 전송에 실패했습니다.');
          setIsProgressVisible(false);
        },
      },
    );
  };

  return (
    <div className='bg-card/80 relative mx-auto flex h-full w-full max-w-4xl flex-col rounded-xl border p-6 shadow-lg dark:bg-gray-900/50'>
      {isProgressVisible && (
        <div className='absolute inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-gray-900/80'>
          <StepProgressBar loading step={step} setStep={setStep} />
        </div>
      )}

      <div ref={scrollRef} className='scrollbar-hide mb-4 flex-1 space-y-4 overflow-y-auto pr-2'>
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
          disabled={isProgressVisible}
        >
          <Image className='h-4 w-4' />
        </Button>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='질문을 입력하세요...'
          className='flex-1'
          disabled={isProgressVisible}
        />
        <Button type='submit' disabled={isProgressVisible}>
          <Send className='h-4 w-4' />
        </Button>
      </form>
    </div>
  );
}
