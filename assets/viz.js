/* Visual builders for the Agra Integrated Programme deck.
   Every number drawn here is registered in SRC in index.html and opens its source.
   Shapes are proportional to the figures they carry. Colour is semantic:
   system colours for the four offerings, --bad for a shortfall or an untreated flow,
   hatching for a quantity nobody weighs today. */

var SYSC={waste:'var(--w)',climate:'var(--c)',water:'var(--wa)',trees:'var(--t)'};

function defs(id){
  return '<defs>'+
   '<pattern id="hx'+id+'" width="7" height="7" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">'+
     '<rect width="7" height="7" fill="var(--wash)"/><line x1="0" y1="0" x2="0" y2="7" stroke="var(--dim)" stroke-width="2.4" opacity=".5"/></pattern>'+
   '<pattern id="hb'+id+'" width="7" height="7" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">'+
     '<rect width="7" height="7" fill="var(--wash)"/><line x1="0" y1="0" x2="0" y2="7" stroke="var(--bad)" stroke-width="2.4" opacity=".55"/></pattern>'+
   '<marker id="ar'+id+'" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">'+
     '<path d="M0,0 L10,5 L0,10 z" fill="context-stroke"/></marker>'+
   '<marker id="arf'+id+'" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="18" markerHeight="18" markerUnits="userSpaceOnUse" orient="auto-start-reverse">'+
     '<path d="M0,0 L10,5 L0,10 z" fill="context-stroke"/></marker>'+
   '</defs>';
}
function tx(x,y,s,o){return '<text x="'+x+'" y="'+y+'" font-size="'+(o&&o.s||12)+'" font-weight="'+(o&&o.w||600)+'" fill="'+(o&&o.f||'var(--dim)')+'" text-anchor="'+(o&&o.a||'start')+'">'+s+'</text>'}
function big(x,y,s,f,sz){return '<text x="'+x+'" y="'+y+'" font-size="'+(sz||34)+'" font-weight="800" letter-spacing="-.02em" fill="'+(f||'var(--ink)')+'">'+s+'</text>'}

