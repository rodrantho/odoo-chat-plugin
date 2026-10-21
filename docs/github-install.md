# Instalar Odoo desde GitHub

Conector independiente de Anthony Rodríguez. Gratuito, código MIT. Esta versión funciona en **Windows**, con **Node.js 24 o posterior**, desde clientes de escritorio compatibles con complementos locales. No se instala como aplicación web/móvil ni aparece por ello en el catálogo oficial de OpenAI.

## Instalar

1. Tené instalado Node.js 24 o posterior desde [nodejs.org](https://nodejs.org/).
2. Agregá `https://github.com/rodrantho/odoo-chat-plugin` como marketplace de GitHub en tu cliente de escritorio. Si usás Codex CLI, el comando equivalente es:

```
codex plugin marketplace add rodrantho/odoo-chat-plugin --ref main
```

3. En el catálogo **Odoo · Anthony Rodríguez**, instalá **Odoo**. Desde la terminal también se puede usar:

```
codex plugin add odoo@odoo-by-anthony
```

4. Abrí un chat nuevo y pedí: **Revisá mi conexión local de Odoo**.
5. Abrí el enlace `127.0.0.1` devuelto por el estado. Es una página de tu propia PC, con puerto y ruta aleatorios por proceso. Ingresá allí URL HTTPS de Odoo 17, base de datos, usuario y clave API. Nunca pegues la clave en el chat.
6. Pulsá **Comprobar y guardar**. El conector comprueba la versión y la cuenta antes de guardar. Volvé al chat y pedí revisar la conexión.

## Dónde quedan los datos

GitHub entrega los archivos y las instrucciones del complemento. El cliente inicia un proceso local que conecta directamente con el Odoo elegido. La configuración queda en el perfil de Windows, protegida con **DPAPI para ese usuario**, fuera del repositorio. No se usa el servicio alojado anterior ni una base compartida de credenciales.

La cuenta de ChatGPT no guarda automáticamente esa clave ni sincroniza este archivo entre equipos. Al cambiar de PC o de usuario Windows hay que configurar nuevamente la conexión. Cada persona debe usar su propia cuenta Odoo. Los datos que se consultan y aparecen en el chat sí se procesan normalmente por ChatGPT/Codex y Odoo, según esos servicios.

Si varias personas usan el mismo perfil Windows, comparten el acceso a la conexión local de ese perfil, incluso si cambian de cuenta ChatGPT. Para separarlas, usen perfiles Windows distintos o desconecten la cuenta Odoo al terminar. La separación de esta versión es por perfil Windows, no por cuenta ChatGPT.

Solo se admiten servidores Odoo 17 con HTTPS público y acceso a API externa. Se rechazan destinos de redes privadas, credenciales dentro de la URL y redirecciones. El navegador local escucha únicamente en `127.0.0.1`.

## Respuestas y cambios

Hay 14 herramientas para consultas, historial, respuestas/notas y cambios de negocio. Antes de publicar una respuesta o nota, el asistente muestra texto, destinatarios, visibilidad y adjuntos y espera aprobación explícita. Si considera resuelto un ticket, propone su cierre para aprobación separada. Aprobar una respuesta no autoriza cerrar el ticket. Publicar un mensaje no confirma recepción del correo.

## Actualizar o quitar

```
codex plugin marketplace upgrade odoo-by-anthony
```

Actualizá Odoo desde el cliente y abrí un chat nuevo. Para quitar la conexión guardada, usá **Desconectar mi cuenta** en su formulario local. Esto no revoca la clave en Odoo ni borra mensajes o cambios anteriores. La desinstalación tampoco sustituye la revocación de la clave cuando corresponda.

## Estado comprobado

Pruebas con datos ficticios: configuración de cuatro campos, DPAPI, persistencia/reinicio, loopback y rechazo CSRF, descubrimiento de 14 herramientas y publicación simulada solo con aprobación. No se afirma validación contra todos los módulos o personalizaciones de Odoo ni entrega real de correo.

Soporte: anthony@nst-group.com. No envíes claves ni datos de clientes en reportes públicos.
