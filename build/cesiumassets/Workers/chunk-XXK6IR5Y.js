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
import{a as N}from"./chunk-JNX2URIY.js";import{a as i}from"./chunk-LU3FCBPP.js";import{a}from"./chunk-S2577PU4.js";import{e as T}from"./chunk-2TPVVSVW.js";var r={BYTE:N.BYTE,UNSIGNED_BYTE:N.UNSIGNED_BYTE,SHORT:N.SHORT,UNSIGNED_SHORT:N.UNSIGNED_SHORT,INT:N.INT,UNSIGNED_INT:N.UNSIGNED_INT,FLOAT:N.FLOAT,DOUBLE:N.DOUBLE,getSizeInBytes:function(e){if(!T(e))throw new a("value is required.");switch(e){case r.BYTE:return Int8Array.BYTES_PER_ELEMENT;case r.UNSIGNED_BYTE:return Uint8Array.BYTES_PER_ELEMENT;case r.SHORT:return Int16Array.BYTES_PER_ELEMENT;case r.UNSIGNED_SHORT:return Uint16Array.BYTES_PER_ELEMENT;case r.INT:return Int32Array.BYTES_PER_ELEMENT;case r.UNSIGNED_INT:return Uint32Array.BYTES_PER_ELEMENT;case r.FLOAT:return Float32Array.BYTES_PER_ELEMENT;case r.DOUBLE:return Float64Array.BYTES_PER_ELEMENT;default:throw new a("componentDatatype is not a valid value.")}},fromTypedArray:function(e){if(e instanceof Int8Array)return r.BYTE;if(e instanceof Uint8Array)return r.UNSIGNED_BYTE;if(e instanceof Int16Array)return r.SHORT;if(e instanceof Uint16Array)return r.UNSIGNED_SHORT;if(e instanceof Int32Array)return r.INT;if(e instanceof Uint32Array)return r.UNSIGNED_INT;if(e instanceof Float32Array)return r.FLOAT;if(e instanceof Float64Array)return r.DOUBLE;throw new a("array must be an Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, or Float64Array.")},validate:function(e){return T(e)&&(e===r.BYTE||e===r.UNSIGNED_BYTE||e===r.SHORT||e===r.UNSIGNED_SHORT||e===r.INT||e===r.UNSIGNED_INT||e===r.FLOAT||e===r.DOUBLE)},createTypedArray:function(e,n){if(!T(e))throw new a("componentDatatype is required.");if(!T(n))throw new a("valuesOrLength is required.");switch(e){case r.BYTE:return new Int8Array(n);case r.UNSIGNED_BYTE:return new Uint8Array(n);case r.SHORT:return new Int16Array(n);case r.UNSIGNED_SHORT:return new Uint16Array(n);case r.INT:return new Int32Array(n);case r.UNSIGNED_INT:return new Uint32Array(n);case r.FLOAT:return new Float32Array(n);case r.DOUBLE:return new Float64Array(n);default:throw new a("componentDatatype is not a valid value.")}},createArrayBufferView:function(e,n,t,E){if(!T(e))throw new a("componentDatatype is required.");if(!T(n))throw new a("buffer is required.");switch(t=i(t,0),E=i(E,(n.byteLength-t)/r.getSizeInBytes(e)),e){case r.BYTE:return new Int8Array(n,t,E);case r.UNSIGNED_BYTE:return new Uint8Array(n,t,E);case r.SHORT:return new Int16Array(n,t,E);case r.UNSIGNED_SHORT:return new Uint16Array(n,t,E);case r.INT:return new Int32Array(n,t,E);case r.UNSIGNED_INT:return new Uint32Array(n,t,E);case r.FLOAT:return new Float32Array(n,t,E);case r.DOUBLE:return new Float64Array(n,t,E);default:throw new a("componentDatatype is not a valid value.")}},fromName:function(e){switch(e){case"BYTE":return r.BYTE;case"UNSIGNED_BYTE":return r.UNSIGNED_BYTE;case"SHORT":return r.SHORT;case"UNSIGNED_SHORT":return r.UNSIGNED_SHORT;case"INT":return r.INT;case"UNSIGNED_INT":return r.UNSIGNED_INT;case"FLOAT":return r.FLOAT;case"DOUBLE":return r.DOUBLE;default:throw new a("name is not a valid value.")}}},U=Object.freeze(r);export{U as a};