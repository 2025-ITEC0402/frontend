'use client';

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const data = [
  { name: '1월', value: 65 },
  { name: '2월', value: 72 },
  { name: '3월', value: 80 },
  { name: '4월', value: 85 },
  { name: '5월', value: 90 },
  { name: '6월', value: 88 },
];

const learningAreas = [
  { name: '미분방정식', progress: 85 },
  { name: '라플라스 변환', progress: 70 },
  { name: '푸리에 변환', progress: 60 },
  { name: '행렬과 행렬식', progress: 75 },
];

export function LearningAnalytics() {
  return (
    <div className='rounded-xl border border-dashed bg-white p-6 dark:border-gray-700 dark:bg-[var(--background)]'>
      <h3 className='mb-4 text-lg font-semibold dark:text-white'>학습 분석</h3>

      <div className='mb-6 h-64'>
        <ResponsiveContainer width='100%' height='100%'>
          <AreaChart data={data}>
            <defs>
              <linearGradient id='colorValue' x1='0' y1='0' x2='0' y2='1'>
                <stop offset='5%' stopColor='#3b82f6' stopOpacity={0.8} />
                <stop offset='95%' stopColor='#3b82f6' stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray='3 3'
              stroke={document.documentElement.classList.contains('dark') ? '#374151' : '#e5e7eb'}
            />
            <XAxis
              dataKey='name'
              stroke={document.documentElement.classList.contains('dark') ? '#9ca3af' : '#6b7280'}
            />
            <YAxis
              stroke={document.documentElement.classList.contains('dark') ? '#9ca3af' : '#6b7280'}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: document.documentElement.classList.contains('dark')
                  ? '#1f2937'
                  : 'white',
                border: document.documentElement.classList.contains('dark')
                  ? '1px solid #374151'
                  : '1px solid #e5e7eb',
                borderRadius: '0.5rem',
                color: document.documentElement.classList.contains('dark') ? '#f3f4f6' : '#1f2937',
              }}
            />
            <Area
              type='monotone'
              dataKey='value'
              stroke='#3b82f6'
              fillOpacity={1}
              fill='url(#colorValue)'
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className='space-y-4'>
        {learningAreas.map((area) => (
          <div key={area.name}>
            <div className='mb-1 flex justify-between'>
              <span className='text-sm font-medium dark:text-white'>{area.name}</span>
              <span className='text-sm text-gray-500 dark:text-gray-400'>{area.progress}%</span>
            </div>
            <div className='h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700'>
              <div
                className='h-2.5 rounded-full bg-blue-600'
                style={{ width: `${area.progress}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
