import React from 'react';
import {
	StyleSheet,
	View,
	Text,
	Button,
} from 'react-native';
import ListaTareas from './src/component/listaTareas.js';
import VistaRutinas from './src/component/VistaRutinas';

import ViewPager from '@react-native-community/viewpager';

export const generalStyles = StyleSheet.create({
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
const App: () => React$Node = () => {
	const [rutinas, setRutinas] = React.useState([]);
	const [view, changeView] = React.useState(<ViewPager style={{flex: 1}} initialPage={0}><View><VistaRutinas rutinas={rutinas} setRutinas={(rutinas)=>setRutinas(rutinas)}/></View><View><ListaTareas rutinasHoy={rutinas.filter((item)=>item.days.includes(new Date().getDay()))}/></View></ViewPager>);
	return (
		<View style={styles.container}>
			<ViewPager style={{flex: 1}} initialPage={0}><View><VistaRutinas rutinas={rutinas} setRutinas={(rutinas)=>setRutinas(rutinas)}/></View><View><ListaTareas rutinasHoy={rutinas.filter((item)=>item.days.includes(new Date().getDay()))}/></View></ViewPager>
		</View>
	);
};

const styles = StyleSheet.create({
	container:{
		flex: 1,
		backgroundColor: '#fff',
	}
});

export default App;
