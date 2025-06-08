'use client';

import ReactMarkdown from 'react-markdown';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

interface Props {
  content: string;
}

export function MarkdownRenderer({ content }: Props) {
  return (
    <div className='prose dark:prose-invert prose-p:my-4 prose-li:my-2 prose-h2:mt-8 prose-h3:mt-6 prose-h4:mt-4 prose-h1:mt-0 mx-auto max-w-4xl p-8 [&_h1:not(:first-of-type)]:mt-12'>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          h1: ({ children }) => <h1 className='mb-8 text-3xl font-extrabold'>{children}</h1>,
          h2: ({ children }) => (
            <h2 className='mb-3 text-lg font-bold text-blue-600 dark:text-blue-400'>{children}</h2>
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
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
