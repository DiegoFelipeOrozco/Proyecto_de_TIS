import React from 'react';
import{
	StyleSheet,
	View,
	FlatList,
	Text,
	Button,
	ImageBackground,
} from 'react-native';
import EstructuraLista from './estructuraLista.js'
import RoutineForm from '../RoutineForm';
import Header from './header.js';
import {timeToString, timeToLongString, dayToLiteralString} from '../dateFunctions';
import DatabaseController from '../database/controller';

let db = new DatabaseController();
let dbRead = false;

/**
props:
	tareas: arreglo de todas las tareas
*/
export default function VistaRutinas(props) {
	const [view, changeView] = React.useState(null);
	if (!dbRead){
		db.getRutinas((estado, tareas)=>{
			dbRead = true;
			props.setRutinas(tareas.sort((item1, item2)=>item1.horaI-item2.horaI));
		});
	}
	let addRutina = function(rutina){
		props.setRutinas(props.rutinas.concat(rutina).sort((item1, item2)=>item1.horaI-item2.horaI));
	};
	/**
	elimina varias rutinas
	@param indices(number): recibe el indice o indices de los elementos a eliminar
	*/
	let delRutinas1 = function(...indices){
		props.setRutinas(props.rutinas.filter((item, index)=>!indices.includes(index)).sort((item1, item2)=>item1.horaI-item2.horaI));
	};
	/**
	elimina varias rutinas
	@param selector(function): funcion con parametros (item, index) que retorna true cuando el objeto coincida para eliminacion
	*/
	let delRutinas2 = function(selector){
		props.setRutinas((rutinas)=>{
			db.removeRutina(rutinas.find((item, index)=>selector(item, index)).name);
			return rutinas.filter((item, index)=>!selector(item, index)).sort((item1, item2)=>item1.horaI-item2.horaI)
		});
	};
	let buildData = function(dia){
		let rutinas$huecos = [];
		if (props.rutinas.length > 0){
			rutinasHoy = props.rutinas.filter((item)=>item.days.includes(dia))
			let inicioHueco = new Date(rutinasHoy[0]?rutinasHoy[0].horaI:new Date()).setHours(0, 0);
			rutinasHoy.forEach((item, i)=>{
				if (item.horaI - inicioHueco > 0){
					rutinas$huecos.push({hueco:true, name: '', horaI: new Date(inicioHueco), horaF: item.horaI});
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
	const renderItem = ({item}) => (
		<View style={styles.item}>
			<View style={styles.blockLeft}>
				<Text style={styles.txtHoraF}>{timeToString(item.horaI)}</Text>
				<Text style={styles.txtHoraF}>{timeToString(item.horaF)}</Text>
			</View>
			<View style={styles.blockCenter}>
				<Text style={item.hueco?styles.txtHoraF:styles.txtName}>{item.name}</Text>
				<View style={styles.blockLeftBottom}>
					<View style={styles.itemHoraF}> 
						<Text style={styles.txtHoraF}>{timeToLongString(item.horaF-item.horaI)}</Text>
						{item.days?<Text style={styles.txtHoraF}>{item.days.reduce((string, day, i)=>string+((day !== new Date().getDay())?dayToLiteralString(day, true)+(i===item.days.length-1?'':', '):''), 'Tambien el ')}</Text>:null}
					</View>
				</View>
			</View>
			{ item.hueco? null:
				<View style={styles.blocRight} >
					<ImageBackground source={require('../../images/delete.png')} style={{width:'100%'}} imageStyle={{resizeMode:'contain',justifyContent:'center'}}>
						<Button title='' onPress={()=>delRutinas2((rutina)=>rutina.name === item.name)} color={'transparent'}/>
					</ImageBackground>
				</View>
			}
		</View>
	);
	const form = (
		<>
			<Header titulo='Crear Rutina'/>
			<RoutineForm onSubmit={(rutina)=>{changeView(null);addRutina(rutina)}}/>
		</>
	);
	const main = (
		<>
			<Header titulo={'Rutinas('+dayToLiteralString(new Date().getDay())+')'}/>
			<FlatList
				data={buildData(new Date().getDay())}
				renderItem={renderItem}
				ItemSeparatorComponent={()=><View style={styles.separador}></View>}
				ListEmptyComponent={<Text style={{color:'grey', fontSize:20, textAlign:'center', marginTop:'60%'}}>Lista Vacia</Text>}
				keyExtractor={(item)=>item.name + item.horaI.getTime()}
			/>
			<Button title='añadir' onPress={()=>changeView(form)} color='green'/>
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
		flex: 1
	},
	separador:{
		height:1,
		width:'80%',
		backgroundColor:'blue',
		marginVertical:10,
		alignItems: 'center',
		marginLeft:'10%'
	},
	item:{
		flexDirection:"row",
		justifyContent: 'space-between',
	},
	blockLeft:{
		flexDirection: 'column',
		flex: 1,
		justifyContent: 'space-around',
		marginLeft:'5%',
	},
	blockCenter: {
		flex: 2,
		flexDirection: 'column',
		justifyContent: 'space-around',
	},
	blocRight:{
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-around',
		alignItems: 'center',
		marginRight: '5%'
	},
	blockLeftBottom:{
		flexDirection:'row',
		marginTop:6
	},
	logoEvento:{
		width:57,
		height:57,
		resizeMode:'contain',
		justifyContent:'center'
	},
	txtName:{
		fontSize:20
	},
	txtHoraI:{
		marginLeft:'5%',
		color:'grey'
	},
	txtHoraF:{
		color:'grey'   
	},
	itemHoraI:{
		marginLeft:'5%'
	},
	itemHoraF:{
		marginLeft:'5%',
	}
});
