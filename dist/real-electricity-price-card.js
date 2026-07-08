/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,r=Symbol(),i=new WeakMap;let s=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==r)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const r=this.t;if(e&&void 0===t){const e=void 0!==r&&1===r.length;e&&(t=i.get(r)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&i.set(r,t))}return t}toString(){return this.cssText}};const o=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,r,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+t[i+1],t[0]);return new s(i,t,r)},n=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const r of t.cssRules)e+=r.cssText;return(t=>new s("string"==typeof t?t:t+"",void 0,r))(e)})(t):t,{is:a,defineProperty:c,getOwnPropertyDescriptor:l,getOwnPropertyNames:h,getOwnPropertySymbols:d,getPrototypeOf:p}=Object,u=globalThis,m=u.trustedTypes,_=m?m.emptyScript:"",f=u.reactiveElementPolyfillSupport,g=(t,e)=>t,$={toAttribute(t,e){switch(e){case Boolean:t=t?_:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let r=t;switch(e){case Boolean:r=null!==t;break;case Number:r=null===t?null:Number(t);break;case Object:case Array:try{r=JSON.parse(t)}catch(t){r=null}}return r}},y=(t,e)=>!a(t,e),x={attribute:!0,type:String,converter:$,reflect:!1,useDefault:!1,hasChanged:y};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let b=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=x){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const r=Symbol(),i=this.getPropertyDescriptor(t,r,e);void 0!==i&&c(this.prototype,t,i)}}static getPropertyDescriptor(t,e,r){const{get:i,set:s}=l(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:i,set(e){const o=i?.call(this);s?.call(this,e),this.requestUpdate(t,o,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??x}static _$Ei(){if(this.hasOwnProperty(g("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(g("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(g("properties"))){const t=this.properties,e=[...h(t),...d(t)];for(const r of e)this.createProperty(r,t[r])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,r]of e)this.elementProperties.set(t,r)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const r=this._$Eu(t,e);void 0!==r&&this._$Eh.set(r,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const r=new Set(t.flat(1/0).reverse());for(const t of r)e.unshift(n(t))}else void 0!==t&&e.push(n(t));return e}static _$Eu(t,e){const r=e.attribute;return!1===r?void 0:"string"==typeof r?r:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const r of e.keys())this.hasOwnProperty(r)&&(t.set(r,this[r]),delete this[r]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const r=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((r,i)=>{if(e)r.adoptedStyleSheets=i.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of i){const i=document.createElement("style"),s=t.litNonce;void 0!==s&&i.setAttribute("nonce",s),i.textContent=e.cssText,r.appendChild(i)}})(r,this.constructor.elementStyles),r}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,r){this._$AK(t,r)}_$ET(t,e){const r=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,r);if(void 0!==i&&!0===r.reflect){const s=(void 0!==r.converter?.toAttribute?r.converter:$).toAttribute(e,r.type);this._$Em=t,null==s?this.removeAttribute(i):this.setAttribute(i,s),this._$Em=null}}_$AK(t,e){const r=this.constructor,i=r._$Eh.get(t);if(void 0!==i&&this._$Em!==i){const t=r.getPropertyOptions(i),s="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:$;this._$Em=i;const o=s.fromAttribute(e,t.type);this[i]=o??this._$Ej?.get(i)??o,this._$Em=null}}requestUpdate(t,e,r,i=!1,s){if(void 0!==t){const o=this.constructor;if(!1===i&&(s=this[t]),r??=o.getPropertyOptions(t),!((r.hasChanged??y)(s,e)||r.useDefault&&r.reflect&&s===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,r))))return;this.C(t,e,r)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:r,reflect:i,wrapped:s},o){r&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==s||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||r||(e=void 0),this._$AL.set(t,e)),!0===i&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,r]of t){const{wrapped:t}=r,i=this[e];!0!==t||this._$AL.has(e)||void 0===i||this.C(e,void 0,r,i)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};b.elementStyles=[],b.shadowRootOptions={mode:"open"},b[g("elementProperties")]=new Map,b[g("finalized")]=new Map,f?.({ReactiveElement:b}),(u.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const v=globalThis,w=t=>t,A=v.trustedTypes,E=A?A.createPolicy("lit-html",{createHTML:t=>t}):void 0,C="$lit$",k=`lit$${Math.random().toFixed(9).slice(2)}$`,S="?"+k,M=`<${S}>`,N=document,F=()=>N.createComment(""),P=t=>null===t||"object"!=typeof t&&"function"!=typeof t,T=Array.isArray,U="[ \t\n\f\r]",O=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,H=/-->/g,z=/>/g,I=RegExp(`>|${U}(?:([^\\s"'>=/]+)(${U}*=${U}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),R=/'/g,D=/"/g,L=/^(?:script|style|textarea|title)$/i,j=t=>(e,...r)=>({_$litType$:t,strings:e,values:r}),B=j(1),V=j(2),W=Symbol.for("lit-noChange"),q=Symbol.for("lit-nothing"),G=new WeakMap,J=N.createTreeWalker(N,129);function Z(t,e){if(!T(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(e):e}const K=(t,e)=>{const r=t.length-1,i=[];let s,o=2===e?"<svg>":3===e?"<math>":"",n=O;for(let e=0;e<r;e++){const r=t[e];let a,c,l=-1,h=0;for(;h<r.length&&(n.lastIndex=h,c=n.exec(r),null!==c);)h=n.lastIndex,n===O?"!--"===c[1]?n=H:void 0!==c[1]?n=z:void 0!==c[2]?(L.test(c[2])&&(s=RegExp("</"+c[2],"g")),n=I):void 0!==c[3]&&(n=I):n===I?">"===c[0]?(n=s??O,l=-1):void 0===c[1]?l=-2:(l=n.lastIndex-c[2].length,a=c[1],n=void 0===c[3]?I:'"'===c[3]?D:R):n===D||n===R?n=I:n===H||n===z?n=O:(n=I,s=void 0);const d=n===I&&t[e+1].startsWith("/>")?" ":"";o+=n===O?r+M:l>=0?(i.push(a),r.slice(0,l)+C+r.slice(l)+k+d):r+k+(-2===l?e:d)}return[Z(t,o+(t[r]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),i]};class Y{constructor({strings:t,_$litType$:e},r){let i;this.parts=[];let s=0,o=0;const n=t.length-1,a=this.parts,[c,l]=K(t,e);if(this.el=Y.createElement(c,r),J.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(i=J.nextNode())&&a.length<n;){if(1===i.nodeType){if(i.hasAttributes())for(const t of i.getAttributeNames())if(t.endsWith(C)){const e=l[o++],r=i.getAttribute(t).split(k),n=/([.?@])?(.*)/.exec(e);a.push({type:1,index:s,name:n[2],strings:r,ctor:"."===n[1]?rt:"?"===n[1]?it:"@"===n[1]?st:et}),i.removeAttribute(t)}else t.startsWith(k)&&(a.push({type:6,index:s}),i.removeAttribute(t));if(L.test(i.tagName)){const t=i.textContent.split(k),e=t.length-1;if(e>0){i.textContent=A?A.emptyScript:"";for(let r=0;r<e;r++)i.append(t[r],F()),J.nextNode(),a.push({type:2,index:++s});i.append(t[e],F())}}}else if(8===i.nodeType)if(i.data===S)a.push({type:2,index:s});else{let t=-1;for(;-1!==(t=i.data.indexOf(k,t+1));)a.push({type:7,index:s}),t+=k.length-1}s++}}static createElement(t,e){const r=N.createElement("template");return r.innerHTML=t,r}}function X(t,e,r=t,i){if(e===W)return e;let s=void 0!==i?r._$Co?.[i]:r._$Cl;const o=P(e)?void 0:e._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),void 0===o?s=void 0:(s=new o(t),s._$AT(t,r,i)),void 0!==i?(r._$Co??=[])[i]=s:r._$Cl=s),void 0!==s&&(e=X(t,s._$AS(t,e.values),s,i)),e}class Q{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:r}=this._$AD,i=(t?.creationScope??N).importNode(e,!0);J.currentNode=i;let s=J.nextNode(),o=0,n=0,a=r[0];for(;void 0!==a;){if(o===a.index){let e;2===a.type?e=new tt(s,s.nextSibling,this,t):1===a.type?e=new a.ctor(s,a.name,a.strings,this,t):6===a.type&&(e=new ot(s,this,t)),this._$AV.push(e),a=r[++n]}o!==a?.index&&(s=J.nextNode(),o++)}return J.currentNode=N,i}p(t){let e=0;for(const r of this._$AV)void 0!==r&&(void 0!==r.strings?(r._$AI(t,r,e),e+=r.strings.length-2):r._$AI(t[e])),e++}}class tt{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,r,i){this.type=2,this._$AH=q,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=r,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=X(this,t,e),P(t)?t===q||null==t||""===t?(this._$AH!==q&&this._$AR(),this._$AH=q):t!==this._$AH&&t!==W&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>T(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==q&&P(this._$AH)?this._$AA.nextSibling.data=t:this.T(N.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:r}=t,i="number"==typeof r?this._$AC(t):(void 0===r.el&&(r.el=Y.createElement(Z(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===i)this._$AH.p(e);else{const t=new Q(i,this),r=t.u(this.options);t.p(e),this.T(r),this._$AH=t}}_$AC(t){let e=G.get(t.strings);return void 0===e&&G.set(t.strings,e=new Y(t)),e}k(t){T(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let r,i=0;for(const s of t)i===e.length?e.push(r=new tt(this.O(F()),this.O(F()),this,this.options)):r=e[i],r._$AI(s),i++;i<e.length&&(this._$AR(r&&r._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=w(t).nextSibling;w(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class et{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,r,i,s){this.type=1,this._$AH=q,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=s,r.length>2||""!==r[0]||""!==r[1]?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=q}_$AI(t,e=this,r,i){const s=this.strings;let o=!1;if(void 0===s)t=X(this,t,e,0),o=!P(t)||t!==this._$AH&&t!==W,o&&(this._$AH=t);else{const i=t;let n,a;for(t=s[0],n=0;n<s.length-1;n++)a=X(this,i[r+n],e,n),a===W&&(a=this._$AH[n]),o||=!P(a)||a!==this._$AH[n],a===q?t=q:t!==q&&(t+=(a??"")+s[n+1]),this._$AH[n]=a}o&&!i&&this.j(t)}j(t){t===q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class rt extends et{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===q?void 0:t}}class it extends et{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==q)}}class st extends et{constructor(t,e,r,i,s){super(t,e,r,i,s),this.type=5}_$AI(t,e=this){if((t=X(this,t,e,0)??q)===W)return;const r=this._$AH,i=t===q&&r!==q||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,s=t!==q&&(r===q||i);i&&this.element.removeEventListener(this.name,this,r),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class ot{constructor(t,e,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){X(this,t)}}const nt=v.litHtmlPolyfillSupport;nt?.(Y,tt),(v.litHtmlVersions??=[]).push("3.3.3");const at=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class ct extends b{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,r)=>{const i=r?.renderBefore??e;let s=i._$litPart$;if(void 0===s){const t=r?.renderBefore??null;i._$litPart$=s=new tt(e.insertBefore(F(),t),t,void 0,r??{})}return s._$AI(t),s})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return W}}ct._$litElement$=!0,ct.finalized=!0,at.litElementHydrateSupport?.({LitElement:ct});const lt=at.litElementPolyfillSupport;lt?.({LitElement:ct}),(at.litElementVersions??=[]).push("4.2.2");const ht="sensor.real_electricity_price_chart_data",dt="sensor.real_electricity_price_hourly_prices_today",pt="sensor.real_electricity_price_hourly_prices_tomorrow",ut="sensor.real_electricity_price_current_price",mt="number.real_electricity_price_acceptable_price",_t="€/kWh",ft=36e5,gt=48,$t={"#bfdbfe":"past_color","#3b82f6":"current_hour_color","#93c5fd":"future_color","#bbf7d0":"cheap_past_color","#86efac":"cheap_color","#22c55e":"cheap_current_color"};function yt(t,e,r){t.dispatchEvent(new CustomEvent(e,{detail:r,bubbles:!0,composed:!0}))}function xt(t,e,r){const i=Number(t);if(Number.isFinite(i))return Math.max(e,Math.min(r,i))}function bt(t){if("string"!=typeof t)return;return t.trim()||void 0}function vt(t){if("number"==typeof t&&Number.isFinite(t))return t;if("string"==typeof t){const e=Number(t);if(Number.isFinite(e))return e;const r=new Date(t).getTime();if(Number.isFinite(r))return r}}function wt(...t){for(const e of t){if(null==e||""===e)continue;const t=Number(e);if(Number.isFinite(t))return t}}function At(t){const e=t?.attributes?.hourly_prices;return Array.isArray(e)?e.reduce((t,e)=>{const r=e,i=Array.isArray(r)?vt(r[0]):vt(r.start_time)??vt(r.x),s=Array.isArray(r)?wt(r[1]):wt(r.actual_price,r.price,r.y,r.nord_pool_price);return void 0===i||void 0===s||t.push({timestamp:i,value:s,sourceTimestamp:i,startTime:Array.isArray(r)?void 0:r.start_time}),t},[]).sort((t,e)=>t.timestamp-e.timestamp):[]}function Et(t,e){const r=[...t].sort((t,e)=>t.timestamp-e.timestamp),i=e+864e5;for(let t=0;t<=r.length-24;t+=1){const s=r.slice(t,t+24),o=Lt(s[0].timestamp,e+ft),n=Lt(s[s.length-1].timestamp,i);if(o&&n)return s.map((t,r)=>({...t,sourceTimestamp:t.timestamp,timestamp:e+r*ft}))}return r.filter(t=>t.timestamp>=e&&t.timestamp<i)}function Ct(t){return"line"===(t.chart_type||t.graph_type)?"line":"bar"}function kt(t){return"hourly"===t.data_source||"chart_data"===t.data_source?t.data_source:"auto"}function St(t){return"click"===t.selector_mode?"click":"hover"}function Mt(t){return xt(t.height,120,360)||190}function Nt(t){return Math.round(xt(t.horizontal_lines,2,9)||5)}function Ft(t){return Math.round(xt(t.price_decimals,0,6)??4)}function Pt(t){return Math.round(xt(t.axis_decimals,0,4)??2)}function Tt(t,e,r=Ft(e)){return void 0!==t&&Number.isFinite(t)?`${t.toFixed(r)} ${e.unit||_t}`:"—"}function Ut(t){const e={hour:"2-digit",minute:"2-digit"},r=String(t?.locale?.time_format||"").toLowerCase();return"12"===r&&(e.hour12=!0),"24"===r&&(e.hour12=!1),e}function Ot(t){const e=t?.config?.time_zone;return"string"==typeof e&&e.trim()?e.trim():void 0}function Ht(t,e,r){const i=Ot(t),s=new Date(e);try{return new Intl.DateTimeFormat(t?.locale?.language,i?{...r,timeZone:i}:r).format(s)}catch{return new Intl.DateTimeFormat(t?.locale?.language,r).format(s)}}function zt(t,e){return`${function(t,e){return Ht(t,e,{day:"numeric",month:"long"})}(t,e)} ${function(t,e){return Ht(t,e,{...Ut(t)})}(t,e)}`}function It(t,e,r){return new Intl.DateTimeFormat("en-US",{...r,timeZone:e}).formatToParts(new Date(t)).reduce((t,e)=>("literal"!==e.type&&(t[e.type]=e.value),t),{})}function Rt(t,e){const r=It(t,e,{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",hourCycle:"h23"}),i=Number(r.year),s=Number(r.month),o=Number(r.day),n=Number(r.hour),a=Number(r.minute),c=Number(r.second);return[i,s,o,n,a,c].every(Number.isFinite)?Date.UTC(i,s-1,o,n,a,c)-t:0}function Dt(t){const e=new Date;e.setHours(0,0,0,0);const r=function(t){const e=Ot(t);if(e)try{const t=It(Date.now(),e,{year:"numeric",month:"2-digit",day:"2-digit"}),r=Number(t.year),i=Number(t.month),s=Number(t.day);if(![r,i,s].every(Number.isFinite))return;const o=Date.UTC(r,i-1,s,0,0,0,0),n=Rt(o,e);return o-Rt(o-n,e)}catch{return}}(t)??e.getTime();return{start:r,end:r+gt*ft}}function Lt(t,e){return Math.abs(t-e)<6e4}function jt(t,e,r){const i=e.entity||ht,s=t?.states[i],o=function(t){const e=t?.attributes?.chart_data;return Array.isArray(e)?e.reduce((t,e)=>{const r=e,i=Array.isArray(r)?vt(r[0]):vt(r.x)??vt(r.start_time),s=Number(Array.isArray(r)?r[1]:r.y);return void 0!==i&&Number.isFinite(s)?(t.push({timestamp:i,value:s,color:Array.isArray(r)?void 0:bt(r.fillColor),startTime:Array.isArray(r)?void 0:r.start_time,formattedTime:Array.isArray(r)?void 0:r.formatted_time,formattedPrice:Array.isArray(r)?void 0:r.formatted_price}),t):t},[]).sort((t,e)=>t.timestamp-e.timestamp):[]}(s),n=function(t,e){const r=[...t].sort((t,e)=>t.timestamp-e.timestamp);for(let t=0;t<=r.length-gt;t+=1){const i=r.slice(t,t+gt),s=Lt(i[0].timestamp,e.start+ft),o=Lt(i[i.length-1].timestamp,e.end);if(s&&o)return i.map((t,r)=>({...t,sourceTimestamp:t.timestamp,timestamp:e.start+r*ft}))}return function(t,e){return t.filter(t=>t.timestamp>=e.start&&t.timestamp<e.end)}(r,e)}(o,r);return{points:n.length?n:o,moreInfoEntityId:s?i:void 0,missingEntityIds:s?[]:[i],source:"chart_data"}}function Bt(t,e,r){const i=kt(e);if("chart_data"!==i){const s=function(t,e,r){const i=e.today_entity||dt,s=e.tomorrow_entity||pt,o=t?.states[i],n=t?.states[s],a=Et(At(o),r.start),c=Et(At(n),r.start+864e5),l=[o?void 0:i,n?void 0:s].filter(t=>Boolean(t));return{points:[...a,...c].sort((t,e)=>t.timestamp-e.timestamp),moreInfoEntityId:o?i:n?s:void 0,missingEntityIds:l,source:"hourly"}}(t,e,r);if(s.points.length||"hourly"===i)return s}return jt(t,e,r)}function Vt(t,e,r){const i=r.width-r.left-r.right,s=Math.max(1,e.end-e.start);return r.left+(t-e.start)/s*i}function Wt(t,e){if(!t.length)return 0;if(e<=t[0].timestamp)return 0;let r=0;for(let i=1;i<t.length&&!(t[i].timestamp>e);i+=1)r=i;return r}function qt(t){if(!t.length)return"";if(1===t.length)return`M ${t[0].x.toFixed(2)} ${t[0].y.toFixed(2)}`;let e=`M ${t[0].x.toFixed(2)} ${t[0].y.toFixed(2)}`;for(let r=0;r<t.length-1;r+=1){const i=t[r],s=t[r+1],o=t[r-1]||i,n=t[r+2]||s,a=i.x+(s.x-o.x)/6,c=i.y+(s.y-o.y)/6,l=s.x-(n.x-i.x)/6,h=s.y-(n.y-i.y)/6;e+=` C ${a.toFixed(2)} ${c.toFixed(2)}, ${l.toFixed(2)} ${h.toFixed(2)}, ${s.x.toFixed(2)} ${s.y.toFixed(2)}`}return e}function Gt(t,e,r,i){const s=(o=t.color)?o.trim().toLowerCase():void 0;var o;const n=s?e.color_overrides?.[s]||e.color_overrides?.[t.color||""]:void 0;if(n)return n;const a=s?$t[s]:void 0;return!1!==e.use_sensor_colors&&a&&bt(e[a])?String(e[a]):!1!==e.use_sensor_colors&&t.color?t.color:function(t,e,r,i){const s=t.sourceTimestamp??t.timestamp,o=i>=s&&i<s+ft,n=s+ft<=i,a=void 0!==r&&t.value<=r;return o&&a?e.cheap_current_color||"#22c55e":o?e.current_hour_color||"#3b82f6":n&&a?e.cheap_past_color||"#bbf7d0":n?e.past_color||"#bfdbfe":a?e.cheap_color||"#86efac":e.future_color||"#93c5fd"}(t,e,r,i)}function Jt(t){return{entity:ht,data_source:"auto",today_entity:dt,tomorrow_entity:pt,current_price_entity:ut,cheap_price_entity:mt,chart_type:"bar",selector_mode:"hover",height:190,horizontal_lines:5,price_decimals:4,axis_decimals:2,unit:_t,show_current_marker:!0,show_extremes:!0,show_stats:!0,use_sensor_colors:!0,line_color:"#ffc928",fill_color:"rgba(56, 199, 243, 0.18)",marker_color:"#38c7f3",grid_color:"rgba(255, 255, 255, 0.14)",chart_background:"rgba(33, 52, 62, 0.88)",card_background:"var(--ha-card-background, var(--card-background-color, #1f1f1f))",color_overrides:{},...t}}class Zt extends ct{constructor(){super(...arguments),this._dragging=!1,this._stopPointer=t=>{this._dragging=!1;try{t.currentTarget.releasePointerCapture(t.pointerId)}catch{}}}static async getConfigElement(){return await customElements.whenDefined("real-electricity-price-card-editor"),document.createElement("real-electricity-price-card-editor")}static getStubConfig(){return{type:"custom:real-electricity-price-card",data_source:"auto",today_entity:dt,tomorrow_entity:pt,current_price_entity:ut,chart_type:"bar"}}setConfig(t){this._config=Jt(t||{})}connectedCallback(){super.connectedCallback(),this._clockTimer=window.setInterval(()=>this.requestUpdate(),3e4)}disconnectedCallback(){void 0!==this._clockTimer&&(window.clearInterval(this._clockTimer),this._clockTimer=void 0),super.disconnectedCallback()}getCardSize(){const t=Mt(this._config||{});return Math.max(3,Math.ceil((t+150)/50))}render(){if(!this._config)return B``;const t=Jt(this._config),e=Dt(this.hass),r=Bt(this.hass,t,e);if(!r.points.length){const t=r.missingEntityIds.length?` Missing: ${r.missingEntityIds.join(", ")}`:"",e="hourly"===r.source?"hourly_prices":"chart_data";return this._renderError(`No ${e} found.${t}`)}const i=Ct(t),s=St(t),o="string"==typeof t.name?t.name.trim():"",n={width:360,height:Mt(t),left:8,right:34,top:15,bottom:24},a=r.points,c=function(t,e){const r=t.map(t=>t.value),i=Math.min(...r),s=Math.max(...r),o=Number(e.min),n=Number(e.max);let a=Number.isFinite(o)?o:Math.min(0,i),c=Number.isFinite(n)?n:s;const l=Math.max(.08*(c-a),.005);return Number.isFinite(o)||(a-=i<0?l:0),Number.isFinite(n)||(c+=l),c<=a&&(c=a+.01),{min:a,max:c}}(a,t),l=function(t,e,r,i){const s=e.height-e.top-e.bottom;return t.map(t=>({...t,x:Vt(t.timestamp,i,e),y:e.top+(r.max-t.value)/(r.max-r.min)*s}))}(a,n,c,e),h=(n.width-n.left-n.right)/gt,d=Date.now(),p=void 0!==this._selectedIndex,u=Math.max(0,Math.min(l.length-1,p?this._selectedIndex??0:Wt(l,d))),m=p?"bar"===i?function(t,e){return{...t,x:t.x+e/2,sourceTimestamp:t.sourceTimestamp??t.timestamp}}(l[u],h):l[u]:function(t,e,r,i){const s=t[function(t,e){if(!t.length)return 0;const r=t=>t.sourceTimestamp??t.timestamp;if(e<=r(t[0]))return 0;let i=0;for(let s=1;s<t.length&&!(r(t[s])>e);s+=1)i=s;return i}(t,e)];return e<r.start||e>r.end?s:{...s,timestamp:e,x:Vt(e,r,i),sourceTimestamp:s.sourceTimestamp??s.timestamp}}(l,d,e,n),_=l.reduce((t,e)=>e.value<t.value?e:t,l[0]),f=l.reduce((t,e)=>e.value>t.value?e:t,l[0]),g=function(t,e){const r=e.current_price_entity||ut,i=t?.states[r]?.state,s=Number(i);return Number.isFinite(s)?s:void 0}(this.hass,t),$=function(t,e){const r=Number(e.cheap_threshold);if(Number.isFinite(r))return r;const i=e.cheap_price_entity||mt;return wt(t?.states[i]?.state)}(this.hass,t),y=r.moreInfoEntityId||t.current_price_entity||ut;return B`
      <ha-card class="price-card" style=${`--rep-card-bg:${t.card_background};--rep-chart-bg:${t.chart_background};--rep-grid:${t.grid_color};--rep-marker:${t.marker_color};`}>
        <div class="price-content">
          ${o?B`
            <div class="price-head">
              <button class="price-title" @click=${()=>this._openMoreInfo(y)}>
                <span>${o}</span>
              </button>
            </div>
          `:q}

          ${!1===t.show_stats?q:this._renderStats(t,a,_,f,g)}

          <div class="price-chart-frame">
            <div class="price-chart-head">
              <div class="price-selected">
                <span>${zt(this.hass,m.timestamp)}</span>
                <strong>${Tt(m.value,t)}</strong>
              </div>
            </div>
            <div class="price-chart-body">
              ${this._renderChart(t,n,l,m,_,f,c,i,s,e,$,d)}
              <span
                class="price-selected-dot"
                style=${`left:${(m.x/n.width*100).toFixed(2)}%;top:${(m.y/n.height*100).toFixed(2)}%;`}
              ></span>
            </div>
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
          <strong>${Tt(s,t)}</strong>
        </div>
        <div class="price-stat">
          <span>Low</span>
          <strong>${Tt(r.value,t)}</strong>
        </div>
        <div class="price-stat">
          <span>Average</span>
          <strong>${Tt(function(t){if(t.length)return t.reduce((t,e)=>t+e.value,0)/t.length}(e),t)}</strong>
        </div>
        <div class="price-stat">
          <span>High</span>
          <strong>${Tt(i.value,t)}</strong>
        </div>
      </div>
    `}_renderChart(t,e,r,i,s,o,n,a,c,l,h,d){const p=e.height-e.bottom,u=Math.max(e.top,Math.min(p,e.top+(n.max-0)/(n.max-n.min)*(e.height-e.top-e.bottom))),m=(e.width-e.left-e.right)/gt,_=Math.max(2,Math.min(14,.9*m)),f=function(t){return[0,gt/3,2*gt/3,gt].map(e=>t.start+e*ft)}(l),g=Vt(Date.now(),l,e),$=!1!==t.show_current_marker&&g>=e.left&&g<=e.width-e.right,y="bar"===a?s.x+m/2:s.x,x="bar"===a?o.x+m/2:o.x,b="rep-line-fill",v="rep-line-color",w=Math.max(1,e.width-e.left-e.right);return B`
      <svg
        class="price-chart"
        viewBox=${`0 0 ${e.width} ${e.height}`}
        preserveAspectRatio="none"
        role="img"
        aria-label="Electricity price chart"
        @pointerdown=${t=>this._selectPoint(t,r,e,c,l)}
        @pointermove=${t=>this._selectPoint(t,r,e,c,l)}
        @pointerup=${this._stopPointer}
        @pointercancel=${this._stopPointer}
        @pointerleave=${this._stopPointer}
      >
        <defs>
          <linearGradient id=${b} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stop-color=${t.fill_color||"rgba(56, 199, 243, 0.20)"}></stop>
            <stop offset="100%" stop-color="rgba(56, 199, 243, 0.04)"></stop>
          </linearGradient>
          <linearGradient id=${v} x1=${e.left} x2=${e.width-e.right} y1="0" y2="0" gradientUnits="userSpaceOnUse">
            ${r.map(r=>V`
              <stop offset=${`${Math.max(0,Math.min(100,(r.x-e.left)/w*100))}%`} stop-color=${Gt(r,t,h,d)}></stop>
            `)}
          </linearGradient>
        </defs>
        ${this._renderGrid(t,e,n,f,l)}
        ${"line"===a?this._renderLineChart(r,p,b,v,t):this._renderBarChart(r,u,_,m,i,t,h,d)}
        ${$?V`<line class="price-current-line" x1=${g} x2=${g} y1=${e.top} y2=${p}></line>`:q}
        ${!1===t.show_extremes?q:V`
          <text class="price-extreme" x=${y} y=${Math.max(11,s.y-9)}>L</text>
          <text class="price-extreme" x=${x} y=${Math.max(11,o.y-9)}>H</text>
        `}
        <line class="price-selected-line" x1=${i.x} x2=${i.x} y1=${e.top} y2=${p}></line>
        <title>${zt(this.hass,i.timestamp)} ${Tt(i.value,t)}</title>
        <desc>${r.length} available hourly electricity price points in a fixed ${gt}-hour chart window.</desc>
      </svg>
    `}_renderGrid(t,e,r,i,s){const o=e.height-e.bottom,n=Nt(t);return[...Array.from({length:n},(i,s)=>{const a=1-s/(n-1),c=e.top+s/(n-1)*(o-e.top),l=r.min+(r.max-r.min)*a;return V`
          <line class="price-grid-line" x1=${e.left} x2=${e.width-e.right} y1=${c} y2=${c}></line>
          <text class="price-axis-label" x=${e.width-2} y=${c}>${function(t,e){return`${t.toFixed(Pt(e))}€`}(l,t)}</text>
        `}),...i.map((t,r)=>{const n=Vt(t,s,e),a=0===r?" price-time-label-start":r===i.length-1?" price-time-label-end":"";return V`
          <line class="price-time-line" x1=${n} x2=${n} y1=${e.top} y2=${o}></line>
          <text class=${`price-time-label${a}`} x=${n} y=${e.height-6}>${function(t,e){return zt(t,e)}(this.hass,t)}</text>
        `})]}_renderBarChart(t,e,r,i,s,o,n,a){const c=s.timestamp,l=s.sourceTimestamp,h=Math.max(0,(i-r)/2);return t.map(t=>{const i=Math.min(t.y,e),s=Math.max(1,Math.abs(e-t.y)),d=t.timestamp===c||void 0!==l&&t.sourceTimestamp===l?" price-bar-selected":"";return V`
        <rect
          class=${`price-bar${d}`}
          x=${t.x+h}
          y=${i}
          width=${r}
          height=${s}
          rx="2.5"
          fill=${Gt(t,o,n,a)}
        ></rect>
      `})}_renderLineChart(t,e,r,i,s){const o=qt(t),n=function(t,e){if(!t.length)return"";const r=t[0],i=t[t.length-1];return`${qt(t)} L ${i.x.toFixed(2)} ${e.toFixed(2)} L ${r.x.toFixed(2)} ${e.toFixed(2)} Z`}(t,e),a=!1===s.use_sensor_colors?s.line_color||"#ffc928":`url(#${i})`;return V`
      <path class="price-line-area" d=${n} fill=${`url(#${r})`}></path>
      <path class="price-line-shadow" d=${o}></path>
      <path class="price-line" d=${o} stroke=${a}></path>
    `}_selectPoint(t,e,r,i,s){const o="hover"===i&&"pointermove"===t.type&&"touch"!==t.pointerType;if("pointermove"===t.type&&!o&&!this._dragging)return;if("pointerdown"===t.type){this._dragging=!0;try{t.currentTarget.setPointerCapture(t.pointerId)}catch{}}t.preventDefault();const n=t.currentTarget.getBoundingClientRect(),a=function(t,e,r){const i=r.width-r.left-r.right,s=Math.max(1,e.end-e.start),o=Math.max(r.left,Math.min(r.width-r.right,t));return e.start+(o-r.left)/Math.max(1,i)*s}((t.clientX-n.left)/Math.max(1,n.width)*r.width,s,r);this._selectedIndex=Wt(e,a)}_openMoreInfo(t){t&&yt(this,"hass-more-info",{entityId:t})}}Zt.properties={hass:{attribute:!1},_config:{state:!0},_selectedIndex:{state:!0}},Zt.styles=o`
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
      display: grid;
      gap: 5px;
      padding: 7px 8px 6px;
      box-sizing: border-box;
      border-radius: 10px;
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
        padding: 12px;
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
  `;class Kt extends ct{constructor(){super(...arguments),this._config=Zt.getStubConfig()}setConfig(t){this._config=Jt(t||{})}render(){const t=Jt(this._config);return B`
      <div class="editor">
        ${this._textField("Name (optional)","name",t.name||"")}
        <label>
          <span>Data Source</span>
          <select .value=${kt(t)} @change=${t=>this._setValue("data_source",t.target.value)}>
            <option value="auto">Hourly sensors, fallback to chart data</option>
            <option value="hourly">Hourly sensors only</option>
            <option value="chart_data">Chart data sensor only</option>
          </select>
        </label>
        <div class="grid">
          ${this._textField("Today Prices Entity","today_entity",t.today_entity||dt)}
          ${this._textField("Tomorrow Prices Entity","tomorrow_entity",t.tomorrow_entity||pt)}
        </div>
        ${this._textField("Chart Data Entity (fallback)","entity",t.entity||ht)}
        ${this._textField("Current Price Entity","current_price_entity",t.current_price_entity||ut)}
        ${this._textField("Acceptable Price Entity","cheap_price_entity",t.cheap_price_entity||mt)}
        <label>
          <span>Chart Type</span>
          <select .value=${Ct(t)} @change=${t=>this._setValue("chart_type",t.target.value)}>
            <option value="bar">Bars</option>
            <option value="line">Line</option>
          </select>
        </label>
        <label>
          <span>Selector Mode</span>
          <select .value=${St(t)} @change=${t=>this._setValue("selector_mode",t.target.value)}>
            <option value="hover">Hover</option>
            <option value="click">Click / tap</option>
          </select>
        </label>
        <div class="grid">
          ${this._numberField("Height","height",Mt(t),120,360)}
          ${this._numberField("Horizontal Lines","horizontal_lines",Nt(t),2,9)}
          ${this._numberField("Price Decimals","price_decimals",Ft(t),0,6)}
          ${this._numberField("Axis Decimals","axis_decimals",Pt(t),0,4)}
        </div>
        ${this._textField("Unit","unit",t.unit||_t)}
        <div class="grid">
          ${this._numberField("Y Min","min",t.min??"",void 0,void 0,!0)}
          ${this._numberField("Y Max","max",t.max??"",void 0,void 0,!0)}
          ${this._numberField("Cheap Threshold","cheap_threshold",t.cheap_threshold??"",void 0,void 0,!0)}
        </div>
        <div class="toggles">
          ${this._checkbox("Use Chart Data Colors","use_sensor_colors",!1!==t.use_sensor_colors)}
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
          min=${i??q}
          max=${s??q}
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
    `}_setColorOverrides(t){try{const e=JSON.parse(t||"{}");this._setValue("color_overrides",e&&"object"==typeof e?e:{})}catch{}}_setValue(t,e){const r={...this._config};void 0===e||""===e?delete r[t]:r[t]=e,this._config=r,yt(this,"config-changed",{config:r})}}Kt.properties={hass:{attribute:!1},_config:{state:!0}},Kt.styles=o`
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
  `,customElements.get("real-electricity-price-card")||customElements.define("real-electricity-price-card",Zt),customElements.get("real-electricity-price-card-editor")||customElements.define("real-electricity-price-card-editor",Kt),window.customCards=window.customCards||[],window.customCards.push({type:"real-electricity-price-card",name:"Real Electricity Price Card",description:"Interactive electricity price chart for real-electricity-price",preview:!1,version:"0.1.11"});
