import 'react-native';
import React from 'react';
import FormularioTarea from '../src/FormularioTarea';
import {inicioDia} from '../src/dateFunctions';
import { fireEvent, NativeTestEvent, nativeEvent, render } from '@testing-library/react-native';

test('crea tarea', async ()=>{
	var resultado = undefined;
	function getTarea(tarea){
		resultado = tarea;
	}
	const { getByTestId } = render(<FormularioTarea onSubmit={getTarea}/>);

	const idTarea = "prueba tarea";
	const fechaLimite = inicioDia(new Date());

	fireEvent.changeText(getByTestId('nombre'), idTarea);
	fireEvent.press(getByTestId('fecha'));
	//seleccionando una fecha
	getByTestId('calendar').getProp('onChange')({type: 'set', nativeEvent: {timestamp: fechaLimite.setFullYear(2021, 0, 1)}}, fechaLimite);

	fireEvent.press(getByTestId('submit'));
	expect(resultado.name).toBe(idTarea);
	expect(resultado.limite).toStrictEqual(fechaLimite);
});