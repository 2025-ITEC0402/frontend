import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest, { params }: { params: { chatRoomId: number } }) {
  const token = req.headers.get('authorization');

  if (!token || !token.startsWith('Bearer ')) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { chatRoomId } = params;
  const body = await req.json();
  const { newTitle } = body;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/chatroom/${chatRoomId}`,
      {
        method: 'PUT',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ newTitle }),
      },
    );

    if (!response.ok) {
      throw new Error(`Backend response failed with status ${response.status}`);
    }

    return NextResponse.json({ message: 'Title updated successfully' });
  } 
  catch (error) {
    console.error('Failed to update chatroom title:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { chatRoomId: number } }) {
  const token = req.headers.get('authorization');

  if (!token || !token.startsWith('Bearer ')) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { chatRoomId } = params;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/chatroom/${chatRoomId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: token,
          Accept: 'application/json',
        },
      },
    );

    if (!response.ok) {
      throw new Error(`Backend response failed with status ${response.status}`);
    }

    return NextResponse.json({ message: 'Chatroom deleted successfully' });
  } 
  catch (error) {
    console.error('Failed to delete chatroom:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
