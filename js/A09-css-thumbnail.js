// ============================================================
// A09-css-thumbnail.js  —  그룹 A (CSS)
// ============================================================

const CSS_A09_MOBILE = `
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
`;

const CSS_A09_DESKTOP = `
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
