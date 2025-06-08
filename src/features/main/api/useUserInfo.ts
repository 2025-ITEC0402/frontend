import { useQuery } from '@tanstack/react-query';

import { getCookieValue } from '@/src/shared/lib/cookies';

export interface UserData {
  userName: string;
  solvedTodayCount: number;
  totalSolvedCount: number;
  currentStreak: number;
}

const fetchUserInfo = async (): Promise<UserData> => {
  const token = getCookieValue('accessToken');

  if (!token) throw new Error('No access token found in cookies');

  const res = await fetch('/api/main/info', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error('Failed to fetch user info');

  const data = await res.json();

  return {
    userName: data.name,
    solvedTodayCount: data.todaySolved,
    totalSolvedCount: data.allTimeSolved,
    currentStreak: data.streakDays,
  };
};

export const useUserInfo = () =>
  useQuery<UserData>({
    queryKey: ['userInfo'],
    queryFn: fetchUserInfo,
    staleTime: 1000 * 60,
  });
