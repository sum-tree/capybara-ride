const fs = require('fs');
const path = require('path');

const vendorDir = path.join(__dirname, 'vendor');
const vendorPrelude = fs.readFileSync(path.join(vendorDir, 'vendor_prelude.js'), 'utf8');
const gameRef = fs.readFileSync(path.join(vendorDir, 'game_ref.js'), 'utf8');

// Extract unchanged core modules from game_ref.js using exact marker boundaries:
const idxFa = gameRef.indexOf('function ji(i,t){');
const idxWorld = gameRef.indexOf('function Ba(i,t,e,n=0){');
const idxGd = gameRef.indexOf('function Sh(){');
const idxW0 = gameRef.indexOf('var lo,Th,wh,Ah,w0=ze(');
const idxA0 = gameRef.indexOf('var co,Rh,A0=ze(');
const idxHE = gameRef.indexOf('var hE=dg(');

const coreMathSkyOcean = gameRef.slice(0, idxFa);
const coreWorld = gameRef.slice(idxWorld, idxGd);

// Custom 06_Fa_textures (Capybara road stencil, Capybara signs, fur bump map, bike decal)
const customFaTextures = `function ji(i,t){let e=document.createElement("canvas");return e.width=i,e.height=t,[e,e.getContext("2d")]}
function Qi(i,{srgb:t=!0,repeat:e=!0,aniso:n=8}={}){let s=new Go(i);return t&&(s.colorSpace=Pn),e&&(s.wrapS=s.wrapT=Pr),s.anisotropy=n,s.needsUpdate=!0,s}
function oS(i,t,e){let n=yi(e),s=new Float32Array(i*i),r=1,o=0;for(let a=0;a<t;a++){let l=4<<a,c=new Float32Array(l*l);for(let h=0;h<c.length;h++)c[h]=n();for(let h=0;h<i;h++){let d=h/i*l,u=Math.floor(d),f=d-u,m=f*f*(3-2*f);for(let y=0;y<i;y++){let g=y/i*l,p=Math.floor(g),M=g-p,b=M*M*(3-2*M),v=c[u%l*l+p%l],E=c[u%l*l+(p+1)%l],T=c[(u+1)%l*l+p%l],C=c[(u+1)%l*l+(p+1)%l];s[h*i+y]+=r*((v*(1-b)+E*b)*(1-m)+(T*(1-b)+C*b)*m)}}o+=r,r*=.5}for(let a=0;a<s.length;a++)s[a]/=o;return s}
function a0(i=256,t=.78,e=1,n=7){let[s,r]=ji(i,i),o=oS(i,6,n),a=r.createImageData(i,i);for(let l=0;l<o.length;l++){let c=Math.round((t+(e-t)*o[l])*255);a.data[l*4]=c,a.data[l*4+1]=c,a.data[l*4+2]=c,a.data[l*4+3]=255}return r.putImageData(a,0,0),Qi(s,{srgb:!1})}
function l0(){
  let[e,n]=ji(2048,512),[s,r]=ji(2048,512),o=yi(42);
  n.fillStyle="#44464b",n.fillRect(0,0,2048,512),r.fillStyle="#808080",r.fillRect(0,0,2048,512);
  for(let m=0;m<9e4;m++){
    let y=o()*2048,g=o()*512,p=o()*2.2+.6,M=Math.floor(40+o()*70);
    n.fillStyle=\`rgb(\${M},\${M+1},\${M+4})\`,n.fillRect(y,g,p,p);
    let b=Math.floor(90+o()*120);
    r.fillStyle=\`rgb(\${b},\${b},\${b})\`,r.fillRect(y,g,p,p);
  }
  for(let m=0;m<6;m++){
    n.fillStyle=\`rgba(20,20,24,\${.12+o()*.12})\`;
    let y=o()*2048,g=o()*512;
    n.fillRect(y,g,60+o()*160,30+o()*90);
  }
  let a=n.createLinearGradient(0,0,0,512);
  a.addColorStop(0,"rgba(0,0,0,0)"),a.addColorStop(.3,"rgba(0,0,0,0.10)"),a.addColorStop(.36,"rgba(0,0,0,0)"),a.addColorStop(.64,"rgba(0,0,0,0)"),a.addColorStop(.7,"rgba(0,0,0,0.10)"),a.addColorStop(1,"rgba(0,0,0,0)");
  n.fillStyle=a,n.fillRect(0,0,2048,512);
  let l=2048/24,c=512/5.4,h=(m,y,g,p,M="#ecebe2")=>{
    n.fillStyle=M,n.fillRect(m*l,y*c,g*l,p*c),r.fillStyle="#c8c8c8",r.fillRect(m*l,y*c,g*l,p*c)
  };
  h(0,.18,24,.12),h(0,5.1,24,.12);
  for(let m=0;m<24;m+=6)h(m,2.64,3,.12,"#f2c94c");
  // Road bike lane stencil: Capybara with tangerine on head riding bicycle!
  n.save(),n.translate(12*l,4*c),n.rotate(Math.PI/2),n.scale(c,l),n.strokeStyle="rgba(236,235,226,0.92)",n.fillStyle="rgba(236,235,226,0.92)",n.lineWidth=.09,n.lineCap="round",n.lineJoin="round";
  let d=.42;
  n.beginPath(),n.arc(-.62,.35,d,0,Math.PI*2),n.stroke();
  n.beginPath(),n.arc(.62,.35,d,0,Math.PI*2),n.stroke();
  n.beginPath(),n.moveTo(-.62,.35),n.lineTo(-.1,.35),n.lineTo(.35,-.2),n.lineTo(-.3,-.2),n.closePath(),n.moveTo(-.1,.35),n.lineTo(-.36,-.42),n.moveTo(.62,.35),n.lineTo(.42,-.5),n.lineTo(.6,-.55),n.moveTo(-.5,-.45),n.lineTo(-.2,-.45),n.stroke();
  // Capybara chubby body + blunt head + tangerine on top
  n.beginPath(),n.ellipse(-.12,-.55,.32,.24,-.4,0,Math.PI*2),n.fill();
  n.beginPath(),n.roundRect(-.05,-.95,.42,.26,.12),n.fill();
  n.beginPath(),n.arc(-.02,-.98,.07,0,Math.PI*2),n.fill();
  n.fillStyle="rgba(255,165,50,0.95)";
  n.beginPath(),n.arc(.12,-1.06,.09,0,Math.PI*2),n.fill();
  n.fillStyle="rgba(236,235,226,0.92)";
  n.beginPath(),n.moveTo(0,-2.9),n.lineTo(.45,-2.3),n.lineTo(.16,-2.3),n.lineTo(.16,-1.6),n.lineTo(-.16,-1.6),n.lineTo(-.16,-2.3),n.lineTo(-.45,-2.3),n.closePath(),n.fill();
  n.restore();
  let u=Qi(e,{aniso:16}),f=Qi(s,{srgb:!1,aniso:16});
  return{map:u,bump:f};
}
function c0(){
  // Capybara soft coarse fur bump map
  let[t,e]=ji(512,512),o=yi(99);
  e.fillStyle="#808080",e.fillRect(0,0,512,512);
  for(let a=0;a<14000;a++){
    let x=o()*512,y=o()*512,len=8+o()*14,ang=(o()-.5)*.35;
    let v=Math.floor(70+o()*125);
    e.strokeStyle=\`rgba(\${v},\${v},\${v},0.42)\`;
    e.lineWidth=1.2+o()*1.6;
    e.beginPath(),e.moveTo(x,y),e.lineTo(x+Math.cos(ang)*len,y+Math.sin(ang)*len),e.stroke();
  }
  return Qi(t,{srgb:!1});
}
function h0(){
  let[t,e]=ji(256,256);
  e.fillStyle="#6b4424",e.fillRect(0,0,256,256);
  let n=8,s=256/n;
  for(let r=0;r<n;r++)for(let o=0;o<n;o++){
    let l=(o+r)%2===0?e.createLinearGradient(0,r*s,0,(r+1)*s):e.createLinearGradient(o*s,0,(o+1)*s,0);
    l.addColorStop(0,"#7a4f2a"),l.addColorStop(.5,"#d9a766"),l.addColorStop(1,"#6e4524"),e.fillStyle=l,e.fillRect(o*s+2,r*s+2,s-4,s-4);
  }
  return Qi(t);
}
function Mh(){
  let[t,e]=ji(128,128),n=e.createRadialGradient(64,64,0,64,64,64);
  return n.addColorStop(0,"rgba(255,255,255,1)"),n.addColorStop(.25,"rgba(255,255,255,0.8)"),n.addColorStop(1,"rgba(255,255,255,0)"),e.fillStyle=n,e.fillRect(0,0,128,128),Qi(t,{repeat:!1});
}
function u0(i){
  let[t,e]=ji(1024,128);
  e.clearRect(0,0,1024,128),e.font='italic 900 88px "Arial Black", "Helvetica Neue", Arial, sans-serif',e.textAlign="center",e.textBaseline="middle",e.lineWidth=10,e.strokeStyle="#1b1b1b",e.strokeText(i,512,68);
  let n=e.createLinearGradient(0,20,0,110);
  return n.addColorStop(0,"#fff3c4"),n.addColorStop(1,"#ff9f38"),e.fillStyle=n,e.fillText(i,512,68),Qi(t,{repeat:!1});
}
function aS(i,t,e,n){
  // Capybara on a bike warning sign icon
  i.save(),i.translate(t,e),i.scale(n,n),i.fillStyle="#161616",i.strokeStyle="#161616",i.lineWidth=.09,i.lineCap="round";
  i.beginPath(),i.arc(-.62,.62,.34,0,Math.PI*2),i.stroke();
  i.beginPath(),i.arc(.62,.62,.34,0,Math.PI*2),i.stroke();
  i.beginPath(),i.moveTo(-.62,.62),i.lineTo(-.05,.62),i.lineTo(.4,.15),i.lineTo(-.3,.15),i.closePath(),i.moveTo(.62,.62),i.lineTo(.42,-.05),i.stroke();
  // Chubby capybara torso
  i.beginPath(),i.ellipse(-.22,-.08,.40,.28,-.42,0,Math.PI*2),i.fill();
  // Blunt capybara head/snout
  i.beginPath(),i.ellipse(.16,-.48,.28,.20,-.08,0,Math.PI*2),i.fill();
  // Little round ear
  i.beginPath(),i.arc(-.04,-.66,.08,0,Math.PI*2),i.fill();
  // Tangerine on head!
  i.fillStyle="#e86f00";
  i.beginPath(),i.arc(.15,-.76,.11,0,Math.PI*2),i.fill();
  i.restore();
}
function d0(i){
  let[e,n]=ji(512,512);
  return n.clearRect(0,0,512,512),i==="crossing"?(
    n.save(),n.translate(256,256),n.rotate(Math.PI/4),n.fillStyle="#161616",n.fillRect(-172,-172,344,344),n.fillStyle="#f7c531",n.fillRect(-160,-160,320,320),n.restore(),aS(n,256,250,118)
  ):i==="speed"?(
    n.fillStyle="#ffffff",n.beginPath(),n.arc(256,256,230,0,Math.PI*2),n.fill(),n.lineWidth=42,n.strokeStyle="#d7263d",n.beginPath(),n.arc(256,256,200,0,Math.PI*2),n.stroke(),n.fillStyle="#111",n.font='900 190px "Arial Black", Arial, sans-serif',n.textAlign="center",n.textBaseline="middle",n.fillText("45",256,238),n.font='700 46px "PingFang SC", "Microsoft YaHei", sans-serif',n.fillText("水豚限速",256,366)
  ):(
    n.fillStyle="#0f5fa8",o0(n,20,110,472,292,34),n.fill(),n.lineWidth=12,n.strokeStyle="#ffffff",o0(n,36,126,440,260,24),n.stroke(),n.fillStyle="#fff",n.font='800 76px "PingFang SC", "Microsoft YaHei", sans-serif',n.textAlign="center",n.textBaseline="middle",n.fillText("前方有橘",256,216),n.font='700 44px "Arial", sans-serif',n.fillText("YUZU AHEAD  ➜",256,312)
  ),Qi(e,{repeat:!1});
}
function o0(i,t,e,n,s,r){i.beginPath(),i.moveTo(t+r,e),i.arcTo(t+n,e,t+n,e+s,r),i.arcTo(t+n,e+s,t,e+s,r),i.arcTo(t,e+s,t,e,r),i.arcTo(t,e,t+n,e,r),i.closePath()}
function f0(i,t=8,e=!1){let[n,s]=ji(256,256);for(let r=0;r<t;r++)s.fillStyle=i[r%i.length],e?s.fillRect(r*256/t,0,256/t+1,256):s.fillRect(0,r*256/t,256,256/t+1);return Qi(n)}
var Fa=ze(()=>{je();Ki()});`;

// Custom 08_Gd_tangerine_item (Sh() = 3D Tangerine, ShFish() = 3D Fish for ocean splash jumpers)
const customGdItem = `function Sh(){
  if(za)return za;
  // 3D Procedural Tangerine / Mandarin (蜜柑 🍊)
  let sph=new he(.088,28,20);
  let pos=sph.attributes.position;
  let colArr=new Float32Array(pos.count*3);
  let cBot=new ft("#ff5500"),cMid=new ft("#ff8814"),cTop=new ft("#ffae32"),cTmp=new ft;
  for(let k=0;k<pos.count;k++){
    let x=pos.getX(k),y=pos.getY(k),z=pos.getZ(k);
    let rXZ=Math.hypot(x,z),ang=Math.atan2(z,x);
    let rib=1+.026*Math.cos(ang*10);
    let ny=y/.088;
    let dimple=1-.18*Math.pow(Math.abs(ny),5);
    pos.setXYZ(k,x*1.06*rib,y*.84*dimple,z*1.06*rib);
    let t=Le((ny+1)*.5,0,1);
    cTmp.copy(cBot).lerp(cMid,ve(0,.55,t)).lerp(cTop,ve(.55,1,t));
    cTmp.offsetHSL(0,0,(Math.cos(ang*10))*.015);
    colArr.set([cTmp.r,cTmp.g,cTmp.b],k*3);
  }
  sph.setAttribute("color",new re(colArr,3));
  sph.computeVertexNormals();
  // Green calyx star & short stem
  let calyx=ye(fe(new Re(.018,.006,.012,8).translate(0,.066,0)),"#2d6e1e");
  let stem=ye(fe(new Re(.0045,.0065,.024,6).rotateZ(-.15).translate(.002,.076,0)),"#3f6122");
  // Cute curved citrus leaf
  let leafShape=new bn;
  leafShape.moveTo(0,0);
  leafShape.quadraticCurveTo(.032,.024,.068,.008);
  leafShape.quadraticCurveTo(.036,-.020,0,0);
  let leafGeom=new na(leafShape,{depth:.004,bevelEnabled:!0,bevelThickness:.002,bevelSize:.002,bevelSegments:1,curveSegments:8});
  leafGeom.rotateX(-.45);
  leafGeom.rotateZ(.28);
  leafGeom.translate(.003,.076,.004);
  let leaf=ye(fe(leafGeom),"#4cb528");
  za=Tn([fe(sph),calyx,stem,leaf]);
  za.computeBoundingSphere();
  return za;
}
function ShFish(){
  if(zaFish)return zaFish;
  let i=.3,t=new ft("#2b6f93"),e=new ft("#eef4f6"),n=new ft("#8fd3e8"),s=Zi({segs:24,ring:16,center:d=>Ft((d-.5)*i,Math.sin(d*Math.PI)*.004,0),section:(d,u)=>{let f=u*xe,m=Math.sin(Math.PI*Math.pow(d,.8)),y=Math.pow(m,.85)*.055+.002,g=Math.pow(m,1.1)*.024+.001;return[Math.cos(f)*y,Math.sin(f)*g]},color:(d,u,f)=>{let m=Math.cos(u*xe);f.copy(e).lerp(t,Zs.smoothstep(m,-.2,.6)),Math.abs(m)<.15&&d>.2&&d<.85&&f.lerp(n,.6)}}),r=new bn;r.moveTo(0,0),r.quadraticCurveTo(-.05,.03,-.085,.07),r.quadraticCurveTo(-.06,0,-.085,-.07),r.quadraticCurveTo(-.05,-.03,0,0);let o=new qn(r,6);o.translate(-i/2+.01,0,0);let a=new bn;a.moveTo(.04,0),a.quadraticCurveTo(0,.05,-.05,.035),a.lineTo(-.05,0),a.closePath();let l=new qn(a,4);l.translate(0,.048,0);let c=new he(.009,8,6).translate(.1,.012,.016),h=new he(.009,8,6).translate(.1,.012,-.016);return zaFish=Tn([fe(s),ye(fe(o),"#3d86ad"),ye(fe(l),"#3d86ad"),ye(fe(c),"#0c0c0c"),ye(fe(h),"#0c0c0c")]),zaFish.computeBoundingSphere(),zaFish
}
var za,zaFish,Gd=ze(()=>{je();yh();Ki();za=null;zaFish=null});`;

