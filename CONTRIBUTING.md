# Proceso de contribucion
<p>La rama master representara entregables presentables(documentos con estructura y contenido, y codigo con pruebas unitarias aprobadas). Para cada <b>H</b>istoria de <b>U</b>suario(vea el <a href="https://trello.com/b/rvlbuwBH/tareas-a-tiempo">Kanban Board</a>) se creara una rama en la que se desarrollaran las funcionalidades y requisitos indicados en la HU; tendra de nombre el identificador de la HU; no se realizara control constante sobre estas ramas; varios desarrolladores pueden desarrollar en la misma rama.</p>
<p>Cuando los desarrolladores hallan hecho las pruebas unitarias, crearan un solicitud de extraccion hacia la master que tendra que ser aprobada por alguien distinto al solicitante; si el revisor no aprueba la solicitud debe dejar un comentario indicando la razon de su decision que pueda ser corregida por el(los) desarrollador(es); El objetivo de la revision sera asegurarse que no se eliminen archivos importantes, se hagan modificaciones inintencionadas, o se violen las practicas establecidas. Las pruebas unitarias son responsabilidad del desarrollador solicitante del cambio.</p>
<p>Se pueden crear ramas para propositos de configuracion general del proyecto que no esten contemplados en ninguna HU. <b>Cuando se instale alguna dependencia(ya sea global) se debe describir en el commit como lo hicimos, para poderse replicar en caso de errores</b></p>
<p>Existen distintas técnicas para la numeración de versiones, proponiendo para nuestra política la más extendida dentro de los sistemas de software libre. Es una notación numérica compuesta por tres números (y un cuarto opcional) separados por puntos con la siguiente notación:</p>

<pre>v(<b>major</b>).(<b>minor</b>).(<b>revision</b>)</pre>

<p>Cada uno de estos números tienen el siguiente significado:</p>

<p>(<b>major</b>): indica la versión principal del software, consistiendo en un conjunto de funcionalidades concretas que son recogidas y cubiertas en dicha versión.</p>
<p>(<b>minor</b>): indican funcionalidad menor cubierta en la versión de software entregada.</p>
<p>(<b>revision</b>): se modifican cuando hay revisiones de código ante fallos de la aplicación.</p>
<p>para mayor informacion visite <a href="http://www.juntadeandalucia.es/servicios/madeja/contenido/libro-pautas/148">esta pagina</a></p>
