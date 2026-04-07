/* ================================================================
   gallery.js — Vitro Narida MOL  VER_32
   SPA + 전체 UI 통합 (MOL_Spec + 백업 참조)
   ================================================================ */
(function () {
'use strict';

/* ============================================================
   A. CSS
   ============================================================ */
var CSS_MOBILE  = `@import url('https://fonts.googleapis.com/css2?family=Nanum+Pen+Script&display=swap');
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
  overflow: hidden;
}
.photo-area {
  position: relative;
  flex-shrink: 0;
  background: #000;
  overflow: hidden;
  width: 100%;
  aspect-ratio: 1 / 1;
  touch-action: manipulation;
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
}
.control-area {
  position: relative;
  z-index: 2;
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
  transition: opacity 800ms ease;
}
.scene-img.show { opacity: 1; }
.img-error-msg {
  position: absolute; inset: 0;
  display: flex; align-items: center; justify-content: center;
  color: rgba(255,255,255,0.35); font-size: 14px; letter-spacing: 0.05em;
  pointer-events: none;
}
/* 모바일 fog 오버레이 */
.fog-overlay-m { position:absolute; inset:-12%; z-index:5; background-repeat:repeat; mix-blend-mode:screen;
  opacity: var(--fog-opacity, 0); transition: opacity 4000ms ease, transform 8000ms ease-in-out; pointer-events:none; transform: translateZ(0); }
.fog-overlay-m.animated { /* driven by JS transition now */ }
.fog-tint-m { position:absolute; inset:0; z-index:4; background: rgba(0,0,0,0.16); pointer-events:none; }
.fog-atmo {
  position: absolute; inset: -10%; z-index: 3; pointer-events: none;
  background:
    radial-gradient(ellipse at 20% 30%, rgba(200,205,210,0.5) 0%, transparent 50%),
    radial-gradient(ellipse at 70% 20%, rgba(190,195,205,0.4) 0%, transparent 45%),
    radial-gradient(ellipse at 40% 70%, rgba(195,200,210,0.45) 0%, transparent 55%),
    radial-gradient(ellipse at 80% 65%, rgba(185,190,200,0.35) 0%, transparent 40%),
    radial-gradient(ellipse at 10% 80%, rgba(200,205,215,0.3) 0%, transparent 50%);
  backdrop-filter: blur(3px); -webkit-backdrop-filter: blur(3px);
  animation: fogAtmoCycle 12s ease-in-out infinite, fogAtmoDrift 18s ease-in-out infinite;
}
.fog-atmo2 {
  position: absolute; inset: -10%; z-index: 3; pointer-events: none;
  background:
    radial-gradient(ellipse at 60% 40%, rgba(195,200,210,0.4) 0%, transparent 48%),
    radial-gradient(ellipse at 25% 60%, rgba(205,210,215,0.35) 0%, transparent 42%),
    radial-gradient(ellipse at 85% 35%, rgba(190,195,205,0.3) 0%, transparent 50%);
  animation: fogAtmoCycle2 15s ease-in-out infinite, fogAtmoDrift2 22s ease-in-out infinite;
}
@keyframes fogAtmoCycle {
  0%   { opacity: 0.5; visibility: visible; }
  39%  { opacity: 0.01; visibility: visible; }
  40%  { opacity: 0; visibility: hidden; }
  60%  { opacity: 0; visibility: hidden; }
  61%  { opacity: 0.01; visibility: visible; }
  100% { opacity: 0.5; visibility: visible; }
}
@keyframes fogAtmoCycle2 {
  0%   { opacity: 0; visibility: hidden; }
  29%  { opacity: 0; visibility: hidden; }
  30%  { opacity: 0.4; visibility: visible; }
  70%  { opacity: 0.4; visibility: visible; }
  71%  { opacity: 0; visibility: hidden; }
  100% { opacity: 0; visibility: hidden; }
}
@keyframes fogAtmoDrift {
  0%   { transform: translate(0, 0) scale(1.0); }
  25%  { transform: translate(3%, -2%) scale(1.04); }
  50%  { transform: translate(-2%, 2.5%) scale(1.06); }
  75%  { transform: translate(2%, 1%) scale(1.03); }
  100% { transform: translate(0, 0) scale(1.0); }
}
@keyframes fogAtmoDrift2 {
  0%   { transform: translate(0, 0) scale(1.02); }
  33%  { transform: translate(-3%, 1.5%) scale(1.05); }
  66%  { transform: translate(2%, -1.5%) scale(1.0); }
  100% { transform: translate(0, 0) scale(1.02); }
}
@keyframes fogDriftM {
  0%   { transform: translate(0,0) scale(1.02); }
  50%  { transform: translate(-1.6%, -1.0%) scale(1.045); }
  100% { transform: translate(0,0) scale(1.02); }
}







  70%  { transform: scale(1.6);  opacity: 0; }
  100% { transform: scale(1.6);  opacity: 0; }
}

  50%      { opacity: 0.85; }
}

  50%      { box-shadow: 0 0 18px 6px rgba(255,255,255,0.16); }
}

  50%      { stroke: rgba(220,220,220,0.90); }
}

.nav-bar {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
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
  width: 34px; height: 34px;
  border-radius: 999px;
  display: grid; place-items: center;
  font-family: "Nanum Pen Script", cursive;
  font-size: 15px;
  color: #e6e6e6;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.08);
  cursor: pointer; opacity: 0.65;
  -webkit-tap-highlight-color: transparent;
  transition: opacity 150ms ease;
}
.lang-btn.active { opacity: 1; border-color: rgba(255,255,255,0.20); }
.toc-mode-btn {
  width: 34px; height: 34px;
  border-radius: 999px;
  display: grid; place-items: center;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.08);
  cursor: pointer; opacity: 0.65;
  color: rgba(235,235,235,0.9);
  -webkit-tap-highlight-color: transparent;
  transition: opacity 150ms ease;
}
/* 모바일 TOC 하단 A-slim 스위치 */
/* mob-sw: 모바일 TOC 45×30 */
.mob-sw-track {
  width: 45px; height: 30px; border-radius: 999px;
  background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.12);
  position: relative; cursor: pointer; user-select: none; flex-shrink: 0;
  display: flex; align-items: center; justify-content: space-between; padding: 0 6px;
  -webkit-tap-highlight-color: transparent;
  transition: border-color 250ms;
}
.mob-sw-track.on { border-color: rgba(212,175,55,0.35); }
.mob-sw-side {
  font-size: 11px; font-family: sans-serif; color: rgba(235,235,235,0.30);
  line-height: 1; z-index: 1; pointer-events: none; transition: opacity 200ms;
}
.mob-sw-track:not(.on) .mob-sw-left  { opacity: 0; }
.mob-sw-track.on       .mob-sw-right { opacity: 0; }
.mob-sw-knob {
  position: absolute; top: 4px; left: 4px;
  width: 20px; height: 20px; border-radius: 50%;
  background: rgba(212,175,55,0.90);
  display: flex; align-items: center; justify-content: center;
  transition: left 250ms; pointer-events: none;
}
.mob-sw-track.on .mob-sw-knob { left: 21px; }
/* CSS 아이콘 — ■ 대체 (모바일 TOC knob) */
.mob-sw-sq { width: 7px; height: 7px; background: #1a1a1a; border-radius: 1px; flex-shrink: 0; }
/* CSS 아이콘 — ▶ 대체 (모바일 TOC knob) */
.mob-sw-tri { width: 0; height: 0; border-style: solid; border-color: transparent transparent transparent #1a1a1a; border-width: 4.5px 0 4.5px 7px; margin-left: 1px; flex-shrink: 0; }
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
/* about 모달 - 모바일에서도 중앙 모달로 표시 */
#aboutOverlay {
  align-items: center;
  justify-content: center;
}
#aboutOverlay .index-panel {
  width: min(480px, 90vw);
  height: auto;
  max-height: 80dvh;
  border-radius: 20px;
  border-bottom: 1px solid rgba(255,255,255,0.08);
  padding: 20px 24px 32px;
  transform: translateY(20px);
}
#aboutOverlay .index-title { font-weight: 700; }
#aboutOverlay.on .index-panel {
  transform: translateY(0);
}
#aboutGrid {
  display: block !important;
  width: 100%;
}
#aboutGrid .about-body {
  font-family: "Nanum Pen Script", cursive;
  font-size: clamp(22px, 3vw, 28px);
  line-height: 0.8;
  color: rgba(235,235,235,0.90);
  white-space: pre-wrap;
  word-break: keep-all;
  padding-left: 16px;
}
#aboutGrid .about-body p { margin: 0 0 40px 0; }
#aboutGrid .about-body p:last-child { margin-bottom: 0; }
/* poem 모달 */
#poemOverlay {
  align-items: center;
  justify-content: center;
}
#poemOverlay .index-panel {
  width: min(480px, 90vw);
  height: auto;
  max-height: 90dvh;
  border-radius: 20px;
  border-bottom: 1px solid rgba(255,255,255,0.08);
  padding: 20px 24px 32px;
  transform: translateY(20px);
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}
#poemOverlay .index-panel::-webkit-scrollbar { display: none; }
#poemOverlay.on .index-panel {
  transform: translateY(0);
}
#poemOverlay .poem-body {
  font-family: "Nanum Pen Script", cursive;
  font-size: clamp(20px, 2.5vw, 24px);
  line-height: 1.6;
  color: rgba(235,235,235,0.90);
  white-space: pre-wrap;
  word-break: keep-all;
  padding: 0 16px;
}
/* help 모달 - 콘텐츠 높이에 맞춤 */
#helpOverlay {
  align-items: center;
  justify-content: center;
}
#helpOverlay .index-panel {
  width: min(480px, 90vw);
  height: auto;
  max-height: 80dvh;
  border-radius: 20px;
  border-bottom: 1px solid rgba(255,255,255,0.08);
  padding: 20px 24px 32px;
  transform: translateY(20px);
}
#helpOverlay.on .index-panel {
  transform: translateY(0);
}
/* intro 버튼 오버레이 */
#introOverlay {
  align-items: center;
  justify-content: center;
}
#introOverlay .intro-circle-wrap {
  position: relative;
  display: grid; place-items: center;
  opacity: 0;
  transform: scale(0.8);
  transition: opacity 600ms ease, transform 600ms ease;
}
#introOverlay.on .intro-circle-wrap {
  opacity: 1;
  transform: scale(1);
}
#introOverlay .intro-btn {
  width: 88px; height: 88px; border-radius: 999px;
  display: grid; place-items: center;
  background: rgba(255,255,255,0.07);
  border: 1px solid rgba(255,255,255,0.18);
  cursor: pointer; user-select: none;
  -webkit-tap-highlight-color: transparent;
  position: relative; z-index: 1;
  animation: introBreath 2.8s ease-in-out infinite, introGlow 2.8s ease-in-out infinite;
}
#introOverlay .intro-btn-text {
  font-family: "Nanum Pen Script", cursive;
  font-size: 20px; letter-spacing: 0.5px;
  color: rgba(235,235,235,0.65);
  transition: color 200ms ease;
}
#introOverlay .intro-btn:active {
  transform: scale(0.92);
  animation: none;
}
#introOverlay .intro-ring {
  position: absolute; top: 50%; left: 50%;
  width: 88px; height: 88px;
  margin-top: -44px; margin-left: -44px;
  border-radius: 999px; pointer-events: none;
}
#introOverlay .intro-ring:nth-child(2) {
  border: 1.5px solid rgba(255,255,255,0.22);
  animation: introPulse 2.4s ease-out infinite;
}
#introOverlay .intro-ring:nth-child(3) {
  border: 1px solid rgba(255,255,255,0.14);
  animation: introPulse 2.4s ease-out 0.8s infinite;
}
@keyframes introBreath {
  0%, 100% { opacity: 0.55; }
  50% { opacity: 0.75; }
}
@keyframes introGlow {
  0%, 100% { box-shadow: 0 0 5px 2px rgba(255,255,255,0.06); }
  50% { box-shadow: 0 0 14px 5px rgba(255,255,255,0.14); }
}
@keyframes introPulse {
  0% { transform: scale(1); opacity: 0.55; }
  70% { transform: scale(1.55); opacity: 0; }
  100% { transform: scale(1.55); opacity: 0; }
}
/* 모바일 info 타임스탬프 */
.info-version{ position:absolute; bottom:14px; right:18px; font-family:"Nanum Pen Script", cursive;
font-size:16px; color: rgba(180,180,180,0.35); }
/* ===== Guestbook 오버레이 (모바일) ===== */
#gbOverlay { align-items:flex-end; }
#gbOverlay .gb-panel {
  position:relative; width:100%; max-height:92dvh;
  background: rgba(255,255,255,0.10); border:1px solid rgba(255,255,255,0.08); border-bottom:none;
  border-radius:20px 20px 0 0; padding:14px 16px 24px; overflow-y:auto; -ms-overflow-style:none; scrollbar-width:none;
  transform:translateY(20px); transition:transform 400ms ease; color:#e6e6e6;
}
.gb-panel::-webkit-scrollbar { display: none; }
#gbOverlay.on .gb-panel { transform:translateY(0); }
.gb-login-btn {
  display:inline-flex; align-items:center; padding:10px 20px;
  background:rgba(255,255,255,0.10); border:1px solid rgba(255,255,255,0.18);
  border-radius:10px; color:#e6e6e6; font-family:"Nanum Pen Script",cursive;
  font-size:18px; cursor:pointer; transition:background 200ms;
}
.gb-login-btn:active { background:rgba(255,255,255,0.20); }
.gb-user-info { display:flex; align-items:center; gap:10px; flex-wrap:wrap; }
.gb-user-photo { width:32px; height:32px; border-radius:50%; object-fit:cover; }
.gb-user-name { font-family:"Nanum Pen Script",cursive; font-size:18px; color:rgba(235,235,235,0.90); }
.gb-admin-badge { font-size:13px; color:rgba(212,175,55,0.90); border:1px solid rgba(212,175,55,0.40); border-radius:4px; padding:1px 6px; margin-left:4px; }
.gb-logout-btn {
  padding:4px 12px; background:transparent; border:1px solid rgba(255,255,255,0.15);
  border-radius:6px; color:rgba(220,220,220,0.60); font-family:"Nanum Pen Script",cursive;
  font-size:15px; cursor:pointer; margin-left:auto;
}
.gb-login-notice { font-family:"Nanum Pen Script",cursive; font-size:17px; color:rgba(220,220,220,0.50); padding:12px 0; }
.gb-form { margin:14px 0; }
.gb-input {
  width:100%; box-sizing:border-box; padding:6px 12px; background:rgba(255,255,255,0.06);
  border:1px solid rgba(255,255,255,0.12); border-radius:10px; color:#e6e6e6;
  font-family:"Nanum Pen Script",cursive; font-size:22px; line-height:1.5;
  outline:none; transition:border-color 200ms; margin-bottom:10px;
}
.gb-input:focus { border-color:rgba(212,175,55,0.50); }
.gb-input::placeholder { color:rgba(220,220,220,0.35); }
.gb-textarea {
  width:100%; box-sizing:border-box; padding:12px; background:rgba(255,255,255,0.06);
  border:1px solid rgba(255,255,255,0.12); border-radius:10px; color:#e6e6e6;
  font-family:"Nanum Pen Script",cursive; font-size:22px; line-height:1.5;
  resize:none; outline:none; transition:border-color 200ms;
}
.gb-textarea:focus { border-color:rgba(212,175,55,0.50); }
.gb-textarea::placeholder { color:rgba(220,220,220,0.35); }
.gb-form-footer { display:flex; align-items:center; justify-content:space-between; margin-top:8px; }
.gb-char-count { font-family:"Nanum Pen Script",cursive; font-size:18px; color:rgba(180,180,180,0.45); padding-left:12px; }
.gb-char-count.gb-char-warn { color:rgba(212,120,80,0.80); }
.gb-submit-btn {
  padding:8px; background:rgba(212,175,55,0.22); border:1px solid rgba(212,175,55,0.40);
  border-radius:8px; color:rgba(255,250,230,0.90); font-family:"Nanum Pen Script",cursive;
  font-size:18px; cursor:pointer; transition:background 200ms;
}
.gb-submit-btn:active { background:rgba(212,175,55,0.40); }
.gb-submit-btn:disabled { opacity:0.45; pointer-events:none; }
.gb-error-msg { font-family:"Nanum Pen Script",cursive; font-size:18px; color:rgba(212,120,80,0.85); padding-left:12px; max-height:0; overflow:hidden; opacity:0; transition:max-height 300ms ease, opacity 300ms ease; margin-bottom:0; }
.gb-error-msg.show { max-height:40px; opacity:1; margin-bottom:8px; }
.gb-entry { padding:14px 0; border-bottom:1px solid rgba(255,255,255,0.06); }
.gb-entry:last-child { border-bottom:none; }
.gb-entry-pending { opacity:0.55; }
.gb-entry-header { display:flex; align-items:center; gap:8px; margin-bottom:6px; flex-wrap:wrap; }
.gb-entry-photo { width:24px; height:24px; border-radius:50%; object-fit:cover; }
.gb-entry-name { font-family:"Nanum Pen Script",cursive; font-size:16px; color:rgba(235,235,235,0.80); }
.gb-entry-date { font-family:"Nanum Pen Script",cursive; font-size:14px; color:rgba(180,180,180,0.40); margin-left:auto; }
.gb-entry-message { font-family:"Nanum Pen Script",cursive; font-size:17px; color:rgba(230,230,230,0.85); line-height:1.55; white-space:pre-wrap; word-break:break-word; padding-left:32px; }
.gb-entry-admin { display:flex; gap:8px; margin-top:6px; padding-left:32px; }
.gb-approve-btn, .gb-delete-btn {
  padding:3px 10px; border-radius:5px; font-family:"Nanum Pen Script",cursive; font-size:14px; cursor:pointer; border:1px solid rgba(255,255,255,0.12); background:rgba(255,255,255,0.06); color:rgba(220,220,220,0.70);
}
.gb-approve-btn:active { background:rgba(212,175,55,0.30); }
.gb-delete-btn:active { background:rgba(200,60,60,0.30); }
.gb-approved-label { font-family:"Nanum Pen Script",cursive; font-size:13px; color:rgba(212,175,55,0.60); }
.gb-pending-label { font-family:"Nanum Pen Script",cursive; font-size:13px; color:rgba(200,150,80,0.60); border:1px solid rgba(200,150,80,0.25); border-radius:4px; padding:1px 6px; }
.gb-empty, .gb-loading { font-family:"Nanum Pen Script",cursive; font-size:17px; color:rgba(200,200,200,0.45); text-align:center; padding:32px 0; }
.gb-spinner { display:inline-block; width:16px; height:16px; border:2px solid rgba(255,255,255,0.15); border-top-color:rgba(212,175,55,0.70); border-radius:50%; animation:gbSpin 0.8s linear infinite; margin-right:8px; vertical-align:middle; }
@keyframes gbSpin { to { transform:rotate(360deg); } }
.gb-toast { position:fixed; bottom:80px; left:50%; transform:translateX(-50%) translateY(20px); background:rgba(30,30,30,0.92); color:#e6e6e6; font-family:"Nanum Pen Script",cursive; font-size:16px; padding:10px 24px; border-radius:10px; border:1px solid rgba(255,255,255,0.08); opacity:0; transition:opacity 300ms, transform 300ms; pointer-events:none; z-index:10002; }
.gb-toast.show { opacity:1; transform:translateX(-50%) translateY(0); }
.gb-toast-error { border-color:rgba(200,60,60,0.40); }
.gb-success { text-align:center; padding:48px 16px; font-family:"Nanum Pen Script",cursive; }
.gb-success-icon { font-size:32px; margin-bottom:16px; }
.gb-success-msg { font-size:22px; line-height:1.7; color:rgba(230,230,230,0.80); }
.gb-subtitle { font-family:"Nanum Pen Script",cursive; font-size:22px; color:rgba(220,220,220,0.55); margin:0 0 14px; line-height:1.5; }
/* ===== Thumbnail Grid + Heart (모바일) ===== */
.mob-unified-body{ display:flex; flex:1; min-height:0; margin:-12px -24px -40px; }
.mob-col-title{ font-family:"Nanum Pen Script",cursive; font-size:20px; color:rgba(235,235,235,0.92); margin:0 0 6px; padding:4px 0; }
.mob-unified-left{ flex:0 0 38%; overflow-y:auto; -ms-overflow-style:none; scrollbar-width:none; padding:12px 10px 24px 24px; }
.mob-unified-left::-webkit-scrollbar{ display:none; }
.mob-unified-right{ flex:1; overflow-y:auto; -ms-overflow-style:none; scrollbar-width:none; border-left:1px solid rgba(255,255,255,0.06); background:rgba(0,0,0,0.12); padding:12px 24px 24px 10px; }
.mob-unified-right::-webkit-scrollbar{ display:none; }
.mob-right-header{ display:flex; align-items:center; justify-content:space-between; padding:0 0 6px; position:sticky; top:0; z-index:5; }
.mob-right-header h3{ font-family:"Nanum Pen Script",cursive; font-size:20px; color:rgba(235,235,235,0.90); margin:0; }
.mob-expand-btn{ cursor:pointer; padding:4px; opacity:0.5; -webkit-tap-highlight-color:transparent; }
.mob-expand-btn svg{ width:16px; height:16px; stroke:currentColor; fill:none; stroke-width:1.5; }
.mob-thumb-grid{ display:grid; grid-template-columns:repeat(2,1fr); gap:6px; padding:0 0 16px; }
.mob-thumb-grid .thumb-section-head{ grid-column:1/-1; font-family:"Nanum Pen Script",cursive; font-size:13px; color:rgba(230,230,230,0.60); padding:6px 2px 2px; border-top:1px solid rgba(255,255,255,0.06); margin-top:2px; }
.mob-thumb-grid .thumb-section-head:first-child{ border-top:none; margin-top:0; }
.mob-thumb-grid .thumb-card{ border-radius:8px; }
.mob-thumb-grid .thumb-code{ font-size:11px; padding:2px 6px; }
.mob-thumb-grid .thumb-heart svg{ width:16px; height:16px; }
.mob-thumb-grid .thumb-card.thumb-locked .thumb-lock-icon svg{ width:18px; height:18px; }
.mob-thumb-grid .thumb-card.thumb-locked .thumb-title{ font-size:10px; bottom:18px; }
.mob-contact-icons{ display:flex; flex-direction:column; gap:8px; margin-top:2px; }
.mob-contact-icons a{ display:flex; align-items:center; gap:5px; color:rgba(220,220,220,0.50); -webkit-tap-highlight-color:transparent; text-decoration:none; overflow:hidden; }
.mob-contact-icons svg{ width:18px; height:18px; flex-shrink:0; }
.mob-contact-icon-text{ font-family:"Nanum Pen Script",cursive; font-size:15px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.mob-copyright{ font-family:"Nanum Pen Script",cursive; font-size:14px; color:rgba(200,200,200,0.40); line-height:1.4; }
.mob-bottom-bar{ display:flex; align-items:center; gap:6px; }
.mob-info-btn{ width:36px; height:36px; border-radius:999px; display:grid; place-items:center; color:rgba(200,200,200,0.6); background:transparent; border:1px solid rgba(255,255,255,0.05); cursor:pointer; -webkit-tap-highlight-color:transparent; }
.thumb-grid { display:grid; grid-template-columns:repeat(2, 1fr); gap:10px; padding:4px 0 16px; }
.thumb-section-head { grid-column:1/-1; font-family:"Nanum Pen Script",cursive; font-size:16px; color:rgba(230,230,230,0.65); padding:8px 2px 2px; border-top:1px solid rgba(255,255,255,0.06); margin-top:4px; }
.thumb-section-head:first-child { border-top:none; margin-top:0; }
.thumb-card { position:relative; border-radius:10px; overflow:hidden; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); cursor:pointer; -webkit-tap-highlight-color:transparent; }
.thumb-card.thumb-current { border-color:rgba(212,175,55,0.70); box-shadow:0 0 12px rgba(212,175,55,0.15); }
.thumb-img { width:100%; aspect-ratio:1/1; object-fit:cover; display:block; opacity:0; transition:opacity 500ms ease; }
.thumb-img.loaded { opacity:1; }
.thumb-code { position:absolute; bottom:0; left:0; right:0; padding:4px 8px; font-family:"Nanum Pen Script",cursive; font-size:13px; color:rgba(255,255,255,0.80); background:linear-gradient(transparent, rgba(0,0,0,0.55)); pointer-events:none; }
.thumb-heart { position:absolute; bottom:6px; right:8px; width:32px; height:32px; display:flex; align-items:center; justify-content:center; cursor:pointer; z-index:2; -webkit-tap-highlight-color:transparent; transition:transform 200ms ease; }
.thumb-heart:active { transform:scale(1.3); }
.thumb-heart svg { width:20px; height:20px; transition:fill 300ms ease, stroke 300ms ease; }
.thumb-heart svg.heart-empty { fill:none; stroke:rgba(255,255,255,0.60); stroke-width:1.5; }
.thumb-heart svg.heart-filled { fill:rgba(212,175,55,0.90); stroke:rgba(212,175,55,0.90); stroke-width:1.5; }
@keyframes heartPop { 0%{transform:scale(1)} 50%{transform:scale(1.4)} 100%{transform:scale(1)} }
.thumb-heart.pop { animation:heartPop 300ms ease; }
.thumb-card.thumb-locked { opacity:0.35; cursor:default; }
.thumb-card.thumb-locked .thumb-placeholder { width:100%; aspect-ratio:1/1; background:rgba(60,60,60,0.7); }
.thumb-card.thumb-locked .thumb-code { color:rgba(255,255,255,0.45); }
.thumb-card.thumb-locked .thumb-lock-icon { position:absolute; top:50%; left:50%; transform:translate(-50%,-60%); opacity:0.5; }
.thumb-card.thumb-locked .thumb-lock-icon svg { width:22px; height:22px; stroke:rgba(255,255,255,0.55); fill:none; stroke-width:1.5; }
.thumb-card.thumb-locked .thumb-title { position:absolute; bottom:22px; left:0; right:0; text-align:center; font-family:"Nanum Pen Script",cursive; font-size:12px; color:rgba(255,255,255,0.4); pointer-events:none; }
/* ===== Scene List Overlay ===== */
.slst-header{ display:flex; align-items:center; justify-content:space-between; padding:12px 16px 10px; flex-shrink:0; border-bottom:1px solid rgba(255,255,255,0.06); }
.slst-body{ flex:1; overflow-y:auto; -ms-overflow-style:none; scrollbar-width:none; min-height:0; }
.slst-body::-webkit-scrollbar{ display:none; }
.slst-item{ display:flex; align-items:center; gap:14px; padding:5px 16px; border-bottom:1px solid rgba(255,255,255,0.04); }
.slst-item:last-child{ border-bottom:none; }
.slst-thumb{ width:54px; height:54px; border-radius:8px; overflow:hidden; flex-shrink:0; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.07); display:grid; place-items:center; }
.slst-img{ width:100%; height:100%; object-fit:cover; display:block; opacity:0; transition:opacity 400ms ease; }
.slst-img.loaded{ opacity:1; }
.slst-lock{ display:grid; place-items:center; width:100%; height:100%; }
.slst-lock svg{ width:18px; height:18px; stroke:rgba(255,255,255,0.22); fill:none; stroke-width:1.5; }
.slst-title{ font-family:"Nanum Pen Script",cursive; font-size:clamp(20px,2.5vw,26px); color:rgba(235,235,235,0.72); line-height:1.3; cursor:pointer; word-break:keep-all; }
.slst-title.has-poem{ cursor:pointer; }
.slst-title.has-poem:hover{ text-decoration:underline; text-underline-offset:4px; }
@keyframes slst-shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-5px)} 75%{transform:translateX(5px)} }
.slst-shake { animation: slst-shake 0.35s ease; }
.slst-lock-tag{ display:inline-block; vertical-align:middle; margin-left:8px; opacity:0.5; flex-shrink:0; }
.slst-lock-tag svg{ width:13px; height:13px; stroke:rgba(212,175,55,0.9); fill:none; stroke-width:2.0; display:block; }
.slst-current{ background:rgba(212,175,55,0.06); }
.slst-current .slst-title{ color:rgba(212,175,55,0.88); }
.slst-divider{ height:18px; flex-shrink:0; }
/* 달빛 아이콘 - 모바일 */






50%{opacity:0.5;transform:translate(-50%,-50%) scale(1.05)}}
50%{opacity:0.5;transform:translate(-50%,-50%) scale(1.08)}}
50%{opacity:0.45;transform:translate(-50%,-50%) scale(1.12)}}
70%{transform:translate(-50%,-50%) scale(1.8);opacity:0}100%{transform:translate(-50%,-50%) scale(1.8);opacity:0}}
.stanza-scene {
  position: absolute; inset: 0;
  background: #000;
  overflow: hidden;
}
.stanza-canvas {
  position: absolute; inset: 0;
  pointer-events: none;
}
.stanza-text-wrap {
  position: absolute; bottom: 13%; left: 0; right: 0;
  display: flex; flex-direction: column; align-items: center;
  pointer-events: none; opacity: 0;
  transition: opacity 700ms ease;
}
.stanza-text-wrap.visible { opacity: 1; }
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
  text-shadow: 0 1px 4px rgba(0,0,0,0.65), 0 0 8px rgba(0,0,0,0.4);
}
.scene-text.show { opacity: 1; transform: translateY(0); }
@keyframes typeCursorBlink { 0%,49%{opacity:1} 50%,100%{opacity:0} }
.type-wrap { display:inline; white-space:inherit; }
.type-cursor { display:inline-block; width:0; height:1em; border-left:2px solid rgba(230,230,230,0.85); vertical-align:text-bottom; margin-left:2px; animation:typeCursorBlink 0.8s step-start infinite; }
`;
var CSS_DESKTOP = `@import url('https://fonts.googleapis.com/css2?family=Nanum+Pen+Script&display=swap');
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

  /* 공통 장면 스타일 */
  .scene{ background:#2e2e2e; overflow:hidden; }
  .scene-wrap{ position:relative; width:100%; height:100%; background:#2e2e2e; }
  .square-frame{ position:absolute; left:50%; top:50%; transform:translate(-50%,-50%) translateZ(0);
  width:min(100vw, var(--vh100, 100vh)); aspect-ratio: 1 / 1; background:#000; overflow:hidden; }

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
  .nav-btn{ border-radius:999px; display:grid; place-items:center; color:rgba(235,235,235,0.35);
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.07);
  backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
  cursor:pointer; user-select:none;
  opacity:0; pointer-events:none; transition: opacity var(--nav-fade) ease, transform 200ms ease;
  -webkit-tap-highlight-color: transparent; touch-action: manipulation; font-family:"Nanum Pen Script", cursive; }
  .nav-btn:hover{ opacity:1; transform: scale(1.04) translateZ(0);
    background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.22);
    color: rgba(235,235,235,0.90); box-shadow: 0 0 14px 4px rgba(255,255,255,0.10); }
  .nav-btn:active{ transform: scale(0.92) translateZ(0); box-shadow: 0 0 14px rgba(212,175,55,0.18); }

  .nav-ready .nav-btn{ opacity:0.92; pointer-events:auto; }

  .nav-menu{ position:absolute; top:6%; left:6%; transform: translateZ(0); z-index:60; width:52px; height:52px; }

  .nav-scenelist{ position:absolute; top:6%; right:6%; z-index:60; width:52px; height:52px; }

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
  .nav-menu[data-tip]::after, .nav-scenelist[data-tip]::after{ 
  top: calc(100% + 10px); left:50%; transform: translateX(-50%) translateY(-6px); }
  .intro-bar-btn[data-tip]::after{ bottom: calc(100% + 10px); left:50%; transform: translateX(-50%) translateY(6px); }
  .intro-sw[data-tip]::after{ bottom: calc(100% + 10px); left:50%; transform: translateX(-50%) translateY(6px); font-size:14px; }
  [data-tip]:hover::after, [data-tip]:focus-visible::after{ opacity:1; transform: translateX(-50%) translateY(0); }

  /* UI 모드 */
  body.ui-hide-all .fog-text, body.ui-hide-all .scene-text,
  body.ui-hide-all .work-code{ opacity:0 !important; visibility:hidden !important; pointer-events:none !important; }

  /* Photo Only 모드 - nav-scenelist 항상 표시 */
  body.ui-hide-all .nav_arrow, body.ui-hide-all .nav-menu{ opacity:0; visibility:hidden; pointer-events:none;
    transition: opacity 1200ms ease, visibility 1200ms ease; }
  body.ui-hide-all.solo-peek .nav-arrow, body.ui-hide-all.solo-peek .nav-menu{ opacity:0.92 !important; visibility:visible !important; pointer-events:auto !important;
    transition: opacity 300ms ease, visibility 0ms !important; }

  body.ui-text-only .nav-arrow, body.ui-text-only .nav-menu, body.ui-text-only .nav-btn:not(.nav-scenelist), body.ui-text-only .work-code{ 
  opacity:0 !important; visibility:hidden !important; pointer-events:none !important; }
  body.ui-text-only .nav-scenelist{ opacity:0 !important; visibility:hidden !important; pointer-events:none !important;
    transition: opacity 1200ms ease, visibility 1200ms ease; }
  body.ui-hide-all .nav-btn:not(.nav-scenelist){ opacity:0; visibility:hidden; pointer-events:none;
    transition: opacity 1200ms ease, visibility 1200ms ease; }
  body.ui-hide-all.solo-peek .nav-btn:not(.nav-scenelist){ opacity:0.92 !important; visibility:visible !important; pointer-events:auto !important;
    transition: opacity 300ms ease, visibility 0ms !important; }
  body.ui-text-only .fog-text, body.ui-text-only .scene-text{ pointer-events:none !important; }
  body.ui-text-only .nav-arrow, body.ui-text-only .nav-menu{ transition: opacity 1200ms ease, visibility 1200ms ease; }
  body.ui-text-only.solo-peek .nav-arrow, body.ui-text-only.solo-peek .nav-menu{ opacity:0.92 !important; visibility:visible !important; pointer-events:auto !important;
    transition: opacity 300ms ease, visibility 0ms !important; }
  body.ui-text-only.solo-peek .nav-scenelist{ opacity:0.92 !important; visibility:visible !important; pointer-events:auto !important;
    transition: opacity 300ms ease, visibility 0ms !important; }

  /* FOG 장면 */
  .hero{ position:relative; width:100%; height:100%; background:#000; overflow:hidden; }
  .bg{ position:absolute; inset:0; width:100%; height:100%; object-fit:contain; background:#000; transform: translateZ(0); }
  .fog-lqip{ z-index:2; filter: blur(18px); transform: scale(1.06) translateZ(0); opacity:1; transition: opacity 1200ms ease; }
  .fog-hq{ z-index:3; opacity:0; visibility:hidden; transform: scale(1.01) translateZ(0); transition: opacity var(--fog-hq-fade) ease; }
  .hero.hq-show .fog-hq{ opacity:1; visibility:visible; }
  .hero.lqip-hide .fog-lqip{ opacity:0; }
  .overlay{ position:absolute; inset:0; z-index:4; background: rgba(0,0,0,0.16); pointer-events:none; }
  .fog{ position:absolute; inset:-12%; z-index:5; background-repeat:repeat; mix-blend-mode:screen;
  opacity: var(--fog-opacity, var(--fog-opacity-base));
  transition: opacity 4000ms ease, transform 8000ms ease-in-out;
   pointer-events:none; transform: translateZ(0); }
  .fog.animated{ /* driven by JS transition now */ }
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
  white-space:nowrap; overflow:hidden;
  text-shadow: 0 1px 4px rgba(0,0,0,0.65), 0 0 8px rgba(0,0,0,0.4); }
  .fog-text > *, .scene-text > *{ max-width:95%; display:inline-block; }
  .fog-text{ transition: opacity var(--fog-text-fade) ease, transform var(--fog-text-fade) ease; }
  .scene-text{ transition: opacity var(--scene-text-fade) ease, transform var(--scene-text-fade) ease; z-index:10; }
  .scene-text.long-text{ height:auto; white-space:pre-wrap; overflow:visible; }
  @keyframes typeCursorBlink { 0%,49%{opacity:1} 50%,100%{opacity:0} }
  .type-wrap { display:inline; white-space:inherit; }
  .type-cursor { display:inline-block; width:0; height:1em; border-left:2px solid rgba(230,230,230,0.85); vertical-align:text-bottom; margin-left:2px; animation:typeCursorBlink 0.8s step-start infinite; }
  .hero.show-text .fog-text, .scene.show-text .scene-text{ opacity:0.92; transform: translateY(0) translateZ(0); }
  .scene.show-text .scene-text{ opacity:0.95; }

  /* 쉬어가는 페이지 */
  .rest-note { font-size: clamp(24px, 2.5vw, 29px) !important; color: rgba(235,235,235,0.38) !important; letter-spacing: 1px !important; line-height: 1.8 !important; }
  
  /* 달빛 아이콘 */
  
  
  
  
  
  
  50%{opacity:1.0;transform:translate(-50%,-50%) scale(1.05)}}
  50%{opacity:1.0;transform:translate(-50%,-50%) scale(1.08)}}
  50%{opacity:0.9;transform:translate(-50%,-50%) scale(1.12)}}
  70%{transform:translate(-50%,-50%) scale(1.8);opacity:0}100%{transform:translate(-50%,-50%) scale(1.8);opacity:0}}
  
  }
  50%{transform:translate3d(0,25px,0)}}
  
  }
  50%{transform:translate3d(0,25px,0)}}
  
  }
  50%{transform:translate3d(0,25px,0)}}
  /* 이미지 장면 */
  .scene-img{ position:absolute; inset:0; width:100%; height:100%; object-fit:contain; background:#000;
  opacity:0; transition: opacity var(--scene-hq-fade) ease; transform: translateZ(0); will-change: opacity; }
  .scene.hq-show .scene-img{ opacity:1; }

  /* === RST 파도 배경 === */
  
  
  
  
  
  
  
  
  100%{transform:translate3d(0%,0,0)}}
  
  }
  50%{transform:translate3d(0,25px,0)}}
  
  }
  50%{transform:translate3d(0,25px,0)}}
  
  }
  50%{transform:translate3d(0,25px,0)}}
  
  }
  50%{transform:translate3d(0,25px,0)}}
  
  }
  50%{transform:translate3d(0,25px,0)}}
  
  
  
  
  
  50%{opacity:1.0;transform:translate(-50%,-50%) scale(1.05)}}
  50%{opacity:1.0;transform:translate(-50%,-50%) scale(1.08)}}
  50%{opacity:0.9;transform:translate(-50%,-50%) scale(1.12)}}
  70%{transform:translate(-50%,-50%) scale(1.8);opacity:0}100%{transform:translate(-50%,-50%) scale(1.8);opacity:0}}
  
  #LPL_03Screen .scene-text,
  #LPL_04Screen .scene-text{ z-index:20 !important; }

  /* 오버레이 공통 */
  .overlay-panel{ position:fixed; inset:0; z-index:10000; display:flex; align-items:center; justify-content:center;
  opacity:0; pointer-events:none; transition: opacity var(--menu-fade-in) ease; }
  .overlay-panel.on{ opacity:1; pointer-events:auto; }
  .overlay-panel.closing{ transition-duration: var(--menu-fade-out); }
  .overlay-backdrop{ position:absolute; inset:0; background: rgba(0,0,0,0.55); 
  backdrop-filter: blur(3px); -webkit-backdrop-filter: blur(3px); }
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
  -webkit-tap-highlight-color: transparent; touch-action: manipulation; opacity:0.75; transition: opacity 180ms ease, transform 180ms ease; position:relative; }
  .langBtn:hover{ opacity:1; transform: translateY(-1px); }
  .langBtn.active{ opacity:1; background: rgba(255,255,255,0.035); border-color: rgba(255,255,255,0.16); }
  .toc-mode-btn{ width:44px; height:34px; border-radius:999px; display:grid; place-items:center;
  font-family:"Nanum Pen Script", cursive; font-size:18px; color:#e6e6e6;
  background: rgba(255,255,255,0.035); border: 1px solid rgba(255,255,255,0.05); cursor:pointer; user-select:none;
  -webkit-tap-highlight-color: transparent; touch-action: manipulation; opacity:0.75; transition: opacity 180ms ease; position:relative; }
  .toc-mode-btn:hover{ opacity:1; }
  .langBtn[data-tip]::after, .toc-mode-btn[data-tip]::after, .toc-info-btn[data-tip]::after{ bottom: calc(100% + 8px); left:50%; transform: translateX(-50%) translateY(6px); font-size:14px; }

  /* mob-sw knob 스위치 — 데스크탑 CSS_DESKTOP 전용 주입 */
  .mob-sw-track{ width:45px; height:30px; border-radius:999px;
    background:rgba(255,255,255,0.07); border:1px solid rgba(255,255,255,0.12);
    position:relative; cursor:pointer; user-select:none; flex-shrink:0;
    display:flex; align-items:center; justify-content:space-between; padding:0 6px;
    -webkit-tap-highlight-color:transparent; transition:border-color 250ms; }
  .mob-sw-track:hover{ border-color:rgba(255,255,255,0.22); }
  .mob-sw-track.on{ border-color:rgba(212,175,55,0.35); }
  .mob-sw-side{ font-size:11px; font-family:sans-serif; color:rgba(235,235,235,0.30);
    line-height:1; z-index:1; pointer-events:none; transition:opacity 200ms; }
  .mob-sw-track:not(.on) .mob-sw-left{ opacity:0; }
  .mob-sw-track.on .mob-sw-right{ opacity:0; }
  .mob-sw-knob{ position:absolute; top:4px; left:4px; width:20px; height:20px; border-radius:50%;
    background:rgba(212,175,55,0.90); display:flex; align-items:center; justify-content:center;
    transition:left 250ms; pointer-events:none; }
  .mob-sw-track.on .mob-sw-knob{ left:21px; }
  .mob-sw-sq{ width:7px; height:7px; background:#1a1a1a; border-radius:1px; flex-shrink:0; }
  .mob-sw-tri{ width:0; height:0; border-style:solid; border-color:transparent transparent transparent #1a1a1a; border-width:4.5px 0 4.5px 7px; margin-left:1px; flex-shrink:0; }

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

  /* 인포 버튼 (왼쪽 하단) */
  .toc-info-btn{ position:absolute; bottom: 14px; left: 14px; right: auto; width: 36px; height: 36px;
  border-radius: 999px; display:grid; place-items:center; color: rgba(200,200,200,0.6);
  background: transparent; border: 1px solid rgba(255,255,255,0.22);
  cursor:pointer; user-select:none; -webkit-tap-highlight-color: transparent; touch-action: manipulation;
  transition: color 200ms ease, border-color 200ms ease, background 200ms ease; z-index:10; }
  .toc-info-btn:hover{ color: rgba(235,235,235,0.92); border-color: rgba(255,255,255,0.30); background: rgba(255,255,255,0.035); }

  /* 인포 패널 슬라이드 */
  .toc-main{ transition: opacity 250ms ease, transform 250ms ease; }
  .info-section{ margin-bottom: 14px; }
  .info-section-h{ font-family:"Nanum Pen Script", cursive; font-size:26px; line-height:1.1;
  color: rgba(235,235,235,0.92); margin: 0 0 6px 0; padding-bottom: 4px;
  border-bottom: 1px solid rgba(255,255,255,0.06); }
  .info-row{ font-family:"Nanum Pen Script", cursive; font-size:20px; line-height:1.5;
  color: rgba(210,210,210,0.85); padding: 2px 0 2px 12px; }
  .info-row kbd{ display:inline-block; padding:1px 6px; border-radius:4px; font-size:0.88em;
  background: rgba(255,255,255,0.035); border: 1px solid rgba(255,255,255,0.05);
  font-family:"Nanum Pen Script", cursive; }

  .info-version{ position:absolute; bottom:14px; right:18px; font-family:"Nanum Pen Script", cursive;
  font-size:21px; color: rgba(180,180,180,0.28); user-select:none; }

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

  /* UNIFIED 패널 (메뉴+색인 통합) */
  .unified-panel{ display:flex; --sz:min(84vh,90vw,880px); width:var(--sz); height:var(--sz); padding:0; overflow:hidden; }
  .unified-left{ position:relative; flex:0 0 clamp(190px,28%,230px); padding:16px 18px 14px; overflow-y:auto; -ms-overflow-style:none; scrollbar-width:none; border-right:1px solid rgba(255,255,255,0.06); }
  .unified-left::-webkit-scrollbar{ display:none; }
  .unified-left .toc-header{ padding-right:0; margin-bottom:6px; }
  .unified-left .toc-title{ font-size:24px; }
  .unified-left .menu-section{ padding-left:0; }
  .unified-left .menu-h{ font-size:26px; }
  .unified-left .toc-list{ font-size:20px; margin-left:-8px; }
  .unified-left .toc-item{ gap:10px; }
  .unified-left .toc-bullet{ width:10px; flex:0 0 10px; font-size:10px; }
  .unified-right{ flex:1; display:flex; flex-direction:column; padding:16px 16px 14px; overflow:hidden; background:rgba(0,0,0,0.18); border-radius:0 16px 16px 0; }
  .unified-right .index-title{ margin:0 0 10px 4px; padding-right:40px; }
  .unified-right-header{ display:flex; align-items:center; justify-content:space-between; padding-right:40px; }
  .thumb-expand-btn{ cursor:pointer; padding:4px; opacity:0.5; transition:opacity 180ms ease; }
  .thumb-expand-btn:hover{ opacity:0.9; }
  .thumb-expand-btn svg{ width:18px; height:18px; }
  .thumb-expand-btn .icon-collapse{ display:none; }
  .unified-panel.expanded .thumb-expand-btn .icon-expand{ display:none; }
  .unified-panel.expanded .thumb-expand-btn .icon-collapse{ display:block; }
  .unified-panel.expanded .unified-left{ flex:0 0 0; width:0; padding:0; overflow:hidden; border:none; opacity:0; pointer-events:none; transition:flex 300ms ease, opacity 200ms ease, padding 300ms ease; }
  .unified-panel.expanded .unified-right{ border-radius:16px; }
  .unified-panel.expanded .thumb-grid{ grid-template-columns:repeat(4, 1fr); }
  .unified-left{ transition:flex 300ms ease, opacity 200ms ease, padding 300ms ease; }
  .unified-thumb-body{ flex:1; overflow-y:auto; -ms-overflow-style:none; scrollbar-width:none; padding:0 2px; }
  .unified-thumb-body::-webkit-scrollbar{ display:none; }
  .unified-panel .toc-close{ top:12px; right:12px; }
  .unified-panel .toc-info-btn{ bottom:12px; left:14px; right:auto; }
#thumbOverlay .toc-header{ background: rgba(30,28,26,0.92); margin: -14px -12px 8px; padding: 14px 12px 8px; border-radius: 20px 20px 0 0; }
  .unified-bottom-bar{ position:absolute; bottom:12px; left:14px; display:flex; align-items:center; gap:12px; }
  .unified-bottom-bar .toc-info-btn{ position:static; }
  .contact-icons{ display:flex; flex-direction:column; gap:8px; margin-top:2px; padding-left:12px; }
  .contact-icon{ display:flex; align-items:center; gap:5px; color:rgba(220,220,220,0.55); transition:color 180ms ease; text-decoration:none; overflow:hidden; }
  .contact-icon:hover{ color:rgba(235,235,235,0.92); }
  .contact-icon svg{ width:20px; height:20px; flex-shrink:0; }
  .contact-icon-text{ font-family:"Nanum Pen Script",cursive; font-size:15px; letter-spacing:0; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
  .menu-copyright{ font-family:"Nanum Pen Script",cursive; font-size:18px; color:rgba(200,200,200,0.45); line-height:1.4; padding-left:12px; }
  .has-tooltip{ position:relative; }
  .has-tooltip::after{ content:attr(data-tooltip); position:absolute; left:105%; top:50%; transform:translateY(-50%); white-space:nowrap;
    font-family:"Nanum Pen Script",cursive; font-size:16px; color:rgba(220,220,220,0.85);
    background:rgba(30,30,30,0.92); border:1px solid rgba(255,255,255,0.1); border-radius:8px;
    padding:4px 12px; pointer-events:none; opacity:0; transition:opacity 200ms ease; z-index:30; }
  .has-tooltip:hover::after{ opacity:1; }

  /* INDEX 오버레이 */
  #aboutOverlay{ z-index:10002; }
  .index-panel{ width:min(720px, 92vw); max-height: min(86vh, 900px); overflow:hidden; padding: 16px 16px 14px; }
  .index-header{ display:flex; align-items:flex-start; justify-content:space-between; gap:12px;
  padding: 2px 2px 10px; padding-right: 56px; }
  .index-title{ font-family:"Nanum Pen Script", cursive; font-size: 26px; line-height:1.1; margin: 0; letter-spacing: 0.2px; }
  .index-sub{ font-family:"Nanum Pen Script", cursive; font-size: 20px; line-height:1.2; opacity:0.74; margin-top: 6px; padding-left: 20px; }
  .index-body{ overflow-y:auto; overflow-x:hidden; max-height: calc(min(86vh, 900px) - 92px); padding: 6px 4px 2px; -ms-overflow-style: none; scrollbar-width: none; }
  .index-body::-webkit-scrollbar { display: none; }

  .index-grid{ display:grid; grid-template-columns: repeat(8, 1fr); gap: 5px; }
#indexGrid.about-mode{ display:block !important; }
#indexGrid.about-mode .about-body,
#aboutGrid.about-mode .about-body{
  padding: 6px 6px 0 20px;
  font-family:"Nanum Pen Script", cursive;
  font-size: clamp(20px, 2vw, 22px);
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
#aboutOverlay .index-title{ font-weight: 700; }
#aboutGrid{
  display: block !important;
  width: 100%;
}

#poemOverlay{ z-index:10003; }
#poemOverlay .index-panel{
  width: min(510px, 88vw);
  max-height: 90vh;
  padding: 24px 32px 40px;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}
#poemOverlay .index-panel::-webkit-scrollbar { display: none; }
#poemOverlay .poem-body{
  font-family: "Nanum Pen Script", cursive;
  font-size: clamp(22px, 3vw, 28px);
  line-height: 1.6;
  color: rgba(235,235,235,0.90);
  white-space: pre-wrap;
  word-break: keep-all;
  padding: 0 16px;
}

#introOverlay{ z-index:10003; }
#introOverlay .intro-circle-wrap{
  position: relative;
  display: grid; place-items: center;
  opacity: 0;
  transform: scale(0.8);
  transition: opacity 600ms ease, transform 600ms ease;
}
#introOverlay.on .intro-circle-wrap{
  opacity: 1;
  transform: scale(1);
}
#introOverlay .intro-btn{
  width: 88px; height: 88px; border-radius: 999px;
  display: grid; place-items: center;
  background: rgba(255,255,255,0.07);
  border: 1px solid rgba(255,255,255,0.18);
  cursor: pointer; user-select: none;
  position: relative; z-index: 1;
  animation: introBreath 2.8s ease-in-out infinite, introGlow 2.8s ease-in-out infinite;
  transition: background 150ms ease, box-shadow 150ms ease;
}
#introOverlay .intro-btn-text{
  font-family: "Nanum Pen Script", cursive;
  font-size: 20px; letter-spacing: 0.5px;
  color: rgba(235,235,235,0.65);
  transition: color 200ms ease;
}
#introOverlay .intro-btn:hover{
  animation: none;
  opacity: 1;
  background: rgba(255,255,255,0.09);
  box-shadow: 0 0 20px 6px rgba(255,255,255,0.18);
}
#introOverlay .intro-btn:hover .intro-btn-text{
  color: rgba(235,235,235,0.95);
}
#introOverlay .intro-btn:active{
  transform: scale(0.91);
  box-shadow: 0 0 10px rgba(0,0,0,0.55);
  animation: none;
}
#introOverlay .intro-ring{
  position: absolute; top: 50%; left: 50%;
  width: 88px; height: 88px;
  margin-top: -44px; margin-left: -44px;
  border-radius: 999px; pointer-events: none;
}
#introOverlay .intro-ring:nth-child(2){
  border: 1.5px solid rgba(255,255,255,0.22);
  animation: introPulse 2.4s ease-out infinite;
}
#introOverlay .intro-ring:nth-child(3){
  border: 1px solid rgba(255,255,255,0.14);
  animation: introPulse 2.4s ease-out 0.8s infinite;
}
#introOverlay .intro-btn:hover ~ .intro-ring{
  animation: none; opacity: 0;
}
@keyframes introBreath {
  0%, 100% { opacity: 0.55; }
  50% { opacity: 0.75; }
}
@keyframes introGlow {
  0%, 100% { box-shadow: 0 0 5px 2px rgba(255,255,255,0.06); }
  50% { box-shadow: 0 0 14px 5px rgba(255,255,255,0.14); }
}
@keyframes introPulse {
  0% { transform: scale(1); opacity: 0.55; }
  70% { transform: scale(1.55); opacity: 0; }
  100% { transform: scale(1.55); opacity: 0; }
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
  box-shadow: 0 3px 8px rgba(0,0,0,0.03); backdrop-filter: blur(3px); -webkit-backdrop-filter: blur(3px); }
  .idx-tile[data-title]:hover::after, .idx-tile[data-title]:focus-visible::after{ 
  opacity:1; transform: translateX(-50%) translateY(0); }

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

/* nav/work-code 인터랙션 */
.nav-arrow.nav-btn:hover{
  transform: translateY(1px) scale(0.98) translateZ(0);
  box-shadow: 0 0 18px rgba(212,175,55,0.18);
}
.nav-arrow.nav-btn:active{
  transform: translateY(2px) scale(0.95) translateZ(0);
}
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
.nav-btn:hover{
  transform: translateY(1px) scale(0.985) translateZ(0) !important;
  box-shadow: 0 0 18px rgba(212,175,55,0.18);
}
.nav-btn:active{
  transform: translateY(2px) scale(0.96) translateZ(0) !important;
}
/* 3페이지: 하단 ripple이 sq 경계 아래로 삐져나올 수 있도록 */
/* ===== Guestbook 오버레이 (데스크톱) ===== */
#gbOverlay{ z-index:10000; }
.gb-panel{
  position:relative; width:min(560px, 88vw); max-height:80vh;
  padding:18px 26px 20px; overflow-y:auto; -ms-overflow-style:none; scrollbar-width:none;
}
.gb-panel::-webkit-scrollbar { display: none; }
.gb-title{ font-family:"Nanum Pen Script",cursive; font-size:26px; line-height:1.1; margin:0 0 10px; letter-spacing:0.2px; }
.gb-close{ position:absolute; top:12px; right:16px; font-size:22px; color:rgba(220,220,220,0.7); cursor:pointer; width:36px; height:36px; display:flex; align-items:center; justify-content:center; border-radius:8px; transition:background 150ms; }
.gb-close:hover{ background:rgba(255,255,255,0.08); }
.gb-login-btn {
  display:inline-flex; align-items:center; padding:10px 22px;
  background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.15);
  border-radius:10px; color:#e6e6e6; font-family:"Nanum Pen Script",cursive;
  font-size:18px; cursor:pointer; transition:background 200ms, border-color 200ms;
}
.gb-login-btn:hover { background:rgba(255,255,255,0.14); border-color:rgba(255,255,255,0.25); }
.gb-user-info { display:flex; align-items:center; gap:10px; flex-wrap:wrap; }
.gb-user-photo { width:32px; height:32px; border-radius:50%; object-fit:cover; }
.gb-user-name { font-family:"Nanum Pen Script",cursive; font-size:18px; color:rgba(235,235,235,0.90); }
.gb-admin-badge { font-size:13px; color:rgba(212,175,55,0.90); border:1px solid rgba(212,175,55,0.40); border-radius:4px; padding:1px 6px; margin-left:4px; }
.gb-logout-btn {
  padding:4px 14px; background:transparent; border:1px solid rgba(255,255,255,0.12);
  border-radius:6px; color:rgba(220,220,220,0.55); font-family:"Nanum Pen Script",cursive;
  font-size:15px; cursor:pointer; transition:background 150ms; margin-left:auto;
}
.gb-logout-btn:hover { background:rgba(255,255,255,0.06); }
.gb-login-notice { font-family:"Nanum Pen Script",cursive; font-size:17px; color:rgba(220,220,220,0.45); padding:14px 0; }
.gb-form { margin:16px 0; }
.gb-input {
  width:100%; box-sizing:border-box; padding:6px 14px; background:rgba(255,255,255,0.05);
  border:1px solid rgba(255,255,255,0.10); border-radius:10px; color:#e6e6e6;
  font-family:"Nanum Pen Script",cursive; font-size:clamp(22px, 3vw, 28px); line-height:1.5;
  outline:none; transition:border-color 200ms; margin-bottom:10px;
}
.gb-input:focus { border-color:rgba(212,175,55,0.45); }
.gb-input::placeholder { color:rgba(220,220,220,0.30); }
.gb-textarea {
  width:100%; box-sizing:border-box; padding:12px 14px; background:rgba(255,255,255,0.05);
  border:1px solid rgba(255,255,255,0.10); border-radius:10px; color:#e6e6e6;
  font-family:"Nanum Pen Script",cursive; font-size:clamp(22px, 3vw, 28px); line-height:1.5;
  resize:none; outline:none; transition:border-color 200ms;
}
.gb-textarea:focus { border-color:rgba(212,175,55,0.45); }
.gb-textarea::placeholder { color:rgba(220,220,220,0.30); }
.gb-form-footer { display:flex; align-items:center; justify-content:space-between; margin-top:8px; }
.gb-char-count { font-family:"Nanum Pen Script",cursive; font-size:18px; color:rgba(180,180,180,0.40); padding-left:14px; }
.gb-char-count.gb-char-warn { color:rgba(212,120,80,0.75); }
.gb-submit-btn {
  padding:8px; background:rgba(212,175,55,0.18); border:1px solid rgba(212,175,55,0.35);
  border-radius:8px; color:rgba(255,250,230,0.85); font-family:"Nanum Pen Script",cursive;
  font-size:18px; cursor:pointer; transition:background 200ms, border-color 200ms;
}
.gb-submit-btn:hover { background:rgba(212,175,55,0.32); border-color:rgba(212,175,55,0.55); }
.gb-submit-btn:disabled { opacity:0.4; pointer-events:none; }
.gb-error-msg { font-family:"Nanum Pen Script",cursive; font-size:18px; color:rgba(212,120,80,0.85); padding-left:14px; max-height:0; overflow:hidden; opacity:0; transition:max-height 300ms ease, opacity 300ms ease; margin-bottom:0; }
.gb-error-msg.show { max-height:40px; opacity:1; margin-bottom:8px; }
.gb-entry { padding:14px 0; border-bottom:1px solid rgba(255,255,255,0.05); }
.gb-entry:last-child { border-bottom:none; }
.gb-entry-pending { opacity:0.50; }
.gb-entry-header { display:flex; align-items:center; gap:8px; margin-bottom:6px; }
.gb-entry-photo { width:24px; height:24px; border-radius:50%; object-fit:cover; }
.gb-entry-name { font-family:"Nanum Pen Script",cursive; font-size:16px; color:rgba(235,235,235,0.80); }
.gb-entry-date { font-family:"Nanum Pen Script",cursive; font-size:14px; color:rgba(180,180,180,0.35); margin-left:auto; }
.gb-entry-message { font-family:"Nanum Pen Script",cursive; font-size:17px; color:rgba(230,230,230,0.85); line-height:1.55; white-space:pre-wrap; word-break:break-word; padding-left:32px; }
.gb-entry-admin { display:flex; gap:8px; margin-top:6px; padding-left:32px; }
.gb-approve-btn, .gb-delete-btn {
  padding:3px 12px; border-radius:5px; font-family:"Nanum Pen Script",cursive; font-size:14px;
  cursor:pointer; border:1px solid rgba(255,255,255,0.10); background:rgba(255,255,255,0.05);
  color:rgba(220,220,220,0.65); transition:background 150ms;
}
.gb-approve-btn:hover { background:rgba(212,175,55,0.25); }
.gb-delete-btn:hover { background:rgba(200,60,60,0.25); }
.gb-approved-label { font-family:"Nanum Pen Script",cursive; font-size:13px; color:rgba(212,175,55,0.55); }
.gb-pending-label { font-family:"Nanum Pen Script",cursive; font-size:13px; color:rgba(200,150,80,0.55); border:1px solid rgba(200,150,80,0.22); border-radius:4px; padding:1px 6px; }
.gb-empty, .gb-loading { font-family:"Nanum Pen Script",cursive; font-size:17px; color:rgba(200,200,200,0.40); text-align:center; padding:36px 0; }
.gb-spinner { display:inline-block; width:16px; height:16px; border:2px solid rgba(255,255,255,0.12); border-top-color:rgba(212,175,55,0.65); border-radius:50%; animation:gbSpin 0.8s linear infinite; margin-right:8px; vertical-align:middle; }
@keyframes gbSpin { to { transform:rotate(360deg); } }
.gb-toast { position:fixed; bottom:40px; left:50%; transform:translateX(-50%) translateY(20px); background:rgba(25,25,25,0.92); color:#e6e6e6; font-family:"Nanum Pen Script",cursive; font-size:16px; padding:10px 28px; border-radius:10px; border:1px solid rgba(255,255,255,0.06); opacity:0; transition:opacity 300ms, transform 300ms; pointer-events:none; z-index:10002; }
.gb-toast.show { opacity:1; transform:translateX(-50%) translateY(0); }
.gb-toast-error { border-color:rgba(200,60,60,0.35); }
.gb-success { text-align:center; padding:52px 20px; font-family:"Nanum Pen Script",cursive; }
.gb-success-icon { font-size:32px; margin-bottom:18px; }
.gb-success-msg { font-size:clamp(22px, 3vw, 28px); line-height:1.7; color:rgba(230,230,230,0.80); }
.gb-subtitle { font-family:"Nanum Pen Script",cursive; font-size:clamp(22px, 3vw, 28px); color:rgba(220,220,220,0.55); margin:0 0 16px; line-height:1.5; }
/* ===== Thumbnail Grid + Heart (데스크톱) ===== */
.thumb-grid { display:grid; grid-template-columns:repeat(4, 1fr); gap:8px; padding:4px 0 8px; }
.thumb-section-head { grid-column:1/-1; font-family:"Nanum Pen Script",cursive; font-size:18px; color:rgba(230,230,230,0.65); padding:8px 2px 2px; border-top:1px solid rgba(255,255,255,0.05); margin-top:4px; }
.thumb-section-head:first-child { border-top:none; margin-top:0; }
.thumb-card { position:relative; border-radius:10px; overflow:hidden; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.07); cursor:pointer; transition:border-color 200ms, box-shadow 200ms, transform 150ms; }
.thumb-card:hover { border-color:rgba(255,255,255,0.18); transform:translateY(-2px); box-shadow:0 4px 16px rgba(0,0,0,0.25); }
.thumb-card.thumb-current { border-color:rgba(212,175,55,0.70); box-shadow:0 0 12px rgba(212,175,55,0.12); }
.thumb-img { width:100%; aspect-ratio:1/1; object-fit:cover; display:block; opacity:0; transition:opacity 500ms ease; }
.thumb-img.loaded { opacity:1; }
.thumb-code { position:absolute; bottom:0; left:0; right:0; padding:5px 10px; font-family:"Nanum Pen Script",cursive; font-size:14px; color:rgba(255,255,255,0.80); background:linear-gradient(transparent, rgba(0,0,0,0.55)); pointer-events:none; }
.thumb-heart { position:absolute; bottom:6px; right:8px; width:30px; height:30px; display:flex; align-items:center; justify-content:center; cursor:pointer; z-index:2; transition:transform 200ms ease; }
.thumb-heart:hover { transform:scale(1.2); }
.thumb-heart svg { width:18px; height:18px; transition:fill 300ms ease, stroke 300ms ease; }
.thumb-heart svg.heart-empty { fill:none; stroke:rgba(255,255,255,0.55); stroke-width:1.5; }
.thumb-heart svg.heart-filled { fill:rgba(212,175,55,0.90); stroke:rgba(212,175,55,0.90); stroke-width:1.5; }
@keyframes heartPop { 0%{transform:scale(1)} 50%{transform:scale(1.4)} 100%{transform:scale(1)} }
.thumb-heart.pop { animation:heartPop 300ms ease; }
.thumb-card.thumb-locked { opacity:0.35; cursor:default; }
.thumb-card.thumb-locked .thumb-placeholder { width:100%; aspect-ratio:1/1; background:rgba(60,60,60,0.7); }
.thumb-card.thumb-locked .thumb-code { color:rgba(255,255,255,0.45); }
.thumb-card.thumb-locked .thumb-lock-icon { position:absolute; top:50%; left:50%; transform:translate(-50%,-60%); opacity:0.5; }
.thumb-card.thumb-locked .thumb-lock-icon svg { width:24px; height:24px; stroke:rgba(255,255,255,0.55); fill:none; stroke-width:1.5; }
.thumb-card.thumb-locked .thumb-title { position:absolute; bottom:24px; left:0; right:0; text-align:center; font-family:"Nanum Pen Script",cursive; font-size:13px; color:rgba(255,255,255,0.4); pointer-events:none; }
/* ===== Scene List Overlay ===== */
.slst-panel{ flex-direction:column !important; width:min(540px,92vw) !important; max-height:min(82vh,860px) !important; height:auto !important; padding:0 !important; }
.slst-panel .toc-close{ position:static !important; width:32px !important; height:32px !important; }
.slst-header{ display:flex; align-items:center; justify-content:space-between; padding:16px 22px 12px; flex-shrink:0; border-bottom:1px solid rgba(255,255,255,0.06); }
.slst-body{ flex:1; overflow-y:auto; -ms-overflow-style:none; scrollbar-width:none; min-height:0; }
.slst-body::-webkit-scrollbar{ display:none; }
.slst-item{ display:flex; align-items:center; gap:16px; padding:6px 22px; border-bottom:1px solid rgba(255,255,255,0.04); }
.slst-item:last-child{ border-bottom:none; }
.slst-thumb{ width:61px; height:61px; border-radius:8px; overflow:hidden; flex-shrink:0; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.07); display:grid; place-items:center; }
.slst-img{ width:100%; height:100%; object-fit:cover; display:block; opacity:0; transition:opacity 400ms ease; }
.slst-img.loaded{ opacity:1; }
.slst-lock{ display:grid; place-items:center; width:100%; height:100%; }
.slst-lock svg{ width:20px; height:20px; stroke:rgba(255,255,255,0.22); fill:none; stroke-width:1.5; }
.slst-title{ font-family:"Nanum Pen Script",cursive; font-size:clamp(20px,2.5vw,26px); color:rgba(235,235,235,0.75); line-height:1.3; cursor:pointer; word-break:keep-all; }
.slst-title.has-poem{ cursor:pointer; }
.slst-title.has-poem:hover{ text-decoration:underline; text-underline-offset:4px; }
.slst-lock-tag{ display:inline-block; vertical-align:middle; margin-left:8px; opacity:0.5; flex-shrink:0; }
.slst-lock-tag svg{ width:14px; height:14px; stroke:rgba(212,175,55,0.9); fill:none; stroke-width:2.0; display:block; }
.slst-current{ background:rgba(212,175,55,0.06); }
.slst-current .slst-title{ color:rgba(212,175,55,0.88); }
.slst-divider{ height:22px; flex-shrink:0; }

.stanza-scene {
  position: absolute; inset: 0;
  background: #000;
  overflow: hidden;
}
.stanza-canvas {
  position: absolute; inset: 0;
  pointer-events: none;
}
.stanza-text-wrap {
  position: absolute; bottom: 13%; left: 0; right: 0;
  display: flex; flex-direction: column; align-items: center;
  pointer-events: none; opacity: 0;
  transition: opacity 700ms ease;
}
.stanza-text-wrap.visible { opacity: 1; }
`;

/* ============================================================
   B. DATA
   ============================================================ */
var SCENES_ALL = [
  {id:"LPL_01",   code:"LPL#01",kr:"안개가 휘감은 세상에",                      en:"In a world wrapped in fog",                               file:"LPL_01"},
  {id:"LPL_02",   code:"LPL#02",kr:"당신의 온기가 스며들면",                    en:"When your warmth seeps in",  file:"LPL_02"},
  {id:"LPL_03",   code:"LPL#03",kr:"세상은 본연의 모습을 되찾고",               en:"The world regains its true colors",                    file:"LPL_03"},
  {id:"LPL_04",   code:"LPL#04",kr:"그 품안에서 사랑의 꿈이 일렁입니다",        en:"In that embrace, dreams of love ripple",           file:"LPL_04"},
  {id:"LDR_00",   code:"LDR#00",kr:"사랑의 꿈은",                              en:"Dreams of love",                                       file:"LDR_00"},
  {id:"LDR_11",   code:"LDR#11",kr:"이끌림을 따라",                            en:"Following the pull",                                   file:"LDR_11"},
  {id:"LDR_21",   code:"LDR#21",kr:"설렘에 실려",                              en:"Carried by excitement",                                file:"LDR_21"},
  {id:"LDR_31",   code:"LDR#31",kr:"그리움과 함께 넓어지며",                   en:"Expanding with longing",                               file:"LDR_31"},
  {id:"LDR_41",   code:"LDR#41",kr:"애틋함으로 깊어져",                        en:"Deepening with tenderness",                            file:"LDR_41"},
  {id:"LDR_51",   code:"LDR#51",kr:"행복의 바다에 이르고",                     en:"Reaching the sea of happiness",                        file:"LDR_51"},
  {id:"LSN_01",   code:"LSN#01",kr:"사랑의 노래가 되어",                       en:"Becoming a song of love",                              file:"LSN_01"},
  {id:"LSN_02",   code:"LSN#02",kr:"당신만을 바라고 또 바라 봅니다",            en:"I gaze at you, and gaze again",                        file:"LSN_02"},
  {id:"LSN_03",   code:"LSN#03",kr:"어제, 오늘 그리고 내일",                   en:"Yesterday, today, and tomorrow",                       file:"LSN_03"},
  {id:"LSN_04",   code:"LSN#04",kr:"하루의 모든 순간",                         en:"Every moment of the day",                              file:"LSN_04"},
  {id:"LSN_05",   code:"LSN#05",kr:"잠 못 이루는 밤",                          en:"Sleepless nights",                                     file:"LSN_05"},
  {id:"LSN_06",   code:"LSN#06",kr:"꿈속에서도",                               en:"Even in dreams",                                       file:"LSN_06"},
  {id:"LSN_07",   code:"LSN#07",kr:"내가 머물고 싶은 공간",                    en:"The space I want to dwell",                            file:"LSN_07"},
  {id:"LSN_08",   code:"LSN#08",kr:"끝없이 샘솟는 기쁨",                       en:"Endlessly springing joy",                              file:"LSN_08"},
  {id:"LSN_09",   code:"LSN#09",kr:"마음을 울리는 노래 속에도",                en:"Even in songs that move my heart",                     file:"LSN_09"},
  {id:"LSN_10",   code:"LSN#10",kr:"언제나 당신이 있습니다",                   en:"You are always there",                                 file:"LSN_10"},
  {id:"LSN_11",   code:"LSN#11",kr:"당신의",                                   en:"Your",                                                 file:"LSN_11"},
  {id:"LSN_12",   code:"LSN#12",kr:"해맑은 미소와 따스한 온기에",              en:"Pure smile and warm embrace",                          file:"LSN_12"},
  {id:"LSN_13",   code:"LSN#13",kr:"모든 순간이 낙원이 되고",                  en:"Every moment becomes paradise",                        file:"LSN_13"},
  {id:"LSN_14",   code:"LSN#14",kr:"온 세상이 사랑으로 물들면",                en:"When the whole world is tinted with love",             file:"LSN_14"},
  {id:"LSN_15",   code:"LSN#15",kr:"나는 당신의 사랑안에서",                   en:"In your love",                                         file:"LSN_15"},
  {id:"LSN_16",   code:"LSN#16",kr:"새로이 태어납니다",                        en:"I am born anew",                                       file:"LSN_16"},
  {id:"LEL_01",   code:"LEL#01",kr:"사랑이 감싸 안은 세상,\n세상도 내 마음도 사랑으로 가득합니다",                    en:"A world embraced by love,\nthe world and my heart are filled with love",                             file:"LEL_01"},
];

var INDEX_ROWS = [
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

var THUMB_CODES = new Set([
  "LPL#01","LPL#02","LPL#03","LPL#04",
  "LDR#00","LDR#11","LDR#21","LDR#31","LDR#41","LDR#51",
  "LSN#01","LSN#02",
  "LSN#11","LSN#12","LSN#13","LSN#14","LSN#15","LSN#16",
  "LEL#01"
]);

var LOCKED_TITLES = {
  "LDR#12":"이끌림","LDR#13":"이끌림",
  "LDR#22":"설렘","LDR#23":"설렘",
  "LDR#32":"그리움","LDR#33":"그리움",
  "LDR#42":"애틋함","LDR#43":"애틋함",
  "LDR#52":"행복","LDR#53":"행복",
  "LSN#03":"노래","LSN#04":"노래","LSN#05":"노래","LSN#06":"노래",
  "LSN#07":"노래","LSN#08":"노래","LSN#09":"노래","LSN#10":"노래",
  "LRS#01":"공명",
  "LDN#01":"춤","LDN#02":"춤","LDN#03":"춤","LDN#04":"춤",
  "LCR#01":"합창"
};

var LANG_TEXTS = {
  KR:{
    tocTitle:"메뉴", menuH_TOC:"목차", menuH_ABOUT:"작가의 이야기",
    menuH_GB:"당신의 이야기", gbTitle:"당신의 이야기",
    homeText:"모든 사랑의 순간은 당신으로 열립니다",
    prologue:"프롤로그", lovedream:"사랑의 꿈", lovesong:"사랑의 노래",
    resonance:"사랑의 공명 (잠김)", dance:"사랑의 춤 (잠김)", chorus:"사랑의 합창 (잠김)",
    epilogue:"에필로그", indexTitle:"작품 목록", slstTitle:"사랑의 순간",
    indexSub:"존재하는 작품은 클릭하면 바로 이동합니다",
    infoHelpTitle:"사용법",
    infoNav:"이전 / 다음 작품", infoMenu:"메뉴 열기 / 닫기",
    infoHelp:"도움말 열기 / 닫기", infoG:"당신의 이야기 열기 / 닫기",
    infoP:"작가의 이야기 열기 / 닫기",
    copyright:"© Vitro Narida. All rights reserved.",
    aboutTitle:"작가의 이야기",
    aboutBody:"눈부신 햇살,\n잔잔한 바람,\n백조의 우아한 자태에\n일렁이는 빛결은\n보석처럼 반짝입니다.\n\n백조와 반영은\n서로의 색으로 물들고\n온 세상이 사랑으로 번져갑니다."
  },
  EN:{
    tocTitle:"Menu", menuH_TOC:"Contents", menuH_ABOUT:"About",
    menuH_GB:"Reader's Words", gbTitle:"Reader's Words",
    homeText:"Every moment of love opens with you.",
    prologue:"Prologue", lovedream:"Love Dream", lovesong:"Love Song",
    resonance:"Love Resonance (locked)", dance:"Love Dance (locked)", chorus:"Love Chorus (locked)",
    epilogue:"Epilogue", indexTitle:"Collection", slstTitle:"Moment of Love",
    indexSub:"Click on existing artworks to navigate",
    infoHelpTitle:"How to Use",
    infoNav:"Prev / Next", infoMenu:"Open / Close Menu",
    infoHelp:"Open / Close Help", infoG:"Open / Close Reader's Words",
    infoP:"Open / Close Artist's Note",
    copyright:"© Vitro Narida. All rights reserved.",
    aboutTitle:"Artist's Note",
    aboutBody:"Dazzling sunlight,\na gentle breeze,\nin the graceful poise of swans\nthe shimmering light\nsparkles like jewels.\n\nSwans and their reflections\nblend into each other's colors\nand the whole world spreads into love."
  }
};

var HEART_FB_CONFIG = {
  apiKey:"AIzaSyCM-4subBV6n9zEUgFq9D1b4mUSsNjGzlc",
  authDomain:"moment-of-love-d0dbb.firebaseapp.com",
  projectId:"moment-of-love-d0dbb",
  storageBucket:"moment-of-love-d0dbb.firebasestorage.app",
  messagingSenderId:"276426425721",
  appId:"1:276426425721:web:c402f613c67c8968435ba8"
};

/* ============================================================
   C. DEVICE + LANGUAGE
   ============================================================ */
var isMobile = (function(){
  try { var f = sessionStorage.getItem('force_device'); if(f==='M') return true; if(f==='PC') return false; } catch(e){}
  return /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
})();

function detectLang() {
  try {
    var key = isMobile ? 'm_lang' : 'd_lang';
    var s = localStorage.getItem(key) || localStorage.getItem('lang');
    if (s === 'KR' || s === 'EN') return s;
  } catch(e) {}
  return (navigator.language||'en').toLowerCase().startsWith('ko') ? 'KR' : 'EN';
}
var curLang = detectLang();

function saveLang(l) {
  try {
    localStorage.setItem(isMobile ? 'm_lang' : 'd_lang', l);
    localStorage.setItem('lang', l);
  } catch(e) {}
}

function setLang(l) {
  saveLang(l);
  try {
    var open = ['tocOverlay','sceneListOverlay']
      .find(function(id){ return document.getElementById(id) && document.getElementById(id).classList.contains('on'); });
    if (open) sessionStorage.setItem('reopen_overlay', open);
    else sessionStorage.removeItem('reopen_overlay');
  } catch(e) {}
  location.reload();
}

/* ============================================================
   D. STATE
   ============================================================ */

/* ============================================================
   J. NavigationManager — 씬 전환 + 캐시 + 프리로드 + stanza 전담 모듈
   공개 API:
     NavigationManager.goTo(url, opts)      — 모든 씬 전환 진입점
     NavigationManager.fetchScene(url)      — 씬 데이터 로드 (Promise)
     NavigationManager.preloadImg(key, src) — 이미지 캐시 등록
     NavigationManager.currentScene()       — 현재 씬 객체
     NavigationManager.currentSceneURL()    — 현재 씬 URL
   내부 상태:
     _navigating, _wasPaused, _currentURL,
     _currentScene, _currentSceneURL
     _sceneCache, _preloadedImgs
   ============================================================ */
var NavigationManager = (function() {
  var _navigating       = false;
  var _wasPaused        = false;
  var _stanzaInProgress = false;
  var _currentURL       = null;
  var _currentScene     = null;
  var _currentSceneURL  = '';

/* 씬 데이터 캐시 — 한 번 로드한 씬은 재요청 없이 즉시 반환 (진짜 SPA) */
var _sceneCache = {};

/* 현재 씬이 THIS_SCENE으로 직접 접근된 경우 캐시에 선등록 */
(function() {
  if (window.THIS_SCENE && window.THIS_SCENE.id) {
    var key = (location.pathname || location.href).split('?')[0];
    _sceneCache[key] = window.THIS_SCENE;
  }
})();

function fetchScene(url) {
  var key = url.split('?')[0];
  if (_sceneCache[key]) return Promise.resolve(_sceneCache[key]);
  return fetch(url)
    .then(function(r){ if(!r.ok) throw new Error('HTTP '+r.status); return r.text(); })
    .then(function(html){
      var scene = extractScene(html);
      _sceneCache[key] = scene;
      return scene;
    });
}

/* 다음 씬 백그라운드 프리로드 — 씬 로드 1초 후 next/prev 미리 캐싱 */
var _preloadedImgs = {}; /* 이미지 preload 캐시 (GC 방지용) */

function _preloadAdjacentScenes(scene, sceneURL) {
  if (!scene) return;
  var urls = [];
  if (scene.nextURL) urls.push(resolveURL(sceneURL, scene.nextURL));
  if (scene.prevURL) urls.push(resolveURL(sceneURL, scene.prevURL));
  urls.forEach(function(u) {
    if (!u) return;
    var key = u.split('?')[0];
    setTimeout(function() {
      /* 1. 씬 데이터 캐싱 */
      if (!_sceneCache[key]) {
        fetch(u)
          .then(function(r){ return r.ok ? r.text() : null; })
          .then(function(html){
            if (!html) return;
            var adjacentScene = extractScene(html);
            _sceneCache[key] = adjacentScene;
            /* 2. 씬 데이터 확보 후 이미지 preload */
            if (adjacentScene && adjacentScene.imgSrc && !_preloadedImgs[key]) {
              var imgSrc = resolveURL(u, adjacentScene.imgSrc);
              if (imgSrc) {
                var img = new Image();
                img.src = imgSrc;
                _preloadedImgs[key] = img; /* GC 방지 */
              }
            }
          })
          .catch(function(){});
      } else {
        /* 데이터는 이미 있으나 이미지 미로드 시 */
        var cachedScene = _sceneCache[key];
        if (cachedScene && cachedScene.imgSrc && !_preloadedImgs[key]) {
          var imgSrc = resolveURL(u, cachedScene.imgSrc);
          if (imgSrc) {
            var img = new Image();
            img.src = imgSrc;
            _preloadedImgs[key] = img;
          }
        }
      }
    }, 1000);
  });
}

/* ============================================================
   J. goTo() — 모든 씬 전환
   ============================================================ */

function _goTo(url, opts) {
  if (!url) return;
  opts = opts || {};
  var direction = opts.direction || 'next';
  /* direct 이동(TOC 등)은 스탄자/네비 블록 무시하고 강제 전환 */
  if (!opts.direct && _navigating) return;
  /* 진행 중 stanza 입자 강제 정리 */
  document.querySelectorAll('[data-stanza-p]').forEach(function(el){ el.remove(); });
  var transDir = opts.direct ? 'none' : direction;
  _navigating = true;
  _wasPaused = AutoPlay.isActive() && AutoPlay.isPaused();
  AutoPlay.onSceneChange();

  /* Case B: stanza 전환 — 현재 씬에 stanzaTransition:true 필드가 있고 직접 이동이 아닌 경우
     #95 — 산개 진행 중(_stanzaInProgress)에는 일반 전환으로 처리
     forceNav:true — 키보드 입력 시 산개 즉시 중단하고 일반 전환
     오토모드: 입자 산개 + fade 2000ms / 수동모드: prev/next 모두 1000ms 대기 후 fade 1500ms, 검정 2000ms */
  var _destScene = NavigationManager.getCachedScene(url);
  var _hasStanza = (_currentScene && _currentScene.stanzaTransition);
  if (!opts.direct && !opts.forceNav && _hasStanza && !_stanzaInProgress) {
    if (AutoPlay.isActive()) {
      _stanzaTransition(url);    /* 오토모드: 입자 산개 + fade 2000ms */
    } else {
      setTimeout(function() { _stanzaGoToDest(url, 1500, 2000); }, 1000); /* 수동모드: 1000ms 대기 후 fade 1500ms, 검정 2000ms */
    }
    return;
  }
  /* forceNav 시 산개 진행 중이면 즉시 정리 */
  if (opts.forceNav && _stanzaInProgress) {
    _stanzaInProgress = false;
  }

  /* Case C: 즉시 전환 */
  fetchScene(url).then(function(scene) {
    /* #96 — _navigating 해제를 전환 애니메이션 완료 후로 늦춤 (onTransitionDone 콜백) */
    _applyScene(url, scene, transDir, function() { _navigating = false; });
  }).catch(function(){ _navigating=false; console.warn('[MOL] fetchScene 실패:', url); });
};

function _applyScene(url, scene, transDir, onNavDone) {
  _ensureAppReady(); /* index.html SPA 최초 진입 시 갤러리 DOM 생성 */
  /* 데스크탑 인트로 canvas fade-out */
  var introCv = document.getElementById('_introCanvas');
  if (introCv) {
    setTimeout(function() {
      introCv.style.transition = 'opacity 800ms ease';
      introCv.style.opacity = '0';
      setTimeout(function() { if (introCv.parentNode) introCv.parentNode.removeChild(introCv); }, 850);
    }, 100);
  }
  /* 모든 오버레이 즉시 닫기 */
  ['tocOverlay','thumbOverlay','sceneListOverlay','aboutOverlay','poemOverlay','helpOverlay','introOverlay','gbOverlay'].forEach(function(id){
    var el = document.getElementById(id);
    if (el) { el.classList.remove('on'); el.setAttribute('aria-hidden','true'); el.style.display='none'; el.style.opacity=''; }
  });
  _currentURL   = url;
  /* S.prevScene 제거 */;
  _currentScene = scene;
  _currentSceneURL = url;
  /* 인트로 입자 잔상 제거 — safety net */
  document.querySelectorAll('[data-intro-particle]').forEach(function(el) { el.remove(); });
  history.pushState({ url:url }, '', url);
  SceneRenderer.renderScene(scene, url, transDir, onNavDone);
  /* 다음/이전 씬 백그라운드 프리로드 */
  _preloadAdjacentScenes(scene, url);
  /* 오토플레이 중 pause 상태 복원 */
  if(_wasPaused){ _wasPaused=false; if(AutoPlay.isActive()) AutoPlay.pauseAP(); }
}

/* ============================================================
   J-1. 연 단위 전환 (_stanzaTransition)
   ============================================================ */

function _stanzaTransition(destURL) {
  var app    = $id('app');
  var textEl = app && (app.querySelector('.scene-text') || app.querySelector('.long-text'));

  _stanzaInProgress = true; /* #95 — 산개 진행 중 표시 */

  if (!textEl) { _stanzaGoToDest(destURL); return; }

  /* t=1000: 텍스트 산화 + 입자 산개 */
  setTimeout(function() {
    var cursor = null; /* ::after 방식으로 교체 — span 없음 */
    textEl.classList.remove('typing');
    textEl.style.transition = 'opacity 900ms ease,filter 900ms ease';
    textEl.style.filter = 'blur(3px)'; textEl.style.opacity = '0';
    /* #95 — 산개 시작 시점에 _navigating 해제: 이후 nav 버튼 즉시 반응 */
    _navigating = false;
    _stanzaSpawnParticles(app, textEl, function() { _stanzaGoToDest(destURL); });
  }, 1000);
}

function _stanzaGoToDest(destURL, fadeDuration, holdDuration) {
  /* 스탄자 전환: Fade to Black (정사각형 기준, 모바일은 photo-area 기준)
     fadeDuration: fade in/out 시간(ms). 오토모드 2000, 수동모드 1500
     holdDuration: 검정 유지 시간(ms). 오토모드 4000, 수동모드 2000 */
  fadeDuration = fadeDuration || 2000;
  holdDuration = holdDuration || (fadeDuration * 2);
  var _startURL = _currentURL; /* #95 fix — 산개 중 nav 이동 감지용 */
  var app = $id('app');
  var sq = app && (app.querySelector('.square-frame') || app.querySelector('.photo-area'));
  var overlay = document.createElement('div');
  overlay.style.cssText = 'position:absolute;inset:0;background:#000;opacity:0;z-index:9999;pointer-events:none;transition:opacity ' + fadeDuration + 'ms ease;';
  if (sq) sq.appendChild(overlay);

  requestAnimationFrame(function(){ requestAnimationFrame(function(){
    overlay.style.opacity = '1';
    setTimeout(function(){
      /* fadeIn + 동일 시간 정지 후 씬 교체 */
      /* #95 fix — 산개 중 nav 이동 발생 시 취소 */
      if (_currentURL !== _startURL) {
        _navigating = false; _stanzaInProgress = false;
        if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
        return;
      }
      fetchScene(destURL).then(function(destScene) {
        if (_currentURL !== _startURL) { _navigating = false; _stanzaInProgress = false; return; }
        ensureSPAOverlays();
        _applyScene(destURL, destScene, 'none');
        _navigating = false;
        _stanzaInProgress = false; /* #95 — 산개 완료 */
        /* app.innerHTML='' 로 overlay 소멸 → 새 컨테이너에 재부착 후 fadeOut */
        var newApp = $id('app');
        var newSq = newApp && (newApp.querySelector('.square-frame') || newApp.querySelector('.photo-area'));
        if (newSq) {
          overlay.style.transition = 'none';
          overlay.style.opacity = '1';
          newSq.appendChild(overlay);
          requestAnimationFrame(function(){ requestAnimationFrame(function(){
            overlay.style.transition = 'opacity ' + (fadeDuration * 2) + 'ms ease';
            overlay.style.opacity = '0';
            setTimeout(function(){ if (overlay.parentNode) overlay.parentNode.removeChild(overlay); }, fadeDuration * 2);
          }); });
        }
      }).catch(function(){ _navigating=false; _stanzaInProgress=false; console.warn('[MOL] stanza fetchScene 실패:', destURL); });
    }, holdDuration);
  }); });
}

function _stanzaSpawnParticles(app, textEl, done) {
  var sq = app.querySelector('.square-frame') || app;
  /* square-frame이 없을 때 app 기준 — overflow:hidden으로 정사각형 밖 노출 방지 */
  if (sq === app) sq.style.overflow = 'hidden';

  /* 기준: square-frame */
  var sqR = sq.getBoundingClientRect();
  var sqW = sq.offsetWidth;

  /* 텍스트/커서 위치 (square-frame 기준 상대좌표) */
  var txtR = textEl.getBoundingClientRect();
  var curR = txtR; /* ::after 방식 — span 없으므로 텍스트 영역 기준 사용 */

  var flyStartX = curR.left - sqR.left + curR.width / 2;
  var flyStartY = curR.top  - sqR.top  + curR.height / 2;
  var tx = txtR.left - sqR.left;
  var ty = txtR.top  - sqR.top;
  var tw = Math.max(txtR.width, 40);
  var th = Math.max(txtR.height, 20);

  var timers = [], rafs = {}, doneFired = false;
  function sched(fn, d) { timers.push(setTimeout(fn, d)); }
  function cleanup() {
    timers.forEach(clearTimeout);
    Object.keys(rafs).forEach(function(k){ cancelAnimationFrame(rafs[k]); });
    sq.querySelectorAll('[data-stanza-p]').forEach(function(el){ el.remove(); });
  }

  /* 입자 22개 생성 */
  for (var i = 0; i < 22; i++) {
    (function(idx) {
      var isFF = (idx === 0);
      var p = document.createElement('div');
      p.setAttribute('data-stanza-p', '1');
      var sz = isFF ? 9 : (3 + Math.random() * 5);
      var sx = isFF ? flyStartX : (tx + Math.random() * tw);
      var sy = isFF ? flyStartY : (ty + Math.random() * th);

      p.style.cssText = [
        'position:absolute',
        'width:' + sz + 'px',
        'height:' + (sz * 0.6) + 'px',
        'border-radius:50%',
        'left:' + sx + 'px',
        'top:' + sy + 'px',
        'pointer-events:none',
        'z-index:500',
        'opacity:0',
        'background:radial-gradient(ellipse at center,rgba(255,255,255,0.95) 10%,rgba(220,220,220,0.3) 50%,transparent 80%)',
        'box-shadow:0 0 ' + (sz * 1.2) + 'px rgba(255,255,255,0.25)'
      ].join(';');
      sq.appendChild(p);

      if (isFF) {
        var vx = (Math.random() - 0.5) * 40;
        var vy = (Math.random() - 1.0) * 30;
        var scatterDur = 500;
        var st = null;
        function scatterFrame(ts) {
          if (!st) st = ts;
          var t = Math.min((ts - st) / scatterDur, 1);
          var cx = sx + vx * t;
          var cy = sy + vy * t;
          p.style.left    = cx + 'px';
          p.style.top     = cy + 'px';
          p.style.opacity = Math.min(t * 4, 0.9);
          if (t < 1) {
            rafs['ff_s'] = requestAnimationFrame(scatterFrame);
          } else {
            launchFirefly(p, cx, cy);
          }
        }
        sched(function(){ rafs['ff_s'] = requestAnimationFrame(scatterFrame); }, 50);

      } else {
        var vx2 = (Math.random() - 0.5) * 100;
        var vy2 = (Math.random() - 1.3) * 70;
        var dur2 = 1200 + Math.random() * 600;
        sched(function() {
          var st2 = null;
          function frame(ts) {
            if (!st2) st2 = ts;
            var t = (ts - st2) / dur2;
            p.style.left      = (sx + vx2 * t) + 'px';
            p.style.top       = (sy + vy2 * t + 40 * t * t) + 'px';
            p.style.opacity   = Math.max(0, Math.min(t * 6, 1) * (0.9 - t * 0.9));
            p.style.transform = 'scale(' + (1 + t * 0.3) + ')';
            if (t < 1) requestAnimationFrame(frame);
            else p.remove();
          }
          requestAnimationFrame(frame);
        }, idx * 25);
      }
    })(i);
  }

  /* 반딧불 횡단: square-frame 오른쪽 끝까지 sin파 */
  function launchFirefly(el, startX, startY) {
    var endX = sqW + 20;
    var dur  = isMobile ? 2100 : 4200;
    var st   = null;
    function frame(ts) {
      if (!st) st = ts;
      var ft   = Math.min((ts - st) / dur, 1);
      var fx   = startX + ft * (endX - startX);
      var fy   = startY + Math.sin(ft * Math.PI * 2.8) * 9;
      var fsz  = 9 + 5 * Math.abs(Math.sin(ft * Math.PI * 5));
      var fop  = 0.7 + 0.3 * Math.abs(Math.sin(ft * Math.PI * 5));
      var glow = fsz * 1.8;
      el.style.width     = fsz + 'px';
      el.style.height    = (fsz * 0.55) + 'px';
      el.style.left      = (fx - fsz / 2) + 'px';
      el.style.top       = (fy - fsz * 0.275) + 'px';
      el.style.opacity   = fop;
      el.style.boxShadow = [
        '0 0 ' + glow + 'px rgba(255,255,255,0.9)',
        '0 0 ' + (glow * 2) + 'px rgba(255,255,255,0.5)',
        '0 0 ' + (glow * 3.5) + 'px rgba(255,255,255,0.2)'
      ].join(',');
      if (fx < endX) {
        rafs['ff'] = requestAnimationFrame(frame);
      } else {
        el.remove();
      }
    }
    rafs['ff'] = requestAnimationFrame(frame);
  }

  /* done 호출 — 반딧불 횡단 완료(데스크탑 4200ms, 모바일 2100ms) 후 1초 대기 */
  sched(function() {
    if (doneFired) return;
    doneFired = true;
    cleanup();
    if (done) done();
  }, isMobile ? 3100 : 5200);
}

  /* renderIntro에서 LPL_01 preload 시 직접 접근하던 _preloadedImgs 공개 래퍼 */
  function _preloadImg(key, src) {
    if (!_preloadedImgs[key]) {
      var img = new Image();
      img.src = src;
      _preloadedImgs[key] = img;
    }
  }

  /* 공개 API */
  return {
    goTo:           _goTo,
    fetchScene:     fetchScene,
    preloadImg:      _preloadImg,
    getCachedScene:  function(key) { return _sceneCache[key] || null; },
    currentScene:    function() { return _currentScene; },
    currentSceneURL: function() { return _currentSceneURL; },
    /* URL 직접 진입(init) 시 초기 씬 상태 등록 */
    initScene: function(url, scene) {
      _currentURL      = url;
      _currentScene    = scene;
      _currentSceneURL = url;
    },
    /* popstate에서 navigating 플래그 해제 */
    resetNavigation: function() { _navigating = false; },
    /* nav bar 버튼 중복 입력 방지용 */
    isNavigating:    function() { return _navigating; }
  };
})();

/* window.goTo — 씬 HTML 파일에서 직접 호출하므로 전역 연결 유지 */
window.goTo = NavigationManager.goTo;



/* ============================================================
   E. UTILITIES
   ============================================================ */
function resolveURL(base, rel) {
  if (!rel) return null;
  if (/^https?:\/\//.test(rel)) return rel;
  if (rel.startsWith('/')) return rel;
  var dir = base.replace(/^\//, '').split('/').slice(0, -1);
  rel.split('/').forEach(function(seg) {
    if (seg === '..') dir.pop();
    else if (seg !== '.') dir.push(seg);
  });
  return '/' + dir.join('/');
}

function $id(id) { return document.getElementById(id); }

function scrollToCurrent(container, selector) {
  setTimeout(function() {
    var el = container && container.querySelector(selector);
    if (el) el.scrollIntoView({ block:'center', behavior:'smooth' });
  }, 120);
}

/* ============================================================
   F. SCENE FETCH / PARSE
   ============================================================ */
function extractScene(html) {
  var m = html.match(/window\.THIS_SCENE\s*=\s*(\{[\s\S]*?\});/);
  if (!m) throw new Error('THIS_SCENE not found');
  return (new Function('return ' + m[1]))();
}


/* ============================================================
   G. CSS INJECTION
   ============================================================ */
function injectCSS() {
  var style = document.createElement('style');
  style.textContent = isMobile ? CSS_MOBILE : CSS_DESKTOP;
  document.head.appendChild(style);

  /* --vh100 즉시 설정 (v22 방식 — square-frame 크기 계산 기준) */
  document.documentElement.style.setProperty('--vh100', window.innerHeight + 'px');
  window.addEventListener('resize', function(){
    document.documentElement.style.setProperty('--vh100', window.innerHeight + 'px');
  });

  /* SPA 공통 추가 CSS */
  var extra = document.createElement('style');
  extra.textContent = [
    '#app{position:fixed;top:0;left:0;width:100%;height:100%;}',
    /* 전환 오버레이 (SPA용) */
    '#trans-overlay{position:fixed;inset:0;background:#000;pointer-events:none;opacity:0;z-index:8000;}',
    '#white-overlay{position:fixed;width:100vmin;height:100vmin;top:50%;left:50%;transform:translate(-50%,-50%);background:#fff;pointer-events:none;opacity:0;z-index:8100;}',
    /* stanza */
    '.stanza-scene{position:absolute;inset:0;background:#000;overflow:hidden;}',
    '.stanza-canvas{position:absolute;inset:0;pointer-events:none;}',
    '.stanza-text-wrap{position:absolute;bottom:13%;left:0;right:0;',
    '  display:flex;flex-direction:column;align-items:center;pointer-events:none;',
    '  opacity:0;transition:opacity 700ms ease;}',
    '.stanza-text-wrap.visible{opacity:1;}',
    /* fog canvas SPA */
    '#fog-canvas{position:absolute;inset:0;pointer-events:none;opacity:0;transition:opacity 2000ms ease;}',
    '#fog-canvas.active{opacity:1;}',
  ].join('\n');
  document.head.appendChild(extra);
}

/* ============================================================
   H. OVERLAY HTML (한 번만 삽입)
   ============================================================ */
function buildOverlayHTML() {
  var t = LANG_TEXTS[curLang];
  var sc = NavigationManager.currentScene() || {};
  var langToggle = isMobile
    ? ('<div class="lang-toggle"><div class="lang-btn'+(curLang==='EN'?' active':'')+'" data-lang="EN">E</div>'
      +'<div class="lang-btn'+(curLang==='KR'?' active':'')+'" data-lang="KR">K</div></div>')
    : ('<div class="langToggle"><div class="langBtn'+(curLang==='EN'?' active':'')+'" data-lang="EN" tabindex="0" data-tip="ENGLISH">EN</div>'
      +'<div class="langBtn'+(curLang==='KR'?' active':'')+'" data-lang="KR" tabindex="0" data-tip="한국어">KR</div></div>');

  var tocSection = sc.tocSection || '';
  function tci(sec,id,label){ return '<li class="toc-item'+(tocSection===sec?' toc-current':'')+'" id="'+id+'"><span class="toc-bullet">●</span><span class="toc-text">'+label+'</span></li>'; }

  if (isMobile) {
    return (
      /* TOC */
      '<div id="tocOverlay" class="overlay-panel" aria-hidden="true">'
      +'<div class="overlay-backdrop" id="tocBackdrop"></div>'
      +'<div class="toc-panel">'
      +'<div class="mob-unified-body">'
      +'<div class="mob-unified-left">'
      +'<div class="menu-section">'
      +'<h3 class="menu-h" id="menuH_TOC">'+t.menuH_TOC+'</h3>'
      +'<ul class="toc-list">'
      +'<li class="toc-item" id="tocHome" style="cursor:pointer"><span class="toc-bullet">●</span><span class="toc-text">intro</span></li>'
      +tci('prologue','tocPrologue',t.prologue)
      +tci('lovedream','tocLoveDream',t.lovedream)
      +tci('lovesong','tocLoveSong',t.lovesong)
      +'<li class="toc-item toc-locked"><span class="toc-bullet">●</span><span class="toc-text">'+t.resonance+'</span></li>'
      +'<li class="toc-item toc-locked"><span class="toc-bullet">●</span><span class="toc-text">'+t.dance+'</span></li>'
      +'<li class="toc-item toc-locked"><span class="toc-bullet">●</span><span class="toc-text">'+t.chorus+'</span></li>'
      +tci('epilogue','tocEpilogue',t.epilogue)
      +'</ul></div>'
      +'<div class="menu-section"><h3 class="menu-h menu-h-link" id="menuH_ABOUT" tabindex="0">'+t.menuH_ABOUT+'</h3></div>'
      +'<div class="menu-section"><div class="mob-contact-icons" style="padding-left:12px;">'
      +'<a href="mailto:vitro@narida.art" title="E-Mail">'
      +'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/></svg>'
      +'<span class="mob-contact-icon-text">vitro@narida.art</span>'
      +'</a>'
      +'<a href="https://instagram.com/vitro.narida" target="_blank" rel="noopener">'
      +'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/></svg>'
      +'<span class="mob-contact-icon-text">vitro.narida</span>'
      +'</a>'
      +'</div></div>'
      +'<div class="menu-section"><div class="mob-copyright" style="padding-left:12px;">© Vitro Narida.<br>All rights reserved.</div></div>'
      +'<div class="menu-section"><h3 class="menu-h menu-h-link" id="menuH_GB" tabindex="0">'+t.menuH_GB+'</h3></div>'
      +'</div>'
      +'<div class="mob-unified-right">'
      +'<div class="mob-right-header"><h3 class="mob-col-title">'+t.indexTitle+'</h3><div style="display:flex;align-items:center;gap:6px;"><div class="mob-expand-btn" id="mobExpandBtn"><svg viewBox="0 0 24 24"><path d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9m11.25-5.25v4.5m0-4.5h-4.5m4.5 0L15 9m-11.25 11.25v-4.5m0 4.5h4.5m-4.5 0L9 15m11.25 5.25v-4.5m0 4.5h-4.5m4.5 0L15 15"/></svg></div><div class="toc-close" id="tocClose">✕</div></div></div>'
      +'<div class="mob-thumb-grid" id="mobThumbGrid"></div>'
      +'</div>'
      +'</div>'
      +'<div style="position:absolute;bottom:14px;left:16px;display:flex;gap:8px;align-items:center;">'
      +'<div id="tocLangSwitch" class="mob-sw-track'+(curLang==="KR"?' on':'')+'" tabindex="0">'
      +'<span class="mob-sw-side mob-sw-left">E</span>'
      +'<div class="mob-sw-knob">'+(curLang==="KR"?'K':'E')+'</div>'
      +'<span class="mob-sw-side mob-sw-right">K</span>'
      +'</div>'
      +'<div id="tocModeSwitch" class="mob-sw-track'+(AutoPlay.isActive()?'':' on')+'" tabindex="0">'
      +'<span class="mob-sw-side mob-sw-left">▶</span>'
      +'<div class="mob-sw-knob">'+(AutoPlay.isActive()?'<div class="mob-sw-tri"></div>':'<div class="mob-sw-sq"></div>')+'</div>'
      +'<span class="mob-sw-side mob-sw-right">■</span>'
      +'</div>'
      +'<div id="tocInfoBtn" style="width:26px;height:26px;border-radius:50%;display:grid;place-items:center;background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.12);cursor:pointer;color:rgba(235,235,235,0.55);flex-shrink:0;">'
      +'<svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:14px;height:14px;"><path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.064.852l-.708 2.836a.75.75 0 0 0 1.064.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"/></svg>'
      +'</div>'
      +'</div>'
      +'</div></div>'
      /* Thumb Overlay (모바일 전체화면 썸네일) */
      +'<div id="thumbOverlay" class="overlay-panel" aria-hidden="true" style="display:none;">'
      +'<div class="overlay-backdrop" id="thumbBackdrop"></div>'
      +'<div class="index-panel panel-box">'
      +'<div class="toc-header" style="margin-bottom:8px;">'
      +'<div><h2 class="index-title" id="thumbTitle">'+t.indexTitle+'</h2></div>'
      +'<div style="display:flex;align-items:center;gap:8px;">'
      +'<div class="toc-close" id="thumbClose">✕</div>'
      +'</div></div>'
      +'<div class="index-body"><div class="thumb-grid" id="thumbGrid"></div></div>'
      +'</div></div>'
      /* Scene List */
      +'<div id="sceneListOverlay" class="overlay-panel" aria-hidden="true" style="display:none;">'
      +'<div class="overlay-backdrop" id="slstBackdrop"></div>'
      +'<div class="toc-panel"><div class="toc-handle"></div>'
      +'<div class="toc-header"><h2 class="toc-title">'+t.slstTitle+'</h2>'
      +'<div style="display:flex;align-items:center;gap:8px;">'
      +'<div class="toc-close" id="slstClose">✕</div></div></div>'
      +'<div class="slst-body" id="sceneListBody"></div>'
      +'</div></div>'
      /* About */
      +'<div id="aboutOverlay" class="overlay-panel" aria-hidden="true" style="display:none;">'
      +'<div class="overlay-backdrop" id="aboutBackdrop"></div>'
      +'<div class="index-panel panel-box">'
      +'<div class="toc-header" style="margin-bottom:8px;"><h2 class="index-title" id="aboutTitle"></h2>'
      +'<div class="toc-close" id="aboutClose">✕</div></div>'
      +'<div id="aboutBody" style="font-size:clamp(20px,5vw,26px);line-height:1.8;color:rgba(235,235,235,0.90);white-space:pre-line;padding:0 4px;font-family:\'Nanum Pen Script\',cursive;"></div>'
      +'</div></div>'
      /* Poem */
      +'<div id="poemOverlay" class="overlay-panel" aria-hidden="true" style="display:none;">'
      +'<div class="overlay-backdrop" id="poemBackdrop"></div>'
      +'<div class="index-panel panel-box" style="overflow-y:auto;scrollbar-width:none;">'
      +'<div class="toc-header" style="margin-bottom:8px;"><h2 class="index-title" id="poemTitle"></h2>'
      +'<div class="toc-close" id="poemClose">✕</div></div>'
      +'<div class="poem-body" id="poemBody"></div>'
      +'</div></div>'
      /* Help */
      +'<div id="helpOverlay" class="overlay-panel" aria-hidden="true" style="display:none;">'
      +'<div class="overlay-backdrop" id="helpBackdrop"></div>'
      +'<div class="index-panel panel-box">'
      +'<div class="toc-header" style="margin-bottom:8px;"><h2 class="index-title">'+t.infoHelpTitle+'</h2>'
      +'<div class="toc-close" id="helpClose">✕</div></div>'
      +'<div style="padding:0 16px;">'
      +'<div class="info-row"><kbd>← →</kbd> <span>'+t.infoNav+'</span></div>'
      +'<div class="info-row"><kbd>M</kbd> <span>'+t.infoMenu+'</span></div>'
      +'<div class="info-row"><kbd>H</kbd> <span>'+t.infoHelp+'</span></div>'
      +'<div class="info-row"><kbd>G</kbd> <span>'+t.infoG+'</span></div>'
      +'<div class="info-row"><kbd>P</kbd> <span>'+t.infoP+'</span></div>'
      +'</div></div></div>'
      /* Intro */
      +'<div id="introOverlay" class="overlay-panel" aria-hidden="true" style="display:none;">'
      +'<div class="overlay-backdrop" id="introBackdrop"></div>'
      +'<div class="intro-circle-wrap"><div class="intro-btn" id="introBtn"><span class="intro-btn-text">intro</span></div>'
      +'<div class="intro-ring"></div><div class="intro-ring"></div></div>'
      +'</div>'
      /* Guestbook */
      +'<div id="gbOverlay" class="overlay-panel" aria-hidden="true" style="display:none;">'
      +'<div class="overlay-backdrop" id="gbBackdrop"></div>'
      +'<div class="gb-panel panel-box"><div class="toc-header" style="margin-bottom:8px;">'
      +'<h2 class="gb-title" id="gbTitle">'+t.gbTitle+'</h2>'
      +'<div class="toc-close" id="gbClose">✕</div></div>'
      +'<div id="gbAuthArea"></div><div id="gbFormArea"></div><div id="gbListArea"></div>'
      +'</div></div>'
    );
  } else {
    // 데스크탑 unified panel
    return (
      '<a href="#mainContent" class="skip-link">Skip to main content</a>'
      +'<div id="tocOverlay" class="overlay-panel" aria-hidden="true">'
      +'<div class="overlay-backdrop" id="tocBackdrop"></div>'
      +'<div class="unified-panel panel-box" role="dialog" aria-modal="true" aria-label="Menu">'
      +'<div class="toc-close" id="tocClose" aria-label="Close">✕</div>'
      +'<div class="unified-left">'
      +'<div class="toc-main">'
      +'<div class="menu-section">'
      +'<h3 class="menu-h" id="menuH_TOC">'+t.menuH_TOC+'</h3>'
      +'<ul class="toc-list">'
      +'<li class="toc-item" id="tocHome" style="cursor:pointer"><span class="toc-bullet">●</span><span class="toc-text">intro</span></li>'
      +tci('prologue','tocPrologue',t.prologue)
      +tci('lovedream','tocLoveDream',t.lovedream)
      +tci('lovesong','tocLoveSong',t.lovesong)
      +'<li class="toc-item toc-locked"><span class="toc-bullet">●</span><span class="toc-text">'+t.resonance+'</span></li>'
      +'<li class="toc-item toc-locked"><span class="toc-bullet">●</span><span class="toc-text">'+t.dance+'</span></li>'
      +'<li class="toc-item toc-locked"><span class="toc-bullet">●</span><span class="toc-text">'+t.chorus+'</span></li>'
      +tci('epilogue','tocEpilogue',t.epilogue)
      +'</ul></div>'
      +'<div class="menu-section"><h3 class="menu-h menu-h-link" id="menuH_ABOUT" tabindex="0">'+t.menuH_ABOUT+'</h3></div>'
      +'<div class="menu-section"><div class="contact-icons">'
      +'<a href="mailto:vitro@narida.art" class="contact-icon" title="E-Mail">'
      +'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/></svg>'
      +'<span class="contact-icon-text">vitro@narida.art</span>'
      +'</a>'
      +'<a href="https://instagram.com/vitro.narida" target="_blank" rel="noopener noreferrer" class="contact-icon" title="Instagram">'
      +'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/></svg>'
      +'<span class="contact-icon-text">vitro.narida</span>'
      +'</a>'
      +'</div></div>'
      +'<div class="menu-section"><div class="menu-copyright" id="copyrightLine">© Vitro Narida.<br>All rights reserved.</div></div>'
      +'<div class="menu-section"><h3 class="menu-h menu-h-link" id="menuH_GB" tabindex="0">'+t.menuH_GB+'</h3></div>'
      +'</div>'
      +'<div id="tocDesktopBar" class="unified-bottom-bar" style="flex-direction:row;align-items:center;gap:12px;">'
      +'<div class="toc-info-btn" id="tocInfoBtn" tabindex="0" style="position:relative;left:0;top:auto;bottom:auto;" data-tip="사용법">'
      +'<svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:18px;height:18px;"><path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.064.852l-.708 2.836a.75.75 0 0 0 1.064.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"/></svg>'
      +'</div>'
      +'</div></div>'
      +'<div class="unified-right">'
      +'<div class="unified-right-header"><h2 class="index-title" id="thumbTitle">'+t.indexTitle+'</h2>'
      +'<div class="thumb-expand-btn" id="thumbExpandBtn" tabindex="0">'
      +'<svg class="icon-expand" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9m11.25-5.25v4.5m0-4.5h-4.5m4.5 0L15 9m-11.25 11.25v-4.5m0 4.5h4.5m-4.5 0L9 15m11.25 5.25v-4.5m0 4.5h-4.5m4.5 0L15 15"/></svg>'
      +'<svg class="icon-collapse" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25"/></svg>'
      +'</div></div>'
      +'<div class="unified-thumb-body"><div class="thumb-grid" id="thumbGrid"></div></div>'
      +'</div>'
      +'</div></div>'
      /* Scene List */
      +'<div id="sceneListOverlay" class="overlay-panel" aria-hidden="true" style="display:none;">'
      +'<div class="overlay-backdrop" id="slstBackdrop"></div>'
      +'<div class="unified-panel panel-box slst-panel" style="flex-direction:column;">'
      +'<div class="slst-header"><h2 class="toc-title">'+t.slstTitle+'</h2>'
      +'<div style="display:flex;align-items:center;gap:8px;">'+langToggle
      +'<div class="toc-close" id="slstClose">✕</div></div></div>'
      +'<div class="slst-body" id="sceneListBody"></div>'
      +'</div></div>'
      /* About */
      +'<div id="aboutOverlay" class="overlay-panel" aria-hidden="true" style="display:none;">'
      +'<div class="overlay-backdrop" id="aboutBackdrop"></div>'
      +'<div class="index-panel panel-box" style="width:min(510px,88vw);padding:24px 32px 40px;">'
      +'<div class="toc-close" id="aboutClose" style="position:absolute;top:12px;right:16px;">✕</div>'
      +'<h2 id="aboutTitle" style="font-size:26px;margin:0 0 16px;font-family:\'Nanum Pen Script\',cursive;"></h2>'
      +'<div id="aboutBody" style="font-size:clamp(20px,2vw,22px);line-height:1.6;color:rgba(235,235,235,0.90);white-space:pre-line;font-family:\'Nanum Pen Script\',cursive;"></div>'
      +'</div></div>'
      /* Poem */
      +'<div id="poemOverlay" class="overlay-panel" aria-hidden="true" style="display:none;">'
      +'<div class="overlay-backdrop" id="poemBackdrop"></div>'
      +'<div class="index-panel panel-box" style="width:min(510px,88vw);max-height:90vh;padding:24px 32px 40px;overflow-y:auto;scrollbar-width:none;">'
      +'<div class="toc-close" id="poemClose" style="position:absolute;top:12px;right:16px;">✕</div>'
      +'<h2 id="poemTitle" style="font-size:24px;margin:0 0 16px;"></h2>'
      +'<div class="poem-body" id="poemBody"></div>'
      +'</div></div>'
      /* Help */
      +'<div id="helpOverlay" class="overlay-panel" aria-hidden="true" style="display:none;">'
      +'<div class="overlay-backdrop" id="helpBackdrop"></div>'
      +'<div class="index-panel panel-box" style="width:min(480px,88vw);">'
      +'<div class="toc-close" id="helpClose" style="position:absolute;top:12px;right:16px;">✕</div>'
      +'<h2 style="font-size:24px;margin:0 0 14px;font-family:\'Nanum Pen Script\',cursive;">'+t.infoHelpTitle+'</h2>'
      +'<div style="padding:0 4px;">'
      +'<div class="info-row"><kbd>← →</kbd> <span>'+t.infoNav+'</span></div>'
      +'<div class="info-row"><kbd>M</kbd> <span>'+t.infoMenu+'</span></div>'
      +'<div class="info-row"><kbd>H</kbd> <span>'+t.infoHelp+'</span></div>'
      +'<div class="info-row"><kbd>G</kbd> <span>'+t.infoG+'</span></div>'
      +'<div class="info-row"><kbd>P</kbd> <span>'+t.infoP+'</span></div>'
      +'</div></div></div>'
      /* Intro */
      +'<div id="introOverlay" class="overlay-panel" aria-hidden="true" style="display:none;">'
      +'<div class="overlay-backdrop" id="introBackdrop"></div>'
      +'<div class="intro-circle-wrap"><div class="intro-btn" id="introBtn"><span class="intro-btn-text">intro</span></div>'
      +'<div class="intro-ring"></div><div class="intro-ring"></div></div>'
      +'</div>'
      /* Guestbook */
      +'<div id="gbOverlay" class="overlay-panel" aria-hidden="true" style="display:none;">'
      +'<div class="overlay-backdrop" id="gbBackdrop"></div>'
      +'<div class="gb-panel panel-box" role="dialog" aria-modal="true">'
      +'<div class="gb-close" id="gbClose">✕</div>'
      +'<h2 class="gb-title" id="gbTitle">'+t.gbTitle+'</h2>'
      +'<div id="gbAuthArea"></div><div id="gbFormArea"></div><div id="gbListArea"></div>'
      +'</div></div>'
      /* #app + mainContent anchor */
      +'<div id="app" role="main"></div>'
      +'<span id="mainContent" aria-hidden="true" style="position:absolute;top:0;left:0;"></span>'
    );
  }
}

/* ============================================================
   I. SPA 전환 오버레이 보장
   ============================================================ */
function ensureSPAOverlays() {
  if (!$id('trans-overlay')) {
    var t = document.createElement('div'); t.id='trans-overlay';
    if(isMobile){
      /* 모바일: photo-area(정사각형)만 덮기 */
      t.style.cssText='position:fixed;top:0;left:0;width:100%;aspect-ratio:1/1;background:#000;pointer-events:none;opacity:0;z-index:8000;';
    } else {
      t.style.cssText='position:fixed;inset:0;background:#000;pointer-events:none;opacity:0;z-index:8000;';
    }
    document.body.appendChild(t);
  }
  if (!$id('white-overlay')) {
    var w = document.createElement('div'); w.id='white-overlay';
    w.style.cssText='position:fixed;width:100vmin;height:100vmin;top:50%;left:50%;transform:translate(-50%,-50%);background:#fff;pointer-events:none;opacity:0;z-index:8100;';
    document.body.appendChild(w);
  }
}

function transOverlay(opacity, duration, cb) {
  var o = $id('trans-overlay'); if (!o) { if(cb) cb(); return; }
  o.style.transition = 'opacity '+duration+'ms ease';
  o.style.opacity = String(opacity);
  if (cb) setTimeout(cb, duration);
}

/* ============================================================
   K. renderScene() — Phase 1 재설계
   buildSceneShell → renderPhotoLayer → renderControlLayer → TransitionManager
   타이핑: onDone 콜백에서만 시작
   ============================================================ */

/* ============================================================
   AUTO. AutoPlay — 자동 감상 모드 (데스크탑 전용)
   ============================================================ */
/* ============================================================
   CursorHide — 오토플레이/인트로 lock 시 마우스 커서 자동 숨김
   ============================================================ */
var CursorHide = (function(){
  var _timer = null;
  var _active = false;
  var HIDE_MS = 2000;

  function _onMove() {
    document.body.style.cursor = '';
    clearTimeout(_timer);
    if (_active) {
      _timer = setTimeout(function(){ document.body.style.cursor = 'none'; }, HIDE_MS);
    }
  }

  function start() {
    if (_active) return;
    _active = true;
    document.addEventListener('mousemove', _onMove);
    _timer = setTimeout(function(){ document.body.style.cursor = 'none'; }, HIDE_MS);
  }

  function stop() {
    _active = false;
    document.removeEventListener('mousemove', _onMove);
    clearTimeout(_timer);
    _timer = null;
    document.body.style.cursor = '';
  }

  return { start: start, stop: stop };
})();

var AutoPlay = (function(){
  var _active   = false;
  var _paused   = false;
  var _timer    = null;   /* 3초 씬 이동 타이머 */
  var LAST_SCENE_ID = 'LEL_01';
  var DELAY_MS      = 3000;
  var LPL_DELAY_MS  = 6000; /* LPL 씬: 애니메이션 감상을 위해 2배 대기 */
  var _scene    = null;
  var _sceneURL = null;

  /* --- 커서 숨김 --- */
  var _cursorTimer = null;
  var CURSOR_HIDE_MS = 2000;
  function _onMouseMove() {
    document.body.style.cursor = '';
    clearTimeout(_cursorTimer);
    if (_active) {
      _cursorTimer = setTimeout(function(){ document.body.style.cursor = 'none'; }, CURSOR_HIDE_MS);
    }
  }
  function _startCursorHide() { if (!isMobile) CursorHide.start(); }
  function _stopCursorHide()  { CursorHide.stop();  }

  /* --- Wake Lock --- */
  var _wakeLock = null;
  function _acquireWakeLock() {
    if (!navigator.wakeLock) return;
    navigator.wakeLock.request('screen').then(function(lock) {
      _wakeLock = lock;
      _wakeLock.addEventListener('release', function() { _wakeLock = null; });
    }).catch(function(){});
  }
  function _releaseWakeLock() {
    if (_wakeLock) { _wakeLock.release().catch(function(){}); _wakeLock = null; }
  }
  /* 화면 복귀 시(visibility change) 오토플레이 중이면 재획득 */
  document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible' && _active && !_paused) _acquireWakeLock();
  });

  /* --- 내부 유틸 --- */
  function _clearAll(){ clearTimeout(_timer); }

  function _pauseAP(){
    if(!_active || _paused) return;
    _paused = true;
    clearTimeout(_timer);
    _releaseWakeLock(); /* #86 — pause 시 WakeLock 해제 */
    _updateNavBar();
  }

  function _resumeAP(){
    if(!_active || !_paused) return;
    _paused = false;
    _acquireWakeLock(); /* #86 — resume 시 WakeLock 재획득 */
    _updateNavBar();
    if(_scene && _scene.nextURL && _sceneURL){
      clearTimeout(_timer);
      _timer = setTimeout(function(){
        if(!_active || _paused) return;
        window.goTo(resolveURL(_sceneURL, _scene.nextURL), {direction:'next'});
      }, DELAY_MS);
    }
  }

  function _svg(sz, path){ return '<svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:'+sz+'px;height:'+sz+'px;">'+path+'</svg>'; }
  var _P_PAUSE = '<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5"/>';
  var _P_PLAY  = '<path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"/>';
  var _P_STOP  = '<path stroke-linecap="round" stroke-linejoin="round" d="M5.25 7.5A2.25 2.25 0 0 1 7.5 5.25h9a2.25 2.25 0 0 1 2.25 2.25v9a2.25 2.25 0 0 1-2.25 2.25h-9a2.25 2.25 0 0 1-2.25-2.25v-9Z"/>';
  var _P_LARR  = '<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5"/>';
  var _P_RARR  = '<path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5"/>';

  function _updateNavBar(){
    var btns = [
      { el: document.querySelector('.nav-bar .nav-btn:nth-child(1)'), sz: 26, side: 'left'  },
      { el: document.querySelector('.nav-bar .nav-btn:nth-child(4)'), sz: 26, side: 'right' },
      { el: document.querySelector('.nav-left'),                       sz: 28, side: 'left'  },
      { el: document.querySelector('.nav-right'),                      sz: 28, side: 'right' }
    ];
    btns.forEach(function(b) {
      if (!b.el) return;
      if (_active) {
        if (b.side === 'left') {
          b.el.innerHTML = _svg(b.sz, _paused ? _P_PLAY : _P_PAUSE);
          b.el.style.color = _paused ? 'rgba(212,175,55,0.9)' : '';
          b.el.setAttribute('data-tip', _paused ? (curLang==='KR'?'재생':'Resume') : (curLang==='KR'?'일시정지':'Pause'));
        } else {
          b.el.innerHTML = _svg(b.sz, _P_STOP);
          b.el.style.color = 'rgba(212,175,55,0.7)';
          b.el.setAttribute('data-tip', curLang==='KR'?'정지':'Stop');
        }
      } else {
        /* 오토모드 해제 시 원래 data-tip 복원 */
        if (b.side === 'left') {
          /* nav-left(데스크탑)는 data-original-tip 저장값 또는 기본값 복원 */
          var origTip = b.el.getAttribute('data-original-tip');
          if (origTip) b.el.setAttribute('data-tip', origTip);
          /* 아이콘: data-original-tip이 About이면 i 아이콘, 아니면 ← */
          var isAbout = origTip === '작가의 말' || origTip === 'About';
          b.el.innerHTML = _svg(b.sz, isAbout
            ? '<path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.064.852l-.708 2.836a.75.75 0 0 0 1.064.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"/>'
            : _P_LARR);
        } else {
          var origTipR = b.el.getAttribute('data-original-tip');
          if (origTipR) b.el.setAttribute('data-tip', origTipR);
          b.el.innerHTML = _svg(b.sz, _P_RARR);
        }
        b.el.style.color = '';
      }
    });
  }

  /* --- 공개 API --- */

  /* 타이핑 완료 콜백 — 3초 후 다음 씬 이동 */
  function onTypingDone(scene, sceneURL){
    if(!_active || !scene) return;
    _scene = scene; _sceneURL = sceneURL;
    if(scene.id === LAST_SCENE_ID){ stop(); return; }
    clearTimeout(_timer);
    if(_paused) return; /* pause 중이면 타이머 시작 안 함 */
    var delay = LPL_DELAY_MS;
    _timer = setTimeout(function(){
      if(!_active || _paused) return;
      if(scene.nextURL) window.goTo(resolveURL(sceneURL, scene.nextURL), {direction:'next'});
    }, delay);
  }

  /* 씬 이동 감지 — goTo() 에서 호출 */
  function onSceneChange(){
    _clearAll();
    /* _paused는 유지 — pause 중 씬 이동 시에도 pause 상태 유지 */
  }

  /* TOC 플레이 버튼 — 현재 씬에서 바로 시작 */
  function start(scene, sceneURL){
    _active = true; _paused = false;
    _acquireWakeLock();
    _startCursorHide();
    _updateTocBtn(true);
    _updateNavBar();
    onTypingDone(scene, sceneURL);
  }

  /* 인트로 플레이 버튼 — 새 페이지 로드 후 타이핑 완료 시 onTypingDone 으로 이어받음 */
  function activate(){
    _active = true; _paused = false;
    _acquireWakeLock();
    _startCursorHide();
    _updateTocBtn(true);
    _updateNavBar();
  }

  function stop(){
    _active = false; _paused = false;
    _clearAll();
    _releaseWakeLock();
    _stopCursorHide();
    _updateTocBtn(false);
    _updateNavBar();
  }

  function isActive(){ return _active; }
  function isPaused(){ return _paused; }

  function _updateTocBtn(on){
    var playBtn = document.getElementById('tocAutoPlayBtn');
    var stopBtn = document.getElementById('tocStopBtn');
    if (playBtn) {
      playBtn.style.opacity = on ? '0.25' : '0.5';
      playBtn.style.pointerEvents = on ? 'none' : 'auto';
      playBtn.style.cursor = on ? 'default' : 'pointer';
      playBtn.style.color = '';
      playBtn.setAttribute('title', curLang==='KR'?'자동 감상':'Auto Play');
    }
    if (stopBtn) {
      stopBtn.style.opacity = on ? '0.5' : '0.25';
      stopBtn.style.pointerEvents = on ? 'auto' : 'none';
      stopBtn.style.cursor = on ? 'pointer' : 'default';
      stopBtn.setAttribute('title', on
        ? (curLang==='KR'?'수동 모드로 전환':'Switch to Manual')
        : (curLang==='KR'?'수동 모드':'Manual'));
    }
    /* 데스크탑 TOC knob 스위치 동기화 */
    var dtms = document.getElementById('tocDesktopBar');
    dtms = dtms && dtms.querySelector('.intro-sw');
    if (dtms && dtms._tocSync) dtms._tocSync(on);
  }

  return { start:start, activate:activate, stop:stop, isActive:isActive,
           isPaused:isPaused, onTypingDone:onTypingDone, onSceneChange:onSceneChange,
           updateNavBar:_updateNavBar, pauseAP:_pauseAP, resumeAP:_resumeAP };
})();


/* ============================================================
   K. SceneRenderer — 씬 DOM 생성 + 렌더링 전담 모듈
   공개 API:
     SceneRenderer.renderScene(scene, sceneURL, transDir)
   내부 상태:
     _fogRAF — fog 애니메이션 RAF 핸들 (renderScene 시작 시 취소)
   ============================================================ */
var SceneRenderer = (function() {
  var _fogRAF = null;


/* 하단 그라디언트 alpha — LPL 시리즈 0.22, 나머지 0.45 */
function _gradAlpha(scene) {
  return (scene.id && scene.id.indexOf('LPL') === 0) ? '0.22' : '0.45';
}

/* ============================================================
   K-0. 씬 공통 헬퍼
   ============================================================ */
/* ============================================================
   K-1. buildSceneShell — DOM 뼈대 생성
   데스크탑: .screen > .square-frame > (.photo-layer + .control-layer)
   모바일: { photoArea, controlArea } 객체 반환
   ============================================================ */
function buildSceneShell(scene) {
  if (!isMobile) {
    var screen = document.createElement('div');
    screen.className = 'screen visible scene';
    screen.id = scene.id + 'Screen';
    var sq = document.createElement('div');
    sq.className = 'square-frame';
    sq.id = 'mainContent';
    sq.style.cssText = 'position:absolute;left:50%;top:50%;transform:translate(-50%,-50%) translateZ(0);width:min(100vw,var(--vh100,100vh));aspect-ratio:1/1;background:#000;overflow:hidden;';
    var photoLayer = document.createElement('div');
    photoLayer.className = 'photo-layer';
    photoLayer.style.cssText = 'position:absolute;inset:0;overflow:hidden;';
    var controlLayer = document.createElement('div');
    controlLayer.className = 'control-layer';
    controlLayer.style.cssText = 'position:absolute;inset:0;pointer-events:none;z-index:50;';
    sq.appendChild(photoLayer);
    sq.appendChild(controlLayer);
    screen.appendChild(sq);
    return { screen: screen, sq: sq, photoLayer: photoLayer, controlLayer: controlLayer };
  } else {
    var photoArea = document.createElement('div');
    photoArea.className = 'photo-area';
    photoArea.id = 'mPhotoArea';
    /* lid는 _ensureLids에서 body에 position:fixed 오버레이로 생성 — photo-area 밖에 배치하여
       iOS Safari GPU 합성 레이어 z-index 버그 우회 (photo-area translateZ(0) 스태킹 컨텍스트 무관) */
    var controlArea = document.createElement('div');
    controlArea.className = 'control-area';
    return { photoArea: photoArea, controlArea: controlArea };
  }
}

/* ============================================================
   K-2. renderPhotoLayer — photo 레이어 채우기
   fog(LPL_01) / ripple(LPL_03,04) / 일반 이미지 분기
   container : 데스크탑=.photo-layer, 모바일=.photo-area
   onReady(img) : 이미지 로드 완료 시 호출
   ============================================================ */
function renderPhotoLayer(container, scene, imgSrc, onReady) {
  var img = document.createElement('img');
  img.className = 'scene-img';
  img.id = scene.id + 'Img';
  img.alt = scene.code || '';

  if (!isMobile) {
    img.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;object-fit:contain;background:#000;';
  } else {
    img.classList.add('show');
  }

  container.appendChild(img);

  /* 일시적 주석 처리 — 추후 사용 예정
  if (scene.id === 'LPL_01') {
    _buildFogElements(container, scene, img);
  }
  */

  /* 데스크탑만 하단 그라디언트 — 모바일은 텍스트가 control-area에 있으므로 불필요 (#87) */
  if (!isMobile) {
    var grad = document.createElement('div');
    grad.className = 'scene-grad-bottom';
    grad.style.cssText = 'position:absolute;left:0;right:0;bottom:0;height:50%;background:linear-gradient(to bottom,transparent,rgba(0,0,0,'
      + _gradAlpha(scene) + '));pointer-events:none;z-index:15;';
    container.appendChild(grad);
  }

  var fired = false;
  function fireReady() { if (fired) return; fired = true; if (onReady) onReady(img); }

  img.src = imgSrc;
  if (img.complete && img.naturalWidth > 0) {
    fireReady();
  } else {
    img.addEventListener('load',  fireReady, {once: true});
    img.addEventListener('error', fireReady, {once: true});
    if (isMobile) {
      var poll = setInterval(function(){
        if (img.naturalWidth > 0) { clearInterval(poll); fireReady(); }
      }, 16);
      img.addEventListener('load', function(){ clearInterval(poll); }, {once: true});
    }
  }

  return img;
}

/* ============================================================
   K-2a. _buildFogElements — LPL_01 fog 특수 레이어
   photo-layer 안에 fog 관련 DOM 삽입 + FogFX 바인딩
   ============================================================ */
function _buildFogElements(container, scene, img) {
  if (!isMobile) {
    var overlay  = document.createElement('div'); overlay.className  = 'overlay';
    var fogAtmo  = document.createElement('div'); fogAtmo.className  = 'fog-atmo';
    var fogAtmo2 = document.createElement('div'); fogAtmo2.className = 'fog-atmo2';
    var fogNoise = document.createElement('div'); fogNoise.className = 'fog'; fogNoise.id = 'fogNoise';
    fogNoise.setAttribute('aria-hidden', 'true');
    _makeFogCanvas(fogNoise);
    container.appendChild(overlay);
    container.appendChild(fogAtmo);
    container.appendChild(fogAtmo2);
    container.appendChild(fogNoise);
    FogFX.bind(fogNoise);
    img.style.opacity = '0';
    img.addEventListener('load', function() {
      img.style.transition = 'opacity 3000ms ease';
      img.style.opacity = '1';
      /* FogFX.start()는 수동모드 타이핑 완료 시에만 호출 (TypingEngine에서 처리) */
    }, {once: true});
  } else {
    var fogAtmoM  = document.createElement('div'); fogAtmoM.className  = 'fog-atmo';
    var fogAtmo2M = document.createElement('div'); fogAtmo2M.className = 'fog-atmo2';
    var fogTint   = document.createElement('div'); fogTint.className   = 'fog-tint-m';
    var fogEl     = document.createElement('div'); fogEl.className     = 'fog-overlay-m'; fogEl.id = 'fogNoiseM';
    _makeFogCanvas(fogEl);
    container.appendChild(fogAtmoM);
    container.appendChild(fogAtmo2M);
    container.appendChild(fogTint);
    container.appendChild(fogEl);
    FogFX.bind(fogEl);
    /* FogFX.start()는 수동모드 타이핑 완료 시에만 호출 (TypingEngine에서 처리) */
  }
}

/* ============================================================
   Q. FOG 효과
   ============================================================ */

function _makeFogCanvas(el){
  var sz=256,cv=document.createElement('canvas'); cv.width=sz; cv.height=sz;
  var cx=cv.getContext('2d'), id=cx.createImageData(sz,sz), d=id.data;
  for(var i=0;i<d.length;i+=4){var v=Math.random()*255|0;d[i]=v;d[i+1]=v;d[i+2]=v;d[i+3]=255;}
  cx.putImageData(id,0,0);
  el.style.backgroundImage='url('+cv.toDataURL('image/png')+')';
  el.style.backgroundRepeat='repeat';
}

var _initRipple, _initRippleTop;

/* ripple 효과 초기화 — LPL_03(하단 물결), LPL_04(상단 물결) */
function _initRippleForScene(img, container, scene) {
  if (scene.id === 'prague' || scene.id === 'LPL_03') _initRipple(img, container);
  else if (scene.id === 'dreams' || scene.id === 'LPL_04') _initRippleTop(img, container);
}


/* ============================================================
   R-1. _initRipple — LPL_03 프라하 하단 물결 (feTurbulence)
   ============================================================ */
  _initRipple = function(img, sqEl) {
    if(!img||!sqEl){console.warn("[ripple] invalid args");return;}
    const RIPPLE_RATIO = 0.43; // 소스 이미지에서 물 영역 비율
    const SCREEN_RATIO = 0.40; // 화면 대비 일렁임 높이
    var FID="prague-ripple-"+Math.random().toString(36).substr(2,6);

    // SVG 필터 생성 (feTurbulence + feDisplacementMap)
    var NS="http://www.w3.org/2000/svg";
    var svg=document.createElementNS(NS,"svg");
    svg.style.position="absolute";svg.style.width="0";svg.style.height="0";
    svg.style.pointerEvents="none";svg.style.overflow="hidden";
    var defs=document.createElementNS(NS,"defs");
    var filter=document.createElementNS(NS,"filter");
    filter.setAttribute("id",FID);
    filter.setAttribute("x","0%");filter.setAttribute("y","0%");
    filter.setAttribute("width","100%");filter.setAttribute("height","100%");
    filter.setAttribute("color-interpolation-filters","sRGB");
    var turb=document.createElementNS(NS,"feTurbulence");
    turb.setAttribute("type","turbulence");
    turb.setAttribute("baseFrequency","0.012 0.035");
    turb.setAttribute("numOctaves","3");
    turb.setAttribute("seed","42");
    turb.setAttribute("result","noise");
    var disp=document.createElementNS(NS,"feDisplacementMap");
    disp.setAttribute("in","SourceGraphic");
    disp.setAttribute("in2","noise");
    disp.setAttribute("scale","0");
    disp.setAttribute("xChannelSelector","R");
    disp.setAttribute("yChannelSelector","G");
    filter.append(turb,disp);defs.appendChild(filter);svg.appendChild(defs);

    // 기존 요소 정리
    sqEl.querySelectorAll("[data-ripple-canvas]").forEach(function(el){el.remove();});
    document.querySelectorAll("[data-ripple-svg-prague]").forEach(function(el){el.remove();});
    sqEl.querySelectorAll("[data-ripple-el-prague]").forEach(function(el){el.remove();});
    svg.setAttribute("data-ripple-svg-prague","1");
    document.body.appendChild(svg);

    // 물결 레이어: 이미지 클론 + SVG 필터 적용
    var rippleEl=document.createElement("div");
    rippleEl.setAttribute("data-ripple-el-prague","1");
    rippleEl.style.position="absolute";
    rippleEl.style.pointerEvents="none";
    rippleEl.style.overflow="hidden";
    rippleEl.style.clipPath="inset(0)";
    rippleEl.style.opacity="0";
    rippleEl.style.transition="opacity 1.5s ease";
    var clone=img.cloneNode(false);
    clone.removeAttribute("id");
    clone.style.position="absolute";
    clone.style.filter="url(#"+FID+")";
    rippleEl.appendChild(clone);
    sqEl.appendChild(rippleEl);

    var _coverMode=getComputedStyle(img).objectFit==="cover";
    var syncPos=function(){
      var sqW=sqEl.offsetWidth,sqH=sqEl.offsetHeight;
      var iw=img.naturalWidth,ih=img.naturalHeight;
      if(!iw||!ih||!sqW||!sqH)return false;

      if(_coverMode){
        // 모바일 cover 모드: 전체 컨테이너 채움
        rippleEl.style.left="0px";
        rippleEl.style.width=sqW+"px";
        rippleEl.style.top="0px";
        rippleEl.style.height=sqH+"px";
        rippleEl.style.zIndex="10";
        var fadeStart=Math.round((1-SCREEN_RATIO)*100);
        var fadeEnd=Math.min(fadeStart+8,100);
        /* 상하 + 좌우 가장자리 fade — displacement 경계 아티팩트 제거 (데스크탑과 동일) */
        var edgeFade = "2%";
        var combinedMask =
          "linear-gradient(to bottom, transparent "+fadeStart+"%, black "+fadeEnd+"%, black 92%, transparent 100%)," +
          "linear-gradient(to right,  transparent "+edgeFade+", black 6%, black 94%, transparent calc(100% - "+edgeFade+"))";
        rippleEl.style.webkitMaskImage = combinedMask;
        rippleEl.style.maskImage       = combinedMask;
        rippleEl.style.webkitMaskComposite = "destination-in";
        rippleEl.style.maskComposite       = "intersect";
        clone.style.width="100%";
        clone.style.height="100%";
        clone.style.objectFit="cover";
        clone.style.left="0px";
        clone.style.top="0px";
        clone.style.transformOrigin="center center";
        clone.style.transform="";
        return true;
      } else {
        // 데스크탑 contain 모드
        var scale=Math.min(sqW/iw,sqH/ih);
        var rw=iw*scale,rh=ih*scale;
        var rx=(sqW-rw)/2,ry=(sqH-rh)/2;
        rippleEl.style.left=rx+"px";
        rippleEl.style.width=rw+"px";
        rippleEl.style.top=ry+"px";
        rippleEl.style.height=rh+"px";
        rippleEl.style.zIndex="10";
        var fadeStart=Math.round((1-SCREEN_RATIO)*100);
        var fadeEnd=Math.min(fadeStart+8,100);
        clone.style.width=rw+"px";
        clone.style.height=rh+"px";
        clone.style.left="0px";
        clone.style.top="0px";
        clone.style.transformOrigin="center center";
        clone.style.transform="";
        /* 상하 + 좌우 가장자리 fade — displacement 경계 아티팩트 제거 */
        var edgeFade = "2%";
        var combinedMask =
          "linear-gradient(to bottom, transparent "+fadeStart+"%, black "+fadeEnd+"%, black 92%, transparent 100%)," +
          "linear-gradient(to right,  transparent "+edgeFade+", black 6%, black 94%, transparent calc(100% - "+edgeFade+"))";
        rippleEl.style.webkitMaskImage = combinedMask;
        rippleEl.style.maskImage       = combinedMask;
        rippleEl.style.webkitMaskComposite = "destination-in";
        rippleEl.style.maskComposite       = "intersect";
        return true;
      }
    };
    syncPos();
    var onUpdate=function(){syncPos();setTimeout(syncPos,150);setTimeout(syncPos,500);};
    window.addEventListener("resize",onUpdate);
    document.addEventListener("fullscreenchange",onUpdate);

    // 애니메이션: feTurbulence 파라미터를 서서히 변경
    var _mob=isMobile;
    var _dScale=_mob?5:4, _dAmpA=_mob?2.5:2.0, _dAmpB=_mob?1.2:1.0, _dSpeed=_mob?0.010:0.012;
    var t=0;
    var animate=function(){
      turb.setAttribute("baseFrequency",
        (0.010+Math.sin(t*0.7)*0.003).toFixed(4)+" "+
        (0.030+Math.cos(t*0.5)*0.005).toFixed(4)
      );
      disp.setAttribute("scale",(_dScale+Math.sin(t*0.4)*_dAmpA+Math.cos(t*0.7)*_dAmpB).toFixed(2));
      t+=_dSpeed;
      requestAnimationFrame(animate);
    };
    setTimeout(function(){
      /* syncPos 성공(크기 확정) 후 opacity:1 — 실패 시 재시도 */
      function tryShow(attempts) {
        if (syncPos()) {
          rippleEl.style.opacity = "1";
          animate();
        } else if (attempts > 0) {
          setTimeout(function(){ tryShow(attempts - 1); }, 100);
        }
      }
      tryShow(10);
    }, 300);
  };

  // ===== lpl_04 숨쉬는 물결 효과 (맥동 + 미세 떨림) =====

  _initRippleTop = function(img, sqEl) {
    if(!img||!sqEl)return;
    var FID="dreams-breath-"+Math.random().toString(36).substr(2,6);
    var NS="http://www.w3.org/2000/svg";

    // SVG 필터: 미세한 고주파 노이즈
    var svg=document.createElementNS(NS,"svg");
    svg.style.position="absolute";svg.style.width="0";svg.style.height="0";
    svg.style.pointerEvents="none";svg.style.overflow="hidden";
    var defs=document.createElementNS(NS,"defs");
    var filter=document.createElementNS(NS,"filter");
    filter.setAttribute("id",FID);
    filter.setAttribute("x","0%");filter.setAttribute("y","0%");
    filter.setAttribute("width","100%");filter.setAttribute("height","100%");
    filter.setAttribute("color-interpolation-filters","sRGB");
    var turb=document.createElementNS(NS,"feTurbulence");
    turb.setAttribute("type","turbulence");
    turb.setAttribute("baseFrequency","0.020 0.045"); // 고주파 = 미세 떨림
    turb.setAttribute("numOctaves","3");
    turb.setAttribute("seed","11");
    turb.setAttribute("result","noise");
    var disp=document.createElementNS(NS,"feDisplacementMap");
    disp.setAttribute("in","SourceGraphic");
    disp.setAttribute("in2","noise");
    disp.setAttribute("scale","0");
    disp.setAttribute("xChannelSelector","R");
    disp.setAttribute("yChannelSelector","G");
    filter.append(turb,disp);defs.appendChild(filter);svg.appendChild(defs);

    // 기존 요소 정리
    document.querySelectorAll("[data-ripple-svg]").forEach(function(el){el.remove();});
    sqEl.querySelectorAll("[data-ripple-el]").forEach(function(el){el.remove();});
    svg.setAttribute("data-ripple-svg","dreams");
    document.body.appendChild(svg);

    // 전체 화면 레이어
    var rippleEl=document.createElement("div");
    rippleEl.setAttribute("data-ripple-el","dreams");
    rippleEl.style.position="absolute";
    rippleEl.style.pointerEvents="none";
    rippleEl.style.overflow="hidden";
    rippleEl.style.clipPath="inset(0)";
    rippleEl.style.opacity="0";
    rippleEl.style.transition="opacity 1.5s ease";
    rippleEl.style.transformOrigin="center center";
    var clone=img.cloneNode(false);
    clone.removeAttribute("id");
    clone.style.position="absolute";
    clone.style.filter="url(#"+FID+")";
    clone.style.transformOrigin="center center";
    rippleEl.appendChild(clone);
    sqEl.appendChild(rippleEl);

    var rw=0,rh=0;
    var _coverMode2=getComputedStyle(img).objectFit==="cover";
    var syncPos=function(){
      var sqW=sqEl.offsetWidth,sqH=sqEl.offsetHeight;
      var iw=img.naturalWidth,ih=img.naturalHeight;
      if(!iw||!ih)return;

      if(_coverMode2){
        rw=sqW;rh=sqH;
        rippleEl.style.left="0px";
        rippleEl.style.width=sqW+"px";
        rippleEl.style.top="0px";
        rippleEl.style.height=sqH+"px";
        rippleEl.style.zIndex="10";
        var maskVal="linear-gradient(to bottom, black 0%, black 45%, transparent 55%, transparent 100%)";
        rippleEl.style.webkitMaskImage=maskVal;
        rippleEl.style.maskImage=maskVal;
        clone.style.width="100%";
        clone.style.height="100%";
        clone.style.objectFit="cover";
        clone.style.left="0px";
        clone.style.top="0px";
      } else {
        var scale=Math.min(sqW/iw,sqH/ih);
        rw=iw*scale;rh=ih*scale;
        var rx=(sqW-rw)/2,ry=(sqH-rh)/2;
        rippleEl.style.left=rx+"px";
        rippleEl.style.width=rw+"px";
        rippleEl.style.top=ry+"px";
        rippleEl.style.height=rh+"px";
        rippleEl.style.zIndex="10";
        var maskVal="linear-gradient(to bottom, black 0%, black 45%, transparent 55%, transparent 100%)";
        rippleEl.style.webkitMaskImage=maskVal;
        rippleEl.style.maskImage=maskVal;
        clone.style.width=rw+"px";
        clone.style.height=rh+"px";
        clone.style.left="0px";
        clone.style.top="0px";
      }
      clone.style.transformOrigin="center center";
    };
    syncPos();
    var onUpdate=function(){syncPos();setTimeout(syncPos,150);setTimeout(syncPos,500);};
    window.addEventListener("resize",onUpdate);
    document.addEventListener("fullscreenchange",onUpdate);

    // 애니메이션: 느린 맥동(스케일) + 미세 떨림(SVG 필터)
    var _mob2=isMobile;
    var _dS2=_mob2?2.0:2.5, _dA2=_mob2?0.8:1.0, _dB2=_mob2?0.4:0.5;
    var _bA=_mob2?0.003:0.004, _bB=_mob2?0.0015:0.002;
    var _tX=_mob2?0.25:0.3, _tY=_mob2?0.15:0.2, _tSpd=_mob2?0.009:0.01;
    var t2=0;
    var animate2=function(){
      turb.setAttribute("baseFrequency",
        (0.018+Math.sin(t2*1.1)*(_mob2?0.003:0.004)).toFixed(4)+" "+
        (0.040+Math.cos(t2*0.8)*(_mob2?0.006:0.008)).toFixed(4)
      );
      disp.setAttribute("scale",(_dS2+Math.sin(t2*0.6)*_dA2+Math.cos(t2*0.9)*_dB2).toFixed(2));

      var breathScale=1.0+Math.sin(t2*0.15)*_bA+Math.sin(t2*0.08)*_bB;
      var breathX=Math.sin(t2*0.12)*_tX;
      var breathY=Math.cos(t2*0.09)*_tY;
      clone.style.transform="scale("+(breathScale).toFixed(5)+") translate("+breathX.toFixed(2)+"px,"+breathY.toFixed(2)+"px)";

      t2+=_tSpd;
      requestAnimationFrame(animate2);
    };
    setTimeout(function(){rippleEl.style.opacity="1";animate2();},200);
  };

var FogFX=(function(){
  var fogEl=null, timer=null;
  return {
    bind:function(el){ fogEl=el; },
    stop:function(){ clearTimeout(timer); timer=null; fogEl=null; },
    start:function(){
      var tick=function(){
        var tx=(-2.2+Math.random()*4.4).toFixed(2);
        var ty=(-2.0+Math.random()*4.0).toFixed(2);
        var sc=(1.01+Math.random()*0.05).toFixed(3);
        if(fogEl){ fogEl.style.transform='translate('+tx+'%,'+ty+'%) scale('+sc+')'; }
        var op=Math.random()<0.15?0:(0.05+Math.random()*0.10);
        if(fogEl) fogEl.style.setProperty('--fog-opacity',op.toFixed(3));
        timer=setTimeout(tick,Math.floor(6000+Math.random()*6000));
      };
      tick();
    }
  };
})();

/* ============================================================
   K-4. renderControlLayer — control 레이어 채우기
   데스크탑: .control-layer 에 nav 버튼 + scene-text 삽입
   모바일  : .control-area 에 텍스트/버튼 삽입
   ============================================================ */
function renderControlLayer(container, scene, sceneURL) {
  if (isMobile) {
    _buildMobileNav(scene, sceneURL, container);
  } else {
    var sq = container.parentElement; /* .square-frame */
    _buildDesktopNav(sq, scene, sceneURL);
    /* scene-text 는 control-layer 안에 */
    var textEl = document.createElement('div');
    var sceneText = curLang === 'KR' ? scene.textKR : scene.textEN;
    var isMultiLine = sceneText && sceneText.indexOf('\n') !== -1
    textEl.className = 'scene-text' + (isMultiLine ? ' long-text' : '');
    textEl.setAttribute('aria-live', 'polite');
    container.appendChild(textEl);
  }
}


/* ============================================================
   R. 모바일 control-area 빌더
   ============================================================ */
function _buildMobileNav(scene, sceneURL, container) {
  var ctrl = container; /* control-area 는 buildSceneShell에서 이미 생성 */

  var codeEl=document.createElement('div'); codeEl.className='work-code';
  if(scene.code){ codeEl.textContent='Op. '+scene.code; codeEl.style.cursor='pointer'; codeEl.addEventListener('click',function(){ SceneListManager.open(); }); }
  ctrl.appendChild(codeEl);

  /* 씬 텍스트 — min-height로 공간 미리 확보 (타이핑 시작 전 레이아웃 shift 방지) */
  var sceneTextM = curLang === 'KR' ? scene.textKR : scene.textEN;
  var isMultiLineM = sceneTextM && sceneTextM.indexOf('\n') !== -1;
  var textEl=document.createElement('div'); textEl.className='scene-text' + (isMultiLineM ? ' long-text' : '');
  textEl.style.minHeight='calc(clamp(22px, 3vw, 28px) * 1.6 * 2)';
  ctrl.appendChild(textEl);

  /* 네비바 */
  var navBar=document.createElement('div'); navBar.className='nav-bar';
  navBar.style.cssText='display:flex;flex-direction:row;flex-wrap:nowrap;align-items:center;justify-content:space-between;width:100%;padding:0 24px;gap:12px;';
  var leftBtn=document.createElement('div');
  if(!scene.prevURL && scene.pageNum===1){
    leftBtn.className='nav-btn'; leftBtn.innerHTML='<svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:26px;height:26px;"><path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.064.852l-.708 2.836a.75.75 0 0 0 1.064.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"/></svg>';
    leftBtn._navHandler=function(){ AboutManager.open(); };
  } else {
    leftBtn.className='nav-btn'+(scene.prevURL?'':' disabled');
    leftBtn.innerHTML='<svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:26px;height:26px;"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5"/></svg>';
    leftBtn._navHandler=function(){
      if(AutoPlay.isActive()){ AutoPlay.isPaused() ? AutoPlay.resumeAP() : AutoPlay.pauseAP(); return; }
      if(NavigationManager.isNavigating()) return;
      if(scene.prevURL) window.goTo(resolveURL(sceneURL,scene.prevURL),{direction:'prev'});
    };
  }
  leftBtn.addEventListener('click', leftBtn._navHandler);
  leftBtn.addEventListener('touchend', function(e){
    e.preventDefault(); e.stopPropagation();
    leftBtn._navHandler();
  }, {passive:false});

  var menuBtn=document.createElement('div'); menuBtn.className='nav-btn';
  menuBtn.innerHTML='<svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:26px;height:26px;"><path stroke-linecap="round" stroke-linejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"/></svg>';
  menuBtn.addEventListener('click',TOCManager.open);

  var listBtn=document.createElement('div'); listBtn.className='nav-btn';
  listBtn.innerHTML='<svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:26px;height:26px;"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"/></svg>';
  listBtn.addEventListener('click',SceneListManager.open);

  var rightBtn=document.createElement('div');
  rightBtn.className='nav-btn'+(scene.nextURL?'':' disabled');
  rightBtn.innerHTML='<svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:26px;height:26px;"><path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5"/></svg>';
  rightBtn._navHandler=function(){
    if(AutoPlay.isActive()){ AutoPlay.stop(); return; }
    if(NavigationManager.isNavigating()) return;
    if(scene.nextURL) window.goTo(resolveURL(sceneURL,scene.nextURL),{direction:'next'});
  };
  rightBtn.addEventListener('click', rightBtn._navHandler);
  rightBtn.addEventListener('touchend', function(e){
    e.preventDefault(); e.stopPropagation();
    rightBtn._navHandler();
  }, {passive:false});

  navBar.append(leftBtn, menuBtn, listBtn, rightBtn);
  ctrl.appendChild(navBar);

  var counter=document.createElement('div'); counter.className='page-counter';
  counter.textContent='P.'+scene.pageNum+' / '+scene.totalPages;
  ctrl.appendChild(counter);

  /* 스와이프 */
  var tx=null,ty=0;
  ctrl.addEventListener('touchstart',function(e){ if(e.touches.length>1){tx=null;return;} tx=e.touches[0].clientX; ty=e.touches[0].clientY; },{passive:true});
  ctrl.addEventListener('touchend',function(e){
    if(tx===null||e.changedTouches.length>1) return;
    var dx=e.changedTouches[0].clientX-tx, dy=e.changedTouches[0].clientY-ty; tx=null;
    if(Math.abs(dx)>Math.abs(dy)&&Math.abs(dx)>50){
      if(dx<0&&scene.nextURL) window.goTo(resolveURL(sceneURL,scene.nextURL),{direction:'next'});
      else if(dx>0&&scene.prevURL) window.goTo(resolveURL(sceneURL,scene.prevURL),{direction:'prev'});
    }
  },{passive:true});
}

/* ============================================================
   S. 데스크탑 네비게이션 (square-frame 안에 삽입)
   ============================================================ */
function _buildDesktopNav(sq, scene, sceneURL) {
  /* 메뉴 버튼 */
  var mb=document.createElement('div'); mb.className='nav-menu nav-btn';
  mb.innerHTML='<svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:28px;height:28px;"><path stroke-linecap="round" stroke-linejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"/></svg>';
  mb.setAttribute('data-tip', curLang==='KR'?'메뉴':'Menu');
  mb.addEventListener('click',TOCManager.open);
  sq.appendChild(mb);

  /* 씬 목록 버튼 (nav-scenelist) */
  var st=document.createElement('div'); st.className='nav-scenelist nav-btn';
  st.innerHTML='<svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:28px;height:28px;"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/></svg>';
  st.setAttribute('data-tip', curLang==='KR'?'사랑의 순간':'Scene List');
  st.addEventListener('click',SceneListManager.open);
  sq.appendChild(st);

  /* 화살표 */
  function makeArrow(dir, url) {
    var btn=document.createElement('div'); btn.className='nav-arrow nav-btn nav-'+dir;
    if (!url && dir==='left' && scene.pageNum===1) {
      btn.innerHTML='<svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:28px;height:28px;"><path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.064.852l-.708 2.836a.75.75 0 0 0 1.064.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"/></svg>';
      btn.setAttribute('data-tip', curLang==='KR'?'작가의 말':'About');
      btn.setAttribute('data-original-tip', curLang==='KR'?'작가의 말':'About');
      btn._navHandler = function() {
        if(AutoPlay.isActive()){ AutoPlay.isPaused() ? AutoPlay.resumeAP() : AutoPlay.pauseAP(); return; }
        AboutManager.open();
      };
      btn.addEventListener('click', btn._navHandler);
      btn.addEventListener('touchend', function(e){ e.preventDefault(); btn._navHandler(); }, {passive:false});
      btn.addEventListener('keydown', function(e){ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); btn._navHandler(); } });
    } else if (!url) {
      btn.classList.add('disabled');
      btn.innerHTML='<svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:28px;height:28px;"><path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/><path stroke-linecap="round" stroke-linejoin="round" d="M9 9.563C9 9.252 9.252 9 9.563 9h4.874c.311 0 .563.252.563.563v4.874c0 .311-.252.563-.563.563H9.564A.562.562 0 0 1 9 14.437V9.564Z"/></svg>';
    } else {
      btn.innerHTML=dir==='left'
        ?'<svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:28px;height:28px;"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5"/></svg>'
        :'<svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:28px;height:28px;"><path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5"/></svg>';
      btn.setAttribute('data-tip', curLang==='KR'?(dir==='left'?'이전':'다음'):(dir==='left'?'Previous':'Next'));
      btn.setAttribute('data-original-tip', curLang==='KR'?(dir==='left'?'이전':'다음'):(dir==='left'?'Previous':'Next'));
      btn._navHandler = function(){
        if(AutoPlay.isActive()){
          if(dir==='left'){ AutoPlay.isPaused() ? AutoPlay.resumeAP() : AutoPlay.pauseAP(); }
          else { AutoPlay.stop(); }
          return;
        }
        window.goTo(resolveURL(sceneURL,url),{direction:dir==='right'?'next':'prev'});
      };
      btn.addEventListener('click', btn._navHandler);
      btn.addEventListener('touchend', btn._navHandler, {passive:false});
      btn.addEventListener('keydown', function(e){ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); btn._navHandler(); } });
    }
    return btn;
  }
  sq.append(makeArrow('left',scene.prevURL), makeArrow('right',scene.nextURL));
}

function _updateTOCCurrent(scene) {
  var sec = scene.tocSection || '';
  ['prologue','lovedream','lovesong','epilogue'].forEach(function(s) {
    var map = { prologue:'tocPrologue', lovedream:'tocLoveDream', lovesong:'tocLoveSong', epilogue:'tocEpilogue' };
    var el = $id(map[s]); if (!el) return;
    el.classList.toggle('toc-current', s===sec);
  });
}

function _renderScene(scene, sceneURL, transDir, onNavDone) {
  /* 1. 시작부 정리 */
  if (_fogRAF) { cancelAnimationFrame(_fogRAF); _fogRAF = null; }
  FogFX.stop();
  /* fog DOM 요소 제거 — canvas가 track 이동 시 reflow 유발 방지 */
  ['fogNoise','fogNoiseM'].forEach(function(id) {
    var el = document.getElementById(id); if (el) el.remove();
  });
  document.querySelectorAll('.fog-atmo,.fog-atmo2,.fog-tint-m,.fog-overlay-m,.overlay').forEach(function(el){ el.remove(); });
  /* fog img opacity transition 강제 중단 */
  var fogImg = document.querySelector('.photo-layer img, .photo-area img');
  if (fogImg) { fogImg.style.transition = 'none'; }
  TypingEngine.cancel(); /* 진행 중 타이핑 무효화 */
  /* 이전 stanza 산개 입자 강제 제거 */
  document.querySelectorAll('[data-stanza-p]').forEach(function(el){ el.remove(); });

  var app = $id('app'); if (!app) return;

  transDir = transDir || 'next';
  var imgSrc = resolveURL(sceneURL, scene.imgSrc);
  var isLSN  = scene.id && scene.id.indexOf('LSN') === 0;

  /* body class 초기화 → 재설정 */
  /* #93 — ui-text-only는 remove 금지: remove→add 사이 nav-btn 순간 노출 방지 */
  document.body.classList.remove('ui-mode-ready', 'ui-hide-all');
  document.body.classList.add('ui-text-only', 'ui-mode-ready');

  /* 전환 타입 + duration 결정
     우선순위: transition_config 프리뷰 설정 > scene.transition 필드 > 코드 기본값 */
  var previewCfg = null;
  try {
    var previewAll = window._MOL_PREVIEW_CONFIG;
    /* { desktop:{type,duration}, mobile:{type,duration} } 형태로 직접 주입된 경우 */
    if (previewAll && (previewAll.desktop || previewAll.mobile)) {
      previewCfg = previewAll[isMobile ? 'mobile' : 'desktop'] || null;
    }
  } catch(e) {}
  var sceneTransCfg = previewCfg || (scene.transition && scene.transition[isMobile ? 'mobile' : 'desktop']);
  var transType, transDuration;
  var BLINK_CFG = { closeMs:1200, openMs:1600, holdMs:300, gradArea:18,
                    closeEase:'cubic-bezier(0.4,0,1,1)', openEase:'linear' };
  if (transDir === 'none') {
    transType = 'none';
    transDuration = 0;
  } else if (!isLSN) {
    /* LPL/LDR — 항상 blink (sceneTransCfg 무시) */
    transType = 'blink';
    transDuration = BLINK_CFG;
  } else if (sceneTransCfg) {
    transType     = sceneTransCfg.type     || 'fadeBlack';
    transDuration = sceneTransCfg.duration !== undefined ? sceneTransCfg.duration : 2000;
  } else {
    transType = 'fadeBlack'; transDuration = 2000;
  }

  /* 현재 씬 루트 엘리먼트 (old) */
  var oldEl = app.firstElementChild || null;

  /* 2. 새 씬 DOM 생성 */
  var shell = buildSceneShell(scene);
  var photoContainer   = isMobile ? shell.photoArea   : shell.photoLayer;
  var controlContainer = isMobile ? shell.controlArea : shell.controlLayer;

  /* 3. photo-layer 채우기 + 타이핑/ripple 조율 */
  /* 일시적 주석 처리 — 추후 사용 예정: var isFog = (scene.id === 'LPL_01'); */
  var isFog = false;
  var transitionDone = false, rippleInited = false;
  var imgEl = null;

  function initRippleIfReady() {
    if (rippleInited || !imgEl || !transitionDone) return;
    rippleInited = true;
    _initRippleForScene(imgEl, photoContainer, scene);
  }

  /* #5 — 씬 실제 텍스트로 폰트 subset 미리 워밍업
     blink 전환(closeMs+openMs≈2800ms) 동안 subset fetch 완료 보장
     .then() 없이 호출 — 타이핑 시작은 _typeText 내부에서 별도 대기 */
  if (document.fonts && document.fonts.load) {
    var _warmStr = (curLang === 'KR' ? scene.textKR : scene.textEN) || '';
    document.fonts.load('24px "Nanum Pen Script"', _warmStr);
  }

  renderPhotoLayer(photoContainer, scene, imgSrc, function(img) {
    imgEl = img;
    initRippleIfReady();
    /* #84 — 전환 완료 후 이미지가 늦게 로드된 경우 여기서 타이핑 시작 */
    if (transitionDone) startTypingWhenReady();
  });

  /* 4. control-layer 채우기 */
  renderControlLayer(controlContainer, scene, sceneURL);

  /* 5. 타이핑 시작 함수 */
  function startTyping() {
    var ta = controlContainer.querySelector('.scene-text');
    if (!ta) return;
    if (!isMobile) {
      var screenEl = shell.screen;
      if (screenEl) screenEl.classList.add('show-text');
    }
    TypingEngine.startSceneTyping(ta, scene, sceneURL);
  }

  /* #84 — 이미지 페이드인 완료 후 타이핑 시작
     모바일: 페이드인 없음 → 바로 시작
     데스크탑: scene-img opacity transitionend 대기 (--scene-hq-fade: 2500ms)
               fallback으로 2600ms 후 강제 시작
     DOM 체크 + 토큰 체크로 씬 전환 후 이전 씬 타이핑 완전 차단
     typingStarted 플래그로 onTransitionDone/onReady 중복 호출 방지 */
  var typingStarted = false;
  function startTypingWhenReady() {
    if (typingStarted) return;
    typingStarted = true;
    if (isMobile || !imgEl) { startTyping(); return; }
    var _myToken = TypingEngine.getToken();
    var _done = false;
    function _guardedStart() {
      if (_done) return; _done = true;
      if (TypingEngine.getToken() !== _myToken) return;
      if (!document.body.contains(controlContainer)) return;
      startTyping();
    }
    var _fallback = setTimeout(_guardedStart, 2600);
    imgEl.addEventListener('transitionend', function handler(e) {
      if (e.propertyName !== 'opacity') return;
      clearTimeout(_fallback);
      imgEl.removeEventListener('transitionend', handler);
      _guardedStart();
    });
  }

  /* 6. 전환 완료 콜백 */
  var typingDelay = (transType === 'slide') ? Math.min(400, transDuration * 0.13 | 0) : 0;
  function onTransitionDone() {
    transitionDone = true;
    /* #96 — 전환 애니메이션 완료 시점에 _navigating 해제 */
    if (onNavDone) onNavDone();
    initRippleIfReady();
    if (AutoPlay.isActive()) AutoPlay.updateNavBar();
    if (!isMobile && shell.screen) shell.screen.classList.add('nav-ready');
    setTimeout(function() {
      if (imgEl) startTypingWhenReady();
    }, typingDelay);
  }

  /* 7. 전환 실행 */
  TransitionManager.transition(app, oldEl, shell, transType, transDir, transDuration, onTransitionDone);

  InputManager.bindScene(scene, sceneURL);
  _updateTOCCurrent(scene);

  try {
    if (sessionStorage.getItem('mol_autoplay_start') === '1') {
      sessionStorage.removeItem('mol_autoplay_start');
      AutoPlay.activate();
    }
  } catch(e) {}

  document.documentElement.style.setProperty('--vh100', window.innerHeight + 'px');
}

  /* 공개 API */
  return {
    renderScene:      _renderScene,
    updateTOCCurrent: _updateTOCCurrent
  };
})();


