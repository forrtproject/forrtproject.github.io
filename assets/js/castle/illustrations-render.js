/* Reproducible orthographic illustrations. No motion, controls or page dependencies. */
import * as T from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
const colors={bark:'#8a5a36',leaf:'#2f9e5f',leaf2:'#47b56e',leaf3:'#1f8650',pink:'#e58a9a',lead:'#38404a',wood:'#c98f55',board:'#27594f',chalk:'#f4f1e5',red:'#d8402f',orange:'#ee8a26',yellow:'#efc23a',grass:'#2f9e5f',azure:'#2a6fc4',purple:'#7a4fb0',teal:'#2a8c84',navy:'#1f3a6e',slate:'#637078',blue:'#3156a4',ochre:'#d59b42',green:'#527869',rose:'#b97176',cream:'#f4f1e5',paper:'#f9f7ee',edge:'#d8d7cb',ink:'#a6adb0'};
const mats=Object.fromEntries(Object.entries(colors).map(([k,c])=>[k,new T.MeshStandardMaterial({color:c,roughness:.32,metalness:0})]));
const scene=new T.Scene();
const renderer=new T.WebGLRenderer({canvas:document.querySelector('canvas'),alpha:true,antialias:true,preserveDrawingBuffer:true});renderer.setSize(1200,800);renderer.setPixelRatio(2);renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.05;renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFSoftShadowMap;
scene.add(new T.HemisphereLight(0xffffff,0x8b8379,1.75));
const key=new T.DirectionalLight(0xfffbf6,3.5);key.position.set(-3,11,6);key.castShadow=true;key.shadow.mapSize.set(4096,4096);Object.assign(key.shadow.camera,{left:-8,right:8,top:8,bottom:-8,near:.1,far:25});key.shadow.normalBias=.009;key.shadow.bias=-.00005;key.shadow.radius=4;scene.add(key);
for(const [color,intensity,pos] of [[0xf3f7ff,1.25,[6,4,-2]],[0xffffff,1.2,[-3,5,-5]]]){const light=new T.DirectionalLight(color,intensity);light.position.set(...pos);scene.add(light);}
const ground=new T.Mesh(new T.PlaneGeometry(30,30),new T.ShadowMaterial({opacity:.18}));ground.rotation.x=-Math.PI/2;ground.position.y=-.015;ground.receiveShadow=true;scene.add(ground);
const model=new T.Group();scene.add(model);
function box(parent,w,h,d,mat,x=0,y=0,z=0,r=.035){const m=new T.Mesh(new RoundedBoxGeometry(w,h,d,3,Math.min(r,h/3,w/3,d/3)),mats[mat]);m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m;}
function cylinder(parent,r,h,mat,x,y,z){const m=new T.Mesh(new T.CylinderGeometry(r,r,h,40,1),mats[mat]);m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m;}
function brick(parent,nx,nz,mat,x,y,z,rotation=0,height=.31){const g=new T.Group();g.position.set(x,y,z);g.rotation.y=rotation;parent.add(g);const unit=.42;box(g,nx*unit-.02,height,nz*unit-.02,mat,0,height/2,0,.035);for(let ix=0;ix<nx;ix++)for(let iz=0;iz<nz;iz++)cylinder(g,.126,.075,mat,(ix-(nx-1)/2)*unit,height+.035,(iz-(nz-1)/2)*unit);return g;}

