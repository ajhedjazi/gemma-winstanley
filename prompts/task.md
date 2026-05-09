# Task: Fix review quote/name spacing

## Before making changes
- Read `/prompts/guardrail.md`
- Read `/prompts/site-rules.md`
- Make the smallest possible CSS-only change.
- Do not redesign the reviews section.
- Do not change the reviews grid, card order, content, colours, shadows, padding, typography size, border radius, header, hero, CTA or footer.

## Problem
On `reviews.html`, the spacing between each review quote and the reviewer name is inconsistent.

In some cards, the reviewer name sits close to the quote.
In other cards, the reviewer name is pushed much further down.

I want the gap between:
1. the review quote
2. the reviewer name

to be exactly the same on EVERY review card.

This must apply to:
- standard 2-column review cards
- featured/full-width review cards
- short reviews
- long reviews

## Required fix
Update the CSS so every review card uses the same quote-to-name spacing.

Use one shared spacing rule where possible.

Specifically:
- Identify the quote element inside each review card.
- Identify the reviewer name/author element inside each review card.
- Remove any CSS causing names to be pushed down or spaced inconsistently.
- Remove conflicting default margins from quote/name elements.
- Set the quote margin-bottom to `0`.
- Set the reviewer name margin-top to one consistent value, e.g. `1rem` or `1.1rem`.
- Apply this same rule to both standard and featured review cards.

## Important constraints
Do NOT use:
- `justify-content: space-between`
- `margin-top: auto`
- `min-height` to create the quote/name gap
- absolute positioning
- manual positioning of individual cards
- masonry layout
- CSS columns
- `grid-auto-flow: dense`

Do NOT:
- push names to the bottom of cards
- force all cards to the same height
- create different spacing rules for featured and standard cards
- change the HTML order
- change review text

## Expected result
Every card should have:
- quote text
- then the same ample gap
- then reviewer name

The name should always sit naturally below the quote, not at the bottom of the card.

## Visual check
After changing CSS, check:
- Sophie C.
- Michelle
- Stacey Jessop featured card
- Tyna featured card
- Phil & Carmen P.
- Sue Wakefield
- Donna Wright

All should have the same gap between quote and name.

## Files
Limit changes to:
- `styles.css`
- `reviews.html` only if absolutely necessary

## Git
After changes, run:

git add reviews.html styles.css
git commit -m "Fix review quote author spacing"
git push