import { cn } from '@/src/shared/lib/utils';
import { Problem } from '@/src/shared/types/problem';
import { Button } from '@/src/shared/ui/button';

interface Props {
  problem: Problem;
  selected: number | null;
  showAnswer: boolean;
  onSelect: (idx: number) => void;
  onCheck: () => void;
  onPrev: () => void;
  onNext: () => void;
  isFirst: boolean;
  isLast: boolean;
}

export function ProblemView({
  problem,
  selected,
  showAnswer,
  onSelect,
  onCheck,
  onPrev,
  onNext,
  isFirst,
  isLast,
}: Props) {
  return (
    <div className='flex min-h-[700px] flex-col justify-between p-12'>
      <div className='mb-4 text-lg font-bold'>
        {problem.questionId}. {problem.title}
      </div>

      <div className='mb-6 space-y-3'>
        {problem.choices.map((choice, idx) => (
          <label
            key={idx}
            className={cn(
              'flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 transition',
              selected === idx && 'border-primary bg-primary/10',
              showAnswer &&
                idx === (problem.answer - 1) &&
                'border-2 border-blue-500 bg-blue-50 dark:bg-blue-900/30',
              showAnswer &&
                selected === idx &&
                selected !== (problem.answer - 1) &&
                'border-2 border-red-500 bg-red-50 dark:bg-red-900/30',
            )}
          >
            <input
              type='radio'
              name='choice'
              checked={selected === idx}
              onChange={() => onSelect(idx)}
              disabled={showAnswer}
              className='h-5 w-5 accent-blue-600'
            />
            <span className='text-base font-medium'>
              {String.fromCharCode(65 + idx)}. {choice}
            </span>
          </label>
        ))}
      </div>

      <div className='flex items-center gap-2'>
        <Button
          onClick={onCheck}
          disabled={selected === null || showAnswer}
          className='flex-1 bg-purple-600 text-lg text-white hover:bg-purple-700'
        >
          정답확인
        </Button>
      </div>

      <div className='mt-6 text-center'>
        <span
          className={cn(
            'inline-block rounded-lg px-4 py-2 text-base font-semibold transition-all',
            showAnswer
              ? selected === (problem.answer - 1)
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200'
              : 'bg-muted text-muted-foreground blur-sm select-none',
          )}
        >
          정답: {String.fromCharCode(64 + problem.answer)}. {problem.choices[problem.answer - 1]}
        </span>
      </div>

      <div className='mt-8 flex items-center justify-between'>
        <Button variant='outline' onClick={onPrev} disabled={isFirst}>
          이전 문제
        </Button>
        <Button variant='outline' onClick={onNext} disabled={isLast}>
          다음 문제
        </Button>
      </div>
    </div>
  );
}
