import React from 'react';
import{
    StyleSheet,
    View,
    Text,
    Image,
    ImageBackground,
    Button
} from 'react-native';
import {timeToString} from '../dateFunctions';
import {Tarea, Rutina} from '../database/entidades';

function EstructuraLista(props){
    if (props.data instanceof Tarea) {
        let string = props.data.toString().split('\r\n');
        return (
           <View style={styles.item}>
                <View style={styles.blockLeft}>
                    <Text style={styles.txtName}>{string[0]}</Text>
                    <View style={styles.blockLeftBottom}>
                        <Text style={styles.txtHoraF}>{string[1]}</Text>
                    </View>
                    <View style={styles.blockLeftBottom}>
                        <Text style={styles.txtHoraF}>{string[2]}</Text>
                    </View>
                </View>
                {/*<View style={styles.blocRight}>
                    <ImageBackground source={require('../../images/logoTarea.png')} style={styles.logoEvento}>
                        <Button title='√←' onPress={()=>onCompleteTask(props.data)}/>
                    </ImageBackground>
                </View>*/}
            </View> 
        );
    }
    return(
            <View style={styles.item}>
                <View style={styles.blockLeft}>
                    <Text style={styles.txtName}>{props.data.name}</Text>
                    <View style={styles.blockLeftBottom}>
                        <View style={styles.itemHoraI}>
                            <Text style={styles.txtHoraI}>{timeToString(props.data.horaI)}</Text>
                        </View>
                        <View style={styles.itemHoraF}> 
                            <Text style={styles.txtHoraF}>{timeToString(props.data.horaF)}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.blocRight} >
                    <Image source={require('../../images/logoTarea.png')} style={styles.logoEvento}/>
                </View>
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