/* ---------- slide 2: six pressure gauges, each shape proportional ---------- */
function gauge(k,title,inner,val,cap){
  return '<button class="tile viz-tile" onclick="openSrc(\''+k+'\')">'+
    '<div class="lab">'+title+'</div>'+
    '<div class="gval">'+val+'</div>'+
    '<svg viewBox="0 0 300 102" width="100%" aria-hidden="true">'+defs(k)+inner+'</svg>'+
    '<div class="gcap">'+cap+'</div><div class="gg">'+gr(k)+'<span class="go">Source</span></div></button>';
}
function bar2(a,b,la,lb,max,ca,cb,id,gap){
  /* labels sit above their bar so nothing runs past the 300 wide box */
  var W=298,x=1,h=15;
  var wa=a/max*W,wb=b/max*W;
  var s='';
  s+=tx(x,11,la,{s:11})+'<rect x="'+x+'" y="16" width="'+wa+'" height="'+h+'" rx="3" fill="'+ca+'"/>';
  s+=tx(x,47,lb,{s:11,w:700,f:'var(--ink)'})+'<rect x="'+x+'" y="52" width="'+wb+'" height="'+h+'" rx="3" fill="'+cb+'"/>';
  if(gap){
    s+='<rect x="'+(x+wb)+'" y="52" width="'+(wa-wb)+'" height="'+h+'" rx="3" fill="url(#hb'+id+')" stroke="var(--bad)" stroke-width="1"/>';
    s+='<line x1="'+(x+wb+1)+'" y1="75" x2="'+(x+wa-1)+'" y2="75" stroke="var(--bad)" stroke-width="1.5" marker-start="url(#ar'+id+')" marker-end="url(#ar'+id+')"/>';
    s+=tx(x+wa,90,gap,{s:11,f:'var(--bad)',a:'end',w:700});
  }
  return s;
}
function gWaste(){
  return gauge('waste','Waste',
    bar2(970,916,'970 t/d installed processing','916 t/d generated',1000,'var(--wash)','var(--w)','waste'),
    '916 <i>tonnes a day</i>','Plants exist for the load. The weighed record is what measurement adds.');
}
function gWater(){
  return gauge('wdem','Water supply',
    bar2(394,270,'394 MLD demand','270 MLD supplied',420,'var(--wash)','var(--wa)','wdem','124 MLD short'),
    '124 <i>MLD short</i>','Nearly a third of demand is not met by supply.');
}
function gSew(){
  return gauge('sew','Sewage',
    bar2(320,220,'320 MLD generated','220 MLD treatment capacity',340,'var(--wash)','var(--wa)','sew','about 100 MLD'),
    '100 <i>MLD untreated</i>','The balance reaches the Yamuna without treatment.');
}
function gGround(){
  var st=[['var(--bad)',8,'Over-exploited'],['#e06c00',2,'Critical'],['var(--D)',3,'Semi-critical'],['var(--ok)',2,'Safe']];
  var s='',i=0;
  st.forEach(function(g){for(var n=0;n<g[1];n++){var c=i%5,r=Math.floor(i/5);
    s+='<rect x="'+(2+c*25)+'" y="'+(12+r*25)+'" width="20" height="20" rx="4" fill="'+g[0]+'"><title>'+g[2]+'</title></rect>';i++}});
  s+=tx(136,26,'8 over-exploited',{s:11,f:'var(--bad)',w:700})+tx(136,47,'2 critical, 3 semi-critical',{s:11})+tx(136,68,'2 safe, of 15 blocks',{s:11})+tx(2,97,'One square is one block',{s:10.5});
  return gauge('gw','Groundwater',s,'162.71% <i>of recharge drawn</i>','Every block is a separate decision. Eight are over-exploited.');
}
function gTrees(){
  var cx=48,cy=46,r=33,C=2*Math.PI*r;
  var s='<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" fill="none" stroke="var(--wash)" stroke-width="14"/>'+
   '<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" fill="none" stroke="var(--t)" stroke-width="14" stroke-linecap="round" stroke-dasharray="'+(C*0.065/0.33)+' '+C+'" transform="rotate(-90 '+cx+' '+cy+')"/>'+
   tx(cx,cy+5,'6.50%',{s:15,w:800,a:'middle',f:'var(--ink)'})+
   tx(104,30,'of the district under forest',{s:11})+tx(104,50,'The ring is drawn against',{s:11})+tx(104,68,'the 33% national target',{s:11,w:700});
  return gauge('forest','Trees',s,'262.62 <i>sq km</i>','Down 9.38 sq km since the previous assessment.');
}
function gHeat(){
  var x=2,W=296;
  function p(t){return x+(t-24)/(50-24)*W}
  var s='<defs><linearGradient id="hg" x1="0" x2="1"><stop offset="0" stop-color="#4467cf"/><stop offset=".55" stop-color="#d18b0c"/><stop offset="1" stop-color="#c2410c"/></linearGradient></defs>'+
   tx(x+W,14,'48.6 record',{s:11,a:'end',f:'var(--bad)',w:700})+
   '<rect x="'+x+'" y="34" width="'+W+'" height="16" rx="8" fill="url(#hg)"/>'+
   '<line x1="'+p(41.9)+'" y1="26" x2="'+p(41.9)+'" y2="58" stroke="var(--ink)" stroke-width="2"/>'+
   '<line x1="'+p(48.6)+'" y1="20" x2="'+p(48.6)+'" y2="58" stroke="var(--bad)" stroke-width="3"/>'+
   tx(p(41.9),74,'41.9 mean May maximum',{s:11,a:'middle'})+
   tx(x,92,'24',{s:10.5})+tx(x+W,92,'50 °C',{s:10.5,a:'end'});
  return gauge('heat','Heat',s,'48.6°C <i>record high</i>','A district station reading. Wards differ from each other.');
}
function pressureGrid(){
  function w(n,g){return '<div class="bt" data-b="'+n+'">'+g+'</div>'}
  return '<div class="grid g3 vgrid">'+w(1,gWaste())+w(1,gWater())+w(2,gSew())+w(2,gGround())+w(3,gTrees())+w(3,gHeat())+'</div>'}

/* ---------- slide 3: four map layers as one stack ---------- */
function isoStack(compact){
  var P=[['Trees and carbon','var(--t)','Canopy, species, carbon, unsafe trees'],
         ['Water','var(--wa)','Supply, drains, waterbodies, groundwater'],
         ['Climate','var(--c)','Heat, flood and smog risk, shelters'],
         ['Waste','var(--w)','Coverage, segregation, tonnage, fleet']];
  var h='<svg viewBox="'+(compact?'60 70 480 420':'0 0 760 470')+'" width="100%" style="max-height:440px" role="img" aria-label="Four data layers stacked on one map of Agra’s 100 wards">';
  var BEAT={'Waste':1,'Climate':2,'Water':3,'Trees and carbon':4};
  P.forEach(function(p,i){
    var y=372-i*78, T='translate(300,'+y+') scale(0.40) matrix(0.86,0.5,-0.86,0.5,0,0) translate(-230,-173)';
    h+='<g class="bt" data-b="'+BEAT[p[0]]+'">';
    h+='<g transform="'+T+'"><rect x="-14" y="-14" width="488" height="375" fill="'+p[1]+'" opacity=".10"/>'+
       '<rect x="-14" y="-14" width="488" height="375" fill="none" stroke="'+p[1]+'" stroke-width="3" opacity=".55"/>';
    WARDS.forEach(function(w){h+='<path d="'+w.d+'" fill="'+p[1]+'" fill-opacity=".5" stroke="var(--card)" stroke-width="1.6"/>'});
    h+='</g>';
    if(!compact)h+='<line x1="470" y1="'+y+'" x2="524" y2="'+y+'" stroke="'+p[1]+'" stroke-width="2"/>'+
       '<circle cx="470" cy="'+y+'" r="4" fill="'+p[1]+'"/>'+
       tx(532,y-2,p[0],{s:15,w:800,f:'var(--ink)'})+tx(532,y+16,p[2],{s:11.5});
    h+='</g>';
  });
  if(!compact)h+=tx(300,452,'100 wards · 4 zones · one record set for each ward',{s:12,a:'middle',w:700});
  return h+'</svg>';
}

