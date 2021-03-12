import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Focus as FocusItem } from './src/features/focusItem/Focus';
import { Timer } from './src/features/timer/Timer';
import { colors } from './src/utils/colors';
import { space } from './src/utils/sizes';
import { HistoryFocus } from './src/components/HistoryFocus';
import { RoundButton } from './src/components/RoundButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STATUS = {
  COMPLETE: 1,
  CANCELLED: 2,
};
function App() {
  const [focusSubject, setFocusSubject] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);

  const addState = (subject, status) => {
    setFocusHistory((arr) => [...arr, { key: String(focusHistory.length + 1), subject, status }]);
  };
  const OnClear = () => {
    //later
    setFocusHistory([]);
  };
const saveFocusHistory = async () => {
    try {
      AsyncStorage.setItem('focusHistory', JSON.stringify(focusHistory));
    } catch (e) {
      console.log(e);
    }
  };
  const loadFocusHistory = async () => {
    try {
      const history = await AsyncStorage.getItem('focusHistory');

      if (history && JSON.parse(history).length) {
        setFocusHistory(JSON.parse(history));
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    loadFocusHistory();
  }, []);

  useEffect(() => {
    saveFocusHistory();
  }, [focusHistory]);

  return (
    <View style={styles.container}>
      {focusSubject ? (
        <Timer
          addFocus={focusSubject}
          finished={() => {
            addState(focusSubject, STATUS.COMPLETE);
            setFocusSubject(null);
          }}
          exit={() => {
            addState(focusSubject, STATUS.CANCELLED);
            setFocusSubject(null);
          }}
        />
      ) : (
        <>
          <FocusItem addSubject={setFocusSubject} />
          <HistoryFocus historyFocus={focusHistory} onClear={OnClear} />
          <View></View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform === 'ios' ? space.lg : space.xl,
    backgroundColor: colors.beige,
  },
});

export default App;
