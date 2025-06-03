'use client';

import { Button } from '@/src/shared/ui/button';
import { BookOpen, ChevronRight } from 'lucide-react';

interface Problem {
  id: string;
  title: string;
  difficulty: '쉬움' | '보통' | '어려움';
  category: string;
}

const recommendedProblems: Problem[] = [
  {
    id: '1',
    title: '미분방정식 기초 문제',
    difficulty: '쉬움',
    category: '미분방정식',
  },
  {
    id: '2',
    title: '라플라스 변환 응용',
    difficulty: '보통',
    category: '라플라스 변환',
  },
  {
    id: '3',
    title: '푸리에 급수 심화',
    difficulty: '어려움',
    category: '푸리에 급수',
  },
];

export function ProblemRecommendation() {
  return (
    <div className='rounded-xl border border-dashed bg-white p-6 dark:border-gray-700 dark:bg-[var(--background)]'>
      <div className='mb-4 flex items-center justify-between'>
        <h3 className='text-lg font-semibold dark:text-white'>추천 문제</h3>
        <Button variant='ghost' className='gap-1'>
          더보기
          <ChevronRight className='h-4 w-4' />
        </Button>
      </div>

      <div className='space-y-4'>
        {recommendedProblems.map((problem) => (
          <div
            key={problem.id}
            className='flex items-center justify-between rounded-lg border p-4 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700'
          >
            <div className='flex items-center gap-4'>
              <div className='rounded-full bg-blue-100 p-2 dark:bg-blue-900'>
                <BookOpen className='h-5 w-5 text-blue-600 dark:text-blue-400' />
              </div>
              <div>
                <h4 className='font-medium dark:text-white'>{problem.title}</h4>
                <div className='flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400'>
                  <span>{problem.category}</span>
                  <span>•</span>
                  <span
                    className={`${
                      problem.difficulty === '쉬움'
                        ? 'text-green-600 dark:text-green-400'
                        : problem.difficulty === '보통'
                          ? 'text-yellow-600 dark:text-yellow-400'
                          : 'text-red-600 dark:text-red-400'
                    }`}
                  >
                    {problem.difficulty}
                  </span>
                </div>
              </div>
            </div>
            <Button variant='outline' size='sm'>
              풀어보기
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
