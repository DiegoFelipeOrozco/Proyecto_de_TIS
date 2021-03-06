import React from 'react';
import{
	StyleSheet,
	View,
	FlatList,
	Text,
	Button,
} from 'react-native';
import TaskForm from '../TaskForm';
import {dateToString,timeToLongString} from '../dateFunctions';
import Header from './header.js';
import DatabaseController from '../database/controller';
import {Tarea} from '../database/entidades';

let db = new DatabaseController();
let dbRead = false;
/**
props:
	tareas: arreglo de todas las tareas
*/
export default function ListaTareas(props) {
	const [tareas, setTareas] = React.useState(props.tareas || []);
	const [view, changeView] = React.useState(null);
	if (!dbRead){
		db.getTareas((estado, tareas)=>{
			dbRead = true;
			setTareas(tareas);
		});
	}
	let addTarea = function(tarea){
		setTareas(tareas.concat(tarea));
	};
	/**
	elimina varias tareas
	@param indices(number): recibe el indice o indices de los elementos a eliminar
	*/
	let delTareas1 = function(...indices){
		setTareas(tareas.filter((item, index)=>!indices.includes(index)));
	};
	/**
	elimina varias tareas
	@param selector(function): funcion con parametros (item, index) que retorna true cuando el objeto coincida para eliminacion
	*/
	let delTareas2 = function(selector){
		setTareas((PTareas)=>{
			db.removeTarea(PTareas.find((item, index)=>selector(item, index)).name);
			return PTareas.filter((item, index)=>!selector(item, index))
		});    
	};
	React.useEffect(()=>{
		changeView(null);
	}, [tareas]);

	const renderItem = ({item})=>(
		<View>
			<Text>{item.name}</Text>
			<Text>{'fecha limite: '+dateToString(item.fechaLimite)}</Text>
			<Text>{'dedicacion hoy: '+timeToLongString(item.dedicacion)}</Text>
			<Button title={Boolean(item.completado)?'←': '√'}/>
			<Button title='eliminar' onPress={()=>delTareas2((tarea)=>tarea.name === item.name)}/>
		</View>
	);
	const form = (<TaskForm onSubmit={(tarea)=>addTarea(tarea)}/>);
	const main = (
		<>
			<Header titulo='Tareas'/>
			<FlatList
				data={tareas}
				renderItem={renderItem}
				ItemSeparatorComponent={()=><View style={styles.separador}></View>}
				ListEmptyComponent={<Text style={{color:'grey', fontSize:20, textAlign:'center', marginTop:'60%'}}>Lista Vacia</Text>}
				keyExtractor={(item)=>item.name}
			/>
			<Button title='añadir' onPress={()=>changeView(form)}/>
		</>
	);
	Tarea.asignarTiempos(tareas, props.rutinasHoy);
	return(
		<View style={styles.body}>
			{view || main}
		</View>  
	);
}

const styles = StyleSheet.create({
	body:{
		flex:1
	},
	separador:{
		height:1,
		width:'80%',
		backgroundColor:'grey',
		marginVertical:10,
		alignItems: 'center',
		marginLeft:'10%'
	}
});
