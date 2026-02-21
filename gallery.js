'use strict';
// ===== 인라인 CSS =====
const CSS_MOBILE = `@import url('https://fonts.googleapis.com/css2?family=Nanum+Pen+Script&display=swap');
*, *::before, *::after { box-sizing: border-box; }
html, body {
  margin: 0; padding: 0;
  width: 100%; height: 100%;
  background: #000;
  overflow: hidden;
  font-family: "Nanum Pen Script", cursive;
  -webkit-text-size-adjust: 100%;
  overscroll-behavior: none;
}
#blackout {
  position: fixed; inset: 0;
  background: #000; opacity: 0;
  pointer-events: none;
  transition: opacity 400ms ease;
  z-index: 9999;
}
#blackout.on { opacity: 1; pointer-events: auto; }
#app {
  position: fixed; inset: 0;
  display: flex; flex-direction: column;
}
.photo-area {
  position: relative;
  flex-shrink: 0;
  background: #000;
  overflow: hidden;
  width: 100%;
  aspect-ratio: 1 / 1;
  touch-action: pan-x;
}
.control-area {
  position: relative;
  flex: 1;
  min-height: 0;
  width: 100%;
  background: #333;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0;
  overflow-y: auto;
  overflow-x: hidden;
  touch-action: pan-y;
  -webkit-overflow-scrolling: touch;
}
@media (min-aspect-ratio: 1/1) {
  #app { flex-direction: row; }
  .photo-area { width: auto; height: 100%; aspect-ratio: 1/1; touch-action: pan-y; }
  .control-area { flex: 1; height: 100%; width: auto; overflow-y: auto; touch-action: pan-y; }
}
.scene-img {
  position: absolute; inset: 0;
  width: 100%; height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 800ms ease;
}
.scene-img.show { opacity: 1; }
.rest-photo { position: absolute; inset: 0; background: #000; display:flex; align-items:center; justify-content:center; }
@keyframes restBounce {
  0%, 100% { transform: translateY(0); opacity: 0.30; }
  50%       { transform: translateY(var(--bounce-h, -10px)); opacity: 0.65; }
}
.rest-ui { display:flex; align-items:center; gap:30px; }
.rest-dot {
  width:8px; height:8px; border-radius:50%;
  background:rgba(235,235,235,0.70);
  animation: restBounce 1800ms ease-in-out infinite;
}

.rest-arrow { font-size:18px; color:rgba(235,235,235,0.65); user-select:none; line-height:1; }
.rest-triangle {
  width:0; height:0;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-left: 18px solid rgba(235,235,235,0.70);
  animation: restFade 1800ms ease-in-out infinite;
}
@keyframes restFade {
  0%, 100% { opacity: 0.30; }
  50%       { opacity: 0.85; }
}
.work-code {
  font-size: 13px;
  color: rgba(235,235,235,0.45);
  letter-spacing: 0.8px;
  margin-bottom: 18px;
  user-select: none;
  font-family: "Nanum Pen Script", cursive;
}
.scene-text {
  font-size: clamp(20px, 5vw, 26px);
  color: rgba(235,235,235,0.92);
  text-align: center;
  line-height: 1.6;
  padding: 0 28px;
  opacity: 0;
  transform: translateY(6px);
  transition: opacity 600ms ease, transform 600ms ease;
  user-select: none;
  white-space: pre-wrap;
  word-break: keep-all;
  margin-bottom: 32px;
  font-family: "Nanum Pen Script", cursive;
}
.scene-text.show { opacity: 1; transform: translateY(0); }
.rest-text { font-size: clamp(28px, 8vw, 40px); color: rgba(235,235,235,0.55); letter-spacing: 4px; }
.nav-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 24px;
  gap: 12px;
}
.nav-btn {
  width: 48px; height: 48px;
  border-radius: 999px;
  display: grid; place-items: center;
  background: rgba(255,255,255,0.035);
  border: 1px solid rgba(255,255,255,0.05);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  color: #e6e6e6;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
  user-select: none;
  transition: transform 150ms ease, box-shadow 150ms ease;
  flex-shrink: 0;
}
.nav-btn:active { transform: scale(0.92); box-shadow: 0 0 14px rgba(212,175,55,0.18); }
.nav-btn.disabled { opacity: 0.25; pointer-events: none; }
.page-counter {
  font-size: 14px;
  color: rgba(235,235,235,0.40);
  letter-spacing: 0.5px;
  user-select: none;
  text-align: center;
  margin-top: 10px;
  margin-bottom: 4px;
  font-family: "Nanum Pen Script", cursive;
}
.overlay-panel {
  position: fixed; inset: 0;
  z-index: 1000;
  display: flex; align-items: flex-end; justify-content: center;
  opacity: 0; pointer-events: none;
  transition: opacity 400ms ease;
}
.overlay-panel.on { opacity: 1; pointer-events: auto; }
.overlay-backdrop {
  position: absolute; inset: 0;
  background: rgba(0,0,0,0.55);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
}
.toc-panel {
  position: relative;
  width: 100%;
  max-height: 92vh;
  background: rgba(255,255,255,0.10);
  border: 1px solid rgba(255,255,255,0.08);
  border-bottom: none;
  border-radius: 20px 20px 0 0;
  padding: 20px 24px 40px;
  overflow-y: auto;
  transform: translateY(20px);
  transition: transform 400ms ease;
  color: #e6e6e6;
}
.overlay-panel.on .toc-panel { transform: translateY(0); }
.toc-handle {
  width: 36px; height: 4px;
  background: rgba(255,255,255,0.20);
  border-radius: 2px;
  margin: 0 auto 20px;
}
.toc-header {
  display: flex; align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  position: sticky; top: -20px;
  padding: 10px 0; z-index: 10;
}
.toc-title { font-size: 26px; color: rgba(235,235,235,0.96); margin: 0; font-family: "Nanum Pen Script", cursive; }
.lang-toggle { display: flex; gap: 8px; }
.lang-btn {
  width: 40px; height: 30px;
  border-radius: 999px;
  display: grid; place-items: center;
  font-family: "Nanum Pen Script", cursive;
  font-size: 16px;
  color: #e6e6e6;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.08);
  cursor: pointer; opacity: 0.65;
  -webkit-tap-highlight-color: transparent;
  transition: opacity 150ms ease;
}
.lang-btn.active { opacity: 1; border-color: rgba(255,255,255,0.20); }
.toc-close {
  width: 36px; height: 36px;
  border-radius: 999px;
  display: grid; place-items: center;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.08);
  color: #e6e6e6; font-size: 18px;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  flex-shrink: 0;
}
.menu-section { margin-top: 8px; padding-top: 8px; border-top: 1px solid rgba(255,255,255,0.08); padding-left: 8px; }
.menu-section:first-of-type { border-top: none; margin-top: 0; padding-top: 0; }
.menu-h { font-size: 20px; color: rgba(235,235,235,0.92); margin: 0 0 2px 0; font-family: "Nanum Pen Script", cursive; }
.menu-h-link{ display:inline-block; cursor:pointer; }
.menu-h-link:hover{ text-decoration:underline; text-underline-offset:6px; }
.menu-h-link:focus{ outline:none; text-decoration:underline; text-underline-offset:6px; }

.toc-list { list-style: none; margin: 0; padding: 0; font-size: 18px; font-family: "Nanum Pen Script", cursive; }
.toc-item {
  padding: 2px 0 2px 20px;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  display: flex; align-items: center; gap: 12px;
  color: rgba(230,230,230,0.75);
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}
.toc-item:last-child { border-bottom: none; }
.toc-item:hover .toc-text{ text-decoration: underline; text-underline-offset: 6px; }
.menu-h-link{ cursor:pointer; }
.menu-h-link:hover{ text-decoration: underline; text-underline-offset: 6px; }

.toc-item.toc-current { color: rgba(212,175,55,0.95); text-shadow: 0 0 8px rgba(212,175,55,0.30); }
.toc-bullet { font-size: 10px; opacity: 0; }
.toc-item.toc-current .toc-bullet { opacity: 1; }
.toc-locked { opacity: 0.38; pointer-events: none; }
.menu-sub { font-size: 16px; color: rgba(220,220,220,0.65); line-height: 1.7; padding-left: 20px; font-family: "Nanum Pen Script", cursive; }
.menu-sub a { color: rgba(220,220,220,0.75); text-decoration: none; border-bottom: 1px solid rgba(220,220,220,0.20); }
.index-panel {
  position: relative;
  width: 100%; max-height: 92vh;
  background: rgba(255,255,255,0.10);
  border: 1px solid rgba(255,255,255,0.08);
  border-bottom: none;
  border-radius: 20px 20px 0 0;
  padding: 14px 12px 24px;
  overflow-y: auto;
  transform: translateY(20px);
  transition: transform 400ms ease;
  color: #e6e6e6;
}
.overlay-panel.on .index-panel { transform: translateY(0); }
.index-title { font-size: 22px; color: rgba(235,235,235,0.96); margin: 0 0 2px 0; font-family: "Nanum Pen Script", cursive; }
.index-sub { display: none; }
.index-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; }
.idx-head {
  grid-column: 1 / -1;
  font-size: 15px; color: rgba(230,230,230,0.70);
  padding: 6px 2px 2px;
  border-top: 1px solid rgba(255,255,255,0.08);
  margin-top: 4px;
  font-family: "Nanum Pen Script", cursive;
}
.idx-tile {
  border-radius: 8px; padding: 10px 4px;
  background: rgba(255,255,255,0.045);
  border: 1px solid rgba(255,255,255,0.09);
  display: flex; align-items: center; justify-content: center;
  font-size: 13px; color: rgba(245,245,245,0.96);
  text-align: center; cursor: default; user-select: none;
  -webkit-tap-highlight-color: transparent;
  transition: background 150ms ease, transform 150ms ease;
  min-height: 44px;
  font-family: "Nanum Pen Script", cursive;
}
.idx-tile.idx-clickable { cursor: pointer; background: rgba(255,255,255,0.10); border-color: rgba(255,255,255,0.20); }
.idx-tile.idx-clickable:active { transform: scale(0.94); background: rgba(255,255,255,0.16); }
.idx-tile.idx-missing { opacity: 0.35; background: rgba(255,255,255,0.02); border-color: rgba(255,255,255,0.05); }
.idx-tile.idx-current { background: rgba(212,175,55,0.30); border-color: rgba(212,175,55,0.90); color: rgba(255,250,230,1); text-shadow: 0 0 10px rgba(212,175,55,0.50); }
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
}`;
const CSS_DESKTOP = `@import url('https://fonts.googleapis.com/css2?family=Nanum+Pen+Script&display=swap');
/* CSS 변수 */
  :root{
  --nav-black-hold: 500ms; --nav-black-fade: 500ms;
  --toc-active-color: rgba(212,175,55,0.90); --toc-active-glow: rgba(212,175,55,0.22);
  --fog-min-lqip: 1500ms; --fog-hq-fade: 3000ms; --fog-text-delay: 3000ms; --fog-text-fade: 5800ms; --fog-duration: 96s; --fog-scale-min: 1.02; --fog-scale-max: 1.045; --fog-x: -1.6%; --fog-y: -1.0%;
  --fog-opacity-base: 0.10; --fog-opacity-peak: 0.50;
  --scene-hq-fade: 2500ms; --scene-text-delay: 2500ms; --scene-text-fade: 2500ms;
  --nav-after-text-gap: 2500ms; --nav-fade: 1500ms;
  --menu-fade-in: 600ms; --menu-fade-out: 800ms;
  --tip-bg: rgba(18,18,18,0.88); --tip-bd: rgba(255,255,255,0.12); --tip-tx: rgba(235,235,235,0.94);
  --ui-bottom: 6%;
  --idx-base-bg: rgba(255,255,255,0.045); --idx-base-bd: rgba(255,255,255,0.090); --idx-hover-bd: rgba(255,255,255,0.120);
  --idx-shadow: 0 14px 30px rgba(0,0,0,0.38); --idx-shadow-hover: 0 18px 44px rgba(0,0,0,0.48);
  }

  /* 기본 레이아웃 */
  html, body { margin:0; padding:0; height:100%; }
  body{ background:#000; }
  
  /* 접근성 - Skip Link */
  .skip-link{ position:absolute; top:-100px; left:0; background:rgba(212,175,55,0.95); 
  color:#000; padding:12px 20px; z-index:20000; font-family:"Nanum Pen Script", cursive;
  font-size:20px; text-decoration:none; border-radius:0 0 8px 0; }
  .skip-link:focus{ top:0; outline:3px solid rgba(212,175,55,1); outline-offset:2px; }
  
  /* 접근성 - 포커스 표시 */
  *:focus-visible{ outline:2px solid rgba(212,175,55,0.8); outline-offset:3px; }
  .nav-btn:focus-visible, .toc-item:focus-visible, .idx-tile:focus-visible{
  outline:2px solid rgba(212,175,55,1); outline-offset:2px; }

  .screen{ position:fixed; inset:0; width:100%; height:100%; transition: opacity 600ms ease; background:#000; }
  .hidden{ opacity:0; pointer-events:none; }
  .visible{ opacity:1; pointer-events:auto; }
  #blackout{ position:fixed; inset:0; background:#000; opacity:0; pointer-events:none; 
  transition: opacity var(--nav-black-fade) ease; z-index:9999; transform: translateZ(0); will-change: opacity; }
  #blackout.on{ opacity:1; pointer-events:auto; }

  /* 공통 장면 스타일 */
  .scene{ background:#000; overflow:hidden; }
  .scene-wrap{ position:relative; width:100%; height:100%; background:#000; }
  .square-frame{ position:absolute; left:50%; top:50%; transform:translate(-50%,-50%) translateZ(0);
  width:min(100vw, 100vh); aspect-ratio: 1 / 1; background:#000; overflow:hidden; }

  /* 작품 채번 */
  .work-code{ position:absolute; top:calc(6% + 26px); left:50%; transform: translateX(-50%) translateY(-50%) translateZ(0); z-index:55;
  font-family:"Nanum Pen Script", cursive; font-size:clamp(15px, 1.56vw, 19px); line-height:1;
  letter-spacing: 0.8px; color: rgba(235,235,235,0.58); padding: 4px 10px; border-radius: 999px;
  background: rgba(0,0,0,0.22); border: 1px solid rgba(255,255,255,0.05); opacity:0; pointer-events:none;
  transition: opacity var(--nav-fade) ease, transform 200ms ease, background 200ms ease; user-select:none; white-space:nowrap;
  cursor:pointer; 
  text-shadow: none;
}
  .work-code:hover{ transform: translateX(-50%) translateY(calc(-50% + 1px)) scale(0.985) translateZ(0); background: rgba(0,0,0,0.32); border-color: rgba(255,255,255,0.25); box-shadow: 0 0 18px rgba(212,175,55,0.18); }
  .nav-ready .work-code{ opacity:0.92; pointer-events:auto; }
  .work-code .page-num{ color: rgba(235,235,235,0.78); font-size: 1em; letter-spacing: 0.3px; }

  .work-code[data-tip]::after{
  content: attr(data-tip);
  position:absolute;
  top: calc(100% + 10px);
  left:50%;
  transform: translateX(-50%) translateY(-6px);
  padding: 8px 10px;
  border-radius: 10px;
  background: var(--tip-bg);
  border: 1px solid var(--tip-bd);
  color: var(--tip-tx);
  font-family:"Nanum Pen Script", cursive;
  font-size:18px;
  line-height:1.2;
  white-space:nowrap;

  opacity:0;
  pointer-events:none;
  transition: opacity 180ms ease, transform 180ms ease;
  z-index:9999;
  }
  .work-code[data-tip]:hover::after,
  .work-code[data-tip]:focus-visible::after{
  opacity:1;
  transform: translateX(-50%) translateY(0);
  }

  /* 네비게이션 버튼 */
  .nav-btn{ border-radius:999px; display:grid; place-items:center; color:#e6e6e6;
  background: rgba(255,255,255,0.035);
  border: 1px solid rgba(255,255,255,0.05);
  backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
  cursor:pointer; user-select:none;
  opacity:0; pointer-events:none; transition: opacity var(--nav-fade) ease, transform 200ms ease;
  -webkit-tap-highlight-color: transparent; touch-action: manipulation; font-family:"Nanum Pen Script", cursive; }
  .nav-btn:hover{ opacity:1; transform: scale(1.04) translateZ(0);  box-shadow: 0 3px 8px rgba(0,0,0,0.03);
}

  .nav-ready .nav-btn{ opacity:0.92; pointer-events:auto; }

  .nav-menu{ position:absolute; top:6%; left:6%; transform: translateZ(0); z-index:60; width:52px; height:52px; }

  .soloToggle{ position:absolute; top:6%; right:6%; z-index:60; width:52px; height:52px; opacity:0; visibility:hidden; }

  .nav-arrow{ position:absolute; bottom: var(--ui-bottom); transform: translateZ(0); z-index:20;
  width:52px; height:52px; }
  .nav-left{ left: 6%; }
  .nav-right{ right: 6%; }
  .nav-arrow.disabled{ opacity:0 !important; pointer-events:none !important; cursor:default !important;
  transform: translateZ(0) !important; color: rgba(235,235,235,0.40) !important; font-size:26px !important;
  border: 1px solid rgba(255,255,255,0.05); background: rgba(255,255,255,0.035); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); }
  .nav-arrow.disabled svg{ opacity: 0.5; }
  .nav-ready .nav-arrow.disabled{ opacity:0.92 !important; pointer-events:auto !important; }

  /* 툴팁 */
  [data-tip]::after{ content: attr(data-tip); position:absolute; padding: 8px 10px; border-radius: 10px;
  background: var(--tip-bg); border: 1px solid var(--tip-bd); color: var(--tip-tx);
  font-family:"Nanum Pen Script", cursive; font-size:18px; line-height:1.2; white-space:nowrap;
  opacity:0; pointer-events:none; transition: opacity 180ms ease, transform 180ms ease; z-index:9999; }
  .nav-arrow[data-tip]::after{ bottom: calc(100% + 10px); left:50%; transform: translateX(-50%) translateY(6px); }
  .nav-menu[data-tip]::after, .soloToggle[data-tip]::after{ 
  top: calc(100% + 10px); left:50%; transform: translateX(-50%) translateY(-6px); }
  [data-tip]:hover::after, [data-tip]:focus-visible::after{ opacity:1; transform: translateX(-50%) translateY(0); }

  /* UI 모드 */
  body.ui-hide-all .fog-text, body.ui-hide-all .scene-text,
  body.ui-hide-all .work-code{ opacity:0 !important; visibility:hidden !important; pointer-events:none !important; }

  /* Photo Only 모드 - soloToggle peek */
  body.ui-hide-all .soloToggle{ opacity:0; visibility:hidden; pointer-events:none;
    transition: opacity 1200ms ease, visibility 1200ms ease; }
  body.ui-hide-all.solo-peek .soloToggle{ opacity:0.92 !important; visibility:visible !important; pointer-events:auto !important;
    transition: opacity 300ms ease, visibility 0ms !important; }
  body.ui-hide-all .nav-arrow, body.ui-hide-all .nav-menu{ opacity:0; visibility:hidden; pointer-events:none;
    transition: opacity 1200ms ease, visibility 1200ms ease; }
  body.ui-hide-all.solo-peek .nav-arrow, body.ui-hide-all.solo-peek .nav-menu{ opacity:0.92 !important; visibility:visible !important; pointer-events:auto !important;
    transition: opacity 300ms ease, visibility 0ms !important; }

  body.ui-text-only .nav-arrow, body.ui-text-only .nav-menu, body.ui-text-only .nav-btn:not(.soloToggle), body.ui-text-only .work-code{ 
  opacity:0 !important; visibility:hidden !important; pointer-events:none !important; }
  body.ui-hide-all .nav-btn:not(.soloToggle){ opacity:0; visibility:hidden; pointer-events:none;
    transition: opacity 1200ms ease, visibility 1200ms ease; }
  body.ui-hide-all.solo-peek .nav-btn:not(.soloToggle){ opacity:0.92 !important; visibility:visible !important; pointer-events:auto !important;
    transition: opacity 300ms ease, visibility 0ms !important; }
  body.ui-text-only .fog-text, body.ui-text-only .scene-text{ pointer-events:none !important; }
  /* ui-text-only: soloToggle */
  body.ui-text-only .soloToggle{ opacity:0 !important; visibility:hidden; pointer-events:none;
    transition: opacity 1200ms ease, visibility 1200ms ease; }
  body.ui-text-only .soloToggle:hover{ opacity:0.92 !important; transform: scale(1.04) translateZ(0) !important; }
  body.ui-text-only.solo-peek .soloToggle{ opacity:0.92 !important; visibility:visible !important; pointer-events:auto !important;
    transition: opacity 300ms ease, visibility 0ms !important; }
  body.ui-text-only .nav-arrow, body.ui-text-only .nav-menu{ transition: opacity 1200ms ease, visibility 1200ms ease; }
  body.ui-text-only.solo-peek .nav-arrow, body.ui-text-only.solo-peek .nav-menu{ opacity:0.92 !important; visibility:visible !important; pointer-events:auto !important;
    transition: opacity 300ms ease, visibility 0ms !important; }

  /* FOG 장면 */
  .hero{ position:relative; width:100%; height:100%; background:#000; overflow:hidden; }
  .bg{ position:absolute; inset:0; width:100%; height:100%; object-fit:contain; background:#000; transform: translateZ(0); }
  .fog-lqip{ z-index:2; filter: blur(18px); transform: scale(1.06) translateZ(0); opacity:1; transition: opacity 1200ms ease; }
  .fog-hq{ z-index:3; opacity:0; visibility:hidden; transform: scale(1.01) translateZ(0); transition: opacity var(--fog-hq-fade) ease; }
  .hero.hq-show .fog-hq{ opacity:1; visibility:visible; }
  .hero.lqip-hide .fog-lqip{ opacity:0; }
  .overlay{ position:absolute; inset:0; z-index:4; background: rgba(0,0,0,0.16); pointer-events:none; }
  .fog{ position:absolute; inset:-12%; z-index:5; background:url("../assets/fog-noise.png") repeat; mix-blend-mode:screen;
  opacity: var(--fog-opacity, var(--fog-opacity-base));
  transition: opacity 1200ms ease;
   pointer-events:none; transform: translateZ(0); }
  .fog.animated{ animation:fogDrift var(--fog-duration) linear infinite; }
  @keyframes fogDrift{
  0%  { transform: translate(0,0) scale(var(--fog-scale-min));
  }
  50%  { transform: translate(var(--fog-x), var(--fog-y)) scale(var(--fog-scale-max));
  }
  100% { transform: translate(0,0) scale(var(--fog-scale-min));
  }
  }

  /* 텍스트 스타일 */
  .fog-text, .scene-text{ position:absolute; left:0; right:0; bottom: var(--ui-bottom);
  height:52px;
  display:flex; align-items:center; justify-content:center; text-align:center; padding:0;
  font-family:"Nanum Pen Script", cursive; font-size:clamp(24px, 2.5vw, 29px); line-height:1.75; color:#e6e6e6;
  opacity:0; transform: translateY(6px) translateZ(0); pointer-events:none; user-select:none; z-index:6; isolation:isolate;
  white-space:nowrap; overflow:hidden; }
  .fog-text > *, .scene-text > *{ max-width:95%; display:inline-block; }
  .fog-text{ transition: opacity var(--fog-text-fade) ease, transform var(--fog-text-fade) ease; }
  .scene-text{ transition: opacity var(--scene-text-fade) ease, transform var(--scene-text-fade) ease; z-index:10; }
  .scene-text.long-text{ height:auto; white-space:pre-wrap; overflow:visible; }
  .hero.show-text .fog-text, .scene.show-text .scene-text{ opacity:0.92; transform: translateY(0) translateZ(0); }
  .scene.show-text .scene-text{ opacity:0.95; }

  /* 쉬어가는 페이지 */
  .rest-photo { position:absolute; inset:0; background:#000; display:flex; align-items:center; justify-content:center; }
  @keyframes restBounce {
    0%, 100% { transform: translateY(0); opacity: 0.30; }
    50%       { transform: translateY(var(--bounce-h, -10px)); opacity: 0.65; }
  }
  .rest-ui { display:flex; align-items:center; gap:30px; }
  .rest-dot {
    width:8px; height:8px; border-radius:50%;
    background:rgba(235,235,235,0.70);
    animation: restBounce 1800ms ease-in-out infinite;
  }
  .rest-arrow { font-size:18px; color:rgba(235,235,235,0.65); user-select:none; line-height:1; }
  .rest-triangle { width:0; height:0; border-top:10px solid transparent; border-bottom:10px solid transparent; border-left:18px solid rgba(235,235,235,0.70); animation:restFade 1800ms ease-in-out infinite; }
  @keyframes restFade { 0%, 100% { opacity:0.30; } 50% { opacity:0.85; } }
  /* 이미지 장면 */
  .scene-img{ position:absolute; inset:0; width:100%; height:100%; object-fit:contain; background:#000;
  opacity:0; visibility:hidden; transition: opacity var(--scene-hq-fade) ease; transform: translateZ(0); }
  .scene.hq-show .scene-img{ opacity:1; visibility:visible; }

  /* 그라데이션 */
  .scene .square-frame::after{ content:""; position:absolute; left:0; right:0; bottom:0;
  height: clamp(420px, 46%, 900px); opacity:0; pointer-events:none; z-index:9; background: linear-gradient(to top, rgba(0,0,0,0.65), rgba(0,0,0,0.00) 72%);
  transition: opacity var(--scene-text-fade) ease; }
  .hero.show-text::after, .scene.show-text .square-frame::after{ opacity:1; }
  body.ui-hide-all .square-frame::after,
  .screen.hidden .square-frame::after{ opacity:0 !important; transition:none !important; }
  /* prague/dreams: 그라데이션 제거, 텍스트를 ripple 위로 */
  #pragueScreen .square-frame::after,
  #dreamsScreen .square-frame::after{ display:none !important; }
  #pragueScreen .scene-text,
  #dreamsScreen .scene-text{ z-index:20 !important; }

  /* 오버레이 공통 */
  .overlay-panel{ position:fixed; inset:0; z-index:10000; display:flex; align-items:center; justify-content:center;
  opacity:0; pointer-events:none; transition: opacity var(--menu-fade-in) ease; }
  .overlay-panel.on{ opacity:1; pointer-events:auto; }
  .overlay-panel.closing{ transition-duration: var(--menu-fade-out); }
  .overlay-backdrop{ position:absolute; inset:0; background: rgba(0,0,0,0.55); 
  backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px); }
  .panel-box{ position:relative; border-radius:16px; background: rgba(255,255,255,0.18);
  border: 1px solid rgba(255,255,255,0.05); box-shadow: 0 3px 8px rgba(0,0,0,0.03);
  color:#e6e6e6; transform: translateY(6px) translateZ(0); }

  /* TOC 오버레이 */
  #tocOverlay{ z-index:10000; }
  .toc-panel{ width:min(560px, 88vw); padding: 14px 22px 12px; }
  .toc-header{ display:flex; align-items:flex-start; justify-content:space-between; gap:12px;
  margin-bottom: 8px; padding-right: 56px; }
  .toc-title{ font-family:"Nanum Pen Script", cursive; font-size: 26px; line-height:1.1; margin: 0; letter-spacing: 0.2px; }
  .langToggle{ display:flex; gap:8px; align-items:center; margin-top: 2px; margin-right: 10px; }
  .langBtn{ width:44px; height:34px; border-radius:999px; display:grid; place-items:center;
  font-family:"Nanum Pen Script", cursive; font-size:18px; color:#e6e6e6;
  background: rgba(255,255,255,0.035); border: 1px solid rgba(255,255,255,0.05); cursor:pointer; user-select:none;
  -webkit-tap-highlight-color: transparent; touch-action: manipulation; opacity:0.75; transition: opacity 180ms ease, transform 180ms ease; }
  .langBtn:hover{ opacity:1; transform: translateY(-1px); }
  .langBtn.active{ opacity:1; background: rgba(255,255,255,0.035); border-color: rgba(255,255,255,0.16); }

  .menu-section{ margin-top: 5px; padding-top: 5px; border-top: 1px solid rgba(255,255,255,0.06); padding-left: 20px; }
  .menu-section:first-of-type{ margin-top: 2px; padding-top: 0; border-top: none; }
  .menu-h{ font-family:"Nanum Pen Script", cursive; font-size: 26px; line-height: 1.1; 
  letter-spacing: 0.2px; margin: 0 0 4px 0; color: rgba(235,235,235,0.96); }

  .toc-list{ font-family:"Nanum Pen Script", cursive; font-size: 24px; line-height:1.2;
  margin:0; padding-left: 0; list-style: none; }
  .toc-item{ padding: 2px 0; border-bottom: 1px solid rgba(255,255,255,0.04); display:flex; align-items:center; gap:16px; }
  .toc-item:last-child{ border-bottom:none; }
.toc-item:hover .toc-text{ text-decoration: underline; text-underline-offset: 6px; }
.menu-h-link{ cursor:pointer; }
.menu-h-link:hover{ text-decoration: underline; text-underline-offset: 6px; }

  .toc-bullet{ width:12px; flex: 0 0 12px; font-size:12px; display:inline-block; text-align:center;
  opacity:0; transform: translateY(-1px); }
  .toc-item.toc-current .toc-bullet{ opacity:0.95; }
  .toc-item.toc-current{ color: var(--toc-active-color); text-shadow: 0 0 8px var(--toc-active-glow); }
  .toc-locked{ opacity:0.45; }

  .toc-close, .index-close{ position:absolute; top: 14px; right: 14px; width: 40px; height: 40px;
  border-radius: 999px; display:grid; place-items:center; color:#e6e6e6;
  background: rgba(255,255,255,0.035);
  border: 1px solid rgba(255,255,255,0.05);
  cursor:pointer; user-select:none; -webkit-tap-highlight-color: transparent; touch-action: manipulation;
  font-size: 22px; line-height: 1; z-index: 20; }

  /* 인포 버튼 */
  .toc-info-btn{ position:absolute; bottom: 14px; right: 14px; width: 36px; height: 36px;
  border-radius: 999px; display:grid; place-items:center; color: rgba(200,200,200,0.6);
  background: transparent; border: 1px solid rgba(255,255,255,0.05);
  cursor:pointer; user-select:none; -webkit-tap-highlight-color: transparent; touch-action: manipulation;
  transition: color 200ms ease, border-color 200ms ease, background 200ms ease; z-index:10; }
  .toc-info-btn:hover{ color: rgba(235,235,235,0.92); border-color: rgba(255,255,255,0.30); background: rgba(255,255,255,0.035); }

  /* 인포 패널 슬라이드 */
  .toc-main{ transition: opacity 250ms ease, transform 250ms ease; }
  .toc-info-panel{ position:absolute; inset:0; padding: 14px 22px 12px;
  overflow-y:auto; opacity:0; pointer-events:none;
  transform: translateX(18px); transition: opacity 250ms ease, transform 250ms ease; }
  .toc-panel.show-info .toc-main{ opacity:0; pointer-events:none; transform: translateX(-18px); }
  .toc-panel.show-info .toc-info-panel{ opacity:1; pointer-events:auto; transform: translateX(0); }
  .info-back-btn{ display:inline-flex; align-items:center; gap:6px; cursor:pointer;
  font-family:"Nanum Pen Script", cursive; font-size:20px; color: rgba(180,180,180,0.7);
  border:none; background:none; padding:0; margin-bottom:10px;
  transition: color 180ms ease; -webkit-tap-highlight-color: transparent; }
  .info-back-btn:hover{ color: rgba(235,235,235,0.92); }
  .info-section{ margin-bottom: 14px; }
  .info-section-h{ font-family:"Nanum Pen Script", cursive; font-size:26px; line-height:1.1;
  color: rgba(235,235,235,0.92); margin: 0 0 6px 0; padding-bottom: 4px;
  border-bottom: 1px solid rgba(255,255,255,0.06); }
  .info-row{ font-family:"Nanum Pen Script", cursive; font-size:20px; line-height:1.5;
  color: rgba(210,210,210,0.85); padding: 2px 0 2px 12px; }
  .info-row kbd{ display:inline-block; padding:1px 6px; border-radius:4px; font-size:0.88em;
  background: rgba(255,255,255,0.035); border: 1px solid rgba(255,255,255,0.05);
  font-family:"Nanum Pen Script", cursive; }

  .toc-index-btn{ width:100%; border-radius: 12px; padding: 10px 12px; display:flex;
  align-items:center; justify-content:space-between; gap:12px; font-family:"Nanum Pen Script", cursive;
  font-size: 24px; line-height:1.1; background: rgba(255,255,255,0.035); border: 1px solid rgba(255,255,255,0.05);
  color: rgba(230,230,230,0.92); cursor:pointer; user-select:none; -webkit-tap-highlight-color: transparent;
  touch-action: manipulation; transition: transform 160ms ease, background 160ms ease, opacity 160ms ease; opacity:0.92; }
  .toc-index-btn:hover{ opacity:1; transform: translateY(-1px); background: rgba(255,255,255,0.035); }
  .toc-index-btn .hint{ opacity:0.70; font-size: 20px; }

  .menu-sub{ display:grid; gap:3px; font-family:"Nanum Pen Script", cursive; font-size: 22px;
  line-height: 1.35; color: rgba(230,230,230,0.86); }
  .menu-sub a{ color: rgba(230,230,230,0.92); text-decoration:none; border-bottom: 1px solid rgba(230,230,230,0.22); width: fit-content; }
  .menu-sub a:hover{ border-bottom-color: rgba(230,230,230,0.55); }
  .menu-mid{ margin-top: 4px; padding-top: 4px; border-top: 1px solid rgba(255,255,255,0.06); }
  .menu-mid-h{ font-family:"Nanum Pen Script", cursive; font-size: 24px; line-height: 1.1; margin: 0 0 3px 0; color: rgba(235,235,235,0.92); }
  .menu-mid-t{ font-family:"Nanum Pen Script", cursive; font-size: 20px; line-height: 1.35; margin: 0; color: rgba(230,230,230,0.80); }
  .sub-item{ padding-left: 28px; opacity: 0.9; }

  /* INDEX 오버레이 */
  #indexOverlay{ z-index:10001; }
  #aboutOverlay{ z-index:10002; }
  .index-panel{ width:min(720px, 92vw); max-height: min(86vh, 900px); overflow:hidden; padding: 16px 16px 14px; }
  .index-header{ display:flex; align-items:flex-start; justify-content:space-between; gap:12px;
  padding: 2px 2px 10px; padding-right: 56px; }
  .index-title{ font-family:"Nanum Pen Script", cursive; font-size: 26px; line-height:1.1; margin: 0; letter-spacing: 0.2px; }
  .index-sub{ font-family:"Nanum Pen Script", cursive; font-size: 20px; line-height:1.2; opacity:0.74; margin-top: 6px; padding-left: 20px; }
  .index-body{ overflow-y:auto; overflow-x:hidden; max-height: calc(min(86vh, 900px) - 92px); padding: 6px 4px 2px; }

  .index-grid{ display:grid; grid-template-columns: repeat(8, 1fr); gap: 5px; }
#indexGrid.about-mode{ display:block !important; }
#indexGrid.about-mode .about-body,
#aboutGrid.about-mode .about-body{
  padding: 6px 6px 0 6px;
  font-family:"Nanum Pen Script", cursive;
  font-size: 33px;
  line-height: 1.6;
  color: rgba(235,235,235,0.90);
  white-space: pre-wrap;
  word-break: keep-all;
}
#indexGrid.about-mode .about-body p,
#aboutGrid.about-mode .about-body p{
  margin: 0 0 18px 0;
}
#indexGrid.about-mode .about-body p:last-child,
#aboutGrid.about-mode .about-body p:last-child{ margin-bottom:0; }

#aboutOverlay .index-panel{
  width: min(510px, 88vw);
  padding: 24px 32px 40px;
}
#aboutGrid{
  display: block !important;
  width: 100%;
}

  .idx-head{ grid-column: 1 / -1; display:flex; align-items:center; justify-content:space-between;
  padding: 6px 8px 3px; margin-top: 2px; border-top: 1px solid rgba(255,255,255,0.06);
  font-family:"Nanum Pen Script", cursive; font-size: 24px; line-height:1.1; color: rgba(230,230,230,0.92); }

  .idx-tile{ border-radius: 8px; padding: 2px 3px; background: var(--idx-base-bg);
  border: 1px solid var(--idx-base-bd); box-shadow: 0 3px 8px rgba(0,0,0,0.03); display:flex; align-items:center; justify-content:center;
  font-family:"Nanum Pen Script", cursive; font-size: 20px; line-height:1; letter-spacing: 0.1px;
  color: rgba(245,245,245,0.96); text-shadow: 0 0 6px rgba(0,0,0,0.30); cursor:default; user-select:none;
  -webkit-tap-highlight-color: transparent; touch-action: manipulation;
  transition: transform 180ms ease, background 180ms ease, opacity 180ms ease, border-color 180ms ease,
  box-shadow 220ms ease, color 180ms ease, text-shadow 180ms ease;
  opacity:0.96; height: 25px; position:relative; transform: translateZ(0); will-change: transform;
  margin-left: 20px; }
  .idx-tile.idx-clickable{ cursor:pointer; background: rgba(255,255,255,0.035); border-color: rgba(255,255,255,0.20); 
  color: rgba(245,245,245,0.98); }
  .idx-tile.idx-clickable:hover{ opacity:1; transform: translateY(-2px) scale(1.008) translateZ(0);
  background: rgba(255,255,255,0.035); border-color: rgba(255,255,255,0.28); box-shadow: 0 3px 8px rgba(0,0,0,0.03);
  color: rgba(255,255,255,1) !important; text-shadow: 0 0 10px rgba(255,255,255,0.25); }
  .idx-tile.idx-missing{ cursor:default; opacity:0.55; color: rgba(200,200,200,0.75);
  background: rgba(255,255,255,0.035); border-color: rgba(255,255,255,0.04);
  box-shadow: 0 3px 8px rgba(0,0,0,0.03); transform:none !important; text-shadow: 0 0 6px rgba(0,0,0,0.25); }

  .idx-tile[data-title]::after{ content: attr(data-title); position:absolute; bottom: calc(100% + 10px);
  left:50%; transform: translateX(-50%) translateY(6px); padding: 8px 10px; border-radius: 10px;
  background: var(--tip-bg); border: 1px solid var(--tip-bd); color: var(--tip-tx);
  font-family:"Nanum Pen Script", cursive; font-size:18px; line-height:1.2; white-space:nowrap;
  opacity:0; pointer-events:none; transition: opacity 180ms ease, transform 180ms ease; z-index:9999;
  box-shadow: 0 3px 8px rgba(0,0,0,0.03); backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px); }
  .idx-tile[data-title]:hover::after, .idx-tile[data-title]:focus-visible::after{ 
  opacity:1; transform: translateX(-50%) translateY(0); }

  @keyframes idxPulse{
  0%  { box-shadow: 0 3px 8px rgba(0,0,0,0.03); }
  50%  { box-shadow: 0 3px 8px rgba(0,0,0,0.03); }
  100% { box-shadow: 0 3px 8px rgba(0,0,0,0.03); }
  }
  .idx-tile.idx-current{ opacity:1; background: rgba(212,175,55,0.22); border-color: rgba(212,175,55,1); 
  color: rgba(255,250,230,1); text-shadow: 0 0 10px rgba(212,175,55,0.35); 
   }
  .idx-tile.idx-clickable:hover::after, .idx-tile.idx-clickable:focus-visible::after{
  color: var(--toc-active-color) !important; text-shadow: 0 0 10px var(--toc-active-glow) !important;
  border-color: rgba(212,175,55,0.32) !important; }

  #tocPrologue, #tocLoveDream, #tocLoveSong, #tocEpilogue, #tocIndex{ cursor:pointer; }

  /* tocHome - menu-h와 동일 레벨, 클릭 가능 */
  .menu-h-home{
    cursor: pointer;
    transition: opacity 180ms ease;
    opacity: 0.88;
  }
  .menu-h-home:hover{
    opacity: 1;
    text-decoration: underline;
  }
  .menu-section-home{
    padding-bottom: 2px;
  }

  /* 모바일 터치 최적화 */
  html{ touch-action:pan-x pan-y; -webkit-text-size-adjust:100%; }
  body{ overscroll-behavior:none; }
  .square-frame{ touch-action:none; }
  @media (prefers-reduced-motion: reduce){
    *, *::before, *::after{ animation-duration:0.01ms !important; transition-duration:0.01ms !important; }
    .fog.animated{ animation:none !important; }
  }
    

/* ===== 054 UPDATE : 하단 화살표 눌림 효과 ===== */
.nav-arrow.nav-btn:hover{
  transform: translateY(1px) scale(0.98) translateZ(0);
  box-shadow: 0 0 18px rgba(212,175,55,0.18);
}

.nav-arrow.nav-btn:active{
  transform: translateY(2px) scale(0.95) translateZ(0);
}




/* ===== 059 UPDATE : 작품 번호 UI 톤 통일 ===== */
.work-code{
  background: rgba(255,255,255,0.035);
  border: 1px solid rgba(255,255,255,0.05);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  padding: 6px 14px;
  border-radius: 18px;
}

.work-code:hover{
  background: rgba(255,255,255,0.035);
  border-color: rgba(255,255,255,0.05);
  box-shadow: 0 0 18px rgba(212,175,55,0.18);
  transform: translateX(-50%) translateY(calc(-50% + 1px)) scale(0.985) translateZ(0);
}

.work-code span{
  color: rgba(235,235,235,0.58);
  text-shadow: none;
}




/* ===== 064 UPDATE : 버튼 인터랙션 통일 ===== */

.nav-btn:hover{
  transform: translateY(1px) scale(0.985) translateZ(0) !important;
  box-shadow: 0 0 18px rgba(212,175,55,0.18);
}

.nav-btn:active{
  transform: translateY(2px) scale(0.96) translateZ(0) !important;
}
/* 3페이지: 하단 ripple이 sq 경계 아래로 삐져나올 수 있도록 */
#pragueScreen .square-frame{ overflow:visible; }`;

