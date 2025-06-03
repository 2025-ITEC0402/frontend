'use client';

import { useRecommendations } from '@/src/features/main/api/useRecommendations';
import { useStreakInfo } from '@/src/features/main/api/useStreakInfo';
import { useUserInfo } from '@/src/features/main/api/useUserInfo';

import { UserDashboard } from '@/src/features/main/ui/UserDashboard';
import { UserDashboardSkeleton } from '@/src/features/main/ui/UserDashboard/Skeleton';

import { StreakBoard } from '@/src/features/main/ui/StreakBoard';
import { StreakBoardSkeleton } from '@/src/features/main/ui/StreakBoard/Skeleton';

import { ProblemRecommendation } from '@/src/features/main/ui/ProblemRecommendation';
import { ProblemRecommendationSkeleton } from '@/src/features/main/ui/ProblemRecommendation/Skeleton';

import { AITutorChat } from '@/src/features/main/ui/AITutorChat';

export default function AfterLoginHome() {
  const { data: userData, isLoading: isUserLoading, isError: isUserError } = useUserInfo();

  const {
    data: streakDataRaw,
    isLoading: isStreakLoading,
    isError: isStreakError,
  } = useStreakInfo();

  const {
    data: recommendationData,
    isLoading: isRecLoading,
    isError: isRecError,
  } = useRecommendations();

  const streakData =
    streakDataRaw?.streakSets.map(({ date, solvedCount }) => ({
      date,
      count: solvedCount,
    })) ?? [];

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-[var(--background)]'>
      <main className='mx-auto max-w-7xl space-y-8 px-4 py-8'>
        {isUserLoading ? (
          <UserDashboardSkeleton />
        ) : isUserError || !userData ? (
          <div className='text-sm text-red-500'>유저 정보를 불러올 수 없습니다.</div>
        ) : (
          <UserDashboard
            userName={userData.userName}
            solvedTodayCount={userData.solvedTodayCount}
            totalSolvedCount={userData.totalSolvedCount}
            currentStreak={userData.currentStreak}
          />
        )}

        {isStreakLoading ? (
          <StreakBoardSkeleton />
        ) : isStreakError || !streakDataRaw ? (
          <div className='text-sm text-red-500'>스트릭 정보를 불러올 수 없습니다.</div>
        ) : (
          <StreakBoard streakData={streakData} />
        )}

        <AITutorChat />

        {isRecLoading ? (
          <ProblemRecommendationSkeleton />
        ) : isRecError || !recommendationData ? (
          <div className='text-sm text-red-500'>추천 문제를 불러올 수 없습니다.</div>
        ) : (
          <ProblemRecommendation data={recommendationData.recommendSets} />
        )}
      </main>
    </div>
  );
}
