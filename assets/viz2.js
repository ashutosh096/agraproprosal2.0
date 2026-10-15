/* Second generation visuals. The pictures are the stage: every generated scene carries
   annotations anchored to real objects in it, so the picture does the explaining.
   Ranged elements (class rg) show from beat data-b to beat data-e. */

/* ---------- annotated image stage ---------- */
function L(big,small,chip){return '<b>'+big+'</b>'+(small?'<span>'+small+'</span>':'')+(chip?'<i class="chp">'+gr(chip)+'</i>':'')}
function mbar(a,b,mx,ca,gapLab){
  /* two proportional bars: b is the part met, a the whole; the missing part is hatched */
  var wa=a/mx*100,wb=b/mx*100;
  return '<div class="mb"><div class="mbr"><i style="width:'+wa+'%;background:var(--edge)"></i></div><div class="mbr"><i style="width:'+wb+'%;background:'+ca+'"></i><i class="gap" style="width:'+(wa-wb)+'%"></i></div></div>';
}
function astage(c){
  var h='<div class="astage" data-mini="'+(c.mini||3)+'" style="aspect-ratio:'+(c.ar||2.16)+'"><img class="aimg" src="assets/img/'+c.img+'.jpg" alt="'+(c.alt||'')+'" style="object-position:'+(c.focus||'50% 50%')+'">';
  h+='<svg class="alines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">';
  c.anns.forEach(function(a){
    if(a.lx==null)return;
    h+='<line class="rg" data-b="'+a.b+'" data-e="'+(a.e||a.b)+'" x1="'+a.x+'" y1="'+a.y+'" x2="'+a.lx+'" y2="'+a.ly+'" stroke="'+(a.c||'var(--teal)')+'" stroke-width="2.4" vector-effect="non-scaling-stroke"/>';
  });
  h+='</svg>';
  c.anns.forEach(function(a){
    var col=a.c||'var(--teal)';
    if(!a.nodot)h+='<i class="adot rg'+(a.pulse?' pu':'')+'" data-b="'+a.b+'" data-e="'+(a.e||a.b)+'" style="left:'+a.x+'%;top:'+a.y+'%;--c:'+col+'"></i>';
    if(a.html)h+='<div class="albl rg'+(a.big?' bigl':'')+'" data-b="'+a.b+'" data-e="'+(a.e||a.b)+'" style="left:'+(a.lx==null?a.x:a.lx)+'%;top:'+(a.ly==null?a.y:a.ly)+'%;--c:'+col+(a.w?';max-width:'+a.w+'px':'')+'">'+a.html+'</div>';
  });
  if(c.strip)h+='<div class="astrip">'+c.strip+'</div>';
  return h+'</div>';
}