var TransitionManager = {
  _SLIDE_MS: 2000,

  transition: function(app, oldEl, newShell, type, transDir, duration, onDone) {
    if      (type === 'none')        TransitionManager._none(app, newShell, onDone);
    else if (type === 'fade')        TransitionManager._fade(app, newShell, duration, onDone);
    else if (type === 'slide')       TransitionManager._slide(app, oldEl, newShell, transDir, duration, onDone);
    else if (type === 'push')        TransitionManager._push(app, oldEl, newShell, transDir, duration, 'cubic-bezier(0.0,0.0,0.15,1)', onDone);
    else if (type === 'pushLinear')  TransitionManager._push(app, oldEl, newShell, transDir, duration, 'linear', onDone);
    else if (type === 'fadeBlack')   TransitionManager._fadeBlack(app, oldEl, newShell, duration, onDone);
    else if (type === 'mask')        TransitionManager._mask(app, oldEl, newShell, transDir, duration, onDone);
    else if (type === 'scale')       TransitionManager._scale(app, oldEl, newShell, duration, onDone);
    else if (type === 'parallax')    TransitionManager._parallax(app, oldEl, newShell, transDir, duration, onDone);
    else if (type === 'skew')        TransitionManager._skew(app, oldEl, newShell, transDir, duration, onDone);
    else if (type === 'blink')       TransitionManager._blink(app, newShell, duration, onDone);
    else                             TransitionManager._none(app, newShell, onDone);
  },

  _ensureLids: function(app) {
    if (isMobile) {
      /* 모바일: body에 position:fixed 오버레이 생성 (photo-area 밖 — iOS Safari GPU 합성 z-index 버그 우회)
         scaleY 방식이므로 overflow:hidden 불필요
         wrap은 최초 1회만 생성, 매 전환마다 getBoundingClientRect로 photo-area에 정렬 */
      var wrap = document.getElementById('_molLidWrap');
      if (!wrap) {
        wrap = document.createElement('div');
        wrap.id = '_molLidWrap';
        wrap.style.cssText = 'position:fixed;z-index:9000;pointer-events:none;overflow:hidden;';
        var mTop = document.createElement('div'); mTop.id = '_molLidTop';
        var mBot = document.createElement('div'); mBot.id = '_molLidBot';
        mTop.style.cssText = 'position:absolute;left:0;width:100%;height:50%;top:0;background:#000;transform:scaleY(0);transform-origin:top center;';
        mBot.style.cssText = 'position:absolute;left:0;width:100%;height:50%;bottom:0;background:#000;transform:scaleY(0);transform-origin:bottom center;';
        wrap.appendChild(mTop); wrap.appendChild(mBot);
        document.body.appendChild(wrap);
      }
      /* photo-area 위치/크기로 wrap 정렬 */
      var pa = app.querySelector('.photo-area');
      if (pa) {
        var r = pa.getBoundingClientRect();
        wrap.style.top    = r.top    + 'px';
        wrap.style.left   = r.left   + 'px';
        wrap.style.width  = r.width  + 'px';
        wrap.style.height = r.height + 'px';
      }
      return;
    }
    /* 데스크탑: body에 wrap 배치 (position:fixed, 정중앙 정렬, overflow:hidden) */
    if (document.getElementById('_molLidWrap')) return;
    var wrap = document.createElement('div');
    wrap.id = '_molLidWrap';
    wrap.style.cssText = 'position:fixed;top:50%;left:50%;' +
                         'transform:translate(-50%,-50%);' +
                         'width:min(100vw,var(--vh100,100vh));aspect-ratio:1/1;' +
                         'z-index:9000;pointer-events:none;overflow:hidden;';
    var top = document.createElement('div'); top.id = '_molLidTop';
    var bot = document.createElement('div'); bot.id = '_molLidBot';
    top.style.cssText = 'position:absolute;left:0;right:0;top:0;transform:translateY(-100%);';
    bot.style.cssText = 'position:absolute;left:0;right:0;bottom:0;transform:translateY(100%);';
    wrap.appendChild(top); wrap.appendChild(bot);
    document.body.appendChild(wrap);
  },

  _blink: function(app, newShell, cfg, onDone) {
    TransitionManager._ensureLids(app);
    var top = document.getElementById('_molLidTop');
    var bot = document.getElementById('_molLidBot');
    if (!top || !bot) { TransitionManager._none(app, newShell, onDone); return; }
    var closeMs   = cfg.closeMs   || 1200;
    var openMs    = cfg.openMs    || 1600;
    var holdMs    = cfg.holdMs    || 300;
    var gradArea  = cfg.gradArea  || 0;
    var closeEase = cfg.closeEase || 'ease-in';
    var openEase  = cfg.openEase  || 'linear';
    var color     = '#000000';

    /* 높이/위치 설정
       모바일: _ensureLids에서 position:fixed 오버레이로 photo-area에 정렬 완료
               lid는 photo-area 밖에 있으므로 iOS Safari GPU 합성 z-index 버그 무관
       데스크탑: wrap 기준 % 단위 유지 */
    if (isMobile) {
      /* scaleY 방식 — wrap이 photo-area에 정렬되어 있으므로 overflow 불필요
         top lid: transform-origin top    → scaleY(0→1) = 위에서 아래로 닫힘
         bot lid: transform-origin bottom → scaleY(0→1) = 아래에서 위로 닫힘 */
      top.style.transition = 'none'; bot.style.transition = 'none';
      top.style.transform  = 'scaleY(0)'; bot.style.transform = 'scaleY(0)';
    } else {
      var extH = (50 + gradArea) + '%';
      top.style.height = extH; bot.style.height = extH;
      top.style.top    = '-' + gradArea + '%';
      bot.style.bottom = '-' + gradArea + '%';
      if (gradArea > 0) {
        var gradPct = (gradArea / (50 + gradArea) * 100).toFixed(1) + '%';
        top.style.background = 'linear-gradient(to bottom,rgba(0,0,0,0) 0%,#000 ' + gradPct + ',#000 100%)';
        bot.style.background = 'linear-gradient(to top,   rgba(0,0,0,0) 0%,#000 ' + gradPct + ',#000 100%)';
      } else {
        top.style.background = color;
        bot.style.background = color;
      }
      top.style.transition = 'none'; bot.style.transition = 'none';
      top.style.transform  = 'translateY(-100%)'; bot.style.transform = 'translateY(100%)';
    }

    /* 눈 감기 */
    requestAnimationFrame(function() { requestAnimationFrame(function() {
      top.style.transition = 'transform ' + closeMs + 'ms ' + closeEase;
      bot.style.transition = 'transform ' + closeMs + 'ms ' + closeEase;
      top.style.transform  = isMobile ? 'scaleY(1)' : 'translateY(0%)';
      bot.style.transform  = isMobile ? 'scaleY(1)' : 'translateY(0%)';

      setTimeout(function() {
        /* 씬 교체 */
        TransitionManager._mountNew(app, newShell);

        /* holdMs 대기 + 이미지 로드 완료, 둘 다 충족 후 눈 뜨기
           모바일: lid는 body의 _molLidWrap에 고정 — _mountNew 후 재참조 불필요 */
        var holdDone = false, imgDone = false;
        function tryOpen() {
          if (!holdDone || !imgDone) return;
          /* iOS Safari: transition:none → transform 변경 직후 transition 재활성화 시
             이전 상태가 확정되지 않아 애니메이션이 발화하지 않는 버그 대응.
             double rAF로 브라우저가 scaleY(1) 상태를 실제 paint한 뒤 transition 시작 */
          requestAnimationFrame(function() { requestAnimationFrame(function() {
            top.style.transition = 'transform ' + openMs + 'ms ' + openEase;
            bot.style.transition = 'transform ' + openMs + 'ms ' + openEase;
            top.style.transform  = isMobile ? 'scaleY(0)' : 'translateY(-100%)';
            bot.style.transform  = isMobile ? 'scaleY(0)' : 'translateY(100%)';
            setTimeout(function() {
              if (onDone) onDone();
            }, openMs);
          }); });
        }
        setTimeout(function() { holdDone = true; tryOpen(); }, holdMs);
        var img = app.querySelector('img');
        if (!img || img.complete) {
          imgDone = true;
        } else {
          img.addEventListener('load',  function() { imgDone = true; tryOpen(); }, {once:true});
          img.addEventListener('error', function() { imgDone = true; tryOpen(); }, {once:true});
        }
      }, closeMs);
    }); });
  },

  _mountNew: function(app, newShell) {
    if (isMobile) {
      /* lid는 buildSceneShell에서 photo-area 안에 이미 생성됨 */
      app.innerHTML = '';
      app.appendChild(newShell.photoArea);
      app.appendChild(newShell.controlArea);
    } else {
      app.innerHTML = '';
      app.appendChild(newShell.screen);
    }
  },

  /* 즉시 전환 — direct 이동, URL 직접 진입 */
  _none: function(app, newShell, onDone) {
    TransitionManager._mountNew(app, newShell);
    if (onDone) onDone();
  },

  /* 모바일 fade */
  _fade: function(app, newShell, duration, onDone) {
    var FADE_MS = (duration !== undefined) ? duration : 2000;
    var newPhotoArea = newShell.photoArea;
    var newCtrlArea  = newShell.controlArea;
    var newScreen    = newShell.screen;

    app.innerHTML = '';

    if (newPhotoArea) {
      /* 모바일 */
      newPhotoArea.style.opacity = '0';
      app.appendChild(newPhotoArea);
      requestAnimationFrame(function(){ requestAnimationFrame(function(){
        newPhotoArea.style.transition = 'opacity ' + FADE_MS + 'ms ease';
        newPhotoArea.style.opacity = '1';
      }); });
      if (newCtrlArea) app.appendChild(newCtrlArea);
      setTimeout(function(){
        newPhotoArea.style.transition = ''; newPhotoArea.style.opacity = '';
        if (onDone) onDone();
      }, FADE_MS);
    } else if (newScreen) {
      /* 데스크탑 */
      newScreen.style.opacity = '0';
      app.appendChild(newScreen);
      
      requestAnimationFrame(function(){ requestAnimationFrame(function(){
        newScreen.style.transition = 'opacity ' + FADE_MS + 'ms ease';
        newScreen.style.opacity = '1';
      }); });
      setTimeout(function(){
        newScreen.style.transition = ''; newScreen.style.opacity = '';
        newScreen.classList.add('hq-show');
        if (onDone) onDone();
      }, FADE_MS);
    }
  },

  /* 데스크탑 stacking slide + 모바일 photo-area slide (#88) */
  _slide: function(app, oldScreen, newShell, transDir, duration, onDone) {
    var SLIDE_MS = (duration !== undefined) ? duration : TransitionManager._SLIDE_MS;

    /* ── 모바일 ── */
    if (isMobile) {
      var newPhotoArea = newShell.photoArea;
      var newCtrlArea  = newShell.controlArea;
      var oldPhotoArea = app.querySelector('.photo-area');
      var oldCtrlArea  = app.querySelector('.control-area');

      if (!oldPhotoArea) { TransitionManager._none(app, newShell, onDone); return; }

      /* 구 씬 ripple/canvas 요소 제거 — 전환 중 겹침 방지 */
      oldPhotoArea.querySelectorAll('canvas,[data-ripple-canvas],[data-ripple-el],[data-ripple-el-prague]').forEach(function(el){ el.remove(); });
      document.querySelectorAll('[data-ripple-svg],[data-ripple-svg-prague]').forEach(function(el){ el.remove(); });

      /* clip 래퍼: photo-area 크기와 동일, overflow:hidden으로 클리핑
         control-area는 래퍼 밖에 그대로 유지 — 검정 화면 없음 */
      var rect = oldPhotoArea.getBoundingClientRect();
      var clip = document.createElement('div');
      clip.style.cssText = 'position:relative;width:' + rect.width + 'px;height:' + rect.height + 'px;overflow:hidden;flex-shrink:0;';

      /* old/new photo-area를 clip 안에 absolute로 나란히 */
      var xIn  = transDir === 'next' ? '100%' : '-100%';
      oldPhotoArea.style.cssText += ';position:absolute;top:0;left:0;width:' + rect.width + 'px;height:' + rect.height + 'px;aspect-ratio:unset;';
      newPhotoArea.style.cssText += ';position:absolute;top:0;left:0;width:' + rect.width + 'px;height:' + rect.height + 'px;aspect-ratio:unset;transform:translateX(' + xIn + ');';

      clip.appendChild(oldPhotoArea);
      clip.appendChild(newPhotoArea);

      /* app: clip + 새 control-area 즉시 표시 (#92 — 구 씬 텍스트 잔존 방지)
         newCtrlArea 배경 inline 명시: CSS 클래스 적용 전 순간 #000 노출 방지
         #93 — updateNavBar는 append 후 호출: DOM에 붙기 전 호출 시 효과 없음 */
      newCtrlArea.style.background = '#333';
      app.innerHTML = '';
      app.appendChild(clip);
      app.appendChild(newCtrlArea);
      if (AutoPlay.isActive()) AutoPlay.updateNavBar();

      void newPhotoArea.offsetHeight;
      newPhotoArea.style.transition = 'transform ' + SLIDE_MS + 'ms cubic-bezier(0.0,0.0,0.2,1)';
      newPhotoArea.style.transform  = 'translateX(0)';

      var _mobDone = false;
      function _mobFinish() {
        if (_mobDone) return; _mobDone = true;
        requestAnimationFrame(function() {
          ['position','top','left','width','height','aspectRatio','transition','transform'].forEach(function(p){
            newPhotoArea.style[p] = '';
          });
          app.innerHTML = '';
          app.appendChild(newPhotoArea);
          app.appendChild(newCtrlArea);
          if (onDone) onDone();
        });
      }
      newPhotoArea.addEventListener('transitionend', function handler(e) {
        if (e.propertyName !== 'transform') return;
        newPhotoArea.removeEventListener('transitionend', handler);
        _mobFinish();
      });
      setTimeout(_mobFinish, SLIDE_MS + 100); /* fallback */
      return;
    }

    /* ── 데스크탑 ── */
    var newScreen   = newShell.screen;
    var newPhotoLyr = newShell.photoLayer;
    var newCtrlLyr  = newShell.controlLayer;
    var newSq       = newShell.sq;

    var oldSq       = oldScreen ? oldScreen.querySelector('.square-frame') : null;
    var oldPhotoLyr = oldSq ? oldSq.querySelector('.photo-layer') : null;
    var oldCtrlLyr  = oldSq ? oldSq.querySelector('.control-layer') : null;

    if (!oldSq || !oldPhotoLyr) {
      TransitionManager._none(app, newShell, onDone);
      return;
    }

    /* 구 control-layer 즉시 숨김 */
    if (oldCtrlLyr) { oldCtrlLyr.style.transition = 'none'; oldCtrlLyr.style.opacity = '0'; }

    /* nav-btn 은 old photo-layer 슬라이드 밖으로 유지 (oldSq 직속) */
    var navBtns = [];
    Array.prototype.forEach.call(oldSq.querySelectorAll('.nav-btn'), function(el){ navBtns.push(el); });

    var xIn = transDir === 'next' ? '100%' : '-100%';
    var oldTrack = document.createElement('div');
    oldTrack.style.cssText = 'position:absolute;inset:0;z-index:1;overflow:hidden;';
    var newTrack = document.createElement('div');
    newTrack.style.cssText = 'position:absolute;inset:0;z-index:2;transform:translateX(' + xIn + ');overflow:hidden;';

    /* 구 ripple 요소 정리 — 슬라이드 중 RAF 루프 부하 방지 (모바일과 동일) */
    oldPhotoLyr.querySelectorAll('canvas,[data-ripple-canvas],[data-ripple-el],[data-ripple-el-prague]').forEach(function(el){ el.remove(); });
    document.querySelectorAll('[data-ripple-svg],[data-ripple-svg-prague]').forEach(function(el){ el.remove(); });

    /* 구 photo-layer 내용 → oldTrack */
    while (oldPhotoLyr.firstChild) { oldTrack.appendChild(oldPhotoLyr.firstChild); }
    /* 신 photo-layer 내용 → newTrack */
    while (newPhotoLyr.firstChild) { newTrack.appendChild(newPhotoLyr.firstChild); }

    oldPhotoLyr.appendChild(oldTrack);
    oldPhotoLyr.appendChild(newTrack);
    /* nav-btn 은 다시 oldSq 직속으로 */
    navBtns.forEach(function(el){ oldSq.appendChild(el); });

    void newTrack.offsetHeight;
    newTrack.style.transition = 'transform ' + SLIDE_MS + 'ms cubic-bezier(0.0,0.0,0.2,1)';
    newTrack.style.transform  = 'translateX(0)';

    var _dtopDone = false;
    function _dtopFinish() {
      if (_dtopDone) return; _dtopDone = true;
      requestAnimationFrame(function() {
        while (newTrack.firstChild) { newPhotoLyr.appendChild(newTrack.firstChild); }
        if (newCtrlLyr && newCtrlLyr.parentNode !== newSq) newSq.appendChild(newCtrlLyr);
        app.innerHTML = '';
        app.appendChild(newScreen);
        newScreen.classList.add('hq-show');
        if (onDone) onDone();
      });
    }
    newTrack.addEventListener('transitionend', function handler(e) {
      if (e.propertyName !== 'transform') return;
      newTrack.removeEventListener('transitionend', handler);
      _dtopFinish();
    });
    setTimeout(_dtopFinish, SLIDE_MS + 100); /* fallback */
  },

  /* Sliding Mask — clip-path 로 새 씬이 밀려들어옴 */
  _mask: function(app, oldScreen, newShell, transDir, duration, onDone) {
    var MS = (duration !== undefined) ? duration : 2000;
    var newScreen   = newShell.screen;
    var newPhotoLyr = newShell.photoLayer;
    var newCtrlLyr  = newShell.controlLayer;
    var newSq       = newShell.sq;

    var oldSq      = oldScreen ? oldScreen.querySelector('.square-frame') : null;
    var oldCtrlLyr = oldSq ? oldSq.querySelector('.control-layer') : null;

    if (!oldSq) { TransitionManager._none(app, newShell, onDone); return; }

    if (oldCtrlLyr) { oldCtrlLyr.style.transition = 'none'; oldCtrlLyr.style.opacity = '0'; }

    /* 새 photo-layer를 old photo-layer 위에 겹쳐 clip-path 애니메이션 */
    newPhotoLyr.style.cssText += ';position:absolute;inset:0;z-index:3;clip-path:inset(0 100% 0 0);overflow:hidden;';
    oldSq.appendChild(newPhotoLyr);
    if (newCtrlLyr) { newCtrlLyr.style.opacity = '0'; oldSq.appendChild(newCtrlLyr); }

    void newPhotoLyr.offsetHeight;
    newPhotoLyr.style.transition = 'clip-path ' + MS + 'ms cubic-bezier(0.0,0.0,0.15,1)';
    newPhotoLyr.style.clipPath   = 'inset(0 0% 0 0)';

    setTimeout(function(){
      newPhotoLyr.style.transition = '';
      newPhotoLyr.style.clipPath   = '';
      newPhotoLyr.style.position   = '';
      newPhotoLyr.style.zIndex     = '';
      newSq.appendChild(newPhotoLyr);
      if (newCtrlLyr) { newCtrlLyr.style.opacity = ''; newSq.appendChild(newCtrlLyr); }
      app.innerHTML = '';
      app.appendChild(newScreen);
      newScreen.classList.add('hq-show');
      if (onDone) onDone();
    }, MS);
  },

  /* Scale — 새 씬이 작게 나타나서 커지며 진입 */
  _scale: function(app, oldEl, newShell, duration, onDone) {
    var MS = (duration !== undefined) ? duration : 2000;
    var newScreen  = newShell.screen;
    var newCtrlLyr = newShell.controlLayer;

    if (newCtrlLyr) { newCtrlLyr.style.opacity = '0'; }

    newScreen.style.cssText += ';transform:scale(0.55);opacity:0;';
    app.innerHTML = '';
    app.appendChild(newScreen);
    

    void newScreen.offsetHeight;
    newScreen.style.transition = 'transform ' + MS + 'ms cubic-bezier(0.0,0.0,0.2,1), opacity ' + Math.round(MS * 0.5) + 'ms ease';
    newScreen.style.transform  = 'scale(1)';
    newScreen.style.opacity    = '1';

    setTimeout(function(){
      newScreen.style.transition = '';
      newScreen.style.transform  = '';
      newScreen.style.opacity    = '';
      if (newCtrlLyr) newCtrlLyr.style.opacity = '';
      newScreen.classList.add('hq-show');
      if (onDone) onDone();
    }, MS);
  },

  /* Parallax — 구 씬은 느리게 나가고 새 씬은 빠르게 들어옴 */
  _parallax: function(app, oldScreen, newShell, transDir, duration, onDone) {
    var MS = (duration !== undefined) ? duration : 2000;
    var newScreen   = newShell.screen;
    var newPhotoLyr = newShell.photoLayer;
    var newCtrlLyr  = newShell.controlLayer;
    var newSq       = newShell.sq;

    var oldSq      = oldScreen ? oldScreen.querySelector('.square-frame') : null;
    var oldPhotoLyr = oldSq ? oldSq.querySelector('.photo-layer') : null;
    var oldCtrlLyr  = oldSq ? oldSq.querySelector('.control-layer') : null;

    if (!oldSq || !oldPhotoLyr) { TransitionManager._none(app, newShell, onDone); return; }

    if (oldCtrlLyr) { oldCtrlLyr.style.transition = 'none'; oldCtrlLyr.style.opacity = '0'; }

    var xIn  = transDir === 'next' ? '100%' : '-100%';
    var xOut = transDir === 'next' ? '-35%' : '35%';

    /* 새 photo-layer 겹치기 */
    newPhotoLyr.style.cssText += ';position:absolute;inset:0;z-index:3;transform:translateX(' + xIn + ');overflow:hidden;';
    oldSq.appendChild(newPhotoLyr);
    if (newCtrlLyr) { newCtrlLyr.style.opacity = '0'; oldSq.appendChild(newCtrlLyr); }

    void newPhotoLyr.offsetHeight;
    var easing = 'cubic-bezier(0.0,0.0,0.2,1)';
    oldPhotoLyr.style.transition = 'transform ' + MS + 'ms ' + easing;
    newPhotoLyr.style.transition = 'transform ' + MS + 'ms ' + easing;
    oldPhotoLyr.style.transform  = 'translateX(' + xOut + ')';
    newPhotoLyr.style.transform  = 'translateX(0)';

    setTimeout(function(){
      oldPhotoLyr.style.transition = '';
      oldPhotoLyr.style.transform  = '';
      newPhotoLyr.style.transition = '';
      newPhotoLyr.style.transform  = '';
      newPhotoLyr.style.position   = '';
      newPhotoLyr.style.zIndex     = '';
      newSq.appendChild(newPhotoLyr);
      if (newCtrlLyr) { newCtrlLyr.style.opacity = ''; newSq.appendChild(newCtrlLyr); }
      app.innerHTML = '';
      app.appendChild(newScreen);
      newScreen.classList.add('hq-show');
      if (onDone) onDone();
    }, MS);
  },

  /* Push — 구/신 씬 동시 슬라이드 (easing 파라미터로 linear/ease-out 분기) */
  _push: function(app, oldScreen, newShell, transDir, duration, easing, onDone) {
    var MS = (duration !== undefined) ? duration : 2000;
    var newScreen   = newShell.screen;
    var newPhotoLyr = newShell.photoLayer;
    var newCtrlLyr  = newShell.controlLayer;
    var newSq       = newShell.sq;

    var oldSq      = oldScreen ? oldScreen.querySelector('.square-frame') : null;
    var oldPhotoLyr = oldSq ? oldSq.querySelector('.photo-layer') : null;
    var oldCtrlLyr  = oldSq ? oldSq.querySelector('.control-layer') : null;

    if (!oldSq || !oldPhotoLyr) { TransitionManager._none(app, newShell, onDone); return; }
    if (oldCtrlLyr) { oldCtrlLyr.style.transition = 'none'; oldCtrlLyr.style.opacity = '0'; }

    var xIn  = transDir === 'next' ? '100%' : '-100%';
    var xOut = transDir === 'next' ? '-100%' : '100%';

    newPhotoLyr.style.cssText += ';position:absolute;inset:0;z-index:3;transform:translateX(' + xIn + ');overflow:hidden;';
    oldSq.appendChild(newPhotoLyr);
    if (newCtrlLyr) { newCtrlLyr.style.opacity = '0'; oldSq.appendChild(newCtrlLyr); }

    void newPhotoLyr.offsetHeight;
    var tr = 'transform ' + MS + 'ms ' + easing;
    oldPhotoLyr.style.transition = tr;
    newPhotoLyr.style.transition = tr;
    oldPhotoLyr.style.transform  = 'translateX(' + xOut + ')';
    newPhotoLyr.style.transform  = 'translateX(0)';

    setTimeout(function(){
      oldPhotoLyr.style.transition = ''; oldPhotoLyr.style.transform = '';
      newPhotoLyr.style.transition = ''; newPhotoLyr.style.transform = '';
      newPhotoLyr.style.position   = ''; newPhotoLyr.style.zIndex    = '';
      newSq.appendChild(newPhotoLyr);
      if (newCtrlLyr) { newCtrlLyr.style.opacity = ''; newSq.appendChild(newCtrlLyr); }
      app.innerHTML = '';
      app.appendChild(newScreen);
      newScreen.classList.add('hq-show');
      if (onDone) onDone();
    }, MS);
  },

  /* Skew — 슬라이드 + 기울기 효과 */
  _skew: function(app, oldScreen, newShell, transDir, duration, onDone) {
    var MS = (duration !== undefined) ? duration : 2000;
    var newScreen   = newShell.screen;
    var newPhotoLyr = newShell.photoLayer;
    var newCtrlLyr  = newShell.controlLayer;
    var newSq       = newShell.sq;

    var oldSq      = oldScreen ? oldScreen.querySelector('.square-frame') : null;
    var oldPhotoLyr = oldSq ? oldSq.querySelector('.photo-layer') : null;
    var oldCtrlLyr  = oldSq ? oldSq.querySelector('.control-layer') : null;

    if (!oldSq || !oldPhotoLyr) { TransitionManager._none(app, newShell, onDone); return; }
    if (oldCtrlLyr) { oldCtrlLyr.style.transition = 'none'; oldCtrlLyr.style.opacity = '0'; }

    var xIn    = transDir === 'next' ? '110%' : '-110%';
    var xOut   = transDir === 'next' ? '-110%' : '110%';
    var skewIn = transDir === 'next' ? '-8deg' : '8deg';
    var skewOut= transDir === 'next' ? '8deg' : '-8deg';

    newPhotoLyr.style.cssText += ';position:absolute;inset:0;z-index:3;transform:translateX(' + xIn + ') skewX(' + skewIn + ');overflow:hidden;';
    oldSq.appendChild(newPhotoLyr);
    if (newCtrlLyr) { newCtrlLyr.style.opacity = '0'; oldSq.appendChild(newCtrlLyr); }

    void newPhotoLyr.offsetHeight;
    var tr = 'transform ' + MS + 'ms cubic-bezier(0.0,0.0,0.2,1)';
    oldPhotoLyr.style.transition = tr;
    newPhotoLyr.style.transition = tr;
    oldPhotoLyr.style.transform  = 'translateX(' + xOut + ') skewX(' + skewOut + ')';
    newPhotoLyr.style.transform  = 'translateX(0) skewX(0deg)';

    setTimeout(function(){
      oldPhotoLyr.style.transition = ''; oldPhotoLyr.style.transform = '';
      newPhotoLyr.style.transition = ''; newPhotoLyr.style.transform = '';
      newPhotoLyr.style.position   = ''; newPhotoLyr.style.zIndex    = '';
      newSq.appendChild(newPhotoLyr);
      if (newCtrlLyr) { newCtrlLyr.style.opacity = ''; newSq.appendChild(newCtrlLyr); }
      app.innerHTML = '';
      app.appendChild(newScreen);
      newScreen.classList.add('hq-show');
      if (onDone) onDone();
    }, MS);
  },

  /* LSN Fade to Black — fade-in → 씬 교체 → fade-out */
  _fadeBlack: function(app, oldEl, newShell, duration, onDone) {
    var FADE_IN_MS  = (duration !== undefined) ? duration : 2000;
    var FADE_OUT_MS = Math.round(FADE_IN_MS * 2);
    var container = isMobile
      ? app.querySelector('.photo-area')
      : (app.querySelector('.square-frame') || app.firstElementChild);

    var overlay = document.createElement('div');
    overlay.style.cssText = 'position:absolute;inset:0;background:#000;opacity:0;z-index:9999;pointer-events:none;transition:opacity ' + FADE_IN_MS + 'ms ease;';
    if (container) container.appendChild(overlay);

    requestAnimationFrame(function(){ requestAnimationFrame(function(){
      overlay.style.opacity = '1';
      setTimeout(function(){
        TransitionManager._mountNew(app, newShell);
        var newContainer = isMobile
          ? app.querySelector('.photo-area')
          : (app.querySelector('.square-frame') || app.firstElementChild);
        if (newContainer) {
          overlay.style.transition = 'none';
          overlay.style.opacity = '1';
          newContainer.appendChild(overlay);
          requestAnimationFrame(function(){ requestAnimationFrame(function(){
            overlay.style.transition = 'opacity ' + FADE_OUT_MS + 'ms ease';
            overlay.style.opacity = '0';
            setTimeout(function(){ if (overlay.parentNode) overlay.parentNode.removeChild(overlay); }, FADE_OUT_MS);
          }); });
        }
        if (onDone) onDone();
      }, FADE_IN_MS);
    }); });
  }
};


