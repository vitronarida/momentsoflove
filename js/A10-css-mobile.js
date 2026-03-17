// ============================================================
// A10-css-mobile.js  —  그룹 A (CSS)
// ============================================================

const CSS_A10_MOBILE = `
/* 모바일 info 타임스탬프 */
.info-version{ position:absolute; bottom:14px; right:18px; font-family:"Nanum Pen Script", cursive;
font-size:16px; color: rgba(180,180,180,0.35); }
/* 달빛 아이콘 - 모바일 */
.rest-icon-wrap{position:absolute;top:40%;left:50%;transform:translate(-50%,-50%);width:240px;height:240px;display:grid;place-items:center;cursor:pointer;z-index:15;}
.moon-core{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:84px;height:84px;border-radius:999px;background:radial-gradient(circle,rgba(255,252,235,0.47) 0%,rgba(220,210,180,0.3) 50%,transparent 100%);animation:moonBreathe 6.4s ease-in-out infinite;z-index:3;}
.moon-glow1{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:210px;height:210px;border-radius:999px;background:radial-gradient(circle,rgba(220,210,170,0.11) 0%,rgba(200,190,150,0.04) 55%,transparent 100%);animation:moonGlow1 6.4s ease-in-out infinite;z-index:2;}
.moon-glow2{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:360px;height:360px;border-radius:999px;background:radial-gradient(circle,rgba(200,190,150,0.05) 0%,rgba(180,170,130,0.02) 55%,transparent 100%);animation:moonGlow2 6.4s ease-in-out infinite;z-index:1;}
.moon-ring{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:150px;height:150px;border-radius:999px;border:0.5px solid rgba(220,210,170,0.12);animation:moonRing 6s ease-out infinite;z-index:2;}
.moon-ring.r2{width:240px;height:240px;border-color:rgba(200,190,150,0.06);animation-delay:2s;}
@keyframes moonBreathe{0%,100%{opacity:0.4;transform:translate(-50%,-50%) scale(0.95)}50%{opacity:0.5;transform:translate(-50%,-50%) scale(1.05)}}
@keyframes moonGlow1{0%,100%{opacity:0.3;transform:translate(-50%,-50%) scale(0.92)}50%{opacity:0.5;transform:translate(-50%,-50%) scale(1.08)}}
@keyframes moonGlow2{0%,100%{opacity:0.25;transform:translate(-50%,-50%) scale(0.88)}50%{opacity:0.45;transform:translate(-50%,-50%) scale(1.12)}}
@keyframes moonRing{0%{transform:translate(-50%,-50%) scale(1);opacity:0.25}70%{transform:translate(-50%,-50%) scale(1.8);opacity:0}100%{transform:translate(-50%,-50%) scale(1.8);opacity:0}}
`;

const CSS_A10_DESKTOP = `
/* 모바일 터치 최적화 */
  html{ touch-action:pan-x pan-y; -webkit-text-size-adjust:100%; }
  body{ overscroll-behavior:none; }
  .square-frame{ touch-action:none; }
  @media (prefers-reduced-motion: reduce){
    *, *::before, *::after{ animation-duration:0.01ms !important; transition-duration:0.01ms !important; }
    .fog.animated{ animation:none !important; }
  }
`;
