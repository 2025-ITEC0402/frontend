'use client';

import { Button } from '@/src/shared/ui/button';
import { Input } from '@/src/shared/ui/input';
import { Bot, Image, Send, User, X } from 'lucide-react';
import { useRef, useState } from 'react';
import { toast } from 'sonner';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  imageUrl?: string;
}

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
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
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
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    // AI 응답 시뮬레이션
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

      <div className='mb-4 h-[500px] space-y-4 overflow-y-auto rounded-lg border bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900'>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start gap-2 ${message.sender === 'user' ? 'justify-end' : ''}`}
          >
            {message.sender === 'ai' && (
              <div className='rounded-full bg-blue-100 p-1 dark:bg-blue-900'>
                <Bot className='h-5 w-5 text-blue-600 dark:text-blue-400' />
              </div>
            )}
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.sender === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white dark:bg-gray-800 dark:text-white'
              }`}
            >
              <p className='text-sm'>{message.content}</p>
              {message.imageUrl && (
                <img
                  src={message.imageUrl}
                  alt='Uploaded content'
                  className='mt-2 max-h-48 rounded-lg object-contain'
                />
              )}
            </div>
            {message.sender === 'user' && (
              <div className='rounded-full bg-gray-100 p-1 dark:bg-gray-700'>
                <User className='h-5 w-5 text-gray-600 dark:text-gray-400' />
              </div>
            )}
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className='relative mb-4 flex justify-start'>
          <div className='flex max-w-xs flex-col items-center rounded-xl border border-gray-300 bg-white p-2 shadow-lg dark:border-gray-600 dark:bg-gray-800'>
            <div className='relative flex w-full justify-center'>
              <img
                src={selectedImage}
                alt='Selected'
                className='mx-auto max-h-40 w-auto rounded-lg object-contain'
              />
              <button
                onClick={() => setSelectedImage(null)}
                className='absolute top-2 right-2 rounded-full bg-black/60 p-1 text-white transition-colors hover:bg-black/80'
                style={{ zIndex: 10 }}
                aria-label='이미지 삭제'
              >
                <X className='h-4 w-4' />
              </button>
            </div>
            <span className='mt-2 text-xs text-gray-500 dark:text-gray-400'>첨부된 이미지</span>
          </div>
        </div>
      )}

      <div className='flex gap-2'>
        <input
          type='file'
          accept='image/*'
          onChange={handleImageSelect}
          ref={fileInputRef}
          className='hidden'
        />
        <Button
          variant='outline'
          onClick={() => fileInputRef.current?.click()}
          className='dark:border-gray-600 dark:text-white'
        >
          <Image className='h-4 w-4' />
        </Button>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='질문을 입력하세요...'
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          className='flex-1 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400'
        />
        <Button onClick={handleSend} className='dark:bg-blue-600 dark:hover:bg-blue-700'>
          <Send className='h-4 w-4' />
        </Button>
      </div>
    </div>
  );
}
