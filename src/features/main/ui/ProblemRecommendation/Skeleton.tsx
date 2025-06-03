export function ProblemRecommendationSkeleton() {
  return (
    <div className='animate-pulse rounded-xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800'>
      <div className='mb-6 h-6 w-1/4 rounded bg-gray-300 dark:bg-gray-700' />
      <div className='space-y-4'>
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className='flex items-center gap-4 rounded-lg bg-gray-50 p-4 dark:bg-gray-900'
          >
            <div className='h-10 w-10 rounded bg-gray-200 dark:bg-gray-700' />
            <div className='flex-1 space-y-2'>
              <div className='h-4 w-1/2 rounded bg-gray-200 dark:bg-gray-700' />
              <div className='h-3 w-1/3 rounded bg-gray-100 dark:bg-gray-800' />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
