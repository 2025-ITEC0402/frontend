'use client';

import { ChatInput } from '@/src/features/main/ui/AITutorChat/ChatInput';
import { ImagePreview } from '@/src/features/main/ui/AITutorChat/ImagePreview';
import { MessageList } from '@/src/features/main/ui/AITutorChat/MessageList';
import { Message } from '@/src/shared/types/chatroom';
import { useRef, useState } from 'react';
import { toast } from 'sonner';

export function AITutorChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: '안녕하세요! 공학수학 학습을 도와드리는 AI 튜터입니다. 어떤 도움이 필요하신가요?',
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setSelectedImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSend = () => {
    if (!input.trim() && !selectedImage) {
      toast.warning('이미지 첨부 또는 질문을 입력해 주세요!');
      return;
    }

    const newMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
      imageUrl: selectedImage || undefined,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput('');
    setSelectedImage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';

    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: '죄송합니다. 현재 AI 튜터 기능은 개발 중입니다. 곧 만나요!',
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <div className='rounded-xl border border-dashed bg-white p-6 dark:border-gray-700 dark:bg-[var(--background)]'>
      <div className='mb-4'>
        <h3 className='text-lg font-semibold dark:text-white'>AI 튜터</h3>
        <p className='text-sm text-gray-500 dark:text-gray-400'>공학수학 학습을 도와드립니다</p>
      </div>

      <MessageList messages={messages} />

      {selectedImage && (
        <ImagePreview imageUrl={selectedImage} onRemove={() => setSelectedImage(null)} />
      )}

      <ChatInput
        input={input}
        setInput={setInput}
        onSend={handleSend}
        onImageSelect={() => fileInputRef.current?.click()}
        handleImageFile={handleImageSelect}
        fileInputRef={fileInputRef}
      />
    </div>
  );
}
