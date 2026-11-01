# Work In Progress

**Session started**: 2026-09-28T11:27+05:30
**Tool**: Claude Code

## Task
Queue the "AI automation" website work for the AI employee's developer and tester: a showcase page for the
AI Employee (/ai-employee) plus nav and homepage teaser, a repositioning of the site's services/hero/SEO copy
around AI automation (AI employees, scheduled tasks, routines), and FAQ/consistency fixes. Write precise
queue items (AI Employee folder, queue/) and a shared content brief so the developer builds exactly the
agreed copy and the tester checks it on the PR preview. Also advise (no files) on a future AI Reviewer role.
(The previous task in this file — floating-menu query form, commit b0419ba — is Done and on origin/main.)

## Status
Done

## Completed
- Reviewed the site (modern design, live homepage) and the AI Employee folder's queue/README.md format.
- Confirmed origin/main = b0419ba; no approved items in the queue; SWA builds a preview for every PR into main.

- Wrote AI Employee/briefs/2026-09-28-website-ai-automation.md (the copy for W1-W3).
- Wrote queue/2026-09-28-NOJIRA-website-ai-employee-page.md (p1), -website-ai-automation-services.md (p2),
  -website-faq-consistency.md (p3), status approved, each with a tester request block.

## Remaining
- Nothing for this session. The developer routine picks W1 at its next :45 run.

## Key Decisions
- Defaults (Davinder can edit the brief before the developer's next run): offer = "we set it up for you" +
  proof point, no pricing; AI automation leads the message; no vendor names (Claude/Anthropic) on the site;
  real week-one numbers used, dated.
- Three separate draft PRs from origin/main, each touching distinct hunks, so they can merge in any order.
- Tester checks the Azure Static Web Apps PR preview URL (no .env.local in worktrees, never copied).

## How to Resume
Files live in the AI Employee OneDrive folder (queue/, briefs/). No code in this repo is changed by this task.
If interrupted: finish the remaining queue files using the brief; the developer routine picks approved items
at :45 each hour.
