# Conexión por cuenta y uso entre dispositivos

La versión 0.4 utiliza el servidor remoto de Odoo. Sites autentica al usuario y entrega una identidad verificada al servicio. Las consultas y la configuración utilizan esa identidad; el cliente no puede elegir otro propietario por parámetros.

Ingresás URL HTTPS de Odoo 17, base, usuario y clave API en el formulario HTTPS del conector. La configuración se guarda cifrada con AES-256-GCM y datos autenticados vinculados al propietario. Se rechazan solicitudes sin identidad, cambios de propietario y modificaciones del formulario desde otro origen. Cada llamada conserva los permisos de la cuenta Odoo. No se elevan privilegios.

La conexión puede usarse desde clientes compatibles con el servidor remoto y esa cuenta autenticada, sin depender de una PC encendida ni de Windows. Debe verificarse la compatibilidad y conexión en cada superficie; no se promete instalación automática en todos los dispositivos. Descargar el repositorio desde GitHub no instala ni sincroniza una conexión en la cuenta por sí solo.

**No es un almacén de claves dentro de ChatGPT.** Las credenciales están cifradas en la infraestructura del servicio del complemento. El operador administra la infraestructura y el secreto de cifrado, por lo que no es cifrado de extremo a extremo frente al operador. OpenAI/Sites, su infraestructura y Odoo intervienen en el tratamiento. Cloudflare recibe consultas DNS sobre el dominio Odoo para validar destinos públicos. Los datos devueltos al chat se procesan por el servicio de chat.

No introducir claves en prompts, código, repositorios ni tareas programadas. El conector no devuelve la clave en herramientas ni permite consultarla. Los informes públicos deben usar datos ficticios.

Desconectar elimina la conexión activa del servicio; no revoca la clave Odoo, no borra chats ni deshace operaciones o copias de seguridad de proveedores. Para revocar la clave, usar Odoo. No prometemos un plazo de borrado de respaldos no verificado.

La versión local 0.3 anterior guardaba por perfil Windows, no por cuenta ChatGPT. Su archivo local no se migra ni se sube automáticamente: hay que configurar explícitamente la conexión alojada. El arnés local permanece solo para desarrollo y pruebas.

El directorio oficial de OpenAI y la distribución GitHub son rutas diferentes. Esta actualización no es una aprobación ni publicación en ese directorio. La compatibilidad web/móvil de una instalación concreta debe comprobarse en el cliente.
