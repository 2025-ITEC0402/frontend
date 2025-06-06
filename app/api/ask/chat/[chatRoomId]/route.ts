import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { chatRoomId: number } }) {
  const token = req.headers.get('authorization');
  const { chatRoomId } = await params;

  if (!token || !token.startsWith('Bearer ')) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/chatroom/${chatRoomId}`,
      {
        method: 'GET',
        headers: {
          Authorization: token,
          Accept: 'application/json',
        },
      },
    );

    if (!response.ok) {
      throw new Error(`Backend responded with status ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } 
  catch (error) {
    console.error('Failed to fetch chatroom detail:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest, { params }: { params: { chatRoomId: number } }) {
  const token = req.headers.get('authorization');

  if (!token || !token.startsWith('Bearer ')) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { chatRoomId } = await params;
  const body = await req.json();
  const { content } = body;

  if (typeof content !== 'string' || !content.trim()) {
    return NextResponse.json({ message: 'Invalid request body' }, { status: 400 });
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/chatroom/${chatRoomId}`,
      {
        method: 'POST',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ content }),
      },
    );

    if (!response.ok) {
      throw new Error(`Backend responded with status ${response.status}`);
    }

    const result = await response.json();
    return NextResponse.json(result);
  } 
  catch (error) {
    console.error('Failed to send message:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { chatRoomId: number } }) {
  const token = req.headers.get('authorization');

  if (!token || !token.startsWith('Bearer ')) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { chatRoomId } = await params;
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

  const { chatRoomId } = await params;

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
