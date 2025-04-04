'use client';

import { useQuery } from '@tanstack/react-query';
import { requestKakaoLogin } from '../model/requestKakaoLogin';

export const useKakaoLogin = (code: string) => {
  return useQuery({
    queryKey: ['kakaoLogin', code],
    queryFn: () => requestKakaoLogin(code),
    enabled: !!code,
  });
};
