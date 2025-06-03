'use client';

import { ExplanationView } from '@/src/features/practice/ExplanationView';
import { Header } from '@/src/features/practice/Header';
import { ProblemView } from '@/src/features/practice/ProblemView';
import { problems } from '@/src/shared/types/problem';
import { Card } from '@/src/shared/ui/card';
import { useState } from 'react';

export default function PracticePage() {
  const [current, setCurrent] = useState(0);
  const [selectedMap, setSelectedMap] = useState<Record<number, number | null>>({});
  const [showAnswerMap, setShowAnswerMap] = useState<Record<number, boolean>>({});
  const [timeSpent, setTimeSpent] = useState(0);
  const [history, setHistory] = useState<{ problemId: number; isCorrect: boolean }[]>([]);

  const problem = problems[current];
  const selected = selectedMap[problem.number] ?? null;
  const showAnswer = showAnswerMap[problem.number] ?? false;
  const progress = ((current + 1) / problems.length) * 100;
  const correctCount = history.filter((h) => h.isCorrect).length;
  const totalAttempted = Object.keys(showAnswerMap).length;

  const handleSelect = (idx: number) => {
    if (!showAnswer) {
      setSelectedMap((prev) => ({ ...prev, [problem.number]: idx }));
    }
  };

  const handleCheck = () => {
    if (selected === null) return;
    const alreadyChecked = history.some((h) => h.problemId === problem.number);
    if (!alreadyChecked) {
      const isCorrect = selected === problem.answer;
      setHistory((prev) => [...prev, { problemId: problem.number, isCorrect }]);
    }
    setShowAnswerMap((prev) => ({ ...prev, [problem.number]: true }));
  };

  const navigateProblem = (direction: 'prev' | 'next') => {
    setCurrent((prev) => {
      const newIndex = direction === 'prev' ? prev - 1 : prev + 1;
      return Math.min(Math.max(newIndex, 0), problems.length - 1);
    });
  };

  return (
    <div className='bg-background flex min-h-[90vh] w-full items-center justify-center px-2 py-8'>
      <Card className='dark:bg-card/90 flex min-h-[700px] w-full max-w-4xl min-w-[900px] flex-col justify-between rounded-2xl border bg-white p-0 shadow-lg'>
        <Header
          difficulty={problem.difficulty}
          timeSpent={timeSpent}
          setTimeSpent={setTimeSpent}
          correctCount={correctCount}
          total={totalAttempted}
          progress={progress}
        />

        <div className='flex-1 overflow-y-auto'>
          <ProblemView
            problem={problem}
            selected={selected}
            showAnswer={showAnswer}
            onSelect={handleSelect}
            onCheck={handleCheck}
            onPrev={() => navigateProblem('prev')}
            onNext={() => navigateProblem('next')}
            isFirst={current === 0}
            isLast={current === problems.length - 1}
          />
          {showAnswer && <ExplanationView explanation={problem} />}
        </div>
      </Card>
    </div>
  );
}
