import 'react-native';
import React from 'react';
import FormularioEvento from '../src/FormularioEvento';
import { fireEvent, NativeTestEvent, nativeEvent, render } from '@testing-library/react-native';

test('crea evento', async ()=>{
	var resultado = undefined;
	function getEvento(evento){
		resultado = evento;
	}
	const { getByTestId, debug } = render(<FormularioEvento onSubmit={getEvento}/>);

	const idTarea = "prueba evento";
	const inicio = new Date();
	const fin = new Date();

	fireEvent.changeText(getByTestId('nombre'), idTarea);
	fireEvent.press(getByTestId('horaInicio'));

	getByTestId('calendarI').getProp('onChange')({type: 'set', nativeEvent: {timestamp: new Date().setHours(8, 0)}}, inicio);

	fireEvent.press(getByTestId('horaFin'));

	getByTestId('calendarF').getProp('onChange')({type: 'set', nativeEvent: {timestamp: new Date().setHours(10, 0)}}, fin);

	fireEvent.press(getByTestId('submit'));
	expect(resultado.name).toBe(idTarea);
	expect(resultado.horaI).toBe('08:00');
	expect(resultado.horaF).toBe('10:00');
});