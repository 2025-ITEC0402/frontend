import { useEffect } from 'react';

interface TimerProps {
  timeSpent: number;
  setTimeSpent: (time: number) => void;
}

export function Timer({ timeSpent, setTimeSpent }: TimerProps) {
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent(timeSpent + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeSpent, setTimeSpent]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return <span className='text-muted-foreground font-mono text-sm'>{formatTime(timeSpent)}</span>;
}
