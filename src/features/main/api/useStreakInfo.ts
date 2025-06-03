import { getCookieValue } from '@/src/shared/lib/cookies';
import { useQuery } from '@tanstack/react-query';

export interface StreakItem {
  date: string;
  solvedCount: number;
}

export interface StreakResponse {
  streakSets: StreakItem[];
}

const fetchStreakInfo = async (): Promise<StreakResponse> => {
  const token = getCookieValue('accessToken');

  if (!token) throw new Error('No access token found in cookie');

  const res = await fetch('/api/main/streak', {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch streak info');
  }

  return await res.json();
};

export const useStreakInfo = () =>
  useQuery<StreakResponse>({
    queryKey: ['streakInfo'],
    queryFn: fetchStreakInfo,
    staleTime: 1000 * 60,
  });
