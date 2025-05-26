'use client';

import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { Tooltip } from 'react-tooltip';
import { StreakLevelBadge } from './StreakLevelBadge';

export interface StreakData {
  date: string; // 'YYYY-MM-DD'
  count: number;
}

const streakData: StreakData[] = [
  { date: '2025-05-23', count: 1 },
  { date: '2025-05-24', count: 2 },
  { date: '2025-05-25', count: 4 },
  { date: '2025-05-26', count: 6 },
];

const getClassForValue = (value: StreakData | null) => {
  if (!value || value.count === 0) return 'fill-gray-200 dark:fill-gray-700';
  if (value.count >= 6) return 'fill-green-700 dark:fill-green-900';
  if (value.count >= 4) return 'fill-green-500 dark:fill-green-600';
  if (value.count >= 2) return 'fill-green-300 dark:fill-green-300';
  return 'fill-green-100 dark:fill-green-100';
};

const tooltipDataAttrs = (value: StreakData | null) => {
  if (!value?.date) return null;
  return {
    'data-tooltip-id': 'heatmap-tooltip',
    'data-tooltip-content': `${value.date} : ${value.count ?? 0}문제`,
  };
};

export function StreakBoard() {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setFullYear(endDate.getFullYear() - 1);

  return (
    <div className='rounded-xl border border-dashed bg-white p-6 dark:border-gray-700 dark:bg-gray-900'>
      <h3 className='mb-8 text-lg font-semibold text-gray-900 dark:text-white'>스트릭</h3>
      <div className='w-full overflow-x-auto'>
        <div className='relative mx-auto flex max-w-4xl min-w-[700px]'>
          <div className='flex h-full min-h-[140px] w-full flex-col items-center justify-center'>
            <CalendarHeatmap
              startDate={startDate}
              endDate={endDate}
              values={streakData}
              classForValue={getClassForValue}
              showWeekdayLabels
              showMonthLabels={false}
              horizontal
              tooltipDataAttrs={tooltipDataAttrs}
            />
          </div>
        </div>
      </div>
      <Tooltip id='heatmap-tooltip' />
      <div className='flex flex-wrap items-center justify-center gap-3 text-xs'>
        <StreakLevelBadge color='bg-gray-200 dark:bg-gray-700' label='0개' />
        <StreakLevelBadge color='bg-green-100 dark:bg-green-100' label='1개' />
        <StreakLevelBadge color='bg-green-300 dark:bg-green-300' label='2 ~ 3개' />
        <StreakLevelBadge color='bg-green-500 dark:bg-green-600' label='4 ~ 5개' />
        <StreakLevelBadge color='bg-green-700 dark:bg-green-900' label='6개 이상' />
      </div>
      <div className='mt-4 text-center text-xs text-gray-400 dark:text-gray-500'>
        하루에 푼 문제 수에 따라 색이 진해집니다.
      </div>
    </div>
  );
}
