export interface Problem {
  id: string;
  title: string;
  difficulty: 'EASY' | 'NORMAL' | 'HARD';
  category: string;
}

export interface PracticeExplanation {
  problemId: number;
  difficulty: 'EASY' | 'NORMAL' | 'HARD';
  topic: string;
  explanation: string;
  aiSummary: string;
}

export const problems = [
  {
    number: 1,
    question: '다음 중 미분의 정의에 가장 가까운 것은?',
    choices: ['함수의 극한값', '함수의 연속성', '함수의 도함수', '함수의 적분값'],
    answer: 2,
    explanation: '미분의 정의는 도함수의 개념과 가장 밀접합니다.',
    difficulty: 'HARD' as const,
    topic: '미분',
    aiSummary: '이 문제는 미분의 기본 개념을 묻는 문제로, 개념 이해가 중요합니다.',
  },
  {
    number: 2,
    question: '행렬의 곱셈에서 올바른 설명은?',
    choices: [
      '항상 교환법칙이 성립한다',
      '항상 항등행렬이 존재한다',
      '곱셈은 결합법칙이 성립한다',
      '항상 역행렬이 존재한다',
    ],
    answer: 2,
    explanation: '행렬 곱셈은 결합법칙은 성립하지만 교환법칙은 성립하지 않습니다.',
    difficulty: 'EASY' as const,
    topic: '행렬',
    aiSummary: '행렬의 곱셈 성질을 확인하는 기초 문제입니다.',
  },
];
