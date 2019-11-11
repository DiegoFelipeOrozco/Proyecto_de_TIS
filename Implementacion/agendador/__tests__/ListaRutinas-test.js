import 'react-native';
import React from 'react';
import ListaTareas from '../src/component/listaTareas';
import { fireEvent, nativeEvent, render } from '@testing-library/react-native';
import {Rutina} from '../src/database/entidades';

test('lista las rutinas', async ()=>{
	rutinas = [
        new Rutina('Mercar', new Date(new Date().setHours(8, 30, 0, 0)), new Date(new Date().setHours(9, 0, 0, 0)), 7, new Date()),
        new Rutina('pasear al perro', new Date(new Date().setHours(10, 30, 0, 0)), new Date(new Date().setHours(12, 30, 0, 0)), 7, new Date()),
        new Rutina('Ir al GYM', new Date(new Date().setHours(12, 50, 0, 0)), new Date(new Date().setHours(13, 30, 0, 0)), 7, new Date()),
        new Rutina('desayunar', new Date(new Date().setHours(13, 30, 0, 0)), new Date(new Date().setHours(14, 30, 0, 0)), 7, new Date()),
        new Rutina('clase IoT', new Date(new Date().setHours(14, 30, 0, 0)), new Date(new Date().setHours(14, 40, 0, 0)), 7, new Date()),
        new Rutina('Almorzar', new Date(new Date().setHours(14, 40, 0, 0)), new Date(new Date().setHours(16, 30, 0, 0)), 7, new Date()),
        new Rutina('Recoger a Lupe', new Date(new Date().setHours(17, 20, 0, 0)), new Date(new Date().setHours(18, 50, 0, 0)), 7, new Date()),
        new Rutina('Comprar comida del Perro', new Date(new Date().setHours(20, 0, 0, 0)), new Date(new Date().setHours(21, 30, 0, 0)), 7, new Date()),
        new Rutina('Lavar Ropa', new Date(new Date().setHours(21, 30, 0, 0)), new Date(new Date().setHours(21, 58, 0, 0)), 7, new Date())
    ];

    var stringToMatch = "";
    for (var i = 0; i < rutinas.length; i++)
    	stringToMatch += rutinas[i].name + "|";
    stringToMatch = stringToMatch.slice(0, -1);

	const { container} = render(<ListaTareas tareas={rutinas}/>);

    const items = container.findAll(node=>node.type === 'Text');
    expect(items).toHaveLength(rutinas.length*3);
    for (var i = 0; i < items.length; i++) {
        expect(items[i].children[0].type).not.toBe('');
    }
});