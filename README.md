# Odoo

Independent Odoo chat connector by **Anthony Rodríguez**. Free, intended for all available countries. Public-directory preparation build; not submitted or approved for the directory yet.

Users configure their own **HTTPS server URL**, **database**, **Odoo login** and **API key** in a private settings page. Each operation uses that user's Odoo account and its existing permissions. This initial release accepts **Odoo 17**. Other versions are rejected before sending the API key; support for their APIs is not claimed.

## Features

- Discover models and fields; search, read, count and group records.
- Fourteen tools: query, ticket history, customer replies, internal notes, create/update/delete records and public business actions. Odoo applies the current account permissions and may run automations.
- Show the complete message draft, recipients, visibility and attachments; wait for explicit user approval before posting. Draft approval is required for both customer replies and internal notes.
- If evidence suggests a ticket is resolved, propose its actual final state for explicit approval. Approving a reply alone never authorizes closure. Read back the state after approved changes.
- Discover business actions before executing them; complete returned wizards before claiming success. No credential/permission administration, server code execution or privilege escalation.
- Replace or disconnect only your own connection. Never paste API keys into chat.

## Development

Node.js 24 or later is required for the SQLite test runner. Build and test without runtime dependencies:

```
node scripts/build.mjs
node scripts/test.mjs
node scripts/validate-artifact.mjs
```

`npm install` is needed only to generate future schema migrations with `npm run db:generate`. The application itself uses Web APIs and a Cloudflare D1 binding. The Sites deployment workflow packages source and applies schema-only migrations.

## Hosting and secrets

Deploy as a Sites Worker with D1 binding `DB`. Set `CREDENTIAL_ENCRYPTION_KEY` to a cryptographically random 32-byte base64 secret in the runtime secret store. Keep that key stable; rotating it without a data migration makes existing credentials unreadable. Never commit or print its value.

Sites supplies the authenticated `oai-authenticated-user-id`. Every credential query binds that ID, never an ID supplied by the user. AES-256-GCM encrypts each complete connection with a random IV and authenticated data containing its owner. Anonymous/service requests without a user identity cannot access stored connections. User status never returns the API key.

Outbound connections require public HTTPS hostnames, public DNS addresses, port 443, no embedded credentials and no URL paths. Redirects are refused. DNS resolution is checked before calls; DNS checks are not a substitute for the hosting provider's egress controls. Private network deployments and custom TLS certificates are outside this hosted release.

The public source repository does not contain user data, encryption keys, API keys, or internal customer connections. The deployed Site's ID is a public routing identifier, not a credential.

## Verification and publication status

The 0.2.0 source passes simulated tests. Its hosting publication is pending; the existing development endpoint still runs 0.1.0. Workflow instructions were separately saved to the canonical development plugin. No public-directory upload or review submission has occurred.


Version 0.2.0 adds the internal connector business features while retaining independent per-user server/database configuration. An older host tool catalog can post approved messages through `odoo_create` on `mail.message`; read `odoo_status.message_compatibility` and include `values.user_approved:true` only after draft approval. Posting a message does not prove email delivery.


Tests use two simulated users, different servers/databases and an in-memory SQLite database. They verify encrypted ownership, cross-user rejection, failed replacement, separate disconnect, URL/DNS restrictions and simulated writes. They do **not** prove two real hosted sessions or an approved public listing. The earlier internal connector was exercised against a real Odoo 17 instance; no production credentials or customer data are supplied as reviewer fixtures.

See [review preparation](submission/READINESS.md). Public submission needs a demo recording, dedicated reviewer test access, verified developer identity, completed policy pages and review checks. The source is released under the [MIT License](LICENSE), as selected by the author.

Support: **anthony@nst-group.com**. Independent project; not an official Odoo product.
