'use client';

import { useRefreshAccessToken } from '@/src/features/auth/hooks/useRefreshAccessToken';
import { useEffect } from 'react';

export default function RefreshTokenProvider() {
  const refresh = useRefreshAccessToken();

  useEffect(() => {
    const token = document.cookie
      .split('; ')
      .find((row) => row.startsWith('accessToken='))
      ?.split('=')[1];

    if (!token && !refresh.isPending) {
      refresh.mutate();
    }
  }, [refresh]);

  return null;
}
