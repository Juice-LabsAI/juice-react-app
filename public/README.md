# public/

Files here are served at the site root by Vite (e.g. `public/hero.mp4` → `/hero.mp4`).

## Hero video

The homepage hero plays a video when its yellow frame reaches the centre of the
viewport (see `src/app/sections/Hero.tsx`, constant `HERO_VIDEO_SRC`).

**Drop the video here as `hero.mp4`.** Recommendations:

- **Format:** MP4 (H.264) — add a `.webm` too if you want broader/smaller delivery.
- **Muted-friendly:** it autoplays muted (browsers block autoplay with sound).
- **Framing:** the video replaces the framed dashboard image, so export it with the
  same yellow-framed look (and roughly the same ~2.6:1 aspect ratio) for a seamless swap.
- Until `hero.mp4` exists the hero shows the dashboard image (the video `poster`) and the
  scroll-sticky behaviour stays off — no broken state.
