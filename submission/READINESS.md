# Public release preparation — 2026-10-21

## Confirmed by the creator

- Display name: Odoo.
- Creator: Anthony Rodríguez (individual; portal verification pending).
- Free, all available countries; no payments or purchases inside this connector.
- Public support contact: anthony@nst-group.com.
- Public code repository and a presentation website requested by the creator.
- Source license: MIT. Light and dark icon variants requested.

## Implemented

- Four connection fields, isolated and encrypted per authenticated user.
- Initial Odoo 17 support, nine tools, explicit user-requested writes.
- Separate application and database from the internal NST plugin; no internal connections copied.
- Test coverage for ownership, different tenants/servers, credential protection, network restrictions and writes without production side effects.
- Original light/dark icons generated, actual PNG files checked at 1254×1254 and below 5 MiB. Brand colors included.
- Listing and five positive / three negative cases drafted in `odoo/plugin.json`. Cases are **Not run** against reviewer fixtures; automated unit/integration tests are separate evidence.

## Remaining before a submission-ready ZIP

1. Development endpoint published successfully at https://odoo-personal.rubymouse256.chatgpt.site/mcp, Sites project `appgprj_6ad9162521f4819183c03e000f2ed3c2`, deployment `appgdep_6ad917f3ed108191b4b9ce806a0a9636`; source commit `34bb663a2ae7cb46dfc17f43f36cfce4893f3d7f`. D1 schema applied and user_connections table confirmed. Canonical plugin: plugin_asdk_app_sites_6ab75fabf23c8191927773a349aa226c, reported already installed by the platform; tools are not yet exposed in this chat. OAuth/account configuration and actual in-chat tests remain pending; do not create duplicate App ownership.
2. Presentation and support pages are published and content-verified at https://rodrantho.github.io/odoo-chat-plugin/ and https://rodrantho.github.io/odoo-chat-plugin/support.html (HTTP 200, correct creator and support contact). Public repository: https://github.com/rodrantho/odoo-chat-plugin . Policy and terms drafts still need creator decisions/review; draft pages are not verified public policies.
3. Record real interactions with the actual plugin version and sample data. A script or screenshots do not replace the recording. Video hosting URL and reviewer playback not yet supplied.
4. Prepare dedicated reviewer access to an Odoo 17 test instance with sample data. Never use the internal NST production instance for reviewers.
5. Verify the intended individual publisher in the submission portal and its supported ownership path for the Sites-generated App.
6. Complete applicable scans, attestations, connection and review cases for the exact saved submission. No portal upload, review submission or directory publication performed.

## Demo plan

Use a dedicated Odoo test database with two sample contacts (e.g. Review Alpha / Review Beta), at least two sales orders in different states, and permission to create/edit sample contacts. Do not record a key entry or production data.

Show: configuration already connected; “Check my connection”; find Review contacts; read one contact; count/group orders; explicitly create and rename a sample contact; ask to delete it and show the unsupported-operation response. Record the app and actual chat results. The creator can start a screen recorder while the walkthrough is performed; no video-capture capability has been confirmed in this environment.

## Policy draft decisions still to confirm

- Data controller's legal/contact details and any required address/jurisdiction.
- Hosting-provider log and backup retention applicable to this deployment; active credentials are deleted on disconnect, but no unverified backup-deletion deadline is promised.
- Service terms (availability, support commitments, allowed use, termination and responsibility for requested writes).