/* ============================================================
   P. TypingEngine — 타이핑 효과 + 커서 + 토큰 관리
   공개 API:
     TypingEngine.cancel()                         — 진행 중 타이핑 중단 (씬 전환 시)
     TypingEngine.startSceneTyping(el, scene, url) — 씬 타이핑 진입점
   ============================================================ */
var TypingEngine = (function() {
  var _token = 0; /* 씬 전환마다 증가 — 구 타이핑 루프 자동 종료 */

  /* 내부: 타이핑 효과 + 커서
     el: .scene-text DOM, text: 표시할 문자열, onComplete: 완료 콜백 */
  function _typeText(el, text, onComplete) {
    if (!el || !text) { if (onComplete) onComplete(); return; }
    el.textContent = '';
    /* 씬 전환 시 _token이 증가하므로 구 토큰을 캡처해 두고
       next() 진입 시 비교 — 불일치하면 이전 씬의 타이핑이므로 조용히 종료 */
    var myToken = _token;
    /* flex 컨테이너(.scene-text) 안에서 커서 위치를 정확히 유지하기 위해 wrapper span 사용.
       텍스트 노드 + br + 커서 span을 하나의 flex item으로 묶어
       커서가 별도 flex item이 되지 않도록 함 */
    var wrap = document.createElement('span');
    wrap.className = 'type-wrap';
    el.appendChild(wrap);
    var cursor = document.createElement('span');
    cursor.className = 'type-cursor';
    wrap.appendChild(cursor);

    function startTyping() {
      var i = 0;
      function next() {
        if (_token !== myToken) { cursor.remove(); return; } /* 씬 전환됨 — 중단 */
        if (i < text.length) {
          if (text[i] === '\n') {
            wrap.insertBefore(document.createElement('br'), cursor);
          } else {
            wrap.insertBefore(document.createTextNode(text[i]), cursor);
          }
          i++;
          setTimeout(next, 90 + Math.random() * 110);
        } else {
          /* 타이핑 완료 — 씬 전환됐으면 콜백 차단 */
          if (_token !== myToken) { cursor.remove(); return; }
          if (onComplete) onComplete();
        }
      }
      setTimeout(next, 150);
    }
    /* 폰트 실제 글자 미리 로딩 후 타이핑 시작
       fonts.ready는 파싱 완료만 보장 — 특정 글자 첫 렌더 시 폰트 교체 현상 방지를 위해
       실제 사용 글자셋으로 fonts.load() 명시 호출 */
    var _fontTestStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz' +
                       '0123456789가나다라마바사아자차카타파하거너더러머버서어저처커터퍼허' +
                       '고노도로모보소오조초코토포호구누두루무부수우주추쿠투푸후' +
                       '그느드르므브스으즈츠크트프흐기니디리미비시이지치키티피히' +
                       '.,!?…\'" ';
    if (document.fonts && document.fonts.load) {
      document.fonts.load('24px "Nanum Pen Script"', _fontTestStr).then(startTyping).catch(startTyping);
    } else {
      startTyping();
    }
  }

  /* 공개 API */

  /* 씬 전환 시 호출 — 진행 중 타이핑 루프 무효화 */
  function cancel() {
    _token++;
  }

  function getToken() { return _token; }

  /* 씬 텍스트 타이핑 공통 진입점
     show 클래스 추가 + 타이핑 시작 + AutoPlay.onTypingDone 연결
     fog/photo, 모바일/데스크탑, 슬라이드 완료 후 — 모두 여기서 시작 */
  function startSceneTyping(el, scene, sceneURL) {
    if (!el) return;
    el.classList.add('show');
    _typeText(el, curLang === 'KR' ? scene.textKR : scene.textEN, function() {
      /* 씬 전환 후 이전 씬 콜백 차단 */
      if (NavigationManager.currentSceneURL() !== sceneURL) return;
      /* fog씬(LPL_01) + 수동모드일 때만 타이핑 완료 후 fog 시작 */
      if (scene.id === 'LPL_01' && !AutoPlay.isActive()) FogFX.start();
      /* 오토모드: 타이핑 완료 시점에 next 이미지 즉시 프리로드 */
      if (AutoPlay.isActive() && scene.nextURL) {
        var nextURL = resolveURL(sceneURL, scene.nextURL);
        var nextKey = nextURL.split('?')[0];
        var nextScene = NavigationManager.getCachedScene(nextKey);
        if (nextScene && nextScene.imgSrc) {
          NavigationManager.preloadImg(nextKey, resolveURL(nextURL, nextScene.imgSrc));
        }
      }
      AutoPlay.onTypingDone(scene, sceneURL);
    });
  }

  return { cancel: cancel, startSceneTyping: startSceneTyping, getToken: getToken };
})();

