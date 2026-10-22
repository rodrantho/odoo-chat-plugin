# Odoo

Plantilla gratuita y MIT de Anthony Rodríguez para crear **tu propia instancia privada** del conector Odoo 17.

## Usarlo

1. Instalá Odoo desde este repositorio en un cliente compatible.
2. Pedí: **Creá mi instancia privada de Odoo usando esta plantilla**.
3. El asistente crea el sitio y complemento en **tu cuenta**, sin usar un servidor del autor. Completás URL, base, usuario y clave API en tu formulario privado.

Para Codex:

```
codex plugin marketplace add rodrantho/odoo-chat-plugin --ref main
codex plugin add odoo@odoo-by-anthony
```

La primera configuración necesita las capacidades oficiales Sites y Plugin Creator. Descargar el paquete instala la plantilla y sus instrucciones; la instancia se crea cuando pedís configurarla. No necesitás administrar un servidor ni tener una PC encendida para usar después el sitio privado desde clientes compatibles.

## Cada instalación es independiente

Cada persona tiene su propio Site privado, base, secreto de cifrado y plugin canónico. La plantilla no contiene URL de servidor MCP, identidad de un sitio existente, conexiones, claves, colaboradores ni registros de usuarios. El autor no recibe acceso a las instalaciones ni sus credenciales. No se copian conexiones de otra persona.

Tu instancia conecta con tu Odoo. Sites/OpenAI aloja la instancia y el código usa DNS público de Cloudflare para validar el destino. Los resultados que vuelven al chat siguen siendo procesados por ChatGPT/Codex y Odoo. No se promete aislamiento frente a los proveedores de la plataforma ni se afirma que las claves estén literalmente dentro del historial de ChatGPT.

## Trabajar

Quince herramientas de consultas, historial, cambios de negocio a pedido y control compacto de novedades. El asistente investiga con lecturas y prepara borradores sin interrumpir por cada consulta. Antes de enviar respuestas/notas muestra el borrador y espera aprobación. Cerrar un ticket requiere aprobación diferenciada.

Puede sugerir seguimiento con frecuencia, vencimiento y límites. Activarlo requiere aceptación y un planificador compatible con persistencia y avisos. La instalación no crea tareas ni un motor automático propio. Las tareas del asistente pueden consumir tokens.

[Instalación](docs/github-install.md) · [Privacidad de cada instancia](docs/cloud-connection.md) · [Seguimiento](docs/follow-up.md)

## Código y comprobación

El paquete distribuido está en submission/odoo. El sitio fuente sin identidad está incluido en skills/instalar-odoo/assets/site-template dentro de ese paquete. Las instrucciones de instalación conservan el flujo seguro de Sites, reutilizan una instancia propia existente y verifican propiedad/acceso privado antes de configurar credenciales.

```
node scripts/build.mjs
node scripts/test.mjs
node scripts/test-template.mjs
node scripts/validate-artifact.mjs
```

Las pruebas ficticias verifican dos instalaciones compiladas con bases, secretos y enlaces independientes; aislamiento, cifrado, aprobación de mensajes y rechazo de redirecciones. No afirman que se probó la creación desde una segunda cuenta real. El arnés local opcional permanece solo para desarrollo.

Soporte: anthony@nst-group.com. No envíes claves ni datos de clientes. Integración independiente, no oficial de Odoo. [Licencia MIT](LICENSE).
