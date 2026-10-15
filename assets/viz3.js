/* Third generation: pictogram stage flows, bar-in-bar timelines, and tabbed live-app screens. */

var IC={
 truck:'<path d="M1 6h13v10H1z"/><path d="M14 9h5l3 3v4h-8z"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/>',
 bell:'<path d="M6 9a6 6 0 0112 0c0 6 3 7 3 7H3s3-1 3-7z"/><path d="M10 20a2 2 0 004 0"/>',
 recycle:'<path d="M4 12a8 8 0 0113-6l3 3"/><path d="M20 4v5h-5"/><path d="M20 12a8 8 0 01-13 6l-3-3"/><path d="M4 20v-5h5"/>',
 factory:'<path d="M2 21V10l6 4v-4l6 4V6h4v15z"/>',
 chat:'<path d="M4 5h16v11H9l-5 4z"/>',
 scale:'<path d="M12 3v18"/><path d="M5 21h14"/><path d="M4 7h16"/><path d="M4 7l-2 7a3 3 0 006 0z"/><path d="M20 7l-2 7a3 3 0 006 0z"/>',
 sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/>',
 drop:'<path d="M12 3s7 7 7 12a7 7 0 01-14 0c0-5 7-12 7-12z"/>',
 cloud:'<path d="M7 18a5 5 0 010-10 6 6 0 0111 2 4 4 0 010 8z"/>',
 phone:'<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/>',
 shield:'<path d="M12 2l9 4v6c0 5-4 9-9 10-5-1-9-5-9-10V6z"/><path d="M8 12l3 3 5-6"/>',
 layers:'<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>',
 tree:'<circle cx="12" cy="9" r="6"/><path d="M12 15v7"/>',
 pin:'<path d="M12 22s7-7 7-12a7 7 0 00-14 0c0 5 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/>',
 leaf:'<path d="M4 21C4 10 11 3 22 3c0 11-7 18-18 18z"/><path d="M4 21L15 10"/>',
 flask:'<path d="M9 3h6"/><path d="M10 3v6l-5 10a2 2 0 002 3h10a2 2 0 002-3l-5-10V3"/>',
 grid:'<path d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z"/>',
 wave:'<path d="M2 12c3-4 5-4 8 0s5 4 8 0 3-3 4-2"/><path d="M2 18c3-4 5-4 8 0s5 4 8 0 3-3 4-2"/>',
 clip:'<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4h6v3H9zM8 12h8M8 16h6"/>',
 building:'<path d="M4 21V4h11v17"/><path d="M15 9h5v12"/><path d="M8 8h3M8 12h3M8 16h3"/>',
 map:'<path d="M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3z"/><path d="M9 3v15M15 6v15"/>',
 flag:'<path d="M5 22V3"/><path d="M5 4h13l-3 4 3 4H5"/>',
 play:'<circle cx="12" cy="12" r="9"/><path d="M10 8l6 4-6 4z"/>',
 database:'<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 2 3.5 3 8 3s8-1 8-3V5"/><path d="M4 12c0 2 3.5 3 8 3s8-1 8-3"/>'
};
function ico(k,cls){return '<svg class="pg '+(cls||'')+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+(IC[k]||IC.grid)+'</svg>'}

/* stage flow: big pictogram, two words, and a caption that changes when a stage is chosen */
var ICMAP={'Collection and fleet':'truck','Attention queue':'bell','Segregation':'recycle','Processing and disposal':'factory','Citizen and carbon':'chat','Reconciliation':'scale',
 '10 modules':'grid','Click to isolate':'layers','Simulation drills':'play','Task tickets':'clip','Hindi and English':'phone','Cooling centres':'sun','Shelters and routes':'building','Report an issue':'pin',
 'Map the resources':'map','Plan five interventions':'wave','Govern and track':'grid','Biodiversity survey':'leaf','Tree census':'tree','Carbon stock':'cloud','GIS portal':'layers'};