/* ============================================================
   K-4. renderControlLayer — control 레이어 채우기
   데스크탑: .control-layer 에 nav 버튼 + scene-text 삽입
   모바일  : .control-area 에 텍스트/버튼 삽입
/* ============================================================
   T. InputManager — 입력 이벤트 + 오버레이 헬퍼
   공개 API:
     InputManager.initOnce()               — 최초 1회 peek 리스너 등록 (bindCommonEvents에서 호출)
     InputManager.bindScene(scene, url)    — 씬 전환 시 onkeydown/onwheel 갱신
     InputManager.isOverlayOpen()          — 오버레이 열림 여부
     InputManager.closeTopOverlay()        — 최상단 오버레이 닫기
     InputManager.closeOverlay(el)         — 특정 오버레이 닫기
   ============================================================ */
var InputManager = (function() {
  var _peekTimer = null;

  /* solo-peek: 마우스/터치 시 nav 버튼 2초 표시 — 전체 생애주기 1회만 등록 */
  function _initPeekListeners() {
    var showPeek = function() {
      document.body.classList.add('solo-peek');
      clearTimeout(_peekTimer);
      _peekTimer = setTimeout(function(){ document.body.classList.remove('solo-peek'); }, 2000);
    };
    if (!isMobile) {
      document.addEventListener('mousemove', showPeek);
      document.addEventListener('click',     showPeek);
    } else {
      document.addEventListener('touchstart', showPeek, {passive: true});
    }
  }

  function _isOverlayOpen() {
    return ['tocOverlay','thumbOverlay','sceneListOverlay','aboutOverlay','poemOverlay','helpOverlay','introOverlay','gbOverlay']
      .some(function(id){ var el=$id(id); return el && el.classList.contains('on'); });
  }

  function _closeOverlay(el) {
    el.classList.remove('on'); el.setAttribute('aria-hidden','true');
    setTimeout(function(){ el.style.display='none'; }, 420);
  }

  function _closeTopOverlay() {
    ['introOverlay','helpOverlay','poemOverlay','aboutOverlay','gbOverlay','thumbOverlay','sceneListOverlay','tocOverlay']
      .find(function(id){ var el=$id(id); if(el&&el.classList.contains('on')){ _closeOverlay(el); return true; } return false; });
  }

  /* 씬 전환 시 호출 — onkeydown / onwheel 씬 참조 갱신 */
  function _bindScene(scene, sceneURL) {
    document.onkeydown = function(e) {
      if (e.repeat) return; /* 키 반복 이벤트 무시 */
      if (_isOverlayOpen()) {
        if(e.key==='Escape') { _closeTopOverlay(); e.preventDefault(); }
        return;
      }
      if(e.key==='m'||e.key==='M'){ e.preventDefault(); TOCManager.open(); return; }
      if(e.key==='g'||e.key==='G'){ e.preventDefault(); GuestbookManager.open(); return; }
      if(e.key==='h'||e.key==='H'){ e.preventDefault(); HelpManager.open(); return; }
      if(e.key==='p'||e.key==='P'){ e.preventDefault(); AboutManager.open(); return; }
      /* 오토모드 전용 키보드 처리 */
      if(AutoPlay.isActive()){
        if(e.key===' '){ e.preventDefault(); AutoPlay.isPaused() ? AutoPlay.resumeAP() : AutoPlay.pauseAP(); return; }
        if(e.key==='Escape'){ e.preventDefault(); AutoPlay.stop(); return; }
        if(e.key==='ArrowRight'||e.key==='ArrowDown'||e.key==='Enter'||e.key==='ArrowLeft'||e.key==='ArrowUp'){ e.preventDefault(); return; }
      }
      if(e.key==='ArrowRight'||e.key==='ArrowDown'||e.key==='Enter'){
        e.preventDefault();
        if(scene.nextURL) window.goTo(resolveURL(sceneURL,scene.nextURL),{direction:'next',forceNav:true});
      } else if(e.key==='ArrowLeft'||e.key==='ArrowUp'){
        e.preventDefault();
        if(scene.prevURL) window.goTo(resolveURL(sceneURL,scene.prevURL),{direction:'prev',forceNav:true});
      }
    };

    if (!isMobile) {
      var wheelTimer = null;
      document.onwheel = function(e) {
        if(e.ctrlKey||_isOverlayOpen()) return;
        clearTimeout(wheelTimer);
        wheelTimer = setTimeout(function(){
          var dx=e.deltaX, dy=e.deltaY;
          if(Math.abs(dx)>=Math.abs(dy)){ if(dx>30&&scene.nextURL) window.goTo(resolveURL(sceneURL,scene.nextURL),{direction:'next'}); else if(dx<-30&&scene.prevURL) window.goTo(resolveURL(sceneURL,scene.prevURL),{direction:'prev'}); }
          else { if(dy>30&&scene.nextURL) window.goTo(resolveURL(sceneURL,scene.nextURL),{direction:'next'}); else if(dy<-30&&scene.prevURL) window.goTo(resolveURL(sceneURL,scene.prevURL),{direction:'prev'}); }
        }, 50);
      };
    }
  }

  /* 공개 API */
  return {
    initOnce:        _initPeekListeners,
    bindScene:       _bindScene,
    isOverlayOpen:   _isOverlayOpen,
    closeTopOverlay: _closeTopOverlay,
    closeOverlay:    _closeOverlay
  };
})();

