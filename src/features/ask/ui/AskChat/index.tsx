'use client';

import { Button } from '@/src/shared/ui/button';
import { Input } from '@/src/shared/ui/input';
import { Bot, Image, Send, User, X } from 'lucide-react';
import { FormEvent, useRef, useState } from 'react';
import { toast } from 'sonner';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  imageUrl?: string;
}

export function AskChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: '안녕하세요! 궁금한 점을 자유롭게 질문해 주세요.',
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

  const handleSend = (e?: FormEvent) => {
    if (e) e.preventDefault();
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

    setTimeout(() => {
      const aiResponse: Message = {
        id: 'ai-' + Date.now().toString(),
        content: 'AI가 곧 답변을 드릴 예정입니다. (실제 연동 필요)',
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <div className='bg-card/80 mx-auto flex h-[90vh] min-h-[500px] w-full max-w-4xl flex-col rounded-xl border p-6 shadow-lg dark:bg-gray-900/50'>
      <div className='scrollbar-hide mb-4 flex-1 space-y-4 overflow-y-auto pr-2'>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start gap-2 ${message.sender === 'user' ? 'justify-end' : ''}`}
          >
            {message.sender === 'ai' && (
              <div className='bg-primary/10 rounded-full p-1'>
                <Bot className='text-primary h-5 w-5' />
              </div>
            )}
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.sender === 'user'
                  ? 'bg-primary/80 text-white dark:bg-blue-600 dark:text-gray-100'
                  : 'bg-white dark:bg-gray-800 dark:text-white'
              }`}
            >
              <p className='text-sm break-words'>{message.content}</p>
              {message.imageUrl && (
                <img
                  src={message.imageUrl}
                  alt='첨부 이미지'
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
          <div className='flex max-w-xs flex-col items-center rounded-xl border bg-white p-2 shadow-lg dark:bg-gray-800'>
            <div className='relative flex w-full justify-center'>
              <img
                src={selectedImage}
                alt='Selected'
                className='mx-auto max-h-40 w-auto rounded-lg object-contain'
              />
              <button
                onClick={() => setSelectedImage(null)}
                className='absolute top-2 right-2 rounded-full bg-black/60 p-1 text-white hover:bg-black/80'
                aria-label='이미지 삭제'
                style={{ zIndex: 10 }}
              >
                <X className='h-4 w-4' />
              </button>
            </div>
            <span className='mt-2 text-xs text-gray-500 dark:text-gray-400'>첨부된 이미지</span>
          </div>
        </div>
      )}

      <form className='flex gap-2' onSubmit={handleSend}>
        <input
          type='file'
          accept='image/*'
          onChange={handleImageSelect}
          ref={fileInputRef}
          className='hidden'
        />
        <Button variant='outline' type='button' onClick={() => fileInputRef.current?.click()}>
          <Image className='h-4 w-4' />
        </Button>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='질문을 입력하세요...'
          className='flex-1'
        />
        <Button type='submit'>
          <Send className='h-4 w-4' />
        </Button>
      </form>
    </div>
  );
}

export default AskChat;
