'use client';

import { useSubmitAnswer } from '@/src/features/practice/api/useSubmitAnswer';
import { Problem } from '@/src/shared/types/problem';
import { Card } from '@/src/shared/ui/card';
import { Dispatch, SetStateAction, useCallback, useMemo } from 'react';
import { ExplanationView } from '../ExplanationView';
import { Header } from '../Header';
import { ProblemView } from '../ProblemView';

interface ProblemState {
  selected: number | null;
  showAnswer: boolean;
  timeSpent: number;
}

interface ProblemSolverProps {
  problem: Problem;
  onPrev?: () => void;
  onNext?: () => void;
  isFirst?: boolean;
  isLast?: boolean;
  hideNavigation?: boolean;
  progress?: number;
  problemStates: Record<number, ProblemState>;
  setProblemStates: Dispatch<SetStateAction<Record<number, ProblemState>>>;
  correctCount: number;
  totalCount: number;
}

export function ProblemSolver({
  problem,
  onPrev = () => {},
  onNext = () => {},
  isFirst = false,
  isLast = false,
  hideNavigation = false,
  progress = 100,
  problemStates,
  setProblemStates,
  correctCount,
  totalCount,
}: ProblemSolverProps) {
  const { mutate: submitAnswer } = useSubmitAnswer();

  const currentState = useMemo(() => {
    return (
      problemStates[problem.question_id] ?? {
        selected: null,
        showAnswer: false,
        timeSpent: 0,
      }
    );
  }, [problemStates, problem.question_id]);

  const isCorrect = currentState.selected === parseInt(problem.answer) - 1;

  const updateState = useCallback(
    (partial: Partial<ProblemState>) => {
      setProblemStates((prev) => ({
        ...prev,
        [problem.question_id]: {
          ...(prev[problem.question_id] ?? {
            selected: null,
            showAnswer: false,
            timeSpent: 0,
          }),
          ...partial,
        },
      }));
    },
    [problem.question_id, setProblemStates],
  );

  const handleSelect = useCallback(
    (idx: number) => {
      if (!currentState.showAnswer) {
        updateState({ selected: idx });
      }
    },
    [currentState.showAnswer, updateState],
  );

  const handleCheck = useCallback(() => {
    if (currentState.selected === null) return;

    submitAnswer({
      questionId: problem.question_id,
      correctOnFirstTry: isCorrect,
    });

    updateState({ showAnswer: true });
  }, [currentState.selected, isCorrect, problem.question_id, submitAnswer, updateState]);

  const handleTimeSpentChange = useCallback(
    (time: number) => {
      updateState({ timeSpent: time });
    },
    [updateState],
  );

  const handlePrev = useCallback(() => {
    onPrev();
  }, [onPrev]);

  const handleNext = useCallback(() => {
    onNext();
  }, [onNext]);

  return (
    <div className='bg-background flex min-h-[90vh] w-full items-center justify-center px-2 py-8'>
      <Card className='dark:bg-card/90 flex min-h-[700px] w-full max-w-4xl min-w-[900px] flex-col justify-between rounded-2xl border bg-white p-0 shadow-lg'>
        <Header
          difficulty={problem.difficulty}
          timeSpent={currentState.timeSpent}
          setTimeSpent={handleTimeSpentChange}
          correctCount={correctCount}
          total={totalCount}
          progress={progress}
        />

        <div className='flex-1 overflow-y-auto'>
          <ProblemView
            problem={{
              questionId: problem.question_id,
              title: problem.title,
              choices: [problem.choice1, problem.choice2, problem.choice3, problem.choice4],
              answer: parseInt(problem.answer),
            }}
            selected={currentState.selected}
            showAnswer={currentState.showAnswer}
            onSelect={handleSelect}
            onCheck={handleCheck}
            onPrev={handlePrev}
            onNext={handleNext}
            isFirst={isFirst}
            isLast={isLast}
            hideNavigation={hideNavigation}
          />
          {currentState.showAnswer && (
            <ExplanationView
              chapter={problem.chapter}
              difficulty={problem.difficulty as 'EASY' | 'NORMAL' | 'HARD'}
              explanation={problem.explanation}
              aiSummary={problem.aiSummary}
            />
          )}
        </div>
      </Card>
    </div>
  );
}
