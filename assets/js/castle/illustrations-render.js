/* Reproducible orthographic illustrations. No motion, controls or page dependencies. */
import * as T from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
const colors={bark:'#8a5a36',leaf:'#2f9e5f',leaf2:'#47b56e',leaf3:'#1f8650',pink:'#e58a9a',lead:'#38404a',wood:'#c98f55',board:'#27594f',chalk:'#f4f1e5',red:'#d8402f',orange:'#ee8a26',yellow:'#efc23a',grass:'#2f9e5f',azure:'#2a6fc4',purple:'#7a4fb0',teal:'#2a8c84',navy:'#1f3a6e',slate:'#637078',blue:'#3156a4',ochre:'#d59b42',green:'#527869',rose:'#b97176',cream:'#f4f1e5',paper:'#f9f7ee',edge:'#d8d7cb',ink:'#a6adb0'};
const mats=Object.fromEntries(Object.entries(colors).map(([k,c])=>[k,new T.MeshStandardMaterial({color:c,roughness:.32,metalness:0})]));
const scene=new T.Scene();
const renderer=new T.WebGLRenderer({canvas:document.querySelector('canvas'),alpha:true,antialias:true,preserveDrawingBuffer:true});renderer.setSize(1200,800);renderer.setPixelRatio(2);renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.05;renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFSoftShadowMap;
scene.add(new T.HemisphereLight(0xffffff,0x8b8379,1.75));
const key=new T.DirectionalLight(0xfffbf6,3.5);key.position.set(-4.5,8,7);key.castShadow=true;key.shadow.mapSize.set(4096,4096);Object.assign(key.shadow.camera,{left:-8,right:8,top:8,bottom:-8,near:.1,far:25});key.shadow.normalBias=.009;key.shadow.bias=-.00005;key.shadow.radius=4;scene.add(key);
for(const [color,intensity,pos] of [[0xf3f7ff,1.25,[6,4,-2]],[0xffffff,1.2,[-3,5,-5]]]){const light=new T.DirectionalLight(color,intensity);light.position.set(...pos);scene.add(light);}
const ground=new T.Mesh(new T.PlaneGeometry(30,30),new T.ShadowMaterial({opacity:.15}));ground.rotation.x=-Math.PI/2;ground.position.y=-.015;ground.receiveShadow=true;scene.add(ground);
const model=new T.Group();scene.add(model);
function box(parent,w,h,d,mat,x=0,y=0,z=0,r=.035){const m=new T.Mesh(new RoundedBoxGeometry(w,h,d,3,Math.min(r,h/3,w/3,d/3)),mats[mat]);m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m;}
function cylinder(parent,r,h,mat,x,y,z){const m=new T.Mesh(new T.CylinderGeometry(r,r,h,40,1),mats[mat]);m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m;}
function brick(parent,nx,nz,mat,x,y,z,rotation=0,height=.31){const g=new T.Group();g.position.set(x,y,z);g.rotation.y=rotation;parent.add(g);const unit=.42;box(g,nx*unit-.02,height,nz*unit-.02,mat,0,height/2,0,.035);for(let ix=0;ix<nx;ix++)for(let iz=0;iz<nz;iz++)cylinder(g,.126,.075,mat,(ix-(nx-1)/2)*unit,height+.035,(iz-(nz-1)/2)*unit);return g;}

