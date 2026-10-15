/* v2 slide builders. Wording follows the Immediate Actions document first, the EHM brochure second. */

var OFFERS=[
 {k:'waste',n:'Integrated Waste Management',s:'Waste',c:'var(--w)',img:'s04_waste',
  line:'Door-to-door collection, vehicles tracked in real time, and waste diverted from landfill to value.',
  tags:['Door-to-door collection','Vehicle routes','Source segregation','Waste to value']},
 {k:'water',n:'Water Positive City',s:'Water',c:'var(--wa)',img:'s04_water',
  line:'A city that recharges more water than it draws: treated water reused, rain harvested, drains planned.',
  tags:['Treated water reuse','Rainwater harvesting','Drainage plan','Groundwater']},
 {k:'bio',n:'Biodiversity and Carbon Stock Assessment',s:'Biodiversity and carbon',c:'var(--t)',img:'s04_biodiversity',
  line:'Every tree counted, geotagged and valued for the carbon it stores, with city forests planned where they matter.',
  tags:['Tree census','Geotagging','Carbon stock','Nagar Van']},
 {k:'climate',n:'CityAdapt: Climate Resilient Agra',s:'Climate resilience',c:'var(--c)',img:'s04_climate',
  line:'Real-time weather monitoring, and ward-level plans for heat and storm-water flooding.',
  tags:['Weather stations','Heat response','Storm-water flooding','Authority portal']},
 {k:'aware',nomap:1,n:'Public Awareness Initiatives and LiFE Mission Alignment',s:'Awareness and LiFE',c:'var(--aw)',img:'s04_awareness',
  line:'Citizens brought in through awareness drives and incentives aligned with the LiFE Mission.',
  tags:['Source segregation','Water saving','Single-use plastic','Incentives']},
 {k:'air',n:'Ward-Level Air Pollution Profiles and Hotspot Reduction',s:'Air quality',c:'var(--air)',img:'s04_air',
  line:'Ward-level monitoring to find PM2.5 and PM10 hotspots, and targeted measures along busy corridors.',
  tags:['Sensor network','Hotspot map','Dust suppression','Green buffers']}
];

/* an image that shows a clean "image to come" panel until the file exists */
function v2img(name,alt,fallback){
  var ph='this.parentNode.classList.add(\'noimg\');this.remove()';
  if(fallback)ph='if(!this.dataset.fb){this.dataset.fb=1;this.src=\'assets/img/'+fallback+'\'}else{'+ph+'}';
  return '<img src="assets/img/v2/'+name+'.jpg" alt="'+(alt||'')+'" onerror="'+ph+'">'+
    '<div class="imgto"><b>Image to come</b><span>'+name+'.jpg, prompt in IMAGE_PROMPTS.md</span></div>';
}

/* ---------- slide 2: Why Agra, why now ---------- */
function whyAgra(){
  var built=[['kub','19 lakh t','Legacy waste cleared at Kuberpur, 47 acres reclaimed'],
             ['plants','970 t/d','Compost, recovery and plastic processing capacity built'],
             ['ecol','Sur Sarovar','Ramsar wetland site, with Nagar Van city forests and tree drives']];
  return '<div class="bo vw" data-o="1"><div class="fill wa"><img class="wab" src="assets/img/v2/s02_agra_dawn.webp" alt="Agra at dawn: the Fort, the Taj Mahal and the Yamuna">'+
    '<div class="wac">'+built.map(function(b){return '<button class="wbc" onclick="openSrc(\''+b[0]+'\')"><b>'+b[1]+'</b><span>'+b[2]+'</span></button>'}).join('')+'</div></div></div>'+
   '<div class="bo vw" data-o="2"><div class="fill wa turn"><img class="wab" src="assets/img/v2/s02_agra_dawn.webp" alt="">'+
    '<div class="wamap">'+wardOutline()+'</div>'+
    '<div class="watint"></div><div class="wat"><div class="wak">The next step</div><p>Not more infrastructure.</p><p class="big">One measured picture of the city, ward by ward.</p><div class="was">100 wards &middot; 4 zones &middot; one baseline the district owns</div></div></div></div>';
}
function wardOutline(){
  var h='<svg viewBox="0 0 '+WARDS_VB[0]+' '+WARDS_VB[1]+'" width="100%" height="100%" aria-hidden="true">';
  WARDS.forEach(function(w,i){h+='<path d="'+w.d+'" fill="#fff" fill-opacity="'+(0.10+((i*37)%100)/600).toFixed(2)+'" stroke="#fff" stroke-opacity=".9" stroke-width="1.1"/>'});
  return h+'</svg>';
}

/* ---------- slide 3: Where Agra stands. The v1 six cards, with a new waste visual ---------- */
function fcard2(o){
  return '<div class="fc2 bt row-'+o.b+'" data-b="'+o.b+'" style="--oc:'+o.c+'" onclick="openSrc(\''+o.k+'\')" role="button" tabindex="0">'+
   '<div class="fh2"><span class="icw s"><img src="assets/img/ic_'+o.ic+'.png" alt=""></span><span class="fl">'+o.label+'</span></div>'+
   '<div class="fbig">'+o.big+'</div><div class="fvis">'+o.vis+'</div>'+
   (o.leg?'<div class="fleg">'+o.leg+'</div>':'')+'<div class="fso">'+o.so+'</div></div>';
}
function svgw(vb,inner){return '<svg viewBox="'+vb+'" preserveAspectRatio="xMidYMid meet" aria-hidden="true">'+inner+'</svg>'}
function t2(x,y,s,o){o=o||{};return '<text x="'+x+'" y="'+y+'" font-size="'+(o.s||12)+'" font-weight="'+(o.w||700)+'" fill="'+(o.f||'#55627a')+'"'+(o.a?' text-anchor="'+o.a+'"':'')+'>'+s+'</text>'}
function cWaste2(){
  var W=320,k=W/1000,x=20;
  var s=t2(x,22,'Generated every day',{s:13,f:'#1b2a41'})+
   '<rect x="'+x+'" y="30" width="'+(916*k)+'" height="30" rx="6" fill="#4c7a34"/>'+t2(x+916*k-8,51,'916 t',{s:14,w:800,f:'#fff',a:'end'})+
   t2(x,90,'Processing capacity built',{s:13,f:'#1b2a41'})+
   '<rect x="'+x+'" y="98" width="'+(500*k)+'" height="30" rx="6" fill="#6f9a52"/>'+t2(x+8,119,'Compost 500',{s:12,w:800,f:'#fff'})+
   '<rect x="'+(x+500*k+2)+'" y="98" width="'+(405*k-2)+'" height="30" rx="6" fill="#8fb572"/>'+t2(x+500*k+10,119,'Recovery 405',{s:12,w:800,f:'#fff'})+
   '<rect x="'+(x+905*k+2)+'" y="98" width="'+(65*k-2)+'" height="30" rx="6" fill="#b3cd9d"/>'+
   t2(x+970*k+6,119,'970 t',{s:14,w:800,f:'#1b2a41'})+t2(x+905*k+2,92,'Plastic 65',{s:10.5,w:800,f:'#4c7a34'})+
   t2(x,152,'Tonnes a day. Capacity is nameplate, not measured throughput.',{s:11});
  return fcard2({b:1,k:'waste',ic:'compactor',c:'var(--w)',label:'Waste',big:'916 <small>t/d</small>',vis:svgw('0 0 380 160',s),
   so:'The processing capacity can take what the city generates. The question is how each tonne is counted.'});
}
function cSupply2(){
  var top=10,bot=128,H=bot-top,f=270/394;
  var s=pat('w2')+'<rect x="30" y="'+top+'" width="92" height="'+H+'" rx="12" fill="#fff" stroke="#1b2a41" stroke-width="3"/>'+
   '<rect x="33" y="'+(top+3)+'" width="86" height="'+(H*(1-f))+'" fill="url(#hpw2)"/>'+
   '<rect x="33" y="'+(top+3+H*(1-f))+'" width="86" height="'+(H*f-6)+'" rx="10" fill="#2f55c9"/>'+
   '<rect x="38" y="'+(top+8)+'" width="76" height="26" rx="6" fill="#fff"/>'+t2(76,top+27,'124 short',{s:16,w:800,f:'#c2410c',a:'middle'})+
   '<line x1="122" y1="'+top+'" x2="190" y2="'+top+'" stroke="#1b2a41" stroke-width="2"/>'+t2(196,top+6,'394 needed',{s:17,w:800,f:'#1b2a41'})+
   '<line x1="122" y1="'+(top+H*(1-f))+'" x2="190" y2="'+(top+H*(1-f))+'" stroke="#2f55c9" stroke-width="2"/>'+t2(196,top+H*(1-f)+6,'270 supplied',{s:17,w:800,f:'#2f55c9'})+
   t2(196,bot-2,'million litres a day',{s:12});
  return fcard2({b:1,k:'wdem',ic:'tanker',c:'var(--wa)',label:'Water supply',big:'124 <small>MLD short</small>',vis:svgw('0 0 360 138',s),
   leg:sw('#2f55c9','supplied')+sw('#c2410c','not supplied','hatch'),so:'Nearly a third of the water the city needs is not supplied.'});
}
function cSewage2(){
  var k=0.19,y0=48,h320=320*k,h220=220*k,h100=100*k;
  var s=t2(6,y0-8,'sewage made',{s:12})+'<rect x="6" y="'+y0+'" width="56" height="'+h320+'" fill="#55627a" rx="4"/>'+t2(34,y0+h320/2+5,'320',{s:15,w:800,f:'#fff',a:'middle'})+
   '<path d="M62,'+y0+' C120,'+y0+' 130,16 190,16 L190,'+(16+h220)+' C130,'+(16+h220)+' 120,'+(y0+h220)+' 62,'+(y0+h220)+' Z" fill="#2f55c9"/>'+
   '<path d="M62,'+(y0+h220)+' C120,'+(y0+h220)+' 130,106 190,106 L190,'+(106+h100)+' C130,'+(106+h100)+' 120,'+(y0+h320)+' 62,'+(y0+h320)+' Z" fill="#c2410c"/>'+
   '<rect x="190" y="16" width="14" height="'+h220+'" fill="#2f55c9"/>'+t2(212,16+h220/2+5,'220 treated',{s:16,w:800,f:'#2f55c9'})+
   '<rect x="190" y="106" width="14" height="'+h100+'" fill="#c2410c"/>'+t2(212,106+h100/2+5,'100 untreated',{s:16,w:800,f:'#c2410c'})+
   t2(212,106+h100/2+22,'reaches the Yamuna',{s:11.5});
  return fcard2({b:1,k:'sew',ic:'stp_tank',c:'var(--wa)',label:'Sewage',big:'100 <small>MLD untreated</small>',vis:svgw('0 0 360 138',s),
   leg:sw('#2f55c9','treated')+sw('#c2410c','not treated'),so:'Treatment capacity is about a third short of what the city sends down its drains.'});
}
function cGround2(){
  var st=[['#c2410c',8],['#e06c00',2],['#a15c07',3],['#0b6b3a',2]];var s='',i=0;
  st.forEach(function(g){for(var n=0;n<g[1];n++){var c=i%5,r=Math.floor(i/5);s+='<rect x="'+(10+c*38)+'" y="'+(10+r*38)+'" width="32" height="32" rx="6" fill="'+g[0]+'"/>';i++}});
  s+=t2(214,48,'1.63x',{s:34,w:800,f:'#1b2a41'})+t2(214,70,'drawn for every',{s:12.5})+t2(214,86,'1 that recharges',{s:12.5})+t2(214,124,'One square is one block',{s:11.5});
  return fcard2({b:2,k:'gw',ic:'pump',c:'var(--wa)',label:'Groundwater',big:'8 <small>of 15 blocks over-exploited</small>',vis:svgw('0 0 380 130',s),
   leg:sw('#c2410c','over-exploited, 8')+sw('#e06c00','critical, 2')+sw('#a15c07','semi-critical, 3')+sw('#0b6b3a','safe, 2'),
   so:'Extraction is 162.71% of what recharges. Every block is a separate decision.'});
}
function cTrees2(){
  var s='';
  for(var j=0;j<100;j++){var c=j%10,r=Math.floor(j/10);var x=8+c*12.6,y=6+r*12.6;
    if(j<6)s+='<rect x="'+x+'" y="'+y+'" width="11" height="11" rx="2" fill="#0f766e"/>';
    else if(j===6)s+='<rect x="'+x+'" y="'+y+'" width="11" height="11" rx="2" fill="#e4e9f0"/><rect x="'+x+'" y="'+y+'" width="5.5" height="11" rx="2" fill="#0f766e"/>';
    else if(j<33)s+='<rect x="'+(x+.8)+'" y="'+(y+.8)+'" width="9.4" height="9.4" rx="2" fill="none" stroke="#0f766e" stroke-width="1.7" stroke-dasharray="2.6 2.2"/>';
    else s+='<rect x="'+x+'" y="'+y+'" width="11" height="11" rx="2" fill="#e4e9f0"/>';}
  s+=t2(150,40,'6.5',{s:36,w:800,f:'#0f766e'})+t2(216,40,'of every 100',{s:13.5,w:800,f:'#1b2a41'})+t2(150,60,'hectares is forest',{s:12.5})+
     t2(150,96,'National target: 33',{s:12.5})+t2(150,112,'(the dashed cells)',{s:12.5});
  return fcard2({b:2,k:'forest',ic:'tree_tag',c:'var(--t)',label:'Trees',big:'6.50% <small>forest cover</small>',vis:svgw('0 0 380 132',s),
   leg:sw('#0f766e','forest today')+sw('#0f766e','still to reach the target','dash'),
   so:'Forest cover is under a fifth of the national target, and it fell by 9.38 sq km.'});
}
function cHeat2(){
  var x=14,W=352;function p(t){return x+(t-24)/(50-24)*W}
  var s='<defs><linearGradient id="hg2" x1="0" x2="1"><stop offset="0" stop-color="#2f55c9"/><stop offset=".5" stop-color="#e0a020"/><stop offset="1" stop-color="#c2410c"/></linearGradient></defs>'+
   '<rect x="'+x+'" y="54" width="'+W+'" height="24" rx="12" fill="url(#hg2)"/>'+
   '<line x1="'+p(41.9)+'" y1="42" x2="'+p(41.9)+'" y2="90" stroke="#1b2a41" stroke-width="3"/><circle cx="'+p(41.9)+'" cy="66" r="8" fill="#fff" stroke="#1b2a41" stroke-width="3"/>'+
   t2(p(41.9),34,'41.9',{s:20,w:800,f:'#1b2a41',a:'middle'})+t2(p(41.9)-12,106,'normal May high',{s:11.5,a:'end'})+
   '<line x1="'+p(48.6)+'" y1="42" x2="'+p(48.6)+'" y2="90" stroke="#c2410c" stroke-width="4"/><circle cx="'+p(48.6)+'" cy="66" r="9" fill="#c2410c" stroke="#fff" stroke-width="3"/>'+
   t2(p(48.6),34,'48.6',{s:20,w:800,f:'#c2410c',a:'middle'})+t2(p(48.6),106,'record',{s:11.5,f:'#c2410c',a:'end'})+
   t2(x,126,'24°C',{s:11})+t2(x+W,126,'50°C',{s:11,a:'end'});
  return fcard2({b:2,k:'heat',ic:'weather_mast',c:'var(--c)',label:'Heat',big:'48.6°C <small>record high</small>',vis:svgw('0 0 380 132',s),
   leg:sw('#1b2a41','normal May high')+sw('#c2410c','record'),so:'A record, not a typical summer. Every ward feels it differently.'});
}
function figureCards2(){return '<div class="fcg2">'+cWaste2()+cSupply2()+cSewage2()+cGround2()+cTrees2()+cHeat2()+'</div>'}

