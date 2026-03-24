/* ================================================================
   gallery.js — Vitro Narida MOL  VER_31
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
}
.scene-text.show { opacity: 1; transform: translateY(0); }
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

  .soloToggle{ position:absolute; top:6%; right:6%; z-index:60; width:52px; height:52px; }

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

  /* Photo Only 모드 - soloToggle 항상 표시 */
  body.ui-hide-all .nav_arrow, body.ui-hide-all .nav-menu{ opacity:0; visibility:hidden; pointer-events:none;
    transition: opacity 1200ms ease, visibility 1200ms ease; }
  body.ui-hide-all.solo-peek .nav-arrow, body.ui-hide-all.solo-peek .nav-menu{ opacity:0.92 !important; visibility:visible !important; pointer-events:auto !important;
    transition: opacity 300ms ease, visibility 0ms !important; }

  body.ui-text-only .nav-arrow, body.ui-text-only .nav-menu, body.ui-text-only .nav-btn:not(.soloToggle), body.ui-text-only .work-code{ 
  opacity:0 !important; visibility:hidden !important; pointer-events:none !important; }
  body.ui-text-only .soloToggle{ opacity:0 !important; visibility:hidden !important; pointer-events:none !important;
    transition: opacity 1200ms ease, visibility 1200ms ease; }
  body.ui-hide-all .nav-btn:not(.soloToggle){ opacity:0; visibility:hidden; pointer-events:none;
    transition: opacity 1200ms ease, visibility 1200ms ease; }
  body.ui-hide-all.solo-peek .nav-btn:not(.soloToggle){ opacity:0.92 !important; visibility:visible !important; pointer-events:auto !important;
    transition: opacity 300ms ease, visibility 0ms !important; }
  body.ui-text-only .fog-text, body.ui-text-only .scene-text{ pointer-events:none !important; }
  body.ui-text-only .nav-arrow, body.ui-text-only .nav-menu{ transition: opacity 1200ms ease, visibility 1200ms ease; }
  body.ui-text-only.solo-peek .nav-arrow, body.ui-text-only.solo-peek .nav-menu{ opacity:0.92 !important; visibility:visible !important; pointer-events:auto !important;
    transition: opacity 300ms ease, visibility 0ms !important; }
  body.ui-text-only.solo-peek .soloToggle{ opacity:0.92 !important; visibility:visible !important; pointer-events:auto !important;
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
  white-space:nowrap; overflow:hidden; }
  .fog-text > *, .scene-text > *{ max-width:95%; display:inline-block; }
  .fog-text{ transition: opacity var(--fog-text-fade) ease, transform var(--fog-text-fade) ease; }
  .scene-text{ transition: opacity var(--scene-text-fade) ease, transform var(--scene-text-fade) ease; z-index:10; }
  .scene-text.long-text{ height:auto; white-space:pre-wrap; overflow:visible; }
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
  
  #pragueScreen .scene-text,
  #dreamsScreen .scene-text{ z-index:20 !important; }

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

  /* 인포 버튼 (왼쪽 하단) */
  .toc-info-btn{ position:absolute; bottom: 14px; left: 14px; right: auto; width: 36px; height: 36px;
  border-radius: 999px; display:grid; place-items:center; color: rgba(200,200,200,0.6);
  background: transparent; border: 1px solid rgba(255,255,255,0.05);
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
  .unified-bottom-bar{ position:absolute; bottom:12px; left:14px; display:flex; align-items:center; gap:6px; }
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

  /* ===== 오토플레이 바 ===== */
  .autoplay-bar{ position:absolute; top:6%; left:50%; transform:translate(-50%, 0); z-index:60;
    display:flex; gap:20px; align-items:center;
    opacity:0; pointer-events:none; transition:opacity 300ms ease; }
  .autoplay-bar.ap-visible{ opacity:1; pointer-events:auto; }
  .autoplay-scene-btn{ width:52px; height:52px; border-radius:999px;
    display:grid; place-items:center;
    background:rgba(0,0,0,0.35); border:1px solid rgba(255,255,255,0.15);
    color:rgba(235,235,235,0.82); cursor:pointer;
    transition:background 200ms ease, color 200ms ease, border-color 200ms ease; }
  .autoplay-scene-btn:hover{ background:rgba(0,0,0,0.6); color:rgba(255,255,255,1); border-color:rgba(255,255,255,0.35); }
  body.ap-peek .scene-text, body.ap-peek .fog-text{ opacity:0 !important; transition:opacity 300ms ease !important; }

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
  {id:"fog",      code:"LPL#01",kr:"안개가 휘감은 세상에",                      en:"In a world wrapped in fog",                               file:"LPL_01"},
  {id:"LPL_02",   code:"LPL#02",kr:"당신의 온기가 스며들면",                    en:"When your warmth seeps in",  file:"LPL_02"},
  {id:"LPL_03",   code:"LPL#03",kr:"세상은 본연의 모습을 되찾고",               en:"The world regains its true colors",                    file:"LPL_03"},
  {id:"dreams",   code:"LPL#04",kr:"그 품안에서 사랑의 꿈이 일렁입니다",        en:"In that embrace, dreams of love ripple",           file:"LPL_04"},
  {id:"dreams00", code:"LDR#00",kr:"사랑의 꿈은",                              en:"Dreams of love",                                       file:"LDR_00"},
  {id:"dreams01", code:"LDR#11",kr:"이끌림을 따라",                            en:"Following the pull",                                   file:"LDR_11"},
  {id:"dreams02", code:"LDR#21",kr:"설렘에 실려",                              en:"Carried by excitement",                                file:"LDR_21"},
  {id:"dreams03", code:"LDR#31",kr:"그리움과 함께 넓어지며",                   en:"Expanding with longing",                               file:"LDR_31"},
  {id:"dreams04", code:"LDR#41",kr:"애틋함으로 깊어져",                        en:"Deepening with tenderness",                            file:"LDR_41"},
  {id:"dreams05", code:"LDR#51",kr:"행복의 바다에 이르고",                     en:"Reaching the sea of happiness",                        file:"LDR_51"},
  {id:"song01",   code:"LSN#01",kr:"사랑의 노래가 되어",                       en:"Becoming a song of love",                              file:"LSN_01"},
  {id:"song02",   code:"LSN#02",kr:"당신만을 바라고 또 바라 봅니다",            en:"I gaze at you, and gaze again",                        file:"LSN_02"},
  {id:"song03",   code:"LSN#03",kr:"어제, 오늘 그리고 내일",                   en:"Yesterday, today, and tomorrow",                       file:"LSN_03"},
  {id:"song04",   code:"LSN#04",kr:"하루의 모든 순간",                         en:"Every moment of the day",                              file:"LSN_04"},
  {id:"song05",   code:"LSN#05",kr:"잠 못 이루는 밤",                          en:"Sleepless nights",                                     file:"LSN_05"},
  {id:"song06",   code:"LSN#06",kr:"꿈속에서도",                               en:"Even in dreams",                                       file:"LSN_06"},
  {id:"song07",   code:"LSN#07",kr:"내가 머물고 싶은 공간",                    en:"The space I want to dwell",                            file:"LSN_07"},
  {id:"song08",   code:"LSN#08",kr:"끝없이 샘솟는 기쁨",                       en:"Endlessly springing joy",                              file:"LSN_08"},
  {id:"song09",   code:"LSN#09",kr:"마음을 울리는 노래 속에도",                en:"Even in songs that move my heart",                     file:"LSN_09"},
  {id:"song10",   code:"LSN#10",kr:"언제나 당신이 있습니다",                   en:"You are always there",                                 file:"LSN_10"},
  {id:"song11",   code:"LSN#11",kr:"당신의",                                   en:"Your",                                                 file:"LSN_11"},
  {id:"song12",   code:"LSN#12",kr:"해맑은 미소와 따스한 온기에",              en:"Pure smile and warm embrace",                          file:"LSN_12"},
  {id:"song13",   code:"LSN#13",kr:"모든 순간이 낙원이 되고",                  en:"Every moment becomes paradise",                        file:"LSN_13"},
  {id:"song14",   code:"LSN#14",kr:"온 세상이 사랑으로 물들면",                en:"When the whole world is tinted with love",             file:"LSN_14"},
  {id:"song15",   code:"LSN#15",kr:"나는 당신의 사랑안에서",                   en:"In your love",                                         file:"LSN_15"},
  {id:"song16",   code:"LSN#16",kr:"새로이 태어납니다",                        en:"I am born anew",                                       file:"LSN_16"},
  {id:"LEL_01", code:"LEL#01",kr:"사랑이 감싸 안은 세상,\n세상도 내 마음도 사랑으로 가득합니다",                    en:"A world embraced by love,\nthe world and my heart are filled with love",                             file:"LEL_01"},
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
var S = {
  currentURL:   null,
  currentScene: null,
  _navigating:  false,
  _fogRAF:      null,
  _introActive: false
};

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

function fetchScene(url) {
  return fetch(url)
    .then(function(r){ if(!r.ok) throw new Error('HTTP '+r.status); return r.text(); })
    .then(function(html){ return extractScene(html); });
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
    '#white-overlay{position:fixed;inset:0;background:#fff;pointer-events:none;opacity:0;z-index:8100;}',
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
    '@keyframes sceneCurBlink{0%,100%{opacity:1}50%{opacity:0}}',
  ].join('\n');
  document.head.appendChild(extra);
}

