import React from 'react';
import{
	StyleSheet,
	View,
	Image,
	Text
} from 'react-native';

function Header(props){
	return(
		<View style={styles.header}>
			<View style={styles.headerLeft}>
			  <Image source={require('../../images/logoHeader.png')} style={styles.logoHeader}/>
			</View>
			<View style={styles.headerRight}>
				<Text style={styles.textLogo}>{props.titulo}</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	header:{
		height: 50,
		flexDirection: 'row',
		backgroundColor:'green',
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
		color: 'white',
		fontWeight: "bold"
	},
	logoHeader:{
		flex:1,
		borderRadius:50,
		resizeMode:'contain',
		justifyContent:'center'
	}
});

export default Header;