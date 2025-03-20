/**
 * @license
 * Cesium - https://github.com/CesiumGS/cesium
 * Version 1.114
 *
 * Copyright 2011-2022 Cesium Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Columbus View (Pat. Pend.)
 *
 * Portions licensed separately.
 * See https://github.com/CesiumGS/cesium/blob/main/LICENSE.md for full licensing details.
 */
import{f as C}from"./chunk-4NBDOIVA.js";import{a as n,e as b}from"./chunk-IGBMENRT.js";import{a as w}from"./chunk-SEE54P6A.js";var j={},q=new n,L=new n,Q=new C,G=new b;function W(e,t,r,a,o,i,l,s,y,c){let m=e+t;n.multiplyByScalar(a,Math.cos(m),q),n.multiplyByScalar(r,Math.sin(m),L),n.add(q,L,q);let u=Math.cos(e);u*=u;let w=Math.sin(e);w*=w;let x=i/Math.sqrt(l*u+o*w)/s;return C.fromAxisAngle(q,x,Q),b.fromQuaternion(Q,G),b.multiplyByVector(G,y,c),n.normalize(c,c),n.multiplyByScalar(c,s,c),c}var U=new n,Z=new n,N=new n,v=new n;j.raisePositionsToHeight=function(e,t,r){let a=t.ellipsoid,o=t.height,i=t.extrudedHeight,l=r?e.length/3*2:e.length/3,s=new Float64Array(3*l),y=e.length,c=r?y:0;for(let t=0;t<y;t+=3){let l=t+1,y=t+2,m=n.fromArray(e,t,U);a.scaleToGeodeticSurface(m,m);let u=n.clone(m,Z),w=a.geodeticSurfaceNormal(m,v),x=n.multiplyByScalar(w,o,N);n.add(m,x,m),r&&(n.multiplyByScalar(w,i,x),n.add(u,x,u),s[t+c]=u.x,s[l+c]=u.y,s[y+c]=u.z),s[t]=m.x,s[l]=m.y,s[y]=m.z}return s};var D=new n,J=new n,K=new n;j.computeEllipsePositions=function(e,t,r){let a=e.semiMinorAxis,o=e.semiMajorAxis,i=e.rotation,l=e.center,s=8*e.granularity,y=a*a,c=o*o,m=o*a,u=n.magnitude(l),x=n.normalize(l,D),h=n.cross(n.UNIT_Z,l,J);h=n.normalize(h,h);let f=n.cross(x,h,K),z=1+Math.ceil(w.PI_OVER_TWO/s),O=w.PI_OVER_TWO/(z-1),_=w.PI_OVER_TWO-z*O;_<0&&(z-=Math.ceil(Math.abs(_)/O));let p,P,d,I,M,E=t?new Array(3*(z*(z+2)*2)):void 0,T=0,g=U,A=Z,V=4*z*3,R=V-1,j=0,v=r?new Array(V):void 0;for(_=w.PI_OVER_TWO,g=W(_,i,f,h,y,m,c,u,x,g),t&&(E[T++]=g.x,E[T++]=g.y,E[T++]=g.z),r&&(v[R--]=g.z,v[R--]=g.y,v[R--]=g.x),_=w.PI_OVER_TWO-O,p=1;p<z+1;++p){if(g=W(_,i,f,h,y,m,c,u,x,g),A=W(Math.PI-_,i,f,h,y,m,c,u,x,A),t){for(E[T++]=g.x,E[T++]=g.y,E[T++]=g.z,d=2*p+2,P=1;P<d-1;++P)I=P/(d-1),M=n.lerp(g,A,I,N),E[T++]=M.x,E[T++]=M.y,E[T++]=M.z;E[T++]=A.x,E[T++]=A.y,E[T++]=A.z}r&&(v[R--]=g.z,v[R--]=g.y,v[R--]=g.x,v[j++]=A.x,v[j++]=A.y,v[j++]=A.z),_=w.PI_OVER_TWO-(p+1)*O}for(p=z;p>1;--p){if(_=w.PI_OVER_TWO-(p-1)*O,g=W(-_,i,f,h,y,m,c,u,x,g),A=W(_+Math.PI,i,f,h,y,m,c,u,x,A),t){for(E[T++]=g.x,E[T++]=g.y,E[T++]=g.z,d=2*(p-1)+2,P=1;P<d-1;++P)I=P/(d-1),M=n.lerp(g,A,I,N),E[T++]=M.x,E[T++]=M.y,E[T++]=M.z;E[T++]=A.x,E[T++]=A.y,E[T++]=A.z}r&&(v[R--]=g.z,v[R--]=g.y,v[R--]=g.x,v[j++]=A.x,v[j++]=A.y,v[j++]=A.z)}_=w.PI_OVER_TWO,g=W(-_,i,f,h,y,m,c,u,x,g);let B={};return t&&(E[T++]=g.x,E[T++]=g.y,E[T++]=g.z,B.positions=E,B.numPts=z),r&&(v[R--]=g.z,v[R--]=g.y,v[R--]=g.x,B.outerPositions=v),B};var tt=j;export{tt as a};