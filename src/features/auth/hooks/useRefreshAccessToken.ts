'use client';

import { useMutation } from '@tanstack/react-query';
import { refreshAccessToken } from '../model/refreshAccessToken';

export const useRefreshAccessToken = () => {
  return useMutation({
    mutationFn: refreshAccessToken,
    onSuccess: (accessToken) => {
      document.cookie = `accessToken=${accessToken}; path=/; max-age=3600;`;
    },
    onError: (error) => {
      console.error('액세스 토큰 재발급 실패: ', error);
      window.location.href = '/(beforeLogin)';
    },
  });
};