// Saturated counterparts to the Pride tower: tall, solid objects that fill an arched window.
function book(y,w,d,h,cover,x,rot){
  const g=new T.Group();g.position.set(x,y,0);g.rotation.y=rot;model.add(g);
  box(g,w,.07,d,cover,0,.035,0,.03);box(g,w,.07,d,cover,0,h-.035,0,.03);box(g,.1,h,d,cover,-w/2+.05,h/2,0,.04);
  box(g,w-.16,h-.14,d-.12,'paper',.04,h/2,0,.015);
  for(let n=1;n<5;n++)box(g,.006,h-.17,d-.1,'edge',w/2-.1,h/2,0,.002),box(g,w-.16,.006,.006,'edge',.04,.07+n*(h-.14)/5,d/2-.06,.002);
  box(g,.1,h*.5,.012,'yellow',-w/2+.05,h/2,d/2+.002,.003);
}
function education(){
  const stack=[[3.2,2.3,.56,'grass',-.04],[2.9,2.15,.46,'azure',.09],[3.0,2.1,.52,'red',-.1],[2.6,1.95,.42,'yellow',.06],[2.5,1.85,.5,'teal',-.05]];
  let y=0;for(const [w,d,h,c,r] of stack){book(y,w,d,h,c,(r>0?.08:-.06),r);y+=h;}
  // An open book resting on top, pages up.
  const top=new T.Group();top.position.set(0,y,0);top.rotation.y=-.08;model.add(top);
  for(const side of [-1,1]){const leaf=new T.Group();leaf.position.set(side*.88,.1,0);leaf.rotation.z=side*.12;top.add(leaf);
    box(leaf,1.78,.07,1.75,'navy',0,-.03,0,.03);box(leaf,1.66,.15,1.63,'paper',0,.07,0,.02);
    for(let r=0;r<5;r++)box(leaf,1.05,.008,.03,'ink',0,.15,-.5+r*.25,.003);}
  brick(model,2,2,'orange',2.55,0,.85,-.2);brick(model,2,2,'yellow',2.55,.31,.85,-.2);brick(model,1,2,'grass',-2.35,0,1.0,.16);
}
function towerPair(x,swap){
  const g=new T.Group();g.position.x=x;model.add(g);
  const bands=['navy','navy','azure','azure','teal','azure','navy'];
  bands.forEach((c,level)=>{for(let a=0;a<2;a++)for(let b=0;b<2;b++){const odd=level%2?.21:0;
    const col=(swap&&level===3&&a===1&&b===1)?'orange':c;brick(g,2,2,col,(a-.5)*.84,level*.31,(b-.5)*.84);}});
  brick(g,1,1,'yellow',0,bands.length*.31,0,0,.2);
}
function research(){
  towerPair(-1.25,false);towerPair(1.25,true);
  // A magnifying glass held up to the second structure.
  const lens=new T.Group();lens.position.set(.72,1.16,1.55);lens.rotation.set(-.2,.55,.0);model.add(lens);
  const ring=new T.Mesh(new T.TorusGeometry(.72,.09,24,64),mats.red);ring.castShadow=true;lens.add(ring);
  const glass=new T.Mesh(new T.CircleGeometry(.68,64),new T.MeshStandardMaterial({color:'#dff1fb',transparent:true,opacity:.3,roughness:.1,side:T.DoubleSide}));lens.add(glass);
  const handle=new T.Mesh(new T.CylinderGeometry(.09,.09,1.05,24),mats.navy);handle.position.set(.72*.7+.37,-.72*.7-.37,0);handle.rotation.z=Math.PI/4;handle.castShadow=true;lens.add(handle);
  brick(model,2,2,'orange',-2.6,0,1.3,.2);brick(model,1,2,'yellow',2.75,0,1.0,-.16);
}
function person(x,z,a,c,scale=1){
  const g=new T.Group();g.position.set(x,0,z);g.rotation.y=a;g.scale.setScalar(scale);model.add(g);
  brick(g,2,1,c,0,0,0,0,.42);brick(g,2,1,c,0,.42,0,0,.42);
  box(g,.3,.1,.2,'cream',0,.89,0,.03);
  const head=new T.Mesh(new T.CylinderGeometry(.24,.24,.36,32),mats.yellow);head.position.set(0,1.11,0);head.castShadow=true;g.add(head);
  cylinder(g,.11,.09,'yellow',0,1.33,0);
}
function community(){
  // People gathered in a circle, with a space left open and someone arriving.
  const r=1.9,n=11,cols=['red','azure','grass','orange','purple','teal','yellow','azure','red','grass','purple'];
  for(let i=0;i<n;i++){if(i===1||i===2)continue;const a=i/n*Math.PI*2;person(Math.sin(a)*r,Math.cos(a)*r,a,cols[i]);}
  const a=1.5/n*Math.PI*2;person(Math.sin(a)*(r+1.25),Math.cos(a)*(r+1.25),a+Math.PI*.1,'orange');
  brick(model,4,4,'slate',0,0,0,.2,.2);brick(model,2,2,'cream',0,.2,0,.2,.2);
}