/* ============================================================
   H. OVERLAY HTML (한 번만 삽입)
   ============================================================ */
function buildOverlayHTML() {
  var t = LANG_TEXTS[curLang];
  var sc = S.currentScene || {};
  var langToggle = isMobile
    ? ('<div class="lang-toggle"><div class="lang-btn'+(curLang==='KR'?' active':'')+'" data-lang="KR">KR</div>'
      +'<div class="lang-btn'+(curLang==='EN'?' active':'')+'" data-lang="EN">EN</div></div>')
    : ('<div class="langToggle"><div class="langBtn'+(curLang==='EN'?' active':'')+'" data-lang="EN" tabindex="0">EN</div>'
      +'<div class="langBtn'+(curLang==='KR'?' active':'')+'" data-lang="KR" tabindex="0">KR</div></div>');

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
      +'<div class="menu-section"><div style="display:flex;gap:8px;align-items:center;padding-left:8px;">'
      +langToggle
      +'<div id="tocAutoPlayBtn" style="width:32px;height:32px;display:flex;align-items:center;justify-content:center;cursor:pointer;opacity:0.5;margin-left:4px;" tabindex="0">'
      +'<svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:20px;height:20px;"><path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"/></svg>'
      +'</div>'
      +'<div id="tocInfoBtn" style="width:32px;height:32px;display:flex;align-items:center;justify-content:center;cursor:pointer;opacity:0.5;margin-left:4px;">'
      +'<svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:20px;height:20px;"><path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.064.852l-.708 2.836a.75.75 0 0 0 1.064.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"/></svg>'
      +'</div></div></div>'
      +'</div>'
      +'<div class="mob-unified-right">'
      +'<div class="mob-right-header"><h3 class="mob-col-title">'+t.indexTitle+'</h3><div style="display:flex;align-items:center;gap:6px;"><div class="mob-expand-btn" id="mobExpandBtn"><svg viewBox="0 0 24 24"><path d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9m11.25-5.25v4.5m0-4.5h-4.5m4.5 0L15 9m-11.25 11.25v-4.5m0 4.5h4.5m-4.5 0L9 15m11.25 5.25v-4.5m0 4.5h-4.5m4.5 0L15 15"/></svg></div><div class="toc-close" id="tocClose">✕</div></div></div>'
      +'<div class="mob-thumb-grid" id="mobThumbGrid"></div>'
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
      +'<div class="unified-bottom-bar">'
      +langToggle
      +'<div id="tocAutoPlayBtn" class="toc-info-btn" tabindex="0" title="'+(curLang==='KR'?'자동 감상':'Auto Play')+'">'
      +'<svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:18px;height:18px;"><path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"/></svg>'
      +'</div>'
      +'<div class="toc-info-btn" id="tocInfoBtn" tabindex="0">'
      +'<svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:18px;height:18px;"><path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.064.852l-.708 2.836a.75.75 0 0 0 1.064.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"/></svg>'
      +'</div></div></div>'
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
    t.style.cssText='position:fixed;inset:0;background:#000;pointer-events:none;opacity:0;z-index:8000;';
    document.body.appendChild(t);
  }
  if (!$id('white-overlay')) {
    var w = document.createElement('div'); w.id='white-overlay';
    w.style.cssText='position:fixed;inset:0;background:#fff;pointer-events:none;opacity:0;z-index:8100;';
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
   J. goTo() — 모든 씬 전환
   ============================================================ */
window.goTo = function(url, opts) {
  if (S._navigating) return;
  if (!url) return;
  opts = opts || {};
  var direction = opts.direction || 'next';
  S._navigating = true;
  AutoPlay.onSceneChange();

  /* Case B: stanza 전환 — 현재 씬에 stanzaTransition:true 필드가 있고 next 방향이며 직접 이동이 아닌 경우 */
  if (direction === 'next' && !opts.direct && S.currentScene && S.currentScene.stanzaTransition) {
    _stanzaTransition(url);
    return;
  }

  /* Case C: 일반 전환 */
  ensureSPAOverlays();
  var o = $id('trans-overlay');
  o.style.transition = 'none'; o.style.opacity = '0'; o.offsetHeight;
  o.style.transition = 'opacity 300ms ease'; o.style.opacity = '1';

  setTimeout(function() {
    fetchScene(url).then(function(scene) {
      _applyScene(url, scene);
      setTimeout(function(){ transOverlay(0, 300); S._navigating=false; }, 50);
    }).catch(function(){ S._navigating=false; location.href=url; });
  }, 300);
};

function _applyScene(url, scene) {
  /* 모든 오버레이 즉시 닫기 */
  ['tocOverlay','thumbOverlay','sceneListOverlay','aboutOverlay','poemOverlay','helpOverlay','introOverlay','gbOverlay'].forEach(function(id){
    var el = document.getElementById(id);
    if (el) { el.classList.remove('on'); el.setAttribute('aria-hidden','true'); el.style.display='none'; el.style.opacity=''; }
  });
  S.currentURL   = url;
  S.currentScene = scene;
  sceneURL_       = url;
  history.pushState({ url:url }, '', url);
  renderScene(scene, url);
  /* 오토플레이 중 모바일 nav-bar 업데이트 */
  if(isMobile && AutoPlay.isActive()) setTimeout(function(){ AutoPlay.updateNavBar(); }, 50);
}

/* ============================================================
   J-1. 연 단위 전환 (_stanzaTransition)
   ============================================================ */
function _stanzaTransition(destURL) {
  var app    = $id('app');
  var textEl = app && (app.querySelector('.scene-text') || app.querySelector('.long-text'));

  if (!textEl) { _stanzaGoToDest(destURL); return; }

  /* t=1000: 텍스트 산화 + 입자 산개 */
  setTimeout(function() {
    var cursor = textEl.querySelector('.scene-cursor');
    if (cursor) { cursor.style.animation='none'; cursor.style.opacity='0'; }
    textEl.style.transition = 'opacity 900ms ease,filter 900ms ease';
    textEl.style.filter = 'blur(3px)'; textEl.style.opacity = '0';
    _stanzaSpawnParticles(app, textEl, function() { _stanzaGoToDest(destURL); });
  }, 1000);
}

function _stanzaGoToDest(destURL) {
  /* RST fetch 없이 목적지로 직행 */
  fetchScene(destURL).then(function(destScene) {
    ensureSPAOverlays();
    var o = $id('trans-overlay'); o.style.transition='none'; o.style.opacity='1'; o.offsetHeight;
    _applyScene(destURL, destScene);
    setTimeout(function(){ transOverlay(0,300); S._navigating=false; }, 80);
  }).catch(function(){ S._navigating=false; location.href=destURL; });
}

function _stanzaSpawnParticles(app, textEl, done) {
  var sq = app.querySelector('.square-frame') || app;

  /* 기준: square-frame */
  var sqR = sq.getBoundingClientRect();
  var sqW = sq.offsetWidth;

  /* 텍스트/커서 위치 (square-frame 기준 상대좌표) */
  var txtR = textEl.getBoundingClientRect();
  var cursor = textEl.querySelector('.scene-cursor');
  var curR = cursor ? cursor.getBoundingClientRect() : txtR;

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

  /* done 호출 (5200ms 후) */
  sched(function() {
    if (doneFired) return;
    doneFired = true;
    cleanup();
    if (done) done();
  }, 5200);
}

/* ============================================================
   K. renderScene() 디스패치
   ============================================================ */
var sceneURL_ = '';

function renderScene(scene, sceneURL) {
  if (S._fogRAF)    { cancelAnimationFrame(S._fogRAF);    S._fogRAF=null; }
  var app = $id('app'); if (!app) return;

  /* sceneURL_ 동기화 */
  sceneURL_ = sceneURL;

  /* app 내 씬 콘텐츠 초기화 */
  app.innerHTML = '';

  var imgSrc = resolveURL(sceneURL, scene.imgSrc);

  if      (scene.type==='fog')    renderFogScene(app, scene, imgSrc, sceneURL);
  else                             renderPhotoScene(app, scene, imgSrc, sceneURL);

  _bindSceneInput(scene, sceneURL);
  _updateTOCCurrent(scene);


  /* 인트로에서 자동 모드 버튼으로 진입한 경우 AutoPlay 자동 시작 */
  try {
    if (sessionStorage.getItem('mol_autoplay_start') === '1') {
      sessionStorage.removeItem('mol_autoplay_start');
      AutoPlay.activate();
    }
  } catch(e) {}

  /* viewport 높이 */
  document.documentElement.style.setProperty('--vh100', window.innerHeight+'px');
}

function _updateTOCCurrent(scene) {
  var sec = scene.tocSection || '';
  ['prologue','lovedream','lovesong','epilogue'].forEach(function(s) {
    var map = { prologue:'tocPrologue', lovedream:'tocLoveDream', lovesong:'tocLoveSong', epilogue:'tocEpilogue' };
    var el = $id(map[s]); if (!el) return;
    el.classList.toggle('toc-current', s===sec);
  });
}

/* ============================================================
   AUTO. AutoPlay — 자동 감상 모드 (데스크탑 전용)
   ============================================================ */
var AutoPlay = (function(){
  var _active   = false;
  var _timer    = null;   /* 3초 씬 이동 타이머 */
  var _idleTimer= null;   /* 마우스 idle → 커서 숨김 타이머 */
  var LAST_SCENE_ID = 'LEL_01';
  var DELAY_MS  = 3000;
  var IDLE_MS   = 1500;   /* 마우스 정지 후 커서 숨김까지 */
  var PAUSE_MS  = 2500;   /* 마우스 이동 후 자동 재개까지 */
  var _scene    = null;
  var _sceneURL = null;
  var _advTimerPaused = false; /* 마우스 이동으로 3초 타이머 일시정지 */

  /* --- 내부 유틸 --- */
  function _clearAll(){ clearTimeout(_timer); clearTimeout(_idleTimer); }

  function _getBar(){ return document.querySelector('.autoplay-bar'); }

  function _showButtons(){
    document.body.classList.add('ap-peek');
    var b=_getBar(); if(b) b.classList.add('ap-visible');
  }
  function _hideButtons(){
    document.body.classList.remove('ap-peek');
    var b=_getBar(); if(b) b.classList.remove('ap-visible');
  }

  /* --- idle 타이머: 마우스 정지 후 자동 재개 --- */
  function _startIdleTimer(){
    clearTimeout(_idleTimer);
    _idleTimer = setTimeout(function(){
      if(!_active) return;
      _hideButtons();
      if(_advTimerPaused && _scene && _scene.nextURL && _sceneURL){
        _advTimerPaused = false;
        _timer = setTimeout(function(){
          if(!_active) return;
          window.goTo(resolveURL(_sceneURL, _scene.nextURL), {direction:'next'});
        }, DELAY_MS);
      }
    }, IDLE_MS);
  }

  /* --- mousemove 핸들러 --- */
  function _onMouseMove(){
    if(!_active) return;
    _showButtons();
    clearTimeout(_timer);
    _advTimerPaused = true;
    _startIdleTimer();
  }

  var _paused = false;

  function _bindInteraction(){
    if(isMobile){
      document.removeEventListener('touchstart', _onTouch);
      document.addEventListener('touchstart', _onTouch, {passive:true});
    } else {
      document.removeEventListener('mousemove', _onMouseMove);
      document.addEventListener('mousemove', _onMouseMove);
    }
  }
  function _unbindInteraction(){
    document.removeEventListener('mousemove', _onMouseMove);
    document.removeEventListener('touchstart', _onTouch);
  }

  function _onTouch(e){
    if(!_active) return;
    if(e.target.closest('.nav-btn')) return;
    if(_paused) _resumeMobile(); else _pauseMobile();
  }

  function _pauseMobile(){
    if(!_active || _paused) return;
    _paused = true;
    clearTimeout(_timer);
    _updateNavBar();
  }

  function _resumeMobile(){
    if(!_active || !_paused) return;
    _paused = false;
    _updateNavBar();
    if(_scene && _scene.nextURL && _sceneURL){
      clearTimeout(_timer);
      _timer = setTimeout(function(){
        if(!_active || _paused) return;
        window.goTo(resolveURL(_sceneURL, _scene.nextURL), {direction:'next'});
      }, DELAY_MS);
    }
  }

  var PAUSE_SVG = '<svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:26px;height:26px;"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5"/></svg>';
  var PLAY_SVG  = '<svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:26px;height:26px;"><path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"/></svg>';
  var STOP_SVG  = '<svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:26px;height:26px;"><path stroke-linecap="round" stroke-linejoin="round" d="M5.25 7.5A2.25 2.25 0 0 1 7.5 5.25h9a2.25 2.25 0 0 1 2.25 2.25v9a2.25 2.25 0 0 1-2.25 2.25h-9a2.25 2.25 0 0 1-2.25-2.25v-9Z"/></svg>';
  var MENU_SVG  = '<svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:26px;height:26px;"><path stroke-linecap="round" stroke-linejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"/></svg>';
  var LIST_SVG  = '<svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:26px;height:26px;"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"/></svg>';

  function _updateNavBar(){
    if(!isMobile) return;
    var menuBtn = document.querySelector('.nav-bar .nav-btn:nth-child(2)');
    var listBtn = document.querySelector('.nav-bar .nav-btn:nth-child(3)');
    if(!menuBtn || !listBtn) return;
    if(_active){
      menuBtn.innerHTML = _paused ? PLAY_SVG : PAUSE_SVG;
      menuBtn.style.color = _paused ? 'rgba(212,175,55,0.9)' : '';
      /* 기존 TOC 핸들러 제거 후 ap핸들러 등록 */
      if(!menuBtn._origHandler){
        menuBtn._origHandler = TOCManager.open;
        menuBtn.removeEventListener('click', TOCManager.open);
      }
      if(!menuBtn._apHandler){
        menuBtn._apHandler = function(e){ e.stopPropagation(); _paused ? _resumeMobile() : _pauseMobile(); };
        menuBtn.addEventListener('click', menuBtn._apHandler);
      } else {
        menuBtn.innerHTML = _paused ? PLAY_SVG : PAUSE_SVG;
        menuBtn.style.color = _paused ? 'rgba(212,175,55,0.9)' : '';
      }
      listBtn.innerHTML = STOP_SVG;
      listBtn.style.color = 'rgba(212,175,55,0.7)';
      if(!listBtn._origHandler){
        listBtn._origHandler = SceneListManager.open;
        listBtn.removeEventListener('click', SceneListManager.open);
      }
      if(!listBtn._apHandler){
        listBtn._apHandler = function(e){ e.stopPropagation(); stop(); };
        listBtn.addEventListener('click', listBtn._apHandler);
      }
    } else {
      menuBtn.innerHTML = MENU_SVG; menuBtn.style.color = '';
      listBtn.innerHTML = LIST_SVG; listBtn.style.color = '';
      if(menuBtn._apHandler){ menuBtn.removeEventListener('click', menuBtn._apHandler); menuBtn._apHandler = null; }
      if(listBtn._apHandler){ listBtn.removeEventListener('click', listBtn._apHandler); listBtn._apHandler = null; }
      /* 기존 핸들러 복원 */
      if(menuBtn._origHandler){ menuBtn.addEventListener('click', menuBtn._origHandler); menuBtn._origHandler = null; }
      if(listBtn._origHandler){ listBtn.addEventListener('click', listBtn._origHandler); listBtn._origHandler = null; }
    }
  }

  function _bindInteraction(){
    document.removeEventListener('mousemove', _onMouseMove);
    document.addEventListener('mousemove', _onMouseMove);
  }
  function _unbindInteraction(){
    document.removeEventListener('mousemove', _onMouseMove);
  }

  /* --- 공개 API --- */

  /* 타이핑 완료 콜백 — 3초 후 다음 씬 이동 */
  function onTypingDone(scene, sceneURL){
    if(!_active || !scene) return;
    _scene = scene; _sceneURL = sceneURL;
    if(scene.id === LAST_SCENE_ID){ stop(); return; }
    _advTimerPaused = false;
    clearTimeout(_timer);
    if(_paused) return; /* pause 중이면 타이머 시작 안 함 */
    _timer = setTimeout(function(){
      if(!_active || _paused) return;
      if(scene.nextURL) window.goTo(resolveURL(sceneURL, scene.nextURL), {direction:'next'});
    }, DELAY_MS);
  }

  /* 씬 이동 감지 — goTo() 에서 호출 */
  function onSceneChange(){
    _clearAll();
    _advTimerPaused = false;
    /* _paused는 유지 — pause 중 씬 이동 시에도 pause 상태 유지 */
    _hideButtons();
    if(!_active) _unbindInteraction();
  }

  /* TOC 플레이 버튼 — 현재 씬에서 바로 시작 */
  function start(scene, sceneURL){
    _active = true; _paused = false;
    _updateTocBtn(true);
    _bindInteraction();
    _updateNavBar();
    onTypingDone(scene, sceneURL);
  }

  /* 인트로 플레이 버튼 — 새 페이지 로드 후 타이핑 완료 시 onTypingDone 으로 이어받음 */
  function activate(){
    _active = true; _paused = false;
    _updateTocBtn(true);
    _bindInteraction();
    _updateNavBar();
  }

  /* 씬 내 플레이 버튼 클릭 — 즉시 재개 */
  function resumeFromBtn(){
    if(!_active) return;
    _advTimerPaused = false;
    clearTimeout(_idleTimer);
    _hideButtons();
    if(_scene && _scene.nextURL && _sceneURL){
      clearTimeout(_timer);
      _timer = setTimeout(function(){
        if(!_active) return;
        window.goTo(resolveURL(_sceneURL, _scene.nextURL), {direction:'next'});
      }, DELAY_MS);
    }
  }

  function stop(){
    _active = false; _paused = false;
    _advTimerPaused = false;
    _clearAll();
    _unbindInteraction();
    document.body.classList.remove('ap-peek');
    var b=_getBar(); if(b) b.classList.remove('ap-visible');
    _updateTocBtn(false);
    _updateNavBar();
  }

  function isActive(){ return _active; }

  function _updateTocBtn(on){
    var btn = document.getElementById('tocAutoPlayBtn');
    if(!btn) return;
    btn.style.color = on ? 'rgba(212,175,55,0.9)' : '';
    btn.setAttribute('title', on
      ? (curLang==='KR'?'자동 모드 켜짐':'Auto On')
      : (curLang==='KR'?'자동 감상':'Auto Play'));
  }

  return { start:start, activate:activate, stop:stop, isActive:isActive,
           onTypingDone:onTypingDone, onSceneChange:onSceneChange,
           resumeFromBtn:resumeFromBtn, updateNavBar:_updateNavBar };
})();


/* ============================================================
   L. renderFogScene()
   ============================================================ */
function renderFogScene(app, scene, imgSrc, sceneURL) {
  if (isMobile) {
    var photoArea = document.createElement('div');
    photoArea.className='photo-area'; photoArea.id='mPhotoArea';
    var fogAtmo=document.createElement('div'); fogAtmo.className='fog-atmo';
    var fogAtmo2=document.createElement('div'); fogAtmo2.className='fog-atmo2';
    var fogTint=document.createElement('div'); fogTint.className='fog-tint-m';
    var fogEl=document.createElement('div'); fogEl.className='fog-overlay-m'; fogEl.id='fogNoiseM';
    _makeFogCanvas(fogEl);
    var lqip=document.createElement('img');
    lqip.className='scene-img'; lqip.style.filter='blur(12px)'; lqip.style.transform='scale(1.08)';
    lqip.src=imgSrc.replace(/\.webp$/, '_lqip.webp');
    var hqImg=document.createElement('img'); hqImg.className='scene-img'; hqImg.id='fogHq'; hqImg.alt='';
    photoArea.appendChild(lqip); photoArea.appendChild(hqImg);
    photoArea.appendChild(fogAtmo); photoArea.appendChild(fogAtmo2);
    photoArea.appendChild(fogTint); photoArea.appendChild(fogEl);
    app.appendChild(photoArea);
    app.appendChild(_buildMobileNav(scene, sceneURL));
    hqImg.onload=function(){
      lqip.style.transition='opacity 800ms ease'; lqip.style.opacity='0';
      hqImg.classList.add('show');
      setTimeout(function(){ FogFX.bind(fogEl); FogFX.start(); },600);
      setTimeout(function(){
        var ta=app.querySelector('.scene-text');
        if(ta){ ta.classList.add('show'); _typeText(ta, curLang==='KR'?scene.textKR:scene.textEN, function(){ AutoPlay.onTypingDone(scene,sceneURL); }); }
      },400);
    };
    hqImg.src=imgSrc;
  } else {
    var wrap=document.createElement('div'); wrap.className='screen visible scene'; wrap.id=scene.id+'Screen';
    var scWrap=document.createElement('div'); scWrap.className='scene-wrap';
    var sq=document.createElement('div'); sq.className='square-frame'; sq.id='mainContent';
    var hero=document.createElement('section'); hero.className='hero'; hero.id='hero';
    var bgLqip=document.createElement('img'); bgLqip.className='bg fog-lqip'; bgLqip.src=imgSrc.replace(/\.webp$/,'_lqip.webp'); bgLqip.alt=''; bgLqip.setAttribute('aria-hidden','true');
    var bgHq=document.createElement('img'); bgHq.className='bg fog-hq'; bgHq.id='fogHq'; bgHq.alt='';
    var overlay=document.createElement('div'); overlay.className='overlay';
    var fogAtmoD=document.createElement('div'); fogAtmoD.className='fog-atmo';
    var fogAtmo2D=document.createElement('div'); fogAtmo2D.className='fog-atmo2';
    var fogNoiseD=document.createElement('div'); fogNoiseD.className='fog'; fogNoiseD.id='fogNoise'; fogNoiseD.setAttribute('aria-hidden','true');
    _makeFogCanvas(fogNoiseD);
    var fogTxtEl=document.createElement('div'); fogTxtEl.className='fog-text long-text'; fogTxtEl.id='fogText';
    /* fog 텍스트는 show-text 클래스 후 타이핑으로 등장 */
    hero.append(bgLqip,bgHq,overlay,fogAtmoD,fogAtmo2D,fogNoiseD,fogTxtEl);
    sq.appendChild(hero);
    _buildDesktopNav(sq, scene, sceneURL);
    scWrap.appendChild(sq); wrap.appendChild(scWrap); app.appendChild(wrap);
    document.body.classList.add('ui-text-only','ui-mode-ready');
    FogFX.bind(fogNoiseD);
    bgHq.src=imgSrc;
    bgHq.onload=function(){
      hero.classList.add('hq-show');
      setTimeout(function(){ hero.classList.add('lqip-hide'); },2500);
      setTimeout(function(){
        hero.classList.add('show-text'); wrap.classList.add('nav-ready');
        var fogT = document.getElementById('fogText');
        if(fogT){ _typeText(fogT, curLang==='KR'?scene.textKR:scene.textEN, function(){ AutoPlay.onTypingDone(scene,sceneURL); }); }
      },3000);
      setTimeout(function(){ fogNoiseD.style.opacity='0'; requestAnimationFrame(function(){ void fogNoiseD.offsetHeight; fogNoiseD.style.opacity=''; fogNoiseD.classList.add('animated'); FogFX.start(); }); },3500);
    };
  }
}

/* ============================================================
   M. renderPhotoScene()
   ============================================================ */
function renderPhotoScene(app, scene, imgSrc, sceneURL) {
  if (isMobile) {
    var photoArea=document.createElement('div'); photoArea.className='photo-area'; photoArea.id='mPhotoArea';
    var img=document.createElement('img'); img.className='scene-img'; img.alt=scene.code||'';
    photoArea.appendChild(img);
    app.appendChild(photoArea);
    app.appendChild(_buildMobileNav(scene, sceneURL));
    img.onload=function(){
      img.classList.add('show');
      setTimeout(function(){
        var ta=app.querySelector('.scene-text');
        if(ta){ ta.classList.add('show'); _typeText(ta, curLang==='KR'?scene.textKR:scene.textEN, function(){ AutoPlay.onTypingDone(scene,sceneURL); }); }
      },400);
      /* ripple 효과: prague(LPL_03) / dreams(LPL_04) */
      if (scene.id==='prague' || scene.id==='dreams') {
        setTimeout(function(){
          if(img._rippleStarted) return;
          img._rippleStarted = true;
          if(scene.id==='prague') _initRipple(img, photoArea);
          else _initRippleTop(img, photoArea);
        }, 300);
      }
    };
    img.onerror=function(){
      setTimeout(function(){
        var ta=app.querySelector('.scene-text');
        if(ta){ ta.classList.add('show'); _typeText(ta, curLang==='KR'?scene.textKR:scene.textEN, function(){ AutoPlay.onTypingDone(scene,sceneURL); }); }
      },300);
    };
    img.src=imgSrc;
  } else {
    var wrap=document.createElement('div'); wrap.className='screen visible scene'; wrap.id=scene.id+'Screen';
    var scWrap=document.createElement('div'); scWrap.className='scene-wrap';
    var sq=document.createElement('div'); sq.className='square-frame'; sq.id='mainContent';
    sq.style.cssText='position:absolute;left:50%;top:50%;transform:translate(-50%,-50%) translateZ(0);width:min(100vw,var(--vh100,100vh));aspect-ratio:1/1;background:#000;overflow:hidden;';
    var img=document.createElement('img'); img.className='scene-img'; img.id=scene.id+'Img'; img.alt=scene.code||''; img.src=imgSrc;
    img.style.cssText='position:absolute;inset:0;width:100%;height:100%;object-fit:contain;background:#000;opacity:0;transition:opacity 2500ms ease;';
    var txt=document.createElement('div'); txt.className='scene-text long-text'; txt.id=scene.id+'Text';
    txt.style.zIndex='30';
    sq.append(img,txt);
    _buildDesktopNav(sq, scene, sceneURL);
    scWrap.appendChild(sq); wrap.appendChild(scWrap); app.appendChild(wrap);
    document.body.classList.add('ui-text-only','ui-mode-ready');
    var began=false;
    function begin(){ if(began)return; began=true; requestAnimationFrame(function(){ requestAnimationFrame(function(){
      img.style.opacity='1';
      wrap.classList.add('hq-show');
      wrap.classList.add('nav-ready');
      /* ripple 효과: prague(LPL_03) / dreams(LPL_04) */
      if (scene.id==='prague') _initRipple(img, sq);
      else if (scene.id==='dreams') _initRippleTop(img, sq);
      setTimeout(function(){
        wrap.classList.add('show-text');
        _typeText(txt, curLang==='KR'?scene.textKR:scene.textEN, function(){ AutoPlay.onTypingDone(scene,sceneURL); });
      }, 2500);
    }); }); }
    if(img.complete&&img.naturalWidth>0) begin();
    else { img.addEventListener('load',begin,{once:true}); img.addEventListener('error',begin,{once:true}); }
  }
}


/* ============================================================
   Q. FOG 효과
   ============================================================ */
/* ============================================================
   P. _typeText — 타이핑 효과 + 커서
   ============================================================ */
function _typeText(el, text, onComplete) {
  if (!el || !text) { if(onComplete) onComplete(); return; }
  el.textContent = '';
  var cursor = document.createElement('span');
  cursor.className = 'scene-cursor';
  cursor.style.cssText = 'display:inline-block;width:1.5px;height:0.85em;background:currentColor;margin-left:3px;vertical-align:text-bottom;animation:sceneCurBlink 600ms steps(1) infinite;';
  el.appendChild(cursor);
  function startTyping() {
    var i = 0;
    function next() {
      if (i < text.length) {
        el.insertBefore(document.createTextNode(text[i]), cursor); i++;
        setTimeout(next, 90 + Math.random() * 110);
      } else {
        if (onComplete) onComplete();
      }
    }
    setTimeout(next, 150);
  }
  /* 폰트 미로드 시에만 대기, 이미 로드됐으면 즉시 시작 */
  if (document.fonts && document.fonts.check && !document.fonts.check('16px "Nanum Pen Script"')) {
    document.fonts.load('16px "Nanum Pen Script"').then(startTyping).catch(startTyping);
  } else {
    startTyping();
  }
}

function _makeFogCanvas(el){
  var sz=256,cv=document.createElement('canvas'); cv.width=sz; cv.height=sz;
  var cx=cv.getContext('2d'), id=cx.createImageData(sz,sz), d=id.data;
  for(var i=0;i<d.length;i+=4){var v=Math.random()*255|0;d[i]=v;d[i+1]=v;d[i+2]=v;d[i+3]=255;}
  cx.putImageData(id,0,0);
  el.style.backgroundImage='url('+cv.toDataURL('image/png')+')';
  el.style.backgroundRepeat='repeat';
}

var _initRipple, _initRippleTop;

/* ============================================================
   R-1. _initRipple — LPL_03 프라하 하단 물결 (feTurbulence)
   ============================================================ */
_initRipple = function(img, sqEl) {
  if(!img||!sqEl) return;
  var SCREEN_RATIO = 0.40;
  var FID = "prague-ripple-"+Math.random().toString(36).substr(2,6);
  var NS = "http://www.w3.org/2000/svg";
  var svg = document.createElementNS(NS,"svg");
  svg.style.cssText = "position:absolute;width:0;height:0;pointer-events:none;overflow:hidden;";
  var defs = document.createElementNS(NS,"defs");
  var filter = document.createElementNS(NS,"filter");
  filter.setAttribute("id",FID);
  filter.setAttribute("x","0%"); filter.setAttribute("y","0%");
  filter.setAttribute("width","100%"); filter.setAttribute("height","100%");
  filter.setAttribute("color-interpolation-filters","sRGB");
  var turb = document.createElementNS(NS,"feTurbulence");
  turb.setAttribute("type","turbulence");
  turb.setAttribute("baseFrequency","0.012 0.035");
  turb.setAttribute("numOctaves","3");
  turb.setAttribute("seed","42");
  turb.setAttribute("result","noise");
  var disp = document.createElementNS(NS,"feDisplacementMap");
  disp.setAttribute("in","SourceGraphic");
  disp.setAttribute("in2","noise");
  disp.setAttribute("scale","0");
  disp.setAttribute("xChannelSelector","R");
  disp.setAttribute("yChannelSelector","G");
  filter.append(turb,disp); defs.appendChild(filter); svg.appendChild(defs);
  document.querySelectorAll("[data-ripple-svg-prague]").forEach(function(el){el.remove();});
  sqEl.querySelectorAll("[data-ripple-el-prague]").forEach(function(el){el.remove();});
  svg.setAttribute("data-ripple-svg-prague","1");
  document.body.appendChild(svg);
  var rippleEl = document.createElement("div");
  rippleEl.setAttribute("data-ripple-el-prague","1");
  rippleEl.style.cssText = "position:absolute;pointer-events:none;overflow:hidden;opacity:0;transition:opacity 1.5s ease;";
  var clone = img.cloneNode(false);
  clone.removeAttribute("id");
  clone.style.position = "absolute";
  clone.style.filter = "url(#"+FID+")";
  rippleEl.appendChild(clone);
  sqEl.appendChild(rippleEl);
  var syncPos = function() {
    var sqW=sqEl.offsetWidth, sqH=sqEl.offsetHeight;
    var iw=img.naturalWidth, ih=img.naturalHeight;
    if(!iw||!ih) return;
    var scale=Math.min(sqW/iw,sqH/ih);
    var rw=iw*scale, rh=ih*scale;
    var rx=(sqW-rw)/2, ry=(sqH-rh)/2;
    var fadeStart = Math.round((1-SCREEN_RATIO)*100);
    var fadeEnd = Math.min(fadeStart+8,100);
    var mask = "linear-gradient(to bottom, transparent "+fadeStart+"%, black "+fadeEnd+"%, black 92%, transparent 100%)";
    rippleEl.style.left=rx+"px"; rippleEl.style.width=rw+"px";
    rippleEl.style.top=ry+"px"; rippleEl.style.height=rh+"px";
    rippleEl.style.zIndex="10";
    rippleEl.style.webkitMaskImage=mask; rippleEl.style.maskImage=mask;
    clone.style.width=rw+"px"; clone.style.height=rh+"px";
    clone.style.left="0px"; clone.style.top="0px";
    clone.style.transformOrigin="center center";
    clone.style.transform="scale(1.015)";
  };
  syncPos();
  var onUpdate = function(){syncPos();setTimeout(syncPos,150);setTimeout(syncPos,500);};
  window.addEventListener("resize",onUpdate);
  document.addEventListener("fullscreenchange",onUpdate);
  var t=0;
  var animate = function() {
    turb.setAttribute("baseFrequency",
      (0.010+Math.sin(t*0.7)*0.003).toFixed(4)+" "+
      (0.030+Math.cos(t*0.5)*0.005).toFixed(4));
    disp.setAttribute("scale",(4+Math.sin(t*0.4)*2.0+Math.cos(t*0.7)*1.0).toFixed(2));
    t+=0.012;
    requestAnimationFrame(animate);
  };
  setTimeout(function(){rippleEl.style.opacity="1"; animate();},300);
};

/* ============================================================
   R-2. _initRippleTop — LPL_04 숨쉬는 물결 (맥동 + 미세 떨림)
   ============================================================ */
_initRippleTop = function(img, sqEl) {
  if(!img||!sqEl) return;
  var FID = "dreams-breath-"+Math.random().toString(36).substr(2,6);
  var NS = "http://www.w3.org/2000/svg";
  var svg = document.createElementNS(NS,"svg");
  svg.style.cssText = "position:absolute;width:0;height:0;pointer-events:none;overflow:hidden;";
  var defs = document.createElementNS(NS,"defs");
  var filter = document.createElementNS(NS,"filter");
  filter.setAttribute("id",FID);
  filter.setAttribute("x","0%"); filter.setAttribute("y","0%");
  filter.setAttribute("width","100%"); filter.setAttribute("height","100%");
  filter.setAttribute("color-interpolation-filters","sRGB");
  var turb = document.createElementNS(NS,"feTurbulence");
  turb.setAttribute("type","turbulence");
  turb.setAttribute("baseFrequency","0.020 0.045");
  turb.setAttribute("numOctaves","3");
  turb.setAttribute("seed","11");
  turb.setAttribute("result","noise");
  var disp = document.createElementNS(NS,"feDisplacementMap");
  disp.setAttribute("in","SourceGraphic");
  disp.setAttribute("in2","noise");
  disp.setAttribute("scale","0");
  disp.setAttribute("xChannelSelector","R");
  disp.setAttribute("yChannelSelector","G");
  filter.append(turb,disp); defs.appendChild(filter); svg.appendChild(defs);
  document.querySelectorAll("[data-ripple-svg]").forEach(function(el){el.remove();});
  sqEl.querySelectorAll("[data-ripple-el]").forEach(function(el){el.remove();});
  svg.setAttribute("data-ripple-svg","dreams");
  document.body.appendChild(svg);
  var rippleEl = document.createElement("div");
  rippleEl.setAttribute("data-ripple-el","dreams");
  rippleEl.style.cssText = "position:absolute;pointer-events:none;overflow:hidden;opacity:0;transition:opacity 1.5s ease;transform-origin:center center;";
  var clone = img.cloneNode(false);
  clone.removeAttribute("id");
  clone.style.position = "absolute";
  clone.style.filter = "url(#"+FID+")";
  clone.style.transformOrigin = "center center";
  rippleEl.appendChild(clone);
  sqEl.appendChild(rippleEl);
  var syncPos = function() {
    var sqW=sqEl.offsetWidth, sqH=sqEl.offsetHeight;
    var iw=img.naturalWidth, ih=img.naturalHeight;
    if(!iw||!ih) return;
    var scale=Math.min(sqW/iw,sqH/ih);
    var rw=iw*scale, rh=ih*scale;
    var rx=(sqW-rw)/2, ry=(sqH-rh)/2;
    var mask = "linear-gradient(to bottom, black 0%, black 45%, transparent 55%, transparent 100%)";
    rippleEl.style.left=rx+"px"; rippleEl.style.width=rw+"px";
    rippleEl.style.top=ry+"px"; rippleEl.style.height=rh+"px";
    rippleEl.style.zIndex="10";
    rippleEl.style.webkitMaskImage=mask; rippleEl.style.maskImage=mask;
    clone.style.width=rw+"px"; clone.style.height=rh+"px";
    clone.style.left="0px"; clone.style.top="0px";
    clone.style.transformOrigin="center center";
  };
  syncPos();
  var onUpdate = function(){syncPos();setTimeout(syncPos,150);setTimeout(syncPos,500);};
  window.addEventListener("resize",onUpdate);
  document.addEventListener("fullscreenchange",onUpdate);
  var t2=0;
  var animate2 = function() {
    turb.setAttribute("baseFrequency",
      (0.018+Math.sin(t2*1.1)*0.004).toFixed(4)+" "+
      (0.040+Math.cos(t2*0.8)*0.008).toFixed(4));
    disp.setAttribute("scale",(2.5+Math.sin(t2*0.6)*1.0+Math.cos(t2*0.9)*0.5).toFixed(2));
    var breathScale = 1.0+Math.sin(t2*0.15)*0.004+Math.sin(t2*0.08)*0.002;
    var breathX = Math.sin(t2*0.12)*0.3;
    var breathY = Math.cos(t2*0.09)*0.2;
    clone.style.transform = "scale("+breathScale.toFixed(5)+") translate("+breathX.toFixed(2)+"px,"+breathY.toFixed(2)+"px)";
    t2+=0.01;
    requestAnimationFrame(animate2);
  };
  setTimeout(function(){rippleEl.style.opacity="1"; animate2();},200);
};

var FogFX=(function(){
  var fogEl=null, timer=null;
  return {
    bind:function(el){ fogEl=el; },
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
   R. 모바일 control-area 빌더
   ============================================================ */
function _buildMobileNav(scene, sceneURL) {
  var ctrl=document.createElement('div'); ctrl.className='control-area';

  var codeEl=document.createElement('div'); codeEl.className='work-code';
  if(scene.code){ codeEl.textContent='Op. '+scene.code; codeEl.style.cursor='pointer'; codeEl.addEventListener('click',function(){ SceneListManager.open(); }); }
  ctrl.appendChild(codeEl);

  /* 씬 텍스트 */
  var textEl=document.createElement('div'); textEl.className='scene-text';
  textEl.textContent=curLang==='KR'?scene.textKR:scene.textEN;
  ctrl.appendChild(textEl);

  /* 네비바 */
  var navBar=document.createElement('div'); navBar.className='nav-bar';
  navBar.style.cssText='display:flex;flex-direction:row;flex-wrap:nowrap;align-items:center;justify-content:space-between;width:100%;padding:0 24px;gap:12px;';
  var leftBtn=document.createElement('div');
  if(!scene.prevURL && scene.pageNum===1){
    leftBtn.className='nav-btn'; leftBtn.innerHTML='<svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:26px;height:26px;"><path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.064.852l-.708 2.836a.75.75 0 0 0 1.064.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"/></svg>';
    leftBtn.addEventListener('click',function(){ AboutManager.open(); });
  } else {
    leftBtn.className='nav-btn'+(scene.prevURL?'':' disabled');
    leftBtn.innerHTML='<svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:26px;height:26px;"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5"/></svg>';
    if(scene.prevURL) leftBtn.addEventListener('click',function(){ window.goTo(resolveURL(sceneURL,scene.prevURL),{direction:'prev'}); });
  }
  var menuBtn=document.createElement('div'); menuBtn.className='nav-btn';
  menuBtn.innerHTML='<svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:26px;height:26px;"><path stroke-linecap="round" stroke-linejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"/></svg>';
  menuBtn.addEventListener('click',TOCManager.open);

  var listBtn=document.createElement('div'); listBtn.className='nav-btn';
  listBtn.innerHTML='<svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:26px;height:26px;"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"/></svg>';
  listBtn.addEventListener('click',SceneListManager.open);

  var rightBtn=document.createElement('div');
  rightBtn.className='nav-btn'+(scene.nextURL?'':' disabled');
  rightBtn.innerHTML='<svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:26px;height:26px;"><path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5"/></svg>';
  if(scene.nextURL) rightBtn.addEventListener('click',function(){ window.goTo(resolveURL(sceneURL,scene.nextURL),{direction:'next'}); });

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

  return ctrl;
}

/* ============================================================
   S. 데스크탑 네비게이션 (square-frame 안에 삽입)
   ============================================================ */
function _buildDesktopNav(sq, scene, sceneURL) {
  /* 오토플레이 바 (상단 중앙) */
  var apBar=document.createElement('div'); apBar.className='autoplay-bar';
  var playBtn=document.createElement('div'); playBtn.className='autoplay-scene-btn'; playBtn.id='apScenePlayBtn';
  playBtn.title=curLang==='KR'?'자동 감상':'Auto Play';
  playBtn.innerHTML='<svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:20px;height:20px;"><path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"/></svg>';
  var stopBtn=document.createElement('div'); stopBtn.className='autoplay-scene-btn'; stopBtn.id='apSceneStopBtn';
  stopBtn.title=curLang==='KR'?'자동 감상 중지':'Stop Auto Play';
  stopBtn.innerHTML='<svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:20px;height:20px;"><path stroke-linecap="round" stroke-linejoin="round" d="M5.25 7.5A2.25 2.25 0 0 1 7.5 5.25h9a2.25 2.25 0 0 1 2.25 2.25v9a2.25 2.25 0 0 1-2.25 2.25h-9a2.25 2.25 0 0 1-2.25-2.25v-9Z"/></svg>';
  playBtn.addEventListener('click', function(){ AutoPlay.resumeFromBtn(); });
  stopBtn.addEventListener('click', function(){ AutoPlay.stop(); apBar.classList.remove('ap-visible'); document.body.classList.remove('ap-peek'); });
  apBar.appendChild(playBtn); apBar.appendChild(stopBtn);
  sq.appendChild(apBar);

  /* 메뉴 버튼 */
  var mb=document.createElement('div'); mb.className='nav-menu nav-btn';
  mb.innerHTML='<svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:28px;height:28px;"><path stroke-linecap="round" stroke-linejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"/></svg>';
  mb.setAttribute('data-tip', curLang==='KR'?'메뉴':'Menu');
  mb.addEventListener('click',TOCManager.open);
  sq.appendChild(mb);

  /* 씬 목록 버튼 (soloToggle) */
  var st=document.createElement('div'); st.className='soloToggle nav-btn';
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
      btn.addEventListener('click', AboutManager.open);
      btn.addEventListener('touchend', function(e){ e.preventDefault(); AboutManager.open(); }, {passive:false});
      btn.addEventListener('keydown', function(e){ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); AboutManager.open(); } });
    } else if (!url) {
      btn.classList.add('disabled');
      btn.innerHTML='<svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:28px;height:28px;"><path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/><path stroke-linecap="round" stroke-linejoin="round" d="M9 9.563C9 9.252 9.252 9 9.563 9h4.874c.311 0 .563.252.563.563v4.874c0 .311-.252.563-.563.563H9.564A.562.562 0 0 1 9 14.437V9.564Z"/></svg>';
    } else {
      btn.innerHTML=dir==='left'
        ?'<svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:28px;height:28px;"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5"/></svg>'
        :'<svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:28px;height:28px;"><path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5"/></svg>';
      btn.setAttribute('data-tip', curLang==='KR'?(dir==='left'?'이전':'다음'):(dir==='left'?'Previous':'Next'));
      btn.addEventListener('click', function(){ window.goTo(resolveURL(sceneURL,url),{direction:dir==='right'?'next':'prev'}); });
      btn.addEventListener('touchend', function(e){ e.preventDefault(); window.goTo(resolveURL(sceneURL,url),{direction:dir==='right'?'next':'prev'}); }, {passive:false});
      btn.addEventListener('keydown', function(e){ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); window.goTo(resolveURL(sceneURL,url),{direction:dir==='right'?'next':'prev'}); } });
    }
    return btn;
  }
  sq.append(makeArrow('left',scene.prevURL), makeArrow('right',scene.nextURL));
}

