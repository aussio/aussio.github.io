!function(){function e(e,t,n,a){Object.defineProperty(e,t,{get:n,set:a,enumerable:!0,configurable:!0})}var t=("undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{}).parcelRequire94c2,n=t.register;n("iLIWI",function(e,n){t("4CWuG"),t("4alNp"),t("1UDqa"),t("43R8l"),t("kFlq6"),t("cwU5j"),t("3Yn7Z"),t("8GsbD"),t("23ozm"),t("g4hSm"),t("eIbPD")}),n("cf0Oo",function(n,a){e(n.exports,"CanvasPool",function(){return l});var o=t("4k0ap"),i=t("22nXN");let l=new class{constructor(e){this._canvasPool=Object.create(null),this.canvasOptions=e||{},this.enableFullScreen=!1}_createCanvasAndContext(e,t){let n=(0,o.DOMAdapter).get().createCanvas();n.width=e,n.height=t;let a=n.getContext("2d");return{canvas:n,context:a}}getOptimalCanvasAndContext(e,t,n=1){e=Math.ceil(e*n-1e-6),t=Math.ceil(t*n-1e-6),e=(0,i.nextPow2)(e),t=(0,i.nextPow2)(t);let a=(e<<17)+(t<<1);this._canvasPool[a]||(this._canvasPool[a]=[]);let o=this._canvasPool[a].pop();return o||(o=this._createCanvasAndContext(e,t)),o}returnCanvasAndContext(e){let{width:t,height:n}=e.canvas;this._canvasPool[(t<<17)+(n<<1)].push(e)}clear(){this._canvasPool={}}}}),n("mBZBk",function(n,a){e(n.exports,"batchSamplersUniformGroup",function(){return s});var o=t("1Rgbi"),i=t("iOPov");let l=new Int32Array(o.MAX_TEXTURES);for(let e=0;e<o.MAX_TEXTURES;e++)l[e]=e;let s=new i.UniformGroup({uTextures:{value:l,type:"i32",size:o.MAX_TEXTURES}},{isStatic:!0})})}();
//# sourceMappingURL=webworkerAll.e45f8fc0.js.map