/* ---------- slide 4: the chain, and what is weighed ---------- */
function wasteFlow(){
  var S=0.19;
  function H(t){return t*S}
  var h='<svg viewBox="0 0 900 362" width="100%" style="max-height:372px" role="img" aria-label="Waste from generation to the plants, showing which quantities are weighed today">'+defs('wf');
  var gy=54,gh=H(916);
  h+='<rect x="96" y="'+gy+'" width="22" height="'+gh+'" rx="3" fill="var(--w)"/>';
  h+=tx(86,gy+gh/2-3,'916 t/d',{s:16,w:800,f:'var(--ink)',a:'end'})+tx(86,gy+gh/2+15,'generated',{s:11.5,a:'end'});
  h+='<rect class="pulse" x="118" y="'+gy+'" width="312" height="'+gh+'" fill="url(#hxwf)" stroke="var(--dim)" stroke-width="1.5" stroke-dasharray="5 4"/>';
  h+=tx(274,gy+62,'?',{s:38,w:800,f:'var(--dim)',a:'middle'});
  h+=tx(274,gy+90,'collected, segregated, carried',{s:12,a:'middle'});
  h+=tx(274,gy+108,'not weighed today',{s:12,a:'middle',w:800,f:'var(--ink)'});
  var B=[['Compost',500,0],['Material recovery',405,0],['Plastic',65,0],['Landfill and rejects',0,1]];
  var ys=[40,149,240,268],hs=[H(500),H(405),H(65),44];
  B.forEach(function(b,i){
    var y=ys[i],bh=hs[i];
    if(b[2])h+='<rect x="520" y="'+y+'" width="120" height="'+bh+'" rx="4" fill="url(#hxwf)" stroke="var(--dim)" stroke-width="1.5"/>';
    else h+='<rect x="520" y="'+y+'" width="120" height="'+bh+'" rx="4" fill="var(--w)" opacity="'+(0.9-i*0.14)+'"/>';
    h+=tx(652,y+bh/2+(bh>30?-2:4),b[0],{s:13.5,w:800,f:'var(--ink)'});
    h+=tx(652,y+bh/2+(bh>30?16:22),b[2]?'quantity not published':b[1]+' t/d nameplate capacity',{s:11.5});
    h+='<path d="M434,'+(gy+gh/2)+' C472,'+(gy+gh/2)+' 480,'+(y+bh/2)+' 514,'+(y+bh/2)+'" fill="none" stroke="var(--dim)" stroke-width="1.6" opacity=".6" marker-end="url(#arwf)"/>';
  });
  h+='<line x1="478" y1="28" x2="478" y2="330" stroke="var(--teal)" stroke-width="1.6" stroke-dasharray="6 5"/>';
  h+=tx(478,22,'The gate',{s:11.5,w:800,f:'var(--teal)',a:'middle'});
  [88,190,292].forEach(function(y,i){h+='<g class="wbr" style="animation-delay:'+(0.45+i*0.16)+'s">'+scaleIcon(478,y,0.95)+'</g>'});
  h+=tx(96,346,'Installed capacity is 970 t/d against 916 t/d generated. A weighbridge or gate test at the marked points turns the hatched quantity into a number.',{s:12.5,w:700,f:'var(--teal)'});
  return h+'</svg>';
}
function scaleIcon(x,y,s){
  return '<g transform="translate('+x+','+y+') scale('+s+')">'+
   '<circle cx="0" cy="0" r="17" fill="var(--card)" stroke="var(--teal)" stroke-width="2.5"/>'+
   '<rect x="-10" y="-1" width="20" height="4" rx="1.6" fill="var(--teal)"/>'+
   '<rect x="-7" y="3" width="3" height="6" fill="var(--teal)"/><rect x="4" y="3" width="3" height="6" fill="var(--teal)"/>'+
   '<path d="M-6,-5 A7,7 0 0 1 6,-5" fill="none" stroke="var(--teal)" stroke-width="2"/>'+
   '<line x1="0" y1="-1" x2="3" y2="-6" stroke="var(--teal)" stroke-width="1.8"/></g>';
}

