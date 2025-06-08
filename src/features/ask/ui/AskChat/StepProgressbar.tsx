'use client';

import { CheckCircle2, Loader2 } from 'lucide-react';
import { useEffect, useRef } from 'react';

const steps = [
  { label: '질문 분석', desc: 'AI가 질문을 분석 중입니다..' },
  { label: '답변 생성', desc: 'AI가 답변을 생성 중입니다..' },
  { label: '최종 정리', desc: 'AI가 답변을 정리 중입니다..' },
];

interface Props {
  loading: boolean;
  step: number;
  setStep: (s: number) => void;
}

export default function StepProgressBar({ loading, step, setStep }: Props) {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!loading) {
      setStep(0);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    setStep(0);
    let current = 0;

    intervalRef.current = setInterval(() => {
      current += 1;
      if (current < 3) {
        setStep(current);
      } else {
        clearInterval(intervalRef.current!);
        intervalRef.current = null;
      }
    }, 10000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [loading, setStep]);

  return (
    <div className='mx-auto flex w-full max-w-lg flex-col items-center justify-center'>
      <div className='mt-10 mb-8 flex w-full items-end justify-between gap-2'>
        {steps.map((s, idx) => {
          const isActive = step === idx;
          const isDone = step > idx;
          return (
            <div key={s.label} className='flex flex-1 flex-col items-center'>
              <div
                className={`relative flex h-12 w-12 items-center justify-center rounded-full border-2 text-lg font-bold transition-all duration-300 ${
                  isActive
                    ? 'scale-110 border-blue-500 bg-blue-50 text-blue-700 shadow-lg'
                    : isDone
                      ? 'border-green-400 bg-green-50 text-green-500'
                      : 'border-gray-200 bg-gray-50 text-gray-300'
                } `}
              >
                {isDone ? <CheckCircle2 className='h-7 w-7 text-green-400' /> : idx + 1}
                {isActive && !isDone && (
                  <Loader2 className='absolute h-5 w-5 animate-spin text-blue-200' />
                )}
              </div>
              <span
                className={`mt-2 text-xs font-medium tracking-tight ${isActive ? 'text-blue-700' : isDone ? 'text-green-500' : 'text-gray-400'}`}
              >
                {s.label}
              </span>
            </div>
          );
        })}
      </div>
      <div className='flex min-h-[2rem] items-center gap-2 text-base font-semibold text-blue-700 transition-all duration-300'>
        {step < steps.length ? (
          steps[step].desc
        ) : (
          <span className='flex items-center gap-1 text-green-600'>
            <CheckCircle2 className='h-5 w-5' /> 완료!
          </span>
        )}
      </div>
    </div>
  );
}
