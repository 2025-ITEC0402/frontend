import { Clock, Trophy } from 'lucide-react';

import { Timer } from '@/src/features/practice/ui/Timer';
import { Badge } from '@/src/shared/ui/badge';
import { Progress } from '@/src/shared/ui/progress';

export function Header({
  difficulty,
  timeSpent,
  setTimeSpent,
  correctCount,
  total,
  progress,
}: {
  difficulty: string;
  timeSpent: number;
  setTimeSpent: (t: number) => void;
  correctCount: number;
  total: number;
  progress: number;
}) {
  return (
    <div className='border-b p-4'>
      <div className='flex items-center justify-between'>
        <Badge variant='outline' className='flex items-center gap-2'>
          <Trophy className='h-4 w-4' />
          {difficulty}
        </Badge>
        <div className='flex items-center gap-4'>
          <div className='flex items-center gap-2'>
            <Clock className='text-muted-foreground h-4 w-4' />
            <Timer timeSpent={timeSpent} setTimeSpent={setTimeSpent} />
          </div>
          <div className='text-muted-foreground text-sm'>
            정답률: {correctCount}/{total || 0}
          </div>
        </div>
      </div>
      <div className='mt-4'>
        <Progress value={progress} className='h-2' />
      </div>
    </div>
  );
}