/* ---------- slide 4: six offerings, then one ward map ---------- */
function offerView(o,i){
  return '<div class="bo vw" data-o="'+(i+1)+'"><div class="fill ofv" style="--oc:'+o.c+'">'+
   '<div class="ofi">'+v2img(o.img,o.n,o.fb)+'</div>'+
   '<div class="oft-hanging-wrap">'+
     '<div class="hanging-beam oft-beam"><div class="beam-bar"></div><div class="rope-drop rope-l"></div><div class="rope-drop rope-r"></div></div>'+
     '<div class="hanging-plaque oft-plaque">'+
       '<div class="plaque-eyelet eyelet-l"></div><div class="plaque-eyelet eyelet-r"></div>'+
       '<div class="oft-badge-row"><span class="oft-badge">'+(i+1)+' of 6 &middot; Priority Action</span></div>'+
       '<h2>'+o.n+'</h2>'+
       '<p class="oft-p">'+o.line+'</p>'+
       '<div class="ofw">What it covers</div>'+
       '<div class="ofg">'+o.tags.map(function(t){return '<div class="ofg-card"><span class="ofg-dot"></span>'+t+'</div>'}).join('')+'</div>'+
     '</div>'+
   '</div>'+
  '</div></div>';
}
function isoStack6(){
  var h='<svg viewBox="60 40 480 620" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Ward data layers stacked on one map of Agra’s 100 wards">';
  var L=OFFERS.filter(function(o){return !o.nomap});
  L.slice().reverse().forEach(function(p,i){
    var y=520-i*92,T='translate(300,'+y+') scale(0.36) matrix(0.86,0.5,-0.86,0.5,0,0) translate(-230,-173)';
    var dy = (4 - i) * 1.5;
    var dur = (4.4 + (4 - i) * 0.4).toFixed(1);
    h+='<g transform="'+T+'">';
    h+='<animateTransform attributeName="transform" type="translate" values="0,0; 0,-'+(4 + dy)+'; 0,0" dur="'+dur+'s" repeatCount="indefinite" additive="sum"/>';
    h+='<rect x="-14" y="-14" width="488" height="375" fill="'+p.c+'" opacity=".10"/><rect x="-14" y="-14" width="488" height="375" fill="none" stroke="'+p.c+'" stroke-width="3" opacity=".6"/>';
    WARDS.forEach(function(w){h+='<path d="'+w.d+'" fill="'+p.c+'" fill-opacity=".5" stroke="var(--card)" stroke-width="1.6"/>'});
    h+='</g>';
  });
  return h+'</svg>';
}
function layerMap(o,i){
  var h='<svg viewBox="0 0 '+WARDS_VB[0]+' '+WARDS_VB[1]+'" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" aria-hidden="true">';
  WARDS.forEach(function(w,j){var v=((j*37+i*53)%100)/100;h+='<path d="'+w.d+'" fill="'+o.c+'" fill-opacity="'+(0.25+v*0.6).toFixed(2)+'" stroke="var(--card)" stroke-width="1"/>'});
  return h+'</svg>';
}
function awarenessMap(o){
  var h='<svg viewBox="0 0 '+WARDS_VB[0]+' '+WARDS_VB[1]+'" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" aria-hidden="true">';
  WARDS.forEach(function(w,j){
    var v=((j*31)%100)/100;
    h+='<path d="'+w.d+'" fill="'+o.c+'" fill-opacity="'+(0.32+v*0.48).toFixed(2)+'" stroke="var(--card)" stroke-width="1"/>';
  });
  h+='<circle cx="230" cy="173" r="38" fill="none" stroke="'+o.c+'" stroke-width="2" stroke-dasharray="4 4" opacity="0.8"/>';
  h+='<circle cx="230" cy="173" r="75" fill="none" stroke="'+o.c+'" stroke-width="1.5" stroke-dasharray="6 4" opacity="0.5"/>';
  h+='<circle cx="230" cy="173" r="110" fill="none" stroke="'+o.c+'" stroke-width="1" stroke-dasharray="8 6" opacity="0.35"/>';
  h+='<circle cx="230" cy="173" r="7" fill="'+o.c+'" stroke="#fff" stroke-width="2"/>';
  return h+'</svg>';
}
function oneMap(){
  return '<div class="bo vw" data-o="7"><div class="fill omw">'+
   '<div class="oml">'+isoStack6()+'</div>'+
   '<div class="omr"><div class="omh">The same 100 wards of Agra, five layers</div><div class="omg">'+
   OFFERS.filter(function(o){return !o.nomap}).map(function(o,i){return '<div class="omc" style="--oc:'+o.c+'"><div class="omm">'+layerMap(o,i)+'</div><div class="omn"><i></i>'+o.s+'</div></div>'}).join('')+
   OFFERS.filter(function(o){return o.nomap}).map(function(o){
     return '<div class="omc omx-filled" style="--oc:'+o.c+'">'+
       '<div class="omm">'+awarenessMap(o)+'<span class="om-citywide-badge">City-Wide</span></div>'+
       '<div class="omn"><i></i>'+o.s+'</div>'+
     '</div>';
   }).join('')+
   '</div><div class="oms">One record set for each ward. Shading is illustrative until the baseline is measured.</div></div></div></div>';
}
function sixOffers(){return OFFERS.map(offerView).join('')+oneMap()}

/* ---------- offering slides: shared parts ---------- */
/* one application screen, shown whole, with numbered highlight boxes at % positions of the image */
function appScreen(img,alt,marks,ar){
  return '<div class="jsw"><div class="jscr" style="--ar:'+(ar||1.6)+'"><img src="assets/img/v2/'+img+'.jpg" alt="'+alt+'">'+
   (marks||[]).map(function(m,i){return '<i class="jmk" style="left:'+m[0]+'%;top:'+m[1]+'%;width:'+m[2]+'%;height:'+m[3]+'%"><b>'+(i+1)+'</b></i>'}).join('')+'</div></div>';
}
/* a journey through stages (application screens or field photos); Next walks the stages (the deck's stage-flow stepping).
   A stage with marks gets numbered points matching boxes on the screen; a stage with photo:1 fills the panel with its photo. */
var JYID=0;
function imgFb(el){el.onerror=null;el.src='assets/img/v2/'+el.getAttribute('data-fb')+'.jpg'}
function jyPhoto(img,t,cap){return '<div class="jph"><img src="assets/img/v2/'+img+'.jpg" alt="'+t+'">'+(cap?'<span>'+cap+'</span>':'')+'</div>'}
function jyFb(el){var p=el.closest('.jpn');if(p)p.innerHTML=jyPhoto(el.getAttribute('data-fb'),el.alt,el.getAttribute('data-cap'))}
function journey(stages,col,label){
  var id='jy'+(++JYID);
  var h='<div class="fill jy" style="--oc:'+col+'"><div class="jyl"><div class="jyk">'+(label||'The application, page by page')+'</div><div class="sflow jys" id="'+id+'">';
  stages.forEach(function(s,i){
    h+='<button class="jst'+(i===0?' on':'')+'" onclick="pickStage(\''+id+'\','+i+');document.getElementById(\''+id+'\').setAttribute(\'data-cur\','+i+')">'+
     '<span class="jn">'+(i+1)+'</span><span class="jt"><b>'+s.t+'</b><span class="jpts'+(s.m?'':' dots')+'">'+s.pts.map(function(p,k){return '<span><i>'+(s.m?k+1:'')+'</i>'+p+'</span>'}).join('')+'</span></span></button>';
  });
  h+='</div></div><div class="jyr" id="'+id+'p">';
  stages.forEach(function(s,i){h+='<div class="jpn'+(i===0?' on':'')+'">'+(s.html?'<div class="jhp">'+s.html+'</div>':s.photo?jyPhoto(s.img,s.t,s.cap):s.fb?'<div class="jsw"><div class="jscr" style="--ar:'+(s.ar||1.5)+'"><img src="assets/img/v2/'+s.img+'.jpg" alt="'+s.t+'" data-fb="'+s.fb+'" data-cap="'+(s.cap||'')+'" onerror="jyFb(this)"></div></div>':appScreen(s.img,s.t,s.m,s.ar))+'</div>'});
  return h+'</div><div id="'+id+'c" data-c="[]" hidden></div></div>';
}
/* immediate actions: the document's wording, what it means, and where it is seen */
function actionCards(items,col,foot){
  return '<div class="fill iac" style="--oc:'+col+'"><div class="iak">Immediate actions for the city</div><div class="iag" style="grid-template-columns:repeat('+items.length+',1fr)">'+
   items.map(function(a,i){return '<div class="iaw"><div class="iah"><span class="ian">'+(i+1)+'</span>'+ico(a.ic)+'</div><h3>'+a.t+'</h3><p class="iad">'+a.d+'</p>'+
    (a.vis?'<div class="iav">'+a.vis+'</div>':'')+(a.img?'<div class="iai"><img src="assets/img/v2/'+a.img+'.jpg" alt=""'+(a.fb?' data-fb="'+a.fb+'" onerror="imgFb(this)"':'')+'></div>':'')+'<div class="iam"><b>What it means</b><span>'+a.m+'</span></div>'+
    (a.go?'<button class="iago" onclick="show(cur,'+a.go[0]+');setFlow('+a.go[1]+')">'+ico('grid')+(a.goL||'Seen in the application: ')+a.go[2]+'</button>':'')+'</div>'}).join('')+
   '</div>'+(foot?'<div class="iaf">'+foot+'</div>':'')+'</div>';
}

