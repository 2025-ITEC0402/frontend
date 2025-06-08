import React from 'react';

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

export function StatCard({ icon, label, value }: StatCardProps) {
  return (
    <div className='flex items-center gap-3 rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800'>
      {icon}
      <div>
        <p className='text-sm text-gray-500 dark:text-gray-400'>{label}</p>
        <p className='text-lg font-semibold dark:text-white'>{value}</p>
      </div>
    </div>
  );
}
