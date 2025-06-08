import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const token = req.headers.get('authorization');

  if (!token || !token.startsWith('Bearer ')) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  const body = await req.json();
  const { questionId, correctOnFirstTry } = body;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/question/${questionId}`,
      {
        method: 'POST',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correctOnFirstTry }),
      },
    );

    if (!response.ok) {
      throw new Error(`백엔드 응답 오류: ${response.status}`);
    }
    return NextResponse.json({ message: '정답 여부 저장 완료' });
  } catch (error) {
    console.error('백엔드 저장 실패:', error);
    return NextResponse.json({ error: '서버 저장 실패' }, { status: 500 });
  }
}
