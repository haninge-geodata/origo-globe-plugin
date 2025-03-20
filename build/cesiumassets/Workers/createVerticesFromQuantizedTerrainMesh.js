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
import{a as Ct,b as vt}from"./chunk-EC63IR4A.js";import{a as Mt}from"./chunk-4A2FUNVR.js";import{a as z}from"./chunk-IF5TQC34.js";import"./chunk-4BEUQXNB.js";import{a as Wt}from"./chunk-KVLKTV7L.js";import{a as X}from"./chunk-PDIF2AUE.js";import{i as At}from"./chunk-4NBDOIVA.js";import"./chunk-YIJHUUZY.js";import{b as U,c as bt}from"./chunk-CSZ6CHXI.js";import"./chunk-XXK6IR5Y.js";import{a as P,b as wt,c as lt,d as pt}from"./chunk-IGBMENRT.js";import{a as f}from"./chunk-SEE54P6A.js";import"./chunk-JNX2URIY.js";import"./chunk-4Z3GDVJK.js";import"./chunk-LU3FCBPP.js";import{a as m}from"./chunk-S2577PU4.js";import{e as w}from"./chunk-2TPVVSVW.js";function T(){m.throwInstantiationError()}Object.defineProperties(T.prototype,{errorEvent:{get:m.throwInstantiationError},credit:{get:m.throwInstantiationError},tilingScheme:{get:m.throwInstantiationError},hasWaterMask:{get:m.throwInstantiationError},hasVertexNormals:{get:m.throwInstantiationError},availability:{get:m.throwInstantiationError}});var Ot=[];T.getRegularGridIndices=function(t,e){if(t*e>=f.FOUR_GIGABYTES)throw new m("The total number of vertices (width * height) must be less than 4,294,967,296.");let r=Ot[t];w(r)||(Ot[t]=r=[]);let n=r[e];return w(n)||(n=t*e<f.SIXTY_FOUR_KILOBYTES?r[e]=new Uint16Array((t-1)*(e-1)*6):r[e]=new Uint32Array((t-1)*(e-1)*6),Pt(t,e,n,0)),n};var Gt=[];T.getRegularGridIndicesAndEdgeIndices=function(t,e){if(t*e>=f.FOUR_GIGABYTES)throw new m("The total number of vertices (width * height) must be less than 4,294,967,296.");let r=Gt[t];w(r)||(Gt[t]=r=[]);let n=r[e];if(!w(n)){let i=T.getRegularGridIndices(t,e),o=Lt(t,e),a=o.westIndicesSouthToNorth,s=o.southIndicesEastToWest,h=o.eastIndicesNorthToSouth,u=o.northIndicesWestToEast;n=r[e]={indices:i,westIndicesSouthToNorth:a,southIndicesEastToWest:s,eastIndicesNorthToSouth:h,northIndicesWestToEast:u}}return n};var kt=[];function Lt(t,e){let r,n=new Array(e),i=new Array(t),o=new Array(e),a=new Array(t);for(r=0;r<t;++r)a[r]=r,i[r]=t*e-1-r;for(r=0;r<e;++r)o[r]=(r+1)*t-1,n[r]=(e-r-1)*t;return{westIndicesSouthToNorth:n,southIndicesEastToWest:i,eastIndicesNorthToSouth:o,northIndicesWestToEast:a}}function Pt(t,e,r,n){let i=0;for(let o=0;o<e-1;++o){for(let e=0;e<t-1;++e){let e=i,o=e+t,a=o+1,s=e+1;r[n++]=e,r[n++]=o,r[n++]=s,r[n++]=s,r[n++]=o,r[n++]=a,++i}++i}}function Z(t,e,r,n){let i=t[0],o=t.length;for(let a=1;a<o;++a){let o=t[a];r[n++]=i,r[n++]=o,r[n++]=e,r[n++]=e,r[n++]=o,r[n++]=e+1,i=o,++e}return n}T.getRegularGridAndSkirtIndicesAndEdgeIndices=function(t,e){if(t*e>=f.FOUR_GIGABYTES)throw new m("The total number of vertices (width * height) must be less than 4,294,967,296.");let r=kt[t];w(r)||(kt[t]=r=[]);let n=r[e];if(!w(n)){let i=t*e,o=(t-1)*(e-1)*6,a=2*t+2*e,s=i+a,h=o+6*Math.max(0,a-4),u=Lt(t,e),c=u.westIndicesSouthToNorth,l=u.southIndicesEastToWest,I=u.eastIndicesNorthToSouth,d=u.northIndicesWestToEast,m=X.createTypedArray(s,h);Pt(t,e,m,0),T.addSkirtIndices(c,l,I,d,i,m,o),n=r[e]={indices:m,westIndicesSouthToNorth:c,southIndicesEastToWest:l,eastIndicesNorthToSouth:I,northIndicesWestToEast:d,indexCountWithoutSkirts:o}}return n},T.addSkirtIndices=function(t,e,r,n,i,o,a){let s=i;a=Z(t,s,o,a),s+=t.length,a=Z(e,s,o,a),s+=e.length,a=Z(r,s,o,a),s+=r.length,Z(n,s,o,a)},T.heightmapTerrainQuality=.25,T.getEstimatedLevelZeroGeometricErrorForAHeightmap=function(t,e,r){return 2*t.maximumRadius*Math.PI*T.heightmapTerrainQuality/(e*r)},T.prototype.requestTileGeometry=m.throwInstantiationError,T.prototype.getLevelMaximumGeometricError=m.throwInstantiationError,T.prototype.getTileDataAvailable=m.throwInstantiationError,T.prototype.loadTileDataAvailability=m.throwInstantiationError;var Vt=T,ht=32767,D=new P,Xt=new P,Zt=new P,u=new wt,Y=new lt;function Jt(t,e){let r,n,i=t.quantizedVertices,o=i.length/3,a=t.octEncodedNormals,s=t.westIndices.length+t.eastIndices.length+t.southIndices.length+t.northIndices.length,h=t.includeWebMercatorT,c=t.exaggeration,l=t.exaggerationRelativeHeight,I=1!==c,d=bt.clone(t.rectangle),m=d.west,T=d.south,g=d.east,p=d.north,N=pt.clone(t.ellipsoid),E=t.minimumHeight,y=t.maximumHeight,S=t.relativeToCenter,A=At.eastNorthUpToFixedFrame(S,N),b=U.inverseTransformation(A,new U);h&&(r=z.geodeticLatitudeToMercatorAngle(T),n=1/(z.geodeticLatitudeToMercatorAngle(p)-r));let k=i.subarray(0,o),x=i.subarray(o,2*o),G=i.subarray(2*o,3*o),F=w(a),M=new Array(o),V=new Array(o),v=new Array(o),W=h?new Array(o):[],j=I?new Array(o):[],C=Xt;C.x=Number.POSITIVE_INFINITY,C.y=Number.POSITIVE_INFINITY,C.z=Number.POSITIVE_INFINITY;let O=Zt;O.x=Number.NEGATIVE_INFINITY,O.y=Number.NEGATIVE_INFINITY,O.z=Number.NEGATIVE_INFINITY;let _=Number.POSITIVE_INFINITY,H=Number.NEGATIVE_INFINITY,B=Number.POSITIVE_INFINITY,R=Number.NEGATIVE_INFINITY;for(let t=0;t<o;++t){let e=k[t],i=x[t],o=e/ht,a=i/ht,s=f.lerp(E,y,G[t]/ht);u.longitude=f.lerp(m,g,o),u.latitude=f.lerp(T,p,a),u.height=s,_=Math.min(u.longitude,_),H=Math.max(u.longitude,H),B=Math.min(u.latitude,B),R=Math.max(u.latitude,R);let c=N.cartographicToCartesian(u);M[t]=new lt(o,a),V[t]=s,v[t]=c,h&&(W[t]=(z.geodeticLatitudeToMercatorAngle(u.latitude)-r)*n),I&&(j[t]=N.geodeticSurfaceNormal(c)),U.multiplyByPoint(b,c,D),P.minimumByComponent(D,C,C),P.maximumByComponent(D,O,O)}let L,Z=tt(t.westIndices,(function(t,e){return M[t].y-M[e].y})),K=tt(t.eastIndices,(function(t,e){return M[e].y-M[t].y})),Q=tt(t.southIndices,(function(t,e){return M[e].x-M[t].x})),q=tt(t.northIndices,(function(t,e){return M[t].x-M[e].x}));E<0&&(L=new Ct(N).computeHorizonCullingPointPossiblyUnderEllipsoid(S,v,E));let et=E;et=Math.min(et,J(t.westIndices,t.westSkirtHeight,V,M,d,N,b,C,O)),et=Math.min(et,J(t.southIndices,t.southSkirtHeight,V,M,d,N,b,C,O)),et=Math.min(et,J(t.eastIndices,t.eastSkirtHeight,V,M,d,N,b,C,O)),et=Math.min(et,J(t.northIndices,t.northSkirtHeight,V,M,d,N,b,C,O));let rt=new Wt(C,O,S),nt=new vt(S,rt,et,y,A,F,h,I,c,l),it=nt.stride,ot=new Float32Array(o*it+s*it),at=0;for(let t=0;t<o;++t){if(F){let e=2*t;Y.x=a[e],Y.y=a[e+1]}at=nt.encode(ot,at,v[t],M[t],V[t],Y,W[t],j[t])}let st=Math.max(0,2*(s-4)),ut=t.indices.length+3*st,ct=X.createTypedArray(o+s,ut);ct.set(t.indices,0);let It=1e-4,dt=(H-_)*It,mt=(R-B)*It,Tt=-dt,gt=dt,ft=mt,wt=-mt,Nt=o*it;return $(ot,Nt,Z,nt,V,M,a,N,d,t.westSkirtHeight,r,n,Tt,0),Nt+=t.westIndices.length*it,$(ot,Nt,Q,nt,V,M,a,N,d,t.southSkirtHeight,r,n,0,wt),Nt+=t.southIndices.length*it,$(ot,Nt,K,nt,V,M,a,N,d,t.eastSkirtHeight,r,n,gt,0),Nt+=t.eastIndices.length*it,$(ot,Nt,q,nt,V,M,a,N,d,t.northSkirtHeight,r,n,0,ft),Vt.addSkirtIndices(Z,Q,K,q,o,ct,t.indices.length),e.push(ot.buffer,ct.buffer),{vertices:ot.buffer,indices:ct.buffer,westIndicesSouthToNorth:Z,southIndicesEastToWest:Q,eastIndicesNorthToSouth:K,northIndicesWestToEast:q,vertexStride:it,center:S,minimumHeight:E,maximumHeight:y,occludeePointInScaledSpace:L,encoding:nt,indexCountWithoutSkirts:t.indices.length}}function J(t,e,r,n,i,o,a,s,h){let c=Number.POSITIVE_INFINITY,l=i.north,I=i.south,d=i.east,m=i.west;d<m&&(d+=f.TWO_PI);let T=t.length;for(let i=0;i<T;++i){let T=t[i],g=r[T],w=n[T];u.longitude=f.lerp(m,d,w.x),u.latitude=f.lerp(I,l,w.y),u.height=g-e;let p=o.cartographicToCartesian(u,D);U.multiplyByPoint(a,p,p),P.minimumByComponent(p,s,s),P.maximumByComponent(p,h,h),c=Math.min(c,u.height)}return c}function $(t,e,r,n,i,o,a,s,h,c,l,I,d,m){let T=w(a),g=h.north,p=h.south,N=h.east,E=h.west;N<E&&(N+=f.TWO_PI);let y=r.length;for(let h=0;h<y;++h){let w=r[h],y=i[w],S=o[w];u.longitude=f.lerp(E,N,S.x)+d,u.latitude=f.lerp(p,g,S.y)+m,u.height=y-c;let A,b,k=s.cartographicToCartesian(u,D);if(T){let t=2*w;Y.x=a[t],Y.y=a[t+1]}n.hasWebMercatorT&&(A=(z.geodeticLatitudeToMercatorAngle(u.latitude)-l)*I),n.hasGeodeticSurfaceNormals&&(b=s.geodeticSurfaceNormal(k)),e=n.encode(t,e,k,S,u.height,Y,A,b)}}function tt(t,e){let r;return"function"==typeof t.slice&&(r=t.slice(),"function"!=typeof r.sort&&(r=void 0)),w(r)||(r=Array.prototype.slice.call(t)),r.sort(e),r}var Se=Mt(Jt);export{Se as default};