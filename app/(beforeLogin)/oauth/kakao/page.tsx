'use client';

import { useKakaoLogin } from '@/src/features/auth/hooks/useKakaoLogin';
import { Loader2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function KakaoRedirectPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get('code');

  const { mutate: kakaoLogin, data, isSuccess, isError, error } = useKakaoLogin();

  useEffect(() => {
    if (!code) {
      alert('카카오로부터 제공된 인가 코드가 없습니다.');
      router.replace('/');
      return;
    }
    kakaoLogin(code);
  }, [code, kakaoLogin, router]);

  useEffect(() => {
    if (isSuccess && data?.accessToken) {
      alert('카카오 로그인 성공!');
      document.cookie = `accessToken=${data.accessToken}; path=/; max-age=3600;`;
      router.replace('/main');
    } else if (isError) {
      alert('카카오 소셜 로그인에 실패했습니다.');
      console.error('카카오 로그인 실패:', error);
      router.replace('/');
    }
  }, [isSuccess, isError, data, error, router]);

  return (
    <div className='flex min-h-screen flex-col items-center justify-center gap-6 px-4 text-center'>
      <div className='text-muted-foreground flex items-center gap-2 text-sm'>
        <Loader2 className='h-4 w-4 animate-spin' />
        <span>카카오 로그인 처리 중입니다...</span>
      </div>
    </div>
  );
}
