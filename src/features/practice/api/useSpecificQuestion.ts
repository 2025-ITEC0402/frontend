import { useQuery } from '@tanstack/react-query';

import { getCookieValue } from '@/src/shared/lib/cookies';
import { Problem } from '@/src/shared/types/problem';

const fetchQuestion = async (id: number): Promise<Problem> => {
  const token = getCookieValue('accessToken');

  if (!token) {
    throw new Error('Access token not found in cookies');
  }

  const res = await fetch(`/api/practice/specific-problem/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error('문제 불러오기 실패');
  }

  const data = await res.json();
  return data;
};

export function useSpecificQuestion(id: number) {
  return useQuery<Problem>({
    queryKey: ['question', id],
    queryFn: () => fetchQuestion(id),
    enabled: !!id,
  });
}