/* ---------- slide 5: Integrated Waste Management ---------- */
function wasteJourney(){
  return '<div class="bo vw" data-o="1">'+journey([
   {t:'Collection and fleet',img:'iwm_collection',
    pts:['Households reached door to door, by ward','Distance and fuel saved by route optimisation','Every vehicle tracked live against its route'],
    m:[[32.4,19.6,16.2,11],[17.4,31.2,17,4],[51.5,35.9,47.7,52.3]]},
   {t:'Segregation at source',img:'iwm_segregation',
    pts:['Source segregation, against the target','Households on incentive, not penalty','Segregation compared zone by zone'],
    m:[[15.5,19.6,20.4,11],[57.7,19.6,20.4,11],[52.1,31.9,26.5,31.6]]},
   {t:'Processing and recovery',img:'iwm_processing',
    pts:['Capacity used across the network','Rejects measured, not reported','Every facility: intake against capacity'],
    m:[[36.6,19.6,20.4,10.7],[78.8,19.6,20.4,10.7],[15.5,31.5,57.9,48.4]]},
   {t:'Waste to value and disposal',img:'iwm_value',
    pts:['Every 100 tonnes followed to where they end','Compost, recovered material and plastic panels','What still reaches the landfill'],
    m:[[15.9,54.4,38.9,27.2],[54.9,54.4,17.7,18.4],[54.9,73.2,17.7,5.6]]},
   {t:'Citizen and grievance',img:'iwm_citizen',
    pts:['Grievances resolved within the service time','What citizens complain about, by category','Every channel on one record'],
    m:[[15.5,18.7,41.4,10.4],[55.6,30.4,23.1,31.6],[79.6,30.4,19.7,31.6]]}
  ],'var(--w)')+'</div>';
}
function wasteActions(){
  return '<div class="bo vw" data-o="2">'+actionCards([
   {ic:'building',t:'Door-to-door collection and user fee',d:'Strengthen the door-to-door collection mechanism and user fee.',
    img:'iwm_crop_coverage',m:'Every waste generator reached at the doorstep, and brought in through incentives to segregate at source.',go:[1,0,'Collection and fleet']},
   {ic:'truck',t:'Real-time vehicle monitoring and route optimisation',d:'Implement technology-driven solutions for primary waste collection, reducing fuel consumption and minimising carbon footprints.',
    img:'iwm_crop_routes',m:'GPS-enabled tracking and route algorithms find the quickest, most cost-effective collection routes, with less fuel and fewer emissions.',go:[1,0,'Collection and fleet']},
   {ic:'recycle',t:'Circular economy and waste to value',d:'Track circular economy and waste-to-value initiatives to divert waste from landfills.',
    img:'iwm_crop_value',m:'Usable waste turned into compost, refuse-derived fuel, bio-CNG and recycled panels, instead of going to landfill.',go:[1,3,'Waste to value']}
  ],'var(--w)','<b>Behavioural change</b><span>Community programmes shift habits toward source segregation through incentives rather than penalties. This links to offering 5, Public Awareness and LiFE.</span>')+'</div>';
}
function wasteDone(){
  var B=[
    {num:'01',tag:'100 Wards · 4 Zones',ic:'grid',t:'Built for Agra',d:'100 wards and 4 zones, from collection to reconciliation and audit, on one command centre.'},
    {num:'02',tag:'Weighbridge Sync',ic:'scale',t:'Every Tonne Reconciled',d:'Declared tonnage checked against the weighbridge, trip by trip.'},
    {num:'03',tag:'Simulated Baseline',ic:'database',t:'Ready for Corporation Records',d:'Runs today on simulated data built from published Agra figures.'}
  ];
  return '<div class="bo vw" data-o="3"><div class="fill ofv dn" style="--oc:var(--w)">'+
   '<div class="ofi"><img src="assets/img/v2/iwm_overview.jpg" alt="The Agra Integrated Waste Management command centre, overview page"></div>'+
   '<div class="dn-bento-container">'+
     '<div class="oft-badge-row"><span class="dn-badge"><span class="live-pulse-dot"></span>Operational &middot; Already Built for Agra</span></div>'+
     '<h2>A working application, already built for Agra.</h2>'+
     '<div class="dn-bento-grid">'+B.map(function(b){
       return '<div class="dn-bento-tile">'+
         '<div class="dn-bento-header">'+
           '<span class="dn-bento-idx">'+b.num+'</span>'+
           '<span class="dn-bento-tag">'+b.tag+'</span>'+
         '</div>'+
         '<div class="dn-bento-title"><span class="dn-bento-ico">'+ico(b.ic)+'</span><span>'+b.t+'</span></div>'+
         '<div class="dn-bento-desc">'+b.d+'</div>'+
       '</div>';
     }).join('')+'</div>'+
     '<div class="dn-actions">'+
       '<a class="btn pri dn-btn-live" href="https://agra-iwm.vercel.app" target="_blank" rel="noopener">Open the live application &nearr;</a>'+
       '<button class="btn dn-btn-subtle" onclick="openSrc(\'iwmsim\')">About the data</button>'+
     '</div>'+
   '</div>'+
  '</div></div>';
}
function wasteSlide(){return wasteJourney()+wasteActions()+wasteDone()}

/* ---------- slide 6: Water Positive City ---------- */
function waterMethod(){
  return '<div class="bo vw" data-o="1">'+journey([
   {t:'Survey and map',img:'s06_survey',fb:'w_ert',ar:1.5,cap:'An EHM field team on an electrical resistivity survey, a method that reads the soil and water layers below ground',
    pts:['Water balance: demand, supply and seasonal deficits','Groundwater levels, stress and recharge potential','GIS map of drains, recharge areas and every waterbody']},
   {t:'Plan the interventions',img:'s04_water',ar:1.49,
    pts:['Decentralised wastewater treatment and reuse','Waterbody restoration and wetland development','Flood and drought resilience planning','Biodiversity and riparian restoration','Water demand management and efficiency']},
   {t:'Govern and track',img:'s06_track',fb:'w_meters',ar:1.5,cap:'Digital water meters reporting through one gateway',
    pts:['Training for city officials, engineers and communities','IoT metering and GIS dashboards, tracked in real time','A Water-Positive Index to measure progress','Convergence with AMRUT, JJM, NABARD and MGNREGA']}
  ],'var(--wa)','The approach, step by step')+'</div>';
}
function waterActions(){
  return '<div class="bo vw" data-o="2">'+actionCards([
   {ic:'recycle',t:'Reuse of treated water',img:'s06_act_reuse',fb:'w_reuse',d:'Establish a clear mechanism for the reuse of treated water from existing STPs across industrial and municipal sectors.',
    m:'Water the city already treats goes to industry, parks and municipal uses instead of being discharged. This is what Water Plus certification asks of a city.'},
   {ic:'drop',t:'Rainwater harvesting and decentralised STPs',img:'s06_act_rwh',fb:'w_rwh',d:'Implement zone-wise Rainwater Harvesting systems and decentralized STPs in high-demand zones.',
    m:'Rain is captured and recharged zone by zone, and wastewater is treated and reused close to where it is made, not only at large central plants.'},
   {ic:'wave',t:'City drainage master action plan',img:'s06_act_drain',fb:'w_drain',d:'Comprehensive City Drainage Master Action Plan to address waterlogging and enhance recharge capacity.',
    m:'One plan for drains clogged by silt, plastic and debris, and for Yamuna backflow into low-lying areas such as Tajganj, so storm water recharges the ground instead of flooding streets.'}
  ],'var(--wa)','<b>Water Positive City</b><span>A city that recharges or replaces more water than it abstracts or consumes, while building climate resilience. Indore became India’s first Water Plus city on the same path.</span>')+'</div>';
}
function waterDone(){
  function ph(img,t,s){return '<div class="wdp"><div class="wdi"><img src="assets/img/v2/'+img+'.jpg" alt="'+t+'"></div><b>'+t+'</b><span>'+s+'</span></div>'}
  return '<div class="bo vw" data-o="3"><div class="fill wd" style="--oc:var(--wa)">'+
   '<div class="wda"><div class="ofn">Already done, here in Agra</div><h2>80 KLD decentralised, nature-based treatment</h2>'+
    '<p>Design and project management at Industrial Area Foundry Nagar. The same decentralised approach is proposed for the city.</p>'+
    '<img src="assets/img/v2/w_agra.jpg" alt="Planted treatment beds at Foundry Nagar, Agra">'+
    '<div class="wdx"><b>Also</b><span>Constructed wetlands designed for 0.5 to 3.5 MLD STPs, Gajwal, Telangana</span><span>20 KLD greywater treatment, Prachi Leather, Kanpur</span></div></div>'+
   '<div class="wdg">'+
    '<div class="wdp wdba"><div class="wdi two"><div><img src="assets/img/v2/w_antia_before.jpg" alt="Antia Taal before restoration"><em>Before</em></div><div><img src="assets/img/v2/w_antia_after.jpg" alt="Antia Taal after restoration"><em>After</em></div></div>'+
     '<b>Antia Taal, Jhansi</b><span>A plan to secure treated water and financial sustainability for a nine acre waterbody. Jhansi Nagar Nigam</span></div>'+
    ph('w_adiyur','Adiyur lake, Tirupathur','227 KLD of greywater tapped, treated and reused to restore the lake. Tirupathur Municipal Corporation')+
    ph('w_laxmi','Laxmi Taal, Jhansi','Waterbody restoration, ongoing')+
    ph('w_csjmu','CSJM University, Kanpur','About 1.5 acres restored with bioremediation floating islands')+
   '</div></div></div>';
}
function waterSlide(){return waterMethod()+waterActions()+waterDone()}