/* ============================================================
   U. OVERLAY MANAGERS
   ============================================================ */
var TOCManager = {
  open: function() {
    if(AutoPlay.isActive()) AutoPlay.pauseAP();
    history.pushState({overlay:'toc'},'');
    var ov=$id('tocOverlay'); if(!ov) return;
    ov.style.display='flex'; ov.setAttribute('aria-hidden','false');
    requestAnimationFrame(function(){ requestAnimationFrame(function(){ ov.classList.add('on'); }); });
    if (!isMobile) { _buildThumbGrid(); scrollToCurrent($id('thumbGrid'),'.thumb-current'); }
    else { _buildMobThumbGrid(); scrollToCurrent($id('mobThumbGrid'),'.thumb-current'); }
    SceneRenderer.updateTOCCurrent(NavigationManager.currentScene()||{});
    /* 모바일 모드 스위치 상태 갱신 (DOM 조작만, AutoPlay 함수 호출 없음) */
    if (isMobile) {
      var sw = $id('tocModeSwitch');
      if (sw) {
        var knob = sw.querySelector('.mob-sw-knob');
        var isActive = AutoPlay.isActive();
        isActive ? sw.classList.remove('on') : sw.classList.add('on');
        if (knob) knob.innerHTML = isActive ? '<div class="mob-sw-tri"></div>' : '<div class="mob-sw-sq"></div>';
      }
    } else {
      /* 데스크탑 TOC 모드 스위치 상태 동기화 */
      var dtms = $id('tocDesktopBar') && $id('tocDesktopBar').querySelector('.intro-sw');
      if (dtms && dtms._tocSync) dtms._tocSync(AutoPlay.isActive());
    }
  },
  close: function() {
    var ov=$id('tocOverlay'); if(!ov) return;
    if (ov.contains(document.activeElement)) document.activeElement.blur();
    ov.classList.remove('on'); ov.setAttribute('aria-hidden','true');
    setTimeout(function(){ ov.style.display=''; }, 420);
    document.querySelector('.unified-panel') && document.querySelector('.unified-panel').classList.remove('expanded');
    /* #104/#105 — TOC 닫을 때 오토모드 pause 상태 복원 */
    if (AutoPlay.isActive() && AutoPlay.isPaused()) AutoPlay.resumeAP();
  }
};

