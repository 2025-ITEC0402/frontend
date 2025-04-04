'use client';

import { useMutation } from '@tanstack/react-query';
import { requestKakaoLogin } from '../model/kakaoAuthApi';

export const useKakaoLogin = () => {
  return useMutation({
    mutationFn: (code: string) => requestKakaoLogin(code),
  });
};
