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
import{a as l}from"./chunk-LIAARPDW.js";import{b as d,c as y,d as s}from"./chunk-PRRW7QSP.js";import{d as c}from"./chunk-4NBDOIVA.js";import"./chunk-YIJHUUZY.js";import"./chunk-CSZ6CHXI.js";import{a as f}from"./chunk-XXK6IR5Y.js";import{a}from"./chunk-IGBMENRT.js";import"./chunk-SEE54P6A.js";import"./chunk-JNX2URIY.js";import"./chunk-4Z3GDVJK.js";import"./chunk-LU3FCBPP.js";import{b as m}from"./chunk-S2577PU4.js";import{e as i}from"./chunk-2TPVVSVW.js";function o(){this._workerName="createPlaneOutlineGeometry"}o.packedLength=0,o.pack=function(n,e){return m.defined("value",n),m.defined("array",e),e},o.unpack=function(n,e,r){return m.defined("array",n),i(r)?r:new o};var n=new a(-.5,-.5,0),p=new a(.5,.5,0);o.createGeometry=function(){let e=new l,r=new Uint16Array(8),t=new Float64Array(12);return t[0]=n.x,t[1]=n.y,t[2]=n.z,t[3]=p.x,t[4]=n.y,t[5]=n.z,t[6]=p.x,t[7]=p.y,t[8]=n.z,t[9]=n.x,t[10]=p.y,t[11]=n.z,e.position=new s({componentDatatype:f.DOUBLE,componentsPerAttribute:3,values:t}),r[0]=0,r[1]=1,r[2]=1,r[3]=2,r[4]=2,r[5]=3,r[6]=3,r[7]=0,new y({attributes:e,indices:r,primitiveType:d.LINES,boundingSphere:new c(a.ZERO,Math.sqrt(2))})};var u=o;function w(n,e){return i(e)&&(n=u.unpack(n,e)),u.createGeometry(n)}var D=w;export{D as default};