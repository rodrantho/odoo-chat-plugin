# Una instancia privada por usuario

Cada persona genera su propio sitio en su cuenta de Sites, su almacenamiento, secreto de cifrado y complemento. Por defecto el acceso es solo del propietario. La plantilla pública no tiene endpoint MCP fijo ni proyecto, App, conexión, clave o colaborador preconfigurados.

El autor no administra un servicio central ni recibe acceso a las instancias creadas. La conexión utiliza el Site de su propietario y su servidor Odoo. La clave se guarda cifrada con AES-256-GCM en el almacenamiento de esa instancia, bajo un secreto generado exclusivamente para ella y ligada a la identidad autenticada. Nunca se copia el secreto de otra instalación.

Sites/OpenAI y su infraestructura siguen alojando el sitio; Odoo procesa sus operaciones y el servicio de chat procesa los resultados devueltos. El código consulta DNS público de Cloudflare para validar el dominio. No se promete aislamiento frente a los proveedores de la plataforma o administradores que el propietario decida autorizar. Mantener el sitio privado y no compartirlo es parte de esta instalación.

No hay telemetría, registro de instalaciones ni envío de credenciales hacia el autor. GitHub entrega código e instrucciones, no recibe las claves Odoo. Cada propietario aplica por su cuenta las actualizaciones que quiera a su instancia; el autor no tiene acceso para hacerlo en sitios ajenos.

Desconectar elimina la conexión activa de esa instancia. No revoca la clave en Odoo ni borra mensajes, chats o copias de seguridad de proveedores. La revocación se hace en Odoo. La compatibilidad desde otro dispositivo requiere la misma cuenta y un cliente compatible; no se presupone por descargar el repositorio.
