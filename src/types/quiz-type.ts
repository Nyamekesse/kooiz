export enum QuizDifficulty {
  Mixed = '',
  Easy = 'easy',
  Medium = 'medium',
  Hard = 'hard',
}

export enum QuizType {
  Mixed = '',
  Multiple = 'multiple',
  Boolean = 'boolean',
}

export interface FetchQuizParams {
  amount: number;
  category: string;
  difficulty: QuizDifficulty;
  type: QuizType;
}

export interface QuizCategory {
  id: number;
  name: string;
}

export interface FetchQuizCategoriesResponse {
  trivia_categories: QuizCategory[];
}
