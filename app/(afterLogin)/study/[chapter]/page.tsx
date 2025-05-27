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
        .then((text) => setMarkdown(text))
        .catch((err) => setMarkdown(`# 파일을 불러올 수 없습니다: ${err.message}`));
    }
  }, [chapterData]);

  if (!chapterData) return <div>존재하지 않는 챕터입니다.</div>;

  return (
    <div className='prose dark:prose-invert mx-auto max-w-4xl p-8'>
      <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]}>
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