/* ============================================================
   T. 입력 이벤트 바인딩 (씬 전환 후 교체)
   ============================================================ */
function _bindSceneInput(scene, sceneURL) {
  document.onkeydown = function(e) {
    if (_isOverlayOpen()) {
      if(e.key==='Escape') { _closeTopOverlay(); e.preventDefault(); }
      return;
    }
    if(e.key==='m'||e.key==='M'){ e.preventDefault(); TOCManager.open(); return; }
    if(e.key==='g'||e.key==='G'){ e.preventDefault(); GuestbookManager.open(); return; }
    if(e.key==='h'||e.key==='H'){ e.preventDefault(); HelpManager.open(); return; }
    if(e.key==='p'||e.key==='P'){ e.preventDefault(); AboutManager.open(); return; }
    if(e.key==='ArrowRight'||e.key==='ArrowDown'||e.key==='Enter'){ e.preventDefault(); if(scene.nextURL) window.goTo(resolveURL(sceneURL,scene.nextURL),{direction:'next'}); }
    else if(e.key==='ArrowLeft'||e.key==='ArrowUp'){ e.preventDefault(); if(scene.prevURL) window.goTo(resolveURL(sceneURL,scene.prevURL),{direction:'prev'}); }
  };

  /* 데스크탑 터치패드 */
  if (!isMobile) {
    var wheelTimer=null;
    document.onwheel = function(e) {
      if(e.ctrlKey||_isOverlayOpen()) return;
      clearTimeout(wheelTimer);
      wheelTimer=setTimeout(function(){
        var dx=e.deltaX, dy=e.deltaY;
        if(Math.abs(dx)>=Math.abs(dy)){ if(dx>30&&scene.nextURL) window.goTo(resolveURL(sceneURL,scene.nextURL),{direction:'next'}); else if(dx<-30&&scene.prevURL) window.goTo(resolveURL(sceneURL,scene.prevURL),{direction:'prev'}); }
        else { if(dy>30&&scene.nextURL) window.goTo(resolveURL(sceneURL,scene.nextURL),{direction:'next'}); else if(dy<-30&&scene.prevURL) window.goTo(resolveURL(sceneURL,scene.prevURL),{direction:'prev'}); }
      },50);
    };

    /* solo-peek: 마우스 이동 시 버튼 2초 표시 */
    var peekTimer=null;
    var showPeek=function(){
      document.body.classList.add('solo-peek');
      clearTimeout(peekTimer);
      peekTimer=setTimeout(function(){ document.body.classList.remove('solo-peek'); },2000);
    };
    document.addEventListener('mousemove',showPeek);
    document.addEventListener('click',showPeek);
  } else {
    /* 모바일 peek: 터치 시 버튼 2초 표시 */
    var peekTimerM=null;
    var showPeekM=function(){
      document.body.classList.add('solo-peek');
      clearTimeout(peekTimerM);
      peekTimerM=setTimeout(function(){ document.body.classList.remove('solo-peek'); },2000);
    };
    document.addEventListener('touchstart',showPeekM,{passive:true});
  }
}

