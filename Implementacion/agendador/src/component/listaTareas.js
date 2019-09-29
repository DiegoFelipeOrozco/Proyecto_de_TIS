import React from 'react';
import{
    StyleSheet,
    View,
    ScrollView,
    FlatList,
    Text
} from 'react-native';
import EstructuraLista from './estructuraLista.js'

class ListaTareas extends React.Component{
    
    constructor(props){
        super(props);
        this.state={
            tareas:[
                {key:'0', name:'Mercar', horaI:"8:30",horaF:"9:00"},
                {key:'1', name:'Estudiar para el Quiz', horaI:"10:30",horaF:"0"},
                {key:'2', name:'Ir al GYM', horaI:"12:50",horaF:"13:30"},
                {key:'3', name:'Tarea de Electronica', horaI:"12:50",horaF:"13:30"},
                {key:'4', name:'Estudiar IoT', horaI:"13:50",horaF:"14:30"},
                {key:'5', name:'Almorzar', horaI:"14:40",horaF:"16:30"},
                {key:'6', name:'Recoger a Lupe', horaI:"17:20",horaF:"18:50"},
                {key:'7', name:'Comprar comida del Perro', horaI:"20:00",horaF:"21:30"},
                {key:'8', name:'Lavar Ropa', horaI:"21:30",horaF:"21:58"}
            ]
        }
    }
    separador =()=>{
        return(
            <View style={styles.separador}>
            </View>
        )
    }
    render(){
        return(
            <View style={styles.body}>
                    <FlatList
                        data={this.state.tareas}
                        renderItem={ ({item}) => <EstructuraLista data={item} />}
                        ItemSeparatorComponent={this.separador}
                        ListEmptyComponent={<Text style={{color:'grey', fontSize:20, textAlign:'center', marginTop:'60%'}}>Lista Vacia</Text>}
                    ></FlatList>
            </View>  
        )
    }    
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

export default ListaTareas;