import React, { setState, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {HistoryFocus} from '../../components/HistoryFocus';
import { TextInput } from 'react-native-paper';
import { RoundButton } from '../../components/RoundButton';
import { textSize, space } from '../../utils/sizes';
import { colors } from '../../utils/colors';

const Focus = ({ addSubject /*, storedList, defStatus*/}) => {
  const [subject, setSubject] = useState(null);
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}> What do you want to focus on? </Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textinput}
            onSubmitEditing={({ nativeEvent }) => {
              setSubject(nativeEvent.text);
            }}
          />
          <RoundButton
            title="+"
            size={40}
            onPress={() => {
              addSubject(subject);
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //paddingTop: 100,
    paddingHorizontal: space.sm,
    justifyContent: 'center',
  },

  titleContainer: {
    flex: 0.5,
  },
  title: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: textSize.md,
  },

  inputContainer: {
    paddingTop: space.md,
    flexDirection: 'row',
    alignItems: 'center',
  },

  textinput: {
    height: 45,
    marginRight: space.sm,
    flex: 1,
    backgroundColor: colors.white,
  },
});

export { Focus };
