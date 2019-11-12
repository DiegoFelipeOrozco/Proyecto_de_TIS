import React from 'react';
import{
    StyleSheet,
    View,
    ScrollView,
    FlatList,
    Text
} from 'react-native';
import EstructuraLista from './estructuraLista.js'

/**
props:
    tareas: arreglo de todas las tareas
*/
export default function VistaRutinas(props) {
    const [rutinas, setRutinas] = React.useState([]);
    separador =()=>{
        return(
            <View style={styles.separador}>
            </View>
        )
    }
    return(
        <View style={styles.body}>
            <FlatList
                data={props.rutinas}
                renderItem={ ({item}) => <View style={{flexDirection: row}}><View style={{flex: 1,flexDirection: 'column'}}><Text>item.HoraI</Text><Text>item.HoraF</Text></View><Text style={{flex: 1}}>item.name</Text></View>}
                ItemSeparatorComponent={separador}
                ListEmptyComponent={<Text style={{color:'grey', fontSize:20, textAlign:'center', marginTop:'60%'}}>Lista Vacia</Text>}
                keyExtractor={(item)=>item.name}
            />
        </View>  
    )    
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
