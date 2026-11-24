(()=>{var xu=0,Ec=1,_u=2;var is=1,yu=2,ks=3,Fi=0,Ke=1,ii=2,si=0,Vs=1,Cc=2,Rc=3,Ic=4,vu=5;var ss=100,bu=101,Mu=102,Su=103,wu=104,Tu=200,Au=201,Eu=202,Cu=203,Pc=204,Lc=205,Ru=206,Iu=207,Pu=208,Lu=209,Du=210,Nu=211,Uu=212,Fu=213,Ou=214,zo=0,ko=1,Vo=2,As=3,Go=4,Ho=5,Wo=6,Xo=7,Dc=0,Bu=1,zu=2,Xn=0,Nc=1,Uc=2,Fc=3,zr=4,Oc=5,Bc=6,zc=7;var kc=300,Oi=301,rs=302,Aa=303,Ea=304,kr=306,qo=1e3,Kn=1001,Yo=1002,Ye=1003,ku=1004;var Vr=1005;var Ze=1006,Ca=1007;var Bi=1008;var yn=1009,Vc=1010,Gc=1011,Gs=1012,Ra=1013,qn=1014,Yn=1015,$n=1016,Ia=1017,Pa=1018,Hs=1020,Hc=35902,Wc=35899,Xc=1021,qc=1022,Un=1023,jn=1026,zi=1027,Yc=1028,La=1029,ki=1030,Da=1031;var Na=1033,Gr=33776,Hr=33777,Wr=33778,Xr=33779,Ua=35840,Fa=35841,Oa=35842,Ba=35843,za=36196,ka=37492,Va=37496,Ga=37488,Ha=37489,qr=37490,Wa=37491,Xa=37808,qa=37809,Ya=37810,$a=37811,Za=37812,Ja=37813,Ka=37814,ja=37815,Qa=37816,tl=37817,el=37818,nl=37819,il=37820,sl=37821,rl=36492,ol=36494,al=36495,ll=36283,cl=36284,Yr=36285,hl=36286;var mr=2300,$o=2301,Fo=2302,mc=2303,gc=2400,xc=2401,_c=2402;var Vu=3200;var ul=0,Gu=1,yi="",hn="srgb",gr="srgb-linear",xr="linear",Te="srgb";var Oo=7680,$c=7681;var Zc=517;var dl=519,Hu=512,Wu=513,Xu=514,fl=515,qu=516,Yu=517,pl=518,$u=519,Zu=35044;var Jc="300 es",Wn=2e3,Es=2001;function mf(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function gf(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function _r(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Ju(){let i=_r("canvas");return i.style.display="block",i}var Bh={},Cs=null;function Kc(...i){let t="THREE."+i.shift();Cs?Cs("log",t,...i):console.log(t,...i)}function Ku(i){let t=i[0];if(typeof t=="string"&&t.startsWith("TSL:")){let e=i[1];e&&e.isStackTrace?i[0]+=" "+e.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function te(...i){i=Ku(i);let t="THREE."+i.shift();if(Cs)Cs("warn",t,...i);else{let e=i[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...i)}}function ne(...i){i=Ku(i);let t="THREE."+i.shift();if(Cs)Cs("error",t,...i);else{let e=i[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...i)}}function ji(...i){let t=i.join(" ");t in Bh||(Bh[t]=!0,te(...i))}function ju(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}var Qu={[zo]:ko,[Vo]:Wo,[Go]:Xo,[As]:Ho,[ko]:zo,[Wo]:Vo,[Xo]:Go,[Ho]:As},Qn=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){let n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){let n=this._listeners;if(n===void 0)return;let s=n[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let n=e[t.type];if(n!==void 0){t.target=this;let s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}},nn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var Bo=Math.PI/180,Zo=180/Math.PI;function Ws(){let i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(nn[i&255]+nn[i>>8&255]+nn[i>>16&255]+nn[i>>24&255]+"-"+nn[t&255]+nn[t>>8&255]+"-"+nn[t>>16&15|64]+nn[t>>24&255]+"-"+nn[e&63|128]+nn[e>>8&255]+"-"+nn[e>>16&255]+nn[e>>24&255]+nn[n&255]+nn[n>>8&255]+nn[n>>16&255]+nn[n>>24&255]).toLowerCase()}function ue(i,t,e){return Math.max(t,Math.min(e,i))}function xf(i,t){return(i%t+t)%t}function Gl(i,t,e){return(1-e)*i+e*t}function or(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:case Uint8ClampedArray:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function pn(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var vt=class i{static{i.prototype.isVector2=!0}constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=ue(this.x,t.x,e.x),this.y=ue(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=ue(this.x,t,e),this.y=ue(this.y,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ue(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(ue(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},ti=class{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let c=n[s+0],l=n[s+1],u=n[s+2],f=n[s+3],h=r[o+0],d=r[o+1],g=r[o+2],v=r[o+3];if(f!==v||c!==h||l!==d||u!==g){let p=c*h+l*d+u*g+f*v;p<0&&(h=-h,d=-d,g=-g,v=-v,p=-p);let m=1-a;if(p<.9995){let w=Math.acos(p),R=Math.sin(w);m=Math.sin(m*w)/R,a=Math.sin(a*w)/R,c=c*m+h*a,l=l*m+d*a,u=u*m+g*a,f=f*m+v*a}else{c=c*m+h*a,l=l*m+d*a,u=u*m+g*a,f=f*m+v*a;let w=1/Math.sqrt(c*c+l*l+u*u+f*f);c*=w,l*=w,u*=w,f*=w}}t[e]=c,t[e+1]=l,t[e+2]=u,t[e+3]=f}static multiplyQuaternionsFlat(t,e,n,s,r,o){let a=n[s],c=n[s+1],l=n[s+2],u=n[s+3],f=r[o],h=r[o+1],d=r[o+2],g=r[o+3];return t[e]=a*g+u*f+c*d-l*h,t[e+1]=c*g+u*h+l*f-a*d,t[e+2]=l*g+u*d+a*h-c*f,t[e+3]=u*g-a*f-c*h-l*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,c=Math.sin,l=a(n/2),u=a(s/2),f=a(r/2),h=c(n/2),d=c(s/2),g=c(r/2);switch(o){case"XYZ":this._x=h*u*f+l*d*g,this._y=l*d*f-h*u*g,this._z=l*u*g+h*d*f,this._w=l*u*f-h*d*g;break;case"YXZ":this._x=h*u*f+l*d*g,this._y=l*d*f-h*u*g,this._z=l*u*g-h*d*f,this._w=l*u*f+h*d*g;break;case"ZXY":this._x=h*u*f-l*d*g,this._y=l*d*f+h*u*g,this._z=l*u*g+h*d*f,this._w=l*u*f-h*d*g;break;case"ZYX":this._x=h*u*f-l*d*g,this._y=l*d*f+h*u*g,this._z=l*u*g-h*d*f,this._w=l*u*f+h*d*g;break;case"YZX":this._x=h*u*f+l*d*g,this._y=l*d*f+h*u*g,this._z=l*u*g-h*d*f,this._w=l*u*f-h*d*g;break;case"XZY":this._x=h*u*f-l*d*g,this._y=l*d*f-h*u*g,this._z=l*u*g+h*d*f,this._w=l*u*f+h*d*g;break;default:te("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],c=e[9],l=e[2],u=e[6],f=e[10],h=n+a+f;if(h>0){let d=.5/Math.sqrt(h+1);this._w=.25/d,this._x=(u-c)*d,this._y=(r-l)*d,this._z=(o-s)*d}else if(n>a&&n>f){let d=2*Math.sqrt(1+n-a-f);this._w=(u-c)/d,this._x=.25*d,this._y=(s+o)/d,this._z=(r+l)/d}else if(a>f){let d=2*Math.sqrt(1+a-n-f);this._w=(r-l)/d,this._x=(s+o)/d,this._y=.25*d,this._z=(c+u)/d}else{let d=2*Math.sqrt(1+f-n-a);this._w=(o-s)/d,this._x=(r+l)/d,this._y=(c+u)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(ue(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,c=e._y,l=e._z,u=e._w;return this._x=n*u+o*a+s*l-r*c,this._y=s*u+o*c+r*a-n*l,this._z=r*u+o*l+n*c-s*a,this._w=o*u-n*a-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){let n=t._x,s=t._y,r=t._z,o=t._w,a=this.dot(t);a<0&&(n=-n,s=-s,r=-r,o=-o,a=-a);let c=1-e;if(a<.9995){let l=Math.acos(a),u=Math.sin(l);c=Math.sin(c*l)/u,e=Math.sin(e*l)/u,this._x=this._x*c+n*e,this._y=this._y*c+s*e,this._z=this._z*c+r*e,this._w=this._w*c+o*e,this._onChangeCallback()}else this._x=this._x*c+n*e,this._y=this._y*c+s*e,this._z=this._z*c+r*e,this._w=this._w*c+o*e,this.normalize();return this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},O=class i{static{i.prototype.isVector3=!0}constructor(t=0,e=0,n=0){this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(zh.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(zh.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){let e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,c=t.w,l=2*(o*s-a*n),u=2*(a*e-r*s),f=2*(r*n-o*e);return this.x=e+c*l+o*f-a*u,this.y=n+c*u+a*l-r*f,this.z=s+c*f+r*u-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=ue(this.x,t.x,e.x),this.y=ue(this.y,t.y,e.y),this.z=ue(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=ue(this.x,t,e),this.y=ue(this.y,t,e),this.z=ue(this.z,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ue(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,c=e.z;return this.x=s*c-r*a,this.y=r*o-n*c,this.z=n*a-s*o,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Hl.copy(this).projectOnVector(t),this.sub(Hl)}reflect(t){return this.sub(Hl.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(ue(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Hl=new O,zh=new ti,oe=class i{static{i.prototype.isMatrix3=!0}constructor(t,e,n,s,r,o,a,c,l){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l)}set(t,e,n,s,r,o,a,c,l){let u=this.elements;return u[0]=t,u[1]=s,u[2]=a,u[3]=e,u[4]=r,u[5]=c,u[6]=n,u[7]=o,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],u=n[4],f=n[7],h=n[2],d=n[5],g=n[8],v=s[0],p=s[3],m=s[6],w=s[1],R=s[4],M=s[7],A=s[2],S=s[5],I=s[8];return r[0]=o*v+a*w+c*A,r[3]=o*p+a*R+c*S,r[6]=o*m+a*M+c*I,r[1]=l*v+u*w+f*A,r[4]=l*p+u*R+f*S,r[7]=l*m+u*M+f*I,r[2]=h*v+d*w+g*A,r[5]=h*p+d*R+g*S,r[8]=h*m+d*M+g*I,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],u=t[8];return e*o*u-e*a*l-n*r*u+n*a*c+s*r*l-s*o*c}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],u=t[8],f=u*o-a*l,h=a*c-u*r,d=l*r-o*c,g=e*f+n*h+s*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let v=1/g;return t[0]=f*v,t[1]=(s*l-u*n)*v,t[2]=(a*n-s*o)*v,t[3]=h*v,t[4]=(u*e-s*c)*v,t[5]=(s*r-a*e)*v,t[6]=d*v,t[7]=(n*c-l*e)*v,t[8]=(o*e-n*r)*v,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){let c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+t,-s*l,s*c,-s*(-l*o+c*a)+a+e,0,0,1),this}scale(t,e){return ji("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Wl.makeScale(t,e)),this}rotate(t){return ji("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Wl.makeRotation(-t)),this}translate(t,e){return ji("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Wl.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}},Wl=new oe,kh=new oe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Vh=new oe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function _f(){let i={enabled:!0,workingColorSpace:gr,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===Te&&(s.r=gi(s.r),s.g=gi(s.g),s.b=gi(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===Te&&(s.r=Ts(s.r),s.g=Ts(s.g),s.b=Ts(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===yi?xr:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return ji("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return ji("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[gr]:{primaries:t,whitePoint:n,transfer:xr,toXYZ:kh,fromXYZ:Vh,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:hn},outputColorSpaceConfig:{drawingBufferColorSpace:hn}},[hn]:{primaries:t,whitePoint:n,transfer:Te,toXYZ:kh,fromXYZ:Vh,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:hn}}}),i}var pe=_f();function gi(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Ts(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var ds,Jo=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{ds===void 0&&(ds=_r("canvas")),ds.width=t.width,ds.height=t.height;let s=ds.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=ds}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=_r("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=gi(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(gi(e[n]/255)*255):e[n]=gi(e[n]);return{data:e,width:t.width,height:t.height}}else return te("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},yf=0,Rs=class{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:yf++}),this.uuid=Ws(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(Xl(s[o].image)):r.push(Xl(s[o]))}else r=Xl(s);n.url=r}return e||(t.images[this.uuid]=n),n}};function Xl(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Jo.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(te("Texture: Unable to serialize Texture."),{})}var vf=0,ql=new O,xn=class i extends Qn{constructor(t=i.DEFAULT_IMAGE,e=i.DEFAULT_MAPPING,n=Kn,s=Kn,r=Ze,o=Bi,a=Un,c=yn,l=i.DEFAULT_ANISOTROPY,u=yi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:vf++}),this.uuid=Ws(),this.name="",this.source=new Rs(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new vt(0,0),this.repeat=new vt(1,1),this.center=new vt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new oe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(ql).x}get height(){return this.source.getSize(ql).y}get depth(){return this.source.getSize(ql).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let n=t[e];if(n===void 0){te(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){te(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==kc)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case qo:t.x=t.x-Math.floor(t.x);break;case Kn:t.x=t.x<0?0:1;break;case Yo:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case qo:t.y=t.y-Math.floor(t.y);break;case Kn:t.y=t.y<0?0:1;break;case Yo:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};xn.DEFAULT_IMAGE=null;xn.DEFAULT_MAPPING=kc;xn.DEFAULT_ANISOTROPY=1;var Ue=class i{static{i.prototype.isVector4=!0}constructor(t=0,e=0,n=0,s=1){this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r,c=t.elements,l=c[0],u=c[4],f=c[8],h=c[1],d=c[5],g=c[9],v=c[2],p=c[6],m=c[10];if(Math.abs(u-h)<.01&&Math.abs(f-v)<.01&&Math.abs(g-p)<.01){if(Math.abs(u+h)<.1&&Math.abs(f+v)<.1&&Math.abs(g+p)<.1&&Math.abs(l+d+m-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let R=(l+1)/2,M=(d+1)/2,A=(m+1)/2,S=(u+h)/4,I=(f+v)/4,_=(g+p)/4;return R>M&&R>A?R<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(R),s=S/n,r=I/n):M>A?M<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(M),n=S/s,r=_/s):A<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(A),n=I/r,s=_/r),this.set(n,s,r,e),this}let w=Math.sqrt((p-g)*(p-g)+(f-v)*(f-v)+(h-u)*(h-u));return Math.abs(w)<.001&&(w=1),this.x=(p-g)/w,this.y=(f-v)/w,this.z=(h-u)/w,this.w=Math.acos((l+d+m-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=ue(this.x,t.x,e.x),this.y=ue(this.y,t.y,e.y),this.z=ue(this.z,t.z,e.z),this.w=ue(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=ue(this.x,t,e),this.y=ue(this.y,t,e),this.z=ue(this.z,t,e),this.w=ue(this.w,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ue(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Ko=class extends Qn{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ze,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new Ue(0,0,t,e),this.scissorTest=!1,this.viewport=new Ue(0,0,t,e),this.textures=[];let s={width:t,height:e,depth:n.depth},r=new xn(s),o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(t={}){let e={minFilter:Ze,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let s=Object.assign({},t.textures[e].image);this.textures[e].source=new Rs(s)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){let e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},_n=class extends Ko{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},yr=class extends xn{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Ye,this.minFilter=Ye,this.wrapR=Kn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var jo=class extends xn{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Ye,this.minFilter=Ye,this.wrapR=Kn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}};var Ce=class i{static{i.prototype.isMatrix4=!0}constructor(t,e,n,s,r,o,a,c,l,u,f,h,d,g,v,p){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l,u,f,h,d,g,v,p)}set(t,e,n,s,r,o,a,c,l,u,f,h,d,g,v,p){let m=this.elements;return m[0]=t,m[4]=e,m[8]=n,m[12]=s,m[1]=r,m[5]=o,m[9]=a,m[13]=c,m[2]=l,m[6]=u,m[10]=f,m[14]=h,m[3]=d,m[7]=g,m[11]=v,m[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),n.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();let e=this.elements,n=t.elements,s=1/fs.setFromMatrixColumn(t,0).length(),r=1/fs.setFromMatrixColumn(t,1).length(),o=1/fs.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(s),l=Math.sin(s),u=Math.cos(r),f=Math.sin(r);if(t.order==="XYZ"){let h=o*u,d=o*f,g=a*u,v=a*f;e[0]=c*u,e[4]=-c*f,e[8]=l,e[1]=d+g*l,e[5]=h-v*l,e[9]=-a*c,e[2]=v-h*l,e[6]=g+d*l,e[10]=o*c}else if(t.order==="YXZ"){let h=c*u,d=c*f,g=l*u,v=l*f;e[0]=h+v*a,e[4]=g*a-d,e[8]=o*l,e[1]=o*f,e[5]=o*u,e[9]=-a,e[2]=d*a-g,e[6]=v+h*a,e[10]=o*c}else if(t.order==="ZXY"){let h=c*u,d=c*f,g=l*u,v=l*f;e[0]=h-v*a,e[4]=-o*f,e[8]=g+d*a,e[1]=d+g*a,e[5]=o*u,e[9]=v-h*a,e[2]=-o*l,e[6]=a,e[10]=o*c}else if(t.order==="ZYX"){let h=o*u,d=o*f,g=a*u,v=a*f;e[0]=c*u,e[4]=g*l-d,e[8]=h*l+v,e[1]=c*f,e[5]=v*l+h,e[9]=d*l-g,e[2]=-l,e[6]=a*c,e[10]=o*c}else if(t.order==="YZX"){let h=o*c,d=o*l,g=a*c,v=a*l;e[0]=c*u,e[4]=v-h*f,e[8]=g*f+d,e[1]=f,e[5]=o*u,e[9]=-a*u,e[2]=-l*u,e[6]=d*f+g,e[10]=h-v*f}else if(t.order==="XZY"){let h=o*c,d=o*l,g=a*c,v=a*l;e[0]=c*u,e[4]=-f,e[8]=l*u,e[1]=h*f+v,e[5]=o*u,e[9]=d*f-g,e[2]=g*f-d,e[6]=a*u,e[10]=v*f+h}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(bf,t,Mf)}lookAt(t,e,n){let s=this.elements;return wn.subVectors(t,e),wn.lengthSq()===0&&(wn.z=1),wn.normalize(),wi.crossVectors(n,wn),wi.lengthSq()===0&&(Math.abs(n.z)===1?wn.x+=1e-4:wn.z+=1e-4,wn.normalize(),wi.crossVectors(n,wn)),wi.normalize(),co.crossVectors(wn,wi),s[0]=wi.x,s[4]=co.x,s[8]=wn.x,s[1]=wi.y,s[5]=co.y,s[9]=wn.y,s[2]=wi.z,s[6]=co.z,s[10]=wn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],u=n[1],f=n[5],h=n[9],d=n[13],g=n[2],v=n[6],p=n[10],m=n[14],w=n[3],R=n[7],M=n[11],A=n[15],S=s[0],I=s[4],_=s[8],E=s[12],N=s[1],P=s[5],k=s[9],W=s[13],U=s[2],B=s[6],Y=s[10],D=s[14],Q=s[3],X=s[7],q=s[11],tt=s[15];return r[0]=o*S+a*N+c*U+l*Q,r[4]=o*I+a*P+c*B+l*X,r[8]=o*_+a*k+c*Y+l*q,r[12]=o*E+a*W+c*D+l*tt,r[1]=u*S+f*N+h*U+d*Q,r[5]=u*I+f*P+h*B+d*X,r[9]=u*_+f*k+h*Y+d*q,r[13]=u*E+f*W+h*D+d*tt,r[2]=g*S+v*N+p*U+m*Q,r[6]=g*I+v*P+p*B+m*X,r[10]=g*_+v*k+p*Y+m*q,r[14]=g*E+v*W+p*D+m*tt,r[3]=w*S+R*N+M*U+A*Q,r[7]=w*I+R*P+M*B+A*X,r[11]=w*_+R*k+M*Y+A*q,r[15]=w*E+R*W+M*D+A*tt,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],c=t[9],l=t[13],u=t[2],f=t[6],h=t[10],d=t[14],g=t[3],v=t[7],p=t[11],m=t[15],w=c*d-l*h,R=a*d-l*f,M=a*h-c*f,A=o*d-l*u,S=o*h-c*u,I=o*f-a*u;return e*(v*w-p*R+m*M)-n*(g*w-p*A+m*S)+s*(g*R-v*A+m*I)-r*(g*M-v*S+p*I)}determinantAffine(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[1],o=t[5],a=t[9],c=t[2],l=t[6],u=t[10];return e*(o*u-a*l)-n*(r*u-a*c)+s*(r*l-o*c)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],u=t[8],f=t[9],h=t[10],d=t[11],g=t[12],v=t[13],p=t[14],m=t[15],w=e*a-n*o,R=e*c-s*o,M=e*l-r*o,A=n*c-s*a,S=n*l-r*a,I=s*l-r*c,_=u*v-f*g,E=u*p-h*g,N=u*m-d*g,P=f*p-h*v,k=f*m-d*v,W=h*m-d*p,U=w*W-R*k+M*P+A*N-S*E+I*_;if(U===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let B=1/U;return t[0]=(a*W-c*k+l*P)*B,t[1]=(s*k-n*W-r*P)*B,t[2]=(v*I-p*S+m*A)*B,t[3]=(h*S-f*I-d*A)*B,t[4]=(c*N-o*W-l*E)*B,t[5]=(e*W-s*N+r*E)*B,t[6]=(p*M-g*I-m*R)*B,t[7]=(u*I-h*M+d*R)*B,t[8]=(o*k-a*N+l*_)*B,t[9]=(n*N-e*k-r*_)*B,t[10]=(g*S-v*M+m*w)*B,t[11]=(f*M-u*S-d*w)*B,t[12]=(a*E-o*P-c*_)*B,t[13]=(e*P-n*E+s*_)*B,t[14]=(v*R-g*A-p*w)*B,t[15]=(u*A-f*R+h*w)*B,this}scale(t){let e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,c=t.z,l=r*o,u=r*a;return this.set(l*o+n,l*a-s*c,l*c+s*a,0,l*a+s*c,u*a+n,u*c-s*o,0,l*c-s*a,u*c+s*o,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){let s=this.elements,r=e._x,o=e._y,a=e._z,c=e._w,l=r+r,u=o+o,f=a+a,h=r*l,d=r*u,g=r*f,v=o*u,p=o*f,m=a*f,w=c*l,R=c*u,M=c*f,A=n.x,S=n.y,I=n.z;return s[0]=(1-(v+m))*A,s[1]=(d+M)*A,s[2]=(g-R)*A,s[3]=0,s[4]=(d-M)*S,s[5]=(1-(h+m))*S,s[6]=(p+w)*S,s[7]=0,s[8]=(g+R)*I,s[9]=(p-w)*I,s[10]=(1-(h+v))*I,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){let s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),e.identity(),this;let o=fs.set(s[0],s[1],s[2]).length(),a=fs.set(s[4],s[5],s[6]).length(),c=fs.set(s[8],s[9],s[10]).length();r<0&&(o=-o),kn.copy(this);let l=1/o,u=1/a,f=1/c;return kn.elements[0]*=l,kn.elements[1]*=l,kn.elements[2]*=l,kn.elements[4]*=u,kn.elements[5]*=u,kn.elements[6]*=u,kn.elements[8]*=f,kn.elements[9]*=f,kn.elements[10]*=f,e.setFromRotationMatrix(kn),n.x=o,n.y=a,n.z=c,this}makePerspective(t,e,n,s,r,o,a=Wn,c=!1){let l=this.elements,u=2*r/(e-t),f=2*r/(n-s),h=(e+t)/(e-t),d=(n+s)/(n-s),g,v;if(c)g=r/(o-r),v=o*r/(o-r);else if(a===Wn)g=-(o+r)/(o-r),v=-2*o*r/(o-r);else if(a===Es)g=-o/(o-r),v=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=u,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=f,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=v,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=Wn,c=!1){let l=this.elements,u=2/(e-t),f=2/(n-s),h=-(e+t)/(e-t),d=-(n+s)/(n-s),g,v;if(c)g=1/(o-r),v=o/(o-r);else if(a===Wn)g=-2/(o-r),v=-(o+r)/(o-r);else if(a===Es)g=-1/(o-r),v=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=u,l[4]=0,l[8]=0,l[12]=h,l[1]=0,l[5]=f,l[9]=0,l[13]=d,l[2]=0,l[6]=0,l[10]=g,l[14]=v,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}},fs=new O,kn=new Ce,bf=new O(0,0,0),Mf=new O(1,1,1),wi=new O,co=new O,wn=new O,Gh=new Ce,Hh=new ti,xi=class i{constructor(t=0,e=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let s=t.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],u=s[9],f=s[2],h=s[6],d=s[10];switch(e){case"XYZ":this._y=Math.asin(ue(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,d),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(h,l),this._z=0);break;case"YXZ":this._x=Math.asin(-ue(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(ue(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-f,d),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-ue(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(h,d),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(ue(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-ue(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(h,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-u,d),this._y=0);break;default:te("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Gh.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Gh,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Hh.setFromEuler(this),this.setFromQuaternion(Hh,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};xi.DEFAULT_ORDER="XYZ";var Is=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},Sf=0,Wh=new O,ps=new ti,hi=new Ce,ho=new O,ar=new O,wf=new O,Tf=new ti,Xh=new O(1,0,0),qh=new O(0,1,0),Yh=new O(0,0,1),$h={type:"added"},Af={type:"removed"},ms={type:"childadded",child:null},Yl={type:"childremoved",child:null},Je=class i extends Qn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Sf++}),this.uuid=Ws(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let t=new O,e=new xi,n=new ti,s=new O(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Ce},normalMatrix:{value:new oe}}),this.matrix=new Ce,this.matrixWorld=new Ce,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Is,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return ps.setFromAxisAngle(t,e),this.quaternion.multiply(ps),this}rotateOnWorldAxis(t,e){return ps.setFromAxisAngle(t,e),this.quaternion.premultiply(ps),this}rotateX(t){return this.rotateOnAxis(Xh,t)}rotateY(t){return this.rotateOnAxis(qh,t)}rotateZ(t){return this.rotateOnAxis(Yh,t)}translateOnAxis(t,e){return Wh.copy(t).applyQuaternion(this.quaternion),this.position.add(Wh.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Xh,t)}translateY(t){return this.translateOnAxis(qh,t)}translateZ(t){return this.translateOnAxis(Yh,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(hi.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?ho.copy(t):ho.set(t,e,n);let s=this.parent;this.updateWorldMatrix(!0,!1),ar.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?hi.lookAt(ar,ho,this.up):hi.lookAt(ho,ar,this.up),this.quaternion.setFromRotationMatrix(hi),s&&(hi.extractRotation(s.matrixWorld),ps.setFromRotationMatrix(hi),this.quaternion.premultiply(ps.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(ne("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent($h),ms.child=t,this.dispatchEvent(ms),ms.child=null):ne("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Af),Yl.child=t,this.dispatchEvent(Yl),Yl.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),hi.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),hi.multiply(t.parent.matrixWorld)),t.applyMatrix4(hi),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent($h),ms.child=t,this.dispatchEvent(ms),ms.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){let o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ar,t,wf),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ar,Tf,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(t){t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let e=t.x,n=t.y,s=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*n-r[8]*s,r[13]+=n-r[1]*e-r[5]*n-r[9]*s,r[14]+=s-r[2]*e-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e,n=!1){let s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),e===!0){let r=this.children;for(let o=0,a=r.length;o<a;o++)r[o].updateWorldMatrix(!1,!0,n)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let c=a.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){let f=c[l];r(t.shapes,f)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(t.materials,this.material[c]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let c=this.animations[a];s.animations.push(r(t.animations,c))}}if(e){let a=o(t.geometries),c=o(t.materials),l=o(t.textures),u=o(t.images),f=o(t.shapes),h=o(t.skeletons),d=o(t.animations),g=o(t.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),u.length>0&&(n.images=u),f.length>0&&(n.shapes=f),h.length>0&&(n.skeletons=h),d.length>0&&(n.animations=d),g.length>0&&(n.nodes=g)}return n.object=s,n;function o(a){let c=[];for(let l in a){let u=a[l];delete u.metadata,c.push(u)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let s=t.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};Je.DEFAULT_UP=new O(0,1,0);Je.DEFAULT_MATRIX_AUTO_UPDATE=!0;Je.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var $e=class extends Je{constructor(){super(),this.isGroup=!0,this.type="Group"}},Ef={type:"move"},Ps=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new $e,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new $e,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new O,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new O),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new $e,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new O,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new O,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null,a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(let v of t.hand.values()){let p=e.getJointPose(v,n),m=this._getHandJoint(l,v);p!==null&&(m.matrix.fromArray(p.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=p.radius),m.visible=p!==null}let u=l.joints["index-finger-tip"],f=l.joints["thumb-tip"],h=u.position.distanceTo(f.position),d=.02,g=.005;l.inputState.pinching&&h>d+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&h<=d-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:t,target:this})));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Ef)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new $e;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},td={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ti={h:0,s:0,l:0},uo={h:0,s:0,l:0};function $l(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}var re=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=hn){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,pe.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=pe.workingColorSpace){return this.r=t,this.g=e,this.b=n,pe.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=pe.workingColorSpace){if(t=xf(t,1),e=ue(e,0,1),n=ue(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=$l(o,r,t+1/3),this.g=$l(o,r,t),this.b=$l(o,r,t-1/3)}return pe.colorSpaceToWorking(this,s),this}setStyle(t,e=hn){function n(r){r!==void 0&&parseFloat(r)<1&&te("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:te("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);te("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=hn){let n=td[t.toLowerCase()];return n!==void 0?this.setHex(n,e):te("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=gi(t.r),this.g=gi(t.g),this.b=gi(t.b),this}copyLinearToSRGB(t){return this.r=Ts(t.r),this.g=Ts(t.g),this.b=Ts(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=hn){return pe.workingToColorSpace(sn.copy(this),t),Math.round(ue(sn.r*255,0,255))*65536+Math.round(ue(sn.g*255,0,255))*256+Math.round(ue(sn.b*255,0,255))}getHexString(t=hn){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=pe.workingColorSpace){pe.workingToColorSpace(sn.copy(this),e);let n=sn.r,s=sn.g,r=sn.b,o=Math.max(n,s,r),a=Math.min(n,s,r),c,l,u=(a+o)/2;if(a===o)c=0,l=0;else{let f=o-a;switch(l=u<=.5?f/(o+a):f/(2-o-a),o){case n:c=(s-r)/f+(s<r?6:0);break;case s:c=(r-n)/f+2;break;case r:c=(n-s)/f+4;break}c/=6}return t.h=c,t.s=l,t.l=u,t}getRGB(t,e=pe.workingColorSpace){return pe.workingToColorSpace(sn.copy(this),e),t.r=sn.r,t.g=sn.g,t.b=sn.b,t}getStyle(t=hn){pe.workingToColorSpace(sn.copy(this),t);let e=sn.r,n=sn.g,s=sn.b;return t!==hn?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(Ti),this.setHSL(Ti.h+t,Ti.s+e,Ti.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Ti),t.getHSL(uo);let n=Gl(Ti.h,uo.h,e),s=Gl(Ti.s,uo.s,e),r=Gl(Ti.l,uo.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},sn=new re;re.NAMES=td;var Ls=class extends Je{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new xi,this.environmentIntensity=1,this.environmentRotation=new xi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}},Vn=new O,ui=new O,Zl=new O,di=new O,gs=new O,xs=new O,Zh=new O,Jl=new O,Kl=new O,jl=new O,Ql=new Ue,tc=new Ue,ec=new Ue,mi=class i{constructor(t=new O,e=new O,n=new O){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),Vn.subVectors(t,e),s.cross(Vn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){Vn.subVectors(s,e),ui.subVectors(n,e),Zl.subVectors(t,e);let o=Vn.dot(Vn),a=Vn.dot(ui),c=Vn.dot(Zl),l=ui.dot(ui),u=ui.dot(Zl),f=o*l-a*a;if(f===0)return r.set(0,0,0),null;let h=1/f,d=(l*c-a*u)*h,g=(o*u-a*c)*h;return r.set(1-d-g,g,d)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,di)===null?!1:di.x>=0&&di.y>=0&&di.x+di.y<=1}static getInterpolation(t,e,n,s,r,o,a,c){return this.getBarycoord(t,e,n,s,di)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,di.x),c.addScaledVector(o,di.y),c.addScaledVector(a,di.z),c)}static getInterpolatedAttribute(t,e,n,s,r,o){return Ql.setScalar(0),tc.setScalar(0),ec.setScalar(0),Ql.fromBufferAttribute(t,e),tc.fromBufferAttribute(t,n),ec.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(Ql,r.x),o.addScaledVector(tc,r.y),o.addScaledVector(ec,r.z),o}static isFrontFacing(t,e,n,s){return Vn.subVectors(n,e),ui.subVectors(t,e),Vn.cross(ui).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Vn.subVectors(this.c,this.b),ui.subVectors(this.a,this.b),Vn.cross(ui).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return i.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return i.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return i.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return i.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return i.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,s=this.b,r=this.c,o,a;gs.subVectors(s,n),xs.subVectors(r,n),Jl.subVectors(t,n);let c=gs.dot(Jl),l=xs.dot(Jl);if(c<=0&&l<=0)return e.copy(n);Kl.subVectors(t,s);let u=gs.dot(Kl),f=xs.dot(Kl);if(u>=0&&f<=u)return e.copy(s);let h=c*f-u*l;if(h<=0&&c>=0&&u<=0)return o=c/(c-u),e.copy(n).addScaledVector(gs,o);jl.subVectors(t,r);let d=gs.dot(jl),g=xs.dot(jl);if(g>=0&&d<=g)return e.copy(r);let v=d*l-c*g;if(v<=0&&l>=0&&g<=0)return a=l/(l-g),e.copy(n).addScaledVector(xs,a);let p=u*g-d*f;if(p<=0&&f-u>=0&&d-g>=0)return Zh.subVectors(r,s),a=(f-u)/(f-u+(d-g)),e.copy(s).addScaledVector(Zh,a);let m=1/(p+v+h);return o=v*m,a=h*m,e.copy(n).addScaledVector(gs,o).addScaledVector(xs,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},ei=class{constructor(t=new O(1/0,1/0,1/0),e=new O(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Gn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Gn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=Gn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,Gn):Gn.fromBufferAttribute(r,o),Gn.applyMatrix4(t.matrixWorld),this.expandByPoint(Gn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),fo.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),fo.copy(n.boundingBox)),fo.applyMatrix4(t.matrixWorld),this.union(fo)}let s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Gn),Gn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(lr),po.subVectors(this.max,lr),_s.subVectors(t.a,lr),ys.subVectors(t.b,lr),vs.subVectors(t.c,lr),Ai.subVectors(ys,_s),Ei.subVectors(vs,ys),Yi.subVectors(_s,vs);let e=[0,-Ai.z,Ai.y,0,-Ei.z,Ei.y,0,-Yi.z,Yi.y,Ai.z,0,-Ai.x,Ei.z,0,-Ei.x,Yi.z,0,-Yi.x,-Ai.y,Ai.x,0,-Ei.y,Ei.x,0,-Yi.y,Yi.x,0];return!nc(e,_s,ys,vs,po)||(e=[1,0,0,0,1,0,0,0,1],!nc(e,_s,ys,vs,po))?!1:(mo.crossVectors(Ai,Ei),e=[mo.x,mo.y,mo.z],nc(e,_s,ys,vs,po))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Gn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Gn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(fi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),fi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),fi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),fi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),fi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),fi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),fi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),fi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(fi),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},fi=[new O,new O,new O,new O,new O,new O,new O,new O],Gn=new O,fo=new ei,_s=new O,ys=new O,vs=new O,Ai=new O,Ei=new O,Yi=new O,lr=new O,po=new O,mo=new O,$i=new O;function nc(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){$i.fromArray(i,r);let a=s.x*Math.abs($i.x)+s.y*Math.abs($i.y)+s.z*Math.abs($i.z),c=t.dot($i),l=e.dot($i),u=n.dot($i);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>a)return!1}return!0}var Ve=new O,go=new vt,Cf=0,gn=class extends Qn{constructor(t,e,n=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Cf++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Zu,this.updateRanges=[],this.gpuType=Yn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)go.fromBufferAttribute(this,e),go.applyMatrix3(t),this.setXY(e,go.x,go.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Ve.fromBufferAttribute(this,e),Ve.applyMatrix3(t),this.setXYZ(e,Ve.x,Ve.y,Ve.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Ve.fromBufferAttribute(this,e),Ve.applyMatrix4(t),this.setXYZ(e,Ve.x,Ve.y,Ve.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ve.fromBufferAttribute(this,e),Ve.applyNormalMatrix(t),this.setXYZ(e,Ve.x,Ve.y,Ve.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ve.fromBufferAttribute(this,e),Ve.transformDirection(t),this.setXYZ(e,Ve.x,Ve.y,Ve.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=or(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=pn(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=or(e,this.array)),e}setX(t,e){return this.normalized&&(e=pn(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=or(e,this.array)),e}setY(t,e){return this.normalized&&(e=pn(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=or(e,this.array)),e}setZ(t,e){return this.normalized&&(e=pn(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=or(e,this.array)),e}setW(t,e){return this.normalized&&(e=pn(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=pn(e,this.array),n=pn(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=pn(e,this.array),n=pn(n,this.array),s=pn(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=pn(e,this.array),n=pn(n,this.array),s=pn(s,this.array),r=pn(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}};var vr=class extends gn{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var br=class extends gn{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var Be=class extends gn{constructor(t,e,n){super(new Float32Array(t),e,n)}},Rf=new ei,cr=new O,ic=new O,Qi=class{constructor(t=new O,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):Rf.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;cr.subVectors(t,this.center);let e=cr.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(cr,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(ic.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(cr.copy(t.center).add(ic)),this.expandByPoint(cr.copy(t.center).sub(ic))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},If=0,Ln=new Ce,sc=new Je,bs=new O,Tn=new ei,hr=new ei,qe=new O,rn=class i extends Qn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:If++}),this.uuid=Ws(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(mf(t)?br:vr)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new oe().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return Ln.makeRotationFromQuaternion(t),this.applyMatrix4(Ln),this}rotateX(t){return Ln.makeRotationX(t),this.applyMatrix4(Ln),this}rotateY(t){return Ln.makeRotationY(t),this.applyMatrix4(Ln),this}rotateZ(t){return Ln.makeRotationZ(t),this.applyMatrix4(Ln),this}translate(t,e,n){return Ln.makeTranslation(t,e,n),this.applyMatrix4(Ln),this}scale(t,e,n){return Ln.makeScale(t,e,n),this.applyMatrix4(Ln),this}lookAt(t){return sc.lookAt(t),sc.updateMatrix(),this.applyMatrix4(sc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(bs).negate(),this.translate(bs.x,bs.y,bs.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let s=0,r=t.length;s<r;s++){let o=t[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Be(n,3))}else{let n=Math.min(t.length,e.count);for(let s=0;s<n;s++){let r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&te("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ei);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){ne("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new O(-1/0,-1/0,-1/0),new O(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){let r=e[n];Tn.setFromBufferAttribute(r),this.morphTargetsRelative?(qe.addVectors(this.boundingBox.min,Tn.min),this.boundingBox.expandByPoint(qe),qe.addVectors(this.boundingBox.max,Tn.max),this.boundingBox.expandByPoint(qe)):(this.boundingBox.expandByPoint(Tn.min),this.boundingBox.expandByPoint(Tn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&ne('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Qi);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){ne("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new O,1/0);return}if(t){let n=this.boundingSphere.center;if(Tn.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){let a=e[r];hr.setFromBufferAttribute(a),this.morphTargetsRelative?(qe.addVectors(Tn.min,hr.min),Tn.expandByPoint(qe),qe.addVectors(Tn.max,hr.max),Tn.expandByPoint(qe)):(Tn.expandByPoint(hr.min),Tn.expandByPoint(hr.max))}Tn.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)qe.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(qe));if(e)for(let r=0,o=e.length;r<o;r++){let a=e[r],c=this.morphTargetsRelative;for(let l=0,u=a.count;l<u;l++)qe.fromBufferAttribute(a,l),c&&(bs.fromBufferAttribute(t,l),qe.add(bs)),s=Math.max(s,n.distanceToSquared(qe))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&ne('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){ne("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,s=e.normal,r=e.uv,o=this.getAttribute("tangent");(o===void 0||o.count!==n.count)&&(o=new gn(new Float32Array(4*n.count),4),this.setAttribute("tangent",o));let a=[],c=[];for(let _=0;_<n.count;_++)a[_]=new O,c[_]=new O;let l=new O,u=new O,f=new O,h=new vt,d=new vt,g=new vt,v=new O,p=new O;function m(_,E,N){l.fromBufferAttribute(n,_),u.fromBufferAttribute(n,E),f.fromBufferAttribute(n,N),h.fromBufferAttribute(r,_),d.fromBufferAttribute(r,E),g.fromBufferAttribute(r,N),u.sub(l),f.sub(l),d.sub(h),g.sub(h);let P=1/(d.x*g.y-g.x*d.y);isFinite(P)&&(v.copy(u).multiplyScalar(g.y).addScaledVector(f,-d.y).multiplyScalar(P),p.copy(f).multiplyScalar(d.x).addScaledVector(u,-g.x).multiplyScalar(P),a[_].add(v),a[E].add(v),a[N].add(v),c[_].add(p),c[E].add(p),c[N].add(p))}let w=this.groups;w.length===0&&(w=[{start:0,count:t.count}]);for(let _=0,E=w.length;_<E;++_){let N=w[_],P=N.start,k=N.count;for(let W=P,U=P+k;W<U;W+=3)m(t.getX(W+0),t.getX(W+1),t.getX(W+2))}let R=new O,M=new O,A=new O,S=new O;function I(_){A.fromBufferAttribute(s,_),S.copy(A);let E=a[_];R.copy(E),R.sub(A.multiplyScalar(A.dot(E))).normalize(),M.crossVectors(S,E);let P=M.dot(c[_])<0?-1:1;o.setXYZW(_,R.x,R.y,R.z,P)}for(let _=0,E=w.length;_<E;++_){let N=w[_],P=N.start,k=N.count;for(let W=P,U=P+k;W<U;W+=3)I(t.getX(W+0)),I(t.getX(W+1)),I(t.getX(W+2))}this._transformed=!0}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==e.count)n=new gn(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let h=0,d=n.count;h<d;h++)n.setXYZ(h,0,0,0);let s=new O,r=new O,o=new O,a=new O,c=new O,l=new O,u=new O,f=new O;if(t)for(let h=0,d=t.count;h<d;h+=3){let g=t.getX(h+0),v=t.getX(h+1),p=t.getX(h+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,v),o.fromBufferAttribute(e,p),u.subVectors(o,r),f.subVectors(s,r),u.cross(f),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,v),l.fromBufferAttribute(n,p),a.add(u),c.add(u),l.add(u),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(v,c.x,c.y,c.z),n.setXYZ(p,l.x,l.y,l.z)}else for(let h=0,d=e.count;h<d;h+=3)s.fromBufferAttribute(e,h+0),r.fromBufferAttribute(e,h+1),o.fromBufferAttribute(e,h+2),u.subVectors(o,r),f.subVectors(s,r),u.cross(f),n.setXYZ(h+0,u.x,u.y,u.z),n.setXYZ(h+1,u.x,u.y,u.z),n.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)qe.fromBufferAttribute(t,e),qe.normalize(),t.setXYZ(e,qe.x,qe.y,qe.z)}toNonIndexed(){function t(a,c){let l=a.array,u=a.itemSize,f=a.normalized,h=new l.constructor(c.length*u),d=0,g=0;for(let v=0,p=c.length;v<p;v++){a.isInterleavedBufferAttribute?d=c[v]*a.data.stride+a.offset:d=c[v]*u;for(let m=0;m<u;m++)h[g++]=l[d++]}return new gn(h,u,f)}if(this.index===null)return te("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new i,n=this.index.array,s=this.attributes;for(let a in s){let c=s[a],l=t(c,n);e.setAttribute(a,l)}let r=this.morphAttributes;for(let a in r){let c=[],l=r[a];for(let u=0,f=l.length;u<f;u++){let h=l[u],d=t(h,n);c.push(d)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,c=o.length;a<c;a++){let l=o[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let c in n){let l=n[c];t.data.attributes[c]=l.toJSON(t.data)}let s={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],u=[];for(let f=0,h=l.length;f<h;f++){let d=l[f];u.push(d.toJSON(t.data))}u.length>0&&(s[c]=u,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone());let s=t.attributes;for(let l in s){let u=s[l];this.setAttribute(l,u.clone(e))}let r=t.morphAttributes;for(let l in r){let u=[],f=r[l];for(let h=0,d=f.length;h<d;h++)u.push(f[h].clone(e));this.morphAttributes[l]=u}this.morphTargetsRelative=t.morphTargetsRelative;let o=t.groups;for(let l=0,u=o.length;l<u;l++){let f=o[l];this.addGroup(f.start,f.count,f.materialIndex)}let a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());let c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}};var rc=new O,Pf=new O,Lf=new oe,Hn=class{constructor(t=new O(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let s=rc.subVectors(n,e).cross(Pf.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,n=!0){let s=t.delta(rc),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let o=-(t.start.dot(this.normal)+this.constant)/r;return n===!0&&(o<0||o>1)?null:e.copy(t.start).addScaledVector(s,o)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||Lf.getNormalMatrix(t),s=this.coplanarPoint(rc).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}},Df=0,ni=class extends Qn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Df++}),this.uuid=Ws(),this.name="",this.type="Material",this.blending=Vs,this.side=Fi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Pc,this.blendDst=Lc,this.blendEquation=ss,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new re(0,0,0),this.blendAlpha=0,this.depthFunc=As,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=dl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Oo,this.stencilZFail=Oo,this.stencilZPass=Oo,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){te(`Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){te(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let o=[];for(let a in r){let c=r[a];delete c.metadata,o.push(c)}return o}if(e){let r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new re().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(n=>new Hn().fromJSON(n))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let n=t.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new vt().fromArray(n)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new vt().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}};var pi=new O,oc=new O,xo=new O,_o=new O,Ds=class{constructor(t=new O,e=new O(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,pi)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=pi.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(pi.copy(this.origin).addScaledVector(this.direction,e),pi.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){oc.copy(t).add(e).multiplyScalar(.5),xo.copy(e).sub(t).normalize(),_o.copy(this.origin).sub(oc);let r=t.distanceTo(e)*.5,o=-this.direction.dot(xo),a=_o.dot(this.direction),c=-_o.dot(xo),l=_o.lengthSq(),u=Math.abs(1-o*o),f,h,d,g;if(u>0)if(f=o*c-a,h=o*a-c,g=r*u,f>=0)if(h>=-g)if(h<=g){let v=1/u;f*=v,h*=v,d=f*(f+o*h+2*a)+h*(o*f+h+2*c)+l}else h=r,f=Math.max(0,-(o*h+a)),d=-f*f+h*(h+2*c)+l;else h=-r,f=Math.max(0,-(o*h+a)),d=-f*f+h*(h+2*c)+l;else h<=-g?(f=Math.max(0,-(-o*r+a)),h=f>0?-r:Math.min(Math.max(-r,-c),r),d=-f*f+h*(h+2*c)+l):h<=g?(f=0,h=Math.min(Math.max(-r,-c),r),d=h*(h+2*c)+l):(f=Math.max(0,-(o*r+a)),h=f>0?r:Math.min(Math.max(-r,-c),r),d=-f*f+h*(h+2*c)+l);else h=o>0?-r:r,f=Math.max(0,-(o*h+a)),d=-f*f+h*(h+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,f),s&&s.copy(oc).addScaledVector(xo,h),d}intersectSphere(t,e){if(t.radius<0)return null;pi.subVectors(t.center,this.origin);let n=pi.dot(this.direction),s=pi.dot(pi)-n*n,r=t.radius*t.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,c,l=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,h=this.origin;return l>=0?(n=(t.min.x-h.x)*l,s=(t.max.x-h.x)*l):(n=(t.max.x-h.x)*l,s=(t.min.x-h.x)*l),u>=0?(r=(t.min.y-h.y)*u,o=(t.max.y-h.y)*u):(r=(t.max.y-h.y)*u,o=(t.min.y-h.y)*u),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),f>=0?(a=(t.min.z-h.z)*f,c=(t.max.z-h.z)*f):(a=(t.max.z-h.z)*f,c=(t.min.z-h.z)*f),n>c||a>s)||((a>n||n!==n)&&(n=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,pi)!==null}intersectTriangle(t,e,n,s,r){let o=this.origin,a=this.direction,c=a.x,l=a.y,u=a.z,f=t.x-o.x,h=t.y-o.y,d=t.z-o.z,g=e.x-o.x,v=e.y-o.y,p=e.z-o.z,m=n.x-o.x,w=n.y-o.y,R=n.z-o.z,M=Math.abs(c),A=Math.abs(l),S=Math.abs(u),I,_,E,N,P,k,W,U,B,Y,D,Q;if(M>=A&&M>=S?(E=c,k=f,B=g,Q=m,c>=0?(I=l,_=u,N=h,P=d,W=v,U=p,Y=w,D=R):(I=u,_=l,N=d,P=h,W=p,U=v,Y=R,D=w)):A>=S?(E=l,k=h,B=v,Q=w,l>=0?(I=u,_=c,N=d,P=f,W=p,U=g,Y=R,D=m):(I=c,_=u,N=f,P=d,W=g,U=p,Y=m,D=R)):(E=u,k=d,B=p,Q=R,u>=0?(I=c,_=l,N=f,P=h,W=g,U=v,Y=m,D=w):(I=l,_=c,N=h,P=f,W=v,U=g,Y=w,D=m)),E===0)return null;let X=I/E,q=_/E,tt=1/E,pt=N-X*k,lt=P-q*k,Kt=W-X*B,Ct=U-q*B,Jt=Y-X*Q,nt=D-q*Q,at=Jt*Ct-nt*Kt,bt=pt*nt-lt*Jt,Vt=Kt*lt-Ct*pt;if(s){if(at<0||bt<0||Vt<0)return null}else if((at<0||bt<0||Vt<0)&&(at>0||bt>0||Vt>0))return null;let dt=at+bt+Vt;if(dt===0)return null;let Bt=tt*(at*k+bt*B+Vt*Q);return(dt>0?Bt<0:Bt>0)?null:this.at(Bt/dt,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Dn=class extends ni{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new re(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new xi,this.combine=Dc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},Jh=new Ce,Zi=new Ds,yo=new Qi,Kh=new O,vo=new O,bo=new O,Mo=new O,ac=new O,So=new O,jh=new O,wo=new O,Ne=class extends Je{constructor(t=new rn,e=new Dn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);let a=this.morphTargetInfluences;if(r&&a){So.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let u=a[c],f=r[c];u!==0&&(ac.fromBufferAttribute(f,t),o?So.addScaledVector(ac,u):So.addScaledVector(ac.sub(e),u))}e.add(So)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),yo.copy(n.boundingSphere),yo.applyMatrix4(r),Zi.copy(t.ray).recast(t.near),!(yo.containsPoint(Zi.origin)===!1&&(Zi.intersectSphere(yo,Kh)===null||Zi.origin.distanceToSquared(Kh)>(t.far-t.near)**2))&&(Jh.copy(r).invert(),Zi.copy(t.ray).applyMatrix4(Jh),!(n.boundingBox!==null&&Zi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Zi)))}_computeIntersections(t,e,n){let s,r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,u=r.attributes.uv1,f=r.attributes.normal,h=r.groups,d=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,v=h.length;g<v;g++){let p=h[g],m=o[p.materialIndex],w=Math.max(p.start,d.start),R=Math.min(a.count,Math.min(p.start+p.count,d.start+d.count));for(let M=w,A=R;M<A;M+=3){let S=a.getX(M),I=a.getX(M+1),_=a.getX(M+2);s=To(this,m,t,n,l,u,f,S,I,_),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=p.materialIndex,e.push(s))}}else{let g=Math.max(0,d.start),v=Math.min(a.count,d.start+d.count);for(let p=g,m=v;p<m;p+=3){let w=a.getX(p),R=a.getX(p+1),M=a.getX(p+2);s=To(this,o,t,n,l,u,f,w,R,M),s&&(s.faceIndex=Math.floor(p/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,v=h.length;g<v;g++){let p=h[g],m=o[p.materialIndex],w=Math.max(p.start,d.start),R=Math.min(c.count,Math.min(p.start+p.count,d.start+d.count));for(let M=w,A=R;M<A;M+=3){let S=M,I=M+1,_=M+2;s=To(this,m,t,n,l,u,f,S,I,_),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=p.materialIndex,e.push(s))}}else{let g=Math.max(0,d.start),v=Math.min(c.count,d.start+d.count);for(let p=g,m=v;p<m;p+=3){let w=p,R=p+1,M=p+2;s=To(this,o,t,n,l,u,f,w,R,M),s&&(s.faceIndex=Math.floor(p/3),e.push(s))}}}};function Nf(i,t,e,n,s,r,o,a){let c;if(t.side===Ke?c=n.intersectTriangle(o,r,s,!0,a):c=n.intersectTriangle(s,r,o,t.side===Fi,a),c===null)return null;wo.copy(a),wo.applyMatrix4(i.matrixWorld);let l=e.ray.origin.distanceTo(wo);return l<e.near||l>e.far?null:{distance:l,point:wo.clone(),object:i}}function To(i,t,e,n,s,r,o,a,c,l){i.getVertexPosition(a,vo),i.getVertexPosition(c,bo),i.getVertexPosition(l,Mo);let u=Nf(i,t,e,n,vo,bo,Mo,jh);if(u){let f=new O;mi.getBarycoord(jh,vo,bo,Mo,f),s&&(u.uv=mi.getInterpolatedAttribute(s,a,c,l,f,new vt)),r&&(u.uv1=mi.getInterpolatedAttribute(r,a,c,l,f,new vt)),o&&(u.normal=mi.getInterpolatedAttribute(o,a,c,l,f,new O),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));let h={a,b:c,c:l,normal:new O,materialIndex:0};mi.getNormal(vo,bo,Mo,h.normal),u.face=h,u.barycoord=f}return u}var Qo=class extends xn{constructor(t=null,e=1,n=1,s,r,o,a,c,l=Ye,u=Ye,f,h){super(null,o,a,c,l,u,s,r,f,h),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Ji=new Qi,Uf=new vt(.5,.5),Ao=new O,Ns=class{constructor(t=new Hn,e=new Hn,n=new Hn,s=new Hn,r=new Hn,o=new Hn){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){let a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Wn,n=!1){let s=this.planes,r=t.elements,o=r[0],a=r[1],c=r[2],l=r[3],u=r[4],f=r[5],h=r[6],d=r[7],g=r[8],v=r[9],p=r[10],m=r[11],w=r[12],R=r[13],M=r[14],A=r[15];if(s[0].setComponents(l-o,d-u,m-g,A-w).normalize(),s[1].setComponents(l+o,d+u,m+g,A+w).normalize(),s[2].setComponents(l+a,d+f,m+v,A+R).normalize(),s[3].setComponents(l-a,d-f,m-v,A-R).normalize(),n)s[4].setComponents(c,h,p,M).normalize(),s[5].setComponents(l-c,d-h,m-p,A-M).normalize();else if(s[4].setComponents(l-c,d-h,m-p,A-M).normalize(),e===Wn)s[5].setComponents(l+c,d+h,m+p,A+M).normalize();else if(e===Es)s[5].setComponents(c,h,p,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Ji.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Ji.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Ji)}intersectsSprite(t){Ji.center.set(0,0,0);let e=Uf.distanceTo(t.center);return Ji.radius=.7071067811865476+e,Ji.applyMatrix4(t.matrixWorld),this.intersectsSphere(Ji)}intersectsSphere(t){let e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let s=e[n];if(Ao.x=s.normal.x>0?t.max.x:t.min.x,Ao.y=s.normal.y>0?t.max.y:t.min.y,Ao.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Ao)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var Ri=class extends ni{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new re(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}},ta=new O,ea=new O,Qh=new Ce,ur=new Ds,Eo=new Qi,lc=new O,tu=new O,na=class extends Je{constructor(t=new rn,e=new Ri){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)ta.fromBufferAttribute(e,s-1),ea.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=ta.distanceTo(ea);t.setAttribute("lineDistance",new Be(n,1))}else te("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Eo.copy(n.boundingSphere),Eo.applyMatrix4(s),Eo.radius+=r,t.ray.intersectsSphere(Eo)===!1)return;Qh.copy(s).invert(),ur.copy(t.ray).applyMatrix4(Qh);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,u=n.index,h=n.attributes.position;if(u!==null){let d=Math.max(0,o.start),g=Math.min(u.count,o.start+o.count);for(let v=d,p=g-1;v<p;v+=l){let m=u.getX(v),w=u.getX(v+1),R=Co(this,t,ur,c,m,w,v);R&&e.push(R)}if(this.isLineLoop){let v=u.getX(g-1),p=u.getX(d),m=Co(this,t,ur,c,v,p,g-1);m&&e.push(m)}}else{let d=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let v=d,p=g-1;v<p;v+=l){let m=Co(this,t,ur,c,v,v+1,v);m&&e.push(m)}if(this.isLineLoop){let v=Co(this,t,ur,c,g-1,d,g-1);v&&e.push(v)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function Co(i,t,e,n,s,r,o){let a=i.geometry.attributes.position;if(ta.fromBufferAttribute(a,s),ea.fromBufferAttribute(a,r),e.distanceSqToSegment(ta,ea,lc,tu)>n)return;lc.applyMatrix4(i.matrixWorld);let l=t.ray.origin.distanceTo(lc);if(!(l<t.near||l>t.far))return{distance:l,point:tu.clone().applyMatrix4(i.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:i}}var eu=new O,nu=new O,Us=class extends na{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[];for(let s=0,r=e.count;s<r;s+=2)eu.fromBufferAttribute(e,s),nu.fromBufferAttribute(e,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+eu.distanceTo(nu);t.setAttribute("lineDistance",new Be(n,1))}else te("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var Mr=class extends xn{constructor(t=[],e=Oi,n,s,r,o,a,c,l,u){super(t,e,n,s,r,o,a,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}};var Ii=class extends xn{constructor(t,e,n=qn,s,r,o,a=Ye,c=Ye,l,u=jn,f=1){if(u!==jn&&u!==zi)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let h={width:t,height:e,depth:f};super(h,s,r,o,a,c,u,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Rs(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}},ia=class extends Ii{constructor(t,e=qn,n=Oi,s,r,o=Ye,a=Ye,c,l=jn){let u={width:t,height:t,depth:1},f=[u,u,u,u,u,u];super(t,t,e,n,s,r,o,a,c,l),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}},Sr=class extends xn{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}},Nn=class i extends rn{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let c=[],l=[],u=[],f=[],h=0,d=0;g("z","y","x",-1,-1,n,e,t,o,r,0),g("z","y","x",1,-1,n,e,-t,o,r,1),g("x","z","y",1,1,t,n,e,s,o,2),g("x","z","y",1,-1,t,n,-e,s,o,3),g("x","y","z",1,-1,t,e,n,s,r,4),g("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new Be(l,3)),this.setAttribute("normal",new Be(u,3)),this.setAttribute("uv",new Be(f,2));function g(v,p,m,w,R,M,A,S,I,_,E){let N=M/I,P=A/_,k=M/2,W=A/2,U=S/2,B=I+1,Y=_+1,D=0,Q=0,X=new O;for(let q=0;q<Y;q++){let tt=q*P-W;for(let pt=0;pt<B;pt++){let lt=pt*N-k;X[v]=lt*w,X[p]=tt*R,X[m]=U,l.push(X.x,X.y,X.z),X[v]=0,X[p]=0,X[m]=S>0?1:-1,u.push(X.x,X.y,X.z),f.push(pt/I),f.push(1-q/_),D+=1}}for(let q=0;q<_;q++)for(let tt=0;tt<I;tt++){let pt=h+tt+B*q,lt=h+tt+B*(q+1),Kt=h+(tt+1)+B*(q+1),Ct=h+(tt+1)+B*q;c.push(pt,lt,Ct),c.push(lt,Kt,Ct),Q+=6}a.addGroup(d,Q,E),d+=Q,h+=D}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};var Ro=new O,Io=new O,cc=new O,Po=new mi,wr=class extends rn{constructor(t=null,e=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:e},t!==null){let s=Math.pow(10,4),r=Math.cos(Bo*e),o=t.getIndex(),a=t.getAttribute("position"),c=o?o.count:a.count,l=[0,0,0],u=["a","b","c"],f=new Array(3),h={},d=[];for(let g=0;g<c;g+=3){o?(l[0]=o.getX(g),l[1]=o.getX(g+1),l[2]=o.getX(g+2)):(l[0]=g,l[1]=g+1,l[2]=g+2);let{a:v,b:p,c:m}=Po;if(v.fromBufferAttribute(a,l[0]),p.fromBufferAttribute(a,l[1]),m.fromBufferAttribute(a,l[2]),Po.getNormal(cc),f[0]=`${Math.round(v.x*s)},${Math.round(v.y*s)},${Math.round(v.z*s)}`,f[1]=`${Math.round(p.x*s)},${Math.round(p.y*s)},${Math.round(p.z*s)}`,f[2]=`${Math.round(m.x*s)},${Math.round(m.y*s)},${Math.round(m.z*s)}`,!(f[0]===f[1]||f[1]===f[2]||f[2]===f[0]))for(let w=0;w<3;w++){let R=(w+1)%3,M=f[w],A=f[R],S=Po[u[w]],I=Po[u[R]],_=`${M}_${A}`,E=`${A}_${M}`;E in h&&h[E]?(cc.dot(h[E].normal)<=r&&(d.push(S.x,S.y,S.z),d.push(I.x,I.y,I.z)),h[E]=null):_ in h||(h[_]={index0:l[w],index1:l[R],normal:cc.clone()})}}for(let g in h)if(h[g]){let{index0:v,index1:p}=h[g];Ro.fromBufferAttribute(a,v),Io.fromBufferAttribute(a,p),d.push(Ro.x,Ro.y,Ro.z),d.push(Io.x,Io.y,Io.z)}this.setAttribute("position",new Be(d,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}},An=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){te("Curve: .getPoint() not implemented.")}getPointAt(t,e){let n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],n,s=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){let n=this.getLengths(),s=0,r=n.length,o;e?o=e:o=t*n[r-1];let a=0,c=r-1,l;for(;a<=c;)if(s=Math.floor(a+(c-a)/2),l=n[s]-o,l<0)a=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,n[s]===o)return s/(r-1);let u=n[s],h=n[s+1]-u,d=(o-u)/h;return(s+d)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);let o=this.getPoint(s),a=this.getPoint(r),c=e||(o.isVector2?new vt:new O);return c.copy(a).sub(o).normalize(),c}getTangentAt(t,e){let n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e=!1){let n=new O,s=[],r=[],o=[],a=new O,c=new Ce;for(let d=0;d<=t;d++){let g=d/t;s[d]=this.getTangentAt(g,new O)}r[0]=new O,o[0]=new O;let l=Number.MAX_VALUE,u=Math.abs(s[0].x),f=Math.abs(s[0].y),h=Math.abs(s[0].z);u<=l&&(l=u,n.set(1,0,0)),f<=l&&(l=f,n.set(0,1,0)),h<=l&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let d=1;d<=t;d++){if(r[d]=r[d-1].clone(),o[d]=o[d-1].clone(),a.crossVectors(s[d-1],s[d]),a.length()>Number.EPSILON){a.normalize();let g=Math.acos(ue(s[d-1].dot(s[d]),-1,1));r[d].applyMatrix4(c.makeRotationAxis(a,g))}o[d].crossVectors(s[d],r[d])}if(e===!0){let d=Math.acos(ue(r[0].dot(r[t]),-1,1));d/=t,s[0].dot(a.crossVectors(r[0],r[t]))>0&&(d=-d);for(let g=1;g<=t;g++)r[g].applyMatrix4(c.makeRotationAxis(s[g],d*g)),o[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){let t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}},Fs=class extends An{constructor(t=0,e=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(t,e=new vt){let n=e,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);let a=this.aStartAngle+t*r,c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let u=Math.cos(this.aRotation),f=Math.sin(this.aRotation),h=c-this.aX,d=l-this.aY;c=h*u-d*f+this.aX,l=h*f+d*u+this.aY}return n.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},sa=class extends Fs{constructor(t,e,n,s,r,o){super(t,e,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}};function jc(){let i=0,t=0,e=0,n=0;function s(r,o,a,c){i=r,t=a,e=-3*r+3*o-2*a-c,n=2*r-2*o+a+c}return{initCatmullRom:function(r,o,a,c,l){s(o,a,l*(a-r),l*(c-o))},initNonuniformCatmullRom:function(r,o,a,c,l,u,f){let h=(o-r)/l-(a-r)/(l+u)+(a-o)/u,d=(a-o)/u-(c-o)/(u+f)+(c-a)/f;h*=u,d*=u,s(o,a,h,d)},calc:function(r){let o=r*r,a=o*r;return i+t*r+e*o+n*a}}}var iu=new O,su=new O,hc=new jc,uc=new jc,dc=new jc,ra=class extends An{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new O){let n=e,s=this.points,r=s.length,o=(r-(this.closed?0:1))*t,a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:c===0&&a===r-1&&(a=r-2,c=1);let l,u;this.closed||a>0?l=s[(a-1)%r]:(su.subVectors(s[0],s[1]).add(s[0]),l=su);let f=s[a%r],h=s[(a+1)%r];if(this.closed||a+2<r?u=s[(a+2)%r]:(iu.subVectors(s[r-1],s[r-2]).add(s[r-1]),u=iu),this.curveType==="centripetal"||this.curveType==="chordal"){let d=this.curveType==="chordal"?.5:.25,g=Math.pow(l.distanceToSquared(f),d),v=Math.pow(f.distanceToSquared(h),d),p=Math.pow(h.distanceToSquared(u),d);v<1e-4&&(v=1),g<1e-4&&(g=v),p<1e-4&&(p=v),hc.initNonuniformCatmullRom(l.x,f.x,h.x,u.x,g,v,p),uc.initNonuniformCatmullRom(l.y,f.y,h.y,u.y,g,v,p),dc.initNonuniformCatmullRom(l.z,f.z,h.z,u.z,g,v,p)}else this.curveType==="catmullrom"&&(hc.initCatmullRom(l.x,f.x,h.x,u.x,this.tension),uc.initCatmullRom(l.y,f.y,h.y,u.y,this.tension),dc.initCatmullRom(l.z,f.z,h.z,u.z,this.tension));return n.set(hc.calc(c),uc.calc(c),dc.calc(c)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new O().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function ru(i,t,e,n,s){let r=(n-t)*.5,o=(s-e)*.5,a=i*i,c=i*a;return(2*e-2*n+r+o)*c+(-3*e+3*n-2*r-o)*a+r*i+e}function Ff(i,t){let e=1-i;return e*e*t}function Of(i,t){return 2*(1-i)*i*t}function Bf(i,t){return i*i*t}function fr(i,t,e,n){return Ff(i,t)+Of(i,e)+Bf(i,n)}function zf(i,t){let e=1-i;return e*e*e*t}function kf(i,t){let e=1-i;return 3*e*e*i*t}function Vf(i,t){return 3*(1-i)*i*i*t}function Gf(i,t){return i*i*i*t}function pr(i,t,e,n,s){return zf(i,t)+kf(i,e)+Vf(i,n)+Gf(i,s)}var Tr=class extends An{constructor(t=new vt,e=new vt,n=new vt,s=new vt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new vt){let n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(pr(t,s.x,r.x,o.x,a.x),pr(t,s.y,r.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},oa=class extends An{constructor(t=new O,e=new O,n=new O,s=new O){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new O){let n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(pr(t,s.x,r.x,o.x,a.x),pr(t,s.y,r.y,o.y,a.y),pr(t,s.z,r.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Ar=class extends An{constructor(t=new vt,e=new vt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new vt){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new vt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},aa=class extends An{constructor(t=new O,e=new O){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new O){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new O){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Er=class extends An{constructor(t=new vt,e=new vt,n=new vt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new vt){let n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(fr(t,s.x,r.x,o.x),fr(t,s.y,r.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},la=class extends An{constructor(t=new O,e=new O,n=new O){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new O){let n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(fr(t,s.x,r.x,o.x),fr(t,s.y,r.y,o.y),fr(t,s.z,r.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Cr=class extends An{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new vt){let n=e,s=this.points,r=(s.length-1)*t,o=Math.floor(r),a=r-o,c=s[o===0?o:o-1],l=s[o],u=s[o>s.length-2?s.length-1:o+1],f=s[o>s.length-3?s.length-1:o+2];return n.set(ru(a,c.x,l.x,u.x,f.x),ru(a,c.y,l.y,u.y,f.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new vt().fromArray(s))}return this}},yc=Object.freeze({__proto__:null,ArcCurve:sa,CatmullRomCurve3:ra,CubicBezierCurve:Tr,CubicBezierCurve3:oa,EllipseCurve:Fs,LineCurve:Ar,LineCurve3:aa,QuadraticBezierCurve:Er,QuadraticBezierCurve3:la,SplineCurve:Cr}),ca=class extends An{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){let t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){let n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new yc[n](e,t))}return this}getPoint(t,e){let n=t*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=n){let o=s[r]-n,a=this.curves[r],c=a.getLength(),l=c===0?0:1-o/c;return a.getPointAt(l,e)}r++}return null}getLength(){let t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let t=[],e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){let e=[],n;for(let s=0,r=this.curves;s<r.length;s++){let o=r[s],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,c=o.getPoints(a);for(let l=0;l<c.length;l++){let u=c[l];n&&n.equals(u)||(e.push(u),n=u)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){let t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){let s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let s=t.curves[e];this.curves.push(new yc[s.type]().fromJSON(s))}return this}},Rr=class extends ca{constructor(t){super(),this.type="Path",this.currentPoint=new vt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){let n=new Ar(this.currentPoint.clone(),new vt(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){let r=new Er(this.currentPoint.clone(),new vt(t,e),new vt(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,r,o){let a=new Tr(this.currentPoint.clone(),new vt(t,e),new vt(n,s),new vt(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(t){let e=[this.currentPoint.clone()].concat(t),n=new Cr(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,r,o){let a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(t+a,e+c,n,s,r,o),this}absarc(t,e,n,s,r,o){return this.absellipse(t,e,n,n,s,r,o),this}ellipse(t,e,n,s,r,o,a,c){let l=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(t+l,e+u,n,s,r,o,a,c),this}absellipse(t,e,n,s,r,o,a,c){let l=new Fs(t,e,n,s,r,o,a,c);if(this.curves.length>0){let f=l.getPoint(0);f.equals(this.currentPoint)||this.lineTo(f.x,f.y)}this.curves.push(l);let u=l.getPoint(1);return this.currentPoint.copy(u),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){let t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}},ts=class extends Rr{constructor(t){super(t),this.uuid=Ws(),this.type="Shape",this.holes=[]}getPointsHoles(t){let e=[];for(let n=0,s=this.holes.length;n<s;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){let s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let s=t.holes[e];this.holes.push(new Rr().fromJSON(s))}return this}};function Hf(i,t,e=2){let n=t&&t.length,s=n?t[0]*e:i.length,r=ed(i,0,s,e,!0),o=[];if(!r||r.next===r.prev)return o;let a,c,l;if(n&&(r=$f(i,t,r,e)),i.length>80*e){a=i[0],c=i[1];let u=a,f=c;for(let h=e;h<s;h+=e){let d=i[h],g=i[h+1];d<a&&(a=d),g<c&&(c=g),d>u&&(u=d),g>f&&(f=g)}l=Math.max(u-a,f-c),l=l!==0?32767/l:0}return Ir(r,o,e,a,c,l,0),o}function ed(i,t,e,n,s){let r;if(s===rp(i,t,e,n)>0)for(let o=t;o<e;o+=n)r=ou(o/n|0,i[o],i[o+1],r);else for(let o=e-n;o>=t;o-=n)r=ou(o/n|0,i[o],i[o+1],r);return r&&Os(r,r.next)&&(Lr(r),r=r.next),r}function es(i,t){if(!i)return i;t||(t=i);let e=i,n;do if(n=!1,!e.steiner&&(Os(e,e.next)||Oe(e.prev,e,e.next)===0)){if(Lr(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function Ir(i,t,e,n,s,r,o){if(!i)return;!o&&r&&Qf(i,n,s,r);let a=i;for(;i.prev!==i.next;){let c=i.prev,l=i.next;if(r?Xf(i,n,s,r):Wf(i)){t.push(c.i,i.i,l.i),Lr(i),i=l.next,a=l.next;continue}if(i=l,i===a){o?o===1?(i=qf(es(i),t),Ir(i,t,e,n,s,r,2)):o===2&&Yf(i,t,e,n,s,r):Ir(es(i),t,e,n,s,r,1);break}}}function Wf(i){let t=i.prev,e=i,n=i.next;if(Oe(t,e,n)>=0)return!1;let s=t.x,r=e.x,o=n.x,a=t.y,c=e.y,l=n.y,u=Math.min(s,r,o),f=Math.min(a,c,l),h=Math.max(s,r,o),d=Math.max(a,c,l),g=n.next;for(;g!==t;){if(g.x>=u&&g.x<=h&&g.y>=f&&g.y<=d&&dr(s,a,r,c,o,l,g.x,g.y)&&Oe(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function Xf(i,t,e,n){let s=i.prev,r=i,o=i.next;if(Oe(s,r,o)>=0)return!1;let a=s.x,c=r.x,l=o.x,u=s.y,f=r.y,h=o.y,d=Math.min(a,c,l),g=Math.min(u,f,h),v=Math.max(a,c,l),p=Math.max(u,f,h),m=vc(d,g,t,e,n),w=vc(v,p,t,e,n),R=i.prevZ,M=i.nextZ;for(;R&&R.z>=m&&M&&M.z<=w;){if(R.x>=d&&R.x<=v&&R.y>=g&&R.y<=p&&R!==s&&R!==o&&dr(a,u,c,f,l,h,R.x,R.y)&&Oe(R.prev,R,R.next)>=0||(R=R.prevZ,M.x>=d&&M.x<=v&&M.y>=g&&M.y<=p&&M!==s&&M!==o&&dr(a,u,c,f,l,h,M.x,M.y)&&Oe(M.prev,M,M.next)>=0))return!1;M=M.nextZ}for(;R&&R.z>=m;){if(R.x>=d&&R.x<=v&&R.y>=g&&R.y<=p&&R!==s&&R!==o&&dr(a,u,c,f,l,h,R.x,R.y)&&Oe(R.prev,R,R.next)>=0)return!1;R=R.prevZ}for(;M&&M.z<=w;){if(M.x>=d&&M.x<=v&&M.y>=g&&M.y<=p&&M!==s&&M!==o&&dr(a,u,c,f,l,h,M.x,M.y)&&Oe(M.prev,M,M.next)>=0)return!1;M=M.nextZ}return!0}function qf(i,t){let e=i;do{let n=e.prev,s=e.next.next;!Os(n,s)&&id(n,e,e.next,s)&&Pr(n,s)&&Pr(s,n)&&(t.push(n.i,e.i,s.i),Lr(e),Lr(e.next),e=i=s),e=e.next}while(e!==i);return es(e)}function Yf(i,t,e,n,s,r){let o=i;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&np(o,a)){let c=sd(o,a);o=es(o,o.next),c=es(c,c.next),Ir(o,t,e,n,s,r,0),Ir(c,t,e,n,s,r,0);return}a=a.next}o=o.next}while(o!==i)}function $f(i,t,e,n){let s=[];for(let r=0,o=t.length;r<o;r++){let a=t[r]*n,c=r<o-1?t[r+1]*n:i.length,l=ed(i,a,c,n,!1);l===l.next&&(l.steiner=!0),s.push(ep(l))}s.sort(Zf);for(let r=0;r<s.length;r++)e=Jf(s[r],e);return e}function Zf(i,t){let e=i.x-t.x;if(e===0&&(e=i.y-t.y,e===0)){let n=(i.next.y-i.y)/(i.next.x-i.x),s=(t.next.y-t.y)/(t.next.x-t.x);e=n-s}return e}function Jf(i,t){let e=Kf(i,t);if(!e)return t;let n=sd(e,i);return es(n,n.next),es(e,e.next)}function Kf(i,t){let e=t,n=i.x,s=i.y,r=-1/0,o;if(Os(i,e))return e;do{if(Os(i,e.next))return e.next;if(s<=e.y&&s>=e.next.y&&e.next.y!==e.y){let f=e.x+(s-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(f<=n&&f>r&&(r=f,o=e.x<e.next.x?e:e.next,f===n))return o}e=e.next}while(e!==t);if(!o)return null;let a=o,c=o.x,l=o.y,u=1/0;e=o;do{if(n>=e.x&&e.x>=c&&n!==e.x&&nd(s<l?n:r,s,c,l,s<l?r:n,s,e.x,e.y)){let f=Math.abs(s-e.y)/(n-e.x);Pr(e,i)&&(f<u||f===u&&(e.x>o.x||e.x===o.x&&jf(o,e)))&&(o=e,u=f)}e=e.next}while(e!==a);return o}function jf(i,t){return Oe(i.prev,i,t.prev)<0&&Oe(t.next,i,i.next)<0}function Qf(i,t,e,n){let s=i;do s.z===0&&(s.z=vc(s.x,s.y,t,e,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,tp(s)}function tp(i){let t,e=1;do{let n=i,s;i=null;let r=null;for(t=0;n;){t++;let o=n,a=0;for(let l=0;l<e&&(a++,o=o.nextZ,!!o);l++);let c=e;for(;a>0||c>0&&o;)a!==0&&(c===0||!o||n.z<=o.z)?(s=n,n=n.nextZ,a--):(s=o,o=o.nextZ,c--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=o}r.nextZ=null,e*=2}while(t>1);return i}function vc(i,t,e,n,s){return i=(i-e)*s|0,t=(t-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,i|t<<1}function ep(i){let t=i,e=i;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==i);return e}function nd(i,t,e,n,s,r,o,a){return(s-o)*(t-a)>=(i-o)*(r-a)&&(i-o)*(n-a)>=(e-o)*(t-a)&&(e-o)*(r-a)>=(s-o)*(n-a)}function dr(i,t,e,n,s,r,o,a){return!(i===o&&t===a)&&nd(i,t,e,n,s,r,o,a)}function np(i,t){return i.next.i!==t.i&&i.prev.i!==t.i&&!ip(i,t)&&(Pr(i,t)&&Pr(t,i)&&sp(i,t)&&(Oe(i.prev,i,t.prev)||Oe(i,t.prev,t))||Os(i,t)&&Oe(i.prev,i,i.next)>0&&Oe(t.prev,t,t.next)>0)}function Oe(i,t,e){return(t.y-i.y)*(e.x-t.x)-(t.x-i.x)*(e.y-t.y)}function Os(i,t){return i.x===t.x&&i.y===t.y}function id(i,t,e,n){let s=Do(Oe(i,t,e)),r=Do(Oe(i,t,n)),o=Do(Oe(e,n,i)),a=Do(Oe(e,n,t));return!!(s!==r&&o!==a||s===0&&Lo(i,e,t)||r===0&&Lo(i,n,t)||o===0&&Lo(e,i,n)||a===0&&Lo(e,t,n))}function Lo(i,t,e){return t.x<=Math.max(i.x,e.x)&&t.x>=Math.min(i.x,e.x)&&t.y<=Math.max(i.y,e.y)&&t.y>=Math.min(i.y,e.y)}function Do(i){return i>0?1:i<0?-1:0}function ip(i,t){let e=i;do{if(e.i!==i.i&&e.next.i!==i.i&&e.i!==t.i&&e.next.i!==t.i&&id(e,e.next,i,t))return!0;e=e.next}while(e!==i);return!1}function Pr(i,t){return Oe(i.prev,i,i.next)<0?Oe(i,t,i.next)>=0&&Oe(i,i.prev,t)>=0:Oe(i,t,i.prev)<0||Oe(i,i.next,t)<0}function sp(i,t){let e=i,n=!1,s=(i.x+t.x)/2,r=(i.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==i);return n}function sd(i,t){let e=bc(i.i,i.x,i.y),n=bc(t.i,t.x,t.y),s=i.next,r=t.prev;return i.next=t,t.prev=i,e.next=s,s.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function ou(i,t,e,n){let s=bc(i,t,e);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function Lr(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function bc(i,t,e){return{i,x:t,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function rp(i,t,e,n){let s=0;for(let r=t,o=e-n;r<e;r+=n)s+=(i[o]-i[r])*(i[r+1]+i[o+1]),o=r;return s}var Mc=class{static triangulate(t,e,n=2){return Hf(t,e,n)}},Ki=class i{static area(t){let e=t.length,n=0;for(let s=e-1,r=0;r<e;s=r++)n+=t[s].x*t[r].y-t[r].x*t[s].y;return n*.5}static isClockWise(t){return i.area(t)<0}static triangulateShape(t,e){let n=[],s=[],r=[];au(t),lu(n,t);let o=t.length;e.forEach(au);for(let c=0;c<e.length;c++)s.push(o),o+=e[c].length,lu(n,e[c]);let a=Mc.triangulate(n,s);for(let c=0;c<a.length;c+=3)r.push(a.slice(c,c+3));return r}};function au(i){let t=i.length;t>2&&i[t-1].equals(i[0])&&i.pop()}function lu(i,t){for(let e=0;e<t.length;e++)i.push(t[e].x),i.push(t[e].y)}var Bs=class i extends rn{constructor(t=new ts([new vt(.5,.5),new vt(-.5,.5),new vt(-.5,-.5),new vt(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];let n=this,s=[],r=[];for(let a=0,c=t.length;a<c;a++){let l=t[a];o(l)}this.setAttribute("position",new Be(s,3)),this.setAttribute("uv",new Be(r,2)),this.computeVertexNormals();function o(a){let c=[],l=e.curveSegments!==void 0?e.curveSegments:12,u=e.steps!==void 0?e.steps:1,f=e.depth!==void 0?e.depth:1,h=e.bevelEnabled!==void 0?e.bevelEnabled:!0,d=e.bevelThickness!==void 0?e.bevelThickness:.2,g=e.bevelSize!==void 0?e.bevelSize:d-.1,v=e.bevelOffset!==void 0?e.bevelOffset:0,p=e.bevelSegments!==void 0?e.bevelSegments:3,m=e.extrudePath,w=e.UVGenerator!==void 0?e.UVGenerator:op,R,M=!1,A,S,I,_;if(m){R=m.getSpacedPoints(u),M=!0,h=!1;let ht=m.isCatmullRomCurve3?m.closed:!1;A=m.computeFrenetFrames(u,ht),S=new O,I=new O,_=new O}h||(p=0,d=0,g=0,v=0);let E=a.extractPoints(l),N=E.shape,P=E.holes;if(!Ki.isClockWise(N)){N=N.reverse();for(let ht=0,mt=P.length;ht<mt;ht++){let _t=P[ht];Ki.isClockWise(_t)&&(P[ht]=_t.reverse())}}function W(ht){let _t=10000000000000001e-36,gt=ht[0];for(let Tt=1;Tt<=ht.length;Tt++){let jt=Tt%ht.length,$t=ht[jt],Qt=$t.x-gt.x,ie=$t.y-gt.y,L=Qt*Qt+ie*ie,fe=Math.max(Math.abs($t.x),Math.abs($t.y),Math.abs(gt.x),Math.abs(gt.y)),ae=_t*fe*fe;if(L<=ae){ht.splice(jt,1),Tt--;continue}gt=$t}}W(N),P.forEach(W);let U=P.length,B=N;for(let ht=0;ht<U;ht++){let mt=P[ht];N=N.concat(mt)}function Y(ht,mt,_t){return mt||ne("ExtrudeGeometry: vec does not exist"),ht.clone().addScaledVector(mt,_t)}let D=N.length;function Q(ht,mt,_t){let gt,Tt,jt,$t=ht.x-mt.x,Qt=ht.y-mt.y,ie=_t.x-ht.x,L=_t.y-ht.y,fe=$t*$t+Qt*Qt,ae=$t*L-Qt*ie;if(Math.abs(ae)>Number.EPSILON){let C=Math.sqrt(fe),x=Math.sqrt(ie*ie+L*L),z=mt.x-Qt/C,Z=mt.y+$t/C,et=_t.x-L/x,yt=_t.y+ie/x,St=((et-z)*L-(yt-Z)*ie)/($t*L-Qt*ie);gt=z+$t*St-ht.x,Tt=Z+Qt*St-ht.y;let ot=gt*gt+Tt*Tt;if(ot<=2)return new vt(gt,Tt);jt=Math.sqrt(ot/2)}else{let C=!1;$t>Number.EPSILON?ie>Number.EPSILON&&(C=!0):$t<-Number.EPSILON?ie<-Number.EPSILON&&(C=!0):Math.sign(Qt)===Math.sign(L)&&(C=!0),C?(gt=-Qt,Tt=$t,jt=Math.sqrt(fe)):(gt=$t,Tt=Qt,jt=Math.sqrt(fe/2))}return new vt(gt/jt,Tt/jt)}let X=[];for(let ht=0,mt=B.length,_t=mt-1,gt=ht+1;ht<mt;ht++,_t++,gt++)_t===mt&&(_t=0),gt===mt&&(gt=0),X[ht]=Q(B[ht],B[_t],B[gt]);let q=[],tt,pt=X.concat();for(let ht=0,mt=U;ht<mt;ht++){let _t=P[ht];tt=[];for(let gt=0,Tt=_t.length,jt=Tt-1,$t=gt+1;gt<Tt;gt++,jt++,$t++)jt===Tt&&(jt=0),$t===Tt&&($t=0),tt[gt]=Q(_t[gt],_t[jt],_t[$t]);q.push(tt),pt=pt.concat(tt)}let lt;if(p===0)lt=Ki.triangulateShape(B,P);else{let ht=[],mt=[];for(let _t=0;_t<p;_t++){let gt=_t/p,Tt=d*Math.cos(gt*Math.PI/2),jt=g*Math.sin(gt*Math.PI/2)+v;for(let $t=0,Qt=B.length;$t<Qt;$t++){let ie=Y(B[$t],X[$t],jt);bt(ie.x,ie.y,-Tt),gt===0&&ht.push(ie)}for(let $t=0,Qt=U;$t<Qt;$t++){let ie=P[$t];tt=q[$t];let L=[];for(let fe=0,ae=ie.length;fe<ae;fe++){let C=Y(ie[fe],tt[fe],jt);bt(C.x,C.y,-Tt),gt===0&&L.push(C)}gt===0&&mt.push(L)}}lt=Ki.triangulateShape(ht,mt)}let Kt=lt.length,Ct=g+v;for(let ht=0;ht<D;ht++){let mt=h?Y(N[ht],pt[ht],Ct):N[ht];M?(I.copy(A.normals[0]).multiplyScalar(mt.x),S.copy(A.binormals[0]).multiplyScalar(mt.y),_.copy(R[0]).add(I).add(S),bt(_.x,_.y,_.z)):bt(mt.x,mt.y,0)}for(let ht=1;ht<=u;ht++)for(let mt=0;mt<D;mt++){let _t=h?Y(N[mt],pt[mt],Ct):N[mt];M?(I.copy(A.normals[ht]).multiplyScalar(_t.x),S.copy(A.binormals[ht]).multiplyScalar(_t.y),_.copy(R[ht]).add(I).add(S),bt(_.x,_.y,_.z)):bt(_t.x,_t.y,f/u*ht)}for(let ht=p-1;ht>=0;ht--){let mt=ht/p,_t=d*Math.cos(mt*Math.PI/2),gt=g*Math.sin(mt*Math.PI/2)+v;for(let Tt=0,jt=B.length;Tt<jt;Tt++){let $t=Y(B[Tt],X[Tt],gt);bt($t.x,$t.y,f+_t)}for(let Tt=0,jt=P.length;Tt<jt;Tt++){let $t=P[Tt];tt=q[Tt];for(let Qt=0,ie=$t.length;Qt<ie;Qt++){let L=Y($t[Qt],tt[Qt],gt);M?bt(L.x,L.y+R[u-1].y,R[u-1].x+_t):bt(L.x,L.y,f+_t)}}}Jt(),nt();function Jt(){let ht=s.length/3;if(h){let mt=0,_t=D*mt;for(let gt=0;gt<Kt;gt++){let Tt=lt[gt];Vt(Tt[2]+_t,Tt[1]+_t,Tt[0]+_t)}mt=u+p*2,_t=D*mt;for(let gt=0;gt<Kt;gt++){let Tt=lt[gt];Vt(Tt[0]+_t,Tt[1]+_t,Tt[2]+_t)}}else{for(let mt=0;mt<Kt;mt++){let _t=lt[mt];Vt(_t[2],_t[1],_t[0])}for(let mt=0;mt<Kt;mt++){let _t=lt[mt];Vt(_t[0]+D*u,_t[1]+D*u,_t[2]+D*u)}}n.addGroup(ht,s.length/3-ht,0)}function nt(){let ht=s.length/3,mt=0;at(B,mt),mt+=B.length;for(let _t=0,gt=P.length;_t<gt;_t++){let Tt=P[_t];at(Tt,mt),mt+=Tt.length}n.addGroup(ht,s.length/3-ht,1)}function at(ht,mt){let _t=ht.length;for(;--_t>=0;){let gt=_t,Tt=_t-1;Tt<0&&(Tt=ht.length-1);for(let jt=0,$t=u+p*2;jt<$t;jt++){let Qt=D*jt,ie=D*(jt+1),L=mt+gt+Qt,fe=mt+Tt+Qt,ae=mt+Tt+ie,C=mt+gt+ie;dt(L,fe,ae,C)}}}function bt(ht,mt,_t){c.push(ht),c.push(mt),c.push(_t)}function Vt(ht,mt,_t){Bt(ht),Bt(mt),Bt(_t);let gt=s.length/3,Tt=w.generateTopUV(n,s,gt-3,gt-2,gt-1);ye(Tt[0]),ye(Tt[1]),ye(Tt[2])}function dt(ht,mt,_t,gt){Bt(ht),Bt(mt),Bt(gt),Bt(mt),Bt(_t),Bt(gt);let Tt=s.length/3,jt=w.generateSideWallUV(n,s,Tt-6,Tt-3,Tt-2,Tt-1);ye(jt[0]),ye(jt[1]),ye(jt[3]),ye(jt[1]),ye(jt[2]),ye(jt[3])}function Bt(ht){s.push(c[ht*3+0]),s.push(c[ht*3+1]),s.push(c[ht*3+2])}function ye(ht){r.push(ht.x),r.push(ht.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return ap(e,n,t)}static fromJSON(t,e){let n=[];for(let r=0,o=t.shapes.length;r<o;r++){let a=e[t.shapes[r]];n.push(a)}let s=t.options.extrudePath;return s!==void 0&&(t.options.extrudePath=new yc[s.type]().fromJSON(s)),new i(n,t.options)}},op={generateTopUV:function(i,t,e,n,s){let r=t[e*3],o=t[e*3+1],a=t[n*3],c=t[n*3+1],l=t[s*3],u=t[s*3+1];return[new vt(r,o),new vt(a,c),new vt(l,u)]},generateSideWallUV:function(i,t,e,n,s,r){let o=t[e*3],a=t[e*3+1],c=t[e*3+2],l=t[n*3],u=t[n*3+1],f=t[n*3+2],h=t[s*3],d=t[s*3+1],g=t[s*3+2],v=t[r*3],p=t[r*3+1],m=t[r*3+2];return Math.abs(a-u)<Math.abs(o-l)?[new vt(o,1-c),new vt(l,1-f),new vt(h,1-g),new vt(v,1-m)]:[new vt(a,1-c),new vt(u,1-f),new vt(d,1-g),new vt(p,1-m)]}};function ap(i,t,e){if(e.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){let r=i[n];e.shapes.push(r.uuid)}else e.shapes.push(i.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}var Dr=class i extends rn{constructor(t=[new vt(0,-.5),new vt(.5,0),new vt(0,.5)],e=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:s},e=Math.floor(e),s=ue(s,0,Math.PI*2);let r=[],o=[],a=[],c=[],l=[],u=1/e,f=new O,h=new vt,d=new O,g=new O,v=new O,p=0,m=0;for(let w=0;w<=t.length-1;w++)switch(w){case 0:p=t[w+1].x-t[w].x,m=t[w+1].y-t[w].y,d.x=m*1,d.y=-p,d.z=m*0,v.copy(d),d.normalize(),c.push(d.x,d.y,d.z);break;case t.length-1:c.push(v.x,v.y,v.z);break;default:p=t[w+1].x-t[w].x,m=t[w+1].y-t[w].y,d.x=m*1,d.y=-p,d.z=m*0,g.copy(d),d.x+=v.x,d.y+=v.y,d.z+=v.z,d.normalize(),c.push(d.x,d.y,d.z),v.copy(g)}for(let w=0;w<=e;w++){let R=n+w*u*s,M=Math.sin(R),A=Math.cos(R);for(let S=0;S<=t.length-1;S++){f.x=t[S].x*M,f.y=t[S].y,f.z=t[S].x*A,o.push(f.x,f.y,f.z),h.x=w/e,h.y=S/(t.length-1),a.push(h.x,h.y);let I=c[3*S+0]*M,_=c[3*S+1],E=c[3*S+0]*A;l.push(I,_,E)}}for(let w=0;w<e;w++)for(let R=0;R<t.length-1;R++){let M=R+w*t.length,A=M,S=M+t.length,I=M+t.length+1,_=M+1;r.push(A,S,_),r.push(I,_,S)}this.setIndex(r),this.setAttribute("position",new Be(o,3)),this.setAttribute("uv",new Be(a,2)),this.setAttribute("normal",new Be(l,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.points,t.segments,t.phiStart,t.phiLength)}};var ns=class i extends rn{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};let r=t/2,o=e/2,a=Math.floor(n),c=Math.floor(s),l=a+1,u=c+1,f=t/a,h=e/c,d=[],g=[],v=[],p=[];for(let m=0;m<u;m++){let w=m*h-o;for(let R=0;R<l;R++){let M=R*f-r;g.push(M,-w,0),v.push(0,0,1),p.push(R/a),p.push(1-m/c)}}for(let m=0;m<c;m++)for(let w=0;w<a;w++){let R=w+l*m,M=w+l*(m+1),A=w+1+l*(m+1),S=w+1+l*m;d.push(R,M,S),d.push(M,A,S)}this.setIndex(d),this.setAttribute("position",new Be(g,3)),this.setAttribute("normal",new Be(v,3)),this.setAttribute("uv",new Be(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.widthSegments,t.heightSegments)}};var Nr=class extends ni{constructor(t){super(),this.isShadowMaterial=!0,this.type="ShadowMaterial",this.color=new re(0),this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.fog=t.fog,this}};function os(i){let t={};for(let e in i){t[e]={};for(let n in i[e]){let s=i[e][n];if(cu(s))s.isRenderTargetTexture?(te("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone();else if(Array.isArray(s))if(cu(s[0])){let r=[];for(let o=0,a=s.length;o<a;o++)r[o]=s[o].clone();t[e][n]=r}else t[e][n]=s.slice();else t[e][n]=s}}return t}function on(i){let t={};for(let e=0;e<i.length;e++){let n=os(i[e]);for(let s in n)t[s]=n[s]}return t}function cu(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function lp(i){let t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Qc(i){let t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:pe.workingColorSpace}var rd={clone:os,merge:on},cp=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,hp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,En=class extends ni{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=cp,this.fragmentShader=hp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=os(t.uniforms),this.uniformsGroups=lp(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(let n in t.uniforms){let s=t.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=e[s.value]||null;break;case"c":this.uniforms[n].value=new re().setHex(s.value);break;case"v2":this.uniforms[n].value=new vt().fromArray(s.value);break;case"v3":this.uniforms[n].value=new O().fromArray(s.value);break;case"v4":this.uniforms[n].value=new Ue().fromArray(s.value);break;case"m3":this.uniforms[n].value=new oe().fromArray(s.value);break;case"m4":this.uniforms[n].value=new Ce().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(let n in t.extensions)this.extensions[n]=t.extensions[n];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}},ha=class extends En{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},Pi=class extends ni{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new re(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new re(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ul,this.normalScale=new vt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new xi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};var ua=class extends ni{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Vu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},da=class extends ni{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function Ms(i,t){return!i||i.constructor===t?i:typeof t.BYTES_PER_ELEMENT=="number"?new t(i):Array.prototype.slice.call(i)}function fc(i){return i!==void 0&&i.inTangents!==void 0&&i.outTangents!==void 0}var Li=class{constructor(t,e,n,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,s=e[n],r=e[n-1];n:{t:{let o;e:{i:if(!(t<s)){for(let a=n+2;;){if(s===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=s,s=e[++n],t<s)break t}o=e.length;break e}if(!(t>=r)){let a=e[1];t<a&&(n=2,r=a);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=e[--n-1],t>=r)break t}o=n,n=0;break e}break n}for(;n<o;){let a=n+o>>>1;t<e[a]?o=a:n=a+1}if(s=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=t*s;for(let o=0;o!==s;++o)e[o]=n[r+o];return e}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},fa=class extends Li{constructor(t,e,n,s){super(t,e,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:gc,endingEnd:gc}}intervalChanged_(t,e,n){let s=this.parameterPositions,r=t-2,o=t+1,a=s[r],c=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case xc:r=t,a=2*e-n;break;case _c:r=s.length-2,a=e+s[r]-s[r+1];break;default:r=t,a=n}if(c===void 0)switch(this.getSettings_().endingEnd){case xc:o=t,c=2*n-e;break;case _c:o=1,c=n+s[1]-s[0];break;default:o=t-1,c=e}let l=(n-e)*.5,u=this.valueSize;this._weightPrev=l/(e-a),this._weightNext=l/(c-n),this._offsetPrev=r*u,this._offsetNext=o*u}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,u=this._offsetPrev,f=this._offsetNext,h=this._weightPrev,d=this._weightNext,g=(n-e)/(s-e),v=g*g,p=v*g,m=-h*p+2*h*v-h*g,w=(1+h)*p+(-1.5-2*h)*v+(-.5+h)*g+1,R=(-1-d)*p+(1.5+d)*v+.5*g,M=d*p-d*v;for(let A=0;A!==a;++A)r[A]=m*o[u+A]+w*o[l+A]+R*o[c+A]+M*o[f+A];return r}},pa=class extends Li{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,u=(n-e)/(s-e),f=1-u;for(let h=0;h!==a;++h)r[h]=o[l+h]*f+o[c+h]*u;return r}},ma=class extends Li{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t){return this.copySampleValue_(t-1)}},ga=class extends Li{interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,u=this.inTangents,f=this.outTangents;if(!u||!f){let g=(n-e)/(s-e),v=1-g;for(let p=0;p!==a;++p)r[p]=o[l+p]*v+o[c+p]*g;return r}let h=a*2,d=t-1;for(let g=0;g!==a;++g){let v=o[l+g],p=o[c+g],m=d*h+g*2,w=f[m],R=f[m+1],M=t*h+g*2,A=u[M],S=u[M+1],I=dp(n,e,w,A,s);r[g]=od(I,v,R,S,p)}return r}};function od(i,t,e,n,s){let r=1-i;return r*r*r*t+3*r*r*i*e+3*r*i*i*n+i*i*i*s}function up(i,t,e,n,s){let r=1-i;return 3*r*r*(e-t)+6*r*i*(n-e)+3*i*i*(s-n)}function dp(i,t,e,n,s){let r=(i-t)/(s-t);for(let o=0;o<8;o++){let a=od(r,t,e,n,s)-i;if(Math.abs(a)<1e-10)break;let c=up(r,t,e,n,s);if(Math.abs(c)<1e-10)break;r=Math.max(0,Math.min(1,r-a/c))}return r}var Cn=class{constructor(t,e,n,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Ms(e,this.TimeBufferType),this.values=Ms(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:Ms(t.times,Array),values:Ms(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(n.interpolation=s),fc(t.settings)&&(n.settings={inTangents:Ms(t.settings.inTangents,Array),outTangents:Ms(t.settings.outTangents,Array)})}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new ma(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new pa(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new fa(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){let e=new ga(this.times,this.values,this.getValueSize(),t);return this.settings&&(e.inTangents=this.settings.inTangents,e.outTangents=this.settings.outTangents),e}setInterpolation(t){let e;switch(t){case mr:e=this.InterpolantFactoryMethodDiscrete;break;case $o:e=this.InterpolantFactoryMethodLinear;break;case Fo:e=this.InterpolantFactoryMethodSmooth;break;case mc:e=this.InterpolantFactoryMethodBezier;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return te("KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return mr;case this.InterpolantFactoryMethodLinear:return $o;case this.InterpolantFactoryMethodSmooth:return Fo;case this.InterpolantFactoryMethodBezier:return mc}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]*=t;fc(this.settings)&&(hu(this.settings.inTangents,t),hu(this.settings.outTangents,t))}return this}trim(t,e){let n=this.times,s=n.length,r=0,o=s-1;for(;r!==s&&n[r]<t;)++r;for(;o!==-1&&n[o]>e;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(ne("KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,s=this.values,r=n.length;r===0&&(ne("KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==r;a++){let c=n[a];if(typeof c=="number"&&isNaN(c)){ne("KeyframeTrack: Time is not a valid number.",this,a,c),t=!1;break}if(o!==null&&o>c){ne("KeyframeTrack: Out of order keys.",this,a,c,o),t=!1;break}o=c}if(s!==void 0&&gf(s))for(let a=0,c=s.length;a!==c;++a){let l=s[a];if(isNaN(l)){ne("KeyframeTrack: Value is not a valid number.",this,a,l),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===Fo,r=t.length-1,o=1;for(let a=1;a<r;++a){let c=!1,l=t[a],u=t[a+1];if(l!==u&&(a!==1||l!==t[0]))if(s)c=!0;else{let f=a*n,h=f-n,d=f+n;for(let g=0;g!==n;++g){let v=e[f+g];if(v!==e[h+g]||v!==e[d+g]){c=!0;break}}}if(c){if(a!==o){t[o]=t[a];let f=a*n,h=o*n;for(let d=0;d!==n;++d)e[h+d]=e[f+d]}++o}}if(r>0){t[o]=t[r];for(let a=r*n,c=o*n,l=0;l!==n;++l)e[c+l]=e[a+l];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,s=new n(this.name,t,e);return s.createInterpolant=this.createInterpolant,fc(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};function hu(i,t){for(let e=0,n=i.length;e!==n;e+=2)i[e]*=t}Cn.prototype.ValueTypeName="";Cn.prototype.TimeBufferType=Float32Array;Cn.prototype.ValueBufferType=Float32Array;Cn.prototype.DefaultInterpolation=$o;var Di=class extends Cn{constructor(t,e,n){super(t,e,n)}};Di.prototype.ValueTypeName="bool";Di.prototype.ValueBufferType=Array;Di.prototype.DefaultInterpolation=mr;Di.prototype.InterpolantFactoryMethodLinear=void 0;Di.prototype.InterpolantFactoryMethodSmooth=void 0;var xa=class extends Cn{constructor(t,e,n,s){super(t,e,n,s)}};xa.prototype.ValueTypeName="color";var _a=class extends Cn{constructor(t,e,n,s){super(t,e,n,s)}};_a.prototype.ValueTypeName="number";var ya=class extends Li{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(n-e)/(s-e),l=t*a;for(let u=l+a;l!==u;l+=4)ti.slerpFlat(r,0,o,l-a,o,l,c);return r}},Ur=class extends Cn{constructor(t,e,n,s){super(t,e,n,s)}InterpolantFactoryMethodLinear(t){return new ya(this.times,this.values,this.getValueSize(),t)}};Ur.prototype.ValueTypeName="quaternion";Ur.prototype.InterpolantFactoryMethodSmooth=void 0;var Ni=class extends Cn{constructor(t,e,n){super(t,e,n)}};Ni.prototype.ValueTypeName="string";Ni.prototype.ValueBufferType=Array;Ni.prototype.DefaultInterpolation=mr;Ni.prototype.InterpolantFactoryMethodLinear=void 0;Ni.prototype.InterpolantFactoryMethodSmooth=void 0;var va=class extends Cn{constructor(t,e,n,s){super(t,e,n,s)}};va.prototype.ValueTypeName="vector";var ba=class{constructor(t,e,n){let s=this,r=!1,o=0,a=0,c,l=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this._abortController=null,this.itemStart=function(u){a++,r===!1&&s.onStart!==void 0&&s.onStart(u,o,a),r=!0},this.itemEnd=function(u){o++,s.onProgress!==void 0&&s.onProgress(u,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(u){s.onError!==void 0&&s.onError(u)},this.resolveURL=function(u){return u=u.normalize("NFC"),c?c(u):u},this.setURLModifier=function(u){return c=u,this},this.addHandler=function(u,f){return l.push(u,f),this},this.removeHandler=function(u){let f=l.indexOf(u);return f!==-1&&l.splice(f,2),this},this.getHandler=function(u){for(let f=0,h=l.length;f<h;f+=2){let d=l[f],g=l[f+1];if(d.global&&(d.lastIndex=0),d.test(u))return g}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},ad=new ba,Ma=class{constructor(t){this.manager=t!==void 0?t:ad,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,e){let n=this;return new Promise(function(s,r){n.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}};Ma.DEFAULT_MATERIAL_NAME="__DEFAULT";var Fr=class extends Je{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new re(t),this.intensity=e}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}},zs=class extends Fr{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Je.DEFAULT_UP),this.updateMatrix(),this.groundColor=new re(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}toJSON(t){let e=super.toJSON(t);return e.object.groundColor=this.groundColor.getHex(),e}},pc=new Ce,uu=new O,du=new O,Sa=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new vt(512,512),this.mapType=yn,this.map=null,this.mapPass=null,this.matrix=new Ce,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ns,this._frameExtents=new vt(1,1),this._viewportCount=1,this._viewports=[new Ue(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera;uu.setFromMatrixPosition(t.matrixWorld),e.position.copy(uu),du.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(du),e.updateMatrixWorld(),this._updateMatrix(e,this.matrix,this._frustum)}_updateMatrix(t,e,n,s){pc.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),n.setFromProjectionMatrix(pc,t.coordinateSystem,t.reversedDepth);let r=this._frameExtents,o=s?s.z/r.x:1,a=s?s.w/r.y:1,c=s?s.x/r.x:0,l=s?s.y/r.y:0;t.coordinateSystem===Es||t.reversedDepth?e.set(.5*o,0,0,.5*o+c,0,.5*a,0,.5*a+l,0,0,1,0,0,0,0,1):e.set(.5*o,0,0,.5*o+c,0,.5*a,0,.5*a+l,0,0,.5,.5,0,0,0,1),e.multiply(pc)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}},No=new O,Uo=new ti,Jn=new O,Or=class extends Je{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ce,this.projectionMatrix=new Ce,this.projectionMatrixInverse=new Ce,this.coordinateSystem=Wn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(No,Uo,Jn),Jn.x===1&&Jn.y===1&&Jn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(No,Uo,Jn.set(1,1,1)).invert()}updateWorldMatrix(t,e,n=!1){super.updateWorldMatrix(t,e,n),this.matrixWorld.decompose(No,Uo,Jn),Jn.x===1&&Jn.y===1&&Jn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(No,Uo,Jn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Ci=new O,fu=new vt,pu=new vt,mn=class extends Or{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=Zo*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(Bo*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Zo*2*Math.atan(Math.tan(Bo*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Ci.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Ci.x,Ci.y).multiplyScalar(-t/Ci.z),Ci.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ci.x,Ci.y).multiplyScalar(-t/Ci.z)}getViewSize(t,e){return this.getViewBounds(t,fu,pu),e.subVectors(pu,fu)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(Bo*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,e-=o.offsetY*n/l,s*=o.width/c,n*=o.height/l}let a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}};var _i=class extends Or{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-t,o=n+t,a=s+e,c=s-e;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=u*this.view.offsetY,c=a-u*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},Sc=class extends Sa{constructor(){super(new _i(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Ui=class extends Fr{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Je.DEFAULT_UP),this.updateMatrix(),this.target=new Je,this.shadow=new Sc}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}};var Ss=-90,ws=1,wa=class extends Je{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new mn(Ss,ws,t,e);s.layers=this.layers,this.add(s);let r=new mn(Ss,ws,t,e);r.layers=this.layers,this.add(r);let o=new mn(Ss,ws,t,e);o.layers=this.layers,this.add(o);let a=new mn(Ss,ws,t,e);a.layers=this.layers,this.add(a);let c=new mn(Ss,ws,t,e);c.layers=this.layers,this.add(c);let l=new mn(Ss,ws,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,c]=e;for(let l of e)this.remove(l);if(t===Wn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===Es)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,c,l,u]=this.children,f=t.getRenderTarget(),h=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;let v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let p=!1;t.isWebGLRenderer===!0?p=t.state.buffers.depth.getReversed():p=t.reversedDepthBuffer,t.setRenderTarget(n,0,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(n,1,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(n,2,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(n,3,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),t.setRenderTarget(n,4,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),n.texture.generateMipmaps=v,t.setRenderTarget(n,5,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,u),t.setRenderTarget(f,h,d),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},Ta=class extends mn{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}};var th="\\[\\]\\.:\\/",fp=new RegExp("["+th+"]","g"),eh="[^"+th+"]",pp="[^"+th.replace("\\.","")+"]",mp=/((?:WC+[\/:])*)/.source.replace("WC",eh),gp=/(WCOD+)?/.source.replace("WCOD",pp),xp=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",eh),_p=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",eh),yp=new RegExp("^"+mp+gp+xp+_p+"$"),vp=["material","materials","bones","map"],wc=class{constructor(t,e,n){let s=n||De.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},De=class i{constructor(t,e,n){this.path=e,this.parsedPath=n||i.parseTrackName(e),this.node=i.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new i.Composite(t,e,n):new i(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(fp,"")}static parseTrackName(t){let e=yp.exec(t);if(e===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);vp.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===e||a.uuid===e)return a;let c=n(a.children);if(c)return c}return null},s=n(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)t[e++]=n[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=i.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){te("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=e.objectIndex;switch(n){case"materials":if(!t.material){ne("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){ne("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){ne("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let u=0;u<t.length;u++)if(t[u].name===l){l=u;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){ne("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){ne("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){ne("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(l!==void 0){if(t[l]===void 0){ne("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[l]}}let o=t[s];if(o===void 0){let l=e.nodeName;ne("PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?a=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){ne("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){ne("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};De.Composite=wc;De.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};De.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};De.prototype.GetterByBindingType=[De.prototype._getValue_direct,De.prototype._getValue_array,De.prototype._getValue_arrayElement,De.prototype._getValue_toArray];De.prototype.SetterByBindingTypeAndVersioning=[[De.prototype._setValue_direct,De.prototype._setValue_direct_setNeedsUpdate,De.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[De.prototype._setValue_array,De.prototype._setValue_array_setNeedsUpdate,De.prototype._setValue_array_setMatrixWorldNeedsUpdate],[De.prototype._setValue_arrayElement,De.prototype._setValue_arrayElement_setNeedsUpdate,De.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[De.prototype._setValue_fromArray,De.prototype._setValue_fromArray_setNeedsUpdate,De.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var P_=new Float32Array(1);var mu=new Ce,Br=class{constructor(t,e,n=0,s=1/0){this.ray=new Ds(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new Is,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,e.projectionMatrix.elements[14]).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):ne("Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return mu.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(mu),this}intersectObject(t,e=!0,n=[]){return Tc(t,this,n,e),n.sort(gu),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)Tc(t[s],this,n,e);return n.sort(gu),n}};function gu(i,t){return i.distance-t.distance}function Tc(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){let r=i.children;for(let o=0,a=r.length;o<a;o++)Tc(r[o],t,e,!0)}}var Ac=class i{static{i.prototype.isMatrix2=!0}constructor(t,e,n,s){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let n=0;n<4;n++)this.elements[n]=t[n+e];return this}set(t,e,n,s){let r=this.elements;return r[0]=t,r[2]=e,r[1]=n,r[3]=s,this}};function nh(i,t,e,n){let s=bp(n);switch(e){case Xc:return i*t;case Yc:return i*t/s.components*s.byteLength;case La:return i*t/s.components*s.byteLength;case ki:return i*t*2/s.components*s.byteLength;case Da:return i*t*2/s.components*s.byteLength;case qc:return i*t*3/s.components*s.byteLength;case Un:return i*t*4/s.components*s.byteLength;case Na:return i*t*4/s.components*s.byteLength;case Gr:case Hr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Wr:case Xr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Fa:case Ba:return Math.max(i,16)*Math.max(t,8)/4;case Ua:case Oa:return Math.max(i,8)*Math.max(t,8)/2;case za:case ka:case Ga:case Ha:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Va:case qr:case Wa:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Xa:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case qa:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case Ya:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case $a:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case Za:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case Ja:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case Ka:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case ja:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Qa:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case tl:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case el:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case nl:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case il:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case sl:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case rl:case ol:case al:return Math.ceil(i/4)*Math.ceil(t/4)*16;case ll:case cl:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Yr:case hl:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function bp(i){switch(i){case yn:case Vc:return{byteLength:1,components:1};case Gs:case Gc:case $n:return{byteLength:2,components:1};case Ia:case Pa:return{byteLength:2,components:4};case qn:case Ra:case Yn:return{byteLength:4,components:1};case Hc:case Wc:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window<"u"&&(window.__THREE__?te("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function Rd(){let i=null,t=!1,e=null,n=null;function s(r,o){n=i.requestAnimationFrame(s),e(r,o)}return{start:function(){t!==!0&&e!==null&&i!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function Rp(i){let t=new WeakMap;function e(a,c){let l=a.array,u=a.usage,f=l.byteLength,h=i.createBuffer();i.bindBuffer(c,h),i.bufferData(c,l,u),a.onUploadCallback();let d;if(l instanceof Float32Array)d=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)d=i.HALF_FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?d=i.HALF_FLOAT:d=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)d=i.SHORT;else if(l instanceof Uint32Array)d=i.UNSIGNED_INT;else if(l instanceof Int32Array)d=i.INT;else if(l instanceof Int8Array)d=i.BYTE;else if(l instanceof Uint8Array)d=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)d=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:h,type:d,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:f}}function n(a,c,l){let u=c.array,f=c.updateRanges;if(i.bindBuffer(l,a),f.length===0)i.bufferSubData(l,0,u);else{f.sort((d,g)=>d.start-g.start);let h=0;for(let d=1;d<f.length;d++){let g=f[h],v=f[d];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++h,f[h]=v)}f.length=h+1;for(let d=0,g=f.length;d<g;d++){let v=f[d];i.bufferSubData(l,v.start*u.BYTES_PER_ELEMENT,u,v.start,v.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let c=t.get(a);c&&(i.deleteBuffer(c.buffer),t.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let u=t.get(a);(!u||u.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let l=t.get(a);if(l===void 0)t.set(a,e(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}var Ip=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Pp=`#ifdef USE_ALPHAHASH
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
#endif`,Lp=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Dp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Np=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Up=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Fp=`#ifdef USE_AOMAP
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
#endif`,Op=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Bp=`#ifdef USE_BATCHING
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
#endif`,zp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,kp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Vp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Gp=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Hp=`#ifdef USE_IRIDESCENCE
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
#endif`,Wp=`#ifdef USE_BUMPMAP
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
#endif`,Xp=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,qp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Yp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,$p=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Zp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Jp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Kp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,jp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,Qp=`#define PI 3.141592653589793
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
} // validated`,tm=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,em=`vec3 transformedNormal = objectNormal;
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
#endif`,nm=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,im=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,sm=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,rm=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,om="gl_FragColor = linearToOutputTexel( gl_FragColor );",am=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,lm=`#ifdef USE_ENVMAP
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
#endif`,cm=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,hm=`#ifdef USE_ENVMAP
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
#endif`,um=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,dm=`#ifdef USE_ENVMAP
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
#endif`,fm=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,pm=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,mm=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,gm=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,xm=`#ifdef USE_GRADIENTMAP
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
}`,_m=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,ym=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,vm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,bm=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,Mm=`#ifdef USE_ENVMAP
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
#endif`,Sm=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,wm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Tm=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Am=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Em=`PhysicalMaterial material;
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
#endif`,Cm=`uniform sampler2D dfgLUT;
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
}`,Rm=`
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
#endif`,Im=`#if defined( RE_IndirectDiffuse )
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
#endif`,Pm=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Lm=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,Dm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Nm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Um=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Fm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Om=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Bm=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,zm=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,km=`#if defined( USE_POINTS_UV )
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
#endif`,Vm=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Gm=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Hm=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Wm=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Xm=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,qm=`#ifdef USE_MORPHTARGETS
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
#endif`,Ym=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,$m=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Zm=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Jm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Km=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,jm=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Qm=`#ifdef USE_NORMALMAP
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
#endif`,tg=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,eg=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,ng=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,ig=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,sg=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,rg=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,og=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,ag=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,lg=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,cg=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,hg=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,ug=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,dg=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,fg=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,pg=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,mg=`float getShadowMask() {
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
}`,gg=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,xg=`#ifdef USE_SKINNING
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
#endif`,_g=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,yg=`#ifdef USE_SKINNING
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
#endif`,vg=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,bg=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Mg=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Sg=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,wg=`#ifdef USE_TRANSMISSION
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
#endif`,Tg=`#ifdef USE_TRANSMISSION
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
#endif`,Ag=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Eg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Cg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Rg=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Ig=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Pg=`uniform sampler2D t2D;
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
}`,Lg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Dg=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Ng=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ug=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Fg=`#include <common>
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
}`,Og=`#if DEPTH_PACKING == 3200
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
}`,Bg=`#define DISTANCE
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
}`,zg=`#define DISTANCE
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
}`,kg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Vg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Gg=`uniform float scale;
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
}`,Hg=`uniform vec3 diffuse;
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
}`,Wg=`#include <common>
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
}`,Xg=`uniform vec3 diffuse;
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
}`,qg=`#define LAMBERT
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
}`,Yg=`#define LAMBERT
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
}`,$g=`#define MATCAP
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
}`,Zg=`#define MATCAP
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
}`,Jg=`#define NORMAL
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
}`,Kg=`#define NORMAL
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
}`,jg=`#define PHONG
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
}`,Qg=`#define PHONG
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
}`,t0=`#define STANDARD
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
}`,e0=`#define STANDARD
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
}`,n0=`#define TOON
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
}`,i0=`#define TOON
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
}`,s0=`uniform float size;
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
}`,r0=`uniform vec3 diffuse;
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
}`,o0=`#include <common>
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
}`,a0=`uniform vec3 color;
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
}`,l0=`uniform float rotation;
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
}`,c0=`uniform vec3 diffuse;
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
}`,le={alphahash_fragment:Ip,alphahash_pars_fragment:Pp,alphamap_fragment:Lp,alphamap_pars_fragment:Dp,alphatest_fragment:Np,alphatest_pars_fragment:Up,aomap_fragment:Fp,aomap_pars_fragment:Op,batching_pars_vertex:Bp,batching_vertex:zp,begin_vertex:kp,beginnormal_vertex:Vp,bsdfs:Gp,iridescence_fragment:Hp,bumpmap_pars_fragment:Wp,clipping_planes_fragment:Xp,clipping_planes_pars_fragment:qp,clipping_planes_pars_vertex:Yp,clipping_planes_vertex:$p,color_fragment:Zp,color_pars_fragment:Jp,color_pars_vertex:Kp,color_vertex:jp,common:Qp,cube_uv_reflection_fragment:tm,defaultnormal_vertex:em,displacementmap_pars_vertex:nm,displacementmap_vertex:im,emissivemap_fragment:sm,emissivemap_pars_fragment:rm,colorspace_fragment:om,colorspace_pars_fragment:am,envmap_fragment:lm,envmap_common_pars_fragment:cm,envmap_pars_fragment:hm,envmap_pars_vertex:um,envmap_physical_pars_fragment:Mm,envmap_vertex:dm,fog_vertex:fm,fog_pars_vertex:pm,fog_fragment:mm,fog_pars_fragment:gm,gradientmap_pars_fragment:xm,lightmap_pars_fragment:_m,lights_lambert_fragment:ym,lights_lambert_pars_fragment:vm,lights_pars_begin:bm,lights_toon_fragment:Sm,lights_toon_pars_fragment:wm,lights_phong_fragment:Tm,lights_phong_pars_fragment:Am,lights_physical_fragment:Em,lights_physical_pars_fragment:Cm,lights_fragment_begin:Rm,lights_fragment_maps:Im,lights_fragment_end:Pm,lightprobes_pars_fragment:Lm,logdepthbuf_fragment:Dm,logdepthbuf_pars_fragment:Nm,logdepthbuf_pars_vertex:Um,logdepthbuf_vertex:Fm,map_fragment:Om,map_pars_fragment:Bm,map_particle_fragment:zm,map_particle_pars_fragment:km,metalnessmap_fragment:Vm,metalnessmap_pars_fragment:Gm,morphinstance_vertex:Hm,morphcolor_vertex:Wm,morphnormal_vertex:Xm,morphtarget_pars_vertex:qm,morphtarget_vertex:Ym,normal_fragment_begin:$m,normal_fragment_maps:Zm,normal_pars_fragment:Jm,normal_pars_vertex:Km,normal_vertex:jm,normalmap_pars_fragment:Qm,clearcoat_normal_fragment_begin:tg,clearcoat_normal_fragment_maps:eg,clearcoat_pars_fragment:ng,iridescence_pars_fragment:ig,opaque_fragment:sg,packing:rg,premultiplied_alpha_fragment:og,project_vertex:ag,dithering_fragment:lg,dithering_pars_fragment:cg,roughnessmap_fragment:hg,roughnessmap_pars_fragment:ug,shadowmap_pars_fragment:dg,shadowmap_pars_vertex:fg,shadowmap_vertex:pg,shadowmask_pars_fragment:mg,skinbase_vertex:gg,skinning_pars_vertex:xg,skinning_vertex:_g,skinnormal_vertex:yg,specularmap_fragment:vg,specularmap_pars_fragment:bg,tonemapping_fragment:Mg,tonemapping_pars_fragment:Sg,transmission_fragment:wg,transmission_pars_fragment:Tg,uv_pars_fragment:Ag,uv_pars_vertex:Eg,uv_vertex:Cg,worldpos_vertex:Rg,background_vert:Ig,background_frag:Pg,backgroundCube_vert:Lg,backgroundCube_frag:Dg,cube_vert:Ng,cube_frag:Ug,depth_vert:Fg,depth_frag:Og,distance_vert:Bg,distance_frag:zg,equirect_vert:kg,equirect_frag:Vg,linedashed_vert:Gg,linedashed_frag:Hg,meshbasic_vert:Wg,meshbasic_frag:Xg,meshlambert_vert:qg,meshlambert_frag:Yg,meshmatcap_vert:$g,meshmatcap_frag:Zg,meshnormal_vert:Jg,meshnormal_frag:Kg,meshphong_vert:jg,meshphong_frag:Qg,meshphysical_vert:t0,meshphysical_frag:e0,meshtoon_vert:n0,meshtoon_frag:i0,points_vert:s0,points_frag:r0,shadow_vert:o0,shadow_frag:a0,sprite_vert:l0,sprite_frag:c0},Ft={common:{diffuse:{value:new re(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new oe},alphaMap:{value:null},alphaMapTransform:{value:new oe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new oe}},envmap:{envMap:{value:null},envMapRotation:{value:new oe},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new oe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new oe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new oe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new oe},normalScale:{value:new vt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new oe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new oe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new oe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new oe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new re(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new O},probesMax:{value:new O},probesResolution:{value:new O}},points:{diffuse:{value:new re(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new oe},alphaTest:{value:0},uvTransform:{value:new oe}},sprite:{diffuse:{value:new re(16777215)},opacity:{value:1},center:{value:new vt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new oe},alphaMap:{value:null},alphaMapTransform:{value:new oe},alphaTest:{value:0}}},oi={basic:{uniforms:on([Ft.common,Ft.specularmap,Ft.envmap,Ft.aomap,Ft.lightmap,Ft.fog]),vertexShader:le.meshbasic_vert,fragmentShader:le.meshbasic_frag},lambert:{uniforms:on([Ft.common,Ft.specularmap,Ft.envmap,Ft.aomap,Ft.lightmap,Ft.emissivemap,Ft.bumpmap,Ft.normalmap,Ft.displacementmap,Ft.fog,Ft.lights,{emissive:{value:new re(0)},envMapIntensity:{value:1}}]),vertexShader:le.meshlambert_vert,fragmentShader:le.meshlambert_frag},phong:{uniforms:on([Ft.common,Ft.specularmap,Ft.envmap,Ft.aomap,Ft.lightmap,Ft.emissivemap,Ft.bumpmap,Ft.normalmap,Ft.displacementmap,Ft.fog,Ft.lights,{emissive:{value:new re(0)},specular:{value:new re(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:le.meshphong_vert,fragmentShader:le.meshphong_frag},standard:{uniforms:on([Ft.common,Ft.envmap,Ft.aomap,Ft.lightmap,Ft.emissivemap,Ft.bumpmap,Ft.normalmap,Ft.displacementmap,Ft.roughnessmap,Ft.metalnessmap,Ft.fog,Ft.lights,{emissive:{value:new re(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:le.meshphysical_vert,fragmentShader:le.meshphysical_frag},toon:{uniforms:on([Ft.common,Ft.aomap,Ft.lightmap,Ft.emissivemap,Ft.bumpmap,Ft.normalmap,Ft.displacementmap,Ft.gradientmap,Ft.fog,Ft.lights,{emissive:{value:new re(0)}}]),vertexShader:le.meshtoon_vert,fragmentShader:le.meshtoon_frag},matcap:{uniforms:on([Ft.common,Ft.bumpmap,Ft.normalmap,Ft.displacementmap,Ft.fog,{matcap:{value:null}}]),vertexShader:le.meshmatcap_vert,fragmentShader:le.meshmatcap_frag},points:{uniforms:on([Ft.points,Ft.fog]),vertexShader:le.points_vert,fragmentShader:le.points_frag},dashed:{uniforms:on([Ft.common,Ft.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:le.linedashed_vert,fragmentShader:le.linedashed_frag},depth:{uniforms:on([Ft.common,Ft.displacementmap]),vertexShader:le.depth_vert,fragmentShader:le.depth_frag},normal:{uniforms:on([Ft.common,Ft.bumpmap,Ft.normalmap,Ft.displacementmap,{opacity:{value:1}}]),vertexShader:le.meshnormal_vert,fragmentShader:le.meshnormal_frag},sprite:{uniforms:on([Ft.sprite,Ft.fog]),vertexShader:le.sprite_vert,fragmentShader:le.sprite_frag},background:{uniforms:{uvTransform:{value:new oe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:le.background_vert,fragmentShader:le.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new oe}},vertexShader:le.backgroundCube_vert,fragmentShader:le.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:le.cube_vert,fragmentShader:le.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:le.equirect_vert,fragmentShader:le.equirect_frag},distance:{uniforms:on([Ft.common,Ft.displacementmap,{referencePosition:{value:new O},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:le.distance_vert,fragmentShader:le.distance_frag},shadow:{uniforms:on([Ft.lights,Ft.fog,{color:{value:new re(0)},opacity:{value:1}}]),vertexShader:le.shadow_vert,fragmentShader:le.shadow_frag}};oi.physical={uniforms:on([oi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new oe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new oe},clearcoatNormalScale:{value:new vt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new oe},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new oe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new oe},sheen:{value:0},sheenColor:{value:new re(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new oe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new oe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new oe},transmissionSamplerSize:{value:new vt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new oe},attenuationDistance:{value:0},attenuationColor:{value:new re(0)},specularColor:{value:new re(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new oe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new oe},anisotropyVector:{value:new vt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new oe}}]),vertexShader:le.meshphysical_vert,fragmentShader:le.meshphysical_frag};var ml={r:0,b:0,g:0},h0=new Ce,Id=new oe;Id.set(-1,0,0,0,1,0,0,0,1);function u0(i,t,e,n,s,r){let o=new re(0),a=s===!0?0:1,c,l,u=null,f=0,h=null;function d(w){let R=w.isScene===!0?w.background:null;if(R&&R.isTexture){let M=w.backgroundBlurriness>0;R=t.get(R,M)}return R}function g(w){let R=!1,M=d(w);M===null?p(o,a):M&&M.isColor&&(p(M,1),R=!0);let A=i.xr.getEnvironmentBlendMode();A==="additive"?e.buffers.color.setClear(0,0,0,1,r):A==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(i.autoClear||R)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function v(w,R){let M=d(R);M&&(M.isCubeTexture||M.mapping===kr)?(l===void 0&&(l=new Ne(new Nn(1,1,1),new En({name:"BackgroundCubeMaterial",uniforms:os(oi.backgroundCube.uniforms),vertexShader:oi.backgroundCube.vertexShader,fragmentShader:oi.backgroundCube.fragmentShader,side:Ke,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(A,S,I){this.matrixWorld.copyPosition(I.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),l.material.uniforms.envMap.value=M,l.material.uniforms.backgroundBlurriness.value=R.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=R.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(h0.makeRotationFromEuler(R.backgroundRotation)).transpose(),M.isCubeTexture&&M.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(Id),l.material.toneMapped=pe.getTransfer(M.colorSpace)!==Te,(u!==M||f!==M.version||h!==i.toneMapping)&&(l.material.needsUpdate=!0,u=M,f=M.version,h=i.toneMapping),l.layers.enableAll(),w.unshift(l,l.geometry,l.material,0,0,null)):M&&M.isTexture&&(c===void 0&&(c=new Ne(new ns(2,2),new En({name:"BackgroundMaterial",uniforms:os(oi.background.uniforms),vertexShader:oi.background.vertexShader,fragmentShader:oi.background.fragmentShader,side:Fi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=M,c.material.uniforms.backgroundIntensity.value=R.backgroundIntensity,c.material.toneMapped=pe.getTransfer(M.colorSpace)!==Te,M.matrixAutoUpdate===!0&&M.updateMatrix(),c.material.uniforms.uvTransform.value.copy(M.matrix),(u!==M||f!==M.version||h!==i.toneMapping)&&(c.material.needsUpdate=!0,u=M,f=M.version,h=i.toneMapping),c.layers.enableAll(),w.unshift(c,c.geometry,c.material,0,0,null))}function p(w,R){w.getRGB(ml,Qc(i)),e.buffers.color.setClear(ml.r,ml.g,ml.b,R,r)}function m(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(w,R=1){o.set(w),a=R,p(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(w){a=w,p(o,a)},render:g,addToRenderList:v,dispose:m}}function d0(i,t){let e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=h(null),r=s,o=!1;function a(P,k,W,U,B){let Y=!1,D=f(P,U,W,k);r!==D&&(r=D,l(r.object)),Y=d(P,U,W,B),Y&&g(P,U,W,B),B!==null&&t.update(B,i.ELEMENT_ARRAY_BUFFER),(Y||o)&&(o=!1,M(P,k,W,U),B!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(B).buffer))}function c(){return i.createVertexArray()}function l(P){return i.bindVertexArray(P)}function u(P){return i.deleteVertexArray(P)}function f(P,k,W,U){let B=U.wireframe===!0,Y=n[k.id];Y===void 0&&(Y={},n[k.id]=Y);let D=P.isInstancedMesh===!0?P.id:0,Q=Y[D];Q===void 0&&(Q={},Y[D]=Q);let X=Q[W.id];X===void 0&&(X={},Q[W.id]=X);let q=X[B];return q===void 0&&(q=h(c()),X[B]=q),q}function h(P){let k=[],W=[],U=[];for(let B=0;B<e;B++)k[B]=0,W[B]=0,U[B]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:k,enabledAttributes:W,attributeDivisors:U,object:P,attributes:{},index:null}}function d(P,k,W,U){let B=r.attributes,Y=k.attributes,D=0,Q=W.getAttributes();for(let X in Q)if(Q[X].location>=0){let tt=B[X],pt=Y[X];if(pt===void 0&&(X==="instanceMatrix"&&P.instanceMatrix&&(pt=P.instanceMatrix),X==="instanceColor"&&P.instanceColor&&(pt=P.instanceColor)),tt===void 0||tt.attribute!==pt||pt&&tt.data!==pt.data)return!0;D++}return r.attributesNum!==D||r.index!==U}function g(P,k,W,U){let B={},Y=k.attributes,D=0,Q=W.getAttributes();for(let X in Q)if(Q[X].location>=0){let tt=Y[X];tt===void 0&&(X==="instanceMatrix"&&P.instanceMatrix&&(tt=P.instanceMatrix),X==="instanceColor"&&P.instanceColor&&(tt=P.instanceColor));let pt={};pt.attribute=tt,tt&&tt.data&&(pt.data=tt.data),B[X]=pt,D++}r.attributes=B,r.attributesNum=D,r.index=U}function v(){let P=r.newAttributes;for(let k=0,W=P.length;k<W;k++)P[k]=0}function p(P){m(P,0)}function m(P,k){let W=r.newAttributes,U=r.enabledAttributes,B=r.attributeDivisors;W[P]=1,U[P]===0&&(i.enableVertexAttribArray(P),U[P]=1),B[P]!==k&&(i.vertexAttribDivisor(P,k),B[P]=k)}function w(){let P=r.newAttributes,k=r.enabledAttributes;for(let W=0,U=k.length;W<U;W++)k[W]!==P[W]&&(i.disableVertexAttribArray(W),k[W]=0)}function R(P,k,W,U,B,Y,D){D===!0?i.vertexAttribIPointer(P,k,W,B,Y):i.vertexAttribPointer(P,k,W,U,B,Y)}function M(P,k,W,U){v();let B=U.attributes,Y=W.getAttributes(),D=k.defaultAttributeValues;for(let Q in Y){let X=Y[Q];if(X.location>=0){let q=B[Q];if(q===void 0&&(Q==="instanceMatrix"&&P.instanceMatrix&&(q=P.instanceMatrix),Q==="instanceColor"&&P.instanceColor&&(q=P.instanceColor)),q!==void 0){let tt=q.normalized,pt=q.itemSize,lt=t.get(q);if(lt===void 0)continue;let Kt=lt.buffer,Ct=lt.type,Jt=lt.bytesPerElement,nt=Ct===i.INT||Ct===i.UNSIGNED_INT||q.gpuType===Ra;if(q.isInterleavedBufferAttribute){let at=q.data,bt=at.stride,Vt=q.offset;if(at.isInstancedInterleavedBuffer){for(let dt=0;dt<X.locationSize;dt++)m(X.location+dt,at.meshPerAttribute);P.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=at.meshPerAttribute*at.count)}else for(let dt=0;dt<X.locationSize;dt++)p(X.location+dt);i.bindBuffer(i.ARRAY_BUFFER,Kt);for(let dt=0;dt<X.locationSize;dt++)R(X.location+dt,pt/X.locationSize,Ct,tt,bt*Jt,(Vt+pt/X.locationSize*dt)*Jt,nt)}else{if(q.isInstancedBufferAttribute){for(let at=0;at<X.locationSize;at++)m(X.location+at,q.meshPerAttribute);P.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=q.meshPerAttribute*q.count)}else for(let at=0;at<X.locationSize;at++)p(X.location+at);i.bindBuffer(i.ARRAY_BUFFER,Kt);for(let at=0;at<X.locationSize;at++)R(X.location+at,pt/X.locationSize,Ct,tt,pt*Jt,pt/X.locationSize*at*Jt,nt)}}else if(D!==void 0){let tt=D[Q];if(tt!==void 0)switch(tt.length){case 2:i.vertexAttrib2fv(X.location,tt);break;case 3:i.vertexAttrib3fv(X.location,tt);break;case 4:i.vertexAttrib4fv(X.location,tt);break;default:i.vertexAttrib1fv(X.location,tt)}}}}w()}function A(){E();for(let P in n){let k=n[P];for(let W in k){let U=k[W];for(let B in U){let Y=U[B];for(let D in Y)u(Y[D].object),delete Y[D];delete U[B]}}delete n[P]}}function S(P){if(n[P.id]===void 0)return;let k=n[P.id];for(let W in k){let U=k[W];for(let B in U){let Y=U[B];for(let D in Y)u(Y[D].object),delete Y[D];delete U[B]}}delete n[P.id]}function I(P){for(let k in n){let W=n[k];for(let U in W){let B=W[U];if(B[P.id]===void 0)continue;let Y=B[P.id];for(let D in Y)u(Y[D].object),delete Y[D];delete B[P.id]}}}function _(P){for(let k in n){let W=n[k],U=P.isInstancedMesh===!0?P.id:0,B=W[U];if(B!==void 0){for(let Y in B){let D=B[Y];for(let Q in D)u(D[Q].object),delete D[Q];delete B[Y]}delete W[U],Object.keys(W).length===0&&delete n[k]}}}function E(){N(),o=!0,r!==s&&(r=s,l(r.object))}function N(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:E,resetDefaultState:N,dispose:A,releaseStatesOfGeometry:S,releaseStatesOfObject:_,releaseStatesOfProgram:I,initAttributes:v,enableAttribute:p,disableUnusedAttributes:w}}function f0(i,t,e){let n;function s(c){n=c}function r(c,l){i.drawArrays(n,c,l),e.update(l,n,1)}function o(c,l,u){u!==0&&(i.drawArraysInstanced(n,c,l,u),e.update(l,n,u))}function a(c,l,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,l,0,u);let h=0;for(let d=0;d<u;d++)h+=l[d];e.update(h,n,1)}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a}function p0(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let I=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(I.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(I){return!(I!==Un&&n.convert(I)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(I){let _=I===$n&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(I!==yn&&I!==Yn&&!_&&n.convert(I)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function c(I){if(I==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";I="mediump"}return I==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp",u=c(l);u!==l&&(te("WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);let f=e.logarithmicDepthBuffer===!0,h=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control");e.reversedDepthBuffer===!0&&h===!1&&te("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_TEXTURE_SIZE),p=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),m=i.getParameter(i.MAX_VERTEX_ATTRIBS),w=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),R=i.getParameter(i.MAX_VARYING_VECTORS),M=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),A=i.getParameter(i.MAX_SAMPLES),S=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:f,reversedDepthBuffer:h,maxTextures:d,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:p,maxAttributes:m,maxVertexUniforms:w,maxVaryings:R,maxFragmentUniforms:M,maxSamples:A,samples:S}}function m0(i){let t=this,e=null,n=0,s=!1,r=!1,o=new Hn,a=new oe,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(f,h){let d=f.length!==0||h||n!==0||s;return s=h,n=f.length,d},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,h){e=u(f,h,0)},this.setState=function(f,h,d){let g=f.clippingPlanes,v=f.clipIntersection,p=f.clipShadows,m=i.get(f);if(!s||g===null||g.length===0||r&&!p)r?u(null):l();else{let w=r?0:n,R=w*4,M=m.clippingState||null;c.value=M,M=u(g,h,R,d);for(let A=0;A!==R;++A)M[A]=e[A];m.clippingState=M,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=w}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function u(f,h,d,g){let v=f!==null?f.length:0,p=null;if(v!==0){if(p=c.value,g!==!0||p===null){let m=d+v*4,w=h.matrixWorldInverse;a.getNormalMatrix(w),(p===null||p.length<m)&&(p=new Float32Array(m));for(let R=0,M=d;R!==v;++R,M+=4)o.copy(f[R]).applyMatrix4(w,a),o.normal.toArray(p,M),p[M+3]=o.constant}c.value=p,c.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,p}}var qs=4,g0=6,x0=20,_0=256,$r=new _i,ld=new re,ih=null,sh=0,rh=0,oh=!1,y0=new O,as=new O,xl=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,n=.1,s=100,r={}){let{size:o=256,position:a=y0}=r;ih=this._renderer.getRenderTarget(),sh=this._renderer.getActiveCubeFace(),rh=this._renderer.getActiveMipmapLevel(),oh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);let c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,n,s,c,a),e>0&&this._blur(c,0,0,e),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ud(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=hd(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(ih,sh,rh),this._renderer.xr.enabled=oh,t.scissorTest=!1,Xs(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Oi||t.mapping===rs?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),ih=this._renderer.getRenderTarget(),sh=this._renderer.getActiveCubeFace(),rh=this._renderer.getActiveMipmapLevel(),oh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Ze,minFilter:Ze,generateMipmaps:!1,type:$n,format:Un,colorSpace:gr,depthBuffer:!1},s=cd(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=cd(t,e,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=v0(r)),this._blurMaterial=M0(r,t,e),this._ggxMaterial=b0(r,t,e)}return s}_compileMaterial(t){let e=new Ne(new rn,t);this._renderer.compile(e,$r)}_sceneToCubeUV(t,e,n,s,r){let c=new mn(90,1,e,n),l=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],f=this._renderer,h=f.autoClear,d=f.toneMapping;f.getClearColor(ld),f.toneMapping=Xn,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(s),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Ne(new Nn,new Dn({name:"PMREM.Background",side:Ke,depthWrite:!1,depthTest:!1})));let v=this._backgroundBox,p=v.material,m=!1,w=t.background;w?w.isColor&&(p.color.copy(w),t.background=null,m=!0):(p.color.copy(ld),m=!0);for(let R=0;R<6;R++){let M=R%3;M===0?(c.up.set(0,l[R],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+u[R],r.y,r.z)):M===1?(c.up.set(0,0,l[R]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+u[R],r.z)):(c.up.set(0,l[R],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+u[R]));let A=this._cubeSize;Xs(s,M*A,R>2?A:0,A,A),f.setRenderTarget(s),m&&f.render(v,c),f.render(t,c)}f.toneMapping=d,f.autoClear=h,t.background=w}_textureToCubeUV(t,e){let n=this._renderer,s=t.mapping===Oi||t.mapping===rs;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=ud()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=hd());let r=s?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=r;let a=r.uniforms;a.envMap.value=t;let c=this._cubeSize;Xs(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(o,$r)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;let s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(t,r-1,r);e.autoClear=n}_applyGGXFilter(t,e,n){let s=this._renderer,r=this._pingPongRenderTarget,o=this._ggxMaterial,a=this._lodMeshes[n];a.material=o;let c=o.uniforms,l=n/(this._lodMeshes.length-1),u=e/(this._lodMeshes.length-1),f=Math.sqrt(l*l-u*u),h=l*1.25,d=f*h,{_lodMax:g}=this,v=this._sizeLods[n],p=3*v*(n>g-qs?n-g+qs:0),m=4*(this._cubeSize-v);c.envMap.value=t.texture,c.roughness.value=d,c.mipInt.value=g-e,Xs(r,p,m,3*v,2*v),s.setRenderTarget(r),s.render(a,$r),c.envMap.value=r.texture,c.roughness.value=0,c.mipInt.value=g-n,Xs(t,p,m,3*v,2*v),s.setRenderTarget(t),s.render(a,$r)}_blur(t,e,n,s){let r=this._pingPongRenderTarget,o=Math.min(s,Math.PI)/Math.SQRT2;this._blurPass(t,r,e,n,o),this._blurPass(r,t,n,n,o)}_blurPass(t,e,n,s,r){let o=this._renderer,a=this._blurMaterial,c=this._lodMeshes[s];c.material=a;let l=a.uniforms;l.envMap.value=t.texture,l.sigma.value=r,l.mipInt.value=this._lodMax-n;let u=this._sizeLods[s],f=3*u*(s>this._lodMax-qs?s-this._lodMax+qs:0),h=4*(this._cubeSize-u);Xs(e,f,h,3*u,2*u),o.setRenderTarget(e),o.render(c,$r)}};function v0(i){let t=[],e=[],n=i,s=i-qs+1+g0;for(let r=0;r<s;r++){let o=Math.pow(2,n);t.push(o);let a=1/(o-2),c=-a,l=1+a,u=[c,c,l,c,l,l,c,c,l,l,c,l],f=6,h=6,d=3,g=new Float32Array(d*h*f),v=new Float32Array(d*h*f);for(let m=0;m<f;m++){let w=m%3*2/3-1,R=m>2?0:-1,M=[w,R,0,w+2/3,R,0,w+2/3,R+1,0,w,R,0,w+2/3,R+1,0,w,R+1,0];g.set(M,d*h*m);for(let A=0;A<h;A++){let S=u[A*2]*2-1,I=u[A*2+1]*2-1;m===0?as.set(1,I,S):m===1?as.set(-S,1,-I):m===2?as.set(-S,I,1):m===3?as.set(-1,I,-S):m===4?as.set(-S,-1,I):as.set(S,I,-1),as.toArray(v,(m*h+A)*d)}}let p=new rn;p.setAttribute("position",new gn(g,d)),p.setAttribute("outputDirection",new gn(v,d)),e.push(new Ne(p,null)),n>qs&&n--}return{lodMeshes:e,sizeLods:t}}function cd(i,t,e){let n=new _n(i,t,e);return n.texture.mapping=kr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Xs(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function b0(i,t,e){return new En({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:_0,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:vl(),fragmentShader:`

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
		`,blending:si,depthTest:!1,depthWrite:!1})}function M0(i,t,e){return new En({name:"SphericalGaussianBlur",defines:{SAMPLES:x0,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:vl(),fragmentShader:`

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
		`,blending:si,depthTest:!1,depthWrite:!1})}function hd(){return new En({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:vl(),fragmentShader:`

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
		`,blending:si,depthTest:!1,depthWrite:!1})}function ud(){return new En({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:vl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:si,depthTest:!1,depthWrite:!1})}function vl(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var _l=class extends _n{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new Mr(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Nn(5,5,5),r=new En({name:"CubemapFromEquirect",uniforms:os(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ke,blending:si});r.uniforms.tEquirect.value=e;let o=new Ne(s,r),a=e.minFilter;return e.minFilter===Bi&&(e.minFilter=Ze),new wa(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){let r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}};function S0(i){let t=new WeakMap,e=new WeakMap,n=null;function s(h,d=!1){return h==null?null:d?o(h):r(h)}function r(h){if(h&&h.isTexture){let d=h.mapping;if(d===Aa||d===Ea)if(t.has(h)){let g=t.get(h).texture;return a(g,h.mapping)}else{let g=h.image;if(g&&g.height>0){let v=new _l(g.height);return v.fromEquirectangularTexture(i,h),t.set(h,v),h.addEventListener("dispose",l),a(v.texture,h.mapping)}else return null}}return h}function o(h){if(h&&h.isTexture){let d=h.mapping,g=d===Aa||d===Ea,v=d===Oi||d===rs;if(g||v){let p=e.get(h),m=p!==void 0?p.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==m)return n===null&&(n=new xl(i)),p=g?n.fromEquirectangular(h,p):n.fromCubemap(h,p),p.texture.pmremVersion=h.pmremVersion,e.set(h,p),p.texture;if(p!==void 0)return p.texture;{let w=h.image;return g&&w&&w.height>0||v&&w&&c(w)?(n===null&&(n=new xl(i)),p=g?n.fromEquirectangular(h):n.fromCubemap(h),p.texture.pmremVersion=h.pmremVersion,e.set(h,p),h.addEventListener("dispose",u),p.texture):null}}}return h}function a(h,d){return d===Aa?h.mapping=Oi:d===Ea&&(h.mapping=rs),h}function c(h){let d=0,g=6;for(let v=0;v<g;v++)h[v]!==void 0&&d++;return d===g}function l(h){let d=h.target;d.removeEventListener("dispose",l);let g=t.get(d);g!==void 0&&(t.delete(d),g.dispose())}function u(h){let d=h.target;d.removeEventListener("dispose",u);let g=e.get(d);g!==void 0&&(e.delete(d),g.dispose())}function f(){t=new WeakMap,e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:f}}function w0(i){let t={};function e(n){if(t[n]!==void 0)return t[n];let s=i.getExtension(n);return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let s=e(n);return s===null&&ji("WebGLRenderer: "+n+" extension not supported."),s}}}function T0(i,t,e,n){let s={},r=new WeakMap;function o(f){let h=f.target;h.index!==null&&t.remove(h.index);for(let g in h.attributes)t.remove(h.attributes[g]);h.removeEventListener("dispose",o),delete s[h.id];let d=r.get(h);d&&(t.remove(d),r.delete(h)),n.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,e.memory.geometries--}function a(f,h){return s[h.id]===!0||(h.addEventListener("dispose",o),s[h.id]=!0,e.memory.geometries++),h}function c(f){let h=f.attributes;for(let d in h)t.update(h[d],i.ARRAY_BUFFER)}function l(f){let h=[],d=f.index,g=f.attributes.position,v=0;if(g===void 0)return;if(d!==null){let w=d.array;v=d.version;for(let R=0,M=w.length;R<M;R+=3){let A=w[R+0],S=w[R+1],I=w[R+2];h.push(A,S,S,I,I,A)}}else{let w=g.array;v=g.version;for(let R=0,M=w.length/3-1;R<M;R+=3){let A=R+0,S=R+1,I=R+2;h.push(A,S,S,I,I,A)}}let p=new(g.count>=65535?br:vr)(h,1);p.version=v;let m=r.get(f);m&&t.remove(m),r.set(f,p)}function u(f){let h=r.get(f);if(h){let d=f.index;d!==null&&h.version<d.version&&l(f)}else l(f);return r.get(f)}return{get:a,update:c,getWireframeAttribute:u}}function A0(i,t,e){let n;function s(f){n=f}let r,o;function a(f){r=f.type,o=f.bytesPerElement}function c(f,h){i.drawElements(n,h,r,f*o),e.update(h,n,1)}function l(f,h,d){d!==0&&(i.drawElementsInstanced(n,h,r,f*o,d),e.update(h,n,d))}function u(f,h,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,h,0,r,f,0,d);let v=0;for(let p=0;p<d;p++)v+=h[p];e.update(v,n,1)}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function E0(i){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:ne("WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function C0(i,t,e){let n=new WeakMap,s=new Ue;function r(o,a,c){let l=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,f=u!==void 0?u.length:0,h=n.get(a);if(h===void 0||h.count!==f){let E=function(){I.dispose(),n.delete(a),a.removeEventListener("dispose",E)};h!==void 0&&h.texture.dispose();let d=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,v=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],m=a.morphAttributes.normal||[],w=a.morphAttributes.color||[],R=0;d===!0&&(R=1),g===!0&&(R=2),v===!0&&(R=3);let M=a.attributes.position.count*R,A=1;M>t.maxTextureSize&&(A=Math.ceil(M/t.maxTextureSize),M=t.maxTextureSize);let S=new Float32Array(M*A*4*f),I=new yr(S,M,A,f);I.type=Yn,I.needsUpdate=!0;let _=R*4;for(let N=0;N<f;N++){let P=p[N],k=m[N],W=w[N],U=M*A*4*N;for(let B=0;B<P.count;B++){let Y=B*_;d===!0&&(s.fromBufferAttribute(P,B),S[U+Y+0]=s.x,S[U+Y+1]=s.y,S[U+Y+2]=s.z,S[U+Y+3]=0),g===!0&&(s.fromBufferAttribute(k,B),S[U+Y+4]=s.x,S[U+Y+5]=s.y,S[U+Y+6]=s.z,S[U+Y+7]=0),v===!0&&(s.fromBufferAttribute(W,B),S[U+Y+8]=s.x,S[U+Y+9]=s.y,S[U+Y+10]=s.z,S[U+Y+11]=W.itemSize===4?s.w:1)}}h={count:f,texture:I,size:new vt(M,A)},n.set(a,h),a.addEventListener("dispose",E)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let d=0;for(let v=0;v<l.length;v++)d+=l[v];let g=a.morphTargetsRelative?1:1-d;c.getUniforms().setValue(i,"morphTargetBaseInfluence",g),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",h.texture,e),c.getUniforms().setValue(i,"morphTargetsTextureSize",h.size)}return{update:r}}function R0(i,t,e,n,s){let r=new WeakMap;function o(l){let u=s.render.frame,f=l.geometry,h=t.get(l,f);if(r.get(h)!==u&&(t.update(h),r.set(h,u)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==u&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,u))),l.isSkinnedMesh){let d=l.skeleton;r.get(d)!==u&&(d.update(),r.set(d,u))}return h}function a(){r=new WeakMap}function c(l){let u=l.target;u.removeEventListener("dispose",c),n.releaseStatesOfObject(u),e.remove(u.instanceMatrix),u.instanceColor!==null&&e.remove(u.instanceColor)}return{update:o,dispose:a}}var I0={[Nc]:"LINEAR_TONE_MAPPING",[Uc]:"REINHARD_TONE_MAPPING",[Fc]:"CINEON_TONE_MAPPING",[zr]:"ACES_FILMIC_TONE_MAPPING",[Bc]:"AGX_TONE_MAPPING",[zc]:"NEUTRAL_TONE_MAPPING",[Oc]:"CUSTOM_TONE_MAPPING"};function P0(i,t,e,n,s,r){let o=new _n(t,e,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),a=null,c=null,l=new rn;l.setAttribute("position",new Be([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new Be([0,2,0,0,2,0],2));let u=new ha({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),f=new Ne(l,u),h=new _i(-1,1,1,-1,0,1),d=null,g=null,v=!1,p,m=null,w=[],R=!1;this.setSize=function(M,A){o.setSize(M,A),a!==null&&a.setSize(M,A),c!==null&&c.setSize(M,A);for(let S=0;S<w.length;S++){let I=w[S];I.setSize&&I.setSize(M,A)}},this.setEffects=function(M){w=M,R=w.length>0&&w[0].isRenderPass===!0;let A=o.width,S=o.height;w.length>0&&a===null&&(a=new _n(A,S,{type:$n,depthBuffer:!1,stencilBuffer:!1}),c=new _n(A,S,{type:$n,depthBuffer:!1,stencilBuffer:!1}));for(let I=0;I<w.length;I++){let _=w[I];_.setSize&&_.setSize(A,S)}},this.begin=function(M,A){if(v||M.toneMapping===Xn&&w.length===0)return!1;if(m=A,A!==null){let S=A.width,I=A.height;(o.width!==S||o.height!==I)&&this.setSize(S,I)}return R===!1&&M.setRenderTarget(o),p=M.toneMapping,M.toneMapping=Xn,!0},this.hasRenderPass=function(){return R},this.end=function(M,A){M.toneMapping=p,v=!0;let S=o,I=a;for(let _=0;_<w.length;_++){let E=w[_];E.enabled!==!1&&(E.render(M,I,S,A),E.needsSwap!==!1&&(S=I,I=I===a?c:a))}if(d!==M.outputColorSpace||g!==M.toneMapping){d=M.outputColorSpace,g=M.toneMapping,u.defines={},pe.getTransfer(d)===Te&&(u.defines.SRGB_TRANSFER="");let _=I0[g];_&&(u.defines[_]=""),u.needsUpdate=!0}u.uniforms.tDiffuse.value=S.texture,M.setRenderTarget(m),M.render(f,h),m=null,v=!1},this.isCompositing=function(){return v},this.dispose=function(){o.dispose(),a!==null&&a.dispose(),c!==null&&c.dispose(),l.dispose(),u.dispose()}}var Pd=new xn,ch=new Ii(1,1),Ld=new yr,Dd=new jo,Nd=new Mr,dd=[],fd=[],pd=new Float32Array(16),md=new Float32Array(9),gd=new Float32Array(4);function $s(i,t,e){let n=i[0];if(n<=0||n>0)return i;let s=t*e,r=dd[s];if(r===void 0&&(r=new Float32Array(s),dd[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function Ge(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function He(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function bl(i,t){let e=fd[t];e===void 0&&(e=new Int32Array(t),fd[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function L0(i,t){let e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function D0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ge(e,t))return;i.uniform2fv(this.addr,t),He(e,t)}}function N0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ge(e,t))return;i.uniform3fv(this.addr,t),He(e,t)}}function U0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ge(e,t))return;i.uniform4fv(this.addr,t),He(e,t)}}function F0(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ge(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),He(e,t)}else{if(Ge(e,n))return;gd.set(n),i.uniformMatrix2fv(this.addr,!1,gd),He(e,n)}}function O0(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ge(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),He(e,t)}else{if(Ge(e,n))return;md.set(n),i.uniformMatrix3fv(this.addr,!1,md),He(e,n)}}function B0(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ge(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),He(e,t)}else{if(Ge(e,n))return;pd.set(n),i.uniformMatrix4fv(this.addr,!1,pd),He(e,n)}}function z0(i,t){let e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function k0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ge(e,t))return;i.uniform2iv(this.addr,t),He(e,t)}}function V0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ge(e,t))return;i.uniform3iv(this.addr,t),He(e,t)}}function G0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ge(e,t))return;i.uniform4iv(this.addr,t),He(e,t)}}function H0(i,t){let e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function W0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ge(e,t))return;i.uniform2uiv(this.addr,t),He(e,t)}}function X0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ge(e,t))return;i.uniform3uiv(this.addr,t),He(e,t)}}function q0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ge(e,t))return;i.uniform4uiv(this.addr,t),He(e,t)}}function Y0(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(ch.compareFunction=e.isReversedDepthBuffer()?pl:fl,r=ch):r=Pd,e.setTexture2D(t||r,s)}function $0(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||Dd,s)}function Z0(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||Nd,s)}function J0(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||Ld,s)}function K0(i){switch(i){case 5126:return L0;case 35664:return D0;case 35665:return N0;case 35666:return U0;case 35674:return F0;case 35675:return O0;case 35676:return B0;case 5124:case 35670:return z0;case 35667:case 35671:return k0;case 35668:case 35672:return V0;case 35669:case 35673:return G0;case 5125:return H0;case 36294:return W0;case 36295:return X0;case 36296:return q0;case 35678:case 36198:case 36298:case 36306:case 35682:return Y0;case 35679:case 36299:case 36307:return $0;case 35680:case 36300:case 36308:case 36293:return Z0;case 36289:case 36303:case 36311:case 36292:return J0}}function j0(i,t){i.uniform1fv(this.addr,t)}function Q0(i,t){let e=$s(t,this.size,2);i.uniform2fv(this.addr,e)}function tx(i,t){let e=$s(t,this.size,3);i.uniform3fv(this.addr,e)}function ex(i,t){let e=$s(t,this.size,4);i.uniform4fv(this.addr,e)}function nx(i,t){let e=$s(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function ix(i,t){let e=$s(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function sx(i,t){let e=$s(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function rx(i,t){i.uniform1iv(this.addr,t)}function ox(i,t){i.uniform2iv(this.addr,t)}function ax(i,t){i.uniform3iv(this.addr,t)}function lx(i,t){i.uniform4iv(this.addr,t)}function cx(i,t){i.uniform1uiv(this.addr,t)}function hx(i,t){i.uniform2uiv(this.addr,t)}function ux(i,t){i.uniform3uiv(this.addr,t)}function dx(i,t){i.uniform4uiv(this.addr,t)}function fx(i,t,e){let n=this.cache,s=t.length,r=bl(e,s);Ge(n,r)||(i.uniform1iv(this.addr,r),He(n,r));let o;this.type===i.SAMPLER_2D_SHADOW?o=ch:o=Pd;for(let a=0;a!==s;++a)e.setTexture2D(t[a]||o,r[a])}function px(i,t,e){let n=this.cache,s=t.length,r=bl(e,s);Ge(n,r)||(i.uniform1iv(this.addr,r),He(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||Dd,r[o])}function mx(i,t,e){let n=this.cache,s=t.length,r=bl(e,s);Ge(n,r)||(i.uniform1iv(this.addr,r),He(n,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||Nd,r[o])}function gx(i,t,e){let n=this.cache,s=t.length,r=bl(e,s);Ge(n,r)||(i.uniform1iv(this.addr,r),He(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||Ld,r[o])}function xx(i){switch(i){case 5126:return j0;case 35664:return Q0;case 35665:return tx;case 35666:return ex;case 35674:return nx;case 35675:return ix;case 35676:return sx;case 5124:case 35670:return rx;case 35667:case 35671:return ox;case 35668:case 35672:return ax;case 35669:case 35673:return lx;case 5125:return cx;case 36294:return hx;case 36295:return ux;case 36296:return dx;case 35678:case 36198:case 36298:case 36306:case 35682:return fx;case 35679:case 36299:case 36307:return px;case 35680:case 36300:case 36308:case 36293:return mx;case 36289:case 36303:case 36311:case 36292:return gx}}var hh=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=K0(e.type)}},uh=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=xx(e.type)}},dh=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(t,e[a.id],n)}}},ah=/(\w+)(\])?(\[|\.)?/g;function xd(i,t){i.seq.push(t),i.map[t.id]=t}function _x(i,t,e){let n=i.name,s=n.length;for(ah.lastIndex=0;;){let r=ah.exec(n),o=ah.lastIndex,a=r[1],c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){xd(e,l===void 0?new hh(a,i,t):new uh(a,i,t));break}else{let f=e.map[a];f===void 0&&(f=new dh(a),xd(e,f)),e=f}}}var Ys=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let o=0;o<n;++o){let a=t.getActiveUniform(e,o),c=t.getUniformLocation(e,a.name);_x(a,c,this)}let s=[],r=[];for(let o of this.seq)o.type===t.SAMPLER_2D_SHADOW||o.type===t.SAMPLER_CUBE_SHADOW||o.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(o):r.push(o);s.length>0&&(this.seq=s.concat(r))}setValue(t,e,n,s){let r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){let s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){let a=e[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,s)}}static seqWithValue(t,e){let n=[];for(let s=0,r=t.length;s!==r;++s){let o=t[s];o.id in e&&n.push(o)}return n}};function _d(i,t,e){let n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}var yx=37297,vx=0;function bx(i,t){let e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){let a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}var yd=new oe;function Mx(i){pe._getMatrix(yd,pe.workingColorSpace,i);let t=`mat3( ${yd.elements.map(e=>e.toFixed(4))} )`;switch(pe.getTransfer(i)){case xr:return[t,"LinearTransferOETF"];case Te:return[t,"sRGBTransferOETF"];default:return te("WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function vd(i,t,e){let n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";let o=/ERROR: 0:(\d+)/.exec(r);if(o){let a=parseInt(o[1]);return e.toUpperCase()+`

`+r+`

`+bx(i.getShaderSource(t),a)}else return r}function Sx(i,t){let e=Mx(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}var wx={[Nc]:"Linear",[Uc]:"Reinhard",[Fc]:"Cineon",[zr]:"ACESFilmic",[Bc]:"AgX",[zc]:"Neutral",[Oc]:"Custom"};function Tx(i,t){let e=wx[t];return e===void 0?(te("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var gl=new O;function Ax(){pe.getLuminanceCoefficients(gl);let i=gl.x.toFixed(4),t=gl.y.toFixed(4),e=gl.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Ex(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Jr).join(`
`)}function Cx(i){let t=[];for(let e in i){let n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Rx(i,t){let e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(t,s),o=r.name,a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function Jr(i){return i!==""}function bd(i,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Md(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Ix=/^[ \t]*#include +<([\w\d./]+)>/gm;function fh(i){return i.replace(Ix,Lx)}var Px=new Map;function Lx(i,t){let e=le[t];if(e===void 0){let n=Px.get(t);if(n!==void 0)e=le[n],te('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return fh(e)}var Dx=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Sd(i){return i.replace(Dx,Nx)}function Nx(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function wd(i){let t=`precision ${i.precision} float;
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
#define LOW_PRECISION`),t}var Ux={[is]:"SHADOWMAP_TYPE_PCF",[ks]:"SHADOWMAP_TYPE_VSM"};function Fx(i){return Ux[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var Ox={[Oi]:"ENVMAP_TYPE_CUBE",[rs]:"ENVMAP_TYPE_CUBE",[kr]:"ENVMAP_TYPE_CUBE_UV"};function Bx(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":Ox[i.envMapMode]||"ENVMAP_TYPE_CUBE"}var zx={[rs]:"ENVMAP_MODE_REFRACTION"};function kx(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":zx[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var Vx={[Dc]:"ENVMAP_BLENDING_MULTIPLY",[Bu]:"ENVMAP_BLENDING_MIX",[zu]:"ENVMAP_BLENDING_ADD"};function Gx(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":Vx[i.combine]||"ENVMAP_BLENDING_NONE"}function Hx(i){let t=i.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function Wx(i,t,e,n){let s=i.getContext(),r=e.defines,o=e.vertexShader,a=e.fragmentShader,c=Fx(e),l=Bx(e),u=kx(e),f=Gx(e),h=Hx(e),d=Ex(e),g=Cx(r),v=s.createProgram(),p,m,w=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Jr).join(`
`),p.length>0&&(p+=`
`),m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Jr).join(`
`),m.length>0&&(m+=`
`)):(p=[wd(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Jr).join(`
`),m=[wd(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+u:"",e.envMap?"#define "+f:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Xn?"#define TONE_MAPPING":"",e.toneMapping!==Xn?le.tonemapping_pars_fragment:"",e.toneMapping!==Xn?Tx("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",le.colorspace_pars_fragment,Sx("linearToOutputTexel",e.outputColorSpace),Ax(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Jr).join(`
`)),o=fh(o),o=bd(o,e),o=Md(o,e),a=fh(a),a=bd(a,e),a=Md(a,e),o=Sd(o),a=Sd(a),e.isRawShaderMaterial!==!0&&(w=`#version 300 es
`,p=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,m=["#define varying in",e.glslVersion===Jc?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Jc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);let R=w+p+o,M=w+m+a,A=_d(s,s.VERTEX_SHADER,R),S=_d(s,s.FRAGMENT_SHADER,M);s.attachShader(v,A),s.attachShader(v,S),e.index0AttributeName!==void 0?s.bindAttribLocation(v,0,e.index0AttributeName):e.hasPositionAttribute===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function I(P){if(i.debug.checkShaderErrors){let k=s.getProgramInfoLog(v)||"",W=s.getShaderInfoLog(A)||"",U=s.getShaderInfoLog(S)||"",B=k.trim(),Y=W.trim(),D=U.trim(),Q=!0,X=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(Q=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,v,A,S);else{let q=vd(s,A,"vertex"),tt=vd(s,S,"fragment");ne("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+B+`
`+q+`
`+tt)}else B!==""?te("WebGLProgram: Program Info Log:",B):(Y===""||D==="")&&(X=!1);X&&(P.diagnostics={runnable:Q,programLog:B,vertexShader:{log:Y,prefix:p},fragmentShader:{log:D,prefix:m}})}s.deleteShader(A),s.deleteShader(S),_=new Ys(s,v),E=Rx(s,v)}let _;this.getUniforms=function(){return _===void 0&&I(this),_};let E;this.getAttributes=function(){return E===void 0&&I(this),E};let N=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return N===!1&&(N=s.getProgramParameter(v,yx)),N},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=vx++,this.cacheKey=t,this.usedTimes=1,this.program=v,this.vertexShader=A,this.fragmentShader=S,this}var Xx=0,ph=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,n){let s=this._getShaderCacheForMaterial(t);return s.has(e)===!1&&(s.add(e),e.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new mh(t),e.set(t,n)),n}},mh=class{constructor(t){this.id=Xx++,this.code=t,this.usedTimes=0}};function qx(i){return i===ki||i===qr||i===Yr}function Yx(i,t,e,n,s,r){let o=new Is,a=new ph,c=new Set,l=[],u=new Map,f=n.logarithmicDepthBuffer,h=n.precision,d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(_){return c.add(_),_===0?"uv":`uv${_}`}function v(_,E,N,P,k,W){let U=P.fog,B=k.geometry,Y=_.isMeshStandardMaterial||_.isMeshLambertMaterial||_.isMeshPhongMaterial?P.environment:null,D=_.isMeshStandardMaterial||_.isMeshLambertMaterial&&!_.envMap||_.isMeshPhongMaterial&&!_.envMap,Q=t.get(_.envMap||Y,D),X=Q&&Q.mapping===kr?Q.image.height:null,q=d[_.type];_.precision!==null&&(h=n.getMaxPrecision(_.precision),h!==_.precision&&te("WebGLProgram.getParameters:",_.precision,"not supported, using",h,"instead."));let tt=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,pt=tt!==void 0?tt.length:0,lt=0;B.morphAttributes.position!==void 0&&(lt=1),B.morphAttributes.normal!==void 0&&(lt=2),B.morphAttributes.color!==void 0&&(lt=3);let Kt,Ct,Jt,nt;if(q){let we=oi[q];Kt=we.vertexShader,Ct=we.fragmentShader}else{Kt=_.vertexShader,Ct=_.fragmentShader;let we=a.getVertexShaderStage(_),ve=a.getFragmentShaderStage(_);a.update(_,we,ve),Jt=we.id,nt=ve.id}let at=i.getRenderTarget(),bt=i.state.buffers.depth.getReversed(),Vt=k.isInstancedMesh===!0,dt=k.isBatchedMesh===!0,Bt=!!_.map,ye=!!_.matcap,ht=!!Q,mt=!!_.aoMap,_t=!!_.lightMap,gt=!!_.bumpMap&&_.wireframe===!1,Tt=!!_.normalMap,jt=!!_.displacementMap,$t=!!_.emissiveMap,Qt=!!_.metalnessMap,ie=!!_.roughnessMap,L=_.anisotropy>0,fe=_.clearcoat>0,ae=_.dispersion>0,C=_.retroreflectivity>0,x=_.iridescence>0,z=_.sheen>0,Z=_.transmission>0,et=L&&!!_.anisotropyMap,yt=fe&&!!_.clearcoatMap,St=fe&&!!_.clearcoatNormalMap,ot=fe&&!!_.clearcoatRoughnessMap,ut=x&&!!_.iridescenceMap,At=x&&!!_.iridescenceThicknessMap,Xt=z&&!!_.sheenColorMap,Lt=z&&!!_.sheenRoughnessMap,Pt=!!_.specularMap,Nt=!!_.specularColorMap,Wt=!!_.specularIntensityMap,se=Z&&!!_.transmissionMap,F=Z&&!!_.thicknessMap,Et=!!_.gradientMap,ct=!!_.alphaMap,Rt=_.alphaTest>0,Ut=!!_.alphaHash,ft=!!_.extensions,qt=Xn;_.toneMapped&&(at===null||at.isXRRenderTarget===!0)&&(qt=i.toneMapping);let Gt={shaderID:q,shaderType:_.type,shaderName:_.name,vertexShader:Kt,fragmentShader:Ct,defines:_.defines,customVertexShaderID:Jt,customFragmentShaderID:nt,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:h,batching:dt,batchingColor:dt&&k._colorsTexture!==null,instancing:Vt,instancingColor:Vt&&k.instanceColor!==null,instancingMorph:Vt&&k.morphTexture!==null,outputColorSpace:at===null?i.outputColorSpace:at.isXRRenderTarget===!0?at.texture.colorSpace:pe.workingColorSpace,alphaToCoverage:!!_.alphaToCoverage,map:Bt,matcap:ye,envMap:ht,envMapMode:ht&&Q.mapping,envMapCubeUVHeight:X,aoMap:mt,lightMap:_t,bumpMap:gt,normalMap:Tt,displacementMap:jt,emissiveMap:$t,normalMapObjectSpace:Tt&&_.normalMapType===Gu,normalMapTangentSpace:Tt&&_.normalMapType===ul,packedNormalMap:Tt&&_.normalMapType===ul&&qx(_.normalMap.format),metalnessMap:Qt,roughnessMap:ie,anisotropy:L,anisotropyMap:et,clearcoat:fe,clearcoatMap:yt,clearcoatNormalMap:St,clearcoatRoughnessMap:ot,dispersion:ae,retroreflection:C,iridescence:x,iridescenceMap:ut,iridescenceThicknessMap:At,sheen:z,sheenColorMap:Xt,sheenRoughnessMap:Lt,specularMap:Pt,specularColorMap:Nt,specularIntensityMap:Wt,transmission:Z,transmissionMap:se,thicknessMap:F,gradientMap:Et,opaque:_.transparent===!1&&_.blending===Vs&&_.alphaToCoverage===!1,alphaMap:ct,alphaTest:Rt,alphaHash:Ut,combine:_.combine,mapUv:Bt&&g(_.map.channel),aoMapUv:mt&&g(_.aoMap.channel),lightMapUv:_t&&g(_.lightMap.channel),bumpMapUv:gt&&g(_.bumpMap.channel),normalMapUv:Tt&&g(_.normalMap.channel),displacementMapUv:jt&&g(_.displacementMap.channel),emissiveMapUv:$t&&g(_.emissiveMap.channel),metalnessMapUv:Qt&&g(_.metalnessMap.channel),roughnessMapUv:ie&&g(_.roughnessMap.channel),anisotropyMapUv:et&&g(_.anisotropyMap.channel),clearcoatMapUv:yt&&g(_.clearcoatMap.channel),clearcoatNormalMapUv:St&&g(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ot&&g(_.clearcoatRoughnessMap.channel),iridescenceMapUv:ut&&g(_.iridescenceMap.channel),iridescenceThicknessMapUv:At&&g(_.iridescenceThicknessMap.channel),sheenColorMapUv:Xt&&g(_.sheenColorMap.channel),sheenRoughnessMapUv:Lt&&g(_.sheenRoughnessMap.channel),specularMapUv:Pt&&g(_.specularMap.channel),specularColorMapUv:Nt&&g(_.specularColorMap.channel),specularIntensityMapUv:Wt&&g(_.specularIntensityMap.channel),transmissionMapUv:se&&g(_.transmissionMap.channel),thicknessMapUv:F&&g(_.thicknessMap.channel),alphaMapUv:ct&&g(_.alphaMap.channel),vertexTangents:!!B.attributes.tangent&&(Tt||L),vertexNormals:!!B.attributes.normal,vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,pointsUvs:k.isPoints===!0&&!!B.attributes.uv&&(Bt||ct),fog:!!U,useFog:_.fog===!0,fogExp2:!!U&&U.isFogExp2,flatShading:_.wireframe===!1&&(_.flatShading===!0||B.attributes.normal===void 0&&Tt===!1&&(_.isMeshLambertMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isMeshPhysicalMaterial)),sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:bt,skinning:k.isSkinnedMesh===!0,hasPositionAttribute:B.attributes.position!==void 0,morphTargets:B.morphAttributes.position!==void 0,morphNormals:B.morphAttributes.normal!==void 0,morphColors:B.morphAttributes.color!==void 0,morphTargetsCount:pt,morphTextureStride:lt,numSunLights:E.sun.length,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numSunLightShadows:E.sunShadowMap.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numLightProbeGrids:W.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:_.dithering,shadowMapEnabled:i.shadowMap.enabled&&N.length>0,shadowMapType:i.shadowMap.type,toneMapping:qt,decodeVideoTexture:Bt&&_.map.isVideoTexture===!0&&pe.getTransfer(_.map.colorSpace)===Te,decodeVideoTextureEmissive:$t&&_.emissiveMap.isVideoTexture===!0&&pe.getTransfer(_.emissiveMap.colorSpace)===Te,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===ii,flipSided:_.side===Ke,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:ft&&_.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ft&&_.extensions.multiDraw===!0||dt)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return Gt.vertexUv1s=c.has(1),Gt.vertexUv2s=c.has(2),Gt.vertexUv3s=c.has(3),c.clear(),Gt}function p(_){let E=[];if(_.shaderID?E.push(_.shaderID):(E.push(_.customVertexShaderID),E.push(_.customFragmentShaderID)),_.defines!==void 0)for(let N in _.defines)E.push(N),E.push(_.defines[N]);return _.isRawShaderMaterial===!1&&(m(E,_),w(E,_),E.push(i.outputColorSpace)),E.push(_.customProgramCacheKey),E.join()}function m(_,E){_.push(E.precision),_.push(E.outputColorSpace),_.push(E.envMapMode),_.push(E.envMapCubeUVHeight),_.push(E.mapUv),_.push(E.alphaMapUv),_.push(E.lightMapUv),_.push(E.aoMapUv),_.push(E.bumpMapUv),_.push(E.normalMapUv),_.push(E.displacementMapUv),_.push(E.emissiveMapUv),_.push(E.metalnessMapUv),_.push(E.roughnessMapUv),_.push(E.anisotropyMapUv),_.push(E.clearcoatMapUv),_.push(E.clearcoatNormalMapUv),_.push(E.clearcoatRoughnessMapUv),_.push(E.iridescenceMapUv),_.push(E.iridescenceThicknessMapUv),_.push(E.sheenColorMapUv),_.push(E.sheenRoughnessMapUv),_.push(E.specularMapUv),_.push(E.specularColorMapUv),_.push(E.specularIntensityMapUv),_.push(E.transmissionMapUv),_.push(E.thicknessMapUv),_.push(E.combine),_.push(E.fogExp2),_.push(E.sizeAttenuation),_.push(E.morphTargetsCount),_.push(E.morphAttributeCount),_.push(E.numSunLights),_.push(E.numDirLights),_.push(E.numPointLights),_.push(E.numSpotLights),_.push(E.numSpotLightMaps),_.push(E.numHemiLights),_.push(E.numRectAreaLights),_.push(E.numSunLightShadows),_.push(E.numDirLightShadows),_.push(E.numPointLightShadows),_.push(E.numSpotLightShadows),_.push(E.numSpotLightShadowsWithMaps),_.push(E.numLightProbes),_.push(E.shadowMapType),_.push(E.toneMapping),_.push(E.numClippingPlanes),_.push(E.numClipIntersection),_.push(E.depthPacking)}function w(_,E){o.disableAll(),E.instancing&&o.enable(0),E.instancingColor&&o.enable(1),E.instancingMorph&&o.enable(2),E.matcap&&o.enable(3),E.envMap&&o.enable(4),E.normalMapObjectSpace&&o.enable(5),E.normalMapTangentSpace&&o.enable(6),E.clearcoat&&o.enable(7),E.iridescence&&o.enable(8),E.alphaTest&&o.enable(9),E.vertexColors&&o.enable(10),E.vertexAlphas&&o.enable(11),E.vertexUv1s&&o.enable(12),E.vertexUv2s&&o.enable(13),E.vertexUv3s&&o.enable(14),E.vertexTangents&&o.enable(15),E.anisotropy&&o.enable(16),E.alphaHash&&o.enable(17),E.batching&&o.enable(18),E.dispersion&&o.enable(19),E.retroreflection&&o.enable(24),E.batchingColor&&o.enable(20),E.gradientMap&&o.enable(21),E.packedNormalMap&&o.enable(22),E.vertexNormals&&o.enable(23),_.push(o.mask),o.disableAll(),E.fog&&o.enable(0),E.useFog&&o.enable(1),E.flatShading&&o.enable(2),E.logarithmicDepthBuffer&&o.enable(3),E.reversedDepthBuffer&&o.enable(4),E.skinning&&o.enable(5),E.morphTargets&&o.enable(6),E.morphNormals&&o.enable(7),E.morphColors&&o.enable(8),E.premultipliedAlpha&&o.enable(9),E.shadowMapEnabled&&o.enable(10),E.doubleSided&&o.enable(11),E.flipSided&&o.enable(12),E.useDepthPacking&&o.enable(13),E.dithering&&o.enable(14),E.transmission&&o.enable(15),E.sheen&&o.enable(16),E.opaque&&o.enable(17),E.pointsUvs&&o.enable(18),E.decodeVideoTexture&&o.enable(19),E.decodeVideoTextureEmissive&&o.enable(20),E.alphaToCoverage&&o.enable(21),E.numLightProbeGrids>0&&o.enable(22),E.hasPositionAttribute&&o.enable(23),_.push(o.mask)}function R(_){let E=d[_.type],N;if(E){let P=oi[E];N=rd.clone(P.uniforms)}else N=_.uniforms;return N}function M(_,E){let N=u.get(E);return N!==void 0?++N.usedTimes:(N=new Wx(i,E,_,s),l.push(N),u.set(E,N)),N}function A(_){if(--_.usedTimes===0){let E=l.indexOf(_);l[E]=l[l.length-1],l.pop(),u.delete(_.cacheKey),_.destroy()}}function S(_){a.remove(_)}function I(){a.dispose()}return{getParameters:v,getProgramCacheKey:p,getUniforms:R,acquireProgram:M,releaseProgram:A,releaseShaderCache:S,programs:l,dispose:I}}function $x(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,c){i.get(o)[a]=c}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function Zx(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.materialVariant!==t.materialVariant?i.materialVariant-t.materialVariant:i.z!==t.z?i.z-t.z:i.id-t.id}function Td(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Ad(){let i=[],t=0,e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(h){let d=0;return h.isInstancedMesh&&(d+=2),h.isSkinnedMesh&&(d+=1),d}function a(h,d,g,v,p,m){let w=i[t];return w===void 0?(w={id:h.id,object:h,geometry:d,material:g,materialVariant:o(h),groupOrder:v,renderOrder:h.renderOrder,z:p,group:m},i[t]=w):(w.id=h.id,w.object=h,w.geometry=d,w.material=g,w.materialVariant=o(h),w.groupOrder=v,w.renderOrder=h.renderOrder,w.z=p,w.group=m),t++,w}function c(h,d,g,v,p,m,w){w.reversedDepth===!0&&(p=-p);let R=a(h,d,g,v,p,m);g.transmission>0?n.push(R):g.transparent===!0?s.push(R):e.push(R)}function l(h,d,g,v,p,m){let w=a(h,d,g,v,p,m);g.transmission>0?n.unshift(w):g.transparent===!0?s.unshift(w):e.unshift(w)}function u(h,d){e.length>1&&e.sort(h||Zx),n.length>1&&n.sort(d||Td),s.length>1&&s.sort(d||Td)}function f(){for(let h=t,d=i.length;h<d;h++){let g=i[h];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:c,unshift:l,finish:f,sort:u}}function Jx(){let i=new WeakMap;function t(n,s){let r=i.get(n),o;return r===void 0?(o=new Ad,i.set(n,[o])):s>=r.length?(o=new Ad,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function Kx(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new O,color:new re};break;case"SpotLight":e={position:new O,direction:new O,color:new re,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new O,color:new re,distance:0,decay:0};break;case"HemisphereLight":e={direction:new O,skyColor:new re,groundColor:new re};break;case"RectAreaLight":e={color:new re,position:new O,halfWidth:new O,halfHeight:new O};break}return i[t.id]=e,e}}}function jx(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new vt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new vt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new vt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}var Qx=0;function t_(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function e_(i){let t=new Kx,e=jx(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new O);let s=new O,r=new Ce,o=new Ce;function a(l){let u=0,f=0,h=0;for(let k=0;k<9;k++)n.probe[k].set(0,0,0);let d=0,g=0,v=0,p=0,m=0,w=0,R=0,M=0,A=0,S=0,I=0,_=0,E=0,N=0;l.sort(t_);for(let k=0,W=l.length;k<W;k++){let U=l[k],B=U.color,Y=U.intensity,D=U.distance,Q=null;if(U.shadow&&U.shadow.map&&(U.shadow.map.texture.format===ki?Q=U.shadow.map.texture:Q=U.shadow.map.depthTexture||U.shadow.map.texture),U.isAmbientLight)u+=B.r*Y,f+=B.g*Y,h+=B.b*Y;else if(U.isLightProbe){for(let X=0;X<9;X++)n.probe[X].addScaledVector(U.sh.coefficients[X],Y);N++}else if(U.isSunLight){let X=t.get(U);if(X.color.copy(U.color).multiplyScalar(U.intensity),U.castShadow){let q=U.shadow,tt=e.get(U);tt.shadowIntensity=q.intensity,tt.shadowBias=q.bias,tt.shadowNormalBias=q.normalBias,tt.shadowRadius=q.radius,tt.shadowMapSize.copy(q.mapSize).multiply(q.getFrameExtents()),n.sunShadow[g]=tt,n.sunShadowMap[g]=Q;let pt=q.getViewportCount();for(let lt=0;lt<pt;lt++)n.sunShadowMatrix[v+lt]=q.getMatrix(lt),n.sunShadowCascade[v+lt]=q._cascadeData[lt];v+=pt,g++}n.sun[d]=X,d++}else if(U.isDirectionalLight){let X=t.get(U);if(X.color.copy(U.color).multiplyScalar(U.intensity),U.castShadow){let q=U.shadow,tt=e.get(U);tt.shadowIntensity=q.intensity,tt.shadowBias=q.bias,tt.shadowNormalBias=q.normalBias,tt.shadowRadius=q.radius,tt.shadowMapSize=q.mapSize,n.directionalShadow[p]=tt,n.directionalShadowMap[p]=Q,n.directionalShadowMatrix[p]=U.shadow.matrix,A++}n.directional[p]=X,p++}else if(U.isSpotLight){let X=t.get(U);X.position.setFromMatrixPosition(U.matrixWorld),X.color.copy(B).multiplyScalar(Y),X.distance=D,X.coneCos=Math.cos(U.angle),X.penumbraCos=Math.cos(U.angle*(1-U.penumbra)),X.decay=U.decay,n.spot[w]=X;let q=U.shadow;if(U.map&&(n.spotLightMap[_]=U.map,_++,q.updateMatrices(U),U.castShadow&&E++),n.spotLightMatrix[w]=q.matrix,U.castShadow){let tt=e.get(U);tt.shadowIntensity=q.intensity,tt.shadowBias=q.bias,tt.shadowNormalBias=q.normalBias,tt.shadowRadius=q.radius,tt.shadowMapSize=q.mapSize,n.spotShadow[w]=tt,n.spotShadowMap[w]=Q,I++}w++}else if(U.isRectAreaLight){let X=t.get(U);X.color.copy(B).multiplyScalar(Y),X.halfWidth.set(U.width*.5,0,0),X.halfHeight.set(0,U.height*.5,0),n.rectArea[R]=X,R++}else if(U.isPointLight){let X=t.get(U);if(X.color.copy(U.color).multiplyScalar(U.intensity),X.distance=U.distance,X.decay=U.decay,U.castShadow){let q=U.shadow,tt=e.get(U);tt.shadowIntensity=q.intensity,tt.shadowBias=q.bias,tt.shadowNormalBias=q.normalBias,tt.shadowRadius=q.radius,tt.shadowMapSize=q.mapSize,tt.shadowCameraNear=q.camera.near,tt.shadowCameraFar=q.camera.far,n.pointShadow[m]=tt,n.pointShadowMap[m]=Q,n.pointShadowMatrix[m]=U.shadow.matrix,S++}n.point[m]=X,m++}else if(U.isHemisphereLight){let X=t.get(U);X.skyColor.copy(U.color).multiplyScalar(Y),X.groundColor.copy(U.groundColor).multiplyScalar(Y),n.hemi[M]=X,M++}}R>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Ft.LTC_FLOAT_1,n.rectAreaLTC2=Ft.LTC_FLOAT_2):(n.rectAreaLTC1=Ft.LTC_HALF_1,n.rectAreaLTC2=Ft.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=f,n.ambient[2]=h;let P=n.hash;(P.sunLength!==d||P.directionalLength!==p||P.pointLength!==m||P.spotLength!==w||P.rectAreaLength!==R||P.hemiLength!==M||P.numSunShadows!==g||P.numDirectionalShadows!==A||P.numPointShadows!==S||P.numSpotShadows!==I||P.numSpotMaps!==_||P.numLightProbes!==N)&&(n.sun.length=d,n.directional.length=p,n.spot.length=w,n.rectArea.length=R,n.point.length=m,n.hemi.length=M,n.sunShadow.length=g,n.sunShadowMap.length=g,n.sunShadowMatrix.length=v,n.sunShadowCascade.length=v,n.directionalShadow.length=A,n.directionalShadowMap.length=A,n.directionalShadowMatrix.length=A,n.pointShadow.length=S,n.pointShadowMap.length=S,n.pointShadowMatrix.length=S,n.spotShadow.length=I,n.spotShadowMap.length=I,n.spotLightMatrix.length=I+_-E,n.spotLightMap.length=_,n.numSpotLightShadowsWithMaps=E,n.numLightProbes=N,P.sunLength=d,P.directionalLength=p,P.pointLength=m,P.spotLength=w,P.rectAreaLength=R,P.hemiLength=M,P.numSunShadows=g,P.numDirectionalShadows=A,P.numPointShadows=S,P.numSpotShadows=I,P.numSpotMaps=_,P.numLightProbes=N,n.version=Qx++)}function c(l,u){let f=0,h=0,d=0,g=0,v=0,p=0,m=u.matrixWorldInverse;for(let w=0,R=l.length;w<R;w++){let M=l[w];if(M.isSunLight){let A=n.sun[f];A.direction.setFromMatrixPosition(M.matrixWorld),A.direction.transformDirection(m),f++}else if(M.isDirectionalLight){let A=n.directional[h];A.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),A.direction.sub(s),A.direction.transformDirection(m),h++}else if(M.isSpotLight){let A=n.spot[g];A.position.setFromMatrixPosition(M.matrixWorld),A.position.applyMatrix4(m),A.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),A.direction.sub(s),A.direction.transformDirection(m),g++}else if(M.isRectAreaLight){let A=n.rectArea[v];A.position.setFromMatrixPosition(M.matrixWorld),A.position.applyMatrix4(m),o.identity(),r.copy(M.matrixWorld),r.premultiply(m),o.extractRotation(r),A.halfWidth.set(M.width*.5,0,0),A.halfHeight.set(0,M.height*.5,0),A.halfWidth.applyMatrix4(o),A.halfHeight.applyMatrix4(o),v++}else if(M.isPointLight){let A=n.point[d];A.position.setFromMatrixPosition(M.matrixWorld),A.position.applyMatrix4(m),d++}else if(M.isHemisphereLight){let A=n.hemi[p];A.direction.setFromMatrixPosition(M.matrixWorld),A.direction.transformDirection(m),p++}}}return{setup:a,setupView:c,state:n}}function Ed(i){let t=new e_(i),e=[],n=[],s=[];function r(h){f.camera=h,e.length=0,n.length=0,s.length=0}function o(h){e.push(h)}function a(h){n.push(h)}function c(h){s.push(h)}function l(){t.setup(e)}function u(h){t.setupView(e,h)}let f={lightsArray:e,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:f,setupLights:l,setupLightsView:u,pushLight:o,pushShadow:a,pushLightProbeGrid:c}}function n_(i){let t=new WeakMap;function e(s,r=0){let o=t.get(s),a;return o===void 0?(a=new Ed(i),t.set(s,[a])):r>=o.length?(a=new Ed(i),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}var i_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,s_=`uniform sampler2D shadow_pass;
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
}`,r_=[new O(1,0,0),new O(-1,0,0),new O(0,1,0),new O(0,-1,0),new O(0,0,1),new O(0,0,-1)],o_=[new O(0,-1,0),new O(0,-1,0),new O(0,0,1),new O(0,0,-1),new O(0,-1,0),new O(0,-1,0)],Cd=new Ce,Zr=new O,lh=new O;function a_(i,t,e){let n=new Ns,s=new vt,r=new vt,o=new Ue,a=new ua,c=new da,l={},u=e.maxTextureSize,f={[Fi]:Ke,[Ke]:Fi,[ii]:ii},h=new En({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new vt},radius:{value:4}},vertexShader:i_,fragmentShader:s_}),d=h.clone();d.defines.HORIZONTAL_PASS=1;let g=new rn;g.setAttribute("position",new gn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let v=new Ne(g,h),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=is;let m=this.type;this.render=function(S,I,_){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||S.length===0)return;this.type===yu&&(te("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=is);let E=i.getRenderTarget(),N=i.getActiveCubeFace(),P=i.getActiveMipmapLevel(),k=i.state;k.setBlending(si),k.buffers.depth.getReversed()===!0?k.buffers.color.setClear(0,0,0,0):k.buffers.color.setClear(1,1,1,1),k.buffers.depth.setTest(!0),k.setScissorTest(!1);let W=m!==this.type;W&&I.traverse(function(U){U.material&&(Array.isArray(U.material)?U.material.forEach(B=>B.needsUpdate=!0):U.material.needsUpdate=!0)});for(let U=0,B=S.length;U<B;U++){let Y=S[U],D=Y.shadow;if(D===void 0){te("WebGLShadowMap:",Y,"has no shadow.");continue}if(D.autoUpdate===!1&&D.needsUpdate===!1)continue;s.copy(D.mapSize);let Q=D.getFrameExtents();s.multiply(Q),r.copy(D.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/Q.x),s.x=r.x*Q.x,D.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/Q.y),s.y=r.y*Q.y,D.mapSize.y=r.y));let X=i.state.buffers.depth.getReversed();if(D.camera._reversedDepth=X,D.map===null||W===!0){if(D.map!==null&&(D.map.depthTexture!==null&&(D.map.depthTexture.dispose(),D.map.depthTexture=null),D.map.dispose()),this.type===ks){if(Y.isPointLight){te("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}D.map=new _n(s.x,s.y,{format:ki,type:$n,minFilter:Ze,magFilter:Ze,generateMipmaps:!1}),D.map.texture.name=Y.name+".shadowMap",D.map.depthTexture=new Ii(s.x,s.y,Yn),D.map.depthTexture.name=Y.name+".shadowMapDepth",D.map.depthTexture.format=jn,D.map.depthTexture.compareFunction=null,D.map.depthTexture.minFilter=Ye,D.map.depthTexture.magFilter=Ye}else Y.isPointLight?(D.map=new _l(s.x),D.map.depthTexture=new ia(s.x,qn)):(D.map=new _n(s.x,s.y),D.map.depthTexture=new Ii(s.x,s.y,qn)),D.map.depthTexture.name=Y.name+".shadowMap",D.map.depthTexture.format=jn,this.type===is?(D.map.depthTexture.compareFunction=X?pl:fl,D.map.depthTexture.minFilter=Ze,D.map.depthTexture.magFilter=Ze):(D.map.depthTexture.compareFunction=null,D.map.depthTexture.minFilter=Ye,D.map.depthTexture.magFilter=Ye);D.camera.updateProjectionMatrix()}D.map.isWebGLCubeRenderTarget!==!0&&(D.map.width!==s.x||D.map.height!==s.y)&&D.map.setSize(s.x,s.y);let q=D.map.isWebGLCubeRenderTarget?6:D.getViewportCount();Y.isPointLight!==!0&&D.updateMatrices(Y,_);for(let tt=0;tt<q;tt++){let pt=D.getCamera(tt);if(Y.isPointLight){let lt=D.camera,Kt=D.matrix,Ct=Y.distance||lt.far;Ct!==lt.far&&(lt.far=Ct,lt.updateProjectionMatrix()),Zr.setFromMatrixPosition(Y.matrixWorld),lt.position.copy(Zr),lh.copy(lt.position),lh.add(r_[tt]),lt.up.copy(o_[tt]),lt.lookAt(lh),lt.updateMatrixWorld(),Kt.makeTranslation(-Zr.x,-Zr.y,-Zr.z),Cd.multiplyMatrices(lt.projectionMatrix,lt.matrixWorldInverse),D._frustum.setFromProjectionMatrix(Cd,lt.coordinateSystem,lt.reversedDepth)}if(D.map.isWebGLCubeRenderTarget)i.setRenderTarget(D.map,tt),i.clear();else{tt===0&&(i.setRenderTarget(D.map),i.clear());let lt=D.getViewport(tt);o.set(r.x*lt.x,r.y*lt.y,r.x*lt.z,r.y*lt.w),k.viewport(o)}n=D.getFrustum(tt),M(I,_,pt,Y,this.type)}D.isPointLightShadow!==!0&&this.type===ks&&w(D,_),D.needsUpdate=!1}m=this.type,p.needsUpdate=!1,i.setRenderTarget(E,N,P)};function w(S,I){let _=t.update(v);h.defines.VSM_SAMPLES!==S.blurSamples&&(h.defines.VSM_SAMPLES=S.blurSamples,d.defines.VSM_SAMPLES=S.blurSamples,h.needsUpdate=!0,d.needsUpdate=!0),S.mapPass===null?S.mapPass=new _n(s.x,s.y,{format:ki,type:$n}):(S.mapPass.width!==S.map.width||S.mapPass.height!==S.map.height)&&S.mapPass.setSize(S.map.width,S.map.height),h.uniforms.shadow_pass.value=S.map.depthTexture,h.uniforms.resolution.value.set(S.map.width,S.map.height),h.uniforms.radius.value=S.radius,i.setRenderTarget(S.mapPass),i.clear(),i.renderBufferDirect(I,null,_,h,v,null),d.uniforms.shadow_pass.value=S.mapPass.texture,d.uniforms.resolution.value.set(S.map.width,S.map.height),d.uniforms.radius.value=S.radius,i.setRenderTarget(S.map),i.clear(),i.renderBufferDirect(I,null,_,d,v,null)}function R(S,I,_,E){let N=null,P=_.isPointLight===!0?S.customDistanceMaterial:S.customDepthMaterial;if(P!==void 0)N=P;else if(N=_.isPointLight===!0?c:a,i.localClippingEnabled&&I.clipShadows===!0&&Array.isArray(I.clippingPlanes)&&I.clippingPlanes.length!==0||I.displacementMap&&I.displacementScale!==0||I.alphaMap&&I.alphaTest>0||I.map&&I.alphaTest>0||I.alphaToCoverage===!0){let k=N.uuid,W=I.uuid,U=l[k];U===void 0&&(U={},l[k]=U);let B=U[W];B===void 0&&(B=N.clone(),U[W]=B,I.addEventListener("dispose",A)),N=B}if(N.visible=I.visible,N.wireframe=I.wireframe,E===ks?N.side=I.shadowSide!==null?I.shadowSide:I.side:N.side=I.shadowSide!==null?I.shadowSide:f[I.side],N.alphaMap=I.alphaMap,N.alphaTest=I.alphaToCoverage===!0?.5:I.alphaTest,N.map=I.map,N.clipShadows=I.clipShadows,N.clippingPlanes=I.clippingPlanes,N.clipIntersection=I.clipIntersection,N.displacementMap=I.displacementMap,N.displacementScale=I.displacementScale,N.displacementBias=I.displacementBias,N.wireframeLinewidth=I.wireframeLinewidth,N.linewidth=I.linewidth,_.isPointLight===!0&&N.isMeshDistanceMaterial===!0){let k=i.properties.get(N);k.light=_}return N}function M(S,I,_,E,N){if(S.visible===!1)return;if(S.layers.test(I.layers)&&(S.isMesh||S.isLine||S.isPoints)&&(S.castShadow||S.receiveShadow&&N===ks)&&(!S.frustumCulled||S.intersectsFrustum(n))){S.modelViewMatrix.multiplyMatrices(_.matrixWorldInverse,S.matrixWorld);let W=t.update(S),U=S.material;if(Array.isArray(U)){let B=W.groups;for(let Y=0,D=B.length;Y<D;Y++){let Q=B[Y],X=U[Q.materialIndex];if(X&&X.visible){let q=R(S,X,E,N);S.onBeforeShadow(i,S,I,_,W,q,Q),i.renderBufferDirect(_,null,W,q,S,Q),S.onAfterShadow(i,S,I,_,W,q,Q)}}}else if(U.visible){let B=R(S,U,E,N);S.onBeforeShadow(i,S,I,_,W,B,null),i.renderBufferDirect(_,null,W,B,S,null),S.onAfterShadow(i,S,I,_,W,B,null)}}let k=S.children;for(let W=0,U=k.length;W<U;W++)M(k[W],I,_,E,N)}function A(S){S.target.removeEventListener("dispose",A);for(let _ in l){let E=l[_],N=S.target.uuid;N in E&&(E[N].dispose(),delete E[N])}}}function l_(i,t){function e(){let F=!1,Et=new Ue,ct=null,Rt=new Ue(0,0,0,0);return{setMask:function(Ut){ct!==Ut&&!F&&(i.colorMask(Ut,Ut,Ut,Ut),ct=Ut)},setLocked:function(Ut){F=Ut},setClear:function(Ut,ft,qt,Gt,we){we===!0&&(Ut*=Gt,ft*=Gt,qt*=Gt),Et.set(Ut,ft,qt,Gt),Rt.equals(Et)===!1&&(i.clearColor(Ut,ft,qt,Gt),Rt.copy(Et))},reset:function(){F=!1,ct=null,Rt.set(-1,0,0,0)}}}function n(){let F=!1,Et=!1,ct=null,Rt=null,Ut=null;return{setReversed:function(ft){if(Et!==ft){let qt=t.get("EXT_clip_control");ft?qt.clipControlEXT(qt.LOWER_LEFT_EXT,qt.ZERO_TO_ONE_EXT):qt.clipControlEXT(qt.LOWER_LEFT_EXT,qt.NEGATIVE_ONE_TO_ONE_EXT),Et=ft;let Gt=Ut;Ut=null,this.setClear(Gt)}},getReversed:function(){return Et},setTest:function(ft){ft?at(i.DEPTH_TEST):bt(i.DEPTH_TEST)},setMask:function(ft){ct!==ft&&!F&&(i.depthMask(ft),ct=ft)},setFunc:function(ft){if(Et&&(ft=Qu[ft]),Rt!==ft){switch(ft){case zo:i.depthFunc(i.NEVER);break;case ko:i.depthFunc(i.ALWAYS);break;case Vo:i.depthFunc(i.LESS);break;case As:i.depthFunc(i.LEQUAL);break;case Go:i.depthFunc(i.EQUAL);break;case Ho:i.depthFunc(i.GEQUAL);break;case Wo:i.depthFunc(i.GREATER);break;case Xo:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Rt=ft}},setLocked:function(ft){F=ft},setClear:function(ft){Ut!==ft&&(Ut=ft,Et&&(ft=1-ft),i.clearDepth(ft))},reset:function(){F=!1,ct=null,Rt=null,Ut=null,Et=!1}}}function s(){let F=!1,Et=null,ct=null,Rt=null,Ut=null,ft=null,qt=null,Gt=null,we=null;return{setTest:function(ve){F||(ve?at(i.STENCIL_TEST):bt(i.STENCIL_TEST))},setMask:function(ve){Et!==ve&&!F&&(i.stencilMask(ve),Et=ve)},setFunc:function(ve,dn,Rn){(ct!==ve||Rt!==dn||Ut!==Rn)&&(i.stencilFunc(ve,dn,Rn),ct=ve,Rt=dn,Ut=Rn)},setOp:function(ve,dn,Rn){(ft!==ve||qt!==dn||Gt!==Rn)&&(i.stencilOp(ve,dn,Rn),ft=ve,qt=dn,Gt=Rn)},setLocked:function(ve){F=ve},setClear:function(ve){we!==ve&&(i.clearStencil(ve),we=ve)},reset:function(){F=!1,Et=null,ct=null,Rt=null,Ut=null,ft=null,qt=null,Gt=null,we=null}}}let r=new e,o=new n,a=new s,c=new WeakMap,l=new WeakMap,u={},f={},h={},d=new WeakMap,g=[],v=null,p=!1,m=null,w=null,R=null,M=null,A=null,S=null,I=null,_=new re(0,0,0),E=0,N=!1,P=null,k=null,W=null,U=null,B=null,Y=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),D=!1,Q=0,X=i.getParameter(i.VERSION);X.indexOf("WebGL")!==-1?(Q=parseFloat(/^WebGL (\d)/.exec(X)[1]),D=Q>=1):X.indexOf("OpenGL ES")!==-1&&(Q=parseFloat(/^OpenGL ES (\d)/.exec(X)[1]),D=Q>=2);let q=null,tt={},pt=i.getParameter(i.SCISSOR_BOX),lt=i.getParameter(i.VIEWPORT),Kt=new Ue().fromArray(pt),Ct=new Ue().fromArray(lt);function Jt(F,Et,ct,Rt){let Ut=new Uint8Array(4),ft=i.createTexture();i.bindTexture(F,ft),i.texParameteri(F,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(F,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let qt=0;qt<ct;qt++)F===i.TEXTURE_3D||F===i.TEXTURE_2D_ARRAY?i.texImage3D(Et,0,i.RGBA,1,1,Rt,0,i.RGBA,i.UNSIGNED_BYTE,Ut):i.texImage2D(Et+qt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Ut);return ft}let nt={};nt[i.TEXTURE_2D]=Jt(i.TEXTURE_2D,i.TEXTURE_2D,1),nt[i.TEXTURE_CUBE_MAP]=Jt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),nt[i.TEXTURE_2D_ARRAY]=Jt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),nt[i.TEXTURE_3D]=Jt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),at(i.DEPTH_TEST),o.setFunc(As),gt(!1),Tt(Ec),at(i.CULL_FACE),mt(si);function at(F){u[F]!==!0&&(i.enable(F),u[F]=!0)}function bt(F){u[F]!==!1&&(i.disable(F),u[F]=!1)}function Vt(F,Et){return h[F]!==Et?(i.bindFramebuffer(F,Et),h[F]=Et,F===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=Et),F===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=Et),!0):!1}function dt(F,Et){let ct=g,Rt=!1;if(F){ct=d.get(Et),ct===void 0&&(ct=[],d.set(Et,ct));let Ut=F.textures;if(ct.length!==Ut.length||ct[0]!==i.COLOR_ATTACHMENT0){for(let ft=0,qt=Ut.length;ft<qt;ft++)ct[ft]=i.COLOR_ATTACHMENT0+ft;ct.length=Ut.length,Rt=!0}}else ct[0]!==i.BACK&&(ct[0]=i.BACK,Rt=!0);Rt&&i.drawBuffers(ct)}function Bt(F){return v!==F?(i.useProgram(F),v=F,!0):!1}let ye={[ss]:i.FUNC_ADD,[bu]:i.FUNC_SUBTRACT,[Mu]:i.FUNC_REVERSE_SUBTRACT};ye[Su]=i.MIN,ye[wu]=i.MAX;let ht={[Tu]:i.ZERO,[Au]:i.ONE,[Eu]:i.SRC_COLOR,[Pc]:i.SRC_ALPHA,[Du]:i.SRC_ALPHA_SATURATE,[Pu]:i.DST_COLOR,[Ru]:i.DST_ALPHA,[Cu]:i.ONE_MINUS_SRC_COLOR,[Lc]:i.ONE_MINUS_SRC_ALPHA,[Lu]:i.ONE_MINUS_DST_COLOR,[Iu]:i.ONE_MINUS_DST_ALPHA,[Nu]:i.CONSTANT_COLOR,[Uu]:i.ONE_MINUS_CONSTANT_COLOR,[Fu]:i.CONSTANT_ALPHA,[Ou]:i.ONE_MINUS_CONSTANT_ALPHA};function mt(F,Et,ct,Rt,Ut,ft,qt,Gt,we,ve){if(F===si){p===!0&&(bt(i.BLEND),p=!1);return}if(p===!1&&(at(i.BLEND),p=!0),F!==vu){if(F!==m||ve!==N){if((w!==ss||A!==ss)&&(i.blendEquation(i.FUNC_ADD),w=ss,A=ss),ve)switch(F){case Vs:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Cc:i.blendFunc(i.ONE,i.ONE);break;case Rc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Ic:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:ne("WebGLState: Invalid blending: ",F);break}else switch(F){case Vs:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Cc:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Rc:ne("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Ic:ne("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:ne("WebGLState: Invalid blending: ",F);break}R=null,M=null,S=null,I=null,_.set(0,0,0),E=0,m=F,N=ve}return}Ut=Ut||Et,ft=ft||ct,qt=qt||Rt,(Et!==w||Ut!==A)&&(i.blendEquationSeparate(ye[Et],ye[Ut]),w=Et,A=Ut),(ct!==R||Rt!==M||ft!==S||qt!==I)&&(i.blendFuncSeparate(ht[ct],ht[Rt],ht[ft],ht[qt]),R=ct,M=Rt,S=ft,I=qt),(Gt.equals(_)===!1||we!==E)&&(i.blendColor(Gt.r,Gt.g,Gt.b,we),_.copy(Gt),E=we),m=F,N=!1}function _t(F,Et){F.side===ii?bt(i.CULL_FACE):at(i.CULL_FACE);let ct=F.side===Ke;Et&&(ct=!ct),gt(ct),F.blending===Vs&&F.transparent===!1?mt(si):mt(F.blending,F.blendEquation,F.blendSrc,F.blendDst,F.blendEquationAlpha,F.blendSrcAlpha,F.blendDstAlpha,F.blendColor,F.blendAlpha,F.premultipliedAlpha),o.setFunc(F.depthFunc),o.setTest(F.depthTest),o.setMask(F.depthWrite),r.setMask(F.colorWrite);let Rt=F.stencilWrite;a.setTest(Rt),Rt&&(a.setMask(F.stencilWriteMask),a.setFunc(F.stencilFunc,F.stencilRef,F.stencilFuncMask),a.setOp(F.stencilFail,F.stencilZFail,F.stencilZPass)),$t(F.polygonOffset,F.polygonOffsetFactor,F.polygonOffsetUnits),F.alphaToCoverage===!0?at(i.SAMPLE_ALPHA_TO_COVERAGE):bt(i.SAMPLE_ALPHA_TO_COVERAGE)}function gt(F){P!==F&&(F?i.frontFace(i.CW):i.frontFace(i.CCW),P=F)}function Tt(F){F!==xu?(at(i.CULL_FACE),F!==k&&(F===Ec?i.cullFace(i.BACK):F===_u?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):bt(i.CULL_FACE),k=F}function jt(F){F!==W&&(D&&i.lineWidth(F),W=F)}function $t(F,Et,ct){F?(at(i.POLYGON_OFFSET_FILL),(U!==Et||B!==ct)&&(U=Et,B=ct,o.getReversed()&&(Et=-Et),i.polygonOffset(Et,ct))):bt(i.POLYGON_OFFSET_FILL)}function Qt(F){F?at(i.SCISSOR_TEST):bt(i.SCISSOR_TEST)}function ie(F){F===void 0&&(F=i.TEXTURE0+Y-1),q!==F&&(i.activeTexture(F),q=F)}function L(F,Et,ct){ct===void 0&&(q===null?ct=i.TEXTURE0+Y-1:ct=q);let Rt=tt[ct];Rt===void 0&&(Rt={type:void 0,texture:void 0},tt[ct]=Rt),(Rt.type!==F||Rt.texture!==Et)&&(q!==ct&&(i.activeTexture(ct),q=ct),i.bindTexture(F,Et||nt[F]),Rt.type=F,Rt.texture=Et)}function fe(){let F=tt[q];F!==void 0&&F.type!==void 0&&(i.bindTexture(F.type,null),F.type=void 0,F.texture=void 0)}function ae(){try{i.compressedTexImage2D(...arguments)}catch(F){ne("WebGLState:",F)}}function C(){try{i.compressedTexImage3D(...arguments)}catch(F){ne("WebGLState:",F)}}function x(){try{i.texSubImage2D(...arguments)}catch(F){ne("WebGLState:",F)}}function z(){try{i.texSubImage3D(...arguments)}catch(F){ne("WebGLState:",F)}}function Z(){try{i.compressedTexSubImage2D(...arguments)}catch(F){ne("WebGLState:",F)}}function et(){try{i.compressedTexSubImage3D(...arguments)}catch(F){ne("WebGLState:",F)}}function yt(){try{i.texStorage2D(...arguments)}catch(F){ne("WebGLState:",F)}}function St(){try{i.texStorage3D(...arguments)}catch(F){ne("WebGLState:",F)}}function ot(){try{i.texImage2D(...arguments)}catch(F){ne("WebGLState:",F)}}function ut(){try{i.texImage3D(...arguments)}catch(F){ne("WebGLState:",F)}}function At(F){return f[F]!==void 0?f[F]:i.getParameter(F)}function Xt(F,Et){f[F]!==Et&&(i.pixelStorei(F,Et),f[F]=Et)}function Lt(F){Kt.equals(F)===!1&&(i.scissor(F.x,F.y,F.z,F.w),Kt.copy(F))}function Pt(F){Ct.equals(F)===!1&&(i.viewport(F.x,F.y,F.z,F.w),Ct.copy(F))}function Nt(F,Et){let ct=l.get(Et);ct===void 0&&(ct=new WeakMap,l.set(Et,ct));let Rt=ct.get(F);Rt===void 0&&(Rt=i.getUniformBlockIndex(Et,F.name),ct.set(F,Rt))}function Wt(F,Et){let Rt=l.get(Et).get(F);c.get(Et)!==Rt&&(i.uniformBlockBinding(Et,Rt,F.__bindingPointIndex),c.set(Et,Rt))}function se(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),u={},f={},q=null,tt={},h={},d=new WeakMap,g=[],v=null,p=!1,m=null,w=null,R=null,M=null,A=null,S=null,I=null,_=new re(0,0,0),E=0,N=!1,P=null,k=null,W=null,U=null,B=null,Kt.set(0,0,i.canvas.width,i.canvas.height),Ct.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:at,disable:bt,bindFramebuffer:Vt,drawBuffers:dt,useProgram:Bt,setBlending:mt,setMaterial:_t,setFlipSided:gt,setCullFace:Tt,setLineWidth:jt,setPolygonOffset:$t,setScissorTest:Qt,activeTexture:ie,bindTexture:L,unbindTexture:fe,compressedTexImage2D:ae,compressedTexImage3D:C,texImage2D:ot,texImage3D:ut,pixelStorei:Xt,getParameter:At,updateUBOMapping:Nt,uniformBlockBinding:Wt,texStorage2D:yt,texStorage3D:St,texSubImage2D:x,texSubImage3D:z,compressedTexSubImage2D:Z,compressedTexSubImage3D:et,scissor:Lt,viewport:Pt,reset:se}}function c_(i,t,e,n,s,r,o){let a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new vt,u=new WeakMap,f=new Set,h,d=new WeakMap,g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(C,x){return g?new OffscreenCanvas(C,x):_r("canvas")}function p(C,x,z){let Z=1,et=ae(C);if((et.width>z||et.height>z)&&(Z=z/Math.max(et.width,et.height)),Z<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){let yt=Math.floor(Z*et.width),St=Math.floor(Z*et.height);h===void 0&&(h=v(yt,St));let ot=x?v(yt,St):h;return ot.width=yt,ot.height=St,ot.getContext("2d").drawImage(C,0,0,yt,St),te("WebGLRenderer: Texture has been resized from ("+et.width+"x"+et.height+") to ("+yt+"x"+St+")."),ot}else return"data"in C&&te("WebGLRenderer: Image in DataTexture is too big ("+et.width+"x"+et.height+")."),C;return C}function m(C){return C.generateMipmaps}function w(C){i.generateMipmap(C)}function R(C){return C.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?i.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function M(C,x,z,Z,et,yt=!1){if(C!==null){if(i[C]!==void 0)return i[C];te("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let St;Z&&(St=t.get("EXT_texture_norm16"),St||te("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let ot=x;if(x===i.RED&&(z===i.FLOAT&&(ot=i.R32F),z===i.HALF_FLOAT&&(ot=i.R16F),z===i.UNSIGNED_BYTE&&(ot=i.R8),z===i.UNSIGNED_SHORT&&St&&(ot=St.R16_EXT),z===i.SHORT&&St&&(ot=St.R16_SNORM_EXT)),x===i.RED_INTEGER&&(z===i.UNSIGNED_BYTE&&(ot=i.R8UI),z===i.UNSIGNED_SHORT&&(ot=i.R16UI),z===i.UNSIGNED_INT&&(ot=i.R32UI),z===i.BYTE&&(ot=i.R8I),z===i.SHORT&&(ot=i.R16I),z===i.INT&&(ot=i.R32I)),x===i.RG&&(z===i.FLOAT&&(ot=i.RG32F),z===i.HALF_FLOAT&&(ot=i.RG16F),z===i.UNSIGNED_BYTE&&(ot=i.RG8),z===i.UNSIGNED_SHORT&&St&&(ot=St.RG16_EXT),z===i.SHORT&&St&&(ot=St.RG16_SNORM_EXT)),x===i.RG_INTEGER&&(z===i.UNSIGNED_BYTE&&(ot=i.RG8UI),z===i.UNSIGNED_SHORT&&(ot=i.RG16UI),z===i.UNSIGNED_INT&&(ot=i.RG32UI),z===i.BYTE&&(ot=i.RG8I),z===i.SHORT&&(ot=i.RG16I),z===i.INT&&(ot=i.RG32I)),x===i.RGB_INTEGER&&(z===i.UNSIGNED_BYTE&&(ot=i.RGB8UI),z===i.UNSIGNED_SHORT&&(ot=i.RGB16UI),z===i.UNSIGNED_INT&&(ot=i.RGB32UI),z===i.BYTE&&(ot=i.RGB8I),z===i.SHORT&&(ot=i.RGB16I),z===i.INT&&(ot=i.RGB32I)),x===i.RGBA_INTEGER&&(z===i.UNSIGNED_BYTE&&(ot=i.RGBA8UI),z===i.UNSIGNED_SHORT&&(ot=i.RGBA16UI),z===i.UNSIGNED_INT&&(ot=i.RGBA32UI),z===i.BYTE&&(ot=i.RGBA8I),z===i.SHORT&&(ot=i.RGBA16I),z===i.INT&&(ot=i.RGBA32I)),x===i.RGB&&(z===i.UNSIGNED_SHORT&&St&&(ot=St.RGB16_EXT),z===i.SHORT&&St&&(ot=St.RGB16_SNORM_EXT),z===i.UNSIGNED_INT_5_9_9_9_REV&&(ot=i.RGB9_E5),z===i.UNSIGNED_INT_10F_11F_11F_REV&&(ot=i.R11F_G11F_B10F)),x===i.RGBA){let ut=yt?xr:pe.getTransfer(et);z===i.FLOAT&&(ot=i.RGBA32F),z===i.HALF_FLOAT&&(ot=i.RGBA16F),z===i.UNSIGNED_BYTE&&(ot=ut===Te?i.SRGB8_ALPHA8:i.RGBA8),z===i.UNSIGNED_SHORT&&St&&(ot=St.RGBA16_EXT),z===i.SHORT&&St&&(ot=St.RGBA16_SNORM_EXT),z===i.UNSIGNED_SHORT_4_4_4_4&&(ot=i.RGBA4),z===i.UNSIGNED_SHORT_5_5_5_1&&(ot=i.RGB5_A1)}return(ot===i.R16F||ot===i.R32F||ot===i.RG16F||ot===i.RG32F||ot===i.RGBA16F||ot===i.RGBA32F)&&t.get("EXT_color_buffer_float"),ot}function A(C,x){let z;return C?x===null||x===qn||x===Hs?z=i.DEPTH24_STENCIL8:x===Yn?z=i.DEPTH32F_STENCIL8:x===Gs&&(z=i.DEPTH24_STENCIL8,te("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===qn||x===Hs?z=i.DEPTH_COMPONENT24:x===Yn?z=i.DEPTH_COMPONENT32F:x===Gs&&(z=i.DEPTH_COMPONENT16),z}function S(C,x){return m(C)===!0||C.isFramebufferTexture&&C.minFilter!==Ye&&C.minFilter!==Ze?Math.log2(Math.max(x.width,x.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?x.mipmaps.length:1}function I(C){let x=C.target;x.removeEventListener("dispose",I),E(x),x.isVideoTexture&&u.delete(x),x.isHTMLTexture&&f.delete(x)}function _(C){let x=C.target;x.removeEventListener("dispose",_),P(x)}function E(C){let x=n.get(C);if(x.__webglInit===void 0)return;let z=C.source,Z=d.get(z);if(Z){let et=Z[x.__cacheKey];et.usedTimes--,et.usedTimes===0&&N(C),Object.keys(Z).length===0&&d.delete(z)}n.remove(C)}function N(C){let x=n.get(C);i.deleteTexture(x.__webglTexture);let z=C.source,Z=d.get(z);delete Z[x.__cacheKey],o.memory.textures--}function P(C){let x=n.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),n.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let Z=0;Z<6;Z++){if(Array.isArray(x.__webglFramebuffer[Z]))for(let et=0;et<x.__webglFramebuffer[Z].length;et++)i.deleteFramebuffer(x.__webglFramebuffer[Z][et]);else i.deleteFramebuffer(x.__webglFramebuffer[Z]);x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer[Z])}else{if(Array.isArray(x.__webglFramebuffer))for(let Z=0;Z<x.__webglFramebuffer.length;Z++)i.deleteFramebuffer(x.__webglFramebuffer[Z]);else i.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&i.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let Z=0;Z<x.__webglColorRenderbuffer.length;Z++)x.__webglColorRenderbuffer[Z]&&i.deleteRenderbuffer(x.__webglColorRenderbuffer[Z]);x.__webglDepthRenderbuffer&&i.deleteRenderbuffer(x.__webglDepthRenderbuffer)}let z=C.textures;for(let Z=0,et=z.length;Z<et;Z++){let yt=n.get(z[Z]);yt.__webglTexture&&(i.deleteTexture(yt.__webglTexture),o.memory.textures--),n.remove(z[Z])}n.remove(C)}let k=0;function W(){k=0}function U(){return k}function B(C){k=C}function Y(){let C=k;return C>=s.maxTextures&&te("WebGLTextures: Trying to use "+(C+1)+" texture units while this GPU supports only "+s.maxTextures),k+=1,C}function D(C){let x=[];return x.push(C.wrapS),x.push(C.wrapT),x.push(C.wrapR||0),x.push(C.magFilter),x.push(C.minFilter),x.push(C.anisotropy),x.push(C.internalFormat),x.push(C.format),x.push(C.type),x.push(C.generateMipmaps),x.push(C.premultiplyAlpha),x.push(C.flipY),x.push(C.unpackAlignment),x.push(C.colorSpace),x.join()}function Q(C,x){let z=n.get(C);if(C.isVideoTexture&&L(C),C.isRenderTargetTexture===!1&&C.isExternalTexture!==!0&&C.version>0&&z.__version!==C.version){let Z=C.image;if(Z===null)te("WebGLRenderer: Texture marked for update but no image data found.");else if(Z.complete===!1)te("WebGLRenderer: Texture marked for update but image is incomplete");else{bt(z,C,x);return}}else C.isExternalTexture&&(z.__webglTexture=C.sourceTexture?C.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,z.__webglTexture,i.TEXTURE0+x)}function X(C,x){let z=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&z.__version!==C.version){bt(z,C,x);return}else C.isExternalTexture&&(z.__webglTexture=C.sourceTexture?C.sourceTexture:null);e.bindTexture(i.TEXTURE_2D_ARRAY,z.__webglTexture,i.TEXTURE0+x)}function q(C,x){let z=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&z.__version!==C.version){bt(z,C,x);return}e.bindTexture(i.TEXTURE_3D,z.__webglTexture,i.TEXTURE0+x)}function tt(C,x){let z=n.get(C);if(C.isCubeDepthTexture!==!0&&C.version>0&&z.__version!==C.version){Vt(z,C,x);return}e.bindTexture(i.TEXTURE_CUBE_MAP,z.__webglTexture,i.TEXTURE0+x)}let pt={[qo]:i.REPEAT,[Kn]:i.CLAMP_TO_EDGE,[Yo]:i.MIRRORED_REPEAT},lt={[Ye]:i.NEAREST,[ku]:i.NEAREST_MIPMAP_NEAREST,[Vr]:i.NEAREST_MIPMAP_LINEAR,[Ze]:i.LINEAR,[Ca]:i.LINEAR_MIPMAP_NEAREST,[Bi]:i.LINEAR_MIPMAP_LINEAR},Kt={[Hu]:i.NEVER,[$u]:i.ALWAYS,[Wu]:i.LESS,[fl]:i.LEQUAL,[Xu]:i.EQUAL,[pl]:i.GEQUAL,[qu]:i.GREATER,[Yu]:i.NOTEQUAL};function Ct(C,x){if(x.type===Yn&&t.has("OES_texture_float_linear")===!1&&(x.magFilter===Ze||x.magFilter===Ca||x.magFilter===Vr||x.magFilter===Bi||x.minFilter===Ze||x.minFilter===Ca||x.minFilter===Vr||x.minFilter===Bi)&&te("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(C,i.TEXTURE_WRAP_S,pt[x.wrapS]),i.texParameteri(C,i.TEXTURE_WRAP_T,pt[x.wrapT]),(C===i.TEXTURE_3D||C===i.TEXTURE_2D_ARRAY)&&i.texParameteri(C,i.TEXTURE_WRAP_R,pt[x.wrapR]),i.texParameteri(C,i.TEXTURE_MAG_FILTER,lt[x.magFilter]),i.texParameteri(C,i.TEXTURE_MIN_FILTER,lt[x.minFilter]),x.compareFunction&&(i.texParameteri(C,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(C,i.TEXTURE_COMPARE_FUNC,Kt[x.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===Ye||x.minFilter!==Vr&&x.minFilter!==Bi||x.type===Yn&&t.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||n.get(x).__currentAnisotropy){let z=t.get("EXT_texture_filter_anisotropic");i.texParameterf(C,z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,s.getMaxAnisotropy())),n.get(x).__currentAnisotropy=x.anisotropy}}}function Jt(C,x){let z=!1;C.__webglInit===void 0&&(C.__webglInit=!0,x.addEventListener("dispose",I));let Z=x.source,et=d.get(Z);et===void 0&&(et={},d.set(Z,et));let yt=D(x);if(yt!==C.__cacheKey){et[yt]===void 0&&(et[yt]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,z=!0),et[yt].usedTimes++;let St=et[C.__cacheKey];St!==void 0&&(et[C.__cacheKey].usedTimes--,St.usedTimes===0&&N(x)),C.__cacheKey=yt,C.__webglTexture=et[yt].texture}return z}function nt(C,x,z){return Math.floor(Math.floor(C/z)/x)}function at(C,x,z,Z){let yt=C.updateRanges;if(yt.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,x.width,x.height,z,Z,x.data);else{yt.sort((Xt,Lt)=>Xt.start-Lt.start);let St=0;for(let Xt=1;Xt<yt.length;Xt++){let Lt=yt[St],Pt=yt[Xt],Nt=Lt.start+Lt.count,Wt=nt(Pt.start,x.width,4),se=nt(Lt.start,x.width,4);Pt.start<=Nt+1&&Wt===se&&nt(Pt.start+Pt.count-1,x.width,4)===Wt?Lt.count=Math.max(Lt.count,Pt.start+Pt.count-Lt.start):(++St,yt[St]=Pt)}yt.length=St+1;let ot=e.getParameter(i.UNPACK_ROW_LENGTH),ut=e.getParameter(i.UNPACK_SKIP_PIXELS),At=e.getParameter(i.UNPACK_SKIP_ROWS);e.pixelStorei(i.UNPACK_ROW_LENGTH,x.width);for(let Xt=0,Lt=yt.length;Xt<Lt;Xt++){let Pt=yt[Xt],Nt=Math.floor(Pt.start/4),Wt=Math.ceil(Pt.count/4),se=Nt%x.width,F=Math.floor(Nt/x.width),Et=Wt,ct=1;e.pixelStorei(i.UNPACK_SKIP_PIXELS,se),e.pixelStorei(i.UNPACK_SKIP_ROWS,F),e.texSubImage2D(i.TEXTURE_2D,0,se,F,Et,ct,z,Z,x.data)}C.clearUpdateRanges(),e.pixelStorei(i.UNPACK_ROW_LENGTH,ot),e.pixelStorei(i.UNPACK_SKIP_PIXELS,ut),e.pixelStorei(i.UNPACK_SKIP_ROWS,At)}}function bt(C,x,z){let Z=i.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(Z=i.TEXTURE_2D_ARRAY),x.isData3DTexture&&(Z=i.TEXTURE_3D);let et=Jt(C,x),yt=x.source;e.bindTexture(Z,C.__webglTexture,i.TEXTURE0+z);let St=n.get(yt);if(yt.version!==St.__version||et===!0){if(e.activeTexture(i.TEXTURE0+z),(typeof ImageBitmap<"u"&&x.image instanceof ImageBitmap)===!1){let ct=pe.getPrimaries(pe.workingColorSpace),Rt=x.colorSpace===yi?null:pe.getPrimaries(x.colorSpace),Ut=x.colorSpace===yi||ct===Rt?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ut)}e.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment);let ut=p(x.image,!1,s.maxTextureSize);ut=fe(x,ut);let At=r.convert(x.format,x.colorSpace),Xt=r.convert(x.type),Lt=M(x.internalFormat,At,Xt,x.normalized,x.colorSpace,x.isVideoTexture);Ct(Z,x);let Pt,Nt=x.mipmaps,Wt=x.isVideoTexture!==!0,se=St.__version===void 0||et===!0,F=yt.dataReady,Et=S(x,ut);if(x.isDepthTexture)Lt=A(x.format===zi,x.type),se&&(Wt?e.texStorage2D(i.TEXTURE_2D,1,Lt,ut.width,ut.height):e.texImage2D(i.TEXTURE_2D,0,Lt,ut.width,ut.height,0,At,Xt,null));else if(x.isDataTexture)if(Nt.length>0){Wt&&se&&e.texStorage2D(i.TEXTURE_2D,Et,Lt,Nt[0].width,Nt[0].height);for(let ct=0,Rt=Nt.length;ct<Rt;ct++)Pt=Nt[ct],Wt?F&&e.texSubImage2D(i.TEXTURE_2D,ct,0,0,Pt.width,Pt.height,At,Xt,Pt.data):e.texImage2D(i.TEXTURE_2D,ct,Lt,Pt.width,Pt.height,0,At,Xt,Pt.data);x.generateMipmaps=!1}else Wt?(se&&e.texStorage2D(i.TEXTURE_2D,Et,Lt,ut.width,ut.height),F&&at(x,ut,At,Xt)):e.texImage2D(i.TEXTURE_2D,0,Lt,ut.width,ut.height,0,At,Xt,ut.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){Wt&&se&&e.texStorage3D(i.TEXTURE_2D_ARRAY,Et,Lt,Nt[0].width,Nt[0].height,ut.depth);for(let ct=0,Rt=Nt.length;ct<Rt;ct++)if(Pt=Nt[ct],x.format!==Un)if(At!==null)if(Wt){if(F)if(x.layerUpdates.size>0){let Ut=nh(Pt.width,Pt.height,x.format,x.type);for(let ft of x.layerUpdates){let qt=Pt.data.subarray(ft*Ut/Pt.data.BYTES_PER_ELEMENT,(ft+1)*Ut/Pt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ct,0,0,ft,Pt.width,Pt.height,1,At,qt)}}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ct,0,0,0,Pt.width,Pt.height,ut.depth,At,Pt.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ct,Lt,Pt.width,Pt.height,ut.depth,0,Pt.data,0,0);else te("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Wt?F&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,ct,0,0,0,Pt.width,Pt.height,ut.depth,At,Xt,Pt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,ct,Lt,Pt.width,Pt.height,ut.depth,0,At,Xt,Pt.data);x.layerUpdates.size>0&&x.clearLayerUpdates()}else{Wt&&se&&e.texStorage2D(i.TEXTURE_2D,Et,Lt,Nt[0].width,Nt[0].height);for(let ct=0,Rt=Nt.length;ct<Rt;ct++)Pt=Nt[ct],x.format!==Un?At!==null?Wt?F&&e.compressedTexSubImage2D(i.TEXTURE_2D,ct,0,0,Pt.width,Pt.height,At,Pt.data):e.compressedTexImage2D(i.TEXTURE_2D,ct,Lt,Pt.width,Pt.height,0,Pt.data):te("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Wt?F&&e.texSubImage2D(i.TEXTURE_2D,ct,0,0,Pt.width,Pt.height,At,Xt,Pt.data):e.texImage2D(i.TEXTURE_2D,ct,Lt,Pt.width,Pt.height,0,At,Xt,Pt.data)}else if(x.isDataArrayTexture)if(Wt){if(se&&e.texStorage3D(i.TEXTURE_2D_ARRAY,Et,Lt,ut.width,ut.height,ut.depth),F)if(x.layerUpdates.size>0){let ct=nh(ut.width,ut.height,x.format,x.type);for(let Rt of x.layerUpdates){let Ut=ut.data.subarray(Rt*ct/ut.data.BYTES_PER_ELEMENT,(Rt+1)*ct/ut.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Rt,ut.width,ut.height,1,At,Xt,Ut)}x.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ut.width,ut.height,ut.depth,At,Xt,ut.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Lt,ut.width,ut.height,ut.depth,0,At,Xt,ut.data);else if(x.isData3DTexture)Wt?(se&&e.texStorage3D(i.TEXTURE_3D,Et,Lt,ut.width,ut.height,ut.depth),F&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ut.width,ut.height,ut.depth,At,Xt,ut.data)):e.texImage3D(i.TEXTURE_3D,0,Lt,ut.width,ut.height,ut.depth,0,At,Xt,ut.data);else if(x.isFramebufferTexture){if(se)if(Wt)e.texStorage2D(i.TEXTURE_2D,Et,Lt,ut.width,ut.height);else{let ct=ut.width,Rt=ut.height;for(let Ut=0;Ut<Et;Ut++)e.texImage2D(i.TEXTURE_2D,Ut,Lt,ct,Rt,0,At,Xt,null),ct>>=1,Rt>>=1}}else if(x.isHTMLTexture){if("texElementImage2D"in i){let ct=i.canvas;if(ct.hasAttribute("layoutsubtree")||ct.setAttribute("layoutsubtree","true"),ut.parentNode!==ct){ct.appendChild(ut),f.add(x),ct.onpaint=Rt=>{let Ut=Rt.changedElements;for(let ft of f)Ut.includes(ft.image)&&(ft.needsUpdate=!0)},ct.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,ut);else{let Ut=i.RGBA,ft=i.RGBA,qt=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,Ut,ft,qt,ut)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(Nt.length>0){if(Wt&&se){let ct=ae(Nt[0]);e.texStorage2D(i.TEXTURE_2D,Et,Lt,ct.width,ct.height)}for(let ct=0,Rt=Nt.length;ct<Rt;ct++)Pt=Nt[ct],Wt?F&&e.texSubImage2D(i.TEXTURE_2D,ct,0,0,At,Xt,Pt):e.texImage2D(i.TEXTURE_2D,ct,Lt,At,Xt,Pt);x.generateMipmaps=!1}else if(Wt){if(se){let ct=ae(ut);e.texStorage2D(i.TEXTURE_2D,Et,Lt,ct.width,ct.height)}F&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,At,Xt,ut)}else e.texImage2D(i.TEXTURE_2D,0,Lt,At,Xt,ut);m(x)&&w(Z),St.__version=yt.version,x.onUpdate&&x.onUpdate(x)}C.__version=x.version}function Vt(C,x,z){if(x.image.length!==6)return;let Z=Jt(C,x),et=x.source;e.bindTexture(i.TEXTURE_CUBE_MAP,C.__webglTexture,i.TEXTURE0+z);let yt=n.get(et);if(et.version!==yt.__version||Z===!0){e.activeTexture(i.TEXTURE0+z);let St=pe.getPrimaries(pe.workingColorSpace),ot=x.colorSpace===yi?null:pe.getPrimaries(x.colorSpace),ut=x.colorSpace===yi||St===ot?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),e.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ut);let At=x.isCompressedTexture||x.image[0].isCompressedTexture,Xt=x.image[0]&&x.image[0].isDataTexture,Lt=[];for(let ft=0;ft<6;ft++)!At&&!Xt?Lt[ft]=p(x.image[ft],!0,s.maxCubemapSize):Lt[ft]=Xt?x.image[ft].image:x.image[ft],Lt[ft]=fe(x,Lt[ft]);let Pt=Lt[0],Nt=r.convert(x.format,x.colorSpace),Wt=r.convert(x.type),se=M(x.internalFormat,Nt,Wt,x.normalized,x.colorSpace),F=x.isVideoTexture!==!0,Et=yt.__version===void 0||Z===!0,ct=et.dataReady,Rt=S(x,Pt);Ct(i.TEXTURE_CUBE_MAP,x);let Ut;if(At){F&&Et&&e.texStorage2D(i.TEXTURE_CUBE_MAP,Rt,se,Pt.width,Pt.height);for(let ft=0;ft<6;ft++){Ut=Lt[ft].mipmaps;for(let qt=0;qt<Ut.length;qt++){let Gt=Ut[qt];x.format!==Un?Nt!==null?F?ct&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ft,qt,0,0,Gt.width,Gt.height,Nt,Gt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ft,qt,se,Gt.width,Gt.height,0,Gt.data):te("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):F?ct&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ft,qt,0,0,Gt.width,Gt.height,Nt,Wt,Gt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ft,qt,se,Gt.width,Gt.height,0,Nt,Wt,Gt.data)}}}else{if(Ut=x.mipmaps,F&&Et){Ut.length>0&&Rt++;let ft=ae(Lt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,Rt,se,ft.width,ft.height)}for(let ft=0;ft<6;ft++)if(Xt){F?ct&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ft,0,0,0,Lt[ft].width,Lt[ft].height,Nt,Wt,Lt[ft].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ft,0,se,Lt[ft].width,Lt[ft].height,0,Nt,Wt,Lt[ft].data);for(let qt=0;qt<Ut.length;qt++){let we=Ut[qt].image[ft].image;F?ct&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ft,qt+1,0,0,we.width,we.height,Nt,Wt,we.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ft,qt+1,se,we.width,we.height,0,Nt,Wt,we.data)}}else{F?ct&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ft,0,0,0,Nt,Wt,Lt[ft]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ft,0,se,Nt,Wt,Lt[ft]);for(let qt=0;qt<Ut.length;qt++){let Gt=Ut[qt];F?ct&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ft,qt+1,0,0,Nt,Wt,Gt.image[ft]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ft,qt+1,se,Nt,Wt,Gt.image[ft])}}}m(x)&&w(i.TEXTURE_CUBE_MAP),yt.__version=et.version,x.onUpdate&&x.onUpdate(x)}C.__version=x.version}function dt(C,x,z,Z,et,yt){let St=r.convert(z.format,z.colorSpace),ot=r.convert(z.type),ut=M(z.internalFormat,St,ot,z.normalized,z.colorSpace),At=n.get(x),Xt=n.get(z);if(Xt.__renderTarget=x,!At.__hasExternalTextures){let Lt=Math.max(1,x.width>>yt),Pt=Math.max(1,x.height>>yt);et===i.TEXTURE_3D||et===i.TEXTURE_2D_ARRAY?e.texImage3D(et,yt,ut,Lt,Pt,x.depth,0,St,ot,null):e.texImage2D(et,yt,ut,Lt,Pt,0,St,ot,null)}e.bindFramebuffer(i.FRAMEBUFFER,C),ie(x)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Z,et,Xt.__webglTexture,0,Qt(x)):(et===i.TEXTURE_2D||et>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&et<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,Z,et,Xt.__webglTexture,yt),e.bindFramebuffer(i.FRAMEBUFFER,null)}function Bt(C,x,z){if(i.bindRenderbuffer(i.RENDERBUFFER,C),x.depthBuffer){let Z=x.depthTexture,et=Z&&Z.isDepthTexture?Z.type:null,yt=A(x.stencilBuffer,et),St=x.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;ie(x)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Qt(x),yt,x.width,x.height):z?i.renderbufferStorageMultisample(i.RENDERBUFFER,Qt(x),yt,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,yt,x.width,x.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,St,i.RENDERBUFFER,C)}else{let Z=x.textures;for(let et=0;et<Z.length;et++){let yt=Z[et],St=r.convert(yt.format,yt.colorSpace),ot=r.convert(yt.type),ut=M(yt.internalFormat,St,ot,yt.normalized,yt.colorSpace);ie(x)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Qt(x),ut,x.width,x.height):z?i.renderbufferStorageMultisample(i.RENDERBUFFER,Qt(x),ut,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,ut,x.width,x.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function ye(C,x,z){let Z=x.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(i.FRAMEBUFFER,C),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let et=n.get(x.depthTexture);if(et.__renderTarget=x,(!et.__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),Z){if(et.__webglInit===void 0&&(et.__webglInit=!0,x.depthTexture.addEventListener("dispose",I)),et.__webglTexture===void 0){et.__webglTexture=i.createTexture(),e.bindTexture(i.TEXTURE_CUBE_MAP,et.__webglTexture),Ct(i.TEXTURE_CUBE_MAP,x.depthTexture);let At=r.convert(x.depthTexture.format),Xt=r.convert(x.depthTexture.type),Lt;x.depthTexture.format===jn?Lt=i.DEPTH_COMPONENT24:x.depthTexture.format===zi&&(Lt=i.DEPTH24_STENCIL8);for(let Pt=0;Pt<6;Pt++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Pt,0,Lt,x.width,x.height,0,At,Xt,null)}}else Q(x.depthTexture,0);let yt=et.__webglTexture,St=Qt(x),ot=Z?i.TEXTURE_CUBE_MAP_POSITIVE_X+z:i.TEXTURE_2D,ut=x.depthTexture.format===zi?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(x.depthTexture.format===jn)ie(x)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ut,ot,yt,0,St):i.framebufferTexture2D(i.FRAMEBUFFER,ut,ot,yt,0);else if(x.depthTexture.format===zi)ie(x)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ut,ot,yt,0,St):i.framebufferTexture2D(i.FRAMEBUFFER,ut,ot,yt,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function ht(C){let x=n.get(C),z=C.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==C.depthTexture){let Z=C.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),Z){let et=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,Z.removeEventListener("dispose",et)};Z.addEventListener("dispose",et),x.__depthDisposeCallback=et}x.__boundDepthTexture=Z}if(C.depthTexture&&!x.__autoAllocateDepthBuffer)if(z)for(let Z=0;Z<6;Z++)ye(x.__webglFramebuffer[Z],C,Z);else{let Z=C.texture.mipmaps;Z&&Z.length>0?ye(x.__webglFramebuffer[0],C,0):ye(x.__webglFramebuffer,C,0)}else if(z){x.__webglDepthbuffer=[];for(let Z=0;Z<6;Z++)if(e.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[Z]),x.__webglDepthbuffer[Z]===void 0)x.__webglDepthbuffer[Z]=i.createRenderbuffer(),Bt(x.__webglDepthbuffer[Z],C,!1);else{let et=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,yt=x.__webglDepthbuffer[Z];i.bindRenderbuffer(i.RENDERBUFFER,yt),i.framebufferRenderbuffer(i.FRAMEBUFFER,et,i.RENDERBUFFER,yt)}}else{let Z=C.texture.mipmaps;if(Z&&Z.length>0?e.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=i.createRenderbuffer(),Bt(x.__webglDepthbuffer,C,!1);else{let et=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,yt=x.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,yt),i.framebufferRenderbuffer(i.FRAMEBUFFER,et,i.RENDERBUFFER,yt)}}e.bindFramebuffer(i.FRAMEBUFFER,null)}function mt(C,x,z){let Z=n.get(C);x!==void 0&&dt(Z.__webglFramebuffer,C,C.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),z!==void 0&&ht(C)}function _t(C){let x=C.texture,z=n.get(C),Z=n.get(x);C.addEventListener("dispose",_);let et=C.textures,yt=C.isWebGLCubeRenderTarget===!0,St=et.length>1;if(St||(Z.__webglTexture===void 0&&(Z.__webglTexture=i.createTexture()),Z.__version=x.version,o.memory.textures++),yt){z.__webglFramebuffer=[];for(let ot=0;ot<6;ot++)if(x.mipmaps&&x.mipmaps.length>0){z.__webglFramebuffer[ot]=[];for(let ut=0;ut<x.mipmaps.length;ut++)z.__webglFramebuffer[ot][ut]=i.createFramebuffer()}else z.__webglFramebuffer[ot]=i.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){z.__webglFramebuffer=[];for(let ot=0;ot<x.mipmaps.length;ot++)z.__webglFramebuffer[ot]=i.createFramebuffer()}else z.__webglFramebuffer=i.createFramebuffer();if(St)for(let ot=0,ut=et.length;ot<ut;ot++){let At=n.get(et[ot]);At.__webglTexture===void 0&&(At.__webglTexture=i.createTexture(),o.memory.textures++)}if(C.samples>0&&ie(C)===!1){z.__webglMultisampledFramebuffer=i.createFramebuffer(),z.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let ot=0;ot<et.length;ot++){let ut=et[ot];z.__webglColorRenderbuffer[ot]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,z.__webglColorRenderbuffer[ot]);let At=r.convert(ut.format,ut.colorSpace),Xt=r.convert(ut.type),Lt=M(ut.internalFormat,At,Xt,ut.normalized,ut.colorSpace,C.isXRRenderTarget===!0),Pt=Qt(C);i.renderbufferStorageMultisample(i.RENDERBUFFER,Pt,Lt,C.width,C.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ot,i.RENDERBUFFER,z.__webglColorRenderbuffer[ot])}i.bindRenderbuffer(i.RENDERBUFFER,null),C.depthBuffer&&(z.__webglDepthRenderbuffer=i.createRenderbuffer(),Bt(z.__webglDepthRenderbuffer,C,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(yt){e.bindTexture(i.TEXTURE_CUBE_MAP,Z.__webglTexture),Ct(i.TEXTURE_CUBE_MAP,x);for(let ot=0;ot<6;ot++)if(x.mipmaps&&x.mipmaps.length>0)for(let ut=0;ut<x.mipmaps.length;ut++)dt(z.__webglFramebuffer[ot][ut],C,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,ut);else dt(z.__webglFramebuffer[ot],C,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0);m(x)&&w(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(St){for(let ot=0,ut=et.length;ot<ut;ot++){let At=et[ot],Xt=n.get(At),Lt=i.TEXTURE_2D;(C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(Lt=C.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(Lt,Xt.__webglTexture),Ct(Lt,At),dt(z.__webglFramebuffer,C,At,i.COLOR_ATTACHMENT0+ot,Lt,0),m(At)&&w(Lt)}e.unbindTexture()}else{let ot=i.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(ot=C.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(ot,Z.__webglTexture),Ct(ot,x),x.mipmaps&&x.mipmaps.length>0)for(let ut=0;ut<x.mipmaps.length;ut++)dt(z.__webglFramebuffer[ut],C,x,i.COLOR_ATTACHMENT0,ot,ut);else dt(z.__webglFramebuffer,C,x,i.COLOR_ATTACHMENT0,ot,0);m(x)&&w(ot),e.unbindTexture()}C.depthBuffer&&ht(C)}function gt(C){let x=C.textures;for(let z=0,Z=x.length;z<Z;z++){let et=x[z];if(m(et)){let yt=R(C),St=n.get(et).__webglTexture;e.bindTexture(yt,St),w(yt),e.unbindTexture()}}}let Tt=[],jt=[];function $t(C){if(C.samples>0){if(ie(C)===!1){let x=C.textures,z=C.width,Z=C.height,et=i.COLOR_BUFFER_BIT,yt=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,St=n.get(C),ot=x.length>1;if(ot)for(let At=0;At<x.length;At++)e.bindFramebuffer(i.FRAMEBUFFER,St.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+At,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,St.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+At,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,St.__webglMultisampledFramebuffer);let ut=C.texture.mipmaps;ut&&ut.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,St.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,St.__webglFramebuffer);for(let At=0;At<x.length;At++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(et|=i.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(et|=i.STENCIL_BUFFER_BIT)),ot){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,St.__webglColorRenderbuffer[At]);let Xt=n.get(x[At]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Xt,0)}i.blitFramebuffer(0,0,z,Z,0,0,z,Z,et,i.NEAREST),c===!0&&(Tt.length=0,jt.length=0,Tt.push(i.COLOR_ATTACHMENT0+At),C.depthBuffer&&C.storeMultisampledDepthBuffer===!1&&(Tt.push(yt),jt.push(yt),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,jt)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Tt))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ot)for(let At=0;At<x.length;At++){e.bindFramebuffer(i.FRAMEBUFFER,St.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+At,i.RENDERBUFFER,St.__webglColorRenderbuffer[At]);let Xt=n.get(x[At]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,St.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+At,i.TEXTURE_2D,Xt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,St.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.storeMultisampledDepthBuffer===!1&&c){let x=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[x])}}}function Qt(C){return Math.min(s.maxSamples,C.samples)}function ie(C){let x=n.get(C);return C.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function L(C){let x=o.render.frame;u.get(C)!==x&&(u.set(C,x),C.update())}function fe(C,x){let z=C.colorSpace,Z=C.format,et=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||z!==gr&&z!==yi&&(pe.getTransfer(z)===Te?(Z!==Un||et!==yn)&&te("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):ne("WebGLTextures: Unsupported texture color space:",z)),x}function ae(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(l.width=C.naturalWidth||C.width,l.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(l.width=C.displayWidth,l.height=C.displayHeight):(l.width=C.width,l.height=C.height),l}this.allocateTextureUnit=Y,this.resetTextureUnits=W,this.getTextureUnits=U,this.setTextureUnits=B,this.setTexture2D=Q,this.setTexture2DArray=X,this.setTexture3D=q,this.setTextureCube=tt,this.rebindTextures=mt,this.setupRenderTarget=_t,this.updateRenderTargetMipmap=gt,this.updateMultisampleRenderTarget=$t,this.setupDepthRenderbuffer=ht,this.setupFrameBufferTexture=dt,this.useMultisampledRTT=ie,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function h_(i,t){function e(n,s=yi){let r,o=pe.getTransfer(s);if(n===yn)return i.UNSIGNED_BYTE;if(n===Ia)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Pa)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Hc)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Wc)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Vc)return i.BYTE;if(n===Gc)return i.SHORT;if(n===Gs)return i.UNSIGNED_SHORT;if(n===Ra)return i.INT;if(n===qn)return i.UNSIGNED_INT;if(n===Yn)return i.FLOAT;if(n===$n)return i.HALF_FLOAT;if(n===Xc)return i.ALPHA;if(n===qc)return i.RGB;if(n===Un)return i.RGBA;if(n===jn)return i.DEPTH_COMPONENT;if(n===zi)return i.DEPTH_STENCIL;if(n===Yc)return i.RED;if(n===La)return i.RED_INTEGER;if(n===ki)return i.RG;if(n===Da)return i.RG_INTEGER;if(n===Na)return i.RGBA_INTEGER;if(n===Gr||n===Hr||n===Wr||n===Xr)if(o===Te)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Gr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Hr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Wr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Xr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Gr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Hr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Wr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Xr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Ua||n===Fa||n===Oa||n===Ba)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Ua)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Fa)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Oa)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Ba)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===za||n===ka||n===Va||n===Ga||n===Ha||n===qr||n===Wa)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===za||n===ka)return o===Te?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Va)return o===Te?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===Ga)return r.COMPRESSED_R11_EAC;if(n===Ha)return r.COMPRESSED_SIGNED_R11_EAC;if(n===qr)return r.COMPRESSED_RG11_EAC;if(n===Wa)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Xa||n===qa||n===Ya||n===$a||n===Za||n===Ja||n===Ka||n===ja||n===Qa||n===tl||n===el||n===nl||n===il||n===sl)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Xa)return o===Te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===qa)return o===Te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Ya)return o===Te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===$a)return o===Te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Za)return o===Te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Ja)return o===Te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Ka)return o===Te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===ja)return o===Te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Qa)return o===Te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===tl)return o===Te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===el)return o===Te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===nl)return o===Te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===il)return o===Te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===sl)return o===Te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===rl||n===ol||n===al)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===rl)return o===Te?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===ol)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===al)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===ll||n===cl||n===Yr||n===hl)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===ll)return r.COMPRESSED_RED_RGTC1_EXT;if(n===cl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Yr)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===hl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Hs?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}var u_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,d_=`
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

}`,gh=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let n=new Sr(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new En({vertexShader:u_,fragmentShader:d_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Ne(new ns(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},xh=class extends Qn{constructor(t,e){super();let n=this,s=null,r=1,o=null,a="local-floor",c=1,l=null,u=null,f=null,h=null,d=null,g=null,v=typeof XRWebGLBinding<"u",p=new gh,m={},w=e.getContextAttributes(),R=null,M=null,A=[],S=[],I=new vt,_=null,E=null,N=new mn;N.viewport=new Ue;let P=new mn;P.viewport=new Ue;let k=[N,P],W=new Ta,U=null,B=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(nt){let at=A[nt];return at===void 0&&(at=new Ps,A[nt]=at),at.getTargetRaySpace()},this.getControllerGrip=function(nt){let at=A[nt];return at===void 0&&(at=new Ps,A[nt]=at),at.getGripSpace()},this.getHand=function(nt){let at=A[nt];return at===void 0&&(at=new Ps,A[nt]=at),at.getHandSpace()};function Y(nt){let at=S.indexOf(nt.inputSource);if(at===-1)return;let bt=A[at];bt!==void 0&&(bt.update(nt.inputSource,nt.frame,l||o),bt.dispatchEvent({type:nt.type,data:nt.inputSource}))}function D(){s.removeEventListener("select",Y),s.removeEventListener("selectstart",Y),s.removeEventListener("selectend",Y),s.removeEventListener("squeeze",Y),s.removeEventListener("squeezestart",Y),s.removeEventListener("squeezeend",Y),s.removeEventListener("end",D),s.removeEventListener("inputsourceschange",Q);for(let nt=0;nt<A.length;nt++){let at=S[nt];at!==null&&(S[nt]=null,A[nt].disconnect(at))}U=null,B=null,p.reset();for(let nt in m)delete m[nt];if(t.setRenderTarget(R),d=null,h=null,f=null,s=null,M=null,Jt.stop(),n.isPresenting=!1,t.setPixelRatio(_),t.setSize(I.width,I.height,!1),E!==null){let nt=E.camera;nt.fov=E.fov,nt.zoom=E.zoom,nt.updateProjectionMatrix(),E=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(nt){r=nt,n.isPresenting===!0&&te("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(nt){a=nt,n.isPresenting===!0&&te("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(nt){l=nt},this.getBaseLayer=function(){return h!==null?h:d},this.getBinding=function(){return f===null&&v&&(f=new XRWebGLBinding(s,e)),f},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(nt){if(s=nt,s!==null){if(R=t.getRenderTarget(),s.addEventListener("select",Y),s.addEventListener("selectstart",Y),s.addEventListener("selectend",Y),s.addEventListener("squeeze",Y),s.addEventListener("squeezestart",Y),s.addEventListener("squeezeend",Y),s.addEventListener("end",D),s.addEventListener("inputsourceschange",Q),w.xrCompatible!==!0&&await e.makeXRCompatible(),_=t.getPixelRatio(),t.getSize(I),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let bt=null,Vt=null,dt=null;w.depth&&(dt=w.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,bt=w.stencil?zi:jn,Vt=w.stencil?Hs:qn);let Bt={colorFormat:e.RGBA8,depthFormat:dt,scaleFactor:r};f=this.getBinding(),h=f.createProjectionLayer(Bt),s.updateRenderState({layers:[h]}),t.setPixelRatio(1),t.setSize(h.textureWidth,h.textureHeight,!1),M=new _n(h.textureWidth,h.textureHeight,{format:Un,type:yn,depthTexture:new Ii(h.textureWidth,h.textureHeight,Vt,void 0,void 0,void 0,void 0,void 0,void 0,bt),stencilBuffer:w.stencil,colorSpace:t.outputColorSpace,samples:w.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1,storeMultisampledDepthBuffer:h.ignoreDepthValues===!1,storeMultisampledStencilBuffer:h.ignoreDepthValues===!1})}else{let bt={antialias:w.antialias,alpha:!0,depth:w.depth,stencil:w.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,e,bt),s.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),M=new _n(d.framebufferWidth,d.framebufferHeight,{format:Un,type:yn,colorSpace:t.outputColorSpace,stencilBuffer:w.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),Jt.setContext(s),Jt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return p.getDepthTexture()};function Q(nt){for(let at=0;at<nt.removed.length;at++){let bt=nt.removed[at],Vt=S.indexOf(bt);Vt>=0&&(S[Vt]=null,A[Vt].disconnect(bt))}for(let at=0;at<nt.added.length;at++){let bt=nt.added[at],Vt=S.indexOf(bt);if(Vt===-1){for(let Bt=0;Bt<A.length;Bt++)if(Bt>=S.length){S.push(bt),Vt=Bt;break}else if(S[Bt]===null){S[Bt]=bt,Vt=Bt;break}if(Vt===-1)break}let dt=A[Vt];dt&&dt.connect(bt)}}let X=new O,q=new O;function tt(nt,at,bt){X.setFromMatrixPosition(at.matrixWorld),q.setFromMatrixPosition(bt.matrixWorld);let Vt=X.distanceTo(q),dt=at.projectionMatrix.elements,Bt=bt.projectionMatrix.elements,ye=dt[14]/(dt[10]-1),ht=dt[14]/(dt[10]+1),mt=(dt[9]+1)/dt[5],_t=(dt[9]-1)/dt[5],gt=(dt[8]-1)/dt[0],Tt=(Bt[8]+1)/Bt[0],jt=ye*gt,$t=ye*Tt,Qt=Vt/(-gt+Tt),ie=Qt*-gt;if(at.matrixWorld.decompose(nt.position,nt.quaternion,nt.scale),nt.translateX(ie),nt.translateZ(Qt),nt.matrixWorld.compose(nt.position,nt.quaternion,nt.scale),nt.matrixWorldInverse.copy(nt.matrixWorld).invert(),dt[10]===-1)nt.projectionMatrix.copy(at.projectionMatrix),nt.projectionMatrixInverse.copy(at.projectionMatrixInverse);else{let L=ye+Qt,fe=ht+Qt,ae=jt-ie,C=$t+(Vt-ie),x=mt*ht/fe*L,z=_t*ht/fe*L;nt.projectionMatrix.makePerspective(ae,C,x,z,L,fe),nt.projectionMatrixInverse.copy(nt.projectionMatrix).invert()}}function pt(nt,at){at===null?nt.matrixWorld.copy(nt.matrix):nt.matrixWorld.multiplyMatrices(at.matrixWorld,nt.matrix),nt.matrixWorldInverse.copy(nt.matrixWorld).invert()}this.updateCamera=function(nt){if(s===null)return;let at=nt.near,bt=nt.far;p.texture!==null&&(p.depthNear>0&&(at=p.depthNear),p.depthFar>0&&(bt=p.depthFar)),W.near=P.near=N.near=at,W.far=P.far=N.far=bt,(U!==W.near||B!==W.far)&&(s.updateRenderState({depthNear:W.near,depthFar:W.far}),U=W.near,B=W.far),W.layers.mask=nt.layers.mask|6,N.layers.mask=W.layers.mask&-5,P.layers.mask=W.layers.mask&-3;let Vt=nt.parent,dt=W.cameras;pt(W,Vt);for(let Bt=0;Bt<dt.length;Bt++)pt(dt[Bt],Vt);dt.length===2?tt(W,N,P):W.projectionMatrix.copy(N.projectionMatrix),E===null&&nt.isPerspectiveCamera&&(E={camera:nt,fov:nt.fov,zoom:nt.zoom}),lt(nt,W,Vt)};function lt(nt,at,bt){bt===null?nt.matrix.copy(at.matrixWorld):(nt.matrix.copy(bt.matrixWorld),nt.matrix.invert(),nt.matrix.multiply(at.matrixWorld)),nt.matrix.decompose(nt.position,nt.quaternion,nt.scale),nt.updateMatrixWorld(!0),nt.projectionMatrix.copy(at.projectionMatrix),nt.projectionMatrixInverse.copy(at.projectionMatrixInverse),nt.isPerspectiveCamera&&(nt.fov=Zo*2*Math.atan(1/nt.projectionMatrix.elements[5]),nt.zoom=1)}this.getCamera=function(){return W},this.getFoveation=function(){if(!(h===null&&d===null))return c},this.setFoveation=function(nt){c=nt,h!==null&&(h.fixedFoveation=nt),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=nt)},this.hasDepthSensing=function(){return p.texture!==null},this.getDepthSensingMesh=function(){return p.getMesh(W)},this.getCameraTexture=function(nt){return m[nt]};let Kt=null;function Ct(nt,at){if(u=at.getViewerPose(l||o),g=at,u!==null){let bt=u.views;d!==null&&(t.setRenderTargetFramebuffer(M,d.framebuffer),t.setRenderTarget(M));let Vt=!1;bt.length!==W.cameras.length&&(W.cameras.length=0,Vt=!0);for(let ht=0;ht<bt.length;ht++){let mt=bt[ht],_t=null;if(d!==null)_t=d.getViewport(mt);else{let Tt=f.getViewSubImage(h,mt);_t=Tt.viewport,ht===0&&(t.setRenderTargetTextures(M,Tt.colorTexture,Tt.depthStencilTexture),t.setRenderTarget(M))}let gt=k[ht];gt===void 0&&(gt=new mn,gt.layers.enable(ht),gt.viewport=new Ue,k[ht]=gt),gt.matrix.fromArray(mt.transform.matrix),gt.matrix.decompose(gt.position,gt.quaternion,gt.scale),gt.projectionMatrix.fromArray(mt.projectionMatrix),gt.projectionMatrixInverse.copy(gt.projectionMatrix).invert(),gt.viewport.set(_t.x,_t.y,_t.width,_t.height),ht===0&&(W.matrix.copy(gt.matrix),W.matrix.decompose(W.position,W.quaternion,W.scale)),Vt===!0&&W.cameras.push(gt)}let dt=s.enabledFeatures;if(dt&&dt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&v){f=n.getBinding();let ht=f.getDepthInformation(bt[0]);ht&&ht.isValid&&ht.texture&&p.init(ht,s.renderState)}if(dt&&dt.includes("camera-access")&&v){t.state.unbindTexture(),f=n.getBinding();for(let ht=0;ht<bt.length;ht++){let mt=bt[ht].camera;if(mt){let _t=m[mt];_t||(_t=new Sr,m[mt]=_t);let gt=f.getCameraImage(mt);_t.sourceTexture=gt}}}}for(let bt=0;bt<A.length;bt++){let Vt=S[bt],dt=A[bt];Vt!==null&&dt!==void 0&&dt.update(Vt,at,l||o)}Kt&&Kt(nt,at),at.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:at}),g=null}let Jt=new Rd;Jt.setAnimationLoop(Ct),this.setAnimationLoop=function(nt){Kt=nt},this.dispose=function(){}}},f_=new Ce,Ud=new oe;Ud.set(-1,0,0,0,1,0,0,0,1);function p_(i,t){function e(p,m){p.matrixAutoUpdate===!0&&p.updateMatrix(),m.value.copy(p.matrix)}function n(p,m){m.color.getRGB(p.fogColor.value,Qc(i)),m.isFog?(p.fogNear.value=m.near,p.fogFar.value=m.far):m.isFogExp2&&(p.fogDensity.value=m.density)}function s(p,m,w,R,M){m.isNodeMaterial?m.uniformsNeedUpdate=!1:m.isMeshBasicMaterial?r(p,m):m.isMeshLambertMaterial?(r(p,m),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(r(p,m),f(p,m)):m.isMeshPhongMaterial?(r(p,m),u(p,m),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(r(p,m),h(p,m),m.isMeshPhysicalMaterial&&d(p,m,M)):m.isMeshMatcapMaterial?(r(p,m),g(p,m)):m.isMeshDepthMaterial?r(p,m):m.isMeshDistanceMaterial?(r(p,m),v(p,m)):m.isMeshNormalMaterial?r(p,m):m.isLineBasicMaterial?(o(p,m),m.isLineDashedMaterial&&a(p,m)):m.isPointsMaterial?c(p,m,w,R):m.isSpriteMaterial?l(p,m):m.isShadowMaterial?(p.color.value.copy(m.color),p.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(p,m){p.opacity.value=m.opacity,m.color&&p.diffuse.value.copy(m.color),m.emissive&&p.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(p.map.value=m.map,e(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.bumpMap&&(p.bumpMap.value=m.bumpMap,e(m.bumpMap,p.bumpMapTransform),p.bumpScale.value=m.bumpScale,m.side===Ke&&(p.bumpScale.value*=-1)),m.normalMap&&(p.normalMap.value=m.normalMap,e(m.normalMap,p.normalMapTransform),p.normalScale.value.copy(m.normalScale),m.side===Ke&&p.normalScale.value.negate()),m.displacementMap&&(p.displacementMap.value=m.displacementMap,e(m.displacementMap,p.displacementMapTransform),p.displacementScale.value=m.displacementScale,p.displacementBias.value=m.displacementBias),m.emissiveMap&&(p.emissiveMap.value=m.emissiveMap,e(m.emissiveMap,p.emissiveMapTransform)),m.specularMap&&(p.specularMap.value=m.specularMap,e(m.specularMap,p.specularMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest);let w=t.get(m),R=w.envMap,M=w.envMapRotation;R&&(p.envMap.value=R,p.envMapRotation.value.setFromMatrix4(f_.makeRotationFromEuler(M)).transpose(),R.isCubeTexture&&R.isRenderTargetTexture===!1&&p.envMapRotation.value.premultiply(Ud),p.reflectivity.value=m.reflectivity,p.ior.value=m.ior,p.refractionRatio.value=m.refractionRatio),m.lightMap&&(p.lightMap.value=m.lightMap,p.lightMapIntensity.value=m.lightMapIntensity,e(m.lightMap,p.lightMapTransform)),m.aoMap&&(p.aoMap.value=m.aoMap,p.aoMapIntensity.value=m.aoMapIntensity,e(m.aoMap,p.aoMapTransform))}function o(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,m.map&&(p.map.value=m.map,e(m.map,p.mapTransform))}function a(p,m){p.dashSize.value=m.dashSize,p.totalSize.value=m.dashSize+m.gapSize,p.scale.value=m.scale}function c(p,m,w,R){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.size.value=m.size*w,p.scale.value=R*.5,m.map&&(p.map.value=m.map,e(m.map,p.uvTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function l(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.rotation.value=m.rotation,m.map&&(p.map.value=m.map,e(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function u(p,m){p.specular.value.copy(m.specular),p.shininess.value=Math.max(m.shininess,1e-4)}function f(p,m){m.gradientMap&&(p.gradientMap.value=m.gradientMap)}function h(p,m){p.metalness.value=m.metalness,m.metalnessMap&&(p.metalnessMap.value=m.metalnessMap,e(m.metalnessMap,p.metalnessMapTransform)),p.roughness.value=m.roughness,m.roughnessMap&&(p.roughnessMap.value=m.roughnessMap,e(m.roughnessMap,p.roughnessMapTransform)),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)}function d(p,m,w){p.ior.value=m.ior,m.sheen>0&&(p.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),p.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(p.sheenColorMap.value=m.sheenColorMap,e(m.sheenColorMap,p.sheenColorMapTransform)),m.sheenRoughnessMap&&(p.sheenRoughnessMap.value=m.sheenRoughnessMap,e(m.sheenRoughnessMap,p.sheenRoughnessMapTransform))),m.clearcoat>0&&(p.clearcoat.value=m.clearcoat,p.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(p.clearcoatMap.value=m.clearcoatMap,e(m.clearcoatMap,p.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,e(m.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(p.clearcoatNormalMap.value=m.clearcoatNormalMap,e(m.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Ke&&p.clearcoatNormalScale.value.negate())),m.dispersion>0&&(p.dispersion.value=m.dispersion),m.retroreflectivity>0&&(p.retroreflectivity.value=m.retroreflectivity),m.iridescence>0&&(p.iridescence.value=m.iridescence,p.iridescenceIOR.value=m.iridescenceIOR,p.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(p.iridescenceMap.value=m.iridescenceMap,e(m.iridescenceMap,p.iridescenceMapTransform)),m.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=m.iridescenceThicknessMap,e(m.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),m.transmission>0&&(p.transmission.value=m.transmission,p.transmissionSamplerMap.value=w.texture,p.transmissionSamplerSize.value.set(w.width,w.height),m.transmissionMap&&(p.transmissionMap.value=m.transmissionMap,e(m.transmissionMap,p.transmissionMapTransform)),p.thickness.value=m.thickness,m.thicknessMap&&(p.thicknessMap.value=m.thicknessMap,e(m.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=m.attenuationDistance,p.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(p.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(p.anisotropyMap.value=m.anisotropyMap,e(m.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=m.specularIntensity,p.specularColor.value.copy(m.specularColor),m.specularColorMap&&(p.specularColorMap.value=m.specularColorMap,e(m.specularColorMap,p.specularColorMapTransform)),m.specularIntensityMap&&(p.specularIntensityMap.value=m.specularIntensityMap,e(m.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,m){m.matcap&&(p.matcap.value=m.matcap)}function v(p,m){let w=t.get(m).light;p.referencePosition.value.setFromMatrixPosition(w.matrixWorld),p.nearDistance.value=w.shadow.camera.near,p.farDistance.value=w.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function m_(i,t,e,n){let s={},r={},o=[],a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(M,A){let S=A.program;n.uniformBlockBinding(M,S)}function l(M,A){let S=s[M.id];S===void 0&&(p(M),S=u(M),s[M.id]=S,M.addEventListener("dispose",w));let I=A.program;n.updateUBOMapping(M,I);let _=t.render.frame;r[M.id]!==_&&(h(M),r[M.id]=_)}function u(M){let A=f();M.__bindingPointIndex=A;let S=i.createBuffer(),I=M.__size,_=M.usage;return i.bindBuffer(i.UNIFORM_BUFFER,S),i.bufferData(i.UNIFORM_BUFFER,I,_),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,A,S),S}function f(){for(let M=0;M<a;M++)if(o.indexOf(M)===-1)return o.push(M),M;return ne("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(M){let A=s[M.id],S=M.uniforms,I=M.__cache;i.bindBuffer(i.UNIFORM_BUFFER,A);for(let _=0,E=S.length;_<E;_++){let N=S[_];if(Array.isArray(N))for(let P=0,k=N.length;P<k;P++)d(N[P],_,P,I);else d(N,_,0,I)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function d(M,A,S,I){if(v(M,A,S,I)===!0){let _=M.__offset,E=M.value;if(Array.isArray(E)){let N=0;for(let P=0;P<E.length;P++){let k=E[P],W=m(k);g(k,M.__data,N),typeof k!="number"&&typeof k!="boolean"&&!k.isMatrix3&&!ArrayBuffer.isView(k)&&(N+=W.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(E,M.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,_,M.__data)}}function g(M,A,S){typeof M=="number"||typeof M=="boolean"?A[0]=M:M.isMatrix3?(A[0]=M.elements[0],A[1]=M.elements[1],A[2]=M.elements[2],A[3]=0,A[4]=M.elements[3],A[5]=M.elements[4],A[6]=M.elements[5],A[7]=0,A[8]=M.elements[6],A[9]=M.elements[7],A[10]=M.elements[8],A[11]=0):ArrayBuffer.isView(M)?A.set(new M.constructor(M.buffer,M.byteOffset,A.length)):M.toArray(A,S)}function v(M,A,S,I){let _=M.value,E=A+"_"+S;if(I[E]===void 0)return typeof _=="number"||typeof _=="boolean"?I[E]=_:ArrayBuffer.isView(_)?I[E]=_.slice():I[E]=_.clone(),!0;{let N=I[E];if(typeof _=="number"||typeof _=="boolean"){if(N!==_)return I[E]=_,!0}else{if(ArrayBuffer.isView(_))return!0;if(N.equals(_)===!1)return N.copy(_),!0}}return!1}function p(M){let A=M.uniforms,S=0,I=16;for(let E=0,N=A.length;E<N;E++){let P=Array.isArray(A[E])?A[E]:[A[E]];for(let k=0,W=P.length;k<W;k++){let U=P[k],B=Array.isArray(U.value)?U.value:[U.value];for(let Y=0,D=B.length;Y<D;Y++){let Q=B[Y],X=m(Q),q=S%I,tt=q%X.boundary,pt=q+tt;S+=tt,pt!==0&&I-pt<X.storage&&(S+=I-pt),U.__data=new Float32Array(X.storage/Float32Array.BYTES_PER_ELEMENT),U.__offset=S,S+=X.storage}}}let _=S%I;return _>0&&(S+=I-_),M.__size=S,M.__cache={},this}function m(M){let A={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(A.boundary=4,A.storage=4):M.isVector2?(A.boundary=8,A.storage=8):M.isVector3||M.isColor?(A.boundary=16,A.storage=12):M.isVector4?(A.boundary=16,A.storage=16):M.isMatrix3?(A.boundary=48,A.storage=48):M.isMatrix4?(A.boundary=64,A.storage=64):M.isTexture?te("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(M)?(A.boundary=16,A.storage=M.byteLength):te("WebGLRenderer: Unsupported uniform value type.",M),A}function w(M){let A=M.target;A.removeEventListener("dispose",w);let S=o.indexOf(A.__bindingPointIndex);o.splice(S,1),i.deleteBuffer(s[A.id]),delete s[A.id],delete r[A.id]}function R(){for(let M in s)i.deleteBuffer(s[M]);o=[],s={},r={}}return{bind:c,update:l,dispose:R}}var g_=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),ri=null;function x_(){return ri===null&&(ri=new Qo(g_,16,16,ki,$n),ri.name="DFG_LUT",ri.minFilter=Ze,ri.magFilter=Ze,ri.wrapS=Kn,ri.wrapT=Kn,ri.generateMipmaps=!1,ri.needsUpdate=!0),ri}var yl=class{constructor(t={}){let{canvas:e=Ju(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:h=!1,outputBufferType:d=yn}=t;this.isWebGLRenderer=!0;let g;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=n.getContextAttributes().alpha}else g=o;let v=d,p=new Set([Na,Da,La]),m=new Set([yn,qn,Gs,Hs,Ia,Pa]),w=new Uint32Array(4),R=new Int32Array(4),M=new O,A=null,S=null,I=[],_=[],E=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Xn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let N=this,P=!1,k=null,W=null,U=null,B=null;this._outputColorSpace=hn;let Y=0,D=0,Q=null,X=-1,q=null,tt=new Ue,pt=new Ue,lt=null,Kt=new re(0),Ct=0,Jt=e.width,nt=e.height,at=1,bt=null,Vt=null,dt=new Ue(0,0,Jt,nt),Bt=new Ue(0,0,Jt,nt),ye=!1,ht=new Ns,mt=!1,_t=!1,gt=new Ce,Tt=new O,jt=new Ue,$t={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Qt=!1;function ie(){return Q===null?at:1}let L=n;function fe(b,V){return e.getContext(b,V)}let ae,C,x,z,Z,et,yt,St,ot,ut,At,Xt,Lt,Pt,Nt,Wt,se,F,Et,ct,Rt,Ut,ft;try{let b={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${"186"}`),e.addEventListener("webglcontextlost",we,!1),e.addEventListener("webglcontextrestored",ve,!1),e.addEventListener("webglcontextcreationerror",dn,!1),L===null){let V="webgl2";if(L=fe(V,b),L===null)throw fe(V)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}qt()}catch(b){throw e.removeEventListener("webglcontextlost",we,!1),e.removeEventListener("webglcontextrestored",ve,!1),e.removeEventListener("webglcontextcreationerror",dn,!1),ne("WebGLRenderer: "+b.message),b}function qt(){ae=new w0(L),ae.init(),Rt=new h_(L,ae),C=new p0(L,ae,t,Rt),x=new l_(L,ae),C.reversedDepthBuffer&&h&&x.buffers.depth.setReversed(!0),W=L.createFramebuffer(),U=L.createFramebuffer(),B=L.createFramebuffer(),z=new E0(L),Z=new $x,et=new c_(L,ae,x,Z,C,Rt,z),yt=new S0(N),St=new Rp(L),Ut=new d0(L,St),ot=new T0(L,St,z,Ut),ut=new R0(L,ot,St,Ut,z),F=new C0(L,C,et),Nt=new m0(Z),At=new Yx(N,yt,ae,C,Ut,Nt),Xt=new p_(N,Z),Lt=new Jx,Pt=new n_(ae),se=new u0(N,yt,x,ut,g,c),Wt=new a_(N,ut,C),ft=new m_(L,z,C,x),Et=new f0(L,ae,z),ct=new A0(L,ae,z),z.programs=At.programs,N.capabilities=C,N.extensions=ae,N.properties=Z,N.renderLists=Lt,N.shadowMap=Wt,N.state=x,N.info=z}v!==yn&&(E=new P0(v,e.width,e.height,a,s,r));let Gt=new xh(N,L);this.xr=Gt,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){let b=ae.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){let b=ae.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return at},this.setPixelRatio=function(b){b!==void 0&&(at=b,this.setSize(Jt,nt,!1))},this.getSize=function(b){return b.set(Jt,nt)},this.setSize=function(b,V,$=!0){if(Gt.isPresenting){te("WebGLRenderer: Can't change size while VR device is presenting.");return}Jt=b,nt=V,e.width=Math.floor(b*at),e.height=Math.floor(V*at),$===!0&&(e.style.width=b+"px",e.style.height=V+"px"),E!==null&&E.setSize(e.width,e.height),this.setViewport(0,0,b,V)},this.getDrawingBufferSize=function(b){return b.set(Jt*at,nt*at).floor()},this.setDrawingBufferSize=function(b,V,$){Jt=b,nt=V,at=$,e.width=Math.floor(b*$),e.height=Math.floor(V*$),this.setViewport(0,0,b,V)},this.setEffects=function(b){if(v===yn){ne("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(b){for(let V=0;V<b.length;V++)if(b[V].isOutputPass===!0){te("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}E.setEffects(b||[])},this.getCurrentViewport=function(b){return b.copy(tt)},this.getViewport=function(b){return b.copy(dt)},this.setViewport=function(b,V,$,K){b.isVector4?dt.set(b.x,b.y,b.z,b.w):dt.set(b,V,$,K),x.viewport(tt.copy(dt).multiplyScalar(at).round())},this.getScissor=function(b){return b.copy(Bt)},this.setScissor=function(b,V,$,K){b.isVector4?Bt.set(b.x,b.y,b.z,b.w):Bt.set(b,V,$,K),x.scissor(pt.copy(Bt).multiplyScalar(at).round())},this.getScissorTest=function(){return ye},this.setScissorTest=function(b){x.setScissorTest(ye=b)},this.setOpaqueSort=function(b){bt=b},this.setTransparentSort=function(b){Vt=b},this.getClearColor=function(b){return b.copy(se.getClearColor())},this.setClearColor=function(){se.setClearColor(...arguments)},this.getClearAlpha=function(){return se.getClearAlpha()},this.setClearAlpha=function(){se.setClearAlpha(...arguments)},this.clear=function(b=!0,V=!0,$=!0){let K=0;if(b){let J=!1;if(Q!==null){let Dt=Q.texture.format;J=p.has(Dt)}if(J){let Dt=Q.texture.type,wt=m.has(Dt),It=se.getClearColor(),zt=se.getClearAlpha(),xt=It.r,Zt=It.g,Yt=It.b;wt?(w[0]=xt,w[1]=Zt,w[2]=Yt,w[3]=zt,L.clearBufferuiv(L.COLOR,0,w)):(R[0]=xt,R[1]=Zt,R[2]=Yt,R[3]=zt,L.clearBufferiv(L.COLOR,0,R))}else K|=L.COLOR_BUFFER_BIT}V&&(K|=L.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),$&&(K|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),K!==0&&L.clear(K)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(b){b.setRenderer(this),k=b},this.dispose=function(){e.removeEventListener("webglcontextlost",we,!1),e.removeEventListener("webglcontextrestored",ve,!1),e.removeEventListener("webglcontextcreationerror",dn,!1),se.dispose(),Lt.dispose(),Pt.dispose(),Z.dispose(),yt.dispose(),ut.dispose(),Ut.dispose(),ft.dispose(),At.dispose(),Gt.dispose(),Gt.removeEventListener("sessionstart",no),Gt.removeEventListener("sessionend",Si),je.stop()};function we(b){b.preventDefault(),Kc("WebGLRenderer: Context Lost."),P=!0}function ve(){Kc("WebGLRenderer: Context Restored."),P=!1;let b=z.autoReset,V=Wt.enabled,$=Wt.autoUpdate,K=Wt.needsUpdate,J=Wt.type;qt(),z.autoReset=b,Wt.enabled=V,Wt.autoUpdate=$,Wt.needsUpdate=K,Wt.type=J}function dn(b){ne("WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function Rn(b){let V=b.target;V.removeEventListener("dispose",Rn),Ks(V)}function Ks(b){Rl(b),Z.remove(b)}function Rl(b){let V=Z.get(b).programs;V!==void 0&&(V.forEach(function($){At.releaseProgram($)}),b.isShaderMaterial&&At.releaseShaderCache(b))}this.renderBufferDirect=function(b,V,$,K,J,Dt){V===null&&(V=$t);let wt=J.isMesh&&J.matrixWorld.determinantAffine()<0,It=io(b,V,$,K,J);x.setMaterial(K,wt);let zt=$.index,xt=1;if(K.wireframe===!0){if(zt=ot.getWireframeAttribute($),zt===void 0)return;xt=2}let Zt=$.drawRange,Yt=$.attributes.position,kt=Zt.start*xt,me=(Zt.start+Zt.count)*xt;Dt!==null&&(kt=Math.max(kt,Dt.start*xt),me=Math.min(me,(Dt.start+Dt.count)*xt)),zt!==null?(kt=Math.max(kt,0),me=Math.min(me,zt.count)):Yt!=null&&(kt=Math.max(kt,0),me=Math.min(me,Yt.count));let Re=me-kt;if(Re<0||Re===1/0)return;Ut.setup(J,K,It,$,zt);let Ae,de=Et;if(zt!==null&&(Ae=St.get(zt),de=ct,de.setIndex(Ae)),J.isMesh)K.wireframe===!0?(x.setLineWidth(K.wireframeLinewidth*ie()),de.setMode(L.LINES)):de.setMode(L.TRIANGLES);else if(J.isLine){let ge=K.linewidth;ge===void 0&&(ge=1),x.setLineWidth(ge*ie()),J.isLineSegments?de.setMode(L.LINES):J.isLineLoop?de.setMode(L.LINE_LOOP):de.setMode(L.LINE_STRIP)}else J.isPoints?de.setMode(L.POINTS):J.isSprite&&de.setMode(L.TRIANGLES);if(J.isBatchedMesh)if(ae.get("WEBGL_multi_draw"))de.renderMultiDraw(J._multiDrawStarts,J._multiDrawCounts,J._multiDrawCount);else{let ge=J._multiDrawStarts,Mt=J._multiDrawCounts,ze=J._multiDrawCount,he=zt?St.get(zt).bytesPerElement:1,tn=Z.get(K).currentProgram.getUniforms();for(let Mn=0;Mn<ze;Mn++)tn.setValue(L,"_gl_DrawID",Mn),de.render(ge[Mn]/he,Mt[Mn])}else if(J.isInstancedMesh)de.renderInstances(kt,Re,J.count);else if($.isInstancedBufferGeometry){let ge=$._maxInstanceCount!==void 0?$._maxInstanceCount:1/0,Mt=Math.min($.instanceCount,ge);de.renderInstances(kt,Re,Mt)}else de.render(kt,Re)};function js(b,V,$,K){k!==null&&b.isNodeMaterial&&k.setObject(K,b),mt===!0&&Nt.setState(b,$,!1),b.transparent===!0&&b.side===ii&&b.forceSinglePass===!1?(b.side=Ke,b.needsUpdate=!0,ce(b,V,K),b.side=Fi,b.needsUpdate=!0,ce(b,V,K),b.side=ii):ce(b,V,K)}this.compile=function(b,V,$=null){$===null&&($=b),k!==null&&k.renderStart(b,V,$),S=Pt.get($),S.init(V),_.push(S),$.traverseVisible(function(J){J.isLight&&J.layers.test(V.layers)&&(S.pushLight(J),J.castShadow&&S.pushShadow(J))}),b!==$&&b.traverseVisible(function(J){J.isLight&&J.layers.test(V.layers)&&(S.pushLight(J),J.castShadow&&S.pushShadow(J))}),S.setupLights(),k!==null&&k.updateLights(S.state.lightsArray),_t=this.localClippingEnabled,mt=Nt.init(this.clippingPlanes,_t),mt===!0&&Nt.setGlobalState(this.clippingPlanes,V),k!==null&&Wt.render(S.state.shadowsArray,$,V);let K=new Set;return b.traverse(function(J){if(!(J.isMesh||J.isPoints||J.isLine||J.isSprite))return;let Dt=J.material;if(Dt)if(Array.isArray(Dt))for(let wt=0;wt<Dt.length;wt++){let It=Dt[wt];js(It,$,V,J),K.add(It)}else js(Dt,$,V,J),K.add(Dt)}),S=_.pop(),k!==null&&k.renderEnd(),K},this.compileAsync=function(b,V,$=null){let K=this.compile(b,V,$);return new Promise(J=>{function Dt(){if(K.forEach(function(wt){let zt=Z.get(wt).currentProgram;(zt===void 0||zt.isReady())&&K.delete(wt)}),K.size===0){J(b);return}setTimeout(Dt,10)}ae.get("KHR_parallel_shader_compile")!==null?Dt():setTimeout(Dt,10)})};let Qs=null;function Il(b){Qs&&Qs(b)}function no(){je.stop()}function Si(){je.start()}let je=new Rd;je.setAnimationLoop(Il),typeof self<"u"&&je.setContext(self),this.setAnimationLoop=function(b){Qs=b,Gt.setAnimationLoop(b),b===null?je.stop():je.start()},Gt.addEventListener("sessionstart",no),Gt.addEventListener("sessionend",Si),this.render=function(b,V){if(V!==void 0&&V.isCamera!==!0){ne("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;k!==null&&k.renderStart(b,V);let $=Gt.enabled===!0&&Gt.isPresenting===!0,K=E!==null&&(Q===null||$)&&E.begin(N,Q);if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),V.parent===null&&V.matrixWorldAutoUpdate===!0&&V.updateMatrixWorld(),Gt.enabled===!0&&Gt.isPresenting===!0&&(E===null||E.isCompositing()===!1)&&(Gt.cameraAutoUpdate===!0&&Gt.updateCamera(V),V=Gt.getCamera()),b.isScene===!0&&b.onBeforeRender(N,b,V,Q),S=Pt.get(b,_.length),S.init(V),S.state.textureUnits=et.getTextureUnits(),_.push(S),gt.multiplyMatrices(V.projectionMatrix,V.matrixWorldInverse),ht.setFromProjectionMatrix(gt,Wn,V.reversedDepth),_t=this.localClippingEnabled,mt=Nt.init(this.clippingPlanes,_t),A=Lt.get(b,I.length),A.init(),I.push(A),Gt.enabled===!0&&Gt.isPresenting===!0){let wt=N.xr.getDepthSensingMesh();wt!==null&&cs(wt,V,-1/0,N.sortObjects)}cs(b,V,0,N.sortObjects),A.finish(),k!==null&&k.updateLights(S.state.lightsArray),N.sortObjects===!0&&A.sort(bt,Vt),Qt=Gt.enabled===!1||Gt.isPresenting===!1||Gt.hasDepthSensing()===!1,Qt&&se.addToRenderList(A,b),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),mt===!0&&Nt.beginShadows();let J=S.state.shadowsArray;if(Wt.render(J,b,V),mt===!0&&Nt.endShadows(),(K&&E.hasRenderPass())===!1){let wt=A.opaque,It=A.transmissive;if(S.setupLights(),V.isArrayCamera){let zt=V.cameras;if(It.length>0)for(let xt=0,Zt=zt.length;xt<Zt;xt++){let Yt=zt[xt];cn(wt,It,b,Yt)}Qt&&se.render(b);for(let xt=0,Zt=zt.length;xt<Zt;xt++){let Yt=zt[xt];Le(A,b,Yt,Yt.viewport)}}else It.length>0&&cn(wt,It,b,V),Qt&&se.render(b),Le(A,b,V)}Q!==null&&D===0&&(et.updateMultisampleRenderTarget(Q),et.updateRenderTargetMipmap(Q)),K&&E.end(N),b.isScene===!0&&b.onAfterRender(N,b,V),Ut.resetDefaultState(),X=-1,q=null,_.pop(),_.length>0?(S=_[_.length-1],et.setTextureUnits(S.state.textureUnits),mt===!0&&Nt.setGlobalState(N.clippingPlanes,S.state.camera)):S=null,I.pop(),I.length>0?A=I[I.length-1]:A=null,k!==null&&k.renderEnd()};function cs(b,V,$,K){if(b.visible===!1)return;if(b.layers.test(V.layers)){if(b.isGroup)$=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(V);else if(b.isLightProbeGrid)S.pushLightProbeGrid(b);else if(b.isLight)S.pushLight(b),b.castShadow&&S.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||b.intersectsFrustum(ht)){K&&jt.setFromMatrixPosition(b.matrixWorld).applyMatrix4(gt);let wt=ut.update(b),It=b.material;It.visible&&A.push(b,wt,It,$,jt.z,null,V)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||b.intersectsFrustum(ht))){let wt=ut.update(b),It=b.material;if(K&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),jt.copy(b.boundingSphere.center)):(wt.boundingSphere===null&&wt.computeBoundingSphere(),jt.copy(wt.boundingSphere.center)),jt.applyMatrix4(b.matrixWorld).applyMatrix4(gt)),Array.isArray(It)){let zt=wt.groups;for(let xt=0,Zt=zt.length;xt<Zt;xt++){let Yt=zt[xt],kt=It[Yt.materialIndex];kt&&kt.visible&&A.push(b,wt,kt,$,jt.z,Yt,V)}}else It.visible&&A.push(b,wt,It,$,jt.z,null,V)}}let Dt=b.children;for(let wt=0,It=Dt.length;wt<It;wt++)cs(Dt[wt],V,$,K)}function Le(b,V,$,K){let{opaque:J,transmissive:Dt,transparent:wt}=b;S.setupLightsView($),mt===!0&&Nt.setGlobalState(N.clippingPlanes,$),K&&x.viewport(tt.copy(K)),J.length>0&&Zn(J,V,$),Dt.length>0&&Zn(Dt,V,$),wt.length>0&&Zn(wt,V,$),x.buffers.depth.setTest(!0),x.buffers.depth.setMask(!0),x.buffers.color.setMask(!0),x.setPolygonOffset(!1)}function cn(b,V,$,K){if(($.isScene===!0?$.overrideMaterial:null)!==null)return;if(S.state.transmissionRenderTarget[K.id]===void 0){let kt=ae.has("EXT_color_buffer_half_float")||ae.has("EXT_color_buffer_float");S.state.transmissionRenderTarget[K.id]=new _n(1,1,{generateMipmaps:!0,type:kt?$n:yn,minFilter:Bi,samples:Math.max(4,C.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:pe.workingColorSpace})}let Dt=S.state.transmissionRenderTarget[K.id],wt=K.viewport||tt;Dt.setSize(wt.z*N.transmissionResolutionScale,wt.w*N.transmissionResolutionScale);let It=N.getRenderTarget(),zt=N.getActiveCubeFace(),xt=N.getActiveMipmapLevel();N.setRenderTarget(Dt),N.getClearColor(Kt),Ct=N.getClearAlpha(),Ct<1&&N.setClearColor(16777215,.5),N.clear(),Qt&&se.render($);let Zt=N.toneMapping;N.toneMapping=Xn;let Yt=K.viewport;if(K.viewport!==void 0&&(K.viewport=void 0),S.setupLightsView(K),mt===!0&&Nt.setGlobalState(N.clippingPlanes,K),Zn(b,$,K),et.updateMultisampleRenderTarget(Dt),et.updateRenderTargetMipmap(Dt),ae.has("WEBGL_multisampled_render_to_texture")===!1){let kt=!1;for(let me=0,Re=V.length;me<Re;me++){let Ae=V[me],{object:de,geometry:ge,material:Mt,group:ze}=Ae;if(Mt.side===ii&&de.layers.test(K.layers)){let he=Mt.side;Mt.side=Ke,Mt.needsUpdate=!0,Xi(de,$,K,ge,Mt,ze),Mt.side=he,Mt.needsUpdate=!0,kt=!0}}kt===!0&&(et.updateMultisampleRenderTarget(Dt),et.updateRenderTargetMipmap(Dt))}N.setRenderTarget(It,zt,xt),N.setClearColor(Kt,Ct),Yt!==void 0&&(K.viewport=Yt),N.toneMapping=Zt}function Zn(b,V,$){let K=V.isScene===!0?V.overrideMaterial:null;for(let J=0,Dt=b.length;J<Dt;J++){let wt=b[J],{object:It,geometry:zt,group:xt}=wt,Zt=wt.material;Zt.allowOverride===!0&&K!==null&&(Zt=K),It.layers.test($.layers)&&Xi(It,V,$,zt,Zt,xt)}}function Xi(b,V,$,K,J,Dt){k!==null&&J.isNodeMaterial&&k.setObject(b,J),b.onBeforeRender(N,V,$,K,J,Dt),b.modelViewMatrix.multiplyMatrices($.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),J.onBeforeRender(N,V,$,K,b,Dt),J.transparent===!0&&J.side===ii&&J.forceSinglePass===!1?(J.side=Ke,J.needsUpdate=!0,N.renderBufferDirect($,V,K,J,b,Dt),J.side=Fi,J.needsUpdate=!0,N.renderBufferDirect($,V,K,J,b,Dt),J.side=ii):N.renderBufferDirect($,V,K,J,b,Dt),b.onAfterRender(N,V,$,K,J,Dt)}function ce(b,V,$){V.isScene!==!0&&(V=$t);let K=Z.get(b),J=S.state.lights,Dt=S.state.shadowsArray,wt=J.state.version,It=At.getParameters(b,J.state,Dt,V,$,S.state.lightProbeGridArray),zt=At.getProgramCacheKey(It),xt=K.programs;K.environment=b.isMeshStandardMaterial||b.isMeshLambertMaterial||b.isMeshPhongMaterial?V.environment:null,K.fog=V.fog;let Zt=b.isMeshStandardMaterial||b.isMeshLambertMaterial&&!b.envMap||b.isMeshPhongMaterial&&!b.envMap;K.envMap=yt.get(b.envMap||K.environment,Zt),K.envMapRotation=K.environment!==null&&b.envMap===null?V.environmentRotation:b.envMapRotation,xt===void 0&&(b.addEventListener("dispose",Rn),xt=new Map,K.programs=xt);let Yt=xt.get(zt);if(Yt!==void 0){if(K.currentProgram===Yt&&K.lightsStateVersion===wt)return vn(b,It),Yt}else It.uniforms=At.getUniforms(b),k!==null&&b.isNodeMaterial&&k.build(b,$,It),b.onBeforeCompile(It,N),Yt=At.acquireProgram(It,zt),xt.set(zt,Yt),K.uniforms=It.uniforms;let kt=K.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(kt.clippingPlanes=Nt.uniform),vn(b,It),K.needsLights=xe(b),K.lightsStateVersion=wt,K.needsLights&&(kt.ambientLightColor.value=J.state.ambient,kt.lightProbe.value=J.state.probe,kt.sunLights.value=J.state.sun,kt.sunLightShadows.value=J.state.sunShadow,kt.directionalLights.value=J.state.directional,kt.directionalLightShadows.value=J.state.directionalShadow,kt.spotLights.value=J.state.spot,kt.spotLightShadows.value=J.state.spotShadow,kt.rectAreaLights.value=J.state.rectArea,kt.ltc_1.value=J.state.rectAreaLTC1,kt.ltc_2.value=J.state.rectAreaLTC2,kt.pointLights.value=J.state.point,kt.pointLightShadows.value=J.state.pointShadow,kt.hemisphereLights.value=J.state.hemi,kt.sunShadowMatrix.value=J.state.sunShadowMatrix,kt.sunShadowCascade.value=J.state.sunShadowCascade,kt.directionalShadowMatrix.value=J.state.directionalShadowMatrix,kt.spotLightMatrix.value=J.state.spotLightMatrix,kt.spotLightMap.value=J.state.spotLightMap,kt.pointShadowMatrix.value=J.state.pointShadowMatrix),K.lightProbeGrid=S.state.lightProbeGridArray.length>0,K.currentProgram=Yt,K.uniformsList=null,Yt}function Qe(b){if(b.uniformsList===null){let V=b.currentProgram.getUniforms();b.uniformsList=Ys.seqWithValue(V.seq,b.uniforms)}return b.uniformsList}function vn(b,V){let $=Z.get(b);$.outputColorSpace=V.outputColorSpace,$.batching=V.batching,$.batchingColor=V.batchingColor,$.instancing=V.instancing,$.instancingColor=V.instancingColor,$.instancingMorph=V.instancingMorph,$.skinning=V.skinning,$.morphTargets=V.morphTargets,$.morphNormals=V.morphNormals,$.morphColors=V.morphColors,$.morphTargetsCount=V.morphTargetsCount,$.numClippingPlanes=V.numClippingPlanes,$.numIntersection=V.numClipIntersection,$.vertexAlphas=V.vertexAlphas,$.vertexTangents=V.vertexTangents,$.toneMapping=V.toneMapping}function hs(b,V){if(b.length===0)return null;if(b.length===1)return b[0].texture!==null?b[0]:null;M.setFromMatrixPosition(V.matrixWorld);for(let $=0,K=b.length;$<K;$++){let J=b[$];if(J.texture!==null&&J.boundingBox.containsPoint(M))return J}return null}function io(b,V,$,K,J){V.isScene!==!0&&(V=$t),et.resetTextureUnits();let Dt=V.fog,wt=K.isMeshStandardMaterial||K.isMeshLambertMaterial||K.isMeshPhongMaterial?V.environment:null,It=Q===null?N.outputColorSpace:Q.isXRRenderTarget===!0?Q.texture.colorSpace:pe.workingColorSpace,zt=K.isMeshStandardMaterial||K.isMeshLambertMaterial&&!K.envMap||K.isMeshPhongMaterial&&!K.envMap,xt=yt.get(K.envMap||wt,zt),Zt=K.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,Yt=!!$.attributes.tangent&&(!!K.normalMap||K.anisotropy>0),kt=!!$.morphAttributes.position,me=!!$.morphAttributes.normal,Re=!!$.morphAttributes.color,Ae=Xn;K.toneMapped&&(Q===null||Q.isXRRenderTarget===!0)&&(Ae=N.toneMapping);let de=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,ge=de!==void 0?de.length:0,Mt=Z.get(K),ze=S.state.lights;if(mt===!0&&(_t===!0||b!==q)){let Me=b===q&&K.id===X;Nt.setState(K,b,Me)}let he=!1;K.version===Mt.__version?(Mt.needsLights&&Mt.lightsStateVersion!==ze.state.version||Mt.outputColorSpace!==It||J.isBatchedMesh&&Mt.batching===!1||!J.isBatchedMesh&&Mt.batching===!0||J.isBatchedMesh&&Mt.batchingColor===!0&&J._colorsTexture===null||J.isBatchedMesh&&Mt.batchingColor===!1&&J._colorsTexture!==null||J.isInstancedMesh&&Mt.instancing===!1||!J.isInstancedMesh&&Mt.instancing===!0||J.isSkinnedMesh&&Mt.skinning===!1||!J.isSkinnedMesh&&Mt.skinning===!0||J.isInstancedMesh&&Mt.instancingColor===!0&&J.instanceColor===null||J.isInstancedMesh&&Mt.instancingColor===!1&&J.instanceColor!==null||J.isInstancedMesh&&Mt.instancingMorph===!0&&J.morphTexture===null||J.isInstancedMesh&&Mt.instancingMorph===!1&&J.morphTexture!==null||Mt.envMap!==xt||K.fog===!0&&Mt.fog!==Dt||Mt.numClippingPlanes!==void 0&&(Mt.numClippingPlanes!==Nt.numPlanes||Mt.numIntersection!==Nt.numIntersection)||Mt.vertexAlphas!==Zt||Mt.vertexTangents!==Yt||Mt.morphTargets!==kt||Mt.morphNormals!==me||Mt.morphColors!==Re||Mt.toneMapping!==Ae||Mt.morphTargetsCount!==ge||!!Mt.lightProbeGrid!=S.state.lightProbeGridArray.length>0)&&(he=!0):(he=!0,Mt.__version=K.version);let tn=Mt.currentProgram;he===!0&&(tn=ce(K,V,J),k&&K.isNodeMaterial&&k.onUpdateProgram(K,tn,Mt));let Mn=!1,Bn=!1,be=!1,_e=tn.getUniforms(),Ie=Mt.uniforms;if(x.useProgram(tn.program)&&(Mn=!0,Bn=!0,be=!0),K.id!==X&&(X=K.id,Bn=!0),Mt.needsLights){let Me=hs(S.state.lightProbeGridArray,J);Mt.lightProbeGrid!==Me&&(Mt.lightProbeGrid=Me,Bn=!0)}if(Mn||q!==b){x.buffers.depth.getReversed()&&b.reversedDepth!==!0&&(b._reversedDepth=!0,b.updateProjectionMatrix()),_e.setValue(L,"projectionMatrix",b.projectionMatrix),_e.setValue(L,"viewMatrix",b.matrixWorldInverse);let In=_e.map.cameraPosition;In!==void 0&&In.setValue(L,Tt.setFromMatrixPosition(b.matrixWorld)),C.logarithmicDepthBuffer&&_e.setValue(L,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(K.isMeshPhongMaterial||K.isMeshToonMaterial||K.isMeshLambertMaterial||K.isMeshBasicMaterial||K.isMeshStandardMaterial||K.isShaderMaterial)&&_e.setValue(L,"isOrthographic",b.isOrthographicCamera===!0),q!==b&&(q=b,Bn=!0,be=!0)}if(Mt.needsLights&&(ze.state.sunShadowMap.length>0&&_e.setValue(L,"sunShadowMap",ze.state.sunShadowMap,et),ze.state.directionalShadowMap.length>0&&_e.setValue(L,"directionalShadowMap",ze.state.directionalShadowMap,et),ze.state.spotShadowMap.length>0&&_e.setValue(L,"spotShadowMap",ze.state.spotShadowMap,et),ze.state.pointShadowMap.length>0&&_e.setValue(L,"pointShadowMap",ze.state.pointShadowMap,et)),J.isSkinnedMesh){_e.setOptional(L,J,"bindMatrix"),_e.setOptional(L,J,"bindMatrixInverse");let Me=J.skeleton;Me&&(Me.boneTexture===null&&Me.computeBoneTexture(),_e.setValue(L,"boneTexture",Me.boneTexture,et))}J.isBatchedMesh&&(_e.setOptional(L,J,"batchingTexture"),_e.setValue(L,"batchingTexture",J._matricesTexture,et),_e.setOptional(L,J,"batchingIdTexture"),_e.setValue(L,"batchingIdTexture",J._indirectTexture,et),_e.setOptional(L,J,"batchingColorTexture"),J._colorsTexture!==null&&_e.setValue(L,"batchingColorTexture",J._colorsTexture,et));let zn=$.morphAttributes;if((zn.position!==void 0||zn.normal!==void 0||zn.color!==void 0)&&F.update(J,$,tn),(Bn||Mt.receiveShadow!==J.receiveShadow)&&(Mt.receiveShadow=J.receiveShadow,_e.setValue(L,"receiveShadow",J.receiveShadow)),(K.isMeshStandardMaterial||K.isMeshLambertMaterial||K.isMeshPhongMaterial)&&K.envMap===null&&V.environment!==null&&(Ie.envMapIntensity.value=V.environmentIntensity),Ie.dfgLUT!==void 0&&(Ie.dfgLUT.value=x_()),Bn){if(_e.setValue(L,"toneMappingExposure",N.toneMappingExposure),Mt.needsLights&&so(Ie,be),Dt&&K.fog===!0&&Xt.refreshFogUniforms(Ie,Dt),Xt.refreshMaterialUniforms(Ie,K,at,nt,S.state.transmissionRenderTarget[b.id]),Mt.needsLights&&Mt.lightProbeGrid){let Me=Mt.lightProbeGrid;Ie.probesSH.value=Me.texture,Ie.probesMin.value.copy(Me.boundingBox.min),Ie.probesMax.value.copy(Me.boundingBox.max),Ie.probesResolution.value.copy(Me.resolution)}Ys.upload(L,Qe(Mt),Ie,et)}if(K.isShaderMaterial&&K.uniformsNeedUpdate===!0&&(Ys.upload(L,Qe(Mt),Ie,et),K.uniformsNeedUpdate=!1),K.isSpriteMaterial&&_e.setValue(L,"center",J.center),_e.setValue(L,"modelViewMatrix",J.modelViewMatrix),_e.setValue(L,"normalMatrix",J.normalMatrix),_e.setValue(L,"modelMatrix",J.matrixWorld),K.uniformsGroups!==void 0){let Me=K.uniformsGroups;for(let In=0,Fe=Me.length;In<Fe;In++){let fn=Me[In];ft.update(fn,tn),ft.bind(fn,tn)}}return tn}function so(b,V){b.ambientLightColor.needsUpdate=V,b.lightProbe.needsUpdate=V,b.sunLights.needsUpdate=V,b.sunLightShadows.needsUpdate=V,b.directionalLights.needsUpdate=V,b.directionalLightShadows.needsUpdate=V,b.pointLights.needsUpdate=V,b.pointLightShadows.needsUpdate=V,b.spotLights.needsUpdate=V,b.spotLightShadows.needsUpdate=V,b.rectAreaLights.needsUpdate=V,b.hemisphereLights.needsUpdate=V}function xe(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return Y},this.getActiveMipmapLevel=function(){return D},this.getRenderTarget=function(){return Q},this.setRenderTargetTextures=function(b,V,$){let K=Z.get(b);K.__autoAllocateDepthBuffer=b.resolveDepthBuffer===!1,K.__autoAllocateDepthBuffer===!1&&(K.__useRenderToTexture=!1),Z.get(b.texture).__webglTexture=V,Z.get(b.depthTexture).__webglTexture=K.__autoAllocateDepthBuffer?void 0:$,K.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(b,V){let $=Z.get(b);$.__webglFramebuffer=V,$.__useDefaultFramebuffer=V===void 0},this.setRenderTarget=function(b,V=0,$=0){Q=b,Y=V,D=$;let K=null,J=!1,Dt=!1;if(b){let It=Z.get(b);if(It.__useDefaultFramebuffer!==void 0){x.bindFramebuffer(L.FRAMEBUFFER,It.__webglFramebuffer),tt.copy(b.viewport),pt.copy(b.scissor),lt=b.scissorTest,x.viewport(tt),x.scissor(pt),x.setScissorTest(lt),X=-1;return}else if(It.__webglFramebuffer===void 0)et.setupRenderTarget(b);else if(It.__hasExternalTextures)et.rebindTextures(b,Z.get(b.texture).__webglTexture,Z.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){let Zt=b.depthTexture;if(It.__boundDepthTexture!==Zt){if(Zt!==null&&Z.has(Zt)&&(b.width!==Zt.image.width||b.height!==Zt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");et.setupDepthRenderbuffer(b)}}let zt=b.texture;(zt.isData3DTexture||zt.isDataArrayTexture||zt.isCompressedArrayTexture)&&(Dt=!0);let xt=Z.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(xt[V])?K=xt[V][$]:K=xt[V],J=!0):b.samples>0&&et.useMultisampledRTT(b)===!1?K=Z.get(b).__webglMultisampledFramebuffer:Array.isArray(xt)?K=xt[$]:K=xt,tt.copy(b.viewport),pt.copy(b.scissor),lt=b.scissorTest}else tt.copy(dt).multiplyScalar(at).floor(),pt.copy(Bt).multiplyScalar(at).floor(),lt=ye;if($!==0&&(K=W),x.bindFramebuffer(L.FRAMEBUFFER,K)&&x.drawBuffers(b,K),x.viewport(tt),x.scissor(pt),x.setScissorTest(lt),J){let It=Z.get(b.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+V,It.__webglTexture,$)}else if(Dt){let It=V;for(let zt=0;zt<b.textures.length;zt++){let xt=Z.get(b.textures[zt]);L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0+zt,xt.__webglTexture,$,It)}}else if(b!==null&&$!==0){let It=Z.get(b.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,It.__webglTexture,$)}X=-1};function bn(b){let V=Z.get(b);return(V.__readFormat!==b.format||V.__readType!==b.type)&&(V.__readFormat=b.format,V.__readType=b.type,V.__formatReadable=C.textureFormatReadable(b.format),V.__typeReadable=C.textureTypeReadable(b.type)),V}this.readRenderTargetPixels=function(b,V,$,K,J,Dt,wt,It=0){if(!(b&&b.isWebGLRenderTarget)){ne("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let zt=Z.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&wt!==void 0&&(zt=zt[wt]),zt){x.bindFramebuffer(L.FRAMEBUFFER,zt);try{let xt=b.textures[It],Zt=xt.format,Yt=xt.type;b.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+It);let kt=bn(xt);if(kt.__formatReadable===!1){ne("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(kt.__typeReadable===!1){ne("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}V>=0&&V<=b.width-K&&$>=0&&$<=b.height-J&&L.readPixels(V,$,K,J,Rt.convert(Zt),Rt.convert(Yt),Dt)}finally{let xt=Q!==null?Z.get(Q).__webglFramebuffer:null;x.bindFramebuffer(L.FRAMEBUFFER,xt)}}},this.readRenderTargetPixelsAsync=async function(b,V,$,K,J,Dt,wt,It=0){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let zt=Z.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&wt!==void 0&&(zt=zt[wt]),zt)if(V>=0&&V<=b.width-K&&$>=0&&$<=b.height-J){x.bindFramebuffer(L.FRAMEBUFFER,zt);let xt=b.textures[It],Zt=xt.format,Yt=xt.type;b.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+It);let kt=bn(xt);if(kt.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(kt.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let me=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,me),L.bufferData(L.PIXEL_PACK_BUFFER,Dt.byteLength,L.STREAM_READ),L.readPixels(V,$,K,J,Rt.convert(Zt),Rt.convert(Yt),0),L.bindBuffer(L.PIXEL_PACK_BUFFER,null);let Re=Q!==null?Z.get(Q).__webglFramebuffer:null;x.bindFramebuffer(L.FRAMEBUFFER,Re);let Ae=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),await ju(L,Ae,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,me),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,Dt),L.bindBuffer(L.PIXEL_PACK_BUFFER,null),L.deleteBuffer(me),L.deleteSync(Ae),Dt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(b,V=null,$=0){let K=Math.pow(2,-$),J=Math.floor(b.image.width*K),Dt=Math.floor(b.image.height*K),wt=V!==null?V.x:0,It=V!==null?V.y:0;et.setTexture2D(b,0),L.copyTexSubImage2D(L.TEXTURE_2D,$,0,0,wt,It,J,Dt),x.unbindTexture()},this.copyTextureToTexture=function(b,V,$=null,K=null,J=0,Dt=0){let wt,It,zt,xt,Zt,Yt,kt,me,Re,Ae=b.isCompressedTexture?b.mipmaps[Dt]:b.image;if($!==null)wt=$.max.x-$.min.x,It=$.max.y-$.min.y,zt=$.isBox3?$.max.z-$.min.z:1,xt=$.min.x,Zt=$.min.y,Yt=$.isBox3?$.min.z:0;else{let Ie=Math.pow(2,-J);wt=Math.floor(Ae.width*Ie),It=Math.floor(Ae.height*Ie),b.isDataArrayTexture?zt=Ae.depth:b.isData3DTexture?zt=Math.floor(Ae.depth*Ie):zt=1,xt=0,Zt=0,Yt=0}K!==null?(kt=K.x,me=K.y,Re=K.z):(kt=0,me=0,Re=0);let de=Rt.convert(V.format),ge=Rt.convert(V.type),Mt;V.isData3DTexture?(et.setTexture3D(V,0),Mt=L.TEXTURE_3D):V.isDataArrayTexture||V.isCompressedArrayTexture?(et.setTexture2DArray(V,0),Mt=L.TEXTURE_2D_ARRAY):(et.setTexture2D(V,0),Mt=L.TEXTURE_2D),x.activeTexture(L.TEXTURE0),x.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,V.flipY),x.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,V.premultiplyAlpha),x.pixelStorei(L.UNPACK_ALIGNMENT,V.unpackAlignment);let ze=x.getParameter(L.UNPACK_ROW_LENGTH),he=x.getParameter(L.UNPACK_IMAGE_HEIGHT),tn=x.getParameter(L.UNPACK_SKIP_PIXELS),Mn=x.getParameter(L.UNPACK_SKIP_ROWS),Bn=x.getParameter(L.UNPACK_SKIP_IMAGES);x.pixelStorei(L.UNPACK_ROW_LENGTH,Ae.width),x.pixelStorei(L.UNPACK_IMAGE_HEIGHT,Ae.height),x.pixelStorei(L.UNPACK_SKIP_PIXELS,xt),x.pixelStorei(L.UNPACK_SKIP_ROWS,Zt),x.pixelStorei(L.UNPACK_SKIP_IMAGES,Yt);let be=b.isDataArrayTexture||b.isData3DTexture,_e=V.isDataArrayTexture||V.isData3DTexture;if(b.isDepthTexture){let Ie=Z.get(b),zn=Z.get(V),Me=Z.get(Ie.__renderTarget),In=Z.get(zn.__renderTarget);x.bindFramebuffer(L.READ_FRAMEBUFFER,Me.__webglFramebuffer),x.bindFramebuffer(L.DRAW_FRAMEBUFFER,In.__webglFramebuffer);for(let Fe=0;Fe<zt;Fe++)be&&(L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,Z.get(b).__webglTexture,J,Yt+Fe),L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,Z.get(V).__webglTexture,Dt,Re+Fe)),L.blitFramebuffer(xt,Zt,wt,It,kt,me,wt,It,L.DEPTH_BUFFER_BIT,L.NEAREST);x.bindFramebuffer(L.READ_FRAMEBUFFER,null),x.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else if(J!==0||b.isRenderTargetTexture||Z.has(b)){let Ie=Z.get(b),zn=Z.get(V);x.bindFramebuffer(L.READ_FRAMEBUFFER,U),x.bindFramebuffer(L.DRAW_FRAMEBUFFER,B);for(let Me=0;Me<zt;Me++)be?L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,Ie.__webglTexture,J,Yt+Me):L.framebufferTexture2D(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,Ie.__webglTexture,J),_e?L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,zn.__webglTexture,Dt,Re+Me):L.framebufferTexture2D(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,zn.__webglTexture,Dt),J!==0?L.blitFramebuffer(xt,Zt,wt,It,kt,me,wt,It,L.COLOR_BUFFER_BIT,L.NEAREST):_e?L.copyTexSubImage3D(Mt,Dt,kt,me,Re+Me,xt,Zt,wt,It):L.copyTexSubImage2D(Mt,Dt,kt,me,xt,Zt,wt,It);x.bindFramebuffer(L.READ_FRAMEBUFFER,null),x.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else _e?b.isDataTexture||b.isData3DTexture?L.texSubImage3D(Mt,Dt,kt,me,Re,wt,It,zt,de,ge,Ae.data):V.isCompressedArrayTexture?L.compressedTexSubImage3D(Mt,Dt,kt,me,Re,wt,It,zt,de,Ae.data):L.texSubImage3D(Mt,Dt,kt,me,Re,wt,It,zt,de,ge,Ae):b.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,Dt,kt,me,wt,It,de,ge,Ae.data):b.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,Dt,kt,me,Ae.width,Ae.height,de,Ae.data):L.texSubImage2D(L.TEXTURE_2D,Dt,kt,me,wt,It,de,ge,Ae);x.pixelStorei(L.UNPACK_ROW_LENGTH,ze),x.pixelStorei(L.UNPACK_IMAGE_HEIGHT,he),x.pixelStorei(L.UNPACK_SKIP_PIXELS,tn),x.pixelStorei(L.UNPACK_SKIP_ROWS,Mn),x.pixelStorei(L.UNPACK_SKIP_IMAGES,Bn),Dt===0&&V.generateMipmaps&&L.generateMipmap(Mt),x.unbindTexture()},this.initRenderTarget=function(b){Z.get(b).__webglFramebuffer===void 0&&et.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?et.setTextureCube(b,0):b.isData3DTexture?et.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?et.setTexture2DArray(b,0):et.setTexture2D(b,0),x.unbindTexture()},this.resetState=function(){Y=0,D=0,Q=null,x.reset(),Ut.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Wn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=pe._getDrawingBufferColorSpace(t),e.unpackColorSpace=pe._getUnpackColorSpace()}};var Kr=new O;function Fn(i,t,e,n,s,r){let o=2*Math.PI*s/4,a=Math.max(r-2*s,0),c=Math.PI/4;Kr.copy(t),Kr[n]=0,Kr.normalize();let l=.5*o/(o+a),u=1-Kr.angleTo(i)/c;return Math.sign(Kr[e])===1?u*l:a/(o+a)+l+l*(1-u)}var Ml=class i extends Nn{constructor(t=1,e=1,n=1,s=2,r=.1){let o=s*2+1;if(r=Math.min(t/2,e/2,n/2,r),super(1,1,1,o,o,o),this.type="RoundedBoxGeometry",this.parameters={width:t,height:e,depth:n,segments:s,radius:r},o===1)return;let a=this.toNonIndexed();this.index=null,this.attributes.position=a.attributes.position,this.attributes.normal=a.attributes.normal,this.attributes.uv=a.attributes.uv;let c=new O,l=new O,u=new O(t,e,n).divideScalar(2).subScalar(r),f=this.attributes.position.array,h=this.attributes.normal.array,d=this.attributes.uv.array,g=f.length/6,v=new O,p=.5/o;for(let m=0,w=0;m<f.length;m+=3,w+=2)switch(c.fromArray(f,m),l.copy(c),l.x-=Math.sign(l.x)*p,l.y-=Math.sign(l.y)*p,l.z-=Math.sign(l.z)*p,l.normalize(),f[m+0]=u.x*Math.sign(c.x)+l.x*r,f[m+1]=u.y*Math.sign(c.y)+l.y*r,f[m+2]=u.z*Math.sign(c.z)+l.z*r,h[m+0]=l.x,h[m+1]=l.y,h[m+2]=l.z,Math.floor(m/g)){case 0:v.set(1,0,0),d[w+0]=Fn(v,l,"z","y",r,n),d[w+1]=1-Fn(v,l,"y","z",r,e);break;case 1:v.set(-1,0,0),d[w+0]=1-Fn(v,l,"z","y",r,n),d[w+1]=1-Fn(v,l,"y","z",r,e);break;case 2:v.set(0,1,0),d[w+0]=1-Fn(v,l,"x","z",r,t),d[w+1]=Fn(v,l,"z","x",r,n);break;case 3:v.set(0,-1,0),d[w+0]=1-Fn(v,l,"x","z",r,t),d[w+1]=1-Fn(v,l,"z","x",r,n);break;case 4:v.set(0,0,1),d[w+0]=1-Fn(v,l,"x","y",r,t),d[w+1]=1-Fn(v,l,"y","x",r,e);break;case 5:v.set(0,0,-1),d[w+0]=Fn(v,l,"x","y",r,t),d[w+1]=1-Fn(v,l,"y","x",r,e);break}}static fromJSON(t){return new i(t.width,t.height,t.depth,t.segments,t.radius)}};function Od(i,t=!1){let e=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},o={},a=i[0].morphTargetsRelative,c=new rn,l=0;for(let u=0;u<i.length;++u){let f=i[u],h=0;if(e!==(f.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let d in f.attributes){if(!n.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+'. All geometries must have compatible attributes; make sure "'+d+'" attribute exists among all geometries, or in none of them.'),null;r[d]===void 0&&(r[d]=[]),r[d].push(f.attributes[d]),h++}if(h!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". Make sure all geometries have the same number of attributes."),null;if(a!==f.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let d in f.morphAttributes){if(!s.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+".  .morphAttributes must be consistent throughout all geometries."),null;o[d]===void 0&&(o[d]=[]),o[d].push(f.morphAttributes[d])}if(t){let d;if(e)d=f.index.count;else if(f.attributes.position!==void 0)d=f.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,d,u),l+=d}}if(e){let u=0,f=[];for(let h=0;h<i.length;++h){let d=i[h].index;for(let g=0;g<d.count;++g)f.push(d.getX(g)+u);u+=i[h].attributes.position.count}c.setIndex(f)}for(let u in r){let f=Fd(r[u]);if(!f)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" attribute."),null;c.setAttribute(u,f)}for(let u in o){let f=o[u][0].length;if(f!==0){c.morphAttributes=c.morphAttributes||{},c.morphAttributes[u]=[];for(let h=0;h<f;++h){let d=[];for(let v=0;v<o[u].length;++v)d.push(o[u][v][h]);let g=Fd(d);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" morphAttribute."),null;c.morphAttributes[u].push(g)}}}return c}function Fd(i){let t,e,n,s=-1,r=0;for(let l=0;l<i.length;++l){let u=i[l];if(t===void 0&&(t=u.array.constructor),t!==u.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=u.itemSize),e!==u.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=u.normalized),n!==u.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=u.gpuType),s!==u.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=u.count*e}let o=new t(r),a=new gn(o,e,n),c=0;for(let l=0;l<i.length;++l){let u=i[l];if(u.isInterleavedBufferAttribute){let f=c/e;for(let h=0,d=u.count;h<d;h++)for(let g=0;g<e;g++){let v=u.getComponent(h,g);a.setComponent(h+f,g,v)}}else o.set(u.array,c);c+=u.count*e}return s!==void 0&&(a.gpuType=s),a}var Vi=.3,vi=.27,On=.014,Gi=.3,_h=9,bi=.15,yh=1.2,__=-.035,Sl=bi+On/2-.005-__,$b=4.02-Sl;function Bd(){let i=new $e;i.name="Brick-built stone keep";let t=[],e=new Map,s=["#55616a","#5c6870","#637078","#505c65","#6b757b","#5a666e","#626b71"].map(S=>new Pi({color:S,roughness:.42,metalness:.025})),r=["#79848a","#707c83","#65717a"].map(S=>new Pi({color:S,roughness:.43,metalness:.025})),o=new Pi({color:"#444f58",roughness:.48,metalness:.02}),a=1,c=0,l=new Dr([new vt(0,0),new vt(.078,0),new vt(.087,.008),new vt(.087,.048),new vt(.08,.055),new vt(0,.055)],16);function u(S){let I=Od(S.map(_=>_.index?_.toNonIndexed():_),!1);return I.computeBoundingSphere(),I}function f(S,I,_){return l.clone().applyMatrix4(new Ce().makeTranslation(S,I,_))}function h(S,I,_,E=!0){let N=[S,I,_,E].map(W=>typeof W=="number"?W.toFixed(4):W).join("/");if(e.has(N))return e.get(N);let P=[new Ml(S-On,I-On,_-On,2,.011)];if(E){let W=Math.max(1,Math.floor((S-.18)/Vi)+1),U=Math.max(1,Math.floor((_-.18)/Vi)+1);for(let B=0;B<W;B++)for(let Y=0;Y<U;Y++){let D=(B-(W-1)/2)*Vi,Q=(Y-(U-1)/2)*Vi;Math.abs(D)+.09<S/2&&Math.abs(Q)+.09<_/2&&P.push(f(D,(I-On)/2,Q))}}let k=u(P);return e.set(N,k),k}function d(S,{x:I=0,y:_=0,z:E=0,rotation:N=0,material:P,animate:k=!1,order:W,name:U="Masonry brick"}={}){let B=new $e;B.name=U,B.position.set(I,_,E),B.rotation.y=N;let Y=new Ne(S,P||s[(a*17+Math.floor(_*31))%s.length]);return Y.castShadow=!0,Y.receiveShadow=!0,B.add(Y),B.userData={brick:!0,index:a++,course:Math.floor((_-bi)/vi),restHeight:_},i.add(B),k&&t.push({object:B,order:W??_*100+a%23*.025}),B}function g(S,I,_,E,N,P,k){let W=E*Math.PI/2,U=yh-Gi/2;return d(S,{x:Math.cos(W)*I+Math.sin(W)*U,y:_,z:-Math.sin(W)*I+Math.cos(W)*U,rotation:W,material:N,animate:P,name:k})}let v=[[{bottom:bi-.03,spring:.96,radius:.45,top:1.41}],[{bottom:bi-.03,spring:.81,radius:.36,top:1.17}],[],[]];function p(S,I){return S.half?S.half:I<=S.spring?S.radius:Math.sqrt(Math.max(0,S.radius**2-(I-S.spring)**2))}function m(S,I,_){let E=[S],N=_%2?.3:0;for(let P=-1.8+N;P<I-.01;P+=.6)P>S+.08&&E.push(P);return E.push(I),E.slice(0,-1).map((P,k)=>[P,E[k+1]])}function w(S,I,_,E,N,P){let k=(S+I)/2,W=(_+E)/2,U=18,B=[],Y=0,D=S+On/2,Q=I-On/2,X=_+On/2,q=E-On/2;for(let Ct=0;Ct<=U;Ct++){let Jt=X+(q-X)*Ct/U,nt=P<0?Math.min(Q,-p(N,Jt)-.006):Math.max(D,p(N,Jt)+.006),at=P<0?Math.max(0,nt-D):Math.max(0,Q-nt);Y+=at,B.push({y:Jt,boundary:P<0?Math.max(D,nt):Math.min(Q,nt)})}if(Y<.025)return null;let tt=new ts;if(P<0){tt.moveTo(D-k,X-W);for(let Ct of B)tt.lineTo(Ct.boundary-k,Ct.y-W);tt.lineTo(D-k,q-W)}else{tt.moveTo(Q-k,X-W),tt.lineTo(Q-k,q-W);for(let Ct of B.slice().reverse())tt.lineTo(Ct.boundary-k,Ct.y-W)}tt.closePath();let pt=new Bs(tt,{depth:Gi-On-.012,bevelEnabled:!0,bevelThickness:.006,bevelSize:.005,bevelSegments:2,steps:1,curveSegments:10});pt.translate(0,0,-(Gi-On-.012)/2);let lt=[pt],Kt=B[B.length-1].boundary;for(let Ct=-1.05;Ct<1.2;Ct+=Vi)(P<0?Ct+.094<Kt:Ct-.094>Kt)&&Ct-.094>D&&Ct+.094<Q&&lt.push(f(Ct-k,q-W,0));return u(lt)}for(let S=0;S<_h;S++){let I=bi+S*vi,_=I+vi;for(let E=0;E<4;E++){let P=E%2===S%2?yh:yh-Gi,k=[I,_],W=v[E],U=!1;for(let B of W)for(let Y of[B.bottom,B.top])Y>I+.01&&Y<_-.01&&(B.radius?U=!0:k.push(Y));k.sort((B,Y)=>B-Y);for(let B=0;B<k.length-1;B++){let Y=k[B],D=k[B+1],Q=(Y+D)/2,X=W.find(q=>Q>q.bottom&&Q<q.top);for(let[q,tt]of m(-P,P,S+E)){let pt=(q+tt)/2,lt=!1;if(!X||tt<-p(X,Y)-.01||q>p(X,Y)+.01)g(h(tt-q,D-Y,Gi),pt,Q,E,null,lt,"Interlocking slate-grey wall brick");else for(let Kt of[-1,1]){let Ct=w(q,tt,Y,D,X,Kt);Ct&&g(Ct,pt,Q,E,null,lt,"Shaped masonry around an opening")}}}if(U){let B=m(-P,P,S+E).length;a+=B,c+=B}}}function R(S,I,_,E){for(let k=0;k<E;k++){let W=k*Math.PI/E+.012,U=(k+1)*Math.PI/E-.012,B=I+.135,Y=new ts;Y.absarc(0,0,B,W,U,!1),Y.absarc(0,0,I+.007,U,W,!0),Y.closePath();let D=new Bs(Y,{depth:Gi+.025,bevelEnabled:!0,bevelSize:.004,bevelThickness:.004,bevelSegments:2,curveSegments:6,steps:1});D.translate(0,0,-(Gi+.025)/2),g(D,0,_,S,r[k%r.length],!1,"Individual arch voussoir")}let N=_-bi,P=Math.ceil(N/vi);for(let k=0;k<P;k++){let W=N/P;for(let U of[-1,1])g(h(.132,W,Gi+.027,!1),U*(I+.071),bi+W*(k+.5),S,r[(k+S)%r.length],!1,"Arch jamb brick")}}R(0,.45,.96,7),R(1,.36,.81,7);let M=new Pi({color:"#757f84",roughness:.46,metalness:.02});d(h(6*Vi,vi/3,6*Vi),{y:bi+_h*vi-vi/6,material:M,name:"Deck"});for(let S of i.children)S.position.y-=Sl,S.userData.restHeight-=Sl;let A=new Map;i.updateMatrixWorld(!0);for(let S of i.children.slice())S.traverse(I=>{I.isMesh&&(A.has(I.material)||A.set(I.material,[]),A.get(I.material).push(I.geometry.clone().applyMatrix4(I.matrixWorld)))}),i.remove(S);for(let[S,I]of A){let _=new Ne(u(I),S);_.name="Fixed castle masonry",_.castShadow=!0,_.receiveShadow=!0,i.add(_),I.forEach(E=>E.dispose())}return{model:i,brickGeometry:h,stones:s,foundationTop:bi+_h*vi-Sl,pitch:Vi,course:vi,gap:On}}var jr=.016666666666666666;function vh(i,{pieces:t,grips:e,standing:n,shell:s,groundY:r,leans:o,random:a=Math.random,onImpact:c=null,impulse:l=null}){let u=new i.World({gravity:new i.Vec3(0,-26,0),allowSleep:!0});u.broadphase=new i.SAPBroadphase(u),u.solver.iterations=18,u.defaultContactMaterial.friction=.55,u.defaultContactMaterial.restitution=.18;let f=D=>u.addBody(new i.Body({mass:0,shape:new i.Box(new i.Vec3(D.hx,D.hy,D.hz)),position:new i.Vec3(D.x,D.y,D.z)}));s.forEach(f),n.forEach(f);let h=new i.Body({mass:0,shape:new i.Plane,position:new i.Vec3(0,r,0)});h.quaternion.setFromAxisAngle(new i.Vec3(1,0,0),-Math.PI/2),u.addBody(h);let d=t.map(D=>new i.Quaternion().setFromAxisAngle(new i.Vec3(0,1,0),D.rotY)),g=D=>D.hx*D.hy*D.hz,v=new Set,p=new Map,m=0,w=e.map(D=>D.studs+a()*1.5);function R(D,Q,X,q,tt,pt,lt){let Kt=0,Ct=new i.Vec3;for(let bt of D){let Vt=g(t[bt]),dt=Q(bt);Kt+=Vt,Ct.x+=dt.x*Vt,Ct.y+=dt.y*Vt,Ct.z+=dt.z*Vt}Ct.scale(1/Kt,Ct);let Jt=new i.Body({mass:8*Kt*20,position:X.vadd(q.vmult(Ct)),quaternion:q.clone(),velocity:tt(q.vmult(Ct)),angularVelocity:pt.clone(),allowSleep:m>=1.2,sleepSpeedLimit:.6,sleepTimeLimit:.25}),nt=new Map;for(let bt of D){let Vt=t[bt],dt=Q(bt).vsub(Ct);nt.set(bt,dt),Jt.addShape(new i.Box(new i.Vec3(Vt.hx,Vt.hy,Vt.hz)),dt)}let at={body:Jt,members:D,offsets:nt,level:lt,from:Jt.position.clone()};return Jt.addEventListener("collide",bt=>{let Vt=Math.abs(bt.contact.getImpactVelocityAlongNormal());c&&Vt>1&&(!bt.body||bt.body.mass===0||Jt.id<bt.body.id)&&c(Vt),!(D.length<2)&&Vt>1.6&&p.set(at,Math.max(p.get(at)||0,Vt))}),u.addBody(Jt),v.add(at),at}function M(D,Q){let X=new Map(D.map(pt=>[pt,pt])),q=pt=>X.get(pt)===pt?pt:(X.set(pt,q(X.get(pt))),X.get(pt));e.forEach((pt,lt)=>{w[lt]>Q&&X.has(pt.a)&&X.has(pt.b)&&X.set(q(pt.a),q(pt.b))});let tt=new Map;for(let pt of D){let lt=q(pt);tt.has(lt)||tt.set(lt,[]),tt.get(lt).push(pt)}return[...tt.values()]}function A(D,Q){D.level+=Q*.75;let X=M(D.members,D.level);if(X.length<2)return;let{body:q,offsets:tt,level:pt}=D;u.removeBody(q),v.delete(D);let lt=Ct=>{let Jt=q.velocity.vadd(q.angularVelocity.cross(Ct)),nt=Math.hypot(Ct.x,Ct.y,Ct.z)||1;return Jt.vadd(new i.Vec3(Ct.x/nt*.9,Math.abs(Ct.y)/nt*.9*.5,Ct.z/nt*.9))},Kt=()=>(a()-.5)*2.2;for(let Ct of X)R(Ct,Jt=>tt.get(Jt),q.position,q.quaternion,lt,q.angularVelocity.vadd(new i.Vec3(Kt(),Kt(),Kt())),pt)}let S=new i.Quaternion,I=new i.Vec3,_=new i.Vec3;for(let D of M(t.map((Q,X)=>X),l?1.5:0)){let Q=R(D,q=>new i.Vec3(t[q].x,t[q].y,t[q].z),I,S,()=>_.clone(),_,l?1.5:0),X=o.find(q=>D.includes(q.piece));if(X){let q=Q.body.position.x-X.x,tt=Q.body.position.z-X.z,pt=Math.hypot(q,tt)||1;Q.body.angularVelocity.set(tt/pt*.55,0,-q/pt*.55)}else if(l){let q=()=>(a()-.5)*.6;Q.body.velocity.set(l.vx+q(),l.vy+a()*.5,l.vz+q()),Q.body.angularVelocity.set(l.spinX+q(),q(),l.spinZ+q())}}function E(D){let{body:Q}=D;if(D.members.length>1){let pt=v.size;if(A(D,9),v.size!==pt||!v.has(D))return}let X=Q.position.x,q=Q.position.z,tt=Math.hypot(X,q)||1;Q.velocity.set(X/tt*1.6,1,q/tt*1.6),Q.angularVelocity.set(q/tt*3,0,-X/tt*3)}let N=new i.Vec3,P=new i.Quaternion;function k(){for(let{body:D,members:Q,offsets:X}of v)for(let q of Q){D.quaternion.vmult(X.get(q),N);let tt=t[q].object;tt.position.set(D.position.x+N.x,D.position.y+N.y,D.position.z+N.z),D.quaternion.mult(d[q],P),tt.quaternion.set(P.x,P.y,P.z,P.w)}}function W(){if(u.step(jr),m+=jr,m>=1.2)for(let{body:D}of v)D.allowSleep=!0;for(let{body:D}of v){let Q=D.velocity.length(),X=D.angularVelocity.length();Q>15&&D.velocity.scale(15/Q,D.velocity),X>12&&D.angularVelocity.scale(12/X,D.angularVelocity)}if(!B&&m>=.7){B=!0;for(let D of[...v])D.body.position.distanceTo(D.from)<.08&&E(D)}for(let[D,Q]of p)v.has(D)&&A(D,Q);p.clear()}let U=0,B=!1,Y=()=>m>5||m>1.2+.25&&[...v].every(D=>D.body.sleepState===i.Body.SLEEPING);return{advance(D){U+=D;for(let Q=0;U>=jr&&Q<3;Q++)W(),U-=jr;U=Math.min(U,jr),k()},advanceBudget(D=16,Q=40){let X=performance.now(),q=0;for(;!Y()&&q<Q&&(q===0||performance.now()-X<D);)W(),q++;Y()&&k()},finish(){for(;!Y();)W();k()},get settled(){return Y()},get time(){return m},get clumps(){return v.size}}}function zd(){let i=window.AudioContext||window.webkitAudioContext,t=null,e=null,n=null,s=!0,r=0,o=0;function a(){if(!s||!i)return null;try{if(!t){t=new i,e=t.createGain(),e.gain.value=s?1:0,e.connect(t.destination);let f=Math.floor(t.sampleRate*.14);n=t.createBuffer(1,f,t.sampleRate);let h=n.getChannelData(0);for(let d=0;d<f;d++)h[d]=Math.random()*2-1}return(t.state==="suspended"||t.state==="interrupted")&&t.resume().catch(()=>{}),t.state==="closed"?null:t}catch{return null}}function c(f,h,d,g,v,p=0){let m=a();if(!m||!e)return;let w=m.currentTime+p,R=m.createOscillator(),M=m.createGain();R.type=g,R.frequency.setValueAtTime(f,w),h!==f&&R.frequency.exponentialRampToValueAtTime(Math.max(20,h),w+d),M.gain.setValueAtTime(1e-4,w),M.gain.linearRampToValueAtTime(v,w+.004),M.gain.exponentialRampToValueAtTime(1e-4,w+d),R.connect(M),M.connect(e),R.onended=()=>{R.disconnect(),M.disconnect()},R.start(w),R.stop(w+d+.01)}function l(f,h,d,g,v=0,p="bandpass"){let m=a();if(!m||!e||!n)return;let w=m.currentTime+v,R=m.createBufferSource();R.buffer=n;let M=m.createBiquadFilter();M.type=p,M.frequency.setValueAtTime(f,w),M.Q.setValueAtTime(h,w);let A=m.createGain();A.gain.setValueAtTime(1e-4,w),A.gain.linearRampToValueAtTime(g,w+.003),A.gain.exponentialRampToValueAtTime(1e-4,w+d),R.connect(M),M.connect(A),A.connect(e),R.onended=()=>{R.disconnect(),M.disconnect(),A.disconnect()},R.start(w),R.stop(w+Math.min(d+.01,n.duration))}let u=[293.66,329.63,392,440,523.25,587.33,659.25,783.99];return{get enabled(){return s},set enabled(f){s=!!f,e&&t&&t.state!=="closed"&&e.gain.setValueAtTime(s?1:0,t.currentTime)},unlock(){a()},snap(f=0,h=2){let d=Math.min(u.length-1,Math.floor(Math.max(0,f)/3)),g=u[d]*(.98+Math.random()*.04);l(2500+d*140,2.2,.022,.14),c(g*1.15,g*.72,.048,"triangle",.13),h>=4&&c(155,95,.045,"sine",.09)},pick(){c(620,480,.022,"triangle",.055)},rotate(){c(500,620,.025,"triangle",.065),c(680,740,.02,"sine",.045,.022)},turn(){l(900,1.4,.085,.06,0,"bandpass")},undo(){c(440,320,.055,"triangle",.08),c(320,240,.06,"sine",.06,.045)},creak(){let f=performance.now();f-o<260||(o=f,c(190,132,.14,"sawtooth",.045),l(650,3,.09,.05))},clatter(f=3){let h=performance.now();if(h-r<65)return;r=h;let d=Math.min(1,Math.max(.2,f/9)),g=280+Math.random()*260;l(1800+Math.random()*1400,2.5,.032,.12*d),c(g,g*.68,.04,"triangle",.09*d)},milestone(){c(523.25,523.25,.14,"triangle",.1),c(783.99,783.99,.22,"triangle",.11,.09)},celebrate(){[523.25,659.25,783.99,1046.5].forEach((h,d)=>{c(h,h,.28,"triangle",.1,d*.085),c(h*2,h*2,.16,"sine",.03,d*.085)})},close(){t&&t.state!=="closed"&&t.close().catch(()=>{}),t=null,e=null,n=null}}}function y_(){let i=[],t=(e,n,s,r,o)=>i.push({type:e,i:n,j:s,rot:r,level:o});for(let[e,n]of[[-4,-4],[3,-4],[-4,3],[3,3]])t("b1x1",e,n,0,0);t("b1x2",-3,3,0,0),t("b1x2",1,3,0,0),t("b1x2",3,-3,1,0),t("b1x2",3,1,1,0);for(let e of[-3,-1,1])t("b1x2",e,-4,0,0);for(let e of[-3,-1,1])t("b1x2",-4,e,1,0);t("b1x2",-4,3,0,3),t("b1x4",-2,3,0,3),t("b1x2",2,3,0,3);for(let e of[-4,-2,0,2])t("b1x2",e,-4,0,3);for(let e of[-3,-1,1])t("b1x2",-4,e,1,3);t("b1x1",3,-3,0,3),t("b1x4",3,-2,1,3),t("b1x1",3,2,0,3);for(let e of[-5,-1])t("p2x4",e,3,0,6);for(let e of[-3,1])t("p2x4",3,e,1,6);for(let e of[-3,1])t("p2x4",e,-5,0,6);for(let e of[-5,-1])t("p2x4",-5,e,1,6);for(let[e,n]of[[-5,3],[3,3],[3,-5],[-5,-5],[-1,3],[3,-1],[-1,-5],[-5,-1]])t("b2x2",e,n,0,7);return i}function v_(){let i=[],t=(e,n,s,r,o)=>i.push({type:e,i:n,j:s,rot:r,level:o});return t("b2x2",-4,-1,0,0),t("b2x2",2,-1,0,0),t("b1x2",-4,1,0,0),t("b1x2",-4,-2,0,0),t("b1x2",2,1,0,0),t("b1x2",2,-2,0,0),t("b2x2",-4,-1,0,3),t("b2x2",2,-1,0,3),t("b2x2",-4,-1,0,6),t("b2x2",2,-1,0,6),t("b2x4",-4,-1,0,9),t("b2x4",0,-1,0,9),t("b2x4",-2,-1,0,12),t("b2x2",-4,-1,0,12),t("b2x2",2,-1,0,12),t("p2x4",-4,-1,0,15),t("p2x4",0,-1,0,15),t("b2x2",-1,-1,0,16),t("b1x1",-4,-1,0,16),t("b1x1",-4,0,0,16),t("b1x1",3,-1,0,16),t("b1x1",3,0,0,16),i}function b_(){let i=[],t=(e,n,s,r,o)=>i.push({type:e,i:n,j:s,rot:r,level:o});for(let e of[0,3])t("b2x2",-4,-2,0,e),t("b2x2",-4,0,0,e),t("b2x2",2,-2,0,e),t("b2x2",2,0,0,e);t("p2x4",-4,-2,0,6),t("p2x4",-4,0,0,6),t("p2x4",0,-2,0,6),t("p2x4",0,0,0,6),t("p2x4",-2,-2,0,7),t("p2x4",-2,0,0,7),t("b2x2",-4,-2,0,7),t("b2x2",-4,0,0,7),t("b2x2",2,-2,0,7),t("b2x2",2,0,0,7),t("b1x4",-2,1,0,8),t("b1x4",-2,-2,0,8),t("p2x4",-4,-2,1,10),t("p2x4",2,-2,1,10);for(let[e,n]of[[-4,-2],[-4,1],[3,-2],[3,1]])t("b1x1",e,n,0,11);return i}function M_(){let i=[],t=(e,n,s,r,o)=>i.push({type:e,i:n,j:s,rot:r,level:o});t("b2x4",-2,-2,0,0),t("b2x4",-2,0,0,0),t("b1x2",-1,2,0,0),t("b1x2",-1,-3,0,0),t("b1x2",2,-1,1,0),t("b1x2",-3,-1,1,0),t("b2x4",-2,-2,1,3),t("b2x4",0,-2,1,3),t("b2x2",-1,-1,0,6),t("b1x2",-1,1,0,6),t("b1x2",-1,-2,0,6),t("b1x2",1,-1,1,6),t("b1x2",-2,-1,1,6),t("b1x2",-1,-1,0,9),t("b1x2",-1,0,0,9),t("b1x2",-1,-1,1,12),t("b1x2",0,-1,1,12),t("p2x4",-2,-2,0,15),t("p2x4",-2,0,0,15),t("b2x2",-1,-1,0,16);for(let[e,n]of[[-2,-2],[1,-2],[-2,1],[1,1]])t("p1x1",e,n,0,16);return t("p2x4",-2,-2,1,19),t("p2x4",0,-2,1,19),t("b2x2",-1,-1,0,20),t("p2x2",-1,-1,0,23),i}var wl=[{id:"free",name:"Free build",summary:"Open deck with no guide boxes. Build whatever you like.",build:()=>[]},{id:"castle",name:"Castle tower",summary:"The FORRT keep with windows, an overhang ledge and a crown.",build:y_},{id:"arch",name:"Open arch",summary:"Twin pillars joined by an overhanging doorway and keystone.",build:v_},{id:"bridge",name:"Twin bridge",summary:"Two lookout towers linked high up by an open skywalk.",build:b_},{id:"lighthouse",name:"Lighthouse",summary:"A tall tapering beacon with a gallery deck and lantern room.",build:M_}],Mi=Object.fromEntries(wl.map(i=>[i.id,i]));var Qr=76;function kd(i,t){let e=new $e;e.name="Tower effects",i.add(e);let n=new Nn(.06,.06,.06),s=[];for(let g=0;g<Qr;g++){let v=new Dn({color:"#ffffff",transparent:!0,opacity:1}),p=new Ne(n,v);p.visible=!1,e.add(p),s.push({mesh:p,mat:v,active:!1,vx:0,vy:0,vz:0,rx:0,ry:0,rz:0,gravity:-5,t:0,life:.4,sx:1,sy:1,sz:1})}let r=0,o=new Set;function a(){for(let v=0;v<Qr;v++){let p=s[(r+v)%Qr];if(!p.active)return r=(r+v+1)%Qr,p}let g=s[r];return r=(r+1)%Qr,g}function c(g,v,p,m,w,R,M=!1){if(t.matches)return;let A=M?10:6,S=new re(R).lerp(new re("#ffffff"),.45);for(let I=0;I<A;I++){let _=a(),E=I/A*Math.PI*2+(Math.random()-.5)*.5,N=Math.cos(E),P=Math.sin(E);_.active=!0,_.t=0,_.life=M?.36+Math.random()*.14:.24+Math.random()*.1,_.gravity=M?-3.4:-4.2;let k=(M?.85:.55)+Math.random()*.45;_.vx=N*k,_.vy=(M?1.05:.58)+Math.random()*.45,_.vz=P*k,_.rx=(Math.random()-.5)*9,_.ry=(Math.random()-.5)*9,_.rz=(Math.random()-.5)*9;let W=M&&I%2===0?1.15:.72+Math.random()*.35;_.sx=W,_.sy=W*.65,_.sz=W,_.mat.color.copy(M&&I%2===0?new re(I%4===0?"#e8b52c":"#14808f"):S),_.mat.opacity=.92,_.mesh.position.set(g+N*m*.85,v+.03,p+P*w*.85),_.mesh.rotation.set(Math.random()*3,Math.random()*3,Math.random()*3),_.mesh.scale.set(_.sx,_.sy,_.sz),_.mesh.visible=!0}}function l(g,v){if(t.matches)return;let p=42;for(let m=0;m<p;m++){let w=a(),R=Math.random()*Math.PI*2,M=.9+Math.random()*2.1;w.active=!0,w.t=0,w.life=1.15+Math.random()*.75,w.gravity=-3.8,w.vx=Math.cos(R)*M,w.vy=2.1+Math.random()*2.2,w.vz=Math.sin(R)*M,w.rx=(Math.random()-.5)*11,w.ry=(Math.random()-.5)*11,w.rz=(Math.random()-.5)*11,w.sx=1.45,w.sy=.38,w.sz=1.1,w.mat.color.set(v[m%v.length]),w.mat.opacity=1,w.mesh.position.set((Math.random()-.5)*1.1,g+.25+Math.random()*.35,(Math.random()-.5)*1.1),w.mesh.rotation.set(Math.random()*6,Math.random()*6,Math.random()*6),w.mesh.scale.set(w.sx,w.sy,w.sz),w.mesh.visible=!0}}function u(g,v){t.matches||o.add({part:g,halfH:v,t:0,dur:.13})}function f(){for(let g of s)g.active=!1,g.mesh.visible=!1;for(let g of o)g.part.object.scale.set(1,1,1),g.part.object.position.y=g.part.rest.y;o.clear()}function h(g){let v=!1;for(let p of s){if(!p.active)continue;if(p.t+=g,p.t>=p.life){p.active=!1,p.mesh.visible=!1;continue}v=!0,p.vy+=p.gravity*g,p.mesh.position.x+=p.vx*g,p.mesh.position.y+=p.vy*g,p.mesh.position.z+=p.vz*g,p.mesh.rotation.x+=p.rx*g,p.mesh.rotation.y+=p.ry*g,p.mesh.rotation.z+=p.rz*g;let m=p.t/p.life,w=m>.55?1-(m-.55)/.45:1;p.mat.opacity=Math.max(0,w);let R=1-m*.35;p.mesh.scale.set(p.sx*R,p.sy*R,p.sz*R)}for(let p of[...o]){if(p.part.state!=="placed"){p.part.object.scale.set(1,1,1),o.delete(p);continue}if(p.t+=g,p.t>=p.dur){p.part.object.scale.set(1,1,1),p.part.object.position.y=p.part.rest.y,o.delete(p);continue}v=!0;let m=p.t/p.dur,w=-Math.sin(m*Math.PI*1.5)*Math.pow(1-m,1.5),R=1+w*.085,M=1-w*.04;p.part.object.scale.set(M,R,M),p.part.object.position.y=p.part.rest.y-p.halfH*(1-R)}return v}function d(){f(),n.dispose();for(let g of s)g.mat.dispose();i.remove(e)}return{burstAt:c,confetti:l,bounce:u,clear:f,tick:h,dispose:d,get active(){return o.size>0||s.some(g=>g.active)}}}var Hi=["#7046a3","#2672b8","#2b985b","#e8b52c","#e98434","#ce4742"];function bh(i,t,e,n,s,r){i.beginPath(),i.moveTo(t+r,e),i.arcTo(t+n,e,t+n,e+s,r),i.arcTo(t+n,e+s,t,e+s,r),i.arcTo(t,e+s,t,e,r),i.arcTo(t,e,t+n,e,r),i.closePath()}function Vd({sourceCanvas:i,title:t,bricks:e,courses:n,stability:s,blueprintDone:r}){let c=document.createElement("canvas");c.width=1200,c.height=900;let l=c.getContext("2d");l.fillStyle="#e3efec",l.fillRect(0,0,1200,900);let u=36,f=u,h=u,d=1200-u*2,g=900-u*2;l.save(),l.shadowColor="rgba(38, 45, 53, 0.14)",l.shadowBlur=24,l.shadowOffsetY=8,bh(l,f,h,d,g,24),l.fillStyle="#ffffff",l.fill(),l.restore(),l.save(),bh(l,f,h,d,g,24),l.clip();let v=10,p=d/Hi.length;Hi.forEach((Y,D)=>{l.fillStyle=Y,l.fillRect(f+D*p,h,Math.ceil(p)+1,v)});let m=136,w=h+v,R=g-v-m,M=l.createLinearGradient(0,w,0,w+R);M.addColorStop(0,"#eaf4f1"),M.addColorStop(1,"#dcebe7"),l.fillStyle=M,l.fillRect(f,w,d,R);let A=i.width||1,S=i.height||1,I=Math.min((d-48)/A,(R-24)/S),_=A*I,E=S*I,N=f+(d-_)/2,P=w+(R-E)/2;l.drawImage(i,N,P,_,E);let k=h+g-m;l.fillStyle="#d7e2e0",l.fillRect(f,k,d,1.5),l.fillStyle="#262d35",l.font="500 38px 'Newsreader', Georgia, serif",l.textBaseline="alphabetic",l.fillText(t,f+40,k+56);let B=`${e} ${e===1?"brick":"bricks"}  \xB7  ${n} ${n===1?"course":"courses"} high  \xB7  ${s}% stable`;if(l.fillStyle="#4c5e72",l.font="600 22px 'Source Sans 3', system-ui, sans-serif",l.fillText(B,f+40,k+98),r){let Y="Blueprint complete";l.font="600 19px 'Source Sans 3', system-ui, sans-serif";let D=l.measureText(Y).width,Q=f+d-40-D-28,X=k+26;bh(l,Q,X,D+28,36,18),l.fillStyle="#e3f1e7",l.fill(),l.fillStyle="#2b7a4b",l.fillText(Y,Q+14,X+24)}return l.fillStyle="#2d5750",l.font="600 20px 'Source Sans 3', system-ui, sans-serif",l.textAlign="right",l.fillText("Built on forrt.org",f+d-40,k+98),l.restore(),c}function Gd(i,t="forrt-tower.png"){return new Promise(e=>{let n=(s,r)=>{let o=document.createElement("a");o.href=s,o.download=t,document.body.appendChild(o),o.click(),o.remove(),r&&setTimeout(()=>URL.revokeObjectURL(s),2e3),e(!0)};i.toBlob?i.toBlob(s=>{s?n(URL.createObjectURL(s),!0):n(i.toDataURL("image/png"),!1)},"image/png"):n(i.toDataURL("image/png"),!1)})}var S_=`
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
`,w_=document.currentScript?.src||location.href,Mh=null;function Sh(){return Mh??=new Promise((i,t)=>{let e=document.createElement("script");e.src=new URL("physics.bundle.js",w_).href,e.onload=()=>i(window.CANNON),e.onerror=()=>{Mh=null,t(new Error("The physics file did not load"))},document.head.appendChild(e)}),Mh}var to=i=>Math.max(0,Math.min(1,i)),Tl=i=>{let t=to(i);return t*t*(3-2*t)},un=matchMedia("(prefers-reduced-motion: reduce)"),ls=matchMedia("(pointer: coarse)"),ln=.3,Wi=.09,Pe={};for(let[i,t]of[[1,1],[1,2],[1,4],[2,2],[2,3],[2,4]])Pe[`b${i}x${t}`]={nx:t,nz:i,plates:3,size:`${i}\xD7${t}`,word:"brick",label:`${i} by ${t} brick`};for(let[i,t]of[[1,1],[1,2],[2,2],[2,4]])Pe[`p${i}x${t}`]={nx:t,nz:i,plates:1,size:`${i}\xD7${t}`,word:"plate",label:`${i} by ${t} plate`};var eo=Object.keys(Pe),Hd=i=>String((i+1)%10),T_={grey:"Grey",brick:"Brick",pride:"Pride"},wh=["#8e3524","#963a27","#833022","#9c432c","#8a3828","#7b2d20","#984631"],Wd=i=>Hi[Math.ceil(i/3)%Hi.length],Th=-1e3,Zs=80,ai=-8,li=7,Al=48,Xd=400,an=(i,t)=>t?[Pe[i].nz,Pe[i].nx]:[Pe[i].nx,Pe[i].nz],El=i=>Pe[i].nx===Pe[i].nz,Cl=i=>.15+ln*i,A_='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>',E_='<svg class="tg-ic-on" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg><svg class="tg-ic-off" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>',st,Js;function C_(){let i=document.createElement("style");i.textContent=S_,document.head.appendChild(i);let t=document.createElement("dialog");t.id="tower-game",t.setAttribute("aria-labelledby","tg-title");let e=eo.map((c,l)=>`<button type="button" class="tg-style" data-type="${c}" aria-pressed="false" aria-label="${Pe[c].label}" aria-keyshortcuts="${Hd(l)}"><kbd>${Hd(l)}</kbd><img alt=""><span>${Pe[c].size}</span><small>${Pe[c].word}</small></button>`).join(""),n=Object.entries(T_).map(([c,l])=>`<button type="button" class="tg-look" data-look="${c}" aria-pressed="false"><i></i>${l}</button>`).join(""),s=wl.map(c=>`<button type="button" class="tg-plan-pill" data-plan="${c.id}" aria-pressed="${c.id==="free"}">${c.name}</button>`).join(""),r=ls.matches?"tap":"click",o=["<strong>Pick a blueprint or build freely</strong> from the row at the top. Each blueprint guides you brick by brick with teal outlines.",`<strong>Pick a brick</strong> from the row below${ls.matches?"":", or press its number: 1 to 9, then 0 for the tenth"}.`,`<strong>Point and ${r}.</strong> ${ls.matches?"Drag first to see a copy of the brick, edged in orange, where it will land; a plain tap places it at once.":"A copy of the brick, edged in orange, shows where it will land."} Watch the <strong>Stability</strong> meter on overhangs.`,`<span class="tg-turns" aria-hidden="true"><img id="tg-turn-a" alt="">\u21BB<img id="tg-turn-b" alt=""></span><strong>Rotate${ls.matches?"":" (or R)"}</strong> turns the brick a quarter turn before you place it. <strong>View${ls.matches?"":" (or T)"}</strong> turns the whole tower.`,"<strong>Grey, Brick and Pride</strong> set the look of your next bricks. <strong>Topple</strong> knocks the tower down for fun; <strong>Undo</strong> snaps it straight back.","<strong>Done</strong> launches a pride-stripe celebration, and <strong>Save photo</strong> downloads a postcard of your build."].map(c=>`<li>${c}</li>`).join("");t.innerHTML=`<div class="tg-wrap">
    <div class="tg-panel">
      <div class="tg-head"><h2 id="tg-title">Build the tower</h2>
        <div class="tg-head-actions">
          <button type="button" class="tg-btn" id="tg-photo" aria-label="Save photo of your tower" disabled>${A_}<span class="tg-btn-text">Save photo</span></button>
          <button type="button" class="tg-btn tg-close tg-sound" id="tg-sound" aria-pressed="true" aria-label="Sound on" title="Toggle sound effects">${E_}</button>
          <button type="button" class="tg-btn tg-close" id="tg-help" aria-label="How to play">?</button>
          <button type="button" class="tg-btn tg-close" id="tg-close" aria-label="Close the game">\u2715</button>
        </div>
      </div>
      <div class="tg-bar">
        <div class="tg-plans" id="tg-plans" role="group" aria-label="Choose a blueprint">${s}</div>
        <div class="tg-status">
          <span class="tg-count" id="tg-count">0 bricks</span>
          <span class="tg-prog" id="tg-prog" hidden><span class="tg-prog-track" aria-hidden="true"><span class="tg-prog-fill" id="tg-prog-fill"></span></span><span id="tg-prog-text">0 / 0</span></span>
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
    <div class="tg-note" id="tg-warn" hidden><div class="tg-card" role="alertdialog" aria-modal="true" aria-labelledby="tg-warn-title" aria-describedby="tg-warn-text"><h3 id="tg-warn-title">Careful</h3><p class="tg-warn-text" id="tg-warn-text">Placing it here would bring FORRT down. We only build on solid foundations.</p><div class="tg-warn-row"><button type="button" class="tg-btn" id="tg-warn-anyway">Place it anyway</button><button type="button" class="tg-btn tg-main" id="tg-warn-go">Move it</button></div></div></div>`,document.body.appendChild(t);let a=c=>t.querySelector("#"+c);return{d:t,canvas:a("tg-canvas"),stage:a("tg-stage"),tray:a("tg-tray"),count:a("tg-count"),hint:a("tg-hint"),rotate:a("tg-rotate"),view:a("tg-view"),next:a("tg-next"),plan:a("tg-plan"),restart:a("tg-restart"),topple:a("tg-topple"),undo:a("tg-undo"),hints:a("tg-hints"),finish:a("tg-finish"),done:a("tg-done"),close:a("tg-close"),live:a("tg-live"),photo:a("tg-photo"),sound:a("tg-sound"),prog:a("tg-prog"),progFill:a("tg-prog-fill"),progText:a("tg-prog-text"),stability:a("tg-stability"),stabilityFill:a("tg-stability-fill"),stabilityText:a("tg-stability-text"),toast:a("tg-toast"),toastText:a("tg-toast-text"),planPills:[...t.querySelectorAll(".tg-plan-pill")],styles:[...t.querySelectorAll(".tg-style")],looks:[...t.querySelectorAll(".tg-look")],wrap:t.querySelector(".tg-wrap"),note:a("tg-note"),noteGo:a("tg-note-go"),help:a("tg-help"),warn:a("tg-warn"),warnGo:a("tg-warn-go"),warnAnyway:a("tg-warn-anyway")}}function R_(){let i=new yl({canvas:st.canvas,antialias:!0,alpha:!0,stencil:!0});i.setPixelRatio(Math.min(window.devicePixelRatio||1,1.75)),i.outputColorSpace=hn,i.toneMapping=zr,i.toneMappingExposure=1.05,i.shadowMap.enabled=!0,i.shadowMap.type=is;let t=new Ls,e=new _i(-3.7,3.7,3,-3,.1,60);t.add(new zs(16777215,9143161,1.75));let n=new Ui(16776182,3.5);n.position.set(-3,11,6),n.castShadow=!0,n.shadow.mapSize.set(2048,2048),n.shadow.camera.left=-8,n.shadow.camera.right=8,n.shadow.camera.top=8,n.shadow.camera.bottom=-8,n.shadow.camera.near=.5,n.shadow.camera.far=30,n.shadow.normalBias=.035,n.shadow.bias=-4e-4,n.shadow.radius=3,n.shadow.intensity=.6,t.add(n);let s=new Ui(15988735,1.25);s.position.set(6,4,-2),t.add(s);let r=new Ui(16777215,1.2);r.position.set(-3,5,-5),t.add(r);let{model:o,brickGeometry:a,stones:c,foundationTop:l}=Bd();t.add(o);let u=new $e;t.add(u);let f=new Ne(new ns(60,60),new Nr({opacity:.18}));f.rotation.x=-Math.PI/2,f.position.y=-.035,f.receiveShadow=!0,t.add(f);let h=zd(),d=kd(t,un),g=new O(0,1,0),v=y=>y.object.children[0],p={},m={},w={};for(let y of eo){let T=Pe[y],G=T.nx*ln,H=T.plates*Wi,j=T.nz*ln;p[y]=a(G,H,j),m[y]=new Nn(G-.014,H-.014,j-.014),w[y]=new wr(m[y])}let R=li-ai+1,M=(y,T)=>(y-ai)*R+(T-ai),A=new Int16Array(R*R).fill(Th);for(let y=-4;y<=3;y++)for(let T=-4;T<=3;T++)A[M(y,T)]=0;let S=A.slice(),I=new Array(R*R).fill(null),_=Array.from({length:R*R},()=>[]),E=.048,N=.007,P=y=>l+y*Wi,k=(y,T,G,H,j)=>{for(let rt=y;rt<y+G;rt++)for(let it=T;it<T+H;it++)j(M(rt,it))},W=(y,T,G,H)=>y>=ai&&T>=ai&&y+G-1<=li&&T+H-1<=li;function U(y,T,G,H){let[j,rt]=an(y,H);if(!W(T,G,j,rt))return null;let it=Th,Ot=0;return k(T,G,j,rt,Ht=>{S[Ht]>it?(it=S[Ht],Ot=1):S[Ht]===it&&Ot++}),it===Th||it+Pe[y].plates>Al?null:{level:it,studs:Ot}}let B=(y,T,G,H,j)=>{let[rt,it]=an(y,H);return{x:Cl(T+(rt-1)/2),z:Cl(G+(it-1)/2),y:P(j)+Pe[y].plates*Wi/2,floor:P(j),rotY:H?Math.PI/2:0}},Y=(y,T,G,H,j)=>({type:y,i:T,j:G,rot:H,level:j.level,studs:j.studs,...B(y,T,G,H,j.level)});function D(y,T,G,H,j){let[rt,it]=an(y,H),Ot=new Map,Ht=0,ee=0,Se=0,Ee=1/0,en=-1/0,ke=1/0,We=-1/0;for(let Pn=T;Pn<T+rt;Pn++)for(let ci=G;ci<G+it;ci++){let rr=M(Pn,ci);if(S[rr]!==j)continue;let Xe=I[rr];Xe&&Ot.set(Xe,(Ot.get(Xe)||0)+1),Ht++,ee+=Pn+.5,Se+=ci+.5,Ee=Math.min(Ee,Pn),en=Math.max(en,Pn+1),ke=Math.min(ke,ci),We=Math.max(We,ci+1)}return{under:Ot,studs:Ht,x:ee/Ht,z:Se/Ht,hx:(en-Ee)/2,hz:(We-ke)/2,mass:rt*it*Pe[y].plates,cx:T+rt/2,cz:G+it/2}}let Q=null;function X(y){let T=new Map,G=0;Q=null;let H=j=>{let rt=T.get(j),it=j.mass+(rt?rt.w:0),Ot=j.mass*j.cx+(rt?rt.mx:0),Ht=j.mass*j.cz+(rt?rt.mz:0),ee=Math.hypot(Math.max(0,Math.abs(Ot/it-j.x)-j.hx),Math.max(0,Math.abs(Ht/it-j.z)-j.hz)),Se=it*ee/j.studs;Se>G&&(G=Se,Q=j);for(let[Ee,en]of j.under){let ke=en/j.studs,We=T.get(Ee.hold)||{w:0,mx:0,mz:0};We.w+=it*ke,We.mx+=Ot*ke,We.mz+=Ht*ke,T.set(Ee.hold,We)}};y&&H(y);for(let j=lt.length-1;j>=0;j--)H(lt[j].hold);return G}let q=y=>X(D(y.type,y.i,y.j,y.rot,y.level))>Zs;function tt(y){if(y>Zs)return{pct:0,state:"wobbly",label:"Too wobbly"};let T=Math.max(1,Math.min(100,Math.round(100*(1-y/Zs))));return T<25?{pct:T,state:"risky",label:`Risky ${T}%`}:T<60?{pct:T,state:"leaning",label:`Leaning ${T}%`}:{pct:T,state:"solid",label:`Solid ${T}%`}}let pt=[],lt=[],Kt=()=>pt.filter(y=>y.state==="placed").length,Ct=()=>lt.reduce((y,T)=>Math.max(y,T.cell.level+Pe[T.type].plates),0),Jt=()=>Math.ceil(Ct()/3),nt=new Dn({color:"#14808f",transparent:!0,opacity:.42,depthWrite:!1,depthTest:!1}),at=new Dn({color:"#14808f",transparent:!0,opacity:.14,depthWrite:!1,depthTest:!1}),bt=new Ri({color:"#0b5a65",transparent:!0,depthTest:!1}),Vt=new Ri({color:"#0b5a65",transparent:!0,opacity:.45,depthTest:!1}),dt=[],Bt="free",ye="castle",ht=!1;function mt(y){for(let H of dt)u.remove(H.hint);dt.length=0;for(let H of lt)H.slot=null;let G=(Mi[y]||Mi.free).build();for(let H of G){let j={...H,filled:null},rt=B(j.type,j.i,j.j,j.rot,j.level);j.hint=new $e,j.hint.position.set(rt.x,rt.y,rt.z),j.hint.rotation.y=rt.rotY,j.hint.visible=!1,j.body=new Ne(m[j.type],at),j.body.renderOrder=4,j.line=new Us(w[j.type],Vt),j.line.renderOrder=5,j.hint.add(j.body,j.line),u.add(j.hint),dt.push(j)}for(let H of dt){let[j,rt]=an(H.type,H.rot);H.needs=dt.filter(it=>{if(it.level>=H.level)return!1;let[Ot,Ht]=an(it.type,it.rot);return it.i<H.i+j&&H.i<it.i+Ot&&it.j<H.j+rt&&H.j<it.j+Ht})}for(let H of lt){let j=dt.find(rt=>!rt.filled&&rt.type===H.type&&rt.i===H.cell.i&&rt.j===H.cell.j&&rt.rot===H.cell.rot&&rt.level===H.cell.level);j&&(j.filled=H,H.slot=j)}ht=dt.length>0&&dt.every(H=>H.filled)}let _t=y=>{let T=U(y.type,y.i,y.j,y.rot);return!T||T.level>y.level},gt=y=>dt.filter(T=>{if(T.filled||y&&T.type!==y||!T.needs.every(H=>H.filled||_t(H)))return!1;let G=U(T.type,T.i,T.j,T.rot);return G&&G.level===T.level&&X(D(T.type,T.i,T.j,T.rot,T.level))<=Zs}),Tt=(y,T,G)=>y==="pride"?Wd(G):y==="brick"?wh[T%wh.length]:c[T%c.length].color;function jt(y,T){y.stone.set(Tt(y.look,y.shade,T)),y.material.color.copy(y.stone)}let $t=()=>pt.length*3+1;function Qt(y,T=fe){let G=new $e,H=$t(),j=c[H%c.length].clone(),rt=new Ne(p[y],j);rt.castShadow=!0,rt.receiveShadow=!0,G.add(rt),G.name=Pe[y].label,o.add(G);let it={object:G,type:y,look:T,shade:H,state:"flying",material:j,stone:new re,pride:new re,slot:null,cell:null,rest:new O};return pt.push(it),it}function ie(y){o.remove(y.object),y.material.dispose(),pt.splice(pt.indexOf(y),1)}let L="b1x2",fe="grey",ae=0,C=0,x=!1,z=!1,Z=()=>El(L)?0:ae,et=new $e;et.visible=!1,u.add(et);let yt=c[0].clone();yt.transparent=!0;let St=new Ne(p[L],yt),ot=new Us(w[L],new Ri({color:"#ff8a1f",transparent:!0,depthTest:!1,toneMapped:!1})),ut=new Ne(p[L],new Dn({colorWrite:!1,transparent:!0,depthWrite:!1,depthTest:!1,stencilWrite:!0,stencilFunc:dl,stencilRef:1,stencilZPass:$c})),At=new Ne(m[L],new Dn({color:"#ff8a1f",side:Ke,transparent:!0,depthWrite:!1,depthTest:!1,toneMapped:!1,stencilWrite:!0,stencilFunc:Zc,stencilRef:1}));ut.renderOrder=4,At.renderOrder=5,St.renderOrder=6,ot.renderOrder=7,et.add(ut,At,St,ot);function Xt(){let y=x&&!z&&!xt&&dt.length?gt():[];for(let T of dt)T.hint.visible=!1;for(let T of y){let G=T.type===L;T.hint.visible=!0,T.body.material=G?nt:at,T.line.material=G?bt:Vt}for(let T of st.styles)T.classList.toggle("tg-suggested",y.some(G=>G.type===T.dataset.type));return Le=!0,y}let Lt=new O(7.4,10.6,10.2),Pt=new O(0,2.5,0),Nt={width:1,height:1,scale:1},Wt={l:-3,r:3,t:3,b:-3},se=0,F=!1;function Et(){e.position.copy(Lt).applyAxisAngle(g,se),e.lookAt(Pt),e.updateMatrixWorld(!0)}function ct(){let y=Nt.height<480?P(0)-.75:-.035,T=1.56,G=Nt.height<480?9:13;for(let Xe of lt){let[kl,Vl]=an(Xe.type,Xe.cell.rot),Oh=B(Xe.type,Xe.cell.i,Xe.cell.j,Xe.cell.rot,Xe.cell.level);T=Math.max(T,Math.ceil((Math.max(Math.abs(Oh.x)+kl*.15,Math.abs(Oh.z)+Vl*.15)+ln)/.6)*.6),G=Math.max(G,Math.min(Al,Math.ceil((Xe.cell.level+Pe[Xe.type].plates+9)/6)*6))}let H=new ei(new O(-T,y,-T),new O(T,P(G)+.06,T)),j=e.matrixWorldInverse,rt=new O,it=1/0,Ot=-1/0,Ht=1/0,ee=-1/0;for(let Xe of[H.min.x,H.max.x])for(let kl of[H.min.y,H.max.y])for(let Vl of[H.min.z,H.max.z])rt.set(Xe,kl,Vl).applyMatrix4(j),it=Math.min(it,rt.x),Ot=Math.max(Ot,rt.x),Ht=Math.min(Ht,rt.y),ee=Math.max(ee,rt.y);for(let Xe of pt)Xe.state==="debris"&&(rt.copy(Xe.object.position).applyMatrix4(j),it=Math.min(it,rt.x-.8),Ot=Math.max(Ot,rt.x+.8),Ht=Math.min(Ht,rt.y-.8),ee=Math.max(ee,rt.y+.8));let Se=1.03,Ee=Nt.width/Nt.height,en=Nt.width<=600&&Nt.height>260?(ee-Ht)*.11:0,ke=Ht-en,We=Math.max((ee-ke)/2,(Ot-it)/2/Ee)*Se,Pn=We*Ee,ci=(it+Ot)/2,rr=(ee+ke)/2;return{l:ci-Pn,r:ci+Pn,t:rr+We,b:rr-We}}function Rt(){e.left=Wt.l,e.right=Wt.r,e.top=Wt.t,e.bottom=Wt.b,e.updateProjectionMatrix(),Nt.scale=Nt.height/(Wt.t-Wt.b),Le=!0}function Ut(){Object.assign(Wt,ct()),Rt()}function ft(){let{width:y,height:T}=st.stage.getBoundingClientRect();!y||!T||(i.setSize(y,T,!1),Nt.width=y,Nt.height=T,Et(),Ut())}let qt=y=>{let T=y.clone().project(e);return{x:(T.x+1)/2*Nt.width,y:(1-T.y)/2*Nt.height}},Gt=y=>{let T=st.canvas.getBoundingClientRect();return{x:y.clientX-T.left,y:y.clientY-T.top}},we=new Br,ve=new vt;function dn(y){return we.setFromCamera(ve.set(y.x/Nt.width*2-1,1-y.y/Nt.height*2),e),we.ray}function Rn(y,T,G,H,j){let rt=M(y,T),Ot=Math.hypot(G-Cl(y),j-Cl(T))<=.087?E:-N;if(A[rt]===0&&H<=P(0)+Ot)return!0;for(let[Ht,ee]of _[rt])if(H>=P(Ht)&&H<=P(ee)+Ot)return!0;return!1}function Ks(y){let{origin:T,direction:G}=dn(y),H=(P(Al)+.06-T.y)/G.y,j=(P(0)-.12-T.y)/G.y;for(let rt=H;rt<=j;rt+=.015){let it=T.x+G.x*rt,Ot=T.z+G.z*rt,Ht=Math.floor(it/ln),ee=Math.floor(Ot/ln);if(W(Ht,ee,1,1)&&Rn(Ht,ee,it,T.y+G.y*rt,Ot))return{i:Ht,j:ee}}return null}let Rl=34,js=60,Qs=10,Il=ls.matches?10:6,no=60,Si=y=>$&&Math.hypot(y.x-$.x,y.y-$.y)<=Il;function je(y){if(Si(y)){let T=Z(),[G,H]=an(L,T);if(W($.i,$.j,G,H)){let j=U(L,$.i,$.j,T);return j?Y(L,$.i,$.j,T,j):null}}return cs(y)}function cs(y){let T=L,G=Z(),[H,j]=an(T,G),rt=(Se,Ee,en)=>{let ke=B(T,Se,Ee,G,en.level);return qt(new O(ke.x,ke.floor,ke.z))},it=null,Ot=1/0,Ht=(Se,Ee)=>{let en=U(T,Se,Ee,G);if(!en)return;let ke=rt(Se,Ee,en),We=Math.hypot(ke.x-y.x,ke.y-y.y);We<Ot&&(Ot=We,it={i:Se,j:Ee,r:en})},ee=Ks(y);if(ee)for(let Se=ee.i-H+1;Se<=ee.i;Se++)for(let Ee=ee.j-j+1;Ee<=ee.j;Ee++)Ht(Se,Ee);if(it)return Y(T,it.i,it.j,G,it.r);for(let Se=ai;Se<=li;Se++)for(let Ee=ai;Ee<=li;Ee++)Ht(Se,Ee);return it&&Ot<=Rl?Y(T,it.i,it.j,G,it.r):null}let Le=!0,cn=!1,Zn=0,Xi=0,ce=null,Qe=null,vn=null,hs="solid",io=!1,so=!1,xe=null,bn=null,b=null,V=0,$=null,K=-1e3,J=0,Dt=0,wt=new Set,It=new Set,zt=new Set,xt=!1,Zt=!1,Yt=null,kt=0,me=null,Re=null,Ae=0,de=0,ge={refused:0,toppled:0,misses:0,drops:0,undos:0,lost:0,frames:0,rotates:0,turns:0,keyboard:0,photos:0,milestones:0},Mt=y=>{st.live.textContent=y};function ze(y,T=!1){clearTimeout(J),st.toastText.textContent=y,st.toast.classList.toggle("tg-toast-plan",T),st.toast.hidden=!1,J=setTimeout(()=>{st.toast.hidden=!0},3400)}function he(){clearTimeout(J),st.toast.hidden=!0}function tn(y){let T=lt.length===0&&!vn?{pct:100,state:"solid",label:"Solid"}:tt(y);return st.stability.dataset.state=T.state,st.stability.setAttribute("aria-valuenow",String(T.pct)),st.stability.setAttribute("aria-valuetext",`${T.label}`),st.stabilityFill.style.width=`${T.pct}%`,st.stabilityText.textContent=T.label,T}let Mn="Too wobbly here: a brick in this spot would bring the tower down.",Bn=()=>{let y=Mi[Bt],T=x&&dt.length?gt():[];return Bt!=="free"&&x&&T.length?`${y.name}: teal outlines show the next places. Dark ones fit your brick; dotted bricks fit the rest.`:Bt!=="free"&&dt.length&&dt.every(G=>G.filled)?`${y.name} complete. Press Done for the pride-stripe parade, or pick another blueprint.`:Bt!=="free"&&x?`Your build has covered the rest of ${y.name}, or left it too wobbly. Keep building, or undo to bring it back.`:ls.matches?"Pick a brick, then tap the tower. Drag to aim, and turn bricks with Rotate.":"Press 1 to 9 or 0 for a brick, then click the tower. R rotates the brick and T turns the view."};function be(){let y=Kt(),T=Jt();st.count.textContent=y===0?"0 bricks":`${y===1?"1 brick":`${y} bricks`} \xB7 ${T} high`;let G=Bt!=="free"&&dt.length>0,H=G?dt.filter(Ot=>Ot.filled&&Ot.filled.state==="placed").length:0,j=G&&H===dt.length,rt=pt.some(Ot=>Ot.state==="debris");st.prog.hidden=!G,G&&(st.progText.textContent=`${H} / ${dt.length}`,st.progFill.style.width=`${Math.round(H/dt.length*100)}%`,st.prog.classList.toggle("tg-prog-done",j));for(let Ot of st.planPills)Ot.setAttribute("aria-pressed",String(Ot.dataset.plan===Bt));st.hints.setAttribute("aria-pressed",String(x&&G)),st.done.textContent=z?"Build on":"Done",st.done.setAttribute("aria-label",z?"Build on":"Done building"),st.done.disabled=xt||!lt.length&&!z,st.undo.disabled=Zt||!lt.length&&!b,st.restart.disabled=!lt.length&&!rt,st.topple.disabled=xt||Zt||!lt.length,st.photo.disabled=xt||Zt||!y||wt.size>0,st.plan.hidden=!(x&&G&&!z&&!j);let it=Xt();st.next.disabled=st.finish.disabled=xt||!it.length,vn||tn(X()),!z&&!ce&&!xt&&(st.hint.textContent=Bn()),Le=!0}function _e(y,T=!0){if(!Mi[y])return;let G=Bt!==y;if(G){z&&us();for(let H of wt)H.part.finishing=!1,H.part.finishPlan=null;for(let H of lt)H.finishing=!1,H.finishPlan=null}if(Bt=y,y!=="free"?(ye=y,x=!0):x=!1,mt(y),G&&T&&(h.pick(),st.planPills.find(j=>j.dataset.plan===y)?.scrollIntoView?.({inline:"center",block:"nearest",behavior:un.matches?"auto":"smooth"})),be(),fn(),T){let H=Mi[y],j=y==="free"?"Free build selected. Build anything you like.":lt.length?`${H.name} blueprint selected (${dt.length} bricks). Start again for a clear deck, or build on top.`:`${H.name} selected: ${H.summary}`;!z&&!xt&&(st.hint.textContent=j),Mt(j)}}function Ie(y,T=!1){L=y;for(let G of st.styles)G.setAttribute("aria-pressed",String(G.dataset.type===y));St.geometry=ut.geometry=p[y],ot.geometry=w[y],At.geometry=m[y],Me(),st.rotate.disabled=El(y),T&&h.pick(),be(),fn()}function zn(y){fe=y;for(let T of st.looks)T.setAttribute("aria-pressed",String(T.dataset.look===y));for(let T of st.styles)T.querySelector("img").src=lo[y][T.dataset.type];fn()}function Me(){for(let y of st.styles)y.classList.toggle("tg-flip",!El(y.dataset.type)&&(ae+C)%2===1)}function In(){El(L)||(ae=1-ae,ge.rotates++,h.rotate(),Me(),fn(),!z&&!ce&&(st.hint.textContent="Brick rotated. The pictures below show which way it now runs."),Mt(ae?"Brick rotated.":"Brick rotated back."))}function Fe(y){vn=y,et.visible=!!y;let T=!1,G=!1;if(y){let H=X(D(y.type,y.i,y.j,y.rot,y.level)),j=tn(H);hs=j.state,T=j.state==="wobbly",G=j.state==="risky",et.position.set(y.x,y.y,y.z),et.rotation.y=y.rotY,yt.color.set(T?"#e01414":Tt(fe,$t(),y.level)),yt.opacity=T?.6:1;let rt=T?"#e01414":G?"#d97706":"#ff8a1f",it=Pe[y.type],Ot=2.5/Nt.scale*2,Ht=ee=>ee-.014;ot.material.color.set(rt),At.material.color.set(rt),At.scale.set((Ht(it.nx*ln)+Ot)/Ht(it.nx*ln),(Ht(it.plates*Wi)+Ot)/Ht(it.plates*Wi),(Ht(it.nz*ln)+Ot)/Ht(it.nz*ln)),T&&!so&&h.creak()}else hs="solid",tn(X());so=T,io=T||G,st.canvas.style.cursor=T?"not-allowed":"",T?st.hint.textContent=Mn:st.hint.textContent===Mn&&(st.hint.textContent=Bn()),Le=!0}function fn(){z||xt?Fe(null):ce&&ce.point?Fe(je(ce.point)):xe?sr():bn&&Fe(je(bn))}function Zd(y){if(y.silent)return;let T=[],G=(Ht,ee)=>{zt.has(Ht)||(zt.add(Ht),ge.milestones++,T.push(ee))},H=Kt(),j=Jt(),[rt,it]=an(y.type,y.cell.rot);if(H>=4&&G("first_course","First course laid"),y.hold&&y.hold.under.size>=2&&G("open_span","Open span bridged"),(y.cell.i<-4||y.cell.i+rt>4||y.cell.j<-4||y.cell.j+it>4)&&G("overhang","Bold overhang"),j>=6&&G("skyline","Skyline reached: 6 courses high"),j>=10&&G("towering","Towering height: 10 courses"),H>=25&&G("master","Master builder: 25 bricks"),Bt!=="free"&&dt.length>0&&dt.every(Ht=>Ht.filled)&&!ht){ht=!0;let Ht=Mi[Bt].name;ze(`${Ht} complete`,!0),h.celebrate(),d.confetti(P(Ct()),Hi),Mt(`${Ht} blueprint complete.`);return}if(T.length){let Ht=T[T.length-1];ze(Ht,!1),h.milestone(),Mt(`Milestone: ${Ht}.`)}}function ro(y,T){let[G,H]=an(y.type,T.rot);y.cell={i:T.i,j:T.j,rot:T.rot,level:T.level},y.hold=D(y.type,T.i,T.j,T.rot,T.level),y.rest.set(T.x,T.y,T.z),y.object.quaternion.setFromAxisAngle(g,T.rotY),jt(y,T.level);let j=dt.find(rt=>!rt.filled&&rt.type===y.type&&rt.i===T.i&&rt.j===T.j&&rt.rot===T.rot&&rt.level===T.level)||null;y.slot=j,j&&(j.filled=y),k(T.i,T.j,G,H,rt=>{S[rt]=T.level+Pe[y.type].plates,I[rt]=y,_[rt].push([T.level,S[rt]])}),lt.push(y)}function tr(y){y.state="placed",y.object.visible=!0,y.object.position.copy(y.rest),y.object.scale.set(1,1,1);let T=Pe[y.type],[G,H]=an(y.type,y.cell.rot),j=!!(y.finishing&&!wt.size&&y.finishPlan===Bt);y.silent||(h.snap(y.cell.level,y.hold?y.hold.studs:2),d.bounce(y,T.plates*Wi/2),d.burstAt(y.rest.x,P(y.cell.level),y.rest.z,G*ln/2,H*ln/2,y.stone,!!y.slot),Mt(`${T.label} placed. ${Kt()} in all.`)),j||Zd(y),be(),j&&(y.finishing=!1,y.finishPlan=null,Nl()),y.topples&&(y.topples=!1,Ih())}function Ah(y,T=0){let G=un.matches?0:.22,H=y.rest.y+.7;if(y.object.position.set(y.rest.x,H,y.rest.z),T>0&&!un.matches&&(y.object.visible=!1),!G){tr(y);return}wt.add({part:y,t:-T,d:G,high:H}),Le=!0}function er(y,T=!1){if(xt)return null;if(lt.length>=Xd)return st.hint.textContent=`That is ${Xd} bricks, the most this version allows.`,null;if(!T&&q(y))return Jd(y),null;z&&us(),b=null,Dl();let G=Qt(y.type);return G.batch=++V,ro(G,y),Ah(G),be(),G}let nr=null,Eh=null;function Jd(y){ge.refused++,h.creak(),Eh=y,Sh().catch(()=>{}),nr=xe&&document.activeElement===st.stage?{...xe}:null,bn=null,Fe(null),st.warn.hidden=!1,st.wrap.inert=!0,st.warnGo.focus({preventScroll:!0})}function oo(){st.warn.hidden=!0,st.wrap.inert=!1,nr?(st.stage.focus({preventScroll:!0}),st.stage.classList.add("tg-keys"),xe=nr,nr=null,sr()):st.styles.find(y=>y.getAttribute("aria-pressed")==="true").focus({preventScroll:!0})}async function Kd(){let y=Eh;oo();let T=++de;xt=Zt=!0,be();try{me=await Sh()}catch{if(T!==de)return;xt=Zt=!1,be(),st.hint.textContent="The physics file did not load, so nothing was placed.";return}if(T!==de||!cn)return;if(Zt=!1,!xt){be();return}let G=Pl();xt=!1;let H=er(y,!0);if(!H){be();return}xt=!0,b=G,b.wipe=!0,H.topples=!0,st.hint.textContent="Here goes\u2026",be(),H.state==="placed"&&H.topples&&(H.topples=!1,Ih())}async function Ch(){if(xt||Zt||!lt.length)return;if(h.unlock(),wt.size)for(let G of[...wt])wt.delete(G),G.part.finishing=!1,G.part.finishPlan=null,G.part.topples=!1,G.part.object.visible=!0,G.part.silent=!0,tr(G.part),G.part.silent=!1;Qe=null,z=!1,o.rotation.y=0,he(),Fe(null);let y=++de;xt=Zt=!0,st.hint.textContent="Preparing the tumble\u2026",be();try{me=await Sh()}catch{if(y!==de)return;xt=Zt=!1,be(),st.hint.textContent="The physics file did not load, so the tower stayed up.";return}if(y!==de||!cn)return;if(Zt=!1,!xt||!lt.length){xt=!1,be();return}b=Pl(),b.wipe=!0,Dl(),h.creak(),st.hint.textContent="Timber\u2026",Qd(),xt&&be()}let Pl=()=>lt.map(y=>({type:y.type,cell:y.cell,batch:y.batch,look:y.look,shade:y.shade}));function jd(){let y=[],T=[],G=[];for(let H=0;H<60&&X()>Zs;H++){let j=lt.find(it=>it.hold===Q),rt=new Set([j]);G.push({part:j,x:ln*j.hold.x,z:ln*j.hold.z});for(let it of lt)it!==j&&[...it.hold.under.keys()].some(Ot=>rt.has(Ot))&&rt.add(it);for(let it of rt)if(it!==j)for(let[Ot,Ht]of it.hold.under)rt.has(Ot)&&T.push({a:it,b:Ot,studs:Ht});for(let it=lt.length-1;it>=0;it--)rt.has(lt[it])&&lt.splice(it,1);for(let it of rt)it.slot&&(it.slot.filled=null),it.slot=null,it.state="debris",y.push(it);ir()}return{fallen:y,grips:T,leans:G}}let Ll=y=>{let[T,G]=an(y.type,y.cell.rot),H=B(y.type,y.cell.i,y.cell.j,y.cell.rot,y.cell.level);return{x:H.x,y:H.y,z:H.z,hx:T*ln/2-.002,hy:Pe[y.type].plates*Wi/2-.002,hz:G*ln/2-.002,rotY:H.rotY}};function Rh(){let y=l,T=-.035,G=1.2,H=.3,j=(Se,Ee)=>(Se+Ee)/2,rt=(Se,Ee,en,ke,We,Pn)=>({x:j(Se,Ee),y:j(en,ke),z:j(We,Pn),hx:(Ee-Se)/2,hy:(ke-en)/2,hz:(Pn-We)/2}),it=.45,Ot=.96+.45-.187,Ht=.36,ee=.81+.36-.187;return[rt(-G,G,T,y,-G,-G+H),rt(-G,-G+H,T,y,-G+H,G-H),rt(-G,-it,T,y,G-H,G),rt(it,G,T,y,G-H,G),rt(-it,it,Ot,y,G-H,G),rt(G-H,G,T,y,-G+H,-Ht),rt(G-H,G,T,y,Ht,G-H),rt(G-H,G,ee,y,-Ht,Ht),rt(-G+H,G-H,y-Wi,y,-G+H,G-H)]}function Ih(){$=null,he(),d.clear();let{fallen:y,grips:T,leans:G}=jd(),H=new Map(y.map((rt,it)=>[rt,it])),j=y.map(rt=>({object:rt.object,...Ll(rt)}));Yt=vh(me,{pieces:j,shell:Rh(),standing:lt.map(Ll),groundY:-.035,grips:T.map(rt=>({a:H.get(rt.a),b:H.get(rt.b),studs:rt.studs})),leans:G.map(rt=>({piece:H.get(rt.part),x:rt.x,z:rt.z})),onImpact:rt=>{cn&&h.clatter(rt)}}),ge.toppled++,Re={fell:y.length,stayed:lt.length,clumpsAtStart:Yt.clumps},kt=un.matches?0:.14,un.matches&&(Yt.advanceBudget(16,40),Yt.settled&&ao()),Le=!0}function Qd(){$=null,d.clear();let y=lt.slice(),T=[];for(let it of y)for(let[Ot,Ht]of it.hold.under)T.push({a:it,b:Ot,studs:Ht});lt.length=0;for(let it of y)it.slot&&(it.slot.filled=null),it.slot=null,it.state="debris",it.object.visible=!0;ir();let G=new Map(y.map((it,Ot)=>[it,Ot])),H=y.map(it=>({object:it.object,...Ll(it)})),j=new O(1.1,0,1.35).applyAxisAngle(g,se),rt={vx:j.x*1.45,vy:1.5,vz:j.z*1.45,spinX:j.z*1.8,spinZ:-j.x*1.8};Yt=vh(me,{pieces:H,shell:Rh(),standing:[],groundY:-.035,grips:T.map(it=>({a:G.get(it.a),b:G.get(it.b),studs:it.studs})),leans:[],impulse:rt,onImpact:it=>{cn&&h.clatter(it)}}),ge.toppled++,Re={fell:y.length,stayed:0,clumpsAtStart:Yt.clumps,deliberate:!0},kt=un.matches?0:.08,un.matches&&(Yt.advanceBudget(16,40),Yt.settled&&ao()),Le=!0}function ao(){let y=Re.fell;Re.seconds=+Yt.time.toFixed(2),Re.clumpsAtEnd=Yt.clumps,Yt=null,xt=!1,qi(),be(),fn();let T=`Down it came: ${y===1?"1 brick":`${y} bricks`} fell. Undo puts ${y===1?"it":"them"} back, and your next brick clears the rubble.`;st.hint.textContent=T,Mt(T)}function Dl(){for(let y of pt)y.state==="debris"&&(y.state="gone",It.add({part:y,t:un.matches?1:0}));Le=!0}function Ph(y){return Y(y.type,y.i,y.j,y.rot,U(y.type,y.i,y.j,y.rot))}function tf(){if(xt)return;z&&us();let y=gt().sort((T,G)=>T.level-G.level)[0];y&&(er(Ph(y)),ge.drops++),be()}function ef(){if(xt)return;z&&us(),Dl();let y=0,T=null;b=null,V++;for(let G=gt().sort((H,j)=>H.level-j.level)[0];G;G=gt().sort((H,j)=>H.level-j.level)[0])T=Qt(G.type),T.batch=V,T.silent=!0,ro(T,Ph(G)),Ah(T,y),y+=.055;T&&(T.silent=!1,T.finishing=!0,T.finishPlan=Bt,wt.size||(T.finishing=!1,T.finishPlan=null,Nl())),be()}function ir(){S.set(A),I.fill(null);for(let y of _)y.length=0;for(let y of lt){let[T,G]=an(y.type,y.cell.rot);y.hold=D(y.type,y.cell.i,y.cell.j,y.cell.rot,y.cell.level),k(y.cell.i,y.cell.j,T,G,H=>{S[H]=y.cell.level+Pe[y.type].plates,I[H]=y,_[H].push([y.cell.level,S[H]])})}}function qi(){Sn={from:{...Wt},to:ct(),t:0},Le=!0}let Sn=null;function us(){$=null,z=!1,Qe=null,o.rotation.y=0,rf()}function Lh(){if(ce||Zt)return;if($=null,b?.wipe&&nf(),b){sf();return}if(!lt.length)return;z&&us();let y=lt[lt.length-1].batch;for(;lt.length&&lt[lt.length-1].batch===y;){let T=lt.pop();for(let G of wt)G.part===T&&wt.delete(G);T.slot&&(T.slot.filled=null,ht=!1),ie(T)}h.undo(),ge.undos++,ir(),qi(),Mt(`Undone. ${Kt()} left.`),be(),fn()}function nf(){de++,Yt=null,xt=!1,Zt=!1,Qe=null,z=!1,o.rotation.y=0,wt.clear(),It.clear(),d.clear(),lt.length=0;for(let y of dt)y.filled=null;for(let y of[...pt])ie(y);ir()}function sf(){for(let{type:y,cell:T,batch:G,look:H,shade:j}of b){let rt=Qt(y,H);rt.shade=j??rt.shade,rt.batch=G,rt.silent=!0,ro(rt,Y(y,T.i,T.j,T.rot,{level:T.level,studs:0})),tr(rt),rt.silent=!1}b=null,ht=dt.length>0&&dt.every(y=>y.filled),h.undo(),ge.undos++,qi(),Mt(`Build restored. ${Kt()} bricks.`),be(),fn()}function Dh(){de++,$=null;let y=b?.wipe?b:lt.length?Pl():null;Yt=null,xt=!1,Zt=!1,It.clear(),d.clear(),he(),b=y,Qe=null,z=!1,wt.clear(),o.rotation.y=0,lt.length=0,ae=0,zt.clear(),ht=!1,Me();for(let T of dt)T.filled=null;for(let T of[...pt])ie(T);ir(),qi(),h.undo(),Mt("All bricks cleared. Undo brings them back."),be(),b&&(st.hint.textContent="All bricks cleared. Undo brings them back."),st.styles.find(T=>T.dataset.type===L).focus()}function rf(){for(let y of pt)y.material.color.copy(y.stone);Le=!0}function Nl(){let y=st.plan.contains(document.activeElement);z=!0,Fe(null);let G=Bt!=="free"&&dt.length>0&&dt.every(it=>it.filled&&it.filled.state==="placed"),H=Mi[Bt].name,j=Kt();st.hint.textContent=G?`${H} complete (${j} ${j===1?"brick":"bricks"}). Save a photo, build on, or try another blueprint.`:`Your tower is finished: ${j} ${j===1?"brick":"bricks"}, ${Jt()} high. Save a photo, build on, or start again.`,Mt(st.hint.textContent),G&&(ht=!0,ze(`${H} complete`,!0));let rt=lt.map(it=>it.cell.level);for(let it of lt)it.look==="grey"?it.pride.set(Wd(it.cell.level)):it.pride.copy(it.stone);if(h.celebrate(),be(),y&&!st.done.disabled&&st.done.focus({preventScroll:!0}),un.matches){for(let it of pt)it.material.color.copy(it.pride);Le=!0;return}d.confetti(P(Math.max(3,...rt)),Hi),Qe={t:0,top:Math.max(1,...rt)}}async function Nh(){if(!Kt()||wt.size||xt||Zt)return;h.unlock();let y=et.visible,T=dt.map(ee=>ee.hint.visible);et.visible=!1;for(let ee of dt)ee.hint.visible=!1;i.render(t,e);let G=Bt!=="free"&&dt.length>0,H=G&&dt.every(ee=>ee.filled&&ee.filled.state==="placed"),j=G?`FORRT ${Mi[Bt].name}`:"My FORRT tower",rt=tt(X()),it=Vd({sourceCanvas:st.canvas,title:j,bricks:Kt(),courses:Jt(),stability:rt.pct,blueprintDone:H});et.visible=y,dt.forEach((ee,Se)=>{ee.hint.visible=T[Se]}),Le=!0,ge.photos++,h.pick();let Ot=G?Bt:"tower";await Gd(it,`forrt-${Ot}.png`);let Ht=`Postcard saved as forrt-${Ot}.png.`;return ze("Postcard saved",!1),!z&&!xt&&(st.hint.textContent=Ht),Mt(Ht),{width:it.width,height:it.height,filename:`forrt-${Ot}.png`}}function of(y){let T=Gt(y);if(y.pointerType==="touch"&&ce){let G=Math.hypot(T.x-ce.down.x,T.y-ce.down.y);G>=Qs&&(ce.lift=Math.max(ce.lift,Math.min(js,G*1.5))),T.y-=ce.lift}return T}let af=y=>y.x>=0&&y.y>=0&&y.x<=Nt.width&&y.y<=Nt.height;function lf(y){if(ce||!cn||z||xt||y.pointerType==="mouse"&&y.button!==0)return;h.unlock();let T=Gt(y);y.preventDefault(),Si(T)||($=null),st.stage.classList.remove("tg-keys"),xe=null,st.canvas.setPointerCapture(y.pointerId),ce={id:y.pointerId,down:T,lift:0,point:T},Fe(je(T))}function cf(y){let T=y.target.closest(".tg-style");!T||ce||!cn||(h.unlock(),Ie(T.dataset.type,!0),T.releasePointerCapture?.(y.pointerId),ce={id:y.pointerId,down:Gt(y),lift:y.pointerType==="touch"?js:0,fromTray:!0,point:null},xe=null)}function hf(y){if(ce&&y.pointerId===ce.id){let T=of(y);ce.point=af(T)?T:null,ce.point&&!Si(ce.point)&&($=null),Fe(ce.point&&!xt?je(ce.point):null)}else!ce&&y.pointerType==="mouse"&&cn&&y.target===st.canvas&&(bn=Gt(y),xe=null,Si(bn)||($=null),Fe(z||xt?null:je(bn)))}function Ul(y){if(!ce||y.pointerId!==ce.id)return;let{fromTray:T,point:G}=ce,H=y.type!=="pointerup",j=!H&&G&&ce.point;if(ce=null,j&&!z&&!xt){let rt=je(G),it=performance.now(),Ot=$&&it-$.t<no&&Si(G);rt&&!Ot&&er(rt)?(ge.drops++,$={t:it,x:G.x,y:G.y,i:rt.i,j:rt.j}):!rt&&!T&&!Ot&&(ge.misses++,st.hint.textContent=Ks(G)?"That stack has reached the height limit.":"No studs there. Point at the top of the tower.")}y.pointerType==="mouse"&&bn&&!H&&!z&&!xt?Fe(je(Gt(y))):Fe(null),bn=y.pointerType==="mouse"?bn:null}let Fl=!1;function sr(){let[y,T]=an(L,Z());xe.i=Math.min(xe.i,li-y+1),xe.j=Math.min(xe.j,li-T+1);let G=U(L,xe.i,xe.j,Z());return Fe(G&&!xt?Y(L,xe.i,xe.j,Z(),G):null),G}function uf(y){let T=y.key.toLowerCase();if(y.ctrlKey||y.metaKey||y.altKey||!st.note.hidden||!st.warn.hidden)return;h.unlock();let G=/^(?:Digit|Numpad)(\d)$/.exec(y.code)?.[1]??(/^\d$/.test(T)?T:null);if(G!==null){let j=eo[(+G+9)%10];Ie(j,!0),Mt(`${Pe[j].label} chosen.`);return}if(T==="r"){In();return}if(T==="t"){Ol();return}if(T==="m"){Bl();return}if(T==="tab"&&(Fl=!0),y.target!==st.stage)return;let H={arrowleft:[-1,0],arrowright:[1,0],arrowup:[0,-1],arrowdown:[0,1]}[T];if(H){if(y.preventDefault(),!xe)xe={i:0,j:0};else{let[rt,it]=H;for(let ee=0;ee<C;ee++)[rt,it]=[it,-rt];let[Ot,Ht]=an(L,Z());xe.i=Math.max(ai,Math.min(li-Ot+1,xe.i+rt)),xe.j=Math.max(ai,Math.min(li-Ht+1,xe.j+it))}let j=sr();Mt(j?`Column ${xe.i+5}, row ${xe.j+5}, height ${j.level}, held by ${j.studs} ${j.studs===1?"stud":"studs"}${vn&&q(vn)?", too wobbly":""}.`:`Column ${xe.i+5}, row ${xe.j+5}: nothing to build on.`)}else if((T==="enter"||T===" ")&&xe&&!z&&!xt){y.preventDefault();let j=sr();j?er(Y(L,xe.i,xe.j,Z(),j))&&(ge.keyboard++,ge.drops++,sr()):Mt("Nothing to build on here.")}}function Ol(){F||($=null,C=(C+1)%4,ge.turns++,h.turn(),F={from:se,to:se+Math.PI/2,t:0},Me(),Fe(null),Mt(`View turned, side ${C+1} of 4.`),un.matches&&(F.t=1,Uh()),Le=!0)}function Uh(){se=F.to%(Math.PI*2),F=!1,Et(),Ut(),fn()}function Bl(){h.enabled=!h.enabled,st.sound.setAttribute("aria-pressed",String(h.enabled)),st.sound.setAttribute("aria-label",h.enabled?"Sound on":"Sound off"),h.enabled&&(h.unlock(),h.pick()),Mt(h.enabled?"Sound effects on.":"Sound effects muted.")}st.canvas.addEventListener("pointerdown",lf),st.tray.addEventListener("pointerdown",cf),st.d.addEventListener("pointermove",hf),st.d.addEventListener("pointerup",Ul),st.d.addEventListener("pointercancel",Ul),st.d.addEventListener("keydown",uf),st.canvas.addEventListener("pointerleave",()=>{ce||(bn=null,Fe(null))}),st.stage.addEventListener("focus",()=>{st.stage.classList.toggle("tg-keys",Fl),Fl=!1}),st.stage.addEventListener("blur",()=>{xe&&(xe=null,Fe(null))}),st.tray.addEventListener("click",y=>{let T=y.target.closest(".tg-style");T&&(h.unlock(),Ie(T.dataset.type,!1),Mt(`${Pe[T.dataset.type].label} chosen.`))}),st.d.querySelector("#tg-plans").addEventListener("click",y=>{let T=y.target.closest(".tg-plan-pill");T&&(h.unlock(),_e(T.dataset.plan,!0))}),st.d.querySelector("#tg-looks").addEventListener("click",y=>{let T=y.target.closest(".tg-look");if(!T)return;h.unlock(),h.pick(),zn(T.dataset.look);let G={grey:"New bricks will be grey. Done gives grey bricks their pride stripes.",brick:"New bricks will be red brick. Bricks already placed keep their look.",pride:"New bricks take a pride colour from their height, so stripes rise as you build."}[T.dataset.look];!z&&!ce&&(st.hint.textContent=G),Mt(G)}),st.warnGo.addEventListener("click",oo),st.warnAnyway.addEventListener("click",()=>{h.unlock(),Kd()}),st.warn.addEventListener("keydown",y=>{y.repeat&&y.preventDefault()}),st.rotate.addEventListener("click",()=>{h.unlock(),In()}),st.view.addEventListener("click",()=>{h.unlock(),Ol()}),st.undo.addEventListener("click",()=>{h.unlock(),Lh()}),st.next.addEventListener("click",()=>{h.unlock(),tf()}),st.finish.addEventListener("click",()=>{h.unlock(),ef()}),st.restart.addEventListener("click",()=>{h.unlock(),Dh()}),st.topple.addEventListener("click",Ch),st.photo.addEventListener("click",()=>{Nh()}),st.sound.addEventListener("click",Bl),st.done.addEventListener("click",()=>{performance.now()-K<400||(K=performance.now(),h.unlock(),z?(us(),be(),fn()):lt.length&&Nl())}),st.hints.addEventListener("click",()=>{if(h.unlock(),h.pick(),Bt==="free"){_e(ye,!0);return}x=!x,be(),fn(),Mt(x?`Hints on. ${gt().length} places outlined.`:"Hints off.")});let zl=!1;st.canvas.addEventListener("webglcontextlost",y=>{y.preventDefault(),zl=!0,st.hint.textContent="The browser reset its graphics. Waiting for it to come back.",ge.lost++}),st.canvas.addEventListener("webglcontextrestored",()=>{zl=!1,ft(),be()});function Fh(y){if(Zn=0,!cn)return;let T=Math.min(.05,Xi?(y-Xi)/1e3:0);Xi=y;let G=[];for(let H of[...wt]){if(H.t+=T,H.t<0)continue;H.part.object.visible=!0;let j=to(H.t/H.d),rt=j*j;H.part.object.position.y=H.high+(H.part.rest.y-H.high)*rt,Le=!0,j===1&&(wt.delete(H),G.push(H.part))}for(let H of G)tr(H),Sn||qi();if(d.tick(T)&&(Le=!0),vn&&io&&et.visible&&!un.matches){Dt+=T*(hs==="wobbly"?42:24);let H=hs==="wobbly"?.018:.008;et.position.set(vn.x+Math.sin(Dt)*H,vn.y,vn.z+Math.cos(Dt*1.3)*H),Le=!0}if(Yt)if(un.matches)Yt.advanceBudget(16,40),Yt.settled&&(Le=!0,ao());else{if(kt-=T,kt<=0&&Yt.advance(T),Le=!0,Ae-=T,Ae<=0&&!Sn){Ae=.25;let H=ct();H.t-H.b>Wt.t-Wt.b+.01&&qi()}Yt.settled&&ao()}for(let H of[...It]){H.t+=T/.25;let j=1-to(H.t);H.part.object.scale.setScalar(Math.max(.001,j)),Le=!0,H.t>=1&&(It.delete(H),ie(H.part),Sn||qi())}if(Sn){Sn.t+=T/.28;let H=un.matches?1:Tl(Sn.t);for(let j of"lrtb")Wt[j]=Sn.from[j]+(Sn.to[j]-Sn.from[j])*H;Rt(),(Sn.t>=1||un.matches)&&(Sn=null,fn())}if(F&&(F.t+=T/.42,se=F.from+(F.to-F.from)*Tl(F.t),Et(),Ut(),F.t>=1&&Uh()),Qe){Qe.t+=T;let H=to(Qe.t/3);for(let j of lt)j.material.color.lerpColors(j.stone,j.pride,Tl((H-to(j.cell.level/Qe.top)*.6)/.4));o.rotation.y=Qe.t>3?Tl((Qe.t-3)/3)*Math.PI*2:0,Qe.t>6&&(Qe=null,o.rotation.y=0),Le=!0}Le&&!zl&&(i.render(t,e),ge.frames++,Le=!1),Zn=requestAnimationFrame(Fh)}let df=()=>{cn||(cn=!0,Xi=0,Le=!0,Zn=requestAnimationFrame(Fh))},ff=()=>{cn=!1,de++,Zt=!1,!Yt&&![...wt].some(y=>y.part.topples)&&(xt=!1),cancelAnimationFrame(Zn),Zn=0,he(),d.clear(),h.close(),ce&&Ul({pointerId:ce.id,type:"pointercancel"}),st.warn.hidden||(nr=null,oo()),Fe(null),be()},lo={grey:{},brick:{},pride:{}};function pf(){let y=new Ls;y.add(new zs(16777215,9143161,2.1));let T=new Ui(16776182,3.2);T.position.set(-3,11,6),y.add(T);let G=new _i(-.82,.82,.5,-.5,.1,20);G.position.set(3.7,4.4,5.1),G.lookAt(0,0,0);let H=new Ne(p.b1x1,c[4]);y.add(H),i.setSize(164,100,!1);let j=c[4].clone();j.color.set(wh[0]);let rt=c[4].clone();rt.color.set("#d5dadc");let it=document.createElement("canvas");it.width=164,it.height=100;let Ot=it.getContext("2d"),Ht=Ot.createLinearGradient(30,0,134,0);Hi.forEach((ee,Se)=>{Ht.addColorStop(Se/6,ee),Ht.addColorStop((Se+1)/6,ee)});for(let ee of eo)H.geometry=p[ee],H.material=c[4],i.render(y,G),lo.grey[ee]=st.canvas.toDataURL(),H.material=j,i.render(y,G),lo.brick[ee]=st.canvas.toDataURL(),H.material=rt,i.render(y,G),Ot.globalCompositeOperation="source-over",Ot.clearRect(0,0,164,100),Ot.drawImage(st.canvas,0,0),Ot.globalCompositeOperation="multiply",Ot.fillStyle=Ht,Ot.fillRect(0,0,164,100),Ot.globalCompositeOperation="destination-in",Ot.drawImage(st.canvas,0,0),lo.pride[ee]=it.toDataURL();H.geometry=p.b1x4,H.material=c[4],i.render(y,G),st.d.querySelector("#tg-turn-a").src=st.canvas.toDataURL(),H.rotation.y=Math.PI/2,i.render(y,G),st.d.querySelector("#tg-turn-b").src=st.canvas.toDataURL(),j.dispose(),rt.dispose()}return pf(),Et(),ft(),new ResizeObserver(()=>{ft(),cn&&i.render(t,e)}).observe(st.stage),zn(fe),_e("free",!1),Ie(L),{hideWarning:oo,strainWith:X,holdOf:D,tooWobbly:q,stabilityInfo:tt,STRAIN_LIMIT:Zs,ghostSkin:yt,ghostLine:ot,ghostBody:St,colourOf:Tt,start:df,stop:ff,resize:ft,renderer:i,stats:ge,bricks:pt,slots:dt,camera:e,scene:t,model:o,ghost:et,overlay:u,project:qt,placedCount:Kt,maxPlates:Ct,maxCourses:Jt,frame:Nt,openSlots:gt,landing:U,targetAt:je,freeTargetAt:cs,surfaceCell:Ks,history:lt,flights:wt,commit:ro,land:tr,spawn:Qt,restart:Dh,undo:Lh,select:Ie,selectBlueprint:_e,rotateBrick:In,turnView:Ol,placeBrick:er,makeTarget:Y,toppleTower:Ch,savePhoto:Nh,toggleSound:Bl,castRay:dn,raycaster:we,sound:h,effects:d,milestones:zt,get currentPlan(){return Bt},get drag(){return ce},get aim(){return vn},get cursor(){return xe},get busy(){return!!(wt.size||Sn||F||xt)},get toppling(){return xt},get collapse(){return Yt},get lastCollapse(){return Re},get worstHold(){return Q},get selected(){return L},get look(){return fe},get view(){return C},get hintsOn(){return x},get done(){return z},get rot(){return Z()},MIN_CELL:ai,MAX_CELL:li,MAX_PLATES:Al,mesh:v,foundationTop:l,TYPES:Pe,TYPE_KEYS:eo,BLUEPRINTS:wl,footprint:an,heightOf:P}}var qd=!1;function Yd(){st.note.hidden=!1,st.wrap.inert=!0,st.noteGo.focus({preventScroll:!0})}function $d(){st.note.hidden=!0,st.wrap.inert=!1,st.styles.find(i=>i.getAttribute("aria-pressed")==="true").focus({preventScroll:!0})}function I_(){if(st||(st=C_(),st.close.addEventListener("click",()=>st.d.close()),st.help.addEventListener("click",Yd),st.noteGo.addEventListener("click",$d),st.d.addEventListener("cancel",t=>{st.note.hidden?st.warn.hidden||(t.preventDefault(),Js.hideWarning()):(t.preventDefault(),$d())}),st.d.addEventListener("close",()=>{Js?.stop(),document.documentElement.classList.remove("tg-lock"),window.forrtHeroSuspend?.(!1)})),st.d.open)return;window.forrtHeroSuspend?.(!0),document.documentElement.classList.add("tg-lock"),st.d.showModal();let i=performance.now();try{Js||(Js=R_()),window.towerGame.setupMs=window.towerGame.setupMs||performance.now()-i,Js.resize(),Js.start(),!qd||!st.note.hidden?(qd=!0,Yd()):st.styles.find(t=>t.getAttribute("aria-pressed")==="true").focus({preventScroll:!0})}catch(t){st.hint.textContent="This browser could not start the game.",console.warn("Tower game could not start:",t.message)}}window.towerGame={open:I_,close:()=>st?.d.close()};})();
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
