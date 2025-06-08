import { cn } from '@/src/shared/lib/utils';

export function IconButton({
  icon,
  onClick,
  label,
  danger = false,
}: {
  icon: React.ReactNode;
  onClick: () => void;
  label: string;
  danger?: boolean;
}) {
  return (
    <span
      className={cn(
        'cursor-pointer p-1',
        danger
          ? 'text-gray-400 hover:text-red-600 dark:hover:text-red-400'
          : 'text-gray-400 hover:text-gray-700 dark:hover:text-white',
      )}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      role='button'
      tabIndex={0}
      aria-label={label}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.stopPropagation();
          onClick();
        }
      }}
    >
      {icon}
    </span>
  );
}
