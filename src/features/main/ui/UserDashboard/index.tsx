'use client';

import { LogoutButton } from '@/src/features/main/ui/UserDashboard/LogoutButton';
import { RefreshHistoryButton } from '@/src/features/main/ui/UserDashboard/RefreshHistoryButton';
import { CalendarCheck, Target, TrendingUp } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { StatCard } from './StatCard';

export interface UserDashboardProps {
  userName: string;
  currentStreak: number;
  solvedTodayCount: number;
  totalSolvedCount: number;
}

export function UserDashboard({
  userName,
  solvedTodayCount,
  totalSolvedCount,
  currentStreak,
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
          <h2 className='text-2xl font-semibold dark:text-white'>{userName} 님, 안녕하세요!</h2>
          <div className='flex gap-2'>
            <RefreshHistoryButton />
            <LogoutButton />
          </div>
        </div>

        <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
          <StatCard
            icon={<TrendingUp className='h-6 w-6 text-green-500' />}
            label='연속 학습'
            value={`${currentStreak}일`}
          />
          <StatCard
            icon={<CalendarCheck className='h-6 w-6 text-blue-500' />}
            label='오늘 푼 문제'
            value={`${solvedTodayCount}개`}
          />
          <StatCard
            icon={<Target className='h-6 w-6 text-purple-500' />}
            label='총 푼 문제'
            value={`${totalSolvedCount}개`}
          />
        </div>
      </div>
    </div>
  );
}
