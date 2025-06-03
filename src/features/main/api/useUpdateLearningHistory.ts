import { getCookieValue } from '@/src/shared/lib/cookies';
import { useMutation } from '@tanstack/react-query';

const updateLearningHistory = async (): Promise<void> => {
  const token = getCookieValue('accessToken');
  if (!token) throw new Error('No access token found in cookies');

  const res = await fetch('/api/main/learning-history', {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });

  if (res.status === 204) return;

  throw new Error('Failed to update learning history');
};

export const useUpdateLearningHistory = () =>
  useMutation({
    mutationFn: updateLearningHistory,
  });
