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
import{a as t}from"./chunk-CD2ZI67T.js";import"./chunk-TB7RSGDN.js";import"./chunk-PDIF2AUE.js";import"./chunk-LIAARPDW.js";import"./chunk-PRRW7QSP.js";import"./chunk-4NBDOIVA.js";import"./chunk-YIJHUUZY.js";import"./chunk-CSZ6CHXI.js";import"./chunk-XXK6IR5Y.js";import{a as d}from"./chunk-IGBMENRT.js";import"./chunk-SEE54P6A.js";import"./chunk-JNX2URIY.js";import"./chunk-4Z3GDVJK.js";import{a as l}from"./chunk-LU3FCBPP.js";import{b as u}from"./chunk-S2577PU4.js";import{e as a}from"./chunk-2TPVVSVW.js";function s(i){let s=l(i.radius,1),n={radii:new d(s,s,s),stackPartitions:i.stackPartitions,slicePartitions:i.slicePartitions,subdivisions:i.subdivisions};this._ellipsoidGeometry=new t(n),this._workerName="createSphereOutlineGeometry"}s.packedLength=t.packedLength,s.pack=function(i,s,n){return u.typeOf.object("value",i),t.pack(i._ellipsoidGeometry,s,n)};var m=new t,n={radius:void 0,radii:new d,stackPartitions:void 0,slicePartitions:void 0,subdivisions:void 0};s.unpack=function(i,r,e){let o=t.unpack(i,r,m);return n.stackPartitions=o._stackPartitions,n.slicePartitions=o._slicePartitions,n.subdivisions=o._subdivisions,a(e)?(d.clone(o._radii,n.radii),e._ellipsoidGeometry=new t(n),e):(n.radius=o._radii.x,new s(n))},s.createGeometry=function(i){return t.createGeometry(i._ellipsoidGeometry)};var c=s;function p(i,t){return a(t)&&(i=c.unpack(i,t)),c.createGeometry(i)}var w=p;export{w as default};