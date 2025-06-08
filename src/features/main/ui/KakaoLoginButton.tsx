'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import KakaoLoginImage from '@/public/images/kakao_login_large_wide.png';
import { getKakaoLoginUrl } from '@/src/shared/lib/OAuth';

export default function KakaoLoginButton() {
  const router = useRouter();

  const handleLogin = () => {
    const kakaoAuthUrl = getKakaoLoginUrl();
    router.push(kakaoAuthUrl);
  };

  return (
    <button className='cursor-pointer' onClick={handleLogin}>
      <Image src={KakaoLoginImage} alt='카카오 로그인 버튼' width={260} height={60} />
    </button>
  );
}
