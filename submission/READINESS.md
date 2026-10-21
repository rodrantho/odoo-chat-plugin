# Public release preparation — 2026-10-21

## Current decision: local GitHub distribution, version 0.3.0

The creator chose GitHub distribution and declined to continue publisher verification/billing. No OpenAI public-directory submission is being pursued. The current installable package is `submission/odoo`, registered by `.agents/plugins/marketplace.json`. It runs as a Windows local stdio MCP process with Node.js 24+, four-field loopback settings and DPAPI CurrentUser credential protection. It does not use the historical hosted endpoint below. See [installation](../docs/github-install.md) and [security scope](../docs/local-security.md).

Windows profiles separate local configurations; changing ChatGPT accounts within one Windows profile does not. Record data returned to chat still follows the chat service and Odoo processing. Automated fictional-data tests cover the 14 tools, draft approval, DPAPI, loopback controls and actual stdio child-process discovery. No production write or customer notification was tested. Historical reviewer/demo requirements below are not claims that those materials exist or are required for the GitHub installation.

The remaining sections record the earlier hosted submission proposal. Their runtime versions, policies, account-isolation model and portal status are historical, not the current local package behavior.

## Confirmed by the creator

- Display name: Odoo.
- Creator: Anthony Rodríguez (individual; portal verification pending).
- Free, all available countries; no payments or purchases inside this connector.
- Public support contact: anthony@nst-group.com.
- Public code repository and a presentation website requested by the creator.
- Source license: MIT. Light and dark icon variants requested.

## Implemented

- Four connection fields, isolated and encrypted per authenticated user.
- Odoo 17 support, 14 tools, history, replies/notes with draft approval, requested business actions and deletion; closure requires explicit approval. Version 0.2.0 source prepared; deployment evidence is recorded separately.
- Separate application and database from the internal connector; no internal connections copied.
- Test coverage for ownership, different tenants/servers, credential protection, network restrictions and writes without production side effects.
- Original light/dark icons generated, actual PNG files checked at 1254×1254 and below 5 MiB. Brand colors included.
- Listing and five positive / three negative cases drafted in `odoo/plugin.json`. Cases are **Not run** against reviewer fixtures; automated unit/integration tests are separate evidence.

## Current update evidence — 2026-10-21

- Both sources build and pass simulated SQLite/HTTP tests, including 14 tools, ownership/isolation, approved customer/internal messages, compatibility posting, business actions/wizards, deletion and refusal to post without the approval flag. No production calls or real customer notifications were made.
- Bundled workflow instructions saved successfully in the two canonical plugins and read back: public package 1.0.1; internal package 1.0.2. These package versions are separate from the runtime versions.
- Runtime source prepared: public 0.2.0; internal 3.2.0. **Not deployed**: the execution approval review rejected forwarding the temporary Sites source credential to its helper. The existing public runtime remains 0.1.0. Do not present source tests as verification of a hosted 0.2.0 installation.
- Public-source and reachable-history audit completed separately; no internal connection markers or credential-pattern findings in the examined scope. Creator name, public repository routing and the explicitly approved support contact are intentional public information. No runtime credential storage was read.
- Creator cannot access the PC now. The official publication portal is at its login screen; no draft upload, review submission, approval or directory publication has occurred.
- Docker Desktop was started to prepare a fictional-data environment, but its Linux engine did not become available (missing engine pipe initially; bounded subsequent query timed out). No test Odoo instance or actual demo recording has been created.
- Policy/terms drafts now use the confirmed responsible party, Uruguay and public contact. They remain proposals awaiting creator approval and operational-retention confirmation, not finalized published policies.

## Remaining before a submission-ready ZIP

Creator update, 2026-10-21: Anthony Rodríguez confirmed Uruguay and anthony@nst-group.com as responsible-party/contact details and authorized preparation of a test instance, tests and a demo using fictional data only. This supersedes the earlier no-test instruction for fictional data. Production remains excluded. A demo recording and reviewer-accessible test setup are still pending.

1. Development endpoint published successfully at https://odoo-personal.rubymouse256.chatgpt.site/mcp, Sites project `appgprj_6ad9162521f4819183c03e000f2ed3c2`, deployment `appgdep_6ad917f3ed108191b4b9ce806a0a9636`; source commit `34bb663a2ae7cb46dfc17f43f36cfce4893f3d7f`. D1 schema applied and user_connections table confirmed. Canonical plugin: plugin_asdk_app_sites_6ab75fabf23c8191927773a349aa226c, reported already installed by the platform; tools are not yet exposed in this chat. OAuth/account configuration and actual in-chat tests remain pending; do not create duplicate App ownership.
2. Presentation and support pages are published and content-verified at https://rodrantho.github.io/odoo-chat-plugin/ and https://rodrantho.github.io/odoo-chat-plugin/support.html (HTTP 200, correct creator and support contact). Public repository: https://github.com/rodrantho/odoo-chat-plugin . Policy and terms drafts still need creator decisions/review; draft pages are not verified public policies.
3. Record real interactions with the actual plugin version and sample data. A script or screenshots do not replace the recording. Video hosting URL and reviewer playback not yet supplied.
4. Prepare dedicated reviewer access to an Odoo 17 test instance with sample data. Never use the production instance for reviewers.
5. Verify the intended individual publisher in the submission portal and its supported ownership path for the Sites-generated App.
6. Complete applicable scans, attestations, connection and review cases for the exact saved submission. No portal upload, review submission or directory publication performed.

## Demo plan

Use a dedicated Odoo test database with two sample contacts (e.g. Review Alpha / Review Beta), at least two sales orders in different states, and permission to create/edit sample contacts. Do not record a key entry or production data.

Show: configuration already connected; “Check my connection”; find Review contacts; read one contact; count/group orders; explicitly create and rename a sample contact; show a ticket-reply draft without sending, explicitly approve that exact draft, post it to a fictional customer, propose closure separately and verify the approved final state; demonstrate refusing disclosure of another user key. Record the app and actual chat results. The creator can start a screen recorder while the walkthrough is performed; no video-capture capability has been confirmed in this environment.

## Policy draft decisions still to confirm

- Data controller's legal/contact details and any required address/jurisdiction.
- Hosting-provider log and backup retention applicable to this deployment; active credentials are deleted on disconnect, but no unverified backup-deletion deadline is promised.
- Service terms (availability, support commitments, allowed use, termination and responsibility for requested writes).
