import { Image, Send } from 'lucide-react';
import React from 'react';

import { Button } from '@/src/shared/ui/button';
import { Input } from '@/src/shared/ui/input';

export function ChatInput({
  input,
  setInput,
  onSend,
  onImageSelect,
  handleImageFile,
  fileInputRef,
}: {
  input: string;
  setInput: (val: string) => void;
  onSend: () => void;
  onImageSelect: () => void;
  handleImageFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
}) {
  return (
    <div className='flex gap-2'>
      <input
        type='file'
        accept='image/*'
        onChange={handleImageFile}
        ref={fileInputRef}
        className='hidden'
      />
      <Button
        variant='outline'
        onClick={onImageSelect}
        className='dark:border-gray-600 dark:text-white'
      >
        <Image className='h-4 w-4' />
      </Button>
      <Input
        value={input}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
        placeholder='질문을 입력하세요...'
        onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && onSend()}
        className='flex-1 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400'
      />
      <Button onClick={onSend} className='dark:bg-blue-600 dark:hover:bg-blue-700'>
        <Send className='h-4 w-4' />
      </Button>
    </div>
  );
}
