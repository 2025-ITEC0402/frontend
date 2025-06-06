import { getCookieValue } from '@/src/shared/lib/cookies';
import { ChatroomDetailResponse } from '@/src/shared/types/chatroom';
import { useQuery } from '@tanstack/react-query';

const fetchChatroomDetail = async (chatRoomId: number): Promise<ChatroomDetailResponse> => {
  const token = getCookieValue('accessToken');
  if (!token) throw new Error('No access token found in cookies');

  const res = await fetch(`/api/ask/chat/${chatRoomId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch chatroom detail');
  }

  return res.json();
};

export function useFetchChatroomDetail(chatRoomId: number | null) {
  return useQuery<ChatroomDetailResponse>({
    queryKey: ['chatroomDetail', chatRoomId],
    queryFn: () => {
      if (chatRoomId === null) throw new Error('chatRoomId is null');
      return fetchChatroomDetail(chatRoomId);
    },
    enabled: chatRoomId !== null,
    staleTime: 1000 * 60 * 5,
  });
}
