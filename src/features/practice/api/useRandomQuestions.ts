import { useQuery } from '@tanstack/react-query';

import { getCookieValue } from '@/src/shared/lib/cookies';

export interface RandomQuestion {
  question_id: number;
  title: string;
  choice1: string;
  choice2: string;
  choice3: string;
  choice4: string;
  answer: string;
  explanation: string;
  difficulty: string;
  chapter: string;
  aiSummary: string;
}

export interface RandomQuestionsResponse {
  questionSets: RandomQuestion[];
}

const fetchRandomQuestions = async (): Promise<RandomQuestionsResponse> => {
  const token = getCookieValue('accessToken');
  if (!token) throw new Error('No access token found in cookie');

  const res = await fetch('/api/practice/random-problem', {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch random questions');
  }

  return res.json();
};

export const useRandomQuestions = () =>
  useQuery<RandomQuestionsResponse>({
    queryKey: ['randomQuestions'],
    queryFn: fetchRandomQuestions,
    staleTime: 1000 * 60,
  });
