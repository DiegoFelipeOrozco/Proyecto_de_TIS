import React from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import Header from './src/component/header.js';
import ListaTareas from './src/component/listaTareas.js';

const App: () => React$Node = () => {
  return (
    <View style={styles.container}>
      <Header/>
      <ListaTareas/>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#fff',
  }
});

export default App;
