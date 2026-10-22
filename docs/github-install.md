# Instalar mi propia instancia de Odoo

1. Instalá Odoo desde https://github.com/rodrantho/odoo-chat-plugin en un cliente compatible con este catálogo GitHub.
2. En un chat nuevo pedí: **Creá mi instancia privada de Odoo usando esta plantilla**.
3. El asistente necesita Sites y Plugin Creator oficiales para la primera configuración. Crea un Site privado y plugin propios en tu cuenta, con almacenamiento y secreto nuevos. Si ya existe una instancia tuya verificada, la reutiliza.
4. Abrí el formulario privado que devuelve y completá URL HTTPS pública de Odoo 17, base, usuario y clave API. Nunca pegues la clave en el chat.
5. Comprobá y guardá. El asistente verifica el estado por tu complemento personal. Después podés usar esa instancia con tu cuenta desde clientes compatibles.

Comandos equivalentes para instalar la plantilla en Codex:

```
codex plugin marketplace add rodrantho/odoo-chat-plugin --ref main
codex plugin add odoo@odoo-by-anthony
```

Para actualizar la plantilla:

```
codex plugin marketplace upgrade odoo-by-anthony
codex plugin add odoo@odoo-by-anthony
```

La plantilla se descarga desde GitHub; la instancia se crea con el pedido inicial de configuración. Instalarla no conecta a un servidor del autor ni crea un Site sin invocación. Cada cuenta obtiene su propio Site privado; no comparte base ni cifrado con instalaciones ajenas. No se publica automáticamente en el directorio oficial de OpenAI.

Una actualización de la plantilla no modifica sitios privados de otras personas: el asistente de cada propietario debe aplicar allí una actualización que ese usuario solicite. No se envían al autor los IDs, URLs o claves de las nuevas instalaciones.

Si usaste la versión 0.4 que apuntaba a un servicio común, actualizá primero la plantilla y creá o reutilizá una instancia de tu propiedad. No copies una conexión ajena ni reutilices un sitio del autor. La instancia de Anthony quedó privada para su uso personal.

Desconectar en tu formulario elimina la conexión activa. Revocar la clave se hace en tu Odoo. Desinstalar la plantilla no borra tu sitio ni revoca la clave.