/* ---------- slide 5: the hazard calendar, and who it reaches ---------- */
function yearWheel(){
  var cx=200,cy=200,R=150,r=96;
  var M=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var seasons=[[3,6,'var(--c)','Heat'],[6,9,'var(--wa)','Flood'],[10,13,'var(--dim)','Smog']];
  function pt(a,rad){var t=(a-3)/12*2*Math.PI;return [cx+rad*Math.cos(t),cy+rad*Math.sin(t)]}
  var h='<svg viewBox="0 0 900 410" width="100%" style="max-height:404px" role="img" aria-label="The hazard calendar and ward level reach">';
  h+='<circle cx="'+cx+'" cy="'+cy+'" r="'+R+'" fill="var(--wash)"/>';
  seasons.forEach(function(s,i){
    var a=pt(s[0],R),b=pt(s[1],R),a2=pt(s[1],r),b2=pt(s[0],r);
    h+='<path class="seg" style="animation-delay:'+(i*0.15)+'s" d="M'+a[0]+','+a[1]+' A'+R+','+R+' 0 0 1 '+b[0]+','+b[1]+' L'+a2[0]+','+a2[1]+' A'+r+','+r+' 0 0 0 '+b2[0]+','+b2[1]+' Z" fill="'+s[2]+'" opacity=".85"/>';
    var m=pt((s[0]+s[1])/2,(R+r)/2);
    h+='<text x="'+m[0]+'" y="'+(m[1]+4)+'" font-size="13" font-weight="800" fill="#fff" text-anchor="middle">'+s[3]+'</text>';
  });
  M.forEach(function(m,i){var p=pt(i+0.5,R+18);h+=tx(p[0],p[1]+4,m,{s:10.5,a:'middle'})});
  h+='<circle cx="'+cx+'" cy="'+cy+'" r="'+(r-10)+'" fill="var(--card)" stroke="var(--edge)"/>';
  h+=tx(cx,cy-6,'One city',{s:15,w:800,a:'middle',f:'var(--ink)'})+tx(cx,cy+14,'three seasons',{s:13,a:'middle'})+tx(cx,cy+34,'one command picture',{s:11.5,a:'middle'});
  // reach comparison
  var bx=436;
  h+=tx(bx,54,'Reaches an officer today',{s:12,w:700,f:'var(--dim)'});
  h+='<circle cx="'+(bx+12)+'" cy="86" r="11" fill="var(--dim)"/>'+tx(bx+34,90,'1 district bulletin',{s:13,w:700,f:'var(--ink)'});
  h+=tx(bx,140,'What a ward officer can act on',{s:12,w:700,f:'var(--teal)'});
  for(var i=0;i<100;i++){var c=i%20,rw=Math.floor(i/20);
    h+='<circle class="dot" style="animation-delay:'+(0.3+i*0.006)+'s" cx="'+(bx+10+c*22)+'" cy="'+(174+rw*22)+'" r="7" fill="var(--teal)"/>'}
  h+=tx(bx,314,'100 ward level action lists, from the same public feeds',{s:13.5,w:700,f:'var(--ink)'});
  h+=tx(bx,336,'No new sensors. The data already exists at district level.',{s:11.5});
  return h+'</svg>';
}

