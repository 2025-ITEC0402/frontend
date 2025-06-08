import { cn } from '@/src/shared/lib/utils';
import { Loader2 } from 'lucide-react';

interface SpinnerProps extends React.ComponentPropsWithoutRef<typeof Loader2> {}

export function Spinner({ className, ...props }: SpinnerProps) {
  return <Loader2 className={cn('h-8 w-8 animate-spin', className)} {...props} />;
}
