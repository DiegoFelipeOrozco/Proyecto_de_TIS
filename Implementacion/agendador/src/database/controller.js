import React from 'react';
import firebaseConfig from './init';
import { firebase } from '@react-native-firebase/database';
import {Tarea, Rutina} from './entidades';

/**
clase que encapsula todas las operaciones que se pueden hacer sobre la base de datos y sus entidades.
El uso de esta clase permite respetar el esquema de datos establecido
*/
export default class DatabaseController{
	db: Object;
	constructor(){
		try {
			this.db = firebase.database();
		}catch(error){
			firebase.initializeApp(firebaseConfig);
			this.db = firebase.database();
		}
	}
	/**
	inserta una sola tarea a la base de datos
	parametros:
		task: objeto que representa una tarea pura
		onComplete(function): opcional, callback para cuando la operacion halla terminado, tanto con error como con exito.
	retorna(Promise): la promesa de la operacion, sobre la cual tambien se pueden adjuntar callbacks manualmente
	*/
	insertTask(task: Tarea, onComplete: function){
		return this.db.ref('/tasks/'+task.name).set(task.toSimpleObject(), onComplete);
	}
	/**
	inserta una sola rutina a la base de datos
	parametros:
		task: objeto que representa una rutina pura
		onComplete(function): opcional, callback para cuando la operacion halla terminado, tanto con error como con exito.
	retorna(Promise): la promesa de la operacion, sobre la cual tambien se pueden adjuntar callbacks manualmente
	*/
	insertRoutine(routine: Rutina, onComplete: function){
		return this.db.ref('/routines/'+routine.name).set(routine.toSimpleObject(), onComplete);
	}

	getTareas(callback){
		let tareas = []
		this.db.ref('/tasks/').once('value', (snapshot) => {
			snapshot.forEach((chldSnapshot)=>{
				tareas.push(Tarea.buildFromJSON(chldSnapshot.val()))
			});
			callback(0, tareas);
		});
	}

	getRutinas(callback){
		let rutinas = []
		this.db.ref('/routines/').once('value', (snapshot) => {
			snapshot.forEach((chldSnapshot)=>{
				rutinas.push(Rutina.buildFromJSON(chldSnapshot.val()))
			});
			callback(0, rutinas);
		});
	}

	removeTarea(key: string, onComplete: function){
		this.db.ref('/tasks/'+key).remove(onComplete);
	}

	removeRutina(key, onComplete){
		this.db.ref('/routines/'+key).remove(onComplete);
	}
}