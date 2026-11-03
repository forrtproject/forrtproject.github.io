/* Offline only: generate deterministic, physically settled brick pile poses.
   Dependencies: three@0.186.0, cannon-es@0.20.0, esbuild@0.28.2.
   Bundle this script for Node using the same temporary NODE_PATH as README.md:
   esbuild assets/js/castle/bake-castle-piles.js --bundle --platform=node --format=cjs --outfile=/tmp/bake-castle-piles.cjs
   node /tmp/bake-castle-piles.cjs assets/js/castle/castle-piles.js
   This solver is never included in the site's browser bundle. */
import * as C from 'cannon-es';
import * as T from 'three';
import fs from 'node:fs';
import { createBrickCastle } from './castle-geometry.js';
const parts=[...createBrickCastle().assemblyParts].sort((a, b) => a.order - b.order).map(({object},index)=>{object.position.set(0,0,0);object.quaternion.identity();const bounds=new T.Box3().setFromObject(object); return {object,index,bounds};});
let seed=12512; function rand(){seed=(1664525*seed+1013904223)>>>0;return seed/4294967296;}
const world=new C.World({gravity:new C.Vec3(0,-9.81,0)});
world.solver.iterations=30;world.solver.tolerance=1e-8;
world.defaultContactMaterial.friction=.65;world.defaultContactMaterial.restitution=.025;
world.defaultContactMaterial.contactEquationStiffness=1e8;
world.defaultContactMaterial.contactEquationRelaxation=4;
const floor=new C.Body({mass:0});floor.addShape(new C.Plane());floor.quaternion.setFromEuler(-Math.PI/2,0,0);floor.position.y=-.035;world.addBody(floor);
const poses=[],bounds=new T.Box3();
const resting=[];
for(const part of [...parts].reverse()){
 const size=part.bounds.getSize(new T.Vector3()),center=part.bounds.getCenter(new T.Vector3());
 const studs=!/lintel|ledge/.test(part.object.name)&&size.x>.18;
 const bodyHeight=size.y-(studs?.055:0);
 const bodyCenter=new C.Vec3(center.x,center.y-(studs?.0275:0),center.z);
 const brick=new C.Body({mass:Math.max(.015,size.x*bodyHeight*size.z*5),linearDamping:.24,angularDamping:.4});
 brick.addShape(new C.Box(new C.Vec3(size.x/2,bodyHeight/2,size.z/2)),bodyCenter);
 if(studs){
  const cols=Math.max(1,Math.floor((size.x+.014-.18)/.30)+1),rows=Math.max(1,Math.floor((size.z+.014-.18)/.30)+1);
  for(let i=0;i<cols;i++)for(let j=0;j<rows;j++){
   const x=(i-(cols-1)/2)*.30,z=(j-(rows-1)/2)*.30;
   if(Math.abs(x)+.09<(size.x+.014)/2 && Math.abs(z)+.09<(size.z+.014)/2)
    brick.addShape(new C.Cylinder(.079,.086,.053,12),new C.Vec3(x,part.bounds.max.y-.0275,z));
  }
 }
 const side=part.index%2?1:-1;
 let good=false,finalBox;
 for(let attempt=0;attempt<30&&!good;attempt++){
  const x=side*(2.63+(rand()-.5)*.48),z=(rand()-.5)*1.55+.05;
  let top=0;for(const placed of resting)if(Math.abs(placed.x-x)<.65&&Math.abs(placed.z-z)<.65)top=Math.max(top,placed.top);
  brick.position.set(x,top+.6+size.y,z);brick.quaternion.setFromEuler((rand()-.5)*.65,rand()*Math.PI*2,(rand()-.5)*.65);
  brick.velocity.set(0,0,0);brick.angularVelocity.set(0,0,0);brick.force.set(0,0,0);brick.torque.set(0,0,0);
  world.addBody(brick);
  for(let i=0;i<720;i++)world.step(1/120);
  const q=new T.Quaternion(brick.quaternion.x,brick.quaternion.y,brick.quaternion.z,brick.quaternion.w);
  part.object.position.set(brick.position.x,brick.position.y,brick.position.z);part.object.quaternion.copy(q);finalBox=new T.Box3().setFromObject(part.object);
  good=(side===1?finalBox.min.x>1.835:finalBox.max.x< -1.835)&&Math.max(Math.abs(finalBox.min.x),Math.abs(finalBox.max.x))<3.6&&finalBox.max.z<1.85&&finalBox.min.z>-1.85&&finalBox.max.y<1.8&&brick.velocity.length()<.035&&brick.angularVelocity.length()<.1;
  if(!good)world.removeBody(brick);
 }
 if(!good)throw new Error('Could not place '+part.index);
 brick.mass=0;brick.type=C.Body.STATIC;brick.updateMassProperties();brick.velocity.set(0,0,0);brick.angularVelocity.set(0,0,0);
 const position=part.object.position.toArray(),quat=part.object.quaternion.toArray();
 poses[part.index]=[...position,...quat].map(n=>+n.toFixed(6));
 bounds.union(finalBox);resting.push({x:position[0],z:position[2],top:finalBox.max.y});
 
}
const header=`import { Vector3, Quaternion } from 'three';\n\n// Rigid-body settled poses, deposited from highest castle index to lowest.\n// The offline bake uses each brick's dimensions and stud colliders; earlier\n// deposits become fixed supports so removing later deposits cannot suspend them.\n// No physics engine is shipped to the browser. Floor y = -.035.\nconst SETTLED_POSES = ${JSON.stringify(poses,null,2)};\n\nexport function arrangeBrickPiles(parts) {\n  if (parts.length !== SETTLED_POSES.length) throw new Error('Brick pile poses must be rebaked after changing the castle geometry.');\n  for (const part of parts) {\n    const pose = SETTLED_POSES[part.index];\n    part.staging = new Vector3(...pose.slice(0, 3));\n    part.stagedQuaternion = new Quaternion(...pose.slice(3));\n  }\n  return parts;\n}\n`;
fs.writeFileSync(process.argv[2] || 'assets/js/castle/castle-piles.js', header);
// Precise vertices exclude empty corners of rotated geometry bounding boxes.
const actualBounds = new T.Box3();
for (const part of parts) actualBounds.union(new T.Box3().setFromObject(part.object, true));
console.log(JSON.stringify({pieces: poses.length, min: actualBounds.min.toArray(), max: actualBounds.max.toArray()}, null, 2));
