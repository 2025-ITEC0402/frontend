import { useMutation } from '@tanstack/react-query';

import { getCookieValue } from '@/src/shared/lib/cookies';

interface SubmitAnswerParams {
  questionId: number;
  correctOnFirstTry: boolean;
}

export function useSubmitAnswer() {
  return useMutation({
    mutationFn: async ({ questionId, correctOnFirstTry }: SubmitAnswerParams) => {
      const token = getCookieValue('accessToken');

      if (!token) throw new Error('No access token found in cookies');

      const res = await fetch('/api/practice/check-problem', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          questionId,
          correctOnFirstTry: String(correctOnFirstTry),
        }),
      });

      if (!res.ok) {
        throw new Error('정답 제출 실패');
      }

      return res.json();
    },
  });
}
