'use client';

import { Recommendation } from '@/src/features/main/api/useRecommendations';
import { Button } from '@/src/shared/ui/button';
import { BookOpen } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Props extends Recommendation {
  questionId: number;
}

export function ProblemCard({ chapterName, chapterNum, level, questionId }: Props) {
  const router = useRouter();

  const levelColor =
    level === 'EASY'
      ? 'text-green-600 dark:text-green-400'
      : level === 'NORMAL'
        ? 'text-yellow-600 dark:text-yellow-400'
        : 'text-red-600 dark:text-red-400';

  const handleClick = () => {
    router.push(`/practice/${questionId}`);
  };

  return (
    <div className='flex items-center justify-between rounded-lg border p-4 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700'>
      <div className='flex items-center gap-4'>
        <div className='rounded-full bg-blue-100 p-2 dark:bg-blue-900'>
          <BookOpen className='h-5 w-5 text-blue-600 dark:text-blue-400' />
        </div>
        <div>
          <h4 className='font-medium dark:text-white'>{chapterName}</h4>
          <div className='flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400'>
            <span>{chapterNum}장</span>
            <span>•</span>
            <span className={levelColor}>{level}</span>
          </div>
        </div>
      </div>
      <Button variant='outline' size='sm' onClick={handleClick}>
        풀어보기
      </Button>
    </div>
  );
}