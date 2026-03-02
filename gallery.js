'use strict';
const BUILD_TS = '2026.02.26 22:14';
console.log('%c Moments of Love %c ' + BUILD_TS + ' ', 'background:#d4af37;color:#000;font-weight:bold;border-radius:3px 0 0 3px;padding:2px 6px;', 'background:#333;color:#fff;border-radius:0 3px 3px 0;padding:2px 6px;');
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
.rest-photo { position: absolute; inset: 0; background: #1a1a1a; overflow: hidden; display: flex; align-items: center; justify-content: center; }
.rest-icon-wrap {
  position: relative;
  width: 68px; height: 68px;
  display: grid; place-items: center;
  cursor: pointer;
}
.rest-arrow-icon {
  width: 68px; height: 68px; border-radius: 999px;
  display: grid; place-items: center;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.18);
  animation: restBreathe 3.2s ease-in-out infinite, restGlow 3.2s ease-in-out infinite;
  transition: background 300ms ease, border-color 300ms ease;
}
.rest-arrow-icon svg {
  width: 26px; height: 26px;
  stroke: rgba(200,200,200,0.15);
  transition: stroke 300ms ease;
}
.rest-icon-wrap:hover .rest-arrow-icon svg {
  stroke: rgba(200,200,200,0.85);
}
.rest-icon-wrap:hover .rest-arrow-icon {
  background: rgba(255,255,255,0.10);
  border-color: rgba(255,255,255,0.28);
}
.rest-ring {
  position: absolute;
  width: 68px; height: 68px;
  border-radius: 999px;
  border: 1.5px solid rgba(255,255,255,0.50);
  pointer-events: none;
  animation: restPulse 3s ease-out infinite;
}
.rest-ring.r2 {
  border-width: 1px;
  border-color: rgba(255,255,255,0.35);
  animation-delay: 1s;
}
@keyframes restPulse {
  0%   { transform: scale(1);    opacity: 0.60; }
  70%  { transform: scale(1.6);  opacity: 0; }
  100% { transform: scale(1.6);  opacity: 0; }
}
@keyframes restBreathe {
  0%, 100% { opacity: 0.50; }
  50%      { opacity: 0.85; }
}
@keyframes restGlow {
  0%, 100% { box-shadow: 0 0 6px 2px rgba(255,255,255,0.06); }
  50%      { box-shadow: 0 0 18px 6px rgba(255,255,255,0.16); }
}
@keyframes restSvgPulse {
  0%, 100% { stroke: rgba(200,200,200,0.40); }
  50%      { stroke: rgba(220,220,220,0.90); }
}
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
  height: 85vh;
  max-height: 92vh;
  background: rgba(255,255,255,0.10);
  border: 1px solid rgba(255,255,255,0.08);
  border-bottom: none;
  border-radius: 20px 20px 0 0;
  padding: 20px 24px 40px;
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
.menu-section { margin-top: 8px; padding-top: 8px; border-top: 1px solid rgba(255,255,255,0.08); padding-left: 8px; }
.menu-section:first-of-type { border-top: none; margin-top: 0; padding-top: 0; }
.menu-h { font-size: 20px; color: rgba(235,235,235,0.92); margin: 0 0 2px 0; font-family: "Nanum Pen Script", cursive; }
.menu-h-link{ display:inline-block; cursor:pointer; }
.menu-h-link:hover{ text-decoration:underline; text-underline-offset:6px; }
.menu-h-link:focus{ outline:none; text-decoration:underline; text-underline-offset:6px; }