function _isOverlayOpen() {
  return ['tocOverlay','thumbOverlay','sceneListOverlay','aboutOverlay','poemOverlay','helpOverlay','introOverlay','gbOverlay']
    .some(function(id){ var el=$id(id); return el && el.classList.contains('on'); });
}
function _closeTopOverlay() {
  ['introOverlay','helpOverlay','poemOverlay','aboutOverlay','gbOverlay','thumbOverlay','sceneListOverlay','tocOverlay']
    .find(function(id){ var el=$id(id); if(el&&el.classList.contains('on')){ _closeOverlay(el); return true; } return false; });
}
function _closeOverlay(el) {
  el.classList.remove('on'); el.setAttribute('aria-hidden','true');
  setTimeout(function(){ el.style.display='none'; },420);
}

/* ============================================================
   U. OVERLAY MANAGERS
   ============================================================ */
var TOCManager = {
  open: function() {
    history.pushState({overlay:'toc'},'');
    var ov=$id('tocOverlay'); if(!ov) return;
    ov.style.display='flex'; ov.setAttribute('aria-hidden','false');
    requestAnimationFrame(function(){ requestAnimationFrame(function(){ ov.classList.add('on'); }); });
    if (!isMobile) { _buildThumbGrid(); scrollToCurrent($id('thumbGrid'),'.thumb-current'); }
    else { _buildMobThumbGrid(); scrollToCurrent($id('mobThumbGrid'),'.thumb-current'); }
    _updateTOCCurrent(S.currentScene||{});
  },
  close: function() {
    var ov=$id('tocOverlay'); if(!ov) return;
    ov.classList.remove('on'); ov.setAttribute('aria-hidden','true');
    setTimeout(function(){ ov.style.display=''; }, 420);
    document.querySelector('.unified-panel') && document.querySelector('.unified-panel').classList.remove('expanded');
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
  close: function() { var ov=$id('aboutOverlay'); if(!ov) return; _closeOverlay(ov); }
};

var HelpManager = {
  open: function() {
    history.pushState({overlay:'help'},'');
    var ov=$id('helpOverlay'); if(!ov) return;
    ov.style.display='flex'; ov.setAttribute('aria-hidden','false');
    requestAnimationFrame(function(){ requestAnimationFrame(function(){ ov.classList.add('on'); }); });
  },
  close: function() { var ov=$id('helpOverlay'); if(!ov) return; _closeOverlay(ov); }
};

var IntroManager = {
  open: function() {
    history.pushState({overlay:'intro'},'');
    var ov=$id('introOverlay'); if(!ov) return;
    ov.style.display='flex'; ov.setAttribute('aria-hidden','false');
    requestAnimationFrame(function(){ requestAnimationFrame(function(){ ov.classList.add('on'); }); });
  },
  close: function() { var ov=$id('introOverlay'); if(!ov) return; _closeOverlay(ov); }
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
  close: function() { var ov=$id('gbOverlay'); if(!ov) return; _closeOverlay(ov); }
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
  close: function() { var ov=$id('poemOverlay'); if(!ov) return; _closeOverlay(ov); }
};

/* ============================================================
   V. 씬 목록 HTML 빌드
   ============================================================ */
function _buildSceneListHTML() {
  var sc=S.currentScene||{};
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
      card.className='thumb-card'+(sc.code===(S.currentScene&&S.currentScene.code)?' thumb-current':'');
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
      card.addEventListener('click',function(){ window.goTo('/scenes/'+sc.file+'.html'); });
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
  $id('mobExpandBtn') && $id('mobExpandBtn').addEventListener('click', function(e){ e.preventDefault(); e.stopPropagation(); TOCManager.close(); setTimeout(function(){ ThumbnailManager.open(); }, 200); });
  $id('tocAutoPlayBtn') && $id('tocAutoPlayBtn').addEventListener('click',function(){
    TOCManager.close();
    setTimeout(function(){ AutoPlay.start(S.currentScene, sceneURL_); }, 440);
  });
  $id('tocAutoPlayBtn') && $id('tocAutoPlayBtn').addEventListener('keydown',function(e){ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); $id('tocAutoPlayBtn').click(); } });
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
    if(_isOverlayOpen()){ history.pushState(null,'',location.href); _closeTopOverlay(); return; }
    if(e.state&&e.state.url){ S._navigating=false; window.goTo(e.state.url); }
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
}