// Custom 09_y0_bike (with CAPYBARA decal, basket tangerines stack, rubber ducky, daisy flower, neon rims, and skin switcher)
const customY0Bike = `function SS(){
  return{
    paint:new fn({color:"#138a8a",metalness:.35,roughness:.32,clearcoat:1,clearcoatRoughness:.12,emissive:new ft("#000000"),emissiveIntensity:0}),
    chrome:new Jt({color:"#d9dde2",metalness:1,roughness:.24}),
    dark:new Jt({color:"#1c1d1f",metalness:.2,roughness:.85}),
    tire:new Jt({color:"#161616",roughness:.92}),
    tan:new Jt({color:"#c79a64",roughness:.8}),
    leather:new fn({color:"#6e3f22",roughness:.55,clearcoat:.4,clearcoatRoughness:.4}),
    cream:new fn({color:"#efe6cf",roughness:.35,clearcoat:.8,metalness:.1}),
    reflector:new Jt({color:"#ff8a1f",emissive:new ft("#ff6a00"),emissiveIntensity:.25,roughness:.3}),
    lens:new Jt({color:"#fffbe8",emissive:new ft("#fff1c4"),emissiveIntensity:.3,roughness:.1}),
    tail:new Jt({color:"#ff2a2a",emissive:new ft("#ff1010"),emissiveIntensity:.4,roughness:.3}),
    neonCyan:new Jt({color:"#00f5ff",emissive:new ft("#00e5ff"),emissiveIntensity:2.2,roughness:.2}),
    neonPink:new Jt({color:"#ff3df0",emissive:new ft("#ff2ae8"),emissiveIntensity:1.8,roughness:.2})
  }
}
function _0(i){
  let t=new se,e=es,n=new rt(new ti(e-.018,.018,12,72),i.tire),s=new rt(new ti(e-.03,.0125,8,72),i.tan),r=new rt(new ti(e-.04,.007,8,72),i.chrome),o=new rt(new Re(.018,.018,.1,14).rotateX(Math.PI/2),i.chrome),a=new Re(.026,.026,.006,16).rotateX(Math.PI/2),l=new rt(a,i.chrome);
  l.position.z=.034;let c=l.clone();c.position.z=-.034;
  let neonRim=new rt(new ti(e-.03,.0055,10,72),i.neonCyan);
  neonRim.visible=!1;
  let h=[],d=28,u=Ft(0,1,0);
  for(let b=0;b<d;b++){
    let v=b%2?1:-1,E=(Math.floor(b/2)%2?1:-1)*.42,T=b/d*xe,C=T+E,x=Ft(Math.cos(C)*.024,Math.sin(C)*.024,v*.034),w=Ft(Math.cos(T)*(e-.045),Math.sin(T)*(e-.045),v*.004),I=x.distanceTo(w),U=new Re(.0014,.0014,I,4,1),z=new Oe().setFromUnitVectors(u,w.clone().sub(x).normalize()),W=new ee().compose(x.clone().lerp(w,.5),z,Ft(1,1,1));
    U.applyMatrix4(W),h.push(U);
  }
  let f=new rt(Tn(h),i.chrome),m=new _i({color:"#c9ced4",transparent:!0,opacity:0,depthWrite:!1,side:Se}),y=new rt(new sa(.03,e-.045,48,1),m),g=new rt(new Re(.004,.004,.03,6),i.chrome);
  g.position.set(0,e-.055,0);
  let p=new rt(new Pe(.05,.018,.006),i.reflector);
  p.position.set(0,-(e*.62),.012),p.rotation.z=Math.PI/2;
  let M=new se;
  M.add(n,s,r,o,l,c,f,y,g,p,neonRim);
  for(let b of[n,s,r,o,f])b.castShadow=!0,b.receiveShadow=!0;
  return t.add(M),{group:t,rot:M,blurMat:m,neonRim}
}
function x0(i,t,e){
  let n=[];n.push(new ti(t-.004,.005,6,48));
  for(let r=0;r<i;r++){
    let o=r/i*xe,a=new Pe(.008,.009,.004);
    a.rotateZ(o),a.translate(Math.cos(o)*(t+.002),Math.sin(o)*(t+.002),0),n.push(a.toNonIndexed());
  }
  let s=Tn(n.map(r=>{let o=r.index?r.toNonIndexed():r;return o.deleteAttribute("uv"),o}));
  return new rt(s,e.chrome);
}
function ES(){
  let i=new et(Zt.bb.x,Zt.bb.y),t=new et(Zt.rearHub.x,Zt.rearHub.y),e=ro+.004,n=Wd+.004,s=i.distanceTo(t),r=Math.atan2(t.y-i.y,t.x-i.x),o=Math.acos((e-n)/s),a=r-o,l=r+o,c=[],h=(b,v,E,T,C)=>{for(let x=0;x<C;x++){let w=E+(T-E)*x/C;c.push(new et(b.x+Math.cos(w)*v,b.y+Math.sin(w)*v))}},d=(b,v,E)=>{for(let T=0;T<E;T++)c.push(b.clone().lerp(v,T/E))},u=new et(i.x+Math.cos(a)*e,i.y+Math.sin(a)*e),f=new et(i.x+Math.cos(l)*e,i.y+Math.sin(l)*e),m=new et(t.x+Math.cos(a)*n,t.y+Math.sin(a)*n),y=new et(t.x+Math.cos(l)*n,t.y+Math.sin(l)*n),g=a,p=l-xe;
  h(i,e,g,p,60),d(f,y,40),h(t,n,l,a,24),d(m,u,40);
  let M=[0];for(let b=1;b<=c.length;b++)M.push(M[b-1]+c[b%c.length].distanceTo(c[b-1]));
  return{pts:c,cum:M,length:M[M.length-1]};
}
function TS(i,t,e){
  let n=i.length;t=(t%n+n)%n;
  let{cum:s,pts:r}=i,o=0,a=s.length-1;
  for(;a-o>1;){let d=o+a>>1;s[d]<=t?o=d:a=d}
  let l=r[o%r.length],c=r[(o+1)%r.length],h=(t-s[o])/(s[o+1]-s[o]||1);
  return e.set(l.x+(c.x-l.x)*h,l.y+(c.y-l.y)*h,Math.atan2(c.y-l.y,c.x-l.x)),e;
}
function buildRubberDuck(){
  let g=new se;
  let yellowMat=new fn({color:"#ffd924",roughness:.28,clearcoat:.7});
  let billMat=new fn({color:"#ff7315",roughness:.3,clearcoat:.6});
  let eyeMat=new fn({color:"#111111",roughness:.1,clearcoat:1});
  let body=new rt(new he(.034,16,12),yellowMat);
  body.scale.set(1.22,.86,.96);
  let tail=new rt(new Nn(.016,.028,8),yellowMat);
  tail.position.set(-.036,.01,0);tail.rotation.z=.9;
  let head=new rt(new he(.025,16,12),yellowMat);
  head.position.set(.022,.034,0);
  let bill=new rt(new he(.013,12,8),billMat);
  bill.scale.set(1.35,.42,.95);bill.position.set(.044,.031,0);
  for(let s of[-1,1]){
    let eye=new rt(new he(.0042,8,6),eyeMat);
    eye.position.set(.032,.041,s*.016);
    let wing=new rt(new he(.018,10,8),yellowMat);
    wing.scale.set(1.25,.58,.28);wing.position.set(-.002,.004,s*.032);
    g.add(eye,wing);
  }
  g.add(body,tail,head,bill);
  g.traverse(m=>{if(m.isMesh)m.castShadow=!0});
  return g;
}
function buildDaisyFlower(scale=1){
  let g=new se;
  let centerMat=new Jt({color:"#ffca28",roughness:.5});
  let petalMat=new Jt({color:"#ffffff",roughness:.4});
  let c=new rt(new he(.012*scale,10,8),centerMat);
  c.scale.set(1,.5,1);g.add(c);
  for(let k=0;k<8;k++){
    let a=k/8*xe;
    let p=new rt(new he(.011*scale,8,6),petalMat);
    p.scale.set(1.6,.35,.85);
    p.position.set(Math.cos(a)*.018*scale,0,Math.sin(a)*.018*scale);
    p.rotation.y=-a;
    g.add(p);
  }
  return g;
}
function v0(){
  let i=SS(),t=new se;t.name="bicycle";
  let e=_t=>(t.add(_t),_t),n=Zt.headTop.clone().sub(Zt.headBot).normalize(),s=Zt.headTop.clone().addScaledVector(n,.025),r=Zt.headBot.clone().addScaledVector(n,-.02);
  e(ri(r,s,.021,.021,i.paint)),e(ri(Zt.seat,Zt.headTop.clone().addScaledVector(n,-.02),.016,.016,i.paint)),e(ri(Zt.bb,Zt.headBot.clone().addScaledVector(n,.03),.02,.019,i.paint)),e(ri(Zt.bb,Zt.seat.clone().addScaledVector(Ft(.35,-1,0).normalize(),-.03),.018,.017,i.paint));
  for(let _t of[-1,1]){
    e(ri(Zt.bb.clone().setZ(_t*.02),Zt.rearHub.clone().setZ(_t*.05),.011,.008,i.paint)),e(ri(Zt.seat.clone().add(Ft(0,-.02,_t*.015)),Zt.rearHub.clone().setZ(_t*.05),.009,.007,i.paint));
    let L=new rt(new Pe(.035,.03,.006),i.chrome);L.position.copy(Zt.rearHub).setZ(_t*.052),e(L);
  }
  for(let _t of[Zt.seat,s,r,Zt.headTop.clone().addScaledVector(n,-.02)]){
    let L=new rt(new he(.024,14,10),i.chrome);L.position.copy(_t),e(L);
  }
  let o=new rt(new Re(.025,.025,.085,16).rotateX(Math.PI/2),i.chrome);o.position.copy(Zt.bb),e(o);
  let a=u0("CAPYBARA"),l=new Jt({map:a,transparent:!0,roughness:.3,metalness:.2,polygonOffset:!0,polygonOffsetFactor:-2}),c=Zt.headBot.clone().sub(Zt.bb),h=Math.atan2(c.y,c.x),d=Zt.bb.clone().lerp(Zt.headBot,.5),u=new Un(.3,.036),f=new rt(u,l);
  f.position.copy(d).setZ(.0205),f.rotation.set(0,0,h);
  let m=new rt(u,l);m.position.copy(d).setZ(-.0205),m.rotation.set(0,Math.PI,-h),e(f),e(m);
  // Cute daisy flower badge on downtube (for Style A / Style C)
  let frameFlower=buildDaisyFlower(1.15);
  frameFlower.position.copy(Zt.bb.clone().lerp(Zt.headBot,.68)).setZ(.023);
  frameFlower.rotation.x=Math.PI/2;
  frameFlower.visible=!1;
  e(frameFlower);
  // Neon frame strip (for Style D)
  let neonFrameTube=ri(Zt.bb.clone().setZ(.022),Zt.headBot.clone().setZ(.022),.005,.005,i.neonCyan);
  let neonFrameTube2=ri(Zt.bb.clone().setZ(-.022),Zt.headBot.clone().setZ(-.022),.005,.005,i.neonCyan);
  neonFrameTube.visible=neonFrameTube2.visible=!1;
  e(neonFrameTube),e(neonFrameTube2);

  let y=e(ri(Zt.seat,Zt.saddle.clone().add(Ft(.005,-.02,0)),.012,.012,i.chrome));y.castShadow=!0;
  let g=new he(1,32,16);
  {let _t=g.attributes.position;for(let L=0;L<_t.count;L++){let ut=_t.getX(L),$=_t.getY(L),Et=_t.getZ(L),At=ut>0?1-.68*Math.pow(ut,1.3):1+.08*ut;_t.setXYZ(L,ut*.13,$*($>0?.03:.012),Et*.085*At)}g.computeVertexNormals()}
  let p=new rt(g,i.leather);p.position.copy(Zt.saddle).add(Ft(.01,.018,0)),p.castShadow=!0,e(p);
  for(let _t of[-1,1]){
    let L=[];for(let $=0;$<=60;$++){let Et=$/60,At=Et*xe*5;L.push(Ft(Math.cos(At)*.012,-Et*.045,Math.sin(At)*.012))}
    let ut=new rt(new qi(new Qn(L),120,.0025,5),i.chrome);ut.position.copy(Zt.saddle).add(Ft(-.08,.005,_t*.045)),e(ut);
  }
  let M=new rt(new Pe(.02,.035,.03),i.tail);M.position.copy(Zt.seat).add(Ft(-.025,0,0)),e(M);
  let b=(_t,L)=>{let ut=new Re(es+.022,es+.022,.055,40,1,!0,_t,L);ut.rotateX(Math.PI/2);let $=new rt(ut,i.cream);return $.material.side=Se,$.castShadow=!0,$},v=b(Math.PI*.72,Math.PI*.92);
  v.position.copy(Zt.rearHub),e(v);
  let E=_0(i);E.group.position.copy(Zt.rearHub),e(E.group);
  let T=x0(18,Wd,i);T.position.copy(Zt.rearHub).setZ(.058),e(T);
  let C=new rt(new Pe(.02,.07,.012),i.dark);C.position.copy(Zt.rearHub).add(Ft(.005,-.07,.06)),C.rotation.z=.3,e(C);
  let x=new se;x.position.copy(Zt.bb),e(x);
  let w=x0(44,ro,i);w.position.z=.065,x.add(w);
  for(let _t=0;_t<5;_t++){let L=_t/5*xe,ut=new rt(new Pe(ro*.95,.012,.006),i.chrome);ut.position.set(Math.cos(L)*ro*.47,Math.sin(L)*ro*.47,.066),ut.rotation.z=L,x.add(ut)}
  let I=new Pe(so,.022,.012);I.translate(so/2,0,0);
  let U=new rt(I,i.chrome);U.position.z=.078;
  let z=new rt(I,i.chrome);z.position.z=-.078,z.rotation.z=Math.PI,U.castShadow=z.castShadow=!0,x.add(U,z);
  let W=new Pe(.085,.016,.075),O=_t=>{
    let L=new se,ut=new rt(W,i.dark);ut.castShadow=!0;
    let $=new rt(new Pe(.01,.018,.04),i.reflector);$.position.set(.045,0,0);
    let Et=$.clone();Et.position.x=-.045;
    let At=new rt(new Re(.006,.006,.03,6).rotateX(Math.PI/2),i.chrome);
    return At.position.z=-_t*.045,L.add(ut,$,Et,At),e(L),L;
  },G=O(1),K=O(-1),J=ES(),pt=.0127,tt=Math.floor(J.length/pt),ot=new Pe(pt*1.05,.0065,.009),st=new jn(ot,i.dark,tt);
  st.castShadow=!0,st.frustumCulled=!1,e(st);
  let zt=.062,Ct=new A,le=new ee,te=new Oe,St=Ft(0,0,1),F=Ft(1,1,1),nt=new A,xt=new se;
  xt.position.copy(Zt.headBot),e(xt);
  let Pt=_t=>_t.clone().sub(Zt.headBot);
  for(let _t of[-1,1]){
    let L=[Pt(Zt.headBot.clone().addScaledVector(n,-.02)).setZ(_t*.03),Pt(Zt.headBot.clone().addScaledVector(n,-.14)).setZ(_t*.05),Pt(Zt.frontHub.clone().add(Ft(-.03,.06,0))).setZ(_t*.052),Pt(Zt.frontHub).setZ(_t*.052)],ut=new rt(new qi(new Qn(L),20,.011,8),i.paint);
    ut.castShadow=!0,xt.add(ut);
  }
  let Rt=new rt(new Pe(.04,.03,.12),i.chrome);Rt.position.copy(Pt(Zt.headBot.clone().addScaledVector(n,-.03))),Rt.rotation.z=Math.atan2(n.y,n.x)-Math.PI/2,xt.add(Rt);
  let Xt=_0(i);Xt.group.position.copy(Pt(Zt.frontHub)),xt.add(Xt.group);
  let ce=b(Math.PI*.5,Math.PI*.72);ce.position.copy(Pt(Zt.frontHub)),xt.add(ce);
  let at=Zt.headTop.clone().addScaledVector(n,.02),gt=Zt.headTop.clone().addScaledVector(n,.1),vt=gt.clone().add(Ft(.04,.012,0));
  xt.add(ri(Pt(at),Pt(gt),.012,.012,i.chrome)),xt.add(ri(Pt(gt),Pt(vt),.011,.011,i.chrome));
  let yt=[Ft(.19,.866,-.255),Ft(.26,.866,-.232),Ft(.315,.848,-.13),Ft(vt.x,vt.y,0),Ft(.315,.848,.13),Ft(.26,.866,.232),Ft(.19,.866,.255)].map(Pt),wt=new rt(new qi(new Qn(yt,!1,"centripetal"),64,.0105,8),i.chrome);
  wt.castShadow=!0,xt.add(wt);
  let Wt={};
  for(let _t of[-1,1]){
    let L=ri(Pt(Ft(.255,.866,_t*.234)),Pt(Ft(.185,.866,_t*.256)),.016,.017,i.leather);xt.add(L);
    let ut=new Ue;ut.position.copy(Pt(Ft(.222,.868,_t*.245))),xt.add(ut),Wt[_t>0?"R":"L"]=ut;
  }
  let ct=new se,Mt=new rt(new he(.026,20,10,0,xe,0,Math.PI/2),i.chrome);Mt.name="bell";
  let It=new rt(new Pe(.03,.004,.008),i.chrome);It.position.set(-.02,.004,.012),ct.add(Mt,It),ct.position.copy(Pt(Ft(.318,.862,-.085))),xt.add(ct);
  let P=new se,jt=new rt(new Re(.03,.026,.055,18).rotateZ(Math.PI/2),i.chrome),Yt=new rt(new ds(.026,18).rotateY(Math.PI/2),i.lens);
  Yt.position.x=.028,P.add(jt,Yt),P.position.copy(Pt(Ft(.695,.745,0))),xt.add(P);
  let R=new la("#fff1d0",0,28,.5,.55,1.4);R.position.copy(P.position).add(Ft(.03,0,0));
  let _=new Ue;_.position.copy(R.position).add(Ft(5,-.9,0)),xt.add(R,_),R.target=_;
  // Front Rattan Basket filled with Tangerines + Rubber Ducky!
  let D=new se,B=h0();B.repeat.set(6,1.2);
  let k=new Jt({map:B,roughness:.9,side:Se}),lt=new rt(new Re(.15,.125,.15,24,1,!0),k),it=new rt(new ds(.125,24).rotateX(-Math.PI/2),k);
  it.position.y=-.075;
  let V=new rt(new ti(.15,.008,6,32).rotateX(Math.PI/2),i.tan);V.position.y=.075,D.add(lt,it,V),lt.castShadow=!0;
  let Y=new Jt({vertexColors:!0,metalness:.06,roughness:.36}),mt=Sh();
  // Base tangerines always in the basket
  let baseOranges=[
    [0,.035,.04,.65,.1,.2,.1],
    [-.05,.038,-.03,.62,-.2,.5,-.1],
    [.05,.036,-.035,.64,.15,-.4,.2]
  ];
  for(let[ox,oy,oz,os,rx,ry,rz]of baseOranges){
    let om=new rt(mt,Y);om.position.set(ox,oy,oz);om.rotation.set(rx,ry,rz);om.scale.setScalar(os);om.castShadow=!0;D.add(om);
  }
  // Extra dynamic stackable tangerines in basket as score increases
  let basketStackCoords=[
    [-.045,.075,.045,.62,.2,.1,-.15],
    [.048,.076,.042,.60,-.15,.6,.1],
    [0,.078,-.048,.63,.1,-.3,.2],
    [-.065,.074,-.01,.58,-.25,.2,.2],
    [.065,.075,.005,.58,.25,-.2,-.15],
    [0,.112,.01,.64,-.1,.4,-.05],
    [-.038,.110,-.025,.56,.2,-.5,.15],
    [.038,.112,-.02,.56,-.2,.3,-.2]
  ];
  let basketOranges=basketStackCoords.map(([ox,oy,oz,os,rx,ry,rz])=>{
    let om=new rt(mt,Y);om.position.set(ox,oy,oz);om.rotation.set(rx,ry,rz);om.scale.setScalar(os);om.castShadow=!0;om.visible=!1;D.add(om);return om;
  });
  // Rubber ducky perched on the basket front-right
  let rubberDuck=buildRubberDuck();
  rubberDuck.position.set(.035,.085,.065);
  rubberDuck.rotation.y=-.25;
  rubberDuck.visible=!1;
  D.add(rubberDuck);

  D.position.copy(Pt(Ft(.53,.78,0))),xt.add(D);
  let ht=ri(Pt(Ft(.44,.66,0)),Pt(Ft(.5,.71,0)),.006,.006,i.chrome);xt.add(ht);
  let bt={wheelAngle:0,crankAngle:0,chainTravel:0};
  function setBikeSkin(skin,showDuck){
    if(skin==="styleA"){
      i.paint.color.set("#5ec49e");i.paint.emissive.set("#000000");i.paint.emissiveIntensity=0;
      i.cream.color.set("#f6f0de");i.leather.color.set("#7c4927");i.tan.color.set("#d9ccb8");
      frameFlower.visible=!0;E.neonRim.visible=Xt.neonRim.visible=neonFrameTube.visible=neonFrameTube2.visible=!1;
    }else if(skin==="styleC"){
      i.paint.color.set("#f4efe2");i.paint.emissive.set("#000000");i.paint.emissiveIntensity=0;
      i.cream.color.set("#fff9e6");i.leather.color.set("#9e683c");i.tan.color.set("#b8a99a");
      frameFlower.visible=!0;E.neonRim.visible=Xt.neonRim.visible=neonFrameTube.visible=neonFrameTube2.visible=!1;
    }else if(skin==="styleD"){
      i.paint.color.set("#d938ff");i.paint.emissive.set("#8a00c2");i.paint.emissiveIntensity=.35;
      i.cream.color.set("#1c2033");i.leather.color.set("#282c42");i.tan.color.set("#222638");
      frameFlower.visible=!1;E.neonRim.visible=Xt.neonRim.visible=neonFrameTube.visible=neonFrameTube2.visible=!0;
    }else{
      // Default styleB
      i.paint.color.set("#138a8a");i.paint.emissive.set("#000000");i.paint.emissiveIntensity=0;
      i.cream.color.set("#efe6cf");i.leather.color.set("#6e3f22");i.tan.color.set("#c79a64");
      frameFlower.visible=!1;E.neonRim.visible=Xt.neonRim.visible=neonFrameTube.visible=neonFrameTube2.visible=!1;
    }
    rubberDuck.visible=showDuck!==void 0?showDuck:skin==="styleC";
  }
  function Tt({wheelAngle:_t,crankAngle:L,steerAngle:ut,speed:$,night:Et,oranges:oc=0}){
    bt.wheelAngle=_t,bt.crankAngle=L,E.rot.rotation.z=-_t,Xt.rot.rotation.z=-_t,x.rotation.z=-L;
    let At=L*ro;T.rotation.z=-At/Wd;
    for(let Ot=0;Ot<tt;Ot++)TS(J,Ot*(J.length/tt)+At,Ct),nt.set(Ct.x,Ct.y,zt),te.setFromAxisAngle(St,Ct.z),le.compose(nt,te,F),st.setMatrixAt(Ot,le);
    st.instanceMatrix.needsUpdate=!0,G.position.set(Zt.bb.x+Math.cos(-L)*so,Zt.bb.y+Math.sin(-L)*so,.125),K.position.set(Zt.bb.x-Math.cos(-L)*so,Zt.bb.y-Math.sin(-L)*so,-.125),xt.quaternion.setFromAxisAngle(n,ut);
    let dt=Math.min(.42,Math.max(0,($-2.5)*.05));E.blurMat.opacity=Xt.blurMat.opacity=dt;
    let kt=Et;R.intensity=kt*9,i.lens.emissiveIntensity=.3+kt*7,i.tail.emissiveIntensity=.4+kt*5+(Math.sin(performance.now()*.008)>.3?kt*3:0),i.reflector.emissiveIntensity=.25+kt*.8;
    // Update basket stacked oranges based on score
    let thresholds=[1,3,6,10,15,22,30,40];
    for(let kIdx=0;kIdx<basketOranges.length;kIdx++){
      basketOranges[kIdx].visible=oc>=thresholds[kIdx];
    }
    if(rubberDuck.visible){
      rubberDuck.rotation.z=Math.sin(performance.now()*.005)*.08;
    }
  }
  return{group:t,update:Tt,setSkin:setBikeSkin,anchors:{gripL:Wt.L,gripR:Wt.R,pedalL:K,pedalR:G,bell:Mt,basket:D},headlight:R,materials:i,state:bt,steerMatrix:()=>xt.matrix,rubberDuck};
}
var es,Rs,Zt,ka,so,ro,Wd,y0=ze(()=>{je();yh();Ki();Fa();Gd();es=.3,Rs=[[44,28],[44,22],[44,18],[44,15],[44,12]],Zt={rearHub:Ft(-.46,es,0),frontHub:Ft(.48,es,0),bb:Ft(-.07,.285,0),seat:Ft(-.205,.60,0),saddle:Ft(-.235,.665,0),headTop:Ft(.32,.72,0),headBot:Ft(.36,.57,0)},ka=Zt,so=.115,ro=.1,Wd=.042});`;

