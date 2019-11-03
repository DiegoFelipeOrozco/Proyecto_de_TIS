import React from 'react-native';
import {Rutina, Tarea} from '../src/database/entidades';

test('entidades operan sin problemas', async ()=>{
	let fecha1 = new Date(2019, 10, 3, 6, 0, 0, 0);
	let fecha2 = new Date(2019, 10, 3, 8, 0, 0, 0);

	let rutina = new Rutina('rutina1 prueba', fecha1, fecha2, 7, new Date(2019, 10, 3));

	let tarea1 = new Tarea('tarea1 prueba', new Date(2019, 11, 3));
	let tarea2 = new Tarea('tarea2 prueba', new Date(2019, 10, 13));
	let tarea3 = new Tarea('tarea3 prueba', new Date(2019, 10, 10));
	let tarea4 = new Tarea('tarea4 prueba', new Date(2019, 10, 13));

	let method = jest.fn((arg1)=>rutina.setNombre(arg1));
	console.log(method('rutina1 cambio nombre'));
	expect(method).toHaveReturned();

	method = jest.fn(()=>rutina.toSimpleObject());
	console.log(method());
	expect(method).toHaveReturned();

	method = jest.fn((arg1)=>tarea1.equals(arg1));
	method(tarea1);
	expect(method).toHaveReturnedWith(true);
	method(rutina);
	expect(method).toHaveReturnedWith(false);

	method = jest.fn(()=>tarea1.toString());
	console.log(method());
	expect(method).toHaveReturned();

	method = jest.fn((arg1, arg2)=>Tarea.asignarTiempos(arg1, arg2));
	method([tarea1, tarea2, tarea3, tarea4], 24);
	for (let tarea of [tarea1, tarea2, tarea3, tarea4]){
		console.log(tarea.toString());
	}
	expect(method).toHaveReturned();

});