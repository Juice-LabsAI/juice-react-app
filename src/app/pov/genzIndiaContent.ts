/**
 * Gen Z India insights report — content from the approved standalone HTML export
 * (genz-india-insights-report.html), extracted mechanically so the markup and CSS
 * stay faithful to the design that was signed off.
 *
 * Deliberate divergences from that export, all of them reviewed:
 *   1. the inline base64 logo became an asset placeholder (__LOGO_SRC__), resolved
 *      in PovGenzIndia.tsx;
 *   2. the <script> moved into PovGenzIndia.tsx as an effect;
 *   3. the logo is now the tight-cropped vector wordmark, so the `height:` rules
 *      below size the mark rather than the transparent padding the PNG carried;
 *   4. the footer tagline reads "The Brand OS that generates content that
 *      outperforms" (requested 2026-07-28).
 *
 * Regenerating from the source export means re-applying these four.
 */

export const GENZ_CSS = `
:root{
  --night:#0d0b1e;
  --night2:#17123a;
  --panel:#141130;
  --ink:#f5f2ec;
  --dim:#a49bc4;
  --pink:#ff2d95;
  --cyan:#00e5ff;
  --amber:#ffb800;
  --violet:#7c5cfc;
  --line:rgba(255,255,255,0.09);
}
*{margin:0;padding:0;box-sizing:border-box;}
html{scroll-behavior:smooth;}
body{
  background:var(--night);
  color:var(--ink);
  font-family:'Space Grotesk',sans-serif;
  font-size:17px;
  line-height:1.8;
  overflow-x:hidden;
}
::selection{background:var(--pink);color:var(--night);}

/* ---------- scanlines + vignette ---------- */
body::before{
  content:"";position:fixed;inset:0;pointer-events:none;z-index:60;
  background:repeating-linear-gradient(0deg,rgba(255,255,255,0.022) 0 1px,transparent 1px 4px);
}
body::after{
  content:"";position:fixed;inset:0;pointer-events:none;z-index:59;
  background:radial-gradient(ellipse at 50% 10%,transparent 55%,rgba(5,3,15,0.55) 100%);
}

/* ---------- progress track ---------- */
#track{position:fixed;top:0;left:0;height:3px;width:100%;background:rgba(255,255,255,0.06);z-index:100;}
#track .fill{height:100%;width:0;background:linear-gradient(90deg,var(--cyan),var(--pink));box-shadow:0 0 12px var(--pink);transition:width .08s linear;}
#track .loco{position:absolute;top:-9px;font-size:14px;transform:translateX(-50%);filter:drop-shadow(0 0 6px var(--cyan));transition:left .08s linear;}

/* ---------- nav ---------- */
nav{
  position:fixed;top:3px;left:0;right:0;z-index:99;
  display:flex;align-items:center;gap:18px;
  padding:12px 22px;
  background:rgba(13,11,30,0.82);
  backdrop-filter:blur(12px);
  border-bottom:1px solid var(--line);
}
nav .brand{display:flex;align-items:center;gap:10px;text-decoration:none;flex-shrink:0;}
nav .brand img{height:26px;display:block;filter:drop-shadow(0 0 8px rgba(124,92,252,0.8));transition:filter .3s;}
nav .brand:hover img{filter:drop-shadow(0 0 14px rgba(124,92,252,1));}
nav .brand span{font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:var(--dim);}
nav .stations{display:flex;gap:6px;overflow-x:auto;scrollbar-width:none;-ms-overflow-style:none;}
nav .stations::-webkit-scrollbar{display:none;}
nav .stations a{
  font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:0.08em;
  color:var(--dim);text-decoration:none;padding:5px 11px;border:1px solid transparent;border-radius:3px;
  white-space:nowrap;transition:all .2s;
}
nav .stations a:hover{color:var(--cyan);border-color:rgba(0,229,255,0.4);}
nav .stations a.on{color:var(--night);background:var(--cyan);border-color:var(--cyan);box-shadow:0 0 14px rgba(0,229,255,0.5);}
@media(max-width:860px){nav .brand span{display:none;}}

/* ---------- hero ---------- */
header{
  position:relative;min-height:100svh;display:flex;flex-direction:column;justify-content:center;
  padding:130px 24px clamp(180px,26vw,260px);overflow:hidden;
  background:
    radial-gradient(ellipse at 82% 8%,rgba(255,45,149,0.25),transparent 52%),
    radial-gradient(ellipse at 8% 90%,rgba(0,229,255,0.16),transparent 48%),
    radial-gradient(ellipse at 50% 110%,rgba(124,92,252,0.22),transparent 55%),
    linear-gradient(180deg,#0d0b1e 0%,#17123a 100%);
}
.hero-inner{max-width:1040px;margin:0 auto;width:100%;position:relative;}
.skyline{position:absolute;bottom:-2px;left:0;right:0;pointer-events:none;line-height:0;}
.skyline svg{width:100%;height:clamp(150px,22vw,240px);display:block;}
.sk-train{animation:skt 32s linear infinite;}
@keyframes skt{from{transform:translateX(-320px);}to{transform:translateX(1500px);}}
.buffer{width:min(240px,60vw);margin:0 auto 18px;}
.buffer svg{width:100%;display:block;filter:drop-shadow(0 0 10px rgba(255,56,96,0.35));}
.wires{position:absolute;top:86px;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,rgba(0,229,255,0.35) 20%,rgba(0,229,255,0.35) 80%,transparent);pointer-events:none;}
.hero-card-tag{
  display:inline-flex;align-items:center;gap:10px;
  font-family:'IBM Plex Mono',monospace;font-size:12px;letter-spacing:0.28em;text-transform:uppercase;
  color:var(--cyan);border:1px solid rgba(0,229,255,0.5);background:rgba(0,229,255,0.06);
  padding:8px 16px;border-radius:3px;margin-bottom:30px;
  animation:flicker 6s infinite;
}
.hero-card-tag .dot{width:7px;height:7px;border-radius:50%;background:var(--pink);box-shadow:0 0 10px var(--pink);animation:pulse 1.6s infinite;}
h1.glitch{
  font-family:'Rubik Mono One',monospace;
  font-size:clamp(30px,5.6vw,64px);line-height:1.08;color:#fff;
  text-shadow:3px 3px 0 var(--pink),6px 6px 0 rgba(255,45,149,0.3);
  position:relative;cursor:default;user-select:none;
}
h1.glitch.burst{animation:burst .5s steps(2) 3;}
@keyframes burst{
  0%{text-shadow:3px 3px 0 var(--pink),6px 6px 0 rgba(255,45,149,.3);transform:translate(0);}
  25%{text-shadow:-4px 0 0 var(--cyan),4px 0 0 var(--pink);transform:translate(-3px,1px) skewX(-2deg);}
  50%{text-shadow:4px -2px 0 var(--amber),-4px 2px 0 var(--cyan);transform:translate(3px,-1px) skewX(2deg);}
  100%{text-shadow:3px 3px 0 var(--pink),6px 6px 0 rgba(255,45,149,.3);transform:translate(0);}
}
.hero-dev{
  font-family:'Tiro Devanagari Hindi',serif;color:var(--amber);
  font-size:clamp(17px,2.4vw,25px);margin-top:20px;
  text-shadow:0 0 18px rgba(255,184,0,0.65);
}
.hero-sub{
  font-size:clamp(16px,1.9vw,21px);color:var(--ink);margin-top:10px;max-width:640px;font-weight:500;
}
.hero-brief{
  font-family:'IBM Plex Mono',monospace;font-size:13px;color:var(--dim);letter-spacing:0.14em;text-transform:uppercase;margin-top:8px;
}
.hero-by{
  margin-top:40px;display:inline-flex;align-items:center;gap:16px;
  border:1px solid rgba(124,92,252,0.55);background:rgba(124,92,252,0.09);
  padding:14px 22px;border-radius:5px;text-decoration:none;
  box-shadow:0 0 24px rgba(124,92,252,0.18);
  transition:box-shadow .25s,transform .25s;
}
.hero-by:hover{box-shadow:0 0 40px rgba(124,92,252,0.4);transform:translateY(-2px);}
.hero-by img{height:34px;display:block;}
.hero-by .t{font-family:'IBM Plex Mono',monospace;font-size:12px;line-height:1.5;color:var(--ink);letter-spacing:0.05em;}
.hero-by .t b{color:#b9a7ff;}
.hero-stats{display:flex;gap:14px;margin-top:44px;flex-wrap:wrap;}
.stat-card{
  border:1px solid rgba(0,229,255,0.5);background:rgba(0,229,255,0.05);
  padding:14px 20px;border-radius:4px;font-family:'IBM Plex Mono',monospace;font-size:12px;color:#bff7ff;
  transition:transform .2s,box-shadow .2s;cursor:default;
}
.stat-card:hover{transform:translateY(-3px);box-shadow:0 0 22px rgba(0,229,255,0.35);}
.stat-card b{display:block;font-size:24px;color:var(--pink);font-family:'Rubik Mono One',monospace;text-shadow:0 0 12px rgba(255,45,149,0.7);}
.scroll-cue{
  z-index:5;text-shadow:0 2px 8px #080614;
  position:absolute;bottom:26px;left:50%;transform:translateX(-50%);
  font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:0.3em;color:var(--dim);text-transform:uppercase;
  animation:bob 2.2s ease-in-out infinite;
}
@keyframes bob{0%,100%{transform:translate(-50%,0);}50%{transform:translate(-50%,8px);}}
@keyframes pulse{0%,100%{opacity:1;}50%{opacity:.35;}}
@keyframes flicker{
  0%,93%,100%{opacity:1;}94%{opacity:.55;}95%{opacity:1;}97%{opacity:.7;}98%{opacity:1;}
}

/* ---------- sections ---------- */
main{max-width:840px;margin:0 auto;padding:0 24px;}
section{padding:90px 0 30px;}
.station{
  display:flex;align-items:center;gap:18px;margin-bottom:14px;
}
.station .badge{
  font-family:'Rubik Mono One',monospace;font-size:13px;color:var(--night);
  background:var(--amber);padding:7px 12px;border-radius:3px;
  box-shadow:0 0 18px rgba(255,184,0,0.5);white-space:nowrap;
}
.station .rail{flex:1;height:2px;background:linear-gradient(90deg,var(--amber),transparent);}
.station .dev{font-family:'Tiro Devanagari Hindi',serif;font-size:14px;color:var(--dim);white-space:nowrap;}
h2{
  font-family:'Rubik Mono One',monospace;font-size:clamp(22px,3.4vw,36px);line-height:1.2;color:#fff;
  text-shadow:2px 2px 0 var(--pink);margin-bottom:8px;
}
h2 .neon{color:var(--cyan);text-shadow:0 0 16px rgba(0,229,255,0.8),2px 2px 0 rgba(255,45,149,0.7);}
.kicker{
  font-family:'IBM Plex Mono',monospace;font-size:12px;letter-spacing:0.22em;text-transform:uppercase;color:var(--cyan);margin-bottom:26px;
}
h3{
  font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:21px;color:var(--amber);
  margin:46px 0 14px;line-height:1.35;
}
section > h3{padding-left:14px;border-left:3px solid var(--pink);}
p{margin-bottom:20px;color:#e7e2f4;}
p b,p strong{color:#fff;}
.hl-pink{color:var(--pink);font-weight:600;text-shadow:0 0 10px rgba(255,45,149,0.5);}
.hl-cyan{color:var(--cyan);font-weight:600;text-shadow:0 0 10px rgba(0,229,255,0.5);}
.hl-amber{color:var(--amber);font-weight:600;text-shadow:0 0 10px rgba(255,184,0,0.5);}
.src{font-family:'IBM Plex Mono',monospace;font-size:11.5px;color:var(--dim);background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);padding:2px 9px;border-radius:20px;}

/* announcement board pull-quote */
.board{
  margin:34px 0;padding:26px 30px;position:relative;
  background:linear-gradient(180deg,rgba(23,18,58,0.9),rgba(13,11,30,0.9));
  border:1px solid rgba(255,45,149,0.55);border-radius:6px;
  box-shadow:0 0 30px rgba(255,45,149,0.12), inset 0 0 40px rgba(255,45,149,0.05);
}
.board::before{
  content:"◉ ANNOUNCEMENT";position:absolute;top:-11px;left:18px;
  font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:0.25em;color:var(--pink);
  background:var(--night);padding:2px 10px;
}
.board p{
  font-size:clamp(17px,2.2vw,22px);font-weight:600;color:#fff;line-height:1.5;margin:0;
}
.board p + p{margin-top:12px;}
.board.cyan{border-color:rgba(0,229,255,0.55);box-shadow:0 0 30px rgba(0,229,255,0.12),inset 0 0 40px rgba(0,229,255,0.05);}
.board.cyan::before{content:"◉ SIGNAL";color:var(--cyan);}
.board.amber{border-color:rgba(255,184,0,0.55);box-shadow:0 0 30px rgba(255,184,0,0.12),inset 0 0 40px rgba(255,184,0,0.05);}
.board.amber::before{content:"◉ PLATFORM NOTICE";color:var(--amber);}

/* subculture cards */
.subgrid{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin:30px 0 10px;}
@media(max-width:720px){.subgrid{grid-template-columns:1fr;}}
.subcard{
  border:1px solid var(--line);border-top:3px solid var(--c,var(--cyan));
  background:var(--panel);border-radius:6px;padding:24px 24px 12px;
  transition:transform .25s,box-shadow .25s;
}
.subcard:hover{transform:translateY(-4px);box-shadow:0 8px 32px rgba(0,0,0,0.5),0 0 24px color-mix(in srgb,var(--c,var(--cyan)) 25%,transparent);}
.subcard h3{margin:0 0 10px;color:var(--c,var(--cyan));font-size:19px;}
.subcard p{font-size:15.5px;}
.subcard .tag{font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:var(--dim);display:block;margin-bottom:8px;}

/* paradox cards */
.paradox{
  margin:28px 0;border:1px solid var(--line);border-radius:6px;overflow:hidden;background:var(--panel);
}
.paradox .head{
  display:flex;align-items:stretch;font-family:'Rubik Mono One',monospace;font-size:14px;
}
.paradox .head .a{flex:1;padding:14px 18px;background:rgba(0,229,255,0.1);color:var(--cyan);border-right:1px dashed rgba(255,255,255,0.2);}
.paradox .head .b{flex:1;padding:14px 18px;background:rgba(255,45,149,0.1);color:var(--pink);text-align:right;}
.paradox .body{padding:20px 24px 6px;}
.paradox .body p{font-size:15.5px;}

/* case studies */
.case{
  margin:28px 0;border:1px solid var(--line);border-left:4px solid var(--sig,#ff3860);
  background:var(--panel);border-radius:6px;padding:24px 26px 10px;position:relative;
  transition:box-shadow .25s;
}
.case:hover{box-shadow:0 0 26px color-mix(in srgb,var(--sig,#ff3860) 22%,transparent);}
.case .sig{
  position:absolute;top:22px;right:20px;font-family:'IBM Plex Mono',monospace;font-size:10px;
  letter-spacing:0.2em;color:var(--sig,#ff3860);text-transform:uppercase;
  display:flex;align-items:center;gap:6px;
}
.case .sig::before{content:"";width:8px;height:8px;border-radius:50%;background:var(--sig,#ff3860);box-shadow:0 0 10px var(--sig,#ff3860);animation:pulse 2s infinite;}
.case h3{margin:0 46px 10px 0;color:#fff;font-size:19px;}
.case p{font-size:16px;}
.case.ok{--sig:#2eff8f;}

/* trust moves */
.move{
  margin:34px 0;border:1px solid rgba(0,229,255,0.35);background:rgba(0,229,255,0.03);
  border-radius:6px;padding:26px 28px 10px;
}
.move h3{
  margin:0 0 14px;color:var(--cyan);font-family:'Rubik Mono One',monospace;font-size:17px;line-height:1.4;
  text-shadow:0 0 12px rgba(0,229,255,0.5);
}
.move p{font-size:16px;}

/* sources table */
.depart{
  width:100%;border-collapse:collapse;margin:26px 0 10px;font-family:'IBM Plex Mono',monospace;font-size:12.5px;
  border:1px solid rgba(255,184,0,0.4);
}
.depart caption{
  caption-side:top;text-align:left;font-family:'Rubik Mono One',monospace;font-size:13px;color:var(--amber);
  padding:10px 14px;background:rgba(255,184,0,0.1);border:1px solid rgba(255,184,0,0.4);border-bottom:none;
  letter-spacing:0.1em;
}
.depart th{
  text-align:left;padding:10px 14px;color:var(--amber);letter-spacing:0.15em;text-transform:uppercase;font-size:10.5px;
  border-bottom:1px solid rgba(255,184,0,0.4);background:rgba(255,184,0,0.05);
}
.depart td{padding:10px 14px;border-bottom:1px solid rgba(255,255,255,0.07);color:#d9d3ea;vertical-align:top;}
.depart tr:hover td{background:rgba(0,229,255,0.05);color:#fff;}
@media(max-width:720px){.depart{font-size:11px;}.depart th,.depart td{padding:8px 8px;}}

/* prologue special */
.prologue-open{
  font-size:clamp(18px,2.3vw,23px);line-height:1.65;color:#fff;font-weight:500;
}
.prologue-open::first-letter{
  font-family:'Rubik Mono One',monospace;font-size:3.1em;float:left;line-height:0.85;
  margin:8px 16px 0 0;color:var(--cyan);text-shadow:3px 3px 0 var(--pink);
}

/* spot illustrations */
.spot{
  float:right;width:150px;height:150px;margin:6px 0 20px 28px;
  border:1px solid var(--line);border-radius:12px;
  background:radial-gradient(circle at 50% 38%,rgba(124,92,252,0.16),rgba(13,11,30,0.65) 78%);
  box-shadow:inset 0 0 30px rgba(0,0,0,0.45);
  padding:14px;
}
.spot svg{width:100%;height:100%;display:block;overflow:visible;fill:none;stroke-linecap:round;stroke-linejoin:round;}
.spot .gc{filter:drop-shadow(0 0 4px rgba(0,229,255,0.85));}
.spot .gp{filter:drop-shadow(0 0 4px rgba(255,45,149,0.85));}
.spot .ga{filter:drop-shadow(0 0 4px rgba(255,184,0,0.85));}
.spot--center{float:none;margin:0 auto 28px;}
.board,.subgrid,.paradox,.case,.move{clear:both;}
@media(max-width:640px){.spot{float:none;margin:0 auto 26px;}}

.subcard .ic{width:32px;height:32px;color:var(--c);margin:2px 0 10px;display:block;}

/* reveal */
.rv{opacity:0;transform:translateY(26px);transition:opacity .7s ease,transform .7s ease;}
.rv.in{opacity:1;transform:none;}

/* divider between sections: track */
.trackline{
  max-width:880px;margin:50px auto 0;padding:0 24px;display:flex;align-items:center;gap:0;
}
.trackline .l{flex:1;height:2px;background:repeating-linear-gradient(90deg,rgba(255,255,255,0.18) 0 14px,transparent 14px 22px);}
.trackline .st{width:10px;height:10px;border-radius:50%;border:2px solid var(--cyan);box-shadow:0 0 10px rgba(0,229,255,0.6);margin:0 10px;}

/* footer */
footer{
  margin-top:100px;border-top:1px solid var(--line);
  background:linear-gradient(180deg,#0d0b1e,#080614);
  padding:70px 24px 46px;position:relative;overflow:hidden;
}
.foot-inner{max-width:880px;margin:0 auto;text-align:center;}
.endsign{
  display:inline-block;font-family:'Rubik Mono One',monospace;font-size:clamp(20px,3vw,30px);color:var(--night);
  background:var(--amber);padding:12px 30px;border-radius:4px;
  box-shadow:0 0 34px rgba(255,184,0,0.55);letter-spacing:0.06em;
}
.endsign-dev{font-family:'Tiro Devanagari Hindi',serif;color:var(--amber);margin-top:12px;font-size:16px;}
.foot-by{
  margin:40px auto 0;display:inline-flex;align-items:center;gap:16px;
  border:1px solid rgba(124,92,252,0.55);background:rgba(124,92,252,0.08);
  padding:16px 26px;border-radius:6px;text-decoration:none;
  transition:box-shadow .25s,transform .25s;
}
.foot-by:hover{box-shadow:0 0 34px rgba(124,92,252,0.4);transform:translateY(-2px);}
.foot-by img{height:36px;}
.foot-by .t{text-align:left;font-family:'IBM Plex Mono',monospace;font-size:12px;line-height:1.6;color:var(--ink);}
.foot-by .t b{color:#b9a7ff;}
.foot-note{
  margin-top:34px;font-family:'IBM Plex Mono',monospace;font-size:11px;color:var(--dim);letter-spacing:0.1em;line-height:2;
}
.foot-note a{color:#b9a7ff;text-decoration:none;}
.foot-note a:hover{color:var(--cyan);}
#hornBtn{background:none;border:none;font-size:20px;cursor:pointer;filter:drop-shadow(0 0 6px var(--cyan));transition:transform .2s;}
#hornBtn:hover{transform:scale(1.3) rotate(-6deg);}

/* easter egg widgets */
#eggToast{
  position:fixed;bottom:28px;left:50%;transform:translate(-50%,80px);z-index:200;
  font-family:'IBM Plex Mono',monospace;font-size:13px;color:var(--night);
  background:var(--cyan);padding:12px 22px;border-radius:4px;box-shadow:0 0 30px rgba(0,229,255,0.7);
  opacity:0;transition:all .4s cubic-bezier(.2,.9,.3,1.2);pointer-events:none;white-space:nowrap;max-width:92vw;
}
#eggToast.show{opacity:1;transform:translate(-50%,0);}
#train{
  position:fixed;bottom:8vh;left:-340px;z-index:150;font-size:30px;letter-spacing:-4px;pointer-events:none;
  filter:drop-shadow(0 0 12px var(--cyan));white-space:nowrap;
}
#train.go{animation:trainrun 4.2s linear forwards;}
@keyframes trainrun{from{transform:translateX(0);}to{transform:translateX(calc(100vw + 700px));}}
#papdi{position:fixed;z-index:150;font-size:26px;pointer-events:none;display:none;filter:drop-shadow(0 0 10px var(--amber));}
#papdi.fly{display:block;animation:papdifly 1.8s ease-in forwards;}
@keyframes papdifly{
  0%{transform:translate(0,0) rotate(0deg);opacity:1;}
  100%{transform:translate(46vw,-70vh) rotate(720deg);opacity:0;}
}
.egg-word{cursor:pointer;border-bottom:1px dashed rgba(255,184,0,0.6);}
.egg-word:hover{color:var(--amber);}

/* max neon mode */
body.maxneon .board,body.maxneon .stat-card,body.maxneon .subcard,body.maxneon .case,body.maxneon .move{
  box-shadow:0 0 46px rgba(255,45,149,0.28),0 0 26px rgba(0,229,255,0.22)!important;
}
body.maxneon h2{text-shadow:3px 3px 0 var(--pink),0 0 26px rgba(0,229,255,0.9);}
body.maxneon::before{background:repeating-linear-gradient(0deg,rgba(0,229,255,0.05) 0 1px,transparent 1px 4px);}

@media (prefers-reduced-motion: reduce){
  *,*::before,*::after{animation:none!important;transition:none!important;}
  html{scroll-behavior:auto;}
  .rv{opacity:1;transform:none;}
}
`;

