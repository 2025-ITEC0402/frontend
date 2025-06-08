import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, { params }: { params: { chapterId: number } }) {
  const token = req.headers.get('authorization');
  const { chapterId } = await params;

  if (!token || !token.startsWith('Bearer ')) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/member/complete?chapterId=${chapterId}`,
      {
        method: 'POST',
        headers: {
          Authorization: token,
        },
      },
    );

    if (!response.ok) {
      return NextResponse.json(
        { message: 'Failed to complete chapter on backend' },
        { status: response.status },
      );
    }

    return NextResponse.json(
      { message: 'Chapter completion recorded successfully' },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error completing chapter:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