// Custom 10_T0_character: Anatomically Faithful & Adorable 3D Capybara with 4 Real-Time 3D Modeling Schemes!
const customT0Capybara = `function RS(){
  let i=c0();i.repeat.set(8,6);
  let furBase={color:"#a66e40",roughness:.84,sheen:.9,sheenRoughness:.5,sheenColor:new ft("#f0c492"),bumpMap:i,bumpScale:.36};
  return{
    body:new fn({...furBase,color:"#ffffff",vertexColors:!0}),
    white:new fn({...furBase,color:"#a87042"}),
    furLight:new fn({...furBase,color:"#cca074"}),
    furTuft:new fn({...furBase,color:"#b87e4c"}),
    snoutDark:new fn({color:"#462914",roughness:.76,sheen:.55,sheenColor:new ft("#8c5c38"),bumpMap:i,bumpScale:.24}),
    muzzlePad:new fn({color:"#6e4526",roughness:.78,sheen:.65,sheenColor:new ft("#b8865c"),bumpMap:i,bumpScale:.22}),
    paw:new fn({color:"#3e2310",roughness:.7,clearcoat:.15}),
    claw:new Jt({color:"#1f1108",roughness:.5}),
    nostril:new Jt({color:"#170b05",roughness:.88}),
    mouthIn:new Jt({color:"#381414",roughness:.8}),
    tongue:new Jt({color:"#f0757e",roughness:.45}),
    tooth:new fn({color:"#fffdf5",roughness:.18,clearcoat:.85}),
    eye:new fn({color:"#0e0704",roughness:.08,clearcoat:1,clearcoatRoughness:.05}),
    catchlight:new _i({color:"#ffffff"}),
    eyelid:new fn({...furBase,color:"#6e4423"}),
    earInner:new Jt({color:"#b88062",roughness:.82}),
    blush:new _i({color:"#ff7a8a",transparent:!0,opacity:.42,depthWrite:!1}),
    whisker:new Jt({color:"#d8b898",roughness:.4}),
    overalls:new fn({color:"#4678b4",roughness:.72,sheen:.4,sheenColor:new ft("#8ab8f0")}),
    buttonGold:new fn({color:"#ffd15c",metalness:.4,roughness:.25,clearcoat:.6}),
    helmet:new fn({vertexColors:!0,roughness:.28,clearcoat:1,clearcoatRoughness:.14}),
    straw:new Jt({color:"#ebd08d",roughness:.85}),
    strawBand:new Jt({color:"#5bb8e8",roughness:.6}),
    lens:new fn({color:"#0b1016",metalness:.85,roughness:.14,clearcoat:1,clearcoatRoughness:.12,transparent:!0,opacity:.82}),
    frame:new fn({color:"#ff477e",roughness:.25,clearcoat:1}),
    cyberLens:new Jt({color:"#00f5ff",emissive:new ft("#00e5ff"),emissiveIntensity:2,roughness:.15,transparent:!0,opacity:.88}),
    cyberFrame:new Jt({color:"#202436",metalness:.8,roughness:.3}),
    scarfKnot:new Jt({color:"#d7263d",roughness:.7,emissive:new ft("#000000"),emissiveIntensity:0}),
    orangeMat:new fn({vertexColors:!0,roughness:.32,clearcoat:.5,emissive:new ft("#ff7700"),emissiveIntensity:0})
  }
}
function loftY({segs:i=32,ring:t=20,center:e,section:n,color:s}){
  // Vertical 3D Loft along the Y-axis: section(u,v) returns [xOff, zOff] added to f.x and f.z!
  let u=Zi({
    segs:i,
    ring:t,
    center:d=>{let f=e(d);return Ft(f.y,f.x,f.z)},
    section:(d,y)=>n(d,1-y),
    color:s?(d,y,l)=>s(d,1-y,l):void 0
  });
  let pos=u.attributes.position;
  for(let k=0;k<pos.count;k++){
    let py=pos.getX(k),px=pos.getY(k),pz=pos.getZ(k);
    pos.setXYZ(k,px,py,pz);
  }
  return u.computeVertexNormals(),u;
}
function CS(){
  // Upright Pear/Kiwi-Shaped 3D Capybara Torso with Seamless Thick Shoulder-Neck Integration!
  // Sits snugly on the saddle at bottom (u=0) and rises into the broad head base at top (u=1).
  let cBack=new ft("#7e4e29"),cSide=new ft("#ad7444"),cBelly=new ft("#d8aa7c"),cRump=new ft("#6b4020");
  return loftY({
    segs:44,
    ring:32,
    center:u=>{
      // Spine curves from saddle (-0.085, -0.21, 0) up and forward to neck collar (+0.075, +0.235, 0)
      let x=Xe(-.085,.075,Math.pow(u,.92))+Math.sin(u*Math.PI)*.016;
      let y=Xe(-.21,.235,u);
      return Ft(x,y,0);
    },
    section:(u,v)=>{
      let ang=v*xe,ca=Math.cos(ang),sa=Math.sin(ang);
      // Smooth closed rounded bottom rump cap & smooth upper neck-head transition
      let botCap=Math.pow(ve(0,.15,u),.48);
      let topCap=Math.pow(ve(1,.88,u),.52);
      let env=botCap*topCap;
      // Pear-shaped profile: wide plump bottom/haunches (u~0.28), chubby belly (u~0.50), thick muscular neck (u~0.82)
      let pear=1+.20*Math.sin(ve(.05,.72,u)*Math.PI)-.14*ve(.62,.95,u);
      let rx=Xe(.172,.124,ve(.2,.88,u))*pear*env;
      let rz=Xe(.178,.120,ve(.2,.88,u))*pear*env;
      // Soft rounded belly protrusion on the front (+X side, ca > 0)
      let xOff=ca*rx;
      if(ca>0&&u>.16&&u<.80){
        xOff+=.030*ca*Math.sin((u-.16)/.64*Math.PI)*env;
      }
      // Broad, huggable lower haunches / hips
      let zOff=sa*rz*(1+(u<.48?.10*Math.sin(u/.48*Math.PI)*(1-Math.abs(ca)*.5):0));
      return[xOff,zOff];
    },
    color:(u,v,col)=>{
      let ang=v*xe,ca=Math.cos(ang);
      col.copy(cSide);
      // Warm cream-buff chest and belly in front (ca > 0.1)
      if(ca>.1)col.lerp(cBelly,ve(.1,.88,ca)*ve(.08,.85,u)*.88);
      // Rich chestnut-brown along the arched back (ca < -0.05)
      if(ca<-.05)col.lerp(cBack,ve(-.05,-.88,ca)*.82);
      // Deeper cocoa-brown on lower rump
      if(u<.28)col.lerp(cRump,ve(.28,.02,u)*.65);
    }
  });
}
function buildPlumpLimb(rTop,rMid,rBot,hexTop,hexBot){
  // Seamless 3D organic drumstick/limb with hemispherical overlapping end-caps (ZERO joint balls needed!)
  let cTop=new ft(hexTop),cBot=new ft(hexBot);
  return loftY({
    segs:20,
    ring:16,
    center:u=>{
      // Extend past [0,1] to [-0.14, 1.14] so both ends have rounded hemispherical caps centered at 0 and 1!
      let y=Xe(-.14,1.14,u);
      return Ft(0,y,0);
    },
    section:(u,v)=>{
      let ang=v*xe,ca=Math.cos(ang),sa=Math.sin(ang);
      let y=Xe(-.14,1.14,u);
      let cap=1;
      if(y<0){
        let t=Le(-y/.14,0,1);
        cap=Math.sqrt(Math.max(0,1-t*t));
      }else if(y>1){
        let t=Le((y-1)/.14,0,1);
        cap=Math.sqrt(Math.max(0,1-t*t));
      }
      let tClamped=Le(y,0,1);
      let baseR=Xe(rTop,rBot,tClamped)+rMid*Math.sin(tClamped*Math.PI);
      let r=baseR*cap;
      // Full 3D drumstick roundness in both X (front-to-back) and Z (side-to-side)
      let xOff=ca*r*1.12+(y>0&&y<1?Math.sin(tClamped*Math.PI)*.008:0);
      let zOff=sa*r*.98;
      return[xOff,zOff];
    },
    color:(u,v,col)=>{
      let t=Le(Xe(-.14,1.14,u),0,1);
      col.copy(cTop).lerp(cBot,Math.pow(t,1.35));
    }
  });
}
function buildCapyHeadGeom(){
  // Iconic Real-Cute Capybara Head: Broad Flat Crown + Wide Boxy-Rounded Blunt Muzzle + Chubby Jowls
  let cCrown=new ft("#8c562c"),cCheek=new ft("#b57d4c"),cChin=new ft("#d8ab7e"),cSnout=new ft("#3e2412"),cNoseBridge=new ft("#59361c");
  return Zi({
    segs:44,
    ring:32,
    center:u=>{
      let x=Xe(-.165,.245,u);
      // Flat table-top crown (u=0.18..0.65) and broad blunt muzzle
      let y=.008*Math.sin(u*Math.PI)-.012*Math.pow(ve(.55,1,u),1.6);
      return Ft(x,y,0);
    },
    section:(u,v)=>{
      let ang=v*xe,ca=Math.cos(ang),sa=Math.sin(ang);
      let backCap=Math.pow(ve(0,.18,u),.48);
      let frontCap=Math.pow(ve(1,.91,u),.42);
      let env=backCap*frontCap;
      // Strong boxy-rounded squircle toward the blunt snout (u > 0.5)
      let sq=Xe(.92,.58,ve(.30,.88,u));
      let sy=Math.sign(ca)*Math.pow(Math.abs(ca),sq);
      let sz=Math.sign(sa)*Math.pow(Math.abs(sa),sq);
      let hRadius=Xe(.108,.092,ve(.32,.88,u))*env;
      let wRadius=Xe(.118,.094,ve(.28,.88,u))*env;
      // 1. Flatten the top of the skull so the tangerine & cowlick sit on a natural flat plateau!
      if(sy>0&&u>.16&&u<.74){
        sy*=1-.22*sy*ve(.16,.35,u)*ve(.74,.52,u);
      }
      // 2. Plump lower cheeks / jowls (u=0.22..0.78)
      if(sy<0&&u>.20&&u<.80){
        let jowl=Math.sin((u-.20)/.60*Math.PI);
        wRadius*=1+.20*(-sy)*jowl;
        hRadius*=1+.10*(-sy)*jowl;
      }
      // 3. Broad, puffy whisker pads on the front snout + subtle central philtrum groove
      if(u>.72){
        let snoutFront=ve(.72,.94,u);
        let centerGroove=Math.exp(-(sa*sa)/.045)*ve(.4,-.8,ca);
        wRadius*=1+.08*snoutFront*(1-centerGroove*.6);
        hRadius*=1-.06*snoutFront*centerGroove;
      }
      return[sy*hRadius,sz*wRadius];
    },
    color:(u,v,col)=>{
      let ang=v*xe,ca=Math.cos(ang),sa=Math.sin(ang);
      col.copy(cCheek);
      // Rich chestnut crown & forehead
      if(ca>.2)col.lerp(cCrown,ve(.2,.88,ca)*.85);
      // Soft cream-buff chin & throat
      if(ca<-.22)col.lerp(cChin,ve(-.22,-.9,ca)*.82);
      // Darker brown transition along the upper nose bridge
      let bridgeMask=ve(.45,.78,u)*ve(.15,.85,ca)*(1-Math.abs(sa)*.5);
      col.lerp(cNoseBridge,bridgeMask*.75);
      // Signature dark cocoa-espresso blunt muzzle patch at the front of the snout
      let snoutMask=ve(.64,.88,u)*ve(-.55,.68,ca);
      col.lerp(cSnout,snoutMask*.94);
    }
  });
}
function buildFurTuftGeom(len=.055,wid=.024,curve=.015){
  // Sculpted 3D curved tapered fur tuft blade
  return Zi({
    segs:10,
    ring:10,
    center:u=>Ft(-u*len,Math.sin(u*Math.PI)*curve+u*u*curve*.6,0),
    section:(u,v)=>{
      let ang=v*xe,taper=Math.sin(Math.pow(u,.65)*Math.PI)*(1-u*.35);
      return[Math.cos(ang)*wid*.42*taper,Math.sin(ang)*wid*taper];
    }
  });
}
function PS(){
  // Plump 3-toed Capybara hind paw with cushion pads & blunt dark claws
  let g=[];
  let palm=new he(.038,14,10);palm.scale(1.38,.58,1.18);palm.translate(.012,0,0);
  g.push(ye(fe(palm),"#3e2310"));
  for(let t=-1;t<=1;t++){
    let toe=new he(.016,10,8);
    toe.scale(1.6,.62,.92);
    toe.translate(.050,-.003,t*.022);
    g.push(ye(fe(toe),"#3e2310"));
    let claw=new Nn(.006,.014,6);
    claw.rotateZ(-Math.PI/2+.2);
    claw.translate(.074,-.006,t*.023);
    g.push(ye(fe(claw),"#1c0f06"));
  }
  return Tn(g);
}
function buildFrontPawGeom(){
  // Plump 4-toed Capybara front paw with cute blunt claws
  let g=[];
  let palm=new he(.033,14,10);palm.scale(1.32,.60,1.12);palm.translate(.018,0,0);
  g.push(ye(fe(palm),"#3e2310"));
  for(let t=-1.5;t<=1.5;t+=1){
    let toe=new he(.0125,8,6);
    toe.scale(1.55,.60,.85);
    toe.translate(.048,-.002,t*.0125);
    g.push(ye(fe(toe),"#3e2310"));
  }
  return Tn(g);
}
function DS(){
  // Retro striped cycling helmet (Style B) - shaped to sit jauntily on crown without hiding eyes/ears!
  let i=new he(.104,32,16,0,xe,0,Math.PI*.46),t=i.attributes.position,e=new Float32Array(t.count*3),n=new ft("#ff5a4e"),s=new ft("#fdfdfd"),r=new ft("#1ab0a8"),o=new ft("#2a2c30");
  for(let a=0;a<t.count;a++){
    let l=t.getZ(a),c=t.getY(a),h=t.getX(a),d=n;
    Math.abs(l)<.016?d=s:Math.abs(Math.abs(l)-.052)<.012&&c>.02&&(d=r);
    c>.058&&Math.abs(h)<.055&&Math.abs(Math.abs(l)-.030)<.007&&(d=o);
    e.set([d.r,d.g,d.b],a*3);
  }
  return i.setAttribute("color",new re(e,3)),i.scale(1.28,.82,1.14),i;
}
function buildStrawHat(mats){
  let g=new se;
  let brim=new rt(new Re(.19,.20,.012,32),mats.straw);
  brim.position.y=.01;
  let dome=new rt(new Re(.102,.12,.064,28),mats.straw);
  dome.position.y=.044;
  let topCap=new rt(new he(.102,24,12,0,xe,0,Math.PI*.5),mats.straw);
  topCap.scale.set(1,.32,1);topCap.position.y=.074;
  let band=new rt(new Re(.121,.123,.018,28),mats.strawBand);
  band.position.y=.025;
  let flower=buildDaisyFlower(1.35);
  flower.position.set(.02,.04,.12);
  flower.rotation.x=Math.PI*.42;
  flower.rotation.z=-.2;
  g.add(brim,dome,topCap,band,flower);
  g.scale.set(1.18,1,1.08);
  g.position.set(-.035,.078,0);
  g.rotation.z=.14;
  g.traverse(m=>{if(m.isMesh)m.castShadow=!0});
  return g;
}
function E0(){
  let i=RS(),t=new se;t.name="pelican";
  let e=[],n=(ct,Mt=!0)=>(ct.castShadow=Mt,ct.receiveShadow=!0,e.push(ct),ct);

  // 1. Upright Pear-Shaped 3D Capybara Torso (s) sitting directly on the saddle!
  let s=new se;s.position.copy(Eh),s.rotation.z=M0,t.add(s);
  let r=n(new rt(CS(),i.body));s.add(r);
  let o=(ct,Mt,It)=>{let P=new Ue;return P.position.set(ct,Mt,It),s.add(P),P};
  let a={
    hipL:o(-.050,-.115,-.115),
    hipR:o(-.050,-.115,.115),
    shL:o(.088,.085,-.132),
    shR:o(.088,.085,.132),
    neck:o(.072,.165,0)
  };
  // Cute round furry rump nub (l)
  let l=new se;l.position.set(-.225,-.115,0),s.add(l);
  let tailNub=n(new rt(new he(.036,12,10),i.snoutDark));
  tailNub.scale.set(.8,.75,.95);l.add(tailNub);

  // Scheme 3 Exclusive: 3D Sculpted Blue Denim Overalls (粘土盲盒风专属蓝色背带裤!)
  let overallsGroup=new se;
  let pantsShell=n(new rt(new he(.208,28,22,0,xe,Math.PI*.36,Math.PI*.64),i.overalls));
  pantsShell.scale.set(1.06,1.02,1.05);
  pantsShell.position.set(-.022,-.038,0);
  let bibFront=n(new rt(new he(.152,20,16,-Math.PI*.38,Math.PI*.76,Math.PI*.22,Math.PI*.38),i.overalls));
  bibFront.scale.set(1.16,1.14,1.02);
  bibFront.position.set(.048,.01,0);
  overallsGroup.add(pantsShell,bibFront);
  for(let side of[-1,1]){
    let strapCurve=new Qn([
      Ft(.158,.092,side*.078),
      Ft(.128,.182,side*.092),
      Ft(.022,.192,side*.096),
      Ft(-.095,.088,side*.105)
    ]);
    let strapMesh=n(new rt(new qi(strapCurve,16,.015,8),i.overalls));
    let btn=new rt(new Re(.014,.014,.008,14),i.buttonGold);
    btn.rotation.z=Math.PI/2-.25;
    btn.position.set(.164,.085,side*.076);
    let legCuff=n(new rt(new ti(.088,.017,10,20),i.overalls));
    legCuff.rotation.x=Math.PI/2;
    legCuff.position.set(-.050,-.140,side*.115);
    overallsGroup.add(strapMesh,btn,legCuff);
  }
  overallsGroup.visible=!1;
  s.add(overallsGroup);

  // Torso Layered Fur Tufts (Chest & Haunches - prominent in Scheme 4 "Fluffy Onsen"!)
  let bodyTuftsGroup=new se;
  let chestTuftG=buildFurTuftGeom(.066,.028,.016);
  for(let k=-2;k<=2;k++){
    let tf=n(new rt(chestTuftG,i.furLight));
    tf.position.set(.188-.01*Math.abs(k),.075-.012*Math.abs(k),k*.034);
    tf.rotation.set(0,Math.PI+k*.22,.55);
    bodyTuftsGroup.add(tf);
  }
  for(let side of[-1,1]){
    for(let row=0;row<3;row++){
      let rtf=n(new rt(chestTuftG,i.furTuft));
      rtf.position.set(-.085-row*.042,.02-row*.055,side*(.192-row*.01));
      rtf.rotation.set(side*.35,side*.45,-.35-row*.12);
      bodyTuftsGroup.add(rtf);
    }
  }
  s.add(bodyTuftsGroup);

  // 2. Integrated Thick Shoulder-Neck Fairing (h) & Plush Scarf Collar (u)
  let h=new tr(14,20,ct=>Xe(.132,.116,ct)),d=n(new rt(h.geometry,i.white));
  d.frustumCulled=!1,t.add(d);
  let u=new rt(new ti(.132,.030,14,32),i.scarfKnot);
  u.castShadow=!0,t.add(u);

  // 3. Broad, Blunt, Adorable Capybara Head (f)
  let f=new se;t.add(f);
  let headMesh=n(new rt(buildCapyHeadGeom(),i.body));
  f.add(headMesh);

  // 3a. Scheme 3 Clay Toy: rounded-rectangular toast snout block overlay (vertex-matched to snout color)
  let claySnoutGeom=ye(fe(new he(.076,24,18)),"#462915");
  let claySnoutBlock=n(new rt(claySnoutGeom,i.body));
  claySnoutBlock.scale.set(.78,.98,1.08);
  claySnoutBlock.position.set(.192,-.004,0);
  claySnoutBlock.visible=!1;
  f.add(claySnoutBlock);

  // 3b. Dynamic Puffing Cheek Pouches (嚼橘子时鼓腮帮! Vertex-colored to blend 100% seamlessly with cheeks!) & Chibi Rosy Blush
  let cheekPouches=[],blushGroup=new se;
  let pouchGeom=ye(fe(new he(.058,18,14)),"#b57d4c");
  for(let side of[-1,1]){
    let pouch=n(new rt(pouchGeom,i.body));
    pouch.scale.set(1.28,.88,.72);
    pouch.position.set(.055,-.028,side*.082);
    f.add(pouch);
    cheekPouches.push({mesh:pouch,s:side});

    // Cute rosy cheek blush oval (visible in Chibi & Clay schemes!)
    let blush=new rt(new he(.028,12,8),i.blush);
    blush.scale.set(1.35,.72,.25);
    blush.position.set(.068,.002,side*.118);
    blush.rotation.y=side*.22;
    blushGroup.add(blush);
  }
  blushGroup.visible=!1;
  f.add(blushGroup);

  // 3c. Wide-Set Sculpted Kidney Nostrils + Curved 3D Whiskers
  let whiskerGroup=new se;
  for(let side of[-1,1]){
    // Outer raised nostril cushion
    let nosRim=new rt(new he(.016,12,10),i.snoutDark);
    nosRim.scale.set(.85,1.25,1.05);
    nosRim.position.set(.232,.034,side*.048);
    nosRim.rotation.set(0,side*.32,-.38);
    // Inner dark nostril slit
    let nosIn=new rt(new he(.0105,10,8),i.nostril);
    nosIn.scale.set(.72,1.35,.85);
    nosIn.position.set(.239,.034,side*.050);
    nosIn.rotation.copy(nosRim.rotation);
    f.add(nosRim,nosIn);

    // 3 Curved 3D Whiskers per side
    for(let wIdx=0;wIdx<3;wIdx++){
      let wy=-.004-wIdx*.014;
      let wz=side*(.078+wIdx*.004);
      let wCurve=new Qn([
        Ft(.195,wy,wz*.88),
        Ft(.175,wy-.008,wz*1.28),
        Ft(.145,wy-.024,wz*1.68)
      ]);
      let whMesh=new rt(new qi(wCurve,10,.0018*(1-wIdx*.12),5),i.whisker);
      whiskerGroup.add(whMesh);
    }
  }
  f.add(whiskerGroup);

  // 3d. Deep Philtrum Groove (人中竖沟) & Plump Split "ω" Smile Lips + Peek-a-Boo Front Incisors (微露小门牙!)
  let philtrum=new rt(new Re(.0042,.0042,.056,8),i.nostril);
  philtrum.position.set(.244,.002,0);
  f.add(philtrum);
  for(let side of[-1,1]){
    let smileCurve=new Qn([
      Ft(.243,-.024,0),
      Ft(.234,-.038,side*.028),
      Ft(.206,-.024,side*.058)
    ]);
    let smileLine=new rt(new qi(smileCurve,12,.0042,6),i.nostril);
    f.add(smileLine);
  }
  // Cute Peek-a-Boo Rodent Front Incisors (微露的两颗圆角白门牙)
  let incisorGroup=new se;
  incisorGroup.position.set(.236,-.039,0);
  for(let side of[-1,1]){
    let inc=new rt(new he(.0075,10,8),i.tooth);
    inc.scale.set(.55,1.35,.95);
    inc.position.set(0,0,side*.0068);
    incisorGroup.add(inc);
  }
  f.add(incisorGroup);

  // 3e. Animated Lower Jaw / Chewing Mouth (x, U) - vertex-colored to match chin!
  let x=new se;x.position.set(.095,-.048,0),f.add(x);
  let I=new se;x.add(I);
  let U=new se;x.add(U);
  let lowerChinGeom=ye(fe(new he(.054,18,12)),"#d8ab7e");
  let lowerChin=n(new rt(lowerChinGeom,i.body));
  lowerChin.scale.set(1.65,.54,1.10);
  lowerChin.position.set(.052,-.006,0);
  let mouthCav=new rt(new he(.038,12,8),i.mouthIn);
  mouthCav.scale.set(1.35,.35,.95);mouthCav.position.set(.072,.009,0);
  let tongue=new rt(new he(.028,10,8),i.tongue);
  tongue.scale.set(1.4,.30,.85);tongue.position.set(.078,.013,0);
  let lowerTooth=new rt(new Pe(.006,.012,.016),i.tooth);
  lowerTooth.position.set(.116,.015,0);
  U.add(lowerChin,mouthCav,tongue,lowerTooth);

  // Mouth & Snout Tip Anchors for Tangerine Catching
  let K=new Ue;K.position.set(.25,.01,0),f.add(K);
  let J=new Ue;J.position.set(.22,-.02,0),f.add(J);

  // 4. High-Set Expressive Capybara Eyes (高位半眯杏仁眼 / 一字禅意眯眯眼 / 盲盒高光豆豆眼)
  let p=[],M=[];
  for(let side of[-1,1]){
    let eyeRoot=new se;
    eyeRoot.position.set(.024,.050,side*.106);
    eyeRoot.rotation.y=side*.18;
    // Almond dark cocoa eye rim
    let eyeSocket=new rt(new he(.022,16,12),i.snoutDark);
    eyeSocket.scale.set(1.32,.88,.52);
    eyeSocket.position.z=-side*.003;
    // Glossy obsidian eyeball
    let eyeball=new rt(new he(.0165,18,14),i.eye);
    eyeball.scale.set(1.18,.98,.88);
    // Dual white catchlights (主高光 + 副高光)
    let spark1=new rt(new he(.0052,8,6),i.catchlight);
    spark1.position.set(.007,.0045,side*.0125);
    let spark2=new rt(new he(.0026,6,6),i.catchlight);
    spark2.position.set(-.005,-.0035,side*.013);
    // Heavy flat-bottomed upper eyelid hood (signature unbothered Capybara gaze!)
    let upperLid=new rt(new he(.0195,18,12,0,xe,0,Math.PI*.56),i.eyelid);
    upperLid.scale.set(1.26,.96,.92);
    upperLid.rotation.z=-.14;
    // Lower eyelid (used for Chibi zen squint & happy chewing smile)
    let lowerLid=new rt(new he(.019,16,10,0,xe,Math.PI*.52,Math.PI*.48),i.eyelid);
    lowerLid.scale.set(1.24,.001,.90);
    // Full blink lid
    let blinkLid=new rt(new he(.0198,14,10),i.eyelid);
    blinkLid.scale.set(1.26,.001,.92);
    eyeRoot.add(eyeSocket,eyeball,spark1,spark2,upperLid,lowerLid,blinkLid);
    f.add(eyeRoot);
    p.push(eyeball);
    M.push({root:eyeRoot,blink:blinkLid,upper:upperLid,lower:lowerLid,spark1,spark2});
  }

  // 5. Cupped Spoon-Shaped Capybara Ears at Top-Rear Skull (内凹小圆勺耳 + 高频抖耳!)
  let ears=[];
  for(let side of[-1,1]){
    let earGroup=new se;
    earGroup.position.set(-.112,.084,side*.086);
    // Outer dark cocoa spoon cup
    let earOuter=n(new rt(new he(.034,16,12),i.snoutDark));
    earOuter.scale.set(.62,1.18,.92);
    earOuter.rotation.set(side*.38,-side*.35,-.48);
    // Recessed pinkish-tan inner ear hollow
    let earHollow=new rt(new he(.023,12,10),i.earInner);
    earHollow.scale.set(.48,1.02,.76);
    earHollow.position.set(.008,-.002,side*.005);
    earHollow.rotation.copy(earOuter.rotation);
    // Fluffy inner ear fur tuft
    let earTuft=new rt(buildFurTuftGeom(.028,.014,.006),i.furLight);
    earTuft.position.set(.012,-.01,side*.008);
    earTuft.rotation.set(0,side*.8,.2);
    earGroup.add(earOuter,earHollow,earTuft);
    f.add(earGroup);
    ears.push({group:earGroup,s:side});
  }

  // 6. Wobbling Forehead Cowlick (头顶摇摆呆毛!) & Cheek Fluffy Ruff Tufts (脸颊蓬松炸毛簇!)
  let ahogeGroup=new se;
  ahogeGroup.position.set(.088,.096,0);
  let tuftMain=n(new rt(buildFurTuftGeom(.062,.024,.022),i.furLight));
  tuftMain.rotation.set(0,Math.PI,.85);
  let tuftL=n(new rt(buildFurTuftGeom(.048,.018,.016),i.furTuft));
  tuftL.position.set(-.008,-.002,-.016);
  tuftL.rotation.set(-.28,Math.PI+.25,.72);
  let tuftR=n(new rt(buildFurTuftGeom(.045,.018,.016),i.furTuft));
  tuftR.position.set(-.008,-.002,.016);
  tuftR.rotation.set(.28,Math.PI-.25,.70);
  ahogeGroup.add(tuftMain,tuftL,tuftR);
  f.add(ahogeGroup);

  let cheekTuftsGroup=new se;
  let cheekBladeG=buildFurTuftGeom(.064,.028,.018);
  for(let side of[-1,1]){
    for(let idx=0;idx<4;idx++){
      let ctf=n(new rt(cheekBladeG,idx%2===0?i.furTuft:i.furLight));
      ctf.position.set(.015-idx*.028,.018-idx*.022,side*(.112-idx*.004));
      ctf.rotation.set(side*(.35+idx*.08),side*.42,-.22-idx*.14);
      cheekTuftsGroup.add(ctf);
    }
  }
  f.add(cheekTuftsGroup);

  // 7. Switchable Headwear & Eyewear Sets (Positioned cleanly so eyes/ears/snout stay visible!)
  // (A) Retro Striped Cycling Helmet (b - Style B)
  let b=new se,v=new rt(DS(),i.helmet);v.castShadow=!0,b.add(v);
  let strapL=ri(Ft(-.01,-.01,-.106),Ft(.01,-.088,-.082),.004,.004,i.cyberFrame,6);
  let strapR=ri(Ft(-.01,-.01,.106),Ft(.01,-.088,.082),.004,.004,i.cyberFrame,6);
  b.add(strapL,strapR);
  b.position.set(-.032,.062,0),b.rotation.z=.12,f.add(b);

  // (B) Woven Straw Sun Hat with Daisy (strawHat - Style C)
  let strawHat=buildStrawHat(i);
  strawHat.visible=!1;
  f.add(strawHat);

  // (C) Pink-framed Aviator Sunglasses (T - Style B)
  let T=new se;
  for(let side of[-1,1]){
    let Mt=new rt(new Re(.026,.026,.005,24),i.lens);
    Mt.rotation.x=Math.PI/2,Mt.rotation.y=side*.26,Mt.position.set(.068,.052,side*.098);
    let It=new rt(new ti(.026,.0035,6,24),i.frame);
    It.position.copy(Mt.position),It.rotation.y=side*.26;
    let P=new rt(new Pe(.095,.0045,.0045),i.frame);
    P.position.set(.012,.056,side*.106),P.rotation.y=-side*.05;
    T.add(Mt,It,P);
  }
  let bridgeCurve=new Qn([Ft(.078,.062,-.082),Ft(.108,.072,0),Ft(.078,.062,.082)]);
  T.add(new rt(new qi(bridgeCurve,16,.0035,6),i.frame));
  f.add(T);

  // (D) Glowing Cyan Cyber Goggles (cyberGoggles - Style D)
  let cyberGoggles=new se;
  for(let side of[-1,1]){
    let lens=new rt(new Re(.028,.028,.008,24),i.cyberLens);
    lens.rotation.x=Math.PI/2,lens.rotation.y=side*.28,lens.position.set(.072,.052,side*.096);
    let rim=new rt(new ti(.028,.005,8,24),i.cyberFrame);
    rim.position.copy(lens.position),rim.rotation.y=side*.28;
    let strap=new rt(new Pe(.11,.008,.005),i.cyberFrame);
    strap.position.set(.005,.058,side*.106);
    cyberGoggles.add(lens,rim,strap);
  }
  let cyberBridge=new Qn([Ft(.082,.064,-.078),Ft(.112,.074,0),Ft(.082,.064,.078)]);
  cyberGoggles.add(new rt(new qi(cyberBridge,16,.005,6),i.cyberFrame));
  cyberGoggles.visible=!1;
  f.add(cyberGoggles);

  // 8. Signature Head Tangerine + Dynamic Wobbling Stacked Tangerine Tower (🍊)!
  let headOrangeGroup=new se;
  let orangeGeom=Sh();
  let mainHeadOrange=n(new rt(orangeGeom,i.orangeMat));
  mainHeadOrange.scale.setScalar(.72);
  headOrangeGroup.add(mainHeadOrange);
  let orangeLight=new Gs("#ff9500",0,4.5,1.5);
  orangeLight.position.set(0,.08,0);
  headOrangeGroup.add(orangeLight);
  let headStack=[];
  let stackScales=[.56,.48,.40,.34,.28];
  let curY=.104;
  for(let sIdx=0;sIdx<5;sIdx++){
    let sc=stackScales[sIdx];
    let pivot=new se;
    pivot.position.set(0,curY,0);
    let om=n(new rt(orangeGeom,i.orangeMat));
    om.scale.setScalar(sc);
    om.rotation.y=(sIdx*1.7)%xe;
    pivot.add(om);
    pivot.visible=!1;
    headOrangeGroup.add(pivot);
    headStack.push(pivot);
    curY+=.132*sc;
  }
  headOrangeGroup.position.set(.005,.112,0);
  f.add(headOrangeGroup);

  // 9. Plump, Ball-Free Two-Bone IK Hind Legs (tt - Drumstick Thighs + Furry Calves + 3-Toed Paws!)
  let thighGeom=buildPlumpLimb(.112,.022,.076,"#9e673a","#8a562d");
  let shinGeom=buildPlumpLimb(.075,.014,.050,"#8a562d","#422612");
  let hindFootGeom=PS();
  let pt=side=>{
    let Mt=n(new rt(thighGeom,i.body));
    let P=n(new rt(shinGeom,i.body));
    let Yt=n(new rt(hindFootGeom,i.body));
    return t.add(Mt,P,Yt),{thigh:Mt,shin:P,foot:Yt,s:side};
  },tt=[pt(-1),pt(1)];

  // 10. Plump, Ball-Free Two-Bone IK Front Arms & Paws (te) + Beaded Bracelet
  let upperArmGeom=buildPlumpLimb(.086,.016,.064,"#a87042","#8c582f");
  let foreArmGeom=buildPlumpLimb(.063,.012,.045,"#8c582f","#422612");
  let frontPawGeom=buildFrontPawGeom();
  let le=side=>{
    let upperArm=n(new rt(upperArmGeom,i.body));
    let foreArm=n(new rt(foreArmGeom,i.body));
    let wrist=new se;
    let pawMesh=n(new rt(frontPawGeom,i.body));
    wrist.add(pawMesh);
    if(side<0){
      let brace=new se;
      let beadCols=["#ff6b35","#2ec4b6","#ffbe0b","#e71d36","#ffffff"];
      for(let bIdx=0;bIdx<10;bIdx++){
        let ang=bIdx/10*xe;
        let bead=new rt(new he(.0065,6,6),new Jt({color:beadCols[bIdx%beadCols.length],roughness:.3}));
        bead.position.set(-.005,Math.cos(ang)*.042,Math.sin(ang)*.042);
        brace.add(bead);
      }
      wrist.add(brace);
    }
    t.add(upperArm,foreArm,wrist);
    return{upperArm,foreArm,wrist,s:side};
  },te=[le(-1),le(1)];

  let St={jaw:0,jawTarget:0,bulge:0,blink:0,nextBlink:1.5,blinkT:-1,honkT:-1,gulpT:-1,yaw:0,pitch:0,spread:0,headBob:0,earT:1.2,skin:"styleB",modelType:"fluffy"};
  let F={hip:new A,knee:new A,ank:new A,tgt:new A,sh:new A,el:new A,wr:new A,elS:new A,wrS:new A,pole:new A,tmp:new A,trail:new A,headPos:new A,neckBase:new A,dir:new A};
  let nt=[Ft(0,0,0),Ft(0,0,0),Ft(0,0,0),Ft(0,0,0),Ft(0,0,0)],xt=new A,Pt=new A,Rt=new A,ce=new Oe,at=new A(1,0,0),gt=(ct,Mt)=>Mt.copy(ct.position).applyMatrix4(s.matrix);

  function yt(){St.honkT=0;St.earT=0}
  function wt(){St.gulpT=0;St.earT=0}
  function setCapySkin(skin){
    St.skin=skin;
    if(skin==="styleA"){
      i.scarfKnot.color.set("#e03a3c");i.scarfKnot.emissiveIntensity=0;
      i.orangeMat.emissiveIntensity=.05;orangeLight.intensity=0;
    }else if(skin==="styleC"){
      i.scarfKnot.color.set("#5bb8e8");i.scarfKnot.emissiveIntensity=0;
      i.orangeMat.emissiveIntensity=.05;orangeLight.intensity=0;
    }else if(skin==="styleD"){
      i.scarfKnot.color.set("#b517ff");i.scarfKnot.emissive.set("#7b00ff");i.scarfKnot.emissiveIntensity=.8;
      i.orangeMat.emissiveIntensity=1.65;orangeLight.intensity=3.2;
    }else{
      i.scarfKnot.color.set("#d7263d");i.scarfKnot.emissiveIntensity=0;
      i.orangeMat.emissiveIntensity=.05;orangeLight.intensity=0;
    }
  }
  function setCapyModel(mType){
    St.modelType=mType;
    // Material & mesh adjustments per 3D Modeling Scheme:
    // 1. "realistic" (方案一：写实生态原比例)
    // 2. "fluffy"    (方案四：蓬松炸毛水豚君)
    // 3. "chibi"     (方案二：治愈毛绒奇异果版)
    // 4. "clay"      (方案三：手作粘土盲盒背带裤风)
    let isClay=mType==="clay",isChibi=mType==="chibi",isFluffy=mType==="fluffy";
    i.body.roughness=isClay?.62:.84;
    i.body.bumpScale=isClay?.05:isFluffy?.44:.34;
    i.body.clearcoat=isClay?.22:0;
    i.white.roughness=i.body.roughness;
    i.white.bumpScale=i.body.bumpScale;
    i.furLight.roughness=i.body.roughness;
    i.furLight.bumpScale=i.body.bumpScale;
    i.muzzlePad.roughness=isClay?.58:.78;
    i.muzzlePad.bumpScale=isClay?.04:.22;

    overallsGroup.visible=isClay;
    claySnoutBlock.visible=isClay;
    blushGroup.visible=isChibi||isClay;
    cheekTuftsGroup.visible=isFluffy||mType==="realistic";
    cheekTuftsGroup.scale.setScalar(isFluffy?1.18:.58);
    bodyTuftsGroup.visible=isFluffy||mType==="realistic";
    bodyTuftsGroup.scale.setScalar(isFluffy?1.15:.52);
    whiskerGroup.visible=!isClay;
    whiskerGroup.scale.setScalar(isFluffy?1.28:1.0);
    incisorGroup.scale.set(isClay?1.45:1,isClay?1.55:1,isClay?1.35:1);
  }
  setCapyModel("fluffy");

  function Wt(ct,Mt){
    let{t:It,crankAngle:P,pedal:jt,airborne:Yt,trick:R,look:_,grips:D,pedals:B,accel:k,oranges:oc=0,skin:sk="styleB",modelType:mType=St.modelType,headOrange:showHO=!0}=Mt;
    if(sk!==St.skin)setCapySkin(sk);
    if(mType!==St.modelType)setCapyModel(mType);

    let isChibi=St.modelType==="chibi",isClay=St.modelType==="clay",isFluffy=St.modelType==="fluffy";
    let lt=-Math.abs(Math.sin(P))*.012*jt;

    // Apply scheme-specific torso proportions (Kiwi roundness in Chibi, Plush fullness in Fluffy)
    if(isChibi)r.scale.set(1.04,.94,1.10);
    else if(isFluffy)r.scale.set(1.06,1.02,1.08);
    else if(isClay)r.scale.set(1.02,.98,1.04);
    else r.scale.set(1,1,1);

    s.position.set(Eh.x,Eh.y+lt+Yt*.025+R*.03,Eh.z);
    s.rotation.set(Math.sin(P)*.028*jt,0,M0+R*.14-Le(k,-3,3)*.012);
    s.updateMatrix();
    l.rotation.y=Math.sin(P)*.12*jt+Math.sin(It*2.5)*.04;
    l.rotation.z=R*.2;

    // Update Plump Two-Bone IK Hind Legs (Zero joint spheres!)
    for(let Tt of tt){
      gt(Tt.s<0?a.hipL:a.hipR,F.hip);
      let _t=Tt.s<0?B.L:B.R;
      F.tgt.set(_t.x-.028,_t.y+.032,_t.z*.96);
      F.pole.set(1,.22,Tt.s*.38);
      Fd(F.hip,F.tgt,wS,AS,F.pole,F.knee,F.ank);
      _h(Tt.thigh,F.hip,F.knee);
      _h(Tt.shin,F.knee,F.ank);
      Tt.foot.position.set(F.ank.x-.01,F.ank.y-.022,F.ank.z);
      Tt.foot.rotation.set(0,0,-.05+Math.sin(-P+(Tt.s>0?0:Math.PI)+.6)*.12);
    }

    // Update Plump Two-Bone IK Front Arms
    St.spread=mn(St.spread,R,5,ct);
    let it=ve(0,1,St.spread);
    let waveAng=Math.sin(It*8.5)*.35*Yt+Math.sin(It*4.2)*.28*it+it*.15;
    for(let Tt of te){
      let _t=Tt.s;
      gt(_t<0?a.shL:a.shR,F.sh);
      let L=_t<0?D.L:D.R;
      F.pole.set(-.25,-.25,_t*.85);
      Fd(F.sh,L,oo,ao,F.pole,F.el,F.wr);
      F.elS.set(.08,.11,_t*.19);
      F.wrS.set(.18,.26+Math.sin(It*6+_t)*.04,_t*.24);
      ce.setFromAxisAngle(at,-_t*waveAng);
      F.elS.applyQuaternion(ce).add(F.sh);
      F.wrS.applyQuaternion(ce).add(F.sh);
      F.el.lerp(F.elS,it);
      F.wr.lerp(F.wrS,it);
      _h(Tt.upperArm,F.sh,F.el);
      _h(Tt.foreArm,F.el,F.wr);
      Tt.wrist.position.copy(F.wr);
      Tt.wrist.rotation.set(0,_t*-.15*(1-it),Xe(-.25,.65,it));
    }

    // Update Integrated Head-Neck Position (Compact, thick, seamless head-to-shoulder transition!)
    gt(a.neck,F.neckBase);
    St.headBob=mn(St.headBob,lt*.22,10,ct);
    let headYOff=isChibi?.072:.082;
    F.headPos.set(F.neckBase.x+.042,F.neckBase.y+headYOff-lt*.45+St.headBob,0);

    let Y=0,mt=-.02;
    if(_){
      F.dir.subVectors(_,F.headPos);
      Y=Math.atan2(-F.dir.z,F.dir.x);
      mt=Math.atan2(F.dir.y,Math.hypot(F.dir.x,F.dir.z));
      F.dir.x<-.2&&(Y=Le(Y,-1.05,1.05));
    }
    Y=Le(Y,-.88,.88);
    mt=Le(mt,-.40,.40);

    let Q=0;
    St.honkT>=0&&(St.honkT+=ct,Q=Math.sin(Math.min(1,St.honkT/.75)*Math.PI),St.honkT>.75&&(St.honkT=-1));
    let Z=0;
    St.gulpT>=0&&(St.gulpT+=ct,Z=St.gulpT<.18?St.gulpT/.18:Math.max(0,1-(St.gulpT-.18)/.25),St.gulpT<.3&&(St.bulge=Math.max(St.bulge,St.gulpT/.3)),St.gulpT>1.1&&(St.gulpT=-1));

    mt+=Q*.35+Z*.25+R*.12;
    St.yaw=mn(St.yaw,Y,5,ct);
    St.pitch=mn(St.pitch,mt,6,ct);
    F.headPos.x-=Q*.012;
    F.headPos.y+=Q*.020;
    f.position.copy(F.headPos);

    // Apply scheme-specific Head Scale (Chibi 1.24x big head, Clay 1.15x, Fluffy 1.07x, Realistic 1.02x)
    let hScale=isChibi?1.24:isClay?1.15:isFluffy?1.07:1.02;
    f.scale.set(hScale,hScale*(isChibi?.98:1),hScale*(isChibi?1.05:1));
    f.rotation.set(Math.sin(It*1.3)*.025,St.yaw,St.pitch,"YZX");
    f.updateMatrix();

    // Chewing / Squeaking Lower Jaw + Puffing Cheek Pouches (嚼橘子时鼓腮帮!)
    let chewWave=St.gulpT>=0?Math.abs(Math.sin(St.gulpT*24)):0;
    let chew=chewWave*.38;
    St.jawTarget=Math.max(Q*.45,Z*.52,chew,Mt.mouthOpen||0);
    St.jaw=mn(St.jaw,St.jawTarget,20,ct);
    U.rotation.z=-St.jaw;
    St.bulge=Math.max(0,St.bulge-ct*.5);
    let cheekPuff=(isChibi?1.18:1.0)+chewWave*.36+Q*.24+St.bulge*.20;
    for(let cp of cheekPouches){
      let alt=St.gulpT>=0?Math.sin(St.gulpT*24+cp.s*.8)*.08:0;
      cp.mesh.scale.set(1.28*(cheekPuff+alt),.88*(cheekPuff+alt),.72*(cheekPuff+alt));
    }

    // Eyelid, Eye Scale & Blink animation (Chibi zen squint vs Clay big bead eyes vs Natural half-closed)
    St.nextBlink-=ct;
    St.nextBlink<=0&&St.blinkT<0&&(St.blinkT=0,St.nextBlink=2.2+Math.random()*3.8);
    let ht=0;
    St.blinkT>=0&&(St.blinkT+=ct,ht=Math.sin(Math.min(1,St.blinkT/.16)*Math.PI),St.blinkT>.16&&(St.blinkT=-1));
    let eyeScale=isClay?1.28:isChibi?.95:1.04;
    let zenSquint=isChibi?.02:sk==="styleA"?-.04:-.12;
    let lowerSquint=isChibi?.85:(chewWave*.55+Q*.45);
    for(let lidObj of M){
      lidObj.root.scale.setScalar(eyeScale);
      lidObj.blink.scale.y=Math.max(.001,ht>.05?ht*1.08:.001);
      lidObj.upper.rotation.z=zenSquint-(R*.12)+(chewWave*.08);
      lidObj.lower.scale.y=Math.max(.001,lowerSquint);
    }

    // High-Frequency Cupped Ear Flutter (小圆勺耳高频抖耳!)
    St.earT-=ct;
    let earFlick=0;
    if(St.earT<=0){
      earFlick=Math.sin((St.earT+.26)*52)*.42;
      if(St.earT<-.26)St.earT=1.4+Math.random()*3.0;
    }
    for(let eObj of ears){
      eObj.group.rotation.x=Math.sin(It*3.2+eObj.s)*(.06+Yt*.16)+earFlick*eObj.s+Q*.28;
      eObj.group.rotation.z=Math.cos(It*2.4)*.05+earFlick*.2;
    }

    // Wobbling Forehead Cowlick / Fur Tuft (头顶呆毛随风摇摆!) & Whiskers vibration
    let ahogeBase=isFluffy?1.38:isClay?.75:1.05;
    ahogeGroup.scale.setScalar(ahogeBase);
    ahogeGroup.rotation.z=Math.sin(It*6.5)*.12*(1+Yt*1.5)-Le(k,-3,3)*.04+Q*.2;
    ahogeGroup.rotation.x=Math.cos(It*5.2)*.08-St.yaw*.15;
    whiskerGroup.rotation.z=Math.sin(It*11)*.025+chewWave*.06;

    // Update Thick Neck Spline & Scarf Collar Knot (tucked cleanly inside shoulder-to-head junction!)
    nt[0].copy(F.neckBase).add(F.tmp.set(-.01,-.055,0));
    nt[1].copy(F.neckBase).add(F.tmp.set(.005,-.015,0));
    nt[2].copy(F.neckBase).lerp(F.headPos,.52).add(F.tmp.set(.01,0,0));
    nt[3].set(-.015,-.025,0).applyMatrix4(f.matrix);
    nt[4].set(.01,0,0).applyMatrix4(f.matrix);
    h.update(nt);
    let bt=Math.round(h.tub*.24);
    u.position.copy(h._P[bt]);
    u.quaternion.setFromUnitVectors(Rt.set(0,0,1),h._T[bt]);

    // Headwear & Eyewear visibility
    let useHelmet=Mt.helmet&&(sk==="styleB");
    let useStrawHat=Mt.helmet&&(sk==="styleC");
    b.visible=useHelmet;
    strawHat.visible=useStrawHat;
    T.visible=Mt.glasses&&(sk!=="styleD");
    cyberGoggles.visible=Mt.glasses&&(sk==="styleD");

    // Position the Head Tangerine & Stacked Tangerine Tower right on top of flat head/helmet/hat!
    headOrangeGroup.visible=showHO;
    let baseOrangeY=useHelmet?.148:useStrawHat?.152:.102;
    headOrangeGroup.position.set(-.008,baseOrangeY,0);
    headOrangeGroup.rotation.z=Math.sin(It*3.2)*.05-St.yaw*.12;
    let stackThresholds=[2,5,10,18,30];
    for(let sIdx=0;sIdx<headStack.length;sIdx++){
      let pNode=headStack[sIdx];
      pNode.visible=showHO&&(oc>=stackThresholds[sIdx]);
      if(pNode.visible){
        pNode.rotation.z=Math.sin(It*4.5-sIdx*.7)*(.04+sIdx*.018)*(1+Yt*1.5);
        pNode.rotation.x=Math.cos(It*3.6-sIdx*.5)*(.03+sIdx*.012);
      }
    }
  }
  return{root:t,body:s,head:f,beakTip:K,mouth:J,knot:u,hitMeshes:e,update:Wt,honk:yt,gulp:wt,setSkin:setCapySkin,setModel:setCapyModel,materials:i,state:St};
}
var Eh,M0,wS,AS,oo,ao,Va,T0=ze(()=>{je();Ki();Fa();Gd();Eh=Ft(-.155,.815,0),M0=-.08,wS=.235,AS=.225,oo=.185,ao=.180,Va=.38});`;

