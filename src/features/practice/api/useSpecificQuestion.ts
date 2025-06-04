import { getCookieValue } from '@/src/shared/lib/cookies';
import { Question } from '@/src/shared/types/problem';
import { useQuery } from '@tanstack/react-query';

const fetchQuestion = async (id: number): Promise<Question> => {
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
  return useQuery<Question>({
    queryKey: ['question', id],
    queryFn: () => fetchQuestion(id),
    enabled: !!id,
  });
}
