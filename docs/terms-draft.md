# Condiciones de uso de Odoo

> Antecedente histórico de versiones previas. La versión 0.5 usa una instancia privada independiente por instalación: ver [instalación](github-install.md) y [separación de instancias](cloud-connection.md). Este documento no define el servicio actual.
> Para la versión 0.4, consultar [la conexión remota](cloud-connection.md) y [el seguimiento](follow-up.md). Borrador histórico de la propuesta inicial de servicio alojado; no son condiciones publicadas para la distribución local 0.3.0 desde GitHub. El software actual se ofrece bajo [MIT](../LICENSE), con [instrucciones de instalación](github-install.md) y [alcance de seguridad local](local-security.md).

Propuesta del 21 de octubre de 2026 para aprobación del creador; todavía no publicada como condiciones definitivas.

Odoo es un conector independiente y gratuito creado por Anthony Rodríguez, Uruguay. Soporte y consultas: anthony@nst-group.com. No existe afiliación ni respaldo oficial de Odoo. Su código fuente se ofrece bajo la licencia MIT incluida en el repositorio.

## Uso de la conexión

La persona debe estar autorizada a utilizar la cuenta y los datos de la instancia que conecta. Debe configurar su propia URL pública HTTPS, base de datos, usuario y clave API; conservar la clave de forma segura y revocarla en Odoo cuando corresponda. No debe enviar claves por el chat ni utilizar el conector para acceder a cuentas ajenas, ampliar privilegios o ejecutar código en el servidor.

Esta versión admite Odoo 17 con API externa disponible. La disponibilidad de módulos, campos y acciones depende de la instancia y sus permisos. No se garantiza compatibilidad con otras versiones o módulos personalizados.

## Operaciones y aprobación

Crear, modificar, eliminar y ejecutar acciones de negocio requiere un pedido explícito sobre los registros correspondientes. Estas operaciones pueden activar automatizaciones y otras consecuencias de Odoo. Antes de publicar mensajes o notas, el asistente debe mostrar el contenido, visibilidad, destinatarios y adjuntos para aprobación. Si considera que un ticket está resuelto, debe proponer su cierre y esperar aprobación explícita de ese cambio. Aprobar un texto no equivale a aprobar el cierre.

Un mensaje registrado en Odoo no confirma que el correo haya llegado al destinatario. Una acción que devuelve un asistente puede requerir pasos adicionales. La persona debe revisar los resultados antes de confiar en que un proceso quedó completado.

## Disponibilidad y desconexión

Esta versión en desarrollo no ofrece un plazo de atención ni una garantía de disponibilidad. La licencia MIT contiene las condiciones y exclusiones aplicables al código; estas condiciones no amplían ni reducen derechos que correspondan por normas obligatorias. Las condiciones de OpenAI, Cloudflare y de la instancia Odoo se aplican a sus respectivos servicios.

La persona puede desconectar su cuenta desde la configuración. Esto elimina la conexión activa del conector, sin deshacer operaciones anteriores ni revocar la clave en Odoo. Los cambios a estas condiciones se mostrarán en la web del proyecto.
