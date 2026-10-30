"use strict";(self.webpackChunk_mindx_app_mindx=self.webpackChunk_mindx_app_mindx||[]).push([["66055"],{15623(t,e,i){i.d(e,{CP:()=>u,Ck:()=>d,HT:()=>y,PB:()=>p,aC:()=>h,lC:()=>o,m:()=>c,tk:()=>l});var n=i(77130),r=i(63125),a=i(17828),s=i(51949),l=(0,r.K)((t,e)=>{let i=t.append("rect");if(i.attr("x",e.x),i.attr("y",e.y),i.attr("fill",e.fill),i.attr("stroke",e.stroke),i.attr("width",e.width),i.attr("height",e.height),e.name&&i.attr("name",e.name),e.rx&&i.attr("rx",e.rx),e.ry&&i.attr("ry",e.ry),void 0!==e.attrs)for(let t in e.attrs)i.attr(t,e.attrs[t]);return e.class&&i.attr("class",e.class),i},"drawRect"),o=(0,r.K)((t,e)=>{let i={x:e.startx,y:e.starty,width:e.stopx-e.startx,height:e.stopy-e.starty,fill:e.fill,stroke:e.stroke,class:"rect"},n=l(t,i);n.lower()},"drawBackgroundRect"),c=(0,r.K)((t,e)=>{let i=e.text.replace(n.H1," "),r=t.append("text");r.attr("x",e.x),r.attr("y",e.y),r.attr("class","legend"),r.style("text-anchor",e.anchor),e.class&&r.attr("class",e.class);let a=r.append("tspan");return a.attr("x",e.x+2*e.textMargin),a.text(i),r},"drawText"),h=(0,r.K)((t,e,i,n)=>{let r=t.append("image");r.attr("x",e),r.attr("y",i);let s=(0,a.sanitizeUrl)(n);r.attr("xlink:href",s)},"drawImage"),u=(0,r.K)((t,e,i,n)=>{let r=t.append("use");r.attr("x",e),r.attr("y",i);let s=(0,a.sanitizeUrl)(n);r.attr("xlink:href",`#${s}`)},"drawEmbeddedImage"),p=(0,r.K)(()=>{let t={x:0,y:0,width:100,height:100,fill:"#EDF2AE",stroke:"#666",anchor:"start",rx:0,ry:0};return t},"getNoteRect"),y=(0,r.K)(()=>{let t={x:0,y:0,width:100,height:100,"text-anchor":"start",style:"#666",textMargin:0,rx:0,ry:0,tspan:!0};return t},"getTextObj"),d=(0,r.K)(()=>{let t=(0,s.Ltv)(".mermaidTooltip");return t.empty()&&(t=(0,s.Ltv)("body").append("div").attr("class","mermaidTooltip").style("opacity",0).style("position","absolute").style("text-align","center").style("max-width","200px").style("padding","2px").style("font-size","12px").style("background","#ffffde").style("border","1px solid #333").style("border-radius","2px").style("pointer-events","none").style("z-index","100")),t},"createTooltip")},7468(t,e,i){i.d(e,{o:()=>r});var n=i(63125),r=(0,n.K)(()=>`
  /* Font Awesome icon styling - consolidated */
  .label-icon {
    display: inline-block;
    height: 1em;
    overflow: visible;
    vertical-align: -0.125em;
  }
  
  .node .label-icon path {
    fill: currentColor;
    stroke: revert;
    stroke-width: revert;
  }
`,"getIconStyles")},97434(t,e,i){i.d(e,{diagram:()=>Z});var n=i(7468),r=i(15623),a=i(77130);i(80691);var s=i(63125),l=i(51949),o=function(){var t=(0,s.K)(function(t,e,i,n){for(i=i||{},n=t.length;n--;i[t[n]]=e);return i},"o"),e=[6,8,10,11,12,14,16,17,18],i=[1,9],n=[1,10],r=[1,11],a=[1,12],l=[1,13],o=[1,14],c={trace:(0,s.K)(function(){},"trace"),yy:{},symbols_:{error:2,start:3,journey:4,document:5,EOF:6,line:7,SPACE:8,statement:9,NEWLINE:10,title:11,acc_title:12,acc_title_value:13,acc_descr:14,acc_descr_value:15,acc_descr_multiline_value:16,section:17,taskName:18,taskData:19,$accept:0,$end:1},terminals_:{2:"error",4:"journey",6:"EOF",8:"SPACE",10:"NEWLINE",11:"title",12:"acc_title",13:"acc_title_value",14:"acc_descr",15:"acc_descr_value",16:"acc_descr_multiline_value",17:"section",18:"taskName",19:"taskData"},productions_:[0,[3,3],[5,0],[5,2],[7,2],[7,1],[7,1],[7,1],[9,1],[9,2],[9,2],[9,1],[9,1],[9,2]],performAction:(0,s.K)(function(t,e,i,n,r,a,s){var l=a.length-1;switch(r){case 1:return a[l-1];case 2:case 6:case 7:this.$=[];break;case 3:a[l-1].push(a[l]),this.$=a[l-1];break;case 4:case 5:this.$=a[l];break;case 8:n.setDiagramTitle(a[l].substr(6)),this.$=a[l].substr(6);break;case 9:this.$=a[l].trim(),n.setAccTitle(this.$);break;case 10:case 11:this.$=a[l].trim(),n.setAccDescription(this.$);break;case 12:n.addSection(a[l].substr(8)),this.$=a[l].substr(8);break;case 13:n.addTask(a[l-1],a[l]),this.$="task"}},"anonymous"),table:[{3:1,4:[1,2]},{1:[3]},t(e,[2,2],{5:3}),{6:[1,4],7:5,8:[1,6],9:7,10:[1,8],11:i,12:n,14:r,16:a,17:l,18:o},t(e,[2,7],{1:[2,1]}),t(e,[2,3]),{9:15,11:i,12:n,14:r,16:a,17:l,18:o},t(e,[2,5]),t(e,[2,6]),t(e,[2,8]),{13:[1,16]},{15:[1,17]},t(e,[2,11]),t(e,[2,12]),{19:[1,18]},t(e,[2,4]),t(e,[2,9]),t(e,[2,10]),t(e,[2,13])],defaultActions:{},parseError:(0,s.K)(function(t,e){if(e.recoverable)this.trace(t);else{var i=Error(t);throw i.hash=e,i}},"parseError"),parse:(0,s.K)(function(t){var e=this,i=[0],n=[],r=[null],a=[],l=this.table,o="",c=0,h=0,u=0,p=2,y=1,d=a.slice.call(arguments,1),f=Object.create(this.lexer),g={};for(var x in this.yy)Object.prototype.hasOwnProperty.call(this.yy,x)&&(g[x]=this.yy[x]);f.setInput(t,g),g.lexer=f,g.parser=this,void 0===f.yylloc&&(f.yylloc={});var m=f.yylloc;a.push(m);var k=f.options&&f.options.ranges;function _(t){i.length=i.length-2*t,r.length=r.length-t,a.length=a.length-t}function b(){var t;return"number"!=typeof(t=n.pop()||f.lex()||y)&&(t instanceof Array&&(t=(n=t).pop()),t=e.symbols_[t]||t),t}"function"==typeof g.parseError?this.parseError=g.parseError:this.parseError=Object.getPrototypeOf(this).parseError,(0,s.K)(_,"popStack"),(0,s.K)(b,"lex");for(var v,w,K,$,M,T={},S,C,E,I;;){if(K=i[i.length-1],this.defaultActions[K]?$=this.defaultActions[K]:(null==v&&(v=b()),$=l[K]&&l[K][v]),void 0===$||!$.length||!$[0]){var P="";for(S in I=[],l[K])this.terminals_[S]&&S>p&&I.push("'"+this.terminals_[S]+"'");P=f.showPosition?"Parse error on line "+(c+1)+":\n"+f.showPosition()+"\nExpecting "+I.join(", ")+", got '"+(this.terminals_[v]||v)+"'":"Parse error on line "+(c+1)+": Unexpected "+(v==y?"end of input":"'"+(this.terminals_[v]||v)+"'"),this.parseError(P,{text:f.match,token:this.terminals_[v]||v,line:f.yylineno,loc:m,expected:I})}if($[0]instanceof Array&&$.length>1)throw Error("Parse Error: multiple actions possible at state: "+K+", token: "+v);switch($[0]){case 1:i.push(v),r.push(f.yytext),a.push(f.yylloc),i.push($[1]),v=null,w?(v=w,w=null):(h=f.yyleng,o=f.yytext,c=f.yylineno,m=f.yylloc,u>0&&u--);break;case 2:if(C=this.productions_[$[1]][1],T.$=r[r.length-C],T._$={first_line:a[a.length-(C||1)].first_line,last_line:a[a.length-1].last_line,first_column:a[a.length-(C||1)].first_column,last_column:a[a.length-1].last_column},k&&(T._$.range=[a[a.length-(C||1)].range[0],a[a.length-1].range[1]]),void 0!==(M=this.performAction.apply(T,[o,h,c,g,$[1],r,a].concat(d))))return M;C&&(i=i.slice(0,-1*C*2),r=r.slice(0,-1*C),a=a.slice(0,-1*C)),i.push(this.productions_[$[1]][0]),r.push(T.$),a.push(T._$),E=l[i[i.length-2]][i[i.length-1]],i.push(E);break;case 3:return!0}}return!0},"parse")},h=function(){var t={EOF:1,parseError:(0,s.K)(function(t,e){if(this.yy.parser)this.yy.parser.parseError(t,e);else throw Error(t)},"parseError"),setInput:(0,s.K)(function(t,e){return this.yy=e||this.yy||{},this._input=t,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},"setInput"),input:(0,s.K)(function(){var t=this._input[0];this.yytext+=t,this.yyleng++,this.offset++,this.match+=t,this.matched+=t;var e=t.match(/(?:\r\n?|\n).*/g);return e?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),t},"input"),unput:(0,s.K)(function(t){var e=t.length,i=t.split(/(?:\r\n?|\n)/g);this._input=t+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-e),this.offset-=e;var n=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),i.length-1&&(this.yylineno-=i.length-1);var r=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:i?(i.length===n.length?this.yylloc.first_column:0)+n[n.length-i.length].length-i[0].length:this.yylloc.first_column-e},this.options.ranges&&(this.yylloc.range=[r[0],r[0]+this.yyleng-e]),this.yyleng=this.yytext.length,this},"unput"),more:(0,s.K)(function(){return this._more=!0,this},"more"),reject:(0,s.K)(function(){return this.options.backtrack_lexer?(this._backtrack=!0,this):this.parseError("Lexical error on line "+(this.yylineno+1)+". You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n"+this.showPosition(),{text:"",token:null,line:this.yylineno})},"reject"),less:(0,s.K)(function(t){this.unput(this.match.slice(t))},"less"),pastInput:(0,s.K)(function(){var t=this.matched.substr(0,this.matched.length-this.match.length);return(t.length>20?"...":"")+t.substr(-20).replace(/\n/g,"")},"pastInput"),upcomingInput:(0,s.K)(function(){var t=this.match;return t.length<20&&(t+=this._input.substr(0,20-t.length)),(t.substr(0,20)+(t.length>20?"...":"")).replace(/\n/g,"")},"upcomingInput"),showPosition:(0,s.K)(function(){var t=this.pastInput(),e=Array(t.length+1).join("-");return t+this.upcomingInput()+"\n"+e+"^"},"showPosition"),test_match:(0,s.K)(function(t,e){var i,n,r;if(this.options.backtrack_lexer&&(r={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(r.yylloc.range=this.yylloc.range.slice(0))),(n=t[0].match(/(?:\r\n?|\n).*/g))&&(this.yylineno+=n.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:n?n[n.length-1].length-n[n.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+t[0].length},this.yytext+=t[0],this.match+=t[0],this.matches=t,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(t[0].length),this.matched+=t[0],i=this.performAction.call(this,this.yy,this,e,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),i)return i;if(this._backtrack)for(var a in r)this[a]=r[a];return!1},"test_match"),next:(0,s.K)(function(){if(this.done)return this.EOF;var t,e,i,n;this._input||(this.done=!0),this._more||(this.yytext="",this.match="");for(var r=this._currentRules(),a=0;a<r.length;a++)if((i=this._input.match(this.rules[r[a]]))&&(!e||i[0].length>e[0].length)){if(e=i,n=a,this.options.backtrack_lexer){if(!1!==(t=this.test_match(i,r[a])))return t;if(!this._backtrack)return!1;e=!1;continue}if(!this.options.flex)break}return e?!1!==(t=this.test_match(e,r[n]))&&t:""===this._input?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+". Unrecognized text.\n"+this.showPosition(),{text:"",token:null,line:this.yylineno})},"next"),lex:(0,s.K)(function(){var t=this.next();return t||this.lex()},"lex"),begin:(0,s.K)(function(t){this.conditionStack.push(t)},"begin"),popState:(0,s.K)(function(){var t=this.conditionStack.length-1;return t>0?this.conditionStack.pop():this.conditionStack[0]},"popState"),_currentRules:(0,s.K)(function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules},"_currentRules"),topState:(0,s.K)(function(t){return(t=this.conditionStack.length-1-Math.abs(t||0))>=0?this.conditionStack[t]:"INITIAL"},"topState"),pushState:(0,s.K)(function(t){this.begin(t)},"pushState"),stateStackSize:(0,s.K)(function(){return this.conditionStack.length},"stateStackSize"),options:{"case-insensitive":!0},performAction:(0,s.K)(function(t,e,i,n){switch(i){case 0:case 1:case 3:case 4:break;case 2:return 10;case 5:return 4;case 6:return 11;case 7:return this.begin("acc_title"),12;case 8:return this.popState(),"acc_title_value";case 9:return this.begin("acc_descr"),14;case 10:return this.popState(),"acc_descr_value";case 11:this.begin("acc_descr_multiline");break;case 12:this.popState();break;case 13:return"acc_descr_multiline_value";case 14:return 17;case 15:return 18;case 16:return 19;case 17:return":";case 18:return 6;case 19:return"INVALID"}},"anonymous"),rules:[/^(?:%(?!\{)[^\n]*)/i,/^(?:[^\}]%%[^\n]*)/i,/^(?:[\n]+)/i,/^(?:\s+)/i,/^(?:#[^\n]*)/i,/^(?:journey\b)/i,/^(?:title\s[^#\n;]+)/i,/^(?:accTitle\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*\{\s*)/i,/^(?:[\}])/i,/^(?:[^\}]*)/i,/^(?:section\s[^#:\n;]+)/i,/^(?:[^#:\n;]+)/i,/^(?::[^#\n;]+)/i,/^(?::)/i,/^(?:$)/i,/^(?:.)/i],conditions:{acc_descr_multiline:{rules:[12,13],inclusive:!1},acc_descr:{rules:[10],inclusive:!1},acc_title:{rules:[8],inclusive:!1},INITIAL:{rules:[0,1,2,3,4,5,6,7,9,11,14,15,16,17,18,19],inclusive:!0}}};return t}();function u(){this.yy={}}return c.lexer=h,(0,s.K)(u,"Parser"),u.prototype=c,c.Parser=u,new u}();o.parser=o;var c=o,h="",u=[],p=[],y=[],d=(0,s.K)(function(){u.length=0,p.length=0,h="",y.length=0,(0,a.IU)()},"clear"),f=(0,s.K)(function(t){h=t,u.push(t)},"addSection"),g=(0,s.K)(function(){return u},"getSections"),x=(0,s.K)(function(){let t=b(),e=100,i=0;for(;!t&&i<e;)t=b(),i++;return p.push(...y),p},"getTasks"),m=(0,s.K)(function(){let t=[];p.forEach(e=>{e.people&&t.push(...e.people)});let e=new Set(t);return[...e].sort()},"updateActors"),k=(0,s.K)(function(t,e){let i=e.substr(1).split(":"),n=0,r=[];1===i.length?(n=Number(i[0]),r=[]):(n=Number(i[0]),r=i[1].split(","));let a=r.map(t=>t.trim()),s={section:h,type:h,people:a,task:t,score:n};y.push(s)},"addTask"),_=(0,s.K)(function(t){let e={section:h,type:h,description:t,task:t,classes:[]};p.push(e)},"addTaskOrg"),b=(0,s.K)(function(){let t=(0,s.K)(function(t){return y[t].processed},"compileTask"),e=!0;for(let[i,n]of y.entries())t(i),e=e&&n.processed;return e},"compileTasks"),v=(0,s.K)(function(){return m()},"getActors"),w={getConfig:(0,s.K)(()=>(0,a.D7)().journey,"getConfig"),clear:d,setDiagramTitle:a.ke,getDiagramTitle:a.ab,setAccTitle:a.SV,getAccTitle:a.iN,setAccDescription:a.EI,getAccDescription:a.m7,addSection:f,getSections:g,getTasks:x,addTask:k,addTaskOrg:_,getActors:v},K=(0,s.K)(t=>`.label {
    font-family: ${t.fontFamily};
    color: ${t.textColor};
  }
  .mouth {
    stroke: #666;
  }

  line {
    stroke: ${t.textColor}
  }

  .legend {
    fill: ${t.textColor};
    font-family: ${t.fontFamily};
  }

  .label text {
    fill: #333;
  }
  .label {
    color: ${t.textColor}
  }

  .face {
    ${t.faceColor?`fill: ${t.faceColor}`:"fill: #FFF8DC"};
    stroke: #999;
  }

  .node rect,
  .node circle,
  .node ellipse,
  .node polygon,
  .node path {
    fill: ${t.mainBkg};
    stroke: ${t.nodeBorder};
    stroke-width: 1px;
  }

  .node .label {
    text-align: center;
  }
  .node.clickable {
    cursor: pointer;
  }

  .arrowheadPath {
    fill: ${t.arrowheadColor};
  }

  .edgePath .path {
    stroke: ${t.lineColor};
    stroke-width: 1.5px;
  }

  .flowchart-link {
    stroke: ${t.lineColor};
    fill: none;
  }

  .edgeLabel {
    background-color: ${t.edgeLabelBackground};
    rect {
      opacity: 0.5;
    }
    text-align: center;
  }

  .cluster rect {
  }

  .cluster text {
    fill: ${t.titleColor};
  }

  div.mermaidTooltip {
    position: absolute;
    text-align: center;
    max-width: 200px;
    padding: 2px;
    font-family: ${t.fontFamily};
    font-size: 12px;
    background: ${t.tertiaryColor};
    border: 1px solid ${t.border2};
    border-radius: 2px;
    pointer-events: none;
    z-index: 100;
  }

  .task-type-0, .section-type-0  {
    ${t.fillType0?`fill: ${t.fillType0}`:""};
  }
  .task-type-1, .section-type-1  {
    ${t.fillType0?`fill: ${t.fillType1}`:""};
  }
  .task-type-2, .section-type-2  {
    ${t.fillType0?`fill: ${t.fillType2}`:""};
  }
  .task-type-3, .section-type-3  {
    ${t.fillType0?`fill: ${t.fillType3}`:""};
  }
  .task-type-4, .section-type-4  {
    ${t.fillType0?`fill: ${t.fillType4}`:""};
  }
  .task-type-5, .section-type-5  {
    ${t.fillType0?`fill: ${t.fillType5}`:""};
  }
  .task-type-6, .section-type-6  {
    ${t.fillType0?`fill: ${t.fillType6}`:""};
  }
  .task-type-7, .section-type-7  {
    ${t.fillType0?`fill: ${t.fillType7}`:""};
  }

  .actor-0 {
    ${t.actor0?`fill: ${t.actor0}`:""};
  }
  .actor-1 {
    ${t.actor1?`fill: ${t.actor1}`:""};
  }
  .actor-2 {
    ${t.actor2?`fill: ${t.actor2}`:""};
  }
  .actor-3 {
    ${t.actor3?`fill: ${t.actor3}`:""};
  }
  .actor-4 {
    ${t.actor4?`fill: ${t.actor4}`:""};
  }
  .actor-5 {
    ${t.actor5?`fill: ${t.actor5}`:""};
  }
  ${(0,n.o)()}
`,"getStyles"),$=K,M=(0,s.K)(function(t,e){return(0,r.tk)(t,e)},"drawRect"),T=(0,s.K)(function(t,e){let i=15,n=t.append("circle").attr("cx",e.cx).attr("cy",e.cy).attr("class","face").attr("r",i).attr("stroke-width",2).attr("overflow","visible"),r=t.append("g");function a(t){let n=(0,l.JLW)().startAngle(Math.PI/2).endAngle(Math.PI/2*3).innerRadius(i/2).outerRadius(i/2.2);t.append("path").attr("class","mouth").attr("d",n).attr("transform","translate("+e.cx+","+(e.cy+2)+")")}function o(t){let n=(0,l.JLW)().startAngle(3*Math.PI/2).endAngle(Math.PI/2*5).innerRadius(i/2).outerRadius(i/2.2);t.append("path").attr("class","mouth").attr("d",n).attr("transform","translate("+e.cx+","+(e.cy+7)+")")}function c(t){t.append("line").attr("class","mouth").attr("stroke",2).attr("x1",e.cx-5).attr("y1",e.cy+7).attr("x2",e.cx+5).attr("y2",e.cy+7).attr("class","mouth").attr("stroke-width","1px").attr("stroke","#666")}return r.append("circle").attr("cx",e.cx-i/3).attr("cy",e.cy-i/3).attr("r",1.5).attr("stroke-width",2).attr("fill","#666").attr("stroke","#666"),r.append("circle").attr("cx",e.cx+i/3).attr("cy",e.cy-i/3).attr("r",1.5).attr("stroke-width",2).attr("fill","#666").attr("stroke","#666"),(0,s.K)(a,"smile"),(0,s.K)(o,"sad"),(0,s.K)(c,"ambivalent"),e.score>3?a(r):e.score<3?o(r):c(r),n},"drawFace"),S=(0,s.K)(function(t,e){let i=t.append("circle");return i.attr("cx",e.cx),i.attr("cy",e.cy),i.attr("class","actor-"+e.pos),i.attr("fill",e.fill),i.attr("stroke",e.stroke),i.attr("r",e.r),void 0!==i.class&&i.attr("class",i.class),void 0!==e.title&&i.append("title").text(e.title),i},"drawCircle"),C=(0,s.K)(function(t,e){return(0,r.m)(t,e)},"drawText"),E=(0,s.K)(function(t,e,i){let n=t.append("g"),a=(0,r.PB)();a.x=e.x,a.y=e.y,a.fill=e.fill,a.width=i.width*e.taskCount+i.diagramMarginX*(e.taskCount-1),a.height=i.height,a.class="journey-section section-type-"+e.num,a.rx=3,a.ry=3,M(n,a),A(i)(e.text,n,a.x,a.y,a.width,a.height,{class:"journey-section section-type-"+e.num},i,e.colour)},"drawSection"),I=-1,P=(0,s.K)(function(t,e,i,n){let a=e.x+i.width/2,s=t.append("g");I++;let l=450;s.append("line").attr("id",n+"-task"+I).attr("x1",a).attr("y1",e.y).attr("x2",a).attr("y2",l).attr("class","task-line").attr("stroke-width","1px").attr("stroke-dasharray","4 2").attr("stroke","#666"),T(s,{cx:a,cy:300+(5-e.score)*30,score:e.score});let o=(0,r.PB)();o.x=e.x,o.y=e.y,o.fill=e.fill,o.width=i.width,o.height=i.height,o.class="task task-type-"+e.num,o.rx=3,o.ry=3,M(s,o);let c=e.x+14;e.people.forEach(t=>{let i=e.actors[t].color,n={cx:c,cy:e.y,r:7,fill:i,stroke:"#000",title:t,pos:e.actors[t].position};S(s,n),c+=10}),A(i)(e.task,s,o.x,o.y,o.width,o.height,{class:"task"},i,e.colour)},"drawTask"),A=function(){function t(t,e,i,r,a,s,l,o){let c=e.append("text").attr("x",i+a/2).attr("y",r+s/2+5).style("font-color",o).style("text-anchor","middle").text(t);n(c,l)}function e(t,e,i,r,a,s,l,o,c){let{taskFontSize:h,taskFontFamily:u}=o,p=t.split(/<br\s*\/?>/gi);for(let t=0;t<p.length;t++){let o=t*h-h*(p.length-1)/2,y=e.append("text").attr("x",i+a/2).attr("y",r).attr("fill",c).style("text-anchor","middle").style("font-size",h).style("font-family",u);y.append("tspan").attr("x",i+a/2).attr("dy",o).text(p[t]),y.attr("y",r+s/2).attr("dominant-baseline","central").attr("alignment-baseline","central"),n(y,l)}}function i(t,i,r,a,s,l,o,c){let h=i.append("switch"),u=h.append("foreignObject").attr("x",r).attr("y",a).attr("width",s).attr("height",l).attr("position","fixed"),p=u.append("xhtml:div").style("display","table").style("height","100%").style("width","100%");p.append("div").attr("class","label").style("display","table-cell").style("text-align","center").style("vertical-align","middle").text(t),e(t,h,r,a,s,l,o,c),n(p,o)}function n(t,e){for(let i in e)i in e&&t.attr(i,e[i])}return(0,s.K)(t,"byText"),(0,s.K)(e,"byTspan"),(0,s.K)(i,"byFo"),(0,s.K)(n,"_setTextAttrs"),function(n){return"fo"===n.textPlacement?i:"old"===n.textPlacement?t:e}}(),j=(0,s.K)(function(t,e){I=-1,t.append("defs").append("marker").attr("id",e+"-arrowhead").attr("refX",5).attr("refY",2).attr("markerWidth",6).attr("markerHeight",4).attr("orient","auto").append("path").attr("d","M 0,0 V 4 L6,2 Z")},"initGraphics"),L=S,D=E,V=C,B=P,F=j,R=(0,s.K)(function(t){let e=Object.keys(t);e.forEach(function(e){W[e]=t[e]})},"setConf"),O={},N=0;function z(t){let e=(0,a.D7)().journey,i=e.maxLabelWidth;N=0;let n=60;Object.keys(O).forEach(r=>{let a=O[r].color,s={cx:20,cy:n,r:7,fill:a,stroke:"#000",pos:O[r].position};L(t,s);let l=t.append("text").attr("visibility","hidden").text(r),o=l.node().getBoundingClientRect().width;l.remove();let c=[];if(o<=i)c=[r];else{let e=r.split(" "),n="";l=t.append("text").attr("visibility","hidden"),e.forEach(t=>{let e=n?`${n} ${t}`:t;l.text(e);let r=l.node().getBoundingClientRect().width;if(r>i){if(n&&c.push(n),n=t,l.text(t),l.node().getBoundingClientRect().width>i){let e="";for(let n of t)e+=n,l.text(e+"-"),l.node().getBoundingClientRect().width>i&&(c.push(e.slice(0,-1)+"-"),e=n);n=e}}else n=e}),n&&c.push(n),l.remove()}c.forEach((i,r)=>{var a;let s={x:40,y:n+7+20*r,fill:"#666",text:i,textMargin:null!=(a=e.boxTextMargin)?a:5},l=V(t,s),o=l.node().getBoundingClientRect().width;o>N&&o>e.leftMargin-o&&(N=o)}),n+=Math.max(20,20*c.length)})}(0,s.K)(z,"drawActorLegend");var W=(0,a.D7)().journey,Y=0,U=(0,s.K)(function(t,e,i,n){let r=(0,a.D7)(),s=r.journey.titleColor,o=r.journey.titleFontSize,c=r.journey.titleFontFamily,h=r.securityLevel,u;"sandbox"===h&&(u=(0,l.Ltv)("#i"+e));let p="sandbox"===h?(0,l.Ltv)(u.nodes()[0].contentDocument.body):(0,l.Ltv)("body");q.init();let y=p.select("#"+e);F(y,e);let d=n.db.getTasks(),f=n.db.getDiagramTitle(),g=n.db.getActors();for(let t in O)delete O[t];let x=0;g.forEach(t=>{O[t]={color:W.actorColours[x%W.actorColours.length],position:x},x++}),z(y),Y=W.leftMargin+N,q.insert(0,0,Y,50*Object.keys(O).length),J(y,d,0,e);let m=q.getBounds();f&&y.append("text").text(f).attr("x",Y).attr("font-size",o).attr("font-weight","bold").attr("y",25).attr("fill",s).attr("font-family",c);let k=m.stopy-m.starty+2*W.diagramMarginY,_=Y+m.stopx+2*W.diagramMarginX;(0,a.a$)(y,k,_,W.useMaxWidth),y.append("line").attr("x1",Y).attr("y1",4*W.height).attr("x2",_-Y-4).attr("y2",4*W.height).attr("stroke-width",4).attr("stroke","black").attr("marker-end","url(#"+e+"-arrowhead)");let b=70*!!f;y.attr("viewBox",`${m.startx} -25 ${_} ${k+b}`),y.attr("preserveAspectRatio","xMinYMin meet"),y.attr("height",k+b+25)},"draw"),q={data:{startx:void 0,stopx:void 0,starty:void 0,stopy:void 0},verticalPos:0,sequenceItems:[],init:(0,s.K)(function(){this.sequenceItems=[],this.data={startx:void 0,stopx:void 0,starty:void 0,stopy:void 0},this.verticalPos=0},"init"),updateVal:(0,s.K)(function(t,e,i,n){void 0===t[e]?t[e]=i:t[e]=n(i,t[e])},"updateVal"),updateBounds:(0,s.K)(function(t,e,i,n){let r=(0,a.D7)().journey,l=this,o=0;function c(a){return(0,s.K)(function(s){o++;let c=l.sequenceItems.length-o+1;l.updateVal(s,"starty",e-c*r.boxMargin,Math.min),l.updateVal(s,"stopy",n+c*r.boxMargin,Math.max),l.updateVal(q.data,"startx",t-c*r.boxMargin,Math.min),l.updateVal(q.data,"stopx",i+c*r.boxMargin,Math.max),"activation"!==a&&(l.updateVal(s,"startx",t-c*r.boxMargin,Math.min),l.updateVal(s,"stopx",i+c*r.boxMargin,Math.max),l.updateVal(q.data,"starty",e-c*r.boxMargin,Math.min),l.updateVal(q.data,"stopy",n+c*r.boxMargin,Math.max))},"updateItemBounds")}(0,s.K)(c,"updateFn"),this.sequenceItems.forEach(c())},"updateBounds"),insert:(0,s.K)(function(t,e,i,n){let r=Math.min(t,i),a=Math.max(t,i),s=Math.min(e,n),l=Math.max(e,n);this.updateVal(q.data,"startx",r,Math.min),this.updateVal(q.data,"starty",s,Math.min),this.updateVal(q.data,"stopx",a,Math.max),this.updateVal(q.data,"stopy",l,Math.max),this.updateBounds(r,s,a,l)},"insert"),bumpVerticalPos:(0,s.K)(function(t){this.verticalPos=this.verticalPos+t,this.data.stopy=this.verticalPos},"bumpVerticalPos"),getVerticalPos:(0,s.K)(function(){return this.verticalPos},"getVerticalPos"),getBounds:(0,s.K)(function(){return this.data},"getBounds")},X=W.sectionFills,H=W.sectionColours,J=(0,s.K)(function(t,e,i,n){let r=(0,a.D7)().journey,s="",l=2*r.height+r.diagramMarginY,o=i+l,c=0,h="#CCC",u="black",p=0;for(let[i,a]of e.entries()){if(s!==a.section){h=X[c%X.length],p=c%X.length,u=H[c%H.length];let n=0,l=a.section;for(let t=i;t<e.length;t++)if(e[t].section==l)n+=1;else break;let o={x:i*r.taskMargin+i*r.width+Y,y:50,text:a.section,fill:h,num:p,colour:u,taskCount:n};D(t,o,r),s=a.section,c++}let l=a.people.reduce((t,e)=>(O[e]&&(t[e]=O[e]),t),{});a.x=i*r.taskMargin+i*r.width+Y,a.y=o,a.width=r.diagramMarginX,a.height=r.diagramMarginY,a.colour=u,a.fill=h,a.num=p,a.actors=l,B(t,a,r,n),q.insert(a.x,a.y,a.x+a.width+r.taskMargin,450)}},"drawTasks"),G={setConf:R,draw:U},Z={parser:c,db:w,renderer:G,styles:$,init:(0,s.K)(t=>{G.setConf(t.journey),w.clear()},"init")}}}]);