/* ---------- slide 7: Biodiversity and Carbon Stock Assessment ---------- */
/* drawn in the deck, so no generated image is needed: a measured tree, survey methods, carbon pools, the ward portal */
function bTree(mode){
  var g='<svg viewBox="0 0 420 475" preserveAspectRatio="xMidYMid meet" aria-hidden="true">'+
   '<rect x="0" y="360" width="420" height="115" fill="#d9c6a5"/>'+(mode==='carbon'?'<rect x="0" y="360" width="420" height="115" fill="#8a6a44" opacity=".3"/>':'')+
   '<line x1="0" y1="360" x2="420" y2="360" stroke="#8a6a44" stroke-width="2"/>';
  if(mode==='carbon')g+='<g stroke="#7a4f2a" stroke-width="5" stroke-linecap="round" fill="none"><path d="M205 360 L170 400 L140 418"/><path d="M215 360 L250 398 L285 414"/><path d="M210 360 L210 420"/><path d="M190 372 L150 380"/><path d="M230 372 L272 382"/></g>';
  g+='<rect x="195" y="210" width="30" height="150" rx="6" fill="#7a5230"/>'+
   '<path d="M210 250 L170 210 M210 235 L250 200" stroke="#7a5230" stroke-width="9" stroke-linecap="round"/>'+
   '<g fill="#4f8a3a"><circle cx="210" cy="150" r="82"/><circle cx="145" cy="175" r="55"/><circle cx="275" cy="175" r="55"/><circle cx="170" cy="105" r="50"/><circle cx="250" cy="105" r="50"/></g>'+
   '<g fill="#6aa34f" opacity=".85"><circle cx="190" cy="125" r="34"/><circle cx="245" cy="150" r="30"/><circle cx="150" cy="170" r="26"/></g>';
  if(mode==='census'){
    g+='<line x1="60" y1="360" x2="60" y2="70" stroke="#1b2a41" stroke-width="2.5" marker-start="url(#ar)" marker-end="url(#ar)"/>'+t2(48,220,'Height',{s:15,f:'#1b2a41',a:'end'})+
     '<line x1="90" y1="34" x2="330" y2="34" stroke="#1b2a41" stroke-width="2.5" marker-start="url(#ar)" marker-end="url(#ar)"/>'+t2(210,24,'Canopy spread',{s:15,f:'#1b2a41',a:'middle'})+
     '<ellipse cx="210" cy="318" rx="24" ry="8" fill="none" stroke="#e8590c" stroke-width="4"/>'+t2(244,322,'Girth at 1.3 m',{s:15,f:'#e8590c'})+
     '<line x1="236" y1="360" x2="236" y2="318" stroke="#e8590c" stroke-width="1.5" stroke-dasharray="4 3"/>'+
     '<rect x="199" y="272" width="22" height="14" rx="3" fill="#fff" stroke="#1b2a41"/>'+t2(244,286,'Numbered tag',{s:13})+
     '<path d="M360 70 c0-14 22-14 22 0 c0 12-11 24-11 24 c0 0-11-12-11-24z" fill="#e8590c"/><circle cx="371" cy="70" r="4" fill="#fff"/>'+t2(371,112,'GPS point',{s:13,a:'middle'});
  }else{
    var L=function(x1,y1,x2,y2,tx,ty,big,small,c,a){return '<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" stroke="'+c+'" stroke-width="2"/><circle cx="'+x1+'" cy="'+y1+'" r="5" fill="'+c+'"/>'+t2(tx,ty,big,{s:15,f:c,a:a})+t2(tx,ty+17,small,{s:12,a:a})};
    g+='<rect x="96" y="344" width="60" height="12" rx="6" fill="#8b5a2b"/><g fill="#b98b3e"><ellipse cx="300" cy="354" rx="9" ry="4"/><ellipse cx="318" cy="350" rx="8" ry="3.5"/><ellipse cx="286" cy="349" rx="7" ry="3"/></g>'+
     L(165,110,120,66,8,36,'Above-ground biomass','trunk, branches, leaves','#2f6b22','start')+
     L(262,405,300,428,412,448,'Below-ground biomass','roots','#7a4f2a','end')+
     L(118,350,70,318,8,300,'Deadwood and litter','','#8b5a2b','start')+
     t2(8,448,'Soil organic carbon',{s:15,f:'#5a3d22'})+t2(8,465,'in the soil layer',{s:12});
  }
  return g.replace('<svg ','<svg ')+'<defs><marker id="ar" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10z" fill="#1b2a41"/></marker></defs></svg>';
}
function bCensus(){
  var R=[['Tree ID','AGR-W23-00417'],['Species','Neem (<i>Azadirachta indica</i>), native'],['Girth at 1.3 m','142 cm'],['Height','11 m'],['Canopy spread','8 m'],['Health','Good, no defects'],['Location','27.18° N, 78.01° E, ward 23'],['Near','Main road: safety check done']];
  return '<div class="bc"><div class="bcv">'+bTree('census')+'</div><div class="bcr"><div class="bch">One tree, one record <span class="tbc">Illustrative</span></div>'+
   R.map(function(r){return '<div class="bcrow"><span>'+r[0]+'</span><b>'+r[1]+'</b></div>'}).join('')+'<div class="bcf">Synced from the field app to the city GIS database</div></div></div>';
}
function bSurvey(){
  var q='<svg viewBox="0 0 160 110"><rect x="10" y="10" width="90" height="90" fill="#e3efd9" stroke="#2f6b22" stroke-width="2" stroke-dasharray="5 4"/><rect x="10" y="37" width="63" height="63" fill="#cfe3bf" stroke="#2f6b22" stroke-width="2"/><rect x="10" y="55" width="45" height="45" fill="#b5d49f" stroke="#2f6b22" stroke-width="2"/>'+t2(14,24,'10 m',{s:10.5,f:'#2f6b22'})+t2(14,50,'7 m',{s:10.5,f:'#2f6b22'})+t2(14,68,'5 m',{s:10.5,f:'#2f6b22'})+'<g fill="#2f6b22"><circle cx="86" cy="24" r="4"/><circle cx="88" cy="62" r="4"/><circle cx="64" cy="84" r="4"/><circle cx="44" cy="90" r="4"/><circle cx="28" cy="86" r="4"/></g></svg>';
  var tr='<svg viewBox="0 0 160 110"><line x1="10" y1="80" x2="150" y2="80" stroke="#1b2a41" stroke-width="3" stroke-dasharray="8 5"/><circle cx="40" cy="80" r="6" fill="#e8590c"/>'+
   '<g fill="#4467cf"><path d="M70 40 q6 -8 12 0 q6 -8 12 0" stroke="#4467cf" stroke-width="3" fill="none"/><path d="M110 55 q5 -7 10 0 q5 -7 10 0" stroke="#4467cf" stroke-width="3" fill="none"/></g>'+
   '<line x1="88" y1="44" x2="88" y2="80" stroke="#55627a" stroke-dasharray="3 3"/><line x1="120" y1="58" x2="120" y2="80" stroke="#55627a" stroke-dasharray="3 3"/>'+'</svg>';
  var ck='<div class="bsl"><div><span>Painted stork</span><em class="nt">Near threatened</em></div><div><span>Sarus crane</span><em class="vu">Vulnerable</em></div><div><span>Indian roller</span><em>Least concern</em></div><div><span>Neem</span><em>Native tree</em></div></div>';
  var ix='<div class="bix"><div><b>Simpson</b><span>how likely two records are the same species</span></div><div><b>Shannon</b><span>richness and evenness together</span></div></div>';
  function tile(t,s,v){return '<div class="bst"><div class="bsv">'+v+'</div><b>'+t+'</b><span>'+s+'</span></div>'}
  return '<div class="bs">'+tile('Quadrats','Plant plots grown until the species count stops rising, for trees, shrubs and herbs',q)+
   tile('Line transects','Birds and animals recorded along fixed lines, by sight, signs, songs and calls',tr)+
   tile('Species checklist','Every species on land and in water, with its IUCN and Wildlife Protection Act status',ck)+
   tile('Diversity indices','Two standard measures that make wards and sites comparable',ix)+'</div>';
}
function bCarbon(){
  var S=[['Choose the plots','Satellite imagery and LiDAR pick representative plots across the city'],['Measure in the field','Girth and height of every tree in each plot'],['Convert to biomass','Allometric equations suited to each species and to the region'],['Scale to the city','Plots calibrate the remote-sensing map, giving carbon stock ward by ward']];
  return '<div class="bc"><div class="bcv">'+bTree('carbon')+'</div><div class="bcr bcs"><div class="bch">From a measured tree to the city’s carbon</div>'+
   S.map(function(s,i){return '<div class="bcst"><i>'+(i+1)+'</i><div><b>'+s[0]+'</b><span>'+s[1]+'</span></div></div>'}).join('')+'</div></div>';
}
function bPortal(){
  var h='<svg viewBox="0 0 '+WARDS_VB[0]+' '+WARDS_VB[1]+'" preserveAspectRatio="xMidYMid meet" aria-hidden="true">',C=['#e7f1df','#c4ddb0','#97c27d','#5f9c48','#2f6b22'];
  WARDS.forEach(function(w,j){var v=(j*37+11)%100,k=Math.min(4,Math.floor(v/20));var low=k===0&&j%3===0;
    h+='<path d="'+w.d+'" fill="'+C[k]+'" stroke="'+(low?'#e8590c':'#fff')+'" stroke-width="'+(low?2.6:1)+'"'+(low?' stroke-dasharray="5 3"':'')+'/>'});
  h+='</svg>';
  var P=[['map','Canopy cover, ward by ward','One interactive GIS portal for the corporation, open for public engagement'],['tree','Plantation where canopy is lowest','Drives targeted to the wards that need trees most'],['shield','Unsafe trees flagged','Dead, diseased or unstable trees near roads and heritage sites'],['leaf','Plans the city can act on','Conservation, risk management and biodiversity enhancement']];
  return '<div class="bp"><div class="bpm">'+h+'<div class="bpl"><span>Canopy</span>'+C.map(function(c){return '<i style="background:'+c+'"></i>'}).join('')+'<span>low to high</span><em><i class="dsh"></i>plantation target</em></div><span class="tbc">Agra’s 100 wards; shading illustrative until measured</span></div>'+
   '<div class="bpr">'+P.map(function(p){return '<div class="dnc">'+ico(p[0])+'<div><b>'+p[1]+'</b><span>'+p[2]+'</span></div></div>'}).join('')+'</div></div>';
}
function bioMethod(){
  return '<div class="bo vw" data-o="1">'+journey([
   {t:'Tree census and geotagging',html:bCensus(),pts:['Every tree on a GPS point, with its own ID','Species, native or exotic','Girth at 1.3 m, height and canopy spread','Health, and unsafe trees near roads and heritage sites']},
   {t:'Biodiversity survey',html:bSurvey(),pts:['A checklist of flora and fauna, on land and in water','Quadrats for plants, transects for birds and animals','Conservation status under IUCN and the Wildlife Protection Act, 1972','Diversity measured with the Simpson and Shannon indices']},
   {t:'Carbon stock assessment',html:bCarbon(),pts:['Carbon stored above and below ground','Equations suited to each species and region','Satellite and LiDAR scale field plots up to the whole city']},
   {t:'GIS portal and plans',html:bPortal(),pts:['Canopy cover, ward by ward, on one portal','Plantation drives where canopy is lowest','Conservation, risk and enhancement plans']}
  ],'var(--t)','The approach, step by step')+'</div>';
}
function bioActions(){
  var Z=[['pin','Airport region'],['building','Taj Corridor'],['map','Major city entry points']];
  return '<div class="bo vw" data-o="2">'+actionCards([
   {ic:'tree',t:'Tree census, geotagging and carbon stock',d:'Execute a city-wide Tree Census, Geotagging drive, and Carbon Stock Assessment.',
    vis:'<div class="bav">'+[['pin','Every tree','counted and geotagged'],['clip','Its size and health','girth, height, canopy'],['cloud','Its carbon','above and below ground']].map(function(x){return '<div class="bz">'+ico(x[0])+'<div><b>'+x[1]+'</b><span>'+x[2]+'</span></div></div>'}).join('')+'</div>',
    m:'A ward-by-ward register of the city’s trees and the carbon they hold, so the city can justify funding for parks and track its climate goals.',go:[1,0,'Tree census'],goL:'See how it works: '},
   {ic:'leaf',t:'Biodiversity and Nagar Van planning',d:'Initiate targeted Biodiversity and Nagar Van (City Forest) planning near the airport region, Taj Corridor, and major city entry points.',
    vis:'<div class="bav">'+Z.map(function(z){return '<div class="bz">'+ico(z[0])+'<b>'+z[1]+'</b></div>'}).join('')+'</div>',
    m:'City forests that add green cover, reduce urban heat and buffer industrial air pollution, planned first in these three areas.',go:[1,3,'GIS portal'],goL:'See how it works: '}
  ],'var(--t)','<b>Why a census first</b><span>Forest cover in Agra district is 6.5%, against a national target of 33%. A census shows where each new tree will count most.</span>')+'</div>';
}
function bioDone(){
  var C=[['40 lakh+','trees','Pune','A geo-referenced census on an open-data GIS platform, used for ward-wise carbon and micro-forest planting'],
         ['24','wards','Mumbai','A digital census across the city, with records to be opened to residents ward by ward'],
         ['6','corporations','Tamil Nadu','Satellite mapping with a field census app and one dashboard, including Chennai, Coimbatore and Madurai'],
         ['62%','more mapped green cover','Thane','A GPS and GIS census, with the carbon held by mature and heritage trees']];
  return '<div class="bo vw" data-o="3"><div class="fill wd" style="--oc:var(--t)">'+
   '<div class="wda"><div class="ofn">Already done by EHM</div><h2>Ecology and biodiversity assessment, IIT Kanpur</h2>'+
    '<p>A biodiversity baseline for the campus: a checklist of flora and fauna, conservation status, carbon sequestration potential and ecological hotspots, with conservation and risk plans.</p>'+
    '<div class="bdi"><img src="assets/img/v2/b_butterfly.jpg" alt="A lime butterfly recorded during the IIT Kanpur assessment"></div></div>'+
   '<div class="bdr"><div class="ofn">Other Indian cities that have counted their trees</div><div class="bdg">'+
    C.map(function(c){return '<button class="bdc" onclick="openSrc(\'cases\')"><div class="bdn"><b>'+c[0]+'</b><span>'+c[1]+'</span></div><div class="bdt"><b>'+c[2]+'</b><span>'+c[3]+'</span></div></button>'}).join('')+
   '</div></div></div></div>';
}
function bioSlide(){return bioMethod()+bioActions()+bioDone()}