(function(){

const SC = window.THIS_SCENE;
if (!SC) { console.error("THIS_SCENE not defined"); return; }

// ===== 디바이스 감지 =====
const isMobile = (() => {
  const forced = (() => { try { return localStorage.getItem("force_device"); } catch(e) { return null; } })();
  if (forced === "M") return true;
  if (forced === "PC") return false;
  return /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
})();

// ===== CSS 인라인 삽입 (로딩 타이밍 문제 완전 제거) =====
const styleEl = document.createElement("style");
styleEl.textContent = isMobile ? CSS_MOBILE : CSS_DESKTOP;
document.head.appendChild(styleEl);

// ===== 언어 감지 =====
const detectLang = () => {
  try {
    const key = isMobile ? "m_lang" : "d_lang";
    const s = localStorage.getItem(key) || localStorage.getItem("lang");
    if (s === "KR" || s === "EN") return s;
  } catch(e) {}
  return (navigator.language||"en").toLowerCase().startsWith("ko") ? "KR" : "EN";
};
let curLang = detectLang();
const saveLang = (l) => {
  try {
    localStorage.setItem(isMobile ? "m_lang" : "d_lang", l);
    localStorage.setItem("lang", l);
  } catch(e) {}
};

// ===== 공통 데이터 =====
const SCENES_ALL = [
  {id:"fog",      code:"LPL#01",kr:"안개가 휘감은 세상",                       en:"A world wrapped in fog",                               file:"LPL_01"},
  {id:"LPL_02",   code:"LPL#02",kr:"무채색 풍경 위에 당신의 온기가 스며들면",   en:"When your warmth seeps into the monochrome landscape",  file:"LPL_02"},
  {id:"LPL_03",   code:"LPL#03",kr:"세상은 본연의 모습을 되찾고",               en:"The world regains its true colors",                    file:"LPL_03"},
  {id:"dreams",   code:"LPL#04",kr:"그 따스한 품안에서 사랑의 꿈이 일렁입니다", en:"In that warm embrace, dreams of love ripple",           file:"LPL_04"},
  {id:"rest01",   code:"",      kr:"",                                         en:"",                                                    file:"rest01"},
  {id:"dreams00", code:"LDR#00",kr:"사랑의 꿈은",                              en:"Dreams of love",                                       file:"LDR_00"},
  {id:"dreams01", code:"LDR#11",kr:"이끌림을 따라",                            en:"Following the pull",                                   file:"LDR_11"},
  {id:"dreams02", code:"LDR#21",kr:"설렘에 실려",                              en:"Carried by excitement",                                file:"LDR_21"},
  {id:"dreams03", code:"LDR#31",kr:"그리움과 함께 넓어지며",                   en:"Expanding with longing",                               file:"LDR_31"},
  {id:"dreams04", code:"LDR#41",kr:"애틋함으로 깊어져",                        en:"Deepening with tenderness",                            file:"LDR_41"},
  {id:"dreams05", code:"LDR#51",kr:"행복의 바다에 이르고",                     en:"Reaching the sea of happiness",                        file:"LDR_51"},
  {id:"rest02",   code:"",      kr:"",                                         en:"",                                                    file:"rest02"},
  {id:"song01",   code:"LSN#01",kr:"사랑의 노래가 되어",                       en:"Becoming a song of love",                              file:"LSN_01"},
  {id:"song02",   code:"LSN#02",kr:"당신만을 바라고 또 바라 봅니다",            en:"I gaze at you, and gaze again",                        file:"LSN_02"},
  {id:"rest04",   code:"",      kr:"",                en:"",            file:"rest04"},
  {id:"song03",   code:"LSN#03",kr:"어제, 오늘 그리고 내일",                   en:"Yesterday, today, and tomorrow",                       file:"LSN_03"},
  {id:"song04",   code:"LSN#04",kr:"하루의 모든 순간",                         en:"Every moment of the day",                              file:"LSN_04"},
  {id:"song05",   code:"LSN#05",kr:"잠 못 이루는 밤",                          en:"Sleepless nights",                                     file:"LSN_05"},
  {id:"song06",   code:"LSN#06",kr:"꿈속에서도",                               en:"Even in dreams",                                       file:"LSN_06"},
  {id:"song07",   code:"LSN#07",kr:"내가 머물고 싶은 공간",                    en:"The space I want to dwell",                            file:"LSN_07"},
  {id:"song08",   code:"LSN#08",kr:"끝없이 샘솟는 기쁨",                       en:"Endlessly springing joy",                              file:"LSN_08"},
  {id:"song09",   code:"LSN#09",kr:"마음을 울리는 노래 속에도",                en:"Even in songs that move my heart",                     file:"LSN_09"},
  {id:"song10",   code:"LSN#10",kr:"언제나 당신이 있습니다",                   en:"You are always there",                                 file:"LSN_10"},
  {id:"rest05",   code:"",      kr:"",                                         en:"",                                                    file:"rest05"},
  {id:"song11",   code:"LSN#11",kr:"당신의",                                   en:"Your",                                                 file:"LSN_11"},
  {id:"song12",   code:"LSN#12",kr:"해맑은 미소와 따스한 온기에",              en:"Pure smile and warm embrace",                          file:"LSN_12"},
  {id:"song13",   code:"LSN#13",kr:"모든 순간이 낙원이 되고",                  en:"Every moment becomes paradise",                        file:"LSN_13"},
  {id:"song14",   code:"LSN#14",kr:"온 세상이 사랑으로 물들면",                en:"When the whole world is tinted with love",             file:"LSN_14"},
  {id:"song15",   code:"LSN#15",kr:"나는 당신의 사랑안에서",                   en:"In your love",                                         file:"LSN_15"},
  {id:"song16",   code:"LSN#16",kr:"새로이 태어납니다",                        en:"I am born anew",                                       file:"LSN_16"},
  {id:"rest03",   code:"",      kr:"",                                         en:"",                                                    file:"rest03"},
  {id:"LEL_01", code:"LEL#01",kr:"사랑이 감싸 안은 세상",                    en:"A world embraced by love",                             file:"LEL_01"},
];

const INDEX_ROWS = [
  {type:"head",label:"LPL (Prologue)"},
  {type:"item",code:"LPL#01"},{type:"item",code:"LPL#02"},{type:"item",code:"LPL#03"},{type:"item",code:"LPL#04"},
  {type:"head",label:"LDR (Love Dream)"},
  {type:"item",code:"LDR#00"},
  {type:"item",code:"LDR#11"},{type:"item",code:"LDR#12"},{type:"item",code:"LDR#13"},
  {type:"item",code:"LDR#21"},{type:"item",code:"LDR#22"},{type:"item",code:"LDR#23"},
  {type:"item",code:"LDR#31"},{type:"item",code:"LDR#32"},{type:"item",code:"LDR#33"},
  {type:"item",code:"LDR#41"},{type:"item",code:"LDR#42"},{type:"item",code:"LDR#43"},
  {type:"item",code:"LDR#51"},{type:"item",code:"LDR#52"},{type:"item",code:"LDR#53"},
  {type:"head",label:"LSN (Love Song)"},
  {type:"item",code:"LSN#01"},{type:"item",code:"LSN#02"},
  {type:"item",code:"LSN#03"},{type:"item",code:"LSN#04"},{type:"item",code:"LSN#05"},{type:"item",code:"LSN#06"},
  {type:"item",code:"LSN#07"},{type:"item",code:"LSN#08"},{type:"item",code:"LSN#09"},{type:"item",code:"LSN#10"},
  {type:"item",code:"LSN#11"},{type:"item",code:"LSN#12"},{type:"item",code:"LSN#13"},{type:"item",code:"LSN#14"},
  {type:"item",code:"LSN#15"},{type:"item",code:"LSN#16"},
  {type:"head",label:"LRS (Love Resonance)"},{type:"item",code:"LRS#01"},
  {type:"head",label:"LDN (Love Dance)"},
  {type:"item",code:"LDN#01"},{type:"item",code:"LDN#02"},{type:"item",code:"LDN#03"},{type:"item",code:"LDN#04"},
  {type:"head",label:"LCR (Love Chorus)"},{type:"item",code:"LCR#01"},
  {type:"head",label:"LEL (Epilogue)"},{type:"item",code:"LEL#01"}
];

const LANG_TEXTS = {
  KR:{tocTitle:"메뉴",menuH_TOC:"목차",menuH_INDEX:"색인",menuH_CONTACT:"연락처",
      menuH_ABOUT:"작가의 말",aboutTitle:"작가의 말",aboutBody:`narida.

내리다의 옛말.

빛이 내리고,
마음이 내리고,
꿈이 내리는 세상에

당신이 내려오면,

세상과 마음은 서로에게 스며들고,
모든 순간은 아름답게 수놓아집니다.`,menuH_COPY:"저작권",
      homeText:"사랑의 모든 순간은 당신으로 열립니다",
      prologue:"프롤로그",lovedream:"사랑의 꿈 (일부 공개)",lovesong:"사랑의 노래",
      resonance:"사랑의 공명 (잠김)",dance:"사랑의 춤 (잠김)",chorus:"사랑의 합창 (잠김)",
      epilogue:"에필로그",indexList:"작품 목록",
      indexTitle:"색인",indexSub:"존재하는 작품은 클릭하면 바로 이동합니다",
      infoBack:"뒤로",infoHelpTitle:"사용법",
      infoNav:"이전 / 다음 작품",infoMenu:"메뉴 열기 / 닫기",
      infoIndex:"작품 목록 열기 / 닫기",infoHelp:"도움말 열기 / 닫기",
      infoP:"사진만 보기",infoT:"사진 + 텍스트 보기",infoA:"전체 UI 보기",
      infoEsc:"닫기 / 전체 UI 복귀",copyright:"© Vitro Narida. All rights reserved."},
  EN:{tocTitle:"Menu",menuH_TOC:"Contents",menuH_INDEX:"Index",menuH_CONTACT:"Contact",
      menuH_ABOUT:"About",aboutTitle:"Artist’s Note",aboutBody:`narida.

An old Korean word for to descend.

Where light descends,
where the heart descends,
where dreams descend.

When you descend into this world,

the world and the heart soften into one another,
and every moment is delicately woven.`,menuH_COPY:"Copyright",
      homeText:"Every moment of love opens with you.",
      prologue:"Prologue",lovedream:"Love Dream (Selection)",lovesong:"Love Song",
      resonance:"Love Resonance (locked)",dance:"Love Dance (locked)",chorus:"Love Chorus (locked)",
      epilogue:"Epilogue",indexList:"Artwork List",
      indexTitle:"Index",indexSub:"Click on existing artworks to navigate",
      infoBack:"Back",infoHelpTitle:"How to Use",
      infoNav:"Prev / Next",infoMenu:"Open / Close Menu",
      infoIndex:"Open / Close Index",infoHelp:"Open / Close Help",
      infoP:"Photo Only",infoT:"Photo + Text",infoA:"Full UI",
      infoEsc:"Close / Restore Full UI",copyright:"© Vitro Narida. All rights reserved."}
};

const goTo = (url) => {
  if (!url) return;
  const bo = document.getElementById("blackout");
  if (bo) { bo.classList.add("on"); setTimeout(() => { location.href = url; }, 200); }
  else { location.href = url; }
};

// ===== TOC HTML 생성 (버전별) =====
const buildTOCHTML = () => {
  const t = LANG_TEXTS[curLang];
  if (isMobile) {
    return `
    <div id="tocOverlay" class="overlay-panel" aria-hidden="true">
      <div class="overlay-backdrop" id="tocBackdrop"></div>
      <div class="toc-panel">
        <div class="toc-handle"></div>
        <div class="toc-header">
          <h2 class="toc-title" id="tocTitle">${t.tocTitle}</h2>
          <div style="display:flex;align-items:center;gap:8px;">
            <div class="lang-toggle">
              <div class="lang-btn${curLang==="KR"?" active":""}" id="langKR">KR</div>
              <div class="lang-btn${curLang==="EN"?" active":""}" id="langEN">EN</div>
            </div>
            <div class="toc-close" id="tocClose">✕</div>
          </div>
        </div>
        <div class="menu-section">
          <h3 class="menu-h" id="menuH_HOME" style="cursor:pointer;">${t.homeText}</h3>
        </div>
        <div class="menu-section">
          <h3 class="menu-h" id="menuH_TOC">${t.menuH_TOC}</h3>
          <ul class="toc-list">
            <li class="toc-item${SC.tocSection==="prologue"?" toc-current":""}" id="tocPrologue"><span class="toc-bullet">●</span><span class="toc-text">${t.prologue}</span></li>
            <li class="toc-item${SC.tocSection==="lovedream"?" toc-current":""}" id="tocLoveDream"><span class="toc-bullet">●</span><span class="toc-text">${t.lovedream}</span></li>
            <li class="toc-item${SC.tocSection==="lovesong"?" toc-current":""}" id="tocLoveSong"><span class="toc-bullet">●</span><span class="toc-text">${t.lovesong}</span></li>
            <li class="toc-item toc-locked" id="tocResonance"><span class="toc-bullet">●</span><span class="toc-text">${t.resonance}</span></li>
            <li class="toc-item toc-locked" id="tocDance"><span class="toc-bullet">●</span><span class="toc-text">${t.dance}</span></li>
            <li class="toc-item toc-locked" id="tocChorus"><span class="toc-bullet">●</span><span class="toc-text">${t.chorus}</span></li>
            <li class="toc-item${SC.tocSection==="epilogue"?" toc-current":""}" id="tocEpilogue"><span class="toc-bullet">●</span><span class="toc-text">${t.epilogue}</span></li>
          </ul>
        </div>
        <div class="menu-section">
          <h3 class="menu-h menu-h-link" id="menuH_INDEX">${t.menuH_INDEX}</h3>
          <div class="menu-sub">
            <div id="tocIndex" style="cursor:pointer;">${t.indexList}</div>
          </div>
        </div>
        <div class="menu-section">
          <h3 class="menu-h">${t.menuH_CONTACT}</h3>
          <div class="menu-sub">
            <div>E-Mail : <a href="mailto:vitro@narida.art">vitro@narida.art</a></div>
            <div>Instagram : <a href="https://instagram.com/vitro.narida" target="_blank" rel="noopener">vitro.narida</a></div>
          </div>
        </div>
        <div class="menu-section">
          <h3 class="menu-h">${t.menuH_COPY}</h3>
          <div class="menu-sub" id="copyrightLine">${t.copyright}</div>
        </div>
      </div>
    </div>
    <div id="indexOverlay" class="overlay-panel" aria-hidden="true">
      <div class="overlay-backdrop" id="indexBackdrop"></div>
      <div class="index-panel">
        <div class="toc-handle"></div>
        <div class="toc-header" style="margin-bottom:8px;">
          <div>
            <h2 class="index-title" id="indexTitle">${t.indexTitle}</h2>
          </div>
          <div class="toc-close" id="indexClose">✕</div>
        </div>
        <div class="index-grid" id="indexGrid"></div>
      </div>
    </div>
    <div id="aboutOverlay" class="overlay-panel" aria-hidden="true" style="display:none;">
      <div class="overlay-backdrop" id="aboutBackdrop"></div>
      <div class="index-panel">
        <div class="toc-handle"></div>
        <div class="toc-header" style="margin-bottom:8px;">
          <div>
            <h2 class="index-title" id="aboutTitle"></h2>
          </div>
          <div class="toc-close" id="aboutClose">✕</div>
        </div>
        <div class="index-grid about-mode" id="aboutGrid"></div>
      </div>
    </div>`;
  } else {
    // 데스크탑
    return `
    <a href="#mainContent" class="skip-link">Skip to main content</a>
    <div id="blackout" aria-hidden="true"></div>
    <div id="tocOverlay" class="overlay-panel" aria-hidden="true">
      <div class="overlay-backdrop" id="tocBackdrop"></div>
      <div class="toc-panel panel-box" role="dialog" aria-modal="true" aria-label="Menu">
        <div class="toc-close" id="tocClose" aria-label="Close">✕</div>
        <div class="toc-info-btn" id="tocInfoBtn" aria-label="Information" tabindex="0">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:18px;height:18px;"><path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.064.852l-.708 2.836a.75.75 0 0 0 1.064.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" /></svg>
        </div>
        <div class="toc-main">
          <div class="toc-header">
            <h2 class="toc-title" id="tocTitle">${t.tocTitle}</h2>
            <div class="langToggle">
              <div class="langBtn${curLang==="EN"?" active":""}" id="langEN" role="button" tabindex="0">EN</div>
              <div class="langBtn${curLang==="KR"?" active":""}" id="langKR" role="button" tabindex="0">KR</div>
            </div>
          </div>
          <div class="menu-section">
            <h3 class="menu-h menu-h-link" id="menuH_ABOUT" tabindex="0">${t.menuH_ABOUT}</h3>
          </div>
          <div class="menu-section menu-section-home">
            <h3 class="menu-h menu-h-home" id="tocHome" tabindex="0">${t.homeText}</h3>
          </div>
          <div class="menu-section">
            <h3 class="menu-h" id="menuH_TOC">${t.menuH_TOC}</h3>
            <ul class="toc-list">
              <li class="toc-item${SC.tocSection==="prologue"?" toc-current":""}" id="tocPrologue"><span class="toc-bullet">●</span><span class="toc-text">${t.prologue}</span></li>
              <li class="toc-item${SC.tocSection==="lovedream"?" toc-current":""}" id="tocLoveDream"><span class="toc-bullet">●</span><span class="toc-text">${t.lovedream}</span></li>
              <li class="toc-item${SC.tocSection==="lovesong"?" toc-current":""}" id="tocLoveSong"><span class="toc-bullet">●</span><span class="toc-text">${t.lovesong}</span></li>
              <li class="toc-item toc-locked" id="tocResonance"><span class="toc-bullet">●</span><span class="toc-text">${t.resonance}</span></li>
              <li class="toc-item toc-locked" id="tocDance"><span class="toc-bullet">●</span><span class="toc-text">${t.dance}</span></li>
              <li class="toc-item toc-locked" id="tocChorus"><span class="toc-bullet">●</span><span class="toc-text">${t.chorus}</span></li>
              <li class="toc-item${SC.tocSection==="epilogue"?" toc-current":""}" id="tocEpilogue"><span class="toc-bullet">●</span><span class="toc-text">${t.epilogue}</span></li>
            </ul>
          </div>
          <div class="menu-section">
            <h3 class="menu-h menu-h-link" id="menuH_INDEX" tabindex="0">${t.menuH_INDEX}</h3>
          </div>
          <div class="menu-section">
            <h3 class="menu-h" id="menuH_CONTACT">${t.menuH_CONTACT}</h3>
            <div class="menu-sub" id="tocMeta">
              <div class="sub-item">E-Mail : <a href="mailto:vitro@narida.art">vitro@narida.art</a></div>
              <div class="sub-item">Instagram : <a href="https://instagram.com/vitro.narida" target="_blank" rel="noopener noreferrer">vitro.narida</a></div>
            </div>
          </div>
          <div class="menu-section">
            <h3 class="menu-h" id="menuH_COPY">${t.menuH_COPY}</h3>
            <div class="menu-sub"><div class="sub-item" id="copyrightLine">${t.copyright}</div></div>
          </div>
        </div>
        <div class="toc-info-panel" id="tocInfoPanel">
          <button class="info-back-btn" id="tocInfoBack">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:16px;height:16px;"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" /></svg>
            <span id="infoBackLabel">${t.infoBack}</span>
          </button>
          <div class="info-section">
            <div class="info-section-h" id="infoHelpTitle">${t.infoHelpTitle}</div>
            <div class="info-row"><kbd>← →</kbd> <span id="infoNav">${t.infoNav}</span></div>
            <div class="info-row"><kbd>M</kbd> <span id="infoMenu">${t.infoMenu}</span></div>
            <div class="info-row"><kbd>I</kbd> <span id="infoIndex">${t.infoIndex}</span></div>
            <div class="info-row"><kbd>H</kbd> <span id="infoHelp">${t.infoHelp}</span></div>
            <div class="info-row"><kbd>P</kbd> <span id="infoP">${t.infoP}</span></div>
            <div class="info-row"><kbd>T</kbd> <span id="infoT">${t.infoT}</span></div>
            <div class="info-row"><kbd>A</kbd> <span id="infoA">${t.infoA}</span></div>
            <div class="info-row"><kbd>Esc</kbd> <span id="infoEsc">${t.infoEsc}</span></div>
          </div>
        </div>
      </div>
    </div>
    <div id="indexOverlay" class="overlay-panel" aria-hidden="true">
      <div class="overlay-backdrop" id="indexBackdrop"></div>
      <div class="index-panel panel-box" role="dialog" aria-modal="true">
        <div class="index-close" id="indexClose" aria-label="Close">✕</div>
        <div class="index-header">
          <div>
            <h2 class="index-title" id="indexTitle">${t.indexTitle}</h2>
            <div class="index-sub" id="indexSub">${t.indexSub}</div>
          </div>
        </div>
        <div class="index-body">
          <div class="index-grid" id="indexGrid"></div>
        </div>
      </div>
    </div>
    <div id="aboutOverlay" class="overlay-panel" aria-hidden="true" style="display:none;">
      <div class="overlay-backdrop" id="aboutBackdrop"></div>
      <div class="index-panel panel-box" role="dialog" aria-modal="true">
        <div class="index-close" id="aboutClose" aria-label="Close">✕</div>
        <div class="index-header">
          <div>
            <h2 class="index-title" id="aboutTitle"></h2>
          </div>
        </div>
        <div class="index-body">
          <div class="index-grid about-mode" id="aboutGrid"></div>
        </div>
      </div>
    </div>
    <div id="app" role="main"></div>
    <span id="mainContent" aria-hidden="true" style="position:absolute;top:0;left:0;"></span>`;
  }
};

// ===== 페이지에 DOM 삽입 =====
if (isMobile) {
  // 모바일: blackout + app 먼저, TOC/INDEX는 맨 뒤 (position:fixed, z-index:1000)
  const bo = document.createElement("div"); bo.id="blackout";
  document.body.appendChild(bo);
  const appEl = document.createElement("div"); appEl.id="app";
  document.body.appendChild(appEl);
  document.body.insertAdjacentHTML("beforeend", buildTOCHTML());
} else {
  document.body.insertAdjacentHTML("afterbegin", buildTOCHTML());
}

// ===== INDEX 렌더 =====
const renderIndex = () => {
  const grid = document.getElementById("indexGrid"); if (!grid) return;
  grid.innerHTML = "";
  const codeToFile = {}, codeToTitle = {};
  SCENES_ALL.forEach(sc => {
    if (sc.code) { codeToFile[sc.code]=sc.file; codeToTitle[sc.code]=curLang==="KR"?sc.kr:sc.en; }
  });
  INDEX_ROWS.forEach(row => {
    if (row.type==="head") {
      const h=document.createElement("div"); h.className="idx-head"; h.textContent=row.label;
      grid.appendChild(h); return;
    }
    const code=row.code, has=!!codeToFile[code];
    const tile=document.createElement("div");
    tile.className="idx-tile"+(has?" idx-clickable":" idx-missing");
    tile.textContent=code;
    if (code===SC.code) tile.classList.add("idx-current");
    if (has) {
      const h=(e)=>{e.preventDefault();e.stopPropagation();goTo("./"+codeToFile[code]+".html");};
      tile.addEventListener("click",h);
      tile.addEventListener("touchend",(e)=>{e.preventDefault();h(e);});
    }
    grid.appendChild(tile);
  });
};

// ===== TOC/INDEX 오버레이 =====
const TOCManager = {
  open: () => {
    const ov=document.getElementById("tocOverlay");
    ov.classList.add("on"); ov.setAttribute("aria-hidden","false");
  },
  close: () => {
    const ov=document.getElementById("tocOverlay");
    ov.classList.remove("on"); ov.setAttribute("aria-hidden","true");
    document.querySelector(".toc-panel")?.classList.remove("show-info");
  }
};
const IndexManager = {
  open: () => {
    TOCManager.close();
    renderIndex();
    const ov=document.getElementById("indexOverlay");
    if(ov){ ov.style.display="flex"; }
    ov.classList.add("on"); ov.setAttribute("aria-hidden","false");
  },
  close: () => {
    const ov=document.getElementById("indexOverlay");
    ov.classList.remove("on"); ov.setAttribute("aria-hidden","true");
    const grid=document.getElementById("indexGrid");
    grid?.classList.remove("about-mode");
    // ✅ 잔상 방지: 페이드아웃 종료 후 내용 정리
    setTimeout(()=>{
      if(ov) ov.style.display="none";
      if(grid && grid.classList.contains("about-mode")==false){ /* noop */ }
      // about 모드였든 아니든, 잔상 방지 차원에서 내부를 정리
      if(grid){ grid.innerHTML = ""; }
    }, 420);
  }
};

const AboutManager = {
  open: () => {
    TOCManager.close();
    const t = LANG_TEXTS[curLang] || LANG_TEXTS.KR;
    const ov = document.getElementById("aboutOverlay");
    const titleEl = document.getElementById("aboutTitle");
    const grid = document.getElementById("aboutGrid");
    if (!ov || !titleEl || !grid) return;

    titleEl.textContent = t.aboutTitle || t.menuH_ABOUT || "";

    const parts = String(t.aboutBody||"").trim().split(/\n\s*\n/);
    const bodyHTML = parts.map(p => `<p>${p.replace(/\n/g,"<br>")}</p>`).join("");
    grid.innerHTML = `<div class="about-body">${bodyHTML}</div>`;

    ov.style.display="flex";
    ov.classList.add("on");
    ov.setAttribute("aria-hidden","false");
  },
  close: () => {
    const ov = document.getElementById("aboutOverlay");
    if (!ov) return;
    ov.classList.remove("on");
    ov.setAttribute("aria-hidden","true");
    setTimeout(() => {
      ov.style.display = "none";
    }, 420);
  }
};

// ===== 언어 전환 =====
const setLang = (l) => {
  saveLang(l);
  try{sessionStorage.removeItem("gl_mode");}catch(e){}
  location.reload();
};

// ===== 공통 이벤트 바인딩 =====
const bindCommon = () => {
  document.getElementById("tocBackdrop")?.addEventListener("click", TOCManager.close);
  document.getElementById("tocClose")?.addEventListener("click", TOCManager.close);
  document.getElementById("indexBackdrop")?.addEventListener("click", IndexManager.close);
  document.getElementById("indexClose")?.addEventListener("click", IndexManager.close);
  document.getElementById("aboutBackdrop")?.addEventListener("click", AboutManager.close);
  document.getElementById("aboutClose")?.addEventListener("click", AboutManager.close);
  document.getElementById("langKR")?.addEventListener("click", ()=>setLang("KR"));
  document.getElementById("langEN")?.addEventListener("click", ()=>setLang("EN"));

  const tocNav = {tocPrologue:"LPL_01",tocLoveDream:"LDR_00",tocLoveSong:"LSN_01",tocEpilogue:"LEL_01"};
  Object.entries(tocNav).forEach(([id,file])=>{
    document.getElementById(id)?.addEventListener("click",(e)=>{
      e.preventDefault(); TOCManager.close();
      setTimeout(()=>goTo("./"+file+".html"),200);
    });
  });
  const tocIndex=document.getElementById("tocIndex");
  tocIndex?.addEventListener("click",(e)=>{e.preventDefault();e.stopPropagation();IndexManager.open();});
  document.getElementById("menuH_INDEX")?.addEventListener("click",IndexManager.open);
  document.getElementById("menuH_ABOUT")?.addEventListener("click",(e)=>{e.preventDefault();e.stopPropagation();AboutManager.open();});
  document.getElementById("menuH_ABOUT")?.addEventListener("keydown",(e)=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();AboutManager.open();}});
  document.getElementById("menuH_INDEX")?.addEventListener("keydown",(e)=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();IndexManager.open();}});

  const homeEl=document.getElementById("tocHome")||document.getElementById("menuH_HOME");
  homeEl?.addEventListener("click",(e)=>{e.preventDefault();TOCManager.close();try{sessionStorage.removeItem("gl_mode");}catch(e){}setTimeout(()=>goTo("../index.html"),200);});
};

