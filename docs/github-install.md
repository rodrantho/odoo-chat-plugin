# Instalar y conectar Odoo

Versión 0.4: conector remoto de Odoo 17, independiente y MIT. No requiere Node.js ni guardar claves en esta PC. La compatibilidad depende del cliente y su soporte de complementos remotos; GitHub no publica el complemento en el directorio oficial.

1. En un cliente compatible, agregá https://github.com/rodrantho/odoo-chat-plugin como marketplace de GitHub e instalá Odoo desde Odoo · Anthony Rodríguez. Equivalentes de Codex CLI:

```
codex plugin marketplace add rodrantho/odoo-chat-plugin --ref main
codex plugin add odoo@odoo-by-anthony
```

2. Conectá/autenticá el servidor remoto cuando el cliente lo solicite. El complemento Odoo vinculado a la cuenta utiliza el mismo servicio.
3. Abrí un chat nuevo y pedí comprobar la conexión Odoo.
4. Abrí el enlace HTTPS de configuración devuelto. Ingresá tu propia URL HTTPS pública de Odoo 17, base, usuario y clave API. Nunca pegues la clave en el chat.
5. Comprobá y guardá. Volvé al chat y consultá el estado. En otro dispositivo, usá la misma cuenta y una superficie compatible; comprobá allí su conexión antes de asumir que funciona.

Si venís de la versión local, no se sube ni migra automáticamente su archivo de credenciales. Configurá la nueva conexión explícitamente. Cambiar a otra persona requiere su propia identidad de ChatGPT y su cuenta Odoo.

[Ubicación de claves y aislamiento](cloud-connection.md). [Seguimientos con consentimiento](follow-up.md).

Para actualizar el catálogo:

```
codex plugin marketplace upgrade odoo-by-anthony
```

Actualizá el complemento desde el cliente y abrí un chat nuevo. Para eliminar su conexión activa, usá Desconectar mi cuenta en la configuración HTTPS; para revocar la clave, hacelo también en Odoo. Desinstalar no equivale a revocar ni borrar operaciones anteriores.

Soporte: anthony@nst-group.com. Reportes sin claves ni datos de clientes.