export const GENZ_MARKUP = `

<div id="track"><div class="fill"></div><div class="loco">🚈</div></div>

<nav aria-label="Report stations">
  <a class="brand" href="https://www.juicelabs.ai" target="_blank" rel="noopener">
    <img src="__LOGO_SRC__" alt="Juice AI">
    <span>juicelabs.ai</span>
  </a>
  <div class="stations">
    <a href="#prologue">00 Prologue</a>
    <a href="#part1">01 Origins</a>
    <a href="#part2">02 Behaviours</a>
    <a href="#part3">03 Subcultures</a>
    <a href="#part4">04 Paradoxes</a>
    <a href="#part5">05 Wallet</a>
    <a href="#part6">06 Wrong</a>
    <a href="#part7">07 Trust</a>
    <a href="#sources">∎ Sources</a>
  </div>
</nav>

<!-- ================= HERO ================= -->
<header>
  <div class="wires"></div>
  <div class="hero-inner">
    <div class="hero-card-tag"><span class="dot"></span> INSIGHTS REPORT · GEN Z INDIA</div>
    <h1 class="glitch" id="heroTitle">THE FIRST GENERATION THAT DOESN'T NEED YOU</h1>
    <div class="hero-dev">नई पीढ़ी · अपने रूल्स</div>
    <p class="hero-sub">Understanding the Mind &amp; Wallet of Gen Z India</p>
    <p class="hero-brief">A briefing for brand marketers</p>

    <a class="hero-by" href="https://www.juicelabs.ai" target="_blank" rel="noopener">
      <img src="__LOGO_SRC__" alt="Juice AI logo">
      <span class="t">A report by <b>Juice AI</b><br>www.juicelabs.ai</span>
    </a>

    <div class="hero-stats">
      <div class="stat-card"><b>$860B</b>total spending impact</div>
      <div class="stat-card"><b>66%</b>of gamers beyond metros</div>
      <div class="stat-card"><b>40%</b>of NSE investors under 30</div>
      <div class="stat-card"><b>87%</b>identify as fans of something</div>
    </div>
  </div>
  <div class="skyline" aria-hidden="true">
  <svg viewBox="0 0 1440 240" preserveAspectRatio="xMidYMax slice" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="win" width="10" height="14" patternUnits="userSpaceOnUse">
        <rect x="2" y="3" width="3.5" height="5" fill="rgba(255,184,0,0.5)"/>
      </pattern>
      <pattern id="win2" width="12" height="16" patternUnits="userSpaceOnUse">
        <rect x="3" y="4" width="4" height="6" fill="rgba(0,229,255,0.38)"/>
      </pattern>
      <linearGradient id="bld" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#151038"/><stop offset="1" stop-color="#0a0820"/>
      </linearGradient>
    </defs>
    <circle cx="150" cy="46" r="22" fill="#f5f2ec" opacity="0.85"/>
    <circle cx="159" cy="41" r="20" fill="#17123a"/>
    <g opacity="0.55">
      <rect x="40" y="120" width="52" height="120" fill="#120e30"/>
      <rect x="120" y="100" width="44" height="140" fill="#120e30"/>
      <rect x="300" y="128" width="60" height="112" fill="#120e30"/>
      <rect x="520" y="110" width="46" height="130" fill="#120e30"/>
      <rect x="900" y="118" width="58" height="122" fill="#120e30"/>
      <rect x="1090" y="98" width="44" height="142" fill="#120e30"/>
      <rect x="1330" y="122" width="70" height="118" fill="#120e30"/>
    </g>
    <g stroke="#00e5ff" stroke-width="2" opacity="0.7">
      <line x1="640" y1="58" x2="640" y2="198"/>
      <line x1="820" y1="58" x2="820" y2="198"/>
      <g stroke-width="1" opacity="0.85">
        <line x1="640" y1="64" x2="560" y2="176"/><line x1="640" y1="64" x2="592" y2="176"/><line x1="640" y1="64" x2="620" y2="176"/>
        <line x1="640" y1="64" x2="688" y2="176"/><line x1="640" y1="64" x2="718" y2="176"/>
        <line x1="820" y1="64" x2="742" y2="176"/><line x1="820" y1="64" x2="772" y2="176"/>
        <line x1="820" y1="64" x2="848" y2="176"/><line x1="820" y1="64" x2="878" y2="176"/><line x1="820" y1="64" x2="900" y2="176"/>
      </g>
      <line x1="520" y1="176" x2="940" y2="176" stroke-width="3"/>
    </g>
    <g>
      <rect x="0" y="96" width="70" height="144" fill="url(#bld)"/><rect x="0" y="96" width="70" height="144" fill="url(#win)"/>
      <rect x="86" y="70" width="64" height="170" fill="url(#bld)"/><rect x="86" y="70" width="64" height="170" fill="url(#win2)"/>
      <rect x="170" y="112" width="80" height="128" fill="url(#bld)"/><rect x="170" y="112" width="80" height="128" fill="url(#win)"/>
      <rect x="268" y="84" width="56" height="156" fill="url(#bld)"/><rect x="268" y="84" width="56" height="156" fill="url(#win2)"/>
      <rect x="360" y="122" width="88" height="118" fill="url(#bld)"/><rect x="360" y="122" width="88" height="118" fill="url(#win)"/>
      <rect x="980" y="88" width="66" height="152" fill="url(#bld)"/><rect x="980" y="88" width="66" height="152" fill="url(#win)"/>
      <rect x="1064" y="116" width="84" height="124" fill="url(#bld)"/><rect x="1064" y="116" width="84" height="124" fill="url(#win2)"/>
      <rect x="1166" y="76" width="60" height="164" fill="url(#bld)"/><rect x="1166" y="76" width="60" height="164" fill="url(#win)"/>
      <rect x="1244" y="104" width="72" height="136" fill="url(#bld)"/><rect x="1244" y="104" width="72" height="136" fill="url(#win2)"/>
      <rect x="1370" y="90" width="70" height="150" fill="url(#bld)"/><rect x="1370" y="90" width="70" height="150" fill="url(#win)"/>
    </g>
    <rect x="96" y="82" width="40" height="12" rx="2" fill="none" stroke="#ff2d95" stroke-width="2" opacity="0.9"/>
    <rect x="1180" y="88" width="34" height="12" rx="2" fill="none" stroke="#00e5ff" stroke-width="2" opacity="0.9"/>
    <rect x="386" y="132" width="30" height="10" rx="2" fill="none" stroke="#ffb800" stroke-width="2" opacity="0.9"/>
    <rect x="0" y="196" width="1440" height="6" fill="#1d1746"/>
    <g fill="#241c58">
      <rect x="60" y="202" width="10" height="38"/><rect x="260" y="202" width="10" height="38"/>
      <rect x="460" y="202" width="10" height="38"/><rect x="660" y="202" width="10" height="38"/>
      <rect x="860" y="202" width="10" height="38"/><rect x="1060" y="202" width="10" height="38"/>
      <rect x="1260" y="202" width="10" height="38"/>
    </g>
    <line x1="0" y1="196" x2="1440" y2="196" stroke="#00e5ff" stroke-width="1.5" opacity="0.6"/>
    <g class="sk-train">
      <rect x="0" y="168" width="260" height="28" rx="7" fill="#1a1440" stroke="#ff2d95" stroke-width="2"/>
      <g fill="rgba(255,184,0,0.85)">
        <rect x="12" y="175" width="16" height="11" rx="2"/><rect x="36" y="175" width="16" height="11" rx="2"/>
        <rect x="60" y="175" width="16" height="11" rx="2"/><rect x="84" y="175" width="16" height="11" rx="2"/>
        <rect x="108" y="175" width="16" height="11" rx="2"/><rect x="132" y="175" width="16" height="11" rx="2"/>
        <rect x="156" y="175" width="16" height="11" rx="2"/><rect x="180" y="175" width="16" height="11" rx="2"/>
        <rect x="204" y="175" width="16" height="11" rx="2"/><rect x="228" y="175" width="16" height="11" rx="2"/>
      </g>
      <circle cx="258" cy="182" r="4" fill="#f5f2ec"/>
      <path d="M262 182 L302 173 L302 191 Z" fill="rgba(245,242,236,0.16)"/>
    </g>
    <rect x="0" y="236" width="1440" height="4" fill="#080614"/>
  </svg>
</div>
  <div class="scroll-cue">▼ Board the line</div>
</header>

<main>

<!-- ================= PROLOGUE ================= -->
<section id="prologue">
  <div class="station rv"><span class="badge">PLATFORM 00</span><span class="rail"></span><span class="dev">प्रस्तावना</span></div>
  <h2 class="rv">PRO<span class="neon">LOGUE</span></h2>
  <div class="kicker rv">Why would they let you in?</div>
  <div class="spot rv" aria-hidden="true"><svg viewBox="0 0 100 100">
    <rect x="26" y="16" width="46" height="68" rx="2" stroke="#00e5ff" stroke-width="3" class="gc"/>
    <path d="M38 22 L64 16 L64 84 L38 78 Z" stroke="#ff2d95" stroke-width="3" fill="rgba(255,45,149,0.08)" class="gp"/>
    <circle cx="44" cy="51" r="2.5" fill="#ffb800" class="ga"/>
    <g stroke="#ffb800" stroke-width="2.5" opacity="0.85" class="ga">
      <line x1="66" y1="30" x2="88" y2="23"/><line x1="66" y1="50" x2="92" y2="50"/><line x1="66" y1="70" x2="88" y2="77"/>
    </g>
  </svg></div>
  <p class="prologue-open rv">The previous generation needed brands to tell them who they were. Brands owned aspiration — they defined what cool looked like, what adulthood required, what success smelled like. Gen Z India arrived to find the internet had already done that job, through subcultures, fandoms, creators, and meme ecosystems that are more culturally authoritative than any campaign ever was.</p>
  <div class="board rv"><p>The scramble to reach them is understandable. The more interesting question is: why would they let you in?</p></div>
</section>

<div class="trackline rv"><div class="l"></div><div class="st"></div><div class="l"></div></div>

<!-- ================= PART ONE ================= -->
<section id="part1">
  <div class="station rv"><span class="badge">STATION 01</span><span class="rail"></span><span class="dev">स्टेशन ०१</span></div>
  <h2 class="rv">PART ONE: HOW THEY WERE <span class="neon">MADE</span></h2>
  <div class="kicker rv">Not younger millennials. A different formation entirely.</div>
  <div class="spot rv" aria-hidden="true"><svg viewBox="0 0 100 100">
    <rect x="24" y="16" width="52" height="9" stroke="#00e5ff" stroke-width="3" class="gc"/>
    <rect x="24" y="75" width="52" height="9" stroke="#00e5ff" stroke-width="3" class="gc"/>
    <g stroke="#00e5ff" stroke-width="2.5" opacity="0.8" class="gc">
      <line x1="34" y1="25" x2="34" y2="75"/><line x1="50" y1="25" x2="50" y2="75"/><line x1="66" y1="25" x2="66" y2="75"/>
    </g>
    <polyline points="28,38 46,44 38,54 58,58 50,70" stroke="#ff2d95" stroke-width="3" class="gp"/>
    <g fill="#ffb800" class="ga">
      <circle cx="46" cy="44" r="2"/><circle cx="58" cy="58" r="2"/>
    </g>
  </svg></div>

  <p class="rv">You can't market to a generation you haven't understood historically. Gen Z India is not a younger millennial with a shorter attention span. They are a different formation entirely.</p>

  <h3 class="rv">The institutions failed them first.</h3>
  <p class="rv">Demonetization disrupted their parents without warning. COVID stole their adolescence. The NEET paper leak — where <span class="hl-pink">67 students scored a perfect 720</span> in an exam taken by <span class="hl-cyan">2.4 million</span>, later traced to an organised criminal network — told them that even the meritocracy was rigged. Not a political institution. The examination system. The thing that was supposed to be neutral. This cohort's foundational relationship with institutions is not cynicism. It is pattern recognition built from lived evidence.</p>

  <h3 class="rv">Then they watched the millennials.</h3>
  <p class="rv">Did everything right — the engineering degree, the 12-hour days, the startup hustle, the EMI. Got economically squeezed anyway. Burned out anyway. When a prominent industrialist publicly advocated a 70-hour workweek, the response from Gen Z wasn't debate. It was definitional. They named what they were against.</p>
  <p class="rv">The rejection of the corporate grind is not the rejection of drive. It is the reassignment of it.</p>
  <div class="board rv"><p>This generation will work fourteen hours on their own project. They won't work eight on yours without the right terms.</p></div>

  <h3 class="rv">The India-Bharat convergence</h3>
  <p class="rv">The India-Bharat convergence is the structural fact most brand strategies still haven't absorbed. A young woman in Indore and one in Indiranagar are navigating the same K-beauty ingredient vocabulary, the same Indo-futurist streetwear references, the same Hinglish internet slang — often consuming the same creators. <span class="hl-cyan">66% of India's 591 million active gamers come from outside metro cities.</span> <span class="src">(Lumikai × Google, FY24)</span> The aesthetic codes are shared even when the purchasing power isn't. Brands still designing for one and calling it a national strategy are making a category error that compounds every year.</p>
</section>

<div class="trackline rv"><div class="l"></div><div class="st"></div><div class="l"></div></div>

<!-- ================= PART TWO ================= -->
<section id="part2">
  <div class="station rv"><span class="badge">STATION 02</span><span class="rail"></span><span class="dev">स्टेशन ०२</span></div>
  <h2 class="rv">PART TWO: EMERGING BEHAVIOURS WORTH <span class="neon">WATCHING</span></h2>
  <div class="kicker rv">Stricter filters, not shorter attention spans.</div>
  <div class="spot rv" aria-hidden="true"><svg viewBox="0 0 100 100">
    <rect x="30" y="12" width="40" height="76" rx="8" stroke="#00e5ff" stroke-width="3" class="gc"/>
    <line x1="44" y1="19" x2="56" y2="19" stroke="#00e5ff" stroke-width="2.5" class="gc"/>
    <rect x="37" y="30" width="20" height="12" rx="4" stroke="#ff2d95" stroke-width="3" class="gp"/>
    <rect x="45" y="48" width="18" height="12" rx="4" stroke="#ffb800" stroke-width="3" class="ga"/>
    <rect x="37" y="66" width="15" height="11" rx="4" stroke="#00e5ff" stroke-width="3" class="gc"/>
    <path d="M78 30 L92 38 L78 46 Z" stroke="#ff2d95" stroke-width="3" class="gp"/>
  </svg></div>

  <h3 class="rv">Short-form is the audition. Long-form is what earns the relationship.</h3>
  <p class="rv">The common diagnosis — Gen Z can't focus — misses the actual mechanism. They don't have shorter attention spans. They have stricter filters. A 15-second Reel and a 3-hour live stream are not in competition. The short form screens at speed; if something passes the filter, they will give it hours. The creators who understand this — running a two-hour podcast that gets atomised into twenty Reels, each funnelling back to the full episode — are building the deepest audience loyalty in India's media market. Brands that think short-form is the strategy have only understood the door. They haven't thought about what's inside.</p>

  <h3 class="rv">Dark social is where real influence actually lives.</h3>
  <p class="rv"><span class="hl-pink">78% of Gen Z share personal life updates exclusively through Close Friends lists, WhatsApp groups, and private DMs</span> — not the public grid. <span class="src">(ET Snapchat Gen Z Index)</span> The manicured Instagram profile is increasingly a professional surface. The actual self — including actual purchase recommendations — lives in a WhatsApp group of seven people who trust each other completely.</p>
  <div class="board rv"><p>The most powerful purchase recommendation in India right now isn't a creator's Reel. It's a message in a six-person chat.</p></div>

  <h3 class="rv">They are SIP-ing while Coldplay-ing.</h3>
  <p class="rv">The same 23-year-old spending ₹15,000 on a concert ticket has an automated SIP running from their first paycheck. <span class="hl-cyan">40% of NSE's registered investors are now under 30.</span> <span class="src">(NSE, August 2024)</span> The logic is coherent: automate the long-term, guilt-free the rest. The financial brands and FMCG companies that still talk to young Indians as if they're financially reckless are describing a generation that no longer exists.</p>

  <h3 class="rv">The government job is back — quietly.</h3>
  <p class="rv">The dominant narrative says Gen Z wants to be founders and creators. True for a vocal segment. But <span class="hl-amber">21% are actively leaning toward government and PSU jobs.</span> <span class="src">(ET Snapchat Gen Z Index)</span> Not because the dream died, but because stability, after watching multiple rounds of startup layoffs, looks different than it used to. This isn't resignation. It is portfolio thinking applied to career risk — the same logic they apply to money.</p>

  <h3 class="rv">Offline is the new status move.</h3>
  <p class="rv">In Bengaluru, Pune, and Delhi, a generation raised on apps is deliberately building life outside them. Stranger potlucks in public parks. Silent book clubs. Run clubs that are really about finding people. Curated meetup platforms like Playace and Sabha offering social experience without the transactional pressure of dating apps. Arriving solo to a live event is no longer awkward — it now signals independence and intention. BookMyShow saw a significant surge in solo ticket purchases in 2024.</p>
  <div class="board cyan rv"><p>The loneliness is real. So is the organised, creative response to it. The brand that creates genuine physical community space earns something no digital activation can replicate.</p></div>

  <h3 class="rv">Reverse parenting is reshaping the household economy.</h3>
  <p class="rv"><span class="hl-pink">$660 billion of Gen Z's total $860 billion spending impact is influenced spend</span> — household decisions they architect without funding. <span class="src">(BCG × Snap, 2024)</span> But the dynamic runs deeper than electronics and car choices. Gen Z is now the digital literacy layer for their parents — the one who vetted the insurance policy, chose the OTT subscription, picked the mutual fund app. They are simultaneously dependents and the most trusted advisor in the house.</p>
  <div class="board rv"><p>Any brand targeting adults while ignoring the 22-year-old who shaped the consideration set is marketing to the signature, not the decision.</p></div>
</section>

<div class="trackline rv"><div class="l"></div><div class="st"></div><div class="l"></div></div>

<!-- ================= PART THREE ================= -->
<section id="part3">
  <div class="station rv"><span class="badge">STATION 03</span><span class="rail"></span><span class="dev">स्टेशन ०३</span></div>
  <h2 class="rv">PART THREE: SUBCULTURES — A PARTIAL <span class="neon">MAP</span></h2>
  <div class="kicker rv">New ones form faster than any framework can contain them.</div>
  <div class="spot rv" aria-hidden="true"><svg viewBox="0 0 100 100">
    <polyline points="12,80 38,52 62,52 88,24" stroke="#00e5ff" stroke-width="3" class="gc"/>
    <polyline points="12,28 36,28 66,72 88,72" stroke="#ff2d95" stroke-width="3" class="gp"/>
    <line x1="12" y1="50" x2="88" y2="50" stroke="#ffb800" stroke-width="3" class="ga"/>
    <g fill="#0d0b1e">
      <circle cx="38" cy="52" r="5" stroke="#00e5ff" stroke-width="3" class="gc"/>
      <circle cx="36" cy="28" r="5" stroke="#ff2d95" stroke-width="3" class="gp"/>
      <circle cx="66" cy="72" r="5" stroke="#ff2d95" stroke-width="3" class="gp"/>
      <circle cx="50" cy="50" r="5" stroke="#ffb800" stroke-width="3" class="ga"/>
      <circle cx="88" cy="24" r="5" stroke="#00e5ff" stroke-width="3" class="gc"/>
    </g>
  </svg></div>

  <p class="rv">What follows is not a taxonomy. These are some of the subcultures currently producing real cultural and commercial energy. There are dozens more, and new ones form faster than any framework can contain them.</p>

  <div class="subgrid">
    <div class="subcard rv" style="--c:#8ef0d2">
      <span class="tag">Line 3A</span><svg class="ic" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21 C5 16 6 7 12 3 C18 7 19 16 12 21 Z"/><path d="M12 6 V18"/><path d="M12 12 C9 11 8 9 8 8 M12 15 C15 14 16 12 16 11"/></svg>
      <h3>The Soft Life Cohort</h3>
      <p>A principled repositioning of rest as power, not laziness. Slow mornings, journaling as non-negotiable, therapy as hygiene rather than emergency. Their purchases signal <i>I have chosen my own pace</i>. Weighted blankets. Ayurvedic wellness. Noise-cancelling headphones. The brands that reach them don't sell products — they sell permission.</p>
    </div>
    <div class="subcard rv" style="--c:#d8b26a">
      <span class="tag">Line 3B</span><svg class="ic" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 5 C8 3 11 4 12 6 C13 4 16 3 20 5 V19 C16 17 13 18 12 20 C11 18 8 17 4 19 Z"/><path d="M12 6 V20"/></svg>
      <h3>Desi Dark Academia</h3>
      <p>Concentrated in Kolkata, Delhi, Pune. Khadi blazers over raw silk, Daryaganj book market Sundays, library dates, oxidised silver jewellery. The global Dark Academia format run through Indian fabric, climate, and literary memory. These consumers spend on craft and provenance. They don't respond to newness. They respond to depth. A brand with nothing to say about its making has nothing to say to them.</p>
    </div>
    <div class="subcard rv" style="--c:#ff2d95">
      <span class="tag">Line 3C</span><svg class="ic" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M13 2 L5 13 H11 L9 22 L19 9 H13 Z"/></svg>
      <h3>The Indo-Futurists</h3>
      <p>Labels like Jaywalking and Almost Gods represent the collision of hypebeast culture with Sanatan Dharma motifs, regional script typography, mythological iconography on drop-shoulder silhouettes. They are not nostalgic about Indian heritage. They are revisionist. Heritage is raw material for the future, not a museum exhibit. This is desi pride that looks like Supreme and means it.</p>
    </div>
    <div class="subcard rv" style="--c:#ffb800">
      <span class="tag">Line 3D</span><svg class="ic" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3 L14 10 L21 12 L14 14 L12 21 L10 14 L3 12 L10 10 Z"/></svg>
      <h3>The FaithTech Generation</h3>
      <p>Astrotalk's revenue doubled to ₹659 crore in FY24 with ₹100 crore net profit — confirmed through regulatory filings. <span class="src">(Entrackr, based on RoC filings)</span> The Ram Mandir inauguration drew over 160 million visitors to Ayodhya in 2024, a significant share of them young. This is not religiosity in the old sense. It is ancient frameworks running on modern infrastructure — meeting the same anxiety that therapy meets, at a price point and without the stigma. Wellness brands that haven't interrogated what this says about the market for meaning are missing something structural.</p>
    </div>
    <div class="subcard rv" style="--c:#00e5ff">
      <span class="tag">Line 3E</span><svg class="ic" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 15 V12 A8 8 0 0 1 20 12 V15"/><rect x="2.5" y="14" width="4.5" height="7" rx="2"/><rect x="17" y="14" width="4.5" height="7" rx="2"/></svg>
      <h3>The Professional Fans</h3>
      <p>87% of Indian Gen Z identify as fans of something. 13% have monetised it. <span class="src">(YouTube Culture &amp; Trends India, 2024)</span> Fan edit channels. Affiliate pipelines built around fandoms. Pooled funds for Delhi billboard takeovers to celebrate K-pop idols' birthdays. For these consumers, the fandom is the brand. There is no neutral position for marketers here: you are either inside the fandom, or you are invisible.</p>
    </div>
    <div class="subcard rv" style="--c:#b9a7ff">
      <span class="tag">Line 3F</span><svg class="ic" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="10" cy="10" r="6.5"/><path d="M15 15 L21 21"/><path d="M8 8 L12 12 M12 8 L8 12"/></svg>
      <h3>The Deinfluencers</h3>
      <p>The fastest trust-building move on Indian social media in 2024 was telling people what not to buy. When Food Pharmer dissected Bournvita's sugar content, the brand first issued legal notices. The internet rallied behind the creator. Bournvita eventually cut its added sugar by 14.4%, and the Ministry of Commerce directed e-commerce platforms to remove it from the "health drink" category. One creator. One video. A product reformulated and a category reclassified.</p>
    </div>
  </div>

  <div class="board rv"><p>The creator who de-influences earns five times the credibility when they eventually recommend something. Every brand with a questionable label should treat this as a category-level threat, not a niche content trend.</p></div>
</section>

<div class="trackline rv"><div class="l"></div><div class="st"></div><div class="l"></div></div>

<!-- ================= PART FOUR ================= -->
<section id="part4">
  <div class="station rv"><span class="badge">STATION 04</span><span class="rail"></span><span class="dev">स्टेशन ०४</span></div>
  <h2 class="rv">PART FOUR: THE <span class="neon">PARADOXES</span></h2>
  <div class="kicker rv">Contradictions that are simultaneously true.</div>
  <div class="spot rv" aria-hidden="true"><svg viewBox="0 0 100 100">
    <line x1="16" y1="36" x2="74" y2="36" stroke="#00e5ff" stroke-width="3" class="gc"/>
    <path d="M66 26 L82 36 L66 46" stroke="#00e5ff" stroke-width="3" class="gc"/>
    <line x1="84" y1="64" x2="26" y2="64" stroke="#ff2d95" stroke-width="3" class="gp"/>
    <path d="M34 54 L18 64 L34 74" stroke="#ff2d95" stroke-width="3" class="gp"/>
    <g stroke="#ffb800" stroke-width="2.5" class="ga">
      <line x1="50" y1="14" x2="50" y2="24"/><line x1="50" y1="76" x2="50" y2="86"/>
    </g>
  </svg></div>

  <p class="rv">The most useful frame is not a preferences list. It is a set of contradictions that are simultaneously true. Strategies that collapse a paradox into one side fail. The ones that hold the tension have a chance.</p>

  <div class="paradox rv">
    <div class="head"><div class="a">GLOBAL FLUENCY</div><div class="b">LOCAL PRIDE</div></div>
    <div class="body">
      <p><span class="hl-cyan">83% take pride in buying Indian-origin brands.</span> <span class="src">(BCG × Snap, 2024)</span> The same person is also fluent in K-beauty glass-skin vocabulary, has a Korean cookware wish-list, and watches Japanese anime with Bengali subtitles. The "Glocal" identity is not a compromise position. It is the actual synthesis. Brands that translate Western positioning for India are doing the opposite of what this cohort wants — they want the world run through an Indian sensibility, not an Indian skin on a Western skeleton.</p>
    </div>
  </div>

  <div class="paradox rv">
    <div class="head"><div class="a">BURNED OUT</div><div class="b">ALWAYS ON</div></div>
    <div class="body">
      <p><span class="hl-pink">40% report chronic stress or anxiety.</span> <span class="hl-cyan">82% use music streaming to escape doomscrolling.</span> <span class="hl-amber">61% believe people are lonelier than a decade ago.</span> <span class="src">(Deloitte India, 2024; Spotify Culture Next India, 2024)</span> The hyperconnection and the loneliness are not contradictions — they are the same mechanism experienced at different hours of the same evening. The brand that offers actual respite — not stimulation dressed as calm — has disproportionate access to a generation that badly needs somewhere to exhale.</p>
    </div>
  </div>

  <div class="paradox rv">
    <div class="head"><div class="a">ANTI-CORPORATE</div><div class="b">FIERCELY SELF-DIRECTED</div></div>
    <div class="body">
      <p>They reject the 70-hour employer week. India leads globally in year-on-year growth of LinkedIn profiles adding "Founder." The distinction is everything: it is not ambition they've rejected. It is borrowed ambition. The brands that position their products as tools for building something of your own land. The ones that still invoke corporate achievement as the aspirational frame miss entirely.</p>
    </div>
  </div>

  <div class="paradox rv">
    <div class="head"><div class="a">ECO-CONVICTION</div><div class="b">ECO-PRAGMATISM</div></div>
    <div class="body">
      <p><span class="hl-cyan">84% of Indian Gen Z actively try to minimise their environmental footprint</span> — higher than the global average of 73%. <span class="src">(Deloitte India, 2024)</span> Price still wins at the point of purchase, almost every time. They will publicly call out greenwashing — ASCI codified this in February 2024, prohibiting unsubstantiated absolute claims like "eco-friendly." The resolution is not complicated:</p>
    </div>
  </div>

  <div class="board rv"><p>They don't need you to be perfect. They need you to not be dishonest. Those are very different requirements, and most brands are confusing them.</p></div>
</section>

<div class="trackline rv"><div class="l"></div><div class="st"></div><div class="l"></div></div>

<!-- ================= PART FIVE ================= -->
<section id="part5">
  <div class="station rv"><span class="badge">STATION 05</span><span class="rail"></span><span class="dev">स्टेशन ०५</span></div>
  <h2 class="rv">PART FIVE: THE <span class="neon">WALLET</span></h2>
  <div class="kicker rv">How culture becomes purchasing — without anyone planning it.</div>
  <div class="spot rv" aria-hidden="true"><svg viewBox="0 0 100 100">
    <rect x="16" y="42" width="58" height="36" rx="7" stroke="#00e5ff" stroke-width="3" class="gc"/>
    <path d="M64 52 H84 V68 H64 A8 8 0 0 1 64 52 Z" stroke="#ffb800" stroke-width="3" class="ga"/>
    <circle cx="66" cy="60" r="2.5" fill="#ffb800" class="ga"/>
    <polyline points="22,34 38,20 52,27 70,10" stroke="#ff2d95" stroke-width="3" class="gp"/>
    <path d="M70 10 L72 20 M70 10 L60 9" stroke="#ff2d95" stroke-width="3" class="gp"/>
    <text x="30" y="68" font-family="IBM Plex Mono, monospace" font-size="20" fill="#ff2d95" stroke="none" class="gp">₹</text>
  </svg></div>

  <p class="rv">How culture becomes purchasing — without anyone planning it. Korean became one of the fastest-growing languages on Duolingo in India because Gen Z wanted to understand K-pop lyrics without subtitles. That single desire, which no CMO engineered, created a <span class="hl-pink">$400 million K-beauty market growing toward $1.5 billion.</span> <span class="src">(Datum Intelligence × kindlife, 2024)</span> McDonald's launched a nationwide Korean Spicy Range. Nestlé reformulated Maggi in Korean BBQ variants. None of it started with a brand strategy. It started with a parasocial bond and spread through the desire to participate in something that felt alive.</p>
  <div class="board rv"><p>The brand was always downstream of the culture. The brands that win understand they are joining a river, not building one.</p></div>

  <h3 class="rv">The new status grammar.</h3>
  <p class="rv">Status no longer runs through logos — that codes as trying too hard. It is experience-driven, curation-driven, knowledge-driven. Knowing the obscure skincare ingredient before it goes mainstream. Being at the concert, not owning the watch. <span class="hl-cyan">Protein supplement SKUs on quick-commerce surged 230% in 2024.</span> <span class="src">(Redseer)</span> Health as daily identity work, performed and purchased incrementally. The flex is the 5am run club, the Coldplay ticket, the niche fragrance nobody in the office has smelled before.</p>

  <h3 class="rv">Access over ownership — with important exceptions.</h3>
  <p class="rv">They subscribe and rent where previous generations bought. But <span class="hl-amber">40% of NSE's registered investors are now under 30, and the median investor age dropped from 38 to 32 in five years.</span> <span class="src">(NSE, August 2024)</span></p>
  <div class="board rv"><p>They don't want to own a house. They want to build wealth. For any brand in real estate or financial services, that is not a trivial distinction.</p></div>
</section>

<div class="trackline rv"><div class="l"></div><div class="st"></div><div class="l"></div></div>

<!-- ================= PART SIX ================= -->
<section id="part6">
  <div class="station rv"><span class="badge">STATION 06</span><span class="rail"></span><span class="dev">स्टेशन ०६</span></div>
  <h2 class="rv">PART SIX: WHEN BRANDS GET IT <span class="neon">WRONG</span></h2>
  <div class="kicker rv">The old playbook, breaking in real time.</div>
  <div class="spot rv" aria-hidden="true"><svg viewBox="0 0 100 100">
    <rect x="36" y="10" width="28" height="58" rx="7" stroke="#00e5ff" stroke-width="3" class="gc"/>
    <line x1="50" y1="68" x2="50" y2="88" stroke="#00e5ff" stroke-width="3" class="gc"/>
    <line x1="38" y1="88" x2="62" y2="88" stroke="#00e5ff" stroke-width="3" class="gc"/>
    <circle cx="50" cy="22" r="6" fill="#ff3860" class="gp"/>
    <circle cx="50" cy="39" r="6" stroke="#ffb800" stroke-width="2.5" opacity="0.6" class="ga"/>
    <circle cx="50" cy="56" r="6" stroke="#2eff8f" stroke-width="2.5" opacity="0.6"/>
  </svg></div>

  <p class="rv">The backlash case studies of the last few years are a more useful brief than any trends report. Each one is a lesson in how the old playbook breaks against this cohort.</p>

  <div class="case rv">
    <span class="sig">Signal: Red</span>
    <h3>Zomato's Pure Veg Fleet (March 2024)</h3>
    <p>A new "Pure Veg Mode" with a dedicated fleet of riders in green uniforms, to distinguish them from the standard red. The intent was operational clarity. The execution inadvertently provided housing societies with a mechanism to discriminate against delivery riders by uniform colour — a feature of caste and dietary purity dynamics that India hasn't resolved. The internet identified the structural problem within hours. Zomato's CEO reversed the uniform policy within 24 hours, keeping the app filter but putting everyone back in red. What the episode demonstrated: Gen Z doesn't read the press release. It reads the real-world consequence.</p>
  </div>

  <div class="case rv">
    <span class="sig">Signal: Red</span>
    <h3>Poonam Pandey's fake death (February 2024)</h3>
    <p>A marketing agency staged the influencer's death from cervical cancer to "raise awareness" about HPV vaccination. Revealed as a stunt 24 hours later. The outrage wasn't that people were deceived — it was that the deception weaponised grief, specifically the grief of cancer patients and their families, as a conversion tool. The agency lost its pharma client. The lesson written in neon: you cannot borrow emotional credibility you haven't earned, and you certainly cannot fake tragedy to manufacture it.</p>
  </div>

  <div class="case rv">
    <span class="sig">Signal: Red</span>
    <h3>YesMadam's fake layoff stunt (December 2024)</h3>
    <p>An at-home salon startup leaked a "screengrab" of an HR email claiming 100 employees were fired for reporting stress. Revealed 24 hours later as a stunt to announce a new mental health leave policy. Immediate and severe backlash on LinkedIn, where young professionals called it a manipulation of workplace precarity — one of Gen Z's sharpest anxieties — for engagement. The CEO apologised on video. The irony is exquisite: a mental health campaign that triggered a mental health backlash by treating job insecurity as content.</p>
  </div>

  <div class="case rv">
    <span class="sig">Signal: Red</span>
    <h3>Tanishq, Fabindia, Manyavar</h3>
    <p>Across three separate campaigns spanning interfaith representation, festive campaign nomenclature, and wedding ritual questioning, each brand found itself caught between two Gen Z factions moving in opposite directions simultaneously. Progressive Gen Z applauded the intent. Conservative Gen Z organised boycotts. When Tanishq pulled its Ekatvam ad to protect store employees from threats, a third wave of progressive backlash called out the withdrawal as capitulation. Manyavar, by contrast, held its ground on Kanyaamaan and survived.</p>
  </div>

  <div class="board rv"><p>The needle isn't left or right. It's authentic or performed. The brands that took a stand because the stand was structurally true to them survived. The ones that took a stand as a campaign device discovered there is no safe exit once you've entered.</p></div>

  <h3 class="rv">Contrast: what works.</h3>
  <div class="case ok rv">
    <span class="sig" style="--sig:#2eff8f">Signal: Green</span>
    <h3>Zepto's Diwali 2024 <span class="egg-word" id="papdiWord">Soan Papdi</span> campaign</h3>
    <p>Zepto's Diwali 2024 Soan Papdi campaign did not invent a cause or borrow someone else's grief. It took a piece of shared cultural absurdity — the universally re-gifted sweet nobody actually eats — and made it the hero of a 60-second film where the sweet has an existential crisis, gets a LinkedIn profile as "Chief Comeback Officer," and arrives free with orders. A 74% surge in engagement. The campaign worked because it didn't ask Gen Z to care about something new. It reflected back something they already found funny, with enough craft and self-awareness to make them want to share it.</p>
  </div>

  <div class="case ok rv">
    <span class="sig" style="--sig:#2eff8f">Signal: Green</span>
    <h3>The Blinkit–Zomato adjacent billboard exchange</h3>
    <p>A classic Bollywood dialogue repurposed as a product conversation between two brands on neighbouring hoardings — became one of the most extended pieces of cultural IP Indian advertising has produced in years. Brands, government agencies, and consumers extended the format for weeks. It worked because it was genuinely playful, cost almost nothing, and created something worth making memes of — which is the highest creative aspiration available to a brand in India right now.</p>
  </div>

  <div class="board amber rv"><p>The question worth asking in every brief: is there anything here that Gen Z would want to extend, remix, or pass on? If not, the brief needs to go back.</p></div>
</section>

<div class="trackline rv"><div class="l"></div><div class="st"></div><div class="l"></div></div>

<!-- ================= PART SEVEN ================= -->
<section id="part7">
  <div class="station rv"><span class="badge">STATION 07</span><span class="rail"></span><span class="dev">स्टेशन ०७</span></div>
  <h2 class="rv">PART SEVEN: HOW TO EARN THEIR <span class="neon">TRUST</span></h2>
  <div class="kicker rv">One principle. Several moves. No framework.</div>
  <div class="spot spot--center rv" aria-hidden="true"><svg viewBox="0 0 100 100">
    <circle cx="30" cy="50" r="13" stroke="#ff2d95" stroke-width="3" class="gp"/>
    <circle cx="30" cy="50" r="4" stroke="#ff2d95" stroke-width="2.5" class="gp"/>
    <line x1="43" y1="50" x2="84" y2="50" stroke="#ff2d95" stroke-width="3" class="gp"/>
    <line x1="70" y1="50" x2="70" y2="62" stroke="#ff2d95" stroke-width="3" class="gp"/>
    <line x1="80" y1="50" x2="80" y2="58" stroke="#ff2d95" stroke-width="3" class="gp"/>
    <g stroke="#ffb800" stroke-width="2.5" class="ga">
      <line x1="58" y1="26" x2="58" y2="34"/><line x1="54" y1="30" x2="62" y2="30"/>
      <line x1="86" y1="70" x2="86" y2="78"/><line x1="82" y1="74" x2="90" y2="74"/>
    </g>
  </svg></div>

  <div class="move rv">
    <h3>I. Be a participant, not a sponsor</h3>
    <p>A sponsor shows up with money and wants visibility. A participant shows up with something to contribute — craft, access, genuine taste, real usefulness — and earns a place in the room.</p>
    <p><b>Gen Z's trust architecture is built around creators, fandoms, and communities they chose. Not around brands that bought their way in.</b></p>
    <p>The brands with the deepest equity among this cohort didn't run campaigns targeting Gen Z. They showed up inside cultures they genuinely belonged in, consistently, before they needed anything from those cultures. Presence before need is the price of credibility. A brand present only during Diwali, IPL, and Pride Month is a brand that has revealed its calendar. Gen Z can smell the calendar.</p>
  </div>

  <div class="move rv">
    <h3>II. Let the product do the values work</h3>
    <p>The generation that organised the NEET protests via Instagram — where placards read "Bro leaked the paper before GTA 6" and Spider-Man costumes showed up outside the Ministry of Education — has a very low threshold for performative positioning. The internet humour wasn't diluting the seriousness; it was the vehicle. The same mechanism runs on brands: if your sustainability is structural, in the supply chain, in the ingredients, in the sourcing, the communication almost writes itself. If it isn't structural, no campaign budget will paper over the gap.</p>
    <p><b>They will find the gap. They will screenshot it. And it will travel faster than your response plan.</b></p>
    <p>Zomato's Pure Veg Fleet wasn't a values failure — it was an operational decision with unexamined social consequences. That's a different kind of error but the same speed of accountability. The question isn't whether a brand can avoid scrutiny. It is whether what's underneath the scrutiny is worth defending.</p>
  </div>

  <div class="move rv">
    <h3>III. Earn the meme</h3>
    <p>The highest creative aspiration for a brand in India right now is to become raw material for Gen Z's own expression. Not to go viral. To become extendable. The Blinkit–Zomato billboard didn't ask anyone to care. It created something that dozens of other brands, police departments, and random users wanted to add to. Zepto's Soan Papdi didn't lecture anyone about festive traditions. It handed the culture a character everyone already knew and gave it a second act.</p>
    <p><b>Going viral is an outcome. Being extendable is a design choice.</b></p>
  </div>

  <div class="move rv">
    <h3>IV. Talk like something is still being built</h3>
    <p>This is the move almost nobody is making, which is precisely why it works.</p>
    <p>Not vulnerability as strategy. Not the calculated oversharing brands deploy during crises. Something simpler and harder: admitting, in advance and without being forced, what you don't yet know, where you're still figuring it out, what your product doesn't do for everyone.</p>
    <p>Gen Z grew up watching the gap between institutional claims and institutional reality. They have extremely calibrated sensors for performed certainty. A brand that presents only the finished, legally-approved, polished version of itself reads the way a resume with no weaknesses reads: complete. Therefore false.</p>
    <p><b>You can only afford to admit limitations if you genuinely believe in what remains after the admission.</b></p>
    <p>The deinfluencer creator built trust by saying "don't buy that." The brand that can say "this product isn't right if you're looking for X" earns something the deinfluencer cannot take away — because it is operating at the same level of honesty the consumer was going to arrive at anyway, just faster and with more grace.</p>
    <p>When Bournvita sent legal notices to a creator for reading its label, it confirmed everything the creator was saying. When a brand says "here's what we're working on, here's what we haven't solved yet," it pre-empts the creator video and earns the trust the creator would have otherwise stolen.</p>
    <p>The comment section is not a threat to manage. It is a real-time brief. The brands reading it as a brief are a step ahead of the ones still sending cease-and-desist letters.</p>
  </div>

  <div class="move rv">
    <h3>V. Build for the identity stack, not the demographic</h3>
    <p>The mistake most briefs make is treating Gen Z as a target segment. They are not a target segment. They are a generation of people each running a parallel, simultaneous set of identities — the gamer and the skincare enthusiast and the K-pop fan and the desi hip-hop listener, all in the same person, sometimes in the same afternoon.</p>
    <p><b>The brand that earns a place in one of those identities doesn't get the demographic. It gets the person.</b></p>
    <p>A brand that belongs inside the soft life subculture has access to a 24-year-old in a way that a brand "targeting Gen Z females 18–28" never will — because the former has shown up where she actually lives, not where a media plan says she might be found.</p>
    <p>This requires choosing. It requires being specific about which corner of Gen Z culture you genuinely belong in and showing up there with full commitment, rather than covering the whole generation with a diluted, everything-to-everyone execution that reads as belonging to none of it.</p>
    <p>The brands getting this right — Minimalist in ingredient-led skincare, boAt in everyday tech, Snitch in fast fashion with personality — didn't try to be the Gen Z brand. They tried to be the right brand for a specific kind of Gen Z person, and ended up with the generation.</p>
  </div>
</section>

<div class="trackline rv"><div class="l"></div><div class="st"></div><div class="l"></div></div>

<!-- ================= SOURCES ================= -->
<section id="sources">
  <div class="station rv"><span class="badge">END OF LINE</span><span class="rail"></span><span class="dev">अंतिम स्टेशन</span></div>
  <h2 class="rv">PRIMARY <span class="neon">SOURCES</span></h2>
  <p class="rv">All statistics are drawn from the sources below. Where a data point is directional or methodologically limited, this is flagged in the text.</p>

  <div class="rv" style="overflow-x:auto;">
  <table class="depart">
    <caption>◉ DEPARTURES — DATA BOARD</caption>
    <thead><tr><th>Institution</th><th>Report</th><th>Date</th></tr></thead>
    <tbody>
      <tr><td>BCG × Snap Inc.</td><td>The $2 Trillion Opportunity: How Gen Z is Shaping the New India</td><td>October 2024</td></tr>
      <tr><td>Deloitte</td><td>Gen Z &amp; Millennial Survey — India Focus</td><td>2024</td></tr>
      <tr><td>Lumikai × Google</td><td>State of India Interactive Media and Gaming Report FY24</td><td>November 2024</td></tr>
      <tr><td>Spotify</td><td>Culture Next Report — India Edition</td><td>October 2024</td></tr>
      <tr><td>YouTube / Google</td><td>Culture &amp; Trends Report — India</td><td>2024</td></tr>
      <tr><td>Datum Intelligence × kindlife</td><td>Rise of Korean Beauty in India</td><td>2024</td></tr>
      <tr><td>Redseer</td><td>Gen Z &amp; Quick Commerce Report</td><td>2024</td></tr>
      <tr><td>NSE India</td><td>Investor Demographics — 10 Crore Milestone</td><td>August 2024</td></tr>
      <tr><td>ASCI</td><td>Guidelines for Environmental/Green Claims</td><td>January 2024</td></tr>
      <tr><td>Entrackr / Fintrackr</td><td>Astrotalk FY24 Financials (via RoC filings)</td><td>November 2024</td></tr>
      <tr><td>ET × Snapchat</td><td>Gen Z Index India</td><td>2024</td></tr>
      <tr><td>Michael Page India</td><td>Talent Trends Report</td><td>2024</td></tr>
      <tr><td>EY-FICCI</td><td>India Media &amp; Entertainment Report</td><td>2024</td></tr>
      <tr><td>NumroVani</td><td>Young Indians &amp; Astrology Survey (indicative — commercial platform)</td><td>2024</td></tr>
    </tbody>
  </table>
  </div>
</section>

</main>

<!-- ================= FOOTER ================= -->
<footer>
  <div class="foot-inner">
    <div class="buffer rv" aria-hidden="true">
      <svg viewBox="0 0 240 92" xmlns="http://www.w3.org/2000/svg" fill="none">
        <line x1="0" y1="62" x2="176" y2="62" stroke="#00e5ff" stroke-width="2" opacity="0.7"/>
        <line x1="0" y1="74" x2="176" y2="74" stroke="#00e5ff" stroke-width="2" opacity="0.7"/>
        <g stroke="#241c58" stroke-width="4">
          <line x1="14" y1="58" x2="14" y2="78"/><line x1="46" y1="58" x2="46" y2="78"/>
          <line x1="78" y1="58" x2="78" y2="78"/><line x1="110" y1="58" x2="110" y2="78"/>
          <line x1="142" y1="58" x2="142" y2="78"/>
        </g>
        <rect x="178" y="42" width="10" height="42" fill="#1a1440" stroke="#ffb800" stroke-width="2"/>
        <rect x="166" y="54" width="46" height="18" rx="3" fill="#1a1440" stroke="#ff2d95" stroke-width="2"/>
        <g stroke="#ff2d95" stroke-width="2">
          <line x1="171" y1="70" x2="183" y2="56"/><line x1="183" y1="70" x2="195" y2="56"/><line x1="195" y1="70" x2="207" y2="56"/>
        </g>
        <circle cx="183" cy="34" r="6" fill="#ff3860"/>
        <circle cx="183" cy="34" r="10" stroke="#ff3860" stroke-width="1.5" opacity="0.5"/>
      </svg>
    </div>
    <div class="endsign rv">■ END OF LINE ■</div>
    <div class="endsign-dev rv">यह गाड़ी आगे नहीं जाएगी · This train terminates here</div>

    <a class="foot-by rv" href="https://www.juicelabs.ai" target="_blank" rel="noopener">
      <img src="__LOGO_SRC__" alt="Juice AI logo">
      <span class="t">Produced by <b>Juice AI</b> — The Brand OS that generates content that outperforms<br><b>www.juicelabs.ai</b></span>
    </a>

    <div class="foot-note rv">
      THE FIRST GENERATION THAT DOESN'T NEED YOU · GEN Z INDIA INSIGHTS REPORT<br>
      A BRIEFING FOR BRAND MARKETERS · <a href="https://www.juicelabs.ai" target="_blank" rel="noopener">JUICELABS.AI</a><br>
      <button id="hornBtn" title="?" aria-label="Sound the horn">🚈</button> &nbsp;·&nbsp; 🥚×3 hidden on this line
    </div>
  </div>
</footer>

<div id="eggToast" role="status" aria-live="polite"></div>
<div id="train" aria-hidden="true">🚃🚃🚃🚃🚈</div>
<div id="papdi" aria-hidden="true">🍬</div>

`;