/* ---------- slide 8: CityAdapt, Climate Resilient Agra ---------- */
function climJourney(){
  return '<div class="bo vw" data-o="1">'+journey([
   {t:'Live command centre',img:'ca_command',
    pts:['City vitals live: temperature, air, Yamuna level, power','One map, switched between heat, flood and vulnerability','Live readings from weather stations and sensors'],
    m:[[38.6,7.8,60.5,4],[22.4,17.4,41,4],[75.7,32.6,23.3,22.6]]},
   {t:'Ward risk map',img:'ca_map',
    pts:['Risk layers: heat, flood, grid, hospitals, vulnerable people, tree canopy','Every ward graded from safe to extreme','All wards on one surveillance map'],
    m:[[17.1,18.6,54.6,4],[68.9,26.4,28.4,3.8],[17.5,34.6,80.8,56.6]]},
   {t:'Heat response',img:'ca_heat',
    pts:['Temperature hour by hour, against cooling power demand','Heat-stroke beds free in each hospital','Alert thresholds set for the city: yellow, orange, red'],
    m:[[17.4,19.2,39.7,36.8],[17.4,58.8,81,24.6],[17.4,86.2,81,13.6]]},
   {t:'Storm-water and flooding',img:'ca_flood',
    pts:['Yamuna level against warning and danger marks','Waterlogging depth at low-lying underpasses','Storm-water pumps dispatched from one console'],
    m:[[17.4,19.2,39.7,36.8],[17.4,58.8,81,24.6],[17.4,86.2,81,13.6]]},
   {t:'Alerts and actions',img:'ca_alerts',
    pts:['Each alert tied to a ward and a department','A recommended action with every alert','Escalated or resolved, on the record'],
    m:[[17.4,17.2,81,20.4],[18.7,51,78.4,6.6],[86.5,19,10.8,3.6]]}
  ],'var(--c)','The command centre, page by page')+'</div>';
}
function climActions(){
  var T=[['sun','Heat response','Cooling centres, cool roofs, greening and reflective surfaces where heat hits hardest'],['drop','Storm-water flooding','Drains, pumps and diversions ready in the wards that waterlog first']];
  return '<div class="bo vw" data-o="2">'+actionCards([
   {ic:'cloud',t:'Weather stations and sensor networks',vis:'<div class="bav">'+[['sun','Heat','temperature and heat index'],['cloud','Rain','rainfall, zone by zone'],['wave','Water levels','Yamuna, drains, underpasses']].map(function(x){return '<div class="bz">'+ico(x[0])+'<div><b>'+x[1]+'</b><span>'+x[2]+'</span></div></div>'}).join('')+'</div>',d:'Deploy IoT-enabled weather stations and sensor networks across critical zones for real-time climate monitoring.',
    m:'Live readings of heat, rain and river level from critical zones, feeding one command centre that also tracks power and hospital capacity.',go:[1,0,'Live command centre']},
   {ic:'shield',t:'Ward-level adaptation plans for heat and flooding',d:'Develop ward-level climate adaptation action plans focusing on urban heat response and storm-water flood management.',
    vis:'<div class="bav" style="grid-template-columns:1fr 1fr">'+T.map(function(x){return '<div class="bz">'+ico(x[0])+'<div><b>'+x[1]+'</b><span>'+x[2]+'</span></div></div>'}).join('')+'</div>',
    m:'Each ward gets its own plan, built on its climate risk and vulnerability: where heat and waterlogging hit hardest, and what to do before each season.',go:[1,1,'Ward risk map']}
  ],'var(--c)','<b>Urban heat island</b><span>Cool roofs, urban greening and reflective surfaces lower surface temperatures in dense wards. The ward plans decide where they go first.</span>')+'</div>';
}
function climDone(){
  var B=[
    {num:'01',tag:'290 Wards Live',ic:'grid',t:'Running Today for Delhi',d:'290 wards: heat, flood, air, power and hospitals in one command centre.'},
    {num:'02',tag:'100 Wards · 4 Zones',ic:'map',t:'Ready for Agra’s Wards',d:'Set up on Agra’s 100 wards and 4 zones, sharing the same ward map as the other offerings.'},
    {num:'03',tag:'Bilingual Portal',ic:'phone',t:'Citizen Portal Alongside',d:'Hindi and English: cooling centres, emergency shelters and ward-level issue reporting.'}
  ];
  return '<div class="bo vw" data-o="3"><div class="fill ofv dn" style="--oc:var(--c)">'+
   '<div class="ofi"><img src="assets/img/v2/ca_done.jpg" alt="The CityAdapt authority portal, ward risk map"></div>'+
   '<div class="dn-bento-container">'+
     '<div class="oft-badge-row"><span class="dn-badge"><span class="live-pulse-dot"></span>Operational &middot; Running in Delhi &middot; Ready for Agra</span></div>'+
     '<h2>A working command centre, running today.</h2>'+
     '<div class="dn-bento-grid">'+B.map(function(b){
       return '<div class="dn-bento-tile">'+
         '<div class="dn-bento-header">'+
           '<span class="dn-bento-idx">'+b.num+'</span>'+
           '<span class="dn-bento-tag">'+b.tag+'</span>'+
         '</div>'+
         '<div class="dn-bento-title"><span class="dn-bento-ico">'+ico(b.ic)+'</span><span>'+b.t+'</span></div>'+
         '<div class="dn-bento-desc">'+b.d+'</div>'+
       '</div>';
     }).join('')+'</div>'+
     '<div class="dn-actions">'+
       '<a class="btn pri dn-btn-live" href="https://cityadapt-delhi.climagroanalytics.com/authority" target="_blank" rel="noopener">Open the live application (Delhi) &nearr;</a>'+
     '</div>'+
   '</div>'+
  '</div></div>';
}
function climSlide(){return climJourney()+climActions()+climDone()}

/* ---------- slide 9: Public Awareness Initiatives and LiFE Mission Alignment (city-wide, never a ward map layer) ---------- */
function awReward(){
  var R=[['recycle','Segregated at source','27 of 30 days','+270'],['drop','Water-saving pledge kept','meter reading checked','+100'],['leaf','Joined a cloth-bag drive','market clean-up, Sunday','+150'],['building','Attended a community workshop','LiFE actions at home','+50']];
  return '<div class="bc"><div class="bcr aw"><div class="bch">One household, one reward record <span class="tbc">Illustrative</span></div>'+
   R.map(function(r){return '<div class="awr">'+ico(r[0])+'<div><b>'+r[1]+'</b><span>'+r[2]+'</span></div><em>'+r[3]+'</em></div>'}).join('')+
   '<div class="awt"><span>Points this month</span><b>570</b></div><div class="bcf">Rewards for taking part, not penalties for missing out</div></div>'+
   '<div class="bcr bcs"><div class="bch">How incentives work</div>'+
   [['Reward the habit','Points for segregating, saving water and joining eco-drives'],['Make it visible','Households, schools and markets recognised in public'],['Redeem locally','Points turned into benefits the city decides on'],['Keep it fair','Every point comes from a record, not a claim']].map(function(s,i){return '<div class="bcst"><i>'+(i+1)+'</i><div><b>'+s[0]+'</b><span>'+s[1]+'</span></div></div>'}).join('')+'</div></div>';
}
function awMethod(){
  return '<div class="bo vw" data-o="1">'+journey([
   {t:'Awareness drives',img:'s04_awareness',ar:1.49,
    pts:['Source segregation, water saving and single-use plastic','Community campaigns, digital media and workshops','Schools, markets, resident groups and places of worship']},
   {t:'Incentives, not penalties',html:awReward(),
    pts:['Points for segregating, saving water and joining eco-drives','Recognition in public for households, schools and markets','Every reward backed by a record']},
   {t:'Workshops and training',img:'s09_workshop',fb:'a_ramp',ar:1.5,cap:'EHM training of trainers under the RAMP programme, with UPSIC, Kanpur',
    pts:['Community workshops on LiFE Mission actions','Training of trainers, so the programme reaches every zone','Sessions for officials, engineers and field staff']},
   {t:'Participation, tracked',img:'iwm_citizen',
    pts:['Participation and response recorded, not estimated','Every channel on one record: walk-in, helpline, app, social media','What citizens raise, by category, reported to the corporation'],
    m:[[15.5,18.7,41.4,10.4],[79.6,30.4,19.7,31.6],[55.6,30.4,23.1,31.6]]}
  ],'var(--aw)','The programme, step by step')+'</div>';
}
function awActions(){
  function tiles(T){return '<div class="bav">'+T.map(function(x){return '<div class="bz">'+ico(x[0])+'<div><b>'+x[1]+'</b><span>'+x[2]+'</span></div></div>'}).join('')+'</div>'}
  return '<div class="bo vw" data-o="2">'+actionCards([
   {ic:'chat',t:'City-wide IEC awareness drives',d:'Launch city-wide IEC awareness drives focused on source segregation, water saving, and single-use plastic reduction.',
    vis:tiles([['recycle','Source segregation','wet and dry, at home'],['drop','Water saving','at home and at work'],['leaf','Single-use plastic','cloth bags, refill points']]),
    m:'Community campaigns, digital media and workshops that make three everyday habits routine across the city.',go:[1,0,'Awareness drives'],goL:'See how it works: '},
   {ic:'flag',t:'Incentive programmes and community workshops',d:'Establish incentive-based public programs and community workshops aligned with the LiFE Mission framework.',
    vis:tiles([['flag','Rewards','for taking part'],['building','Workshops','in every zone'],['leaf','LiFE Mission','national framework']]),
    m:'Citizens rewarded for segregating, saving water and joining eco-drives, with workshops that turn LiFE Mission actions into everyday habits.',go:[1,1,'Incentives'],goL:'See how it works: '}
  ],'var(--aw)','<b>LiFE Mission</b><span>Lifestyle for Environment: a national movement for mindful use of resources through individual and community action. It also carries the behavioural change behind Waste and Water.</span>')+'</div>';
}
function awDone(){
  /* the main picture is the UP Vidhan Sabha session photograph (a_vidhan_sabha.jpg); a "Photo to come" panel shows until the file exists */
  var C=[['ESG training of trainers for MSMEs','Course modules and training under the RAMP programme, a World Bank supported central scheme, with UPSIC, Kanpur','flag'],
         ['Training and capacity building','Programmes, workshops and hands-on sessions for government officials, municipal engineers and industry','clip']];
  return '<div class="bo vw" data-o="3"><div class="fill wd" style="--oc:var(--aw)">'+
   '<div class="wda"><div class="ofn">Already done by EHM</div><h2>Among the Top 75 ideas in the LiFE Mission</h2>'+
    '<p>EHM’s idea was selected among the Top 75 in the national LiFE Mission, and EHM received the UP Governor’s Best Sustainability Startup award.</p>'+
    '<div class="awb"><div>'+ico('leaf')+'<b>Top 75</b><span>ideas in the national LiFE Mission</span></div><div>'+ico('flag')+'<b>UP Governor’s award</b><span>Best Sustainability Startup</span></div></div></div>'+
   '<div class="awg"><div class="wdp awp"><div class="wdi"><img src="assets/img/v2/a_vidhan_sabha.jpg" alt="The AI-driven governance session at the UP Vidhan Sabha, August 2025" onerror="this.parentNode.classList.add(\'noimg\');this.remove()">'+
     '<div class="imgto"><b>Photo to come</b><span>UP Vidhan Sabha session, August 2025</span></div></div>'+
     '<b>AI-driven governance session at the UP Vidhan Sabha</b><span>For more than 200 members of the Uttar Pradesh Legislative Assembly, August 2025</span></div>'+
    '<div class="awc">'+C.map(function(c){return '<button class="bdc" onclick="openSrc(\'ehm\')">'+ico(c[2])+'<div class="bdt"><b>'+c[0]+'</b><span>'+c[1]+'</span></div></button>'}).join('')+'</div></div>'+
   '</div></div>';
}
function awSlide(){return awMethod()+awActions()+awDone()}

