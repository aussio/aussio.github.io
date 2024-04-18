!function(){function e(e,t,r,n){Object.defineProperty(e,t,{get:r,set:n,enumerable:!0,configurable:!0})}function t(e){return e&&e.__esModule?e.default:e}var r=("undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{}).parcelRequire94c2,n=r.register;n("cG8uY",function(t,r){e(t.exports,"State",function(){return i});let n={normal:0,add:1,multiply:2,screen:3,overlay:4,erase:5,"normal-npm":6,"add-npm":7,"screen-npm":8},o=class e{constructor(){this.data=0,this.blendMode="normal",this.polygonOffset=0,this.blend=!0,this.depthMask=!0}get blend(){return!!(1&this.data)}set blend(e){!!(1&this.data)!==e&&(this.data^=1)}get offsets(){return!!(2&this.data)}set offsets(e){!!(2&this.data)!==e&&(this.data^=2)}set cullMode(e){if("none"===e){this.culling=!1;return}this.culling=!0,this.clockwiseFrontFace="front"===e}get cullMode(){return this.culling?this.clockwiseFrontFace?"front":"back":"none"}get culling(){return!!(4&this.data)}set culling(e){!!(4&this.data)!==e&&(this.data^=4)}get depthTest(){return!!(8&this.data)}set depthTest(e){!!(8&this.data)!==e&&(this.data^=8)}get depthMask(){return!!(32&this.data)}set depthMask(e){!!(32&this.data)!==e&&(this.data^=32)}get clockwiseFrontFace(){return!!(16&this.data)}set clockwiseFrontFace(e){!!(16&this.data)!==e&&(this.data^=16)}get blendMode(){return this._blendMode}set blendMode(e){this.blend="none"!==e,this._blendMode=e,this._blendModeId=n[e]||0}get polygonOffset(){return this._polygonOffset}set polygonOffset(e){this.offsets=!!e,this._polygonOffset=e}toString(){return`[pixi.js/core:State blendMode=${this.blendMode} clockwiseFrontFace=${this.clockwiseFrontFace} culling=${this.culling} depthMask=${this.depthMask} polygonOffset=${this.polygonOffset}]`}static for2d(){let t=new e;return t.depthTest=!1,t.blend=!0,t}};o.default2d=o.for2d();let i=o}),n("fSBSb",function(t,r){e(t.exports,"color32BitToUniform",function(){return n});function n(e,t,r){let n=(e>>24&255)/255;t[r++]=(255&e)/255*n,t[r++]=(e>>8&255)/255*n,t[r++]=(e>>16&255)/255*n,t[r++]=n}}),n("iOPov",function(t,n){e(t.exports,"UniformGroup",function(){return a});var o=r("3nJcC"),i=r("fbbt8"),s=r("2AUFr");let u=class e{constructor(t,r){this._touched=0,this.uid=(0,o.uid)("uniform"),this._resourceType="uniformGroup",this._resourceId=(0,o.uid)("resource"),this.isUniformGroup=!0,this._dirtyId=0,this.destroyed=!1,r={...e.defaultOptions,...r},this.uniformStructures=t;let n={};for(let e in t){let r=t[e];r.name=e,r.size=r.size??1,r.value??(r.value=(0,s.getDefaultUniformValue)(r.type,r.size)),n[e]=r.value}this.uniforms=n,this._dirtyId=1,this.ubo=r.ubo,this.isStatic=r.isStatic,this._signature=(0,i.createIdFromString)(Object.keys(n).map(e=>`${e}-${t[e].type}`).join("-"),"uniform-group")}update(){this._dirtyId++}};u.defaultOptions={ubo:!1,isStatic:!1};let a=u}),n("fbbt8",function(t,r){e(t.exports,"createIdFromString",function(){return i});let n=Object.create(null),o=Object.create(null);function i(e,t){let r=o[e];return void 0===r&&(void 0===n[t]&&(n[t]=1),o[e]=r=n[t]++),r}}),n("2AUFr",function(t,r){e(t.exports,"getDefaultUniformValue",function(){return n});function n(e,t){switch(e){case"f32":return 0;case"vec2<f32>":return new Float32Array(2*t);case"vec3<f32>":return new Float32Array(3*t);case"vec4<f32>":return new Float32Array(4*t);case"mat2x2<f32>":return new Float32Array([1,0,0,1]);case"mat3x3<f32>":return new Float32Array([1,0,0,0,1,0,0,0,1]);case"mat4x4<f32>":return new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1])}return null}}),n("iFPuJ",function(t,r){e(t.exports,"BatchableSprite",function(){return n});class n{constructor(){this.vertexSize=4,this.indexSize=6,this.location=0,this.batcher=null,this.batch=null,this.roundPixels=0}get blendMode(){return this.renderable.groupBlendMode}packAttributes(e,t,r,n){let o=this.renderable,i=this.texture,s=o.groupTransform,u=s.a,a=s.b,l=s.c,c=s.d,f=s.tx,d=s.ty,m=this.bounds,p=m.maxX,h=m.minX,g=m.maxY,x=m.minY,v=i.uvs,b=o.groupColorAlpha,P=n<<16|65535&this.roundPixels;e[r+0]=u*h+l*x+f,e[r+1]=c*x+a*h+d,e[r+2]=v.x0,e[r+3]=v.y0,t[r+4]=b,t[r+5]=P,e[r+6]=u*p+l*x+f,e[r+7]=c*x+a*p+d,e[r+8]=v.x1,e[r+9]=v.y1,t[r+10]=b,t[r+11]=P,e[r+12]=u*p+l*g+f,e[r+13]=c*g+a*p+d,e[r+14]=v.x2,e[r+15]=v.y2,t[r+16]=b,t[r+17]=P,e[r+18]=u*h+l*g+f,e[r+19]=c*g+a*h+d,e[r+20]=v.x3,e[r+21]=v.y3,t[r+22]=b,t[r+23]=P}packIndex(e,t,r){e[t]=r+0,e[t+1]=r+1,e[t+2]=r+2,e[t+3]=r+0,e[t+4]=r+2,e[t+5]=r+3}reset(){this.renderable=null,this.texture=null,this.batcher=null,this.batch=null,this.bounds=null}}}),n("iobqC",function(t,n){e(t.exports,"TexturePool",function(){return a});var o=r("22nXN"),i=r("fW1pC"),s=r("2ayin");let u=0,a=new class{constructor(e){this._poolKeyHash=Object.create(null),this._texturePool={},this.textureOptions=e||{},this.enableFullScreen=!1}createTexture(e,t,r){let n=new i.TextureSource({...this.textureOptions,width:e,height:t,resolution:1,antialias:r,autoGarbageCollect:!0});return new s.Texture({source:n,label:`texturePool_${u++}`})}getOptimalTexture(e,t,r=1,n){let i=Math.ceil(e*r-1e-6),s=Math.ceil(t*r-1e-6),u=((i=(0,o.nextPow2)(i))<<17)+((s=(0,o.nextPow2)(s))<<1)+(n?1:0);this._texturePool[u]||(this._texturePool[u]=[]);let a=this._texturePool[u].pop();return a||(a=this.createTexture(i,s,n)),a.source._resolution=r,a.source.width=i/r,a.source.height=s/r,a.source.pixelWidth=i,a.source.pixelHeight=s,a.frame.x=0,a.frame.y=0,a.frame.width=e,a.frame.height=t,a.updateUvs(),this._poolKeyHash[a.uid]=u,a}getSameSizeTexture(e,t=!1){let r=e.source;return this.getOptimalTexture(e.width,e.height,r._resolution,t)}returnTexture(e){let t=this._poolKeyHash[e.uid];this._texturePool[t].push(e)}clear(e){if(e=!1!==e)for(let e in this._texturePool){let t=this._texturePool[e];if(t)for(let e=0;e<t.length;e++)t[e].destroy(!0)}this._texturePool={}}}}),n("6sEaf",function(t,n){e(t.exports,"compileHighShaderGpuProgram",function(){return l}),e(t.exports,"compileHighShaderGlProgram",function(){return c});var o=r("inAWw"),i=r("7oN5V"),s=r("iGzVZ"),u=r("bNp0Y"),a=r("dRuBh");function l({bits:e,name:t}){let r=(0,s.compileHighShader)({template:{fragment:u.fragmentGPUTemplate,vertex:u.vertexGPUTemplate},bits:[a.globalUniformsBit,...e]});return(0,i.GpuProgram).from({name:t,vertex:{source:r.vertex,entryPoint:"main"},fragment:{source:r.fragment,entryPoint:"main"}})}function c({bits:e,name:t}){return new o.GlProgram({name:t,...(0,s.compileHighShaderGl)({template:{vertex:u.vertexGlTemplate,fragment:u.fragmentGlTemplate},bits:[a.globalUniformsBitGl,...e]})})}}),n("inAWw",function(t,n){e(t.exports,"GlProgram",function(){return m});var o=r("fbbt8"),i=r("bnEKP"),s=r("jJ69z"),u=r("bjL4S"),a=r("k8dC7"),l=r("bDS5s");let c={stripVersion:r("755Je").stripVersion,ensurePrecision:u.ensurePrecision,addProgramDefines:s.addProgramDefines,setProgramName:l.setProgramName,insertVersion:a.insertVersion},f=Object.create(null),d=class e{constructor(t){let r=-1!==(t={...e.defaultOptions,...t}).fragment.indexOf("#version 300 es"),n={stripVersion:r,ensurePrecision:{requestedFragmentPrecision:t.preferredFragmentPrecision,requestedVertexPrecision:t.preferredVertexPrecision,maxSupportedVertexPrecision:"highp",maxSupportedFragmentPrecision:(0,i.getMaxFragmentPrecision)()},setProgramName:{name:t.name},addProgramDefines:r,insertVersion:r},s=t.fragment,u=t.vertex;Object.keys(c).forEach(e=>{let t=n[e];s=c[e](s,t,!0),u=c[e](u,t,!1)}),this.fragment=s,this.vertex=u,this._key=(0,o.createIdFromString)(`${this.vertex}:${this.fragment}`,"gl-program")}destroy(){this.fragment=null,this.vertex=null,this._attributeData=null,this._uniformData=null,this._uniformBlockData=null,this.transformFeedbackVaryings=null}static from(t){let r=`${t.vertex}:${t.fragment}`;return f[r]||(f[r]=new e(t)),f[r]}};d.defaultOptions={preferredVertexPrecision:"highp",preferredFragmentPrecision:"mediump"};let m=d}),n("bnEKP",function(t,n){let o;e(t.exports,"getMaxFragmentPrecision",function(){return s});var i=r("beL1p");function s(){if(!o){o="mediump";let e=(0,i.getTestContext)();e&&e.getShaderPrecisionFormat&&(o=e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision?"highp":"mediump")}return o}}),n("beL1p",function(t,n){let o;e(t.exports,"getTestContext",function(){return s});var i=r("4k0ap");function s(){return(!o||o?.isContextLost())&&(o=(0,i.DOMAdapter).get().createCanvas().getContext("webgl",{})),o}}),n("jJ69z",function(t,r){e(t.exports,"addProgramDefines",function(){return n});function n(e,t,r){return t?e:r?(e=e.replace("out vec4 finalColor;",""),`
        
        #ifdef GL_ES // This checks if it is WebGL1
        #define in varying
        #define finalColor gl_FragColor
        #define texture texture2D
        #endif
        ${e}
        `):`
        
        #ifdef GL_ES // This checks if it is WebGL1
        #define in attribute
        #define out varying
        #endif
        ${e}
        `}}),n("bjL4S",function(t,r){e(t.exports,"ensurePrecision",function(){return n});function n(e,t,r){let n=r?t.maxSupportedFragmentPrecision:t.maxSupportedVertexPrecision;if("precision"!==e.substring(0,9)){let o=r?t.requestedFragmentPrecision:t.requestedVertexPrecision;return"highp"===o&&"highp"!==n&&(o="mediump"),`precision ${o} float;
${e}`}return"highp"!==n&&"precision highp"===e.substring(0,15)?e.replace("precision highp","precision mediump"):e}}),n("k8dC7",function(t,r){e(t.exports,"insertVersion",function(){return n});function n(e,t){return t?`#version 300 es
${e}`:e}}),n("bDS5s",function(t,r){e(t.exports,"setProgramName",function(){return i});let n={},o={};function i(e,{name:t="pixi-program"},r=!0){t=t.replace(/\s+/g,"-")+(r?"-fragment":"-vertex");let i=r?n:o;if(i[t]?(i[t]++,t+=`-${i[t]}`):i[t]=1,-1!==e.indexOf("#define SHADER_NAME"))return e;let s=`#define SHADER_NAME ${t}`;return`${s}
${e}`}}),n("755Je",function(t,r){e(t.exports,"stripVersion",function(){return n});function n(e,t){return t?e.replace("#version 300 es",""):e}}),n("7oN5V",function(t,n){e(t.exports,"GpuProgram",function(){return f});var o=r("fbbt8"),i=r("2MIkq"),s=r("bO1R5"),u=r("82Uw9"),a=r("lY4nf"),l=r("dR603");let c=Object.create(null);class f{constructor(e){this._layoutKey=0;let{fragment:t,vertex:r,layout:n,gpuLayout:o,name:i}=e;if(this.name=i,this.fragment=t,this.vertex=r,t.source===r.source){let e=(0,s.extractStructAndGroups)(t.source);this.structsAndGroups=e}else{let e=(0,s.extractStructAndGroups)(r.source),n=(0,s.extractStructAndGroups)(t.source);this.structsAndGroups=(0,l.removeStructAndGroupDuplicates)(e,n)}this.layout=n??(0,a.generateLayoutHash)(this.structsAndGroups),this.gpuLayout=o??(0,u.generateGpuLayoutGroups)(this.structsAndGroups),this.autoAssignGlobalUniforms=this.layout[0]?.globalUniforms!==void 0,this.autoAssignLocalUniforms=this.layout[1]?.localUniforms!==void 0,this._generateProgramKey()}_generateProgramKey(){let{vertex:e,fragment:t}=this,r=e.source+t.source+e.entryPoint+t.entryPoint;this._layoutKey=(0,o.createIdFromString)(r,"program")}get attributeData(){return this._attributeData??(this._attributeData=(0,i.extractAttributesFromGpuProgram)(this.vertex)),this._attributeData}destroy(){this.gpuLayout=null,this.layout=null,this.structsAndGroups=null,this.fragment=null,this.vertex=null}static from(e){let t=`${e.vertex.source}:${e.fragment.source}:${e.fragment.entryPoint}:${e.vertex.entryPoint}`;return c[t]||(c[t]=new f(e)),c[t]}}}),n("2MIkq",function(t,n){e(t.exports,"extractAttributesFromGpuProgram",function(){return s});var o=r("aBCYy");let i={f32:"float32","vec2<f32>":"float32x2","vec3<f32>":"float32x3","vec4<f32>":"float32x4",vec2f:"float32x2",vec3f:"float32x3",vec4f:"float32x4",i32:"sint32","vec2<i32>":"sint32x2","vec3<i32>":"sint32x3","vec4<i32>":"sint32x4",u32:"uint32","vec2<u32>":"uint32x2","vec3<u32>":"uint32x3","vec4<u32>":"uint32x4",bool:"uint32","vec2<bool>":"uint32x2","vec3<bool>":"uint32x3","vec4<bool>":"uint32x4"};function s({source:e,entryPoint:t}){let r={},n=e.indexOf(`fn ${t}`);if(-1!==n){let t=e.indexOf("->",n);if(-1!==t){let s;let u=e.substring(n,t),a=/@location\((\d+)\)\s+([a-zA-Z0-9_]+)\s*:\s*([a-zA-Z0-9_<>]+)(?:,|\s|$)/g;for(;null!==(s=a.exec(u));){let e=i[s[3]]??"float32";r[s[2]]={location:parseInt(s[1],10),format:e,stride:(0,o.getAttributeInfoFromFormat)(e).stride,offset:0,instance:!1,start:0}}}}return r}}),n("aBCYy",function(t,r){e(t.exports,"getAttributeInfoFromFormat",function(){return o});let n={uint8x2:{size:2,stride:2,normalised:!1},uint8x4:{size:4,stride:4,normalised:!1},sint8x2:{size:2,stride:2,normalised:!1},sint8x4:{size:4,stride:4,normalised:!1},unorm8x2:{size:2,stride:2,normalised:!0},unorm8x4:{size:4,stride:4,normalised:!0},snorm8x2:{size:2,stride:2,normalised:!0},snorm8x4:{size:4,stride:4,normalised:!0},uint16x2:{size:2,stride:4,normalised:!1},uint16x4:{size:4,stride:8,normalised:!1},sint16x2:{size:2,stride:4,normalised:!1},sint16x4:{size:4,stride:8,normalised:!1},unorm16x2:{size:2,stride:4,normalised:!0},unorm16x4:{size:4,stride:8,normalised:!0},snorm16x2:{size:2,stride:4,normalised:!0},snorm16x4:{size:4,stride:8,normalised:!0},float16x2:{size:2,stride:4,normalised:!1},float16x4:{size:4,stride:8,normalised:!1},float32:{size:1,stride:4,normalised:!1},float32x2:{size:2,stride:8,normalised:!1},float32x3:{size:3,stride:12,normalised:!1},float32x4:{size:4,stride:16,normalised:!1},uint32:{size:1,stride:4,normalised:!1},uint32x2:{size:2,stride:8,normalised:!1},uint32x3:{size:3,stride:12,normalised:!1},uint32x4:{size:4,stride:16,normalised:!1},sint32:{size:1,stride:4,normalised:!1},sint32x2:{size:2,stride:8,normalised:!1},sint32x3:{size:3,stride:12,normalised:!1},sint32x4:{size:4,stride:16,normalised:!1}};function o(e){return n[e]??n.float32}}),n("bO1R5",function(t,r){e(t.exports,"extractStructAndGroups",function(){return n});function n(e){let t=/@group\((\d+)\)/,r=/@binding\((\d+)\)/,n=/var(<[^>]+>)? (\w+)/,o=/:\s*(\w+)/,i=/(\w+)\s*:\s*([\w\<\>]+)/g,s=/struct\s+(\w+)/,u=e.match(/(^|[^/])@(group|binding)\(\d+\)[^;]+;/g)?.map(e=>({group:parseInt(e.match(t)[1],10),binding:parseInt(e.match(r)[1],10),name:e.match(n)[2],isUniform:"<uniform>"===e.match(n)[1],type:e.match(o)[1]}));if(!u)return{groups:[],structs:[]};let a=e.match(/struct\s+(\w+)\s*{([^}]+)}/g)?.map(e=>{let t=e.match(s)[1],r=e.match(i).reduce((e,t)=>{let[r,n]=t.split(":");return e[r.trim()]=n.trim(),e},{});return r?{name:t,members:r}:null}).filter(({name:e})=>u.some(t=>t.type===e))??[];return{groups:u,structs:a}}}),n("82Uw9",function(t,n){e(t.exports,"generateGpuLayoutGroups",function(){return i});var o=r("49KiJ");function i({groups:e}){let t=[];for(let r=0;r<e.length;r++){let n=e[r];t[n.group]||(t[n.group]=[]),n.isUniform?t[n.group].push({binding:n.binding,visibility:o.ShaderStage.VERTEX|o.ShaderStage.FRAGMENT,buffer:{type:"uniform"}}):"sampler"===n.type?t[n.group].push({binding:n.binding,visibility:o.ShaderStage.FRAGMENT,sampler:{type:"filtering"}}):"texture_2d"===n.type&&t[n.group].push({binding:n.binding,visibility:o.ShaderStage.FRAGMENT,texture:{sampleType:"float",viewDimension:"2d",multisampled:!1}})}return t}}),n("49KiJ",function(t,r){e(t.exports,"ShaderStage",function(){return o});var n,o=((n=o||{})[n.VERTEX=1]="VERTEX",n[n.FRAGMENT=2]="FRAGMENT",n[n.COMPUTE=4]="COMPUTE",n)}),n("lY4nf",function(t,r){e(t.exports,"generateLayoutHash",function(){return n});function n({groups:e}){let t=[];for(let r=0;r<e.length;r++){let n=e[r];t[n.group]||(t[n.group]={}),t[n.group][n.name]=n.binding}return t}}),n("dR603",function(t,r){e(t.exports,"removeStructAndGroupDuplicates",function(){return n});function n(e,t){let r=new Set,n=new Set;return{structs:[...e.structs,...t.structs].filter(e=>!r.has(e.name)&&(r.add(e.name),!0)),groups:[...e.groups,...t.groups].filter(e=>{let t=`${e.name}-${e.binding}`;return!n.has(t)&&(n.add(t),!0)})}}}),n("iGzVZ",function(t,n){e(t.exports,"compileHighShader",function(){return d}),e(t.exports,"compileHighShaderGl",function(){return m});var o=r("bNOSU"),i=r("7Xnnt"),s=r("4DJGO"),u=r("fyGDY"),a=r("3uZfa");let l=Object.create(null),c=new Map,f=0;function d({template:e,bits:t}){let r=p(e,t);if(l[r])return l[r];let{vertex:n,fragment:o}=function(e,t){let r=t.map(e=>e.vertex).filter(e=>!!e),n=t.map(e=>e.fragment).filter(e=>!!e),o=(0,s.compileInputs)(r,e.vertex,!0);return{vertex:o=(0,u.compileOutputs)(r,o),fragment:(0,s.compileInputs)(n,e.fragment,!0)}}(e,t);return l[r]=h(n,o,t),l[r]}function m({template:e,bits:t}){let r=p(e,t);return l[r]||(l[r]=h(e.vertex,e.fragment,t)),l[r]}function p(e,t){return t.map(e=>(c.has(e)||c.set(e,f++),c.get(e))).sort((e,t)=>e-t).join("-")+e.vertex+e.fragment}function h(e,t,r){let n=(0,i.compileHooks)(e),s=(0,i.compileHooks)(t);return r.forEach(e=>{(0,o.addBits)(e.vertex,n,e.name),(0,o.addBits)(e.fragment,s,e.name)}),{vertex:(0,a.injectBits)(e,n),fragment:(0,a.injectBits)(t,s)}}}),n("bNOSU",function(t,n){e(t.exports,"addBits",function(){return i});var o=r("8wKXC");function i(e,t,r){if(e)for(let n in e){let i=t[n.toLocaleLowerCase()];if(i){let t=e[n];"header"===n&&(t=t.replace(/@in\s+[^;]+;\s*/g,"").replace(/@out\s+[^;]+;\s*/g,"")),r&&i.push(`//----${r}----//`),i.push(t)}else(0,o.warn)(`${n} placement hook does not exist in shader`)}}}),n("7Xnnt",function(t,r){e(t.exports,"compileHooks",function(){return o});let n=/\{\{(.*?)\}\}/g;function o(e){let t={};return(e.match(n)?.map(e=>e.replace(/[{()}]/g,""))??[]).forEach(e=>{t[e]=[]}),t}}),n("4DJGO",function(t,r){function n(e,t){let r;let n=/@in\s+([^;]+);/g;for(;null!==(r=n.exec(e));)t.push(r[1])}function o(e,t,r=!1){let o=[];n(t,o),e.forEach(e=>{e.header&&n(e.header,o)}),r&&o.sort();let i=o.map((e,t)=>`       @location(${t}) ${e},`).join("\n");return t.replace(/@in\s+[^;]+;\s*/g,"").replace("{{in}}",`
${i}
`)}e(t.exports,"compileInputs",function(){return o})}),n("fyGDY",function(t,r){function n(e,t){let r;let n=/@out\s+([^;]+);/g;for(;null!==(r=n.exec(e));)t.push(r[1])}function o(e,t){let r=[];n(t,r),e.forEach(e=>{e.header&&n(e.header,r)});let o=0,i=r.sort().map(e=>e.indexOf("builtin")>-1?e:`@location(${o++}) ${e}`).join(",\n"),s=r.sort().map(e=>`       var ${e.replace(/@.*?\s+/g,"")};`).join("\n"),u=`return VSOutput(
                ${r.sort().map(e=>` ${function(e){let t=/\b(\w+)\s*:/g.exec(e);return t?t[1]:""}(e)}`).join(",\n")});`,a=t.replace(/@out\s+[^;]+;\s*/g,"");return(a=(a=a.replace("{{struct}}",`
${i}
`)).replace("{{start}}",`
${s}
`)).replace("{{return}}",`
${u}
`)}e(t.exports,"compileOutputs",function(){return o})}),n("3uZfa",function(t,r){e(t.exports,"injectBits",function(){return n});function n(e,t){let r=e;for(let e in t){let n=t[e];r=n.join("\n").length?r.replace(`{{${e}}}`,`//-----${e} START-----//
${n.join("\n")}
//----${e} FINISH----//`):r.replace(`{{${e}}}`,"")}return r}}),n("bNp0Y",function(t,r){e(t.exports,"vertexGPUTemplate",function(){return n}),e(t.exports,"fragmentGPUTemplate",function(){return o}),e(t.exports,"vertexGlTemplate",function(){return i}),e(t.exports,"fragmentGlTemplate",function(){return s});let n=`
    @in aPosition: vec2<f32>;
    @in aUV: vec2<f32>;

    @out @builtin(position) vPosition: vec4<f32>;
    @out vUV : vec2<f32>;
    @out vColor : vec4<f32>;

    {{header}}

    struct VSOutput {
        {{struct}}
    };

    @vertex
    fn main( {{in}} ) -> VSOutput {

        var worldTransformMatrix = globalUniforms.uWorldTransformMatrix;
        var modelMatrix = mat3x3<f32>(
            1.0, 0.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 0.0, 1.0
          );
        var position = aPosition;
        var uv = aUV;

        {{start}}
        
        vColor = vec4<f32>(1., 1., 1., 1.);

        {{main}}

        vUV = uv;

        var modelViewProjectionMatrix = globalUniforms.uProjectionMatrix * worldTransformMatrix * modelMatrix;

        vPosition =  vec4<f32>((modelViewProjectionMatrix *  vec3<f32>(position, 1.0)).xy, 0.0, 1.0);
       
        vColor *= globalUniforms.uWorldColorAlpha;

        {{end}}

        {{return}}
    };
`,o=`
    @in vUV : vec2<f32>;
    @in vColor : vec4<f32>;
   
    {{header}}

    @fragment
    fn main(
        {{in}}
      ) -> @location(0) vec4<f32> {
        
        {{start}}

        var outColor:vec4<f32>;
      
        {{main}}
        
        return outColor * vColor;
      };
`,i=`
    in vec2 aPosition;
    in vec2 aUV;

    out vec4 vColor;
    out vec2 vUV;

    {{header}}

    void main(void){

        mat3 worldTransformMatrix = uWorldTransformMatrix;
        mat3 modelMatrix = mat3(
            1.0, 0.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 0.0, 1.0
          );
        vec2 position = aPosition;
        vec2 uv = aUV;
        
        {{start}}
        
        vColor = vec4(1.);
        
        {{main}}
        
        vUV = uv;
        
        mat3 modelViewProjectionMatrix = uProjectionMatrix * worldTransformMatrix * modelMatrix;

        gl_Position = vec4((modelViewProjectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);

        vColor *= uWorldColorAlpha;

        {{end}}
    }
`,s=`
   
    in vec4 vColor;
    in vec2 vUV;

    out vec4 finalColor;

    {{header}}

    void main(void) {
        
        {{start}}

        vec4 outColor;
      
        {{main}}
        
        finalColor = outColor * vColor;
    }
`}),n("dRuBh",function(t,r){e(t.exports,"globalUniformsBit",function(){return n}),e(t.exports,"globalUniformsBitGl",function(){return o});let n={name:"global-uniforms-bit",vertex:{header:`
        struct GlobalUniforms {
            uProjectionMatrix:mat3x3<f32>,
            uWorldTransformMatrix:mat3x3<f32>,
            uWorldColorAlpha: vec4<f32>,
            uResolution: vec2<f32>,
        }

        @group(0) @binding(0) var<uniform> globalUniforms : GlobalUniforms;
        `}},o={name:"global-uniforms-bit",vertex:{header:`
          uniform mat3 uProjectionMatrix;
          uniform mat3 uWorldTransformMatrix;
          uniform vec4 uWorldColorAlpha;
          uniform vec2 uResolution;
        `}}}),n("lPksw",function(t,r){e(t.exports,"colorBit",function(){return n}),e(t.exports,"colorBitGl",function(){return o});let n={name:"color-bit",vertex:{header:`
            @in aColor: vec4<f32>;
        `,main:`
            vColor *= vec4<f32>(aColor.rgb * aColor.a, aColor.a);
        `}},o={name:"color-bit",vertex:{header:`
            in vec4 aColor;
        `,main:`
            vColor *= vec4(aColor.rgb * aColor.a, aColor.a);
        `}}}),n("fr9CJ",function(t,r){e(t.exports,"generateTextureBatchBit",function(){return o}),e(t.exports,"generateTextureBatchBitGl",function(){return s});let n={};function o(e){return n[e]||(n[e]={name:"texture-batch-bit",vertex:{header:`
                @in aTextureIdAndRound: vec2<u32>;
                @out @interpolate(flat) vTextureId : u32;
            `,main:`
                vTextureId = aTextureIdAndRound.y;
            `,end:`
                if(aTextureIdAndRound.x == 1)
                {
                    vPosition = vec4<f32>(roundPixels(vPosition.xy, globalUniforms.uResolution), vPosition.zw);
                }
            `},fragment:{header:`
                @in @interpolate(flat) vTextureId: u32;
    
                ${function(e){let t=[];{let e=0;for(let r=0;r<16;r++)t.push(`@group(1) @binding(${e++}) var textureSource${r+1}: texture_2d<f32>;`),t.push(`@group(1) @binding(${e++}) var textureSampler${r+1}: sampler;`)}return t.join("\n")}(0)}
            `,main:`
                var uvDx = dpdx(vUV);
                var uvDy = dpdy(vUV);
    
                ${function(e){let t=[];t.push("switch vTextureId {");for(let e=0;e<16;e++)15===e?t.push("  default:{"):t.push(`  case ${e}:{`),t.push(`      outColor = textureSampleGrad(textureSource${e+1}, textureSampler${e+1}, vUV, uvDx, uvDy);`),t.push("      break;}");return t.push("}"),t.join("\n")}(16)}
            `}}),n[e]}let i={};function s(e){return i[e]||(i[e]={name:"texture-batch-bit",vertex:{header:`
                in vec2 aTextureIdAndRound;
                out float vTextureId;
              
            `,main:`
                vTextureId = aTextureIdAndRound.y;
            `,end:`
                if(aTextureIdAndRound.x == 1.)
                {
                    gl_Position.xy = roundPixels(gl_Position.xy, uResolution);
                }
            `},fragment:{header:`
                in float vTextureId;
    
                uniform sampler2D uTextures[${e}];
              
            `,main:`
    
                ${function(e){let t=[];for(let e=0;e<16;e++)e>0&&t.push("else"),e<15&&t.push(`if(vTextureId < ${e}.5)`),t.push("{"),t.push(`	outColor = texture(uTextures[${e}], vUV);`),t.push("}");return t.join("\n")}(0)}
            `}}),i[e]}}),n("i04eP",function(t,r){e(t.exports,"roundPixelsBit",function(){return n}),e(t.exports,"roundPixelsBitGl",function(){return o});let n={name:"round-pixels-bit",vertex:{header:`
            fn roundPixels(position: vec2<f32>, targetSize: vec2<f32>) -> vec2<f32> 
            {
                return (floor(((position * 0.5 + 0.5) * targetSize) + 0.5) / targetSize) * 2.0 - 1.0;
            }
        `}},o={name:"round-pixels-bit",vertex:{header:`   
            vec2 roundPixels(vec2 position, vec2 targetSize)
            {       
                return (floor(((position * 0.5 + 0.5) * targetSize) + 0.5) / targetSize) * 2.0 - 1.0;
            }
        `}}}),n("6ss2x",function(n,o){e(n.exports,"Shader",function(){return f});var i=r("it4sJ"),s=r("inAWw"),u=r("kdNqP"),a=r("7oN5V"),l=r("ejgKW"),c=r("iOPov");class f extends t(i){constructor(e){super(),this._uniformBindMap=Object.create(null),this._ownedBindGroups=[];let{gpuProgram:t,glProgram:r,groups:n,resources:o,compatibleRenderers:i,groupMap:s}=e;this.gpuProgram=t,this.glProgram=r,void 0===i&&(i=0,t&&(i|=l.RendererType.WEBGPU),r&&(i|=l.RendererType.WEBGL)),this.compatibleRenderers=i;let a={};if(o||n||(o={}),o&&n)throw Error("[Shader] Cannot have both resources and groups");if(t||!n||s){if(!t&&n&&s)for(let e in s)for(let t in s[e]){let r=s[e][t];a[r]={group:e,binding:t,name:r}}else if(t&&n&&!s){let e=t.structsAndGroups.groups;s={},e.forEach(e=>{s[e.group]=s[e.group]||{},s[e.group][e.binding]=e.name,a[e.name]=e})}else if(o){if(t){let e=t.structsAndGroups.groups;s={},e.forEach(e=>{s[e.group]=s[e.group]||{},s[e.group][e.binding]=e.name,a[e.name]=e})}else{s={},n={99:new u.BindGroup},this._ownedBindGroups.push(n[99]);let e=0;for(let t in o)a[t]={group:99,binding:e,name:t},s[99]=s[99]||{},s[99][e]=t,e++}for(let e in n={},o){let t=o[e];t.source||t._resourceType||(t=new c.UniformGroup(t));let r=a[e];r&&(n[r.group]||(n[r.group]=new u.BindGroup,this._ownedBindGroups.push(n[r.group])),n[r.group].setResource(t,r.binding))}}}else throw Error("[Shader] No group map or WebGPU shader provided - consider using resources instead.");this.groups=n,this._uniformBindMap=s,this.resources=this._buildResourceAccessor(n,a)}addResource(e,t,r){var n,o;(n=this._uniformBindMap)[t]||(n[t]={}),(o=this._uniformBindMap[t])[r]||(o[r]=e),this.groups[t]||(this.groups[t]=new u.BindGroup,this._ownedBindGroups.push(this.groups[t]))}_buildResourceAccessor(e,t){let r={};for(let n in t){let o=t[n];Object.defineProperty(r,o.name,{get:()=>e[o.group].getResource(o.binding),set(t){e[o.group].setResource(t,o.binding)}})}return r}destroy(e=!1){this.emit("destroy",this),e&&(this.gpuProgram?.destroy(),this.glProgram?.destroy()),this.gpuProgram=null,this.glProgram=null,this.removeAllListeners(),this._uniformBindMap=null,this._ownedBindGroups.forEach(e=>{e.destroy()}),this._ownedBindGroups=null,this.resources=null,this.groups=null}static from(e){let t,r;let{gpu:n,gl:o,...i}=e;return n&&(t=(0,a.GpuProgram).from(n)),o&&(r=(0,s.GlProgram).from(o)),new f({gpuProgram:t,glProgram:r,...i})}}}),n("ejgKW",function(t,r){e(t.exports,"RendererType",function(){return o});var n,o=((n=o||{})[n.WEBGL=1]="WEBGL",n[n.WEBGPU=2]="WEBGPU",n[n.BOTH=3]="BOTH",n)}),n("3pKBw",function(t,r){e(t.exports,"localUniformBit",function(){return n}),e(t.exports,"localUniformBitGroup2",function(){return o}),e(t.exports,"localUniformBitGl",function(){return i});let n={name:"local-uniform-bit",vertex:{header:`

            struct LocalUniforms {
                uTransformMatrix:mat3x3<f32>,
                uColor:vec4<f32>,
                uRound:f32,
            }

            @group(1) @binding(0) var<uniform> localUniforms : LocalUniforms;
        `,main:`
            vColor *= localUniforms.uColor;
            modelMatrix *= localUniforms.uTransformMatrix;
        `,end:`
            if(localUniforms.uRound == 1)
            {
                vPosition = vec4(roundPixels(vPosition.xy, globalUniforms.uResolution), vPosition.zw);
            }
        `}},o={...n,vertex:{...n.vertex,header:n.vertex.header.replace("group(1)","group(2)")}},i={name:"local-uniform-bit",vertex:{header:`

            uniform mat3 uTransformMatrix;
            uniform vec4 uColor;
            uniform float uRound;
        `,main:`
            vColor *= uColor;
            modelMatrix = uTransformMatrix;
        `,end:`
            if(uRound == 1.)
            {
                gl_Position.xy = roundPixels(gl_Position.xy, uResolution);
            }
        `}}})}();
//# sourceMappingURL=browserAll.a84349a1.js.map
