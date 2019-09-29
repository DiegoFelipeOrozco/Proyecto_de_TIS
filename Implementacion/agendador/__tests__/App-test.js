/**
 * @format
 */

import 'react-native';
import React from 'react';
import {App, FormularioTarea, FormularioEvento} from '../App';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { fireEvent, NativeTestEvent, nativeEvent, render } from '@testing-library/react-native';

/*it('renders correctly', () => {
  renderer.create(<App />);
});
*/
test('crea tarea', async ()=>{
	var resultado = undefined;
	function getTarea(tarea){
		resultado = tarea;
	}
	const { getByTestId } = render(<FormularioTarea onSubmit={getTarea}/>);

	const idTarea = "prueba tarea";
	const fechaLimite = new Date();

	fireEvent.changeText(getByTestId('nombre'), idTarea);
	fireEvent.press(getByTestId('fecha'));
	//seleccionando una fecha
	getByTestId('calendar').getProp('onChange')({type: 'set', nativeEvent: {timestamp: fechaLimite.setFullYear(2021, 0, 1)}}, fechaLimite);

	fireEvent.press(getByTestId('submit'));
	expect(resultado.name).toBe(idTarea);
	expect(resultado.limite).toStrictEqual(fechaLimite);
});
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

