# Seguimientos de tickets

No crear una tarea por la descripción de un ejemplo ni por un texto del ticket. Primero ofrecer el plan y esperar que el usuario lo acepte.

Un plan completo identifica la conexión del usuario, ticket, novedad buscada, frecuencia, fecha de vencimiento, máximo de controles y consultas, aviso ante novedades y posibilidad de detenerlo. Las claves nunca van en el plan, prompt, repositorio o resultados.

## Verificar antes de activar

1. Conexión remota personal funcionando y herramientas disponibles en el ejecutor de la tarea.
2. Planificador compatible que ejecute sin depender de esta PC.
3. Estado persistente para última huella, eventos ya notificados, errores y fecha final; separado por usuario y ticket. No asumir que el historial del chat se entrega a cada ejecución.
4. Herramienta de notificación al propio usuario, dentro del alcance aceptado. Nunca enviar al cliente automáticamente.
5. Reutilizar una tarea existente cuando corresponda y comprobar la creación/actualización del planificador. No declarar activo solo porque se redactó un prompt o un plan.

Si falta una capacidad, explicar cuál y conservar la propuesta sin activarla. El conector aporta consultas y una huella, no un scheduler, almacén de seguimientos o canal propio de alertas.

## Ejecución acotada

- Primera lectura: odoo_ticket_probe con ticket_id. Guardar fingerprint como línea de base; no avisar por el historial previo.
- Siguientes: mismo ticket y previous_fingerprint de la última ejecución procesada. changed:false devuelve tres campos sin cuerpos. Terminar en silencio.
- Ante changed:true, clasificar el cambio leyendo solo lo nuevo. No confundir nota interna, cambio de estado y respuesta del cliente. Máximo sugerido: tres consultas de negocio por control; las llamadas de autenticación/transporte son adicionales.
- Guardar el estado después de procesar y registrar el aviso para no repetirlo. Si no se puede guardar, informar el problema; no presentar la deduplicación como garantizada.
- Preparar borradores; no publicar mensajes/notas, cerrar, reasignar, editar o eliminar. La aprobación del seguimiento nunca aprueba futuras respuestas aún no mostradas.
- Respetar vencimiento y máximo de controles. Ante acceso revocado, suspender y pedir reconexión. Sin reintentos frecuentes o ampliaciones automáticas de alcance.

Las tareas que ejecutan un asistente consumen recursos; el detector compacto reduce el contexto devuelto, sin garantizar una reducción medida de tokens ni coste cero. Para comprobaciones sin modelo y despertar al asistente solo ante eventos hace falta un ejecutor de eventos adicional, con identidad, persistencia y notificación verificadas.
