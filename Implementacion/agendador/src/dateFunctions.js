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
  dia.setHours(0, 0, 0, 0);
  return dia;
}