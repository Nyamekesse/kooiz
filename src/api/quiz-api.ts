import axios from 'axios';
import { FetchQuizCategoriesResponse, FetchQuizParams, FetchQuizResponse, QuizCategory, QuizItem } from '../types/quiz-type';

const BASE_URL = 'https://opentdb.com/';

export class QuizAPI {
  static async fetchCategories(): Promise<QuizCategory[]> {
    const { data } = await axios.get<FetchQuizCategoriesResponse>(`${BASE_URL}/api_category.php`);
    return data.trivia_categories;
  }
  static async fetchQuiz(params: FetchQuizParams): Promise<QuizItem[]> {
    const { data } = await axios.get<FetchQuizResponse>(`${BASE_URL}/api.php`, { params });
    return data.results;
  }
}
