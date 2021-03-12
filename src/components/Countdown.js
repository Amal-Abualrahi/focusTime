import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { textSize, space } from '../utils/sizes';
import { colors } from '../utils/colors';

const mintoMilli = (min) => min * 1000 * 60;
const formatTime = (time) => (time < 10 ? `0${time}` : time);

const Countdown = ({ mins, isPaused, progress, onEnd }) => {
  const interval = React.useRef(null);

  const countdown = () => {
    setMill((time) => {
      if (time === 0) {
        clearInterval(interval.current);
        onEnd();
        return time;
      } 
        const timeLeft = time - 1000;
       // progress(timeLeft / mintoMilli(mins));
        return timeLeft;
      
    });
  };
  

  //not working
    useEffect(() => {
    progress(milli/ mintoMilli(mins));
  }, [milli]);

  useEffect(() => {
    setMill(mintoMilli(mins));
  }, [mins]);

  useEffect(() => {
    if (!isPaused) {
      interval.current = setInterval(countdown, 1000);
    }
    return () => clearInterval(interval.current);
  }, [isPaused]);

  const [milli, setMill] = useState(mintoMilli(mins));

  //show it nicely
  const minutes = Math.floor(milli / 1000 / 60) % 60;
  const seconds = Math.floor(milli / 1000) % 60;

  return (
    <Text style={styles.text}>
      {formatTime(minutes)}:{formatTime(seconds)}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: textSize.xxxxl,
    fontWeight: 'bold',
    color: colors.white,
    backgroundColor: colors.countDown,
  },
});

export { Countdown };
