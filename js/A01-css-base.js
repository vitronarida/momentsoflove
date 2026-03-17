// ============================================================
// A01-css-base.js  —  그룹 A (CSS)
// ============================================================

const CSS_A01_MOBILE = `
@import url('https://fonts.googleapis.com/css2?family=Nanum+Pen+Script&display=swap');
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
  transition: opacity 200ms ease;
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
  touch-action: manipulation;
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
  touch-action: manipulation;
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
.img-error-msg {
  position: absolute; inset: 0;
  display: flex; align-items: center; justify-content: center;
  color: rgba(255,255,255,0.35); font-size: 14px; letter-spacing: 0.05em;
  pointer-events: none;
}
`;

const CSS_A01_DESKTOP = `
@import url('https://fonts.googleapis.com/css2?family=Nanum+Pen+Script&display=swap');
/* CSS 변수 */
  :root{
  --nav-black-hold: 500ms; --nav-black-fade: 200ms;
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
  body{ background:#2e2e2e; }
  
  /* 접근성 - Skip Link */
  .skip-link{ position:absolute; top:-100px; left:0; background:rgba(212,175,55,0.95); 
  color:#000; padding:12px 20px; z-index:20000; font-family:"Nanum Pen Script", cursive;
  font-size:20px; text-decoration:none; border-radius:0 0 8px 0; }
  .skip-link:focus{ top:0; outline:3px solid rgba(212,175,55,1); outline-offset:2px; }
  
  /* 접근성 - 포커스 표시 */
  *:focus-visible{ outline:2px solid rgba(212,175,55,0.8); outline-offset:3px; }
  .nav-btn:focus-visible, .toc-item:focus-visible, .idx-tile:focus-visible{
  outline:2px solid rgba(212,175,55,1); outline-offset:2px; }

  .screen{ position:fixed; inset:0; width:100%; height:100%; transition: opacity 600ms ease; background:#2e2e2e; }
  .hidden{ opacity:0; pointer-events:none; }
  .visible{ opacity:1; pointer-events:auto; }
  #blackout{ position:fixed; inset:0; background:#2e2e2e; opacity:0; pointer-events:none; 
  transition: opacity var(--nav-black-fade) ease; z-index:9999; transform: translateZ(0); will-change: opacity; }
  #blackout.on{ opacity:1; pointer-events:auto; }
`;
