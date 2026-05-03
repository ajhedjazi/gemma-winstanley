TASK: PageSpeed-safe performance improvements for Gemma Winstanley site

Goal:
Improve mobile PageSpeed/Core Web Vitals without changing the visual design, layout, spacing, content, navigation behaviour, or animations unless specifically required for performance safety.

Current PageSpeed issues:
- FCP: 2.7s
- LCP: 3.0s
- TBT: 310ms
- CLS: 0
- Forced reflow reported from /script.js
- Main-thread work: mostly Style & Layout
- LCP image is /assets/images/hero.webp and PageSpeed says fetchpriority="high" should be applied.

Important constraints:
- Do NOT redesign the site.
- Do NOT alter page layout, spacing, typography, colours, menu design, cards, or content.
- Do NOT remove visible sections.
- Keep all changes small, reversible, and performance-focused.
- Preserve CLS at 0.
- Avoid risky global refactors.

Please do the following:

1. LCP hero image optimisation
- Find the hero image on the homepage:
  /assets/images/hero.webp
- Ensure the actual above-the-fold hero image has:
  loading="eager"
  fetchpriority="high"
  decoding="async"
  width and height attributes preserved or added if missing.
- Do NOT lazy-load the homepage hero image.
- If there is already a preload for the hero image, avoid duplicating it.
- If there is no preload, add this inside <head> only on pages where this image is the above-the-fold LCP image:

<link rel="preload" as="image" href="/assets/images/hero.webp" type="image/webp" fetchpriority="high">

2. Do NOT apply high priority to every image
- Only the above-the-fold LCP hero image should get fetchpriority="high".
- All below-the-fold images should remain lazy-loaded where appropriate.

3. Fix forced reflow in script.js
- Inspect /script.js around the reported areas:
  line ~360
  line ~180
  line ~281
- Look for patterns where JavaScript reads layout values after writing styles/classes, for example:
  offsetWidth
  offsetHeight
  getBoundingClientRect()
  scrollHeight
  clientHeight
  getComputedStyle()
  immediately after classList changes, style changes, DOM insertions, or animation setup.

- Refactor these so layout reads happen before layout writes.
- Batch DOM reads together first, then DOM writes inside requestAnimationFrame().
- Do not change the user-facing behaviour.

Example pattern to avoid:

element.classList.add("active");
const height = element.scrollHeight;

Safer pattern:

const height = element.scrollHeight;
requestAnimationFrame(() => {
  element.classList.add("active");
});

4. Animation safety
- Check scroll reveal / appear-on-scroll code.
- Make sure it uses IntersectionObserver, not scroll listeners that constantly calculate layout.
- If scroll listeners exist, replace with IntersectionObserver where safe.
- Animate only transform and opacity.
- Avoid animating height, top, margin, padding, width, or left.

5. Menu/mega-menu performance safety
- If any menu scripts calculate widths/heights on hover or scroll, cache measurements where possible.
- Avoid repeated layout reads during mousemove, scroll, resize, or hover.
- Do not alter the visual layout of the mega menu.

6. Resize handling
- If resize listeners exist, debounce them.
- Avoid recalculating layout on every resize event.

7. Image dimensions
- Check all key images have width and height attributes or CSS aspect-ratio to prevent layout shift.
- Do not crop or visually resize images differently.

8. Testing
After changes:
- Run the site locally.
- Confirm homepage, lip-blush, microblading, treatments, and contact pages still look the same.
- Confirm mobile nav and mega menu still work.
- Confirm scroll reveal animations still work.
- Confirm no layout shift is introduced.
- Commit and push changes.

Git commands:
git add .
git commit -m "Improve PageSpeed performance safely"
git push