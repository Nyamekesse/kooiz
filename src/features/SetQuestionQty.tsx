import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Button, Flex, Heading, Slider, SliderFilledTrack, SliderMark, SliderThumb, SliderTrack } from '@chakra-ui/react';
import { useState } from 'react';

interface Props {
  defaultValue: number;
  max: number;
  min: number;
  step: number;
  onClickNext: (amount: number) => void;
}

const SetQuestionQty = (p: Props) => {
  const [sliderValue, setSliderValue] = useState<number>(p.defaultValue);
  const renderMarks = (): JSX.Element[] => {
    const marks = [];
    for (let index = p.min; index <= p.max; index += p.step) {
      marks.push(
        <SliderMark key={index} pt={4} ml={-2} value={index}>
          {index}
        </SliderMark>,
      );
    }
    return marks;
  };
  return (
    <>
      <Flex direction={'column'} alignItems={'center'}>
        <Heading as={'h1'} fontSize={'3xl'} mb={20}>
          How many questions?
        </Heading>
        <Slider
          value={sliderValue}
          maxWidth={400}
          max={p.max}
          min={p.min}
          step={p.step}
          aria-label="slider-ex-6"
          onChange={(val) => setSliderValue(val)}
          colorScheme="yellow"
        >
          {renderMarks()}
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </Flex>
      <Button onClick={() => p.onClickNext(sliderValue)} position={'absolute'} top={'90%'} right={'10%'} rightIcon={<ArrowForwardIcon />}>
        Set Category
      </Button>
    </>
  );
};

export default SetQuestionQty;
