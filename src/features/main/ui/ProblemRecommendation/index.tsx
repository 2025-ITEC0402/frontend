import { Button } from '@/src/shared/ui/button';
import { ChevronRight } from 'lucide-react';
import { ProblemCard } from './ProblemCard';

export interface Recommendation {
  chapterName: string;
  chapterNum: string;
  level: string;
  questionId: number;
}

interface Props {
  data: Recommendation[];
}

export function ProblemRecommendation({ data }: Props) {
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
        {data.map((problem, index) => (
          <ProblemCard key={index} {...problem} />
        ))}
      </div>
    </div>
  );
}
