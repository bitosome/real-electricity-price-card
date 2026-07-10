/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),r=new WeakMap;let s=class{constructor(t,e,r){if(this._$cssResult$=!0,r!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=r.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&r.set(i,t))}return t}toString(){return this.cssText}};const n=t=>new s("string"==typeof t?t:t+"",void 0,i),o=(t,...e)=>{const r=1===t.length?t[0]:e.reduce((e,i,r)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[r+1],t[0]);return new s(r,t,i)},a=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return n(e)})(t):t,{is:c,defineProperty:l,getOwnPropertyDescriptor:h,getOwnPropertyNames:p,getOwnPropertySymbols:d,getPrototypeOf:u}=Object,m=globalThis,f=m.trustedTypes,g=f?f.emptyScript:"",_=m.reactiveElementPolyfillSupport,$=(t,e)=>t,b={toAttribute(t,e){switch(e){case Boolean:t=t?g:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},y=(t,e)=>!c(t,e),x={attribute:!0,type:String,converter:b,reflect:!1,useDefault:!1,hasChanged:y};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),m.litPropertyMetadata??=new WeakMap;let v=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=x){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(t,i,e);void 0!==r&&l(this.prototype,t,r)}}static getPropertyDescriptor(t,e,i){const{get:r,set:s}=h(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:r,set(e){const n=r?.call(this);s?.call(this,e),this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??x}static _$Ei(){if(this.hasOwnProperty($("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty($("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty($("properties"))){const t=this.properties,e=[...p(t),...d(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,r)=>{if(e)i.adoptedStyleSheets=r.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of r){const r=document.createElement("style"),s=t.litNonce;void 0!==s&&r.setAttribute("nonce",s),r.textContent=e.cssText,i.appendChild(r)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),r=this.constructor._$Eu(t,i);if(void 0!==r&&!0===i.reflect){const s=(void 0!==i.converter?.toAttribute?i.converter:b).toAttribute(e,i.type);this._$Em=t,null==s?this.removeAttribute(r):this.setAttribute(r,s),this._$Em=null}}_$AK(t,e){const i=this.constructor,r=i._$Eh.get(t);if(void 0!==r&&this._$Em!==r){const t=i.getPropertyOptions(r),s="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:b;this._$Em=r;const n=s.fromAttribute(e,t.type);this[r]=n??this._$Ej?.get(r)??n,this._$Em=null}}requestUpdate(t,e,i,r=!1,s){if(void 0!==t){const n=this.constructor;if(!1===r&&(s=this[t]),i??=n.getPropertyOptions(t),!((i.hasChanged??y)(s,e)||i.useDefault&&i.reflect&&s===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:r,wrapped:s},n){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),!0!==s||void 0!==n)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===r&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,r=this[e];!0!==t||this._$AL.has(e)||void 0===r||this.C(e,void 0,i,r)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};v.elementStyles=[],v.shadowRootOptions={mode:"open"},v[$("elementProperties")]=new Map,v[$("finalized")]=new Map,_?.({ReactiveElement:v}),(m.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const w=globalThis,A=t=>t,k=w.trustedTypes,E=k?k.createPolicy("lit-html",{createHTML:t=>t}):void 0,C="$lit$",S=`lit$${Math.random().toFixed(9).slice(2)}$`,M="?"+S,P=`<${M}>`,N=document,T=()=>N.createComment(""),F=t=>null===t||"object"!=typeof t&&"function"!=typeof t,U=Array.isArray,z="[ \t\n\f\r]",H=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,O=/-->/g,R=/>/g,I=RegExp(`>|${z}(?:([^\\s"'>=/]+)(${z}*=${z}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),D=/'/g,L=/"/g,j=/^(?:script|style|textarea|title)$/i,B=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),V=B(1),W=B(2),q=Symbol.for("lit-noChange"),G=Symbol.for("lit-nothing"),Z=new WeakMap,J=N.createTreeWalker(N,129);function K(t,e){if(!U(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(e):e}const Y=(t,e)=>{const i=t.length-1,r=[];let s,n=2===e?"<svg>":3===e?"<math>":"",o=H;for(let e=0;e<i;e++){const i=t[e];let a,c,l=-1,h=0;for(;h<i.length&&(o.lastIndex=h,c=o.exec(i),null!==c);)h=o.lastIndex,o===H?"!--"===c[1]?o=O:void 0!==c[1]?o=R:void 0!==c[2]?(j.test(c[2])&&(s=RegExp("</"+c[2],"g")),o=I):void 0!==c[3]&&(o=I):o===I?">"===c[0]?(o=s??H,l=-1):void 0===c[1]?l=-2:(l=o.lastIndex-c[2].length,a=c[1],o=void 0===c[3]?I:'"'===c[3]?L:D):o===L||o===D?o=I:o===O||o===R?o=H:(o=I,s=void 0);const p=o===I&&t[e+1].startsWith("/>")?" ":"";n+=o===H?i+P:l>=0?(r.push(a),i.slice(0,l)+C+i.slice(l)+S+p):i+S+(-2===l?e:p)}return[K(t,n+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),r]};class X{constructor({strings:t,_$litType$:e},i){let r;this.parts=[];let s=0,n=0;const o=t.length-1,a=this.parts,[c,l]=Y(t,e);if(this.el=X.createElement(c,i),J.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(r=J.nextNode())&&a.length<o;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(C)){const e=l[n++],i=r.getAttribute(t).split(S),o=/([.?@])?(.*)/.exec(e);a.push({type:1,index:s,name:o[2],strings:i,ctor:"."===o[1]?rt:"?"===o[1]?st:"@"===o[1]?nt:it}),r.removeAttribute(t)}else t.startsWith(S)&&(a.push({type:6,index:s}),r.removeAttribute(t));if(j.test(r.tagName)){const t=r.textContent.split(S),e=t.length-1;if(e>0){r.textContent=k?k.emptyScript:"";for(let i=0;i<e;i++)r.append(t[i],T()),J.nextNode(),a.push({type:2,index:++s});r.append(t[e],T())}}}else if(8===r.nodeType)if(r.data===M)a.push({type:2,index:s});else{let t=-1;for(;-1!==(t=r.data.indexOf(S,t+1));)a.push({type:7,index:s}),t+=S.length-1}s++}}static createElement(t,e){const i=N.createElement("template");return i.innerHTML=t,i}}function Q(t,e,i=t,r){if(e===q)return e;let s=void 0!==r?i._$Co?.[r]:i._$Cl;const n=F(e)?void 0:e._$litDirective$;return s?.constructor!==n&&(s?._$AO?.(!1),void 0===n?s=void 0:(s=new n(t),s._$AT(t,i,r)),void 0!==r?(i._$Co??=[])[r]=s:i._$Cl=s),void 0!==s&&(e=Q(t,s._$AS(t,e.values),s,r)),e}class tt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,r=(t?.creationScope??N).importNode(e,!0);J.currentNode=r;let s=J.nextNode(),n=0,o=0,a=i[0];for(;void 0!==a;){if(n===a.index){let e;2===a.type?e=new et(s,s.nextSibling,this,t):1===a.type?e=new a.ctor(s,a.name,a.strings,this,t):6===a.type&&(e=new ot(s,this,t)),this._$AV.push(e),a=i[++o]}n!==a?.index&&(s=J.nextNode(),n++)}return J.currentNode=N,r}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class et{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,r){this.type=2,this._$AH=G,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Q(this,t,e),F(t)?t===G||null==t||""===t?(this._$AH!==G&&this._$AR(),this._$AH=G):t!==this._$AH&&t!==q&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>U(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==G&&F(this._$AH)?this._$AA.nextSibling.data=t:this.T(N.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,r="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=X.createElement(K(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===r)this._$AH.p(e);else{const t=new tt(r,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=Z.get(t.strings);return void 0===e&&Z.set(t.strings,e=new X(t)),e}k(t){U(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,r=0;for(const s of t)r===e.length?e.push(i=new et(this.O(T()),this.O(T()),this,this.options)):i=e[r],i._$AI(s),r++;r<e.length&&(this._$AR(i&&i._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=A(t).nextSibling;A(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class it{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,r,s){this.type=1,this._$AH=G,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=s,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=G}_$AI(t,e=this,i,r){const s=this.strings;let n=!1;if(void 0===s)t=Q(this,t,e,0),n=!F(t)||t!==this._$AH&&t!==q,n&&(this._$AH=t);else{const r=t;let o,a;for(t=s[0],o=0;o<s.length-1;o++)a=Q(this,r[i+o],e,o),a===q&&(a=this._$AH[o]),n||=!F(a)||a!==this._$AH[o],a===G?t=G:t!==G&&(t+=(a??"")+s[o+1]),this._$AH[o]=a}n&&!r&&this.j(t)}j(t){t===G?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class rt extends it{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===G?void 0:t}}class st extends it{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==G)}}class nt extends it{constructor(t,e,i,r,s){super(t,e,i,r,s),this.type=5}_$AI(t,e=this){if((t=Q(this,t,e,0)??G)===q)return;const i=this._$AH,r=t===G&&i!==G||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,s=t!==G&&(i===G||r);r&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class ot{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Q(this,t)}}const at=w.litHtmlPolyfillSupport;at?.(X,et),(w.litHtmlVersions??=[]).push("3.3.3");const ct=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class lt extends v{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const r=i?.renderBefore??e;let s=r._$litPart$;if(void 0===s){const t=i?.renderBefore??null;r._$litPart$=s=new et(e.insertBefore(T(),t),t,void 0,i??{})}return s._$AI(t),s})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return q}}lt._$litElement$=!0,lt.finalized=!0,ct.litElementHydrateSupport?.({LitElement:lt});const ht=ct.litElementPolyfillSupport;ht?.({LitElement:lt}),(ct.litElementVersions??=[]).push("4.2.2");const pt=o`${n("\n  :host {\n    display: block;\n    /* Chip styling variables */\n    --chip-padding: 2px 2px;\n    --chip-text-font-weight: 700;\n    --chip-text-font-size: var(--chip-font-size, 12px);\n    --chip-background-color: rgba(0,0,0,0.06);\n    --chip-border-radius: var(--ha-badge-border-radius, 999px);\n    --chip-gap: 6px;\n    --main-light-on-bg: linear-gradient(135deg,#ffcf57,#ffb200);\n    --main-light-off-bg: rgba(0,0,0,0.06);\n    --main-light-icon-on-color: #ffffff;\n    --main-light-icon-off-color: var(--secondary-text-color);\n    --switch-on-color: var(--switch-on-yellow, #ffc107);\n    --switch-smart-on-color: var(--switch-on-green, #00c853);\n    --switch-lock-unlocked-color: var(--switch-unlocked-red, #e53935);\n    --switch-chip-bg: var(--chip-background-color, rgba(0,0,0,0.06));\n    --switch-icon-size: 28px;\n    --ac-chip-bg-off: rgba(158,158,158,0.95);\n    --ac-chip-bg-cool: #00aaff;\n    --ac-chip-bg-heat: #ff7043;\n    --ac-chip-bg-dry: #ffca28;\n    --ac-chip-bg-fan: #66bb6a;\n    --ac-chip-bg-auto: #26c6da;\n    --ac-chip-bg-default: rgba(0,0,0,0.06);\n    --ac-chip-icon-color: #ffffff;\n    --ac-chip-icon-off-color: #ffffff;\n    --ac-fan-color-off: gray;\n    --ac-fan-color-cool: #00aaff;\n    --ac-fan-color-heat: #ff7043;\n    --ac-fan-color-dry: #ffca28;\n    --ac-fan-color-fan: #66bb6a;\n    --ac-fan-color-auto: #26c6da;\n    --ac-fan-color-default: var(--paper-item-icon-color);\n    --thermostat-heating-color: #ff7043;\n    --thermostat-idle-color: #66bb6a;\n    --thermostat-off-color: gray;\n    --thermostat-pill-heating-bg: var(--state-climate-heat-color, #ff7043);\n    --thermostat-pill-heating-fg: var(--primary-background-color, #fff);\n    --thermostat-pill-idle-bg: var(--chip-background-color, rgba(0,0,0,0.06));\n    --thermostat-pill-idle-fg: var(--secondary-text-color);\n\n    /* Shared semantic status palette (single source of truth across cards) */\n    --status-on-color: #ffc107;\n    --status-active-color: #42a5f5;\n    --status-success-color: #66bb6a;\n    --status-alert-color: #e53935;\n    --status-warn-color: #ff9800;\n    --status-cool-color: #00aaff;\n    --status-heat-color: #ff7043;\n    --status-dry-color: #ffca28;\n    --status-fan-color: #66bb6a;\n    --status-auto-color: #26c6da;\n    --status-smartplug-on-color: #ff9800;\n    --status-presence-color: #42a5f5;\n    --status-icon-on-color: #ffffff;\n\n    /* Positioning variables */\n    --tile-padding: 8px;\n    --tile-padding-large: 12px;\n    --chip-z-index: 3;\n    --tile-z-index: 2;\n    --glow-z-index: 1;\n\n    /* Tile shape control */\n    --tile-border-radius: var(--ha-card-border-radius, 12px);\n\n    /* Common gaps and spacing */\n    --small-gap: 2px;\n    --medium-gap: 6px;\n    --large-gap: 12px;\n\n    /* Shadow variables */\n    --tile-shadow-default: 0 6px 18px rgba(0,0,0,0.10);\n    --tile-shadow-hover: 0 12px 24px rgba(0,0,0,0.16);\n    --tile-shadow-active: 0 18px 40px var(--pulse-strong, rgba(0,0,0,0.18)), 0 6px 18px var(--pulse-weak, rgba(0,0,0,0.10));\n  }\n")}`,dt="sensor.real_electricity_price_hourly_prices_today",ut="sensor.real_electricity_price_hourly_prices_tomorrow",mt="sensor.real_electricity_price_current_price",ft="number.real_electricity_price_acceptable_price",gt="€/kWh",_t=36e5,$t=48;function bt(t,e,i){t.dispatchEvent(new CustomEvent(e,{detail:i,bubbles:!0,composed:!0}))}function yt(t,e,i){const r=Number(t);if(Number.isFinite(r))return Math.max(e,Math.min(i,r))}function xt(t){if("number"==typeof t&&Number.isFinite(t))return t;if("string"==typeof t){const e=Number(t);if(Number.isFinite(e))return e;const i=new Date(t).getTime();if(Number.isFinite(i))return i}}function vt(...t){for(const e of t){if(null==e||""===e)continue;const t=Number(e);if(Number.isFinite(t))return t}}function wt(t){const e=t?.attributes?.hourly_prices;return Array.isArray(e)?e.reduce((t,e)=>{const i=e,r=Array.isArray(i)?xt(i[0]):xt(i.start_time)??xt(i.x),s=Array.isArray(i)?vt(i[1]):vt(i.actual_price,i.price,i.y,i.nord_pool_price);return void 0===r||void 0===s||t.push({timestamp:r,value:s,sourceTimestamp:r}),t},[]).sort((t,e)=>t.timestamp-e.timestamp):[]}function At(t,e){const i=[...t].sort((t,e)=>t.timestamp-e.timestamp),r=e+864e5;for(let t=0;t<=i.length-24;t+=1){const s=i.slice(t,t+24),n=It(s[0].timestamp,e+_t),o=It(s[s.length-1].timestamp,r);if(n&&o)return s.map((t,i)=>({...t,sourceTimestamp:t.timestamp,timestamp:e+i*_t}))}return i.filter(t=>t.timestamp>=e&&t.timestamp<r)}function kt(t){return"line"===(t.chart_type||t.graph_type)?"line":"bar"}function Et(t){return"click"===t.selector_mode?"click":"hover"}function Ct(t){return yt(t.height,120,360)||190}function St(t){return Math.round(yt(t.horizontal_lines,2,9)||5)}function Mt(t){return Math.round(yt(t.price_decimals,0,6)??4)}function Pt(t){return Math.round(yt(t.axis_decimals,0,4)??2)}function Nt(t,e,i=Mt(e)){return void 0!==t&&Number.isFinite(t)?`${t.toFixed(i)} ${e.unit||gt}`:"—"}function Tt(t){const e={hour:"2-digit",minute:"2-digit"},i=String(t?.locale?.time_format||"").toLowerCase();return"12"===i&&(e.hour12=!0),"24"===i&&(e.hour12=!1),e}function Ft(t){const e=t?.config?.time_zone;return"string"==typeof e&&e.trim()?e.trim():void 0}function Ut(t,e,i){const r=Ft(t),s=new Date(e);try{return new Intl.DateTimeFormat(t?.locale?.language,r?{...i,timeZone:r}:i).format(s)}catch{return new Intl.DateTimeFormat(t?.locale?.language,i).format(s)}}function zt(t,e){return`${function(t,e){return Ut(t,e,{day:"numeric",month:"long"})}(t,e)} ${function(t,e){return Ut(t,e,{...Tt(t)})}(t,e)}`}function Ht(t,e,i){return new Intl.DateTimeFormat("en-US",{...i,timeZone:e}).formatToParts(new Date(t)).reduce((t,e)=>("literal"!==e.type&&(t[e.type]=e.value),t),{})}function Ot(t,e){const i=Ht(t,e,{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",hourCycle:"h23"}),r=Number(i.year),s=Number(i.month),n=Number(i.day),o=Number(i.hour),a=Number(i.minute),c=Number(i.second);return[r,s,n,o,a,c].every(Number.isFinite)?Date.UTC(r,s-1,n,o,a,c)-t:0}function Rt(t){const e=new Date;e.setHours(0,0,0,0);const i=function(t){const e=Ft(t);if(e)try{const t=Ht(Date.now(),e,{year:"numeric",month:"2-digit",day:"2-digit"}),i=Number(t.year),r=Number(t.month),s=Number(t.day);if(![i,r,s].every(Number.isFinite))return;const n=Date.UTC(i,r-1,s,0,0,0,0),o=Ot(n,e);return n-Ot(n-o,e)}catch{return}}(t)??e.getTime();return{start:i,end:i+$t*_t}}function It(t,e){return Math.abs(t-e)<6e4}function Dt(t,e,i){const r=i.width-i.left-i.right,s=Math.max(1,e.end-e.start);return i.left+(t-e.start)/s*r}function Lt(t,e){if(!t.length)return 0;if(e<=t[0].timestamp)return 0;let i=0;for(let r=1;r<t.length&&!(t[r].timestamp>e);r+=1)i=r;return i}function jt(t,e){return Math.min(t.timestamp+_t,e.end)}function Bt(t,e,i){return Dt(jt(t,e),e,i)}function Vt(t,e,i){const r=jt(t,e);return Dt(t.timestamp+(r-t.timestamp)/2,e,i)}function Wt(t,e,i,r){const s=t.sourceTimestamp??t.timestamp,n=r>=s&&r<s+_t,o=s+_t<=r,a=void 0!==i&&t.value<=i;return n&&a?e.cheap_current_color||"#22c55e":n?e.current_hour_color||"#3b82f6":o&&a?e.cheap_past_color||"#bbf7d0":o?e.past_color||"#bfdbfe":a?e.cheap_color||"#86efac":e.future_color||"#93c5fd"}function qt(t){return{today_entity:dt,tomorrow_entity:ut,current_price_entity:mt,cheap_price_entity:ft,chart_type:"bar",selector_mode:"hover",height:190,horizontal_lines:5,price_decimals:4,axis_decimals:2,unit:gt,show_current_marker:!0,show_extremes:!0,show_stats:!0,fill_color:"rgba(56, 199, 243, 0.18)",marker_color:"#38c7f3",grid_color:"rgba(255, 255, 255, 0.14)",chart_background:"rgba(33, 52, 62, 0.88)",card_background:"var(--ha-card-background, var(--card-background-color, #1f1f1f))",...t}}class Gt extends lt{constructor(){super(...arguments),this._dragging=!1,this._stopPointer=t=>{this._dragging=!1;try{t.currentTarget.releasePointerCapture(t.pointerId)}catch{}}}static async getConfigElement(){return await customElements.whenDefined("real-electricity-price-card-editor"),document.createElement("real-electricity-price-card-editor")}static getStubConfig(){return{type:"custom:real-electricity-price-card",today_entity:dt,tomorrow_entity:ut,current_price_entity:mt,chart_type:"bar"}}setConfig(t){this._config=qt(t||{})}connectedCallback(){super.connectedCallback(),this._clockTimer=window.setInterval(()=>this.requestUpdate(),3e4)}disconnectedCallback(){void 0!==this._clockTimer&&(window.clearInterval(this._clockTimer),this._clockTimer=void 0),super.disconnectedCallback()}getCardSize(){const t=Ct(this._config||{});return Math.max(3,Math.ceil((t+150)/50))}render(){if(!this._config)return V``;const t=qt(this._config),e=Rt(this.hass),i=function(t,e,i){const r=e.today_entity||dt,s=e.tomorrow_entity||ut,n=t?.states[r],o=t?.states[s],a=At(wt(n),i.start),c=At(wt(o),i.start+864e5),l=[n?void 0:r,o?void 0:s].filter(t=>Boolean(t));return{points:[...a,...c].sort((t,e)=>t.timestamp-e.timestamp),moreInfoEntityId:n?r:o?s:void 0,missingEntityIds:l}}(this.hass,t,e);if(!i.points.length){const t=i.missingEntityIds.length?` Missing: ${i.missingEntityIds.join(", ")}`:"";return this._renderError(`No hourly_prices found.${t}`)}const r=kt(t),s=Et(t),n="string"==typeof t.name?t.name.trim():"",o={width:360,height:Ct(t),left:8,right:34,top:15,bottom:24},a=i.points,c=function(t,e){const i=t.map(t=>t.value),r=Math.min(...i),s=Math.max(...i),n=Number(e.min),o=Number(e.max);let a=Number.isFinite(n)?n:Math.min(0,r),c=Number.isFinite(o)?o:s;const l=Math.max(.08*(c-a),.005);return Number.isFinite(n)||(a-=r<0?l:0),Number.isFinite(o)||(c+=l),c<=a&&(c=a+.01),{min:a,max:c}}(a,t),l=function(t,e,i,r){const s=e.height-e.top-e.bottom;return t.map(t=>({...t,x:Dt(t.timestamp,r,e),y:e.top+(i.max-t.value)/(i.max-i.min)*s}))}(a,o,c,e),h=Date.now(),p=void 0!==this._selectedIndex,d=Math.max(0,Math.min(l.length-1,p?this._selectedIndex??0:Lt(l,h))),u=p?function(t,e,i){return{...t,timestamp:t.sourceTimestamp??t.timestamp,x:Vt(t,e,i),sourceTimestamp:t.sourceTimestamp??t.timestamp}}(l[d],e,o):function(t,e,i,r){const s=t[function(t,e){if(!t.length)return 0;const i=t=>t.sourceTimestamp??t.timestamp;if(e<=i(t[0]))return 0;let r=0;for(let s=1;s<t.length&&!(i(t[s])>e);s+=1)r=s;return r}(t,e)];return e<i.start||e>i.end?s:{...s,timestamp:e,x:Dt(e,i,r),sourceTimestamp:s.sourceTimestamp??s.timestamp}}(l,h,e,o),m=l.reduce((t,e)=>e.value<t.value?e:t,l[0]),f=l.reduce((t,e)=>e.value>t.value?e:t,l[0]),g=function(t,e){const i=e.current_price_entity||mt,r=t?.states[i]?.state,s=Number(r);return Number.isFinite(s)?s:void 0}(this.hass,t),_=function(t,e){const i=Number(e.cheap_threshold);if(Number.isFinite(i))return i;const r=e.cheap_price_entity||ft;return vt(t?.states[r]?.state)}(this.hass,t),$=i.moreInfoEntityId||t.current_price_entity||mt;return V`
      <ha-card class="price-card" style=${`--rep-card-bg:${t.card_background};--rep-chart-bg:${t.chart_background};--rep-grid:${t.grid_color};--rep-marker:${t.marker_color};`}>
        <div class="price-content">
          ${n?V`
            <div class="price-head">
              <button class="price-title" @click=${()=>this._openMoreInfo($)}>
                <span>${n}</span>
              </button>
            </div>
          `:G}

          ${!1===t.show_stats?G:this._renderStats(t,a,m,f,g)}

          <div class="price-chart-frame">
            <div class="price-chart-head">
              <div class="price-selected">
                <span>${zt(this.hass,u.timestamp)}</span>
                <strong>${Nt(u.value,t)}</strong>
              </div>
            </div>
            <div class="price-chart-body">
              ${this._renderChart(t,o,l,u,m,f,c,r,s,e,_,h)}
              <span
                class="price-selected-dot"
                style=${`left:${(u.x/o.width*100).toFixed(2)}%;top:${(u.y/o.height*100).toFixed(2)}%;`}
              ></span>
            </div>
          </div>
        </div>
      </ha-card>
    `}_renderError(t){return V`
      <ha-card class="price-card">
        <div class="price-content price-error">${t}</div>
      </ha-card>
    `}_renderStats(t,e,i,r,s){return V`
      <div class="price-stats">
        <div class="price-stat">
          <span>Now</span>
          <strong>${Nt(s,t)}</strong>
        </div>
        <div class="price-stat">
          <span>Low</span>
          <strong>${Nt(i.value,t)}</strong>
        </div>
        <div class="price-stat">
          <span>Average</span>
          <strong>${Nt(function(t){if(t.length)return t.reduce((t,e)=>t+e.value,0)/t.length}(e),t)}</strong>
        </div>
        <div class="price-stat">
          <span>High</span>
          <strong>${Nt(r.value,t)}</strong>
        </div>
      </div>
    `}_renderChart(t,e,i,r,s,n,o,a,c,l,h,p){const d=e.height-e.bottom,u=Math.max(e.top,Math.min(d,e.top+(o.max-0)/(o.max-o.min)*(e.height-e.top-e.bottom))),m=(e.width-e.left-e.right)/$t,f=Math.max(2,Math.min(14,.9*m)),g=function(t){return[0,$t/3,2*$t/3,$t].map(e=>t.start+e*_t)}(l),_=Dt(Date.now(),l,e),$=!1!==t.show_current_marker&&_>=e.left&&_<=e.width-e.right,b=Vt(s,l,e),y=Vt(n,l,e),x="rep-line-fill",v="rep-line-color",w=Math.max(1,e.width-e.left-e.right),A=i.flatMap(i=>{const r=Wt(i,t,h,p),s=Math.max(0,Math.min(100,(i.x-e.left)/w*100)),n=Math.max(0,Math.min(100,(Bt(i,l,e)-e.left)/w*100));return[W`<stop offset=${`${s}%`} stop-color=${r}></stop>`,W`<stop offset=${`${n}%`} stop-color=${r}></stop>`]});return V`
      <svg
        class="price-chart"
        viewBox=${`0 0 ${e.width} ${e.height}`}
        preserveAspectRatio="none"
        role="img"
        aria-label="Electricity price chart"
        @pointerdown=${t=>this._selectPoint(t,i,e,c,l)}
        @pointermove=${t=>this._selectPoint(t,i,e,c,l)}
        @pointerup=${this._stopPointer}
        @pointercancel=${this._stopPointer}
        @pointerleave=${this._stopPointer}
      >
        <defs>
          <linearGradient id=${x} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stop-color=${t.fill_color||"rgba(56, 199, 243, 0.20)"}></stop>
            <stop offset="100%" stop-color="rgba(56, 199, 243, 0.04)"></stop>
          </linearGradient>
          <linearGradient id=${v} x1=${e.left} x2=${e.width-e.right} y1="0" y2="0" gradientUnits="userSpaceOnUse">
            ${A}
          </linearGradient>
        </defs>
        ${this._renderGrid(t,e,o,g,l)}
        ${"line"===a?this._renderLineChart(i,d,x,v,l,e):this._renderBarChart(i,u,f,m,r,t,h,p)}
        ${$?W`<line class="price-current-line" x1=${_} x2=${_} y1=${e.top} y2=${d}></line>`:G}
        ${!1===t.show_extremes?G:W`
          <text class="price-extreme" x=${b} y=${Math.max(11,s.y-9)}>L</text>
          <text class="price-extreme" x=${y} y=${Math.max(11,n.y-9)}>H</text>
        `}
        <line class="price-selected-line" x1=${r.x} x2=${r.x} y1=${e.top} y2=${d}></line>
        <title>${zt(this.hass,r.timestamp)} ${Nt(r.value,t)}</title>
        <desc>${i.length} available hourly electricity price points in a fixed ${$t}-hour chart window.</desc>
      </svg>
    `}_renderGrid(t,e,i,r,s){const n=e.height-e.bottom,o=St(t);return[...Array.from({length:o},(r,s)=>{const a=1-s/(o-1),c=e.top+s/(o-1)*(n-e.top),l=i.min+(i.max-i.min)*a;return W`
          <line class="price-grid-line" x1=${e.left} x2=${e.width-e.right} y1=${c} y2=${c}></line>
          <text class="price-axis-label" x=${e.width-2} y=${c}>${function(t,e){return`${t.toFixed(Pt(e))}€`}(l,t)}</text>
        `}),...r.map((t,i)=>{const o=Dt(t,s,e),a=0===i?" price-time-label-start":i===r.length-1?" price-time-label-end":"";return W`
          <line class="price-time-line" x1=${o} x2=${o} y1=${e.top} y2=${n}></line>
          <text class=${`price-time-label${a}`} x=${o} y=${e.height-6}>${function(t,e){return zt(t,e)}(this.hass,t)}</text>
        `})]}_renderBarChart(t,e,i,r,s,n,o,a){const c=s.timestamp,l=s.sourceTimestamp,h=Math.max(0,(r-i)/2);return t.map(t=>{const r=Math.min(t.y,e),s=Math.max(1,Math.abs(e-t.y)),p=t.timestamp===c||void 0!==l&&t.sourceTimestamp===l?" price-bar-selected":"";return W`
        <rect
          class=${`price-bar${p}`}
          x=${t.x+h}
          y=${r}
          width=${i}
          height=${s}
          rx="2.5"
          fill=${Wt(t,n,o,a)}
        ></rect>
      `})}_renderLineChart(t,e,i,r,s,n){const o=function(t,e,i,r){const s=[];let n,o="",a=0,c=0;const l=()=>{o&&(s.push({line:o,area:`${o} L ${c.toFixed(2)} ${e.toFixed(2)} L ${a.toFixed(2)} ${e.toFixed(2)} Z`}),o="")};return t.forEach(t=>{const e=t.x,s=Bt(t,i,r),h=n&&Math.abs(t.timestamp-(n.timestamp+_t))<6e4;o&&h?o+=` L ${e.toFixed(2)} ${t.y.toFixed(2)}`:(l(),a=e,o=`M ${e.toFixed(2)} ${t.y.toFixed(2)}`),o+=` L ${s.toFixed(2)} ${t.y.toFixed(2)}`,c=s,n=t}),l(),s}(t,e,s,n);return W`
      ${o.map(t=>W`<path class="price-line-area" d=${t.area} fill=${`url(#${i})`}></path>`)}
      ${o.map(t=>W`<path class="price-line-shadow" d=${t.line}></path>`)}
      ${o.map(t=>W`<path class="price-line" d=${t.line} stroke=${`url(#${r})`}></path>`)}
    `}_selectPoint(t,e,i,r,s){const n="hover"===r&&"pointermove"===t.type&&"touch"!==t.pointerType;if("pointermove"===t.type&&!n&&!this._dragging)return;if("pointerdown"===t.type){this._dragging=!0;try{t.currentTarget.setPointerCapture(t.pointerId)}catch{}}t.preventDefault();const o=t.currentTarget.getBoundingClientRect(),a=function(t,e,i){const r=i.width-i.left-i.right,s=Math.max(1,e.end-e.start),n=Math.max(i.left,Math.min(i.width-i.right,t));return e.start+(n-i.left)/Math.max(1,r)*s}((t.clientX-o.left)/Math.max(1,o.width)*i.width,s,i);this._selectedIndex=Lt(e,a)}_openMoreInfo(t){t&&bt(this,"hass-more-info",{entityId:t})}}Gt.properties={hass:{attribute:!1},_config:{state:!0},_selectedIndex:{state:!0}},Gt.styles=[pt,o`
    :host {
      display: block;
      color: var(--primary-text-color);
      font-family: var(--paper-font-body1_-_font-family, Roboto, sans-serif);
    }

    ha-card.price-card {
      overflow: hidden;
      border-radius: var(--ha-card-border-radius, 12px);
      background: var(--rep-card-bg);
      box-shadow: var(--ha-card-box-shadow, none);
    }

    .price-content {
      padding: 16px;
      border-radius: inherit;
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.025), rgba(0, 0, 0, 0.08));
      box-sizing: border-box;
    }

    .price-error {
      color: var(--error-color, #ff5252);
      font-weight: 700;
    }

    .price-head {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 16px;
      margin-bottom: var(--large-gap);
    }

    .price-title {
      max-width: min(70%, 460px);
      padding: 0;
      border: 0;
      background: transparent;
      color: var(--primary-text-color);
      font: inherit;
      font-size: 22px;
      font-weight: 800;
      line-height: 1.18;
      text-align: left;
      cursor: pointer;
    }

    .price-title:focus {
      outline: none;
    }

    .price-title:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 3px;
      border-radius: 4px;
    }

    .price-selected {
      flex: 0 0 auto;
      display: inline-flex;
      align-items: center;
      justify-content: end;
      gap: 5px;
      max-width: min(58%, 172px);
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: var(--secondary-text-color);
      font-size: 9px;
      line-height: 1;
      font-weight: 750;
    }

    .price-selected span {
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .price-selected strong {
      color: var(--primary-text-color);
      font-size: 14px;
      line-height: 1;
      font-weight: 850;
      letter-spacing: 0;
      white-space: nowrap;
    }

    .price-stats {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: var(--tile-padding);
      margin-bottom: var(--large-gap);
    }

    .price-stat {
      min-width: 0;
      padding: 8px 10px;
      border-radius: var(--tile-border-radius);
      background: rgba(0, 0, 0, 0.12);
      box-sizing: border-box;
    }

    .price-stat span,
    .price-stat strong {
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .price-stat span {
      color: var(--secondary-text-color);
      font-size: 11px;
      font-weight: 800;
      line-height: 1.1;
    }

    .price-stat strong {
      margin-top: 3px;
      color: var(--primary-text-color);
      font-size: 13px;
      font-weight: 850;
      line-height: 1.1;
    }

    .price-chart-frame {
      position: relative;
      width: 100%;
      min-width: 0;
      display: grid;
      gap: 5px;
      padding: 7px 8px 6px;
      box-sizing: border-box;
      border-radius: var(--tile-border-radius);
      background: var(--rep-chart-bg);
      overflow: hidden;
    }

    .price-chart-head {
      min-width: 0;
      min-height: 18px;
      display: flex;
      align-items: start;
      justify-content: flex-end;
      gap: 8px;
    }

    .price-chart-body {
      position: relative;
      width: 100%;
      min-width: 0;
      overflow: visible;
    }

    .price-chart {
      display: block;
      width: 100%;
      height: auto;
      min-width: 0;
      cursor: pointer;
      touch-action: none;
      user-select: none;
      -webkit-user-select: none;
    }

    .price-chart text {
      user-select: none;
      -webkit-user-select: none;
      pointer-events: none;
    }

    .price-grid-line,
    .price-time-line {
      stroke: var(--rep-grid);
      stroke-width: 1;
      vector-effect: non-scaling-stroke;
    }

    .price-time-line {
      stroke-dasharray: 3 3;
    }

    .price-current-line {
      stroke: var(--rep-marker);
      stroke-width: 1.5;
      opacity: 0.62;
      vector-effect: non-scaling-stroke;
    }

    .price-selected-line {
      stroke: rgba(255, 255, 255, 0.36);
      stroke-width: 1;
      vector-effect: non-scaling-stroke;
    }

    .price-bar {
      opacity: 0.95;
      transition: opacity 120ms ease;
    }

    .price-bar-selected {
      opacity: 1;
      stroke: rgba(255, 255, 255, 0.72);
      stroke-width: 1;
      vector-effect: non-scaling-stroke;
    }

    .price-line-area {
      opacity: 0.95;
    }

    .price-line-shadow {
      fill: none;
      stroke: rgba(0, 0, 0, 0.24);
      stroke-width: 7;
      stroke-linecap: round;
      stroke-linejoin: round;
      vector-effect: non-scaling-stroke;
    }

    .price-line {
      fill: none;
      stroke-width: 4.3;
      stroke-linecap: round;
      stroke-linejoin: round;
      vector-effect: non-scaling-stroke;
    }

    .price-axis-label,
    .price-time-label,
    .price-extreme {
      fill: var(--secondary-text-color);
      font-size: 9px;
      font-weight: 750;
      text-anchor: middle;
      dominant-baseline: middle;
    }

    .price-axis-label {
      text-anchor: end;
    }

    .price-time-label {
      font-size: 7.6px;
    }

    .price-time-label-start {
      text-anchor: start;
    }

    .price-time-label-end {
      text-anchor: end;
    }

    .price-extreme {
      fill: var(--primary-text-color);
      font-size: 11px;
      font-weight: 850;
    }

    .price-selected-dot {
      position: absolute;
      z-index: 2;
      width: 15px;
      height: 15px;
      min-width: 15px;
      min-height: 15px;
      box-sizing: border-box;
      aspect-ratio: 1 / 1;
      border: 1px solid rgba(255, 255, 255, 0.54);
      border-radius: 50%;
      background: rgba(0, 0, 0, 0.28);
      box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.18);
      transform: translate(-50%, -50%);
      pointer-events: none;
    }

    .price-selected-dot::after {
      content: "";
      position: absolute;
      inset: 4px;
      border-radius: 50%;
      background: var(--primary-text-color);
      box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.4);
    }

    @media (max-width: 480px) {
      .price-content {
        padding: var(--tile-padding-large);
      }

      .price-head {
        gap: 10px;
      }

      .price-title {
        max-width: 64%;
        font-size: 18px;
      }

      .price-stats {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }
  `];class Zt extends lt{constructor(){super(...arguments),this._config=Gt.getStubConfig()}setConfig(t){this._config=qt(t||{})}render(){const t=qt(this._config);return V`
      <div class="editor">
        ${this._textField("Name (optional)","name",t.name||"")}
        <div class="grid">
          ${this._textField("Today Prices Entity","today_entity",t.today_entity||dt)}
          ${this._textField("Tomorrow Prices Entity","tomorrow_entity",t.tomorrow_entity||ut)}
        </div>
        ${this._textField("Current Price Entity","current_price_entity",t.current_price_entity||mt)}
        ${this._textField("Acceptable Price Entity","cheap_price_entity",t.cheap_price_entity||ft)}
        <label>
          <span>Chart Type</span>
          <select .value=${kt(t)} @change=${t=>this._setValue("chart_type",t.target.value)}>
            <option value="bar">Bars</option>
            <option value="line">Step line</option>
          </select>
        </label>
        <label>
          <span>Selector Mode</span>
          <select .value=${Et(t)} @change=${t=>this._setValue("selector_mode",t.target.value)}>
            <option value="hover">Hover</option>
            <option value="click">Click / tap</option>
          </select>
        </label>
        <div class="grid">
          ${this._numberField("Height","height",Ct(t),120,360)}
          ${this._numberField("Horizontal Lines","horizontal_lines",St(t),2,9)}
          ${this._numberField("Price Decimals","price_decimals",Mt(t),0,6)}
          ${this._numberField("Axis Decimals","axis_decimals",Pt(t),0,4)}
        </div>
        ${this._textField("Unit","unit",t.unit||gt)}
        <div class="grid">
          ${this._numberField("Y Min","min",t.min??"",void 0,void 0,!0)}
          ${this._numberField("Y Max","max",t.max??"",void 0,void 0,!0)}
          ${this._numberField("Cheap Threshold","cheap_threshold",t.cheap_threshold??"",void 0,void 0,!0)}
        </div>
        <div class="toggles">
          ${this._checkbox("Current Marker","show_current_marker",!1!==t.show_current_marker)}
          ${this._checkbox("Extremes","show_extremes",!1!==t.show_extremes)}
          ${this._checkbox("Stats","show_stats",!1!==t.show_stats)}
        </div>
        <h3>Color Overrides</h3>
        <div class="grid">
          ${this._colorField("Past","past_color",t.past_color||"#bfdbfe")}
          ${this._colorField("Current Hour","current_hour_color",t.current_hour_color||"#3b82f6")}
          ${this._colorField("Future","future_color",t.future_color||"#93c5fd")}
          ${this._colorField("Cheap Past","cheap_past_color",t.cheap_past_color||"#bbf7d0")}
          ${this._colorField("Cheap","cheap_color",t.cheap_color||"#86efac")}
          ${this._colorField("Cheap Current","cheap_current_color",t.cheap_current_color||"#22c55e")}
          ${this._colorField("Marker","marker_color",t.marker_color||"#38c7f3")}
        </div>
        ${this._textField("Area Fill Color","fill_color",t.fill_color||"rgba(56, 199, 243, 0.18)")}
        ${this._textField("Grid Color","grid_color",t.grid_color||"rgba(255, 255, 255, 0.14)")}
        ${this._textField("Chart Background","chart_background",t.chart_background||"rgba(33, 52, 62, 0.88)")}
      </div>
    `}_textField(t,e,i){return V`
      <label>
        <span>${t}</span>
        <input
          type="text"
          .value=${String(i??"")}
          @input=${t=>this._setValue(e,t.target.value||void 0)}
        />
      </label>
    `}_numberField(t,e,i,r,s,n=!1){return V`
      <label>
        <span>${t}</span>
        <input
          type="number"
          min=${r??G}
          max=${s??G}
          .value=${String(i??"")}
          @input=${t=>{const i=t.target.value,r=Number(i);this._setValue(e,n&&""===i?void 0:Number.isFinite(r)?r:void 0)}}
        />
      </label>
    `}_colorField(t,e,i){return V`
      <label>
        <span>${t}</span>
        <input
          type="color"
          .value=${i}
          @input=${t=>this._setValue(e,t.target.value)}
        />
      </label>
    `}_checkbox(t,e,i){return V`
      <label class="checkbox">
        <input
          type="checkbox"
          .checked=${i}
          @change=${t=>this._setValue(e,t.target.checked)}
        />
        <span>${t}</span>
      </label>
    `}_setValue(t,e){const i={...this._config};void 0===e||""===e?delete i[t]:i[t]=e,this._config=i,bt(this,"config-changed",{config:i})}}Zt.properties={hass:{attribute:!1},_config:{state:!0}},Zt.styles=o`
    :host {
      display: block;
    }

    .editor {
      display: grid;
      gap: 12px;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 12px;
    }

    label {
      display: grid;
      gap: 5px;
      color: var(--primary-text-color);
      font-family: var(--paper-font-body1_-_font-family, Roboto, sans-serif);
      font-size: 12px;
      font-weight: 700;
    }

    input,
    select,
    textarea {
      width: 100%;
      box-sizing: border-box;
      border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.16));
      border-radius: 8px;
      padding: 10px;
      background: var(--secondary-background-color, rgba(255, 255, 255, 0.04));
      color: var(--primary-text-color);
      font: inherit;
      font-weight: 500;
    }

    input[type="color"] {
      height: 42px;
      padding: 4px;
    }

    textarea {
      min-height: 96px;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      font-size: 12px;
    }

    h3 {
      margin: 8px 0 0;
      font-size: 14px;
    }

    .toggles {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 8px 12px;
    }

    .checkbox {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .checkbox input {
      width: auto;
    }
  `,customElements.get("real-electricity-price-card")||customElements.define("real-electricity-price-card",Gt),customElements.get("real-electricity-price-card-editor")||customElements.define("real-electricity-price-card-editor",Zt),window.customCards=window.customCards||[],window.customCards.push({type:"real-electricity-price-card",name:"Real Electricity Price Card",description:"Interactive electricity price chart for real-electricity-price",preview:!1,version:"0.1.15"});
