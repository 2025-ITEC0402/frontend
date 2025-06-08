'use client';

import { useCompleteChapter } from '@/src/features/study/api/useCompleteChapter';
import { MarkdownRenderer } from '@/src/features/study/ui/MarkdownRenderer';
import { chapters } from '@/src/shared/types/chapters';
import { Button } from '@/src/shared/ui/button';

import 'katex/dist/katex.min.css';
import { CheckCircle2 } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function StudyChapterPage() {
  const params = useParams();
  const currentChapter = params.chapter;
  const [markdown, setMarkdown] = useState('');
  const chapterData = chapters.find((c) => c.chapterId === currentChapter);
  const completeMutation = useCompleteChapter();

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

  const handleComplete = () => {
    if (!chapterData) return;
    completeMutation.mutate(
      { chapterId: Number(chapterData.chapterId) },
      {
        onSuccess: () => toast.success('학습 완료!'),
        onError: () => toast.error('학습 완료 처리에 실패했습니다.'),
      },
    );
  };

  if (!chapterData) return <div>존재하지 않는 챕터입니다.</div>;

  return (
    <div className='relative mx-auto max-w-4xl p-8'>
      <div className='fixed right-8 bottom-8 z-50'>
        <Button
          onClick={handleComplete}
          disabled={completeMutation.isPending}
          className='flex items-center gap-2 rounded-full border border-blue-400 bg-white/90 px-6 py-3 text-base font-semibold text-blue-600 shadow-md ring-1 ring-blue-100 backdrop-blur transition-all hover:scale-105 hover:bg-blue-50 hover:shadow-lg active:scale-100 dark:bg-neutral-900/90 dark:text-blue-300 dark:ring-blue-900 dark:hover:bg-blue-950'
        >
          <CheckCircle2 className='h-5 w-5 text-blue-400 dark:text-blue-300' />
          {completeMutation.isPending ? '처리 중...' : '학습 완료'}
        </Button>
      </div>
      <MarkdownRenderer content={markdown} />
    </div>
  );
}

function formatMarkdown(content: string): string {
  return content
    .replace(/\r\n/g, '\n')
    .replace(/([^\n])\n# /g, '$1\n\n# ')
    .replace(/([^\n])\n(?!\n|[#>\-*])/g, '$1\n\n');
}
