'use client';

import KakaoLoginImage from '@/public/images/kakao_login_large_wide.png';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function KakaoLoginButton() {
  const router = useRouter();

  const handleLogin = () => {
    const REST_API_KEY = process.env.KAKAO_REST_API_KEY;
    const REDIRECT_URI = process.env.KAKAO_REDIRECT_URI;
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

    router.push(kakaoAuthUrl);
  };

  return (
    <button onClick={handleLogin}>
      <Image src={KakaoLoginImage} alt='카카오 로그인 버튼' width={260} height={60} />
    </button>
  );
}
