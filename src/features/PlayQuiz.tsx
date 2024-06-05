/* eslint-disable react-hooks/exhaustive-deps */
import { Flex, Heading, Radio, RadioGroup, SimpleGrid, Text } from '@chakra-ui/react';
import Lottie from 'lottie-react';
import { useEffect, useState } from 'react';
import inValidAnim from '../assets/lottie/invalid.json';
import validAnim from '../assets/lottie/valid.json';
import { QuizItem } from '../types/quiz-type';

interface Props {
  quiz: QuizItem[];
}

const PlayQuiz = (p: Props) => {
  const [answer, setAnswer] = useState<string>('');
  const [questionStatus, setQuestionStatus] = useState<'valid' | 'invalid' | 'unanswered'>('unanswered');
  const [currentQuizItemIndex, setCurrentQuizItemIndex] = useState<number>(0);
  const currentQuizItem: QuizItem = p.quiz[currentQuizItemIndex];
  const availableAnswers: string[] = [currentQuizItem.correct_answer, ...currentQuizItem.incorrect_answers];

  const isValidAnswer = (answer: string): boolean => {
    return answer === currentQuizItem.correct_answer;
  };

  useEffect(() => {
    if (answer) {
      if (isValidAnswer(answer)) {
        setQuestionStatus('valid');
      } else {
        setQuestionStatus('invalid');
      }
    }
  }, [answer]);

  const radioList = availableAnswers.map((availableAnswer: string) => {
    return (
      <Radio key={availableAnswer} value={availableAnswer}>
        <Text dangerouslySetInnerHTML={{ __html: currentQuizItem.question }} />
      </Radio>
    );
  });
  return (
    <Flex direction={'column'} alignItems={'center'} justify={'center'}>
      <Heading fontSize={'3xl'} mt={5} mb={5} dangerouslySetInnerHTML={{ __html: currentQuizItem.question }} />
      <RadioGroup value={answer} onChange={setAnswer}>
        <SimpleGrid columns={2} spacing={4}>
          {radioList}
        </SimpleGrid>
      </RadioGroup>
      <Lottie
        loop={false}
        style={{ marginTop: 80, height: 150 }}
        animationData={questionStatus === 'unanswered' ? null : questionStatus === 'valid' ? validAnim : inValidAnim}
        onComplete={() => {
          setQuestionStatus('unanswered');
          setCurrentQuizItemIndex(currentQuizItemIndex + 1);
        }}
      />
    </Flex>
  );
};

export default PlayQuiz;
