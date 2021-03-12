import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import {RoundButton} from './RoundButton';
import {space} from '../utils/sizes';


const Timing = ({onChangeTime}) => {
  
  return (
    <View style = {styles.row}>
    <RoundButton style = {styles.btn}
          title={2}
          size={70}
          onPress={() => {
            onChangeTime(2);
          }}
        />
        <RoundButton style = {styles.btn}
          title={3}
          size={70}
          onPress={() => {
            onChangeTime(3);
          }}
        />
        <RoundButton style = {styles.btn}
          title={4}
          size={70}
          onPress={() => {
            onChangeTime(4);
          }}
        />

    </View>
    
  );
};

const styles = StyleSheet.create({
row: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  btn: {
    marginLeft: space.md,
    marginTop: space.xl,
  }
})


export { Timing };