export function StreakBoardSkeleton() {
  return (
    <div className='animate-pulse rounded-xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800'>
      <div className='mb-4 h-6 w-1/4 rounded bg-gray-300 dark:bg-gray-700' />
      <div className='flex h-24 items-end gap-2'>
        {Array.from({ length: 14 }).map((_, i) => (
          <div
            key={i}
            className='w-4 rounded bg-gray-200 dark:bg-gray-600'
            style={{ height: `${Math.random() * 60 + 20}px` }}
          />
        ))}
      </div>
    </div>
  );
}
