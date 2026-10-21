# Odoo

Independent **Odoo 17** connector by **Anthony Rodríguez**. Free, MIT source. Distributed through this GitHub marketplace for compatible **Windows desktop** clients; requires **Node.js 24+**.

## Install from GitHub

Add `https://github.com/rodrantho/odoo-chat-plugin` as a GitHub marketplace source, then install **Odoo** from **Odoo · Anthony Rodríguez**. Codex CLI equivalents:

```
codex plugin marketplace add rodrantho/odoo-chat-plugin --ref main
codex plugin add odoo@odoo-by-anthony
```

Start a new chat and ask to check your **local Odoo connection**. Open the returned `127.0.0.1` link and enter your own public HTTPS server URL, database, Odoo login and API key in that local form. Never paste API keys in chat.

See the [step-by-step installation guide](docs/github-install.md) (Spanish).

## How it works

The plugin launches a local MCP process on the user PC. It connects directly to the configured Odoo 17 server with that account permissions. Credentials are stored outside the repository, protected for the Windows user with DPAPI. There is no shared connector service or credential database. The previous hosted development endpoint is not used by the GitHub package.

ChatGPT account sign-in does not store or synchronize this local credential file. Each PC/Windows profile needs its own configuration. Record data returned in chat is still processed by the chat service and Odoo normally.

People using the same Windows profile share that profile's local Odoo connection even when they switch ChatGPT accounts. Use separate Windows profiles, or disconnect Odoo before sharing the profile.

## Features

- Fourteen tools: models/fields, search/read/count/group, ticket history, customer replies, internal notes, create/update/delete and public business actions.
- Explicit user requests for changes. Show the complete message draft, recipients, visibility and attachments; wait for explicit approval before posting.
- Propose ticket closure when supported by evidence and wait for approval of that state change. Approving a reply alone never authorizes closure.
- Discover business methods, complete returned wizards and read back results. Posting does not prove email delivery.
- No credential/permission administration, server code execution or privilege escalation. Odoo retains its permission checks.
- Public HTTPS destinations only, no redirects or private network targets. Local settings listen only on `127.0.0.1` behind a random per-process path, with same-origin write checks.

## Development and verification

From the repository root:

```
node scripts/build.mjs
node scripts/test.mjs
node scripts/validate-artifact.mjs
node scripts/test-local.mjs
node scripts/test-stdio.mjs
```

The tests use fictional data, mocked Odoo servers and temporary encrypted configuration. They cover business tools, ownership/isolation, approved messages, destination restrictions, DPAPI persistence, local HTTP controls, real child-process MCP startup/discovery and clean shutdown. They do not prove every Odoo module/customization or real email delivery.

`submission/odoo` is the installable local plugin directory used by the GitHub marketplace. The retained `worker/`, database migration and `.openai/` sources describe the earlier hosted development implementation; they are not deployed or used by this local package. `submission/READINESS.md` records the historical hosted work and the change to GitHub distribution. No public-directory submission is being pursued at present.

Support: **anthony@nst-group.com**. Not an official Odoo product. Source under the [MIT License](LICENSE).
