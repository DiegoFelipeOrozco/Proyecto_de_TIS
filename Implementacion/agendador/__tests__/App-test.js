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
	const { getByRole, getByTestId, getByDisplayValue, baseElement } = render(<FormularioTarea onSubmit={getTarea}/>);

	const idTarea = "prueba tarea";
	const fechaLimite = new Date(2030, 0, 1);

	fireEvent.changeText(getByTestId('nombre'), idTarea);
	/*fireEvent.press(getByTestId('fecha'));
	fireEvent.change(
	  getByTestId('calendar'),
	  new NativeTestEvent('change', { event: nativeEvent, date: fechaLimite })//seleccionando fecha
  	);*/
	fireEvent.press(getByTestId('submit'));
	expect(resultado.id).toBe(idTarea);
	//expect(resultado.limite).toBe(fechaLimite);
});
test('crea evento', async ()=>{
	var resultado = undefined;
	function getEvento(tarea){
		resultado = tarea;
	}
	const { getByTestId, baseElement } = render(<FormularioEvento onSubmit={getEvento}/>);

	const idTarea = "prueba evento";
	const inicio = new Date();
	inicio.setHours(8);
	inicio.setMinutes(0);
	inicio.setSeconds(0);
	const fin = new Date();
	fin.setHours(10);
	fin.setMinutes(0);
	fin.setSeconds(0);

	fireEvent.changeText(getByTestId('nombre'), idTarea);
	/*fireEvent.press(getByTestId('horaInicio'));
	fireEvent(
	  getByTestId('calendarI'),
	  new NativeTestEvent('onChange', { nativeEvent: { value: inicio } }),
	);
	fireEvent.press(getByTestId('horaFin'));
	fireEvent(
	  getByTestId('calendarF'),
	  new NativeTestEvent('onChange', { nativeEvent: { value: fin } }),
	);*/
	fireEvent.press(getByTestId('submit'));
	expect(resultado).toBe(undefined);
	//expect(resultado.id).toBe(idTarea);
	/*expect(resultado.inicio).not.toBe(inicio);
	expect(resultado.fin).not.toBe(fin);*/
});

