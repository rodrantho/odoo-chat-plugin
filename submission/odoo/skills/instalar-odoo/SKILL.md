---
name: instalar-odoo
description: Crear y conectar la instancia privada de Odoo del usuario después de instalar esta plantilla o pedir configurar Odoo por primera vez. Cada usuario obtiene su propio Site y plugin; no hay servidor compartido del autor.
---

# Instalar mi Odoo

El pedido de crear/configurar la instancia autoriza esta configuración. Instalar el paquete solo descarga la plantilla: nunca afirmar que ya existe un Site o una conexión por esa descarga.

## Resultado

Crear una instancia privada en la cuenta de quien hace el pedido, con Site, DB, secreto de cifrado y plugin canónico propios. El autor de esta plantilla no recibe acceso ni credenciales. No conectar a una URL del autor, copiar un project_id ajeno, añadir colaboradores o compartir el Site. La infraestructura de Sites sigue perteneciendo al proveedor de la plataforma; el usuario no tiene que administrar servidores.

## Configurar una sola vez

1. Usar Sites y Plugin Creator oficiales. Si no están disponibles, pedir habilitarlos indicando ese requisito concreto; conservar el trabajo preparado y no simular una instalación. Leer su flujo soportado de publicación.
2. Buscar primero una instalación propia ya registrada para este usuario/chat. Reutilizar solo cuando get_site confirme que es propietario, que el acceso es exclusivamente suyo y que el plugin pertenece a ese Site. Un nombre Odoo o una URL conocida no prueba propiedad. Si tiene una instancia propia conectada, verificar su estado y terminar sin crear otra.
3. Para una instalación nueva, copiar assets/site-template a una carpeta nueva dedicada, fuera del checkout de la plantilla. La plantilla no tiene project_id, App ID, URL de instancia, claves, conexiones, registros ni colaboradores. No copiar archivos de otra instalación. Mantener un registro no secreto de la instalación en esa carpeta para poder continuar sin duplicarla.
4. Crear un Site Odoo en la cuenta actual, privado por defecto, mediante create_site una sola vez. Persistir inmediatamente el project_id devuelto, sin inventarlo. Reutilizarlo en todos los pasos y recuperar la misma operación si se interrumpe. No cambiarlo a público. Confirmar con get_site propiedad y acceso solo del propietario antes de configurar credenciales.
5. Mantener el binding DB, esquema y migraciones incluidos. Generar un secreto nuevo de 32 bytes con un generador criptográfico para esta instalación y guardarlo únicamente como CREDENTIAL_ENCRYPTION_KEY mediante el mecanismo seguro de secretos de Sites. No pedirlo por chat, mostrarlo, guardarlo en archivos, copiar el de otra instancia ni enviarlo en argumentos de shell. Mantenerlo en memoria y pasarlo solo a la herramienta de secretos. Si la herramienta no permite ese flujo, usar la entrada secreta de la plataforma y explicar ese único paso pendiente. Verificar presencia sin leer valores. Nunca rotar el secreto de una instancia que ya tiene conexiones.
6. Publicar con el flujo oficial Sites y su helper de fuente. Compilar con node scripts/build.mjs. El código obtiene el enlace de configuración de la propia solicitud: no sustituirlo por un dominio del autor. Usar publicación privada y verificar succeeded. Sites crea el App y plugin canónicos; no crear un plugin que envuelva ese Site de nuevo.
7. Obtener el plugin_id real con get_site(include_mcp_connection:true). Instalar/conectar ese plugin canónico mediante los controles disponibles. Con Plugin Creator, adjuntar las instrucciones de ../operar-odoo/SKILL.md y sus referencias al paquete canónico, preservando App/MCP, identidad, alcance y presentación. Si se copian a un plugin de instancia, cambiar únicamente la referencia al instalador ausente por una indicación de revisar la configuración de esa instancia; el plugin ya instalado no necesita recrear su Site. Leer manifiesto y release actual antes de actualizar; comprobar por relectura. No modificar la plantilla GitHub del autor con IDs o URLs de esta instalación.
8. Guardar project_id, URL y plugin_id verificados en el registro no secreto de la carpeta propia. Presentar al usuario su formulario HTTPS privado para URL Odoo, base de datos, usuario y clave API. Nunca pedir la clave en el chat. Comprobar guardado y odoo_status con esa conexión cuando el usuario complete el formulario. No hacer pruebas de escritura en su Odoo.

## Entrega

Dar el enlace real de la instancia y del plugin propios. Diferenciar creación/publicación, instalación del plugin y conexión Odoo comprobada. Si falta que el usuario complete el formulario, decirlo sin afirmar conectado. El uso desde otro dispositivo requiere esa misma cuenta y un cliente compatible; no depende de una PC encendida. No prometer compatibilidad no verificada.

La instancia se conecta a su Odoo y usa la infraestructura de Sites/OpenAI. El código solo consulta DNS público para validar el destino y no contiene servidor central del autor, telemetría ni registro de instalaciones hacia el autor. No prometer aislamiento frente al proveedor de la plataforma ni ocultar sus condiciones.

Conservar las quince herramientas, las lecturas autónomas, la aprobación del borrador antes de enviar, aprobación separada del cierre y seguimiento solo aceptado y acotado. No crear tareas ni enviar respuestas durante la instalación.