/* ---------- slide 10: Ward-Level Air Pollution Profiles and Hotspot Reduction ---------- */
/* drawn in the deck, no generated image and no air figure: sensors on the ward map, the hotspot map, the corridor measures, the result tracked */
IC.wind='<path d="M3 8h10a3 3 0 10-3-3"/><path d="M3 12h15a3 3 0 11-3 3"/><path d="M3 16h7"/>';
IC.sensor='<circle cx="12" cy="12" r="2"/><path d="M8 8a6 6 0 000 8M16 8a6 6 0 010 8M5 5a10 10 0 000 14M19 5a10 10 0 010 14"/>';
IC.spray='<path d="M4 6h16"/><path d="M12 6v3"/><path d="M12 12v2M7 11l-1 2M17 11l1 2M12 17v2M5 16l-1 2M19 16l1 2"/>';
IC.road='<path d="M8 3L4 21M16 3l4 18M12 4v3M12 10v4M12 17v3"/>';
var AIRC=['#f8e6ec','#eec3d1','#dd94ad','#c7668a','#9c3558'];
function wardC(w){var m=w.d.match(/-?\d+\.?\d*/g),x=0,y=0,n=m.length/2;for(var i=0;i<m.length;i+=2){x+=+m[i];y+=+m[i+1]}return [x/n,y/n]}
function airLevel(j){return Math.min(4,Math.floor(((j*53+29)%100)/20))}
function airHot(j){return airLevel(j)===4&&j%2===0}
function aMap(mode){
  var h='<svg viewBox="0 0 '+WARDS_VB[0]+' '+WARDS_VB[1]+'" preserveAspectRatio="xMidYMid meet" aria-hidden="true">',top='';
  WARDS.forEach(function(w,j){
    if(mode==='hot'){
      h+='<path d="'+w.d+'" fill="'+AIRC[airLevel(j)]+'" stroke="#fff" stroke-width="1"/>';
      if(airHot(j))top+='<path d="'+w.d+'" fill="none" stroke="#1b2a41" stroke-width="2.4"/>';
    }else{
      var c=wardC(w);
      h+='<path d="'+w.d+'" fill="#f3e3e9" stroke="#fff" stroke-width="1"/>';
      top+='<circle cx="'+c[0].toFixed(1)+'" cy="'+c[1].toFixed(1)+'" r="3" fill="#b4466b" stroke="#fff" stroke-width="1.2"/>';
    }
  });
  return h+top+'</svg>';
}
function aSpark(k){
  var P=[.35,.3,.28,.3,.45,.7,.85,.7,.5,.4,.38,.42,.5,.62,.8,.95,.85,.6,.45,.38];
  var d=P.map(function(v,i){return (i?'L':'M')+(i*10)+','+(40-v*k*34).toFixed(1)}).join('');
  return '<svg viewBox="0 0 190 42" preserveAspectRatio="none" aria-hidden="true"><path d="'+d+' L190,42 L0,42Z" fill="#b4466b" opacity=".15"/><path d="'+d+'" fill="none" stroke="#b4466b" stroke-width="2" vector-effect="non-scaling-stroke"/></svg>';
}
function aSensors(){
  var R=[['Sensor ID','AGR-W23-A02'],['Location','Ward 23, main road junction'],['Measures','PM2.5 and PM10'],['Reading','Live, in real time'],['Nearby','Traffic corridor']];
  return '<div class="bp"><div class="bpm">'+aMap('dots')+'<div class="bpl"><em class="first"><i class="dot"></i>air quality sensor</em></div><span class="tbc">Agra’s 100 wards; sensor positions illustrative until surveyed</span></div>'+
   '<div class="bcr"><div class="bch">One sensor, one live reading <span class="tbc">Illustrative</span></div>'+
   R.map(function(r){return '<div class="bcrow"><span>'+r[0]+'</span><b>'+r[1]+'</b></div>'}).join('')+
   '<div class="asp"><div><b>PM2.5</b><span>through the day</span>'+aSpark(.7)+'</div><div><b>PM10</b><span>through the day</span>'+aSpark(1)+'</div></div>'+
   '<div class="bcf">Every reading goes to the city’s ward map</div></div></div>';
}
function aHotspots(){
  var P=[['road','Congested traffic corridors','Major roads, junctions and entry routes'],['factory','Industrial clusters','Emissions concentrated in one area'],['building','Construction sites','Dust from building and demolition']];
  return '<div class="bp"><div class="bpm">'+aMap('hot')+'<div class="bpl"><span>PM2.5 and PM10</span>'+AIRC.map(function(c){return '<i style="background:'+c+'"></i>'}).join('')+'<span>low to high</span><em><i class="ring"></i>hotspot</em></div><span class="tbc">Agra’s 100 wards; shading illustrative until measured</span></div>'+
   '<div class="bpr"><div class="dnc">'+ico('map')+'<div><b>A profile for every ward</b><span>PM2.5 and PM10 read ward by ward, on one map of the city</span></div></div>'+
   '<div class="bprh">Where hotspots are found</div>'+
   P.map(function(p){return '<div class="dnc">'+ico(p[0])+'<div><b>'+p[1]+'</b><span>'+p[2]+'</span></div></div>'}).join('')+'</div></div>';
}
function aScene(){
  var mist=[388,404,420].map(function(x){return '<circle cx="'+x+'" cy="203" r="3" fill="#2f55c9"/><path d="M'+x+' 208 L'+(x-12)+' 258 M'+x+' 208 L'+x+' 262 M'+x+' 208 L'+(x+12)+' 258" stroke="#4d8fd6" stroke-width="1.6" stroke-dasharray="3 4" fill="none"/>'}).join('');
  var s='<svg viewBox="0 118 560 282" preserveAspectRatio="xMidYMid meet" aria-hidden="true">'+
   '<rect x="0" y="318" width="560" height="82" fill="#d9c6a5"/><rect x="152" y="318" width="266" height="46" fill="#5b6472"/>'+
   '<line x1="164" y1="341" x2="408" y2="341" stroke="#fff" stroke-width="3" stroke-dasharray="18 14"/>'+
   /* homes */
   '<rect x="8" y="250" width="44" height="68" fill="#e9dccb" stroke="#b9a58a"/><path d="M4 250 L30 228 L56 250Z" fill="#b5694a"/><rect x="18" y="266" width="10" height="12" fill="#8fb3d1"/><rect x="34" y="266" width="10" height="12" fill="#8fb3d1"/><rect x="25" y="296" width="11" height="22" fill="#8a6a44"/>'+
   '<rect x="56" y="226" width="38" height="92" fill="#f1e7d8" stroke="#b9a58a"/><rect x="63" y="238" width="9" height="11" fill="#8fb3d1"/><rect x="78" y="238" width="9" height="11" fill="#8fb3d1"/><rect x="63" y="262" width="9" height="11" fill="#8fb3d1"/><rect x="78" y="262" width="9" height="11" fill="#8fb3d1"/><rect x="63" y="286" width="9" height="11" fill="#8fb3d1"/><rect x="78" y="286" width="9" height="11" fill="#8fb3d1"/>'+
   /* green buffer, both kerbs */
   '<g><rect x="110" y="270" width="6" height="48" fill="#7a5230"/><rect x="133" y="280" width="5" height="38" fill="#7a5230"/><circle cx="113" cy="254" r="25" fill="#4f8a3a"/><circle cx="136" cy="268" r="19" fill="#5f9c48"/><circle cx="106" cy="246" r="11" fill="#6aa34f"/><rect x="98" y="300" width="52" height="18" rx="9" fill="#3f7a2e"/></g>'+
   '<g><rect x="535" y="276" width="6" height="42" fill="#7a5230"/><circle cx="538" cy="262" r="21" fill="#4f8a3a"/><circle cx="531" cy="255" r="9" fill="#6aa34f"/><rect x="512" y="300" width="46" height="18" rx="9" fill="#3f7a2e"/><rect x="446" y="302" width="26" height="16" rx="8" fill="#3f7a2e"/></g>'+
   /* traffic and dust */
   '<g fill="#b89b74"><circle cx="176" cy="304" r="13" opacity=".4"/><circle cx="163" cy="292" r="9" opacity=".3"/><circle cx="300" cy="306" r="10" opacity=".4"/><circle cx="289" cy="297" r="7" opacity=".3"/></g>'+
   '<rect x="190" y="266" width="62" height="42" rx="3" fill="#8a94a6"/><path d="M252 282 h18 l8 12 v14 h-26z" fill="#6b7689"/><rect x="257" y="286" width="12" height="9" fill="#cfe0ee"/><g fill="#1b2a41"><circle cx="205" cy="312" r="8"/><circle cx="236" cy="312" r="8"/><circle cx="265" cy="312" r="8"/></g>'+
   '<path d="M312 310 v-12 l10 -2 l8 -10 h22 l9 10 l9 2 v12z" fill="#c7668a"/><path d="M333 289 h17 l6 8 h-29z" fill="#cfe0ee"/><g fill="#1b2a41"><circle cx="327" cy="312" r="7"/><circle cx="358" cy="312" r="7"/></g>'+
   /* misting system */
   '<line x1="430" y1="318" x2="430" y2="196" stroke="#1b2a41" stroke-width="4"/><line x1="432" y1="200" x2="378" y2="200" stroke="#1b2a41" stroke-width="4"/>'+mist+
   '<g fill="#8fc1ee" opacity=".35"><ellipse cx="404" cy="268" rx="38" ry="12"/><ellipse cx="392" cy="284" rx="30" ry="9"/></g>'+
   /* sensor */
   '<line x1="492" y1="318" x2="492" y2="214" stroke="#1b2a41" stroke-width="4"/><rect x="480" y="214" width="24" height="30" rx="4" fill="#fff" stroke="#1b2a41" stroke-width="2"/><circle cx="492" cy="229" r="4" fill="#b4466b"/><path d="M476 206 L508 196 L508 204 L476 214Z" fill="#2c3e5c"/>'+
   '<path d="M512 222 a10 10 0 010 14 M518 216 a18 18 0 010 26" stroke="#b4466b" stroke-width="2" fill="none"/>'+
   /* labels */
   t2(113,206,'Green buffer',{s:15,f:'#2f6b22',a:'middle'})+t2(113,222,'vegetative barrier zone',{s:11.5,a:'middle'})+
   t2(436,172,'Dust suppression',{s:15,f:'#2f55c9',a:'end'})+t2(436,188,'misting system',{s:11.5,a:'end'})+
   t2(554,140,'Air quality sensor',{s:15,f:'#b4466b',a:'end'})+t2(554,156,'PM2.5 and PM10, live',{s:11.5,a:'end'})+'<line x1="492" y1="162" x2="492" y2="194" stroke="#b4466b" stroke-width="1.5" stroke-dasharray="4 3"/>'+
   t2(50,340,'Homes',{s:13,f:'#5a3d22',a:'middle'})+t2(285,386,'Major traffic corridor or entry route',{s:13,f:'#1b2a41',a:'middle'});
  return s+'</svg>';
}
function aMeasures(){
  var P=[['spray','Dust suppression','Misting systems that keep PM2.5 and PM10 from dispersing'],['tree','Green buffers','Vegetative barrier zones between the road and the neighbourhood'],['road','Along corridors and entry routes','Major traffic corridors and high-density entry routes first'],['pin','Aimed at the hotspot','Each measure placed where the sensors show it is needed']];
  return '<div class="am"><div class="bcv">'+aScene()+'</div><div class="amr">'+P.map(function(p){return '<div class="dnc">'+ico(p[0])+'<div><b>'+p[1]+'</b><span>'+p[2]+'</span></div></div>'}).join('')+'</div></div>';
}
function aChart(){
  var hi=[.78,.86,.74,.9,.8,.92,.76,.88,.82],lo=[.82,.72,.62,.54,.47,.41,.38,.34,.36,.32],Y=470,H=330;
  function line(k,col){
    var d=hi.map(function(v,i){return (i?'L':'M')+(60+i*23.75).toFixed(1)+','+(Y-v*k*H).toFixed(1)}).join('')+lo.map(function(v,i){return 'L'+(250+i*25.5).toFixed(1)+','+(Y-v*k*H).toFixed(1)}).join('');
    return '<path d="'+d+'" fill="none" stroke="'+col+'" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"/>';
  }
  return '<svg viewBox="0 0 580 540" preserveAspectRatio="xMidYMid meet" aria-hidden="true">'+
   '<rect x="250" y="110" width="250" height="'+(Y-110)+'" fill="#4f8a3a" opacity=".08"/>'+
   '<line x1="60" y1="110" x2="60" y2="'+Y+'" stroke="#1b2a41" stroke-width="2"/><line x1="60" y1="'+Y+'" x2="500" y2="'+Y+'" stroke="#1b2a41" stroke-width="2"/>'+
   '<line x1="250" y1="98" x2="250" y2="'+Y+'" stroke="#1b2a41" stroke-width="2" stroke-dasharray="6 5"/>'+
   line(1,'#9c3558')+line(.58,'#dd94ad')+
   t2(60,40,'Particulate matter at one hotspot',{s:19,f:'#1b2a41'})+
   t2(250,88,'Measures begin',{s:14,f:'#1b2a41',a:'middle'})+
   t2(155,Y+28,'Before',{s:15,a:'middle'})+t2(375,Y+28,'After',{s:15,f:'#2f6b22',a:'middle'})+t2(500,Y+56,'Time',{s:13,a:'end'})+
   t2(508,Y-.32*H+5,'PM10',{s:14,f:'#9c3558'})+t2(508,Y-.32*.58*H+5,'PM2.5',{s:14,f:'#c7668a'})+'</svg>';
}
function aTrack(){
  var S=[['The same sensors, before and after','The reading at each hotspot shows whether a measure worked'],['Hotspots ranked again','Measures move to where they are needed next'],['One ward map','Air sits on the same 100 wards as waste, water, trees and climate'],['Reported to the corporation','Ward profiles on the record, not estimated']];
  return '<div class="bc"><div class="bcv ach">'+aChart()+'<span class="tbc">Illustrative</span></div><div class="bcr bcs"><div class="bch">From a measure to a result</div>'+
   S.map(function(s,i){return '<div class="bcst"><i>'+(i+1)+'</i><div><b>'+s[0]+'</b><span>'+s[1]+'</span></div></div>'}).join('')+'</div></div>';
}
function airMethod(){
  return '<div class="bo vw" data-o="1">'+journey([
   {t:'Ward sensor network',html:aSensors(),pts:['High-density, low-cost sensors across the wards','PM2.5 and PM10 read in real time','Localised emission sources pinpointed']},
   {t:'Ward profiles and hotspot map',html:aHotspots(),pts:['An air pollution profile for every ward','Hotspots mapped as they form','Traffic corridors, industrial clusters and construction sites']},
   {t:'Targeted measures',html:aMeasures(),pts:['Dust suppression with misting systems','Green buffers as vegetative barrier zones','Along major traffic corridors and high-density entry routes']},
   {t:'Track the result',html:aTrack(),pts:['The same sensors show whether a measure worked','Hotspots ranked again, measures moved where needed','Air on the same ward map as the other offerings']}
  ],'var(--air)','The approach, step by step')+'</div>';
}
function airActions(){
  function tiles(T){return '<div class="bav">'+T.map(function(x){return '<div class="bz">'+ico(x[0])+'<div><b>'+x[1]+'</b><span>'+x[2]+'</span></div></div>'}).join('')+'</div>'}
  return '<div class="bo vw" data-o="2">'+actionCards([
   {ic:'sensor',t:'Ward-level air quality sensor network',d:'Deploy ward-level air quality monitoring sensor networks to map PM2.5 and PM10 hotspots in real time.',
    vis:tiles([['sensor','Sensors','across the wards'],['wind','PM2.5 and PM10','in real time'],['pin','Hotspots','mapped ward by ward']]),
    m:'High-density, low-cost sensors across the wards pinpoint localised emission sources, so the city sees where the air is worst and why.',go:[1,0,'Ward sensor network'],goL:'See how it works: '},
   {ic:'spray',t:'Dust suppression and green buffers',d:'Implement targeted dust suppression measures and green buffer strategies along major traffic corridors and high-density entry routes.',
    vis:tiles([['spray','Dust suppression','misting systems'],['tree','Green buffers','vegetative barrier zones'],['road','Corridors','and city entry routes']]),
    m:'Misting systems and vegetative barrier zones that keep PM2.5 and PM10 from dispersing, placed where the sensors show the hotspots are.',go:[1,2,'Targeted measures'],goL:'See how it works: '}
  ],'var(--air)','<b>Pollution hotspot management</b><span>Targeted mitigation aimed at high-emission micro-zones such as congested traffic corridors, industrial clusters and construction sites. Nagar Van planning under offering 3 adds green cover that also buffers industrial air pollution.</span>')+'</div>';
}
function airSlide(){return airMethod()+airActions()}

