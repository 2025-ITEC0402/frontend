'use client';

import { useSubmitAnswer } from '@/src/features/practice/api/useSubmitAnswer';
import { Card } from '@/src/shared/ui/card';
import { useState } from 'react';
import { ExplanationView } from '../ExplanationView';
import { Header } from '../Header';
import { ProblemView } from '../ProblemView';

interface Problem {
  question_id: number;
  title: string;
  choice1: string;
  choice2: string;
  choice3: string;
  choice4: string;
  answer: string;
  chapter: string;
  difficulty: string;
  explanation: string;
  aiSummary: string;
}

interface ProblemSolverProps {
  problem: Problem;
  onPrev?: () => void;
  onNext?: () => void;
  isFirst?: boolean;
  isLast?: boolean;
  hideNavigation?: boolean;
  progress?: number;
}

export function ProblemSolver({
  problem,
  onPrev = () => {},
  onNext = () => {},
  isFirst = false,
  isLast = false,
  hideNavigation = false,
  progress = 100,
}: ProblemSolverProps) {
  const [problemStates, setProblemStates] = useState<
    Record<
      number,
      {
        selected: number | null;
        showAnswer: boolean;
        timeSpent: number;
      }
    >
  >({});

  const currentState = problemStates[problem.question_id] || {
    selected: null,
    showAnswer: false,
    timeSpent: 0,
  };

  const { mutate: submitAnswer } = useSubmitAnswer();

  const handleSelect = (idx: number) => {
    if (!currentState.showAnswer) {
      setProblemStates((prev) => ({
        ...prev,
        [problem.question_id]: {
          ...currentState,
          selected: idx,
        },
      }));
    }
  };

  const handleCheck = () => {
    if (currentState.selected === null) return;
    const isCorrect = currentState.selected === parseInt(problem.answer) - 1;

    submitAnswer({
      questionId: problem.question_id,
      correctOnFirstTry: isCorrect,
    });

    setProblemStates((prev) => ({
      ...prev,
      [problem.question_id]: {
        ...currentState,
        showAnswer: true,
      },
    }));
  };

  const handlePrev = () => {
    onPrev();
  };

  const handleNext = () => {
    onNext();
  };

  return (
    <div className='bg-background flex min-h-[90vh] w-full items-center justify-center px-2 py-8'>
      <Card className='dark:bg-card/90 flex min-h-[700px] w-full max-w-4xl min-w-[900px] flex-col justify-between rounded-2xl border bg-white p-0 shadow-lg'>
        <Header
          difficulty={problem.difficulty}
          timeSpent={currentState.timeSpent}
          setTimeSpent={(time) => {
            setProblemStates((prev) => ({
              ...prev,
              [problem.question_id]: {
                ...currentState,
                timeSpent: time,
              },
            }));
          }}
          correctCount={
            currentState.showAnswer && currentState.selected === parseInt(problem.answer) - 1
              ? 1
              : 0
          }
          total={currentState.showAnswer ? 1 : 0}
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
