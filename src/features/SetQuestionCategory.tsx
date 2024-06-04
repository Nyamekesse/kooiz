import { useEffect, useState } from 'react';
import { QuizAPI } from '../api/quiz-api';
import { QuizCategory } from '../types/quiz-type';

const SetQuestionCategory = () => {
  const [categories, setCategories] = useState<QuizCategory[]>([]);

  useEffect(() => {
    (async () => {
      setCategories(await QuizAPI.fetchCategories());
    })();
  }, []);

  return <div>SetQuestionCategory</div>;
};

export default SetQuestionCategory;
