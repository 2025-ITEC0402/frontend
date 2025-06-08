'use client';

import { CalendarCheck, Target, TrendingUp } from 'lucide-react';

import { LogoutButton } from '@/src/features/main/ui/UserDashboard/LogoutButton';
import { RefreshHistoryButton } from '@/src/features/main/ui/UserDashboard/RefreshHistoryButton';

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