/* ---------- slide 2: six cards, each a picture of the problem ---------- */
function fcard(o){
  return '<button class="fc bt" data-b="'+o.b+'" onclick="openSrc(\''+o.k+'\')"><div class="fh"><span class="icw s"><img src="assets/img/ic_'+o.ic+'.png" alt=""></span><span class="fl">'+o.label+'</span>'+gr(o.k)+'</div>'+
   '<div class="fbig">'+o.big+'</div><svg viewBox="0 0 360 150" width="100%" aria-hidden="true">'+o.svg+'</svg>'+
   '<div class="fleg">'+o.leg+'</div><div class="fso">'+o.so+'</div></button>';
}
function sw(col,txt,kind){
  var st=kind==='hatch'?'background:repeating-linear-gradient(45deg,var(--bad) 0 2px,#fff 2px 6px);border:1.5px solid var(--bad)':kind==='dash'?'background:transparent;border:2px dashed '+col:'background:'+col;
  return '<span><i class="swt" style="'+st+'"></i>'+txt+'</span>';
}
function pat(id){return '<defs><pattern id="hp'+id+'" width="8" height="8" patternTransform="rotate(45)" patternUnits="userSpaceOnUse"><rect width="8" height="8" fill="#fff"/><line x1="0" y1="0" x2="0" y2="8" stroke="#c2410c" stroke-width="3"/></pattern></defs>'}
function cWaste(){
  var s='';for(var i=0;i<100;i++){var c=i%20,r=Math.floor(i/20);var x=6+c*17,y=8+r*17;
    if(i<92)s+='<rect x="'+x+'" y="'+y+'" width="14" height="14" rx="3" fill="#3f7a26"/>';
    else if(i<97)s+='<rect x="'+(x+1)+'" y="'+(y+1)+'" width="12" height="12" rx="3" fill="none" stroke="#3f7a26" stroke-width="2.2" stroke-dasharray="3 2.5"/>';
    else s+='<rect x="'+x+'" y="'+y+'" width="14" height="14" rx="3" fill="#e4e9f0"/>';}
  s+='<text x="6" y="118" font-size="12" font-weight="700" fill="#1b2a41">Each block is about 10 tonnes a day</text>';
  return fcard({b:1,k:'waste',ic:'compactor',label:'Waste',big:'916 <small>t/d</small>',svg:s,leg:sw('#3f7a26','generated, 916')+sw('#3f7a26','spare capacity, about 54','dash'),so:'The plants can take what the city generates. The question is how each tonne is counted.'});
}
function cWater(){
  var top=14,bot=136,H=bot-top,f=270/394;
  var s=pat('w')+'<rect x="30" y="'+top+'" width="92" height="'+H+'" rx="12" fill="#fff" stroke="#1b2a41" stroke-width="3"/>'+
   '<rect x="33" y="'+(top+3)+'" width="86" height="'+(H*(1-f))+'" fill="url(#hpw)"/>'+
   '<rect x="33" y="'+(top+3+H*(1-f))+'" width="86" height="'+(H*f-6)+'" rx="10" fill="#2f55c9"/>'+
   '<rect x="38" y="'+(top+8)+'" width="76" height="26" rx="6" fill="#fff"/><text x="76" y="'+(top+27)+'" font-size="16" font-weight="800" fill="#c2410c" text-anchor="middle">124 short</text>'+
   '<line x1="122" y1="'+top+'" x2="190" y2="'+top+'" stroke="#1b2a41" stroke-width="2"/><text x="196" y="'+(top+6)+'" font-size="17" font-weight="800" fill="#1b2a41">394 needed</text>'+
   '<line x1="122" y1="'+(top+H*(1-f))+'" x2="190" y2="'+(top+H*(1-f))+'" stroke="#2f55c9" stroke-width="2"/><text x="196" y="'+(top+H*(1-f)+6)+'" font-size="17" font-weight="800" fill="#2f55c9">270 supplied</text>'+
   '<text x="196" y="'+(bot-2)+'" font-size="12" font-weight="700" fill="#55627a">million litres a day</text>';
  return fcard({b:2,k:'wdem',ic:'tanker',label:'Water supply',big:'124 <small>MLD short</small>',svg:s,leg:sw('#2f55c9','supplied')+sw('#c2410c','not supplied','hatch'),so:'Nearly a third of the water the city needs is not supplied.'});
}
function cSewage(){
  var k=0.19; // px per MLD
  var y0=54,h320=320*k,h220=220*k,h100=100*k;
  var s='<rect x="6" y="'+y0+'" width="56" height="'+h320+'" fill="#55627a" rx="4"/><text x="34" y="'+(y0+h320/2+5)+'" font-size="15" font-weight="800" fill="#fff" text-anchor="middle">320</text>'+
   '<text x="6" y="'+(y0-8)+'" font-size="12" font-weight="700" fill="#55627a">sewage made</text>'+
   '<path d="M62,'+y0+' C120,'+y0+' 130,22 190,22 L190,'+(22+h220)+' C130,'+(22+h220)+' 120,'+(y0+h220)+' 62,'+(y0+h220)+' Z" fill="#2f55c9"/>'+
   '<path d="M62,'+(y0+h220)+' C120,'+(y0+h220)+' 130,'+(112)+' 190,112 L190,'+(112+h100)+' C130,'+(112+h100)+' 120,'+(y0+h320)+' 62,'+(y0+h320)+' Z" fill="#c2410c"/>'+
   '<rect x="190" y="22" width="14" height="'+h220+'" fill="#2f55c9"/><text x="212" y="'+(22+h220/2+5)+'" font-size="16" font-weight="800" fill="#2f55c9">220 treated</text>'+
   '<rect x="190" y="112" width="14" height="'+h100+'" fill="#c2410c"/><text x="212" y="'+(112+h100/2+5)+'" font-size="16" font-weight="800" fill="#c2410c">100 untreated</text>'+
   '<text x="212" y="'+(112+h100/2+22)+'" font-size="11.5" font-weight="700" fill="#55627a">reaches the Yamuna</text>';
  return fcard({b:3,k:'sew',ic:'stp_tank',label:'Sewage',big:'100 <small>MLD untreated</small>',svg:s,leg:sw('#2f55c9','treated')+sw('#c2410c','not treated'),so:'Treatment capacity is about a third short of what the city sends down its drains.'});
}
function cGround(){
  var st=[['#c2410c',8],['#e06c00',2],['#a15c07',3],['#0b6b3a',2]];var s='',i=0;
  st.forEach(function(g){for(var n=0;n<g[1];n++){var c=i%5,r=Math.floor(i/5);
    s+='<rect x="'+(8+c*40)+'" y="'+(10+r*40)+'" width="34" height="34" rx="6" fill="'+g[0]+'"/>';i++}});
  s+='<text x="222" y="42" font-size="34" font-weight="800" fill="#1b2a41">1.63x</text><text x="222" y="62" font-size="12.5" font-weight="700" fill="#55627a">drawn for every</text><text x="222" y="78" font-size="12.5" font-weight="700" fill="#55627a">1 that recharges</text>'+
   '<text x="222" y="112" font-size="12" font-weight="700" fill="#55627a">One square is one block</text>';
  return fcard({b:4,k:'gw',ic:'pump',label:'Groundwater',big:'8 <small>of 15 blocks over-exploited</small>',svg:s,leg:sw('#c2410c','over-exploited, 8')+sw('#e06c00','critical, 2')+sw('#a15c07','semi-critical, 3')+sw('#0b6b3a','safe, 2'),so:'Extraction is 162.71% of what recharges. Every block is a separate decision.'});
}
function cTrees(){
  var s='';for(var i=0;i<100;i++){var r=Math.floor(i/20),c=i%20;}
  // 10 x 10 grid, each cell is one percent of the district. Read row by row from the top left.
  var cs=10,gx=8,gy=8;
  for(var j=0;j<100;j++){var c=j%10,r=Math.floor(j/10);var x=gx+c*13.4,y=gy+r*13.4;
    if(j<6)s+='<rect x="'+x+'" y="'+y+'" width="11.6" height="11.6" rx="2" fill="#0f766e"/>';
    else if(j===6)s+='<rect x="'+x+'" y="'+y+'" width="11.6" height="11.6" rx="2" fill="#e4e9f0"/><rect x="'+x+'" y="'+y+'" width="6" height="11.6" rx="2" fill="#0f766e"/>';
    else if(j<33)s+='<rect x="'+(x+.8)+'" y="'+(y+.8)+'" width="10" height="10" rx="2" fill="none" stroke="#0f766e" stroke-width="1.8" stroke-dasharray="2.6 2.2"/>';
    else s+='<rect x="'+x+'" y="'+y+'" width="11.6" height="11.6" rx="2" fill="#e4e9f0"/>';}
  s+='<text x="158" y="38" font-size="38" font-weight="800" fill="#0f766e">6.5</text><text x="236" y="38" font-size="14" font-weight="800" fill="#1b2a41">of every 100</text><text x="158" y="58" font-size="12.5" font-weight="700" fill="#55627a">hectares is forest.</text>'+
   '<text x="158" y="96" font-size="12.5" font-weight="700" fill="#55627a">National target: 33</text><text x="158" y="112" font-size="12.5" font-weight="700" fill="#55627a">(the dashed cells)</text>';
  return fcard({b:5,k:'forest',ic:'tree_tag',label:'Trees',big:'6.50% <small>forest cover</small>',svg:s,leg:sw('#0f766e','forest today')+sw('#0f766e','still to reach the target','dash'),so:'Forest cover is under a fifth of the national target, and it fell by 9.38 sq km.'});
}
function cHeat(){
  var x=8,W=344;function p(t){return x+(t-24)/(50-24)*W}
  var s='<defs><linearGradient id="hgx" x1="0" x2="1"><stop offset="0" stop-color="#2f55c9"/><stop offset=".5" stop-color="#e0a020"/><stop offset="1" stop-color="#c2410c"/></linearGradient></defs>'+
   '<rect x="'+x+'" y="66" width="'+W+'" height="26" rx="13" fill="url(#hgx)"/>'+
   '<line x1="'+p(41.9)+'" y1="52" x2="'+p(41.9)+'" y2="104" stroke="#1b2a41" stroke-width="3"/><circle cx="'+p(41.9)+'" cy="79" r="9" fill="#fff" stroke="#1b2a41" stroke-width="3"/>'+
   '<text x="'+p(41.9)+'" y="44" font-size="22" font-weight="800" fill="#1b2a41" text-anchor="middle">41.9</text><text x="'+(p(41.9)+34)+'" y="118" font-size="12" font-weight="700" fill="#55627a" text-anchor="end">a normal May high</text>'+
   '<line x1="'+p(48.6)+'" y1="52" x2="'+p(48.6)+'" y2="104" stroke="#c2410c" stroke-width="4"/><circle cx="'+p(48.6)+'" cy="79" r="10" fill="#c2410c" stroke="#fff" stroke-width="3"/>'+
   '<text x="'+p(48.6)+'" y="44" font-size="22" font-weight="800" fill="#c2410c" text-anchor="middle">48.6</text><text x="'+p(48.6)+'" y="118" font-size="12" font-weight="700" fill="#c2410c" text-anchor="end">the record</text>'+
   '<text x="'+x+'" y="140" font-size="11" font-weight="700" fill="#55627a">24°C</text><text x="'+(x+W)+'" y="140" font-size="11" font-weight="700" fill="#55627a" text-anchor="end">50°C</text>';
  return fcard({b:6,k:'heat',ic:'weather_mast',label:'Heat',big:'48.6°C <small>record high</small>',svg:s,leg:sw('#1b2a41','normal May high')+sw('#c2410c','record'),so:'A record, not a typical summer. Every ward feels it differently.'});
}
function figureCards(){return '<div class="grid g3 fcg">'+cWaste()+cWater()+cSewage()+cGround()+cTrees()+cHeat()+'</div>'}

