import { Bot, User } from 'lucide-react';

import { Message } from '@/src/shared/types/chatroom';

export function MessageList({ messages }: { messages: Message[] }) {
  return (
    <div className='scrollbar-hide mb-4 h-[500px] space-y-4 overflow-y-auto rounded-lg border bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900'>
      {messages.map((msg) => (
        <div
          key={msg.messageId}
          className={`flex items-start gap-2 ${msg.senderType === 'USER' ? 'justify-end' : ''}`}
        >
          {msg.senderType === 'AI' && (
            <div className='rounded-full bg-blue-100 p-1 dark:bg-blue-900'>
              <Bot className='h-5 w-5 text-blue-600 dark:text-blue-400' />
            </div>
          )}
          <div
            className={`max-w-[80%] rounded-lg p-3 ${
              msg.senderType === 'USER'
                ? 'bg-blue-500 text-white'
                : 'bg-white dark:bg-gray-800 dark:text-white'
            }`}
          >
            <p className='text-sm'>{msg.content}</p>
            {msg.imageUrl && (
              <img
                src={msg.imageUrl}
                alt='Uploaded content'
                className='mt-2 max-h-48 rounded-lg object-contain'
              />
            )}
          </div>
          {msg.senderType === 'USER' && (
            <div className='rounded-full bg-gray-100 p-1 dark:bg-gray-700'>
              <User className='h-5 w-5 text-gray-600 dark:text-gray-400' />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
