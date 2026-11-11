---
version: 1
slug: "src-app-page-js"
primary_target: "src/app/page.js"
related_targets: []
---

# Home page (single-page portfolio)

Scope: the whole one-page site at `/`. Visitor mode: Experience.
Audience: anyone looking Viraj up (recruiters, engineers, professors, peers). Job: understand who he is and what he has shipped, then reach out.
Content: intro, about + live stats, journey, research, skills, projects (GitHub-synced), writing (Hashnode-synced), contact form, Q&A. Reviews removed.
Constraints: light and dark themes, free tiers only, fast on phones, reduced-motion safe.

## Direction contract

THESIS: The page is a live heat map. A thermal field warms under the cursor and cools back to baseline, which is the recovery curve his GPU paper measures; the mechanism is demonstrated, not described. Refuses the dark bento-grid developer portfolio with gradient glow.

OWN-WORLD: Infrared false colour as ground, not accent. The page itself runs cold to hot as you scroll: indigo, violet, magenta, orange, with yellow as white-hot highlight. Dark theme is the ironbow palette on near-black indigo; light theme is the white-cold palette on icy lavender. Contour isolines, axis ticks and figure captions are the furniture. Archivo (expanded heavy for display, normal for text); mono only for measurements and readouts.

STORY: Visitor meets a cold field and a name, moves, sees heat follow and decay. Scrolling warms the page through about, journey (heat bars per event), research (live figures), skills (a heat map), projects, writing, to the hottest point, the contact form; the footer recovers to baseline.

FIRST VIEWPORT: Full-bleed WebGL thermal field with isolines. Name in very large expanded heavy caps bottom-left over the field, one sentence, two actions. Top-right a small instrument readout of cursor heat and recovery time. Right edge: the colour bar legend that is the nav, with section ticks and a live temperature marker.

SIGNATURE INTERACTION: one clock. Scroll is temperature: the colour bar marker climbs, section grounds step up the ramp, and the readout rises from 24 to 96 degrees, then recovers at the footer. In the hero the pointer splats heat into a decaying simulation and the readout times the recovery. Motion grammar: things warm up (colour and scale along the ramp) with exponential ease-out; nothing fades up generically.

FORM: Thermal Field, position 1 on the first-hand grounded list; pinned by the user after first choosing Speedcube. Seed key 41279581. Build path: code-led.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
