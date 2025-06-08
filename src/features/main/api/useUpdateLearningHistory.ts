import { useMutation } from '@tanstack/react-query';

import { getCookieValue } from '@/src/shared/lib/cookies';

const updateLearningHistory = async (): Promise<void> => {
  const token = getCookieValue('accessToken');
  if (!token) throw new Error('No access token found in cookies');

  const res = await fetch('/api/main/update', {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });

  if (res.ok) return;

  throw new Error('Failed to update learning history');
};

export const useUpdateLearningHistory = () =>
  useMutation({
    mutationFn: updateLearningHistory,
  });
