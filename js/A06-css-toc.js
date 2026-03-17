// ============================================================
// A06-css-toc.js  —  그룹 A (CSS)
// ============================================================

const CSS_A06_MOBILE = `

`;

const CSS_A06_DESKTOP = `
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
`;
