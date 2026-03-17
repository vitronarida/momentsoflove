// ============================================================
// D01-effects.js  —  그룹 D (기능)
// 씬 효과 함수 — 효과 공통, 프라하 반영(canvas), lpl_04 물결
// 의존: B01-core, B02-scenes
// ============================================================

var isMobile = window._isMobile;
var SC = window.THIS_SCENE;

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