/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),r=new WeakMap;let a=class{constructor(t,e,r){if(this._$cssResult$=!0,r!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=r.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&r.set(i,t))}return t}toString(){return this.cssText}};const o=t=>new a("string"==typeof t?t:t+"",void 0,i),n=(t,...e)=>{const r=1===t.length?t[0]:e.reduce((e,i,r)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[r+1],t[0]);return new a(r,t,i)},s=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return o(e)})(t):t,{is:l,defineProperty:c,getOwnPropertyDescriptor:d,getOwnPropertyNames:p,getOwnPropertySymbols:h,getPrototypeOf:m}=Object,u=globalThis,f=u.trustedTypes,g=f?f.emptyScript:"",y=u.reactiveElementPolyfillSupport,x=(t,e)=>t,v={toAttribute(t,e){switch(e){case Boolean:t=t?g:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},b=(t,e)=>!l(t,e),_={attribute:!0,type:String,converter:v,reflect:!1,useDefault:!1,hasChanged:b};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let $=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=_){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(t,i,e);void 0!==r&&c(this.prototype,t,r)}}static getPropertyDescriptor(t,e,i){const{get:r,set:a}=d(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:r,set(e){const o=r?.call(this);a?.call(this,e),this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??_}static _$Ei(){if(this.hasOwnProperty(x("elementProperties")))return;const t=m(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(x("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(x("properties"))){const t=this.properties,e=[...p(t),...h(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(s(t))}else void 0!==t&&e.push(s(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,r)=>{if(e)i.adoptedStyleSheets=r.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of r){const r=document.createElement("style"),a=t.litNonce;void 0!==a&&r.setAttribute("nonce",a),r.textContent=e.cssText,i.appendChild(r)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),r=this.constructor._$Eu(t,i);if(void 0!==r&&!0===i.reflect){const a=(void 0!==i.converter?.toAttribute?i.converter:v).toAttribute(e,i.type);this._$Em=t,null==a?this.removeAttribute(r):this.setAttribute(r,a),this._$Em=null}}_$AK(t,e){const i=this.constructor,r=i._$Eh.get(t);if(void 0!==r&&this._$Em!==r){const t=i.getPropertyOptions(r),a="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:v;this._$Em=r;const o=a.fromAttribute(e,t.type);this[r]=o??this._$Ej?.get(r)??o,this._$Em=null}}requestUpdate(t,e,i,r=!1,a){if(void 0!==t){const o=this.constructor;if(!1===r&&(a=this[t]),i??=o.getPropertyOptions(t),!((i.hasChanged??b)(a,e)||i.useDefault&&i.reflect&&a===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:r,wrapped:a},o){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==a||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===r&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,r=this[e];!0!==t||this._$AL.has(e)||void 0===r||this.C(e,void 0,i,r)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};$.elementStyles=[],$.shadowRootOptions={mode:"open"},$[x("elementProperties")]=new Map,$[x("finalized")]=new Map,y?.({ReactiveElement:$}),(u.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const w=globalThis,k=t=>t,A=w.trustedTypes,C=A?A.createPolicy("lit-html",{createHTML:t=>t}):void 0,E="$lit$",S=`lit$${Math.random().toFixed(9).slice(2)}$`,M="?"+S,z=`<${M}>`,N=document,P=()=>N.createComment(""),F=t=>null===t||"object"!=typeof t&&"function"!=typeof t,T=Array.isArray,U="[ \t\n\f\r]",O=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,D=/-->/g,H=/>/g,R=RegExp(`>|${U}(?:([^\\s"'>=/]+)(${U}*=${U}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),I=/'/g,L=/"/g,j=/^(?:script|style|textarea|title)$/i,B=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),V=B(1),q=B(2),W=Symbol.for("lit-noChange"),G=Symbol.for("lit-nothing"),Z=new WeakMap,K=N.createTreeWalker(N,129);function Y(t,e){if(!T(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==C?C.createHTML(e):e}const J=(t,e)=>{const i=t.length-1,r=[];let a,o=2===e?"<svg>":3===e?"<math>":"",n=O;for(let e=0;e<i;e++){const i=t[e];let s,l,c=-1,d=0;for(;d<i.length&&(n.lastIndex=d,l=n.exec(i),null!==l);)d=n.lastIndex,n===O?"!--"===l[1]?n=D:void 0!==l[1]?n=H:void 0!==l[2]?(j.test(l[2])&&(a=RegExp("</"+l[2],"g")),n=R):void 0!==l[3]&&(n=R):n===R?">"===l[0]?(n=a??O,c=-1):void 0===l[1]?c=-2:(c=n.lastIndex-l[2].length,s=l[1],n=void 0===l[3]?R:'"'===l[3]?L:I):n===L||n===I?n=R:n===D||n===H?n=O:(n=R,a=void 0);const p=n===R&&t[e+1].startsWith("/>")?" ":"";o+=n===O?i+z:c>=0?(r.push(s),i.slice(0,c)+E+i.slice(c)+S+p):i+S+(-2===c?e:p)}return[Y(t,o+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),r]};class X{constructor({strings:t,_$litType$:e},i){let r;this.parts=[];let a=0,o=0;const n=t.length-1,s=this.parts,[l,c]=J(t,e);if(this.el=X.createElement(l,i),K.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(r=K.nextNode())&&s.length<n;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(E)){const e=c[o++],i=r.getAttribute(t).split(S),n=/([.?@])?(.*)/.exec(e);s.push({type:1,index:a,name:n[2],strings:i,ctor:"."===n[1]?rt:"?"===n[1]?at:"@"===n[1]?ot:it}),r.removeAttribute(t)}else t.startsWith(S)&&(s.push({type:6,index:a}),r.removeAttribute(t));if(j.test(r.tagName)){const t=r.textContent.split(S),e=t.length-1;if(e>0){r.textContent=A?A.emptyScript:"";for(let i=0;i<e;i++)r.append(t[i],P()),K.nextNode(),s.push({type:2,index:++a});r.append(t[e],P())}}}else if(8===r.nodeType)if(r.data===M)s.push({type:2,index:a});else{let t=-1;for(;-1!==(t=r.data.indexOf(S,t+1));)s.push({type:7,index:a}),t+=S.length-1}a++}}static createElement(t,e){const i=N.createElement("template");return i.innerHTML=t,i}}function Q(t,e,i=t,r){if(e===W)return e;let a=void 0!==r?i._$Co?.[r]:i._$Cl;const o=F(e)?void 0:e._$litDirective$;return a?.constructor!==o&&(a?._$AO?.(!1),void 0===o?a=void 0:(a=new o(t),a._$AT(t,i,r)),void 0!==r?(i._$Co??=[])[r]=a:i._$Cl=a),void 0!==a&&(e=Q(t,a._$AS(t,e.values),a,r)),e}class tt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,r=(t?.creationScope??N).importNode(e,!0);K.currentNode=r;let a=K.nextNode(),o=0,n=0,s=i[0];for(;void 0!==s;){if(o===s.index){let e;2===s.type?e=new et(a,a.nextSibling,this,t):1===s.type?e=new s.ctor(a,s.name,s.strings,this,t):6===s.type&&(e=new nt(a,this,t)),this._$AV.push(e),s=i[++n]}o!==s?.index&&(a=K.nextNode(),o++)}return K.currentNode=N,r}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class et{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,r){this.type=2,this._$AH=G,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Q(this,t,e),F(t)?t===G||null==t||""===t?(this._$AH!==G&&this._$AR(),this._$AH=G):t!==this._$AH&&t!==W&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>T(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==G&&F(this._$AH)?this._$AA.nextSibling.data=t:this.T(N.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,r="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=X.createElement(Y(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===r)this._$AH.p(e);else{const t=new tt(r,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=Z.get(t.strings);return void 0===e&&Z.set(t.strings,e=new X(t)),e}k(t){T(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,r=0;for(const a of t)r===e.length?e.push(i=new et(this.O(P()),this.O(P()),this,this.options)):i=e[r],i._$AI(a),r++;r<e.length&&(this._$AR(i&&i._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=k(t).nextSibling;k(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class it{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,r,a){this.type=1,this._$AH=G,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=a,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=G}_$AI(t,e=this,i,r){const a=this.strings;let o=!1;if(void 0===a)t=Q(this,t,e,0),o=!F(t)||t!==this._$AH&&t!==W,o&&(this._$AH=t);else{const r=t;let n,s;for(t=a[0],n=0;n<a.length-1;n++)s=Q(this,r[i+n],e,n),s===W&&(s=this._$AH[n]),o||=!F(s)||s!==this._$AH[n],s===G?t=G:t!==G&&(t+=(s??"")+a[n+1]),this._$AH[n]=s}o&&!r&&this.j(t)}j(t){t===G?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class rt extends it{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===G?void 0:t}}class at extends it{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==G)}}class ot extends it{constructor(t,e,i,r,a){super(t,e,i,r,a),this.type=5}_$AI(t,e=this){if((t=Q(this,t,e,0)??G)===W)return;const i=this._$AH,r=t===G&&i!==G||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,a=t!==G&&(i===G||r);r&&this.element.removeEventListener(this.name,this,i),a&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class nt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Q(this,t)}}const st=w.litHtmlPolyfillSupport;st?.(X,et),(w.litHtmlVersions??=[]).push("3.3.3");const lt=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class ct extends ${constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const r=i?.renderBefore??e;let a=r._$litPart$;if(void 0===a){const t=i?.renderBefore??null;r._$litPart$=a=new et(e.insertBefore(P(),t),t,void 0,i??{})}return a._$AI(t),a})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return W}}ct._$litElement$=!0,ct.finalized=!0,lt.litElementHydrateSupport?.({LitElement:ct});const dt=lt.litElementPolyfillSupport;dt?.({LitElement:ct}),(lt.litElementVersions??=[]).push("4.2.2");const pt=n`
  ${o("\n  :host {\n    display: block;\n    /* Chip styling variables */\n    --chip-padding: 2px 2px;\n    --chip-text-font-weight: 700;\n    --chip-text-font-size: var(--chip-font-size, 12px);\n    --chip-background-color: rgba(0,0,0,0.06);\n    --chip-border-radius: var(--ha-badge-border-radius, 999px);\n    --chip-gap: 6px;\n    --main-light-on-bg: linear-gradient(135deg,#ffcf57,#ffb200);\n    --main-light-off-bg: rgba(0,0,0,0.06);\n    --main-light-icon-on-color: #ffffff;\n    --main-light-icon-off-color: var(--secondary-text-color);\n    --switch-on-color: var(--switch-on-yellow, #ffc107);\n    --switch-smart-on-color: var(--switch-on-green, #00c853);\n    --switch-lock-unlocked-color: var(--switch-unlocked-red, #e53935);\n    --lock-spinner-color: var(--primary-text-color, #ffffff);\n    --switch-chip-bg: var(--chip-background-color, rgba(0,0,0,0.06));\n    --switch-icon-size: 28px;\n    --ac-chip-bg-off: rgba(158,158,158,0.95);\n    --ac-chip-bg-cool: #00aaff;\n    --ac-chip-bg-heat: #ff7043;\n    --ac-chip-bg-dry: #ffca28;\n    --ac-chip-bg-fan: #66bb6a;\n    --ac-chip-bg-auto: #26c6da;\n    --ac-chip-bg-default: rgba(0,0,0,0.06);\n    --ac-chip-icon-color: #ffffff;\n    --ac-chip-icon-off-color: #ffffff;\n    --ac-fan-color-off: gray;\n    --ac-fan-color-cool: #00aaff;\n    --ac-fan-color-heat: #ff7043;\n    --ac-fan-color-dry: #ffca28;\n    --ac-fan-color-fan: #66bb6a;\n    --ac-fan-color-auto: #26c6da;\n    --ac-fan-color-default: var(--paper-item-icon-color);\n    --thermostat-heating-color: #ff7043;\n    --thermostat-idle-color: #66bb6a;\n    --thermostat-off-color: gray;\n    --thermostat-pill-heating-bg: var(--state-climate-heat-color, #ff7043);\n    --thermostat-pill-heating-fg: var(--primary-background-color, #fff);\n    --thermostat-pill-idle-bg: var(--chip-background-color, rgba(0,0,0,0.06));\n    --thermostat-pill-idle-fg: var(--secondary-text-color);\n\n    /* Shared semantic status palette (single source of truth across cards) */\n    --status-on-color: #ffc107;\n    --status-active-color: #42a5f5;\n    --status-success-color: #66bb6a;\n    --status-alert-color: #e53935;\n    --status-warn-color: #ff9800;\n    --status-caution-color: #ffca28;\n    --status-cool-color: #00aaff;\n    --status-heat-color: #ff7043;\n    --status-dry-color: #ffca28;\n    --status-fan-color: #66bb6a;\n    --status-auto-color: #26c6da;\n    --status-smartplug-on-color: #ff9800;\n    --status-presence-color: #42a5f5;\n    --status-icon-on-color: #ffffff;\n\n    /* Positioning variables */\n    --tile-padding: 8px;\n    --tile-padding-large: 12px;\n    --chip-z-index: 3;\n    --tile-z-index: 2;\n    --glow-z-index: 1;\n\n    /* Tile shape control */\n    --tile-border-radius: var(--ha-card-border-radius, 12px);\n\n    /* Common gaps and spacing */\n    --small-gap: 2px;\n    --medium-gap: 6px;\n    --large-gap: 12px;\n\n    /* Shadow variables */\n    --tile-shadow-default: 0 6px 18px rgba(0,0,0,0.10);\n    --tile-shadow-hover: 0 12px 24px rgba(0,0,0,0.16);\n    --tile-shadow-active: 0 18px 40px var(--pulse-strong, rgba(0,0,0,0.18)), 0 6px 18px var(--pulse-weak, rgba(0,0,0,0.10));\n  }\n")}
`,ht="mdi:information-outline",mt=n`
  :host {
    --family-gap: 12px;
    --family-grid-gap: 8px;
    --family-surface: var(
      --ha-card-background,
      var(--card-background-color, #fff)
    );
    --family-tile: color-mix(
      in srgb,
      var(--family-surface) 96%,
      var(--primary-text-color) 4%
    );
    --family-muted: var(--secondary-text-color);
    --family-radius: var(--ha-card-border-radius, 24px);
    --family-font: var(
      --ha-font-family-body,
      var(--paper-font-body1_-_font-family, inherit)
    );
    font-family: var(--family-font);
    /* Semantic aliases: one resolution order for every card. The HA theme's
       --success/--warning/--error-color win, so user themes keep working; the
       family --status-* palette is the fallback. Card CSS uses these aliases. */
    --family-success: var(--success-color, var(--status-success-color, #66bb6a));
    --family-caution: var(--status-caution-color, #ffca28);
    --family-warning: var(--warning-color, var(--status-warn-color, #ff9800));
    --family-error: var(--error-color, var(--status-alert-color, #e53935));
    --family-active: var(--status-active-color, #42a5f5);
    /* Readable text colour for missing data; always paired with a text label. */
    --family-unavailable: var(--secondary-text-color);
  }
  .family-icon-button {
    display: inline-grid;
    place-items: center;
    min-width: 44px;
    min-height: 44px;
    width: 44px;
    height: 44px;
    padding: 0;
    border: 0;
    border-radius: 50%;
    background: transparent;
    color: var(--secondary-text-color);
    font: inherit;
    cursor: pointer;
    flex: 0 0 44px;
    touch-action: manipulation;
  }
  .family-icon-button ha-icon {
    width: 22px;
    height: 22px;
    --mdc-icon-size: 22px;
    flex: 0 0 22px;
  }
  .family-icon-button:focus-visible,
  .family-action:focus-visible,
  .family-chip:is(button):focus-visible {
    outline: 3px solid var(--primary-color);
    outline-offset: 3px;
  }
  .family-icon-button:disabled,
  .family-action:disabled {
    opacity: 0.45;
    cursor: default;
  }
  .family-action[aria-busy="true"]:disabled {
    opacity: 1;
    cursor: progress;
  }
  .family-visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
    border: 0;
  }
  .family-action {
    min-width: 44px;
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    min-height: 44px;
    padding: 8px 14px;
    border: 0;
    border-radius: var(--chip-border-radius, 999px);
    background: color-mix(in srgb, var(--primary-text-color) 7%, transparent);
    color: var(--primary-text-color);
    font: inherit;
    font-family: var(--family-font);
    font-size: 13px;
    font-weight: 600;
    line-height: 1.4;
    cursor: pointer;
    touch-action: manipulation;
  }
  .family-action ha-icon {
    width: 22px;
    height: 22px;
    --mdc-icon-size: 22px;
    flex: 0 0 22px;
  }
  .family-action.primary {
    background: var(--primary-color);
    color: var(--text-primary-color, var(--primary-background-color));
  }
  .family-chip {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    min-height: 28px;
    padding: 4px 8px;
    border-radius: var(--chip-border-radius, 999px);
    background: var(--chip-background-color);
    font: inherit;
    font-family: var(--family-font);
    font-size: 12px;
    font-weight: 500;
    line-height: 1.4;
    overflow-wrap: anywhere;
  }
  button.family-chip {
    min-height: 44px;
    cursor: pointer;
  }
  .family-surface {
    position: relative;
    z-index: 1;
    background: var(--family-tile);
    border-radius: var(--tile-border-radius, 12px);
    box-shadow: var(--tile-shadow-default);
  }
  @media (hover: hover) {
    .family-icon-button:not(:disabled):hover {
      background: color-mix(in srgb, var(--primary-text-color) 6%, transparent);
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .family-action,
    .family-icon-button {
      transition: none !important;
      animation: none !important;
    }
  }
`,ut=n`
  .family-header {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 8px 8px 3px;
  }
  .family-brand {
    width: 44px;
    height: 44px;
    flex: 0 0 44px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    background: color-mix(in srgb, var(--primary-color) 10%, transparent);
  }
  .family-brand ha-icon {
    width: 26px;
    height: 26px;
    --mdc-icon-size: 26px;
  }
  .family-identity {
    min-width: 0;
    flex: 1;
  }
  .family-title {
    font-size: 18px;
    font-weight: 700;
    line-height: 1.25;
    letter-spacing: -0.02em;
    margin: 0;
    overflow-wrap: anywhere;
  }
  .family-subtitle {
    margin-top: 4px;
    color: var(--secondary-text-color);
    font-size: 12px;
    line-height: 1.4;
    overflow-wrap: anywhere;
  }
`;n`
  .family-metrics {
    display: grid;
    grid-template-columns: repeat(
      var(--family-metric-columns, 2),
      minmax(0, 1fr)
    );
    gap: 8px;
    align-items: stretch;
  }
  .family-metric {
    box-sizing: border-box;
    width: 100%;
    min-width: 0;
    text-align: start;
    padding: 12px;
    display: grid;
    grid-template-rows: 1fr auto;
    gap: 6px;
    min-height: var(--family-metric-height, 100px);
  }
  .family-metric-top {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    grid-template-rows: 18px auto;
    gap: 6px 4px;
    align-items: center;
    color: var(--secondary-text-color);
  }
  .family-metric-top ha-icon {
    width: 18px;
    height: 18px;
    --mdc-icon-size: 18px;
    grid-column: 1;
    grid-row: 1;
  }
  .family-metric-top .family-metric-trailing {
    width: 16px;
    height: 16px;
    --mdc-icon-size: 16px;
    grid-column: 2;
    opacity: 0.6;
  }
  .family-metric-label {
    grid-column: 1/-1;
    grid-row: 2;
    min-width: 0;
    font-size: 11px;
    line-height: 1.3;
    overflow-wrap: anywhere;
  }
  .family-metric-value {
    display: flex;
    align-items: baseline;
    flex-wrap: wrap;
    gap: 2px 3px;
    font-size: clamp(22px, 6.4cqw, 28px);
    font-weight: 550;
    letter-spacing: -0.03em;
    line-height: 1.1;
    font-variant-numeric: tabular-nums;
    overflow-wrap: anywhere;
  }
  .family-metric-value small {
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0;
    color: var(--secondary-text-color);
  }
  .family-metric-value.missing {
    font-size: 13px;
    line-height: 1.4;
    letter-spacing: 0;
    min-height: 28px;
    align-items: center;
  }
  @container (max-width:340px) {
    .family-metric {
      padding: 10px;
    }
  }
`;const ft=n`
  .family-telemetry {
    display: grid;
    grid-template-columns: repeat(
      var(--family-telemetry-columns, 3),
      minmax(0, 1fr)
    );
    padding: 8px 0;
  }
  .family-telemetry-cell {
    min-width: 0;
    min-height: 48px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 5px;
    padding: 4px 12px;
    border: 0;
    border-inline-end: 1px solid
      color-mix(in srgb, var(--primary-text-color) 7%, transparent);
    background: transparent;
    text-align: start;
    color: inherit;
    font: inherit;
  }
  .family-telemetry-cell:last-child {
    border-inline-end: 0;
  }
  .family-telemetry-label {
    font-size: 11px;
    color: var(--secondary-text-color);
    line-height: 1.35;
    overflow-wrap: anywhere;
  }
  .family-telemetry-value {
    max-width: 100%;
    font-size: 13px;
    font-weight: 550;
    font-variant-numeric: tabular-nums;
    overflow-wrap: anywhere;
  }
  @container (max-width:340px) {
    .family-telemetry-cell {
      padding-inline: 10px;
    }
  }
`;n`
  .family-navigation {
    display: grid;
    grid-template-columns: repeat(var(--family-nav-columns, 4), minmax(0, 1fr));
    gap: 4px;
    padding: 5px;
    background: color-mix(in srgb, var(--primary-text-color) 5%, transparent);
    border-radius: var(--tile-border-radius, 12px);
    position: relative;
    z-index: 1;
  }
  .family-navigation button {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px;
    min-height: 56px;
    padding: 8px 4px;
    border: 0;
    background: transparent;
    border-radius: max(0px, calc(var(--tile-border-radius, 12px) - 3px));
    font: inherit;
    font-size: 11px;
    color: var(--secondary-text-color);
    cursor: pointer;
  }
  .family-navigation button[aria-current="page"] {
    background: var(--family-surface);
    color: var(--primary-text-color);
    box-shadow: 0 2px 8px #0001;
  }
  .family-navigation button:focus-visible {
    outline: 3px solid var(--primary-color);
    outline-offset: 1px;
  }
`,n`
  .family-dialog {
    --family-safe-top: var(
      --safe-area-inset-top,
      env(safe-area-inset-top, 0px)
    );
    --family-safe-bottom: var(
      --safe-area-inset-bottom,
      env(safe-area-inset-bottom, 0px)
    );
    --family-safe-left: var(
      --safe-area-inset-left,
      env(safe-area-inset-left, 0px)
    );
    --family-safe-right: var(
      --safe-area-inset-right,
      env(safe-area-inset-right, 0px)
    );
    --family-available-height: calc(
      100vh - 24px - var(--family-safe-top) - var(--family-safe-bottom)
    );
    position: fixed;
    inset: calc(12px + var(--family-safe-top))
      calc(12px + var(--family-safe-right))
      calc(12px + var(--family-safe-bottom))
      calc(12px + var(--family-safe-left));
    margin: auto;
    padding: 0;
    box-sizing: border-box;
    width: calc(
      100vw - 24px - var(--family-safe-left) - var(--family-safe-right)
    );
    max-width: var(--family-dialog-width, 480px);
    max-height: var(--family-available-height);
    border: 1px solid var(--divider-color, #8883);
    border-radius: var(--family-radius, 24px);
    color: var(--primary-text-color);
    background: var(--family-surface);
    box-shadow: 0 24px 90px #0005;
    overflow: hidden;
    font-family: var(--family-font);
  }
  .family-dialog[open] {
    display: grid;
    grid-template-rows: auto minmax(0, 1fr) auto;
  }
  .family-dialog.long {
    height: min(760px, var(--family-available-height));
  }
  .family-dialog::backdrop {
    background: #070a1480;
    backdrop-filter: blur(4px);
  }
  .family-dialog-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 12px 16px;
    border-bottom: 1px solid var(--divider-color, #8883);
  }
  .family-dialog-header h2,
  .family-dialog-header h3 {
    min-width: 0;
    margin: 0;
    font-size: 18px;
    font-weight: 650;
    line-height: 1.35;
    overflow-wrap: anywhere;
  }
  .family-dialog-body {
    min-width: 0;
    min-height: 0;
    padding: 16px;
    overflow-y: auto;
    overscroll-behavior: contain;
    -webkit-overflow-scrolling: touch;
  }
  .family-dialog-footer {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: 8px;
    padding: 12px 16px;
    border-top: 1px solid var(--divider-color, #8883);
  }
  .family-dialog-footer.equal {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    align-items: stretch;
  }
  .family-dialog-footer.equal > .family-action {
    min-width: 0;
    width: 100%;
    min-height: 48px;
    white-space: normal;
    overflow-wrap: anywhere;
  }
  .family-dialog button:focus-visible,
  .family-dialog input:focus-visible,
  .family-dialog select:focus-visible {
    outline: 3px solid var(--primary-color);
    outline-offset: 2px;
  }
  .family-dialog input,
  .family-dialog select {
    font-size: 16px;
  }
  @supports (height: 100dvh) {
    .family-dialog {
      --family-available-height: calc(
        100dvh - 24px - var(--family-safe-top) - var(--family-safe-bottom)
      );
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .family-dialog,
    .family-dialog * {
      animation: none !important;
      transition: none !important;
    }
  }
`
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;const gt=t=>t??G,yt={accent:"mdi:information-outline",success:"mdi:check-circle-outline",caution:"mdi:alert-outline",warning:"mdi:alert-outline",error:"mdi:alert-circle-outline",unavailable:"mdi:help-circle-outline"};function xt(t){return V`<button
    type="button"
    class="family-action ${function(t){return t.emphasis&&"secondary"!==t.emphasis?t.emphasis:[t.primary?"primary":"",t.destructive?"destructive":""].filter(Boolean).join(" ")}(t)} ${t.className||""}"
    title=${t.title||t.label}
    aria-label=${gt(t.ariaLabel)}
    aria-haspopup=${gt(t.hasPopup)}
    ?data-family-initial-focus=${!!t.initialFocus}
    ?disabled=${t.disabled||t.pending}
    aria-busy=${t.pending?"true":"false"}
    @click=${t.onClick}
  >
    ${t.pending?V`<span class="family-pending-indicator" aria-hidden="true"></span>`:(e=t.icon,e?V`<ha-icon .icon=${e} aria-hidden="true"></ha-icon>`:G)}${t.pending?t.pendingLabel||"Saving…":t.label}
  </button>`;var e}function vt(t){const e=t.tone||"neutral",i=!1===t.icon?void 0:t.icon||yt[e],r=[...t.action?[t.action]:[],...t.actions||[]];return V`<div
    class="family-notice ${t.className||""}"
    data-tone=${e}
    role=${t.role||("error"===e?"alert":"status")}
  >
    ${i?V`<ha-icon class="family-notice-icon" .icon=${i} aria-hidden="true"></ha-icon>`:G}<div class="family-notice-content">
      ${t.title?V`<strong class="family-notice-title">${t.title}</strong>`:G}<span class="family-notice-message">${t.message}</span>${t.body?V`<div class="family-notice-body">${t.body}</div>`:G}
    </div>${r.length?V`<div class="family-notice-actions">${r.map(t=>xt(t))}</div>`:G}
  </div>`}const bt=n`
  .family-pending-indicator {
    display: inline-block;
    width: 22px;
    height: 22px;
    flex: 0 0 22px;
    box-sizing: border-box;
    border: 2px solid color-mix(in srgb, currentColor 24%, transparent);
    border-top-color: currentColor;
    border-radius: 50%;
    animation: family-pending-spin 800ms linear infinite;
  }
  @keyframes family-pending-spin {
    to { transform: rotate(360deg); }
  }
  @media (prefers-reduced-motion: reduce) {
    .family-pending-indicator {
      animation: none;
    }
  }

  .family-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    align-items: center;
  }
  .family-action.destructive {
    color: var(--family-error, var(--error-color, var(--status-alert-color, #e53935)));
    background: color-mix(in srgb, var(--family-error, var(--error-color, var(--status-alert-color, #e53935))) 10%, transparent);
  }
  .family-action.quiet {
    background: transparent;
    color: color-mix(in srgb, var(--primary-color) 70%, var(--primary-text-color));
  }
  @media (hover: hover) {
    .family-action.quiet:not(:disabled):hover {
      background: color-mix(in srgb, var(--primary-text-color) 6%, transparent);
    }
  }
  .family-toggle[aria-pressed="true"] {
    background: color-mix(in srgb, var(--primary-color) 14%, var(--family-surface));
    box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--primary-color) 40%, transparent);
  }
  .family-toggle[aria-pressed="true"] ha-icon {
    color: var(--primary-color);
  }
  /* The check keeps its slot when unpressed, so selecting never shifts layout. */
  .family-toggle[aria-pressed="false"] .family-toggle-check {
    visibility: hidden;
  }
  .family-chip .family-visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
  }
  .family-chip-text {
    display: inline-flex;
    flex-direction: column;
    min-width: 0;
  }
  .family-chip-secondary {
    color: color-mix(in srgb, var(--secondary-text-color) 70%, var(--primary-text-color));
    font-size: 12px;
    font-weight: 400;
  }
  .family-unavailable {
    color: var(--family-unavailable, var(--secondary-text-color));
  }
  .family-chip {
    border: 0;
    color: var(--primary-text-color);
  }
  .family-chip ha-icon {
    width: 18px;
    height: 18px;
    --mdc-icon-size: 18px;
    flex: 0 0 18px;
  }
  /* One resolution order for every tone: the family --family-* aliases from familyStyles. */
  [data-tone="accent"] {
    --family-tone: var(--primary-color);
  }
  [data-tone="success"] {
    --family-tone: var(--family-success, var(--success-color, var(--status-success-color, #66bb6a)));
  }
  [data-tone="caution"] {
    --family-tone: var(--family-caution, var(--status-caution-color, #ffca28));
  }
  [data-tone="warning"] {
    --family-tone: var(--family-warning, var(--warning-color, var(--status-warn-color, #ff9800)));
  }
  [data-tone="error"] {
    --family-tone: var(--family-error, var(--error-color, var(--status-alert-color, #e53935)));
  }
  [data-tone="unavailable"] {
    --family-tone: var(--family-unavailable, var(--secondary-text-color));
  }
  .family-chip[data-tone]:not([data-tone="neutral"]):not([data-tone="unavailable"]) {
    color: var(--primary-text-color);
    background: color-mix(
      in srgb,
      var(--family-tone) 14%,
      var(--family-surface)
    );
  }
  .family-chip[data-tone="unavailable"] {
    color: var(--family-unavailable, var(--secondary-text-color));
    background: transparent;
    box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--secondary-text-color) 40%, transparent);
  }
  .family-metric-trailing[data-tone] {
    color: var(--family-tone, var(--secondary-text-color));
  }
  button.family-metric {
    font: inherit;
    color: inherit;
    border: 0;
    cursor: pointer;
  }
  button.family-metric:focus-visible {
    outline: 3px solid var(--primary-color);
    outline-offset: 3px;
  }
  .family-notice {
    position: relative;
    z-index: 1;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
    padding: 12px;
    border-radius: var(--tile-border-radius, 12px);
    font-size: 13px;
    line-height: 1.5;
    background: color-mix(
      in srgb,
      var(--family-tone, var(--primary-text-color)) 8%,
      var(--family-surface)
    );
  }
  .family-notice-icon {
    width: 22px;
    height: 22px;
    --mdc-icon-size: 22px;
    flex: 0 0 22px;
    align-self: flex-start;
    color: var(--family-tone, var(--secondary-text-color));
  }
  .family-notice-content {
    display: grid;
    gap: 2px;
    flex: 1 1 180px;
    min-width: 0;
  }
  .family-notice-title {
    font-weight: 600;
  }
  .family-notice-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  .family-async-state {
    display: flex;
    align-items: center;
    gap: 8px;
    min-height: 44px;
    color: var(--secondary-text-color);
    font-size: 13px;
    line-height: 1.5;
  }
  .family-disclosure-toggle {
    display: flex;
    align-items: center;
    gap: 8px;
    min-height: 44px;
    width: 100%;
    border: 0;
    background: transparent;
    color: inherit;
    text-align: start;
    font: inherit;
    cursor: pointer;
  }
  .family-disclosure-toggle > span:first-child {
    flex: 1;
  }
  .family-disclosure-toggle ha-icon {
    width: 22px;
    height: 22px;
    --mdc-icon-size: 22px;
  }
  .family-dialog-header h2 {
    flex: 1;
  }
  .family-dialog [hidden] {
    display: none !important;
  }
`;const _t="Unavailable",$t=t=>t?.locale?.language||t?.language||"en";function wt(t){const e=(new Intl.DateTimeFormat).resolvedOptions().timeZone;if("local"!==t?.locale?.time_zone||!e||"UTC"===e)return t?.config?.time_zone||void 0}const kt=/^[+-]?(\d+\.?\d*|\.\d+)(e[+-]?\d+)?$/i;function At(t){if("number"==typeof t)return Number.isFinite(t)?t:void 0;if("string"!=typeof t||!kt.test(t.trim()))return;const e=Number(t.trim());return Number.isFinite(e)?e:void 0}function Ct(t){try{return t()}catch{return _t}}const Et=t=>"none"!==t?.locale?.number_format;function St(t,e,i={}){const r=At(e);if(void 0===r)return _t;const a=Ct(()=>new Intl.NumberFormat(function(t){switch(t?.locale?.number_format){case"comma_decimal":case"none":return"en-US";case"decimal_comma":return"de";case"space_comma":return"fr";case"system":return;default:return $t(t)}}(t),{minimumFractionDigits:i.digits??i.minimumFractionDigits,maximumFractionDigits:i.digits??i.maximumFractionDigits,signDisplay:i.signDisplay,useGrouping:Et(t)}).format(r));return i.unit&&a!==_t?`${a} ${i.unit}`:a}function Mt(t,e,i){const r=function(t){if(null==t||""===t)return;const e=t instanceof Date?t:new Date(t);return Number.isFinite(e.getTime())?e:void 0}(e);if(!r)return _t;const a="hour"in i||"minute"in i?function(t){switch(t?.locale?.time_format){case"12":return!0;case"24":return!1;case"system":{const t=new Intl.DateTimeFormat(void 0,{hour:"numeric"}).resolvedOptions().hourCycle;return"h11"===t||"h12"===t}default:return}}(t):void 0,o=void 0===a?{}:{hourCycle:a?"h12":"h23"},n=e=>new Intl.DateTimeFormat($t(t),{...i,...o,timeZone:e}).format(r);return Ct(()=>{try{return n(wt(t))}catch{return n(void 0)}})}const zt="sensor.real_electricity_price_hourly_prices_yesterday",Nt="sensor.real_electricity_price_hourly_prices_today",Pt="sensor.real_electricity_price_hourly_prices_tomorrow",Ft="sensor.real_electricity_price_current_price",Tt="number.real_electricity_price_acceptable_price",Ut="€/kWh",Ot=36e5,Dt=[6,8,12,16,24];function Ht(t,e,i){const r=Number(t);if(Number.isFinite(r))return Math.max(e,Math.min(i,r))}function Rt(t){if("number"==typeof t&&Number.isFinite(t))return t;if("string"==typeof t){const e=Number(t);if(Number.isFinite(e))return e;const i=new Date(t).getTime();if(Number.isFinite(i))return i}}function It(...t){for(const e of t){if(null==e||""===e)continue;const t=Number(e);if(Number.isFinite(t))return t}}function Lt(t){const e=t?.attributes?.hourly_prices;return Array.isArray(e)?e.reduce((t,e)=>{const i=e,r=Array.isArray(i)?Rt(i[0]):Rt(i.start_time)??Rt(i.x),a=Array.isArray(i)?It(i[1]):It(i.actual_price,i.price,i.y,i.nord_pool_price);return void 0===r||void 0===a||t.push({timestamp:r,value:a,sourceTimestamp:r}),t},[]).sort((t,e)=>t.timestamp-e.timestamp):[]}function jt(t){return"line"===(t.chart_type||t.graph_type)?"line":"bar"}function Bt(t){return"click"===t.selector_mode?"click":"hover"}function Vt(t){return Ht(t.height,120,360)||190}function qt(t){return Math.round(Ht(t.horizontal_lines,2,9)||5)}function Wt(t){return Math.round(Ht(t.price_decimals,0,6)??4)}function Gt(t){return Math.round(Ht(t.axis_decimals,0,4)??2)}function Zt(t){return t.unit||Ut}function Kt(t,e,i){return St(t,e,{digits:Wt(i),unit:Zt(i)})}function Yt(t){return Zt(t).split("/")[0].trim()||void 0}function Jt(t,e){return function(t,e,i={}){return Mt(t,e,{day:"numeric",month:"short",...!1===i.year?{}:{year:"numeric"},hour:"numeric",minute:"2-digit",...i.seconds?{second:"2-digit"}:{}})}(t,e,{year:!1})}function Xt(t,e,i){return new Intl.DateTimeFormat("en-US",{...i,timeZone:e}).formatToParts(new Date(t)).reduce((t,e)=>("literal"!==e.type&&(t[e.type]=e.value),t),{})}function Qt(t,e){const i=Xt(t,e,{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",hourCycle:"h23"}),r=Number(i.year),a=Number(i.month),o=Number(i.day),n=Number(i.hour),s=Number(i.minute),l=Number(i.second);return[r,a,o,n,s,l].every(Number.isFinite)?Date.UTC(r,a-1,o,n,s,l)-t:0}function te(t){const e=function(t){return wt(t)}(t);if(e)try{const t=Xt(Date.now(),e,{year:"numeric",month:"2-digit",day:"2-digit"}),i=Number(t.year),r=Number(t.month),a=Number(t.day);if(![i,r,a].every(Number.isFinite))return;const o=Date.UTC(i,r-1,a,0,0,0,0),n=Qt(o,e);return o-Qt(o-n,e)}catch{return}}function ee(t,e,i){const r=i.width-i.left-i.right,a=Math.max(1,e.end-e.start);return i.left+(t-e.start)/a*r}function ie(t,e){if(!t.length)return 0;if(e<=t[0].timestamp)return 0;let i=0;for(let r=1;r<t.length&&!(t[r].timestamp>e);r+=1)i=r;return i}function re(t,e){return Math.min(t.timestamp+Ot,e.end)}function ae(t,e,i){return ee(re(t,e),e,i)}function oe(t,e,i){const r=re(t,e);return ee(t.timestamp+(r-t.timestamp)/2,e,i)}function ne(t,e,i,r){const a=t.sourceTimestamp??t.timestamp,o=r>=a&&r<a+Ot,n=a+Ot<=r,s=void 0!==i&&t.value<=i;return o&&s?e.cheap_current_color||"#22c55e":o?e.current_hour_color||"#3b82f6":n&&s?e.cheap_past_color||"#bbf7d0":n?e.past_color||"#bfdbfe":s?e.cheap_color||"#86efac":e.future_color||"#93c5fd"}function se(t){return{yesterday_entity:zt,today_entity:Nt,tomorrow_entity:Pt,current_price_entity:Ft,cheap_price_entity:Tt,chart_type:"bar",selector_mode:"hover",height:190,horizontal_lines:5,price_decimals:4,axis_decimals:2,unit:Ut,show_current_marker:!0,show_extremes:!0,show_stats:!0,fill_color:"rgba(56, 199, 243, 0.18)",marker_color:"#38c7f3",grid_color:"var(--divider-color, rgba(127, 127, 127, 0.25))",chart_background:"color-mix(in srgb, var(--card-background-color, #303446) 94%, var(--primary-color, #c39ce3))",card_background:"var(--ha-card-background, var(--card-background-color, #1f1f1f))",...t}}class le extends ct{constructor(){super(...arguments),this._dragging=!1,this._stopPointer=t=>{this._dragging=!1;try{t.currentTarget.releasePointerCapture(t.pointerId)}catch{}}}static async getConfigElement(){return await customElements.whenDefined("real-electricity-price-card-editor"),document.createElement("real-electricity-price-card-editor")}static getStubConfig(){return{type:"custom:real-electricity-price-card",yesterday_entity:zt,today_entity:Nt,tomorrow_entity:Pt,current_price_entity:Ft,chart_type:"bar"}}setConfig(t){this._config=se(t||{})}connectedCallback(){super.connectedCallback(),this._clockTimer=window.setInterval(()=>this.requestUpdate(),3e4),this.hasUpdated&&this.requestUpdate()}disconnectedCallback(){void 0!==this._clockTimer&&(window.clearInterval(this._clockTimer),this._clockTimer=void 0),this._resizeObserver?.disconnect(),this._observedChart=void 0,super.disconnectedCallback()}updated(){const t=this.renderRoot.querySelector(".price-chart-body")||void 0;t!==this._observedChart&&(this._observedChart=t,this._resizeObserver?.disconnect(),t&&"undefined"!=typeof ResizeObserver&&(this._resizeObserver??=new ResizeObserver(t=>{const e=Math.round(t[0]?.contentRect.width||0);e>0&&e!==this._chartWidth&&(this._chartWidth=e)}),this._resizeObserver.observe(t)))}getCardSize(){const t=Vt(this._config||{});return Math.max(3,Math.ceil((t+150)/50))}render(){if(!this._config)return V``;const t=se(this._config),e=function(t){const e=new Date;e.setHours(0,0,0,0);const i=te(t)??e.getTime();return{start:i,end:i+1728e5}}(this.hass),i=function(t,e,i){const r=e.yesterday_entity||zt,a=e.today_entity||Nt,o=e.tomorrow_entity||Pt,n=t?.states[r],s=t?.states[a],l=t?.states[o],c=[...Lt(n),...Lt(s),...Lt(l)].reduce((t,e)=>(e.timestamp>=i.start&&e.timestamp<i.end&&t.set(e.timestamp,e),t),new Map),d=[s?void 0:a,l?void 0:o].filter(t=>Boolean(t));return{points:[...c.values()].sort((t,e)=>t.timestamp-e.timestamp),moreInfoEntityId:s?a:l?o:void 0,missingEntityIds:d}}(this.hass,t,e);if(!i.points.length)return this._renderUnavailable(i.missingEntityIds);const r=jt(t),a=Bt(t),o="string"==typeof t.name?t.name.trim():"",n=i.points,s=function(t,e){const i=t.map(t=>t.value),r=Math.min(...i),a=Math.max(...i),o=Number(e.min),n=Number(e.max);let s=Number.isFinite(o)?o:Math.min(0,r),l=Number.isFinite(n)?n:a;const c=Math.max(.08*(l-s),.005);return Number.isFinite(o)||(s-=r<0?c:0),Number.isFinite(n)||(l+=c),l<=s&&(l=s+.01),{min:s,max:l}}(n,t),l=360/Math.max(120,this._chartWidth||360),c=function(t,e){const i=qt(t);return Array.from({length:i},(t,r)=>e.min+(e.max-e.min)*(1-r/(i-1)))}(t,s).map(e=>function(t,e,i){return St(t,e,{digits:Gt(i),unit:Yt(i)})}(this.hass,e,t)),d=function(t,e,i){const r=Math.max(0,...i.map(t=>t.length));return{width:360,height:Vt(t),left:8,right:Math.max(34,5.8*r+8)*e,top:15*e,bottom:24*e}}(t,l,c),p=function(t,e,i,r){const a=e.height-e.top-e.bottom;return t.map(t=>({...t,x:ee(t.timestamp,r,e),y:e.top+(i.max-t.value)/(i.max-i.min)*a}))}(n,d,s,e),h=Date.now(),m=void 0!==this._selectedIndex,u=Math.max(0,Math.min(p.length-1,m?this._selectedIndex??0:ie(p,h))),f=m?function(t,e,i){return{...t,timestamp:t.sourceTimestamp??t.timestamp,x:oe(t,e,i),sourceTimestamp:t.sourceTimestamp??t.timestamp}}(p[u],e,d):function(t,e,i,r){const a=t[function(t,e){if(!t.length)return 0;const i=t=>t.sourceTimestamp??t.timestamp;if(e<=i(t[0]))return 0;let r=0;for(let a=1;a<t.length&&!(i(t[a])>e);a+=1)r=a;return r}(t,e)];return e<i.start||e>i.end?a:{...a,timestamp:e,x:ee(e,i,r),sourceTimestamp:a.sourceTimestamp??a.timestamp}}(p,h,e,d),g=p.reduce((t,e)=>e.value<t.value?e:t,p[0]),y=p.reduce((t,e)=>e.value>t.value?e:t,p[0]),x=function(t,e){const i=e.current_price_entity||Ft,r=t?.states[i]?.state,a=Number(r);return Number.isFinite(a)?a:void 0}(this.hass,t),v=function(t,e){const i=Number(e.cheap_threshold);if(Number.isFinite(i))return i;const r=e.cheap_price_entity||Tt;return It(t?.states[r]?.state)}(this.hass,t),b=i.moreInfoEntityId||t.current_price_entity||Ft;return V`
      <ha-card class="price-card" style=${`--rep-card-bg:${t.card_background};--rep-chart-bg:${t.chart_background};--rep-grid:${t.grid_color};--rep-marker:${t.marker_color};`}>
        <div class="price-content">
          ${o?V`
            <div class="price-head">
              <button type="button" class="price-title family-title" aria-haspopup="dialog" aria-label=${`${o}: details`} title="Details" @click=${()=>this._openMoreInfo(b)}>
                <span>${o}</span>
                <ha-icon .icon=${ht} aria-hidden="true"></ha-icon>
              </button>
            </div>
          `:G}

          ${!1===t.show_stats?G:this._renderStats(t,n,g,y,x)}

          <div class="price-chart-frame">
            <div class="price-chart-head">
              <div class="price-selected">
                <span>${Jt(this.hass,f.timestamp)}</span>
                <strong>${Kt(this.hass,f.value,t)}</strong>
              </div>
            </div>
            <div class="price-chart-body">
              ${this._renderChart(t,d,l,c,p,f,g,y,s,r,a,e,v,h)}
              <span
                class="price-selected-dot"
                style=${`left:${(f.x/d.width*100).toFixed(2)}%;top:${(f.y/d.height*100).toFixed(2)}%;`}
              ></span>
            </div>
          </div>
        </div>
      </ha-card>
    `}_renderUnavailable(t){const e=t.length>=2,i=t.length?` Missing: ${t.join(", ")}`:"";return V`
      <ha-card class="price-card">
        <div class="price-content">
          ${vt(e?{tone:"error",title:"Price entities not found",message:i.trim()}:{tone:"neutral",title:_t,message:`No hourly prices are available yet.${i}`})}
        </div>
      </ha-card>
    `}_renderStats(t,e,i,r,a){return V`
      <div class="price-stats family-telemetry">
        ${this._renderStat("Now",a,t)}
        ${this._renderStat("Low",i.value,t)}
        ${this._renderStat("Average",function(t){if(t.length)return t.reduce((t,e)=>t+e.value,0)/t.length}(e),t)}
        ${this._renderStat("High",r.value,t)}
      </div>
    `}_renderStat(t,e,i){return V`
      <div class="price-stat family-telemetry-cell">
        <span class="family-telemetry-label">${t}</span>
        ${function(t){return void 0!==At(t)}(e)?V`<span class="family-telemetry-value">${St(this.hass,e,{digits:Wt(i)})} <span class="price-unit">${Zt(i)}</span></span>`:V`<span class="family-telemetry-value family-unavailable">${_t}</span>`}
      </div>
    `}_renderChart(t,e,i,r,a,o,n,s,l,c,d,p,h,m){const u=e.height-e.bottom,f=Math.max(e.top,Math.min(u,e.top+(l.max-0)/(l.max-l.min)*(e.height-e.top-e.bottom))),g=(e.width-e.left-e.right)/48,y=Math.max(2,Math.min(14,.9*g)),x=function(t,e){const i=Math.floor(e/96)+1,r=Dt.find(t=>48/t+1<=i)??Dt[Dt.length-1];return Array.from({length:48/r+1},(e,i)=>t.start+i*r*Ot)}(p,(e.width-e.left-e.right)/i),v=ee(Date.now(),p,e),b=!1!==t.show_current_marker&&v>=e.left&&v<=e.width-e.right,_=oe(n,p,e),$=oe(s,p,e),w="rep-line-fill",k="rep-line-color",A=Math.max(1,e.width-e.left-e.right),C=a.flatMap(i=>{const r=ne(i,t,h,m),a=Math.max(0,Math.min(100,(i.x-e.left)/A*100)),o=Math.max(0,Math.min(100,(ae(i,p,e)-e.left)/A*100));return[q`<stop offset=${`${a}%`} stop-color=${r}></stop>`,q`<stop offset=${`${o}%`} stop-color=${r}></stop>`]});return V`
      <svg
        class="price-chart"
        viewBox=${`0 0 ${e.width} ${e.height}`}
        preserveAspectRatio="none"
        style=${`--rep-text-scale:${i.toFixed(4)};`}
        role="slider"
        tabindex="0"
        aria-label="Electricity price interval"
        aria-valuemin="0"
        aria-valuemax=${a.length-1}
        aria-valuenow=${ie(a,o.timestamp)}
        aria-valuetext=${`${Jt(this.hass,o.timestamp)} ${Kt(this.hass,o.value,t)}`}
        @keydown=${t=>this._selectKeyboard(t,a,o.timestamp)}
        @pointerdown=${t=>this._selectPoint(t,a,e,d,p)}
        @pointermove=${t=>this._selectPoint(t,a,e,d,p)}
        @pointerup=${this._stopPointer}
        @pointercancel=${this._stopPointer}
        @pointerleave=${this._stopPointer}
      >
        <defs>
          <linearGradient id=${w} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stop-color=${t.fill_color||"rgba(56, 199, 243, 0.20)"}></stop>
            <stop offset="100%" stop-color="rgba(56, 199, 243, 0.04)"></stop>
          </linearGradient>
          <linearGradient id=${k} x1=${e.left} x2=${e.width-e.right} y1="0" y2="0" gradientUnits="userSpaceOnUse">
            ${C}
          </linearGradient>
        </defs>
        ${this._renderGrid(e,i,r,x,p)}
        ${"line"===c?this._renderLineChart(a,u,w,k,p,e):this._renderBarChart(a,f,y,g,o,t,h,m)}
        ${b?q`<line class="price-current-line" x1=${v} x2=${v} y1=${e.top} y2=${u}></line>`:G}
        ${!1===t.show_extremes?G:q`
          <text class="price-extreme" x=${_} y=${Math.max(11*i,n.y-9*i)}>L</text>
          <text class="price-extreme" x=${$} y=${Math.max(11*i,s.y-9*i)}>H</text>
        `}
        <line class="price-selected-line" x1=${o.x} x2=${o.x} y1=${e.top} y2=${u}></line>
        <title>${Jt(this.hass,o.timestamp)} ${Kt(this.hass,o.value,t)}</title>
        <desc>${a.length} available hourly electricity price points in a fixed ${48}-hour chart window.</desc>
      </svg>
    `}_renderGrid(t,e,i,r,a){const o=t.height-t.bottom,n=i.length;return[...i.map((i,r)=>{const a=t.top+r/(n-1)*(o-t.top);return q`
          <line class="price-grid-line" x1=${t.left} x2=${t.width-t.right} y1=${a} y2=${a}></line>
          <text class="price-axis-label" x=${t.width-2*e} y=${a}>${i}</text>
        `}),...r.map((i,n)=>{const s=ee(i,a,t),l=0===n?" price-time-label-start":n===r.length-1?" price-time-label-end":"";return q`
          <line class="price-time-line" x1=${s} x2=${s} y1=${t.top} y2=${o}></line>
          <text class=${`price-time-label${l}`} x=${s} y=${t.height-6*e}>${Jt(this.hass,i)}</text>
        `})]}_renderBarChart(t,e,i,r,a,o,n,s){const l=a.timestamp,c=a.sourceTimestamp,d=Math.max(0,(r-i)/2);return t.map(t=>{const r=Math.min(t.y,e),a=Math.max(1,Math.abs(e-t.y)),p=t.timestamp===l||void 0!==c&&t.sourceTimestamp===c?" price-bar-selected":"";return q`
        <rect
          class=${`price-bar${p}`}
          x=${t.x+d}
          y=${r}
          width=${i}
          height=${a}
          rx="2.5"
          fill=${ne(t,o,n,s)}
        ></rect>
      `})}_renderLineChart(t,e,i,r,a,o){const n=function(t,e,i,r){const a=[];let o,n="",s=0,l=0;const c=()=>{n&&(a.push({line:n,area:`${n} L ${l.toFixed(2)} ${e.toFixed(2)} L ${s.toFixed(2)} ${e.toFixed(2)} Z`}),n="")};return t.forEach(t=>{const e=t.x,a=ae(t,i,r),d=o&&Math.abs(t.timestamp-(o.timestamp+Ot))<6e4;n&&d?n+=` L ${e.toFixed(2)} ${t.y.toFixed(2)}`:(c(),s=e,n=`M ${e.toFixed(2)} ${t.y.toFixed(2)}`),n+=` L ${a.toFixed(2)} ${t.y.toFixed(2)}`,l=a,o=t}),c(),a}(t,e,a,o);return q`
      ${n.map(t=>q`<path class="price-line-area" d=${t.area} fill=${`url(#${i})`}></path>`)}
      ${n.map(t=>q`<path class="price-line-shadow" d=${t.line}></path>`)}
      ${n.map(t=>q`<path class="price-line" d=${t.line} stroke=${`url(#${r})`}></path>`)}
    `}_selectKeyboard(t,e,i){let r=ie(e,i);switch(t.key){case"ArrowLeft":case"ArrowDown":r-=1;break;case"ArrowRight":case"ArrowUp":r+=1;break;case"PageDown":r-=6;break;case"PageUp":r+=6;break;case"Home":r=0;break;case"End":r=e.length-1;break;default:return}t.preventDefault(),this._selectedIndex=Math.max(0,Math.min(e.length-1,r))}_selectPoint(t,e,i,r,a){const o="hover"===r&&"pointermove"===t.type&&"touch"!==t.pointerType;if("pointermove"===t.type&&!o&&!this._dragging)return;if("pointerdown"===t.type){this._dragging=!0;try{t.currentTarget.setPointerCapture(t.pointerId)}catch{}}"touch"!==t.pointerType&&t.preventDefault();const n=t.currentTarget.getBoundingClientRect(),s=function(t,e,i){const r=i.width-i.left-i.right,a=Math.max(1,e.end-e.start),o=Math.max(i.left,Math.min(i.width-i.right,t));return e.start+(o-i.left)/Math.max(1,r)*a}((t.clientX-n.left)/Math.max(1,n.width)*i.width,a,i);this._selectedIndex=ie(e,s)}_openMoreInfo(t){t&&function(t,e){t.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:e},bubbles:!0,composed:!0}))}(this,t)}}le.properties={hass:{attribute:!1},_config:{state:!0},_selectedIndex:{state:!0},_chartWidth:{state:!0}},le.styles=[pt,mt,bt,ut,ft,n`
    :host {
      display: block;
      color: var(--primary-text-color);
    }

    ha-card.price-card {
      overflow: hidden;
      border-radius: var(--family-radius);
      background: var(--rep-card-bg);
      box-shadow: var(--ha-card-box-shadow, none);
    }

    .price-content {
      padding: var(--tile-padding-large);
      border-radius: inherit;
      box-sizing: border-box;
    }

    .price-head {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 16px;
      margin-bottom: var(--large-gap);
    }

    .price-title {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      max-width: 100%;
      padding: 0;
      border: 0;
      background: transparent;
      color: var(--primary-text-color);
      font-family: inherit;
      min-height: 44px;
      text-align: left;
      cursor: pointer;
    }

    .price-title span { min-width: 0; overflow-wrap: anywhere; }
    .price-title ha-icon { width: 22px; height: 22px; --mdc-icon-size: 22px; flex: 0 0 22px; color: var(--secondary-text-color); }

    .price-title:focus {
      outline: none;
    }

    .price-title:focus-visible {
      outline: 3px solid var(--primary-color);
      outline-offset: 3px;
      border-radius: 4px;
    }

    .price-selected {
      flex: 0 1 auto;
      display: inline-flex;
      flex-wrap: wrap;
      align-items: baseline;
      justify-content: flex-end;
      gap: 4px 8px;
      max-width: 100%;
      min-width: 0;
      color: var(--secondary-text-color);
      font-size: 12px;
      line-height: 1.4;
      font-weight: 500;
      text-align: right;
    }

    .price-selected span {
      min-width: 0;
      max-width: 100%;
      overflow-wrap: anywhere;
    }

    .price-selected strong {
      flex-shrink: 0;
      color: var(--primary-text-color);
      font-size: 14px;
      line-height: 1;
      font-weight: 600;
      letter-spacing: 0;
      white-space: nowrap;
    }

    .price-stats {
      --family-telemetry-columns: 4;
      margin-bottom: var(--large-gap);
      border-radius: var(--tile-border-radius);
      background: var(--family-tile);
    }

    .price-unit {
      color: var(--secondary-text-color);
      font-size: 11px;
      font-weight: 500;
      white-space: nowrap;
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
      touch-action: pan-y;
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
      stroke: color-mix(in srgb, var(--primary-text-color) 36%, transparent);
      stroke-width: 1;
      vector-effect: non-scaling-stroke;
    }

    .price-bar {
      opacity: 0.95;
      transition: opacity 120ms ease;
    }

    .price-bar-selected {
      opacity: 1;
      stroke: color-mix(in srgb, var(--primary-text-color) 72%, transparent);
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

    /* SVG text scales with the viewBox; --rep-text-scale keeps labels at 11 CSS pixels. */
    .price-axis-label,
    .price-time-label,
    .price-extreme {
      fill: var(--secondary-text-color);
      font-size: calc(11px * var(--rep-text-scale, 1));
      font-weight: 600;
      text-anchor: middle;
      dominant-baseline: middle;
    }

    .price-axis-label {
      text-anchor: end;
    }

    .price-time-label-start {
      text-anchor: start;
    }

    .price-time-label-end {
      text-anchor: end;
    }

    .price-extreme {
      fill: var(--primary-text-color);
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
      border: 1px solid color-mix(in srgb, var(--primary-text-color) 54%, transparent);
      border-radius: 50%;
      background: color-mix(in srgb, var(--card-background-color, #000) 60%, transparent);
      box-shadow: 0 0 0 2px color-mix(in srgb, var(--primary-text-color) 18%, transparent);
      transform: translate(-50%, -50%);
      pointer-events: none;
    }

    .price-selected-dot::after {
      content: "";
      position: absolute;
      inset: 4px;
      border-radius: 50%;
      background: var(--primary-text-color);
      box-shadow: 0 0 0 1px color-mix(in srgb, var(--card-background-color, #000) 40%, transparent);
    }

    .price-card { container-type:inline-size; }
    .price-chart:focus-visible { outline:3px solid var(--primary-color);outline-offset:-3px;border-radius:8px; }
    .price-stat .family-telemetry-value { line-height:1.4; }
    @media (prefers-reduced-motion:reduce) { *,*::before,*::after { animation:none!important;transition:none!important; } }
    @container (max-width: 480px) {
      .price-content {
        padding: var(--tile-padding-large);
      }

      .price-head {
        gap: 10px;
      }

      .price-title {
        max-width: 64%;
      }

      .price-stats {
        --family-telemetry-columns: 2;
      }

      .price-stat:nth-child(2n) {
        border-inline-end: 0;
      }
    }
  `];class ce extends ct{constructor(){super(...arguments),this._config=le.getStubConfig()}setConfig(t){this._config=se(t||{})}render(){const t=se(this._config);return V`
      <div class="editor">
        ${this._textField("Name (optional)","name",t.name||"")}
        ${this._textField("Yesterday Prices Entity","yesterday_entity",t.yesterday_entity||zt)}
        <div class="grid">
          ${this._textField("Today Prices Entity","today_entity",t.today_entity||Nt)}
          ${this._textField("Tomorrow Prices Entity","tomorrow_entity",t.tomorrow_entity||Pt)}
        </div>
        ${this._textField("Current Price Entity","current_price_entity",t.current_price_entity||Ft)}
        ${this._textField("Acceptable Price Entity","cheap_price_entity",t.cheap_price_entity||Tt)}
        <label>
          <span>Chart Type</span>
          <select .value=${jt(t)} @change=${t=>this._setValue("chart_type",t.target.value)}>
            <option value="bar">Bars</option>
            <option value="line">Step line</option>
          </select>
        </label>
        <label>
          <span>Selector Mode</span>
          <select .value=${Bt(t)} @change=${t=>this._setValue("selector_mode",t.target.value)}>
            <option value="hover">Hover</option>
            <option value="click">Click / tap</option>
          </select>
        </label>
        <div class="grid">
          ${this._numberField("Height","height",Vt(t),120,360)}
          ${this._numberField("Horizontal Lines","horizontal_lines",qt(t),2,9)}
          ${this._numberField("Price Decimals","price_decimals",Wt(t),0,6)}
          ${this._numberField("Axis Decimals","axis_decimals",Gt(t),0,4)}
        </div>
        ${this._textField("Unit","unit",t.unit||Ut)}
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
        ${this._textField("Grid Color","grid_color",t.grid_color||"var(--divider-color, rgba(127, 127, 127, 0.25))")}
        ${this._textField("Chart Background","chart_background",t.chart_background||"color-mix(in srgb, var(--card-background-color, #303446) 94%, var(--primary-color, #c39ce3))")}
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
    `}_numberField(t,e,i,r,a,o=!1){return V`
      <label>
        <span>${t}</span>
        <input
          type="number"
          min=${r??G}
          max=${a??G}
          .value=${String(i??"")}
          @input=${t=>{const i=t.target.value,r=Number(i);this._setValue(e,o&&""===i?void 0:Number.isFinite(r)?r:void 0)}}
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
    `}_setValue(t,e){const i={...this._config};var r,a;void 0===e||""===e?delete i[t]:i[t]=e,this._config=i,r="config-changed",a={config:i},this.dispatchEvent(new CustomEvent(r,{detail:a,bubbles:!0,composed:!0}))}}ce.properties={hass:{attribute:!1},_config:{state:!0}},ce.styles=n`
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
      /* 16px keeps iOS from zooming the dashboard when a field is focused. */
      font-size: 16px;
      font-weight: 500;
    }

    input[type="color"] {
      height: 42px;
      padding: 4px;
    }

    textarea {
      min-height: 96px;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
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
  `,customElements.get("real-electricity-price-card")||customElements.define("real-electricity-price-card",le),customElements.get("real-electricity-price-card-editor")||customElements.define("real-electricity-price-card-editor",ce),window.customCards=window.customCards||[],window.customCards.push({type:"real-electricity-price-card",name:"Real Electricity Price Card",description:"Interactive electricity price chart for real-electricity-price",preview:!1,version:"0.2.0"});
