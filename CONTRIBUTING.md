# Proceso de contribucion
<p>La rama master representara entregables presentables(documentos con estructura y contenido, y codigo con pruebas unitarias aprobadas). Para cada <b>H</b>istoria de <b>U</b>suario(vea el <a href="https://trello.com/b/rvlbuwBH/tareas-a-tiempo">Kanban Board</a>) se creara una rama en la que se desarrollaran las funcionalidades y requisitos indicados en la HU; tendra de nombre el identificador de la HU; no se realizara control constante sobre estas ramas; varios desarrolladores pueden desarrollar en la misma rama.</p>
<p>Cuando los desarrolladores hallan hecho las pruebas unitarias, crearan un solicitud de extraccion hacia la master que tendra que ser aprobada por alguien distinto al solicitante; si el revisor no aprueba la solicitud debe dejar un comentario indicando la razon de su decision que pueda ser corregida por el(los) desarrollador(es); El objetivo de la revision sera asegurarse que no se eliminen archivos importantes, se hagan modificaciones inintencionadas, o se violen las practicas establecidas. Las pruebas unitarias son responsabilidad del desarrollador solicitante del cambio.</p>
<p>Se pueden crear ramas para propositos de configuracion general del proyecto que no esten contemplados en ninguna HU. <b>Cuando se instale alguna dependencia(ya sea global) se debe describir en el commit como lo hicimos, para poderse replicar en caso de errores</b></p>

# Buenas Practicas de programacion a implementar
<ol>
<li> Usa ESLint </li>
<li> Agregar archivo .eslintrc para que ESLint reconozca las reglas </li>
<li> Colocar comentarios </li>
<li> Utilice === en vez de == </li>
<li> No omitir los punto y coma(;) de las sentencias </li>
<li> Declara las variables fuera de la sentencia FOR </li>
<li> Reducir variables globales </li>
<li> Usar {} en vez de New Object() </li>
<li> Utiliza comillas simples como delimitadores externos </li>
<li> Usar [] en vez de New Array() </li>
<li> Diseñar componentes reusables y reusarlos </li>
<li> Adoptar la terminología de los clientes </li>
<li> No manipule el estado de los componente directamente, use los metodos que provee React </li>
<li> Usar la forma del metodo setState(function) para manejar la asincronia de los states y props </li>
<li> Usar const y let en lugar de var </li>
<li> Declarar las variables en la parte superior de su ámbito </li>
</ol>
