import axios from 'axios';
import { FetchQuizCategoriesResponse, QuizCategory } from '../types/quiz-type';

const BASE_URL = 'https://opentdb.com/';

export class QuizAPI {
  static async fetchCategories(): Promise<QuizCategory[]> {
    const { data } = await axios.get<FetchQuizCategoriesResponse>(`${BASE_URL}/api_category.php`);
    return data.trivia_categories;
  }
}
