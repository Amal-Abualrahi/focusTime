import React, { useState } from 'react';
import { View, Text, StyleSheet, Vibration, Platform } from 'react-native';
import { colors } from '../../utils/colors';
import { textSize, space } from '../../utils/sizes';
import { Countdown } from '../../components/Countdown';
import { StartButton } from '../../components/StartButton';
import { RoundButton } from '../../components/RoundButton';
import { Timing } from '../../components/Timing';
import { ProgressBar, Colors } from 'react-native-paper';
import { useKeepAwake } from 'expo-keep-awake';

const Timer = ({ addFocus,  finished, exit }) => {
  useKeepAwake();

  const ONE_SECOND_IN_MS = 1000;

  const timeChange = (time) => {
    setProgress(1);
    setPaused(true);
    setTaskTime(time);
  };

  const onEnd = () => {
    setProgress(1);
    setPaused(true);
    setTaskTime(0);

    if (Platform === 'ios') {
      const interval = setInterval(() => {
        Vibration.vibrate(), ONE_SECOND_IN_MS;
      });
      setTimeout(() => clearInterval(interval), 10 * ONE_SECOND_IN_MS);
    } else Vibration.vibrate(10 * ONE_SECOND_IN_MS);
    
   finished();
  };

  const [paused, setPaused] = useState(true);
  const [progress, setProgress] = useState(1);
  const [taskTime, setTaskTime] = useState(0.1);

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown
          isPaused={paused}
          progress={setProgress}
          mins={taskTime}
          onEnd={onEnd}
        />
      </View>
      <View>
        <Text style={styles.title}> We want to focus on </Text>
        <Text style={styles.task}> {addFocus} </Text>
      </View>
      <View>
        <ProgressBar
          progress={progress}
          color={colors.countDown}
          style={{ height: 13 }}
        />
      </View>
      <View>
        <Timing onChangeTime={timeChange} />
      </View>

      <View style={styles.start}>
        {(paused === true) ? (
          <RoundButton
            title="Start"
            onPress={() => {
              setPaused(false);
            }}
          />
        ) : (
          <RoundButton
            title="Pause"
            onPress={() => {
              setPaused(true);
            }}
          />
        )}
      </View>
      <View>
      <RoundButton title ={'Exit'} size={50} onPress={()=>{
        
       exit();
      }}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: space.md,
  },

  title: {
    color: colors.white,
    textAlign: 'center',
    paddingTop: space.xxxxl,
  },

  task: {
    textAlign: 'center',
    fontWeight: 'bold',
  },

  countdown: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  start: {
    flex: 1,
    paddingTop: space.md,
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: textSize.xl,
    color: colors.grey,
  },
});

export { Timer };
