
export class Tarea{
	name: string;
	fechaLimite: Date;
	/**
	constructor principal para Tarea
	parametros:
		nombre: identificador personal de la Tarea
		fechaLimite(Date o number): fecha en la que debe estar terminada la tarea, puede ser dada en milisegundos
	*/
	constructor(nombre: string, fechaLimite){
		this.name = nombre;
		if (fechaLimite instanceof Date)
			this.fechaLimite = fechaLimite;
		else 
			this.fechaLimite = new Date(fechaLimite);
	}

	getNombre(){
		return this.name;
	}
	/**
	cambia el nombre por uno nuevo si este ultimo cumple las condiciones
	parametros:
		nuevoNombre: el nuevo nombre
	retorna: true si se cambio el nombre, false si no se cumplieron las condiciones
	*/
	setNombre(nuevoNombre):boolean{
		if(nuevoNombre && nuevoNombre.trim().length > 0){
			this.name = nuevoNombre;
			return true;
		}
		return false;
	}
	/**
	en caso de que se quiera deshacer de las propiedades tipo Object, por ejemplo: cuando se guarda en BBDD simples
	retorna(Object): un objeto con la misma estructura de Tarea pero que cambia las propiedades objeto por valores primitivos con los cuales se puede reconstruir el objeto
	*/
	toSimpleObject():Object{
		return {
			name: this.name,
			fechaLimite: this.fechaLimite.getTime()
		};
	}
}

export class Rutina{
	name: string;
	horaI: Date;
	horaF: Date;
	periodicidad: number;
	contenedor: Date;
	/**
	constructor principal para Rutina
	parametros:
		nombre: identificador personal de la rutina
		horaInicio(Date o number): tiempo del dia en el que inicia la rutina, se puede indicar en milisegundos
		horaFin(Date o number): tiempo del dia en el que finaliza la rutina, se puede indicar en milisegundos
		periodicidad: 1 para indicar que es diaramente, 7 para indicar que es semanalmente, 30 para indicar que es mensualmente, y 360 para inidicar que es anualmente.
		contenedor(Date o number): dependiendo del indicador es que se considera solo una parte de la fecha en el contenedor para determinar cuando se ha cumplido el periodo, se puede indicar en milisegundos
	*/
	constructor(nombre: string,horaInicio, horaFin, periodicidad: number, contenedor){
		this.name = nombre;
		this.periodicidad = periodicidad;

		if (horaInicio instanceof Date) {
			this.horaI = horaInicio;
		} else {
			this.horaI = new Date(horaInicio);
		}
		if (horaFin instanceof Date) {
			this.horaF = horaFin;
		} else {
			this.horaF = new Date(horaFin);
		}
		if (contenedor instanceof Date) {
			this.contenedor = contenedor;
		} else {
			this.contenedor = new Date(contenedor);		
		}
	}

	getNombre():string{
		return this.name;
	}
	/**
	cambia el nombre por uno nuevo si este ultimo cumple las condiciones
	parametros:
		nuevoNombre: el nuevo nombre
	retorna: true si se cambio el nombre, false si no se cumplieron las condiciones
	*/
	setNombre(nuevoNombre):boolean{
		if(nuevoNombre && nuevoNombre.trim().length > 0){
			this.name = nuevoNombre;
			return true;
		}
		return false;
	}
	/**
	en caso de que se quiera deshacer de las propiedades tipo Object, por ejemplo: cuando se guarda en BBDD simples
	retorna(Object): un objeto con la misma estructura de Rutina pero que cambia las propiedades objeto por valores primitivos con los cuales se puede reconstruir el objeto
	*/
	toSimpleObject(){
		return {
			name: this.name,
			horaI: this.horaI.getTime(),
			horaF: this.horaF.getTime(),
			periodicidad:this.periodicidad,
			contenedor: this.contenedor.getTime()
		};
	}
}