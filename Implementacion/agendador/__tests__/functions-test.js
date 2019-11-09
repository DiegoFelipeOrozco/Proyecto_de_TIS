import React from 'react-native';
import {Rutina, Tarea} from '../src/database/entidades';

test('entidades operan sin problemas', async ()=>{
	let hora1 = new Date(new Date().setHours(6));
	let hora2 = new Date(new Date().setHours(8));

	let rutina = new Rutina('rutina1 prueba', hora1, hora2, 7, new Date());

	let fechaRef = new Date();
	let tarea1 = new Tarea('tarea1 prueba', new Date(fechaRef.getTime()+30*24*60*60*1000));//en un mes
	let tarea2 = new Tarea('tarea2 prueba', new Date(fechaRef.getTime()+10*24*60*60*1000));//en 10 dias
	let tarea3 = new Tarea('tarea3 prueba', new Date(fechaRef.getTime()+7*24*60*60*1000));//en una semana
	let tarea4 = new Tarea('tarea4 prueba', new Date(fechaRef.getTime()+10*24*60*60*1000));//en 10 dias

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
	expect(method).toHaveReturned();
	horasDiarias = 0;
	for (let tarea of [tarea1, tarea2, tarea3, tarea4]){
		console.log(tarea.toString());
		horasDiarias+=tarea.dedicacion;
	}
	expect(horasDiarias).toBe(24);

});