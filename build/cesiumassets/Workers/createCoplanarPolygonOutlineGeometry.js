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
import{a as T}from"./chunk-S52AQ5GZ.js";import"./chunk-T5LTBJR6.js";import{a as f}from"./chunk-WJWQTD3N.js";import"./chunk-L4VLY3HN.js";import{a as G}from"./chunk-D4BCVU35.js";import{a as C}from"./chunk-C5E6OQHH.js";import"./chunk-4BEUQXNB.js";import"./chunk-N4LA2RYW.js";import"./chunk-LGDGOZBO.js";import"./chunk-KVLKTV7L.js";import"./chunk-42WKPM5N.js";import{a as L}from"./chunk-SXCE2VWF.js";import"./chunk-NLCQYVEX.js";import"./chunk-ZWKNWN2X.js";import"./chunk-JXYWMXB6.js";import{a as w}from"./chunk-PDIF2AUE.js";import{a as O}from"./chunk-LIAARPDW.js";import{b,c as d,d as k}from"./chunk-PRRW7QSP.js";import{d as P}from"./chunk-4NBDOIVA.js";import"./chunk-YIJHUUZY.js";import"./chunk-CSZ6CHXI.js";import{a as H}from"./chunk-XXK6IR5Y.js";import{a as l,d as g}from"./chunk-IGBMENRT.js";import"./chunk-SEE54P6A.js";import"./chunk-JNX2URIY.js";import"./chunk-4Z3GDVJK.js";import{a as c}from"./chunk-LU3FCBPP.js";import{b as a}from"./chunk-S2577PU4.js";import{e as u}from"./chunk-2TPVVSVW.js";function E(r){let e=r.length,t=new Float64Array(3*e),o=w.createTypedArray(e,2*e),n=0,i=0;for(let s=0;s<e;s++){let a=r[s];t[n++]=a.x,t[n++]=a.y,t[n++]=a.z,o[i++]=s,o[i++]=(s+1)%e}let s=new O({position:new k({componentDatatype:H.DOUBLE,componentsPerAttribute:3,values:t})});return new d({attributes:s,indices:o,primitiveType:b.LINES})}function m(r){let e=(r=c(r,c.EMPTY_OBJECT)).polygonHierarchy;a.defined("options.polygonHierarchy",e),this._polygonHierarchy=e,this._workerName="createCoplanarPolygonOutlineGeometry",this.packedLength=f.computeHierarchyPackedLength(e,l)+1}m.fromPositions=function(r){return r=c(r,c.EMPTY_OBJECT),a.defined("options.positions",r.positions),new m({polygonHierarchy:{positions:r.positions}})},m.pack=function(r,e,t){return a.typeOf.object("value",r),a.defined("array",e),t=c(t,0),e[t=f.packPolygonHierarchy(r._polygonHierarchy,e,t,l)]=r.packedLength,e};var v={polygonHierarchy:{}};m.unpack=function(r,e,t){a.defined("array",r),e=c(e,0);let o=f.unpackPolygonHierarchy(r,e,l);e=o.startingIndex,delete o.startingIndex;let n=r[e];return u(t)||(t=new m(v)),t._polygonHierarchy=o,t.packedLength=n,t},m.createGeometry=function(r){let e=r._polygonHierarchy,t=e.positions;if(t=L(t,l.equalsEpsilon,!0),t.length<3||!T.validOutline(t))return;let o=f.polygonOutlinesFromHierarchy(e,!1);if(0===o.length)return;let n=[];for(let r=0;r<o.length;r++){let e=new G({geometry:E(o[r])});n.push(e)}let i=C.combineInstances(n)[0],s=P.fromPoints(e.positions);return new d({attributes:i.attributes,indices:i.indices,primitiveType:i.primitiveType,boundingSphere:s})};var h=m;function A(r,e){return u(e)&&(r=h.unpack(r,e)),r._ellipsoid=g.clone(r._ellipsoid),h.createGeometry(r)}var Z=A;export{Z as default};