var ThumbnailManager = {
  open: function() {
    history.pushState({overlay:'thumb'},'');
    TOCManager.close();
    var ov=$id('thumbOverlay'); if(!ov) return;
    ov.style.display='flex'; ov.setAttribute('aria-hidden','false');
    requestAnimationFrame(function(){ requestAnimationFrame(function(){ ov.classList.add('on'); }); });
    _buildThumbGrid();
    setTimeout(function(){ scrollToCurrent($id('thumbGrid'),'.thumb-current'); }, 80);
  },
  close: function() {
    var ov=$id('thumbOverlay'); if(!ov) return;
    ov.classList.remove('on'); ov.setAttribute('aria-hidden','true');
    setTimeout(function(){ ov.style.display='none'; var g=$id('thumbGrid'); if(g) g.innerHTML=''; }, 420);
  }
};

var SceneListManager = {
  open: function() {
    if(AutoPlay.isActive()) AutoPlay.pauseAP();
    history.pushState({overlay:'sceneList'},'');
    var ov=$id('sceneListOverlay'); if(!ov) return;
    var body=$id('sceneListBody'); if(body) {
      body.innerHTML=_buildSceneListHTML();
      /* 썸네일 onload → .loaded 클래스 추가 */
      body.querySelectorAll('.slst-img').forEach(function(img){
        if(img.complete && img.naturalWidth>0) { img.classList.add('loaded'); }
        else { img.addEventListener('load',function(){ img.classList.add('loaded'); },{once:true}); }
      });
    }
    ov.style.display='flex'; ov.setAttribute('aria-hidden','false');
    requestAnimationFrame(function(){ requestAnimationFrame(function(){ ov.classList.add('on'); }); });
    scrollToCurrent($id('sceneListBody'),'.slst-current');
    /* lazy: poem HEAD check */
    _checkPoemLinks();
  },
  close: function() {
    var ov=$id('sceneListOverlay'); if(!ov) return;
    ov.classList.remove('on'); ov.setAttribute('aria-hidden','true');
    setTimeout(function(){ ov.style.display='none'; },420);
  }
};

var AboutManager = {
  open: function() {
    history.pushState({overlay:'about'},'');
    var ov=$id('aboutOverlay'); if(!ov) return;
    var t=LANG_TEXTS[curLang];
    var titleEl=$id('aboutTitle'), bodyEl=$id('aboutBody');
    if(titleEl) titleEl.textContent=t.aboutTitle;
    if(bodyEl) bodyEl.textContent=t.aboutBody;
    ov.style.display='flex'; ov.setAttribute('aria-hidden','false');
    requestAnimationFrame(function(){ requestAnimationFrame(function(){ ov.classList.add('on'); }); });
  },
  close: function() { var ov=$id('aboutOverlay'); if(!ov) return; InputManager.closeOverlay(ov); }
};

var HelpManager = {
  open: function() {
    history.pushState({overlay:'help'},'');
    var ov=$id('helpOverlay'); if(!ov) return;
    ov.style.display='flex'; ov.setAttribute('aria-hidden','false');
    requestAnimationFrame(function(){ requestAnimationFrame(function(){ ov.classList.add('on'); }); });
  },
  close: function() { var ov=$id('helpOverlay'); if(!ov) return; InputManager.closeOverlay(ov); }
};

var IntroManager = {
  open: function() {
    history.pushState({overlay:'intro'},'');
    var ov=$id('introOverlay'); if(!ov) return;
    ov.style.display='flex'; ov.setAttribute('aria-hidden','false');
    requestAnimationFrame(function(){ requestAnimationFrame(function(){ ov.classList.add('on'); }); });
  },
  close: function() { var ov=$id('introOverlay'); if(!ov) return; InputManager.closeOverlay(ov); }
};

var GuestbookManager = {
  _loaded: false,
  open: function() {
    history.pushState({overlay:'gb'},'');
    var ov=$id('gbOverlay'); if(!ov) return;
    ov.style.display='flex'; ov.setAttribute('aria-hidden','false');
    requestAnimationFrame(function(){ requestAnimationFrame(function(){ ov.classList.add('on'); }); });
    if (!GuestbookManager._loaded) {
      GuestbookManager._loaded=true;
      var s=document.createElement('script'); s.src='../guestbook.js?v='+Date.now();
      s.onload=function(){ if(typeof window.initGuestbook==='function') window.initGuestbook(curLang); };
      document.head.appendChild(s);
    } else {
      if(typeof window.initGuestbook==='function') window.initGuestbook(curLang);
    }
  },
  close: function() { var ov=$id('gbOverlay'); if(!ov) return; InputManager.closeOverlay(ov); }
};

var PoemManager = {
  open: function(title, text) {
    history.pushState({overlay:'poem'},'');
    var ov=$id('poemOverlay'); if(!ov) return;
    var titleEl=$id('poemTitle'), bodyEl=$id('poemBody');
    if(titleEl) titleEl.innerHTML=title;
    if(bodyEl){ bodyEl.style.cssText="font-size:clamp(20px,2.5vw,24px);line-height:1.6;color:rgba(235,235,235,0.90);white-space:pre-wrap;word-break:keep-all;padding:0 16px;margin-top:32px;"; bodyEl.textContent=text.replace(/\r\n/g,'\n').replace(/\r/g,'\n'); }
    ov.style.display='flex'; ov.setAttribute('aria-hidden','false');
    requestAnimationFrame(function(){ requestAnimationFrame(function(){ ov.classList.add('on'); }); });
  },
  close: function() { var ov=$id('poemOverlay'); if(!ov) return; InputManager.closeOverlay(ov); }
};

/* ============================================================
   V. 씬 목록 HTML 빌드
   ============================================================ */
function _buildSceneListHTML() {
  var sc=NavigationManager.currentScene()||{};
  var lockSVG='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"/></svg>';
  var STANZA_TRIGGERS = new Set(['LPL_04','LDR_51','LSN_02','LSN_10','LSN_16']);
  return SCENES_ALL.filter(function(s){ return s.kr!==undefined; }).map(function(s){
    var isCur = s.code && s.code===sc.code;
    var hasThumb = THUMB_CODES.has(s.code);
    var title = curLang==='KR'?s.kr:(s.en||s.kr);
    var safeKr=(s.kr||'').replace(/"/g,'&quot;').replace(/\n/g,' ');
    var safeEn=(s.en||'').replace(/"/g,'&quot;').replace(/\n/g,' ');
    var thumbEl = hasThumb
      ?'<img class="slst-img" src="../assets/thumb/'+s.file+'.jpg" alt="" loading="lazy"/>'
      :'<div class="slst-lock">'+lockSVG+'</div>';
    var html = '<div class="slst-item'+(isCur?' slst-current':'')+'" data-code="'+(s.code||'')+'" data-kr="'+safeKr+'" data-en="'+safeEn+'" data-file="'+(s.file||'')+'">'
      +'<div class="slst-thumb"'+(hasThumb&&s.file?' style="cursor:pointer;" data-url="/scenes/'+s.file+'.html"':'')+'>'+thumbEl+'</div>'
      +'<span class="slst-title">'+title.replace(/\n/g,'<br>')+'</span>'
      +'</div>';
    if (s.file && STANZA_TRIGGERS.has(s.file)) html += '<div class="slst-divider"></div>';
    return html;
  }).join('');
}

function _checkPoemLinks() {
  var items=document.querySelectorAll('#sceneListBody .slst-item[data-code]');
  items.forEach(function(item){
    var code=item.dataset.code; if(!code) return;
    var poemCode=code.replace(/#/g,'_');
    var poemFile='../poems/'+poemCode+'.txt';
    var penSVG='<span class="slst-lock-tag"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="M20.24 4.76a6 6 0 0 0-8.49 0L4 12.5V20h7.5l7.74-7.75a6 6 0 0 0 0-8.49z"/><line x1="16" y1="8" x2="2" y2="22"/><line x1="17.5" y1="15" x2="9" y2="15"/></svg></span>';
    fetch(poemFile,{method:'HEAD'}).then(function(r){
      if(!r.ok) return;
      var t=item.querySelector('.slst-title'); if(!t) return;
      t.classList.add('has-poem');
      if(!item.querySelector('.slst-poem-btn')){
        var poemBtn=document.createElement('span');
        poemBtn.className='slst-poem-btn slst-lock-tag';
        poemBtn.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="M20.24 4.76a6 6 0 0 0-8.49 0L4 12.5V20h7.5l7.74-7.75a6 6 0 0 0 0-8.49z"/><line x1="16" y1="8" x2="2" y2="22"/><line x1="17.5" y1="15" x2="9" y2="15"/></svg>';
        poemBtn.style.cssText='cursor:pointer;flex-shrink:0;opacity:0.55;';
        item.appendChild(poemBtn);
      }
    }).catch(function(){});
  });
}

/* ============================================================
   W. 썸네일 그리드 + Hearts (Firebase)
   ============================================================ */
var _heartFBReady=false, _heartAuth=null, _heartDB=null;

function _loadHeartFirebase() {
  return new Promise(function(resolve){
    if(_heartFBReady){ resolve(); return; }
    if(typeof firebase!=='undefined'&&firebase.apps&&firebase.apps.length){
      _heartAuth=firebase.auth(); _heartDB=firebase.firestore(); _heartFBReady=true; resolve(); return;
    }
    var sdks=[
      'https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js',
      'https://www.gstatic.com/firebasejs/10.12.0/firebase-auth-compat.js',
      'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore-compat.js'
    ];
    var loaded=0;
    sdks.forEach(function(src){
      if(document.querySelector('script[src="'+src+'"]')){ loaded++; if(loaded===sdks.length) init(); return; }
      var s=document.createElement('script'); s.src=src;
      s.onload=function(){ loaded++; if(loaded===sdks.length) init(); };
      document.head.appendChild(s);
    });
    function init(){
      if(!firebase.apps.length) firebase.initializeApp(HEART_FB_CONFIG);
      _heartAuth=firebase.auth(); _heartDB=firebase.firestore(); _heartFBReady=true; resolve();
    }
  });
}

function _getHeartsCache(){ try{ return JSON.parse(localStorage.getItem('gallery_hearts')||'{}'); } catch(e){ return {}; } }
function _saveHeartsCache(h){ try{ localStorage.setItem('gallery_hearts',JSON.stringify(h)); } catch(e){} }

function _loadHeartsFromDB() {
  return _loadHeartFirebase().then(function(){
    if(!_heartAuth.currentUser) return _heartAuth.signInAnonymously();
  }).then(function(){
    return _heartDB.collection('photo_likes').get();
  }).then(function(snap){
    var uid=_heartAuth.currentUser.uid, h={};
    snap.forEach(function(doc){ var d=doc.data(); if(d.likedBy&&d.likedBy.includes(uid)) h[doc.id.replace(/_/g,'#')]=true; });
    _saveHeartsCache(h); return h;
  }).catch(function(){ return _getHeartsCache(); });
}

function _toggleHeartInDB(code, isLiking) {
  _loadHeartFirebase().then(function(){
    if(!_heartAuth.currentUser) return _heartAuth.signInAnonymously();
  }).then(function(){
    var uid=_heartAuth.currentUser.uid;
    var ref=_heartDB.collection('photo_likes').doc(code.replace(/#/g,'_'));
    if(isLiking){ return ref.set({count:firebase.firestore.FieldValue.increment(1),likedBy:firebase.firestore.FieldValue.arrayUnion(uid)},{merge:true}); }
    else { return ref.update({count:firebase.firestore.FieldValue.increment(-1),likedBy:firebase.firestore.FieldValue.arrayRemove(uid)}); }
  }).catch(function(e){ console.warn('Heart toggle:',e); });
}

var _currentHearts = {};
var HEART_PATH='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z';
var LOCK_SVG='<svg viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="10" rx="2" ry="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>';

function _buildMobThumbGrid() {
  var grid=$id('mobThumbGrid'); if(!grid) return;
  grid.innerHTML='';
  _currentHearts=_getHeartsCache();
  _renderThumbGrid(grid,_currentHearts);
}

function _buildThumbGrid() {
  var grid=$id('thumbGrid'); if(!grid) return;
  grid.innerHTML='';
  _currentHearts=_getHeartsCache();
  _renderThumbGrid(grid,_currentHearts);
  _loadHeartsFromDB().then(function(dbH){
    if(JSON.stringify(dbH)!==JSON.stringify(_currentHearts)){ _currentHearts=dbH; _renderThumbGrid(grid,_currentHearts); }
  }).catch(function(){});
}

function _renderThumbGrid(grid, hearts) {
  grid.innerHTML='';
  var codeToScene={};
  SCENES_ALL.forEach(function(s){ if(s.code) codeToScene[s.code]=s; });
  INDEX_ROWS.forEach(function(row){
    if(row.type==='head'){
      var h=document.createElement('div'); h.className='thumb-section-head'; h.textContent=row.label; grid.appendChild(h); return;
    }
    var code=row.code, sc=codeToScene[code], hasThumb=THUMB_CODES.has(code);
    var card=document.createElement('div');
    if(sc&&hasThumb){
      card.className='thumb-card'+(sc.code===(NavigationManager.currentScene()&&NavigationManager.currentScene().code)?' thumb-current':'');
      var img=document.createElement('img'); img.className='thumb-img'; img.alt=curLang==='KR'?sc.kr:sc.en;
      img.loading='lazy'; img.src='../assets/thumb/'+sc.file+'.jpg';
      img.addEventListener('load',function(){ img.classList.add('loaded'); });
      var codeEl=document.createElement('div'); codeEl.className='thumb-code'; codeEl.textContent=sc.code;
      var liked=!!hearts[sc.code];
      var heart=document.createElement('div'); heart.className='thumb-heart';
      heart.innerHTML='<svg viewBox="0 0 24 24" class="'+(liked?'heart-filled':'heart-empty')+'"><path d="'+HEART_PATH+'"/></svg>';
      heart.addEventListener('click',function(e){
        e.stopPropagation();
        var isLiked=!!_currentHearts[sc.code];
        if(isLiked) delete _currentHearts[sc.code]; else _currentHearts[sc.code]=true;
        _saveHeartsCache(_currentHearts);
        heart.querySelector('svg').className.baseVal=isLiked?'heart-empty':'heart-filled';
        heart.classList.remove('pop'); void heart.offsetHeight; heart.classList.add('pop');
        _toggleHeartInDB(sc.code,!isLiked);
      });
      card.addEventListener('click',function(){ if(AutoPlay.isActive()&&AutoPlay.isPaused()) AutoPlay.resumeAP(); window.goTo('/scenes/'+sc.file+'.html', {direct:true}); });
      card.append(img,codeEl,heart);
    } else {
      card.className='thumb-card thumb-locked';
      var ph=document.createElement('div'); ph.className='thumb-placeholder';
      var li=document.createElement('div'); li.className='thumb-lock-icon'; li.innerHTML=LOCK_SVG;
      var title=LOCKED_TITLES[code];
      if(title){ var ti=document.createElement('div'); ti.className='thumb-title'; ti.textContent=title; card.append(ph,li,ti); }
      else card.append(ph,li);
      var ceL=document.createElement('div'); ceL.className='thumb-code'; ceL.textContent=code; card.appendChild(ceL);
    }
    grid.appendChild(card);
  });
}

/* ============================================================
   X. 공통 이벤트 바인딩
   ============================================================ */
function bindCommonEvents() {
  function onClose(backdropId, closeId, mgr) {
    $id(backdropId) && $id(backdropId).addEventListener('click', mgr.close.bind(mgr));
    $id(closeId)    && $id(closeId).addEventListener('click',    mgr.close.bind(mgr));
  }
  onClose('tocBackdrop','tocClose',TOCManager);
  onClose('thumbBackdrop','thumbClose',ThumbnailManager);
  onClose('slstBackdrop','slstClose',SceneListManager);
  onClose('aboutBackdrop','aboutClose',AboutManager);
  onClose('helpBackdrop','helpClose',HelpManager);
  onClose('introBackdrop',null,IntroManager);
  onClose('gbBackdrop','gbClose',GuestbookManager);
  onClose('poemBackdrop','poemClose',PoemManager);

  $id('tocInfoBtn')   && $id('tocInfoBtn').addEventListener('click',HelpManager.open.bind(HelpManager));

  /* 데스크탑 TOC knob 스위치 삽입 */
  if (!isMobile) {
    var bar = $id('tocDesktopBar');
    var infoBtn = $id('tocInfoBtn');
    if (bar && infoBtn) {
      bar.insertBefore(_buildTocLangSwitch(), infoBtn);
      bar.insertBefore(_buildTocModeSwitch(), infoBtn);
    }
  }

  /* 모바일 TOC 언어 스위치 */
  $id('tocLangSwitch') && $id('tocLangSwitch').addEventListener('click', function() {
    setLang(curLang === 'EN' ? 'KR' : 'EN');
  });
  $id('tocLangSwitch') && $id('tocLangSwitch').addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this.click(); }
  });

  /* 모바일 TOC 모드 스위치 */
  $id('tocModeSwitch') && $id('tocModeSwitch').addEventListener('click', function() {
    var sw = this;
    var knob = sw.querySelector('.mob-sw-knob');
    if (AutoPlay.isActive()) {
      /* 오토 중(▶ 활성) → 클릭 시 수동으로 전환 */
      sw.classList.add('on');
      if (knob) knob.innerHTML = '<div class="mob-sw-sq"></div>';
      TOCManager.close();
      setTimeout(function() { AutoPlay.stop(); }, 440);
    } else {
      /* 수동(■ 활성) → 클릭 시 오토 시작 */
      sw.classList.remove('on');
      if (knob) knob.innerHTML = '<div class="mob-sw-tri"></div>';
      TOCManager.close();
      setTimeout(function() { AutoPlay.start(NavigationManager.currentScene(), NavigationManager.currentSceneURL()); }, 440);
    }
  });
  $id('tocModeSwitch') && $id('tocModeSwitch').addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this.click(); }
  });
  $id('mobExpandBtn') && $id('mobExpandBtn').addEventListener('click', function(e){ e.preventDefault(); e.stopPropagation(); TOCManager.close(); setTimeout(function(){ ThumbnailManager.open(); }, 200); });
  /* 데스크탑 TOC 모드 버튼 */
  $id('tocAutoPlayBtn') && $id('tocAutoPlayBtn').addEventListener('click',function(){
    TOCManager.close(); setTimeout(function(){ AutoPlay.start(NavigationManager.currentScene(), NavigationManager.currentSceneURL()); },440);
  });
  $id('tocAutoPlayBtn') && $id('tocAutoPlayBtn').addEventListener('keydown',function(e){ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); $id('tocAutoPlayBtn').click(); } });
  $id('tocStopBtn') && $id('tocStopBtn').addEventListener('click',function(){
    TOCManager.close(); setTimeout(function(){ AutoPlay.stop(); },440);
  });
  $id('tocStopBtn') && $id('tocStopBtn').addEventListener('keydown',function(e){ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); $id('tocStopBtn').click(); } });
  $id('menuH_ABOUT')  && $id('menuH_ABOUT').addEventListener('click',function(e){e.stopPropagation();AboutManager.open();});
  $id('menuH_ABOUT')  && $id('menuH_ABOUT').addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();AboutManager.open();}});
  $id('menuH_GB')     && $id('menuH_GB').addEventListener('click',function(e){e.stopPropagation();GuestbookManager.open();});
  $id('menuH_GB')     && $id('menuH_GB').addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();GuestbookManager.open();}});
  $id('tocHome')      && $id('tocHome').addEventListener('click',IntroManager.open.bind(IntroManager));
  $id('introBtn')     && $id('introBtn').addEventListener('click',function(){ IntroManager.close(); setTimeout(function(){ window.location.href='/index.html'; },300); });
  document.addEventListener('click', function(e) {
    var btn = e.target.closest('[data-lang]');
    if (btn) { e.stopPropagation(); setLang(btn.getAttribute('data-lang')); }
  });
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      var btn = e.target.closest('[data-lang]');
      if (btn) { e.preventDefault(); setLang(btn.getAttribute('data-lang')); }
    }
  });
  $id('thumbExpandBtn')&& $id('thumbExpandBtn').addEventListener('click',function(){ document.querySelector('.unified-panel')&&document.querySelector('.unified-panel').classList.toggle('expanded'); });

  /* TOC 섹션 → 썸네일 그리드 스크롤 */
  var tocNav={tocPrologue:'LPL',tocLoveDream:'LDR',tocLoveSong:'LSN',tocEpilogue:'LEL'};
  Object.keys(tocNav).forEach(function(id){
    var prefix=tocNav[id];
    var el=$id(id); if(!el) return;
    el.addEventListener('click',function(e){
      e.preventDefault();
      var grid=isMobile ? $id('mobThumbGrid') : $id('thumbGrid');
      if(!grid) return;
      var heads=grid.querySelectorAll('.thumb-section-head');
      for(var i=0;i<heads.length;i++){
        if(heads[i].textContent.trim().startsWith(prefix)){
          var sp=heads[i].closest('.unified-thumb-body')||heads[i].closest('.mob-unified-right')||grid.parentElement;
          if(sp) sp.scrollTop=heads[i].offsetTop-sp.offsetTop; break;
        }
      }
    });
  });

  /* 씬 목록 이벤트 위임 */
  document.addEventListener('click',function(e){
    /* slst 썸네일 클릭 → 씬 이동 */
    var thumb=e.target.closest('.slst-thumb[data-url]');
    if(thumb){ SceneListManager.close(); window.goTo(thumb.dataset.url, {direct:true}); return; }
    /* slst 깃털 버튼 클릭 → 시 */
    var poemBtn=e.target.closest('.slst-poem-btn');
    if(poemBtn){
      var pItem=poemBtn.closest('.slst-item'); if(!pItem) return;
      var pCode=pItem.dataset.code; if(!pCode) return;
      var pTitleEl=pItem.querySelector('.slst-title');
      fetch('../poems/'+pCode.replace(/#/g,'_')+'.txt').then(function(r){ if(!r.ok) throw 0; return r.text(); })
        .then(function(txt){
          SceneListManager.close();
          setTimeout(function(){ PoemManager.open(pTitleEl?pTitleEl.textContent.trim():'', txt); },220);
        }).catch(function(){});
      return;
    }
    /* slst 제목 클릭 → 씬 이동 */
    var title=e.target.closest('.slst-title');
    if(title){
      var item=title.closest('.slst-item'); if(!item) return;
      var file=item.dataset.file; if(!file) return;
      SceneListManager.close(); window.goTo('/scenes/'+file+'.html', {direct:true});
      return;
    }
  });

  /* Android 뒤로 / popstate */
  window.addEventListener('popstate',function(e){
    if(InputManager.isOverlayOpen()){ history.pushState(null,'',location.href); InputManager.closeTopOverlay(); return; }
    if(e.state&&e.state.url){ NavigationManager.resetNavigation(); window.goTo(e.state.url); }
  });

  /* 언어 전환 후 오버레이 복원 */
  try {
    var reopen=sessionStorage.getItem('reopen_overlay');
    if(reopen){ sessionStorage.removeItem('reopen_overlay');
      setTimeout(function(){
        if(reopen==='tocOverlay') TOCManager.open();
        else if(reopen==='sceneListOverlay') SceneListManager.open();
      },80);
    }
  } catch(e){}

  /* solo-peek 리스너 — 1회만 등록 */
  InputManager.initOnce();
}


/* ============================================================
   INTRO. SPA shell 인트로 렌더링
   index.html SPA 진입 시 init() → renderIntro() 호출
   ============================================================ */
/* intro.js 내부용 헬퍼 — gallery.js의 $id와 동일 */
function $id(id) { return document.getElementById(id); }
function _fadeOutIntroApp() {
  var el = document.getElementById('introApp');
  if (!el) return;
  el.style.opacity = '0';
  setTimeout(function() {
    if (el.parentNode) el.parentNode.removeChild(el);
    document.querySelectorAll('[data-intro-style]').forEach(function(s) {
      if (s.parentNode) s.parentNode.removeChild(s);
    });
  }, 350);
}

function renderIntro() {
  var app = $id('app');
  if (!app) return;

  /* 인트로 전용 keyframe CSS (1회 주입) */
  if (!$id('intro-kf')) {
    var kf = document.createElement('style'); kf.id = 'intro-kf';
    kf.textContent =
      '@keyframes introFadeBreathM{0%{opacity:0}100%{opacity:0.35}}' +
      '@keyframes introBreatheM{0%,100%{opacity:0.35}50%{opacity:0.55}}' +
      '@keyframes introFadeBreathD{0%{opacity:0}100%{opacity:1}}' +
      '@keyframes introBreatheD{0%,100%{opacity:1}50%{opacity:0.85}}' +
      '@keyframes introGlow{0%,100%{box-shadow:0 0 5px 2px rgba(255,255,255,0.06)}' +
        '50%{box-shadow:0 0 14px 5px rgba(255,255,255,0.14)}}' +
      '@keyframes introPulse{0%{transform:scale(1);opacity:0.55}' +
        '70%{transform:scale(1.55);opacity:0}100%{transform:scale(1.55);opacity:0}}' +
      '@keyframes introBlink{0%,100%{opacity:1}50%{opacity:0}}';
    document.head.appendChild(kf);
  }

  var TARGET = '/scenes/LPL_01.html';
  var introText = (curLang === 'EN')
    ? 'Every moment of love opens with you'
    : '모든 사랑의 순간은 당신으로 열립니다';

  /* 인트로 시작과 동시에 LPL_01 씬 데이터 + 이미지 preload */
  NavigationManager.fetchScene(TARGET).then(function(scene) {
    if (scene && scene.imgSrc) {
      NavigationManager.preloadImg(TARGET, resolveURL(TARGET, scene.imgSrc));
    }
  }).catch(function(){});

  if (isMobile) _renderIntroMobile(app, introText, TARGET);
  else          _renderIntroDesktop(app, introText, TARGET);
}

/* ──────────────────────────────────────────
 * 타이핑 엔진 (공통)
 * onDone(): 타이핑 자연 완료 시 호출 (커서 깜빡임 후)
 * 반환값 extSkip(): 즉시 전체 텍스트 표시, onDone은 호출하지 않음
 * ────────────────────────────────────────── */
function _introTyping(lineEl, curEl, text, onDone) {
  var words = text.split(' ');
  var wIdx = 0, cIdx = 0, typed = '', active = true;
  var INTERVAL = function() { return 120 + Math.random() * 160; };

  var render = function() {
    lineEl.innerHTML = '';
    if (typed) lineEl.appendChild(document.createTextNode(typed));
    lineEl.appendChild(curEl);
  };

  var blinkOnce = function(cb) {
    var n = 1 + Math.floor(Math.random() * 2), cnt = 0;
    var tick = function() {
      curEl.style.opacity = '0';
      setTimeout(function() {
        curEl.style.opacity = '1';
        if (++cnt < n) setTimeout(tick, 300); else cb();
      }, 300);
    };
    curEl.style.opacity = '1';
    setTimeout(tick, 300);
  };

  var typeChar = function() {
    if (!active) return;
    var w = words[wIdx];
    typed = words.slice(0, wIdx).join(' ') + (wIdx > 0 ? ' ' : '') + w.slice(0, ++cIdx);
    render();
    if (cIdx < w.length) { setTimeout(typeChar, INTERVAL()); return; }
    if (wIdx < words.length - 1) {
      blinkOnce(function() { wIdx++; cIdx = 0; setTimeout(typeChar, 150); });
    } else {
      blinkOnce(function() {
        if (!active) return;
        curEl.style.opacity = '';
        curEl.style.animation = 'introBlink 1.4s step-end infinite';
        onDone();
      });
    }
  };

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function() { if (active) setTimeout(typeChar, 400); });
  } else {
    setTimeout(typeChar, 800);
  }

  /* extSkip: 타이핑 즉시 완료 (onDone 호출 안 함 — 호출자가 처리) */
  return function extSkip() {
    if (!active) return;
    active = false;
    typed = words.join(' ');
    render();
    curEl.style.animation = 'none';
    curEl.style.opacity = '0';
    curEl.style.display = 'none';
  };
}