// Custom 11_w0_particles_scarf: Add setTheme(skin) to Ah (Verlet Cloth Scarf)
const customW0Scarf = gameRef.slice(idxW0, idxA0).replace(
  'this.mesh=new rt(o,new Jt({vertexColors:!0,side:Se,roughness:.75}))',
  'this.mat=new Jt({vertexColors:!0,side:Se,roughness:.75,emissive:new ft("#000000"),emissiveIntensity:0}),this.mesh=new rt(o,this.mat)'
).replace(
  'reset(t,e){',
  `setTheme(skin){
    let colAttr=this.mesh.geometry.attributes.color;
    let a=colAttr.array,e=this.n;
    let c1=new ft("#d7263d"),c2=new ft("#fff4e6");
    this.mat.emissive.set("#000000");this.mat.emissiveIntensity=0;
    if(skin==="styleA"){c1.set("#e03a3c");c2.set("#fff6eb")}
    else if(skin==="styleC"){c1.set("#5bb8e8");c2.set("#ffffff")}
    else if(skin==="styleD"){c1.set("#9d1cff");c2.set("#00f5ff");this.mat.emissive.set("#2b99ff");this.mat.emissiveIntensity=.55}
    for(let d=0;d<e;d++){
      let f=skin==="styleA"?(d%2===0?c1:c2):skin==="styleC"?(d%3===0?c2:c1):skin==="styleD"?(d%2===0?c1:c2):(d>e-5&&d%2===0?c2:c1);
      for(let m=0;m<2;m++)a.set([f.r,f.g,f.b],(d*2+m)*3);
    }
    colAttr.needsUpdate=!0;
  }
  reset(t,e){`
);

