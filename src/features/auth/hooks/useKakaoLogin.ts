'use client';

import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { requestKakaoLogin } from '../model/requestKakaoLogin';

interface KakaoLoginResponse {
  accessToken: string;
}

export const useKakaoLogin = (
  options: UseMutationOptions<
    KakaoLoginResponse, // 성공 타입
    unknown, // 에러 타입
    string // 변수 타입
  >,
) => {
  return useMutation({
    mutationKey: ['kakaoLogin'],
    mutationFn: (code: string) => requestKakaoLogin(code),
    ...options,
  });
};