var SFID=0;
function stageFlow(items,colour){
  var id='sf'+(++SFID);
  var h='<div class="sflow" id="'+id+'" style="--sc:'+(colour||'var(--teal)')+'">';
  items.forEach(function(s,i){
    h+='<button class="sst'+(i===0?' on':'')+'" data-i="'+i+'" onclick="pickStage(\''+id+'\','+i+')"><span class="sic">'+ico(ICMAP[s[0]]||'grid')+'</span><span class="snm">'+s[0]+'</span></button>';
  });
  h+='</div><div class="scap" id="'+id+'c" data-c=\''+JSON.stringify(items.map(function(s){return s[1]})).replace(/'/g,'&#39;')+'\'>'+items[0][1]+'</div>';
  return h;
}
function pickStage(id,i){
  var f=document.getElementById(id);if(!f)return;
  Array.prototype.forEach.call(f.children,function(b,j){b.classList.toggle('on',j===i)});
  var p=document.getElementById(id+'p');if(p)Array.prototype.forEach.call(p.children,function(b,j){b.classList.toggle('on',j===i)});
  var c=document.getElementById(id+'c');var arr=JSON.parse(c.getAttribute('data-c').replace(/&#39;/g,"'"));if(arr.length)c.textContent=arr[i];
}
function stageGroups(gs,colour){
  return '<div class="sg">'+gs.map(function(g){return '<div><div class="solh">'+g[0]+'</div>'+stageFlow(g[1],colour)+'</div>'}).join('')+'</div>';
}

/* timeline: the label sits inside the bar; a flag marks the decision it enables */
function timeline(bars,decision,extra,tbc){
  var h='<div class="tl2"><div class="tl2h"><span class="tl2t">Phase 0</span><span class="tl2s">months 0 to 6</span>'+(tbc?'<span class="tbc">Drafted for EHM to confirm</span>':'')+'</div>'+
   '<div class="tl2g"><div class="tl2m">';
  for(var m=0;m<=6;m++)h+='<span>M'+m+'</span>';
  h+='</div>';
  bars.forEach(function(b,i){
    h+='<div class="tl2r"><div class="tl2b" style="left:'+(b[1]/6*100)+'%;width:'+((b[2]-b[1])/6*100)+'%;background:'+b[3]+'"><span>'+b[0]+'</span></div></div>';
  });
  h+='</div><div class="tl2d">'+ico('flag','pgl')+'<div><div class="tl2k">The decision it enables</div><div class="tl2v">'+decision+'</div></div></div>'+(extra||'')+'</div>';
  return h;
}

/* tabbed live-app screens, cycling by itself until someone chooses one */
var SHID=0;
function shots(tabs,link){
  var id='sh'+(++SHID);
  var h='<div class="shots" id="'+id+'" data-n="'+tabs.length+'"><div class="shtabs">';
  tabs.forEach(function(t,i){h+='<button class="'+(i===0?'on':'')+'" onclick="pickShot(\''+id+'\','+i+',1)">'+ico(t.ic||'grid')+t.tab+'</button>'});
  h+='<span class="sp"></span>'+(link||'')+'</div><div class="shbody">';
  tabs.forEach(function(t,i){h+='<div class="shp'+(i===0?' on':'')+'">'+astage({img:t.img,ar:t.ar,mini:99,alt:t.alt,anns:t.anns,strip:t.strip})+'</div>'});
  return h+'</div></div>';
}
var SHT={};
function pickShot(id,i,manual){
  var e=document.getElementById(id);if(!e)return;
  Array.prototype.forEach.call(e.querySelectorAll('.shtabs button'),function(b,j){b.classList.toggle('on',j===i)});
  Array.prototype.forEach.call(e.querySelectorAll('.shp'),function(b,j){b.classList.toggle('on',j===i)});
  e.setAttribute('data-cur',i);
  // annotations of the screen now shown
  Array.prototype.forEach.call(e.querySelectorAll('.shp.on .rg'),function(x){x.classList.add('on')});
  if(manual&&SHT[id]){clearInterval(SHT[id]);SHT[id]=null}
}
function shotsRun(on){
  Array.prototype.forEach.call(document.querySelectorAll('.shots'),function(e){
    var vis=!!e.closest('.bo.on');var id=e.id;
    if(vis&&!SHT[id]&&!e.getAttribute('data-stopped')){
      pickShot(id,+e.getAttribute('data-cur')||0,0);
      SHT[id]=setInterval(function(){var n=+e.getAttribute('data-n'),c=(+e.getAttribute('data-cur')||0)+1;pickShot(id,c%n,0)},4200);
    }else if(!vis&&SHT[id]){clearInterval(SHT[id]);SHT[id]=null}
  });
}
