import { getCookieValue } from '@/src/shared/lib/cookies';
import { useQuery } from '@tanstack/react-query';

export interface Recommendation {
  chapterName: string;
  chapterNum: string;
  level: string;
}

export interface RecommendationResponse {
  recommendSets: Recommendation[];
}

const fetchRecommendations = async (): Promise<RecommendationResponse> => {
  const token = getCookieValue('accessToken');
  if (!token) throw new Error('No access token found in cookie');

  const res = await fetch('/api/main/recommendations', {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });

  if (!res.ok) throw new Error('Failed to fetch recommendations');

  return await res.json();
};

export const useRecommendations = () =>
  useQuery<RecommendationResponse>({
    queryKey: ['recommendations'],
    queryFn: fetchRecommendations,
    staleTime: 1000 * 60,
  });
