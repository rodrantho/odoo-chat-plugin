# Alcance de seguridad de la versión local

> Antecedente histórico de versiones previas. La versión 0.5 usa una instancia privada independiente por instalación: ver [instalación](github-install.md) y [separación de instancias](cloud-connection.md). Este documento no define el servicio actual.
> Referencia histórica de la versión local 0.3 y del arnés opcional de desarrollo. El paquete instalado 0.4 utiliza [la conexión remota por cuenta](cloud-connection.md).

- La configuración pertenece al perfil Windows de quien instala. DPAPI CurrentUser protege el archivo local; otro perfil Windows no puede abrirlo con su propia identidad. Una persona que controle tu sesión Windows o tu equipo puede comprometer tus datos: esto no es una garantía de seguridad absoluta.
- Cambiar de cuenta ChatGPT dentro del mismo perfil Windows no cambia automáticamente la conexión Odoo local. Esta versión separa perfiles Windows; no autentica identidades ChatGPT en el servidor local. Desconectá Odoo al compartir un perfil o utilizá perfiles Windows diferentes.
- La clave API se introduce en un formulario local y se utiliza para autenticar contra tu servidor Odoo. No se devuelve al modelo ni se guarda dentro del repositorio. La interfaz de herramientas nunca recibe la clave como argumento.
- La página solo escucha en 127.0.0.1, con puerto/ruta aleatorios. Se verifica el Host y se exige el mismo Origin en las modificaciones. No se habilita un túnel ni acceso desde la red local.
- El servidor Odoo debe ser HTTPS público. Se rechazan credenciales en URL, rutas, puertos especiales, redirecciones y resoluciones a direcciones privadas/reservadas. Se consulta DNS público a Cloudflare; esa consulta expone el dominio consultado a ese proveedor.
- Cada usuario necesita su propia cuenta y permisos Odoo. El proceso no crea privilegios nuevos ni utiliza credenciales del creador. Las claves de los tests son ficticias y sus llamadas externas están simuladas.
- Las respuestas y cierres requieren aprobación en el flujo del asistente. El indicador user_approved es una declaración del cliente sobre esa aprobación, no una prueba criptográfica de la conversación.
- El modelo de IA y la instancia Odoo no se vuelven locales: los resultados que aparecen en el chat siguen sujetos al tratamiento de ChatGPT/Codex y Odoo. No prometemos que todos los datos queden únicamente dentro de una cuenta ChatGPT.
- GitHub publica código y metadatos del proyecto. No se deben añadir archivos de conexión, claves, bases locales ni datos de clientes. Los reportes públicos deben usar datos ficticios.
