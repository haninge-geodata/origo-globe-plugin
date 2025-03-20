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
import{a as O}from"./chunk-4NBDOIVA.js";import{c as I,d as V}from"./chunk-CSZ6CHXI.js";import{a as W,b as v}from"./chunk-IGBMENRT.js";import{a as R}from"./chunk-SEE54P6A.js";import{a as k}from"./chunk-S2577PU4.js";import{e as N}from"./chunk-2TPVVSVW.js";var z=Math.cos,Z=Math.sin,D=Math.sqrt,L={computePosition:function(t,n,a,r,o,s,e){let i=n.radiiSquared,g=t.nwCorner,h=t.boundingRectangle,l=g.latitude-t.granYCos*r+o*t.granXSin,u=z(l),c=Z(l),S=i.z*c,C=g.longitude+r*t.granYSin+o*t.granXCos,w=u*z(C),m=u*Z(C),R=i.x*w,d=i.y*m,O=D(R*w+d*m+S*c);if(s.x=R/O,s.y=d/O,s.z=S/O,a){let n=t.stNwCorner;N(n)?(l=n.latitude-t.stGranYCos*r+o*t.stGranXSin,C=n.longitude+r*t.stGranYSin+o*t.stGranXCos,e.x=(C-t.stWest)*t.lonScalar,e.y=(l-t.stSouth)*t.latScalar):(e.x=(C-h.west)*t.lonScalar,e.y=(l-h.south)*t.latScalar)}}},A=new V,g=new W,F=new v,b=new W,q=new O;function B(t,n,a,r,o,s,e){let i=Math.cos(n),h=r*i,l=a*i,u=Math.sin(n),c=r*u,S=a*u;g=q.project(t,g),g=W.subtract(g,b,g);let C=V.fromRotation(n,A);g=V.multiplyByVector(C,g,g),g=W.add(g,b,g),s-=1,e-=1;let w=(t=q.unproject(g,t)).latitude,m=w+s*S,R=w-h*e,d=w-h*e+s*S,O=Math.max(w,m,R,d),p=Math.min(w,m,R,d),I=t.longitude,X=I+s*l,Y=I+e*c,f=I+e*c+s*l;return{north:O,south:p,east:Math.max(I,X,Y,f),west:Math.min(I,X,Y,f),granYCos:h,granYSin:c,granXCos:l,granXSin:S,nwCorner:t}}L.computeOptions=function(t,n,a,r,o,s,e){let i=t.east,g=t.west,h=t.north,l=t.south,u=!1,c=!1;h===R.PI_OVER_TWO&&(u=!0),l===-R.PI_OVER_TWO&&(c=!0);let S,C=h-l;S=g>i?R.TWO_PI-g+i:i-g;let w=Math.ceil(S/n)+1,m=Math.ceil(C/n)+1,d=S/(w-1),O=C/(m-1),p=I.northwest(t,s),X=I.center(t,F);(0!==a||0!==r)&&(X.longitude<p.longitude&&(X.longitude+=R.TWO_PI),b=q.project(X,b));let W=O,Y=d,V=I.clone(t,o),f={granYCos:W,granYSin:0,granXCos:Y,granXSin:0,nwCorner:p,boundingRectangle:V,width:w,height:m,northCap:u,southCap:c};if(0!==a){let t=B(p,a,d,O,X,w,m);if(h=t.north,l=t.south,i=t.east,g=t.west,h<-R.PI_OVER_TWO||h>R.PI_OVER_TWO||l<-R.PI_OVER_TWO||l>R.PI_OVER_TWO)throw new k("Rotated rectangle is invalid.  It crosses over either the north or south pole.");f.granYCos=t.granYCos,f.granYSin=t.granYSin,f.granXCos=t.granXCos,f.granXSin=t.granXSin,V.north=h,V.south=l,V.east=i,V.west=g}if(0!==r){a-=r;let t=I.northwest(V,e),n=B(t,a,d,O,X,w,m);f.stGranYCos=n.granYCos,f.stGranXCos=n.granXCos,f.stGranYSin=n.granYSin,f.stGranXSin=n.granXSin,f.stNwCorner=t,f.stWest=n.west,f.stSouth=n.south}return f};var nt=L;export{nt as a};