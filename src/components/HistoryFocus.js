import React, { setState, useState } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, TextStyle } from 'react-native';
import { textSize, space } from '../utils/sizes';
import { colors } from '../utils/colors';
import { RoundButton } from './RoundButton';

const HistoryFocus = ({ historyFocus, onClear }) => {
  const clearHistory = () => {
    onClear();
  };

  const HistoryItem = ({ item, index }) => {
    //<Item title={item.title} />;
   return( <Text style={tempStyle(item.status).historyItem}> {JSON.stringify(item.subject)} </Text> )
  };

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <Text> Things we have focused on: </Text>
        {!!historyFocus.length && (
          <>
          <FlatList
            style={{ width: '100%', height: '100%' }}
            contentContainerStyle={{ flex: 1, alignItems: 'center' }}
            data={historyFocus}
            renderItem={HistoryItem}
          />
        
        <RoundButton title="Clear" size={75} onPress = {() => {
              onClear();
            }}/>
            </>
            )}
      </SafeAreaView>
    </>
  );
};


const tempStyle = (status) => StyleSheet.create({
  historyItem: {
    color: status > 1 ? colors.red : colors.green,
    fontSize: textSize.md,
  },
});

export { HistoryFocus };

/* <View>
      <Text> Things we have focused on so far: </Text>
      {storedList.map( e =>
          <View style={[styles(color).text, style]}> { e } </View>
        )}
      </View>*/
