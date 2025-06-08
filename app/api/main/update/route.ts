import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest) {
  const token = req.headers.get('authorization');

  if (!token || !token.startsWith('Bearer ')) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/member/learning-history`,
      {
        method: 'PUT',
        headers: {
          Authorization: token,
          Accept: 'application/json',
        },
        cache: 'no-store',
      },
    );

    if (response.status === 204) {
      return new NextResponse(null, { status: 204 });
    }

    return NextResponse.json(
      { message: 'Failed to update learning history' },
      { status: response.status },
    );
  } catch (error) {
    console.error('Error updating learning history:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
