# Seguimiento con aprobación y límites

El asistente puede investigar una solicitud con las lecturas necesarias y preparar un borrador sin pedir permiso por cada consulta. Por ejemplo, obtener una lista de miembros de un grupo requiere una conexión Workspace autorizada; Odoo solo no provee esa capacidad. Una vez reunidos los datos, muestra el texto final y pide aprobación para enviarlo.

Ante una espera concreta puede proponer: revisar el ticket cada dos horas durante 72 horas, hasta 36 controles, con un máximo de tres consultas de negocio por control y avisos solo ante novedades. Es un ejemplo de propuesta, no una tarea activada por instalar el complemento.

El usuario debe aceptar ticket, condición, frecuencia, fecha final y alcance antes de crear la tarea. Se necesita un planificador compatible que conserve la última huella y eventos notificados, use la conexión personal y pueda avisar al usuario sin depender de esta PC. Si falta alguna de estas capacidades, el asistente debe explicarlo y no afirmar que hay seguimiento activo.

El control odoo_ticket_probe lee estado/fecha del ticket y metadatos del último mensaje. Devuelve una huella; con la misma huella responde changed:false sin cuerpos ni historial. Si cambia, el asistente lee solo lo nuevo necesario y verifica autor/visibilidad: una nota interna no prueba que respondió el cliente. El cambio de huella no autoriza ninguna acción externa.

Se permiten lectura, comparación y preparación de borradores. No se publican respuestas/notas, cierran tickets, reasignan o modifican registros automáticamente. Cada respuesta requiere aprobación del borrador exacto; cerrar requiere aprobación diferenciada.

Sin novedades se termina en silencio. Las tareas respetan vencimiento, máximo de controles, pausa y cancelación; ante pérdida de acceso deben suspenderse sin reintentos frecuentes. El complemento no incluye scheduler ni canal propio de notificaciones, y la instalación no crea tareas.

El detector compacto reduce los datos devueltos cuando nada cambió. No se ha medido un ahorro específico de tokens; una tarea del asistente puede consumir tokens incluso sin novedades. Para comprobar eventos sin modelo y despertar al asistente solo cuando cambie algo hace falta infraestructura adicional verificada. No se promete coste cero.
