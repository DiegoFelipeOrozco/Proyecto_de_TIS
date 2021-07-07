/**
  Componente que representa el formulario para la creacion de eventos. 
  Recibe como propiedad el callback onSubmit(evento) que se ejecutara cuando la rutina halla sido terminado de crear.
  @Autor Diego Felipe Orozco Penagos
*/
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  CheckBox
} from 'react-native';

import generalStyles from '../App';
import {timeToString} from './dateFunctions';
import DateTimePicker from '@react-native-community/datetimepicker';
import DatabaseController from './database/controller';
import {Rutina} from './database/entidades';

let db = new DatabaseController();
export default function RoutineForm(props){
  const [error, indicarError] = React.useState(null);
  const [name, setName] = React.useState('');
  const [horaI, setHoraI] = React.useState({hora: new Date(), show: false});
  const [horaF, setHoraF] = React.useState({hora: new Date(), show: false});

  function submitEvento(){
    //validaciones de campos
    if (name.trim() === ''){
      indicarError('Debe indicar el nombre del evento');
    } else if (horaF.hora - horaI.hora <= 0){
      indicarError('La hora de inicio debe ser menor ni igual a la hora de fin');
    } else {
      let nuevaRutina: Rutina = new Rutina(
        name,
        horaI.hora,
        horaF.hora,
        7,//periodicidad semanal mientras se diseña la interfaz para el usuario
        [0,1,2,3,4,5,6]
      );
      db.insertRoutine(
        nuevaRutina, 
        (error)=>{
          if(error){
            //notificacion del error
            indicarError('No se puede guardar la rutina');
          } else {
            props.onSubmit(nuevaRutina);
          }
      });
    }
  }
  return(
    <View style={{flex:1, paddingHorizontal: 5}}>
      <Text style={{color: 'red'}}>{error}</Text>
      <TextInput placeholder='Nombre' style={StyleSheet.flatten([{marginVertical:10}, generalStyles.borderBlue])} onChangeText={name => {setName(name)}} testID='nombre'/>
      <Text style={{fontSize: 20}}>Horario</Text>
      <View style={StyleSheet.flatten([{marginVertical:10}, {flexDirection: 'row', justifyContent: 'space-around'}])}>
        <Text style={{textAlignVertical: 'center', textAlign: 'center'}}>De</Text>
        <Button color='green' title={timeToString(horaI.hora)} onPress={()=>setHoraI(hora=>({...hora, show: true}))} testID='horaInicio'/>
        <Text style={{textAlignVertical: 'center', textAlign: 'center'}}>Hasta</Text>
        <Button color='green' title={timeToString(horaF.hora)} onPress={()=>setHoraF(hora=>({...hora, show:true}))} testID='horaFin'/>
      </View>
      <Text style={{fontSize: 20}}>Frecuencia</Text>
      <View style={{marginVertical:10}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <CheckBox value={false}/>
          <CheckBox value={false}/>
          <CheckBox value={false}/>
          <CheckBox value={false}/>
          <CheckBox value={false}/>
          <CheckBox value={false}/>
          <CheckBox value={false}/>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text>Lun</Text>
          <Text>Mar</Text>
          <Text>Mie</Text>
          <Text>Jue</Text>
          <Text>Vie</Text>
          <Text>Sab</Text>
          <Text>Dom</Text>
        </View>
      </View>
      <View style={{marginVertical:10}}><Button color='green' title='Listo' onPress={()=>submitEvento()} testID='submit'/></View>
      <View style={{marginVertical:10}}><Button color='red' title='Cancelar' onPress={props.cancel} testID='cancelar'/></View>

      {horaI.show && <DateTimePicker 
                          value={horaI.hora | new Date()}
                          mode='time'
                          is24Hour={true}
                          display='default'
                          onChange={(event, time=new Date())=>{setHoraI({hora: new Date(time.setSeconds(0, 0)), show: false})}} 
                          testID='calendarI'/>
      }
      {horaF.show && <DateTimePicker 
                          value={horaF.hora | new Date()}
                          mode='time'
                          is24Hour={true}
                          display='default'
                          onChange={(event, time=new Date())=>{setHoraF({hora: new Date(time.setSeconds(0, 0)), show: false})}} 
                          testID='calendarF'/>
      }
    </View>
  );
}