/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Flex, HStack, Heading, Radio, RadioGroup, SimpleGrid, Text } from '@chakra-ui/react';
import Lottie from 'lottie-react';
import { useEffect, useState } from 'react';
import inValidAnim from '../../assets/lottie/invalid.json';
import validAnim from '../../assets/lottie/valid.json';
import { QuizItem } from '../../types/quiz-type';
import Timer from './Timer';

interface Props {
  quiz: QuizItem[];
}

const PlayQuiz = (p: Props) => {
  const [answer, setAnswer] = useState<string>('');
  const [questionStatus, setQuestionStatus] = useState<'valid' | 'invalid' | 'unanswered'>('unanswered');
  const [availableAnswers, setAvailableAnswers] = useState<string[]>([]);
  const [currentQuizItemIndex, setCurrentQuizItemIndex] = useState<number>(0);
  const [history, setHistory] = useState<boolean[]>([]);

  const currentQuizItem: QuizItem = p.quiz[currentQuizItemIndex];

  const isValidAnswer = (answer: string): boolean => {
    return answer === currentQuizItem.correct_answer;
  };

  useEffect(() => {
    if (answer) {
      const isValid = isValidAnswer(answer);
      if (isValid) {
        setQuestionStatus('valid');
      } else {
        setQuestionStatus('invalid');
      }
      setHistory([...history, isValid]);
    }
  }, [answer]);

  useEffect(() => {
    setAvailableAnswers([currentQuizItem.correct_answer, ...currentQuizItem.incorrect_answers].sort(() => Math.random() - 0.5));
  }, [currentQuizItemIndex]);

  const radioList = availableAnswers.map((availableAnswer: string) => {
    return (
      <Radio key={availableAnswer} value={availableAnswer}>
        <Text
          color={questionStatus === 'unanswered' ? 'black' : isValidAnswer(availableAnswer) ? 'green.400' : 'red.400'}
          dangerouslySetInnerHTML={{ __html: currentQuizItem.question }}
        />
      </Radio>
    );
  });

  const renderProgressBar = () => {
    return (
      <HStack>
        {p.quiz.map((quizItem: QuizItem, index: number) => {
          return (
            <Box key={index} h={3} w={25} backgroundColor={index >= currentQuizItemIndex ? 'gray.200' : history[index] ? 'green.300' : 'red.300'} />
          );
        })}
      </HStack>
    );
  };

  const failQuestion = () => {
    setHistory([...history, false]);
    setQuestionStatus('invalid');
  };

  return (
    <Flex direction={'column'} alignItems={'center'} justify={'center'}>
      {renderProgressBar()}
      {questionStatus === 'unanswered' && (
        <Box position={'absolute'} top={50} right={50}>
          <Timer max={10} onFinished={failQuestion} />
        </Box>
      )}
      <Heading fontSize={'3xl'} mt={5} mb={5} dangerouslySetInnerHTML={{ __html: currentQuizItem.question }} />
      <RadioGroup value={answer} onChange={questionStatus === 'unanswered' ? setAnswer : undefined}>
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