// The rest of this renderer defines the six candidate builds. Positive Z faces the viewer.
Object.entries({
  stone:'#67757a', limestone:'#a6aca2', spruce:'#176b56', mint:'#40a578',
  deep:'#244f78', sky:'#538ca7', plum:'#85486b', rust:'#bd5538',
  honey:'#dc9a33', brass:'#a96b27', binding:'#284f4a', clay:'#985741',
  hair:'#483934', tan:'#bc8055', umber:'#824a31', peach:'#ecc396',
  sea:'#3e948f', ivory:'#e9dcc2'
}).forEach(([name,color])=>mats[name]=new T.MeshStandardMaterial({color,roughness:.39}));
function group(parent,x=0,y=0,z=0) {
  const g=new T.Group(); g.position.set(x,y,z); parent.add(g); return g;
}
function solid(parent,geometry,material,x=0,y=0,z=0) {
  const m=new T.Mesh(geometry,mats[material]);
  m.position.set(x,y,z); m.castShadow=m.receiveShadow=true;parent.add(m);return m;
}
function section(parent,coords,depth,material,x=0,y=0,z=0,bevel=.018) {
  const shape=new T.Shape();coords.forEach(([a,b],i)=>i?shape.lineTo(a,b):shape.moveTo(a,b));shape.closePath();
  const geo=new T.ExtrudeGeometry(shape,{depth,bevelEnabled:true,bevelSegments:2,
    bevelSize:bevel,bevelThickness:bevel,curveSegments:12});
  return solid(parent,geo,material,x,y,z-depth/2);
}
function bar(parent,from,to,r,material){
  const a=new T.Vector3(...from), b=new T.Vector3(...to),delta=b.clone().sub(a);
  const tube=solid(parent,new T.CylinderGeometry(r,r,delta.length(),32),material);
  tube.position.copy(a).lerp(b,.5);tube.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),delta.normalize());return tube;
}
// Individually moulded voussoirs leave real air in the opening and readable radial seams.
function arch(parent,cx,spring,inner,outer,depth,z,choices,segments,keystone){
  for(let i=0;i<segments;i++){
    const start=Math.PI*i/segments+.009,end=Math.PI*(i+1)/segments-.009;
    const key=i===Math.floor(segments/2);
    const coords=[];
    for(const [r,reverse] of [[inner,false],[outer+(key?.065:0),true]]){
      for(let j=0;j<=6;j++){
        const a=start+(end-start)*(reverse?6-j:j)/6;coords.push([Math.cos(a)*r,Math.sin(a)*r]);
      }
    }
    section(parent,coords,depth+(key?.035:0),key?keystone:choices[i%choices.length],cx,spring,z,.011);
  }
}
function popup(){
  const g=group(model);g.rotation.y=.21;
  // A curved page block on each side of a clothbound spine.
  for(const side of [-1,1]){
    const page=(x,y)=>[side*x,y];
    section(g,[page(.03,.04),page(2.65,.04),page(2.65,.19),page(.03,.19)],2.95,'spruce');
    for(let l=0;l<3;l++){
      const top=[[.03,.33],[.27,.46],[.60,.53],[1.15,.55],[1.73,.51],[2.50,.40]];
      const coords=top.map(([x,y])=>page(x,y+l*.072));
      coords.push(...top.slice().reverse().map(([x,y])=>page(x, l===0?.19:y+(l-1)*.072+.011)));
      section(g,coords,2.78-l*.024,l===1?'ivory':'paper',0,0,0,.008);
    }
  }
  // Short rules follow the curved page surface at the front of the spread.
  const pageTop=[[.03,.474],[.27,.604],[.60,.674],[1.15,.694],[1.73,.654],[2.50,.544]];
  for(const side of [-1,1]){
    for(const [row,start,end] of [[0,.48,2.09],[1,.48,1.85],[2,.48,1.61]]){
      const ribbon=[];
      for(let i=1;i<pageTop.length;i++){
        const [ax,ay]=pageTop[i-1],[bx,by]=pageTop[i];
        const left=Math.max(ax,start),right=Math.min(bx,end);
        if(right<=left)continue;
        const h=x=>ay+(x-ax)*(by-ay)/(bx-ax)+.011;
        ribbon.push([side*left,h(left)],[side*right,h(right)]);
      }
      const points=[...ribbon,...ribbon.slice().reverse().map(([x,y])=>[x,y-.011])];
      section(g,points,.044,row===0?'green':'ink',0,0,.47+row*.205,.002);
    }
  }
  box(g,.2,.20,2.96,'binding',0,.13,0,.065);
  // The ribbon crosses the fore-edge where it remains visible in the small plate.
  box(g,.24,.025,1.03,'rust',.92,.696,1.02,.005);
  const tail=section(g,[[-.12,0],[.12,0],[.12,-.46],[0,-.36],[-.12,-.46]],.035,'rust',.92,.70,1.42,.004);
  tail.rotation.x=-.08;
  const gate=group(g,0,.64,-.40);
  for(const side of [-1,1]){
    const x=side*.98;
    for(let j=0;j<5;j++){
      if(j%2===0)brick(gate,2,2,'spruce',x,j*.30,0,0,.30);
      else for(const k of [-1,1])brick(gate,1,2,'spruce',x+k*.21,j*.30,0,0,.30);
    }
    brick(gate,2,2,'mint',x,1.50,0,0,.16);
    const roof=solid(gate,new T.ConeGeometry(.69,.82,4), 'spruce',x,2.07,0);
    roof.rotation.y=Math.PI/4;
    cylinder(gate,.057,.39,'brass',x,2.63,0);
    section(gate,[[0,0],[.44,-.065],[.32,-.14],[.44,-.24],[0,-.19]],.038,'honey',x,2.82,0,.005);
  }
  arch(g,0,1.40,.57,.86,.60,-.40,['mint','spruce','mint'],7,'honey');
}
function abacus(){
  const g=group(model);g.rotation.y=.26;
  for(const side of [-1,1]){
    const x=side*1.92;brick(g,2,4,'spruce',x,0,0,0,.26);
    for(let l=0;l<8;l++)brick(g,1,2,l===0||l===7?'binding':'spruce',x,.26+.35*l,0,0,.35);
  }
  brick(g,10,2,'spruce',0,3.06,0,0,.32);
  box(g,3.74,.20,.49,'binding',0,.41,0);
  const rods=[[.97,'honey',2],[1.68,'rust',4],[2.39,'sea',3]];
  for(const [y,color,left] of rods){
    bar(g,[-1.88,y,0],[1.88,y,0],.065,'ivory');
    for(let i=0;i<6;i++){
      const x=i<left?-1.52+i*.42:1.52-(5-i)*.42;
      const bead=solid(g,new T.LatheGeometry([[0,-.18],[.18,-.18],[.28,-.12],[.30,-.05],[.30,.05],[.28,.12],[.18,.18],[0,.18]].map(p=>new T.Vector2(...p)),32),color,x,y,0);
      bead.rotation.z=Math.PI/2;
    }
  }
}
function microscope(){
  const g=group(model);g.rotation.y=.13;
  // The optical axis passes through the orange specimen and the centre of the stage.
  brick(g,6,4,'deep',0,0,0,0,.26);
  brick(g,5,3,'sky',-.15,.26,-.08,0,.22);
  const arm=[[-1.02,.47],[-.52,.47],[-.47,1.12],[-.58,1.58],[-.79,2.05],[-.80,2.37],[-.64,2.63],[-.28,2.83],[-.19,2.84],[-.18,3.19],[-.42,3.24],[-.92,3.05],[-1.23,2.69],[-1.32,2.24],[-1.27,1.95],[-.98,1.38]];
  // Slice the moulded support into four contiguous brick courses.
  function clip(poly,height,above){
    const out=[];
    for(let i=0;i<poly.length;i++){
      const a=poly[i],b=poly[(i+1)%poly.length];
      const inA=above?a[1]>=height:a[1]<=height,inB=above?b[1]>=height:b[1]<=height;
      if(inA)out.push(a);
      if(inA!==inB)out.push([a[0]+(height-a[1])*(b[0]-a[0])/(b[1]-a[1]),height]);
    }
    return out;
  }
  const limits=[.46,1.35,1.89,2.55,3.26];
  for(let i=0;i<limits.length-1;i++){
    const piece=clip(clip(arm,limits[i]+.009,true),limits[i+1]-.009,false);
    section(g,piece,.49,'deep',0,0,-.055,.008);
  }
  brick(g,5,3,'lead',.02,1.15,.02,0,.17);
  box(g,1.13,.075,.55,'paper',.29,1.36,.09,.025);
  brick(g,1,1,'orange',.27,1.41,.06,0,.15);
  const tube=group(g,.26,2.04,.06);tube.rotation.z=.31;
  cylinder(tube,.14,.24,'lead',0,.12,0);
  cylinder(tube,.22,.28,'limestone',0,.36,0);
  cylinder(tube,.34,1.03,'sky',0,1.015,0);
  cylinder(tube,.36,.12,'deep',0,1.57,0);
  cylinder(tube,.20,.41,'lead',0,1.81,0);
  cylinder(tube,.285,.14,'deep',0,2.07,0);
  cylinder(tube,.205,.008,'lead',0,2.143,0);
  bar(g,[-1.015,2.19,.16],[-1.015,2.19,.27],.18,'lead');
  bar(g,[-1.015,2.19,.25],[-1.015,2.19,.39],.265,'honey');
  bar(g,[-1.015,2.19,.38],[-1.015,2.19,.402],.14,'brass');
}
function notebook(){
  const g=group(model);g.rotation.y=.24;
  // A hinged field notebook. Matching plots are printed as raised coloured tiles.
  for(const side of [-1,1]){
    const p=group(g,0,.075,0);p.rotation.y=side*-.24;
    const x=side*1.13;
    box(p,2.26,2.57,.24,'deep',x,1.28,0,.08);
    box(p,2.12,2.43,.16,'ivory',x,1.28,.145,.046);
    box(p,2.04,2.36,.065,'paper',x,1.30,.245,.042);
    const origin=x-.75;
    box(p,1.59,.07,.06,'slate',origin+.74,.63,.30,.012);
    box(p,.066,1.28,.06,'slate',origin,1.23,.30,.012);
    for(const [i,levels] of [2,4,3].entries()){
      for(let level=0;level<levels;level++){
        const height=.29;
        box(p,.34,height-.01,.13,i===1?'honey':'deep',origin+.31+i*.48,.67+(level+.5)*height,.338,.014);
        if(level===levels-1)cylinder(p,.076,.052,i===1?'honey':'deep',origin+.31+i*.48,.67+levels*height+.021,.338);
      }
    }
    // A stepped index tab provides a handful of exposed studs along the top edge.
    brick(p,2,1,side<0?'sky':'honey',x+side*.58,2.55,-.008,0,.105);
  }
  for(const y of [.40,1.21,2.02])cylinder(g,.17,.51,'sky',0,y,.12);
  g.rotation.x=-.12;
}
function figure(parent,x,y,z,yaw,shirt,skin,pose){
  const g=group(parent,x,y,z);g.rotation.y=yaw;
  for(const side of [-1,1]) {
    box(g,.21,.42,.35,'lead',side*.125,.21,.02,.028);
    box(g,.235,.15,.41,'lead',side*.125,.077,.045,.02);
  }
  section(g,[[-.24,.40],[.24,.40],[.31,.82],[.22,.90],[-.22,.90],[-.31,.82]],.36,shirt);
  for(const side of [-1,1]){
    const start=[side*.26,.78,.015],bend=[side*.37,.60,.08];
    const end=pose==='carry'?[side*.29,.64,.32]:[side*.39,.49,.11];
    bar(g,start,bend,.105,shirt);
    bar(g,bend,end,.10,shirt);
    solid(g,new T.SphereGeometry(.11,20,16),skin,...end);
  }
  cylinder(g,.125,.11,skin,0,.94,0);
  const head=solid(g,new T.LatheGeometry([[0,0],[.15,0],[.195,.038],[.207,.09],[.207,.287],[.187,.335],[.15,.35],[0,.35]].map(p=>new T.Vector2(...p)),32),skin,0,.97,0);
  cylinder(g,.099,.061,skin,0,1.346,0);
  return g;
}
function bridge(){
  const g=group(model);g.rotation.y=.26;
  const depth=1.23,rad=1.41,spring=.43,deck=1.97;
  const colors=['clay','spruce','sky','ochre','slate','rust','sea'];
  arch(g,0,spring,1.02,rad,depth,0,colors,9,'honey');
  for(const s of [-1,1]){
    for(let j=0;j<2;j++)brick(g,3,3,j?'clay':'slate',s*1.65,j*.215,0,0,.215);
    // Fit the spandrel masonry to the outer curve. Every joint stays visible.
    for(let row=0;row<5;row++){
      const y=spring+row*.304;
      const intervals=row%2?[[0,.56],[.56,1.27],[1.27,1.89],[1.89,2.27]]:[[0,.85],[.85,1.54],[1.54,2.27]];
      for(const [a,b] of intervals){
        const points=[];
        for(let i=0;i<=14;i++){
          const h=y+.014+i*.278/14,boundary=Math.sqrt(Math.max(0,(rad+.035)**2-(h-spring)**2));
          if(boundary<b-.012)points.push([s*Math.max(a+.012,boundary),h]);
        }
        if(points.length>1) section(g,[...points,[s*(b-.012),points[points.length-1][1]],[s*(b-.012),points[0][1]]],depth-.13,row%2?'ivory':'limestone',0,0,0,.005);
      }
    }
  }
  // The bridge deck is a continuous run of interlocking plates.
  for(const [i,n] of [3,2,2,2,2].entries()){
    const first=[-5.5,-2.5,-.5,1.5,3.5][i];
    brick(g,n,3,'clay',(first+n/2)*.42,deck,0,0,.16);
  }
  const fy=deck+.23;
  figure(g,-.58,fy,0,1.18,'spruce','umber','carry');
  figure(g,.59,fy,-.01,-1.12,'deep','peach','carry');
  brick(g,2,1,'honey',0,fy+.64,.11,0,.24);
}
function table(){
  const g=group(model);g.rotation.y=.28;
  function chair(x,z,yaw,shirt,skin){
    const sitter=figure(g,x,0,z,yaw,shirt,skin,'carry');
    sitter.scale.setScalar(1.39);
  }
  chair(-1.29,-.12,1.05,'rust','tan');
  chair(.07,-1.05,.05,'deep','peach');
  chair(1.32,-.12,-1.15,'spruce','umber');
  for(const [x,z] of [[-.65,-.39],[.65,-.39],[-.65,.48],[.65,.48]])
    brick(g,1,1,'brass',x,0,z,0,.83);
  // These staggered planks make an oval table with a brick-built perimeter.
  for(const [i,n] of [3,5,5,5,3].entries()){
    const z=(i-2)*.42;
    box(g,n*.42-.012,.19,.411,'honey',0,.92,z,.048);
  }
  for(const [x,z,r] of [[-.55,.0,-.16],[.36,-.24,.18]]){
    const notes=group(g,x,1.023,z);notes.rotation.y=r;
    box(notes,.60,.045,.44,'paper',0,0,0,.02);
  }
  brick(g,2,1,'sea',.38,1.025,.34,0,.13);
  // A fourth stool faces the open place at the table.
  for(const x of [-.26,.26])box(g,.12,.43,.46,'brass',x,.215,1.48);
  brick(g,2,2,'rust',0,.43,1.48,0,.12);
}
const kinds={popup,abacus,microscope,notebook,bridge,table};
const kind=new URLSearchParams(location.search).get('kind');
if(!kinds[kind])throw new Error('Unknown illustration '+kind);
kinds[kind]();
const bounds=new T.Box3().setFromObject(model),center=bounds.getCenter(new T.Vector3());
const camera=new T.OrthographicCamera(-5,5,3.333,-3.333,.1,45);
camera.position.copy(center).add(new T.Vector3(7.4,6.4,10.2));camera.lookAt(center);camera.updateMatrixWorld();
// Fit both actual surfaces and their ground shadows, so no shadow ends at a canvas edge.
model.updateMatrixWorld(true);
const projected=new T.Box2(),world=new T.Vector3(),view=new T.Vector3();
function include(point){view.copy(point).applyMatrix4(camera.matrixWorldInverse);projected.expandByPoint(new T.Vector2(view.x,view.y));}
model.traverse(m=>{
  if(!m.isMesh)return;
  const pos=m.geometry.attributes.position;
  for(let i=0;i<pos.count;i++){
    world.fromBufferAttribute(pos,i).applyMatrix4(m.matrixWorld);include(world);
    const distance=(world.y-ground.position.y)/key.position.y;
    world.addScaledVector(key.position,-distance);include(world);
  }
});
const middle=projected.getCenter(new T.Vector2()),size=projected.getSize(new T.Vector2());
const half=Math.max(size.y/2/.88,size.x/3/.92);
camera.left=middle.x-half*1.5;camera.right=middle.x+half*1.5;
camera.top=middle.y+half;camera.bottom=middle.y-half;camera.updateProjectionMatrix();
renderer.render(scene,camera);window.renderReady=kind;
