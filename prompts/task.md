# TASK: Refine homepage popular treatment card visual alignment

## Objective
Polish the homepage “Popular Treatments” card section so the card backgrounds blend cleanly into the white section and the card text aligns consistently across all cards.

This is a refinement only, not a redesign.

## Guardrails
- Follow `guardrail.md` and `site-rules.md`.
- Do not redesign the section.
- Do not change colours, fonts, copy, images, links, buttons, or section order.
- Do not alter unrelated sections.
- Keep changes small, reversible, and scoped.
- Preserve the existing premium aesthetic.
- Prioritise consistency, readability, and mobile responsiveness.

## Scope
Only inspect and edit files directly related to:
- Homepage “Popular Treatments” section
- Treatment card CSS
- Local spacing/layout rules for this section

## Problems to fix

### 1. Card background looks slightly tinted
The treatment cards currently appear to have a subtle off-white/grey background that sits awkwardly against the white section background.

Fix this by:
- Making the card background blend cleanly with the parent white background
- Removing or reducing any unwanted tint, overlay, gradient, or shadow causing the mismatch
- Preserving the existing border radius and soft border style
- Keeping the cards premium and clean, not flat or unfinished

### 2. Treatment card headings and paragraphs do not align consistently
The card headings and body text currently sit at slightly different vertical positions because image heights/text wrapping differ.

Fix this by:
- Ensuring all card images use a consistent height/aspect ratio
- Ensuring all card headings start on the same vertical line across the row
- Ensuring all card paragraphs start on the same vertical line across the row
- Using consistent internal spacing between image, heading, and paragraph
- Keeping card content readable and balanced

### 3. Heading wrapping
Some headings wrap onto two lines. Do not force every heading onto one line if it would make the design cramped.

Instead:
- Make heading behaviour consistent and intentional
- Keep two-line headings visually balanced where needed
- Avoid making text too small
- Only make minor typography/spacing adjustments if necessary

### 4. Card height refinement
If safe, slightly reduce excess vertical height in the cards by tightening internal spacing.

Do not make the cards feel cramped.

## Mobile checks
Ensure:
- No horizontal overflow
- Cards remain readable on smaller screens
- Text does not become too small
- Existing mobile layout is not broken

## Acceptance criteria
- Card backgrounds blend cleanly with the white section background.
- All card images align consistently.
- All card headings start at the same vertical position.
- All card paragraphs start at the same vertical position.
- Cards feel slightly cleaner and more balanced.
- No copy, images, links, or unrelated sections are changed.
- No mobile overflow is introduced.
- Site still builds/runs successfully.
