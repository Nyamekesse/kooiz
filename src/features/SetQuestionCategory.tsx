import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Button, Flex, Heading, Radio, RadioGroup, SimpleGrid } from '@chakra-ui/react';
import { useState } from 'react';
import { QuizCategory } from '../types/quiz-type';

interface Props {
  categories: QuizCategory[];
  onClickNext: (categoryId: string) => void;
}

const SetQuestionCategory = (p: Props) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(p.categories[0].id.toString());

  const radioList = p.categories.map((category: QuizCategory) => {
    return (
      <Radio key={category.id} value={category.id.toString()}>
        {category.name}
      </Radio>
    );
  });

  return (
    <>
      <Flex direction={'column'} alignItems={'center'}>
        <Heading as={'h1'} fontSize={'3xl'} mb={18}>
          Which Topic?
        </Heading>
      </Flex>
      <RadioGroup display={'flex'} justifyContent={'center'} value={selectedCategoryId} onChange={setSelectedCategoryId}>
        <SimpleGrid columns={[1, 3, 4]} spacing={4}>
          {radioList}
        </SimpleGrid>
      </RadioGroup>
      <Button onClick={() => p.onClickNext(selectedCategoryId)} position={'absolute'} top={'90%'} right={'10%'} rightIcon={<ArrowForwardIcon />}>
        Set Difficulty
      </Button>
    </>
  );
};

export default SetQuestionCategory;
