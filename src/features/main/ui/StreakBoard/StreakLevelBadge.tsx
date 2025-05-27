interface StreakLevelBadgeProps {
  color: string;
  label: string;
}

export const StreakLevelBadge = ({ color, label }: StreakLevelBadgeProps) => (
  <>
    <span
      className={`inline-block h-4 w-4 rounded border border-gray-300 dark:border-gray-600 ${color}`}
    ></span>
    <span className='text-gray-500 dark:text-gray-400'>{label}</span>
  </>
);
