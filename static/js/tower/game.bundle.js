(()=>{var Eu=0,Nc=1,Cu=2;var as=1,Ru=2,Hs=3,Oi=0,tn=1,oi=2,ai=0,Ws=1,Uc=2,Fc=3,Oc=4,Iu=5;var ls=100,Pu=101,Lu=102,Du=103,Nu=104,Uu=200,Fu=201,Ou=202,Bu=203,Bc=204,zc=205,zu=206,ku=207,Vu=208,Gu=209,Hu=210,Wu=211,Xu=212,qu=213,Yu=214,Yo=0,$o=1,Zo=2,Is=3,Jo=4,Ko=5,jo=6,Qo=7,kc=0,$u=1,Zu=2,Xn=0,Vc=1,Gc=2,Hc=3,Xr=4,Wc=5,Xc=6,qc=7;var Yc=300,Bi=301,cs=302,Na=303,Ua=304,qr=306,ta=1e3,Qn=1001,ea=1002,Je=1003,Ju=1004;var Yr=1005;var je=1006,Fa=1007;var zi=1008;var _n=1009,$c=1010,Zc=1011,Xs=1012,Oa=1013,qn=1014,Yn=1015,$n=1016,Ba=1017,za=1018,qs=1020,Jc=35902,Kc=35899,jc=1021,Qc=1022,Ln=1023,ti=1026,ki=1027,th=1028,ka=1029,Vi=1030,Va=1031;var Ga=1033,$r=33776,Zr=33777,Jr=33778,Kr=33779,Ha=35840,Wa=35841,Xa=35842,qa=35843,Ya=36196,$a=37492,Za=37496,Ja=37488,Ka=37489,jr=37490,ja=37491,Qa=37808,tl=37809,el=37810,nl=37811,il=37812,sl=37813,rl=37814,ol=37815,al=37816,ll=37817,cl=37818,hl=37819,ul=37820,dl=37821,fl=36492,pl=36494,ml=36495,gl=36283,xl=36284,Qr=36285,_l=36286;var br=2300,na=2301,Wo=2302,Mc=2303,Sc=2400,wc=2401,Tc=2402;var Ku=3200;var yl=0,ju=1,wi="",un="srgb",Mr="srgb-linear",Sr="linear",we="srgb";var Xo=7680,eh=7681;var nh=517;var vl=519,Qu=512,td=513,ed=514,bl=515,nd=516,id=517,Ml=518,sd=519,rd=35044;var ih="300 es",Hn=2e3,Ps=2001;function Tf(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Af(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function wr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function od(){let i=wr("canvas");return i.style.display="block",i}var $h={},Ls=null;function sh(...i){let t="THREE."+i.shift();Ls?Ls("log",t,...i):console.log(t,...i)}function ad(i){let t=i[0];if(typeof t=="string"&&t.startsWith("TSL:")){let e=i[1];e&&e.isStackTrace?i[0]+=" "+e.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function ne(...i){i=ad(i);let t="THREE."+i.shift();if(Ls)Ls("warn",t,...i);else{let e=i[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...i)}}function se(...i){i=ad(i);let t="THREE."+i.shift();if(Ls)Ls("error",t,...i);else{let e=i[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...i)}}function es(...i){let t=i.join(" ");t in $h||($h[t]=!0,ne(...i))}function ld(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}var cd={[Yo]:$o,[Zo]:jo,[Jo]:Qo,[Is]:Ko,[$o]:Yo,[jo]:Zo,[Qo]:Jo,[Ko]:Is},ei=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){let n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){let n=this._listeners;if(n===void 0)return;let s=n[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let n=e[t.type];if(n!==void 0){t.target=this;let s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}},sn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var qo=Math.PI/180,ia=180/Math.PI;function Ys(){let i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(sn[i&255]+sn[i>>8&255]+sn[i>>16&255]+sn[i>>24&255]+"-"+sn[t&255]+sn[t>>8&255]+"-"+sn[t>>16&15|64]+sn[t>>24&255]+"-"+sn[e&63|128]+sn[e>>8&255]+"-"+sn[e>>16&255]+sn[e>>24&255]+sn[n&255]+sn[n>>8&255]+sn[n>>16&255]+sn[n>>24&255]).toLowerCase()}function pe(i,t,e){return Math.max(t,Math.min(e,i))}function Ef(i,t){return(i%t+t)%t}function Zl(i,t,e){return(1-e)*i+e*t}function dr(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:case Uint8ClampedArray:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function fn(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var Tt=class i{static{i.prototype.isVector2=!0}constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=pe(this.x,t.x,e.x),this.y=pe(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=pe(this.x,t,e),this.y=pe(this.y,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(pe(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(pe(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},ni=class{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let c=n[s+0],l=n[s+1],u=n[s+2],f=n[s+3],h=r[o+0],d=r[o+1],g=r[o+2],v=r[o+3];if(f!==v||c!==h||l!==d||u!==g){let p=c*h+l*d+u*g+f*v;p<0&&(h=-h,d=-d,g=-g,v=-v,p=-p);let m=1-a;if(p<.9995){let w=Math.acos(p),R=Math.sin(w);m=Math.sin(m*w)/R,a=Math.sin(a*w)/R,c=c*m+h*a,l=l*m+d*a,u=u*m+g*a,f=f*m+v*a}else{c=c*m+h*a,l=l*m+d*a,u=u*m+g*a,f=f*m+v*a;let w=1/Math.sqrt(c*c+l*l+u*u+f*f);c*=w,l*=w,u*=w,f*=w}}t[e]=c,t[e+1]=l,t[e+2]=u,t[e+3]=f}static multiplyQuaternionsFlat(t,e,n,s,r,o){let a=n[s],c=n[s+1],l=n[s+2],u=n[s+3],f=r[o],h=r[o+1],d=r[o+2],g=r[o+3];return t[e]=a*g+u*f+c*d-l*h,t[e+1]=c*g+u*h+l*f-a*d,t[e+2]=l*g+u*d+a*h-c*f,t[e+3]=u*g-a*f-c*h-l*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,c=Math.sin,l=a(n/2),u=a(s/2),f=a(r/2),h=c(n/2),d=c(s/2),g=c(r/2);switch(o){case"XYZ":this._x=h*u*f+l*d*g,this._y=l*d*f-h*u*g,this._z=l*u*g+h*d*f,this._w=l*u*f-h*d*g;break;case"YXZ":this._x=h*u*f+l*d*g,this._y=l*d*f-h*u*g,this._z=l*u*g-h*d*f,this._w=l*u*f+h*d*g;break;case"ZXY":this._x=h*u*f-l*d*g,this._y=l*d*f+h*u*g,this._z=l*u*g+h*d*f,this._w=l*u*f-h*d*g;break;case"ZYX":this._x=h*u*f-l*d*g,this._y=l*d*f+h*u*g,this._z=l*u*g-h*d*f,this._w=l*u*f+h*d*g;break;case"YZX":this._x=h*u*f+l*d*g,this._y=l*d*f+h*u*g,this._z=l*u*g-h*d*f,this._w=l*u*f-h*d*g;break;case"XZY":this._x=h*u*f-l*d*g,this._y=l*d*f-h*u*g,this._z=l*u*g+h*d*f,this._w=l*u*f+h*d*g;break;default:ne("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],c=e[9],l=e[2],u=e[6],f=e[10],h=n+a+f;if(h>0){let d=.5/Math.sqrt(h+1);this._w=.25/d,this._x=(u-c)*d,this._y=(r-l)*d,this._z=(o-s)*d}else if(n>a&&n>f){let d=2*Math.sqrt(1+n-a-f);this._w=(u-c)/d,this._x=.25*d,this._y=(s+o)/d,this._z=(r+l)/d}else if(a>f){let d=2*Math.sqrt(1+a-n-f);this._w=(r-l)/d,this._x=(s+o)/d,this._y=.25*d,this._z=(c+u)/d}else{let d=2*Math.sqrt(1+f-n-a);this._w=(o-s)/d,this._x=(r+l)/d,this._y=(c+u)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(pe(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,c=e._y,l=e._z,u=e._w;return this._x=n*u+o*a+s*l-r*c,this._y=s*u+o*c+r*a-n*l,this._z=r*u+o*l+n*c-s*a,this._w=o*u-n*a-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){let n=t._x,s=t._y,r=t._z,o=t._w,a=this.dot(t);a<0&&(n=-n,s=-s,r=-r,o=-o,a=-a);let c=1-e;if(a<.9995){let l=Math.acos(a),u=Math.sin(l);c=Math.sin(c*l)/u,e=Math.sin(e*l)/u,this._x=this._x*c+n*e,this._y=this._y*c+s*e,this._z=this._z*c+r*e,this._w=this._w*c+o*e,this._onChangeCallback()}else this._x=this._x*c+n*e,this._y=this._y*c+s*e,this._z=this._z*c+r*e,this._w=this._w*c+o*e,this.normalize();return this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},O=class i{static{i.prototype.isVector3=!0}constructor(t=0,e=0,n=0){this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Zh.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Zh.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){let e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,c=t.w,l=2*(o*s-a*n),u=2*(a*e-r*s),f=2*(r*n-o*e);return this.x=e+c*l+o*f-a*u,this.y=n+c*u+a*l-r*f,this.z=s+c*f+r*u-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=pe(this.x,t.x,e.x),this.y=pe(this.y,t.y,e.y),this.z=pe(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=pe(this.x,t,e),this.y=pe(this.y,t,e),this.z=pe(this.z,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(pe(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,c=e.z;return this.x=s*c-r*a,this.y=r*o-n*c,this.z=n*a-s*o,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Jl.copy(this).projectOnVector(t),this.sub(Jl)}reflect(t){return this.sub(Jl.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(pe(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Jl=new O,Zh=new ni,le=class i{static{i.prototype.isMatrix3=!0}constructor(t,e,n,s,r,o,a,c,l){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l)}set(t,e,n,s,r,o,a,c,l){let u=this.elements;return u[0]=t,u[1]=s,u[2]=a,u[3]=e,u[4]=r,u[5]=c,u[6]=n,u[7]=o,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],u=n[4],f=n[7],h=n[2],d=n[5],g=n[8],v=s[0],p=s[3],m=s[6],w=s[1],R=s[4],b=s[7],A=s[2],S=s[5],I=s[8];return r[0]=o*v+a*w+c*A,r[3]=o*p+a*R+c*S,r[6]=o*m+a*b+c*I,r[1]=l*v+u*w+f*A,r[4]=l*p+u*R+f*S,r[7]=l*m+u*b+f*I,r[2]=h*v+d*w+g*A,r[5]=h*p+d*R+g*S,r[8]=h*m+d*b+g*I,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],u=t[8];return e*o*u-e*a*l-n*r*u+n*a*c+s*r*l-s*o*c}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],u=t[8],f=u*o-a*l,h=a*c-u*r,d=l*r-o*c,g=e*f+n*h+s*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let v=1/g;return t[0]=f*v,t[1]=(s*l-u*n)*v,t[2]=(a*n-s*o)*v,t[3]=h*v,t[4]=(u*e-s*c)*v,t[5]=(s*r-a*e)*v,t[6]=d*v,t[7]=(n*c-l*e)*v,t[8]=(o*e-n*r)*v,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){let c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+t,-s*l,s*c,-s*(-l*o+c*a)+a+e,0,0,1),this}scale(t,e){return es("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Kl.makeScale(t,e)),this}rotate(t){return es("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Kl.makeRotation(-t)),this}translate(t,e){return es("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Kl.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}},Kl=new le,Jh=new le().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Kh=new le().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Cf(){let i={enabled:!0,workingColorSpace:Mr,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===we&&(s.r=bi(s.r),s.g=bi(s.g),s.b=bi(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===we&&(s.r=Rs(s.r),s.g=Rs(s.g),s.b=Rs(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===wi?Sr:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return es("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return es("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Mr]:{primaries:t,whitePoint:n,transfer:Sr,toXYZ:Jh,fromXYZ:Kh,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:un},outputColorSpaceConfig:{drawingBufferColorSpace:un}},[un]:{primaries:t,whitePoint:n,transfer:we,toXYZ:Jh,fromXYZ:Kh,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:un}}}),i}var xe=Cf();function bi(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Rs(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var gs,sa=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{gs===void 0&&(gs=wr("canvas")),gs.width=t.width,gs.height=t.height;let s=gs.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=gs}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=wr("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=bi(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(bi(e[n]/255)*255):e[n]=bi(e[n]);return{data:e,width:t.width,height:t.height}}else return ne("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},Rf=0,Ds=class{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Rf++}),this.uuid=Ys(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(jl(s[o].image)):r.push(jl(s[o]))}else r=jl(s);n.url=r}return e||(t.images[this.uuid]=n),n}};function jl(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?sa.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(ne("Texture: Unable to serialize Texture."),{})}var If=0,Ql=new O,gn=class i extends ei{constructor(t=i.DEFAULT_IMAGE,e=i.DEFAULT_MAPPING,n=Qn,s=Qn,r=je,o=zi,a=Ln,c=_n,l=i.DEFAULT_ANISOTROPY,u=wi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:If++}),this.uuid=Ys(),this.name="",this.source=new Ds(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new Tt(0,0),this.repeat=new Tt(1,1),this.center=new Tt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new le,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Ql).x}get height(){return this.source.getSize(Ql).y}get depth(){return this.source.getSize(Ql).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let n=t[e];if(n===void 0){ne(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){ne(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Yc)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case ta:t.x=t.x-Math.floor(t.x);break;case Qn:t.x=t.x<0?0:1;break;case ea:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case ta:t.y=t.y-Math.floor(t.y);break;case Qn:t.y=t.y<0?0:1;break;case ea:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};gn.DEFAULT_IMAGE=null;gn.DEFAULT_MAPPING=Yc;gn.DEFAULT_ANISOTROPY=1;var Ue=class i{static{i.prototype.isVector4=!0}constructor(t=0,e=0,n=0,s=1){this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r,c=t.elements,l=c[0],u=c[4],f=c[8],h=c[1],d=c[5],g=c[9],v=c[2],p=c[6],m=c[10];if(Math.abs(u-h)<.01&&Math.abs(f-v)<.01&&Math.abs(g-p)<.01){if(Math.abs(u+h)<.1&&Math.abs(f+v)<.1&&Math.abs(g+p)<.1&&Math.abs(l+d+m-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let R=(l+1)/2,b=(d+1)/2,A=(m+1)/2,S=(u+h)/4,I=(f+v)/4,x=(g+p)/4;return R>b&&R>A?R<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(R),s=S/n,r=I/n):b>A?b<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(b),n=S/s,r=x/s):A<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(A),n=I/r,s=x/r),this.set(n,s,r,e),this}let w=Math.sqrt((p-g)*(p-g)+(f-v)*(f-v)+(h-u)*(h-u));return Math.abs(w)<.001&&(w=1),this.x=(p-g)/w,this.y=(f-v)/w,this.z=(h-u)/w,this.w=Math.acos((l+d+m-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=pe(this.x,t.x,e.x),this.y=pe(this.y,t.y,e.y),this.z=pe(this.z,t.z,e.z),this.w=pe(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=pe(this.x,t,e),this.y=pe(this.y,t,e),this.z=pe(this.z,t,e),this.w=pe(this.w,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(pe(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},ra=class extends ei{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:je,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new Ue(0,0,t,e),this.scissorTest=!1,this.viewport=new Ue(0,0,t,e),this.textures=[];let s={width:t,height:e,depth:n.depth},r=new gn(s),o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(t={}){let e={minFilter:je,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let s=Object.assign({},t.textures[e].image);this.textures[e].source=new Ds(s)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){let e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},xn=class extends ra{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},Tr=class extends gn{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Je,this.minFilter=Je,this.wrapR=Qn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var oa=class extends gn{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Je,this.minFilter=Je,this.wrapR=Qn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}};var Re=class i{static{i.prototype.isMatrix4=!0}constructor(t,e,n,s,r,o,a,c,l,u,f,h,d,g,v,p){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l,u,f,h,d,g,v,p)}set(t,e,n,s,r,o,a,c,l,u,f,h,d,g,v,p){let m=this.elements;return m[0]=t,m[4]=e,m[8]=n,m[12]=s,m[1]=r,m[5]=o,m[9]=a,m[13]=c,m[2]=l,m[6]=u,m[10]=f,m[14]=h,m[3]=d,m[7]=g,m[11]=v,m[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),n.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();let e=this.elements,n=t.elements,s=1/xs.setFromMatrixColumn(t,0).length(),r=1/xs.setFromMatrixColumn(t,1).length(),o=1/xs.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(s),l=Math.sin(s),u=Math.cos(r),f=Math.sin(r);if(t.order==="XYZ"){let h=o*u,d=o*f,g=a*u,v=a*f;e[0]=c*u,e[4]=-c*f,e[8]=l,e[1]=d+g*l,e[5]=h-v*l,e[9]=-a*c,e[2]=v-h*l,e[6]=g+d*l,e[10]=o*c}else if(t.order==="YXZ"){let h=c*u,d=c*f,g=l*u,v=l*f;e[0]=h+v*a,e[4]=g*a-d,e[8]=o*l,e[1]=o*f,e[5]=o*u,e[9]=-a,e[2]=d*a-g,e[6]=v+h*a,e[10]=o*c}else if(t.order==="ZXY"){let h=c*u,d=c*f,g=l*u,v=l*f;e[0]=h-v*a,e[4]=-o*f,e[8]=g+d*a,e[1]=d+g*a,e[5]=o*u,e[9]=v-h*a,e[2]=-o*l,e[6]=a,e[10]=o*c}else if(t.order==="ZYX"){let h=o*u,d=o*f,g=a*u,v=a*f;e[0]=c*u,e[4]=g*l-d,e[8]=h*l+v,e[1]=c*f,e[5]=v*l+h,e[9]=d*l-g,e[2]=-l,e[6]=a*c,e[10]=o*c}else if(t.order==="YZX"){let h=o*c,d=o*l,g=a*c,v=a*l;e[0]=c*u,e[4]=v-h*f,e[8]=g*f+d,e[1]=f,e[5]=o*u,e[9]=-a*u,e[2]=-l*u,e[6]=d*f+g,e[10]=h-v*f}else if(t.order==="XZY"){let h=o*c,d=o*l,g=a*c,v=a*l;e[0]=c*u,e[4]=-f,e[8]=l*u,e[1]=h*f+v,e[5]=o*u,e[9]=d*f-g,e[2]=g*f-d,e[6]=a*u,e[10]=v*f+h}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Pf,t,Lf)}lookAt(t,e,n){let s=this.elements;return Mn.subVectors(t,e),Mn.lengthSq()===0&&(Mn.z=1),Mn.normalize(),Ei.crossVectors(n,Mn),Ei.lengthSq()===0&&(Math.abs(n.z)===1?Mn.x+=1e-4:Mn.z+=1e-4,Mn.normalize(),Ei.crossVectors(n,Mn)),Ei.normalize(),_o.crossVectors(Mn,Ei),s[0]=Ei.x,s[4]=_o.x,s[8]=Mn.x,s[1]=Ei.y,s[5]=_o.y,s[9]=Mn.y,s[2]=Ei.z,s[6]=_o.z,s[10]=Mn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],u=n[1],f=n[5],h=n[9],d=n[13],g=n[2],v=n[6],p=n[10],m=n[14],w=n[3],R=n[7],b=n[11],A=n[15],S=s[0],I=s[4],x=s[8],E=s[12],D=s[1],P=s[5],V=s[9],q=s[13],N=s[2],z=s[6],Z=s[10],L=s[14],Q=s[3],Y=s[7],$=s[11],nt=s[15];return r[0]=o*S+a*D+c*N+l*Q,r[4]=o*I+a*P+c*z+l*Y,r[8]=o*x+a*V+c*Z+l*$,r[12]=o*E+a*q+c*L+l*nt,r[1]=u*S+f*D+h*N+d*Q,r[5]=u*I+f*P+h*z+d*Y,r[9]=u*x+f*V+h*Z+d*$,r[13]=u*E+f*q+h*L+d*nt,r[2]=g*S+v*D+p*N+m*Q,r[6]=g*I+v*P+p*z+m*Y,r[10]=g*x+v*V+p*Z+m*$,r[14]=g*E+v*q+p*L+m*nt,r[3]=w*S+R*D+b*N+A*Q,r[7]=w*I+R*P+b*z+A*Y,r[11]=w*x+R*V+b*Z+A*$,r[15]=w*E+R*q+b*L+A*nt,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],c=t[9],l=t[13],u=t[2],f=t[6],h=t[10],d=t[14],g=t[3],v=t[7],p=t[11],m=t[15],w=c*d-l*h,R=a*d-l*f,b=a*h-c*f,A=o*d-l*u,S=o*h-c*u,I=o*f-a*u;return e*(v*w-p*R+m*b)-n*(g*w-p*A+m*S)+s*(g*R-v*A+m*I)-r*(g*b-v*S+p*I)}determinantAffine(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[1],o=t[5],a=t[9],c=t[2],l=t[6],u=t[10];return e*(o*u-a*l)-n*(r*u-a*c)+s*(r*l-o*c)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],u=t[8],f=t[9],h=t[10],d=t[11],g=t[12],v=t[13],p=t[14],m=t[15],w=e*a-n*o,R=e*c-s*o,b=e*l-r*o,A=n*c-s*a,S=n*l-r*a,I=s*l-r*c,x=u*v-f*g,E=u*p-h*g,D=u*m-d*g,P=f*p-h*v,V=f*m-d*v,q=h*m-d*p,N=w*q-R*V+b*P+A*D-S*E+I*x;if(N===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let z=1/N;return t[0]=(a*q-c*V+l*P)*z,t[1]=(s*V-n*q-r*P)*z,t[2]=(v*I-p*S+m*A)*z,t[3]=(h*S-f*I-d*A)*z,t[4]=(c*D-o*q-l*E)*z,t[5]=(e*q-s*D+r*E)*z,t[6]=(p*b-g*I-m*R)*z,t[7]=(u*I-h*b+d*R)*z,t[8]=(o*V-a*D+l*x)*z,t[9]=(n*D-e*V-r*x)*z,t[10]=(g*S-v*b+m*w)*z,t[11]=(f*b-u*S-d*w)*z,t[12]=(a*E-o*P-c*x)*z,t[13]=(e*P-n*E+s*x)*z,t[14]=(v*R-g*A-p*w)*z,t[15]=(u*A-f*R+h*w)*z,this}scale(t){let e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,c=t.z,l=r*o,u=r*a;return this.set(l*o+n,l*a-s*c,l*c+s*a,0,l*a+s*c,u*a+n,u*c-s*o,0,l*c-s*a,u*c+s*o,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){let s=this.elements,r=e._x,o=e._y,a=e._z,c=e._w,l=r+r,u=o+o,f=a+a,h=r*l,d=r*u,g=r*f,v=o*u,p=o*f,m=a*f,w=c*l,R=c*u,b=c*f,A=n.x,S=n.y,I=n.z;return s[0]=(1-(v+m))*A,s[1]=(d+b)*A,s[2]=(g-R)*A,s[3]=0,s[4]=(d-b)*S,s[5]=(1-(h+m))*S,s[6]=(p+w)*S,s[7]=0,s[8]=(g+R)*I,s[9]=(p-w)*I,s[10]=(1-(h+v))*I,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){let s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),e.identity(),this;let o=xs.set(s[0],s[1],s[2]).length(),a=xs.set(s[4],s[5],s[6]).length(),c=xs.set(s[8],s[9],s[10]).length();r<0&&(o=-o),zn.copy(this);let l=1/o,u=1/a,f=1/c;return zn.elements[0]*=l,zn.elements[1]*=l,zn.elements[2]*=l,zn.elements[4]*=u,zn.elements[5]*=u,zn.elements[6]*=u,zn.elements[8]*=f,zn.elements[9]*=f,zn.elements[10]*=f,e.setFromRotationMatrix(zn),n.x=o,n.y=a,n.z=c,this}makePerspective(t,e,n,s,r,o,a=Hn,c=!1){let l=this.elements,u=2*r/(e-t),f=2*r/(n-s),h=(e+t)/(e-t),d=(n+s)/(n-s),g,v;if(c)g=r/(o-r),v=o*r/(o-r);else if(a===Hn)g=-(o+r)/(o-r),v=-2*o*r/(o-r);else if(a===Ps)g=-o/(o-r),v=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=u,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=f,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=v,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=Hn,c=!1){let l=this.elements,u=2/(e-t),f=2/(n-s),h=-(e+t)/(e-t),d=-(n+s)/(n-s),g,v;if(c)g=1/(o-r),v=o/(o-r);else if(a===Hn)g=-2/(o-r),v=-(o+r)/(o-r);else if(a===Ps)g=-1/(o-r),v=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=u,l[4]=0,l[8]=0,l[12]=h,l[1]=0,l[5]=f,l[9]=0,l[13]=d,l[2]=0,l[6]=0,l[10]=g,l[14]=v,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}},xs=new O,zn=new Re,Pf=new O(0,0,0),Lf=new O(1,1,1),Ei=new O,_o=new O,Mn=new O,jh=new Re,Qh=new ni,Mi=class i{constructor(t=0,e=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let s=t.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],u=s[9],f=s[2],h=s[6],d=s[10];switch(e){case"XYZ":this._y=Math.asin(pe(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,d),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(h,l),this._z=0);break;case"YXZ":this._x=Math.asin(-pe(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(pe(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-f,d),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-pe(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(h,d),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(pe(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-pe(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(h,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-u,d),this._y=0);break;default:ne("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return jh.makeRotationFromQuaternion(t),this.setFromRotationMatrix(jh,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Qh.setFromEuler(this),this.setFromQuaternion(Qh,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Mi.DEFAULT_ORDER="XYZ";var Ns=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},Df=0,tu=new O,_s=new ni,mi=new Re,yo=new O,fr=new O,Nf=new O,Uf=new ni,eu=new O(1,0,0),nu=new O(0,1,0),iu=new O(0,0,1),su={type:"added"},Ff={type:"removed"},ys={type:"childadded",child:null},tc={type:"childremoved",child:null},Qe=class i extends ei{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Df++}),this.uuid=Ys(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let t=new O,e=new Mi,n=new ni,s=new O(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Re},normalMatrix:{value:new le}}),this.matrix=new Re,this.matrixWorld=new Re,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ns,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return _s.setFromAxisAngle(t,e),this.quaternion.multiply(_s),this}rotateOnWorldAxis(t,e){return _s.setFromAxisAngle(t,e),this.quaternion.premultiply(_s),this}rotateX(t){return this.rotateOnAxis(eu,t)}rotateY(t){return this.rotateOnAxis(nu,t)}rotateZ(t){return this.rotateOnAxis(iu,t)}translateOnAxis(t,e){return tu.copy(t).applyQuaternion(this.quaternion),this.position.add(tu.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(eu,t)}translateY(t){return this.translateOnAxis(nu,t)}translateZ(t){return this.translateOnAxis(iu,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(mi.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?yo.copy(t):yo.set(t,e,n);let s=this.parent;this.updateWorldMatrix(!0,!1),fr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?mi.lookAt(fr,yo,this.up):mi.lookAt(yo,fr,this.up),this.quaternion.setFromRotationMatrix(mi),s&&(mi.extractRotation(s.matrixWorld),_s.setFromRotationMatrix(mi),this.quaternion.premultiply(_s.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(se("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(su),ys.child=t,this.dispatchEvent(ys),ys.child=null):se("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Ff),tc.child=t,this.dispatchEvent(tc),tc.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),mi.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),mi.multiply(t.parent.matrixWorld)),t.applyMatrix4(mi),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(su),ys.child=t,this.dispatchEvent(ys),ys.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){let o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(fr,t,Nf),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(fr,Uf,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(t){t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let e=t.x,n=t.y,s=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*n-r[8]*s,r[13]+=n-r[1]*e-r[5]*n-r[9]*s,r[14]+=s-r[2]*e-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e,n=!1){let s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),e===!0){let r=this.children;for(let o=0,a=r.length;o<a;o++)r[o].updateWorldMatrix(!1,!0,n)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let c=a.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){let f=c[l];r(t.shapes,f)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(t.materials,this.material[c]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let c=this.animations[a];s.animations.push(r(t.animations,c))}}if(e){let a=o(t.geometries),c=o(t.materials),l=o(t.textures),u=o(t.images),f=o(t.shapes),h=o(t.skeletons),d=o(t.animations),g=o(t.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),u.length>0&&(n.images=u),f.length>0&&(n.shapes=f),h.length>0&&(n.skeletons=h),d.length>0&&(n.animations=d),g.length>0&&(n.nodes=g)}return n.object=s,n;function o(a){let c=[];for(let l in a){let u=a[l];delete u.metadata,c.push(u)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let s=t.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};Qe.DEFAULT_UP=new O(0,1,0);Qe.DEFAULT_MATRIX_AUTO_UPDATE=!0;Qe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Ke=class extends Qe{constructor(){super(),this.isGroup=!0,this.type="Group"}},Of={type:"move"},Us=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ke,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ke,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new O,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new O),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ke,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new O,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new O,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null,a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(let v of t.hand.values()){let p=e.getJointPose(v,n),m=this._getHandJoint(l,v);p!==null&&(m.matrix.fromArray(p.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=p.radius),m.visible=p!==null}let u=l.joints["index-finger-tip"],f=l.joints["thumb-tip"],h=u.position.distanceTo(f.position),d=.02,g=.005;l.inputState.pinching&&h>d+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&h<=d-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:t,target:this})));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Of)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new Ke;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},hd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ci={h:0,s:0,l:0},vo={h:0,s:0,l:0};function ec(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}var oe=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=un){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,xe.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=xe.workingColorSpace){return this.r=t,this.g=e,this.b=n,xe.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=xe.workingColorSpace){if(t=Ef(t,1),e=pe(e,0,1),n=pe(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=ec(o,r,t+1/3),this.g=ec(o,r,t),this.b=ec(o,r,t-1/3)}return xe.colorSpaceToWorking(this,s),this}setStyle(t,e=un){function n(r){r!==void 0&&parseFloat(r)<1&&ne("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:ne("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);ne("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=un){let n=hd[t.toLowerCase()];return n!==void 0?this.setHex(n,e):ne("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=bi(t.r),this.g=bi(t.g),this.b=bi(t.b),this}copyLinearToSRGB(t){return this.r=Rs(t.r),this.g=Rs(t.g),this.b=Rs(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=un){return xe.workingToColorSpace(rn.copy(this),t),Math.round(pe(rn.r*255,0,255))*65536+Math.round(pe(rn.g*255,0,255))*256+Math.round(pe(rn.b*255,0,255))}getHexString(t=un){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=xe.workingColorSpace){xe.workingToColorSpace(rn.copy(this),e);let n=rn.r,s=rn.g,r=rn.b,o=Math.max(n,s,r),a=Math.min(n,s,r),c,l,u=(a+o)/2;if(a===o)c=0,l=0;else{let f=o-a;switch(l=u<=.5?f/(o+a):f/(2-o-a),o){case n:c=(s-r)/f+(s<r?6:0);break;case s:c=(r-n)/f+2;break;case r:c=(n-s)/f+4;break}c/=6}return t.h=c,t.s=l,t.l=u,t}getRGB(t,e=xe.workingColorSpace){return xe.workingToColorSpace(rn.copy(this),e),t.r=rn.r,t.g=rn.g,t.b=rn.b,t}getStyle(t=un){xe.workingToColorSpace(rn.copy(this),t);let e=rn.r,n=rn.g,s=rn.b;return t!==un?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(Ci),this.setHSL(Ci.h+t,Ci.s+e,Ci.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Ci),t.getHSL(vo);let n=Zl(Ci.h,vo.h,e),s=Zl(Ci.s,vo.s,e),r=Zl(Ci.l,vo.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},rn=new oe;oe.NAMES=hd;var Fs=class extends Qe{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Mi,this.environmentIntensity=1,this.environmentRotation=new Mi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}},kn=new O,gi=new O,nc=new O,xi=new O,vs=new O,bs=new O,ru=new O,ic=new O,sc=new O,rc=new O,oc=new Ue,ac=new Ue,lc=new Ue,vi=class i{constructor(t=new O,e=new O,n=new O){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),kn.subVectors(t,e),s.cross(kn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){kn.subVectors(s,e),gi.subVectors(n,e),nc.subVectors(t,e);let o=kn.dot(kn),a=kn.dot(gi),c=kn.dot(nc),l=gi.dot(gi),u=gi.dot(nc),f=o*l-a*a;if(f===0)return r.set(0,0,0),null;let h=1/f,d=(l*c-a*u)*h,g=(o*u-a*c)*h;return r.set(1-d-g,g,d)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,xi)===null?!1:xi.x>=0&&xi.y>=0&&xi.x+xi.y<=1}static getInterpolation(t,e,n,s,r,o,a,c){return this.getBarycoord(t,e,n,s,xi)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,xi.x),c.addScaledVector(o,xi.y),c.addScaledVector(a,xi.z),c)}static getInterpolatedAttribute(t,e,n,s,r,o){return oc.setScalar(0),ac.setScalar(0),lc.setScalar(0),oc.fromBufferAttribute(t,e),ac.fromBufferAttribute(t,n),lc.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(oc,r.x),o.addScaledVector(ac,r.y),o.addScaledVector(lc,r.z),o}static isFrontFacing(t,e,n,s){return kn.subVectors(n,e),gi.subVectors(t,e),kn.cross(gi).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return kn.subVectors(this.c,this.b),gi.subVectors(this.a,this.b),kn.cross(gi).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return i.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return i.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return i.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return i.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return i.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,s=this.b,r=this.c,o,a;vs.subVectors(s,n),bs.subVectors(r,n),ic.subVectors(t,n);let c=vs.dot(ic),l=bs.dot(ic);if(c<=0&&l<=0)return e.copy(n);sc.subVectors(t,s);let u=vs.dot(sc),f=bs.dot(sc);if(u>=0&&f<=u)return e.copy(s);let h=c*f-u*l;if(h<=0&&c>=0&&u<=0)return o=c/(c-u),e.copy(n).addScaledVector(vs,o);rc.subVectors(t,r);let d=vs.dot(rc),g=bs.dot(rc);if(g>=0&&d<=g)return e.copy(r);let v=d*l-c*g;if(v<=0&&l>=0&&g<=0)return a=l/(l-g),e.copy(n).addScaledVector(bs,a);let p=u*g-d*f;if(p<=0&&f-u>=0&&d-g>=0)return ru.subVectors(r,s),a=(f-u)/(f-u+(d-g)),e.copy(s).addScaledVector(ru,a);let m=1/(p+v+h);return o=v*m,a=h*m,e.copy(n).addScaledVector(vs,o).addScaledVector(bs,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},ii=class{constructor(t=new O(1/0,1/0,1/0),e=new O(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Vn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Vn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=Vn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,Vn):Vn.fromBufferAttribute(r,o),Vn.applyMatrix4(t.matrixWorld),this.expandByPoint(Vn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),bo.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),bo.copy(n.boundingBox)),bo.applyMatrix4(t.matrixWorld),this.union(bo)}let s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Vn),Vn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(pr),Mo.subVectors(this.max,pr),Ms.subVectors(t.a,pr),Ss.subVectors(t.b,pr),ws.subVectors(t.c,pr),Ri.subVectors(Ss,Ms),Ii.subVectors(ws,Ss),Ji.subVectors(Ms,ws);let e=[0,-Ri.z,Ri.y,0,-Ii.z,Ii.y,0,-Ji.z,Ji.y,Ri.z,0,-Ri.x,Ii.z,0,-Ii.x,Ji.z,0,-Ji.x,-Ri.y,Ri.x,0,-Ii.y,Ii.x,0,-Ji.y,Ji.x,0];return!cc(e,Ms,Ss,ws,Mo)||(e=[1,0,0,0,1,0,0,0,1],!cc(e,Ms,Ss,ws,Mo))?!1:(So.crossVectors(Ri,Ii),e=[So.x,So.y,So.z],cc(e,Ms,Ss,ws,Mo))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Vn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Vn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(_i[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),_i[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),_i[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),_i[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),_i[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),_i[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),_i[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),_i[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(_i),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},_i=[new O,new O,new O,new O,new O,new O,new O,new O],Vn=new O,bo=new ii,Ms=new O,Ss=new O,ws=new O,Ri=new O,Ii=new O,Ji=new O,pr=new O,Mo=new O,So=new O,Ki=new O;function cc(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){Ki.fromArray(i,r);let a=s.x*Math.abs(Ki.x)+s.y*Math.abs(Ki.y)+s.z*Math.abs(Ki.z),c=t.dot(Ki),l=e.dot(Ki),u=n.dot(Ki);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>a)return!1}return!0}var Ge=new O,wo=new Tt,Bf=0,mn=class extends ei{constructor(t,e,n=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Bf++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=rd,this.updateRanges=[],this.gpuType=Yn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)wo.fromBufferAttribute(this,e),wo.applyMatrix3(t),this.setXY(e,wo.x,wo.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Ge.fromBufferAttribute(this,e),Ge.applyMatrix3(t),this.setXYZ(e,Ge.x,Ge.y,Ge.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Ge.fromBufferAttribute(this,e),Ge.applyMatrix4(t),this.setXYZ(e,Ge.x,Ge.y,Ge.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ge.fromBufferAttribute(this,e),Ge.applyNormalMatrix(t),this.setXYZ(e,Ge.x,Ge.y,Ge.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ge.fromBufferAttribute(this,e),Ge.transformDirection(t),this.setXYZ(e,Ge.x,Ge.y,Ge.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=dr(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=fn(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=dr(e,this.array)),e}setX(t,e){return this.normalized&&(e=fn(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=dr(e,this.array)),e}setY(t,e){return this.normalized&&(e=fn(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=dr(e,this.array)),e}setZ(t,e){return this.normalized&&(e=fn(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=dr(e,this.array)),e}setW(t,e){return this.normalized&&(e=fn(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=fn(e,this.array),n=fn(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=fn(e,this.array),n=fn(n,this.array),s=fn(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=fn(e,this.array),n=fn(n,this.array),s=fn(s,this.array),r=fn(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}};var Ar=class extends mn{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var Er=class extends mn{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var ke=class extends mn{constructor(t,e,n){super(new Float32Array(t),e,n)}},zf=new ii,mr=new O,hc=new O,ns=class{constructor(t=new O,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):zf.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;mr.subVectors(t,this.center);let e=mr.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(mr,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(hc.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(mr.copy(t.center).add(hc)),this.expandByPoint(mr.copy(t.center).sub(hc))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},kf=0,In=new Re,uc=new Qe,Ts=new O,Sn=new ii,gr=new ii,Ze=new O,on=class i extends ei{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:kf++}),this.uuid=Ys(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Tf(t)?Er:Ar)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new le().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return In.makeRotationFromQuaternion(t),this.applyMatrix4(In),this}rotateX(t){return In.makeRotationX(t),this.applyMatrix4(In),this}rotateY(t){return In.makeRotationY(t),this.applyMatrix4(In),this}rotateZ(t){return In.makeRotationZ(t),this.applyMatrix4(In),this}translate(t,e,n){return In.makeTranslation(t,e,n),this.applyMatrix4(In),this}scale(t,e,n){return In.makeScale(t,e,n),this.applyMatrix4(In),this}lookAt(t){return uc.lookAt(t),uc.updateMatrix(),this.applyMatrix4(uc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ts).negate(),this.translate(Ts.x,Ts.y,Ts.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let s=0,r=t.length;s<r;s++){let o=t[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new ke(n,3))}else{let n=Math.min(t.length,e.count);for(let s=0;s<n;s++){let r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&ne("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ii);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){se("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new O(-1/0,-1/0,-1/0),new O(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){let r=e[n];Sn.setFromBufferAttribute(r),this.morphTargetsRelative?(Ze.addVectors(this.boundingBox.min,Sn.min),this.boundingBox.expandByPoint(Ze),Ze.addVectors(this.boundingBox.max,Sn.max),this.boundingBox.expandByPoint(Ze)):(this.boundingBox.expandByPoint(Sn.min),this.boundingBox.expandByPoint(Sn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&se('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ns);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){se("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new O,1/0);return}if(t){let n=this.boundingSphere.center;if(Sn.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){let a=e[r];gr.setFromBufferAttribute(a),this.morphTargetsRelative?(Ze.addVectors(Sn.min,gr.min),Sn.expandByPoint(Ze),Ze.addVectors(Sn.max,gr.max),Sn.expandByPoint(Ze)):(Sn.expandByPoint(gr.min),Sn.expandByPoint(gr.max))}Sn.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)Ze.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Ze));if(e)for(let r=0,o=e.length;r<o;r++){let a=e[r],c=this.morphTargetsRelative;for(let l=0,u=a.count;l<u;l++)Ze.fromBufferAttribute(a,l),c&&(Ts.fromBufferAttribute(t,l),Ze.add(Ts)),s=Math.max(s,n.distanceToSquared(Ze))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&se('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){se("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,s=e.normal,r=e.uv,o=this.getAttribute("tangent");(o===void 0||o.count!==n.count)&&(o=new mn(new Float32Array(4*n.count),4),this.setAttribute("tangent",o));let a=[],c=[];for(let x=0;x<n.count;x++)a[x]=new O,c[x]=new O;let l=new O,u=new O,f=new O,h=new Tt,d=new Tt,g=new Tt,v=new O,p=new O;function m(x,E,D){l.fromBufferAttribute(n,x),u.fromBufferAttribute(n,E),f.fromBufferAttribute(n,D),h.fromBufferAttribute(r,x),d.fromBufferAttribute(r,E),g.fromBufferAttribute(r,D),u.sub(l),f.sub(l),d.sub(h),g.sub(h);let P=1/(d.x*g.y-g.x*d.y);isFinite(P)&&(v.copy(u).multiplyScalar(g.y).addScaledVector(f,-d.y).multiplyScalar(P),p.copy(f).multiplyScalar(d.x).addScaledVector(u,-g.x).multiplyScalar(P),a[x].add(v),a[E].add(v),a[D].add(v),c[x].add(p),c[E].add(p),c[D].add(p))}let w=this.groups;w.length===0&&(w=[{start:0,count:t.count}]);for(let x=0,E=w.length;x<E;++x){let D=w[x],P=D.start,V=D.count;for(let q=P,N=P+V;q<N;q+=3)m(t.getX(q+0),t.getX(q+1),t.getX(q+2))}let R=new O,b=new O,A=new O,S=new O;function I(x){A.fromBufferAttribute(s,x),S.copy(A);let E=a[x];R.copy(E),R.sub(A.multiplyScalar(A.dot(E))).normalize(),b.crossVectors(S,E);let P=b.dot(c[x])<0?-1:1;o.setXYZW(x,R.x,R.y,R.z,P)}for(let x=0,E=w.length;x<E;++x){let D=w[x],P=D.start,V=D.count;for(let q=P,N=P+V;q<N;q+=3)I(t.getX(q+0)),I(t.getX(q+1)),I(t.getX(q+2))}this._transformed=!0}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==e.count)n=new mn(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let h=0,d=n.count;h<d;h++)n.setXYZ(h,0,0,0);let s=new O,r=new O,o=new O,a=new O,c=new O,l=new O,u=new O,f=new O;if(t)for(let h=0,d=t.count;h<d;h+=3){let g=t.getX(h+0),v=t.getX(h+1),p=t.getX(h+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,v),o.fromBufferAttribute(e,p),u.subVectors(o,r),f.subVectors(s,r),u.cross(f),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,v),l.fromBufferAttribute(n,p),a.add(u),c.add(u),l.add(u),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(v,c.x,c.y,c.z),n.setXYZ(p,l.x,l.y,l.z)}else for(let h=0,d=e.count;h<d;h+=3)s.fromBufferAttribute(e,h+0),r.fromBufferAttribute(e,h+1),o.fromBufferAttribute(e,h+2),u.subVectors(o,r),f.subVectors(s,r),u.cross(f),n.setXYZ(h+0,u.x,u.y,u.z),n.setXYZ(h+1,u.x,u.y,u.z),n.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Ze.fromBufferAttribute(t,e),Ze.normalize(),t.setXYZ(e,Ze.x,Ze.y,Ze.z)}toNonIndexed(){function t(a,c){let l=a.array,u=a.itemSize,f=a.normalized,h=new l.constructor(c.length*u),d=0,g=0;for(let v=0,p=c.length;v<p;v++){a.isInterleavedBufferAttribute?d=c[v]*a.data.stride+a.offset:d=c[v]*u;for(let m=0;m<u;m++)h[g++]=l[d++]}return new mn(h,u,f)}if(this.index===null)return ne("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new i,n=this.index.array,s=this.attributes;for(let a in s){let c=s[a],l=t(c,n);e.setAttribute(a,l)}let r=this.morphAttributes;for(let a in r){let c=[],l=r[a];for(let u=0,f=l.length;u<f;u++){let h=l[u],d=t(h,n);c.push(d)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,c=o.length;a<c;a++){let l=o[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let c in n){let l=n[c];t.data.attributes[c]=l.toJSON(t.data)}let s={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],u=[];for(let f=0,h=l.length;f<h;f++){let d=l[f];u.push(d.toJSON(t.data))}u.length>0&&(s[c]=u,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone());let s=t.attributes;for(let l in s){let u=s[l];this.setAttribute(l,u.clone(e))}let r=t.morphAttributes;for(let l in r){let u=[],f=r[l];for(let h=0,d=f.length;h<d;h++)u.push(f[h].clone(e));this.morphAttributes[l]=u}this.morphTargetsRelative=t.morphTargetsRelative;let o=t.groups;for(let l=0,u=o.length;l<u;l++){let f=o[l];this.addGroup(f.start,f.count,f.materialIndex)}let a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());let c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}};var dc=new O,Vf=new O,Gf=new le,Gn=class{constructor(t=new O(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let s=dc.subVectors(n,e).cross(Vf.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,n=!0){let s=t.delta(dc),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let o=-(t.start.dot(this.normal)+this.constant)/r;return n===!0&&(o<0||o>1)?null:e.copy(t.start).addScaledVector(s,o)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||Gf.getNormalMatrix(t),s=this.coplanarPoint(dc).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}},Hf=0,si=class extends ei{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Hf++}),this.uuid=Ys(),this.name="",this.type="Material",this.blending=Ws,this.side=Oi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Bc,this.blendDst=zc,this.blendEquation=ls,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new oe(0,0,0),this.blendAlpha=0,this.depthFunc=Is,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=vl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Xo,this.stencilZFail=Xo,this.stencilZPass=Xo,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){ne(`Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){ne(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let o=[];for(let a in r){let c=r[a];delete c.metadata,o.push(c)}return o}if(e){let r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new oe().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(n=>new Gn().fromJSON(n))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let n=t.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new Tt().fromArray(n)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Tt().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}};var yi=new O,fc=new O,To=new O,Ao=new O,Os=class{constructor(t=new O,e=new O(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,yi)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=yi.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(yi.copy(this.origin).addScaledVector(this.direction,e),yi.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){fc.copy(t).add(e).multiplyScalar(.5),To.copy(e).sub(t).normalize(),Ao.copy(this.origin).sub(fc);let r=t.distanceTo(e)*.5,o=-this.direction.dot(To),a=Ao.dot(this.direction),c=-Ao.dot(To),l=Ao.lengthSq(),u=Math.abs(1-o*o),f,h,d,g;if(u>0)if(f=o*c-a,h=o*a-c,g=r*u,f>=0)if(h>=-g)if(h<=g){let v=1/u;f*=v,h*=v,d=f*(f+o*h+2*a)+h*(o*f+h+2*c)+l}else h=r,f=Math.max(0,-(o*h+a)),d=-f*f+h*(h+2*c)+l;else h=-r,f=Math.max(0,-(o*h+a)),d=-f*f+h*(h+2*c)+l;else h<=-g?(f=Math.max(0,-(-o*r+a)),h=f>0?-r:Math.min(Math.max(-r,-c),r),d=-f*f+h*(h+2*c)+l):h<=g?(f=0,h=Math.min(Math.max(-r,-c),r),d=h*(h+2*c)+l):(f=Math.max(0,-(o*r+a)),h=f>0?r:Math.min(Math.max(-r,-c),r),d=-f*f+h*(h+2*c)+l);else h=o>0?-r:r,f=Math.max(0,-(o*h+a)),d=-f*f+h*(h+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,f),s&&s.copy(fc).addScaledVector(To,h),d}intersectSphere(t,e){if(t.radius<0)return null;yi.subVectors(t.center,this.origin);let n=yi.dot(this.direction),s=yi.dot(yi)-n*n,r=t.radius*t.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,c,l=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,h=this.origin;return l>=0?(n=(t.min.x-h.x)*l,s=(t.max.x-h.x)*l):(n=(t.max.x-h.x)*l,s=(t.min.x-h.x)*l),u>=0?(r=(t.min.y-h.y)*u,o=(t.max.y-h.y)*u):(r=(t.max.y-h.y)*u,o=(t.min.y-h.y)*u),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),f>=0?(a=(t.min.z-h.z)*f,c=(t.max.z-h.z)*f):(a=(t.max.z-h.z)*f,c=(t.min.z-h.z)*f),n>c||a>s)||((a>n||n!==n)&&(n=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,yi)!==null}intersectTriangle(t,e,n,s,r){let o=this.origin,a=this.direction,c=a.x,l=a.y,u=a.z,f=t.x-o.x,h=t.y-o.y,d=t.z-o.z,g=e.x-o.x,v=e.y-o.y,p=e.z-o.z,m=n.x-o.x,w=n.y-o.y,R=n.z-o.z,b=Math.abs(c),A=Math.abs(l),S=Math.abs(u),I,x,E,D,P,V,q,N,z,Z,L,Q;if(b>=A&&b>=S?(E=c,V=f,z=g,Q=m,c>=0?(I=l,x=u,D=h,P=d,q=v,N=p,Z=w,L=R):(I=u,x=l,D=d,P=h,q=p,N=v,Z=R,L=w)):A>=S?(E=l,V=h,z=v,Q=w,l>=0?(I=u,x=c,D=d,P=f,q=p,N=g,Z=R,L=m):(I=c,x=u,D=f,P=d,q=g,N=p,Z=m,L=R)):(E=u,V=d,z=p,Q=R,u>=0?(I=c,x=l,D=f,P=h,q=g,N=v,Z=m,L=w):(I=l,x=c,D=h,P=f,q=v,N=g,Z=w,L=m)),E===0)return null;let Y=I/E,$=x/E,nt=1/E,mt=D-Y*V,ht=P-$*V,Qt=q-Y*z,Rt=N-$*z,Kt=Z-Y*Q,rt=L-$*Q,ut=Kt*Rt-rt*Qt,Mt=mt*rt-ht*Kt,Bt=Qt*ht-Rt*mt;if(s){if(ut<0||Mt<0||Bt<0)return null}else if((ut<0||Mt<0||Bt<0)&&(ut>0||Mt>0||Bt>0))return null;let Dt=ut+Mt+Bt;if(Dt===0)return null;let ie=nt*(ut*V+Mt*z+Bt*Q);return(Dt>0?ie<0:ie>0)?null:this.at(ie/Dt,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},ri=class extends si{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new oe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Mi,this.combine=kc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},ou=new Re,ji=new Os,Eo=new ns,au=new O,Co=new O,Ro=new O,Io=new O,pc=new O,Po=new O,lu=new O,Lo=new O,De=class extends Qe{constructor(t=new on,e=new ri){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);let a=this.morphTargetInfluences;if(r&&a){Po.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let u=a[c],f=r[c];u!==0&&(pc.fromBufferAttribute(f,t),o?Po.addScaledVector(pc,u):Po.addScaledVector(pc.sub(e),u))}e.add(Po)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Eo.copy(n.boundingSphere),Eo.applyMatrix4(r),ji.copy(t.ray).recast(t.near),!(Eo.containsPoint(ji.origin)===!1&&(ji.intersectSphere(Eo,au)===null||ji.origin.distanceToSquared(au)>(t.far-t.near)**2))&&(ou.copy(r).invert(),ji.copy(t.ray).applyMatrix4(ou),!(n.boundingBox!==null&&ji.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,ji)))}_computeIntersections(t,e,n){let s,r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,u=r.attributes.uv1,f=r.attributes.normal,h=r.groups,d=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,v=h.length;g<v;g++){let p=h[g],m=o[p.materialIndex],w=Math.max(p.start,d.start),R=Math.min(a.count,Math.min(p.start+p.count,d.start+d.count));for(let b=w,A=R;b<A;b+=3){let S=a.getX(b),I=a.getX(b+1),x=a.getX(b+2);s=Do(this,m,t,n,l,u,f,S,I,x),s&&(s.faceIndex=Math.floor(b/3),s.face.materialIndex=p.materialIndex,e.push(s))}}else{let g=Math.max(0,d.start),v=Math.min(a.count,d.start+d.count);for(let p=g,m=v;p<m;p+=3){let w=a.getX(p),R=a.getX(p+1),b=a.getX(p+2);s=Do(this,o,t,n,l,u,f,w,R,b),s&&(s.faceIndex=Math.floor(p/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,v=h.length;g<v;g++){let p=h[g],m=o[p.materialIndex],w=Math.max(p.start,d.start),R=Math.min(c.count,Math.min(p.start+p.count,d.start+d.count));for(let b=w,A=R;b<A;b+=3){let S=b,I=b+1,x=b+2;s=Do(this,m,t,n,l,u,f,S,I,x),s&&(s.faceIndex=Math.floor(b/3),s.face.materialIndex=p.materialIndex,e.push(s))}}else{let g=Math.max(0,d.start),v=Math.min(c.count,d.start+d.count);for(let p=g,m=v;p<m;p+=3){let w=p,R=p+1,b=p+2;s=Do(this,o,t,n,l,u,f,w,R,b),s&&(s.faceIndex=Math.floor(p/3),e.push(s))}}}};function Wf(i,t,e,n,s,r,o,a){let c;if(t.side===tn?c=n.intersectTriangle(o,r,s,!0,a):c=n.intersectTriangle(s,r,o,t.side===Oi,a),c===null)return null;Lo.copy(a),Lo.applyMatrix4(i.matrixWorld);let l=e.ray.origin.distanceTo(Lo);return l<e.near||l>e.far?null:{distance:l,point:Lo.clone(),object:i}}function Do(i,t,e,n,s,r,o,a,c,l){i.getVertexPosition(a,Co),i.getVertexPosition(c,Ro),i.getVertexPosition(l,Io);let u=Wf(i,t,e,n,Co,Ro,Io,lu);if(u){let f=new O;vi.getBarycoord(lu,Co,Ro,Io,f),s&&(u.uv=vi.getInterpolatedAttribute(s,a,c,l,f,new Tt)),r&&(u.uv1=vi.getInterpolatedAttribute(r,a,c,l,f,new Tt)),o&&(u.normal=vi.getInterpolatedAttribute(o,a,c,l,f,new O),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));let h={a,b:c,c:l,normal:new O,materialIndex:0};vi.getNormal(Co,Ro,Io,h.normal),u.face=h,u.barycoord=f}return u}var aa=class extends gn{constructor(t=null,e=1,n=1,s,r,o,a,c,l=Je,u=Je,f,h){super(null,o,a,c,l,u,s,r,f,h),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Qi=new ns,Xf=new Tt(.5,.5),No=new O,Bs=class{constructor(t=new Gn,e=new Gn,n=new Gn,s=new Gn,r=new Gn,o=new Gn){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){let a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Hn,n=!1){let s=this.planes,r=t.elements,o=r[0],a=r[1],c=r[2],l=r[3],u=r[4],f=r[5],h=r[6],d=r[7],g=r[8],v=r[9],p=r[10],m=r[11],w=r[12],R=r[13],b=r[14],A=r[15];if(s[0].setComponents(l-o,d-u,m-g,A-w).normalize(),s[1].setComponents(l+o,d+u,m+g,A+w).normalize(),s[2].setComponents(l+a,d+f,m+v,A+R).normalize(),s[3].setComponents(l-a,d-f,m-v,A-R).normalize(),n)s[4].setComponents(c,h,p,b).normalize(),s[5].setComponents(l-c,d-h,m-p,A-b).normalize();else if(s[4].setComponents(l-c,d-h,m-p,A-b).normalize(),e===Hn)s[5].setComponents(l+c,d+h,m+p,A+b).normalize();else if(e===Ps)s[5].setComponents(c,h,p,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Qi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Qi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Qi)}intersectsSprite(t){Qi.center.set(0,0,0);let e=Xf.distanceTo(t.center);return Qi.radius=.7071067811865476+e,Qi.applyMatrix4(t.matrixWorld),this.intersectsSphere(Qi)}intersectsSphere(t){let e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let s=e[n];if(No.x=s.normal.x>0?t.max.x:t.min.x,No.y=s.normal.y>0?t.max.y:t.min.y,No.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(No)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var Wn=class extends si{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new oe(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}},la=new O,ca=new O,cu=new Re,xr=new Os,Uo=new ns,mc=new O,hu=new O,ha=class extends Qe{constructor(t=new on,e=new Wn){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)la.fromBufferAttribute(e,s-1),ca.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=la.distanceTo(ca);t.setAttribute("lineDistance",new ke(n,1))}else ne("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Uo.copy(n.boundingSphere),Uo.applyMatrix4(s),Uo.radius+=r,t.ray.intersectsSphere(Uo)===!1)return;cu.copy(s).invert(),xr.copy(t.ray).applyMatrix4(cu);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,u=n.index,h=n.attributes.position;if(u!==null){let d=Math.max(0,o.start),g=Math.min(u.count,o.start+o.count);for(let v=d,p=g-1;v<p;v+=l){let m=u.getX(v),w=u.getX(v+1),R=Fo(this,t,xr,c,m,w,v);R&&e.push(R)}if(this.isLineLoop){let v=u.getX(g-1),p=u.getX(d),m=Fo(this,t,xr,c,v,p,g-1);m&&e.push(m)}}else{let d=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let v=d,p=g-1;v<p;v+=l){let m=Fo(this,t,xr,c,v,v+1,v);m&&e.push(m)}if(this.isLineLoop){let v=Fo(this,t,xr,c,g-1,d,g-1);v&&e.push(v)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function Fo(i,t,e,n,s,r,o){let a=i.geometry.attributes.position;if(la.fromBufferAttribute(a,s),ca.fromBufferAttribute(a,r),e.distanceSqToSegment(la,ca,mc,hu)>n)return;mc.applyMatrix4(i.matrixWorld);let l=t.ray.origin.distanceTo(mc);if(!(l<t.near||l>t.far))return{distance:l,point:hu.clone().applyMatrix4(i.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:i}}var uu=new O,du=new O,is=class extends ha{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[];for(let s=0,r=e.count;s<r;s+=2)uu.fromBufferAttribute(e,s),du.fromBufferAttribute(e,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+uu.distanceTo(du);t.setAttribute("lineDistance",new ke(n,1))}else ne("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var Cr=class extends gn{constructor(t=[],e=Bi,n,s,r,o,a,c,l,u){super(t,e,n,s,r,o,a,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}};var Li=class extends gn{constructor(t,e,n=qn,s,r,o,a=Je,c=Je,l,u=ti,f=1){if(u!==ti&&u!==ki)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let h={width:t,height:e,depth:f};super(h,s,r,o,a,c,u,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Ds(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}},ua=class extends Li{constructor(t,e=qn,n=Bi,s,r,o=Je,a=Je,c,l=ti){let u={width:t,height:t,depth:1},f=[u,u,u,u,u,u];super(t,t,e,n,s,r,o,a,c,l),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}},Rr=class extends gn{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}},Pn=class i extends on{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let c=[],l=[],u=[],f=[],h=0,d=0;g("z","y","x",-1,-1,n,e,t,o,r,0),g("z","y","x",1,-1,n,e,-t,o,r,1),g("x","z","y",1,1,t,n,e,s,o,2),g("x","z","y",1,-1,t,n,-e,s,o,3),g("x","y","z",1,-1,t,e,n,s,r,4),g("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new ke(l,3)),this.setAttribute("normal",new ke(u,3)),this.setAttribute("uv",new ke(f,2));function g(v,p,m,w,R,b,A,S,I,x,E){let D=b/I,P=A/x,V=b/2,q=A/2,N=S/2,z=I+1,Z=x+1,L=0,Q=0,Y=new O;for(let $=0;$<Z;$++){let nt=$*P-q;for(let mt=0;mt<z;mt++){let ht=mt*D-V;Y[v]=ht*w,Y[p]=nt*R,Y[m]=N,l.push(Y.x,Y.y,Y.z),Y[v]=0,Y[p]=0,Y[m]=S>0?1:-1,u.push(Y.x,Y.y,Y.z),f.push(mt/I),f.push(1-$/x),L+=1}}for(let $=0;$<x;$++)for(let nt=0;nt<I;nt++){let mt=h+nt+z*$,ht=h+nt+z*($+1),Qt=h+(nt+1)+z*($+1),Rt=h+(nt+1)+z*$;c.push(mt,ht,Rt),c.push(ht,Qt,Rt),Q+=6}a.addGroup(d,Q,E),d+=Q,h+=L}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};var Oo=new O,Bo=new O,gc=new O,zo=new vi,Ir=class extends on{constructor(t=null,e=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:e},t!==null){let s=Math.pow(10,4),r=Math.cos(qo*e),o=t.getIndex(),a=t.getAttribute("position"),c=o?o.count:a.count,l=[0,0,0],u=["a","b","c"],f=new Array(3),h={},d=[];for(let g=0;g<c;g+=3){o?(l[0]=o.getX(g),l[1]=o.getX(g+1),l[2]=o.getX(g+2)):(l[0]=g,l[1]=g+1,l[2]=g+2);let{a:v,b:p,c:m}=zo;if(v.fromBufferAttribute(a,l[0]),p.fromBufferAttribute(a,l[1]),m.fromBufferAttribute(a,l[2]),zo.getNormal(gc),f[0]=`${Math.round(v.x*s)},${Math.round(v.y*s)},${Math.round(v.z*s)}`,f[1]=`${Math.round(p.x*s)},${Math.round(p.y*s)},${Math.round(p.z*s)}`,f[2]=`${Math.round(m.x*s)},${Math.round(m.y*s)},${Math.round(m.z*s)}`,!(f[0]===f[1]||f[1]===f[2]||f[2]===f[0]))for(let w=0;w<3;w++){let R=(w+1)%3,b=f[w],A=f[R],S=zo[u[w]],I=zo[u[R]],x=`${b}_${A}`,E=`${A}_${b}`;E in h&&h[E]?(gc.dot(h[E].normal)<=r&&(d.push(S.x,S.y,S.z),d.push(I.x,I.y,I.z)),h[E]=null):x in h||(h[x]={index0:l[w],index1:l[R],normal:gc.clone()})}}for(let g in h)if(h[g]){let{index0:v,index1:p}=h[g];Oo.fromBufferAttribute(a,v),Bo.fromBufferAttribute(a,p),d.push(Oo.x,Oo.y,Oo.z),d.push(Bo.x,Bo.y,Bo.z)}this.setAttribute("position",new ke(d,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}},wn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){ne("Curve: .getPoint() not implemented.")}getPointAt(t,e){let n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],n,s=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){let n=this.getLengths(),s=0,r=n.length,o;e?o=e:o=t*n[r-1];let a=0,c=r-1,l;for(;a<=c;)if(s=Math.floor(a+(c-a)/2),l=n[s]-o,l<0)a=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,n[s]===o)return s/(r-1);let u=n[s],h=n[s+1]-u,d=(o-u)/h;return(s+d)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);let o=this.getPoint(s),a=this.getPoint(r),c=e||(o.isVector2?new Tt:new O);return c.copy(a).sub(o).normalize(),c}getTangentAt(t,e){let n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e=!1){let n=new O,s=[],r=[],o=[],a=new O,c=new Re;for(let d=0;d<=t;d++){let g=d/t;s[d]=this.getTangentAt(g,new O)}r[0]=new O,o[0]=new O;let l=Number.MAX_VALUE,u=Math.abs(s[0].x),f=Math.abs(s[0].y),h=Math.abs(s[0].z);u<=l&&(l=u,n.set(1,0,0)),f<=l&&(l=f,n.set(0,1,0)),h<=l&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let d=1;d<=t;d++){if(r[d]=r[d-1].clone(),o[d]=o[d-1].clone(),a.crossVectors(s[d-1],s[d]),a.length()>Number.EPSILON){a.normalize();let g=Math.acos(pe(s[d-1].dot(s[d]),-1,1));r[d].applyMatrix4(c.makeRotationAxis(a,g))}o[d].crossVectors(s[d],r[d])}if(e===!0){let d=Math.acos(pe(r[0].dot(r[t]),-1,1));d/=t,s[0].dot(a.crossVectors(r[0],r[t]))>0&&(d=-d);for(let g=1;g<=t;g++)r[g].applyMatrix4(c.makeRotationAxis(s[g],d*g)),o[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){let t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}},zs=class extends wn{constructor(t=0,e=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(t,e=new Tt){let n=e,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);let a=this.aStartAngle+t*r,c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let u=Math.cos(this.aRotation),f=Math.sin(this.aRotation),h=c-this.aX,d=l-this.aY;c=h*u-d*f+this.aX,l=h*f+d*u+this.aY}return n.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},da=class extends zs{constructor(t,e,n,s,r,o){super(t,e,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}};function rh(){let i=0,t=0,e=0,n=0;function s(r,o,a,c){i=r,t=a,e=-3*r+3*o-2*a-c,n=2*r-2*o+a+c}return{initCatmullRom:function(r,o,a,c,l){s(o,a,l*(a-r),l*(c-o))},initNonuniformCatmullRom:function(r,o,a,c,l,u,f){let h=(o-r)/l-(a-r)/(l+u)+(a-o)/u,d=(a-o)/u-(c-o)/(u+f)+(c-a)/f;h*=u,d*=u,s(o,a,h,d)},calc:function(r){let o=r*r,a=o*r;return i+t*r+e*o+n*a}}}var fu=new O,pu=new O,xc=new rh,_c=new rh,yc=new rh,fa=class extends wn{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new O){let n=e,s=this.points,r=s.length,o=(r-(this.closed?0:1))*t,a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:c===0&&a===r-1&&(a=r-2,c=1);let l,u;this.closed||a>0?l=s[(a-1)%r]:(pu.subVectors(s[0],s[1]).add(s[0]),l=pu);let f=s[a%r],h=s[(a+1)%r];if(this.closed||a+2<r?u=s[(a+2)%r]:(fu.subVectors(s[r-1],s[r-2]).add(s[r-1]),u=fu),this.curveType==="centripetal"||this.curveType==="chordal"){let d=this.curveType==="chordal"?.5:.25,g=Math.pow(l.distanceToSquared(f),d),v=Math.pow(f.distanceToSquared(h),d),p=Math.pow(h.distanceToSquared(u),d);v<1e-4&&(v=1),g<1e-4&&(g=v),p<1e-4&&(p=v),xc.initNonuniformCatmullRom(l.x,f.x,h.x,u.x,g,v,p),_c.initNonuniformCatmullRom(l.y,f.y,h.y,u.y,g,v,p),yc.initNonuniformCatmullRom(l.z,f.z,h.z,u.z,g,v,p)}else this.curveType==="catmullrom"&&(xc.initCatmullRom(l.x,f.x,h.x,u.x,this.tension),_c.initCatmullRom(l.y,f.y,h.y,u.y,this.tension),yc.initCatmullRom(l.z,f.z,h.z,u.z,this.tension));return n.set(xc.calc(c),_c.calc(c),yc.calc(c)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new O().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function mu(i,t,e,n,s){let r=(n-t)*.5,o=(s-e)*.5,a=i*i,c=i*a;return(2*e-2*n+r+o)*c+(-3*e+3*n-2*r-o)*a+r*i+e}function qf(i,t){let e=1-i;return e*e*t}function Yf(i,t){return 2*(1-i)*i*t}function $f(i,t){return i*i*t}function yr(i,t,e,n){return qf(i,t)+Yf(i,e)+$f(i,n)}function Zf(i,t){let e=1-i;return e*e*e*t}function Jf(i,t){let e=1-i;return 3*e*e*i*t}function Kf(i,t){return 3*(1-i)*i*i*t}function jf(i,t){return i*i*i*t}function vr(i,t,e,n,s){return Zf(i,t)+Jf(i,e)+Kf(i,n)+jf(i,s)}var Pr=class extends wn{constructor(t=new Tt,e=new Tt,n=new Tt,s=new Tt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new Tt){let n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(vr(t,s.x,r.x,o.x,a.x),vr(t,s.y,r.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},pa=class extends wn{constructor(t=new O,e=new O,n=new O,s=new O){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new O){let n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(vr(t,s.x,r.x,o.x,a.x),vr(t,s.y,r.y,o.y,a.y),vr(t,s.z,r.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Lr=class extends wn{constructor(t=new Tt,e=new Tt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new Tt){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new Tt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},ma=class extends wn{constructor(t=new O,e=new O){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new O){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new O){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Dr=class extends wn{constructor(t=new Tt,e=new Tt,n=new Tt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new Tt){let n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(yr(t,s.x,r.x,o.x),yr(t,s.y,r.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},ga=class extends wn{constructor(t=new O,e=new O,n=new O){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new O){let n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(yr(t,s.x,r.x,o.x),yr(t,s.y,r.y,o.y),yr(t,s.z,r.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Nr=class extends wn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new Tt){let n=e,s=this.points,r=(s.length-1)*t,o=Math.floor(r),a=r-o,c=s[o===0?o:o-1],l=s[o],u=s[o>s.length-2?s.length-1:o+1],f=s[o>s.length-3?s.length-1:o+2];return n.set(mu(a,c.x,l.x,u.x,f.x),mu(a,c.y,l.y,u.y,f.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new Tt().fromArray(s))}return this}},Ac=Object.freeze({__proto__:null,ArcCurve:da,CatmullRomCurve3:fa,CubicBezierCurve:Pr,CubicBezierCurve3:pa,EllipseCurve:zs,LineCurve:Lr,LineCurve3:ma,QuadraticBezierCurve:Dr,QuadraticBezierCurve3:ga,SplineCurve:Nr}),xa=class extends wn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){let t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){let n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Ac[n](e,t))}return this}getPoint(t,e){let n=t*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=n){let o=s[r]-n,a=this.curves[r],c=a.getLength(),l=c===0?0:1-o/c;return a.getPointAt(l,e)}r++}return null}getLength(){let t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let t=[],e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){let e=[],n;for(let s=0,r=this.curves;s<r.length;s++){let o=r[s],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,c=o.getPoints(a);for(let l=0;l<c.length;l++){let u=c[l];n&&n.equals(u)||(e.push(u),n=u)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){let t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){let s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let s=t.curves[e];this.curves.push(new Ac[s.type]().fromJSON(s))}return this}},Ur=class extends xa{constructor(t){super(),this.type="Path",this.currentPoint=new Tt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){let n=new Lr(this.currentPoint.clone(),new Tt(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){let r=new Dr(this.currentPoint.clone(),new Tt(t,e),new Tt(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,r,o){let a=new Pr(this.currentPoint.clone(),new Tt(t,e),new Tt(n,s),new Tt(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(t){let e=[this.currentPoint.clone()].concat(t),n=new Nr(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,r,o){let a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(t+a,e+c,n,s,r,o),this}absarc(t,e,n,s,r,o){return this.absellipse(t,e,n,n,s,r,o),this}ellipse(t,e,n,s,r,o,a,c){let l=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(t+l,e+u,n,s,r,o,a,c),this}absellipse(t,e,n,s,r,o,a,c){let l=new zs(t,e,n,s,r,o,a,c);if(this.curves.length>0){let f=l.getPoint(0);f.equals(this.currentPoint)||this.lineTo(f.x,f.y)}this.curves.push(l);let u=l.getPoint(1);return this.currentPoint.copy(u),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){let t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}},ss=class extends Ur{constructor(t){super(t),this.uuid=Ys(),this.type="Shape",this.holes=[]}getPointsHoles(t){let e=[];for(let n=0,s=this.holes.length;n<s;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){let s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let s=t.holes[e];this.holes.push(new Ur().fromJSON(s))}return this}};function Qf(i,t,e=2){let n=t&&t.length,s=n?t[0]*e:i.length,r=ud(i,0,s,e,!0),o=[];if(!r||r.next===r.prev)return o;let a,c,l;if(n&&(r=sp(i,t,r,e)),i.length>80*e){a=i[0],c=i[1];let u=a,f=c;for(let h=e;h<s;h+=e){let d=i[h],g=i[h+1];d<a&&(a=d),g<c&&(c=g),d>u&&(u=d),g>f&&(f=g)}l=Math.max(u-a,f-c),l=l!==0?32767/l:0}return Fr(r,o,e,a,c,l,0),o}function ud(i,t,e,n,s){let r;if(s===mp(i,t,e,n)>0)for(let o=t;o<e;o+=n)r=gu(o/n|0,i[o],i[o+1],r);else for(let o=e-n;o>=t;o-=n)r=gu(o/n|0,i[o],i[o+1],r);return r&&ks(r,r.next)&&(Br(r),r=r.next),r}function rs(i,t){if(!i)return i;t||(t=i);let e=i,n;do if(n=!1,!e.steiner&&(ks(e,e.next)||Fe(e.prev,e,e.next)===0)){if(Br(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function Fr(i,t,e,n,s,r,o){if(!i)return;!o&&r&&cp(i,n,s,r);let a=i;for(;i.prev!==i.next;){let c=i.prev,l=i.next;if(r?ep(i,n,s,r):tp(i)){t.push(c.i,i.i,l.i),Br(i),i=l.next,a=l.next;continue}if(i=l,i===a){o?o===1?(i=np(rs(i),t),Fr(i,t,e,n,s,r,2)):o===2&&ip(i,t,e,n,s,r):Fr(rs(i),t,e,n,s,r,1);break}}}function tp(i){let t=i.prev,e=i,n=i.next;if(Fe(t,e,n)>=0)return!1;let s=t.x,r=e.x,o=n.x,a=t.y,c=e.y,l=n.y,u=Math.min(s,r,o),f=Math.min(a,c,l),h=Math.max(s,r,o),d=Math.max(a,c,l),g=n.next;for(;g!==t;){if(g.x>=u&&g.x<=h&&g.y>=f&&g.y<=d&&_r(s,a,r,c,o,l,g.x,g.y)&&Fe(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function ep(i,t,e,n){let s=i.prev,r=i,o=i.next;if(Fe(s,r,o)>=0)return!1;let a=s.x,c=r.x,l=o.x,u=s.y,f=r.y,h=o.y,d=Math.min(a,c,l),g=Math.min(u,f,h),v=Math.max(a,c,l),p=Math.max(u,f,h),m=Ec(d,g,t,e,n),w=Ec(v,p,t,e,n),R=i.prevZ,b=i.nextZ;for(;R&&R.z>=m&&b&&b.z<=w;){if(R.x>=d&&R.x<=v&&R.y>=g&&R.y<=p&&R!==s&&R!==o&&_r(a,u,c,f,l,h,R.x,R.y)&&Fe(R.prev,R,R.next)>=0||(R=R.prevZ,b.x>=d&&b.x<=v&&b.y>=g&&b.y<=p&&b!==s&&b!==o&&_r(a,u,c,f,l,h,b.x,b.y)&&Fe(b.prev,b,b.next)>=0))return!1;b=b.nextZ}for(;R&&R.z>=m;){if(R.x>=d&&R.x<=v&&R.y>=g&&R.y<=p&&R!==s&&R!==o&&_r(a,u,c,f,l,h,R.x,R.y)&&Fe(R.prev,R,R.next)>=0)return!1;R=R.prevZ}for(;b&&b.z<=w;){if(b.x>=d&&b.x<=v&&b.y>=g&&b.y<=p&&b!==s&&b!==o&&_r(a,u,c,f,l,h,b.x,b.y)&&Fe(b.prev,b,b.next)>=0)return!1;b=b.nextZ}return!0}function np(i,t){let e=i;do{let n=e.prev,s=e.next.next;!ks(n,s)&&fd(n,e,e.next,s)&&Or(n,s)&&Or(s,n)&&(t.push(n.i,e.i,s.i),Br(e),Br(e.next),e=i=s),e=e.next}while(e!==i);return rs(e)}function ip(i,t,e,n,s,r){let o=i;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&dp(o,a)){let c=pd(o,a);o=rs(o,o.next),c=rs(c,c.next),Fr(o,t,e,n,s,r,0),Fr(c,t,e,n,s,r,0);return}a=a.next}o=o.next}while(o!==i)}function sp(i,t,e,n){let s=[];for(let r=0,o=t.length;r<o;r++){let a=t[r]*n,c=r<o-1?t[r+1]*n:i.length,l=ud(i,a,c,n,!1);l===l.next&&(l.steiner=!0),s.push(up(l))}s.sort(rp);for(let r=0;r<s.length;r++)e=op(s[r],e);return e}function rp(i,t){let e=i.x-t.x;if(e===0&&(e=i.y-t.y,e===0)){let n=(i.next.y-i.y)/(i.next.x-i.x),s=(t.next.y-t.y)/(t.next.x-t.x);e=n-s}return e}function op(i,t){let e=ap(i,t);if(!e)return t;let n=pd(e,i);return rs(n,n.next),rs(e,e.next)}function ap(i,t){let e=t,n=i.x,s=i.y,r=-1/0,o;if(ks(i,e))return e;do{if(ks(i,e.next))return e.next;if(s<=e.y&&s>=e.next.y&&e.next.y!==e.y){let f=e.x+(s-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(f<=n&&f>r&&(r=f,o=e.x<e.next.x?e:e.next,f===n))return o}e=e.next}while(e!==t);if(!o)return null;let a=o,c=o.x,l=o.y,u=1/0;e=o;do{if(n>=e.x&&e.x>=c&&n!==e.x&&dd(s<l?n:r,s,c,l,s<l?r:n,s,e.x,e.y)){let f=Math.abs(s-e.y)/(n-e.x);Or(e,i)&&(f<u||f===u&&(e.x>o.x||e.x===o.x&&lp(o,e)))&&(o=e,u=f)}e=e.next}while(e!==a);return o}function lp(i,t){return Fe(i.prev,i,t.prev)<0&&Fe(t.next,i,i.next)<0}function cp(i,t,e,n){let s=i;do s.z===0&&(s.z=Ec(s.x,s.y,t,e,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,hp(s)}function hp(i){let t,e=1;do{let n=i,s;i=null;let r=null;for(t=0;n;){t++;let o=n,a=0;for(let l=0;l<e&&(a++,o=o.nextZ,!!o);l++);let c=e;for(;a>0||c>0&&o;)a!==0&&(c===0||!o||n.z<=o.z)?(s=n,n=n.nextZ,a--):(s=o,o=o.nextZ,c--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=o}r.nextZ=null,e*=2}while(t>1);return i}function Ec(i,t,e,n,s){return i=(i-e)*s|0,t=(t-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,i|t<<1}function up(i){let t=i,e=i;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==i);return e}function dd(i,t,e,n,s,r,o,a){return(s-o)*(t-a)>=(i-o)*(r-a)&&(i-o)*(n-a)>=(e-o)*(t-a)&&(e-o)*(r-a)>=(s-o)*(n-a)}function _r(i,t,e,n,s,r,o,a){return!(i===o&&t===a)&&dd(i,t,e,n,s,r,o,a)}function dp(i,t){return i.next.i!==t.i&&i.prev.i!==t.i&&!fp(i,t)&&(Or(i,t)&&Or(t,i)&&pp(i,t)&&(Fe(i.prev,i,t.prev)||Fe(i,t.prev,t))||ks(i,t)&&Fe(i.prev,i,i.next)>0&&Fe(t.prev,t,t.next)>0)}function Fe(i,t,e){return(t.y-i.y)*(e.x-t.x)-(t.x-i.x)*(e.y-t.y)}function ks(i,t){return i.x===t.x&&i.y===t.y}function fd(i,t,e,n){let s=Vo(Fe(i,t,e)),r=Vo(Fe(i,t,n)),o=Vo(Fe(e,n,i)),a=Vo(Fe(e,n,t));return!!(s!==r&&o!==a||s===0&&ko(i,e,t)||r===0&&ko(i,n,t)||o===0&&ko(e,i,n)||a===0&&ko(e,t,n))}function ko(i,t,e){return t.x<=Math.max(i.x,e.x)&&t.x>=Math.min(i.x,e.x)&&t.y<=Math.max(i.y,e.y)&&t.y>=Math.min(i.y,e.y)}function Vo(i){return i>0?1:i<0?-1:0}function fp(i,t){let e=i;do{if(e.i!==i.i&&e.next.i!==i.i&&e.i!==t.i&&e.next.i!==t.i&&fd(e,e.next,i,t))return!0;e=e.next}while(e!==i);return!1}function Or(i,t){return Fe(i.prev,i,i.next)<0?Fe(i,t,i.next)>=0&&Fe(i,i.prev,t)>=0:Fe(i,t,i.prev)<0||Fe(i,i.next,t)<0}function pp(i,t){let e=i,n=!1,s=(i.x+t.x)/2,r=(i.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==i);return n}function pd(i,t){let e=Cc(i.i,i.x,i.y),n=Cc(t.i,t.x,t.y),s=i.next,r=t.prev;return i.next=t,t.prev=i,e.next=s,s.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function gu(i,t,e,n){let s=Cc(i,t,e);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function Br(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Cc(i,t,e){return{i,x:t,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function mp(i,t,e,n){let s=0;for(let r=t,o=e-n;r<e;r+=n)s+=(i[o]-i[r])*(i[r+1]+i[o+1]),o=r;return s}var Rc=class{static triangulate(t,e,n=2){return Qf(t,e,n)}},ts=class i{static area(t){let e=t.length,n=0;for(let s=e-1,r=0;r<e;s=r++)n+=t[s].x*t[r].y-t[r].x*t[s].y;return n*.5}static isClockWise(t){return i.area(t)<0}static triangulateShape(t,e){let n=[],s=[],r=[];xu(t),_u(n,t);let o=t.length;e.forEach(xu);for(let c=0;c<e.length;c++)s.push(o),o+=e[c].length,_u(n,e[c]);let a=Rc.triangulate(n,s);for(let c=0;c<a.length;c+=3)r.push(a.slice(c,c+3));return r}};function xu(i){let t=i.length;t>2&&i[t-1].equals(i[0])&&i.pop()}function _u(i,t){for(let e=0;e<t.length;e++)i.push(t[e].x),i.push(t[e].y)}var Vs=class i extends on{constructor(t=new ss([new Tt(.5,.5),new Tt(-.5,.5),new Tt(-.5,-.5),new Tt(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];let n=this,s=[],r=[];for(let a=0,c=t.length;a<c;a++){let l=t[a];o(l)}this.setAttribute("position",new ke(s,3)),this.setAttribute("uv",new ke(r,2)),this.computeVertexNormals();function o(a){let c=[],l=e.curveSegments!==void 0?e.curveSegments:12,u=e.steps!==void 0?e.steps:1,f=e.depth!==void 0?e.depth:1,h=e.bevelEnabled!==void 0?e.bevelEnabled:!0,d=e.bevelThickness!==void 0?e.bevelThickness:.2,g=e.bevelSize!==void 0?e.bevelSize:d-.1,v=e.bevelOffset!==void 0?e.bevelOffset:0,p=e.bevelSegments!==void 0?e.bevelSegments:3,m=e.extrudePath,w=e.UVGenerator!==void 0?e.UVGenerator:gp,R,b=!1,A,S,I,x;if(m){R=m.getSpacedPoints(u),b=!0,h=!1;let ft=m.isCatmullRomCurve3?m.closed:!1;A=m.computeFrenetFrames(u,ft),S=new O,I=new O,x=new O}h||(p=0,d=0,g=0,v=0);let E=a.extractPoints(l),D=E.shape,P=E.holes;if(!ts.isClockWise(D)){D=D.reverse();for(let ft=0,gt=P.length;ft<gt;ft++){let lt=P[ft];ts.isClockWise(lt)&&(P[ft]=lt.reverse())}}function q(ft){let lt=10000000000000001e-36,pt=ft[0];for(let Et=1;Et<=ft.length;Et++){let Yt=Et%ft.length,Zt=ft[Yt],ee=Zt.x-pt.x,te=Zt.y-pt.y,U=ee*ee+te*te,Se=Math.max(Math.abs(Zt.x),Math.abs(Zt.y),Math.abs(pt.x),Math.abs(pt.y)),ue=lt*Se*Se;if(U<=ue){ft.splice(Yt,1),Et--;continue}pt=Zt}}q(D),P.forEach(q);let N=P.length,z=D;for(let ft=0;ft<N;ft++){let gt=P[ft];D=D.concat(gt)}function Z(ft,gt,lt){return gt||se("ExtrudeGeometry: vec does not exist"),ft.clone().addScaledVector(gt,lt)}let L=D.length;function Q(ft,gt,lt){let pt,Et,Yt,Zt=ft.x-gt.x,ee=ft.y-gt.y,te=lt.x-ft.x,U=lt.y-ft.y,Se=Zt*Zt+ee*ee,ue=Zt*U-ee*te;if(Math.abs(ue)>Number.EPSILON){let C=Math.sqrt(Se),_=Math.sqrt(te*te+U*U),H=gt.x-ee/C,j=gt.y+Zt/C,ot=lt.x-U/_,yt=lt.y+te/_,xt=((ot-H)*U-(yt-j)*te)/(Zt*U-ee*te);pt=H+Zt*xt-ft.x,Et=j+ee*xt-ft.y;let K=pt*pt+Et*Et;if(K<=2)return new Tt(pt,Et);Yt=Math.sqrt(K/2)}else{let C=!1;Zt>Number.EPSILON?te>Number.EPSILON&&(C=!0):Zt<-Number.EPSILON?te<-Number.EPSILON&&(C=!0):Math.sign(ee)===Math.sign(U)&&(C=!0),C?(pt=-ee,Et=Zt,Yt=Math.sqrt(Se)):(pt=Zt,Et=ee,Yt=Math.sqrt(Se/2))}return new Tt(pt/Yt,Et/Yt)}let Y=[];for(let ft=0,gt=z.length,lt=gt-1,pt=ft+1;ft<gt;ft++,lt++,pt++)lt===gt&&(lt=0),pt===gt&&(pt=0),Y[ft]=Q(z[ft],z[lt],z[pt]);let $=[],nt,mt=Y.concat();for(let ft=0,gt=N;ft<gt;ft++){let lt=P[ft];nt=[];for(let pt=0,Et=lt.length,Yt=Et-1,Zt=pt+1;pt<Et;pt++,Yt++,Zt++)Yt===Et&&(Yt=0),Zt===Et&&(Zt=0),nt[pt]=Q(lt[pt],lt[Yt],lt[Zt]);$.push(nt),mt=mt.concat(nt)}let ht;if(p===0)ht=ts.triangulateShape(z,P);else{let ft=[],gt=[];for(let lt=0;lt<p;lt++){let pt=lt/p,Et=d*Math.cos(pt*Math.PI/2),Yt=g*Math.sin(pt*Math.PI/2)+v;for(let Zt=0,ee=z.length;Zt<ee;Zt++){let te=Z(z[Zt],Y[Zt],Yt);Mt(te.x,te.y,-Et),pt===0&&ft.push(te)}for(let Zt=0,ee=N;Zt<ee;Zt++){let te=P[Zt];nt=$[Zt];let U=[];for(let Se=0,ue=te.length;Se<ue;Se++){let C=Z(te[Se],nt[Se],Yt);Mt(C.x,C.y,-Et),pt===0&&U.push(C)}pt===0&&gt.push(U)}}ht=ts.triangulateShape(ft,gt)}let Qt=ht.length,Rt=g+v;for(let ft=0;ft<L;ft++){let gt=h?Z(D[ft],mt[ft],Rt):D[ft];b?(I.copy(A.normals[0]).multiplyScalar(gt.x),S.copy(A.binormals[0]).multiplyScalar(gt.y),x.copy(R[0]).add(I).add(S),Mt(x.x,x.y,x.z)):Mt(gt.x,gt.y,0)}for(let ft=1;ft<=u;ft++)for(let gt=0;gt<L;gt++){let lt=h?Z(D[gt],mt[gt],Rt):D[gt];b?(I.copy(A.normals[ft]).multiplyScalar(lt.x),S.copy(A.binormals[ft]).multiplyScalar(lt.y),x.copy(R[ft]).add(I).add(S),Mt(x.x,x.y,x.z)):Mt(lt.x,lt.y,f/u*ft)}for(let ft=p-1;ft>=0;ft--){let gt=ft/p,lt=d*Math.cos(gt*Math.PI/2),pt=g*Math.sin(gt*Math.PI/2)+v;for(let Et=0,Yt=z.length;Et<Yt;Et++){let Zt=Z(z[Et],Y[Et],pt);Mt(Zt.x,Zt.y,f+lt)}for(let Et=0,Yt=P.length;Et<Yt;Et++){let Zt=P[Et];nt=$[Et];for(let ee=0,te=Zt.length;ee<te;ee++){let U=Z(Zt[ee],nt[ee],pt);b?Mt(U.x,U.y+R[u-1].y,R[u-1].x+lt):Mt(U.x,U.y,f+lt)}}}Kt(),rt();function Kt(){let ft=s.length/3;if(h){let gt=0,lt=L*gt;for(let pt=0;pt<Qt;pt++){let Et=ht[pt];Bt(Et[2]+lt,Et[1]+lt,Et[0]+lt)}gt=u+p*2,lt=L*gt;for(let pt=0;pt<Qt;pt++){let Et=ht[pt];Bt(Et[0]+lt,Et[1]+lt,Et[2]+lt)}}else{for(let gt=0;gt<Qt;gt++){let lt=ht[gt];Bt(lt[2],lt[1],lt[0])}for(let gt=0;gt<Qt;gt++){let lt=ht[gt];Bt(lt[0]+L*u,lt[1]+L*u,lt[2]+L*u)}}n.addGroup(ft,s.length/3-ft,0)}function rt(){let ft=s.length/3,gt=0;ut(z,gt),gt+=z.length;for(let lt=0,pt=P.length;lt<pt;lt++){let Et=P[lt];ut(Et,gt),gt+=Et.length}n.addGroup(ft,s.length/3-ft,1)}function ut(ft,gt){let lt=ft.length;for(;--lt>=0;){let pt=lt,Et=lt-1;Et<0&&(Et=ft.length-1);for(let Yt=0,Zt=u+p*2;Yt<Zt;Yt++){let ee=L*Yt,te=L*(Yt+1),U=gt+pt+ee,Se=gt+Et+ee,ue=gt+Et+te,C=gt+pt+te;Dt(U,Se,ue,C)}}}function Mt(ft,gt,lt){c.push(ft),c.push(gt),c.push(lt)}function Bt(ft,gt,lt){ie(ft),ie(gt),ie(lt);let pt=s.length/3,Et=w.generateTopUV(n,s,pt-3,pt-2,pt-1);Me(Et[0]),Me(Et[1]),Me(Et[2])}function Dt(ft,gt,lt,pt){ie(ft),ie(gt),ie(pt),ie(gt),ie(lt),ie(pt);let Et=s.length/3,Yt=w.generateSideWallUV(n,s,Et-6,Et-3,Et-2,Et-1);Me(Yt[0]),Me(Yt[1]),Me(Yt[3]),Me(Yt[1]),Me(Yt[2]),Me(Yt[3])}function ie(ft){s.push(c[ft*3+0]),s.push(c[ft*3+1]),s.push(c[ft*3+2])}function Me(ft){r.push(ft.x),r.push(ft.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return xp(e,n,t)}static fromJSON(t,e){let n=[];for(let r=0,o=t.shapes.length;r<o;r++){let a=e[t.shapes[r]];n.push(a)}let s=t.options.extrudePath;return s!==void 0&&(t.options.extrudePath=new Ac[s.type]().fromJSON(s)),new i(n,t.options)}},gp={generateTopUV:function(i,t,e,n,s){let r=t[e*3],o=t[e*3+1],a=t[n*3],c=t[n*3+1],l=t[s*3],u=t[s*3+1];return[new Tt(r,o),new Tt(a,c),new Tt(l,u)]},generateSideWallUV:function(i,t,e,n,s,r){let o=t[e*3],a=t[e*3+1],c=t[e*3+2],l=t[n*3],u=t[n*3+1],f=t[n*3+2],h=t[s*3],d=t[s*3+1],g=t[s*3+2],v=t[r*3],p=t[r*3+1],m=t[r*3+2];return Math.abs(a-u)<Math.abs(o-l)?[new Tt(o,1-c),new Tt(l,1-f),new Tt(h,1-g),new Tt(v,1-m)]:[new Tt(a,1-c),new Tt(u,1-f),new Tt(d,1-g),new Tt(p,1-m)]}};function xp(i,t,e){if(e.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){let r=i[n];e.shapes.push(r.uuid)}else e.shapes.push(i.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}var zr=class i extends on{constructor(t=[new Tt(0,-.5),new Tt(.5,0),new Tt(0,.5)],e=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:s},e=Math.floor(e),s=pe(s,0,Math.PI*2);let r=[],o=[],a=[],c=[],l=[],u=1/e,f=new O,h=new Tt,d=new O,g=new O,v=new O,p=0,m=0;for(let w=0;w<=t.length-1;w++)switch(w){case 0:p=t[w+1].x-t[w].x,m=t[w+1].y-t[w].y,d.x=m*1,d.y=-p,d.z=m*0,v.copy(d),d.normalize(),c.push(d.x,d.y,d.z);break;case t.length-1:c.push(v.x,v.y,v.z);break;default:p=t[w+1].x-t[w].x,m=t[w+1].y-t[w].y,d.x=m*1,d.y=-p,d.z=m*0,g.copy(d),d.x+=v.x,d.y+=v.y,d.z+=v.z,d.normalize(),c.push(d.x,d.y,d.z),v.copy(g)}for(let w=0;w<=e;w++){let R=n+w*u*s,b=Math.sin(R),A=Math.cos(R);for(let S=0;S<=t.length-1;S++){f.x=t[S].x*b,f.y=t[S].y,f.z=t[S].x*A,o.push(f.x,f.y,f.z),h.x=w/e,h.y=S/(t.length-1),a.push(h.x,h.y);let I=c[3*S+0]*b,x=c[3*S+1],E=c[3*S+0]*A;l.push(I,x,E)}}for(let w=0;w<e;w++)for(let R=0;R<t.length-1;R++){let b=R+w*t.length,A=b,S=b+t.length,I=b+t.length+1,x=b+1;r.push(A,S,x),r.push(I,x,S)}this.setIndex(r),this.setAttribute("position",new ke(o,3)),this.setAttribute("uv",new ke(a,2)),this.setAttribute("normal",new ke(l,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.points,t.segments,t.phiStart,t.phiLength)}};var os=class i extends on{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};let r=t/2,o=e/2,a=Math.floor(n),c=Math.floor(s),l=a+1,u=c+1,f=t/a,h=e/c,d=[],g=[],v=[],p=[];for(let m=0;m<u;m++){let w=m*h-o;for(let R=0;R<l;R++){let b=R*f-r;g.push(b,-w,0),v.push(0,0,1),p.push(R/a),p.push(1-m/c)}}for(let m=0;m<c;m++)for(let w=0;w<a;w++){let R=w+l*m,b=w+l*(m+1),A=w+1+l*(m+1),S=w+1+l*m;d.push(R,b,S),d.push(b,A,S)}this.setIndex(d),this.setAttribute("position",new ke(g,3)),this.setAttribute("normal",new ke(v,3)),this.setAttribute("uv",new ke(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.widthSegments,t.heightSegments)}};var kr=class extends si{constructor(t){super(),this.isShadowMaterial=!0,this.type="ShadowMaterial",this.color=new oe(0),this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.fog=t.fog,this}};function hs(i){let t={};for(let e in i){t[e]={};for(let n in i[e]){let s=i[e][n];if(yu(s))s.isRenderTargetTexture?(ne("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone();else if(Array.isArray(s))if(yu(s[0])){let r=[];for(let o=0,a=s.length;o<a;o++)r[o]=s[o].clone();t[e][n]=r}else t[e][n]=s.slice();else t[e][n]=s}}return t}function an(i){let t={};for(let e=0;e<i.length;e++){let n=hs(i[e]);for(let s in n)t[s]=n[s]}return t}function yu(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function _p(i){let t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function oh(i){let t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:xe.workingColorSpace}var md={clone:hs,merge:an},yp=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,vp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Tn=class extends si{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=yp,this.fragmentShader=vp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=hs(t.uniforms),this.uniformsGroups=_p(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(let n in t.uniforms){let s=t.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=e[s.value]||null;break;case"c":this.uniforms[n].value=new oe().setHex(s.value);break;case"v2":this.uniforms[n].value=new Tt().fromArray(s.value);break;case"v3":this.uniforms[n].value=new O().fromArray(s.value);break;case"v4":this.uniforms[n].value=new Ue().fromArray(s.value);break;case"m3":this.uniforms[n].value=new le().fromArray(s.value);break;case"m4":this.uniforms[n].value=new Re().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(let n in t.extensions)this.extensions[n]=t.extensions[n];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}},_a=class extends Tn{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},An=class extends si{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new oe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new oe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=yl,this.normalScale=new Tt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Mi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};var ya=class extends si{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Ku,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},va=class extends si{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function As(i,t){return!i||i.constructor===t?i:typeof t.BYTES_PER_ELEMENT=="number"?new t(i):Array.prototype.slice.call(i)}function vc(i){return i!==void 0&&i.inTangents!==void 0&&i.outTangents!==void 0}var Di=class{constructor(t,e,n,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,s=e[n],r=e[n-1];n:{t:{let o;e:{i:if(!(t<s)){for(let a=n+2;;){if(s===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=s,s=e[++n],t<s)break t}o=e.length;break e}if(!(t>=r)){let a=e[1];t<a&&(n=2,r=a);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=e[--n-1],t>=r)break t}o=n,n=0;break e}break n}for(;n<o;){let a=n+o>>>1;t<e[a]?o=a:n=a+1}if(s=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=t*s;for(let o=0;o!==s;++o)e[o]=n[r+o];return e}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},ba=class extends Di{constructor(t,e,n,s){super(t,e,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Sc,endingEnd:Sc}}intervalChanged_(t,e,n){let s=this.parameterPositions,r=t-2,o=t+1,a=s[r],c=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case wc:r=t,a=2*e-n;break;case Tc:r=s.length-2,a=e+s[r]-s[r+1];break;default:r=t,a=n}if(c===void 0)switch(this.getSettings_().endingEnd){case wc:o=t,c=2*n-e;break;case Tc:o=1,c=n+s[1]-s[0];break;default:o=t-1,c=e}let l=(n-e)*.5,u=this.valueSize;this._weightPrev=l/(e-a),this._weightNext=l/(c-n),this._offsetPrev=r*u,this._offsetNext=o*u}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,u=this._offsetPrev,f=this._offsetNext,h=this._weightPrev,d=this._weightNext,g=(n-e)/(s-e),v=g*g,p=v*g,m=-h*p+2*h*v-h*g,w=(1+h)*p+(-1.5-2*h)*v+(-.5+h)*g+1,R=(-1-d)*p+(1.5+d)*v+.5*g,b=d*p-d*v;for(let A=0;A!==a;++A)r[A]=m*o[u+A]+w*o[l+A]+R*o[c+A]+b*o[f+A];return r}},Ma=class extends Di{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,u=(n-e)/(s-e),f=1-u;for(let h=0;h!==a;++h)r[h]=o[l+h]*f+o[c+h]*u;return r}},Sa=class extends Di{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t){return this.copySampleValue_(t-1)}},wa=class extends Di{interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,u=this.inTangents,f=this.outTangents;if(!u||!f){let g=(n-e)/(s-e),v=1-g;for(let p=0;p!==a;++p)r[p]=o[l+p]*v+o[c+p]*g;return r}let h=a*2,d=t-1;for(let g=0;g!==a;++g){let v=o[l+g],p=o[c+g],m=d*h+g*2,w=f[m],R=f[m+1],b=t*h+g*2,A=u[b],S=u[b+1],I=Mp(n,e,w,A,s);r[g]=gd(I,v,R,S,p)}return r}};function gd(i,t,e,n,s){let r=1-i;return r*r*r*t+3*r*r*i*e+3*r*i*i*n+i*i*i*s}function bp(i,t,e,n,s){let r=1-i;return 3*r*r*(e-t)+6*r*i*(n-e)+3*i*i*(s-n)}function Mp(i,t,e,n,s){let r=(i-t)/(s-t);for(let o=0;o<8;o++){let a=gd(r,t,e,n,s)-i;if(Math.abs(a)<1e-10)break;let c=bp(r,t,e,n,s);if(Math.abs(c)<1e-10)break;r=Math.max(0,Math.min(1,r-a/c))}return r}var En=class{constructor(t,e,n,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=As(e,this.TimeBufferType),this.values=As(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:As(t.times,Array),values:As(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(n.interpolation=s),vc(t.settings)&&(n.settings={inTangents:As(t.settings.inTangents,Array),outTangents:As(t.settings.outTangents,Array)})}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new Sa(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Ma(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new ba(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){let e=new wa(this.times,this.values,this.getValueSize(),t);return this.settings&&(e.inTangents=this.settings.inTangents,e.outTangents=this.settings.outTangents),e}setInterpolation(t){let e;switch(t){case br:e=this.InterpolantFactoryMethodDiscrete;break;case na:e=this.InterpolantFactoryMethodLinear;break;case Wo:e=this.InterpolantFactoryMethodSmooth;break;case Mc:e=this.InterpolantFactoryMethodBezier;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return ne("KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return br;case this.InterpolantFactoryMethodLinear:return na;case this.InterpolantFactoryMethodSmooth:return Wo;case this.InterpolantFactoryMethodBezier:return Mc}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]*=t;vc(this.settings)&&(vu(this.settings.inTangents,t),vu(this.settings.outTangents,t))}return this}trim(t,e){let n=this.times,s=n.length,r=0,o=s-1;for(;r!==s&&n[r]<t;)++r;for(;o!==-1&&n[o]>e;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(se("KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,s=this.values,r=n.length;r===0&&(se("KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==r;a++){let c=n[a];if(typeof c=="number"&&isNaN(c)){se("KeyframeTrack: Time is not a valid number.",this,a,c),t=!1;break}if(o!==null&&o>c){se("KeyframeTrack: Out of order keys.",this,a,c,o),t=!1;break}o=c}if(s!==void 0&&Af(s))for(let a=0,c=s.length;a!==c;++a){let l=s[a];if(isNaN(l)){se("KeyframeTrack: Value is not a valid number.",this,a,l),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===Wo,r=t.length-1,o=1;for(let a=1;a<r;++a){let c=!1,l=t[a],u=t[a+1];if(l!==u&&(a!==1||l!==t[0]))if(s)c=!0;else{let f=a*n,h=f-n,d=f+n;for(let g=0;g!==n;++g){let v=e[f+g];if(v!==e[h+g]||v!==e[d+g]){c=!0;break}}}if(c){if(a!==o){t[o]=t[a];let f=a*n,h=o*n;for(let d=0;d!==n;++d)e[h+d]=e[f+d]}++o}}if(r>0){t[o]=t[r];for(let a=r*n,c=o*n,l=0;l!==n;++l)e[c+l]=e[a+l];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,s=new n(this.name,t,e);return s.createInterpolant=this.createInterpolant,vc(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};function vu(i,t){for(let e=0,n=i.length;e!==n;e+=2)i[e]*=t}En.prototype.ValueTypeName="";En.prototype.TimeBufferType=Float32Array;En.prototype.ValueBufferType=Float32Array;En.prototype.DefaultInterpolation=na;var Ni=class extends En{constructor(t,e,n){super(t,e,n)}};Ni.prototype.ValueTypeName="bool";Ni.prototype.ValueBufferType=Array;Ni.prototype.DefaultInterpolation=br;Ni.prototype.InterpolantFactoryMethodLinear=void 0;Ni.prototype.InterpolantFactoryMethodSmooth=void 0;var Ta=class extends En{constructor(t,e,n,s){super(t,e,n,s)}};Ta.prototype.ValueTypeName="color";var Aa=class extends En{constructor(t,e,n,s){super(t,e,n,s)}};Aa.prototype.ValueTypeName="number";var Ea=class extends Di{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(n-e)/(s-e),l=t*a;for(let u=l+a;l!==u;l+=4)ni.slerpFlat(r,0,o,l-a,o,l,c);return r}},Vr=class extends En{constructor(t,e,n,s){super(t,e,n,s)}InterpolantFactoryMethodLinear(t){return new Ea(this.times,this.values,this.getValueSize(),t)}};Vr.prototype.ValueTypeName="quaternion";Vr.prototype.InterpolantFactoryMethodSmooth=void 0;var Ui=class extends En{constructor(t,e,n){super(t,e,n)}};Ui.prototype.ValueTypeName="string";Ui.prototype.ValueBufferType=Array;Ui.prototype.DefaultInterpolation=br;Ui.prototype.InterpolantFactoryMethodLinear=void 0;Ui.prototype.InterpolantFactoryMethodSmooth=void 0;var Ca=class extends En{constructor(t,e,n,s){super(t,e,n,s)}};Ca.prototype.ValueTypeName="vector";var Ra=class{constructor(t,e,n){let s=this,r=!1,o=0,a=0,c,l=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this._abortController=null,this.itemStart=function(u){a++,r===!1&&s.onStart!==void 0&&s.onStart(u,o,a),r=!0},this.itemEnd=function(u){o++,s.onProgress!==void 0&&s.onProgress(u,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(u){s.onError!==void 0&&s.onError(u)},this.resolveURL=function(u){return u=u.normalize("NFC"),c?c(u):u},this.setURLModifier=function(u){return c=u,this},this.addHandler=function(u,f){return l.push(u,f),this},this.removeHandler=function(u){let f=l.indexOf(u);return f!==-1&&l.splice(f,2),this},this.getHandler=function(u){for(let f=0,h=l.length;f<h;f+=2){let d=l[f],g=l[f+1];if(d.global&&(d.lastIndex=0),d.test(u))return g}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},xd=new Ra,Ia=class{constructor(t){this.manager=t!==void 0?t:xd,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,e){let n=this;return new Promise(function(s,r){n.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}};Ia.DEFAULT_MATERIAL_NAME="__DEFAULT";var Gr=class extends Qe{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new oe(t),this.intensity=e}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}},Gs=class extends Gr{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Qe.DEFAULT_UP),this.updateMatrix(),this.groundColor=new oe(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}toJSON(t){let e=super.toJSON(t);return e.object.groundColor=this.groundColor.getHex(),e}},bc=new Re,bu=new O,Mu=new O,Pa=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Tt(512,512),this.mapType=_n,this.map=null,this.mapPass=null,this.matrix=new Re,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Bs,this._frameExtents=new Tt(1,1),this._viewportCount=1,this._viewports=[new Ue(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera;bu.setFromMatrixPosition(t.matrixWorld),e.position.copy(bu),Mu.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Mu),e.updateMatrixWorld(),this._updateMatrix(e,this.matrix,this._frustum)}_updateMatrix(t,e,n,s){bc.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),n.setFromProjectionMatrix(bc,t.coordinateSystem,t.reversedDepth);let r=this._frameExtents,o=s?s.z/r.x:1,a=s?s.w/r.y:1,c=s?s.x/r.x:0,l=s?s.y/r.y:0;t.coordinateSystem===Ps||t.reversedDepth?e.set(.5*o,0,0,.5*o+c,0,.5*a,0,.5*a+l,0,0,1,0,0,0,0,1):e.set(.5*o,0,0,.5*o+c,0,.5*a,0,.5*a+l,0,0,.5,.5,0,0,0,1),e.multiply(bc)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}},Go=new O,Ho=new ni,jn=new O,Hr=class extends Qe{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Re,this.projectionMatrix=new Re,this.projectionMatrixInverse=new Re,this.coordinateSystem=Hn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(Go,Ho,jn),jn.x===1&&jn.y===1&&jn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Go,Ho,jn.set(1,1,1)).invert()}updateWorldMatrix(t,e,n=!1){super.updateWorldMatrix(t,e,n),this.matrixWorld.decompose(Go,Ho,jn),jn.x===1&&jn.y===1&&jn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Go,Ho,jn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Pi=new O,Su=new Tt,wu=new Tt,pn=class extends Hr{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=ia*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(qo*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return ia*2*Math.atan(Math.tan(qo*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Pi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Pi.x,Pi.y).multiplyScalar(-t/Pi.z),Pi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Pi.x,Pi.y).multiplyScalar(-t/Pi.z)}getViewSize(t,e){return this.getViewBounds(t,Su,wu),e.subVectors(wu,Su)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(qo*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,e-=o.offsetY*n/l,s*=o.width/c,n*=o.height/l}let a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}};var Si=class extends Hr{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-t,o=n+t,a=s+e,c=s-e;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=u*this.view.offsetY,c=a-u*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},Ic=class extends Pa{constructor(){super(new Si(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Fi=class extends Gr{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Qe.DEFAULT_UP),this.updateMatrix(),this.target=new Qe,this.shadow=new Ic}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}};var Es=-90,Cs=1,La=class extends Qe{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new pn(Es,Cs,t,e);s.layers=this.layers,this.add(s);let r=new pn(Es,Cs,t,e);r.layers=this.layers,this.add(r);let o=new pn(Es,Cs,t,e);o.layers=this.layers,this.add(o);let a=new pn(Es,Cs,t,e);a.layers=this.layers,this.add(a);let c=new pn(Es,Cs,t,e);c.layers=this.layers,this.add(c);let l=new pn(Es,Cs,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,c]=e;for(let l of e)this.remove(l);if(t===Hn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===Ps)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,c,l,u]=this.children,f=t.getRenderTarget(),h=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;let v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let p=!1;t.isWebGLRenderer===!0?p=t.state.buffers.depth.getReversed():p=t.reversedDepthBuffer,t.setRenderTarget(n,0,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(n,1,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(n,2,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(n,3,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),t.setRenderTarget(n,4,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),n.texture.generateMipmaps=v,t.setRenderTarget(n,5,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,u),t.setRenderTarget(f,h,d),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},Da=class extends pn{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}};var ah="\\[\\]\\.:\\/",Sp=new RegExp("["+ah+"]","g"),lh="[^"+ah+"]",wp="[^"+ah.replace("\\.","")+"]",Tp=/((?:WC+[\/:])*)/.source.replace("WC",lh),Ap=/(WCOD+)?/.source.replace("WCOD",wp),Ep=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",lh),Cp=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",lh),Rp=new RegExp("^"+Tp+Ap+Ep+Cp+"$"),Ip=["material","materials","bones","map"],Pc=class{constructor(t,e,n){let s=n||Le.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},Le=class i{constructor(t,e,n){this.path=e,this.parsedPath=n||i.parseTrackName(e),this.node=i.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new i.Composite(t,e,n):new i(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(Sp,"")}static parseTrackName(t){let e=Rp.exec(t);if(e===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);Ip.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===e||a.uuid===e)return a;let c=n(a.children);if(c)return c}return null},s=n(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)t[e++]=n[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=i.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){ne("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=e.objectIndex;switch(n){case"materials":if(!t.material){se("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){se("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){se("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let u=0;u<t.length;u++)if(t[u].name===l){l=u;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){se("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){se("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){se("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(l!==void 0){if(t[l]===void 0){se("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[l]}}let o=t[s];if(o===void 0){let l=e.nodeName;se("PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?a=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){se("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){se("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Le.Composite=Pc;Le.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Le.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Le.prototype.GetterByBindingType=[Le.prototype._getValue_direct,Le.prototype._getValue_array,Le.prototype._getValue_arrayElement,Le.prototype._getValue_toArray];Le.prototype.SetterByBindingTypeAndVersioning=[[Le.prototype._setValue_direct,Le.prototype._setValue_direct_setNeedsUpdate,Le.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Le.prototype._setValue_array,Le.prototype._setValue_array_setNeedsUpdate,Le.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Le.prototype._setValue_arrayElement,Le.prototype._setValue_arrayElement_setNeedsUpdate,Le.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Le.prototype._setValue_fromArray,Le.prototype._setValue_fromArray_setNeedsUpdate,Le.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var V_=new Float32Array(1);var Tu=new Re,Wr=class{constructor(t,e,n=0,s=1/0){this.ray=new Os(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new Ns,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,e.projectionMatrix.elements[14]).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):se("Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Tu.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Tu),this}intersectObject(t,e=!0,n=[]){return Lc(t,this,n,e),n.sort(Au),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)Lc(t[s],this,n,e);return n.sort(Au),n}};function Au(i,t){return i.distance-t.distance}function Lc(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){let r=i.children;for(let o=0,a=r.length;o<a;o++)Lc(r[o],t,e,!0)}}var Dc=class i{static{i.prototype.isMatrix2=!0}constructor(t,e,n,s){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let n=0;n<4;n++)this.elements[n]=t[n+e];return this}set(t,e,n,s){let r=this.elements;return r[0]=t,r[2]=e,r[1]=n,r[3]=s,this}};function ch(i,t,e,n){let s=Pp(n);switch(e){case jc:return i*t;case th:return i*t/s.components*s.byteLength;case ka:return i*t/s.components*s.byteLength;case Vi:return i*t*2/s.components*s.byteLength;case Va:return i*t*2/s.components*s.byteLength;case Qc:return i*t*3/s.components*s.byteLength;case Ln:return i*t*4/s.components*s.byteLength;case Ga:return i*t*4/s.components*s.byteLength;case $r:case Zr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Jr:case Kr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Wa:case qa:return Math.max(i,16)*Math.max(t,8)/4;case Ha:case Xa:return Math.max(i,8)*Math.max(t,8)/2;case Ya:case $a:case Ja:case Ka:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Za:case jr:case ja:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Qa:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case tl:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case el:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case nl:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case il:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case sl:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case rl:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case ol:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case al:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case ll:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case cl:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case hl:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case ul:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case dl:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case fl:case pl:case ml:return Math.ceil(i/4)*Math.ceil(t/4)*16;case gl:case xl:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Qr:case _l:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Pp(i){switch(i){case _n:case $c:return{byteLength:1,components:1};case Xs:case Zc:case $n:return{byteLength:2,components:1};case Ba:case za:return{byteLength:2,components:4};case qn:case Oa:case Yn:return{byteLength:4,components:1};case Jc:case Kc:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window<"u"&&(window.__THREE__?ne("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function zd(){let i=null,t=!1,e=null,n=null;function s(r,o){n=i.requestAnimationFrame(s),e(r,o)}return{start:function(){t!==!0&&e!==null&&i!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function zp(i){let t=new WeakMap;function e(a,c){let l=a.array,u=a.usage,f=l.byteLength,h=i.createBuffer();i.bindBuffer(c,h),i.bufferData(c,l,u),a.onUploadCallback();let d;if(l instanceof Float32Array)d=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)d=i.HALF_FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?d=i.HALF_FLOAT:d=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)d=i.SHORT;else if(l instanceof Uint32Array)d=i.UNSIGNED_INT;else if(l instanceof Int32Array)d=i.INT;else if(l instanceof Int8Array)d=i.BYTE;else if(l instanceof Uint8Array)d=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)d=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:h,type:d,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:f}}function n(a,c,l){let u=c.array,f=c.updateRanges;if(i.bindBuffer(l,a),f.length===0)i.bufferSubData(l,0,u);else{f.sort((d,g)=>d.start-g.start);let h=0;for(let d=1;d<f.length;d++){let g=f[h],v=f[d];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++h,f[h]=v)}f.length=h+1;for(let d=0,g=f.length;d<g;d++){let v=f[d];i.bufferSubData(l,v.start*u.BYTES_PER_ELEMENT,u,v.start,v.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let c=t.get(a);c&&(i.deleteBuffer(c.buffer),t.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let u=t.get(a);(!u||u.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let l=t.get(a);if(l===void 0)t.set(a,e(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}var kp=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Vp=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Gp=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Hp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Wp=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Xp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,qp=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Yp=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,$p=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,Zp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Jp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Kp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,jp=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Qp=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,tm=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,em=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,nm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,im=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,sm=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,rm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,om=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,am=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,lm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,cm=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,hm=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,um=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,dm=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,fm=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,pm=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,mm=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,gm="gl_FragColor = linearToOutputTexel( gl_FragColor );",xm=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,_m=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,ym=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,vm=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,bm=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Mm=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Sm=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,wm=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Tm=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Am=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Em=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Cm=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Rm=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Im=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Pm=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,Lm=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,Dm=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Nm=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Um=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Fm=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Om=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Bm=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,zm=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,km=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Vm=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Gm=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,Hm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Wm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Xm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,qm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Ym=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,$m=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Zm=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Jm=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Km=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,jm=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Qm=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,tg=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,eg=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ng=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,ig=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,sg=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,rg=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,og=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ag=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,lg=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,cg=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,hg=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,ug=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,dg=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,fg=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,pg=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,mg=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,gg=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,xg=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,_g=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,yg=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,vg=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,bg=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Mg=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,Sg=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,wg=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Tg=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Ag=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Eg=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Cg=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Rg=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Ig=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Pg=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Lg=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Dg=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Ng=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Ug=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Fg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Og=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Bg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,zg=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,kg=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Vg=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Gg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Hg=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Wg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Xg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,qg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Yg=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,$g=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Zg=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,Jg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Kg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,jg=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Qg=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,t0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,e0=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,n0=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,i0=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,s0=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,r0=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,o0=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,a0=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,l0=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,c0=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,h0=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,u0=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,d0=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,f0=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,p0=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,m0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,g0=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,x0=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,_0=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,y0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,fe={alphahash_fragment:kp,alphahash_pars_fragment:Vp,alphamap_fragment:Gp,alphamap_pars_fragment:Hp,alphatest_fragment:Wp,alphatest_pars_fragment:Xp,aomap_fragment:qp,aomap_pars_fragment:Yp,batching_pars_vertex:$p,batching_vertex:Zp,begin_vertex:Jp,beginnormal_vertex:Kp,bsdfs:jp,iridescence_fragment:Qp,bumpmap_pars_fragment:tm,clipping_planes_fragment:em,clipping_planes_pars_fragment:nm,clipping_planes_pars_vertex:im,clipping_planes_vertex:sm,color_fragment:rm,color_pars_fragment:om,color_pars_vertex:am,color_vertex:lm,common:cm,cube_uv_reflection_fragment:hm,defaultnormal_vertex:um,displacementmap_pars_vertex:dm,displacementmap_vertex:fm,emissivemap_fragment:pm,emissivemap_pars_fragment:mm,colorspace_fragment:gm,colorspace_pars_fragment:xm,envmap_fragment:_m,envmap_common_pars_fragment:ym,envmap_pars_fragment:vm,envmap_pars_vertex:bm,envmap_physical_pars_fragment:Lm,envmap_vertex:Mm,fog_vertex:Sm,fog_pars_vertex:wm,fog_fragment:Tm,fog_pars_fragment:Am,gradientmap_pars_fragment:Em,lightmap_pars_fragment:Cm,lights_lambert_fragment:Rm,lights_lambert_pars_fragment:Im,lights_pars_begin:Pm,lights_toon_fragment:Dm,lights_toon_pars_fragment:Nm,lights_phong_fragment:Um,lights_phong_pars_fragment:Fm,lights_physical_fragment:Om,lights_physical_pars_fragment:Bm,lights_fragment_begin:zm,lights_fragment_maps:km,lights_fragment_end:Vm,lightprobes_pars_fragment:Gm,logdepthbuf_fragment:Hm,logdepthbuf_pars_fragment:Wm,logdepthbuf_pars_vertex:Xm,logdepthbuf_vertex:qm,map_fragment:Ym,map_pars_fragment:$m,map_particle_fragment:Zm,map_particle_pars_fragment:Jm,metalnessmap_fragment:Km,metalnessmap_pars_fragment:jm,morphinstance_vertex:Qm,morphcolor_vertex:tg,morphnormal_vertex:eg,morphtarget_pars_vertex:ng,morphtarget_vertex:ig,normal_fragment_begin:sg,normal_fragment_maps:rg,normal_pars_fragment:og,normal_pars_vertex:ag,normal_vertex:lg,normalmap_pars_fragment:cg,clearcoat_normal_fragment_begin:hg,clearcoat_normal_fragment_maps:ug,clearcoat_pars_fragment:dg,iridescence_pars_fragment:fg,opaque_fragment:pg,packing:mg,premultiplied_alpha_fragment:gg,project_vertex:xg,dithering_fragment:_g,dithering_pars_fragment:yg,roughnessmap_fragment:vg,roughnessmap_pars_fragment:bg,shadowmap_pars_fragment:Mg,shadowmap_pars_vertex:Sg,shadowmap_vertex:wg,shadowmask_pars_fragment:Tg,skinbase_vertex:Ag,skinning_pars_vertex:Eg,skinning_vertex:Cg,skinnormal_vertex:Rg,specularmap_fragment:Ig,specularmap_pars_fragment:Pg,tonemapping_fragment:Lg,tonemapping_pars_fragment:Dg,transmission_fragment:Ng,transmission_pars_fragment:Ug,uv_pars_fragment:Fg,uv_pars_vertex:Og,uv_vertex:Bg,worldpos_vertex:zg,background_vert:kg,background_frag:Vg,backgroundCube_vert:Gg,backgroundCube_frag:Hg,cube_vert:Wg,cube_frag:Xg,depth_vert:qg,depth_frag:Yg,distance_vert:$g,distance_frag:Zg,equirect_vert:Jg,equirect_frag:Kg,linedashed_vert:jg,linedashed_frag:Qg,meshbasic_vert:t0,meshbasic_frag:e0,meshlambert_vert:n0,meshlambert_frag:i0,meshmatcap_vert:s0,meshmatcap_frag:r0,meshnormal_vert:o0,meshnormal_frag:a0,meshphong_vert:l0,meshphong_frag:c0,meshphysical_vert:h0,meshphysical_frag:u0,meshtoon_vert:d0,meshtoon_frag:f0,points_vert:p0,points_frag:m0,shadow_vert:g0,shadow_frag:x0,sprite_vert:_0,sprite_frag:y0},Nt={common:{diffuse:{value:new oe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new le},alphaMap:{value:null},alphaMapTransform:{value:new le},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new le}},envmap:{envMap:{value:null},envMapRotation:{value:new le},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new le}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new le}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new le},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new le},normalScale:{value:new Tt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new le},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new le}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new le}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new le}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new oe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new O},probesMax:{value:new O},probesResolution:{value:new O}},points:{diffuse:{value:new oe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new le},alphaTest:{value:0},uvTransform:{value:new le}},sprite:{diffuse:{value:new oe(16777215)},opacity:{value:1},center:{value:new Tt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new le},alphaMap:{value:null},alphaMapTransform:{value:new le},alphaTest:{value:0}}},ci={basic:{uniforms:an([Nt.common,Nt.specularmap,Nt.envmap,Nt.aomap,Nt.lightmap,Nt.fog]),vertexShader:fe.meshbasic_vert,fragmentShader:fe.meshbasic_frag},lambert:{uniforms:an([Nt.common,Nt.specularmap,Nt.envmap,Nt.aomap,Nt.lightmap,Nt.emissivemap,Nt.bumpmap,Nt.normalmap,Nt.displacementmap,Nt.fog,Nt.lights,{emissive:{value:new oe(0)},envMapIntensity:{value:1}}]),vertexShader:fe.meshlambert_vert,fragmentShader:fe.meshlambert_frag},phong:{uniforms:an([Nt.common,Nt.specularmap,Nt.envmap,Nt.aomap,Nt.lightmap,Nt.emissivemap,Nt.bumpmap,Nt.normalmap,Nt.displacementmap,Nt.fog,Nt.lights,{emissive:{value:new oe(0)},specular:{value:new oe(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:fe.meshphong_vert,fragmentShader:fe.meshphong_frag},standard:{uniforms:an([Nt.common,Nt.envmap,Nt.aomap,Nt.lightmap,Nt.emissivemap,Nt.bumpmap,Nt.normalmap,Nt.displacementmap,Nt.roughnessmap,Nt.metalnessmap,Nt.fog,Nt.lights,{emissive:{value:new oe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:fe.meshphysical_vert,fragmentShader:fe.meshphysical_frag},toon:{uniforms:an([Nt.common,Nt.aomap,Nt.lightmap,Nt.emissivemap,Nt.bumpmap,Nt.normalmap,Nt.displacementmap,Nt.gradientmap,Nt.fog,Nt.lights,{emissive:{value:new oe(0)}}]),vertexShader:fe.meshtoon_vert,fragmentShader:fe.meshtoon_frag},matcap:{uniforms:an([Nt.common,Nt.bumpmap,Nt.normalmap,Nt.displacementmap,Nt.fog,{matcap:{value:null}}]),vertexShader:fe.meshmatcap_vert,fragmentShader:fe.meshmatcap_frag},points:{uniforms:an([Nt.points,Nt.fog]),vertexShader:fe.points_vert,fragmentShader:fe.points_frag},dashed:{uniforms:an([Nt.common,Nt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:fe.linedashed_vert,fragmentShader:fe.linedashed_frag},depth:{uniforms:an([Nt.common,Nt.displacementmap]),vertexShader:fe.depth_vert,fragmentShader:fe.depth_frag},normal:{uniforms:an([Nt.common,Nt.bumpmap,Nt.normalmap,Nt.displacementmap,{opacity:{value:1}}]),vertexShader:fe.meshnormal_vert,fragmentShader:fe.meshnormal_frag},sprite:{uniforms:an([Nt.sprite,Nt.fog]),vertexShader:fe.sprite_vert,fragmentShader:fe.sprite_frag},background:{uniforms:{uvTransform:{value:new le},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:fe.background_vert,fragmentShader:fe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new le}},vertexShader:fe.backgroundCube_vert,fragmentShader:fe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:fe.cube_vert,fragmentShader:fe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:fe.equirect_vert,fragmentShader:fe.equirect_frag},distance:{uniforms:an([Nt.common,Nt.displacementmap,{referencePosition:{value:new O},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:fe.distance_vert,fragmentShader:fe.distance_frag},shadow:{uniforms:an([Nt.lights,Nt.fog,{color:{value:new oe(0)},opacity:{value:1}}]),vertexShader:fe.shadow_vert,fragmentShader:fe.shadow_frag}};ci.physical={uniforms:an([ci.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new le},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new le},clearcoatNormalScale:{value:new Tt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new le},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new le},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new le},sheen:{value:0},sheenColor:{value:new oe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new le},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new le},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new le},transmissionSamplerSize:{value:new Tt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new le},attenuationDistance:{value:0},attenuationColor:{value:new oe(0)},specularColor:{value:new oe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new le},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new le},anisotropyVector:{value:new Tt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new le}}]),vertexShader:fe.meshphysical_vert,fragmentShader:fe.meshphysical_frag};var Sl={r:0,b:0,g:0},v0=new Re,kd=new le;kd.set(-1,0,0,0,1,0,0,0,1);function b0(i,t,e,n,s,r){let o=new oe(0),a=s===!0?0:1,c,l,u=null,f=0,h=null;function d(w){let R=w.isScene===!0?w.background:null;if(R&&R.isTexture){let b=w.backgroundBlurriness>0;R=t.get(R,b)}return R}function g(w){let R=!1,b=d(w);b===null?p(o,a):b&&b.isColor&&(p(b,1),R=!0);let A=i.xr.getEnvironmentBlendMode();A==="additive"?e.buffers.color.setClear(0,0,0,1,r):A==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(i.autoClear||R)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function v(w,R){let b=d(R);b&&(b.isCubeTexture||b.mapping===qr)?(l===void 0&&(l=new De(new Pn(1,1,1),new Tn({name:"BackgroundCubeMaterial",uniforms:hs(ci.backgroundCube.uniforms),vertexShader:ci.backgroundCube.vertexShader,fragmentShader:ci.backgroundCube.fragmentShader,side:tn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(A,S,I){this.matrixWorld.copyPosition(I.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),l.material.uniforms.envMap.value=b,l.material.uniforms.backgroundBlurriness.value=R.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=R.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(v0.makeRotationFromEuler(R.backgroundRotation)).transpose(),b.isCubeTexture&&b.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(kd),l.material.toneMapped=xe.getTransfer(b.colorSpace)!==we,(u!==b||f!==b.version||h!==i.toneMapping)&&(l.material.needsUpdate=!0,u=b,f=b.version,h=i.toneMapping),l.layers.enableAll(),w.unshift(l,l.geometry,l.material,0,0,null)):b&&b.isTexture&&(c===void 0&&(c=new De(new os(2,2),new Tn({name:"BackgroundMaterial",uniforms:hs(ci.background.uniforms),vertexShader:ci.background.vertexShader,fragmentShader:ci.background.fragmentShader,side:Oi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=b,c.material.uniforms.backgroundIntensity.value=R.backgroundIntensity,c.material.toneMapped=xe.getTransfer(b.colorSpace)!==we,b.matrixAutoUpdate===!0&&b.updateMatrix(),c.material.uniforms.uvTransform.value.copy(b.matrix),(u!==b||f!==b.version||h!==i.toneMapping)&&(c.material.needsUpdate=!0,u=b,f=b.version,h=i.toneMapping),c.layers.enableAll(),w.unshift(c,c.geometry,c.material,0,0,null))}function p(w,R){w.getRGB(Sl,oh(i)),e.buffers.color.setClear(Sl.r,Sl.g,Sl.b,R,r)}function m(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(w,R=1){o.set(w),a=R,p(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(w){a=w,p(o,a)},render:g,addToRenderList:v,dispose:m}}function M0(i,t){let e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=h(null),r=s,o=!1;function a(P,V,q,N,z){let Z=!1,L=f(P,N,q,V);r!==L&&(r=L,l(r.object)),Z=d(P,N,q,z),Z&&g(P,N,q,z),z!==null&&t.update(z,i.ELEMENT_ARRAY_BUFFER),(Z||o)&&(o=!1,b(P,V,q,N),z!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(z).buffer))}function c(){return i.createVertexArray()}function l(P){return i.bindVertexArray(P)}function u(P){return i.deleteVertexArray(P)}function f(P,V,q,N){let z=N.wireframe===!0,Z=n[V.id];Z===void 0&&(Z={},n[V.id]=Z);let L=P.isInstancedMesh===!0?P.id:0,Q=Z[L];Q===void 0&&(Q={},Z[L]=Q);let Y=Q[q.id];Y===void 0&&(Y={},Q[q.id]=Y);let $=Y[z];return $===void 0&&($=h(c()),Y[z]=$),$}function h(P){let V=[],q=[],N=[];for(let z=0;z<e;z++)V[z]=0,q[z]=0,N[z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:V,enabledAttributes:q,attributeDivisors:N,object:P,attributes:{},index:null}}function d(P,V,q,N){let z=r.attributes,Z=V.attributes,L=0,Q=q.getAttributes();for(let Y in Q)if(Q[Y].location>=0){let nt=z[Y],mt=Z[Y];if(mt===void 0&&(Y==="instanceMatrix"&&P.instanceMatrix&&(mt=P.instanceMatrix),Y==="instanceColor"&&P.instanceColor&&(mt=P.instanceColor)),nt===void 0||nt.attribute!==mt||mt&&nt.data!==mt.data)return!0;L++}return r.attributesNum!==L||r.index!==N}function g(P,V,q,N){let z={},Z=V.attributes,L=0,Q=q.getAttributes();for(let Y in Q)if(Q[Y].location>=0){let nt=Z[Y];nt===void 0&&(Y==="instanceMatrix"&&P.instanceMatrix&&(nt=P.instanceMatrix),Y==="instanceColor"&&P.instanceColor&&(nt=P.instanceColor));let mt={};mt.attribute=nt,nt&&nt.data&&(mt.data=nt.data),z[Y]=mt,L++}r.attributes=z,r.attributesNum=L,r.index=N}function v(){let P=r.newAttributes;for(let V=0,q=P.length;V<q;V++)P[V]=0}function p(P){m(P,0)}function m(P,V){let q=r.newAttributes,N=r.enabledAttributes,z=r.attributeDivisors;q[P]=1,N[P]===0&&(i.enableVertexAttribArray(P),N[P]=1),z[P]!==V&&(i.vertexAttribDivisor(P,V),z[P]=V)}function w(){let P=r.newAttributes,V=r.enabledAttributes;for(let q=0,N=V.length;q<N;q++)V[q]!==P[q]&&(i.disableVertexAttribArray(q),V[q]=0)}function R(P,V,q,N,z,Z,L){L===!0?i.vertexAttribIPointer(P,V,q,z,Z):i.vertexAttribPointer(P,V,q,N,z,Z)}function b(P,V,q,N){v();let z=N.attributes,Z=q.getAttributes(),L=V.defaultAttributeValues;for(let Q in Z){let Y=Z[Q];if(Y.location>=0){let $=z[Q];if($===void 0&&(Q==="instanceMatrix"&&P.instanceMatrix&&($=P.instanceMatrix),Q==="instanceColor"&&P.instanceColor&&($=P.instanceColor)),$!==void 0){let nt=$.normalized,mt=$.itemSize,ht=t.get($);if(ht===void 0)continue;let Qt=ht.buffer,Rt=ht.type,Kt=ht.bytesPerElement,rt=Rt===i.INT||Rt===i.UNSIGNED_INT||$.gpuType===Oa;if($.isInterleavedBufferAttribute){let ut=$.data,Mt=ut.stride,Bt=$.offset;if(ut.isInstancedInterleavedBuffer){for(let Dt=0;Dt<Y.locationSize;Dt++)m(Y.location+Dt,ut.meshPerAttribute);P.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=ut.meshPerAttribute*ut.count)}else for(let Dt=0;Dt<Y.locationSize;Dt++)p(Y.location+Dt);i.bindBuffer(i.ARRAY_BUFFER,Qt);for(let Dt=0;Dt<Y.locationSize;Dt++)R(Y.location+Dt,mt/Y.locationSize,Rt,nt,Mt*Kt,(Bt+mt/Y.locationSize*Dt)*Kt,rt)}else{if($.isInstancedBufferAttribute){for(let ut=0;ut<Y.locationSize;ut++)m(Y.location+ut,$.meshPerAttribute);P.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=$.meshPerAttribute*$.count)}else for(let ut=0;ut<Y.locationSize;ut++)p(Y.location+ut);i.bindBuffer(i.ARRAY_BUFFER,Qt);for(let ut=0;ut<Y.locationSize;ut++)R(Y.location+ut,mt/Y.locationSize,Rt,nt,mt*Kt,mt/Y.locationSize*ut*Kt,rt)}}else if(L!==void 0){let nt=L[Q];if(nt!==void 0)switch(nt.length){case 2:i.vertexAttrib2fv(Y.location,nt);break;case 3:i.vertexAttrib3fv(Y.location,nt);break;case 4:i.vertexAttrib4fv(Y.location,nt);break;default:i.vertexAttrib1fv(Y.location,nt)}}}}w()}function A(){E();for(let P in n){let V=n[P];for(let q in V){let N=V[q];for(let z in N){let Z=N[z];for(let L in Z)u(Z[L].object),delete Z[L];delete N[z]}}delete n[P]}}function S(P){if(n[P.id]===void 0)return;let V=n[P.id];for(let q in V){let N=V[q];for(let z in N){let Z=N[z];for(let L in Z)u(Z[L].object),delete Z[L];delete N[z]}}delete n[P.id]}function I(P){for(let V in n){let q=n[V];for(let N in q){let z=q[N];if(z[P.id]===void 0)continue;let Z=z[P.id];for(let L in Z)u(Z[L].object),delete Z[L];delete z[P.id]}}}function x(P){for(let V in n){let q=n[V],N=P.isInstancedMesh===!0?P.id:0,z=q[N];if(z!==void 0){for(let Z in z){let L=z[Z];for(let Q in L)u(L[Q].object),delete L[Q];delete z[Z]}delete q[N],Object.keys(q).length===0&&delete n[V]}}}function E(){D(),o=!0,r!==s&&(r=s,l(r.object))}function D(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:E,resetDefaultState:D,dispose:A,releaseStatesOfGeometry:S,releaseStatesOfObject:x,releaseStatesOfProgram:I,initAttributes:v,enableAttribute:p,disableUnusedAttributes:w}}function S0(i,t,e){let n;function s(c){n=c}function r(c,l){i.drawArrays(n,c,l),e.update(l,n,1)}function o(c,l,u){u!==0&&(i.drawArraysInstanced(n,c,l,u),e.update(l,n,u))}function a(c,l,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,l,0,u);let h=0;for(let d=0;d<u;d++)h+=l[d];e.update(h,n,1)}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a}function w0(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let I=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(I.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(I){return!(I!==Ln&&n.convert(I)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(I){let x=I===$n&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(I!==_n&&I!==Yn&&!x&&n.convert(I)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function c(I){if(I==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";I="mediump"}return I==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp",u=c(l);u!==l&&(ne("WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);let f=e.logarithmicDepthBuffer===!0,h=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control");e.reversedDepthBuffer===!0&&h===!1&&ne("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_TEXTURE_SIZE),p=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),m=i.getParameter(i.MAX_VERTEX_ATTRIBS),w=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),R=i.getParameter(i.MAX_VARYING_VECTORS),b=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),A=i.getParameter(i.MAX_SAMPLES),S=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:f,reversedDepthBuffer:h,maxTextures:d,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:p,maxAttributes:m,maxVertexUniforms:w,maxVaryings:R,maxFragmentUniforms:b,maxSamples:A,samples:S}}function T0(i){let t=this,e=null,n=0,s=!1,r=!1,o=new Gn,a=new le,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(f,h){let d=f.length!==0||h||n!==0||s;return s=h,n=f.length,d},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,h){e=u(f,h,0)},this.setState=function(f,h,d){let g=f.clippingPlanes,v=f.clipIntersection,p=f.clipShadows,m=i.get(f);if(!s||g===null||g.length===0||r&&!p)r?u(null):l();else{let w=r?0:n,R=w*4,b=m.clippingState||null;c.value=b,b=u(g,h,R,d);for(let A=0;A!==R;++A)b[A]=e[A];m.clippingState=b,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=w}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function u(f,h,d,g){let v=f!==null?f.length:0,p=null;if(v!==0){if(p=c.value,g!==!0||p===null){let m=d+v*4,w=h.matrixWorldInverse;a.getNormalMatrix(w),(p===null||p.length<m)&&(p=new Float32Array(m));for(let R=0,b=d;R!==v;++R,b+=4)o.copy(f[R]).applyMatrix4(w,a),o.normal.toArray(p,b),p[b+3]=o.constant}c.value=p,c.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,p}}var Zs=4,A0=6,E0=20,C0=256,to=new Si,_d=new oe,hh=null,uh=0,dh=0,fh=!1,R0=new O,us=new O,Tl=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,n=.1,s=100,r={}){let{size:o=256,position:a=R0}=r;hh=this._renderer.getRenderTarget(),uh=this._renderer.getActiveCubeFace(),dh=this._renderer.getActiveMipmapLevel(),fh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);let c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,n,s,c,a),e>0&&this._blur(c,0,0,e),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=bd(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=vd(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(hh,uh,dh),this._renderer.xr.enabled=fh,t.scissorTest=!1,$s(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Bi||t.mapping===cs?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),hh=this._renderer.getRenderTarget(),uh=this._renderer.getActiveCubeFace(),dh=this._renderer.getActiveMipmapLevel(),fh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:je,minFilter:je,generateMipmaps:!1,type:$n,format:Ln,colorSpace:Mr,depthBuffer:!1},s=yd(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=yd(t,e,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=I0(r)),this._blurMaterial=L0(r,t,e),this._ggxMaterial=P0(r,t,e)}return s}_compileMaterial(t){let e=new De(new on,t);this._renderer.compile(e,to)}_sceneToCubeUV(t,e,n,s,r){let c=new pn(90,1,e,n),l=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],f=this._renderer,h=f.autoClear,d=f.toneMapping;f.getClearColor(_d),f.toneMapping=Xn,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(s),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new De(new Pn,new ri({name:"PMREM.Background",side:tn,depthWrite:!1,depthTest:!1})));let v=this._backgroundBox,p=v.material,m=!1,w=t.background;w?w.isColor&&(p.color.copy(w),t.background=null,m=!0):(p.color.copy(_d),m=!0);for(let R=0;R<6;R++){let b=R%3;b===0?(c.up.set(0,l[R],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+u[R],r.y,r.z)):b===1?(c.up.set(0,0,l[R]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+u[R],r.z)):(c.up.set(0,l[R],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+u[R]));let A=this._cubeSize;$s(s,b*A,R>2?A:0,A,A),f.setRenderTarget(s),m&&f.render(v,c),f.render(t,c)}f.toneMapping=d,f.autoClear=h,t.background=w}_textureToCubeUV(t,e){let n=this._renderer,s=t.mapping===Bi||t.mapping===cs;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=bd()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=vd());let r=s?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=r;let a=r.uniforms;a.envMap.value=t;let c=this._cubeSize;$s(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(o,to)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;let s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(t,r-1,r);e.autoClear=n}_applyGGXFilter(t,e,n){let s=this._renderer,r=this._pingPongRenderTarget,o=this._ggxMaterial,a=this._lodMeshes[n];a.material=o;let c=o.uniforms,l=n/(this._lodMeshes.length-1),u=e/(this._lodMeshes.length-1),f=Math.sqrt(l*l-u*u),h=l*1.25,d=f*h,{_lodMax:g}=this,v=this._sizeLods[n],p=3*v*(n>g-Zs?n-g+Zs:0),m=4*(this._cubeSize-v);c.envMap.value=t.texture,c.roughness.value=d,c.mipInt.value=g-e,$s(r,p,m,3*v,2*v),s.setRenderTarget(r),s.render(a,to),c.envMap.value=r.texture,c.roughness.value=0,c.mipInt.value=g-n,$s(t,p,m,3*v,2*v),s.setRenderTarget(t),s.render(a,to)}_blur(t,e,n,s){let r=this._pingPongRenderTarget,o=Math.min(s,Math.PI)/Math.SQRT2;this._blurPass(t,r,e,n,o),this._blurPass(r,t,n,n,o)}_blurPass(t,e,n,s,r){let o=this._renderer,a=this._blurMaterial,c=this._lodMeshes[s];c.material=a;let l=a.uniforms;l.envMap.value=t.texture,l.sigma.value=r,l.mipInt.value=this._lodMax-n;let u=this._sizeLods[s],f=3*u*(s>this._lodMax-Zs?s-this._lodMax+Zs:0),h=4*(this._cubeSize-u);$s(e,f,h,3*u,2*u),o.setRenderTarget(e),o.render(c,to)}};function I0(i){let t=[],e=[],n=i,s=i-Zs+1+A0;for(let r=0;r<s;r++){let o=Math.pow(2,n);t.push(o);let a=1/(o-2),c=-a,l=1+a,u=[c,c,l,c,l,l,c,c,l,l,c,l],f=6,h=6,d=3,g=new Float32Array(d*h*f),v=new Float32Array(d*h*f);for(let m=0;m<f;m++){let w=m%3*2/3-1,R=m>2?0:-1,b=[w,R,0,w+2/3,R,0,w+2/3,R+1,0,w,R,0,w+2/3,R+1,0,w,R+1,0];g.set(b,d*h*m);for(let A=0;A<h;A++){let S=u[A*2]*2-1,I=u[A*2+1]*2-1;m===0?us.set(1,I,S):m===1?us.set(-S,1,-I):m===2?us.set(-S,I,1):m===3?us.set(-1,I,-S):m===4?us.set(-S,-1,I):us.set(S,I,-1),us.toArray(v,(m*h+A)*d)}}let p=new on;p.setAttribute("position",new mn(g,d)),p.setAttribute("outputDirection",new mn(v,d)),e.push(new De(p,null)),n>Zs&&n--}return{lodMeshes:e,sizeLods:t}}function yd(i,t,e){let n=new xn(i,t,e);return n.texture.mapping=qr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function $s(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function P0(i,t,e){return new Tn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:C0,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Cl(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:ai,depthTest:!1,depthWrite:!1})}function L0(i,t,e){return new Tn({name:"SphericalGaussianBlur",defines:{SAMPLES:E0,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Cl(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:ai,depthTest:!1,depthWrite:!1})}function vd(){return new Tn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Cl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:ai,depthTest:!1,depthWrite:!1})}function bd(){return new Tn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Cl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ai,depthTest:!1,depthWrite:!1})}function Cl(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var Al=class extends xn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new Cr(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Pn(5,5,5),r=new Tn({name:"CubemapFromEquirect",uniforms:hs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:tn,blending:ai});r.uniforms.tEquirect.value=e;let o=new De(s,r),a=e.minFilter;return e.minFilter===zi&&(e.minFilter=je),new La(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){let r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}};function D0(i){let t=new WeakMap,e=new WeakMap,n=null;function s(h,d=!1){return h==null?null:d?o(h):r(h)}function r(h){if(h&&h.isTexture){let d=h.mapping;if(d===Na||d===Ua)if(t.has(h)){let g=t.get(h).texture;return a(g,h.mapping)}else{let g=h.image;if(g&&g.height>0){let v=new Al(g.height);return v.fromEquirectangularTexture(i,h),t.set(h,v),h.addEventListener("dispose",l),a(v.texture,h.mapping)}else return null}}return h}function o(h){if(h&&h.isTexture){let d=h.mapping,g=d===Na||d===Ua,v=d===Bi||d===cs;if(g||v){let p=e.get(h),m=p!==void 0?p.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==m)return n===null&&(n=new Tl(i)),p=g?n.fromEquirectangular(h,p):n.fromCubemap(h,p),p.texture.pmremVersion=h.pmremVersion,e.set(h,p),p.texture;if(p!==void 0)return p.texture;{let w=h.image;return g&&w&&w.height>0||v&&w&&c(w)?(n===null&&(n=new Tl(i)),p=g?n.fromEquirectangular(h):n.fromCubemap(h),p.texture.pmremVersion=h.pmremVersion,e.set(h,p),h.addEventListener("dispose",u),p.texture):null}}}return h}function a(h,d){return d===Na?h.mapping=Bi:d===Ua&&(h.mapping=cs),h}function c(h){let d=0,g=6;for(let v=0;v<g;v++)h[v]!==void 0&&d++;return d===g}function l(h){let d=h.target;d.removeEventListener("dispose",l);let g=t.get(d);g!==void 0&&(t.delete(d),g.dispose())}function u(h){let d=h.target;d.removeEventListener("dispose",u);let g=e.get(d);g!==void 0&&(e.delete(d),g.dispose())}function f(){t=new WeakMap,e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:f}}function N0(i){let t={};function e(n){if(t[n]!==void 0)return t[n];let s=i.getExtension(n);return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let s=e(n);return s===null&&es("WebGLRenderer: "+n+" extension not supported."),s}}}function U0(i,t,e,n){let s={},r=new WeakMap;function o(f){let h=f.target;h.index!==null&&t.remove(h.index);for(let g in h.attributes)t.remove(h.attributes[g]);h.removeEventListener("dispose",o),delete s[h.id];let d=r.get(h);d&&(t.remove(d),r.delete(h)),n.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,e.memory.geometries--}function a(f,h){return s[h.id]===!0||(h.addEventListener("dispose",o),s[h.id]=!0,e.memory.geometries++),h}function c(f){let h=f.attributes;for(let d in h)t.update(h[d],i.ARRAY_BUFFER)}function l(f){let h=[],d=f.index,g=f.attributes.position,v=0;if(g===void 0)return;if(d!==null){let w=d.array;v=d.version;for(let R=0,b=w.length;R<b;R+=3){let A=w[R+0],S=w[R+1],I=w[R+2];h.push(A,S,S,I,I,A)}}else{let w=g.array;v=g.version;for(let R=0,b=w.length/3-1;R<b;R+=3){let A=R+0,S=R+1,I=R+2;h.push(A,S,S,I,I,A)}}let p=new(g.count>=65535?Er:Ar)(h,1);p.version=v;let m=r.get(f);m&&t.remove(m),r.set(f,p)}function u(f){let h=r.get(f);if(h){let d=f.index;d!==null&&h.version<d.version&&l(f)}else l(f);return r.get(f)}return{get:a,update:c,getWireframeAttribute:u}}function F0(i,t,e){let n;function s(f){n=f}let r,o;function a(f){r=f.type,o=f.bytesPerElement}function c(f,h){i.drawElements(n,h,r,f*o),e.update(h,n,1)}function l(f,h,d){d!==0&&(i.drawElementsInstanced(n,h,r,f*o,d),e.update(h,n,d))}function u(f,h,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,h,0,r,f,0,d);let v=0;for(let p=0;p<d;p++)v+=h[p];e.update(v,n,1)}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function O0(i){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:se("WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function B0(i,t,e){let n=new WeakMap,s=new Ue;function r(o,a,c){let l=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,f=u!==void 0?u.length:0,h=n.get(a);if(h===void 0||h.count!==f){let E=function(){I.dispose(),n.delete(a),a.removeEventListener("dispose",E)};h!==void 0&&h.texture.dispose();let d=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,v=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],m=a.morphAttributes.normal||[],w=a.morphAttributes.color||[],R=0;d===!0&&(R=1),g===!0&&(R=2),v===!0&&(R=3);let b=a.attributes.position.count*R,A=1;b>t.maxTextureSize&&(A=Math.ceil(b/t.maxTextureSize),b=t.maxTextureSize);let S=new Float32Array(b*A*4*f),I=new Tr(S,b,A,f);I.type=Yn,I.needsUpdate=!0;let x=R*4;for(let D=0;D<f;D++){let P=p[D],V=m[D],q=w[D],N=b*A*4*D;for(let z=0;z<P.count;z++){let Z=z*x;d===!0&&(s.fromBufferAttribute(P,z),S[N+Z+0]=s.x,S[N+Z+1]=s.y,S[N+Z+2]=s.z,S[N+Z+3]=0),g===!0&&(s.fromBufferAttribute(V,z),S[N+Z+4]=s.x,S[N+Z+5]=s.y,S[N+Z+6]=s.z,S[N+Z+7]=0),v===!0&&(s.fromBufferAttribute(q,z),S[N+Z+8]=s.x,S[N+Z+9]=s.y,S[N+Z+10]=s.z,S[N+Z+11]=q.itemSize===4?s.w:1)}}h={count:f,texture:I,size:new Tt(b,A)},n.set(a,h),a.addEventListener("dispose",E)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let d=0;for(let v=0;v<l.length;v++)d+=l[v];let g=a.morphTargetsRelative?1:1-d;c.getUniforms().setValue(i,"morphTargetBaseInfluence",g),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",h.texture,e),c.getUniforms().setValue(i,"morphTargetsTextureSize",h.size)}return{update:r}}function z0(i,t,e,n,s){let r=new WeakMap;function o(l){let u=s.render.frame,f=l.geometry,h=t.get(l,f);if(r.get(h)!==u&&(t.update(h),r.set(h,u)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==u&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,u))),l.isSkinnedMesh){let d=l.skeleton;r.get(d)!==u&&(d.update(),r.set(d,u))}return h}function a(){r=new WeakMap}function c(l){let u=l.target;u.removeEventListener("dispose",c),n.releaseStatesOfObject(u),e.remove(u.instanceMatrix),u.instanceColor!==null&&e.remove(u.instanceColor)}return{update:o,dispose:a}}var k0={[Vc]:"LINEAR_TONE_MAPPING",[Gc]:"REINHARD_TONE_MAPPING",[Hc]:"CINEON_TONE_MAPPING",[Xr]:"ACES_FILMIC_TONE_MAPPING",[Xc]:"AGX_TONE_MAPPING",[qc]:"NEUTRAL_TONE_MAPPING",[Wc]:"CUSTOM_TONE_MAPPING"};function V0(i,t,e,n,s,r){let o=new xn(t,e,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),a=null,c=null,l=new on;l.setAttribute("position",new ke([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new ke([0,2,0,0,2,0],2));let u=new _a({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),f=new De(l,u),h=new Si(-1,1,1,-1,0,1),d=null,g=null,v=!1,p,m=null,w=[],R=!1;this.setSize=function(b,A){o.setSize(b,A),a!==null&&a.setSize(b,A),c!==null&&c.setSize(b,A);for(let S=0;S<w.length;S++){let I=w[S];I.setSize&&I.setSize(b,A)}},this.setEffects=function(b){w=b,R=w.length>0&&w[0].isRenderPass===!0;let A=o.width,S=o.height;w.length>0&&a===null&&(a=new xn(A,S,{type:$n,depthBuffer:!1,stencilBuffer:!1}),c=new xn(A,S,{type:$n,depthBuffer:!1,stencilBuffer:!1}));for(let I=0;I<w.length;I++){let x=w[I];x.setSize&&x.setSize(A,S)}},this.begin=function(b,A){if(v||b.toneMapping===Xn&&w.length===0)return!1;if(m=A,A!==null){let S=A.width,I=A.height;(o.width!==S||o.height!==I)&&this.setSize(S,I)}return R===!1&&b.setRenderTarget(o),p=b.toneMapping,b.toneMapping=Xn,!0},this.hasRenderPass=function(){return R},this.end=function(b,A){b.toneMapping=p,v=!0;let S=o,I=a;for(let x=0;x<w.length;x++){let E=w[x];E.enabled!==!1&&(E.render(b,I,S,A),E.needsSwap!==!1&&(S=I,I=I===a?c:a))}if(d!==b.outputColorSpace||g!==b.toneMapping){d=b.outputColorSpace,g=b.toneMapping,u.defines={},xe.getTransfer(d)===we&&(u.defines.SRGB_TRANSFER="");let x=k0[g];x&&(u.defines[x]=""),u.needsUpdate=!0}u.uniforms.tDiffuse.value=S.texture,b.setRenderTarget(m),b.render(f,h),m=null,v=!1},this.isCompositing=function(){return v},this.dispose=function(){o.dispose(),a!==null&&a.dispose(),c!==null&&c.dispose(),l.dispose(),u.dispose()}}var Vd=new gn,gh=new Li(1,1),Gd=new Tr,Hd=new oa,Wd=new Cr,Md=[],Sd=[],wd=new Float32Array(16),Td=new Float32Array(9),Ad=new Float32Array(4);function Ks(i,t,e){let n=i[0];if(n<=0||n>0)return i;let s=t*e,r=Md[s];if(r===void 0&&(r=new Float32Array(s),Md[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function He(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function We(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Rl(i,t){let e=Sd[t];e===void 0&&(e=new Int32Array(t),Sd[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function G0(i,t){let e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function H0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(He(e,t))return;i.uniform2fv(this.addr,t),We(e,t)}}function W0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(He(e,t))return;i.uniform3fv(this.addr,t),We(e,t)}}function X0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(He(e,t))return;i.uniform4fv(this.addr,t),We(e,t)}}function q0(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(He(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),We(e,t)}else{if(He(e,n))return;Ad.set(n),i.uniformMatrix2fv(this.addr,!1,Ad),We(e,n)}}function Y0(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(He(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),We(e,t)}else{if(He(e,n))return;Td.set(n),i.uniformMatrix3fv(this.addr,!1,Td),We(e,n)}}function $0(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(He(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),We(e,t)}else{if(He(e,n))return;wd.set(n),i.uniformMatrix4fv(this.addr,!1,wd),We(e,n)}}function Z0(i,t){let e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function J0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(He(e,t))return;i.uniform2iv(this.addr,t),We(e,t)}}function K0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(He(e,t))return;i.uniform3iv(this.addr,t),We(e,t)}}function j0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(He(e,t))return;i.uniform4iv(this.addr,t),We(e,t)}}function Q0(i,t){let e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function tx(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(He(e,t))return;i.uniform2uiv(this.addr,t),We(e,t)}}function ex(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(He(e,t))return;i.uniform3uiv(this.addr,t),We(e,t)}}function nx(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(He(e,t))return;i.uniform4uiv(this.addr,t),We(e,t)}}function ix(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(gh.compareFunction=e.isReversedDepthBuffer()?Ml:bl,r=gh):r=Vd,e.setTexture2D(t||r,s)}function sx(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||Hd,s)}function rx(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||Wd,s)}function ox(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||Gd,s)}function ax(i){switch(i){case 5126:return G0;case 35664:return H0;case 35665:return W0;case 35666:return X0;case 35674:return q0;case 35675:return Y0;case 35676:return $0;case 5124:case 35670:return Z0;case 35667:case 35671:return J0;case 35668:case 35672:return K0;case 35669:case 35673:return j0;case 5125:return Q0;case 36294:return tx;case 36295:return ex;case 36296:return nx;case 35678:case 36198:case 36298:case 36306:case 35682:return ix;case 35679:case 36299:case 36307:return sx;case 35680:case 36300:case 36308:case 36293:return rx;case 36289:case 36303:case 36311:case 36292:return ox}}function lx(i,t){i.uniform1fv(this.addr,t)}function cx(i,t){let e=Ks(t,this.size,2);i.uniform2fv(this.addr,e)}function hx(i,t){let e=Ks(t,this.size,3);i.uniform3fv(this.addr,e)}function ux(i,t){let e=Ks(t,this.size,4);i.uniform4fv(this.addr,e)}function dx(i,t){let e=Ks(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function fx(i,t){let e=Ks(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function px(i,t){let e=Ks(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function mx(i,t){i.uniform1iv(this.addr,t)}function gx(i,t){i.uniform2iv(this.addr,t)}function xx(i,t){i.uniform3iv(this.addr,t)}function _x(i,t){i.uniform4iv(this.addr,t)}function yx(i,t){i.uniform1uiv(this.addr,t)}function vx(i,t){i.uniform2uiv(this.addr,t)}function bx(i,t){i.uniform3uiv(this.addr,t)}function Mx(i,t){i.uniform4uiv(this.addr,t)}function Sx(i,t,e){let n=this.cache,s=t.length,r=Rl(e,s);He(n,r)||(i.uniform1iv(this.addr,r),We(n,r));let o;this.type===i.SAMPLER_2D_SHADOW?o=gh:o=Vd;for(let a=0;a!==s;++a)e.setTexture2D(t[a]||o,r[a])}function wx(i,t,e){let n=this.cache,s=t.length,r=Rl(e,s);He(n,r)||(i.uniform1iv(this.addr,r),We(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||Hd,r[o])}function Tx(i,t,e){let n=this.cache,s=t.length,r=Rl(e,s);He(n,r)||(i.uniform1iv(this.addr,r),We(n,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||Wd,r[o])}function Ax(i,t,e){let n=this.cache,s=t.length,r=Rl(e,s);He(n,r)||(i.uniform1iv(this.addr,r),We(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||Gd,r[o])}function Ex(i){switch(i){case 5126:return lx;case 35664:return cx;case 35665:return hx;case 35666:return ux;case 35674:return dx;case 35675:return fx;case 35676:return px;case 5124:case 35670:return mx;case 35667:case 35671:return gx;case 35668:case 35672:return xx;case 35669:case 35673:return _x;case 5125:return yx;case 36294:return vx;case 36295:return bx;case 36296:return Mx;case 35678:case 36198:case 36298:case 36306:case 35682:return Sx;case 35679:case 36299:case 36307:return wx;case 35680:case 36300:case 36308:case 36293:return Tx;case 36289:case 36303:case 36311:case 36292:return Ax}}var xh=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=ax(e.type)}},_h=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Ex(e.type)}},yh=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(t,e[a.id],n)}}},ph=/(\w+)(\])?(\[|\.)?/g;function Ed(i,t){i.seq.push(t),i.map[t.id]=t}function Cx(i,t,e){let n=i.name,s=n.length;for(ph.lastIndex=0;;){let r=ph.exec(n),o=ph.lastIndex,a=r[1],c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){Ed(e,l===void 0?new xh(a,i,t):new _h(a,i,t));break}else{let f=e.map[a];f===void 0&&(f=new yh(a),Ed(e,f)),e=f}}}var Js=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let o=0;o<n;++o){let a=t.getActiveUniform(e,o),c=t.getUniformLocation(e,a.name);Cx(a,c,this)}let s=[],r=[];for(let o of this.seq)o.type===t.SAMPLER_2D_SHADOW||o.type===t.SAMPLER_CUBE_SHADOW||o.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(o):r.push(o);s.length>0&&(this.seq=s.concat(r))}setValue(t,e,n,s){let r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){let s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){let a=e[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,s)}}static seqWithValue(t,e){let n=[];for(let s=0,r=t.length;s!==r;++s){let o=t[s];o.id in e&&n.push(o)}return n}};function Cd(i,t,e){let n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}var Rx=37297,Ix=0;function Px(i,t){let e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){let a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}var Rd=new le;function Lx(i){xe._getMatrix(Rd,xe.workingColorSpace,i);let t=`mat3( ${Rd.elements.map(e=>e.toFixed(4))} )`;switch(xe.getTransfer(i)){case Sr:return[t,"LinearTransferOETF"];case we:return[t,"sRGBTransferOETF"];default:return ne("WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function Id(i,t,e){let n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";let o=/ERROR: 0:(\d+)/.exec(r);if(o){let a=parseInt(o[1]);return e.toUpperCase()+`

`+r+`

`+Px(i.getShaderSource(t),a)}else return r}function Dx(i,t){let e=Lx(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}var Nx={[Vc]:"Linear",[Gc]:"Reinhard",[Hc]:"Cineon",[Xr]:"ACESFilmic",[Xc]:"AgX",[qc]:"Neutral",[Wc]:"Custom"};function Ux(i,t){let e=Nx[t];return e===void 0?(ne("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var wl=new O;function Fx(){xe.getLuminanceCoefficients(wl);let i=wl.x.toFixed(4),t=wl.y.toFixed(4),e=wl.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Ox(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(no).join(`
`)}function Bx(i){let t=[];for(let e in i){let n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function zx(i,t){let e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(t,s),o=r.name,a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function no(i){return i!==""}function Pd(i,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Ld(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var kx=/^[ \t]*#include +<([\w\d./]+)>/gm;function vh(i){return i.replace(kx,Gx)}var Vx=new Map;function Gx(i,t){let e=fe[t];if(e===void 0){let n=Vx.get(t);if(n!==void 0)e=fe[n],ne('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return vh(e)}var Hx=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Dd(i){return i.replace(Hx,Wx)}function Wx(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Nd(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}var Xx={[as]:"SHADOWMAP_TYPE_PCF",[Hs]:"SHADOWMAP_TYPE_VSM"};function qx(i){return Xx[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var Yx={[Bi]:"ENVMAP_TYPE_CUBE",[cs]:"ENVMAP_TYPE_CUBE",[qr]:"ENVMAP_TYPE_CUBE_UV"};function $x(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":Yx[i.envMapMode]||"ENVMAP_TYPE_CUBE"}var Zx={[cs]:"ENVMAP_MODE_REFRACTION"};function Jx(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":Zx[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var Kx={[kc]:"ENVMAP_BLENDING_MULTIPLY",[$u]:"ENVMAP_BLENDING_MIX",[Zu]:"ENVMAP_BLENDING_ADD"};function jx(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":Kx[i.combine]||"ENVMAP_BLENDING_NONE"}function Qx(i){let t=i.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function t_(i,t,e,n){let s=i.getContext(),r=e.defines,o=e.vertexShader,a=e.fragmentShader,c=qx(e),l=$x(e),u=Jx(e),f=jx(e),h=Qx(e),d=Ox(e),g=Bx(r),v=s.createProgram(),p,m,w=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(no).join(`
`),p.length>0&&(p+=`
`),m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(no).join(`
`),m.length>0&&(m+=`
`)):(p=[Nd(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(no).join(`
`),m=[Nd(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+u:"",e.envMap?"#define "+f:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Xn?"#define TONE_MAPPING":"",e.toneMapping!==Xn?fe.tonemapping_pars_fragment:"",e.toneMapping!==Xn?Ux("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",fe.colorspace_pars_fragment,Dx("linearToOutputTexel",e.outputColorSpace),Fx(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(no).join(`
`)),o=vh(o),o=Pd(o,e),o=Ld(o,e),a=vh(a),a=Pd(a,e),a=Ld(a,e),o=Dd(o),a=Dd(a),e.isRawShaderMaterial!==!0&&(w=`#version 300 es
`,p=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,m=["#define varying in",e.glslVersion===ih?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===ih?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);let R=w+p+o,b=w+m+a,A=Cd(s,s.VERTEX_SHADER,R),S=Cd(s,s.FRAGMENT_SHADER,b);s.attachShader(v,A),s.attachShader(v,S),e.index0AttributeName!==void 0?s.bindAttribLocation(v,0,e.index0AttributeName):e.hasPositionAttribute===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function I(P){if(i.debug.checkShaderErrors){let V=s.getProgramInfoLog(v)||"",q=s.getShaderInfoLog(A)||"",N=s.getShaderInfoLog(S)||"",z=V.trim(),Z=q.trim(),L=N.trim(),Q=!0,Y=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(Q=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,v,A,S);else{let $=Id(s,A,"vertex"),nt=Id(s,S,"fragment");se("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+z+`
`+$+`
`+nt)}else z!==""?ne("WebGLProgram: Program Info Log:",z):(Z===""||L==="")&&(Y=!1);Y&&(P.diagnostics={runnable:Q,programLog:z,vertexShader:{log:Z,prefix:p},fragmentShader:{log:L,prefix:m}})}s.deleteShader(A),s.deleteShader(S),x=new Js(s,v),E=zx(s,v)}let x;this.getUniforms=function(){return x===void 0&&I(this),x};let E;this.getAttributes=function(){return E===void 0&&I(this),E};let D=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return D===!1&&(D=s.getProgramParameter(v,Rx)),D},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Ix++,this.cacheKey=t,this.usedTimes=1,this.program=v,this.vertexShader=A,this.fragmentShader=S,this}var e_=0,bh=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,n){let s=this._getShaderCacheForMaterial(t);return s.has(e)===!1&&(s.add(e),e.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new Mh(t),e.set(t,n)),n}},Mh=class{constructor(t){this.id=e_++,this.code=t,this.usedTimes=0}};function n_(i){return i===Vi||i===jr||i===Qr}function i_(i,t,e,n,s,r){let o=new Ns,a=new bh,c=new Set,l=[],u=new Map,f=n.logarithmicDepthBuffer,h=n.precision,d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(x){return c.add(x),x===0?"uv":`uv${x}`}function v(x,E,D,P,V,q){let N=P.fog,z=V.geometry,Z=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?P.environment:null,L=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,Q=t.get(x.envMap||Z,L),Y=Q&&Q.mapping===qr?Q.image.height:null,$=d[x.type];x.precision!==null&&(h=n.getMaxPrecision(x.precision),h!==x.precision&&ne("WebGLProgram.getParameters:",x.precision,"not supported, using",h,"instead."));let nt=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,mt=nt!==void 0?nt.length:0,ht=0;z.morphAttributes.position!==void 0&&(ht=1),z.morphAttributes.normal!==void 0&&(ht=2),z.morphAttributes.color!==void 0&&(ht=3);let Qt,Rt,Kt,rt;if($){let Te=ci[$];Qt=Te.vertexShader,Rt=Te.fragmentShader}else{Qt=x.vertexShader,Rt=x.fragmentShader;let Te=a.getVertexShaderStage(x),ye=a.getFragmentShaderStage(x);a.update(x,Te,ye),Kt=Te.id,rt=ye.id}let ut=i.getRenderTarget(),Mt=i.state.buffers.depth.getReversed(),Bt=V.isInstancedMesh===!0,Dt=V.isBatchedMesh===!0,ie=!!x.map,Me=!!x.matcap,ft=!!Q,gt=!!x.aoMap,lt=!!x.lightMap,pt=!!x.bumpMap&&x.wireframe===!1,Et=!!x.normalMap,Yt=!!x.displacementMap,Zt=!!x.emissiveMap,ee=!!x.metalnessMap,te=!!x.roughnessMap,U=x.anisotropy>0,Se=x.clearcoat>0,ue=x.dispersion>0,C=x.retroreflectivity>0,_=x.iridescence>0,H=x.sheen>0,j=x.transmission>0,ot=U&&!!x.anisotropyMap,yt=Se&&!!x.clearcoatMap,xt=Se&&!!x.clearcoatNormalMap,K=Se&&!!x.clearcoatRoughnessMap,ct=_&&!!x.iridescenceMap,bt=_&&!!x.iridescenceThicknessMap,Vt=H&&!!x.sheenColorMap,It=H&&!!x.sheenRoughnessMap,Ct=!!x.specularMap,Ht=!!x.specularColorMap,$t=!!x.specularIntensityMap,ae=j&&!!x.transmissionMap,W=j&&!!x.thicknessMap,Pt=!!x.gradientMap,at=!!x.alphaMap,St=x.alphaTest>0,Lt=!!x.alphaHash,dt=!!x.extensions,Wt=Xn;x.toneMapped&&(ut===null||ut.isXRRenderTarget===!0)&&(Wt=i.toneMapping);let kt={shaderID:$,shaderType:x.type,shaderName:x.name,vertexShader:Qt,fragmentShader:Rt,defines:x.defines,customVertexShaderID:Kt,customFragmentShaderID:rt,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:h,batching:Dt,batchingColor:Dt&&V._colorsTexture!==null,instancing:Bt,instancingColor:Bt&&V.instanceColor!==null,instancingMorph:Bt&&V.morphTexture!==null,outputColorSpace:ut===null?i.outputColorSpace:ut.isXRRenderTarget===!0?ut.texture.colorSpace:xe.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:ie,matcap:Me,envMap:ft,envMapMode:ft&&Q.mapping,envMapCubeUVHeight:Y,aoMap:gt,lightMap:lt,bumpMap:pt,normalMap:Et,displacementMap:Yt,emissiveMap:Zt,normalMapObjectSpace:Et&&x.normalMapType===ju,normalMapTangentSpace:Et&&x.normalMapType===yl,packedNormalMap:Et&&x.normalMapType===yl&&n_(x.normalMap.format),metalnessMap:ee,roughnessMap:te,anisotropy:U,anisotropyMap:ot,clearcoat:Se,clearcoatMap:yt,clearcoatNormalMap:xt,clearcoatRoughnessMap:K,dispersion:ue,retroreflection:C,iridescence:_,iridescenceMap:ct,iridescenceThicknessMap:bt,sheen:H,sheenColorMap:Vt,sheenRoughnessMap:It,specularMap:Ct,specularColorMap:Ht,specularIntensityMap:$t,transmission:j,transmissionMap:ae,thicknessMap:W,gradientMap:Pt,opaque:x.transparent===!1&&x.blending===Ws&&x.alphaToCoverage===!1,alphaMap:at,alphaTest:St,alphaHash:Lt,combine:x.combine,mapUv:ie&&g(x.map.channel),aoMapUv:gt&&g(x.aoMap.channel),lightMapUv:lt&&g(x.lightMap.channel),bumpMapUv:pt&&g(x.bumpMap.channel),normalMapUv:Et&&g(x.normalMap.channel),displacementMapUv:Yt&&g(x.displacementMap.channel),emissiveMapUv:Zt&&g(x.emissiveMap.channel),metalnessMapUv:ee&&g(x.metalnessMap.channel),roughnessMapUv:te&&g(x.roughnessMap.channel),anisotropyMapUv:ot&&g(x.anisotropyMap.channel),clearcoatMapUv:yt&&g(x.clearcoatMap.channel),clearcoatNormalMapUv:xt&&g(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:K&&g(x.clearcoatRoughnessMap.channel),iridescenceMapUv:ct&&g(x.iridescenceMap.channel),iridescenceThicknessMapUv:bt&&g(x.iridescenceThicknessMap.channel),sheenColorMapUv:Vt&&g(x.sheenColorMap.channel),sheenRoughnessMapUv:It&&g(x.sheenRoughnessMap.channel),specularMapUv:Ct&&g(x.specularMap.channel),specularColorMapUv:Ht&&g(x.specularColorMap.channel),specularIntensityMapUv:$t&&g(x.specularIntensityMap.channel),transmissionMapUv:ae&&g(x.transmissionMap.channel),thicknessMapUv:W&&g(x.thicknessMap.channel),alphaMapUv:at&&g(x.alphaMap.channel),vertexTangents:!!z.attributes.tangent&&(Et||U),vertexNormals:!!z.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,pointsUvs:V.isPoints===!0&&!!z.attributes.uv&&(ie||at),fog:!!N,useFog:x.fog===!0,fogExp2:!!N&&N.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||z.attributes.normal===void 0&&Et===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:Mt,skinning:V.isSkinnedMesh===!0,hasPositionAttribute:z.attributes.position!==void 0,morphTargets:z.morphAttributes.position!==void 0,morphNormals:z.morphAttributes.normal!==void 0,morphColors:z.morphAttributes.color!==void 0,morphTargetsCount:mt,morphTextureStride:ht,numSunLights:E.sun.length,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numSunLightShadows:E.sunShadowMap.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numLightProbeGrids:q.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:x.dithering,shadowMapEnabled:i.shadowMap.enabled&&D.length>0,shadowMapType:i.shadowMap.type,toneMapping:Wt,decodeVideoTexture:ie&&x.map.isVideoTexture===!0&&xe.getTransfer(x.map.colorSpace)===we,decodeVideoTextureEmissive:Zt&&x.emissiveMap.isVideoTexture===!0&&xe.getTransfer(x.emissiveMap.colorSpace)===we,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===oi,flipSided:x.side===tn,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:dt&&x.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(dt&&x.extensions.multiDraw===!0||Dt)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return kt.vertexUv1s=c.has(1),kt.vertexUv2s=c.has(2),kt.vertexUv3s=c.has(3),c.clear(),kt}function p(x){let E=[];if(x.shaderID?E.push(x.shaderID):(E.push(x.customVertexShaderID),E.push(x.customFragmentShaderID)),x.defines!==void 0)for(let D in x.defines)E.push(D),E.push(x.defines[D]);return x.isRawShaderMaterial===!1&&(m(E,x),w(E,x),E.push(i.outputColorSpace)),E.push(x.customProgramCacheKey),E.join()}function m(x,E){x.push(E.precision),x.push(E.outputColorSpace),x.push(E.envMapMode),x.push(E.envMapCubeUVHeight),x.push(E.mapUv),x.push(E.alphaMapUv),x.push(E.lightMapUv),x.push(E.aoMapUv),x.push(E.bumpMapUv),x.push(E.normalMapUv),x.push(E.displacementMapUv),x.push(E.emissiveMapUv),x.push(E.metalnessMapUv),x.push(E.roughnessMapUv),x.push(E.anisotropyMapUv),x.push(E.clearcoatMapUv),x.push(E.clearcoatNormalMapUv),x.push(E.clearcoatRoughnessMapUv),x.push(E.iridescenceMapUv),x.push(E.iridescenceThicknessMapUv),x.push(E.sheenColorMapUv),x.push(E.sheenRoughnessMapUv),x.push(E.specularMapUv),x.push(E.specularColorMapUv),x.push(E.specularIntensityMapUv),x.push(E.transmissionMapUv),x.push(E.thicknessMapUv),x.push(E.combine),x.push(E.fogExp2),x.push(E.sizeAttenuation),x.push(E.morphTargetsCount),x.push(E.morphAttributeCount),x.push(E.numSunLights),x.push(E.numDirLights),x.push(E.numPointLights),x.push(E.numSpotLights),x.push(E.numSpotLightMaps),x.push(E.numHemiLights),x.push(E.numRectAreaLights),x.push(E.numSunLightShadows),x.push(E.numDirLightShadows),x.push(E.numPointLightShadows),x.push(E.numSpotLightShadows),x.push(E.numSpotLightShadowsWithMaps),x.push(E.numLightProbes),x.push(E.shadowMapType),x.push(E.toneMapping),x.push(E.numClippingPlanes),x.push(E.numClipIntersection),x.push(E.depthPacking)}function w(x,E){o.disableAll(),E.instancing&&o.enable(0),E.instancingColor&&o.enable(1),E.instancingMorph&&o.enable(2),E.matcap&&o.enable(3),E.envMap&&o.enable(4),E.normalMapObjectSpace&&o.enable(5),E.normalMapTangentSpace&&o.enable(6),E.clearcoat&&o.enable(7),E.iridescence&&o.enable(8),E.alphaTest&&o.enable(9),E.vertexColors&&o.enable(10),E.vertexAlphas&&o.enable(11),E.vertexUv1s&&o.enable(12),E.vertexUv2s&&o.enable(13),E.vertexUv3s&&o.enable(14),E.vertexTangents&&o.enable(15),E.anisotropy&&o.enable(16),E.alphaHash&&o.enable(17),E.batching&&o.enable(18),E.dispersion&&o.enable(19),E.retroreflection&&o.enable(24),E.batchingColor&&o.enable(20),E.gradientMap&&o.enable(21),E.packedNormalMap&&o.enable(22),E.vertexNormals&&o.enable(23),x.push(o.mask),o.disableAll(),E.fog&&o.enable(0),E.useFog&&o.enable(1),E.flatShading&&o.enable(2),E.logarithmicDepthBuffer&&o.enable(3),E.reversedDepthBuffer&&o.enable(4),E.skinning&&o.enable(5),E.morphTargets&&o.enable(6),E.morphNormals&&o.enable(7),E.morphColors&&o.enable(8),E.premultipliedAlpha&&o.enable(9),E.shadowMapEnabled&&o.enable(10),E.doubleSided&&o.enable(11),E.flipSided&&o.enable(12),E.useDepthPacking&&o.enable(13),E.dithering&&o.enable(14),E.transmission&&o.enable(15),E.sheen&&o.enable(16),E.opaque&&o.enable(17),E.pointsUvs&&o.enable(18),E.decodeVideoTexture&&o.enable(19),E.decodeVideoTextureEmissive&&o.enable(20),E.alphaToCoverage&&o.enable(21),E.numLightProbeGrids>0&&o.enable(22),E.hasPositionAttribute&&o.enable(23),x.push(o.mask)}function R(x){let E=d[x.type],D;if(E){let P=ci[E];D=md.clone(P.uniforms)}else D=x.uniforms;return D}function b(x,E){let D=u.get(E);return D!==void 0?++D.usedTimes:(D=new t_(i,E,x,s),l.push(D),u.set(E,D)),D}function A(x){if(--x.usedTimes===0){let E=l.indexOf(x);l[E]=l[l.length-1],l.pop(),u.delete(x.cacheKey),x.destroy()}}function S(x){a.remove(x)}function I(){a.dispose()}return{getParameters:v,getProgramCacheKey:p,getUniforms:R,acquireProgram:b,releaseProgram:A,releaseShaderCache:S,programs:l,dispose:I}}function s_(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,c){i.get(o)[a]=c}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function r_(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.materialVariant!==t.materialVariant?i.materialVariant-t.materialVariant:i.z!==t.z?i.z-t.z:i.id-t.id}function Ud(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Fd(){let i=[],t=0,e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(h){let d=0;return h.isInstancedMesh&&(d+=2),h.isSkinnedMesh&&(d+=1),d}function a(h,d,g,v,p,m){let w=i[t];return w===void 0?(w={id:h.id,object:h,geometry:d,material:g,materialVariant:o(h),groupOrder:v,renderOrder:h.renderOrder,z:p,group:m},i[t]=w):(w.id=h.id,w.object=h,w.geometry=d,w.material=g,w.materialVariant=o(h),w.groupOrder=v,w.renderOrder=h.renderOrder,w.z=p,w.group=m),t++,w}function c(h,d,g,v,p,m,w){w.reversedDepth===!0&&(p=-p);let R=a(h,d,g,v,p,m);g.transmission>0?n.push(R):g.transparent===!0?s.push(R):e.push(R)}function l(h,d,g,v,p,m){let w=a(h,d,g,v,p,m);g.transmission>0?n.unshift(w):g.transparent===!0?s.unshift(w):e.unshift(w)}function u(h,d){e.length>1&&e.sort(h||r_),n.length>1&&n.sort(d||Ud),s.length>1&&s.sort(d||Ud)}function f(){for(let h=t,d=i.length;h<d;h++){let g=i[h];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:c,unshift:l,finish:f,sort:u}}function o_(){let i=new WeakMap;function t(n,s){let r=i.get(n),o;return r===void 0?(o=new Fd,i.set(n,[o])):s>=r.length?(o=new Fd,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function a_(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new O,color:new oe};break;case"SpotLight":e={position:new O,direction:new O,color:new oe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new O,color:new oe,distance:0,decay:0};break;case"HemisphereLight":e={direction:new O,skyColor:new oe,groundColor:new oe};break;case"RectAreaLight":e={color:new oe,position:new O,halfWidth:new O,halfHeight:new O};break}return i[t.id]=e,e}}}function l_(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Tt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Tt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Tt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}var c_=0;function h_(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function u_(i){let t=new a_,e=l_(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new O);let s=new O,r=new Re,o=new Re;function a(l){let u=0,f=0,h=0;for(let V=0;V<9;V++)n.probe[V].set(0,0,0);let d=0,g=0,v=0,p=0,m=0,w=0,R=0,b=0,A=0,S=0,I=0,x=0,E=0,D=0;l.sort(h_);for(let V=0,q=l.length;V<q;V++){let N=l[V],z=N.color,Z=N.intensity,L=N.distance,Q=null;if(N.shadow&&N.shadow.map&&(N.shadow.map.texture.format===Vi?Q=N.shadow.map.texture:Q=N.shadow.map.depthTexture||N.shadow.map.texture),N.isAmbientLight)u+=z.r*Z,f+=z.g*Z,h+=z.b*Z;else if(N.isLightProbe){for(let Y=0;Y<9;Y++)n.probe[Y].addScaledVector(N.sh.coefficients[Y],Z);D++}else if(N.isSunLight){let Y=t.get(N);if(Y.color.copy(N.color).multiplyScalar(N.intensity),N.castShadow){let $=N.shadow,nt=e.get(N);nt.shadowIntensity=$.intensity,nt.shadowBias=$.bias,nt.shadowNormalBias=$.normalBias,nt.shadowRadius=$.radius,nt.shadowMapSize.copy($.mapSize).multiply($.getFrameExtents()),n.sunShadow[g]=nt,n.sunShadowMap[g]=Q;let mt=$.getViewportCount();for(let ht=0;ht<mt;ht++)n.sunShadowMatrix[v+ht]=$.getMatrix(ht),n.sunShadowCascade[v+ht]=$._cascadeData[ht];v+=mt,g++}n.sun[d]=Y,d++}else if(N.isDirectionalLight){let Y=t.get(N);if(Y.color.copy(N.color).multiplyScalar(N.intensity),N.castShadow){let $=N.shadow,nt=e.get(N);nt.shadowIntensity=$.intensity,nt.shadowBias=$.bias,nt.shadowNormalBias=$.normalBias,nt.shadowRadius=$.radius,nt.shadowMapSize=$.mapSize,n.directionalShadow[p]=nt,n.directionalShadowMap[p]=Q,n.directionalShadowMatrix[p]=N.shadow.matrix,A++}n.directional[p]=Y,p++}else if(N.isSpotLight){let Y=t.get(N);Y.position.setFromMatrixPosition(N.matrixWorld),Y.color.copy(z).multiplyScalar(Z),Y.distance=L,Y.coneCos=Math.cos(N.angle),Y.penumbraCos=Math.cos(N.angle*(1-N.penumbra)),Y.decay=N.decay,n.spot[w]=Y;let $=N.shadow;if(N.map&&(n.spotLightMap[x]=N.map,x++,$.updateMatrices(N),N.castShadow&&E++),n.spotLightMatrix[w]=$.matrix,N.castShadow){let nt=e.get(N);nt.shadowIntensity=$.intensity,nt.shadowBias=$.bias,nt.shadowNormalBias=$.normalBias,nt.shadowRadius=$.radius,nt.shadowMapSize=$.mapSize,n.spotShadow[w]=nt,n.spotShadowMap[w]=Q,I++}w++}else if(N.isRectAreaLight){let Y=t.get(N);Y.color.copy(z).multiplyScalar(Z),Y.halfWidth.set(N.width*.5,0,0),Y.halfHeight.set(0,N.height*.5,0),n.rectArea[R]=Y,R++}else if(N.isPointLight){let Y=t.get(N);if(Y.color.copy(N.color).multiplyScalar(N.intensity),Y.distance=N.distance,Y.decay=N.decay,N.castShadow){let $=N.shadow,nt=e.get(N);nt.shadowIntensity=$.intensity,nt.shadowBias=$.bias,nt.shadowNormalBias=$.normalBias,nt.shadowRadius=$.radius,nt.shadowMapSize=$.mapSize,nt.shadowCameraNear=$.camera.near,nt.shadowCameraFar=$.camera.far,n.pointShadow[m]=nt,n.pointShadowMap[m]=Q,n.pointShadowMatrix[m]=N.shadow.matrix,S++}n.point[m]=Y,m++}else if(N.isHemisphereLight){let Y=t.get(N);Y.skyColor.copy(N.color).multiplyScalar(Z),Y.groundColor.copy(N.groundColor).multiplyScalar(Z),n.hemi[b]=Y,b++}}R>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Nt.LTC_FLOAT_1,n.rectAreaLTC2=Nt.LTC_FLOAT_2):(n.rectAreaLTC1=Nt.LTC_HALF_1,n.rectAreaLTC2=Nt.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=f,n.ambient[2]=h;let P=n.hash;(P.sunLength!==d||P.directionalLength!==p||P.pointLength!==m||P.spotLength!==w||P.rectAreaLength!==R||P.hemiLength!==b||P.numSunShadows!==g||P.numDirectionalShadows!==A||P.numPointShadows!==S||P.numSpotShadows!==I||P.numSpotMaps!==x||P.numLightProbes!==D)&&(n.sun.length=d,n.directional.length=p,n.spot.length=w,n.rectArea.length=R,n.point.length=m,n.hemi.length=b,n.sunShadow.length=g,n.sunShadowMap.length=g,n.sunShadowMatrix.length=v,n.sunShadowCascade.length=v,n.directionalShadow.length=A,n.directionalShadowMap.length=A,n.directionalShadowMatrix.length=A,n.pointShadow.length=S,n.pointShadowMap.length=S,n.pointShadowMatrix.length=S,n.spotShadow.length=I,n.spotShadowMap.length=I,n.spotLightMatrix.length=I+x-E,n.spotLightMap.length=x,n.numSpotLightShadowsWithMaps=E,n.numLightProbes=D,P.sunLength=d,P.directionalLength=p,P.pointLength=m,P.spotLength=w,P.rectAreaLength=R,P.hemiLength=b,P.numSunShadows=g,P.numDirectionalShadows=A,P.numPointShadows=S,P.numSpotShadows=I,P.numSpotMaps=x,P.numLightProbes=D,n.version=c_++)}function c(l,u){let f=0,h=0,d=0,g=0,v=0,p=0,m=u.matrixWorldInverse;for(let w=0,R=l.length;w<R;w++){let b=l[w];if(b.isSunLight){let A=n.sun[f];A.direction.setFromMatrixPosition(b.matrixWorld),A.direction.transformDirection(m),f++}else if(b.isDirectionalLight){let A=n.directional[h];A.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),A.direction.sub(s),A.direction.transformDirection(m),h++}else if(b.isSpotLight){let A=n.spot[g];A.position.setFromMatrixPosition(b.matrixWorld),A.position.applyMatrix4(m),A.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),A.direction.sub(s),A.direction.transformDirection(m),g++}else if(b.isRectAreaLight){let A=n.rectArea[v];A.position.setFromMatrixPosition(b.matrixWorld),A.position.applyMatrix4(m),o.identity(),r.copy(b.matrixWorld),r.premultiply(m),o.extractRotation(r),A.halfWidth.set(b.width*.5,0,0),A.halfHeight.set(0,b.height*.5,0),A.halfWidth.applyMatrix4(o),A.halfHeight.applyMatrix4(o),v++}else if(b.isPointLight){let A=n.point[d];A.position.setFromMatrixPosition(b.matrixWorld),A.position.applyMatrix4(m),d++}else if(b.isHemisphereLight){let A=n.hemi[p];A.direction.setFromMatrixPosition(b.matrixWorld),A.direction.transformDirection(m),p++}}}return{setup:a,setupView:c,state:n}}function Od(i){let t=new u_(i),e=[],n=[],s=[];function r(h){f.camera=h,e.length=0,n.length=0,s.length=0}function o(h){e.push(h)}function a(h){n.push(h)}function c(h){s.push(h)}function l(){t.setup(e)}function u(h){t.setupView(e,h)}let f={lightsArray:e,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:f,setupLights:l,setupLightsView:u,pushLight:o,pushShadow:a,pushLightProbeGrid:c}}function d_(i){let t=new WeakMap;function e(s,r=0){let o=t.get(s),a;return o===void 0?(a=new Od(i),t.set(s,[a])):r>=o.length?(a=new Od(i),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}var f_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,p_=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,m_=[new O(1,0,0),new O(-1,0,0),new O(0,1,0),new O(0,-1,0),new O(0,0,1),new O(0,0,-1)],g_=[new O(0,-1,0),new O(0,-1,0),new O(0,0,1),new O(0,0,-1),new O(0,-1,0),new O(0,-1,0)],Bd=new Re,eo=new O,mh=new O;function x_(i,t,e){let n=new Bs,s=new Tt,r=new Tt,o=new Ue,a=new ya,c=new va,l={},u=e.maxTextureSize,f={[Oi]:tn,[tn]:Oi,[oi]:oi},h=new Tn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Tt},radius:{value:4}},vertexShader:f_,fragmentShader:p_}),d=h.clone();d.defines.HORIZONTAL_PASS=1;let g=new on;g.setAttribute("position",new mn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let v=new De(g,h),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=as;let m=this.type;this.render=function(S,I,x){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||S.length===0)return;this.type===Ru&&(ne("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=as);let E=i.getRenderTarget(),D=i.getActiveCubeFace(),P=i.getActiveMipmapLevel(),V=i.state;V.setBlending(ai),V.buffers.depth.getReversed()===!0?V.buffers.color.setClear(0,0,0,0):V.buffers.color.setClear(1,1,1,1),V.buffers.depth.setTest(!0),V.setScissorTest(!1);let q=m!==this.type;q&&I.traverse(function(N){N.material&&(Array.isArray(N.material)?N.material.forEach(z=>z.needsUpdate=!0):N.material.needsUpdate=!0)});for(let N=0,z=S.length;N<z;N++){let Z=S[N],L=Z.shadow;if(L===void 0){ne("WebGLShadowMap:",Z,"has no shadow.");continue}if(L.autoUpdate===!1&&L.needsUpdate===!1)continue;s.copy(L.mapSize);let Q=L.getFrameExtents();s.multiply(Q),r.copy(L.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/Q.x),s.x=r.x*Q.x,L.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/Q.y),s.y=r.y*Q.y,L.mapSize.y=r.y));let Y=i.state.buffers.depth.getReversed();if(L.camera._reversedDepth=Y,L.map===null||q===!0){if(L.map!==null&&(L.map.depthTexture!==null&&(L.map.depthTexture.dispose(),L.map.depthTexture=null),L.map.dispose()),this.type===Hs){if(Z.isPointLight){ne("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}L.map=new xn(s.x,s.y,{format:Vi,type:$n,minFilter:je,magFilter:je,generateMipmaps:!1}),L.map.texture.name=Z.name+".shadowMap",L.map.depthTexture=new Li(s.x,s.y,Yn),L.map.depthTexture.name=Z.name+".shadowMapDepth",L.map.depthTexture.format=ti,L.map.depthTexture.compareFunction=null,L.map.depthTexture.minFilter=Je,L.map.depthTexture.magFilter=Je}else Z.isPointLight?(L.map=new Al(s.x),L.map.depthTexture=new ua(s.x,qn)):(L.map=new xn(s.x,s.y),L.map.depthTexture=new Li(s.x,s.y,qn)),L.map.depthTexture.name=Z.name+".shadowMap",L.map.depthTexture.format=ti,this.type===as?(L.map.depthTexture.compareFunction=Y?Ml:bl,L.map.depthTexture.minFilter=je,L.map.depthTexture.magFilter=je):(L.map.depthTexture.compareFunction=null,L.map.depthTexture.minFilter=Je,L.map.depthTexture.magFilter=Je);L.camera.updateProjectionMatrix()}L.map.isWebGLCubeRenderTarget!==!0&&(L.map.width!==s.x||L.map.height!==s.y)&&L.map.setSize(s.x,s.y);let $=L.map.isWebGLCubeRenderTarget?6:L.getViewportCount();Z.isPointLight!==!0&&L.updateMatrices(Z,x);for(let nt=0;nt<$;nt++){let mt=L.getCamera(nt);if(Z.isPointLight){let ht=L.camera,Qt=L.matrix,Rt=Z.distance||ht.far;Rt!==ht.far&&(ht.far=Rt,ht.updateProjectionMatrix()),eo.setFromMatrixPosition(Z.matrixWorld),ht.position.copy(eo),mh.copy(ht.position),mh.add(m_[nt]),ht.up.copy(g_[nt]),ht.lookAt(mh),ht.updateMatrixWorld(),Qt.makeTranslation(-eo.x,-eo.y,-eo.z),Bd.multiplyMatrices(ht.projectionMatrix,ht.matrixWorldInverse),L._frustum.setFromProjectionMatrix(Bd,ht.coordinateSystem,ht.reversedDepth)}if(L.map.isWebGLCubeRenderTarget)i.setRenderTarget(L.map,nt),i.clear();else{nt===0&&(i.setRenderTarget(L.map),i.clear());let ht=L.getViewport(nt);o.set(r.x*ht.x,r.y*ht.y,r.x*ht.z,r.y*ht.w),V.viewport(o)}n=L.getFrustum(nt),b(I,x,mt,Z,this.type)}L.isPointLightShadow!==!0&&this.type===Hs&&w(L,x),L.needsUpdate=!1}m=this.type,p.needsUpdate=!1,i.setRenderTarget(E,D,P)};function w(S,I){let x=t.update(v);h.defines.VSM_SAMPLES!==S.blurSamples&&(h.defines.VSM_SAMPLES=S.blurSamples,d.defines.VSM_SAMPLES=S.blurSamples,h.needsUpdate=!0,d.needsUpdate=!0),S.mapPass===null?S.mapPass=new xn(s.x,s.y,{format:Vi,type:$n}):(S.mapPass.width!==S.map.width||S.mapPass.height!==S.map.height)&&S.mapPass.setSize(S.map.width,S.map.height),h.uniforms.shadow_pass.value=S.map.depthTexture,h.uniforms.resolution.value.set(S.map.width,S.map.height),h.uniforms.radius.value=S.radius,i.setRenderTarget(S.mapPass),i.clear(),i.renderBufferDirect(I,null,x,h,v,null),d.uniforms.shadow_pass.value=S.mapPass.texture,d.uniforms.resolution.value.set(S.map.width,S.map.height),d.uniforms.radius.value=S.radius,i.setRenderTarget(S.map),i.clear(),i.renderBufferDirect(I,null,x,d,v,null)}function R(S,I,x,E){let D=null,P=x.isPointLight===!0?S.customDistanceMaterial:S.customDepthMaterial;if(P!==void 0)D=P;else if(D=x.isPointLight===!0?c:a,i.localClippingEnabled&&I.clipShadows===!0&&Array.isArray(I.clippingPlanes)&&I.clippingPlanes.length!==0||I.displacementMap&&I.displacementScale!==0||I.alphaMap&&I.alphaTest>0||I.map&&I.alphaTest>0||I.alphaToCoverage===!0){let V=D.uuid,q=I.uuid,N=l[V];N===void 0&&(N={},l[V]=N);let z=N[q];z===void 0&&(z=D.clone(),N[q]=z,I.addEventListener("dispose",A)),D=z}if(D.visible=I.visible,D.wireframe=I.wireframe,E===Hs?D.side=I.shadowSide!==null?I.shadowSide:I.side:D.side=I.shadowSide!==null?I.shadowSide:f[I.side],D.alphaMap=I.alphaMap,D.alphaTest=I.alphaToCoverage===!0?.5:I.alphaTest,D.map=I.map,D.clipShadows=I.clipShadows,D.clippingPlanes=I.clippingPlanes,D.clipIntersection=I.clipIntersection,D.displacementMap=I.displacementMap,D.displacementScale=I.displacementScale,D.displacementBias=I.displacementBias,D.wireframeLinewidth=I.wireframeLinewidth,D.linewidth=I.linewidth,x.isPointLight===!0&&D.isMeshDistanceMaterial===!0){let V=i.properties.get(D);V.light=x}return D}function b(S,I,x,E,D){if(S.visible===!1)return;if(S.layers.test(I.layers)&&(S.isMesh||S.isLine||S.isPoints)&&(S.castShadow||S.receiveShadow&&D===Hs)&&(!S.frustumCulled||S.intersectsFrustum(n))){S.modelViewMatrix.multiplyMatrices(x.matrixWorldInverse,S.matrixWorld);let q=t.update(S),N=S.material;if(Array.isArray(N)){let z=q.groups;for(let Z=0,L=z.length;Z<L;Z++){let Q=z[Z],Y=N[Q.materialIndex];if(Y&&Y.visible){let $=R(S,Y,E,D);S.onBeforeShadow(i,S,I,x,q,$,Q),i.renderBufferDirect(x,null,q,$,S,Q),S.onAfterShadow(i,S,I,x,q,$,Q)}}}else if(N.visible){let z=R(S,N,E,D);S.onBeforeShadow(i,S,I,x,q,z,null),i.renderBufferDirect(x,null,q,z,S,null),S.onAfterShadow(i,S,I,x,q,z,null)}}let V=S.children;for(let q=0,N=V.length;q<N;q++)b(V[q],I,x,E,D)}function A(S){S.target.removeEventListener("dispose",A);for(let x in l){let E=l[x],D=S.target.uuid;D in E&&(E[D].dispose(),delete E[D])}}}function __(i,t){function e(){let W=!1,Pt=new Ue,at=null,St=new Ue(0,0,0,0);return{setMask:function(Lt){at!==Lt&&!W&&(i.colorMask(Lt,Lt,Lt,Lt),at=Lt)},setLocked:function(Lt){W=Lt},setClear:function(Lt,dt,Wt,kt,Te){Te===!0&&(Lt*=kt,dt*=kt,Wt*=kt),Pt.set(Lt,dt,Wt,kt),St.equals(Pt)===!1&&(i.clearColor(Lt,dt,Wt,kt),St.copy(Pt))},reset:function(){W=!1,at=null,St.set(-1,0,0,0)}}}function n(){let W=!1,Pt=!1,at=null,St=null,Lt=null;return{setReversed:function(dt){if(Pt!==dt){let Wt=t.get("EXT_clip_control");dt?Wt.clipControlEXT(Wt.LOWER_LEFT_EXT,Wt.ZERO_TO_ONE_EXT):Wt.clipControlEXT(Wt.LOWER_LEFT_EXT,Wt.NEGATIVE_ONE_TO_ONE_EXT),Pt=dt;let kt=Lt;Lt=null,this.setClear(kt)}},getReversed:function(){return Pt},setTest:function(dt){dt?ut(i.DEPTH_TEST):Mt(i.DEPTH_TEST)},setMask:function(dt){at!==dt&&!W&&(i.depthMask(dt),at=dt)},setFunc:function(dt){if(Pt&&(dt=cd[dt]),St!==dt){switch(dt){case Yo:i.depthFunc(i.NEVER);break;case $o:i.depthFunc(i.ALWAYS);break;case Zo:i.depthFunc(i.LESS);break;case Is:i.depthFunc(i.LEQUAL);break;case Jo:i.depthFunc(i.EQUAL);break;case Ko:i.depthFunc(i.GEQUAL);break;case jo:i.depthFunc(i.GREATER);break;case Qo:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}St=dt}},setLocked:function(dt){W=dt},setClear:function(dt){Lt!==dt&&(Lt=dt,Pt&&(dt=1-dt),i.clearDepth(dt))},reset:function(){W=!1,at=null,St=null,Lt=null,Pt=!1}}}function s(){let W=!1,Pt=null,at=null,St=null,Lt=null,dt=null,Wt=null,kt=null,Te=null;return{setTest:function(ye){W||(ye?ut(i.STENCIL_TEST):Mt(i.STENCIL_TEST))},setMask:function(ye){Pt!==ye&&!W&&(i.stencilMask(ye),Pt=ye)},setFunc:function(ye,en,yn){(at!==ye||St!==en||Lt!==yn)&&(i.stencilFunc(ye,en,yn),at=ye,St=en,Lt=yn)},setOp:function(ye,en,yn){(dt!==ye||Wt!==en||kt!==yn)&&(i.stencilOp(ye,en,yn),dt=ye,Wt=en,kt=yn)},setLocked:function(ye){W=ye},setClear:function(ye){Te!==ye&&(i.clearStencil(ye),Te=ye)},reset:function(){W=!1,Pt=null,at=null,St=null,Lt=null,dt=null,Wt=null,kt=null,Te=null}}}let r=new e,o=new n,a=new s,c=new WeakMap,l=new WeakMap,u={},f={},h={},d=new WeakMap,g=[],v=null,p=!1,m=null,w=null,R=null,b=null,A=null,S=null,I=null,x=new oe(0,0,0),E=0,D=!1,P=null,V=null,q=null,N=null,z=null,Z=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),L=!1,Q=0,Y=i.getParameter(i.VERSION);Y.indexOf("WebGL")!==-1?(Q=parseFloat(/^WebGL (\d)/.exec(Y)[1]),L=Q>=1):Y.indexOf("OpenGL ES")!==-1&&(Q=parseFloat(/^OpenGL ES (\d)/.exec(Y)[1]),L=Q>=2);let $=null,nt={},mt=i.getParameter(i.SCISSOR_BOX),ht=i.getParameter(i.VIEWPORT),Qt=new Ue().fromArray(mt),Rt=new Ue().fromArray(ht);function Kt(W,Pt,at,St){let Lt=new Uint8Array(4),dt=i.createTexture();i.bindTexture(W,dt),i.texParameteri(W,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(W,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Wt=0;Wt<at;Wt++)W===i.TEXTURE_3D||W===i.TEXTURE_2D_ARRAY?i.texImage3D(Pt,0,i.RGBA,1,1,St,0,i.RGBA,i.UNSIGNED_BYTE,Lt):i.texImage2D(Pt+Wt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Lt);return dt}let rt={};rt[i.TEXTURE_2D]=Kt(i.TEXTURE_2D,i.TEXTURE_2D,1),rt[i.TEXTURE_CUBE_MAP]=Kt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),rt[i.TEXTURE_2D_ARRAY]=Kt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),rt[i.TEXTURE_3D]=Kt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ut(i.DEPTH_TEST),o.setFunc(Is),pt(!1),Et(Nc),ut(i.CULL_FACE),gt(ai);function ut(W){u[W]!==!0&&(i.enable(W),u[W]=!0)}function Mt(W){u[W]!==!1&&(i.disable(W),u[W]=!1)}function Bt(W,Pt){return h[W]!==Pt?(i.bindFramebuffer(W,Pt),h[W]=Pt,W===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=Pt),W===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=Pt),!0):!1}function Dt(W,Pt){let at=g,St=!1;if(W){at=d.get(Pt),at===void 0&&(at=[],d.set(Pt,at));let Lt=W.textures;if(at.length!==Lt.length||at[0]!==i.COLOR_ATTACHMENT0){for(let dt=0,Wt=Lt.length;dt<Wt;dt++)at[dt]=i.COLOR_ATTACHMENT0+dt;at.length=Lt.length,St=!0}}else at[0]!==i.BACK&&(at[0]=i.BACK,St=!0);St&&i.drawBuffers(at)}function ie(W){return v!==W?(i.useProgram(W),v=W,!0):!1}let Me={[ls]:i.FUNC_ADD,[Pu]:i.FUNC_SUBTRACT,[Lu]:i.FUNC_REVERSE_SUBTRACT};Me[Du]=i.MIN,Me[Nu]=i.MAX;let ft={[Uu]:i.ZERO,[Fu]:i.ONE,[Ou]:i.SRC_COLOR,[Bc]:i.SRC_ALPHA,[Hu]:i.SRC_ALPHA_SATURATE,[Vu]:i.DST_COLOR,[zu]:i.DST_ALPHA,[Bu]:i.ONE_MINUS_SRC_COLOR,[zc]:i.ONE_MINUS_SRC_ALPHA,[Gu]:i.ONE_MINUS_DST_COLOR,[ku]:i.ONE_MINUS_DST_ALPHA,[Wu]:i.CONSTANT_COLOR,[Xu]:i.ONE_MINUS_CONSTANT_COLOR,[qu]:i.CONSTANT_ALPHA,[Yu]:i.ONE_MINUS_CONSTANT_ALPHA};function gt(W,Pt,at,St,Lt,dt,Wt,kt,Te,ye){if(W===ai){p===!0&&(Mt(i.BLEND),p=!1);return}if(p===!1&&(ut(i.BLEND),p=!0),W!==Iu){if(W!==m||ye!==D){if((w!==ls||A!==ls)&&(i.blendEquation(i.FUNC_ADD),w=ls,A=ls),ye)switch(W){case Ws:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Uc:i.blendFunc(i.ONE,i.ONE);break;case Fc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Oc:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:se("WebGLState: Invalid blending: ",W);break}else switch(W){case Ws:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Uc:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Fc:se("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Oc:se("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:se("WebGLState: Invalid blending: ",W);break}R=null,b=null,S=null,I=null,x.set(0,0,0),E=0,m=W,D=ye}return}Lt=Lt||Pt,dt=dt||at,Wt=Wt||St,(Pt!==w||Lt!==A)&&(i.blendEquationSeparate(Me[Pt],Me[Lt]),w=Pt,A=Lt),(at!==R||St!==b||dt!==S||Wt!==I)&&(i.blendFuncSeparate(ft[at],ft[St],ft[dt],ft[Wt]),R=at,b=St,S=dt,I=Wt),(kt.equals(x)===!1||Te!==E)&&(i.blendColor(kt.r,kt.g,kt.b,Te),x.copy(kt),E=Te),m=W,D=!1}function lt(W,Pt){W.side===oi?Mt(i.CULL_FACE):ut(i.CULL_FACE);let at=W.side===tn;Pt&&(at=!at),pt(at),W.blending===Ws&&W.transparent===!1?gt(ai):gt(W.blending,W.blendEquation,W.blendSrc,W.blendDst,W.blendEquationAlpha,W.blendSrcAlpha,W.blendDstAlpha,W.blendColor,W.blendAlpha,W.premultipliedAlpha),o.setFunc(W.depthFunc),o.setTest(W.depthTest),o.setMask(W.depthWrite),r.setMask(W.colorWrite);let St=W.stencilWrite;a.setTest(St),St&&(a.setMask(W.stencilWriteMask),a.setFunc(W.stencilFunc,W.stencilRef,W.stencilFuncMask),a.setOp(W.stencilFail,W.stencilZFail,W.stencilZPass)),Zt(W.polygonOffset,W.polygonOffsetFactor,W.polygonOffsetUnits),W.alphaToCoverage===!0?ut(i.SAMPLE_ALPHA_TO_COVERAGE):Mt(i.SAMPLE_ALPHA_TO_COVERAGE)}function pt(W){P!==W&&(W?i.frontFace(i.CW):i.frontFace(i.CCW),P=W)}function Et(W){W!==Eu?(ut(i.CULL_FACE),W!==V&&(W===Nc?i.cullFace(i.BACK):W===Cu?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Mt(i.CULL_FACE),V=W}function Yt(W){W!==q&&(L&&i.lineWidth(W),q=W)}function Zt(W,Pt,at){W?(ut(i.POLYGON_OFFSET_FILL),(N!==Pt||z!==at)&&(N=Pt,z=at,o.getReversed()&&(Pt=-Pt),i.polygonOffset(Pt,at))):Mt(i.POLYGON_OFFSET_FILL)}function ee(W){W?ut(i.SCISSOR_TEST):Mt(i.SCISSOR_TEST)}function te(W){W===void 0&&(W=i.TEXTURE0+Z-1),$!==W&&(i.activeTexture(W),$=W)}function U(W,Pt,at){at===void 0&&($===null?at=i.TEXTURE0+Z-1:at=$);let St=nt[at];St===void 0&&(St={type:void 0,texture:void 0},nt[at]=St),(St.type!==W||St.texture!==Pt)&&($!==at&&(i.activeTexture(at),$=at),i.bindTexture(W,Pt||rt[W]),St.type=W,St.texture=Pt)}function Se(){let W=nt[$];W!==void 0&&W.type!==void 0&&(i.bindTexture(W.type,null),W.type=void 0,W.texture=void 0)}function ue(){try{i.compressedTexImage2D(...arguments)}catch(W){se("WebGLState:",W)}}function C(){try{i.compressedTexImage3D(...arguments)}catch(W){se("WebGLState:",W)}}function _(){try{i.texSubImage2D(...arguments)}catch(W){se("WebGLState:",W)}}function H(){try{i.texSubImage3D(...arguments)}catch(W){se("WebGLState:",W)}}function j(){try{i.compressedTexSubImage2D(...arguments)}catch(W){se("WebGLState:",W)}}function ot(){try{i.compressedTexSubImage3D(...arguments)}catch(W){se("WebGLState:",W)}}function yt(){try{i.texStorage2D(...arguments)}catch(W){se("WebGLState:",W)}}function xt(){try{i.texStorage3D(...arguments)}catch(W){se("WebGLState:",W)}}function K(){try{i.texImage2D(...arguments)}catch(W){se("WebGLState:",W)}}function ct(){try{i.texImage3D(...arguments)}catch(W){se("WebGLState:",W)}}function bt(W){return f[W]!==void 0?f[W]:i.getParameter(W)}function Vt(W,Pt){f[W]!==Pt&&(i.pixelStorei(W,Pt),f[W]=Pt)}function It(W){Qt.equals(W)===!1&&(i.scissor(W.x,W.y,W.z,W.w),Qt.copy(W))}function Ct(W){Rt.equals(W)===!1&&(i.viewport(W.x,W.y,W.z,W.w),Rt.copy(W))}function Ht(W,Pt){let at=l.get(Pt);at===void 0&&(at=new WeakMap,l.set(Pt,at));let St=at.get(W);St===void 0&&(St=i.getUniformBlockIndex(Pt,W.name),at.set(W,St))}function $t(W,Pt){let St=l.get(Pt).get(W);c.get(Pt)!==St&&(i.uniformBlockBinding(Pt,St,W.__bindingPointIndex),c.set(Pt,St))}function ae(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),u={},f={},$=null,nt={},h={},d=new WeakMap,g=[],v=null,p=!1,m=null,w=null,R=null,b=null,A=null,S=null,I=null,x=new oe(0,0,0),E=0,D=!1,P=null,V=null,q=null,N=null,z=null,Qt.set(0,0,i.canvas.width,i.canvas.height),Rt.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:ut,disable:Mt,bindFramebuffer:Bt,drawBuffers:Dt,useProgram:ie,setBlending:gt,setMaterial:lt,setFlipSided:pt,setCullFace:Et,setLineWidth:Yt,setPolygonOffset:Zt,setScissorTest:ee,activeTexture:te,bindTexture:U,unbindTexture:Se,compressedTexImage2D:ue,compressedTexImage3D:C,texImage2D:K,texImage3D:ct,pixelStorei:Vt,getParameter:bt,updateUBOMapping:Ht,uniformBlockBinding:$t,texStorage2D:yt,texStorage3D:xt,texSubImage2D:_,texSubImage3D:H,compressedTexSubImage2D:j,compressedTexSubImage3D:ot,scissor:It,viewport:Ct,reset:ae}}function y_(i,t,e,n,s,r,o){let a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Tt,u=new WeakMap,f=new Set,h,d=new WeakMap,g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(C,_){return g?new OffscreenCanvas(C,_):wr("canvas")}function p(C,_,H){let j=1,ot=ue(C);if((ot.width>H||ot.height>H)&&(j=H/Math.max(ot.width,ot.height)),j<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){let yt=Math.floor(j*ot.width),xt=Math.floor(j*ot.height);h===void 0&&(h=v(yt,xt));let K=_?v(yt,xt):h;return K.width=yt,K.height=xt,K.getContext("2d").drawImage(C,0,0,yt,xt),ne("WebGLRenderer: Texture has been resized from ("+ot.width+"x"+ot.height+") to ("+yt+"x"+xt+")."),K}else return"data"in C&&ne("WebGLRenderer: Image in DataTexture is too big ("+ot.width+"x"+ot.height+")."),C;return C}function m(C){return C.generateMipmaps}function w(C){i.generateMipmap(C)}function R(C){return C.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?i.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function b(C,_,H,j,ot,yt=!1){if(C!==null){if(i[C]!==void 0)return i[C];ne("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let xt;j&&(xt=t.get("EXT_texture_norm16"),xt||ne("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let K=_;if(_===i.RED&&(H===i.FLOAT&&(K=i.R32F),H===i.HALF_FLOAT&&(K=i.R16F),H===i.UNSIGNED_BYTE&&(K=i.R8),H===i.UNSIGNED_SHORT&&xt&&(K=xt.R16_EXT),H===i.SHORT&&xt&&(K=xt.R16_SNORM_EXT)),_===i.RED_INTEGER&&(H===i.UNSIGNED_BYTE&&(K=i.R8UI),H===i.UNSIGNED_SHORT&&(K=i.R16UI),H===i.UNSIGNED_INT&&(K=i.R32UI),H===i.BYTE&&(K=i.R8I),H===i.SHORT&&(K=i.R16I),H===i.INT&&(K=i.R32I)),_===i.RG&&(H===i.FLOAT&&(K=i.RG32F),H===i.HALF_FLOAT&&(K=i.RG16F),H===i.UNSIGNED_BYTE&&(K=i.RG8),H===i.UNSIGNED_SHORT&&xt&&(K=xt.RG16_EXT),H===i.SHORT&&xt&&(K=xt.RG16_SNORM_EXT)),_===i.RG_INTEGER&&(H===i.UNSIGNED_BYTE&&(K=i.RG8UI),H===i.UNSIGNED_SHORT&&(K=i.RG16UI),H===i.UNSIGNED_INT&&(K=i.RG32UI),H===i.BYTE&&(K=i.RG8I),H===i.SHORT&&(K=i.RG16I),H===i.INT&&(K=i.RG32I)),_===i.RGB_INTEGER&&(H===i.UNSIGNED_BYTE&&(K=i.RGB8UI),H===i.UNSIGNED_SHORT&&(K=i.RGB16UI),H===i.UNSIGNED_INT&&(K=i.RGB32UI),H===i.BYTE&&(K=i.RGB8I),H===i.SHORT&&(K=i.RGB16I),H===i.INT&&(K=i.RGB32I)),_===i.RGBA_INTEGER&&(H===i.UNSIGNED_BYTE&&(K=i.RGBA8UI),H===i.UNSIGNED_SHORT&&(K=i.RGBA16UI),H===i.UNSIGNED_INT&&(K=i.RGBA32UI),H===i.BYTE&&(K=i.RGBA8I),H===i.SHORT&&(K=i.RGBA16I),H===i.INT&&(K=i.RGBA32I)),_===i.RGB&&(H===i.UNSIGNED_SHORT&&xt&&(K=xt.RGB16_EXT),H===i.SHORT&&xt&&(K=xt.RGB16_SNORM_EXT),H===i.UNSIGNED_INT_5_9_9_9_REV&&(K=i.RGB9_E5),H===i.UNSIGNED_INT_10F_11F_11F_REV&&(K=i.R11F_G11F_B10F)),_===i.RGBA){let ct=yt?Sr:xe.getTransfer(ot);H===i.FLOAT&&(K=i.RGBA32F),H===i.HALF_FLOAT&&(K=i.RGBA16F),H===i.UNSIGNED_BYTE&&(K=ct===we?i.SRGB8_ALPHA8:i.RGBA8),H===i.UNSIGNED_SHORT&&xt&&(K=xt.RGBA16_EXT),H===i.SHORT&&xt&&(K=xt.RGBA16_SNORM_EXT),H===i.UNSIGNED_SHORT_4_4_4_4&&(K=i.RGBA4),H===i.UNSIGNED_SHORT_5_5_5_1&&(K=i.RGB5_A1)}return(K===i.R16F||K===i.R32F||K===i.RG16F||K===i.RG32F||K===i.RGBA16F||K===i.RGBA32F)&&t.get("EXT_color_buffer_float"),K}function A(C,_){let H;return C?_===null||_===qn||_===qs?H=i.DEPTH24_STENCIL8:_===Yn?H=i.DEPTH32F_STENCIL8:_===Xs&&(H=i.DEPTH24_STENCIL8,ne("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===qn||_===qs?H=i.DEPTH_COMPONENT24:_===Yn?H=i.DEPTH_COMPONENT32F:_===Xs&&(H=i.DEPTH_COMPONENT16),H}function S(C,_){return m(C)===!0||C.isFramebufferTexture&&C.minFilter!==Je&&C.minFilter!==je?Math.log2(Math.max(_.width,_.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?_.mipmaps.length:1}function I(C){let _=C.target;_.removeEventListener("dispose",I),E(_),_.isVideoTexture&&u.delete(_),_.isHTMLTexture&&f.delete(_)}function x(C){let _=C.target;_.removeEventListener("dispose",x),P(_)}function E(C){let _=n.get(C);if(_.__webglInit===void 0)return;let H=C.source,j=d.get(H);if(j){let ot=j[_.__cacheKey];ot.usedTimes--,ot.usedTimes===0&&D(C),Object.keys(j).length===0&&d.delete(H)}n.remove(C)}function D(C){let _=n.get(C);i.deleteTexture(_.__webglTexture);let H=C.source,j=d.get(H);delete j[_.__cacheKey],o.memory.textures--}function P(C){let _=n.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),n.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let j=0;j<6;j++){if(Array.isArray(_.__webglFramebuffer[j]))for(let ot=0;ot<_.__webglFramebuffer[j].length;ot++)i.deleteFramebuffer(_.__webglFramebuffer[j][ot]);else i.deleteFramebuffer(_.__webglFramebuffer[j]);_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer[j])}else{if(Array.isArray(_.__webglFramebuffer))for(let j=0;j<_.__webglFramebuffer.length;j++)i.deleteFramebuffer(_.__webglFramebuffer[j]);else i.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&i.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let j=0;j<_.__webglColorRenderbuffer.length;j++)_.__webglColorRenderbuffer[j]&&i.deleteRenderbuffer(_.__webglColorRenderbuffer[j]);_.__webglDepthRenderbuffer&&i.deleteRenderbuffer(_.__webglDepthRenderbuffer)}let H=C.textures;for(let j=0,ot=H.length;j<ot;j++){let yt=n.get(H[j]);yt.__webglTexture&&(i.deleteTexture(yt.__webglTexture),o.memory.textures--),n.remove(H[j])}n.remove(C)}let V=0;function q(){V=0}function N(){return V}function z(C){V=C}function Z(){let C=V;return C>=s.maxTextures&&ne("WebGLTextures: Trying to use "+(C+1)+" texture units while this GPU supports only "+s.maxTextures),V+=1,C}function L(C){let _=[];return _.push(C.wrapS),_.push(C.wrapT),_.push(C.wrapR||0),_.push(C.magFilter),_.push(C.minFilter),_.push(C.anisotropy),_.push(C.internalFormat),_.push(C.format),_.push(C.type),_.push(C.generateMipmaps),_.push(C.premultiplyAlpha),_.push(C.flipY),_.push(C.unpackAlignment),_.push(C.colorSpace),_.join()}function Q(C,_){let H=n.get(C);if(C.isVideoTexture&&U(C),C.isRenderTargetTexture===!1&&C.isExternalTexture!==!0&&C.version>0&&H.__version!==C.version){let j=C.image;if(j===null)ne("WebGLRenderer: Texture marked for update but no image data found.");else if(j.complete===!1)ne("WebGLRenderer: Texture marked for update but image is incomplete");else{Mt(H,C,_);return}}else C.isExternalTexture&&(H.__webglTexture=C.sourceTexture?C.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,H.__webglTexture,i.TEXTURE0+_)}function Y(C,_){let H=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&H.__version!==C.version){Mt(H,C,_);return}else C.isExternalTexture&&(H.__webglTexture=C.sourceTexture?C.sourceTexture:null);e.bindTexture(i.TEXTURE_2D_ARRAY,H.__webglTexture,i.TEXTURE0+_)}function $(C,_){let H=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&H.__version!==C.version){Mt(H,C,_);return}e.bindTexture(i.TEXTURE_3D,H.__webglTexture,i.TEXTURE0+_)}function nt(C,_){let H=n.get(C);if(C.isCubeDepthTexture!==!0&&C.version>0&&H.__version!==C.version){Bt(H,C,_);return}e.bindTexture(i.TEXTURE_CUBE_MAP,H.__webglTexture,i.TEXTURE0+_)}let mt={[ta]:i.REPEAT,[Qn]:i.CLAMP_TO_EDGE,[ea]:i.MIRRORED_REPEAT},ht={[Je]:i.NEAREST,[Ju]:i.NEAREST_MIPMAP_NEAREST,[Yr]:i.NEAREST_MIPMAP_LINEAR,[je]:i.LINEAR,[Fa]:i.LINEAR_MIPMAP_NEAREST,[zi]:i.LINEAR_MIPMAP_LINEAR},Qt={[Qu]:i.NEVER,[sd]:i.ALWAYS,[td]:i.LESS,[bl]:i.LEQUAL,[ed]:i.EQUAL,[Ml]:i.GEQUAL,[nd]:i.GREATER,[id]:i.NOTEQUAL};function Rt(C,_){if(_.type===Yn&&t.has("OES_texture_float_linear")===!1&&(_.magFilter===je||_.magFilter===Fa||_.magFilter===Yr||_.magFilter===zi||_.minFilter===je||_.minFilter===Fa||_.minFilter===Yr||_.minFilter===zi)&&ne("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(C,i.TEXTURE_WRAP_S,mt[_.wrapS]),i.texParameteri(C,i.TEXTURE_WRAP_T,mt[_.wrapT]),(C===i.TEXTURE_3D||C===i.TEXTURE_2D_ARRAY)&&i.texParameteri(C,i.TEXTURE_WRAP_R,mt[_.wrapR]),i.texParameteri(C,i.TEXTURE_MAG_FILTER,ht[_.magFilter]),i.texParameteri(C,i.TEXTURE_MIN_FILTER,ht[_.minFilter]),_.compareFunction&&(i.texParameteri(C,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(C,i.TEXTURE_COMPARE_FUNC,Qt[_.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===Je||_.minFilter!==Yr&&_.minFilter!==zi||_.type===Yn&&t.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||n.get(_).__currentAnisotropy){let H=t.get("EXT_texture_filter_anisotropic");i.texParameterf(C,H.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,s.getMaxAnisotropy())),n.get(_).__currentAnisotropy=_.anisotropy}}}function Kt(C,_){let H=!1;C.__webglInit===void 0&&(C.__webglInit=!0,_.addEventListener("dispose",I));let j=_.source,ot=d.get(j);ot===void 0&&(ot={},d.set(j,ot));let yt=L(_);if(yt!==C.__cacheKey){ot[yt]===void 0&&(ot[yt]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,H=!0),ot[yt].usedTimes++;let xt=ot[C.__cacheKey];xt!==void 0&&(ot[C.__cacheKey].usedTimes--,xt.usedTimes===0&&D(_)),C.__cacheKey=yt,C.__webglTexture=ot[yt].texture}return H}function rt(C,_,H){return Math.floor(Math.floor(C/H)/_)}function ut(C,_,H,j){let yt=C.updateRanges;if(yt.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,_.width,_.height,H,j,_.data);else{yt.sort((Vt,It)=>Vt.start-It.start);let xt=0;for(let Vt=1;Vt<yt.length;Vt++){let It=yt[xt],Ct=yt[Vt],Ht=It.start+It.count,$t=rt(Ct.start,_.width,4),ae=rt(It.start,_.width,4);Ct.start<=Ht+1&&$t===ae&&rt(Ct.start+Ct.count-1,_.width,4)===$t?It.count=Math.max(It.count,Ct.start+Ct.count-It.start):(++xt,yt[xt]=Ct)}yt.length=xt+1;let K=e.getParameter(i.UNPACK_ROW_LENGTH),ct=e.getParameter(i.UNPACK_SKIP_PIXELS),bt=e.getParameter(i.UNPACK_SKIP_ROWS);e.pixelStorei(i.UNPACK_ROW_LENGTH,_.width);for(let Vt=0,It=yt.length;Vt<It;Vt++){let Ct=yt[Vt],Ht=Math.floor(Ct.start/4),$t=Math.ceil(Ct.count/4),ae=Ht%_.width,W=Math.floor(Ht/_.width),Pt=$t,at=1;e.pixelStorei(i.UNPACK_SKIP_PIXELS,ae),e.pixelStorei(i.UNPACK_SKIP_ROWS,W),e.texSubImage2D(i.TEXTURE_2D,0,ae,W,Pt,at,H,j,_.data)}C.clearUpdateRanges(),e.pixelStorei(i.UNPACK_ROW_LENGTH,K),e.pixelStorei(i.UNPACK_SKIP_PIXELS,ct),e.pixelStorei(i.UNPACK_SKIP_ROWS,bt)}}function Mt(C,_,H){let j=i.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(j=i.TEXTURE_2D_ARRAY),_.isData3DTexture&&(j=i.TEXTURE_3D);let ot=Kt(C,_),yt=_.source;e.bindTexture(j,C.__webglTexture,i.TEXTURE0+H);let xt=n.get(yt);if(yt.version!==xt.__version||ot===!0){if(e.activeTexture(i.TEXTURE0+H),(typeof ImageBitmap<"u"&&_.image instanceof ImageBitmap)===!1){let at=xe.getPrimaries(xe.workingColorSpace),St=_.colorSpace===wi?null:xe.getPrimaries(_.colorSpace),Lt=_.colorSpace===wi||at===St?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Lt)}e.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment);let ct=p(_.image,!1,s.maxTextureSize);ct=Se(_,ct);let bt=r.convert(_.format,_.colorSpace),Vt=r.convert(_.type),It=b(_.internalFormat,bt,Vt,_.normalized,_.colorSpace,_.isVideoTexture);Rt(j,_);let Ct,Ht=_.mipmaps,$t=_.isVideoTexture!==!0,ae=xt.__version===void 0||ot===!0,W=yt.dataReady,Pt=S(_,ct);if(_.isDepthTexture)It=A(_.format===ki,_.type),ae&&($t?e.texStorage2D(i.TEXTURE_2D,1,It,ct.width,ct.height):e.texImage2D(i.TEXTURE_2D,0,It,ct.width,ct.height,0,bt,Vt,null));else if(_.isDataTexture)if(Ht.length>0){$t&&ae&&e.texStorage2D(i.TEXTURE_2D,Pt,It,Ht[0].width,Ht[0].height);for(let at=0,St=Ht.length;at<St;at++)Ct=Ht[at],$t?W&&e.texSubImage2D(i.TEXTURE_2D,at,0,0,Ct.width,Ct.height,bt,Vt,Ct.data):e.texImage2D(i.TEXTURE_2D,at,It,Ct.width,Ct.height,0,bt,Vt,Ct.data);_.generateMipmaps=!1}else $t?(ae&&e.texStorage2D(i.TEXTURE_2D,Pt,It,ct.width,ct.height),W&&ut(_,ct,bt,Vt)):e.texImage2D(i.TEXTURE_2D,0,It,ct.width,ct.height,0,bt,Vt,ct.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){$t&&ae&&e.texStorage3D(i.TEXTURE_2D_ARRAY,Pt,It,Ht[0].width,Ht[0].height,ct.depth);for(let at=0,St=Ht.length;at<St;at++)if(Ct=Ht[at],_.format!==Ln)if(bt!==null)if($t){if(W)if(_.layerUpdates.size>0){let Lt=ch(Ct.width,Ct.height,_.format,_.type);for(let dt of _.layerUpdates){let Wt=Ct.data.subarray(dt*Lt/Ct.data.BYTES_PER_ELEMENT,(dt+1)*Lt/Ct.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,at,0,0,dt,Ct.width,Ct.height,1,bt,Wt)}}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,at,0,0,0,Ct.width,Ct.height,ct.depth,bt,Ct.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,at,It,Ct.width,Ct.height,ct.depth,0,Ct.data,0,0);else ne("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else $t?W&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,at,0,0,0,Ct.width,Ct.height,ct.depth,bt,Vt,Ct.data):e.texImage3D(i.TEXTURE_2D_ARRAY,at,It,Ct.width,Ct.height,ct.depth,0,bt,Vt,Ct.data);_.layerUpdates.size>0&&_.clearLayerUpdates()}else{$t&&ae&&e.texStorage2D(i.TEXTURE_2D,Pt,It,Ht[0].width,Ht[0].height);for(let at=0,St=Ht.length;at<St;at++)Ct=Ht[at],_.format!==Ln?bt!==null?$t?W&&e.compressedTexSubImage2D(i.TEXTURE_2D,at,0,0,Ct.width,Ct.height,bt,Ct.data):e.compressedTexImage2D(i.TEXTURE_2D,at,It,Ct.width,Ct.height,0,Ct.data):ne("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):$t?W&&e.texSubImage2D(i.TEXTURE_2D,at,0,0,Ct.width,Ct.height,bt,Vt,Ct.data):e.texImage2D(i.TEXTURE_2D,at,It,Ct.width,Ct.height,0,bt,Vt,Ct.data)}else if(_.isDataArrayTexture)if($t){if(ae&&e.texStorage3D(i.TEXTURE_2D_ARRAY,Pt,It,ct.width,ct.height,ct.depth),W)if(_.layerUpdates.size>0){let at=ch(ct.width,ct.height,_.format,_.type);for(let St of _.layerUpdates){let Lt=ct.data.subarray(St*at/ct.data.BYTES_PER_ELEMENT,(St+1)*at/ct.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,St,ct.width,ct.height,1,bt,Vt,Lt)}_.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ct.width,ct.height,ct.depth,bt,Vt,ct.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,It,ct.width,ct.height,ct.depth,0,bt,Vt,ct.data);else if(_.isData3DTexture)$t?(ae&&e.texStorage3D(i.TEXTURE_3D,Pt,It,ct.width,ct.height,ct.depth),W&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ct.width,ct.height,ct.depth,bt,Vt,ct.data)):e.texImage3D(i.TEXTURE_3D,0,It,ct.width,ct.height,ct.depth,0,bt,Vt,ct.data);else if(_.isFramebufferTexture){if(ae)if($t)e.texStorage2D(i.TEXTURE_2D,Pt,It,ct.width,ct.height);else{let at=ct.width,St=ct.height;for(let Lt=0;Lt<Pt;Lt++)e.texImage2D(i.TEXTURE_2D,Lt,It,at,St,0,bt,Vt,null),at>>=1,St>>=1}}else if(_.isHTMLTexture){if("texElementImage2D"in i){let at=i.canvas;if(at.hasAttribute("layoutsubtree")||at.setAttribute("layoutsubtree","true"),ct.parentNode!==at){at.appendChild(ct),f.add(_),at.onpaint=St=>{let Lt=St.changedElements;for(let dt of f)Lt.includes(dt.image)&&(dt.needsUpdate=!0)},at.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,ct);else{let Lt=i.RGBA,dt=i.RGBA,Wt=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,Lt,dt,Wt,ct)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(Ht.length>0){if($t&&ae){let at=ue(Ht[0]);e.texStorage2D(i.TEXTURE_2D,Pt,It,at.width,at.height)}for(let at=0,St=Ht.length;at<St;at++)Ct=Ht[at],$t?W&&e.texSubImage2D(i.TEXTURE_2D,at,0,0,bt,Vt,Ct):e.texImage2D(i.TEXTURE_2D,at,It,bt,Vt,Ct);_.generateMipmaps=!1}else if($t){if(ae){let at=ue(ct);e.texStorage2D(i.TEXTURE_2D,Pt,It,at.width,at.height)}W&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,bt,Vt,ct)}else e.texImage2D(i.TEXTURE_2D,0,It,bt,Vt,ct);m(_)&&w(j),xt.__version=yt.version,_.onUpdate&&_.onUpdate(_)}C.__version=_.version}function Bt(C,_,H){if(_.image.length!==6)return;let j=Kt(C,_),ot=_.source;e.bindTexture(i.TEXTURE_CUBE_MAP,C.__webglTexture,i.TEXTURE0+H);let yt=n.get(ot);if(ot.version!==yt.__version||j===!0){e.activeTexture(i.TEXTURE0+H);let xt=xe.getPrimaries(xe.workingColorSpace),K=_.colorSpace===wi?null:xe.getPrimaries(_.colorSpace),ct=_.colorSpace===wi||xt===K?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),e.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ct);let bt=_.isCompressedTexture||_.image[0].isCompressedTexture,Vt=_.image[0]&&_.image[0].isDataTexture,It=[];for(let dt=0;dt<6;dt++)!bt&&!Vt?It[dt]=p(_.image[dt],!0,s.maxCubemapSize):It[dt]=Vt?_.image[dt].image:_.image[dt],It[dt]=Se(_,It[dt]);let Ct=It[0],Ht=r.convert(_.format,_.colorSpace),$t=r.convert(_.type),ae=b(_.internalFormat,Ht,$t,_.normalized,_.colorSpace),W=_.isVideoTexture!==!0,Pt=yt.__version===void 0||j===!0,at=ot.dataReady,St=S(_,Ct);Rt(i.TEXTURE_CUBE_MAP,_);let Lt;if(bt){W&&Pt&&e.texStorage2D(i.TEXTURE_CUBE_MAP,St,ae,Ct.width,Ct.height);for(let dt=0;dt<6;dt++){Lt=It[dt].mipmaps;for(let Wt=0;Wt<Lt.length;Wt++){let kt=Lt[Wt];_.format!==Ln?Ht!==null?W?at&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+dt,Wt,0,0,kt.width,kt.height,Ht,kt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+dt,Wt,ae,kt.width,kt.height,0,kt.data):ne("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):W?at&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+dt,Wt,0,0,kt.width,kt.height,Ht,$t,kt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+dt,Wt,ae,kt.width,kt.height,0,Ht,$t,kt.data)}}}else{if(Lt=_.mipmaps,W&&Pt){Lt.length>0&&St++;let dt=ue(It[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,St,ae,dt.width,dt.height)}for(let dt=0;dt<6;dt++)if(Vt){W?at&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+dt,0,0,0,It[dt].width,It[dt].height,Ht,$t,It[dt].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+dt,0,ae,It[dt].width,It[dt].height,0,Ht,$t,It[dt].data);for(let Wt=0;Wt<Lt.length;Wt++){let Te=Lt[Wt].image[dt].image;W?at&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+dt,Wt+1,0,0,Te.width,Te.height,Ht,$t,Te.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+dt,Wt+1,ae,Te.width,Te.height,0,Ht,$t,Te.data)}}else{W?at&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+dt,0,0,0,Ht,$t,It[dt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+dt,0,ae,Ht,$t,It[dt]);for(let Wt=0;Wt<Lt.length;Wt++){let kt=Lt[Wt];W?at&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+dt,Wt+1,0,0,Ht,$t,kt.image[dt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+dt,Wt+1,ae,Ht,$t,kt.image[dt])}}}m(_)&&w(i.TEXTURE_CUBE_MAP),yt.__version=ot.version,_.onUpdate&&_.onUpdate(_)}C.__version=_.version}function Dt(C,_,H,j,ot,yt){let xt=r.convert(H.format,H.colorSpace),K=r.convert(H.type),ct=b(H.internalFormat,xt,K,H.normalized,H.colorSpace),bt=n.get(_),Vt=n.get(H);if(Vt.__renderTarget=_,!bt.__hasExternalTextures){let It=Math.max(1,_.width>>yt),Ct=Math.max(1,_.height>>yt);ot===i.TEXTURE_3D||ot===i.TEXTURE_2D_ARRAY?e.texImage3D(ot,yt,ct,It,Ct,_.depth,0,xt,K,null):e.texImage2D(ot,yt,ct,It,Ct,0,xt,K,null)}e.bindFramebuffer(i.FRAMEBUFFER,C),te(_)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,j,ot,Vt.__webglTexture,0,ee(_)):(ot===i.TEXTURE_2D||ot>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&ot<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,j,ot,Vt.__webglTexture,yt),e.bindFramebuffer(i.FRAMEBUFFER,null)}function ie(C,_,H){if(i.bindRenderbuffer(i.RENDERBUFFER,C),_.depthBuffer){let j=_.depthTexture,ot=j&&j.isDepthTexture?j.type:null,yt=A(_.stencilBuffer,ot),xt=_.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;te(_)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ee(_),yt,_.width,_.height):H?i.renderbufferStorageMultisample(i.RENDERBUFFER,ee(_),yt,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,yt,_.width,_.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,xt,i.RENDERBUFFER,C)}else{let j=_.textures;for(let ot=0;ot<j.length;ot++){let yt=j[ot],xt=r.convert(yt.format,yt.colorSpace),K=r.convert(yt.type),ct=b(yt.internalFormat,xt,K,yt.normalized,yt.colorSpace);te(_)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ee(_),ct,_.width,_.height):H?i.renderbufferStorageMultisample(i.RENDERBUFFER,ee(_),ct,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,ct,_.width,_.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Me(C,_,H){let j=_.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(i.FRAMEBUFFER,C),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let ot=n.get(_.depthTexture);if(ot.__renderTarget=_,(!ot.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),j){if(ot.__webglInit===void 0&&(ot.__webglInit=!0,_.depthTexture.addEventListener("dispose",I)),ot.__webglTexture===void 0){ot.__webglTexture=i.createTexture(),e.bindTexture(i.TEXTURE_CUBE_MAP,ot.__webglTexture),Rt(i.TEXTURE_CUBE_MAP,_.depthTexture);let bt=r.convert(_.depthTexture.format),Vt=r.convert(_.depthTexture.type),It;_.depthTexture.format===ti?It=i.DEPTH_COMPONENT24:_.depthTexture.format===ki&&(It=i.DEPTH24_STENCIL8);for(let Ct=0;Ct<6;Ct++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ct,0,It,_.width,_.height,0,bt,Vt,null)}}else Q(_.depthTexture,0);let yt=ot.__webglTexture,xt=ee(_),K=j?i.TEXTURE_CUBE_MAP_POSITIVE_X+H:i.TEXTURE_2D,ct=_.depthTexture.format===ki?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(_.depthTexture.format===ti)te(_)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ct,K,yt,0,xt):i.framebufferTexture2D(i.FRAMEBUFFER,ct,K,yt,0);else if(_.depthTexture.format===ki)te(_)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ct,K,yt,0,xt):i.framebufferTexture2D(i.FRAMEBUFFER,ct,K,yt,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function ft(C){let _=n.get(C),H=C.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==C.depthTexture){let j=C.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),j){let ot=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,j.removeEventListener("dispose",ot)};j.addEventListener("dispose",ot),_.__depthDisposeCallback=ot}_.__boundDepthTexture=j}if(C.depthTexture&&!_.__autoAllocateDepthBuffer)if(H)for(let j=0;j<6;j++)Me(_.__webglFramebuffer[j],C,j);else{let j=C.texture.mipmaps;j&&j.length>0?Me(_.__webglFramebuffer[0],C,0):Me(_.__webglFramebuffer,C,0)}else if(H){_.__webglDepthbuffer=[];for(let j=0;j<6;j++)if(e.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[j]),_.__webglDepthbuffer[j]===void 0)_.__webglDepthbuffer[j]=i.createRenderbuffer(),ie(_.__webglDepthbuffer[j],C,!1);else{let ot=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,yt=_.__webglDepthbuffer[j];i.bindRenderbuffer(i.RENDERBUFFER,yt),i.framebufferRenderbuffer(i.FRAMEBUFFER,ot,i.RENDERBUFFER,yt)}}else{let j=C.texture.mipmaps;if(j&&j.length>0?e.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=i.createRenderbuffer(),ie(_.__webglDepthbuffer,C,!1);else{let ot=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,yt=_.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,yt),i.framebufferRenderbuffer(i.FRAMEBUFFER,ot,i.RENDERBUFFER,yt)}}e.bindFramebuffer(i.FRAMEBUFFER,null)}function gt(C,_,H){let j=n.get(C);_!==void 0&&Dt(j.__webglFramebuffer,C,C.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),H!==void 0&&ft(C)}function lt(C){let _=C.texture,H=n.get(C),j=n.get(_);C.addEventListener("dispose",x);let ot=C.textures,yt=C.isWebGLCubeRenderTarget===!0,xt=ot.length>1;if(xt||(j.__webglTexture===void 0&&(j.__webglTexture=i.createTexture()),j.__version=_.version,o.memory.textures++),yt){H.__webglFramebuffer=[];for(let K=0;K<6;K++)if(_.mipmaps&&_.mipmaps.length>0){H.__webglFramebuffer[K]=[];for(let ct=0;ct<_.mipmaps.length;ct++)H.__webglFramebuffer[K][ct]=i.createFramebuffer()}else H.__webglFramebuffer[K]=i.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){H.__webglFramebuffer=[];for(let K=0;K<_.mipmaps.length;K++)H.__webglFramebuffer[K]=i.createFramebuffer()}else H.__webglFramebuffer=i.createFramebuffer();if(xt)for(let K=0,ct=ot.length;K<ct;K++){let bt=n.get(ot[K]);bt.__webglTexture===void 0&&(bt.__webglTexture=i.createTexture(),o.memory.textures++)}if(C.samples>0&&te(C)===!1){H.__webglMultisampledFramebuffer=i.createFramebuffer(),H.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,H.__webglMultisampledFramebuffer);for(let K=0;K<ot.length;K++){let ct=ot[K];H.__webglColorRenderbuffer[K]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,H.__webglColorRenderbuffer[K]);let bt=r.convert(ct.format,ct.colorSpace),Vt=r.convert(ct.type),It=b(ct.internalFormat,bt,Vt,ct.normalized,ct.colorSpace,C.isXRRenderTarget===!0),Ct=ee(C);i.renderbufferStorageMultisample(i.RENDERBUFFER,Ct,It,C.width,C.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+K,i.RENDERBUFFER,H.__webglColorRenderbuffer[K])}i.bindRenderbuffer(i.RENDERBUFFER,null),C.depthBuffer&&(H.__webglDepthRenderbuffer=i.createRenderbuffer(),ie(H.__webglDepthRenderbuffer,C,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(yt){e.bindTexture(i.TEXTURE_CUBE_MAP,j.__webglTexture),Rt(i.TEXTURE_CUBE_MAP,_);for(let K=0;K<6;K++)if(_.mipmaps&&_.mipmaps.length>0)for(let ct=0;ct<_.mipmaps.length;ct++)Dt(H.__webglFramebuffer[K][ct],C,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+K,ct);else Dt(H.__webglFramebuffer[K],C,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0);m(_)&&w(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(xt){for(let K=0,ct=ot.length;K<ct;K++){let bt=ot[K],Vt=n.get(bt),It=i.TEXTURE_2D;(C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(It=C.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(It,Vt.__webglTexture),Rt(It,bt),Dt(H.__webglFramebuffer,C,bt,i.COLOR_ATTACHMENT0+K,It,0),m(bt)&&w(It)}e.unbindTexture()}else{let K=i.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(K=C.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(K,j.__webglTexture),Rt(K,_),_.mipmaps&&_.mipmaps.length>0)for(let ct=0;ct<_.mipmaps.length;ct++)Dt(H.__webglFramebuffer[ct],C,_,i.COLOR_ATTACHMENT0,K,ct);else Dt(H.__webglFramebuffer,C,_,i.COLOR_ATTACHMENT0,K,0);m(_)&&w(K),e.unbindTexture()}C.depthBuffer&&ft(C)}function pt(C){let _=C.textures;for(let H=0,j=_.length;H<j;H++){let ot=_[H];if(m(ot)){let yt=R(C),xt=n.get(ot).__webglTexture;e.bindTexture(yt,xt),w(yt),e.unbindTexture()}}}let Et=[],Yt=[];function Zt(C){if(C.samples>0){if(te(C)===!1){let _=C.textures,H=C.width,j=C.height,ot=i.COLOR_BUFFER_BIT,yt=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,xt=n.get(C),K=_.length>1;if(K)for(let bt=0;bt<_.length;bt++)e.bindFramebuffer(i.FRAMEBUFFER,xt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+bt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,xt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+bt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,xt.__webglMultisampledFramebuffer);let ct=C.texture.mipmaps;ct&&ct.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,xt.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,xt.__webglFramebuffer);for(let bt=0;bt<_.length;bt++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(ot|=i.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(ot|=i.STENCIL_BUFFER_BIT)),K){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,xt.__webglColorRenderbuffer[bt]);let Vt=n.get(_[bt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Vt,0)}i.blitFramebuffer(0,0,H,j,0,0,H,j,ot,i.NEAREST),c===!0&&(Et.length=0,Yt.length=0,Et.push(i.COLOR_ATTACHMENT0+bt),C.depthBuffer&&C.storeMultisampledDepthBuffer===!1&&(Et.push(yt),Yt.push(yt),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Yt)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Et))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),K)for(let bt=0;bt<_.length;bt++){e.bindFramebuffer(i.FRAMEBUFFER,xt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+bt,i.RENDERBUFFER,xt.__webglColorRenderbuffer[bt]);let Vt=n.get(_[bt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,xt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+bt,i.TEXTURE_2D,Vt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,xt.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.storeMultisampledDepthBuffer===!1&&c){let _=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[_])}}}function ee(C){return Math.min(s.maxSamples,C.samples)}function te(C){let _=n.get(C);return C.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function U(C){let _=o.render.frame;u.get(C)!==_&&(u.set(C,_),C.update())}function Se(C,_){let H=C.colorSpace,j=C.format,ot=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||H!==Mr&&H!==wi&&(xe.getTransfer(H)===we?(j!==Ln||ot!==_n)&&ne("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):se("WebGLTextures: Unsupported texture color space:",H)),_}function ue(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(l.width=C.naturalWidth||C.width,l.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(l.width=C.displayWidth,l.height=C.displayHeight):(l.width=C.width,l.height=C.height),l}this.allocateTextureUnit=Z,this.resetTextureUnits=q,this.getTextureUnits=N,this.setTextureUnits=z,this.setTexture2D=Q,this.setTexture2DArray=Y,this.setTexture3D=$,this.setTextureCube=nt,this.rebindTextures=gt,this.setupRenderTarget=lt,this.updateRenderTargetMipmap=pt,this.updateMultisampleRenderTarget=Zt,this.setupDepthRenderbuffer=ft,this.setupFrameBufferTexture=Dt,this.useMultisampledRTT=te,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function v_(i,t){function e(n,s=wi){let r,o=xe.getTransfer(s);if(n===_n)return i.UNSIGNED_BYTE;if(n===Ba)return i.UNSIGNED_SHORT_4_4_4_4;if(n===za)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Jc)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Kc)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===$c)return i.BYTE;if(n===Zc)return i.SHORT;if(n===Xs)return i.UNSIGNED_SHORT;if(n===Oa)return i.INT;if(n===qn)return i.UNSIGNED_INT;if(n===Yn)return i.FLOAT;if(n===$n)return i.HALF_FLOAT;if(n===jc)return i.ALPHA;if(n===Qc)return i.RGB;if(n===Ln)return i.RGBA;if(n===ti)return i.DEPTH_COMPONENT;if(n===ki)return i.DEPTH_STENCIL;if(n===th)return i.RED;if(n===ka)return i.RED_INTEGER;if(n===Vi)return i.RG;if(n===Va)return i.RG_INTEGER;if(n===Ga)return i.RGBA_INTEGER;if(n===$r||n===Zr||n===Jr||n===Kr)if(o===we)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===$r)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Zr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Jr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Kr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===$r)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Zr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Jr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Kr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Ha||n===Wa||n===Xa||n===qa)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Ha)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Wa)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Xa)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===qa)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Ya||n===$a||n===Za||n===Ja||n===Ka||n===jr||n===ja)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Ya||n===$a)return o===we?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Za)return o===we?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===Ja)return r.COMPRESSED_R11_EAC;if(n===Ka)return r.COMPRESSED_SIGNED_R11_EAC;if(n===jr)return r.COMPRESSED_RG11_EAC;if(n===ja)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Qa||n===tl||n===el||n===nl||n===il||n===sl||n===rl||n===ol||n===al||n===ll||n===cl||n===hl||n===ul||n===dl)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Qa)return o===we?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===tl)return o===we?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===el)return o===we?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===nl)return o===we?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===il)return o===we?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===sl)return o===we?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===rl)return o===we?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===ol)return o===we?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===al)return o===we?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===ll)return o===we?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===cl)return o===we?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===hl)return o===we?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===ul)return o===we?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===dl)return o===we?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===fl||n===pl||n===ml)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===fl)return o===we?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===pl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===ml)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===gl||n===xl||n===Qr||n===_l)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===gl)return r.COMPRESSED_RED_RGTC1_EXT;if(n===xl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Qr)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===_l)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===qs?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}var b_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,M_=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Sh=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let n=new Rr(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new Tn({vertexShader:b_,fragmentShader:M_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new De(new os(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},wh=class extends ei{constructor(t,e){super();let n=this,s=null,r=1,o=null,a="local-floor",c=1,l=null,u=null,f=null,h=null,d=null,g=null,v=typeof XRWebGLBinding<"u",p=new Sh,m={},w=e.getContextAttributes(),R=null,b=null,A=[],S=[],I=new Tt,x=null,E=null,D=new pn;D.viewport=new Ue;let P=new pn;P.viewport=new Ue;let V=[D,P],q=new Da,N=null,z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(rt){let ut=A[rt];return ut===void 0&&(ut=new Us,A[rt]=ut),ut.getTargetRaySpace()},this.getControllerGrip=function(rt){let ut=A[rt];return ut===void 0&&(ut=new Us,A[rt]=ut),ut.getGripSpace()},this.getHand=function(rt){let ut=A[rt];return ut===void 0&&(ut=new Us,A[rt]=ut),ut.getHandSpace()};function Z(rt){let ut=S.indexOf(rt.inputSource);if(ut===-1)return;let Mt=A[ut];Mt!==void 0&&(Mt.update(rt.inputSource,rt.frame,l||o),Mt.dispatchEvent({type:rt.type,data:rt.inputSource}))}function L(){s.removeEventListener("select",Z),s.removeEventListener("selectstart",Z),s.removeEventListener("selectend",Z),s.removeEventListener("squeeze",Z),s.removeEventListener("squeezestart",Z),s.removeEventListener("squeezeend",Z),s.removeEventListener("end",L),s.removeEventListener("inputsourceschange",Q);for(let rt=0;rt<A.length;rt++){let ut=S[rt];ut!==null&&(S[rt]=null,A[rt].disconnect(ut))}N=null,z=null,p.reset();for(let rt in m)delete m[rt];if(t.setRenderTarget(R),d=null,h=null,f=null,s=null,b=null,Kt.stop(),n.isPresenting=!1,t.setPixelRatio(x),t.setSize(I.width,I.height,!1),E!==null){let rt=E.camera;rt.fov=E.fov,rt.zoom=E.zoom,rt.updateProjectionMatrix(),E=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(rt){r=rt,n.isPresenting===!0&&ne("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(rt){a=rt,n.isPresenting===!0&&ne("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(rt){l=rt},this.getBaseLayer=function(){return h!==null?h:d},this.getBinding=function(){return f===null&&v&&(f=new XRWebGLBinding(s,e)),f},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(rt){if(s=rt,s!==null){if(R=t.getRenderTarget(),s.addEventListener("select",Z),s.addEventListener("selectstart",Z),s.addEventListener("selectend",Z),s.addEventListener("squeeze",Z),s.addEventListener("squeezestart",Z),s.addEventListener("squeezeend",Z),s.addEventListener("end",L),s.addEventListener("inputsourceschange",Q),w.xrCompatible!==!0&&await e.makeXRCompatible(),x=t.getPixelRatio(),t.getSize(I),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let Mt=null,Bt=null,Dt=null;w.depth&&(Dt=w.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,Mt=w.stencil?ki:ti,Bt=w.stencil?qs:qn);let ie={colorFormat:e.RGBA8,depthFormat:Dt,scaleFactor:r};f=this.getBinding(),h=f.createProjectionLayer(ie),s.updateRenderState({layers:[h]}),t.setPixelRatio(1),t.setSize(h.textureWidth,h.textureHeight,!1),b=new xn(h.textureWidth,h.textureHeight,{format:Ln,type:_n,depthTexture:new Li(h.textureWidth,h.textureHeight,Bt,void 0,void 0,void 0,void 0,void 0,void 0,Mt),stencilBuffer:w.stencil,colorSpace:t.outputColorSpace,samples:w.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1,storeMultisampledDepthBuffer:h.ignoreDepthValues===!1,storeMultisampledStencilBuffer:h.ignoreDepthValues===!1})}else{let Mt={antialias:w.antialias,alpha:!0,depth:w.depth,stencil:w.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,e,Mt),s.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),b=new xn(d.framebufferWidth,d.framebufferHeight,{format:Ln,type:_n,colorSpace:t.outputColorSpace,stencilBuffer:w.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),Kt.setContext(s),Kt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return p.getDepthTexture()};function Q(rt){for(let ut=0;ut<rt.removed.length;ut++){let Mt=rt.removed[ut],Bt=S.indexOf(Mt);Bt>=0&&(S[Bt]=null,A[Bt].disconnect(Mt))}for(let ut=0;ut<rt.added.length;ut++){let Mt=rt.added[ut],Bt=S.indexOf(Mt);if(Bt===-1){for(let ie=0;ie<A.length;ie++)if(ie>=S.length){S.push(Mt),Bt=ie;break}else if(S[ie]===null){S[ie]=Mt,Bt=ie;break}if(Bt===-1)break}let Dt=A[Bt];Dt&&Dt.connect(Mt)}}let Y=new O,$=new O;function nt(rt,ut,Mt){Y.setFromMatrixPosition(ut.matrixWorld),$.setFromMatrixPosition(Mt.matrixWorld);let Bt=Y.distanceTo($),Dt=ut.projectionMatrix.elements,ie=Mt.projectionMatrix.elements,Me=Dt[14]/(Dt[10]-1),ft=Dt[14]/(Dt[10]+1),gt=(Dt[9]+1)/Dt[5],lt=(Dt[9]-1)/Dt[5],pt=(Dt[8]-1)/Dt[0],Et=(ie[8]+1)/ie[0],Yt=Me*pt,Zt=Me*Et,ee=Bt/(-pt+Et),te=ee*-pt;if(ut.matrixWorld.decompose(rt.position,rt.quaternion,rt.scale),rt.translateX(te),rt.translateZ(ee),rt.matrixWorld.compose(rt.position,rt.quaternion,rt.scale),rt.matrixWorldInverse.copy(rt.matrixWorld).invert(),Dt[10]===-1)rt.projectionMatrix.copy(ut.projectionMatrix),rt.projectionMatrixInverse.copy(ut.projectionMatrixInverse);else{let U=Me+ee,Se=ft+ee,ue=Yt-te,C=Zt+(Bt-te),_=gt*ft/Se*U,H=lt*ft/Se*U;rt.projectionMatrix.makePerspective(ue,C,_,H,U,Se),rt.projectionMatrixInverse.copy(rt.projectionMatrix).invert()}}function mt(rt,ut){ut===null?rt.matrixWorld.copy(rt.matrix):rt.matrixWorld.multiplyMatrices(ut.matrixWorld,rt.matrix),rt.matrixWorldInverse.copy(rt.matrixWorld).invert()}this.updateCamera=function(rt){if(s===null)return;let ut=rt.near,Mt=rt.far;p.texture!==null&&(p.depthNear>0&&(ut=p.depthNear),p.depthFar>0&&(Mt=p.depthFar)),q.near=P.near=D.near=ut,q.far=P.far=D.far=Mt,(N!==q.near||z!==q.far)&&(s.updateRenderState({depthNear:q.near,depthFar:q.far}),N=q.near,z=q.far),q.layers.mask=rt.layers.mask|6,D.layers.mask=q.layers.mask&-5,P.layers.mask=q.layers.mask&-3;let Bt=rt.parent,Dt=q.cameras;mt(q,Bt);for(let ie=0;ie<Dt.length;ie++)mt(Dt[ie],Bt);Dt.length===2?nt(q,D,P):q.projectionMatrix.copy(D.projectionMatrix),E===null&&rt.isPerspectiveCamera&&(E={camera:rt,fov:rt.fov,zoom:rt.zoom}),ht(rt,q,Bt)};function ht(rt,ut,Mt){Mt===null?rt.matrix.copy(ut.matrixWorld):(rt.matrix.copy(Mt.matrixWorld),rt.matrix.invert(),rt.matrix.multiply(ut.matrixWorld)),rt.matrix.decompose(rt.position,rt.quaternion,rt.scale),rt.updateMatrixWorld(!0),rt.projectionMatrix.copy(ut.projectionMatrix),rt.projectionMatrixInverse.copy(ut.projectionMatrixInverse),rt.isPerspectiveCamera&&(rt.fov=ia*2*Math.atan(1/rt.projectionMatrix.elements[5]),rt.zoom=1)}this.getCamera=function(){return q},this.getFoveation=function(){if(!(h===null&&d===null))return c},this.setFoveation=function(rt){c=rt,h!==null&&(h.fixedFoveation=rt),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=rt)},this.hasDepthSensing=function(){return p.texture!==null},this.getDepthSensingMesh=function(){return p.getMesh(q)},this.getCameraTexture=function(rt){return m[rt]};let Qt=null;function Rt(rt,ut){if(u=ut.getViewerPose(l||o),g=ut,u!==null){let Mt=u.views;d!==null&&(t.setRenderTargetFramebuffer(b,d.framebuffer),t.setRenderTarget(b));let Bt=!1;Mt.length!==q.cameras.length&&(q.cameras.length=0,Bt=!0);for(let ft=0;ft<Mt.length;ft++){let gt=Mt[ft],lt=null;if(d!==null)lt=d.getViewport(gt);else{let Et=f.getViewSubImage(h,gt);lt=Et.viewport,ft===0&&(t.setRenderTargetTextures(b,Et.colorTexture,Et.depthStencilTexture),t.setRenderTarget(b))}let pt=V[ft];pt===void 0&&(pt=new pn,pt.layers.enable(ft),pt.viewport=new Ue,V[ft]=pt),pt.matrix.fromArray(gt.transform.matrix),pt.matrix.decompose(pt.position,pt.quaternion,pt.scale),pt.projectionMatrix.fromArray(gt.projectionMatrix),pt.projectionMatrixInverse.copy(pt.projectionMatrix).invert(),pt.viewport.set(lt.x,lt.y,lt.width,lt.height),ft===0&&(q.matrix.copy(pt.matrix),q.matrix.decompose(q.position,q.quaternion,q.scale)),Bt===!0&&q.cameras.push(pt)}let Dt=s.enabledFeatures;if(Dt&&Dt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&v){f=n.getBinding();let ft=f.getDepthInformation(Mt[0]);ft&&ft.isValid&&ft.texture&&p.init(ft,s.renderState)}if(Dt&&Dt.includes("camera-access")&&v){t.state.unbindTexture(),f=n.getBinding();for(let ft=0;ft<Mt.length;ft++){let gt=Mt[ft].camera;if(gt){let lt=m[gt];lt||(lt=new Rr,m[gt]=lt);let pt=f.getCameraImage(gt);lt.sourceTexture=pt}}}}for(let Mt=0;Mt<A.length;Mt++){let Bt=S[Mt],Dt=A[Mt];Bt!==null&&Dt!==void 0&&Dt.update(Bt,ut,l||o)}Qt&&Qt(rt,ut),ut.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ut}),g=null}let Kt=new zd;Kt.setAnimationLoop(Rt),this.setAnimationLoop=function(rt){Qt=rt},this.dispose=function(){}}},S_=new Re,Xd=new le;Xd.set(-1,0,0,0,1,0,0,0,1);function w_(i,t){function e(p,m){p.matrixAutoUpdate===!0&&p.updateMatrix(),m.value.copy(p.matrix)}function n(p,m){m.color.getRGB(p.fogColor.value,oh(i)),m.isFog?(p.fogNear.value=m.near,p.fogFar.value=m.far):m.isFogExp2&&(p.fogDensity.value=m.density)}function s(p,m,w,R,b){m.isNodeMaterial?m.uniformsNeedUpdate=!1:m.isMeshBasicMaterial?r(p,m):m.isMeshLambertMaterial?(r(p,m),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(r(p,m),f(p,m)):m.isMeshPhongMaterial?(r(p,m),u(p,m),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(r(p,m),h(p,m),m.isMeshPhysicalMaterial&&d(p,m,b)):m.isMeshMatcapMaterial?(r(p,m),g(p,m)):m.isMeshDepthMaterial?r(p,m):m.isMeshDistanceMaterial?(r(p,m),v(p,m)):m.isMeshNormalMaterial?r(p,m):m.isLineBasicMaterial?(o(p,m),m.isLineDashedMaterial&&a(p,m)):m.isPointsMaterial?c(p,m,w,R):m.isSpriteMaterial?l(p,m):m.isShadowMaterial?(p.color.value.copy(m.color),p.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(p,m){p.opacity.value=m.opacity,m.color&&p.diffuse.value.copy(m.color),m.emissive&&p.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(p.map.value=m.map,e(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.bumpMap&&(p.bumpMap.value=m.bumpMap,e(m.bumpMap,p.bumpMapTransform),p.bumpScale.value=m.bumpScale,m.side===tn&&(p.bumpScale.value*=-1)),m.normalMap&&(p.normalMap.value=m.normalMap,e(m.normalMap,p.normalMapTransform),p.normalScale.value.copy(m.normalScale),m.side===tn&&p.normalScale.value.negate()),m.displacementMap&&(p.displacementMap.value=m.displacementMap,e(m.displacementMap,p.displacementMapTransform),p.displacementScale.value=m.displacementScale,p.displacementBias.value=m.displacementBias),m.emissiveMap&&(p.emissiveMap.value=m.emissiveMap,e(m.emissiveMap,p.emissiveMapTransform)),m.specularMap&&(p.specularMap.value=m.specularMap,e(m.specularMap,p.specularMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest);let w=t.get(m),R=w.envMap,b=w.envMapRotation;R&&(p.envMap.value=R,p.envMapRotation.value.setFromMatrix4(S_.makeRotationFromEuler(b)).transpose(),R.isCubeTexture&&R.isRenderTargetTexture===!1&&p.envMapRotation.value.premultiply(Xd),p.reflectivity.value=m.reflectivity,p.ior.value=m.ior,p.refractionRatio.value=m.refractionRatio),m.lightMap&&(p.lightMap.value=m.lightMap,p.lightMapIntensity.value=m.lightMapIntensity,e(m.lightMap,p.lightMapTransform)),m.aoMap&&(p.aoMap.value=m.aoMap,p.aoMapIntensity.value=m.aoMapIntensity,e(m.aoMap,p.aoMapTransform))}function o(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,m.map&&(p.map.value=m.map,e(m.map,p.mapTransform))}function a(p,m){p.dashSize.value=m.dashSize,p.totalSize.value=m.dashSize+m.gapSize,p.scale.value=m.scale}function c(p,m,w,R){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.size.value=m.size*w,p.scale.value=R*.5,m.map&&(p.map.value=m.map,e(m.map,p.uvTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function l(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.rotation.value=m.rotation,m.map&&(p.map.value=m.map,e(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function u(p,m){p.specular.value.copy(m.specular),p.shininess.value=Math.max(m.shininess,1e-4)}function f(p,m){m.gradientMap&&(p.gradientMap.value=m.gradientMap)}function h(p,m){p.metalness.value=m.metalness,m.metalnessMap&&(p.metalnessMap.value=m.metalnessMap,e(m.metalnessMap,p.metalnessMapTransform)),p.roughness.value=m.roughness,m.roughnessMap&&(p.roughnessMap.value=m.roughnessMap,e(m.roughnessMap,p.roughnessMapTransform)),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)}function d(p,m,w){p.ior.value=m.ior,m.sheen>0&&(p.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),p.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(p.sheenColorMap.value=m.sheenColorMap,e(m.sheenColorMap,p.sheenColorMapTransform)),m.sheenRoughnessMap&&(p.sheenRoughnessMap.value=m.sheenRoughnessMap,e(m.sheenRoughnessMap,p.sheenRoughnessMapTransform))),m.clearcoat>0&&(p.clearcoat.value=m.clearcoat,p.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(p.clearcoatMap.value=m.clearcoatMap,e(m.clearcoatMap,p.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,e(m.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(p.clearcoatNormalMap.value=m.clearcoatNormalMap,e(m.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===tn&&p.clearcoatNormalScale.value.negate())),m.dispersion>0&&(p.dispersion.value=m.dispersion),m.retroreflectivity>0&&(p.retroreflectivity.value=m.retroreflectivity),m.iridescence>0&&(p.iridescence.value=m.iridescence,p.iridescenceIOR.value=m.iridescenceIOR,p.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(p.iridescenceMap.value=m.iridescenceMap,e(m.iridescenceMap,p.iridescenceMapTransform)),m.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=m.iridescenceThicknessMap,e(m.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),m.transmission>0&&(p.transmission.value=m.transmission,p.transmissionSamplerMap.value=w.texture,p.transmissionSamplerSize.value.set(w.width,w.height),m.transmissionMap&&(p.transmissionMap.value=m.transmissionMap,e(m.transmissionMap,p.transmissionMapTransform)),p.thickness.value=m.thickness,m.thicknessMap&&(p.thicknessMap.value=m.thicknessMap,e(m.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=m.attenuationDistance,p.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(p.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(p.anisotropyMap.value=m.anisotropyMap,e(m.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=m.specularIntensity,p.specularColor.value.copy(m.specularColor),m.specularColorMap&&(p.specularColorMap.value=m.specularColorMap,e(m.specularColorMap,p.specularColorMapTransform)),m.specularIntensityMap&&(p.specularIntensityMap.value=m.specularIntensityMap,e(m.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,m){m.matcap&&(p.matcap.value=m.matcap)}function v(p,m){let w=t.get(m).light;p.referencePosition.value.setFromMatrixPosition(w.matrixWorld),p.nearDistance.value=w.shadow.camera.near,p.farDistance.value=w.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function T_(i,t,e,n){let s={},r={},o=[],a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(b,A){let S=A.program;n.uniformBlockBinding(b,S)}function l(b,A){let S=s[b.id];S===void 0&&(p(b),S=u(b),s[b.id]=S,b.addEventListener("dispose",w));let I=A.program;n.updateUBOMapping(b,I);let x=t.render.frame;r[b.id]!==x&&(h(b),r[b.id]=x)}function u(b){let A=f();b.__bindingPointIndex=A;let S=i.createBuffer(),I=b.__size,x=b.usage;return i.bindBuffer(i.UNIFORM_BUFFER,S),i.bufferData(i.UNIFORM_BUFFER,I,x),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,A,S),S}function f(){for(let b=0;b<a;b++)if(o.indexOf(b)===-1)return o.push(b),b;return se("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(b){let A=s[b.id],S=b.uniforms,I=b.__cache;i.bindBuffer(i.UNIFORM_BUFFER,A);for(let x=0,E=S.length;x<E;x++){let D=S[x];if(Array.isArray(D))for(let P=0,V=D.length;P<V;P++)d(D[P],x,P,I);else d(D,x,0,I)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function d(b,A,S,I){if(v(b,A,S,I)===!0){let x=b.__offset,E=b.value;if(Array.isArray(E)){let D=0;for(let P=0;P<E.length;P++){let V=E[P],q=m(V);g(V,b.__data,D),typeof V!="number"&&typeof V!="boolean"&&!V.isMatrix3&&!ArrayBuffer.isView(V)&&(D+=q.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(E,b.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,x,b.__data)}}function g(b,A,S){typeof b=="number"||typeof b=="boolean"?A[0]=b:b.isMatrix3?(A[0]=b.elements[0],A[1]=b.elements[1],A[2]=b.elements[2],A[3]=0,A[4]=b.elements[3],A[5]=b.elements[4],A[6]=b.elements[5],A[7]=0,A[8]=b.elements[6],A[9]=b.elements[7],A[10]=b.elements[8],A[11]=0):ArrayBuffer.isView(b)?A.set(new b.constructor(b.buffer,b.byteOffset,A.length)):b.toArray(A,S)}function v(b,A,S,I){let x=b.value,E=A+"_"+S;if(I[E]===void 0)return typeof x=="number"||typeof x=="boolean"?I[E]=x:ArrayBuffer.isView(x)?I[E]=x.slice():I[E]=x.clone(),!0;{let D=I[E];if(typeof x=="number"||typeof x=="boolean"){if(D!==x)return I[E]=x,!0}else{if(ArrayBuffer.isView(x))return!0;if(D.equals(x)===!1)return D.copy(x),!0}}return!1}function p(b){let A=b.uniforms,S=0,I=16;for(let E=0,D=A.length;E<D;E++){let P=Array.isArray(A[E])?A[E]:[A[E]];for(let V=0,q=P.length;V<q;V++){let N=P[V],z=Array.isArray(N.value)?N.value:[N.value];for(let Z=0,L=z.length;Z<L;Z++){let Q=z[Z],Y=m(Q),$=S%I,nt=$%Y.boundary,mt=$+nt;S+=nt,mt!==0&&I-mt<Y.storage&&(S+=I-mt),N.__data=new Float32Array(Y.storage/Float32Array.BYTES_PER_ELEMENT),N.__offset=S,S+=Y.storage}}}let x=S%I;return x>0&&(S+=I-x),b.__size=S,b.__cache={},this}function m(b){let A={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(A.boundary=4,A.storage=4):b.isVector2?(A.boundary=8,A.storage=8):b.isVector3||b.isColor?(A.boundary=16,A.storage=12):b.isVector4?(A.boundary=16,A.storage=16):b.isMatrix3?(A.boundary=48,A.storage=48):b.isMatrix4?(A.boundary=64,A.storage=64):b.isTexture?ne("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(b)?(A.boundary=16,A.storage=b.byteLength):ne("WebGLRenderer: Unsupported uniform value type.",b),A}function w(b){let A=b.target;A.removeEventListener("dispose",w);let S=o.indexOf(A.__bindingPointIndex);o.splice(S,1),i.deleteBuffer(s[A.id]),delete s[A.id],delete r[A.id]}function R(){for(let b in s)i.deleteBuffer(s[b]);o=[],s={},r={}}return{bind:c,update:l,dispose:R}}var A_=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),li=null;function E_(){return li===null&&(li=new aa(A_,16,16,Vi,$n),li.name="DFG_LUT",li.minFilter=je,li.magFilter=je,li.wrapS=Qn,li.wrapT=Qn,li.generateMipmaps=!1,li.needsUpdate=!0),li}var El=class{constructor(t={}){let{canvas:e=od(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:h=!1,outputBufferType:d=_n}=t;this.isWebGLRenderer=!0;let g;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=n.getContextAttributes().alpha}else g=o;let v=d,p=new Set([Ga,Va,ka]),m=new Set([_n,qn,Xs,qs,Ba,za]),w=new Uint32Array(4),R=new Int32Array(4),b=new O,A=null,S=null,I=[],x=[],E=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Xn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let D=this,P=!1,V=null,q=null,N=null,z=null;this._outputColorSpace=un;let Z=0,L=0,Q=null,Y=-1,$=null,nt=new Ue,mt=new Ue,ht=null,Qt=new oe(0),Rt=0,Kt=e.width,rt=e.height,ut=1,Mt=null,Bt=null,Dt=new Ue(0,0,Kt,rt),ie=new Ue(0,0,Kt,rt),Me=!1,ft=new Bs,gt=!1,lt=!1,pt=new Re,Et=new O,Yt=new Ue,Zt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},ee=!1;function te(){return Q===null?ut:1}let U=n;function Se(M,G){return e.getContext(M,G)}let ue,C,_,H,j,ot,yt,xt,K,ct,bt,Vt,It,Ct,Ht,$t,ae,W,Pt,at,St,Lt,dt;try{let M={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${"186"}`),e.addEventListener("webglcontextlost",Te,!1),e.addEventListener("webglcontextrestored",ye,!1),e.addEventListener("webglcontextcreationerror",en,!1),U===null){let G="webgl2";if(U=Se(G,M),U===null)throw Se(G)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Wt()}catch(M){throw e.removeEventListener("webglcontextlost",Te,!1),e.removeEventListener("webglcontextrestored",ye,!1),e.removeEventListener("webglcontextcreationerror",en,!1),se("WebGLRenderer: "+M.message),M}function Wt(){ue=new N0(U),ue.init(),St=new v_(U,ue),C=new w0(U,ue,t,St),_=new __(U,ue),C.reversedDepthBuffer&&h&&_.buffers.depth.setReversed(!0),q=U.createFramebuffer(),N=U.createFramebuffer(),z=U.createFramebuffer(),H=new O0(U),j=new s_,ot=new y_(U,ue,_,j,C,St,H),yt=new D0(D),xt=new zp(U),Lt=new M0(U,xt),K=new U0(U,xt,H,Lt),ct=new z0(U,K,xt,Lt,H),W=new B0(U,C,ot),Ht=new T0(j),bt=new i_(D,yt,ue,C,Lt,Ht),Vt=new w_(D,j),It=new o_,Ct=new d_(ue),ae=new b0(D,yt,_,ct,g,c),$t=new x_(D,ct,C),dt=new T_(U,H,C,_),Pt=new S0(U,ue,H),at=new F0(U,ue,H),H.programs=bt.programs,D.capabilities=C,D.extensions=ue,D.properties=j,D.renderLists=It,D.shadowMap=$t,D.state=_,D.info=H}v!==_n&&(E=new V0(v,e.width,e.height,a,s,r));let kt=new wh(D,U);this.xr=kt,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){let M=ue.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){let M=ue.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return ut},this.setPixelRatio=function(M){M!==void 0&&(ut=M,this.setSize(Kt,rt,!1))},this.getSize=function(M){return M.set(Kt,rt)},this.setSize=function(M,G,it=!0){if(kt.isPresenting){ne("WebGLRenderer: Can't change size while VR device is presenting.");return}Kt=M,rt=G,e.width=Math.floor(M*ut),e.height=Math.floor(G*ut),it===!0&&(e.style.width=M+"px",e.style.height=G+"px"),E!==null&&E.setSize(e.width,e.height),this.setViewport(0,0,M,G)},this.getDrawingBufferSize=function(M){return M.set(Kt*ut,rt*ut).floor()},this.setDrawingBufferSize=function(M,G,it){Kt=M,rt=G,ut=it,e.width=Math.floor(M*it),e.height=Math.floor(G*it),this.setViewport(0,0,M,G)},this.setEffects=function(M){if(v===_n){se("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(M){for(let G=0;G<M.length;G++)if(M[G].isOutputPass===!0){ne("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}E.setEffects(M||[])},this.getCurrentViewport=function(M){return M.copy(nt)},this.getViewport=function(M){return M.copy(Dt)},this.setViewport=function(M,G,it,X){M.isVector4?Dt.set(M.x,M.y,M.z,M.w):Dt.set(M,G,it,X),_.viewport(nt.copy(Dt).multiplyScalar(ut).round())},this.getScissor=function(M){return M.copy(ie)},this.setScissor=function(M,G,it,X){M.isVector4?ie.set(M.x,M.y,M.z,M.w):ie.set(M,G,it,X),_.scissor(mt.copy(ie).multiplyScalar(ut).round())},this.getScissorTest=function(){return Me},this.setScissorTest=function(M){_.setScissorTest(Me=M)},this.setOpaqueSort=function(M){Mt=M},this.setTransparentSort=function(M){Bt=M},this.getClearColor=function(M){return M.copy(ae.getClearColor())},this.setClearColor=function(){ae.setClearColor(...arguments)},this.getClearAlpha=function(){return ae.getClearAlpha()},this.setClearAlpha=function(){ae.setClearAlpha(...arguments)},this.clear=function(M=!0,G=!0,it=!0){let X=0;if(M){let J=!1;if(Q!==null){let wt=Q.texture.format;J=p.has(wt)}if(J){let wt=Q.texture.type,Ft=m.has(wt),_t=ae.getClearColor(),zt=ae.getClearAlpha(),Gt=_t.r,ce=_t.g,Jt=_t.b;Ft?(w[0]=Gt,w[1]=ce,w[2]=Jt,w[3]=zt,U.clearBufferuiv(U.COLOR,0,w)):(R[0]=Gt,R[1]=ce,R[2]=Jt,R[3]=zt,U.clearBufferiv(U.COLOR,0,R))}else X|=U.COLOR_BUFFER_BIT}G&&(X|=U.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),it&&(X|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),X!==0&&U.clear(X)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(M){M.setRenderer(this),V=M},this.dispose=function(){e.removeEventListener("webglcontextlost",Te,!1),e.removeEventListener("webglcontextrestored",ye,!1),e.removeEventListener("webglcontextcreationerror",en,!1),ae.dispose(),It.dispose(),Ct.dispose(),j.dispose(),yt.dispose(),ct.dispose(),Lt.dispose(),dt.dispose(),bt.dispose(),kt.dispose(),kt.removeEventListener("sessionstart",fs),kt.removeEventListener("sessionend",lo),Zn.stop()};function Te(M){M.preventDefault(),sh("WebGLRenderer: Context Lost."),P=!0}function ye(){sh("WebGLRenderer: Context Restored."),P=!1;let M=H.autoReset,G=$t.enabled,it=$t.autoUpdate,X=$t.needsUpdate,J=$t.type;Wt(),H.autoReset=M,$t.enabled=G,$t.autoUpdate=it,$t.needsUpdate=X,$t.type=J}function en(M){se("WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function yn(M){let G=M.target;G.removeEventListener("dispose",yn),qi(G)}function qi(M){nr(M),j.remove(M)}function nr(M){let G=j.get(M).programs;G!==void 0&&(G.forEach(function(it){bt.releaseProgram(it)}),M.isShaderMaterial&&bt.releaseShaderCache(M))}this.renderBufferDirect=function(M,G,it,X,J,wt){G===null&&(G=Zt);let Ft=J.isMesh&&J.matrixWorld.determinantAffine()<0,_t=ps(M,G,it,X,J);_.setMaterial(X,Ft);let zt=it.index,Gt=1;if(X.wireframe===!0){if(zt=K.getWireframeAttribute(it),zt===void 0)return;Gt=2}let ce=it.drawRange,Jt=it.attributes.position,Ot=ce.start*Gt,_e=(ce.start+ce.count)*Gt;wt!==null&&(Ot=Math.max(Ot,wt.start*Gt),_e=Math.min(_e,(wt.start+wt.count)*Gt)),zt!==null?(Ot=Math.max(Ot,0),_e=Math.min(_e,zt.count)):Jt!=null&&(Ot=Math.max(Ot,0),_e=Math.min(_e,Jt.count));let Xt=_e-Ot;if(Xt<0||Xt===1/0)return;Lt.setup(J,X,_t,it,zt);let he,re=Pt;if(zt!==null&&(he=xt.get(zt),re=at,re.setIndex(he)),J.isMesh)X.wireframe===!0?(_.setLineWidth(X.wireframeLinewidth*te()),re.setMode(U.LINES)):re.setMode(U.TRIANGLES);else if(J.isLine){let ze=X.linewidth;ze===void 0&&(ze=1),_.setLineWidth(ze*te()),J.isLineSegments?re.setMode(U.LINES):J.isLineLoop?re.setMode(U.LINE_LOOP):re.setMode(U.LINE_STRIP)}else J.isPoints?re.setMode(U.POINTS):J.isSprite&&re.setMode(U.TRIANGLES);if(J.isBatchedMesh)if(ue.get("WEBGL_multi_draw"))re.renderMultiDraw(J._multiDrawStarts,J._multiDrawCounts,J._multiDrawCount);else{let ze=J._multiDrawStarts,Ut=J._multiDrawCounts,Oe=J._multiDrawCount,me=zt?xt.get(zt).bytesPerElement:1,Be=j.get(X).currentProgram.getUniforms();for(let Ee=0;Ee<Oe;Ee++)Be.setValue(U,"_gl_DrawID",Ee),re.render(ze[Ee]/me,Ut[Ee])}else if(J.isInstancedMesh)re.renderInstances(Ot,Xt,J.count);else if(it.isInstancedBufferGeometry){let ze=it._maxInstanceCount!==void 0?it._maxInstanceCount:1/0,Ut=Math.min(it.instanceCount,ze);re.renderInstances(Ot,Xt,Ut)}else re.render(Ot,Xt)};function ao(M,G,it,X){V!==null&&M.isNodeMaterial&&V.setObject(X,M),gt===!0&&Ht.setState(M,it,!1),M.transparent===!0&&M.side===oi&&M.forceSinglePass===!1?(M.side=tn,M.needsUpdate=!0,Yi(M,G,X),M.side=Oi,M.needsUpdate=!0,Yi(M,G,X),M.side=oi):Yi(M,G,X)}this.compile=function(M,G,it=null){it===null&&(it=M),V!==null&&V.renderStart(M,G,it),S=Ct.get(it),S.init(G),x.push(S),it.traverseVisible(function(J){J.isLight&&J.layers.test(G.layers)&&(S.pushLight(J),J.castShadow&&S.pushShadow(J))}),M!==it&&M.traverseVisible(function(J){J.isLight&&J.layers.test(G.layers)&&(S.pushLight(J),J.castShadow&&S.pushShadow(J))}),S.setupLights(),V!==null&&V.updateLights(S.state.lightsArray),lt=this.localClippingEnabled,gt=Ht.init(this.clippingPlanes,lt),gt===!0&&Ht.setGlobalState(this.clippingPlanes,G),V!==null&&$t.render(S.state.shadowsArray,it,G);let X=new Set;return M.traverse(function(J){if(!(J.isMesh||J.isPoints||J.isLine||J.isSprite))return;let wt=J.material;if(wt)if(Array.isArray(wt))for(let Ft=0;Ft<wt.length;Ft++){let _t=wt[Ft];ao(_t,it,G,J),X.add(_t)}else ao(wt,it,G,J),X.add(wt)}),S=x.pop(),V!==null&&V.renderEnd(),X},this.compileAsync=function(M,G,it=null){let X=this.compile(M,G,it);return new Promise(J=>{function wt(){if(X.forEach(function(Ft){let zt=j.get(Ft).currentProgram;(zt===void 0||zt.isReady())&&X.delete(Ft)}),X.size===0){J(M);return}setTimeout(wt,10)}ue.get("KHR_parallel_shader_compile")!==null?wt():setTimeout(wt,10)})};let ds=null;function Fl(M){ds&&ds(M)}function fs(){Zn.stop()}function lo(){Zn.start()}let Zn=new zd;Zn.setAnimationLoop(Fl),typeof self<"u"&&Zn.setContext(self),this.setAnimationLoop=function(M){ds=M,kt.setAnimationLoop(M),M===null?Zn.stop():Zn.start()},kt.addEventListener("sessionstart",fs),kt.addEventListener("sessionend",lo),this.render=function(M,G){if(G!==void 0&&G.isCamera!==!0){se("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;V!==null&&V.renderStart(M,G);let it=kt.enabled===!0&&kt.isPresenting===!0,X=E!==null&&(Q===null||it)&&E.begin(D,Q);if(M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),G.parent===null&&G.matrixWorldAutoUpdate===!0&&G.updateMatrixWorld(),kt.enabled===!0&&kt.isPresenting===!0&&(E===null||E.isCompositing()===!1)&&(kt.cameraAutoUpdate===!0&&kt.updateCamera(G),G=kt.getCamera()),M.isScene===!0&&M.onBeforeRender(D,M,G,Q),S=Ct.get(M,x.length),S.init(G),S.state.textureUnits=ot.getTextureUnits(),x.push(S),pt.multiplyMatrices(G.projectionMatrix,G.matrixWorldInverse),ft.setFromProjectionMatrix(pt,Hn,G.reversedDepth),lt=this.localClippingEnabled,gt=Ht.init(this.clippingPlanes,lt),A=It.get(M,I.length),A.init(),I.push(A),kt.enabled===!0&&kt.isPresenting===!0){let Ft=D.xr.getDepthSensingMesh();Ft!==null&&ir(Ft,G,-1/0,D.sortObjects)}ir(M,G,0,D.sortObjects),A.finish(),V!==null&&V.updateLights(S.state.lightsArray),D.sortObjects===!0&&A.sort(Mt,Bt),ee=kt.enabled===!1||kt.isPresenting===!1||kt.hasDepthSensing()===!1,ee&&ae.addToRenderList(A,M),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),gt===!0&&Ht.beginShadows();let J=S.state.shadowsArray;if($t.render(J,M,G),gt===!0&&Ht.endShadows(),(X&&E.hasRenderPass())===!1){let Ft=A.opaque,_t=A.transmissive;if(S.setupLights(),G.isArrayCamera){let zt=G.cameras;if(_t.length>0)for(let Gt=0,ce=zt.length;Gt<ce;Gt++){let Jt=zt[Gt];ho(Ft,_t,M,Jt)}ee&&ae.render(M);for(let Gt=0,ce=zt.length;Gt<ce;Gt++){let Jt=zt[Gt];co(A,M,Jt,Jt.viewport)}}else _t.length>0&&ho(Ft,_t,M,G),ee&&ae.render(M),co(A,M,G)}Q!==null&&L===0&&(ot.updateMultisampleRenderTarget(Q),ot.updateRenderTargetMipmap(Q)),X&&E.end(D),M.isScene===!0&&M.onAfterRender(D,M,G),Lt.resetDefaultState(),Y=-1,$=null,x.pop(),x.length>0?(S=x[x.length-1],ot.setTextureUnits(S.state.textureUnits),gt===!0&&Ht.setGlobalState(D.clippingPlanes,S.state.camera)):S=null,I.pop(),I.length>0?A=I[I.length-1]:A=null,V!==null&&V.renderEnd()};function ir(M,G,it,X){if(M.visible===!1)return;if(M.layers.test(G.layers)){if(M.isGroup)it=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(G);else if(M.isLightProbeGrid)S.pushLightProbeGrid(M);else if(M.isLight)S.pushLight(M),M.castShadow&&S.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||M.intersectsFrustum(ft)){X&&Yt.setFromMatrixPosition(M.matrixWorld).applyMatrix4(pt);let Ft=ct.update(M),_t=M.material;_t.visible&&A.push(M,Ft,_t,it,Yt.z,null,G)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||M.intersectsFrustum(ft))){let Ft=ct.update(M),_t=M.material;if(X&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),Yt.copy(M.boundingSphere.center)):(Ft.boundingSphere===null&&Ft.computeBoundingSphere(),Yt.copy(Ft.boundingSphere.center)),Yt.applyMatrix4(M.matrixWorld).applyMatrix4(pt)),Array.isArray(_t)){let zt=Ft.groups;for(let Gt=0,ce=zt.length;Gt<ce;Gt++){let Jt=zt[Gt],Ot=_t[Jt.materialIndex];Ot&&Ot.visible&&A.push(M,Ft,Ot,it,Yt.z,Jt,G)}}else _t.visible&&A.push(M,Ft,_t,it,Yt.z,null,G)}}let wt=M.children;for(let Ft=0,_t=wt.length;Ft<_t;Ft++)ir(wt[Ft],G,it,X)}function co(M,G,it,X){let{opaque:J,transmissive:wt,transparent:Ft}=M;S.setupLightsView(it),gt===!0&&Ht.setGlobalState(D.clippingPlanes,it),X&&_.viewport(nt.copy(X)),J.length>0&&Jn(J,G,it),wt.length>0&&Jn(wt,G,it),Ft.length>0&&Jn(Ft,G,it),_.buffers.depth.setTest(!0),_.buffers.depth.setMask(!0),_.buffers.color.setMask(!0),_.setPolygonOffset(!1)}function ho(M,G,it,X){if((it.isScene===!0?it.overrideMaterial:null)!==null)return;if(S.state.transmissionRenderTarget[X.id]===void 0){let Ot=ue.has("EXT_color_buffer_half_float")||ue.has("EXT_color_buffer_float");S.state.transmissionRenderTarget[X.id]=new xn(1,1,{generateMipmaps:!0,type:Ot?$n:_n,minFilter:zi,samples:Math.max(4,C.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:xe.workingColorSpace})}let wt=S.state.transmissionRenderTarget[X.id],Ft=X.viewport||nt;wt.setSize(Ft.z*D.transmissionResolutionScale,Ft.w*D.transmissionResolutionScale);let _t=D.getRenderTarget(),zt=D.getActiveCubeFace(),Gt=D.getActiveMipmapLevel();D.setRenderTarget(wt),D.getClearColor(Qt),Rt=D.getClearAlpha(),Rt<1&&D.setClearColor(16777215,.5),D.clear(),ee&&ae.render(it);let ce=D.toneMapping;D.toneMapping=Xn;let Jt=X.viewport;if(X.viewport!==void 0&&(X.viewport=void 0),S.setupLightsView(X),gt===!0&&Ht.setGlobalState(D.clippingPlanes,X),Jn(M,it,X),ot.updateMultisampleRenderTarget(wt),ot.updateRenderTargetMipmap(wt),ue.has("WEBGL_multisampled_render_to_texture")===!1){let Ot=!1;for(let _e=0,Xt=G.length;_e<Xt;_e++){let he=G[_e],{object:re,geometry:ze,material:Ut,group:Oe}=he;if(Ut.side===oi&&re.layers.test(X.layers)){let me=Ut.side;Ut.side=tn,Ut.needsUpdate=!0,Un(re,it,X,ze,Ut,Oe),Ut.side=me,Ut.needsUpdate=!0,Ot=!0}}Ot===!0&&(ot.updateMultisampleRenderTarget(wt),ot.updateRenderTargetMipmap(wt))}D.setRenderTarget(_t,zt,Gt),D.setClearColor(Qt,Rt),Jt!==void 0&&(X.viewport=Jt),D.toneMapping=ce}function Jn(M,G,it){let X=G.isScene===!0?G.overrideMaterial:null;for(let J=0,wt=M.length;J<wt;J++){let Ft=M[J],{object:_t,geometry:zt,group:Gt}=Ft,ce=Ft.material;ce.allowOverride===!0&&X!==null&&(ce=X),_t.layers.test(it.layers)&&Un(_t,G,it,zt,ce,Gt)}}function Un(M,G,it,X,J,wt){V!==null&&J.isNodeMaterial&&V.setObject(M,J),M.onBeforeRender(D,G,it,X,J,wt),M.modelViewMatrix.multiplyMatrices(it.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),J.onBeforeRender(D,G,it,X,M,wt),J.transparent===!0&&J.side===oi&&J.forceSinglePass===!1?(J.side=tn,J.needsUpdate=!0,D.renderBufferDirect(it,G,X,J,M,wt),J.side=Oi,J.needsUpdate=!0,D.renderBufferDirect(it,G,X,J,M,wt),J.side=oi):D.renderBufferDirect(it,G,X,J,M,wt),M.onAfterRender(D,G,it,X,J,wt)}function Yi(M,G,it){G.isScene!==!0&&(G=Zt);let X=j.get(M),J=S.state.lights,wt=S.state.shadowsArray,Ft=J.state.version,_t=bt.getParameters(M,J.state,wt,G,it,S.state.lightProbeGridArray),zt=bt.getProgramCacheKey(_t),Gt=X.programs;X.environment=M.isMeshStandardMaterial||M.isMeshLambertMaterial||M.isMeshPhongMaterial?G.environment:null,X.fog=G.fog;let ce=M.isMeshStandardMaterial||M.isMeshLambertMaterial&&!M.envMap||M.isMeshPhongMaterial&&!M.envMap;X.envMap=yt.get(M.envMap||X.environment,ce),X.envMapRotation=X.environment!==null&&M.envMap===null?G.environmentRotation:M.envMapRotation,Gt===void 0&&(M.addEventListener("dispose",yn),Gt=new Map,X.programs=Gt);let Jt=Gt.get(zt);if(Jt!==void 0){if(X.currentProgram===Jt&&X.lightsStateVersion===Ft)return cn(M,_t),Jt}else _t.uniforms=bt.getUniforms(M),V!==null&&M.isNodeMaterial&&V.build(M,it,_t),M.onBeforeCompile(_t,D),Jt=bt.acquireProgram(_t,zt),Gt.set(zt,Jt),X.uniforms=_t.uniforms;let Ot=X.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(Ot.clippingPlanes=Ht.uniform),cn(M,_t),X.needsLights=hn(M),X.lightsStateVersion=Ft,X.needsLights&&(Ot.ambientLightColor.value=J.state.ambient,Ot.lightProbe.value=J.state.probe,Ot.sunLights.value=J.state.sun,Ot.sunLightShadows.value=J.state.sunShadow,Ot.directionalLights.value=J.state.directional,Ot.directionalLightShadows.value=J.state.directionalShadow,Ot.spotLights.value=J.state.spot,Ot.spotLightShadows.value=J.state.spotShadow,Ot.rectAreaLights.value=J.state.rectArea,Ot.ltc_1.value=J.state.rectAreaLTC1,Ot.ltc_2.value=J.state.rectAreaLTC2,Ot.pointLights.value=J.state.point,Ot.pointLightShadows.value=J.state.pointShadow,Ot.hemisphereLights.value=J.state.hemi,Ot.sunShadowMatrix.value=J.state.sunShadowMatrix,Ot.sunShadowCascade.value=J.state.sunShadowCascade,Ot.directionalShadowMatrix.value=J.state.directionalShadowMatrix,Ot.spotLightMatrix.value=J.state.spotLightMatrix,Ot.spotLightMap.value=J.state.spotLightMap,Ot.pointShadowMatrix.value=J.state.pointShadowMatrix),X.lightProbeGrid=S.state.lightProbeGridArray.length>0,X.currentProgram=Jt,X.uniformsList=null,Jt}function Ie(M){if(M.uniformsList===null){let G=M.currentProgram.getUniforms();M.uniformsList=Js.seqWithValue(G.seq,M.uniforms)}return M.uniformsList}function cn(M,G){let it=j.get(M);it.outputColorSpace=G.outputColorSpace,it.batching=G.batching,it.batchingColor=G.batchingColor,it.instancing=G.instancing,it.instancingColor=G.instancingColor,it.instancingMorph=G.instancingMorph,it.skinning=G.skinning,it.morphTargets=G.morphTargets,it.morphNormals=G.morphNormals,it.morphColors=G.morphColors,it.morphTargetsCount=G.morphTargetsCount,it.numClippingPlanes=G.numClippingPlanes,it.numIntersection=G.numClipIntersection,it.vertexAlphas=G.vertexAlphas,it.vertexTangents=G.vertexTangents,it.toneMapping=G.toneMapping}function $i(M,G){if(M.length===0)return null;if(M.length===1)return M[0].texture!==null?M[0]:null;b.setFromMatrixPosition(G.matrixWorld);for(let it=0,X=M.length;it<X;it++){let J=M[it];if(J.texture!==null&&J.boundingBox.containsPoint(b))return J}return null}function ps(M,G,it,X,J){G.isScene!==!0&&(G=Zt),ot.resetTextureUnits();let wt=G.fog,Ft=X.isMeshStandardMaterial||X.isMeshLambertMaterial||X.isMeshPhongMaterial?G.environment:null,_t=Q===null?D.outputColorSpace:Q.isXRRenderTarget===!0?Q.texture.colorSpace:xe.workingColorSpace,zt=X.isMeshStandardMaterial||X.isMeshLambertMaterial&&!X.envMap||X.isMeshPhongMaterial&&!X.envMap,Gt=yt.get(X.envMap||Ft,zt),ce=X.vertexColors===!0&&!!it.attributes.color&&it.attributes.color.itemSize===4,Jt=!!it.attributes.tangent&&(!!X.normalMap||X.anisotropy>0),Ot=!!it.morphAttributes.position,_e=!!it.morphAttributes.normal,Xt=!!it.morphAttributes.color,he=Xn;X.toneMapped&&(Q===null||Q.isXRRenderTarget===!0)&&(he=D.toneMapping);let re=it.morphAttributes.position||it.morphAttributes.normal||it.morphAttributes.color,ze=re!==void 0?re.length:0,Ut=j.get(X),Oe=S.state.lights;if(gt===!0&&(lt===!0||M!==$)){let Ce=M===$&&X.id===Y;Ht.setState(X,M,Ce)}let me=!1;X.version===Ut.__version?(Ut.needsLights&&Ut.lightsStateVersion!==Oe.state.version||Ut.outputColorSpace!==_t||J.isBatchedMesh&&Ut.batching===!1||!J.isBatchedMesh&&Ut.batching===!0||J.isBatchedMesh&&Ut.batchingColor===!0&&J._colorsTexture===null||J.isBatchedMesh&&Ut.batchingColor===!1&&J._colorsTexture!==null||J.isInstancedMesh&&Ut.instancing===!1||!J.isInstancedMesh&&Ut.instancing===!0||J.isSkinnedMesh&&Ut.skinning===!1||!J.isSkinnedMesh&&Ut.skinning===!0||J.isInstancedMesh&&Ut.instancingColor===!0&&J.instanceColor===null||J.isInstancedMesh&&Ut.instancingColor===!1&&J.instanceColor!==null||J.isInstancedMesh&&Ut.instancingMorph===!0&&J.morphTexture===null||J.isInstancedMesh&&Ut.instancingMorph===!1&&J.morphTexture!==null||Ut.envMap!==Gt||X.fog===!0&&Ut.fog!==wt||Ut.numClippingPlanes!==void 0&&(Ut.numClippingPlanes!==Ht.numPlanes||Ut.numIntersection!==Ht.numIntersection)||Ut.vertexAlphas!==ce||Ut.vertexTangents!==Jt||Ut.morphTargets!==Ot||Ut.morphNormals!==_e||Ut.morphColors!==Xt||Ut.toneMapping!==he||Ut.morphTargetsCount!==ze||!!Ut.lightProbeGrid!=S.state.lightProbeGridArray.length>0)&&(me=!0):(me=!0,Ut.__version=X.version);let Be=Ut.currentProgram;me===!0&&(Be=Yi(X,G,J),V&&X.isNodeMaterial&&V.onUpdateProgram(X,Be,Ut));let Ee=!1,Ae=!1,Fn=!1,ve=Be.getUniforms(),Pe=Ut.uniforms;if(_.useProgram(Be.program)&&(Ee=!0,Ae=!0,Fn=!0),X.id!==Y&&(Y=X.id,Ae=!0),Ut.needsLights){let Ce=$i(S.state.lightProbeGridArray,J);Ut.lightProbeGrid!==Ce&&(Ut.lightProbeGrid=Ce,Ae=!0)}if(Ee||$!==M){_.buffers.depth.getReversed()&&M.reversedDepth!==!0&&(M._reversedDepth=!0,M.updateProjectionMatrix()),ve.setValue(U,"projectionMatrix",M.projectionMatrix),ve.setValue(U,"viewMatrix",M.matrixWorldInverse);let On=ve.map.cameraPosition;On!==void 0&&On.setValue(U,Et.setFromMatrixPosition(M.matrixWorld)),C.logarithmicDepthBuffer&&ve.setValue(U,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),(X.isMeshPhongMaterial||X.isMeshToonMaterial||X.isMeshLambertMaterial||X.isMeshBasicMaterial||X.isMeshStandardMaterial||X.isShaderMaterial)&&ve.setValue(U,"isOrthographic",M.isOrthographicCamera===!0),$!==M&&($=M,Ae=!0,Fn=!0)}if(Ut.needsLights&&(Oe.state.sunShadowMap.length>0&&ve.setValue(U,"sunShadowMap",Oe.state.sunShadowMap,ot),Oe.state.directionalShadowMap.length>0&&ve.setValue(U,"directionalShadowMap",Oe.state.directionalShadowMap,ot),Oe.state.spotShadowMap.length>0&&ve.setValue(U,"spotShadowMap",Oe.state.spotShadowMap,ot),Oe.state.pointShadowMap.length>0&&ve.setValue(U,"pointShadowMap",Oe.state.pointShadowMap,ot)),J.isSkinnedMesh){ve.setOptional(U,J,"bindMatrix"),ve.setOptional(U,J,"bindMatrixInverse");let Ce=J.skeleton;Ce&&(Ce.boneTexture===null&&Ce.computeBoneTexture(),ve.setValue(U,"boneTexture",Ce.boneTexture,ot))}J.isBatchedMesh&&(ve.setOptional(U,J,"batchingTexture"),ve.setValue(U,"batchingTexture",J._matricesTexture,ot),ve.setOptional(U,J,"batchingIdTexture"),ve.setValue(U,"batchingIdTexture",J._indirectTexture,ot),ve.setOptional(U,J,"batchingColorTexture"),J._colorsTexture!==null&&ve.setValue(U,"batchingColorTexture",J._colorsTexture,ot));let Kn=it.morphAttributes;if((Kn.position!==void 0||Kn.normal!==void 0||Kn.color!==void 0)&&W.update(J,it,Be),(Ae||Ut.receiveShadow!==J.receiveShadow)&&(Ut.receiveShadow=J.receiveShadow,ve.setValue(U,"receiveShadow",J.receiveShadow)),(X.isMeshStandardMaterial||X.isMeshLambertMaterial||X.isMeshPhongMaterial)&&X.envMap===null&&G.environment!==null&&(Pe.envMapIntensity.value=G.environmentIntensity),Pe.dfgLUT!==void 0&&(Pe.dfgLUT.value=E_()),Ae){if(ve.setValue(U,"toneMappingExposure",D.toneMappingExposure),Ut.needsLights&&ge(Pe,Fn),wt&&X.fog===!0&&Vt.refreshFogUniforms(Pe,wt),Vt.refreshMaterialUniforms(Pe,X,ut,rt,S.state.transmissionRenderTarget[M.id]),Ut.needsLights&&Ut.lightProbeGrid){let Ce=Ut.lightProbeGrid;Pe.probesSH.value=Ce.texture,Pe.probesMin.value.copy(Ce.boundingBox.min),Pe.probesMax.value.copy(Ce.boundingBox.max),Pe.probesResolution.value.copy(Ce.resolution)}Js.upload(U,Ie(Ut),Pe,ot)}if(X.isShaderMaterial&&X.uniformsNeedUpdate===!0&&(Js.upload(U,Ie(Ut),Pe,ot),X.uniformsNeedUpdate=!1),X.isSpriteMaterial&&ve.setValue(U,"center",J.center),ve.setValue(U,"modelViewMatrix",J.modelViewMatrix),ve.setValue(U,"normalMatrix",J.normalMatrix),ve.setValue(U,"modelMatrix",J.matrixWorld),X.uniformsGroups!==void 0){let Ce=X.uniformsGroups;for(let On=0,Cn=Ce.length;On<Cn;On++){let sr=Ce[On];dt.update(sr,Be),dt.bind(sr,Be)}}return Be}function ge(M,G){M.ambientLightColor.needsUpdate=G,M.lightProbe.needsUpdate=G,M.sunLights.needsUpdate=G,M.sunLightShadows.needsUpdate=G,M.directionalLights.needsUpdate=G,M.directionalLightShadows.needsUpdate=G,M.pointLights.needsUpdate=G,M.pointLightShadows.needsUpdate=G,M.spotLights.needsUpdate=G,M.spotLightShadows.needsUpdate=G,M.rectAreaLights.needsUpdate=G,M.hemisphereLights.needsUpdate=G}function hn(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return Z},this.getActiveMipmapLevel=function(){return L},this.getRenderTarget=function(){return Q},this.setRenderTargetTextures=function(M,G,it){let X=j.get(M);X.__autoAllocateDepthBuffer=M.resolveDepthBuffer===!1,X.__autoAllocateDepthBuffer===!1&&(X.__useRenderToTexture=!1),j.get(M.texture).__webglTexture=G,j.get(M.depthTexture).__webglTexture=X.__autoAllocateDepthBuffer?void 0:it,X.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(M,G){let it=j.get(M);it.__webglFramebuffer=G,it.__useDefaultFramebuffer=G===void 0},this.setRenderTarget=function(M,G=0,it=0){Q=M,Z=G,L=it;let X=null,J=!1,wt=!1;if(M){let _t=j.get(M);if(_t.__useDefaultFramebuffer!==void 0){_.bindFramebuffer(U.FRAMEBUFFER,_t.__webglFramebuffer),nt.copy(M.viewport),mt.copy(M.scissor),ht=M.scissorTest,_.viewport(nt),_.scissor(mt),_.setScissorTest(ht),Y=-1;return}else if(_t.__webglFramebuffer===void 0)ot.setupRenderTarget(M);else if(_t.__hasExternalTextures)ot.rebindTextures(M,j.get(M.texture).__webglTexture,j.get(M.depthTexture).__webglTexture);else if(M.depthBuffer){let ce=M.depthTexture;if(_t.__boundDepthTexture!==ce){if(ce!==null&&j.has(ce)&&(M.width!==ce.image.width||M.height!==ce.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");ot.setupDepthRenderbuffer(M)}}let zt=M.texture;(zt.isData3DTexture||zt.isDataArrayTexture||zt.isCompressedArrayTexture)&&(wt=!0);let Gt=j.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(Gt[G])?X=Gt[G][it]:X=Gt[G],J=!0):M.samples>0&&ot.useMultisampledRTT(M)===!1?X=j.get(M).__webglMultisampledFramebuffer:Array.isArray(Gt)?X=Gt[it]:X=Gt,nt.copy(M.viewport),mt.copy(M.scissor),ht=M.scissorTest}else nt.copy(Dt).multiplyScalar(ut).floor(),mt.copy(ie).multiplyScalar(ut).floor(),ht=Me;if(it!==0&&(X=q),_.bindFramebuffer(U.FRAMEBUFFER,X)&&_.drawBuffers(M,X),_.viewport(nt),_.scissor(mt),_.setScissorTest(ht),J){let _t=j.get(M.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+G,_t.__webglTexture,it)}else if(wt){let _t=G;for(let zt=0;zt<M.textures.length;zt++){let Gt=j.get(M.textures[zt]);U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0+zt,Gt.__webglTexture,it,_t)}}else if(M!==null&&it!==0){let _t=j.get(M.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,_t.__webglTexture,it)}Y=-1};function vn(M){let G=j.get(M);return(G.__readFormat!==M.format||G.__readType!==M.type)&&(G.__readFormat=M.format,G.__readType=M.type,G.__formatReadable=C.textureFormatReadable(M.format),G.__typeReadable=C.textureTypeReadable(M.type)),G}this.readRenderTargetPixels=function(M,G,it,X,J,wt,Ft,_t=0){if(!(M&&M.isWebGLRenderTarget)){se("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let zt=j.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&Ft!==void 0&&(zt=zt[Ft]),zt){_.bindFramebuffer(U.FRAMEBUFFER,zt);try{let Gt=M.textures[_t],ce=Gt.format,Jt=Gt.type;M.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+_t);let Ot=vn(Gt);if(Ot.__formatReadable===!1){se("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Ot.__typeReadable===!1){se("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}G>=0&&G<=M.width-X&&it>=0&&it<=M.height-J&&U.readPixels(G,it,X,J,St.convert(ce),St.convert(Jt),wt)}finally{let Gt=Q!==null?j.get(Q).__webglFramebuffer:null;_.bindFramebuffer(U.FRAMEBUFFER,Gt)}}},this.readRenderTargetPixelsAsync=async function(M,G,it,X,J,wt,Ft,_t=0){if(!(M&&M.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let zt=j.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&Ft!==void 0&&(zt=zt[Ft]),zt)if(G>=0&&G<=M.width-X&&it>=0&&it<=M.height-J){_.bindFramebuffer(U.FRAMEBUFFER,zt);let Gt=M.textures[_t],ce=Gt.format,Jt=Gt.type;M.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+_t);let Ot=vn(Gt);if(Ot.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Ot.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let _e=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,_e),U.bufferData(U.PIXEL_PACK_BUFFER,wt.byteLength,U.STREAM_READ),U.readPixels(G,it,X,J,St.convert(ce),St.convert(Jt),0),U.bindBuffer(U.PIXEL_PACK_BUFFER,null);let Xt=Q!==null?j.get(Q).__webglFramebuffer:null;_.bindFramebuffer(U.FRAMEBUFFER,Xt);let he=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await ld(U,he,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,_e),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,wt),U.bindBuffer(U.PIXEL_PACK_BUFFER,null),U.deleteBuffer(_e),U.deleteSync(he),wt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(M,G=null,it=0){let X=Math.pow(2,-it),J=Math.floor(M.image.width*X),wt=Math.floor(M.image.height*X),Ft=G!==null?G.x:0,_t=G!==null?G.y:0;ot.setTexture2D(M,0),U.copyTexSubImage2D(U.TEXTURE_2D,it,0,0,Ft,_t,J,wt),_.unbindTexture()},this.copyTextureToTexture=function(M,G,it=null,X=null,J=0,wt=0){let Ft,_t,zt,Gt,ce,Jt,Ot,_e,Xt,he=M.isCompressedTexture?M.mipmaps[wt]:M.image;if(it!==null)Ft=it.max.x-it.min.x,_t=it.max.y-it.min.y,zt=it.isBox3?it.max.z-it.min.z:1,Gt=it.min.x,ce=it.min.y,Jt=it.isBox3?it.min.z:0;else{let Pe=Math.pow(2,-J);Ft=Math.floor(he.width*Pe),_t=Math.floor(he.height*Pe),M.isDataArrayTexture?zt=he.depth:M.isData3DTexture?zt=Math.floor(he.depth*Pe):zt=1,Gt=0,ce=0,Jt=0}X!==null?(Ot=X.x,_e=X.y,Xt=X.z):(Ot=0,_e=0,Xt=0);let re=St.convert(G.format),ze=St.convert(G.type),Ut;G.isData3DTexture?(ot.setTexture3D(G,0),Ut=U.TEXTURE_3D):G.isDataArrayTexture||G.isCompressedArrayTexture?(ot.setTexture2DArray(G,0),Ut=U.TEXTURE_2D_ARRAY):(ot.setTexture2D(G,0),Ut=U.TEXTURE_2D),_.activeTexture(U.TEXTURE0),_.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,G.flipY),_.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,G.premultiplyAlpha),_.pixelStorei(U.UNPACK_ALIGNMENT,G.unpackAlignment);let Oe=_.getParameter(U.UNPACK_ROW_LENGTH),me=_.getParameter(U.UNPACK_IMAGE_HEIGHT),Be=_.getParameter(U.UNPACK_SKIP_PIXELS),Ee=_.getParameter(U.UNPACK_SKIP_ROWS),Ae=_.getParameter(U.UNPACK_SKIP_IMAGES);_.pixelStorei(U.UNPACK_ROW_LENGTH,he.width),_.pixelStorei(U.UNPACK_IMAGE_HEIGHT,he.height),_.pixelStorei(U.UNPACK_SKIP_PIXELS,Gt),_.pixelStorei(U.UNPACK_SKIP_ROWS,ce),_.pixelStorei(U.UNPACK_SKIP_IMAGES,Jt);let Fn=M.isDataArrayTexture||M.isData3DTexture,ve=G.isDataArrayTexture||G.isData3DTexture;if(M.isDepthTexture){let Pe=j.get(M),Kn=j.get(G),Ce=j.get(Pe.__renderTarget),On=j.get(Kn.__renderTarget);_.bindFramebuffer(U.READ_FRAMEBUFFER,Ce.__webglFramebuffer),_.bindFramebuffer(U.DRAW_FRAMEBUFFER,On.__webglFramebuffer);for(let Cn=0;Cn<zt;Cn++)Fn&&(U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,j.get(M).__webglTexture,J,Jt+Cn),U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,j.get(G).__webglTexture,wt,Xt+Cn)),U.blitFramebuffer(Gt,ce,Ft,_t,Ot,_e,Ft,_t,U.DEPTH_BUFFER_BIT,U.NEAREST);_.bindFramebuffer(U.READ_FRAMEBUFFER,null),_.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else if(J!==0||M.isRenderTargetTexture||j.has(M)){let Pe=j.get(M),Kn=j.get(G);_.bindFramebuffer(U.READ_FRAMEBUFFER,N),_.bindFramebuffer(U.DRAW_FRAMEBUFFER,z);for(let Ce=0;Ce<zt;Ce++)Fn?U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Pe.__webglTexture,J,Jt+Ce):U.framebufferTexture2D(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,Pe.__webglTexture,J),ve?U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Kn.__webglTexture,wt,Xt+Ce):U.framebufferTexture2D(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,Kn.__webglTexture,wt),J!==0?U.blitFramebuffer(Gt,ce,Ft,_t,Ot,_e,Ft,_t,U.COLOR_BUFFER_BIT,U.NEAREST):ve?U.copyTexSubImage3D(Ut,wt,Ot,_e,Xt+Ce,Gt,ce,Ft,_t):U.copyTexSubImage2D(Ut,wt,Ot,_e,Gt,ce,Ft,_t);_.bindFramebuffer(U.READ_FRAMEBUFFER,null),_.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else ve?M.isDataTexture||M.isData3DTexture?U.texSubImage3D(Ut,wt,Ot,_e,Xt,Ft,_t,zt,re,ze,he.data):G.isCompressedArrayTexture?U.compressedTexSubImage3D(Ut,wt,Ot,_e,Xt,Ft,_t,zt,re,he.data):U.texSubImage3D(Ut,wt,Ot,_e,Xt,Ft,_t,zt,re,ze,he):M.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,wt,Ot,_e,Ft,_t,re,ze,he.data):M.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,wt,Ot,_e,he.width,he.height,re,he.data):U.texSubImage2D(U.TEXTURE_2D,wt,Ot,_e,Ft,_t,re,ze,he);_.pixelStorei(U.UNPACK_ROW_LENGTH,Oe),_.pixelStorei(U.UNPACK_IMAGE_HEIGHT,me),_.pixelStorei(U.UNPACK_SKIP_PIXELS,Be),_.pixelStorei(U.UNPACK_SKIP_ROWS,Ee),_.pixelStorei(U.UNPACK_SKIP_IMAGES,Ae),wt===0&&G.generateMipmaps&&U.generateMipmap(Ut),_.unbindTexture()},this.initRenderTarget=function(M){j.get(M).__webglFramebuffer===void 0&&ot.setupRenderTarget(M)},this.initTexture=function(M){M.isCubeTexture?ot.setTextureCube(M,0):M.isData3DTexture?ot.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?ot.setTexture2DArray(M,0):ot.setTexture2D(M,0),_.unbindTexture()},this.resetState=function(){Z=0,L=0,Q=null,_.reset(),Lt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Hn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=xe._getDrawingBufferColorSpace(t),e.unpackColorSpace=xe._getUnpackColorSpace()}};var io=new O;function Dn(i,t,e,n,s,r){let o=2*Math.PI*s/4,a=Math.max(r-2*s,0),c=Math.PI/4;io.copy(t),io[n]=0,io.normalize();let l=.5*o/(o+a),u=1-io.angleTo(i)/c;return Math.sign(io[e])===1?u*l:a/(o+a)+l+l*(1-u)}var Il=class i extends Pn{constructor(t=1,e=1,n=1,s=2,r=.1){let o=s*2+1;if(r=Math.min(t/2,e/2,n/2,r),super(1,1,1,o,o,o),this.type="RoundedBoxGeometry",this.parameters={width:t,height:e,depth:n,segments:s,radius:r},o===1)return;let a=this.toNonIndexed();this.index=null,this.attributes.position=a.attributes.position,this.attributes.normal=a.attributes.normal,this.attributes.uv=a.attributes.uv;let c=new O,l=new O,u=new O(t,e,n).divideScalar(2).subScalar(r),f=this.attributes.position.array,h=this.attributes.normal.array,d=this.attributes.uv.array,g=f.length/6,v=new O,p=.5/o;for(let m=0,w=0;m<f.length;m+=3,w+=2)switch(c.fromArray(f,m),l.copy(c),l.x-=Math.sign(l.x)*p,l.y-=Math.sign(l.y)*p,l.z-=Math.sign(l.z)*p,l.normalize(),f[m+0]=u.x*Math.sign(c.x)+l.x*r,f[m+1]=u.y*Math.sign(c.y)+l.y*r,f[m+2]=u.z*Math.sign(c.z)+l.z*r,h[m+0]=l.x,h[m+1]=l.y,h[m+2]=l.z,Math.floor(m/g)){case 0:v.set(1,0,0),d[w+0]=Dn(v,l,"z","y",r,n),d[w+1]=1-Dn(v,l,"y","z",r,e);break;case 1:v.set(-1,0,0),d[w+0]=1-Dn(v,l,"z","y",r,n),d[w+1]=1-Dn(v,l,"y","z",r,e);break;case 2:v.set(0,1,0),d[w+0]=1-Dn(v,l,"x","z",r,t),d[w+1]=Dn(v,l,"z","x",r,n);break;case 3:v.set(0,-1,0),d[w+0]=1-Dn(v,l,"x","z",r,t),d[w+1]=1-Dn(v,l,"z","x",r,n);break;case 4:v.set(0,0,1),d[w+0]=1-Dn(v,l,"x","y",r,t),d[w+1]=1-Dn(v,l,"y","x",r,e);break;case 5:v.set(0,0,-1),d[w+0]=Dn(v,l,"x","y",r,t),d[w+1]=1-Dn(v,l,"y","x",r,e);break}}static fromJSON(t){return new i(t.width,t.height,t.depth,t.segments,t.radius)}};function Yd(i,t=!1){let e=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},o={},a=i[0].morphTargetsRelative,c=new on,l=0;for(let u=0;u<i.length;++u){let f=i[u],h=0;if(e!==(f.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let d in f.attributes){if(!n.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+'. All geometries must have compatible attributes; make sure "'+d+'" attribute exists among all geometries, or in none of them.'),null;r[d]===void 0&&(r[d]=[]),r[d].push(f.attributes[d]),h++}if(h!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". Make sure all geometries have the same number of attributes."),null;if(a!==f.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let d in f.morphAttributes){if(!s.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+".  .morphAttributes must be consistent throughout all geometries."),null;o[d]===void 0&&(o[d]=[]),o[d].push(f.morphAttributes[d])}if(t){let d;if(e)d=f.index.count;else if(f.attributes.position!==void 0)d=f.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,d,u),l+=d}}if(e){let u=0,f=[];for(let h=0;h<i.length;++h){let d=i[h].index;for(let g=0;g<d.count;++g)f.push(d.getX(g)+u);u+=i[h].attributes.position.count}c.setIndex(f)}for(let u in r){let f=qd(r[u]);if(!f)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" attribute."),null;c.setAttribute(u,f)}for(let u in o){let f=o[u][0].length;if(f!==0){c.morphAttributes=c.morphAttributes||{},c.morphAttributes[u]=[];for(let h=0;h<f;++h){let d=[];for(let v=0;v<o[u].length;++v)d.push(o[u][v][h]);let g=qd(d);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" morphAttribute."),null;c.morphAttributes[u].push(g)}}}return c}function qd(i){let t,e,n,s=-1,r=0;for(let l=0;l<i.length;++l){let u=i[l];if(t===void 0&&(t=u.array.constructor),t!==u.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=u.itemSize),e!==u.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=u.normalized),n!==u.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=u.gpuType),s!==u.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=u.count*e}let o=new t(r),a=new mn(o,e,n),c=0;for(let l=0;l<i.length;++l){let u=i[l];if(u.isInterleavedBufferAttribute){let f=c/e;for(let h=0,d=u.count;h<d;h++)for(let g=0;g<e;g++){let v=u.getComponent(h,g);a.setComponent(h+f,g,v)}}else o.set(u.array,c);c+=u.count*e}return s!==void 0&&(a.gpuType=s),a}var Gi=.3,Ti=.27,Nn=.014,Hi=.3,Th=9,Ai=.15,Ah=1.2,C_=-.035,Pl=Ai+Nn/2-.005-C_,sM=4.02-Pl;function $d(){let i=new Ke;i.name="Brick-built stone keep";let t=[],e=new Map,s=["#55616a","#5c6870","#637078","#505c65","#6b757b","#5a666e","#626b71"].map(S=>new An({color:S,roughness:.42,metalness:.025})),r=["#79848a","#707c83","#65717a"].map(S=>new An({color:S,roughness:.43,metalness:.025})),o=new An({color:"#444f58",roughness:.48,metalness:.02}),a=1,c=0,l=new zr([new Tt(0,0),new Tt(.078,0),new Tt(.087,.008),new Tt(.087,.048),new Tt(.08,.055),new Tt(0,.055)],16);function u(S){let I=Yd(S.map(x=>x.index?x.toNonIndexed():x),!1);return I.computeBoundingSphere(),I}function f(S,I,x){return l.clone().applyMatrix4(new Re().makeTranslation(S,I,x))}function h(S,I,x,E=!0){let D=[S,I,x,E].map(q=>typeof q=="number"?q.toFixed(4):q).join("/");if(e.has(D))return e.get(D);let P=[new Il(S-Nn,I-Nn,x-Nn,2,.011)];if(E){let q=Math.max(1,Math.floor((S-.18)/Gi)+1),N=Math.max(1,Math.floor((x-.18)/Gi)+1);for(let z=0;z<q;z++)for(let Z=0;Z<N;Z++){let L=(z-(q-1)/2)*Gi,Q=(Z-(N-1)/2)*Gi;Math.abs(L)+.09<S/2&&Math.abs(Q)+.09<x/2&&P.push(f(L,(I-Nn)/2,Q))}}let V=u(P);return e.set(D,V),V}function d(S,{x:I=0,y:x=0,z:E=0,rotation:D=0,material:P,animate:V=!1,order:q,name:N="Masonry brick"}={}){let z=new Ke;z.name=N,z.position.set(I,x,E),z.rotation.y=D;let Z=new De(S,P||s[(a*17+Math.floor(x*31))%s.length]);return Z.castShadow=!0,Z.receiveShadow=!0,z.add(Z),z.userData={brick:!0,index:a++,course:Math.floor((x-Ai)/Ti),restHeight:x},i.add(z),V&&t.push({object:z,order:q??x*100+a%23*.025}),z}function g(S,I,x,E,D,P,V){let q=E*Math.PI/2,N=Ah-Hi/2;return d(S,{x:Math.cos(q)*I+Math.sin(q)*N,y:x,z:-Math.sin(q)*I+Math.cos(q)*N,rotation:q,material:D,animate:P,name:V})}let v=[[{bottom:Ai-.03,spring:.96,radius:.45,top:1.41}],[{bottom:Ai-.03,spring:.81,radius:.36,top:1.17}],[],[]];function p(S,I){return S.half?S.half:I<=S.spring?S.radius:Math.sqrt(Math.max(0,S.radius**2-(I-S.spring)**2))}function m(S,I,x){let E=[S],D=x%2?.3:0;for(let P=-1.8+D;P<I-.01;P+=.6)P>S+.08&&E.push(P);return E.push(I),E.slice(0,-1).map((P,V)=>[P,E[V+1]])}function w(S,I,x,E,D,P){let V=(S+I)/2,q=(x+E)/2,N=18,z=[],Z=0,L=S+Nn/2,Q=I-Nn/2,Y=x+Nn/2,$=E-Nn/2;for(let Rt=0;Rt<=N;Rt++){let Kt=Y+($-Y)*Rt/N,rt=P<0?Math.min(Q,-p(D,Kt)-.006):Math.max(L,p(D,Kt)+.006),ut=P<0?Math.max(0,rt-L):Math.max(0,Q-rt);Z+=ut,z.push({y:Kt,boundary:P<0?Math.max(L,rt):Math.min(Q,rt)})}if(Z<.025)return null;let nt=new ss;if(P<0){nt.moveTo(L-V,Y-q);for(let Rt of z)nt.lineTo(Rt.boundary-V,Rt.y-q);nt.lineTo(L-V,$-q)}else{nt.moveTo(Q-V,Y-q),nt.lineTo(Q-V,$-q);for(let Rt of z.slice().reverse())nt.lineTo(Rt.boundary-V,Rt.y-q)}nt.closePath();let mt=new Vs(nt,{depth:Hi-Nn-.012,bevelEnabled:!0,bevelThickness:.006,bevelSize:.005,bevelSegments:2,steps:1,curveSegments:10});mt.translate(0,0,-(Hi-Nn-.012)/2);let ht=[mt],Qt=z[z.length-1].boundary;for(let Rt=-1.05;Rt<1.2;Rt+=Gi)(P<0?Rt+.094<Qt:Rt-.094>Qt)&&Rt-.094>L&&Rt+.094<Q&&ht.push(f(Rt-V,$-q,0));return u(ht)}for(let S=0;S<Th;S++){let I=Ai+S*Ti,x=I+Ti;for(let E=0;E<4;E++){let P=E%2===S%2?Ah:Ah-Hi,V=[I,x],q=v[E],N=!1;for(let z of q)for(let Z of[z.bottom,z.top])Z>I+.01&&Z<x-.01&&(z.radius?N=!0:V.push(Z));V.sort((z,Z)=>z-Z);for(let z=0;z<V.length-1;z++){let Z=V[z],L=V[z+1],Q=(Z+L)/2,Y=q.find($=>Q>$.bottom&&Q<$.top);for(let[$,nt]of m(-P,P,S+E)){let mt=($+nt)/2,ht=!1;if(!Y||nt<-p(Y,Z)-.01||$>p(Y,Z)+.01)g(h(nt-$,L-Z,Hi),mt,Q,E,null,ht,"Interlocking slate-grey wall brick");else for(let Qt of[-1,1]){let Rt=w($,nt,Z,L,Y,Qt);Rt&&g(Rt,mt,Q,E,null,ht,"Shaped masonry around an opening")}}}if(N){let z=m(-P,P,S+E).length;a+=z,c+=z}}}function R(S,I,x,E){for(let V=0;V<E;V++){let q=V*Math.PI/E+.012,N=(V+1)*Math.PI/E-.012,z=I+.135,Z=new ss;Z.absarc(0,0,z,q,N,!1),Z.absarc(0,0,I+.007,N,q,!0),Z.closePath();let L=new Vs(Z,{depth:Hi+.025,bevelEnabled:!0,bevelSize:.004,bevelThickness:.004,bevelSegments:2,curveSegments:6,steps:1});L.translate(0,0,-(Hi+.025)/2),g(L,0,x,S,r[V%r.length],!1,"Individual arch voussoir")}let D=x-Ai,P=Math.ceil(D/Ti);for(let V=0;V<P;V++){let q=D/P;for(let N of[-1,1])g(h(.132,q,Hi+.027,!1),N*(I+.071),Ai+q*(V+.5),S,r[(V+S)%r.length],!1,"Arch jamb brick")}}R(0,.45,.96,7),R(1,.36,.81,7);let b=new An({color:"#757f84",roughness:.46,metalness:.02});d(h(6*Gi,Ti/3,6*Gi),{y:Ai+Th*Ti-Ti/6,material:b,name:"Deck"});for(let S of i.children)S.position.y-=Pl,S.userData.restHeight-=Pl;let A=new Map;i.updateMatrixWorld(!0);for(let S of i.children.slice())S.traverse(I=>{I.isMesh&&(A.has(I.material)||A.set(I.material,[]),A.get(I.material).push(I.geometry.clone().applyMatrix4(I.matrixWorld)))}),i.remove(S);for(let[S,I]of A){let x=new De(u(I),S);x.name="Fixed castle masonry",x.castShadow=!0,x.receiveShadow=!0,i.add(x),I.forEach(E=>E.dispose())}return{model:i,brickGeometry:h,stones:s,foundationTop:Ai+Th*Ti-Pl,pitch:Gi,course:Ti,gap:Nn}}var so=.016666666666666666;function Eh(i,{pieces:t,grips:e,standing:n,shell:s,groundY:r,leans:o,random:a=Math.random,onImpact:c=null,impulse:l=null}){let u=new i.World({gravity:new i.Vec3(0,-26,0),allowSleep:!0});u.broadphase=new i.SAPBroadphase(u),u.solver.iterations=18,u.defaultContactMaterial.friction=.55,u.defaultContactMaterial.restitution=.18;let f=L=>u.addBody(new i.Body({mass:0,shape:new i.Box(new i.Vec3(L.hx,L.hy,L.hz)),position:new i.Vec3(L.x,L.y,L.z)}));s.forEach(f),n.forEach(f);let h=new i.Body({mass:0,shape:new i.Plane,position:new i.Vec3(0,r,0)});h.quaternion.setFromAxisAngle(new i.Vec3(1,0,0),-Math.PI/2),u.addBody(h);let d=t.map(L=>new i.Quaternion().setFromAxisAngle(new i.Vec3(0,1,0),L.rotY)),g=L=>L.hx*L.hy*L.hz,v=new Set,p=new Map,m=0,w=e.map(L=>L.studs+a()*1.5);function R(L,Q,Y,$,nt,mt,ht){let Qt=0,Rt=new i.Vec3;for(let Mt of L){let Bt=g(t[Mt]),Dt=Q(Mt);Qt+=Bt,Rt.x+=Dt.x*Bt,Rt.y+=Dt.y*Bt,Rt.z+=Dt.z*Bt}Rt.scale(1/Qt,Rt);let Kt=new i.Body({mass:8*Qt*20,position:Y.vadd($.vmult(Rt)),quaternion:$.clone(),velocity:nt($.vmult(Rt)),angularVelocity:mt.clone(),allowSleep:m>=1.2,sleepSpeedLimit:.6,sleepTimeLimit:.25}),rt=new Map;for(let Mt of L){let Bt=t[Mt],Dt=Q(Mt).vsub(Rt);rt.set(Mt,Dt),Kt.addShape(new i.Box(new i.Vec3(Bt.hx,Bt.hy,Bt.hz)),Dt)}let ut={body:Kt,members:L,offsets:rt,level:ht,from:Kt.position.clone()};return Kt.addEventListener("collide",Mt=>{let Bt=Math.abs(Mt.contact.getImpactVelocityAlongNormal());c&&Bt>1&&(!Mt.body||Mt.body.mass===0||Kt.id<Mt.body.id)&&c(Bt),!(L.length<2)&&Bt>1.6&&p.set(ut,Math.max(p.get(ut)||0,Bt))}),u.addBody(Kt),v.add(ut),ut}function b(L,Q){let Y=new Map(L.map(mt=>[mt,mt])),$=mt=>Y.get(mt)===mt?mt:(Y.set(mt,$(Y.get(mt))),Y.get(mt));e.forEach((mt,ht)=>{w[ht]>Q&&Y.has(mt.a)&&Y.has(mt.b)&&Y.set($(mt.a),$(mt.b))});let nt=new Map;for(let mt of L){let ht=$(mt);nt.has(ht)||nt.set(ht,[]),nt.get(ht).push(mt)}return[...nt.values()]}function A(L,Q){L.level+=Q*.75;let Y=b(L.members,L.level);if(Y.length<2)return;let{body:$,offsets:nt,level:mt}=L;u.removeBody($),v.delete(L);let ht=Rt=>{let Kt=$.velocity.vadd($.angularVelocity.cross(Rt)),rt=Math.hypot(Rt.x,Rt.y,Rt.z)||1;return Kt.vadd(new i.Vec3(Rt.x/rt*.9,Math.abs(Rt.y)/rt*.9*.5,Rt.z/rt*.9))},Qt=()=>(a()-.5)*2.2;for(let Rt of Y)R(Rt,Kt=>nt.get(Kt),$.position,$.quaternion,ht,$.angularVelocity.vadd(new i.Vec3(Qt(),Qt(),Qt())),mt)}let S=new i.Quaternion,I=new i.Vec3,x=new i.Vec3;for(let L of b(t.map((Q,Y)=>Y),l?1.5:0)){let Q=R(L,$=>new i.Vec3(t[$].x,t[$].y,t[$].z),I,S,()=>x.clone(),x,l?1.5:0),Y=o.find($=>L.includes($.piece));if(Y){let $=Q.body.position.x-Y.x,nt=Q.body.position.z-Y.z,mt=Math.hypot($,nt)||1;Q.body.angularVelocity.set(nt/mt*.55,0,-$/mt*.55)}else if(l){let $=()=>(a()-.5)*.6;Q.body.velocity.set(l.vx+$(),l.vy+a()*.5,l.vz+$()),Q.body.angularVelocity.set(l.spinX+$(),$(),l.spinZ+$())}}function E(L){let{body:Q}=L;if(L.members.length>1){let mt=v.size;if(A(L,9),v.size!==mt||!v.has(L))return}let Y=Q.position.x,$=Q.position.z,nt=Math.hypot(Y,$)||1;Q.velocity.set(Y/nt*1.6,1,$/nt*1.6),Q.angularVelocity.set($/nt*3,0,-Y/nt*3)}let D=new i.Vec3,P=new i.Quaternion;function V(){for(let{body:L,members:Q,offsets:Y}of v)for(let $ of Q){L.quaternion.vmult(Y.get($),D);let nt=t[$].object;nt.position.set(L.position.x+D.x,L.position.y+D.y,L.position.z+D.z),L.quaternion.mult(d[$],P),nt.quaternion.set(P.x,P.y,P.z,P.w)}}function q(){if(u.step(so),m+=so,m>=1.2)for(let{body:L}of v)L.allowSleep=!0;for(let{body:L}of v){let Q=L.velocity.length(),Y=L.angularVelocity.length();Q>15&&L.velocity.scale(15/Q,L.velocity),Y>12&&L.angularVelocity.scale(12/Y,L.angularVelocity)}if(!z&&m>=.7){z=!0;for(let L of[...v])L.body.position.distanceTo(L.from)<.08&&E(L)}for(let[L,Q]of p)v.has(L)&&A(L,Q);p.clear()}let N=0,z=!1,Z=()=>m>5||m>1.2+.25&&[...v].every(L=>L.body.sleepState===i.Body.SLEEPING);return{advance(L){N+=L;for(let Q=0;N>=so&&Q<3;Q++)q(),N-=so;N=Math.min(N,so),V()},advanceBudget(L=16,Q=40){let Y=performance.now(),$=0;for(;!Z()&&$<Q&&($===0||performance.now()-Y<L);)q(),$++;Z()&&V()},finish(){for(;!Z();)q();V()},get settled(){return Z()},get time(){return m},get clumps(){return v.size}}}function Zd(){let i=window.AudioContext||window.webkitAudioContext,t=null,e=null,n=null,s=!0,r=0,o=0;function a(){if(!s||!i)return null;try{if(!t){t=new i,e=t.createGain(),e.gain.value=s?1:0,e.connect(t.destination);let f=Math.floor(t.sampleRate*.14);n=t.createBuffer(1,f,t.sampleRate);let h=n.getChannelData(0);for(let d=0;d<f;d++)h[d]=Math.random()*2-1}return(t.state==="suspended"||t.state==="interrupted")&&t.resume().catch(()=>{}),t.state==="closed"?null:t}catch{return null}}function c(f,h,d,g,v,p=0){let m=a();if(!m||!e)return;let w=m.currentTime+p,R=m.createOscillator(),b=m.createGain();R.type=g,R.frequency.setValueAtTime(f,w),h!==f&&R.frequency.exponentialRampToValueAtTime(Math.max(20,h),w+d),b.gain.setValueAtTime(1e-4,w),b.gain.linearRampToValueAtTime(v,w+.004),b.gain.exponentialRampToValueAtTime(1e-4,w+d),R.connect(b),b.connect(e),R.onended=()=>{R.disconnect(),b.disconnect()},R.start(w),R.stop(w+d+.01)}function l(f,h,d,g,v=0,p="bandpass"){let m=a();if(!m||!e||!n)return;let w=m.currentTime+v,R=m.createBufferSource();R.buffer=n;let b=m.createBiquadFilter();b.type=p,b.frequency.setValueAtTime(f,w),b.Q.setValueAtTime(h,w);let A=m.createGain();A.gain.setValueAtTime(1e-4,w),A.gain.linearRampToValueAtTime(g,w+.003),A.gain.exponentialRampToValueAtTime(1e-4,w+d),R.connect(b),b.connect(A),A.connect(e),R.onended=()=>{R.disconnect(),b.disconnect(),A.disconnect()},R.start(w),R.stop(w+Math.min(d+.01,n.duration))}let u=[293.66,329.63,392,440,523.25,587.33,659.25,783.99];return{get enabled(){return s},set enabled(f){s=!!f,e&&t&&t.state!=="closed"&&e.gain.setValueAtTime(s?1:0,t.currentTime)},unlock(){a()},snap(f=0,h=2){let d=Math.min(u.length-1,Math.floor(Math.max(0,f)/3)),g=u[d]*(.98+Math.random()*.04);l(2500+d*140,2.2,.022,.14),c(g*1.15,g*.72,.048,"triangle",.13),h>=4&&c(155,95,.045,"sine",.09)},pick(){c(620,480,.022,"triangle",.055)},rotate(){c(500,620,.025,"triangle",.065),c(680,740,.02,"sine",.045,.022)},turn(){l(900,1.4,.085,.06,0,"bandpass")},undo(){c(440,320,.055,"triangle",.08),c(320,240,.06,"sine",.06,.045)},creak(){let f=performance.now();f-o<260||(o=f,c(190,132,.14,"sawtooth",.045),l(650,3,.09,.05))},clatter(f=3){let h=performance.now();if(h-r<65)return;r=h;let d=Math.min(1,Math.max(.2,f/9)),g=280+Math.random()*260;l(1800+Math.random()*1400,2.5,.032,.12*d),c(g,g*.68,.04,"triangle",.09*d)},milestone(){c(523.25,523.25,.14,"triangle",.1),c(783.99,783.99,.22,"triangle",.11,.09)},celebrate(){[523.25,659.25,783.99,1046.5].forEach((h,d)=>{c(h,h,.28,"triangle",.1,d*.085),c(h*2,h*2,.16,"sine",.03,d*.085)})},close(){t&&t.state!=="closed"&&t.close().catch(()=>{}),t=null,e=null,n=null}}}function R_(){let i=[],t=(e,n,s,r,o)=>i.push({type:e,i:n,j:s,rot:r,level:o});for(let[e,n]of[[-4,-4],[3,-4],[-4,3],[3,3]])t("b1x1",e,n,0,0);t("b1x2",-3,3,0,0),t("b1x2",1,3,0,0),t("b1x2",3,-3,1,0),t("b1x2",3,1,1,0);for(let e of[-3,-1,1])t("b1x2",e,-4,0,0);for(let e of[-3,-1,1])t("b1x2",-4,e,1,0);t("b1x2",-4,3,0,3),t("b1x4",-2,3,0,3),t("b1x2",2,3,0,3);for(let e of[-4,-2,0,2])t("b1x2",e,-4,0,3);for(let e of[-3,-1,1])t("b1x2",-4,e,1,3);t("b1x1",3,-3,0,3),t("b1x4",3,-2,1,3),t("b1x1",3,2,0,3);for(let e of[-5,-1])t("p2x4",e,3,0,6);for(let e of[-3,1])t("p2x4",3,e,1,6);for(let e of[-3,1])t("p2x4",e,-5,0,6);for(let e of[-5,-1])t("p2x4",-5,e,1,6);for(let[e,n]of[[-5,3],[3,3],[3,-5],[-5,-5],[-1,3],[3,-1],[-1,-5],[-5,-1]])t("b2x2",e,n,0,7);return i}function I_(){let i=[],t=(e,n,s,r,o)=>i.push({type:e,i:n,j:s,rot:r,level:o});return t("b2x2",-4,-1,0,0),t("b2x2",2,-1,0,0),t("b1x2",-4,1,0,0),t("b1x2",-4,-2,0,0),t("b1x2",2,1,0,0),t("b1x2",2,-2,0,0),t("b2x2",-4,-1,0,3),t("b2x2",2,-1,0,3),t("b2x2",-4,-1,0,6),t("b2x2",2,-1,0,6),t("b2x4",-4,-1,0,9),t("b2x4",0,-1,0,9),t("b2x4",-2,-1,0,12),t("b2x2",-4,-1,0,12),t("b2x2",2,-1,0,12),t("p2x4",-4,-1,0,15),t("p2x4",0,-1,0,15),t("b2x2",-1,-1,0,16),t("b1x1",-4,-1,0,16),t("b1x1",-4,0,0,16),t("b1x1",3,-1,0,16),t("b1x1",3,0,0,16),i}function P_(){let i=[],t=(e,n,s,r,o)=>i.push({type:e,i:n,j:s,rot:r,level:o});for(let e of[0,3])t("b2x2",-4,-2,0,e),t("b2x2",-4,0,0,e),t("b2x2",2,-2,0,e),t("b2x2",2,0,0,e);t("p2x4",-4,-2,0,6),t("p2x4",-4,0,0,6),t("p2x4",0,-2,0,6),t("p2x4",0,0,0,6),t("p2x4",-2,-2,0,7),t("p2x4",-2,0,0,7),t("b2x2",-4,-2,0,7),t("b2x2",-4,0,0,7),t("b2x2",2,-2,0,7),t("b2x2",2,0,0,7),t("b1x4",-2,1,0,8),t("b1x4",-2,-2,0,8),t("p2x4",-4,-2,1,10),t("p2x4",2,-2,1,10);for(let[e,n]of[[-4,-2],[-4,1],[3,-2],[3,1]])t("b1x1",e,n,0,11);return i}function L_(){let i=[],t=(e,n,s,r,o)=>i.push({type:e,i:n,j:s,rot:r,level:o});t("b2x4",-2,-2,0,0),t("b2x4",-2,0,0,0),t("b1x2",-1,2,0,0),t("b1x2",-1,-3,0,0),t("b1x2",2,-1,1,0),t("b1x2",-3,-1,1,0),t("b2x4",-2,-2,1,3),t("b2x4",0,-2,1,3),t("b2x2",-1,-1,0,6),t("b1x2",-1,1,0,6),t("b1x2",-1,-2,0,6),t("b1x2",1,-1,1,6),t("b1x2",-2,-1,1,6),t("b1x2",-1,-1,0,9),t("b1x2",-1,0,0,9),t("b1x2",-1,-1,1,12),t("b1x2",0,-1,1,12),t("p2x4",-2,-2,0,15),t("p2x4",-2,0,0,15),t("b2x2",-1,-1,0,16);for(let[e,n]of[[-2,-2],[1,-2],[-2,1],[1,1]])t("p1x1",e,n,0,16);return t("p2x4",-2,-2,1,19),t("p2x4",0,-2,1,19),t("b2x2",-1,-1,0,20),t("p2x2",-1,-1,0,23),i}var Ll=[{id:"free",name:"Free build",summary:"Open deck with no guide boxes. Build whatever you like.",build:()=>[]},{id:"castle",name:"Castle tower",summary:"The FORRT keep with windows, an overhang ledge and a crown.",build:R_},{id:"arch",name:"Open arch",summary:"Twin pillars joined by an overhanging doorway and keystone.",build:I_},{id:"bridge",name:"Twin bridge",summary:"Two lookout towers linked high up by an open skywalk.",build:P_},{id:"lighthouse",name:"Lighthouse",summary:"A tall tapering beacon with a gallery deck and lantern room.",build:L_}],hi=Object.fromEntries(Ll.map(i=>[i.id,i]));var ro=76;function Jd(i,t){let e=new Ke;e.name="Tower effects",i.add(e);let n=new Pn(.06,.06,.06),s=[];for(let g=0;g<ro;g++){let v=new ri({color:"#ffffff",transparent:!0,opacity:1}),p=new De(n,v);p.visible=!1,e.add(p),s.push({mesh:p,mat:v,active:!1,vx:0,vy:0,vz:0,rx:0,ry:0,rz:0,gravity:-5,t:0,life:.4,sx:1,sy:1,sz:1})}let r=0,o=new Set;function a(){for(let v=0;v<ro;v++){let p=s[(r+v)%ro];if(!p.active)return r=(r+v+1)%ro,p}let g=s[r];return r=(r+1)%ro,g}function c(g,v,p,m,w,R,b=!1){if(t.matches)return;let A=b?10:6,S=new oe(R).lerp(new oe("#ffffff"),.45);for(let I=0;I<A;I++){let x=a(),E=I/A*Math.PI*2+(Math.random()-.5)*.5,D=Math.cos(E),P=Math.sin(E);x.active=!0,x.t=0,x.life=b?.36+Math.random()*.14:.24+Math.random()*.1,x.gravity=b?-3.4:-4.2;let V=(b?.85:.55)+Math.random()*.45;x.vx=D*V,x.vy=(b?1.05:.58)+Math.random()*.45,x.vz=P*V,x.rx=(Math.random()-.5)*9,x.ry=(Math.random()-.5)*9,x.rz=(Math.random()-.5)*9;let q=b&&I%2===0?1.15:.72+Math.random()*.35;x.sx=q,x.sy=q*.65,x.sz=q,x.mat.color.copy(b&&I%2===0?new oe(I%4===0?"#e8b52c":"#14808f"):S),x.mat.opacity=.92,x.mesh.position.set(g+D*m*.85,v+.03,p+P*w*.85),x.mesh.rotation.set(Math.random()*3,Math.random()*3,Math.random()*3),x.mesh.scale.set(x.sx,x.sy,x.sz),x.mesh.visible=!0}}function l(g,v){if(t.matches)return;let p=42;for(let m=0;m<p;m++){let w=a(),R=Math.random()*Math.PI*2,b=.9+Math.random()*2.1;w.active=!0,w.t=0,w.life=1.15+Math.random()*.75,w.gravity=-3.8,w.vx=Math.cos(R)*b,w.vy=2.1+Math.random()*2.2,w.vz=Math.sin(R)*b,w.rx=(Math.random()-.5)*11,w.ry=(Math.random()-.5)*11,w.rz=(Math.random()-.5)*11,w.sx=1.45,w.sy=.38,w.sz=1.1,w.mat.color.set(v[m%v.length]),w.mat.opacity=1,w.mesh.position.set((Math.random()-.5)*1.1,g+.25+Math.random()*.35,(Math.random()-.5)*1.1),w.mesh.rotation.set(Math.random()*6,Math.random()*6,Math.random()*6),w.mesh.scale.set(w.sx,w.sy,w.sz),w.mesh.visible=!0}}function u(g,v){t.matches||o.add({part:g,halfH:v,t:0,dur:.13})}function f(){for(let g of s)g.active=!1,g.mesh.visible=!1;for(let g of o)g.part.object.scale.set(1,1,1),g.part.object.position.y=g.part.rest.y;o.clear()}function h(g){let v=!1;for(let p of s){if(!p.active)continue;if(p.t+=g,p.t>=p.life){p.active=!1,p.mesh.visible=!1;continue}v=!0,p.vy+=p.gravity*g,p.mesh.position.x+=p.vx*g,p.mesh.position.y+=p.vy*g,p.mesh.position.z+=p.vz*g,p.mesh.rotation.x+=p.rx*g,p.mesh.rotation.y+=p.ry*g,p.mesh.rotation.z+=p.rz*g;let m=p.t/p.life,w=m>.55?1-(m-.55)/.45:1;p.mat.opacity=Math.max(0,w);let R=1-m*.35;p.mesh.scale.set(p.sx*R,p.sy*R,p.sz*R)}for(let p of[...o]){if(p.part.state!=="placed"){p.part.object.scale.set(1,1,1),o.delete(p);continue}if(p.t+=g,p.t>=p.dur){p.part.object.scale.set(1,1,1),p.part.object.position.y=p.part.rest.y,o.delete(p);continue}v=!0;let m=p.t/p.dur,w=-Math.sin(m*Math.PI*1.5)*Math.pow(1-m,1.5),R=1+w*.085,b=1-w*.04;p.part.object.scale.set(b,R,b),p.part.object.position.y=p.part.rest.y-p.halfH*(1-R)}return v}function d(){f(),n.dispose();for(let g of s)g.mat.dispose();i.remove(e)}return{burstAt:c,confetti:l,bounce:u,clear:f,tick:h,dispose:d,get active(){return o.size>0||s.some(g=>g.active)}}}var Wi=["#7046a3","#2672b8","#2b985b","#e8b52c","#e98434","#ce4742"];function Ch(i,t,e,n,s,r){i.beginPath(),i.moveTo(t+r,e),i.arcTo(t+n,e,t+n,e+s,r),i.arcTo(t+n,e+s,t,e+s,r),i.arcTo(t,e+s,t,e,r),i.arcTo(t,e,t+n,e,r),i.closePath()}function Kd({sourceCanvas:i,title:t,bricks:e,courses:n,stability:s,blueprintDone:r}){let c=document.createElement("canvas");c.width=1200,c.height=900;let l=c.getContext("2d");l.fillStyle="#e3efec",l.fillRect(0,0,1200,900);let u=36,f=u,h=u,d=1200-u*2,g=900-u*2;l.save(),l.shadowColor="rgba(38, 45, 53, 0.14)",l.shadowBlur=24,l.shadowOffsetY=8,Ch(l,f,h,d,g,24),l.fillStyle="#ffffff",l.fill(),l.restore(),l.save(),Ch(l,f,h,d,g,24),l.clip();let v=10,p=d/Wi.length;Wi.forEach((Z,L)=>{l.fillStyle=Z,l.fillRect(f+L*p,h,Math.ceil(p)+1,v)});let m=136,w=h+v,R=g-v-m,b=l.createLinearGradient(0,w,0,w+R);b.addColorStop(0,"#eaf4f1"),b.addColorStop(1,"#dcebe7"),l.fillStyle=b,l.fillRect(f,w,d,R);let A=i.width||1,S=i.height||1,I=Math.min((d-48)/A,(R-24)/S),x=A*I,E=S*I,D=f+(d-x)/2,P=w+(R-E)/2;l.drawImage(i,D,P,x,E);let V=h+g-m;l.fillStyle="#d7e2e0",l.fillRect(f,V,d,1.5),l.fillStyle="#262d35",l.font="500 38px 'Newsreader', Georgia, serif",l.textBaseline="alphabetic",l.fillText(t,f+40,V+56);let z=`${e} ${e===1?"brick":"bricks"}  \xB7  ${n} ${n===1?"layer":"layers"} high  \xB7  ${s}% stable`;if(l.fillStyle="#4c5e72",l.font="600 22px 'Source Sans 3', system-ui, sans-serif",l.fillText(z,f+40,V+98),r){let Z="Blueprint complete";l.font="600 19px 'Source Sans 3', system-ui, sans-serif";let L=l.measureText(Z).width,Q=f+d-40-L-28,Y=V+26;Ch(l,Q,Y,L+28,36,18),l.fillStyle="#e3f1e7",l.fill(),l.fillStyle="#2b7a4b",l.fillText(Z,Q+14,Y+24)}return l.fillStyle="#2d5750",l.font="600 20px 'Source Sans 3', system-ui, sans-serif",l.textAlign="right",l.fillText("Built on forrt.org",f+d-40,V+98),l.restore(),c}function jd(i,t="forrt-tower.png"){return new Promise(e=>{let n=(s,r)=>{let o=document.createElement("a");o.href=s,o.download=t,document.body.appendChild(o),o.click(),o.remove(),r&&setTimeout(()=>URL.revokeObjectURL(s),2e3),e(!0)};i.toBlob?i.toBlob(s=>{s?n(URL.createObjectURL(s),!0):n(i.toDataURL("image/png"),!1)},"image/png"):n(i.toDataURL("image/png"),!1)})}var D_=`
html.tg-lock{overflow:hidden;scrollbar-gutter:stable}
#tower-game{touch-action:none;width:min(1040px,100vw);max-width:100vw;height:min(840px,100dvh);max-height:100dvh;padding:0;border:0;border-radius:18px;background:#e3efec;color:#262d35;overflow:hidden;font-family:'Source Sans 3',system-ui,sans-serif}
#tower-game::backdrop{background:rgba(38,45,53,.55)}
#tower-game .tg-wrap{display:flex;flex-direction:column;height:100%}
#tower-game .tg-panel{display:contents}
#tower-game .tg-head{display:flex;align-items:center;gap:8px;padding:10px 12px 4px 18px;order:1}
#tower-game h2{font:500 clamp(19px,3vw,26px)/1.1 'Newsreader',Georgia,serif;margin:0;flex:1;min-width:0}
#tower-game .tg-head-actions{display:flex;align-items:center;gap:6px;flex:none}
#tower-game .tg-bar{display:flex;align-items:center;justify-content:space-between;gap:8px 12px;padding:4px 12px 6px 18px;flex-wrap:wrap;order:2}
#tower-game .tg-plans{display:flex;align-items:center;gap:5px;min-width:0;max-width:100%;overflow-x:auto;scrollbar-width:none;-webkit-overflow-scrolling:touch;padding:2px 0}
#tower-game .tg-plans::-webkit-scrollbar{display:none}
#tower-game button.tg-plan-pill{flex:none;min-height:36px;padding:5px 12px;border:1.5px solid #9db3ae;border-radius:999px;background:#f6faf9;color:#262d35;font:600 14px/1.2 'Source Sans 3',system-ui,sans-serif;cursor:pointer;white-space:nowrap}
@media(hover:hover){#tower-game button.tg-plan-pill:hover{background:#fff;border-color:#2d5750}}
#tower-game button.tg-plan-pill[aria-pressed=true]{background:#2d5750;border-color:#2d5750;color:#fff}
#tower-game .tg-status{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-left:auto}
#tower-game .tg-count{font-weight:600;font-size:15px;white-space:nowrap;color:#262d35}
#tower-game .tg-prog{display:inline-flex;align-items:center;gap:6px;padding:3px 10px;border-radius:999px;background:#fff;border:1px solid #bfd2cd;font:600 14px/1.2 'Source Sans 3',system-ui,sans-serif;color:#115e69;white-space:nowrap}
#tower-game .tg-prog[hidden]{display:none}
#tower-game .tg-prog.tg-prog-done{background:#e3f1e7;border-color:#2b7a4b;color:#1d5e37}
#tower-game .tg-prog-track{width:42px;height:6px;border-radius:999px;background:#d6e6e3;overflow:hidden}
#tower-game .tg-prog-fill{display:block;height:100%;width:0;background:#14808f;border-radius:999px;transition:width .2s}
#tower-game .tg-prog.tg-prog-done .tg-prog-fill{background:#2b7a4b}
#tower-game .tg-offplan{display:inline-flex;align-items:center;padding:3px 9px;border-radius:999px;background:#fef4e2;border:1px solid #d8a956;font:600 14px/1.2 'Source Sans 3',system-ui,sans-serif;color:#7a4f00;white-space:nowrap}
#tower-game .tg-offplan[hidden]{display:none}
#tower-game .tg-meter{display:inline-flex;align-items:center;gap:7px;padding:3px 10px;border-radius:999px;background:#fff;border:1px solid #bfd2cd;font:600 14px/1.2 'Source Sans 3',system-ui,sans-serif;white-space:nowrap;color:#1d5e37}
#tower-game .tg-meter-track{width:54px;height:7px;border-radius:999px;background:#e4ecea;overflow:hidden;flex:none}
#tower-game .tg-meter-fill{display:block;height:100%;width:100%;border-radius:999px;background:#2b7a4b;transition:width .15s,background-color .15s}
#tower-game .tg-meter[data-state=leaning]{color:#7a4f00;border-color:#d8b35a}
#tower-game .tg-meter[data-state=leaning] .tg-meter-fill{background:#b87a00}
#tower-game .tg-meter[data-state=risky]{color:#9a4106;border-color:#df9359}
#tower-game .tg-meter[data-state=risky] .tg-meter-fill{background:#d96614}
#tower-game .tg-meter[data-state=wobbly]{color:#a51c16;border-color:#d9534f;background:#fdf2f2}
#tower-game .tg-meter[data-state=wobbly] .tg-meter-fill{background:#d92d20}
#tower-game .tg-field{position:relative;flex:1;min-height:0;order:3}
#tower-game .tg-stage{position:absolute;inset:0;touch-action:none;user-select:none;-webkit-user-select:none}
#tower-game .tg-over{position:absolute;top:6px;display:flex;gap:6px;z-index:2}
#tower-game .tg-over[hidden]{display:none}
#tower-game .tg-plan{left:8px}
#tower-game .tg-again{right:8px}
#tower-game .tg-toast{position:absolute;top:8px;left:50%;transform:translateX(-50%);z-index:3;display:inline-flex;align-items:center;gap:7px;padding:7px 14px;border-radius:999px;background:#262d35;color:#fff;font:600 14px/1.2 'Source Sans 3',system-ui,sans-serif;box-shadow:0 6px 18px rgba(38,45,53,.24);pointer-events:none;white-space:nowrap;max-width:calc(100% - 24px);overflow:hidden;text-overflow:ellipsis;transition:opacity .22s,transform .22s}
#tower-game .tg-toast[hidden]{display:none}
#tower-game .tg-toast-dot{width:9px;height:9px;border-radius:50%;background:#e8b52c;flex:none}
#tower-game .tg-toast.tg-toast-plan .tg-toast-dot{background:#2b985b}
#tower-game .tg-stage.tg-keys:focus{outline:3px solid #005a87;outline-offset:-3px}
#tower-game canvas{position:absolute;inset:0;width:100%;height:100%;display:block;cursor:crosshair}
#tower-game .tg-tray{display:grid;grid-template-columns:repeat(10,minmax(0,1fr));gap:4px;padding:4px 12px;touch-action:none;user-select:none;-webkit-user-select:none;order:4}
#tower-game button.tg-style{display:flex;flex-direction:column;align-items:center;justify-content:flex-end;gap:0;min-height:58px;min-width:0;padding:3px 1px 4px;border:2px solid transparent;border-radius:10px;background:#f6faf9;font:600 13px/1.1 'Source Sans 3',system-ui,sans-serif;color:#262d35;cursor:pointer}
@media(hover:hover){#tower-game button.tg-style:hover{background:#fff;color:#262d35;border-color:#2d5750}}
#tower-game button.tg-style[aria-pressed=true]{background:#fff;color:#262d35;border-color:#b34e0a;box-shadow:0 0 0 1px #b34e0a}
#tower-game .tg-style img{width:100%;max-width:62px;height:34px;object-fit:contain;display:block;pointer-events:none;transition:transform .15s}
#tower-game .tg-style.tg-flip img{transform:scaleX(-1)}
#tower-game .tg-style small{font-size:12px;font-weight:400;line-height:1}
#tower-game .tg-style{position:relative}
#tower-game .tg-style kbd{position:absolute;top:3px;left:5px;font:600 11px/1 'Source Sans 3',system-ui,sans-serif;color:#5a666e}
@media(hover:none){#tower-game .tg-style kbd{display:none}}
#tower-game .tg-looks{left:8px;bottom:6px;top:auto;gap:4px}
#tower-game button.tg-look{display:flex;align-items:center;gap:5px;min-height:44px;padding:4px 10px 4px 7px;border:2px solid transparent;border-radius:10px;background:#f6faf9;font:600 14px/1 'Source Sans 3',system-ui,sans-serif;color:#262d35;cursor:pointer}
@media(hover:hover){#tower-game button.tg-look:hover{background:#fff;border-color:#2d5750}}
#tower-game button.tg-look[aria-pressed=true]{background:#fff;border-color:#b34e0a;box-shadow:0 0 0 1px #b34e0a}
#tower-game .tg-look i{width:16px;height:16px;border-radius:4px;flex:none}
#tower-game .tg-look[data-look=grey] i{background:#5c6870}
#tower-game .tg-look[data-look=brick] i{background:#963a27}
#tower-game .tg-look[data-look=pride] i{background:linear-gradient(#7046a3 0 17%,#2672b8 17% 33%,#2b985b 33% 50%,#e8b52c 50% 67%,#e98434 67% 83%,#ce4742 83%)}
#tower-game .tg-note{position:absolute;inset:0;z-index:5;display:flex;align-items:center;justify-content:center;padding:8px;background:rgba(38,45,53,.45)}
#tower-game .tg-note[hidden]{display:none}
#tower-game .tg-card{display:flex;flex-direction:column;width:min(520px,100%);max-height:100%;padding:14px 18px 12px;border-radius:14px;background:#fff;box-shadow:0 10px 30px rgba(38,45,53,.3)}
#tower-game .tg-card h3{font:500 22px/1.1 'Newsreader',Georgia,serif;margin:0 0 6px}
#tower-game .tg-card .tg-steps{min-height:0;overflow:auto;touch-action:pan-y;margin:0 0 10px;padding:0;list-style:none;font-size:15px;line-height:1.35}
#tower-game .tg-card li{margin:0 0 7px}
#tower-game .tg-warn-text{margin:0 0 12px;font-size:17px;line-height:1.35}
#tower-game .tg-warn-row{display:flex;flex-wrap:wrap;justify-content:flex-end;gap:8px}
#tower-game .tg-turns{display:flex;align-items:center;gap:4px;float:right;margin:0 0 2px 8px;font-size:20px;color:#5a666e}
#tower-game .tg-turns img{width:58px;height:36px;object-fit:contain;display:block}
#tower-game button.tg-style.tg-suggested{background:#e6f4f6;border-color:#6ab5c0}
#tower-game button.tg-style.tg-suggested[aria-pressed=true]{background:#fff;border-color:#b34e0a}
#tower-game .tg-style.tg-suggested::after{content:'';position:absolute;top:4px;right:4px;width:9px;height:9px;border-radius:50%;background:#14808f}
#tower-game .tg-foot{display:flex;flex-wrap:wrap;align-items:center;gap:6px 8px;padding:4px 12px 12px 18px;order:5}
#tower-game .tg-hint{flex:1 1 240px;margin:0;font-size:15px;line-height:1.3;height:2.6em;overflow:hidden}
#tower-game .tg-btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;white-space:nowrap;min-height:44px;padding:8px 14px;border:1.5px solid #2d5750;border-radius:999px;background:#fff;color:#262d35;font:600 15px/1.2 'Source Sans 3',system-ui,sans-serif;cursor:pointer}
#tower-game .tg-btn svg{width:18px;height:18px;flex:none}
#tower-game .tg-close{min-width:44px;padding:8px 11px}
#tower-game .tg-sound .tg-ic-off{display:none}
#tower-game .tg-sound[aria-pressed=false] .tg-ic-on{display:none}
#tower-game .tg-sound[aria-pressed=false] .tg-ic-off{display:block}
#tower-game .tg-sound[aria-pressed=true],#tower-game .tg-sound[aria-pressed=true]:hover{background:#fff;border-color:#2d5750;color:#262d35}
@media(hover:hover){#tower-game .tg-sound[aria-pressed=true]:hover{background:#2d5750;color:#fff}}
#tower-game .tg-sound[aria-pressed=false]{background:#eef3f2;border-color:#7d9490;color:#4c5e72}
@media(hover:hover){#tower-game .tg-btn:hover:not(:disabled){background:#2d5750;color:#fff}}
#tower-game .tg-btn:disabled{opacity:.45;cursor:default}
#tower-game .tg-btn.tg-main{flex:0 0 5.4em;padding-left:4px;padding-right:4px;background:#b34e0a;border-color:#b34e0a;color:#fff}
#tower-game .tg-btn.tg-main:disabled{background:#fff;border-color:#2d5750;color:#262d35}
@media(hover:hover){#tower-game .tg-btn.tg-main:hover:not(:disabled){background:#8f3e07}}
#tower-game .tg-card .tg-btn.tg-main{align-self:flex-end;flex:none;padding:8px 16px}
#tower-game .tg-btn[aria-pressed=true]:not(.tg-sound),#tower-game .tg-btn[aria-pressed=true]:not(.tg-sound):hover{background:#14808f;border-color:#14808f;color:#fff}
#tower-game button:focus-visible{outline:3px solid #005a87;outline-offset:2px}
#tower-game .tg-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
@media(pointer:coarse){#tower-game button.tg-plan-pill{min-height:44px;padding:6px 13px}}
@media(max-width:760px){
  #tower-game .tg-head{padding:8px 10px 2px 12px;gap:6px}
  #tower-game .tg-bar{padding:2px 10px 4px 12px;gap:4px 8px}
  #tower-game .tg-plans{width:100%;padding-right:28px;scroll-padding-inline:16px;-webkit-mask-image:linear-gradient(to right,#000 93%,transparent);mask-image:linear-gradient(to right,#000 93%,transparent)}
  #tower-game .tg-status{width:100%;margin-left:0;justify-content:space-between;gap:6px}
  #tower-game .tg-toast{padding:6px 11px;font-size:13px;max-width:calc(100% - 196px)}
  #tower-game .tg-tray{grid-template-columns:repeat(5,minmax(0,1fr));padding:2px 8px}
  #tower-game .tg-foot{padding:4px 8px 8px}
  #tower-game .tg-hint{flex-basis:100%}
  #tower-game .tg-foot .tg-btn:not(.tg-main){padding:8px 10px;flex:1 1 auto}
  #tower-game .tg-plan{flex-direction:column}
  #tower-game .tg-again{flex-direction:column;align-items:flex-end}
  #tower-game .tg-over .tg-btn{padding:8px 11px}
}
@media(max-width:600px){
  #tower-game{border-radius:0;width:100vw;height:100dvh}
  #tower-game .tg-btn-text{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
  #tower-game #tg-photo{min-width:44px;padding:8px 11px}
  #tower-game button.tg-style{min-height:50px}
  #tower-game .tg-style img{height:26px}
  #tower-game .tg-meter-track{width:42px}
}
@media(max-width:360px){
  #tower-game button.tg-look{padding:4px 7px 4px 5px}
  #tower-game .tg-foot .tg-btn:not(.tg-main){padding:8px 6px}
  #tower-game button.tg-style{min-height:44px}
  #tower-game .tg-style img{height:22px}
  #tower-game .tg-style small{display:none}
  #tower-game .tg-hint{font-size:14px}
  #tower-game .tg-meter-track{width:34px}
}
@media(max-height:480px){
  #tower-game{border-radius:0;width:100vw;height:100dvh}
  #tower-game .tg-card{padding:8px 14px}#tower-game .tg-card h3{font-size:18px;margin-bottom:3px}#tower-game .tg-card .tg-steps{font-size:14px;line-height:1.25;margin-bottom:5px}#tower-game .tg-card li{margin-bottom:3px}#tower-game .tg-turns img{height:24px;width:40px}
  #tower-game .tg-wrap{display:grid;grid-template-columns:1fr min(360px,48vw);grid-template-rows:1fr}
  #tower-game .tg-field{grid-column:1;grid-row:1;min-height:0}
  #tower-game .tg-panel{display:flex;flex-direction:column;grid-column:2;grid-row:1;min-height:0;overflow-y:auto;overscroll-behavior:contain;touch-action:pan-y;padding-bottom:6px;border-left:1px solid #c9dcd7}
  #tower-game .tg-head{padding:6px 8px 2px 10px;gap:6px;flex-wrap:wrap}
  #tower-game h2{font-size:18px}
  #tower-game .tg-btn-text{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
  #tower-game #tg-photo{min-width:44px;padding:8px 11px}
  #tower-game .tg-bar{padding:2px 8px 4px 10px;gap:4px}
  #tower-game .tg-bar .tg-plans{width:100%;padding-right:20px}
  #tower-game .tg-bar .tg-status{width:100%;margin-left:0;justify-content:space-between;gap:6px}
  #tower-game .tg-plan{flex-direction:column}
  #tower-game .tg-again{flex-direction:column;align-items:flex-end}
  #tower-game .tg-over .tg-btn{padding:8px 11px;min-height:44px}
  #tower-game .tg-tray{grid-template-columns:repeat(5,minmax(0,1fr));padding:4px 8px 4px 10px}
  #tower-game button.tg-style{min-height:44px}#tower-game .tg-style img{height:20px}#tower-game .tg-style small{display:none}
  #tower-game .tg-foot{padding:4px 8px 8px 10px;gap:6px}#tower-game .tg-foot .tg-btn:not(.tg-main){padding:8px 10px;flex:1 1 auto}#tower-game .tg-hint{flex:1 1 100%;font-size:14px;height:auto;min-height:2.4em}
}
@media(prefers-reduced-motion:reduce){
  #tower-game .tg-prog-fill,#tower-game .tg-meter-fill,#tower-game .tg-toast,#tower-game .tg-style img{transition:none}
}
`,N_=document.currentScript?.src||location.href,Rh=null;function Ih(){return Rh??=new Promise((i,t)=>{let e=document.createElement("script");e.src=new URL("physics.bundle.js",N_).href,e.onload=()=>i(window.CANNON),e.onerror=()=>{Rh=null,t(new Error("The physics file did not load"))},document.head.appendChild(e)}),Rh}var oo=i=>Math.max(0,Math.min(1,i)),Dl=i=>{let t=oo(i);return t*t*(3-2*t)},dn=matchMedia("(prefers-reduced-motion: reduce)"),fi=matchMedia("(pointer: coarse)"),ln=.3,Xi=.09,be={};for(let[i,t]of[[1,1],[1,2],[1,4],[2,2],[2,3],[2,4]])be[`b${i}x${t}`]={nx:t,nz:i,plates:3,size:`${i}\xD7${t}`,word:"brick",label:`${i} by ${t} brick`};for(let[i,t]of[[1,1],[1,2],[2,2],[2,4]])be[`p${i}x${t}`]={nx:t,nz:i,plates:1,size:`${i}\xD7${t}`,word:"plate",label:`${i} by ${t} plate`};var er=Object.keys(be),Dh=i=>String((i+1)%10),U_={grey:"Grey",brick:"Brick",pride:"Pride"},Ph=["#8e3524","#963a27","#833022","#9c432c","#8a3828","#7b2d20","#984631"],Qd=i=>Wi[Math.ceil(i/3)%Wi.length],Lh=-1e3,js=80,ui=-8,di=7,Nl=48,tf=400,Xe=(i,t)=>t?[be[i].nz,be[i].nx]:[be[i].nx,be[i].nz],Qs=i=>be[i].nx===be[i].nz,Ul=i=>.15+ln*i,F_='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>',O_='<svg class="tg-ic-on" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg><svg class="tg-ic-off" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>',st,tr;function B_(){let i=document.createElement("style");i.textContent=D_,document.head.appendChild(i);let t=document.createElement("dialog");t.id="tower-game",t.setAttribute("aria-labelledby","tg-title");let e=er.map((c,l)=>`<button type="button" class="tg-style" data-type="${c}" aria-pressed="false" aria-label="${be[c].label}" aria-keyshortcuts="${Dh(l)}"><kbd>${Dh(l)}</kbd><img alt=""><span>${be[c].size}</span><small>${be[c].word}</small></button>`).join(""),n=Object.entries(U_).map(([c,l])=>`<button type="button" class="tg-look" data-look="${c}" aria-pressed="false"><i></i>${l}</button>`).join(""),s=Ll.map(c=>`<button type="button" class="tg-plan-pill" data-plan="${c.id}" aria-pressed="${c.id==="free"}">${c.name}</button>`).join(""),r=fi.matches?"tap":"click",o=["<strong>Pick a blueprint or build freely</strong> from the row at the top. Faint ghosts show the whole build, teal studded outlines show the next layer, and your preview turns green on an exact match.",`<strong>Pick a brick</strong> from the row below${fi.matches?"":", or press its number: 1 to 9, then 0 for the tenth"}. Bricks highlighted in teal fit the next layer.`,`<strong>Point and ${r}.</strong> ${fi.matches?"Drag first to see a copy of the brick where it will land; a plain tap places it at once.":"A copy of the brick shows where it will land."} You can always build off-plan; off-plan bricks get a subtle amber cue while Hints is on.`,`<span class="tg-turns" aria-hidden="true"><img id="tg-turn-a" alt="">\u21BB<img id="tg-turn-b" alt=""></span><strong>Rotate${fi.matches?"":" (or R)"}</strong> turns the brick a quarter turn before you place it. <strong>View${fi.matches?"":" (or T)"}</strong> turns the whole tower.`,"<strong>Grey, Brick and Pride</strong> set the look of your next bricks. <strong>Topple</strong> knocks the tower down for fun; <strong>Undo</strong> snaps it straight back.","<strong>Done</strong> launches a pride-stripe celebration, and <strong>Save photo</strong> downloads a postcard of your build."].map(c=>`<li>${c}</li>`).join("");t.innerHTML=`<div class="tg-wrap">
    <div class="tg-panel">
      <div class="tg-head"><h2 id="tg-title">Build the tower</h2>
        <div class="tg-head-actions">
          <button type="button" class="tg-btn" id="tg-photo" aria-label="Save photo of your tower" disabled>${F_}<span class="tg-btn-text">Save photo</span></button>
          <button type="button" class="tg-btn tg-close tg-sound" id="tg-sound" aria-pressed="true" aria-label="Sound on" title="Toggle sound effects">${O_}</button>
          <button type="button" class="tg-btn tg-close" id="tg-help" aria-label="How to play">?</button>
          <button type="button" class="tg-btn tg-close" id="tg-close" aria-label="Close the game">\u2715</button>
        </div>
      </div>
      <div class="tg-bar">
        <div class="tg-plans" id="tg-plans" role="group" aria-label="Choose a blueprint">${s}</div>
        <div class="tg-status">
          <span class="tg-count" id="tg-count">0 bricks</span>
          <span class="tg-prog" id="tg-prog" hidden><span class="tg-prog-track" aria-hidden="true"><span class="tg-prog-fill" id="tg-prog-fill"></span></span><span id="tg-prog-text">0 / 0</span></span>
          <span class="tg-offplan" id="tg-offplan" hidden></span>
          <div class="tg-meter" id="tg-stability" role="meter" aria-label="Tower stability" aria-valuemin="0" aria-valuemax="100" aria-valuenow="100" aria-valuetext="Solid, 100%" data-state="solid">
            <span class="tg-meter-track" aria-hidden="true"><span class="tg-meter-fill" id="tg-stability-fill"></span></span>
            <span id="tg-stability-text">Solid</span>
          </div>
        </div>
      </div>
      <div class="tg-tray" id="tg-tray" role="group" aria-label="Choose a brick">${e}</div>
      <div class="tg-foot"><p class="tg-hint" id="tg-hint"></p>
        <button type="button" class="tg-btn" id="tg-rotate" aria-label="Rotate the brick">Rotate</button>
        <button type="button" class="tg-btn" id="tg-view" aria-label="Turn the view">View</button>
        <button type="button" class="tg-btn" id="tg-undo">Undo</button>
        <button type="button" class="tg-btn" id="tg-hints" aria-pressed="false" aria-label="Show blueprint hints">Hints</button>
        <button type="button" class="tg-btn tg-main" id="tg-done">Done</button></div>
    </div>
    <div class="tg-field"><div class="tg-stage" id="tg-stage" tabindex="0" role="application" aria-label="Building area. Number keys choose a brick, arrow keys move it, R rotates it, T turns the view, Enter places it."><canvas id="tg-canvas" aria-hidden="true"></canvas></div>
      <div class="tg-toast" id="tg-toast" hidden aria-hidden="true"><span class="tg-toast-dot"></span><span id="tg-toast-text"></span></div>
      <div class="tg-over tg-plan" id="tg-plan" hidden><button type="button" class="tg-btn" id="tg-next" title="Places the next brick of the chosen blueprint" aria-label="Place next brick of the blueprint">Place next</button>
      <button type="button" class="tg-btn" id="tg-finish" title="Builds the rest of the chosen blueprint. Undo takes it all back" aria-label="Build rest of the blueprint">Build rest</button></div>
      <div class="tg-over tg-again"><button type="button" class="tg-btn" id="tg-topple" title="Knock your tower down with physics. Undo puts it straight back" disabled>Topple</button><button type="button" class="tg-btn" id="tg-restart">Start again</button></div>
      <div class="tg-over tg-looks" id="tg-looks" role="group" aria-label="Look of your next bricks">${n}</div></div>
    <div class="tg-sr" role="status" aria-live="polite" id="tg-live"></div></div>
    <div class="tg-note" id="tg-note" hidden><div class="tg-card" role="group" aria-labelledby="tg-note-title"><h3 id="tg-note-title">How to play</h3><ul class="tg-steps" id="tg-steps" tabindex="0">${o}</ul><button type="button" class="tg-btn tg-main" id="tg-note-go">Start building</button></div></div>
    <div class="tg-note" id="tg-warn" hidden><div class="tg-card" role="alertdialog" aria-modal="true" aria-labelledby="tg-warn-title" aria-describedby="tg-warn-text"><h3 id="tg-warn-title">Careful</h3><p class="tg-warn-text" id="tg-warn-text">Placing it here would bring FORRT down. We only build on solid foundations.</p><div class="tg-warn-row"><button type="button" class="tg-btn" id="tg-warn-anyway">Place it anyway</button><button type="button" class="tg-btn tg-main" id="tg-warn-go">Move it</button></div></div></div>`,document.body.appendChild(t);let a=c=>t.querySelector("#"+c);return{d:t,canvas:a("tg-canvas"),stage:a("tg-stage"),tray:a("tg-tray"),count:a("tg-count"),hint:a("tg-hint"),rotate:a("tg-rotate"),view:a("tg-view"),next:a("tg-next"),plan:a("tg-plan"),restart:a("tg-restart"),topple:a("tg-topple"),undo:a("tg-undo"),hints:a("tg-hints"),finish:a("tg-finish"),done:a("tg-done"),close:a("tg-close"),live:a("tg-live"),photo:a("tg-photo"),sound:a("tg-sound"),prog:a("tg-prog"),progFill:a("tg-prog-fill"),progText:a("tg-prog-text"),offplan:a("tg-offplan"),stability:a("tg-stability"),stabilityFill:a("tg-stability-fill"),stabilityText:a("tg-stability-text"),toast:a("tg-toast"),toastText:a("tg-toast-text"),planPills:[...t.querySelectorAll(".tg-plan-pill")],styles:[...t.querySelectorAll(".tg-style")],looks:[...t.querySelectorAll(".tg-look")],wrap:t.querySelector(".tg-wrap"),note:a("tg-note"),noteGo:a("tg-note-go"),help:a("tg-help"),warn:a("tg-warn"),warnGo:a("tg-warn-go"),warnAnyway:a("tg-warn-anyway")}}function z_(){let i=new El({canvas:st.canvas,antialias:!0,alpha:!0,stencil:!0});i.setPixelRatio(Math.min(window.devicePixelRatio||1,1.75)),i.outputColorSpace=un,i.toneMapping=Xr,i.toneMappingExposure=1.05,i.shadowMap.enabled=!0,i.shadowMap.type=as;let t=new Fs,e=new Si(-3.7,3.7,3,-3,.1,60);t.add(new Gs(16777215,9143161,1.75));let n=new Fi(16776182,3.5);n.position.set(-3,11,6),n.castShadow=!0,n.shadow.mapSize.set(2048,2048),n.shadow.camera.left=-8,n.shadow.camera.right=8,n.shadow.camera.top=8,n.shadow.camera.bottom=-8,n.shadow.camera.near=.5,n.shadow.camera.far=30,n.shadow.normalBias=.035,n.shadow.bias=-4e-4,n.shadow.radius=3,n.shadow.intensity=.6,t.add(n);let s=new Fi(15988735,1.25);s.position.set(6,4,-2),t.add(s);let r=new Fi(16777215,1.2);r.position.set(-3,5,-5),t.add(r);let{model:o,brickGeometry:a,stones:c,foundationTop:l}=$d();t.add(o);let u=new Ke;t.add(u);let f=new De(new os(60,60),new kr({opacity:.18}));f.rotation.x=-Math.PI/2,f.position.y=-.035,f.receiveShadow=!0,t.add(f);let h=Zd(),d=Jd(t,dn),g=new O(0,1,0),v=y=>y.object.children[0],p={},m={},w={};for(let y of er){let T=be[y],k=T.nx*ln,F=T.plates*Xi,B=T.nz*ln;p[y]=a(k,F,B),m[y]=new Pn(k-.014,F-.014,B-.014),w[y]=new Ir(m[y])}let R=di-ui+1,b=(y,T)=>(y-ui)*R+(T-ui),A=new Int16Array(R*R).fill(Lh);for(let y=-4;y<=3;y++)for(let T=-4;T<=3;T++)A[b(y,T)]=0;let S=A.slice(),I=new Array(R*R).fill(null),x=Array.from({length:R*R},()=>[]),E=.048,D=.007,P=y=>l+y*Xi,V=(y,T,k,F,B)=>{for(let tt=y;tt<y+k;tt++)for(let et=T;et<T+F;et++)B(b(tt,et))},q=(y,T,k,F)=>y>=ui&&T>=ui&&y+k-1<=di&&T+F-1<=di;function N(y,T,k,F){let[B,tt]=Xe(y,F);if(!q(T,k,B,tt))return null;let et=Lh,At=0;return V(T,k,B,tt,vt=>{S[vt]>et?(et=S[vt],At=1):S[vt]===et&&At++}),et===Lh||et+be[y].plates>Nl?null:{level:et,studs:At}}let z=(y,T,k,F,B)=>{let[tt,et]=Xe(y,F);return{x:Ul(T+(tt-1)/2),z:Ul(k+(et-1)/2),y:P(B)+be[y].plates*Xi/2,floor:P(B),rotY:F?Math.PI/2:0}},Z=(y,T,k,F,B)=>({type:y,i:T,j:k,rot:F,level:B.level,studs:B.studs,...z(y,T,k,F,B.level)});function L(y,T,k,F,B){let[tt,et]=Xe(y,F),At=new Map,vt=0,qt=0,jt=0,de=1/0,qe=-1/0,Ve=1/0,Ye=-1/0;for(let Rn=T;Rn<T+tt;Rn++)for(let pi=k;pi<k+et;pi++){let ur=b(Rn,pi);if(S[ur]!==B)continue;let $e=I[ur];$e&&At.set($e,(At.get($e)||0)+1),vt++,qt+=Rn+.5,jt+=pi+.5,de=Math.min(de,Rn),qe=Math.max(qe,Rn+1),Ve=Math.min(Ve,pi),Ye=Math.max(Ye,pi+1)}return{under:At,studs:vt,x:qt/vt,z:jt/vt,hx:(qe-de)/2,hz:(Ye-Ve)/2,mass:tt*et*be[y].plates,cx:T+tt/2,cz:k+et/2}}let Q=null;function Y(y){let T=new Map,k=0;Q=null;let F=B=>{let tt=T.get(B),et=B.mass+(tt?tt.w:0),At=B.mass*B.cx+(tt?tt.mx:0),vt=B.mass*B.cz+(tt?tt.mz:0),qt=Math.hypot(Math.max(0,Math.abs(At/et-B.x)-B.hx),Math.max(0,Math.abs(vt/et-B.z)-B.hz)),jt=et*qt/B.studs;jt>k&&(k=jt,Q=B);for(let[de,qe]of B.under){let Ve=qe/B.studs,Ye=T.get(de.hold)||{w:0,mx:0,mz:0};Ye.w+=et*Ve,Ye.mx+=At*Ve,Ye.mz+=vt*Ve,T.set(de.hold,Ye)}};y&&F(y);for(let B=ht.length-1;B>=0;B--)F(ht[B].hold);return k}let $=y=>Y(L(y.type,y.i,y.j,y.rot,y.level))>js;function nt(y){if(y>js)return{pct:0,state:"wobbly",label:"Too wobbly"};let T=Math.max(1,Math.min(100,Math.round(100*(1-y/js))));return T<25?{pct:T,state:"risky",label:`Risky ${T}%`}:T<60?{pct:T,state:"leaning",label:`Leaning ${T}%`}:{pct:T,state:"solid",label:`Solid ${T}%`}}let mt=[],ht=[],Qt=()=>mt.filter(y=>y.state==="placed").length,Rt=()=>ht.reduce((y,T)=>Math.max(y,T.cell.level+be[T.type].plates),0),Kt=()=>Math.ceil(Rt()/3),rt=new An({color:"#14808f",emissive:"#0c4f59",emissiveIntensity:.22,roughness:.42,metalness:.02,transparent:!0,opacity:.62,depthWrite:!1,depthTest:!0}),ut=new An({color:"#1e8899",roughness:.45,metalness:.02,transparent:!0,opacity:.42,depthWrite:!1,depthTest:!0}),Mt=new An({color:"#2b8a99",roughness:.48,metalness:.02,transparent:!0,opacity:.28,depthWrite:!1,depthTest:!0}),Bt=new An({color:"#4f9aa6",roughness:.55,metalness:0,transparent:!0,opacity:.11,depthWrite:!1,depthTest:!0}),Dt=new Wn({color:"#064b54",transparent:!0,opacity:.95,depthTest:!1}),ie=new Wn({color:"#0b5a65",transparent:!0,opacity:.72,depthTest:!1}),Me=new Wn({color:"#0e616d",transparent:!0,opacity:.48,depthTest:!1}),ft=new Wn({color:"#3b7a85",transparent:!0,opacity:.24,depthTest:!0}),gt=new Wn({color:"#c96a08",transparent:!0,opacity:.78,depthTest:!1}),lt=[],pt="free",Et="castle",Yt=!1;function Zt(y){for(let F of lt)u.remove(F.hint);lt.length=0;for(let F of ht)F.slot=null;let k=(hi[y]||hi.free).build();for(let F of k){let B={...F,filled:null},tt=z(B.type,B.i,B.j,B.rot,B.level);B.hint=new Ke,B.hint.position.set(tt.x,tt.y,tt.z),B.hint.rotation.y=tt.rotY,B.hint.visible=!1,B.body=new De(p[B.type],Mt),B.body.renderOrder=3,B.line=new is(w[B.type],Me),B.line.renderOrder=4,B.hint.add(B.body,B.line),u.add(B.hint),lt.push(B)}for(let F of lt){let[B,tt]=Xe(F.type,F.rot);F.needs=lt.filter(et=>{if(et.level>=F.level)return!1;let[At,vt]=Xe(et.type,et.rot);return et.i<F.i+B&&F.i<et.i+At&&et.j<F.j+tt&&F.j<et.j+vt})}for(let F of ht){let B=lt.find(tt=>!tt.filled&&tt.type===F.type&&tt.i===F.cell.i&&tt.j===F.cell.j&&tt.rot===F.cell.rot&&tt.level===F.cell.level);B&&(B.filled=F,F.slot=B)}Yt=lt.length>0&&lt.every(F=>F.filled)}let ee=y=>{let T=N(y.type,y.i,y.j,y.rot);return!T||T.level>y.level},te=y=>lt.filter(T=>{if(T.filled||y&&T.type!==y||!T.needs.every(F=>F.filled||ee(F)))return!1;let k=N(T.type,T.i,T.j,T.rot);return k&&k.level===T.level&&Y(L(T.type,T.i,T.j,T.rot,T.level))<=js}),U=(y,T,k)=>y==="pride"?Qd(k):y==="brick"?Ph[T%Ph.length]:c[T%c.length].color;function Se(y,T){y.stone.set(U(y.look,y.shade,T)),y.material.color.copy(y.stone)}let ue=()=>mt.length*3+1;function C(y,T=j){let k=new Ke,F=ue(),B=c[F%c.length].clone(),tt=new De(p[y],B);tt.castShadow=!0,tt.receiveShadow=!0,k.add(tt);let et=new is(w[y],gt);et.visible=!1,et.renderOrder=5,et.raycast=()=>{},k.add(et),k.name=be[y].label,o.add(k);let At={object:k,offLine:et,type:y,look:T,shade:F,state:"flying",material:B,stone:new oe,pride:new oe,slot:null,cell:null,rest:new O};return mt.push(At),At}function _(y){o.remove(y.object),y.material.dispose(),mt.splice(mt.indexOf(y),1)}let H="b1x2",j="grey",ot=0,yt=0,xt=!1,K=!1,ct=()=>Qs(H)?0:ot,bt=new Ke;bt.visible=!1,u.add(bt);let Vt=c[0].clone();Vt.transparent=!0;let It=new De(p[H],Vt),Ct=new is(w[H],new Wn({color:"#ff8a1f",transparent:!0,depthTest:!1,toneMapped:!1})),Ht=new De(p[H],new ri({colorWrite:!1,transparent:!0,depthWrite:!1,depthTest:!1,stencilWrite:!0,stencilFunc:vl,stencilRef:1,stencilZPass:eh})),$t=new De(m[H],new ri({color:"#ff8a1f",side:tn,transparent:!0,depthWrite:!1,depthTest:!1,toneMapped:!1,stencilWrite:!0,stencilFunc:nh,stencilRef:1}));Ht.renderOrder=4,$t.renderOrder=5,It.renderOrder=6,Ct.renderOrder=7,bt.add(Ht,$t,It,Ct);function ae(){let y=xt&&!K&&!Xt&&pt!=="free"&&lt.length>0,T=y?te():[],k=new Set(T),F=ct();for(let B of lt){if(!y||B.filled){B.hint.visible=!1;continue}if(k.has(B)){let tt=B.type===H,et=Qs(B.type)||B.rot===F;B.hint.visible=!0,B.body.material=tt?et?rt:ut:Mt,B.line.material=tt?et?Dt:ie:Me,B.body.renderOrder=3,B.line.renderOrder=4}else ee(B)?B.hint.visible=!1:(B.hint.visible=!0,B.body.material=Bt,B.line.material=ft,B.body.renderOrder=2,B.line.renderOrder=2)}for(let B of mt)B.offLine&&(B.offLine.visible=y&&B.state==="placed"&&!B.slot);for(let B of st.styles)B.classList.toggle("tg-suggested",T.some(tt=>tt.type===B.dataset.type));return Ie=!0,T}let W=new O(7.4,10.6,10.2),Pt=new O(0,2.5,0),at={width:1,height:1,scale:1},St={l:-3,r:3,t:3,b:-3},Lt=0,dt=!1;function Wt(){e.position.copy(W).applyAxisAngle(g,Lt),e.lookAt(Pt),e.updateMatrixWorld(!0)}function kt(){let y=at.height<480?P(0)-.75:-.035,T=1.56,k=at.height<480?9:13;for(let $e of ht){let[Yl,$l]=Xe($e.type,$e.cell.rot),Yh=z($e.type,$e.cell.i,$e.cell.j,$e.cell.rot,$e.cell.level);T=Math.max(T,Math.ceil((Math.max(Math.abs(Yh.x)+Yl*.15,Math.abs(Yh.z)+$l*.15)+ln)/.6)*.6),k=Math.max(k,Math.min(Nl,Math.ceil(($e.cell.level+be[$e.type].plates+9)/6)*6))}let F=new ii(new O(-T,y,-T),new O(T,P(k)+.06,T)),B=e.matrixWorldInverse,tt=new O,et=1/0,At=-1/0,vt=1/0,qt=-1/0;for(let $e of[F.min.x,F.max.x])for(let Yl of[F.min.y,F.max.y])for(let $l of[F.min.z,F.max.z])tt.set($e,Yl,$l).applyMatrix4(B),et=Math.min(et,tt.x),At=Math.max(At,tt.x),vt=Math.min(vt,tt.y),qt=Math.max(qt,tt.y);for(let $e of mt)$e.state==="debris"&&(tt.copy($e.object.position).applyMatrix4(B),et=Math.min(et,tt.x-.8),At=Math.max(At,tt.x+.8),vt=Math.min(vt,tt.y-.8),qt=Math.max(qt,tt.y+.8));let jt=1.03,de=at.width/at.height,qe=at.width<=600&&at.height>260?(qt-vt)*.11:0,Ve=vt-qe,Ye=Math.max((qt-Ve)/2,(At-et)/2/de)*jt,Rn=Ye*de,pi=(et+At)/2,ur=(qt+Ve)/2;return{l:pi-Rn,r:pi+Rn,t:ur+Ye,b:ur-Ye}}function Te(){e.left=St.l,e.right=St.r,e.top=St.t,e.bottom=St.b,e.updateProjectionMatrix(),at.scale=at.height/(St.t-St.b),Ie=!0}function ye(){Object.assign(St,kt()),Te()}function en(){let{width:y,height:T}=st.stage.getBoundingClientRect();!y||!T||(i.setSize(y,T,!1),at.width=y,at.height=T,Wt(),ye())}let yn=y=>{let T=y.clone().project(e);return{x:(T.x+1)/2*at.width,y:(1-T.y)/2*at.height}},qi=y=>{let T=st.canvas.getBoundingClientRect();return{x:y.clientX-T.left,y:y.clientY-T.top}},nr=new Wr,ao=new Tt;function ds(y){return nr.setFromCamera(ao.set(y.x/at.width*2-1,1-y.y/at.height*2),e),nr.ray}function Fl(y,T,k,F,B){let tt=b(y,T),At=Math.hypot(k-Ul(y),B-Ul(T))<=.087?E:-D;if(A[tt]===0&&F<=P(0)+At)return!0;for(let[vt,qt]of x[tt])if(F>=P(vt)&&F<=P(qt)+At)return!0;return!1}function fs(y){let{origin:T,direction:k}=ds(y),F=(P(Nl)+.06-T.y)/k.y,B=(P(0)-.12-T.y)/k.y;for(let tt=F;tt<=B;tt+=.015){let et=T.x+k.x*tt,At=T.z+k.z*tt,vt=Math.floor(et/ln),qt=Math.floor(At/ln);if(q(vt,qt,1,1)&&Fl(vt,qt,et,T.y+k.y*tt,At))return{i:vt,j:qt}}return null}let lo=34,Zn=60,ir=10,co=fi.matches?10:6,ho=60,Jn=y=>_t&&Math.hypot(y.x-_t.x,y.y-_t.y)<=co;function Un(y){if(Jn(y)){let T=ct(),[k,F]=Xe(H,T);if(q(_t.i,_t.j,k,F)){let B=N(H,_t.i,_t.j,T);return B?Z(H,_t.i,_t.j,T,B):null}}return Yi(y)}function Yi(y){let T=H,k=ct(),[F,B]=Xe(T,k),tt=(jt,de,qe)=>{let Ve=z(T,jt,de,k,qe.level);return yn(new O(Ve.x,Ve.floor,Ve.z))},et=null,At=1/0,vt=(jt,de)=>{let qe=N(T,jt,de,k);if(!qe)return;let Ve=tt(jt,de,qe),Ye=Math.hypot(Ve.x-y.x,Ve.y-y.y);Ye<At&&(At=Ye,et={i:jt,j:de,r:qe})},qt=fs(y);if(qt)for(let jt=qt.i-F+1;jt<=qt.i;jt++)for(let de=qt.j-B+1;de<=qt.j;de++)vt(jt,de);if(et)return Z(T,et.i,et.j,k,et.r);for(let jt=ui;jt<=di;jt++)for(let de=ui;de<=di;de++)vt(jt,de);return et&&At<=lo?Z(T,et.i,et.j,k,et.r):null}let Ie=!0,cn=!1,$i=0,ps=0,ge=null,hn=null,vn=null,M="solid",G=!1,it=!1,X=null,J=null,wt=null,Ft=0,_t=null,zt=-1e3,Gt=0,ce=0,Jt=new Set,Ot=new Set,_e=new Set,Xt=!1,he=!1,re=null,ze=0,Ut=null,Oe=null,me=0,Be=0,Ee={refused:0,toppled:0,misses:0,drops:0,undos:0,lost:0,frames:0,rotates:0,turns:0,keyboard:0,photos:0,milestones:0},Ae=y=>{st.live.textContent=y};function Fn(y,T=!1){clearTimeout(Gt),st.toastText.textContent=y,st.toast.classList.toggle("tg-toast-plan",T),st.toast.hidden=!1,Gt=setTimeout(()=>{st.toast.hidden=!0},3400)}function ve(){clearTimeout(Gt),st.toast.hidden=!0}function Pe(y){let T=ht.length===0&&!vn?{pct:100,state:"solid",label:"Solid"}:nt(y);return st.stability.dataset.state=T.state,st.stability.setAttribute("aria-valuenow",String(T.pct)),st.stability.setAttribute("aria-valuetext",`${T.label}`),st.stabilityFill.style.width=`${T.pct}%`,st.stabilityText.textContent=T.label,T}let Kn="Too wobbly here: a brick in this spot would bring the tower down.",Ce=y=>Dh(er.indexOf(y)),On=(y,T,k,F,B,tt,et,At)=>y<B+et&&B<y+k&&T<tt+At&&tt<T+F,Cn=!1,sr="free";function rf(y){if(!y||pt==="free"||!lt.length||!xt)return{kind:"free",slot:null};let T=te(),k=T.find(vt=>vt.type===y.type&&vt.i===y.i&&vt.j===y.j&&vt.rot===y.rot&&vt.level===y.level);if(k)return{kind:"exact",slot:k};let[F,B]=Xe(y.type,y.rot),tt=be[y.type].plates,et=null,At=null;for(let vt of T){let[qt,jt]=Xe(vt.type,vt.rot);if(!On(y.i,y.j,F,B,vt.i,vt.j,qt,jt))continue;let de=be[vt.type].plates;if(vt.level===y.level&&vt.type===y.type&&!Qs(vt.type)&&vt.rot!==y.rot){et=vt;break}!At&&vt.level<y.level+tt&&vt.level+de>y.level&&(At=vt)}return et?{kind:"rotate",slot:et}:At?{kind:"blocks",slot:At}:{kind:"free",slot:null}}let Nh=()=>{let y=hi[pt],T=xt&&lt.length?te():[];return pt!=="free"&&xt&&T.length?`${y.name}: teal studded shapes show the next layer; green preview means an exact match. Free play is always open.`:pt!=="free"&&lt.length&&lt.every(k=>k.filled)?`${y.name} complete. Press Done for the pride-stripe parade, or pick another blueprint.`:pt!=="free"&&xt?`Your build has covered the rest of ${y.name}, or left it too wobbly. Keep freestyling, or undo to adjust.`:fi.matches?"Pick a brick, then tap the tower. Drag to aim, and turn bricks with Rotate.":"Press 1 to 9 or 0 for a brick, then click the tower. R rotates the brick and T turns the view."};function Ne(){let y=Qt(),T=Kt();st.count.textContent=y===0?"0 bricks":`${y===1?"1 brick":`${y} bricks`} \xB7 ${T} high`;let k=pt!=="free"&&lt.length>0,F=k?lt.filter(qt=>qt.filled&&qt.filled.state==="placed").length:0,B=k?ht.filter(qt=>qt.state==="placed"&&!qt.slot).length:0,tt=k&&F===lt.length,et=mt.some(qt=>qt.state==="debris");st.prog.hidden=!k,k&&(st.progText.textContent=`${F} / ${lt.length}`,st.progFill.style.width=`${Math.round(F/lt.length*100)}%`,st.prog.classList.toggle("tg-prog-done",tt));let At=k&&xt&&!K&&!Xt&&B>0;st.offplan.hidden=!At,At&&(st.offplan.textContent=`${B} off plan`,st.offplan.title=`${B===1?"1 brick":`${B} bricks`} placed outside the blueprint. Undo adjusts it, or keep building freely.`);for(let qt of st.planPills)qt.setAttribute("aria-pressed",String(qt.dataset.plan===pt));st.hints.setAttribute("aria-pressed",String(xt&&k)),st.done.textContent=K?"Build on":"Done",st.done.setAttribute("aria-label",K?"Build on":"Done building"),st.done.disabled=Xt||!ht.length&&!K,st.undo.disabled=he||!ht.length&&!wt,st.restart.disabled=!ht.length&&!et,st.topple.disabled=Xt||he||!ht.length,st.photo.disabled=Xt||he||!y||Jt.size>0,st.plan.hidden=!(xt&&k&&!K&&!tt);let vt=ae();st.next.disabled=st.finish.disabled=Xt||!vt.length,vn||Pe(Y()),!K&&!ge&&!Xt&&(st.hint.textContent=Nh()),Ie=!0}function uo(y,T=!0){if(!hi[y])return;let k=pt!==y;if(k){K&&ms();for(let F of Jt)F.part.finishing=!1,F.part.finishPlan=null;for(let F of ht)F.finishing=!1,F.finishPlan=null}if(pt=y,y!=="free"?(Et=y,xt=!0):xt=!1,Zt(y),k&&T&&(h.pick(),st.planPills.find(B=>B.dataset.plan===y)?.scrollIntoView?.({inline:"center",block:"nearest",behavior:dn.matches?"auto":"smooth"})),Ne(),Bn(),T){let F=hi[y],B=y==="free"?"Free build selected. Build anything you like.":ht.length?`${F.name} blueprint selected (${lt.length} bricks). Start again for a clear deck, or build on top.`:`${F.name} selected: ${F.summary}`;!K&&!Xt&&(st.hint.textContent=B),Ae(B)}}function rr(y,T=!1){H=y;for(let k of st.styles)k.setAttribute("aria-pressed",String(k.dataset.type===y));It.geometry=Ht.geometry=p[y],Ct.geometry=w[y],$t.geometry=m[y],fo(),st.rotate.disabled=Qs(y),T&&h.pick(),Ne(),Bn()}function Uh(y){j=y;for(let T of st.looks)T.setAttribute("aria-pressed",String(T.dataset.look===y));for(let T of st.styles)T.querySelector("img").src=xo[y][T.dataset.type];Bn()}function fo(){for(let y of st.styles)y.classList.toggle("tg-flip",!Qs(y.dataset.type)&&(ot+yt)%2===1)}function Ol(){Qs(H)||(ot=1-ot,Ee.rotates++,h.rotate(),fo(),ae(),Bn(),!K&&!ge&&!Cn&&(st.hint.textContent="Brick rotated. The pictures below show which way it now runs."),Ae(ot?"Brick rotated.":"Brick rotated back."))}function nn(y){vn=y,bt.visible=!!y;let T=!1,k=!1,F=null,B=rf(y);if(sr=B.kind,y){let tt=Y(L(y.type,y.i,y.j,y.rot,y.level)),et=Pe(tt);M=et.state,T=et.state==="wobbly",k=et.state==="risky",bt.position.set(y.x,y.y,y.z),bt.rotation.y=y.rotY,Vt.color.set(T?"#e01414":U(j,ue(),y.level)),Vt.opacity=T?.6:1;let At=T?"#e01414":k?"#d97706":B.kind==="exact"?"#2b7a4b":B.kind==="blocks"?"#c96a08":"#ff8a1f",vt=be[y.type],qt=2.5/at.scale*2,jt=de=>de-.014;if(Ct.material.color.set(At),$t.material.color.set(At),$t.scale.set((jt(vt.nx*ln)+qt)/jt(vt.nx*ln),(jt(vt.plates*Xi)+qt)/jt(vt.plates*Xi),(jt(vt.nz*ln)+qt)/jt(vt.nz*ln)),T&&!it&&h.creak(),T)F=Kn;else if(B.kind==="exact"){let de=fi.matches?"Tap":"Click";F=`Matches ${hi[pt].name}: ${de.toLowerCase()} to snap this ${vt.label} into place.`}else if(B.kind==="rotate")F=`Almost fits: press ${fi.matches?"Rotate":"R (or Rotate)"} to align this ${be[B.slot.type].label} with the outline.`;else if(B.kind==="blocks"){let de=be[B.slot.type],qe=fi.matches?"":` (key ${Ce(B.slot.type)})`;F=`Blueprint wants a ${de.label}${qe} here. Place anyway to freestyle.`}}else M="solid",Pe(Y());it=T,G=T||k,st.canvas.style.cursor=T?"not-allowed":"",F?(st.hint.textContent=F,Cn=!0):Cn&&(Cn=!1,!K&&!Xt&&(st.hint.textContent=Nh())),Ie=!0}function Bn(){K||Xt?nn(null):ge&&ge.point?nn(Un(ge.point)):X?hr():J&&nn(Un(J))}function of(y){if(y.silent)return;let T=[],k=(vt,qt)=>{_e.has(vt)||(_e.add(vt),Ee.milestones++,T.push(qt))},F=Qt(),B=Kt(),[tt,et]=Xe(y.type,y.cell.rot);if(F>=4&&k("first_course","Off to a start: 4 bricks"),y.hold&&y.hold.under.size>=2&&k("open_span","Open span bridged"),(y.cell.i<-4||y.cell.i+tt>4||y.cell.j<-4||y.cell.j+et>4)&&k("overhang","Bold overhang"),B>=6&&k("skyline","Skyline reached: 6 layers high"),B>=10&&k("towering","Towering height: 10 layers"),F>=25&&k("master","Master builder: 25 bricks"),pt!=="free"&&lt.length>0&&lt.every(vt=>vt.filled)&&!Yt){Yt=!0;let vt=hi[pt].name;Fn(`${vt} complete`,!0),h.celebrate(),d.confetti(P(Rt()),Wi),Ae(`${vt} blueprint complete.`);return}if(T.length){let vt=T[T.length-1];Fn(vt,!1),h.milestone(),Ae(`Milestone: ${vt}.`)}}function po(y,T){let[k,F]=Xe(y.type,T.rot);y.cell={i:T.i,j:T.j,rot:T.rot,level:T.level},y.hold=L(y.type,T.i,T.j,T.rot,T.level),y.rest.set(T.x,T.y,T.z),y.object.quaternion.setFromAxisAngle(g,T.rotY),Se(y,T.level);let B=lt.find(tt=>!tt.filled&&tt.type===y.type&&tt.i===T.i&&tt.j===T.j&&tt.rot===T.rot&&tt.level===T.level)||null;y.slot=B,B&&(B.filled=y),V(T.i,T.j,k,F,tt=>{S[tt]=T.level+be[y.type].plates,I[tt]=y,x[tt].push([T.level,S[tt]])}),ht.push(y)}function or(y){y.state="placed",y.object.visible=!0,y.object.position.copy(y.rest),y.object.scale.set(1,1,1);let T=be[y.type],[k,F]=Xe(y.type,y.cell.rot),B=!!(y.finishing&&!Jt.size&&y.finishPlan===pt);if(y.silent||(h.snap(y.cell.level,y.hold?y.hold.studs:2),d.bounce(y,T.plates*Xi/2),d.burstAt(y.rest.x,P(y.cell.level),y.rest.z,k*ln/2,F*ln/2,y.stone,!!y.slot),Ae(`${T.label} placed. ${Qt()} in all.`)),B||of(y),Ne(),!y.silent&&!B&&!y.topples&&pt!=="free"&&lt.length>0&&!y.slot){let tt=lt.find(At=>{if(At.filled||!ee(At))return!1;let[vt,qt]=Xe(At.type,At.rot);return On(y.cell.i,y.cell.j,k,F,At.i,At.j,vt,qt)&&At.level<y.cell.level+T.plates&&At.level+be[At.type].plates>y.cell.level}),et=tt?`Off blueprint: this covers a ${be[tt.type].label} spot. Press Undo to adjust, or keep freestyling.`:"Extra brick placed outside the blueprint. Press Undo to adjust, or keep freestyling.";!K&&!Xt&&(st.hint.textContent=et,Cn=!1),Ae(et)}B&&(y.finishing=!1,y.finishPlan=null,Vl()),y.topples&&(y.topples=!1,kh())}function Fh(y,T=0){let k=dn.matches?0:.22,F=y.rest.y+.7;if(y.object.position.set(y.rest.x,F,y.rest.z),T>0&&!dn.matches&&(y.object.visible=!1),!k){or(y);return}Jt.add({part:y,t:-T,d:k,high:F}),Ie=!0}function ar(y,T=!1){if(Xt)return null;if(ht.length>=tf)return st.hint.textContent=`That is ${tf} bricks, the most this version allows.`,null;if(!T&&$(y))return af(y),null;K&&ms(),wt=null,kl();let k=C(y.type);return k.batch=++Ft,po(k,y),Fh(k),Ne(),k}let lr=null,Oh=null;function af(y){Ee.refused++,h.creak(),Oh=y,Ih().catch(()=>{}),lr=X&&document.activeElement===st.stage?{...X}:null,J=null,nn(null),st.warn.hidden=!1,st.wrap.inert=!0,st.warnGo.focus({preventScroll:!0})}function mo(){st.warn.hidden=!0,st.wrap.inert=!1,lr?(st.stage.focus({preventScroll:!0}),st.stage.classList.add("tg-keys"),X=lr,lr=null,hr()):st.styles.find(y=>y.getAttribute("aria-pressed")==="true").focus({preventScroll:!0})}async function lf(){let y=Oh;mo();let T=++Be;Xt=he=!0,Ne();try{Ut=await Ih()}catch{if(T!==Be)return;Xt=he=!1,Ne(),st.hint.textContent="The physics file did not load, so nothing was placed.";return}if(T!==Be||!cn)return;if(he=!1,!Xt){Ne();return}let k=Bl();Xt=!1;let F=ar(y,!0);if(!F){Ne();return}Xt=!0,wt=k,wt.wipe=!0,F.topples=!0,st.hint.textContent="Here goes\u2026",Ne(),F.state==="placed"&&F.topples&&(F.topples=!1,kh())}async function Bh(){if(Xt||he||!ht.length)return;if(h.unlock(),Jt.size)for(let k of[...Jt])Jt.delete(k),k.part.finishing=!1,k.part.finishPlan=null,k.part.topples=!1,k.part.object.visible=!0,k.part.silent=!0,or(k.part),k.part.silent=!1;hn=null,K=!1,o.rotation.y=0,ve(),nn(null);let y=++Be;Xt=he=!0,st.hint.textContent="Preparing the tumble\u2026",Ne();try{Ut=await Ih()}catch{if(y!==Be)return;Xt=he=!1,Ne(),st.hint.textContent="The physics file did not load, so the tower stayed up.";return}if(y!==Be||!cn)return;if(he=!1,!Xt||!ht.length){Xt=!1,Ne();return}wt=Bl(),wt.wipe=!0,kl(),h.creak(),st.hint.textContent="Timber\u2026",hf(),Xt&&Ne()}let Bl=()=>ht.map(y=>({type:y.type,cell:y.cell,batch:y.batch,look:y.look,shade:y.shade}));function cf(){let y=[],T=[],k=[];for(let F=0;F<60&&Y()>js;F++){let B=ht.find(et=>et.hold===Q),tt=new Set([B]);k.push({part:B,x:ln*B.hold.x,z:ln*B.hold.z});for(let et of ht)et!==B&&[...et.hold.under.keys()].some(At=>tt.has(At))&&tt.add(et);for(let et of tt)if(et!==B)for(let[At,vt]of et.hold.under)tt.has(At)&&T.push({a:et,b:At,studs:vt});for(let et=ht.length-1;et>=0;et--)tt.has(ht[et])&&ht.splice(et,1);for(let et of tt)et.slot&&(et.slot.filled=null),et.slot=null,et.state="debris",y.push(et);cr()}return{fallen:y,grips:T,leans:k}}let zl=y=>{let[T,k]=Xe(y.type,y.cell.rot),F=z(y.type,y.cell.i,y.cell.j,y.cell.rot,y.cell.level);return{x:F.x,y:F.y,z:F.z,hx:T*ln/2-.002,hy:be[y.type].plates*Xi/2-.002,hz:k*ln/2-.002,rotY:F.rotY}};function zh(){let y=l,T=-.035,k=1.2,F=.3,B=(jt,de)=>(jt+de)/2,tt=(jt,de,qe,Ve,Ye,Rn)=>({x:B(jt,de),y:B(qe,Ve),z:B(Ye,Rn),hx:(de-jt)/2,hy:(Ve-qe)/2,hz:(Rn-Ye)/2}),et=.45,At=.96+.45-.187,vt=.36,qt=.81+.36-.187;return[tt(-k,k,T,y,-k,-k+F),tt(-k,-k+F,T,y,-k+F,k-F),tt(-k,-et,T,y,k-F,k),tt(et,k,T,y,k-F,k),tt(-et,et,At,y,k-F,k),tt(k-F,k,T,y,-k+F,-vt),tt(k-F,k,T,y,vt,k-F),tt(k-F,k,qt,y,-vt,vt),tt(-k+F,k-F,y-Xi,y,-k+F,k-F)]}function kh(){_t=null,ve(),d.clear();let{fallen:y,grips:T,leans:k}=cf(),F=new Map(y.map((tt,et)=>[tt,et])),B=y.map(tt=>({object:tt.object,...zl(tt)}));re=Eh(Ut,{pieces:B,shell:zh(),standing:ht.map(zl),groundY:-.035,grips:T.map(tt=>({a:F.get(tt.a),b:F.get(tt.b),studs:tt.studs})),leans:k.map(tt=>({piece:F.get(tt.part),x:tt.x,z:tt.z})),onImpact:tt=>{cn&&h.clatter(tt)}}),Ee.toppled++,Oe={fell:y.length,stayed:ht.length,clumpsAtStart:re.clumps},ze=dn.matches?0:.14,dn.matches&&(re.advanceBudget(16,40),re.settled&&go()),Ie=!0}function hf(){_t=null,d.clear();let y=ht.slice(),T=[];for(let et of y)for(let[At,vt]of et.hold.under)T.push({a:et,b:At,studs:vt});ht.length=0;for(let et of y)et.slot&&(et.slot.filled=null),et.slot=null,et.state="debris",et.object.visible=!0;cr();let k=new Map(y.map((et,At)=>[et,At])),F=y.map(et=>({object:et.object,...zl(et)})),B=new O(1.1,0,1.35).applyAxisAngle(g,Lt),tt={vx:B.x*1.45,vy:1.5,vz:B.z*1.45,spinX:B.z*1.8,spinZ:-B.x*1.8};re=Eh(Ut,{pieces:F,shell:zh(),standing:[],groundY:-.035,grips:T.map(et=>({a:k.get(et.a),b:k.get(et.b),studs:et.studs})),leans:[],impulse:tt,onImpact:et=>{cn&&h.clatter(et)}}),Ee.toppled++,Oe={fell:y.length,stayed:0,clumpsAtStart:re.clumps,deliberate:!0},ze=dn.matches?0:.08,dn.matches&&(re.advanceBudget(16,40),re.settled&&go()),Ie=!0}function go(){let y=Oe.fell;Oe.seconds=+re.time.toFixed(2),Oe.clumpsAtEnd=re.clumps,re=null,Xt=!1,Zi(),Ne(),Bn();let T=`Down it came: ${y===1?"1 brick":`${y} bricks`} fell. Undo puts ${y===1?"it":"them"} back, and your next brick clears the rubble.`;st.hint.textContent=T,Ae(T)}function kl(){for(let y of mt)y.state==="debris"&&(y.state="gone",Ot.add({part:y,t:dn.matches?1:0}));Ie=!0}function Vh(y){return Z(y.type,y.i,y.j,y.rot,N(y.type,y.i,y.j,y.rot))}function uf(){if(Xt)return;K&&ms();let y=te().sort((T,k)=>T.level-k.level)[0];y&&(ar(Vh(y)),Ee.drops++),Ne()}function df(){if(Xt)return;K&&ms(),kl();let y=0,T=null;wt=null,Ft++;for(let k=te().sort((F,B)=>F.level-B.level)[0];k;k=te().sort((F,B)=>F.level-B.level)[0])T=C(k.type),T.batch=Ft,T.silent=!0,po(T,Vh(k)),Fh(T,y),y+=.055;T&&(T.silent=!1,T.finishing=!0,T.finishPlan=pt,Jt.size||(T.finishing=!1,T.finishPlan=null,Vl())),Ne()}function cr(){S.set(A),I.fill(null);for(let y of x)y.length=0;for(let y of ht){let[T,k]=Xe(y.type,y.cell.rot);y.hold=L(y.type,y.cell.i,y.cell.j,y.cell.rot,y.cell.level),V(y.cell.i,y.cell.j,T,k,F=>{S[F]=y.cell.level+be[y.type].plates,I[F]=y,x[F].push([y.cell.level,S[F]])})}}function Zi(){bn={from:{...St},to:kt(),t:0},Ie=!0}let bn=null;function ms(){_t=null,K=!1,hn=null,o.rotation.y=0,mf()}function Gh(){if(ge||he)return;if(_t=null,wt?.wipe&&ff(),wt){pf();return}if(!ht.length)return;K&&ms();let y=ht[ht.length-1].batch;for(;ht.length&&ht[ht.length-1].batch===y;){let T=ht.pop();for(let k of Jt)k.part===T&&Jt.delete(k);T.slot&&(T.slot.filled=null,Yt=!1),_(T)}h.undo(),Ee.undos++,cr(),Zi(),Ae(`Undone. ${Qt()} left.`),Ne(),Bn()}function ff(){Be++,re=null,Xt=!1,he=!1,hn=null,K=!1,o.rotation.y=0,Jt.clear(),Ot.clear(),d.clear(),ht.length=0;for(let y of lt)y.filled=null;for(let y of[...mt])_(y);cr()}function pf(){for(let{type:y,cell:T,batch:k,look:F,shade:B}of wt){let tt=C(y,F);tt.shade=B??tt.shade,tt.batch=k,tt.silent=!0,po(tt,Z(y,T.i,T.j,T.rot,{level:T.level,studs:0})),or(tt),tt.silent=!1}wt=null,Yt=lt.length>0&&lt.every(y=>y.filled),h.undo(),Ee.undos++,Zi(),Ae(`Build restored. ${Qt()} bricks.`),Ne(),Bn()}function Hh(){Be++,_t=null;let y=wt?.wipe?wt:ht.length?Bl():null;re=null,Xt=!1,he=!1,Ot.clear(),d.clear(),ve(),wt=y,hn=null,K=!1,Jt.clear(),o.rotation.y=0,ht.length=0,ot=0,_e.clear(),Yt=!1,fo();for(let T of lt)T.filled=null;for(let T of[...mt])_(T);cr(),Zi(),h.undo(),Ae("All bricks cleared. Undo brings them back."),Ne(),wt&&(st.hint.textContent="All bricks cleared. Undo brings them back."),st.styles.find(T=>T.dataset.type===H).focus()}function mf(){for(let y of mt)y.material.color.copy(y.stone);Ie=!0}function Vl(){let y=st.plan.contains(document.activeElement);K=!0,nn(null);let k=pt!=="free"&&lt.length>0&&lt.every(et=>et.filled&&et.filled.state==="placed"),F=hi[pt].name,B=Qt();st.hint.textContent=k?`${F} complete (${B} ${B===1?"brick":"bricks"}). Save a photo, build on, or try another blueprint.`:`Your tower is finished: ${B} ${B===1?"brick":"bricks"}, ${Kt()} high. Save a photo, build on, or start again.`,Ae(st.hint.textContent),k&&(Yt=!0,Fn(`${F} complete`,!0));let tt=ht.map(et=>et.cell.level);for(let et of ht)et.look==="grey"?et.pride.set(Qd(et.cell.level)):et.pride.copy(et.stone);if(h.celebrate(),Ne(),y&&!st.done.disabled&&st.done.focus({preventScroll:!0}),dn.matches){for(let et of mt)et.material.color.copy(et.pride);Ie=!0;return}d.confetti(P(Math.max(3,...tt)),Wi),hn={t:0,top:Math.max(1,...tt)}}async function Wh(){if(!Qt()||Jt.size||Xt||he)return;h.unlock();let y=bt.visible,T=lt.map(jt=>jt.hint.visible),k=mt.map(jt=>!!jt.offLine?.visible);bt.visible=!1;for(let jt of lt)jt.hint.visible=!1;for(let jt of mt)jt.offLine&&(jt.offLine.visible=!1);i.render(t,e);let F=pt!=="free"&&lt.length>0,B=F&&lt.every(jt=>jt.filled&&jt.filled.state==="placed"),tt=F?`FORRT ${hi[pt].name}`:"My FORRT tower",et=nt(Y()),At=Kd({sourceCanvas:st.canvas,title:tt,bricks:Qt(),courses:Kt(),stability:et.pct,blueprintDone:B});bt.visible=y,lt.forEach((jt,de)=>{jt.hint.visible=T[de]}),mt.forEach((jt,de)=>{jt.offLine&&(jt.offLine.visible=k[de])}),Ie=!0,Ee.photos++,h.pick();let vt=F?pt:"tower";await jd(At,`forrt-${vt}.png`);let qt=`Postcard saved as forrt-${vt}.png.`;return Fn("Postcard saved",!1),!K&&!Xt&&(st.hint.textContent=qt),Ae(qt),{width:At.width,height:At.height,filename:`forrt-${vt}.png`}}function gf(y){let T=qi(y);if(y.pointerType==="touch"&&ge){let k=Math.hypot(T.x-ge.down.x,T.y-ge.down.y);k>=ir&&(ge.lift=Math.max(ge.lift,Math.min(Zn,k*1.5))),T.y-=ge.lift}return T}let xf=y=>y.x>=0&&y.y>=0&&y.x<=at.width&&y.y<=at.height;function _f(y){if(ge||!cn||K||Xt||y.pointerType==="mouse"&&y.button!==0)return;h.unlock();let T=qi(y);y.preventDefault(),Jn(T)||(_t=null),st.stage.classList.remove("tg-keys"),X=null,st.canvas.setPointerCapture(y.pointerId),ge={id:y.pointerId,down:T,lift:0,point:T},nn(Un(T))}function yf(y){let T=y.target.closest(".tg-style");!T||ge||!cn||(h.unlock(),rr(T.dataset.type,!0),T.releasePointerCapture?.(y.pointerId),ge={id:y.pointerId,down:qi(y),lift:y.pointerType==="touch"?Zn:0,fromTray:!0,point:null},X=null)}function vf(y){if(ge&&y.pointerId===ge.id){let T=gf(y);ge.point=xf(T)?T:null,ge.point&&!Jn(ge.point)&&(_t=null),nn(ge.point&&!Xt?Un(ge.point):null)}else!ge&&y.pointerType==="mouse"&&cn&&y.target===st.canvas&&(J=qi(y),X=null,Jn(J)||(_t=null),nn(K||Xt?null:Un(J)))}function Gl(y){if(!ge||y.pointerId!==ge.id)return;let{fromTray:T,point:k}=ge,F=y.type!=="pointerup",B=!F&&k&&ge.point;if(ge=null,B&&!K&&!Xt){let tt=Un(k),et=performance.now(),At=_t&&et-_t.t<ho&&Jn(k);tt&&!At&&ar(tt)?(Ee.drops++,_t={t:et,x:k.x,y:k.y,i:tt.i,j:tt.j}):!tt&&!T&&!At&&(Ee.misses++,st.hint.textContent=fs(k)?"That stack has reached the height limit.":"No studs there. Point at the top of the tower.")}y.pointerType==="mouse"&&J&&!F&&!K&&!Xt?nn(Un(qi(y))):nn(null),J=y.pointerType==="mouse"?J:null}let Hl=!1;function hr(){let[y,T]=Xe(H,ct());X.i=Math.min(X.i,di-y+1),X.j=Math.min(X.j,di-T+1);let k=N(H,X.i,X.j,ct());return nn(k&&!Xt?Z(H,X.i,X.j,ct(),k):null),k}function bf(y){let T=y.key.toLowerCase();if(y.ctrlKey||y.metaKey||y.altKey||!st.note.hidden||!st.warn.hidden)return;h.unlock();let k=/^(?:Digit|Numpad)(\d)$/.exec(y.code)?.[1]??(/^\d$/.test(T)?T:null);if(k!==null){let B=er[(+k+9)%10];rr(B,!0),Ae(`${be[B].label} chosen.`);return}if(T==="r"){Ol();return}if(T==="t"){Wl();return}if(T==="m"){Xl();return}if(T==="tab"&&(Hl=!0),y.target!==st.stage)return;let F={arrowleft:[-1,0],arrowright:[1,0],arrowup:[0,-1],arrowdown:[0,1]}[T];if(F){if(y.preventDefault(),!X)X={i:0,j:0};else{let[tt,et]=F;for(let qt=0;qt<yt;qt++)[tt,et]=[et,-tt];let[At,vt]=Xe(H,ct());X.i=Math.max(ui,Math.min(di-At+1,X.i+tt)),X.j=Math.max(ui,Math.min(di-vt+1,X.j+et))}let B=hr();Ae(B?`Column ${X.i+5}, row ${X.j+5}, height ${B.level}, held by ${B.studs} ${B.studs===1?"stud":"studs"}${vn&&$(vn)?", too wobbly":""}.`:`Column ${X.i+5}, row ${X.j+5}: nothing to build on.`)}else if((T==="enter"||T===" ")&&X&&!K&&!Xt){y.preventDefault();let B=hr();B?ar(Z(H,X.i,X.j,ct(),B))&&(Ee.keyboard++,Ee.drops++,hr()):Ae("Nothing to build on here.")}}function Wl(){dt||(_t=null,yt=(yt+1)%4,Ee.turns++,h.turn(),dt={from:Lt,to:Lt+Math.PI/2,t:0},fo(),nn(null),Ae(`View turned, side ${yt+1} of 4.`),dn.matches&&(dt.t=1,Xh()),Ie=!0)}function Xh(){Lt=dt.to%(Math.PI*2),dt=!1,Wt(),ye(),Bn()}function Xl(){h.enabled=!h.enabled,st.sound.setAttribute("aria-pressed",String(h.enabled)),st.sound.setAttribute("aria-label",h.enabled?"Sound on":"Sound off"),h.enabled&&(h.unlock(),h.pick()),Ae(h.enabled?"Sound effects on.":"Sound effects muted.")}st.canvas.addEventListener("pointerdown",_f),st.tray.addEventListener("pointerdown",yf),st.d.addEventListener("pointermove",vf),st.d.addEventListener("pointerup",Gl),st.d.addEventListener("pointercancel",Gl),st.d.addEventListener("keydown",bf),st.canvas.addEventListener("pointerleave",()=>{ge||(J=null,nn(null))}),st.stage.addEventListener("focus",()=>{st.stage.classList.toggle("tg-keys",Hl),Hl=!1}),st.stage.addEventListener("blur",()=>{X&&(X=null,nn(null))}),st.tray.addEventListener("click",y=>{let T=y.target.closest(".tg-style");T&&(h.unlock(),rr(T.dataset.type,!1),Ae(`${be[T.dataset.type].label} chosen.`))}),st.d.querySelector("#tg-plans").addEventListener("click",y=>{let T=y.target.closest(".tg-plan-pill");T&&(h.unlock(),uo(T.dataset.plan,!0))}),st.d.querySelector("#tg-looks").addEventListener("click",y=>{let T=y.target.closest(".tg-look");if(!T)return;h.unlock(),h.pick(),Uh(T.dataset.look);let k={grey:"New bricks will be grey. Done gives grey bricks their pride stripes.",brick:"New bricks will be red brick. Bricks already placed keep their look.",pride:"New bricks take a pride colour from their height, so stripes rise as you build."}[T.dataset.look];!K&&!ge&&(st.hint.textContent=k),Ae(k)}),st.warnGo.addEventListener("click",mo),st.warnAnyway.addEventListener("click",()=>{h.unlock(),lf()}),st.warn.addEventListener("keydown",y=>{y.repeat&&y.preventDefault()}),st.rotate.addEventListener("click",()=>{h.unlock(),Ol()}),st.view.addEventListener("click",()=>{h.unlock(),Wl()}),st.undo.addEventListener("click",()=>{h.unlock(),Gh()}),st.next.addEventListener("click",()=>{h.unlock(),uf()}),st.finish.addEventListener("click",()=>{h.unlock(),df()}),st.restart.addEventListener("click",()=>{h.unlock(),Hh()}),st.topple.addEventListener("click",Bh),st.photo.addEventListener("click",()=>{Wh()}),st.sound.addEventListener("click",Xl),st.done.addEventListener("click",()=>{performance.now()-zt<400||(zt=performance.now(),h.unlock(),K?(ms(),Ne(),Bn()):ht.length&&Vl())}),st.hints.addEventListener("click",()=>{if(h.unlock(),h.pick(),pt==="free"){uo(Et,!0);return}xt=!xt,Ne(),Bn(),Ae(xt?`Hints on. ${te().length} places outlined.`:"Hints off.")});let ql=!1;st.canvas.addEventListener("webglcontextlost",y=>{y.preventDefault(),ql=!0,st.hint.textContent="The browser reset its graphics. Waiting for it to come back.",Ee.lost++}),st.canvas.addEventListener("webglcontextrestored",()=>{ql=!1,en(),Ne()});function qh(y){if($i=0,!cn)return;let T=Math.min(.05,ps?(y-ps)/1e3:0);ps=y;let k=[];for(let F of[...Jt]){if(F.t+=T,F.t<0)continue;F.part.object.visible=!0;let B=oo(F.t/F.d),tt=B*B;F.part.object.position.y=F.high+(F.part.rest.y-F.high)*tt,Ie=!0,B===1&&(Jt.delete(F),k.push(F.part))}for(let F of k)or(F),bn||Zi();if(d.tick(T)&&(Ie=!0),vn&&G&&bt.visible&&!dn.matches){ce+=T*(M==="wobbly"?42:24);let F=M==="wobbly"?.018:.008;bt.position.set(vn.x+Math.sin(ce)*F,vn.y,vn.z+Math.cos(ce*1.3)*F),Ie=!0}if(re)if(dn.matches)re.advanceBudget(16,40),re.settled&&(Ie=!0,go());else{if(ze-=T,ze<=0&&re.advance(T),Ie=!0,me-=T,me<=0&&!bn){me=.25;let F=kt();F.t-F.b>St.t-St.b+.01&&Zi()}re.settled&&go()}for(let F of[...Ot]){F.t+=T/.25;let B=1-oo(F.t);F.part.object.scale.setScalar(Math.max(.001,B)),Ie=!0,F.t>=1&&(Ot.delete(F),_(F.part),bn||Zi())}if(bn){bn.t+=T/.28;let F=dn.matches?1:Dl(bn.t);for(let B of"lrtb")St[B]=bn.from[B]+(bn.to[B]-bn.from[B])*F;Te(),(bn.t>=1||dn.matches)&&(bn=null,Bn())}if(dt&&(dt.t+=T/.42,Lt=dt.from+(dt.to-dt.from)*Dl(dt.t),Wt(),ye(),dt.t>=1&&Xh()),hn){hn.t+=T;let F=oo(hn.t/3);for(let B of ht)B.material.color.lerpColors(B.stone,B.pride,Dl((F-oo(B.cell.level/hn.top)*.6)/.4));o.rotation.y=hn.t>3?Dl((hn.t-3)/3)*Math.PI*2:0,hn.t>6&&(hn=null,o.rotation.y=0),Ie=!0}Ie&&!ql&&(i.render(t,e),Ee.frames++,Ie=!1),$i=requestAnimationFrame(qh)}let Mf=()=>{cn||(cn=!0,ps=0,Ie=!0,$i=requestAnimationFrame(qh))},Sf=()=>{cn=!1,Be++,he=!1,!re&&![...Jt].some(y=>y.part.topples)&&(Xt=!1),cancelAnimationFrame($i),$i=0,ve(),d.clear(),h.close(),ge&&Gl({pointerId:ge.id,type:"pointercancel"}),st.warn.hidden||(lr=null,mo()),nn(null),Ne()},xo={grey:{},brick:{},pride:{}};function wf(){let y=new Fs;y.add(new Gs(16777215,9143161,2.1));let T=new Fi(16776182,3.2);T.position.set(-3,11,6),y.add(T);let k=new Si(-.82,.82,.5,-.5,.1,20);k.position.set(3.7,4.4,5.1),k.lookAt(0,0,0);let F=new De(p.b1x1,c[4]);y.add(F),i.setSize(164,100,!1);let B=c[4].clone();B.color.set(Ph[0]);let tt=c[4].clone();tt.color.set("#d5dadc");let et=document.createElement("canvas");et.width=164,et.height=100;let At=et.getContext("2d"),vt=At.createLinearGradient(30,0,134,0);Wi.forEach((qt,jt)=>{vt.addColorStop(jt/6,qt),vt.addColorStop((jt+1)/6,qt)});for(let qt of er)F.geometry=p[qt],F.material=c[4],i.render(y,k),xo.grey[qt]=st.canvas.toDataURL(),F.material=B,i.render(y,k),xo.brick[qt]=st.canvas.toDataURL(),F.material=tt,i.render(y,k),At.globalCompositeOperation="source-over",At.clearRect(0,0,164,100),At.drawImage(st.canvas,0,0),At.globalCompositeOperation="multiply",At.fillStyle=vt,At.fillRect(0,0,164,100),At.globalCompositeOperation="destination-in",At.drawImage(st.canvas,0,0),xo.pride[qt]=et.toDataURL();F.geometry=p.b1x4,F.material=c[4],i.render(y,k),st.d.querySelector("#tg-turn-a").src=st.canvas.toDataURL(),F.rotation.y=Math.PI/2,i.render(y,k),st.d.querySelector("#tg-turn-b").src=st.canvas.toDataURL(),B.dispose(),tt.dispose()}return wf(),Wt(),en(),new ResizeObserver(()=>{en(),cn&&i.render(t,e)}).observe(st.stage),Uh(j),uo("free",!1),rr(H),{hideWarning:mo,strainWith:Y,holdOf:L,tooWobbly:$,stabilityInfo:nt,STRAIN_LIMIT:js,ghostSkin:Vt,ghostLine:Ct,ghostBody:It,colourOf:U,start:Mf,stop:Sf,resize:en,renderer:i,stats:Ee,bricks:mt,slots:lt,camera:e,scene:t,model:o,ghost:bt,overlay:u,project:yn,placedCount:Qt,maxPlates:Rt,maxCourses:Kt,frame:at,openSlots:te,landing:N,targetAt:Un,freeTargetAt:Yi,surfaceCell:fs,history:ht,flights:Jt,commit:po,land:or,spawn:C,restart:Hh,undo:Gh,select:rr,selectBlueprint:uo,rotateBrick:Ol,turnView:Wl,placeBrick:ar,makeTarget:Z,toppleTower:Bh,savePhoto:Wh,toggleSound:Xl,castRay:ds,raycaster:nr,sound:h,effects:d,milestones:_e,get currentPlan(){return pt},get aimMatch(){return sr},get drag(){return ge},get aim(){return vn},get cursor(){return X},get busy(){return!!(Jt.size||bn||dt||Xt)},get toppling(){return Xt},get collapse(){return re},get lastCollapse(){return Oe},get worstHold(){return Q},get selected(){return H},get look(){return j},get view(){return yt},get hintsOn(){return xt},get done(){return K},get rot(){return ct()},MIN_CELL:ui,MAX_CELL:di,MAX_PLATES:Nl,mesh:v,foundationTop:l,TYPES:be,TYPE_KEYS:er,BLUEPRINTS:Ll,footprint:Xe,heightOf:P}}var ef=!1;function nf(){st.note.hidden=!1,st.wrap.inert=!0,st.noteGo.focus({preventScroll:!0})}function sf(){st.note.hidden=!0,st.wrap.inert=!1,st.styles.find(i=>i.getAttribute("aria-pressed")==="true").focus({preventScroll:!0})}function k_(){if(st||(st=B_(),st.close.addEventListener("click",()=>st.d.close()),st.help.addEventListener("click",nf),st.noteGo.addEventListener("click",sf),st.d.addEventListener("cancel",t=>{st.note.hidden?st.warn.hidden||(t.preventDefault(),tr.hideWarning()):(t.preventDefault(),sf())}),st.d.addEventListener("close",()=>{tr?.stop(),document.documentElement.classList.remove("tg-lock"),window.forrtHeroSuspend?.(!1)})),st.d.open)return;window.forrtHeroSuspend?.(!0),document.documentElement.classList.add("tg-lock"),st.d.showModal();let i=performance.now();try{tr||(tr=z_()),window.towerGame.setupMs=window.towerGame.setupMs||performance.now()-i,tr.resize(),tr.start(),!ef||!st.note.hidden?(ef=!0,nf()):st.styles.find(t=>t.getAttribute("aria-pressed")==="true").focus({preventScroll:!0})}catch(t){st.hint.textContent="This browser could not start the game.",console.warn("Tower game could not start:",t.message)}}window.towerGame={open:k_,close:()=>st?.d.close()};})();
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
