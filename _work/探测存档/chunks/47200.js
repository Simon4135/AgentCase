"use strict";(self.webpackChunk_mindx_app_mindx=self.webpackChunk_mindx_app_mindx||[]).push([["47200"],{31460(t,e,a){a.d(e,{S:()=>l});var r=a(63125);function l(t,e){if(t.accDescr){var a;null==(a=e.setAccDescription)||a.call(e,t.accDescr)}if(t.accTitle){var r;null==(r=e.setAccTitle)||r.call(e,t.accTitle)}if(t.title){var l;null==(l=e.setDiagramTitle)||l.call(e,t.title)}}(0,r.K)(l,"populateCommonDb")},80419(t,e,a){a.d(e,{diagram:()=>P});var r=a(31460),l=a(3545),i=a(43421),n=a(77130),s=a(80691),o=a(63125),c=a(8655),u={showLegend:!0,ticks:5,max:null,min:0,graticule:"circle"},d={axes:[],curves:[],options:u},g=structuredClone(d),p=n.UI.radar,x=(0,o.K)(()=>{let t=(0,i.$t)({...p,...(0,n.zj)().radar});return t},"getConfig"),h=(0,o.K)(()=>g.axes,"getAxes"),m=(0,o.K)(()=>g.curves,"getCurves"),$=(0,o.K)(()=>g.options,"getOptions"),v=(0,o.K)(t=>{g.axes=t.map(t=>{var e;return{name:t.name,label:null!=(e=t.label)?e:t.name}})},"setAxes"),f=(0,o.K)(t=>{g.curves=t.map(t=>{var e;return{name:t.name,label:null!=(e=t.label)?e:t.name,entries:y(t.entries)}})},"setCurves"),y=(0,o.K)(t=>{if(void 0==t[0].axis)return t.map(t=>t.value);let e=h();if(0===e.length)throw Error("Axes must be populated before curves for reference entries");return e.map(e=>{let a=t.find(t=>{var a;return(null==(a=t.axis)?void 0:a.$refText)===e.name});if(void 0===a)throw Error("Missing entry for axis "+e.label);return a.value})},"computeCurveEntries"),w=(0,o.K)(t=>{var e,a,r,l,i,n,s,o,c,d;let p=t.reduce((t,e)=>(t[e.name]=e,t),{});g.options={showLegend:null!=(e=null==(n=p.showLegend)?void 0:n.value)?e:u.showLegend,ticks:null!=(a=null==(s=p.ticks)?void 0:s.value)?a:u.ticks,max:null!=(r=null==(o=p.max)?void 0:o.value)?r:u.max,min:null!=(l=null==(c=p.min)?void 0:c.value)?l:u.min,graticule:null!=(i=null==(d=p.graticule)?void 0:d.value)?i:u.graticule}},"setOptions"),b=(0,o.K)(()=>{(0,n.IU)(),g=structuredClone(d)},"clear"),C={getAxes:h,getCurves:m,getOptions:$,setAxes:v,setCurves:f,setOptions:w,getConfig:x,clear:b,setAccTitle:n.SV,getAccTitle:n.iN,setDiagramTitle:n.ke,getDiagramTitle:n.ab,getAccDescription:n.m7,setAccDescription:n.EI},K=(0,o.K)(t=>{(0,r.S)(t,C);let{axes:e,curves:a,options:l}=t;C.setAxes(e),C.setCurves(a),C.setOptions(l)},"populate"),M={parse:(0,o.K)(async t=>{let e=await (0,c.qg)("radar",t);s.R.debug(e),K(e)},"parse")},L=(0,o.K)((t,e,a,r)=>{var i;let n=r.db,s=n.getAxes(),o=n.getCurves(),c=n.getOptions(),u=n.getConfig(),d=n.getDiagramTitle(),g=(0,l.D)(e),p=T(g,u),x=null!=(i=c.max)?i:Math.max(...o.map(t=>Math.max(...t.entries))),h=c.min,m=Math.min(u.width,u.height)/2;k(p,s,m,c.ticks,c.graticule),A(p,s,m,u),S(p,s,o,h,x,c.graticule,u),O(p,o,c.showLegend,u),p.append("text").attr("class","radarTitle").text(d).attr("x",0).attr("y",-u.height/2-u.marginTop)},"draw"),T=(0,o.K)((t,e)=>{var a;let r=e.width+e.marginLeft+e.marginRight,l=e.height+e.marginTop+e.marginBottom,i={x:e.marginLeft+e.width/2,y:e.marginTop+e.height/2};return(0,n.a$)(t,l,r,null==(a=e.useMaxWidth)||a),t.attr("viewBox",`0 0 ${r} ${l}`).attr("overflow","visible"),t.append("g").attr("transform",`translate(${i.x}, ${i.y})`)},"drawFrame"),k=(0,o.K)((t,e,a,r,l)=>{if("circle"===l)for(let e=0;e<r;e++){let l=a*(e+1)/r;t.append("circle").attr("r",l).attr("class","radarGraticule")}else if("polygon"===l){let l=e.length;for(let i=0;i<r;i++){let n=a*(i+1)/r,s=e.map((t,e)=>{let a=2*e*Math.PI/l-Math.PI/2,r=n*Math.cos(a),i=n*Math.sin(a);return`${r},${i}`}).join(" ");t.append("polygon").attr("points",s).attr("class","radarGraticule")}}},"drawGraticule"),A=(0,o.K)((t,e,a,r)=>{let l=e.length;for(let i=0;i<l;i++){let n=e[i].label,s=2*i*Math.PI/l-Math.PI/2,o=Math.cos(s),c=Math.sin(s);t.append("line").attr("x1",0).attr("y1",0).attr("x2",a*r.axisScaleFactor*o).attr("y2",a*r.axisScaleFactor*c).attr("class","radarAxisLine");let u=o>.01?"start":o<-.01?"end":"middle",d=c>.01?"hanging":c<-.01?"auto":"central",g=4;t.append("text").text(n).attr("x",a*r.axisLabelFactor*o+g*o).attr("y",a*r.axisLabelFactor*c+g*c).attr("text-anchor",u).attr("dominant-baseline",d).attr("class","radarAxisLabel")}},"drawAxes");function S(t,e,a,r,l,i,n){let s=e.length,o=Math.min(n.width,n.height)/2;a.forEach((e,a)=>{if(e.entries.length!==s)return;let c=e.entries.map((t,e)=>{let a=2*Math.PI*e/s-Math.PI/2,i=I(t,r,l,o),n=i*Math.cos(a),c=i*Math.sin(a);return{x:n,y:c}});"circle"===i?t.append("path").attr("d",D(c,n.curveTension)).attr("class",`radarCurve-${a}`):"polygon"===i&&t.append("polygon").attr("points",c.map(t=>`${t.x},${t.y}`).join(" ")).attr("class",`radarCurve-${a}`)})}function I(t,e,a,r){let l=Math.min(Math.max(t,e),a);return r*(l-e)/(a-e)}function D(t,e){let a=t.length,r=`M${t[0].x},${t[0].y}`;for(let l=0;l<a;l++){let i=t[(l-1+a)%a],n=t[l],s=t[(l+1)%a],o=t[(l+2)%a],c={x:n.x+(s.x-i.x)*e,y:n.y+(s.y-i.y)*e},u={x:s.x-(o.x-n.x)*e,y:s.y-(o.y-n.y)*e};r+=` C${c.x},${c.y} ${u.x},${u.y} ${s.x},${s.y}`}return`${r} Z`}function O(t,e,a,r){if(!a)return;let l=(r.width/2+r.marginRight)*3/4,i=-(3*(r.height/2+r.marginTop))/4,n=20;e.forEach((e,a)=>{let r=t.append("g").attr("transform",`translate(${l}, ${i+a*n})`);r.append("rect").attr("width",12).attr("height",12).attr("class",`radarLegendBox-${a}`),r.append("text").attr("x",16).attr("y",0).attr("class","radarLegendText").text(e.label)})}(0,o.K)(S,"drawCurves"),(0,o.K)(I,"relativeRadius"),(0,o.K)(D,"closedRoundCurve"),(0,o.K)(O,"drawLegend");var z={draw:L},E=(0,o.K)((t,e)=>{let a="";for(let r=0;r<t.THEME_COLOR_LIMIT;r++){let l=t[`cScale${r}`];a+=`
		.radarCurve-${r} {
			color: ${l};
			fill: ${l};
			fill-opacity: ${e.curveOpacity};
			stroke: ${l};
			stroke-width: ${e.curveStrokeWidth};
		}
		.radarLegendBox-${r} {
			fill: ${l};
			fill-opacity: ${e.curveOpacity};
			stroke: ${l};
		}
		`}return a},"genIndexStyles"),_=(0,o.K)(t=>{let e=(0,n.P$)(),a=(0,n.zj)(),r=(0,i.$t)(e,a.themeVariables),l=(0,i.$t)(r.radar,t);return{themeVariables:r,radarOptions:l}},"buildRadarStyleOptions"),F=(0,o.K)(({radar:t}={})=>{let{themeVariables:e,radarOptions:a}=_(t);return`
	.radarTitle {
		font-size: ${e.fontSize};
		color: ${e.titleColor};
		dominant-baseline: hanging;
		text-anchor: middle;
	}
	.radarAxisLine {
		stroke: ${a.axisColor};
		stroke-width: ${a.axisStrokeWidth};
	}
	.radarAxisLabel {
		font-size: ${a.axisLabelFontSize}px;
		color: ${a.axisColor};
	}
	.radarGraticule {
		fill: ${a.graticuleColor};
		fill-opacity: ${a.graticuleOpacity};
		stroke: ${a.graticuleColor};
		stroke-width: ${a.graticuleStrokeWidth};
	}
	.radarLegendText {
		text-anchor: start;
		font-size: ${a.legendFontSize}px;
		dominant-baseline: hanging;
	}
	${E(e,a)}
	`},"styles"),P={parser:M,db:C,renderer:z,styles:F}}}]);