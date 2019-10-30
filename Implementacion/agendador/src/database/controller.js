import React from 'react';
import firebaseConfig from './init';
import { firebase } from '@react-native-firebase/database';

export default class DatabaseController{
	constructor(){
		try {
			this.db = firebase.database();
		}catch(error){
			firebase.initializeApp(firebaseConfig);
		}
	}

	insertTask(task, onComplete){
		return this.db.ref("/tasks/"+task.name).set(task, onComplete);
	}

	insertRoutine(routine, onComplete){
		return this.db.ref("/routines/"+routine.name).set(routine, onComplete);
	}

	readEvents(){
		return [];
	}
}