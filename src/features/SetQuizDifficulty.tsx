import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Button, Flex, Heading, Radio, RadioGroup, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { QuizDifficulty } from '../types/quiz-type';

interface Props {
  onClickNext: (difficulty: QuizDifficulty) => void;
}

const SetQuizDifficulty = (p: Props) => {
  const [difficulty, setDifficulty] = useState<QuizDifficulty>(QuizDifficulty.Mixed);
  const radioList = Object.values(QuizDifficulty).map((diff: QuizDifficulty) => {
    return (
      <Radio key={diff} value={diff}>
        <span style={{ textTransform: 'capitalize' }}>{diff === QuizDifficulty.Mixed ? 'Mixed' : diff}</span>
      </Radio>
    );
  });
  return (
    <>
      <Flex direction={'column'} alignItems={'center'}>
        <Heading as={'h1'} fontSize={'3xl'} mb={18}>
          Which Difficulty?
        </Heading>
      </Flex>
      <RadioGroup value={difficulty} onChange={setDifficulty as (d: string) => void}>
        <VStack>{radioList}</VStack>
      </RadioGroup>
      <Button onClick={() => p.onClickNext(difficulty)} position={'absolute'} top={'90%'} right={'10%'} rightIcon={<ArrowForwardIcon />}>
        Play
      </Button>
    </>
  );
};

export default SetQuizDifficulty;
