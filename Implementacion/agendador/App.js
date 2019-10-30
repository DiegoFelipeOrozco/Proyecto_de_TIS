import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import Header from './src/component/header.js';
import ListaTareas from './src/component/listaTareas.js';

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
  const [eventos, setEventos] = React.useState([]);
  return (
    <View style={styles.container}>
      <Header/>
      <TaskForm onSubmit={(tarea)=>{setEventos(eventos.concat(tarea))}}/>
      <RoutineForm onSubmit={(rutina)=>{setEventos(eventos.concat(rutina))}}/>
      <ListaTareas tareas={eventos}/>
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
