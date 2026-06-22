# Veo 3 Video Prompts — adnankhan.tech scroll experience

These are the AI video prompts for the immersive scroll-scrub portfolio.

**HOW TO USE THIS FILE**
- For each scene below, copy the **entire fenced code block** (the gray box). Each block is
  fully self-contained — the style and quality instructions are already merged in, so you
  paste ONE block per video, nothing to assemble.
- Generate at 16:9, highest resolution available. Length 8s.
- Save each output with the **filename** noted above its block, then drop it in this
  `public/videos/` folder.
- Also paste the shared **Negative prompt** (very bottom) into the model's negative field.

**TIP for a seamless journey:** take the LAST frame of each clip and feed it as the
first-frame image input for the NEXT clip (image-to-video). Makes the whole scroll feel
like one unbroken shot.

---

## 1 · HERO  →  save as `01-hero-datacenter.mp4`

<!-- 👇 COPY THE WHOLE BLOCK BELOW (this is the hero / first thing visitors see) 👇 -->

```text
A slow cinematic dolly pushing forward down the central aisle of a vast modern data center. Towering black server racks line both sides, their status LEDs blinking in cool blue and white, neat bundled cables. Thin volumetric haze catches cobalt-blue light beams from overhead. A polished reflective floor mirrors the rack lights. The camera glides steadily forward at a slow walking pace, deeper into a seemingly endless corridor of servers, faint god-rays ahead. Cinematic, photorealistic, high detail, dark moody atmosphere, near-black charcoal palette with electric cobalt-blue (#2563EB) accent glow, volumetric fog, soft anamorphic lens flares, subtle film grain, shallow depth of field. One continuous 8-second shot, no cuts, slow steady camera. 16:9. No text, no logos, no UI, no people.
```

---

## 2 · ABOUT  →  save as `02-about-network.mp4`

<!-- 👇 COPY THE WHOLE BLOCK BELOW 👇 -->

```text
The camera emerges from the end of a data-center server aisle and rises into a vast dark void filled with a glowing 3D network of interconnected nodes and thin flowing data lines, an abstract visualization of cloud infrastructure. Pulses of cobalt-blue light travel along delicate wireframe connections between floating nodes. The camera drifts slowly forward and gently upward, nodes parting smoothly around it, fine particles drifting in depth. Cinematic, photorealistic, high detail, dark moody atmosphere, near-black charcoal palette with electric cobalt-blue (#2563EB) accent glow, volumetric fog, soft anamorphic lens flares, subtle film grain, shallow depth of field. One continuous 8-second shot, no cuts, slow steady camera. 16:9. No text, no logos, no UI, no people.
```

---

## 3 · SKILLS  →  save as `03-skills-controlroom.mp4`

<!-- 👇 COPY THE WHOLE BLOCK BELOW 👇 -->

```text
A slow forward glide through a futuristic dark operations control room. Translucent holographic panels and dashboards float in the air showing abstract graphs, waveforms and grid patterns glowing cobalt-blue and white (purely abstract data shapes, no readable text). Faint scan-lines and soft bloom. The camera moves steadily forward between the floating panels as they gently drift and rotate. Reflections on a glossy floor, volumetric haze. Cinematic, photorealistic, high detail, dark moody atmosphere, near-black charcoal palette with electric cobalt-blue (#2563EB) accent glow, volumetric fog, soft anamorphic lens flares, subtle film grain, shallow depth of field. One continuous 8-second shot, no cuts, slow steady camera. 16:9. No text, no logos, no UI, no people.
```

---

## 4 · PROJECTS  →  save as `04-projects-blueprint.mp4`

<!-- 👇 COPY THE WHOLE BLOCK BELOW 👇 -->

```text
A slow forward camera move across a dark plane where glowing cobalt-blue wireframe blueprints and isometric infrastructure diagrams draw themselves line by line, pipelines, servers and architecture schematics assembling in 3D out of light. A fine grid extends to the horizon. As the camera advances, new blueprint structures rise and construct themselves. Precise, technical, dark background with luminous blue lines, soft volumetric glow. Cinematic, photorealistic, high detail, dark moody atmosphere, near-black charcoal palette with electric cobalt-blue (#2563EB) accent glow, volumetric fog, soft anamorphic lens flares, subtle film grain, shallow depth of field. One continuous 8-second shot, no cuts, slow steady camera. 16:9. No text, no logos, no UI, no people.
```

---

## 5 · CERTIFICATIONS  →  save as `05-certs-vault.mp4`

<!-- 👇 COPY THE WHOLE BLOCK BELOW 👇 -->

```text
A slow upward-and-forward drift through a dark cathedral-like space where rows of glowing cobalt-blue rings and medallions of light float in formation, like a constellation of achievements (fully abstract, no text or symbols). Soft particles rise, light beams descend from above, a faint reflective floor far below. The camera ascends gracefully past the glowing rings. Majestic, premium, dark with blue glow. Cinematic, photorealistic, high detail, dark moody atmosphere, near-black charcoal palette with electric cobalt-blue (#2563EB) accent glow, volumetric fog, soft anamorphic lens flares, subtle film grain, shallow depth of field. One continuous 8-second shot, no cuts, slow steady camera. 16:9. No text, no logos, no UI, no people.
```

---

## 6 · CONTACT  →  save as `06-contact-horizon.mp4`

<!-- 👇 COPY THE WHOLE BLOCK BELOW (this is the closing / final scene) 👇 -->

```text
A slow steady camera pull-back revealing a wide night vista: a sleek modern data-center building glowing with cobalt-blue light strips, set against a dark horizon, thin ground mist, a faint star-flecked sky. The camera drifts slowly backward and slightly upward, settling into a calm, conclusive wide establishing shot. Tranquil, cinematic, dark and moody with blue accents. Cinematic, photorealistic, high detail, dark moody atmosphere, near-black charcoal palette with electric cobalt-blue (#2563EB) accent glow, volumetric fog, soft anamorphic lens flares, subtle film grain, shallow depth of field. One continuous 8-second shot, no cuts, slow steady camera. 16:9. No text, no logos, no UI, no people.
```

---

## NEGATIVE PROMPT (paste into the model's "negative prompt" field for ALL clips)

<!-- 👇 COPY THE WHOLE BLOCK BELOW 👇 -->

```text
fast motion, camera shake, hard cuts, jump cuts, text, captions, watermark, logos, people, faces, distorted geometry, flickering, strobing, oversaturated colors, cartoonish
```

---

## Preloader / boot splash — NO VIDEO NEEDED

The intro "boot splash" is built in code (crisp terminal text + a real progress bar).
AI-generated screen text comes out garbled, so don't generate a video for it.

(Optional only) If you want an ambient backdrop behind the coded boot text, you could
generate a silent CRT-glow loop:

```text
A dark room with an old CRT monitor glowing softly, faint horizontal scan-lines, gentle screen flicker, a soft phosphor glow in cobalt-blue, heavy vignette, dust particles in the light. No readable text on screen. Static framing, very subtle motion. Cinematic, photorealistic, dark, moody, film grain. 8-second loop. 16:9. No text, no logos, no people.
```

---

## Notes for the build (handled by Claude — you don't need to do this)

- Drop raw clips here as-is; Claude runs the scrub-optimized encode:
  `ffmpeg -i in.mp4 -vf scale=1920:-2 -c:v libx264 -profile:v high -crf 24 -g 1 -keyint_min 1 -movflags +faststart -an out.mp4`
  (`-g 1` = every frame a keyframe so scroll-seeking is smooth; `-an` strips audio).
- Keep key motion centered — videos get cropped 16:9 → portrait on mobile.
