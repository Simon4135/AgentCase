"use strict";(self.webpackChunk_mindx_app_mindx=self.webpackChunk_mindx_app_mindx||[]).push([["98269"],{31460(e,t,a){a.d(t,{S:()=>l});var i=a(63125);function l(e,t){if(e.accDescr){var a;null==(a=t.setAccDescription)||a.call(t,e.accDescr)}if(e.accTitle){var i;null==(i=t.setAccTitle)||i.call(t,e.accTitle)}if(e.title){var l;null==(l=t.setDiagramTitle)||l.call(t,e.title)}}(0,i.K)(l,"populateCommonDb")},18316(e,t,a){a.d(t,{diagram:()=>R});var i=a(31460),l=a(3545),r=a(43421),n=a(77130),s=a(80691),o=a(63125),c=a(8655),d=a(51949),p=n.UI.pie,u={sections:new Map,showData:!1,config:p},h=u.sections,g=u.showData,f=structuredClone(p),m=(0,o.K)(()=>structuredClone(f),"getConfig"),x=(0,o.K)(()=>{h=new Map,g=u.showData,(0,n.IU)()},"clear"),$=(0,o.K)(({label:e,value:t})=>{if(t<0)throw Error(`"${e}" has invalid value: ${t}. Negative values are not allowed in pie charts. All slice values must be >= 0.`);h.has(e)||(h.set(e,t),s.R.debug(`added new section: ${e}, with value: ${t}`))},"addSection"),v=(0,o.K)(()=>h,"getSections"),w=(0,o.K)(e=>{g=e},"setShowData"),S=(0,o.K)(()=>g,"getShowData"),y={getConfig:m,clear:x,setDiagramTitle:n.ke,getDiagramTitle:n.ab,setAccTitle:n.SV,getAccTitle:n.iN,setAccDescription:n.EI,getAccDescription:n.m7,addSection:$,getSections:v,setShowData:w,getShowData:S},b=(0,o.K)((e,t)=>{(0,i.S)(e,t),t.setShowData(e.showData),e.sections.map(t.addSection)},"populateDb"),C={parse:(0,o.K)(async e=>{let t=await (0,c.qg)("pie",e);s.R.debug(t),b(t,y)},"parse")},D=(0,o.K)(e=>`
  .pieCircle{
    stroke: ${e.pieStrokeColor};
    stroke-width : ${e.pieStrokeWidth};
    opacity : ${e.pieOpacity};
  }
  .pieCircle.highlighted{
    scale: 1.05;
    opacity: 1;
  }
  .pieCircle.highlightedOnHover:hover{
    transition-duration: 250ms;
    scale: 1.05;
    opacity: 1;
  }
  .pieOuterCircle{
    stroke: ${e.pieOuterStrokeColor};
    stroke-width: ${e.pieOuterStrokeWidth};
    fill: none;
  }
  .pieTitleText {
    text-anchor: middle;
    font-size: ${e.pieTitleTextSize};
    fill: ${e.pieTitleTextColor};
    font-family: ${e.fontFamily};
  }
  .slice {
    font-family: ${e.fontFamily};
    fill: ${e.pieSectionTextColor};
    font-size:${e.pieSectionTextSize};
    // fill: white;
  }
  .legend text {
    fill: ${e.pieLegendTextColor};
    font-family: ${e.fontFamily};
    font-size: ${e.pieLegendTextSize};
  }
`,"getStyles"),T=D,k=(0,o.K)(e=>{let t=[...e.values()].reduce((e,t)=>e+t,0),a=[...e.entries()].map(([e,t])=>({label:e,value:t})).filter(e=>e.value/t*100>=1),i=(0,d.rLf)().value(e=>e.value).sort(null);return i(a)},"createPieArcs"),A=(0,o.K)((e,t,a,i)=>{var o,c;s.R.debug("rendering pie chart\n"+e);let p=i.db,u=(0,n.D7)(),h=(0,r.$t)(p.getConfig(),u.pie),g=40,f=18,m=4,x=450,$=x,v=(0,l.D)(t),w=v.append("g");w.attr("transform","translate("+$/2+","+x/2+")");let{themeVariables:S}=u,[y]=(0,r.I5)(S.pieOuterStrokeWidth);null!=y||(y=2);let b=h.legendPosition,C=h.textPosition,D=h.donutHole>0&&h.donutHole<=.9?h.donutHole:0,T=Math.min($,x)/2-g,A=(0,d.JLW)().innerRadius(D*T).outerRadius(T),K=(0,d.JLW)().innerRadius(T*C).outerRadius(T*C),R=w.append("g");R.append("circle").attr("cx",0).attr("cy",0).attr("r",T+y/2).attr("class","pieOuterCircle");let M=p.getSections(),O=k(M),z=[S.pie1,S.pie2,S.pie3,S.pie4,S.pie5,S.pie6,S.pie7,S.pie8,S.pie9,S.pie10,S.pie11,S.pie12],W=0;M.forEach(e=>{W+=e});let _=O.filter(e=>"0"!==(e.data.value/W*100).toFixed(0)),F=(0,d.UMr)(z).domain([...M.keys()]);R.selectAll("mySlices").data(_).enter().append("path").attr("d",A).attr("fill",e=>F(e.data.label)).attr("class",e=>{let t="pieCircle";return"hover"===h.highlightSlice?t+=" highlightedOnHover":h.highlightSlice===e.data.label&&(t+=" highlighted"),t}),R.selectAll("mySlices").data(_).enter().append("text").text(e=>(e.data.value/W*100).toFixed(0)+"%").attr("transform",e=>"translate("+K.centroid(e)+")").style("text-anchor","middle").attr("class","slice");let H=w.append("text").text(p.getDiagramTitle()).attr("x",0).attr("y",-(x-50)/2).attr("class","pieTitleText"),L=[...M.entries()].map(([e,t])=>({label:e,value:t})),I=w.selectAll(".legend").data(L).enter().append("g").attr("class","legend");I.append("rect").attr("width",f).attr("height",f).style("fill",e=>F(e.label)).style("stroke",e=>F(e.label)),I.append("text").attr("x",f+m).attr("y",f-m).text(e=>p.getShowData()?`${e.label} [${e.value}]`:e.label);let B=Math.max(...I.selectAll("text").nodes().map(e=>{var t;return null!=(t=null==e?void 0:e.getBoundingClientRect().width)?t:0})),E=x,P=$+g,U=f+m,J=L.length*U;switch(b){case"center":I.attr("transform",(e,t)=>{let a=U*L.length/2,i=-B/2-(f+m),l=t*U-a;return"translate("+i+","+l+")"});break;case"top":E+=J,I.attr("transform",(e,t)=>{let a=T,i=-B/2-(f+m),l=t*U-a;return`translate(${i}, ${l})`}),R.attr("transform",()=>`translate(0, ${J+U})`);break;case"bottom":E+=J,I.attr("transform",(e,t)=>{let a=-T-U,i=-B/2-(f+m),l=t*U-a;return"translate("+i+","+l+")"});break;case"left":P+=f+m+B,I.attr("transform",(e,t)=>{let a=U*L.length/2,i=-T-(f+m),l=t*U-a;return"translate("+i+","+l+")"}),R.attr("transform",()=>`translate(${B+f+m}, 0)`);break;default:P+=f+m+B,I.attr("transform",(e,t)=>{let a=U*L.length/2,i=12*f,l=t*U-a;return"translate("+i+","+l+")"})}let N=null!=(o=null==(c=H.node())?void 0:c.getBoundingClientRect().width)?o:0,q=$/2-N/2,V=$/2+N/2,j=Math.min(0,q),G=Math.max(P,V),Q=G-j;v.attr("viewBox",`${j} 0 ${Q} ${E}`),(0,n.a$)(v,E,Q,h.useMaxWidth)},"draw"),K={draw:A},R={parser:C,db:y,renderer:K,styles:T}}}]);