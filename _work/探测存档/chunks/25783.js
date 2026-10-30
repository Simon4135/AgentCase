"use strict";(self.webpackChunk_mindx_app_mindx=self.webpackChunk_mindx_app_mindx||[]).push([["25783"],{31460(t,e,a){a.d(e,{S:()=>l});var r=a(63125);function l(t,e){if(t.accDescr){var a;null==(a=e.setAccDescription)||a.call(e,t.accDescr)}if(t.accTitle){var r;null==(r=e.setAccTitle)||r.call(e,t.accTitle)}if(t.title){var l;null==(l=e.setDiagramTitle)||l.call(e,t.title)}}(0,r.K)(l,"populateCommonDb")},81898(t,e,a){a.d(e,{diagram:()=>w});var r=a(31460),l=a(3545),i=a(43421),o=a(77130),s=a(80691),n=a(63125),c=a(8655),d,p=o.UI.packet,k=(d=class{getConfig(){let t=(0,i.$t)({...p,...(0,o.zj)().packet});return t.showBits&&(t.paddingY+=10),t}getPacket(){return this.packet}pushWord(t){t.length>0&&this.packet.push(t)}clear(){(0,o.IU)(),this.packet=[]}constructor(){this.packet=[],this.setAccTitle=o.SV,this.getAccTitle=o.iN,this.setDiagramTitle=o.ke,this.getDiagramTitle=o.ab,this.getAccDescription=o.m7,this.setAccDescription=o.EI}},(0,n.K)(d,"PacketDB"),d),h=1e4,b=(0,n.K)((t,e)=>{(0,r.S)(t,e);let a=-1,l=[],i=1,{bitsPerRow:o}=e.getConfig();for(let{start:r,end:n,bits:c,label:d}of t.blocks){if(void 0!==r&&void 0!==n&&n<r)throw Error(`Packet block ${r} - ${n} is invalid. End must be greater than start.`);if(null!=r||(r=a+1),r!==a+1)throw Error(`Packet block ${r} - ${null!=n?n:r} is not contiguous. It should start from ${a+1}.`);if(0===c)throw Error(`Packet block ${r} is invalid. Cannot have a zero bit field.`);for(null!=n||(n=r+(null!=c?c:1)-1),null!=c||(c=n-r+1),a=n,s.R.debug(`Packet block ${r} - ${a} with label ${d}`);l.length<=o+1&&e.getPacket().length<h;){let[t,a]=u({start:r,end:n,bits:c,label:d},i,o);if(l.push(t),t.end+1===i*o&&(e.pushWord(l),l=[],i++),!a)break;({start:r,end:n,bits:c,label:d}=a)}}e.pushWord(l)},"populate"),u=(0,n.K)((t,e,a)=>{if(void 0===t.start)throw Error("start should have been set during first phase");if(void 0===t.end)throw Error("end should have been set during first phase");if(t.start>t.end)throw Error(`Block start ${t.start} is greater than block end ${t.end}.`);if(t.end+1<=e*a)return[t,void 0];let r=e*a-1,l=e*a;return[{start:t.start,end:r,label:t.label,bits:r-t.start},{start:l,end:t.end,label:t.label,bits:t.end-l}]},"getNextFittingBlock"),f={parser:{yy:void 0},parse:(0,n.K)(async t=>{var e;let a=await (0,c.qg)("packet",t),r=null==(e=f.parser)?void 0:e.yy;if(!(r instanceof k))throw Error("parser.parser?.yy was not a PacketDB. This is due to a bug within Mermaid, please report this issue at https://github.com/mermaid-js/mermaid/issues.");s.R.debug(a),b(a,r)},"parse")},g=(0,n.K)((t,e,a,r)=>{let i=r.db,s=i.getConfig(),{rowHeight:n,paddingY:c,bitWidth:d,bitsPerRow:p}=s,k=i.getPacket(),h=i.getDiagramTitle(),b=n+c,u=b*(k.length+1)-(h?0:n),f=d*p+2,g=(0,l.D)(e);for(let[t,e]of(g.attr("viewBox",`0 0 ${f} ${u}`),(0,o.a$)(g,u,f,s.useMaxWidth),k.entries()))m(g,e,t,s);g.append("text").text(h).attr("x",f/2).attr("y",u-b/2).attr("dominant-baseline","middle").attr("text-anchor","middle").attr("class","packetTitle")},"draw"),m=(0,n.K)((t,e,a,{rowHeight:r,paddingX:l,paddingY:i,bitWidth:o,bitsPerRow:s,showBits:n})=>{let c=t.append("g"),d=a*(r+i)+i;for(let t of e){let e=t.start%s*o+1,a=(t.end-t.start+1)*o-l;if(c.append("rect").attr("x",e).attr("y",d).attr("width",a).attr("height",r).attr("class","packetBlock"),c.append("text").attr("x",e+a/2).attr("y",d+r/2).attr("class","packetLabel").attr("dominant-baseline","middle").attr("text-anchor","middle").text(t.label),!n)continue;let i=t.end===t.start,p=d-2;c.append("text").attr("x",e+(i?a/2:0)).attr("y",p).attr("class","packetByte start").attr("dominant-baseline","auto").attr("text-anchor",i?"middle":"start").text(t.start),i||c.append("text").attr("x",e+a).attr("y",p).attr("class","packetByte end").attr("dominant-baseline","auto").attr("text-anchor","end").text(t.end)}},"drawWord"),x={draw:g},$={byteFontSize:"10px",startByteColor:"black",endByteColor:"black",labelColor:"black",labelFontSize:"12px",titleColor:"black",titleFontSize:"14px",blockStrokeColor:"black",blockStrokeWidth:"1",blockFillColor:"#efefef"},y=(0,n.K)(({packet:t}={})=>{let e=(0,i.$t)($,t);return`
	.packetByte {
		font-size: ${e.byteFontSize};
	}
	.packetByte.start {
		fill: ${e.startByteColor};
	}
	.packetByte.end {
		fill: ${e.endByteColor};
	}
	.packetLabel {
		fill: ${e.labelColor};
		font-size: ${e.labelFontSize};
	}
	.packetTitle {
		fill: ${e.titleColor};
		font-size: ${e.titleFontSize};
	}
	.packetBlock {
		stroke: ${e.blockStrokeColor};
		stroke-width: ${e.blockStrokeWidth};
		fill: ${e.blockFillColor};
	}
	`},"styles"),w={parser:f,get db(){return new k},renderer:x,styles:y}}}]);