import { getCookieValue } from '@/src/shared/lib/cookies';
import { Chatroom } from '@/src/shared/types/chatroom';
import { useQuery } from '@tanstack/react-query';

const fetchChatList = async (): Promise<Chatroom[]> => {
  const token = getCookieValue('accessToken');

  if (!token) {
    throw new Error('No access token found in cookies');
  }

  const res = await fetch('/api/ask/chat', {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch chatList');
  }

  const data = await res.json();

  return Array.isArray(data.chatRoomInfos) ? data.chatRoomInfos : [];
};

export function useFetchChatList() {
  return useQuery<Chatroom[]>({
    queryKey: ['chatList'],
    queryFn: fetchChatList,
    staleTime: 1000 * 60 * 5,
  });
}
