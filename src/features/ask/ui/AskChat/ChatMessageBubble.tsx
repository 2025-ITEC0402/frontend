'use client';

import { cn } from '@/src/shared/lib/utils';
import { Message } from '@/src/shared/types/chatroom';
import 'katex/dist/katex.min.css';
import { Bot, User } from 'lucide-react';
import React, { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

interface Props {
  message: Message;
}

const ChatMessageBubble = React.memo(function ChatMessageBubble({ message }: Props) {
  const isUser = message.senderType === 'USER';

  const formattedContent = useMemo(() => {
    return message.content.replace(/\n/g, '\n\n');
  }, [message.content]);

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
            h2: ({ children }) => (
              <h2 className='mb-3 text-lg font-bold text-blue-600 dark:text-blue-400'>
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className='mt-5 mb-2 text-base font-semibold text-gray-800 dark:text-gray-300'>
                {children}
              </h3>
            ),
            h4: ({ children }) => (
              <h4 className='mt-4 mb-1 text-sm font-medium text-gray-600 dark:text-gray-400'>
                {children}
              </h4>
            ),
            p: ({ children }) => (
              <p className='mb-3 text-sm leading-relaxed text-gray-700 dark:text-gray-300'>
                {children}
              </p>
            ),
            ul: ({ children }) => (
              <ul className='mb-3 list-disc space-y-1 pl-5 text-sm text-gray-700 dark:text-gray-300'>
                {children}
              </ul>
            ),
            li: ({ children }) => <li className='leading-relaxed'>{children}</li>,
            blockquote: ({ children }) => (
              <blockquote className='my-4 border-l-4 border-blue-400 pl-4 text-sm text-gray-600 italic dark:text-gray-400'>
                {children}
              </blockquote>
            ),
            a: ({ href, children }) => (
              <a
                href={href}
                target='_blank'
                rel='noopener noreferrer'
                className='text-blue-600 underline transition-colors hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300'
              >
                {children}
              </a>
            ),
          }}
        >
          {formattedContent}
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
});

export default ChatMessageBubble;