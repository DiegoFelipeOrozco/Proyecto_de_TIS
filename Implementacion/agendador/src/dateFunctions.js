/**
	transforma una fecha dada a un String con el formato de la aplicacion.
	@param date: tipo Date
*/
export function dateToString(date){
 return date.toLocaleDateString();
}
/**
	transforma una fecha dada a un String con el formato de hora de la aplicacion.
	@param time: tipo Date
*/
export function timeToString(time){
	return time.toTimeString().substr(0, 5);
}
/**
formato largo del tiempo especialmente util para indicar tiempo relativo a una hora del dia
@param time(Date|number): una resta entre Dates
*/
export function timeToLongString(time){
	let horas = time/3600000;
	let minutos = horas%1*60;
	return (Math.floor(horas)===0?'':Math.floor(horas) + ' hora(s) ') + (Math.round(minutos) === 0?'':Math.round(minutos) + ' minuto(s)');
}
/**
	callback personalizado para el onChange de <RNDateTimePicker mode='date'/>, este valida todo lo que el componente deberia validar, pero que no lo hace
*/
export function onDateSelected(event, date, action, failAction=()=>{}){
	if (date >= new Date() && date !== undefined){
	action(date);
	} else {
	failAction();
	}
}
/**
	devuelve la fecha pasada con horas, minutos, segundos y milisegundos en 0, el inicio del dia; util al momento de comparar fechas
*/
export function inicioDia(dia){
	dia.setHours(0);
	dia.setMinutes(0);
	dia.setSeconds(0);
	dia.setMilliseconds(0);
	return dia;
}
/**
retorna el string del numero de dia de la semana pasado
@param day(number): 1>=day>=7
*/
export function dayToLiteralString(day){
	switch(day){
		case 1:
			return 'Lunes';
		case 2:
			return 'Martes';
		case 3:
			return 'Miercoles';
		case 4:
			return 'Jueves';
		case 5:
			return 'Viernes';
		case 6:
			return 'Sabado';
		case 7:
			return 'Domingo';
		default:
			throw new Error('el argumento day es invalido...debe ser 1>=day>=7');
	}
}