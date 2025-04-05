type KakaoLoginResponse = {
  accessToken: string;
  refreshToken: string;
};

export const requestKakaoLogin = async (code: string): Promise<KakaoLoginResponse> => {
  const response = await fetch('/api/oauth/kakao', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ code: code }),
  });

  if (!response.ok) {
    throw new Error('카카오 로그인 요청에 실패하였습니다.');
  }

  return response.json();
};
