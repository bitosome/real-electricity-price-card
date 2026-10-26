/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),r=new WeakMap;let o=class{constructor(t,e,r){if(this._$cssResult$=!0,r!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=r.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&r.set(i,t))}return t}toString(){return this.cssText}};const a=t=>new o("string"==typeof t?t:t+"",void 0,i),n=(t,...e)=>{const r=1===t.length?t[0]:e.reduce((e,i,r)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[r+1],t[0]);return new o(r,t,i)},s=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return a(e)})(t):t,{is:l,defineProperty:c,getOwnPropertyDescriptor:p,getOwnPropertyNames:d,getOwnPropertySymbols:h,getPrototypeOf:m}=Object,u=globalThis,f=u.trustedTypes,g=f?f.emptyScript:"",y=u.reactiveElementPolyfillSupport,x=(t,e)=>t,b={toAttribute(t,e){switch(e){case Boolean:t=t?g:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},v=(t,e)=>!l(t,e),_={attribute:!0,type:String,converter:b,reflect:!1,useDefault:!1,hasChanged:v};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let $=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=_){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(t,i,e);void 0!==r&&c(this.prototype,t,r)}}static getPropertyDescriptor(t,e,i){const{get:r,set:o}=p(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:r,set(e){const a=r?.call(this);o?.call(this,e),this.requestUpdate(t,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??_}static _$Ei(){if(this.hasOwnProperty(x("elementProperties")))return;const t=m(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(x("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(x("properties"))){const t=this.properties,e=[...d(t),...h(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(s(t))}else void 0!==t&&e.push(s(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,r)=>{if(e)i.adoptedStyleSheets=r.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of r){const r=document.createElement("style"),o=t.litNonce;void 0!==o&&r.setAttribute("nonce",o),r.textContent=e.cssText,i.appendChild(r)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),r=this.constructor._$Eu(t,i);if(void 0!==r&&!0===i.reflect){const o=(void 0!==i.converter?.toAttribute?i.converter:b).toAttribute(e,i.type);this._$Em=t,null==o?this.removeAttribute(r):this.setAttribute(r,o),this._$Em=null}}_$AK(t,e){const i=this.constructor,r=i._$Eh.get(t);if(void 0!==r&&this._$Em!==r){const t=i.getPropertyOptions(r),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:b;this._$Em=r;const a=o.fromAttribute(e,t.type);this[r]=a??this._$Ej?.get(r)??a,this._$Em=null}}requestUpdate(t,e,i,r=!1,o){if(void 0!==t){const a=this.constructor;if(!1===r&&(o=this[t]),i??=a.getPropertyOptions(t),!((i.hasChanged??v)(o,e)||i.useDefault&&i.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(a._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:r,wrapped:o},a){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,a??e??this[t]),!0!==o||void 0!==a)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===r&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,r=this[e];!0!==t||this._$AL.has(e)||void 0===r||this.C(e,void 0,i,r)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};$.elementStyles=[],$.shadowRootOptions={mode:"open"},$[x("elementProperties")]=new Map,$[x("finalized")]=new Map,y?.({ReactiveElement:$}),(u.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const w=globalThis,A=t=>t,k=w.trustedTypes,E=k?k.createPolicy("lit-html",{createHTML:t=>t}):void 0,C="$lit$",S=`lit$${Math.random().toFixed(9).slice(2)}$`,M="?"+S,z=`<${M}>`,P=document,N=()=>P.createComment(""),T=t=>null===t||"object"!=typeof t&&"function"!=typeof t,F=Array.isArray,U="[ \t\n\f\r]",H=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,O=/-->/g,R=/>/g,D=RegExp(`>|${U}(?:([^\\s"'>=/]+)(${U}*=${U}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),I=/'/g,L=/"/g,j=/^(?:script|style|textarea|title)$/i,B=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),V=B(1),W=B(2),q=Symbol.for("lit-noChange"),G=Symbol.for("lit-nothing"),Z=new WeakMap,K=P.createTreeWalker(P,129);function Y(t,e){if(!F(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(e):e}const J=(t,e)=>{const i=t.length-1,r=[];let o,a=2===e?"<svg>":3===e?"<math>":"",n=H;for(let e=0;e<i;e++){const i=t[e];let s,l,c=-1,p=0;for(;p<i.length&&(n.lastIndex=p,l=n.exec(i),null!==l);)p=n.lastIndex,n===H?"!--"===l[1]?n=O:void 0!==l[1]?n=R:void 0!==l[2]?(j.test(l[2])&&(o=RegExp("</"+l[2],"g")),n=D):void 0!==l[3]&&(n=D):n===D?">"===l[0]?(n=o??H,c=-1):void 0===l[1]?c=-2:(c=n.lastIndex-l[2].length,s=l[1],n=void 0===l[3]?D:'"'===l[3]?L:I):n===L||n===I?n=D:n===O||n===R?n=H:(n=D,o=void 0);const d=n===D&&t[e+1].startsWith("/>")?" ":"";a+=n===H?i+z:c>=0?(r.push(s),i.slice(0,c)+C+i.slice(c)+S+d):i+S+(-2===c?e:d)}return[Y(t,a+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),r]};class X{constructor({strings:t,_$litType$:e},i){let r;this.parts=[];let o=0,a=0;const n=t.length-1,s=this.parts,[l,c]=J(t,e);if(this.el=X.createElement(l,i),K.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(r=K.nextNode())&&s.length<n;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(C)){const e=c[a++],i=r.getAttribute(t).split(S),n=/([.?@])?(.*)/.exec(e);s.push({type:1,index:o,name:n[2],strings:i,ctor:"."===n[1]?rt:"?"===n[1]?ot:"@"===n[1]?at:it}),r.removeAttribute(t)}else t.startsWith(S)&&(s.push({type:6,index:o}),r.removeAttribute(t));if(j.test(r.tagName)){const t=r.textContent.split(S),e=t.length-1;if(e>0){r.textContent=k?k.emptyScript:"";for(let i=0;i<e;i++)r.append(t[i],N()),K.nextNode(),s.push({type:2,index:++o});r.append(t[e],N())}}}else if(8===r.nodeType)if(r.data===M)s.push({type:2,index:o});else{let t=-1;for(;-1!==(t=r.data.indexOf(S,t+1));)s.push({type:7,index:o}),t+=S.length-1}o++}}static createElement(t,e){const i=P.createElement("template");return i.innerHTML=t,i}}function Q(t,e,i=t,r){if(e===q)return e;let o=void 0!==r?i._$Co?.[r]:i._$Cl;const a=T(e)?void 0:e._$litDirective$;return o?.constructor!==a&&(o?._$AO?.(!1),void 0===a?o=void 0:(o=new a(t),o._$AT(t,i,r)),void 0!==r?(i._$Co??=[])[r]=o:i._$Cl=o),void 0!==o&&(e=Q(t,o._$AS(t,e.values),o,r)),e}class tt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,r=(t?.creationScope??P).importNode(e,!0);K.currentNode=r;let o=K.nextNode(),a=0,n=0,s=i[0];for(;void 0!==s;){if(a===s.index){let e;2===s.type?e=new et(o,o.nextSibling,this,t):1===s.type?e=new s.ctor(o,s.name,s.strings,this,t):6===s.type&&(e=new nt(o,this,t)),this._$AV.push(e),s=i[++n]}a!==s?.index&&(o=K.nextNode(),a++)}return K.currentNode=P,r}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class et{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,r){this.type=2,this._$AH=G,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Q(this,t,e),T(t)?t===G||null==t||""===t?(this._$AH!==G&&this._$AR(),this._$AH=G):t!==this._$AH&&t!==q&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>F(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==G&&T(this._$AH)?this._$AA.nextSibling.data=t:this.T(P.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,r="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=X.createElement(Y(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===r)this._$AH.p(e);else{const t=new tt(r,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=Z.get(t.strings);return void 0===e&&Z.set(t.strings,e=new X(t)),e}k(t){F(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,r=0;for(const o of t)r===e.length?e.push(i=new et(this.O(N()),this.O(N()),this,this.options)):i=e[r],i._$AI(o),r++;r<e.length&&(this._$AR(i&&i._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=A(t).nextSibling;A(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class it{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,r,o){this.type=1,this._$AH=G,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=G}_$AI(t,e=this,i,r){const o=this.strings;let a=!1;if(void 0===o)t=Q(this,t,e,0),a=!T(t)||t!==this._$AH&&t!==q,a&&(this._$AH=t);else{const r=t;let n,s;for(t=o[0],n=0;n<o.length-1;n++)s=Q(this,r[i+n],e,n),s===q&&(s=this._$AH[n]),a||=!T(s)||s!==this._$AH[n],s===G?t=G:t!==G&&(t+=(s??"")+o[n+1]),this._$AH[n]=s}a&&!r&&this.j(t)}j(t){t===G?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class rt extends it{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===G?void 0:t}}class ot extends it{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==G)}}class at extends it{constructor(t,e,i,r,o){super(t,e,i,r,o),this.type=5}_$AI(t,e=this){if((t=Q(this,t,e,0)??G)===q)return;const i=this._$AH,r=t===G&&i!==G||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==G&&(i===G||r);r&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class nt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Q(this,t)}}const st=w.litHtmlPolyfillSupport;st?.(X,et),(w.litHtmlVersions??=[]).push("3.3.3");const lt=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class ct extends ${constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const r=i?.renderBefore??e;let o=r._$litPart$;if(void 0===o){const t=i?.renderBefore??null;r._$litPart$=o=new et(e.insertBefore(N(),t),t,void 0,i??{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return q}}ct._$litElement$=!0,ct.finalized=!0,lt.litElementHydrateSupport?.({LitElement:ct});const pt=lt.litElementPolyfillSupport;pt?.({LitElement:ct}),(lt.litElementVersions??=[]).push("4.2.2");const dt=n`
  ${a("\n  :host {\n    display: block;\n    /* Chip styling variables */\n    --chip-padding: 2px 2px;\n    --chip-text-font-weight: 700;\n    --chip-text-font-size: var(--chip-font-size, 12px);\n    --chip-background-color: rgba(0,0,0,0.06);\n    --chip-border-radius: var(--ha-badge-border-radius, 999px);\n    --chip-gap: 6px;\n    --main-light-on-bg: linear-gradient(135deg,#ffcf57,#ffb200);\n    --main-light-off-bg: rgba(0,0,0,0.06);\n    --main-light-icon-on-color: #ffffff;\n    --main-light-icon-off-color: var(--secondary-text-color);\n    --switch-on-color: var(--switch-on-yellow, #ffc107);\n    --switch-smart-on-color: var(--switch-on-green, #00c853);\n    --switch-lock-unlocked-color: var(--switch-unlocked-red, #e53935);\n    --lock-spinner-color: var(--primary-text-color, #ffffff);\n    --switch-chip-bg: var(--chip-background-color, rgba(0,0,0,0.06));\n    --switch-icon-size: 28px;\n    --ac-chip-bg-off: rgba(158,158,158,0.95);\n    --ac-chip-bg-cool: #00aaff;\n    --ac-chip-bg-heat: #ff7043;\n    --ac-chip-bg-dry: #ffca28;\n    --ac-chip-bg-fan: #66bb6a;\n    --ac-chip-bg-auto: #26c6da;\n    --ac-chip-bg-default: rgba(0,0,0,0.06);\n    --ac-chip-icon-color: #ffffff;\n    --ac-chip-icon-off-color: #ffffff;\n    --ac-fan-color-off: gray;\n    --ac-fan-color-cool: #00aaff;\n    --ac-fan-color-heat: #ff7043;\n    --ac-fan-color-dry: #ffca28;\n    --ac-fan-color-fan: #66bb6a;\n    --ac-fan-color-auto: #26c6da;\n    --ac-fan-color-default: var(--paper-item-icon-color);\n    --thermostat-heating-color: #ff7043;\n    --thermostat-idle-color: #66bb6a;\n    --thermostat-off-color: gray;\n    --thermostat-pill-heating-bg: var(--state-climate-heat-color, #ff7043);\n    --thermostat-pill-heating-fg: var(--primary-background-color, #fff);\n    --thermostat-pill-idle-bg: var(--chip-background-color, rgba(0,0,0,0.06));\n    --thermostat-pill-idle-fg: var(--secondary-text-color);\n\n    /* Shared semantic status palette (single source of truth across cards) */\n    --status-on-color: #ffc107;\n    --status-active-color: #42a5f5;\n    --status-success-color: #66bb6a;\n    --status-alert-color: #e53935;\n    --status-warn-color: #ff9800;\n    --status-cool-color: #00aaff;\n    --status-heat-color: #ff7043;\n    --status-dry-color: #ffca28;\n    --status-fan-color: #66bb6a;\n    --status-auto-color: #26c6da;\n    --status-smartplug-on-color: #ff9800;\n    --status-presence-color: #42a5f5;\n    --status-icon-on-color: #ffffff;\n\n    /* Positioning variables */\n    --tile-padding: 8px;\n    --tile-padding-large: 12px;\n    --chip-z-index: 3;\n    --tile-z-index: 2;\n    --glow-z-index: 1;\n\n    /* Tile shape control */\n    --tile-border-radius: var(--ha-card-border-radius, 12px);\n\n    /* Common gaps and spacing */\n    --small-gap: 2px;\n    --medium-gap: 6px;\n    --large-gap: 12px;\n\n    /* Shadow variables */\n    --tile-shadow-default: 0 6px 18px rgba(0,0,0,0.10);\n    --tile-shadow-hover: 0 12px 24px rgba(0,0,0,0.16);\n    --tile-shadow-active: 0 18px 40px var(--pulse-strong, rgba(0,0,0,0.18)), 0 6px 18px var(--pulse-weak, rgba(0,0,0,0.10));\n  }\n")}
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
`;n`
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
`,n`
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
`,n`
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
`,n`
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
`,n`
  .family-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    align-items: center;
  }
  .family-action.destructive {
    color: var(--error-color, var(--status-alert-color, #b3261e));
    background: color-mix(
      in srgb,
      var(--error-color, #b3261e) 10%,
      transparent
    );
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
  [data-tone="accent"] {
    --family-tone: var(--primary-color);
  }
  [data-tone="success"] {
    --family-tone: var(--success-color, var(--status-success-color, #3b8b42));
  }
  [data-tone="warning"] {
    --family-tone: var(--warning-color, var(--status-warn-color, #a86600));
  }
  [data-tone="error"] {
    --family-tone: var(--error-color, var(--status-alert-color, #b3261e));
  }
  .family-chip[data-tone]:not([data-tone="neutral"]) {
    color: var(--primary-text-color);
    background: color-mix(
      in srgb,
      var(--family-tone) 14%,
      var(--family-surface)
    );
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
`;const ut="sensor.real_electricity_price_hourly_prices_yesterday",ft="sensor.real_electricity_price_hourly_prices_today",gt="sensor.real_electricity_price_hourly_prices_tomorrow",yt="sensor.real_electricity_price_current_price",xt="number.real_electricity_price_acceptable_price",bt="€/kWh",vt=36e5,_t=48;function $t(t,e,i){const r=Number(t);if(Number.isFinite(r))return Math.max(e,Math.min(i,r))}function wt(t){if("number"==typeof t&&Number.isFinite(t))return t;if("string"==typeof t){const e=Number(t);if(Number.isFinite(e))return e;const i=new Date(t).getTime();if(Number.isFinite(i))return i}}function At(...t){for(const e of t){if(null==e||""===e)continue;const t=Number(e);if(Number.isFinite(t))return t}}function kt(t){const e=t?.attributes?.hourly_prices;return Array.isArray(e)?e.reduce((t,e)=>{const i=e,r=Array.isArray(i)?wt(i[0]):wt(i.start_time)??wt(i.x),o=Array.isArray(i)?At(i[1]):At(i.actual_price,i.price,i.y,i.nord_pool_price);return void 0===r||void 0===o||t.push({timestamp:r,value:o,sourceTimestamp:r}),t},[]).sort((t,e)=>t.timestamp-e.timestamp):[]}function Et(t){return"line"===(t.chart_type||t.graph_type)?"line":"bar"}function Ct(t){return"click"===t.selector_mode?"click":"hover"}function St(t){return $t(t.height,120,360)||190}function Mt(t){return Math.round($t(t.horizontal_lines,2,9)||5)}function zt(t){return Math.round($t(t.price_decimals,0,6)??4)}function Pt(t){return Math.round($t(t.axis_decimals,0,4)??2)}function Nt(t,e,i=zt(e)){return void 0!==t&&Number.isFinite(t)?`${t.toFixed(i)} ${e.unit||bt}`:"—"}function Tt(t){const e={hour:"2-digit",minute:"2-digit"},i=String(t?.locale?.time_format||"").toLowerCase();return"12"===i&&(e.hour12=!0),"24"===i&&(e.hour12=!1),e}function Ft(t){const e=t?.config?.time_zone;return"string"==typeof e&&e.trim()?e.trim():void 0}function Ut(t,e,i){const r=Ft(t),o=new Date(e);try{return new Intl.DateTimeFormat(t?.locale?.language,r?{...i,timeZone:r}:i).format(o)}catch{return new Intl.DateTimeFormat(t?.locale?.language,i).format(o)}}function Ht(t,e){return`${function(t,e){return Ut(t,e,{day:"numeric",month:"long"})}(t,e)} ${function(t,e){return Ut(t,e,{...Tt(t)})}(t,e)}`}function Ot(t,e,i){return new Intl.DateTimeFormat("en-US",{...i,timeZone:e}).formatToParts(new Date(t)).reduce((t,e)=>("literal"!==e.type&&(t[e.type]=e.value),t),{})}function Rt(t,e){const i=Ot(t,e,{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",hourCycle:"h23"}),r=Number(i.year),o=Number(i.month),a=Number(i.day),n=Number(i.hour),s=Number(i.minute),l=Number(i.second);return[r,o,a,n,s,l].every(Number.isFinite)?Date.UTC(r,o-1,a,n,s,l)-t:0}function Dt(t){const e=new Date;e.setHours(0,0,0,0);const i=function(t){const e=Ft(t);if(e)try{const t=Ot(Date.now(),e,{year:"numeric",month:"2-digit",day:"2-digit"}),i=Number(t.year),r=Number(t.month),o=Number(t.day);if(![i,r,o].every(Number.isFinite))return;const a=Date.UTC(i,r-1,o,0,0,0,0),n=Rt(a,e);return a-Rt(a-n,e)}catch{return}}(t)??e.getTime();return{start:i,end:i+_t*vt}}function It(t,e,i){const r=i.width-i.left-i.right,o=Math.max(1,e.end-e.start);return i.left+(t-e.start)/o*r}function Lt(t,e){if(!t.length)return 0;if(e<=t[0].timestamp)return 0;let i=0;for(let r=1;r<t.length&&!(t[r].timestamp>e);r+=1)i=r;return i}function jt(t,e){return Math.min(t.timestamp+vt,e.end)}function Bt(t,e,i){return It(jt(t,e),e,i)}function Vt(t,e,i){const r=jt(t,e);return It(t.timestamp+(r-t.timestamp)/2,e,i)}function Wt(t,e,i,r){const o=t.sourceTimestamp??t.timestamp,a=r>=o&&r<o+vt,n=o+vt<=r,s=void 0!==i&&t.value<=i;return a&&s?e.cheap_current_color||"#22c55e":a?e.current_hour_color||"#3b82f6":n&&s?e.cheap_past_color||"#bbf7d0":n?e.past_color||"#bfdbfe":s?e.cheap_color||"#86efac":e.future_color||"#93c5fd"}function qt(t){return{yesterday_entity:ut,today_entity:ft,tomorrow_entity:gt,current_price_entity:yt,cheap_price_entity:xt,chart_type:"bar",selector_mode:"hover",height:190,horizontal_lines:5,price_decimals:4,axis_decimals:2,unit:bt,show_current_marker:!0,show_extremes:!0,show_stats:!0,fill_color:"rgba(56, 199, 243, 0.18)",marker_color:"#38c7f3",grid_color:"var(--divider-color, rgba(127, 127, 127, 0.25))",chart_background:"color-mix(in srgb, var(--card-background-color, #303446) 94%, var(--primary-color, #c39ce3))",card_background:"var(--ha-card-background, var(--card-background-color, #1f1f1f))",...t}}class Gt extends ct{constructor(){super(...arguments),this._dragging=!1,this._stopPointer=t=>{this._dragging=!1;try{t.currentTarget.releasePointerCapture(t.pointerId)}catch{}}}static async getConfigElement(){return await customElements.whenDefined("real-electricity-price-card-editor"),document.createElement("real-electricity-price-card-editor")}static getStubConfig(){return{type:"custom:real-electricity-price-card",yesterday_entity:ut,today_entity:ft,tomorrow_entity:gt,current_price_entity:yt,chart_type:"bar"}}setConfig(t){this._config=qt(t||{})}connectedCallback(){super.connectedCallback(),this._clockTimer=window.setInterval(()=>this.requestUpdate(),3e4)}disconnectedCallback(){void 0!==this._clockTimer&&(window.clearInterval(this._clockTimer),this._clockTimer=void 0),super.disconnectedCallback()}getCardSize(){const t=St(this._config||{});return Math.max(3,Math.ceil((t+150)/50))}render(){if(!this._config)return V``;const t=qt(this._config),e=Dt(this.hass),i=function(t,e,i){const r=e.yesterday_entity||ut,o=e.today_entity||ft,a=e.tomorrow_entity||gt,n=t?.states[r],s=t?.states[o],l=t?.states[a],c=[...kt(n),...kt(s),...kt(l)].reduce((t,e)=>(e.timestamp>=i.start&&e.timestamp<i.end&&t.set(e.timestamp,e),t),new Map),p=[s?void 0:o,l?void 0:a].filter(t=>Boolean(t));return{points:[...c.values()].sort((t,e)=>t.timestamp-e.timestamp),moreInfoEntityId:s?o:l?a:void 0,missingEntityIds:p}}(this.hass,t,e);if(!i.points.length){const t=i.missingEntityIds.length?` Missing: ${i.missingEntityIds.join(", ")}`:"";return this._renderError(`No hourly_prices found.${t}`)}const r=Et(t),o=Ct(t),a="string"==typeof t.name?t.name.trim():"",n={width:360,height:St(t),left:8,right:34,top:15,bottom:24},s=i.points,l=function(t,e){const i=t.map(t=>t.value),r=Math.min(...i),o=Math.max(...i),a=Number(e.min),n=Number(e.max);let s=Number.isFinite(a)?a:Math.min(0,r),l=Number.isFinite(n)?n:o;const c=Math.max(.08*(l-s),.005);return Number.isFinite(a)||(s-=r<0?c:0),Number.isFinite(n)||(l+=c),l<=s&&(l=s+.01),{min:s,max:l}}(s,t),c=function(t,e,i,r){const o=e.height-e.top-e.bottom;return t.map(t=>({...t,x:It(t.timestamp,r,e),y:e.top+(i.max-t.value)/(i.max-i.min)*o}))}(s,n,l,e),p=Date.now(),d=void 0!==this._selectedIndex,h=Math.max(0,Math.min(c.length-1,d?this._selectedIndex??0:Lt(c,p))),m=d?function(t,e,i){return{...t,timestamp:t.sourceTimestamp??t.timestamp,x:Vt(t,e,i),sourceTimestamp:t.sourceTimestamp??t.timestamp}}(c[h],e,n):function(t,e,i,r){const o=t[function(t,e){if(!t.length)return 0;const i=t=>t.sourceTimestamp??t.timestamp;if(e<=i(t[0]))return 0;let r=0;for(let o=1;o<t.length&&!(i(t[o])>e);o+=1)r=o;return r}(t,e)];return e<i.start||e>i.end?o:{...o,timestamp:e,x:It(e,i,r),sourceTimestamp:o.sourceTimestamp??o.timestamp}}(c,p,e,n),u=c.reduce((t,e)=>e.value<t.value?e:t,c[0]),f=c.reduce((t,e)=>e.value>t.value?e:t,c[0]),g=function(t,e){const i=e.current_price_entity||yt,r=t?.states[i]?.state,o=Number(r);return Number.isFinite(o)?o:void 0}(this.hass,t),y=function(t,e){const i=Number(e.cheap_threshold);if(Number.isFinite(i))return i;const r=e.cheap_price_entity||xt;return At(t?.states[r]?.state)}(this.hass,t),x=i.moreInfoEntityId||t.current_price_entity||yt;return V`
      <ha-card class="price-card" style=${`--rep-card-bg:${t.card_background};--rep-chart-bg:${t.chart_background};--rep-grid:${t.grid_color};--rep-marker:${t.marker_color};`}>
        <div class="price-content">
          ${a?V`
            <div class="price-head">
              <button type="button" class="price-title" aria-haspopup="dialog" aria-label=${`${a}: details`} title="Details" @click=${()=>this._openMoreInfo(x)}>
                <span>${a}</span>
                <ha-icon .icon=${ht} aria-hidden="true"></ha-icon>
              </button>
            </div>
          `:G}

          ${!1===t.show_stats?G:this._renderStats(t,s,u,f,g)}

          <div class="price-chart-frame">
            <div class="price-chart-head">
              <div class="price-selected">
                <span>${Ht(this.hass,m.timestamp)}</span>
                <strong>${Nt(m.value,t)}</strong>
              </div>
            </div>
            <div class="price-chart-body">
              ${this._renderChart(t,n,c,m,u,f,l,r,o,e,y,p)}
              <span
                class="price-selected-dot"
                style=${`left:${(m.x/n.width*100).toFixed(2)}%;top:${(m.y/n.height*100).toFixed(2)}%;`}
              ></span>
            </div>
          </div>
        </div>
      </ha-card>
    `}_renderError(t){return V`
      <ha-card class="price-card">
        <div class="price-content price-error">${t}</div>
      </ha-card>
    `}_renderStats(t,e,i,r,o){return V`
      <div class="price-stats">
        <div class="price-stat">
          <span>Now</span>
          <strong>${Nt(o,t)}</strong>
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
    `}_renderChart(t,e,i,r,o,a,n,s,l,c,p,d){const h=e.height-e.bottom,m=Math.max(e.top,Math.min(h,e.top+(n.max-0)/(n.max-n.min)*(e.height-e.top-e.bottom))),u=(e.width-e.left-e.right)/_t,f=Math.max(2,Math.min(14,.9*u)),g=function(t){return[0,_t/3,2*_t/3,_t].map(e=>t.start+e*vt)}(c),y=It(Date.now(),c,e),x=!1!==t.show_current_marker&&y>=e.left&&y<=e.width-e.right,b=Vt(o,c,e),v=Vt(a,c,e),_="rep-line-fill",$="rep-line-color",w=Math.max(1,e.width-e.left-e.right),A=i.flatMap(i=>{const r=Wt(i,t,p,d),o=Math.max(0,Math.min(100,(i.x-e.left)/w*100)),a=Math.max(0,Math.min(100,(Bt(i,c,e)-e.left)/w*100));return[W`<stop offset=${`${o}%`} stop-color=${r}></stop>`,W`<stop offset=${`${a}%`} stop-color=${r}></stop>`]});return V`
      <svg
        class="price-chart"
        viewBox=${`0 0 ${e.width} ${e.height}`}
        preserveAspectRatio="none"
        role="slider"
        tabindex="0"
        aria-label="Electricity price interval"
        aria-valuemin="0"
        aria-valuemax=${i.length-1}
        aria-valuenow=${Lt(i,r.timestamp)}
        aria-valuetext=${`${Ht(this.hass,r.timestamp)} ${Nt(r.value,t)}`}
        @keydown=${t=>this._selectKeyboard(t,i,r.timestamp)}
        @pointerdown=${t=>this._selectPoint(t,i,e,l,c)}
        @pointermove=${t=>this._selectPoint(t,i,e,l,c)}
        @pointerup=${this._stopPointer}
        @pointercancel=${this._stopPointer}
        @pointerleave=${this._stopPointer}
      >
        <defs>
          <linearGradient id=${_} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stop-color=${t.fill_color||"rgba(56, 199, 243, 0.20)"}></stop>
            <stop offset="100%" stop-color="rgba(56, 199, 243, 0.04)"></stop>
          </linearGradient>
          <linearGradient id=${$} x1=${e.left} x2=${e.width-e.right} y1="0" y2="0" gradientUnits="userSpaceOnUse">
            ${A}
          </linearGradient>
        </defs>
        ${this._renderGrid(t,e,n,g,c)}
        ${"line"===s?this._renderLineChart(i,h,_,$,c,e):this._renderBarChart(i,m,f,u,r,t,p,d)}
        ${x?W`<line class="price-current-line" x1=${y} x2=${y} y1=${e.top} y2=${h}></line>`:G}
        ${!1===t.show_extremes?G:W`
          <text class="price-extreme" x=${b} y=${Math.max(11,o.y-9)}>L</text>
          <text class="price-extreme" x=${v} y=${Math.max(11,a.y-9)}>H</text>
        `}
        <line class="price-selected-line" x1=${r.x} x2=${r.x} y1=${e.top} y2=${h}></line>
        <title>${Ht(this.hass,r.timestamp)} ${Nt(r.value,t)}</title>
        <desc>${i.length} available hourly electricity price points in a fixed ${_t}-hour chart window.</desc>
      </svg>
    `}_renderGrid(t,e,i,r,o){const a=e.height-e.bottom,n=Mt(t);return[...Array.from({length:n},(r,o)=>{const s=1-o/(n-1),l=e.top+o/(n-1)*(a-e.top),c=i.min+(i.max-i.min)*s;return W`
          <line class="price-grid-line" x1=${e.left} x2=${e.width-e.right} y1=${l} y2=${l}></line>
          <text class="price-axis-label" x=${e.width-2} y=${l}>${function(t,e){return`${t.toFixed(Pt(e))}€`}(c,t)}</text>
        `}),...r.map((t,i)=>{const n=It(t,o,e),s=0===i?" price-time-label-start":i===r.length-1?" price-time-label-end":"";return W`
          <line class="price-time-line" x1=${n} x2=${n} y1=${e.top} y2=${a}></line>
          <text class=${`price-time-label${s}`} x=${n} y=${e.height-6}>${function(t,e){return Ht(t,e)}(this.hass,t)}</text>
        `})]}_renderBarChart(t,e,i,r,o,a,n,s){const l=o.timestamp,c=o.sourceTimestamp,p=Math.max(0,(r-i)/2);return t.map(t=>{const r=Math.min(t.y,e),o=Math.max(1,Math.abs(e-t.y)),d=t.timestamp===l||void 0!==c&&t.sourceTimestamp===c?" price-bar-selected":"";return W`
        <rect
          class=${`price-bar${d}`}
          x=${t.x+p}
          y=${r}
          width=${i}
          height=${o}
          rx="2.5"
          fill=${Wt(t,a,n,s)}
        ></rect>
      `})}_renderLineChart(t,e,i,r,o,a){const n=function(t,e,i,r){const o=[];let a,n="",s=0,l=0;const c=()=>{n&&(o.push({line:n,area:`${n} L ${l.toFixed(2)} ${e.toFixed(2)} L ${s.toFixed(2)} ${e.toFixed(2)} Z`}),n="")};return t.forEach(t=>{const e=t.x,o=Bt(t,i,r),p=a&&Math.abs(t.timestamp-(a.timestamp+vt))<6e4;n&&p?n+=` L ${e.toFixed(2)} ${t.y.toFixed(2)}`:(c(),s=e,n=`M ${e.toFixed(2)} ${t.y.toFixed(2)}`),n+=` L ${o.toFixed(2)} ${t.y.toFixed(2)}`,l=o,a=t}),c(),o}(t,e,o,a);return W`
      ${n.map(t=>W`<path class="price-line-area" d=${t.area} fill=${`url(#${i})`}></path>`)}
      ${n.map(t=>W`<path class="price-line-shadow" d=${t.line}></path>`)}
      ${n.map(t=>W`<path class="price-line" d=${t.line} stroke=${`url(#${r})`}></path>`)}
    `}_selectKeyboard(t,e,i){let r=Lt(e,i);switch(t.key){case"ArrowLeft":case"ArrowDown":r-=1;break;case"ArrowRight":case"ArrowUp":r+=1;break;case"PageDown":r-=6;break;case"PageUp":r+=6;break;case"Home":r=0;break;case"End":r=e.length-1;break;default:return}t.preventDefault(),this._selectedIndex=Math.max(0,Math.min(e.length-1,r))}_selectPoint(t,e,i,r,o){const a="hover"===r&&"pointermove"===t.type&&"touch"!==t.pointerType;if("pointermove"===t.type&&!a&&!this._dragging)return;if("pointerdown"===t.type){this._dragging=!0;try{t.currentTarget.setPointerCapture(t.pointerId)}catch{}}"touch"!==t.pointerType&&t.preventDefault();const n=t.currentTarget.getBoundingClientRect(),s=function(t,e,i){const r=i.width-i.left-i.right,o=Math.max(1,e.end-e.start),a=Math.max(i.left,Math.min(i.width-i.right,t));return e.start+(a-i.left)/Math.max(1,r)*o}((t.clientX-n.left)/Math.max(1,n.width)*i.width,o,i);this._selectedIndex=Lt(e,s)}_openMoreInfo(t){t&&function(t,e){t.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:e},bubbles:!0,composed:!0}))}(this,t)}}Gt.properties={hass:{attribute:!1},_config:{state:!0},_selectedIndex:{state:!0}},Gt.styles=[dt,mt,n`
    :host {
      display: block;
      color: var(--primary-text-color);
      font-family: var(--paper-font-body1_-_font-family, Roboto, sans-serif);
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
      display: inline-flex;
      align-items: center;
      gap: 8px;
      max-width: 100%;
      padding: 0;
      border: 0;
      background: transparent;
      color: var(--primary-text-color);
      font: inherit;
      font-size: 18px;
      font-weight: 700;
      min-height: 44px;
      line-height: 1.18;
      text-align: left;
      cursor: pointer;
    }

    .price-title span { min-width: 0; overflow-wrap: anywhere; }
    .price-title ha-icon { width: 22px; height: 22px; --mdc-icon-size: 22px; flex: 0 0 22px; color: var(--secondary-text-color); }

    .price-title:focus {
      outline: none;
    }

    .price-title:focus-visible {
      outline: 2px solid var(--primary-color);
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
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: var(--tile-padding);
      margin-bottom: var(--large-gap);
    }

    .price-stat {
      min-width: 0;
      padding: 8px 10px;
      border-radius: var(--tile-border-radius);
      background: var(--family-tile);
      box-sizing: border-box;
    }

    .price-stat span,
    .price-stat strong {
      display: block;
      overflow-wrap: anywhere;
      white-space: normal;
    }

    .price-stat span {
      color: var(--secondary-text-color);
      font-size: 11px;
      font-weight: 500;
      line-height: 1.1;
    }

    .price-stat strong {
      margin-top: 3px;
      color: var(--primary-text-color);
      font-size: 13px;
      font-weight: 600;
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
      font-weight: 600;
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

    .price-card { container-type:inline-size; }
    .price-chart:focus-visible { outline:3px solid var(--primary-color);outline-offset:-3px;border-radius:8px; }
    .price-stat strong { font-variant-numeric:tabular-nums;line-height:1.4; }
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
        font-size: 18px;
      }

      .price-stats {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }
  `];class Zt extends ct{constructor(){super(...arguments),this._config=Gt.getStubConfig()}setConfig(t){this._config=qt(t||{})}render(){const t=qt(this._config);return V`
      <div class="editor">
        ${this._textField("Name (optional)","name",t.name||"")}
        ${this._textField("Yesterday Prices Entity","yesterday_entity",t.yesterday_entity||ut)}
        <div class="grid">
          ${this._textField("Today Prices Entity","today_entity",t.today_entity||ft)}
          ${this._textField("Tomorrow Prices Entity","tomorrow_entity",t.tomorrow_entity||gt)}
        </div>
        ${this._textField("Current Price Entity","current_price_entity",t.current_price_entity||yt)}
        ${this._textField("Acceptable Price Entity","cheap_price_entity",t.cheap_price_entity||xt)}
        <label>
          <span>Chart Type</span>
          <select .value=${Et(t)} @change=${t=>this._setValue("chart_type",t.target.value)}>
            <option value="bar">Bars</option>
            <option value="line">Step line</option>
          </select>
        </label>
        <label>
          <span>Selector Mode</span>
          <select .value=${Ct(t)} @change=${t=>this._setValue("selector_mode",t.target.value)}>
            <option value="hover">Hover</option>
            <option value="click">Click / tap</option>
          </select>
        </label>
        <div class="grid">
          ${this._numberField("Height","height",St(t),120,360)}
          ${this._numberField("Horizontal Lines","horizontal_lines",Mt(t),2,9)}
          ${this._numberField("Price Decimals","price_decimals",zt(t),0,6)}
          ${this._numberField("Axis Decimals","axis_decimals",Pt(t),0,4)}
        </div>
        ${this._textField("Unit","unit",t.unit||bt)}
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
    `}_numberField(t,e,i,r,o,a=!1){return V`
      <label>
        <span>${t}</span>
        <input
          type="number"
          min=${r??G}
          max=${o??G}
          .value=${String(i??"")}
          @input=${t=>{const i=t.target.value,r=Number(i);this._setValue(e,a&&""===i?void 0:Number.isFinite(r)?r:void 0)}}
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
    `}_setValue(t,e){const i={...this._config};var r,o;void 0===e||""===e?delete i[t]:i[t]=e,this._config=i,r="config-changed",o={config:i},this.dispatchEvent(new CustomEvent(r,{detail:o,bubbles:!0,composed:!0}))}}Zt.properties={hass:{attribute:!1},_config:{state:!0}},Zt.styles=n`
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
  `,customElements.get("real-electricity-price-card")||customElements.define("real-electricity-price-card",Gt),customElements.get("real-electricity-price-card-editor")||customElements.define("real-electricity-price-card-editor",Zt),window.customCards=window.customCards||[],window.customCards.push({type:"real-electricity-price-card",name:"Real Electricity Price Card",description:"Interactive electricity price chart for real-electricity-price",preview:!1,version:"0.1.21"});