function eduTree(){
  // A tree growing out of an open book: growth from learning.
  for(const side of [-1,1]){brick(model,4,6,'azure',side*.86,0,0,0,.2);for(let k=0;k<2;k++)brick(model,4-k,6,'cream',side*(.86-k*.21),.2+k*.2,0,0,.2);}
  for(let l=0;l<7;l++)brick(model,2,2,'bark',0,.6+l*.31,0);
  const y=2.77,c=['leaf','leaf2','leaf3'];
  const layer=(n,l)=>{for(let a=0;a<n;a++)for(let b=0;b<n;b++)brick(model,2,2,c[(a*2+b+l)%3],(a-(n-1)/2)*.84,y+l*.31,(b-(n-1)/2)*.84);};
  layer(3,-1);layer(4,0);layer(4,1);layer(3,2);layer(2,3);
  for(const [col,x,l,z] of [['red',1.72,1,.75],['yellow',-.75,1,1.72],['red',.9,0,1.72],['yellow',1.72,0,-.6],['red',-.2,2,1.3]])brick(model,1,1,col,x,y+l*.31,z,0,.24);
}
function eduCap(){
  // A mortarboard on a stack of two brick books.
  let y=0;
  for(const [c,nx,nz] of [['azure',7,5],['red',6,5]]){brick(model,nx,nz,c,0,y,0,0,.24);brick(model,nx-1,nz,'cream',.1,y+.24,0,0,.14);brick(model,nx,nz,c,0,y+.38,0,0,.14);y+=.52;}
  for(let l=0;l<3;l++)brick(model,3,3,'navy',0,y+l*.31,0,Math.PI/4);
  y+=.93;const board=new T.Group();board.position.y=y;board.rotation.y=Math.PI/4;model.add(board);
  brick(board,6,6,'navy',0,0,0,0,.16);brick(board,1,1,'yellow',0,.16,0,0,.1);
  box(board,1.2,.05,.06,'yellow',.62,.235,0,.02);
  box(board,.07,1.0,.07,'yellow',1.22,-.27,0,.02);
  box(board,.22,.36,.22,'orange',1.22,-.92,0,.05);
}
function eduBook(){
  // A big open book built entirely of bricks, with pages stepping up from the spine.
  for(const side of [-1,1]){
    brick(model,7,8,'azure',side*1.5,0,0,0,.2);
    const steps=[[6,.2],[5,.42],[4,.64]];
    for(const [n,y] of steps)brick(model,n,7,'cream',side*(.3+n*.21),y,0,0,.22);
  }
  brick(model,1,8,'navy',0,0,0,0,.34);
  box(model,.2,.03,1.3,'red',.5,.87,1.2,.01);
  brick(model,2,2,'yellow',-1.65,.86,-.3,.18);brick(model,2,1,'grass',-1.55,1.17,-.3,.18);brick(model,2,2,'orange',1.7,.86,-.5,-.2);
}
function eduBoard(){
  // A classroom board on an easel: teaching, in bricks.
  const g=new T.Group();g.rotation.y=-.1;model.add(g);
  box(g,3.9,2.5,.16,'wood',0,2.25,0,.05);box(g,3.5,2.1,.18,'board',0,2.25,.015,.02);
  for(const [w,x,y] of [[2.3,-.35,2.95],[1.7,-.65,2.62],[2.6,-.2,2.29]])box(g,w,.06,.03,'chalk',x,y,.11,.012);
  // A small chart drawn in chalk on the lower part of the board.
  for(const [i,h] of [[0,.3],[1,.5],[2,.7],[3,.95]])box(g,.22,h,.03,['yellow','chalk','orange','chalk'][i],.3+i*.34,1.28+h/2,.11,.012);
  for(const x of [-1.6,1.6]){box(g,.2,3.8,.2,'wood',x,1.9,.3,.05);}
  box(g,.2,3.7,.2,'wood',0,1.85,-.9,.05);
  box(g,3.7,.12,.5,'wood',0,.96,.3,.03);
  brick(g,2,1,'red',-1.1,1.02,.3,0,.18);brick(g,1,1,'yellow',-.3,1.02,.3,0,.18);brick(g,2,1,'azure',.5,1.02,.3,0,.18);
  brick(model,2,2,'orange',2.5,0,1.3,-.2);brick(model,2,2,'grass',-2.5,0,1.5,.16);
}
function eduPencil(){
  // A tall pencil standing on a brick book, echoing the proportions of the tower.
  const y0=.86;
  brick(model,8,6,'grass',0,0,0,0,.24);brick(model,7,6,'cream',.12,.24,0,0,.14);brick(model,7,6,'cream',.12,.38,0,0,.14);brick(model,8,6,'grass',0,.52,0,0,.14);
  box(model,.1,.66,2.5,'yellow',-1.62,.33,0,.02);
  const g=new T.Group();g.position.set(0,y0-.2,0);model.add(g);
  const tip=new T.Mesh(new T.ConeGeometry(.6,.72,6),mats.wood);tip.rotation.x=Math.PI;tip.position.y=.36;tip.castShadow=true;g.add(tip);
  const lead=new T.Mesh(new T.ConeGeometry(.2,.24,6),mats.lead);lead.rotation.x=Math.PI;lead.position.y=.12;g.add(lead);
  for(let l=0;l<8;l++)brick(g,3,3,l%2?'orange':'yellow',0,.72+l*.31,0);
  brick(g,3,3,'cream',0,.72+8*.31,0,0,.2);brick(g,3,3,'pink',0,.72+8*.31+.2,0,0,.31);
}
const kind=new URLSearchParams(location.search).get('kind')||'education';({education,research,community,eduTree,eduCap,eduBook,eduBoard,eduPencil}[kind]||education)();
const bounds=new T.Box3().setFromObject(model);const center=bounds.getCenter(new T.Vector3());
const camera=new T.OrthographicCamera(-4.7,4.7,3.133,-3.133,.1,40);camera.position.copy(center).add(new T.Vector3(7.4,6.4,10.2));camera.lookAt(center);camera.updateMatrixWorld();
// Fit actual projected corners with comfortable margins, consistent camera direction.
let minX=Infinity,maxX=-Infinity,minY=Infinity,maxY=-Infinity;
for(const x of [bounds.min.x,bounds.max.x])for(const y of [bounds.min.y,bounds.max.y])for(const z of [bounds.min.z,bounds.max.z]){const v=new T.Vector3(x,y,z).applyMatrix4(camera.matrixWorldInverse);minX=Math.min(minX,v.x);maxX=Math.max(maxX,v.x);minY=Math.min(minY,v.y);maxY=Math.max(maxY,v.y);}
const halfH=Math.max((maxY-minY)/2/.78,(maxX-minX)/3/.80);camera.left=-halfH*1.5;camera.right=halfH*1.5;camera.top=halfH;camera.bottom=-halfH;camera.zoom=kind==='community'?1.24:kind==='research'?1.07:1;camera.updateProjectionMatrix();renderer.render(scene,camera);window.renderReady={kind,objects:model.children.length,bounds:bounds.getSize(new T.Vector3()).toArray()};
