import { Button, Flex, Heading, Text } from '@chakra-ui/react';

interface Props {
  history: boolean[];
  onNext: () => void;
}

const Score = (p: Props) => {
  const rightAnswers = p.history.filter((answer: boolean) => answer === true).length;

  const renderMessage = () => {
    const rightAnswerPercentage = (rightAnswers * 100) / p.history.length;
    if (rightAnswerPercentage < 30) {
      return 'You need more Practice!';
    } else if (rightAnswerPercentage < 50) {
      return 'Not bad keep training you are getting better.';
    } else if (rightAnswerPercentage < 75) {
      return 'Good Job!';
    } else {
      return 'Whoah ! You di amazing !';
    }
  };
  return (
    <Flex direction={'column'} align={'center'}>
      <Heading fontSize={'3xl'}>Score</Heading>
      <Heading fontSize={'xl'} mt={5}>
        {rightAnswers}/{p.history.length}
      </Heading>
      <Text fontWeight={'bold'} mt={20}>
        {renderMessage()}
      </Text>
      <Button position={'absolute'} top={'80%'} right={'10%'} onClick={p.onNext}>
        New Game
      </Button>
    </Flex>
  );
};

export default Score;
