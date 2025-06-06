export interface Chatroom {
  chatRoomId: number;
  roomTitle: string;
}

export interface CreateChatroomRequest {
  content: string;
}

export interface CreateChatroomResponse {
  chatroomId: number;
  title: string;
  role: string;
  answer: string;
  created_at: string;
}

export interface ChatroomDetailResponse {
  chatRoomId: number;
  roomTitle: string;
  messageList: Message[];
}

export interface SendMessageParams {
  chatRoomId: number;
  content: string;
}

export interface SendMessageResponse {
  chatroom_id: number;
  role: string;
  answer: string;
  created_at: string;
}

export interface DeleteChatroomParams {
  chatRoomId: number;
}

export interface UpdateTitleParams {
  chatRoomId: number;
  newTitle: string;
}

export interface Message {
  messageId: string;
  senderType: 'USER' | 'AI';
  content: string;
  createdAt: Date;
  imageUrl?: string;
}