/* ──────────────────────────────────────────
 * lang / device bar 빌더 (공통)
 * ────────────────────────────────────────── */
var _IBTN = 'font-family:"Nanum Pen Script",cursive;width:36px;height:36px;border-radius:999px;' +
  'display:grid;place-items:center;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.22);' +
  'color:rgba(235,235,235,0.35);cursor:pointer;-webkit-tap-highlight-color:transparent;transition:all 300ms ease;';
var _IBTN_ACT = 'opacity:1;border-color:rgba(255,255,255,0.40);background:rgba(255,255,255,0.10);';

/* 구버전 _introLangBar — 버튼 방식 (스위치 전환 전 보관)
function _introLangBar_btn() {
  var bar = document.createElement('div'); bar.style.cssText = 'display:flex;gap:10px;';
  var mk = function(lang, svg, tip) {
    var isAct = curLang === lang;
    var b = document.createElement('button'); b.type = 'button';
    b.style.cssText = _IBTN + 'position:relative;' + (isAct ? _IBTN_ACT : '');
    b.className = 'intro-bar-btn';
    b.setAttribute('data-tip', tip);
    b.innerHTML = svg;
    b.addEventListener('mouseenter', function() { if (!isAct) b.style.cssText = _IBTN + 'position:relative;opacity:0.35;border-color:rgba(255,255,255,0.12);background:rgba(255,255,255,0.04);'; });
    b.addEventListener('mouseleave', function() { b.style.cssText = _IBTN + 'position:relative;' + (isAct ? _IBTN_ACT : ''); });
    b.addEventListener('click', function() { saveLang(lang); location.reload(); });
    return b;
  };
  bar.appendChild(mk('KR',
    '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.7" stroke="currentColor" style="width:20px;height:20px;display:block;">' +
    '<path stroke-linecap="round" stroke-linejoin="round" d="M8 6v12"/>' +
    '<path stroke-linecap="round" stroke-linejoin="round" d="M8 12l8-6"/>' +
    '<path stroke-linecap="round" stroke-linejoin="round" d="M8 12l8 6"/></svg>',
    '한국어'));
  bar.appendChild(mk('EN',
    '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.7" stroke="currentColor" style="width:20px;height:20px;display:block;">' +
    '<path stroke-linecap="round" stroke-linejoin="round" d="M16 6H9"/>' +
    '<path stroke-linecap="round" stroke-linejoin="round" d="M9 6v12"/>' +
    '<path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6"/>' +
    '<path stroke-linecap="round" stroke-linejoin="round" d="M9 18h7"/></svg>',
    'English'));
  return bar;
}
*/

/* 언어 선택 스위치 (EN ←→ KR) — 52×34, knob rgba(255,255,255,0.18) */
function _introLangBar() {
  var _SW_BASE = 'width:52px;height:34px;border-radius:999px;position:relative;' +
    'display:flex;align-items:center;justify-content:space-between;' +
    'padding:0 10px;box-sizing:border-box;cursor:pointer;user-select:none;' +
    '-webkit-tap-highlight-color:transparent;transition:all 300ms ease;';
  var _SW_OFF   = 'background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.22);';
  var _SW_ON    = 'background:rgba(255,255,255,0.10);border:1px solid rgba(255,255,255,0.40);';
  var _SW_HOVER = 'background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.12);opacity:0.35;';
  var _SIDE_CSS = 'font-size:11px;font-family:sans-serif;color:rgba(235,235,235,0.30);' +
    'transition:opacity 180ms;z-index:1;line-height:1;pointer-events:none;display:flex;align-items:center;';
  var _KNOB_CSS = 'position:absolute;top:50%;transform:translateY(-50%);left:4px;width:26px;height:26px;border-radius:50%;' +
    'background:rgba(255,255,255,0.18);transition:left 240ms cubic-bezier(0.4,0,0.2,1);' +
    'display:flex;align-items:center;justify-content:center;';

  /* knob 안 레이블 — 진하게 / 사이드 레이블은 leftSpan/rightSpan에 textContent 직접 설정 (중앙정렬 보장) */
  var _LANG_LABEL_CSS = 'font-size:11px;font-family:sans-serif;color:rgba(235,235,235,0.80);font-weight:700;';
  var makeEnEl = function() { var el = document.createElement('span'); el.style.cssText = _LANG_LABEL_CSS; el.textContent = 'E'; return el; };
  var makeKrEl = function() { var el = document.createElement('span'); el.style.cssText = _LANG_LABEL_CSS; el.textContent = 'K'; return el; };

  var isOn = (curLang === 'KR'); /* off=EN, on=KR */
  var track = document.createElement('div');
  track.className = 'intro-sw';
  track.style.cssText = _SW_BASE + (isOn ? _SW_ON : _SW_OFF); /* 기본 스타일 초기 설정 — applyState는 변경분만 개별 속성으로 업데이트 */
  track.setAttribute('data-tip', isOn ? '한국어' : 'ENGLISH');
  /* 사이드 레이블: textContent 직접 설정으로 세로 중앙정렬 보장 */
  var leftSpan = document.createElement('span'); leftSpan.style.cssText = _SIDE_CSS; leftSpan.textContent = 'E';
  var rightSpan = document.createElement('span'); rightSpan.style.cssText = _SIDE_CSS; rightSpan.textContent = 'K';
  var knob = document.createElement('div'); knob.style.cssText = _KNOB_CSS;

  /* applyState: cssText 전체 재설정 금지 — 외부 position/right/bottom 등 유지를 위해 개별 속성만 변경
     animate=true 시 knob 이동 완료(transitionend) 후 아이콘·사이드레이블 교체 — 클릭 시에만 사용 */
  var applyState = function(on, hover, animate) {
    if (hover) {
      track.style.background = 'rgba(255,255,255,0.04)';
      track.style.borderColor = 'rgba(255,255,255,0.12)';
      track.style.opacity = '0.35';
    } else if (on) {
      track.style.background = 'rgba(255,255,255,0.10)';
      track.style.borderColor = 'rgba(255,255,255,0.40)';
      track.style.opacity = '';
      track.setAttribute('data-tip', '한국어');
    } else {
      track.style.background = 'rgba(255,255,255,0.02)';
      track.style.borderColor = 'rgba(255,255,255,0.22)';
      track.style.opacity = '';
      track.setAttribute('data-tip', 'ENGLISH');
    }
    knob.style.left = on ? '22px' : '4px';
    if (animate) {
      knob.addEventListener('transitionend', function handler(e) {
        if (e.propertyName !== 'left') return;
        knob.removeEventListener('transitionend', handler);
        knob.innerHTML = '';
        knob.appendChild(on ? makeKrEl() : makeEnEl());
        /* knob과 반대편 side label만 표시 — 같은 쪽 표시 시 겹침 발생 */
        leftSpan.style.opacity  = on ? '1' : '0';
        rightSpan.style.opacity = on ? '0' : '1';
      });
    } else {
      knob.innerHTML = '';
      knob.appendChild(on ? makeKrEl() : makeEnEl());
      /* knob과 반대편 side label만 표시 — 같은 쪽 표시 시 겹침 발생 */
      leftSpan.style.opacity  = on ? '1' : '0';
      rightSpan.style.opacity = on ? '0' : '1';
    }
  };
  applyState(isOn, false);

  track.appendChild(leftSpan); track.appendChild(knob); track.appendChild(rightSpan);
  track.addEventListener('mouseenter', function() { applyState(isOn, true); });
  track.addEventListener('mouseleave', function() { applyState(isOn, false); });
  track.addEventListener('click', function() {
    isOn = !isOn;
    applyState(isOn, false, true);
    saveLang(isOn ? 'KR' : 'EN');
    location.reload();
  });
  return track;
}

/* #85 — 디바이스 버튼 주석 처리 (오토/매뉴얼 버튼으로 교체)
function _introDeviceBar() {
  var bar = document.createElement('div'); bar.style.cssText = 'display:flex;gap:10px;';
  var mk = function(dev, svg, isActive) {
    var b = document.createElement('button'); b.type = 'button';
    b.style.cssText = _IBTN + (isActive ? _IBTN_ACT : '');
    b.innerHTML = svg;
    b.addEventListener('click', function() {
      try { sessionStorage.setItem('force_device', dev); } catch(e) {}
      location.reload();
    });
    return b;
  };
  bar.appendChild(mk('PC',
    '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:20px;height:20px;display:block;">' +
    '<path stroke-linecap="round" stroke-linejoin="round" d="M9 17.25v1.5m6-1.5v1.5M3 4.5h18v10.5a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V4.5Z"/></svg>',
    !isMobile));
  bar.appendChild(mk('M',
    '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:20px;height:20px;display:block;">' +
    '<path stroke-linecap="round" stroke-linejoin="round" d="M10.5 1.5h3m-6 3h9A1.5 1.5 0 0 1 18 6v12a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3V6a1.5 1.5 0 0 1 1.5-1.5Z"/>' +
    '<path stroke-linecap="round" stroke-linejoin="round" d="M11.25 18.75h1.5"/></svg>',
    isMobile));
  return bar;
}
*/

/* 구버전 _introModeBar — 버튼 방식 (스위치 전환 전 보관)
function _introModeBar_btn() {
  var bar = document.createElement('div'); bar.style.cssText = 'display:flex;gap:10px;';
  var savedMode = 'AUTO';
  try { savedMode = sessionStorage.getItem('intro_mode') || 'AUTO'; } catch(e) {}
  var _IBTN_HOVER = 'opacity:0.35;border-color:rgba(255,255,255,0.12);background:rgba(255,255,255,0.04);';
  var buttons = [];
  var mk = function(mode, svg, tip) {
    var b = document.createElement('button'); b.type = 'button';
    b.dataset.mode = mode;
    b.style.cssText = _IBTN + 'position:relative;' + (savedMode === mode ? _IBTN_ACT : '');
    b.className = 'intro-bar-btn';
    b.setAttribute('data-tip', tip);
    b.innerHTML = svg;
    b.addEventListener('mouseenter', function() {
      if (b.dataset.active !== '1') b.style.cssText = _IBTN + 'position:relative;' + _IBTN_HOVER;
    });
    b.addEventListener('mouseleave', function() {
      b.style.cssText = _IBTN + 'position:relative;' + (b.dataset.active === '1' ? _IBTN_ACT : '');
    });
    b.addEventListener('click', function() {
      try { sessionStorage.setItem('intro_mode', mode); } catch(e) {}
      buttons.forEach(function(el) {
        el.dataset.active = (el === b) ? '1' : '';
        el.style.cssText = _IBTN + 'position:relative;' + (el === b ? _IBTN_ACT : '');
      });
    });
    if (savedMode === mode) b.dataset.active = '1';
    return b;
  };
  buttons.push(mk('AUTO', '', curLang === 'KR' ? '자동 감상' : 'Auto Play'));
  buttons.push(mk('MANUAL', '', curLang === 'KR' ? '직접 감상' : 'Manual'));
  buttons.forEach(function(b) { bar.appendChild(b); });
  return bar;
}
*/

/* ── 데스크탑 인트로 원형 버튼 공통 스타일 ── */
var _INTRO_BTN_BASE = 'position:absolute;width:52px;height:52px;border-radius:999px;' +
  'display:grid;place-items:center;' +
  'background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.07);' +
  'backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);' +
  'color:rgba(235,235,235,0.35);cursor:pointer;user-select:none;' +
  '-webkit-tap-highlight-color:transparent;' +
  'opacity:0;pointer-events:none;' +
  'transition:opacity 2000ms ease,transform 200ms ease,background 200ms ease,border-color 200ms ease,box-shadow 200ms ease;';
var _INTRO_BTN_HOVER_ON = function(el) {
  el.style.background = 'rgba(255,255,255,0.08)';
  el.style.borderColor = 'rgba(255,255,255,0.22)';
  el.style.color = 'rgba(235,235,235,0.90)';
  el.style.boxShadow = '0 0 14px 4px rgba(255,255,255,0.10)';
  el.style.transform = 'scale(1.04)';
};
var _INTRO_BTN_HOVER_OFF = function(el) {
  el.style.background = 'rgba(255,255,255,0.02)';
  el.style.borderColor = 'rgba(255,255,255,0.07)';
  el.style.color = 'rgba(235,235,235,0.35)';
  el.style.boxShadow = '';
  el.style.transform = '';
};

/* 상태 툴팁 (오토/수동, KR/EN) */
function _makeStatusTip(optA, optB) {
  var tip = document.createElement('div');
  tip.style.cssText = 'position:absolute;display:flex;gap:6px;align-items:center;' +
    'background:rgba(20,20,20,0.88);border:1px solid rgba(255,255,255,0.12);border-radius:20px;' +
    'padding:7px 18px;opacity:0;pointer-events:none;' +
    'transition:opacity 200ms ease;white-space:nowrap;z-index:9999;';
  var spanA = document.createElement('span');
  spanA.style.cssText = 'font-size:18px;font-family:"Nanum Pen Script",cursive;color:rgba(235,235,235,0.35);' +
    'padding:2px 8px;border-radius:999px;transition:color 150ms,background 150ms;';
  spanA.textContent = optA;
  var divider = document.createElement('span');
  divider.style.cssText = 'font-size:11px;color:rgba(255,255,255,0.15);';
  divider.textContent = '|';
  var spanB = document.createElement('span');
  spanB.style.cssText = 'font-size:18px;font-family:"Nanum Pen Script",cursive;color:rgba(235,235,235,0.35);' +
    'padding:2px 8px;border-radius:999px;transition:color 150ms,background 150ms;';
  spanB.textContent = optB;
  tip.appendChild(spanA); tip.appendChild(divider); tip.appendChild(spanB);
  tip._spanA = spanA; tip._spanB = spanB;
  tip._highlightNext = function(currentIsA) {
    /* 다음 상태 하이라이트 */
    spanA.style.background = currentIsA ? '' : 'rgba(255,255,255,0.15)';
    spanA.style.color = currentIsA ? 'rgba(235,235,235,0.35)' : 'rgba(235,235,235,0.90)';
    spanB.style.background = currentIsA ? 'rgba(255,255,255,0.15)' : '';
    spanB.style.color = currentIsA ? 'rgba(235,235,235,0.90)' : 'rgba(235,235,235,0.35)';
    tip.style.opacity = '1';
  };
  tip._hide = function() { tip.style.opacity = '0'; };
  return tip;
}

/* 데스크탑 인트로 — 모드 원형 버튼 (▶/■) */
function _introModeBtn() {
  var savedMode = 'AUTO';
  try { savedMode = sessionStorage.getItem('intro_mode') || 'AUTO'; } catch(e) {}
  var isManual = (savedMode === 'MANUAL');

  var btn = document.createElement('div');
  btn.style.cssText = _INTRO_BTN_BASE;
  btn.style.left = '6%';
  btn.style.bottom = 'calc(6% + env(safe-area-inset-bottom))';

  /* ▶ CSS 아이콘 */
  var triEl = document.createElement('div');
  triEl.style.cssText = 'width:0;height:0;border-style:solid;margin-left:2px;flex-shrink:0;' +
    'border-color:transparent transparent transparent rgba(235,235,235,0.75);border-width:7px 0 7px 11px;';
  /* ■ CSS 아이콘 */
  var sqEl = document.createElement('div');
  sqEl.style.cssText = 'width:10px;height:10px;background:rgba(235,235,235,0.75);border-radius:1px;flex-shrink:0;display:none;';

  btn.appendChild(triEl); btn.appendChild(sqEl);

  /* 상태 툴팁 */
  var tip = _makeStatusTip('오토', '수동');
  tip.style.bottom = 'calc(6% + env(safe-area-inset-bottom) + 62px)';
  tip.style.left = 'calc(6% + 26px)';
  tip.style.transform = 'translateX(-50%)';

  var applyState = function(manual) {
    triEl.style.display = manual ? 'none' : '';
    sqEl.style.display  = manual ? ''     : 'none';
  };
  applyState(isManual);

  btn.addEventListener('mouseenter', function() {
    _INTRO_BTN_HOVER_ON(btn);
    /* 아이콘: 다음 상태 미리보기 */
    triEl.style.display = isManual ? ''     : 'none';
    sqEl.style.display  = isManual ? 'none' : '';
    /* 툴팁: 다음 상태 하이라이트 */
    tip._highlightNext(!isManual);
  });
  btn.addEventListener('mouseleave', function() {
    _INTRO_BTN_HOVER_OFF(btn, isManual);
    applyState(isManual);
    tip._hide();
  });
  btn.addEventListener('click', function() {
    isManual = !isManual;
    applyState(isManual);
    tip._hide();
    try { sessionStorage.setItem('intro_mode', isManual ? 'MANUAL' : 'AUTO'); } catch(e) {}
  });

  btn._tip = tip;
  return btn;
}

/* 데스크탑 인트로 — 언어 원형 버튼 (KR/EN) */
function _introLangBtn() {
  var isKR = (curLang === 'KR');

  var btn = document.createElement('div');
  btn.style.cssText = _INTRO_BTN_BASE;
  btn.style.right = '6%';
  btn.style.bottom = 'calc(6% + env(safe-area-inset-bottom))';

  var label = document.createElement('span');
  label.style.cssText = 'font-size:13px;font-family:sans-serif;font-weight:700;letter-spacing:0.03em;';
  label.textContent = isKR ? 'KR' : 'EN';
  btn.appendChild(label);

  /* 상태 툴팁 */
  var tip = _makeStatusTip('KR', 'EN');
  tip.style.bottom = 'calc(6% + env(safe-area-inset-bottom) + 62px)';
  tip.style.left = 'calc(100% - 6% - 26px)';
  tip.style.transform = 'translateX(-50%)';

  btn.addEventListener('mouseenter', function() {
    _INTRO_BTN_HOVER_ON(btn);
    label.textContent = isKR ? 'EN' : 'KR';
    tip._highlightNext(isKR);
  });
  btn.addEventListener('mouseleave', function() {
    _INTRO_BTN_HOVER_OFF(btn, isKR);
    label.textContent = isKR ? 'KR' : 'EN';
    tip._hide();
  });
  btn.addEventListener('click', function() {
    tip._hide();
    saveLang(isKR ? 'EN' : 'KR');
    location.reload();
  });

  btn._tip = tip;
  return btn;
}

/* 데스크탑 인트로 — 작가의 말 원형 버튼 (i 아이콘) */
function _introAboutBtn() {
  var btn = document.createElement('div');
  btn.style.cssText = _INTRO_BTN_BASE;
  btn.style.left = '6%';
  btn.style.top = '6%';

  btn.innerHTML = '<svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:22px;height:22px;">' +
    '<path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.064.852l-.708 2.836a.75.75 0 0 0 1.064.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"/>' +
    '</svg>';

  /* 라벨 툴팁 */
  var tip = document.createElement('div');
  tip.style.cssText = 'position:absolute;top:calc(6% + 62px);left:calc(6% + 26px);transform:translateX(-50%);' +
    'background:rgba(20,20,20,0.88);border:1px solid rgba(255,255,255,0.12);border-radius:20px;' +
    'padding:7px 18px;font-size:18px;font-family:"Nanum Pen Script",cursive;' +
    'color:rgba(235,235,235,0.90);opacity:0;pointer-events:none;' +
    'transition:opacity 200ms ease;white-space:nowrap;z-index:9999;';
  tip.textContent = (typeof LANG_TEXTS !== 'undefined' && LANG_TEXTS[curLang]) ? LANG_TEXTS[curLang].aboutTitle || '작가의 말' : '작가의 말';

  btn.addEventListener('mouseenter', function() { _INTRO_BTN_HOVER_ON(btn); tip.style.opacity = '1'; });
  btn.addEventListener('mouseleave', function() { _INTRO_BTN_HOVER_OFF(btn, false); tip.style.opacity = '0'; });
  btn.addEventListener('click', function() { tip.style.opacity = '0'; AboutManager.open(); });
  btn._tip = tip;
  return btn;
}

/* 데스크탑 인트로 — 이용 안내 원형 버튼 (? 아이콘, 플레이스홀더) */
function _introHelpBtn() {
  var btn = document.createElement('div');
  btn.style.cssText = _INTRO_BTN_BASE;
  btn.style.right = '6%';
  btn.style.top = '6%';

  btn.innerHTML = '<svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:22px;height:22px;">' +
    '<path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008z"/>' +
    '</svg>';

  /* 라벨 툴팁 */
  var tip = document.createElement('div');
  tip.style.cssText = 'position:absolute;top:calc(6% + 62px);left:calc(100% - 6% - 26px);transform:translateX(-50%);' +
    'background:rgba(20,20,20,0.88);border:1px solid rgba(255,255,255,0.12);border-radius:20px;' +
    'padding:7px 18px;font-size:18px;font-family:"Nanum Pen Script",cursive;' +
    'color:rgba(235,235,235,0.90);opacity:0;pointer-events:none;' +
    'transition:opacity 200ms ease;white-space:nowrap;z-index:9999;';
  tip.textContent = '이용 안내';

  btn.addEventListener('mouseenter', function() { _INTRO_BTN_HOVER_ON(btn); tip.style.opacity = '1'; });
  btn.addEventListener('mouseleave', function() { _INTRO_BTN_HOVER_OFF(btn, false); tip.style.opacity = '0'; });
  btn.addEventListener('click', function() { tip.style.opacity = '0'; HelpManager.open(); });
  btn._tip = tip;
  return btn;
}

/* 모드 선택 스위치 (AUTO ←→ MANUAL) — 52×34, knob rgba(255,255,255,0.18)
   AUTO  : ▶ CSS아이콘 (knob 왼쪽)
   MANUAL: ■ CSS아이콘 (knob 오른쪽) */
function _introModeBar() {
  var _SW_BASE = 'width:52px;height:34px;border-radius:999px;position:relative;' +
    'display:flex;align-items:center;justify-content:space-between;' +
    'padding:0 10px;box-sizing:border-box;cursor:pointer;user-select:none;' +
    '-webkit-tap-highlight-color:transparent;transition:all 300ms ease;';
  var _SW_OFF   = 'background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.22);';
  var _SW_ON    = 'background:rgba(255,255,255,0.10);border:1px solid rgba(255,255,255,0.40);';
  var _SW_HOVER = 'background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.12);opacity:0.35;';
  var _SIDE_CSS = 'font-size:11px;font-family:sans-serif;color:rgba(235,235,235,0.30);' +
    'transition:opacity 180ms;z-index:1;line-height:1;pointer-events:none;display:flex;align-items:center;';
  var _KNOB_CSS = 'position:absolute;top:50%;transform:translateY(-50%);left:4px;width:26px;height:26px;border-radius:50%;' +
    'background:rgba(255,255,255,0.18);transition:left 240ms cubic-bezier(0.4,0,0.2,1);' +
    'display:flex;align-items:center;justify-content:center;';

  /* CSS 아이콘 빌더 */
  var makeTriEl = function() { /* ▶ — 150% */
    var el = document.createElement('div');
    el.style.cssText = 'width:0;height:0;border-style:solid;margin-left:2px;flex-shrink:0;' +
      'border-color:transparent transparent transparent rgba(235,235,235,0.75);border-width:6px 0 6px 9.75px;';
    return el;
  };
  var makeSqEl = function() { /* ■ — 150% */
    var el = document.createElement('div');
    el.style.cssText = 'width:9px;height:9px;background:rgba(235,235,235,0.75);border-radius:1px;flex-shrink:0;';
    return el;
  };
  var makeTriSide = function() { /* 사이드용 ▶ — knob과 동일 크기(높이 12px) */
    var el = document.createElement('div');
    el.style.cssText = 'width:0;height:0;border-style:solid;margin-left:2px;flex-shrink:0;' +
      'border-color:transparent transparent transparent rgba(235,235,235,0.30);border-width:6px 0 6px 9.75px;';
    return el;
  };
  var makeSqSide = function() { /* 사이드용 ■ — knob과 동일 크기(9px) */
    var el = document.createElement('div');
    el.style.cssText = 'width:9px;height:9px;background:rgba(235,235,235,0.30);border-radius:1px;flex-shrink:0;';
    return el;
  };

  var savedMode = 'AUTO';
  try { savedMode = sessionStorage.getItem('intro_mode') || 'AUTO'; } catch(e) {}
  var isOn = (savedMode === 'MANUAL'); /* off=AUTO, on=MANUAL */

  var track = document.createElement('div');
  track.className = 'intro-sw';
  track.style.cssText = _SW_BASE + (isOn ? _SW_ON : _SW_OFF); /* 기본 스타일 초기 설정 — applyState는 변경분만 개별 속성으로 업데이트 */
  track.setAttribute('data-tip', isOn ? '수동' : '자동');
  var leftSpan = document.createElement('span'); leftSpan.style.cssText = _SIDE_CSS;
  leftSpan.appendChild(makeTriSide());
  var rightSpan = document.createElement('span'); rightSpan.style.cssText = _SIDE_CSS;
  rightSpan.appendChild(makeSqSide());
  var knob = document.createElement('div'); knob.style.cssText = _KNOB_CSS;

  /* applyState: cssText 전체 재설정 금지 — 외부 position/left/bottom 등 유지를 위해 개별 속성만 변경
     animate=true 시 knob 이동 완료(transitionend) 후 아이콘·사이드레이블 교체 — 클릭 시에만 사용 */
  var applyState = function(on, hover, animate) {
    if (hover) {
      track.style.background = 'rgba(255,255,255,0.04)';
      track.style.borderColor = 'rgba(255,255,255,0.12)';
      track.style.opacity = '0.35';
    } else if (on) {
      track.style.background = 'rgba(255,255,255,0.10)';
      track.style.borderColor = 'rgba(255,255,255,0.40)';
      track.style.opacity = '';
      track.setAttribute('data-tip', '수동');
    } else {
      track.style.background = 'rgba(255,255,255,0.02)';
      track.style.borderColor = 'rgba(255,255,255,0.22)';
      track.style.opacity = '';
      track.setAttribute('data-tip', '자동');
    }
    knob.style.left = on ? '22px' : '4px';
    if (animate) {
      knob.addEventListener('transitionend', function handler(e) {
        if (e.propertyName !== 'left') return;
        knob.removeEventListener('transitionend', handler);
        knob.innerHTML = '';
        knob.appendChild(on ? makeSqEl() : makeTriEl());
        /* knob과 반대편 side label만 표시 — 같은 쪽 표시 시 겹침 발생 */
        leftSpan.style.opacity = on ? '1' : '0';
        rightSpan.style.opacity = on ? '0' : '1';
      });
    } else {
      knob.innerHTML = '';
      knob.appendChild(on ? makeSqEl() : makeTriEl());
      /* knob과 반대편 side label만 표시 — 같은 쪽 표시 시 겹침 발생 */
      leftSpan.style.opacity = on ? '1' : '0';
      rightSpan.style.opacity = on ? '0' : '1';
    }
  };
  applyState(isOn, false);

  track.appendChild(leftSpan); track.appendChild(knob); track.appendChild(rightSpan);
  track.addEventListener('mouseenter', function() { applyState(isOn, true); });
  track.addEventListener('mouseleave', function() { applyState(isOn, false); });
  track.addEventListener('click', function() {
    isOn = !isOn;
    applyState(isOn, false, true);
    try { sessionStorage.setItem('intro_mode', isOn ? 'MANUAL' : 'AUTO'); } catch(e) {}
  });
  return track;
}

/* ──────────────────────────────────────────
 * 데스크탑 TOC 하단 knob 스위치
 * 외형: _introModeBar/_introLangBar와 동일
 * 기능: AutoPlay.start/stop / setLang()
 * ────────────────────────────────────────── */
function _buildTocModeSwitch() {
  var _SW_BASE = 'width:52px;height:34px;border-radius:999px;position:relative;' +
    'display:flex;align-items:center;justify-content:space-between;' +
    'padding:0 10px;box-sizing:border-box;cursor:pointer;user-select:none;' +
    '-webkit-tap-highlight-color:transparent;transition:all 300ms ease;';
  var _SW_OFF = 'background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.22);';
  var _SW_ON  = 'background:rgba(255,255,255,0.10);border:1px solid rgba(255,255,255,0.40);';
  var _SIDE_CSS = 'font-size:11px;font-family:sans-serif;color:rgba(235,235,235,0.30);' +
    'transition:opacity 180ms;z-index:1;line-height:1;pointer-events:none;display:flex;align-items:center;';
  var _KNOB_CSS = 'position:absolute;top:50%;transform:translateY(-50%);left:4px;width:26px;height:26px;border-radius:50%;' +
    'background:rgba(255,255,255,0.18);transition:left 240ms cubic-bezier(0.4,0,0.2,1);' +
    'display:flex;align-items:center;justify-content:center;';

  var makeTriEl  = function() { var el = document.createElement('div'); el.style.cssText = 'width:0;height:0;border-style:solid;margin-left:2px;flex-shrink:0;border-color:transparent transparent transparent rgba(235,235,235,0.75);border-width:6px 0 6px 9.75px;'; return el; };
  var makeSqEl   = function() { var el = document.createElement('div'); el.style.cssText = 'width:9px;height:9px;background:rgba(235,235,235,0.75);border-radius:1px;flex-shrink:0;'; return el; };
  var makeTriSide = function() { var el = document.createElement('div'); el.style.cssText = 'width:0;height:0;border-style:solid;margin-left:2px;flex-shrink:0;border-color:transparent transparent transparent rgba(235,235,235,0.30);border-width:6px 0 6px 9.75px;'; return el; };
  var makeSqSide  = function() { var el = document.createElement('div'); el.style.cssText = 'width:9px;height:9px;background:rgba(235,235,235,0.30);border-radius:1px;flex-shrink:0;'; return el; };

  /* off=AUTO(▶), on=MANUAL(■) */
  var isOn = !AutoPlay.isActive();

  var track = document.createElement('div');
  track.className = 'intro-sw';
  track.style.cssText = _SW_BASE + (isOn ? _SW_ON : _SW_OFF);
  track.setAttribute('data-tip', isOn ? '수동' : '자동');
  var leftSpan = document.createElement('span'); leftSpan.style.cssText = _SIDE_CSS; leftSpan.appendChild(makeTriSide());
  var rightSpan = document.createElement('span'); rightSpan.style.cssText = _SIDE_CSS; rightSpan.appendChild(makeSqSide());
  var knob = document.createElement('div'); knob.style.cssText = _KNOB_CSS;

  var applyState = function(on, hover, animate) {
    if (hover) {
      track.style.background = 'rgba(255,255,255,0.04)';
      track.style.borderColor = 'rgba(255,255,255,0.12)';
      track.style.opacity = '0.35';
    } else if (on) {
      track.style.background = 'rgba(255,255,255,0.10)';
      track.style.borderColor = 'rgba(255,255,255,0.40)';
      track.style.opacity = '';
      track.setAttribute('data-tip', '수동');
    } else {
      track.style.background = 'rgba(255,255,255,0.02)';
      track.style.borderColor = 'rgba(255,255,255,0.22)';
      track.style.opacity = '';
      track.setAttribute('data-tip', '자동');
    }
    knob.style.left = on ? '22px' : '4px';
    if (animate) {
      knob.addEventListener('transitionend', function handler(e) {
        if (e.propertyName !== 'left') return;
        knob.removeEventListener('transitionend', handler);
        knob.innerHTML = ''; knob.appendChild(on ? makeSqEl() : makeTriEl());
        leftSpan.style.opacity = on ? '1' : '0';
        rightSpan.style.opacity = on ? '0' : '1';
      });
    } else {
      knob.innerHTML = ''; knob.appendChild(on ? makeSqEl() : makeTriEl());
      leftSpan.style.opacity = on ? '1' : '0';
      rightSpan.style.opacity = on ? '0' : '1';
    }
  };
  applyState(isOn, false);

  track.appendChild(leftSpan); track.appendChild(knob); track.appendChild(rightSpan);
  track.addEventListener('mouseenter', function() { applyState(isOn, true); });
  track.addEventListener('mouseleave', function() { applyState(isOn, false); });
  track.addEventListener('click', function() {
    isOn = !isOn;
    applyState(isOn, false, true);
    TOCManager.close();
    if (isOn) {
      setTimeout(function() { AutoPlay.stop(); }, 440);
    } else {
      setTimeout(function() { AutoPlay.start(NavigationManager.currentScene(), NavigationManager.currentSceneURL()); }, 440);
    }
  });
  /* TOC 열릴 때 AutoPlay 상태 동기화용 */
  track._tocSync = function(isAutoPlaying) { isOn = !isAutoPlaying; applyState(isOn, false); };
  return track;
}