/* ---------- slide 6: the water balance ---------- */
function waterBalance(){
  var h='<svg viewBox="0 0 900 380" width="100%" style="max-height:390px" role="img" aria-label="Agra water balance: supply gap, groundwater overdraft and untreated sewage">'+defs('wb');
  // ground and aquifer
  h+='<rect x="0" y="214" width="900" height="166" fill="var(--wash)"/>';
  h+='<line x1="0" y1="214" x2="900" y2="214" stroke="var(--edge)" stroke-width="2"/>';
  h+='<rect x="0" y="286" width="760" height="94" fill="var(--wa)" opacity=".13"/>';
  h+='<line x1="0" y1="286" x2="760" y2="286" stroke="var(--wa)" stroke-width="2" stroke-dasharray="7 5"/>';
  h+=tx(16,306,'Aquifer',{s:12,w:700,f:'var(--wa)'});
  // city block
  h+='<rect x="286" y="120" width="210" height="94" rx="8" fill="var(--card)" stroke="var(--edge)" stroke-width="2"/>';
  h+=tx(391,158,'Agra',{s:18,w:800,a:'middle',f:'var(--ink)'})+tx(391,180,'1.9 million people',{s:11.5,a:'middle'})+tx(391,198,'100 wards',{s:11.5,a:'middle'});
  // demand vs supply, left
  h+=tx(28,44,'Demand 394 MLD',{s:13,w:700,f:'var(--ink)'});
  h+='<rect x="28" y="54" width="236" height="16" rx="3" fill="var(--wash)" stroke="var(--edge)"/>';
  h+='<rect x="28" y="54" width="162" height="16" rx="3" fill="var(--wa)"/>';
  h+='<rect x="190" y="54" width="74" height="16" rx="3" fill="url(#hbwb)" stroke="var(--bad)"/>';
  h+=tx(28,88,'270 supplied',{s:11.5})+tx(264,88,'124 short',{s:11.5,a:'end',f:'var(--bad)',w:700});
  h+='<path d="M264,62 L286,62 L286,140" fill="none" stroke="var(--wa)" stroke-width="3" marker-end="url(#arwb)"/>';
  // groundwater overdraft
  h+='<path d="M360,286 L360,214" stroke="var(--bad)" stroke-width="17" marker-end="url(#arfwb)" opacity=".85"/>';
  h+=tx(382,246,'Extraction',{s:12,w:700,f:'var(--bad)'})+tx(382,264,'162.71% of recharge',{s:11.5,f:'var(--bad)'});
  h+='<path d="M300,214 L300,286" stroke="var(--wa)" stroke-width="10" marker-end="url(#arfwb)" opacity=".8"/>';
  h+=tx(286,246,'Recharge',{s:12,w:700,f:'var(--wa)',a:'end'})+tx(286,264,'100',{s:11.5,a:'end'});
  h+=tx(300,330,'The water table falls about 0.5 m a year before the monsoon.',{s:12,w:700,f:'var(--ink)'});
  // sewage to river
  h+='<path d="M496,150 L590,150" stroke="var(--dim)" stroke-width="22" marker-end="url(#arfwb)"/>';
  h+=tx(500,130,'320 MLD sewage',{s:11.5,w:700});
  h+='<rect x="596" y="118" width="86" height="64" rx="8" fill="var(--card)" stroke="var(--edge)" stroke-width="2"/>';
  h+=tx(639,146,'Treatment',{s:12,w:700,a:'middle',f:'var(--ink)'})+tx(639,164,'220 MLD',{s:12,a:'middle'});
  h+='<path d="M682,136 L800,136" stroke="var(--wa)" stroke-width="15" marker-end="url(#arfwb)"/>'+tx(700,118,'220 treated',{s:11});
  h+='<path d="M596,196 C650,206 700,196 800,196" fill="none" stroke="var(--bad)" stroke-width="7" marker-end="url(#arfwb)" stroke-dasharray="8 5"/>';
  h+=tx(632,214,'about 100 MLD untreated',{s:11.5,w:700,f:'var(--bad)'});
  // river
  h+='<rect x="806" y="104" width="76" height="180" rx="8" fill="var(--wa)" opacity=".28"/>';
  h+='<text x="844" y="200" font-size="13" font-weight="800" fill="var(--wa)" text-anchor="middle" transform="rotate(90 844 200)">Yamuna</text>';
  return h+'</svg>';
}

/* ---------- slide 7: what a census measures, on a ward map ---------- */
function treeViz(){
  var h='<svg viewBox="0 0 880 380" width="100%" style="max-height:380px" role="img" aria-label="What a tree census records, and ward canopy on the Agra map">';
  // the measured tree
  h+='<g transform="translate(60,0)">';
  h+='<line x1="120" y1="330" x2="320" y2="330" stroke="var(--edge)" stroke-width="2"/>';
  h+='<ellipse cx="210" cy="150" rx="86" ry="66" fill="var(--t)" opacity=".85"/>';
  h+='<ellipse cx="210" cy="150" rx="86" ry="66" fill="none" stroke="var(--t)" stroke-width="2"/>';
  h+='<rect x="202" y="150" width="17" height="180" fill="#6b4a2a"/>';
  // DBH marker at 1.3m
  h+='<line x1="150" y1="272" x2="268" y2="272" stroke="var(--ink)" stroke-width="1.6" stroke-dasharray="4 3"/>';
  h+='<circle cx="210" cy="272" r="17" fill="none" stroke="var(--ink)" stroke-width="2.4"/>';
  h+=tx(276,268,'Girth at 1.3 m',{s:12,w:700,f:'var(--ink)'})+tx(276,285,'diameter at breast height',{s:11});
  // height
  h+='<line x1="126" y1="86" x2="126" y2="330" stroke="var(--ink)" stroke-width="1.6" marker-start="url(#arw2)" marker-end="url(#arw2)"/>'+defs('w2');
  h+=tx(118,200,'Height',{s:12,w:700,f:'var(--ink)',a:'end'});
  // canopy
  h+='<line x1="124" y1="150" x2="296" y2="150" stroke="var(--t)" stroke-width="1.6" stroke-dasharray="4 3"/>';
  h+=tx(304,154,'Canopy spread',{s:12,w:700,f:'var(--t)'});
  h+=tx(210,356,'Species, health, GPS point, carbon',{s:12,w:700,a:'middle',f:'var(--ink)'});
  h+='</g>';
  // ward map with canopy density
  h+='<g transform="translate(470,26) scale(0.80)">';
  WARDS.forEach(function(w,i){
    var v=((i*37)%100)/100;
    h+='<path d="'+w.d+'" fill="var(--t)" fill-opacity="'+(0.12+v*0.72).toFixed(2)+'" stroke="var(--card)" stroke-width="1"><title>'+w.n+'</title></path>';
  });
  h+='</g>';
  h+=tx(660,352,'Canopy by ward, once the register exists',{s:12,w:700,a:'middle',f:'var(--ink)'});
  h+=tx(660,370,'Shading shown here is illustrative, not measured',{s:11,a:'middle'});
  return h+'</svg>';
}

