// ============================================================
// A03-css-scene.js  —  그룹 A (CSS)
// ============================================================

const CSS_A03_MOBILE = `
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
`;

const CSS_A03_DESKTOP = `
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
`;
