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
import{f as O,i as G}from"./chunk-4NBDOIVA.js";import{b as l,c as R,d as L}from"./chunk-CSZ6CHXI.js";import{a as A,b as h,c as a,e as y}from"./chunk-IGBMENRT.js";import{a as c}from"./chunk-JNX2URIY.js";import{a as s}from"./chunk-LU3FCBPP.js";import{a as N,b as w}from"./chunk-S2577PU4.js";import{e as I}from"./chunk-2TPVVSVW.js";var U={NONE:0,TRIANGLES:1,LINES:2,POLYLINES:3},M=Object.freeze(U),r={POINTS:c.POINTS,LINES:c.LINES,LINE_LOOP:c.LINE_LOOP,LINE_STRIP:c.LINE_STRIP,TRIANGLES:c.TRIANGLES,TRIANGLE_STRIP:c.TRIANGLE_STRIP,TRIANGLE_FAN:c.TRIANGLE_FAN,isLines:function(t){return t===r.LINES||t===r.LINE_LOOP||t===r.LINE_STRIP},isTriangles:function(t){return t===r.TRIANGLES||t===r.TRIANGLE_STRIP||t===r.TRIANGLE_FAN},validate:function(t){return t===r.POINTS||t===r.LINES||t===r.LINE_LOOP||t===r.LINE_STRIP||t===r.TRIANGLES||t===r.TRIANGLE_STRIP||t===r.TRIANGLE_FAN}},F=Object.freeze(r);function _(t){t=s(t,s.EMPTY_OBJECT),w.typeOf.object("options.attributes",t.attributes),this.attributes=t.attributes,this.indices=t.indices,this.primitiveType=s(t.primitiveType,F.TRIANGLES),this.boundingSphere=t.boundingSphere,this.geometryType=s(t.geometryType,M.NONE),this.boundingSphereCV=t.boundingSphereCV,this.offsetAttribute=t.offsetAttribute}_.computeNumberOfVertices=function(t){w.typeOf.object("geometry",t);let e=-1;for(let r in t.attributes)if(t.attributes.hasOwnProperty(r)&&I(t.attributes[r])&&I(t.attributes[r].values)){let n=t.attributes[r],i=n.values.length/n.componentsPerAttribute;if(e!==i&&-1!==e)throw new N("All attribute lists must have the same number of attributes.");e=i}return e};var W=new h,H=new A,V=new l,Z=[new h,new h,new h],K=[new a,new a,new a],$=[new a,new a,new a],tt=new A,et=new O,rt=new l,nt=new L;_._textureCoordinateRotationPoints=function(t,e,r,n){let i,o=R.center(n,W),s=h.toCartesian(o,r,H),u=G.eastNorthUpToFixedFrame(s,r,V),I=l.inverse(u,V),N=K,m=Z;m[0].longitude=n.west,m[0].latitude=n.south,m[1].longitude=n.west,m[1].latitude=n.north,m[2].longitude=n.east,m[2].latitude=n.south;let c=tt;for(i=0;i<3;i++)h.toCartesian(m[i],r,c),c=l.multiplyByPointAsVector(I,c,c),N[i].x=c.x,N[i].y=c.y;let p=O.fromAxisAngle(A.UNIT_Z,-e,et),T=y.fromQuaternion(p,rt),b=t.length,E=Number.POSITIVE_INFINITY,f=Number.POSITIVE_INFINITY,P=Number.NEGATIVE_INFINITY,w=Number.NEGATIVE_INFINITY;for(i=0;i<b;i++)c=l.multiplyByPointAsVector(I,t[i],c),c=y.multiplyByVector(T,c,c),E=Math.min(E,c.x),f=Math.min(f,c.y),P=Math.max(P,c.x),w=Math.max(w,c.y);let S=L.fromRotation(e,nt),_=$;_[0].x=E,_[0].y=f,_[1].x=E,_[1].y=w,_[2].x=P,_[2].y=f;let d=N[0],x=N[2].x-d.x,v=N[1].y-d.y;for(i=0;i<3;i++){let t=_[i];L.multiplyByVector(S,t,t),t.x=(t.x-d.x)/x,t.y=(t.y-d.y)/v}let g=_[0],F=_[1],j=_[2],k=new Array(6);return a.pack(g,k),a.pack(F,k,2),a.pack(j,k,4),k};var Lt=_;function ot(t){if(t=s(t,s.EMPTY_OBJECT),!I(t.componentDatatype))throw new N("options.componentDatatype is required.");if(!I(t.componentsPerAttribute))throw new N("options.componentsPerAttribute is required.");if(t.componentsPerAttribute<1||t.componentsPerAttribute>4)throw new N("options.componentsPerAttribute must be between 1 and 4.");if(!I(t.values))throw new N("options.values is required.");this.componentDatatype=t.componentDatatype,this.componentsPerAttribute=t.componentsPerAttribute,this.normalize=s(t.normalize,!1),this.values=t.values}var Ot=ot;export{M as a,F as b,Lt as c,Ot as d};