/* ---------- slide 8: impact grid ---------- */
function impactGrid(){
  var cols=[['Waste','var(--w)'],['Climate','var(--c)'],['Water','var(--wa)'],['Trees','var(--t)']];
  var rows=[
   ['Value',[['A case built on measured tonnes','DE'],['Fewer emergency runs, no new hardware','DE'],['Evidence for scheme applications','DE'],['Carbon evidence for climate finance','DE']]],
   ['People',[['Complaints answered','D'],['Cooling and shelter','DE'],['124 MLD supply gap','E'],['Shade and safe trees','DE']]],
   ['Environment',[['+54 months landfill life','D'],['Ward risk exposure','DE'],['Recharge and rivers','B'],['Canopy from 6.50%','A']]],
   ['Governance',[['Weighed statutory returns','DE'],['One alert feed','DE'],['Taj zone compliance','DE'],['Nagar Van baseline','DE']]]];
  var key={A:['Published','var(--A)'],B:['Independent','var(--B)'],D:['Our assumption','var(--D)'],E:['EHM source','var(--green)'],DE:['By design','var(--dim)'],P0:['Sized in Phase 0','var(--tbc-ink)']};
  var h='<div class="mx"><div class="mxh"></div>';
  cols.forEach(function(c,i){h+='<div class="mxh" style="color:'+c[1]+'"><span class="icw s"><img src="assets/img/ic_'+['compactor','weather_mast','pump','tree_tag'][i]+'.png" alt=""></span>'+c[0]+'</div>'});
  rows.forEach(function(r,ri){
    h+='<div class="mxr bt" data-b="'+(ri+1)+'">'+r[0]+'</div>';
    r[1].forEach(function(c,i){
      var k=key[c[1]];
      h+='<div class="mxc bt" data-b="'+(ri+1)+'" style="--ac:'+cols[i][1]+'"><b>'+c[0]+'</b><span class="mxk" style="color:'+k[1]+'">'+k[0]+'</span></div>';
    });
  });
  h+='</div>';
  return h;
}

/* ---------- slide 9: generated diorama with its own numbered markers; a ring marks the active one ---------- */
var CONN_PTS=[[298,259],[660,259],[902,259],[1230,259],[902,765],[1555,259]];
function connectionsImage(){
  var h='<div class="conn"><img src="assets/img/a6_connections.jpg" alt="Cross section of a city edge showing houses and street trees, a blocked storm drain, a sewage treatment plant and compost hall, a reclaimed landfill mound with a young forest, the water table below, and the river"><svg viewBox="0 0 1800 833" preserveAspectRatio="none" aria-hidden="false">';
  CONN_PTS.forEach(function(p,i){
    h+='<g class="hs" id="hs'+i+'" tabindex="0" role="button" aria-label="Connection '+(i+1)+'" onclick="showLink('+i+')" onkeydown="if(event.key==&quot;Enter&quot;)showLink('+i+')">'+
      '<circle class="hit" cx="'+p[0]+'" cy="'+p[1]+'" r="46" fill="transparent"/>'+
      '<circle class="r1" cx="'+p[0]+'" cy="'+p[1]+'" r="52" fill="none" stroke="#fff" stroke-width="14"/>'+
      '<circle class="r2" cx="'+p[0]+'" cy="'+p[1]+'" r="52" fill="none" stroke="var(--teal)" stroke-width="7"/></g>';
  });
  return h+'</svg></div>';
}

