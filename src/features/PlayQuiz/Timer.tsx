import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

interface Props {
  max: number;
  onFinished: () => void;
}
let timer: NodeJS.Timeout;
const Timer = (p: Props) => {
  const [progress, setProgress] = useState<number>(p.max);

  useEffect(() => {
    if (progress <= 0) {
      p.onFinished();
      clearTimeout(timer);
    }
  }, [progress]);

  useEffect(() => {
    timer = setInterval(() => {
      setProgress((prevProgress) => prevProgress - 1);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <CircularProgress max={p.max} value={progress} color="green.400">
      <CircularProgressLabel>{progress}</CircularProgressLabel>
    </CircularProgress>
  );
};

export default Timer;
