import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = await params;
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
      throw new Error(`백엔드 응답 실패: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } 
  catch (error) {
    console.error('문제 조회 실패:', error);
    return NextResponse.json({ error: '서버 오류' }, { status: 500 });
  }
}