/* ---------- slide 10: four contracts against one programme ---------- */
function lanesViz(){
  var h='<svg viewBox="0 0 900 340" width="100%" style="max-height:350px" role="img" aria-label="Four separate contracts against one programme">'+defs('ln');
  var C=[['var(--w)','Waste'],['var(--c)','Climate'],['var(--wa)','Water'],['var(--t)','Trees']];
  h+='<g class="bt" data-b="1">'+tx(20,24,'FOUR SEPARATE CONTRACTS',{s:12,w:800,f:'var(--bad)'});
  C.forEach(function(c,i){
    var y=60+i*58;
    h+='<rect x="20" y="'+(y-18)+'" width="390" height="40" rx="8" fill="'+c[0]+'" opacity=".10"/>';
    h+=tx(32,y+6,c[1],{s:12,w:800,f:c[0]});
    [110,196,282].forEach(function(x,j){
      h+='<circle cx="'+x+'" cy="'+y+'" r="13" fill="'+c[0]+'" opacity=".8"/>';
      h+='<text x="'+x+'" y="'+(y+5)+'" font-size="12" font-weight="800" fill="#fff" text-anchor="middle">'+['S','D','P'][j]+'</text>';
    });
    h+='<path d="M123,'+y+' L183,'+y+' M209,'+y+' L269,'+y+'" stroke="'+c[0]+'" stroke-width="2"/>';
  });
  h+='</g><g class="bt" data-b="2">';
  for(var a=0;a<4;a++)for(var b=a+1;b<4;b++){
    var ya=60+a*58,yb=60+b*58;
    h+='<path class="tangle" d="M296,'+ya+' C'+(360+(b-a)*16)+','+ya+' '+(360+(b-a)*16)+','+yb+' 296,'+yb+'" fill="none" stroke="var(--bad)" stroke-width="1.6" stroke-dasharray="4 4" opacity=".75"/>';
  }
  h+=tx(404,300,'6 integrations to build',{s:13,w:800,f:'var(--bad)',a:'end'});
  h+=tx(404,319,'4 surveys, 4 data stores, 4 contacts',{s:11.5,a:'end'})+'</g>';
  h+='<g class="bt" data-b="3"><line x1="452" y1="20" x2="452" y2="324" stroke="var(--edge)" stroke-width="2" stroke-dasharray="6 6"/>';
  h+=tx(492,24,'ONE PROGRAMME',{s:12,w:800,f:'var(--teal)'});
  h+='<rect x="492" y="42" width="386" height="176" rx="12" fill="var(--teal-w)" stroke="var(--teal)" stroke-width="2"/>';
  C.forEach(function(c,i){
    h+='<rect x="510" y="'+(60+i*20)+'" width="120" height="13" rx="4" fill="'+c[0]+'" opacity=".85"/>';
    h+='<text x="640" y="'+(71+i*20)+'" font-size="11" font-weight="700" fill="var(--dim)">'+c[1]+' layer</text>';
  });
  [['S','One survey team'],['D','One Agra database'],['P','One command picture']].forEach(function(g,j){
    var x=545+j*118;
    h+='<circle cx="'+x+'" cy="168" r="15" fill="var(--teal)"/><text x="'+x+'" y="173" font-size="12" font-weight="800" fill="#fff" text-anchor="middle">'+g[0]+'</text>';
    h+='<text x="'+x+'" y="198" font-size="10.5" font-weight="600" fill="var(--dim)" text-anchor="middle">'+g[1]+'</text>';
  });
  h+='<path d="M560,150 L678,150" stroke="var(--teal)" stroke-width="2"/>';
  h+=tx(878,300,'0 integrations between vendors',{s:13,w:800,f:'var(--teal)',a:'end'});
  h+=tx(878,319,'1 survey, 1 data store, 1 contact',{s:11.5,a:'end'})+'</g>';
  return h+'</svg>';
}