// =========================================
// ===== 모바일 렌더링 =====
// =========================================
if (isMobile) {
  const app = document.getElementById("app");

  // 사진 영역
  const photoArea = document.createElement("div");
  photoArea.className = "photo-area";

  const textEl = document.createElement("div");
  textEl.id = "mSceneText";
  textEl.className = SC.type==="rest" ? "scene-text rest-text" : "scene-text";
  textEl.textContent = curLang==="KR" ? SC.textKR : SC.textEN;

  if (SC.type === "rest") {
    const hasPrev=!!SC.prevURL, hasNext=!!SC.nextURL;
    photoArea.innerHTML = `<div class="rest-photo"><div class="rest-ui"><span class="rest-dot" style="animation-delay:0ms;--bounce-h:-10px"></span><span class="rest-dot" style="animation-delay:110ms;--bounce-h:-7px"></span><span class="rest-dot" style="animation-delay:220ms;--bounce-h:-5px"></span><span class="rest-dot" style="animation-delay:330ms;--bounce-h:-3px"></span><span class="rest-dot" style="animation-delay:440ms;--bounce-h:-1px"></span><span class="rest-triangle" style="animation-delay:440ms"></span></div></div>`;
    textEl.classList.add("show");
  } else {
    const img = document.createElement("img");
    img.className="scene-img"; img.id="mSceneImg"; img.alt=SC.code||"";
    img.src = SC.imgSrc;
    const onLoad = () => {
      img.classList.add("show");
      setTimeout(()=>textEl.classList.add("show"), 400);
    };
    if(img.complete&&img.naturalWidth>0){onLoad();}
    else{
      img.addEventListener("load",onLoad,{once:true});
      const poll=setInterval(()=>{if(img.naturalWidth>0){clearInterval(poll);onLoad();}},16);
      img.addEventListener("load",()=>clearInterval(poll),{once:true});
    }
    photoArea.appendChild(img);
  }

  // 컨트롤 영역
  const ctrlArea = document.createElement("div");
  ctrlArea.className = "control-area";

  const codeEl = document.createElement("div");
  codeEl.className = "work-code";
  codeEl.textContent = SC.code ? `Op. ${SC.code}` : "";
  if (SC.code) { codeEl.style.cursor="pointer"; codeEl.addEventListener("click", IndexManager.open); }

  // 네비바
  const navBar = document.createElement("div"); navBar.className = "nav-bar";

  const leftBtn = document.createElement("div");
  if (!SC.prevURL && SC.pageNum===1) {
    leftBtn.className = "nav-btn";
    leftBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:26px;height:26px;"><path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" /></svg>`;
    leftBtn.addEventListener("click",(e)=>{e.preventDefault();e.stopPropagation();AboutManager.open();});
  } else {
    leftBtn.className = "nav-btn" + (SC.prevURL ? "" : " disabled");
    leftBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:26px;height:26px;"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" /></svg>`;
    if (SC.prevURL) leftBtn.addEventListener("click", ()=>goTo(SC.prevURL));
  }
const menuBtn = document.createElement("div"); menuBtn.className = "nav-btn";
  menuBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:26px;height:26px;"><path stroke-linecap="round" stroke-linejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" /></svg>`;
  menuBtn.addEventListener("click", TOCManager.open);

  const indexBtn = document.createElement("div"); indexBtn.className = "nav-btn";
  indexBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:26px;height:26px;"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"/></svg>`;
  indexBtn.addEventListener("click", IndexManager.open);

  const rightBtn = document.createElement("div");
  rightBtn.className = "nav-btn" + (SC.nextURL ? "" : " disabled");
  rightBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:26px;height:26px;"><path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>`;
  if (SC.nextURL) rightBtn.addEventListener("click", ()=>goTo(SC.nextURL));

  navBar.append(leftBtn, menuBtn, indexBtn, rightBtn);

  const counter = document.createElement("div");
  counter.className = "page-counter";
  counter.textContent = `P.${SC.pageNum} / ${SC.totalPages}`;

  ctrlArea.append(codeEl, textEl, navBar, counter);
  app.append(photoArea, ctrlArea);

  // 스와이프
  let tx=0, ty=0;
  photoArea.addEventListener("touchstart",(e)=>{tx=e.touches[0].clientX;ty=e.touches[0].clientY;},{passive:true});
  photoArea.addEventListener("touchend",(e)=>{
    const dx=e.changedTouches[0].clientX-tx, dy=e.changedTouches[0].clientY-ty;
    if(Math.abs(dx)>Math.abs(dy)&&Math.abs(dx)>50){
      if(dx<0&&SC.nextURL) goTo(SC.nextURL);
      else if(dx>0&&SC.prevURL) goTo(SC.prevURL);
    }
  },{passive:true});

  // 키보드
  document.addEventListener("keydown",(e)=>{
    const menuOn=document.getElementById("tocOverlay").classList.contains("on");
    const indexOn=document.getElementById("indexOverlay").classList.contains("on");
    const aboutOn=document.getElementById("aboutOverlay")?.classList.contains("on");
    if(e.key==="Escape"){if(aboutOn)AboutManager.close();else if(indexOn)IndexManager.close();else if(menuOn)TOCManager.close();return;}
    if(menuOn||indexOn||aboutOn)return;
    if(e.key==="ArrowRight"||e.key==="ArrowDown"||e.key==="Enter"){e.preventDefault();goTo(SC.nextURL);}
    else if(e.key==="ArrowLeft"||e.key==="ArrowUp"){e.preventDefault();goTo(SC.prevURL);}
  });

// =========================================
// ===== 데스크탑 렌더링 =====
// =========================================
} else {
  const CSSV={get:(p)=>parseInt(getComputedStyle(document.documentElement).getPropertyValue(p))||0};
  const TIMING={
    SCENE_TEXT:()=>CSSV.get('--scene-text-delay'),
    FOG_MIN_LQIP:()=>CSSV.get('--fog-min-lqip'),
    FOG_TEXT:()=>CSSV.get('--fog-text-delay'),
    FOG_HQ:()=>CSSV.get('--fog-hq-fade'),
    MENU_OUT:()=>CSSV.get('--menu-fade-out')
  };

  const app=document.getElementById("app");
  const frame=document.createElement("section");
  frame.className="screen visible scene"; frame.id=SC.id+"Screen";
  const wrap=document.createElement("div"); wrap.className="scene-wrap";
  const sq=document.createElement("div"); sq.className="square-frame"; sq.id="mainContent";

  const workCode=document.createElement("div");
  workCode.className="work-code"; workCode.setAttribute("tabindex","0");
  workCode.innerHTML=SC.code
    ?`Op. ${SC.code}<span class="page-num">&nbsp; P.${SC.pageNum}/${SC.totalPages}</span>`
    :`<span class="page-num">P.${SC.pageNum}/${SC.totalPages}</span>`;
  workCode.setAttribute("data-tip", curLang==="KR" ? "색인" : "Index");

  const menuBtn=document.createElement("div");
  menuBtn.className="nav-menu nav-btn";
  menuBtn.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:28px;height:28px;"><path stroke-linecap="round" stroke-linejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" /></svg>`;
  menuBtn.setAttribute("data-tip", curLang==="KR" ? "메뉴" : "Menu");

  const uiBtn=document.createElement("div");
  uiBtn.className="soloToggle nav-btn";
  uiBtn.style.opacity="0";
  uiBtn.style.visibility="hidden";
  (function(){
    const MODES=["all","phototext","photo"];
    const tipKR={all:"보기 모드: 사진+텍스트", phototext:"보기 모드: 사진만", photo:"보기 모드: 전체"};
    const tipEN={all:"View: Photo + Text", phototext:"View: Photo only", photo:"View: All"};
    const modeToTip={1:"photo",2:"phototext"};
    window.__refreshViewModeTip = ()=>{
      const m=modeToTip[uiMode]||"all";
      uiBtn.setAttribute("data-tip",(curLang==="KR"?tipKR:tipEN)[m]);
    };
  })();

  sq.append(workCode,menuBtn,uiBtn);

  if(SC.type==="fog"){
    const hero=document.createElement("section"); hero.className="hero"; hero.id="hero";
    const lqip=document.createElement("img"); lqip.className="bg fog-lqip"; lqip.src="../assets/LPL_01_lqip.webp"; lqip.alt=""; lqip.setAttribute("aria-hidden","true");
    const hq=document.createElement("img"); hq.className="bg fog-hq"; hq.id="fogHq"; hq.alt="";
    const ov=document.createElement("div"); ov.className="overlay";
    const fog=document.createElement("div"); fog.className="fog"; fog.id="fogNoise"; fog.setAttribute("aria-hidden","true");
    const txt=document.createElement("div"); txt.className="fog-text long-text"; txt.id="fogText";
    txt.textContent=curLang==="KR"?SC.textKR:SC.textEN;
    hero.append(lqip,hq,ov,fog,txt); sq.appendChild(hero);
  } else if(SC.type==="img"){
    const img=document.createElement("img"); img.className="scene-img"; img.id=SC.id+"Img"; img.alt=SC.code||""; img.src=SC.imgSrc;
    const txt=document.createElement("div"); txt.className="scene-text long-text"; txt.id=SC.id+"Text";
    txt.textContent=curLang==="KR"?SC.textKR:SC.textEN;
    sq.append(img,txt);
    if(!isMobile&&(SC.id==="prague"||SC.id==="dreams")){
      const fn=SC.id==="prague"?initRipple:initRippleTop;
      const startRipple=()=>{if(img._rippleStarted)return;img._rippleStarted=true;fn(img,sq);};
      if(img.complete&&img.naturalWidth>0){startRipple();}
      else{
        img.addEventListener("load",startRipple,{once:true});
        const poll=setInterval(()=>{if(img.naturalWidth>0){clearInterval(poll);startRipple();}},16);
        img.addEventListener("load",()=>clearInterval(poll),{once:true});
      }
      window.addEventListener("pageshow",(e)=>{
        if(e.persisted){
          img._rippleStarted=false;
          startRipple();
          // visibilitychange 강제 발생 - alt+tab 효과와 동일
          setTimeout(()=>{
            document.dispatchEvent(new Event("visibilitychange"));
          }, 100);
        }
      });
    }
  } else {
    const txt=document.createElement("div"); txt.className="scene-text long-text"; txt.id=SC.id+"Text";
    txt.textContent=curLang==="KR"?SC.textKR:SC.textEN;
    sq.appendChild(txt);
    if(SC.type==="rest"){
      const hasPrev=!!SC.prevURL, hasNext=!!SC.nextURL;
      const ui=document.createElement("div");
      ui.className="rest-ui";
      ui.style.cssText="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;pointer-events:none;z-index:1;";
      ui.innerHTML=`<span class="rest-dot" style="animation-delay:0ms;--bounce-h:-10px"></span><span class="rest-dot" style="animation-delay:110ms;--bounce-h:-7px"></span><span class="rest-dot" style="animation-delay:220ms;--bounce-h:-5px"></span><span class="rest-dot" style="animation-delay:330ms;--bounce-h:-3px"></span><span class="rest-dot" style="animation-delay:440ms;--bounce-h:-1px"></span><span class="rest-triangle" style="animation-delay:440ms"></span>`;
      sq.appendChild(ui);
    }
  }

  const makeArrow=(dir,url)=>{
    const btn=document.createElement("div");
    btn.className=`nav-arrow nav-btn nav-${dir}`;
    btn.setAttribute("data-tip",
      curLang==="KR"
        ? (url ? (dir==="left" ? "이전" : "다음") : (dir==="left" ? "이전 없음" : "다음 없음"))
        : (url ? (dir==="left" ? "Previous" : "Next") : (dir==="left" ? "No previous" : "No next"))
    );
    if(!url){
      // 첫 작품(이전 없음)에서는 좌측 버튼을 '작품 소개'로 사용
      if(dir==="left" && SC.pageNum===1){
        btn.setAttribute("data-tip", curLang==="KR" ? "작가의 말" : "About");
        btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:28px;height:28px;"><path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" /></svg>`;
        btn.addEventListener("click",(e)=>{e.preventDefault();e.stopPropagation();AboutManager.open();});
        btn.addEventListener("touchend",(e)=>{e.preventDefault();AboutManager.open();});
        btn.addEventListener("keydown",(e)=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();AboutManager.open();}});
        return btn;
      }
      btn.classList.add("disabled");
      btn.innerHTML=dir==="left"
        ?`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:28px;height:28px;"><path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/><path stroke-linecap="round" stroke-linejoin="round" d="M9 9.563C9 9.252 9.252 9 9.563 9h4.874c.311 0 .563.252.563.563v4.874c0 .311-.252.563-.563.563H9.564A.562.562 0 0 1 9 14.437V9.564Z"/></svg>`
        :`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:28px;height:28px;"><path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/><path stroke-linecap="round" stroke-linejoin="round" d="M9 9.563C9 9.252 9.252 9 9.563 9h4.874c.311 0 .563.252.563.563v4.874c0 .311-.252.563-.563.563H9.564A.562.562 0 0 1 9 14.437V9.564Z"/></svg>`;
    } else {
      btn.innerHTML=dir==="left"
        ?`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:28px;height:28px;"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5"/></svg>`
        :`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:28px;height:28px;"><path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5"/></svg>`;
      btn.addEventListener("click",()=>goTo(url));
      btn.addEventListener("touchend",(e)=>{e.preventDefault();goTo(url);});
      btn.addEventListener("keydown",(e)=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();goTo(url);}});
    }
    return btn;
  };
  sq.append(makeArrow("left",SC.prevURL),makeArrow("right",SC.nextURL));
  wrap.appendChild(sq); frame.appendChild(wrap); app.appendChild(frame);

  // FOG FX
  const FogFX=(()=>{
    const root=document.documentElement,rnd=(a,b)=>a+Math.random()*(b-a);
    let timer=null,fogEl=null;
    return {
      bind:el=>{fogEl=el;},
      start:()=>{
        const tick=()=>{
          root.style.setProperty("--fog-x",rnd(-2.2,2.2).toFixed(2)+"%");
          root.style.setProperty("--fog-y",rnd(-2.0,2.0).toFixed(2)+"%");
          root.style.setProperty("--fog-scale-min",rnd(1.01,1.04).toFixed(3));
          root.style.setProperty("--fog-scale-max",(parseFloat(rnd(1.01,1.04).toFixed(3))+rnd(0.01,0.03)).toFixed(3));
          if(fogEl)fogEl.style.setProperty("--fog-opacity",rnd(0.03,0.22).toFixed(3));
          timer=setTimeout(tick,Math.floor(rnd(12000,24000)));
        };
        tick();
      }
    };
  })();

  if(SC.type==="fog"){
    document.addEventListener("keydown",(e)=>{
      if(e.key==="ArrowRight"||e.key==="ArrowDown"){e.preventDefault();goTo(SC.nextURL);}
    });
    const hero=document.getElementById("hero"),hqEl=document.getElementById("fogHq"),fogNoise=document.getElementById("fogNoise");
    FogFX.bind(fogNoise);
    hqEl.src=SC.imgSrc+"?t="+Date.now();
    let started=false;
    const begin=()=>{
      if(started)return;started=true;
      setTimeout(()=>{
        hero.classList.add("hq-show");
        fogNoise.style.opacity="0"; requestAnimationFrame(()=>{void fogNoise.offsetHeight; fogNoise.style.opacity=""; fogNoise.classList.add("animated"); FogFX.start();});
        setTimeout(()=>hero.classList.add("lqip-hide"),TIMING.FOG_HQ());
        setTimeout(()=>hero.classList.add("show-text"),TIMING.FOG_TEXT());
        setTimeout(()=>frame.classList.add("nav-ready"),TIMING.FOG_TEXT()+50);
      },TIMING.FOG_MIN_LQIP());
    };
    hqEl.addEventListener("load",begin,{once:true});
    if(hqEl.complete&&hqEl.naturalWidth>0)begin();
  } else if(SC.type==="img"){
    const imgEl=document.getElementById(SC.id+"Img");
    let _began=false;
    const begin=()=>{if(_began)return;_began=true;frame.classList.add("hq-show");setTimeout(()=>frame.classList.add("show-text"),TIMING.SCENE_TEXT());setTimeout(()=>frame.classList.add("nav-ready"),TIMING.SCENE_TEXT()+50);};
    if(imgEl.complete&&imgEl.naturalWidth>0){begin();}
    else{
      imgEl.addEventListener("load",begin,{once:true});
      const poll=setInterval(()=>{if(imgEl.naturalWidth>0){clearInterval(poll);begin();}},16);
      imgEl.addEventListener("load",()=>clearInterval(poll),{once:true});
    }
  } else {
    setTimeout(()=>frame.classList.add("show-text"),TIMING.SCENE_TEXT());
    setTimeout(()=>frame.classList.add("nav-ready"),TIMING.SCENE_TEXT()+50);
  }

  // UI 모드
  let uiMode=2;
  const uiIcons={
    1:`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:28px;height:28px;"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"/></svg>`,
    2:`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:28px;height:28px;"><path stroke-linecap="round" stroke-linejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"/></svg>`
  };
  const applyUIMode=()=>{
    document.body.classList.toggle("ui-hide-all",uiMode===1);
    document.body.classList.toggle("ui-text-only",uiMode===2);
    document.body.classList.add("ui-mode-ready");
    document.querySelectorAll(".soloToggle").forEach(b=>{
      b.innerHTML=uiIcons[uiMode];
      b.style.opacity="";
      b.style.visibility="";
    });
    if(window.__refreshViewModeTip) window.__refreshViewModeTip();
  };
  document.querySelectorAll(".soloToggle").forEach(b=>b.addEventListener("click",()=>{uiMode=uiMode===2?1:2;applyUIMode();}));
  applyUIMode();

  // 데스크탑 전용 이벤트
  menuBtn.addEventListener("click",TOCManager.open);
  workCode.addEventListener("click",(e)=>{e.preventDefault();e.stopPropagation();IndexManager.open();});
  workCode.addEventListener("keydown",(e)=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();IndexManager.open();}});
  document.getElementById("tocInfoBtn")?.addEventListener("click",()=>document.querySelector(".toc-panel")?.classList.add("show-info"));
  document.getElementById("tocInfoBack")?.addEventListener("click",()=>document.querySelector(".toc-panel")?.classList.remove("show-info"));

  // 키보드
  document.addEventListener("keydown",(e)=>{
    const menuOn=document.getElementById("tocOverlay").classList.contains("on");
    const indexOn=document.getElementById("indexOverlay").classList.contains("on");
    const aboutOn=document.getElementById("aboutOverlay")?.classList.contains("on");
    if(e.key==="Escape"){
      if(aboutOn){e.preventDefault();AboutManager.close();return;}
      if(indexOn){e.preventDefault();IndexManager.close();return;}
      if(menuOn){e.preventDefault();TOCManager.close();return;}
      return;
    }
    if(e.key==="m"||e.key==="M"){e.preventDefault();menuOn?TOCManager.close():TOCManager.open();return;}
    if(e.key==="i"||e.key==="I"){e.preventDefault();indexOn?IndexManager.close():IndexManager.open();return;}
    if(e.key==="h"||e.key==="H"){e.preventDefault();if(!menuOn)TOCManager.open();setTimeout(()=>document.querySelector(".toc-panel")?.classList.add("show-info"),50);return;}
    if(e.key==="p"||e.key==="P"){e.preventDefault();uiMode=1;applyUIMode();return;}
    if(e.key==="t"||e.key==="T"){e.preventDefault();uiMode=2;applyUIMode();return;}
    if(menuOn||indexOn||aboutOn)return;
    if(e.key==="ArrowRight"||e.key==="ArrowDown"||e.key==="Enter"){e.preventDefault();goTo(SC.nextURL);}
    else if(e.key==="ArrowLeft"||e.key==="ArrowUp"){e.preventDefault();goTo(SC.prevURL);}
  });

  // Photo Only 피크
  let peekTimer=null;
  const showPeek=()=>{document.body.classList.add("solo-peek");clearTimeout(peekTimer);peekTimer=setTimeout(()=>document.body.classList.remove("solo-peek"),2000);};
  document.addEventListener("mousemove",showPeek);
  document.addEventListener("click",showPeek);
  document.addEventListener("touchstart",showPeek,{passive:true});
}

