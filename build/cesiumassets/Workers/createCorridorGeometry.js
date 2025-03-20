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
import{a as M}from"./chunk-SPCDYSRY.js";import{a as ht}from"./chunk-J6NPVTE6.js";import"./chunk-U5Y6TUUH.js";import"./chunk-X5RGBNPH.js";import{a as _t}from"./chunk-TB7RSGDN.js";import{a as J}from"./chunk-GNOHI6CF.js";import"./chunk-LGDGOZBO.js";import"./chunk-KVLKTV7L.js";import{b as yt}from"./chunk-42WKPM5N.js";import{a as Pt}from"./chunk-SXCE2VWF.js";import"./chunk-NLCQYVEX.js";import"./chunk-ZWKNWN2X.js";import"./chunk-JXYWMXB6.js";import{a as Nt}from"./chunk-PDIF2AUE.js";import{a as Ct}from"./chunk-LIAARPDW.js";import{b as Mt,c as Vt,d as x}from"./chunk-PRRW7QSP.js";import{d as St}from"./chunk-4NBDOIVA.js";import"./chunk-YIJHUUZY.js";import{c as Et}from"./chunk-CSZ6CHXI.js";import{a as F}from"./chunk-XXK6IR5Y.js";import{a as o,b as bt,d as I}from"./chunk-IGBMENRT.js";import{a as st}from"./chunk-SEE54P6A.js";import"./chunk-JNX2URIY.js";import"./chunk-4Z3GDVJK.js";import{a as B}from"./chunk-LU3FCBPP.js";import{b as it}from"./chunk-S2577PU4.js";import{e as X}from"./chunk-2TPVVSVW.js";var zt=new o,kt=new o,wt=new o,Tt=new o,jt=new o,Ht=new o,at=new o,ft=new o;function Ut(t,e){for(let o=0;o<t.length;o++)t[o]=e.scaleToGeodeticSurface(t[o],t[o]);return t}function Z(t,e,r,i,a,n){let s=t.normals,l=t.tangents,u=t.bitangents,d=o.normalize(o.cross(r,e,at),at);n.normal&&M.addAttribute(s,e,i,a),n.tangent&&M.addAttribute(l,d,i,a),n.bitangent&&M.addAttribute(u,r,i,a)}function Bt(t,e,r){let i,a,n,s=t.positions,l=t.corners,u=t.endPositions,d=t.lefts,m=t.normals,h=new Ct,c=0,f=0,p=0;for(a=0;a<s.length;a+=2)n=s[a].length-3,c+=n,p+=2*n,f+=s[a+1].length-3;for(c+=3,f+=3,a=0;a<l.length;a++){i=l[a];let t=l[a].leftPositions;X(t)?(n=t.length,c+=n,p+=n):(n=l[a].rightPositions.length,f+=n,p+=n)}let g,A=X(u);A&&(g=u[0].length-3,c+=g,f+=g,g/=3,p+=6*g);let b,y,_,w,v,T,I=c+f,N=new Float64Array(I),k={normals:e.normal?new Float32Array(I):void 0,tangents:e.tangent?new Float32Array(I):void 0,bitangents:e.bitangent?new Float32Array(I):void 0},E=0,P=I-1,j=zt,O=kt,B=g/2,S=Nt.createTypedArray(I/3,p),D=0;if(A){T=wt,v=Tt;let t=u[0];for(j=o.fromArray(m,0,j),O=o.fromArray(d,0,O),a=0;a<B;a++)T=o.fromArray(t,3*(B-1-a),T),v=o.fromArray(t,3*(B+a),v),M.addAttribute(N,v,E),M.addAttribute(N,T,void 0,P),Z(k,j,O,E,P,e),y=E/3,w=y+1,b=(P-2)/3,_=b-1,S[D++]=b,S[D++]=y,S[D++]=_,S[D++]=_,S[D++]=y,S[D++]=w,E+=3,P-=3}let V,W,L=0,R=0,G=s[L++],U=s[L++];for(N.set(G,E),N.set(U,P-U.length+1),O=o.fromArray(d,R,O),n=U.length-3,a=0;a<n;a+=3)V=r.geodeticSurfaceNormal(o.fromArray(G,a,at),at),W=r.geodeticSurfaceNormal(o.fromArray(U,n-a,ft),ft),j=o.normalize(o.add(V,W,j),j),Z(k,j,O,E,P,e),y=E/3,w=y+1,b=(P-2)/3,_=b-1,S[D++]=b,S[D++]=y,S[D++]=_,S[D++]=_,S[D++]=y,S[D++]=w,E+=3,P-=3;for(V=r.geodeticSurfaceNormal(o.fromArray(G,n,at),at),W=r.geodeticSurfaceNormal(o.fromArray(U,n,ft),ft),j=o.normalize(o.add(V,W,j),j),R+=3,a=0;a<l.length;a++){let t;i=l[a];let u,h,c=i.leftPositions,f=i.rightPositions,p=Ht,g=wt,A=Tt;if(j=o.fromArray(m,R,j),X(c)){for(Z(k,j,O,void 0,P,e),P-=3,u=w,h=_,t=0;t<c.length/3;t++)p=o.fromArray(c,3*t,p),S[D++]=u,S[D++]=h-t-1,S[D++]=h-t,M.addAttribute(N,p,void 0,P),g=o.fromArray(N,3*(h-t-1),g),A=o.fromArray(N,3*u,A),O=o.normalize(o.subtract(g,A,O),O),Z(k,j,O,void 0,P,e),P-=3;p=o.fromArray(N,3*u,p),g=o.subtract(o.fromArray(N,3*h,g),p,g),A=o.subtract(o.fromArray(N,3*(h-t),A),p,A),O=o.normalize(o.add(g,A,O),O),Z(k,j,O,E,void 0,e),E+=3}else{for(Z(k,j,O,E,void 0,e),E+=3,u=_,h=w,t=0;t<f.length/3;t++)p=o.fromArray(f,3*t,p),S[D++]=u,S[D++]=h+t,S[D++]=h+t+1,M.addAttribute(N,p,E),g=o.fromArray(N,3*u,g),A=o.fromArray(N,3*(h+t),A),O=o.normalize(o.subtract(g,A,O),O),Z(k,j,O,E,void 0,e),E+=3;p=o.fromArray(N,3*u,p),g=o.subtract(o.fromArray(N,3*(h+t),g),p,g),A=o.subtract(o.fromArray(N,3*h,A),p,A),O=o.normalize(o.negate(o.add(A,g,O),O),O),Z(k,j,O,void 0,P,e),P-=3}for(G=s[L++],U=s[L++],G.splice(0,3),U.splice(U.length-3,3),N.set(G,E),N.set(U,P-U.length+1),n=U.length-3,R+=3,O=o.fromArray(d,R,O),t=0;t<U.length;t+=3)V=r.geodeticSurfaceNormal(o.fromArray(G,t,at),at),W=r.geodeticSurfaceNormal(o.fromArray(U,n-t,ft),ft),j=o.normalize(o.add(V,W,j),j),Z(k,j,O,E,P,e),w=E/3,y=w-1,_=(P-2)/3,b=_+1,S[D++]=b,S[D++]=y,S[D++]=_,S[D++]=_,S[D++]=y,S[D++]=w,E+=3,P-=3;E-=3,P+=3}if(j=o.fromArray(m,m.length-3,j),Z(k,j,O,E,P,e),A){E+=3,P-=3,T=wt,v=Tt;let t=u[1];for(a=0;a<B;a++)T=o.fromArray(t,3*(g-a-1),T),v=o.fromArray(t,3*a,v),M.addAttribute(N,T,void 0,P),M.addAttribute(N,v,E),Z(k,j,O,E,P,e),w=E/3,y=w-1,_=(P-2)/3,b=_+1,S[D++]=b,S[D++]=y,S[D++]=_,S[D++]=_,S[D++]=y,S[D++]=w,E+=3,P-=3}if(h.position=new x({componentDatatype:F.DOUBLE,componentsPerAttribute:3,values:N}),e.st){let t,e,o=new Float32Array(I/3*2),r=0;if(A){c/=3,f/=3;let i=Math.PI/(g+1);e=1/(c-g+1),t=1/(f-g+1);let n,s=g/2;for(a=s+1;a<g+1;a++)n=st.PI_OVER_TWO+i*a,o[r++]=t*(1+Math.cos(n)),o[r++]=.5*(1+Math.sin(n));for(a=1;a<f-g+1;a++)o[r++]=a*t,o[r++]=0;for(a=g;a>s;a--)n=st.PI_OVER_TWO-a*i,o[r++]=1-t*(1+Math.cos(n)),o[r++]=.5*(1+Math.sin(n));for(a=s;a>0;a--)n=st.PI_OVER_TWO-i*a,o[r++]=1-e*(1+Math.cos(n)),o[r++]=.5*(1+Math.sin(n));for(a=c-g;a>0;a--)o[r++]=a*e,o[r++]=1;for(a=1;a<s+1;a++)n=st.PI_OVER_TWO+i*a,o[r++]=e*(1+Math.cos(n)),o[r++]=.5*(1+Math.sin(n))}else{for(c/=3,f/=3,e=1/(c-1),t=1/(f-1),a=0;a<f;a++)o[r++]=a*t,o[r++]=0;for(a=c;a>0;a--)o[r++]=(a-1)*e,o[r++]=1}h.st=new x({componentDatatype:F.FLOAT,componentsPerAttribute:2,values:o})}return e.normal&&(h.normal=new x({componentDatatype:F.FLOAT,componentsPerAttribute:3,values:k.normals})),e.tangent&&(h.tangent=new x({componentDatatype:F.FLOAT,componentsPerAttribute:3,values:k.tangents})),e.bitangent&&(h.bitangent=new x({componentDatatype:F.FLOAT,componentsPerAttribute:3,values:k.bitangents})),{attributes:h,indices:S}}function qt(t,e){if(!(e.normal||e.tangent||e.bitangent||e.st))return t;let r,i,a=t.position.values;(e.normal||e.bitangent)&&(r=t.normal.values,i=t.bitangent.values);let n,s=t.position.values.length/18,l=3*s,u=2*s,d=2*l;if(e.normal||e.bitangent||e.tangent){let s=e.normal?new Float32Array(6*l):void 0,u=e.tangent?new Float32Array(6*l):void 0,m=e.bitangent?new Float32Array(6*l):void 0,h=zt,c=kt,f=wt,p=Tt,g=jt,A=Ht,b=d;for(n=0;n<l;n+=3){let t=b+d;h=o.fromArray(a,n,h),c=o.fromArray(a,n+l,c),f=o.fromArray(a,(n+3)%l,f),c=o.subtract(c,h,c),f=o.subtract(f,h,f),p=o.normalize(o.cross(c,f,p),p),e.normal&&(M.addAttribute(s,p,t),M.addAttribute(s,p,t+3),M.addAttribute(s,p,b),M.addAttribute(s,p,b+3)),(e.tangent||e.bitangent)&&(A=o.fromArray(r,n,A),e.bitangent&&(M.addAttribute(m,A,t),M.addAttribute(m,A,t+3),M.addAttribute(m,A,b),M.addAttribute(m,A,b+3)),e.tangent&&(g=o.normalize(o.cross(A,p,g),g),M.addAttribute(u,g,t),M.addAttribute(u,g,t+3),M.addAttribute(u,g,b),M.addAttribute(u,g,b+3))),b+=6}if(e.normal){for(s.set(r),n=0;n<l;n+=3)s[n+l]=-r[n],s[n+l+1]=-r[n+1],s[n+l+2]=-r[n+2];t.normal.values=s}else t.normal=void 0;if(e.bitangent?(m.set(i),m.set(i,l),t.bitangent.values=m):t.bitangent=void 0,e.tangent){let e=t.tangent.values;u.set(e),u.set(e,l),t.tangent.values=u}}if(e.st){let e=t.st.values,o=new Float32Array(6*u);o.set(e),o.set(e,u);let r=2*u;for(let t=0;t<2;t++){for(o[r++]=e[0],o[r++]=e[1],n=2;n<u;n+=2){let t=e[n],i=e[n+1];o[r++]=t,o[r++]=i,o[r++]=t,o[r++]=i}o[r++]=e[0],o[r++]=e[1]}t.st.values=o}return t}function Ot(t,e,o){o[e++]=t[0],o[e++]=t[1],o[e++]=t[2];for(let r=3;r<t.length;r+=3){let i=t[r],a=t[r+1],n=t[r+2];o[e++]=i,o[e++]=a,o[e++]=n,o[e++]=i,o[e++]=a,o[e++]=n}return o[e++]=t[0],o[e++]=t[1],o[e++]=t[2],o}function Gt(t,e){let o=new J({position:e.position,normal:e.normal||e.bitangent||t.shadowVolume,tangent:e.tangent,bitangent:e.normal||e.bitangent,st:e.st}),r=t.ellipsoid,i=Bt(M.computePositions(t),o,r),a=t.height,n=t.extrudedHeight,s=i.attributes,l=i.indices,u=s.position.values,d=u.length,m=new Float64Array(6*d),h=new Float64Array(d);h.set(u);let c=new Float64Array(4*d);u=yt.scaleToGeodeticHeight(u,a,r),c=Ot(u,0,c),h=yt.scaleToGeodeticHeight(h,n,r),c=Ot(h,2*d,c),m.set(u),m.set(h,d),m.set(c,2*d),s.position.values=m,s=qt(s,e);let f,p=d/3;if(t.shadowVolume){let t=s.normal.values;d=t.length;let o=new Float32Array(6*d);for(f=0;f<d;f++)t[f]=-t[f];o.set(t,d),o=Ot(t,4*d,o),s.extrudeDirection=new x({componentDatatype:F.FLOAT,componentsPerAttribute:3,values:o}),e.normal||(s.normal=void 0)}if(X(t.offsetAttribute)){let e=new Uint8Array(6*p);if(t.offsetAttribute===_t.TOP)e=e.fill(1,0,p).fill(1,2*p,4*p);else{let o=t.offsetAttribute===_t.NONE?0:1;e=e.fill(o)}s.applyOffset=new x({componentDatatype:F.UNSIGNED_BYTE,componentsPerAttribute:1,values:e})}let g=l.length,A=p+p,b=Nt.createTypedArray(m.length/3,2*g+3*A);b.set(l);let y,_,w,v,T=g;for(f=0;f<g;f+=3){let t=l[f],e=l[f+1],o=l[f+2];b[T++]=o+p,b[T++]=e+p,b[T++]=t+p}for(f=0;f<A;f+=2)y=f+A,_=y+A,w=y+1,v=_+1,b[T++]=y,b[T++]=_,b[T++]=w,b[T++]=w,b[T++]=_,b[T++]=v;return{attributes:s,indices:b}}var Dt=new o,gt=new o,Q=new bt;function Rt(t,e,r,i,a,n){let s=o.subtract(e,t,Dt);o.normalize(s,s);let l=r.geodeticSurfaceNormal(t,gt),u=o.cross(s,l,Dt);o.multiplyByScalar(u,i,u);let d=a.latitude,m=a.longitude,h=n.latitude,c=n.longitude;o.add(t,u,gt),r.cartesianToCartographic(gt,Q);let f=Q.latitude,p=Q.longitude;d=Math.min(d,f),m=Math.min(m,p),h=Math.max(h,f),c=Math.max(c,p),o.subtract(t,u,gt),r.cartesianToCartographic(gt,Q),f=Q.latitude,p=Q.longitude,d=Math.min(d,f),m=Math.min(m,p),h=Math.max(h,f),c=Math.max(c,p),a.latitude=d,a.longitude=m,n.latitude=h,n.longitude=c}var K=new o,pt=new o,W=new bt,j=new bt;function Yt(t,e,r,i,a){t=Ut(t,e);let n=Pt(t,o.equalsEpsilon),s=n.length;if(s<2||r<=0)return new Et;let l,u,d=.5*r;if(W.latitude=Number.POSITIVE_INFINITY,W.longitude=Number.POSITIVE_INFINITY,j.latitude=Number.NEGATIVE_INFINITY,j.longitude=Number.NEGATIVE_INFINITY,i===ht.ROUNDED){let t=n[0];o.subtract(t,n[1],K),o.normalize(K,K),o.multiplyByScalar(K,d,K),o.add(t,K,pt),e.cartesianToCartographic(pt,Q),l=Q.latitude,u=Q.longitude,W.latitude=Math.min(W.latitude,l),W.longitude=Math.min(W.longitude,u),j.latitude=Math.max(j.latitude,l),j.longitude=Math.max(j.longitude,u)}for(let t=0;t<s-1;++t)Rt(n[t],n[t+1],e,d,W,j);let m=n[s-1];o.subtract(m,n[s-2],K),o.normalize(K,K),o.multiplyByScalar(K,d,K),o.add(m,K,pt),Rt(m,pt,e,d,W,j),i===ht.ROUNDED&&(e.cartesianToCartographic(pt,Q),l=Q.latitude,u=Q.longitude,W.latitude=Math.min(W.latitude,l),W.longitude=Math.min(W.longitude,u),j.latitude=Math.max(j.latitude,l),j.longitude=Math.max(j.longitude,u));let h=X(a)?a:new Et;return h.north=j.latitude,h.south=W.latitude,h.east=j.longitude,h.west=W.longitude,h}function et(t){let e=(t=B(t,B.EMPTY_OBJECT)).positions,r=t.width;it.defined("options.positions",e),it.defined("options.width",r);let i=B(t.height,0),a=B(t.extrudedHeight,i);this._positions=e,this._ellipsoid=I.clone(B(t.ellipsoid,I.WGS84)),this._vertexFormat=J.clone(B(t.vertexFormat,J.DEFAULT)),this._width=r,this._height=Math.max(i,a),this._extrudedHeight=Math.min(i,a),this._cornerType=B(t.cornerType,ht.ROUNDED),this._granularity=B(t.granularity,st.RADIANS_PER_DEGREE),this._shadowVolume=B(t.shadowVolume,!1),this._workerName="createCorridorGeometry",this._offsetAttribute=t.offsetAttribute,this._rectangle=void 0,this.packedLength=1+e.length*o.packedLength+I.packedLength+J.packedLength+7}et.pack=function(t,e,r){it.defined("value",t),it.defined("array",e),r=B(r,0);let i=t._positions,a=i.length;e[r++]=a;for(let t=0;t<a;++t,r+=o.packedLength)o.pack(i[t],e,r);return I.pack(t._ellipsoid,e,r),r+=I.packedLength,J.pack(t._vertexFormat,e,r),r+=J.packedLength,e[r++]=t._width,e[r++]=t._height,e[r++]=t._extrudedHeight,e[r++]=t._cornerType,e[r++]=t._granularity,e[r++]=t._shadowVolume?1:0,e[r]=B(t._offsetAttribute,-1),e};var It=I.clone(I.UNIT_SPHERE),Wt=new J,tt={positions:void 0,ellipsoid:It,vertexFormat:Wt,width:void 0,height:void 0,extrudedHeight:void 0,cornerType:void 0,granularity:void 0,shadowVolume:void 0,offsetAttribute:void 0};et.unpack=function(t,e,r){it.defined("array",t),e=B(e,0);let i=t[e++],a=new Array(i);for(let r=0;r<i;++r,e+=o.packedLength)a[r]=o.unpack(t,e);let n=I.unpack(t,e,It);e+=I.packedLength;let s=J.unpack(t,e,Wt);e+=J.packedLength;let l=t[e++],u=t[e++],d=t[e++],m=t[e++],h=t[e++],c=1===t[e++],f=t[e];return X(r)?(r._positions=a,r._ellipsoid=I.clone(n,r._ellipsoid),r._vertexFormat=J.clone(s,r._vertexFormat),r._width=l,r._height=u,r._extrudedHeight=d,r._cornerType=m,r._granularity=h,r._shadowVolume=c,r._offsetAttribute=-1===f?void 0:f,r):(tt.positions=a,tt.width=l,tt.height=u,tt.extrudedHeight=d,tt.cornerType=m,tt.granularity=h,tt.shadowVolume=c,tt.offsetAttribute=-1===f?void 0:f,new et(tt))},et.computeRectangle=function(t,e){let o=(t=B(t,B.EMPTY_OBJECT)).positions,r=t.width;return it.defined("options.positions",o),it.defined("options.width",r),Yt(o,B(t.ellipsoid,I.WGS84),r,B(t.cornerType,ht.ROUNDED),e)},et.createGeometry=function(t){let e=t._positions,r=t._width,i=t._ellipsoid;e=Ut(e,i);let a=Pt(e,o.equalsEpsilon);if(a.length<2||r<=0)return;let n,s=t._height,l=t._extrudedHeight,u=!st.equalsEpsilon(s,l,0,st.EPSILON2),d=t._vertexFormat,m={ellipsoid:i,positions:a,width:r,cornerType:t._cornerType,granularity:t._granularity,saveAttributes:!0};if(u)m.height=s,m.extrudedHeight=l,m.shadowVolume=t._shadowVolume,m.offsetAttribute=t._offsetAttribute,n=Gt(m,d);else{if(n=Bt(M.computePositions(m),d,i),n.attributes.position.values=yt.scaleToGeodeticHeight(n.attributes.position.values,s,i),X(t._offsetAttribute)){let e=t._offsetAttribute===_t.NONE?0:1,o=n.attributes.position.values.length,r=new Uint8Array(o/3).fill(e);n.attributes.applyOffset=new x({componentDatatype:F.UNSIGNED_BYTE,componentsPerAttribute:1,values:r})}}let h=n.attributes,c=St.fromVertices(h.position.values,void 0,3);return d.position||(n.attributes.position.values=void 0),new Vt({attributes:h,indices:n.indices,primitiveType:Mt.TRIANGLES,boundingSphere:c,offsetAttribute:t._offsetAttribute})},et.createShadowVolume=function(t,e,o){let r=t._granularity,i=t._ellipsoid,a=e(r,i),n=o(r,i);return new et({positions:t._positions,width:t._width,cornerType:t._cornerType,ellipsoid:i,granularity:r,extrudedHeight:a,height:n,vertexFormat:J.POSITION_ONLY,shadowVolume:!0})},Object.defineProperties(et.prototype,{rectangle:{get:function(){return X(this._rectangle)||(this._rectangle=Yt(this._positions,this._ellipsoid,this._width,this._cornerType)),this._rectangle}},textureCoordinateRotationPoints:{get:function(){return[0,0,0,1,1,0]}}});var Lt=et;function Jt(t,e){return X(e)&&(t=Lt.unpack(t,e)),t._ellipsoid=I.clone(t._ellipsoid),Lt.createGeometry(t)}var Ae=Jt;export{Ae as default};