'use client';

import { Loader2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { toast } from 'sonner';

import { useKakaoLogin } from '@/src/features/auth/hooks/useKakaoLogin';

export default function KakaoRedirectPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const hasCalled = useRef(false);
  const code = searchParams.get('code');

  const { mutate: kakaoLogin } = useKakaoLogin({
    onSuccess: (data) => {
      toast.success('카카오 로그인 성공! 환영합니다.');
      document.cookie = `accessToken=${data.accessToken}; path=/; max-age=3600;`;
      router.replace('/main');
    },
    onError: (error) => {
      toast.error('카카오 로그인에 실패하였습니다.');
      console.error('카카오 로그인 실패:', error);
      router.replace('/');
    },
  });

  useEffect(() => {
    if (!code) {
      toast.error('카카오로부터 인가 코드가 없습니다.');
      router.replace('/');
      return;
    }

    if (!hasCalled.current) {
      hasCalled.current = true;
      kakaoLogin(code);
    }
  }, [code, kakaoLogin, router]);

  return (
    <div className='flex min-h-screen flex-col items-center justify-center gap-6 px-4 text-center'>
      <div className='text-muted-foreground flex items-center gap-2 text-sm'>
        <Loader2 className='h-4 w-4 animate-spin' />
        <span>카카오 로그인 처리 중입니다...</span>
      </div>
    </div>
  );
}
