# Proceso de contribucion
La rama master representara entregables presentables(documentos con estructura y contenido, y codigo con pruebas unitarias aprobadas). Para cada historia de usuario(vea el <a href="https://trello.com/b/rvlbuwBH/tareas-a-tiempo">Kanban Board</a>) se creara una rama en la que se desarrollaran las funcionalidades y requisitos indicados en la HU, tendra de nombre el identificador de la HU, no se realizara control constante sobre estas ramas, varios desarrolladores pueden desarrollar en la misma rama; cuando los desarrolladores hallan hecho las pruebas unitarias, crearan un solicitud de extraccion hacia la master que tendra que ser aprobado por alguien distinto al solicitante; si el revisor no aprueba la solicitud debe dejar un comentario indicando la razon de su decision que pueda ser corregida por el(los) desarrollador(es); El objetivo de la revision sera asegurarse que no se eliminen archivos importantes, se hagan modificaciones inintencionadas, o se violen las practicas establecidas. Las pruebas unitarias son responsabilidad del desarrollador solicitante del cambio. Para cada cambio que no este contemplado en las HU se podra hacer a travez de una rama que solo tenga un proposito definido simple indicado en el nombre de la rama y explicando el cambio en la descripcion de los commits.

# Buenas Practicas de programacion a implementar
<ol>
<li> <b>Usa JSLint o ESLint</b> </li>
<li> <b>Agregar archivo .eslintrc para que ESLint reconozca las reglas</b> </li>
<li> <b>Colocar comentarios</b> </li>
<li> <b>Utilice === en vez de ==</b> </li>
<li> <b>no omitir los punto y coma(;) de las sentencias</b> </li>
<li> <b>Declara las variables fuera de la sentencia FOR</b> </li>
<li> <b>Reducir variables globales</b> </li>
<li> <b>Usar {} en vez de New Object()</b> </li>
<li> <b>utiliza comillas simples como delimitadores externos</b> </li>
<li> <b>Usar [] en vez de New Array()</b> </li>
<li> <b>Diseñar componentes reusables y reusarlos</b> </li>
<li> <b>Adoptar la terminología de los clientes</b> </li>
<li> <b>No manipule el estado de los componente directamente, use los metodos que provee React</b> </li>
<li> <b>Usar la forma del metodo setState(function) para manejar la asincronia de los states y props</b> </li>
<li> <b>Usar const y let en lugar de var</b> </li>
<li> <b>Declarar las variables en la parte superior de su ámbito </b> </li>
</ol>
