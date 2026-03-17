// ============================================================
// A07-css-intro.js  —  그룹 A (CSS)
// ============================================================

const CSS_A07_MOBILE = `
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
`;

const CSS_A07_DESKTOP = `

`;
