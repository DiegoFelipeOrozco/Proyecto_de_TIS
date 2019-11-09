import React from 'react';
import{
    StyleSheet,
    View,
    ScrollView,
    FlatList,
    Text
} from 'react-native';
import EstructuraLista from './estructuraLista.js';
import {Tarea} from '../database/entidades';

export default function ListaTareas(props){
    let separador =()=>{
        return(
            <View style={styles.separador}>
            </View>
        )
    }
    return(
        <View style={styles.body}>
                <FlatList
                    data={props.tareas}
                    renderItem={ ({item}) => <EstructuraLista data={item} />}
                    ItemSeparatorComponent={separador}
                    ListEmptyComponent={<Text style={{color:'grey', fontSize:20, textAlign:'center', marginTop:'60%'}}>Lista Vacia</Text>}
                ></FlatList>
        </View>  
    )   
};

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