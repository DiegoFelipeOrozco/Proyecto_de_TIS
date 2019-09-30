import 'react-native';
import React from 'react';
import ListaTareas from '../src/component/listaTareas';
import { fireEvent, nativeEvent, render } from '@testing-library/react-native';

test('lista las tareas', async ()=>{
	tareas = [{key:'0', name:'Mercar', horaI:"8:30",horaF:"9:00"},
                {key:'1', name:'Estudiar para el Quiz', horaI:"10:30",horaF:"0"},
                {key:'2', name:'Ir al GYM', horaI:"12:50",horaF:"13:30"},
                {key:'3', name:'Tarea de Electronica', horaI:"12:50",horaF:"13:30"},
                {key:'4', name:'Estudiar IoT', horaI:"13:50",horaF:"14:30"},
                {key:'5', name:'Almorzar', horaI:"14:40",horaF:"16:30"},
                {key:'6', name:'Recoger a Lupe', horaI:"17:20",horaF:"18:50"},
                {key:'7', name:'Comprar comida del Perro', horaI:"20:00",horaF:"21:30"},
                {key:'8', name:'Lavar Ropa', horaI:"21:30",horaF:"21:58"}];

    var stringToMatch = "";
    for (var i = 0; i < tareas.length; i++)
    	stringToMatch += tareas[i].name + "|";
    stringToMatch = stringToMatch.slice(0, -1);

	const { container} = render(<ListaTareas tareas={tareas}/>);

    const items = container.findAll(node=>node.type === 'Text');
    expect(items).toHaveLength(tareas.length*3);
    for (var i = 0; i < items.length; i++) {
        expect(items[i].children[0].type).not.toBe('');
    }
});