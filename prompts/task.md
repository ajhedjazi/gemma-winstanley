# TASK: Standardise all CTA sections site-wide

## Objective
Fix every CTA section across the site so all CTAs follow the same structure, spacing, mobile behaviour, and container rules as the homepage CTA.

The homepage CTA is the source of truth.

## Guardrails
- Do not redesign the CTA visually.
- Do not change copy unless absolutely necessary.
- Do not change colours, fonts, button styles, or section order.
- Do not alter unrelated sections.
- Keep the current aesthetic and layout style.
- Preserve existing links and button text.
- Make the smallest safe changes needed.
- Prioritise consistency and mobile responsiveness.

## Source-of-truth CTA structure

All CTA sections should follow this pattern:

```html
<section class="section cta-band section-deep">
  <div class="container cta-panel">
    <!-- existing CTA content -->
  </div>
</section>