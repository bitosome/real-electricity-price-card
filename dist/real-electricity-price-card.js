/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),r=new WeakMap;let a=class{constructor(t,e,r){if(this._$cssResult$=!0,r!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=r.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&r.set(i,t))}return t}toString(){return this.cssText}};const o=t=>new a("string"==typeof t?t:t+"",void 0,i),n=(t,...e)=>{const r=1===t.length?t[0]:e.reduce((e,i,r)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[r+1],t[0]);return new a(r,t,i)},s=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return o(e)})(t):t,{is:l,defineProperty:c,getOwnPropertyDescriptor:d,getOwnPropertyNames:h,getOwnPropertySymbols:p,getPrototypeOf:m}=Object,f=globalThis,u=f.trustedTypes,y=u?u.emptyScript:"",g=f.reactiveElementPolyfillSupport,v=(t,e)=>t,x={toAttribute(t,e){switch(e){case Boolean:t=t?y:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},b=(t,e)=>!l(t,e),$={attribute:!0,type:String,converter:x,reflect:!1,useDefault:!1,hasChanged:b};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),f.litPropertyMetadata??=new WeakMap;let _=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=$){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(t,i,e);void 0!==r&&c(this.prototype,t,r)}}static getPropertyDescriptor(t,e,i){const{get:r,set:a}=d(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:r,set(e){const o=r?.call(this);a?.call(this,e),this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??$}static _$Ei(){if(this.hasOwnProperty(v("elementProperties")))return;const t=m(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(v("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(v("properties"))){const t=this.properties,e=[...h(t),...p(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(s(t))}else void 0!==t&&e.push(s(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,r)=>{if(e)i.adoptedStyleSheets=r.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of r){const r=document.createElement("style"),a=t.litNonce;void 0!==a&&r.setAttribute("nonce",a),r.textContent=e.cssText,i.appendChild(r)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),r=this.constructor._$Eu(t,i);if(void 0!==r&&!0===i.reflect){const a=(void 0!==i.converter?.toAttribute?i.converter:x).toAttribute(e,i.type);this._$Em=t,null==a?this.removeAttribute(r):this.setAttribute(r,a),this._$Em=null}}_$AK(t,e){const i=this.constructor,r=i._$Eh.get(t);if(void 0!==r&&this._$Em!==r){const t=i.getPropertyOptions(r),a="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:x;this._$Em=r;const o=a.fromAttribute(e,t.type);this[r]=o??this._$Ej?.get(r)??o,this._$Em=null}}requestUpdate(t,e,i,r=!1,a){if(void 0!==t){const o=this.constructor;if(!1===r&&(a=this[t]),i??=o.getPropertyOptions(t),!((i.hasChanged??b)(a,e)||i.useDefault&&i.reflect&&a===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:r,wrapped:a},o){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==a||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===r&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,r=this[e];!0!==t||this._$AL.has(e)||void 0===r||this.C(e,void 0,i,r)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};_.elementStyles=[],_.shadowRootOptions={mode:"open"},_[v("elementProperties")]=new Map,_[v("finalized")]=new Map,g?.({ReactiveElement:_}),(f.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const w=globalThis,k=t=>t,A=w.trustedTypes,M=A?A.createPolicy("lit-html",{createHTML:t=>t}):void 0,S="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,E="?"+C,N=`<${E}>`,z=document,P=()=>z.createComment(""),T=t=>null===t||"object"!=typeof t&&"function"!=typeof t,F=Array.isArray,U="[ \t\n\f\r]",O=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,D=/-->/g,H=/>/g,I=RegExp(`>|${U}(?:([^\\s"'>=/]+)(${U}*=${U}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),R=/'/g,L=/"/g,j=/^(?:script|style|textarea|title)$/i,G=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),W=G(1),B=G(2),q=Symbol.for("lit-noChange"),V=Symbol.for("lit-nothing"),Z=new WeakMap,Y=z.createTreeWalker(z,129);function J(t,e){if(!F(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==M?M.createHTML(e):e}const K=(t,e)=>{const i=t.length-1,r=[];let a,o=2===e?"<svg>":3===e?"<math>":"",n=O;for(let e=0;e<i;e++){const i=t[e];let s,l,c=-1,d=0;for(;d<i.length&&(n.lastIndex=d,l=n.exec(i),null!==l);)d=n.lastIndex,n===O?"!--"===l[1]?n=D:void 0!==l[1]?n=H:void 0!==l[2]?(j.test(l[2])&&(a=RegExp("</"+l[2],"g")),n=I):void 0!==l[3]&&(n=I):n===I?">"===l[0]?(n=a??O,c=-1):void 0===l[1]?c=-2:(c=n.lastIndex-l[2].length,s=l[1],n=void 0===l[3]?I:'"'===l[3]?L:R):n===L||n===R?n=I:n===D||n===H?n=O:(n=I,a=void 0);const h=n===I&&t[e+1].startsWith("/>")?" ":"";o+=n===O?i+N:c>=0?(r.push(s),i.slice(0,c)+S+i.slice(c)+C+h):i+C+(-2===c?e:h)}return[J(t,o+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),r]};class X{constructor({strings:t,_$litType$:e},i){let r;this.parts=[];let a=0,o=0;const n=t.length-1,s=this.parts,[l,c]=K(t,e);if(this.el=X.createElement(l,i),Y.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(r=Y.nextNode())&&s.length<n;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(S)){const e=c[o++],i=r.getAttribute(t).split(C),n=/([.?@])?(.*)/.exec(e);s.push({type:1,index:a,name:n[2],strings:i,ctor:"."===n[1]?rt:"?"===n[1]?at:"@"===n[1]?ot:it}),r.removeAttribute(t)}else t.startsWith(C)&&(s.push({type:6,index:a}),r.removeAttribute(t));if(j.test(r.tagName)){const t=r.textContent.split(C),e=t.length-1;if(e>0){r.textContent=A?A.emptyScript:"";for(let i=0;i<e;i++)r.append(t[i],P()),Y.nextNode(),s.push({type:2,index:++a});r.append(t[e],P())}}}else if(8===r.nodeType)if(r.data===E)s.push({type:2,index:a});else{let t=-1;for(;-1!==(t=r.data.indexOf(C,t+1));)s.push({type:7,index:a}),t+=C.length-1}a++}}static createElement(t,e){const i=z.createElement("template");return i.innerHTML=t,i}}function Q(t,e,i=t,r){if(e===q)return e;let a=void 0!==r?i._$Co?.[r]:i._$Cl;const o=T(e)?void 0:e._$litDirective$;return a?.constructor!==o&&(a?._$AO?.(!1),void 0===o?a=void 0:(a=new o(t),a._$AT(t,i,r)),void 0!==r?(i._$Co??=[])[r]=a:i._$Cl=a),void 0!==a&&(e=Q(t,a._$AS(t,e.values),a,r)),e}class tt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,r=(t?.creationScope??z).importNode(e,!0);Y.currentNode=r;let a=Y.nextNode(),o=0,n=0,s=i[0];for(;void 0!==s;){if(o===s.index){let e;2===s.type?e=new et(a,a.nextSibling,this,t):1===s.type?e=new s.ctor(a,s.name,s.strings,this,t):6===s.type&&(e=new nt(a,this,t)),this._$AV.push(e),s=i[++n]}o!==s?.index&&(a=Y.nextNode(),o++)}return Y.currentNode=z,r}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class et{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,r){this.type=2,this._$AH=V,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Q(this,t,e),T(t)?t===V||null==t||""===t?(this._$AH!==V&&this._$AR(),this._$AH=V):t!==this._$AH&&t!==q&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>F(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==V&&T(this._$AH)?this._$AA.nextSibling.data=t:this.T(z.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,r="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=X.createElement(J(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===r)this._$AH.p(e);else{const t=new tt(r,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=Z.get(t.strings);return void 0===e&&Z.set(t.strings,e=new X(t)),e}k(t){F(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,r=0;for(const a of t)r===e.length?e.push(i=new et(this.O(P()),this.O(P()),this,this.options)):i=e[r],i._$AI(a),r++;r<e.length&&(this._$AR(i&&i._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=k(t).nextSibling;k(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class it{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,r,a){this.type=1,this._$AH=V,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=a,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=V}_$AI(t,e=this,i,r){const a=this.strings;let o=!1;if(void 0===a)t=Q(this,t,e,0),o=!T(t)||t!==this._$AH&&t!==q,o&&(this._$AH=t);else{const r=t;let n,s;for(t=a[0],n=0;n<a.length-1;n++)s=Q(this,r[i+n],e,n),s===q&&(s=this._$AH[n]),o||=!T(s)||s!==this._$AH[n],s===V?t=V:t!==V&&(t+=(s??"")+a[n+1]),this._$AH[n]=s}o&&!r&&this.j(t)}j(t){t===V?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class rt extends it{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===V?void 0:t}}class at extends it{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==V)}}class ot extends it{constructor(t,e,i,r,a){super(t,e,i,r,a),this.type=5}_$AI(t,e=this){if((t=Q(this,t,e,0)??V)===q)return;const i=this._$AH,r=t===V&&i!==V||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,a=t!==V&&(i===V||r);r&&this.element.removeEventListener(this.name,this,i),a&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class nt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Q(this,t)}}const st=w.litHtmlPolyfillSupport;st?.(X,et),(w.litHtmlVersions??=[]).push("3.3.3");const lt=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let ct=class extends _{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const r=i?.renderBefore??e;let a=r._$litPart$;if(void 0===a){const t=i?.renderBefore??null;r._$litPart$=a=new et(e.insertBefore(P(),t),t,void 0,i??{})}return a._$AI(t),a})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return q}};ct._$litElement$=!0,ct.finalized=!0,lt.litElementHydrateSupport?.({LitElement:ct});const dt=lt.litElementPolyfillSupport;dt?.({LitElement:ct}),(lt.litElementVersions??=[]).push("4.2.2");const ht=n`
  ${o("\n  :host {\n    display: block;\n    /* Chip styling variables */\n    --chip-padding: 2px 2px;\n    --chip-text-font-weight: 700;\n    --chip-text-font-size: var(--chip-font-size, 12px);\n    --chip-background-color: rgba(0,0,0,0.06);\n    --chip-border-radius: var(--ha-badge-border-radius, 999px);\n    --chip-gap: 6px;\n    --main-light-on-bg: linear-gradient(135deg,#ffcf57,#ffb200);\n    --main-light-off-bg: rgba(0,0,0,0.06);\n    --main-light-icon-on-color: #ffffff;\n    --main-light-icon-off-color: var(--secondary-text-color);\n    --switch-on-color: var(--switch-on-yellow, #ffc107);\n    --switch-smart-on-color: var(--switch-on-green, #00c853);\n    --switch-lock-unlocked-color: var(--switch-unlocked-red, #e53935);\n    --lock-spinner-color: var(--primary-text-color, #ffffff);\n    --switch-chip-bg: var(--chip-background-color, rgba(0,0,0,0.06));\n    --switch-icon-size: 28px;\n    --ac-chip-bg-off: rgba(158,158,158,0.95);\n    --ac-chip-bg-cool: #00aaff;\n    --ac-chip-bg-heat: #ff7043;\n    --ac-chip-bg-dry: #ffca28;\n    --ac-chip-bg-fan: #66bb6a;\n    --ac-chip-bg-auto: #26c6da;\n    --ac-chip-bg-default: rgba(0,0,0,0.06);\n    --ac-chip-icon-color: #ffffff;\n    --ac-chip-icon-off-color: #ffffff;\n    --ac-fan-color-off: gray;\n    --ac-fan-color-cool: #00aaff;\n    --ac-fan-color-heat: #ff7043;\n    --ac-fan-color-dry: #ffca28;\n    --ac-fan-color-fan: #66bb6a;\n    --ac-fan-color-auto: #26c6da;\n    --ac-fan-color-default: var(--paper-item-icon-color);\n    --thermostat-heating-color: #ff7043;\n    --thermostat-idle-color: #66bb6a;\n    --thermostat-off-color: gray;\n    --thermostat-pill-heating-bg: var(--state-climate-heat-color, #ff7043);\n    --thermostat-pill-heating-fg: var(--primary-background-color, #fff);\n    --thermostat-pill-idle-bg: var(--chip-background-color, rgba(0,0,0,0.06));\n    --thermostat-pill-idle-fg: var(--secondary-text-color);\n\n    /* Shared semantic status palette (single source of truth across cards) */\n    --status-on-color: #ffc107;\n    --status-active-color: #42a5f5;\n    --status-success-color: #66bb6a;\n    --status-alert-color: #e53935;\n    --status-warn-color: #ff9800;\n    --status-caution-color: #ffca28;\n    --status-cool-color: #00aaff;\n    --status-heat-color: #ff7043;\n    --status-dry-color: #ffca28;\n    --status-fan-color: #66bb6a;\n    --status-auto-color: #26c6da;\n    --status-smartplug-on-color: #ff9800;\n    --status-presence-color: #42a5f5;\n    --status-icon-on-color: #ffffff;\n\n    /* Positioning variables */\n    --tile-padding: 8px;\n    --tile-padding-large: 12px;\n    --chip-z-index: 3;\n    --tile-z-index: 2;\n    --glow-z-index: 1;\n\n    /* Tile shape control */\n    --tile-border-radius: var(--ha-card-border-radius, 12px);\n\n    /* Common gaps and spacing */\n    --small-gap: 2px;\n    --medium-gap: 6px;\n    --large-gap: 12px;\n\n    /* Shadow variables */\n    --tile-shadow-default: 0 6px 18px rgba(0,0,0,0.10);\n    --tile-shadow-hover: 0 12px 24px rgba(0,0,0,0.16);\n    --tile-shadow-active: 0 18px 40px var(--pulse-strong, rgba(0,0,0,0.18)), 0 6px 18px var(--pulse-weak, rgba(0,0,0,0.10));\n  }\n")}
`,pt="mdi:information-outline",mt=n`
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
`,ft=n`
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
`;const ut=n`
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
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;const yt=2;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class gt{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const vt=(t,e)=>{const i=t._$AN;if(void 0===i)return!1;for(const t of i)t._$AO?.(e,!1),vt(t,e);return!0},xt=t=>{let e,i;do{if(void 0===(e=t._$AM))break;i=e._$AN,i.delete(t),t=e}while(0===i?.size)},bt=t=>{for(let e;e=t._$AM;t=e){let i=e._$AN;if(void 0===i)e._$AN=i=new Set;else if(i.has(t))break;i.add(t),wt(e)}};function $t(t){void 0!==this._$AN?(xt(this),this._$AM=t,bt(this)):this._$AM=t}function _t(t,e=!1,i=0){const r=this._$AH,a=this._$AN;if(void 0!==a&&0!==a.size)if(e)if(Array.isArray(r))for(let t=i;t<r.length;t++)vt(r[t],!1),xt(r[t]);else null!=r&&(vt(r,!1),xt(r));else vt(this,t)}const wt=t=>{t.type==yt&&(t._$AP??=_t,t._$AQ??=$t)};class kt extends gt{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,e,i){super._$AT(t,e,i),bt(this),this.isConnected=t._$AU}_$AO(t,e=!0){t!==this.isConnected&&(this.isConnected=t,t?this.reconnected?.():this.disconnected?.()),e&&(vt(this,t),xt(this))}setValue(t){if((t=>void 0===t.strings)(this._$Ct))this._$Ct._$AI(t,this);else{const e=[...this._$Ct._$AH];e[this._$Ci]=t,this._$Ct._$AI(e,this,0)}}disconnected(){}reconnected(){}}const At=new WeakMap,Mt=(t=>(...e)=>({_$litDirective$:t,values:e}))(class extends kt{render(t){return V}update(t,[e]){const i=e!==this.G;return i&&this.rt(void 0),(i||this.lt!==this.ct)&&(this.G=e,this.ht=t.options?.host,this.rt(this.ct=t.element)),V}rt(t){if(void 0!==this.G)if(this.isConnected||(t=void 0),"function"==typeof this.G){const e=this.ht??globalThis;let i=At.get(e);void 0===i&&(i=new WeakMap,At.set(e,i)),void 0!==i.get(this.G)&&this.G.call(this.ht,void 0),i.set(this.G,t),void 0!==t&&this.G.call(this.ht,t)}else this.G.value=t}get lt(){return"function"==typeof this.G?At.get(this.ht??globalThis)?.get(this.G):this.G?.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}}),St=t=>t??V,Ct=n`
  .family-level-meter {
    position: relative;
    height: 6px;
    border-radius: 999px;
    background: color-mix(in srgb, var(--primary-text-color) 12%, transparent);
    overflow: hidden;
  }
  .family-level-fill {
    display: block;
    height: 100%;
    border-radius: inherit;
    background: var(--family-level-color, var(--family-tone, var(--primary-color)));
    transition: width 0.3s;
  }
  .family-level-target {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 2px;
    transform: translateX(-1px);
    background: var(--primary-text-color);
    opacity: 0.6;
  }
  @media (prefers-reduced-motion: reduce) {
    .family-level-fill {
      transition: none;
    }
  }
`,Et={accent:"mdi:information-outline",success:"mdi:check-circle-outline",caution:"mdi:alert-outline",warning:"mdi:alert-outline",error:"mdi:alert-circle-outline",unavailable:"mdi:help-circle-outline"};
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Nt(t){return W`<button
    type="button"
    class="family-action ${function(t){return t.emphasis&&"secondary"!==t.emphasis?t.emphasis:[t.primary?"primary":"",t.destructive?"destructive":""].filter(Boolean).join(" ")}(t)} ${t.className||""}"
    title=${t.title||t.label}
    aria-label=${St(t.ariaLabel)}
    aria-haspopup=${St(t.hasPopup)}
    ?data-family-initial-focus=${!!t.initialFocus}
    ?disabled=${t.disabled||t.pending}
    aria-busy=${t.pending?"true":"false"}
    @click=${t.onClick}
  >
    ${t.pending?W`<span class="family-pending-indicator" aria-hidden="true"></span>`:(e=t.icon,e?W`<ha-icon .icon=${e} aria-hidden="true"></ha-icon>`:V)}${t.pending?t.pendingLabel||"Saving…":t.label}
  </button>`;var e}function zt(t){const e=t.tone||"neutral",i=!1===t.icon?void 0:t.icon||Et[e],r=[...t.action?[t.action]:[],...t.actions||[]];return W`<div
    class="family-notice ${t.className||""}"
    data-tone=${e}
    role=${t.role||("error"===e?"alert":"status")}
  >
    ${i?W`<ha-icon class="family-notice-icon" .icon=${i} aria-hidden="true"></ha-icon>`:V}<div class="family-notice-content">
      ${t.title?W`<strong class="family-notice-title">${t.title}</strong>`:V}<span class="family-notice-message">${t.message}</span>${t.body?W`<div class="family-notice-body">${t.body}</div>`:V}
    </div>${r.length?W`<div class="family-notice-actions">${r.map(t=>Nt(t))}</div>`:V}
  </div>`}function Pt(t){return W`<div class="family-async-state" role="status">
      <span>${t.message||"Nothing to show yet"}</span>
    </div>`}const Tt=n`
  ${Ct}
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
  /*
   * Unpressed, the check keeps its slot (so selecting never changes the pill's width,
   * whatever padding a card sets) and the label is shifted by half that slot
   * (22px icon + 8px gap) so it reads centred. translate does not affect layout.
   * Low specificity: a left-aligned option list can reset it with "translate: none".
   */
  .family-toggle[aria-pressed="false"] .family-toggle-check {
    visibility: hidden;
  }
  .family-toggle:where([aria-pressed="false"]:has(> .family-toggle-check)) > :where(:not(.family-toggle-check)) {
    translate: 15px 0;
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
`;const Ft="Unavailable",Ut=t=>t?.locale?.language||t?.language||"en";function Ot(t){const e=(new Intl.DateTimeFormat).resolvedOptions().timeZone;if("local"!==t?.locale?.time_zone||!e||"UTC"===e)return t?.config?.time_zone||void 0}const Dt=/^[+-]?(\d+\.?\d*|\.\d+)(e[+-]?\d+)?$/i;function Ht(t){if("number"==typeof t)return Number.isFinite(t)?t:void 0;if("string"!=typeof t||!Dt.test(t.trim()))return;const e=Number(t.trim());return Number.isFinite(e)?e:void 0}function It(t){try{return t()}catch{return Ft}}const Rt=t=>"none"!==t?.locale?.number_format;function Lt(t,e,i={}){const r=Ht(e);if(void 0===r)return Ft;const a=It(()=>new Intl.NumberFormat(function(t){switch(t?.locale?.number_format){case"comma_decimal":case"none":return"en-US";case"decimal_comma":return"de";case"space_comma":return"fr";case"system":return;default:return Ut(t)}}(t),{minimumFractionDigits:i.digits??i.minimumFractionDigits,maximumFractionDigits:i.digits??i.maximumFractionDigits,signDisplay:i.signDisplay,useGrouping:Rt(t)}).format(r));return i.unit&&a!==Ft?`${a} ${i.unit}`:a}function jt(t,e,i){const r=function(t){if(null==t||""===t)return;const e=t instanceof Date?t:new Date(t);return Number.isFinite(e.getTime())?e:void 0}(e);if(!r)return Ft;const a="hour"in i||"minute"in i?function(t){switch(t?.locale?.time_format){case"12":return!0;case"24":return!1;case"system":{const t=new Intl.DateTimeFormat(void 0,{hour:"numeric"}).resolvedOptions().hourCycle;return"h11"===t||"h12"===t}default:return}}(t):void 0,o=void 0===a?{}:{hourCycle:a?"h12":"h23"},n=e=>new Intl.DateTimeFormat(Ut(t),{...i,...o,timeZone:e}).format(r);return It(()=>{try{return n(Ot(t))}catch{return n(void 0)}})}function Gt(t,e,i={}){return jt(t,e,{day:"numeric",month:"short",...!1===i.year?{}:{year:"numeric"},hour:"numeric",minute:"2-digit",...i.seconds?{second:"2-digit"}:{}})}const Wt=15,Bt=24,qt=8,Vt=36,Zt=36e5,Yt=[9e5,18e5,Zt,72e5,108e5,144e5,216e5,288e5,432e5,576e5,864e5,1728e5,6048e5],Jt=[82,360],Kt=.25,Xt=(t,e,i)=>Math.min(i,Math.max(e,t)),Qt=t=>"number"==typeof t&&Number.isFinite(t),te=t=>Number(t.toPrecision(12));function ee(t){return Xt(Math.round(t)||0,Jt[0],Jt[1])}function ie(t,e){const[i,r]=t,[a,o]=e,n=r-i,s=t=>0===n?(a+o)/2:a+(t-i)/n*(o-a);return s.invert=t=>o===a||0===n?i:i+(t-a)/(o-a)*n,s.domain=[i,r],s.range=[a,o],s}const re=[1,2,2.5,3,4,5,6,8];function ae(t,e={}){if(!(t>0&&Number.isFinite(t)))return 1;if(e.integer&&t<=1)return 1;const i=Math.pow(10,Math.floor(Math.log10(t))),r=t/i,a=e.integer&&i<10?re.filter(t=>2.5!==t):re,o=a.find(t=>t>=r-1e-9)??10;return te(o*i)}const oe=[1,1.2,1.25,1.5,2,2.5,3,4,5,6,7.5,8];function ne(t){if(!(t>0&&Number.isFinite(t)))return 0;const e=Xt(2-Math.floor(Math.log10(t)),0,12);let i=0;for(;i<e;){const e=t*Math.pow(10,i),r=Math.round(e);if(r>0&&Math.abs(e-r)<1e-6*e)break;i++}return i}const se=t=>Xt(Math.round(t)||5,2,9);function le(t,e){const i=se(e.lines),r=i-1,a=Qt(e.min)?e.min:void 0;let o=Qt(e.max)?e.max:void 0;void 0===a||void 0===o||o>a||(o=void 0);const n=(t,e)=>{const a=Array.from({length:i},(i,r)=>{const a=te(t+e*r);return Math.abs(a)<1e-9*Math.abs(e)?0:a});return{min:a[0],max:a[r],step:te(e),ticks:a}};if(void 0!==a&&void 0!==o)return n(a,(o-a)/r);const s=t.filter(Qt);let l=s.length?Math.min(...s):0,c=s.length?Math.max(...s):0;e.includeZero&&(l=Math.min(l,0),c=Math.max(c,0)),void 0!==a&&(l=a),void 0!==o&&(c=o);const d=Qt(e.minSpan)&&e.minSpan>0?e.minSpan:0,h=Math.max(d,c>l?0:1),p=c-l<h;if(p)if(void 0!==a||0===l)c=l+h;else if(void 0!==o||0===c)l=c-h;else{const t=(l+c)/2;l=t-h/2,c=t+h/2}const m=l,f=c,u=p?0:(c-l)*(Qt(e.pad)?Math.max(0,e.pad):.04);void 0===o&&0!==c&&(c=c<0?Math.min(0,c+u):c+u),void 0===a&&0!==l&&(l=l>0?Math.max(0,l-u):l-u);const y=ae((f-m)/r,e),g=Qt(e.decimals)?Xt(Math.round(e.decimals),0,12):0,v=t=>void 0!==o?(m-t.min)/(t.max-t.min):(t.max-f)/(t.max-t.min),x=t=>n(void 0!==o?c-t*r:l,t),b=t=>{if(v(t)<=Kt)return t;const i=Math.max(g,ne(t.step)),a=t=>ne(t.step)<=i&&!(void 0!==o?t.min<0&&m>=0:t.max>0&&f<=0);let n=t;const s=x(y);if(y<t.step&&v(s)>=-1e-9&&a(s)){if(v(s)<=Kt)return s;n=s}const d=(c-l)/r,h=x(function(t,e,i){if(e)return Math.max(1,Math.ceil(t-1e-9));const r=Math.pow(10,Math.floor(Math.log10(t)));return oe.map(t=>te(t*r)).find(e=>e>=t-1e-9*r&&ne(e)<=i)??te(10*r)}(d,e.integer,i));if(h.step<n.step&&v(h)<=Kt&&a(h))return h;const p=x(d);return e.integer||!a(p)?n:p};if(void 0!==o){const t=ae((c-l)/r,e);return b(l>=0&&c-t*r<0&&c>0?n(0,c/r):n(c-t*r,t))}if(void 0!==a){const t=ae((c-l)/r,e);return b(n(l,c<=0&&l+t*r>0&&l<0?-l/r:t))}const $=(t,e,i)=>{const a=Math.floor(te(e/t));return(a+r)*t>=i-1e-9*Math.abs(t)?a:void 0},_=(t,a)=>{for(let o=0;o<40;o++){const o=(a?$(t,l,c):void 0)??$(t,m,f);if(void 0!==o){const e=Array.from({length:i},(e,i)=>te((o+i)*t));return{min:e[0],max:e[r],step:t,ticks:e}}t=ae(1.000001*t,e)}},w=_(ae((c-l)/r,e),!0);if(w){const t=w.max-w.min;if(t-(f-m)<=Kt*t)return w;const e=_(y,!1);return e&&e.step<w.step&&ne(e.step)<=Math.max(g,ne(w.step))?e:w}const k=ae((c-l)/4,e),A=[te(Math.floor(te(l/k))*k),te(Math.ceil(te(c/k))*k)];return{min:A[0],max:A[1],step:k,ticks:A}}function ce(t,e=5.8){return t.length*e}const de=(t,e)=>`${t.toFixed(2)} ${e.toFixed(2)}`,he=t=>`M ${de(t.x,t.y)} L ${de(t.x,t.y)}`;function pe(t,e,i,r){return t?`${t} L ${de(i,r)} L ${de(e,r)} Z`:""}function me(t,e,i,r){const a=Math.max(0,e-t),o=Xt(.9*a,2,14);return{x:t+Math.max(0,(a-o)/2),y:Math.min(i,r),width:o,height:Math.max(1,Math.abs(r-i))}}function fe(t,e){if(!t.length)return-1;let i=0;for(let r=1;r<t.length&&!(t[r].t>e);r++)i=r;return i}function ue(t,e){let i=-1,r=Number.POSITIVE_INFINITY;return t.forEach((t,a)=>{const o=Math.abs(t.t-e);o<r&&(r=o,i=a)}),i}function ye(t){return String(t).replace(/[^a-z0-9_-]/gi,"-")}function ge(t,e,i){return`family-chart-${ye(t)}-${ye(e)}-${function(t){let e=2166136261;for(let i=0;i<t.length;i++)e^=t.charCodeAt(i),e=Math.imul(e,16777619);return(e>>>0).toString(36)}(`${t}\0${e}`)}-${i}`}function ve(t){return t.color||("secondary"===t.emphasis?"var(--family-chart-series-2, color-mix(in srgb, var(--primary-text-color) 55%, transparent))":"var(--family-chart-series-1, var(--family-active, var(--primary-color)))")}const xe=t=>"bar"===t.kind||"step"===t.curve;function be(t,e,i){const r=e.filter(t=>Qt(t.v));if(xe(t)){const e=r[fe(r,i)];return e&&i>=e.t&&i<e.t+t.intervalMs?e:void 0}const a=r[ue(r,i)],o=(t.maxGapMs??t.intervalMs??1/0)/2;if(!a||Math.abs(a.t-i)>o)return;const n=Math.abs(a.t-i);return e.some(t=>!Qt(t.v)&&Math.abs(t.t-i)<=n)?void 0:a}function $e(t){return e=>Gt(t,e,{year:!1})}function _e(t,e){const i=Math.max(120,Math.round(e.width)||0),r=ee(t.height),a=se(t.lines??5),o=t.timeLabel??$e(t.hass);for(const e of t.series)if(xe(e)&&!((e.intervalMs??0)>0))throw new Error(`Chart "${t.id}": series "${e.id}" needs intervalMs for a ${"bar"===e.kind?"bar":"step"} series.`);const n=t.series.map(t=>({series:t,points:[...t.points].filter(t=>Number.isFinite(t.t)).sort((t,e)=>t.t-e.t)})),s=Math.min(...n.map(({points:t})=>t.length?t[0].t:1/0)),l=Math.max(...n.map(({series:t,points:e})=>e.length?e[e.length-1].t+(xe(t)?t.intervalMs??0:0):-1/0)),c=Math.max(0,...t.series.map(t=>t.maxGapMs??0))/2||18e5,d=t.domain??(l===s&&Number.isFinite(s)?{start:s-c,end:l+c}:{start:s,end:l}),h=n.map(({series:t,points:e})=>({series:t,points:e.filter(e=>((t,e)=>xe(t)?e.t<d.end&&e.t+t.intervalMs>d.start:e.t>=d.start&&e.t<=d.end)(t,e))})),p=t.axes.secondary,m=t=>!!p&&"secondary"===t.axis,f=t=>h.filter(({series:e})=>m(e)===t).flatMap(({points:t})=>t.map(t=>t.v).filter(Qt)),u=f(!1),y=f(!0),g=!(d.end>d.start)||!u.length&&!y.length,v=le(u,{...t.axes.primary,lines:a}),x=p&&y.length?le(y,{...p,lines:a}):void 0,b=u.length>0||!x,$=b?v.ticks.map(e=>t.axes.primary.format(e,v)):[],_=x&&p?x.ticks.map(t=>p.format(t,x)):void 0,w=t=>Math.max(Vt,function(t){return Math.max(0,...t.map(t=>ce(t)))}(t)+12),k={left:_?w(_):qt,right:i-(g?Vt:b?w($):qt),top:Wt,bottom:r-Bt},A=ie(d.end>d.start?[d.start,d.end]:[0,1],[k.left,Math.max(k.left+1,k.right)]),M=ie([v.min,v.max],[k.bottom,k.top]),S=x?ie([x.min,x.max],[k.bottom,k.top]):void 0,C={width:i,height:r,plot:k,x:A,y:{primary:M,secondary:S},xPercent:t=>A(t)/i*100};if(g)return{...C,empty:!0,gridY:[],axisLabels:{primary:[]},ticks:[],series:[],extremes:[],selectable:[],intervalSelection:!1,hasGaps:!1};const E=!b&&x&&S?x.ticks.map(t=>S(t)):v.ticks.map(t=>M(t)),N={primary:b?v.ticks.map((t,e)=>({y:M(t),text:$[e]})):[],secondary:x&&S&&_?x.ticks.map((t,e)=>({y:S(t),text:_[e]})):void 0},z=function(t,e,i,r={}){const{start:a,end:o}=t;if(!(o>a))return Number.isFinite(a)?[a]:[];const n=o-a,s=r.charPx??5.8,l=r.gapPx??8,c=new Map,d=t=>{let e=c.get(t);return void 0===e&&(e=ce(i(t),s),c.set(t,e)),e},h=[...r.stepsMs??Yt].filter(t=>t>0).sort((t,e)=>t-e);for(const t of h){const i=Math.floor(n/t+1e-9)+1;if(i<2)continue;const r=t/n*e;if(r<l+s)continue;const c=Array.from({length:i},(e,i)=>a+i*t),h=c[i-1],p=Math.abs(o-h)<1,m=c.slice(1).every((t,e)=>(0===e?d(c[0]):d(c[e])/2)+(e+1===i-1&&p?d(t):d(t)/2)+l<=r),f=p||d(h)/2<=(o-h)/n*e+Vt;if(m&&f)return c}return d(a)+d(o)+l<=e?[a,o]:[a]}(d,k.right-k.left,o,{stepsMs:t.tickStepsMs}),P=z.map((t,e)=>({t:t,x:A(t),text:o(t),anchor:0===e?"start":e===z.length-1&&Math.abs(d.end-t)<1?"end":"middle"})),T=t=>m(t)&&S?S:M,F=(t,e)=>Xt(t(e),k.top,k.bottom),U=(t,e)=>Math.min(e.t+t.intervalMs,d.end),O=(t,e)=>xe(t)?A((Math.max(e.t,d.start)+U(t,e))/2):A(e.t);let D=!1;const H=[],I=h.map(({series:t,points:e})=>{const i=T(t),r=xe(t),a=function(t,e={}){const i=[];let r=[];const a=()=>{r.length&&i.push(r),r=[]};for(const i of t){if(!Qt(i.v)){a();continue}const t=r[r.length-1];if(t){const r=i.t-t.t,o=void 0!==e.intervalMs&&Math.abs(r-e.intervalMs)>=6e4,n=void 0!==e.maxGapMs&&r>e.maxGapMs;(o||n)&&a()}r.push(i)}return a(),i}(e,{intervalMs:r?t.intervalMs:void 0,maxGapMs:t.maxGapMs});(a.length>1||e.some(t=>!Qt(t.v)))&&(D=!0);const o=a.flat(),n={series:t,segments:[]},s=t=>A(Math.max(t.t,d.start));if("bar"===t.kind){const e=i(Xt(0,i.domain[0],i.domain[1])),r=ve(t);n.bars=o.map(a=>({...me(s(a),A(U(t,a)),F(i,a.v),e),point:a,fill:t.colorAt?.(a)||r}))}else{const e=t.area??"secondary"!==t.emphasis;if(n.segments=a.map(a=>{const o=a.map(e=>({x:s(e),y:F(i,e.v),x1:r?A(U(t,e)):s(e)})),n=r?function(t){return t.map((t,e)=>`${e?"L":"M"} ${de(t.x,t.y)} L ${de(t.x1,t.y)}`).join(" ")}(o):"smooth"===t.curve?function(t){if(!t.length)return"";if(1===t.length)return he(t[0]);let e=`M ${de(t[0].x,t[0].y)}`;for(let i=0;i<t.length-1;i++){const r=t[i],a=t[i+1],o=t[i-1]||r,n=t[i+2]||a,s=r.x+(a.x-o.x)/6,l=r.y+(a.y-o.y)/6,c=a.x-(n.x-r.x)/6,d=a.y-(n.y-r.y)/6;e+=` C ${de(s,l)}, ${de(c,d)}, ${de(a.x,a.y)}`}return e}(o):function(t){return 1===t.length?he(t[0]):t.map((t,e)=>`${e?"L":"M"} ${de(t.x,t.y)}`).join(" ")}(o),l=r?o[o.length-1].x1:o[o.length-1].x;return e?{line:n,area:pe(n,o[0].x,l,k.bottom)}:{line:n}}),t.colorAt){const e=t.colorBlend??(r?"hard":"smooth"),i=Math.max(1,k.right-k.left),a=t=>Xt((t-k.left)/i,0,1);n.stops=o.flatMap((i,n)=>{const l=t.colorAt?.(i);if("smooth"===e)return[{offset:a(A(i.t)),color:l}];const c=o[n+1],d=r?A(U(t,i)):c?A(c.t):s(i);return[{offset:a(s(i)),color:l},{offset:a(d),color:l}]})}}if(t.extremes){const{min:e,max:r}=function(t){let e,i;for(const r of t)Qt(r.v)&&((!e||r.v<e.v)&&(e=r),(!i||r.v>i.v)&&(i=r));return{min:e,max:i}}(o);if(e&&r&&e.v<r.v)for(const[a,o]of[[r,"H"],[e,"L"]]){const e=F(i,a.v),r="bar"===t.kind&&e>i(0);H.push({x:O(t,a),y:r?Math.min(e+9,k.bottom+9):Math.max(11,e-9),text:o})}}return n}),R=h.find(({series:t,points:e})=>!m(t)&&e.some(t=>Qt(t.v)))??h.find(({points:t})=>t.some(t=>Qt(t.v))),L=R?.series,j=(R?.points??[]).filter(t=>Qt(t.v)),G=xe(L),W=!Qt(e.selectedT),B=e.now;let q,V,Z,Y=!0;if(W)if(B<d.start||B>d.end)q=B<d.start?0:j.length-1,V=j[q].t,Z=O(L,j[q]);else if(G){q=fe(j,B);const t=j[q],e=B>=t.t&&B<t.t+L.intervalMs;V=e?B:t.t,Z=e?A(B):O(L,t)}else q=ue(j,B),V=j[q].t,Z=A(V);else{const t=e.selectedT;q=G?fe(j,t):ue(j,t),be(L,R?.points??[],t)===j[q]?(V=j[q].t,Z=O(L,j[q])):(Y=!1,V=t,Z=A(Xt(t,d.start,d.end)))}const J=Y?j[q]:void 0,K={t:V,x:Z,index:q,followsNow:W,values:h.map(({series:t,points:e})=>{let i;return i=t===L?J:be(t,e,xe(t)?V:J?.t??V),i?{series:t,point:i,y:F(T(t),i.v)}:{series:t}})},X=A(B),Q=!1!==t.nowMarker&&B>=d.start&&B<=d.end&&X>=k.left&&X<=k.right;return{...C,empty:!1,gridY:E,axisLabels:N,ticks:P,series:I,now:Q?{x:X}:void 0,extremes:H,selection:K,selectable:j,selectableSeries:L,intervalSelection:G,hasGaps:D}}const we="No data";class ke{constructor(t,e={}){this.host=t,this.widths=new Map,this.selections=new Map,this.previews=new Map,this.dragging=new Set,this.bodies=new Map,this.bodyIds=new WeakMap,this.refs=new Map,this.clockWanted=!1,this.connected=!1,this.fallbackWidth=e.fallbackWidth??360,this.clockMs=e.clockMs??3e4,t.addController(this)}width(t){return this.widths.get(t)??this.fallbackWidth}setWidth(t,e){const i=Math.round(e);i>0&&this.widths.get(t)!==i&&(this.widths.set(t,i),this.host.requestUpdate())}selected(t){return this.previews.get(t)??this.selections.get(t)}select(t,e){(this.previews.delete(t)||this.selections.get(t)!==e)&&(void 0===e?this.selections.delete(t):this.selections.set(t,e),this.host.requestUpdate())}preview(t,e){this.previews.get(t)!==e&&(void 0===e?this.previews.delete(t):this.previews.set(t,e),this.host.requestUpdate())}hostConnected(){this.connected=!0,this.clockWanted&&this.host.requestUpdate(),this.observer||"undefined"==typeof ResizeObserver||(this.observer=new ResizeObserver(t=>{for(const e of t){const t=this.bodyIds.get(e.target);t&&this.setWidth(t,e.contentRect.width)}}),this.bodies.forEach(t=>this.observer?.observe(t)))}hostUpdate(){this.clockWanted=!1}hostUpdated(){this.clockWanted&&this.connected&&void 0===this.clock?this.clock=setInterval(()=>this.host.requestUpdate(),this.clockMs):this.clockWanted&&this.connected||void 0===this.clock||(clearInterval(this.clock),this.clock=void 0)}hostDisconnected(){this.connected=!1,this.observer?.disconnect(),this.observer=void 0,void 0!==this.clock&&clearInterval(this.clock),this.clock=void 0,this.dragging.clear(),this.previews.clear()}bodyRef(t){let e=this.refs.get(t);return e||(e=e=>{const i=this.bodies.get(t);i!==e&&(i&&this.observer?.unobserve(i),e?(this.bodies.set(t,e),this.bodyIds.set(e,t),this.observer?.observe(e)):this.bodies.delete(t))},this.refs.set(t,e)),e}render(t){const e=t.id,i=t.selectionGroup??e,r=t.timeLabel??$e(t.hass),a=t.now??Date.now(),o=_e(t,{width:this.width(e),selectedT:this.selected(i),now:a}),[n,s]=o.x.domain;(o.now||!o.empty&&o.selection?.followsNow&&a>=n&&a<=s)&&(this.clockWanted=!0);const l=function(t,e={}){const i=t.selection;if(t.empty||!i)return V;const r=e.timeLabel??$e(e.hass);return W`<div class="family-chart-readout">
    <span>${r(i.t)}</span>
    ${i.values.map(({series:t,point:e})=>{if(!e)return W`<strong class="family-chart-no-value" data-series=${t.id} role="img" aria-label=${we}>–</strong>`;const i=("secondary"===t.emphasis||"secondary"===t.axis)&&!t.colorAt?ve(t):void 0;return W`<strong data-series=${t.id} style=${i?`color:${i}`:V}>${t.format(e.v)}</strong>`})}
    ${e.extra??V}
  </div>`}(o,{timeLabel:r}),c=function(t,e={}){return W`<div class="family-chart-legend">
    ${t.map(t=>W`<span data-series=${t.id}><i style=${`background:${e.swatches?.[t.id]||function(t){if(!t.colorAt)return ve(t);const e=[],i=t.points.filter(t=>"number"==typeof t.v&&Number.isFinite(t.v));for(const r of i.sort((t,e)=>t.v-e.v)){const i=t.colorAt(r);i&&!e.includes(i)&&e.push(i)}if(e.length<2)return e[0]||ve(t);return`linear-gradient(90deg, ${(e.length<=Ae?e:Array.from({length:Ae},(t,i)=>e[Math.round(i*(e.length-1)/(Ae-1))])).join(", ")})`}(t)}`}></i>${t.label}</span>`)}
    ${e.gapNote&&!1!==e.show?W`<span class="family-chart-gap-note">${e.gapNote}</span>`:V}
  </div>`}(t.series);return o.empty?{model:o,readout:l,legend:c,svg:(d=o.height,h={message:t.emptyMessage||"No data for this period"},p=this.bodyRef(e),W`<div
    class="family-chart-body family-chart-empty"
    style=${`min-height:${ee(d)}px`}
    ${p?Mt(p):V}
  >
    ${Pt(h)}
  </div>`)}:{model:o,readout:l,legend:c,svg:this.renderSvg(t,o,i,r)};var d,h,p}renderSvg(t,e,i,r){const{id:a}=t,{plot:o,width:n,height:s}=e,l=e.selection,{selectable:c,intervalSelection:d}=e,h=function(t,e){const i=t.selection;if(!i)return"";const r=i.values.length>1;return[e(i.t),...i.values.map(({series:t,point:e})=>{const i=e?t.format(e.v):we;return r?`${t.label} ${i}`:i})].join(" · ")}(e,r),p=(t,e)=>ge(a,t.id,e),m=(t,r=!1)=>{const a=t.currentTarget.getBoundingClientRect();if(!a.width||!c.length)return;const s=(t.clientX-a.left)/a.width*n,l=e.x.invert(Math.min(o.right,Math.max(o.left,s))),h=d?fe(c,l):ue(c,l);h<0||(r?this.preview(i,c[h].t):this.select(i,c[h].t))},f=t=>{this.dragging.delete(a);try{const e=t.currentTarget;e.hasPointerCapture?.(t.pointerId)&&e.releasePointerCapture(t.pointerId)}catch{}},u=t=>{"Enter"!==t.key&&" "!==t.key||t.stopPropagation()},y=e.series.map(({series:t,stops:e,segments:i})=>i.some(t=>t.area)||e?B`
        ${e?B`<linearGradient id=${p(t,"stroke")} gradientUnits="userSpaceOnUse"
              x1=${o.left} x2=${o.right} y1="0" y2="0">
              ${e.map(t=>B`<stop offset=${`${(100*t.offset).toFixed(2)}%`} stop-color=${t.color}></stop>`)}
            </linearGradient>`:V}
        ${i.some(t=>t.area)?B`<linearGradient id=${p(t,"area")} gradientUnits="userSpaceOnUse"
              x1="0" x2="0" y1=${o.top} y2=${o.bottom}>
              <stop offset="0%" stop-color="white" stop-opacity="0.28"></stop>
              <stop offset="100%" stop-color="white" stop-opacity="0.04"></stop>
            </linearGradient>
            <mask id=${p(t,"fade")} maskUnits="userSpaceOnUse" x="0" y="0" width=${n} height=${s}>
              <rect x="0" y="0" width=${n} height=${s} fill=${`url(#${p(t,"area")})`}></rect>
            </mask>`:V}
      `:V),g=new Set(l?.values.map(t=>t.point).filter(Boolean)),v=e.series.map(({series:t,segments:e,bars:i,stops:r})=>{if(i)return i.map(e=>B`<rect class=${"family-chart-bar"+(g.has(e.point)?" selected":"")}
            data-series=${t.id} x=${e.x} y=${e.y} width=${e.width} height=${e.height} rx="2.5"
            style=${`fill:${e.fill}`}></rect>`);const a="secondary"===t.emphasis?"secondary":"primary",o=((t,e)=>e?`url(#${p(t,"stroke")})`:ve(t))(t,r);return B`
        ${e.map(e=>e.area?B`<path class="family-chart-area" data-series=${t.id} d=${e.area}
                mask=${`url(#${p(t,"fade")})`}
                style=${`fill:${t.areaColor||o}`}></path>`:V)}
        ${"primary"===a?e.map(t=>B`<path class="family-chart-shadow" d=${t.line}></path>`):V}
        ${e.map(e=>B`<path class="family-chart-line" data-series=${t.id} data-emphasis=${a}
            d=${e.line} style=${`stroke:${o}`}></path>`)}
      `}),x=e.series.find(({series:t})=>"secondary"===t.axis)?.series,b=t.axes.secondary?.color??(x?ve(x):void 0);return W`<div class="family-chart-body" ${Mt(this.bodyRef(a))}>
      <svg
        class="family-chart"
        data-chart-id=${a}
        viewBox=${`0 0 ${n} ${s}`}
        role="slider"
        tabindex="0"
        aria-label=${t.label}
        aria-valuemin="0"
        aria-valuemax=${Math.max(0,c.length-1)}
        aria-valuenow=${l?.index??0}
        aria-valuetext=${l&&t.valueText?t.valueText(l):h}
        @keydown=${t=>{if(u(t),!l)return;const e=function(t,e,i){if("Escape"===t)return"now";if(i<=0)return;const r=Math.max(1,Math.round(i/8)),a=Xt(e,0,i-1);let o;switch(t){case"ArrowLeft":case"ArrowDown":o=a-1;break;case"ArrowRight":case"ArrowUp":o=a+1;break;case"PageDown":o=a-r;break;case"PageUp":o=a+r;break;case"Home":o=0;break;case"End":o=i-1;break;default:return}return Xt(o,0,i-1)}(t.key,l.index,c.length);void 0!==e&&("now"===e&&l.followsNow||(t.preventDefault(),this.select(i,"now"===e?void 0:c[e].t)))}}
        @keyup=${u}
        @pointerdown=${t=>{t.stopPropagation(),this.dragging.add(a);try{t.currentTarget.setPointerCapture(t.pointerId)}catch{}"touch"!==t.pointerType&&t.preventDefault(),m(t)}}
        @pointermove=${e=>{const i=this.dragging.has(a);("mouse"===e.pointerType&&"press"!==t.selectOn||i)&&("touch"!==e.pointerType&&e.preventDefault(),m(e,!i))}}
        @pointerup=${f}
        @pointercancel=${f}
        @pointerleave=${t=>{f(t),"mouse"===t.pointerType&&this.preview(i,void 0)}}
        @click=${t=>t.stopPropagation()}
      >
        <title>${h}</title>
        <desc>${t.description??`${c.length} points from ${r(e.x.domain[0])} to ${r(e.x.domain[1])}.`}</desc>
        <defs>${y}</defs>
        ${e.gridY.map(t=>B`<line class="family-chart-grid" x1=${o.left} x2=${o.right} y1=${t} y2=${t}></line>`)}
        ${e.ticks.map(t=>B`<line class="family-chart-time-line" x1=${t.x} x2=${t.x} y1=${o.top} y2=${o.bottom}></line>`)}
        ${v}
        ${e.now?B`<line class="family-chart-now" x1=${e.now.x} x2=${e.now.x} y1=${o.top} y2=${o.bottom}></line>`:V}
        ${e.extremes.map(t=>B`<text class="family-chart-extreme" x=${t.x} y=${t.y}>${t.text}</text>`)}
        ${l?B`<line class="family-chart-cursor" x1=${l.x} x2=${l.x} y1=${o.top} y2=${o.bottom}></line>
            ${l.values.map(t=>void 0===t.y?V:B`<g class="family-chart-dot" data-series=${t.series.id} transform=${`translate(${l.x.toFixed(2)} ${t.y.toFixed(2)})`}>
                    <circle class="family-chart-dot-halo" r="8.5"></circle>
                    <circle class="family-chart-dot-ring" r="7"></circle>
                    <circle class="family-chart-dot-core" r="3.5"></circle>
                  </g>`)}`:V}
        ${e.axisLabels.primary.map(e=>B`<text class="family-chart-axis" x=${n-2} y=${e.y}
            style=${t.axes.primary.color?`fill:${t.axes.primary.color}`:V}>${e.text}</text>`)}
        ${(e.axisLabels.secondary??[]).map(t=>B`<text class="family-chart-axis family-chart-axis-left" x="2" y=${t.y}
            style=${b?`fill:${b}`:V}>${t.text}</text>`)}
        ${e.ticks.map(t=>B`<text class=${"family-chart-time"+("start"===t.anchor?" family-chart-time-start":"end"===t.anchor?" family-chart-time-end":"")}
            x=${t.x} y=${s-6}>${t.text}</text>`)}
      </svg>
    </div>`}}const Ae=6;const Me=n`
  .family-chart-frame {
    position: relative;
    display: grid;
    gap: 5px;
    width: 100%;
    min-width: 0;
    box-sizing: border-box;
    padding: 7px 8px 6px;
    border-radius: var(--family-chart-radius, var(--tile-border-radius, 12px));
    background: var(
      --family-chart-background,
      color-mix(in srgb, var(--family-surface, var(--card-background-color, #fff)) 94%, var(--primary-color, #03a9f4))
    );
    color: var(--secondary-text-color);
    overflow: hidden;
  }
  /* On a narrow card the readout moves to its own row instead of squeezing the title. */
  .family-chart-head {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: start;
    gap: 4px 8px;
    min-width: 0;
    min-height: 18px;
  }
  /* The title may hold a launcher button: it wraps rather than truncating, and nothing
     clips a focus ring. */
  .family-chart-title {
    min-width: 0;
    max-width: 100%;
    overflow-wrap: anywhere;
    color: var(--primary-text-color);
    font-size: 12px;
    font-weight: 700;
    line-height: 1.2;
  }
  .family-chart-readout {
    flex: 0 1 auto;
    display: inline-flex;
    flex-wrap: wrap;
    align-items: baseline;
    justify-content: flex-end;
    gap: 4px 8px;
    max-width: 100%;
    min-width: 0;
    margin-inline-start: auto;
    color: var(--secondary-text-color);
    font-size: 12px;
    font-weight: 500;
    line-height: 1.4;
    text-align: right;
  }
  .family-chart-readout span {
    min-width: 0;
    max-width: 100%;
    overflow-wrap: anywhere;
  }
  .family-chart-readout strong {
    flex-shrink: 0;
    color: var(--primary-text-color);
    font-size: 14px;
    font-weight: 600;
    line-height: 1;
    white-space: nowrap;
    font-variant-numeric: tabular-nums;
  }
  .family-chart-readout .family-chart-no-value {
    color: var(--secondary-text-color);
  }
  .family-chart-legend {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 4px 12px;
    color: var(--secondary-text-color);
    font-size: 11px;
    line-height: 1.4;
  }
  .family-chart-legend span {
    display: inline-flex;
    align-items: center;
    gap: 5px;
  }
  .family-chart-legend i {
    display: inline-block;
    width: 14px;
    height: 3px;
    border-radius: 999px;
  }
  .family-chart-legend .family-chart-gap-note {
    margin-inline-start: auto;
    opacity: 0.75;
  }
  .family-chart-body {
    position: relative;
    width: 100%;
    min-width: 0;
  }
  .family-chart-empty {
    display: grid;
    align-content: center;
  }
  .family-chart {
    display: block;
    width: 100%;
    height: auto;
    min-width: 0;
    /* Marks are pinned inside the plot by the layout; this only lets the selection dot's
       halo pass the 8px edge margin. */
    overflow: visible;
    touch-action: pan-y;
    user-select: none;
    -webkit-user-select: none;
    -webkit-tap-highlight-color: transparent;
  }
  @media (hover: hover) {
    .family-chart {
      cursor: pointer;
    }
  }
  .family-chart:focus {
    outline: none;
  }
  .family-chart:focus-visible {
    outline: 3px solid var(--primary-color);
    outline-offset: -3px;
    border-radius: 8px;
  }
  .family-chart text {
    fill: var(--family-chart-text, var(--secondary-text-color));
    font-family: var(--family-font);
    font-size: 11px;
    font-weight: 600;
    text-anchor: middle;
    dominant-baseline: middle;
    pointer-events: none;
    user-select: none;
    -webkit-user-select: none;
  }
  .family-chart .family-chart-axis {
    text-anchor: end;
  }
  .family-chart .family-chart-axis-left {
    text-anchor: start;
    opacity: 0.9;
  }
  .family-chart .family-chart-time-start {
    text-anchor: start;
  }
  .family-chart .family-chart-time-end {
    text-anchor: end;
  }
  .family-chart .family-chart-extreme {
    fill: var(--primary-text-color);
    font-weight: 700;
  }
  .family-chart-grid,
  .family-chart-time-line {
    stroke: var(--family-chart-grid, color-mix(in srgb, var(--primary-text-color) 13%, transparent));
    stroke-width: 1;
    vector-effect: non-scaling-stroke;
  }
  .family-chart-time-line {
    stroke-dasharray: 3 3;
  }
  .family-chart-area {
    stroke: none;
  }
  .family-chart-shadow,
  .family-chart-line {
    fill: none;
    stroke-linecap: round;
    stroke-linejoin: round;
    vector-effect: non-scaling-stroke;
  }
  .family-chart-shadow {
    stroke: var(--family-chart-shadow, rgba(0, 0, 0, 0.24));
    stroke-width: 7;
  }
  .family-chart-line {
    stroke-width: 4;
  }
  .family-chart-line[data-emphasis="secondary"] {
    stroke-width: 2;
    opacity: 0.9;
  }
  .family-chart-bar {
    opacity: 0.95;
    transition: opacity 120ms ease;
  }
  .family-chart-bar.selected {
    opacity: 1;
    stroke: color-mix(in srgb, var(--primary-text-color) 72%, transparent);
    stroke-width: 1;
    vector-effect: non-scaling-stroke;
  }
  .family-chart-now {
    stroke: var(--family-chart-now, var(--family-active, var(--primary-color)));
    stroke-width: 1.5;
    opacity: 0.62;
    vector-effect: non-scaling-stroke;
  }
  .family-chart-cursor {
    stroke: color-mix(in srgb, var(--primary-text-color) 36%, transparent);
    stroke-width: 1;
    vector-effect: non-scaling-stroke;
  }
  .family-chart-dot {
    pointer-events: none;
  }
  .family-chart-dot-halo {
    fill: none;
    stroke: color-mix(in srgb, var(--primary-text-color) 18%, transparent);
    stroke-width: 2;
  }
  .family-chart-dot-ring {
    fill: color-mix(in srgb, var(--family-surface, var(--card-background-color, #000)) 60%, transparent);
    stroke: color-mix(in srgb, var(--primary-text-color) 54%, transparent);
    stroke-width: 1;
  }
  .family-chart-dot-core {
    fill: var(--primary-text-color);
    stroke: color-mix(in srgb, var(--family-surface, var(--card-background-color, #000)) 40%, transparent);
    stroke-width: 1;
  }
  .family-chart-skeleton {
    border-radius: 10px;
    background: linear-gradient(
      100deg,
      color-mix(in srgb, var(--primary-text-color) 4%, transparent) 30%,
      color-mix(in srgb, var(--primary-text-color) 8%, transparent) 50%,
      color-mix(in srgb, var(--primary-text-color) 4%, transparent) 70%
    );
    background-size: 200% 100%;
    animation: family-chart-shimmer 1.6s ease-in-out infinite;
  }
  @keyframes family-chart-shimmer {
    0% {
      background-position: 130% 0;
    }
    100% {
      background-position: -30% 0;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .family-chart-bar {
      transition: none;
    }
    .family-chart-skeleton {
      animation: none;
      background: color-mix(in srgb, var(--primary-text-color) 6%, transparent);
    }
  }
`,Se="sensor.real_electricity_price_hourly_prices_yesterday",Ce="sensor.real_electricity_price_hourly_prices_today",Ee="sensor.real_electricity_price_hourly_prices_tomorrow",Ne="sensor.real_electricity_price_current_price",ze="number.real_electricity_price_acceptable_price",Pe="€/kWh",Te=36e5,Fe=[6,8,12,16,24,48],Ue={fill_color:["rgba(56, 199, 243, 0.18)"],marker_color:["#38c7f3"],grid_color:["rgba(255, 255, 255, 0.14)","var(--divider-color, rgba(127, 127, 127, 0.25))"],chart_background:["rgba(33, 52, 62, 0.88)","color-mix(in srgb, var(--card-background-color, #303446) 94%, var(--primary-color, #c39ce3))"]};function Oe(t,e,i){const r=Number(t);if(Number.isFinite(r))return Math.max(e,Math.min(i,r))}function De(t){if("number"==typeof t&&Number.isFinite(t))return t;if("string"==typeof t){const e=Number(t);if(Number.isFinite(e))return e;const i=new Date(t).getTime();if(Number.isFinite(i))return i}}function He(...t){for(const e of t){if(null==e||""===e)continue;const t=Number(e);if(Number.isFinite(t))return t}}function Ie(t){const e=t?.attributes?.hourly_prices;return Array.isArray(e)?e.reduce((t,e)=>{const i=e,r=Array.isArray(i)?De(i[0]):De(i.start_time)??De(i.x),a=Array.isArray(i)?He(i[1]):He(i.actual_price,i.price,i.y,i.nord_pool_price);return void 0===r||void 0===a||t.push({timestamp:r,value:a,sourceTimestamp:r}),t},[]).sort((t,e)=>t.timestamp-e.timestamp):[]}function Re(t){return"line"===(t.chart_type||t.graph_type)?"line":"bar"}function Le(t){return"click"===t.selector_mode?"click":"hover"}function je(t,e){const i=t[e],r="string"==typeof i?i.trim():"",a=t=>t.replace(/\s+/g,"").toLowerCase();if(r&&!Ue[e].some(t=>a(t)===a(r)))return r}function Ge(t){return Oe(t.height,120,360)||190}function We(t){return Math.round(Oe(t.horizontal_lines,2,9)||5)}function Be(t){return Math.round(Oe(t.price_decimals,0,6)??4)}function qe(t){return Math.round(Oe(t.axis_decimals,0,4)??2)}function Ve(t){return t.unit||Pe}function Ze(t){return Ve(t).split("/")[0].trim()||void 0}function Ye(t,e,i){return new Intl.DateTimeFormat("en-US",{...i,timeZone:e}).formatToParts(new Date(t)).reduce((t,e)=>("literal"!==e.type&&(t[e.type]=e.value),t),{})}function Je(t,e){const i=Ye(t,e,{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",hourCycle:"h23"}),r=Number(i.year),a=Number(i.month),o=Number(i.day),n=Number(i.hour),s=Number(i.minute),l=Number(i.second);return[r,a,o,n,s,l].every(Number.isFinite)?Date.UTC(r,a-1,o,n,s,l)-t:0}function Ke(t){const e=function(t){return Ot(t)}(t);if(e)try{const t=Ye(Date.now(),e,{year:"numeric",month:"2-digit",day:"2-digit"}),i=Number(t.year),r=Number(t.month),a=Number(t.day);if(![i,r,a].every(Number.isFinite))return;const o=Date.UTC(i,r-1,a,0,0,0,0),n=Je(o,e);return o-Je(o-n,e)}catch{return}}function Xe(t){const e={yesterday_entity:Se,today_entity:Ce,tomorrow_entity:Ee,current_price_entity:Ne,cheap_price_entity:ze,chart_type:"bar",selector_mode:"hover",height:190,horizontal_lines:5,price_decimals:4,axis_decimals:2,unit:Pe,show_current_marker:!0,show_extremes:!0,show_stats:!0,card_background:"var(--ha-card-background, var(--card-background-color, #1f1f1f))",...t};for(const t of Object.keys(Ue)){const i=je(e,t);i?e[t]=i:delete e[t]}return e}class Qe extends ct{constructor(){super(...arguments),this._charts=new ke(this)}static async getConfigElement(){return await customElements.whenDefined("real-electricity-price-card-editor"),document.createElement("real-electricity-price-card-editor")}static getStubConfig(){return{type:"custom:real-electricity-price-card",yesterday_entity:Se,today_entity:Ce,tomorrow_entity:Ee,current_price_entity:Ne,chart_type:"bar"}}setConfig(t){this._config=Xe(t||{})}getCardSize(){const t=Ge(this._config||{});return Math.max(3,Math.ceil((t+150)/50))}render(){if(!this._config)return W``;const t=Xe(this._config),e=function(t){const e=new Date;e.setHours(0,0,0,0);const i=Ke(t)??e.getTime();return{start:i,end:i+1728e5}}(this.hass),i=function(t,e,i){const r=e.yesterday_entity||Se,a=e.today_entity||Ce,o=e.tomorrow_entity||Ee,n=t?.states[r],s=t?.states[a],l=t?.states[o],c=[...Ie(n),...Ie(s),...Ie(l)].reduce((t,e)=>(e.timestamp>=i.start&&e.timestamp<i.end&&t.set(e.timestamp,e),t),new Map),d=[s?void 0:a,l?void 0:o].filter(t=>Boolean(t));return{points:[...c.values()].sort((t,e)=>t.timestamp-e.timestamp),moreInfoEntityId:s?a:l?o:void 0,missingEntityIds:d}}(this.hass,t,e);if(!i.points.length)return this._renderUnavailable(i.missingEntityIds);const r="string"==typeof t.name?t.name.trim():"",a=i.points,o=a.reduce((t,e)=>e.value<t.value?e:t,a[0]),n=a.reduce((t,e)=>e.value>t.value?e:t,a[0]),s=function(t,e){const i=e.current_price_entity||Ne,r=t?.states[i]?.state,a=Number(r);return Number.isFinite(a)?a:void 0}(this.hass,t),l=i.moreInfoEntityId||t.current_price_entity||Ne,c=this._renderChart(t,a,e);return W`
      <ha-card class="price-card" style=${this._cardStyle(t)}>
        <div class="price-content">
          ${r?W`
            <div class="price-head">
              <button type="button" class="price-title family-title" aria-haspopup="dialog" aria-label=${`${r}: details`} title="Details" @click=${()=>this._openMoreInfo(l)}>
                <span>${r}</span>
                <ha-icon .icon=${pt} aria-hidden="true"></ha-icon>
              </button>
            </div>
          `:V}

          ${!1===t.show_stats?V:this._renderStats(t,a,o,n,s)}

          ${c}
        </div>
      </ha-card>
    `}_cardStyle(t){return[`--rep-card-bg:${t.card_background}`,t.chart_background&&`--family-chart-background:${t.chart_background}`,t.grid_color&&`--family-chart-grid:${t.grid_color}`,t.marker_color&&`--family-chart-now:${t.marker_color}`].filter(Boolean).join(";")}_renderUnavailable(t){const e=t.length>=2,i=t.length?` Missing: ${t.join(", ")}`:"";return W`
      <ha-card class="price-card">
        <div class="price-content">
          ${zt(e?{tone:"error",title:"Price entities not found",message:i.trim()}:{tone:"neutral",title:Ft,message:`No hourly prices are available yet.${i}`})}
        </div>
      </ha-card>
    `}_renderStats(t,e,i,r,a){return W`
      <div class="price-stats family-telemetry">
        ${this._renderStat("Now",a,t)}
        ${this._renderStat("Low",i.value,t)}
        ${this._renderStat("Average",function(t){if(t.length)return t.reduce((t,e)=>t+e.value,0)/t.length}(e),t)}
        ${this._renderStat("High",r.value,t)}
      </div>
    `}_renderStat(t,e,i){return W`
      <div class="price-stat family-telemetry-cell">
        <span class="family-telemetry-label">${t}</span>
        ${function(t){return void 0!==Ht(t)}(e)?W`<span class="family-telemetry-value">${Lt(this.hass,e,{digits:Be(i)})} <span class="price-unit">${Ve(i)}</span></span>`:W`<span class="family-telemetry-value family-unavailable">${Ft}</span>`}
      </div>
    `}_renderChart(t,e,i){const r=Date.now(),a=function(t,e){const i=Number(e.cheap_threshold);if(Number.isFinite(i))return i;const r=e.cheap_price_entity||ze;return He(t?.states[r]?.state)}(this.hass,t),o=e.map(t=>({t:t.timestamp,v:t.value,data:t})),n=this._charts.render({id:"price",label:"Electricity price interval",description:`${o.length} available hourly electricity price points in a fixed 48-hour chart window.`,series:[{id:"price",label:"Price",kind:Re(t),curve:"step",intervalMs:Te,points:o,colorAt:e=>function(t,e,i,r){const a=t.sourceTimestamp??t.timestamp,o=r>=a&&r<a+Te,n=a+Te<=r,s=void 0!==i&&t.value<=i;return o&&s?e.cheap_current_color||"#22c55e":o?e.current_hour_color||"#3b82f6":n&&s?e.cheap_past_color||"#bbf7d0":n?e.past_color||"#bfdbfe":s?e.cheap_color||"#86efac":e.future_color||"#93c5fd"}(e.data,t,a,r),areaColor:t.fill_color,extremes:!1!==t.show_extremes,format:e=>function(t,e,i){return Lt(t,e,{digits:Be(i),unit:Ve(i)})}(this.hass,e,t)}],domain:i,height:Ge(t),lines:We(t),axes:{primary:{min:He(t.min),max:He(t.max),includeZero:!0,decimals:qe(t),format:(e,i)=>function(t,e,i,r){return Lt(t,e,{digits:Math.max(qe(r),ne(i)),unit:Ze(r)})}(this.hass,e,i.step,t)}},hass:this.hass,timeLabel:t=>function(t,e){return Gt(t,e,{year:!1})}(this.hass,t),tickStepsMs:Fe.map(t=>t*Te),now:r,nowMarker:!1!==t.show_current_marker,selectOn:"click"===Le(t)?"press":"hover"});return function(t){const e=null!=t.title&&t.title!==V&&""!==t.title,i=null!=t.readout&&t.readout!==V;return W`<div class="family-chart-frame ${t.className||""}">
    ${e||i?W`<div class="family-chart-head">
          ${e?W`<div class="family-chart-title">${t.title}</div>`:V}
          ${i?t.readout:V}
        </div>`:V}
    ${t.legend??V}
    ${t.above??V}
    ${t.body}
  </div>`}({readout:n.readout,body:n.svg})}_openMoreInfo(t){t&&function(t,e){t.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:e},bubbles:!0,composed:!0}))}(this,t)}}Qe.properties={hass:{attribute:!1},_config:{state:!0}},Qe.styles=[ht,mt,Tt,ft,ut,Me,n`
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

    .price-card { container-type:inline-size; }
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
  `];class ti extends ct{constructor(){super(...arguments),this._config=Qe.getStubConfig()}setConfig(t){this._config=Xe(t||{})}render(){const t=Xe(this._config);return W`
      <div class="editor">
        ${this._textField("Name (optional)","name",t.name||"")}
        ${this._textField("Yesterday Prices Entity","yesterday_entity",t.yesterday_entity||Se)}
        <div class="grid">
          ${this._textField("Today Prices Entity","today_entity",t.today_entity||Ce)}
          ${this._textField("Tomorrow Prices Entity","tomorrow_entity",t.tomorrow_entity||Ee)}
        </div>
        ${this._textField("Current Price Entity","current_price_entity",t.current_price_entity||Ne)}
        ${this._textField("Acceptable Price Entity","cheap_price_entity",t.cheap_price_entity||ze)}
        <label>
          <span>Chart Type</span>
          <select .value=${Re(t)} @change=${t=>this._setValue("chart_type",t.target.value)}>
            <option value="bar">Bars</option>
            <option value="line">Step line</option>
          </select>
        </label>
        <label>
          <span>Selector Mode</span>
          <select .value=${Le(t)} @change=${t=>this._setValue("selector_mode",t.target.value)}>
            <option value="hover">Hover</option>
            <option value="click">Click / tap</option>
          </select>
        </label>
        <div class="grid">
          ${this._numberField("Height","height",Ge(t),120,360)}
          ${this._numberField("Horizontal Lines","horizontal_lines",We(t),2,9)}
          ${this._numberField("Price Decimals","price_decimals",Be(t),0,6)}
          ${this._numberField("Axis Decimals","axis_decimals",qe(t),0,4)}
        </div>
        ${this._textField("Unit","unit",t.unit||Pe)}
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
        </div>
        ${this._textField("Area Fill Color","fill_color",t.fill_color||"","Follows price colours")}
        ${this._textField("Marker Color","marker_color",t.marker_color||"","Follows theme")}
        ${this._textField("Grid Color","grid_color",t.grid_color||"","Follows theme")}
        ${this._textField("Chart Background","chart_background",t.chart_background||"","Follows theme")}
      </div>
    `}_textField(t,e,i,r){return W`
      <label>
        <span>${t}</span>
        <input
          type="text"
          placeholder=${r??V}
          .value=${String(i??"")}
          @input=${t=>this._setValue(e,t.target.value||void 0)}
        />
      </label>
    `}_numberField(t,e,i,r,a,o=!1){return W`
      <label>
        <span>${t}</span>
        <input
          type="number"
          min=${r??V}
          max=${a??V}
          .value=${String(i??"")}
          @input=${t=>{const i=t.target.value,r=Number(i);this._setValue(e,o&&""===i?void 0:Number.isFinite(r)?r:void 0)}}
        />
      </label>
    `}_colorField(t,e,i){return W`
      <label>
        <span>${t}</span>
        <input
          type="color"
          .value=${i}
          @input=${t=>this._setValue(e,t.target.value)}
        />
      </label>
    `}_checkbox(t,e,i){return W`
      <label class="checkbox">
        <input
          type="checkbox"
          .checked=${i}
          @change=${t=>this._setValue(e,t.target.checked)}
        />
        <span>${t}</span>
      </label>
    `}_setValue(t,e){const i={...this._config};var r,a;void 0===e||""===e?delete i[t]:i[t]=e,this._config=i,r="config-changed",a={config:i},this.dispatchEvent(new CustomEvent(r,{detail:a,bubbles:!0,composed:!0}))}}ti.properties={hass:{attribute:!1},_config:{state:!0}},ti.styles=n`
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
  `,customElements.get("real-electricity-price-card")||customElements.define("real-electricity-price-card",Qe),customElements.get("real-electricity-price-card-editor")||customElements.define("real-electricity-price-card-editor",ti),window.customCards=window.customCards||[],window.customCards.push({type:"real-electricity-price-card",name:"Real Electricity Price Card",description:"Interactive electricity price chart for real-electricity-price",preview:!1,version:"0.3.0"});