.toc-list { list-style: none; margin: 0; padding: 0; font-size: 18px; font-family: "Nanum Pen Script", cursive; }
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
  width: 100%; max-height: 92vh;
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
  max-height: 80vh;
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
  font-size: clamp(16px, 2vw, 18px);
  line-height: 1.6;
  color: rgba(235,235,235,0.90);
  white-space: pre-wrap;
  word-break: keep-all;
  padding-left: 16px;
}
#aboutGrid .about-body p { margin: 0 0 16px 0; }
#aboutGrid .about-body p:last-child { margin-bottom: 0; }
/* 모바일 info 타임스탬프 */
.info-version{ position:absolute; bottom:14px; right:18px; font-family:"Nanum Pen Script", cursive;
font-size:16px; color: rgba(180,180,180,0.35); }
/* ===== Guestbook 오버레이 (모바일) ===== */
#gbOverlay { align-items:flex-end; }
#gbOverlay .gb-panel {
  position:relative; width:100%; max-height:92vh;
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
  width:100%; box-sizing:border-box; padding:12px; background:rgba(255,255,255,0.06);
  border:1px solid rgba(255,255,255,0.12); border-radius:10px; color:#e6e6e6;
  font-family:"Nanum Pen Script",cursive; font-size:17px; line-height:1.5;
  outline:none; transition:border-color 200ms; margin-bottom:10px;
}
.gb-input:focus { border-color:rgba(212,175,55,0.50); }
.gb-input::placeholder { color:rgba(220,220,220,0.35); }
.gb-textarea {
  width:100%; box-sizing:border-box; padding:12px; background:rgba(255,255,255,0.06);
  border:1px solid rgba(255,255,255,0.12); border-radius:10px; color:#e6e6e6;
  font-family:"Nanum Pen Script",cursive; font-size:17px; line-height:1.5;
  resize:none; outline:none; transition:border-color 200ms;
}
.gb-textarea:focus { border-color:rgba(212,175,55,0.50); }
.gb-textarea::placeholder { color:rgba(220,220,220,0.35); }
.gb-form-footer { display:flex; align-items:center; justify-content:space-between; margin-top:8px; }
.gb-char-count { font-family:"Nanum Pen Script",cursive; font-size:14px; color:rgba(180,180,180,0.45); }
.gb-char-count.gb-char-warn { color:rgba(212,120,80,0.80); }
.gb-submit-btn {
  padding:8px 24px; background:rgba(212,175,55,0.22); border:1px solid rgba(212,175,55,0.40);
  border-radius:8px; color:rgba(255,250,230,0.90); font-family:"Nanum Pen Script",cursive;
  font-size:17px; cursor:pointer; transition:background 200ms;
}
.gb-submit-btn:active { background:rgba(212,175,55,0.40); }
.gb-submit-btn:disabled { opacity:0.45; pointer-events:none; }
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
.gb-success-msg { font-size:18px; line-height:1.7; color:rgba(230,230,230,0.80); }
/* ===== Thumbnail Grid + Heart (모바일) ===== */
.mob-unified-body{ display:flex; flex:1; min-height:0; margin:0 -24px -40px; }
.mob-col-title{ font-family:"Nanum Pen Script",cursive; font-size:20px; color:rgba(235,235,235,0.92); margin:0 0 6px; padding:4px 0; }
.mob-unified-left{ flex:0 0 38%; overflow-y:auto; -ms-overflow-style:none; scrollbar-width:none; padding:0 10px 24px 24px; }
.mob-unified-left::-webkit-scrollbar{ display:none; }
.mob-unified-right{ flex:1; overflow-y:auto; -ms-overflow-style:none; scrollbar-width:none; border-left:1px solid rgba(255,255,255,0.06); background:rgba(0,0,0,0.12); padding:0 24px 24px 10px; }
.mob-unified-right::-webkit-scrollbar{ display:none; }
.mob-right-header{ display:flex; align-items:center; justify-content:space-between; padding:4px 0 6px; position:sticky; top:0; z-index:5; }
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
.mob-contact-icons{ display:flex; gap:12px; padding-left:8px; margin-top:2px; }
.mob-contact-icons a{ color:rgba(220,220,220,0.50); -webkit-tap-highlight-color:transparent; }
.mob-contact-icons svg{ width:18px; height:18px; }
.mob-copyright{ font-family:"Nanum Pen Script",cursive; font-size:14px; color:rgba(200,200,200,0.40); padding-left:8px; line-height:1.4; }
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
.thumb-card.thumb-locked .thumb-title { position:absolute; bottom:22px; left:0; right:0; text-align:center; font-family:"Nanum Pen Script",cursive; font-size:12px; color:rgba(255,255,255,0.4); pointer-events:none; }`;
const CSS_DESKTOP = `@import url('https://fonts.googleapis.com/css2?family=Nanum+Pen+Script&display=swap');
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
  .rest-photo { position:absolute; inset:0; background:#1a1a1a; overflow:hidden; }
  .rest-icon-wrap {
    position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
    width: 68px; height: 68px;
    display: grid; place-items: center;
    cursor: pointer;
  }
  .rest-arrow-icon {
    width: 68px; height: 68px; border-radius: 999px;
    display: grid; place-items: center;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.18);
    animation: restBreathe 3.2s ease-in-out infinite, restGlow 3.2s ease-in-out infinite;
    transition: background 300ms ease, border-color 300ms ease;
  }
  .rest-arrow-icon svg { width: 26px; height: 26px; stroke: rgba(200,200,200,0.15); transition: stroke 300ms ease; }
  .rest-icon-wrap:hover .rest-arrow-icon svg { stroke: rgba(200,200,200,0.85); }
  .rest-icon-wrap:hover .rest-arrow-icon { background: rgba(255,255,255,0.10); border-color: rgba(255,255,255,0.28); }
  .rest-ring {
    position: absolute; width: 68px; height: 68px; border-radius: 999px;
    border: 1.5px solid rgba(255,255,255,0.50);
    pointer-events: none; animation: restPulse 3s ease-out infinite;
  }
  .rest-ring.r2 { border-width: 1px; border-color: rgba(255,255,255,0.35); animation-delay: 1s; }
  @keyframes restPulse {
    0%   { transform: scale(1);   opacity: 0.60; }
    70%  { transform: scale(1.6); opacity: 0; }
    100% { transform: scale(1.6); opacity: 0; }
  }
  @keyframes restBreathe {
    0%, 100% { opacity: 0.50; }
    50%      { opacity: 0.85; }
  }
  @keyframes restGlow {
    0%, 100% { box-shadow: 0 0 6px 2px rgba(255,255,255,0.06); }
    50%      { box-shadow: 0 0 18px 6px rgba(255,255,255,0.16); }
  }
  @keyframes restSvgPulse {
    0%, 100% { stroke: rgba(200,200,200,0.40); }
    50%      { stroke: rgba(220,220,220,0.90); }
  }
  /* rest-still: 정적 + 미세 호흡 (RST_01 전용) */
  .rest-still .rest-ring { display: none; }
  .rest-still .rest-arrow-icon {
    animation: restStillBreathe 8s ease-in-out infinite;
  }
  @keyframes restStillBreathe {
    0%, 100% { opacity: 0.45; box-shadow: 0 0 6px 2px rgba(255,255,255,0.04); }
    50%      { opacity: 0.75; box-shadow: 0 0 14px 5px rgba(255,255,255,0.10); }
  }
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
  overflow-y:auto; -ms-overflow-style:none; scrollbar-width:none; opacity:0; pointer-events:none;
  transform: translateX(18px); transition: opacity 250ms ease, transform 250ms ease; }
  .toc-info-panel::-webkit-scrollbar { display: none; }
  .toc-panel.show-info .toc-main{ opacity:0; pointer-events:none; transform: translateX(-18px); }
  .toc-panel.show-info .toc-info-panel{ opacity:1; pointer-events:auto; transform: translateX(0); }
  .toc-panel.show-info .toc-info-btn{ opacity:0; pointer-events:none; }
  .unified-left.show-info .toc-main{ opacity:0; pointer-events:none; transform: translateX(-18px); }
  .unified-left.show-info .toc-info-panel{ opacity:1; pointer-events:auto; transform: translateX(0); }
  .unified-left.show-info .toc-info-btn{ opacity:0; pointer-events:none; }
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
  .unified-left .menu-section{ padding-left:14px; }
  .unified-left .menu-h{ font-size:22px; }
  .unified-left .toc-list{ font-size:20px; }
  .unified-left .toc-item{ gap:10px; }
  .unified-left .toc-bullet{ width:10px; flex:0 0 10px; font-size:10px; }
  .unified-left .info-version{ font-size:18px; bottom:10px; right:14px; }
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
  .unified-panel .toc-info-btn{ bottom:12px; left:clamp(160px,26%,200px); transform:translateX(-50%); right:auto; }
  .contact-icons{ display:flex; gap:14px; padding-left:14px; margin-top:2px; }
  .contact-icon{ display:grid; place-items:center; color:rgba(220,220,220,0.55); transition:color 180ms ease; }
  .contact-icon:hover{ color:rgba(235,235,235,0.92); }
  .contact-icon svg{ width:20px; height:20px; }
  .menu-copyright{ font-family:"Nanum Pen Script",cursive; font-size:18px; color:rgba(200,200,200,0.45); padding-left:14px; line-height:1.4; }
  .has-tooltip{ position:relative; }
  .has-tooltip::after{ content:attr(data-tooltip); position:absolute; left:105%; top:50%; transform:translateY(-50%); white-space:nowrap;
    font-family:"Nanum Pen Script",cursive; font-size:16px; color:rgba(220,220,220,0.85);
    background:rgba(30,30,30,0.92); border:1px solid rgba(255,255,255,0.1); border-radius:8px;
    padding:4px 12px; pointer-events:none; opacity:0; transition:opacity 200ms ease; z-index:30; }
  .has-tooltip:hover::after{ opacity:1; }

  /* INDEX 오버레이 */
  #indexOverlay{ z-index:10001; }
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
  width:100%; box-sizing:border-box; padding:12px 14px; background:rgba(255,255,255,0.05);
  border:1px solid rgba(255,255,255,0.10); border-radius:10px; color:#e6e6e6;
  font-family:"Nanum Pen Script",cursive; font-size:17px; line-height:1.5;
  outline:none; transition:border-color 200ms; margin-bottom:10px;
}
.gb-input:focus { border-color:rgba(212,175,55,0.45); }
.gb-input::placeholder { color:rgba(220,220,220,0.30); }
.gb-textarea {
  width:100%; box-sizing:border-box; padding:12px 14px; background:rgba(255,255,255,0.05);
  border:1px solid rgba(255,255,255,0.10); border-radius:10px; color:#e6e6e6;
  font-family:"Nanum Pen Script",cursive; font-size:17px; line-height:1.5;
  resize:none; outline:none; transition:border-color 200ms;
}
.gb-textarea:focus { border-color:rgba(212,175,55,0.45); }
.gb-textarea::placeholder { color:rgba(220,220,220,0.30); }
.gb-form-footer { display:flex; align-items:center; justify-content:space-between; margin-top:8px; }
.gb-char-count { font-family:"Nanum Pen Script",cursive; font-size:14px; color:rgba(180,180,180,0.40); }
.gb-char-count.gb-char-warn { color:rgba(212,120,80,0.75); }
.gb-submit-btn {
  padding:8px 28px; background:rgba(212,175,55,0.18); border:1px solid rgba(212,175,55,0.35);
  border-radius:8px; color:rgba(255,250,230,0.85); font-family:"Nanum Pen Script",cursive;
  font-size:17px; cursor:pointer; transition:background 200ms, border-color 200ms;
}
.gb-submit-btn:hover { background:rgba(212,175,55,0.32); border-color:rgba(212,175,55,0.55); }
.gb-submit-btn:disabled { opacity:0.4; pointer-events:none; }
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
.gb-success-msg { font-size:18px; line-height:1.7; color:rgba(230,230,230,0.80); }
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
`;

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

// 실제 viewport 높이 측정 (모바일 주소창 문제 해결)
const setVh = () => {
  document.documentElement.style.setProperty("--vh100", window.innerHeight + "px");
};
setVh();
window.addEventListener("resize", setVh);

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
  {id:"fog",      code:"LPL#01",kr:"안개가 휘감은 세상에",                      en:"In a world wrapped in fog",                               file:"LPL_01"},
  {id:"LPL_02",   code:"LPL#02",kr:"당신의 온기가 스며들면",                    en:"When your warmth seeps in",  file:"LPL_02"},
  {id:"LPL_03",   code:"LPL#03",kr:"세상은 본연의 모습을 되찾고",               en:"The world regains its true colors",                    file:"LPL_03"},
  {id:"dreams",   code:"LPL#04",kr:"그 품안에서 사랑의 꿈이 일렁입니다",        en:"In that embrace, dreams of love ripple",           file:"LPL_04"},
  {id:"RST_01",   code:"",      kr:"",                                         en:"",                                                    file:"RST_01"},
  {id:"dreams00", code:"LDR#00",kr:"사랑의 꿈은",                              en:"Dreams of love",                                       file:"LDR_00"},
  {id:"dreams01", code:"LDR#11",kr:"이끌림을 따라",                            en:"Following the pull",                                   file:"LDR_11"},
  {id:"dreams02", code:"LDR#21",kr:"설렘에 실려",                              en:"Carried by excitement",                                file:"LDR_21"},
  {id:"dreams03", code:"LDR#31",kr:"그리움과 함께 넓어지며",                   en:"Expanding with longing",                               file:"LDR_31"},
  {id:"dreams04", code:"LDR#41",kr:"애틋함으로 깊어져",                        en:"Deepening with tenderness",                            file:"LDR_41"},
  {id:"dreams05", code:"LDR#51",kr:"행복의 바다에 이르고",                     en:"Reaching the sea of happiness",                        file:"LDR_51"},
  {id:"RST_02",   code:"",      kr:"",                                         en:"",                                                    file:"RST_02"},
  {id:"song01",   code:"LSN#01",kr:"사랑의 노래가 되어",                       en:"Becoming a song of love",                              file:"LSN_01"},
  {id:"song02",   code:"LSN#02",kr:"당신만을 바라고 또 바라 봅니다",            en:"I gaze at you, and gaze again",                        file:"LSN_02"},
  {id:"RST_03",   code:"",      kr:"",                en:"",            file:"RST_03"},
  {id:"song03",   code:"LSN#03",kr:"어제, 오늘 그리고 내일",                   en:"Yesterday, today, and tomorrow",                       file:"LSN_03"},
  {id:"song04",   code:"LSN#04",kr:"하루의 모든 순간",                         en:"Every moment of the day",                              file:"LSN_04"},
  {id:"song05",   code:"LSN#05",kr:"잠 못 이루는 밤",                          en:"Sleepless nights",                                     file:"LSN_05"},
  {id:"song06",   code:"LSN#06",kr:"꿈속에서도",                               en:"Even in dreams",                                       file:"LSN_06"},
  {id:"song07",   code:"LSN#07",kr:"내가 머물고 싶은 공간",                    en:"The space I want to dwell",                            file:"LSN_07"},
  {id:"song08",   code:"LSN#08",kr:"끝없이 샘솟는 기쁨",                       en:"Endlessly springing joy",                              file:"LSN_08"},
  {id:"song09",   code:"LSN#09",kr:"마음을 울리는 노래 속에도",                en:"Even in songs that move my heart",                     file:"LSN_09"},
  {id:"song10",   code:"LSN#10",kr:"언제나 당신이 있습니다",                   en:"You are always there",                                 file:"LSN_10"},
  {id:"RST_04",   code:"",      kr:"",                                         en:"",                                                    file:"RST_04"},
  {id:"song11",   code:"LSN#11",kr:"당신의",                                   en:"Your",                                                 file:"LSN_11"},
  {id:"song12",   code:"LSN#12",kr:"해맑은 미소와 따스한 온기에",              en:"Pure smile and warm embrace",                          file:"LSN_12"},
  {id:"song13",   code:"LSN#13",kr:"모든 순간이 낙원이 되고",                  en:"Every moment becomes paradise",                        file:"LSN_13"},
  {id:"song14",   code:"LSN#14",kr:"온 세상이 사랑으로 물들면",                en:"When the whole world is tinted with love",             file:"LSN_14"},
  {id:"song15",   code:"LSN#15",kr:"나는 당신의 사랑안에서",                   en:"In your love",                                         file:"LSN_15"},
  {id:"song16",   code:"LSN#16",kr:"새로이 태어납니다",                        en:"I am born anew",                                       file:"LSN_16"},
  {id:"RST_05",   code:"",      kr:"아직 열리지 않은 이야기들이 있습니다.\n사랑의 공명, 사랑의 춤, 사랑의 합창 —\n언젠가, 다른 공간에서 만나길 바랍니다.",                                         en:"There are stories yet to be opened.\nLove Resonance, Love Dance, Love Chorus —\nwe hope to meet them someday, in another space.",                                                    file:"RST_05"},
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

const THUMB_CODES = new Set([
  "LPL#01","LPL#02","LPL#03","LPL#04",
  "LDR#00","LDR#11","LDR#21","LDR#31","LDR#41","LDR#51",
  "LSN#01","LSN#02",
  "LSN#11","LSN#12","LSN#13","LSN#14","LSN#15","LSN#16",
  "LEL#01"
]);

const LOCKED_TITLES = {
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

const LANG_TEXTS = {
  KR:{tocTitle:"메뉴",menuH_TOC:"목차",menuH_INDEX:"색인",menuH_CONTACT:"연락처",
      menuH_ABOUT:"작가의 말",aboutTitle:"작가의 말",aboutBody:`눈부신 햇살,
