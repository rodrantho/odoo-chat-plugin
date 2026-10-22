# Odoo

Independent Odoo 17 connector by Anthony Rodríguez. Free, MIT source. Version 0.4 uses the authenticated **remote connection**; the installed plugin no longer starts a local Windows process.

## Connect

Use the Odoo account plugin or add this repository as a GitHub marketplace in a compatible client:

```
codex plugin marketplace add rodrantho/odoo-chat-plugin --ref main
codex plugin add odoo@odoo-by-anthony
```

Connect/authenticate the remote MCP when prompted. Ask to check your Odoo connection and open the HTTPS settings link. Enter your own server URL, database, login and API key there, never in chat. No Node runtime is required for this remote plugin. Cross-device availability depends on the client's remote plugin support and authenticated connection; GitHub installation alone does not publish it in the OpenAI Directory or install it on every device.

The connector service stores each connection encrypted and bound to the verified ChatGPT identity supplied by Sites. Credentials are not literally stored inside a ChatGPT account. The service operator controls the hosting and encryption secret; this is not end-to-end encryption against that operator. Queried records returned to chat are processed by ChatGPT/Codex and Odoo normally. See [connection/security](docs/cloud-connection.md).

## Work with fewer interruptions

- Read the records and references needed to resolve the requested task, compare results and prepare a complete reply without asking permission for every read.
- Other applications require their own authorized connections. This connector does not grant Google Workspace administration access.
- Show customer replies/internal notes, recipients, visibility and attachments for approval before posting. Propose ticket closure for separate approval. Never send or close automatically during follow-up.
- Suggest a concrete follow-up when waiting for a response or result. Activate it only after acceptance and verification of a scheduler, personal connection, persistent checkpoint and notification path.
- A compact read-only ticket probe returns a fingerprint and changed:false without history when unchanged. It does not itself schedule jobs or send alerts. Assistant schedules can still consume tokens; no zero-cost claim.

See [bounded follow-up](docs/follow-up.md) and [installation](docs/github-install.md).

## Development

```
node scripts/build.mjs
node scripts/test.mjs
node scripts/validate-artifact.mjs
node scripts/test-local.mjs
node scripts/test-stdio.mjs
```

Fictional-data tests cover separate user connections, encrypted ownership, network restrictions, business operations, approved messages and read-only compact change detection. The optional Windows development harness is retained in local-runtime; it is not part of the installed remote package. It stores configuration by Windows profile and does not provide account synchronization. No production writes, real customer notifications or full Odoo demo instance are claimed by these tests.

Support: anthony@nst-group.com. Not an official Odoo product. Source under [MIT](LICENSE).
