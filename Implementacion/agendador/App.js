import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import Header from './src/component/header.js';
import ListaTareas from './src/component/listaTareas.js';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import { firebase } from '@react-native-firebase/database';

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
var firebaseConfig = {
    apiKey: "AIzaSyBi1mT12WRi5hbSo9NVDi1y6Tb0mU3bcvw",
    authDomain: "tareasatiempo-3a12f.firebaseapp.com",
    databaseURL: "https://tareasatiempo-3a12f.firebaseio.com",
    projectId: "tareasatiempo-3a12f",
    storageBucket: "tareasatiempo-3a12f.appspot.com",
    messagingSenderId: "378551746284",
    appId: "1:378551746284:web:14fca0f5620aba6e70efc9"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const ref = firebase.database().ref();
ref.set({prop1:"hola", prop2:"mundo"});

const App: () => React$Node = () => {
  return (
    <View style={styles.container}>
      <Header/>
      <ListaTareas tareas={[{key:'0', name:'Mercar', horaI:"8:30",horaF:"9:00"},
                {key:'1', name:'Estudiar para el Quiz', horaI:"10:30",horaF:"0"},
                {key:'2', name:'Ir al GYM', horaI:"12:50",horaF:"13:30"},
                {key:'3', name:'Tarea de Electronica', horaI:"12:50",horaF:"13:30"},
                {key:'4', name:'Estudiar IoT', horaI:"13:50",horaF:"14:30"},
                {key:'5', name:'Almorzar', horaI:"14:40",horaF:"16:30"},
                {key:'6', name:'Recoger a Lupe', horaI:"17:20",horaF:"18:50"},
                {key:'7', name:'Comprar comida del Perro', horaI:"20:00",horaF:"21:30"},
                {key:'8', name:'Lavar Ropa', horaI:"21:30",horaF:"21:58"}]}/>
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
