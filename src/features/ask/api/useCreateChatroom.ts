import { getCookieValue } from '@/src/shared/lib/cookies';
import { CreateChatroomRequest, CreateChatroomResponse } from '@/src/shared/types/chatroom';
import { useMutation } from '@tanstack/react-query';

export function useCreateChatroom() {
  return useMutation<CreateChatroomResponse, Error, CreateChatroomRequest>({
    mutationFn: async ({ content }) => {
      const token = getCookieValue('accessToken');
      if (!token) throw new Error('No access token found in cookies');

      const res = await fetch('/api/ask/new-chat', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      });

      if (!res.ok) {
        const errorBody = await res.json();
        throw new Error(errorBody.message || 'Failed to create chatroom');
      }

      return res.json();
    },
  });
}
