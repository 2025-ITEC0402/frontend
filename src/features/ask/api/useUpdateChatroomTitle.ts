import { getCookieValue } from '@/src/shared/lib/cookies';
import { queryClient } from '@/src/shared/provider/QueryProvider';
import { UpdateTitleParams } from '@/src/shared/types/chatroom';
import { useMutation } from '@tanstack/react-query';

export function useUpdateChatroomTitle() {
  return useMutation({
    mutationFn: async ({ chatRoomId, newTitle }: UpdateTitleParams) => {
      const token = getCookieValue('accessToken');
      if (!token) throw new Error('No access token found in cookies');

      const res = await fetch(`/api/ask/chat/${chatRoomId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newTitle }),
      });

      if (!res.ok) {
        throw new Error('Failed to update chatroom title');
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chatList'] });
    },
  });
}
