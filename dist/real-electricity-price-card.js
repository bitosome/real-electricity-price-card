/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,r=Symbol(),i=new WeakMap;let s=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==r)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const r=this.t;if(e&&void 0===t){const e=void 0!==r&&1===r.length;e&&(t=i.get(r)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&i.set(r,t))}return t}toString(){return this.cssText}};const o=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,r,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+t[i+1],t[0]);return new s(i,t,r)},n=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const r of t.cssRules)e+=r.cssText;return(t=>new s("string"==typeof t?t:t+"",void 0,r))(e)})(t):t,{is:a,defineProperty:c,getOwnPropertyDescriptor:l,getOwnPropertyNames:h,getOwnPropertySymbols:d,getPrototypeOf:p}=Object,u=globalThis,m=u.trustedTypes,_=m?m.emptyScript:"",f=u.reactiveElementPolyfillSupport,g=(t,e)=>t,$={toAttribute(t,e){switch(e){case Boolean:t=t?_:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let r=t;switch(e){case Boolean:r=null!==t;break;case Number:r=null===t?null:Number(t);break;case Object:case Array:try{r=JSON.parse(t)}catch(t){r=null}}return r}},x=(t,e)=>!a(t,e),y={attribute:!0,type:String,converter:$,reflect:!1,useDefault:!1,hasChanged:x};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let b=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=y){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const r=Symbol(),i=this.getPropertyDescriptor(t,r,e);void 0!==i&&c(this.prototype,t,i)}}static getPropertyDescriptor(t,e,r){const{get:i,set:s}=l(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:i,set(e){const o=i?.call(this);s?.call(this,e),this.requestUpdate(t,o,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??y}static _$Ei(){if(this.hasOwnProperty(g("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(g("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(g("properties"))){const t=this.properties,e=[...h(t),...d(t)];for(const r of e)this.createProperty(r,t[r])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,r]of e)this.elementProperties.set(t,r)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const r=this._$Eu(t,e);void 0!==r&&this._$Eh.set(r,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const r=new Set(t.flat(1/0).reverse());for(const t of r)e.unshift(n(t))}else void 0!==t&&e.push(n(t));return e}static _$Eu(t,e){const r=e.attribute;return!1===r?void 0:"string"==typeof r?r:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const r of e.keys())this.hasOwnProperty(r)&&(t.set(r,this[r]),delete this[r]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const r=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((r,i)=>{if(e)r.adoptedStyleSheets=i.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of i){const i=document.createElement("style"),s=t.litNonce;void 0!==s&&i.setAttribute("nonce",s),i.textContent=e.cssText,r.appendChild(i)}})(r,this.constructor.elementStyles),r}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,r){this._$AK(t,r)}_$ET(t,e){const r=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,r);if(void 0!==i&&!0===r.reflect){const s=(void 0!==r.converter?.toAttribute?r.converter:$).toAttribute(e,r.type);this._$Em=t,null==s?this.removeAttribute(i):this.setAttribute(i,s),this._$Em=null}}_$AK(t,e){const r=this.constructor,i=r._$Eh.get(t);if(void 0!==i&&this._$Em!==i){const t=r.getPropertyOptions(i),s="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:$;this._$Em=i;const o=s.fromAttribute(e,t.type);this[i]=o??this._$Ej?.get(i)??o,this._$Em=null}}requestUpdate(t,e,r,i=!1,s){if(void 0!==t){const o=this.constructor;if(!1===i&&(s=this[t]),r??=o.getPropertyOptions(t),!((r.hasChanged??x)(s,e)||r.useDefault&&r.reflect&&s===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,r))))return;this.C(t,e,r)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:r,reflect:i,wrapped:s},o){r&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==s||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||r||(e=void 0),this._$AL.set(t,e)),!0===i&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,r]of t){const{wrapped:t}=r,i=this[e];!0!==t||this._$AL.has(e)||void 0===i||this.C(e,void 0,r,i)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};b.elementStyles=[],b.shadowRootOptions={mode:"open"},b[g("elementProperties")]=new Map,b[g("finalized")]=new Map,f?.({ReactiveElement:b}),(u.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const v=globalThis,A=t=>t,w=v.trustedTypes,E=w?w.createPolicy("lit-html",{createHTML:t=>t}):void 0,C="$lit$",k=`lit$${Math.random().toFixed(9).slice(2)}$`,S="?"+k,M=`<${S}>`,P=document,F=()=>P.createComment(""),N=t=>null===t||"object"!=typeof t&&"function"!=typeof t,U=Array.isArray,O="[ \t\n\f\r]",T=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,H=/-->/g,z=/>/g,R=RegExp(`>|${O}(?:([^\\s"'>=/]+)(${O}*=${O}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),D=/'/g,L=/"/g,I=/^(?:script|style|textarea|title)$/i,j=t=>(e,...r)=>({_$litType$:t,strings:e,values:r}),B=j(1),V=j(2),W=Symbol.for("lit-noChange"),G=Symbol.for("lit-nothing"),q=new WeakMap,J=P.createTreeWalker(P,129);function Z(t,e){if(!U(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(e):e}const K=(t,e)=>{const r=t.length-1,i=[];let s,o=2===e?"<svg>":3===e?"<math>":"",n=T;for(let e=0;e<r;e++){const r=t[e];let a,c,l=-1,h=0;for(;h<r.length&&(n.lastIndex=h,c=n.exec(r),null!==c);)h=n.lastIndex,n===T?"!--"===c[1]?n=H:void 0!==c[1]?n=z:void 0!==c[2]?(I.test(c[2])&&(s=RegExp("</"+c[2],"g")),n=R):void 0!==c[3]&&(n=R):n===R?">"===c[0]?(n=s??T,l=-1):void 0===c[1]?l=-2:(l=n.lastIndex-c[2].length,a=c[1],n=void 0===c[3]?R:'"'===c[3]?L:D):n===L||n===D?n=R:n===H||n===z?n=T:(n=R,s=void 0);const d=n===R&&t[e+1].startsWith("/>")?" ":"";o+=n===T?r+M:l>=0?(i.push(a),r.slice(0,l)+C+r.slice(l)+k+d):r+k+(-2===l?e:d)}return[Z(t,o+(t[r]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),i]};class Y{constructor({strings:t,_$litType$:e},r){let i;this.parts=[];let s=0,o=0;const n=t.length-1,a=this.parts,[c,l]=K(t,e);if(this.el=Y.createElement(c,r),J.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(i=J.nextNode())&&a.length<n;){if(1===i.nodeType){if(i.hasAttributes())for(const t of i.getAttributeNames())if(t.endsWith(C)){const e=l[o++],r=i.getAttribute(t).split(k),n=/([.?@])?(.*)/.exec(e);a.push({type:1,index:s,name:n[2],strings:r,ctor:"."===n[1]?rt:"?"===n[1]?it:"@"===n[1]?st:et}),i.removeAttribute(t)}else t.startsWith(k)&&(a.push({type:6,index:s}),i.removeAttribute(t));if(I.test(i.tagName)){const t=i.textContent.split(k),e=t.length-1;if(e>0){i.textContent=w?w.emptyScript:"";for(let r=0;r<e;r++)i.append(t[r],F()),J.nextNode(),a.push({type:2,index:++s});i.append(t[e],F())}}}else if(8===i.nodeType)if(i.data===S)a.push({type:2,index:s});else{let t=-1;for(;-1!==(t=i.data.indexOf(k,t+1));)a.push({type:7,index:s}),t+=k.length-1}s++}}static createElement(t,e){const r=P.createElement("template");return r.innerHTML=t,r}}function X(t,e,r=t,i){if(e===W)return e;let s=void 0!==i?r._$Co?.[i]:r._$Cl;const o=N(e)?void 0:e._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),void 0===o?s=void 0:(s=new o(t),s._$AT(t,r,i)),void 0!==i?(r._$Co??=[])[i]=s:r._$Cl=s),void 0!==s&&(e=X(t,s._$AS(t,e.values),s,i)),e}class Q{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:r}=this._$AD,i=(t?.creationScope??P).importNode(e,!0);J.currentNode=i;let s=J.nextNode(),o=0,n=0,a=r[0];for(;void 0!==a;){if(o===a.index){let e;2===a.type?e=new tt(s,s.nextSibling,this,t):1===a.type?e=new a.ctor(s,a.name,a.strings,this,t):6===a.type&&(e=new ot(s,this,t)),this._$AV.push(e),a=r[++n]}o!==a?.index&&(s=J.nextNode(),o++)}return J.currentNode=P,i}p(t){let e=0;for(const r of this._$AV)void 0!==r&&(void 0!==r.strings?(r._$AI(t,r,e),e+=r.strings.length-2):r._$AI(t[e])),e++}}class tt{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,r,i){this.type=2,this._$AH=G,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=r,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=X(this,t,e),N(t)?t===G||null==t||""===t?(this._$AH!==G&&this._$AR(),this._$AH=G):t!==this._$AH&&t!==W&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>U(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==G&&N(this._$AH)?this._$AA.nextSibling.data=t:this.T(P.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:r}=t,i="number"==typeof r?this._$AC(t):(void 0===r.el&&(r.el=Y.createElement(Z(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===i)this._$AH.p(e);else{const t=new Q(i,this),r=t.u(this.options);t.p(e),this.T(r),this._$AH=t}}_$AC(t){let e=q.get(t.strings);return void 0===e&&q.set(t.strings,e=new Y(t)),e}k(t){U(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let r,i=0;for(const s of t)i===e.length?e.push(r=new tt(this.O(F()),this.O(F()),this,this.options)):r=e[i],r._$AI(s),i++;i<e.length&&(this._$AR(r&&r._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=A(t).nextSibling;A(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class et{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,r,i,s){this.type=1,this._$AH=G,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=s,r.length>2||""!==r[0]||""!==r[1]?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=G}_$AI(t,e=this,r,i){const s=this.strings;let o=!1;if(void 0===s)t=X(this,t,e,0),o=!N(t)||t!==this._$AH&&t!==W,o&&(this._$AH=t);else{const i=t;let n,a;for(t=s[0],n=0;n<s.length-1;n++)a=X(this,i[r+n],e,n),a===W&&(a=this._$AH[n]),o||=!N(a)||a!==this._$AH[n],a===G?t=G:t!==G&&(t+=(a??"")+s[n+1]),this._$AH[n]=a}o&&!i&&this.j(t)}j(t){t===G?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class rt extends et{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===G?void 0:t}}class it extends et{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==G)}}class st extends et{constructor(t,e,r,i,s){super(t,e,r,i,s),this.type=5}_$AI(t,e=this){if((t=X(this,t,e,0)??G)===W)return;const r=this._$AH,i=t===G&&r!==G||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,s=t!==G&&(r===G||i);i&&this.element.removeEventListener(this.name,this,r),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class ot{constructor(t,e,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){X(this,t)}}const nt=v.litHtmlPolyfillSupport;nt?.(Y,tt),(v.litHtmlVersions??=[]).push("3.3.3");const at=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class ct extends b{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,r)=>{const i=r?.renderBefore??e;let s=i._$litPart$;if(void 0===s){const t=r?.renderBefore??null;i._$litPart$=s=new tt(e.insertBefore(F(),t),t,void 0,r??{})}return s._$AI(t),s})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return W}}ct._$litElement$=!0,ct.finalized=!0,at.litElementHydrateSupport?.({LitElement:ct});const lt=at.litElementPolyfillSupport;lt?.({LitElement:ct}),(at.litElementVersions??=[]).push("4.2.2");const ht="sensor.real_electricity_price_chart_data",dt="sensor.real_electricity_price_current_price",pt="€/kWh",ut={"#bfdbfe":"past_color","#3b82f6":"current_hour_color","#93c5fd":"future_color","#bbf7d0":"cheap_past_color","#86efac":"cheap_color","#22c55e":"cheap_current_color"};function mt(t,e,r){t.dispatchEvent(new CustomEvent(e,{detail:r,bubbles:!0,composed:!0}))}function _t(t,e,r){const i=Number(t);if(Number.isFinite(i))return Math.max(e,Math.min(r,i))}function ft(t){if("string"!=typeof t)return;return t.trim()||void 0}function gt(t){if("number"==typeof t&&Number.isFinite(t))return t;if("string"==typeof t){const e=Number(t);if(Number.isFinite(e))return e;const r=new Date(t).getTime();if(Number.isFinite(r))return r}}function $t(t){return"line"===(t.chart_type||t.graph_type)?"line":"bar"}function xt(t){return"click"===t.selector_mode?"click":"hover"}function yt(t){return _t(t.height,120,360)||190}function bt(t){return Math.round(_t(t.horizontal_lines,2,9)||5)}function vt(t){return Math.round(_t(t.price_decimals,0,6)??4)}function At(t){return Math.round(_t(t.axis_decimals,0,4)??2)}function wt(t,e,r=vt(e)){return void 0!==t&&Number.isFinite(t)?`${t.toFixed(r)} ${e.unit||pt}`:"—"}function Et(t){const e={hour:"2-digit",minute:"2-digit"},r=String(t?.locale?.time_format||"").toLowerCase();return"12"===r&&(e.hour12=!0),"24"===r&&(e.hour12=!1),e}function Ct(t,e){return new Intl.DateTimeFormat(t?.locale?.language,{day:"numeric",month:"long",...Et(t)}).format(new Date(e))}function kt(t){const e=t.slice(1).map((e,r)=>e.timestamp-t[r].timestamp).filter(t=>Number.isFinite(t)&&t>0).sort((t,e)=>t-e);return e.length&&e[Math.floor(e.length/2)]||36e5}function St(t,e,r,i){const s=r.width-r.left-r.right;if(e.length<=1)return r.left+s/2;const o=kt(e),n=e[0].timestamp,a=e[e.length-1].timestamp,c="bar"===i?n-o/2:n,l="bar"===i?a+o/2:a,h=Math.max(1,l-c);return r.left+(t-c)/h*s}function Mt(t){if(!t.length)return"";if(1===t.length)return`M ${t[0].x.toFixed(2)} ${t[0].y.toFixed(2)}`;let e=`M ${t[0].x.toFixed(2)} ${t[0].y.toFixed(2)}`;for(let r=0;r<t.length-1;r+=1){const i=t[r],s=t[r+1],o=t[r-1]||i,n=t[r+2]||s,a=i.x+(s.x-o.x)/6,c=i.y+(s.y-o.y)/6,l=s.x-(n.x-i.x)/6,h=s.y-(n.y-i.y)/6;e+=` C ${a.toFixed(2)} ${c.toFixed(2)}, ${l.toFixed(2)} ${h.toFixed(2)}, ${s.x.toFixed(2)} ${s.y.toFixed(2)}`}return e}function Pt(t,e){const r=(i=t.color)?i.trim().toLowerCase():void 0;var i;const s=r?e.color_overrides?.[r]||e.color_overrides?.[t.color||""]:void 0;if(s)return s;const o=r?ut[r]:void 0;return o&&ft(e[o])?String(e[o]):!1!==e.use_sensor_colors&&t.color?t.color:e.line_color||"#ffc928"}function Ft(t){return{entity:ht,current_price_entity:dt,chart_type:"bar",selector_mode:"hover",height:190,horizontal_lines:5,price_decimals:4,axis_decimals:2,unit:pt,show_current_marker:!0,show_extremes:!0,show_stats:!0,use_sensor_colors:!0,line_color:"#ffc928",fill_color:"rgba(56, 199, 243, 0.18)",marker_color:"#38c7f3",grid_color:"rgba(255, 255, 255, 0.14)",chart_background:"rgba(33, 52, 62, 0.88)",card_background:"var(--ha-card-background, var(--card-background-color, #1f1f1f))",color_overrides:{},...t}}class Nt extends ct{constructor(){super(...arguments),this._dragging=!1,this._stopPointer=t=>{this._dragging=!1;try{t.currentTarget.releasePointerCapture(t.pointerId)}catch{}}}static async getConfigElement(){return await customElements.whenDefined("real-electricity-price-card-editor"),document.createElement("real-electricity-price-card-editor")}static getStubConfig(){return{type:"custom:real-electricity-price-card",entity:ht,current_price_entity:dt,chart_type:"bar"}}setConfig(t){this._config=Ft(t||{})}getCardSize(){const t=yt(this._config||{});return Math.max(3,Math.ceil((t+150)/50))}render(){if(!this._config)return B``;const t=Ft(this._config),e=t.entity||ht,r=this.hass?.states[e],i=function(t){const e=t?.attributes?.chart_data;return Array.isArray(e)?e.reduce((t,e)=>{const r=e,i=Array.isArray(r)?gt(r[0]):gt(r.x)??gt(r.start_time),s=Number(Array.isArray(r)?r[1]:r.y);return void 0!==i&&Number.isFinite(s)?(t.push({timestamp:i,value:s,color:Array.isArray(r)?void 0:ft(r.fillColor),startTime:Array.isArray(r)?void 0:r.start_time,formattedTime:Array.isArray(r)?void 0:r.formatted_time,formattedPrice:Array.isArray(r)?void 0:r.formatted_price}),t):t},[]).sort((t,e)=>t.timestamp-e.timestamp):[]}(r);if(!r)return this._renderError(`Entity not found: ${e}`);if(!i.length)return this._renderError(`No chart_data found on ${e}`);const s=$t(t),o=xt(t),n="string"==typeof t.name?t.name.trim():"",a={width:360,height:yt(t),left:8,right:34,top:16,bottom:27},c=function(t,e){const r=t.map(t=>t.value),i=Math.min(...r),s=Math.max(...r),o=Number(e.min),n=Number(e.max);let a=Number.isFinite(o)?o:Math.min(0,i),c=Number.isFinite(n)?n:s;const l=Math.max(.08*(c-a),.005);return Number.isFinite(o)||(a-=i<0?l:0),Number.isFinite(n)||(c+=l),c<=a&&(c=a+.01),{min:a,max:c}}(i,t),l=function(t,e,r,i){const s=e.height-e.top-e.bottom;return t.map(o=>({...o,x:St(o.timestamp,t,e,i),y:e.top+(r.max-o.value)/(r.max-r.min)*s}))}(i,a,c,s),h=Math.max(0,Math.min(l.length-1,this._selectedIndex??function(t,e=Date.now()){if(!t.length)return 0;let r=0,i=Math.abs(t[0].timestamp-e);return t.forEach((t,s)=>{const o=Math.abs(t.timestamp-e);o<i&&(r=s,i=o)}),r}(l))),d=l[h],p=l.reduce((t,e)=>e.value<t.value?e:t,l[0]),u=l.reduce((t,e)=>e.value>t.value?e:t,l[0]),m=function(t,e){const r=e.current_price_entity||dt,i=t?.states[r]?.state,s=Number(i);return Number.isFinite(s)?s:void 0}(this.hass,t);return B`
      <ha-card class="price-card" style=${`--rep-card-bg:${t.card_background};--rep-chart-bg:${t.chart_background};--rep-grid:${t.grid_color};--rep-marker:${t.marker_color};`}>
        <div class="price-content">
          <div class=${"price-head"+(n?"":" price-head-no-title")}>
            ${n?B`
              <button class="price-title" @click=${()=>this._openMoreInfo(e)}>
                <span>${n}</span>
              </button>
            `:G}
            <div class="price-selected">
              <span>${Ct(this.hass,d.timestamp)}</span>
              <strong>${wt(d.value,t)}</strong>
            </div>
          </div>

          ${!1===t.show_stats?G:this._renderStats(t,i,p,u,m)}

          <div class="price-chart-frame">
            ${this._renderChart(t,a,l,d,p,u,c,s,o)}
            <span
              class="price-selected-dot"
              style=${`left:${(d.x/a.width*100).toFixed(2)}%;top:${(d.y/a.height*100).toFixed(2)}%;`}
            ></span>
          </div>
        </div>
      </ha-card>
    `}_renderError(t){return B`
      <ha-card class="price-card">
        <div class="price-content price-error">${t}</div>
      </ha-card>
    `}_renderStats(t,e,r,i,s){return B`
      <div class="price-stats">
        <div class="price-stat">
          <span>Now</span>
          <strong>${wt(s,t)}</strong>
        </div>
        <div class="price-stat">
          <span>Low</span>
          <strong>${wt(r.value,t)}</strong>
        </div>
        <div class="price-stat">
          <span>Average</span>
          <strong>${wt(function(t){if(t.length)return t.reduce((t,e)=>t+e.value,0)/t.length}(e),t)}</strong>
        </div>
        <div class="price-stat">
          <span>High</span>
          <strong>${wt(i.value,t)}</strong>
        </div>
      </div>
    `}_renderChart(t,e,r,i,s,o,n,a,c){const l=e.height-e.bottom,h=Math.max(e.top,Math.min(l,e.top+(n.max-0)/(n.max-n.min)*(e.height-e.top-e.bottom))),d=kt(r),p=e.width-e.left-e.right,u=Math.max(2,Math.min(14,p/Math.max(1,r.length)*.82)),m=function(t){return t.length?Array.from(new Set([0,Math.floor((t.length-1)/3),Math.floor(2*(t.length-1)/3),t.length-1])).filter(e=>e>=0&&e<t.length):[]}(r),_=St(Date.now(),r,e,a),f=!1!==t.show_current_marker&&_>=e.left&&_<=e.width-e.right,g="rep-line-fill",$="rep-line-color";return B`
      <svg
        class="price-chart"
        viewBox=${`0 0 ${e.width} ${e.height}`}
        preserveAspectRatio="none"
        role="img"
        aria-label="Electricity price chart"
        @pointerdown=${t=>this._selectPoint(t,r,e,c)}
        @pointermove=${t=>this._selectPoint(t,r,e,c)}
        @pointerup=${this._stopPointer}
        @pointercancel=${this._stopPointer}
        @pointerleave=${this._stopPointer}
      >
        <defs>
          <linearGradient id=${g} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stop-color=${t.fill_color||"rgba(56, 199, 243, 0.20)"}></stop>
            <stop offset="100%" stop-color="rgba(56, 199, 243, 0.04)"></stop>
          </linearGradient>
          <linearGradient id=${$} x1=${e.left} x2=${e.width-e.right} y1="0" y2="0" gradientUnits="userSpaceOnUse">
            ${r.map((e,i)=>V`
              <stop offset=${i/Math.max(1,r.length-1)*100+"%"} stop-color=${Pt(e,t)}></stop>
            `)}
          </linearGradient>
        </defs>
        ${this._renderGrid(t,e,r,m,n)}
        ${f?V`<line class="price-current-line" x1=${_} x2=${_} y1=${e.top} y2=${l}></line>`:G}
        ${"line"===a?this._renderLineChart(r,l,g,$,t):this._renderBarChart(r,h,u,i,t)}
        ${!1===t.show_extremes?G:V`
          <text class="price-extreme" x=${s.x} y=${Math.max(11,s.y-9)}>L</text>
          <text class="price-extreme" x=${o.x} y=${Math.max(11,o.y-9)}>H</text>
        `}
        <line class="price-selected-line" x1=${i.x} x2=${i.x} y1=${e.top} y2=${l}></line>
        <title>${Ct(this.hass,i.timestamp)} ${wt(i.value,t)}</title>
        <desc>${r.length} hourly electricity price points. Inferred interval ${Math.round(d/6e4)} minutes.</desc>
      </svg>
    `}_renderGrid(t,e,r,i,s){const o=e.height-e.bottom,n=bt(t);return[...Array.from({length:n},(r,i)=>{const a=1-i/(n-1),c=e.top+i/(n-1)*(o-e.top),l=s.min+(s.max-s.min)*a;return V`
          <line class="price-grid-line" x1=${e.left} x2=${e.width-e.right} y1=${c} y2=${c}></line>
          <text class="price-axis-label" x=${e.width-2} y=${c}>${function(t,e){return`${t.toFixed(At(e))}€`}(l,t)}</text>
        `}),...i.map(t=>{const i=r[t],s=0===t?" price-time-label-start":t===r.length-1?" price-time-label-end":"";return V`
          <line class="price-time-line" x1=${i.x} x2=${i.x} y1=${e.top} y2=${o}></line>
          <text class=${`price-time-label${s}`} x=${i.x} y=${e.height-6}>${n=this.hass,a=i.timestamp,new Intl.DateTimeFormat(n?.locale?.language,{day:"numeric",month:"long",...Et(n)}).format(new Date(a))}</text>
        `;var n,a})]}_renderBarChart(t,e,r,i,s){return t.map(t=>{const o=Math.min(t.y,e),n=Math.max(1,Math.abs(e-t.y)),a=t.timestamp===i.timestamp?" price-bar-selected":"";return V`
        <rect
          class=${`price-bar${a}`}
          x=${t.x-r/2}
          y=${o}
          width=${r}
          height=${n}
          rx="2.5"
          fill=${Pt(t,s)}
        ></rect>
      `})}_renderLineChart(t,e,r,i,s){const o=Mt(t),n=function(t,e){if(!t.length)return"";const r=t[0],i=t[t.length-1];return`${Mt(t)} L ${i.x.toFixed(2)} ${e.toFixed(2)} L ${r.x.toFixed(2)} ${e.toFixed(2)} Z`}(t,e),a=!1===s.use_sensor_colors?s.line_color||"#ffc928":`url(#${i})`;return V`
      <path class="price-line-area" d=${n} fill=${`url(#${r})`}></path>
      <path class="price-line-shadow" d=${o}></path>
      <path class="price-line" d=${o} stroke=${a}></path>
    `}_selectPoint(t,e,r,i){const s="hover"===i&&"pointermove"===t.type&&"touch"!==t.pointerType;if("pointermove"===t.type&&!s&&!this._dragging)return;if("pointerdown"===t.type){this._dragging=!0;try{t.currentTarget.setPointerCapture(t.pointerId)}catch{}}t.preventDefault();const o=t.currentTarget.getBoundingClientRect(),n=(t.clientX-o.left)/Math.max(1,o.width)*r.width;let a=0,c=Math.abs(e[0].x-n);e.forEach((t,e)=>{const r=Math.abs(t.x-n);r<c&&(a=e,c=r)}),this._selectedIndex=a}_openMoreInfo(t){t&&mt(this,"hass-more-info",{entityId:t})}}Nt.properties={hass:{attribute:!1},_config:{state:!0},_selectedIndex:{state:!0}},Nt.styles=o`
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
      margin-bottom: 12px;
    }

    .price-head-no-title {
      justify-content: flex-end;
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
      display: grid;
      justify-items: end;
      gap: 2px;
      min-width: max-content;
      text-align: right;
    }

    .price-selected span {
      color: var(--secondary-text-color);
      font-size: 12px;
      font-weight: 750;
      line-height: 1.1;
    }

    .price-selected strong {
      color: var(--primary-text-color);
      font-size: 28px;
      line-height: 1;
      font-weight: 850;
      letter-spacing: 0;
    }

    .price-stats {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 8px;
      margin-bottom: 12px;
    }

    .price-stat {
      min-width: 0;
      padding: 8px 10px;
      border-radius: 8px;
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
      border-radius: 10px;
      background: var(--rep-chart-bg);
      overflow: hidden;
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
      stroke: rgba(255, 255, 255, 0.42);
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
      stroke-width: 4.2;
      stroke-linecap: round;
      stroke-linejoin: round;
      vector-effect: non-scaling-stroke;
    }

    .price-axis-label,
    .price-time-label,
    .price-extreme {
      fill: var(--secondary-text-color);
      font-size: 8.4px;
      font-weight: 800;
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
      font-size: 12px;
      font-weight: 900;
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
      border: 1px solid rgba(255, 255, 255, 0.56);
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
        padding: 12px;
      }

      .price-head {
        gap: 10px;
      }

      .price-title {
        max-width: 64%;
        font-size: 18px;
      }

      .price-selected strong {
        font-size: 22px;
      }

      .price-stats {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }
  `;class Ut extends ct{constructor(){super(...arguments),this._config=Nt.getStubConfig()}setConfig(t){this._config=Ft(t||{})}render(){const t=Ft(this._config);return B`
      <div class="editor">
        ${this._textField("Name (optional)","name",t.name||"")}
        ${this._textField("Chart Data Entity","entity",t.entity||ht)}
        ${this._textField("Current Price Entity","current_price_entity",t.current_price_entity||dt)}
        <label>
          <span>Chart Type</span>
          <select .value=${$t(t)} @change=${t=>this._setValue("chart_type",t.target.value)}>
            <option value="bar">Bars</option>
            <option value="line">Line</option>
          </select>
        </label>
        <label>
          <span>Selector Mode</span>
          <select .value=${xt(t)} @change=${t=>this._setValue("selector_mode",t.target.value)}>
            <option value="hover">Hover</option>
            <option value="click">Click / tap</option>
          </select>
        </label>
        <div class="grid">
          ${this._numberField("Height","height",yt(t),120,360)}
          ${this._numberField("Horizontal Lines","horizontal_lines",bt(t),2,9)}
          ${this._numberField("Price Decimals","price_decimals",vt(t),0,6)}
          ${this._numberField("Axis Decimals","axis_decimals",At(t),0,4)}
        </div>
        ${this._textField("Unit","unit",t.unit||pt)}
        <div class="grid">
          ${this._numberField("Y Min","min",t.min??"",void 0,void 0,!0)}
          ${this._numberField("Y Max","max",t.max??"",void 0,void 0,!0)}
        </div>
        <div class="toggles">
          ${this._checkbox("Use Sensor Colors","use_sensor_colors",!1!==t.use_sensor_colors)}
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
          ${this._colorField("Line","line_color",t.line_color||"#ffc928")}
          ${this._colorField("Marker","marker_color",t.marker_color||"#38c7f3")}
        </div>
        ${this._textField("Area Fill Color","fill_color",t.fill_color||"rgba(56, 199, 243, 0.18)")}
        ${this._textField("Grid Color","grid_color",t.grid_color||"rgba(255, 255, 255, 0.14)")}
        ${this._textField("Chart Background","chart_background",t.chart_background||"rgba(33, 52, 62, 0.88)")}
        <label>
          <span>Exact Color Overrides JSON</span>
          <textarea
            .value=${JSON.stringify(t.color_overrides||{},null,2)}
            @change=${t=>this._setColorOverrides(t.target.value)}
          ></textarea>
        </label>
      </div>
    `}_textField(t,e,r){return B`
      <label>
        <span>${t}</span>
        <input
          type="text"
          .value=${String(r??"")}
          @input=${t=>this._setValue(e,t.target.value||void 0)}
        />
      </label>
    `}_numberField(t,e,r,i,s,o=!1){return B`
      <label>
        <span>${t}</span>
        <input
          type="number"
          min=${i??G}
          max=${s??G}
          .value=${String(r??"")}
          @input=${t=>{const r=t.target.value,i=Number(r);this._setValue(e,o&&""===r?void 0:Number.isFinite(i)?i:void 0)}}
        />
      </label>
    `}_colorField(t,e,r){return B`
      <label>
        <span>${t}</span>
        <input
          type="color"
          .value=${r}
          @input=${t=>this._setValue(e,t.target.value)}
        />
      </label>
    `}_checkbox(t,e,r){return B`
      <label class="checkbox">
        <input
          type="checkbox"
          .checked=${r}
          @change=${t=>this._setValue(e,t.target.checked)}
        />
        <span>${t}</span>
      </label>
    `}_setColorOverrides(t){try{const e=JSON.parse(t||"{}");this._setValue("color_overrides",e&&"object"==typeof e?e:{})}catch{}}_setValue(t,e){const r={...this._config};void 0===e||""===e?delete r[t]:r[t]=e,this._config=r,mt(this,"config-changed",{config:r})}}Ut.properties={hass:{attribute:!1},_config:{state:!0}},Ut.styles=o`
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
  `,customElements.get("real-electricity-price-card")||customElements.define("real-electricity-price-card",Nt),customElements.get("real-electricity-price-card-editor")||customElements.define("real-electricity-price-card-editor",Ut),window.customCards=window.customCards||[],window.customCards.push({type:"real-electricity-price-card",name:"Real Electricity Price Card",description:"Interactive electricity price chart for real-electricity-price",preview:!1,version:"0.1.1"});
