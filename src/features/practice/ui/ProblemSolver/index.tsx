'use client';

import { Dispatch, SetStateAction, useCallback, useMemo, useState } from 'react';

import { useSubmitAnswer } from '@/src/features/practice/api/useSubmitAnswer';
import { Problem } from '@/src/shared/types/problem';
import { Card } from '@/src/shared/ui/card';

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
  problemStates?: Record<string, ProblemState>;
  setProblemStates?: Dispatch<SetStateAction<Record<string, ProblemState>>>;
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
  const questionKey = String(problem.question_id);

  const isControlled = !!problemStates && !!setProblemStates;

  const [localStates, setLocalStates] = useState<Record<string, ProblemState>>({});

  const states = isControlled ? problemStates : localStates;
  const setStates = isControlled ? setProblemStates : setLocalStates;

  const defaultState: ProblemState = {
    selected: null,
    showAnswer: false,
    timeSpent: 0,
  };

  const currentState = states?.[questionKey] ?? defaultState;

  const isCorrect = useMemo(() => {
    return currentState.selected === parseInt(problem.answer) - 1;
  }, [currentState.selected, problem.answer]);

  const updateState = useCallback(
    (partial: Partial<ProblemState>) => {
      if (!setStates) return;

      setStates((prev) => ({
        ...prev,
        [questionKey]: {
          ...(prev?.[questionKey] ?? defaultState),
          ...partial,
        },
      }));
    },
    [questionKey, setStates],
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

  const computedCorrectCount = isControlled
    ? correctCount
    : currentState.showAnswer && isCorrect
      ? 1
      : 0;

  const computedTotalCount = isControlled ? totalCount : currentState.showAnswer ? 1 : 0;

  return (
    <div className='bg-background flex min-h-[90vh] w-full items-center justify-center px-2 py-8'>
      <Card className='dark:bg-card/90 flex min-h-[700px] w-full max-w-4xl min-w-[900px] flex-col justify-between rounded-2xl border bg-white p-0 shadow-lg'>
        <Header
          difficulty={problem.difficulty}
          timeSpent={currentState.timeSpent}
          setTimeSpent={handleTimeSpentChange}
          correctCount={computedCorrectCount}
          total={computedTotalCount}
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
            onPrev={onPrev}
            onNext={onNext}
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
