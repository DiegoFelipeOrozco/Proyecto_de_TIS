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

function dateToString(date){
 return date.toLocaleDateString();
}
function timeToString(time){
  return time.toLocaleTimeString()
}
function dateSelected(event, date, action, failAction=()=>{}){
  if (date >= new Date() && date !== undefined){
    action(date);
  } else {
    failAction();
  }
}
function hoy(){
  var hoy = new Date();
  hoy.setHours(0);
  hoy.setMinutes(0);
  hoy.setSeconds(0);
  hoy.setMilliseconds(0);
  return hoy;
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
          {ocupaciones.map((item)=>{
              if (item.limite){
                return (<Text>{'id: ' + item.id + ', fecha limite: ' + dateToString(item.limite)}</Text>);
              } else {
                return (<Text>{'id: ' + item.id + ', hora inicio: ' + timeToString(item.inicio) + ', hora fin: ' + timeToString(item.fin)}</Text>);
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
  const [showPicker, setShowPicker] = React.useState(false);
  const [json, setJson] = React.useState({
    id: '',
    limite: hoy(),
    //prioridad: NaN
  });

  function submitTarea(){
    if (json.id.length !== 0){
      //validaciones de campos
      props.onSubmit(json);
    } else if (json.limite === undefined){
      indicarError(<Text style={styles.errors}>debe indicar la fecha limite para terminar la tarea</Text>);
    } else {
      indicarError(<Text style={styles.errors}>debe indicar el id de la tarea</Text>);
    }
  }

  return(
    <View style={{flex: 1, justifyContent: 'center'}}>
      {error}
      <Text style={styles.visualViews}>nombre*</Text>
      <TextInput style={StyleSheet.flatten([styles.visualViews, styles.borderBlue])} onChangeText={id => {json.id = id}} testID='nombre'/>
      <Button title={'fecha: ' + dateToString(json.limite)} onPress={()=>setShowPicker(true)} testID='fecha'/>
      <View style={styles.separador}></View>
      <Button title='Terminado' onPress={()=>submitTarea()} testID='submit'/>
      {showPicker && <DateTimePicker 
                          value={json.limite | hoy()}
                          mode='date'
                          display='default'
                          minimumDate={new Date()}
                          onChange={(event, date)=>{dateSelected(event, date, (date)=>{json.limite=date});setShowPicker(false)}} 
                          testID='calendar'/>
      }
    </View>
  );
}

export function FormularioEvento(props){
  const [error, indicarError] = React.useState(null);
  const [showPickerInicio, setShowPickerInicio] = React.useState(false);
  const [showPickerFin, setShowPickerFin] = React.useState(false);
  const [json, setJson] = React.useState({
    id: '',
    inicio: new Date(),
    fin: new Date()
  });

  function submitEvento(){
    //validaciones de campos
    if (json.id.length === 0){
      indicarError(<Text style={StyleSheet.flatten([styles.visualViews, styles.errors])}>debe indicar el id de la tarea</Text>);
    } else if (json.fin - json.inicio <= 0){
      indicarError(<Text style={StyleSheet.flatten([styles.visualViews, styles.errors])}>La hora de inicio debe ser menor ni igual a la hora de fin</Text>)
    } else {
      props.onSubmit(json);
    }
  }

  return(
    <View>
      {error}
      <Text style={styles.visualViews}>nombre*</Text>
      <TextInput style={StyleSheet.flatten([styles.visualViews, styles.borderBlue])} onChangeText={id => {json.id = id}} testID='nombre'/>
      <Button style={styles.visualViews} title={'Hora de inicio: ' + timeToString(json.inicio)} onPress={()=>setShowPickerInicio(true)} testID='horaInicio'/>
      <View style={styles.separador}></View>
      <Button style={styles.visualViews} title={'Hora de fin: ' + timeToString(json.fin)} onPress={()=>setShowPickerFin(true)} testID='horaFin'/>
      <View style={styles.separador}></View>
      <Button style={{marginTop: 10, marginBottom: 10}} title='Terminado' onPress={()=>submitEvento()} testID='submit'/>
      {showPickerInicio && <DateTimePicker 
                          value={json.inicio | new Date()}
                          mode='time'
                          is24Hour={true}
                          display='default'
                          onChange={(event, date=new Date())=>{json.inicio=date;setShowPickerInicio(false)}} 
                          testID='calendarI'/>
      }
      {showPickerFin && <DateTimePicker 
                          value={json.fin | new Date()}
                          mode='time'
                          is24Hour={true}
                          display='default'
                          onChange={(event, date=new Date())=>{json.fin=date;setShowPickerFin(false)}} 
                          testID='calerdarF'/>
      }
    </View>
  );
}

export default App;