function _buildTocLangSwitch() {
  var _SW_BASE = 'width:52px;height:34px;border-radius:999px;position:relative;' +
    'display:flex;align-items:center;justify-content:space-between;' +
    'padding:0 10px;box-sizing:border-box;cursor:pointer;user-select:none;' +
    '-webkit-tap-highlight-color:transparent;transition:all 300ms ease;';
  var _SW_OFF = 'background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.22);';
  var _SW_ON  = 'background:rgba(255,255,255,0.10);border:1px solid rgba(255,255,255,0.40);';
  var _SIDE_CSS = 'font-size:11px;font-family:sans-serif;color:rgba(235,235,235,0.30);' +
    'transition:opacity 180ms;z-index:1;line-height:1;pointer-events:none;display:flex;align-items:center;';
  var _KNOB_CSS = 'position:absolute;top:50%;transform:translateY(-50%);left:4px;width:26px;height:26px;border-radius:50%;' +
    'background:rgba(255,255,255,0.18);transition:left 240ms cubic-bezier(0.4,0,0.2,1);' +
    'display:flex;align-items:center;justify-content:center;';
  var _LANG_LABEL_CSS = 'font-size:11px;font-family:sans-serif;color:rgba(235,235,235,0.80);font-weight:700;';
  var makeEnEl = function() { var el = document.createElement('span'); el.style.cssText = _LANG_LABEL_CSS; el.textContent = 'E'; return el; };
  var makeKrEl = function() { var el = document.createElement('span'); el.style.cssText = _LANG_LABEL_CSS; el.textContent = 'K'; return el; };

  /* off=EN, on=KR */
  var isOn = (curLang === 'KR');

  var track = document.createElement('div');
  track.className = 'intro-sw';
  track.style.cssText = _SW_BASE + (isOn ? _SW_ON : _SW_OFF);
  track.setAttribute('data-tip', isOn ? '한국어' : 'ENGLISH');
  var leftSpan = document.createElement('span'); leftSpan.style.cssText = _SIDE_CSS; leftSpan.textContent = 'E';
  var rightSpan = document.createElement('span'); rightSpan.style.cssText = _SIDE_CSS; rightSpan.textContent = 'K';
  var knob = document.createElement('div'); knob.style.cssText = _KNOB_CSS;

  var applyState = function(on, hover, animate) {
    if (hover) {
      track.style.background = 'rgba(255,255,255,0.04)';
      track.style.borderColor = 'rgba(255,255,255,0.12)';
      track.style.opacity = '0.35';
    } else if (on) {
      track.style.background = 'rgba(255,255,255,0.10)';
      track.style.borderColor = 'rgba(255,255,255,0.40)';
      track.style.opacity = '';
      track.setAttribute('data-tip', '한국어');
    } else {
      track.style.background = 'rgba(255,255,255,0.02)';
      track.style.borderColor = 'rgba(255,255,255,0.22)';
      track.style.opacity = '';
      track.setAttribute('data-tip', 'ENGLISH');
    }
    knob.style.left = on ? '22px' : '4px';
    if (animate) {
      knob.addEventListener('transitionend', function handler(e) {
        if (e.propertyName !== 'left') return;
        knob.removeEventListener('transitionend', handler);
        knob.innerHTML = ''; knob.appendChild(on ? makeKrEl() : makeEnEl());
        leftSpan.style.opacity  = on ? '1' : '0';
        rightSpan.style.opacity = on ? '0' : '1';
      });
    } else {
      knob.innerHTML = ''; knob.appendChild(on ? makeKrEl() : makeEnEl());
      leftSpan.style.opacity  = on ? '1' : '0';
      rightSpan.style.opacity = on ? '0' : '1';
    }
  };
  applyState(isOn, false);

  track.appendChild(leftSpan); track.appendChild(knob); track.appendChild(rightSpan);
  track.addEventListener('mouseenter', function() { applyState(isOn, true); });
  track.addEventListener('mouseleave', function() { applyState(isOn, false); });
  track.addEventListener('click', function() {
    isOn = !isOn;
    applyState(isOn, false, true);
    setLang(isOn ? 'KR' : 'EN');
  });
  return track;
}

/* ──────────────────────────────────────────
 * 모바일 인트로 렌더링
 * ────────────────────────────────────────── */
function _renderIntroMobile(app, introText, TARGET) {
  document.documentElement.style.setProperty('--vh100', window.innerHeight + 'px');
  app.style.background = '#000';

  /* SVG 상수 */
  var LOCK_SVG   = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="rgba(200,200,200,0.75)" style="width:28px;height:28px;">' +
    '<path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"/></svg>';
  var UNLOCK_SVG = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="rgba(200,200,200,0.75)" style="width:28px;height:28px;">' +
    '<path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"/></svg>';

  /* ── frame (photo-area와 동일 레이아웃) ── */
  var frame = document.createElement('div');
  frame.style.cssText = 'position:relative;width:100%;aspect-ratio:1/1;flex-shrink:0;' +
    'background:linear-gradient(to bottom,#303030 0%,#222222 100%);display:grid;place-items:center;overflow:hidden;';

  var lineEl = document.createElement('div');
  lineEl.style.cssText = 'font-size:clamp(24px,6.2vw,42px);line-height:1.55;letter-spacing:0.2px;' +
    'white-space:pre-wrap;word-break:keep-all;text-align:center;' +
    'color:rgba(235,235,235,0.94);font-family:"Nanum Pen Script",cursive;' +
    'padding:0 16px;box-sizing:border-box;';
  var curEl = document.createElement('span');
  curEl.style.cssText = 'display:inline-block;width:2px;height:1em;background:rgba(220,220,220,0.85);' +
    'vertical-align:text-bottom;margin-left:2px;';
  lineEl.appendChild(curEl);
  frame.appendChild(lineEl);
  app.appendChild(frame);

  /* ── bottom (control-area와 동일 레이아웃) ── */
  var bottom = document.createElement('div');
  bottom.style.cssText = 'flex:1;width:100%;display:flex;flex-direction:column;align-items:center;' +
    'justify-content:center;background:#333;position:relative;' +
    'padding:8px 24px;box-sizing:border-box;padding-bottom:max(env(safe-area-inset-bottom),8px);';

  /* skip bar */
  var skipBar = document.createElement('div');
  skipBar.style.cssText = 'opacity:0;transition:opacity 2000ms ease;pointer-events:none;';
  var skipBtn = document.createElement('button'); skipBtn.type = 'button'; skipBtn.textContent = 'skip';
  skipBtn.style.cssText = 'width:36px;height:36px;border-radius:999px;display:grid;place-items:center;' +
    'background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.12);' +
    'color:rgba(235,235,235,0.70);font-family:"Nanum Pen Script",cursive;font-size:13px;' +
    'cursor:pointer;-webkit-tap-highlight-color:transparent;';
  skipBar.appendChild(skipBtn);

  /* lock wrap + pulse rings */
  var lockWrap = document.createElement('div');
  lockWrap.style.cssText = 'display:inline-grid;place-items:center;position:relative;margin-bottom:6px;';
  lockWrap.style.visibility = 'hidden';

  var ring1 = document.createElement('div');
  ring1.style.cssText = 'position:absolute;width:68px;height:68px;border-radius:999px;' +
    'border:1.5px solid rgba(255,255,255,0.22);opacity:0;pointer-events:none;';
  var ring2 = document.createElement('div');
  ring2.style.cssText = 'position:absolute;width:68px;height:68px;border-radius:999px;' +
    'border:1px solid rgba(255,255,255,0.14);opacity:0;pointer-events:none;';
  lockWrap.appendChild(ring1); lockWrap.appendChild(ring2);

  var lockBtn = document.createElement('button'); lockBtn.type = 'button';
  lockBtn.style.cssText = 'margin:0;width:68px;height:68px;border-radius:999px;display:grid;place-items:center;' +
    'background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.18);' +
    'cursor:pointer;user-select:none;-webkit-tap-highlight-color:transparent;opacity:0;pointer-events:none;';
  lockBtn.innerHTML = LOCK_SVG;
  lockWrap.appendChild(lockBtn);
  bottom.appendChild(lockWrap);

  /* bottom row: device-bar + lang-bar */
  var row = document.createElement('div');
  row.style.cssText = 'display:flex;width:100%;justify-content:space-between;align-items:center;';
  var modeBar = _introModeBar();
  modeBar.style.cssText += ';opacity:0;transform:translateY(6px);transition:opacity 2000ms ease,transform 2000ms ease;pointer-events:none;';
  var langBar = _introLangBar();
  langBar.style.cssText += ';opacity:0;transform:translateY(6px);transition:opacity 2000ms ease,transform 2000ms ease;pointer-events:none;';
  row.appendChild(modeBar); row.appendChild(skipBar); row.appendChild(langBar);
  bottom.appendChild(row);
  app.appendChild(bottom);
  /* 검정 flash 방지 — 인트로 콘텐츠 완성 후 즉시 표시 */
  app.style.opacity = '1';
  /* introApp(정적 플레이스홀더) fade-out 후 제거 */
  _fadeOutIntroApp();

  /* ── helpers ── */
  var lockShown = false;
  var idleTimer = null;
  var _mobIntroOnInteract = null;
  var showIcon = function(name) { lockBtn.innerHTML = (name === 'lock') ? LOCK_SVG : UNLOCK_SVG; };
  var showBars = function() {
    langBar.style.opacity = '1'; langBar.style.transform = 'translateY(0)'; langBar.style.pointerEvents = '';
    modeBar.style.opacity = '1'; modeBar.style.transform = 'translateY(0)'; modeBar.style.pointerEvents = '';
  };
  var hideBars = function() {
    langBar.style.opacity = '0'; langBar.style.pointerEvents = 'none';
    modeBar.style.opacity = '0'; modeBar.style.pointerEvents = 'none';
  };
  /* onDone/skip 양쪽에서 호출 — 이중 등록 방지 가드 포함 */
  var setupBarInteraction = function() {
    if (_mobIntroOnInteract) return;
    var onInteract = function(e) {
      if (e && e.target && lockWrap.contains(e.target)) return;
      showBars(); clearTimeout(idleTimer); idleTimer = setTimeout(hideBars, 5000);
    };
    document.addEventListener('touchstart', onInteract, {passive:true});
    document.addEventListener('keydown', onInteract);
    _mobIntroOnInteract = onInteract;
  };

  var showLockFn = function() {
    if (lockShown) return; lockShown = true;
    /* 커서 숨김 */
    curEl.style.animation = 'none'; curEl.style.opacity = '0';
    /* lock 표시 */
    lockWrap.style.visibility = '';
    lockBtn.style.opacity = ''; lockBtn.style.pointerEvents = '';
    lockBtn.style.animation =
      'introFadeBreathM 2s ease-in-out 1 forwards,' +
      'introBreatheM 2.8s ease-in-out 2s infinite,' +
      'introGlow 2.8s ease-in-out 2s infinite';
    ring1.style.animation = 'introPulse 2.4s ease-out infinite'; ring1.style.opacity = '1';
    ring2.style.animation = 'introPulse 2.4s ease-out 0.8s infinite'; ring2.style.opacity = '1';
    showIcon('lock');
  };

  /* ── 타이핑 시작 ── */
  var extSkip = _introTyping(lineEl, curEl, introText, function onDone() {
    skipBar.style.opacity = '0'; skipBar.style.pointerEvents = 'none';
    /* 3초 후 또는 인터랙션 시 lock 표시 */
    var shown = false;
    var doShow = function() {
      if (shown) return; shown = true;
      clearTimeout(autoT);
      document.removeEventListener('mousemove', doShow);
      document.removeEventListener('keydown', doShow);
      document.removeEventListener('touchstart', doShow);
      showLockFn();
    };
    var autoT = setTimeout(doShow, 3000);
    document.addEventListener('mousemove', doShow);
    document.addEventListener('keydown', doShow);
    document.addEventListener('touchstart', doShow, {passive:true});
    window.addEventListener('devicemotion', function(ev) {
      var a = ev.acceleration; if (!a) return;
      if (Math.abs(a.x||0) + Math.abs(a.y||0) + Math.abs(a.z||0) > 15) doShow();
    }, {passive:true});

    /* lock 표시 후 터치 시 bars 표시 → 5초 idle 후 숨김 (자물쇠 터치는 제외) */
    setupBarInteraction();
  });

  /* skip bar: 400ms 후 표시 */
  setTimeout(function() { skipBar.style.opacity = '1'; skipBar.style.pointerEvents = 'auto'; }, 400);

  /* skip 버튼 */
  skipBtn.addEventListener('click', function() {
    extSkip();
    skipBar.style.opacity = '0'; skipBar.style.pointerEvents = 'none';
    setTimeout(showLockFn, 420);
    setupBarInteraction();
  });

  /* ── enter (lock 클릭) — 데스크탑과 동일한 글로우→입자→흰색fade→goTo ── */
  var doEnter = function() {
    if (!lockShown) return;
    /* onInteract 리스너 제거 — doEnter 중 bars 재표시 방지 */
    if (_mobIntroOnInteract) {
      document.removeEventListener('touchstart', _mobIntroOnInteract);
      document.removeEventListener('keydown', _mobIntroOnInteract);
      _mobIntroOnInteract = null;
    }
    /* 인트로 keydown 리스너 제거 — 씬 진입 후 이중 goTo 방지 */
    document.removeEventListener('keydown', _introKeyHandler);
    clearTimeout(idleTimer);
    hideBars();
    showIcon('unlock');
    /* ring 애니메이션 중단 */
    ring1.style.animation = 'none'; ring1.style.opacity = '0';
    ring2.style.animation = 'none'; ring2.style.opacity = '0';

    /* 1. 글로우 펄스 (1000ms) — lineEl 기준 */
    var t0 = null;
    function glowLoop(ts) {
      if (!t0) t0 = ts;
      var elapsed = ts - t0;
      var g = Math.sin((elapsed / 1000) * Math.PI) * 22;
      lineEl.style.textShadow =
        '0 0 ' + g.toFixed(1) + 'px rgba(255,255,255,0.95),' +
        '0 0 ' + (g * 2.2).toFixed(1) + 'px rgba(255,255,255,0.4)';
      if (elapsed < 1000) { requestAnimationFrame(glowLoop); return; }

      lineEl.style.textShadow = '';
      /* 2. 텍스트/lock/bar 즉시 숨김 (transition 없이 — 씬 전환 전 잔상 방지) */
      /* 좌표 계산 — removeChild 전에 (제거 후 getBoundingClientRect는 0 반환) */
      var lineR = lineEl.getBoundingClientRect();
      var frameR = frame.getBoundingClientRect();

      /* 잔상 방지 — opacity 숨김 대신 DOM에서 직접 제거 */
      [lineEl, lockWrap, skipBar, modeBar, langBar].forEach(function(el) {
        if (el && el.parentNode) el.parentNode.removeChild(el);
      });

      /* 3. 입자 산개 + 흰색 fade */
      var cx = lineR.left + lineR.width  * 0.5;
      var cy = lineR.top  + lineR.height * 0.5;
      var tw = lineR.width, th = lineR.height;
      var DURATION = 2000, whiteDone = false, timers = [], rafs = {};

      /* 입자 전체 제거 */
      function cleanupParticles() {
        Object.keys(rafs).forEach(function(k) { cancelAnimationFrame(rafs[k]); });
        timers.forEach(function(t) { clearTimeout(t); });
        document.querySelectorAll('[data-intro-particle]').forEach(function(el) { el.remove(); });
      }

      function startWhiteFade() {
        if (whiteDone) return; whiteDone = true;
        /* 컨트롤 패널 색상 — 흰색 fade와 동시에 #333으로 전환 */
        bottom.style.transition = 'background 200ms ease';
        bottom.style.background = '#333';
        /* frame(정사각형)만 흰색 fade */
        var cv = document.createElement('div'); cv.id = '_introCanvas';
        cv.style.cssText =
          'position:fixed;left:' + frameR.left + 'px;top:' + frameR.top + 'px;' +
          'width:' + frameR.width + 'px;height:' + frameR.height + 'px;' +
          'pointer-events:none;z-index:9999;background:#fff;opacity:0;transition:opacity 800ms ease;';
        document.documentElement.appendChild(cv);
        requestAnimationFrame(function() { requestAnimationFrame(function() {
          cv.style.opacity = '1';
          setTimeout(function() {
            cleanupParticles();
            try { sessionStorage.removeItem('gl_mode'); } catch(e) {}
            try { if (sessionStorage.getItem('intro_mode') !== 'MANUAL') sessionStorage.setItem('mol_autoplay_start', '1'); } catch(e) {}
            window.goTo(TARGET, {direct: true});
          }, 800);
        }); });
      }

      /* 입자 22개 — data-intro-particle 속성으로 추적 */
      for (var i = 0; i < 22; i++) {
        (function(idx) {
          var sz  = 3 + Math.random() * 5;
          var sx  = cx + (Math.random() - 0.5) * tw;
          var sy  = cy + (Math.random() - 0.5) * th;
          var a   = -Math.PI * 0.5 + (Math.random() - 0.5) * Math.PI * 1.2;
          var sp  = 0.3 + Math.random() * 0.8;
          var vx  = Math.cos(a) * sp, vy = Math.sin(a) * sp;
          var dur = DURATION * (0.7 + Math.random() * 0.5);
          var p   = document.createElement('div');
          p.setAttribute('data-intro-particle', '1');
          p.style.cssText = 'position:fixed;width:' + sz + 'px;height:' + (sz * 0.6) + 'px;' +
            'border-radius:50%;left:' + sx + 'px;top:' + sy + 'px;' +
            'pointer-events:none;z-index:9998;opacity:0;' +
            'background:radial-gradient(ellipse at center,rgba(255,255,255,0.95) 10%,' +
              'rgba(220,220,220,0.3) 50%,transparent 80%);' +
            'box-shadow:0 0 ' + (sz * 1.2) + 'px rgba(255,255,255,0.25);';
          document.body.appendChild(p);
          var st = null, curX = sx, curY = sy, curVy = vy;
          function frame2(ts) {
            if (!st) st = ts;
            var t = (ts - st) / dur;
            curX += vx; curY += curVy; curVy += 0.004;
            p.style.left = curX + 'px'; p.style.top = curY + 'px';
            p.style.opacity = Math.max(0, Math.min(t * 4, 1) * (1 - t)).toFixed(3);
            if (t < 1) rafs['p' + idx] = requestAnimationFrame(frame2); else p.remove();
          }
          timers.push(setTimeout(function() { rafs['p' + idx] = requestAnimationFrame(frame2); }, idx * 20));
        })(i);
      }
      timers.push(setTimeout(startWhiteFade, DURATION * 0.3));
      timers.push(setTimeout(function() {
        cleanupParticles();
        startWhiteFade();
      }, DURATION));
    }
    requestAnimationFrame(glowLoop);
  };
  lockBtn.addEventListener('click', doEnter);
  lockBtn.addEventListener('touchend', function(e) { e.preventDefault(); doEnter(); }, {passive:false});

  /* ── 키보드 ── */
  var _introKeyHandler = function(e) {
    if (e.key !== 'Enter' && e.key !== 'Escape' && e.key !== 'ArrowRight') return;
    if (lockShown) {
      doEnter();
    } else {
      document.removeEventListener('keydown', _introKeyHandler);
      try { sessionStorage.removeItem('gl_mode'); } catch(err) {}
      try { if (sessionStorage.getItem('intro_mode') !== 'MANUAL') sessionStorage.setItem('mol_autoplay_start', '1'); } catch(err) {}
      window.goTo(TARGET, {direct: true});
    }
  };
  document.addEventListener('keydown', _introKeyHandler);
}

/* ──────────────────────────────────────────
 * 데스크탑 인트로 렌더링
 * ────────────────────────────────────────── */
function _renderIntroDesktop(app, introText, TARGET) {
  /* SVG 상수 */
  var LOCK_SVG   = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="rgba(200,200,200,0.75)" style="width:28px;height:28px;">' +
    '<path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"/></svg>';
  var UNLOCK_SVG = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="rgba(200,200,200,0.75)" style="width:28px;height:28px;">' +
    '<path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"/></svg>';

  /* ── 배경 래퍼 ── */
  var bgWrap = document.createElement('div');
  bgWrap.style.cssText = 'position:absolute;inset:0;background:#222222;display:grid;place-items:center;overflow:hidden;';

  /* 정사각형 프레임 */
  var sq = document.createElement('div');
  sq.style.cssText = 'position:absolute;left:50%;top:50%;transform:translate(-50%,-50%) translateZ(0);' +
    'width:min(100vw,var(--vh100,100vh));aspect-ratio:1/1;' +
    'background:linear-gradient(to bottom,#303030 0%,#222222 100%);overflow:hidden;';

  /* 텍스트 */
  var lineEl = document.createElement('div');
  lineEl.style.cssText = 'position:absolute;left:50%;top:44%;transform:translate(-50%,-50%);' +
    'font-size:clamp(24px,6.2vw,42px);line-height:1.55;letter-spacing:0.2px;' +
    'white-space:pre-wrap;word-break:keep-all;text-align:center;' +
    'color:rgba(235,235,235,0.94);font-family:"Nanum Pen Script",cursive;width:80%;';
  var curEl = document.createElement('span');
  curEl.style.cssText = 'display:inline-block;width:2px;height:1em;background:rgba(220,220,220,0.85);' +
    'vertical-align:text-bottom;margin-left:2px;';
  lineEl.appendChild(curEl);
  sq.appendChild(lineEl);

  /* lock wrap (bottom 28%) + pulse rings */
  var lockWrap = document.createElement('div');
  lockWrap.style.cssText = 'position:absolute;bottom:28%;left:50%;transform:translateX(-50%);' +
    'display:inline-grid;place-items:center;';
  lockWrap.style.visibility = 'hidden';

  var ring1 = document.createElement('div');
  ring1.style.cssText = 'position:absolute;width:68px;height:68px;border-radius:999px;' +
    'border:1.5px solid rgba(255,255,255,0.22);opacity:0;pointer-events:none;';
  var ring2 = document.createElement('div');
  ring2.style.cssText = 'position:absolute;width:68px;height:68px;border-radius:999px;' +
    'border:1px solid rgba(255,255,255,0.14);opacity:0;pointer-events:none;';
  lockWrap.appendChild(ring1); lockWrap.appendChild(ring2);

  var lockBtn = document.createElement('button'); lockBtn.type = 'button';
  lockBtn.style.cssText = 'margin:0;width:68px;height:68px;border-radius:999px;display:grid;place-items:center;' +
    'background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.18);' +
    'cursor:pointer;user-select:none;-webkit-tap-highlight-color:transparent;opacity:0;pointer-events:none;';
  lockBtn.innerHTML = LOCK_SVG;
  lockWrap.appendChild(lockBtn);
  sq.appendChild(lockWrap);

  /* skip bar */
  var skipBar = document.createElement('div');
  skipBar.style.cssText = 'position:absolute;left:50%;transform:translateX(-50%);' +
    'bottom:calc(6% + env(safe-area-inset-bottom) + 8px);opacity:0;transition:opacity 2000ms ease;pointer-events:none;';
  var skipBtn = document.createElement('button'); skipBtn.type = 'button'; skipBtn.textContent = 'skip';
  skipBtn.style.cssText = 'width:36px;height:36px;border-radius:999px;display:grid;place-items:center;' +
    'background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.12);' +
    'color:rgba(235,235,235,0.70);font-family:"Nanum Pen Script",cursive;font-size:13px;' +
    'cursor:pointer;-webkit-tap-highlight-color:transparent;';
  skipBar.appendChild(skipBtn);
  sq.appendChild(skipBar);

  /* 하단 좌: 모드 원형 버튼 */
  var modeBar = _introModeBtn();
  sq.appendChild(modeBar);
  sq.appendChild(modeBar._tip);

  /* 하단 우: 언어 원형 버튼 */
  var langBar = _introLangBtn();
  sq.appendChild(langBar);
  sq.appendChild(langBar._tip);

  /* 상단 좌: 작가의 말 버튼 */
  var aboutBtn = _introAboutBtn();
  sq.appendChild(aboutBtn);
  sq.appendChild(aboutBtn._tip);

  /* 상단 우: 이용 안내 버튼 */
  var helpBtn = _introHelpBtn();
  sq.appendChild(helpBtn);
  sq.appendChild(helpBtn._tip);

  bgWrap.appendChild(sq);
  app.appendChild(bgWrap);
  /* introApp(정적 플레이스홀더) fade-out 후 제거 */
  _fadeOutIntroApp();

  /* ── helpers ── */
  var lockShown = false;
  var idleTimer = null;
  var _deskIntroOnInteract = null;
  var showIcon = function(name) { lockBtn.innerHTML = (name === 'lock') ? LOCK_SVG : UNLOCK_SVG; };
  var showBars = function() {
    [modeBar, langBar, aboutBtn, helpBtn].forEach(function(el) {
      el.style.opacity = '1'; el.style.pointerEvents = '';
    });
    [modeBar._tip, langBar._tip].forEach(function(el) { el.style.pointerEvents = ''; });
  };
  var hideBars = function() {
    [modeBar, langBar, aboutBtn, helpBtn].forEach(function(el) {
      el.style.opacity = '0'; el.style.pointerEvents = 'none';
    });
    [modeBar._tip, langBar._tip].forEach(function(el) {
      el.style.opacity = '0'; el.style.pointerEvents = 'none';
    });
  };
  var showLockFn = function() {
    if (lockShown) return; lockShown = true;
    curEl.style.animation = 'none'; curEl.style.opacity = '0';
    lockWrap.style.visibility = '';
    lockBtn.style.opacity = ''; lockBtn.style.pointerEvents = '';
    lockBtn.style.animation =
      'introFadeBreathD 1.2s ease-in-out 1 forwards,' +
      'introBreatheD 2.8s ease-in-out 1.2s infinite,' +
      'introGlow 2.8s ease-in-out 2s infinite';
    ring1.style.animation = 'introPulse 2.4s ease-out infinite'; ring1.style.opacity = '1';
    ring2.style.animation = 'introPulse 2.4s ease-out 0.8s infinite'; ring2.style.opacity = '1';
    showIcon('lock');
    CursorHide.start();
  };

  /* ── 타이핑 시작 ── */
  var extSkip = _introTyping(lineEl, curEl, introText, function onDone() {
    skipBar.style.opacity = '0'; skipBar.style.pointerEvents = 'none';
    var shown = false;
    var doShow = function() {
      if (shown) return; shown = true;
      clearTimeout(autoT);
      document.removeEventListener('mousemove', doShow);
      document.removeEventListener('keydown', doShow);
      document.removeEventListener('touchstart', doShow);
      showLockFn();
    };
    var autoT = setTimeout(doShow, 3000);
    document.addEventListener('mousemove', doShow);
    document.addEventListener('keydown', doShow);
    document.addEventListener('touchstart', doShow, {passive:true});

    /* lock 표시 후 idle: bars 표시/숨김 */
    var onInteract = function() { showBars(); clearTimeout(idleTimer); idleTimer = setTimeout(hideBars, 5000); };
    document.addEventListener('mousemove', onInteract);
    document.addEventListener('keydown', onInteract);
    document.addEventListener('touchstart', onInteract, {passive:true});
    _deskIntroOnInteract = onInteract;
  });

  /* skip bar: 400ms 후 표시 */
  setTimeout(function() { skipBar.style.opacity = '1'; skipBar.style.pointerEvents = 'auto'; }, 400);

  /* skip 버튼 */
  skipBtn.addEventListener('click', function() {
    extSkip();
    skipBar.style.opacity = '0'; skipBar.style.pointerEvents = 'none';
    setTimeout(showLockFn, 420);
    showBars();
  });

  /* hover 중 bars 표시 (lock 전) */
  var onHover = function() { showBars(); clearTimeout(idleTimer); idleTimer = setTimeout(hideBars, 5000); };
  document.addEventListener('mousemove', onHover);
  document.addEventListener('keydown', onHover);

  /* hover: lock ↔ unlock */
  lockBtn.addEventListener('mouseenter', function() { if (lockShown) showIcon('unlock'); });
  lockBtn.addEventListener('mouseleave', function() { if (lockShown) showIcon('lock'); });

  /* ── enter — 데스크탑: 글로우 → 입자 → 흰색 fade → goTo ── */
  var doEnter = function() {
    if (!lockShown) return;
    /* 인트로 keydown 리스너 제거 — 씬 진입 후 이중 goTo 방지 */
    document.removeEventListener('keydown', _introKeyHandlerDesktop);
    /* onInteract 리스너 제거 — doEnter 중 bars 재표시 방지 */
    if (_deskIntroOnInteract) {
      document.removeEventListener('mousemove', _deskIntroOnInteract);
      document.removeEventListener('keydown', _deskIntroOnInteract);
      document.removeEventListener('touchstart', _deskIntroOnInteract);
      _deskIntroOnInteract = null;
    }
    clearTimeout(idleTimer);
    showIcon('unlock');
    var t0 = null;
    function glowLoop(ts) {
      if (!t0) t0 = ts;
      var elapsed = ts - t0;
      var g = Math.sin((elapsed / 1000) * Math.PI) * 22;
      lineEl.style.textShadow =
        '0 0 ' + g.toFixed(1) + 'px rgba(255,255,255,0.95),' +
        '0 0 ' + (g * 2.2).toFixed(1) + 'px rgba(255,255,255,0.4)';
      if (elapsed < 1000) { requestAnimationFrame(glowLoop); return; }

      lineEl.style.textShadow = '';
      /* 좌표 계산 — removeChild 전에 (제거 후 getBoundingClientRect는 0 반환) */
      var lineR = lineEl.getBoundingClientRect();
      var sqR   = sq.getBoundingClientRect();
      /* 잔상 방지 — opacity 숨김 대신 DOM에서 직접 제거 */
      [lineEl, lockWrap, langBar, modeBar, langBar._tip, modeBar._tip, aboutBtn, aboutBtn._tip, helpBtn, helpBtn._tip, skipBar].forEach(function(el) {
        if (el && el.parentNode) el.parentNode.removeChild(el);
      });

      /* 입자 산개 + 흰색 fade */
      var cx = lineR.left + lineR.width  * 0.5;
      var cy = lineR.top  + lineR.height * 0.5;
      var tw = lineR.width, th = lineR.height;
      var DURATION = 3000, whiteDone = false, timers = [], rafs = {};

      function cleanupParticles() {
        Object.keys(rafs).forEach(function(k) { cancelAnimationFrame(rafs[k]); });
        timers.forEach(function(t) { clearTimeout(t); });
        document.querySelectorAll('[data-intro-particle]').forEach(function(el) { el.remove(); });
      }

      function startWhiteFade() {
        if (whiteDone) return; whiteDone = true;
        cleanupParticles();
        /* gallery.js _applyScene()이 인식하는 id(_introCanvas) 사용 — div 방식 */
        var cv = document.createElement('div'); cv.id = '_introCanvas';
        cv.style.cssText = 'position:fixed;left:' + sqR.left + 'px;top:' + sqR.top + 'px;' +
          'width:' + Math.ceil(sqR.width) + 'px;height:' + Math.ceil(sqR.height) + 'px;' +
          'pointer-events:none;z-index:9999;background:#fff;opacity:0;transition:opacity 2000ms ease;';
        document.documentElement.appendChild(cv);
        requestAnimationFrame(function() { requestAnimationFrame(function() {
          cv.style.opacity = '1';
          setTimeout(function() {
            try { sessionStorage.removeItem('gl_mode'); } catch(e) {}
            try { if (sessionStorage.getItem('intro_mode') !== 'MANUAL') sessionStorage.setItem('mol_autoplay_start', '1'); } catch(e) {}
            window.goTo(TARGET, {direct: true});
          }, 2000);
        }); });
      }

      /* 입자 22개 */
      for (var i = 0; i < 22; i++) {
        (function(idx) {
          var sz  = 3 + Math.random() * 5;
          var sx  = cx + (Math.random() - 0.5) * tw;
          var sy  = cy + (Math.random() - 0.5) * th;
          var a   = -Math.PI * 0.5 + (Math.random() - 0.5) * Math.PI * 1.2;
          var sp  = 0.3 + Math.random() * 0.8;
          var vx  = Math.cos(a) * sp, vy = Math.sin(a) * sp;
          var dur = DURATION * (0.7 + Math.random() * 0.5);
          var p   = document.createElement('div');
          p.style.cssText = 'position:fixed;width:' + sz + 'px;height:' + (sz * 0.6) + 'px;' +
            'border-radius:50%;left:' + sx + 'px;top:' + sy + 'px;' +
            'pointer-events:none;z-index:9998;opacity:0;' +
            'background:radial-gradient(ellipse at center,rgba(255,255,255,0.95) 10%,' +
              'rgba(220,220,220,0.3) 50%,transparent 80%);' +
            'box-shadow:0 0 ' + (sz * 1.2) + 'px rgba(255,255,255,0.25);';
          p.setAttribute('data-intro-particle', '1');
          document.body.appendChild(p);
          var st = null, curX = sx, curY = sy, curVy = vy;
          function frame(ts) {
            if (!st) st = ts;
            var t = (ts - st) / dur;
            curX += vx; curY += curVy; curVy += 0.004;
            p.style.left = curX + 'px'; p.style.top = curY + 'px';
            p.style.opacity = Math.max(0, Math.min(t * 4, 1) * (1 - t)).toFixed(3);
            if (t < 1) rafs['p' + idx] = requestAnimationFrame(frame); else p.remove();
          }
          timers.push(setTimeout(function() { rafs['p' + idx] = requestAnimationFrame(frame); }, idx * 20));
        })(i);
      }
      timers.push(setTimeout(startWhiteFade, DURATION * 0.3));
      timers.push(setTimeout(function() {
        Object.keys(rafs).forEach(function(k) { cancelAnimationFrame(rafs[k]); });
        startWhiteFade();
      }, DURATION));
    }
    requestAnimationFrame(glowLoop);
  };
  lockBtn.addEventListener('click', doEnter);

  /* ── 키보드 ── */
  var _introKeyHandlerDesktop = function(e) {
    if (e.key !== 'Enter' && e.key !== 'Escape' && e.key !== 'ArrowRight') return;
    if (lockShown) {
      doEnter();
    } else {
      document.removeEventListener('keydown', _introKeyHandlerDesktop);
      try { sessionStorage.removeItem('gl_mode'); } catch(err) {}
      try { if (sessionStorage.getItem('intro_mode') !== 'MANUAL') sessionStorage.setItem('mol_autoplay_start', '1'); } catch(err) {}
      window.goTo(TARGET, {direct: true});
    }
  };
  document.addEventListener('keydown', _introKeyHandlerDesktop);
}



/* ============================================================
   Z. INIT
   ============================================================ */

/* 갤러리 DOM을 최초 1회 생성 — idempotent
   씬 직접 접근 시: init()에서 호출
   index.html SPA 진입 시: _applyScene()에서 최초 goTo() 때 호출 */
var _appReady = false;
function _ensureAppReady() {
  if (_appReady) return;
  _appReady = true;
  injectCSS();
  if (isMobile) {
    var bo = document.createElement('div'); bo.id = 'blackout'; document.body.appendChild(bo);
    var appEl = document.createElement('div'); appEl.id = 'app'; document.body.appendChild(appEl);
    appEl.style.background = '#000'; appEl.style.opacity = '0';
    document.body.insertAdjacentHTML('beforeend', buildOverlayHTML());
  } else {
    var existingApp = document.getElementById('app');
    if (existingApp) existingApp.parentNode.removeChild(existingApp);
    document.body.insertAdjacentHTML('afterbegin', buildOverlayHTML());
  }
  ensureSPAOverlays();
  bindCommonEvents();
  if (!window.THIS_SCENE) {
    /* index.html 컨텍스트 — introApp을 #app 위에 overlay로 유지
       실제 인트로 준비 완료 시점에 fadeout 후 제거 */
    var introApp = document.getElementById('introApp');
    if (introApp) {
      introApp.style.cssText += ';position:fixed;inset:0;z-index:9999;transition:opacity 300ms ease;';
    }
    document.body.removeAttribute('style');
    document.body.style.background = '#000';
    document.documentElement.style.background = '#000';
  }
}

function init() {
  if (window.THIS_SCENE) {
    /* 씬 HTML 직접 접근 */
    _ensureAppReady();
    /* 모바일: _ensureAppReady에서 opacity:0으로 설정된 #app을 즉시 표시
       (인트로 흐름을 거치지 않으므로 여기서 직접 복구) */
    var appEl = document.getElementById('app');
    if (appEl) appEl.style.opacity = '1';
    var url = location.pathname || location.href;
    NavigationManager.initScene(url, window.THIS_SCENE);
    SceneRenderer.renderScene(window.THIS_SCENE, url, 'none');
  } else {
    /* index.html SPA 진입 — 갤러리 DOM 생성 후 인트로 렌더링 */
    _ensureAppReady();
    renderIntro();
  }
}

if (document.readyState==='loading') document.addEventListener('DOMContentLoaded', init);
else init();
})();
