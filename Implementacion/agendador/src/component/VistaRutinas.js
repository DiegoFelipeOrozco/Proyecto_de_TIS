import React from 'react';
import{
	StyleSheet,
	View,
	ScrollView,
	FlatList,
	Text,
	Button,
} from 'react-native';
import EstructuraLista from './estructuraLista.js'
import RoutineForm from '../RoutineForm';

/**
props:
	tareas: arreglo de todas las tareas
*/
export default function VistaRutinas(props) {
	const [rutinas, setRutinas] = React.useState(props.rutinas || []);
	const [view, changeView] = React.useState(null);
	let addRutina = function(rutina){
		setRutinas(rutinas.concat(rutina));
	};
	/**
	elimina varias rutinas
	@param indices(number): recibe el indice o indices de los elementos a eliminar
	*/
	let delRutinas1 = function(...indices){
		setRutinas(rutinas.filter((item, index)=>!indices.includes(index)));
	};
	/**
	elimina varias rutinas
	@param selector(function): funcion con parametros (item, index) que retorna true cuando el objeto coincida para eliminacion
	*/
	let delRutinas2 = function(selector){
		setRutinas(rutinas.filter((item, index)=>!selector(item, index)));    
	};
	React.useEffect(()=>{
		changeView(null);
	}, [rutinas]);
	const form = (<RoutineForm onSubmit={(rutina)=>addRutina(rutina)}/>);
	const main = (
		<>
			<FlatList
				data={rutinas}
				renderItem={ ({item}) => <EstructuraLista data={item}/>}
				ItemSeparatorComponent={()=><View style={styles.separador}></View>}
				ListEmptyComponent={<Text style={{color:'grey', fontSize:20, textAlign:'center', marginTop:'60%'}}>Lista Vacia</Text>}
				keyExtractor={(item)=>item.name}
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
