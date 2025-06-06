'use client';

import { cn } from '@/src/shared/lib/utils';
import { Message } from '@/src/shared/types/chatroom';
import 'katex/dist/katex.min.css';
import { Bot, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

interface Props {
  message: Message;
}

export function ChatMessageBubble({ message }: Props) {
  const isUser = message.senderType === 'USER';

  return (
    <div className={cn('flex items-start gap-2', isUser && 'justify-end')}>
      {!isUser && (
        <div className='bg-primary/10 rounded-full p-1'>
          <Bot className='text-primary h-5 w-5' />
        </div>
      )}
      <div
        className={cn(
          'max-w-[80%] rounded-lg p-3',
          isUser
            ? 'bg-primary/80 text-white dark:bg-blue-600 dark:text-gray-100'
            : 'bg-white dark:bg-gray-800 dark:text-white',
        )}
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkMath]}
          rehypePlugins={[rehypeKatex]}
          components={{
            p: ({ children }) => (
              <p className='prose dark:prose-invert max-w-full text-sm leading-relaxed break-words'>
                {children}
              </p>
            ),
          }}
        >
          {message.content}
        </ReactMarkdown>

        {message.imageUrl && (
          <img
            src={message.imageUrl}
            alt='첨부 이미지'
            className='mt-2 max-h-48 rounded-lg object-contain'
          />
        )}
      </div>
      {isUser && (
        <div className='rounded-full bg-gray-100 p-1 dark:bg-gray-700'>
          <User className='h-5 w-5 text-gray-600 dark:text-gray-400' />
        </div>
      )}
    </div>
  );
}
