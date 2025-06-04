'use client';

import { useUpdateLearningHistory } from '@/src/features/main/api/useUpdateLearningHistory';
import { queryClient } from '@/src/shared/provider/QueryProvider';
import { Button } from '@/src/shared/ui/button';
import { RefreshCw } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function RefreshHistoryButton() {
  const router = useRouter();
  const { mutate, isPending } = useUpdateLearningHistory();

  const handleRefresh = () => {
    mutate(undefined, {
      onSuccess: () => {
        queryClient.invalidateQueries();
        router.refresh();
        toast.success('히스토리가 갱신되었습니다!');
      },
      onError: () => toast.error('갱신에 실패했습니다.'),
    });
  };

  return (
    <Button
      onClick={handleRefresh}
      variant='outline'
      size='sm'
      className='gap-1 hover:opacity-80'
      disabled={isPending}
    >
      <RefreshCw className='h-4 w-4' />
      {isPending ? '갱신 중...' : '히스토리 갱신'}
    </Button>
  );
}
