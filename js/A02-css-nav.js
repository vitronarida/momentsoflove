// ============================================================
// A02-css-nav.js  —  그룹 A (CSS)
// ============================================================

const CSS_A02_MOBILE = `

`;

const CSS_A02_DESKTOP = `
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
  .nav-btn:hover{ opacity:1; transform: scale(1.04) translateZ(0);  box-shadow: 0 3px 8px rgba(0,0,0,0.03);
}

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
`;