/* ---------- slide 11: What the district gains ---------- */
/* one view per offering: the rail on the left collects the gains as they are shown; the picture is the gain image s11_*, and the slide 4 illustration until that file exists.
   Awareness and LiFE is city-wide, so no gain here is worded as ward-level for it. */
var GAINS=[
 {r:'Less to landfill, more to value',h:'Less waste to landfill, and more of it turned into value.',
  g:['Door-to-door collection at every doorstep, with incentives to segregate at source','Less fuel burned and lower emissions, through optimised collection routes','Every vehicle monitored in real time, and waste to value tracked']},
 {r:'More recharged than drawn',h:'Treated water reused, rain harvested, and more recharged than drawn.',
  g:['Less waterlogging, with one drainage plan for the city','Rain harvested and recharged zone by zone, building climate resilience','A clear mechanism to reuse treated water from existing STPs, across industry and the city']},
 {r:'Every tree on record',h:'Every tree on record, and city forests planned where they count.',
  g:['Safer streets and parks, with the health of every tree on record','More green cover, less urban heat, and a buffer against industrial air pollution','Carbon stock figures that justify funding for parks and support climate goals']},
 {r:'Every ward ready',h:'Heat and flooding seen as they build, with a plan for every ward.',
  g:['Heat response and storm-water flood management planned for their own ward','Cool roofs, greening and reflective surfaces where the city is hottest','One command centre for weather, heat index, flooding, power outages and emergency health capacity']},
 {r:'Citizens taking part',h:'Citizens who take part, because taking part is rewarded.',
  g:['Rewards for segregating, saving water and joining civic eco-drives','Source segregation, water saving and less single-use plastic become everyday habits','The behavioural change that Waste and Water depend on, aligned with the LiFE Mission']},
 {r:'Hotspots found and reduced',h:'Pollution hotspots found in real time, and reduced where they are.',
  g:['Less dust along major traffic corridors and high-density entry routes','Green buffers: vegetative barrier zones that hold back PM2.5 and PM10','A PM2.5 and PM10 profile for every ward, with emission sources pinpointed']}
];
function gainView(i){
  var o=OFFERS[i],g=GAINS[i],L=[['people','For citizens'],['leaf','For the environment'],['shield','For the corporation']];
  return '<div class="bo vw" data-o="'+(i+1)+'"><div class="fill gw" style="--oc:'+o.c+'">'+
   '<div class="gwl"><div class="jyk">Six offerings, six gains</div>'+
   OFFERS.map(function(p,j){return '<button class="gwi'+(j===i?' on':j<i?' done':'')+'" style="--ic:'+p.c+'" onclick="show(cur,'+(j+1)+')"><span class="gwn">'+(j+1)+'</span><span class="gwt"><b>'+p.s+'</b>'+(j<=i?'<span>'+GAINS[j].r+'</span>':'')+'</span></button>'}).join('')+
   (i===GAINS.length-1?'<div class="gwall">Together they give the district one picture to plan, respond and report from.</div>':'')+'</div>'+
   '<div class="gwp"><div class="gwh"><div class="ofn">Gain '+(i+1)+' of 6 &middot; '+o.n+'</div><h2>'+g.h+'</h2></div>'+
   '<div class="gwb"><div class="gwim"><img src="assets/img/v2/'+o.img.replace('s04_','s11_')+'.jpg" alt="'+o.n+'" data-fb="'+o.img+'" onerror="imgFb(this)"></div>'+
   '<div class="gwr">'+L.map(function(l,k){return '<div class="gwrow">'+GL[l[0]]+'<div><span>'+l[1]+'</span><b>'+g.g[k]+'</b></div></div>'}).join('')+'</div></div></div></div></div>';
}
function gainsSlide(){return GAINS.map(function(_,i){return gainView(i)}).join('')}

/* ---------- slide 12: One programme, or six contracts ---------- */
/* three views: contracted separately, as one programme, the difference side by side.
   The pictures are drawn in the deck from Agra's ward map; if s12_six.jpg or s12_one.jpg exists it is shown instead. */
IC.people='<circle cx="9" cy="8" r="3.5"/><path d="M2 21c0-4 3-7 7-7s7 3 7 7"/><circle cx="17.5" cy="9" r="2.5"/><path d="M17 14c3 0 5 2.5 5 6"/>';
function sixDrawn(){
  return '<div class="s12d"><div class="sxg">'+OFFERS.map(function(o,i){
    return '<div class="sxt" style="--ic:'+o.c+'"><div class="sxm">'+(o.nomap?awarenessMap(o):layerMap(o,i))+'</div><b>'+o.s+'</b><span>Own team, own survey, own records</span></div>'}).join('')+
   '</div><div class="s12c">The same city and the same wards, visited by six separate teams</div></div>';
}
function oneDrawn(){
  return '<div class="s12d"><div class="s1w"><div class="s1v">'+isoStack6()+'</div><div class="s1l">'+
   OFFERS.filter(function(o){return !o.nomap}).map(function(o){return '<div style="--ic:'+o.c+'"><i></i><b>'+o.s+'</b></div>'}).join('')+
   OFFERS.filter(function(o){return o.nomap}).map(function(o){return '<div class="cw" style="--ic:'+o.c+'"><i></i><b>'+o.s+'</b><span>city-wide, alongside the five layers</span></div>'}).join('')+
   '</div></div><div class="s12c">The same 100 wards, surveyed once, with five layers on one map</div></div>';
}
function s12Fb(el,k){el.parentNode.innerHTML=k==='six'?sixDrawn():oneDrawn()}
function s12View(n,k,kick,head,P,alt){
  var isSix = (k === 'six');
  var badgeText = isSix ? 'Contracted Separately · High Fragmentation' : 'Unified Programme · Single Partner';
  var badgeStyle = isSix ? 'color:#b91c1c;background:rgba(239,68,68,0.12);border-color:rgba(239,68,68,0.3);' : '';
  var dotStyle = isSix ? 'background:#ef4444;box-shadow:0 0 0 0 rgba(239,68,68,0.7);' : '';
  var borderTop = isSix ? 'border-top-color:#dc2626;' : 'border-top-color:var(--teal);';
  var tags = isSix ? ['Separate Visits', 'Incompatible Data', 'Siloed Systems', 'District Burden'] : ['Single Survey', 'Unified Record', 'Single Ward Map', 'Single Partner'];

  return '<div class="bo vw" data-o="'+n+'"><div class="fill ofv dn" style="--oc:'+(isSix?'#dc2626':'var(--teal)')+'">'+
   '<div class="ofi"><img src="assets/img/v2/s12_'+k+'.jpg" alt="'+alt+'" onerror="s12Fb(this,\''+k+'\')"></div>'+
   '<div class="dn-bento-container" style="'+borderTop+'">'+
     '<div class="oft-badge-row"><span class="dn-badge" style="'+badgeStyle+'"><span class="live-pulse-dot" style="'+dotStyle+'"></span>'+badgeText+'</span></div>'+
     '<h2>'+head+'</h2>'+
     '<div class="dn-bento-grid" style="gap:clamp(6px, 1vh, 9px)">'+P.map(function(p, idx){
       var num = '0' + (idx + 1);
       var tag = tags[idx] || '';
       return '<div class="dn-bento-tile" style="padding:clamp(6px, 1vh, 9px) 12px">'+
         '<div class="dn-bento-header">'+
           '<span class="dn-bento-idx" style="'+(isSix?'color:#b91c1c;background:rgba(239,68,68,0.12);border-color:rgba(239,68,68,0.25);':'')+'">'+num+'</span>'+
           '<span class="dn-bento-tag" style="'+(isSix?'color:#b91c1c;':'')+'">'+tag+'</span>'+
         '</div>'+
         '<div class="dn-bento-title"><span class="dn-bento-ico" style="'+(isSix?'color:#dc2626;':'')+'">'+ico(p[0])+'</span><span>'+p[1]+'</span></div>'+
         '<div class="dn-bento-desc">'+p[2]+'</div>'+
       '</div>';
     }).join('')+'</div>'+
   '</div></div></div>';
}
function s12Diff(){
  var R=[['Field work','Six teams, the same wards visited six times','One team, each ward surveyed once','people'],
         ['Records','Six sets of records, in six formats','One Agra database, owned by the district','database'],
         ['Reporting','Six reports and portals, read separately','One ward map, read together','grid'],
         ['Contact','Six vendors to call','One partner, answerable for all six','chat'],
         ['Joining it up','Left to the district','Built in from the start','shield']];

  return '<div class="bo vw" data-o="3">'+
    '<div class="cmp-bento-stack">'+
      '<div class="cmp-pill-header-row">'+
        '<div></div>'+
        '<div><span class="cmp-pill six">&times; Six Contracts (Fragmented)</span></div>'+
        '<div><span class="cmp-pill one"><span class="live-pulse-dot"></span> One Programme (Unified)</span></div>'+
      '</div>'+
      R.map(function(r){
        return '<div class="cmp-bento-row">'+
          '<div class="cmp-bento-cat"><span class="cmp-bento-cat-ico">'+ico(r[3])+'</span><span>'+r[0]+'</span></div>'+
          '<div class="cmp-bento-six"><span style="color:#ef4444;font-weight:800;font-size:14px;flex:none;">&times;</span><span>'+r[1]+'</span></div>'+
          '<div class="cmp-bento-one"><span style="color:var(--teal);font-weight:800;font-size:14px;flex:none;">&#10003;</span><span>'+r[2]+'</span></div>'+
        '</div>';
      }).join('')+
    '</div>'+
    '<div class="adv">Six separate contracts leave the joining up to the district. One programme does it once.</div>'+
  '</div>';
}
function oneProgramme(){
  return s12View(1,'six','If each offering is contracted separately','Six contracts mean six separate efforts.',
    [['people','Six field teams','Each goes to the same wards and the same officers, at different times'],
     ['database','Six sets of records','Kept in six formats, so wards cannot be compared across them'],
     ['grid','Six reports and portals','Each one read separately by the corporation'],
     ['chat','Six points of contact','And the work of joining them up stays with the district']],
    'Six separate teams at work in the same Agra wards')+
   s12View(2,'one','As one programme','One programme, joined up from the start.',
    [['people','One field team','The wards are surveyed once, to one method'],
     ['database','One Agra database','Owned by the district, with one record set for each ward'],
     ['map','One picture','Waste, water, trees, climate and air read together on the same ward map'],
     ['chat','One point of contact','One partner answerable for all six offerings']],
    'One team and one ward map of Agra')+
   s12Diff();
}

