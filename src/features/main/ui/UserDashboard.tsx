'use client';

import { Button } from '@/src/shared/ui/button';
import { LogOut, Target, TrendingUp, Trophy } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface UserDashboardProps {
  userName: string;
  solvedTodayCount: number;
  totalSolvedCount: number;
  currentStreak: number;
  learningProgress: number;
}

export function UserDashboard({
  userName,
  solvedTodayCount,
  totalSolvedCount,
  currentStreak,
  learningProgress,
}: UserDashboardProps) {
  const router = useRouter();

  const handleLogout = () => {
    document.cookie = 'accessToken=; path=/; max-age=0;';
    toast.success('성공적으로 로그아웃 되었습니다.');
    router.replace('/');
  };

  return (
    <div className='w-full rounded-xl border border-none bg-white p-2 dark:border-gray-700 dark:bg-[var(--background)]'>
      <div className='flex flex-col gap-4'>
        <div className='flex items-center justify-between p-4'>
          <div>
            <h2 className='text-xl font-semibold dark:text-white'>{userName}님, 안녕하세요!</h2>
            <p className='text-muted-foreground text-sm dark:text-gray-400'>
              오늘 푼 문제: <span className='text-primary font-bold'>{solvedTodayCount}개</span>
            </p>
          </div>
          <Button
            onClick={handleLogout}
            variant='outline'
            size='sm'
            className='gap-1 hover:opacity-80'
          >
            <LogOut className='h-4 w-4' />
            로그아웃
          </Button>
        </div>

        <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
          <div className='flex items-center gap-3 rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800'>
            <Trophy className='h-6 w-6 text-yellow-500' />
            <div>
              <p className='text-sm text-gray-500 dark:text-gray-400'>연속 학습</p>
              <p className='text-lg font-semibold dark:text-white'>{currentStreak}일</p>
            </div>
          </div>

          <div className='flex items-center gap-3 rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800'>
            <Target className='h-6 w-6 text-blue-500' />
            <div>
              <p className='text-sm text-gray-500 dark:text-gray-400'>총 푼 문제</p>
              <p className='text-lg font-semibold dark:text-white'>{totalSolvedCount}개</p>
            </div>
          </div>

          <div className='flex items-center gap-3 rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800'>
            <TrendingUp className='h-6 w-6 text-green-500' />
            <div>
              <p className='text-sm text-gray-500 dark:text-gray-400'>학습 진행도</p>
              <p className='text-lg font-semibold dark:text-white'>{learningProgress}%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
