import React from 'react';
import{
    StyleSheet,
    View,
    Text
} from 'react-native';

function EstructuraLista(props){
    return(
            <View style={styles.item}>
                <Text style={styles.itemTittle}>{props.data.tittle}</Text>
            </View>
    );
};

const styles = StyleSheet.create({
    item:{
        justifyContent: 'flex-start'
    },
    itemTittle:{
        fontSize:20
    }
});

export default EstructuraLista;