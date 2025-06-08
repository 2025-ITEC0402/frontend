import { useMutation } from '@tanstack/react-query';

import { getCookieValue } from '@/src/shared/lib/cookies';
import { queryClient } from '@/src/shared/provider/QueryProvider';
import { DeleteChatroomParams } from '@/src/shared/types/chatroom';

export function useDeleteChatroom() {
  return useMutation({
    mutationFn: async ({ chatRoomId }: DeleteChatroomParams) => {
      const token = getCookieValue('accessToken');
      if (!token) throw new Error('No access token found in cookies');

      const res = await fetch(`/api/ask/chat/${chatRoomId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error(`Failed to delete chatroom (status: ${res.status})`);
      }

      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chatList'] });
    },
  });
}
