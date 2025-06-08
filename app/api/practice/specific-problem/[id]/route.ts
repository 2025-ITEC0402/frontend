import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, context: any) {
  const { id } = context.params;
  const token = req.headers.get('authorization');

  if (!token || !token.startsWith('Bearer ')) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/api/question/${id}`, {
      method: 'GET',
      headers: {
        Authorization: token,
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Backend responded with status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Failed to fetch question:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
