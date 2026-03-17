// ============================================================
// A04-css-rst.js  —  그룹 A (CSS)
// ============================================================

const CSS_A04_MOBILE = `
/* rest-still: 정적 + 미세 호흡 (RST_01 전용) */
.rest-still .rest-ring { display: none; }
.rest-still .rest-arrow-icon {
  animation: restStillBreathe 8s ease-in-out infinite;
}
@keyframes restStillBreathe {
  0%, 100% { opacity: 0.45; box-shadow: 0 0 6px 2px rgba(255,255,255,0.04); }
  50%      { opacity: 0.75; box-shadow: 0 0 14px 5px rgba(255,255,255,0.10); }
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
  font-size: clamp(22px, 3vw, 28px);
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
/* RST_05 안내문 */
.rest-note { font-size: clamp(20px, 5vw, 26px) !important; color: rgba(235,235,235,0.38) !important; letter-spacing: 1px !important; line-height: 1.8 !important; }
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
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.07);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  color: rgba(235,235,235,0.35);
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
  height: 94dvh;
  max-height: 96dvh;
  padding-top: env(safe-area-inset-top, 0px);
  background: rgba(255,255,255,0.10);
  border: 1px solid rgba(255,255,255,0.08);
  border-bottom: none;
  border-radius: 14px 14px 0 0;
  padding: 12px 24px 40px;
  display: flex; flex-direction: column;
  overflow: hidden;
  -ms-overflow-style: none; scrollbar-width: none;
  transform: translateY(20px);
  transition: transform 400ms ease;
  color: #e6e6e6;
}
.toc-panel::-webkit-scrollbar { display: none; }
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
.menu-section { margin-top: 8px; padding-top: 8px; border-top: 1px solid rgba(255,255,255,0.08); padding-left: 0; }
.menu-section:first-of-type { border-top: none; margin-top: 0; padding-top: 0; }
.menu-h { font-size: 20px; color: rgba(235,235,235,0.92); margin: 0 0 2px 0; font-family: "Nanum Pen Script", cursive; }
.menu-h-link{ display:inline-block; cursor:pointer; }
.menu-h-link:hover{ text-decoration:underline; text-underline-offset:6px; }
.menu-h-link:focus{ outline:none; text-decoration:underline; text-underline-offset:6px; }

.toc-list { list-style: none; margin: 0 0 0 -8px; padding: 0; font-size: 18px; font-family: "Nanum Pen Script", cursive; }
.toc-item {
  padding: 2px 0 2px 0;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  display: flex; align-items: center; gap: 6px;
  color: rgba(230,230,230,0.75);
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}
.toc-item:last-child { border-bottom: none; }
.toc-item:hover .toc-text{ text-decoration: underline; text-underline-offset: 6px; }

.toc-item.toc-current { color: rgba(212,175,55,0.95); text-shadow: 0 0 8px rgba(212,175,55,0.30); }
.toc-bullet { font-size: 8px; width: 8px; flex: 0 0 8px; opacity: 0; }
.toc-item.toc-current .toc-bullet { opacity: 1; }
.toc-locked { opacity: 0.38; pointer-events: none; }
.menu-sub { font-size: 16px; color: rgba(220,220,220,0.65); line-height: 1.7; padding-left: 20px; font-family: "Nanum Pen Script", cursive; }
.menu-sub a { color: rgba(220,220,220,0.75); text-decoration: none; border-bottom: 1px solid rgba(220,220,220,0.20); }
.index-panel {
  position: relative;
  width: 100%; height: 94dvh; max-height: 96dvh;
  padding-top: env(safe-area-inset-top, 0px);
  background: rgba(255,255,255,0.10);
  border: 1px solid rgba(255,255,255,0.08);
  border-bottom: none;
  border-radius: 20px 20px 0 0;
  padding: 14px 12px 24px;
  overflow-y: auto;
  -ms-overflow-style: none; scrollbar-width: none;
  transform: translateY(20px);
  transition: transform 400ms ease;
  color: #e6e6e6;
}
.index-panel::-webkit-scrollbar { display: none; }
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
}
/* ── RST 배경 (모바일) ── */
body.rst-active #app { background: linear-gradient(to bottom,#0a0801 0%,#1a150a 100%) !important; }
.rest-photo-area{ position:relative; overflow:visible !important; }
.rest-icon-wrap{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:160px;height:160px;display:grid;place-items:center;cursor:pointer;z-index:5;}
.moon-core{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:44px;height:44px;border-radius:999px;background:radial-gradient(circle,rgba(255,254,242,1) 0%,rgba(235,220,185,0.85) 40%,transparent 100%);animation:moonBreathe 6.4s ease-in-out infinite;z-index:3;box-shadow:0 0 18px 6px rgba(255,245,180,0.35);}
.moon-glow1{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:200px;height:200px;border-radius:999px;background:radial-gradient(circle,rgba(225,215,170,0.95) 0%,rgba(200,190,150,0.65) 50%,transparent 100%);animation:moonGlow1 6.4s ease-in-out infinite;z-index:2;}
.moon-glow2{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:360px;height:360px;border-radius:999px;background:radial-gradient(circle,rgba(210,200,155,0.75) 0%,rgba(190,180,135,0.45) 55%,transparent 100%);animation:moonGlow2 6.4s ease-in-out infinite;z-index:1;}
.moon-ring{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:130px;height:130px;border-radius:999px;border:1.5px solid rgba(225,215,170,0.70);animation:moonRing 7s ease-out infinite;z-index:2;}
.moon-ring.r2{width:220px;height:220px;border-color:rgba(210,200,155,0.70);animation:moonRing 7s ease-out infinite;animation-delay:-2.33s;}
.moon-ring.r3{width:310px;height:310px;border-color:rgba(200,190,145,0.50);animation:moonRing 7s ease-out infinite;animation-delay:-4.66s;}
@keyframes moonBreathe{0%,100%{opacity:0.82;transform:translate(-50%,-50%) scale(0.95);box-shadow:0 0 20px 8px rgba(255,245,180,0.40);}50%{opacity:1.0;transform:translate(-50%,-50%) scale(1.06);box-shadow:0 0 36px 14px rgba(255,245,180,0.70);}}
@keyframes moonGlow1{0%,100%{opacity:0.65;transform:translate(-50%,-50%) scale(0.90)}50%{opacity:1.0;transform:translate(-50%,-50%) scale(1.10)}}
@keyframes moonGlow2{0%,100%{opacity:0.55;transform:translate(-50%,-50%) scale(0.86)}50%{opacity:1.0;transform:translate(-50%,-50%) scale(1.14)}}
@keyframes moonRing{0%{transform:translate(-50%,-50%) scale(1);opacity:0}15%{opacity:0.70}65%{transform:translate(-50%,-50%) scale(1.7);opacity:0.40}100%{transform:translate(-50%,-50%) scale(1.9);opacity:0}}
`;

