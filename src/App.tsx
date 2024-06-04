import { Box, Flex, Image } from '@chakra-ui/react';
import { useState } from 'react';
import bubbleImg from './assets/bubble.png';
import logoImg from './assets/logo.png';
import SetQuestionCategory from './features/SetQuestionCategory';
import SetQuestionQty from './features/SetQuestionQty';
import { FetchQuizParams, QuizDifficulty, QuizType } from './types/quiz-type';

enum Step {
  SetQuestionQty,
  SetQuestionCategory,
  SetQuestionDifficulty,
  Play,
  Score,
}

function App() {
  const [step, setStep] = useState<Step>(Step.SetQuestionQty);
  const [quizParams, setQuizParams] = useState<FetchQuizParams>({ amount: 0, category: '', difficulty: QuizDifficulty.Mixed, type: QuizType.Mixed });

  const header = (
    <Flex justify={'center'}>
      <Image h={24} src={logoImg} />
    </Flex>
  );
  const renderScreenByStep = () => {
    switch (step) {
      case Step.SetQuestionQty:
        return (
          <SetQuestionQty
            max={30}
            min={5}
            step={5}
            defaultValue={10}
            onClickNext={(amount: number) => {
              setQuizParams({ ...quizParams, amount });
              setStep(Step.SetQuestionCategory);
            }}
          />
        );
      case Step.SetQuestionCategory:
        return <SetQuestionCategory />;
      case Step.SetQuestionDifficulty:
        return <></>;
      case Step.Play:
        return <></>;
      case Step.Score:
        return <></>;
      default:
        return null;
    }
  };
  return (
    <Box py={10} h={'100%'}>
      {header}
      <Image src={bubbleImg} position={'absolute'} zIndex={-1} right={120} top={100} />
      <Box mt={100}>{renderScreenByStep()}</Box>
    </Box>
  );
}

export default App;