/* ---------- slide 3: four scenes, then one ward map ---------- */
function pkgStage(){
  var L4=[['Waste','var(--w)','Working product','Delivered by EHM','a2_waste','30% 60%',['Coverage','Tonnage','Fleet','Complaints']],
          ['Climate','var(--c)','Working product','Delivered by EHM','a3_climate','60% 50%',['Heat risk','Flood risk','Shelters','Alerts']],
          ['Water','var(--wa)','Baseline study and plan','EHM','a4_water','50% 55%',['Supply','Drains','Waterbodies','Groundwater']],
          ['Trees and carbon','var(--t)','Baseline study','EHM','a5_trees_w','45% 55%',['Canopy','Species','Unsafe trees','Carbon']]];
  var h='<div class="stack pkg"><div class="rg acc" data-b="1" data-e="4">';
  L4.forEach(function(l,i){
    h+='<div class="ac" data-k="'+(i+1)+'" style="--c:'+l[1]+'"><img src="assets/img/'+l[4]+'.jpg" alt="" style="object-position:'+l[5]+'"><div class="acs"><div class="acn">'+l[0]+'</div><div class="acty">'+l[2]+'</div><div class="acd">'+l[3]+'</div><div class="acw">Each ward carries: '+l[6].map(function(x){return '<em>'+x+'</em>'}).join('')+'</div></div></div>';
  });
  h+='</div><div class="rg" data-b="5" data-e="5"><div class="isow"><div class="isol">'+isoStack(true)+'</div><div class="isot"><div class="isob">One ward map</div>'+[['Waste','var(--w)','EHM'],['Climate','var(--c)','EHM'],['Water','var(--wa)','EHM'],['Trees and carbon','var(--t)','EHM']].map(function(l){return '<div class="isr"><i style="background:'+l[1]+'"></i><b>'+l[0]+'</b><span>'+l[2]+'</span></div>'}).join('')+'<div class="isos">100 wards. One record set for each. Led by EHM.</div></div></div></div></div>';
  return h;
}

