// 기본 문제
export interface Problem {
  question_id: number;
  title: string;
  choice1: string;
  choice2: string;
  choice3: string;
  choice4: string;
  answer: string;
  chapter: string;
  difficulty: string;
  explanation: string;
  aiSummary: string;
}

// 문제 풀이를 위해 간소화
export interface ProblemViewProps {
  questionId: number;
  title: string;
  choices: string[];
  answer: number;
}

// 문제 설명
export interface ExplanationProps {
  chapter: string;
  difficulty: string;
  explanation: string;
  aiSummary: string;
}

// 추천 문제
export interface Recommendation {
  questionId: number;
  chapterName: string;
  chapterNum: string;
  level: string;
}

// API 응답 인터페이스
export interface RandomQuestionsResponse {
  questionSets: Problem[];
}

export interface RecommendationResponse {
  recommendSets: Recommendation[];
}
