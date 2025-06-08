import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const token = req.headers.get('authorization');

  if (!token || !token.startsWith('Bearer ')) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();

    if (!body.content || typeof body.content !== 'string') {
      return NextResponse.json({ message: 'Invalid request body' }, { status: 400 });
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/api/chatroom/new-chat`, {
      method: 'POST',
      headers: {
        Authorization: token,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: body.content }),
    });

    if (!response.ok) {
      throw new Error(`Backend responded with status ${response.status}`);
    }

    const result = await response.json();
    return NextResponse.json(result);
  } 
  catch (error) {
    console.error('Failed to create chatroom:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
