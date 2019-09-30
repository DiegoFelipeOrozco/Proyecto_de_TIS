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
            tareas: props.tareas
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