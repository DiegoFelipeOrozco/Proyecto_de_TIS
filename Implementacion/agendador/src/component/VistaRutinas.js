import React from 'react';
import{
	StyleSheet,
	View,
	FlatList,
	Text,
	Button,
} from 'react-native';
import EstructuraLista from './estructuraLista.js'
import RoutineForm from '../RoutineForm';
import Header from './header.js';
import {dayToLiteralString} from '../dateFunctions';
import DatabaseController from '../database/controller';

let db = new DatabaseController();
let dbRead = false;

/**
props:
	tareas: arreglo de todas las tareas
*/
export default function VistaRutinas(props) {
	const [rutinas, setRutinas] = React.useState(props.rutinas || []);
	const [view, changeView] = React.useState(null);
	if (!dbRead){
		db.getRutinas((estado, tareas)=>{
			dbRead = true;
			setRutinas(tareas);
		});
	}
	let addRutina = function(rutina){
		setRutinas(rutinas.concat(rutina).sort((item1, item2)=>item1.horaI-item2.horaI));
	};
	/**
	elimina varias rutinas
	@param indices(number): recibe el indice o indices de los elementos a eliminar
	*/
	let delRutinas1 = function(...indices){
		setRutinas(rutinas.filter((item, index)=>!indices.includes(index)).sort((item1, item2)=>item1.horaI-item2.horaI));
	};
	/**
	elimina varias rutinas
	@param selector(function): funcion con parametros (item, index) que retorna true cuando el objeto coincida para eliminacion
	*/
	let delRutinas2 = function(selector){
		setRutinas(rutinas.filter((item, index)=>!selector(item, index)).sort((item1, item2)=>item1.horaI-item2.horaI));    
	};
	let buildData = function(dia){
		let rutinas$huecos = [];
		if (rutinas.length > 0){
			let inicioHueco = new Date(rutinas[0].horaI).setHours(0, 0);
			rutinas.filter((item)=>item.days.includes(dia)).forEach((item, i)=>{
				if (item.horaI - inicioHueco > 0){
					rutinas$huecos.push({hueco:true, name: 'espacio libre', horaI: new Date(inicioHueco), horaF: item.horaI});
				}
				rutinas$huecos.push(item);
				inicioHueco = item.horaF;
			});
			if (new Date(inicioHueco).setHours(23,59,0,0) - inicioHueco > 0){
				rutinas$huecos.push({hueco:true, name: 'espacio libre', horaI: new Date(inicioHueco), horaF: new Date(new Date(inicioHueco).setHours(23,59,0,0)), hueco:true});
			}
		}
		return rutinas$huecos;
	}
	React.useEffect(()=>{
		changeView(null);
	}, [rutinas]);
	const form = (<RoutineForm onSubmit={(rutina)=>addRutina(rutina)}/>);
	const main = (
		<>
			<Header titulo={'Rutinas('+dayToLiteralString(new Date().getDay())+')'}/>
			<FlatList
				data={buildData(new Date().getDay())}
				renderItem={ ({item}) => <EstructuraLista data={item}/>}
				ItemSeparatorComponent={()=><View style={styles.separador}></View>}
				ListEmptyComponent={<Text style={{color:'grey', fontSize:20, textAlign:'center', marginTop:'60%'}}>Lista Vacia</Text>}
				keyExtractor={(item)=>item.name + item.horaI.getTime()}
			/>
			<Button title='añadir' onPress={()=>changeView(form)}/>
		</>
	);
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