/* ---------- slide 8: impact grid with an icon for each column ---------- */
var IMP_ICON=['compactor','weather_mast','pump','tree_tag'];

/* illustrative canopy shading on the 100 wards */
function canopyMap(){
  var h='<svg viewBox="0 0 '+WARDS_VB[0]+' '+WARDS_VB[1]+'" width="100%" aria-hidden="true">';
  WARDS.forEach(function(w,i){var v=((i*37)%100)/100;h+='<path d="'+w.d+'" fill="#0f766e" fill-opacity="'+(0.16+v*0.7).toFixed(2)+'" stroke="#fff" stroke-width="1"/>'});
  return h+'</svg>';
}

/* slide 9: the diorama with its own numbers, and a callout that follows the active number */
var CONN_PTS=[[298,259],[660,259],[902,259],[1230,259],[902,765],[1555,259]];
function connectionsImage(){
  var h='<div class="conn"><img src="assets/img/a6_connections.jpg" alt="Cross section of a city edge showing houses and street trees, a blocked storm drain, a sewage treatment plant and compost hall, a reclaimed landfill mound with a young forest, the water table below, and the river"><svg viewBox="0 0 1800 833" preserveAspectRatio="none">';
  CONN_PTS.forEach(function(p,i){
    h+='<g class="hs" id="hs'+i+'" tabindex="0" role="button" aria-label="Connection '+(i+1)+'" onclick="showLink('+i+')">'+
      '<circle class="hit" cx="'+p[0]+'" cy="'+p[1]+'" r="46" fill="transparent"/>'+
      '<circle class="r1" cx="'+p[0]+'" cy="'+p[1]+'" r="54" fill="none" stroke="#fff" stroke-width="16"/>'+
      '<circle class="r2" cx="'+p[0]+'" cy="'+p[1]+'" r="54" fill="none" stroke="var(--teal)" stroke-width="8"/></g>';
  });
  return h+'</svg><div class="callout" id="callout"></div></div>';
}
