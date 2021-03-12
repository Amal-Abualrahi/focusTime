import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

const StartButton = ({ changePaused }) => {
  return (
    <TouchableOpacity
      style={styles.radius}
      onPress={() => {
        changePaused(!{ changePaused });
      }}>
      Start
    </TouchableOpacity>
  );
};

export { StartButton };

const styles = 
  StyleSheet.create({
    radius: {
      borderRadius: 50,
      width: 100,
      height: 100, 
      paddingTop: 20,
      borderColor: "grey",
      borderWidth: 3,
      alignSelf: 'center',
    },
  });
