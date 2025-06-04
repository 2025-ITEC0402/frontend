export interface Problem {
  questionId: number;
  title: string;
  choices: string[];
  answer: number;
}

export interface ExplanationProps {
  chapter: string;
  difficulty: string;
  explanation: string;
  aiSummary: string;
}
