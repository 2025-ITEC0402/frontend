'use client';

import { chapters } from '@/src/shared/types/chapters';
import 'katex/dist/katex.min.css';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

export default function StudyChapterPage() {
  const params = useParams();
  const currentChapter = params.chapter;
  const [markdown, setMarkdown] = useState('');
  const chapterData = chapters.find((c) => c.chapterId === currentChapter);

  useEffect(() => {
    if (chapterData) {
      fetch(`/markdown/${chapterData.file}`)
        .then((res) => {
          if (!res.ok) throw new Error('파일을 찾을 수 없습니다');
          return res.text();
        })
        .then((text) => setMarkdown(formatMarkdown(text)))
        .catch((err) => setMarkdown(`# 파일을 불러올 수 없습니다: ${err.message}`));
    }
  }, [chapterData]);

  if (!chapterData) return <div>존재하지 않는 챕터입니다.</div>;

  return (
    <div className='prose dark:prose-invert prose-p:my-4 prose-li:my-2 prose-h2:mt-8 prose-h3:mt-6 prose-h4:mt-4 mx-auto max-w-4xl p-8'>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
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
        {markdown}
      </ReactMarkdown>
    </div>
  );
}

function formatMarkdown(content: string): string {
  return content.replace(/\r\n/g, '\n').replace(/\n{1}(?!\n)/g, '\n\n');
}