/* ---------- slide 13: Roadmap (no images) ---------- */
/* one road, climbing from the bottom left to the top right, built one phase at a time: each Next lays the next stretch and opens that phase's card.
   The last view is the whole roadmap. Positions are percentages of the panel, so the road and the cards keep their places at every screen size.
   The steps are the immediate actions, placed in order: measure, act where the evidence points, extend to the whole city.
   The month ranges are carried from v1 and are for EHM to confirm. */
var RMP=[
 {n:'Phase 0',m:'Months 0 to 6',t:'Measure',c:'var(--teal)',line:'Every ward measured once',
  d:'M-2,85 L20,85 C25.5,85 28.25,76.75 31,68.5',from:'100%',mx:11,my:85,
  s:['Collection monitored','Water surveyed, mapped','Tree census, carbon stock','Weather stations','Awareness drives begin','Air sensors, hotspots']},
 {n:'Phase 1',m:'Months 6 to 12',t:'Act',c:'var(--wa)',line:'Act first where the evidence points',
  d:'M31,68.5 C33.75,60.25 36.5,52 42,52 L60,52 C65.5,52 68.25,43.5 71,35',from:'69%',mx:51,my:52,
  s:['Routes optimised','Rainwater harvesting','Nagar Van planning','Heat and flood plans','Incentives, workshops','Dust control, green buffers']},
 {n:'Phase 2',m:'Months 12 to 24',t:'Extend',c:'var(--green)',line:'The whole city, on one map',
  d:'M71,35 C73.75,26.5 76.5,18 82,18 L102,18',from:'29%',mx:91,my:18,
  s:['Less waste to landfill','City drainage plan','GIS portal, plantation drives','All 100 wards live','Participation tracked','Hotspots ranked again']}
];
function rdSvg(inner,cls,style){return '<svg class="rds '+(cls||'')+'"'+(style?' style="'+style+'"':'')+' viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">'+inner+'</svg>'}
function rdBuilt(p){return '<path class="rde" style="stroke:'+p.c+'" d="'+p.d+'"/><path class="rda" d="'+p.d+'"/><path class="rdl" d="'+p.d+'"/>'}
function rdView(k){
  var base='',h='';
  RMP.forEach(function(p,i){
    if(i<k)base+=rdBuilt(p);
    else if(i>k)base+='<path class="rdu" d="'+p.d+'"/><path class="rdv" d="'+p.d+'"/>';
  });
  h+=rdSvg(base)+rdSvg(rdBuilt(RMP[k]),'new','--from:'+RMP[k].from);
  /* where the built road stops, until the last phase */
  if(k<RMP.length-1){var e=RMP[k].d.split(' ').pop().split(',');h+='<i class="rdx" style="left:'+e[0]+'%;top:'+e[1]+'%"></i>'}
  RMP.forEach(function(p,i){
    h+='<div class="rdm'+(i<=k?' on':'')+(i===k?' new':'')+'" style="--pc:'+p.c+';left:'+p.mx+'%;top:'+p.my+'%">'+i+'</div>';
    if(i>k)h+='<div class="rdt" style="--pc:'+p.c+';left:'+p.mx+'%;top:'+p.my+'%"><b>'+p.n+' &middot; '+p.t+'</b><span>'+p.m+'</span></div>';
    else h+='<div class="rdc c'+i+(i===k?' new':'')+'" style="--pc:'+p.c+'"><div class="rdh"><b>'+p.n+' &middot; '+p.t+'</b><span>'+p.m+'</span></div><div class="rdn">'+p.line+'</div><div class="rdi">'+
      OFFERS.map(function(o,j){return '<div><i style="background:'+o.c+'"></i>'+p.s[j]+'</div>'}).join('')+'</div></div>';
  });
  h+='<div class="rdk"><div class="rdkg">'+OFFERS.map(function(o){return '<span><i style="background:'+o.c+'"></i>'+o.s+'</span>'}).join('')+'</div><span class="tbc">Timings and phasing drafted, for EHM to confirm</span></div>';
  if(k===RMP.length-1)h+='<div class="rdf">Scope widens only after a baseline exists.</div>';
  return '<div class="bo vw" data-o="'+(k+1)+'"><div class="fill rd">'+h+'</div></div>';
}
function roadmap(){return RMP.map(function(_,k){return rdView(k)}).join('')}

/* ---------- slide 14: The ask (placeholder until leadership gives the final wording) ---------- */
/* beat 1: the first immediate action of each offering, the same six steps as Phase 0 of the roadmap.
   beat 2: the one decision asked for, on the Agra dawn picture that opened the deck. */
function askSlide(){
  var A=[['building','Strengthen door-to-door collection and the user fee'],
         ['recycle','Set up the reuse of treated water from the existing STPs'],
         ['tree','Begin the city-wide tree census, geotagging and carbon stock assessment'],
         ['cloud','Deploy weather stations and sensors across critical zones'],
         ['chat','Launch city-wide awareness drives on segregation, water saving and single-use plastic'],
         ['sensor','Deploy ward-level air quality sensors to map PM2.5 and PM10 hotspots']];

  return '<div class="bo vw" data-o="1"><div class="fill ak">'+
    '<div class="akh"><b>Six first steps, one for each offering</b><span class="tbc">Wording to confirm with leadership</span></div>'+
    '<div class="akg-3d">'+
      OFFERS.map(function(o,i){
        return '<div class="ak-3d-card" style="--ic:'+o.c+'">'+
          '<span class="ak-eyelet l"></span><span class="ak-eyelet r"></span>'+
          '<div class="akb-header" style="margin-top:2px;">'+
            '<div class="akb-lead"><span class="akb-icon">'+ico(A[i][0])+'</span><span class="akb-name">'+o.s+'</span></div>'+
            '<span class="akb-num" style="background:var(--ic);color:#fff;border:none;">'+(i+1)+'</span>'+
          '</div>'+
          '<div class="akb-body">'+A[i][1]+'</div>'+
          '<div class="akb-footer">'+
            '<span class="akb-pill" style="border-color:var(--ic);color:var(--ic);font-weight:800;">● Phase 0 Action</span>'+
          '</div>'+
        '</div>';
      }).join('')+
    '</div>'+
    '<div class="akf">These are the six steps of Phase 0 on the roadmap: every ward measured once.</div></div></div>'+
   '<div class="bo vw" data-o="2"><div class="fill wa turn"><img class="wab" src="assets/img/v2/s02_agra_dawn.webp" alt="Agra at dawn: the Fort, the Taj Mahal and the Yamuna">'+
    '<div class="wamap">'+wardOutline()+'</div><div class="watint"></div>'+
    '<div class="wat"><div class="wak">The ask</div><p>One decision to begin.</p><p class="big">Agree the scope of Phase 0 with the district, and begin the data request.</p>'+
    '<div class="was">One partner &middot; one Agra database the district owns &middot; a baseline before any larger commitment</div>'+
    '<div class="was"><span class="tbc">Wording to confirm with leadership</span></div></div></div></div>';
}

/* ---------- slide 1: About EHM, the people (beat 3) ---------- */
/* four portraits from the brochure's Members folder (tools\import_people.py), details as the brochure gives them;
   the team members, advisers and experts EHM also draws on sit beneath; only people with a photo in that folder are named (decided 2026-10-02) */
function abPeople(){
  var T=[['pp_harshit','Dr Harshit Mishra','CEO','Ph.D., IIT Bombay','Risk assessment and sustainability'],
         ['pp_utsav','Dr Utsav Mishra','CTO','Ph.D., IIT Kanpur','Environmental geophysics'],
         ['pp_neha','Ms Neha Shukla','COO','M.Sc., PGDCA','Operations, social media and data'],
         ['pp_jitendra','Dr Jitendra Singh','Expert','Ph.D.','Climate extremes and agriculture risk']];
  var A=[['av_pranshu','Pranshu Mohan','Climate data modelling and vulnerability'],
         ['av_katyayani','Ms Katyayani Mishra','Policy and legal initiatives'],
         ['av_karmakar','Prof. S. Karmakar','Climate risk, IIT Bombay'],
         ['av_tarun','Prof. Tarun Gupta','Environmental engineering, IIT Kanpur'],
         ['av_hiremath','Dr Anand Hiremath','Sustainability and ESG'],
         ['av_phani','Prof. B.V. Phani','Corporate finance, IIT Kanpur'],
         ['av_prabhjot','Er. Prabhjot Singh','Structural engineering']];
  return '<div class="abh">The people</div><div class="apg">'+T.map(function(x){
     return '<div class="apc"><div class="apph"><img src="assets/img/v2/'+x[0]+'.jpg" alt="'+x[1]+'"><em>'+x[2]+'</em></div><div class="apt"><b>'+x[1]+'</b><span class="q">'+x[3]+'</span><span>'+x[4]+'</span></div></div>'}).join('')+'</div>'+
   '<div class="apa"><b>Also drawing on</b><div class="apal">'+A.map(function(a){
     return '<div>'+(a[0]?'<img src="assets/img/v2/'+a[0]+'.jpg" alt="">':'<i>'+a[1].replace(/^(Dr|Prof\.|Er\.)\s+/,'').split(' ').map(function(w){return w.charAt(0)}).join('').slice(0,2)+'</i>')+'<div><b>'+a[1]+'</b><span>'+a[2]+'</span></div></div>'}).join('')+'</div></div>';
}
