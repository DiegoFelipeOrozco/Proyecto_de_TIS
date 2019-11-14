import React from 'react';
import{
	StyleSheet,
	View,
	Text,
	Button,
} from 'react-native';
import {timeToString, timeToLongString, dayToLiteralString} from '../dateFunctions';

function EstructuraLista(props){
	return(
		<View style={styles.item}>
			<View style={styles.blockLeft}>
				<Text style={props.data.hueco?styles.txtHoraF:styles.txtName}>{props.data.name}</Text>
				<View style={styles.blockLeftBottom}>
					<View style={styles.itemHoraF}> 
						<Text style={styles.txtHoraF}>{timeToString(props.data.horaI)}</Text>
						<Text style={styles.txtHoraF}>{timeToString(props.data.horaF)}</Text>
						<Text style={styles.txtHoraF}>{timeToLongString(props.data.horaF-props.data.horaI)}</Text>
						{props.data.days?<Text style={styles.txtHoraF}>{props.data.days.reduce((string, day, i)=>string+dayToLiteralString(day)+(i===props.data.days.length-1?'':', '), 'Tambien el ')}</Text>:null}
					</View>
				</View>
			</View>
			{ props.data.hueco? null:
				<View style={styles.blocRight} >
					<Button title='eliminar'/>
				</View>
			}
		</View>
	);
};

const styles = StyleSheet.create({
	item:{
		flexDirection:"row"
	},
	blockLeft:{
		flex:4,
		marginLeft:'5%'
	},
	blocRight:{
		flex:1
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

export default EstructuraLista;