/* ---------- slide 11: the path ---------- */
function roadmapViz(){
  var h='<svg viewBox="0 0 900 292" width="100%" style="max-height:310px" role="img" aria-label="Phase 0 to Phase 2 across 24 months">'+defs('rm');
  var x0=60,x1=840,W=x1-x0;
  function mx(m){return x0+m/24*W}
  var P=[[0,6,'Phase 0','Baseline and the Agra database','var(--teal)',46,40],
         [6,12,'Phase 1','First wards live, first monsoon','var(--wa)',100,48],
         [12,24,'Phase 2','All 100 wards, funded interventions','var(--green)',160,56]];
  P.forEach(function(p,i){
    var a=mx(p[0]),b=mx(p[1]),y=p[5],hh=p[6];
    h+='<g class="bt" data-b="'+(i+1)+'"><rect x="'+a+'" y="'+y+'" width="'+(b-a)+'" height="'+hh+'" rx="8" fill="'+p[4]+'"/>';
    h+='<text x="'+(a+14)+'" y="'+(y+20)+'" font-size="14.5" font-weight="800" fill="#fff">'+p[2]+'</text>';
    h+='<text x="'+(a+14)+'" y="'+(y+37)+'" font-size="11.5" font-weight="600" fill="#fff" opacity=".93">'+p[3]+'</text>';
    if(i<2)h+='<path d="M'+(b+4)+','+(y+hh/2)+' L'+(b+16)+','+(y+hh/2)+'" stroke="var(--dim)" stroke-width="2" marker-end="url(#arrm)"/>';
    h+='</g>';
  });
  h+='<line x1="'+x0+'" y1="244" x2="'+x1+'" y2="244" stroke="var(--edge)" stroke-width="2"/>';
  [0,6,12,18,24].forEach(function(m){h+='<line x1="'+mx(m)+'" y1="238" x2="'+mx(m)+'" y2="250" stroke="var(--dim)" stroke-width="2"/>'+tx(mx(m),268,'Month '+m,{s:10.5,a:'middle'})});
  h+=tx(x0,288,'Scope widens only after the baseline exists.',{s:11});
  return h+'</svg>';
}
/* ---------- slide 12: one gate, six outputs ---------- */
function funnelViz(){
  var h='<svg viewBox="0 0 900 352" width="100%" style="max-height:362px" role="img" aria-label="Phase 0 produces six outputs that every later decision needs">'+defs('fn');
  h+='<g class="bt" data-b="2"><rect x="30" y="96" width="176" height="138" rx="14" fill="var(--teal)"/>';
  h+='<text x="118" y="150" font-size="22" font-weight="800" fill="#fff" text-anchor="middle">Phase 0</text>';
  h+='<text x="118" y="176" font-size="13" font-weight="600" fill="#fff" opacity=".92" text-anchor="middle">3 to 6 months</text>';
  h+='<text x="118" y="200" font-size="12" font-weight="600" fill="#fff" opacity=".85" text-anchor="middle">Baseline and database</text></g>';
  var O=[['Ward baseline, four systems','var(--teal)'],['One Agra database and map','var(--teal)'],['Waste audit and project report basis','var(--w)'],['CityAdapt on 100 Agra wards','var(--c)'],['Water balance and resource map','var(--wa)'],['Tree census in priority zones','var(--t)']];
  O.forEach(function(o,i){
    var y=26+i*50;
    h+='<g class="bt" data-b="2"><path d="M206,165 C280,165 280,'+(y+16)+' 340,'+(y+16)+'" fill="none" stroke="'+o[1]+'" stroke-width="2.4" opacity=".7"/>';
    h+='<rect class="out" style="animation-delay:'+(i*0.09)+'s" x="340" y="'+y+'" width="316" height="34" rx="9" fill="var(--card)" stroke="'+o[1]+'" stroke-width="2"/>';
    h+='<circle cx="362" cy="'+(y+17)+'" r="6" fill="'+o[1]+'"/>';
    h+='<text x="378" y="'+(y+22)+'" font-size="12.5" font-weight="700" fill="var(--ink)">'+o[0]+'</text></g>';
  });
  h+='<g class="bt" data-b="3"><path d="M656,165 L716,165" stroke="var(--edge)" stroke-width="3" marker-end="url(#arfn)"/>';
  h+='<rect x="722" y="112" width="152" height="46" rx="10" fill="var(--wash)" stroke="var(--edge)" stroke-width="2"/>';
  h+='<text x="798" y="132" font-size="13" font-weight="800" fill="var(--dim)" text-anchor="middle">Phase 1 scope</text>';
  h+='<text x="798" y="150" font-size="11" font-weight="600" fill="var(--dim)" text-anchor="middle">set from the baseline</text>';
  h+='<rect x="722" y="170" width="152" height="46" rx="10" fill="var(--wash)" stroke="var(--edge)" stroke-width="2"/>';
  h+='<text x="798" y="190" font-size="13" font-weight="800" fill="var(--dim)" text-anchor="middle">Next phases</text>';
  h+='<text x="798" y="208" font-size="11" font-weight="600" fill="var(--dim)" text-anchor="middle">planned with evidence</text></g>';
  h+=tx(340,340,'Every later decision needs these six.',{s:12.5,w:700,f:'var(--ink)'});
  return h+'</svg>';
}

/* ---------- ward map helpers, shared ---------- */
var PRI={tajganj:1};
function wardSvg(mode){
  var h='<svg viewBox="0 0 '+WARDS_VB[0]+' '+WARDS_VB[1]+'" width="100%" style="max-height:330px" role="img" aria-label="The 100 Agra Nagar Nigam wards">';
  WARDS.forEach(function(w){
    var f,o=1;
    if(mode==='faint'){f='var(--dim)'}
    else if(mode==='zone'){f=ZONES[ZI[w.z]][1]}
    else{var on=PRI[w.z];f=on?ZONES[ZI[w.z]][1]:'var(--edge)';o=on?1:.75}
    h+='<path d="'+w.d+'" fill="'+f+'" fill-opacity="'+o+'" stroke="var(--card)" stroke-width="1" stroke-linejoin="round"><title>Ward '+w.id.slice(1)+', '+w.n+' ('+ZONES[ZI[w.z]][0]+' zone)</title></path>';
  });
  return h+'</svg>';
}
