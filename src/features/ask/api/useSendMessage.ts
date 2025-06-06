import { getCookieValue } from '@/src/shared/lib/cookies';
import { SendMessageParams, SendMessageResponse } from '@/src/shared/types/chatroom';
import { useMutation } from '@tanstack/react-query';

export function useSendMessage() {
  return useMutation<SendMessageResponse, Error, SendMessageParams>({
    mutationFn: async ({ chatRoomId, content }) => {
      const token = getCookieValue('accessToken');
      if (!token) throw new Error('No access token found in cookies');

      const res = await fetch(`/api/ask/chat/${chatRoomId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      });

      if (!res.ok) {
        const errorBody = await res.json().catch(() => ({}));
        throw new Error(errorBody.message || 'Failed to send message');
      }

      return res.json();
    },
  });
}
