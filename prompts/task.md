# TASK: Polish header dropdown and standardise treatment card alignment

## Objective
Improve the desktop header dropdown so it feels intentionally designed and slightly separated from the navbar, and fix spacing/alignment inconsistencies in the homepage treatment cards section.

The goal is polish only — not redesign.

## Guardrails
- Follow `guardrail.md` and `site-rules.md`.
- Do not redesign the site.
- Do not change colours, fonts, copy, button styles, section order, or imagery.
- Do not refactor unrelated CSS or HTML.
- Do not alter mobile nav behaviour unless required to preserve existing functionality.
- Keep all changes small, reversible, and scoped.
- Preserve all existing links and button text.
- Prioritise visual consistency, spacing, and mobile responsiveness.

## Scope
Only inspect and edit files directly related to:
- Header / navbar
- Desktop treatments dropdown menu
- Homepage “Popular Treatments” card section
- Shared container/spacing rules only if already used by these sections

## Problems to fix

### 1. Header dropdown feels stuck to the navbar
The treatments dropdown currently sits too tightly against the nav/header and feels visually attached.

Improve it subtly by:
- Adding a small vertical offset below the nav item/header
- Ensuring the dropdown feels like a floating panel
- Preserving the existing design language
- Keeping border radius, shadow, and spacing refined
- Making sure it still aligns neatly with the Treatments nav item or menu area

Do not change the dropdown content or links.

### 2. Treatment cards section alignment mismatch
In the homepage “Popular Treatments” section, the headings/paragraphs and treatment cards feel slightly misaligned.

Fix this by:
- Ensuring the section heading, intro text, “View all treatments” link, card grid, divider, and bottom CTA row share a consistent container alignment
- Ensuring card content spacing is consistent across all cards
- Making treatment card headings and paragraphs line up visually
- Keeping existing card sizes, images, copy, and visual style
- Avoiding layout redesign

### 3. Keep mobile safe
Check the homepage treatment cards section and nav/dropdown behaviour on mobile widths.

Ensure:
- No horizontal overflow
- Cards remain readable
- Header/nav remains usable
- Existing mobile menu behaviour is not broken

## Implementation guidance
- Prefer adjusting existing spacing/container rules rather than adding new duplicate systems.
- If a shared `.container` or section container already exists, use it consistently.
- If specific treatment card rules are causing the mismatch, fix those local rules only.
- Avoid changing global typography or broad section spacing unless unavoidable.
- Keep desktop and mobile changes minimal.

## Acceptance criteria
- Desktop dropdown no longer looks stuck directly to the navbar.
- Dropdown feels like a deliberate floating menu panel.
- Homepage treatment section elements align cleanly on the same visual column.
- Treatment card headings and paragraph spacing look consistent.
- No visual redesign has occurred.
- No unrelated sections are changed.
- No mobile horizontal overflow is introduced.
- Site still builds/runs successfully.

## Final checks
After making changes, run:

```bash
git diff
git status