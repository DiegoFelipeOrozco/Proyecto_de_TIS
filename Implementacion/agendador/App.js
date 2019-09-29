/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput
} from 'react-native';

import {
  Colors
} from 'react-native/Libraries/NewAppScreen';

import TaskForm from './src/TaskForm';
import RoutineForm from './src/RoutineForm';

export const generalStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 10,
    marginVertical: 10
  },
  borderBlue: {
    borderTopColor: '#000080',
    borderBottomColor: '#000080',
    borderLeftColor: '#000080',
    borderRightColor: '#000080',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
  },
  visualViews:{
    marginTop:10,
    marginBottom: 10
  },
  errors: {
    color: '#FF0000'
  },
  separador: {
    height: 10,
    width: 10
  }
});

const App: () => React$Node = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>En obra de construccion</Text>
    </View>
  );
};

export default App;
