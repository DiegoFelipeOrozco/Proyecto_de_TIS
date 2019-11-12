import React from 'react';
import{
	StyleSheet,
	View,
	Image,
	Text
} from 'react-native';

function Header(){
	return(
		<View style={styles.header}>
			<View style={styles.headerLeft}>
			  <Image source={require('../../images/logoHeader.png')} style={styles.logoHeader}/>
			</View>
			<View style={styles.headerRight}>
				<Text style={styles.textLogo}>Tareas</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	header:{
		flex: 0.1,
		flexDirection: 'row',
		backgroundColor:'red',
		marginBottom:6
	},
	headerLeft:{
		flex:0.2,
		alignItems:'center'
	},
	headerRight:{
		flex:1,
		justifyContent:'center'
	},
	textLogo:{
		fontSize:30,
		color: '#FFF',
		fontWeight: "bold"
	},
	logoHeader:{
		width:57,
		height:57,
		borderRadius:50,
		resizeMode:'contain',
		justifyContent:'center'
	}
});

export default Header;