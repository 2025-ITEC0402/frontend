'use client';

import { useKakaoLogin } from '@/src/features/auth/hooks/useKakaoLogin';
import { Loader2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function KakaoRedirectPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const kakaoLogin = useKakaoLogin();

  useEffect(() => {
    if (!code) {
      alert('카카오로부터 제공된 인가 코드가 없습니다.');
      router.replace('/');
      return;
    }

    if (!kakaoLogin.isPending) {
      kakaoLogin.mutate(code, {
        onSuccess: (data) => {
          localStorage.setItem('accessToken', data.accessToken);
          localStorage.setItem('refreshToken', data.refreshToken); // 개발 용으로 임시 저장
          router.replace('/main');
        },
        onError: (error) => {
          console.error('카카오 로그인 실패: ', error);
          alert('카카오 로그인에 실패했습니다. 잠시 후 다시 시도해주세요.');
          router.replace('/');
        },
      });
    }
  }, [code]);

  return (
    <div className='flex min-h-screen flex-col items-center justify-center gap-6 px-4 text-center'>
      <div className='text-muted-foreground flex items-center gap-2 text-sm'>
        <Loader2 className='h-4 w-4 animate-spin' />
        <span>카카오 로그인 처리 중입니다...</span>
      </div>
    </div>
  );
}
