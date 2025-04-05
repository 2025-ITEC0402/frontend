'use client';

import { useMutation } from '@tanstack/react-query';
import { requestKakaoLogin } from '../model/requestKakaoLogin';

export const useKakaoLogin = () => {
  return useMutation({
    mutationKey: ['kakaoLogin'],
    mutationFn: (code: string) => requestKakaoLogin(code),
  });
};