function _runIntroTransition(lineEl) {
  S._introActive=false;
  ensureSPAOverlays();
  var white=$id('white-overlay');

  var t0=null;
  function glowLoop(ts){
    if(!t0) t0=ts;
    var elapsed=ts-t0;
    var g=Math.sin((elapsed/1000)*Math.PI)*22;
    lineEl.style.textShadow='0 0 '+g.toFixed(1)+'px rgba(255,255,255,0.95),0 0 '+(g*2.2).toFixed(1)+'px rgba(255,255,255,0.4)';
    if(elapsed<1000){ requestAnimationFrame(glowLoop); }
    else {
      lineEl.style.textShadow='';
      _spawnIntroParticles(function(){
        white.style.transition='opacity 600ms ease'; white.style.opacity='1';
        setTimeout(function(){
          var target='/scenes/LPL_01.html';
          fetchScene(target).then(function(scene){
            S.currentURL=target; S.currentScene=scene;
            history.pushState({url:target},'',target);
            renderScene(scene,target); sceneURL_=target;
            setTimeout(function(){ white.style.transition='opacity 900ms ease'; white.style.opacity='0'; },120);
          }).catch(function(){ location.href=target; });
        },600);
      });
    }
  }
  requestAnimationFrame(glowLoop);
}

function _spawnIntroParticles(done) {
  var app=$id('app');
  var W=app.offsetWidth||600, H=app.offsetHeight||600;
  var cv=document.createElement('canvas'); cv.style.cssText='position:absolute;inset:0;pointer-events:none;z-index:555;';
  cv.width=W; cv.height=H; app.appendChild(cv);
  var ctx=cv.getContext('2d');
  var cx=W*0.5, cy=H*0.44;
  var pts=Array.from({length:22},function(){ var a=Math.random()*Math.PI*2,sp=1.2+Math.random()*3.0;
    return {x:cx+(Math.random()-0.5)*W*0.18,y:cy+(Math.random()-0.5)*H*0.08,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp-0.8,r:1.5+Math.random()*2.2}; });
  var DURATION=1300, start=null;
  function draw(ts){
    if(!start) start=ts; var elapsed=ts-start;
    ctx.clearRect(0,0,W,H); var anyAlive=false;
    pts.forEach(function(p){
      var life=elapsed/DURATION; p.x+=p.vx; p.y+=p.vy; p.vy+=0.025;
      var alpha=Math.max(0,1-life*1.15);
      if(alpha>0){ anyAlive=true; ctx.save(); ctx.shadowBlur=10; ctx.shadowColor='rgba(255,255,255,0.85)';
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fillStyle='rgba(255,255,255,'+alpha.toFixed(2)+')'; ctx.fill(); ctx.restore(); }
    });
    if(elapsed<DURATION&&anyAlive){ requestAnimationFrame(draw); }
    else{ if(cv.parentNode) cv.parentNode.removeChild(cv); if(done) done(); }
  }
  requestAnimationFrame(draw);
}

