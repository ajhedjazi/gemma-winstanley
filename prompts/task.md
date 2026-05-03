# TASK: Refine treatment cards (background, alignment, hover clipping)

## Objective
Polish the homepage treatment cards so they:
- have clean white image backgrounds
- align consistently across all cards
- do not clip when hovered

This is a visual refinement only — no redesign.

## Guardrails
- Follow `guardrail.md` and `site-rules.md`.
- Do not redesign the cards.
- Do not change colours, fonts, buttons, or layout structure.
- Do not change card order.
- Do not alter unrelated sections.
- Keep changes small, scoped, and reversible.
- Preserve the current aesthetic and spacing system.

## Scope
Only edit:
- Treatment card CSS
- Treatment card content (Medical Tattoo card only, minor trim)
- Hover interaction styles for cards

## Problems to fix

---

### 1. Remove background from card images

Currently, treatment card images appear to have a faint background/tint that does not match the white page.

Fix:
- Ensure all treatment card images sit on a pure white background
- Remove any background colour, overlay, or tint applied to image containers
- Ensure images visually blend into the white section

Do not:
- Change image sizes
- Add borders
- Alter layout

---

### 2. Fix text alignment inconsistency (Medical Tattoo card)

The "Medical Tattoo" card has more text than others, causing misalignment.

Fix by:
- Slightly reducing the paragraph length ONLY for this card
- Keep meaning intact but tighten wording
- Ensure visual alignment with other cards

Do not:
- Rewrite all cards
- Change tone or style
- Reduce font size globally

---

### 3. Fix hover clipping issue

Currently, when hovering over cards, the top of the card is cut off.

This is likely caused by:
- `overflow: hidden` on parent container
- transform/translate/scale on hover

Fix by:
- Ensuring hovered cards are fully visible
- Adjusting overflow, transform, or container spacing as needed
- Maintaining the existing hover effect style

Do not:
- Remove hover effect entirely
- Dramatically change animation

---

## Implementation guidance
- Prefer fixing container overflow rather than removing hover effects
- Ensure sufficient top spacing if cards lift on hover
- Keep hover smooth and subtle
- Keep card layout consistent across all cards

---

## Mobile checks
Ensure:
- No clipping on mobile
- No overflow issues
- Cards remain readable
- Layout remains unchanged

---

## Acceptance criteria
- Card images appear on a clean white background
- No visible tint or mismatch with section background
- Medical Tattoo card aligns visually with other cards
- Hovering over cards no longer cuts off the top
- Hover effect still works smoothly
- No redesign has occurred
- No unrelated sections affected
- No layout breakage
- Site builds/runs successfully

---

## Final checks
After making changes, run:

```bash
git diff
git status