const CSS_A04_DESKTOP = `
/* 쉬어가는 페이지 */
  .rest-note { font-size: clamp(24px, 2.5vw, 29px) !important; color: rgba(235,235,235,0.38) !important; letter-spacing: 1px !important; line-height: 1.8 !important; }
  .rest-photo { position:absolute; inset:0; background:#1a1a1a; overflow:hidden; }
  /* 달빛 아이콘 */
  .rest-icon-wrap {
    position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
    width: 240px; height: 240px;
    display: grid; place-items: center;
    cursor: default; z-index: 15;
  }
  .moon-core{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:56px;height:56px;border-radius:999px;background:radial-gradient(circle,rgba(255,252,235,0.95) 0%,rgba(220,210,180,0.6) 50%,transparent 100%);animation:moonBreathe 6.4s ease-in-out infinite;z-index:3;}
  .moon-glow1{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:280px;height:280px;border-radius:999px;background:radial-gradient(circle,rgba(220,210,170,0.22) 0%,rgba(200,190,150,0.08) 55%,transparent 100%);animation:moonGlow1 6.4s ease-in-out infinite;z-index:2;}
  .moon-glow2{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:480px;height:480px;border-radius:999px;background:radial-gradient(circle,rgba(200,190,150,0.10) 0%,rgba(180,170,130,0.04) 55%,transparent 100%);animation:moonGlow2 6.4s ease-in-out infinite;z-index:1;}
  .moon-ring{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:200px;height:200px;border-radius:999px;border:0.5px solid rgba(220,210,170,0.25);animation:moonRing 6s ease-out infinite;z-index:2;}
  .moon-ring.r2{width:320px;height:320px;border-color:rgba(200,190,150,0.12);animation-delay:2s;}
  @keyframes moonBreathe{0%,100%{opacity:0.8;transform:translate(-50%,-50%) scale(0.95)}50%{opacity:1.0;transform:translate(-50%,-50%) scale(1.05)}}
  @keyframes moonGlow1{0%,100%{opacity:0.6;transform:translate(-50%,-50%) scale(0.92)}50%{opacity:1.0;transform:translate(-50%,-50%) scale(1.08)}}
  @keyframes moonGlow2{0%,100%{opacity:0.5;transform:translate(-50%,-50%) scale(0.88)}50%{opacity:0.9;transform:translate(-50%,-50%) scale(1.12)}}
  @keyframes moonRing{0%{transform:translate(-50%,-50%) scale(1);opacity:0.5}70%{transform:translate(-50%,-50%) scale(1.8);opacity:0}100%{transform:translate(-50%,-50%) scale(1.8);opacity:0}}
  #rst-w1{animation:none;transform:translateZ(0);}
  #rst-w1 .rst-wx{animation:rst-mx 69s linear infinite;}
  #rst-w1 .rst-wy{animation:rst-dyn1 37s ease-in-out infinite,rst-hv1 42s ease-in-out infinite;}
  @keyframes rst-dyn1{0%,100%{transform:translate3d(0,0,0) scaleY(0.25)}50%{transform:translate3d(0,0,0) scaleY(0.5)}}
  @keyframes rst-hv1{0%,100%{transform:translate3d(0,0,0)}50%{transform:translate3d(0,25px,0)}}
  #rst-w2{animation:none;transform:translateZ(0);}
  #rst-w2 .rst-wx{animation:rst-mx 27s linear infinite;}
  #rst-w2 .rst-wy{animation:rst-dyn2 21s ease-in-out infinite,rst-hv2 28s ease-in-out infinite;}
  @keyframes rst-dyn2{0%,100%{transform:translate3d(0,0,0) scaleY(0.75)}50%{transform:translate3d(0,0,0) scaleY(0.7)}}
  @keyframes rst-hv2{0%,100%{transform:translate3d(0,0,0)}50%{transform:translate3d(0,25px,0)}}
  #rst-w3{animation:none;transform:translateZ(0);}
  #rst-w3 .rst-wx{animation:rst-mx 27s linear infinite;}
  #rst-w3 .rst-wy{animation:rst-dyn3 51s ease-in-out infinite,rst-hv3 16s ease-in-out infinite;}
  @keyframes rst-dyn3{0%,100%{transform:translate3d(0,0,0) scaleY(0.25)}50%{transform:translate3d(0,0,0) scaleY(0.35)}}
  @keyframes rst-hv3{0%,100%{transform:translate3d(0,0,0)}50%{transform:translate3d(0,25px,0)}}
  /* 이미지 장면 */
  .scene-img{ position:absolute; inset:0; width:100%; height:100%; object-fit:contain; background:#000;
  opacity:0; transition: opacity var(--scene-hq-fade) ease; transform: translateZ(0); will-change: opacity; }
  .scene.hq-show .scene-img{ opacity:1; }

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
  .rest-sq::after{ display:none !important; }

  /* === RST 파도 배경 === */
  body.rst-active, body.rst-active .screen,
  body.rst-active .scene, body.rst-active .scene-wrap { background: linear-gradient(to bottom,#0a0801 0%,#1a150a 100%) !important; }
  body.rst-active .square-frame { background: transparent !important; }
  body.rst-active #blackout { background: #0a0801 !important; }
  #rst-wave-bg {
    position: absolute; inset: 0; z-index: 0; pointer-events: none; overflow: hidden;
    background: linear-gradient(to bottom, #0a0801 0%, #1a150a 100%);
  }
  .rst-wl{position:absolute;left:0;width:100%;height:500px;transform-origin:bottom center;overflow:visible;will-change:transform;backface-visibility:hidden;opacity:0.6;}
  .rst-wx{width:200%;height:100%;will-change:transform;backface-visibility:hidden;}
  .rst-wy{width:100%;height:100%;will-change:transform;backface-visibility:hidden;}
  .rst-wy svg{width:100%;height:500px;display:block;shape-rendering:geometricPrecision;}
  @keyframes rst-mx{0%{transform:translate3d(-50%,0,0)}100%{transform:translate3d(0%,0,0)}}
  #rst-w1{animation:none;transform:translateZ(0);}
  #rst-w1 .rst-wx{animation:rst-mx 69s linear infinite;}
  #rst-w1 .rst-wy{animation:rst-dyn1 37s ease-in-out infinite,rst-hv1 42s ease-in-out infinite;}
  @keyframes rst-dyn1{0%,100%{transform:translate3d(0,0,0) scaleY(0.25)}50%{transform:translate3d(0,0,0) scaleY(0.5)}}
  @keyframes rst-hv1{0%,100%{transform:translate3d(0,0,0)}50%{transform:translate3d(0,25px,0)}}
  #rst-w2{animation:none;transform:translateZ(0);}
  #rst-w2 .rst-wx{animation:rst-mx 112s linear infinite;}
  #rst-w2 .rst-wy{animation:rst-dyn2 42s ease-in-out infinite,rst-hv2 36s ease-in-out infinite;}
  @keyframes rst-dyn2{0%,100%{transform:translate3d(0,0,0) scaleY(0.6)}50%{transform:translate3d(0,0,0) scaleY(0.7)}}
  @keyframes rst-hv2{0%,100%{transform:translate3d(0,0,0)}50%{transform:translate3d(0,25px,0)}}
  #rst-w3{animation:none;transform:translateZ(0);}
  #rst-w3 .rst-wx{animation:rst-mx 27s linear infinite;}
  #rst-w3 .rst-wy{animation:rst-dyn3 21s ease-in-out infinite,rst-hv3 28s ease-in-out infinite;}
  @keyframes rst-dyn3{0%,100%{transform:translate3d(0,0,0) scaleY(0.75)}50%{transform:translate3d(0,0,0) scaleY(0.7)}}
  @keyframes rst-hv3{0%,100%{transform:translate3d(0,0,0)}50%{transform:translate3d(0,25px,0)}}
  #rst-w4{animation:none;transform:translateZ(0);}
  #rst-w4 .rst-wx{animation:rst-mx 70s linear infinite;}
  #rst-w4 .rst-wy{animation:rst-dyn4 60s ease-in-out infinite,rst-hv4 22s ease-in-out infinite;}
  @keyframes rst-dyn4{0%,100%{transform:translate3d(0,0,0) scaleY(0.4)}50%{transform:translate3d(0,0,0) scaleY(0.5)}}
  @keyframes rst-hv4{0%,100%{transform:translate3d(0,0,0)}50%{transform:translate3d(0,25px,0)}}
  #rst-w5{animation:none;transform:translateZ(0);}
  #rst-w5 .rst-wx{animation:rst-mx 27s linear infinite;}
  #rst-w5 .rst-wy{animation:rst-dyn5 51s ease-in-out infinite,rst-hv5 16s ease-in-out infinite;}
  @keyframes rst-dyn5{0%,100%{transform:translate3d(0,0,0) scaleY(0.25)}50%{transform:translate3d(0,0,0) scaleY(0.35)}}
  @keyframes rst-hv5{0%,100%{transform:translate3d(0,0,0)}50%{transform:translate3d(0,25px,0)}}
  .moon-core{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:56px;height:56px;border-radius:999px;background:radial-gradient(circle,rgba(255,252,235,0.95) 0%,rgba(220,210,180,0.6) 50%,transparent 100%);animation:moonBreathe 6.4s ease-in-out infinite;z-index:3;}
  .moon-glow1{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:280px;height:280px;border-radius:999px;background:radial-gradient(circle,rgba(220,210,170,0.22) 0%,rgba(200,190,150,0.08) 55%,transparent 100%);animation:moonGlow1 6.4s ease-in-out infinite;z-index:2;}
  .moon-glow2{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:480px;height:480px;border-radius:999px;background:radial-gradient(circle,rgba(200,190,150,0.10) 0%,rgba(180,170,130,0.04) 55%,transparent 100%);animation:moonGlow2 6.4s ease-in-out infinite;z-index:1;}
  .moon-ring{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:200px;height:200px;border-radius:999px;border:0.5px solid rgba(220,210,170,0.25);animation:moonRing 6s ease-out infinite;z-index:2;}
  .moon-ring.r2{width:320px;height:320px;border-color:rgba(200,190,150,0.12);animation-delay:2s;}
  @keyframes moonBreathe{0%,100%{opacity:0.8;transform:translate(-50%,-50%) scale(0.95)}50%{opacity:1.0;transform:translate(-50%,-50%) scale(1.05)}}
  @keyframes moonGlow1{0%,100%{opacity:0.6;transform:translate(-50%,-50%) scale(0.92)}50%{opacity:1.0;transform:translate(-50%,-50%) scale(1.08)}}
  @keyframes moonGlow2{0%,100%{opacity:0.5;transform:translate(-50%,-50%) scale(0.88)}50%{opacity:0.9;transform:translate(-50%,-50%) scale(1.12)}}
  @keyframes moonRing{0%{transform:translate(-50%,-50%) scale(1);opacity:0.5}70%{transform:translate(-50%,-50%) scale(1.8);opacity:0}100%{transform:translate(-50%,-50%) scale(1.8);opacity:0}}
  .rst-floor{position:absolute;bottom:0;left:0;width:100%;height:212px;background:#1e1204;z-index:10;}
  #pragueScreen .scene-text,
  #dreamsScreen .scene-text{ z-index:20 !important; }
  /* ── RST 중앙 네비 버튼 ── */
  .rst-nav-btn {
    position:absolute; top:50%; transform:translateY(-50%) translateZ(0);
    width:52px; height:52px; border-radius:999px;
    background:rgba(255,255,255,0.02);
    border:1px solid rgba(255,255,255,0.07);
    backdrop-filter:blur(10px); -webkit-backdrop-filter:blur(10px);
    display:grid; place-items:center;
    color:rgba(235,235,235,0.35);
    cursor:pointer; z-index:30;
    opacity:0;
    transition:opacity var(--nav-fade,600ms) ease, transform 200ms ease, box-shadow 1500ms ease;
    pointer-events:auto;
    -webkit-tap-highlight-color:transparent;
  }
  .rst-nav-btn:hover {
    opacity:1;
    transform:translateY(-50%) scale(1.04) translateZ(0);
    box-shadow:0 0 18px rgba(212,175,55,0.18);
  }
  .rst-nav-btn.disabled { opacity:0 !important; pointer-events:none; }
  .rst-nav-left  { left:6%; }
  .rst-nav-right { right:6%; }
  body.rst-nav-peek .rst-nav-btn:not(.disabled) { opacity:0.92; pointer-events:auto; }
  /* ── RST 씬 nav-arrow: ui-text-only 예외 (마우스 이동 시 표시) ── */
  body.rst-active .nav-arrow{
    opacity:0 !important; visibility:visible !important; pointer-events:auto !important;
    transition:opacity 0.8s ease !important;
  }
  body.rst-active.rst-nav-peek .nav-arrow{
    opacity:0.55 !important;
  }
  /* ── RST 반딧불 (데스크탑) ── */
  #rst-fly{position:absolute;border-radius:50%;pointer-events:none;z-index:25;opacity:0;}
  /* ── RST 반딧불 nav-arrow breathe ── */
  @keyframes rstBreatheGlow {
    0%   { opacity:0.30; box-shadow:0 0 0 0 rgba(212,175,55,0),0 0 0 0 rgba(212,175,55,0); border-color:rgba(255,255,255,0.07); color:rgba(235,235,235,0.35); }
    50%  { opacity:0.92; box-shadow:0 0 8px 4px rgba(212,175,55,0.4),0 0 16px 8px rgba(212,175,55,0.16); border-color:rgba(212,175,55,0.64); color:rgba(255,235,120,1); }
    100% { opacity:0.30; box-shadow:0 0 0 0 rgba(212,175,55,0),0 0 0 0 rgba(212,175,55,0); border-color:rgba(255,255,255,0.07); color:rgba(235,235,235,0.35); }
  }
  .rst-nav-btn.rst-breathe {
    animation: rstBreatheGlow 6.4s ease-in-out 1 both !important;
  }
`;
