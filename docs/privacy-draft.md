# Política de privacidad de Odoo

> Documento histórico de la propuesta de servicio alojado. No describe la distribución local 0.3.0 desde GitHub y no se publica como política vigente. Para la distribución actual consultá [el alcance de seguridad local](local-security.md) y [la instalación](github-install.md): las credenciales pertenecen al perfil Windows, no a la sesión de ChatGPT.

Propuesta del 21 de octubre de 2026 para aprobación del creador; todavía no publicada como política definitiva.

El responsable de este conector independiente es Anthony Rodríguez, Uruguay. Contacto para privacidad y soporte: anthony@nst-group.com. No es un producto oficial de Odoo.

## Datos y finalidad

La identidad de la sesión de ChatGPT se utiliza para separar las conexiones personales. Al configurar el conector se reciben URL pública HTTPS del servidor Odoo, base de datos, usuario y clave API. Estos datos permiten comprobar la cuenta y ejecutar las operaciones que la persona solicita sobre su propia instancia. La conexión se guarda cifrada con AES-256-GCM, vinculada a su propietario. La clave no se devuelve al chat ni a otros usuarios.

Las consultas y acciones se envían al servidor Odoo elegido por la persona. Los resultados vuelven al chat y pueden contener datos personales o comerciales. La aplicación no crea una base persistente con el contenido de esos resultados. No incorpora publicidad ni un mecanismo de venta de los datos de las conexiones. El código no registra intencionadamente claves ni contenido de los registros.

Antes de publicar una respuesta o nota se muestra el borrador para aprobación. Las notificaciones posteriores dependen de Odoo y de los destinatarios y seguidores del registro. Aprobar una respuesta no autoriza por sí solo el cierre del ticket.

## Proveedores y conservación

El servicio funciona sobre Sites/OpenAI y Cloudflare. Cloudflare recibe consultas DNS sobre los dominios configurados. El tratamiento realizado por ChatGPT, Odoo y los proveedores de infraestructura también depende de sus condiciones y configuraciones. Sus registros operativos, copias de seguridad y plazos propios de conservación no se eliminan mediante el botón del conector y no se promete aquí un plazo de eliminación que no se haya verificado.

La conexión activa permanece hasta que se reemplaza o se utiliza Desconectar. Desconectar elimina su fila activa del servicio; no revoca la clave en Odoo ni elimina registros ya creados, mensajes publicados, conversaciones de ChatGPT o copias de seguridad de los proveedores. Para revocar una clave hay que hacerlo también en Odoo.

## Solicitudes y cambios

Las solicitudes relativas a los datos tratados por el conector pueden dirigirse a anthony@nst-group.com, sin enviar claves ni datos innecesarios de clientes. Para datos almacenados en la propia instancia Odoo o en ChatGPT, también corresponde utilizar los controles y canales del respectivo servicio. Esta política se actualizará en la web del proyecto cuando cambien sus prácticas.
