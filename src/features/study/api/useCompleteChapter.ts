import { useMutation } from '@tanstack/react-query';

import { getCookieValue } from '@/src/shared/lib/cookies';

interface CompleteChapterParams {
  chapterId: number;
}

export function useCompleteChapter() {
  return useMutation({
    mutationFn: async ({ chapterId }: CompleteChapterParams) => {
      const token = getCookieValue('accessToken');
      if (!token) throw new Error('No access token found in cookies');

      const response = await fetch(`/api/study/${chapterId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to complete chapter');
      }

      return response.json();
    },
  });
}
