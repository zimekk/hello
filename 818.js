"use strict";(self.webpackChunk_dev_web=self.webpackChunk_dev_web||[]).push([[818],{818:(e,t,n)=>{n.r(t),n.d(t,{default:()=>C});var o=n(784),s=n(62),a=n.n(s),l=n(36),r=n.n(l),c=n(793),i=n.n(c),u=n(892),d=n.n(u),m=n(173),p=n.n(m),h=n(464),f=n.n(h),A=n(387),v={};v.styleTagTransform=f(),v.setAttributes=d(),v.insert=i().bind(null,"head"),v.domAPI=r(),v.insertStyleElement=p(),a()(A.Z,v);const w=A.Z&&A.Z.locals?A.Z.locals:void 0;function C(){const[e,t]=(0,o.useState)("");(0,o.useEffect)((()=>{document.getElementById("status").textContent="supported";const e=document.getElementById("received"),t={};navigator.serviceWorker.addEventListener("message",(function(n){var o,s=n.data.client;t[s]||(o=document.createElement("div"),e.appendChild(o),t[s]=o),(o=t[s]).textContent="Client "+s+" says: "+n.data.message}))}),[]);const n=(0,o.useCallback)((e=>{const{value:n}=e.target;t(n)}),[]),s=(0,o.useCallback)((()=>{t(""),navigator.serviceWorker.controller?navigator.serviceWorker.controller.postMessage(e):document.getElementById("status").textContent="error: no controller"}),[e]),a=(0,o.useCallback)((e=>"Enter"===e.key&&!e.shiftKey&&(e.preventDefault(),s())),[s]);return o.createElement("section",{className:w.Section},o.createElement("h2",null,"Push"),o.createElement("p",null,"This demo shows how to register for push notifications and how to send them."),o.createElement("form",null,"Notification delay:"," ",o.createElement("input",{id:"notification-delay",type:"number",defaultValue:"5"})," ","seconds Notification Time-To-Live:"," ",o.createElement("input",{id:"notification-ttl",type:"number",defaultValue:"0"})," ","seconds"),o.createElement("button",{id:"doIt"},"Try to conquer Italy!"),o.createElement("p",null,"Open another window with this page and type some text in below to postMessage it to the ServiceWorker which will forward the message along."),o.createElement("span",{id:"status"}),o.createElement("div",{id:"received"}),o.createElement("input",{value:e,onChange:n,onKeyDown:a}),o.createElement("button",{onClick:s,disabled:!e.length},"send"))}},387:(e,t,n)=>{n.d(t,{Z:()=>r});var o=n(272),s=n.n(o),a=n(609),l=n.n(a)()(s());l.push([e.id,".tjNCk8qW9Vs65hlz4WRw{color:blue;font-family:monospace;font-size:1rem;white-space:pre-wrap}","",{version:3,sources:["webpack://./src/containers/Push.module.scss"],names:[],mappings:"AAAA,sBACE,UAAA,CACA,qBAAA,CACA,cAAA,CACA,oBAAA",sourcesContent:[".Section {\n  color: blue;\n  font-family: monospace;\n  font-size: 1rem;\n  white-space: pre-wrap;\n}\n"],sourceRoot:""}]),l.locals={Section:"tjNCk8qW9Vs65hlz4WRw"};const r=l}}]);
//# sourceMappingURL=818.js.map