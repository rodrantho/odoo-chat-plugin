# Privacidad — borrador para revisión del creador

Proyecto: Odoo. Creador: Anthony Rodríguez. Contacto previsto: anthony@nst-group.com.

El conector usa la identidad de la sesión autenticada de ChatGPT para separar las conexiones personales. Al configurar una cuenta recibe URL del servidor, base de datos, usuario de Odoo y clave API. La conexión se comprueba contra el servidor HTTPS elegido y se guarda cifrada con AES-256-GCM para solicitudes posteriores de esa misma persona.

Al consultar o modificar registros, el servidor del conector envía la solicitud a la instancia de Odoo configurada y devuelve el resultado al chat. Las respuestas pueden contener datos personales o comerciales de esa instancia. El código de la aplicación no crea una copia persistente de esos resultados ni registra intencionadamente claves o contenido de registros en sus logs.

El almacenamiento activo conserva la conexión hasta que la persona la reemplaza o utiliza Desconectar. Esta acción elimina la fila activa del conector; no revoca por sí misma la clave en Odoo. La revocación debe hacerse en Odoo.

El servicio utiliza infraestructura de Sites/OpenAI y Cloudflare. La resolución DNS de los dominios configurados se consulta a Cloudflare. Las políticas y retención operativa/respaldos de esos proveedores deben confirmarse antes de finalizar esta política. No se afirma un plazo de eliminación de respaldos que no se haya verificado.

Pendiente de definir: datos legales del responsable, derechos y canal de solicitudes aplicables, jurisdicción, cobertura de menores, retención de logs/respaldos, cambios en esta política y condiciones adicionales. Este documento no es una política publicada ni una declaración lista para la revisión del catálogo.