// Custom 12_A0_audio: Adorable Capybara Squeak/Chirp-Whistle on honk()!
const origA0Audio = gameRef.slice(idxA0, idxHE);
const customA0Audio = origA0Audio.replace(
  /honk\(\)\{[\s\S]*?gulp\(t\)\{/,
  `honk(){
    // Cute Capybara rhythmic chirp / whistle-squeak ("咕唧~ 啾~")
    if(!this.enabled)return;
    let e=this.ctx.currentTime;
    this.tone({freq:520,glide:780,t:e,dur:.11,vol:.32,type:"sine"}).connect(this.reverb);
    this.tone({freq:680,glide:960,t:e+.13,dur:.14,vol:.36,type:"triangle"}).connect(this.reverb);
    this.tone({freq:880,glide:620,t:e+.29,dur:.16,vol:.25,type:"sine"}).connect(this.reverb);
  }
  gulp(t){`
);

// Custom 13_hE_main: Tangerine collectibles, 4 Skins switcher, Capybara achievements & UI
let customHE = gameRef.slice(idxHE);

// 1. Replace Ocean Jumper fish geometry with ShFish() while road collectibles use Sh() (3D Tangerine!)
customHE = customHE.replace(
  'df=new Jt({vertexColors:!0,metalness:.6,roughness:.25,emissive:new ft("#1f6b8f"),emissiveIntensity:.45,side:Se})',
  'df=new Jt({vertexColors:!0,metalness:.08,roughness:.32,emissive:new ft("#ff6a00"),emissiveIntensity:.38,side:Se}),fishMat=new Jt({vertexColors:!0,metalness:.6,roughness:.25,emissive:new ft("#1f6b8f"),emissiveIntensity:.45,side:Se})'
);
customHE = customHE.replace(
  'color:"#7fe3ff",transparent:!0,opacity:.55',
  'color:"#ffae42",transparent:!0,opacity:.55'
);
customHE = customHE.replace(
  'for(let i=0;i<5;i++){let t=new rt($0,df);',
  'var $0Fish=ShFish();for(let i=0;i<5;i++){let t=new rt($0Fish,fishMat);'
);
customHE = customHE.replace(
  't.halo.material.color.set(t.golden?"#ffd257":"#7fe3ff")',
  't.halo.material.color.set(t.golden?"#ffe66d":"#ffae42")'
);
// 2. Add modelType, skin, headOrange, duck settings to Ut
customHE = customHE.replace(
  'helmet:!0,glasses:oi("glasses","auto"),scarf:!0,lookMouse:!0',
  'modelType:oi("model","fluffy"),skin:oi("skin","styleB"),headOrange:!0,duck:!1,helmet:!1,glasses:oi("glasses","off"),scarf:!0,lookMouse:!0'
);
// 3. Camera label "鹈鹕视角" -> "水豚视角"
customHE = customHE.replace(
  '{id:"pov",label:"\\u9E48\\u9E55\\u89C6\\u89D2"}',
  '{id:"pov",label:"水豚视角"}'
);
// Adjust POV camera offset slightly for Capybara head
customHE = customHE.replace(
  'i.pos.set(.07,.05,0).applyMatrix4(t.matrixWorld)',
  'i.pos.set(.21,.055,0).applyMatrix4(t.matrixWorld)'
);
// 4. Pass oranges:N.fish to ai.update(...)
customHE = customHE.replace(
  'ai.update({wheelAngle:N.wheel,crankAngle:N.crank,steerAngle:N.steer,speed:N.speed,night:Za.night})',
  'ai.update({wheelAngle:N.wheel,crankAngle:N.crank,steerAngle:N.steer,speed:N.speed,night:Za.night,oranges:N.fish})'
);
// 5. Floating Tangerine popup text "+5 金橘!"
customHE = customHE.replace(
  'tE(t.golden?"+5 \\u91D1\\u9C7C!":"+1",t.golden)',
  'tE(t.golden?"+5 金橘!":"+1 🍊",t.golden)'
);
// 6. Capybara themed achievements O0
customHE = customHE.replace(
  /var O0=\{[\s\S]*?\};/,
  `var O0={
    fish1:["🍊","第一颗蜜柑","情绪稳定，张嘴就是干饭"],
    golden:["🌟","温泉金橘","吞下了一颗发光金橘 (+5)"],
    fish10:["🧺","十橘满篓","头顶和车篮开始叠罗汉了"],
    fish50:["🏆","海岸橘王","累计收集 50 颗蜜柑"],
    jump:["🦘","豚门起飞！","第一次带车跳跃"],
    trick:["🙌","放手特技","佛系松手欢呼 + 抬前轮"],
    trick3:["🎪","杂技水豚","完成 3 次放手特技"],
    speed30:["💨","时速 30","海风吹拂着水豚的毛发"],
    speed45:["⚡","疾风卡皮巴拉","时速突破 45 km/h 依然淡定"],
    km1:["🛣️","骑行 1 公里","海岸线巡航才刚刚开始"],
    km5:["🗺️","骑行 5 公里","真正的长途佛系骑手"],
    night:["🌙","星夜豚行","星光、萤火虫与路灯作伴"],
    bell10:["🔔","叮铃铃","按铃 10 次，海鸥已让路"],
    honk:["📣","咕唧——！","发出了情绪稳定的水豚叫声"]
  };`
);
// 7. Add KeyV shortcut to cycle 3D Modeling Schemes, and KeyX shortcut to cycle Costume Skins
customHE = customHE.replace(
  'case"KeyC":{',
  'case"KeyV":{cycleModel();break}case"KeyX":{cycleSkin();break}case"KeyC":{'
);
customHE = customHE.replace(
  'download=`pelican-ride-${Date.now()}.png`,t.click(),setTimeout(()=>URL.revokeObjectURL(t.href),2e3),uo("\\u{1F4F8}","\\u622A\\u56FE\\u5DF2\\u4FDD\\u5B58","\\u5206\\u4EAB\\u4F60\\u7684\\u9E48\\u9E55\\u9A91\\u884C\\u77AC\\u95F4")',
  'download=`capybara-ride-${Date.now()}.png`,t.click(),setTimeout(()=>URL.revokeObjectURL(t.href),2e3),uo("📸","截图已保存","分享你的卡皮巴拉骑行瞬间")'
);
// 8. Update lil-gui folder "鹈鹕" -> "卡皮巴拉 3D 建模 & 换装" and wire applyModel + applySkin
customHE = customHE.replace(
  'xf.add(Ut,"autopilot").name("\\u81EA\\u52A8\\u9A7E\\u9A76\\uFF08\\u8FFD\\u9C7C\\uFF09")',
  'xf.add(Ut,"autopilot").name("自动驾驶（追橘子）")'
);
customHE = customHE.replace(
  'var Ja=bi.addFolder("\\u9E48\\u9E55");Ja.add(Ut,"helmet").name("\\u5934\\u76D4");Ja.add(Ut,"glasses",{\\u81EA\\u52A8:"auto",\\u6234\\u4E0A:"on",\\u6458\\u4E0B:"off"}).name("\\u58A8\\u955C");Ja.add(Ut,"scarf").name("\\u56F4\\u5DFE").onChange(i=>Y0.mesh.visible=i);Ja.add(Ut,"lookMouse").name("\\u76EE\\u5149\\u8DDF\\u968F\\u9F20\\u6807");',
  `var modelLabels={
    fluffy:"方案四 · 蓬松炸毛水豚君",
    realistic:"方案一 · 写实生态原比例",
    chibi:"方案二 · 治愈毛绒奇异果",
    clay:"方案三 · 粘土盲盒背带裤"
  };
  var skinLabels={styleB:"装扮B · 潮酷机车",styleA:"装扮A · 佛系原皮",styleC:"装扮C · 治愈草帽",styleD:"装扮D · 赛博夜骑"};
  function applyModel(mType,notify=!1){
    Ut.modelType=mType;
    An.setModel(mType);
    if(notify){
      // Show unobstructed face when previewing 3D modeling schemes so head/ears/cowlick/eyes are crystal clear!
      Ut.helmet=!1;
      Ut.glasses="off";
    }
    document.querySelectorAll("[data-model]").forEach(el=>el.classList.toggle("on",el.dataset.model===mType));
    if(notify&&N.started)uo("🦫",modelLabels[mType]||"已切换建模","按 V 键可随时切换 4 套 3D 水豚建模方案");
  }
  function cycleModel(){
    let order=["fluffy","realistic","chibi","clay"];
    let idx=(order.indexOf(Ut.modelType)+1)%order.length;
    applyModel(order[idx],!0);
  }
  function applySkin(sk,notify=!1){
    Ut.skin=sk;
    if(sk==="styleA"){Ut.helmet=!1;Ut.glasses="off";Ut.duck=!1}
    else if(sk==="styleC"){Ut.helmet=!0;Ut.glasses="off";Ut.duck=!0}
    else if(sk==="styleD"){Ut.helmet=!1;Ut.glasses="on";Ut.duck=!1}
    else{if(notify){Ut.helmet=!0;Ut.glasses="on"}Ut.duck=!1}
    An.setSkin(sk);
    ai.setSkin(sk,Ut.duck);
    Y0.setTheme(sk);
    document.querySelectorAll("[data-skin]").forEach(el=>el.classList.toggle("on",el.dataset.skin===sk));
    if(notify&&N.started)uo("🎨",skinLabels[sk]||"已换装","按 X 键可随时切换配饰与单车主题");
  }
  function cycleSkin(){
    let order=["styleB","styleA","styleC","styleD"];
    let idx=(order.indexOf(Ut.skin)+1)%order.length;
    applySkin(order[idx],!0);
  }
  document.querySelectorAll("[data-model]").forEach(el=>{
    el.addEventListener("click",e=>{e.stopPropagation();applyModel(el.dataset.model,!0)});
  });
  document.querySelectorAll("[data-skin]").forEach(el=>{
    el.addEventListener("click",e=>{e.stopPropagation();applySkin(el.dataset.skin,!0)});
  });
  var Ja=bi.addFolder("卡皮巴拉 3D 建模 & 换装");
  Ja.add(Ut,"modelType",{"方案四 · 蓬松炸毛水豚君":"fluffy","方案一 · 写实生态原比例":"realistic","方案二 · 治愈毛绒奇异果":"chibi","方案三 · 粘土盲盒背带裤":"clay"}).name("3D 建模方案 (V)").listen().onChange(v=>applyModel(v,!0));
  Ja.add(Ut,"skin",{"装扮B · 潮酷机车":"styleB","装扮A · 佛系温泉":"styleA","装扮C · 治愈草帽":"styleC","装扮D · 赛博夜骑":"styleD"}).name("配饰与单车 (X)").listen().onChange(v=>applySkin(v,!0));
  Ja.add(Ut,"headOrange").name("头顶蜜柑叠叠乐").listen();
  Ja.add(Ut,"helmet").name("佩戴头盔 / 草帽").listen();
  Ja.add(Ut,"glasses",{自动:"auto",戴上:"on",摘下:"off"}).name("墨镜 / 护目镜").listen();
  Ja.add(Ut,"scarf").name("防风围巾").listen().onChange(i=>Y0.mesh.visible=i);
  Ja.add(Ut,"duck").name("车篮小黄鸭").listen().onChange(i=>ai.rubberDuck.visible=i);
  Ja.add(Ut,"lookMouse").name("目光跟随鼠标");
  applyModel(Ut.modelType,!1);
  applySkin(Ut.skin,!1);`
);
customHE = customHE.replace(
  'setTimeout(()=>uo("\\u{1F426}","\\u51FA\\u53D1\\uFF01"',
  'setTimeout(()=>uo("🦫","豚门出发！"'
);
customHE = customHE.replace(
  'helmet:Ut.helmet,glasses:n})',
  'helmet:Ut.helmet,glasses:n,oranges:N.fish,skin:Ut.skin,modelType:Ut.modelType,headOrange:Ut.headOrange})'
);

const fullScript = vendorPrelude + coreMathSkyOcean + customFaTextures + coreWorld + customGdItem + customY0Bike + customT0Capybara + customW0Scarf + customA0Audio + customHE;

// Verify JS syntax and run headless 3D procedural builder & animation test
try {
  new Function(fullScript);
  console.log('JS syntax check PASSED! Total script length:', fullScript.length);

  // Also test executing all 3D procedural builders (Sh, ShFish, v0, E0, Ah), 4 3D Modeling Schemes, and 4 Skins!
  const hEIdx = fullScript.indexOf('var hE=dg(');
  const modulesCode = fullScript.slice(fullScript.indexOf('(()=>{') + 6, hEIdx);
  global.document = {
    createElementNS: () => ({ style: {} }),
    createElement: () => ({
      style: {},
      classList: { add(){}, toggle(){}, remove(){} },
      setAttribute(){},
      appendChild(){},
      addEventListener(){},
      getContext: () => ({
        fillStyle: '', strokeStyle: '', lineWidth: 1, font: '',
        fillRect(){}, clearRect(){}, strokeRect(){},
        createImageData: (w, h) => ({ data: new Uint8ClampedArray(w * h * 4) }),
        putImageData(){},
        createLinearGradient: () => ({ addColorStop(){} }),
        createRadialGradient: () => ({ addColorStop(){} }),
        save(){}, restore(){}, translate(){}, rotate(){}, scale(){},
        beginPath(){}, closePath(){}, moveTo(){}, lineTo(){}, arc(){}, arcTo(){},
        ellipse(){}, roundRect(){}, quadraticCurveTo(){}, fill(){}, stroke(){},
        strokeText(){}, fillText(){}
      })
    })
  };
  global.window = { matchMedia: () => ({ matches: false }), addEventListener(){}, removeEventListener(){} };
  global.performance = { now: () => 1000 };
  const testFn = new Function(modulesCode + `
    je(); Ki(); yh(); Fa(); Gd(); y0(); T0(); w0();
    const orangeG = Sh();
    const fishG = ShFish();
    if (!orangeG || !orangeG.attributes.position) throw new Error('Tangerine geometry failed');
    if (!fishG || !fishG.attributes.position) throw new Error('Fish geometry failed');
    console.log('Tangerine vertices:', orangeG.attributes.position.count, 'Fish vertices:', fishG.attributes.position.count);
    const torsoG = CS();
    torsoG.computeBoundingBox();
    const tBox = torsoG.boundingBox;
    const tSpan = { x: +(tBox.max.x - tBox.min.x).toFixed(3), y: +(tBox.max.y - tBox.min.y).toFixed(3), z: +(tBox.max.z - tBox.min.z).toFixed(3) };
    const limbG = buildPlumpLimb(0.112, 0.022, 0.076, '#9e673a', '#8a562d');
    limbG.computeBoundingBox();
    const lBox = limbG.boundingBox;
    const lSpan = { x: +(lBox.max.x - lBox.min.x).toFixed(3), y: +(lBox.max.y - lBox.min.y).toFixed(3), z: +(lBox.max.z - lBox.min.z).toFixed(3) };
    const headG = buildCapyHeadGeom();
    headG.computeBoundingBox();
    const hBox = headG.boundingBox;
    const hSpan = { x: +(hBox.max.x - hBox.min.x).toFixed(3), y: +(hBox.max.y - hBox.min.y).toFixed(3), z: +(hBox.max.z - hBox.min.z).toFixed(3) };
    console.log('3D Bounding Box Spans -> Torso:', tSpan, 'Thigh:', lSpan, 'Head:', hSpan);
    if (tSpan.x < 0.40 || tSpan.z < 0.40) throw new Error('Torso is not plump in 3D: ' + JSON.stringify(tSpan));
    if (lSpan.x < 0.22 || lSpan.z < 0.18) throw new Error('Limb is not plump in 3D: ' + JSON.stringify(lSpan));
    const bike = v0();
    const capy = E0();
    const scarf = new Ah({ add(){} });
    for (const mType of ['fluffy', 'realistic', 'chibi', 'clay']) {
      for (const sk of ['styleB', 'styleA', 'styleC', 'styleD']) {
        bike.setSkin(sk);
        capy.setSkin(sk);
        capy.setModel(mType);
        scarf.setTheme(sk);
        bike.update({ wheelAngle: 1.2, crankAngle: 0.8, steerAngle: 0.1, speed: 8, night: 0.5, oranges: 35 });
        capy.update(0.016, {
          t: 2.5, crankAngle: 0.8, pedal: 1, airborne: 0, trick: 0.5, accel: 1,
          look: Ft(2, 1.2, 0),
          grips: { L: Ft(0.22, 0.86, -0.24), R: Ft(0.22, 0.86, 0.24) },
          pedals: { L: Ft(-0.07, 0.17, -0.12), R: Ft(-0.07, 0.40, 0.12) },
          helmet: true, glasses: true, oranges: 35, skin: sk, modelType: mType, headOrange: true
        });
      }
    }
    console.log('3D Procedural Builders, 4 Modeling Schemes & 4 Skins Animation Loop Test PASSED!');
  `);
  testFn();
} catch (err) {
  console.error('JS check error:', err);
  process.exit(1);
}

// Now build the complete index.html with Capybara SVG, 4 3D Modeling Scheme Selector Cards, 4 Costume Pills, and HUD!
const indexHtml = `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover" />
<title>卡皮巴拉骑单车 · Capybara on a Bike</title>
<meta name="description" content="一只顶着蜜柑、情绪稳定的卡皮巴拉，骑着复古自行车沿海岸线追橘子。实时 3D：4 套真实可爱水豚 3D 建模方案、双骨骼 IK 踩踏、Verlet 布料围巾、Gerstner 海浪与合成音乐。" />
<meta name="theme-color" content="#0d1424" />
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Ccircle cx='16' cy='48' r='11' fill='none' stroke='%23138a8a' stroke-width='5'/%3E%3Ccircle cx='48' cy='48' r='11' fill='none' stroke='%23138a8a' stroke-width='5'/%3E%3Cellipse cx='26' cy='28' rx='13' ry='10' fill='%23a66e40'/%3E%3Crect x='30' y='13' width='19' height='13' rx='6' fill='%23a66e40'/%3E%3Ccircle cx='39' cy='9' r='5' fill='%23ff8814'/%3E%3C/svg%3E" />
<style>
:root {
  --glass: rgba(14, 20, 34, 0.52);
  --glass-strong: rgba(10, 14, 26, 0.76);
  --stroke: rgba(255, 255, 255, 0.14);
  --text: #f4f6fb;
  --muted: rgba(236, 240, 250, 0.68);
  --accent: #ffb547;
  --accent-2: #3fd0c9;
  --danger: #ff5a6e;
  --radius: 16px;
  --shadow: 0 10px 40px rgba(0, 0, 0, 0.35);
  --font: "PingFang SC", "HarmonyOS Sans SC", "Microsoft YaHei", -apple-system, "Segoe UI", Roboto, sans-serif;
  color-scheme: dark;
}
* { box-sizing: border-box; }
[hidden] { display: none !important; }
html, body { margin: 0; height: 100%; overflow: hidden; background: #0d1424; color: var(--text); font-family: var(--font); -webkit-font-smoothing: antialiased; touch-action: none; user-select: none; -webkit-user-select: none; }
#app, #app canvas { position: fixed; inset: 0; width: 100%; height: 100%; display: block; }
button { font: inherit; color: inherit; }

/* ---------- 开场 ---------- */
#intro { position: fixed; inset: 0; z-index: 50; display: flex; flex-direction: column; overflow-y: auto; padding: 16px; touch-action: pan-y; background: radial-gradient(120% 90% at 70% 10%, rgba(255, 150, 90, 0.22), transparent 60%), linear-gradient(180deg, rgba(10, 14, 30, 0.42), rgba(8, 10, 22, 0.74)); backdrop-filter: blur(2px); transition: opacity 0.9s ease, visibility 0.9s; }
body.started #intro { opacity: 0; visibility: hidden; pointer-events: none; }
.intro-card { width: min(760px, 100%); text-align: center; margin: auto; }
.intro-art { width: min(230px, 56vw); height: auto; margin: 0 auto 2px; display: block; filter: drop-shadow(0 12px 30px rgba(0,0,0,0.4)); }
.intro-art .wheel { transform-box: fill-box; transform-origin: center; animation: spin 1.1s linear infinite; }
.intro-art .road { stroke-dasharray: 18 14; animation: road 0.6s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
@keyframes road { to { stroke-dashoffset: -32; } }
.intro-art .bob { animation: bob 0.55s ease-in-out infinite alternate; }
@keyframes bob { to { transform: translateY(2.5px); } }
h1 { margin: 0; font-size: clamp(30px, 6vw, 50px); letter-spacing: 0.04em; font-weight: 900; background: linear-gradient(92deg, #fff7e6, #ffc27a 45%, #ff8a5b); -webkit-background-clip: text; background-clip: text; color: transparent; }
.sub { margin: 4px 0 10px; color: var(--muted); font-size: clamp(13px, 2vw, 15px); line-height: 1.5; }
.sec-label { font-size: 12px; font-weight: 700; color: #ffd27a; letter-spacing: 0.06em; margin: 6px 0 7px; text-transform: uppercase; }

/* 4 套 3D 建模方案卡片选择器 */
.skin-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin: 0 auto 10px; max-width: 700px; }
.skin-card { cursor: pointer; background: rgba(14, 20, 36, 0.68); border: 1.5px solid var(--stroke); border-radius: 13px; padding: 6px; text-align: center; transition: all 0.2s ease; display: flex; flex-direction: column; align-items: center; gap: 4px; }
.skin-card:hover { transform: translateY(-2px); background: rgba(255, 255, 255, 0.12); }
.skin-card.on { border-color: var(--accent); background: rgba(255, 181, 71, 0.20); box-shadow: 0 6px 22px rgba(255, 150, 50, 0.30); }
.skin-card img { width: 100%; aspect-ratio: 4/3; object-fit: cover; border-radius: 8px; display: block; }
.skin-card b { font-size: 12px; color: #fff; display: block; }
.skin-card small { font-size: 10.5px; color: var(--muted); line-height: 1.2; }

/* 4 套配饰与单车主题快捷胶囊 */
.costume-bar { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; margin: 0 auto 14px; }
.costume-pill { cursor: pointer; padding: 6px 13px; border-radius: 999px; font-size: 12px; background: rgba(14, 20, 36, 0.65); border: 1px solid var(--stroke); color: var(--muted); transition: all 0.15s; }
.costume-pill:hover { color: #fff; background: rgba(255,255,255,0.12); }
.costume-pill.on { color: #1a1206; background: linear-gradient(135deg, #8ce8e2, #3fd0c9); border-color: transparent; font-weight: 700; }

.cta { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
.btn-primary { border: 0; cursor: pointer; padding: 12px 28px; border-radius: 999px; font-size: 16px; font-weight: 800; letter-spacing: 0.05em; color: #2a1400; background: linear-gradient(135deg, #ffd27a, #ff9a4d); box-shadow: 0 10px 30px rgba(255, 140, 60, 0.45), inset 0 1px 0 rgba(255,255,255,0.6); transition: transform 0.15s ease, box-shadow 0.2s; }
.btn-primary:hover { transform: translateY(-2px); box-shadow: 0 14px 36px rgba(255, 140, 60, 0.55); }
.btn-ghost { cursor: pointer; padding: 12px 20px; border-radius: 999px; font-size: 14px; background: rgba(255,255,255,0.08); border: 1px solid var(--stroke); }
.btn-ghost:hover { background: rgba(255,255,255,0.14); }
.keys-hint { margin-top: 12px; color: var(--muted); font-size: 11.5px; line-height: 1.75; }
kbd { display: inline-block; min-width: 22px; padding: 1px 6px; margin: 0 2px; border-radius: 6px; font: 600 11.5px/18px ui-monospace, Menlo, monospace; text-align: center; background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.2); border-bottom-width: 2px; color: #fff; }

/* ---------- HUD ---------- */
.hud { position: fixed; inset: 0; pointer-events: none; z-index: 10; opacity: 0; transition: opacity 0.8s ease 0.3s; }
body.started .hud { opacity: 1; }
body.hide-ui .hud, body.hide-ui .hud * { opacity: 0 !important; visibility: hidden !important; }
.panel { pointer-events: auto; background: var(--glass); border: 1px solid var(--stroke); border-radius: var(--radius); box-shadow: var(--shadow); backdrop-filter: blur(14px) saturate(1.3); -webkit-backdrop-filter: blur(14px) saturate(1.3); }
.brand { position: absolute; top: max(14px, env(safe-area-inset-top)); left: 16px; padding: 10px 14px; display: flex; gap: 10px; align-items: center; }
.brand b { font-size: 15px; letter-spacing: 0.03em; }
.brand small { display: block; font-size: 11px; color: var(--muted); margin-top: 2px; }
.brand .logo { font-size: 24px; }
.models-hud { position: absolute; top: calc(max(14px, env(safe-area-inset-top)) + 60px); left: 16px; display: flex; gap: 3px; padding: 4px; }
.skins-hud { position: absolute; top: calc(max(14px, env(safe-area-inset-top)) + 100px); left: 16px; display: flex; gap: 3px; padding: 4px; }
.models-hud button, .skins-hud button { pointer-events: auto; border: 0; background: transparent; cursor: pointer; padding: 5px 8px; border-radius: 9px; font-size: 11.5px; color: var(--muted); white-space: nowrap; transition: all 0.15s; }
.models-hud button:hover, .skins-hud button:hover { color: #fff; background: rgba(255,255,255,0.08); }
.models-hud button.on { color: #1a1206; background: linear-gradient(135deg, #ffd27a, #ffab5e); font-weight: 700; }
.skins-hud button.on { color: #061a1a; background: linear-gradient(135deg, #8ce8e2, #3fd0c9); font-weight: 700; }
.tools { position: absolute; top: max(14px, env(safe-area-inset-top)); right: 16px; display: flex; gap: 6px; padding: 6px; }
.icon-btn { pointer-events: auto; width: 38px; height: 38px; border-radius: 11px; border: 0; background: transparent; cursor: pointer; display: grid; place-items: center; font-size: 17px; transition: background 0.15s; position: relative; color: inherit; text-decoration: none; }
.icon-btn:hover { background: rgba(255,255,255,0.12); }
.icon-btn.off::after { content: ""; position: absolute; width: 22px; height: 2px; background: var(--danger); transform: rotate(-45deg); border-radius: 2px; }
.icon-btn.on { background: rgba(63, 208, 201, 0.22); }
.cams { position: absolute; top: max(14px, env(safe-area-inset-top)); left: 50%; transform: translateX(-50%); display: flex; gap: 4px; padding: 5px; }
.cams button { pointer-events: auto; border: 0; background: transparent; cursor: pointer; padding: 7px 12px; border-radius: 10px; font-size: 13px; color: var(--muted); white-space: nowrap; transition: all 0.15s; }
.cams button:hover { color: #fff; background: rgba(255,255,255,0.08); }
.cams button.on { color: #1a1206; background: linear-gradient(135deg, #ffd27a, #ffab5e); font-weight: 700; }
.dash { position: absolute; left: 16px; bottom: max(16px, env(safe-area-inset-bottom)); padding: 12px 16px 12px 12px; display: flex; gap: 14px; align-items: center; }
.gauge { position: relative; width: 124px; height: 124px; flex: none; }
.gauge svg { width: 100%; height: 100%; transform: rotate(135deg); }
.gauge .bg { fill: none; stroke: rgba(255,255,255,0.12); stroke-width: 9; stroke-linecap: round; stroke-dasharray: 245 400; }
.gauge .fg { fill: none; stroke: url(#gGrad); stroke-width: 9; stroke-linecap: round; stroke-dasharray: 245 400; transition: stroke-dashoffset 0.12s linear; }
.gauge .val { position: absolute; inset: 0; display: grid; place-items: center; text-align: center; }
.gauge .val b { font-size: 36px; font-weight: 800; font-variant-numeric: tabular-nums; line-height: 1; }
.gauge .val small { display: block; font-size: 11px; color: var(--muted); margin-top: 3px; letter-spacing: 0.08em; }
.stats { display: grid; grid-template-columns: auto auto; gap: 5px 14px; font-size: 12.5px; align-items: baseline; }
.stats span { color: var(--muted); }
.stats b { font-variant-numeric: tabular-nums; font-size: 15px; text-align: right; }
.score { position: absolute; right: 16px; bottom: max(16px, env(safe-area-inset-bottom)); padding: 12px 16px; min-width: 210px; }
.score .row { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.fish { display: flex; align-items: center; gap: 8px; }
.fish .ico { font-size: 26px; }
#fishCount { font-size: 34px; font-weight: 900; font-variant-numeric: tabular-nums; color: var(--accent); display: inline-block; }
#fishCount.bump { animation: bump 0.45s ease; }
@keyframes bump { 30% { transform: scale(1.35); color: #fff3c4; } }
.ach { font-size: 12px; color: var(--muted); text-align: right; }
.ach b { color: var(--text); font-size: 14px; }
.timebar { margin-top: 10px; display: flex; align-items: center; gap: 8px; }
.timebar input { flex: 1; accent-color: var(--accent); pointer-events: auto; cursor: pointer; }
#clockVal { font-variant-numeric: tabular-nums; font-weight: 700; min-width: 44px; }
.hints { position: absolute; left: 50%; transform: translateX(-50%); bottom: max(16px, env(safe-area-inset-bottom)); padding: 8px 14px; font-size: 12px; color: var(--muted); display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; max-width: calc(100vw - 560px); }
.hints span { white-space: nowrap; }
#fps { position: absolute; top: 72px; right: 18px; font: 11px ui-monospace, Menlo, monospace; color: var(--muted); padding: 4px 8px; }
#toasts { position: fixed; top: 138px; left: 50%; transform: translateX(-50%); display: flex; flex-direction: column; gap: 8px; align-items: center; z-index: 30; pointer-events: none; }
.toast { display: flex; align-items: center; gap: 10px; padding: 10px 16px 10px 12px; border-radius: 14px; background: var(--glass-strong); border: 1px solid rgba(255, 210, 122, 0.35); box-shadow: var(--shadow); backdrop-filter: blur(12px); transform: translateY(-14px) scale(0.96); opacity: 0; transition: all 0.45s cubic-bezier(.2,1.4,.4,1); }
.toast.in { transform: none; opacity: 1; }
.toast .emo { font-size: 24px; }
.toast b { display: block; font-size: 14px; }
.toast small { color: var(--muted); font-size: 12px; }
.pop { position: fixed; z-index: 25; pointer-events: none; font-weight: 900; font-size: 22px; color: #ffd080; text-shadow: 0 2px 10px rgba(255, 140, 0, 0.85); transform: translate(-50%, -50%); animation: pop 1.1s ease-out forwards; }
.pop.gold { color: #ffe88a; font-size: 26px; text-shadow: 0 2px 14px rgba(255, 180, 0, 0.95); }
@keyframes pop { to { transform: translate(-50%, -160%); opacity: 0; } }
#guiHost { position: fixed; top: 70px; right: 16px; z-index: 20; max-height: calc(100vh - 220px); overflow-y: auto; border-radius: 12px; }
#guiHost .lil-gui.lil-root { --background-color: rgba(12, 16, 28, 0.78); --title-background-color: rgba(255, 181, 71, 0.16); --title-text-color: #ffe3b3; --widget-color: rgba(255,255,255,0.1); --hover-color: rgba(255,255,255,0.16); --focus-color: rgba(255,255,255,0.22); --number-color: #ffc27a; --string-color: #8ce8e2; --font-family: var(--font); --font-size: 12px; --input-font-size: 12px; --width: 280px; border-radius: 12px; overflow: hidden; backdrop-filter: blur(14px); border: 1px solid var(--stroke); }
body:not(.started) #guiHost { display: none; }
/* 电影模式黑边 */
.bars::before, .bars::after { content: ""; position: fixed; left: 0; right: 0; height: 0; background: #000; z-index: 5; transition: height 0.8s cubic-bezier(.6,0,.2,1); pointer-events: none; }
.bars::before { top: 0; }
.bars::after { bottom: 0; }
body.cinematic.bars::before, body.cinematic.bars::after { height: 9vh; }
body.cinematic.started .dash, body.cinematic.started .score, body.cinematic.started .hints { opacity: 0.35; }
#cut { position: fixed; inset: 0; background: #000; opacity: 0; pointer-events: none; z-index: 6; }
#cut.go { animation: cut 0.38s ease; }
@keyframes cut { 0% { opacity: 0; } 35% { opacity: 0.85; } 100% { opacity: 0; } }
/* 帮助 */
#help { position: fixed; inset: 0; z-index: 40; display: none; place-items: center; background: rgba(0,0,0,0.45); padding: 16px; }
#help.show { display: grid; }
#help .panel { max-width: 560px; width: 100%; padding: 22px 24px; }
#help h3 { margin: 0 0 12px; }
#help ul { margin: 0; padding: 0; list-style: none; display: grid; grid-template-columns: 1fr 1fr; gap: 8px 18px; font-size: 13.5px; }
#help li { color: var(--muted); }
#help .close { margin-top: 16px; }
#help p { color: var(--muted); font-size: 12.5px; line-height: 1.7; margin: 14px 0 0; }
/* 触屏控制 */
.touch { display: none; }
@media (pointer: coarse) {
  .touch { display: block; }
  .hints { display: none; }
}
.touch .pad { position: absolute; bottom: 150px; display: flex; gap: 10px; pointer-events: auto; }
.touch .left { left: 16px; }
.touch .right { right: 16px; flex-direction: column; align-items: flex-end; }
.touch .rowb { display: flex; gap: 10px; }
.tbtn { pointer-events: auto; width: 60px; height: 60px; border-radius: 50%; border: 1px solid var(--stroke); background: var(--glass); backdrop-filter: blur(10px); font-size: 22px; display: grid; place-items: center; touch-action: none; }
.tbtn.on, .tbtn:active { background: rgba(255, 181, 71, 0.4); }
.tbtn.big { width: 72px; height: 72px; }
#fallback { position: fixed; inset: 0; display: grid; place-items: center; z-index: 99; background: #0d1424; padding: 24px; text-align: center; }
@media (max-width: 900px) {
  .cams { top: calc(max(14px, env(safe-area-inset-top)) + 58px); left: 16px; right: 16px; transform: none; overflow-x: auto; scrollbar-width: none; }
  .models-hud { top: calc(max(14px, env(safe-area-inset-top)) + 102px); }
  .skins-hud { top: calc(max(14px, env(safe-area-inset-top)) + 140px); }
  .skin-grid { grid-template-columns: repeat(2, 1fr); max-width: 420px; }
  .cams::-webkit-scrollbar { display: none; }
  .cams button { padding: 6px 9px; font-size: 12px; }
  .brand small { display: none; }
  .gauge { width: 96px; height: 96px; }
  .gauge .val b { font-size: 28px; }
  .score { min-width: 0; padding: 10px 12px; }
  .stats { font-size: 11.5px; gap: 3px 10px; }
  .stats b { font-size: 13px; }
  .timebar { display: none; }
  #help ul { grid-template-columns: 1fr; }
}
@media (max-width: 560px) {
  .brand > div { display: none; }
  .dash { padding: 8px 10px 8px 8px; gap: 8px; }
  .stats { display: none; }
  .tools { gap: 4px; padding: 5px; }
  .tools .icon-btn { width: 32px; height: 32px; font-size: 14px; }
  .brand { padding: 8px 10px; }
  .brand b { font-size: 13px; }
}
@media (max-width: 1180px) { .hints { display: none; } }
</style>
</head>
<body class="bars">
<div id="app"></div>
<div id="cut"></div>
<div id="fallback" hidden>当前浏览器不支持 WebGL，无法显示 3D 场景。请换用新版 Chrome / Edge / Safari。</div>

<section id="intro">
  <div class="intro-card">
    <svg class="intro-art" viewBox="0 0 300 195" aria-hidden="true">
      <line class="road" x1="0" y1="180" x2="300" y2="180" stroke="rgba(255,255,255,0.5)" stroke-width="3" />
      <g class="wheel"><circle cx="84" cy="142" r="36" fill="none" stroke="#3fd0c9" stroke-width="5"/><path d="M84 106 V178 M48 142 H120 M59 117 L109 167 M59 167 L109 117" stroke="#cfe" stroke-width="1.3"/></g>
      <g class="wheel"><circle cx="210" cy="142" r="36" fill="none" stroke="#3fd0c9" stroke-width="5"/><path d="M210 106 V178 M174 142 H246 M185 117 L235 167 M185 167 L235 117" stroke="#cfe" stroke-width="1.3"/></g>
      <path d="M84 142 L140 144 L186 100 L118 100 Z M140 144 L112 86 M210 142 L192 82 L178 80" fill="none" stroke="#138a8a" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"/>
      <rect x="192" y="80" width="26" height="20" rx="4" fill="#c79252" stroke="#7a4f2a" stroke-width="2"/>
      <circle cx="199" cy="78" r="5" fill="#ff8814"/><circle cx="209" cy="77" r="5" fill="#ff9e2c"/>
      <g class="bob">
        <!-- Upright Pear-Shaped Capybara Body sitting on saddle -->
        <ellipse cx="122" cy="76" rx="34" ry="42" fill="#a66e40" transform="rotate(14 122 76)"/>
        <!-- Broad Flat-Topped Capybara Head & Blunt Snout -->
        <rect x="116" y="20" width="72" height="46" rx="20" fill="#b37c4e" transform="rotate(-2 152 43)"/>
        <rect x="160" y="23" width="28" height="38" rx="12" fill="#462914" transform="rotate(-2 174 42)"/>
        <!-- Cute Cupped Spoon Ear -->
        <ellipse cx="124" cy="22" rx="6.5" ry="9.5" fill="#462914" transform="rotate(-24 124 22)"/>
        <!-- Chill Half-Closed Eye -->
        <ellipse cx="148" cy="34" rx="4.5" ry="3" fill="#140a05"/>
        <line x1="142" y1="33" x2="154" y2="33" stroke="#6e4423" stroke-width="2.5" stroke-linecap="round"/>
        <!-- Forehead Cowlick Tuft & Tangerine on top! -->
        <path d="M158 20 Q 163 11 168 18" stroke="#cca074" stroke-width="4" fill="none" stroke-linecap="round"/>
        <circle cx="146" cy="11" r="8.5" fill="#ff8814"/>
        <path d="M146 3 Q 154 -2 157 4 Q 151 6 146 3 Z" fill="#4cb528"/>
        <!-- Plump Capybara Arm & Drumstick Leg -->
        <path d="M138 68 L178 82" stroke="#8c5830" stroke-width="12" stroke-linecap="round"/>
        <path d="M116 96 L138 140" stroke="#8c5830" stroke-width="14" stroke-linecap="round"/>
        <!-- Flowing Red Scarf -->
        <path d="M142 58 C 108 48, 84 66, 54 56" stroke="#d7263d" stroke-width="9" fill="none" stroke-linecap="round"/>
      </g>
    </svg>
    <h1>卡皮巴拉骑单车</h1>
    <p class="sub">重构升级版 3D 水豚建模：头颈肩一体流线、方圆大钝吻、肉乎乎无球关节短腿、嚼橘子鼓腮帮与高频抖耳。<br />支持 <b>4 套 3D 骨骼网格方案 (按 V)</b> 与 <b>4 套主题装扮 (按 X)</b> 实时无缝切换！</p>
    <div class="sec-label">🦫 选择 3D 水豚建模方案（游戏内按 V 键或点击左上角随时切换）</div>
    <div class="skin-grid">
      <div class="skin-card on" data-model="fluffy">
        <img src="assets/model_4.jpg" alt="方案四 蓬松炸毛水豚君" />
        <b>方案四 · 蓬松水豚君 (默认)</b>
        <small>多层立体炸毛簇 + 摇摆呆毛 + 长胡须</small>
      </div>
      <div class="skin-card" data-model="realistic">
        <img src="assets/model_1.jpg" alt="方案一 写实生态原比例" />
        <b>方案一 · 写实生态原比例</b>
        <small>1:2.1 自然比例 + 一体肩颈 + 方圆钝吻</small>
      </div>
      <div class="skin-card" data-model="chibi">
        <img src="assets/model_2.jpg" alt="方案二 治愈毛绒奇异果" />
        <b>方案二 · 治愈毛绒奇异果</b>
        <small>二头身大头 + 鼓鼓腮帮红晕 + 一字眯眼</small>
      </div>
      <div class="skin-card" data-model="clay">
        <img src="assets/model_3.jpg" alt="方案三 粘土盲盒手办风" />
        <b>方案三 · 粘土盲盒手办风</b>
        <small>吐司方鼻 + 呆萌白门牙 + 3D 蓝背带裤</small>
      </div>
    </div>
    <div class="sec-label">🎨 选择配饰与单车主题（游戏内按 X 键随时换装）</div>
    <div class="costume-bar">
      <button class="costume-pill on" data-skin="styleB">🕶️ 风格B · 潮酷机车</button>
      <button class="costume-pill" data-skin="styleA">🍊 风格A · 佛系温泉</button>
      <button class="costume-pill" data-skin="styleC">👒 风格C · 草帽小黄鸭</button>
      <button class="costume-pill" data-skin="styleD">⚡ 风格D · 赛博夜骑</button>
    </div>
    <div class="cta">
      <button class="btn-primary" id="startBtn">开始骑行 ▶</button>
      <button class="btn-ghost" id="startMute">静音进入</button>
    </div>
    <div class="keys-hint">
      <kbd>V</kbd> 切换 4 套 3D 建模　<kbd>X</kbd> 切换 4 套配饰装扮　<kbd>W</kbd><kbd>S</kbd> 加速/刹车　<kbd>A</kbd><kbd>D</kbd> 变道抓橘子　<kbd>空格</kbd> 跳跃　<kbd>T</kbd> 放手特技<br />
      <kbd>B</kbd> 按铃　<kbd>H</kbd> 水豚咕唧叫（抖耳+鼓腮）　<kbd>C</kbd> 切换镜头　<kbd>N</kbd> 快进 3 小时　点击水豚 / 车铃 / 海面都有惊喜
    </div>
  </div>
</section>

<div class="hud">
  <div class="brand panel"><span class="logo">🦫</span><div><b>卡皮巴拉骑单车</b><small>Capybara on a Bike · 实时 3D</small></div></div>
  <div class="models-hud panel">
    <button class="on" data-model="fluffy" title="方案四：蓬松炸毛水豚君（多层立体毛簇+头顶呆毛+长胡须）">✨ 蓬松水豚君</button>
    <button data-model="realistic" title="方案一：写实生态原比例（1:2.1真实比例+一体粗短肩颈）">🦫 写实生态</button>
    <button data-model="chibi" title="方案二：治愈毛绒奇异果（二头身大头+鼓腮红晕+一字眯眼）">🥝 奇异果Q版</button>
    <button data-model="clay" title="方案三：粘土盲盒手办风（吐司方鼻+微露门牙+3D蓝背带裤）">🧸 粘土背带裤</button>
  </div>
  <div class="skins-hud panel">
    <button class="on" data-skin="styleB" title="配饰 B：复古条纹头盔+粉色墨镜+青色单车">🕶️ 潮酷机车</button>
    <button data-skin="styleA" title="配饰 A：经典佛系原皮+红白围巾+薄荷绿车">🍊 佛系温泉</button>
    <button data-skin="styleC" title="配饰 C：日系雏菊草帽+车篮小黄鸭+奶油白车">👒 治愈草帽</button>
    <button data-skin="styleD" title="配饰 D：赛博发光护目镜+橘子夜灯+霓虹车轮">⚡ 赛博夜骑</button>
  </div>
  <div class="cams panel">
    <button data-cam="orbit">自由环绕</button>
    <button data-cam="chase">追随</button>
    <button data-cam="side">侧面跟拍</button>
    <button data-cam="cine">电影运镜</button>
    <button data-cam="pov">水豚视角</button>
  </div>
  <div class="tools panel">
    <button class="icon-btn" data-act="shot" title="截图 (K)">📸</button>
    <button class="icon-btn" data-act="music" title="音乐 (M)">🎵</button>
    <button class="icon-btn" data-act="share" title="复制分享链接">🔗</button>
    <button class="icon-btn" data-act="full" title="全屏 (F)">⛶</button>
    <button class="icon-btn" data-act="gui" title="参数与换装面板">⚙️</button>
    <button class="icon-btn" data-act="help" title="帮助">？</button>
  </div>
  <div id="fps" class="panel" hidden></div>
  <div class="dash panel">
    <div class="gauge">
      <svg viewBox="0 0 124 124">
        <defs><linearGradient id="gGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3fd0c9"/><stop offset="0.6" stop-color="#ffc27a"/><stop offset="1" stop-color="#ff5a6e"/></linearGradient></defs>
        <circle class="bg" cx="62" cy="62" r="52"/>
        <circle class="fg" id="speedArc" cx="62" cy="62" r="52" style="stroke-dashoffset: 245"/>
      </svg>
      <div class="val"><div><b id="speedVal">0</b><small>KM/H</small></div></div>
    </div>
    <div class="stats">
      <span>踏频</span><b><span id="cadVal" style="color:inherit">0</span> <small style="color:var(--muted);font-weight:400">rpm</small></b>
      <span>档位</span><b id="gearVal">3/5</b>
      <span>里程</span><b><span id="distVal" style="color:inherit">0.00</span> <small style="color:var(--muted);font-weight:400">km</small></b>
      <span>镜头</span><b id="camLabel" style="font-size:13px">电影运镜</b>
    </div>
  </div>
  <div class="hints panel">
    <span><kbd>V</kbd> 切换建模</span><span><kbd>X</kbd> 换装</span><span><kbd>W</kbd>/<kbd>S</kbd> 加速刹车</span><span><kbd>A</kbd>/<kbd>D</kbd> 变道抓橘</span><span><kbd>空格</kbd> 跳</span><span><kbd>T</kbd> 特技</span><span><kbd>H</kbd> 咕唧叫</span><span><kbd>C</kbd> 镜头</span>
  </div>
  <div class="score panel">
    <div class="row">
      <div class="fish"><span class="ico">🍊</span><span id="fishCount">0</span></div>
      <div class="ach">成就<br /><b id="achCount">0/14</b></div>
    </div>
    <div class="timebar">
      <span id="sunIcon">🌅</span>
      <input id="timeSlider" type="range" min="0" max="24" step="0.01" value="17.3" aria-label="时刻" />
      <span id="clockVal">17:18</span>
      <button class="icon-btn on" data-act="flow" title="时间流动" style="width:30px;height:30px;font-size:13px">⏯</button>
    </div>
  </div>
  <div class="touch">
    <div class="pad left">
      <button class="tbtn big" data-key="left">◀</button>
      <button class="tbtn big" data-key="right">▶</button>
    </div>
    <div class="pad right">
      <div class="rowb"><button class="tbtn" data-act="bell">🔔</button><button class="tbtn" data-act="trick">🙌</button><button class="tbtn" data-act="jump">⤒</button></div>
      <div class="rowb"><button class="tbtn big" data-key="down">▼</button><button class="tbtn big" data-key="up">▲</button></div>
    </div>
  </div>
</div>
<div id="toasts"></div>
<div id="guiHost"></div>
<div id="help">
  <div class="panel">
    <h3>操作说明 · 卡皮巴拉骑单车</h3>
    <ul>
      <li><kbd>V</kbd> 切换 4 套 3D 水豚建模</li><li><kbd>X</kbd> 切换 4 套配饰与单车</li>
      <li><kbd>W</kbd>/<kbd>↑</kbd> 加速</li><li><kbd>S</kbd>/<kbd>↓</kbd> 刹车（滑行有棘轮声）</li>
      <li><kbd>A</kbd>/<kbd>D</kbd> 左右变道抓橘子 🍊</li><li><kbd>空格</kbd> 跳跃</li>
      <li><kbd>T</kbd> 放手欢呼 + 抬前轮特技</li><li><kbd>H</kbd> 水豚咕唧叫（抖耳+鼓腮）</li>
      <li><kbd>B</kbd> 按车铃</li><li><kbd>C</kbd> 切换 5 种镜头</li>
      <li><kbd>Q</kbd>/<kbd>E</kbd> 手动换挡</li><li><kbd>N</kbd> 时间快进 3 小时</li>
      <li><kbd>M</kbd> 音乐开关 · <kbd>K</kbd> 截图</li><li><kbd>U</kbd> 隐藏界面 · <kbd>P</kbd> 暂停</li>
    </ul>
    <p>拖拽旋转视角、滚轮缩放。点击卡皮巴拉它会发出呆萌的“咕唧”声并抖动小圆勺耳，抓到蜜柑时会一鼓一鼓地嚼橘子！几秒不操作会自动驾驶去追蜜柑；发光金橘值 5 分，抓到的橘子越多，头顶和车篮里的橘子会越叠越高！</p>
    <button class="btn-ghost close" data-act="help">知道了</button>
  </div>
</div>
<script>
${fullScript}
</script>
</body>
</html>
`;

fs.writeFileSync('C:/Users/30488/.gemini/antigravity/scratch/capybara-ride/index.html', indexHtml, 'utf8');
console.log('Successfully generated C:/Users/30488/.gemini/antigravity/scratch/capybara-ride/index.html');
