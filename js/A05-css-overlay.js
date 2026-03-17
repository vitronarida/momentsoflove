// ============================================================
// A05-css-overlay.js  —  그룹 A (CSS)
// ============================================================

const CSS_A05_MOBILE = `
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
`;

const CSS_A05_DESKTOP = `
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
`;
