import { AITutorChat } from '@/src/features/main/ui/AITutorChat';
import { ProblemRecommendation } from '@/src/features/main/ui/ProblemRecommendation';
import { StreakBoard } from '@/src/features/main/ui/StreakBoard';
import { UserDashboard } from '@/src/features/main/ui/UserDashboard';

const userData = {
  userName: 'Admin',
  solvedTodayCount: 5,
  totalSolvedCount: 120,
  currentStreak: 7
};

export default function AfterLoginHome() {
  return (
    <div className='min-h-screen bg-gray-50 dark:bg-[var(--background)]'>
      <main className='mx-auto max-w-7xl space-y-8 px-4 py-8'>
        <UserDashboard
          userName={userData.userName}
          solvedTodayCount={userData.solvedTodayCount}
          totalSolvedCount={userData.totalSolvedCount}
          currentStreak={userData.currentStreak}
        />
        <StreakBoard />
        <AITutorChat />
        <ProblemRecommendation />
      </main>
    </div>
  );
}
