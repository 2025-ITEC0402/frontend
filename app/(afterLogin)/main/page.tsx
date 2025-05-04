import { AITutorChat } from '@/src/features/main/ui/AITutorChat';
import { LearningAnalytics } from '@/src/features/main/ui/LearningAnalytics';
import { ProblemRecommendation } from '@/src/features/main/ui/ProblemRecommendation';
import { UserDashboard } from '@/src/features/main/ui/UserDashboard';

const userData = {
  userName: 'OOO',
  solvedTodayCount: 5,
  totalSolvedCount: 120,
  currentStreak: 7,
  learningProgress: 65,
};

export default function AfterLoginHome() {
  return (
    <div className='min-h-screen bg-gray-50 dark:bg-[var(--background)]'>
      <main className='mx-auto max-w-7xl space-y-8 px-4 py-8'>
        {/* 상단: 유저 대시보드 */}
        <div>
          <UserDashboard
            userName={userData.userName}
            solvedTodayCount={userData.solvedTodayCount}
            totalSolvedCount={userData.totalSolvedCount}
            currentStreak={userData.currentStreak}
            learningProgress={userData.learningProgress}
          />
        </div>

        {/* 중앙: AI 튜터 챗(좌) + 학습 분석(우) */}
        <div className='grid min-h-[420px] grid-cols-1 gap-6 md:grid-cols-3'>
          <div className='md:col-span-2'>
            <AITutorChat />
          </div>
          <div>
            <LearningAnalytics />
          </div>
        </div>

        {/* 하단: 추천 문제 */}
        <div>
          <ProblemRecommendation />
        </div>
      </main>
    </div>
  );
}
