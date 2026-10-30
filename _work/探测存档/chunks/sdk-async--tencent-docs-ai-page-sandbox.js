"use strict";(self.webpackChunk_mindx_app_mindx=self.webpackChunk_mindx_app_mindx||[]).push([["29507"],{2221(e,t,r){r.d(t,{Rk:()=>n,Rt:()=>h,iV:()=>o,k5:()=>a,yj:()=>u});var s=r(42924);let n={READY:"SMARTPAGE_LOADER_READY",INJECT_SCRIPT:"SMARTPAGE_INJECT_SCRIPT",SCRIPT_INJECTED:"SMARTPAGE_SCRIPT_INJECTED",WEBSITE_ERROR:"WEBSITE_ERROR",REQUEST_READY:"SMARTPAGE_REQUEST_READY"},i=3e4;class o{inject(e){if(!this.destroyed){for(let r of e){var t;!this.completedKinds.has(r.kind)&&((null==(t=this.current)?void 0:t.kind)===r.kind||this.queue.some(e=>e.kind===r.kind)||this.queue.push(r))}this.processNext()}}destroy(){this.destroyed||(this.destroyed=!0,window.removeEventListener("message",this.boundOnMessage),this.timer&&(clearTimeout(this.timer),this.timer=null),this.queue=[],this.current=null)}processNext(){if(this.destroyed||null!==this.current)return;let e=this.queue.shift();if(!e)return;var t;this.current=e,this.scriptSent=!1;let r=null!=(t=e.timeoutMs)?t:i;if(this.timer=setTimeout(()=>{this.scriptSent?this.finish(e.kind,null):this.finish(e.kind,Error(`[ScriptInjector] timed out waiting for SMARTPAGE_LOADER_READY (kind=${e.kind}). Ensure backend has injected /smartpage_comm/inject.js into the HTML <head>.`))},r),this.loaderNonce)this.sendScript(e);else try{var s;null==(s=this.iframe.contentWindow)||s.postMessage({type:n.REQUEST_READY},"*")}catch(e){}}sendScript(e){var t;this.scriptSent||this.destroyed||(this.scriptSent=!0,null==(t=this.iframe.contentWindow)||t.postMessage({type:n.INJECT_SCRIPT,loaderNonce:this.loaderNonce,kind:e.kind,script:e.script},"*"))}handleMessage(e){if(this.destroyed||e.source!==this.iframe.contentWindow)return;let t=e.data;if(t&&"object"==typeof t){if(t.type===n.READY&&"string"==typeof t.loaderNonce){this.loaderNonce=t.loaderNonce,this.current&&!this.scriptSent&&this.sendScript(this.current);return}if(t.type===n.SCRIPT_INJECTED){var r;let e=t.kind;if(e!==(null==(r=this.current)?void 0:r.kind))return;if(!0===t.success)this.finish(e,null);else{var s;let r=null!=(s=t.error)?s:"unknown";/already injected/i.test(r)?this.finish(e,null):this.finish(e,Error(`[ScriptInjector] inject ${e} failed: ${r}`))}}}}finish(e,t){var r;this.destroyed||e!==(null==(r=this.current)?void 0:r.kind)||(this.timer&&(clearTimeout(this.timer),this.timer=null),this.completedKinds.add(e),this.current=null,t?null==this.onError||this.onError.call(this,e,t):null==this.onInjected||this.onInjected.call(this,e),this.processNext())}constructor(e){this.completedKinds=new Set,this.current=null,this.queue=[],this.loaderNonce=null,this.timer=null,this.scriptSent=!1,this.destroyed=!1,this.iframe=e.iframe,this.onInjected=e.onInjected,this.onError=e.onError,this.boundOnMessage=this.handleMessage.bind(this),window.addEventListener("message",this.boundOnMessage)}}let a=(0,s.forwardRef)(({htmlBundleUrl:e,sandbox:t=["allow-scripts","allow-same-origin","allow-popups","allow-popups-to-escape-sandbox","allow-forms","allow-modals"],bridge:r,onLoad:n,onError:i,scripts:a,onBridgeReady:l,onScriptInjected:d},u)=>{let c=(0,s.useRef)(null);(0,s.useImperativeHandle)(u,()=>({iframeRef:c}),[c]);let[h,m]=(0,s.useState)(null),p=(0,s.useRef)(i);p.current=i;let g=(0,s.useRef)(n);g.current=n;let f=(0,s.useRef)(l);f.current=l;let v=(0,s.useRef)(d);v.current=d;let E=(0,s.useRef)(a);return(E.current=a,(0,s.useEffect)(()=>{let e=c.current;if(!e)return;let t=()=>{try{r&&e.contentWindow&&(r.init(e.contentWindow,"*"),null==f.current||f.current.call(f,r)),null==g.current||g.current.call(g)}catch(t){let e=t instanceof Error?t:Error(String(t));m(e),null==p.current||p.current.call(p,e)}},s=()=>{let e=Error("Failed to load iframe content");m(e),null==p.current||p.current.call(p,e)};e.addEventListener("load",t),e.addEventListener("error",s);try{let r=e.contentDocument;(null==r?void 0:r.readyState)==="complete"&&e.contentWindow&&t()}catch(e){}return()=>{e.removeEventListener("load",t),e.removeEventListener("error",s)}},[r]),(0,s.useEffect)(()=>{let e=c.current;if(!e||!E.current||0===E.current.length)return;let t=new o({iframe:e,onInjected:e=>{null==v.current||v.current.call(v,e)},onError:(e,t)=>{null==p.current||p.current.call(p,t)}});return t.inject(E.current),()=>{t.destroy()}},[e]),h)?s.createElement("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",width:"100%",height:"100%",padding:"40px 20px"}},s.createElement("div",{style:{maxWidth:420,textAlign:"center",color:"#666",fontSize:14,lineHeight:1.6}},s.createElement("div",{style:{fontSize:40,marginBottom:16}},"⚠️"),s.createElement("p",{style:{margin:"0 0 8px",fontWeight:500,color:"#333"}},"页面加载失败"),s.createElement("p",{style:{margin:0,fontSize:12,color:"#999"}},h.message))):s.createElement("div",{style:{position:"relative",width:"100%",height:"100%",overflow:"hidden"}},s.createElement("iframe",{ref:c,src:e,sandbox:t.join(" "),style:{width:"100%",height:"100%",border:"none"}}))}),l="scroll";function d(){return`;(function(){
  "use strict";
  if (window.__SMARTPAGE_OVERLAY_SCROLLBAR__) return;
  window.__SMARTPAGE_OVERLAY_SCROLLBAR__ = true;

  function parseLum(color) {
    if (!color || color === "transparent") return null;
    var m = String(color).match(/rgba?\\(\\s*(\\d+)[\\s,]+(\\d+)[\\s,]+(\\d+)/);
    if (!m) return null;
    var a = 1;
    var am = String(color).match(/rgba\\([^)]*?[,/]\\s*([\\d.]+)\\s*\\)/);
    if (am) a = +am[1];
    if (a < 0.1) return null;
    return (0.2126 * +m[1] + 0.7152 * +m[2] + 0.0722 * +m[3]) / 255;
  }

  function isDarkPage() {
    try {
      var html = document.documentElement;
      var body = document.body;
      var l = html ? parseLum(getComputedStyle(html).backgroundColor) : null;
      if (l === null && body) l = parseLum(getComputedStyle(body).backgroundColor);
      if (l !== null) return l < 0.5;
      var tc = getComputedStyle(body || html).color;
      var tl = parseLum(tc);
      return tl !== null && tl > 0.55;
    } catch (_) {
      return false;
    }
  }

  function classicGutter() {
    try {
      var root = document.documentElement;
      if (!root) return 0;
      var d = document.createElement("div");
      d.style.cssText = "position:absolute;top:-9999px;width:100px;height:100px;overflow:scroll;";
      root.appendChild(d);
      var w = d.offsetWidth - d.clientWidth;
      root.removeChild(d);
      return w;
    } catch (_) {
      return 0;
    }
  }

  var STYLE_ID = "smartpage-overlay-scrollbar";
  // gutter 是系统级度量，与页面内容无关，可在 <head> 阶段提前测。
  var classic = classicGutter() > 0;
  var mounted = false;

  function ensureStyle() {
    var s = document.getElementById(STYLE_ID);
    if (!s) {
      s = document.createElement("style");
      s.id = STYLE_ID;
      (document.head || document.documentElement).appendChild(s);
    }
    return s;
  }

  // 关键：脚本在 <head> 里同步执行时立刻隐藏原生竖条，赶在首帧之前，
  // 否则会先带占位条渲染、等 DOMContentLoaded 才变浮动（闪现）。
  // 此刻 body 未就绪、明暗读不准，只做隐藏；color-scheme 与滑块延后。
  if (classic) {
    ensureStyle().textContent =
      "html::-webkit-scrollbar{width:0!important}" +
      "body::-webkit-scrollbar{width:0!important}";
  }

  function mountBar(dark) {
    if (mounted || !classic || !document.body) return;
    mounted = true;

    var thumbColor = dark ? "rgba(255,255,255,0.34)" : "rgba(0,0,0,0.3)";
    var thumbHover = dark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.5)";
    var scroller = document.scrollingElement || document.documentElement;

    var bar = document.createElement("div");
    bar.setAttribute("data-smartpage-scrollbar", "1");
    bar.style.cssText = [
      "position:fixed", "top:0", "right:2px", "width:6px", "height:40px",
      "border-radius:3px", "background:" + thumbColor, "opacity:0",
      "transition:opacity .25s", "z-index:2147483647", "pointer-events:auto",
      "cursor:default", "will-change:transform,height"
    ].join(";");
    document.body.appendChild(bar);

    var hovering = false;
    var dragging = false;
    var dragStartY = 0;
    var dragStartScroll = 0;
    var hideTimer = null;

    function metrics() {
      var sh = scroller.scrollHeight;
      var ch = window.innerHeight || scroller.clientHeight;
      var st = scroller.scrollTop || window.pageYOffset || 0;
      return { sh: sh, ch: ch, st: st };
    }

    function update() {
      var m = metrics();
      var scrollable = m.sh - m.ch;
      if (scrollable <= 1) {
        bar.style.opacity = "0";
        return 0;
      }
      var th = Math.max(24, (m.ch * m.ch) / m.sh);
      var maxTop = m.ch - th;
      var top = maxTop * (m.st / scrollable);
      bar.style.height = th + "px";
      bar.style.transform = "translateY(" + top + "px)";
      return scrollable;
    }

    function show() {
      if (update() <= 0) return;
      bar.style.opacity = "1";
      clearTimeout(hideTimer);
      hideTimer = setTimeout(function () {
        if (!dragging && !hovering) bar.style.opacity = "0";
      }, 1200);
    }

    bar.addEventListener("mouseenter", function () {
      hovering = true;
      bar.style.background = thumbHover;
      if (update() > 0) bar.style.opacity = "1";
    });
    bar.addEventListener("mouseleave", function () {
      hovering = false;
      bar.style.background = thumbColor;
      show();
    });
    bar.addEventListener("mousedown", function (e) {
      dragging = true;
      dragStartY = e.clientY;
      dragStartScroll = metrics().st;
      document.documentElement.style.userSelect = "none";
      e.preventDefault();
    });
    window.addEventListener("mousemove", function (e) {
      if (!dragging) return;
      var m = metrics();
      var th = parseFloat(bar.style.height) || 24;
      var maxTop = m.ch - th;
      var scrollable = m.sh - m.ch;
      if (maxTop <= 0) return;
      var dy = e.clientY - dragStartY;
      scroller.scrollTop = dragStartScroll + dy * (scrollable / maxTop);
    });
    window.addEventListener("mouseup", function () {
      if (!dragging) return;
      dragging = false;
      document.documentElement.style.userSelect = "";
      show();
    });

    window.addEventListener("scroll", show, { passive: true, capture: true });
    window.addEventListener("resize", show);
    try {
      var ro = new ResizeObserver(show);
      ro.observe(document.documentElement);
      if (document.body) ro.observe(document.body);
    } catch (_) {}
    try {
      var mo = new MutationObserver(show);
      mo.observe(document.documentElement, { childList: true, subtree: true });
    } catch (_) {}

    show();
  }

  // body / 样式就绪后：按最终明暗写 color-scheme（经典条继续保持隐藏），
  // 并挂载悬浮滑块。可能被多次调用，均幂等。
  function ready() {
    var dark = isDarkPage();
    var css = "html{color-scheme:" + (dark ? "dark" : "light") + "}";
    if (classic) {
      css +=
        "html::-webkit-scrollbar{width:0!important}" +
        "body::-webkit-scrollbar{width:0!important}";
    }
    ensureStyle().textContent = css;
    mountBar(dark);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", ready);
  } else {
    ready();
  }
  window.addEventListener("load", ready);
})();`}function u(e){let t=null,r=d(),s=()=>{try{var t;let s=e.contentDocument;if(!s)return!1;let n=(null==(t=s.location)?void 0:t.href)||"";if(!n||"about:blank"===n)return!1;let i=s.createElement("script");return i.textContent=r,(s.head||s.documentElement).appendChild(i),!0}catch(e){return!1}};return s()?()=>void 0:((t=new o({iframe:e})).inject([{kind:l,script:r,timeoutMs:5e3}]),()=>{null==t||t.destroy()})}function c(){return(c=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var s in r)Object.prototype.hasOwnProperty.call(r,s)&&(e[s]=r[s])}return e}).apply(this,arguments)}class h{init(e,t="*"){this.targetWindow=e,this.targetOrigin=t,this.setupMessageListener(),this.flushPendingResponses()}initFromIframe(e="*"){this.targetWindow=window.parent,this.targetOrigin=e,this.setupMessageListener(),this.flushPendingResponses()}setupMessageListener(){this.messageListener&&window.removeEventListener("message",this.messageListener),this.messageListener=e=>{if("*"!==this.targetOrigin&&e.origin!==this.targetOrigin)return;let t=e.data;if((null==t?void 0:t.type)==="rpc:request"){e.source&&t.id&&this.requestSources.set(t.id,e.source),this.handleRPCRequest(t);return}(null==t?void 0:t.type)==="rpc:response"?this.handleRPCResponse(t):(null==t?void 0:t.type)==="message"&&this.handleMessage(t)},window.addEventListener("message",this.messageListener)}sendMessage(e,t){if(!this.targetWindow)throw Error("Bridge not initialized");this.targetWindow.postMessage({type:"message",messageType:e,data:t,timestamp:Date.now()},this.targetOrigin)}onMessage(e,t){let r=r=>{var s;(null==(s=r.data)?void 0:s.type)==="message"&&r.data.messageType===e&&t(r.data.data)};return window.addEventListener("message",r),()=>{window.removeEventListener("message",r)}}registerMethod(e,t){this.requestHandlers.set(e,t)}onAuthError(e){return this.authErrorHandlers.push(e),()=>{let t=this.authErrorHandlers.indexOf(e);t>=0&&this.authErrorHandlers.splice(t,1)}}async call(e,...t){if(!this.targetWindow)throw Error("Bridge not initialized");let r=this.generateRequestId(),s={id:r,method:e,params:t,timestamp:Date.now()};return new Promise((t,n)=>{let i=setTimeout(()=>{this.pendingRequests.delete(r),n(Error(`RPC call timeout: ${e} (${this.rpcTimeout}ms)`))},this.rpcTimeout);this.pendingRequests.set(r,{resolve:e=>{clearTimeout(i),t(e)},reject:e=>{clearTimeout(i),n(e)},timeout:i}),this.targetWindow.postMessage(c({type:"rpc:request"},s),this.targetOrigin)})}async handleRPCRequest(e){let t=this.requestHandlers.get(e.method);if(!t)return void this.sendRPCResponse(e.id,void 0,{code:-32601,message:`Method not found: ${e.method}`});try{let r=await t(e.method,e.params);this.sendRPCResponse(e.id,r)}catch(t){this.maybeNotifyAuthError(e.method,t),this.sendRPCResponse(e.id,void 0,{code:-32603,message:t instanceof Error?t.message:String(t),data:t})}}maybeNotifyAuthError(e,t){if(0===this.authErrorHandlers.length||!e.startsWith("database."))return;let r=t instanceof Error?t.message:String(t);if(!/401/.test(r))return;let s={source:"database",code:401,msg:r,method:e};for(let e of this.authErrorHandlers)try{e(s)}catch(e){}}handleRPCResponse(e){let t=this.pendingRequests.get(e.id);t&&(this.pendingRequests.delete(e.id),clearTimeout(t.timeout),e.error?t.reject(Error(`RPC error: ${e.error.message} (code: ${e.error.code})`)):t.resolve(e.result))}sendRPCResponse(e,t,r){let s=this.requestSources.get(e),n=s||this.targetWindow;if(s&&this.requestSources.delete(e),!n)return void this.pendingResponses.push({requestId:e,result:t,error:r});let i={id:e,result:t,error:r,timestamp:Date.now()};n.postMessage(c({type:"rpc:response"},i),this.targetOrigin)}flushPendingResponses(){let e=this.pendingResponses;for(let{requestId:t,result:r,error:s}of(this.pendingResponses=[],e))this.sendRPCResponse(t,r,s)}handleMessage(e){}generateRequestId(){return`rpc_${Date.now()}_${++this.requestIdCounter}`}setRPCTimeout(e){this.rpcTimeout=e}destroy(){this.messageListener&&(window.removeEventListener("message",this.messageListener),this.messageListener=void 0),this.pendingRequests.forEach(e=>{clearTimeout(e.timeout),e.reject(Error("Bridge destroyed"))}),this.pendingRequests.clear(),this.requestHandlers.clear(),this.requestSources.clear(),this.targetWindow=null}constructor(){this.targetWindow=null,this.targetOrigin="*",this.requestHandlers=new Map,this.pendingRequests=new Map,this.requestIdCounter=0,this.rpcTimeout=3e4,this.pendingResponses=[],this.requestSources=new Map,this.authErrorHandlers=[],this.setupMessageListener()}}}}]);