// ============================================================
// A11-css-desktop.js  —  그룹 A (CSS)
// ============================================================

const CSS_A11_MOBILE = `
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
.slst-title{ font-family:"Nanum Pen Script",cursive; font-size:clamp(20px,2.5vw,26px); color:rgba(235,235,235,0.72); line-height:1.3; cursor:default; word-break:keep-all; }
.slst-title.has-poem{ cursor:pointer; }
.slst-title.has-poem:hover{ text-decoration:underline; text-underline-offset:4px; }
@keyframes slst-shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-5px)} 75%{transform:translateX(5px)} }
.slst-shake { animation: slst-shake 0.35s ease; }
.slst-lock-tag{ display:inline-block; vertical-align:middle; margin-left:8px; opacity:0.5; flex-shrink:0; }
.slst-lock-tag svg{ width:13px; height:13px; stroke:rgba(212,175,55,0.9); fill:none; stroke-width:2.0; display:block; }
.slst-current{ background:rgba(212,175,55,0.06); }
.slst-current .slst-title{ color:rgba(212,175,55,0.88); }
.slst-divider{ height:18px; flex-shrink:0; }
`;

const CSS_A11_DESKTOP = `
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
.slst-title{ font-family:"Nanum Pen Script",cursive; font-size:clamp(20px,2.5vw,26px); color:rgba(235,235,235,0.75); line-height:1.3; cursor:default; word-break:keep-all; }
.slst-title.has-poem{ cursor:pointer; }
.slst-title.has-poem:hover{ text-decoration:underline; text-underline-offset:4px; }
.slst-lock-tag{ display:inline-block; vertical-align:middle; margin-left:8px; opacity:0.5; flex-shrink:0; }
.slst-lock-tag svg{ width:14px; height:14px; stroke:rgba(212,175,55,0.9); fill:none; stroke-width:2.0; display:block; }
.slst-current{ background:rgba(212,175,55,0.06); }
.slst-current .slst-title{ color:rgba(212,175,55,0.88); }
.slst-divider{ height:22px; flex-shrink:0; }
`;
