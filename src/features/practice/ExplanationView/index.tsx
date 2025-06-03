// ExplanationView.tsx
import { Problem } from '@/src/shared/types/problem';

interface Props {
  explanation: Problem;
}

const getDifficultyColor = (difficulty: 'EASY' | 'NORMAL' | 'HARD') => {
  switch (difficulty) {
    case 'EASY':
      return 'text-green-500';
    case 'NORMAL':
      return 'text-orange-500';
    case 'HARD':
      return 'text-red-500';
  }
};

export function ExplanationView({ explanation }: Props) {
  return (
    <div className='border-t border-gray-200 dark:border-gray-700'>
      <div className='p-12'>
        <div className='mb-2 text-sm text-gray-500'>
          난이도:{' '}
          <span className={`font-bold ${getDifficultyColor(explanation.difficulty)}`}>
            {explanation.difficulty}
          </span>
        </div>
        <div className='mb-2 text-sm text-gray-500'>
          관련 단원: <span className='font-bold text-blue-600'>{explanation.topic}</span>
        </div>
        <div className='mt-4 rounded-lg bg-gray-50 p-4 text-gray-700 dark:bg-gray-800 dark:text-gray-200'>
          <div className='mb-4 font-semibold text-gray-800 dark:text-gray-200'>문제 해설</div>
          {explanation.explanation}
        </div>
        <div className='mt-4 rounded-lg bg-gray-50 p-4 text-gray-700 dark:bg-gray-800 dark:text-gray-200'>
          <div className='mb-4 font-semibold text-purple-600'>AI 문제 총평</div>
          {explanation.aiSummary}
        </div>
      </div>
    </div>
  );
}
