'use client';

import { useRandomQuestions } from '@/src/features/practice/api/useRandomQuestions';
import { ProblemSolver } from '@/src/features/practice/ui/ProblemSolver';
import { Spinner } from '@/src/shared/ui/spinner';
import { useCallback, useState } from 'react';

interface ProblemState {
  selected: number | null;
  showAnswer: boolean;
  timeSpent: number;
}

export default function PracticePage() {
  const { data, isLoading, isError } = useRandomQuestions();
  const [current, setCurrent] = useState(0);
  const [problemStates, setProblemStates] = useState<Record<number, ProblemState>>({});

  const problems = data?.questionSets || [];
  const problem = problems[current];

  const navigateProblem = useCallback(
    (direction: 'prev' | 'next') => {
      setCurrent((prev) => {
        const newIndex = direction === 'prev' ? prev - 1 : prev + 1;
        return Math.min(Math.max(newIndex, 0), problems.length - 1);
      });
    },
    [problems.length],
  );

  const progress = problems.length > 0 ? ((current + 1) / problems.length) * 100 : 0;

  // 정답률 계산
  const correctCount = problems.reduce((acc, p) => {
    const state = problemStates[p.question_id];
    if (state?.showAnswer && state.selected === parseInt(p.answer) - 1) {
      return acc + 1;
    }
    return acc;
  }, 0);

  const totalCount = problems.reduce((acc, p) => {
    const state = problemStates[p.question_id];
    if (state?.showAnswer) {
      return acc + 1;
    }
    return acc;
  }, 0);

  if (isLoading) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <Spinner />
      </div>
    );
  }

  if (isError || !data) {
    return <div className='text-red-500'>문제를 불러오는 데 실패했습니다.</div>;
  }

  if (!problem) {
    return (
      <div className='flex h-screen flex-col items-center justify-center gap-4'>
        <div className='text-lg font-semibold text-gray-700 dark:text-gray-200'>
          풀 수 있는 문제가 없습니다.
        </div>
        <button
          className='mt-2 rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700'
          onClick={() => (window.location.href = '/main')}
        >
          메인으로 돌아가기
        </button>
      </div>
    );
  }

  return (
    <ProblemSolver
      problem={problem}
      onPrev={() => navigateProblem('prev')}
      onNext={() => navigateProblem('next')}
      isFirst={current === 0}
      isLast={current === problems.length - 1}
      progress={progress}
      problemStates={problemStates}
      setProblemStates={setProblemStates}
      correctCount={correctCount}
      totalCount={totalCount}
    />
  );
}
