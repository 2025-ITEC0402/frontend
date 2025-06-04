'use client';

import { useSpecificQuestion } from '@/src/features/practice/api/useSpecificQuestion';
import { ProblemSolver } from '@/src/features/practice/ui/ProblemSolver';
import { Spinner } from '@/src/shared/ui/spinner';
import { useParams } from 'next/navigation';

export default function PracticeByIdPage() {
  const params = useParams();
  const id = parseInt(params.id as string);

  const { data, isLoading, isError } = useSpecificQuestion(id);

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

  return <ProblemSolver problem={data} hideNavigation={true} />;
}
