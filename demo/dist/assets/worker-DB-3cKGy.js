function vh(e,t){return t.forEach(function(n){n&&typeof n!="string"&&!Array.isArray(n)&&Object.keys(n).forEach(function(s){if(s!=="default"&&!(s in e)){var r=Object.getOwnPropertyDescriptor(n,s);Object.defineProperty(e,s,r.get?r:{enumerable:!0,get:function(){return n[s]}})}})}),Object.freeze(e)}function Dn(e,t,n,s){function r(o){return o instanceof n?o:new n(function(i){i(o)})}return new(n||(n=Promise))(function(o,i){function a(u){try{c(s.next(u))}catch(f){i(f)}}function l(u){try{c(s.throw(u))}catch(f){i(f)}}function c(u){u.done?o(u.value):r(u.value).then(a,l)}c((s=s.apply(e,[])).next())})}function Rn(e,t){var n={label:0,sent:function(){if(o[0]&1)throw o[1];return o[1]},trys:[],ops:[]},s,r,o,i;return i={next:a(0),throw:a(1),return:a(2)},typeof Symbol=="function"&&(i[Symbol.iterator]=function(){return this}),i;function a(c){return function(u){return l([c,u])}}function l(c){if(s)throw new TypeError("Generator is already executing.");for(;i&&(i=0,c[0]&&(n=0)),n;)try{if(s=1,r&&(o=c[0]&2?r.return:c[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,c[1])).done)return o;switch(r=0,o&&(c=[c[0]&2,o.value]),c[0]){case 0:case 1:o=c;break;case 4:return n.label++,{value:c[1],done:!1};case 5:n.label++,r=c[1],c=[0];continue;case 7:c=n.ops.pop(),n.trys.pop();continue;default:if(o=n.trys,!(o=o.length>0&&o[o.length-1])&&(c[0]===6||c[0]===2)){n=0;continue}if(c[0]===3&&(!o||c[1]>o[0]&&c[1]<o[3])){n.label=c[1];break}if(c[0]===6&&n.label<o[1]){n.label=o[1],o=c;break}if(o&&n.label<o[2]){n.label=o[2],n.ops.push(c);break}o[2]&&n.ops.pop(),n.trys.pop();continue}c=t.call(e,n)}catch(u){c=[6,u],r=0}finally{s=o=0}if(c[0]&5)throw c[1];return{value:c[0]?c[1]:void 0,done:!0}}}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */const xh=1e-7,$h=1e-4;class Ah{constructor(t,n){this.backend=t,this.dataMover=n,this.data=new WeakMap,this.dataIdsCount=0}get(t){return this.data.has(t)||this.dataMover.moveData(this.backend,t),this.data.get(t)}set(t,n){this.dataIdsCount++,this.data.set(t,n)}has(t){return this.data.has(t)}delete(t){return this.dataIdsCount--,this.data.delete(t)}numDataIds(){return this.dataIdsCount}}class ac{refCount(t){return pe("refCount")}incRef(t){return pe("incRef")}timerAvailable(){return!0}time(t){return pe("time")}read(t){return pe("read")}readSync(t){return pe("readSync")}readToGPU(t,n){return pe("readToGPU")}numDataIds(){return pe("numDataIds")}disposeData(t,n){return pe("disposeData")}write(t,n,s){return pe("write")}move(t,n,s,r,o){return pe("move")}memory(){return pe("memory")}floatPrecision(){return pe("floatPrecision")}epsilon(){return this.floatPrecision()===32?xh:$h}dispose(){return pe("dispose")}}function pe(e){throw new Error(`'${e}' not yet implemented or not found in the registry. This kernel may not be supported by the tfjs backend you have chosen`)}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function mi(e,t,n){return Math.max(e,Math.min(t,n))}function Rs(e,t,n){const s=e[t];e[t]=e[n],e[n]=s}function T(e,t){if(!e)throw new Error(typeof t=="string"?t:t())}function ge(e,t,n=""){T(Oe(e,t),()=>n+` Shapes ${e} and ${t} must match`)}function Ss(e){T(e!=null,()=>"The input to the tensor constructor must be a non-null value.")}function Kr(e,t=[],n=!1){if(t==null&&(t=[]),Array.isArray(e)||He(e)&&!n)for(let s=0;s<e.length;++s)Kr(e[s],t,n);else t.push(e);return t}function q(e){if(e.length===0)return 1;let t=e[0];for(let n=1;n<e.length;n++)t*=e[n];return t}function Oe(e,t){if(e===t)return!0;if(e==null||t==null||e.length!==t.length)return!1;for(let n=0;n<e.length;n++)if(e[n]!==t[n])return!1;return!0}function js(e){return e%1===0}function fr(e,t){return t<=e.length?e:e+" ".repeat(t-e.length)}function Dh(e,t){let n=1,s=-1;for(let o=0;o<e.length;++o)if(e[o]>=0)n*=e[o];else if(e[o]===-1){if(s!==-1)throw Error(`Shapes can only have 1 implicit size. Found -1 at dim ${s} and dim ${o}`);s=o}else if(e[o]<0)throw Error(`Shapes can not be < 0. Found ${e[o]} at dim ${o}`);if(s===-1){if(t>0&&t!==n)throw Error(`Size(${t}) must match the product of shape ${e}`);return e}if(n===0)throw Error(`Cannot infer the missing size in [${e}] when there are 0 elements`);if(t%n!==0)throw Error(`The implicit shape can't be a fractional number. Got ${t} / ${n}`);const r=e.slice();return r[s]=t/n,r}function Bt(e,t){const n=t.length;return e=e==null?t.map((s,r)=>r):[].concat(e),T(e.every(s=>s>=-n&&s<n),()=>`All values in axis param must be in range [-${n}, ${n}) but got axis ${e}`),T(e.every(s=>js(s)),()=>`All values in axis param must be integers but got axis ${e}`),e.map(s=>s<0?n+s:s)}function Rh(e,t){const n=[],s=[],r=t!=null&&Array.isArray(t)&&t.length===0,o=t==null||r?null:Bt(t,e).sort();let i=0;for(let a=0;a<e.length;++a){if(o!=null){if(o[i]===a&&e[a]!==1)throw new Error(`Can't squeeze axis ${a} since its dim '${e[a]}' is not 1`);(o[i]==null||o[i]>a)&&e[a]===1&&(n.push(e[a]),s.push(a)),o[i]<=a&&i++}e[a]!==1&&(n.push(e[a]),s.push(a))}return{newShape:n,keptDims:s}}function Xt(e,t){let n=null;if(e==null||e==="float32")n=new Float32Array(t);else if(e==="int32")n=new Int32Array(t);else if(e==="bool")n=new Uint8Array(t);else throw new Error(`Unknown data type ${e}`);return n}function Ht(e,t){let n=null;if(e==null||e==="float32")n=new Float32Array(t);else if(e==="int32")n=new Int32Array(t);else if(e==="bool")n=new Uint8Array(t);else if(e==="string")n=new Array(t);else throw new Error(`Unknown data type ${e}`);return n}function Oh(e,t){for(let n=0;n<e.length;n++){const s=e[n];if(isNaN(s)||!isFinite(s))throw Error(`A tensor of type ${t} being uploaded contains ${s}.`)}}function Lh(e){return e==="bool"||e==="complex64"||e==="float32"||e==="int32"||e==="string"}function Fh(e,t){return!(t==="complex64"||t==="float32"&&e!=="complex64"||t==="int32"&&e!=="float32"&&e!=="complex64"||t==="bool"&&e==="bool")}function He(e){return e instanceof Float32Array||e instanceof Int32Array||e instanceof Uint8Array||e instanceof Uint8ClampedArray}function tl(e){if(e==="float32"||e==="int32")return 4;if(e==="complex64")return 8;if(e==="bool")return 1;throw new Error(`Unknown dtype ${e}`)}function Ph(e){if(e==null)return 0;let t=0;return e.forEach(n=>t+=n.length),t}function jr(e){return typeof e=="string"||e instanceof String}function Uh(e){return typeof e=="boolean"}function Mh(e){return typeof e=="number"}function Xr(e){return Array.isArray(e)?Xr(e[0]):e instanceof Float32Array?"float32":e instanceof Int32Array||e instanceof Uint8Array||e instanceof Uint8ClampedArray?"int32":Mh(e)?"float32":jr(e)?"string":Uh(e)?"bool":"float32"}function el(e){return!!(e&&e.constructor&&e.call&&e.apply)}function nt(e){const t=e.length;if(t<2)return[];const n=new Array(t-1);n[t-2]=e[t-1];for(let s=t-3;s>=0;--s)n[s]=n[s+1]*e[s+1];return n}function lc(e,t,n,s=!1){const r=new Array;if(t.length===1){const o=t[0]*(s?2:1);for(let i=0;i<o;i++)r[i]=n[e+i]}else{const o=t[0],i=t.slice(1),a=i.reduce((l,c)=>l*c)*(s?2:1);for(let l=0;l<o;l++)r[l]=lc(e+l*a,i,n,s)}return r}function Te(e,t,n=!1){if(e.length===0)return t[0];const s=e.reduce((r,o)=>r*o)*(n?2:1);if(s===0)return[];if(s!==t.length)throw new Error(`[${e}] does not match the input size ${t.length}${n?" for a complex tensor":""}.`);return lc(0,e,t,n)}function gi(e,t){const n=Yt(e,t);for(let s=0;s<n.length;s++)n[s]=1;return n}function Yt(e,t){if(t==null||t==="float32"||t==="complex64")return new Float32Array(e);if(t==="int32")return new Int32Array(e);if(t==="bool")return new Uint8Array(e);throw new Error(`Unknown data type ${t}`)}function cc(e,t){const n=e.reduce((s,r)=>s*r,1);if(t==null||t==="float32")return Te(e,new Float32Array(n));if(t==="int32")return Te(e,new Int32Array(n));if(t==="bool")return Te(e,new Uint8Array(n));throw new Error(`Unknown data type ${t}`)}function uc(e){e.forEach(t=>{T(Number.isInteger(t)&&t>=0,()=>`Tensor must have a shape comprised of positive integers but got shape [${e}].`)})}function We(e,t,n){if(t===0)return 0;if(t===1)return e[0];let s=e[e.length-1];for(let r=0;r<e.length-1;++r)s+=n[r]*e[r];return s}function Ts(e,t,n){if(t===0)return[];if(t===1)return[e];const s=new Array(t);for(let r=0;r<s.length-1;++r)s[r]=Math.floor(e/n[r]),e-=s[r]*n[r];return s[s.length-1]=e,s}function hs(e){return e&&e.then&&typeof e.then=="function"}/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */const nl="tfjsflags";class Vh{constructor(t){this.global=t,this.flags={},this.flagRegistry={},this.urlFlags={},this.getQueryParams=Bh,this.populateURLFlags()}setPlatform(t,n){this.platform!=null&&(lt().getBool("IS_TEST")||lt().getBool("PROD")||console.warn(`Platform ${this.platformName} has already been set. Overwriting the platform with ${t}.`)),this.platformName=t,this.platform=n}registerFlag(t,n,s){if(this.flagRegistry[t]={evaluationFn:n,setHook:s},this.urlFlags[t]!=null){const r=this.urlFlags[t];lt().getBool("IS_TEST")||lt().getBool("PROD")||console.warn(`Setting feature override from URL ${t}: ${r}.`),this.set(t,r)}}async getAsync(t){return t in this.flags?this.flags[t]:(this.flags[t]=await this.evaluateFlag(t),this.flags[t])}get(t){if(t in this.flags)return this.flags[t];const n=this.evaluateFlag(t);if(hs(n))throw new Error(`Flag ${t} cannot be synchronously evaluated. Please use getAsync() instead.`);return this.flags[t]=n,this.flags[t]}getNumber(t){return this.get(t)}getBool(t){return this.get(t)}getFlags(){return this.flags}get features(){return this.flags}set(t,n){if(this.flagRegistry[t]==null)throw new Error(`Cannot set flag ${t} as it has not been registered.`);this.flags[t]=n,this.flagRegistry[t].setHook!=null&&this.flagRegistry[t].setHook(n)}evaluateFlag(t){if(this.flagRegistry[t]==null)throw new Error(`Cannot evaluate flag '${t}': no evaluation function found.`);return this.flagRegistry[t].evaluationFn()}setFlags(t){this.flags=Object.assign({},t)}reset(){this.flags={},this.urlFlags={},this.populateURLFlags()}populateURLFlags(){if(typeof this.global>"u"||typeof this.global.location>"u"||typeof this.global.location.search>"u")return;const t=this.getQueryParams(this.global.location.search);nl in t&&t[nl].split(",").forEach(s=>{const[r,o]=s.split(":");this.urlFlags[r]=zh(r,o)})}}function Bh(e){const t={};return e.replace(/[?&]([^=?&]+)(?:=([^&]*))?/g,(n,...s)=>(Ch(t,s[0],s[1]),s.join("="))),t}function Ch(e,t,n){e[decodeURIComponent(t)]=decodeURIComponent(n||"")}function zh(e,t){if(t=t.toLowerCase(),t==="true"||t==="false")return t==="true";if(`${+t}`===t)return+t;throw new Error(`Could not parse value flag value ${t} for flag ${e}.`)}function lt(){return fc}let fc=null;function Wh(e){fc=e}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */let go;function hc(){if(go==null){let e;if(typeof window<"u")e=window;else if(typeof global<"u")e=global;else if(typeof process<"u")e=process;else if(typeof self<"u")e=self;else throw new Error("Could not find a global object");go=e}return go}function Hh(){const e=hc();return e._tfGlobals==null&&(e._tfGlobals=new Map),e._tfGlobals}function yi(e,t){const n=Hh();if(n.has(e))return n.get(e);{const s=t();return n.set(e,s),n.get(e)}}const pc="Abs",bi="Acos",_i="Acosh",Yr="Add",dc="AddN",mc="All",gc="Any",yc="ArgMax",bc="ArgMin",wi="Asin",Ni="Asinh",Ii="Atan",ki="Atanh",Si="Atan2",_c="AvgPool",qh="AvgPoolGrad",wc="AvgPool3D",Gh="AvgPool3DGrad",Nc="BatchMatMul",Ic="BatchToSpaceND",kc="Bincount",Sc="BroadcastArgs",Ti="Cast",Ei="Ceil",vi="ClipByValue",Tc="Complex",Ec="ComplexAbs",vc="Concat",xc="Conv2D",$c="Conv2DBackpropFilter",Ac="Conv2DBackpropInput",Dc="Conv3D",Kh="Conv3DBackpropFilterV2",Rc="Conv3DBackpropInputV2",xi="Cos",$i="Cosh",Oc="Cumprod",Lc="Cumsum",Fc="CropAndResize",Pc="DenseBincount",Uc="DepthToSpace",Mc="DepthwiseConv2dNative",Vc="DepthwiseConv2dNativeBackpropFilter",Bc="DepthwiseConv2dNativeBackpropInput",Cc="Diag",zc="Dilation2D",sl="Dilation2DBackpropInput",rl="Dilation2DBackpropFilter",Ai="RealDiv",Wc="Einsum",Di="Elu",jh="EluGrad",Ri="Erf",Oi="Equal",Li="Exp",Hc="ExpandDims",Fi="Expm1",qc="FFT",Gc="Fill",Kc="FlipLeftRight",Pi="Floor",Ui="FloorDiv",jc="FusedBatchNorm",Xc="GatherV2",Yc="GatherNd",Mi="Greater",Vi="GreaterEqual",Bi="Identity",Zc="IFFT",Jc="Imag",Ci="IsFinite",zi="IsInf",Wi="IsNan",Qc="LeakyRelu",Hi="Less",qi="LessEqual",tu="LinSpace",Gi="Log",Ki="Log1p",ji="LogicalAnd",Xi="LogicalNot",Yi="LogicalOr",eu="LRN",Xh="LRNGrad",nu="Max",Zi="Maximum",su="MaxPool",Yh="MaxPoolGrad",ru="MaxPool3D",Zh="MaxPool3DGrad",ou="MaxPoolWithArgmax",iu="Mean",au="Min",Ji="Minimum",lu="MirrorPad",Qi="Mod",cu="Multinomial",ta="Multiply",uu="Neg",ea="NotEqual",fu="NonMaxSuppressionV3",hu="NonMaxSuppressionV4",pu="NonMaxSuppressionV5",du="OnesLike",mu="OneHot",gu="Pack",yu="PadV2",na="Pow",bu="Prelu",_u="Prod",wu="RaggedGather",Nu="RaggedTensorToTensor",Iu="Range",ku="Real",sa="Reciprocal",ra="Relu",Su="Reshape",Tu="ResizeNearestNeighbor",Jh="ResizeNearestNeighborGrad",Eu="ResizeBilinear",Qh="ResizeBilinearGrad",oa="Relu6",vu="Reverse",ia="Round",aa="Rsqrt",xu="ScatterNd",$u="SearchSorted",Au="Select",la="Selu",Du="Slice",ca="Sin",ua="Sinh",fa="Sign",ha="Sigmoid",pa="Softplus",da="Sqrt",Ru="Sum",Ou="SpaceToBatchND",Lu="SplitV",Fu="Softmax",Pu="SparseFillEmptyRows",Uu="SparseReshape",Mu="SparseSegmentMean",Vu="SparseSegmentSum",Bu="SparseToDense",ma="SquaredDifference",tp="Square",Cu="StridedSlice",zu="StringNGrams",Wu="StringSplit",Hu="StringToHashBucketFast",ga="Sub",ya="Tan",ba="Tanh",_a="Tile",qu="TopK",Gu="Transform",hr="Transpose",Ku="Unique",ju="Unpack",Xu="UnsortedSegmentSum",Yu="ZerosLike",wa="Step",Zu="RotateWithOffset",Eo="_FusedMatMul",vo="FusedConv2D",xo="FusedDepthwiseConv2D";/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function xn(...e){lt().getBool("IS_TEST")||lt().getBool("PROD")||console.warn(...e)}/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */const Nr=yi("kernelRegistry",()=>new Map),ep=yi("gradRegistry",()=>new Map);function ol(e,t){const n=Ju(e,t);return Nr.get(n)}function il(e){return ep.get(e)}function al(e){const t=Nr.entries(),n=[];for(;;){const{done:s,value:r}=t.next();if(s)break;const[o,i]=r,[a]=o.split("_");a===e&&n.push(i)}return n}function np(e){const{kernelName:t,backendName:n}=e,s=Ju(t,n);Nr.has(s)&&xn(`The kernel '${t}' for backend '${n}' is already registered`),Nr.set(s,e)}function Ju(e,t){return`${t}_${e}`}var jn=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function sp(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function rp(e){if(e.__esModule)return e;var t=e.default;if(typeof t=="function"){var n=function s(){return this instanceof s?Reflect.construct(t,arguments,this.constructor):t.apply(this,arguments)};n.prototype=t.prototype}else n={};return Object.defineProperty(n,"__esModule",{value:!0}),Object.keys(e).forEach(function(s){var r=Object.getOwnPropertyDescriptor(e,s);Object.defineProperty(n,s,r.get?r:{enumerable:!0,get:function(){return e[s]}})}),n}var Qu=Tt,Ie=null;try{Ie=new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([0,97,115,109,1,0,0,0,1,13,2,96,0,1,127,96,4,127,127,127,127,1,127,3,7,6,0,1,1,1,1,1,6,6,1,127,1,65,0,11,7,50,6,3,109,117,108,0,1,5,100,105,118,95,115,0,2,5,100,105,118,95,117,0,3,5,114,101,109,95,115,0,4,5,114,101,109,95,117,0,5,8,103,101,116,95,104,105,103,104,0,0,10,191,1,6,4,0,35,0,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,126,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,127,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,128,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,129,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,130,34,4,66,32,135,167,36,0,32,4,167,11])),{}).exports}catch{}function Tt(e,t,n){this.low=e|0,this.high=t|0,this.unsigned=!!n}Tt.prototype.__isLong__;Object.defineProperty(Tt.prototype,"__isLong__",{value:!0});function fe(e){return(e&&e.__isLong__)===!0}Tt.isLong=fe;var ll={},cl={};function Xn(e,t){var n,s,r;return t?(e>>>=0,(r=0<=e&&e<256)&&(s=cl[e],s)?s:(n=Et(e,(e|0)<0?-1:0,!0),r&&(cl[e]=n),n)):(e|=0,(r=-128<=e&&e<128)&&(s=ll[e],s)?s:(n=Et(e,e<0?-1:0,!1),r&&(ll[e]=n),n))}Tt.fromInt=Xn;function ke(e,t){if(isNaN(e))return t?On:Se;if(t){if(e<0)return On;if(e>=t1)return s1}else{if(e<=-fl)return ce;if(e+1>=fl)return n1}return e<0?ke(-e,t).neg():Et(e%ps|0,e/ps|0,t)}Tt.fromNumber=ke;function Et(e,t,n){return new Tt(e,t,n)}Tt.fromBits=Et;var Ir=Math.pow;function Na(e,t,n){if(e.length===0)throw Error("empty string");if(e==="NaN"||e==="Infinity"||e==="+Infinity"||e==="-Infinity")return Se;if(typeof t=="number"?(n=t,t=!1):t=!!t,n=n||10,n<2||36<n)throw RangeError("radix");var s;if((s=e.indexOf("-"))>0)throw Error("interior hyphen");if(s===0)return Na(e.substring(1),t,n).neg();for(var r=ke(Ir(n,8)),o=Se,i=0;i<e.length;i+=8){var a=Math.min(8,e.length-i),l=parseInt(e.substring(i,i+a),n);if(a<8){var c=ke(Ir(n,a));o=o.mul(c).add(ke(l))}else o=o.mul(r),o=o.add(ke(l))}return o.unsigned=t,o}Tt.fromString=Na;function Le(e,t){return typeof e=="number"?ke(e,t):typeof e=="string"?Na(e,t):Et(e.low,e.high,typeof t=="boolean"?t:e.unsigned)}Tt.fromValue=Le;var ul=65536,op=1<<24,ps=ul*ul,t1=ps*ps,fl=t1/2,hl=Xn(op),Se=Xn(0);Tt.ZERO=Se;var On=Xn(0,!0);Tt.UZERO=On;var rs=Xn(1);Tt.ONE=rs;var e1=Xn(1,!0);Tt.UONE=e1;var $o=Xn(-1);Tt.NEG_ONE=$o;var n1=Et(-1,2147483647,!1);Tt.MAX_VALUE=n1;var s1=Et(-1,-1,!0);Tt.MAX_UNSIGNED_VALUE=s1;var ce=Et(0,-2147483648,!1);Tt.MIN_VALUE=ce;var X=Tt.prototype;X.toInt=function(){return this.unsigned?this.low>>>0:this.low};X.toNumber=function(){return this.unsigned?(this.high>>>0)*ps+(this.low>>>0):this.high*ps+(this.low>>>0)};X.toString=function(t){if(t=t||10,t<2||36<t)throw RangeError("radix");if(this.isZero())return"0";if(this.isNegative())if(this.eq(ce)){var n=ke(t),s=this.div(n),r=s.mul(n).sub(this);return s.toString(t)+r.toInt().toString(t)}else return"-"+this.neg().toString(t);for(var o=ke(Ir(t,6),this.unsigned),i=this,a="";;){var l=i.div(o),c=i.sub(l.mul(o)).toInt()>>>0,u=c.toString(t);if(i=l,i.isZero())return u+a;for(;u.length<6;)u="0"+u;a=""+u+a}};X.getHighBits=function(){return this.high};X.getHighBitsUnsigned=function(){return this.high>>>0};X.getLowBits=function(){return this.low};X.getLowBitsUnsigned=function(){return this.low>>>0};X.getNumBitsAbs=function(){if(this.isNegative())return this.eq(ce)?64:this.neg().getNumBitsAbs();for(var t=this.high!=0?this.high:this.low,n=31;n>0&&!(t&1<<n);n--);return this.high!=0?n+33:n+1};X.isZero=function(){return this.high===0&&this.low===0};X.eqz=X.isZero;X.isNegative=function(){return!this.unsigned&&this.high<0};X.isPositive=function(){return this.unsigned||this.high>=0};X.isOdd=function(){return(this.low&1)===1};X.isEven=function(){return(this.low&1)===0};X.equals=function(t){return fe(t)||(t=Le(t)),this.unsigned!==t.unsigned&&this.high>>>31===1&&t.high>>>31===1?!1:this.high===t.high&&this.low===t.low};X.eq=X.equals;X.notEquals=function(t){return!this.eq(t)};X.neq=X.notEquals;X.ne=X.notEquals;X.lessThan=function(t){return this.comp(t)<0};X.lt=X.lessThan;X.lessThanOrEqual=function(t){return this.comp(t)<=0};X.lte=X.lessThanOrEqual;X.le=X.lessThanOrEqual;X.greaterThan=function(t){return this.comp(t)>0};X.gt=X.greaterThan;X.greaterThanOrEqual=function(t){return this.comp(t)>=0};X.gte=X.greaterThanOrEqual;X.ge=X.greaterThanOrEqual;X.compare=function(t){if(fe(t)||(t=Le(t)),this.eq(t))return 0;var n=this.isNegative(),s=t.isNegative();return n&&!s?-1:!n&&s?1:this.unsigned?t.high>>>0>this.high>>>0||t.high===this.high&&t.low>>>0>this.low>>>0?-1:1:this.sub(t).isNegative()?-1:1};X.comp=X.compare;X.negate=function(){return!this.unsigned&&this.eq(ce)?ce:this.not().add(rs)};X.neg=X.negate;X.add=function(t){fe(t)||(t=Le(t));var n=this.high>>>16,s=this.high&65535,r=this.low>>>16,o=this.low&65535,i=t.high>>>16,a=t.high&65535,l=t.low>>>16,c=t.low&65535,u=0,f=0,h=0,p=0;return p+=o+c,h+=p>>>16,p&=65535,h+=r+l,f+=h>>>16,h&=65535,f+=s+a,u+=f>>>16,f&=65535,u+=n+i,u&=65535,Et(h<<16|p,u<<16|f,this.unsigned)};X.subtract=function(t){return fe(t)||(t=Le(t)),this.add(t.neg())};X.sub=X.subtract;X.multiply=function(t){if(this.isZero())return Se;if(fe(t)||(t=Le(t)),Ie){var n=Ie.mul(this.low,this.high,t.low,t.high);return Et(n,Ie.get_high(),this.unsigned)}if(t.isZero())return Se;if(this.eq(ce))return t.isOdd()?ce:Se;if(t.eq(ce))return this.isOdd()?ce:Se;if(this.isNegative())return t.isNegative()?this.neg().mul(t.neg()):this.neg().mul(t).neg();if(t.isNegative())return this.mul(t.neg()).neg();if(this.lt(hl)&&t.lt(hl))return ke(this.toNumber()*t.toNumber(),this.unsigned);var s=this.high>>>16,r=this.high&65535,o=this.low>>>16,i=this.low&65535,a=t.high>>>16,l=t.high&65535,c=t.low>>>16,u=t.low&65535,f=0,h=0,p=0,d=0;return d+=i*u,p+=d>>>16,d&=65535,p+=o*u,h+=p>>>16,p&=65535,p+=i*c,h+=p>>>16,p&=65535,h+=r*u,f+=h>>>16,h&=65535,h+=o*c,f+=h>>>16,h&=65535,h+=i*l,f+=h>>>16,h&=65535,f+=s*u+r*c+o*l+i*a,f&=65535,Et(p<<16|d,f<<16|h,this.unsigned)};X.mul=X.multiply;X.divide=function(t){if(fe(t)||(t=Le(t)),t.isZero())throw Error("division by zero");if(Ie){if(!this.unsigned&&this.high===-2147483648&&t.low===-1&&t.high===-1)return this;var n=(this.unsigned?Ie.div_u:Ie.div_s)(this.low,this.high,t.low,t.high);return Et(n,Ie.get_high(),this.unsigned)}if(this.isZero())return this.unsigned?On:Se;var s,r,o;if(this.unsigned){if(t.unsigned||(t=t.toUnsigned()),t.gt(this))return On;if(t.gt(this.shru(1)))return e1;o=On}else{if(this.eq(ce)){if(t.eq(rs)||t.eq($o))return ce;if(t.eq(ce))return rs;var i=this.shr(1);return s=i.div(t).shl(1),s.eq(Se)?t.isNegative()?rs:$o:(r=this.sub(t.mul(s)),o=s.add(r.div(t)),o)}else if(t.eq(ce))return this.unsigned?On:Se;if(this.isNegative())return t.isNegative()?this.neg().div(t.neg()):this.neg().div(t).neg();if(t.isNegative())return this.div(t.neg()).neg();o=Se}for(r=this;r.gte(t);){s=Math.max(1,Math.floor(r.toNumber()/t.toNumber()));for(var a=Math.ceil(Math.log(s)/Math.LN2),l=a<=48?1:Ir(2,a-48),c=ke(s),u=c.mul(t);u.isNegative()||u.gt(r);)s-=l,c=ke(s,this.unsigned),u=c.mul(t);c.isZero()&&(c=rs),o=o.add(c),r=r.sub(u)}return o};X.div=X.divide;X.modulo=function(t){if(fe(t)||(t=Le(t)),Ie){var n=(this.unsigned?Ie.rem_u:Ie.rem_s)(this.low,this.high,t.low,t.high);return Et(n,Ie.get_high(),this.unsigned)}return this.sub(this.div(t).mul(t))};X.mod=X.modulo;X.rem=X.modulo;X.not=function(){return Et(~this.low,~this.high,this.unsigned)};X.and=function(t){return fe(t)||(t=Le(t)),Et(this.low&t.low,this.high&t.high,this.unsigned)};X.or=function(t){return fe(t)||(t=Le(t)),Et(this.low|t.low,this.high|t.high,this.unsigned)};X.xor=function(t){return fe(t)||(t=Le(t)),Et(this.low^t.low,this.high^t.high,this.unsigned)};X.shiftLeft=function(t){return fe(t)&&(t=t.toInt()),(t&=63)===0?this:t<32?Et(this.low<<t,this.high<<t|this.low>>>32-t,this.unsigned):Et(0,this.low<<t-32,this.unsigned)};X.shl=X.shiftLeft;X.shiftRight=function(t){return fe(t)&&(t=t.toInt()),(t&=63)===0?this:t<32?Et(this.low>>>t|this.high<<32-t,this.high>>t,this.unsigned):Et(this.high>>t-32,this.high>=0?0:-1,this.unsigned)};X.shr=X.shiftRight;X.shiftRightUnsigned=function(t){if(fe(t)&&(t=t.toInt()),t&=63,t===0)return this;var n=this.high;if(t<32){var s=this.low;return Et(s>>>t|n<<32-t,n>>>t,this.unsigned)}else return t===32?Et(n,0,this.unsigned):Et(n>>>t-32,0,this.unsigned)};X.shru=X.shiftRightUnsigned;X.shr_u=X.shiftRightUnsigned;X.toSigned=function(){return this.unsigned?Et(this.low,this.high,!1):this};X.toUnsigned=function(){return this.unsigned?this:Et(this.low,this.high,!0)};X.toBytes=function(t){return t?this.toBytesLE():this.toBytesBE()};X.toBytesLE=function(){var t=this.high,n=this.low;return[n&255,n>>>8&255,n>>>16&255,n>>>24,t&255,t>>>8&255,t>>>16&255,t>>>24]};X.toBytesBE=function(){var t=this.high,n=this.low;return[t>>>24,t>>>16&255,t>>>8&255,t&255,n>>>24,n>>>16&255,n>>>8&255,n&255]};Tt.fromBytes=function(t,n,s){return s?Tt.fromBytesLE(t,n):Tt.fromBytesBE(t,n)};Tt.fromBytesLE=function(t,n){return new Tt(t[0]|t[1]<<8|t[2]<<16|t[3]<<24,t[4]|t[5]<<8|t[6]<<16|t[7]<<24,n)};Tt.fromBytesBE=function(t,n){return new Tt(t[4]<<24|t[5]<<16|t[6]<<8|t[7],t[0]<<24|t[1]<<16|t[2]<<8|t[3],n)};var r1=sp(Qu),ip=vh({__proto__:null,default:r1},[Qu]);/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */const $n=r1||ip;function Zr(e){return $n.fromString(e,!0,16)}const o1=Zr("c3a5c85c97cb3127"),En=Zr("b492b66fbe98f273"),Qt=Zr("9ae16a3b2f90404f");function Ao(e){return e.xor(e.shru(47))}function i1(e,t,n){const s=e.slice(t,t+n);return $n.fromBytes(Array.from(s),!0,!0)}function _t(e,t){return i1(e,t,8)}function pl(e,t){return i1(e,t,4)}function Pt(e,t){return t===0?e:e.shru(t).or(e.shl(64-t))}function _n(e,t,n=Zr("9ddfea08eb382d69")){let s=e.xor(t).mul(n);s=s.xor(s.shru(47));let r=t.xor(s).mul(n);return r=r.xor(r.shru(47)),r=r.mul(n),r}function ap(e,t,n,s,r,o){r=r.add(e),o=Pt(o.add(r).add(s),21);const i=r;return r=r.add(t),r=r.add(n),o=o.add(Pt(r,44)),[r.add(s),o.add(i)]}function ar(e,t,n,s){return ap(_t(e,t),_t(e,t+8),_t(e,t+16),_t(e,t+24),n,s)}function lp(e,t=e.length){if(t>=8){const n=Qt.add(t*2),s=_t(e,0).add(Qt),r=_t(e,t-8),o=Pt(r,37).mul(n).add(s),i=Pt(s,25).add(r).mul(n);return _n(o,i,n)}if(t>=4){const n=Qt.add(t*2),s=pl(e,0);return _n(s.shl(3).add(t),pl(e,t-4),n)}if(t>0){const n=e[0],s=e[t>>1],r=e[t-1],o=n+(s<<8),i=t+(r<<2);return Ao(Qt.mul(o).xor(o1.mul(i))).mul(Qt)}return Qt}function cp(e,t=e.length){const n=Qt.add(t*2),s=_t(e,0).mul(En),r=_t(e,8),o=_t(e,t-8).mul(n),i=_t(e,t-16).mul(Qt);return _n(Pt(s.add(r),43).add(Pt(o,30)).add(i),s.add(Pt(r.add(Qt),18)).add(o),n)}function up(e,t=e.length){const n=Qt.add(t*2),s=_t(e,0).mul(Qt),r=_t(e,8),o=_t(e,t-8).mul(n),i=_t(e,t-16).mul(Qt),a=Pt(s.add(r),43).add(Pt(o,30)).add(i),l=_n(a,s.add(Pt(r.add(Qt),18)).add(o),n),c=_t(e,16).mul(n),u=_t(e,24),f=a.add(_t(e,t-32)).mul(n),h=l.add(_t(e,t-24)).mul(n);return _n(Pt(c.add(u),43).add(Pt(f,30)).add(h),c.add(Pt(u.add(s),18)).add(f),n)}function fp(e,t=e.length){const n=$n.fromNumber(81,!0);if(t<=32)return t<=16?lp(e,t):cp(e,t);if(t<=64)return up(e,t);let s=n,r=n.mul(En).add(113),o=Ao(r.mul(Qt).add(113)).mul(Qt),i=[$n.UZERO,$n.UZERO],a=[$n.UZERO,$n.UZERO];s=s.mul(Qt).add(_t(e,0));let l=0;const c=(t-1>>6)*64,u=c+(t-1&63)-63;do s=Pt(s.add(r).add(i[0]).add(_t(e,l+8)),37).mul(En),r=Pt(r.add(i[1]).add(_t(e,l+48)),42).mul(En),s=s.xor(a[1]),r=r.add(i[0]).add(_t(e,l+40)),o=Pt(o.add(a[0]),33).mul(En),i=ar(e,l,i[1].mul(En),s.add(a[0])),a=ar(e,l+32,o.add(a[1]),r.add(_t(e,l+16))),[o,s]=[s,o],l+=64;while(l!==c);const f=En.add(o.and(255).shl(1));return l=u,a[0]=a[0].add(t-1&63),i[0]=i[0].add(a[0]),a[0]=a[0].add(i[0]),s=Pt(s.add(r).add(i[0]).add(_t(e,l+8)),37).mul(f),r=Pt(r.add(i[1]).add(_t(e,l+48)),42).mul(f),s=s.xor(a[1].mul(9)),r=r.add(i[0].mul(9).add(_t(e,l+40))),o=Pt(o.add(a[0]),33).mul(f),i=ar(e,l,i[1].mul(f),s.add(a[0])),a=ar(e,l+32,o.add(a[1]),r.add(_t(e,l+16))),[o,s]=[s,o],_n(_n(i[0],a[0],f).add(Ao(r).mul(o1)).add(o),_n(i[1],a[1],f).add(s),f)}/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function Ia(e,t){return t==="string"?Pn(e):Yn([e],t)}function hp(e,t){return e instanceof Float32Array&&t==="float32"||e instanceof Int32Array&&t==="int32"||e instanceof Uint8Array&&t==="bool"}function Yn(e,t){if(t==="string")throw new Error("Cannot convert a string[] to a TypedArray");if(Array.isArray(e)&&(e=Kr(e)),lt().getBool("DEBUG")&&Oh(e,t),hp(e,t))return e;if(t==null||t==="float32"||t==="complex64")return new Float32Array(e);if(t==="int32")return new Int32Array(e);if(t==="bool"){const n=new Uint8Array(e.length);for(let s=0;s<n.length;++s)Math.round(e[s])!==0&&(n[s]=1);return n}else throw new Error(`Unknown data type ${t}`)}function ds(){return lt().platform.now()}function Pn(e,t="utf-8"){return t=t||"utf-8",lt().platform.encode(e,t)}function Xs(e,t="utf-8"){return t=t||"utf-8",lt().platform.decode(e,t)}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */class pp{constructor(t,n){this.backendTimer=t,this.logger=n,n==null&&(this.logger=new mp)}profileKernel(t,n,s){let r;const o=()=>{r=s()};let i;const a=ds();if(this.backendTimer.timerAvailable())i=this.backendTimer.time(o);else{o();for(const c of r)c.dataSync();i=Promise.resolve({kernelMs:ds()-a})}if(lt().getBool("CHECK_COMPUTATION_FOR_ERRORS"))for(let c=0;c<r.length;c++){const u=r[c];u.data().then(f=>{dp(f,u.dtype,t)})}return{kernelName:t,outputs:r,inputs:n,timeMs:i.then(c=>c.kernelMs),extraInfo:i.then(c=>c.getExtraProfileInfo!=null?c.getExtraProfileInfo():"")}}logKernelProfile(t){const{kernelName:n,outputs:s,timeMs:r,inputs:o,extraInfo:i}=t;s.forEach(a=>{Promise.all([a.data(),r,i]).then(l=>{this.logger.logKernelProfile(n,a,l[0],l[1],o,l[2])})})}}function dp(e,t,n){if(t!=="float32")return!1;for(let s=0;s<e.length;s++){const r=e[s];if(isNaN(r)||!isFinite(r))return console.warn(`Found ${r} in the result of '${n}'`),!0}return!1}class mp{logKernelProfile(t,n,s,r,o,i){const a=typeof r=="number"?fr(`${r}ms`,9):r.error,l=fr(t,25),c=n.rank,u=n.size,f=fr(n.shape.toString(),14);let h="";for(const p in o){const d=o[p];if(d!=null){const y=d.shape||n.shape,m=y.length;h+=`${p}: ${m}D ${m>0?y:""} `}}console.log(`%c${l}	%c${a}	%c${c}D ${f}	%c${u}	%c${h}	%c${i}`,"font-weight:bold","color:red","color:blue","color: orange","color: green","color: steelblue")}}/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function gp(e,t,n){const s={},r={};for(let l=0;l<t.length;l++)s[t[l].id]=!0;for(let l=0;l<e.length;l++){const c=e[l],u=c.inputs;for(const f in u){const h=u[f];let p=!1;for(let d=0;d<t.length;d++)if(s[h.id]){c.outputs.forEach(y=>s[y.id]=!0),p=!0,r[c.id]=!0;break}if(p)break}}const o={};o[n.id]=!0;const i={};for(let l=e.length-1;l>=0;l--){const c=e[l],u=c.inputs;for(let f=0;f<c.outputs.length;f++)if(o[c.outputs[f].id]){for(const h in u)o[u[h].id]=!0,i[c.id]=!0;break}}const a=[];for(let l=0;l<e.length;l++){const c=e[l];if(r[c.id]&&i[c.id]){const u={};for(const h in c.inputs){const p=c.inputs[h];s[p.id]&&(u[h]=p)}const f=Object.assign({},c);f.inputs=u,f.outputs=c.outputs,a.push(f)}}return a}function yp(e,t,n,s){for(let r=t.length-1;r>=0;r--){const o=t[r],i=[];if(o.outputs.forEach(l=>{const c=e[l.id];c!=null?i.push(c):i.push(null)}),o.gradient==null)throw new Error(`Cannot compute gradient: gradient function not found for ${o.kernelName}.`);const a=o.gradient(i);for(const l in o.inputs){if(!(l in a))throw new Error(`Cannot backprop through input ${l}. Available gradients found: ${Object.keys(a)}.`);const c=n(()=>a[l]());if(c.dtype!=="float32")throw new Error(`Error in gradient for op ${o.kernelName}. The gradient of input ${l} must have 'float32' dtype, but has '${c.dtype}'`);const u=o.inputs[l];if(!Oe(c.shape,u.shape))throw new Error(`Error in gradient for op ${o.kernelName}. The gradient of input '${l}' has shape '${c.shape}', which does not match the shape of the input '${u.shape}'`);if(e[u.id]==null)e[u.id]=c;else{const f=e[u.id];e[u.id]=s(f,c),f.dispose()}}}}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */const dl=20,Os=3,yo=7;function bp(e,t,n,s){const r=nt(t),o=_p(e,t,n,r),i=t.length,a=pr(e,t,n,r,o),l=["Tensor"];return s&&(l.push(`  dtype: ${n}`),l.push(`  rank: ${i}`),l.push(`  shape: [${t}]`),l.push("  values:")),l.push(a.map(c=>"    "+c).join(`
`)),l.join(`
`)}function _p(e,t,n,s){const r=q(t),o=s[s.length-1],i=new Array(o).fill(0),a=t.length,l=n==="complex64"?Ps(e):e;if(a>1)for(let c=0;c<r/o;c++){const u=c*o;for(let f=0;f<o;f++)i[f]=Math.max(i[f],Fs(l[u+f],0,n).length)}return i}function Fs(e,t,n){let s;return Array.isArray(e)?s=`${parseFloat(e[0].toFixed(yo))} + ${parseFloat(e[1].toFixed(yo))}j`:jr(e)?s=`'${e}'`:n==="bool"?s=a1(e):s=parseFloat(e.toFixed(yo)).toString(),fr(s,t)}function a1(e){return e===0?"false":"true"}function pr(e,t,n,s,r,o=!0){const i=n==="complex64"?2:1,a=t[0],l=t.length;if(l===0){if(n==="complex64"){const y=Ps(e);return[Fs(y[0],0,n)]}return n==="bool"?[a1(e[0])]:[e[0].toString()]}if(l===1){if(a>dl){const m=Os*i;let b=Array.from(e.slice(0,m)),_=Array.from(e.slice((a-Os)*i,a*i));return n==="complex64"&&(b=Ps(b),_=Ps(_)),["["+b.map((w,N)=>Fs(w,r[N],n)).join(", ")+", ..., "+_.map((w,N)=>Fs(w,r[a-Os+N],n)).join(", ")+"]"]}return["["+(n==="complex64"?Ps(e):Array.from(e)).map((m,b)=>Fs(m,r[b],n)).join(", ")+"]"]}const c=t.slice(1),u=s.slice(1),f=s[0]*i,h=[];if(a>dl){for(let y=0;y<Os;y++){const m=y*f,b=m+f;h.push(...pr(e.slice(m,b),c,n,u,r,!1))}h.push("...");for(let y=a-Os;y<a;y++){const m=y*f,b=m+f;h.push(...pr(e.slice(m,b),c,n,u,r,y===a-1))}}else for(let y=0;y<a;y++){const m=y*f,b=m+f;h.push(...pr(e.slice(m,b),c,n,u,r,y===a-1))}const p=l===2?",":"";h[0]="["+h[0]+p;for(let y=1;y<h.length-1;y++)h[y]=" "+h[y]+p;let d=`,
`;for(let y=2;y<l;y++)d+=`
`;return h[h.length-1]=" "+h[h.length-1]+"]"+(o?"":d),h}function Ps(e){const t=[];for(let n=0;n<e.length;n+=2)t.push([e[n],e[n+1]]);return t}/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */class Ut{constructor(t,n,s){if(this.dtype=n,this.shape=t.slice(),this.size=q(t),s!=null){const r=s.length;T(r===this.size,()=>`Length of values '${r}' does not match the size inferred by the shape '${this.size}'.`)}if(n==="complex64")throw new Error("complex64 dtype TensorBuffers are not supported. Please create a TensorBuffer for the real and imaginary parts separately and call tf.complex(real, imag).");this.values=s||Ht(n,this.size),this.strides=nt(t)}set(t,...n){n.length===0&&(n=[0]),T(n.length===this.rank,()=>`The number of provided coordinates (${n.length}) must match the rank (${this.rank})`);const s=this.locToIndex(n);this.values[s]=t}get(...t){t.length===0&&(t=[0]);let n=0;for(const r of t){if(r<0||r>=this.shape[n]){const o=`Requested out of range element at ${t}.   Buffer shape=${this.shape}`;throw new Error(o)}n++}let s=t[t.length-1];for(let r=0;r<t.length-1;++r)s+=this.strides[r]*t[r];return this.values[s]}locToIndex(t){if(this.rank===0)return 0;if(this.rank===1)return t[0];let n=t[t.length-1];for(let s=0;s<t.length-1;++s)n+=this.strides[s]*t[s];return n}indexToLoc(t){if(this.rank===0)return[];if(this.rank===1)return[t];const n=new Array(this.shape.length);for(let s=0;s<n.length-1;++s)n[s]=Math.floor(t/this.strides[s]),t-=n[s]*this.strides[s];return n[n.length-1]=t,n}get rank(){return this.shape.length}toTensor(){return $e().makeTensor(this.values,this.shape,this.dtype)}}let $e=null,ns=null;function wp(e){$e=e}function Np(e){ns=e}class Kt{constructor(t,n,s,r){this.kept=!1,this.isDisposedInternal=!1,this.shape=t.slice(),this.dtype=n||"float32",this.size=q(t),this.strides=nt(t),this.dataId=s,this.id=r,this.rankType=this.rank<5?this.rank.toString():"higher"}get rank(){return this.shape.length}async buffer(){const t=await this.data();return ns.buffer(this.shape,this.dtype,t)}bufferSync(){return ns.buffer(this.shape,this.dtype,this.dataSync())}async array(){const t=await this.data();return Te(this.shape,t,this.dtype==="complex64")}arraySync(){return Te(this.shape,this.dataSync(),this.dtype==="complex64")}async data(){this.throwIfDisposed();const t=$e().read(this.dataId);if(this.dtype==="string"){const n=await t;try{return n.map(s=>Xs(s))}catch{throw new Error("Failed to decode the string bytes into utf-8. To get the original bytes, call tensor.bytes().")}}return t}dataToGPU(t){return this.throwIfDisposed(),$e().readToGPU(this.dataId,t)}dataSync(){this.throwIfDisposed();const t=$e().readSync(this.dataId);if(this.dtype==="string")try{return t.map(n=>Xs(n))}catch{throw new Error("Failed to decode the string bytes into utf-8. To get the original bytes, call tensor.bytes().")}return t}async bytes(){this.throwIfDisposed();const t=await $e().read(this.dataId);return this.dtype==="string"?t:new Uint8Array(t.buffer)}dispose(){this.isDisposed||($e().disposeTensor(this),this.isDisposedInternal=!0)}get isDisposed(){return this.isDisposedInternal}throwIfDisposed(){if(this.isDisposed)throw new Error("Tensor is disposed.")}print(t=!1){return ns.print(this,t)}clone(){return this.throwIfDisposed(),ns.clone(this)}toString(t=!1){const n=this.dataSync();return bp(n,this.shape,this.dtype,t)}cast(t){return this.throwIfDisposed(),ns.cast(this,t)}variable(t=!0,n,s){return this.throwIfDisposed(),$e().makeVariable(this,t,n,s)}}Object.defineProperty(Kt,Symbol.hasInstance,{value:e=>!!e&&e.data!=null&&e.dataSync!=null&&e.throwIfDisposed!=null});function Ip(){return yi("Tensor",()=>Kt)}Ip();class Do extends Kt{constructor(t,n,s,r){super(t.shape,t.dtype,t.dataId,r),this.trainable=n,this.name=s}assign(t){if(t.dtype!==this.dtype)throw new Error(`dtype of the new value (${t.dtype}) and previous value (${this.dtype}) must match`);if(!Oe(t.shape,this.shape))throw new Error(`shape of the new value (${t.shape}) and previous value (${this.shape}) must match`);$e().disposeTensor(this),this.dataId=t.dataId,$e().incRef(this,null)}dispose(){$e().disposeVariable(this),this.isDisposedInternal=!0}}Object.defineProperty(Do,Symbol.hasInstance,{value:e=>e instanceof Kt&&e.assign!=null&&e.assign instanceof Function});/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */var ml;(function(e){e.R0="R0",e.R1="R1",e.R2="R2",e.R3="R3",e.R4="R4",e.R5="R5",e.R6="R6"})(ml||(ml={}));var Ro;(function(e){e.float32="float32",e.int32="int32",e.bool="int32",e.complex64="complex64"})(Ro||(Ro={}));var Oo;(function(e){e.float32="float32",e.int32="int32",e.bool="bool",e.complex64="complex64"})(Oo||(Oo={}));var Lo;(function(e){e.float32="float32",e.int32="float32",e.bool="float32",e.complex64="complex64"})(Lo||(Lo={}));var Fo;(function(e){e.float32="complex64",e.int32="complex64",e.bool="complex64",e.complex64="complex64"})(Fo||(Fo={}));const kp={float32:Lo,int32:Ro,bool:Oo,complex64:Fo};function Es(e,t){if(e==="string"||t==="string"){if(e==="string"&&t==="string")return"string";throw new Error(`Can not upcast ${e} with ${t}`)}return kp[e][t]}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function At(e,t){if(e.dtype===t.dtype)return[e,t];const n=Es(e.dtype,t.dtype);return[e.cast(n),t.cast(n)]}function Sp(e,t){T(e.dtype===t.dtype,()=>`The dtypes of the first(${e.dtype}) and second(${t.dtype}) input must match`)}function l1(e){const t=[];return c1(e,t,new Set),t}function c1(e,t,n){if(e==null)return;if(e instanceof Kt){t.push(e);return}if(!Tp(e))return;const s=e;for(const r in s){const o=s[r];n.has(o)||(n.add(o),c1(o,t,n))}}function Tp(e){return Array.isArray(e)||typeof e=="object"}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function bo(e){return e.kernelName!=null}class gl{constructor(){this.registeredVariables={},this.nextTapeNodeId=0,this.numBytes=0,this.numTensors=0,this.numStringTensors=0,this.numDataBuffers=0,this.gradientDepth=0,this.kernelDepth=0,this.scopeStack=[],this.numDataMovesStack=[],this.nextScopeId=0,this.tensorInfo=new WeakMap,this.profiling=!1,this.activeProfile={newBytes:0,newTensors:0,peakBytes:0,kernels:[],result:null,get kernelNames(){return Array.from(new Set(this.kernels.map(t=>t.name)))}}}dispose(){for(const t in this.registeredVariables)this.registeredVariables[t].dispose()}}class ms{constructor(t){this.ENV=t,this.registry={},this.registryFactory={},this.pendingBackendInitId=0,this.state=new gl}async ready(){if(this.pendingBackendInit!=null)return this.pendingBackendInit.then(()=>{});if(this.backendInstance!=null)return;const t=this.getSortedBackends();for(let n=0;n<t.length;n++){const s=t[n];if(await this.initializeBackend(s).success){await this.setBackend(s);return}}throw new Error("Could not initialize any backends, all backend initializations failed.")}get backend(){if(this.pendingBackendInit!=null)throw new Error(`Backend '${this.backendName}' has not yet been initialized. Make sure to await tf.ready() or await tf.setBackend() before calling other methods`);if(this.backendInstance==null){const{name:t,asyncInit:n}=this.initializeBackendsAndReturnBest();if(n)throw new Error(`The highest priority backend '${t}' has not yet been initialized. Make sure to await tf.ready() or await tf.setBackend() before calling other methods`);this.setBackend(t)}return this.backendInstance}backendNames(){return Object.keys(this.registryFactory)}findBackend(t){if(!(t in this.registry))if(t in this.registryFactory){const{asyncInit:n}=this.initializeBackend(t);if(n)return null}else return null;return this.registry[t]}findBackendFactory(t){return t in this.registryFactory?this.registryFactory[t].factory:null}registerBackend(t,n,s=1){return t in this.registryFactory?(xn(`${t} backend was already registered. Reusing existing backend factory.`),!1):(this.registryFactory[t]={factory:n,priority:s},!0)}async setBackend(t){if(this.registryFactory[t]==null)throw new Error(`Backend name '${t}' not found in registry`);if(this.backendName=t,this.registry[t]==null){this.backendInstance=null;const{success:n,asyncInit:s}=this.initializeBackend(t);if(!(s?await n:n))return!1}return this.backendInstance=this.registry[t],this.setupRegisteredKernels(),this.profiler=new pp(this.backendInstance),!0}setupRegisteredKernels(){al(this.backendName).forEach(n=>{n.setupFunc!=null&&n.setupFunc(this.backendInstance)})}disposeRegisteredKernels(t){al(t).forEach(s=>{s.disposeFunc!=null&&s.disposeFunc(this.registry[t])})}initializeBackend(t){const n=this.registryFactory[t];if(n==null)throw new Error(`Cannot initialize backend ${t}, no registration found.`);try{const s=n.factory();if(s&&!(s instanceof ac)&&typeof s.then=="function"){const r=++this.pendingBackendInitId,o=s.then(i=>r<this.pendingBackendInitId?!1:(this.registry[t]=i,this.pendingBackendInit=null,!0)).catch(i=>(r<this.pendingBackendInitId||(this.pendingBackendInit=null,xn(`Initialization of backend ${t} failed`),xn(i.stack||i.message)),!1));return this.pendingBackendInit=o,{success:o,asyncInit:!0}}else return this.registry[t]=s,{success:!0,asyncInit:!1}}catch(s){return xn(`Initialization of backend ${t} failed`),xn(s.stack||s.message),{success:!1,asyncInit:!1}}}removeBackend(t){if(!(t in this.registryFactory))throw new Error(`${t} backend not found in registry`);this.backendName===t&&this.pendingBackendInit!=null&&this.pendingBackendInitId++,t in this.registry&&(this.disposeRegisteredKernels(t),this.registry[t].dispose(),delete this.registry[t]),delete this.registryFactory[t],this.backendName===t&&(this.pendingBackendInit=null,this.backendName=null,this.backendInstance=null)}getSortedBackends(){if(Object.keys(this.registryFactory).length===0)throw new Error("No backend found in registry.");return Object.keys(this.registryFactory).sort((t,n)=>this.registryFactory[n].priority-this.registryFactory[t].priority)}initializeBackendsAndReturnBest(){const t=this.getSortedBackends();for(let n=0;n<t.length;n++){const s=t[n],{success:r,asyncInit:o}=this.initializeBackend(s);if(o||r)return{name:s,asyncInit:o}}throw new Error("Could not initialize any backends, all backend initializations failed.")}moveData(t,n){const s=this.state.tensorInfo.get(n),r=s.backend,o=this.readSync(n),i=r.refCount(n);r.disposeData(n,!0),s.backend=t,t.move(n,o,s.shape,s.dtype,i),this.shouldCheckForMemLeaks()&&this.state.numDataMovesStack[this.state.numDataMovesStack.length-1]++}tidy(t,n){let s=null;if(n==null){if(typeof t!="function")throw new Error("Please provide a function to tidy()");n=t}else{if(typeof t!="string"&&!(t instanceof String))throw new Error("When calling with two arguments, the first argument to tidy() must be a string");if(typeof n!="function")throw new Error("When calling with two arguments, the 2nd argument to tidy() must be a function");s=t}let r;return this.scopedRun(()=>this.startScope(s),()=>this.endScope(r),()=>(r=n(),r instanceof Promise&&console.error("Cannot return a Promise inside of tidy."),r))}scopedRun(t,n,s){t();try{const r=s();return n(),r}catch(r){throw n(),r}}nextTensorId(){return ms.nextTensorId++}nextVariableId(){return ms.nextVariableId++}clone(t){const n=R.runKernel(Bi,{x:t}),s={x:t},r=i=>({x:()=>{const a="float32",l={x:i},c={dtype:a};return R.runKernel(Ti,l,c)}}),o=[];return this.addTapeNode(this.state.activeScope.name,s,[n],r,o,{}),n}runKernel(t,n,s){if(this.backendName==null&&this.backend,!(ol(t,this.backendName)!=null))throw new Error(`Kernel '${t}' not registered for backend '${this.backendName}'`);return this.runKernelFunc({kernelName:t,inputs:n,attrs:s})}shouldCheckForMemLeaks(){return this.ENV.getBool("IS_TEST")}checkKernelForMemLeak(t,n,s){const r=this.backend.numDataIds();let o=0;s.forEach(l=>{o+=l.dtype==="complex64"?3:1});const i=this.state.numDataMovesStack[this.state.numDataMovesStack.length-1],a=r-n-o-i;if(a>0)throw new Error(`Backend '${this.backendName}' has an internal memory leak (${a} data ids) after running '${t}'`)}runKernelFunc(t){let n,s=[];const r=this.isTapeOn(),o=this.state.numBytes,i=this.state.numTensors;this.shouldCheckForMemLeaks()&&this.state.numDataMovesStack.push(0);let a;this.backendName==null&&this.backend;let l;const c=bo(t)?t.kernelName:this.state.activeScope!=null?this.state.activeScope.name:"";if(bo(t)){const{kernelName:d,inputs:y,attrs:m}=t;this.backendName==null&&this.backend;const b=ol(d,this.backendName);T(b!=null,()=>`Cannot find registered kernel '${d}' for backend '${this.backendName}'`),a=()=>{const _=this.backend.numDataIds();l=b.kernelFunc({inputs:y,attrs:m,backend:this.backend});const w=Array.isArray(l)?l:[l];this.shouldCheckForMemLeaks()&&this.checkKernelForMemLeak(d,_,w);const N=w.map(I=>I.rank!=null?I:this.makeTensorFromTensorInfo(I));if(r){const I=this.getTensorsForGradient(d,y,N);s=this.saveTensorsForBackwardMode(I)}return N}}else{const{forwardFunc:d}=t,y=m=>{r&&(s=m.map(b=>this.keep(this.clone(b))))};a=()=>{const m=this.backend.numDataIds();l=this.tidy(()=>d(this.backend,y));const b=Array.isArray(l)?l:[l];return this.shouldCheckForMemLeaks()&&this.checkKernelForMemLeak(c,m,b),b}}const{inputs:u,attrs:f}=t,h=bo(t)?null:t.backwardsFunc;let p;return this.scopedRun(()=>this.state.kernelDepth++,()=>this.state.kernelDepth--,()=>{!this.ENV.getBool("DEBUG")&&!this.state.profiling?n=a():(p=this.profiler.profileKernel(c,u,()=>a()),this.ENV.getBool("DEBUG")&&this.profiler.logKernelProfile(p),n=p.outputs)}),r&&this.addTapeNode(c,u,n,h,s,f),this.state.profiling&&this.state.activeProfile.kernels.push({name:c,bytesAdded:this.state.numBytes-o,totalBytesSnapshot:this.state.numBytes,tensorsAdded:this.state.numTensors-i,totalTensorsSnapshot:this.state.numTensors,inputShapes:Object.keys(u).map(d=>u[d]!=null?u[d].shape:null),outputShapes:n.map(d=>d.shape),kernelTimeMs:p.timeMs,extraInfo:p.extraInfo}),Array.isArray(l)?n:n[0]}saveTensorsForBackwardMode(t){return t.map(s=>this.keep(this.clone(s)))}getTensorsForGradient(t,n,s){const r=il(t);if(r!=null){const o=r.inputsToSave||[],i=r.outputsToSave||[];let a;r.saveAllInputs?(T(Array.isArray(n),()=>"saveAllInputs is true, expected inputs to be an array."),a=Object.keys(n).map(c=>n[c])):a=o.map(c=>n[c]);const l=s.filter((c,u)=>i[u]);return a.concat(l)}return[]}makeTensor(t,n,s,r){if(t==null)throw new Error("Values passed to engine.makeTensor() are null");s=s||"float32",r=r||this.backend;let o=t;s==="string"&&jr(t[0])&&(o=t.map(l=>Pn(l)));const i=r.write(o,n,s),a=new Kt(n,s,i,this.nextTensorId());if(this.trackTensor(a,r),s==="string"){const l=this.state.tensorInfo.get(i),c=Ph(o);this.state.numBytes+=c-l.bytes,l.bytes=c}return a}makeTensorFromDataId(t,n,s,r){s=s||"float32";const o={dataId:t,shape:n,dtype:s};return this.makeTensorFromTensorInfo(o,r)}makeTensorFromTensorInfo(t,n){const{dataId:s,shape:r,dtype:o}=t,i=new Kt(r,o,s,this.nextTensorId());return this.trackTensor(i,n),i}makeVariable(t,n=!0,s,r){s=s||this.nextVariableId().toString(),r!=null&&r!==t.dtype&&(t=t.cast(r));const o=new Do(t,n,s,this.nextTensorId());if(this.state.registeredVariables[o.name]!=null)throw new Error(`Variable with name ${o.name} was already registered`);return this.state.registeredVariables[o.name]=o,this.incRef(o,this.backend),o}trackTensor(t,n){this.state.numTensors++,t.dtype==="string"&&this.state.numStringTensors++;let s=0;t.dtype!=="complex64"&&t.dtype!=="string"&&(s=t.size*tl(t.dtype)),this.state.numBytes+=s,this.state.tensorInfo.has(t.dataId)||(this.state.numDataBuffers++,this.state.tensorInfo.set(t.dataId,{backend:n||this.backend,dtype:t.dtype,shape:t.shape,bytes:s})),t instanceof Do||this.track(t)}incRef(t,n){this.trackTensor(t,n),this.backend.incRef(t.dataId)}removeDataId(t,n){this.state.tensorInfo.has(t)&&this.state.tensorInfo.get(t).backend===n&&(this.state.tensorInfo.delete(t),this.state.numDataBuffers--)}disposeTensor(t){if(!this.state.tensorInfo.has(t.dataId))return;const n=this.state.tensorInfo.get(t.dataId);if(this.state.numTensors--,t.dtype==="string"&&(this.state.numStringTensors--,this.state.numBytes-=n.bytes),t.dtype!=="complex64"&&t.dtype!=="string"){const s=t.size*tl(t.dtype);this.state.numBytes-=s}n.backend.disposeData(t.dataId)&&this.removeDataId(t.dataId,n.backend)}disposeVariables(){for(const t in this.state.registeredVariables){const n=this.state.registeredVariables[t];this.disposeVariable(n)}}disposeVariable(t){this.disposeTensor(t),this.state.registeredVariables[t.name]!=null&&delete this.state.registeredVariables[t.name]}memory(){const t=this.backend.memory();return t.numTensors=this.state.numTensors,t.numDataBuffers=this.state.numDataBuffers,t.numBytes=this.state.numBytes,this.state.numStringTensors>0&&(t.unreliable=!0,t.reasons==null&&(t.reasons=[]),t.reasons.push("Memory usage by string tensors is approximate (2 bytes per character)")),t}async profile(t){this.state.profiling=!0;const n=this.state.numBytes,s=this.state.numTensors;this.state.activeProfile.kernels=[],this.state.activeProfile.result=await t(),this.state.profiling=!1,this.state.activeProfile.peakBytes=Math.max(...this.state.activeProfile.kernels.map(r=>r.totalBytesSnapshot)),this.state.activeProfile.newBytes=this.state.numBytes-n,this.state.activeProfile.newTensors=this.state.numTensors-s;for(const r of this.state.activeProfile.kernels)r.kernelTimeMs=await r.kernelTimeMs,r.extraInfo=await r.extraInfo;return this.state.activeProfile}isTapeOn(){return this.state.gradientDepth>0&&this.state.kernelDepth===0}addTapeNode(t,n,s,r,o,i){const a={id:this.state.nextTapeNodeId++,kernelName:t,inputs:n,outputs:s,saved:o},l=il(t);l!=null&&(r=l.gradFunc),r!=null&&(a.gradient=c=>(c=c.map((u,f)=>{if(u==null){const h=s[f],p=Yt(h.size,h.dtype);return this.makeTensor(p,h.shape,h.dtype)}return u}),r(c.length>1?c:c[0],o,i))),this.state.activeTape.push(a)}keep(t){return t.kept=!0,t}startTape(){this.state.gradientDepth===0&&(this.state.activeTape=[]),this.state.gradientDepth++}endTape(){this.state.gradientDepth--}startScope(t){const n={track:[],name:"unnamed scope",id:this.state.nextScopeId++};t&&(n.name=t),this.state.scopeStack.push(n),this.state.activeScope=n}endScope(t){const n=l1(t),s=new Set(n.map(o=>o.id));for(let o=0;o<this.state.activeScope.track.length;o++){const i=this.state.activeScope.track[o];!i.kept&&!s.has(i.id)&&i.dispose()}const r=this.state.scopeStack.pop();this.state.activeScope=this.state.scopeStack.length===0?null:this.state.scopeStack[this.state.scopeStack.length-1],n.forEach(o=>{!o.kept&&o.scopeId===r.id&&this.track(o)})}gradients(t,n,s,r=!1){if(T(n.length>0,()=>"gradients() received an empty list of xs."),s!=null&&s.dtype!=="float32")throw new Error(`dy must have 'float32' dtype, but has '${s.dtype}'`);const o=this.scopedRun(()=>this.startTape(),()=>this.endTape(),()=>this.tidy("forward",t));T(o instanceof Kt,()=>"The result y returned by f() must be a tensor.");const i=gp(this.state.activeTape,n,o);if(!r&&i.length===0&&n.length>0)throw new Error("Cannot compute gradient of y=f(x) with respect to x. Make sure that the f you passed encloses all operations that lead from x to y.");return this.tidy("backward",()=>{const a={};a[o.id]=s??Ep(o.shape),yp(a,i,c=>this.tidy(c),vp);const l=n.map(c=>a[c.id]);return this.state.gradientDepth===0&&(this.state.activeTape.forEach(c=>{for(const u of c.saved)u.dispose()}),this.state.activeTape=null),{value:o,grads:l}})}customGrad(t){return T(el(t),()=>"The f passed in customGrad(f) must be a function."),(...n)=>{T(n.every(a=>a instanceof Kt),()=>"The args passed in customGrad(f)(x1, x2,...) must all be tensors");let s;const r={};n.forEach((a,l)=>{r[l]=a});const o=(a,l)=>(s=t(...n,l),T(s.value instanceof Kt,()=>"The function f passed in customGrad(f) must return an object where `obj.value` is a tensor"),T(el(s.gradFunc),()=>"The function f passed in customGrad(f) must return an object where `obj.gradFunc` is a function."),s.value),i=(a,l)=>{const c=s.gradFunc(a,l),u=Array.isArray(c)?c:[c];T(u.length===n.length,()=>"The function f passed in customGrad(f) must return an object where `obj.gradFunc` is a function that returns the same number of tensors as inputs passed to f(...)."),T(u.every(h=>h instanceof Kt),()=>"The function f passed in customGrad(f) must return an object where `obj.gradFunc` is a function that returns a list of only tensors.");const f={};return u.forEach((h,p)=>{f[p]=()=>h}),f};return this.runKernelFunc({forwardFunc:o,backwardsFunc:i,inputs:r})}}readSync(t){return this.state.tensorInfo.get(t).backend.readSync(t)}read(t){return this.state.tensorInfo.get(t).backend.read(t)}readToGPU(t,n){return this.state.tensorInfo.get(t).backend.readToGPU(t,n)}async time(t){const n=ds(),s=await this.backend.time(t);return s.wallMs=ds()-n,s}track(t){return this.state.activeScope!=null&&(t.scopeId=this.state.activeScope.id,this.state.activeScope.track.push(t)),t}get registeredVariables(){return this.state.registeredVariables}reset(){this.pendingBackendInitId++,this.state.dispose(),this.ENV.reset(),this.state=new gl;for(const t in this.registry)this.disposeRegisteredKernels(t),this.registry[t].dispose(),delete this.registry[t];this.backendName=null,this.backendInstance=null,this.pendingBackendInit=null}}ms.nextTensorId=0;ms.nextVariableId=0;function Ep(e){const t=gi(q(e),"float32");return R.makeTensor(t,e,"float32")}function u1(){const e=hc();if(e._tfengine==null){const t=new Vh(e);e._tfengine=new ms(t)}return Wh(e._tfengine.ENV),wp(()=>e._tfengine),e._tfengine}const R=u1();function vp(e,t){const n={a:e,b:t};return R.runKernel(Yr,n)}/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function xp(){return typeof window<"u"&&window.document!=null||typeof WorkerGlobalScope<"u"}/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */const ue=lt();ue.registerFlag("DEBUG",()=>!1,e=>{e&&console.warn("Debugging mode is ON. The output of every math call will be downloaded to CPU and checked for NaNs. This significantly impacts performance.")});ue.registerFlag("IS_BROWSER",()=>xp());ue.registerFlag("IS_NODE",()=>typeof process<"u"&&typeof process.versions<"u"&&typeof process.versions.node<"u");ue.registerFlag("IS_CHROME",()=>typeof navigator<"u"&&navigator!=null&&navigator.userAgent!=null&&/Chrome/.test(navigator.userAgent)&&/Google Inc/.test(navigator.vendor));ue.registerFlag("PROD",()=>!1);ue.registerFlag("TENSORLIKE_CHECK_SHAPE_CONSISTENCY",()=>ue.getBool("DEBUG"));ue.registerFlag("DEPRECATION_WARNINGS_ENABLED",()=>!0);ue.registerFlag("IS_TEST",()=>!1);ue.registerFlag("CHECK_COMPUTATION_FOR_ERRORS",()=>!0);ue.registerFlag("WRAP_TO_IMAGEBITMAP",()=>!1);ue.registerFlag("ENGINE_COMPILE_ONLY",()=>!1);ue.registerFlag("CANVAS2D_WILL_READ_FREQUENTLY_FOR_GPU",()=>!1);ue.registerFlag("USE_SETTIMEOUTCUSTOM",()=>!1);/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function kn(e,t){let n=e;if(He(e))return t==="string"?[]:[e.length];if(!Array.isArray(e))return[];const s=[];for(;Array.isArray(n)||He(n)&&t!=="string";)s.push(n.length),n=n[0];return Array.isArray(e)&&lt().getBool("TENSORLIKE_CHECK_SHAPE_CONSISTENCY")&&f1(e,s,[]),s}function f1(e,t,n){if(n=n||[],!Array.isArray(e)&&!He(e)){T(t.length===0,()=>`Element arr[${n.join("][")}] is a primitive, but should be an array/TypedArray of ${t[0]} elements`);return}T(t.length>0,()=>`Element arr[${n.join("][")}] should be a primitive, but is an array of ${e.length} elements`),T(e.length===t[0],()=>`Element arr[${n.join("][")}] should have ${t[0]} elements, but has ${e.length} elements`);const s=t.slice(1);for(let r=0;r<e.length;++r)f1(e[r],s,n.concat(r))}function yl(e,t,n,s){if(e!=="string_or_numeric"){if(e==null)throw new Error("Expected dtype cannot be null.");if(e!=="numeric"&&e!==t||e==="numeric"&&t==="string")throw new Error(`Argument '${n}' passed to '${s}' must be ${e} tensor, but got ${t} tensor`)}}function k(e,t,n,s="numeric"){if(e instanceof Kt)return yl(s,e.dtype,t,n),e;let r=Xr(e);if(r!=="string"&&["bool","int32","float32"].indexOf(s)>=0&&(r=s),yl(s,r,t,n),e==null||!He(e)&&!Array.isArray(e)&&typeof e!="number"&&typeof e!="boolean"&&typeof e!="string"){const l=e==null?"null":e.constructor.name;throw new Error(`Argument '${t}' passed to '${n}' must be a Tensor or TensorLike, but got '${l}'`)}const o=kn(e,r);!He(e)&&!Array.isArray(e)&&(e=[e]);const a=r!=="string"?Yn(e,r):Kr(e,[],!0);return R.makeTensor(a,o,r)}function kr(e,t,n,s="numeric"){if(!Array.isArray(e))throw new Error(`Argument ${t} passed to ${n} must be a \`Tensor[]\` or \`TensorLike[]\``);return e.map((o,i)=>k(o,`${t}[${i}]`,n,s))}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */const h1="__op";function v(e){const t=Object.keys(e);if(t.length!==1)throw new Error(`Please provide an object with a single key (operation name) mapping to a function. Got an object with ${t.length} keys.`);let n=t[0];const s=e[n];n.endsWith("_")&&(n=n.substring(0,n.length-1)),n=n+h1;const r=(...o)=>{R.startScope(n);try{const i=s(...o);return hs(i)&&console.error("Cannot return a Promise inside of tidy."),R.endScope(i),i}catch(i){throw R.endScope(null),i}};return Object.defineProperty(r,"name",{value:n,configurable:!0}),r}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function $p(e,t){const n=k(e,"real","complex"),s=k(t,"imag","complex");ge(n.shape,s.shape,`real and imag shapes, ${n.shape} and ${s.shape}, must match in call to tf.complex().`);const r={real:n,imag:s};return R.runKernel(Tc,r)}const Nn=v({complex_:$p});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function Sn(e,t,n,s){if(s==null&&(s=Xr(e)),s==="complex64")throw new Error("Cannot construct a complex64 tensor directly. Please use tf.complex(real, imag).");if(!He(e)&&!Array.isArray(e)&&typeof e!="number"&&typeof e!="boolean"&&typeof e!="string")throw new Error("values passed to tensor(values) must be a number/boolean/string or an array of numbers/booleans/strings, or a TypedArray");if(t!=null){uc(t);const r=q(t),o=q(n);T(r===o,()=>`Based on the provided shape, [${t}], the tensor should have ${r} values but has ${o}`);for(let i=0;i<n.length;++i){const a=n[i],l=i===n.length-1?a!==q(t.slice(i)):!0;T(n[i]===t[i]||!l,()=>`Error creating a new Tensor. Inferred shape (${n}) does not match the provided shape (${t}). `)}}return!He(e)&&!Array.isArray(e)&&(e=[e]),t=t||n,e=s!=="string"?Yn(e,s):Kr(e,[],!0),R.makeTensor(e,t,s)}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function Re(e,t,n){const s=kn(e,n);return Sn(e,t,s,n)}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */const Po={float32:4,float16:2,int32:4,uint16:2,uint8:1,bool:1,complex64:8};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */const Sr=4;async function Ap(e,t){const n=[],s=[],r=Array.isArray(e)?e.map(i=>i.name):Object.keys(e);for(let i=0;i<r.length;++i){const a=r[i],l=Array.isArray(e)?e[i].tensor:e[a];if(l.dtype!=="float32"&&l.dtype!=="int32"&&l.dtype!=="bool"&&l.dtype!=="string"&&l.dtype!=="complex64")throw new Error(`Unsupported dtype in weight '${a}': ${l.dtype}`);const c={name:a,shape:l.shape,dtype:l.dtype};if(l.dtype==="string"){const u=new Promise(async f=>{const h=await l.bytes(),p=h.reduce((m,b)=>m+b.length,0)+Sr*h.length,d=new Uint8Array(p);let y=0;for(let m=0;m<h.length;m++){const b=h[m],_=new Uint8Array(new Uint32Array([b.length]).buffer);d.set(_,y),y+=Sr,d.set(b,y),y+=b.length}f(d)});s.push(u)}else s.push(l.data());t!=null&&(c.group=t),n.push(c)}const o=await Promise.all(s);return{data:Dp(o),specs:n}}function p1(e,t){const n={};let s,r=0;for(const o of t){const i=o.name,a=o.dtype,l=o.shape,c=q(l);let u;if("quantization"in o){const f=o.quantization;if(f.dtype==="uint8"||f.dtype==="uint16"){if(!("min"in f&&"scale"in f))throw new Error(`Weight ${o.name} with quantization ${f.dtype} doesn't have corresponding metadata min and scale.`)}else if(f.dtype==="float16"){if(a!=="float32")throw new Error(`Weight ${o.name} is quantized with ${f.dtype} which only supports weights of type float32 not ${a}.`)}else throw new Error(`Weight ${o.name} has unknown quantization dtype ${f.dtype}. Supported quantization dtypes are: 'uint8', 'uint16', and 'float16'.`);const h=Po[f.dtype],p=e.slice(r,r+c*h),d=f.dtype==="uint8"?new Uint8Array(p):new Uint16Array(p);if(a==="float32")if(f.dtype==="uint8"||f.dtype==="uint16"){u=new Float32Array(d.length);for(let y=0;y<d.length;y++){const m=d[y];u[y]=m*f.scale+f.min}}else if(f.dtype==="float16")s===void 0&&(s=Up()),u=s(d);else throw new Error(`Unsupported quantization type ${f.dtype} for weight type float32.`);else if(a==="int32"){if(f.dtype!=="uint8"&&f.dtype!=="uint16")throw new Error(`Unsupported quantization type ${f.dtype} for weight type int32.`);u=new Int32Array(d.length);for(let y=0;y<d.length;y++){const m=d[y];u[y]=Math.round(m*f.scale+f.min)}}else throw new Error(`Unsupported dtype in weight '${i}': ${a}`);r+=c*h}else if(a==="string"){const f=q(o.shape);u=[];for(let h=0;h<f;h++){const p=new Uint32Array(e.slice(r,r+Sr))[0];r+=Sr;const d=new Uint8Array(e.slice(r,r+p));u.push(d),r+=p}}else{const f=Po[a],h=e.slice(r,r+c*f);if(a==="float32")u=new Float32Array(h);else if(a==="int32")u=new Int32Array(h);else if(a==="bool")u=new Uint8Array(h);else if(a==="complex64"){u=new Float32Array(h);const p=new Float32Array(u.length/2),d=new Float32Array(u.length/2);for(let b=0;b<p.length;b++)p[b]=u[b*2],d[b]=u[b*2+1];const y=Re(p,l,"float32"),m=Re(d,l,"float32");n[i]=Nn(y,m),y.dispose(),m.dispose()}else throw new Error(`Unsupported dtype in weight '${i}': ${a}`);r+=c*f}a!=="complex64"&&(n[i]=Re(u,l,a))}return n}function Dp(e){if(e===null)throw new Error(`Invalid input value: ${JSON.stringify(e)}`);let t=0;const n=[];e.forEach(o=>{if(t+=o.byteLength,n.push(o.byteLength===o.buffer.byteLength?o:new o.constructor(o)),!(o instanceof Float32Array||o instanceof Int32Array||o instanceof Uint8Array))throw new Error(`Unsupported TypedArray subtype: ${o.constructor.name}`)});const s=new Uint8Array(t);let r=0;return n.forEach(o=>{s.set(new Uint8Array(o.buffer),r),r+=o.byteLength}),s.buffer}const ka=typeof Buffer<"u"&&(typeof Blob>"u"||typeof atob>"u"||typeof btoa>"u");function bl(e){return ka?Buffer.byteLength(e):new Blob([e]).size}function Rp(e){if(ka)return Buffer.from(e).toString("base64");const t=new Uint8Array(e);let n="";for(let s=0,r=t.length;s<r;s++)n+=String.fromCharCode(t[s]);return btoa(n)}function Op(e){if(ka){const s=Buffer.from(e,"base64");return s.buffer.slice(s.byteOffset,s.byteOffset+s.byteLength)}const t=atob(e),n=new Uint8Array(t.length);for(let s=0;s<t.length;++s)n.set([t.charCodeAt(s)],s);return n.buffer}function Sa(e){if(e.length===1)return e[0];let t=0;e.forEach(r=>{t+=r.byteLength});const n=new Uint8Array(t);let s=0;return e.forEach(r=>{n.set(new Uint8Array(r),s),s+=r.byteLength}),n.buffer}function _l(e){const t="/";for(e=e.trim();e.endsWith(t);)e=e.slice(0,e.length-1);const n=e.split(t);return n[n.length-1]}function d1(e,t){const n={modelTopology:e.modelTopology,format:e.format,generatedBy:e.generatedBy,convertedBy:e.convertedBy,weightsManifest:t};return e.signature!=null&&(n.signature=e.signature),e.userDefinedMetadata!=null&&(n.userDefinedMetadata=e.userDefinedMetadata),e.modelInitializer!=null&&(n.modelInitializer=e.modelInitializer),e.trainingConfig!=null&&(n.trainingConfig=e.trainingConfig),n}function m1(e,t,n){const s={modelTopology:e.modelTopology,format:e.format,generatedBy:e.generatedBy,convertedBy:e.convertedBy};if(e.trainingConfig!=null&&(s.trainingConfig=e.trainingConfig),e.weightsManifest!=null){if(!t)throw new Error("modelJSON has weightsManifest but weightSpecs is null");if(!n)throw new Error("modelJSON has weightsManifest but weightData is null");s.weightSpecs=t,s.weightData=n}return e.signature!=null&&(s.signature=e.signature),e.userDefinedMetadata!=null&&(s.userDefinedMetadata=e.userDefinedMetadata),e.modelInitializer!=null&&(s.modelInitializer=e.modelInitializer),s}async function Ta(e,t){let n,s;return e.weightsManifest!=null&&([n,s]=await t(e.weightsManifest)),m1(e,n,s)}function nr(e){if(e.modelTopology instanceof ArrayBuffer)throw new Error("Expected JSON model topology, received ArrayBuffer.");return{dateSaved:new Date,modelTopologyType:"JSON",modelTopologyBytes:e.modelTopology==null?0:bl(JSON.stringify(e.modelTopology)),weightSpecsBytes:e.weightSpecs==null?0:bl(JSON.stringify(e.weightSpecs)),weightDataBytes:e.weightData==null?0:e.weightData.byteLength}}function g1(e){const t=[];for(const n of e)t.push(...n.weights);return t}function Lp(){const e=n=>{let s=n<<13,r=0;for(;!(s&8388608);)r-=8388608,s<<=1;return s&=-8388609,r+=947912704,s|r},t=new Uint32Array(2048);t[0]=0;for(let n=1;n<1024;n++)t[n]=e(n);for(let n=1024;n<2048;n++)t[n]=939524096+(n-1024<<13);return t}function Fp(){const e=new Uint32Array(64);e[0]=0,e[31]=1199570944,e[32]=2147483648,e[63]=3347054592;for(let t=1;t<31;t++)e[t]=t<<23;for(let t=33;t<63;t++)e[t]=2147483648+(t-32<<23);return e}function Pp(){const e=new Uint32Array(64);for(let t=0;t<64;t++)e[t]=1024;return e[0]=e[32]=0,e}function Up(){const e=Lp(),t=Fp(),n=Pp();return s=>{const r=new ArrayBuffer(4*s.length),o=new Uint32Array(r);for(let i=0;i<s.length;i++){const a=s[i],l=e[n[a>>10]+(a&1023)]+t[a>>10];o[i]=l}return new Float32Array(r)}}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */class xt{constructor(){this.saveRouters=[],this.loadRouters=[]}static getInstance(){return xt.instance==null&&(xt.instance=new xt),xt.instance}static registerSaveRouter(t){xt.getInstance().saveRouters.push(t)}static registerLoadRouter(t){xt.getInstance().loadRouters.push(t)}static getSaveHandlers(t){return xt.getHandlers(t,"save")}static getLoadHandlers(t,n){return xt.getHandlers(t,"load",n)}static getHandlers(t,n,s){const r=[];return(n==="load"?xt.getInstance().loadRouters:xt.getInstance().saveRouters).forEach(i=>{const a=i(t,s);a!==null&&r.push(a)}),r}}const Mp=e=>xt.registerSaveRouter(e),Vp=e=>xt.registerLoadRouter(e),Bp=e=>xt.getSaveHandlers(e),Cp=(e,t)=>xt.getLoadHandlers(e,t);/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */const Uo="tensorflowjs",Mo=1,Ln="models_store",yn="model_info_store";function y1(){if(!lt().getBool("IS_BROWSER"))throw new Error("Failed to obtain IndexedDB factory because the current environmentis not a web browser.");const e=typeof window>"u"?self:window,t=e.indexedDB||e.mozIndexedDB||e.webkitIndexedDB||e.msIndexedDB||e.shimIndexedDB;if(t==null)throw new Error("The current browser does not appear to support IndexedDB.");return t}function Vo(e){const t=e.result;t.createObjectStore(Ln,{keyPath:"modelPath"}),t.createObjectStore(yn,{keyPath:"modelPath"})}class Bn{constructor(t){if(this.indexedDB=y1(),t==null||!t)throw new Error("For IndexedDB, modelPath must not be null, undefined or empty.");this.modelPath=t}async save(t){if(t.modelTopology instanceof ArrayBuffer)throw new Error("BrowserLocalStorage.save() does not support saving model topology in binary formats yet.");return this.databaseAction(this.modelPath,t)}async load(){return this.databaseAction(this.modelPath)}databaseAction(t,n){return new Promise((s,r)=>{const o=this.indexedDB.open(Uo,Mo);o.onupgradeneeded=()=>Vo(o),o.onsuccess=()=>{const i=o.result;if(n==null){const a=i.transaction(Ln,"readonly"),c=a.objectStore(Ln).get(this.modelPath);c.onsuccess=()=>{if(c.result==null)return i.close(),r(new Error(`Cannot find model with path '${this.modelPath}' in IndexedDB.`));s(c.result.modelArtifacts)},c.onerror=u=>(i.close(),r(c.error)),a.oncomplete=()=>i.close()}else{const a=nr(n),l=i.transaction(yn,"readwrite");let c=l.objectStore(yn);const u=c.put({modelPath:this.modelPath,modelArtifactsInfo:a});let f;u.onsuccess=()=>{f=i.transaction(Ln,"readwrite");const p=f.objectStore(Ln).put({modelPath:this.modelPath,modelArtifacts:n,modelArtifactsInfo:a});p.onsuccess=()=>s({modelArtifactsInfo:a}),p.onerror=d=>{c=l.objectStore(yn);const y=c.delete(this.modelPath);y.onsuccess=()=>(i.close(),r(p.error)),y.onerror=m=>(i.close(),r(p.error))}},u.onerror=h=>(i.close(),r(u.error)),l.oncomplete=()=>{f==null?i.close():f.oncomplete=()=>i.close()}}},o.onerror=i=>r(o.error)})}}Bn.URL_SCHEME="indexeddb://";const b1=e=>lt().getBool("IS_BROWSER")&&!Array.isArray(e)&&e.startsWith(Bn.URL_SCHEME)?zp(e.slice(Bn.URL_SCHEME.length)):null;xt.registerSaveRouter(b1);xt.registerLoadRouter(b1);function zp(e){return new Bn(e)}function Wp(e){return e.startsWith(Bn.URL_SCHEME)?e.slice(Bn.URL_SCHEME.length):e}class Hp{constructor(){this.indexedDB=y1()}async listModels(){return new Promise((t,n)=>{const s=this.indexedDB.open(Uo,Mo);s.onupgradeneeded=()=>Vo(s),s.onsuccess=()=>{const r=s.result,o=r.transaction(yn,"readonly"),a=o.objectStore(yn).getAll();a.onsuccess=()=>{const l={};for(const c of a.result)l[c.modelPath]=c.modelArtifactsInfo;t(l)},a.onerror=l=>(r.close(),n(a.error)),o.oncomplete=()=>r.close()},s.onerror=r=>n(s.error)})}async removeModel(t){return t=Wp(t),new Promise((n,s)=>{const r=this.indexedDB.open(Uo,Mo);r.onupgradeneeded=()=>Vo(r),r.onsuccess=()=>{const o=r.result,i=o.transaction(yn,"readwrite"),a=i.objectStore(yn),l=a.get(t);let c;l.onsuccess=()=>{if(l.result==null)return o.close(),s(new Error(`Cannot find model with path '${t}' in IndexedDB.`));{const u=a.delete(t),f=()=>{c=o.transaction(Ln,"readwrite");const p=c.objectStore(Ln).delete(t);p.onsuccess=()=>n(l.result.modelArtifactsInfo),p.onerror=d=>s(l.error)};u.onsuccess=f,u.onerror=h=>(f(),o.close(),s(l.error))}},l.onerror=u=>(o.close(),s(l.error)),i.oncomplete=()=>{c==null?o.close():c.oncomplete=()=>o.close()}},r.onerror=o=>s(r.error)})}}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */const sn="/",ss="tensorflowjs_models",_1="info",qp="model_topology",Gp="weight_specs",Kp="weight_data",jp="model_metadata";function w1(e){return{info:[ss,e,_1].join(sn),topology:[ss,e,qp].join(sn),weightSpecs:[ss,e,Gp].join(sn),weightData:[ss,e,Kp].join(sn),modelMetadata:[ss,e,jp].join(sn)}}function N1(e){for(const t of Object.values(e))window.localStorage.removeItem(t)}function Xp(e){const t=e.split(sn);if(t.length<3)throw new Error(`Invalid key format: ${e}`);return t.slice(1,t.length-1).join(sn)}function Yp(e){return e.startsWith(Cn.URL_SCHEME)?e.slice(Cn.URL_SCHEME.length):e}class Cn{constructor(t){if(!lt().getBool("IS_BROWSER")||typeof window>"u"||typeof window.localStorage>"u")throw new Error("The current environment does not support local storage.");if(this.LS=window.localStorage,t==null||!t)throw new Error("For local storage, modelPath must not be null, undefined or empty.");this.modelPath=t,this.keys=w1(this.modelPath)}async save(t){if(t.modelTopology instanceof ArrayBuffer)throw new Error("BrowserLocalStorage.save() does not support saving model topology in binary formats yet.");{const n=JSON.stringify(t.modelTopology),s=JSON.stringify(t.weightSpecs),r=nr(t);try{this.LS.setItem(this.keys.info,JSON.stringify(r)),this.LS.setItem(this.keys.topology,n),this.LS.setItem(this.keys.weightSpecs,s),this.LS.setItem(this.keys.weightData,Rp(t.weightData));const o={format:t.format,generatedBy:t.generatedBy,convertedBy:t.convertedBy,signature:t.signature!=null?t.signature:void 0,userDefinedMetadata:t.userDefinedMetadata!=null?t.userDefinedMetadata:void 0,modelInitializer:t.modelInitializer!=null?t.modelInitializer:void 0,trainingConfig:t.trainingConfig!=null?t.trainingConfig:void 0};return this.LS.setItem(this.keys.modelMetadata,JSON.stringify(o)),{modelArtifactsInfo:r}}catch{throw N1(this.keys),new Error(`Failed to save model '${this.modelPath}' to local storage: size quota being exceeded is a possible cause of this failure: modelTopologyBytes=${r.modelTopologyBytes}, weightSpecsBytes=${r.weightSpecsBytes}, weightDataBytes=${r.weightDataBytes}.`)}}}async load(){const t=JSON.parse(this.LS.getItem(this.keys.info));if(t==null)throw new Error(`In local storage, there is no model with name '${this.modelPath}'`);if(t.modelTopologyType!=="JSON")throw new Error("BrowserLocalStorage does not support loading non-JSON model topology yet.");const n={},s=JSON.parse(this.LS.getItem(this.keys.topology));if(s==null)throw new Error(`In local storage, the topology of model '${this.modelPath}' is missing.`);n.modelTopology=s;const r=JSON.parse(this.LS.getItem(this.keys.weightSpecs));if(r==null)throw new Error(`In local storage, the weight specs of model '${this.modelPath}' are missing.`);n.weightSpecs=r;const o=this.LS.getItem(this.keys.modelMetadata);if(o!=null){const a=JSON.parse(o);n.format=a.format,n.generatedBy=a.generatedBy,n.convertedBy=a.convertedBy,a.signature!=null&&(n.signature=a.signature),a.userDefinedMetadata!=null&&(n.userDefinedMetadata=a.userDefinedMetadata),a.modelInitializer!=null&&(n.modelInitializer=a.modelInitializer),a.trainingConfig!=null&&(n.trainingConfig=a.trainingConfig)}const i=this.LS.getItem(this.keys.weightData);if(i==null)throw new Error(`In local storage, the binary weight values of model '${this.modelPath}' are missing.`);return n.weightData=Op(i),n}}Cn.URL_SCHEME="localstorage://";const I1=e=>lt().getBool("IS_BROWSER")&&!Array.isArray(e)&&e.startsWith(Cn.URL_SCHEME)?Zp(e.slice(Cn.URL_SCHEME.length)):null;xt.registerSaveRouter(I1);xt.registerLoadRouter(I1);function Zp(e){return new Cn(e)}class Jp{constructor(){T(lt().getBool("IS_BROWSER"),()=>"Current environment is not a web browser"),T(typeof window>"u"||typeof window.localStorage<"u",()=>"Current browser does not appear to support localStorage"),this.LS=window.localStorage}async listModels(){const t={},n=ss+sn,s=sn+_1;for(let r=0;r<this.LS.length;++r){const o=this.LS.key(r);if(o.startsWith(n)&&o.endsWith(s)){const i=Xp(o);t[i]=JSON.parse(this.LS.getItem(o))}}return t}async removeModel(t){t=Yp(t);const n=w1(t);if(this.LS.getItem(n.info)==null)throw new Error(`Cannot find model at path '${t}'`);const s=JSON.parse(this.LS.getItem(n.info));return N1(n),s}}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */const as="://";class Jt{constructor(){this.managers={}}static getInstance(){return Jt.instance==null&&(Jt.instance=new Jt),Jt.instance}static registerManager(t,n){T(t!=null,()=>"scheme must not be undefined or null."),t.endsWith(as)&&(t=t.slice(0,t.indexOf(as))),T(t.length>0,()=>"scheme must not be an empty string.");const s=Jt.getInstance();T(s.managers[t]==null,()=>`A model store manager is already registered for scheme '${t}'.`),s.managers[t]=n}static getManager(t){const n=Jt.getInstance().managers[t];if(n==null)throw new Error(`Cannot find model manager for scheme '${t}'`);return n}static getSchemes(){return Object.keys(Jt.getInstance().managers)}}function dr(e){if(e.indexOf(as)===-1)throw new Error(`The url string provided does not contain a scheme. Supported schemes are: ${Jt.getSchemes().join(",")}`);return{scheme:e.split(as)[0],path:e.split(as)[1]}}async function k1(e,t,n=!1){T(e!==t,()=>`Old path and new path are the same: '${e}'`);const s=xt.getLoadHandlers(e);T(s.length>0,()=>`Copying failed because no load handler is found for source URL ${e}.`),T(s.length<2,()=>`Copying failed because more than one (${s.length}) load handlers for source URL ${e}.`);const r=s[0],o=xt.getSaveHandlers(t);T(o.length>0,()=>`Copying failed because no save handler is found for destination URL ${t}.`),T(o.length<2,()=>`Copying failed because more than one (${s.length}) save handlers for destination URL ${t}.`);const i=o[0],a=dr(e).scheme,l=dr(e).path,c=a===dr(e).scheme,u=await r.load();n&&c&&await Jt.getManager(a).removeModel(l);const f=await i.save(u);return n&&!c&&await Jt.getManager(a).removeModel(l),f.modelArtifactsInfo}async function Qp(){const e=Jt.getSchemes(),t={};for(const n of e){const s=await Jt.getManager(n).listModels();for(const r in s){const o=n+as+r;t[o]=s[r]}}return t}async function td(e){const t=dr(e);return Jt.getManager(t.scheme).removeModel(t.path)}async function ed(e,t){return k1(e,t,!1)}async function nd(e,t){return k1(e,t,!0)}/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */class sd{constructor(){this.messageName="setTimeoutCustom",this.functionRefs=[],this.handledMessageCount=0,this.hasEventListener=!1}fetch(t,n){return fetch(t,n)}now(){return performance.now()}encode(t,n){if(n!=="utf-8"&&n!=="utf8")throw new Error(`Browser's encoder only supports utf-8, but got ${n}`);return this.textEncoder==null&&(this.textEncoder=new TextEncoder),this.textEncoder.encode(t)}decode(t,n){return new TextDecoder(n).decode(t)}setTimeoutCustom(t,n){if(!window||!lt().getBool("USE_SETTIMEOUTCUSTOM")){setTimeout(t,n);return}this.functionRefs.push(t),setTimeout(()=>{window.postMessage({name:this.messageName,index:this.functionRefs.length-1},"*")},n),this.hasEventListener||(this.hasEventListener=!0,window.addEventListener("message",s=>{if(s.source===window&&s.data.name===this.messageName){s.stopPropagation();const r=this.functionRefs[s.data.index];r(),this.handledMessageCount++,this.handledMessageCount===this.functionRefs.length&&(this.functionRefs=[],this.handledMessageCount=0)}},!0))}}if(lt().get("IS_BROWSER")){lt().setPlatform("browser",new sd);try{Jt.registerManager(Cn.URL_SCHEME,new Jp)}catch{}try{Jt.registerManager(Bn.URL_SCHEME,new Hp)}catch{}}/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */class rd{constructor(){this.util=require("util"),this.textEncoder=new this.util.TextEncoder}fetch(t,n){return lt().global.fetch(t,n)}now(){const t=process.hrtime();return t[0]*1e3+t[1]/1e6}encode(t,n){if(n!=="utf-8"&&n!=="utf8")throw new Error(`Node built-in encoder only supports utf-8, but got ${n}`);return this.textEncoder.encode(t)}decode(t,n){return t.length===0?"":new this.util.TextDecoder(n).decode(t)}}lt().get("IS_NODE")&&!lt().get("IS_BROWSER")&&lt().setPlatform("node",new rd);/**
 * @license
 * Copyright 2020 Google Inc. All Rights Reserved.
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
 * =============================================================================
 */function at(e,t="float32",n){return t=t||"float32",uc(e),new Ut(e,t,n)}/**
 * @license
 * Copyright 2020 Google Inc. All Rights Reserved.
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
 * =============================================================================
 */function od(e,t){const n=k(e,"x","cast");if(!Lh(t))throw new Error(`Failed to cast to unknown dtype ${t}`);if(t==="string"&&n.dtype!=="string"||t!=="string"&&n.dtype==="string")throw new Error("Only strings can be casted to strings");const s={x:n},r={dtype:t};return R.runKernel(Ti,s,r)}const Mt=v({cast_:od});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function id(e){const n={x:k(e,"x","clone","string_or_numeric")};return R.runKernel(Bi,n)}const wn=v({clone_:id});/**
 * @license
 * Copyright 2020 Google Inc. All Rights Reserved.
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
 * =============================================================================
 */function S1(e,t=!1){console.log(e.toString(t))}/**
 * @license
 * Copyright 2020 Google Inc. All Rights Reserved.
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
 * =============================================================================
 */u1();const ad={buffer:at,cast:Mt,clone:wn,print:S1};Np(ad);/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */const ld="model",cd=".json",ud=".weights.bin";function wl(e){return new Promise(t=>setTimeout(t)).then(e)}class zn{constructor(t){if(!lt().getBool("IS_BROWSER"))throw new Error("browserDownloads() cannot proceed because the current environment is not a browser.");t.startsWith(zn.URL_SCHEME)&&(t=t.slice(zn.URL_SCHEME.length)),(t==null||t.length===0)&&(t=ld),this.modelJsonFileName=t+cd,this.weightDataFileName=t+ud}async save(t){if(typeof document>"u")throw new Error("Browser downloads are not supported in this environment since `document` is not present");const n=window.URL.createObjectURL(new Blob([t.weightData],{type:"application/octet-stream"}));if(t.modelTopology instanceof ArrayBuffer)throw new Error("BrowserDownloads.save() does not support saving model topology in binary formats yet.");{const s=[{paths:["./"+this.weightDataFileName],weights:t.weightSpecs}],r=d1(t,s),o=window.URL.createObjectURL(new Blob([JSON.stringify(r)],{type:"application/json"})),i=this.modelJsonAnchor==null?document.createElement("a"):this.modelJsonAnchor;if(i.download=this.modelJsonFileName,i.href=o,await wl(()=>i.dispatchEvent(new MouseEvent("click"))),t.weightData!=null){const a=this.weightDataAnchor==null?document.createElement("a"):this.weightDataAnchor;a.download=this.weightDataFileName,a.href=n,await wl(()=>a.dispatchEvent(new MouseEvent("click")))}return{modelArtifactsInfo:nr(t)}}}}zn.URL_SCHEME="downloads://";class fd{constructor(t){if(t==null||t.length<1)throw new Error(`When calling browserFiles, at least 1 file is required, but received ${t}`);this.jsonFile=t[0],this.weightsFiles=t.slice(1)}async load(){return new Promise((t,n)=>{const s=new FileReader;s.onload=r=>{const o=JSON.parse(r.target.result),i=o.modelTopology;if(i==null){n(new Error(`modelTopology field is missing from file ${this.jsonFile.name}`));return}if(o.weightsManifest==null){n(new Error(`weightManifest field is missing from file ${this.jsonFile.name}`));return}if(this.weightsFiles.length===0){t({modelTopology:i});return}const l=Ta(o,c=>this.loadWeights(c));t(l)},s.onerror=r=>n(`Failed to read model topology and weights manifest JSON from file '${this.jsonFile.name}'. BrowserFiles supports loading Keras-style tf.Model artifacts only.`),s.readAsText(this.jsonFile)})}loadWeights(t){const n=[],s=[];for(const i of t)n.push(...i.weights),s.push(...i.paths);const r=this.checkManifestAndWeightFiles(t),o=s.map(i=>this.loadWeightsFile(i,r[i]));return Promise.all(o).then(i=>[n,Sa(i)])}loadWeightsFile(t,n){return new Promise((s,r)=>{const o=new FileReader;o.onload=i=>{const a=i.target.result;s(a)},o.onerror=i=>r(`Failed to weights data from file of path '${t}'.`),o.readAsArrayBuffer(n)})}checkManifestAndWeightFiles(t){const n=[],s=this.weightsFiles.map(o=>_l(o.name)),r={};for(const o of t)o.paths.forEach(i=>{const a=_l(i);if(n.indexOf(a)!==-1)throw new Error(`Duplicate file basename found in weights manifest: '${a}'`);if(n.push(a),s.indexOf(a)===-1)throw new Error(`Weight file with basename '${a}' is not provided.`);r[i]=this.weightsFiles[s.indexOf(a)]});if(n.length!==this.weightsFiles.length)throw new Error(`Mismatch in the number of files in weights manifest (${n.length}) and the number of weight files provided (${this.weightsFiles.length}).`);return r}}const hd=e=>lt().getBool("IS_BROWSER")&&!Array.isArray(e)&&e.startsWith(zn.URL_SCHEME)?pd(e.slice(zn.URL_SCHEME.length)):null;xt.registerSaveRouter(hd);function pd(e="model"){return new zn(e)}function dd(e){return new fd(e)}/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function Nl(e,t,n,s){i(e),n=n??0,s=s??1,a(n,s);let r=0;const o=l=>(l.then(c=>{const u=n+ ++r/e.length*(s-n);return t(u),c}),l);function i(l){T(l!=null&&Array.isArray(l)&&l.length>0,()=>"promises must be a none empty array")}function a(l,c){T(l>=0&&l<=1,()=>`Progress fraction must be in range [0, 1], but got startFraction ${l}`),T(c>=0&&c<=1,()=>`Progress fraction must be in range [0, 1], but got endFraction ${c}`),T(c>=l,()=>`startFraction must be no more than endFraction, but got startFraction ${l} and endFraction ${c}`)}return Promise.all(e.map(o))}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */async function T1(e,t){t==null&&(t={});const n=t.fetchFunc==null?lt().platform.fetch:t.fetchFunc,s=e.map(f=>n(f,t.requestInit,{isBinary:!0})),a=(t.onProgress==null?await Promise.all(s):await Nl(s,t.onProgress,0,.5)).map(f=>f.arrayBuffer());return t.onProgress==null?await Promise.all(a):await Nl(a,t.onProgress,.5,1)}async function md(e,t="",n,s){return E1(i=>T1(i,{requestInit:s}))(e,t,n)}function E1(e){return async(t,n="",s)=>{const r=t.map(()=>!1),o={},i=s!=null?s.map(()=>!1):[],a=[];if(t.forEach((p,d)=>{let y=0;p.weights.forEach(m=>{const b="quantization"in m?m.quantization.dtype:m.dtype,_=Po[b]*q(m.shape),w=()=>{r[d]=!0,o[d]==null&&(o[d]=[]),o[d].push({manifestEntry:m,groupOffset:y,sizeBytes:_})};s!=null?s.forEach((N,I)=>{N===m.name&&(w(),i[I]=!0)}):w(),a.push(m.name),y+=_})}),!i.every(p=>p)){const p=s.filter((d,y)=>!i[y]);throw new Error(`Could not find weights in manifest with names: ${p.join(", ")}. 
Manifest JSON has weights with names: ${a.join(", ")}.`)}const l=r.reduce((p,d,y)=>(d&&p.push(y),p),[]),c=[];l.forEach(p=>{t[p].paths.forEach(d=>{const y=n+(n.endsWith("/")?"":"/")+d;c.push(y)})});const u=await e(c),f={};let h=0;return l.forEach(p=>{const d=t[p].paths.length;let y=0;for(let N=0;N<d;N++)y+=u[h+N].byteLength;const m=new ArrayBuffer(y),b=new Uint8Array(m);let _=0;for(let N=0;N<d;N++){const I=new Uint8Array(u[h+N]);b.set(I,_),_+=I.byteLength}o[p].forEach(N=>{const I=m.slice(N.groupOffset,N.groupOffset+N.sizeBytes),S=p1(I,[N.manifestEntry]);for(const E in S)f[E]=S[E]}),h+=d}),f}}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */const gd="application/octet-stream",yd="application/json";class Ea{constructor(t,n){if(this.DEFAULT_METHOD="POST",n==null&&(n={}),this.weightPathPrefix=n.weightPathPrefix,this.onProgress=n.onProgress,this.weightUrlConverter=n.weightUrlConverter,n.fetchFunc!=null?(T(typeof n.fetchFunc=="function",()=>"Must pass a function that matches the signature of `fetch` (see https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)"),this.fetch=n.fetchFunc):this.fetch=lt().platform.fetch,T(t!=null&&t.length>0,()=>"URL path for http must not be null, undefined or empty."),Array.isArray(t)&&T(t.length===2,()=>`URL paths for http must have a length of 2, (actual length is ${t.length}).`),this.path=t,n.requestInit!=null&&n.requestInit.body!=null)throw new Error("requestInit is expected to have no pre-existing body, but has one.");this.requestInit=n.requestInit||{}}async save(t){if(t.modelTopology instanceof ArrayBuffer)throw new Error("BrowserHTTPRequest.save() does not support saving model topology in binary formats yet.");const n=Object.assign({method:this.DEFAULT_METHOD},this.requestInit);n.body=new FormData;const s=[{paths:["./model.weights.bin"],weights:t.weightSpecs}],r=d1(t,s);n.body.append("model.json",new Blob([JSON.stringify(r)],{type:yd}),"model.json"),t.weightData!=null&&n.body.append("model.weights.bin",new Blob([t.weightData],{type:gd}),"model.weights.bin");const o=await this.fetch(this.path,n);if(o.ok)return{modelArtifactsInfo:nr(t),responses:[o]};throw new Error(`BrowserHTTPRequest.save() failed due to HTTP response status ${o.status}.`)}async load(){const t=await this.fetch(this.path,this.requestInit);if(!t.ok)throw new Error(`Request to ${this.path} failed with status code ${t.status}. Please verify this URL points to the model JSON of the model to load.`);let n;try{n=await t.json()}catch{let i=`Failed to parse model JSON of response from ${this.path}.`;throw this.path.endsWith(".pb")?i+=" Your path contains a .pb file extension. Support for .pb models have been removed in TensorFlow.js 1.0 in favor of .json models. You can re-convert your Python TensorFlow model using the TensorFlow.js 1.0 conversion scripts or you can convert your.pb models with the 'pb2json'NPM script in the tensorflow/tfjs-converter repository.":i+=" Please make sure the server is serving valid JSON for this request.",new Error(i)}const s=n.modelTopology,r=n.weightsManifest;if(s==null&&r==null)throw new Error(`The JSON from HTTP path ${this.path} contains neither model topology or manifest for weights.`);return Ta(n,o=>this.loadWeights(o))}async loadWeights(t){const n=Array.isArray(this.path)?this.path[1]:this.path,[s,r]=bd(n),o=this.weightPathPrefix||s,i=g1(t),a=[],l=[];for(const u of t)for(const f of u.paths)this.weightUrlConverter!=null?l.push(this.weightUrlConverter(f)):a.push(o+f+r);this.weightUrlConverter&&a.push(...await Promise.all(l));const c=await T1(a,{requestInit:this.requestInit,fetchFunc:this.fetch,onProgress:this.onProgress});return[i,Sa(c)]}}Ea.URL_SCHEME_REGEX=/^https?:\/\//;function bd(e){const t=e.lastIndexOf("/"),n=e.lastIndexOf("?"),s=e.substring(0,t),r=n>t?e.substring(n):"";return[s+"/",r]}function Bo(e){return e.match(Ea.URL_SCHEME_REGEX)!=null}const v1=(e,t)=>{if(typeof fetch>"u"&&(t==null||t.fetchFunc==null))return null;{let n=!0;if(Array.isArray(e)?n=e.every(s=>Bo(s)):n=Bo(e),n)return va(e,t)}return null};xt.registerSaveRouter(v1);xt.registerLoadRouter(v1);function va(e,t){return new Ea(e,t)}function _d(e,t){return va(e,t)}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */class _o{constructor(t){this.modelArtifacts=t}load(){return this.modelArtifacts}}class x1{constructor(t){this.saveHandler=t}save(t){return this.saveHandler(t)}}class wd{constructor(t){t.load&&(this.load=()=>Promise.resolve(t.load())),t.save&&(this.save=n=>Promise.resolve(t.save(n)))}}function Nd(e,t,n,s){const r=arguments;return new wd($1(...r))}function $1(e,t,n,s){return arguments.length===1?e.modelTopology!=null||e.weightSpecs!=null?new _o(e):(console.warn("Please call tf.io.fromMemory() with only one argument. The argument should be of type ModelArtifacts. The multi-argument signature of tf.io.fromMemory() has been deprecated and will be removed in a future release."),new _o({modelTopology:e})):(console.warn("Please call tf.io.fromMemory() with only one argument. The argument should be of type ModelArtifacts. The multi-argument signature of tf.io.fromMemory() has been deprecated and will be removed in a future release."),new _o({modelTopology:e,weightSpecs:t,weightData:n,trainingConfig:s}))}function Id(e){return new x1(e)}function kd(e){return new x1(e)}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */var A1=Object.freeze({__proto__:null,browserFiles:dd,browserHTTPRequest:_d,concatenateArrayBuffers:Sa,copyModel:ed,decodeWeights:p1,encodeWeights:Ap,fromMemory:Nd,fromMemorySync:$1,getLoadHandlers:Cp,getModelArtifactsForJSON:Ta,getModelArtifactsForJSONSync:m1,getModelArtifactsInfoForJSON:nr,getSaveHandlers:Bp,getWeightSpecs:g1,http:va,isHTTPScheme:Bo,listModels:Qp,loadWeights:md,moveModel:nd,registerLoadRouter:Vp,registerSaveRouter:Mp,removeModel:td,weightsLoaderFactory:E1,withSaveHandler:Id,withSaveHandlerSync:kd});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function Sd(e,t,n=!1,s=!1){let r=k(e,"a","matMul"),o=k(t,"b","matMul");[r,o]=At(r,o);const i={a:r,b:o},a={transposeA:n,transposeB:s};return R.runKernel(Nc,i,a)}const mt=v({matMul_:Sd});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function Td(e,t,n=1,s=0,r="int32"){if(t<2)throw new Error(`Error in oneHot: depth must be >=2, but it is ${t}`);const i={indices:k(e,"indices","oneHot","int32")},a={dtype:r,depth:t,onValue:n,offValue:s};return R.runKernel(mu,i,a)}const Ed=v({oneHot_:Td});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function Il(){return R}function Ee(e,t){return R.tidy(e,t)}function vd(e){l1(e).forEach(n=>n.dispose())}function bn(e){return R.keep(e)}function xd(e){return R.setBackend(e)}function $d(e,t,n=1){return R.registerBackend(e,t,n)}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function Ad(e){const n={input:k(e,"input","imag")};return R.runKernel(Jc,n)}const Jr=v({imag_:Ad});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function Dd(e){const n={x:k(e,"x","neg")};return R.runKernel(uu,n)}const rn=v({neg_:Dd});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function Rd(e){const n={input:k(e,"input","real")};return R.runKernel(ku,n)}const Ys=v({real_:Rd});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function Od(e,t,n){const s=k(e,"x","transpose");if(t==null&&(t=s.shape.map((i,a)=>a).reverse()),T(s.rank===t.length,()=>`Error in transpose: rank of input ${s.rank} must match length of perm ${t}.`),t.forEach(i=>{T(i>=0&&i<s.rank,()=>`All entries in 'perm' must be between 0 and ${s.rank-1} but got ${t}`)}),s.rank<=1)return s.clone();const r={x:s},o={perm:t};return s.dtype==="complex64"?Ee(()=>{let i=Ys(s),a=Jr(s);return i=R.runKernel(hr,{x:i},o),a=R.runKernel(hr,{x:a},o),n&&(a=rn(a)),Nn(i,a)}):R.runKernel(hr,r,o)}const Co=v({transpose_:Od});/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function Tr(e,t){const n=e.length,s=[];for(let r=0;r<n;r++){const o=n-1-r,i=e[o]||1;(t[t.length-1-r]||1)>1&&i===1&&s.unshift(o)}return s}function Ld(e,t){const n=[];for(let s=0;s<t.length;s++){const r=e[e.length-s-1],o=t.length-s-1,i=t[o];(r==null||r===1&&i>1)&&n.unshift(o)}return n}function Dt(e,t){const n=[],s=Math.max(e.length,t.length);for(let r=0;r<s;r++){let o=e[e.length-r-1];o==null&&(o=1);let i=t[t.length-r-1];if(i==null&&(i=1),o===1)n.unshift(i);else if(i===1)n.unshift(o);else if(o!==i){const a=`Operands could not be broadcast together with shapes ${e} and ${t}.`;throw Error(a)}else n.unshift(o)}return n}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function Fd(e,t,n){if(Ss(e),t!=null&&t.length!==3)throw new Error("tensor3d() requires shape to have three numbers");const s=kn(e,n);if(s.length!==3&&s.length!==1)throw new Error("tensor3d() requires values to be number[][][] or flat/TypedArray");if(s.length===1&&t==null)throw new Error("tensor3d() requires shape to be provided when `values` are a flat array");return Sn(e,t,s,n)}function Pd(e,t){const n=e.shape.length,s=t.shape.length;if(n<1)throw new Error(`tf.gatherND() expects the input to be rank 1 or higher, but the rank was ${n}.`);if(s<1)throw new Error(`tf.gatherND() expects the indices to be rank 1 or higher, but the rank was ${s}.`);if(t.dtype!=="int32")throw new Error(`tf.gatherND() expects the indices to be int32 type, but the dtype was ${t.dtype}.`);if(t.shape[s-1]>n)throw new Error(`index innermost dimension length must be <= tensor rank; saw: ${t.shape[s-1]} vs. ${n}`);if(q(e.shape)===0)throw new Error(`Requested more than 0 entries, but input is empty. Input shape: ${e.shape}.`);const r=t.shape,o=r[r.length-1];let i=1;for(let f=0;f<r.length-1;++f)i*=r[f];const a=e.shape,l=r.slice();l.pop();let c=1;for(let f=o;f<n;++f)c*=a[f],l.push(a[f]);const u=[...nt(e.shape).map(f=>f/c),1].slice(0,o);return[l,i,c,u]}function Ud(e,t,n){const s=t.rank>1?t.shape[t.rank-1]:1,r=t.rank>1?t.rank-1:1,o=`Must have updates.shape = indices.shape[:batchDim] + shape[sliceDim:], got updates.shape: ${n.shape}, indices.shape: ${t.shape}, shape: ${e}, sliceDim: ${s}, and batchDim: ${r}.`;if(n.rank<r)throw new Error(o+` update.rank < ${r}. `);if(e.length<s+(n.rank-r))throw new Error(o+` Output shape length < ${s+(n.rank-r)}`);if(n.rank!==r+e.length-s)throw new Error(o+` update.rank != ${r+e.length-s}`);for(let i=0;i<r;++i)if(n.shape[i]!==t.shape[i])throw new Error(o+` updates.shape[${i}] (${n.shape[i]}) != indices.shape[${i}] (${t.shape[i]}).`);for(let i=0;i<n.rank-r;++i)if(n.shape[i+r]!==e[i+s])throw new Error(o+` updates.shape[${i+r}] (${n.shape[i+r]}) != shape[${i+r}] (${e[i+r]})`)}function Md(e,t,n){if(t.rank<1)throw new Error(`tf.scatterND() expects the indices to be rank 1 or higher, but the rank was ${t.rank}.`);if(e.rank<1)throw new Error(`tf.scatterND() expects the updates to be rank 1 or higher, but the rank was ${e.rank}.`);if(t.dtype!=="int32")throw new Error(`The dtype of 'indices' should be int32, but got dtype: ${t.dtype}`);if(n.length<1)throw new Error(`Output rank must be greater or equal to 1, but got shape: ${n}`);if(n.length===0){if(t.size===0)throw new Error(`Indices specified for empty output. indices shape: ${t.shape}`);if(e.size===0)throw new Error(`Updates specified for empty output. updates shape: ${e.shape}`)}Ud(n,t,e)}function D1(e,t,n){const s=t.shape.length,r=s>1?t.shape[s-1]:1,o=n.length;let i=1;for(let f=r;f<o;++f)i*=n[f];const a=r<1?1:r,l=q(t.shape)/a,c=[...nt(n.slice(0,r)),1],u=q(n);return{sliceRank:r,numUpdates:l,sliceSize:i,strides:c,outputSize:u}}/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */const zo=-2,Vd=-1;function Bd(e,t,n){const s=e.shape.length;T(s===t.length,()=>`Error in slice${s}D: Length of begin ${t} must match the rank of the array (${s}).`),T(s===n.length,()=>`Error in slice${s}D: Length of size ${n} must match the rank of the array (${s}).`);for(let r=0;r<s;++r)T(t[r]+n[r]<=e.shape[r],()=>`Error in slice${s}D: begin[${r}] + size[${r}] (${t[r]+n[r]}) would overflow input.shape[${r}] (${e.shape[r]})`)}function Cd(e,t,n){const s=[];for(let r=0;r<e.length;r++)s[r]=Math.ceil((t[r]-e[r])/n[r]);return s}function zd(e,t,n){let s=n.length;for(let r=0;r<n.length;r++)if(n[r]>1){s=r;break}for(let r=s+1;r<n.length;r++)if(t[r]>0||n[r]!==e[r])return!1;return!0}function Wd(e,t){let n=e.length>0?e[e.length-1]:1;for(let s=0;s<e.length-1;s++)n+=e[s]*t[s];return n}function Hd(e,t,n){let s;const r=e.shape.length;typeof t=="number"?s=[t,...new Array(r-1).fill(0)]:t.length<r?s=t.concat(new Array(r-t.length).fill(0)):s=t.slice(),s.forEach(i=>{T(i!==-1,()=>"slice() does not support negative begin indexing.")});let o;return n==null?o=new Array(r).fill(-1):typeof n=="number"?o=[n,...new Array(r-1).fill(-1)]:n.length<r?o=n.concat(new Array(r-n.length).fill(-1)):o=n,o=o.map((i,a)=>i>=0?i:(T(i===-1,()=>`Negative size values should be exactly -1 but got ${i} for the slice() size at index ${a}.`),e.shape[a]-s[a])),[s,o]}function qd(e,t,n,s,r,o,i,a,l){let c;if(s==null?(c=new Array(t.length),c.fill(1)):c=s,i!=null&&i&i-1)throw new Error("Multiple ellipses in slice is not allowed.");let u=!1;const f={dims:c.length,numAddAxisAfterEllipsis:0,begin:t.slice(),end:n.slice(),strides:c.slice(),beginMask:r,endMask:o,ellipsisMask:i,newAxisMask:a,shrinkAxisMask:l};for(let w=0;w<f.dims;w++)u&&1<<w&a&&f.numAddAxisAfterEllipsis++,1<<w&i&&(u=!0);u||(f.ellipsisMask|=1<<f.dims,f.dims++);const h={dims:e.length,beginMask:0,endMask:0,beginValid:!1,endValid:!1};Gd(f,h);let p=!0,d=!0,y=!0;const m=[],b=[];for(let w=0;w<e.length;++w){if(h.strides[w]===0)throw Error(`strides[${w}] must be non-zero`);const N=!!(h.shrinkAxisMask&1<<w),I=e[w];if(I===-1){m.push(N?1:-1);continue}const S=[h.beginMask&1<<w,h.endMask&1<<w],E=[h.strides[w]>0?0:-1,h.strides[w]>0?I:I-1];if(N&&h.strides[w]<=0)throw Error("only stride 1 allowed on non-range indexing.");y=y&&h.strides[w]===1;const D=!!(h.beginMask&1<<w&&h.endMask&1<<w);if(h.beginValid&&h.endValid){if(N){const B=h.begin[w]<0?I+h.begin[w]:h.begin[w];if(h.begin[w]=B,h.end[w]=h.begin[w]+1,B<0||B>=I)throw Error(`slice index ${h.begin[w]} of dimension ${w} out of bounds.`)}else h.begin[w]=kl(h.begin[w],0,h.strides[w],I,S,E),h.end[w]=kl(h.end[w],1,h.strides[w],I,S,E);const M=h.strides[w]===1&&h.begin[w]===0&&h.end[w]===I;p=p&&M,d=d&&(w===0&&h.strides[w]===1||M)}else p=p&&h.strides[w]===1&&D,d=d&&(w===0&&h.strides[w]===1||D);let L,U=!1;if(h.beginValid&&h.endValid?(L=h.end[w]-h.begin[w],U=!0):N?(L=1,U=!0):D&&I>=0&&(h.strides[w]<0?L=-I:L=I,U=!0),U){let M;L===0||L<0!=h.strides[w]<0?M=0:M=Math.trunc(L/h.strides[w])+(L%h.strides[w]!==0?1:0),m.push(M)}else m.push(-1)}for(let w=0;w<h.finalShapeGatherIndices.length;++w){const N=h.finalShapeGatherIndices[w];N>=0?b.push(m[N]):N===zo&&b.push(1)}return{finalShapeSparse:b.filter((w,N)=>h.finalShapeGatherIndices[N]!==zo),finalShape:b,isIdentity:p,sliceDim0:d,isSimpleSlice:y,begin:h.begin,end:h.end,strides:h.strides}}function Gd(e,t){t.beginMask=0,t.endMask=0,t.shrinkAxisMask=0;let n=0;t.beginValid=e.begin!=null,t.endValid=e.end!=null,t.begin=new Array(t.dims),t.end=new Array(t.dims),t.strides=new Array(t.dims),t.finalShapeGatherIndices=[],t.finalShapeGatherIndicesSparse=[],t.inputShapeGatherIndicesSparse=new Array(t.dims);for(let s=0;s<e.dims;s++)if(1<<s&e.ellipsisMask){const r=Math.min(t.dims-(e.dims-s)+1+e.numAddAxisAfterEllipsis,t.dims);for(;n<r;n++)t.begin[n]=0,t.end[n]=0,t.strides[n]=1,t.beginMask|=1<<n,t.endMask|=1<<n,t.finalShapeGatherIndices.push(n),t.finalShapeGatherIndicesSparse.push(-1),t.inputShapeGatherIndicesSparse[n]=s}else if(1<<s&e.newAxisMask)t.finalShapeGatherIndices.push(zo),t.finalShapeGatherIndicesSparse.push(-1);else{if(n===t.begin.length)throw Error(`Index out of range using input dim ${n}; input has only ${t.dims} dims, ${t.begin.length}.`);e.begin!=null&&(t.begin[n]=e.begin[s]),e.end!=null&&(t.end[n]=e.end[s]),t.strides[n]=e.strides[s],e.beginMask&1<<s&&(t.beginMask|=1<<n),e.endMask&1<<s&&(t.endMask|=1<<n),e.shrinkAxisMask&1<<s?(t.finalShapeGatherIndices.push(Vd),t.finalShapeGatherIndicesSparse.push(-1),t.shrinkAxisMask|=1<<n):(t.finalShapeGatherIndices.push(n),t.finalShapeGatherIndicesSparse.push(s)),t.inputShapeGatherIndicesSparse[n]=s,n++}}function kl(e,t,n,s,r,o){if(r[t])return n>0?o[t]:o[t+1&1];{const i=e<0?s+e:e;return i<o[0]?o[0]:i>o[1]?o[1]:i}}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function Kd(e,t){let n=k(e,"a","add"),s=k(t,"b","add");[n,s]=At(n,s);const r={a:n,b:s};return R.runKernel(Yr,r)}const Vt=v({add_:Kd});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function jd(e,t){let n=k(e,"a","floorDiv"),s=k(t,"b","floorDiv");[n,s]=At(n,s);const r={a:n,b:s};return R.runKernel(Ui,r)}const R1=v({floorDiv_:jd});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function Xd(e,t){let n=k(e,"a","div"),s=k(t,"b","div");if([n,s]=At(n,s),n.dtype==="int32"&&s.dtype==="int32")return R1(n,s);const r={a:n,b:s},o={};return R.runKernel(Ai,r,o)}const ee=v({div_:Xd});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function Yd(e,t){let n=k(e,"a","mul"),s=k(t,"b","mul");[n,s]=At(n,s);const r={a:n,b:s};return R.runKernel(ta,r)}const ot=v({mul_:Yd});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function Zd(e){const t=k(e,"x","abs");if(t.dtype==="complex64"){const n={x:t};return R.runKernel(Ec,n)}else{const n={x:t};return R.runKernel(pc,n)}}const _e=v({abs_:Zd});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function Jd(e){const n={x:k(e,"x","acos")};return R.runKernel(bi,n)}const Qd=v({acos_:Jd});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function tm(e){const n={x:k(e,"x","acosh")};return R.runKernel(_i,n)}const em=v({acosh_:tm});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function nm(e){T(Array.isArray(e),()=>"The argument passed to tf.addN() must be a list of tensors"),T(e.length>=1,()=>`Must pass at least one tensor to tf.addN(), but got ${e.length}`);const t=e.map((r,o)=>k(r,`tensors${o}`,"addN")),n=t[0];t.forEach(r=>{if(r.dtype!==n.dtype)throw new Error("All tensors passed to tf.addN() must have the same dtype")}),t.forEach(r=>{if(!Oe(r.shape,n.shape))throw new Error("All tensors passed to tf.addN() must have the same shape")});const s=t;return R.runKernel(dc,s)}const sm=v({addN_:nm});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function rm(e,t=null,n=!1){const r={x:k(e,"x","all","bool")},o={axis:t,keepDims:n};return R.runKernel(mc,r,o)}const om=v({all_:rm});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function im(e,t=null,n=!1){const r={x:k(e,"x","any","bool")},o={axis:t,keepDims:n};return R.runKernel(gc,r,o)}const am=v({any_:im});/**
 * @license
 * Copyright 2020 Google Inc. All Rights Reserved.
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
 * =============================================================================
 */function lm(e,t=0){const s={x:k(e,"x","argMax")},r={axis:t};return R.runKernel(yc,s,r)}const cm=v({argMax_:lm});/**
 * @license
 * Copyright 2020 Google Inc. All Rights Reserved.
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
 * =============================================================================
 */function um(e,t=0){const s={x:k(e,"x","argMin")},r={axis:t};return R.runKernel(bc,s,r)}const fm=v({argMin_:um});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function hm(e){const n={x:k(e,"x","asin")};return R.runKernel(wi,n)}const pm=v({asin_:hm});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function dm(e){const n={x:k(e,"x","asinh")};return R.runKernel(Ni,n)}const mm=v({asinh_:dm});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function gm(e){const n={x:k(e,"x","atan")};return R.runKernel(Ii,n)}const ym=v({atan_:gm});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function bm(e,t){let n=k(e,"a","atan2"),s=k(t,"b","atan2");[n,s]=At(n,s);const r={a:n,b:s};return R.runKernel(Si,r)}const _m=v({atan2_:bm});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function wm(e){const n={x:k(e,"x","atanh")};return R.runKernel(ki,n)}const Nm=v({atanh_:wm});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function xa(e,t,n,s,r="NHWC",o){const i=e[3],a=[...t,i],l=eo(r);return Ke(e,a,n,o,s,null,null,l)}function vs(e,t,n,s,r,o,i="channelsLast"){const[a,l]=Er(t);let c;if(i==="channelsLast")c=[a,l,e[3],e[3]];else if(i==="channelsFirst")c=[a,l,e[1],e[1]];else throw new Error(`Unknown dataFormat ${i}`);return Ke(e,c,n,s,r,o,!1,i)}function Qr(e,t,n,s,r,o,i="NDHWC"){const[a,l,c]=Wo(t);let u,f;if(i==="NDHWC")f="channelsLast",u=[a,l,c,e[4],e[4]];else if(i==="NCDHW")f="channelsFirst",u=[a,l,c,e[1],e[1]];else throw new Error(`Unknown dataFormat ${i}`);return to(e,u,n,s,r,!1,f,o)}function Ke(e,t,n,s,r,o,i=!1,a="channelsLast"){let[l,c,u,f]=[-1,-1,-1,-1];if(a==="channelsLast")[l,c,u,f]=e;else if(a==="channelsFirst")[l,f,c,u]=e;else throw new Error(`Unknown dataFormat ${a}`);const[h,p,,d]=t,[y,m]=Er(n),[b,_]=Er(s),w=ls(h,b),N=ls(p,_),{padInfo:I,outHeight:S,outWidth:E}=Sm(r,c,u,y,m,w,N,o,a),D=i?d*f:d;let L;return a==="channelsFirst"?L=[l,D,S,E]:a==="channelsLast"&&(L=[l,S,E,D]),{batchSize:l,dataFormat:a,inHeight:c,inWidth:u,inChannels:f,outHeight:S,outWidth:E,outChannels:D,padInfo:I,strideHeight:y,strideWidth:m,filterHeight:h,filterWidth:p,effectiveFilterHeight:w,effectiveFilterWidth:N,dilationHeight:b,dilationWidth:_,inShape:e,outShape:L,filterShape:t}}function to(e,t,n,s,r,o=!1,i="channelsLast",a){let[l,c,u,f,h]=[-1,-1,-1,-1,-1];if(i==="channelsLast")[l,c,u,f,h]=e;else if(i==="channelsFirst")[l,h,c,u,f]=e;else throw new Error(`Unknown dataFormat ${i}`);const[p,d,y,,m]=t,[b,_,w]=Wo(n),[N,I,S]=Wo(s),E=ls(p,N),D=ls(d,I),L=ls(y,S),{padInfo:U,outDepth:M,outHeight:B,outWidth:$}=Tm(r,c,u,f,b,_,w,E,D,L,a),x=o?m*h:m;let A;return i==="channelsFirst"?A=[l,x,M,B,$]:i==="channelsLast"&&(A=[l,M,B,$,x]),{batchSize:l,dataFormat:i,inDepth:c,inHeight:u,inWidth:f,inChannels:h,outDepth:M,outHeight:B,outWidth:$,outChannels:x,padInfo:U,strideDepth:b,strideHeight:_,strideWidth:w,filterDepth:p,filterHeight:d,filterWidth:y,effectiveFilterDepth:E,effectiveFilterHeight:D,effectiveFilterWidth:L,dilationDepth:N,dilationHeight:I,dilationWidth:S,inShape:e,outShape:A,filterShape:t}}function Im(e,t,n,s,r){s==null&&(s=O1(e,t,n));const o=e[0],i=e[1],a=Un((o-t+2*s)/n+1,r),l=Un((i-t+2*s)/n+1,r);return[a,l]}function km(e,t,n,s,r,o){r==null&&(r=O1(e,t,s));const i=e[0],a=e[1],l=e[2],c=Un((i-t+2*r)/s+1,o),u=Un((a-t+2*r)/s+1,o),f=Un((l-t+2*r)/s+1,o);return[c,u,f,n]}function O1(e,t,n,s=1){const r=ls(t,s);return Math.floor((e[0]*(n-1)-n+r)/2)}function Er(e){return typeof e=="number"?[e,e,e]:e.length===2?[e[0],e[1],1]:e}function Wo(e){return typeof e=="number"?[e,e,e]:e}function ls(e,t){return t<=1?e:e+(e-1)*(t-1)}function Sm(e,t,n,s,r,o,i,a,l){let c,u,f;if(typeof e=="number"){c={top:e,bottom:e,left:e,right:e,type:e===0?"VALID":"NUMBER"};const p=Im([t,n],o,s,e,a);u=p[0],f=p[1]}else if(e==="same"){u=Math.ceil(t/s),f=Math.ceil(n/r);const h=Math.max(0,(u-1)*s+o-t),p=Math.max(0,(f-1)*r+i-n),d=Math.floor(h/2),y=h-d,m=Math.floor(p/2),b=p-m;c={top:d,bottom:y,left:m,right:b,type:"SAME"}}else if(e==="valid")c={top:0,bottom:0,left:0,right:0,type:"VALID"},u=Math.ceil((t-o+1)/s),f=Math.ceil((n-i+1)/r);else if(typeof e=="object"){const h=l==="channelsLast"?e[1][0]:e[2][0],p=l==="channelsLast"?e[1][1]:e[2][1],d=l==="channelsLast"?e[2][0]:e[3][0],y=l==="channelsLast"?e[2][1]:e[3][1];c={top:h,bottom:p,left:d,right:y,type:h===0&&p===0&&d===0&&y===0?"VALID":"EXPLICIT"},u=Un((t-o+h+p)/s+1,a),f=Un((n-i+d+y)/r+1,a)}else throw Error(`Unknown padding parameter: ${e}`);return{padInfo:c,outHeight:u,outWidth:f}}function Tm(e,t,n,s,r,o,i,a,l,c,u){let f,h,p,d;if(typeof e=="number"){f={top:e,bottom:e,left:e,right:e,front:e,back:e,type:e===0?"VALID":"NUMBER"};const m=km([t,n,s,1],a,1,r,e,u);h=m[0],p=m[1],d=m[2]}else if(e==="same"){h=Math.ceil(t/r),p=Math.ceil(n/o),d=Math.ceil(s/i);const y=(h-1)*r+a-t,m=(p-1)*o+l-n,b=(d-1)*i+c-s,_=Math.floor(y/2),w=y-_,N=Math.floor(m/2),I=m-N,S=Math.floor(b/2),E=b-S;f={top:N,bottom:I,left:S,right:E,front:_,back:w,type:"SAME"}}else if(e==="valid")f={top:0,bottom:0,left:0,right:0,front:0,back:0,type:"VALID"},h=Math.ceil((t-a+1)/r),p=Math.ceil((n-l+1)/o),d=Math.ceil((s-c+1)/i);else throw Error(`Unknown padding parameter: ${e}`);return{padInfo:f,outDepth:h,outHeight:p,outWidth:d}}function Un(e,t){if(!t)return Math.trunc(e);switch(t){case"round":return Math.round(e);case"ceil":return Math.ceil(e);case"floor":return Math.floor(e);default:throw new Error(`Unknown roundingMode ${t}`)}}function vr(e){const[t,n,s]=Er(e);return t===1&&n===1&&s===1}function Fe(e,t){return vr(e)||vr(t)}function eo(e){if(e==="NHWC")return"channelsLast";if(e==="NCHW")return"channelsFirst";throw new Error(`Unknown dataFormat ${e}`)}function Pe(e,t,n){if(n!=null){if(typeof t=="string")throw Error(`Error in ${e}: pad must be an integer when using dimRoundingMode ${n} but got pad ${t}.`);if(typeof t=="number")T(js(t),()=>`Error in ${e}: pad must be an integer when using dimRoundingMode ${n} but got pad ${t}.`);else if(typeof t=="object")t.forEach(s=>{s.forEach(r=>{T(js(r),()=>`Error in ${e}: pad must be an integer when using dimRoundingMode ${n} but got pad ${r}.`)})});else throw Error(`Error in ${e}: Unknown padding parameter: ${t}`)}}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function Em(e,t){const s={x:k(e,"x","reshape","string_or_numeric")},r={shape:t};return R.runKernel(Su,s,r)}const C=v({reshape_:Em});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function vm(e,t,n,s,r){const o=k(e,"x","avgPool","float32"),i=1;T(Fe(n,i),()=>`Error in avgPool: Either strides or dilations must be 1. Got strides ${n} and dilations '${i}'`);let a=o,l=!1;o.rank===3&&(l=!0,a=C(o,[1,o.shape[0],o.shape[1],o.shape[2]])),T(a.rank===4,()=>`Error in avgPool: x must be rank 4 but got rank ${a.rank}.`),Pe("avgPool",s,r);const c={x:a},u={filterSize:t,strides:n,pad:s,dimRoundingMode:r};let f=R.runKernel(_c,c,u);return f=Mt(f,o.dtype),l?C(f,[f.shape[1],f.shape[2],f.shape[3]]):f}const L1=v({avgPool_:vm});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function xm(e,t,n,s,r,o="NDHWC"){const i=k(e,"x","avgPool3d","float32");let a=i,l=!1;i.rank===4&&(l=!0,a=C(i,[1,i.shape[0],i.shape[1],i.shape[2],i.shape[3]])),T(a.rank===5,()=>`Error in avgPool3d: x must be rank 5 but got rank ${a.rank}.`),T(o==="NDHWC",()=>`Error in avgPool3d: Only NDHWC is currently supported, but got dataFormat of ${o}`),Pe("avgPool3d",s,r);const c={x:a},u={filterSize:t,strides:n,pad:s,dimRoundingMode:r,dataFormat:o};let f=R.runKernel(wc,c,u);return f=Mt(f,a.dtype),l?C(f,[f.shape[1],f.shape[2],f.shape[3],f.shape[4]]):f}const $m=v({avgPool3d_:xm});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function Am(e,t=0){T(e.length>=1,()=>"Pass at least one tensor to concat");const n=kr(e,"tensors","concat","string_or_numeric");if(n[0].dtype==="complex64"&&n.forEach(o=>{if(o.dtype!=="complex64")throw new Error(`Cannot concatenate complex64 tensors with a tensor
          with dtype ${o.dtype}. `)}),n.length===1)return wn(n[0]);const s=n,r={axis:t};return R.runKernel(vc,s,r)}const ne=v({concat_:Am});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function Dm(e){const n={x:k(e,"x","sigmoid","float32")};return R.runKernel(ha,n)}const cs=v({sigmoid_:Dm});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function Rm(e,t,n){const s=k(e,"x","slice","string_or_numeric");if(s.rank===0)throw new Error("Slicing scalar is not possible");const r={x:s},o={begin:t,size:n};return R.runKernel(Du,r,o)}const wt=v({slice_:Rm});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function Om(e){const n={x:k(e,"x","tanh","float32")};return R.runKernel(ba,n)}const Ho=v({tanh_:Om});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function Lm(e,t,n,s,r,o){const i=k(e,"forgetBias","basicLSTMCell"),a=k(t,"lstmKernel","basicLSTMCell"),l=k(n,"lstmBias","basicLSTMCell"),c=k(s,"data","basicLSTMCell"),u=k(r,"c","basicLSTMCell"),f=k(o,"h","basicLSTMCell"),h=ne([c,f],1),p=mt(h,a),d=Vt(p,l),y=d.shape[0],m=d.shape[1]/4,b=[y,m],_=wt(d,[0,0],b),w=wt(d,[0,m],b),N=wt(d,[0,m*2],b),I=wt(d,[0,m*3],b),S=Vt(ot(cs(_),Ho(w)),ot(u,cs(Vt(i,N)))),E=ot(Ho(S),cs(I));return[S,E]}const Fm=v({basicLSTMCell_:Lm});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function Pm(e,t,n){const s=k(e,"x","batchToSpaceND"),r=t.reduce((a,l)=>a*l);T(s.rank>=1+t.length,()=>`input rank is ${s.rank} but should be > than blockShape.length ${t.length}`),T(n.length===t.length,()=>`crops.length is ${n.length} but should be equal to blockShape.length  ${t.length}`),T(s.shape[0]%r===0,()=>`input tensor batch is ${s.shape[0]} but is not divisible by the product of the elements of blockShape ${t.join(" * ")} === ${r}`);const o={x:s},i={blockShape:t,crops:n};return R.runKernel(Ic,o,i)}const F1=v({batchToSpaceND_:Pm});function Um(e){let t;return e.rank===0||e.rank===1?t=C(e,[1,1,1,e.size]):e.rank===2?t=C(e,[1,1,e.shape[0],e.shape[1]]):e.rank===3?t=C(e,[1,e.shape[0],e.shape[1],e.shape[2]]):t=e,t}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function Mm(e,t,n,s,r,o){o==null&&(o=.001);const i=k(e,"x","batchNorm"),a=k(t,"mean","batchNorm"),l=k(n,"variance","batchNorm");let c;r!=null&&(c=k(r,"scale","batchNorm"));let u;s!=null&&(u=k(s,"offset","batchNorm")),T(a.rank===l.rank,()=>"Batch normalization gradient requires mean and variance to have equal ranks."),T(u==null||a.rank===u.rank,()=>"Batch normalization gradient requires mean and offset to have equal ranks."),T(c==null||a.rank===c.rank,()=>"Batch normalization gradient requires mean and scale to have equal ranks.");const h={x:Um(i),scale:c,offset:u,mean:a,variance:l},p={varianceEpsilon:o},d=R.runKernel(jc,h,p);return C(d,i.shape)}const no=v({batchNorm_:Mm});function Vm(e,t,n,s,r,o){const i=k(e,"x","batchNorm"),a=k(t,"mean","batchNorm"),l=k(n,"variance","batchNorm");let c;r!=null&&(c=k(r,"scale","batchNorm"));let u;return s!=null&&(u=k(s,"offset","batchNorm")),T(i.rank===2,()=>`Error in batchNorm2D: x must be rank 2 but got rank ${i.rank}.`),T(a.rank===2||a.rank===1,()=>`Error in batchNorm2D: mean must be rank 2 or rank 1 but got rank ${a.rank}.`),T(l.rank===2||l.rank===1,()=>`Error in batchNorm2D: variance must be rank 2 or rank 1 but got rank ${l.rank}.`),c!=null&&T(c.rank===2||c.rank===1,()=>`Error in batchNorm2D: scale must be rank 2 or rank 1 but got rank ${c.rank}.`),u!=null&&T(u.rank===2||u.rank===1,()=>`Error in batchNorm2D: offset must be rank 2 or rank 1 but got rank ${u.rank}.`),no(i,a,l,u,c,o)}const Bm=v({batchNorm2d_:Vm});function Cm(e,t,n,s,r,o){const i=k(e,"x","batchNorm"),a=k(t,"mean","batchNorm"),l=k(n,"variance","batchNorm");let c;r!=null&&(c=k(r,"scale","batchNorm"));let u;return s!=null&&(u=k(s,"offset","batchNorm")),T(i.rank===3,()=>`Error in batchNorm3D: x must be rank 3 but got rank ${i.rank}.`),T(a.rank===3||a.rank===1,()=>`Error in batchNorm3D: mean must be rank 3 or rank 1 but got rank ${a.rank}.`),T(l.rank===3||l.rank===1,()=>`Error in batchNorm3D: variance must be rank 3 or rank 1 but got rank ${l.rank}.`),c!=null&&T(c.rank===3||c.rank===1,()=>`Error in batchNorm3D: scale must be rank 3 or rank 1 but got rank ${c.rank}.`),u!=null&&T(u.rank===3||u.rank===1,()=>`Error in batchNorm3D: offset must be rank 3 or rank 1 but got rank ${u.rank}.`),no(i,a,l,u,c,o)}const zm=v({batchNorm3d_:Cm});function Wm(e,t,n,s,r,o){const i=k(e,"x","batchNorm"),a=k(t,"mean","batchNorm"),l=k(n,"variance","batchNorm");let c;r!=null&&(c=k(r,"scale","batchNorm"));let u;return s!=null&&(u=k(s,"offset","batchNorm")),T(i.rank===4,()=>`Error in batchNorm4D: x must be rank 4 but got rank ${i.rank}.`),T(a.rank===4||a.rank===1,()=>`Error in batchNorm4D: mean must be rank 4 or rank 1 but got rank ${a.rank}.`),T(l.rank===4||l.rank===1,()=>`Error in batchNorm4D: variance must be rank 4 or rank 1 but got rank ${l.rank}.`),c!=null&&T(c.rank===4||c.rank===1,()=>`Error in batchNorm4D: scale must be rank 4 or rank 1 but got rank ${c.rank}.`),u!=null&&T(u.rank===4||u.rank===1,()=>`Error in batchNorm4D: offset must be rank 4 or rank 1 but got rank ${u.rank}.`),no(i,a,l,u,c,o)}const Hm=v({batchNorm4d_:Wm});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function qm(e,t,n){const s=k(e,"x","bincount"),r=k(t,"weights","bincount");T(s.dtype==="int32",()=>`Error in bincount: input dtype must be int32, but got ${s.dtype}`),T(n>=0,()=>`size must be non-negative, but got ${n}.`),T(r.size===s.size||r.size===0,()=>`Error in bincount: weights must have the same size as input or0-length, but got input shape: ${s.shape}, weights shape: ${r.shape}.`);const o={x:s,weights:r},i={size:n};return R.runKernel(kc,o,i)}const P1=v({bincount_:qm});/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function Gm(e,t){const n=k(e,"s0","broadcastArgs","int32"),s=k(t,"s1","broadcastArgs","int32");if(n.rank!==1)throw new Error(`broadcastArgs(): first input must be a vector (rank=1). Has rank ${n.rank}`);if(s.rank!==1)throw new Error(`broadcastArgs(): second input must be a vector (rank=1). Has rank ${s.rank}`);const r={s0:n,s1:s};return R.runKernel(Sc,r)}const Km=v({broadcastArgs_:Gm});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function jm(e,t){let n=k(e,"broadcastTo","x");const s=n.shape;if(t.some(c=>!(c>0)||c%1!==0))throw new Error(`broadcastTo(): Invalid broadcast shape [${t}].`);if(t.length<n.rank)throw new Error(`broadcastTo(): shape.length=${t.length} < input.rank=${n.rank}.`);if(t.length>n.rank){const c=n.shape.slice();for(;c.length<t.length;)c.unshift(1);n=C(n,c)}const r=n.shape,o=Array.from(t);for(let c=t.length-1;c>=0;c--)if(r[c]===t[c])o[c]=1;else if(n.shape[c]!==1)throw new Error(`broadcastTo(): [${s}] cannot be broadcast to [${t}].`);if(o.map((c,u)=>c>1?u:-1).filter(c=>c>=0).length===0)return wn(n);const a={x:n},l={reps:o};return R.runKernel(_a,a,l)}const Ws=v({broadcastTo_:jm});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function Xm(e){const n={x:k(e,"x","ceil","float32")};return R.runKernel(Ei,n)}const Ym=v({ceil_:Xm});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function so(e,t,n){const s={shape:e,value:t,dtype:n};return R.runKernel(Gc,{},s)}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function Zm(e,t,n){const s=k(e,"x","clipByValue");if(T(t<=n,()=>`Error in clip: min (${t}) must be less than or equal to max (${n}).`),t===n)return so(s.shape,t,s.dtype);const r={x:s},o={clipValueMin:t,clipValueMax:n};return R.runKernel(vi,r,o)}const Jm=v({clipByValue_:Zm});function Qm(e){return ne(e,0)}const t0=v({concat1d_:Qm});function e0(e,t){return ne(e,t)}const n0=v({concat2d_:e0});function s0(e,t){return ne(e,t)}const r0=v({concat3d_:s0});function o0(e,t){return ne(e,t)}const i0=v({concat4d_:o0});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function a0(e,t,n,s,r="NHWC",o=[1,1],i){const a=k(e,"x","conv2d","float32"),l=k(t,"filter","conv2d","float32");let c=a,u=!1;a.rank===3&&(u=!0,c=C(a,[1,a.shape[0],a.shape[1],a.shape[2]])),T(c.rank===4,()=>`Error in conv2d: input must be rank 4, but got rank ${c.rank}.`),T(l.rank===4,()=>`Error in conv2d: filter must be rank 4, but got rank ${l.rank}.`),Pe("conv2d",s,i);const f=r==="NHWC"?c.shape[3]:c.shape[1];T(f===l.shape[2],()=>`Error in conv2d: depth of input (${f}) must match input depth for filter ${l.shape[2]}.`),T(Fe(n,o),()=>`Error in conv2D: Either strides or dilations must be 1. Got strides ${n} and dilations '${o}'`);const h={x:c,filter:l},p={strides:n,pad:s,dataFormat:r,dilations:o,dimRoundingMode:i},d=R.runKernel(xc,h,p);return u?C(d,[d.shape[1],d.shape[2],d.shape[3]]):d}const ro=v({conv2d_:a0});function l0(e,t,n,s,r="NWC",o=1,i){const a=k(e,"x","conv1d"),l=k(t,"filter","conv1d");let c=a,u=!1;a.rank===2&&(u=!0,c=C(a,[1,a.shape[0],a.shape[1]])),T(c.rank===3,()=>`Error in conv1d: input must be rank 3, but got rank ${c.rank}.`),T(l.rank===3,()=>`Error in conv1d: filter must be rank 3, but got rank ${l.rank}.`),Pe("conv1d",s,i),T(c.shape[2]===l.shape[1],()=>`Error in conv1d: depth of input (${c.shape[2]}) must match input depth for filter ${l.shape[1]}.`),T(Fe(n,o),()=>`Error in conv1D: Either stride or dilation must be 1. Got stride ${n} and dilation '${o}'`),T(r==="NWC",()=>`Error in conv1d: got dataFormat of ${r} but only NWC is currently supported.`);const f=C(l,[1,l.shape[0],l.shape[1],l.shape[2]]),h=C(c,[c.shape[0],1,c.shape[1],c.shape[2]]),m=ro(h,f,[1,n],s,"NHWC",[1,o],i);return u?C(m,[m.shape[2],m.shape[3]]):C(m,[m.shape[0],m.shape[2],m.shape[3]])}const c0=v({conv1d_:l0});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function u0(e,t,n,s,r,o="NHWC",i){T(e.length===t.rank,()=>`Length of inShape (${e.length}) and rank of dy (${t.rank}) must match`);let a=e,l=t,c=!1;t.rank===3&&(c=!0,l=C(t,[1,t.shape[0],t.shape[1],t.shape[2]]),a=[1,e[0],e[1],e[2]]),T(a.length===4,()=>`Error in conv2dDerInput: inShape must be length 4, but got length ${a.length}.`),T(l.rank===4,()=>`Error in conv2dDerInput: dy must be rank 4, but got rank ${l.rank}`),T(n.rank===4,()=>`Error in conv2dDerInput: filter must be rank 4, but got rank ${n.rank}`);const u=o==="NHWC"?a[3]:a[1],f=o==="NHWC"?l.shape[3]:l.shape[1];T(u===n.shape[2],()=>`Error in conv2dDerInput: depth of input (${u}) must match input depth for filter ${n.shape[2]}.`),T(f===n.shape[3],()=>`Error in conv2dDerInput: depth of output (${f}) must match output depth for filter ${n.shape[3]}.`),Pe("conv2dDerInput",r,i);const h={dy:l,filter:n},p={strides:s,pad:r,dataFormat:o,dimRoundingMode:i,inputShape:a},d=R.runKernel(Ac,h,p);return c?C(d,[d.shape[1],d.shape[2],d.shape[3]]):d}const U1=v({conv2DBackpropInput_:u0});function f0(e,t,n,s,r,o){const i=k(e,"x","conv2dTranspose"),a=k(t,"filter","conv2dTranspose");return U1(n,i,a,s,r,"NHWC",o)}const h0=v({conv2dTranspose_:f0});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function p0(e,t,n,s,r="NDHWC",o=[1,1,1]){const i=k(e,"x","conv3d"),a=k(t,"filter","conv3d");let l=i,c=!1;i.rank===4&&(c=!0,l=C(i,[1,i.shape[0],i.shape[1],i.shape[2],i.shape[3]])),T(l.rank===5,()=>`Error in conv3d: input must be rank 5, but got rank ${l.rank}.`),T(a.rank===5,()=>`Error in conv3d: filter must be rank 5, but got rank ${a.rank}.`),T(l.shape[4]===a.shape[3],()=>`Error in conv3d: depth of input (${l.shape[4]}) must match input depth for filter ${a.shape[3]}.`),T(Fe(n,o),()=>`Error in conv3D: Either strides or dilations must be 1. Got strides ${n} and dilations '${o}'`),T(r==="NDHWC",()=>`Error in conv3d: got dataFormat of ${r} but only NDHWC is currently supported.`);const u={x:l,filter:a},f={strides:n,pad:s,dataFormat:r,dilations:o},h=R.runKernel(Dc,u,f);return c?C(h,[h.shape[1],h.shape[2],h.shape[3],h.shape[4]]):h}const d0=v({conv3d_:p0});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function m0(e,t,n,s,r){T(e.length===t.rank,()=>`Length of inShape (${e.length}) and rank of dy (${t.rank}) must match`);let o=e,i=t,a=!1;t.rank===4&&(a=!0,i=C(t,[1,t.shape[0],t.shape[1],t.shape[2],t.shape[3]]),o=[1,e[0],e[1],e[2],e[3]]);const l=o[4],c=i.shape[4];T(o.length===5,()=>`Error in conv3dDerInput: inShape must be length 5, but got length ${o.length}.`),T(i.rank===5,()=>`Error in conv3dDerInput: dy must be rank 5, but got rank ${i.rank}`),T(n.rank===5,()=>`Error in conv3dDerInput: filter must be rank 5, but got rank ${n.rank}`),T(l===n.shape[3],()=>`Error in conv3dDerInput: depth of input (${l}) must match input depth for filter ${n.shape[3]}.`),T(c===n.shape[4],()=>`Error in conv3dDerInput: depth of output (${c}) must match output depth for filter ${n.shape[4]}.`);const u={dy:i,filter:n},f={pad:r,strides:s,inputShape:o},h=R.runKernel(Rc,u,f);return a?C(h,[h.shape[1],h.shape[2],h.shape[3],h.shape[4]]):h}const g0=v({conv3DBackpropInput_:m0});function y0(e,t,n,s,r){const o=k(e,"x","conv3dTranspose"),i=k(t,"filter","conv3dTranspose");return g0(n,o,i,s,r)}const b0=v({conv3dTranspose_:y0});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function _0(e){const n={x:k(e,"x","cos","float32")};return R.runKernel(xi,n)}const w0=v({cos_:_0});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function N0(e){const n={x:k(e,"x","cosh","float32")};return R.runKernel($i,n)}const I0=v({cosh_:N0});/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function k0(e,t=0,n=!1,s=!1){const o={x:k(e,"x","cumprod")},i={axis:t,exclusive:n,reverse:s};return R.runKernel(Oc,o,i)}const S0=v({cumprod_:k0});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function T0(e,t=0,n=!1,s=!1){const o={x:k(e,"x","cumsum")},i={axis:t,exclusive:n,reverse:s};return R.runKernel(Lc,o,i)}const E0=v({cumsum_:T0});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function v0(e,t,n,s=!1){const r=k(e,"x","denseBincount"),o=k(t,"weights","denseBincount");T(r.dtype==="int32",()=>`Error in denseBincount: input dtype must be int32, but got ${r.dtype}`),T(r.rank<=2,()=>`Error in denseBincount: input must be at most rank 2, but got rank ${r.rank}.`),T(n>=0,()=>`size must be non-negative, but got ${n}.`),T(o.size===r.size||o.size===0,()=>`Error in denseBincount: weights must have the same shape as x or 0-length, but got x shape: ${r.shape}, weights shape: ${o.shape}.`);const i={x:r,weights:o},a={size:n,binaryOutput:s};return R.runKernel(Pc,i,a)}const x0=v({denseBincount_:v0});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function $0(e,t,n="NHWC"){const s=k(e,"x","depthToSpace","float32"),r=n==="NHWC"?s.shape[1]:s.shape[2],o=n==="NHWC"?s.shape[2]:s.shape[3],i=n==="NHWC"?s.shape[3]:s.shape[1];T(t>1,()=>`blockSize should be > 1 for depthToSpace, but was: ${t}`),T(r*t>=0,()=>`Negative dimension size caused by overflow when multiplying
    ${r} and ${t}  for depthToSpace with input shape
    ${s.shape}`),T(o*t>=0,()=>`Negative dimension size caused by overflow when multiplying
    ${o} and ${t} for depthToSpace with input shape
        ${s.shape}`),T(i%(t*t)===0,()=>`Dimension size must be evenly divisible by ${t*t} but is ${i} for depthToSpace with input shape ${s.shape}`);const a={x:s},l={blockSize:t,dataFormat:n};return R.runKernel(Uc,a,l)}const A0=v({depthToSpace_:$0});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function D0(e,t,n,s,r="NHWC",o=[1,1],i){const a=k(e,"x","depthwiseConv2d","float32"),l=k(t,"filter","depthwiseConv2d","float32");let c=a,u=!1;a.rank===3&&(u=!0,c=C(a,[1,a.shape[0],a.shape[1],a.shape[2]])),T(c.rank===4,()=>`Error in depthwiseConv2d: input must be rank 4, but got rank ${c.rank}.`),T(l.rank===4,()=>`Error in depthwiseConv2d: filter must be rank 4, but got rank ${l.rank}.`);const f=r==="NHWC"?c.shape[3]:c.shape[1];T(f===l.shape[2],()=>`Error in depthwiseConv2d: number of input channels (${f}) must match the inChannels dimension in filter ${l.shape[2]}.`),Pe("depthwiseConv2d",s,i);const h={x:c,filter:l},p={strides:n,pad:s,dataFormat:r,dilations:o,dimRoundingMode:i},d=R.runKernel(Mc,h,p);return u?C(d,[d.shape[1],d.shape[2],d.shape[3]]):d}const $a=v({depthwiseConv2d_:D0});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function R0(e){const n={x:k(e,"x","diag")};return R.runKernel(Cc,n)}const O0=v({diag_:R0});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function L0(e,t,n,s,r=[1,1],o="NHWC"){const i=k(e,"x","dilation2d"),a=k(t,"filter","dilation2d");T(i.rank===3||i.rank===4,()=>`Error in dilation2d: input must be rank 3 or 4, but got rank ${i.rank}.`),T(a.rank===3,()=>`Error in dilation2d: filter must be rank 3, but got rank ${a.rank}.`),T(o==="NHWC",()=>`Error in dilation2d: Only NHWC is currently supported, but got dataFormat of ${o}`);let l=i,c=!1;i.rank===3&&(l=C(i,[1,i.shape[0],i.shape[1],i.shape[2]]),c=!0);const u={x:l,filter:a},f={strides:n,pad:s,dilations:r},h=R.runKernel(zc,u,f);return c?C(h,[h.shape[1],h.shape[2],h.shape[3]]):h}const F0=v({dilation2d_:L0});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function P0(e,t){let n=k(e,"a","equal","string_or_numeric"),s=k(t,"b","equal","string_or_numeric");[n,s]=At(n,s),Dt(n.shape,s.shape);const r={a:n,b:s};return R.runKernel(Oi,r)}const M1=v({equal_:P0});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function U0(e,t,n){const s=k(t,"a","where"),r=k(n,"b","where"),o=k(e,"condition","where","bool"),i=Dt(Dt(o.shape,s.shape),r.shape),a=Ws(o,i),l=Ws(s,i),c=Ws(r,i),u={condition:a,t:l,e:c};return R.runKernel(Au,u)}const gs=v({where_:U0});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function M0(e){const n={x:k(e,"x","zerosLike")};return R.runKernel(Yu,n)}const Aa=v({zerosLike_:M0});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function V0(e,t){let n=k(e,"a","div"),s=k(t,"b","div");[n,s]=At(n,s);const r=ee(n,s),o=Aa(r),i=M1(s,o);return gs(i,o,r)}const B0=v({divNoNan_:V0});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function C0(e,t){const n=k(e,"t1","dot"),s=k(t,"t2","dot");T((n.rank===1||n.rank===2)&&(s.rank===1||s.rank===2),()=>`Error in dot: inputs must all be rank 1 or 2, but got ranks ${n.rank} and ${s.rank}.`);const r=n.rank===1?n.size:n.shape[1],o=s.rank===1?s.size:s.shape[0];if(T(r===o,()=>`Error in dot: inner dimensions of inputs must match, but got ${r} and ${o}.`),n.rank===1&&s.rank===1){const i=C(n,[1,-1]),a=C(s,[-1,1]),l=mt(i,a);return C(l,[])}else if(n.rank===1&&s.rank===2){const i=C(n,[1,-1]),a=C(s,[s.shape[0],s.shape[1]]),l=mt(i,a);return C(l,[l.size])}else if(n.rank===2&&s.rank===1){const i=C(s,[-1,1]),a=mt(n,i);return C(a,[a.size])}else{const i=C(s,[s.shape[0],s.shape[1]]);return mt(n,i)}}const z0=v({dot_:C0});/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function W0(e,...t){const n=t.map((r,o)=>k(r,`tensors${o}`,"einsum")),s={equation:e};return R.runKernel(Wc,n,s)}const H0=v({einsum_:W0});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function q0(e){const n={x:k(e,"x","elu","float32")};return R.runKernel(Di,n)}const V1=v({elu_:q0});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function G0(e){let t=k(e,"x","erf");T(t.dtype==="int32"||t.dtype==="float32",()=>"Input dtype must be `int32` or `float32`."),t.dtype==="int32"&&(t=Mt(t,"float32"));const n={x:t};return R.runKernel(Ri,n)}const K0=v({erf_:G0});/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function B1(e,t){for(let n=0;n<e.length;++n)if(e[e.length-n-1]!==t-1-n)return!1;return!0}function j0(e,t,n){const s=e.length+t.length,r=[];let o=0,i=0;for(let a=0;a<s;a++)n.indexOf(a)===-1?r.push(e[o++]):r.push(t[i++]);return r}function cn(e,t){const n=[],s=e.length;for(let o=0;o<s;o++)t.indexOf(o)===-1&&n.push(e[o]);const r=t.map(o=>e[o]);return[n,r]}function Ue(e,t){const n=t.map(s=>1);return j0(e,n,t)}function Zn(e,t,n){T(B1(t,n),()=>`${e} supports only inner-most axes for now. Got axes ${t} and rank-${n} input.`)}function je(e,t){if(B1(e,t))return null;const n=[];for(let s=0;s<t;++s)e.indexOf(s)===-1&&n.push(s);return e.forEach(s=>n.push(s)),n}function C1(e){return e.map((t,n)=>[n,t]).sort((t,n)=>t[1]-n[1]).map(t=>t[0])}function Xe(e,t){const n=[];for(let s=t-e;s<t;++s)n.push(s);return n}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function X0(e,t=null,n=!1){const r={x:k(e,"x","max")},o={reductionIndices:t,keepDims:n};return R.runKernel(nu,r,o)}const us=v({max_:X0});/**
 * @license
 * Copyright 2020 Google Inc. All Rights Reserved.
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
 * =============================================================================
 */function Y0(e,t=null,n=!1){const r={x:k(e,"x","min")},o={axis:t,keepDims:n};return R.runKernel(au,r,o)}const qo=v({min_:Y0});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function Z0(e,t){let n=k(e,"base","pow"),s=k(t,"exp","pow");[n,s]=At(n,s);const r={a:n,b:s};return R.runKernel(na,r)}const Da=v({pow_:Z0});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function ht(e,t){if((He(e)&&t!=="string"||Array.isArray(e))&&t!=="complex64")throw new Error("Error creating a new Scalar: value must be a primitive (number|boolean|string)");if(t==="string"&&He(e)&&!(e instanceof Uint8Array))throw new Error("When making a scalar from encoded string, the value must be `Uint8Array`.");return Sn(e,[],[],t)}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function J0(e){const n={x:k(e,"x","sqrt","float32")};return R.runKernel(da,n)}const Go=v({sqrt_:J0});/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function Q0(e){const t=k(e,"x","square"),n={};return R.runKernel("Square",{x:t},n)}const oo=v({square_:Q0});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function t2(e,t=null,n=!1){let s=k(e,"x","sum");s.dtype==="bool"&&(s=Mt(s,"int32"));const r={x:s},o={axis:t,keepDims:n};return R.runKernel(Ru,r,o)}const St=v({sum_:t2});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function e2(e,t="euclidean",n=null,s=!1){e=k(e,"x","norm");const r=z1(e,t,n);let o=r.shape;if(s){const i=Bt(n,e.shape);o=Ue(r.shape,i)}return C(r,o)}function z1(e,t,n=null){if(e.rank===0)return _e(e);if(e.rank!==1&&n===null)return z1(C(e,[-1]),t,n);if(e.rank===1||typeof n=="number"||Array.isArray(n)&&n.length===1){if(t===1)return St(_e(e),n);if(t===1/0)return us(_e(e),n);if(t===-1/0)return qo(_e(e),n);if(t==="euclidean"||t===2)return Go(St(Da(_e(e),ht(2,"int32")),n));throw new Error(`Error in norm: invalid ord value: ${t}`)}if(Array.isArray(n)&&n.length===2){if(t===1)return us(St(_e(e),n[0]),n[1]-1);if(t===1/0)return us(St(_e(e),n[1]),n[0]);if(t===-1/0)return qo(St(_e(e),n[1]),n[0]);if(t==="fro"||t==="euclidean")return Go(St(oo(e),n));throw new Error(`Error in norm: invalid ord value: ${t}`)}throw new Error(`Error in norm: invalid axis: ${n}`)}const io=v({norm_:e2});/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function n2(e,t=null,n=!1){return io(e,"euclidean",t,n)}const s2=v({euclideanNorm_:n2});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function r2(e){const n={x:k(e,"x","exp")};return R.runKernel(Li,n)}const Wn=v({exp_:r2});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function o2(e,t=0){const n=k(e,"x","expandDims","string_or_numeric");T(t<=n.rank,()=>"Axis must be <= rank of the tensor");const s={input:n},r={dim:t};return R.runKernel(Hc,s,r)}const vn=v({expandDims_:o2});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function i2(e){const n={x:k(e,"x","expm1")};return R.runKernel(Fi,n)}const a2=v({expm1_:i2});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function l2(e,t){const n=k(e,"x","tile","string_or_numeric");T(n.rank===t.length,()=>`Error in transpose: rank of input ${n.rank} must match length of reps ${t}.`);const s={x:n},r={reps:t};return R.runKernel(_a,s,r)}const Hs=v({tile_:l2});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function c2(e,t,n,s="float32"){t==null&&(t=e);const r=at([e,t],s),o=e<=t?e:t;for(let a=0;a<o;++a)r.set(1,a,a);const i=C(r.toTensor(),[e,t]);if(n==null)return i;if(n.length===1)return Hs(vn(i,0),[n[0],1,1]);if(n.length===2)return Hs(vn(vn(i,0),0),[n[0],n[1],1,1]);if(n.length===3)return Hs(vn(vn(vn(i,0),0),0),[n[0],n[1],n[2],1,1]);throw new Error(`eye() currently supports only 1D and 2D batchShapes, but received ${n.length}D.`)}const W1=v({eye_:c2});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function u2(e){const n={x:k(e,"x","floor","float32")};return R.runKernel(Pi,n)}const H1=v({floor_:u2});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function f2(e,t,n=0,s=0){const r=k(e,"x","gather"),o=k(t,"indices","gather","int32"),i={x:r,indices:o},a={axis:n,batchDims:s};return R.runKernel(Xc,i,a)}const q1=v({gather_:f2});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function h2(e,t){let n=k(e,"a","greater","string_or_numeric"),s=k(t,"b","greater","string_or_numeric");[n,s]=At(n,s),Dt(n.shape,s.shape);const r={a:n,b:s};return R.runKernel(Mi,r)}const ao=v({greater_:h2});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function p2(e,t){let n=k(e,"a","greaterEqual","string_or_numeric"),s=k(t,"b","greaterEqual","string_or_numeric");[n,s]=At(n,s),Dt(n.shape,s.shape);const r={a:n,b:s};return R.runKernel(Vi,r)}const G1=v({greaterEqual_:p2});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function d2(e){const n={x:k(e,"x","isFinite")};return R.runKernel(Ci,n)}const m2=v({isFinite_:d2});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function g2(e){const n={x:k(e,"x","isInf")};return R.runKernel(zi,n)}const y2=v({isInf_:g2});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function b2(e){const n={x:k(e,"x","isNaN")};return R.runKernel(Wi,n)}const _2=v({isNaN_:b2});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function w2(e,t=.2){const s={x:k(e,"x","leakyRelu")},r={alpha:t};return R.runKernel(Qc,s,r)}const K1=v({leakyRelu_:w2});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function N2(e,t){let n=k(e,"a","less","string_or_numeric"),s=k(t,"b","less","string_or_numeric");[n,s]=At(n,s),Dt(n.shape,s.shape);const r={a:n,b:s};return R.runKernel(Hi,r)}const I2=v({less_:N2});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function k2(e,t){let n=k(e,"a","lessEqual","string_or_numeric"),s=k(t,"b","lessEqual","string_or_numeric");[n,s]=At(n,s),Dt(n.shape,s.shape);const r={a:n,b:s};return R.runKernel(qi,r)}const Ra=v({lessEqual_:k2});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function S2(e,t,n){if(n<=0)throw new Error("The number of values should be positive.");const s={start:e,stop:t,num:n};return R.runKernel(tu,{},s)}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function T2(e,t=5,n=1,s=1,r=.5){const o=k(e,"x","localResponseNormalization");T(o.rank===4||o.rank===3,()=>`Error in localResponseNormalization: x must be rank 3 or 4 but got
               rank ${o.rank}.`),T(js(t),()=>`Error in localResponseNormalization: depthRadius must be an integer but got depthRadius ${t}.`);let i=o,a=!1;o.rank===3&&(a=!0,i=C(o,[1,o.shape[0],o.shape[1],o.shape[2]]));const l={x:i},c={depthRadius:t,bias:n,alpha:s,beta:r},u=R.runKernel(eu,l,c);return a?C(u,[u.shape[1],u.shape[2],u.shape[3]]):u}const E2=v({localResponseNormalization_:T2});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function v2(e){const n={x:k(e,"x","log","float32")};return R.runKernel(Gi,n)}const Zs=v({log_:v2});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function x2(e){const n={x:k(e,"x","log1p")};return R.runKernel(Ki,n)}const j1=v({log1p_:x2});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function an(e){return R.customGrad(e)}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function $2(e){const n={x:k(e,"x","softplus")};return R.runKernel(pa,n)}const X1=v({softplus_:$2});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function A2(e){const t=k(e,"x","logSigmoid");return an(s=>({value:rn(X1(rn(s))),gradFunc:i=>ot(i,cs(rn(s)))}))(t)}const D2=v({logSigmoid_:A2});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function R2(e,t){let n=k(e,"a","sub"),s=k(t,"b","sub");[n,s]=At(n,s);const r={a:n,b:s};return R.runKernel(ga,r)}const ct=v({sub_:R2});/**
 * @license
 * Copyright 2020 Google Inc. All Rights Reserved.
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
 * =============================================================================
 */function O2(e,t=-1){const n=k(e,"logits","logSoftmax");if(t===-1&&(t=n.rank-1),t!==n.rank-1)throw Error(`Log Softmax along a non-last dimension is not yet supported. Logits was rank ${n.rank} and axis was ${t}`);return an((r,o)=>{const a=us(r,t,!0),l=ct(r,a),c=ct(Mt(l,"float32"),Zs(St(Wn(l),t,!0)));return o([c]),{value:c,gradFunc:(f,h)=>{const[p]=h,d=!0,y=Wn(p);return ct(f,ot(St(f,t,d),y))}}})(n)}const L2=v({logSoftmax_:O2});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function F2(e,t=null,n=!1){const s=k(e,"x","logSumExp"),r=Bt(t,s.shape),o=us(s,r,!0),i=ct(s,o),a=Wn(i),l=St(a,r),c=Zs(l),u=Vt(C(o,c.shape),c);if(n){const f=Ue(u.shape,r);return C(u,f)}return u}const Y1=v({logSumExp_:F2});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function P2(e,t){const n=k(e,"a","logicalAnd","bool"),s=k(t,"b","logicalAnd","bool");Dt(n.shape,s.shape);const r={a:n,b:s};return R.runKernel(ji,r)}const xr=v({logicalAnd_:P2});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function U2(e){const n={x:k(e,"x","logicalNot","bool")};return R.runKernel(Xi,n)}const Z1=v({logicalNot_:U2});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function M2(e,t){const n=k(e,"a","logicalOr","bool"),s=k(t,"b","logicalOr","bool");Dt(n.shape,s.shape);const r={a:n,b:s};return R.runKernel(Yi,r)}const J1=v({logicalOr_:M2});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function V2(e,t){const n=k(e,"a","logicalXor","bool"),s=k(t,"b","logicalXor","bool");return Dt(n.shape,s.shape),xr(J1(e,t),Z1(xr(e,t)))}const B2=v({logicalXor_:V2});/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */const lr=2147483648;function C2(e,t,n="left"){const s=k(e,"sortedSequence","searchSorted"),r=k(t,"values","searchSorted"),o=s.shape[s.shape.length-1],i=r.shape[r.shape.length-1],a=C(s,[-1,o]),l=C(r,[-1,i]);if(a.rank<2)throw new Error("Sorted input argument must be at least 2-dimensional");if(a.shape[0]!==l.shape[0])throw new Error("Leading dimension of 'sortedSequence' and 'values' must match.");if(q(l.shape)>=lr)throw new Error(`values tensor size must less than ${lr}`);if(a.shape[1]>=lr)throw new Error(`trailing dim_size must less than ${lr} for int32 output type, was ${a.shape[1]}`);const c={sortedSequence:a,values:l},u={side:n};return R.runKernel($u,c,u)}const Oa=v({searchSorted_:C2});/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function z2(e,t){return Oa(e,t,"left")}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function W2(e,t,n,s,r){const o=k(e,"x","maxPool"),i=1;let a=o,l=!1;o.rank===3&&(l=!0,a=C(o,[1,o.shape[0],o.shape[1],o.shape[2]])),T(a.rank===4,()=>`Error in maxPool: input must be rank 4 but got rank ${a.rank}.`),T(Fe(n,i),()=>`Error in maxPool: Either strides or dilations must be 1. Got strides ${n} and dilations '${i}'`),Pe("maxPool",s,r);const c={x:a},u={filterSize:t,strides:n,pad:s,dimRoundingMode:r},f=R.runKernel(su,c,u);return l?C(f,[f.shape[1],f.shape[2],f.shape[3]]):f}const Q1=v({maxPool_:W2});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function H2(e,t=[1,1,1],n,s,r,o="NDHWC"){const i=k(e,"x","maxPool3d");let a=i,l=!1;i.rank===4&&(l=!0,a=C(i,[1,i.shape[0],i.shape[1],i.shape[2],i.shape[3]])),T(a.rank===5,()=>`Error in maxPool3d: x must be rank 5 but got rank ${a.rank}.`),T(o==="NDHWC",()=>`Error in maxPool3d: Only NDHWC is currently supported, but got dataFormat of ${o}`),Pe("maxPool3d",s,r);const c={x:a},u={filterSize:t,strides:n,pad:s,dimRoundingMode:r,dataFormat:o},f=R.runKernel(ru,c,u);return l?C(f,[f.shape[1],f.shape[2],f.shape[3],f.shape[4]]):f}const q2=v({maxPool3d_:H2});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function G2(e,t,n,s,r=!1){const i={x:k(e,"x","maxPoolWithArgmax")},a={filterSize:t,strides:n,pad:s,includeBatchInIndex:r},l=R.runKernel(ou,i,a);return{result:l[0],indexes:l[1]}}const K2=v({maxPoolWithArgmax_:G2});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function j2(e,t){let n=k(e,"a","maximum"),s=k(t,"b","maximum");[n,s]=At(n,s),n.dtype==="bool"&&(n=Mt(n,"int32"),s=Mt(s,"int32")),Dt(n.shape,s.shape);const r={a:n,b:s};return R.runKernel(Zi,r)}const X2=v({maximum_:j2});/**
 * @license
 * Copyright 2020 Google Inc. All Rights Reserved.
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
 * =============================================================================
 */function Y2(e,t=null,n=!1){const r={x:k(e,"x","mean")},o={axis:t,keepDims:n};return R.runKernel(iu,r,o)}const $r=v({mean_:Y2});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function ys(e,t="float32"){if(t==="complex64"){const s=ys(e,"float32"),r=ys(e,"float32");return Nn(s,r)}const n=Yt(q(e),t);return R.makeTensor(n,e,t)}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function Fn(e,t="float32"){if(t==="complex64"){const s=Fn(e,"float32"),r=ys(e,"float32");return Nn(s,r)}const n=gi(q(e),t);return R.makeTensor(n,e,t)}/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function Z2(e,t,{indexing:n="xy"}={}){if(n!=="xy"&&n!=="ij")throw new TypeError(`${n} is not a valid third argument to meshgrid`);if(e===void 0)return[];let s=k(e,"x","meshgrid",e instanceof Kt?e.dtype:"float32");if(t===void 0)return[s];let r=k(t,"y","meshgrid",t instanceof Kt?t.dtype:"float32");const o=q(s.shape),i=q(r.shape);return n==="xy"?(s=C(s,[1,-1]),r=C(r,[-1,1]),[mt(Fn([i,1],s.dtype),s),mt(r,Fn([1,o],r.dtype))]):(s=C(s,[-1,1]),r=C(r,[1,-1]),[mt(s,Fn([1,i],s.dtype)),mt(Fn([o,1],r.dtype),r)])}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function J2(e,t){let n=k(e,"a","minimum"),s=k(t,"b","minimum");[n,s]=At(n,s),n.dtype==="bool"&&(n=Mt(n,"int32"),s=Mt(s,"int32")),Dt(n.shape,s.shape);const r={a:n,b:s};return R.runKernel(Ji,r)}const tf=v({minimum_:J2});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function Q2(e,t,n){T(n==="reflect"||n==="symmetric",()=>`Invalid mode. Mode must be either reflect or symmetric. Got ${n}.`);const s=k(e,"x","mirrorPad");if(s.rank===0)throw new Error("mirrorPad(scalar) is not defined. Pass non-scalar to mirrorPad");T(t.length===s.rank,()=>`Padding doesn't match input. Must be ${s.rank}. Got ${t.length}.`);const r=n==="reflect"?1:0;for(let a=0;a<s.rank;a++)T(t[a].length===2,()=>"Invalid number of paddings. Must be length of 2 each."),T(t[a][0]>=0&&t[a][0]<=s.shape[a]-r&&t[a][1]>=0&&t[a][1]<=s.shape[a]-r,()=>`Padding in dimension ${a} cannot be greater than or equal to ${s.shape[a]-r} or less than 0 for input of shape ${s.shape}`);const o={paddings:t,mode:n},i={x:s};return R.runKernel(lu,i,o)}const tg=v({mirrorPad_:Q2});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function eg(e,t){let n=k(e,"a","mod"),s=k(t,"b","mod");[n,s]=At(n,s);const r={a:n,b:s};return R.runKernel(Qi,r)}const ng=v({mod_:eg});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function sg(e,t=null,n=!1){e=k(e,"x","moments");const s=Bt(t,e.shape),r=$r(e,s,n);let o=r.shape;n||(o=Ue(r.shape,s));const i=oo(ct(Mt(e,"float32"),C(r,o))),a=$r(i,s,n);return{mean:r,variance:a}}const rg=v({moments_:sg});function og(e,t,n,s){const r=k(t,"data","multiRNNCell"),o=kr(n,"c","multiRNNCell"),i=kr(s,"h","multiRNNCell");let a=r;const l=[];for(let f=0;f<e.length;f++){const h=e[f](a,o[f],i[f]);l.push(h[0]),l.push(h[1]),a=h[1]}const c=[],u=[];for(let f=0;f<l.length;f+=2)c.push(l[f]),u.push(l[f+1]);return[c,u]}const ig=v({multiRNNCell_:og});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function ag(e,t,n,s=!1){const r=k(e,"logits","multinomial"),o=r.size,i=r.rank;if(o<2)throw new Error(`Error in multinomial: you need at least 2 outcomes, but got ${o}.`);if(i>2)throw new Error(`Rank of probabilities must be 1 or 2, but is ${i}`);n=n||Math.random();const l={logits:i===1?C(r,[1,-1]):r},c={numSamples:t,seed:n,normalized:s},u=R.runKernel(cu,l,c);return i===1?C(u,[u.size]):u}const lg=v({multinomial_:ag});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function cg(e,t){let n=k(e,"a","notEqual","string_or_numeric"),s=k(t,"b","notEqual","string_or_numeric");[n,s]=At(n,s),Dt(n.shape,s.shape);const r={a:n,b:s};return R.runKernel(ea,r)}const ef=v({notEqual_:cg});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function ug(e){const n={x:k(e,"x","onesLike")};return R.runKernel(du,n)}const fg=v({onesLike_:ug});function hg(e,t){const n=k(e,"v1","outerProduct"),s=k(t,"v2","outerProduct");T(n.rank===1&&s.rank===1,()=>`Error in outerProduct: inputs must be rank 1, but got ranks ${n.rank} and ${s.rank}.`);const r=C(n,[-1,1]),o=C(s,[1,-1]);return mt(r,o)}const pg=v({outerProduct_:hg});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function dg(e,t,n=0){const s=k(e,"x","pad");if(s.rank===0)throw new Error("pad(scalar) is not defined. Pass non-scalar to pad");const r={paddings:t,constantValue:n},o={x:s};return R.runKernel(yu,o,r)}const sr=v({pad_:dg});function mg(e,t,n=0){return T(t.length===2,()=>"Invalid number of paddings. Must be length of 2."),sr(e,[t],n)}const gg=v({pad1d_:mg});function yg(e,t,n=0){return T(t.length===2&&t[0].length===2&&t[1].length===2,()=>"Invalid number of paddings. Must be length of 2 each."),sr(e,t,n)}const bg=v({pad2d_:yg});function _g(e,t,n=0){return T(t.length===3&&t[0].length===2&&t[1].length===2&&t[2].length===2,()=>"Invalid number of paddings. Must be length of 2 each."),sr(e,t,n)}const wg=v({pad3d_:_g});function Ng(e,t,n=0){return T(t.length===4&&t[0].length===2&&t[1].length===2&&t[2].length===2&&t[3].length===2,()=>"Invalid number of paddings. Must be length of 2 each."),sr(e,t,n)}const Ig=v({pad4d_:Ng});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function kg(e,t,n){const s=k(e,"x","spaceToBatchND");T(s.rank>=1+t.length,()=>`input rank ${s.rank} should be > than [blockShape] ${t.length}`),T(n.length===t.length,()=>`paddings.shape[0] ${n.length} must be equal to [blockShape] ${t.length}`),T(s.shape.reduce((i,a,l)=>l>0&&l<=t.length?i&&(a+n[l-1][0]+n[l-1][1])%t[l-1]===0:i,!0),()=>`input spatial dimensions ${s.shape.slice(1)} with paddings ${n.toString()} must be divisible by blockShapes ${t.toString()}`);const r={x:s},o={blockShape:t,paddings:n};return R.runKernel(Ou,r,o)}const nf=v({spaceToBatchND_:kg});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function Sg(e,t,n,s,r,o,i){r==null&&(r=[1,1]),o==null&&(o=1),s===0&&(s="valid");const a=k(e,"x","maxPool");let l=a,c=!1;a.rank===3&&(c=!0,l=C(a,[1,a.shape[0],a.shape[1],a.shape[2]])),T(Fe(o,r),()=>`Error in pool: Either strides or dilations must be 1. Got strides ${o} and dilations '${r}'`);const u=vs(l.shape,t,o,r,s),f=[u.dilationHeight,u.dilationWidth];let h;s==="same"?h=Eg([u.filterHeight,u.filterWidth],f):h=[[0,0],[0,0]];const p=f[0]===1&&f[1]===1,[d,y]=Tg([u.inHeight,u.inWidth],f,h),m=p?s:"valid",b=p?l:nf(l,f,d),w=(n==="avg"?()=>L1(b,t,o,m,i):()=>Q1(b,t,o,m,i))(),N=p?w:F1(w,f,y);return c?C(N,[N.shape[1],N.shape[2],N.shape[3]]):N}function Tg(e,t,n){const s=n.map(u=>u[0]),r=n.map(u=>u[1]),o=e.concat(s,r),i=t.map((u,f)=>(u-o[f]%u)%u),a=r.map((u,f)=>u+i[f]),l=t.map((u,f)=>[s[f],a[f]]),c=t.map((u,f)=>[0,i[f]]);return[l,c]}function Eg(e,t){const s=e.map((i,a)=>i+(i-1)*(t[a]-1)).map(i=>i-1),r=s.map(i=>Math.floor(i/2)),o=s.map((i,a)=>i-r[a]);return s.map((i,a)=>[r[a],o[a]])}const vg=v({pool_:Sg});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function xg(e,t){const n=k(e,"x","prelu"),s=k(t,"alpha","prelu"),r={x:n,alpha:s};return R.runKernel(bu,r)}const sf=v({prelu_:xg});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function $g(e,t=null,n=!1){let s=k(e,"x","prod");s.dtype==="bool"&&(s=Mt(s,"int32"));const r={x:s},o={axis:t,keepDims:n};return R.runKernel(_u,r,o)}const Ag=v({prod_:$g});/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function Dg(e,t,n,s){const r=e.map((u,f)=>k(u,`tensors${f}`,"raggedGather","int32")),o=k(t,"paramsDenseValues","raggedGather"),i=k(n,"indices","raggedGather","int32"),a={paramsNestedSplits:r,paramsDenseValues:o,indices:i},l={outputRaggedRank:s},c=R.runKernel(wu,a,l);return{outputNestedSplits:c.slice(0,c.length-1),outputDenseValues:c[c.length-1]}}const Rg=v({raggedGather_:Dg});/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function Og(e,t,n,s,r){const o=k(e,"shape","raggedTensorToTensor","int32"),i=k(t,"values","raggedTensorToTensor"),a=k(n,"defaultValue","raggedTensorToTensor",i.dtype),l=s.map((f,h)=>k(f,`tensors${h}`,"raggedTensorToTensor","int32")),c={shape:o,values:i,defaultValue:a,rowPartitionTensors:l},u={rowPartitionTypes:r};return R.runKernel(Nu,c,u)}const Lg=v({raggedTensorToTensor_:Og});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function Fg(e,t,n){const s=q(e);let r=null;if(n==null||n==="float32")r=new Float32Array(s);else if(n==="int32")r=new Int32Array(s);else if(n==="bool")r=new Uint8Array(s);else throw new Error(`Unknown data type ${n}`);for(let o=0;o<s;o++)r[o]=t();return R.makeTensor(r,e,n)}const Pg=v({rand_:Fg});var rf={exports:{}};(function(e){(function(t,n,s){function r(l){var c=this,u=a();c.next=function(){var f=2091639*c.s0+c.c*23283064365386963e-26;return c.s0=c.s1,c.s1=c.s2,c.s2=f-(c.c=f|0)},c.c=1,c.s0=u(" "),c.s1=u(" "),c.s2=u(" "),c.s0-=u(l),c.s0<0&&(c.s0+=1),c.s1-=u(l),c.s1<0&&(c.s1+=1),c.s2-=u(l),c.s2<0&&(c.s2+=1),u=null}function o(l,c){return c.c=l.c,c.s0=l.s0,c.s1=l.s1,c.s2=l.s2,c}function i(l,c){var u=new r(l),f=c&&c.state,h=u.next;return h.int32=function(){return u.next()*4294967296|0},h.double=function(){return h()+(h()*2097152|0)*11102230246251565e-32},h.quick=h,f&&(typeof f=="object"&&o(f,u),h.state=function(){return o(u,{})}),h}function a(){var l=4022871197,c=function(u){u=String(u);for(var f=0;f<u.length;f++){l+=u.charCodeAt(f);var h=.02519603282416938*l;l=h>>>0,h-=l,h*=l,l=h>>>0,h-=l,l+=h*4294967296}return(l>>>0)*23283064365386963e-26};return c}n&&n.exports?n.exports=i:this.alea=i})(jn,e)})(rf);var Ug=rf.exports,of={exports:{}};(function(e){(function(t,n,s){function r(a){var l=this,c="";l.x=0,l.y=0,l.z=0,l.w=0,l.next=function(){var f=l.x^l.x<<11;return l.x=l.y,l.y=l.z,l.z=l.w,l.w^=l.w>>>19^f^f>>>8},a===(a|0)?l.x=a:c+=a;for(var u=0;u<c.length+64;u++)l.x^=c.charCodeAt(u)|0,l.next()}function o(a,l){return l.x=a.x,l.y=a.y,l.z=a.z,l.w=a.w,l}function i(a,l){var c=new r(a),u=l&&l.state,f=function(){return(c.next()>>>0)/4294967296};return f.double=function(){do var h=c.next()>>>11,p=(c.next()>>>0)/4294967296,d=(h+p)/(1<<21);while(d===0);return d},f.int32=c.next,f.quick=f,u&&(typeof u=="object"&&o(u,c),f.state=function(){return o(c,{})}),f}n&&n.exports?n.exports=i:this.xor128=i})(jn,e)})(of);var Mg=of.exports,af={exports:{}};(function(e){(function(t,n,s){function r(a){var l=this,c="";l.next=function(){var f=l.x^l.x>>>2;return l.x=l.y,l.y=l.z,l.z=l.w,l.w=l.v,(l.d=l.d+362437|0)+(l.v=l.v^l.v<<4^(f^f<<1))|0},l.x=0,l.y=0,l.z=0,l.w=0,l.v=0,a===(a|0)?l.x=a:c+=a;for(var u=0;u<c.length+64;u++)l.x^=c.charCodeAt(u)|0,u==c.length&&(l.d=l.x<<10^l.x>>>4),l.next()}function o(a,l){return l.x=a.x,l.y=a.y,l.z=a.z,l.w=a.w,l.v=a.v,l.d=a.d,l}function i(a,l){var c=new r(a),u=l&&l.state,f=function(){return(c.next()>>>0)/4294967296};return f.double=function(){do var h=c.next()>>>11,p=(c.next()>>>0)/4294967296,d=(h+p)/(1<<21);while(d===0);return d},f.int32=c.next,f.quick=f,u&&(typeof u=="object"&&o(u,c),f.state=function(){return o(c,{})}),f}n&&n.exports?n.exports=i:this.xorwow=i})(jn,e)})(af);var Vg=af.exports,lf={exports:{}};(function(e){(function(t,n,s){function r(a){var l=this;l.next=function(){var u=l.x,f=l.i,h,p;return h=u[f],h^=h>>>7,p=h^h<<24,h=u[f+1&7],p^=h^h>>>10,h=u[f+3&7],p^=h^h>>>3,h=u[f+4&7],p^=h^h<<7,h=u[f+7&7],h=h^h<<13,p^=h^h<<9,u[f]=p,l.i=f+1&7,p};function c(u,f){var h,p=[];if(f===(f|0))p[0]=f;else for(f=""+f,h=0;h<f.length;++h)p[h&7]=p[h&7]<<15^f.charCodeAt(h)+p[h+1&7]<<13;for(;p.length<8;)p.push(0);for(h=0;h<8&&p[h]===0;++h);for(h==8?p[7]=-1:p[h],u.x=p,u.i=0,h=256;h>0;--h)u.next()}c(l,a)}function o(a,l){return l.x=a.x.slice(),l.i=a.i,l}function i(a,l){a==null&&(a=+new Date);var c=new r(a),u=l&&l.state,f=function(){return(c.next()>>>0)/4294967296};return f.double=function(){do var h=c.next()>>>11,p=(c.next()>>>0)/4294967296,d=(h+p)/(1<<21);while(d===0);return d},f.int32=c.next,f.quick=f,u&&(u.x&&o(u,c),f.state=function(){return o(c,{})}),f}n&&n.exports?n.exports=i:this.xorshift7=i})(jn,e)})(lf);var Bg=lf.exports,cf={exports:{}};(function(e){(function(t,n,s){function r(a){var l=this;l.next=function(){var u=l.w,f=l.X,h=l.i,p,d;return l.w=u=u+1640531527|0,d=f[h+34&127],p=f[h=h+1&127],d^=d<<13,p^=p<<17,d^=d>>>15,p^=p>>>12,d=f[h]=d^p,l.i=h,d+(u^u>>>16)|0};function c(u,f){var h,p,d,y,m,b=[],_=128;for(f===(f|0)?(p=f,f=null):(f=f+"\0",p=0,_=Math.max(_,f.length)),d=0,y=-32;y<_;++y)f&&(p^=f.charCodeAt((y+32)%f.length)),y===0&&(m=p),p^=p<<10,p^=p>>>15,p^=p<<4,p^=p>>>13,y>=0&&(m=m+1640531527|0,h=b[y&127]^=p+m,d=h==0?d+1:0);for(d>=128&&(b[(f&&f.length||0)&127]=-1),d=127,y=4*128;y>0;--y)p=b[d+34&127],h=b[d=d+1&127],p^=p<<13,h^=h<<17,p^=p>>>15,h^=h>>>12,b[d]=p^h;u.w=m,u.X=b,u.i=d}c(l,a)}function o(a,l){return l.i=a.i,l.w=a.w,l.X=a.X.slice(),l}function i(a,l){a==null&&(a=+new Date);var c=new r(a),u=l&&l.state,f=function(){return(c.next()>>>0)/4294967296};return f.double=function(){do var h=c.next()>>>11,p=(c.next()>>>0)/4294967296,d=(h+p)/(1<<21);while(d===0);return d},f.int32=c.next,f.quick=f,u&&(u.X&&o(u,c),f.state=function(){return o(c,{})}),f}n&&n.exports?n.exports=i:this.xor4096=i})(jn,e)})(cf);var Cg=cf.exports,uf={exports:{}};(function(e){(function(t,n,s){function r(a){var l=this,c="";l.next=function(){var f=l.b,h=l.c,p=l.d,d=l.a;return f=f<<25^f>>>7^h,h=h-p|0,p=p<<24^p>>>8^d,d=d-f|0,l.b=f=f<<20^f>>>12^h,l.c=h=h-p|0,l.d=p<<16^h>>>16^d,l.a=d-f|0},l.a=0,l.b=0,l.c=-1640531527,l.d=1367130551,a===Math.floor(a)?(l.a=a/4294967296|0,l.b=a|0):c+=a;for(var u=0;u<c.length+20;u++)l.b^=c.charCodeAt(u)|0,l.next()}function o(a,l){return l.a=a.a,l.b=a.b,l.c=a.c,l.d=a.d,l}function i(a,l){var c=new r(a),u=l&&l.state,f=function(){return(c.next()>>>0)/4294967296};return f.double=function(){do var h=c.next()>>>11,p=(c.next()>>>0)/4294967296,d=(h+p)/(1<<21);while(d===0);return d},f.int32=c.next,f.quick=f,u&&(typeof u=="object"&&o(u,c),f.state=function(){return o(c,{})}),f}n&&n.exports?n.exports=i:this.tychei=i})(jn,e)})(uf);var zg=uf.exports,ff={exports:{}},Wg={},Hg=Object.freeze({__proto__:null,default:Wg}),qg=rp(Hg);(function(e){(function(t,n,s){var r=256,o=6,i=52,a="random",l=s.pow(r,o),c=s.pow(2,i),u=c*2,f=r-1,h;function p(N,I,S){var E=[];I=I==!0?{entropy:!0}:I||{};var D=b(m(I.entropy?[N,w(n)]:N??_(),3),E),L=new d(E),U=function(){for(var M=L.g(o),B=l,$=0;M<c;)M=(M+$)*r,B*=r,$=L.g(1);for(;M>=u;)M/=2,B/=2,$>>>=1;return(M+$)/B};return U.int32=function(){return L.g(4)|0},U.quick=function(){return L.g(4)/4294967296},U.double=U,b(w(L.S),n),(I.pass||S||function(M,B,$,x){return x&&(x.S&&y(x,L),M.state=function(){return y(L,{})}),$?(s[a]=M,B):M})(U,D,"global"in I?I.global:this==s,I.state)}function d(N){var I,S=N.length,E=this,D=0,L=E.i=E.j=0,U=E.S=[];for(S||(N=[S++]);D<r;)U[D]=D++;for(D=0;D<r;D++)U[D]=U[L=f&L+N[D%S]+(I=U[D])],U[L]=I;(E.g=function(M){for(var B,$=0,x=E.i,A=E.j,O=E.S;M--;)B=O[x=f&x+1],$=$*r+O[f&(O[x]=O[A=f&A+B])+(O[A]=B)];return E.i=x,E.j=A,$})(r)}function y(N,I){return I.i=N.i,I.j=N.j,I.S=N.S.slice(),I}function m(N,I){var S=[],E=typeof N,D;if(I&&E=="object")for(D in N)try{S.push(m(N[D],I-1))}catch{}return S.length?S:E=="string"?N:N+"\0"}function b(N,I){for(var S=N+"",E,D=0;D<S.length;)I[f&D]=f&(E^=I[f&D]*19)+S.charCodeAt(D++);return w(I)}function _(){try{var N;return h&&(N=h.randomBytes)?N=N(r):(N=new Uint8Array(r),(t.crypto||t.msCrypto).getRandomValues(N)),w(N)}catch{var I=t.navigator,S=I&&I.plugins;return[+new Date,t,S,t.screen,w(n)]}}function w(N){return String.fromCharCode.apply(0,N)}if(b(s.random(),n),e.exports){e.exports=p;try{h=qg}catch{}}else s["seed"+a]=p})(typeof self<"u"?self:jn,[],Math)})(ff);var Gg=ff.exports,Kg=Ug,jg=Mg,Xg=Vg,Yg=Bg,Zg=Cg,Jg=zg,Jn=Gg;Jn.alea=Kg;Jn.xor128=jg;Jn.xorwow=Xg;Jn.xorshift7=Yg;Jn.xor4096=Zg;Jn.tychei=Jg;var lo=Jn;/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */class La{constructor(t,n,s,r,o){this.mean=t,this.stdDev=n,this.dtype=s,this.nextVal=NaN,this.truncated=r,this.truncated&&(this.upper=this.mean+this.stdDev*2,this.lower=this.mean-this.stdDev*2);const i=o||Math.random();this.random=lo.alea(i.toString())}nextValue(){if(!isNaN(this.nextVal)){const r=this.nextVal;return this.nextVal=NaN,r}let t,n,s=!1;for(;!s;){let r,o,i;do r=2*this.random()-1,o=2*this.random()-1,i=r*r+o*o;while(i>=1||i===0);const a=Math.sqrt(-2*Math.log(i)/i);t=this.mean+this.stdDev*r*a,n=this.mean+this.stdDev*o*a,(!this.truncated||this.isValidTruncated(t))&&(s=!0)}return(!this.truncated||this.isValidTruncated(n))&&(this.nextVal=this.convertValue(n)),this.convertValue(t)}convertValue(t){return this.dtype==null||this.dtype==="float32"?t:Math.round(t)}isValidTruncated(t){return t<=this.upper&&t>=this.lower}}class Qg{constructor(t,n,s,r){this.alpha=t,this.beta=1/n,this.dtype=s;const o=r||Math.random();this.randu=lo.alea(o.toString()),this.randn=new La(0,1,s,!1,this.randu()),t<1?this.d=t+2/3:this.d=t-1/3,this.c=1/Math.sqrt(9*this.d)}nextValue(){let t,n,s,r,o,i;for(;;){do r=this.randn.nextValue(),i=1+this.c*r;while(i<=0);if(i*=i*i,t=r*r,n=1-.331*t*t,s=.5*t+this.d*(1-i+Math.log(i)),o=this.randu(),o<n||Math.log(o)<s)break}return i=1/this.beta*this.d*i,this.alpha<1&&(i*=Math.pow(this.randu(),1/this.alpha)),this.convertValue(i)}convertValue(t){return this.dtype==="float32"?t:Math.round(t)}}class t4{constructor(t=0,n=1,s,r){if(this.canReturnFloat=()=>this.dtype==null||this.dtype==="float32",this.min=t,this.range=n-t,this.dtype=s,r==null&&(r=Math.random()),typeof r=="number"&&(r=r.toString()),!this.canReturnFloat()&&this.range<=1)throw new Error(`The difference between ${t} - ${n} <= 1 and dtype is not float`);this.random=lo.alea(r)}convertValue(t){return this.canReturnFloat()?t:Math.round(t)}nextValue(){return this.convertValue(this.min+this.range*this.random())}}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function e4(e,t,n=1,s="float32",r){if(n==null&&(n=1),s==null&&(s="float32"),s!=="float32"&&s!=="int32")throw new Error(`Unsupported data type ${s}`);const o=new Qg(t,n,s,r),i=at(e,s);for(let a=0;a<i.values.length;a++)i.values[a]=o.nextValue();return i.toTensor()}const n4=v({randomGamma_:e4});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function s4(e,t=0,n=1,s,r){if(s!=null&&s==="bool")throw new Error(`Unsupported data type ${s}`);const o=new La(t,n,s,!1,r),i=at(e,s);for(let a=0;a<i.values.length;a++)i.values[a]=o.nextValue();return i.toTensor()}const hf=v({randomNormal_:s4});/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function r4(e,t,n){if(t!=null&&t==="bool")throw new Error(`Unsupported data type ${t}`);return hf(e,0,1,t,n)}const o4=v({randomStandardNormal_:r4});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function i4(e,t=0,n=1,s="float32",r){const o=at(e,s),i=new t4(t,n,null,r);for(let a=0;a<o.values.length;a++)o.values[a]=i.nextValue();return o.toTensor()}const pf=v({randomUniform_:i4});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function Js(e,t,n=1,s="float32"){if(n===0)throw new Error("Cannot have a step of zero");const r={start:e,stop:t,step:n,dtype:s};return R.runKernel(Iu,{},r)}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function a4(e){const n={x:k(e,"x","reciprocal")};return R.runKernel(sa,n)}const l4=v({reciprocal_:a4});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function c4(e){const n={x:k(e,"x","relu")};return R.runKernel(ra,n)}const co=v({relu_:c4});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function u4(e){const n={x:k(e,"x","relu6")};return R.runKernel(oa,n)}const df=v({relu6_:u4});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function f4(e,t){const s={x:k(e,"x","reverse")},r={dims:t};return R.runKernel(vu,s,r)}const Hn=v({reverse_:f4});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function h4(e){const t=k(e,"x","reverse");return T(t.rank===1,()=>`Error in reverse1D: x must be rank 1 but got rank ${t.rank}.`),Hn(t,0)}const p4=v({reverse1d_:h4});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function d4(e,t){const n=k(e,"x","reverse");return T(n.rank===2,()=>`Error in reverse2D: x must be rank 2 but got rank ${n.rank}.`),Hn(n,t)}const m4=v({reverse2d_:d4});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function g4(e,t){const n=k(e,"x","reverse");return T(n.rank===3,()=>`Error in reverse3D: x must be rank 3 but got rank ${n.rank}.`),Hn(n,t)}const y4=v({reverse3d_:g4});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function b4(e,t){const n=k(e,"x","reverse");return T(n.rank===4,()=>`Error in reverse4D: x must be rank 4 but got rank ${n.rank}.`),Hn(n,t)}const _4=v({reverse4d_:b4});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function w4(e){const n={x:k(e,"x","round")};return R.runKernel(ia,n)}const mf=v({round_:w4});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function N4(e){const n={x:k(e,"x","rsqrt","float32")};return R.runKernel(aa,n)}const I4=v({rsqrt_:N4});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function k4(e){const n={x:k(e,"x","selu")};return R.runKernel(la,n)}const S4=v({selu_:k4});function T4(e,t,n,s,r,o=[1,1],i="NHWC"){const a=k(e,"x","separableConv2d"),l=k(t,"depthwiseFilter","separableConv2d"),c=k(n,"pointwiseFilter","separableConv2d");let u=a,f=!1;if(a.rank===3&&(f=!0,u=C(a,[1,a.shape[0],a.shape[1],a.shape[2]])),i==="NCHW")throw new Error("separableConv2d currently does not support dataFormat NCHW; only NHWC is supported");T(u.rank===4,()=>`Error in separableConv2d: input must be rank 4, but got rank ${u.rank}.`),T(l.rank===4,()=>`Error in separableConv2d: depthwise filter must be rank 4, but got rank ${l.rank}.`),T(c.rank===4,()=>`Error in separableConv2d: pointwise filter must be rank 4, but got rank ${l.rank}.`),T(c.shape[0]===1,()=>`Error in separableConv2d: the first dimension of pointwise filter  must be 1, but got ${c.shape[0]}.`),T(c.shape[1]===1,()=>`Error in separableConv2d: the second dimension of pointwise filter must be 1, but got ${c.shape[1]}.`);const h=l.shape[2],p=l.shape[3];T(c.shape[2]===h*p,()=>`Error in separableConv2d: the third dimension of pointwise filter must be ${h*p}, but got ${c.shape[2]}.`);const d=$a(u,l,s,r,i,o),m=ro(d,c,1,"valid",i);return f?C(m,[m.shape[1],m.shape[2],m.shape[3]]):m}const E4=v({separableConv2d_:T4});/**
 * @license
 * Copyright 2020 Google Inc. All Rights Reserved.
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
 * =============================================================================
 */async function v4(e,t){const n=k(e,"x","setdiff1d"),s=k(t,"y","setdiff1d");T(n.dtype===s.dtype,()=>`x and y should have the same dtype, but got x (${n.dtype}) and y (${s.dtype}).`),T(n.rank===1,()=>`x should be 1D tensor, but got x (${n.shape}).`),T(s.rank===1,()=>`y should be 1D tensor, but got y (${s.shape}).`);const r=await n.data(),o=await s.data(),i=new Set(o);let a=0;for(let u=0;u<r.length;u++)i.has(r[u])||a++;const l=new Ut([a],n.dtype),c=new Ut([a],"int32");for(let u=0,f=0;u<r.length;u++)i.has(r[u])||(l.values[f]=r[u],c.values[f]=u,f++);return[l.toTensor(),c.toTensor()]}const x4=v4;/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function $4(e){const n={x:k(e,"x","sign")};return R.runKernel(fa,n)}const A4=v({sign_:$4});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function D4(e){const n={x:k(e,"x","sin","float32")};return R.runKernel(ca,n)}const R4=v({sin_:D4});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function O4(e){const n={x:k(e,"x","sinh")};return R.runKernel(ua,n)}const L4=v({sinh_:O4});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function F4(e,t,n){const s=k(e,"x","slice1d");return T(s.rank===1,()=>`slice1d expects a rank-1 tensor, but got a rank-${s.rank} tensor`),wt(s,[t],[n])}const P4=v({slice1d_:F4});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function U4(e,t,n){const s=k(e,"x","slice2d");return T(s.rank===2,()=>`slice2d expects a rank-2 tensor, but got a rank-${s.rank} tensor`),wt(s,t,n)}const M4=v({slice2d_:U4});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function V4(e,t,n){const s=k(e,"x","slice3d");return T(s.rank===3,()=>`slice3d expects a rank-3 tensor, but got a rank-${s.rank} tensor`),wt(s,t,n)}const B4=v({slice3d_:V4});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function C4(e,t,n){const s=k(e,"x","slice4d");return T(s.rank===4,()=>`slice4d expects a rank-4 tensor, but got a rank-${s.rank} tensor`),wt(s,t,n)}const z4=v({slice4d_:C4});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function W4(e,t=-1){const n=k(e,"logits","softmax","float32");if(t===-1&&(t=n.rank-1),t!==n.rank-1)throw Error(`Softmax along a non-last dimension is not yet supported. Logits was rank ${n.rank} and dim was ${t}`);const s={logits:n},r={dim:t};return R.runKernel(Fu,s,r)}const H4=v({softmax_:W4});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function q4(e){T(e.dtype==="complex64",()=>`The dtype for tf.spectral.fft() must be complex64 but got ${e.dtype}.`);const t={input:e};return R.runKernel(qc,t)}const Fa=v({fft_:q4});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function G4(e){T(e.dtype==="complex64",()=>`The dtype for tf.spectral.ifft() must be complex64 but got ${e.dtype}.`);const t={input:e};return R.runKernel(Zc,t)}const Ar=v({ifft_:G4});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function K4(e){const t=e.shape[e.shape.length-1],n=e.size/t;let s;if(t<=2){const r=C(e,[n,t]);s=Ar(r)}else{const r=[n,2*(t-1)],o=C(Ys(e),[n,t]),i=C(Jr(e),[n,t]),a=Hn(wt(o,[0,1],[n,t-2]),1),l=ot(Hn(wt(i,[0,1],[n,t-2]),1),ht(-1)),c=ne([o,a],1),u=ne([i,l],1),f=C(Nn(c,u),[r[0],r[1]]);s=Ar(f)}if(s=Ys(s),e.rank===3&&e.shape[0]!==0){const r=s,o=e.shape[0];s=C(s,[o,s.shape[0]/o,s.shape[1]]),r.dispose()}return s}const gf=v({irfft_:K4});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function j4(e,t,n=0){const r={x:k(e,"x","split")},o={numOrSizeSplits:t,axis:n};return R.runKernel(Lu,r,o)}const Qs=v({split_:j4});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function X4(e,t){T(e.dtype==="float32",()=>`The dtype for rfft() must be real value but got ${e.dtype}`);let n=e.shape[e.shape.length-1];const s=e.size/n;let r;if(t!=null&&t<n){const d=e.shape.map(m=>0),y=e.shape.map(m=>m);y[e.shape.length-1]=t,r=wt(e,d,y),n=t}else if(t!=null&&t>n){const d=e.shape.map(y=>y);d[e.shape.length-1]=t-n,r=ne([e,ys(d)],e.shape.length-1),n=t}else r=e;const o=Aa(r),i=C(Nn(r,o),[s,n]),a=Fa(i),l=Math.floor(n/2)+1,c=Ys(a),u=Jr(a),f=Qs(c,[l,n-l],c.shape.length-1),h=Qs(u,[l,n-l],u.shape.length-1),p=r.shape.slice();return p[r.shape.length-1]=l,C(Nn(f[0],h[0]),p)}const Pa=v({rfft_:X4});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function Y4(e,t){let n=k(e,"a","squaredDifference"),s=k(t,"b","squaredDifference");[n,s]=At(n,s),Dt(n.shape,s.shape);const r={a:n,b:s},o={};return R.runKernel(ma,r,o)}const yf=v({squaredDifference_:Y4});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function Z4(e,t){const n=k(e,"x","squeeze","string_or_numeric");return C(n,Rh(n.shape,t).newShape)}const Ua=v({squeeze_:Z4});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function J4(e,t=0){const n=kr(e,"tensors","stack","string_or_numeric");T(n.length>=1,()=>"Pass at least one tensor to tf.stack"),n.length>0&&T(t<=n[0].rank,()=>"Axis must be <= rank of the tensor");const s=n,r={axis:t};return R.runKernel(gu,s,r)}const ln=v({stack_:J4});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function Q4(e,t=0){const s={x:k(e,"x","step")},r={alpha:t};return R.runKernel(wa,s,r)}const bf=v({step_:Q4});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function t5(e,t,n,s,r=0,o=0,i=0,a=0,l=0){const u={x:k(e,"x","stridedSlice","string_or_numeric")},f={begin:t,end:n,strides:s,beginMask:r,endMask:o,ellipsisMask:i,newAxisMask:a,shrinkAxisMask:l};return R.runKernel(Cu,u,f)}const e5=v({stridedSlice_:t5});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function n5(e){const n={x:k(e,"x","tan","float32")};return R.runKernel(ya,n)}const s5=v({tan_:n5});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function De(e,t){Ss(e);const n=kn(e,t);if(n.length!==1)throw new Error("tensor1d() requires values to be a flat/TypedArray");return Sn(e,null,n,t)}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function qs(e,t,n){if(Ss(e),t!=null&&t.length!==2)throw new Error("tensor2d() requires shape to have two numbers");const s=kn(e,n);if(s.length!==2&&s.length!==1)throw new Error("tensor2d() requires values to be number[][] or flat/TypedArray");if(s.length===1&&t==null)throw new Error("tensor2d() requires shape to be provided when `values` are a flat/TypedArray");return Sn(e,t,s,n)}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function r5(e,t,n){if(Ss(e),t!=null&&t.length!==4)throw new Error("tensor4d() requires shape to have four numbers");const s=kn(e,n);if(s.length!==4&&s.length!==1)throw new Error("tensor4d() requires values to be number[][][][] or flat/TypedArray");if(s.length===1&&t==null)throw new Error("tensor4d() requires shape to be provided when `values` are a flat array");return Sn(e,t,s,n)}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function o5(e,t,n){if(Ss(e),t!=null&&t.length!==5)throw new Error("tensor5d() requires shape to have five numbers");const s=kn(e,n);if(s.length!==5&&s.length!==1)throw new Error("tensor5d() requires values to be number[][][][][] or flat/TypedArray");if(s.length===1&&t==null)throw new Error("tensor5d() requires shape to be provided when `values` are a flat array");return Sn(e,t,s,n)}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function i5(e,t,n){if(Ss(e),t!=null&&t.length!==6)throw new Error("tensor6d() requires shape to have six numbers");const s=kn(e,n);if(s.length!==6&&s.length!==1)throw new Error("tensor6d() requires values to be number[][][][][][] or flat/TypedArray");if(s.length===1&&t==null)throw new Error("tensor6d() requires shape to be provided when `values` are a flat array");return t=t||s,Sn(e,t,s,n)}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function a5(e,t=1,n=!0){const s=k(e,"x","topk");if(s.rank===0)throw new Error("topk() expects the input to be of rank 1 or higher");const r=s.shape[s.shape.length-1];if(t<0)throw new Error(`'k' passed to topk() must be >= 0 but got ${t}`);if(t>r)throw new Error(`'k' passed to topk() must be <= the last dimension (${r}) but got ${t}`);const o={x:s},i={k:t,sorted:n},[a,l]=R.runKernel(qu,o,i);return{values:a,indices:l}}const l5=v({topk_:a5});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function c5(e,t=0,n=1,s,r){if(s!=null&&s==="bool")throw new Error("Unsupported data type $ { dtype }");const o=new La(t,n,s,!0,r),i=at(e,s);for(let a=0;a<i.values.length;a++)i.values[a]=o.nextValue();return i.toTensor()}const u5=v({truncatedNormal_:c5});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function f5(e,t=0){const n=k(e,"x","unique","string_or_numeric");T(n.rank>0,()=>"The input tensor must be at least 1D");const s={x:n},r={axis:t},[o,i]=R.runKernel(Ku,s,r);return{values:o,indices:i}}const h5=v({unique_:f5});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function p5(e,t,n){const s=k(e,"x","unsortedSegmentSum"),r=k(t,"segmentIds","unsortedSegmentSum","int32");T(js(n),()=>"numSegments must be of dtype int");const o={x:s,segmentIds:r},i={numSegments:n};return R.runKernel(Xu,o,i)}const d5=v({unsortedSegmentSum_:p5});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function m5(e,t=0){const n=k(e,"x","unstack","string_or_numeric");T(t>=-n.shape.length&&t<n.shape.length,()=>`Axis = ${t} is not in [-${n.shape.length}, ${n.shape.length})`);const s={value:n},r={axis:t};return R.runKernel(ju,s,r)}const Qn=v({unstack_:m5});/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function g5(e,t){return Oa(e,t,"right")}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function y5(e,t=!0,n,s){return R.makeVariable(e,t,n,s)}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function _f(e,t){const n=[];for(let o=0;o<t.length;o++)t[o]&&n.push(o);const s=at(e,"int32"),r=at([n.length,e.length],"int32");for(let o=0;o<n.length;o++){const i=s.indexToLoc(n[o]),a=o*e.length;r.values.set(i,a)}return r.toTensor()}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */async function b5(e){const t=k(e,"condition","whereAsync","bool"),n=await t.data(),s=_f(t.shape,n);return e!==t&&t.dispose(),s}const wf=b5;/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */async function _5(e,t,n){const s=k(e,"tensor","boolMask"),r=k(t,"mask","boolMask","bool"),o=n??0,i=r.rank,a=s.shape;T(i>0,()=>"mask cannot be scalar"),ge(a.slice(o,o+i),r.shape,"mask's shape must match the first K dimensions of tensor's shape,");let l=1;for(let y=o;y<o+i;y++)l*=a[y];const c=a.slice(0,o).concat([l],a.slice(o+i)),u=C(s,c),f=C(r,[-1]),h=await wf(f),p=Ua(h,[1]),d=q1(u,p,o);return e!==s&&s.dispose(),t!==r&&r.dispose(),p.dispose(),u.dispose(),f.dispose(),h.dispose(),d}const w5=_5;/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function N5(e,t,n,s,r=!0){const o=k(e,"v","movingAverage"),i=k(t,"x","movingAverage"),a=k(n,"decay","movingAverage");Sp(o,i),T(Oe(o.shape,i.shape),()=>"Shape mismatch in v and x");const l=ht(1),c=ct(l,a);let u=ot(ct(i,o),c);if(r){T(s!=null,()=>"When using zeroDebias: true, step is required.");const f=k(s,"step","movingAverage");u=ee(u,ct(l,Da(a,f)))}return Vt(o,u)}const I5=v({movingAverage_:N5});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function k5(e,t,n){const s=k(e,"indices","scatterND","int32"),r=k(t,"updates","scatterND");Md(r,s,n);const o={indices:s,updates:r},i={shape:n};return R.runKernel(xu,o,i)}const S5=v({scatterND_:k5});function T5(e,t,n,s){if(e.dtype!=="int32")throw new Error(`tf.sparseToDense() expects the indices to be int32 type, but the dtype was ${e.dtype}.`);if(e.rank>2)throw new Error(`sparseIndices should be a scalar, vector, or matrix, but got shape ${e.shape}.`);const r=e.rank>0?e.shape[0]:1,o=e.rank>1?e.shape[1]:1;if(n.length!==o)throw new Error(`outputShape has incorrect number of elements:, ${n.length}, should be: ${o}.`);const i=t.size;if(!(t.rank===0||t.rank===1&&i===r))throw new Error(`sparseValues has incorrect shape ${t.shape}, should be [] or [${r}]`);if(t.dtype!==s.dtype)throw new Error("sparseValues.dtype must match defaultValues.dtype")}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function E5(e,t,n,s=0){const r=k(e,"sparseIndices","sparseToDense","int32"),o=k(t,"sparseValues","sparseToDense","string_or_numeric"),i=k(s,"defaultValue","sparseToDense",o.dtype);T5(r,o,n,i);const a={sparseIndices:r,sparseValues:o,defaultValue:i},l={outputShape:n};return R.runKernel(Bu,a,l)}const v5=v({sparseToDense_:E5});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function x5(e,t){const n=k(t,"indices","gatherND","int32"),r={params:k(e,"x","gatherND","string_or_numeric"),indices:n};return R.runKernel(Yc,r)}const $5=v({gatherND_:x5});/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function A5(e,t){if(t==null)return e.shape.slice();if(Oe(e.shape,t))return t;if(e.shape.length===t.length){const n=[];for(let s=0;s<e.shape.length;s++)t[s]==null&&e.shape[s]!=null?n.push(e.shape[s]):n.push(t[s]);return n}return t}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function D5(e,t,n,s){const r=k(e,"x","dropout");if(T(r.dtype==="float32",()=>`x has to be a floating point tensor since it's going to be scaled, but got a ${r.dtype} tensor instead.`),T(t>=0&&t<1,()=>`rate must be a float in the range [0, 1), but got ${t}.`),t===0)return e instanceof Kt?r.clone():r;const o=A5(r,n),i=1-t,a=ee(H1(Vt(pf(o,0,1,"float32",s),i)),i);return ot(r,a)}const R5=v({dropout_:D5});/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function Nf(e){return Math.floor(Math.pow(2,Math.ceil(Math.log(e)/Math.log(2))))}function Ma(e,t,n){const s=1-e%2,r=new Float32Array(e);for(let o=0;o<e;++o){const i=2*Math.PI*o/(e+s-1);r[o]=t-n*Math.cos(i)}return De(r,"float32")}/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */async function O5(e,t,n=1){const s=k(e,"predictions","inTopK"),r=k(t,"targets","inTopK");T(s.rank>1,()=>`inTopK() expects the predictions to be of rank 2 or higher, but got ${s.rank}`),T(s.rank-1===r.rank,()=>`predictions rank should be 1 larger than targets rank, but got predictions rank ${s.rank} and targets rank ${r.rank}`),ge(s.shape.slice(0,s.shape.length-1),r.shape,"predictions's shape should be align with the targets' shape, except the last dimension.");const o=s.shape[s.shape.length-1];T(n>0&&n<=o,()=>`'k' passed to inTopK() must be > 0 && <= the predictions last dimension (${o}), but got ${n}`);const i=await s.data(),a=await r.data(),[l,c]=[i.length/o,o],u=Xt("bool",l);for(let f=0;f<l;f++){const h=f*c,p=i.subarray(h,h+c),d=[];for(let y=0;y<p.length;y++)d.push({value:p[y],index:y});d.sort((y,m)=>m.value-y.value),u[f]=0;for(let y=0;y<n;y++)if(d[y].index===a[f]){u[f]=1;break}}return e!==s&&s.dispose(),t!==r&&r.dispose(),Re(u,r.shape,"bool")}const L5=O5;/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function F5(e,t,n,s,r,o="NHWC",i){let a=e;e.rank===3&&(a=C(e,[1,e.shape[0],e.shape[1],e.shape[2]]));let l=t;l.rank===3&&(l=C(t,[1,t.shape[0],t.shape[1],t.shape[2]])),T(a.rank===4,()=>`Error in conv2dDerFilter: input must be rank 4, but got shape ${a.shape}.`),T(l.rank===4,()=>`Error in conv2dDerFilter: dy must be rank 4, but got shape ${l.shape}.`),T(n.length===4,()=>`Error in conv2dDerFilter: filterShape must be length 4, but got ${n}.`);const c=o==="NHWC"?a.shape[3]:a.shape[1],u=o==="NHWC"?l.shape[3]:l.shape[1];T(c===n[2],()=>`Error in conv2dDerFilter: depth of input ${c}) must match input depth in filter (${n[2]}.`),T(u===n[3],()=>`Error in conv2dDerFilter: depth of dy (${u}) must match output depth for filter (${n[3]}).`),Pe("conv2dDerFilter",r,i);const f={x:a,dy:l},h={strides:s,pad:r,dataFormat:o,dimRoundingMode:i,filterShape:n};return R.runKernel($c,f,h)}const P5=v({conv2DBackpropFilter_:F5});/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function Va(e,t,n){if(n==null||n==="linear")return e;if(n==="relu")return ot(e,bf(t));throw new Error(`Cannot compute gradient for fused activation ${n}.`)}function Ba(e,t){let n=t;const s=Ld(e.shape,t.shape);return s.length>0&&(n=St(n,s)),C(n,e.shape)}function Ca(e,t,n,s){if(t==="linear")return e;if(t==="relu")return co(e);if(t==="elu")return V1(e);if(t==="relu6")return df(e);if(t==="prelu")return sf(e,n);if(t==="leakyrelu")return K1(e,s);if(t==="sigmoid")return cs(e);throw new Error(`Unknown fused activation ${t}.`)}const za=(e,t)=>!(e>0)||t==="linear";/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function U5({x:e,filter:t,strides:n,pad:s,dataFormat:r="NHWC",dilations:o=[1,1],dimRoundingMode:i,bias:a,activation:l="linear",preluActivationWeights:c,leakyreluAlpha:u}){if(l=l||"linear",za(R.state.gradientDepth,l)===!1){T(r==="NHWC",()=>`Error in fused conv2d: got dataFormat of ${r} but only NHWC is currently supported for the case of gradient depth is 0 and the activation is not linear.`);let S=ro(e,t,n,s,r,o,i);return a!=null&&(S=Vt(S,a)),Ca(S,l,c,u)}const f=k(e,"x","conv2d","float32"),h=k(t,"filter","conv2d","float32");let p=f,d=!1;f.rank===3&&(d=!0,p=C(f,[1,f.shape[0],f.shape[1],f.shape[2]])),T(p.rank===4,()=>`Error in fused conv2d: input must be rank 4, but got rank ${p.rank}.`),T(h.rank===4,()=>`Error in fused conv2d: filter must be rank 4, but got rank ${h.rank}.`),Pe("fused conv2d",s,i);const y=r==="NHWC"?p.shape[3]:p.shape[1];T(h.shape[2]===y,()=>`Error in conv2d: depth of input (${y}) must match input depth for filter ${h.shape[2]}.`),T(Fe(n,o),()=>`Error in conv2D: Either strides or dilations must be 1. Got strides ${n} and dilations '${o}'`);const m=Ke(p.shape,h.shape,n,o,s,i);let b;a!=null&&(b=k(a,"bias","fused conv2d"),[b]=At(b,f),r==="NHWC"?Dt(m.outShape,b.shape):(T(b.shape.length<=1,()=>`Error in fused conv2d: only supports scalar or 1-D Tensor bias for NCHW format but got the bias of rank-${b.shape.length}.`),T(b.shape.length===0||b.shape[0]===m.outChannels||b.shape[0]===1,()=>`Error in fused conv2d: bias shape (${b.shape}) is not compatible with the number of output channels (${m.outChannels})`)));let _;if(c!=null){const S=c.shape;if(T(S.length<=1||S.length===3,()=>`Error in fused conv2d: only supports scalar, 1-D Tensor or 3-D Tensor PReLU activation weights but got a tensor of rank-${S.length}.`),S.length===1)T(S[0]===1||S[0]===m.outChannels,()=>`Error in fused conv2d: PReLU activation weights (${S}) is not compatible with the number of output channels (${m.outChannels}).`);else if(S.length===3)try{Dt(S,m.outShape)}catch{const D=`Error in fused conv2d: PReLU activation weights (${S}) is not compatible with the output shape of the conv2d (${m.outShape}).`;throw Error(D)}_=k(c,"prelu weights","fused conv2d")}const w=(S,E)=>{T(r==="NHWC",()=>`Error in gradient of fused conv2D: got dataFormat of ${r} but only NHWC is currently supported.`);const[D,L,U,M]=E,B=Va(S,U,l);T(vr(o),()=>`Error in gradient of fused conv2D: dilation rates greater than 1 are not yet supported in gradients. Got dilations '${o}'`);const $=U1(L.shape,B,D,n,s),x=P5(L,B,D.shape,n,s),A=[$,x];if(M!=null){const O=Ba(M,B);A.push(O)}return A},N={x:p,filter:h,bias:b,preluActivationWeights:_},I={strides:n,pad:s,dataFormat:r,dilations:o,dimRoundingMode:i,activation:l,leakyreluAlpha:u};return a==null?an((E,D,L)=>{let U=R.runKernel(vo,N,I);return L([D,E,U]),d&&(U=C(U,[U.shape[1],U.shape[2],U.shape[3]])),{value:U,gradFunc:w}})(p,h):an((E,D,L,U)=>{let M=R.runKernel(vo,N,I);return U([D,E,M,L]),d&&(M=C(M,[M.shape[1],M.shape[2],M.shape[3]])),{value:M,gradFunc:w}})(p,h,b)}const M5=v({fusedConv2d_:U5});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function V5(e,t,n,s,r,o=[1,1],i){let a=e;e.rank===3&&(a=C(e,[1,e.shape[0],e.shape[1],e.shape[2]]));let l=t;l.rank===3&&(l=C(t,[1,t.shape[0],t.shape[1],t.shape[2]]));const c={x:a,dy:l},u={strides:s,pad:r,dimRoundingMode:i,dilations:o,filterShape:n};return R.runKernel(Vc,c,u)}const B5=v({depthwiseConv2dNativeBackpropFilter_:V5});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function C5(e,t,n,s,r,o=[1,1],i){let a=t,l=!1;t.rank===3&&(l=!0,a=C(t,[1,t.shape[0],t.shape[1],t.shape[2]]));const c={dy:a,filter:n},u={strides:s,pad:r,dimRoundingMode:i,dilations:o,inputShape:e},f=R.runKernel(Bc,c,u);return l?C(f,[f.shape[1],f.shape[2],f.shape[3]]):f}const z5=v({depthwiseConv2dNativeBackpropInput_:C5});/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function W5({x:e,filter:t,strides:n,pad:s,dataFormat:r="NHWC",dilations:o=[1,1],dimRoundingMode:i,bias:a,activation:l="linear",preluActivationWeights:c,leakyreluAlpha:u}){if(za(R.state.gradientDepth,l)===!1){let I=$a(e,t,n,s,r,o,i);return a!=null&&(I=Vt(I,a)),Ca(I,l,c,u)}const f=k(e,"x","depthwiseConv2d","float32"),h=k(t,"filter","depthwiseConv2d","float32");let p=f,d=!1;f.rank===3&&(d=!0,p=C(f,[1,f.shape[0],f.shape[1],f.shape[2]])),T(p.rank===4,()=>`Error in fused depthwiseConv2d: input must be rank 4, but got rank ${p.rank}.`),T(h.rank===4,()=>`Error in fused depthwiseConv2d: filter must be rank 4, but got rank ${h.rank}.`),T(p.shape[3]===h.shape[2],()=>`Error in fused depthwiseConv2d: number of input channels (${p.shape[3]}) must match the inChannels dimension in filter ${h.shape[2]}.`),o==null&&(o=[1,1]),T(Fe(n,o),()=>`Error in fused depthwiseConv2d: Either strides or dilations must be 1. Got strides ${n} and dilations '${o}'`),Pe("fused depthwiseConv2d",s,i);const y=Ke(p.shape,h.shape,n,o,s,i,!0);let m;a!=null&&(m=k(a,"bias","fused conv2d"),[m]=At(m,f),Dt(y.outShape,m.shape));let b;c!=null&&(b=k(c,"prelu weights","fused depthwiseConv2d"));const _=(I,S)=>{T(vr(o),()=>`Error in gradient of fused depthwiseConv2d: dilation rates greater than 1 are not yet supported. Got dilations '${o}'`);const[E,D,L,U]=S,M=Va(I,L,l),B=z5(D.shape,M,E,n,s,o,i),$=B5(D,M,E.shape,n,s,o,i);if(U!=null){const x=Ba(m,M);return[B,$,x]}return[B,$]},w={x:p,filter:h,bias:m,preluActivationWeights:b},N={strides:n,pad:s,dataFormat:r,dilations:o,dimRoundingMode:i,activation:l,leakyreluAlpha:u};return a==null?an((S,E,D)=>{let L=R.runKernel(xo,w,N);return D([E,S,L]),d&&(L=C(L,[L.shape[1],L.shape[2],L.shape[3]])),{value:L,gradFunc:_}})(p,h):an((S,E,D,L)=>{let U=R.runKernel(xo,w,N);return L([E,S,U,D]),d&&(U=C(U,[U.shape[1],U.shape[2],U.shape[3]])),{value:U,gradFunc:_}})(p,h,m)}const H5=v({fusedDepthwiseConv2d_:W5});/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function q5({a:e,b:t,transposeA:n=!1,transposeB:s=!1,bias:r,activation:o="linear",preluActivationWeights:i,leakyreluAlpha:a=.2}){if(za(R.state.gradientDepth,o)===!1){let M=mt(e,t,n,s);return r!=null&&(M=Vt(M,r)),Ca(M,o,i,a)}let l=k(e,"a","fused matMul"),c=k(t,"b","fused matMul");[l,c]=At(l,c);const u=n?l.shape[l.rank-2]:l.shape[l.rank-1],f=s?c.shape[c.rank-1]:c.shape[c.rank-2],h=n?l.shape[l.rank-1]:l.shape[l.rank-2],p=s?c.shape[c.rank-2]:c.shape[c.rank-1],d=l.shape.slice(0,-2),y=c.shape.slice(0,-2),m=q(d),b=q(y);T(u===f,()=>`Error in fused matMul: inner shapes (${u}) and (${f}) of Tensors with shapes ${l.shape} and ${c.shape} and transposeA=${n} and transposeB=${s} must match.`);const w=Dt(l.shape.slice(0,-2),c.shape.slice(0,-2)).concat([h,p]),N=n?C(l,[m,u,h]):C(l,[m,h,u]),I=s?C(c,[b,p,f]):C(c,[b,f,p]);let S;r!=null&&(S=k(r,"bias","fused matMul"),[S]=At(S,l),Dt(w,S.shape));let E;i!=null&&(E=k(i,"prelu weights","fused matMul"));const D=(M,B)=>{const[$,x,A,O]=B,F=Va(C(M,A.shape),A,o);let P,V;if(!n&&!s?(P=mt(F,x,!1,!0),V=mt($,F,!0,!1)):!n&&s?(P=mt(F,x,!1,!1),V=mt(F,$,!0,!1)):n&&!s?(P=mt(x,F,!1,!0),V=mt($,F,!1,!1)):(P=mt(x,F,!0,!0),V=mt(F,$,!0,!0)),r!=null){const z=Ba(O,F);return[P,V,z]}else return[P,V]},L={a:N,b:I,bias:S,preluActivationWeights:E},U={transposeA:n,transposeB:s,activation:o,leakyreluAlpha:a};return r==null?an((B,$,x)=>{const A=R.runKernel(Eo,L,U);return x([B,$,A]),{value:C(A,w),gradFunc:D}})(N,I):an((B,$,x,A)=>{const O=R.runKernel(Eo,L,U);return A([B,$,O,x]),{value:C(O,w),gradFunc:D}})(N,I,S)}const G5=v({fusedMatMul_:q5});/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */var K5=Object.freeze({__proto__:null,conv2d:M5,depthwiseConv2d:H5,matMul:G5});/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function j5(e){return Ma(e,.54,.46)}const X5=v({hammingWindow_:j5});/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function Y5(e){return Ma(e,.5,.5)}const If=v({hannWindow_:Y5});/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function Z5(e,t,n,s=!1,r=0){let o=0;const i=[];for(;o+t<=e.size;)i.push(wt(e,o,t)),o+=n;if(s)for(;o<e.size;){const a=o+t-e.size,l=ne([wt(e,o,t-a),so([a],r)]);i.push(l),o+=n}return i.length===0?qs([],[0,t]):C(ne(i),[i.length,t])}const kf=v({frame_:Z5});/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function J5(e,t,n,s,r=If){s==null&&(s=Nf(t));const o=kf(e,t,n),i=ot(o,r(t));return Pa(i,s)}const Q5=v({stft_:J5});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function t7(e,t,n,s,r="bilinear",o=0){const i=k(e,"image","cropAndResize"),a=k(t,"boxes","cropAndResize","float32"),l=k(n,"boxInd","cropAndResize","int32"),c=a.shape[0];T(i.rank===4,()=>`Error in cropAndResize: image must be rank 4,but got rank ${i.rank}.`),T(a.rank===2&&a.shape[1]===4,()=>`Error in cropAndResize: boxes must be have size [${c},4] but had shape ${a.shape}.`),T(l.rank===1&&l.shape[0]===c,()=>`Error in cropAndResize: boxInd must be have size [${c}] but had shape ${a.shape}.`),T(s.length===2,()=>`Error in cropAndResize: cropSize must be of length 2, but got length ${s.length}.`),T(s[0]>=1&&s[1]>=1,()=>`cropSize must be atleast [1,1], but was ${s}`),T(r==="bilinear"||r==="nearest",()=>`method must be bilinear or nearest, but was ${r}`);const u={image:i,boxes:a,boxInd:l},f={method:r,extrapolationValue:o,cropSize:s};return R.runKernel(Fc,u,f)}const e7=v({cropAndResize_:t7});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function n7(e){const t=k(e,"image","flipLeftRight","float32");T(t.rank===4,()=>`Error in flipLeftRight: image must be rank 4,but got rank ${t.rank}.`);const n={image:t};return R.runKernel(Kc,n,{})}const s7=v({flipLeftRight_:n7});/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function r7(e){const t=k(e,"image","grayscaleToRGB"),n=t.rank-1,s=t.shape[n];T(t.rank>=2,()=>`Error in grayscaleToRGB: images must be at least rank 2, but got rank ${t.rank}.`),T(s===1,()=>`Error in grayscaleToRGB: last dimension of a grayscale image should be size 1, but got size ${s}.`);const r=new Array(t.rank);return r.fill(1,0,n),r[n]=3,Hs(t,r)}const o7=v({grayscaleToRGB_:r7});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function i7(e,t,n=0,s=.5){const r=k(e,"image","rotateWithOffset","float32");T(r.rank===4,()=>`Error in rotateWithOffset: image must be rank 4,but got rank ${r.rank}.`);const o={image:r},i={radians:t,fillValue:n,center:s};return R.runKernel(Zu,o,i)}const a7=v({rotateWithOffset_:i7});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function xs(e,t,n,s,r,o){s==null&&(s=.5),r==null&&(r=Number.NEGATIVE_INFINITY),o==null&&(o=0);const i=e.shape[0];return n=Math.min(n,i),T(0<=s&&s<=1,()=>`iouThreshold must be in [0, 1], but was '${s}'`),T(e.rank===2,()=>`boxes must be a 2D tensor, but was of rank '${e.rank}'`),T(e.shape[1]===4,()=>`boxes must have 4 columns, but 2nd dimension was ${e.shape[1]}`),T(t.rank===1,()=>"scores must be a 1D tensor"),T(t.shape[0]===i,()=>`scores has incompatible shape with boxes. Expected ${i}, but was ${t.shape[0]}`),T(0<=o&&o<=1,()=>`softNmsSigma must be in [0, 1], but was '${o}'`),{maxOutputSize:n,iouThreshold:s,scoreThreshold:r,softNmsSigma:o}}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function l7(e,t,n,s=.5,r=Number.NEGATIVE_INFINITY){const o=k(e,"boxes","nonMaxSuppression","float32"),i=k(t,"scores","nonMaxSuppression","float32"),a=xs(o,i,n,s,r);n=a.maxOutputSize,s=a.iouThreshold,r=a.scoreThreshold;const l={maxOutputSize:n,iouThreshold:s,scoreThreshold:r};return R.runKernel(fu,{boxes:o,scores:i},l)}const c7=v({nonMaxSuppression_:l7});/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function u7(e,t,n){const s=f7(e,t,n),r=s<0?-(s+1):s;e.splice(r,0,t)}function f7(e,t,n){return p7(e,t,n||h7)}function h7(e,t){return e>t?1:e<t?-1:0}function p7(e,t,n){let s=0,r=e.length,o=0,i=!1;for(;s<r;){o=s+(r-s>>>1);const a=n(t,e[o]);a>0?s=o+1:(r=o,i=!a)}return i?s:-s-1}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function Sf(e,t,n,s,r){return Wa(e,t,n,s,r,0)}function Tf(e,t,n,s,r,o){return Wa(e,t,n,s,r,0,!1,o,!0)}function Ef(e,t,n,s,r,o){return Wa(e,t,n,s,r,o,!0)}function Wa(e,t,n,s,r,o,i=!1,a=!1,l=!1){const c=[];for(let m=0;m<t.length;m++)t[m]>r&&c.push({score:t[m],boxIndex:m,suppressBeginIndex:0});c.sort(Sl);const u=o>0?-.5/o:0,f=[],h=[];for(;f.length<n&&c.length>0;){const m=c.pop(),{score:b,boxIndex:_,suppressBeginIndex:w}=m;if(b<r)break;let N=!1;for(let I=f.length-1;I>=w;--I){const S=d7(e,_,f[I]);if(S>=s){N=!0;break}if(m.score=m.score*m7(s,u,S),m.score<=r)break}m.suppressBeginIndex=f.length,N||(m.score===b?(f.push(_),h.push(m.score)):m.score>r&&u7(c,m,Sl))}const p=f.length,d=n-p;a&&d>0&&(f.push(...new Array(d).fill(0)),h.push(...new Array(d).fill(0)));const y={selectedIndices:f};return i&&(y.selectedScores=h),l&&(y.validOutputs=p),y}function d7(e,t,n){const s=e.subarray(t*4,t*4+4),r=e.subarray(n*4,n*4+4),o=Math.min(s[0],s[2]),i=Math.min(s[1],s[3]),a=Math.max(s[0],s[2]),l=Math.max(s[1],s[3]),c=Math.min(r[0],r[2]),u=Math.min(r[1],r[3]),f=Math.max(r[0],r[2]),h=Math.max(r[1],r[3]),p=(a-o)*(l-i),d=(f-c)*(h-u);if(p<=0||d<=0)return 0;const y=Math.max(o,c),m=Math.max(i,u),b=Math.min(a,f),_=Math.min(l,h),w=Math.max(b-y,0)*Math.max(_-m,0);return w/(p+d-w)}function m7(e,t,n){const s=Math.exp(t*n*n);return n<=e?s:0}function Sl(e,t){return e.score-t.score||e.score===t.score&&t.boxIndex-e.boxIndex}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */async function g7(e,t,n,s=.5,r=Number.NEGATIVE_INFINITY){const o=k(e,"boxes","nonMaxSuppressionAsync"),i=k(t,"scores","nonMaxSuppressionAsync"),a=xs(o,i,n,s,r);n=a.maxOutputSize,s=a.iouThreshold,r=a.scoreThreshold;const l=await Promise.all([o.data(),i.data()]),c=l[0],u=l[1],{selectedIndices:f}=Sf(c,u,n,s,r);return o!==e&&o.dispose(),i!==t&&i.dispose(),De(f,"int32")}const y7=g7;/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function b7(e,t,n,s=.5,r=Number.NEGATIVE_INFINITY,o=0){const i=k(e,"boxes","nonMaxSuppression"),a=k(t,"scores","nonMaxSuppression"),l=xs(i,a,n,s,r,o);n=l.maxOutputSize,s=l.iouThreshold,r=l.scoreThreshold,o=l.softNmsSigma;const c={boxes:i,scores:a},u={maxOutputSize:n,iouThreshold:s,scoreThreshold:r,softNmsSigma:o},f=R.runKernel(pu,c,u);return{selectedIndices:f[0],selectedScores:f[1]}}const _7=v({nonMaxSuppressionWithScore_:b7});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */async function w7(e,t,n,s=.5,r=Number.NEGATIVE_INFINITY,o=0){const i=k(e,"boxes","nonMaxSuppressionAsync"),a=k(t,"scores","nonMaxSuppressionAsync"),l=xs(i,a,n,s,r,o);n=l.maxOutputSize,s=l.iouThreshold,r=l.scoreThreshold,o=l.softNmsSigma;const c=await Promise.all([i.data(),a.data()]),u=c[0],f=c[1],{selectedIndices:h,selectedScores:p}=Ef(u,f,n,s,r,o);return i!==e&&i.dispose(),a!==t&&a.dispose(),{selectedIndices:De(h,"int32"),selectedScores:De(p)}}const N7=w7;/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function I7(e,t,n,s=.5,r=Number.NEGATIVE_INFINITY,o=!1){const i=k(e,"boxes","nonMaxSuppression"),a=k(t,"scores","nonMaxSuppression"),l=xs(i,a,n,s,r,null),c=l.maxOutputSize,u=l.iouThreshold,f=l.scoreThreshold,h={boxes:i,scores:a},p={maxOutputSize:c,iouThreshold:u,scoreThreshold:f,padToMaxOutputSize:o},d=R.runKernel(hu,h,p);return{selectedIndices:d[0],validOutputs:d[1]}}const k7=v({nonMaxSuppressionPadded_:I7});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */async function S7(e,t,n,s=.5,r=Number.NEGATIVE_INFINITY,o=!1){const i=k(e,"boxes","nonMaxSuppressionAsync"),a=k(t,"scores","nonMaxSuppressionAsync"),l=xs(i,a,n,s,r,null),c=l.maxOutputSize,u=l.iouThreshold,f=l.scoreThreshold,[h,p]=await Promise.all([i.data(),a.data()]),{selectedIndices:d,validOutputs:y}=Tf(h,p,c,u,f,o);return i!==e&&i.dispose(),a!==t&&a.dispose(),{selectedIndices:De(d,"int32"),validOutputs:ht(y,"int32")}}const T7=S7;/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function E7(e,t,n=!1,s=!1){const r=k(e,"images","resizeBilinear");T(r.rank===3||r.rank===4,()=>`Error in resizeBilinear: x must be rank 3 or 4, but got rank ${r.rank}.`),T(t.length===2,()=>`Error in resizeBilinear: new shape must 2D, but got shape ${t}.`),T(s===!1||n===!1,()=>"Error in resizeBilinear: If halfPixelCenters is true, alignCorners must be false.");let o=r,i=!1;r.rank===3&&(i=!0,o=C(r,[1,r.shape[0],r.shape[1],r.shape[2]]));const a={images:o},l={alignCorners:n,halfPixelCenters:s,size:t},c=R.runKernel(Eu,a,l);return i?C(c,[c.shape[1],c.shape[2],c.shape[3]]):c}const v7=v({resizeBilinear_:E7});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function x7(e,t,n=!1,s=!1){const r=k(e,"images","resizeNearestNeighbor");T(r.rank===3||r.rank===4,()=>`Error in resizeNearestNeighbor: x must be rank 3 or 4, but got rank ${r.rank}.`),T(t.length===2,()=>`Error in resizeNearestNeighbor: new shape must 2D, but got shape ${t}.`),T(r.dtype==="float32"||r.dtype==="int32",()=>"`images` must have `int32` or `float32` as dtype"),T(s===!1||n===!1,()=>"Error in resizeNearestNeighbor: If halfPixelCenters is true, alignCorners must be false.");let o=r,i=!1;r.rank===3&&(i=!0,o=C(r,[1,r.shape[0],r.shape[1],r.shape[2]]));const a={images:o},l={alignCorners:n,halfPixelCenters:s,size:t},c=R.runKernel(Tu,a,l);return i?C(c,[c.shape[1],c.shape[2],c.shape[3]]):c}const $7=v({resizeNearestNeighbor_:x7});/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function A7(e,t="binary",n=!1,s=.5){const r=k(e,"image","threshold"),o=.2989,i=.587,a=.114,l=r.shape[0]*r.shape[1];let c=ot(De([s]),255),u,f,h,p;if(T(r.rank===3,()=>`Error in threshold: image must be rank 3,but got rank ${r.rank}.`),T(r.shape[2]===3||r.shape[2]===1,()=>`Error in threshold: image color channel must be equal to 3 or 1but got ${r.shape[2]}.`),T(r.dtype==="int32"||r.dtype==="float32",()=>`Error in dtype: image dtype must be int32 or float32,but got dtype ${r.dtype}.`),T(t==="otsu"||t==="binary",()=>`Method must be binary or otsu, but was ${t}`),r.shape[2]===3){[u,f,h]=Qs(r,[1,1,1],-1);const m=ot(u,o),b=ot(f,i),_=ot(h,a);p=Vt(Vt(m,b),_)}else p=e;if(t==="otsu"){const m=P1(Mt(mf(p),"int32"),Re([]),256);c=D7(m,l)}const d=n?Ra(p,c):ao(p,c);return Mt(ot(d,255),"int32")}function D7(e,t){let n=De([-1]),s=De([0]),r=De([0]),o,i,a,l,c,u;for(let f=0;f<e.size-1;f++){o=wt(e,0,f+1),i=wt(e,f+1),c=ee(St(o),t),u=ee(St(i),t);const h=St(ot(o,Js(0,o.size)));a=ee(h,St(o));const p=so(i.shape,o.size),d=Vt(Js(0,i.size),p),y=ot(i,d);l=ee(St(y),St(i));const m=ct(a,l),b=ct(a,l),_=ot(c,u);r=ot(ot(_,m),b);const w=ao(r,s);s=gs(w,r,s),n=gs(w,De([f]),n)}return n}const R7=v({threshold_:A7});/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function O7(e,t,n="nearest",s="constant",r=0,o){const i=k(e,"image","transform","float32"),a=k(t,"transforms","transform","float32");T(i.rank===4,()=>`Error in transform: image must be rank 4,but got rank ${i.rank}.`),T(a.rank===2&&(a.shape[0]===i.shape[0]||a.shape[0]===1)&&a.shape[1]===8,()=>"Error in transform: Input transform should be batch x 8 or 1 x 8"),T(o==null||o.length===2,()=>`Error in transform: outputShape must be [height, width] or null, but got ${o}.`);const l={image:i,transforms:a},c={interpolation:n,fillMode:s,fillValue:r,outputShape:o};return R.runKernel(Gu,l,c)}const L7=v({transform_:O7});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function F7(e,t,n){T(t%1===0,()=>`bandPart(): numLower must be an integer, got ${t}.`),T(n%1===0,()=>`bandPart(): numUpper must be an integer, got ${n}.`);const s=k(e,"a","bandPart");T(s.rank>=2,()=>`bandPart(): Rank must be at least 2, got ${s.rank}.`);const r=s.shape,[o,i]=s.shape.slice(-2);if(!(t<=o))throw new Error(`bandPart(): numLower (${t}) must not be greater than the number of rows (${o}).`);if(!(n<=i))throw new Error(`bandPart(): numUpper (${n}) must not be greater than the number of columns (${i}).`);t<0&&(t=o),n<0&&(n=i);const a=C(Js(0,o,1,"int32"),[-1,1]),l=Js(0,i,1,"int32"),c=ct(a,l),u=xr(Ra(c,ht(+t,"int32")),G1(c,ht(-n,"int32"))),f=ys([o,i],s.dtype);return C(ln(Qn(C(s,[-1,o,i])).map(h=>gs(u,h,f))),r)}const P7=v({bandPart_:F7});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function U7(e){let t;if(Array.isArray(e)){t=!1,T(e!=null&&e.length>0,()=>"Gram-Schmidt process: input must not be null, undefined, or empty");const r=e[0].shape[0];for(let o=1;o<e.length;++o)T(e[o].shape[0]===r,()=>`Gram-Schmidt: Non-unique lengths found in the input vectors: (${e[o].shape[0]} vs. ${r})`)}else t=!0,e=Qs(e,e.shape[0],0).map(r=>Ua(r,[0]));T(e.length<=e[0].shape[0],()=>`Gram-Schmidt: Number of vectors (${e.length}) exceeds number of dimensions (${e[0].shape[0]}).`);const n=[],s=e;for(let r=0;r<e.length;++r)n.push(R.tidy(()=>{let o=s[r];if(r>0)for(let i=0;i<r;++i){const a=ot(St(ot(n[i],o)),n[i]);o=ct(o,a)}return ee(o,io(o,"euclidean"))}));return t?ln(n,0):n}const M7=v({gramSchmidt_:U7});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function V7(e,t=!1){if(T(e.rank>=2,()=>`qr() requires input tensor to have a rank >= 2, but got rank ${e.rank}`),e.rank===2)return Tl(e,t);{const n=e.shape.slice(0,e.shape.length-2).reduce((l,c)=>l*c),s=Qn(C(e,[n,e.shape[e.shape.length-2],e.shape[e.shape.length-1]]),0),r=[],o=[];s.forEach(l=>{const[c,u]=Tl(l,t);r.push(c),o.push(u)});const i=C(ln(r,0),e.shape),a=C(ln(o,0),e.shape);return[i,a]}}function Tl(e,t=!1){return R.tidy(()=>{T(e.shape.length===2,()=>`qr2d() requires a 2D Tensor, but got a ${e.shape.length}D Tensor.`);const n=e.shape[0],s=e.shape[1];let r=W1(n),o=wn(e);const i=qs([[1]],[1,1]);let a=wn(i);const l=n>=s?s:n;for(let c=0;c<l;++c){const u=o,f=a,h=r;[a,o,r]=R.tidy(()=>{const p=wt(o,[c,c],[n-c,1]),d=io(p),y=wt(o,[c,c],[1,1]),m=gs(ao(y,0),qs([[-1]]),qs([[1]])),b=ct(y,ot(m,d)),_=ee(p,b);_.shape[0]===1?a=wn(i):a=ne([i,wt(_,[1,0],[_.shape[0]-1,_.shape[1]])],0);const w=rn(ee(mt(m,b),d)),N=wt(o,[c,0],[n-c,s]),I=ot(w,a),S=Co(a);if(c===0)o=ct(N,mt(I,mt(S,N)));else{const L=ct(N,mt(I,mt(S,N)));o=ne([wt(o,[0,0],[c,s]),L],0)}const E=Co(I),D=wt(r,[0,c],[n,r.shape[1]-c]);if(c===0)r=ct(D,mt(mt(D,a),E));else{const L=ct(D,mt(mt(D,a),E));r=ne([wt(r,[0,0],[n,c]),L],1)}return[a,o,r]}),vd([u,f,h])}return!t&&n>s&&(r=wt(r,[0,0],[n,s]),o=wt(o,[0,0],[s,s])),[r,o]})}const B7=v({qr_:V7});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */var se;(function(e){e[e.NONE=0]="NONE",e[e.MEAN=1]="MEAN",e[e.SUM=2]="SUM",e[e.SUM_BY_NONZERO_WEIGHTS=3]="SUM_BY_NONZERO_WEIGHTS"})(se||(se={}));function C7(e,t,n=se.SUM_BY_NONZERO_WEIGHTS){const s=k(e,"losses","computeWeightedLoss");let r=null;t!=null&&(r=k(t,"weights","computeWeightedLoss"));const o=r==null?s:ot(s,r);if(n===se.NONE)return o;if(n===se.SUM)return St(o);if(n===se.MEAN){if(r==null)return $r(o);{const i=s.size/r.size,a=ee(St(o),St(r));return i>1?ee(a,ht(i)):a}}if(n===se.SUM_BY_NONZERO_WEIGHTS){if(r==null)return ee(St(o),ht(s.size));{const i=ot(r,Fn(s.shape)),a=Mt(St(ef(i,ht(0))),"float32");return ee(St(o),a)}}throw Error(`Unknown reduction: ${n}`)}const un=v({computeWeightedLoss_:C7});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function z7(e,t,n,s=se.SUM_BY_NONZERO_WEIGHTS){const r=k(e,"labels","absoluteDifference"),o=k(t,"predictions","absoluteDifference");let i=null;n!=null&&(i=k(n,"weights","absoluteDifference")),ge(r.shape,o.shape,"Error in absoluteDifference: ");const a=_e(ct(r,o));return un(a,i,s)}const W7=v({absoluteDifference_:z7});function H7(e,t,n,s,r=se.SUM_BY_NONZERO_WEIGHTS){const o=k(e,"labels","cosineDistance"),i=k(t,"predictions","cosineDistance");let a=null;s!=null&&(a=k(s,"weights","cosineDistance")),ge(o.shape,i.shape,"Error in cosineDistance: ");const l=ht(1),c=ct(l,St(ot(o,i),n,!0));return un(c,a,r)}const q7=v({cosineDistance_:H7});function G7(e,t,n,s=se.SUM_BY_NONZERO_WEIGHTS){let r=k(e,"labels","hingeLoss");const o=k(t,"predictions","hingeLoss");let i=null;n!=null&&(i=k(n,"weights","hingeLoss")),ge(r.shape,o.shape,"Error in hingeLoss: ");const a=ht(1);r=ct(ot(ht(2),r),a);const l=co(ct(a,ot(r,o)));return un(l,i,s)}const K7=v({hingeLoss_:G7});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function j7(e,t,n,s=1,r=se.SUM_BY_NONZERO_WEIGHTS){const o=k(e,"labels","huberLoss"),i=k(t,"predictions","huberLoss");let a=null;n!=null&&(a=k(n,"weights","huberLoss")),ge(o.shape,i.shape,"Error in huberLoss: ");const l=ht(s),c=_e(ct(i,o)),u=tf(c,l),f=ct(c,u),h=Vt(ot(ht(.5),oo(u)),ot(l,f));return un(h,a,r)}const X7=v({huberLoss_:j7});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function Y7(e,t,n,s=1e-7,r=se.SUM_BY_NONZERO_WEIGHTS){const o=k(e,"labels","logLoss"),i=k(t,"predictions","logLoss");let a=null;n!=null&&(a=k(n,"weights","logLoss")),ge(o.shape,i.shape,"Error in logLoss: ");const l=ht(1),c=ht(s),u=rn(ot(o,Zs(Vt(i,c)))),f=ot(ct(l,o),Zs(Vt(ct(l,i),c))),h=ct(u,f);return un(h,a,r)}const Z7=v({logLoss_:Y7});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function J7(e,t,n,s=se.SUM_BY_NONZERO_WEIGHTS){const r=k(e,"labels","meanSquaredError"),o=k(t,"predictions","meanSquaredError");let i=null;n!=null&&(i=k(n,"weights","meanSquaredError")),ge(r.shape,o.shape,"Error in meanSquaredError: ");const a=yf(r,o);return un(a,i,s)}const Q7=v({meanSquaredError_:J7});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function ty(e,t){const n=k(e,"labels","sigmoidCrossEntropyWithLogits"),s=k(t,"logits","sigmoidCrossEntropyWithLogits");ge(n.shape,s.shape,"Error in sigmoidCrossEntropyWithLogits: ");const r=co(s),o=ot(s,n),i=j1(Wn(rn(_e(s))));return Vt(ct(r,o),i)}function ey(e,t,n,s=0,r=se.SUM_BY_NONZERO_WEIGHTS){let o=k(e,"multiClassLabels","sigmoidCrossEntropy");const i=k(t,"logits","sigmoidCrossEntropy");let a=null;if(n!=null&&(a=k(n,"weights","sigmoidCrossEntropy")),ge(o.shape,i.shape,"Error in sigmoidCrossEntropy: "),s>0){const c=ht(s),u=ht(1),f=ht(.5);o=Vt(ot(o,ct(u,c)),ot(f,c))}const l=ty(o,i);return un(l,a,r)}const ny=v({sigmoidCrossEntropy_:ey});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function sy(e,t,n=-1){if(n===-1&&(n=t.rank-1),n!==t.rank-1)throw Error(`Softmax cross entropy along a non-last dimension is not yet supported. Labels / logits was rank ${t.rank} and dim was ${n}`);return an((r,o,i)=>{const l=Y1(o,[n],!0),c=ct(Mt(o,"float32"),l);i([r,c]);const u=rn(ot(c,r));return{value:St(u,[n]),gradFunc:(p,d)=>{const[y,m]=d,b=Ue(p.shape,[n]);return[ot(C(p,b),ct(Mt(y,"float32"),Wn(m))),ot(C(p,b),ct(Wn(m),Mt(y,"float32")))]}}})(e,t)}function ry(e,t,n,s=0,r=se.SUM_BY_NONZERO_WEIGHTS){let o=k(e,"onehotLabels","softmaxCrossEntropy");const i=k(t,"logits","softmaxCrossEntropy");let a=null;if(n!=null&&(a=k(n,"weights","softmaxCrossEntropy")),ge(o.shape,i.shape,"Error in softmaxCrossEntropy: "),s>0){const c=ht(s),u=ht(1),f=ht(o.shape[1]);o=Vt(ot(o,ct(u,c)),ee(c,f))}const l=sy(o,i);return un(l,a,r)}const oy=v({softmaxCrossEntropy_:ry});/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function iy(e,t,n,s){const r=k(e,"indices","sparseFillEmptyRows","int32"),o=k(t,"values","sparseFillEmptyRows"),i=k(n,"denseShape","sparseFillEmptyRows","int32"),a=k(s,"defaultValue","sparseFillEmptyRows",o.dtype);if(r.rank!==2)throw new Error(`Indices should be Tensor2D but received shape
        ${r.shape}`);if(o.rank!==1)throw new Error(`Values should be Tensor1D but received shape ${o.shape}`);if(i.rank!==1)throw new Error(`Dense shape should be Tensor1D but received shape ${i.shape}`);if(a.rank!==0)throw new Error(`Default value should be a scalar but received shape ${a.shape}`);const l={indices:r,values:o,denseShape:i,defaultValue:a},c=R.runKernel(Pu,l);return{outputIndices:c[0],outputValues:c[1],emptyRowIndicator:c[2],reverseIndexMap:c[3]}}const ay=v({sparseFillEmptyRows_:iy});/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function ly(e,t,n){const s=k(e,"inputIndices","sparseReshape","int32"),r=k(t,"inputShape","sparseReshape","int32"),o=k(n,"newShape","sparseReshape","int32");if(s.rank!==2)throw new Error(`Input indices should be Tensor2D but received shape
        ${s.shape}`);if(r.rank!==1)throw new Error(`Input shape should be Tensor1D but received shape ${r.shape}`);if(o.rank!==1)throw new Error(`New shape should be Tensor1D but received shape ${o.shape}`);const i={inputIndices:s,inputShape:r,newShape:o},a=R.runKernel(Uu,i);return{outputIndices:a[0],outputShape:a[1]}}const cy=v({sparseReshape_:ly});/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function uy(e,t,n){const s=k(e,"data","sparseSegmentMean"),r=k(t,"indices","sparseSegmentMean","int32"),o=k(n,"segmentIds","sparseSegmentMean","int32");if(s.rank<1)throw new Error("Data should be at least 1 dimensional but received scalar");if(r.rank!==1)throw new Error(`Indices should be Tensor1D but received shape
          ${r.shape}`);if(o.rank!==1)throw new Error(`Segment ids should be Tensor1D but received shape
          ${o.shape}`);const i={data:s,indices:r,segmentIds:o};return R.runKernel(Mu,i)}const fy=v({sparseSegmentMean_:uy});/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function hy(e,t,n){const s=k(e,"data","sparseSegmentSum"),r=k(t,"indices","sparseSegmentSum","int32"),o=k(n,"segmentIds","sparseSegmentSum","int32");if(s.rank<1)throw new Error("Data should be at least 1 dimensional but received scalar");if(r.rank!==1)throw new Error(`Indices should be Tensor1D but received shape
         ${r.shape}`);if(o.rank!==1)throw new Error(`Segment ids should be Tensor1D but received shape
         ${o.shape}`);const i={data:s,indices:r,segmentIds:o};return R.runKernel(Vu,i)}const py=v({sparseSegmentSum_:hy});/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function dy(e,t,n,s,r,o,i,a){const l=k(e,"data","stringNGrams","string");if(l.dtype!=="string")throw new Error("Data must be of datatype string");if(l.shape.length!==1)throw new Error(`Data must be a vector, saw: ${l.shape}`);const c=k(t,"dataSplits","stringNGrams");if(c.dtype!=="int32")throw new Error("Data splits must be of datatype int32");const u={separator:n,nGramWidths:s,leftPad:r,rightPad:o,padWidth:i,preserveShortSequences:a},f={data:l,dataSplits:c},h=R.runKernel(zu,f,u);return{nGrams:h[0],nGramsSplits:h[1]}}const my=v({stringNGrams_:dy});/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function gy(e,t,n=!0){const s=k(e,"input","stringSplit","string"),r=k(t,"delimiter","stringSplit","string");if(s.rank!==1)throw new Error(`Input should be Tensor1D but received shape ${s.shape}`);if(r.rank!==0)throw new Error(`Delimiter should be a scalar but received shape ${r.shape}`);const o={skipEmpty:n},i={input:s,delimiter:r},a=R.runKernel(Wu,i,o);return{indices:a[0],values:a[1],shape:a[2]}}const yy=v({stringSplit_:gy});/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function by(e,t){const n=k(e,"input","stringToHashBucketFast","string"),s={numBuckets:t};if(t<=0)throw new Error("Number of buckets must be at least 1");const r={input:n};return R.runKernel(Hu,r,s)}const _y=v({stringToHashBucketFast_:by});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */const wy={fft:Fa,ifft:Ar,rfft:Pa,irfft:gf},Ny={hammingWindow:X5,hannWindow:If,frame:kf,stft:Q5},Iy={flipLeftRight:s7,grayscaleToRGB:o7,resizeNearestNeighbor:$7,resizeBilinear:v7,rotateWithOffset:a7,cropAndResize:e7,nonMaxSuppression:c7,nonMaxSuppressionAsync:y7,nonMaxSuppressionWithScore:_7,nonMaxSuppressionWithScoreAsync:N7,nonMaxSuppressionPadded:k7,nonMaxSuppressionPaddedAsync:T7,threshold:R7,transform:L7},ky={bandPart:P7,gramSchmidt:M7,qr:B7},Sy={absoluteDifference:W7,computeWeightedLoss:un,cosineDistance:q7,hingeLoss:K7,huberLoss:X7,logLoss:Z7,meanSquaredError:Q7,sigmoidCrossEntropy:ny,softmaxCrossEntropy:oy},Ty={sparseFillEmptyRows:ay,sparseReshape:cy,sparseSegmentMean:fy,sparseSegmentSum:py},Ey={stringNGrams:my,stringSplit:yy,stringToHashBucketFast:_y};/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function vy(e,t){const n=e[0].length;e.forEach((r,o)=>{T(r.length===n,()=>`Error in concat${n}D: rank of tensors[${o}] must be the same as the rank of the rest (${n})`)}),T(t>=0&&t<n,()=>`Error in concat${n}D: axis must be between 0 and ${n-1}.`);const s=e[0];e.forEach((r,o)=>{for(let i=0;i<n;i++)T(i===t||r[i]===s[i],()=>`Error in concat${n}D: Shape of tensors[${o}] (${r}) does not match the shape of the rest (${s}) along the non-concatenated axis ${o}.`)})}function wo(e,t){const n=e[0].slice();for(let s=1;s<e.length;s++)n[t]+=e[s][t];return n}/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */var Ce;(function(e){e[e.FIRST_DIM_SIZE=0]="FIRST_DIM_SIZE",e[e.VALUE_ROWIDS=1]="VALUE_ROWIDS",e[e.ROW_LENGTHS=2]="ROW_LENGTHS",e[e.ROW_SPLITS=3]="ROW_SPLITS",e[e.ROW_LIMITS=4]="ROW_LIMITS",e[e.ROW_STARTS=5]="ROW_STARTS"})(Ce||(Ce={}));function xy(e,t,n){let s=new Array;if(n==null&&t==null)return s;if(t==null)for(;s.length<e+n.length;)s.push(-1);else s=t.slice();if(n==null)return s;if(e+n.length!==s.length)throw new Error(`rt input.shape and shape=${t} are incompatible: rt input.rank = ${e+n.length}, but shape.rank = ${s.length}`);for(let r=1;r<n.length;++r){const o=n[r],i=s[s.length-n.length+r],a=s[i];if(o>=0)if(a>=0){if(a!==o)throw new Error(`rt input.shape and shape=${t} are incompatible: rt input.shape[${r+e}] = ${o} but shape[${r+e}] = ${a}`)}else s[i]=o}return s}function $y(e){const t={FIRST_DIM_SIZE:Ce.FIRST_DIM_SIZE,VALUE_ROWIDS:Ce.VALUE_ROWIDS,ROW_LENGTHS:Ce.ROW_LENGTHS,ROW_SPLITS:Ce.ROW_SPLITS,ROW_LIMITS:Ce.ROW_LIMITS,ROW_STARTS:Ce.ROW_STARTS},n=[];for(const s of e)if(s in t)n.push(t[s]);else break;return n}function Ay(e){return e.length===0?0:e[0]===Ce.FIRST_DIM_SIZE?e.length-1:e.length}function Dy(e,t){if(e==null||t==null)return;const n=e.length,s=t.length;if(n>=s)throw new Error(`defaultValue.shape=${e} and ragged tensor flatValues.shape=${t}, are incompatible: defaultValue.rank = ${n} must be less than ragged tensor input flatValues.rank = ${s})`);for(let r=0;r<Math.min(n,s-1);++r){const o=e[r],i=t[r+1];if(o>=0&&i>=0&&o!==1&&o!==i)throw new Error(`defaultValue.shape=${e}, and ragged tensor input flatValues.shape=${t} are incompatible: defaultValue.shape[${r-e.length}] = ${o} but ragged tensor input.flatValues.shape[${r-e.length}] = ${i}`)}}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function Ry(e,t,n){const s=n*(typeof e=="number"?e:e[0]),r=t*(typeof e=="number"?e:e[1]);return[s,r]}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function vf(e,t,n,s=!0){let r=[];if(s)r=r.concat(t.slice(0)),r.push(e[0]/n),r=r.concat(e.slice(1));else{r=r.concat(e[0]);const o=t.length;for(let i=0;i<o;++i)r=r.concat([e[i+1]/t[i],t[i]]);r=r.concat(e.slice(o+1))}return r}function xf(e,t,n=!0){const s=[];if(n){s.push(t);for(let r=t+1;r<e;++r)r<=2*t?(s.push(r),s.push(r-(t+1))):s.push(r)}else{const r=[],o=[];for(let i=1;i<e;++i)i>=t*2+1||i%2===1?o.push(i):r.push(i);s.push(...r),s.push(0),s.push(...o)}return s}function $f(e,t,n,s=!0){const r=[];s?r.push(e[0]/n):r.push(e[0]*n);for(let o=1;o<e.length;++o)o<=t.length?s?r.push(t[o-1]*e[o]):r.push(e[o]/t[o-1]):r.push(e[o]);return r}function Oy(e,t){const n=[0];for(let s=0;s<t;++s)n.push(e[s][0]);return n}function Ly(e,t,n){const s=e.slice(0,1);for(let r=0;r<n;++r)s.push(e[r+1]-t[r][0]-t[r][1]);return s}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */const Fy=1.7580993408473768,Py=1.0507009873554805;/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */const Uy=.3275911,My=.254829592,Vy=-.284496736,By=1.421413741,Cy=-1.453152027,zy=1.061405429;/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function bs(e,t){if(e.length!==t.length)throw new Error(`Cannot merge real and imag arrays of different lengths. real:${e.length}, imag: ${t.length}.`);const n=new Float32Array(e.length*2);for(let s=0;s<n.length;s+=2)n[s]=e[s/2],n[s+1]=t[s/2];return n}function Wy(e){const t=new Float32Array(e.length/2),n=new Float32Array(e.length/2);for(let s=0;s<e.length;s+=2)t[s/2]=e[s],n[s/2]=e[s+1];return{real:t,imag:n}}function Hy(e){const t=Math.ceil(e.length/4),n=new Float32Array(t),s=new Float32Array(t);for(let r=0;r<e.length;r+=4)n[Math.floor(r/4)]=e[r],s[Math.floor(r/4)]=e[r+1];return{real:n,imag:s}}function qy(e){const t=Math.floor(e.length/4),n=new Float32Array(t),s=new Float32Array(t);for(let r=2;r<e.length;r+=4)n[Math.floor(r/4)]=e[r],s[Math.floor(r/4)]=e[r+1];return{real:n,imag:s}}function Af(e,t){const n=e[t*2],s=e[t*2+1];return{real:n,imag:s}}function Gy(e,t,n,s){e[s*2]=t,e[s*2+1]=n}function Ky(e,t){const n=new Float32Array(e/2),s=new Float32Array(e/2);for(let r=0;r<Math.ceil(e/2);r++){const o=(t?2:-2)*Math.PI*(r/e);n[r]=Math.cos(o),s[r]=Math.sin(o)}return{real:n,imag:s}}function jy(e,t,n){const s=(n?2:-2)*Math.PI*(e/t),r=Math.cos(s),o=Math.sin(s);return{real:r,imag:o}}/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */const No="->",Xy=/->/g,El=",",vl="...";function Yy(e,t){e=e.replace(/\s/g,"");const n=(e.length-e.replace(Xy,"").length)/No.length;if(n<1)throw new Error("Equations without an arrow are not supported.");if(n>1)throw new Error(`Equation must contain exactly one arrow ("${No}").`);const[s,r]=e.split(No);T(s.indexOf(vl)===-1,()=>`The ellipsis notation ("${vl}") is not supported yet.`);const o=s.split(El),i=o.length;if(t!==i)throw new Error(`Expected ${i} input tensors, received ${t}`);if(i>2)throw new Error("Support for more than 2 input tensors is not implemented yet.");const a=[];for(let h=0;h<r.length;++h){const p=r[h];if(!o.some(d=>d.indexOf(p)!==-1))throw new Error(`Output subscripts contain the label ${p} not present in the input subscripts.`);a.indexOf(p)===-1&&a.push(p)}for(let h=0;h<s.length;++h){const p=s[h];a.indexOf(p)===-1&&p!==El&&a.push(p)}const l=new Array(o.length);for(let h=0;h<i;++h){if(new Set(o[h].split("")).size!==o[h].length)throw new Error(`Found duplicate axes in input component ${o[h]}. Support for duplicate axes in input is not implemented yet.`);l[h]=[];for(let p=0;p<o[h].length;++p)l[h].push(a.indexOf(o[h][p]))}const c=a.length,u=r.length,f=[];for(let h=u;h<c;++h)f.push(h);return{allDims:a,summedDims:f,idDims:l}}function Zy(e,t){let n=new Array(e);n.fill(-1);for(let r=0;r<t.length;++r)n[t[r]]=r;const s=[];for(let r=0;r<e;++r)n[r]===-1&&s.push(r);return n=n.filter(r=>r!==-1),{permutationIndices:n,expandDims:s}}function Jy(e,t,n){const s=new Array(e);for(let r=0;r<n.length;++r){const o=n[r].shape;for(let i=0;i<t[r].length;++i)s[t[r][i]]===void 0?s[t[r][i]]=o[i]:T(s[t[r][i]]===o[i],()=>`Expected dimension ${s[t[r][i]]} at axis ${i} of input shaped ${JSON.stringify(o)}, but got dimension ${o[i]}`)}}function Qy(e,t){const n=e,s=[];let r=0;e.length===0&&n.push(-1),r=e.length+1;for(let i=0;i<r;++i)s.push([]);const o=[];for(let i=0;i<n.length;++i){const a=n[i],l=e9(t,a);for(const c of l)o.indexOf(c)===-1&&(s[i].push(c),o.push(c))}return{path:n,steps:s}}function t9(e){return e.every((t,n)=>t===n)}function e9(e,t){const n=[];for(let s=0;s<e.length;++s)(e[s].length===0||e[s].indexOf(t)!==-1||t===-1)&&n.push(s);return n}function n9(e,t,n=0){let s=[];if(typeof t=="number")T(e.shape[n]%t===0,()=>"Number of splits must evenly divide the axis."),s=new Array(t).fill(e.shape[n]/t);else{const r=t.reduce((i,a)=>(a===-1&&(i+=1),i),0);T(r<=1,()=>"There should be only one negative value in split array.");const o=t.indexOf(-1);if(o!==-1){const i=t.reduce((a,l)=>l>0?a+l:a);t[o]=e.shape[n]-i}T(e.shape[n]===t.reduce((i,a)=>i+a),()=>"The sum of sizes must match the size of the axis dimension."),s=t}return s}/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function s9(e){return`Received SparseTensor with denseShape[0] = 0 but
  indices.shape[0] = ${e}`}function r9(e,t){return`indices(${e}, 0) is invalid: ${t} < 0`}function o9(e,t,n){return`indices(${e}, 0) is invalid: ${t} >= ${n}`}/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function i9(e,t){return`only one output dimension may be -1, not both ${e} and ${t}`}function a9(e,t){return`size ${e} must be non-negative, not ${t}`}function l9(){return"reshape cannot infer the missing input size for an empty tensor unless all specified input sizes are non-zero"}function c9(e,t){const n=q(e),s=q(t);return`Input to reshape is a SparseTensor with ${n}
  dense values, but the requested shape requires a multiple of ${s}. inputShape=${e} outputShape= ${t}`}function u9(e,t){const n=q(e),s=q(t);return`Input to reshape is a tensor with ${n} dense values, but the requested shape has ${s}. inputShape=${e} outputShape=${t}`}/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function xl(){return"segment ids must be >= 0"}function f9(){return"segment ids are not increasing"}function h9(e,t){return`Segment id ${e} out of range [0, ${t}), possibly because segmentIds input is not sorted.`}function p9(e,t,n){return`Bad: indices[${e}] == ${t} out of range [0, ${n})`}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function d9(e,t,n,s){const r=t.shape.length,o=e.shape.length;if(s!==0&&(s<-r||s>r))throw new Error(`Expect batchDims in the range of [-${r}, ${r}], but got ${s}`);if(s<0&&(s+=r),s>o)throw new Error(`batchDims (${s}) must be less than rank(x) (
    ${o}).`);if(n<s)throw new Error(`batchDims (${s}) must be less than or equal to axis (${n}).`);for(let f=0;f<s;++f)if(e.shape[f]!==t.shape[f])throw new Error(`x.shape[${f}]: ${e.shape[f]} should be equal to indices.shape[${f}]: ${t.shape[f]}.`);const i=e.shape[n],a=[];let l=1,c=1,u=1;for(let f=0;f<s;++f)a.push(e.shape[f]),l*=e.shape[f];for(let f=s;f<n;f++)a.push(e.shape[f]),c*=e.shape[f];for(let f=s;f<r;f++)a.push(t.shape[f]);for(let f=n+1;f<o;f++)a.push(e.shape[f]),u*=e.shape[f];return{batchSize:l,sliceSize:u,outerSize:c,dimSize:i,outputShape:a}}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function Dr(e){try{return e.map(t=>Xs(t))}catch(t){throw new Error(`Failed to decode encoded string bytes into utf-8, error: ${t}`)}}function m9(e){return e.map(t=>Pn(t))}/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */const g9=lt();g9.registerFlag("KEEP_INTERMEDIATE_TENSORS",()=>!1,e=>{e&&console.warn("Keep intermediate tensors is ON. This will print the values of all intermediate tensors during model inference. Not all models support this mode. For details, check e2e/benchmarks/ model_config.js. This significantly impacts performance.")});/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */var be;(function(e){e[e.DT_INVALID=0]="DT_INVALID",e[e.DT_FLOAT=1]="DT_FLOAT",e[e.DT_DOUBLE=2]="DT_DOUBLE",e[e.DT_INT32=3]="DT_INT32",e[e.DT_UINT8=4]="DT_UINT8",e[e.DT_INT16=5]="DT_INT16",e[e.DT_INT8=6]="DT_INT8",e[e.DT_STRING=7]="DT_STRING",e[e.DT_COMPLEX64=8]="DT_COMPLEX64",e[e.DT_INT64=9]="DT_INT64",e[e.DT_BOOL=10]="DT_BOOL",e[e.DT_QINT8=11]="DT_QINT8",e[e.DT_QUINT8=12]="DT_QUINT8",e[e.DT_QINT32=13]="DT_QINT32",e[e.DT_BFLOAT16=14]="DT_BFLOAT16",e[e.DT_QINT16=15]="DT_QINT16",e[e.DT_QUINT16=16]="DT_QUINT16",e[e.DT_UINT16=17]="DT_UINT16",e[e.DT_COMPLEX128=18]="DT_COMPLEX128",e[e.DT_HALF=19]="DT_HALF",e[e.DT_RESOURCE=20]="DT_RESOURCE",e[e.DT_VARIANT=21]="DT_VARIANT",e[e.DT_UINT32=22]="DT_UINT32",e[e.DT_UINT64=23]="DT_UINT64",e[e.DT_FLOAT_REF=101]="DT_FLOAT_REF",e[e.DT_DOUBLE_REF=102]="DT_DOUBLE_REF",e[e.DT_INT32_REF=103]="DT_INT32_REF",e[e.DT_UINT8_REF=104]="DT_UINT8_REF",e[e.DT_INT16_REF=105]="DT_INT16_REF",e[e.DT_INT8_REF=106]="DT_INT8_REF",e[e.DT_STRING_REF=107]="DT_STRING_REF",e[e.DT_COMPLEX64_REF=108]="DT_COMPLEX64_REF",e[e.DT_INT64_REF=109]="DT_INT64_REF",e[e.DT_BOOL_REF=110]="DT_BOOL_REF",e[e.DT_QINT8_REF=111]="DT_QINT8_REF",e[e.DT_QUINT8_REF=112]="DT_QUINT8_REF",e[e.DT_QINT32_REF=113]="DT_QINT32_REF",e[e.DT_BFLOAT16_REF=114]="DT_BFLOAT16_REF",e[e.DT_QINT16_REF=115]="DT_QINT16_REF",e[e.DT_QUINT16_REF=116]="DT_QUINT16_REF",e[e.DT_UINT16_REF=117]="DT_UINT16_REF",e[e.DT_COMPLEX128_REF=118]="DT_COMPLEX128_REF",e[e.DT_HALF_REF=119]="DT_HALF_REF",e[e.DT_RESOURCE_REF=120]="DT_RESOURCE_REF",e[e.DT_VARIANT_REF=121]="DT_VARIANT_REF",e[e.DT_UINT32_REF=122]="DT_UINT32_REF",e[e.DT_UINT64_REF=123]="DT_UINT64_REF"})(be||(be={}));var $l;(function(e){(function(t){t[t.LEGACY=0]="LEGACY",t[t.V1=1]="V1",t[t.V2=2]="V2"})(e.CheckpointFormatVersion||(e.CheckpointFormatVersion={}))})($l||($l={}));/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */const y9={};function Df(e){return y9[e]}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function g(e,t,n,s,r){const o=t.inputParams[e];if(o&&o.inputIndexStart!==void 0){const a=o.inputIndexStart,l=o.inputIndexEnd===0?void 0:o.inputIndexEnd===void 0?a+1:o.inputIndexEnd;if(o.type==="tensor")return te(t.inputNames[o.inputIndexStart],n,s,r);if(o.type==="tensors")return t.inputNames.slice(a,l).map(h=>te(h,n,s,r));const c=te(t.inputNames.slice(a)[0],n,s,r),u=c.dataSync();return o.type==="number"?u[0]:Te(c.shape,u)}const i=t.attrParams[e];return i&&i.value}function te(e,t,n,s){const[r,o]=ie(e);if(s!=null){const a=s.getHashTableHandleByName(r);if(a!=null)return a}const i=n.currentContextIds.find(a=>!!t[Rr(r,a)]);return i!==void 0?t[Rr(r,i)][o]:void 0}function b9(e,t,n){return t[Rr(e,n.currentContextId)]}function ze(e,t){const[n,s,r]=ie(e);return[Rr(n,t&&t.currentContextId),s,r]}function Rr(e,t){return t?`${e}-${t}`:e}function ie(e){const t=e.split(":");if(t.length===1)return[e,0,void 0];const n=t[0],s=t.length===3?t[1]:void 0,r=Number(t[t.length-1]);return[n,r,s]}function mr(e,t,n){let s=g("pad",e,t,n);if(s==="explicit"){s=g("explicitPaddings",e,t,n);const r=[[0,0],[0,0],[0,0],[0,0]];for(let o=0;o<4;o++)r[o][0]=s[o*2],r[o][1]=s[o*2+1];return r}return s}function nn(e){return e.kept?e:wn(e)}/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */const _9=[{tfOpName:"Add",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"AddV2",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"AddN",category:"arithmetic",inputs:[{start:0,end:0,name:"tensors",type:"tensors"}]},{tfOpName:"BiasAdd",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0}]},{tfOpName:"Sub",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"RealDiv",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Div",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"DivNoNan",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"FloorDiv",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Mul",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Maximum",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Minimum",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Pow",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"SquaredDifference",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Mod",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"FloorMod",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]}];var w9=Object.freeze({__proto__:null,json:_9});/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */const N9=[{tfOpName:"Abs",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Acos",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Asin",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Atan",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Atan2",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"y",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Ceil",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"ClipByValue",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"clipValueMin",type:"number"},{start:2,name:"clipValueMax",type:"number"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Complex",category:"basic_math",inputs:[{start:0,name:"real",type:"tensor"},{start:1,name:"imag",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"ComplexAbs",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Cos",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Cosh",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Elu",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Exp",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Floor",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Log",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Imag",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"Tout",name:"outputType",type:"dtype",notSupported:!0}]},{tfOpName:"Neg",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Real",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"Tout",name:"outputType",type:"dtype",notSupported:!0}]},{tfOpName:"Prelu",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"alpha",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Relu",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Relu6",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Selu",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Sigmoid",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Sin",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Sinh",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Sqrt",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Rsqrt",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Square",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Tan",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Tanh",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Sign",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Round",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Expm1",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Log1p",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Reciprocal",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Softplus",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Asinh",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Acosh",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Atanh",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Erf",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Prod",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axes",type:"number[]"}],attrs:[{tfName:"keep_dims",name:"keepDims",type:"bool",notSupported:!0},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"LeakyRelu",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"alpha",name:"alpha",type:"number",defaultValue:.2},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"IsNan",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]}];var I9=Object.freeze({__proto__:null,json:N9});/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */const k9=[{tfOpName:"EmptyTensorList",category:"control",inputs:[{start:0,name:"elementShape",type:"shape"},{start:1,name:"maxNumElements",type:"number"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"LoopCond",category:"control",inputs:[{start:0,name:"pred",type:"tensor"}]},{tfOpName:"Switch",category:"control",inputs:[{start:0,name:"data",type:"tensor"},{start:1,name:"pred",type:"tensor"}]},{tfOpName:"Merge",category:"control",inputs:[{start:0,end:0,name:"tensors",type:"tensors"}]},{tfOpName:"Enter",category:"control",inputs:[{start:0,name:"tensor",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"frame_name",name:"frameName",type:"string"},{tfName:"is_constant",name:"isConstant",type:"bool"}]},{tfOpName:"Exit",category:"control",inputs:[{start:0,name:"tensor",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"NextIteration",category:"control",inputs:[{start:0,name:"tensor",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"TensorArrayV3",category:"control",inputs:[{start:0,name:"size",type:"number"}],attrs:[{tfName:"dtype",name:"dtype",type:"dtype"},{tfName:"element_shape",name:"elementShape",type:"shape"},{tfName:"dynamic_size",name:"dynamicSize",type:"bool"},{tfName:"clear_after_read",name:"clearAfterRead",type:"bool"},{tfName:"identical_element_shapes",name:"identicalElementShapes",type:"bool"},{tfName:"tensor_array_name",name:"name",type:"string"}]},{tfOpName:"TensorArrayWriteV3",category:"control",inputs:[{start:0,name:"tensorArrayId",type:"tensor"},{start:1,name:"index",type:"number"},{start:2,name:"tensor",type:"tensor"},{start:3,name:"flowIn",type:"number"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"TensorArrayReadV3",category:"control",inputs:[{start:0,name:"tensorArrayId",type:"tensor"},{start:1,name:"index",type:"number"},{start:2,name:"flowIn",type:"number"}],attrs:[{tfName:"dtype",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"TensorArrayGatherV3",category:"control",inputs:[{start:0,name:"tensorArrayId",type:"tensor"},{start:1,name:"indices",type:"number[]"},{start:2,name:"flowIn",type:"number"}],attrs:[{tfName:"dtype",name:"dtype",type:"dtype"},{tfName:"element_shape",name:"elementShape",type:"shape"}]},{tfOpName:"TensorArrayScatterV3",category:"control",inputs:[{start:0,name:"tensorArrayId",type:"tensor"},{start:1,name:"indices",type:"number[]"},{start:2,name:"tensor",type:"tensor"},{start:3,name:"flowIn",type:"number"}],attrs:[{tfName:"T",name:"dtype",type:"dtype"}]},{tfOpName:"TensorArrayConcatV3",category:"control",inputs:[{start:0,name:"tensorArrayId",type:"tensor"},{start:1,name:"flowIn",type:"number"}],attrs:[{tfName:"dtype",name:"dtype",type:"dtype"},{tfName:"element_shape_except0",name:"elementShapeExcept0",type:"shape",notSupported:!0}]},{tfOpName:"TensorArraySplitV3",category:"control",inputs:[{start:0,name:"tensorArrayId",type:"tensor"},{start:1,name:"tensor",type:"tensor"},{start:2,name:"lengths",type:"number[]"},{start:3,name:"flowIn",type:"number"}],attrs:[{tfName:"T",name:"dtype",type:"dtype"}]},{tfOpName:"TensorArraySizeV3",category:"control",inputs:[{start:0,name:"tensorArrayId",type:"tensor"},{start:1,name:"flowIn",type:"number"}]},{tfOpName:"TensorArrayCloseV3",category:"control",inputs:[{start:0,name:"tensorArrayId",type:"tensor"}]},{tfOpName:"StatelessIf",category:"control",inputs:[{start:0,name:"cond",type:"tensor"},{start:1,end:0,name:"args",type:"tensors"}],attrs:[{tfName:"then_branch",name:"thenBranch",type:"func"},{tfName:"else_branch",name:"elseBranch",type:"func"}]},{tfOpName:"If",category:"control",inputs:[{start:0,name:"cond",type:"tensor"},{start:1,end:0,name:"args",type:"tensors"}],attrs:[{tfName:"then_branch",name:"thenBranch",type:"func"},{tfName:"else_branch",name:"elseBranch",type:"func"}]},{tfOpName:"StatelessWhile",category:"control",inputs:[{start:0,end:0,name:"args",type:"tensors"}],attrs:[{tfName:"cond",name:"cond",type:"func"},{tfName:"body",name:"body",type:"func"}]},{tfOpName:"While",category:"control",inputs:[{start:0,end:0,name:"args",type:"tensors"}],attrs:[{tfName:"cond",name:"cond",type:"func"},{tfName:"body",name:"body",type:"func"}]},{tfOpName:"TensorListScatter",category:"control",inputs:[{start:0,name:"tensor",type:"tensor"},{start:1,name:"indices",type:"number[]"},{start:2,name:"elementShape",type:"shape"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListScatterV2",category:"control",inputs:[{start:0,name:"tensor",type:"tensor"},{start:1,name:"indices",type:"number[]"},{start:2,name:"elementShape",type:"shape"},{start:3,name:"numElements",type:"number"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListGather",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"},{start:1,name:"indices",type:"number[]"},{start:2,name:"elementShape",type:"shape"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListGetItem",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"},{start:1,name:"index",type:"number"},{start:2,name:"elementShape",type:"shape"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListSetItem",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"},{start:1,name:"index",type:"number"},{start:2,name:"tensor",type:"tensor"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListReserve",category:"control",inputs:[{start:0,name:"elementShape",type:"shape"},{start:1,name:"numElements",type:"number"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListFromTensor",category:"control",inputs:[{start:0,name:"tensor",type:"tensor"},{start:1,name:"elementShape",type:"shape"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListStack",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"},{start:1,name:"elementShape",type:"shape"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"},{tfName:"num_elements",name:"numElements",type:"dtype"}]},{tfOpName:"TensorListSplit",category:"control",inputs:[{start:0,name:"tensor",type:"tensor"},{start:1,name:"elementShape",type:"shape"},{start:2,name:"lengths",type:"number[]"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListConcat",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"}],attrs:[{tfName:"element_shape",name:"elementShape",type:"shape"},{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListConcatV2",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"}],attrs:[{tfName:"element_shape",name:"elementShape",type:"shape"},{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListPopBack",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"},{start:1,name:"elementShape",type:"shape"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListPushBack",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"},{start:1,name:"tensor",type:"tensor"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListLength",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"}]},{tfOpName:"TensorListResize",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"},{start:1,name:"size",type:"number"}]}];var S9=Object.freeze({__proto__:null,json:k9});/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */const T9=[{tfOpName:"AvgPool",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0},{tfName:"ksize",name:"kernelSize",type:"number[]"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"MaxPool",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0},{tfName:"ksize",name:"kernelSize",type:"number[]"},{tfName:"explicit_paddings",name:"explicitPaddings",type:"number[]",defaultValue:[],notSupported:!0},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"MaxPoolWithArgmax",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"ksize",name:"kernelSize",type:"number[]"},{tfName:"include_batch_in_index",name:"includeBatchInIndex",type:"bool"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"AvgPool3D",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0},{tfName:"ksize",name:"kernelSize",type:"number[]"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"MaxPool3D",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0},{tfName:"ksize",name:"kernelSize",type:"number[]"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Conv1D",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"filter",type:"tensor"}],attrs:[{tfName:"stride",name:"stride",type:"number"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",defaultValue:"NWC"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"dilation",name:"dilation",type:"number",defaultValue:1}]},{tfOpName:"Conv2D",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"filter",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"useCudnnOnGpu",name:"useCudnnOnGpu",type:"bool"},{tfName:"data_format",name:"dataFormat",type:"string",defaultValue:"NHWC"},{tfName:"explicit_paddings",name:"explicitPaddings",type:"number[]",defaultValue:[]},{tfName:"dilations",name:"dilations",type:"number[]"}]},{tfOpName:"_FusedConv2D",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"filter",type:"tensor"},{start:2,end:0,name:"args",type:"tensors"}],attrs:[{tfName:"num_args",name:"numArgs",type:"number"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"explicit_paddings",name:"explicitPaddings",type:"number[]",defaultValue:[]},{tfName:"use_cudnn_on_gpu",name:"useCudnnOnGpu",type:"bool",defaultValue:!0},{tfName:"data_format",name:"dataFormat",type:"string",defaultValue:"NHWC"},{tfName:"dilations",name:"dilations",type:"number[]",defaultValue:[1,1,1,1]},{tfName:"fused_ops",name:"fusedOps",type:"string[]",defaultValue:[]},{tfName:"epsilon",name:"epsilon",type:"number",defaultValue:1e-4},{tfName:"leakyrelu_alpha",name:"leakyreluAlpha",type:"number",defaultValue:.2}]},{tfOpName:"Conv2DBackpropInput",category:"convolution",inputs:[{start:2,name:"x",type:"tensor"},{start:1,name:"filter",type:"tensor"},{start:0,name:"outputShape",type:"number[]"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0},{tfName:"explicit_paddings",name:"explicitPaddings",type:"number[]",defaultValue:[]},{tfName:"dilations",name:"dilations",type:"number[]",notSupported:!0}]},{tfOpName:"DepthwiseConv2d",category:"convolution",inputs:[{start:0,name:"input",type:"tensor"},{start:1,name:"filter",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",defaultValue:"NHWC"},{tfName:"explicit_paddings",name:"explicitPaddings",type:"number[]",defaultValue:[]},{tfName:"dilations",name:"dilations",type:"number[]"}]},{tfOpName:"DepthwiseConv2dNative",category:"convolution",inputs:[{start:0,name:"input",type:"tensor"},{start:1,name:"filter",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",defaultValue:"NHWC"},{tfName:"explicit_paddings",name:"explicitPaddings",type:"number[]",defaultValue:[]},{tfName:"dilations",name:"dilations",type:"number[]"}]},{tfOpName:"FusedDepthwiseConv2dNative",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"filter",type:"tensor"},{start:2,end:0,name:"args",type:"tensors"}],attrs:[{tfName:"num_args",name:"numArgs",type:"number"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",defaultValue:"NHWC"},{tfName:"dilations",name:"dilations",type:"number[]",defaultValue:[1,1,1,1]},{tfName:"fused_ops",name:"fusedOps",type:"string[]",defaultValue:[]},{tfName:"explicit_paddings",name:"explicitPaddings",type:"number[]",defaultValue:[]}]},{tfOpName:"Conv3D",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"filter",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",defaultValue:"NHWC"},{tfName:"dilations",name:"dilations",type:"number[]"}]},{tfOpName:"Dilation2D",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"filter",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"rates",name:"dilations",type:"number[]"},{tfName:"padding",name:"pad",type:"string"}]}];var E9=Object.freeze({__proto__:null,json:T9});/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */const v9=[{tfOpName:"Fill",category:"creation",inputs:[{start:0,name:"shape",type:"number[]"},{start:1,name:"value",type:"number"}],attrs:[{tfName:"T",name:"dtype",type:"dtype"}]},{tfOpName:"LinSpace",category:"creation",inputs:[{start:0,name:"start",type:"number"},{start:1,name:"stop",type:"number"},{start:2,name:"num",type:"number"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"OneHot",category:"creation",inputs:[{start:0,name:"indices",type:"tensor"},{start:1,name:"depth",type:"number"},{start:2,name:"onValue",type:"number",defaultValue:1},{start:3,name:"offValue",type:"number",defaultValue:0}],attrs:[{tfName:"axis",name:"axis",type:"number",notSupported:!0},{tfName:"T",name:"dtype",type:"dtype"}]},{tfOpName:"Ones",category:"creation",inputs:[{start:0,name:"shape",type:"number[]"}],attrs:[{tfName:"T",name:"dtype",type:"dtype"}]},{tfOpName:"OnesLike",category:"creation",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"dtype",name:"dtype",type:"dtype"}]},{tfOpName:"RandomStandardNormal",category:"creation",inputs:[{start:0,name:"shape",type:"number[]"}],attrs:[{tfName:"seed",name:"seed",type:"number",defaultValue:0},{tfName:"seed2",name:"seed2",type:"number",defaultValue:0,notSupported:!0},{tfName:"dtype",name:"dtype",type:"dtype"},{tfName:"T",name:"T",type:"number",notSupported:!0}]},{tfOpName:"RandomUniform",category:"creation",inputs:[{start:0,name:"shape",type:"number[]"}],attrs:[{tfName:"minval",name:"minval",type:"number",defaultValue:0},{tfName:"maxval",name:"maxval",type:"number",defaultValue:1},{tfName:"dtype",name:"dtype",type:"dtype"},{tfName:"seed",name:"seed",type:"number",defaultValue:0},{tfName:"seed2",name:"seed2",type:"number",defaultValue:0,notSupported:!0},{tfName:"T",name:"T",type:"number",notSupported:!0}]},{tfOpName:"Range",category:"creation",inputs:[{start:0,name:"start",type:"number"},{start:1,name:"stop",type:"number"},{start:2,name:"step",type:"number",defaultValue:0}],attrs:[{tfName:"Tidx",name:"dtype",type:"dtype"}]},{tfOpName:"TruncatedNormal",category:"creation",inputs:[{start:0,name:"shape",type:"number[]"}],attrs:[{tfName:"means",name:"mean",type:"number",defaultValue:0},{tfName:"stddev",name:"stdDev",type:"number",defaultValue:1},{tfName:"seed",name:"seed",type:"number"},{tfName:"seed2",name:"seed2",type:"number",defaultValue:0,notSupported:!0},{tfName:"dtype",name:"dtype",type:"dtype"},{tfName:"T",name:"T",type:"number",notSupported:!0}]},{tfOpName:"Zeros",category:"creation",inputs:[{start:0,name:"shape",type:"number[]"}],attrs:[{tfName:"T",name:"dtype",type:"dtype"}]},{tfOpName:"ZerosLike",category:"creation",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype"}]},{tfOpName:"Multinomial",category:"creation",inputs:[{start:0,name:"logits",type:"tensor"},{start:1,name:"numSamples",type:"number"}],attrs:[{tfName:"seed",name:"seed",type:"number"},{tfName:"seed2",name:"seed2",type:"number"},{tfName:"T",name:"dtype",type:"dtype"},{tfName:"output_dtype",name:"output_dtype",type:"dtype"}]}];var x9=Object.freeze({__proto__:null,json:v9});/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */const $9=[{tfOpName:"NonMaxSuppressionV2",category:"dynamic",inputs:[{start:0,name:"boxes",type:"tensor"},{start:1,name:"scores",type:"tensor"},{start:2,name:"maxOutputSize",type:"number"},{start:3,name:"iouThreshold",type:"number"}]},{tfOpName:"NonMaxSuppressionV3",category:"dynamic",inputs:[{start:0,name:"boxes",type:"tensor"},{start:1,name:"scores",type:"tensor"},{start:2,name:"maxOutputSize",type:"number"},{start:3,name:"iouThreshold",type:"number"},{start:4,name:"scoreThreshold",type:"number"}]},{tfOpName:"NonMaxSuppressionV4",category:"dynamic",inputs:[{start:0,name:"boxes",type:"tensor"},{start:1,name:"scores",type:"tensor"},{start:2,name:"maxOutputSize",type:"number"},{start:3,name:"iouThreshold",type:"number"},{start:4,name:"scoreThreshold",type:"number"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"T_threshold",name:"threshold",type:"dtype",notSupported:!0},{tfName:"pad_to_max_output_size",name:"padToMaxOutputSize",type:"bool"}]},{tfOpName:"NonMaxSuppressionV5",category:"dynamic",inputs:[{start:0,name:"boxes",type:"tensor"},{start:1,name:"scores",type:"tensor"},{start:2,name:"maxOutputSize",type:"number"},{start:3,name:"iouThreshold",type:"number"},{start:4,name:"scoreThreshold",type:"number"},{start:5,name:"softNmsSigma",type:"number"}]},{tfOpName:"Where",category:"dynamic",inputs:[{start:0,name:"condition",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"ListDiff",category:"dynamic",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"y",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]}];var A9=Object.freeze({__proto__:null,json:$9});/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */const D9=[{tfOpName:"LowerBound",category:"evaluation",inputs:[{start:0,name:"sortedSequence",type:"tensor"},{start:1,name:"values",type:"tensor"}]},{tfOpName:"TopKV2",category:"evaluation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"k",type:"number"}],attrs:[{tfName:"sorted",name:"sorted",type:"bool"}]},{tfOpName:"UpperBound",category:"evaluation",inputs:[{start:0,name:"sortedSequence",type:"tensor"},{start:1,name:"values",type:"tensor"}]},{tfOpName:"Unique",category:"evaluation",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"UniqueV2",category:"evaluation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number"}]}];var R9=Object.freeze({__proto__:null,json:D9});/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */const O9=[{tfOpName:"PlaceholderWithDefault",category:"graph",inputs:[{start:0,name:"default",type:"tensor"}],attrs:[{tfName:"shape",name:"shape",type:"shape"},{tfName:"dtype",name:"dtype",type:"dtype"}]},{tfOpName:"Placeholder",category:"graph",attrs:[{tfName:"shape",name:"shape",type:"shape"},{tfName:"dtype",name:"dtype",type:"dtype"}]},{tfOpName:"Const",category:"graph"},{tfOpName:"Identity",category:"graph",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"IdentityN",category:"graph",inputs:[{start:0,end:0,name:"x",type:"tensors"}]},{tfOpName:"Snapshot",category:"graph",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"Rank",category:"graph",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"Size",category:"graph",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"Shape",category:"graph",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"ShapeN",category:"graph",inputs:[{start:0,end:0,name:"x",type:"tensors"}]},{tfOpName:"Print",category:"graph",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"data",type:"tensors"}],attrs:[{tfName:"message",name:"message",type:"string"},{tfName:"first_n",name:"firstN",type:"number",notSupported:!0},{tfName:"summarize",name:"summarize",type:"number",defaultValue:3}]},{tfOpName:"NoOp",category:"graph",inputs:[]},{tfOpName:"StopGradient",category:"graph",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"FakeQuantWithMinMaxVars",category:"graph",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"min",name:"min",type:"number"},{tfName:"max",name:"max",type:"number"}]}];var L9=Object.freeze({__proto__:null,json:O9});/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */const F9=[{tfOpName:"HashTable",category:"hash_table",inputs:[],attrs:[{tfName:"shared_name",name:"sharedName",type:"string"},{tfName:"use_node_name_sharing",name:"useNodeNameSharing",type:"bool"},{tfName:"key_dtype",name:"keyDType",type:"dtype"},{tfName:"value_dtype",name:"valueDType",type:"dtype"}]},{tfOpName:"HashTableV2",category:"hash_table",inputs:[],attrs:[{tfName:"shared_name",name:"sharedName",type:"string"},{tfName:"use_node_name_sharing",name:"useNodeNameSharing",type:"bool"},{tfName:"key_dtype",name:"keyDType",type:"dtype"},{tfName:"value_dtype",name:"valueDType",type:"dtype"}]},{tfOpName:"LookupTableImport",category:"hash_table",inputs:[{start:0,name:"tableHandle",type:"tensor"},{start:1,name:"keys",type:"tensor"},{start:2,name:"values",type:"tensor"}],attrs:[{tfName:"Tin",name:"tIn",type:"dtype",notSupported:!0},{tfName:"Tout",name:"tOut",type:"dtype",notSupported:!0}]},{tfOpName:"LookupTableImportV2",category:"hash_table",inputs:[{start:0,name:"tableHandle",type:"tensor"},{start:1,name:"keys",type:"tensor"},{start:2,name:"values",type:"tensor"}],attrs:[{tfName:"Tin",name:"tIn",type:"dtype",notSupported:!0},{tfName:"Tout",name:"tOut",type:"dtype",notSupported:!0}]},{tfOpName:"LookupTableFind",category:"hash_table",inputs:[{start:0,name:"tableHandle",type:"tensor"},{start:1,name:"keys",type:"tensor"},{start:2,name:"defaultValue",type:"tensor"}],attrs:[{tfName:"Tin",name:"tIn",type:"dtype",notSupported:!0},{tfName:"Tout",name:"tOut",type:"dtype",notSupported:!0}]},{tfOpName:"LookupTableFindV2",category:"hash_table",inputs:[{start:0,name:"tableHandle",type:"tensor"},{start:1,name:"keys",type:"tensor"},{start:2,name:"defaultValue",type:"tensor"}],attrs:[{tfName:"Tin",name:"tIn",type:"dtype",notSupported:!0},{tfName:"Tout",name:"tOut",type:"dtype",notSupported:!0}]},{tfOpName:"LookupTableSize",category:"hash_table",inputs:[{start:0,name:"tableHandle",type:"tensor"}]},{tfOpName:"LookupTableSizeV2",category:"hash_table",inputs:[{start:0,name:"tableHandle",type:"tensor"}]}];var P9=Object.freeze({__proto__:null,json:F9});/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */const U9=[{tfOpName:"ResizeBilinear",category:"image",inputs:[{start:0,name:"images",type:"tensor"},{start:1,name:"size",type:"number[]"}],attrs:[{tfName:"align_corners",name:"alignCorners",type:"bool"},{tfName:"half_pixel_centers",name:"halfPixelCenters",type:"bool"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"ResizeNearestNeighbor",category:"image",inputs:[{start:0,name:"images",type:"tensor"},{start:1,name:"size",type:"number[]"}],attrs:[{tfName:"align_corners",name:"alignCorners",type:"bool"},{tfName:"half_pixel_centers",name:"halfPixelCenters",type:"bool"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"CropAndResize",category:"image",inputs:[{start:0,name:"image",type:"tensor"},{start:1,name:"boxes",type:"tensor"},{start:2,name:"boxInd",type:"tensor"},{start:3,name:"cropSize",type:"number[]"}],attrs:[{tfName:"method",name:"method",type:"string"},{tfName:"extrapolation_value",name:"extrapolationValue",type:"number"}]},{tfOpName:"ImageProjectiveTransformV3",category:"image",inputs:[{start:0,name:"images",type:"tensor"},{start:1,name:"transforms",type:"tensor"},{start:2,name:"outputShape",type:"number[]"},{start:3,name:"fillValue",type:"number"}],attrs:[{tfName:"interpolation",name:"interpolation",type:"string"},{tfName:"fill_mode",name:"fillMode",type:"string"}]}];var M9=Object.freeze({__proto__:null,json:U9});/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */const V9=[{tfOpName:"Equal",category:"logical",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"NotEqual",category:"logical",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Greater",category:"logical",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"GreaterEqual",category:"logical",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Less",category:"logical",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"LessEqual",category:"logical",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"LogicalAnd",category:"logical",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"LogicalNot",category:"logical",inputs:[{start:0,name:"a",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"LogicalOr",category:"logical",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Select",category:"logical",inputs:[{start:0,name:"condition",type:"tensor"},{start:1,name:"a",type:"tensor"},{start:2,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"SelectV2",category:"logical",inputs:[{start:0,name:"condition",type:"tensor"},{start:1,name:"a",type:"tensor"},{start:2,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]}];var B9=Object.freeze({__proto__:null,json:V9});/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */const C9=[{tfOpName:"_FusedMatMul",category:"matrices",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"},{start:2,end:0,name:"args",type:"tensors"}],attrs:[{tfName:"num_args",name:"numArgs",type:"number"},{tfName:"fused_ops",name:"fusedOps",type:"string[]",defaultValue:[]},{tfName:"epsilon",name:"epsilon",type:"number",defaultValue:1e-4},{tfName:"transpose_a",name:"transposeA",type:"bool",defaultValue:!1},{tfName:"transpose_b",name:"transposeB",type:"bool",defaultValue:!1},{tfName:"leakyrelu_alpha",name:"leakyreluAlpha",type:"number",defaultValue:.2},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"MatMul",category:"matrices",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"transpose_a",name:"transposeA",type:"bool",defaultValue:!1},{tfName:"transpose_b",name:"transposeB",type:"bool",defaultValue:!1},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"BatchMatMul",category:"matrices",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"adj_x",name:"transposeA",type:"bool",defaultValue:!1},{tfName:"adj_y",name:"transposeB",type:"bool",defaultValue:!1},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"BatchMatMulV2",category:"matrices",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"adj_x",name:"transposeA",type:"bool",defaultValue:!1},{tfName:"adj_y",name:"transposeB",type:"bool",defaultValue:!1},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Transpose",category:"matrices",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"perm",type:"number[]"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Einsum",category:"matrices",inputs:[{start:0,end:0,name:"tensors",type:"tensors"}],attrs:[{tfName:"equation",name:"equation",type:"string"},{tfName:"N",name:"n",type:"number",defaultValue:2},{tfName:"T",name:"dtype",type:"dtype"}]}];var z9=Object.freeze({__proto__:null,json:C9});/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */const W9=[{tfOpName:"EuclideanNorm",category:"normalization",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}],attrs:[{tfName:"keep_dims",name:"keepDims",type:"bool",defaultValue:!1}]},{tfOpName:"FusedBatchNorm",category:"normalization",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"scale",type:"tensor"},{start:2,name:"offset",type:"tensor"},{start:3,name:"mean",type:"tensor"},{start:4,name:"variance",type:"tensor"}],attrs:[{tfName:"epsilon",name:"epsilon",type:"number",defaultValue:.001},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0}]},{tfOpName:"FusedBatchNormV2",category:"normalization",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"scale",type:"tensor"},{start:2,name:"offset",type:"tensor"},{start:3,name:"mean",type:"tensor"},{start:4,name:"variance",type:"tensor"}],attrs:[{tfName:"epsilon",name:"epsilon",type:"number",defaultValue:.001},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0}]},{tfOpName:"FusedBatchNormV3",category:"normalization",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"scale",type:"tensor"},{start:2,name:"offset",type:"tensor"},{start:3,name:"mean",type:"tensor"},{start:4,name:"variance",type:"tensor"}],attrs:[{tfName:"epsilon",name:"epsilon",type:"number",defaultValue:.001},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0}]},{tfOpName:"LRN",category:"normalization",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"depth_radius",name:"radius",type:"number",defaultValue:5},{tfName:"bias",name:"bias",type:"number",defaultValue:1},{tfName:"alpha",name:"alpha",type:"number",defaultValue:1},{tfName:"beta",name:"beta",type:"number",defaultValue:.5}]},{tfOpName:"Softmax",category:"normalization",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"LogSoftmax",category:"normalization",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"SparseToDense",category:"normalization",inputs:[{start:0,name:"sparseIndices",type:"tensor"},{start:1,name:"outputShape",type:"number[]"},{start:2,name:"sparseValues",type:"tensor"},{start:3,name:"defaultValue",type:"tensor"}],attrs:[{tfName:"validate_indices",name:"validateIndices",type:"bool",defaultValue:!0,notSupported:!0}]}];var H9=Object.freeze({__proto__:null,json:W9});/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */const q9=[{tfOpName:"Bincount",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"size",type:"number"},{start:2,name:"weights",type:"tensor"}]},{tfOpName:"DenseBincount",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"size",type:"number"},{start:2,name:"weights",type:"tensor"}],attrs:[{tfName:"binary_output",name:"binaryOutput",type:"bool"}]},{tfOpName:"Max",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}],attrs:[{tfName:"keep_dims",name:"keepDims",type:"bool"}]},{tfOpName:"Mean",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}],attrs:[{tfName:"keep_dims",name:"keepDims",type:"bool"}]},{tfOpName:"Min",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}],attrs:[{tfName:"keep_dims",name:"keepDims",type:"bool"}]},{tfOpName:"Sum",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}],attrs:[{tfName:"keep_dims",name:"keepDims",type:"bool"}]},{tfOpName:"All",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}],attrs:[{tfName:"keep_dims",name:"keepDims",type:"bool"}]},{tfOpName:"Any",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}],attrs:[{tfName:"keep_dims",name:"keepDims",type:"bool"}]},{tfOpName:"ArgMax",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number"}]},{tfOpName:"ArgMin",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number"}]},{tfOpName:"Prod",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}],attrs:[{tfName:"keep_dims",name:"keepDims",type:"bool"}]},{tfOpName:"Cumprod",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number"}],attrs:[{tfName:"exclusive",name:"exclusive",type:"bool"},{tfName:"reverse",name:"reverse",type:"bool"}]},{tfOpName:"Cumsum",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number"}],attrs:[{tfName:"exclusive",name:"exclusive",type:"bool"},{tfName:"reverse",name:"reverse",type:"bool"}]}];var G9=Object.freeze({__proto__:null,json:q9});/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */const K9=[{tfOpName:"ConcatV2",category:"slice_join",inputs:[{start:0,end:-1,name:"tensors",type:"tensors"},{start:-1,name:"axis",type:"number"}],attrs:[{tfName:"N",name:"n",type:"number",defaultValue:2}]},{tfOpName:"Concat",category:"slice_join",inputs:[{start:1,end:0,name:"tensors",type:"tensors"},{start:0,name:"axis",type:"number"}],attrs:[{tfName:"N",name:"n",type:"number",defaultValue:2}]},{tfOpName:"GatherV2",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"indices",type:"tensor"},{start:2,name:"axis",type:"number",defaultValue:0}],attrs:[{tfName:"batch_dims",name:"batchDims",type:"number",defaultValue:0}]},{tfOpName:"Gather",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"indices",type:"tensor"}],attrs:[{tfName:"validate_indices",name:"validateIndices",type:"bool",notSupported:!0}]},{tfOpName:"Reverse",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"dims",type:"bool[]"}]},{tfOpName:"ReverseV2",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}]},{tfOpName:"Slice",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"begin",type:"number[]"},{start:2,name:"size",type:"number[]"}]},{tfOpName:"StridedSlice",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"begin",type:"number[]"},{start:2,name:"end",type:"number[]"},{start:3,name:"strides",type:"number[]"}],attrs:[{tfName:"begin_mask",name:"beginMask",type:"number",defaultValue:0},{tfName:"end_mask",name:"endMask",type:"number",defaultValue:0},{tfName:"new_axis_mask",name:"newAxisMask",type:"number",defaultValue:0},{tfName:"ellipsis_mask",name:"ellipsisMask",type:"number",defaultValue:0},{tfName:"shrink_axis_mask",name:"shrinkAxisMask",type:"number",defaultValue:0}]},{tfOpName:"Pack",category:"slice_join",inputs:[{start:0,end:0,name:"tensors",type:"tensors"}],attrs:[{tfName:"axis",name:"axis",type:"number",defaultValue:0}]},{tfOpName:"Unpack",category:"slice_join",inputs:[{start:0,name:"tensor",type:"tensor"}],attrs:[{tfName:"axis",name:"axis",type:"number",defaultValue:0},{tfName:"num",name:"num",type:"number",defaultValue:0,notSupported:!0}]},{tfOpName:"Tile",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"reps",type:"number[]"}]},{tfOpName:"Split",category:"slice_join",inputs:[{start:0,name:"axis",type:"number",defaultValue:0},{start:1,name:"x",type:"tensor"}],attrs:[{tfName:"num_split",name:"numOrSizeSplits",type:"number",defaultValue:1}]},{tfOpName:"SplitV",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"numOrSizeSplits",type:"number[]"},{start:2,name:"axis",type:"number",defaultValue:0}]},{tfOpName:"ScatterNd",category:"slice_join",inputs:[{start:0,name:"indices",type:"tensor"},{start:1,name:"values",type:"tensor"},{start:2,name:"shape",type:"number[]"}]},{tfOpName:"GatherNd",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"indices",type:"tensor"}]},{tfOpName:"SparseToDense",category:"slice_join",inputs:[{start:0,name:"sparseIndices",type:"tensor"},{start:1,name:"outputShape",type:"number[]"},{start:2,name:"sparseValues",type:"tensor"},{start:3,name:"defaultValue",type:"tensor"}],attrs:[{tfName:"validate_indices",name:"validateIndices",type:"bool",defaultValue:!1,notSupported:!0}]}];var j9=Object.freeze({__proto__:null,json:K9});/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */const X9=[{tfOpName:"SparseFillEmptyRows",category:"sparse",inputs:[{start:0,name:"indices",type:"tensor"},{start:1,name:"values",type:"tensor"},{start:2,name:"denseShape",type:"tensor"},{start:3,name:"defaultValue",type:"tensor"}]},{tfOpName:"SparseReshape",category:"sparse",inputs:[{start:0,name:"inputIndices",type:"tensor"},{start:1,name:"inputShape",type:"tensor"},{start:2,name:"newShape",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"SparseSegmentMean",category:"sparse",inputs:[{start:0,name:"data",type:"tensor"},{start:1,name:"indices",type:"tensor"},{start:2,name:"segmentIds",type:"tensor"}]},{tfOpName:"SparseSegmentSum",category:"sparse",inputs:[{start:0,name:"data",type:"tensor"},{start:1,name:"indices",type:"tensor"},{start:2,name:"segmentIds",type:"tensor"}]}];var Y9=Object.freeze({__proto__:null,json:X9});/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */const Z9=[{tfOpName:"FFT",category:"spectral",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"IFFT",category:"spectral",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"RFFT",category:"spectral",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"fft_length",type:"number",notSupported:!0}]},{tfOpName:"IRFFT",category:"spectral",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"fft_length",type:"number",notSupported:!0}]}];var J9=Object.freeze({__proto__:null,json:Z9});/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */const Q9=[{tfOpName:"StringNGrams",category:"string",inputs:[{start:0,name:"data",type:"tensor"},{start:1,name:"dataSplits",type:"tensor"}],attrs:[{tfName:"separator",name:"separator",type:"string"},{tfName:"ngram_widths",name:"nGramWidths",type:"number[]"},{tfName:"left_pad",name:"leftPad",type:"string"},{tfName:"right_pad",name:"rightPad",type:"string"},{tfName:"pad_width",name:"padWidth",type:"number"},{tfName:"preserve_short_sequences",name:"preserveShortSequences",type:"bool"}],outputs:["ngrams","ngrams_splits"]},{tfOpName:"StringSplit",category:"string",inputs:[{start:0,name:"input",type:"tensor"},{start:1,name:"delimiter",type:"tensor"}],attrs:[{tfName:"skip_empty",name:"skipEmpty",type:"bool"}],outputs:["indices","values","shape"]},{tfOpName:"StringToHashBucketFast",category:"string",inputs:[{start:0,name:"input",type:"tensor"}],attrs:[{tfName:"num_buckets",name:"numBuckets",type:"number"}]}];var t3=Object.freeze({__proto__:null,json:Q9});/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */const e3=[{tfOpName:"Cast",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"SrcT",name:"sdtype",type:"dtype",notSupported:!0},{tfName:"DstT",name:"dtype",type:"dtype"}]},{tfOpName:"ExpandDims",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number"}]},{tfOpName:"MirrorPad",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"padding",type:"number[]"}],attrs:[{tfName:"mode",name:"mode",type:"string"}]},{tfOpName:"Pad",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"padding",type:"number[]"}],attrs:[{tfName:"constant_value",name:"constantValue",type:"number",defaultValue:0}]},{tfOpName:"PadV2",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"padding",type:"number[]"},{start:2,name:"constantValue",type:"number",defaultValue:0}]},{tfOpName:"Reshape",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"shape",type:"number[]"}]},{tfOpName:"Squeeze",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"axis",tfDeprecatedName:"squeeze_dims",name:"axis",type:"number[]"}]},{tfOpName:"SpaceToBatchND",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"blockShape",type:"number[]"},{start:2,name:"paddings",type:"number[]"}]},{tfOpName:"BatchToSpaceND",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"blockShape",type:"number[]"},{start:2,name:"crops",type:"number[]"}]},{tfOpName:"DepthToSpace",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"block_size",name:"blockSize",type:"number"},{tfName:"data_format",name:"dataFormat",type:"string"}]},{tfOpName:"BroadcastTo",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"shape",type:"number[]"}],attrs:[]},{tfOpName:"BroadcastArgs",category:"transformation",inputs:[{start:0,name:"s0",type:"tensor"},{start:1,name:"s1",type:"tensor"}],attrs:[]}];var n3=Object.freeze({__proto__:null,json:e3});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */class Al{static get Instance(){return this._instance||(this._instance=new this)}constructor(){const t=[w9,I9,S9,E9,x9,A9,R9,L9,P9,M9,B9,z9,H9,G9,j9,Y9,J9,t3,n3],n=[].concat(...t.map(s=>s.json));this.opMappers=n.reduce((s,r)=>(s[r.tfOpName]=r,s),{})}transformGraph(t,n={}){const s=t.node,r=[],o=[],i=[],a=s.reduce((y,m)=>(y[m.name]=this.mapNode(m),m.op.startsWith("Placeholder")?r.push(y[m.name]):m.op==="Const"?o.push(y[m.name]):(m.input==null||m.input.length===0)&&i.push(y[m.name]),y),{});let l=[];const c=[];let u={},f={};n!=null&&(u=this.mapSignatureEntries(n.inputs),f=this.mapSignatureEntries(n.outputs));const h=Object.keys(a);h.forEach(y=>{const m=a[y];m.inputNames.forEach((b,_)=>{const[w,,N]=ze(b),I=a[w];if(I.outputs!=null){const S=I.outputs.indexOf(N);if(S!==-1){const E=`${w}:${S}`;m.inputNames[_]=E}}m.inputs.push(I),I.children.push(m)})}),Object.keys(f).length===0?h.forEach(y=>{const m=a[y];m.children.length===0&&c.push(m)}):Object.keys(f).forEach(y=>{const[m]=ze(y),b=a[m];b!=null&&(b.signatureKey=f[y],c.push(b))}),Object.keys(u).length>0?Object.keys(u).forEach(y=>{const[m]=ze(y),b=a[m];b&&(b.signatureKey=u[y],l.push(b))}):l=r;let p={};t.library!=null&&t.library.function!=null&&(p=t.library.function.reduce((y,m)=>(y[m.signature.name]=this.mapFunction(m),y),{}));const d={nodes:a,inputs:l,outputs:c,weights:o,placeholders:r,signature:n,functions:p};return i.length>0&&(d.initNodes=i),d}mapSignatureEntries(t){return Object.keys(t||{}).reduce((n,s)=>(n[t[s].name]=s,n),{})}mapNode(t){const n=Df(t.op)||this.opMappers[t.op]||{};t.attr==null&&(t.attr={});const s={name:t.name,op:t.op,category:n.category,inputNames:(t.input||[]).map(r=>r.startsWith("^")?r.slice(1):r),inputs:[],children:[],inputParams:{},attrParams:{},rawAttrs:t.attr,outputs:n.outputs};return n.inputs!=null&&(s.inputParams=n.inputs.reduce((r,o)=>(r[o.name]={type:o.type,inputIndexStart:o.start,inputIndexEnd:o.end},r),{})),n.attrs!=null&&(s.attrParams=n.attrs.reduce((r,o)=>{const i=o.type;let a;switch(o.type){case"string":a=Ko(t.attr,o.tfName,o.defaultValue),a===void 0&&o.tfDeprecatedName&&(a=Ko(t.attr,o.tfDeprecatedName,o.defaultValue));break;case"string[]":a=ti(t.attr,o.tfName,o.defaultValue),a===void 0&&o.tfDeprecatedName&&(a=ti(t.attr,o.tfDeprecatedName,o.defaultValue));break;case"number":a=Xo(t.attr,o.tfName,o.defaultValue||0),a===void 0&&o.tfDeprecatedName&&(a=Xo(t.attr,o.tfDeprecatedName,o.defaultValue));break;case"number[]":a=Qo(t.attr,o.tfName,o.defaultValue),a===void 0&&o.tfDeprecatedName&&(a=Qo(t.attr,o.tfDeprecatedName,o.defaultValue));break;case"bool":a=jo(t.attr,o.tfName,o.defaultValue),a===void 0&&o.tfDeprecatedName&&(a=jo(t.attr,o.tfDeprecatedName,o.defaultValue));break;case"bool[]":a=ni(t.attr,o.tfName,o.defaultValue),a===void 0&&o.tfDeprecatedName&&(a=ni(t.attr,o.tfDeprecatedName,o.defaultValue));break;case"shape":a=Jo(t.attr,o.tfName,o.defaultValue),a===void 0&&o.tfDeprecatedName&&(a=Jo(t.attr,o.tfDeprecatedName,o.defaultValue));break;case"shape[]":a=ei(t.attr,o.tfName,o.defaultValue),a===void 0&&o.tfDeprecatedName&&(a=ei(t.attr,o.tfDeprecatedName,o.defaultValue));break;case"dtype":a=Yo(t.attr,o.tfName,o.defaultValue),a===void 0&&o.tfDeprecatedName&&(a=Yo(t.attr,o.tfDeprecatedName,o.defaultValue));break;case"dtype[]":a=Zo(t.attr,o.tfName,o.defaultValue),a===void 0&&o.tfDeprecatedName&&(a=Zo(t.attr,o.tfDeprecatedName,o.defaultValue));break;case"func":a=Dl(t.attr,o.tfName,o.defaultValue),a===void 0&&o.tfDeprecatedName&&(a=Dl(t.attr,o.tfDeprecatedName,o.defaultValue));break;case"tensor":case"tensors":break;default:throw new Error(`Unsupported param type: ${o.type} for op: ${t.op}`)}return r[o.name]={value:a,type:i},r},{})),s}mapFunction(t){const n=t.nodeDef,s=[],r=[];let o={};n!=null&&(o=n.reduce((f,h)=>(f[h.name]=this.mapNode(h),h.op==="Const"&&r.push(f[h.name]),f),{}));const i=[],a=[];t.signature.inputArg.forEach(f=>{const[h]=ze(f.name),p={name:h,op:"Placeholder",inputs:[],inputNames:[],category:"graph",inputParams:{},attrParams:{dtype:{value:Ha(f.type),type:"dtype"}},children:[]};p.signatureKey=f.name,i.push(p),o[h]=p}),Object.keys(o).forEach(f=>{const h=o[f];h.inputNames.forEach((p,d)=>{const[y,,m]=ze(p),b=o[y];if(b.outputs!=null){const _=b.outputs.indexOf(m);if(_!==-1){const w=`${y}:${_}`;h.inputNames[d]=w}}h.inputs.push(b),b.children.push(h)})});const c=t.ret;t.signature.outputArg.forEach(f=>{const[h,p]=ze(c[f.name]),d=o[h];d!=null&&(d.defaultOutput=p,a.push(d))});const u=this.mapArgsToSignature(t);return{nodes:o,inputs:i,outputs:a,weights:r,placeholders:s,signature:u}}mapArgsToSignature(t){return{methodName:t.signature.name,inputs:t.signature.inputArg.reduce((n,s)=>(n[s.name]=this.mapArgToTensorInfo(s),n),{}),outputs:t.signature.outputArg.reduce((n,s)=>(n[s.name]=this.mapArgToTensorInfo(s,t.ret),n),{})}}mapArgToTensorInfo(t,n){let s=t.name;return n!=null&&(s=n[s]),{name:s,dtype:t.type}}}function s3(e){const t=lt().global;if(typeof t.atob<"u")return t.atob(e);if(typeof Buffer<"u")return new Buffer(e,"base64").toString();throw new Error("Unable to decode base64 in this environment. Missing built-in atob() or Buffer()")}function Rf(e,t){const n=Array.isArray(e)?String.fromCharCode.apply(null,e):s3(e);return t?n:n.toLowerCase()}function Ko(e,t,n,s=!1){const r=e[t];return r!=null?Rf(r.s,s):n}function jo(e,t,n){const s=e[t];return s?s.b:n}function Xo(e,t,n){const s=e[t]||{},r=s.i!=null?s.i:s.f!=null?s.f:n;return typeof r=="number"?r:parseInt(r,10)}function Ha(e){switch(typeof e=="string"&&(e=be[e]),e){case be.DT_FLOAT:case be.DT_HALF:return"float32";case be.DT_INT32:case be.DT_INT64:case be.DT_INT8:case be.DT_UINT8:return"int32";case be.DT_BOOL:return"bool";case be.DT_DOUBLE:return"float32";case be.DT_STRING:return"string";default:return null}}function Dl(e,t,n){const s=e[t];return s&&s.func?s.func.name:n}function Yo(e,t,n){const s=e[t];return s&&s.type?Ha(s.type):n}function Zo(e,t,n){const s=e[t];return s&&s.list&&s.list.type?s.list.type.map(r=>Ha(r)):n}function Of(e){if(!e.unknownRank)return e.dim!=null?e.dim.map(t=>typeof t.size=="number"?t.size:parseInt(t.size,10)):[]}function Jo(e,t,n){const s=e[t];return s&&s.shape?Of(s.shape):n}function Qo(e,t,n){const s=e[t];return s?((s.list.f&&s.list.f.length?s.list.f:s.list.i)||[]).map(r=>typeof r=="number"?r:parseInt(r,10)):n}function ti(e,t,n,s=!1){const r=e[t];return r&&r.list&&r.list.s?r.list.s.map(o=>Rf(o,s)):n}function ei(e,t,n){const s=e[t];return s&&s.list&&s.list.shape?s.list.shape.map(r=>Of(r)):n}function ni(e,t,n){const s=e[t];return s&&s.list&&s.list.b?s.list.b:n}/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */class r3{constructor(t,n,s){this.node=t,this.tensorMap=n,this.context=s,this.inputs=[],this.attrs={},this.inputs=t.inputNames.map(r=>this.getInput(r)),t.rawAttrs!=null&&(this.attrs=Object.keys(t.rawAttrs).reduce((r,o)=>(r[o]=this.getAttr(o),r),{}))}getInput(t){return te(t,this.tensorMap,this.context)}getAttr(t,n){const s=this.node.rawAttrs[t];if(s.tensor!=null)return te(t,this.tensorMap,this.context);if(s.i!=null||s.f!=null)return Xo(this.node.rawAttrs,t,n);if(s.s!=null)return Ko(this.node.rawAttrs,t,n);if(s.b!=null)return jo(this.node.rawAttrs,t,n);if(s.shape!=null)return Jo(this.node.rawAttrs,t,n);if(s.type!=null)return Yo(this.node.rawAttrs,t,n);if(s.list!=null){if(s.list.i!=null||s.list.f!=null)return Qo(this.node.rawAttrs,t,n);if(s.list.s!=null)return ti(this.node.rawAttrs,t,n);if(s.list.shape!=null)return ei(this.node.rawAttrs,t,n);if(s.list.b!=null)return ni(this.node.rawAttrs,t,n);if(s.list.type!=null)return Zo(this.node.rawAttrs,t,n)}return n}}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */var Zt=Object.freeze({__proto__:null,OP_SCOPE_SUFFIX:h1,abs:_e,acos:Qd,acosh:em,add:Vt,addN:sm,all:om,any:am,argMax:cm,argMin:fm,asin:pm,asinh:mm,atan:ym,atan2:_m,atanh:Nm,avgPool:L1,avgPool3d:$m,basicLSTMCell:Fm,batchNorm:no,batchNorm2d:Bm,batchNorm3d:zm,batchNorm4d:Hm,batchToSpaceND:F1,bincount:P1,booleanMaskAsync:w5,broadcastArgs:Km,broadcastTo:Ws,buffer:at,cast:Mt,ceil:Ym,clipByValue:Jm,clone:wn,complex:Nn,concat:ne,concat1d:t0,concat2d:n0,concat3d:r0,concat4d:i0,conv1d:c0,conv2d:ro,conv2dTranspose:h0,conv3d:d0,conv3dTranspose:b0,cos:w0,cosh:I0,cosineWindow:Ma,cumprod:S0,cumsum:E0,denseBincount:x0,depthToSpace:A0,depthwiseConv2d:$a,diag:O0,dilation2d:F0,div:ee,divNoNan:B0,dot:z0,dropout:R5,einsum:H0,elu:V1,enclosingPowerOfTwo:Nf,equal:M1,erf:K0,euclideanNorm:s2,exp:Wn,expandDims:vn,expm1:a2,eye:W1,fft:Fa,fill:so,floor:H1,floorDiv:R1,fused:K5,gather:q1,gatherND:$5,greater:ao,greaterEqual:G1,ifft:Ar,imag:Jr,image:Iy,inTopKAsync:L5,irfft:gf,isFinite:m2,isInf:y2,isNaN:_2,leakyRelu:K1,less:I2,lessEqual:Ra,linalg:ky,linspace:S2,localResponseNormalization:E2,log:Zs,log1p:j1,logSigmoid:D2,logSoftmax:L2,logSumExp:Y1,logicalAnd:xr,logicalNot:Z1,logicalOr:J1,logicalXor:B2,losses:Sy,lowerBound:z2,matMul:mt,max:us,maxPool:Q1,maxPool3d:q2,maxPoolWithArgmax:K2,maximum:X2,mean:$r,meshgrid:Z2,min:qo,minimum:tf,mirrorPad:tg,mod:ng,moments:rg,movingAverage:I5,mul:ot,multiRNNCell:ig,multinomial:lg,neg:rn,norm:io,notEqual:ef,oneHot:Ed,ones:Fn,onesLike:fg,op:v,outerProduct:pg,pad:sr,pad1d:gg,pad2d:bg,pad3d:wg,pad4d:Ig,pool:vg,pow:Da,prelu:sf,print:S1,prod:Ag,raggedGather:Rg,raggedTensorToTensor:Lg,rand:Pg,randomGamma:n4,randomNormal:hf,randomStandardNormal:o4,randomUniform:pf,range:Js,real:Ys,reciprocal:l4,relu:co,relu6:df,reshape:C,reverse:Hn,reverse1d:p4,reverse2d:m4,reverse3d:y4,reverse4d:_4,rfft:Pa,round:mf,rsqrt:I4,scalar:ht,scatterND:S5,searchSorted:Oa,selu:S4,separableConv2d:E4,setdiff1dAsync:x4,sigmoid:cs,sign:A4,signal:Ny,sin:R4,sinh:L4,slice:wt,slice1d:P4,slice2d:M4,slice3d:B4,slice4d:z4,softmax:H4,softplus:X1,spaceToBatchND:nf,sparse:Ty,sparseToDense:v5,spectral:wy,split:Qs,sqrt:Go,square:oo,squaredDifference:yf,squeeze:Ua,stack:ln,step:bf,stridedSlice:e5,string:Ey,sub:ct,sum:St,tan:s5,tanh:Ho,tensor:Re,tensor1d:De,tensor2d:qs,tensor3d:Fd,tensor4d:r5,tensor5d:o5,tensor6d:i5,tile:Hs,topk:l5,transpose:Co,truncatedNormal:u5,unique:h5,unsortedSegmentSum:d5,unstack:Qn,upperBound:g5,variable:y5,where:gs,whereAsync:wf,zeros:ys,zerosLike:Aa});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */const o3=(e,t,n,s=Zt)=>{switch(e.op){case"BiasAdd":case"AddV2":case"Add":return[s.add(g("a",e,t,n),g("b",e,t,n))];case"AddN":return[s.addN(g("tensors",e,t,n))];case"FloorMod":case"Mod":return[s.mod(g("a",e,t,n),g("b",e,t,n))];case"Mul":return[s.mul(g("a",e,t,n),g("b",e,t,n))];case"RealDiv":case"Div":return[s.div(g("a",e,t,n),g("b",e,t,n))];case"DivNoNan":return[s.divNoNan(g("a",e,t,n),g("b",e,t,n))];case"FloorDiv":return[s.floorDiv(g("a",e,t,n),g("b",e,t,n))];case"Sub":return[s.sub(g("a",e,t,n),g("b",e,t,n))];case"Minimum":return[s.minimum(g("a",e,t,n),g("b",e,t,n))];case"Maximum":return[s.maximum(g("a",e,t,n),g("b",e,t,n))];case"Pow":return[s.pow(g("a",e,t,n),g("b",e,t,n))];case"SquaredDifference":return[s.squaredDifference(g("a",e,t,n),g("b",e,t,n))];default:throw TypeError(`Node type ${e.op} is not implemented`)}};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */const i3=(e,t,n,s=Zt)=>{switch(e.op){case"Abs":case"ComplexAbs":return[s.abs(g("x",e,t,n))];case"Acos":return[s.acos(g("x",e,t,n))];case"Acosh":return[s.acosh(g("x",e,t,n))];case"Asin":return[s.asin(g("x",e,t,n))];case"Asinh":return[s.asinh(g("x",e,t,n))];case"Atan":return[s.atan(g("x",e,t,n))];case"Atan2":return[s.atan2(g("x",e,t,n),g("y",e,t,n))];case"Atanh":return[s.atanh(g("x",e,t,n))];case"Ceil":return[s.ceil(g("x",e,t,n))];case"Complex":return[s.complex(g("real",e,t,n),g("imag",e,t,n))];case"Cos":return[s.cos(g("x",e,t,n))];case"Cosh":return[s.cosh(g("x",e,t,n))];case"Elu":return[s.elu(g("x",e,t,n))];case"Erf":return[s.erf(g("x",e,t,n))];case"Exp":return[s.exp(g("x",e,t,n))];case"Expm1":return[s.expm1(g("x",e,t,n))];case"Floor":return[s.floor(g("x",e,t,n))];case"Log":return[s.log(g("x",e,t,n))];case"Log1p":return[s.log1p(g("x",e,t,n))];case"Imag":return[s.imag(g("x",e,t,n))];case"Neg":return[s.neg(g("x",e,t,n))];case"Reciprocal":return[s.reciprocal(g("x",e,t,n))];case"Real":return[s.real(g("x",e,t,n))];case"Relu":return[s.relu(g("x",e,t,n))];case"Round":return[s.round(g("x",e,t,n))];case"Selu":return[s.selu(g("x",e,t,n))];case"Sigmoid":return[s.sigmoid(g("x",e,t,n))];case"Sin":return[s.sin(g("x",e,t,n))];case"Sign":return[s.sign(g("x",e,t,n))];case"Sinh":return[s.sinh(g("x",e,t,n))];case"Softplus":return[s.softplus(g("x",e,t,n))];case"Sqrt":return[s.sqrt(g("x",e,t,n))];case"Square":return[s.square(g("x",e,t,n))];case"Tanh":return[s.tanh(g("x",e,t,n))];case"Tan":return[s.tan(g("x",e,t,n))];case"ClipByValue":return[s.clipByValue(g("x",e,t,n),g("clipValueMin",e,t,n),g("clipValueMax",e,t,n))];case"Relu6":return[s.relu6(g("x",e,t,n))];case"Rsqrt":return[s.rsqrt(te(e.inputNames[0],t,n))];case"Prod":return[s.prod(g("x",e,t,n),g("axes",e,t,n))];case"LeakyRelu":return[s.leakyRelu(g("x",e,t,n),g("alpha",e,t,n))];case"Prelu":return[s.prelu(g("x",e,t,n),g("alpha",e,t,n))];case"IsNan":return[s.isNaN(te(e.inputNames[0],t,n))];default:throw TypeError(`Node type ${e.op} is not implemented`)}};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function we(e,t,n=""){if(!(typeof e=="number"||typeof t=="number")){T(e.length===t.length,()=>n+` Shapes ${e} and ${t} must match`);for(let s=0;s<e.length;s++){const r=e[s],o=t[s];T(r<0||o<0||r===o,()=>n+` Shapes ${e} and ${t} must match`)}}}function Rl(e){return!(typeof e=="number"||e.some(t=>t<0))}function Ls(e,t,n){let s=si(e,n);const r=!Rl(s);if(r&&t.length===0)throw new Error(`Tried to calculate elements of an empty list with non-fully-defined elementShape: ${s}`);if(r&&t.forEach(o=>{s=si(o.shape,s)}),!Rl(s))throw new Error(`Non-fully-defined elementShape: ${s}`);return s}function si(e,t){if(typeof e=="number")return t;if(typeof t=="number")return e;if(e.length!==t.length)throw new Error(`Incompatible ranks during merge: ${e} vs. ${t}`);const n=[];for(let s=0;s<e.length;++s){const r=e[s],o=t[s];if(r>=0&&o>=0&&r!==o)throw new Error(`Incompatible shape during merge: ${e} vs. ${t}`);n[s]=r>=0?r:o}return n}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */class a3{constructor(t,n,s,r,o,i,a){this.name=t,this.dtype=n,this.maxSize=s,this.elementShape=r,this.identicalElementShapes=o,this.dynamicSize=i,this.clearAfterRead=a,this.tensors=[],this.closed_=!1,this.idTensor=ht(0),bn(this.idTensor)}get id(){return this.idTensor.id}get closed(){return this.closed_}clearAndClose(t){this.tensors.forEach(n=>{(t==null||!t.has(n.tensor.id))&&n.tensor.dispose()}),this.tensors=[],this.closed_=!0,this.idTensor.dispose()}size(){return this.tensors.length}read(t){if(this.closed_)throw new Error(`TensorArray ${this.name} has already been closed.`);if(t<0||t>=this.size())throw new Error(`Tried to read from index ${t}, but array size is: ${this.size()}`);const n=this.tensors[t];if(n.cleared)throw new Error(`TensorArray ${this.name}: Could not read index ${t} twice because it was cleared after a previous read (perhaps try setting clear_after_read = false?).`);return this.clearAfterRead&&(n.cleared=!0),n.read=!0,n.tensor}readMany(t){return t.map(n=>this.read(n))}write(t,n){if(this.closed_)throw new Error(`TensorArray ${this.name} has already been closed.`);if(t<0||!this.dynamicSize&&t>=this.maxSize)throw new Error(`Tried to write to index ${t}, but array is not resizeable and size is: ${this.maxSize}`);const s=this.tensors[t]||{};if(n.dtype!==this.dtype)throw new Error(`TensorArray ${this.name}: Could not write to TensorArray index ${t},
          because the value dtype is ${n.dtype}, but TensorArray dtype is ${this.dtype}.`);if(this.size()===0&&(this.elementShape==null||this.elementShape.length===0)&&(this.elementShape=n.shape),we(this.elementShape,n.shape,`TensorArray ${this.name}: Could not write to TensorArray index ${t}.`),s.read)throw new Error(`TensorArray ${this.name}: Could not write to TensorArray index ${t}, because it has already been read.`);if(s.written)throw new Error(`TensorArray ${this.name}: Could not write to TensorArray index ${t}, because it has already been written.`);s.tensor=n,bn(n),s.written=!0,this.tensors[t]=s}writeMany(t,n){if(t.length!==n.length)throw new Error(`TensorArray ${this.name}: could not write multiple tensors,because the index size: ${t.length} is not the same as tensors size: ${n.length}.`);t.forEach((s,r)=>this.write(s,n[r]))}gather(t,n){if(n&&n!==this.dtype)throw new Error(`TensorArray dtype is ${this.dtype} but gather requested dtype ${n}`);if(t)t=t.slice(0,this.size());else{t=[];for(let r=0;r<this.size();r++)t.push(r)}if(t.length===0)return Re([],[0].concat(this.elementShape));const s=this.readMany(t);return we(this.elementShape,s[0].shape,"TensorArray shape mismatch: "),ln(s,0)}concat(t){if(t&&t!==this.dtype)throw new Error(`TensorArray dtype is ${this.dtype} but concat requested dtype ${t}`);if(this.size()===0)return Re([],[0].concat(this.elementShape));const n=[];for(let r=0;r<this.size();r++)n.push(r);const s=this.readMany(n);return we(this.elementShape,s[0].shape,`TensorArray shape mismatch: tensor array shape (${this.elementShape}) vs first tensor shape (${s[0].shape})`),ne(s,0)}scatter(t,n){if(n.dtype!==this.dtype)throw new Error(`TensorArray dtype is ${this.dtype} but tensor has dtype ${n.dtype}`);if(t.length!==n.shape[0])throw new Error(`Expected len(indices) == tensor.shape[0], but saw: ${t.length} vs. ${n.shape[0]}`);const s=Math.max(...t);if(!this.dynamicSize&&s>=this.maxSize)throw new Error(`Max index must be < array size (${s}  vs. ${this.maxSize})`);this.writeMany(t,Qn(n,0))}split(t,n){if(n.dtype!==this.dtype)throw new Error(`TensorArray dtype is ${this.dtype} but tensor has dtype ${n.dtype}`);let s=0;const r=t.map(l=>(s+=l,s));if(s!==n.shape[0])throw new Error(`Expected sum of lengths to be equal to
          tensor.shape[0], but sum of lengths is
        ${s}, and tensor's shape is: ${n.shape}`);if(!this.dynamicSize&&t.length!==this.maxSize)throw new Error(`TensorArray's size is not equal to the size of lengths (${this.maxSize} vs. ${t.length}), and the TensorArray is not marked as dynamically resizeable`);const o=s===0?0:n.size/s,i=[];Ee(()=>{n=C(n,[1,s,o]);for(let l=0;l<t.length;++l){const u=[0,l===0?0:r[l-1],0],f=[1,t[l],o];i[l]=C(wt(n,u,f),this.elementShape)}return i});const a=[];for(let l=0;l<t.length;l++)a[l]=l;this.writeMany(a,i)}}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */class qn{constructor(t,n,s,r=-1){this.tensors=t,this.elementShape=n,this.elementDtype=s,t?.forEach(o=>{if(s!==o.dtype)throw new Error(`Invalid data types; op elements ${s}, but list elements ${o.dtype}`);we(n,o.shape,"TensorList shape mismatch: "),bn(o)}),this.idTensor=ht(0),this.maxNumElements=r,bn(this.idTensor)}get id(){return this.idTensor.id}copy(){return new qn([...this.tensors],this.elementShape,this.elementDtype)}clearAndClose(t){this.tensors.forEach(n=>{(t==null||!t.has(n.id))&&n.dispose()}),this.tensors.length=0,this.idTensor.dispose()}size(){return this.tensors.length}stack(t,n,s=-1){if(n!==this.elementDtype)throw new Error(`Invalid data types; op elements ${n}, but list elements ${this.elementDtype}`);if(s!==-1&&this.tensors.length!==s)throw new Error(`Operation expected a list with ${s} elements but got a list with ${this.tensors.length} elements.`);we(t,this.elementShape,"TensorList shape mismatch: ");const r=Ls(this.elementShape,this.tensors,t);return Ee(()=>{const o=this.tensors.map(i=>C(i,r));return ln(o,0)})}popBack(t,n){if(n!==this.elementDtype)throw new Error(`Invalid data types; op elements ${n}, but list elements ${this.elementDtype}`);if(this.size()===0)throw new Error("Trying to pop from an empty list.");const s=Ls(this.elementShape,this.tensors,t),r=this.tensors.pop();return r.kept=!1,we(r.shape,t,"TensorList shape mismatch: "),C(r,s)}pushBack(t){if(t.dtype!==this.elementDtype)throw new Error(`Invalid data types; op elements ${t.dtype}, but list elements ${this.elementDtype}`);if(we(t.shape,this.elementShape,"TensorList shape mismatch: "),this.maxNumElements===this.size())throw new Error("Trying to push element into a full list.");bn(t),this.tensors.push(t)}resize(t){if(t<0)throw new Error(`TensorListResize expects size to be non-negative. Got: ${t}`);if(this.maxNumElements!==-1&&t>this.maxNumElements)throw new Error(`TensorListResize input size ${t} is greater maxNumElement ${this.maxNumElements}.`);const n=new qn([],this.elementShape,this.elementDtype,this.maxNumElements);n.tensors.length=t;for(let s=0;s<Math.min(this.tensors.length,t);++s)n.tensors[s]=this.tensors[s];return n}getItem(t,n,s){if(s!==this.elementDtype)throw new Error(`Invalid data types; op elements ${s}, but list elements ${this.elementDtype}`);if(t<0||t>this.tensors.length)throw new Error(`Trying to access element ${t} in a list with ${this.tensors.length} elements.`);if(this.tensors[t]==null)throw new Error(`element at index ${t} is null.`);we(this.tensors[t].shape,n,"TensorList shape mismatch: ");const r=Ls(this.elementShape,this.tensors,n);return C(this.tensors[t],r)}setItem(t,n){if(n.dtype!==this.elementDtype)throw new Error(`Invalid data types; op elements ${n.dtype}, but list elements ${this.elementDtype}`);if(t<0||this.maxNumElements!==-1&&t>=this.maxNumElements)throw new Error(`Trying to set element ${t} in a list with max ${this.maxNumElements} elements.`);we(this.elementShape,n.shape,"TensorList shape mismatch: "),bn(n),this.tensors[t]!=null&&(this.tensors[t].kept=!1),this.tensors[t]=n}gather(t,n,s){if(n!==this.elementDtype)throw new Error(`Invalid data types; op elements ${n}, but list elements ${this.elementDtype}`);we(this.elementShape,s,"TensorList shape mismatch: "),t=t.slice(0,this.size());const r=Ls(this.elementShape,this.tensors,s);return t.length===0?Re([],[0].concat(r)):Ee(()=>{const o=t.map(i=>C(this.tensors[i],r));return ln(o,0)})}concat(t,n){if(t&&t!==this.elementDtype)throw new Error(`TensorList dtype is ${this.elementDtype} but concat requested dtype ${t}`);we(this.elementShape,n,"TensorList shape mismatch: ");const s=Ls(this.elementShape,this.tensors,n);return this.size()===0?Re([],[0].concat(s)):Ee(()=>{const r=this.tensors.map(o=>C(o,s));return ne(r,0)})}}function l3(e,t,n){const s=e.dtype;if(e.shape.length<1)throw new Error(`Tensor must be at least a vector, but saw shape: ${e.shape}`);if(e.dtype!==n)throw new Error(`Invalid data types; op elements ${e.dtype}, but list elements ${n}`);const r=e.shape.slice(1);we(r,t,"TensorList shape mismatch: ");const o=Qn(e);return new qn(o,t,s)}function c3(e,t,n,s){return new qn([],e,t,s)}function u3(e,t,n,s){if(t.length!==e.shape[0])throw new Error(`Expected len(indices) == tensor.shape[0], but saw: ${t.length} vs. ${e.shape[0]}`);const r=Math.max(...t);if(s!=null&&s!==-1&&r>=s)throw new Error(`Max index must be < array size (${r}  vs. ${s})`);const o=new qn([],n,e.dtype,s),i=Qn(e,0);return t.forEach((a,l)=>{o.setItem(a,i[l])}),o}function f3(e,t,n){let s=0;const r=t.map(u=>(s+=u,s));if(s!==e.shape[0])throw new Error(`Expected sum of lengths to be equal to
          tensor.shape[0], but sum of lengths is
        ${s}, and tensor's shape is: ${e.shape}`);const o=e.shape.slice(1),i=si(o,n),a=s===0?0:e.size/s,l=Ee(()=>{const u=[];e=C(e,[1,s,a]);for(let f=0;f<t.length;++f){const p=[0,f===0?0:r[f-1],0],d=[1,t[f],a];u[f]=C(wt(e,p,d),i)}return e.dispose(),u}),c=new qn([],n,e.dtype,t.length);for(let u=0;u<l.length;u++)c.setItem(u,l[u]);return c}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */const h3=async(e,t,n)=>{switch(e.op){case"If":case"StatelessIf":{const s=g("thenBranch",e,t,n),r=g("elseBranch",e,t,n),o=g("cond",e,t,n),i=g("args",e,t,n);return(await o.data())[0]?n.functionMap[s].executeFunctionAsync(i,n.tensorArrayMap,n.tensorListMap):n.functionMap[r].executeFunctionAsync(i,n.tensorArrayMap,n.tensorListMap)}case"While":case"StatelessWhile":{const s=g("body",e,t,n),r=g("cond",e,t,n),o=g("args",e,t,n),i=await n.functionMap[r].executeFunctionAsync(o,n.tensorArrayMap,n.tensorListMap),a=o.map(u=>u.id);let l=await i[0].data();i.forEach(u=>{!u.kept&&a.indexOf(u.id)===-1&&u.dispose()});let c=o;for(;l[0];){const u=c;c=await n.functionMap[s].executeFunctionAsync(c,n.tensorArrayMap,n.tensorListMap);const f=c.map(p=>p.id);u.forEach(p=>{!p.kept&&a.indexOf(p.id)===-1&&f.indexOf(p.id)===-1&&p.dispose()});const h=await n.functionMap[r].executeFunctionAsync(c,n.tensorArrayMap,n.tensorListMap);l=await h[0].data(),h.forEach(p=>{!p.kept&&a.indexOf(p.id)===-1&&f.indexOf(p.id)===-1&&p.dispose()})}return c}case"LoopCond":{const s=g("pred",e,t,n);return[nn(s)]}case"Switch":{const s=g("pred",e,t,n);let r=g("data",e,t,n);return r.kept||(r=nn(r)),(await s.data())[0]?[void 0,r]:[r,void 0]}case"Merge":{const s=e.inputNames.find(r=>te(r,t,n)!==void 0);if(s){const r=te(s,t,n);return[nn(r)]}return}case"Enter":{const s=g("frameName",e,t,n),r=g("tensor",e,t,n);return n.enterFrame(s),[nn(r)]}case"Exit":{const s=g("tensor",e,t,n);return n.exitFrame(),[nn(s)]}case"NextIteration":{const s=g("tensor",e,t,n);return n.nextIteration(),[nn(s)]}case"TensorArrayV3":{const s=g("size",e,t,n),r=g("dtype",e,t,n),o=g("elementShape",e,t,n),i=g("dynamicSize",e,t,n),a=g("clearAfterRead",e,t,n),l=g("identicalElementShapes",e,t,n),c=g("name",e,t,n),u=new a3(c,r,s,o,l,i,a);return n.addTensorArray(u),[u.idTensor,ht(1)]}case"TensorArrayWriteV3":{const s=g("tensorArrayId",e,t,n),r=g("index",e,t,n),o=g("tensor",e,t,n),i=n.getTensorArray(s.id);return i.write(r,o),[i.idTensor]}case"TensorArrayReadV3":{const s=g("tensorArrayId",e,t,n),r=g("index",e,t,n);return[n.getTensorArray(s.id).read(r)]}case"TensorArrayGatherV3":{const s=g("tensorArrayId",e,t,n),r=g("indices",e,t,n),o=g("dtype",e,t,n);return[n.getTensorArray(s.id).gather(r,o)]}case"TensorArrayScatterV3":{const s=g("tensorArrayId",e,t,n),r=g("indices",e,t,n),o=g("tensor",e,t,n),i=n.getTensorArray(s.id);return i.scatter(r,o),[i.idTensor]}case"TensorArrayConcatV3":{const s=g("tensorArrayId",e,t,n),r=n.getTensorArray(s.id),o=g("dtype",e,t,n);return[r.concat(o)]}case"TensorArraySplitV3":{const s=g("tensorArrayId",e,t,n),r=g("tensor",e,t,n),o=g("lengths",e,t,n),i=n.getTensorArray(s.id);return i.split(o,r),[i.idTensor]}case"TensorArraySizeV3":{const s=g("tensorArrayId",e,t,n),r=n.getTensorArray(s.id);return[ht(r.size(),"int32")]}case"TensorArrayCloseV3":{const s=g("tensorArrayId",e,t,n),r=n.getTensorArray(s.id);return r.clearAndClose(),[r.idTensor]}case"TensorListSetItem":{const s=g("tensorListId",e,t,n),r=g("index",e,t,n),o=g("tensor",e,t,n),i=n.getTensorList(s.id);return i.setItem(r,o),[i.idTensor]}case"TensorListGetItem":{const s=g("tensorListId",e,t,n),r=g("index",e,t,n),o=g("elementShape",e,t,n),i=g("elementDType",e,t,n);return[n.getTensorList(s.id).getItem(r,o,i)]}case"TensorListScatterV2":case"TensorListScatter":{const s=g("indices",e,t,n),r=g("tensor",e,t,n),o=g("elementShape",e,t,n),i=g("numElements",e,t,n),a=u3(r,s,o,i);return n.addTensorList(a),[a.idTensor]}case"TensorListReserve":case"EmptyTensorList":{const s=g("elementShape",e,t,n),r=g("elementDType",e,t,n);let o;e.op==="TensorListReserve"?o="numElements":o="maxNumElements";const i=g(o,e,t,n),a=e.op==="TensorListReserve"?-1:i,l=c3(s,r,i,a);return n.addTensorList(l),[l.idTensor]}case"TensorListGather":{const s=g("tensorListId",e,t,n),r=g("indices",e,t,n),o=g("elementShape",e,t,n),i=g("elementDType",e,t,n);return[n.getTensorList(s.id).gather(r,i,o)]}case"TensorListStack":{const s=g("tensorListId",e,t,n),r=g("elementShape",e,t,n),o=g("elementDType",e,t,n),i=g("numElements",e,t,n);return[n.getTensorList(s.id).stack(r,o,i)]}case"TensorListFromTensor":{const s=g("tensor",e,t,n),r=g("elementShape",e,t,n),o=g("elementDType",e,t,n),i=l3(s,r,o);return n.addTensorList(i),[i.idTensor]}case"TensorListConcat":case"TensorListConcatV2":{const s=g("tensorListId",e,t,n),r=n.getTensorList(s.id),o=g("dtype",e,t,n),i=g("elementShape",e,t,n);return[r.concat(o,i)]}case"TensorListPushBack":{const s=g("tensorListId",e,t,n),r=g("tensor",e,t,n),o=n.getTensorList(s.id);return o.pushBack(r),[o.idTensor]}case"TensorListPopBack":{const s=g("tensorListId",e,t,n),r=g("elementShape",e,t,n),o=g("elementDType",e,t,n);return[n.getTensorList(s.id).popBack(r,o)]}case"TensorListSplit":{const s=g("tensor",e,t,n),r=g("elementShape",e,t,n),o=g("lengths",e,t,n),i=f3(s,o,r);return n.addTensorList(i),[i.idTensor]}case"TensorListLength":{const s=g("tensorListId",e,t,n),r=n.getTensorList(s.id);return[ht(r.size(),"int32")]}case"TensorListResize":{const s=g("tensorListId",e,t,n),r=g("size",e,t,n),i=n.getTensorList(s.id).resize(r);return n.addTensorList(i),[i.idTensor]}default:throw TypeError(`Node type ${e.op} is not implemented`)}};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function Ol(e,t,n){const[s,r]=g("fusedOps",e,t,n),o=s==="biasadd",i=!o,a=r==="prelu",l=s==="fusedbatchnorm",c=g("numArgs",e,t,n);if(o){if(a&&c!==2)throw new Error("FusedConv2d and DepthwiseConv2d with BiasAdd and Prelu must have two extra arguments: bias and alpha.");if(!a&&o&&c!==1)throw new Error("FusedConv2d and DepthwiseConv2d with BiasAdd must have one extra argument: bias.")}if(l)throw new Error("FusedConv2d and DepthwiseConv2d with FusedBatchNorm is not supported");const u=g("strides",e,t,n),f=mr(e,t,n),h=g("dataFormat",e,t,n).toUpperCase(),p=g("dilations",e,t,n);let[d,y]=g("args",e,t,n);i&&(y=d,d=void 0);const m=g("leakyreluAlpha",e,t,n);return{stride:u,pad:f,dataFormat:h,dilations:p,biasArg:d,preluArg:y,activationFunc:r,leakyreluAlpha:m}}const p3=(e,t,n,s=Zt)=>{switch(e.op){case"Conv1D":{const r=g("stride",e,t,n),o=g("pad",e,t,n),i=g("dataFormat",e,t,n).toUpperCase(),a=g("dilation",e,t,n);return[s.conv1d(g("x",e,t,n),g("filter",e,t,n),r,o,i,a)]}case"Conv2D":{const r=g("strides",e,t,n),o=mr(e,t,n),i=g("dataFormat",e,t,n).toUpperCase(),a=g("dilations",e,t,n);return[s.conv2d(g("x",e,t,n),g("filter",e,t,n),[r[1],r[2]],o,i,[a[1],a[2]])]}case"_FusedConv2D":{const{stride:r,pad:o,dataFormat:i,dilations:a,biasArg:l,preluArg:c,activationFunc:u,leakyreluAlpha:f}=Ol(e,t,n);return[s.fused.conv2d({x:g("x",e,t,n),filter:g("filter",e,t,n),strides:[r[1],r[2]],pad:o,dataFormat:i,dilations:[a[1],a[2]],bias:l,activation:u,preluActivationWeights:c,leakyreluAlpha:f})]}case"FusedDepthwiseConv2dNative":{const{stride:r,pad:o,dataFormat:i,dilations:a,biasArg:l,preluArg:c,activationFunc:u,leakyreluAlpha:f}=Ol(e,t,n);return[s.fused.depthwiseConv2d({x:g("x",e,t,n),filter:g("filter",e,t,n),strides:[r[1],r[2]],pad:o,dataFormat:i,dilations:[a[1],a[2]],bias:l,activation:u,preluActivationWeights:c,leakyreluAlpha:f})]}case"Conv2DBackpropInput":case"Conv2dTranspose":{const r=g("outputShape",e,t,n),o=g("strides",e,t,n),i=mr(e,t,n);return[s.conv2dTranspose(g("x",e,t,n),g("filter",e,t,n),r,[o[1],o[2]],i)]}case"DepthwiseConv2dNative":case"DepthwiseConv2d":{const r=g("strides",e,t,n),o=mr(e,t,n),i=g("dilations",e,t,n),a=g("dataFormat",e,t,n).toUpperCase();return[s.depthwiseConv2d(g("input",e,t,n),g("filter",e,t,n),[r[1],r[2]],o,a,[i[1],i[2]])]}case"Conv3D":{const r=g("strides",e,t,n),o=g("pad",e,t,n),i=g("dataFormat",e,t,n).toUpperCase(),a=g("dilations",e,t,n);return[s.conv3d(g("x",e,t,n),g("filter",e,t,n),[r[1],r[2],r[3]],o,i,[a[1],a[2],a[3]])]}case"AvgPool":{const r=g("strides",e,t,n),o=g("pad",e,t,n),i=g("kernelSize",e,t,n);return[s.avgPool(g("x",e,t,n),[i[1],i[2]],[r[1],r[2]],o)]}case"MaxPool":{const r=g("strides",e,t,n),o=g("pad",e,t,n),i=g("kernelSize",e,t,n);return[s.maxPool(g("x",e,t,n),[i[1],i[2]],[r[1],r[2]],o)]}case"MaxPoolWithArgmax":{const r=g("strides",e,t,n),o=g("pad",e,t,n),i=g("kernelSize",e,t,n),a=g("includeBatchInIndex",e,t,n),{result:l,indexes:c}=s.maxPoolWithArgmax(g("x",e,t,n),[i[1],i[2]],[r[1],r[2]],o,a);return[l,c]}case"AvgPool3D":{const r=g("strides",e,t,n),o=g("pad",e,t,n),i=g("kernelSize",e,t,n);return[s.avgPool3d(g("x",e,t,n),[i[1],i[2],i[3]],[r[1],r[2],r[3]],o)]}case"MaxPool3D":{const r=g("strides",e,t,n),o=g("pad",e,t,n),i=g("kernelSize",e,t,n);return[s.maxPool3d(g("x",e,t,n),[i[1],i[2],i[3]],[r[1],r[2],r[3]],o)]}case"Dilation2D":{const r=g("strides",e,t,n),o=g("pad",e,t,n),i=g("dilations",e,t,n),a=r[1],l=r[2],c=i[1],u=i[2];return[s.dilation2d(g("x",e,t,n),g("filter",e,t,n),[a,l],o,[c,u],"NHWC")]}default:throw TypeError(`Node type ${e.op} is not implemented`)}};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */const d3=(e,t,n,s=Zt)=>{switch(e.op){case"Fill":{const r=g("shape",e,t,n),o=g("dtype",e,t,n),i=g("value",e,t,n);return[s.fill(r,i,o)]}case"LinSpace":{const r=g("start",e,t,n),o=g("stop",e,t,n),i=g("num",e,t,n);return[s.linspace(r,o,i)]}case"Multinomial":{const r=g("logits",e,t,n),o=g("numSamples",e,t,n),i=g("seed",e,t,n);return[s.multinomial(r,o,i)]}case"OneHot":{const r=g("indices",e,t,n),o=g("depth",e,t,n),i=g("onValue",e,t,n),a=g("offValue",e,t,n),l=g("dtype",e,t,n);return[s.oneHot(r,o,i,a,l)]}case"Ones":return[s.ones(g("shape",e,t,n),g("dtype",e,t,n))];case"OnesLike":return[s.onesLike(g("x",e,t,n))];case"RandomStandardNormal":return[s.randomStandardNormal(g("shape",e,t,n),g("dtype",e,t,n),g("seed",e,t,n))];case"RandomUniform":return[s.randomUniform(g("shape",e,t,n),g("minval",e,t,n),g("maxval",e,t,n),g("dtype",e,t,n))];case"Range":{const r=g("start",e,t,n),o=g("stop",e,t,n),i=g("step",e,t,n);return[s.range(r,o,i,g("dtype",e,t,n))]}case"TruncatedNormal":{const r=g("shape",e,t,n),o=g("mean",e,t,n),i=g("stdDev",e,t,n),a=g("seed",e,t,n);return[s.truncatedNormal(r,o,i,g("dtype",e,t,n),a)]}case"Zeros":return[s.zeros(g("shape",e,t,n),g("dtype",e,t,n))];case"ZerosLike":return[s.zerosLike(g("x",e,t,n))];default:throw TypeError(`Node type ${e.op} is not implemented`)}};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function Io(e,t,n){const s=g("boxes",e,t,n),r=g("scores",e,t,n),o=g("maxOutputSize",e,t,n),i=g("iouThreshold",e,t,n),a=g("scoreThreshold",e,t,n),l=g("softNmsSigma",e,t,n);return{boxes:s,scores:r,maxOutputSize:o,iouThreshold:i,scoreThreshold:a,softNmsSigma:l}}const m3=async(e,t,n,s,r=Zt)=>{switch(e.op){case"NonMaxSuppressionV5":{const{boxes:o,scores:i,maxOutputSize:a,iouThreshold:l,scoreThreshold:c,softNmsSigma:u}=Io(e,t,n),f=await r.image.nonMaxSuppressionWithScoreAsync(o,i,a,l,c,u);return[f.selectedIndices,f.selectedScores]}case"NonMaxSuppressionV4":{const{boxes:o,scores:i,maxOutputSize:a,iouThreshold:l,scoreThreshold:c}=Io(e,t,n),u=g("padToMaxOutputSize",e,t,n),f=await r.image.nonMaxSuppressionPaddedAsync(o,i,a,l,c,u);return[f.selectedIndices,f.validOutputs]}case"NonMaxSuppressionV3":case"NonMaxSuppressionV2":{const{boxes:o,scores:i,maxOutputSize:a,iouThreshold:l,scoreThreshold:c}=Io(e,t,n);return[await r.image.nonMaxSuppressionAsync(o,i,a,l,c)]}case"Where":{const o=r.cast(g("condition",e,t,n),"bool"),i=[await r.whereAsync(o)];return o.dispose(),i}case"ListDiff":return r.setdiff1dAsync(g("x",e,t,n),g("y",e,t,n));default:throw TypeError(`Node type ${e.op} is not implemented`)}};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */const g3=(e,t,n,s=Zt)=>{switch(e.op){case"LowerBound":{const r=g("sortedSequence",e,t,n),o=g("values",e,t,n);return[s.lowerBound(r,o)]}case"TopKV2":{const r=g("x",e,t,n),o=g("k",e,t,n),i=g("sorted",e,t,n),a=s.topk(r,o,i);return[a.values,a.indices]}case"UpperBound":{const r=g("sortedSequence",e,t,n),o=g("values",e,t,n);return[s.upperBound(r,o)]}case"Unique":{const r=g("x",e,t,n),o=s.unique(r);return[o.values,o.indices]}case"UniqueV2":{const r=g("x",e,t,n),o=g("axis",e,t,n),i=s.unique(r,o);return[i.values,i.indices]}default:throw TypeError(`Node type ${e.op} is not implemented`)}};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */const y3=(e,t,n,s=Zt)=>{switch(e.op){case"Const":return t[e.name];case"PlaceholderWithDefault":const r=g("default",e,t,n);return[te(e.name,t,n)||r];case"Placeholder":return[te(e.name,t,n)];case"Identity":case"StopGradient":case"FakeQuantWithMinMaxVars":{const u=g("x",e,t,n);return[nn(u)]}case"IdentityN":return g("x",e,t,n).map(u=>nn(u));case"Snapshot":const o=g("x",e,t,n);return[nn(o)];case"Shape":return[s.tensor1d(g("x",e,t,n).shape,"int32")];case"ShapeN":return g("x",e,t,n).map(u=>s.tensor1d(u.shape));case"Size":return[s.scalar(g("x",e,t,n).size,"int32")];case"Rank":return[s.scalar(g("x",e,t,n).rank,"int32")];case"NoOp":return[s.scalar(1)];case"Print":const i=g("x",e,t,n),a=g("data",e,t,n),l=g("message",e,t,n),c=g("summarize",e,t,n);console.warn("The graph has a tf.print() operation,usually used for debugging, which slows down performance."),console.log(l);for(let u=0;u<a.length;u++)console.log(Array.prototype.slice.call(a[u].dataSync()).slice(0,c));return[i];default:throw TypeError(`Node type ${e.op} is not implemented`)}};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */class b3{constructor(t,n){this.keyDType=t,this.valueDType=n,this.handle=ht(0),this.tensorMap=new Map,bn(this.handle)}get id(){return this.handle.id}clearAndClose(){this.tensorMap.forEach(t=>t.dispose()),this.tensorMap.clear(),this.handle.dispose()}size(){return this.tensorMap.size}tensorSize(){return ht(this.size(),"int32")}async import(t,n){this.checkKeyAndValueTensor(t,n);const s=await t.data();return this.tensorMap.forEach(r=>r.dispose()),this.tensorMap.clear(),Ee(()=>{const r=Qn(n),o=s.length,i=r.length;T(o===i,()=>`The number of elements doesn't match, keys has ${o} elements, the values has ${i} elements.`);for(let a=0;a<o;a++){const l=s[a],c=r[a];bn(c),this.tensorMap.set(l,c)}return this.handle})}async find(t,n){this.checkKeyAndValueTensor(t,n);const s=await t.data();return Ee(()=>{const r=[];for(let o=0;o<s.length;o++){const i=s[o],a=this.findWithDefault(i,n);r.push(a)}return ln(r)})}findWithDefault(t,n){const s=this.tensorMap.get(t);return s??n}checkKeyAndValueTensor(t,n){if(t.dtype!==this.keyDType)throw new Error(`Expect key dtype ${this.keyDType}, but got ${t.dtype}`);if(n.dtype!==this.valueDType)throw new Error(`Expect value dtype ${this.valueDType}, but got ${n.dtype}`)}}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */const _3=async(e,t,n,s)=>{switch(e.op){case"HashTable":case"HashTableV2":{const r=g("keyDType",e,t,n),o=g("valueDType",e,t,n),i=new b3(r,o);return s.addHashTable(e.name,i),[i.handle]}case"LookupTableImport":case"LookupTableImportV2":{const r=g("tableHandle",e,t,n,s),o=g("keys",e,t,n),i=g("values",e,t,n);return[await s.getHashTableById(r.id).import(o,i)]}case"LookupTableFind":case"LookupTableFindV2":{const r=g("tableHandle",e,t,n,s),o=g("keys",e,t,n),i=g("defaultValue",e,t,n);return[await s.getHashTableById(r.id).find(o,i)]}case"LookupTableSize":case"LookupTableSizeV2":{const r=g("tableHandle",e,t,n,s);return[s.getHashTableById(r.id).tensorSize()]}default:throw TypeError(`Node type ${e.op} is not implemented`)}};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */const w3=(e,t,n,s=Zt)=>{switch(e.op){case"ResizeBilinear":{const r=g("images",e,t,n),o=g("size",e,t,n),i=g("alignCorners",e,t,n),a=g("halfPixelCenters",e,t,n);return[s.image.resizeBilinear(r,[o[0],o[1]],i,a)]}case"ResizeNearestNeighbor":{const r=g("images",e,t,n),o=g("size",e,t,n),i=g("alignCorners",e,t,n),a=g("halfPixelCenters",e,t,n);return[s.image.resizeNearestNeighbor(r,[o[0],o[1]],i,a)]}case"CropAndResize":{const r=g("image",e,t,n),o=g("boxes",e,t,n),i=g("boxInd",e,t,n),a=g("cropSize",e,t,n),l=g("method",e,t,n),c=g("extrapolationValue",e,t,n);return[s.image.cropAndResize(r,o,i,a,l,c)]}case"ImageProjectiveTransformV3":{const r=g("images",e,t,n),o=g("transforms",e,t,n),i=g("outputShape",e,t,n),a=g("fillValue",e,t,n),l=g("interpolation",e,t,n),c=g("fillMode",e,t,n);return[s.image.transform(r,o,l.toLowerCase(),c.toLowerCase(),a,i)]}default:throw TypeError(`Node type ${e.op} is not implemented`)}};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */const N3=(e,t,n,s=Zt)=>{switch(e.op){case"Equal":return[s.equal(g("a",e,t,n),g("b",e,t,n))];case"NotEqual":return[s.notEqual(g("a",e,t,n),g("b",e,t,n))];case"Greater":return[s.greater(g("a",e,t,n),g("b",e,t,n))];case"GreaterEqual":return[s.greaterEqual(g("a",e,t,n),g("b",e,t,n))];case"Less":return[s.less(g("a",e,t,n),g("b",e,t,n))];case"LessEqual":return[s.lessEqual(g("a",e,t,n),g("b",e,t,n))];case"LogicalAnd":return[s.logicalAnd(g("a",e,t,n),g("b",e,t,n))];case"LogicalNot":return[s.logicalNot(g("a",e,t,n))];case"LogicalOr":return[s.logicalOr(g("a",e,t,n),g("b",e,t,n))];case"Select":case"SelectV2":return[s.where(g("condition",e,t,n),g("a",e,t,n),g("b",e,t,n))];default:throw TypeError(`Node type ${e.op} is not implemented`)}};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */const I3=(e,t,n,s=Zt)=>{switch(e.op){case"BatchMatMul":case"BatchMatMulV2":case"MatMul":return[s.matMul(g("a",e,t,n),g("b",e,t,n),g("transposeA",e,t,n),g("transposeB",e,t,n))];case"Einsum":return[s.einsum(g("equation",e,t,n),...g("tensors",e,t,n))];case"Transpose":return[s.transpose(g("x",e,t,n),g("perm",e,t,n))];case"_FusedMatMul":const[r,o]=g("fusedOps",e,t,n),i=r==="biasadd",a=o==="prelu",l=g("numArgs",e,t,n),c=g("leakyreluAlpha",e,t,n);if(i){if(a&&l!==2)throw new Error("Fused MatMul with BiasAdd and Prelu must have two extra arguments: bias and alpha.");if(!a&&l!==1)throw new Error("Fused MatMul with BiasAdd must have one extra argument: bias.")}const[u,f]=g("args",e,t,n);return[s.fused.matMul({a:g("a",e,t,n),b:g("b",e,t,n),transposeA:g("transposeA",e,t,n),transposeB:g("transposeB",e,t,n),bias:u,activation:o,preluActivationWeights:f,leakyreluAlpha:c})];default:throw TypeError(`Node type ${e.op} is not implemented`)}};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */const k3=(e,t,n,s=Zt)=>{switch(e.op){case"EuclideanNorm":return[s.euclideanNorm(g("x",e,t,n),g("axis",e,t,n),g("keepDims",e,t,n))];case"FusedBatchNorm":case"FusedBatchNormV2":return[s.batchNorm(g("x",e,t,n),g("mean",e,t,n),g("variance",e,t,n),g("offset",e,t,n),g("scale",e,t,n),g("epsilon",e,t,n))];case"FusedBatchNormV3":return[s.batchNorm(g("x",e,t,n),g("mean",e,t,n),g("variance",e,t,n),g("offset",e,t,n),g("scale",e,t,n),g("epsilon",e,t,n))];case"LRN":return[s.localResponseNormalization(g("x",e,t,n),g("radius",e,t,n),g("bias",e,t,n),g("alpha",e,t,n),g("beta",e,t,n))];case"Softmax":return[s.softmax(g("x",e,t,n))];case"LogSoftmax":return[s.logSoftmax(g("x",e,t,n))];case"SparseToDense":return[s.sparseToDense(g("sparseIndices",e,t,n),g("outputShape",e,t,n),g("sparseValues",e,t,n),g("defaultValue",e,t,n))];default:throw TypeError(`Node type ${e.op} is not implemented`)}};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */const S3=(e,t,n,s=Zt)=>{switch(e.op){case"Max":{const a=g("axis",e,t,n),l=g("keepDims",e,t,n);return[s.max(g("x",e,t,n),a,l)]}case"Mean":{const a=g("axis",e,t,n),l=g("keepDims",e,t,n);return[s.mean(g("x",e,t,n),a,l)]}case"Min":{const a=g("axis",e,t,n),l=g("keepDims",e,t,n);return[s.min(g("x",e,t,n),a,l)]}case"Sum":{const a=g("axis",e,t,n),l=g("keepDims",e,t,n);return[s.sum(g("x",e,t,n),a,l)]}case"All":{const a=g("axis",e,t,n),l=g("keepDims",e,t,n);return[s.all(g("x",e,t,n),a,l)]}case"Any":{const a=g("axis",e,t,n),l=g("keepDims",e,t,n);return[s.any(g("x",e,t,n),a,l)]}case"ArgMax":{const a=g("axis",e,t,n);return[s.argMax(g("x",e,t,n),a)]}case"ArgMin":{const a=g("axis",e,t,n);return[s.argMin(g("x",e,t,n),a)]}case"Prod":{const a=g("axis",e,t,n),l=g("keepDims",e,t,n);return[s.prod(g("x",e,t,n),a,l)]}case"Cumprod":{const a=g("axis",e,t,n),l=g("exclusive",e,t,n),c=g("reverse",e,t,n);return[s.cumprod(g("x",e,t,n),a,l,c)]}case"Cumsum":{const a=g("axis",e,t,n),l=g("exclusive",e,t,n),c=g("reverse",e,t,n);return[s.cumsum(g("x",e,t,n),a,l,c)]}case"Bincount":const r=g("x",e,t,n),o=g("weights",e,t,n),i=g("size",e,t,n);return[s.bincount(r,o,i)];case"DenseBincount":{const a=g("x",e,t,n),l=g("weights",e,t,n),c=g("size",e,t,n),u=g("binaryOutput",e,t,n);return[s.denseBincount(a,l,c,u)]}default:throw TypeError(`Node type ${e.op} is not implemented`)}};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */const T3=(e,t,n,s=Zt)=>{switch(e.op){case"ConcatV2":case"Concat":{const r=g("n",e,t,n),o=g("axis",e,t,n);let i=g("tensors",e,t,n);return i=i.slice(0,r),[s.concat(i,o)]}case"Gather":{const r=g("x",e,t,n),o=g("indices",e,t,n);return[s.gather(r,s.cast(o,"int32"),0)]}case"GatherV2":{const r=g("axis",e,t,n),o=g("batchDims",e,t,n),i=g("x",e,t,n),a=g("indices",e,t,n);return[s.gather(i,s.cast(a,"int32"),r,o)]}case"Reverse":{const r=g("dims",e,t,n),o=[];for(let a=0;a<r.length;a++)r[a]&&o.push(a);const i=g("x",e,t,n);return[s.reverse(i,o)]}case"ReverseV2":{const r=g("axis",e,t,n),o=g("x",e,t,n);return[s.reverse(o,r)]}case"Slice":{const r=g("begin",e,t,n),o=g("size",e,t,n);return[s.slice(g("x",e,t,n),r,o)]}case"StridedSlice":{const r=g("begin",e,t,n),o=g("end",e,t,n),i=g("strides",e,t,n),a=g("beginMask",e,t,n),l=g("endMask",e,t,n),c=g("ellipsisMask",e,t,n),u=g("newAxisMask",e,t,n),f=g("shrinkAxisMask",e,t,n),h=g("x",e,t,n);return[s.stridedSlice(h,r,o,i,a,l,c,u,f)]}case"Pack":return Ee(()=>{const r=g("axis",e,t,n),o=g("tensors",e,t,n),i=o[0].shape,a=s.squeeze(o[0]).shape,l=o.map(c=>{const u=Oe(c.shape,i);if(!u&&!Oe(s.squeeze(c).shape,a))throw new Error("the input tensors shape does not match");return u?c:s.reshape(c,i)});return[s.stack(l,r)]});case"Unpack":{const r=g("axis",e,t,n),o=g("tensor",e,t,n);return s.unstack(o,r)}case"Tile":{const r=g("reps",e,t,n);return[s.tile(g("x",e,t,n),r)]}case"Split":case"SplitV":{const r=g("axis",e,t,n),o=g("numOrSizeSplits",e,t,n),i=g("x",e,t,n);return s.split(i,o,r)}case"ScatterNd":{const r=g("indices",e,t,n),o=g("values",e,t,n),i=g("shape",e,t,n);return[s.scatterND(r,o,i)]}case"GatherNd":{const r=g("x",e,t,n),o=g("indices",e,t,n);return[s.gatherND(r,o)]}case"SparseToDense":{const r=g("sparseIndices",e,t,n),o=g("outputShape",e,t,n),i=g("sparseValues",e,t,n),a=g("defaultValue",e,t,n);return[s.sparseToDense(r,i,o,i.dtype===a.dtype?a:s.cast(a,i.dtype))]}default:throw TypeError(`Node type ${e.op} is not implemented`)}};/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */const E3=(e,t,n,s=Zt)=>{switch(e.op){case"SparseFillEmptyRows":{const{outputIndices:r,outputValues:o,emptyRowIndicator:i,reverseIndexMap:a}=s.sparse.sparseFillEmptyRows(g("indices",e,t,n),g("values",e,t,n),g("denseShape",e,t,n),g("defaultValue",e,t,n));return[r,o,i,a]}case"SparseReshape":{const{outputIndices:r,outputShape:o}=s.sparse.sparseReshape(g("inputIndices",e,t,n),g("inputShape",e,t,n),g("newShape",e,t,n));return[r,o]}case"SparseSegmentMean":return[s.sparse.sparseSegmentMean(g("data",e,t,n),g("indices",e,t,n),g("segmentIds",e,t,n))];case"SparseSegmentSum":return[s.sparse.sparseSegmentSum(g("data",e,t,n),g("indices",e,t,n),g("segmentIds",e,t,n))];default:throw TypeError(`Node type ${e.op} is not implemented`)}};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */const v3=(e,t,n,s=Zt)=>{switch(e.op){case"FFT":return[s.fft(g("x",e,t,n))];case"IFFT":return[s.ifft(g("x",e,t,n))];case"RFFT":return[s.rfft(g("x",e,t,n))];case"IRFFT":return[s.irfft(g("x",e,t,n))];default:throw TypeError(`Node type ${e.op} is not implemented`)}};/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */const x3=(e,t,n,s=Zt)=>{switch(e.op){case"StringNGrams":{const{nGrams:r,nGramsSplits:o}=s.string.stringNGrams(g("data",e,t,n),g("dataSplits",e,t,n),g("separator",e,t,n),g("nGramWidths",e,t,n),g("leftPad",e,t,n),g("rightPad",e,t,n),g("padWidth",e,t,n),g("preserveShortSequences",e,t,n));return[r,o]}case"StringSplit":{const{indices:r,values:o,shape:i}=s.string.stringSplit(g("input",e,t,n),g("delimiter",e,t,n),g("skipEmpty",e,t,n));return[r,o,i]}case"StringToHashBucketFast":return[s.string.stringToHashBucketFast(g("input",e,t,n),g("numBuckets",e,t,n))];default:throw TypeError(`Node type ${e.op} is not implemented`)}};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */const $3=(e,t,n,s=Zt)=>{switch(e.op){case"Cast":return[s.cast(g("x",e,t,n),g("dtype",e,t,n))];case"ExpandDims":{const r=g("axis",e,t,n);return[s.expandDims(g("x",e,t,n),r)]}case"Squeeze":{const r=g("axis",e,t,n);return[s.squeeze(g("x",e,t,n),r)]}case"Reshape":return[s.reshape(g("x",e,t,n),g("shape",e,t,n))];case"MirrorPad":return[s.mirrorPad(g("x",e,t,n),g("padding",e,t,n),g("mode",e,t,n))];case"PadV2":case"Pad":return[s.pad(g("x",e,t,n),g("padding",e,t,n),g("constantValue",e,t,n))];case"SpaceToBatchND":{const r=g("blockShape",e,t,n),o=g("paddings",e,t,n);return[s.spaceToBatchND(g("x",e,t,n),r,o)]}case"BatchToSpaceND":{const r=g("blockShape",e,t,n),o=g("crops",e,t,n);return[s.batchToSpaceND(g("x",e,t,n),r,o)]}case"DepthToSpace":{const r=g("blockSize",e,t,n),o=g("dataFormat",e,t,n).toUpperCase();return[s.depthToSpace(g("x",e,t,n),r,o)]}case"BroadcastTo":return[s.broadcastTo(g("x",e,t,n),g("shape",e,t,n))];case"BroadcastArgs":return[s.broadcastArgs(g("s0",e,t,n),g("s1",e,t,n))];default:throw TypeError(`Node type ${e.op} is not implemented`)}};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function Ll(e,t,n,s,r=Ee){const o=((i,a,l)=>{switch(i.category){case"arithmetic":return r(()=>o3(i,a,l));case"basic_math":return r(()=>i3(i,a,l));case"control":return h3(i,a,l);case"convolution":return r(()=>p3(i,a,l));case"creation":return r(()=>d3(i,a,l));case"dynamic":return m3(i,a,l);case"evaluation":return r(()=>g3(i,a,l));case"image":return r(()=>w3(i,a,l));case"graph":return r(()=>y3(i,a,l));case"logical":return r(()=>N3(i,a,l));case"matrices":return r(()=>I3(i,a,l));case"normalization":return r(()=>k3(i,a,l));case"reduction":return r(()=>S3(i,a,l));case"slice_join":return r(()=>T3(i,a,l));case"sparse":return r(()=>E3(i,a,l));case"spectral":return r(()=>v3(i,a,l));case"string":return r(()=>x3(i,a,l));case"transformation":return r(()=>$3(i,a,l));case"hash_table":return _3(i,a,l,s);case"custom":const c=Df(i.op);if(c&&c.customExecutor)return c.customExecutor(new r3(i,a,l));throw TypeError(`Custom op ${i.op} is not registered.`);default:throw TypeError(`Unknown op '${i.op}'. File an issue at https://github.com/tensorflow/tfjs/issues so we can add it, or register a custom execution with tf.registerOp()`)}})(e,t,n);return hs(o)?o.then(i=>[].concat(i)):[].concat(o)}class Fl{constructor(t={},n={},s={},r={}){this.weightMap=t,this.tensorArrayMap=n,this.tensorListMap=s,this.functionMap=r,this.rootContext={id:0,frameName:"",iterationId:0},this.contexts=[this.rootContext],this.lastId=0,this.generateCurrentContextIds()}newFrame(t,n){return{id:t,frameName:n,iterationId:0}}set currentContext(t){this.contexts!==t&&(this.contexts=t,this.generateCurrentContextIds())}get currentContext(){return this.contexts}get currentContextId(){return this._currentContextIds[0]}get currentContextIds(){return this._currentContextIds}generateCurrentContextIds(){const t=[];for(let n=0;n<this.contexts.length-1;n++){const s=this.contexts.slice(0,this.contexts.length-n);t.push(this.contextIdforContexts(s))}t.push(""),this._currentContextIds=t}contextIdforContexts(t){return t?t.map(n=>n.id===0&&n.iterationId===0?"":`${n.frameName}-${n.iterationId}`).join("/"):""}enterFrame(t){this.contexts&&(this.lastId++,this.contexts=this.contexts.slice(),this.contexts.push(this.newFrame(this.lastId,t)),this._currentContextIds.unshift(this.contextIdforContexts(this.contexts)))}exitFrame(){if(this.contexts&&this.contexts.length>1)this.contexts=this.contexts.slice(),this.contexts.splice(-1),this.currentContextIds.shift();else throw new Error("Cannot exit frame, the context is empty")}nextIteration(){if(this.contexts&&this.contexts.length>0){this.contexts=this.contexts.slice(),this.lastId++;const t=Object.assign({},this.contexts[this.contexts.length-1]);t.iterationId+=1,t.id=this.lastId,this.contexts.splice(-1,1,t),this._currentContextIds.splice(0,1,this.contextIdforContexts(this.contexts))}else throw new Error("Cannot increase frame iteration, the context is empty")}getWeight(t){return this.weightMap[t]}addTensorArray(t){this.tensorArrayMap[t.id]=t}getTensorArray(t){return this.tensorArrayMap[t]}addTensorList(t){this.tensorListMap[t.id]=t}getTensorList(t){return this.tensorListMap[t]}dispose(t){for(const n in this.tensorArrayMap)this.tensorArrayMap[n].clearAndClose(t);for(const n in this.tensorListMap)this.tensorListMap[n].clearAndClose(t)}}/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function Pl(e,t,n,s){const r=new Set,o=[];let i=null,a=null;const l=new Set,c=Object.keys(e).map(h=>ie(h)[0]);let u=[];s!=null&&(u=s.map(h=>ie(h.name)[0]));const f=[...t];for(;f.length>0;){const h=f.pop();if((Lf(h)||L3(h)||F3(h))&&i==null&&(i=h,a=i.children.map(p=>p.name).filter(p=>r.has(p))),r.add(h.name),n[h.name]==null&&c.indexOf(h.name)===-1&&u.indexOf(h.name)===-1){if(h.inputs.length===0){o.push(h.name);continue}h.inputs.forEach(p=>{l.has(p.name)||(l.add(p.name),f.push(p))})}}return{inputs:e,outputs:t,usedNodes:r,missingInputs:o,dynamicNode:i,syncInputs:a}}function A3(e,t,n){const{usedNodes:s,inputs:r}=n,o=[],i=Object.keys(r).map(u=>ie(u)[0]).map(u=>e.nodes[u]),a=e.initNodes;i.forEach(u=>{s.has(u.name)&&o.push(u)}),e.weights.forEach(u=>{s.has(u.name)&&o.push(u)}),a?.forEach(u=>{s.has(u.name)&&o.push(u)});const l=new Set,c=[];for(;o.length>0;){const u=o.pop();l.add(u.name),t[u.name]||c.push(u),u.children.forEach(f=>{!l.has(f.name)&&s.has(f.name)&&f.inputs.every(h=>l.has(h.name))&&o.push(f)})}return c}const D3=["Switch","Merge","Enter","Exit","NextIteration","StatelessIf","StatelessWhile","if","While"],R3=["NonMaxSuppressionV2","NonMaxSuppressionV3","NonMaxSuppressionV5","Where"],O3=["HashTable","HashTableV2","LookupTableImport","LookupTableImportV2","LookupTableFind","LookupTableFindV2","LookupTableSize","LookupTableSizeV2"];function Lf(e){return D3.indexOf(e.op)>=0}function L3(e){return R3.indexOf(e.op)>=0}function F3(e){return O3.indexOf(e.op)>=0}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */class Or{constructor(t,n){this.graph=t,this.parent=n,this.compiledMap=new Map,this._weightMap={},this.SEPERATOR=",",this._functions={},this._functionExecutorMap={},this.intermediateTensors={},this.keepTensorForDebug=!1,this._outputs=t.outputs,this._inputs=t.inputs,this._initNodes=t.initNodes,this._signature=t.signature,this._functions=t.functions,t.functions!=null&&Object.keys(t.functions).forEach(s=>{this._functionExecutorMap[s]=new Or(t.functions[s],this)})}get weightIds(){return this.parent?this.parent.weightIds:this._weightIds}get functionExecutorMap(){return this.parent?this.parent.functionExecutorMap:this._functionExecutorMap}get weightMap(){return this.parent?this.parent.weightMap:this._weightMap}set weightMap(t){const n=Object.keys(t).map(s=>t[s].map(r=>r.id));this._weightIds=[].concat(...n),this._weightMap=t}set resourceManager(t){this._resourceManager=t}get inputs(){return this._inputs.map(t=>({name:t.name,shape:t.attrParams.shape?t.attrParams.shape.value:void 0,dtype:t.attrParams.dtype?t.attrParams.dtype.value:void 0}))}get outputs(){return this._outputs.map(t=>({name:t.name,shape:t.attrParams.shape?t.attrParams.shape.value:void 0,dtype:t.attrParams.dtype?t.attrParams.dtype.value:void 0}))}get inputNodes(){return this._inputs.map(t=>t.signatureKey||t.name)}get outputNodes(){return this._outputs.map(t=>{const n=t.signatureKey||t.name;return t.defaultOutput?`${n}:${t.defaultOutput}`:n})}get functions(){return Object.keys(this._functions).reduce((t,n)=>(t[n]=this._functions[n].signature,t),{})}getCompilationKey(t,n){const s=t.map(o=>o.name).sort(),r=n.map(o=>o.name).sort();return s.join(this.SEPERATOR)+"--"+r.join(this.SEPERATOR)}compile(t,n){const s=Pl(t,n,this.weightMap,this._initNodes),{missingInputs:r,dynamicNode:o,syncInputs:i}=s;if(o!=null)throw new Error(`This execution contains the node '${o.name}', which has the dynamic op '${o.op}'. Please use model.executeAsync() instead. Alternatively, to avoid the dynamic ops, specify the inputs [${i}]`);if(r.length>0){const a=n.map(c=>c.name),l=Object.keys(t);throw new Error(`Cannot compute the outputs [${a}] from the provided inputs [${l}]. Missing the following inputs: [${r}]`)}return A3(this.graph,this.weightMap,s)}execute(t,n){t=this.mapInputs(t);const s=Object.keys(t).sort();this.checkInputs(t),this.checkInputShapeAndType(t),n=this.mapOutputs(n),this.checkOutputs(n);const r=s.map(f=>this.graph.nodes[ie(f)[0]]),o=n.map(f=>ie(f)[0]);let i=o.map(f=>this.graph.nodes[f]);this.resetIntermediateTensors(),i.length===0&&(i=this._outputs);const a=this.getCompilationKey(r,i);let l=this.compiledMap.get(a);l==null&&(l=this.compile(t,i),this.compiledMap.set(a,l));const c={},u={};return Ee(()=>{const f=new Fl(this.weightMap,c,u,this.functionExecutorMap),h=Object.assign({},this.weightMap);Object.keys(t).forEach(y=>{const[m,b]=ie(y),_=[];_[b]=t[y],h[m]=_});const p=this.getFrozenTensorIds(h),d={};for(let y=0;y<l.length;y++){const m=l[y];if(!h[m.name]){const b=Ll(m,h,f,this._resourceManager);if(hs(b))throw new Error(`The execution of the op '${m.op}' returned a promise. Please use model.executeAsync() instead.`);h[m.name]=b,this.checkTensorForDisposal(m.name,m,h,f,p,o,d)}}return this.parent==null&&f.dispose(p),n.map(y=>te(y,h,f))})}getFrozenTensorIds(t){const n=[].concat.apply([],Object.keys(t).map(s=>t[s]).map(s=>s.map(r=>r.id)));return new Set(n)}checkTensorForDisposal(t,n,s,r,o,i,a){n.category==="control"||i.indexOf(t)!==-1||(s[t].forEach(l=>{l!=null&&(a[l.id]=(a[l.id]||0)+n.children.length)}),n.inputs.forEach(l=>{if(l.category!=="control"){const c=b9(l.name,s,r);c?.forEach(u=>{if(u&&!u.kept&&!o.has(u.id)){const f=a[u.id];if(f===1){if(!this.keepTensorForDebug)u.dispose();else{const[h,p]=ze(n.name,r);this.intermediateTensors[h]?this.intermediateTensors[h][p]=u:(this.intermediateTensors[h]=[],this.intermediateTensors[h][p]=u)}delete a[u.id]}else f!=null&&a[u.id]--}})}}))}async executeAsync(t,n){return this._executeAsync(t,n)}disposeIntermediateTensors(){this.intermediateTensors&&(Object.keys(this.intermediateTensors).forEach(t=>this.intermediateTensors[t].forEach(n=>n.dispose())),this.disposeTensorsMap())}disposeTensorsMap(){this.tensorsMap&&Object.keys(this.tensorsMap).forEach(t=>{this.tensorsMap[t].forEach(s=>{s&&!s.kept&&!s.isDisposed&&!this.keepIds.has(s.id)&&s.dispose()})})}getIntermediateTensors(){return this.tensorsMap}resetIntermediateTensors(){for(const t in this.intermediateTensors)this.intermediateTensors[t].forEach(n=>n.dispose()),delete this.intermediateTensors[t]}async _executeAsync(t,n,s=!1,r={},o={}){s||(t=this.mapInputs(t),this.checkInputs(t),this.checkInputShapeAndType(t),n=this.mapOutputs(n),this.checkOutputs(n));try{this.keepTensorForDebug=lt().getBool("KEEP_INTERMEDIATE_TENSORS")}catch(u){console.warn(u.message)}this.resetIntermediateTensors();const i=new Fl(this.weightMap,r,o,this.functionExecutorMap);this.tensorsMap=await this.executeWithControlFlow(t,i,n,s);const a=n.map(u=>te(u,this.tensorsMap,i)),l=a.map(u=>u.id),c=Object.keys(t).map(u=>t[u].id);return this.keepIds=new Set([...l,...c,...this.weightIds]),this.keepTensorForDebug||this.disposeTensorsMap(),this.parent==null&&i.dispose(this.keepIds),a}async executeFunctionAsync(t,n,s){const r=t.reduce((o,i,a)=>(o[this.inputs[a].name]=i,o),{});return this._executeAsync(r,this.outputNodes,!0,n,s)}async executeWithControlFlow(t,n,s,r){const o=Object.keys(t),i=o.map(w=>this.graph.nodes[ie(w)[0]]),a=s.map(w=>ie(w)[0]);let l=a.map(w=>this.graph.nodes[w]);l.length===0&&(l=this._outputs);const{usedNodes:c,missingInputs:u,dynamicNode:f,syncInputs:h}=Pl(t,l,this.weightMap,this._initNodes),p=[...i,...this.graph.weights,...this._initNodes||[]].map(w=>({node:w,contexts:n.currentContext})),d=Object.assign({},this.weightMap);Object.keys(t).forEach(w=>{const[N,I]=ie(w),S=[];S[I]=t[w],d[N]=S});const y={},m=this.getFrozenTensorIds(d),b={};for(;p.length>0;){const w=this.processStack(i,p,n,d,b,m,a,y,c);await Promise.all(w)}f==null&&!r&&console.warn("This model execution did not contain any nodes with control flow or dynamic output shapes. You can use model.execute() instead.");const _=l.filter(w=>!Lf(w)&&!te(w.name,d,n)).map(w=>w.name);if(_.length>0){let w="";throw f!=null&&(w=`Alternatively, to avoid the dynamic ops, use model.execute() and specify the inputs [${h}]`),new Error(`Cannot compute the outputs [${_}] from the provided inputs [${o}]. Consider providing the following inputs: [${u}]. ${w}`)}return d}processStack(t,n,s,r,o,i,a,l,c){const u=[];for(;n.length>0;){const f=n.pop();s.currentContext=f.contexts;let h="";if(f.node.op==="Enter"&&g("isConstant",f.node,r,s)&&([h]=ze(f.node.name,s)),r[f.node.name]==null){const p=Ll(f.node,r,s,this._resourceManager);h||([h]=ze(f.node.name,s));const d=s.currentContext;hs(p)?u.push(p.then(y=>(r[h]=y,s.currentContext=d,this.checkTensorForDisposal(h,f.node,r,s,i,a,l),this.processChildNodes(f.node,n,s,r,o,c),y))):(r[h]=p,this.checkTensorForDisposal(h,f.node,r,s,i,a,l),this.processChildNodes(f.node,n,s,r,o,c))}else this.processChildNodes(f.node,n,s,r,o,c)}return u}processChildNodes(t,n,s,r,o,i){t.children.forEach(a=>{const[l]=ze(a.name,s);o[l]||!i.has(a.name)||(a.op==="Merge"?a.inputNames.some(c=>!!te(c,r,s))&&(o[l]=!0,n.push({contexts:s.currentContext,node:a})):a.inputNames.every(c=>!!te(c,r,s))&&(o[l]=!0,n.push({contexts:s.currentContext,node:a})))})}dispose(){Object.keys(this.weightMap).forEach(t=>this.weightMap[t].forEach(n=>n.dispose()))}checkInputShapeAndType(t){Object.keys(t).forEach(n=>{const s=t[n],[r]=ie(n),o=this.graph.nodes[r];if(o.attrParams.shape&&o.attrParams.shape.value){const i=o.attrParams.shape.value,a=i.length===s.shape.length&&s.shape.every((l,c)=>i[c]===-1||i[c]===l);T(a,()=>`The shape of dict['${o.name}'] provided in model.execute(dict) must be [${i}], but was [${s.shape}]`)}o.attrParams.dtype&&o.attrParams.dtype.value&&T(s.dtype===o.attrParams.dtype.value,()=>`The dtype of dict['${o.name}'] provided in model.execute(dict) must be ${o.attrParams.dtype.value}, but was ${s.dtype}`)})}mapInputs(t){const n={};for(const s in t)if(this._signature!=null&&this._signature.inputs!=null&&this._signature.inputs[s]!=null){const r=this._signature.inputs[s];n[r.name]=t[s]}else n[s]=t[s];return n}checkInputs(t){const n=Object.keys(t).filter(s=>{const[r]=ie(s);return this.graph.nodes[r]==null});if(n.length>0)throw new Error(`The dict provided in model.execute(dict) has keys: [${n}] that are not part of graph`)}mapOutputs(t){return t.map(n=>this._signature!=null&&this._signature.outputs!=null&&this._signature.outputs[n]!=null?this._signature.outputs[n].name:n,{})}checkOutputs(t){t.forEach(n=>{const[s]=ie(n);if(!this.graph.nodes[s])throw new Error(`The output '${n}' is not found in the graph`)})}}class P3{constructor(t={},n={}){this.hashTableNameToHandle=t,this.hashTableMap=n}addHashTable(t,n){this.hashTableNameToHandle[t]=n.handle,this.hashTableMap[n.id]=n}getHashTableHandleByName(t){return this.hashTableNameToHandle[t]}getHashTableById(t){return this.hashTableMap[t]}dispose(){for(const t in this.hashTableMap)this.hashTableMap[t].clearAndClose(),delete this.hashTableMap[t];for(const t in this.hashTableNameToHandle)this.hashTableNameToHandle[t].dispose(),delete this.hashTableNameToHandle[t]}}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */const U3="?tfjs-format=file",M3="model.json";class V3{constructor(t,n={},s=A1){this.modelUrl=t,this.loadOptions=n,this.version="n/a",this.io=s,n==null&&(this.loadOptions={}),this.resourceManager=new P3}get modelVersion(){return this.version}get inputNodes(){return this.executor.inputNodes}get outputNodes(){return this.executor.outputNodes}get inputs(){return this.executor.inputs}get outputs(){return this.executor.outputs}get weights(){return this.executor.weightMap}get metadata(){return this.artifacts.userDefinedMetadata}get modelSignature(){return this.signature}get modelStructuredOutputKeys(){return this.structuredOutputKeys}findIOHandler(){const t=this.modelUrl;if(t.load!=null)this.handler=t;else if(this.loadOptions.requestInit!=null)this.handler=this.io.browserHTTPRequest(t,this.loadOptions);else{const n=this.io.getLoadHandlers(t,this.loadOptions);if(n.length===0)n.push(this.io.browserHTTPRequest(t,this.loadOptions));else if(n.length>1)throw new Error(`Found more than one (${n.length}) load handlers for URL '${[t]}'`);this.handler=n[0]}}load(){if(this.findIOHandler(),this.handler.load==null)throw new Error("Cannot proceed with model loading because the IOHandler provided does not have the `load` method implemented.");const t=this.handler.load();return hs(t)?t.then(n=>this.loadSync(n)):this.loadSync(t)}loadSync(t){this.artifacts=t;const n=this.artifacts.modelTopology;let s=this.artifacts.signature;if(this.artifacts.userDefinedMetadata!=null){const o=this.artifacts.userDefinedMetadata;o.signature!=null&&(s=o.signature),o.structuredOutputKeys!=null&&(this.structuredOutputKeys=o.structuredOutputKeys)}this.signature=s,this.version=`${n.versions.producer}.${n.versions.minConsumer}`;const r=this.io.decodeWeights(this.artifacts.weightData,this.artifacts.weightSpecs);if(this.executor=new Or(Al.Instance.transformGraph(n,this.signature)),this.executor.weightMap=this.convertTensorMapToTensorsMap(r),this.executor.resourceManager=this.resourceManager,t.modelInitializer!=null&&t.modelInitializer.node!=null){const o=Al.Instance.transformGraph(t.modelInitializer);this.initializer=new Or(o),this.initializer.weightMap=this.executor.weightMap,this.initializer.resourceManager=this.resourceManager,this.initializer.executeAsync({},[])}return!0}async save(t,n){if(typeof t=="string"){const s=this.io.getSaveHandlers(t);if(s.length===0)throw new Error(`Cannot find any save handlers for URL '${t}'`);if(s.length>1)throw new Error(`Found more than one (${s.length}) save handlers for URL '${t}'`);t=s[0]}if(t.save==null)throw new Error("GraphModel.save() cannot proceed because the IOHandler provided does not have the `save` attribute defined.");return t.save(this.artifacts)}predict(t,n){const s=this.execute(t,this.outputNodes);if(this.structuredOutputKeys){const r=s instanceof Kt?[s]:s,o={};return r.forEach((i,a)=>o[this.structuredOutputKeys[a]]=i),o}return s}normalizeInputs(t){if(!(t instanceof Kt)&&!Array.isArray(t))return t;if(t=Array.isArray(t)?t:[t],t.length!==this.inputNodes.length)throw new Error(`Input tensor count mismatch,the graph model has ${this.inputNodes.length} placeholders, while there are ${t.length} input tensors.`);return this.inputNodes.reduce((n,s,r)=>(n[s]=t[r],n),{})}normalizeOutputs(t){return t=t||this.outputNodes,Array.isArray(t)?t:[t]}execute(t,n){t=this.normalizeInputs(t),n=this.normalizeOutputs(n);const s=this.executor.execute(t,n);return s.length>1?s:s[0]}async executeAsync(t,n){t=this.normalizeInputs(t),n=this.normalizeOutputs(n);const s=await this.executor.executeAsync(t,n);return s.length>1?s:s[0]}getIntermediateTensors(){return this.executor.getIntermediateTensors()}disposeIntermediateTensors(){this.executor.disposeIntermediateTensors()}convertTensorMapToTensorsMap(t){return Object.keys(t).reduce((n,s)=>(n[s]=[t[s]],n),{})}dispose(){this.executor.dispose(),this.initializer&&this.initializer.dispose(),this.resourceManager.dispose()}}async function B3(e,t={},n=A1){if(e==null)throw new Error("modelUrl in loadGraphModel() cannot be null. Please provide a url or an IOHandler that loads the model");t==null&&(t={}),t.fromTFHub&&typeof e=="string"&&(e=C3(e));const s=new V3(e,t,n);return await s.load(),s}function C3(e){return e.endsWith("/")||(e=e+"/"),`${e}${M3}${U3}`}/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function J(e,t){Array.isArray(e)||(e=[e]),e.forEach(n=>{n!=null&&T(n.dtype!=="complex64",()=>`${t} does not support complex64 tensors in the CPU backend.`)})}/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */const z3=_f;class uo extends ac{constructor(){super(),this.blockSize=48,this.firstUse=!0,this.data=new Ah(this,Il())}nextDataId(){return uo.nextDataId++}write(t,n,s){this.firstUse&&(this.firstUse=!1,lt().get("IS_NODE")&&xn(`
============================
Hi, looks like you are running TensorFlow.js in Node.js. To speed things up dramatically, install our node backend, visit https://github.com/tensorflow/tfjs-node for more details. 
============================`));const r={id:this.nextDataId()};return this.data.set(r,{values:t,dtype:s,refCount:1}),r}makeTensorInfo(t,n,s){let r;if(n==="string"&&s!=null&&s.length>0&&jr(s[0])){const o=s.map(i=>Pn(i));r=this.write(o,t,n)}else r=this.write(s,t,n);return{dataId:r,shape:t,dtype:n}}refCount(t){return this.data.has(t)?this.data.get(t).refCount:0}incRef(t){const n=this.data.get(t);n.refCount++}decRef(t){if(this.data.has(t)){const n=this.data.get(t);n.refCount--}}move(t,n,s,r,o){this.data.set(t,{values:n,dtype:r,refCount:o})}numDataIds(){return this.data.numDataIds()}async read(t){return this.readSync(t)}readSync(t){const{dtype:n,complexTensorInfos:s}=this.data.get(t);if(n==="complex64"){const r=this.readSync(s.real.dataId),o=this.readSync(s.imag.dataId);return bs(r,o)}return this.data.get(t).values}bufferSync(t){const n=this.readSync(t.dataId);if(t.dtype==="string")try{const s=n.map(r=>Xs(r));return at(t.shape,t.dtype,s)}catch{throw new Error("Failed to decode encoded string bytes into utf-8")}return at(t.shape,t.dtype,n)}makeOutput(t,n,s){return Il().makeTensorFromTensorInfo(this.makeTensorInfo(n,s,t),this)}disposeData(t,n=!1){if(this.data.has(t)){if(this.data.get(t).refCount--,!n&&this.data.get(t).refCount>0)return!1;const{complexTensorInfos:s}=this.data.get(t);s!=null&&(this.disposeData(s.real.dataId,!0),this.disposeData(s.imag.dataId,!0)),this.data.delete(t)}return!0}disposeIntermediateTensorInfo(t){this.disposeData(t.dataId)}async time(t){const n=ds();return t(),{kernelMs:ds()-n}}memory(){return{unreliable:!0,reasons:["The reported memory is an upper bound. Due to automatic garbage collection, the true allocated memory may be less."]}}where(t){J([t],"where");const n=this.readSync(t.dataId);return z3(t.shape,n)}dispose(){}floatPrecision(){return 32}epsilon(){return super.epsilon()}}uo.nextDataId=0;/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function W3(e){const t=new Float32Array(e.length);for(let n=0;n<e.length;++n)t[n]=Math.abs(e[n]);return t}const H3=e=>{const{x:t}=e.inputs,n=e.backend;J(t,"abs");let s=new Float32Array(q(t.shape));const r=n.data.get(t.dataId).values;return s=W3(r),n.makeOutput(s,t.shape,t.dtype)},q3={kernelName:pc,backendName:"cpu",kernelFunc:H3};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function Ft(e){return(t,n,s,r,o)=>{const i=Dt(t,n),a=i.length,l=nt(i),c=q(i),u=Xt(o,c),f=t.length,h=n.length,p=nt(t),d=nt(n),y=Tr(t,i),m=Tr(n,i);if(y.length+m.length===0)for(let b=0;b<u.length;++b)u[b]=e(s[b%s.length],r[b%r.length]);else for(let b=0;b<u.length;++b){const _=Ts(b,a,l),w=_.slice(-f);y.forEach(E=>w[E]=0);const N=We(w,f,p),I=_.slice(-h);m.forEach(E=>I[E]=0);const S=We(I,h,d);u[b]=e(s[N],r[S])}return[u,i]}}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function le(e){const{inputs:t,backend:n}=e,{real:s,imag:r}=t,o=n.data.get(s.dataId).values,i=n.data.get(r.dataId).values,a=n.makeTensorInfo(s.shape,"complex64"),l=n.data.get(a.dataId);return l.complexTensorInfos={real:n.makeTensorInfo(s.shape,"float32",o),imag:n.makeTensorInfo(r.shape,"float32",i)},a}const G3={kernelName:Tc,backendName:"cpu",kernelFunc:le};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function Lr(e,t,n="float32"){if(n==="complex64"){const r=Lr(e,t,"float32"),o=Lr(e,t,"float32");return le({inputs:{real:r,imag:o},backend:e})}const s=Yt(q(t),n);return e.makeTensorInfo(t,n,s)}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function qe(e){const{inputs:t,backend:n}=e,{x:s}=t;return n.incRef(s.dataId),{dataId:s.dataId,shape:s.shape,dtype:s.dtype}}const K3={kernelName:Bi,backendName:"cpu",kernelFunc:qe};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function Gn(e){const{inputs:t,backend:n}=e,{input:s}=t,r=n.data.get(s.dataId).complexTensorInfos.real,o=n.data.get(r.dataId).values;return n.makeTensorInfo(r.shape,r.dtype,o)}const j3={kernelName:ku,backendName:"cpu",kernelFunc:Gn};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function X3(e,t,n,s){if(s==="int32"){const r=Int32Array.from(e);return[t,"int32",r]}if(s==="bool"){const r=Yn([0],n),[o,i]=Ft((a,l)=>a!==l?1:0)(t,[],e,r,"bool");return[i,"bool",o]}throw new Error(`Error in Cast: failed to cast ${n} to ${s}`)}function In(e){const{inputs:t,backend:n,attrs:s}=e,{x:r}=t,{dtype:o}=s;if(o==="complex64"){if(r.dtype==="complex64")return qe({inputs:{x:r},backend:n});const u=Lr(n,r.shape,r.dtype),f=In({inputs:{x:r},backend:n,attrs:{dtype:"float32"}}),h=le({inputs:{real:f,imag:u},backend:n});return n.disposeIntermediateTensorInfo(u),n.disposeIntermediateTensorInfo(f),h}if(r.dtype==="complex64"){const u=Gn({inputs:{input:r},backend:n}),f=In({inputs:{x:u},backend:n,attrs:{dtype:o}});return n.disposeIntermediateTensorInfo(u),f}if(!Fh(r.dtype,o)){const u=qe({inputs:{x:r},backend:n});return{dataId:u.dataId,shape:u.shape,dtype:o}}const i=n.data.get(r.dataId).values,[a,l,c]=X3(i,r.shape,r.dtype,o);return n.makeTensorInfo(a,l,c)}const Y3={kernelName:Ti,backendName:"cpu",kernelFunc:In};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function Ct(e,t,n,s){return n==null?({inputs:r,backend:o})=>{const{a:i,b:a}=r,l=o;J([i,a],e);const c=l.data.get(i.dataId).values,u=l.data.get(a.dataId).values,f=i.dtype==="string"?Dr(c):c,h=i.dtype==="string"?Dr(u):u,p=s||i.dtype,[d,y]=t(i.shape,a.shape,f,h,p);return l.makeTensorInfo(y,p,d)}:({inputs:r,backend:o})=>{const{a:i,b:a}=r,l=o;if(i.dtype==="complex64"||a.dtype==="complex64"){const c=In({inputs:{x:i},backend:l,attrs:{dtype:"complex64"}}),u=l.data.get(c.dataId),f=u.complexTensorInfos.real,h=u.complexTensorInfos.imag,p=l.data.get(f.dataId).values,d=l.data.get(h.dataId).values,y=In({inputs:{x:a},backend:l,attrs:{dtype:"complex64"}}),m=l.data.get(y.dataId),b=m.complexTensorInfos.real,_=m.complexTensorInfos.imag,w=l.data.get(b.dataId).values,N=l.data.get(_.dataId).values,[I,S,E]=n(i.shape,a.shape,p,d,w,N),D=l.makeTensorInfo(E,"float32",I),L=l.makeTensorInfo(E,"float32",S),U=le({inputs:{real:D,imag:L},backend:l});return l.disposeIntermediateTensorInfo(c),l.disposeIntermediateTensorInfo(y),l.disposeIntermediateTensorInfo(D),l.disposeIntermediateTensorInfo(L),U}else{const c=l.data.get(i.dataId).values,u=l.data.get(a.dataId).values,f=s||i.dtype,[h,p]=t(i.shape,a.shape,c,u,f);return l.makeTensorInfo(p,f,h)}}}function qa(e){return(t,n,s,r,o,i)=>{const a=Dt(t,n),l=q(a),c=a.length,u=nt(a),f=Xt("float32",l),h=Xt("float32",l),p=Tr(t,a),d=Tr(n,a),y=bs(s,r),m=bs(o,i),b=t.length,_=nt(t),w=n.length,N=nt(n);if(p.length+d.length===0)for(let I=0;I<f.length;I++){const S=I%y.length,E=I%m.length,D=e(y[S*2],y[S*2+1],m[E*2],m[E*2+1]);f[I]=D.real,h[I]=D.imag}else for(let I=0;I<f.length;I++){const S=Ts(I,c,u),E=S.slice(-b);p.forEach(B=>E[B]=0);const D=We(E,b,_),L=S.slice(-w);d.forEach(B=>L[B]=0);const U=We(L,w,N),M=e(y[D*2],y[D*2+1],m[U*2],m[U*2+1]);f[I]=M.real,h[I]=M.imag}return[f,h,a]}}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */const Z3=Ft((e,t)=>e+t),J3=qa((e,t,n,s)=>({real:e+n,imag:t+s})),_s=Ct(Yr,Z3,J3),Q3={kernelName:Yr,backendName:"cpu",kernelFunc:_s};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function Ff(e,t,n,s,r){const o=q(s),i=Yt(r,n);for(let a=0;a<e.length;a++){const l=e[a];if(l<0)throw new Error("Input x must be non-negative!");l>=r||(o>0?i[l]+=t[a]:i[l]+=1)}return i}function t8(e,t,n,s=!1){const r=e.shape[0],o=e.shape[1],i=at([r,n],t.dtype);for(let a=0;a<r;a++)for(let l=0;l<o;l++){const c=e.get(a,l);if(c<0)throw new Error("Input x must be non-negative!");c>=n||(s?i.set(1,a,c):t.size>0?i.set(i.get(a,c)+t.get(a,l),a,c):i.set(i.get(a,c)+1,a,c))}return i}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function $s(e){return(t,n,s)=>{const r=Xt(n,t.length);for(let o=0;o<t.length;++o)r[o]=e(t[o],s);return r}}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function pt(e,t,n){return({inputs:s,attrs:r,backend:o})=>{const{x:i}=s;if(J(i,e),i.dtype==="string"||n==="string")throw new Error("unaryKernelFunc does not support string input/output");const a=o,l=a.data.get(i.dataId).values,c=q(i.shape),u=n||i.dtype,f=Ht(u,c);for(let h=0;h<c;++h)f[h]=t(l[h],r);return a.makeTensorInfo(i.shape,u,f)}}function As(e,t,n){return({inputs:s,attrs:r,backend:o})=>{const{x:i}=s;if(J(i,e),i.dtype==="string"||n==="string")throw new Error("unaryKernelFunc does not support string input/output");const a=o,l=a.data.get(i.dataId).values,c=n||i.dtype,u=t(l,c,r);return a.makeTensorInfo(i.shape,c,u)}}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const e8=$s(e=>Math.ceil(e)),n8=As(Ei,e8),s8={kernelName:Ei,backendName:"cpu",kernelFunc:n8};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function r8(e,t,n,s){const r=Ht(n,q(t));if(s&&n!=="string"){let o=0;e.forEach(i=>{const a=q(i.shape);r.set(i.vals,o),o+=a})}else{let o=0;e.forEach(i=>{const a=n==="string"?Dr(i.vals):i.vals;let l=0;for(let c=0;c<i.shape[0];++c){const u=c*t[1]+o;for(let f=0;f<i.shape[1];++f)r[u+f]=a[l++]}o+=i.shape[1]})}return r}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */const o8=Ft((e,t)=>e===t?1:0),Pf=Ct(Oi,o8,null,"bool"),i8={kernelName:Oi,backendName:"cpu",kernelFunc:Pf};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const a8=$s(e=>Math.exp(e)),Uf=As(Li,a8,"float32"),l8={kernelName:Li,backendName:"cpu",kernelFunc:Uf};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const c8=$s(e=>Math.expm1(e)),u8=As(Fi,c8),f8={kernelName:Fi,backendName:"cpu",kernelFunc:u8};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const h8=$s(e=>Math.floor(e)),p8=As(Pi,h8),d8={kernelName:Pi,backendName:"cpu",kernelFunc:p8};/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function m8(e,t,n,s,r,o,i,a,l){const c=at([s,o],n);for(let u=0;u<s;u++){const f=[];let h=0;for(let p=0;p<r;p++){const d=e[u*r+p];h+=d*i[p],f.push(d)}if(h<0||h>=l/o)throw new Error(`Invalid indices: ${f} does not index into ${a}`);for(let p=0;p<o;p++)c.values[u*o+p]=t.get(...t.indexToLoc(h*o+p))}return c}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function g8(e,t,n){const s=at(n,e.dtype);for(let r=0;r<s.size;++r){const i=s.indexToLoc(r).slice(),a=i[0],l=i[2],c=t.locToIndex([a,l]);i[2]=t.values[c];const u=e.locToIndex(i);0<=u&&u<e.values.length&&(s.values[r]=e.values[u])}return s}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */const y8=Ft((e,t)=>e>t?1:0),b8=Ct(Mi,y8,null,"bool"),_8={kernelName:Mi,backendName:"cpu",kernelFunc:b8};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */const w8=Ft((e,t)=>e>=t?1:0),N8=Ct(Vi,w8,null,"bool"),I8={kernelName:Vi,backendName:"cpu",kernelFunc:N8};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */const k8=Ft((e,t)=>e<t?1:0),S8=Ct(Hi,k8,null,"bool"),T8={kernelName:Hi,backendName:"cpu",kernelFunc:S8};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */const E8=Ft((e,t)=>e<=t?1:0),v8=Ct(qi,E8,null,"bool"),x8={kernelName:qi,backendName:"cpu",kernelFunc:v8};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function $8(e,t,n){const s=(t-e)/(n-1),r=Yt(n,"float32");r[0]=e;for(let o=1;o<r.length;o++)r[o]=r[o-1]+s;return r}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const A8=$s(e=>Math.log(e)),D8=As(Gi,A8),R8={kernelName:Gi,backendName:"cpu",kernelFunc:D8};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function O8(e,t,n,s){const r=Xt(s,q(n));for(let o=0;o<r.length;++o){const i=o*t;let a=e[i];for(let l=0;l<t;++l){const c=e[i+l];(Number.isNaN(c)||c>a)&&(a=c)}r[o]=a}return r}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */const L8=Ft((e,t)=>Math.max(e,t)),F8=Ct(Zi,L8),P8={kernelName:Zi,backendName:"cpu",kernelFunc:F8};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */const U8=Ft((e,t)=>Math.min(e,t)),M8=Ct(Ji,U8),V8={kernelName:Ji,backendName:"cpu",kernelFunc:M8};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */const Mf=Ft((e,t)=>e*t),B8=qa((e,t,n,s)=>({real:e*n-t*s,imag:e*s+t*n})),fo=Ct(ta,Mf,B8),C8={kernelName:ta,backendName:"cpu",kernelFunc:fo};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function z8(e,t,n){const s=Ia(-1,n);return Mf([],t,s,e,n)}function W8(e){const{inputs:t,backend:n}=e,{x:s}=t;J(s,"neg");const r=n.data.get(s.dataId).values,[o,i]=z8(r,s.shape,s.dtype);return n.makeTensorInfo(i,s.dtype,o)}const H8={kernelName:uu,backendName:"cpu",kernelFunc:W8};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */const q8=Ft((e,t)=>e!==t?1:0),G8=Ct(ea,q8,null,"bool"),K8={kernelName:ea,backendName:"cpu",kernelFunc:G8};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function Vf(e,t,n,s,r){const o=t.length,i=q(t),a=nt(t),l=nt(r),c=Xt(n,q(r));for(let u=0;u<i;++u){const f=Ts(u,o,a),h=new Array(f.length);for(let d=0;d<h.length;d++)h[d]=f[s[d]];const p=We(h,o,l);c[p]=e[u]}return c}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function re(e){const{inputs:t,attrs:n,backend:s}=e,{x:r}=t,{perm:o}=n;J(r,"transpose");const i=r.shape.length,a=new Array(i);for(let f=0;f<a.length;f++)a[f]=r.shape[o[f]];const l=s.data.get(r.dataId).values,c=Vf(l,r.shape,r.dtype,o,a);return{dataId:s.write(c,a,r.dtype),shape:a,dtype:r.dtype}}const j8={kernelName:hr,backendName:"cpu",kernelFunc:re};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function X8(e,t,n,s){const[r,o]=cn(e,s),i=Es(t,"int32"),a=Yt(q(r),i),l=q(o);for(let c=0;c<a.length;++c){const u=c*l;let f=1;for(let h=0;h<l;++h)f*=n[u+h];a[c]=f}return{outVals:a,outShape:r,outDtype:i}}function Y8(e){const{inputs:t,backend:n,attrs:s}=e,{x:r}=t,{axis:o,keepDims:i}=s;J(r,"prod");const a=r.shape.length,l=Bt(o,r.shape),c=je(l,a);let u=l,f=r;const h=[];c!=null&&(f=re({inputs:{x:r},backend:n,attrs:{perm:c}}),h.push(f),u=Xe(u.length,a));const p=n.data.get(f.dataId).values,{outVals:d,outShape:y,outDtype:m}=X8(f.shape,f.dtype,p,u);let b=y;return i&&(b=Ue(y,l)),h.forEach(_=>n.disposeIntermediateTensorInfo(_)),n.makeTensorInfo(b,m,d)}const Z8={kernelName:_u,backendName:"cpu",kernelFunc:Y8};/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function J8(e,t,n){e.forEach((s,r)=>{if(s<0||s>=n){const o=Ts(r,t.length,nt(t)).join(",");throw new Error(`indices[${o}] = ${s} is not in [0, ${n})`)}})}function Q8(e,t){for(let n=0;n<e.length;++n){const s=e[n],r=n===e.length-1?t:e[n+1].length;if(s.length===0)throw new Error("Ragged splits may not be empty");if(s[0]<0)throw new Error("Ragged splits must be non-negative");if(s[s.length-1]>r)throw new Error("Ragged splits must not point past values");for(let o=1;o<s.length;++o)if(s[o-1]>s[o])throw new Error("Ragged splits must be sorted in ascending order")}}function tb(e,t,n,s){const r=[];let o=0;const i=t.length-1+n.length,a=new Array(i).fill(null).map(()=>[0]);Q8(n,s);let l=1;for(let c=0;c<t.length-1;++c){l*=t[c];const u=t[c+1];for(let f=1;f<l+1;++f)a[c].push(f*u)}for(let c=0;c<e.length;++c){let u=e[c],f=e[c]+1;for(let h=0;h<n.length;++h){const p=n[h],d=h+t.length-1;if(d>=0){const y=a[d],m=y[y.length-1]-p[u];for(let b=u;b<f;++b)a[d].push(p[b+1]+m)}u=p[u],f=p[f]}f!==u&&(r.push([u,f]),o+=f-u)}return{outSplits:a,valueSlices:r,numValues:o}}function eb(e){const t=[];for(let n=0;n<e.length;++n){const s=e[n].length,r=Ht("int32",s);t.push(r),e[n].forEach((o,i)=>r[i]=o)}return t}function Ul(e,t){const n=e.slice(0,t);for(;n.length<t;)n.push(1);for(let s=t;s<e.length;s++)n[t-1]*=e[s];return n}function nb(e,t,n,s,r,o){const i=Ul(t,2)[1],a=Ul(o,2)[1];let l=0;for(const c of n)for(let u=c[0];u<c[1];++u){for(let f=0;f<s;++f)r[l*a+f]=e[u*i+f];++l}}function sb(e,t,n,s,r){const o=t.slice();o[0]=r;const i=Ht(n,q(o)),a=e.length,l=a===0?0:a/t[0];return nb(e,t,s,l,i,o),[i,o]}function rb(e,t,n,s,r,o,i,a){if(e.length===0)throw new Error("paramsNestedSplits must be non empty");if(t[0].length===0)throw new Error("Split tensors must not be scalars");const l=t[0][0]-1;if(J8(o,i,l),s.length===0)throw new Error("params.rank must be nonzero");const c=s[0],{outSplits:u,valueSlices:f,numValues:h}=tb(o,i,e,c),p=eb(u),d=sb(n,s,r,f,h);return[p,d[0],d[1]]}/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */var ye=Ce;class Fr{constructor(t,n,s,r,o,i,a,l,c,u){this.shape=t,this.shapeShape=n,this.values=s,this.valuesShape=r,this.valuesDType=o,this.defaultValue=i,this.defaultValueShape=a,this.rowPartitionValues=l,this.rowPartitionValuesShapes=c,this.rowPartitionTypes=$y(u),this.raggedRank=Ay(this.rowPartitionTypes)}getRowPartitionTypeByDimension(t){return this.rowPartitionTypes[0]===ye.FIRST_DIM_SIZE?this.rowPartitionTypes[t+1]:this.rowPartitionTypes[t]}getRowPartitionTensor(t){return this.rowPartitionTypes[0]===ye.FIRST_DIM_SIZE?this.rowPartitionValues[t+1]:this.rowPartitionValues[t]}getMaxWidth(t){const n=this.getRowPartitionTensor(t-1);switch(this.getRowPartitionTypeByDimension(t-1)){case ye.VALUE_ROWIDS:return Fr.getMaxWidthValueRowID(n);case ye.ROW_SPLITS:return Fr.getMaxWidthRowSplit(n);default:throw new Error(`Cannot handle partition type ${ye[this.getRowPartitionTypeByDimension(t-1)]}`)}}static getMaxWidthRowSplit(t){const n=t.length;if(n===0||n===1)return 0;let s=0;for(let r=0;r<n-1;++r){const o=t[r+1]-t[r];o>s&&(s=o)}return s}static getMaxWidthValueRowID(t){const n=t.length;if(n===0)return 0;let s=0,r=t[0],o=0;for(let i=1;i<n;++i){const a=t[i];a!==r&&(r=a,o=Math.max(i-s,o),s=i)}return Math.max(n-s,o)}tensorShapeFromTensor(t,n,s=!0){if(n.length===0){if(t[0]===-1)return[];throw new Error("The only valid scalar shape tensor is the fully unknown shape specified as -1.")}return Vl(t,s)}calculateOutputSize(t){const n=this.valuesShape,s=this.defaultValueShape;Dy(s,n);const r=this.tensorShapeFromTensor(this.shape,this.shapeShape),i=xy(this.raggedRank,r,n);i[0]<0&&(i[0]=t);for(let a=1;a<=this.raggedRank;++a)i[a]<0&&(i[a]=this.getMaxWidth(a));return i}calculateFirstParentOutputIndex(t,n,s){const r=Math.min(t,s),o=[];let i=0;for(let a=0;a<r;++a,i+=n)o.push(i);for(let a=r;a<t;++a)o.push(-1);return T(o.length===t,()=>"Final length of result must be equal to firstDimension."),o}calculateOutputIndexRowSplit(t,n,s,r){const o=t.length,i=[];for(let a=0;a<o-1;++a){const l=t[a+1]-t[a];let c=Math.min(r,l),u=n[a];u===-1&&(c=0);for(let f=0;f<c;++f)i.push(u),u+=s;for(let f=0;f<l-c;++f)i.push(-1)}if(o>0&&i.length!==t[o-1])throw new Error("Invalid row split size.");return i}calculateOutputIndexValueRowID(t,n,s,r){const o=t.length,i=[];if(o===0)return[];let a=0,l=t[0];if(l>=n.length)throw new Error(`Got currentValueRowId=${l}, which is not less than ${n.length}`);let c=n[l];i.push(c);for(let u=1;u<o;++u){const f=t[u];if(f===l)c>=0&&(++a,a<r?c+=s:c=-1);else{if(a=0,l=f,f>=n.length)throw new Error(`Got nextValueRowId=${f} which is not less than ${n.length}`);c=n[f]}i.push(c)}if(i.length!==t.length)throw new Error("Invalid row ids.");return i}calculateOutputIndex(t,n,s,r){const o=this.getRowPartitionTensor(t),i=this.getRowPartitionTypeByDimension(t);switch(i){case ye.VALUE_ROWIDS:return this.calculateOutputIndexValueRowID(o,n,s,r);case ye.ROW_SPLITS:if(o.length-1>n.length)throw new Error(`Row partition size is greater than output size: ${o.length-1} > ${n.length}`);return this.calculateOutputIndexRowSplit(o,n,s,r);default:throw new Error(`Unsupported partition type: ${ye[i]}`)}}getFirstDimensionSize(){const t=this.rowPartitionValues[0];if(this.rowPartitionTypes.length===0)throw new Error("No row_partition_types given.");const n=this.rowPartitionTypes[0];switch(n){case ye.FIRST_DIM_SIZE:return t[0];case ye.VALUE_ROWIDS:throw new Error("Cannot handle VALUE_ROWIDS in first dimension.");case ye.ROW_SPLITS:return this.rowPartitionValuesShapes[0][0]-1;default:throw new Error(`Cannot handle type ${ye[n]}`)}}compute(){if(this.rowPartitionValues[0].length<=0)throw new Error("Invalid first partition input. Tensor requires at least one element.");const n=this.getFirstDimensionSize(),s=this.calculateOutputSize(n),r=new Array(this.raggedRank+1);r[r.length-1]=1;for(let l=r.length-2;l>=0;--l)r[l]=r[l+1]*s[l+1];const o=Vl(s,!1),i=Ht(this.valuesDType,q(o));if(r[0]*s[0]>0){let l=this.calculateFirstParentOutputIndex(n,r[0],s[0]);for(let c=1;c<=this.raggedRank;++c)l=this.calculateOutputIndex(c-1,l,r[c],s[c]);this.setOutput(this.raggedRank,l,i,o)}return[o,i]}setOutput(t,n,s,r){if(s.length===0)return;const o=this.values,i=s;let a=r.slice();a=a.slice(t+1);const l=q(a),c=n.length;let u=this.defaultValue;if(u.length!==l&&u.length!==1){const d=this.defaultValueShape;Ee(()=>{const y=C(u,d);u=Ws(y,a).dataSync()})}let f=0,h=0,p=0;for(let d=0;d<=c;++d){let y=d<c?n[d]:-1;if(y===p){++p;continue}if(h<p){const m=o.subarray(f*l),b=i.subarray(h*l),_=(p-h)*l;Ml(b,m,_)}if(d>=c){const m=s.length;y=Math.floor(m/l)}if(y>p)if(this.defaultValue.length===1)i.subarray(p*l,y*l).fill(this.defaultValue[0]),p=y;else for(;y>p;){const m=i.slice(p*l);Ml(m,u,l),++p}y<0?(f=d+1,h=p):(f=d,h=p,p=h+1)}}}function Ml(e,t,n){for(let s=0;s<n;s++)e[s]=t[s]}function Vl(e,t){const n=[];for(let s of e){if(s<0){if(!t)throw new Error(`Dimension ${s} must be >= 0`);if(s<-1)throw new Error(`Dimension ${s} must be >= -1`);s=-1}n.push(s)}return n}function ob(e,t,n,s,r,o,i,a,l,c){return new Fr(e,t,n,s,r,o,i,a,l,c).compute()}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function ib(e,t,n,s){const r=e===t,o=e<t&&n<0,i=t<e&&n>1;if(r||o||i)return Yt(0,s);const a=Math.abs(Math.ceil((t-e)/n)),l=Yt(a,s);t<e&&n===1&&(n=-1),l[0]=e;for(let c=1;c<l.length;c++)l[c]=l[c-1]+n;return l}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const ab=$s(e=>1/Math.sqrt(e)),lb=As(aa,ab),cb={kernelName:aa,backendName:"cpu",kernelFunc:lb};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function Us(e,t,n,s,r,o,i,a,l,c){const u=[s/r,r],f=e.values,h=t.values;if(s===0)return at(n,t.dtype);const p=at(u,t.dtype);typeof l=="string"||typeof l=="number"?p.values.fill(l):typeof l=="boolean"&&p.values.fill(+l);for(let d=0;d<o;d++){const y=[];let m=0;for(let b=0;b<i;b++){const _=f[d*i+b];y.push(_),m+=_*a[b]}if(m<0||m>=s/r)throw new Error(`Invalid indices: ${y} does not index into ${n}`);for(let b=0;b<r;b++)c?p.values[m*r+b]+=h[d*r+b]:p.values[m*r+b]=t.rank===0?h[0]:h[d*r+b]}return p}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Bf=pt(ha,e=>1/(1+Math.exp(-e))),ub={kernelName:ha,backendName:"cpu",kernelFunc:Bf};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function fb(e,t,n,s,r){const o=zd(s,t,n),i=q(n),a=nt(s);if(o){const f=Wd(t,a);return r==="string"?e.slice(f,f+i):e.subarray(f,f+i)}const l=r==="string"?Dr(e):e,c=at(s,r,l),u=at(n,r);for(let f=0;f<u.size;++f){const h=u.indexToLoc(f),p=h.map((d,y)=>d+t[y]);u.set(c.get(...p),...h)}return r==="string"?m9(u.values):u.values}function Kn(e){const{inputs:t,backend:n,attrs:s}=e,{x:r}=t,{begin:o,size:i}=s;J(r,"slice");const[a,l]=Hd(r,o,i);Bd(r,a,l);const c=n.data.get(r.dataId).values,u=fb(c,a,l,r.shape,r.dtype);return n.makeTensorInfo(l,r.dtype,u)}const hb={kernelName:Du,backendName:"cpu",kernelFunc:Kn};/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function pb(e,t,n,s,r,o,i){const a=t[0],l=o[0],c=new Array(l),u=new Array(a),f=t[1];if(l===0){if(a!==0)throw new Error(s9(a));const m=Ht(n,0),b=Ht(r,0);return[m,[0,f],b,c,u]}let h=!0,p=0;const d=new Array(l).fill(0);for(let m=0;m<a;++m){const b=e[m*f];if(b<0)throw new Error(r9(m,b));if(b>=l)throw new Error(o9(m,b,l));++d[b],h=h&&b>=p,p=b}let y=!0;for(let m=0;m<l;++m){const b=d[m]===0;c[m]=b,y=y&&!b,d[m]=Math.max(d[m],1),m>0&&(d[m]+=d[m-1])}if(y&&h){const m=e,b=s;for(let _=0;_<a;++_)u[_]=_;return[m,[a,f],b,c,u]}else{const m=d[l-1],b=Ht(n,m*f),_=Ht(r,m),w=new Array(l).fill(0);for(let N=0;N<a;++N){const I=e[N*f],S=w[I],E=(I===0?0:d[I-1])+S;w[I]++;for(let D=0;D<f;++D)b[E*f+D]=e[N*f+D];_[E]=s[N],u[N]=E}for(let N=0;N<l;++N)if(w[N]===0){const S=N===0?0:d[N-1];b[S*f+0]=N;for(let E=1;E<f;++E)b[S*f+E]=0;_[S]=i}return[b,[m,f],_,c,u]}}/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function db(e,t,n,s,r){const o=q(s),i=t[0],a=r.length,l=[];let c=1,u=-1;for(let m=0;m<a;++m){const b=r[m];if(b===-1){if(u!==-1)throw new Error(i9(u,m));u=m,l.push(1)}else{if(b<0)throw new Error(a9(m,b));c*=b,l.push(b)}}if(u!==-1){if(c<=0)throw new Error(l9());const m=Math.trunc(o/c);if(c*m!==o)throw new Error(c9(s,l));l[u]=m}if(q(l)!==o)throw new Error(u9(s,l));const h=s.length,p=[];if(h>0){p[h-1]=1;for(let m=h-2;m>=0;--m)p[m]=p[m+1]*s[m+1]}const d=[];if(a>0){d[a-1]=1;for(let m=a-2;m>=0;--m)d[m]=d[m+1]*l[m+1]}const y=Ht(n,i*a);for(let m=0;m<i;++m){let b=0;for(let _=0;_<h;++_)b+=e[m*h+_]*p[_];for(let _=0;_<a;++_)y[m*a+_]=Math.trunc(b/d[_]),b%=d[_]}return[y,[i,a],l]}/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function Cf(e,t,n,s,r,o=!1,i=0){const a=s.length,l=[t[0],e.length/t[0]],c=l[1],f=a>0?r[a-1]+1:0;if(f<0)throw new Error(xl());const h=t.slice();h[0]=f;const p=h.reduce((w,N)=>w*N,1),d=Ht(n,p);if(a===0)return f>0&&d.fill(i),[d,h];if(f<=0)throw new Error(xl());let y=0,m=1,b=0,_=r[y];for(;;){let w=0;if(m<a){if(w=r[m],_===w){++m;continue}if(_>=w)throw new Error(f9())}if(_<0||_>=f)throw new Error(h9(_,f));_>b&&d.fill(i,b*c,_*c);for(let N=y;N<m;++N){const I=s[N];if(I<0||I>=l[0])throw new Error(p9(N,s[N],l[0]));for(let S=0;S<c;S++)d[_*c+S]+=e[I*c+S]}if(o)for(let N=0;N<c;N++)d[_*c+N]/=m-y;if(y=m,++m,b=_+1,_=w,m>a)break}return b<f&&d.fill(i,b*c,f*c),[d,h]}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const mb=pt(da,e=>Math.sqrt(e)),gb={kernelName:da,backendName:"cpu",kernelFunc:mb};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */const yb=Ft((e,t)=>{const n=e-t;return n*n}),bb=Ct(ma,yb),_b={kernelName:ma,backendName:"cpu",kernelFunc:bb};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function wb(e,t,n,s){const r=at(e,t.dtype);for(let o=0;o<r.size;o++){const i=r.indexToLoc(o),a=new Array(i.length);for(let l=0;l<a.length;l++)a[l]=i[l]*n[l]+s[l];r.set(t.get(...a),...i)}return r}/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */class Nb{constructor(t,n,s,r,o,i){this.separator=Pn(t),this.nGramWidths=n,this.leftPad=Pn(s),this.rightPad=Pn(r),this.padWidth=o,this.preserveShort=i}getPadWidth(t){return Math.min(this.padWidth<0?t-1:this.padWidth,t-1)}getNumNGrams(t,n){const s=this.getPadWidth(n);return Math.max(0,t+2*s-n+1)}createNGrams(t,n,s,r,o,i){for(let a=0;a<o;++a){const l=this.getPadWidth(i),c=Math.max(0,l-a),u=Math.max(0,l-(o-(a+1))),f=i-(c+u),h=n+(c>0?0:a-l);let p=0;p+=c*this.leftPad.length;for(let _=0;_<f;++_)p+=t[h+_].length;p+=u*this.rightPad.length;const d=c+u+f-1;p+=d*this.separator.length,s[r+a]=new Uint8Array(p);const y=s[r+a];let m=0;const b=_=>_.forEach(w=>y[m++]=w);for(let _=0;_<c;++_)b(this.leftPad),b(this.separator);for(let _=0;_<f-1;++_)b(t[h+_]),b(this.separator);if(f>0){b(t[h+f-1]);for(let _=0;_<u;++_)b(this.separator),b(this.rightPad)}else{for(let _=0;_<u-1;++_)b(this.rightPad),b(this.separator);b(this.rightPad)}}}compute(t,n){const s=t.length,r=n.length;if(r>0){let l=n[0];if(l!==0)throw new Error(`First split value must be 0, got ${l}`);for(let c=1;c<r;++c){let u=n[c]>=l;if(u=u&&n[c]<=s,!u)throw new Error(`Invalid split value ${n[c]}, must be in [${l}, ${s}]`);l=n[c]}if(l!==s)throw new Error(`Last split value must be data size. Expected ${s}, got ${l}`)}const o=r-1,i=Ht("int32",r);if(s===0||r===0){const l=new Array(s);for(let c=0;c<=o;++c)i[c]=0;return[l,i]}i[0]=0;for(let l=1;l<=o;++l){const c=n[l]-n[l-1];let u=0;this.nGramWidths.forEach(f=>{u+=this.getNumNGrams(c,f)}),this.preserveShort&&c>0&&u===0&&(u=1),i[l]=i[l-1]+u}const a=new Array(i[o]);for(let l=0;l<o;++l){const c=n[l];let u=i[l];if(this.nGramWidths.forEach(f=>{const h=n[l+1]-n[l],p=this.getNumNGrams(h,f);this.createNGrams(t,c,a,u,p,f),u+=p}),this.preserveShort&&u===i[l]){const f=n[l+1]-n[l];if(f===0)continue;const h=f+2*this.padWidth;this.createNGrams(t,c,a,u,1,h)}}return[a,i]}}function Ib(e,t,n,s,r,o,i,a){return new Nb(n,s,r,o,i,a).compute(e,t)}/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function kb(e,t,n,s){if(!e.length)return;if(t.length===0){for(let o=0;o<e.length;++o)s.push(e.subarray(o,o+1));return}if(t.length===1){const o=t[0];let i=e.indexOf(o);for(;i!==-1;){const a=e.subarray(0,i);(!n||a.length!==0)&&s.push(a),e=e.subarray(i+1),i=e.indexOf(o)}(!n||e.length!==0)&&s.push(e);return}let r=0;for(let o=0;o<e.length+1;o++)if(o===e.length||t.indexOf(e[o])!==-1){const i=e.subarray(r,o);(!n||i.length!==0)&&s.push(i),r=o+1}}function Sb(e,t,n){const s=e.length,r=[];let o=0,i=0;const a=new Array(s);for(let h=0;h<s;++h){const p=r.length;kb(e[h],t,n,r);const d=r.length-p;a[h]=d,o+=d,i=Math.max(i,d)}const l=Ht("int32",o*2),c=new Array(o),u=[s,i];let f=0;for(let h=0;h<s;++h)for(let p=0;p<a[h];++p)l[f*2]=h,l[f*2+1]=p,c[f]=r[f],++f;return[l,c,u]}/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function Tb(e,t){const n=Ht("int32",e.length);for(let s=0;s<e.length;++s)n[s]=fp(e[s]).modulo(t).getLowBitsUnsigned();return n}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */const Eb=Ft((e,t)=>e-t),vb=qa((e,t,n,s)=>({real:e-n,imag:t-s})),Ga=Ct(ga,Eb,vb),xb={kernelName:ga,backendName:"cpu",kernelFunc:Ga};/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function $b(e,t){const n=new Array(e.rank);for(let r=0;r<n.length;r++)n[r]=e.shape[r]*t[r];const s=at(n,e.dtype);for(let r=0;r<s.values.length;++r){const o=s.indexToLoc(r),i=new Array(e.rank);for(let l=0;l<i.length;l++)i[l]=o[l]%e.shape[l];const a=e.locToIndex(i);s.values[r]=e.values[a]}return s}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */const Ms=(e,t)=>{const n=t.value-e.value;return n===0?e.index-t.index:n};function zf(e,t,n=0,s=e.length-1){for(;s>n;){if(s-n>600){const a=s-n+1,l=t-n+1,c=Math.log(a),u=.5*Math.exp(2*c/3),f=.5*Math.sqrt(c*u*(a-u)/a)*Math.sign(l-a/2),h=Math.max(n,Math.floor(t-l*u/a+f)),p=Math.min(s,Math.floor(t+(a-l)*u/a+f));zf(e,t,h,p)}const r=e[t];let o=n,i=s;for(Rs(e,n,t),Ms(e[s],r)>0&&Rs(e,n,s);o<i;){for(Rs(e,o,i),o++,i--;Ms(e[o],r)<0;)o=o+1;for(;Ms(e[i],r)>0;)i=i-1}Ms(e[n],r)===0?Rs(e,n,i):(i=i+1,Rs(e,i,s)),i<=t&&(n=i+1),t<=i&&(s=i-1)}}function Ab(e,t,n,s,r){const o=t[t.length-1],[i,a]=[e.length/o,o],l=Xt(n,i*s),c=Xt("int32",i*s);for(let f=0;f<i;f++){const h=f*a,p=e.subarray(h,h+a);let d=new Array(p.length);p.forEach((_,w)=>d[w]={value:_,index:w}),s<d.length&&(zf(d,s),d=d.slice(0,s)),r&&d.sort(Ms);const y=f*s,m=l.subarray(y,y+s),b=c.subarray(y,y+s);for(let _=0;_<s;_++)m[_]=d[_].value,b[_]=d[_].index}const u=t.slice();return u[u.length-1]=s,[at(u,n,l),at(u,"int32",c)]}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function Db(e,t,n,s){const r=Bt(t,n)[0],o=[1,n[0],1];for(let d=0;d<r;d++)o[0]*=n[d];o[1]=n[r];for(let d=r+1;d<n.length;d++)o[2]*=n[d];const i={},a=new Int32Array(n[r]),l=new Ut(o,s,e),c=[],u=o[0]===1&&o[2]===1;for(let d=0;d<n[r];d++){let y;if(u)y=e[d].toString();else{const m=[];for(let b=0;b<o[0];b++)for(let _=0;_<o[2];_++)m.push(l.get(b,d,_));y=m.join(",")}if(i[y]!==void 0)a[d]=i[y];else{const m=Object.keys(i).length;i[y]=m,a[d]=m,c.push(d)}}const f=o.slice();f[1]=Object.keys(i).length;const h=new Ut(f,s);c.forEach((d,y)=>{for(let m=0;m<o[0];m++)for(let b=0;b<o[2];b++)h.set(l.get(m,d,b),m,y,b)});const p=n.slice();return p[r]=f[1],{outputValues:h.values,outputShape:p,indices:a}}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */$d("cpu",()=>new uo,1);/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Wf=pt(Di,e=>e>=0?e:Math.exp(e)-1),Rb={kernelName:Di,backendName:"cpu",kernelFunc:Wf};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function Hf(e){const{inputs:t,backend:n,attrs:s}=e,{x:r}=t,{alpha:o}=s;J([r],"leakyRelu");const i=q(r.shape),a=n.data.get(r.dataId).values,l=Xt("float32",i);for(let c=0;c<a.length;c++)l[c]=a[c]<0?o*a[c]:a[c];return n.makeTensorInfo(r.shape,"float32",l)}const Ob={kernelName:Qc,backendName:"cpu",kernelFunc:Hf};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Lb=Ft((e,t)=>e<0?t*e:e);function qf(e){const{inputs:t,backend:n}=e,{x:s,alpha:r}=t;J([s,r],"prelu");const o=n.data.get(s.dataId).values,i=n.data.get(r.dataId).values,[a,l]=Lb(s.shape,r.shape,o,i,"float32");return n.makeTensorInfo(l,"float32",a)}const Fb={kernelName:bu,backendName:"cpu",kernelFunc:qf};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Gf=pt(ra,e=>Math.max(0,e)),Pb={kernelName:ra,backendName:"cpu",kernelFunc:Gf};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Kf=pt(oa,e=>Math.min(Math.max(0,e),6)),Ub={kernelName:oa,backendName:"cpu",kernelFunc:Kf};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function Pr(e,t,n,s,r){if(n==="linear")return qe({inputs:{x:t},backend:e});if(n==="relu")return Gf({inputs:{x:t},backend:e});if(n==="elu")return Wf({inputs:{x:t},backend:e});if(n==="relu6")return Kf({inputs:{x:t},backend:e});if(n==="prelu")return qf({inputs:{x:t,alpha:s},backend:e});if(n==="leakyrelu")return Hf({inputs:{x:t},backend:e,attrs:{alpha:r}});if(n==="sigmoid")return Bf({inputs:{x:t},backend:e});throw new Error(`Activation ${n} has not been implemented for the CPU backend.`)}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function It(e){const{inputs:t,backend:n,attrs:s}=e,{x:r}=t,{shape:o}=s,i=q(r.shape),a=Dh(o,i),l=q(a);T(i===l,()=>`The new shape (${a}) has ${l} elements and the old shape (${r.shape}) has ${i} elements. The new shape and old shape must have the same number of elements.`),n.incRef(r.dataId);const c=n.data.get(r.dataId);if(c.complexTensorInfos!=null){const u=c.complexTensorInfos.real,f=c.complexTensorInfos.imag;u.shape=a,f.shape=a}return{dataId:r.dataId,shape:a,dtype:r.dtype}}const Mb={kernelName:Su,backendName:"cpu",kernelFunc:It};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function jf(e){const{inputs:t,backend:n,attrs:s}=e,{a:r,b:o}=t,{transposeA:i,transposeB:a}=s;J([r,o],"matMul");const l=r.shape.length,c=o.shape.length,u=i?r.shape[l-2]:r.shape[l-1],f=a?o.shape[c-1]:o.shape[c-2],h=i?r.shape[l-1]:r.shape[l-2],p=a?o.shape[c-2]:o.shape[c-1],d=r.shape.slice(0,-2),y=o.shape.slice(0,-2),m=q(d),b=q(y),w=Dt(r.shape.slice(0,-2),o.shape.slice(0,-2)).concat([h,p]);T(u===f,()=>`Error in matMul: inner shapes (${u}) and (${f}) of Tensors with shapes ${r.shape} and ${o.shape} and transposeA=${i} and transposeB=${a} must match.`);const N=i?[m,u,h]:[m,h,u],I=a?[b,p,f]:[b,f,p],S=It({inputs:{x:r},backend:n,attrs:{shape:N}}),E=It({inputs:{x:o},backend:n,attrs:{shape:I}}),D=i?S.shape[1]:S.shape[2],L=i?S.shape[2]:S.shape[1],U=a?E.shape[1]:E.shape[2],M=Math.max(m,b),B=n.data.get(S.dataId).values,$=n.data.get(E.dataId).values,x=nt(S.shape),A=nt(E.shape),[O,F,P]=i?[x[0],1,x[1]]:[x[0],x[1],1],[V,z,W]=a?[1,A[1],A[0]]:[A[1],1,A[0]],G=L*U,H=at([M,L,U],S.dtype),j=H.values,K=n.blockSize;for(let Y=0;Y<M;Y++)for(let Q=0;Q<L;Q+=K)for(let tt=0;tt<U;tt+=K)for(let et=0;et<D;et+=K){const st=Math.min(Q+K,L),it=Math.min(tt+K,U),ft=Math.min(et+K,D);for(let gt=Q;gt<st;gt++)for(let kt=tt;kt<it;kt++){let vt=0;for(let dt=et;dt<ft;dt++){const $t=Math.min(Y,m-1)*O,Rt=Math.min(Y,b-1)*W,Ye=B[$t+gt*F+dt*P],zt=$[dt*V+kt*z+Rt];vt+=Ye*zt}j[Y*G+(gt*U+kt)]+=vt}}return n.disposeIntermediateTensorInfo(S),n.disposeIntermediateTensorInfo(E),n.makeTensorInfo(w,H.dtype,H.values)}const Vb={kernelName:Nc,backendName:"cpu",kernelFunc:jf};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Bb(e){const{inputs:t,backend:n,attrs:s}=e,{a:r,b:o,bias:i,preluActivationWeights:a}=t,{transposeA:l,transposeB:c,activation:u,leakyreluAlpha:f}=s;let h,p,d;const y=[];h=jf({inputs:{a:r,b:o},attrs:{transposeA:l,transposeB:c},backend:n}),i&&(p=_s({inputs:{a:h,b:i},backend:n}),y.push(h),h=p),u&&(d=Pr(n,h,u,a,f),y.push(h),h=d);for(const b of y)n.disposeIntermediateTensorInfo(b);return h}const Cb={kernelName:Eo,backendName:"cpu",kernelFunc:Bb};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const zb=pt(bi,e=>Math.acos(e)),Wb={kernelName:bi,backendName:"cpu",kernelFunc:zb};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Hb=pt(_i,e=>Math.acosh(e)),qb={kernelName:_i,backendName:"cpu",kernelFunc:Hb};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function Gb(e){const{inputs:t,backend:n}=e,s=t;J(t,"addN");const r=s.map(a=>n.data.get(a.dataId).values),o=at(s[0].shape,s[0].dtype),i=o.values;for(let a=0;a<s.length;a++){const l=r[a];for(let c=0;c<i.length;c++)i[c]+=l[c]}return n.makeTensorInfo(o.shape,o.dtype,o.values)}const Kb={kernelName:dc,backendName:"cpu",kernelFunc:Gb};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function jb(e){const{inputs:t,backend:n,attrs:s}=e,{x:r}=t,{axis:o,keepDims:i}=s;J(r,"all");const a=Bt(o,r.shape);let l=a;const c=je(l,r.shape.length);let u=r;c!=null&&(u=re({inputs:{x:r},backend:n,attrs:{perm:c}}),l=Xe(l.length,r.shape.length)),Zn("all",l,u.shape.length);const[f,h]=cn(u.shape,l),p=q(h),d=Yt(q(f),u.dtype),y=n.data.get(u.dataId).values;for(let b=0;b<d.length;++b){const _=b*p;let w=y[_];for(let N=0;N<p;++N){const I=y[_+N];w=w&&I}d[b]=w}c!=null&&n.disposeIntermediateTensorInfo(u);const m=n.makeTensorInfo(f,u.dtype,d);if(i){const b=Ue(f,a),_=It({inputs:{x:m},backend:n,attrs:{shape:b}});return n.disposeIntermediateTensorInfo(m),_}return m}const Xb={kernelName:mc,backendName:"cpu",kernelFunc:jb};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function Yb(e){const{inputs:t,backend:n,attrs:s}=e,{x:r}=t,{axis:o,keepDims:i}=s;J(r,"any");const a=Bt(o,r.shape);let l=a;const c=je(l,r.shape.length);let u=r;c!=null&&(u=re({inputs:{x:r},backend:n,attrs:{perm:c}}),l=Xe(l.length,r.shape.length)),Zn("any",l,u.shape.length);const[f,h]=cn(u.shape,l),p=q(h),d=Yt(q(f),u.dtype),y=n.data.get(u.dataId).values;for(let b=0;b<d.length;++b){const _=b*p;let w=y[_];for(let N=0;N<p;++N){const I=y[_+N];w=w||I}d[b]=w}c!=null&&n.disposeIntermediateTensorInfo(u);const m=n.makeTensorInfo(f,u.dtype,d);if(i){const b=Ue(f,a),_=It({inputs:{x:m},backend:n,attrs:{shape:b}});return n.disposeIntermediateTensorInfo(m),_}return m}const Zb={kernelName:gc,backendName:"cpu",kernelFunc:Yb};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function Jb(e){const{inputs:t,backend:n,attrs:s}=e,{x:r}=t,{axis:o}=s;J(r,"argMax");let i=Bt(o,r.shape);const a=je(i,r.shape.length);let l=r;const c=[];a!=null&&(l=re({inputs:{x:r},backend:n,attrs:{perm:a}}),c.push(l),i=Xe(i.length,l.shape.length)),i=[i[0]],Zn("argMax",i,l.shape.length);const[u,f]=cn(l.shape,i),h=q(u),p=Yt(h,"int32"),d=q(f),y=n.data.get(l.dataId).values;for(let m=0;m<p.length;++m){const b=m*d;let _=y[b],w=0;for(let N=0;N<d;++N){const I=y[b+N];I>_&&(_=I,w=N)}p[m]=w}return c.forEach(m=>n.disposeIntermediateTensorInfo(m)),n.makeTensorInfo(u,"int32",p)}const Qb={kernelName:yc,backendName:"cpu",kernelFunc:Jb};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function t6(e){const{inputs:t,backend:n,attrs:s}=e,{x:r}=t,{axis:o}=s;J(r,"argMin");let i=Bt(o,r.shape);const a=je(i,r.shape.length);let l=r;const c=[];a!=null&&(l=re({inputs:{x:r},backend:n,attrs:{perm:a}}),c.push(l),i=Xe(i.length,l.shape.length)),i=[i[0]],Zn("argMin",i,l.shape.length);const[u,f]=cn(l.shape,i),h=q(u),p=Yt(h,"int32"),d=q(f),y=n.data.get(l.dataId).values;for(let m=0;m<p.length;++m){const b=m*d;let _=y[b],w=0;for(let N=0;N<d;++N){const I=y[b+N];I<_&&(_=I,w=N)}p[m]=w}return c.forEach(m=>n.disposeIntermediateTensorInfo(m)),n.makeTensorInfo(u,"int32",p)}const e6={kernelName:bc,backendName:"cpu",kernelFunc:t6};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const n6=pt(wi,e=>Math.asin(e)),s6={kernelName:wi,backendName:"cpu",kernelFunc:n6};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const r6=pt(Ni,e=>Math.asinh(e)),o6={kernelName:Ni,backendName:"cpu",kernelFunc:r6};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const i6=pt(Ii,e=>Math.atan(e)),a6={kernelName:Ii,backendName:"cpu",kernelFunc:i6};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const l6=Ft((e,t)=>Math.atan2(e,t)),c6=Ct(Si,l6),u6={kernelName:Si,backendName:"cpu",kernelFunc:c6};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const f6=pt(ki,e=>Math.atanh(e)),h6={kernelName:ki,backendName:"cpu",kernelFunc:f6};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function Ka(e,t,n,s,r,o){const i=r.strideHeight,a=r.strideWidth,l=r.dilationHeight,c=r.dilationWidth,u=r.effectiveFilterHeight,f=r.effectiveFilterWidth,h=r.padInfo.top,p=r.padInfo.left,d=o==="max"?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY,y=at(r.outShape,n),m=y.values,b=r.outShape[1]*r.outShape[2]*r.outShape[3],_=r.outShape[2]*r.outShape[3],w=r.outShape[3];for(let N=0;N<r.batchSize;++N){const I=N*b,S=N*s[0];for(let E=0;E<r.inChannels;++E)for(let D=0;D<r.outHeight;++D){const L=D*i-h,U=Math.max(0,L),M=Math.min(r.inHeight,u+L),B=I+D*_;for(let $=0;$<r.outWidth;++$){const x=$*a-p,A=Math.max(0,x),O=Math.min(r.inWidth,f+x);let F=d,P=0,V=0;for(let W=U;W<M;W+=l){const G=S+W*s[1];for(let H=A;H<O;H+=c){const j=G+H*s[2],K=e[j+E];o==="max"&&K>F?F=K:o==="avg"&&(P+=K,V++)}if(isNaN(F))break}const z=B+$*w+E;m[z]=o==="avg"?P/V:F}}}return y}function Xf(e,t,n,s,r=!1,o=!1){const i=at(s.outShape,"int32"),a=s.strideHeight,l=s.strideWidth,c=s.dilationHeight,u=s.dilationWidth,f=s.effectiveFilterHeight,h=s.effectiveFilterWidth,p=s.padInfo.top,d=s.padInfo.left,y=at(t,n,e);for(let m=0;m<s.batchSize;++m)for(let b=0;b<s.inChannels;++b)for(let _=0;_<s.outHeight;++_){const w=_*a-p;let N=w;for(;N<0;)N+=c;const I=Math.min(s.inHeight,f+w);for(let S=0;S<s.outWidth;++S){const E=S*l-d;let D=E;for(;D<0;)D+=u;const L=Math.min(s.inWidth,h+E);let U=Number.NEGATIVE_INFINITY,M=-1;for(let B=N;B<I;B+=c){const $=B-w;for(let x=D;x<L;x+=u){const A=x-E,O=y.get(m,B,x,b);O>U&&(U=O,r?M=o?((m*s.inHeight+B)*s.inWidth+x)*s.inChannels+b:(B*s.inWidth+x)*s.inChannels+b:M=$*h+A)}}i.set(M,m,_,S,b)}}return i}function Yf(e,t,n,s,r,o){const i=r.strideDepth,a=r.strideHeight,l=r.strideWidth,c=r.dilationDepth,u=r.dilationHeight,f=r.dilationWidth,h=r.effectiveFilterDepth,p=r.effectiveFilterHeight,d=r.effectiveFilterWidth,y=r.padInfo.front,m=r.padInfo.top,b=r.padInfo.left,_=o==="max"?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY,w=at(r.outShape,n),N=w.values,I=r.outShape[1]*r.outShape[2]*r.outShape[3]*r.outShape[4],S=r.outShape[2]*r.outShape[3]*r.outShape[4],E=r.outShape[3]*r.outShape[4],D=r.outShape[4];for(let L=0;L<r.batchSize;++L){const U=L*I,M=L*s[0];for(let B=0;B<r.inChannels;++B)for(let $=0;$<r.outDepth;++$){const x=$*i-y;let A=x;for(;A<0;)A+=c;const O=Math.min(r.inDepth,h+x),F=U+$*S;for(let P=0;P<r.outHeight;++P){const V=P*a-m;let z=V;for(;z<0;)z+=u;const W=Math.min(r.inHeight,p+V),G=F+P*E;for(let H=0;H<r.outWidth;++H){const j=H*l-b;let K=j;for(;K<0;)K+=f;const Y=Math.min(r.inWidth,d+j),Q=G+H*D;let tt=_,et=0,st=0;for(let ft=A;ft<O;ft+=c){const gt=M+ft*s[1];for(let kt=z;kt<W;kt+=u){const vt=gt+kt*s[2];for(let dt=K;dt<Y;dt+=f){const $t=vt+dt*s[3],Rt=e[$t+B];if(o==="max"&&Rt>tt?tt=Rt:o==="avg"&&(et+=Rt,st++),isNaN(tt))break}if(isNaN(tt))break}if(isNaN(tt))break}const it=Q+B;N[it]=o==="avg"?et/st:tt}}}}return w}function p6(e,t){const n=at(t.outShape,"int32"),s=t.strideDepth,r=t.strideHeight,o=t.strideWidth,i=t.dilationDepth,a=t.dilationHeight,l=t.dilationWidth,c=t.effectiveFilterDepth,u=t.effectiveFilterHeight,f=t.effectiveFilterWidth,h=t.padInfo.front,p=t.padInfo.top,d=t.padInfo.left;for(let y=0;y<t.batchSize;++y)for(let m=0;m<t.inChannels;++m)for(let b=0;b<t.outDepth;++b){const _=b*s-h;let w=_;for(;w<0;)w+=i;const N=Math.min(t.inDepth,c+_);for(let I=0;I<t.outHeight;++I){const S=I*r-p;let E=S;for(;E<0;)E+=a;const D=Math.min(t.inHeight,u+S);for(let L=0;L<t.outWidth;++L){const U=L*o-d;let M=U;for(;M<0;)M+=l;const B=Math.min(t.inWidth,f+U);let $=Number.NEGATIVE_INFINITY,x=-1;for(let A=w;A<N;A+=i){const O=A-_;for(let F=E;F<D;F+=a){const P=F-S;for(let V=M;V<B;V+=l){const z=V-U,W=e.get(y,A,F,V,m);W>=$&&($=W,x=O*u*f+P*u+z)}}}n.set(x,y,b,I,L,m)}}}return n}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function d6(e){const{inputs:t,backend:n,attrs:s}=e,{x:r}=t;J(r,"avgPool");const{filterSize:o,strides:i,pad:a,dimRoundingMode:l}=s,c=1;T(Fe(i,c),()=>`Error in avgPool: Either strides or dilations must be 1. Got strides ${i} and dilations '${c}'`);const u=vs(r.shape,o,i,c,a,l);let f;if(u.filterWidth===1&&u.filterHeight===1&&Oe(u.inShape,u.outShape))f=qe({inputs:{x:r},backend:n});else{const h=n.data.get(r.dataId).values,p=nt(r.shape),d=Ka(h,r.shape,r.dtype,p,u,"avg");f=n.makeTensorInfo(u.outShape,r.dtype,d.values)}return f}const m6={kernelName:_c,backendName:"cpu",kernelFunc:d6};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function g6(e){const{inputs:t,backend:n,attrs:s}=e,{x:r}=t,{filterSize:o,strides:i,pad:a,dimRoundingMode:l,dataFormat:c}=s;J(r,"avgPool3d");const u=Qr(r.shape,o,i,1,a,l,c),f=n.data.get(r.dataId).values,h=Yf(f,r.shape,r.dtype,nt(r.shape),u,"avg");return n.makeTensorInfo(h.shape,"float32",h.values)}const y6={kernelName:wc,backendName:"cpu",kernelFunc:g6};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function b6(e){const{inputs:t,backend:n,attrs:s}=e,{dy:r,input:o}=t,{filterSize:i,strides:a,pad:l,dimRoundingMode:c}=s;J([r,o],"avgPool3DGrad");const u=Qr(o.shape,i,a,1,l,c),f=u.strideDepth,h=u.strideHeight,p=u.strideWidth,d=u.filterDepth,y=u.filterHeight,m=u.filterWidth,b=u.dilationDepth,_=u.dilationHeight,w=u.dilationWidth,N=u.effectiveFilterDepth,I=u.effectiveFilterHeight,S=u.effectiveFilterWidth,E=N-1-u.padInfo.front,D=S-1-u.padInfo.left,L=I-1-u.padInfo.top,U=at(o.shape,"float32"),M=1/(d*y*m),B=n.bufferSync(r);for(let $=0;$<u.batchSize;++$)for(let x=0;x<u.inChannels;++x)for(let A=0;A<u.inDepth;++A)for(let O=0;O<u.inHeight;++O)for(let F=0;F<u.inWidth;++F){const P=A-E,V=O-L,z=F-D;let W=0;for(let G=0;G<N;G+=b){const H=(P+G)/f;if(!(H<0||H>=u.outDepth||Math.floor(H)!==H))for(let j=0;j<I;j+=_){const K=(V+j)/h;if(!(K<0||K>=u.outHeight||Math.floor(K)!==K))for(let Y=0;Y<S;Y+=w){const Q=(z+Y)/p;if(Q<0||Q>=u.outWidth||Math.floor(Q)!==Q)continue;const tt=B.get($,H,K,Q,x);W+=tt}}}U.set(W*M,$,A,O,F,x)}return n.makeTensorInfo(U.shape,U.dtype,U.values)}const _6={kernelName:Gh,backendName:"cpu",kernelFunc:b6};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function w6(e){const{inputs:t,backend:n,attrs:s}=e,{dy:r,input:o}=t,i=o;J([r,o],"avgPoolGrad");const{filterSize:a,strides:l,pad:c}=s,u=vs(i.shape,a,l,1,c),f=u.strideHeight,h=u.strideWidth,p=u.filterHeight,d=u.filterWidth,y=u.dilationHeight,m=u.dilationWidth,b=u.effectiveFilterHeight,_=u.effectiveFilterWidth,w=_-1-u.padInfo.left,N=b-1-u.padInfo.top,I=at(i.shape,"float32"),S=1/(p*d),E=n.data.get(r.dataId).values,D=at(r.shape,"float32",E);for(let L=0;L<u.batchSize;++L)for(let U=0;U<u.inChannels;++U)for(let M=0;M<u.inHeight;++M)for(let B=0;B<u.inWidth;++B){const $=M-N,x=B-w;let A=0;for(let O=0;O<b;O+=y){const F=($+O)/f;if(!(F<0||F>=u.outHeight||Math.floor(F)!==F))for(let P=0;P<_;P+=m){const V=(x+P)/h;if(V<0||V>=u.outWidth||Math.floor(V)!==V)continue;const z=D.get(L,F,V,U);A+=z}}I.set(A*S,L,M,B,U)}return n.makeTensorInfo(I.shape,I.dtype,I.values)}const N6={kernelName:qh,backendName:"cpu",kernelFunc:w6};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function I6(e){const{inputs:t,backend:n,attrs:s}=e,{x:r,scale:o,offset:i,mean:a,variance:l}=t;T(a.shape.length===l.shape.length,()=>"Batch normalization gradient requires mean and variance to have equal ranks."),T(i==null||a.shape.length===i.shape.length,()=>"Batch normalization gradient requires mean and offset to have equal ranks."),T(o==null||a.shape.length===o.shape.length,()=>"Batch normalization gradient requires mean and scale to have equal ranks."),J([r,a,l,o,i],"batchNorm");let{varianceEpsilon:c}=s;c==null&&(c=.001);const u=n.data.get(r.dataId).values,f=n.data.get(a.dataId).values,h=n.data.get(l.dataId).values,p=o?n.data.get(o.dataId).values:new Float32Array([1]),d=i?n.data.get(i.dataId).values:new Float32Array([0]),y=new Float32Array(u.length),m=d.length,b=p.length,_=h.length,w=f.length;let N=0,I=0,S=0,E=0;for(let D=0;D<u.length;++D)y[D]=d[N++]+(u[D]-f[I++])*p[S++]/Math.sqrt(h[E++]+c),N>=m&&(N=0),I>=w&&(I=0),S>=b&&(S=0),E>=_&&(E=0);return n.makeTensorInfo(r.shape,r.dtype,y)}const k6={kernelName:jc,backendName:"cpu",kernelFunc:I6};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function S6(e){const{inputs:t,backend:n,attrs:s}=e,{x:r}=t,{blockShape:o,crops:i}=s;J([r],"batchToSpaceND");const a=o.reduce((b,_)=>b*_),l=vf(r.shape,o,a),c=xf(l.length,o.length),u=$f(r.shape,o,a),f=Oy(i,o.length),h=Ly(u,i,o.length),p=It({inputs:{x:r},backend:n,attrs:{shape:l}}),d=re({inputs:{x:p},backend:n,attrs:{perm:c}}),y=It({inputs:{x:d},backend:n,attrs:{shape:u}}),m=Kn({inputs:{x:y},backend:n,attrs:{begin:f,size:h}});return n.disposeIntermediateTensorInfo(p),n.disposeIntermediateTensorInfo(d),n.disposeIntermediateTensorInfo(y),m}const T6={kernelName:Ic,backendName:"cpu",kernelFunc:S6};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function E6(e){const{inputs:t,backend:n,attrs:s}=e,{x:r,weights:o}=t,{size:i}=s,a=n.data.get(r.dataId).values,l=n.data.get(o.dataId).values,c=Ff(a,l,o.dtype,o.shape,i);return n.makeTensorInfo([i],o.dtype,c)}const v6={kernelName:kc,backendName:"cpu",kernelFunc:E6};/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function x6(e){const{inputs:t,backend:n}=e,{s0:s,s1:r}=t,o=n.data.get(s.dataId).values,i=n.data.get(r.dataId).values,a=Dt(Array.from(o),Array.from(i));return n.makeTensorInfo([a.length],"int32",Int32Array.from(a))}const $6={kernelName:Sc,backendName:"cpu",kernelFunc:x6};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const A6=pt(vi,(e,t)=>{const n=t;return e>n.clipValueMax?n.clipValueMax:e<n.clipValueMin?n.clipValueMin:e}),D6={kernelName:vi,backendName:"cpu",kernelFunc:A6};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const R6=e=>{const{x:t}=e.inputs,n=e.backend,s=new Float32Array(q(t.shape)),r=n.data.get(t.dataId),o=r.complexTensorInfos.real,i=r.complexTensorInfos.imag,a=n.data.get(o.dataId).values,l=n.data.get(i.dataId).values;for(let c=0;c<a.length;c++){const u=a[c],f=l[c];s[c]=Math.hypot(u,f)}return n.makeOutput(s,t.shape,"float32")},O6={kernelName:Ec,backendName:"cpu",kernelFunc:R6};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function ws(e){const{inputs:t,backend:n}=e,{input:s}=t,r=n.data.get(s.dataId).complexTensorInfos.imag,o=n.data.get(r.dataId).values;return n.makeTensorInfo(r.shape,r.dtype,o)}const L6={kernelName:Jc,backendName:"cpu",kernelFunc:ws};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function Ns(e){const{inputs:t,backend:n,attrs:s}=e,{axis:r}=s,o=Bt(r,t[0].shape)[0],i=t.map(y=>y.shape);vy(i,o);let a=wo(t.map(y=>y.shape),o);if(q(a)===0)return n.makeTensorInfo(a,t[0].dtype,[]);const l=t.filter(y=>q(y.shape)>0);if(l.length===1)return qe({inputs:{x:l[0]},backend:n});if(l[0].dtype==="complex64"){const y=l.map(N=>Gn({inputs:{input:N},backend:n})),m=l.map(N=>ws({inputs:{input:N},backend:n})),b=Ns({inputs:y,backend:n,attrs:{axis:o}}),_=Ns({inputs:m,backend:n,attrs:{axis:o}}),w=le({inputs:{real:b,imag:_},backend:n});return y.forEach(N=>n.disposeIntermediateTensorInfo(N)),m.forEach(N=>n.disposeIntermediateTensorInfo(N)),n.disposeIntermediateTensorInfo(b),n.disposeIntermediateTensorInfo(_),w}const c=l.map(y=>{const b=[-1,q(y.shape.slice(o))];return It({inputs:{x:y},backend:n,attrs:{shape:b}})}),u=c.map(y=>({vals:n.data.get(y.dataId).values,shape:y.shape}));a=wo(c.map(y=>y.shape),1);const f=c[0].shape[0]===1,h=r8(u,a,t[0].dtype,f),p=wo(l.map(y=>y.shape),o),d=n.makeTensorInfo(p,t[0].dtype,h);return c.forEach(y=>n.disposeIntermediateTensorInfo(y)),d}const F6={kernelName:vc,backendName:"cpu",kernelFunc:Ns};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function Zf(e){const{inputs:t,backend:n,attrs:s}=e,{x:r,filter:o}=t,{strides:i,pad:a,dataFormat:l,dilations:c,dimRoundingMode:u}=s;J([r,o],"conv2d");const f=eo(l),h=Ke(r.shape,o.shape,i,c,a,u,!1,f),p=h.filterHeight,d=h.filterWidth,y=h.dilationHeight,m=h.dilationWidth,b=h.padInfo.left,_=h.padInfo.top,w=h.dataFormat==="channelsLast",N=new Ut(h.outShape,r.dtype),I=nt(r.shape),S=nt(o.shape),E=I[0],D=w?I[1]:I[2],L=w?I[2]:1,U=w?1:I[1],M=N.strides[0],B=w?N.strides[1]:N.strides[2],$=w?N.strides[2]:1,x=w?1:N.strides[1],A=n.data.get(r.dataId).values,O=n.data.get(o.dataId).values,F=N.values;for(let P=0;P<h.batchSize;++P){const V=P*E,z=P*M;for(let W=0;W<h.outHeight;++W){const G=z+W*B,H=W*h.strideHeight-_;for(let j=0;j<p;++j){const K=H+j*y;if(K<0||K>=h.inHeight)continue;const Y=j*S[0],Q=V+K*D;for(let tt=0;tt<h.outWidth;++tt){const et=G+tt*$,st=tt*h.strideWidth-b;for(let it=0;it<d;++it){const ft=st+it*m;if(ft<0||ft>=h.inWidth)continue;const gt=Y+it*S[1],kt=Q+ft*L;let vt=gt;for(let dt=0;dt<h.inChannels;++dt){const $t=A[kt+dt*U];for(let Rt=0;Rt<h.outChannels;++Rt)F[et+Rt*x]+=$t*O[vt+Rt];vt+=h.outChannels}}}}}}return n.makeTensorInfo(N.shape,N.dtype,F)}const P6={kernelName:xc,backendName:"cpu",kernelFunc:Zf};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function U6(e){const{inputs:t,backend:n,attrs:s}=e,{x:r,dy:o}=t,{strides:i,pad:a,dataFormat:l,dimRoundingMode:c,filterShape:u}=s;J([r,o],"conv2dBackpropFilter");const f=eo(l),h=Ke(r.shape,u,i,1,a,c,!1,f),{strideHeight:p,strideWidth:d,filterHeight:y,filterWidth:m}=h,b=h.dataFormat==="channelsLast",_=new Ut(h.filterShape,"float32"),w=h.padInfo.left,N=h.padInfo.top,I=n.data.get(r.dataId).values,S=n.data.get(o.dataId).values,E=new Ut(r.shape,r.dtype,I),D=new Ut(o.shape,o.dtype,S);for(let L=0;L<y;++L){const U=Math.max(0,Math.ceil((N-L)/p)),M=Math.min(h.outHeight,(h.inHeight+N-L)/p);for(let B=0;B<m;++B){const $=Math.max(0,Math.ceil((w-B)/d)),x=Math.min(h.outWidth,(h.inWidth+w-B)/d);for(let A=0;A<h.inChannels;++A)for(let O=0;O<h.outChannels;++O){let F=0;for(let P=0;P<h.batchSize;++P)for(let V=U;V<M;++V){const z=L+V*p-N;for(let W=$;W<x;++W){const G=B+W*d-w;b?F+=E.get(P,z,G,A)*D.get(P,V,W,O):F+=E.get(P,A,z,G)*D.get(P,O,V,W)}}_.set(F,L,B,A,O)}}}return n.makeTensorInfo(_.shape,_.dtype,_.values)}const M6={kernelName:$c,backendName:"cpu",kernelFunc:U6};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function V6(e){const{inputs:t,backend:n,attrs:s}=e,{dy:r,filter:o}=t,{inputShape:i,strides:a,pad:l,dataFormat:c,dimRoundingMode:u}=s;J([r,o],"conv2dBackpropInput");const f=nt(o.shape),h=nt(r.shape);let p=eo(c);const d=Ke(i,o.shape,a,1,l,u,!1,p),y=new Ut(d.inShape,"float32"),m=y.values,b=n.data.get(r.dataId).values,_=n.data.get(o.dataId).values,[w,N,I]=f,{batchSize:S,filterHeight:E,filterWidth:D,inChannels:L,inHeight:U,inWidth:M,outChannels:B,outHeight:$,outWidth:x,strideHeight:A,strideWidth:O}=d;p=d.dataFormat;const F=E-1-d.padInfo.top,P=D-1-d.padInfo.left,V=p==="channelsLast",z=y.strides[0],W=V?y.strides[1]:y.strides[2],G=V?y.strides[2]:1,H=V?1:y.strides[1],j=h[0],K=V?h[1]:h[2],Y=V?h[2]:1,Q=V?1:h[1];for(let tt=0;tt<S;++tt)for(let et=0;et<L;++et)for(let st=0;st<U;++st){const it=st-F,ft=Math.max(0,Math.ceil(it/A)),gt=Math.min($,(E+it)/A);for(let kt=0;kt<M;++kt){const vt=kt-P,dt=Math.max(0,Math.ceil(vt/O)),$t=Math.min(x,(D+vt)/O);let Rt=0;for(let zt=ft;zt<gt;++zt){const fn=zt*A-it;for(let he=dt;he<$t;++he){const Tn=he*O-vt,ve=j*tt+K*zt+Y*he,Ze=w*(E-1-fn)+N*(D-1-Tn)+I*et;for(let hn=0;hn<B;++hn){const pn=b[ve+Q*hn],dn=_[Ze+hn];Rt+=pn*dn}}}const Ye=z*tt+W*st+G*kt+H*et;m[Ye]=Rt}}return n.makeTensorInfo(y.shape,y.dtype,y.values)}const B6={kernelName:Ac,backendName:"cpu",kernelFunc:V6};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function C6(e){const{inputs:t,backend:n,attrs:s}=e,{x:r,filter:o}=t,{strides:i,pad:a,dilations:l}=s;J([r,o],"conv3d");const c=to(r.shape,o.shape,i,l,a),{filterDepth:u,filterHeight:f,filterWidth:h,dilationDepth:p,dilationHeight:d,dilationWidth:y,padInfo:m}=c,b=m.front,_=m.left,w=m.top,N=new Ut(c.outShape,r.dtype),I=n.data.get(r.dataId).values,S=n.data.get(o.dataId).values,E=N.values,D=nt(r.shape),L=nt(o.shape);for(let U=0;U<c.batchSize;++U){const M=U*D[0],B=U*N.strides[0];for(let $=0;$<c.outDepth;++$){const x=B+$*N.strides[1],A=$*c.strideDepth-b;for(let O=0;O<u;++O){const F=A+O*p;if(F<0||F>=c.inDepth)continue;const P=O*L[0],V=M+F*D[1];for(let z=0;z<c.outHeight;++z){const W=x+z*N.strides[2],G=z*c.strideHeight-w;for(let H=0;H<f;++H){const j=G+H*d;if(j<0||j>=c.inHeight)continue;const K=P+H*L[1],Y=V+j*D[2];for(let Q=0;Q<c.outWidth;++Q){const tt=W+Q*c.outChannels,et=Q*c.strideWidth-_;for(let st=0;st<h;++st){const it=et+st*y;if(it<0||it>=c.inWidth)continue;const ft=K+st*L[2],gt=Y+it*c.inChannels;let kt=ft;for(let vt=0;vt<c.inChannels;++vt){const dt=I[gt+vt];for(let $t=0;$t<c.outChannels;++$t)E[tt+$t]+=dt*S[kt+$t];kt+=c.outChannels}}}}}}}}return n.makeTensorInfo(N.shape,N.dtype,N.values)}const z6={kernelName:Dc,backendName:"cpu",kernelFunc:C6};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function W6(e){const{inputs:t,backend:n,attrs:s}=e,{x:r,dy:o}=t,{strides:i,pad:a,filterShape:l}=s;J([r,o],"conv3dBackpropFilterV2");const c=nt(r.shape),u=nt(o.shape),f=to(r.shape,l,i,1,a),h=f.strideDepth,p=f.strideHeight,d=f.strideWidth,y=f.filterDepth,m=f.filterHeight,b=f.filterWidth,_=new Ut(f.filterShape,"float32"),w=_.values,[N,I,S,E]=_.strides,D=n.data.get(o.dataId).values,[L,U,M,B]=u,$=n.data.get(r.dataId).values,[x,A,O,F]=c,P=f.padInfo.front,V=f.padInfo.left,z=f.padInfo.top;for(let W=0;W<y;++W){const G=Math.max(0,Math.ceil((P-W)/h)),H=Math.min(f.outDepth,(f.inDepth+P-W)/h),j=W*N;for(let K=0;K<m;++K){const Y=Math.max(0,Math.ceil((z-K)/p)),Q=Math.min(f.outHeight,(f.inHeight+z-K)/p),tt=K*I+j;for(let et=0;et<b;++et){const st=Math.max(0,Math.ceil((V-et)/d)),it=Math.min(f.outWidth,(f.inWidth+V-et)/d),ft=et*S+tt;for(let gt=0;gt<f.inChannels;++gt){const kt=gt*E+ft;for(let vt=0;vt<f.outChannels;++vt){let dt=0;for(let $t=0;$t<f.batchSize;++$t){const Rt=$t*x,Ye=$t*L;for(let zt=G;zt<H;++zt){const he=(W+zt*h-P)*A+Rt,Tn=zt*U+Ye;for(let ve=Y;ve<Q;++ve){const hn=(K+ve*p-z)*O+he,pn=ve*M+Tn;for(let dn=st;dn<it;++dn){const po=(et+dn*d-V)*F+hn,mo=dn*B+pn;dt+=$[po+gt]*D[mo+vt]}}}}w[kt+vt]=dt}}}}}return n.makeTensorInfo(_.shape,_.dtype,_.values)}const H6={kernelName:Kh,backendName:"cpu",kernelFunc:W6};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function q6(e){const{inputs:t,backend:n,attrs:s}=e,{dy:r,filter:o}=t,{pad:i,strides:a,inputShape:l}=s;J([r],"conv3dBackpropInputV2");const c=nt(r.shape),u=nt(o.shape),f=to(l,o.shape,a,1,i),h=new Ut(f.inShape,"float32"),p=h.values,[d,y,m,b]=h.strides,_=n.data.get(r.dataId).values,[w,N,I,S]=c,E=n.data.get(o.dataId).values,[D,L,U,M]=u,{batchSize:B,filterDepth:$,filterHeight:x,filterWidth:A,inChannels:O,inDepth:F,inHeight:P,inWidth:V,outChannels:z,outDepth:W,outHeight:G,outWidth:H,strideDepth:j,strideHeight:K,strideWidth:Y}=f,Q=$-1-f.padInfo.front,tt=x-1-f.padInfo.top,et=A-1-f.padInfo.left;for(let st=0;st<B;++st)for(let it=0;it<O;++it)for(let ft=0;ft<F;++ft){const gt=ft-Q,kt=Math.max(0,Math.ceil(gt/j)),vt=Math.min(W,($+gt)/j);for(let dt=0;dt<P;++dt){const $t=dt-tt,Rt=Math.max(0,Math.ceil($t/K)),Ye=Math.min(G,(x+$t)/K);for(let zt=0;zt<V;++zt){const fn=zt-et,he=Math.max(0,Math.ceil(fn/Y)),Tn=Math.min(H,(A+fn)/Y);let ve=0;for(let Ze=kt;Ze<vt;++Ze){const hn=Ze*j-gt;for(let pn=Rt;pn<Ye;++pn){const dn=pn*K-$t;for(let Ds=he;Ds<Tn;++Ds){const po=Ds*Y-fn,mo=w*st+N*Ze+I*pn+S*Ds,Sh=D*($-1-hn)+L*(x-1-dn)+U*(A-1-po)+M*it;for(let ir=0;ir<z;++ir){const Th=_[mo+ir],Eh=E[Sh+ir];ve+=Th*Eh}}}}p[d*st+y*ft+m*dt+b*zt+it]=ve}}}return n.makeTensorInfo(h.shape,h.dtype,h.values)}const G6={kernelName:Rc,backendName:"cpu",kernelFunc:q6};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */const K6=pt(xi,e=>Math.cos(e)),j6={kernelName:xi,backendName:"cpu",kernelFunc:K6};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const X6=pt($i,e=>Math.cosh(e)),Y6={kernelName:$i,backendName:"cpu",kernelFunc:X6};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function Z6(e){const{inputs:t,backend:n,attrs:s}=e,{image:r,boxes:o,boxInd:i}=t,{cropSize:a,method:l,extrapolationValue:c}=s,[u,f,h,p]=r.shape,d=o.shape[0],[y,m]=a,b=at([d,y,m,p],"float32"),_=n.data.get(o.dataId).values,w=n.data.get(i.dataId).values,N=n.data.get(r.dataId).values,I=nt(r.shape),S=nt(b.shape);for(let E=0;E<d;E++){const D=E*4,L=_[D],U=_[D+1],M=_[D+2],B=_[D+3],$=w[E];if($>=u)continue;const x=y>1?(M-L)*(f-1)/(y-1):0,A=m>1?(B-U)*(h-1)/(m-1):0;for(let O=0;O<y;O++){const F=y>1?L*(f-1)+O*x:.5*(L+M)*(f-1);if(F<0||F>f-1){for(let P=0;P<m;P++)for(let V=0;V<p;V++){const z=V+P*S[2]+O*S[1]+E*S[0];b.values[z]=c}continue}if(l==="bilinear"){const P=Math.floor(F),V=Math.ceil(F),z=F-P;for(let W=0;W<m;W++){const G=m>1?U*(h-1)+W*A:.5*(U+B)*(h-1);if(G<0||G>h-1){for(let Y=0;Y<p;Y++){const Q=Y+W*S[2]+O*S[1]+E*S[0];b.values[Q]=c}continue}const H=Math.floor(G),j=Math.ceil(G),K=G-H;for(let Y=0;Y<p;Y++){let Q=Y+H*I[2]+P*I[1]+$*I[0];const tt=N[Q];Q=Y+j*I[2]+P*I[1]+$*I[0];const et=N[Q];Q=Y+H*I[2]+V*I[1]+$*I[0];const st=N[Q];Q=Y+j*I[2]+V*I[1]+$*I[0];const it=N[Q],ft=tt+(et-tt)*K,gt=st+(it-st)*K;Q=Y+W*S[2]+O*S[1]+E*S[0],b.values[Q]=ft+(gt-ft)*z}}}else for(let P=0;P<m;++P){const V=m>1?U*(h-1)+P*A:.5*(U+B)*(h-1);if(V<0||V>h-1){for(let G=0;G<p;G++){const H=G+P*S[2]+O*S[1]+E*S[0];b.values[H]=c}continue}const z=Math.round(V),W=Math.round(F);for(let G=0;G<p;G++){const H=G+z*I[2]+W*I[1]+$*I[0],j=G+P*S[2]+O*S[1]+E*S[0];b.values[j]=N[H]}}}}return n.makeTensorInfo(b.shape,b.dtype,b.values)}const J6={kernelName:Fc,backendName:"cpu",kernelFunc:Z6};/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function Q6(e){const{inputs:t,backend:n,attrs:s}=e,{x:r}=t,{axis:o,exclusive:i,reverse:a}=s;J(r,"cumprod");const l=je([o],r.shape.length);let c=r;l!=null&&(c=re({inputs:{x:r},backend:n,attrs:{perm:l}}));const u=Xe(1,r.shape.length)[0];if(u!==c.shape.length-1)throw new Error(`backend.cumprod in CPU expects an inner-most axis=${c.shape.length-1} but got axis=${u}`);const f=Es(c.dtype,"int32"),h=gi(q(c.shape),f),p=n.data.get(c.dataId).values,d=c.shape[c.shape.length-1],y=a?(b,_)=>b+d-_-1:(b,_)=>b+_;for(let b=0;b<p.length;b+=d)for(let _=0;_<d;_++){const w=y(b,_);if(_===0)h[w]=i?1:p[w];else{const N=y(b,_-1);h[w]=i?p[N]*h[N]:p[w]*h[N]}}const m=n.makeTensorInfo(c.shape,f,h);if(l!=null){const b=C1(l),_=re({inputs:{x:m},backend:n,attrs:{perm:b}});return n.disposeIntermediateTensorInfo(m),n.disposeIntermediateTensorInfo(c),_}return m}const t_={kernelName:Oc,backendName:"cpu",kernelFunc:Q6};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function e_(e){const{inputs:t,backend:n,attrs:s}=e,{x:r}=t,{axis:o,exclusive:i,reverse:a}=s;J(r,"cumsum");const l=je([o],r.shape.length);let c=r;l!=null&&(c=re({inputs:{x:r},backend:n,attrs:{perm:l}}));const u=Xe(1,r.shape.length)[0];if(u!==c.shape.length-1)throw new Error(`backend.cumsum in CPU expects an inner-most axis=${c.shape.length-1} but got axis=${u}`);const f=Es(c.dtype,"int32"),h=Yt(q(c.shape),f),p=n.data.get(c.dataId).values,d=c.shape[c.shape.length-1],y=a?(b,_)=>b+d-_-1:(b,_)=>b+_;for(let b=0;b<p.length;b+=d)for(let _=0;_<d;_++){const w=y(b,_);if(_===0)h[w]=i?0:p[w];else{const N=y(b,_-1);h[w]=i?p[N]+h[N]:p[w]+h[N]}}const m=n.makeTensorInfo(c.shape,f,h);if(l!=null){const b=C1(l),_=re({inputs:{x:m},backend:n,attrs:{perm:b}});return n.disposeIntermediateTensorInfo(m),n.disposeIntermediateTensorInfo(c),_}return m}const n_={kernelName:Lc,backendName:"cpu",kernelFunc:e_};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function s_(e){const{inputs:t,backend:n,attrs:s}=e,{x:r,weights:o}=t,{size:i,binaryOutput:a}=s;if(r.shape.length===1){const l=n.data.get(r.dataId).values,c=n.data.get(o.dataId).values,u=Ff(l,c,o.dtype,o.shape,i);return n.makeTensorInfo([i],o.dtype,u)}else if(r.shape.length===2){const l=n.bufferSync(r),c=n.bufferSync(o),u=t8(l,c,i,a);return n.makeTensorInfo(u.shape,o.dtype,u.values)}throw new Error(`Error in denseBincount: input must be at most rank 2, but got rank${r.shape.length}.`)}const r_={kernelName:Pc,backendName:"cpu",kernelFunc:s_};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function o_(e){const{inputs:t,backend:n,attrs:s}=e,{x:r}=t,{blockSize:o,dataFormat:i}=s;T(i==="NHWC",()=>`Only NHWC dataFormat supported on CPU for depthToSpace. Got ${i}`);const a=r.shape[0],l=r.shape[1],c=r.shape[2],u=r.shape[3],f=l*o,h=c*o,p=u/(o*o),d=n.data.get(r.dataId).values,y=new Float32Array(a*f*h*p);let m=0;for(let b=0;b<a;++b)for(let _=0;_<f;++_){const w=Math.floor(_/o),N=_%o;for(let I=0;I<h;++I){const S=Math.floor(I/o),E=I%o,D=(N*o+E)*p;for(let L=0;L<p;++L){const M=L+D+u*(S+c*(w+l*b));y[m++]=d[M]}}}return n.makeTensorInfo([a,f,h,p],r.dtype,y)}const i_={kernelName:Uc,backendName:"cpu",kernelFunc:o_};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function Jf(e){const{inputs:t,backend:n,attrs:s}=e,{x:r,filter:o}=t,{strides:i,pad:a,dilations:l,dimRoundingMode:c}=s;J([r,o],"depthwiseConv2DNative");const u=nt(r.shape),f=nt(o.shape);let h=l;h==null&&(h=[1,1]),T(Fe(i,h),()=>`Error in depthwiseConv2d: Either strides or dilations must be 1. Got strides ${i} and dilations '${h}'`);const p=Ke(r.shape,o.shape,i,h,a,c,!0),{filterHeight:d,filterWidth:y,dilationHeight:m,dilationWidth:b,padInfo:_}=p,w=_.left,N=_.top,I=p.outChannels/p.inChannels,S=new Ut(p.outShape,r.dtype),E=n.data.get(r.dataId).values,D=n.data.get(o.dataId).values,L=S.values;for(let U=0;U<p.batchSize;++U){const M=U*u[0],B=U*S.strides[0];for(let $=0;$<p.outHeight;++$){const x=B+$*S.strides[1],A=$*p.strideHeight-N;for(let O=0;O<d;++O){const F=A+O*m;if(F<0||F>=p.inHeight)continue;const P=O*f[0],V=M+F*u[1];for(let z=0;z<p.outWidth;++z){const W=x+z*S.strides[2],G=z*p.strideWidth-w;for(let H=0;H<y;++H){const j=G+H*b;if(j<0||j>=p.inWidth)continue;const K=P+H*f[1],Y=V+j*p.inChannels;let Q=W,tt=K;for(let et=0;et<p.inChannels;++et){const st=E[Y+et];for(let it=0;it<I;++it)L[Q+it]+=st*D[tt+it];Q+=I,tt+=I}}}}}}return n.makeTensorInfo(S.shape,S.dtype,S.values)}const a_={kernelName:Mc,backendName:"cpu",kernelFunc:Jf};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function l_(e){const{inputs:t,backend:n,attrs:s}=e,{x:r,dy:o}=t,{strides:i,dilations:a,pad:l,dimRoundingMode:c,filterShape:u}=s;J([r,o],"depthwiseConv2dNativeBackpropFilter");const f=Ke(r.shape,u,i,a,l,c,!0),{strideHeight:h,strideWidth:p,filterHeight:d,filterWidth:y}=f,m=new Ut(f.filterShape,"float32"),b=f.padInfo.left,_=f.padInfo.top,w=f.outChannels/f.inChannels,N=n.data.get(r.dataId).values,I=new Ut(r.shape,r.dtype,N),S=n.data.get(o.dataId).values,E=new Ut(o.shape,o.dtype,S);for(let D=0;D<d;++D){const L=Math.max(0,Math.ceil((_-D)/h)),U=Math.min(f.outHeight,(f.inHeight+_-D)/h);for(let M=0;M<y;++M){const B=Math.max(0,Math.ceil((b-M)/p)),$=Math.min(f.outWidth,(f.inWidth+b-M)/p);for(let x=0;x<f.outChannels;++x){const A=Math.trunc(x/w),O=x%w;let F=0;for(let P=0;P<f.batchSize;++P)for(let V=L;V<U;++V){const z=D+V*h-_;for(let W=B;W<$;++W){const G=M+W*p-b;F+=I.get(P,z,G,A)*E.get(P,V,W,x)}}m.set(F,D,M,A,O)}}}return n.makeTensorInfo(m.shape,m.dtype,m.values)}const c_={kernelName:Vc,backendName:"cpu",kernelFunc:l_};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function u_(e){const{inputs:t,backend:n,attrs:s}=e,{dy:r,filter:o}=t,{strides:i,dilations:a,pad:l,dimRoundingMode:c,inputShape:u}=s;J([r,o],"depthwiseConv2DNativeBackpropInput");const f=nt(r.shape),h=nt(o.shape),p=Ke(u,o.shape,i,a,l,c,!0),d=new Ut(p.inShape,"float32"),y=d.values,[m,b,_]=d.strides,w=n.data.get(r.dataId).values,[N,I,S]=f,E=n.data.get(o.dataId).values,[D,L,U]=h,{batchSize:M,filterHeight:B,filterWidth:$,inChannels:x,inHeight:A,inWidth:O,outChannels:F,outHeight:P,outWidth:V,strideHeight:z,strideWidth:W}=p,G=B-1-p.padInfo.top,H=$-1-p.padInfo.left,j=F/x;for(let K=0;K<M;++K)for(let Y=0;Y<x;++Y)for(let Q=0;Q<A;++Q){const tt=Q-G,et=Math.max(0,Math.ceil(tt/z)),st=Math.min(P,(B+tt)/z);for(let it=0;it<O;++it){const ft=it-H,gt=Math.max(0,Math.ceil(ft/W)),kt=Math.min(V,($+ft)/W);let vt=0;for(let dt=et;dt<st;++dt){const $t=dt*z-tt;for(let Rt=gt;Rt<kt;++Rt){const Ye=Rt*W-ft,zt=N*K+I*dt+S*Rt,fn=D*(B-1-$t)+L*($-1-Ye)+U*Y;for(let he=0;he<j;++he){const Tn=Y*j+he,ve=w[zt+Tn],Ze=E[fn+he];vt+=ve*Ze}}}y[m*K+b*Q+_*it+Y]=vt}}return n.makeTensorInfo(d.shape,d.dtype,d.values)}const f_={kernelName:Bc,backendName:"cpu",kernelFunc:u_};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function h_(e){const{inputs:t,backend:n}=e,{x:s}=t,r=q(s.shape),o=n.data.get(s.dataId).values,i=at([r,r],s.dtype),a=i.values;for(let c=0;c<o.length;c++)a[c*r+c]=o[c];const l=[...s.shape,...s.shape];return n.makeTensorInfo(l,i.dtype,i.values)}const p_={kernelName:Cc,backendName:"cpu",kernelFunc:h_};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */const d_={kernelName:zc,backendName:"cpu",kernelFunc:({inputs:e,backend:t,attrs:n})=>{const{x:s,filter:r}=e,{strides:o,pad:i,dilations:a}=n,l=t,c=l.data.get(s.dataId).values,u=s.shape.length,f=l.data.get(r.dataId).values,h=r.shape.length,{batchSize:p,inHeight:d,inWidth:y,inChannels:m,outHeight:b,outWidth:_,padInfo:w,strideHeight:N,strideWidth:I,filterHeight:S,filterWidth:E,dilationHeight:D,dilationWidth:L,outShape:U}=xa(s.shape,r.shape,o,i,"NHWC",a),M=q(U),B=U.length,$=Ht(s.dtype,M);for(let A=0;A<p;++A)for(let O=0;O<b;++O){const F=O*N-w.top;for(let P=0;P<_;++P){const V=P*I-w.left;for(let z=0;z<m;++z){let W=Number.MIN_SAFE_INTEGER;for(let H=0;H<S;++H){const j=F+H*D;if(j>=0&&j<d)for(let K=0;K<E;++K){const Y=V+K*L;if(Y>=0&&Y<y){const Q=We([A,j,Y,z],u,nt(s.shape)),tt=We([H,K,z],h,nt(r.shape)),et=c[Q]+f[tt];et>W&&(W=et)}}}const G=We([A,O,P,z],B,nt(U));$[G]=W}}}return{dataId:l.write(Yn($,s.dtype),U,s.dtype),shape:U,dtype:s.dtype}}};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */const m_={kernelName:rl,backendName:"cpu",kernelFunc:({inputs:e,backend:t,attrs:n})=>{const{x:s,filter:r,dy:o}=e,{strides:i,pad:a,dilations:l}=n,c=t,u=Te(s.shape,c.data.get(s.dataId).values),f=Te(r.shape,c.data.get(r.dataId).values),{batchSize:h,inHeight:p,inWidth:d,inChannels:y,outHeight:m,outWidth:b,padInfo:_,strideHeight:w,strideWidth:N,filterHeight:I,filterWidth:S,dilationHeight:E,dilationWidth:D,outShape:L}=xa(s.shape,r.shape,i,a,"NHWC",l);T(o.rank===L.length,()=>`Error in ${rl}, dy must have the same rank as output ${L.length}, but got ${o.rank}`);const U=Te(L,c.data.get(o.dataId).values),M=cc(r.shape,r.dtype);for(let $=0;$<h;++$)for(let x=0;x<m;++x){const A=x*w-_.top;for(let O=0;O<b;++O){const F=O*N-_.left;for(let P=0;P<y;++P){let V=Number.MIN_SAFE_INTEGER,z=0,W=0;for(let G=0;G<I;++G){const H=A+G*E;if(H>=0&&H<p)for(let j=0;j<S;++j){const K=F+j*D;if(K>=0&&K<d){const Y=u[$][H][K][P]+f[G][j][P];Y>V&&(V=Y,z=G,W=j)}}}M[z][W][P]+=U[$][x][O][P]}}}return{dataId:c.write(Yn(M,s.dtype),r.shape,r.dtype),shape:r.shape,dtype:r.dtype}}};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */const g_={kernelName:sl,backendName:"cpu",kernelFunc:({inputs:e,backend:t,attrs:n})=>{const{x:s,filter:r,dy:o}=e,{strides:i,pad:a,dilations:l}=n,c=t,u=Te(s.shape,c.data.get(s.dataId).values),f=Te(r.shape,c.data.get(r.dataId).values),{batchSize:h,inHeight:p,inWidth:d,inChannels:y,outHeight:m,outWidth:b,padInfo:_,strideHeight:w,strideWidth:N,filterHeight:I,filterWidth:S,dilationHeight:E,dilationWidth:D,outShape:L}=xa(s.shape,r.shape,i,a,"NHWC",l);T(o.rank===L.length,()=>`Error in ${sl}, dy must have the same rank as output ${L.length}, but got ${o.rank}`);const U=Te(L,c.data.get(o.dataId).values),M=cc(s.shape,s.dtype);for(let $=0;$<h;++$)for(let x=0;x<m;++x){const A=x*w-_.top;for(let O=0;O<b;++O){const F=O*N-_.left;for(let P=0;P<y;++P){let V=Number.MIN_SAFE_INTEGER,z=A<0?0:A,W=F<0?0:F;for(let G=0;G<I;++G){const H=A+G*E;if(H>=0&&H<p)for(let j=0;j<S;++j){const K=F+j*D;if(K>=0&&K<d){const Y=u[$][H][K][P]+f[G][j][P];Y>V&&(V=Y,z=H,W=K)}}}M[$][z][W][P]+=U[$][x][O][P]}}}return{dataId:c.write(Yn(M,s.dtype),s.shape,s.dtype),shape:s.shape,dtype:s.dtype}}};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function rr(e){const{inputs:t,backend:n,attrs:s}=e,{x:r}=t,{axis:o,keepDims:i}=s;J(r,"sum");let a;r.dtype==="bool"?a=In({inputs:{x:r},backend:n,attrs:{dtype:"int32"}}):a=qe({inputs:{x:r},backend:n});const l=a.shape.length,c=Bt(o,a.shape),u=je(c,l);let f=c,h=a;u!=null&&(h=re({inputs:{x:a},backend:n,attrs:{perm:u}}),f=Xe(f.length,l)),Zn("sum",f,h.shape.length);const[p,d]=cn(h.shape,f),y=Es(h.dtype,"int32");let m=Lr(n,p,y);const b=q(d),_=n.data.get(m.dataId).values,w=n.data.get(h.dataId).values;for(let N=0;N<_.length;++N){const I=N*b;let S=0;for(let E=0;E<b;++E)S+=w[I+E];_[N]=S}if(i){const N=Ue(m.shape,c),I=m;m=It({inputs:{x:m},backend:n,attrs:{shape:N}}),n.disposeIntermediateTensorInfo(I)}return n.disposeIntermediateTensorInfo(a),u!=null&&n.disposeIntermediateTensorInfo(h),m}const y_={kernelName:Ru,backendName:"cpu",kernelFunc:rr};/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function b_(e){const{inputs:t,backend:n,attrs:s}=e,{equation:r}=s,o=t,{allDims:i,summedDims:a,idDims:l}=Yy(r,o.length);Jy(i.length,l,o);const{path:c,steps:u}=Qy(a,l),f=u.length;let h=null,p=i.length;const d=[];for(let y=0;y<f;++y){for(const m of u[y]){const{permutationIndices:b,expandDims:_}=Zy(p,l[m]);let w;t9(b)?w=o[m]:(w=re({inputs:{x:o[m]},backend:n,attrs:{perm:b}}),d.push(w));const N=w.shape.slice();for(let I=0;I<_.length;++I)N.splice(_[I],0,1);Oe(w.shape,N)||(w=It({inputs:{x:w},backend:n,attrs:{shape:N}}),d.push(w)),h===null?h=w:(h=fo({inputs:{a:w,b:h},backend:n}),d.push(h))}y<f-1&&(c[y]>=0&&(h=rr({inputs:{x:h},backend:n,attrs:{axis:c[y]-(i.length-p),keepDims:!1}}),d.push(h)),p--)}for(const y of d)y!==h&&n.disposeIntermediateTensorInfo(y);return h}const __={kernelName:Wc,backendName:"cpu",kernelFunc:b_};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function w_(e){const{inputs:t,backend:n}=e,{dy:s,y:r}=t;J([s,r],"eluGrad");const o=new Float32Array(q(r.shape)),i=n.data.get(r.dataId).values,a=n.data.get(s.dataId).values;for(let l=0;l<i.length;++l){const c=i[l];c>=1?o[l]=a[l]:o[l]=a[l]*(c+1)}return n.makeTensorInfo(r.shape,"float32",o)}const N_={kernelName:jh,backendName:"cpu",kernelFunc:w_};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const I_=Uy,k_=My,S_=Vy,T_=By,E_=Cy,v_=zy,x_=pt(Ri,e=>{const t=Math.sign(e),n=Math.abs(e),s=1/(1+I_*n);return t*(1-((((v_*s+E_)*s+T_)*s+S_)*s+k_)*s*Math.exp(-n*n))}),$_={kernelName:Ri,backendName:"cpu",kernelFunc:x_};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function Ur(e){const{inputs:t,backend:n,attrs:s}=e,{input:r}=t,{dim:o}=s,i=r.shape.length,a=r.shape.slice();let l=o;return o<0&&(T(-(i+1)<=o,()=>`Axis must be in the interval [${-(i+1)}, ${i}]`),l=i+o+1),a.splice(l,0,1),It({inputs:{x:r},backend:n,attrs:{shape:a}})}const A_={kernelName:Hc,backendName:"cpu",kernelFunc:Ur};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */const D_=Ft((e,t)=>e/t),ja=Ct(Ai,D_),ri={kernelName:Ai,backendName:"cpu",kernelFunc:ja};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function Qf(e,t,n){const s=e.shape,r=s[0],o=s[1],i=n.data.get(e.dataId),a=i.complexTensorInfos.real,l=i.complexTensorInfos.imag,c=[r,o],u=q(c),f=Xt("float32",u),h=Xt("float32",u);for(let m=0;m<r;m++){const b=Kn({inputs:{x:a},backend:n,attrs:{begin:[m,0],size:[1,o]}}),_=Kn({inputs:{x:l},backend:n,attrs:{begin:[m,0],size:[1,o]}}),w=le({inputs:{real:b,imag:_},backend:n}),{real:N,imag:I}=R_(w,t,n),S=bs(N,I);for(let E=0;E<o;E++){const D=Af(S,E);f[m*o+E]=D.real,h[m*o+E]=D.imag}n.disposeIntermediateTensorInfo(b),n.disposeIntermediateTensorInfo(_),n.disposeIntermediateTensorInfo(w)}const p=n.makeTensorInfo(c,"float32",f),d=n.makeTensorInfo(c,"float32",h),y=le({inputs:{real:p,imag:d},backend:n});return n.disposeIntermediateTensorInfo(p),n.disposeIntermediateTensorInfo(d),y}function R_(e,t,n){const s=q(e.shape),r=n.data.get(e.dataId),o=n.data.get(r.complexTensorInfos.real.dataId).values,i=n.data.get(r.complexTensorInfos.imag.dataId).values;if(O_(s)){const a=oi(o,i,s,t,n),l=[e.shape[0],e.shape[1]];if(t){const c=n.makeTensorInfo(l,"float32",a.real),u=n.makeTensorInfo(l,"float32",a.imag),f=n.makeTensorInfo([],"float32",Ia(s,"float32")),h=qe({inputs:{x:f},backend:n}),p=ri.kernelFunc({inputs:{a:c,b:f},backend:n}),d=ri.kernelFunc({inputs:{a:u,b:h},backend:n}),y=n.data.get(p.dataId).values,m=n.data.get(d.dataId).values;return n.disposeIntermediateTensorInfo(c),n.disposeIntermediateTensorInfo(u),n.disposeIntermediateTensorInfo(f),n.disposeIntermediateTensorInfo(h),n.disposeIntermediateTensorInfo(p),n.disposeIntermediateTensorInfo(d),{real:y,imag:m}}return a}else{const a=bs(o,i),l=L_(a,s,t);return Wy(l)}}function O_(e){return(e&e-1)===0}function oi(e,t,n,s,r){if(n===1)return{real:e,imag:t};const o=bs(e,t),i=n/2,a=Hy(o),l=a.real,c=a.imag,u=[l.length],f=r.makeTensorInfo(u,"float32",l),h=r.makeTensorInfo(u,"float32",c),p=le({inputs:{real:f,imag:h},backend:r}),d=qy(o),y=d.real,m=d.imag,b=[y.length],_=r.makeTensorInfo(b,"float32",y),w=r.makeTensorInfo(b,"float32",m),N=le({inputs:{real:_,imag:w},backend:r}),I=oi(l,c,i,s,r),S=I.real,E=I.imag,D=[S.length],L=r.makeTensorInfo(D,"float32",S),U=r.makeTensorInfo(D,"float32",E),M=le({inputs:{real:L,imag:U},backend:r}),B=oi(y,m,i,s,r),$=B.real,x=B.imag,A=[$.length],O=r.makeTensorInfo(A,"float32",$),F=r.makeTensorInfo(A,"float32",x),P=le({inputs:{real:O,imag:F},backend:r}),V=Ky(n,s),z=[V.real.length],W=r.makeTensorInfo(z,"float32",V.real),G=r.makeTensorInfo(z,"float32",V.imag),H=le({inputs:{real:W,imag:G},backend:r}),j=fo({inputs:{a:H,b:P},backend:r}),K=_s({inputs:{a:M,b:j},backend:r}),Y=Ga({inputs:{a:M,b:j},backend:r}),Q=Gn({inputs:{input:K},backend:r}),tt=Gn({inputs:{input:Y},backend:r}),et=ws({inputs:{input:K},backend:r}),st=ws({inputs:{input:Y},backend:r}),it=Ns({inputs:[Q,tt],backend:r,attrs:{axis:0}}),ft=Ns({inputs:[et,st],backend:r,attrs:{axis:0}}),gt=r.data.get(it.dataId).values,kt=r.data.get(ft.dataId).values;return r.disposeIntermediateTensorInfo(f),r.disposeIntermediateTensorInfo(h),r.disposeIntermediateTensorInfo(p),r.disposeIntermediateTensorInfo(_),r.disposeIntermediateTensorInfo(w),r.disposeIntermediateTensorInfo(N),r.disposeIntermediateTensorInfo(L),r.disposeIntermediateTensorInfo(U),r.disposeIntermediateTensorInfo(M),r.disposeIntermediateTensorInfo(O),r.disposeIntermediateTensorInfo(F),r.disposeIntermediateTensorInfo(P),r.disposeIntermediateTensorInfo(W),r.disposeIntermediateTensorInfo(G),r.disposeIntermediateTensorInfo(H),r.disposeIntermediateTensorInfo(j),r.disposeIntermediateTensorInfo(K),r.disposeIntermediateTensorInfo(Y),r.disposeIntermediateTensorInfo(Q),r.disposeIntermediateTensorInfo(et),r.disposeIntermediateTensorInfo(tt),r.disposeIntermediateTensorInfo(st),r.disposeIntermediateTensorInfo(it),r.disposeIntermediateTensorInfo(ft),{real:gt,imag:kt}}function L_(e,t,n){const s=new Float32Array(t*2);for(let r=0;r<t;r++){let o=0,i=0;for(let a=0;a<t;a++){const l=jy(r*a,t,n),c=Af(e,a);o+=c.real*l.real-c.imag*l.imag,i+=c.real*l.imag+c.imag*l.real}n&&(o/=t,i/=t),Gy(s,o,i,r)}return s}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function F_(e){const{inputs:t,backend:n}=e,{input:s}=t,r=q(s.shape),o=s.shape[s.shape.length-1],i=r/o,a=It({inputs:{x:s},backend:n,attrs:{shape:[i,o]}}),l=Qf(a,!1,n),c=It({inputs:{x:l},backend:n,attrs:{shape:s.shape}});return n.disposeIntermediateTensorInfo(a),n.disposeIntermediateTensorInfo(l),c}const P_={kernelName:qc,backendName:"cpu",kernelFunc:F_};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function Xa(e){const{backend:t,attrs:n}=e,{shape:s,value:r,dtype:o}=n,i=o||Xr(r),a=Ht(i,q(s));return M_(a,r,i),t.makeTensorInfo(s,i,a)}const U_={kernelName:Gc,backendName:"cpu",kernelFunc:Xa};function M_(e,t,n){e.fill(t)}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */const V_={kernelName:Kc,backendName:"cpu",kernelFunc:({inputs:e,attrs:t,backend:n})=>{const{image:s}=e,r=n,o=Xt(s.dtype,q(s.shape)),[i,a,l,c]=s.shape,u=r.data.get(s.dataId).values;for(let h=0;h<i;h++){const p=h*l*a*c;for(let d=0;d<a;d++){const y=d*(l*c);for(let m=0;m<l;m++){const b=m*c;for(let _=0;_<c;_++){const w=Math.round(l-m-1),N=p+y+b+_;let I=u[N];if(w>=0&&w<l){const S=w*c,E=p+y+S+_;I=u[E]}o[N]=I}}}}return{dataId:r.write(o,s.shape,s.dtype),shape:s.shape,dtype:s.dtype}}};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */const B_=Ft((e,t)=>Math.floor(e/t)),C_=Ct(Ui,B_,null,"int32"),z_={kernelName:Ui,backendName:"cpu",kernelFunc:C_};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function W_(e){const{inputs:t,backend:n,attrs:s}=e,{x:r,filter:o,bias:i,preluActivationWeights:a}=t,{strides:l,pad:c,dataFormat:u,dilations:f,dimRoundingMode:h,activation:p,leakyreluAlpha:d}=s;let y=Zf({inputs:{x:r,filter:o},backend:n,attrs:{strides:l,pad:c,dataFormat:u,dilations:f,dimRoundingMode:h}});if(i){const m=y;if(u==="NCHW"&&i.shape.length===1&&i.shape[0]!==1){const b=It({inputs:{x:i},backend:n,attrs:{shape:[i.shape[0],1,1]}});y=_s({inputs:{a:y,b},backend:n}),n.disposeIntermediateTensorInfo(b)}else y=_s({inputs:{a:y,b:i},backend:n});n.disposeIntermediateTensorInfo(m)}if(p){const m=y;if(u==="NCHW"&&p==="prelu"&&a.shape.length===1&&a.shape[0]!==1){const b=It({inputs:{x:a},backend:n,attrs:{shape:[a.shape[0],1,1]}});y=Pr(n,y,p,b,d),n.disposeIntermediateTensorInfo(b)}else y=Pr(n,y,p,a,d);n.disposeIntermediateTensorInfo(m)}return y}const H_={kernelName:vo,backendName:"cpu",kernelFunc:W_};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function q_(e){const{inputs:t,backend:n,attrs:s}=e,{x:r,filter:o,bias:i,preluActivationWeights:a}=t,{strides:l,pad:c,dataFormat:u,dilations:f,dimRoundingMode:h,activation:p,leakyreluAlpha:d}=s;let y=Jf({inputs:{x:r,filter:o},backend:n,attrs:{strides:l,pad:c,dataFormat:u,dilations:f,dimRoundingMode:h}});if(i){const m=y;y=_s({inputs:{a:y,b:i},backend:n}),n.disposeIntermediateTensorInfo(m)}if(p){const m=y;y=Pr(n,y,p,a,d),n.disposeIntermediateTensorInfo(m)}return y}const G_={kernelName:xo,backendName:"cpu",kernelFunc:q_};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function K_(e){const{inputs:t,backend:n}=e,{params:s,indices:r}=t,o=q(s.shape),i=r.shape,a=i[i.length-1],[l,c,u,f]=Pd(s,r);if(c===0)return n.makeTensorInfo(l,s.dtype,[]);const h=n.data.get(r.dataId).values,p=n.bufferSync(s),d=m8(h,p,s.dtype,c,a,u,f,s.shape,o);return n.makeTensorInfo(l,s.dtype,d.values)}const j_={kernelName:Yc,backendName:"cpu",kernelFunc:K_};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function X_(e){const{inputs:t,backend:n,attrs:s}=e,{x:r,indices:o}=t,{axis:i,batchDims:a}=s;J([r,o],"gatherV2");const l=Bt(i,r.shape)[0],c=n.data.get(o.dataId).values,u=r.shape[l];for(let N=0;N<c.length;++N){const I=c[N];T(I<=u-1&&I>=0,()=>`GatherV2: the index value ${I} is not in [0, ${u-1}]`)}let f=a;a==null&&(f=0);const h=q(o.shape),p=d9(r,o,l,f),d=It({inputs:{x:r},backend:n,attrs:{shape:[p.batchSize,p.outerSize,p.dimSize,p.sliceSize]}}),y=It({inputs:{x:o},backend:n,attrs:{shape:[p.batchSize,h/p.batchSize]}}),m=[p.batchSize,p.outerSize,h/p.batchSize,p.sliceSize],b=n.bufferSync(y),_=n.bufferSync(d),w=g8(_,b,m);return n.disposeIntermediateTensorInfo(d),n.disposeIntermediateTensorInfo(y),n.makeTensorInfo(p.outputShape,w.dtype,w.values)}const Y_={kernelName:Xc,backendName:"cpu",kernelFunc:X_};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function Z_(e){const{inputs:t,backend:n}=e,{input:s}=t,r=q(s.shape),o=s.shape[s.shape.length-1],i=r/o,a=It({inputs:{x:s},backend:n,attrs:{shape:[i,o]}}),l=Qf(a,!0,n),c=It({inputs:{x:l},backend:n,attrs:{shape:s.shape}});return n.disposeIntermediateTensorInfo(a),n.disposeIntermediateTensorInfo(l),c}const J_={kernelName:Zc,backendName:"cpu",kernelFunc:Z_};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Q_=pt(Ci,e=>Number.isFinite(e)?1:0,"bool"),tw={kernelName:Ci,backendName:"cpu",kernelFunc:Q_};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const ew=pt(zi,e=>Math.abs(e)===1/0?1:0,"bool"),nw={kernelName:zi,backendName:"cpu",kernelFunc:ew};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const sw=pt(Wi,e=>Number.isNaN(e)?1:0,"bool"),rw={kernelName:Wi,backendName:"cpu",kernelFunc:sw};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function ow(e){const{backend:t,attrs:n}=e,{start:s,stop:r,num:o}=n,i=$8(s,r,o);return t.makeTensorInfo([i.length],"float32",i)}const iw={kernelName:tu,backendName:"cpu",kernelFunc:ow};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const aw=pt(Ki,e=>Math.log1p(e)),lw={kernelName:Ki,backendName:"cpu",kernelFunc:aw};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */const cw=Ft((e,t)=>e&&t),uw=Ct(ji,cw,null,"bool"),fw={kernelName:ji,backendName:"cpu",kernelFunc:uw};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const hw=pt(Xi,e=>e?0:1,"bool"),pw={kernelName:Xi,backendName:"cpu",kernelFunc:hw};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */const dw=Ft((e,t)=>e||t),mw=Ct(Yi,dw,null,"bool"),gw={kernelName:Yi,backendName:"cpu",kernelFunc:mw};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function yw(e){const{inputs:t,backend:n,attrs:s}=e,{x:r}=t,{depthRadius:o,bias:i,alpha:a,beta:l}=s;J(r,"LRN");const c=r.shape[3],u=c-1,f=n.data.get(r.dataId).values,h=q(r.shape),p=new Float32Array(h);function d(y){const m=y%c;let b=y-m+Math.max(0,m-o);const _=y-m+Math.min(m+o,u);let w=0;for(;b<=_;b++){const N=f[b];w+=N*N}return w}for(let y=0;y<h;y++){const m=d(y),b=f[y]*Math.pow(i+a*m,-l);p[y]=b}return n.makeTensorInfo(r.shape,r.dtype,p)}const bw={kernelName:eu,backendName:"cpu",kernelFunc:yw};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function _w(e){const{inputs:t,backend:n,attrs:s}=e,{x:r,y:o,dy:i}=t,{depthRadius:a,bias:l,alpha:c,beta:u}=s;J(i,"LRNGrad");const f=q(i.shape),h=i.shape[3],p=n.data.get(i.dataId).values,d=n.data.get(r.dataId).values,y=n.data.get(o.dataId).values,m=new Float32Array(f),b=f;for(let _=0;_<b;_++){const w=_%h,N=_-w+Math.max(0,w-a),I=_-w+Math.min(h,w+a+1);let S=0;for(let E=N;E<I;E++)S+=Math.pow(d[E],2);S=c*S+l;for(let E=N;E<I;E++){let D=-2*c*u*d[E]*y[_]/S;_===E&&(D+=Math.pow(S,-u)),D*=p[_],m[E]+=D}}return n.makeTensorInfo(i.shape,r.dtype,m)}const ww={kernelName:Xh,backendName:"cpu",kernelFunc:_w};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function th(e){const{inputs:t,backend:n,attrs:s}=e,{x:r}=t,{reductionIndices:o,keepDims:i}=s,a=n;let l=r.shape;const c=l.length,u=Bt(o,l);let f=u;const h=je(f,c);let p=a.data.get(r.dataId).values;if(h!=null){const N=new Array(c);for(let I=0;I<N.length;I++)N[I]=l[h[I]];p=Vf(p,l,r.dtype,h,N),f=Xe(f.length,c),l=N}J(r,"max"),Zn("max",f,c);const[d,y]=cn(l,f),m=q(y),b=O8(p,m,d,r.dtype),_=a.write(b,d,r.dtype);let w=d;return i&&(w=Ue(d,u)),{dataId:_,shape:w,dtype:r.dtype}}const Nw={kernelName:nu,backendName:"cpu",kernelFunc:th};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function Iw(e){const{inputs:t,backend:n,attrs:s}=e,{x:r}=t;J(r,"maxPool");const{filterSize:o,strides:i,pad:a,dimRoundingMode:l}=s,c=1;T(Fe(i,c),()=>`Error in maxPool: Either strides or dilations must be 1. Got strides ${i} and dilations '${c}'`);const u=vs(r.shape,o,i,c,a,l);let f;if(u.filterWidth===1&&u.filterHeight===1&&Oe(u.inShape,u.outShape))f=qe({inputs:{x:r},backend:n});else{const h=n.data.get(r.dataId).values,p=nt(r.shape),d=Ka(h,r.shape,r.dtype,p,u,"max");f=n.makeTensorInfo(u.outShape,r.dtype,d.values)}return f}const kw={kernelName:su,backendName:"cpu",kernelFunc:Iw};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function Sw(e){const{inputs:t,backend:n,attrs:s}=e,{x:r}=t,{filterSize:o,strides:i,pad:a,dimRoundingMode:l,dataFormat:c}=s;J(r,"maxPool3d");const u=Qr(r.shape,o,i,1,a,l,c),f=n.data.get(r.dataId).values,h=Yf(f,r.shape,r.dtype,nt(r.shape),u,"max");return n.makeTensorInfo(h.shape,"float32",h.values)}const Tw={kernelName:ru,backendName:"cpu",kernelFunc:Sw};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function Ew(e){const{inputs:t,backend:n,attrs:s}=e,{dy:r,input:o}=t,{filterSize:i,strides:a,pad:l,dimRoundingMode:c}=s;J([r,o],"maxPool3DGrad");const u=Qr(o.shape,i,a,1,l,c),f=n.bufferSync(o),h=p6(f,u),p=u.strideDepth,d=u.strideHeight,y=u.strideWidth,m=u.dilationDepth,b=u.dilationHeight,_=u.dilationWidth,w=u.effectiveFilterDepth,N=u.effectiveFilterHeight,I=u.effectiveFilterWidth,S=w-1-u.padInfo.front,E=I-1-u.padInfo.left,D=N-1-u.padInfo.top,L=at(o.shape,"float32"),U=n.bufferSync(r);for(let M=0;M<u.batchSize;++M)for(let B=0;B<u.inChannels;++B)for(let $=0;$<u.inDepth;++$)for(let x=0;x<u.inHeight;++x)for(let A=0;A<u.inWidth;++A){const O=$-S,F=x-D,P=A-E;let V=0;for(let z=0;z<w;z+=m){const W=(O+z)/p;if(!(W<0||W>=u.outDepth||Math.floor(W)!==W))for(let G=0;G<N;G+=b){const H=(F+G)/d;if(!(H<0||H>=u.outHeight||Math.floor(H)!==H))for(let j=0;j<I;j+=_){const K=(P+j)/y;if(K<0||K>=u.outWidth||Math.floor(K)!==K)continue;const Y=w*N*I-1-h.get(M,W,H,K,B),Q=z*N*I+G*I+j,tt=Y===Q?1:0;if(tt===0)continue;const et=U.get(M,W,H,K,B);V+=et*tt}}}L.set(V,M,$,x,A,B)}return n.makeTensorInfo(L.shape,L.dtype,L.values)}const vw={kernelName:Zh,backendName:"cpu",kernelFunc:Ew};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function xw(e){const{inputs:t,backend:n,attrs:s}=e,{dy:r,input:o,output:i}=t,a=o;J([o,i],"maxPoolGrad");const{filterSize:l,strides:c,pad:u,dimRoundingMode:f}=s,h=vs(a.shape,l,c,1,u,f),p=n.data.get(a.dataId).values,d=at(h.outShape,a.dtype,Xf(p,a.shape,a.dtype,h).values),y=h.strideHeight,m=h.strideWidth,b=h.dilationHeight,_=h.dilationWidth,w=h.effectiveFilterHeight,N=h.effectiveFilterWidth,I=N-1-h.padInfo.left,S=w-1-h.padInfo.top,E=at(a.shape,"float32"),D=n.data.get(r.dataId).values,L=at(r.shape,"float32",D);for(let U=0;U<h.batchSize;++U)for(let M=0;M<h.inChannels;++M)for(let B=0;B<h.inHeight;++B)for(let $=0;$<h.inWidth;++$){const x=B-S,A=$-I;let O=0;for(let F=0;F<w;F+=b){const P=(x+F)/y;if(!(P<0||P>=h.outHeight||Math.floor(P)!==P))for(let V=0;V<N;V+=_){const z=(A+V)/m;if(z<0||z>=h.outWidth||Math.floor(z)!==z)continue;const W=w*N-1-d.get(U,P,z,M),G=F*N+V,H=W===G?1:0;if(H===0)continue;const j=L.get(U,P,z,M);O+=j*H}}E.set(O,U,B,$,M)}return n.makeTensorInfo(E.shape,E.dtype,E.values)}const $w={kernelName:Yh,backendName:"cpu",kernelFunc:xw};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function Aw(e,t,n,s,r){const o=nt(t),i=Ka(e,t,n,o,r,"max"),a=Xf(e,t,n,r,!0,s);return[i.values,a.values]}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */const Dw={kernelName:ou,backendName:"cpu",kernelFunc:({inputs:e,attrs:t,backend:n})=>{const{x:s}=e,{filterSize:r,strides:o,pad:i,includeBatchInIndex:a}=t,l=n;J(s,"MaxPoolWithArgmax");const c=l.data.get(s.dataId).values,u=vs(s.shape,r,o,[1,1],i),[f,h]=Aw(c,s.shape,s.dtype,a,u),p=l.write(f,u.outShape,s.dtype),d=l.write(h,u.outShape,s.dtype);return[{dataId:p,shape:u.outShape,dtype:s.dtype},{dataId:d,shape:u.outShape,dtype:"int32"}]}};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function Rw(e){const{inputs:t,backend:n,attrs:s}=e,{x:r}=t,{axis:o,keepDims:i}=s,a=Bt(o,r.shape),c=cn(r.shape,a)[1],u=q(c),f=[],h=n.makeTensorInfo([],"float32",new Float32Array([u]));f.push(h);const p=In({inputs:{x:r},backend:n,attrs:{dtype:"float32"}});f.push(p);const d=ja({inputs:{a:p,b:h},backend:n});f.push(d);const y=rr({inputs:{x:d},backend:n,attrs:{axis:o,keepDims:i}});return f.forEach(m=>n.disposeIntermediateTensorInfo(m)),y}const Ow={kernelName:iu,backendName:"cpu",kernelFunc:Rw};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function Lw(e){const{inputs:t,backend:n,attrs:s}=e,{x:r}=t,{axis:o,keepDims:i}=s;J(r,"min");const a=Bt(o,r.shape);let l=a;const c=je(l,r.shape.length);let u=r;c!=null&&(u=re({inputs:{x:r},backend:n,attrs:{perm:c}}),l=Xe(l.length,r.shape.length)),Zn("min",l,u.shape.length);const[f,h]=cn(u.shape,l),p=q(h),d=Yt(q(f),u.dtype),y=n.data.get(u.dataId).values;for(let b=0;b<d.length;++b){const _=b*p;let w=y[_];for(let N=0;N<p;++N){const I=y[_+N];(Number.isNaN(I)||I<w)&&(w=I)}d[b]=w}c!=null&&n.disposeIntermediateTensorInfo(u);const m=n.makeTensorInfo(f,u.dtype,d);if(i){const b=Ue(f,a),_=It({inputs:{x:m},backend:n,attrs:{shape:b}});return n.disposeIntermediateTensorInfo(m),_}return m}const Fw={kernelName:au,backendName:"cpu",kernelFunc:Lw};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function Pw(e){const{inputs:t,backend:n,attrs:s}=e,{x:r}=t,{paddings:o,mode:i}=s;J(r,"mirrorPad");const a=o.map((w,N)=>w[0]+r.shape[N]+w[1]),l=o.map(w=>w[0]),c=o.map((w,N)=>w[0]+r.shape[N]),u=i==="reflect"?0:1,f=n.data.get(r.dataId).values,h=r.shape.length,p=nt(r.shape),d=q(a),y=a.length,m=nt(a),b=Xt(r.dtype,d);for(let w=0;w<d;w++){let N=Ts(w,y,m);for(let S=0;S<y;S++)N[S]<l[S]?N[S]=l[S]*2-N[S]-u:N[S]>=c[S]&&(N[S]=(c[S]-1)*2-N[S]+u);N=N.map((S,E)=>S-l[E]);const I=We(N,h,p);b[w]=f[I]}return{dataId:n.write(b,a,r.dtype),shape:a,dtype:r.dtype}}const Uw={kernelName:lu,backendName:"cpu",kernelFunc:Pw};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */const Mw=Ft((e,t)=>{const n=e%t;return e<0&&t<0||e>=0&&t>=0?n:(n+t)%t}),Vw=Ct(Qi,Mw),Bw={kernelName:Qi,backendName:"cpu",kernelFunc:Vw};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function eh(e){const{inputs:t,backend:n,attrs:s}=e,{logits:r}=t,{dim:o}=s,i=r.shape.length;let a=o;if(a===-1&&(a=i-1),a!==i-1)throw Error(`Softmax along a non-last dimension is not yet supported. Logits was rank ${i} and dim was ${a}`);const l=Bt([a],r.shape),c=th({inputs:{x:r},backend:n,attrs:{reductionIndices:l,keepDims:!1}}),u=Ue(c.shape,l),f=It({inputs:{x:c},backend:n,attrs:{shape:u}}),h=Ga({inputs:{a:r,b:f},backend:n}),p=Uf({inputs:{x:h},backend:n}),d=rr({inputs:{x:p},backend:n,attrs:{axis:l,keepDims:!1}}),y=It({inputs:{x:d},backend:n,attrs:{shape:u}}),m=ja({inputs:{a:p,b:y},backend:n});return n.disposeIntermediateTensorInfo(c),n.disposeIntermediateTensorInfo(f),n.disposeIntermediateTensorInfo(h),n.disposeIntermediateTensorInfo(p),n.disposeIntermediateTensorInfo(d),n.disposeIntermediateTensorInfo(y),m}const Cw={kernelName:Fu,backendName:"cpu",kernelFunc:eh};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function zw(e){const{inputs:t,backend:n,attrs:s}=e,{logits:r}=t,{numSamples:o,seed:i,normalized:a}=s;J(r,"multinomial");const l=a?r:eh({inputs:{logits:r},backend:n,attrs:{dim:-1}}),c=l.shape[0],u=l.shape[1],f=n.data.get(l.dataId).values,h=[c,o],p=Yt(q(h),"int32");for(let d=0;d<c;++d){const y=d*u,m=new Float32Array(u-1);m[0]=f[y];for(let w=1;w<m.length;++w)m[w]=m[w-1]+f[y+w];const b=lo.alea(i.toString()),_=d*o;for(let w=0;w<o;++w){const N=b();p[_+w]=m.length;for(let I=0;I<m.length;I++)if(N<m[I]){p[_+w]=I;break}}}return a||n.disposeIntermediateTensorInfo(l),n.makeTensorInfo(h,"int32",p)}const Ww={kernelName:cu,backendName:"cpu",kernelFunc:zw};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */const Hw=Sf;function qw(e){const{inputs:t,backend:n,attrs:s}=e,{boxes:r,scores:o}=t,{maxOutputSize:i,iouThreshold:a,scoreThreshold:l}=s;J(r,"NonMaxSuppression");const c=n.data.get(r.dataId).values,u=n.data.get(o.dataId).values,{selectedIndices:f}=Hw(c,u,i,a,l);return n.makeTensorInfo([f.length],"int32",new Int32Array(f))}const Gw={kernelName:fu,backendName:"cpu",kernelFunc:qw};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */const Kw=Tf;function jw(e){const{inputs:t,backend:n,attrs:s}=e,{boxes:r,scores:o}=t,{maxOutputSize:i,iouThreshold:a,scoreThreshold:l,padToMaxOutputSize:c}=s;J(r,"NonMaxSuppressionPadded");const u=n.data.get(r.dataId).values,f=n.data.get(o.dataId).values,{selectedIndices:h,validOutputs:p}=Kw(u,f,i,a,l,c);return[n.makeTensorInfo([h.length],"int32",new Int32Array(h)),n.makeTensorInfo([],"int32",new Int32Array([p]))]}const Xw={kernelName:hu,backendName:"cpu",kernelFunc:jw};/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */const Yw=Ef;function Zw(e){const{inputs:t,backend:n,attrs:s}=e,{boxes:r,scores:o}=t,{maxOutputSize:i,iouThreshold:a,scoreThreshold:l,softNmsSigma:c}=s;J(r,"NonMaxSuppressionWithScore");const u=n.data.get(r.dataId).values,f=n.data.get(o.dataId).values,h=i,p=a,d=l,y=c,{selectedIndices:m,selectedScores:b}=Yw(u,f,h,p,d,y);return[n.makeTensorInfo([m.length],"int32",new Int32Array(m)),n.makeTensorInfo([b.length],"float32",new Float32Array(b))]}const Jw={kernelName:pu,backendName:"cpu",kernelFunc:Zw};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function Qw(e){const{inputs:t,backend:n,attrs:s}=e,{indices:r}=t,{dtype:o,depth:i,onValue:a,offValue:l}=s;J(r,"oneHot");const c=q(r.shape),u=new Float32Array(c*i);u.fill(l);const f=n.data.get(r.dataId).values;for(let h=0;h<c;++h)f[h]>=0&&f[h]<i&&(u[h*i+f[h]]=a);return n.makeTensorInfo([...r.shape,i],o,u)}const tN={kernelName:mu,backendName:"cpu",kernelFunc:Qw};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function Mr(e){const{inputs:t,backend:n}=e,{x:s}=t;if(s.dtype==="string")throw new Error("zerosLike is not supported for string tensors");if(s.dtype==="complex64"){const r=Gn({inputs:{input:s},backend:n}),o=Mr({inputs:{x:r},backend:n}),i=ws({inputs:{input:s},backend:n}),a=Mr({inputs:{x:i},backend:n}),l=le({inputs:{real:o,imag:a},backend:n});return n.disposeIntermediateTensorInfo(r),n.disposeIntermediateTensorInfo(o),n.disposeIntermediateTensorInfo(i),n.disposeIntermediateTensorInfo(a),l}else return Xa({backend:n,attrs:{shape:s.shape,value:0,dtype:s.dtype}})}const eN={kernelName:Yu,backendName:"cpu",kernelFunc:Mr};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function nh(e){const{inputs:t,backend:n}=e,{x:s}=t;if(s.dtype==="string")throw new Error("onesLike is not supported for string tensors");if(s.dtype==="complex64"){const r=Gn({inputs:{input:s},backend:n}),o=nh({inputs:{x:r},backend:n}),i=ws({inputs:{input:s},backend:n}),a=Mr({inputs:{x:i},backend:n}),l=le({inputs:{real:o,imag:a},backend:n});return n.disposeIntermediateTensorInfo(r),n.disposeIntermediateTensorInfo(o),n.disposeIntermediateTensorInfo(i),n.disposeIntermediateTensorInfo(a),l}else return Xa({backend:n,attrs:{shape:s.shape,value:1,dtype:s.dtype}})}const nN={kernelName:du,backendName:"cpu",kernelFunc:nh};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function sh(e){const{inputs:t,backend:n,attrs:s}=e,{axis:r}=s;if(t.length===1)return Ur({inputs:{input:t[0]},backend:n,attrs:{dim:r}});const o=t[0].shape,i=t[0].dtype;t.forEach(u=>{ge(o,u.shape,"All tensors passed to stack must have matching shapes"),T(i===u.dtype,()=>"All tensors passed to stack must have matching dtypes")});const a=[],l=t.map(u=>{const f=Ur({inputs:{input:u},backend:n,attrs:{dim:r}});return a.push(f),f}),c=Ns({inputs:l,backend:n,attrs:{axis:r}});return a.forEach(u=>n.disposeIntermediateTensorInfo(u)),c}const sN={kernelName:gu,backendName:"cpu",kernelFunc:sh};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function rN(e){const{inputs:t,backend:n,attrs:s}=e,{x:r}=t,{paddings:o,constantValue:i}=s;J(r,"pad");const a=o.map((_,w)=>_[0]+r.shape[w]+_[1]),l=o.map(_=>_[0]),c=n.data.get(r.dataId).values,u=q(r.shape),f=r.shape.length,h=nt(r.shape),p=q(a),d=a.length,y=nt(a),m=Xt(r.dtype,p);i!==0&&m.fill(i);for(let _=0;_<u;_++){const N=Ts(_,f,h).map((S,E)=>S+l[E]),I=We(N,d,y);m[I]=c[_]}return{dataId:n.write(m,a,r.dtype),shape:a,dtype:r.dtype}}const rh={kernelName:yu,backendName:"cpu",kernelFunc:rN};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */const oN=Ft((e,t)=>Math.pow(e,t)),iN=Ct(na,oN),aN={kernelName:na,backendName:"cpu",kernelFunc:iN};/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function lN(e){const{inputs:t,backend:n,attrs:s}=e,{paramsNestedSplits:r,paramsDenseValues:o,indices:i}=t,a=r.map(m=>n.data.get(m.dataId).values),l=r.map(m=>m.shape),c=n.data.get(o.dataId).values,u=n.data.get(i.dataId).values,[f,h,p]=rb(a,l,c,o.shape,o.dtype,u,i.shape),d=f.map(m=>n.makeTensorInfo([m.length],"int32",m)),y=n.makeTensorInfo(p,o.dtype,h);return d.concat([y])}const cN={kernelName:wu,backendName:"cpu",kernelFunc:lN};/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function uN(e){const{inputs:t,backend:n,attrs:s}=e,{shape:r,values:o,defaultValue:i,rowPartitionTensors:a}=t,{rowPartitionTypes:l}=s,c=n.data.get(r.dataId).values,u=n.data.get(o.dataId).values,f=n.data.get(i.dataId).values,h=a.map(m=>n.data.get(m.dataId).values),p=a.map(m=>m.shape),[d,y]=ob(c,r.shape,u,o.shape,o.dtype,f,i.shape,h,p,l);return n.makeTensorInfo(d,o.dtype,y)}const fN={kernelName:Nu,backendName:"cpu",kernelFunc:uN};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function hN(e){const{backend:t,attrs:n}=e,{start:s,stop:r,dtype:o,step:i}=n,a=ib(s,r,i,o);return t.makeTensorInfo([a.length],o,a)}const pN={kernelName:Iu,backendName:"cpu",kernelFunc:hN};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const dN=pt(sa,e=>1/e),mN={kernelName:sa,backendName:"cpu",kernelFunc:dN};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function gN(e){const{inputs:t,backend:n,attrs:s}=e,{images:r}=t,{alignCorners:o,halfPixelCenters:i,size:a}=s;J(r,"resizeBilinear");const l=nt(r.shape),[c,u]=a,[f,h,p,d]=r.shape,y=n.data.get(r.dataId).values,m=new Float32Array(q([f,c,u,d])),b=[o&&c>1?h-1:h,o&&u>1?p-1:p],_=[o&&c>1?c-1:c,o&&u>1?u-1:u];let w=0;const N=b[0]/_[0],I=b[1]/_[1];for(let S=0;S<f;S++)for(let E=0;E<c;E++){let D;i?D=N*(E+.5)-.5:D=N*E;const L=Math.max(0,Math.floor(D)),U=D-L,M=Math.min(h-1,Math.ceil(D)),B=S*l[0]+L*l[1],$=S*l[0]+M*l[1];for(let x=0;x<u;x++){let A;i?A=I*(x+.5)-.5:A=I*x;const O=Math.max(0,Math.floor(A)),F=A-O,P=Math.min(p-1,Math.ceil(A)),V=B+O*l[2],z=$+O*l[2],W=B+P*l[2],G=$+P*l[2];for(let H=0;H<d;H++){const j=y[V+H],K=y[z+H],Y=y[W+H],Q=y[G+H],tt=j+(Y-j)*F,et=K+(Q-K)*F,st=tt+(et-tt)*U;m[w++]=st}}}return n.makeTensorInfo([f,c,u,d],"float32",m)}const yN={kernelName:Eu,backendName:"cpu",kernelFunc:gN};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function bN(e){const{inputs:t,backend:n,attrs:s}=e,{images:r,dy:o}=t,{alignCorners:i}=s;J([o,r],"resizeBilinearGrad");const a=nt(r.shape),[l,c,u,f]=r.shape,[,h,p]=o.shape,d=new Float32Array(l*c*u*f),y=[i&&h>1?c-1:c,i&&p>1?u-1:u],m=[i&&h>1?h-1:h,i&&p>1?p-1:p],b=y[0]/m[0],_=y[1]/m[1],w=n.data.get(o.dataId).values;let N=0;for(let I=0;I<l;I++){const S=I*a[0];for(let E=0;E<h;E++){const D=E*b,L=Math.floor(D),U=Math.min(Math.ceil(D),c-1),M=S+L*a[1],B=S+U*a[1],$=D-L,x=1-$;for(let A=0;A<p;A++){const O=A*_,F=Math.floor(O),P=Math.min(Math.ceil(O),u-1),V=O-F,z=1-V,W=M+F*a[2],G=M+P*a[2],H=B+F*a[2],j=B+P*a[2],K=x*z,Y=x*V,Q=$*z,tt=$*V;for(let et=0;et<f;et++){const st=w[N++];d[W+et]+=st*K,d[G+et]+=st*Y,d[H+et]+=st*Q,d[j+et]+=st*tt}}}}return n.makeTensorInfo([l,u,c,f],"float32",d)}const _N={kernelName:Qh,backendName:"cpu",kernelFunc:bN};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function wN(e){const{inputs:t,backend:n,attrs:s}=e,{images:r}=t,{alignCorners:o,halfPixelCenters:i,size:a}=s;J(r,"resizeNearestNeighbor");const l=nt(r.shape),[c,u]=a,[f,h,p,d]=r.shape,y=n.data.get(r.dataId).values,m=new Float32Array(f*c*u*d),b=[o&&c>1?h-1:h,o&&u>1?p-1:p],_=[o&&c>1?c-1:c,o&&u>1?u-1:u],w=b[0]/_[0],N=b[1]/_[1];let I=0;for(let S=0;S<f;S++){const E=S*l[0];for(let D=0;D<c;D++){const L=i?w*(D+.5):w*D;let U=Math.min(h-1,o?Math.round(L):Math.floor(L));i&&(U=Math.max(0,U));const M=E+U*l[1];for(let B=0;B<u;B++){const $=i?N*(B+.5):N*B;let x=Math.min(p-1,o?Math.round($):Math.floor($));i&&(x=Math.max(0,x));const A=M+x*l[2];for(let O=0;O<d;O++){const F=y[A+O];m[I++]=F}}}}return n.makeTensorInfo([f,c,u,d],r.dtype,m)}const NN={kernelName:Tu,backendName:"cpu",kernelFunc:wN};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function IN(e){const{inputs:t,backend:n,attrs:s}=e,{images:r,dy:o}=t,{alignCorners:i}=s;J([o,r],"resizeNearestNeighborGrad");const a=nt(r.shape),l=nt(o.shape),[c,u,f,h]=r.shape,[,p,d]=o.shape,y=new Float32Array(c*u*f*h),m=n.data.get(o.dataId).values,b=[i&&p>1?u-1:u,i&&d>1?f-1:f],_=[i&&p>1?p-1:p,i&&d>1?d-1:d],w=b[0]/_[0],N=b[1]/_[1],I=1/w,S=1/N,E=Math.ceil(I)*2+2,D=Math.ceil(S)*2+2;for(let L=0;L<c;L++){const U=L*a[0];for(let M=0;M<u;M++){const B=U+M*a[1],$=Math.floor(M*I),x=Math.floor($-E/2);for(let A=0;A<f;A++){const O=B+A*a[2],F=Math.floor(A*S),P=Math.floor(F-D/2);for(let V=0;V<h;V++){let z=0;for(let W=0;W<E;W++){const G=W+x;if(G<0||G>=p)continue;const H=U+G*l[1],j=G*w,K=Math.min(u-1,i?Math.round(j):Math.floor(j));if(M===K)for(let Y=0;Y<D;Y++){const Q=Y+P;if(Q<0||Q>=d)continue;const tt=H+Q*l[2],et=Q*N,st=Math.min(f-1,i?Math.round(et):Math.floor(et));A===st&&(z+=m[tt+V])}}y[O+V]=z}}}}return n.makeTensorInfo(r.shape,r.dtype,y)}const kN={kernelName:Jh,backendName:"cpu",kernelFunc:IN};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function SN(e){const{inputs:t,backend:n,attrs:s}=e,{x:r}=t,{dims:o}=s;J(r,"reverse");const i=r.shape.length,a=Bt(o,r.shape);if(i===0)return qe({inputs:{x:r},backend:n});const l=new Ut(r.shape,r.dtype),c=n.bufferSync(r);for(let u=0;u<l.size;u++){const f=l.indexToLoc(u),h=f.slice();a.forEach(p=>h[p]=r.shape[p]-1-h[p]),l.set(c.get(...h),...f)}return n.makeTensorInfo(l.shape,l.dtype,l.values)}const TN={kernelName:vu,backendName:"cpu",kernelFunc:SN};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */const EN={kernelName:Zu,backendName:"cpu",kernelFunc:({inputs:e,attrs:t,backend:n})=>{const{image:s}=e,{radians:r,fillValue:o,center:i}=t,a=n,l=Xt(s.dtype,q(s.shape)),[c,u,f,h]=s.shape,[p,d]=Ry(i,u,f),y=255,m=Math.sin(r),b=Math.cos(r),_=a.data.get(s.dataId).values;for(let N=0;N<c;N++){const I=N*f*u*h;for(let S=0;S<u;S++){const E=S*(f*h);for(let D=0;D<f;D++){const L=D*h;for(let U=0;U<h;U++){const M=[c,S,D,U],B=M[2],$=M[1];let x=(B-p)*b-($-d)*m,A=(B-p)*m+($-d)*b;x=Math.round(x+p),A=Math.round(A+d);let O=o;if(typeof o!="number"&&(U===3?O=y:O=o[U]),x>=0&&x<f&&A>=0&&A<u){const P=A*(f*h),V=x*h,z=I+P+V+U;O=_[z]}const F=I+E+L+U;l[F]=O}}}}return{dataId:a.write(l,s.shape,s.dtype),shape:s.shape,dtype:s.dtype}}};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const vN=pt(ia,e=>{const t=Math.floor(e);return e-t<.5?Math.floor(e):e-t>.5?Math.ceil(e):t%2===0?t:t+1}),xN={kernelName:ia,backendName:"cpu",kernelFunc:vN};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function $N(e){const{inputs:t,backend:n,attrs:s}=e,{indices:r,updates:o}=t,{shape:i}=s,{sliceRank:a,numUpdates:l,sliceSize:c,strides:u,outputSize:f}=D1(o,r,i),h=!0,p=n.bufferSync(r),d=n.bufferSync(o),y=Us(p,d,i,f,c,l,a,u,0,h);return n.makeTensorInfo(i,y.dtype,y.values)}const AN={kernelName:xu,backendName:"cpu",kernelFunc:$N};/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function DN(e,t){let n=0,s=e.length,r=0;for(;n<s;)r=Math.floor((n+s)/2),e[r]<t?n=r+1:s=r;return s}function RN(e,t){let n=0,s=e.length,r=0;for(;n<s;)r=Math.floor((n+s)/2),e[r]<=t?n=r+1:s=r;return s}function ON(e,t,n,s,r,o){const i=Ht("int32",n*r);for(let a=0;a<n;++a){const l=e.slice(a*s,(a+1)*s),c=a*r;for(let u=0;u<r;++u)i[c+u]=o==="left"?DN(l,t[u+c]):RN(l,t[u+c])}return i}/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function LN(e){const{inputs:t,backend:n,attrs:s}=e,{sortedSequence:r,values:o}=t,{side:i}=s,a=n.data.get(r.dataId).values,l=n.data.get(o.dataId).values,c=ON(a,l,r.shape[0],r.shape[1],o.shape[1],i);return n.makeTensorInfo(o.shape,"int32",c)}const FN={kernelName:$u,backendName:"cpu",kernelFunc:LN};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function PN(e){const{inputs:t,backend:n}=e,{condition:s,t:r,e:o}=t;J([s,r,o],"select");const i=s.shape.length,a=n.data.get(s.dataId).values,l=n.data.get(r.dataId).values,c=n.data.get(o.dataId).values,u=Es(r.dtype,o.dtype),f=Yt(q(r.shape),u);let h=0;const p=i===0||i>1||r.shape.length===1?1:q(r.shape.slice(1));for(let d=0;d<a.length;d++)for(let y=0;y<p;y++)a[d]===1?f[h++]=l[d]:f[h++]=c[d];return n.makeTensorInfo(r.shape,u,f)}const UN={kernelName:Au,backendName:"cpu",kernelFunc:PN};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const MN=Fy,VN=Py,BN=pt(la,e=>e>=0?VN*e:MN*(Math.exp(e)-1)),CN={kernelName:la,backendName:"cpu",kernelFunc:BN};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const zN=pt(fa,e=>e<0?-1:e>0?1:0),WN={kernelName:fa,backendName:"cpu",kernelFunc:zN};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const HN=pt(ca,e=>Math.sin(e)),qN={kernelName:ca,backendName:"cpu",kernelFunc:HN};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const GN=pt(ua,e=>Math.sinh(e)),KN={kernelName:ua,backendName:"cpu",kernelFunc:GN};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const jN=11920928955078125e-23,Bl=Math.log(jN)+2,XN=pt(pa,e=>{const t=e>-Bl,n=e<Bl,s=Math.exp(e);let r;return n?r=s:t?r=e:r=Math.log(1+s),r}),YN={kernelName:pa,backendName:"cpu",kernelFunc:XN};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function ZN(e){const{inputs:t,backend:n,attrs:s}=e,{x:r}=t,{blockShape:o,paddings:i}=s;J([r],"spaceToBatchND");const a=q(o),l=[[0,0]];l.push(...i);for(let S=1+o.length;S<r.shape.length;++S)l.push([0,0]);const c=rh.kernelFunc({inputs:{x:r},backend:n,attrs:{paddings:l,constantValue:0}}),u=vf(c.shape,o,a,!1),f=xf(u.length,o.length,!1),h=$f(c.shape,o,a,!1),y=It({inputs:{x:c},backend:n,attrs:{shape:u}}),_=re({inputs:{x:y},backend:n,attrs:{perm:f}}),I=It({inputs:{x:_},backend:n,attrs:{shape:h}});return n.disposeIntermediateTensorInfo(c),n.disposeIntermediateTensorInfo(y),n.disposeIntermediateTensorInfo(_),I}const JN={kernelName:Ou,backendName:"cpu",kernelFunc:ZN};/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function QN(e){const{inputs:t,backend:n}=e,{indices:s,values:r,denseShape:o,defaultValue:i}=t;if(o.shape.length!==1)throw new Error(`Dense shape must be a vector, saw:
        ${o.shape}`);if(s.shape.length!==2)throw new Error(`Indices must be a matrix, saw:
        ${s.shape}`);if(r.shape.length!==1)throw new Error(`Values must be a vector, saw:
        ${r.shape}`);if(i.shape.length!==0)throw new Error(`Default value must be a scalar, saw:
        ${i.shape}`);const a=n.data.get(s.dataId).values,l=n.data.get(r.dataId).values,c=n.data.get(o.dataId).values,u=n.data.get(i.dataId).values[0],[f,h,p,d,y]=pb(a,s.shape,s.dtype,l,r.dtype,c,u);return[n.makeTensorInfo(h,s.dtype,f),n.makeTensorInfo([h[0]],r.dtype,p),n.makeTensorInfo([d.length],"bool",new Uint8Array(d.map(m=>Number(m)))),n.makeTensorInfo([y.length],s.dtype,new Int32Array(y))]}const tI={kernelName:Pu,backendName:"cpu",kernelFunc:QN};/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function eI(e){const{inputs:t,backend:n}=e,{inputIndices:s,inputShape:r,newShape:o}=t;if(s.shape.length!==2)throw new Error(`Input indices should be a matrix but received shape
        ${s.shape}`);if(r.shape.length!==1)throw new Error(`Input shape should be a vector but received shape
        ${r.shape}`);if(o.shape.length!==1)throw new Error(`Target shape should be a vector but received shape ${o.shape}`);const i=Array.from(n.data.get(r.dataId).values),a=n.data.get(s.dataId).values,l=Array.from(n.data.get(o.dataId).values),[c,u,f]=db(a,s.shape,s.dtype,i,l);return[n.makeTensorInfo(u,s.dtype,c),n.makeTensorInfo([f.length],o.dtype,new Int32Array(f))]}const nI={kernelName:Uu,backendName:"cpu",kernelFunc:eI};/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function sI(e){const{inputs:t,backend:n}=e,{data:s,indices:r,segmentIds:o}=t;if(s.shape.length<1)throw new Error("Data should be at least 1 dimensional but received scalar");if(r.shape.length!==1)throw new Error(`Indices should be a vector but received shape
          ${r.shape}`);if(o.shape.length!==1)throw new Error(`Segment ids should be a vector but received shape
          ${o.shape}`);if(r.shape[0]!==o.shape[0])throw new Error("segmentIds and indices should have same size.");const i=n.data.get(s.dataId).values,a=n.data.get(r.dataId).values,l=n.data.get(o.dataId).values,[c,u]=Cf(i,s.shape,s.dtype,a,l,!0);return n.makeTensorInfo(u,s.dtype,c)}const rI={kernelName:Mu,backendName:"cpu",kernelFunc:sI};/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function oI(e){const{inputs:t,backend:n}=e,{data:s,indices:r,segmentIds:o}=t;if(s.shape.length<1)throw new Error("Data should be at least 1 dimensional but received scalar");if(r.shape.length!==1)throw new Error(`Indices should be a vector but received shape
         ${r.shape}`);if(o.shape.length!==1)throw new Error(`Segment ids should be a vector but received shape
         ${o.shape}`);if(r.shape[0]!==o.shape[0])throw new Error("segmentIds and indices should have same size.");const i=n.data.get(s.dataId).values,a=n.data.get(r.dataId).values,l=n.data.get(o.dataId).values,[c,u]=Cf(i,s.shape,s.dtype,a,l);return n.makeTensorInfo(u,s.dtype,c)}const iI={kernelName:Vu,backendName:"cpu",kernelFunc:oI};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function aI(e){const{inputs:t,backend:n,attrs:s}=e,{sparseIndices:r,sparseValues:o,defaultValue:i}=t,{outputShape:a}=s,{sliceRank:l,numUpdates:c,sliceSize:u,strides:f,outputSize:h}=D1(o,r,a),p=!1,d=n.bufferSync(r);let y;switch(o.dtype){case"bool":{const m=n.bufferSync(o),b=!!n.data.get(i.dataId).values[0];y=Us(d,m,a,h,u,c,l,f,b,p);break}case"float32":{const m=n.bufferSync(o),b=n.data.get(i.dataId).values[0];y=Us(d,m,a,h,u,c,l,f,b,p);break}case"int32":{const m=n.bufferSync(o),b=n.data.get(i.dataId).values[0];y=Us(d,m,a,h,u,c,l,f,b,p);break}case"string":{const m=n.bufferSync(o),b=Xs(n.data.get(i.dataId).values[0]);y=Us(d,m,a,h,u,c,l,f,b,p);break}default:throw new Error(`Unsupported type ${o.dtype}`)}return n.makeTensorInfo(a,y.dtype,y.values)}const lI={kernelName:Bu,backendName:"cpu",kernelFunc:aI};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function cI(e){const{inputs:t,backend:n,attrs:s}=e,{x:r}=t,{numOrSizeSplits:o,axis:i}=s,a=Bt(i,r.shape)[0],l=n9(r,o,a),c=new Array(r.shape.length).fill(0),u=r.shape.slice();return l.map(f=>{const h=[...u];h[a]=f;const p=Kn({inputs:{x:r},backend:n,attrs:{begin:c,size:h}});return c[a]+=f,p})}const uI={kernelName:Lu,backendName:"cpu",kernelFunc:cI};/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */const fI={kernelName:tp,backendName:"cpu",kernelFunc:({inputs:e,backend:t})=>{const{x:n}=e,s=t;J(n,"square");const r=s.data.get(n.dataId).values,o=new Float32Array(r.length);for(let a=0;a<r.length;++a){const l=r[a];o[a]=l*l}return{dataId:s.write(o,n.shape,n.dtype),shape:n.shape,dtype:n.dtype}}};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const hI=pt(wa,(e,t)=>{const n=t;return isNaN(e)?NaN:e>0?1:n.alpha}),pI={kernelName:wa,backendName:"cpu",kernelFunc:hI};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function dI(e){const{inputs:t,backend:n,attrs:s}=e,{x:r}=t,{begin:o,end:i,strides:a,beginMask:l,endMask:c,ellipsisMask:u,newAxisMask:f,shrinkAxisMask:h}=s;J(r,"stridedSlice");const{finalShapeSparse:p,finalShape:d,isIdentity:y,sliceDim0:m,isSimpleSlice:b,begin:_,end:w,strides:N}=qd(r.shape,o,i,a,l,c,u,f,h);let I;if(y)I=It({inputs:{x:r},backend:n,attrs:{shape:d}});else if(m||b){T(r.shape.length>=1,()=>`Input must have rank at least 1, got: ${r.shape.length}`);const S=Cd(_,w,N),E=Kn({inputs:{x:r},backend:n,attrs:{begin:_,size:S}});I=It({inputs:{x:E},backend:n,attrs:{shape:d}}),n.disposeIntermediateTensorInfo(E)}else{const S=n.bufferSync(r),E=wb(p,S,N,_);I=n.makeTensorInfo(d,E.dtype,E.values)}return I}const mI={kernelName:Cu,backendName:"cpu",kernelFunc:dI};/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function gI(e){const{inputs:t,backend:n,attrs:s}=e,{separator:r,nGramWidths:o,leftPad:i,rightPad:a,padWidth:l,preserveShortSequences:c}=s,{data:u,dataSplits:f}=t,h=n.data.get(u.dataId).values,p=n.data.get(f.dataId).values,[d,y]=Ib(h,p,r,o,i,a,l,c);return[n.makeTensorInfo([d.length],"string",d),n.makeTensorInfo(f.shape,"int32",y)]}const yI={kernelName:zu,backendName:"cpu",kernelFunc:gI};/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function bI(e){const{inputs:t,backend:n,attrs:s}=e,{skipEmpty:r}=s,{input:o,delimiter:i}=t;if(o.dtype!=="string")throw new Error("Input must be of datatype string");if(o.shape.length!==1)throw new Error(`Input must be a vector, got shape: ${o.shape}`);if(i.shape.length!==0)throw new Error(`Delimiter must be a scalar, got shape: ${i.shape}`);const a=n.data.get(o.dataId).values,l=n.data.get(i.dataId).values[0],[c,u,f]=Sb(a,l,r),h=u.length;return[n.makeTensorInfo([h,2],"int32",c),n.makeTensorInfo([h],"string",u),n.makeTensorInfo([2],"int32",new Int32Array(f))]}const _I={kernelName:Wu,backendName:"cpu",kernelFunc:bI};/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function wI(e){const{inputs:t,backend:n,attrs:s}=e,{numBuckets:r}=s,{input:o}=t;if(o.dtype!=="string")throw new Error("Input must be of datatype string");if(r<=0)throw new Error("Number of buckets must be at least 1");const i=n.data.get(o.dataId).values,a=Tb(i,r);return n.makeTensorInfo(o.shape,"int32",a)}const NI={kernelName:Hu,backendName:"cpu",kernelFunc:wI};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const II=pt(ya,e=>Math.tan(e)),kI={kernelName:ya,backendName:"cpu",kernelFunc:II};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const SI=pt(ba,e=>Math.tanh(e)),TI={kernelName:ba,backendName:"cpu",kernelFunc:SI};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function EI(e){const{inputs:t,backend:n,attrs:s}=e,{x:r}=t,{reps:o}=s;J(r,"tile");const i=$b(n.bufferSync(r),o);return n.makeTensorInfo(i.shape,i.dtype,i.values)}const vI={kernelName:_a,backendName:"cpu",kernelFunc:EI};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function xI(e){const{inputs:t,backend:n,attrs:s}=e,{x:r}=t,{k:o,sorted:i}=s;J(r,"topk");const a=n.data.get(r.dataId).values,[l,c]=Ab(a,r.shape,r.dtype,o,i);return[n.makeTensorInfo(l.shape,l.dtype,l.values),n.makeTensorInfo(c.shape,c.dtype,c.values)]}const $I={kernelName:qu,backendName:"cpu",kernelFunc:xI};/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function AI(e){const{inputs:t,attrs:n,backend:s}=e,{image:r,transforms:o}=t,{interpolation:i,fillMode:a,fillValue:l,outputShape:c}=n,[u,f,h,p]=r.shape,[d,y]=c??[f,h],m=[u,d,y,p],b=nt(r.shape),_=b[0],w=b[1],N=b[2],I=nt(m),S=I[0],E=I[1],D=I[2],L=Xt(r.dtype,q(m));L.fill(l);const U=s.data.get(r.dataId).values,M=s.data.get(o.dataId).values;for(let $=0;$<u;++$){const x=o.shape[0]===1?M:M.subarray($*8,$*8+8);for(let A=0;A<d;++A)for(let O=0;O<y;++O)for(let F=0;F<p;++F){let P;const V=x[6]*O+x[7]*A+1;if(V===0)continue;const z=(x[0]*O+x[1]*A+x[2])/V,W=(x[3]*O+x[4]*A+x[5])/V,G=Cl(z,h,a),H=Cl(W,f,a);switch(i){case"nearest":P=PI(U,f,h,_,w,N,$,H,G,F,l);break;case"bilinear":P=UI(U,f,h,_,w,N,$,H,G,F,l);break;default:throw new Error(`Error in Transform: Expect 'nearest' or 'bilinear', but got ${i}`)}const j=$*S+A*E+O*D+F;L[j]=P}return s.makeTensorInfo(m,r.dtype,L)}return{dataId:s.write(L,m,r.dtype),shape:r.shape,dtype:r.dtype}}const DI={kernelName:Gu,backendName:"cpu",kernelFunc:AI};function Cl(e,t,n){switch(n){case"reflect":return RI(e,t);case"wrap":return OI(e,t);case"nearest":return FI(e,t);case"constant":default:return LI(e)}}function RI(e,t){let n=e;if(n<0)if(t<=1)n=0;else{const s=2*t;n<s&&(n=s*Math.trunc(-n/s)+n),n=n<-t?n+s:-n-1}else if(n>t-1)if(t<=1)n=0;else{const s=2*t;n-=s*Math.trunc(n/s),n>=t&&(n=s-n-1)}return mi(0,n,t-1)}function OI(e,t){let n=e;if(n<0)if(t<=1)n=0;else{const s=t-1;n+=t*(Math.trunc(-n/s)+1)}else if(n>t-1)if(t<=1)n=0;else{const s=t-1;n-=t*Math.trunc(n/s)}return mi(0,n,t-1)}function LI(e,t){return e}function FI(e,t){return mi(0,e,t-1)}function Vs(e,t,n,s,r,o,i,a,l,c,u){const f=i*s+a*r+l*o+c;return 0<=a&&a<t&&0<=l&&l<n?e[f]:u}function PI(e,t,n,s,r,o,i,a,l,c,u){const f=Math.round(a),h=Math.round(l);return Vs(e,t,n,s,r,o,i,f,h,c,u)}function UI(e,t,n,s,r,o,i,a,l,c,u){const f=Math.floor(a),h=Math.floor(l),p=f+1,d=h+1,y=(d-l)*Vs(e,t,n,s,r,o,i,f,h,c,u)+(l-h)*Vs(e,t,n,s,r,o,i,f,d,c,u),m=(d-l)*Vs(e,t,n,s,r,o,i,p,h,c,u)+(l-h)*Vs(e,t,n,s,r,o,i,p,d,c,u);return(p-a)*y+(a-f)*m}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function MI(e){const{inputs:t,attrs:n,backend:s}=e,{axis:r}=n,{x:o}=t;J(o,"unique");const i=s.data.get(o.dataId).values,{outputValues:a,outputShape:l,indices:c}=Db(i,r,o.shape,o.dtype);return[s.makeTensorInfo(l,o.dtype,a),s.makeTensorInfo([c.length],"int32",c)]}const VI={kernelName:Ku,backendName:"cpu",kernelFunc:MI};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function BI(e){const{inputs:t,backend:n,attrs:s}=e,{value:r}=t;let{axis:o}=s;o<0&&(o+=r.shape.length);const i=r.shape.length,a=r.shape[o],l=new Array(i-1);let c=0;for(let p=0;p<i;p++)p!==o&&(l[c++]=r.shape[p]);const u=new Array(i).fill(0),f=r.shape.slice();f[o]=1;const h=new Array(a);for(let p=0;p<h.length;p++){u[o]=p;const d=Kn({inputs:{x:r},backend:n,attrs:{begin:u,size:f}});h[p]=It({inputs:{x:d},backend:n,attrs:{shape:l}}),n.disposeIntermediateTensorInfo(d)}return h}const CI={kernelName:ju,backendName:"cpu",kernelFunc:BI};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */function zI(e){const{inputs:t,backend:n,attrs:s}=e,{x:r,segmentIds:o}=t,{numSegments:i}=s;J(r,"unsortedSegmentSum");const a=r.shape.length,l=o.shape.length,c=[],u=[],f=a-l;let h=o;for(let d=0;d<f;++d){const y=Ur({inputs:{input:h},backend:n,attrs:{dim:d+1}});h=y,u.push(y)}for(let d=0;d<i;++d){const y=Ia(d,"int32"),m=n.makeTensorInfo([],"int32",y),b=Pf({inputs:{a:m,b:h},backend:n}),_=In({inputs:{x:b},backend:n,attrs:{dtype:"float32"}}),w=fo({inputs:{a:_,b:r},backend:n}),N=rr({inputs:{x:w},backend:n,attrs:{axis:0,keepDims:!1}});c.push(N),u.push(m),u.push(b),u.push(_),u.push(w),u.push(N)}const p=sh({inputs:c,backend:n,attrs:{axis:0}});return u.forEach(d=>n.disposeIntermediateTensorInfo(d)),p}const WI={kernelName:Xu,backendName:"cpu",kernelFunc:zI};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 * =============================================================================
 */const HI=[Cb,q3,Wb,qb,Q3,Kb,Xb,Zb,Qb,e6,s6,o6,a6,u6,h6,m6,y6,_6,N6,Vb,k6,T6,v6,$6,Y3,s8,D6,G3,O6,F6,P6,M6,B6,z6,H6,G6,j6,Y6,J6,t_,n_,r_,i_,a_,c_,f_,p_,d_,m_,g_,__,Rb,N_,i8,$_,l8,A_,f8,P_,U_,V_,d8,z_,H_,G_,j_,Y_,_8,I8,K3,J_,L6,tw,nw,rw,Ob,T8,x8,iw,R8,lw,fw,pw,gw,bw,ww,Nw,P8,kw,Tw,vw,$w,Dw,Ow,Fw,V8,Uw,Bw,Ww,C8,H8,Gw,Xw,Jw,K8,tN,nN,sN,rh,aN,Fb,Z8,cN,fN,pN,j3,ri,mN,Pb,Ub,Mb,yN,_N,NN,kN,TN,EN,xN,cb,AN,FN,UN,CN,ub,WN,qN,KN,hb,Cw,YN,JN,tI,nI,rI,iI,lI,uI,gb,fI,_b,pI,mI,yI,_I,NI,xb,y_,kI,TI,vI,$I,DI,j8,VI,CI,WI,eN];for(const e of HI)np(e);var qI=function(){function e(t,n){this.modelJSON=t,this.weights=n}return e.prototype.load=function(){return Dn(this,void 0,void 0,function(){var t,n,s=this;return Rn(this,function(r){if(t=this.modelJSON.modelTopology,n=this.modelJSON.weightsManifest,t===null&&n===null)throw new Error("The model contains neither model topology or manifest for weights.");return[2,this.getModelArtifactsForJSON(this.modelJSON,function(o){return s.loadWeights(o)})]})})},e.prototype.getModelArtifactsForJSON=function(t,n){return Dn(this,void 0,void 0,function(){var s,r,o,i;return Rn(this,function(a){switch(a.label){case 0:return s={modelTopology:t.modelTopology,format:t.format,generatedBy:t.generatedBy,convertedBy:t.convertedBy},t.trainingConfig!==null&&(s.trainingConfig=t.trainingConfig),t.weightsManifest===null?[3,2]:[4,n(t.weightsManifest)];case 1:r=a.sent(),o=r[0],i=r[1],s.weightSpecs=o,s.weightData=i,a.label=2;case 2:return t.signature!==null&&(s.signature=t.signature),t.userDefinedMetadata!==null&&(s.userDefinedMetadata=t.userDefinedMetadata),t.modelInitializer!==null&&(s.modelInitializer=t.modelInitializer),[2,s]}})})},e.prototype.loadWeights=function(t){return Dn(this,void 0,void 0,function(){var n,s,r,o;return Rn(this,function(i){for(n=[],s=0,r=t;s<r.length;s++)o=r[s],n.push.apply(n,o.weights);return[2,[n,this.weights]]})})},e}(),GI=function(){function e(t){var n,s,r;this._modelJsonLoaderFunc=t?.modelJsonLoaderFunc,this._weightsLoaderFunc=t?.weightsLoaderFunc,this._minContentSize=(n=t?.minContentSize)!==null&&n!==void 0?n:e.DEFAULT_MIN_CONTENT_SIZE,this._maxContentSize=(s=t?.maxContentSize)!==null&&s!==void 0?s:e.DEFAULT_MAX_CONTENT_SIZE,this._normalizeNewline=(r=t?.normalizeNewline)!==null&&r!==void 0?r:!0}return e.prototype.getModelJSON=function(){return Dn(this,void 0,void 0,function(){var t;return Rn(this,function(n){switch(n.label){case 0:return this._modelJson?[2,this._modelJson]:(t=this,[4,this._modelJsonLoaderFunc()]);case 1:return t._modelJson=n.sent(),[2,this._modelJson]}})})},e.prototype.getWeights=function(){return Dn(this,void 0,void 0,function(){var t;return Rn(this,function(n){switch(n.label){case 0:return this._weights?[2,this._weights]:(t=this,[4,this._weightsLoaderFunc()]);case 1:return t._weights=n.sent(),[2,this._weights]}})})},e.prototype.loadModel=function(){return Dn(this,void 0,void 0,function(){var t,n,s,r;return Rn(this,function(o){switch(o.label){case 0:return this._model?[2]:(t=lt(),t.set("IS_NODE",!1),t.set("PROD",!0),[4,xd("cpu")]);case 1:if(!o.sent())throw new Error("Unable to set backend to CPU.");return[4,this.getModelJSON()];case 2:return n=o.sent(),[4,this.getWeights()];case 3:return s=o.sent(),r=this,[4,B3(new qI(n,s))];case 4:return r._model=o.sent(),[2]}})})},e.prototype.runModel=function(t){return Dn(this,void 0,void 0,function(){var n,s,r,o,i,a,c,l,c;return Rn(this,function(u){switch(u.label){case 0:return!t||t.length<this._minContentSize?[2,[]]:[4,this.loadModel()];case 1:return u.sent(),t.length>=this._maxContentSize&&(t=t.substring(0,this._maxContentSize)),this._normalizeNewline&&(t=t.replace(/\r\n/g,`
`)),[4,this._model.executeAsync(Re([t]))];case 2:for(n=u.sent(),s=Array.isArray(n)?n[0]:n,r=Array.isArray(n)?n[1]:n,o=s.dataSync(),i=r.dataSync(),a=[],c=0;c<i.length;c++)a.push({languageId:i[c],confidence:o[c]});for(l=0,c=0;c<o.length;c++)o[c]>o[l]&&(l=c);return[2,a.sort(function(f,h){return h.confidence-f.confidence})]}})})},e.prototype.dispose=function(){var t;(t=this._model)===null||t===void 0||t.dispose()},e.DEFAULT_MAX_CONTENT_SIZE=1e5,e.DEFAULT_MIN_CONTENT_SIZE=20,e}();const KI=globalThis.performance.now.bind(globalThis.performance);class ho{static create(t){return new ho(t)}constructor(t){this._now=t===!1?Date.now:KI,this._startTime=this._now(),this._stopTime=-1}stop(){this._stopTime=this._now()}reset(){this._startTime=this._now(),this._stopTime=-1}elapsed(){return this._stopTime!==-1?this._stopTime-this._startTime:this._now()-this._startTime}}class Vr{static{this.CHANNEL_NAME="languageDetectionWorkerHost"}static getChannel(t){return t.getChannel(Vr.CHANNEL_NAME)}static setChannel(t,n){t.setChannel(Vr.CHANNEL_NAME,n)}}function jI(e,t){const n=Object.create(null);for(const s of e){const r=t(s);let o=n[r];o||(o=n[r]=[]),o.push(s)}return n}class XI{constructor(){this.listeners=[],this.unexpectedErrorHandler=function(t){setTimeout(()=>{throw t.stack?Is.isErrorNoTelemetry(t)?new Is(t.message+`

`+t.stack):new Error(t.message+`

`+t.stack):t},0)}}addListener(t){return this.listeners.push(t),()=>{this._removeListener(t)}}emit(t){this.listeners.forEach(n=>{n(t)})}_removeListener(t){this.listeners.splice(this.listeners.indexOf(t),1)}setUnexpectedErrorHandler(t){this.unexpectedErrorHandler=t}getUnexpectedErrorHandler(){return this.unexpectedErrorHandler}onUnexpectedError(t){this.unexpectedErrorHandler(t),this.emit(t)}onUnexpectedExternalError(t){this.unexpectedErrorHandler(t)}}const YI=new XI;function gr(e){ZI(e)||YI.onUnexpectedError(e)}function ii(e){if(e instanceof Error){const{name:t,message:n,cause:s}=e,r=e.stacktrace||e.stack;return{$isError:!0,name:t,message:n,stack:r,noTelemetry:Is.isErrorNoTelemetry(e),cause:s?ii(s):void 0,code:e.code}}return e}const ai="Canceled";function ZI(e){return e instanceof JI?!0:e instanceof Error&&e.name===ai&&e.message===ai}class JI extends Error{constructor(){super(ai),this.name=this.message}}class Is extends Error{constructor(t){super(t),this.name="CodeExpectedError"}static fromError(t){if(t instanceof Is)return t;const n=new Is;return n.message=t.message,n.stack=t.stack,n}static isErrorNoTelemetry(t){return t.name==="CodeExpectedError"}}function QI(e,t){const n=this;let s=!1,r;return function(){return s||(s=!0,r=e.apply(n,arguments)),r}}var li;(function(e){function t(o){return o<0}e.isLessThan=t;function n(o){return o<=0}e.isLessThanOrEqual=n;function s(o){return o>0}e.isGreaterThan=s;function r(o){return o===0}e.isNeitherLessOrGreaterThan=r,e.greaterThan=1,e.lessThan=-1,e.neitherLessOrGreaterThan=0})(li||(li={}));function tk(e,t){return(n,s)=>t(e(n),e(s))}const ek=(e,t)=>e-t;class yr{static{this.empty=new yr(t=>{})}constructor(t){this.iterate=t}forEach(t){this.iterate(n=>(t(n),!0))}toArray(){const t=[];return this.iterate(n=>(t.push(n),!0)),t}filter(t){return new yr(n=>this.iterate(s=>t(s)?n(s):!0))}map(t){return new yr(n=>this.iterate(s=>n(t(s))))}some(t){let n=!1;return this.iterate(s=>(n=t(s),!n)),n}findFirst(t){let n;return this.iterate(s=>t(s)?(n=s,!1):!0),n}findLast(t){let n;return this.iterate(s=>(t(s)&&(n=s),!0)),n}findLastMaxBy(t){let n,s=!0;return this.iterate(r=>((s||li.isGreaterThan(t(r,n)))&&(s=!1,n=r),!0)),n}}var zl;class nk{constructor(t,n){this.uri=t,this.value=n}}function sk(e){return Array.isArray(e)}class os{static{this.defaultToKey=t=>t.toString()}constructor(t,n){if(this[zl]="ResourceMap",t instanceof os)this.map=new Map(t.map),this.toKey=n??os.defaultToKey;else if(sk(t)){this.map=new Map,this.toKey=n??os.defaultToKey;for(const[s,r]of t)this.set(s,r)}else this.map=new Map,this.toKey=t??os.defaultToKey}set(t,n){return this.map.set(this.toKey(t),new nk(t,n)),this}get(t){return this.map.get(this.toKey(t))?.value}has(t){return this.map.has(this.toKey(t))}get size(){return this.map.size}clear(){this.map.clear()}delete(t){return this.map.delete(this.toKey(t))}forEach(t,n){typeof n<"u"&&(t=t.bind(n));for(const[s,r]of this.map)t(r.value,r.uri,this)}*values(){for(const t of this.map.values())yield t.value}*keys(){for(const t of this.map.values())yield t.uri}*entries(){for(const t of this.map.values())yield[t.uri,t.value]}*[(zl=Symbol.toStringTag,Symbol.iterator)](){for(const[,t]of this.map)yield[t.uri,t.value]}}var Wl;(function(e){e[e.None=0]="None",e[e.AsOld=1]="AsOld",e[e.AsNew=2]="AsNew"})(Wl||(Wl={}));class rk{constructor(){this.map=new Map}add(t,n){let s=this.map.get(t);s||(s=new Set,this.map.set(t,s)),s.add(n)}delete(t,n){const s=this.map.get(t);s&&(s.delete(n),s.size===0&&this.map.delete(t))}forEach(t,n){const s=this.map.get(t);s&&s.forEach(n)}get(t){const n=this.map.get(t);return n||new Set}}function ok(e){return!!e&&typeof e[Symbol.iterator]=="function"}var Br;(function(e){function t(I){return I&&typeof I=="object"&&typeof I[Symbol.iterator]=="function"}e.is=t;const n=Object.freeze([]);function s(){return n}e.empty=s;function*r(I){yield I}e.single=r;function o(I){return t(I)?I:r(I)}e.wrap=o;function i(I){return I||n}e.from=i;function*a(I){for(let S=I.length-1;S>=0;S--)yield I[S]}e.reverse=a;function l(I){return!I||I[Symbol.iterator]().next().done===!0}e.isEmpty=l;function c(I){return I[Symbol.iterator]().next().value}e.first=c;function u(I,S){let E=0;for(const D of I)if(S(D,E++))return!0;return!1}e.some=u;function f(I,S){for(const E of I)if(S(E))return E}e.find=f;function*h(I,S){for(const E of I)S(E)&&(yield E)}e.filter=h;function*p(I,S){let E=0;for(const D of I)yield S(D,E++)}e.map=p;function*d(I,S){let E=0;for(const D of I)yield*S(D,E++)}e.flatMap=d;function*y(...I){for(const S of I)ok(S)?yield*S:yield S}e.concat=y;function m(I,S,E){let D=E;for(const L of I)D=S(D,L);return D}e.reduce=m;function b(I){let S=0;for(const E of I)S++;return S}e.length=b;function*_(I,S,E=I.length){for(S<-I.length&&(S=0),S<0&&(S+=I.length),E<0?E+=I.length:E>I.length&&(E=I.length);S<E;S++)yield I[S]}e.slice=_;function w(I,S=Number.POSITIVE_INFINITY){const E=[];if(S===0)return[E,I];const D=I[Symbol.iterator]();for(let L=0;L<S;L++){const U=D.next();if(U.done)return[E,e.empty()];E.push(U.value)}return[E,{[Symbol.iterator](){return D}}]}e.consume=w;async function N(I){const S=[];for await(const E of I)S.push(E);return Promise.resolve(S)}e.asyncToArray=N})(Br||(Br={}));class oh{constructor(){this.livingDisposables=new Map}static{this.idx=0}getDisposableData(t){let n=this.livingDisposables.get(t);return n||(n={parent:null,source:null,isSingleton:!1,value:t,idx:oh.idx++},this.livingDisposables.set(t,n)),n}trackDisposable(t){const n=this.getDisposableData(t);n.source||(n.source=new Error().stack)}setParent(t,n){const s=this.getDisposableData(t);s.parent=n}markAsDisposed(t){this.livingDisposables.delete(t)}markAsSingleton(t){this.getDisposableData(t).isSingleton=!0}getRootParent(t,n){const s=n.get(t);if(s)return s;const r=t.parent?this.getRootParent(this.getDisposableData(t.parent),n):t;return n.set(t,r),r}getTrackedDisposables(){const t=new Map;return[...this.livingDisposables.entries()].filter(([,s])=>s.source!==null&&!this.getRootParent(s,t).isSingleton).flatMap(([s])=>s)}computeLeakingDisposables(t=10,n){let s;if(n)s=n;else{const l=new Map,c=[...this.livingDisposables.values()].filter(f=>f.source!==null&&!this.getRootParent(f,l).isSingleton);if(c.length===0)return;const u=new Set(c.map(f=>f.value));if(s=c.filter(f=>!(f.parent&&u.has(f.parent))),s.length===0)throw new Error("There are cyclic diposable chains!")}if(!s)return;function r(l){function c(f,h){for(;f.length>0&&h.some(p=>typeof p=="string"?p===f[0]:f[0].match(p));)f.shift()}const u=l.source.split(`
`).map(f=>f.trim().replace("at ","")).filter(f=>f!=="");return c(u,["Error",/^trackDisposable \(.*\)$/,/^DisposableTracker.trackDisposable \(.*\)$/]),u.reverse()}const o=new rk;for(const l of s){const c=r(l);for(let u=0;u<=c.length;u++)o.add(c.slice(0,u).join(`
`),l)}s.sort(tk(l=>l.idx,ek));let i="",a=0;for(const l of s.slice(0,t)){a++;const c=r(l),u=[];for(let f=0;f<c.length;f++){let h=c[f];h=`(shared with ${o.get(c.slice(0,f+1).join(`
`)).size}/${s.length} leaks) at ${h}`;const d=o.get(c.slice(0,f).join(`
`)),y=jI([...d].map(m=>r(m)[f]),m=>m);delete y[c[f]];for(const[m,b]of Object.entries(y))u.unshift(`    - stacktraces of ${b.length} other leaks continue with ${m}`);u.unshift(h)}i+=`


==================== Leaking disposable ${a}/${s.length}: ${l.value.constructor.name} ====================
${u.join(`
`)}
============================================================

`}return s.length>t&&(i+=`


... and ${s.length-t} more leaking disposables

`),{leaks:s,details:i}}}function ih(e){if(Br.is(e)){const t=[];for(const n of e)if(n)try{n.dispose()}catch(s){t.push(s)}if(t.length===1)throw t[0];if(t.length>1)throw new AggregateError(t,"Encountered errors while disposing of store");return Array.isArray(e)?[]:e}else if(e)return e.dispose(),e}function ik(...e){return Ya(()=>ih(e))}function Ya(e){return{dispose:QI(()=>{e()})}}class or{static{this.DISABLE_DISPOSED_WARNING=!1}constructor(){this._toDispose=new Set,this._isDisposed=!1}dispose(){this._isDisposed||(this._isDisposed=!0,this.clear())}get isDisposed(){return this._isDisposed}clear(){if(this._toDispose.size!==0)try{ih(this._toDispose)}finally{this._toDispose.clear()}}add(t){if(!t)return t;if(t===this)throw new Error("Cannot register a disposable on itself!");return this._isDisposed?or.DISABLE_DISPOSED_WARNING||console.warn(new Error("Trying to add a disposable to a DisposableStore that has already been disposed of. The added object will be leaked!").stack):this._toDispose.add(t),t}delete(t){if(t){if(t===this)throw new Error("Cannot dispose a disposable on itself!");this._toDispose.delete(t),t.dispose()}}deleteAndLeak(t){t&&this._toDispose.has(t)&&this._toDispose.delete(t)}}class ci{static{this.None=Object.freeze({dispose(){}})}constructor(){this._store=new or,this._store}dispose(){this._store.dispose()}_register(t){if(t===this)throw new Error("Cannot register a disposable on itself!");return this._store.add(t)}}class bt{static{this.Undefined=new bt(void 0)}constructor(t){this.element=t,this.next=bt.Undefined,this.prev=bt.Undefined}}class ak{constructor(){this._first=bt.Undefined,this._last=bt.Undefined,this._size=0}get size(){return this._size}isEmpty(){return this._first===bt.Undefined}clear(){let t=this._first;for(;t!==bt.Undefined;){const n=t.next;t.prev=bt.Undefined,t.next=bt.Undefined,t=n}this._first=bt.Undefined,this._last=bt.Undefined,this._size=0}unshift(t){return this._insert(t,!1)}push(t){return this._insert(t,!0)}_insert(t,n){const s=new bt(t);if(this._first===bt.Undefined)this._first=s,this._last=s;else if(n){const o=this._last;this._last=s,s.prev=o,o.next=s}else{const o=this._first;this._first=s,s.next=o,o.prev=s}this._size+=1;let r=!1;return()=>{r||(r=!0,this._remove(s))}}shift(){if(this._first!==bt.Undefined){const t=this._first.element;return this._remove(this._first),t}}pop(){if(this._last!==bt.Undefined){const t=this._last.element;return this._remove(this._last),t}}_remove(t){if(t.prev!==bt.Undefined&&t.next!==bt.Undefined){const n=t.prev;n.next=t.next,t.next.prev=n}else t.prev===bt.Undefined&&t.next===bt.Undefined?(this._first=bt.Undefined,this._last=bt.Undefined):t.next===bt.Undefined?(this._last=this._last.prev,this._last.next=bt.Undefined):t.prev===bt.Undefined&&(this._first=this._first.next,this._first.prev=bt.Undefined);this._size-=1}*[Symbol.iterator](){let t=this._first;for(;t!==bt.Undefined;)yield t.element,t=t.next}}var Cr;(function(e){e.None=()=>ci.None;function t($,x){return h($,()=>{},0,void 0,!0,void 0,x)}e.defer=t;function n($){return(x,A=null,O)=>{let F=!1,P;return P=$(V=>{if(!F)return P?P.dispose():F=!0,x.call(A,V)},null,O),F&&P.dispose(),P}}e.once=n;function s($,x){return e.once(e.filter($,x))}e.onceIf=s;function r($,x,A){return u((O,F=null,P)=>$(V=>O.call(F,x(V)),null,P),A)}e.map=r;function o($,x,A){return u((O,F=null,P)=>$(V=>{x(V),O.call(F,V)},null,P),A)}e.forEach=o;function i($,x,A){return u((O,F=null,P)=>$(V=>x(V)&&O.call(F,V),null,P),A)}e.filter=i;function a($){return $}e.signal=a;function l(...$){return(x,A=null,O)=>{const F=ik(...$.map(P=>P(V=>x.call(A,V))));return f(F,O)}}e.any=l;function c($,x,A,O){let F=A;return r($,P=>(F=x(F,P),F),O)}e.reduce=c;function u($,x){let A;const O={onWillAddFirstListener(){A=$(F.fire,F)},onDidRemoveLastListener(){A?.dispose()}},F=new Be(O);return x?.add(F),F.event}function f($,x){return x instanceof Array?x.push($):x&&x.add($),$}function h($,x,A=100,O=!1,F=!1,P,V){let z,W,G,H=0,j;const K={leakWarningThreshold:P,onWillAddFirstListener(){z=$(Q=>{H++,W=x(W,Q),O&&!G&&(Y.fire(W),W=void 0),j=()=>{const tt=W;W=void 0,G=void 0,(!O||H>1)&&Y.fire(tt),H=0},typeof A=="number"?(clearTimeout(G),G=setTimeout(j,A)):G===void 0&&(G=0,queueMicrotask(j))})},onWillRemoveListener(){F&&H>0&&j?.()},onDidRemoveLastListener(){j=void 0,z.dispose()}},Y=new Be(K);return V?.add(Y),Y.event}e.debounce=h;function p($,x=0,A){return e.debounce($,(O,F)=>O?(O.push(F),O):[F],x,void 0,!0,void 0,A)}e.accumulate=p;function d($,x=(O,F)=>O===F,A){let O=!0,F;return i($,P=>{const V=O||!x(P,F);return O=!1,F=P,V},A)}e.latch=d;function y($,x,A){return[e.filter($,x,A),e.filter($,O=>!x(O),A)]}e.split=y;function m($,x=!1,A=[],O){let F=A.slice(),P=$(W=>{F?F.push(W):z.fire(W)});O&&O.add(P);const V=()=>{F?.forEach(W=>z.fire(W)),F=null},z=new Be({onWillAddFirstListener(){P||(P=$(W=>z.fire(W)),O&&O.add(P))},onDidAddFirstListener(){F&&(x?setTimeout(V):V())},onDidRemoveLastListener(){P&&P.dispose(),P=null}});return O&&O.add(z),z.event}e.buffer=m;function b($,x){return(O,F,P)=>{const V=x(new w);return $(function(z){const W=V.evaluate(z);W!==_&&O.call(F,W)},void 0,P)}}e.chain=b;const _=Symbol("HaltChainable");class w{constructor(){this.steps=[]}map(x){return this.steps.push(x),this}forEach(x){return this.steps.push(A=>(x(A),A)),this}filter(x){return this.steps.push(A=>x(A)?A:_),this}reduce(x,A){let O=A;return this.steps.push(F=>(O=x(O,F),O)),this}latch(x=(A,O)=>A===O){let A=!0,O;return this.steps.push(F=>{const P=A||!x(F,O);return A=!1,O=F,P?F:_}),this}evaluate(x){for(const A of this.steps)if(x=A(x),x===_)break;return x}}function N($,x,A=O=>O){const O=(...z)=>V.fire(A(...z)),F=()=>$.on(x,O),P=()=>$.removeListener(x,O),V=new Be({onWillAddFirstListener:F,onDidRemoveLastListener:P});return V.event}e.fromNodeEventEmitter=N;function I($,x,A=O=>O){const O=(...z)=>V.fire(A(...z)),F=()=>$.addEventListener(x,O),P=()=>$.removeEventListener(x,O),V=new Be({onWillAddFirstListener:F,onDidRemoveLastListener:P});return V.event}e.fromDOMEventEmitter=I;function S($,x){return new Promise(A=>n($)(A,null,x))}e.toPromise=S;function E($){const x=new Be;return $.then(A=>{x.fire(A)},()=>{x.fire(void 0)}).finally(()=>{x.dispose()}),x.event}e.fromPromise=E;function D($,x){return $(A=>x.fire(A))}e.forward=D;function L($,x,A){return x(A),$(O=>x(O))}e.runAndSubscribe=L;class U{constructor(x,A){this._observable=x,this._counter=0,this._hasChanged=!1;const O={onWillAddFirstListener:()=>{x.addObserver(this),this._observable.reportChanges()},onDidRemoveLastListener:()=>{x.removeObserver(this)}};this.emitter=new Be(O),A&&A.add(this.emitter)}beginUpdate(x){this._counter++}handlePossibleChange(x){}handleChange(x,A){this._hasChanged=!0}endUpdate(x){this._counter--,this._counter===0&&(this._observable.reportChanges(),this._hasChanged&&(this._hasChanged=!1,this.emitter.fire(this._observable.get())))}}function M($,x){return new U($,x).emitter.event}e.fromObservable=M;function B($){return(x,A,O)=>{let F=0,P=!1;const V={beginUpdate(){F++},endUpdate(){F--,F===0&&($.reportChanges(),P&&(P=!1,x.call(A)))},handlePossibleChange(){},handleChange(){P=!0}};$.addObserver(V),$.reportChanges();const z={dispose(){$.removeObserver(V)}};return O instanceof or?O.add(z):Array.isArray(O)&&O.push(z),z}}e.fromObservableLight=B})(Cr||(Cr={}));class zr{static{this.all=new Set}static{this._idPool=0}constructor(t){this.listenerCount=0,this.invocationCount=0,this.elapsedOverall=0,this.durations=[],this.name=`${t}_${zr._idPool++}`,zr.all.add(this)}start(t){this._stopWatch=new ho,this.listenerCount=t}stop(){if(this._stopWatch){const t=this._stopWatch.elapsed();this.durations.push(t),this.elapsedOverall+=t,this.invocationCount+=1,this._stopWatch=void 0}}}let lk=-1;class Za{static{this._idPool=1}constructor(t,n,s=(Za._idPool++).toString(16).padStart(3,"0")){this._errorHandler=t,this.threshold=n,this.name=s,this._warnCountdown=0}dispose(){this._stacks?.clear()}check(t,n){const s=this.threshold;if(s<=0||n<s)return;this._stacks||(this._stacks=new Map);const r=this._stacks.get(t.value)||0;if(this._stacks.set(t.value,r+1),this._warnCountdown-=1,this._warnCountdown<=0){this._warnCountdown=s*.5;const[o,i]=this.getMostFrequentStack(),a=`[${this.name}] potential listener LEAK detected, having ${n} listeners already. MOST frequent listener (${i}):`;console.warn(a),console.warn(o);const l=new ck(a,o);this._errorHandler(l)}return()=>{const o=this._stacks.get(t.value)||0;this._stacks.set(t.value,o-1)}}getMostFrequentStack(){if(!this._stacks)return;let t,n=0;for(const[s,r]of this._stacks)(!t||n<r)&&(t=[s,r],n=r);return t}}class Ja{static create(){const t=new Error;return new Ja(t.stack??"")}constructor(t){this.value=t}print(){console.warn(this.value.split(`
`).slice(2).join(`
`))}}class ck extends Error{constructor(t,n){super(t),this.name="ListenerLeakError",this.stack=n}}class uk extends Error{constructor(t,n){super(t),this.name="ListenerRefusalError",this.stack=n}}let fk=0;class ko{constructor(t){this.value=t,this.id=fk++}}const hk=2;class Be{constructor(t){this._size=0,this._options=t,this._leakageMon=this._options?.leakWarningThreshold?new Za(t?.onListenerError??gr,this._options?.leakWarningThreshold??lk):void 0,this._perfMon=this._options?._profName?new zr(this._options._profName):void 0,this._deliveryQueue=this._options?.deliveryQueue}dispose(){this._disposed||(this._disposed=!0,this._deliveryQueue?.current===this&&this._deliveryQueue.reset(),this._listeners&&(this._listeners=void 0,this._size=0),this._options?.onDidRemoveLastListener?.(),this._leakageMon?.dispose())}get event(){return this._event??=(t,n,s)=>{if(this._leakageMon&&this._size>this._leakageMon.threshold**2){const a=`[${this._leakageMon.name}] REFUSES to accept new listeners because it exceeded its threshold by far (${this._size} vs ${this._leakageMon.threshold})`;console.warn(a);const l=this._leakageMon.getMostFrequentStack()??["UNKNOWN stack",-1],c=new uk(`${a}. HINT: Stack shows most frequent listener (${l[1]}-times)`,l[0]);return(this._options?.onListenerError||gr)(c),ci.None}if(this._disposed)return ci.None;n&&(t=t.bind(n));const r=new ko(t);let o;this._leakageMon&&this._size>=Math.ceil(this._leakageMon.threshold*.2)&&(r.stack=Ja.create(),o=this._leakageMon.check(r.stack,this._size+1)),this._listeners?this._listeners instanceof ko?(this._deliveryQueue??=new pk,this._listeners=[this._listeners,r]):this._listeners.push(r):(this._options?.onWillAddFirstListener?.(this),this._listeners=r,this._options?.onDidAddFirstListener?.(this)),this._options?.onDidAddListener?.(this),this._size++;const i=Ya(()=>{o?.(),this._removeListener(r)});return s instanceof or?s.add(i):Array.isArray(s)&&s.push(i),i},this._event}_removeListener(t){if(this._options?.onWillRemoveListener?.(this),!this._listeners)return;if(this._size===1){this._listeners=void 0,this._options?.onDidRemoveLastListener?.(this),this._size=0;return}const n=this._listeners,s=n.indexOf(t);if(s===-1)throw console.log("disposed?",this._disposed),console.log("size?",this._size),console.log("arr?",JSON.stringify(this._listeners)),new Error("Attempted to dispose unknown listener");this._size--,n[s]=void 0;const r=this._deliveryQueue.current===this;if(this._size*hk<=n.length){let o=0;for(let i=0;i<n.length;i++)n[i]?n[o++]=n[i]:r&&o<this._deliveryQueue.end&&(this._deliveryQueue.end--,o<this._deliveryQueue.i&&this._deliveryQueue.i--);n.length=o}}_deliver(t,n){if(!t)return;const s=this._options?.onListenerError||gr;if(!s){t.value(n);return}try{t.value(n)}catch(r){s(r)}}_deliverQueue(t){const n=t.current._listeners;for(;t.i<t.end;)this._deliver(n[t.i++],t.value);t.reset()}fire(t){if(this._deliveryQueue?.current&&(this._deliverQueue(this._deliveryQueue),this._perfMon?.stop()),this._perfMon?.start(this._size),this._listeners)if(this._listeners instanceof ko)this._deliver(this._listeners,t);else{const n=this._deliveryQueue;n.enqueue(this,t,this._listeners.length),this._deliverQueue(n)}this._perfMon?.stop()}hasListeners(){return this._size>0}}class pk{constructor(){this.i=-1,this.end=0}enqueue(t,n,s){this.i=0,this.end=s,this.current=t,this.value=n}reset(){this.i=this.end,this.current=void 0,this.value=void 0}}const ah=Object.freeze(function(e,t){const n=setTimeout(e.bind(t),0);return{dispose(){clearTimeout(n)}}});var Hl;(function(e){function t(n){return n===e.None||n===e.Cancelled||n instanceof dk?!0:!n||typeof n!="object"?!1:typeof n.isCancellationRequested=="boolean"&&typeof n.onCancellationRequested=="function"}e.isCancellationToken=t,e.None=Object.freeze({isCancellationRequested:!1,onCancellationRequested:Cr.None}),e.Cancelled=Object.freeze({isCancellationRequested:!0,onCancellationRequested:ah})})(Hl||(Hl={}));class dk{constructor(){this._isCancelled=!1,this._emitter=null}cancel(){this._isCancelled||(this._isCancelled=!0,this._emitter&&(this._emitter.fire(void 0),this.dispose()))}get isCancellationRequested(){return this._isCancelled}get onCancellationRequested(){return this._isCancelled?ah:(this._emitter||(this._emitter=new Be),this._emitter.event)}dispose(){this._emitter&&(this._emitter.dispose(),this._emitter=null)}}var Z;(function(e){e[e.Null=0]="Null",e[e.Backspace=8]="Backspace",e[e.Tab=9]="Tab",e[e.LineFeed=10]="LineFeed",e[e.CarriageReturn=13]="CarriageReturn",e[e.Space=32]="Space",e[e.ExclamationMark=33]="ExclamationMark",e[e.DoubleQuote=34]="DoubleQuote",e[e.Hash=35]="Hash",e[e.DollarSign=36]="DollarSign",e[e.PercentSign=37]="PercentSign",e[e.Ampersand=38]="Ampersand",e[e.SingleQuote=39]="SingleQuote",e[e.OpenParen=40]="OpenParen",e[e.CloseParen=41]="CloseParen",e[e.Asterisk=42]="Asterisk",e[e.Plus=43]="Plus",e[e.Comma=44]="Comma",e[e.Dash=45]="Dash",e[e.Period=46]="Period",e[e.Slash=47]="Slash",e[e.Digit0=48]="Digit0",e[e.Digit1=49]="Digit1",e[e.Digit2=50]="Digit2",e[e.Digit3=51]="Digit3",e[e.Digit4=52]="Digit4",e[e.Digit5=53]="Digit5",e[e.Digit6=54]="Digit6",e[e.Digit7=55]="Digit7",e[e.Digit8=56]="Digit8",e[e.Digit9=57]="Digit9",e[e.Colon=58]="Colon",e[e.Semicolon=59]="Semicolon",e[e.LessThan=60]="LessThan",e[e.Equals=61]="Equals",e[e.GreaterThan=62]="GreaterThan",e[e.QuestionMark=63]="QuestionMark",e[e.AtSign=64]="AtSign",e[e.A=65]="A",e[e.B=66]="B",e[e.C=67]="C",e[e.D=68]="D",e[e.E=69]="E",e[e.F=70]="F",e[e.G=71]="G",e[e.H=72]="H",e[e.I=73]="I",e[e.J=74]="J",e[e.K=75]="K",e[e.L=76]="L",e[e.M=77]="M",e[e.N=78]="N",e[e.O=79]="O",e[e.P=80]="P",e[e.Q=81]="Q",e[e.R=82]="R",e[e.S=83]="S",e[e.T=84]="T",e[e.U=85]="U",e[e.V=86]="V",e[e.W=87]="W",e[e.X=88]="X",e[e.Y=89]="Y",e[e.Z=90]="Z",e[e.OpenSquareBracket=91]="OpenSquareBracket",e[e.Backslash=92]="Backslash",e[e.CloseSquareBracket=93]="CloseSquareBracket",e[e.Caret=94]="Caret",e[e.Underline=95]="Underline",e[e.BackTick=96]="BackTick",e[e.a=97]="a",e[e.b=98]="b",e[e.c=99]="c",e[e.d=100]="d",e[e.e=101]="e",e[e.f=102]="f",e[e.g=103]="g",e[e.h=104]="h",e[e.i=105]="i",e[e.j=106]="j",e[e.k=107]="k",e[e.l=108]="l",e[e.m=109]="m",e[e.n=110]="n",e[e.o=111]="o",e[e.p=112]="p",e[e.q=113]="q",e[e.r=114]="r",e[e.s=115]="s",e[e.t=116]="t",e[e.u=117]="u",e[e.v=118]="v",e[e.w=119]="w",e[e.x=120]="x",e[e.y=121]="y",e[e.z=122]="z",e[e.OpenCurlyBrace=123]="OpenCurlyBrace",e[e.Pipe=124]="Pipe",e[e.CloseCurlyBrace=125]="CloseCurlyBrace",e[e.Tilde=126]="Tilde",e[e.NoBreakSpace=160]="NoBreakSpace",e[e.U_Combining_Grave_Accent=768]="U_Combining_Grave_Accent",e[e.U_Combining_Acute_Accent=769]="U_Combining_Acute_Accent",e[e.U_Combining_Circumflex_Accent=770]="U_Combining_Circumflex_Accent",e[e.U_Combining_Tilde=771]="U_Combining_Tilde",e[e.U_Combining_Macron=772]="U_Combining_Macron",e[e.U_Combining_Overline=773]="U_Combining_Overline",e[e.U_Combining_Breve=774]="U_Combining_Breve",e[e.U_Combining_Dot_Above=775]="U_Combining_Dot_Above",e[e.U_Combining_Diaeresis=776]="U_Combining_Diaeresis",e[e.U_Combining_Hook_Above=777]="U_Combining_Hook_Above",e[e.U_Combining_Ring_Above=778]="U_Combining_Ring_Above",e[e.U_Combining_Double_Acute_Accent=779]="U_Combining_Double_Acute_Accent",e[e.U_Combining_Caron=780]="U_Combining_Caron",e[e.U_Combining_Vertical_Line_Above=781]="U_Combining_Vertical_Line_Above",e[e.U_Combining_Double_Vertical_Line_Above=782]="U_Combining_Double_Vertical_Line_Above",e[e.U_Combining_Double_Grave_Accent=783]="U_Combining_Double_Grave_Accent",e[e.U_Combining_Candrabindu=784]="U_Combining_Candrabindu",e[e.U_Combining_Inverted_Breve=785]="U_Combining_Inverted_Breve",e[e.U_Combining_Turned_Comma_Above=786]="U_Combining_Turned_Comma_Above",e[e.U_Combining_Comma_Above=787]="U_Combining_Comma_Above",e[e.U_Combining_Reversed_Comma_Above=788]="U_Combining_Reversed_Comma_Above",e[e.U_Combining_Comma_Above_Right=789]="U_Combining_Comma_Above_Right",e[e.U_Combining_Grave_Accent_Below=790]="U_Combining_Grave_Accent_Below",e[e.U_Combining_Acute_Accent_Below=791]="U_Combining_Acute_Accent_Below",e[e.U_Combining_Left_Tack_Below=792]="U_Combining_Left_Tack_Below",e[e.U_Combining_Right_Tack_Below=793]="U_Combining_Right_Tack_Below",e[e.U_Combining_Left_Angle_Above=794]="U_Combining_Left_Angle_Above",e[e.U_Combining_Horn=795]="U_Combining_Horn",e[e.U_Combining_Left_Half_Ring_Below=796]="U_Combining_Left_Half_Ring_Below",e[e.U_Combining_Up_Tack_Below=797]="U_Combining_Up_Tack_Below",e[e.U_Combining_Down_Tack_Below=798]="U_Combining_Down_Tack_Below",e[e.U_Combining_Plus_Sign_Below=799]="U_Combining_Plus_Sign_Below",e[e.U_Combining_Minus_Sign_Below=800]="U_Combining_Minus_Sign_Below",e[e.U_Combining_Palatalized_Hook_Below=801]="U_Combining_Palatalized_Hook_Below",e[e.U_Combining_Retroflex_Hook_Below=802]="U_Combining_Retroflex_Hook_Below",e[e.U_Combining_Dot_Below=803]="U_Combining_Dot_Below",e[e.U_Combining_Diaeresis_Below=804]="U_Combining_Diaeresis_Below",e[e.U_Combining_Ring_Below=805]="U_Combining_Ring_Below",e[e.U_Combining_Comma_Below=806]="U_Combining_Comma_Below",e[e.U_Combining_Cedilla=807]="U_Combining_Cedilla",e[e.U_Combining_Ogonek=808]="U_Combining_Ogonek",e[e.U_Combining_Vertical_Line_Below=809]="U_Combining_Vertical_Line_Below",e[e.U_Combining_Bridge_Below=810]="U_Combining_Bridge_Below",e[e.U_Combining_Inverted_Double_Arch_Below=811]="U_Combining_Inverted_Double_Arch_Below",e[e.U_Combining_Caron_Below=812]="U_Combining_Caron_Below",e[e.U_Combining_Circumflex_Accent_Below=813]="U_Combining_Circumflex_Accent_Below",e[e.U_Combining_Breve_Below=814]="U_Combining_Breve_Below",e[e.U_Combining_Inverted_Breve_Below=815]="U_Combining_Inverted_Breve_Below",e[e.U_Combining_Tilde_Below=816]="U_Combining_Tilde_Below",e[e.U_Combining_Macron_Below=817]="U_Combining_Macron_Below",e[e.U_Combining_Low_Line=818]="U_Combining_Low_Line",e[e.U_Combining_Double_Low_Line=819]="U_Combining_Double_Low_Line",e[e.U_Combining_Tilde_Overlay=820]="U_Combining_Tilde_Overlay",e[e.U_Combining_Short_Stroke_Overlay=821]="U_Combining_Short_Stroke_Overlay",e[e.U_Combining_Long_Stroke_Overlay=822]="U_Combining_Long_Stroke_Overlay",e[e.U_Combining_Short_Solidus_Overlay=823]="U_Combining_Short_Solidus_Overlay",e[e.U_Combining_Long_Solidus_Overlay=824]="U_Combining_Long_Solidus_Overlay",e[e.U_Combining_Right_Half_Ring_Below=825]="U_Combining_Right_Half_Ring_Below",e[e.U_Combining_Inverted_Bridge_Below=826]="U_Combining_Inverted_Bridge_Below",e[e.U_Combining_Square_Below=827]="U_Combining_Square_Below",e[e.U_Combining_Seagull_Below=828]="U_Combining_Seagull_Below",e[e.U_Combining_X_Above=829]="U_Combining_X_Above",e[e.U_Combining_Vertical_Tilde=830]="U_Combining_Vertical_Tilde",e[e.U_Combining_Double_Overline=831]="U_Combining_Double_Overline",e[e.U_Combining_Grave_Tone_Mark=832]="U_Combining_Grave_Tone_Mark",e[e.U_Combining_Acute_Tone_Mark=833]="U_Combining_Acute_Tone_Mark",e[e.U_Combining_Greek_Perispomeni=834]="U_Combining_Greek_Perispomeni",e[e.U_Combining_Greek_Koronis=835]="U_Combining_Greek_Koronis",e[e.U_Combining_Greek_Dialytika_Tonos=836]="U_Combining_Greek_Dialytika_Tonos",e[e.U_Combining_Greek_Ypogegrammeni=837]="U_Combining_Greek_Ypogegrammeni",e[e.U_Combining_Bridge_Above=838]="U_Combining_Bridge_Above",e[e.U_Combining_Equals_Sign_Below=839]="U_Combining_Equals_Sign_Below",e[e.U_Combining_Double_Vertical_Line_Below=840]="U_Combining_Double_Vertical_Line_Below",e[e.U_Combining_Left_Angle_Below=841]="U_Combining_Left_Angle_Below",e[e.U_Combining_Not_Tilde_Above=842]="U_Combining_Not_Tilde_Above",e[e.U_Combining_Homothetic_Above=843]="U_Combining_Homothetic_Above",e[e.U_Combining_Almost_Equal_To_Above=844]="U_Combining_Almost_Equal_To_Above",e[e.U_Combining_Left_Right_Arrow_Below=845]="U_Combining_Left_Right_Arrow_Below",e[e.U_Combining_Upwards_Arrow_Below=846]="U_Combining_Upwards_Arrow_Below",e[e.U_Combining_Grapheme_Joiner=847]="U_Combining_Grapheme_Joiner",e[e.U_Combining_Right_Arrowhead_Above=848]="U_Combining_Right_Arrowhead_Above",e[e.U_Combining_Left_Half_Ring_Above=849]="U_Combining_Left_Half_Ring_Above",e[e.U_Combining_Fermata=850]="U_Combining_Fermata",e[e.U_Combining_X_Below=851]="U_Combining_X_Below",e[e.U_Combining_Left_Arrowhead_Below=852]="U_Combining_Left_Arrowhead_Below",e[e.U_Combining_Right_Arrowhead_Below=853]="U_Combining_Right_Arrowhead_Below",e[e.U_Combining_Right_Arrowhead_And_Up_Arrowhead_Below=854]="U_Combining_Right_Arrowhead_And_Up_Arrowhead_Below",e[e.U_Combining_Right_Half_Ring_Above=855]="U_Combining_Right_Half_Ring_Above",e[e.U_Combining_Dot_Above_Right=856]="U_Combining_Dot_Above_Right",e[e.U_Combining_Asterisk_Below=857]="U_Combining_Asterisk_Below",e[e.U_Combining_Double_Ring_Below=858]="U_Combining_Double_Ring_Below",e[e.U_Combining_Zigzag_Above=859]="U_Combining_Zigzag_Above",e[e.U_Combining_Double_Breve_Below=860]="U_Combining_Double_Breve_Below",e[e.U_Combining_Double_Breve=861]="U_Combining_Double_Breve",e[e.U_Combining_Double_Macron=862]="U_Combining_Double_Macron",e[e.U_Combining_Double_Macron_Below=863]="U_Combining_Double_Macron_Below",e[e.U_Combining_Double_Tilde=864]="U_Combining_Double_Tilde",e[e.U_Combining_Double_Inverted_Breve=865]="U_Combining_Double_Inverted_Breve",e[e.U_Combining_Double_Rightwards_Arrow_Below=866]="U_Combining_Double_Rightwards_Arrow_Below",e[e.U_Combining_Latin_Small_Letter_A=867]="U_Combining_Latin_Small_Letter_A",e[e.U_Combining_Latin_Small_Letter_E=868]="U_Combining_Latin_Small_Letter_E",e[e.U_Combining_Latin_Small_Letter_I=869]="U_Combining_Latin_Small_Letter_I",e[e.U_Combining_Latin_Small_Letter_O=870]="U_Combining_Latin_Small_Letter_O",e[e.U_Combining_Latin_Small_Letter_U=871]="U_Combining_Latin_Small_Letter_U",e[e.U_Combining_Latin_Small_Letter_C=872]="U_Combining_Latin_Small_Letter_C",e[e.U_Combining_Latin_Small_Letter_D=873]="U_Combining_Latin_Small_Letter_D",e[e.U_Combining_Latin_Small_Letter_H=874]="U_Combining_Latin_Small_Letter_H",e[e.U_Combining_Latin_Small_Letter_M=875]="U_Combining_Latin_Small_Letter_M",e[e.U_Combining_Latin_Small_Letter_R=876]="U_Combining_Latin_Small_Letter_R",e[e.U_Combining_Latin_Small_Letter_T=877]="U_Combining_Latin_Small_Letter_T",e[e.U_Combining_Latin_Small_Letter_V=878]="U_Combining_Latin_Small_Letter_V",e[e.U_Combining_Latin_Small_Letter_X=879]="U_Combining_Latin_Small_Letter_X",e[e.LINE_SEPARATOR=8232]="LINE_SEPARATOR",e[e.PARAGRAPH_SEPARATOR=8233]="PARAGRAPH_SEPARATOR",e[e.NEXT_LINE=133]="NEXT_LINE",e[e.U_CIRCUMFLEX=94]="U_CIRCUMFLEX",e[e.U_GRAVE_ACCENT=96]="U_GRAVE_ACCENT",e[e.U_DIAERESIS=168]="U_DIAERESIS",e[e.U_MACRON=175]="U_MACRON",e[e.U_ACUTE_ACCENT=180]="U_ACUTE_ACCENT",e[e.U_CEDILLA=184]="U_CEDILLA",e[e.U_MODIFIER_LETTER_LEFT_ARROWHEAD=706]="U_MODIFIER_LETTER_LEFT_ARROWHEAD",e[e.U_MODIFIER_LETTER_RIGHT_ARROWHEAD=707]="U_MODIFIER_LETTER_RIGHT_ARROWHEAD",e[e.U_MODIFIER_LETTER_UP_ARROWHEAD=708]="U_MODIFIER_LETTER_UP_ARROWHEAD",e[e.U_MODIFIER_LETTER_DOWN_ARROWHEAD=709]="U_MODIFIER_LETTER_DOWN_ARROWHEAD",e[e.U_MODIFIER_LETTER_CENTRED_RIGHT_HALF_RING=722]="U_MODIFIER_LETTER_CENTRED_RIGHT_HALF_RING",e[e.U_MODIFIER_LETTER_CENTRED_LEFT_HALF_RING=723]="U_MODIFIER_LETTER_CENTRED_LEFT_HALF_RING",e[e.U_MODIFIER_LETTER_UP_TACK=724]="U_MODIFIER_LETTER_UP_TACK",e[e.U_MODIFIER_LETTER_DOWN_TACK=725]="U_MODIFIER_LETTER_DOWN_TACK",e[e.U_MODIFIER_LETTER_PLUS_SIGN=726]="U_MODIFIER_LETTER_PLUS_SIGN",e[e.U_MODIFIER_LETTER_MINUS_SIGN=727]="U_MODIFIER_LETTER_MINUS_SIGN",e[e.U_BREVE=728]="U_BREVE",e[e.U_DOT_ABOVE=729]="U_DOT_ABOVE",e[e.U_RING_ABOVE=730]="U_RING_ABOVE",e[e.U_OGONEK=731]="U_OGONEK",e[e.U_SMALL_TILDE=732]="U_SMALL_TILDE",e[e.U_DOUBLE_ACUTE_ACCENT=733]="U_DOUBLE_ACUTE_ACCENT",e[e.U_MODIFIER_LETTER_RHOTIC_HOOK=734]="U_MODIFIER_LETTER_RHOTIC_HOOK",e[e.U_MODIFIER_LETTER_CROSS_ACCENT=735]="U_MODIFIER_LETTER_CROSS_ACCENT",e[e.U_MODIFIER_LETTER_EXTRA_HIGH_TONE_BAR=741]="U_MODIFIER_LETTER_EXTRA_HIGH_TONE_BAR",e[e.U_MODIFIER_LETTER_HIGH_TONE_BAR=742]="U_MODIFIER_LETTER_HIGH_TONE_BAR",e[e.U_MODIFIER_LETTER_MID_TONE_BAR=743]="U_MODIFIER_LETTER_MID_TONE_BAR",e[e.U_MODIFIER_LETTER_LOW_TONE_BAR=744]="U_MODIFIER_LETTER_LOW_TONE_BAR",e[e.U_MODIFIER_LETTER_EXTRA_LOW_TONE_BAR=745]="U_MODIFIER_LETTER_EXTRA_LOW_TONE_BAR",e[e.U_MODIFIER_LETTER_YIN_DEPARTING_TONE_MARK=746]="U_MODIFIER_LETTER_YIN_DEPARTING_TONE_MARK",e[e.U_MODIFIER_LETTER_YANG_DEPARTING_TONE_MARK=747]="U_MODIFIER_LETTER_YANG_DEPARTING_TONE_MARK",e[e.U_MODIFIER_LETTER_UNASPIRATED=749]="U_MODIFIER_LETTER_UNASPIRATED",e[e.U_MODIFIER_LETTER_LOW_DOWN_ARROWHEAD=751]="U_MODIFIER_LETTER_LOW_DOWN_ARROWHEAD",e[e.U_MODIFIER_LETTER_LOW_UP_ARROWHEAD=752]="U_MODIFIER_LETTER_LOW_UP_ARROWHEAD",e[e.U_MODIFIER_LETTER_LOW_LEFT_ARROWHEAD=753]="U_MODIFIER_LETTER_LOW_LEFT_ARROWHEAD",e[e.U_MODIFIER_LETTER_LOW_RIGHT_ARROWHEAD=754]="U_MODIFIER_LETTER_LOW_RIGHT_ARROWHEAD",e[e.U_MODIFIER_LETTER_LOW_RING=755]="U_MODIFIER_LETTER_LOW_RING",e[e.U_MODIFIER_LETTER_MIDDLE_GRAVE_ACCENT=756]="U_MODIFIER_LETTER_MIDDLE_GRAVE_ACCENT",e[e.U_MODIFIER_LETTER_MIDDLE_DOUBLE_GRAVE_ACCENT=757]="U_MODIFIER_LETTER_MIDDLE_DOUBLE_GRAVE_ACCENT",e[e.U_MODIFIER_LETTER_MIDDLE_DOUBLE_ACUTE_ACCENT=758]="U_MODIFIER_LETTER_MIDDLE_DOUBLE_ACUTE_ACCENT",e[e.U_MODIFIER_LETTER_LOW_TILDE=759]="U_MODIFIER_LETTER_LOW_TILDE",e[e.U_MODIFIER_LETTER_RAISED_COLON=760]="U_MODIFIER_LETTER_RAISED_COLON",e[e.U_MODIFIER_LETTER_BEGIN_HIGH_TONE=761]="U_MODIFIER_LETTER_BEGIN_HIGH_TONE",e[e.U_MODIFIER_LETTER_END_HIGH_TONE=762]="U_MODIFIER_LETTER_END_HIGH_TONE",e[e.U_MODIFIER_LETTER_BEGIN_LOW_TONE=763]="U_MODIFIER_LETTER_BEGIN_LOW_TONE",e[e.U_MODIFIER_LETTER_END_LOW_TONE=764]="U_MODIFIER_LETTER_END_LOW_TONE",e[e.U_MODIFIER_LETTER_SHELF=765]="U_MODIFIER_LETTER_SHELF",e[e.U_MODIFIER_LETTER_OPEN_SHELF=766]="U_MODIFIER_LETTER_OPEN_SHELF",e[e.U_MODIFIER_LETTER_LOW_LEFT_ARROW=767]="U_MODIFIER_LETTER_LOW_LEFT_ARROW",e[e.U_GREEK_LOWER_NUMERAL_SIGN=885]="U_GREEK_LOWER_NUMERAL_SIGN",e[e.U_GREEK_TONOS=900]="U_GREEK_TONOS",e[e.U_GREEK_DIALYTIKA_TONOS=901]="U_GREEK_DIALYTIKA_TONOS",e[e.U_GREEK_KORONIS=8125]="U_GREEK_KORONIS",e[e.U_GREEK_PSILI=8127]="U_GREEK_PSILI",e[e.U_GREEK_PERISPOMENI=8128]="U_GREEK_PERISPOMENI",e[e.U_GREEK_DIALYTIKA_AND_PERISPOMENI=8129]="U_GREEK_DIALYTIKA_AND_PERISPOMENI",e[e.U_GREEK_PSILI_AND_VARIA=8141]="U_GREEK_PSILI_AND_VARIA",e[e.U_GREEK_PSILI_AND_OXIA=8142]="U_GREEK_PSILI_AND_OXIA",e[e.U_GREEK_PSILI_AND_PERISPOMENI=8143]="U_GREEK_PSILI_AND_PERISPOMENI",e[e.U_GREEK_DASIA_AND_VARIA=8157]="U_GREEK_DASIA_AND_VARIA",e[e.U_GREEK_DASIA_AND_OXIA=8158]="U_GREEK_DASIA_AND_OXIA",e[e.U_GREEK_DASIA_AND_PERISPOMENI=8159]="U_GREEK_DASIA_AND_PERISPOMENI",e[e.U_GREEK_DIALYTIKA_AND_VARIA=8173]="U_GREEK_DIALYTIKA_AND_VARIA",e[e.U_GREEK_DIALYTIKA_AND_OXIA=8174]="U_GREEK_DIALYTIKA_AND_OXIA",e[e.U_GREEK_VARIA=8175]="U_GREEK_VARIA",e[e.U_GREEK_OXIA=8189]="U_GREEK_OXIA",e[e.U_GREEK_DASIA=8190]="U_GREEK_DASIA",e[e.U_IDEOGRAPHIC_FULL_STOP=12290]="U_IDEOGRAPHIC_FULL_STOP",e[e.U_LEFT_CORNER_BRACKET=12300]="U_LEFT_CORNER_BRACKET",e[e.U_RIGHT_CORNER_BRACKET=12301]="U_RIGHT_CORNER_BRACKET",e[e.U_LEFT_BLACK_LENTICULAR_BRACKET=12304]="U_LEFT_BLACK_LENTICULAR_BRACKET",e[e.U_RIGHT_BLACK_LENTICULAR_BRACKET=12305]="U_RIGHT_BLACK_LENTICULAR_BRACKET",e[e.U_OVERLINE=8254]="U_OVERLINE",e[e.UTF8_BOM=65279]="UTF8_BOM",e[e.U_FULLWIDTH_SEMICOLON=65307]="U_FULLWIDTH_SEMICOLON",e[e.U_FULLWIDTH_COMMA=65292]="U_FULLWIDTH_COMMA"})(Z||(Z={}));function lh(){return globalThis._VSCODE_NLS_LANGUAGE}lh()==="pseudo"||typeof document<"u"&&document.location&&typeof document.location.hash=="string"&&document.location.hash.indexOf("pseudo=true")>=0;const is="en";let tr=!1,er=!1,br=!1,ch=!1,Qa=!1,uh=!1,cr,_r=is,ql=is,mk,en;const on=globalThis;let me;typeof on.vscode<"u"&&typeof on.vscode.process<"u"?me=on.vscode.process:typeof process<"u"&&typeof process?.versions?.node=="string"&&(me=process);const gk=typeof me?.versions?.electron=="string",yk=gk&&me?.type==="renderer";if(typeof me=="object"){tr=me.platform==="win32",er=me.platform==="darwin",br=me.platform==="linux",br&&me.env.SNAP&&me.env.SNAP_REVISION,me.env.CI||me.env.BUILD_ARTIFACTSTAGINGDIRECTORY,cr=is,_r=is;const e=me.env.VSCODE_NLS_CONFIG;if(e)try{const t=JSON.parse(e);cr=t.userLocale,ql=t.osLocale,_r=t.resolvedLanguage||is,mk=t.languagePack?.translationsConfigFile}catch{}ch=!0}else typeof navigator=="object"&&!yk?(en=navigator.userAgent,tr=en.indexOf("Windows")>=0,er=en.indexOf("Macintosh")>=0,uh=(en.indexOf("Macintosh")>=0||en.indexOf("iPad")>=0||en.indexOf("iPhone")>=0)&&!!navigator.maxTouchPoints&&navigator.maxTouchPoints>0,br=en.indexOf("Linux")>=0,en?.indexOf("Mobi")>=0,Qa=!0,_r=lh()||is,cr=navigator.language.toLowerCase(),ql=cr):console.error("Unable to resolve platform.");var fs;(function(e){e[e.Web=0]="Web",e[e.Mac=1]="Mac",e[e.Linux=2]="Linux",e[e.Windows=3]="Windows"})(fs||(fs={}));fs.Web;er?fs.Mac:tr?fs.Windows:br&&fs.Linux;const ks=tr,bk=er,_k=ch,wk=Qa,Nk=Qa&&typeof on.importScripts=="function",Ik=Nk?on.origin:void 0,Ge=en,mn=_r;var Gl;(function(e){function t(){return mn}e.value=t;function n(){return mn.length===2?mn==="en":mn.length>=3?mn[0]==="e"&&mn[1]==="n"&&mn[2]==="-":!1}e.isDefaultVariant=n;function s(){return mn==="en"}e.isDefault=s})(Gl||(Gl={}));const kk=typeof on.postMessage=="function"&&!on.importScripts;(()=>{if(kk){const e=[];on.addEventListener("message",n=>{if(n.data&&n.data.vscodeScheduleAsyncWork)for(let s=0,r=e.length;s<r;s++){const o=e[s];if(o.id===n.data.vscodeScheduleAsyncWork){e.splice(s,1),o.callback();return}}});let t=0;return n=>{const s=++t;e.push({id:s,callback:n}),on.postMessage({vscodeScheduleAsyncWork:s},"*")}}return e=>setTimeout(e)})();var Gs;(function(e){e[e.Windows=1]="Windows",e[e.Macintosh=2]="Macintosh",e[e.Linux=3]="Linux"})(Gs||(Gs={}));er||uh?Gs.Macintosh:tr?Gs.Windows:Gs.Linux;const Sk=!!(Ge&&Ge.indexOf("Chrome")>=0);Ge&&Ge.indexOf("Firefox")>=0;!Sk&&Ge&&Ge.indexOf("Safari")>=0;Ge&&Ge.indexOf("Edg/")>=0;Ge&&Ge.indexOf("Android")>=0;var Kl={};let Mn;const So=globalThis.vscode;if(typeof So<"u"&&typeof So.process<"u"){const e=So.process;Mn={get platform(){return e.platform},get arch(){return e.arch},get env(){return e.env},cwd(){return e.cwd()}}}else typeof process<"u"&&typeof process?.versions?.node=="string"?Mn={get platform(){return process.platform},get arch(){return process.arch},get env(){return Kl},cwd(){return Kl.VSCODE_CWD||process.cwd()}}:Mn={get platform(){return ks?"win32":bk?"darwin":"linux"},get arch(){},get env(){return{}},cwd(){return"/"}};const Wr=Mn.cwd,Tk=Mn.env,Ek=Mn.platform;Mn.arch;const vk=65,xk=97,$k=90,Ak=122,Vn=46,Wt=47,oe=92,Je=58,Dk=63;class fh extends Error{constructor(t,n,s){let r;typeof n=="string"&&n.indexOf("not ")===0?(r="must not be",n=n.replace(/^not /,"")):r="must be";const o=t.indexOf(".")!==-1?"property":"argument";let i=`The "${t}" ${o} ${r} of type ${n}`;i+=`. Received type ${typeof s}`,super(i),this.code="ERR_INVALID_ARG_TYPE"}}function Rk(e,t){if(e===null||typeof e!="object")throw new fh(t,"Object",e)}function Lt(e,t){if(typeof e!="string")throw new fh(t,"string",e)}const Me=Ek==="win32";function rt(e){return e===Wt||e===oe}function ui(e){return e===Wt}function Qe(e){return e>=vk&&e<=$k||e>=xk&&e<=Ak}function Hr(e,t,n,s){let r="",o=0,i=-1,a=0,l=0;for(let c=0;c<=e.length;++c){if(c<e.length)l=e.charCodeAt(c);else{if(s(l))break;l=Wt}if(s(l)){if(!(i===c-1||a===1))if(a===2){if(r.length<2||o!==2||r.charCodeAt(r.length-1)!==Vn||r.charCodeAt(r.length-2)!==Vn){if(r.length>2){const u=r.lastIndexOf(n);u===-1?(r="",o=0):(r=r.slice(0,u),o=r.length-1-r.lastIndexOf(n)),i=c,a=0;continue}else if(r.length!==0){r="",o=0,i=c,a=0;continue}}t&&(r+=r.length>0?`${n}..`:"..",o=2)}else r.length>0?r+=`${n}${e.slice(i+1,c)}`:r=e.slice(i+1,c),o=c-i-1;i=c,a=0}else l===Vn&&a!==-1?++a:a=-1}return r}function Ok(e){return e?`${e[0]==="."?"":"."}${e}`:""}function hh(e,t){Rk(t,"pathObject");const n=t.dir||t.root,s=t.base||`${t.name||""}${Ok(t.ext)}`;return n?n===t.root?`${n}${s}`:`${n}${e}${s}`:s}const qt={resolve(...e){let t="",n="",s=!1;for(let r=e.length-1;r>=-1;r--){let o;if(r>=0){if(o=e[r],Lt(o,`paths[${r}]`),o.length===0)continue}else t.length===0?o=Wr():(o=Tk[`=${t}`]||Wr(),(o===void 0||o.slice(0,2).toLowerCase()!==t.toLowerCase()&&o.charCodeAt(2)===oe)&&(o=`${t}\\`));const i=o.length;let a=0,l="",c=!1;const u=o.charCodeAt(0);if(i===1)rt(u)&&(a=1,c=!0);else if(rt(u))if(c=!0,rt(o.charCodeAt(1))){let f=2,h=f;for(;f<i&&!rt(o.charCodeAt(f));)f++;if(f<i&&f!==h){const p=o.slice(h,f);for(h=f;f<i&&rt(o.charCodeAt(f));)f++;if(f<i&&f!==h){for(h=f;f<i&&!rt(o.charCodeAt(f));)f++;(f===i||f!==h)&&(l=`\\\\${p}\\${o.slice(h,f)}`,a=f)}}}else a=1;else Qe(u)&&o.charCodeAt(1)===Je&&(l=o.slice(0,2),a=2,i>2&&rt(o.charCodeAt(2))&&(c=!0,a=3));if(l.length>0)if(t.length>0){if(l.toLowerCase()!==t.toLowerCase())continue}else t=l;if(s){if(t.length>0)break}else if(n=`${o.slice(a)}\\${n}`,s=c,c&&t.length>0)break}return n=Hr(n,!s,"\\",rt),s?`${t}\\${n}`:`${t}${n}`||"."},normalize(e){Lt(e,"path");const t=e.length;if(t===0)return".";let n=0,s,r=!1;const o=e.charCodeAt(0);if(t===1)return ui(o)?"\\":e;if(rt(o))if(r=!0,rt(e.charCodeAt(1))){let a=2,l=a;for(;a<t&&!rt(e.charCodeAt(a));)a++;if(a<t&&a!==l){const c=e.slice(l,a);for(l=a;a<t&&rt(e.charCodeAt(a));)a++;if(a<t&&a!==l){for(l=a;a<t&&!rt(e.charCodeAt(a));)a++;if(a===t)return`\\\\${c}\\${e.slice(l)}\\`;a!==l&&(s=`\\\\${c}\\${e.slice(l,a)}`,n=a)}}}else n=1;else Qe(o)&&e.charCodeAt(1)===Je&&(s=e.slice(0,2),n=2,t>2&&rt(e.charCodeAt(2))&&(r=!0,n=3));let i=n<t?Hr(e.slice(n),!r,"\\",rt):"";if(i.length===0&&!r&&(i="."),i.length>0&&rt(e.charCodeAt(t-1))&&(i+="\\"),!r&&s===void 0&&e.includes(":")){if(i.length>=2&&Qe(i.charCodeAt(0))&&i.charCodeAt(1)===Je)return`.\\${i}`;let a=e.indexOf(":");do if(a===t-1||rt(e.charCodeAt(a+1)))return`.\\${i}`;while((a=e.indexOf(":",a+1))!==-1)}return s===void 0?r?`\\${i}`:i:r?`${s}\\${i}`:`${s}${i}`},isAbsolute(e){Lt(e,"path");const t=e.length;if(t===0)return!1;const n=e.charCodeAt(0);return rt(n)||t>2&&Qe(n)&&e.charCodeAt(1)===Je&&rt(e.charCodeAt(2))},join(...e){if(e.length===0)return".";let t,n;for(let o=0;o<e.length;++o){const i=e[o];Lt(i,"path"),i.length>0&&(t===void 0?t=n=i:t+=`\\${i}`)}if(t===void 0)return".";let s=!0,r=0;if(typeof n=="string"&&rt(n.charCodeAt(0))){++r;const o=n.length;o>1&&rt(n.charCodeAt(1))&&(++r,o>2&&(rt(n.charCodeAt(2))?++r:s=!1))}if(s){for(;r<t.length&&rt(t.charCodeAt(r));)r++;r>=2&&(t=`\\${t.slice(r)}`)}return qt.normalize(t)},relative(e,t){if(Lt(e,"from"),Lt(t,"to"),e===t)return"";const n=qt.resolve(e),s=qt.resolve(t);if(n===s||(e=n.toLowerCase(),t=s.toLowerCase(),e===t))return"";if(n.length!==e.length||s.length!==t.length){const d=n.split("\\"),y=s.split("\\");d[d.length-1]===""&&d.pop(),y[y.length-1]===""&&y.pop();const m=d.length,b=y.length,_=m<b?m:b;let w;for(w=0;w<_&&d[w].toLowerCase()===y[w].toLowerCase();w++);return w===0?s:w===_?b>_?y.slice(w).join("\\"):m>_?"..\\".repeat(m-1-w)+"..":"":"..\\".repeat(m-w)+y.slice(w).join("\\")}let r=0;for(;r<e.length&&e.charCodeAt(r)===oe;)r++;let o=e.length;for(;o-1>r&&e.charCodeAt(o-1)===oe;)o--;const i=o-r;let a=0;for(;a<t.length&&t.charCodeAt(a)===oe;)a++;let l=t.length;for(;l-1>a&&t.charCodeAt(l-1)===oe;)l--;const c=l-a,u=i<c?i:c;let f=-1,h=0;for(;h<u;h++){const d=e.charCodeAt(r+h);if(d!==t.charCodeAt(a+h))break;d===oe&&(f=h)}if(h!==u){if(f===-1)return s}else{if(c>u){if(t.charCodeAt(a+h)===oe)return s.slice(a+h+1);if(h===2)return s.slice(a+h)}i>u&&(e.charCodeAt(r+h)===oe?f=h:h===2&&(f=3)),f===-1&&(f=0)}let p="";for(h=r+f+1;h<=o;++h)(h===o||e.charCodeAt(h)===oe)&&(p+=p.length===0?"..":"\\..");return a+=f,p.length>0?`${p}${s.slice(a,l)}`:(s.charCodeAt(a)===oe&&++a,s.slice(a,l))},toNamespacedPath(e){if(typeof e!="string"||e.length===0)return e;const t=qt.resolve(e);if(t.length<=2)return e;if(t.charCodeAt(0)===oe){if(t.charCodeAt(1)===oe){const n=t.charCodeAt(2);if(n!==Dk&&n!==Vn)return`\\\\?\\UNC\\${t.slice(2)}`}}else if(Qe(t.charCodeAt(0))&&t.charCodeAt(1)===Je&&t.charCodeAt(2)===oe)return`\\\\?\\${t}`;return t},dirname(e){Lt(e,"path");const t=e.length;if(t===0)return".";let n=-1,s=0;const r=e.charCodeAt(0);if(t===1)return rt(r)?e:".";if(rt(r)){if(n=s=1,rt(e.charCodeAt(1))){let a=2,l=a;for(;a<t&&!rt(e.charCodeAt(a));)a++;if(a<t&&a!==l){for(l=a;a<t&&rt(e.charCodeAt(a));)a++;if(a<t&&a!==l){for(l=a;a<t&&!rt(e.charCodeAt(a));)a++;if(a===t)return e;a!==l&&(n=s=a+1)}}}}else Qe(r)&&e.charCodeAt(1)===Je&&(n=t>2&&rt(e.charCodeAt(2))?3:2,s=n);let o=-1,i=!0;for(let a=t-1;a>=s;--a)if(rt(e.charCodeAt(a))){if(!i){o=a;break}}else i=!1;if(o===-1){if(n===-1)return".";o=n}return e.slice(0,o)},basename(e,t){t!==void 0&&Lt(t,"suffix"),Lt(e,"path");let n=0,s=-1,r=!0,o;if(e.length>=2&&Qe(e.charCodeAt(0))&&e.charCodeAt(1)===Je&&(n=2),t!==void 0&&t.length>0&&t.length<=e.length){if(t===e)return"";let i=t.length-1,a=-1;for(o=e.length-1;o>=n;--o){const l=e.charCodeAt(o);if(rt(l)){if(!r){n=o+1;break}}else a===-1&&(r=!1,a=o+1),i>=0&&(l===t.charCodeAt(i)?--i===-1&&(s=o):(i=-1,s=a))}return n===s?s=a:s===-1&&(s=e.length),e.slice(n,s)}for(o=e.length-1;o>=n;--o)if(rt(e.charCodeAt(o))){if(!r){n=o+1;break}}else s===-1&&(r=!1,s=o+1);return s===-1?"":e.slice(n,s)},extname(e){Lt(e,"path");let t=0,n=-1,s=0,r=-1,o=!0,i=0;e.length>=2&&e.charCodeAt(1)===Je&&Qe(e.charCodeAt(0))&&(t=s=2);for(let a=e.length-1;a>=t;--a){const l=e.charCodeAt(a);if(rt(l)){if(!o){s=a+1;break}continue}r===-1&&(o=!1,r=a+1),l===Vn?n===-1?n=a:i!==1&&(i=1):n!==-1&&(i=-1)}return n===-1||r===-1||i===0||i===1&&n===r-1&&n===s+1?"":e.slice(n,r)},format:hh.bind(null,"\\"),parse(e){Lt(e,"path");const t={root:"",dir:"",base:"",ext:"",name:""};if(e.length===0)return t;const n=e.length;let s=0,r=e.charCodeAt(0);if(n===1)return rt(r)?(t.root=t.dir=e,t):(t.base=t.name=e,t);if(rt(r)){if(s=1,rt(e.charCodeAt(1))){let f=2,h=f;for(;f<n&&!rt(e.charCodeAt(f));)f++;if(f<n&&f!==h){for(h=f;f<n&&rt(e.charCodeAt(f));)f++;if(f<n&&f!==h){for(h=f;f<n&&!rt(e.charCodeAt(f));)f++;f===n?s=f:f!==h&&(s=f+1)}}}}else if(Qe(r)&&e.charCodeAt(1)===Je){if(n<=2)return t.root=t.dir=e,t;if(s=2,rt(e.charCodeAt(2))){if(n===3)return t.root=t.dir=e,t;s=3}}s>0&&(t.root=e.slice(0,s));let o=-1,i=s,a=-1,l=!0,c=e.length-1,u=0;for(;c>=s;--c){if(r=e.charCodeAt(c),rt(r)){if(!l){i=c+1;break}continue}a===-1&&(l=!1,a=c+1),r===Vn?o===-1?o=c:u!==1&&(u=1):o!==-1&&(u=-1)}return a!==-1&&(o===-1||u===0||u===1&&o===a-1&&o===i+1?t.base=t.name=e.slice(i,a):(t.name=e.slice(i,o),t.base=e.slice(i,a),t.ext=e.slice(o,a))),i>0&&i!==s?t.dir=e.slice(0,i-1):t.dir=t.root,t},sep:"\\",delimiter:";",win32:null,posix:null},Lk=(()=>{if(Me){const e=/\\/g;return()=>{const t=Wr().replace(e,"/");return t.slice(t.indexOf("/"))}}return()=>Wr()})(),Nt={resolve(...e){let t="",n=!1;for(let s=e.length-1;s>=0&&!n;s--){const r=e[s];Lt(r,`paths[${s}]`),r.length!==0&&(t=`${r}/${t}`,n=r.charCodeAt(0)===Wt)}if(!n){const s=Lk();t=`${s}/${t}`,n=s.charCodeAt(0)===Wt}return t=Hr(t,!n,"/",ui),n?`/${t}`:t.length>0?t:"."},normalize(e){if(Lt(e,"path"),e.length===0)return".";const t=e.charCodeAt(0)===Wt,n=e.charCodeAt(e.length-1)===Wt;return e=Hr(e,!t,"/",ui),e.length===0?t?"/":n?"./":".":(n&&(e+="/"),t?`/${e}`:e)},isAbsolute(e){return Lt(e,"path"),e.length>0&&e.charCodeAt(0)===Wt},join(...e){if(e.length===0)return".";const t=[];for(let n=0;n<e.length;++n){const s=e[n];Lt(s,"path"),s.length>0&&t.push(s)}return t.length===0?".":Nt.normalize(t.join("/"))},relative(e,t){if(Lt(e,"from"),Lt(t,"to"),e===t||(e=Nt.resolve(e),t=Nt.resolve(t),e===t))return"";const n=1,s=e.length,r=s-n,o=1,i=t.length-o,a=r<i?r:i;let l=-1,c=0;for(;c<a;c++){const f=e.charCodeAt(n+c);if(f!==t.charCodeAt(o+c))break;f===Wt&&(l=c)}if(c===a)if(i>a){if(t.charCodeAt(o+c)===Wt)return t.slice(o+c+1);if(c===0)return t.slice(o+c)}else r>a&&(e.charCodeAt(n+c)===Wt?l=c:c===0&&(l=0));let u="";for(c=n+l+1;c<=s;++c)(c===s||e.charCodeAt(c)===Wt)&&(u+=u.length===0?"..":"/..");return`${u}${t.slice(o+l)}`},toNamespacedPath(e){return e},dirname(e){if(Lt(e,"path"),e.length===0)return".";const t=e.charCodeAt(0)===Wt;let n=-1,s=!0;for(let r=e.length-1;r>=1;--r)if(e.charCodeAt(r)===Wt){if(!s){n=r;break}}else s=!1;return n===-1?t?"/":".":t&&n===1?"//":e.slice(0,n)},basename(e,t){t!==void 0&&Lt(t,"suffix"),Lt(e,"path");let n=0,s=-1,r=!0,o;if(t!==void 0&&t.length>0&&t.length<=e.length){if(t===e)return"";let i=t.length-1,a=-1;for(o=e.length-1;o>=0;--o){const l=e.charCodeAt(o);if(l===Wt){if(!r){n=o+1;break}}else a===-1&&(r=!1,a=o+1),i>=0&&(l===t.charCodeAt(i)?--i===-1&&(s=o):(i=-1,s=a))}return n===s?s=a:s===-1&&(s=e.length),e.slice(n,s)}for(o=e.length-1;o>=0;--o)if(e.charCodeAt(o)===Wt){if(!r){n=o+1;break}}else s===-1&&(r=!1,s=o+1);return s===-1?"":e.slice(n,s)},extname(e){Lt(e,"path");let t=-1,n=0,s=-1,r=!0,o=0;for(let i=e.length-1;i>=0;--i){const a=e[i];if(a==="/"){if(!r){n=i+1;break}continue}s===-1&&(r=!1,s=i+1),a==="."?t===-1?t=i:o!==1&&(o=1):t!==-1&&(o=-1)}return t===-1||s===-1||o===0||o===1&&t===s-1&&t===n+1?"":e.slice(t,s)},format:hh.bind(null,"/"),parse(e){Lt(e,"path");const t={root:"",dir:"",base:"",ext:"",name:""};if(e.length===0)return t;const n=e.charCodeAt(0)===Wt;let s;n?(t.root="/",s=1):s=0;let r=-1,o=0,i=-1,a=!0,l=e.length-1,c=0;for(;l>=s;--l){const u=e.charCodeAt(l);if(u===Wt){if(!a){o=l+1;break}continue}i===-1&&(a=!1,i=l+1),u===Vn?r===-1?r=l:c!==1&&(c=1):r!==-1&&(c=-1)}if(i!==-1){const u=o===0&&n?1:o;r===-1||c===0||c===1&&r===i-1&&r===o+1?t.base=t.name=e.slice(u,i):(t.name=e.slice(u,r),t.base=e.slice(u,i),t.ext=e.slice(r,i))}return o>0?t.dir=e.slice(0,o-1):n&&(t.dir="/"),t},sep:"/",delimiter:":",win32:null,posix:null};Nt.win32=qt.win32=qt;Nt.posix=qt.posix=Nt;const Fk=Me?qt.normalize:Nt.normalize;Me?qt.isAbsolute:Nt.isAbsolute;const Pk=Me?qt.join:Nt.join,Uk=Me?qt.resolve:Nt.resolve,Mk=Me?qt.relative:Nt.relative,Vk=Me?qt.dirname:Nt.dirname;Me?qt.basename:Nt.basename;Me?qt.extname:Nt.extname;Me?qt.parse:Nt.parse;const wr=Me?qt.sep:Nt.sep;function Bk(e){return e}class Ck{constructor(t,n){this.lastCache=void 0,this.lastArgKey=void 0,typeof t=="function"?(this._fn=t,this._computeKey=Bk):(this._fn=n,this._computeKey=t.getCacheKey)}get(t){const n=this._computeKey(t);return this.lastArgKey!==n&&(this.lastArgKey=n,this.lastCache=this._fn(t)),this.lastCache}}class jl{constructor(t){this.executor=t,this._didRun=!1}get hasValue(){return this._didRun}get value(){if(!this._didRun)try{this._value=this.executor()}catch(t){this._error=t}finally{this._didRun=!0}if(this._error)throw this._error;return this._value}get rawValue(){return this._value}}var qr;(function(e){e[e.MAX_SAFE_SMALL_INTEGER=1073741824]="MAX_SAFE_SMALL_INTEGER",e[e.MIN_SAFE_SMALL_INTEGER=-1073741824]="MIN_SAFE_SMALL_INTEGER",e[e.MAX_UINT_8=255]="MAX_UINT_8",e[e.MAX_UINT_16=65535]="MAX_UINT_16",e[e.MAX_UINT_32=4294967295]="MAX_UINT_32",e[e.UNICODE_SUPPLEMENTARY_PLANE_BEGIN=65536]="UNICODE_SUPPLEMENTARY_PLANE_BEGIN"})(qr||(qr={}));function ts(e){return e<0?0:e>qr.MAX_UINT_32?qr.MAX_UINT_32:e|0}function zk(e){return e.split(/\r\n|\r|\n/)}function Wk(e,t){return e<t?-1:e>t?1:0}function Hk(e,t,n=0,s=e.length,r=0,o=t.length){for(;n<s&&r<o;n++,r++){const l=e.charCodeAt(n),c=t.charCodeAt(r);if(l<c)return-1;if(l>c)return 1}const i=s-n,a=o-r;return i<a?-1:i>a?1:0}function ph(e,t,n=0,s=e.length,r=0,o=t.length){for(;n<s&&r<o;n++,r++){let l=e.charCodeAt(n),c=t.charCodeAt(r);if(l===c)continue;if(l>=128||c>=128)return Hk(e.toLowerCase(),t.toLowerCase(),n,s,r,o);Xl(l)&&(l-=32),Xl(c)&&(c-=32);const u=l-c;if(u!==0)return u}const i=s-n,a=o-r;return i<a?-1:i>a?1:0}function Xl(e){return e>=Z.a&&e<=Z.z}function dh(e){return e>=Z.A&&e<=Z.Z}function qk(e,t){return e.length===t.length&&ph(e,t)===0}function Gk(e,t){const n=t.length;return t.length>e.length?!1:ph(e,t,0,n)===0}String.fromCharCode(Z.UTF8_BOM);var An;(function(e){e[e.Other=0]="Other",e[e.Prepend=1]="Prepend",e[e.CR=2]="CR",e[e.LF=3]="LF",e[e.Control=4]="Control",e[e.Extend=5]="Extend",e[e.Regional_Indicator=6]="Regional_Indicator",e[e.SpacingMark=7]="SpacingMark",e[e.L=8]="L",e[e.V=9]="V",e[e.T=10]="T",e[e.LV=11]="LV",e[e.LVT=12]="LVT",e[e.ZWJ=13]="ZWJ",e[e.Extended_Pictographic=14]="Extended_Pictographic"})(An||(An={}));class Bs{static{this._INSTANCE=null}static getInstance(){return Bs._INSTANCE||(Bs._INSTANCE=new Bs),Bs._INSTANCE}constructor(){this._data=Kk()}getGraphemeBreakType(t){if(t<32)return t===Z.LineFeed?An.LF:t===Z.CarriageReturn?An.CR:An.Control;if(t<127)return An.Other;const n=this._data,s=n.length/3;let r=1;for(;r<=s;)if(t<n[3*r])r=2*r;else if(t>n[3*r+1])r=2*r+1;else return n[3*r+2];return An.Other}}function Kk(){return JSON.parse("[0,0,0,51229,51255,12,44061,44087,12,127462,127487,6,7083,7085,5,47645,47671,12,54813,54839,12,128678,128678,14,3270,3270,5,9919,9923,14,45853,45879,12,49437,49463,12,53021,53047,12,71216,71218,7,128398,128399,14,129360,129374,14,2519,2519,5,4448,4519,9,9742,9742,14,12336,12336,14,44957,44983,12,46749,46775,12,48541,48567,12,50333,50359,12,52125,52151,12,53917,53943,12,69888,69890,5,73018,73018,5,127990,127990,14,128558,128559,14,128759,128760,14,129653,129655,14,2027,2035,5,2891,2892,7,3761,3761,5,6683,6683,5,8293,8293,4,9825,9826,14,9999,9999,14,43452,43453,5,44509,44535,12,45405,45431,12,46301,46327,12,47197,47223,12,48093,48119,12,48989,49015,12,49885,49911,12,50781,50807,12,51677,51703,12,52573,52599,12,53469,53495,12,54365,54391,12,65279,65279,4,70471,70472,7,72145,72147,7,119173,119179,5,127799,127818,14,128240,128244,14,128512,128512,14,128652,128652,14,128721,128722,14,129292,129292,14,129445,129450,14,129734,129743,14,1476,1477,5,2366,2368,7,2750,2752,7,3076,3076,5,3415,3415,5,4141,4144,5,6109,6109,5,6964,6964,5,7394,7400,5,9197,9198,14,9770,9770,14,9877,9877,14,9968,9969,14,10084,10084,14,43052,43052,5,43713,43713,5,44285,44311,12,44733,44759,12,45181,45207,12,45629,45655,12,46077,46103,12,46525,46551,12,46973,46999,12,47421,47447,12,47869,47895,12,48317,48343,12,48765,48791,12,49213,49239,12,49661,49687,12,50109,50135,12,50557,50583,12,51005,51031,12,51453,51479,12,51901,51927,12,52349,52375,12,52797,52823,12,53245,53271,12,53693,53719,12,54141,54167,12,54589,54615,12,55037,55063,12,69506,69509,5,70191,70193,5,70841,70841,7,71463,71467,5,72330,72342,5,94031,94031,5,123628,123631,5,127763,127765,14,127941,127941,14,128043,128062,14,128302,128317,14,128465,128467,14,128539,128539,14,128640,128640,14,128662,128662,14,128703,128703,14,128745,128745,14,129004,129007,14,129329,129330,14,129402,129402,14,129483,129483,14,129686,129704,14,130048,131069,14,173,173,4,1757,1757,1,2200,2207,5,2434,2435,7,2631,2632,5,2817,2817,5,3008,3008,5,3201,3201,5,3387,3388,5,3542,3542,5,3902,3903,7,4190,4192,5,6002,6003,5,6439,6440,5,6765,6770,7,7019,7027,5,7154,7155,7,8205,8205,13,8505,8505,14,9654,9654,14,9757,9757,14,9792,9792,14,9852,9853,14,9890,9894,14,9937,9937,14,9981,9981,14,10035,10036,14,11035,11036,14,42654,42655,5,43346,43347,7,43587,43587,5,44006,44007,7,44173,44199,12,44397,44423,12,44621,44647,12,44845,44871,12,45069,45095,12,45293,45319,12,45517,45543,12,45741,45767,12,45965,45991,12,46189,46215,12,46413,46439,12,46637,46663,12,46861,46887,12,47085,47111,12,47309,47335,12,47533,47559,12,47757,47783,12,47981,48007,12,48205,48231,12,48429,48455,12,48653,48679,12,48877,48903,12,49101,49127,12,49325,49351,12,49549,49575,12,49773,49799,12,49997,50023,12,50221,50247,12,50445,50471,12,50669,50695,12,50893,50919,12,51117,51143,12,51341,51367,12,51565,51591,12,51789,51815,12,52013,52039,12,52237,52263,12,52461,52487,12,52685,52711,12,52909,52935,12,53133,53159,12,53357,53383,12,53581,53607,12,53805,53831,12,54029,54055,12,54253,54279,12,54477,54503,12,54701,54727,12,54925,54951,12,55149,55175,12,68101,68102,5,69762,69762,7,70067,70069,7,70371,70378,5,70720,70721,7,71087,71087,5,71341,71341,5,71995,71996,5,72249,72249,7,72850,72871,5,73109,73109,5,118576,118598,5,121505,121519,5,127245,127247,14,127568,127569,14,127777,127777,14,127872,127891,14,127956,127967,14,128015,128016,14,128110,128172,14,128259,128259,14,128367,128368,14,128424,128424,14,128488,128488,14,128530,128532,14,128550,128551,14,128566,128566,14,128647,128647,14,128656,128656,14,128667,128673,14,128691,128693,14,128715,128715,14,128728,128732,14,128752,128752,14,128765,128767,14,129096,129103,14,129311,129311,14,129344,129349,14,129394,129394,14,129413,129425,14,129466,129471,14,129511,129535,14,129664,129666,14,129719,129722,14,129760,129767,14,917536,917631,5,13,13,2,1160,1161,5,1564,1564,4,1807,1807,1,2085,2087,5,2307,2307,7,2382,2383,7,2497,2500,5,2563,2563,7,2677,2677,5,2763,2764,7,2879,2879,5,2914,2915,5,3021,3021,5,3142,3144,5,3263,3263,5,3285,3286,5,3398,3400,7,3530,3530,5,3633,3633,5,3864,3865,5,3974,3975,5,4155,4156,7,4229,4230,5,5909,5909,7,6078,6085,7,6277,6278,5,6451,6456,7,6744,6750,5,6846,6846,5,6972,6972,5,7074,7077,5,7146,7148,7,7222,7223,5,7416,7417,5,8234,8238,4,8417,8417,5,9000,9000,14,9203,9203,14,9730,9731,14,9748,9749,14,9762,9763,14,9776,9783,14,9800,9811,14,9831,9831,14,9872,9873,14,9882,9882,14,9900,9903,14,9929,9933,14,9941,9960,14,9974,9974,14,9989,9989,14,10006,10006,14,10062,10062,14,10160,10160,14,11647,11647,5,12953,12953,14,43019,43019,5,43232,43249,5,43443,43443,5,43567,43568,7,43696,43696,5,43765,43765,7,44013,44013,5,44117,44143,12,44229,44255,12,44341,44367,12,44453,44479,12,44565,44591,12,44677,44703,12,44789,44815,12,44901,44927,12,45013,45039,12,45125,45151,12,45237,45263,12,45349,45375,12,45461,45487,12,45573,45599,12,45685,45711,12,45797,45823,12,45909,45935,12,46021,46047,12,46133,46159,12,46245,46271,12,46357,46383,12,46469,46495,12,46581,46607,12,46693,46719,12,46805,46831,12,46917,46943,12,47029,47055,12,47141,47167,12,47253,47279,12,47365,47391,12,47477,47503,12,47589,47615,12,47701,47727,12,47813,47839,12,47925,47951,12,48037,48063,12,48149,48175,12,48261,48287,12,48373,48399,12,48485,48511,12,48597,48623,12,48709,48735,12,48821,48847,12,48933,48959,12,49045,49071,12,49157,49183,12,49269,49295,12,49381,49407,12,49493,49519,12,49605,49631,12,49717,49743,12,49829,49855,12,49941,49967,12,50053,50079,12,50165,50191,12,50277,50303,12,50389,50415,12,50501,50527,12,50613,50639,12,50725,50751,12,50837,50863,12,50949,50975,12,51061,51087,12,51173,51199,12,51285,51311,12,51397,51423,12,51509,51535,12,51621,51647,12,51733,51759,12,51845,51871,12,51957,51983,12,52069,52095,12,52181,52207,12,52293,52319,12,52405,52431,12,52517,52543,12,52629,52655,12,52741,52767,12,52853,52879,12,52965,52991,12,53077,53103,12,53189,53215,12,53301,53327,12,53413,53439,12,53525,53551,12,53637,53663,12,53749,53775,12,53861,53887,12,53973,53999,12,54085,54111,12,54197,54223,12,54309,54335,12,54421,54447,12,54533,54559,12,54645,54671,12,54757,54783,12,54869,54895,12,54981,55007,12,55093,55119,12,55243,55291,10,66045,66045,5,68325,68326,5,69688,69702,5,69817,69818,5,69957,69958,7,70089,70092,5,70198,70199,5,70462,70462,5,70502,70508,5,70750,70750,5,70846,70846,7,71100,71101,5,71230,71230,7,71351,71351,5,71737,71738,5,72000,72000,7,72160,72160,5,72273,72278,5,72752,72758,5,72882,72883,5,73031,73031,5,73461,73462,7,94192,94193,7,119149,119149,7,121403,121452,5,122915,122916,5,126980,126980,14,127358,127359,14,127535,127535,14,127759,127759,14,127771,127771,14,127792,127793,14,127825,127867,14,127897,127899,14,127945,127945,14,127985,127986,14,128000,128007,14,128021,128021,14,128066,128100,14,128184,128235,14,128249,128252,14,128266,128276,14,128335,128335,14,128379,128390,14,128407,128419,14,128444,128444,14,128481,128481,14,128499,128499,14,128526,128526,14,128536,128536,14,128543,128543,14,128556,128556,14,128564,128564,14,128577,128580,14,128643,128645,14,128649,128649,14,128654,128654,14,128660,128660,14,128664,128664,14,128675,128675,14,128686,128689,14,128695,128696,14,128705,128709,14,128717,128719,14,128725,128725,14,128736,128741,14,128747,128748,14,128755,128755,14,128762,128762,14,128981,128991,14,129009,129023,14,129160,129167,14,129296,129304,14,129320,129327,14,129340,129342,14,129356,129356,14,129388,129392,14,129399,129400,14,129404,129407,14,129432,129442,14,129454,129455,14,129473,129474,14,129485,129487,14,129648,129651,14,129659,129660,14,129671,129679,14,129709,129711,14,129728,129730,14,129751,129753,14,129776,129782,14,917505,917505,4,917760,917999,5,10,10,3,127,159,4,768,879,5,1471,1471,5,1536,1541,1,1648,1648,5,1767,1768,5,1840,1866,5,2070,2073,5,2137,2139,5,2274,2274,1,2363,2363,7,2377,2380,7,2402,2403,5,2494,2494,5,2507,2508,7,2558,2558,5,2622,2624,7,2641,2641,5,2691,2691,7,2759,2760,5,2786,2787,5,2876,2876,5,2881,2884,5,2901,2902,5,3006,3006,5,3014,3016,7,3072,3072,5,3134,3136,5,3157,3158,5,3260,3260,5,3266,3266,5,3274,3275,7,3328,3329,5,3391,3392,7,3405,3405,5,3457,3457,5,3536,3537,7,3551,3551,5,3636,3642,5,3764,3772,5,3895,3895,5,3967,3967,7,3993,4028,5,4146,4151,5,4182,4183,7,4226,4226,5,4253,4253,5,4957,4959,5,5940,5940,7,6070,6070,7,6087,6088,7,6158,6158,4,6432,6434,5,6448,6449,7,6679,6680,5,6742,6742,5,6754,6754,5,6783,6783,5,6912,6915,5,6966,6970,5,6978,6978,5,7042,7042,7,7080,7081,5,7143,7143,7,7150,7150,7,7212,7219,5,7380,7392,5,7412,7412,5,8203,8203,4,8232,8232,4,8265,8265,14,8400,8412,5,8421,8432,5,8617,8618,14,9167,9167,14,9200,9200,14,9410,9410,14,9723,9726,14,9733,9733,14,9745,9745,14,9752,9752,14,9760,9760,14,9766,9766,14,9774,9774,14,9786,9786,14,9794,9794,14,9823,9823,14,9828,9828,14,9833,9850,14,9855,9855,14,9875,9875,14,9880,9880,14,9885,9887,14,9896,9897,14,9906,9916,14,9926,9927,14,9935,9935,14,9939,9939,14,9962,9962,14,9972,9972,14,9978,9978,14,9986,9986,14,9997,9997,14,10002,10002,14,10017,10017,14,10055,10055,14,10071,10071,14,10133,10135,14,10548,10549,14,11093,11093,14,12330,12333,5,12441,12442,5,42608,42610,5,43010,43010,5,43045,43046,5,43188,43203,7,43302,43309,5,43392,43394,5,43446,43449,5,43493,43493,5,43571,43572,7,43597,43597,7,43703,43704,5,43756,43757,5,44003,44004,7,44009,44010,7,44033,44059,12,44089,44115,12,44145,44171,12,44201,44227,12,44257,44283,12,44313,44339,12,44369,44395,12,44425,44451,12,44481,44507,12,44537,44563,12,44593,44619,12,44649,44675,12,44705,44731,12,44761,44787,12,44817,44843,12,44873,44899,12,44929,44955,12,44985,45011,12,45041,45067,12,45097,45123,12,45153,45179,12,45209,45235,12,45265,45291,12,45321,45347,12,45377,45403,12,45433,45459,12,45489,45515,12,45545,45571,12,45601,45627,12,45657,45683,12,45713,45739,12,45769,45795,12,45825,45851,12,45881,45907,12,45937,45963,12,45993,46019,12,46049,46075,12,46105,46131,12,46161,46187,12,46217,46243,12,46273,46299,12,46329,46355,12,46385,46411,12,46441,46467,12,46497,46523,12,46553,46579,12,46609,46635,12,46665,46691,12,46721,46747,12,46777,46803,12,46833,46859,12,46889,46915,12,46945,46971,12,47001,47027,12,47057,47083,12,47113,47139,12,47169,47195,12,47225,47251,12,47281,47307,12,47337,47363,12,47393,47419,12,47449,47475,12,47505,47531,12,47561,47587,12,47617,47643,12,47673,47699,12,47729,47755,12,47785,47811,12,47841,47867,12,47897,47923,12,47953,47979,12,48009,48035,12,48065,48091,12,48121,48147,12,48177,48203,12,48233,48259,12,48289,48315,12,48345,48371,12,48401,48427,12,48457,48483,12,48513,48539,12,48569,48595,12,48625,48651,12,48681,48707,12,48737,48763,12,48793,48819,12,48849,48875,12,48905,48931,12,48961,48987,12,49017,49043,12,49073,49099,12,49129,49155,12,49185,49211,12,49241,49267,12,49297,49323,12,49353,49379,12,49409,49435,12,49465,49491,12,49521,49547,12,49577,49603,12,49633,49659,12,49689,49715,12,49745,49771,12,49801,49827,12,49857,49883,12,49913,49939,12,49969,49995,12,50025,50051,12,50081,50107,12,50137,50163,12,50193,50219,12,50249,50275,12,50305,50331,12,50361,50387,12,50417,50443,12,50473,50499,12,50529,50555,12,50585,50611,12,50641,50667,12,50697,50723,12,50753,50779,12,50809,50835,12,50865,50891,12,50921,50947,12,50977,51003,12,51033,51059,12,51089,51115,12,51145,51171,12,51201,51227,12,51257,51283,12,51313,51339,12,51369,51395,12,51425,51451,12,51481,51507,12,51537,51563,12,51593,51619,12,51649,51675,12,51705,51731,12,51761,51787,12,51817,51843,12,51873,51899,12,51929,51955,12,51985,52011,12,52041,52067,12,52097,52123,12,52153,52179,12,52209,52235,12,52265,52291,12,52321,52347,12,52377,52403,12,52433,52459,12,52489,52515,12,52545,52571,12,52601,52627,12,52657,52683,12,52713,52739,12,52769,52795,12,52825,52851,12,52881,52907,12,52937,52963,12,52993,53019,12,53049,53075,12,53105,53131,12,53161,53187,12,53217,53243,12,53273,53299,12,53329,53355,12,53385,53411,12,53441,53467,12,53497,53523,12,53553,53579,12,53609,53635,12,53665,53691,12,53721,53747,12,53777,53803,12,53833,53859,12,53889,53915,12,53945,53971,12,54001,54027,12,54057,54083,12,54113,54139,12,54169,54195,12,54225,54251,12,54281,54307,12,54337,54363,12,54393,54419,12,54449,54475,12,54505,54531,12,54561,54587,12,54617,54643,12,54673,54699,12,54729,54755,12,54785,54811,12,54841,54867,12,54897,54923,12,54953,54979,12,55009,55035,12,55065,55091,12,55121,55147,12,55177,55203,12,65024,65039,5,65520,65528,4,66422,66426,5,68152,68154,5,69291,69292,5,69633,69633,5,69747,69748,5,69811,69814,5,69826,69826,5,69932,69932,7,70016,70017,5,70079,70080,7,70095,70095,5,70196,70196,5,70367,70367,5,70402,70403,7,70464,70464,5,70487,70487,5,70709,70711,7,70725,70725,7,70833,70834,7,70843,70844,7,70849,70849,7,71090,71093,5,71103,71104,5,71227,71228,7,71339,71339,5,71344,71349,5,71458,71461,5,71727,71735,5,71985,71989,7,71998,71998,5,72002,72002,7,72154,72155,5,72193,72202,5,72251,72254,5,72281,72283,5,72344,72345,5,72766,72766,7,72874,72880,5,72885,72886,5,73023,73029,5,73104,73105,5,73111,73111,5,92912,92916,5,94095,94098,5,113824,113827,4,119142,119142,7,119155,119162,4,119362,119364,5,121476,121476,5,122888,122904,5,123184,123190,5,125252,125258,5,127183,127183,14,127340,127343,14,127377,127386,14,127491,127503,14,127548,127551,14,127744,127756,14,127761,127761,14,127769,127769,14,127773,127774,14,127780,127788,14,127796,127797,14,127820,127823,14,127869,127869,14,127894,127895,14,127902,127903,14,127943,127943,14,127947,127950,14,127972,127972,14,127988,127988,14,127992,127994,14,128009,128011,14,128019,128019,14,128023,128041,14,128064,128064,14,128102,128107,14,128174,128181,14,128238,128238,14,128246,128247,14,128254,128254,14,128264,128264,14,128278,128299,14,128329,128330,14,128348,128359,14,128371,128377,14,128392,128393,14,128401,128404,14,128421,128421,14,128433,128434,14,128450,128452,14,128476,128478,14,128483,128483,14,128495,128495,14,128506,128506,14,128519,128520,14,128528,128528,14,128534,128534,14,128538,128538,14,128540,128542,14,128544,128549,14,128552,128555,14,128557,128557,14,128560,128563,14,128565,128565,14,128567,128576,14,128581,128591,14,128641,128642,14,128646,128646,14,128648,128648,14,128650,128651,14,128653,128653,14,128655,128655,14,128657,128659,14,128661,128661,14,128663,128663,14,128665,128666,14,128674,128674,14,128676,128677,14,128679,128685,14,128690,128690,14,128694,128694,14,128697,128702,14,128704,128704,14,128710,128714,14,128716,128716,14,128720,128720,14,128723,128724,14,128726,128727,14,128733,128735,14,128742,128744,14,128746,128746,14,128749,128751,14,128753,128754,14,128756,128758,14,128761,128761,14,128763,128764,14,128884,128895,14,128992,129003,14,129008,129008,14,129036,129039,14,129114,129119,14,129198,129279,14,129293,129295,14,129305,129310,14,129312,129319,14,129328,129328,14,129331,129338,14,129343,129343,14,129351,129355,14,129357,129359,14,129375,129387,14,129393,129393,14,129395,129398,14,129401,129401,14,129403,129403,14,129408,129412,14,129426,129431,14,129443,129444,14,129451,129453,14,129456,129465,14,129472,129472,14,129475,129482,14,129484,129484,14,129488,129510,14,129536,129647,14,129652,129652,14,129656,129658,14,129661,129663,14,129667,129670,14,129680,129685,14,129705,129708,14,129712,129718,14,129723,129727,14,129731,129733,14,129744,129750,14,129754,129759,14,129768,129775,14,129783,129791,14,917504,917504,4,917506,917535,4,917632,917759,4,918000,921599,4,0,9,4,11,12,4,14,31,4,169,169,14,174,174,14,1155,1159,5,1425,1469,5,1473,1474,5,1479,1479,5,1552,1562,5,1611,1631,5,1750,1756,5,1759,1764,5,1770,1773,5,1809,1809,5,1958,1968,5,2045,2045,5,2075,2083,5,2089,2093,5,2192,2193,1,2250,2273,5,2275,2306,5,2362,2362,5,2364,2364,5,2369,2376,5,2381,2381,5,2385,2391,5,2433,2433,5,2492,2492,5,2495,2496,7,2503,2504,7,2509,2509,5,2530,2531,5,2561,2562,5,2620,2620,5,2625,2626,5,2635,2637,5,2672,2673,5,2689,2690,5,2748,2748,5,2753,2757,5,2761,2761,7,2765,2765,5,2810,2815,5,2818,2819,7,2878,2878,5,2880,2880,7,2887,2888,7,2893,2893,5,2903,2903,5,2946,2946,5,3007,3007,7,3009,3010,7,3018,3020,7,3031,3031,5,3073,3075,7,3132,3132,5,3137,3140,7,3146,3149,5,3170,3171,5,3202,3203,7,3262,3262,7,3264,3265,7,3267,3268,7,3271,3272,7,3276,3277,5,3298,3299,5,3330,3331,7,3390,3390,5,3393,3396,5,3402,3404,7,3406,3406,1,3426,3427,5,3458,3459,7,3535,3535,5,3538,3540,5,3544,3550,7,3570,3571,7,3635,3635,7,3655,3662,5,3763,3763,7,3784,3789,5,3893,3893,5,3897,3897,5,3953,3966,5,3968,3972,5,3981,3991,5,4038,4038,5,4145,4145,7,4153,4154,5,4157,4158,5,4184,4185,5,4209,4212,5,4228,4228,7,4237,4237,5,4352,4447,8,4520,4607,10,5906,5908,5,5938,5939,5,5970,5971,5,6068,6069,5,6071,6077,5,6086,6086,5,6089,6099,5,6155,6157,5,6159,6159,5,6313,6313,5,6435,6438,7,6441,6443,7,6450,6450,5,6457,6459,5,6681,6682,7,6741,6741,7,6743,6743,7,6752,6752,5,6757,6764,5,6771,6780,5,6832,6845,5,6847,6862,5,6916,6916,7,6965,6965,5,6971,6971,7,6973,6977,7,6979,6980,7,7040,7041,5,7073,7073,7,7078,7079,7,7082,7082,7,7142,7142,5,7144,7145,5,7149,7149,5,7151,7153,5,7204,7211,7,7220,7221,7,7376,7378,5,7393,7393,7,7405,7405,5,7415,7415,7,7616,7679,5,8204,8204,5,8206,8207,4,8233,8233,4,8252,8252,14,8288,8292,4,8294,8303,4,8413,8416,5,8418,8420,5,8482,8482,14,8596,8601,14,8986,8987,14,9096,9096,14,9193,9196,14,9199,9199,14,9201,9202,14,9208,9210,14,9642,9643,14,9664,9664,14,9728,9729,14,9732,9732,14,9735,9741,14,9743,9744,14,9746,9746,14,9750,9751,14,9753,9756,14,9758,9759,14,9761,9761,14,9764,9765,14,9767,9769,14,9771,9773,14,9775,9775,14,9784,9785,14,9787,9791,14,9793,9793,14,9795,9799,14,9812,9822,14,9824,9824,14,9827,9827,14,9829,9830,14,9832,9832,14,9851,9851,14,9854,9854,14,9856,9861,14,9874,9874,14,9876,9876,14,9878,9879,14,9881,9881,14,9883,9884,14,9888,9889,14,9895,9895,14,9898,9899,14,9904,9905,14,9917,9918,14,9924,9925,14,9928,9928,14,9934,9934,14,9936,9936,14,9938,9938,14,9940,9940,14,9961,9961,14,9963,9967,14,9970,9971,14,9973,9973,14,9975,9977,14,9979,9980,14,9982,9985,14,9987,9988,14,9992,9996,14,9998,9998,14,10000,10001,14,10004,10004,14,10013,10013,14,10024,10024,14,10052,10052,14,10060,10060,14,10067,10069,14,10083,10083,14,10085,10087,14,10145,10145,14,10175,10175,14,11013,11015,14,11088,11088,14,11503,11505,5,11744,11775,5,12334,12335,5,12349,12349,14,12951,12951,14,42607,42607,5,42612,42621,5,42736,42737,5,43014,43014,5,43043,43044,7,43047,43047,7,43136,43137,7,43204,43205,5,43263,43263,5,43335,43345,5,43360,43388,8,43395,43395,7,43444,43445,7,43450,43451,7,43454,43456,7,43561,43566,5,43569,43570,5,43573,43574,5,43596,43596,5,43644,43644,5,43698,43700,5,43710,43711,5,43755,43755,7,43758,43759,7,43766,43766,5,44005,44005,5,44008,44008,5,44012,44012,7,44032,44032,11,44060,44060,11,44088,44088,11,44116,44116,11,44144,44144,11,44172,44172,11,44200,44200,11,44228,44228,11,44256,44256,11,44284,44284,11,44312,44312,11,44340,44340,11,44368,44368,11,44396,44396,11,44424,44424,11,44452,44452,11,44480,44480,11,44508,44508,11,44536,44536,11,44564,44564,11,44592,44592,11,44620,44620,11,44648,44648,11,44676,44676,11,44704,44704,11,44732,44732,11,44760,44760,11,44788,44788,11,44816,44816,11,44844,44844,11,44872,44872,11,44900,44900,11,44928,44928,11,44956,44956,11,44984,44984,11,45012,45012,11,45040,45040,11,45068,45068,11,45096,45096,11,45124,45124,11,45152,45152,11,45180,45180,11,45208,45208,11,45236,45236,11,45264,45264,11,45292,45292,11,45320,45320,11,45348,45348,11,45376,45376,11,45404,45404,11,45432,45432,11,45460,45460,11,45488,45488,11,45516,45516,11,45544,45544,11,45572,45572,11,45600,45600,11,45628,45628,11,45656,45656,11,45684,45684,11,45712,45712,11,45740,45740,11,45768,45768,11,45796,45796,11,45824,45824,11,45852,45852,11,45880,45880,11,45908,45908,11,45936,45936,11,45964,45964,11,45992,45992,11,46020,46020,11,46048,46048,11,46076,46076,11,46104,46104,11,46132,46132,11,46160,46160,11,46188,46188,11,46216,46216,11,46244,46244,11,46272,46272,11,46300,46300,11,46328,46328,11,46356,46356,11,46384,46384,11,46412,46412,11,46440,46440,11,46468,46468,11,46496,46496,11,46524,46524,11,46552,46552,11,46580,46580,11,46608,46608,11,46636,46636,11,46664,46664,11,46692,46692,11,46720,46720,11,46748,46748,11,46776,46776,11,46804,46804,11,46832,46832,11,46860,46860,11,46888,46888,11,46916,46916,11,46944,46944,11,46972,46972,11,47000,47000,11,47028,47028,11,47056,47056,11,47084,47084,11,47112,47112,11,47140,47140,11,47168,47168,11,47196,47196,11,47224,47224,11,47252,47252,11,47280,47280,11,47308,47308,11,47336,47336,11,47364,47364,11,47392,47392,11,47420,47420,11,47448,47448,11,47476,47476,11,47504,47504,11,47532,47532,11,47560,47560,11,47588,47588,11,47616,47616,11,47644,47644,11,47672,47672,11,47700,47700,11,47728,47728,11,47756,47756,11,47784,47784,11,47812,47812,11,47840,47840,11,47868,47868,11,47896,47896,11,47924,47924,11,47952,47952,11,47980,47980,11,48008,48008,11,48036,48036,11,48064,48064,11,48092,48092,11,48120,48120,11,48148,48148,11,48176,48176,11,48204,48204,11,48232,48232,11,48260,48260,11,48288,48288,11,48316,48316,11,48344,48344,11,48372,48372,11,48400,48400,11,48428,48428,11,48456,48456,11,48484,48484,11,48512,48512,11,48540,48540,11,48568,48568,11,48596,48596,11,48624,48624,11,48652,48652,11,48680,48680,11,48708,48708,11,48736,48736,11,48764,48764,11,48792,48792,11,48820,48820,11,48848,48848,11,48876,48876,11,48904,48904,11,48932,48932,11,48960,48960,11,48988,48988,11,49016,49016,11,49044,49044,11,49072,49072,11,49100,49100,11,49128,49128,11,49156,49156,11,49184,49184,11,49212,49212,11,49240,49240,11,49268,49268,11,49296,49296,11,49324,49324,11,49352,49352,11,49380,49380,11,49408,49408,11,49436,49436,11,49464,49464,11,49492,49492,11,49520,49520,11,49548,49548,11,49576,49576,11,49604,49604,11,49632,49632,11,49660,49660,11,49688,49688,11,49716,49716,11,49744,49744,11,49772,49772,11,49800,49800,11,49828,49828,11,49856,49856,11,49884,49884,11,49912,49912,11,49940,49940,11,49968,49968,11,49996,49996,11,50024,50024,11,50052,50052,11,50080,50080,11,50108,50108,11,50136,50136,11,50164,50164,11,50192,50192,11,50220,50220,11,50248,50248,11,50276,50276,11,50304,50304,11,50332,50332,11,50360,50360,11,50388,50388,11,50416,50416,11,50444,50444,11,50472,50472,11,50500,50500,11,50528,50528,11,50556,50556,11,50584,50584,11,50612,50612,11,50640,50640,11,50668,50668,11,50696,50696,11,50724,50724,11,50752,50752,11,50780,50780,11,50808,50808,11,50836,50836,11,50864,50864,11,50892,50892,11,50920,50920,11,50948,50948,11,50976,50976,11,51004,51004,11,51032,51032,11,51060,51060,11,51088,51088,11,51116,51116,11,51144,51144,11,51172,51172,11,51200,51200,11,51228,51228,11,51256,51256,11,51284,51284,11,51312,51312,11,51340,51340,11,51368,51368,11,51396,51396,11,51424,51424,11,51452,51452,11,51480,51480,11,51508,51508,11,51536,51536,11,51564,51564,11,51592,51592,11,51620,51620,11,51648,51648,11,51676,51676,11,51704,51704,11,51732,51732,11,51760,51760,11,51788,51788,11,51816,51816,11,51844,51844,11,51872,51872,11,51900,51900,11,51928,51928,11,51956,51956,11,51984,51984,11,52012,52012,11,52040,52040,11,52068,52068,11,52096,52096,11,52124,52124,11,52152,52152,11,52180,52180,11,52208,52208,11,52236,52236,11,52264,52264,11,52292,52292,11,52320,52320,11,52348,52348,11,52376,52376,11,52404,52404,11,52432,52432,11,52460,52460,11,52488,52488,11,52516,52516,11,52544,52544,11,52572,52572,11,52600,52600,11,52628,52628,11,52656,52656,11,52684,52684,11,52712,52712,11,52740,52740,11,52768,52768,11,52796,52796,11,52824,52824,11,52852,52852,11,52880,52880,11,52908,52908,11,52936,52936,11,52964,52964,11,52992,52992,11,53020,53020,11,53048,53048,11,53076,53076,11,53104,53104,11,53132,53132,11,53160,53160,11,53188,53188,11,53216,53216,11,53244,53244,11,53272,53272,11,53300,53300,11,53328,53328,11,53356,53356,11,53384,53384,11,53412,53412,11,53440,53440,11,53468,53468,11,53496,53496,11,53524,53524,11,53552,53552,11,53580,53580,11,53608,53608,11,53636,53636,11,53664,53664,11,53692,53692,11,53720,53720,11,53748,53748,11,53776,53776,11,53804,53804,11,53832,53832,11,53860,53860,11,53888,53888,11,53916,53916,11,53944,53944,11,53972,53972,11,54000,54000,11,54028,54028,11,54056,54056,11,54084,54084,11,54112,54112,11,54140,54140,11,54168,54168,11,54196,54196,11,54224,54224,11,54252,54252,11,54280,54280,11,54308,54308,11,54336,54336,11,54364,54364,11,54392,54392,11,54420,54420,11,54448,54448,11,54476,54476,11,54504,54504,11,54532,54532,11,54560,54560,11,54588,54588,11,54616,54616,11,54644,54644,11,54672,54672,11,54700,54700,11,54728,54728,11,54756,54756,11,54784,54784,11,54812,54812,11,54840,54840,11,54868,54868,11,54896,54896,11,54924,54924,11,54952,54952,11,54980,54980,11,55008,55008,11,55036,55036,11,55064,55064,11,55092,55092,11,55120,55120,11,55148,55148,11,55176,55176,11,55216,55238,9,64286,64286,5,65056,65071,5,65438,65439,5,65529,65531,4,66272,66272,5,68097,68099,5,68108,68111,5,68159,68159,5,68900,68903,5,69446,69456,5,69632,69632,7,69634,69634,7,69744,69744,5,69759,69761,5,69808,69810,7,69815,69816,7,69821,69821,1,69837,69837,1,69927,69931,5,69933,69940,5,70003,70003,5,70018,70018,7,70070,70078,5,70082,70083,1,70094,70094,7,70188,70190,7,70194,70195,7,70197,70197,7,70206,70206,5,70368,70370,7,70400,70401,5,70459,70460,5,70463,70463,7,70465,70468,7,70475,70477,7,70498,70499,7,70512,70516,5,70712,70719,5,70722,70724,5,70726,70726,5,70832,70832,5,70835,70840,5,70842,70842,5,70845,70845,5,70847,70848,5,70850,70851,5,71088,71089,7,71096,71099,7,71102,71102,7,71132,71133,5,71219,71226,5,71229,71229,5,71231,71232,5,71340,71340,7,71342,71343,7,71350,71350,7,71453,71455,5,71462,71462,7,71724,71726,7,71736,71736,7,71984,71984,5,71991,71992,7,71997,71997,7,71999,71999,1,72001,72001,1,72003,72003,5,72148,72151,5,72156,72159,7,72164,72164,7,72243,72248,5,72250,72250,1,72263,72263,5,72279,72280,7,72324,72329,1,72343,72343,7,72751,72751,7,72760,72765,5,72767,72767,5,72873,72873,7,72881,72881,7,72884,72884,7,73009,73014,5,73020,73021,5,73030,73030,1,73098,73102,7,73107,73108,7,73110,73110,7,73459,73460,5,78896,78904,4,92976,92982,5,94033,94087,7,94180,94180,5,113821,113822,5,118528,118573,5,119141,119141,5,119143,119145,5,119150,119154,5,119163,119170,5,119210,119213,5,121344,121398,5,121461,121461,5,121499,121503,5,122880,122886,5,122907,122913,5,122918,122922,5,123566,123566,5,125136,125142,5,126976,126979,14,126981,127182,14,127184,127231,14,127279,127279,14,127344,127345,14,127374,127374,14,127405,127461,14,127489,127490,14,127514,127514,14,127538,127546,14,127561,127567,14,127570,127743,14,127757,127758,14,127760,127760,14,127762,127762,14,127766,127768,14,127770,127770,14,127772,127772,14,127775,127776,14,127778,127779,14,127789,127791,14,127794,127795,14,127798,127798,14,127819,127819,14,127824,127824,14,127868,127868,14,127870,127871,14,127892,127893,14,127896,127896,14,127900,127901,14,127904,127940,14,127942,127942,14,127944,127944,14,127946,127946,14,127951,127955,14,127968,127971,14,127973,127984,14,127987,127987,14,127989,127989,14,127991,127991,14,127995,127999,5,128008,128008,14,128012,128014,14,128017,128018,14,128020,128020,14,128022,128022,14,128042,128042,14,128063,128063,14,128065,128065,14,128101,128101,14,128108,128109,14,128173,128173,14,128182,128183,14,128236,128237,14,128239,128239,14,128245,128245,14,128248,128248,14,128253,128253,14,128255,128258,14,128260,128263,14,128265,128265,14,128277,128277,14,128300,128301,14,128326,128328,14,128331,128334,14,128336,128347,14,128360,128366,14,128369,128370,14,128378,128378,14,128391,128391,14,128394,128397,14,128400,128400,14,128405,128406,14,128420,128420,14,128422,128423,14,128425,128432,14,128435,128443,14,128445,128449,14,128453,128464,14,128468,128475,14,128479,128480,14,128482,128482,14,128484,128487,14,128489,128494,14,128496,128498,14,128500,128505,14,128507,128511,14,128513,128518,14,128521,128525,14,128527,128527,14,128529,128529,14,128533,128533,14,128535,128535,14,128537,128537,14]")}var fi;(function(e){e[e.zwj=8205]="zwj",e[e.emojiVariantSelector=65039]="emojiVariantSelector",e[e.enclosingKeyCap=8419]="enclosingKeyCap",e[e.space=32]="space"})(fi||(fi={}));class Cs{static{this.ambiguousCharacterData=new jl(()=>JSON.parse('{"_common":[8232,32,8233,32,5760,32,8192,32,8193,32,8194,32,8195,32,8196,32,8197,32,8198,32,8200,32,8201,32,8202,32,8287,32,8199,32,8239,32,2042,95,65101,95,65102,95,65103,95,8208,45,8209,45,8210,45,65112,45,1748,45,8259,45,727,45,8722,45,10134,45,11450,45,1549,44,1643,44,184,44,42233,44,894,59,2307,58,2691,58,1417,58,1795,58,1796,58,5868,58,65072,58,6147,58,6153,58,8282,58,1475,58,760,58,42889,58,8758,58,720,58,42237,58,451,33,11601,33,660,63,577,63,2429,63,5038,63,42731,63,119149,46,8228,46,1793,46,1794,46,42510,46,68176,46,1632,46,1776,46,42232,46,1373,96,65287,96,8219,96,1523,96,8242,96,1370,96,8175,96,65344,96,900,96,8189,96,8125,96,8127,96,8190,96,697,96,884,96,712,96,714,96,715,96,756,96,699,96,701,96,700,96,702,96,42892,96,1497,96,2036,96,2037,96,5194,96,5836,96,94033,96,94034,96,65339,91,10088,40,10098,40,12308,40,64830,40,65341,93,10089,41,10099,41,12309,41,64831,41,10100,123,119060,123,10101,125,65342,94,8270,42,1645,42,8727,42,66335,42,5941,47,8257,47,8725,47,8260,47,9585,47,10187,47,10744,47,119354,47,12755,47,12339,47,11462,47,20031,47,12035,47,65340,92,65128,92,8726,92,10189,92,10741,92,10745,92,119311,92,119355,92,12756,92,20022,92,12034,92,42872,38,708,94,710,94,5869,43,10133,43,66203,43,8249,60,10094,60,706,60,119350,60,5176,60,5810,60,5120,61,11840,61,12448,61,42239,61,8250,62,10095,62,707,62,119351,62,5171,62,94015,62,8275,126,732,126,8128,126,8764,126,65372,124,65293,45,118002,50,120784,50,120794,50,120804,50,120814,50,120824,50,130034,50,42842,50,423,50,1000,50,42564,50,5311,50,42735,50,119302,51,118003,51,120785,51,120795,51,120805,51,120815,51,120825,51,130035,51,42923,51,540,51,439,51,42858,51,11468,51,1248,51,94011,51,71882,51,118004,52,120786,52,120796,52,120806,52,120816,52,120826,52,130036,52,5070,52,71855,52,118005,53,120787,53,120797,53,120807,53,120817,53,120827,53,130037,53,444,53,71867,53,118006,54,120788,54,120798,54,120808,54,120818,54,120828,54,130038,54,11474,54,5102,54,71893,54,119314,55,118007,55,120789,55,120799,55,120809,55,120819,55,120829,55,130039,55,66770,55,71878,55,2819,56,2538,56,2666,56,125131,56,118008,56,120790,56,120800,56,120810,56,120820,56,120830,56,130040,56,547,56,546,56,66330,56,2663,57,2920,57,2541,57,3437,57,118009,57,120791,57,120801,57,120811,57,120821,57,120831,57,130041,57,42862,57,11466,57,71884,57,71852,57,71894,57,9082,97,65345,97,119834,97,119886,97,119938,97,119990,97,120042,97,120094,97,120146,97,120198,97,120250,97,120302,97,120354,97,120406,97,120458,97,593,97,945,97,120514,97,120572,97,120630,97,120688,97,120746,97,65313,65,117974,65,119808,65,119860,65,119912,65,119964,65,120016,65,120068,65,120120,65,120172,65,120224,65,120276,65,120328,65,120380,65,120432,65,913,65,120488,65,120546,65,120604,65,120662,65,120720,65,5034,65,5573,65,42222,65,94016,65,66208,65,119835,98,119887,98,119939,98,119991,98,120043,98,120095,98,120147,98,120199,98,120251,98,120303,98,120355,98,120407,98,120459,98,388,98,5071,98,5234,98,5551,98,65314,66,8492,66,117975,66,119809,66,119861,66,119913,66,120017,66,120069,66,120121,66,120173,66,120225,66,120277,66,120329,66,120381,66,120433,66,42932,66,914,66,120489,66,120547,66,120605,66,120663,66,120721,66,5108,66,5623,66,42192,66,66178,66,66209,66,66305,66,65347,99,8573,99,119836,99,119888,99,119940,99,119992,99,120044,99,120096,99,120148,99,120200,99,120252,99,120304,99,120356,99,120408,99,120460,99,7428,99,1010,99,11429,99,43951,99,66621,99,128844,67,71913,67,71922,67,65315,67,8557,67,8450,67,8493,67,117976,67,119810,67,119862,67,119914,67,119966,67,120018,67,120174,67,120226,67,120278,67,120330,67,120382,67,120434,67,1017,67,11428,67,5087,67,42202,67,66210,67,66306,67,66581,67,66844,67,8574,100,8518,100,119837,100,119889,100,119941,100,119993,100,120045,100,120097,100,120149,100,120201,100,120253,100,120305,100,120357,100,120409,100,120461,100,1281,100,5095,100,5231,100,42194,100,8558,68,8517,68,117977,68,119811,68,119863,68,119915,68,119967,68,120019,68,120071,68,120123,68,120175,68,120227,68,120279,68,120331,68,120383,68,120435,68,5024,68,5598,68,5610,68,42195,68,8494,101,65349,101,8495,101,8519,101,119838,101,119890,101,119942,101,120046,101,120098,101,120150,101,120202,101,120254,101,120306,101,120358,101,120410,101,120462,101,43826,101,1213,101,8959,69,65317,69,8496,69,117978,69,119812,69,119864,69,119916,69,120020,69,120072,69,120124,69,120176,69,120228,69,120280,69,120332,69,120384,69,120436,69,917,69,120492,69,120550,69,120608,69,120666,69,120724,69,11577,69,5036,69,42224,69,71846,69,71854,69,66182,69,119839,102,119891,102,119943,102,119995,102,120047,102,120099,102,120151,102,120203,102,120255,102,120307,102,120359,102,120411,102,120463,102,43829,102,42905,102,383,102,7837,102,1412,102,119315,70,8497,70,117979,70,119813,70,119865,70,119917,70,120021,70,120073,70,120125,70,120177,70,120229,70,120281,70,120333,70,120385,70,120437,70,42904,70,988,70,120778,70,5556,70,42205,70,71874,70,71842,70,66183,70,66213,70,66853,70,65351,103,8458,103,119840,103,119892,103,119944,103,120048,103,120100,103,120152,103,120204,103,120256,103,120308,103,120360,103,120412,103,120464,103,609,103,7555,103,397,103,1409,103,117980,71,119814,71,119866,71,119918,71,119970,71,120022,71,120074,71,120126,71,120178,71,120230,71,120282,71,120334,71,120386,71,120438,71,1292,71,5056,71,5107,71,42198,71,65352,104,8462,104,119841,104,119945,104,119997,104,120049,104,120101,104,120153,104,120205,104,120257,104,120309,104,120361,104,120413,104,120465,104,1211,104,1392,104,5058,104,65320,72,8459,72,8460,72,8461,72,117981,72,119815,72,119867,72,119919,72,120023,72,120179,72,120231,72,120283,72,120335,72,120387,72,120439,72,919,72,120494,72,120552,72,120610,72,120668,72,120726,72,11406,72,5051,72,5500,72,42215,72,66255,72,731,105,9075,105,65353,105,8560,105,8505,105,8520,105,119842,105,119894,105,119946,105,119998,105,120050,105,120102,105,120154,105,120206,105,120258,105,120310,105,120362,105,120414,105,120466,105,120484,105,618,105,617,105,953,105,8126,105,890,105,120522,105,120580,105,120638,105,120696,105,120754,105,1110,105,42567,105,1231,105,43893,105,5029,105,71875,105,65354,106,8521,106,119843,106,119895,106,119947,106,119999,106,120051,106,120103,106,120155,106,120207,106,120259,106,120311,106,120363,106,120415,106,120467,106,1011,106,1112,106,65322,74,117983,74,119817,74,119869,74,119921,74,119973,74,120025,74,120077,74,120129,74,120181,74,120233,74,120285,74,120337,74,120389,74,120441,74,42930,74,895,74,1032,74,5035,74,5261,74,42201,74,119844,107,119896,107,119948,107,120000,107,120052,107,120104,107,120156,107,120208,107,120260,107,120312,107,120364,107,120416,107,120468,107,8490,75,65323,75,117984,75,119818,75,119870,75,119922,75,119974,75,120026,75,120078,75,120130,75,120182,75,120234,75,120286,75,120338,75,120390,75,120442,75,922,75,120497,75,120555,75,120613,75,120671,75,120729,75,11412,75,5094,75,5845,75,42199,75,66840,75,1472,108,8739,73,9213,73,65512,73,1633,108,1777,73,66336,108,125127,108,118001,108,120783,73,120793,73,120803,73,120813,73,120823,73,130033,73,65321,73,8544,73,8464,73,8465,73,117982,108,119816,73,119868,73,119920,73,120024,73,120128,73,120180,73,120232,73,120284,73,120336,73,120388,73,120440,73,65356,108,8572,73,8467,108,119845,108,119897,108,119949,108,120001,108,120053,108,120105,73,120157,73,120209,73,120261,73,120313,73,120365,73,120417,73,120469,73,448,73,120496,73,120554,73,120612,73,120670,73,120728,73,11410,73,1030,73,1216,73,1493,108,1503,108,1575,108,126464,108,126592,108,65166,108,65165,108,1994,108,11599,73,5825,73,42226,73,93992,73,66186,124,66313,124,119338,76,8556,76,8466,76,117985,76,119819,76,119871,76,119923,76,120027,76,120079,76,120131,76,120183,76,120235,76,120287,76,120339,76,120391,76,120443,76,11472,76,5086,76,5290,76,42209,76,93974,76,71843,76,71858,76,66587,76,66854,76,65325,77,8559,77,8499,77,117986,77,119820,77,119872,77,119924,77,120028,77,120080,77,120132,77,120184,77,120236,77,120288,77,120340,77,120392,77,120444,77,924,77,120499,77,120557,77,120615,77,120673,77,120731,77,1018,77,11416,77,5047,77,5616,77,5846,77,42207,77,66224,77,66321,77,119847,110,119899,110,119951,110,120003,110,120055,110,120107,110,120159,110,120211,110,120263,110,120315,110,120367,110,120419,110,120471,110,1400,110,1404,110,65326,78,8469,78,117987,78,119821,78,119873,78,119925,78,119977,78,120029,78,120081,78,120185,78,120237,78,120289,78,120341,78,120393,78,120445,78,925,78,120500,78,120558,78,120616,78,120674,78,120732,78,11418,78,42208,78,66835,78,3074,111,3202,111,3330,111,3458,111,2406,111,2662,111,2790,111,3046,111,3174,111,3302,111,3430,111,3664,111,3792,111,4160,111,1637,111,1781,111,65359,111,8500,111,119848,111,119900,111,119952,111,120056,111,120108,111,120160,111,120212,111,120264,111,120316,111,120368,111,120420,111,120472,111,7439,111,7441,111,43837,111,959,111,120528,111,120586,111,120644,111,120702,111,120760,111,963,111,120532,111,120590,111,120648,111,120706,111,120764,111,11423,111,4351,111,1413,111,1505,111,1607,111,126500,111,126564,111,126596,111,65259,111,65260,111,65258,111,65257,111,1726,111,64428,111,64429,111,64427,111,64426,111,1729,111,64424,111,64425,111,64423,111,64422,111,1749,111,3360,111,4125,111,66794,111,71880,111,71895,111,66604,111,1984,79,2534,79,2918,79,12295,79,70864,79,71904,79,118000,79,120782,79,120792,79,120802,79,120812,79,120822,79,130032,79,65327,79,117988,79,119822,79,119874,79,119926,79,119978,79,120030,79,120082,79,120134,79,120186,79,120238,79,120290,79,120342,79,120394,79,120446,79,927,79,120502,79,120560,79,120618,79,120676,79,120734,79,11422,79,1365,79,11604,79,4816,79,2848,79,66754,79,42227,79,71861,79,66194,79,66219,79,66564,79,66838,79,9076,112,65360,112,119849,112,119901,112,119953,112,120005,112,120057,112,120109,112,120161,112,120213,112,120265,112,120317,112,120369,112,120421,112,120473,112,961,112,120530,112,120544,112,120588,112,120602,112,120646,112,120660,112,120704,112,120718,112,120762,112,120776,112,11427,112,65328,80,8473,80,117989,80,119823,80,119875,80,119927,80,119979,80,120031,80,120083,80,120187,80,120239,80,120291,80,120343,80,120395,80,120447,80,929,80,120504,80,120562,80,120620,80,120678,80,120736,80,11426,80,5090,80,5229,80,42193,80,66197,80,119850,113,119902,113,119954,113,120006,113,120058,113,120110,113,120162,113,120214,113,120266,113,120318,113,120370,113,120422,113,120474,113,1307,113,1379,113,1382,113,8474,81,117990,81,119824,81,119876,81,119928,81,119980,81,120032,81,120084,81,120188,81,120240,81,120292,81,120344,81,120396,81,120448,81,11605,81,119851,114,119903,114,119955,114,120007,114,120059,114,120111,114,120163,114,120215,114,120267,114,120319,114,120371,114,120423,114,120475,114,43847,114,43848,114,7462,114,11397,114,43905,114,119318,82,8475,82,8476,82,8477,82,117991,82,119825,82,119877,82,119929,82,120033,82,120189,82,120241,82,120293,82,120345,82,120397,82,120449,82,422,82,5025,82,5074,82,66740,82,5511,82,42211,82,94005,82,65363,115,119852,115,119904,115,119956,115,120008,115,120060,115,120112,115,120164,115,120216,115,120268,115,120320,115,120372,115,120424,115,120476,115,42801,115,445,115,1109,115,43946,115,71873,115,66632,115,65331,83,117992,83,119826,83,119878,83,119930,83,119982,83,120034,83,120086,83,120138,83,120190,83,120242,83,120294,83,120346,83,120398,83,120450,83,1029,83,1359,83,5077,83,5082,83,42210,83,94010,83,66198,83,66592,83,119853,116,119905,116,119957,116,120009,116,120061,116,120113,116,120165,116,120217,116,120269,116,120321,116,120373,116,120425,116,120477,116,8868,84,10201,84,128872,84,65332,84,117993,84,119827,84,119879,84,119931,84,119983,84,120035,84,120087,84,120139,84,120191,84,120243,84,120295,84,120347,84,120399,84,120451,84,932,84,120507,84,120565,84,120623,84,120681,84,120739,84,11430,84,5026,84,42196,84,93962,84,71868,84,66199,84,66225,84,66325,84,119854,117,119906,117,119958,117,120010,117,120062,117,120114,117,120166,117,120218,117,120270,117,120322,117,120374,117,120426,117,120478,117,42911,117,7452,117,43854,117,43858,117,651,117,965,117,120534,117,120592,117,120650,117,120708,117,120766,117,1405,117,66806,117,71896,117,8746,85,8899,85,117994,85,119828,85,119880,85,119932,85,119984,85,120036,85,120088,85,120140,85,120192,85,120244,85,120296,85,120348,85,120400,85,120452,85,1357,85,4608,85,66766,85,5196,85,42228,85,94018,85,71864,85,8744,118,8897,118,65366,118,8564,118,119855,118,119907,118,119959,118,120011,118,120063,118,120115,118,120167,118,120219,118,120271,118,120323,118,120375,118,120427,118,120479,118,7456,118,957,118,120526,118,120584,118,120642,118,120700,118,120758,118,1141,118,1496,118,71430,118,43945,118,71872,118,119309,86,1639,86,1783,86,8548,86,117995,86,119829,86,119881,86,119933,86,119985,86,120037,86,120089,86,120141,86,120193,86,120245,86,120297,86,120349,86,120401,86,120453,86,1140,86,11576,86,5081,86,5167,86,42719,86,42214,86,93960,86,71840,86,66845,86,623,119,119856,119,119908,119,119960,119,120012,119,120064,119,120116,119,120168,119,120220,119,120272,119,120324,119,120376,119,120428,119,120480,119,7457,119,1121,119,1309,119,1377,119,71434,119,71438,119,71439,119,43907,119,71910,87,71919,87,117996,87,119830,87,119882,87,119934,87,119986,87,120038,87,120090,87,120142,87,120194,87,120246,87,120298,87,120350,87,120402,87,120454,87,1308,87,5043,87,5076,87,42218,87,5742,120,10539,120,10540,120,10799,120,65368,120,8569,120,119857,120,119909,120,119961,120,120013,120,120065,120,120117,120,120169,120,120221,120,120273,120,120325,120,120377,120,120429,120,120481,120,5441,120,5501,120,5741,88,9587,88,66338,88,71916,88,65336,88,8553,88,117997,88,119831,88,119883,88,119935,88,119987,88,120039,88,120091,88,120143,88,120195,88,120247,88,120299,88,120351,88,120403,88,120455,88,42931,88,935,88,120510,88,120568,88,120626,88,120684,88,120742,88,11436,88,11613,88,5815,88,42219,88,66192,88,66228,88,66327,88,66855,88,611,121,7564,121,65369,121,119858,121,119910,121,119962,121,120014,121,120066,121,120118,121,120170,121,120222,121,120274,121,120326,121,120378,121,120430,121,120482,121,655,121,7935,121,43866,121,947,121,8509,121,120516,121,120574,121,120632,121,120690,121,120748,121,1199,121,4327,121,71900,121,65337,89,117998,89,119832,89,119884,89,119936,89,119988,89,120040,89,120092,89,120144,89,120196,89,120248,89,120300,89,120352,89,120404,89,120456,89,933,89,978,89,120508,89,120566,89,120624,89,120682,89,120740,89,11432,89,1198,89,5033,89,5053,89,42220,89,94019,89,71844,89,66226,89,119859,122,119911,122,119963,122,120015,122,120067,122,120119,122,120171,122,120223,122,120275,122,120327,122,120379,122,120431,122,120483,122,7458,122,43923,122,71876,122,71909,90,66293,90,65338,90,8484,90,8488,90,117999,90,119833,90,119885,90,119937,90,119989,90,120041,90,120197,90,120249,90,120301,90,120353,90,120405,90,120457,90,918,90,120493,90,120551,90,120609,90,120667,90,120725,90,5059,90,42204,90,71849,90,65282,34,65283,35,65284,36,65285,37,65286,38,65290,42,65291,43,65294,46,65295,47,65296,48,65298,50,65299,51,65300,52,65301,53,65302,54,65303,55,65304,56,65305,57,65308,60,65309,61,65310,62,65312,64,65316,68,65318,70,65319,71,65324,76,65329,81,65330,82,65333,85,65334,86,65335,87,65343,95,65346,98,65348,100,65350,102,65355,107,65357,109,65358,110,65361,113,65362,114,65364,116,65365,117,65367,119,65370,122,65371,123,65373,125,119846,109],"_default":[160,32,8211,45,65374,126,8218,44,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65288,40,65289,41,65292,44,65297,49,65307,59,65311,63],"cs":[65374,126,8218,44,65306,58,65281,33,8216,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,1093,120,1061,88,1091,121,1059,89,65288,40,65289,41,65292,44,65297,49,65307,59,65311,63],"de":[65374,126,65306,58,65281,33,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,1093,120,1061,88,1091,121,1059,89,65288,40,65289,41,65292,44,65297,49,65307,59,65311,63],"es":[8211,45,65374,126,8218,44,65306,58,65281,33,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65288,40,65289,41,65292,44,65297,49,65307,59,65311,63],"fr":[65374,126,8218,44,65306,58,65281,33,8216,96,8245,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65288,40,65289,41,65292,44,65297,49,65307,59,65311,63],"it":[160,32,8211,45,65374,126,8218,44,65306,58,65281,33,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65288,40,65289,41,65292,44,65297,49,65307,59,65311,63],"ja":[8211,45,8218,44,65281,33,8216,96,8245,96,180,96,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65292,44,65297,49,65307,59],"ko":[8211,45,65374,126,8218,44,65306,58,65281,33,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65288,40,65289,41,65292,44,65297,49,65307,59,65311,63],"pl":[65374,126,65306,58,65281,33,8216,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65288,40,65289,41,65292,44,65297,49,65307,59,65311,63],"pt-BR":[65374,126,8218,44,65306,58,65281,33,8216,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65288,40,65289,41,65292,44,65297,49,65307,59,65311,63],"qps-ploc":[160,32,8211,45,65374,126,8218,44,65306,58,65281,33,8216,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65288,40,65289,41,65292,44,65297,49,65307,59,65311,63],"ru":[65374,126,8218,44,65306,58,65281,33,8216,96,8245,96,180,96,12494,47,305,105,921,73,1009,112,215,120,65288,40,65289,41,65292,44,65297,49,65307,59,65311,63],"tr":[160,32,8211,45,65374,126,8218,44,65306,58,65281,33,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65288,40,65289,41,65292,44,65297,49,65307,59,65311,63],"zh-hans":[160,32,65374,126,8218,44,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65297,49],"zh-hant":[8211,45,65374,126,8218,44,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89]}'))}static{this.cache=new Ck({getCacheKey:JSON.stringify},t=>{function n(u){const f=new Map;for(let h=0;h<u.length;h+=2)f.set(u[h],u[h+1]);return f}function s(u,f){const h=new Map(u);for(const[p,d]of f)h.set(p,d);return h}function r(u,f){if(!u)return f;const h=new Map;for(const[p,d]of u)f.has(p)&&h.set(p,d);return h}const o=this.ambiguousCharacterData.value;let i=t.filter(u=>!u.startsWith("_")&&u in o);i.length===0&&(i=["_default"]);let a;for(const u of i){const f=n(o[u]);a=r(a,f)}const l=n(o._common),c=s(l,a);return new Cs(c)})}static getInstance(t){return Cs.cache.get(Array.from(t))}static{this._locales=new jl(()=>Object.keys(Cs.ambiguousCharacterData.value).filter(t=>!t.startsWith("_")))}static getLocales(){return Cs._locales.value}constructor(t){this.confusableDictionary=t}isAmbiguous(t){return this.confusableDictionary.has(t)}containsAmbiguousCharacter(t){for(let n=0;n<t.length;n++){const s=t.codePointAt(n);if(typeof s=="number"&&this.isAmbiguous(s))return!0}return!1}getPrimaryConfusable(t){return this.confusableDictionary.get(t)}getConfusableCodePoints(){return new Set(this.confusableDictionary.keys())}}class zs{static getRawData(){return JSON.parse('{"_common":[11,12,13,127,847,1564,4447,4448,6068,6069,6155,6156,6157,6158,7355,7356,8192,8193,8194,8195,8196,8197,8198,8199,8200,8201,8202,8204,8205,8206,8207,8234,8235,8236,8237,8238,8239,8287,8288,8289,8290,8291,8292,8293,8294,8295,8296,8297,8298,8299,8300,8301,8302,8303,10240,12644,65024,65025,65026,65027,65028,65029,65030,65031,65032,65033,65034,65035,65036,65037,65038,65039,65279,65440,65520,65521,65522,65523,65524,65525,65526,65527,65528,65532,78844,119155,119156,119157,119158,119159,119160,119161,119162,917504,917505,917506,917507,917508,917509,917510,917511,917512,917513,917514,917515,917516,917517,917518,917519,917520,917521,917522,917523,917524,917525,917526,917527,917528,917529,917530,917531,917532,917533,917534,917535,917536,917537,917538,917539,917540,917541,917542,917543,917544,917545,917546,917547,917548,917549,917550,917551,917552,917553,917554,917555,917556,917557,917558,917559,917560,917561,917562,917563,917564,917565,917566,917567,917568,917569,917570,917571,917572,917573,917574,917575,917576,917577,917578,917579,917580,917581,917582,917583,917584,917585,917586,917587,917588,917589,917590,917591,917592,917593,917594,917595,917596,917597,917598,917599,917600,917601,917602,917603,917604,917605,917606,917607,917608,917609,917610,917611,917612,917613,917614,917615,917616,917617,917618,917619,917620,917621,917622,917623,917624,917625,917626,917627,917628,917629,917630,917631,917760,917761,917762,917763,917764,917765,917766,917767,917768,917769,917770,917771,917772,917773,917774,917775,917776,917777,917778,917779,917780,917781,917782,917783,917784,917785,917786,917787,917788,917789,917790,917791,917792,917793,917794,917795,917796,917797,917798,917799,917800,917801,917802,917803,917804,917805,917806,917807,917808,917809,917810,917811,917812,917813,917814,917815,917816,917817,917818,917819,917820,917821,917822,917823,917824,917825,917826,917827,917828,917829,917830,917831,917832,917833,917834,917835,917836,917837,917838,917839,917840,917841,917842,917843,917844,917845,917846,917847,917848,917849,917850,917851,917852,917853,917854,917855,917856,917857,917858,917859,917860,917861,917862,917863,917864,917865,917866,917867,917868,917869,917870,917871,917872,917873,917874,917875,917876,917877,917878,917879,917880,917881,917882,917883,917884,917885,917886,917887,917888,917889,917890,917891,917892,917893,917894,917895,917896,917897,917898,917899,917900,917901,917902,917903,917904,917905,917906,917907,917908,917909,917910,917911,917912,917913,917914,917915,917916,917917,917918,917919,917920,917921,917922,917923,917924,917925,917926,917927,917928,917929,917930,917931,917932,917933,917934,917935,917936,917937,917938,917939,917940,917941,917942,917943,917944,917945,917946,917947,917948,917949,917950,917951,917952,917953,917954,917955,917956,917957,917958,917959,917960,917961,917962,917963,917964,917965,917966,917967,917968,917969,917970,917971,917972,917973,917974,917975,917976,917977,917978,917979,917980,917981,917982,917983,917984,917985,917986,917987,917988,917989,917990,917991,917992,917993,917994,917995,917996,917997,917998,917999],"cs":[173,8203,12288],"de":[173,8203,12288],"es":[8203,12288],"fr":[173,8203,12288],"it":[160,173,12288],"ja":[173],"ko":[173,12288],"pl":[173,8203,12288],"pt-BR":[173,8203,12288],"qps-ploc":[160,173,8203,12288],"ru":[173,12288],"tr":[160,173,8203,12288],"zh-hans":[160,173,8203,12288],"zh-hant":[173,12288]}')}static{this._data=void 0}static getData(){return this._data||(this._data=new Set([...Object.values(zs.getRawData())].flat())),this._data}static isInvisibleCharacter(t){return zs.getData().has(t)}static containsInvisibleCharacter(t){for(let n=0;n<t.length;n++){const s=t.codePointAt(n);if(typeof s=="number"&&(zs.isInvisibleCharacter(s)||s===fi.space))return!0}return!1}static get codePoints(){return zs.getData()}}function gn(e){return e===Z.Slash||e===Z.Backslash}function mh(e){return e.replace(/[\\/]/g,Nt.sep)}function jk(e){return e.indexOf("/")===-1&&(e=mh(e)),/^[a-zA-Z]:(\/|$)/.test(e)&&(e="/"+e),e}function Yl(e,t=Nt.sep){if(!e)return"";const n=e.length,s=e.charCodeAt(0);if(gn(s)){if(gn(e.charCodeAt(1))&&!gn(e.charCodeAt(2))){let o=3;const i=o;for(;o<n&&!gn(e.charCodeAt(o));o++);if(i!==o&&!gn(e.charCodeAt(o+1))){for(o+=1;o<n;o++)if(gn(e.charCodeAt(o)))return e.slice(0,o+1).replace(/[\\/]/g,t)}}return t}else if(Xk(s)&&e.charCodeAt(1)===Z.Colon)return gn(e.charCodeAt(2))?e.slice(0,2)+t:e.slice(0,2);let r=e.indexOf("://");if(r!==-1){for(r+=3;r<n;r++)if(gn(e.charCodeAt(r)))return e.slice(0,r+1)}return""}function Zl(e,t,n,s=wr){if(e===t)return!0;if(!e||!t||t.length>e.length)return!1;if(n){if(!Gk(e,t))return!1;if(t.length===e.length)return!0;let o=t.length;return t.charAt(t.length-1)===s&&o--,e.charAt(o)===s}return t.charAt(t.length-1)!==s&&(t+=s),e.indexOf(t)===0}function Xk(e){return e>=Z.A&&e<=Z.Z||e>=Z.a&&e<=Z.z}var hi;(function(e){e[e.Uri=1]="Uri",e[e.Regexp=2]="Regexp",e[e.ScmResource=3]="ScmResource",e[e.ScmResourceGroup=4]="ScmResourceGroup",e[e.ScmProvider=5]="ScmProvider",e[e.CommentController=6]="CommentController",e[e.CommentThread=7]="CommentThread",e[e.CommentThreadInstance=8]="CommentThreadInstance",e[e.CommentThreadReply=9]="CommentThreadReply",e[e.CommentNode=10]="CommentNode",e[e.CommentThreadNode=11]="CommentThreadNode",e[e.TimelineActionContext=12]="TimelineActionContext",e[e.NotebookCellActionContext=13]="NotebookCellActionContext",e[e.NotebookActionContext=14]="NotebookActionContext",e[e.TerminalContext=15]="TerminalContext",e[e.TestItemContext=16]="TestItemContext",e[e.Date=17]="Date",e[e.TestMessageMenuArgs=18]="TestMessageMenuArgs",e[e.ChatViewContext=19]="ChatViewContext",e[e.LanguageModelToolResult=20]="LanguageModelToolResult",e[e.LanguageModelTextPart=21]="LanguageModelTextPart",e[e.LanguageModelPromptTsxPart=22]="LanguageModelPromptTsxPart",e[e.LanguageModelDataPart=23]="LanguageModelDataPart",e[e.LanguageModelExtraDataPart=24]="LanguageModelExtraDataPart"})(hi||(hi={}));const Yk=/^\w[\w\d+.-]*$/,Zk=/^\//,Jk=/^\/\//;function Qk(e,t){if(!e.scheme&&t)throw new Error(`[UriError]: Scheme is missing: {scheme: "", authority: "${e.authority}", path: "${e.path}", query: "${e.query}", fragment: "${e.fragment}"}`);if(e.scheme&&!Yk.test(e.scheme))throw new Error("[UriError]: Scheme contains illegal characters.");if(e.path){if(e.authority){if(!Zk.test(e.path))throw new Error('[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash ("/") character')}else if(Jk.test(e.path))throw new Error('[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters ("//")')}}function tS(e,t){return!e&&!t?"file":e}function eS(e,t){switch(e){case"https":case"http":case"file":t?t[0]!==Ae&&(t=Ae+t):t=Ae;break}return t}const yt="",Ae="/",nS=/^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;class jt{static isUri(t){return t instanceof jt?!0:t?typeof t.authority=="string"&&typeof t.fragment=="string"&&typeof t.path=="string"&&typeof t.query=="string"&&typeof t.scheme=="string"&&typeof t.fsPath=="string"&&typeof t.with=="function"&&typeof t.toString=="function":!1}constructor(t,n,s,r,o,i=!1){typeof t=="object"?(this.scheme=t.scheme||yt,this.authority=t.authority||yt,this.path=t.path||yt,this.query=t.query||yt,this.fragment=t.fragment||yt):(this.scheme=tS(t,i),this.authority=n||yt,this.path=eS(this.scheme,s||yt),this.query=r||yt,this.fragment=o||yt,Qk(this,i))}get fsPath(){return Gr(this,!1)}with(t){if(!t)return this;let{scheme:n,authority:s,path:r,query:o,fragment:i}=t;return n===void 0?n=this.scheme:n===null&&(n=yt),s===void 0?s=this.authority:s===null&&(s=yt),r===void 0?r=this.path:r===null&&(r=yt),o===void 0?o=this.query:o===null&&(o=yt),i===void 0?i=this.fragment:i===null&&(i=yt),n===this.scheme&&s===this.authority&&r===this.path&&o===this.query&&i===this.fragment?this:new es(n,s,r,o,i)}static parse(t,n=!1){const s=nS.exec(t);return s?new es(s[2]||yt,ur(s[4]||yt),ur(s[5]||yt),ur(s[7]||yt),ur(s[9]||yt),n):new es(yt,yt,yt,yt,yt)}static file(t){let n=yt;if(ks&&(t=t.replace(/\\/g,Ae)),t[0]===Ae&&t[1]===Ae){const s=t.indexOf(Ae,2);s===-1?(n=t.substring(2),t=Ae):(n=t.substring(2,s),t=t.substring(s)||Ae)}return new es("file",n,t,yt,yt)}static from(t,n){return new es(t.scheme,t.authority,t.path,t.query,t.fragment,n)}static joinPath(t,...n){if(!t.path)throw new Error("[UriError]: cannot call joinPath on URI without path");let s;return ks&&t.scheme==="file"?s=jt.file(qt.join(Gr(t,!0),...n)).path:s=Nt.join(t.path,...n),t.with({path:s})}toString(t=!1){return pi(this,t)}toJSON(){return this}static revive(t){if(t){if(t instanceof jt)return t;{const n=new es(t);return n._formatted=t.external??null,n._fsPath=t._sep===gh?t.fsPath??null:null,n}}else return t}[Symbol.for("debug.description")](){return`URI(${this.toString()})`}}const gh=ks?1:void 0;class es extends jt{constructor(){super(...arguments),this._formatted=null,this._fsPath=null}get fsPath(){return this._fsPath||(this._fsPath=Gr(this,!1)),this._fsPath}toString(t=!1){return t?pi(this,!0):(this._formatted||(this._formatted=pi(this,!1)),this._formatted)}toJSON(){const t={$mid:hi.Uri};return this._fsPath&&(t.fsPath=this._fsPath,t._sep=gh),this._formatted&&(t.external=this._formatted),this.path&&(t.path=this.path),this.scheme&&(t.scheme=this.scheme),this.authority&&(t.authority=this.authority),this.query&&(t.query=this.query),this.fragment&&(t.fragment=this.fragment),t}}const yh={[Z.Colon]:"%3A",[Z.Slash]:"%2F",[Z.QuestionMark]:"%3F",[Z.Hash]:"%23",[Z.OpenSquareBracket]:"%5B",[Z.CloseSquareBracket]:"%5D",[Z.AtSign]:"%40",[Z.ExclamationMark]:"%21",[Z.DollarSign]:"%24",[Z.Ampersand]:"%26",[Z.SingleQuote]:"%27",[Z.OpenParen]:"%28",[Z.CloseParen]:"%29",[Z.Asterisk]:"%2A",[Z.Plus]:"%2B",[Z.Comma]:"%2C",[Z.Semicolon]:"%3B",[Z.Equals]:"%3D",[Z.Space]:"%20"};function Jl(e,t,n){let s,r=-1;for(let o=0;o<e.length;o++){const i=e.charCodeAt(o);if(i>=Z.a&&i<=Z.z||i>=Z.A&&i<=Z.Z||i>=Z.Digit0&&i<=Z.Digit9||i===Z.Dash||i===Z.Period||i===Z.Underline||i===Z.Tilde||t&&i===Z.Slash||n&&i===Z.OpenSquareBracket||n&&i===Z.CloseSquareBracket||n&&i===Z.Colon)r!==-1&&(s+=encodeURIComponent(e.substring(r,o)),r=-1),s!==void 0&&(s+=e.charAt(o));else{s===void 0&&(s=e.substr(0,o));const a=yh[i];a!==void 0?(r!==-1&&(s+=encodeURIComponent(e.substring(r,o)),r=-1),s+=a):r===-1&&(r=o)}}return r!==-1&&(s+=encodeURIComponent(e.substring(r))),s!==void 0?s:e}function sS(e){let t;for(let n=0;n<e.length;n++){const s=e.charCodeAt(n);s===Z.Hash||s===Z.QuestionMark?(t===void 0&&(t=e.substr(0,n)),t+=yh[s]):t!==void 0&&(t+=e[n])}return t!==void 0?t:e}function Gr(e,t){let n;return e.authority&&e.path.length>1&&e.scheme==="file"?n=`//${e.authority}${e.path}`:e.path.charCodeAt(0)===Z.Slash&&(e.path.charCodeAt(1)>=Z.A&&e.path.charCodeAt(1)<=Z.Z||e.path.charCodeAt(1)>=Z.a&&e.path.charCodeAt(1)<=Z.z)&&e.path.charCodeAt(2)===Z.Colon?t?n=e.path.substr(1):n=e.path[1].toLowerCase()+e.path.substr(2):n=e.path,ks&&(n=n.replace(/\//g,"\\")),n}function pi(e,t){const n=t?sS:Jl;let s="",{scheme:r,authority:o,path:i,query:a,fragment:l}=e;if(r&&(s+=r,s+=":"),(o||r==="file")&&(s+=Ae,s+=Ae),o){let c=o.indexOf("@");if(c!==-1){const u=o.substr(0,c);o=o.substr(c+1),c=u.lastIndexOf(":"),c===-1?s+=n(u,!1,!1):(s+=n(u.substr(0,c),!1,!1),s+=":",s+=n(u.substr(c+1),!1,!0)),s+="@"}o=o.toLowerCase(),c=o.lastIndexOf(":"),c===-1?s+=n(o,!1,!0):(s+=n(o.substr(0,c),!1,!0),s+=o.substr(c))}if(i){if(i.length>=3&&i.charCodeAt(0)===Z.Slash&&i.charCodeAt(2)===Z.Colon){const c=i.charCodeAt(1);c>=Z.A&&c<=Z.Z&&(i=`/${String.fromCharCode(c+32)}:${i.substr(3)}`)}else if(i.length>=2&&i.charCodeAt(1)===Z.Colon){const c=i.charCodeAt(0);c>=Z.A&&c<=Z.Z&&(i=`${String.fromCharCode(c+32)}:${i.substr(2)}`)}s+=n(i,!0,!1)}return a&&(s+="?",s+=n(a,!1,!1)),l&&(s+="#",s+=t?l:Jl(l,!1,!1)),s}function bh(e){try{return decodeURIComponent(e)}catch{return e.length>3?e.substr(0,3)+bh(e.substr(3)):e}}const Ql=/(%[0-9A-Za-z][0-9A-Za-z])+/g;function ur(e){return e.match(Ql)?e.replace(Ql,t=>bh(t)):e}var Gt;(function(e){e.inMemory="inmemory",e.vscode="vscode",e.internal="private",e.walkThrough="walkThrough",e.walkThroughSnippet="walkThroughSnippet",e.http="http",e.https="https",e.file="file",e.mailto="mailto",e.untitled="untitled",e.data="data",e.command="command",e.vscodeRemote="vscode-remote",e.vscodeRemoteResource="vscode-remote-resource",e.vscodeManagedRemoteResource="vscode-managed-remote-resource",e.vscodeUserData="vscode-userdata",e.vscodeCustomEditor="vscode-custom-editor",e.vscodeNotebookCell="vscode-notebook-cell",e.vscodeNotebookCellMetadata="vscode-notebook-cell-metadata",e.vscodeNotebookCellMetadataDiff="vscode-notebook-cell-metadata-diff",e.vscodeNotebookCellOutput="vscode-notebook-cell-output",e.vscodeNotebookCellOutputDiff="vscode-notebook-cell-output-diff",e.vscodeNotebookMetadata="vscode-notebook-metadata",e.vscodeInteractiveInput="vscode-interactive-input",e.vscodeSettings="vscode-settings",e.vscodeWorkspaceTrust="vscode-workspace-trust",e.vscodeTerminal="vscode-terminal",e.vscodeChatCodeBlock="vscode-chat-code-block",e.vscodeChatCodeCompareBlock="vscode-chat-code-compare-block",e.vscodeChatSesssion="vscode-chat-editor",e.webviewPanel="webview-panel",e.vscodeWebview="vscode-webview",e.extension="extension",e.vscodeFileResource="vscode-file",e.tmp="tmp",e.vsls="vsls",e.vscodeSourceControl="vscode-scm",e.commentsInput="comment",e.codeSetting="code-setting",e.outputChannel="output",e.accessibleView="accessible-view"})(Gt||(Gt={}));const rS="tkn";class oS{constructor(){this._hosts=Object.create(null),this._ports=Object.create(null),this._connectionTokens=Object.create(null),this._preferredWebSchema="http",this._delegate=null,this._serverRootPath="/"}setPreferredWebSchema(t){this._preferredWebSchema=t}setDelegate(t){this._delegate=t}setServerRootPath(t,n){this._serverRootPath=Nt.join(n??"/",aS(t))}getServerRootPath(){return this._serverRootPath}get _remoteResourcesPath(){return Nt.join(this._serverRootPath,Gt.vscodeRemoteResource)}set(t,n,s){this._hosts[t]=n,this._ports[t]=s}setConnectionToken(t,n){this._connectionTokens[t]=n}getPreferredWebSchema(){return this._preferredWebSchema}rewrite(t){if(this._delegate)try{return this._delegate(t)}catch(a){return gr(a),t}const n=t.authority;let s=this._hosts[n];s&&s.indexOf(":")!==-1&&s.indexOf("[")===-1&&(s=`[${s}]`);const r=this._ports[n],o=this._connectionTokens[n];let i=`path=${encodeURIComponent(t.path)}`;return typeof o=="string"&&(i+=`&${rS}=${encodeURIComponent(o)}`),jt.from({scheme:wk?this._preferredWebSchema:Gt.vscodeRemoteResource,authority:`${s}:${r}`,path:this._remoteResourcesPath,query:i})}}const iS=new oS;function aS(e){return`${e.quality??"oss"}-${e.commit??"dev"}`}const lS="vscode-app";class Ks{constructor(){this.staticBrowserUris=new os,this.appResourcePathUrls=new Map}static{this.FALLBACK_AUTHORITY=lS}registerAppResourcePathUrl(t,n){this.appResourcePathUrls.set(t,n)}toUrl(t){let n=this.appResourcePathUrls.get(t);return typeof n=="function"&&(n=n()),new URL(n??t,globalThis.location?.href??import.meta.url).toString()}asBrowserUri(t){const n=this.toUri(t);return this.uriToBrowserUri(n)}uriToBrowserUri(t){return t.scheme===Gt.vscodeRemote?iS.rewrite(t):t.scheme===Gt.file&&(_k||Ik===`${Gt.vscodeFileResource}://${Ks.FALLBACK_AUTHORITY}`)?t.with({scheme:Gt.vscodeFileResource,authority:t.authority||Ks.FALLBACK_AUTHORITY,query:null,fragment:null}):this.staticBrowserUris.get(t)??t}asFileUri(t){const n=this.toUri(t);return this.uriToFileUri(n)}uriToFileUri(t){return t.scheme===Gt.vscodeFileResource?t.with({scheme:Gt.file,authority:t.authority!==Ks.FALLBACK_AUTHORITY?t.authority:null,query:null,fragment:null}):t}toUri(t){if(jt.isUri(t))return t;if(globalThis._VSCODE_FILE_ROOT){const n=globalThis._VSCODE_FILE_ROOT;if(/^\w[\w\d+.-]*:\/\//.test(n))return jt.joinPath(jt.parse(n,!0),t);const s=Pk(n,t);return jt.file(s)}return jt.parse(this.toUrl(t))}registerStaticBrowserUri(t,n){return this.staticBrowserUris.set(t,n),Ya(()=>{this.staticBrowserUris.get(t)===n&&this.staticBrowserUris.delete(t)})}getRegisteredBrowserUris(){return this.staticBrowserUris.keys()}}new Ks;var tc;(function(e){const t=new Map([["1",{"Cross-Origin-Opener-Policy":"same-origin"}],["2",{"Cross-Origin-Embedder-Policy":"require-corp"}],["3",{"Cross-Origin-Opener-Policy":"same-origin","Cross-Origin-Embedder-Policy":"require-corp"}]]);e.CoopAndCoep=Object.freeze(t.get("3"));const n="vscode-coi";function s(o){let i;typeof o=="string"?i=new URL(o).searchParams:o instanceof URL?i=o.searchParams:jt.isUri(o)&&(i=new URL(o.toString(!0)).searchParams);const a=i?.get(n);if(a)return t.get(a)}e.getHeadersFromQuery=s;function r(o,i,a){if(!globalThis.crossOriginIsolated)return;const l=i&&a?"3":a?"2":"1";o instanceof URLSearchParams?o.set(n,l):o[n]=l}e.addSearchParam=r})(tc||(tc={}));function tn(e){return Gr(e,!0)}class cS{constructor(t){this._ignorePathCasing=t}compare(t,n,s=!1){return t===n?0:Wk(this.getComparisonKey(t,s),this.getComparisonKey(n,s))}isEqual(t,n,s=!1){return t===n?!0:!t||!n?!1:this.getComparisonKey(t,s)===this.getComparisonKey(n,s)}getComparisonKey(t,n=!1){return t.with({path:this._ignorePathCasing(t)?t.path.toLowerCase():void 0,fragment:n?null:void 0}).toString()}ignorePathCasing(t){return this._ignorePathCasing(t)}isEqualOrParent(t,n,s=!1){if(t.scheme===n.scheme){if(t.scheme===Gt.file)return Zl(tn(t),tn(n),this._ignorePathCasing(t))&&t.query===n.query&&(s||t.fragment===n.fragment);if(ec(t.authority,n.authority))return Zl(t.path,n.path,this._ignorePathCasing(t),"/")&&t.query===n.query&&(s||t.fragment===n.fragment)}return!1}joinPath(t,...n){return jt.joinPath(t,...n)}basenameOrAuthority(t){return uS(t)||t.authority}basename(t){return Nt.basename(t.path)}extname(t){return Nt.extname(t.path)}dirname(t){if(t.path.length===0)return t;let n;return t.scheme===Gt.file?n=jt.file(Vk(tn(t))).path:(n=Nt.dirname(t.path),t.authority&&n.length&&n.charCodeAt(0)!==Z.Slash&&(console.error(`dirname("${t.toString})) resulted in a relative path`),n="/")),t.with({path:n})}normalizePath(t){if(!t.path.length)return t;let n;return t.scheme===Gt.file?n=jt.file(Fk(tn(t))).path:n=Nt.normalize(t.path),t.with({path:n})}relativePath(t,n){if(t.scheme!==n.scheme||!ec(t.authority,n.authority))return;if(t.scheme===Gt.file){const o=Mk(tn(t),tn(n));return ks?mh(o):o}let s=t.path||"/";const r=n.path||"/";if(this._ignorePathCasing(t)){let o=0;for(const i=Math.min(s.length,r.length);o<i&&!(s.charCodeAt(o)!==r.charCodeAt(o)&&s.charAt(o).toLowerCase()!==r.charAt(o).toLowerCase());o++);s=r.substr(0,o)+s.substr(o)}return Nt.relative(s,r)}resolvePath(t,n){if(t.scheme===Gt.file){const s=jt.file(Uk(tn(t),n));return t.with({authority:s.authority,path:s.path})}return n=jk(n),t.with({path:Nt.resolve(t.path,n)})}isAbsolutePath(t){return!!t.path&&t.path[0]==="/"}isEqualAuthority(t,n){return t===n||t!==void 0&&n!==void 0&&qk(t,n)}hasTrailingPathSeparator(t,n=wr){if(t.scheme===Gt.file){const s=tn(t);return s.length>Yl(s).length&&s[s.length-1]===n}else{const s=t.path;return s.length>1&&s.charCodeAt(s.length-1)===Z.Slash&&!/^[a-zA-Z]:(\/$|\\$)/.test(t.fsPath)}}removeTrailingPathSeparator(t,n=wr){return nc(t,n)?t.with({path:t.path.substr(0,t.path.length-1)}):t}addTrailingPathSeparator(t,n=wr){let s=!1;if(t.scheme===Gt.file){const r=tn(t);s=r!==void 0&&r.length===Yl(r).length&&r[r.length-1]===n}else{n="/";const r=t.path;s=r.length===1&&r.charCodeAt(r.length-1)===Z.Slash}return!s&&!nc(t,n)?t.with({path:t.path+"/"}):t}}const ut=new cS(()=>!1);ut.isEqual.bind(ut);ut.isEqualOrParent.bind(ut);ut.getComparisonKey.bind(ut);ut.basenameOrAuthority.bind(ut);const uS=ut.basename.bind(ut);ut.extname.bind(ut);ut.dirname.bind(ut);ut.joinPath.bind(ut);ut.normalizePath.bind(ut);ut.relativePath.bind(ut);ut.resolvePath.bind(ut);ut.isAbsolutePath.bind(ut);const ec=ut.isEqualAuthority.bind(ut),nc=ut.hasTrailingPathSeparator.bind(ut);ut.removeTrailingPathSeparator.bind(ut);ut.addTrailingPathSeparator.bind(ut);var sc;(function(e){e.META_DATA_LABEL="label",e.META_DATA_DESCRIPTION="description",e.META_DATA_SIZE="size",e.META_DATA_MIME="mime";function t(n){const s=new Map;n.path.substring(n.path.indexOf(";")+1,n.path.lastIndexOf(";")).split(";").forEach(i=>{const[a,l]=i.split(":");a&&l&&s.set(a,l)});const o=n.path.substring(0,n.path.indexOf(";"));return o&&s.set(e.META_DATA_MIME,o),s}e.parseMetaData=t})(sc||(sc={}));var rc;(function(e){e[e.Resolved=0]="Resolved",e[e.Rejected=1]="Rejected"})(rc||(rc={}));var oc;(function(e){async function t(s){let r;const o=await Promise.all(s.map(i=>i.then(a=>a,a=>{r||(r=a)})));if(typeof r<"u")throw r;return o}e.settled=t;function n(s){return new Promise(async(r,o)=>{try{await s(r,o)}catch(i){o(i)}})}e.withAsyncBody=n})(oc||(oc={}));var xe;(function(e){e[e.Initial=0]="Initial",e[e.DoneOK=1]="DoneOK",e[e.DoneError=2]="DoneError"})(xe||(xe={}));class de{static fromArray(t){return new de(n=>{n.emitMany(t)})}static fromPromise(t){return new de(async n=>{n.emitMany(await t)})}static fromPromisesResolveOrder(t){return new de(async n=>{await Promise.all(t.map(async s=>n.emitOne(await s)))})}static merge(t){return new de(async n=>{await Promise.all(t.map(async s=>{for await(const r of s)n.emitOne(r)}))})}static{this.EMPTY=de.fromArray([])}constructor(t,n){this._state=xe.Initial,this._results=[],this._error=null,this._onReturn=n,this._onStateChanged=new Be,queueMicrotask(async()=>{const s={emitOne:r=>this.emitOne(r),emitMany:r=>this.emitMany(r),reject:r=>this.reject(r)};try{await Promise.resolve(t(s)),this.resolve()}catch(r){this.reject(r)}finally{s.emitOne=void 0,s.emitMany=void 0,s.reject=void 0}})}[Symbol.asyncIterator](){let t=0;return{next:async()=>{do{if(this._state===xe.DoneError)throw this._error;if(t<this._results.length)return{done:!1,value:this._results[t++]};if(this._state===xe.DoneOK)return{done:!0,value:void 0};await Cr.toPromise(this._onStateChanged.event)}while(!0)},return:async()=>(this._onReturn?.(),{done:!0,value:void 0})}}static map(t,n){return new de(async s=>{for await(const r of t)s.emitOne(n(r))})}map(t){return de.map(this,t)}static filter(t,n){return new de(async s=>{for await(const r of t)n(r)&&s.emitOne(r)})}filter(t){return de.filter(this,t)}static coalesce(t){return de.filter(t,n=>!!n)}coalesce(){return de.coalesce(this)}static async toPromise(t){const n=[];for await(const s of t)n.push(s);return n}toPromise(){return de.toPromise(this)}emitOne(t){this._state===xe.Initial&&(this._results.push(t),this._onStateChanged.fire())}emitMany(t){this._state===xe.Initial&&(this._results=this._results.concat(t),this._onStateChanged.fire())}resolve(){this._state===xe.Initial&&(this._state=xe.DoneOK,this._onStateChanged.fire())}reject(t){this._state===xe.Initial&&(this._state=xe.DoneError,this._error=t,this._onStateChanged.fire())}}class Ne{constructor(t,n){this.lineNumber=t,this.column=n}with(t=this.lineNumber,n=this.column){return t===this.lineNumber&&n===this.column?this:new Ne(t,n)}delta(t=0,n=0){return this.with(Math.max(1,this.lineNumber+t),Math.max(1,this.column+n))}equals(t){return Ne.equals(this,t)}static equals(t,n){return!t&&!n?!0:!!t&&!!n&&t.lineNumber===n.lineNumber&&t.column===n.column}isBefore(t){return Ne.isBefore(this,t)}static isBefore(t,n){return t.lineNumber<n.lineNumber?!0:n.lineNumber<t.lineNumber?!1:t.column<n.column}isBeforeOrEqual(t){return Ne.isBeforeOrEqual(this,t)}static isBeforeOrEqual(t,n){return t.lineNumber<n.lineNumber?!0:n.lineNumber<t.lineNumber?!1:t.column<=n.column}static compare(t,n){const s=t.lineNumber|0,r=n.lineNumber|0;if(s===r){const o=t.column|0,i=n.column|0;return o-i}return s-r}clone(){return new Ne(this.lineNumber,this.column)}toString(){return"("+this.lineNumber+","+this.column+")"}static lift(t){return new Ne(t.lineNumber,t.column)}static isIPosition(t){return t&&typeof t.lineNumber=="number"&&typeof t.column=="number"}toJSON(){return{lineNumber:this.lineNumber,column:this.column}}}class Ot{constructor(t,n,s,r){t>s||t===s&&n>r?(this.startLineNumber=s,this.startColumn=r,this.endLineNumber=t,this.endColumn=n):(this.startLineNumber=t,this.startColumn=n,this.endLineNumber=s,this.endColumn=r)}isEmpty(){return Ot.isEmpty(this)}static isEmpty(t){return t.startLineNumber===t.endLineNumber&&t.startColumn===t.endColumn}containsPosition(t){return Ot.containsPosition(this,t)}static containsPosition(t,n){return!(n.lineNumber<t.startLineNumber||n.lineNumber>t.endLineNumber||n.lineNumber===t.startLineNumber&&n.column<t.startColumn||n.lineNumber===t.endLineNumber&&n.column>t.endColumn)}static strictContainsPosition(t,n){return!(n.lineNumber<t.startLineNumber||n.lineNumber>t.endLineNumber||n.lineNumber===t.startLineNumber&&n.column<=t.startColumn||n.lineNumber===t.endLineNumber&&n.column>=t.endColumn)}containsRange(t){return Ot.containsRange(this,t)}static containsRange(t,n){return!(n.startLineNumber<t.startLineNumber||n.endLineNumber<t.startLineNumber||n.startLineNumber>t.endLineNumber||n.endLineNumber>t.endLineNumber||n.startLineNumber===t.startLineNumber&&n.startColumn<t.startColumn||n.endLineNumber===t.endLineNumber&&n.endColumn>t.endColumn)}strictContainsRange(t){return Ot.strictContainsRange(this,t)}static strictContainsRange(t,n){return!(n.startLineNumber<t.startLineNumber||n.endLineNumber<t.startLineNumber||n.startLineNumber>t.endLineNumber||n.endLineNumber>t.endLineNumber||n.startLineNumber===t.startLineNumber&&n.startColumn<=t.startColumn||n.endLineNumber===t.endLineNumber&&n.endColumn>=t.endColumn)}plusRange(t){return Ot.plusRange(this,t)}static plusRange(t,n){let s,r,o,i;return n.startLineNumber<t.startLineNumber?(s=n.startLineNumber,r=n.startColumn):n.startLineNumber===t.startLineNumber?(s=n.startLineNumber,r=Math.min(n.startColumn,t.startColumn)):(s=t.startLineNumber,r=t.startColumn),n.endLineNumber>t.endLineNumber?(o=n.endLineNumber,i=n.endColumn):n.endLineNumber===t.endLineNumber?(o=n.endLineNumber,i=Math.max(n.endColumn,t.endColumn)):(o=t.endLineNumber,i=t.endColumn),new Ot(s,r,o,i)}intersectRanges(t){return Ot.intersectRanges(this,t)}static intersectRanges(t,n){let s=t.startLineNumber,r=t.startColumn,o=t.endLineNumber,i=t.endColumn;const a=n.startLineNumber,l=n.startColumn,c=n.endLineNumber,u=n.endColumn;return s<a?(s=a,r=l):s===a&&(r=Math.max(r,l)),o>c?(o=c,i=u):o===c&&(i=Math.min(i,u)),s>o||s===o&&r>i?null:new Ot(s,r,o,i)}equalsRange(t){return Ot.equalsRange(this,t)}static equalsRange(t,n){return!t&&!n?!0:!!t&&!!n&&t.startLineNumber===n.startLineNumber&&t.startColumn===n.startColumn&&t.endLineNumber===n.endLineNumber&&t.endColumn===n.endColumn}getEndPosition(){return Ot.getEndPosition(this)}static getEndPosition(t){return new Ne(t.endLineNumber,t.endColumn)}getStartPosition(){return Ot.getStartPosition(this)}static getStartPosition(t){return new Ne(t.startLineNumber,t.startColumn)}toString(){return"["+this.startLineNumber+","+this.startColumn+" -> "+this.endLineNumber+","+this.endColumn+"]"}setEndPosition(t,n){return new Ot(this.startLineNumber,this.startColumn,t,n)}setStartPosition(t,n){return new Ot(t,n,this.endLineNumber,this.endColumn)}collapseToStart(){return Ot.collapseToStart(this)}static collapseToStart(t){return new Ot(t.startLineNumber,t.startColumn,t.startLineNumber,t.startColumn)}collapseToEnd(){return Ot.collapseToEnd(this)}static collapseToEnd(t){return new Ot(t.endLineNumber,t.endColumn,t.endLineNumber,t.endColumn)}delta(t){return new Ot(this.startLineNumber+t,this.startColumn,this.endLineNumber+t,this.endColumn)}isSingleLine(){return this.startLineNumber===this.endLineNumber}static fromPositions(t,n=t){return new Ot(t.lineNumber,t.column,n.lineNumber,n.column)}static lift(t){return t?new Ot(t.startLineNumber,t.startColumn,t.endLineNumber,t.endColumn):null}static isIRange(t){return t&&typeof t.startLineNumber=="number"&&typeof t.startColumn=="number"&&typeof t.endLineNumber=="number"&&typeof t.endColumn=="number"}static areIntersectingOrTouching(t,n){return!(t.endLineNumber<n.startLineNumber||t.endLineNumber===n.startLineNumber&&t.endColumn<n.startColumn||n.endLineNumber<t.startLineNumber||n.endLineNumber===t.startLineNumber&&n.endColumn<t.startColumn)}static areIntersecting(t,n){return!(t.endLineNumber<n.startLineNumber||t.endLineNumber===n.startLineNumber&&t.endColumn<=n.startColumn||n.endLineNumber<t.startLineNumber||n.endLineNumber===t.startLineNumber&&n.endColumn<=t.startColumn)}static areOnlyIntersecting(t,n){return!(t.endLineNumber<n.startLineNumber-1||t.endLineNumber===n.startLineNumber&&t.endColumn<n.startColumn-1||n.endLineNumber<t.startLineNumber-1||n.endLineNumber===t.startLineNumber&&n.endColumn<t.startColumn-1)}static compareRangesUsingStarts(t,n){if(t&&n){const o=t.startLineNumber|0,i=n.startLineNumber|0;if(o===i){const a=t.startColumn|0,l=n.startColumn|0;if(a===l){const c=t.endLineNumber|0,u=n.endLineNumber|0;if(c===u){const f=t.endColumn|0,h=n.endColumn|0;return f-h}return c-u}return a-l}return o-i}return(t?1:0)-(n?1:0)}static compareRangesUsingEnds(t,n){return t.endLineNumber===n.endLineNumber?t.endColumn===n.endColumn?t.startLineNumber===n.startLineNumber?t.startColumn-n.startColumn:t.startLineNumber-n.startLineNumber:t.endColumn-n.endColumn:t.endLineNumber-n.endLineNumber}static spansMultipleLines(t){return t.endLineNumber>t.startLineNumber}toJSON(){return this}}const fS="`~!@#$%^&*()-=+[{]}\\|;:'\",.<>/?";function hS(e=""){let t="(-?\\d*\\.\\d\\w*)|([^";for(const n of fS)e.indexOf(n)>=0||(t+="\\"+n);return t+="\\s]+)",new RegExp(t,"g")}const pS=hS();function _h(e){let t=pS;if(e&&e instanceof RegExp)if(e.global)t=e;else{let n="g";e.ignoreCase&&(n+="i"),e.multiline&&(n+="m"),e.unicode&&(n+="u"),t=new RegExp(e.source,n)}return t.lastIndex=0,t}const wh=new ak;wh.unshift({maxLen:1e3,windowSize:15,timeBudget:150});function Nh(e,t,n,s,r){if(t=_h(t),r||(r=Br.first(wh)),n.length>r.maxLen){let c=e-r.maxLen/2;return c<0?c=0:s+=c,n=n.substring(c,e+r.maxLen/2),Nh(e,t,n,s,r)}const o=Date.now(),i=e-1-s;let a=-1,l=null;for(let c=1;!(Date.now()-o>=r.timeBudget);c++){const u=i-r.windowSize*c;t.lastIndex=Math.max(0,u);const f=dS(t,n,i,a);if(!f&&l||(l=f,u<=0))break;a=u}if(l){const c={word:l[0],startColumn:s+1+l.index,endColumn:s+1+l.index+l[0].length};return t.lastIndex=0,c}return null}function dS(e,t,n,s){let r;for(;r=e.exec(t);){const o=r.index||0;if(o<=n&&e.lastIndex>=n)return r;if(s>0&&o>s)return null}return null}class mS{constructor(t){this.values=t,this.prefixSum=new Uint32Array(t.length),this.prefixSumValidIndex=new Int32Array(1),this.prefixSumValidIndex[0]=-1}getCount(){return this.values.length}insertValues(t,n){t=ts(t);const s=this.values,r=this.prefixSum,o=n.length;return o===0?!1:(this.values=new Uint32Array(s.length+o),this.values.set(s.subarray(0,t),0),this.values.set(s.subarray(t),t+o),this.values.set(n,t),t-1<this.prefixSumValidIndex[0]&&(this.prefixSumValidIndex[0]=t-1),this.prefixSum=new Uint32Array(this.values.length),this.prefixSumValidIndex[0]>=0&&this.prefixSum.set(r.subarray(0,this.prefixSumValidIndex[0]+1)),!0)}setValue(t,n){return t=ts(t),n=ts(n),this.values[t]===n?!1:(this.values[t]=n,t-1<this.prefixSumValidIndex[0]&&(this.prefixSumValidIndex[0]=t-1),!0)}removeValues(t,n){t=ts(t),n=ts(n);const s=this.values,r=this.prefixSum;if(t>=s.length)return!1;const o=s.length-t;return n>=o&&(n=o),n===0?!1:(this.values=new Uint32Array(s.length-n),this.values.set(s.subarray(0,t),0),this.values.set(s.subarray(t+n),t),this.prefixSum=new Uint32Array(this.values.length),t-1<this.prefixSumValidIndex[0]&&(this.prefixSumValidIndex[0]=t-1),this.prefixSumValidIndex[0]>=0&&this.prefixSum.set(r.subarray(0,this.prefixSumValidIndex[0]+1)),!0)}getTotalSum(){return this.values.length===0?0:this._getPrefixSum(this.values.length-1)}getPrefixSum(t){return t<0?0:(t=ts(t),this._getPrefixSum(t))}_getPrefixSum(t){if(t<=this.prefixSumValidIndex[0])return this.prefixSum[t];let n=this.prefixSumValidIndex[0]+1;n===0&&(this.prefixSum[0]=this.values[0],n++),t>=this.values.length&&(t=this.values.length-1);for(let s=n;s<=t;s++)this.prefixSum[s]=this.prefixSum[s-1]+this.values[s];return this.prefixSumValidIndex[0]=Math.max(this.prefixSumValidIndex[0],t),this.prefixSum[t]}getIndexOf(t){t=Math.floor(t),this.getTotalSum();let n=0,s=this.values.length-1,r=0,o=0,i=0;for(;n<=s;)if(r=n+(s-n)/2|0,o=this.prefixSum[r],i=o-this.values[r],t<i)s=r-1;else if(t>=o)n=r+1;else break;return new gS(r,t-i)}}class gS{constructor(t,n){this.index=t,this.remainder=n,this._prefixSumIndexOfResultBrand=void 0,this.index=t,this.remainder=n}}class yS{constructor(t,n,s,r){this._uri=t,this._lines=n,this._eol=s,this._versionId=r,this._lineStarts=null,this._cachedTextValue=null}dispose(){this._lines.length=0}get version(){return this._versionId}getText(){return this._cachedTextValue===null&&(this._cachedTextValue=this._lines.join(this._eol)),this._cachedTextValue}onEvents(t){t.eol&&t.eol!==this._eol&&(this._eol=t.eol,this._lineStarts=null);const n=t.changes;for(const s of n)this._acceptDeleteRange(s.range),this._acceptInsertText(new Ne(s.range.startLineNumber,s.range.startColumn),s.text);this._versionId=t.versionId,this._cachedTextValue=null}_ensureLineStarts(){if(!this._lineStarts){const t=this._eol.length,n=this._lines.length,s=new Uint32Array(n);for(let r=0;r<n;r++)s[r]=this._lines[r].length+t;this._lineStarts=new mS(s)}}_setLineText(t,n){this._lines[t]=n,this._lineStarts&&this._lineStarts.setValue(t,this._lines[t].length+this._eol.length)}_acceptDeleteRange(t){if(t.startLineNumber===t.endLineNumber){if(t.startColumn===t.endColumn)return;this._setLineText(t.startLineNumber-1,this._lines[t.startLineNumber-1].substring(0,t.startColumn-1)+this._lines[t.startLineNumber-1].substring(t.endColumn-1));return}this._setLineText(t.startLineNumber-1,this._lines[t.startLineNumber-1].substring(0,t.startColumn-1)+this._lines[t.endLineNumber-1].substring(t.endColumn-1)),this._lines.splice(t.startLineNumber,t.endLineNumber-t.startLineNumber),this._lineStarts&&this._lineStarts.removeValues(t.startLineNumber,t.endLineNumber-t.startLineNumber)}_acceptInsertText(t,n){if(n.length===0)return;const s=zk(n);if(s.length===1){this._setLineText(t.lineNumber-1,this._lines[t.lineNumber-1].substring(0,t.column-1)+s[0]+this._lines[t.lineNumber-1].substring(t.column-1));return}s[s.length-1]+=this._lines[t.lineNumber-1].substring(t.column-1),this._setLineText(t.lineNumber-1,this._lines[t.lineNumber-1].substring(0,t.column-1)+s[0]);const r=new Uint32Array(s.length-1);for(let o=1;o<s.length;o++)this._lines.splice(t.lineNumber+o-1,0,s[o]),r[o-1]=s[o].length+this._eol.length;this._lineStarts&&this._lineStarts.insertValues(t.lineNumber,r)}}const bS="workerTextModelSync";class _S{constructor(){this._models=Object.create(null)}bindToServer(t){t.setChannel(bS,this)}getModel(t){return this._models[t]}getModels(){const t=[];return Object.keys(this._models).forEach(n=>t.push(this._models[n])),t}$acceptNewModel(t){this._models[t.url]=new wS(jt.parse(t.url),t.lines,t.EOL,t.versionId)}$acceptModelChanged(t,n){if(!this._models[t])return;this._models[t].onEvents(n)}$acceptRemovedModel(t){this._models[t]&&delete this._models[t]}}class wS extends yS{get uri(){return this._uri}get eol(){return this._eol}getValue(){return this.getText()}findMatches(t){const n=[];for(let s=0;s<this._lines.length;s++){const r=this._lines[s],o=this.offsetAt(new Ne(s+1,1)),i=r.matchAll(t);for(const a of i)(a.index||a.index===0)&&(a.index=a.index+o),n.push(a)}return n}getLinesContent(){return this._lines.slice(0)}getLineCount(){return this._lines.length}getLineContent(t){return this._lines[t-1]}getWordAtPosition(t,n){const s=Nh(t.column,_h(n),this._lines[t.lineNumber-1],0);return s?new Ot(t.lineNumber,s.startColumn,t.lineNumber,s.endColumn):null}getWordUntilPosition(t,n){const s=this.getWordAtPosition(t,n);return s?{word:this._lines[t.lineNumber-1].substring(s.startColumn-1,t.column-1),startColumn:s.startColumn,endColumn:t.column}:{word:"",startColumn:t.column,endColumn:t.column}}words(t){const n=this._lines,s=this._wordenize.bind(this);let r=0,o="",i=0,a=[];return{*[Symbol.iterator](){for(;;)if(i<a.length){const l=o.substring(a[i].start,a[i].end);i+=1,yield l}else if(r<n.length)o=n[r],a=s(o,t),i=0,r+=1;else break}}}getLineWords(t,n){const s=this._lines[t-1],r=this._wordenize(s,n),o=[];for(const i of r)o.push({word:s.substring(i.start,i.end),startColumn:i.start+1,endColumn:i.end+1});return o}_wordenize(t,n){const s=[];let r;for(n.lastIndex=0;(r=n.exec(t))&&r[0].length!==0;)s.push({start:r.index,end:r.index+r[0].length});return s}getValueInRange(t){if(t=this._validateRange(t),t.startLineNumber===t.endLineNumber)return this._lines[t.startLineNumber-1].substring(t.startColumn-1,t.endColumn-1);const n=this._eol,s=t.startLineNumber-1,r=t.endLineNumber-1,o=[];o.push(this._lines[s].substring(t.startColumn-1));for(let i=s+1;i<r;i++)o.push(this._lines[i]);return o.push(this._lines[r].substring(0,t.endColumn-1)),o.join(n)}offsetAt(t){return t=this._validatePosition(t),this._ensureLineStarts(),this._lineStarts.getPrefixSum(t.lineNumber-2)+(t.column-1)}positionAt(t){t=Math.floor(t),t=Math.max(0,t),this._ensureLineStarts();const n=this._lineStarts.getIndexOf(t),s=this._lines[n.index].length;return{lineNumber:1+n.index,column:1+Math.min(n.remainder,s)}}_validateRange(t){const n=this._validatePosition({lineNumber:t.startLineNumber,column:t.startColumn}),s=this._validatePosition({lineNumber:t.endLineNumber,column:t.endColumn});return n.lineNumber!==t.startLineNumber||n.column!==t.startColumn||s.lineNumber!==t.endLineNumber||s.column!==t.endColumn?{startLineNumber:n.lineNumber,startColumn:n.column,endLineNumber:s.lineNumber,endColumn:s.column}:t}_validatePosition(t){if(!Ne.isIPosition(t))throw new Error("bad position");let{lineNumber:n,column:s}=t,r=!1;if(n<1)n=1,s=1,r=!0;else if(n>this._lines.length)n=this._lines.length,s=this._lines[n-1].length+1,r=!0;else{const o=this._lines[n-1].length+1;s<1?(s=1,r=!0):s>o&&(s=o,r=!0)}return r?{lineNumber:n,column:s}:t}}function NS(e){return new Ve(e)}class Ve{static{this.expectedRelativeConfidence=.2}static{this.positiveConfidenceCorrectionBucket1=.05}static{this.positiveConfidenceCorrectionBucket2=.025}static{this.negativeConfidenceCorrection=.5}constructor(t){this._workerTextModelSyncServer=new _S,this._loadFailed=!1,this.modelIdToCoreId=new Map,this._host=Vr.getChannel(t),this._workerTextModelSyncServer.bindToServer(t)}async $detectLanguage(t,n,s,r){const o=[],i=[],a=new ho,l=this.getTextForDetection(t);if(!l)return;const u=await(async()=>{for await(const f of this.detectLanguagesImpl(l)){this.modelIdToCoreId.has(f.languageId)||this.modelIdToCoreId.set(f.languageId,await this._host.$getLanguageId(f.languageId));const h=this.modelIdToCoreId.get(f.languageId);h&&(!r?.length||r.includes(h))&&(o.push(h),i.push(f.confidence))}if(a.stop(),o.length)return this._host.$sendTelemetryEvent(o,i,a.elapsed()),o[0]})();if(u)return u}getTextForDetection(t){const n=this._workerTextModelSyncServer.getModel(t);if(!n)return;const s=n.positionAt(1e4);return n.getValueInRange({startColumn:1,startLineNumber:1,endColumn:s.column,endLineNumber:s.lineNumber})}async getModelOperations(){return this._modelOperations?this._modelOperations:(this._modelOperations=new GI({modelJsonLoaderFunc:async()=>{const t=await fetch(await this._host.$getModelJsonUri());try{return await t.json()}catch{const s="Failed to parse model JSON.";throw new Error(s)}},weightsLoaderFunc:async()=>await(await fetch(await this._host.$getWeightsUri())).arrayBuffer()}),this._modelOperations)}adjustLanguageConfidence(t){switch(t.languageId){case"js":case"html":case"json":case"ts":case"css":case"py":case"xml":case"php":t.confidence+=Ve.positiveConfidenceCorrectionBucket1;break;case"cpp":case"sh":case"java":case"cs":case"c":t.confidence+=Ve.positiveConfidenceCorrectionBucket2;break;case"bat":case"ini":case"makefile":case"sql":case"csv":case"toml":t.confidence-=Ve.negativeConfidenceCorrection;break}return t}async*detectLanguagesImpl(t){if(this._loadFailed)return;let n;try{n=await this.getModelOperations()}catch(i){console.log(i),this._loadFailed=!0;return}let s;try{s=await n.runModel(t)}catch(i){console.warn(i)}if(!s||s.length===0||s[0].confidence<Ve.expectedRelativeConfidence)return;const r=this.adjustLanguageConfidence(s[0]);if(r.confidence<Ve.expectedRelativeConfidence)return;const o=[r];for(let i of s){if(i===r)continue;if(i=this.adjustLanguageConfidence(i),o[o.length-1].confidence-i.confidence>=Ve.expectedRelativeConfidence){for(;o.length;)yield o.shift();if(i.confidence>Ve.expectedRelativeConfidence){o.push(i);continue}return}else{if(i.confidence>Ve.expectedRelativeConfidence){o.push(i);continue}return}}}}const To="default",IS="$initialize";var ae;(function(e){e[e.Request=0]="Request",e[e.Reply=1]="Reply",e[e.SubscribeEvent=2]="SubscribeEvent",e[e.Event=3]="Event",e[e.UnsubscribeEvent=4]="UnsubscribeEvent"})(ae||(ae={}));class kS{constructor(t,n,s,r,o){this.vsWorker=t,this.req=n,this.channel=s,this.method=r,this.args=o,this.type=ae.Request}}class ic{constructor(t,n,s,r){this.vsWorker=t,this.seq=n,this.res=s,this.err=r,this.type=ae.Reply}}class SS{constructor(t,n,s,r,o){this.vsWorker=t,this.req=n,this.channel=s,this.eventName=r,this.arg=o,this.type=ae.SubscribeEvent}}class TS{constructor(t,n,s){this.vsWorker=t,this.req=n,this.event=s,this.type=ae.Event}}class ES{constructor(t,n){this.vsWorker=t,this.req=n,this.type=ae.UnsubscribeEvent}}class vS{constructor(t){this._workerId=-1,this._handler=t,this._lastSentReq=0,this._pendingReplies=Object.create(null),this._pendingEmitters=new Map,this._pendingEvents=new Map}setWorkerId(t){this._workerId=t}sendMessage(t,n,s){const r=String(++this._lastSentReq);return new Promise((o,i)=>{this._pendingReplies[r]={resolve:o,reject:i},this._send(new kS(this._workerId,r,t,n,s))})}listen(t,n,s){let r=null;const o=new Be({onWillAddFirstListener:()=>{r=String(++this._lastSentReq),this._pendingEmitters.set(r,o),this._send(new SS(this._workerId,r,t,n,s))},onDidRemoveLastListener:()=>{this._pendingEmitters.delete(r),this._send(new ES(this._workerId,r)),r=null}});return o.event}handleMessage(t){!t||!t.vsWorker||this._workerId!==-1&&t.vsWorker!==this._workerId||this._handleMessage(t)}createProxyToRemoteChannel(t,n){const s={get:(r,o)=>(typeof o=="string"&&!r[o]&&(kh(o)?r[o]=i=>this.listen(t,o,i):Ih(o)?r[o]=this.listen(t,o,void 0):o.charCodeAt(0)===Z.DollarSign&&(r[o]=async(...i)=>(await n?.(),this.sendMessage(t,o,i)))),r[o])};return new Proxy(Object.create(null),s)}_handleMessage(t){switch(t.type){case ae.Reply:return this._handleReplyMessage(t);case ae.Request:return this._handleRequestMessage(t);case ae.SubscribeEvent:return this._handleSubscribeEventMessage(t);case ae.Event:return this._handleEventMessage(t);case ae.UnsubscribeEvent:return this._handleUnsubscribeEventMessage(t)}}_handleReplyMessage(t){if(!this._pendingReplies[t.seq]){console.warn("Got reply to unknown seq");return}const n=this._pendingReplies[t.seq];if(delete this._pendingReplies[t.seq],t.err){let s=t.err;t.err.$isError&&(s=new Error,s.name=t.err.name,s.message=t.err.message,s.stack=t.err.stack),n.reject(s);return}n.resolve(t.res)}_handleRequestMessage(t){const n=t.req;this._handler.handleMessage(t.channel,t.method,t.args).then(r=>{this._send(new ic(this._workerId,n,r,void 0))},r=>{r.detail instanceof Error&&(r.detail=ii(r.detail)),this._send(new ic(this._workerId,n,void 0,ii(r)))})}_handleSubscribeEventMessage(t){const n=t.req,s=this._handler.handleEvent(t.channel,t.eventName,t.arg)(r=>{this._send(new TS(this._workerId,n,r))});this._pendingEvents.set(n,s)}_handleEventMessage(t){if(!this._pendingEmitters.has(t.req)){console.warn("Got event for unknown req");return}this._pendingEmitters.get(t.req).fire(t.event)}_handleUnsubscribeEventMessage(t){if(!this._pendingEvents.has(t.req)){console.warn("Got unsubscribe for unknown req");return}this._pendingEvents.get(t.req).dispose(),this._pendingEvents.delete(t.req)}_send(t){const n=[];if(t.type===ae.Request)for(let s=0;s<t.args.length;s++)t.args[s]instanceof ArrayBuffer&&n.push(t.args[s]);else t.type===ae.Reply&&t.res instanceof ArrayBuffer&&n.push(t.res);this._handler.sendMessage(t,n)}}function Ih(e){return e[0]==="o"&&e[1]==="n"&&dh(e.charCodeAt(2))}function kh(e){return/^onDynamic/.test(e)&&dh(e.charCodeAt(9))}class xS{constructor(t,n){this._localChannels=new Map,this._remoteChannels=new Map,this._protocol=new vS({sendMessage:(s,r)=>{t(s,r)},handleMessage:(s,r,o)=>this._handleMessage(s,r,o),handleEvent:(s,r,o)=>this._handleEvent(s,r,o)}),this.requestHandler=n(this)}onmessage(t){this._protocol.handleMessage(t)}_handleMessage(t,n,s){if(t===To&&n===IS)return this.initialize(s[0]);const r=t===To?this.requestHandler:this._localChannels.get(t);if(!r)return Promise.reject(new Error(`Missing channel ${t} on worker thread`));if(typeof r[n]!="function")return Promise.reject(new Error(`Missing method ${n} on worker thread channel ${t}`));try{return Promise.resolve(r[n].apply(r,s))}catch(o){return Promise.reject(o)}}_handleEvent(t,n,s){const r=t===To?this.requestHandler:this._localChannels.get(t);if(!r)throw new Error(`Missing channel ${t} on worker thread`);if(kh(n)){const o=r[n].call(r,s);if(typeof o!="function")throw new Error(`Missing dynamic event ${n} on request handler.`);return o}if(Ih(n)){const o=r[n];if(typeof o!="function")throw new Error(`Missing event ${n} on request handler.`);return o}throw new Error(`Malformed event name ${n}`)}setChannel(t,n){this._localChannels.set(t,n)}getChannel(t){if(!this._remoteChannels.has(t)){const n=this._protocol.createProxyToRemoteChannel(t);this._remoteChannels.set(t,n)}return this._remoteChannels.get(t)}async initialize(t){this._protocol.setWorkerId(t)}}let di=!1;function $S(e){if(di)throw new Error("WebWorker already initialized!");di=!0;const t=new xS(n=>globalThis.postMessage(n),n=>e(n));return globalThis.onmessage=n=>{t.onmessage(n.data)},t}function AS(e){globalThis.onmessage=t=>{di||$S(e)}}AS(NS);
