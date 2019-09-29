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
  ScrollView,
  View,
  Text,
  Button,
  TextInput
} from 'react-native';

import {
  Colors
} from 'react-native/Libraries/NewAppScreen';
import DateTimePicker from '@react-native-community/datetimepicker';

const styles = StyleSheet.create({
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

/**
transforma una fecha dada a un String con el formato de la aplicacion.
@param date: tipo Date
*/
function dateToString(date){
 return date.toLocaleDateString();
}
/**
transforma una fecha dada a un String con el formato de hora de la aplicacion.
@param time: tipo Date
*/
function timeToString(time){
  return time.toTimeString().substr(0, 5);
}
/**
callback personalizado para el onChange de RNDateTimePicker, este valida todo lo que el componente deberia validar, pero que no hace
*/
function onDateSelected(event, date, action, failAction=()=>{}){
  if (date >= new Date() && date !== undefined){
    action(date);
  } else {
    failAction();
  }
}
/**
devuelve la fecha pasada con horas, minutos, segundos y milisegundos en 0, el inicio del dia; util al momento de comparar fechas
*/
function inicioDia(dia){
  dia.setHours(0);
  dia.setMinutes(0);
  dia.setSeconds(0);
  dia.setMilliseconds(0);
  return dia;
}

const App: () => React$Node = () => {
  const [ocupaciones, setOcup] = React.useState([]);
  const [view, changeView] = React.useState(null);
  function agregarOcup(ocupacion){
    var newOcupaciones = ocupaciones.concat(ocupacion);
    setOcup(newOcupaciones);
  }

  //este codigo solo es para poder probar...en HU-002 se hara la adecuada programacion aqui
  if (view === null){
    return (
      <View style={styles.container}>
        <View style={{flex: 9}}>
          {ocupaciones.map((ocup)=>{
              if (ocup.limite){
                return (<Text key={ocup.key}>{'id: ' + ocup.name + ', fecha limite: ' + dateToString(ocup.limite)}</Text>);
              } else {
                return (<Text key={ocup.key}>{'id: ' + ocup.name + ', hora inicio: ' + ocup.horaI + ', hora fin: ' + ocup.horaF}</Text>);
              }
            })
          }
        </View>
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline'}}>
          <Button title='agregar Tarea' onPress={()=>changeView(<FormularioTarea onSubmit={ocup=>{agregarOcup(ocup);changeView(null)}}/>)}/>
          <Button title='agregar Evento' onPress={()=>changeView(<FormularioEvento onSubmit={ocup=>{agregarOcup(ocup);changeView(null)}}/>)}/>
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        {view}
      </View>
    );
  }
};

export function FormularioTarea(props){
  const [error, indicarError] = React.useState(null);
  //const [showPicker, setShowPicker] = React.useState(false);
  const [pickerState, setPickerState] = React.useState({fecha: new Date(), show: false});
  const [name, setName] = React.useState('');

  function submitTarea(){
    //validaciones de campos
    if (name.trim() === ''){
      indicarError(<Text style={styles.errors}>debe indicar el nombre de la tarea</Text>);
    } else {
      props.onSubmit({key: name, name: name, limite: inicioDia(pickerState.fecha)});
    }
  }

  return(
    <View style={{flex: 1, justifyContent: 'center'}}>
      {error}
      <Text style={styles.visualViews}>nombre*</Text>
      <TextInput style={StyleSheet.flatten([styles.visualViews, styles.borderBlue])} onChangeText={name => {setName(name)}} testID='nombre'/>
      <Button title={'fecha: ' + dateToString(pickerState.fecha)} onPress={()=>setPickerState(fecha=>({...fecha, show: true}))} testID='fecha'/>
      <View style={styles.separador}></View>
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

export function FormularioEvento(props){
  const [error, indicarError] = React.useState(null);
  const [name, setName] = React.useState('');
  const [horaI, setHoraI] = React.useState({hora: new Date(), show: false});
  const [horaF, setHoraF] = React.useState({hora: new Date(), show: false});

  function submitEvento(){
    //validaciones de campos
    if (name.trim() === ''){
      indicarError(<Text style={StyleSheet.flatten([styles.visualViews, styles.errors])}>debe indicar el nombre del evento</Text>);
    } else if (horaF.hora - horaI.hora <= 0){
      indicarError(<Text style={StyleSheet.flatten([styles.visualViews, styles.errors])}>La hora de inicio debe ser menor ni igual a la hora de fin</Text>)
    } else {
      props.onSubmit({
        key: name,
        name: name,
        horaI: timeToString(horaI.hora),
        horaF: timeToString(horaF.hora)
      });
    }
  }
  return(
    <View>
      {error}
      <Text style={styles.visualViews}>nombre*</Text>
      <TextInput style={StyleSheet.flatten([styles.visualViews, styles.borderBlue])} onChangeText={name => {setName(name)}} testID='nombre'/>
      <Button style={styles.visualViews} title={'Hora de inicio: ' + timeToString(horaI.hora)} onPress={()=>setHoraI(hora=>({...hora, show: true}))} testID='horaInicio'/>
      <View style={styles.separador}></View>
      <Button style={styles.visualViews} title={'Hora de fin: ' + timeToString(horaF.hora)} onPress={()=>setHoraF(hora=>({...hora, show:true}))} testID='horaFin'/>
      <View style={styles.separador}></View>
      <Button style={{marginTop: 10, marginBottom: 10}} title='Terminado' onPress={()=>submitEvento()} testID='submit'/>
      {horaI.show && <DateTimePicker 
                          value={horaI.hora | new Date()}
                          mode='time'
                          is24Hour={true}
                          display='default'
                          onChange={(event, time=new Date())=>{setHoraI({hora: time, show: false})}} 
                          testID='calendarI'/>
      }
      {horaF.show && <DateTimePicker 
                          value={horaF.hora | new Date()}
                          mode='time'
                          is24Hour={true}
                          display='default'
                          onChange={(event, time=new Date())=>{setHoraF({hora: time, show: false})}} 
                          testID='calendarF'/>
      }
    </View>
  );
}

export default App;
