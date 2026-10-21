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
- Original icon generated for this connector; dark-mode companion being prepared. Brand colors are optional.
- Listing and five positive / three negative cases drafted in `odoo/plugin.json`. Cases are **Not run** against reviewer fixtures; automated unit/integration tests are separate evidence.

## Remaining before a submission-ready ZIP

1. Publish and verify the new development endpoint and canonical plugin connection; do not create duplicate App ownership.
2. Host and verify presentation/support pages. Policy and terms drafts need creator decisions/review; draft pages are not verified public policies.
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