잔잔한 바람,
백조의 우아한 자태에
일렁이는 빛결은
보석처럼 반짝입니다.

백조와 반영은
서로의 색으로 물들고
온 세상이 사랑으로 번져갑니다.

모든 사랑의 순간은 당신으로 열리고,
사랑은 당신으로 완성됩니다.`,menuH_COPY:"저작권",
      homeText:"사랑의 모든 순간은 당신으로 열립니다",
      prologue:"프롤로그",lovedream:"사랑의 꿈 (일부 공개)",lovesong:"사랑의 노래",
      resonance:"사랑의 공명 (잠김)",dance:"사랑의 춤 (잠김)",chorus:"사랑의 합창 (잠김)",
      epilogue:"에필로그",indexList:"작품 목록",
      indexTitle:"색인",indexSub:"존재하는 작품은 클릭하면 바로 이동합니다",
      indexBtnLabel:"버튼",indexThumbLabel:"썸네일",
      infoBack:"뒤로",infoHelpTitle:"사용법",
      infoNav:"이전 / 다음 작품",infoMenu:"메뉴 열기 / 닫기",
      infoIndex:"작품 목록 열기 / 닫기",infoHelp:"도움말 열기 / 닫기",
      infoP:"사진만 보기",infoT:"사진 + 텍스트 보기",infoA:"전체 UI 보기",
      infoG:"독자의 말 열기 / 닫기",
      infoEsc:"닫기 / 전체 UI 복귀",copyright:"© Vitro Narida. All rights reserved.",
      menuH_GB:"독자의 말",gbTitle:"독자의 말"},
  EN:{tocTitle:"Menu",menuH_TOC:"Contents",menuH_INDEX:"Index",menuH_CONTACT:"Contact",
      menuH_ABOUT:"About",aboutTitle:"Artist’s Note",aboutBody:`Dazzling sunlight,
a gentle breeze,
in the graceful poise of swans
the shimmering light
sparkles like jewels.

Swans and their reflections
blend into each other’s colors
and the whole world spreads into love.

