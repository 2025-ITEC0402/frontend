'use client';

import { IconButton } from '@/src/features/ask/ui/ChatRoomList/IconButton';
import { cn } from '@/src/shared/lib/utils';
import { Chatroom } from '@/src/shared/types/chatroom';
import { MessageSquare, Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface ChatRoomListProps {
  chatList: Chatroom[];
  selectedId: number | null;
  onSelect: (id: number) => void;
  onEditTitle: (id: number, newTitle: string) => void;
  onDelete: (id: number) => void;
}

export function ChatRoomList({
  chatList,
  selectedId,
  onSelect,
  onEditTitle,
  onDelete,
}: ChatRoomListProps) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState('');

  const handleEditClick = (id: number, currentTitle: string) => {
    setEditingId(id);
    setEditValue(currentTitle);
  };

  const handleEditSubmit = (id: number) => {
    const trimmed = editValue.trim();
    if (trimmed && trimmed !== chatList.find((c) => c.chatRoomId === id)?.roomTitle) {
      onEditTitle(id, trimmed);
    }
    setEditingId(null);
  };

  const truncateTitle = (title: string) => (title.length > 12 ? `${title.slice(0, 11)}...` : title);

  if (chatList.length === 0) {
    return <div className='text-sm text-gray-500'>채팅방이 없습니다.</div>;
  }

  return (
    <div className='space-y-1'>
      {chatList.map((chatroom) => {
        const isEditing = editingId === chatroom.chatRoomId;

        return (
          <div key={chatroom.chatRoomId} className='flex items-center gap-2'>
            <button
              onClick={() => onSelect(chatroom.chatRoomId)}
              className={cn(
                'flex flex-1 items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors',
                selectedId === chatroom.chatRoomId
                  ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white'
                  : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800/50',
              )}
            >
              <MessageSquare className='h-4 w-4 flex-shrink-0 opacity-60' />

              {isEditing ? (
                <input
                  className='flex-1 rounded border px-2 py-1 text-sm'
                  value={editValue}
                  autoFocus
                  onChange={(e) => setEditValue(e.target.value)}
                  onBlur={() => handleEditSubmit(chatroom.chatRoomId)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleEditSubmit(chatroom.chatRoomId);
                    if (e.key === 'Escape') setEditingId(null);
                  }}
                />
              ) : (
                <div className='flex flex-1 items-center justify-between'>
                  <span className='truncate text-sm' title={chatroom.roomTitle}>
                    {truncateTitle(chatroom.roomTitle)}
                  </span>
                  <div className='flex items-center gap-1'>
                    <IconButton
                      icon={<Pencil className='h-4 w-4' />}
                      onClick={() => handleEditClick(chatroom.chatRoomId, chatroom.roomTitle)}
                      label='채팅방 제목 수정'
                    />
                    <IconButton
                      icon={<Trash2 className='h-4 w-4' />}
                      onClick={() => onDelete(chatroom.chatRoomId)}
                      label='채팅방 삭제'
                      danger
                    />
                  </div>
                </div>
              )}
            </button>
          </div>
        );
      })}
    </div>
  );
}
