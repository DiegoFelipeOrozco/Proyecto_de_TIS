/**
  Componente que representa el formulario para la creacion de tareas. 
  Recibe como propiedad el callback onSubmit(tareas) que se ejecutara cuando el tareas halla sido terminado de crear.
  @Autor Diego Felipe Orozco Penagos
*/
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput
} from 'react-native';

import generalStyles from '../App';
import {dateToString, onDateSelected, inicioDia} from './dateFunctions';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function TaskForm(props){
  const [error, indicarError] = React.useState(null);
  const [pickerState, setPickerState] = React.useState({fecha: new Date(), show: false});
  const [name, setName] = React.useState('');

  function submitTarea(){
    //validaciones de campos
    if (name.trim() === ''){
      indicarError(<Text style={generalStyles.errors}>debe indicar el nombre de la tarea</Text>);
    } else {
      props.onSubmit({key: name, name: name, limite: inicioDia(pickerState.fecha)});
    }
  }

  return(
    <View style={{flex: 1, justifyContent: 'center'}}>
      {error}
      <Text style={generalStyles.visualViews}>nombre*</Text>
      <TextInput style={StyleSheet.flatten([generalStyles.visualViews, generalStyles.borderBlue])} onChangeText={name => {setName(name)}} testID='nombre'/>
      <Button title={'fecha: ' + dateToString(pickerState.fecha)} onPress={()=>setPickerState(fecha=>({...fecha, show: true}))} testID='fecha'/>
      <View style={generalStyles.separador}></View>
      <Button title='Terminado' onPress={()=>submitTarea()} testID='submit'/>
      {pickerState.show && <DateTimePicker 
                          value={pickerState.fecha | new Date()}
                          mode='date'
                          display='default'
                          minimumDate={new Date()}
                          onChange={(event, date)=>onDateSelected(event, date, (date)=>setPickerState({fecha:date, show: false}))} 
                          testID='calendar'/>
      }
    </View>
  );
}