Every moment of love opens with you,
and love is complete with you.`,menuH_COPY:"Copyright",
      homeText:"Every moment of love opens with you.",
      prologue:"Prologue",lovedream:"Love Dream (Selection)",lovesong:"Love Song",
      resonance:"Love Resonance (locked)",dance:"Love Dance (locked)",chorus:"Love Chorus (locked)",
      epilogue:"Epilogue",indexList:"Artwork List",
      indexTitle:"Index",indexSub:"Click on existing artworks to navigate",
      indexBtnLabel:"Buttons",indexThumbLabel:"Thumbnails",
      infoBack:"Back",infoHelpTitle:"How to Use",
      infoNav:"Prev / Next",infoMenu:"Open / Close Menu",
      infoIndex:"Open / Close Index",infoHelp:"Open / Close Help",
      infoP:"Photo Only",infoT:"Photo + Text",infoA:"Full UI",
      infoG:"Open / Close Reader's Words",
      infoEsc:"Close / Restore Full UI",copyright:"© Vitro Narida. All rights reserved.",
      menuH_GB:"Reader's Words",gbTitle:"Reader's Words"}
};

const goTo = (url) => {
  if (!url) return;
  // 모든 오버레이 즉시 숨기기 (transition 무시 — 잔상 완전 방지)
  document.querySelectorAll(".overlay-panel").forEach(el => {
    el.classList.remove("on");
    el.setAttribute("aria-hidden","true");
    el.style.transition = "none";
    el.style.opacity = "0";
    el.style.pointerEvents = "none";
    el.style.display = "none";
  });
  // 타임스탬프 추가로 bfcache 완전 무력화
  const sep = url.includes("?") ? "&" : "?";
  const dest = url + sep + "_t=" + Date.now();
  const bo = document.getElementById("blackout");
  if (bo) { bo.classList.add("on"); setTimeout(() => { location.href = dest; }, 200); }
  else { location.href = dest; }
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
          <div></div>
          <div class="toc-close" id="tocClose">✕</div>
        </div>
        <div class="mob-unified-body">
          <div class="mob-unified-left">
            <h3 class="mob-col-title" id="tocTitle">${t.tocTitle}</h3>
            <div class="menu-section">
              <h3 class="menu-h" id="menuH_TOC">${t.menuH_TOC}</h3>
              <ul class="toc-list">
                <li class="toc-item" id="tocHome" style="cursor:pointer;"><span class="toc-bullet">●</span><span class="toc-text">intro</span></li>
                <li class="toc-item${SC.tocSection==="prologue"?" toc-current":""}" id="tocPrologue"><span class="toc-bullet">●</span><span class="toc-text">${t.prologue}</span></li>
                <li class="toc-item${SC.tocSection==="lovedream"?" toc-current":""}" id="tocLoveDream"><span class="toc-bullet">●</span><span class="toc-text">${t.lovedream.replace(/\s*\(.*?\)/g,"")}</span></li>
                <li class="toc-item${SC.tocSection==="lovesong"?" toc-current":""}" id="tocLoveSong"><span class="toc-bullet">●</span><span class="toc-text">${t.lovesong.replace(/\s*\(.*?\)/g,"")}</span></li>
                <li class="toc-item toc-locked" id="tocResonance"><span class="toc-bullet">●</span><span class="toc-text">${t.resonance.replace(/\s*\(.*?\)/g,"")}</span></li>
                <li class="toc-item toc-locked" id="tocDance"><span class="toc-bullet">●</span><span class="toc-text">${t.dance.replace(/\s*\(.*?\)/g,"")}</span></li>
                <li class="toc-item toc-locked" id="tocChorus"><span class="toc-bullet">●</span><span class="toc-text">${t.chorus.replace(/\s*\(.*?\)/g,"")}</span></li>
                <li class="toc-item${SC.tocSection==="epilogue"?" toc-current":""}" id="tocEpilogue"><span class="toc-bullet">●</span><span class="toc-text">${t.epilogue}</span></li>
              </ul>
            </div>
            <div class="menu-section">
              <h3 class="menu-h menu-h-link" id="menuH_ABOUT" tabindex="0">${t.menuH_ABOUT}</h3>
            </div>
            <div class="menu-section">
              <h3 class="menu-h menu-h-link" id="menuH_GB" tabindex="0">${t.menuH_GB}</h3>
            </div>
            <div class="menu-section">
              <div class="mob-contact-icons">
                <a href="mailto:vitronarida@gmail.com" title="E-Mail">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/></svg>
                </a>
                <a href="https://instagram.com/vitro.narida" target="_blank" rel="noopener">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/></svg>
                </a>
              </div>
            </div>
            <div class="menu-section">
              <div class="mob-copyright">© Vitro Narida.<br>All rights reserved.</div>
            </div>
            <div class="menu-section">
              <div class="lang-toggle">
                <div class="lang-btn${curLang==="KR"?" active":""}" id="langKR">KR</div>
                <div class="lang-btn${curLang==="EN"?" active":""}" id="langEN">EN</div>
              </div>
            </div>
          </div>
          <div class="mob-unified-right">
            <div class="mob-right-header">
              <h3 class="mob-col-title">${t.indexTitle}</h3>
              <div class="mob-expand-btn" id="mobExpandBtn">
                <svg viewBox="0 0 24 24"><path d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9m11.25-5.25v4.5m0-4.5h-4.5m4.5 0L15 9m-11.25 11.25v-4.5m0 4.5h4.5m-4.5 0L9 15m11.25 5.25v-4.5m0 4.5h-4.5m4.5 0L15 15"/></svg>
              </div>
            </div>
            <div class="mob-thumb-grid" id="mobThumbGrid"></div>
          </div>
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
      <div class="index-panel panel-box">
        <div class="toc-handle"></div>
        <div class="toc-header" style="margin-bottom:8px;">
          <div>
            <h2 class="index-title" id="aboutTitle"></h2>
          </div>
          <div class="toc-close" id="aboutClose">✕</div>
        </div>
        <div class="index-grid about-mode" id="aboutGrid"></div>
      </div>
    </div>
    <div id="gbOverlay" class="overlay-panel" aria-hidden="true" style="display:none;">
      <div class="overlay-backdrop" id="gbBackdrop"></div>
      <div class="gb-panel panel-box">
        <div class="toc-handle"></div>
        <div class="toc-header" style="margin-bottom:8px;">
          <div><h2 class="gb-title" id="gbTitle">${t.gbTitle}</h2></div>
          <div class="toc-close" id="gbClose">✕</div>
        </div>
        <div id="gbAuthArea"></div>
        <div id="gbFormArea"></div>
        <div id="gbListArea"></div>
      </div>
    </div>
    <div id="thumbOverlay" class="overlay-panel" aria-hidden="true" style="display:none;">
      <div class="overlay-backdrop" id="thumbBackdrop"></div>
      <div class="index-panel panel-box">
        <div class="toc-handle"></div>
        <div class="toc-header" style="margin-bottom:8px;">
          <div><h2 class="index-title" id="thumbTitle">${t.indexList}</h2></div>
          <div style="display:flex;align-items:center;gap:8px;">
            <div class="thumb-menu-btn" id="thumbMenuBtn" style="cursor:pointer;padding:4px;opacity:0.7;">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:20px;height:20px;"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/></svg>
            </div>
            <div class="toc-close" id="thumbClose">✕</div>
          </div>
        </div>
        <div class="index-body">
          <div class="thumb-grid" id="thumbGrid"></div>
        </div>
      </div>
    </div>`;
  } else {
    // 데스크탑
    return `
    <a href="#mainContent" class="skip-link">Skip to main content</a>
    <div id="blackout" aria-hidden="true"></div>
    <div id="tocOverlay" class="overlay-panel" aria-hidden="true">
      <div class="overlay-backdrop" id="tocBackdrop"></div>
      <div class="unified-panel panel-box" role="dialog" aria-modal="true" aria-label="Menu">
        <div class="toc-close" id="tocClose" aria-label="Close">✕</div>
        <div class="unified-left">
          <div class="toc-main">
            <div class="toc-header">
              <h2 class="toc-title" id="tocTitle">${t.tocTitle}</h2>
              <div class="langToggle">
                <div class="langBtn${curLang==="EN"?" active":""}" id="langEN" role="button" tabindex="0">EN</div>
                <div class="langBtn${curLang==="KR"?" active":""}" id="langKR" role="button" tabindex="0">KR</div>
              </div>
            </div>
            <div class="menu-section">
              <h3 class="menu-h" id="menuH_TOC">${t.menuH_TOC}</h3>
              <ul class="toc-list">
                <li class="toc-item" id="tocHome" style="cursor:pointer;"><span class="toc-bullet">●</span><span class="toc-text">intro</span></li>
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
              <h3 class="menu-h menu-h-link has-tooltip" id="menuH_ABOUT" tabindex="0" data-tooltip="${curLang==="KR"?"작가의 이야기":"Artist's story"}">${t.menuH_ABOUT}</h3>
            </div>
            <div class="menu-section">
              <h3 class="menu-h menu-h-link has-tooltip" id="menuH_GB" tabindex="0" data-tooltip="${curLang==="KR"?"감상과 응원을 남겨주세요":"Leave your thoughts"}">${t.menuH_GB}</h3>
            </div>
            <div class="menu-section">
              <div class="contact-icons">
                <a href="mailto:vitronarida@gmail.com" class="contact-icon" title="E-Mail">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/></svg>
                </a>
                <a href="https://instagram.com/vitro.narida" target="_blank" rel="noopener noreferrer" class="contact-icon" title="Instagram">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/></svg>
                </a>
              </div>
            </div>
            <div class="menu-section">
              <div class="menu-copyright" id="copyrightLine">© Vitro Narida.<br>All rights reserved.</div>
            </div>
          </div>
          <div class="toc-info-btn" id="tocInfoBtn" aria-label="Information" tabindex="0">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:18px;height:18px;"><path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.064.852l-.708 2.836a.75.75 0 0 0 1.064.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" /></svg>
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
              <div class="info-row"><kbd>G</kbd> <span id="infoG">${t.infoG}</span></div>
              <div class="info-row"><kbd>Esc</kbd> <span id="infoEsc">${t.infoEsc}</span></div>
            </div>
            <div class="info-version">${BUILD_TS}</div>
          </div>
        </div>
        <div class="unified-right">
          <div class="unified-right-header">
            <h2 class="index-title" id="thumbTitle">${t.indexTitle}</h2>
            <div class="thumb-expand-btn" id="thumbExpandBtn" tabindex="0" title="${curLang==="KR"?"전체 화면":"Full view"}">
              <svg class="icon-expand" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9m11.25-5.25v4.5m0-4.5h-4.5m4.5 0L15 9m-11.25 11.25v-4.5m0 4.5h4.5m-4.5 0L9 15m11.25 5.25v-4.5m0 4.5h-4.5m4.5 0L15 15"/></svg>
              <svg class="icon-collapse" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25"/></svg>
            </div>
          </div>
          <div class="unified-thumb-body">
            <div class="thumb-grid" id="thumbGrid"></div>
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
      <div class="index-panel panel-box">
        <div class="toc-handle"></div>
        <div class="toc-header" style="margin-bottom:8px;">
          <div>
            <h2 class="index-title" id="aboutTitle"></h2>
          </div>
          <div class="toc-close" id="aboutClose">✕</div>
        </div>
        <div class="index-grid about-mode" id="aboutGrid"></div>
      </div>
    </div>
    <div id="gbOverlay" class="overlay-panel" aria-hidden="true" style="display:none;">
      <div class="overlay-backdrop" id="gbBackdrop"></div>
      <div class="gb-panel panel-box" role="dialog" aria-modal="true">
        <div class="gb-close" id="gbClose" aria-label="Close">✕</div>
        <h2 class="gb-title" id="gbTitle">${t.gbTitle}</h2>
        <div id="gbAuthArea"></div>
        <div id="gbFormArea"></div>
        <div id="gbListArea"></div>
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

// ===== index → 첫 페이지: 정사각형만 흰색 전환 =====
const fromIndex = new URLSearchParams(window.location.search).get("from") === "index";

// ===== INDEX 렌더 =====
const renderIndex = (gridId) => {
  const grid = document.getElementById(gridId || "indexGrid"); if (!grid) return;
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
    if (isMobile) {
      const grid = document.getElementById("mobThumbGrid");
      if (grid) { currentHearts = getHeartsCache(); buildThumbGrid(grid, currentHearts); }
    }
    else renderThumbnails();
  },
  close: () => {
    const ov=document.getElementById("tocOverlay");
    ov.classList.remove("on"); ov.setAttribute("aria-hidden","true");
    document.querySelector(".toc-panel")?.classList.remove("show-info");
    document.querySelector(".unified-left")?.classList.remove("show-info");
    document.querySelector(".unified-panel")?.classList.remove("expanded");
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
    setTimeout(()=>{
      if(ov) ov.style.display="none";
      if(grid){ grid.innerHTML = ""; }
    }, 420);
  }
};

const AboutManager = {
  open: () => {
    if (isMobile) TOCManager.close();
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

// ===== Guestbook 매니저 (Dynamic Import) =====
let gbScriptLoaded = false;
const GuestbookManager = {
  open: () => {
    if (isMobile) TOCManager.close();
    const ov = document.getElementById("gbOverlay");
    if (!ov) return;
    ov.style.display = "flex";
    ov.classList.add("on");
    ov.setAttribute("aria-hidden","false");

    if (!gbScriptLoaded) {
      gbScriptLoaded = true;
      const s = document.createElement("script");
      s.src = "../guestbook.js?v=" + Date.now();
      s.onload = () => {
        if (typeof window.initGuestbook === "function") window.initGuestbook(curLang);
      };
      document.head.appendChild(s);
    } else {
      if (typeof window.initGuestbook === "function") window.initGuestbook(curLang);
    }
  },
  close: () => {
    const ov = document.getElementById("gbOverlay");
    if (!ov) return;
    ov.classList.remove("on");
    ov.setAttribute("aria-hidden","true");
    setTimeout(() => { ov.style.display = "none"; }, 420);
  }
};

// ===== 썸네일 INDEX 렌더 =====
const HEART_PATH = "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z";

// Firebase 설정 (guestbook과 동일 프로젝트)
const HEART_FB_CONFIG = {
  apiKey:            "AIzaSyCM-4subBV6n9zEUgFq9D1b4mUSsNjGzlc",
  authDomain:        "moment-of-love-d0dbb.firebaseapp.com",
  projectId:         "moment-of-love-d0dbb",
  storageBucket:     "moment-of-love-d0dbb.firebasestorage.app",
  messagingSenderId: "276426425721",
  appId:             "1:276426425721:web:c402f613c67c8968435ba8"
};

let heartFBReady = false;
let heartAuth = null;
let heartDB = null;

const loadHeartFirebase = () => new Promise((resolve) => {
  if (heartFBReady) { resolve(); return; }
  if (typeof firebase !== "undefined" && firebase.apps && firebase.apps.length) {
    heartAuth = firebase.auth();
    heartDB = firebase.firestore();
    heartFBReady = true;
    resolve();
    return;
  }
  const sdks = [
    "https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js",
    "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth-compat.js",
    "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore-compat.js"
  ];
  let loaded = 0;
  sdks.forEach(src => {
    if (document.querySelector(`script[src="${src}"]`)) { loaded++; if(loaded===sdks.length) init(); return; }
    const s = document.createElement("script");
    s.src = src;
    s.onload = () => { loaded++; if (loaded === sdks.length) init(); };
    document.head.appendChild(s);
  });
  function init() {
    if (!firebase.apps.length) firebase.initializeApp(HEART_FB_CONFIG);
    heartAuth = firebase.auth();
    heartDB = firebase.firestore();
    heartFBReady = true;
    resolve();
  }
});

/* Firestore 구조: photo_likes/{photoCode}
   { count: 42, likedBy: ["uid1", "uid2", ...] }
   - count: 총 하트 수 (나중에 카운트 표시 가능)
   - likedBy: 하트 누른 사용자 UID 배열
   - 문서 ID: LPL#01 → LPL_01 (# → _ 치환) */

// 문서 ID 안전 변환 (# → _)
const toDocId = (code) => code.replace(/#/g, "_");

// localStorage 캐시 (즉시 UI용)
const getHeartsCache = () => {
  try { return JSON.parse(localStorage.getItem("gallery_hearts") || "{}"); }
  catch { return {}; }
};
const saveHeartsCache = (h) => {
  try { localStorage.setItem("gallery_hearts", JSON.stringify(h)); } catch {}
};

// Firestore에서 내가 누른 하트 목록 읽기
const loadHeartsFromDB = async () => {
  try {
    await loadHeartFirebase();
    if (!heartAuth.currentUser) await heartAuth.signInAnonymously();
    const uid = heartAuth.currentUser.uid;
    const snapshot = await heartDB.collection("photo_likes").get();
    const h = {};
    snapshot.forEach(doc => {
      const data = doc.data();
      if (data.likedBy && data.likedBy.includes(uid)) {
        // 문서 ID(LPL_01)를 원래 코드(LPL#01)로 복원하여 캐시 저장
        const code = doc.id.replace(/_/g, "#");
        h[code] = true;
      }
    });
    saveHeartsCache(h);
    return h;
  } catch (err) { console.error("Hearts load error:", err); }
  return getHeartsCache();
};

// 개별 하트 토글 (Firestore)
const toggleHeartInDB = async (code, isLiking) => {
  try {
    await loadHeartFirebase();
    if (!heartAuth.currentUser) await heartAuth.signInAnonymously();
    const uid = heartAuth.currentUser.uid;
    const ref = heartDB.collection("photo_likes").doc(toDocId(code));
    if (isLiking) {
      await ref.set({
        count: firebase.firestore.FieldValue.increment(1),
        likedBy: firebase.firestore.FieldValue.arrayUnion(uid)
      }, { merge: true });
    } else {
      await ref.update({
        count: firebase.firestore.FieldValue.increment(-1),
        likedBy: firebase.firestore.FieldValue.arrayRemove(uid)
      });
    }
  } catch (err) { console.error("Heart toggle error:", err); }
};

let currentHearts = {};

const renderThumbnails = async () => {
  const grid = document.getElementById("thumbGrid"); if (!grid) return;
  grid.innerHTML = "";
  // Firebase 먼저 로드 (하트 클릭 전 준비 완료)
  const fbReady = loadHeartFirebase().catch(() => {});
  // 캐시로 즉시 렌더
  currentHearts = getHeartsCache();
  buildThumbGrid(grid, currentHearts);
  // Firebase 로드 완료 대기 후 Firestore에서 동기화
  await fbReady;
  const dbHearts = await loadHeartsFromDB();
  if (JSON.stringify(dbHearts) !== JSON.stringify(currentHearts)) {
    currentHearts = dbHearts;
    buildThumbGrid(grid, currentHearts);
  }
};

const buildThumbGrid = (grid, hearts) => {
  grid.innerHTML = "";
  const codeToScene = {};
  SCENES_ALL.forEach(sc => { if (sc.code) codeToScene[sc.code] = sc; });
  const LOCK_SVG = '<svg viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="10" rx="2" ry="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>';

  INDEX_ROWS.forEach(row => {
    if (row.type === "head") {
      const head = document.createElement("div");
      head.className = "thumb-section-head";
      head.textContent = row.label;
      grid.appendChild(head);
      return;
    }

    const code = row.code;
    const sc = codeToScene[code];
    const hasThumb = THUMB_CODES.has(code);
    const card = document.createElement("div");

    if (sc && hasThumb) {
      card.className = "thumb-card" + (sc.code === SC.code ? " thumb-current" : "");

      const img = document.createElement("img");
      img.className = "thumb-img";
      img.alt = curLang === "KR" ? sc.kr : sc.en;
      img.loading = "lazy";
      img.src = "../assets/thumb/" + sc.file + ".jpg";
      img.addEventListener("load", () => img.classList.add("loaded"));

      const codeEl = document.createElement("div");
      codeEl.className = "thumb-code";
      codeEl.textContent = sc.code;

      const liked = !!hearts[sc.code];
      const heart = document.createElement("div");
      heart.className = "thumb-heart";
      heart.innerHTML = `<svg viewBox="0 0 24 24" class="${liked ? "heart-filled" : "heart-empty"}"><path d="${HEART_PATH}"/></svg>`;

      heart.addEventListener("click", (e) => {
        e.stopPropagation();
        const isLiked = !!currentHearts[sc.code];
        if (isLiked) { delete currentHearts[sc.code]; }
        else { currentHearts[sc.code] = true; }
        saveHeartsCache(currentHearts);
        const svg = heart.querySelector("svg");
        svg.className.baseVal = isLiked ? "heart-empty" : "heart-filled";
        heart.classList.remove("pop");
        void heart.offsetHeight;
        heart.classList.add("pop");
        toggleHeartInDB(sc.code, !isLiked);
      });

      card.addEventListener("click", () => goTo("./" + sc.file + ".html"));
      card.append(img, codeEl, heart);
    } else {
      card.className = "thumb-card thumb-locked";

      const placeholder = document.createElement("div");
      placeholder.className = "thumb-placeholder";

      const lockIcon = document.createElement("div");
      lockIcon.className = "thumb-lock-icon";
      lockIcon.innerHTML = LOCK_SVG;

      const title = LOCKED_TITLES[code];
      if (title) {
        const titleEl = document.createElement("div");
        titleEl.className = "thumb-title";
        titleEl.textContent = title;
        card.append(placeholder, lockIcon, titleEl);
      } else {
        card.append(placeholder, lockIcon);
      }

      const codeEl = document.createElement("div");
      codeEl.className = "thumb-code";
      codeEl.textContent = code;
      card.appendChild(codeEl);
    }

    grid.appendChild(card);
  });
};

// ===== 썸네일 매니저 =====
const ThumbnailManager = {
  open: async () => {
    TOCManager.close();
    const ov = document.getElementById("thumbOverlay");
    if (!ov) return;
    ov.style.display = "flex";
    ov.classList.add("on");
    ov.setAttribute("aria-hidden","false");
    await renderThumbnails();
  },
  close: () => {
    const ov = document.getElementById("thumbOverlay");
    if (!ov) return;
    ov.classList.remove("on");
    ov.setAttribute("aria-hidden","true");
    setTimeout(() => {
      ov.style.display = "none";
      const grid = document.getElementById("thumbGrid");
      if (grid) grid.innerHTML = "";
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
  document.getElementById("gbBackdrop")?.addEventListener("click", GuestbookManager.close);
  document.getElementById("gbClose")?.addEventListener("click", GuestbookManager.close);
  document.getElementById("menuH_GB")?.addEventListener("click",(e)=>{e.preventDefault();e.stopPropagation();GuestbookManager.open();});
  document.getElementById("menuH_GB")?.addEventListener("keydown",(e)=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();GuestbookManager.open();}});
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
  document.getElementById("tocIndexBtn")?.addEventListener("click",(e)=>{e.preventDefault();e.stopPropagation();IndexManager.open();});
  document.getElementById("tocIndexBtn")?.addEventListener("keydown",(e)=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();IndexManager.open();}});
  document.getElementById("tocIndexThumb")?.addEventListener("click",(e)=>{e.preventDefault();e.stopPropagation();ThumbnailManager.open();});
  document.getElementById("tocIndexThumb")?.addEventListener("keydown",(e)=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();ThumbnailManager.open();}});
  document.getElementById("thumbBackdrop")?.addEventListener("click", ThumbnailManager.close);
  document.getElementById("thumbClose")?.addEventListener("click", ThumbnailManager.close);
  document.getElementById("thumbMenuBtn")?.addEventListener("click",(e)=>{e.preventDefault();e.stopPropagation();ThumbnailManager.close();setTimeout(()=>TOCManager.open(),200);});
  document.getElementById("thumbMenuBtn")?.addEventListener("keydown",(e)=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();ThumbnailManager.close();setTimeout(()=>TOCManager.open(),200);}});
  document.getElementById("mobExpandBtn")?.addEventListener("click",(e)=>{e.preventDefault();e.stopPropagation();TOCManager.close();setTimeout(()=>ThumbnailManager.open(),200);});
  document.getElementById("menuH_ABOUT")?.addEventListener("click",(e)=>{e.preventDefault();e.stopPropagation();AboutManager.open();});
  document.getElementById("menuH_ABOUT")?.addEventListener("keydown",(e)=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();AboutManager.open();}});

  const homeEl=document.getElementById("tocHome");
  homeEl?.addEventListener("click",(e)=>{e.preventDefault();TOCManager.close();try{sessionStorage.removeItem("gl_mode");}catch(e){}setTimeout(()=>goTo("../index.html"),200);});
};

// ===== 효과 함수 선언 (모바일/데스크탑 공통) =====
var _initRipple, _initRippleTop, FogFX;
var _makeNoiseBg = function(el){
  var sz=256,cv=document.createElement("canvas");cv.width=sz;cv.height=sz;
  var cx=cv.getContext("2d"),id=cx.createImageData(sz,sz),d=id.data;
  for(var i=0;i<d.length;i+=4){var v=Math.random()*255|0;d[i]=v;d[i+1]=v;d[i+2]=v;d[i+3]=255;}
  cx.putImageData(id,0,0);
  el.style.backgroundImage="url("+cv.toDataURL("image/png")+")";
  el.style.backgroundRepeat="repeat";
};

// 쉬어가기 페이지: 흐르는 꽃잎 효과
var _initRestFlow = function(container){
  var flow = container.querySelector('.rest-flow');
  if(!flow) return;
  var colors = [
    'radial-gradient(ellipse at 30% 30%, rgba(255,255,255,0.95) 0%, rgba(240,240,240,0.7) 50%, rgba(230,230,230,0.0) 100%)',
    'radial-gradient(ellipse at 30% 30%, rgba(255,218,225,0.95) 0%, rgba(250,184,196,0.7) 50%, rgba(244,160,180,0.0) 100%)',
    'radial-gradient(ellipse at 30% 30%, rgba(255,182,193,0.95) 0%, rgba(244,150,170,0.7) 50%, rgba(234,130,160,0.0) 100%)'
  ];
  var count = 15;
  var band = 80 / count;
  for(var i=0; i<count; i++){
    var p = document.createElement('div');
    p.className = 'rest-particle';
    p.style.background = colors[Math.floor(Math.random() * 3)];
    var scale = 0.7 + Math.random() * 0.45;
    var top = 5 + (i * band) + Math.random() * band;
    var dur = 8 + Math.random() * 8;
    var delay = -(Math.random() * dur);
    var peak = 0.7 + Math.random() * 0.3;
    var spinDur = 7 + Math.random() * 8;
    var drift = -(6 + Math.random() * 14);
    var br = [40+Math.random()*20, 40+Math.random()*20, 40+Math.random()*20, Math.random()*15].map(function(v){return v.toFixed(0)+'%';}).join(' ');
    p.style.borderRadius = br;
    p.style.top = top + '%';
    p.style.setProperty('--flow-top', top + '%');
    p.style.setProperty('--flow-peak', peak.toFixed(2));
    p.style.setProperty('--flow-drift', drift.toFixed(0) + 'px');
    p.style.animation = 'restFlow ' + dur.toFixed(1) + 's ' + delay.toFixed(1) + 's linear infinite, '
                       + 'restSpin ' + spinDur.toFixed(1) + 's ' + delay.toFixed(1) + 's ease-in-out infinite';
    p.style.width = (12.5 * scale).toFixed(1) + 'px';
    p.style.height = (8.75 * scale).toFixed(1) + 'px';
    flow.appendChild(p);
  }
};

// FOG FX (모바일/데스크탑 공통)
FogFX=(()=>{
  const root=document.documentElement,rnd=(a,b)=>a+Math.random()*(b-a);
  const _fogMob=isMobile;
  let timer=null,fogEl=null;
  return {
    bind:el=>{fogEl=el;},
    start:()=>{
      const tick=()=>{
        var tx=rnd(-2.2,2.2).toFixed(2);
        var ty=rnd(-2.0,2.0).toFixed(2);
        var sc=rnd(1.01,1.06).toFixed(3);
        if(fogEl){
          fogEl.style.transform="translate("+tx+"%,"+ty+"%) scale("+sc+")";
        }
        var nextOp = Math.random()<0.15 ? 0 : (_fogMob ? rnd(0.04,0.11) : rnd(0.05,0.15));
        if(fogEl)fogEl.style.setProperty("--fog-opacity",nextOp.toFixed(3));
        timer=setTimeout(tick,Math.floor(rnd(6000,12000)));
      };
      tick();
    }
  };
})();


  // ===== 프라하 반영 일렁임 효과 (canvas 방식) =====
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
      if(!iw||!ih)return;

      if(_coverMode){
        // 모바일 cover 모드: 전체 컨테이너 채움
        rippleEl.style.left="0px";
        rippleEl.style.width=sqW+"px";
        rippleEl.style.top="0px";
        rippleEl.style.height=sqH+"px";
        rippleEl.style.zIndex="10";
        var fadeStart=Math.round((1-SCREEN_RATIO)*100);
        var fadeEnd=Math.min(fadeStart+8,100);
        rippleEl.style.webkitMaskImage="linear-gradient(to bottom, transparent "+fadeStart+"%, black "+fadeEnd+"%, black 92%, transparent 100%)";
        rippleEl.style.maskImage="linear-gradient(to bottom, transparent "+fadeStart+"%, black "+fadeEnd+"%, black 92%, transparent 100%)";
        clone.style.width="100%";
        clone.style.height="100%";
        clone.style.objectFit="cover";
        clone.style.left="0px";
        clone.style.top="0px";
        clone.style.transformOrigin="center center";
        clone.style.transform="scale(1.015)";
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
        rippleEl.style.webkitMaskImage="linear-gradient(to bottom, transparent "+fadeStart+"%, black "+fadeEnd+"%, black 92%, transparent 100%)";
        rippleEl.style.maskImage="linear-gradient(to bottom, transparent "+fadeStart+"%, black "+fadeEnd+"%, black 92%, transparent 100%)";
        clone.style.width=rw+"px";
        clone.style.height=rh+"px";
        clone.style.left="0px";
        clone.style.top="0px";
        clone.style.transformOrigin="center center";
        clone.style.transform="scale(1.015)";
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
    setTimeout(function(){rippleEl.style.opacity="1";animate();},300);
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

// =========================================
// ===== 모바일 렌더링 =====
// =========================================
if (isMobile) {
  const app = document.getElementById("app");

  // 사진 영역
  const photoArea = document.createElement("div");
  photoArea.className = "photo-area";
  photoArea.id = "mPhotoArea";

  const textEl = document.createElement("div");
  textEl.id = "mSceneText";
  textEl.className = SC.type==="rest" ? "scene-text rest-text" : "scene-text";
  if (SC.id === "RST_05") textEl.classList.add("rest-note");
  textEl.textContent = curLang==="KR" ? SC.textKR : SC.textEN;

  if (SC.type === "rest") {
    var restStillClass = SC.id === "RST_01" ? " rest-still" : "";
    photoArea.innerHTML = `<div class="rest-photo"><div class="rest-icon-wrap${restStillClass}"><div class="rest-ring"></div><div class="rest-ring r2"></div><div class="rest-arrow-icon"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5"/></svg></div></div></div>`;
    var restIconWrap = photoArea.querySelector(".rest-icon-wrap");
    if(restIconWrap && SC.nextURL) restIconWrap.addEventListener("click",()=>goTo(SC.nextURL));
    textEl.classList.add("show");
  } else {
    const img = document.createElement("img");
    img.className="scene-img"; img.id="mSceneImg"; img.alt=SC.code||"";
    img.src = SC.imgSrc;

    // 안개 오버레이 (fog 타입)
    var mFogEl=null;
    photoArea.appendChild(img);
    if(SC.type==="fog"){
      var fogAtmo=document.createElement("div"); fogAtmo.className="fog-atmo";
      var fogAtmo2=document.createElement("div"); fogAtmo2.className="fog-atmo2";
      var fogTint=document.createElement("div"); fogTint.className="fog-tint-m";
      mFogEl=document.createElement("div"); mFogEl.className="fog-overlay-m"; mFogEl.id="fogNoiseM";
      _makeNoiseBg(mFogEl);
      photoArea.appendChild(fogAtmo);
      photoArea.appendChild(fogAtmo2);
      photoArea.appendChild(fogTint);
      photoArea.appendChild(mFogEl);
    }

    const onLoad = () => {
      img.classList.add("show");
      setTimeout(()=>textEl.classList.add("show"), 400);

      // 안개 시작 (HQ 로딩 후 딜레이)
      if(SC.type==="fog"&&mFogEl&&FogFX){
        FogFX.bind(mFogEl);
        setTimeout(()=>{
          mFogEl.style.opacity="0";
          requestAnimationFrame(()=>{void mFogEl.offsetHeight; mFogEl.style.opacity=""; mFogEl.classList.add("animated"); FogFX.start();});
        },1500);
      }

      // 리플 초기화 (prague/dreams)
      if(SC.id==="prague"||SC.id==="dreams"){
        setTimeout(()=>{
          if(img._rippleStarted)return;
          img._rippleStarted=true;
          if(SC.id==="prague") _initRipple(img, photoArea);
          else _initRippleTop(img, photoArea);
        },300);
      }
    };
    if(img.complete&&img.naturalWidth>0){onLoad();}
    else{
      img.addEventListener("load",onLoad,{once:true});
      const poll=setInterval(()=>{if(img.naturalWidth>0){clearInterval(poll);onLoad();}},16);
      img.addEventListener("load",()=>clearInterval(poll),{once:true});
    }
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

  // index에서 온 경우: 정사각형만 흰색 → 서서히 투명
  if (fromIndex) {
    const wo = document.createElement("div");
    wo.style.cssText = "position:absolute;inset:0;z-index:50;background:#fff;pointer-events:none;transition:opacity 4000ms ease;";
    photoArea.appendChild(wo);
    setTimeout(() => { wo.style.opacity = "0"; }, 400);
    setTimeout(() => wo.remove(), 5000);
  }

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
    const gbOn=document.getElementById("gbOverlay")?.classList.contains("on");
    const thumbOn=document.getElementById("thumbOverlay")?.classList.contains("on");
    if(e.key==="Escape"){if(thumbOn)ThumbnailManager.close();else if(gbOn)GuestbookManager.close();else if(aboutOn)AboutManager.close();else if(indexOn)IndexManager.close();else if(menuOn)TOCManager.close();return;}
    if(e.key==="m"||e.key==="M"){e.preventDefault();menuOn?TOCManager.close():TOCManager.open();return;}
    if(menuOn||indexOn||aboutOn||gbOn||thumbOn)return;
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
    const fogAtmo=document.createElement("div"); fogAtmo.className="fog-atmo";
    const fogAtmo2=document.createElement("div"); fogAtmo2.className="fog-atmo2";
    const fog=document.createElement("div"); fog.className="fog"; fog.id="fogNoise"; fog.setAttribute("aria-hidden","true");
    _makeNoiseBg(fog);
    const txt=document.createElement("div"); txt.className="fog-text long-text"; txt.id="fogText";
    txt.textContent=curLang==="KR"?SC.textKR:SC.textEN;
    hero.append(lqip,hq,ov,fogAtmo,fogAtmo2,fog,txt); sq.appendChild(hero);
  } else if(SC.type==="img"){
    const img=document.createElement("img"); img.className="scene-img"; img.id=SC.id+"Img"; img.alt=SC.code||""; img.src=SC.imgSrc;
    const txt=document.createElement("div"); txt.className="scene-text long-text"; txt.id=SC.id+"Text";
    txt.textContent=curLang==="KR"?SC.textKR:SC.textEN;
    sq.append(img,txt);
  } else {
    const txt=document.createElement("div"); txt.className="scene-text long-text"; txt.id=SC.id+"Text";
    if (SC.id === "RST_05") txt.classList.add("rest-note");
    txt.textContent=curLang==="KR"?SC.textKR:SC.textEN;
    sq.appendChild(txt);
    if(SC.type==="rest"){
      sq.style.background="#1a1a1a";
      sq.classList.add("rest-sq");
      const iconWrap=document.createElement("div");
      iconWrap.className="rest-icon-wrap" + (SC.id==="RST_01" ? " rest-still" : "");
      iconWrap.innerHTML='<div class="rest-ring"></div><div class="rest-ring r2"></div><div class="rest-arrow-icon"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5"/></svg></div>';
      if(SC.nextURL) iconWrap.addEventListener("click",()=>goTo(SC.nextURL));
      sq.appendChild(iconWrap);
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
      btn.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:28px;height:28px;"><path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/><path stroke-linecap="round" stroke-linejoin="round" d="M9 9.563C9 9.252 9.252 9 9.563 9h4.874c.311 0 .563.252.563.563v4.874c0 .311-.252.563-.563.563H9.564A.562.562 0 0 1 9 14.437V9.564Z"/></svg>`;
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

  // index에서 온 경우: 정사각형만 흰색 → 서서히 투명
  if (fromIndex) {
    const wo = document.createElement("div");
    wo.style.cssText = "position:absolute;inset:0;z-index:50;background:#fff;pointer-events:none;transition:opacity 4000ms ease;";
    sq.appendChild(wo);
    setTimeout(() => { wo.style.opacity = "0"; }, 400);
    setTimeout(() => wo.remove(), 5000);
  }

  wrap.appendChild(sq); frame.appendChild(wrap); app.appendChild(frame);


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
        setTimeout(()=>hero.classList.add("lqip-hide"),TIMING.FOG_HQ());
        setTimeout(()=>hero.classList.add("show-text"),TIMING.FOG_TEXT());
        setTimeout(()=>frame.classList.add("nav-ready"),TIMING.FOG_TEXT()+50);
        // 안개: HQ 이미지 페이드인 완료 후 시작
        setTimeout(()=>{
          fogNoise.style.opacity="0";
          requestAnimationFrame(()=>{void fogNoise.offsetHeight; fogNoise.style.opacity=""; fogNoise.classList.add("animated"); FogFX.start();});
        },TIMING.FOG_HQ()+500);
      },TIMING.FOG_MIN_LQIP());
    };
    hqEl.addEventListener("load",begin,{once:true});
    if(hqEl.complete&&hqEl.naturalWidth>0)begin();
  } else if(SC.type==="img"){
    const imgEl=document.getElementById(SC.id+"Img");
    let _began=false;
    const begin=()=>{if(_began)return;_began=true;requestAnimationFrame(()=>{requestAnimationFrame(()=>{frame.classList.add("hq-show");setTimeout(()=>frame.classList.add("show-text"),TIMING.SCENE_TEXT());setTimeout(()=>frame.classList.add("nav-ready"),TIMING.SCENE_TEXT()+50);});});};
    if(imgEl.complete&&imgEl.naturalWidth>0){begin();}
    else{
      imgEl.addEventListener("load",begin,{once:true});
      const poll=setInterval(()=>{if(imgEl.naturalWidth>0){clearInterval(poll);begin();}},16);
      imgEl.addEventListener("load",()=>clearInterval(poll),{once:true});
    }
    // ===== ripple 초기화 (DOM 삽입 후) =====
    if(SC.id==="prague"||SC.id==="dreams"){
      const doRipple=()=>{
        if(imgEl._rippleStarted)return;
        imgEl._rippleStarted=true;
        if(SC.id==="prague") _initRipple(imgEl,sq);
        else _initRippleTop(imgEl,sq);
      };
      if(imgEl.complete&&imgEl.naturalWidth>0) doRipple();
      else{
        imgEl.addEventListener("load",doRipple,{once:true});
        const rp=setInterval(()=>{if(imgEl.naturalWidth>0){clearInterval(rp);doRipple();}},16);
        imgEl.addEventListener("load",()=>clearInterval(rp),{once:true});
      }
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
  document.getElementById("tocInfoBtn")?.addEventListener("click",()=>{const el=document.querySelector(".unified-left")||document.querySelector(".toc-panel");el?.classList.add("show-info");});
  document.getElementById("tocInfoBack")?.addEventListener("click",()=>{const el=document.querySelector(".unified-left")||document.querySelector(".toc-panel");el?.classList.remove("show-info");});
  document.getElementById("thumbExpandBtn")?.addEventListener("click",()=>{document.querySelector(".unified-panel")?.classList.toggle("expanded");});
  document.getElementById("thumbExpandBtn")?.addEventListener("keydown",(e)=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();document.querySelector(".unified-panel")?.classList.toggle("expanded");}});

  // 키보드
  document.addEventListener("keydown",(e)=>{
    const menuOn=document.getElementById("tocOverlay").classList.contains("on");
    const indexOn=document.getElementById("indexOverlay").classList.contains("on");
    const aboutOn=document.getElementById("aboutOverlay")?.classList.contains("on");
    const gbOn=document.getElementById("gbOverlay")?.classList.contains("on");
    if(e.key==="Escape"){
      if(gbOn){e.preventDefault();GuestbookManager.close();return;}
      if(aboutOn){e.preventDefault();AboutManager.close();return;}
      if(indexOn){e.preventDefault();IndexManager.close();return;}
      if(menuOn){e.preventDefault();TOCManager.close();return;}
      return;
    }
    if(e.key==="m"||e.key==="M"){e.preventDefault();menuOn?TOCManager.close():TOCManager.open();return;}
    if(e.key==="i"||e.key==="I"){e.preventDefault();indexOn?IndexManager.close():IndexManager.open();return;}
    if(e.key==="g"||e.key==="G"){e.preventDefault();gbOn?GuestbookManager.close():GuestbookManager.open();return;}
    if(e.key==="h"||e.key==="H"){e.preventDefault();if(!menuOn)TOCManager.open();setTimeout(()=>{const el=document.querySelector(".unified-left")||document.querySelector(".toc-panel");el?.classList.add("show-info");},50);return;}
    if(e.key==="p"||e.key==="P"){e.preventDefault();uiMode=1;applyUIMode();return;}
    if(e.key==="t"||e.key==="T"){e.preventDefault();uiMode=2;applyUIMode();return;}
    if(menuOn||indexOn||aboutOn||gbOn)return;
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

// ===== 터치패드 스와이프 (데스크탑 모드) =====
if(!isMobile){
  let wheelTimer = null;
  document.addEventListener("wheel",(e)=>{
    if(e.ctrlKey) return; // 줌은 무시
    // 오버레이가 열려 있으면 스크롤은 오버레이 내부용 → 네비 차단
    if(document.querySelector(".overlay-panel.on")) return;
    clearTimeout(wheelTimer);
    wheelTimer = setTimeout(()=>{
      const dx = e.deltaX, dy = e.deltaY;
      // 더 큰 축 기준으로 방향 판단
      if(Math.abs(dx) >= Math.abs(dy)){
        if(dx > 30) goTo(SC.nextURL);
        else if(dx < -30) goTo(SC.prevURL);
      } else {
        if(dy > 30) goTo(SC.nextURL);
        else if(dy < -30) goTo(SC.prevURL);
      }
    }, 50);
  },{passive:true});
}

// bfcache 완전 비활성화
window.addEventListener("unload", ()=>{});

// 브라우저 창 포커스 복귀 시 ripple 재시작
window.addEventListener("focus", () => {
  const img = document.querySelector(".scene-img");
  const sqF = document.getElementById("mainContent") || document.getElementById("mPhotoArea");
  if (!img || !sqF) return;
  const id = (window.THIS_SCENE||{}).id;
  img._rippleStarted = false;
  if (id === "prague") _initRipple(img, sqF);
  else if (id === "dreams") _initRippleTop(img, sqF);
});

// bfcache 복귀 시 sq 크기가 0인 경우 재계산
window.addEventListener("pageshow", (e) => {
  if (!e.persisted) return;
  const sqP = document.getElementById("mainContent") || document.getElementById("mPhotoArea");
  if (!sqP || sqP.offsetWidth > 0) return;
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const img = document.querySelector(".scene-img");
      if (!img) return;
      const id = (window.THIS_SCENE||{}).id;
      img._rippleStarted = false;
      if (id === "prague") _initRipple(img, sqP);
      else if (id === "dreams") _initRippleTop(img, sqP);
    });
  });
});

})();
// ===== 빌드 타임스탬프 배지 =====
(()=>{
  const vb=document.createElement("div");vb.id="versionBadge";
  vb.textContent=BUILD_TS;
  const s=document.createElement("style");
  s.textContent="#versionBadge{position:fixed;bottom:12px;right:12px;z-index:99999;font-family:monospace;font-size:11px;color:rgba(255,255,255,0.55);background:rgba(0,0,0,0.45);padding:4px 8px;border-radius:6px;opacity:0;pointer-events:none;transition:opacity 300ms ease;}#versionBadge.show{opacity:1;}";
  document.head.appendChild(s);
  document.body.appendChild(vb);
})();
