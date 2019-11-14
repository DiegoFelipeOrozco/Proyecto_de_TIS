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
  TextInput
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
      indicarError(<Text style={{color: 'red',}}>debe indicar el nombre del evento</Text>);
    } else if (horaF.hora - horaI.hora <= 0){
      indicarError(<Text style={{color: 'red',}}>La hora de inicio debe ser menor ni igual a la hora de fin</Text>)
    } else {
      let nuevaRutina: Rutina = new Rutina(
        name,
        horaI.hora,
        horaF.hora,
        7,//periodicidad semanal mientras se diseña la interfaz para el usuario
        [1,2,3,4,5,6,7]
      );
      db.insertRoutine(
        nuevaRutina, 
        (error)=>{
          if(error){
            //notificacion del error
            indicarError(<Text style={{color: 'red',}}>no se puede guardar la rutina</Text>);
          } else {
            props.onSubmit(nuevaRutina);
          }
      });
    }
  }
  return(
    <View style={{flex:1, justifyContent: 'center'}}>
      {error}
      <Text style={styles.letterNormal}>nombre*</Text>
      <TextInput style={StyleSheet.flatten([generalStyles.visualViews, generalStyles.borderBlue])} onChangeText={name => {setName(name)}} testID='nombre'/>
      <Button style={generalStyles.visualViews} title={'Hora de inicio: ' + timeToString(horaI.hora)} onPress={()=>setHoraI(hora=>({...hora, show: true}))} testID='horaInicio'/>
      <View style={generalStyles.separador}></View>
      <Button style={generalStyles.visualViews} title={'Hora de fin: ' + timeToString(horaF.hora)} onPress={()=>setHoraF(hora=>({...hora, show:true}))} testID='horaFin'/>
      <View style={generalStyles.separador}></View>
      <Button style={{marginTop: 10, marginBottom: 10}} title='Terminado' onPress={()=>submitEvento()} testID='submit'/>
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

const styles = StyleSheet.create({
  letterNormal: {
    fontSize: 15
  }
});