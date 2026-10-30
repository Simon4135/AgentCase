"use strict";(self.webpackChunk_mindx_app_mindx=self.webpackChunk_mindx_app_mindx||[]).push([["93443"],{31460(t,e,a){a.d(e,{S:()=>r});var n=a(63125);function r(t,e){if(t.accDescr){var a;null==(a=e.setAccDescription)||a.call(e,t.accDescr)}if(t.accTitle){var n;null==(n=e.setAccTitle)||n.call(e,t.accTitle)}if(t.title){var r;null==(r=e.setDiagramTitle)||r.call(e,t.title)}}(0,n.K)(r,"populateCommonDb")},67566(t,e,a){a.d(e,{diagram:()=>F});var n=a(31460),r=a(3545),i=a(43421),l=a(77130),o=a(80691),c=a(63125),s=a(8655),d=(0,c.K)(()=>({domains:new Map,transitions:[]}),"createDefaultData"),f=d(),p=(0,c.K)(()=>f.domains,"getDomains"),m=(0,c.K)(()=>f.transitions,"getTransitions"),y=(0,c.K)(t=>{if(t)for(let a of t){var e;let t=a.domain,n=(null!=(e=a.items)?e:[]).map(t=>({label:t.label}));f.domains.set(t,{name:t,items:n})}},"setDomains"),x=(0,c.K)(t=>{t&&(f.transitions=t.filter(t=>t.from!==t.to||(o.R.warn(`Cynefin: self-loop transition on domain "${t.from}" is not meaningful and will be skipped.`),!1)).map(t=>({from:t.from,to:t.to,label:t.label||void 0})))},"setTransitions"),h=(0,c.K)(()=>(0,i.$t)({...l.UI.cynefin,...(0,l.zj)().cynefin}),"getConfig"),$=(0,c.K)(()=>{(0,l.IU)(),f=d()},"clear"),u={getDomains:p,getTransitions:m,setDomains:y,setTransitions:x,getConfig:h,clear:$,setAccTitle:l.SV,getAccTitle:l.iN,setDiagramTitle:l.ke,getDiagramTitle:l.ab,getAccDescription:l.m7,setAccDescription:l.EI},g=(0,c.K)(t=>{(0,n.S)(t,u),u.setDomains(t.domains),u.setTransitions(t.transitions)},"populate"),b={parse:(0,c.K)(async t=>{let e=await (0,s.qg)("cynefin",t);o.R.debug(e),g(e)},"parse")};function w(t){let e=t+0x6d2b79f5|0;return e=Math.imul(e^e>>>15,1|e),(((e^=e+Math.imul(e^e>>>7,61|e))^e>>>14)>>>0)/0x100000000}function C(t){let e=0;for(let a=0;a<t.length;a++){let n=t.charCodeAt(a);e=(e<<5)-e+n|0}return e}function k(t,e){return"number"==typeof t&&Number.isFinite(t)&&0!==t?t:C(e)}function D(t,e,a,n){let r=t/2,i=null!=n?n:.015*t,l=7,o=e/l,c=[];for(let t=0;t<=l;t++){let e=w(a+17*t)*i*2-i;c.push({x:r+e,y:t*o})}let s=`M${c[0].x},${c[0].y}`;for(let t=0;t<c.length-1;t++){let e=c[t],n=c[t+1],r=(e.y+n.y)/2,l=t%2==0?1:-1,o=1.5*i*l*w(a+31*t+7),d=e.x+o,f=r,p=n.x-o,m=r;s+=` C${d},${f} ${p},${m} ${n.x},${n.y}`}return s}function K(t,e,a,n){let r=e/2,i=null!=n?n:.015*e,l=7,o=t/l,c=[];for(let t=0;t<=l;t++){let e=w(a+23*t)*i*2-i;c.push({x:t*o,y:r+e})}let s=`M${c[0].x},${c[0].y}`;for(let t=0;t<c.length-1;t++){let e=c[t],n=c[t+1],r=(e.x+n.x)/2,l=t%2==0?1:-1,o=1.5*i*l*w(a+37*t+11),d=r,f=e.y+o,p=r,m=n.y-o;s+=` C${d},${f} ${p},${m} ${n.x},${n.y}`}return s}function A(t,e){let a=t/2,n=.5*e,r=e,i=.03*t;return`M${a},${n} C${a+i},${n+(r-n)*.2} ${a-1.5*i},${n+(r-n)*.55} ${a+.5*i},${n+(r-n)*.75} C${a-i},${n+(r-n)*.85} ${a+.3*i},${n+(r-n)*.95} ${a},${r}`}function B(t,e,a,n){return`M${t-a},${e} A${a},${n} 0 1,1 ${t+a},${e} A${a},${n} 0 1,1 ${t-a},${e} Z`}(0,c.K)(w,"seededRandom"),(0,c.K)(C,"hashString"),(0,c.K)(k,"resolveSeed"),(0,c.K)(D,"generateFoldPath"),(0,c.K)(K,"generateHorizontalBoundary"),(0,c.K)(A,"generateCliffPath"),(0,c.K)(B,"generateConfusionPath");var T={complex:{model:"Probe → Sense → Respond",practice:"Emergent Practices"},complicated:{model:"Sense → Analyse → Respond",practice:"Good Practices"},clear:{model:"Sense → Categorise → Respond",practice:"Best Practices"},chaotic:{model:"Act → Sense → Respond",practice:"Novel Practices"},confusion:{model:"",practice:"Disorder"}},S=(0,c.K)((t,e)=>{let a=t/2,n=e/2;return{complex:{cx:a/2,cy:n/2,x:0,y:0,w:a,h:n},complicated:{cx:a+a/2,cy:n/2,x:a,y:0,w:a,h:n},chaotic:{cx:a/2,cy:n+n/2,x:0,y:n,w:a,h:n},clear:{cx:a+a/2,cy:n+n/2,x:a,y:n,w:a,h:n},confusion:{cx:a,cy:n,x:.7*a,y:.7*n,w:.6*a,h:.6*n}}},"getDomainLayouts"),v=(0,c.K)(()=>{let t=(0,l.P$)(),e=(0,l.zj)(),a=(0,i.$t)(t,e.themeVariables);return a.cynefin},"getCynefinDomainColors"),z=3,M=(0,c.K)((t,e,a,n)=>{var i;let c=n.db,s=c.getDomains(),d=c.getTransitions(),f=c.getDiagramTitle(),p=c.getAccTitle(),m=c.getAccDescription(),y=c.getConfig(),x=v();o.R.debug("Rendering Cynefin diagram");let h=y.width,$=y.height,u=y.padding,g=y.showDomainDescriptions,b=y.boundaryAmplitude,w=h+2*u,C=$+2*u,M={complex:x.complexBg,complicated:x.complicatedBg,clear:x.clearBg,chaotic:x.chaoticBg,confusion:x.confusionBg},I=(0,r.D)(e);(0,l.a$)(I,C,w,null==(i=y.useMaxWidth)||i),I.attr("viewBox",`0 0 ${w} ${C}`),p&&I.append("title").text(p),m&&I.append("desc").text(m);let L=I.append("g").attr("transform",`translate(${u}, ${u})`),P=S(h,$),R=k(y.seed,e),F=L.append("g").attr("class","cynefin-backgrounds"),_=["complex","complicated","chaotic","clear"];for(let t of _){let e=P[t];F.append("rect").attr("class","cynefinDomain").attr("x",e.x).attr("y",e.y).attr("width",e.w).attr("height",e.h).attr("fill",M[t]).attr("fill-opacity",.4).attr("stroke","none")}let W=L.append("g").attr("class","cynefin-boundaries");W.append("path").attr("class","cynefinBoundary").attr("d",D(h,$,R,b)).attr("fill","none"),W.append("path").attr("class","cynefinBoundary").attr("d",K(h,$,R+100,b)).attr("fill","none"),W.append("path").attr("class","cynefinCliff").attr("d",A(h,$)).attr("fill","none");let E=.15*h,H=.15*$;L.append("path").attr("class","cynefinConfusion").attr("d",B(h/2,$/2,E,H)).attr("fill",M.confusion).attr("fill-opacity",.5);let j=L.append("g").attr("class","cynefin-labels");for(let t of _){let e=P[t];j.append("text").attr("class","cynefinDomainLabel").attr("x",e.cx).attr("y",g?e.cy-30:e.cy).attr("text-anchor","middle").attr("dominant-baseline","middle").text(t.charAt(0).toUpperCase()+t.slice(1))}if(j.append("text").attr("class","cynefinDomainLabel").attr("x",h/2).attr("y",g?$/2-10:$/2).attr("text-anchor","middle").attr("dominant-baseline","middle").text("Confusion"),g){let t=L.append("g").attr("class","cynefin-subtitles");for(let e of _){let a=P[e],n=T[e];t.append("text").attr("class","cynefinSubtitle").attr("x",a.cx).attr("y",a.cy-10).attr("text-anchor","middle").attr("dominant-baseline","middle").text(n.model),t.append("text").attr("class","cynefinSubtitle").attr("x",a.cx).attr("y",a.cy+5).attr("text-anchor","middle").attr("dominant-baseline","middle").text(n.practice)}t.append("text").attr("class","cynefinSubtitle").attr("x",h/2).attr("y",$/2+8).attr("text-anchor","middle").attr("dominant-baseline","middle").text(T.confusion.practice)}let N=L.append("g").attr("class","cynefin-items"),U=26,V=10,q=["complex","complicated","chaotic","clear","confusion"];for(let t of q){let e=s.get(t);if(!e||0===e.items.length)continue;let a=P[t],n="confusion"===t,r=e.items,i=0;n&&e.items.length>z&&(i=e.items.length-z,r=e.items.slice(0,z));let l;if(n){let t=g?22:14;l=a.cy+t}else l=a.cy+(g?25:15);if([...r].forEach((e,n)=>{let r=l+n*(U+4),i=N.append("g"),o=i.append("text").attr("class","cynefinItemText").attr("x",0).attr("y",U/2).attr("text-anchor","middle").attr("dominant-baseline","central").text(e.label),c=7*e.label.length,s=o.node();if(s&&"function"==typeof s.getBBox){let t=s.getBBox();t.width>0&&(c=t.width)}let d=c+2*V,f=a.cx-d/2;i.attr("transform",`translate(${f}, ${r})`),i.insert("rect","text").attr("class","cynefinItem").attr("x",0).attr("y",0).attr("width",d).attr("height",U).attr("rx",4).attr("ry",4).attr("fill",M[t]).attr("fill-opacity",.95),o.attr("x",d/2).attr("y",U/2)}),i>0){let e=l+r.length*(U+4),n=`+${i} more`,o=N.append("g"),c=o.append("text").attr("class","cynefinItemText").attr("x",0).attr("y",U/2).attr("text-anchor","middle").attr("dominant-baseline","central").text(n),s=7*n.length,d=c.node();if(d&&"function"==typeof d.getBBox){let t=d.getBBox();t.width>0&&(s=t.width)}let f=s+2*V,p=a.cx-f/2;o.attr("transform",`translate(${p}, ${e})`),o.insert("rect","text").attr("class","cynefinItemOverflow").attr("x",0).attr("y",0).attr("width",f).attr("height",U).attr("rx",4).attr("ry",4).attr("fill",M[t]).attr("fill-opacity",.6),c.attr("x",f/2).attr("y",U/2)}}if(d.length>0){let t=I.select("defs").empty()?I.append("defs"):I.select("defs"),a=`cynefin-arrow-${e}`;t.append("marker").attr("id",a).attr("viewBox","0 0 10 10").attr("refX",9).attr("refY",5).attr("markerWidth",6).attr("markerHeight",6).attr("orient","auto-start-reverse").append("path").attr("d","M 0 0 L 10 5 L 0 10 z").attr("class","cynefinArrowHead");let n=L.append("g").attr("class","cynefin-arrows");d.forEach(t=>{let e=P[t.from],r=P[t.to];if(!e||!r)return;if(t.from===t.to)return void o.R.warn(`Cynefin renderer: skipping self-loop on domain "${t.from}"`);let i=e.cx,l=e.cy,c=r.cx,s=r.cy,d=(i+c)/2,f=(l+s)/2,p=c-i,m=s-l,y=Math.sqrt(p*p+m*m),x=.15*y,h=-m/y,$=p/y,u=d+h*x,g=f+$*x;n.append("path").attr("class","cynefinArrowLine").attr("d",`M${i},${l} Q${u},${g} ${c},${s}`).attr("fill","none").attr("marker-end",`url(#${a})`),t.label&&n.append("text").attr("class","cynefinArrowLabel").attr("x",u).attr("y",g-6).attr("text-anchor","middle").attr("dominant-baseline","auto").text(t.label)})}f&&L.append("text").attr("class","cynefinTitle").attr("x",h/2).attr("y",-u/2).attr("text-anchor","middle").attr("dominant-baseline","middle").text(f)},"draw"),I={draw:M},L=(0,c.K)(()=>{let t=(0,l.P$)(),e=(0,l.zj)(),a=(0,i.$t)(t,e.themeVariables);return a.cynefin},"getCynefinTheme"),P=(0,c.K)(()=>{let t=L();return`
	.cynefinDomain {
		stroke: none;
	}
	.cynefinDomainLabel {
		font-size: ${t.domainFontSize}px;
		font-weight: bold;
		fill: ${t.labelColor};
	}
	.cynefinSubtitle {
		font-size: ${t.itemFontSize-1}px;
		fill: ${t.textColor};
		font-style: italic;
	}
	.cynefinItem {
		fill-opacity: 0.95;
		stroke: ${t.boundaryColor};
		stroke-width: 1;
	}
	.cynefinItemText {
		font-size: ${t.itemFontSize}px;
		fill: ${t.textColor};
	}
	.cynefinItemOverflow {
		fill-opacity: 0.6;
		stroke: ${t.boundaryColor};
		stroke-width: 1;
		stroke-dasharray: 3 2;
	}
	.cynefinBoundary {
		stroke: ${t.boundaryColor};
		stroke-width: ${t.boundaryWidth};
		stroke-dasharray: 6 3;
	}
	.cynefinCliff {
		stroke: ${t.cliffColor};
		stroke-width: ${t.cliffWidth};
	}
	.cynefinConfusion {
		stroke: ${t.boundaryColor};
		stroke-width: 1.5;
		stroke-dasharray: 4 2;
	}
	.cynefinArrowLine {
		stroke: ${t.arrowColor};
		stroke-width: ${t.arrowWidth};
		fill: none;
	}
	.cynefinArrowHead {
		fill: ${t.arrowColor};
		stroke: none;
	}
	.cynefinArrowLabel {
		font-size: ${t.itemFontSize-1}px;
		fill: ${t.textColor};
	}
	.cynefinTitle {
		font-size: ${t.domainFontSize+2}px;
		font-weight: bold;
		fill: ${t.labelColor};
	}
	`},"styles"),R=P,F={parser:b,db:u,renderer:I,styles:R}}}]);