/* ============================================================
   Z. INIT
   ============================================================ */
function init() {
  injectCSS();

  /* DOM 삽입 */
  if (isMobile) {
    var bo=document.createElement('div'); bo.id='blackout'; document.body.appendChild(bo);
    var appEl=document.createElement('div'); appEl.id='app'; document.body.appendChild(appEl);
    document.body.insertAdjacentHTML('beforeend', buildOverlayHTML());
  } else {
    /* 데스크탑: 기존 #app 제거 후 overlays + 새 #app 삽입 */
    var existingApp = document.getElementById('app');
    if (existingApp) existingApp.parentNode.removeChild(existingApp);
    document.body.insertAdjacentHTML('afterbegin', buildOverlayHTML());
  }

  ensureSPAOverlays();

  /* 스타일 */
  document.body.style.background='#000';
  document.documentElement.style.background='#000';

  if (window.THIS_SCENE) {
    var url = location.pathname || location.href;
    S.currentURL   = url;
    S.currentScene = window.THIS_SCENE;
    sceneURL_       = url;
    bindCommonEvents();
    renderScene(window.THIS_SCENE, url);

    /* from=index 전환: 흰색 div 페이드아웃 */
    var fromTmp = document.getElementById('_fromIndexTmp');
    if (fromTmp) {
      setTimeout(function() {
        fromTmp.style.transition = 'opacity 900ms ease';
        fromTmp.style.opacity = '0';
        setTimeout(function() {
          if (fromTmp.parentNode) fromTmp.parentNode.removeChild(fromTmp);
        }, 950);
      }, 200);
    }
  } else {
    /* index.html이 직접 처리 — gallery.js는 아무것도 안 함 */
    bindCommonEvents();
  }
}

if (document.readyState==='loading') document.addEventListener('DOMContentLoaded', init);
else init();

})();
