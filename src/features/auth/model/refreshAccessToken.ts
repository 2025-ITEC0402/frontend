export const refreshAccessToken = async (): Promise<string> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/api/auth/refresh`, {
    method: 'POST',
    credentials: 'include',
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('액세스 토큰 재발급 요청에 실패하였습니다.');
  }

  const data = await response.json();
  return data.accessToken;
};
