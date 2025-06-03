export function UserDashboardSkeleton() {
  return (
    <div className='animate-pulse rounded-xl border border-gray-100 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800'>
      <div className='mb-6 flex items-center justify-between'>
        <div className='h-7 w-1/3 rounded bg-gray-200 dark:bg-gray-700' />
        <div className='flex gap-2'>
          <div className='h-8 w-24 rounded-md bg-gray-100 dark:bg-gray-700' />
          <div className='h-8 w-20 rounded-md bg-gray-100 dark:bg-gray-700' />
        </div>
      </div>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className='flex flex-col items-center gap-2 rounded-lg bg-gray-50 p-4 dark:bg-gray-900'
          >
            <div className='h-7 w-7 rounded-full bg-gray-200 dark:bg-gray-700' />
            <div className='h-4 w-16 rounded bg-gray-200 dark:bg-gray-700' />
            <div className='h-5 w-10 rounded bg-gray-100 dark:bg-gray-800' />
          </div>
        ))}
      </div>
    </div>
  );
}