// ===== 공통 이벤트 (반드시 DOM 삽입 후 실행) =====
bindCommon();

// ===== 3·4페이지 마우스 휠 줌 차단 =====
if(SC.id==="prague"||SC.id==="dreams"){
  document.addEventListener("wheel",(e)=>{if(e.ctrlKey)e.preventDefault();},{passive:false});
}

})();

// ===== 프라하 반영 일렁임 효과 =====
function initRipple(img, sq) {
  const RIPPLE_RATIO = 0.41;
  const FID = "prague-ripple-" + Math.random().toString(36).substr(2,6);

  // SVG를 body에 붙임 - sq/wrap의 overflow 제한 완전 우회, url(#ID) 참조 보장
  const NS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(NS, "svg");
  svg.style.cssText = "position:absolute;width:0;height:0;pointer-events:none;overflow:hidden;";
  const defs = document.createElementNS(NS, "defs");
  const filter = document.createElementNS(NS, "filter");
  filter.setAttribute("id", FID);
  filter.setAttribute("x","-20%"); filter.setAttribute("y","-20%");
  filter.setAttribute("width","140%"); filter.setAttribute("height","140%");
  filter.setAttribute("color-interpolation-filters","sRGB");
  const turb = document.createElementNS(NS, "feTurbulence");
  turb.setAttribute("type","turbulence");
  turb.setAttribute("baseFrequency","0.015 0.04");
  turb.setAttribute("numOctaves","6");
  turb.setAttribute("result","noise");
  const disp = document.createElementNS(NS, "feDisplacementMap");
  disp.setAttribute("in","SourceGraphic");
  disp.setAttribute("in2","noise");
  disp.setAttribute("scale","0");
  disp.setAttribute("xChannelSelector","R");
  disp.setAttribute("yChannelSelector","G");
  filter.append(turb,disp); defs.appendChild(filter); svg.appendChild(defs);
  // 기존 ripple 정리 (bfcache 재진입 시 중복 방지)
  document.querySelectorAll("[data-ripple-svg]").forEach(el => el.remove());
  sq.querySelectorAll("[data-ripple-el]").forEach(el => el.remove());
  svg.setAttribute("data-ripple-svg", "prague");
  document.body.appendChild(svg);

  // rippleEl은 sq 안에 - 좌표 계산 단순
  const rippleEl = document.createElement("div");
  rippleEl.setAttribute("data-ripple-el", "prague");
  rippleEl.style.cssText = "position:absolute;pointer-events:none;overflow:visible;opacity:0;transition:opacity 1.5s ease;";
  const clone = img.cloneNode(false);
  clone.removeAttribute("id");
  clone.style.cssText = `position:absolute;object-fit:none;filter:url(#${FID});`;
  rippleEl.appendChild(clone);
  sq.appendChild(rippleEl);

  const syncPosition = () => {
    const sqW = sq.offsetWidth, sqH = sq.offsetHeight;
    const iw = img.naturalWidth, ih = img.naturalHeight;
    if (!iw || !ih) return;
    const scale = Math.min(sqW/iw, sqH/ih);
    const rw = iw*scale, rh = ih*scale;
    const rx = (sqW-rw)/2, ry = (sqH-rh)/2;
    const rippleH = rh * RIPPLE_RATIO;
    const top = ry + rh - rippleH - 10;
    const OFFSET = 60;

    rippleEl.style.left   = "0px";
    rippleEl.style.width  = `${sqW}px`;
    rippleEl.style.top    = `${top}px`;
    rippleEl.style.height = `${(ry+rh) - top}px`;
    rippleEl.style.zIndex = "10";
    rippleEl.style.webkitMaskImage = "linear-gradient(to bottom, transparent 0%, black 18%, black 100%)";
    rippleEl.style.maskImage       = "linear-gradient(to bottom, transparent 0%, black 18%, black 100%)";
    rippleEl.style.transform = `scaleX(${((sqW+200)/sqW).toFixed(4)})`;
    rippleEl.style.transformOrigin = "bottom center";

    clone.style.width  = `${rw + OFFSET*2}px`;
    clone.style.height = `${rh + OFFSET*2}px`;
    clone.style.left   = `${rx - OFFSET}px`;
    clone.style.top    = `-${(top - ry) + OFFSET}px`;
  };

  const handleUpdate = () => { syncPosition(); setTimeout(syncPosition,150); setTimeout(syncPosition,500); };
  syncPosition();
  window.addEventListener("resize", handleUpdate);
  document.addEventListener("fullscreenchange", handleUpdate);

  let t = 0;
  const animate = () => {
    turb.setAttribute("baseFrequency", `${(0.010+Math.sin(t*0.7)*0.002).toFixed(4)} ${(0.028+Math.cos(t*0.5)*0.003).toFixed(4)}`);
    disp.setAttribute("scale", (5+Math.sin(t*0.5)*2).toFixed(2));
    t += 0.016;
    requestAnimationFrame(animate);
  };
  setTimeout(() => { rippleEl.style.opacity = "1"; animate(); }, 300);
}
// ===== lpl_04 상단 일렁임 효과 =====
function initRippleTop(img, sq) {
  const RIPPLE_RATIO = 0.51;
  const FID = "dreams-ripple-" + Math.random().toString(36).substr(2,6);

  const NS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(NS, "svg");
  svg.style.cssText = "position:absolute;width:0;height:0;pointer-events:none;overflow:hidden;";
  const defs = document.createElementNS(NS, "defs");
  const filter = document.createElementNS(NS, "filter");
  filter.setAttribute("id", FID);
  filter.setAttribute("x","-20%"); filter.setAttribute("y","-20%");
  filter.setAttribute("width","140%"); filter.setAttribute("height","140%");
  filter.setAttribute("color-interpolation-filters","sRGB");
  const turb = document.createElementNS(NS, "feTurbulence");
  turb.setAttribute("type","turbulence");
  turb.setAttribute("baseFrequency","0.015 0.04");
  turb.setAttribute("numOctaves","6");
  turb.setAttribute("seed","7");
  turb.setAttribute("result","noise");
  const disp = document.createElementNS(NS, "feDisplacementMap");
  disp.setAttribute("in","SourceGraphic");
  disp.setAttribute("in2","noise");
  disp.setAttribute("scale","0");
  disp.setAttribute("xChannelSelector","R");
  disp.setAttribute("yChannelSelector","G");
  filter.append(turb,disp); defs.appendChild(filter); svg.appendChild(defs);

  // 기존 ripple 정리
  document.querySelectorAll("[data-ripple-svg]").forEach(el => el.remove());
  sq.querySelectorAll("[data-ripple-el]").forEach(el => el.remove());
  svg.setAttribute("data-ripple-svg", "dreams");
  document.body.appendChild(svg);

  const rippleEl = document.createElement("div");
  rippleEl.setAttribute("data-ripple-el", "dreams");
  rippleEl.style.cssText = "position:absolute;pointer-events:none;overflow:visible;opacity:0;transition:opacity 1.5s ease;";
  const clone = img.cloneNode(false);
  clone.removeAttribute("id");
  clone.style.cssText = `position:absolute;object-fit:none;filter:url(#${FID});`;
  rippleEl.appendChild(clone);
  sq.appendChild(rippleEl);

  const syncPosition = () => {
    const sqW = sq.offsetWidth, sqH = sq.offsetHeight;
    const iw = img.naturalWidth, ih = img.naturalHeight;
    if (!iw || !ih) return;
    const scale = Math.min(sqW/iw, sqH/ih);
    const rw = iw*scale, rh = ih*scale;
    const rx = (sqW-rw)/2, ry = (sqH-rh)/2;
    const rippleH = rh * RIPPLE_RATIO;
    const OFFSET = 60;

    rippleEl.style.left   = "0px";
    rippleEl.style.width  = `${sqW}px`;
    rippleEl.style.top    = `${ry}px`;
    rippleEl.style.height = `${rippleH + 10}px`;
    rippleEl.style.zIndex = "10";
    rippleEl.style.webkitMaskImage = "linear-gradient(to bottom, black 0%, black 60%, transparent 100%)";
    rippleEl.style.maskImage       = "linear-gradient(to bottom, black 0%, black 60%, transparent 100%)";
    rippleEl.style.transform = `scaleX(${((sqW+200)/sqW).toFixed(4)}) scaleY(1.05)`;
    rippleEl.style.transformOrigin = "top center";

    clone.style.width  = `${rw + OFFSET*2}px`;
    clone.style.height = `${rh + OFFSET*2}px`;
    clone.style.left   = `${rx - OFFSET}px`;
    clone.style.top    = `${-OFFSET}px`;
  };

  syncPosition();
  window.addEventListener("resize", syncPosition);
  document.addEventListener("fullscreenchange", () => { syncPosition(); setTimeout(syncPosition,150); setTimeout(syncPosition,500); });

  let t = 0;
  const animate = () => {
    turb.setAttribute("baseFrequency", `${(0.010+Math.sin(t*0.7)*0.002).toFixed(4)} ${(0.028+Math.cos(t*0.5)*0.003).toFixed(4)}`);
    disp.setAttribute("scale", (3+Math.sin(t*0.5)*1.2).toFixed(2));
    t += 0.016;
    requestAnimationFrame(animate);
  };
  setTimeout(() => { rippleEl.style.opacity = "1"; animate(); }, 200);
}
