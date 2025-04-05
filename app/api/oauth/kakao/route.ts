import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json();

    if (!code) {
      return NextResponse.json({ error: '카카오 인가 코드가 없습니다.' }, { status: 400 });
    }

    const API_URL = `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/auth/oauth/kakao/login`;
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } 
  catch (error) {
    console.error('카카오 로그인 처리 중 오류 발생:', error);
    return NextResponse.json(
      { error: '카카오 로그인 처리 중 오류가 발생했습니다.' },
      { status: 500 },
    );
  }
}
