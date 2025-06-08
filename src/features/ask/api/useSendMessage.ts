import { getCookieValue } from '@/src/shared/lib/cookies';
import { SendMessageParams, SendMessageResponse } from '@/src/shared/types/chatroom';
import { useMutation } from '@tanstack/react-query';

export function useSendMessage() {
  return useMutation<SendMessageResponse, Error, SendMessageParams>({
    mutationFn: async ({ chatRoomId, content, imageFile }) => {
      const token = getCookieValue('accessToken');
      if (!token) throw new Error('No access token found in cookies');

      const formData = new FormData();
      if (content) formData.append('query', content);
      if (imageFile instanceof File) formData.append('img', imageFile);

      for (const [key, value] of formData.entries()) {
        console.log(`FormData - ${key}:`, value);
      }

      const res = await fetch(`/api/ask/chat/${chatRoomId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) {
        const errorBody = await res.json().catch(() => ({}));
        throw new Error(errorBody.message || 'Failed to send message');
      }

      return res.json();
    },
  });
}
