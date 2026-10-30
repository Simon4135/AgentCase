(self.webpackChunk_mindx_app_mindx=self.webpackChunk_mindx_app_mindx||[]).push([["72905"],{44321(t){!function(e){t.exports=e()}(function(){return function(t,e){var i=e.prototype,s=i.format;i.format=function(t){var e=this,i=this.$locale();if(!this.isValid())return s.bind(this)(t);var n=this.$utils(),r=(t||"YYYY-MM-DDTHH:mm:ssZ").replace(/\[([^\]]+)]|Q|wo|ww|w|WW|W|zzz|z|gggg|GGGG|Do|X|x|k{1,2}|S/g,function(t){switch(t){case"Q":return Math.ceil((e.$M+1)/3);case"Do":return i.ordinal(e.$D);case"gggg":return e.weekYear();case"GGGG":return e.isoWeekYear();case"wo":return i.ordinal(e.week(),"W");case"w":case"ww":return n.s(e.week(),"w"===t?1:2,"0");case"W":case"WW":return n.s(e.isoWeek(),"W"===t?1:2,"0");case"k":case"kk":return n.s(String(0===e.$H?24:e.$H),"k"===t?1:2,"0");case"X":return Math.floor(e.$d.getTime()/1e3);case"x":return e.$d.getTime();case"z":return"["+e.offsetName()+"]";case"zzz":return"["+e.offsetName("long")+"]";default:return t}});return s.bind(this)(r)}}})},98331(t){!function(e){t.exports=e()}(function(){"use strict";var t={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"},e=/(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|Q|YYYY|YY?|ww?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g,i=/\d/,s=/\d\d/,n=/\d\d?/,r=/\d*[^-_:/,()\s\d]+/,a={},o=function(t){return(t*=1)+(t>68?1900:2e3)},c=function(t){return function(e){this[t]=+e}},l=[/[+-]\d\d:?(\d\d)?|Z/,function(t){(this.zone||(this.zone={})).offset=function(t){if(!t||"Z"===t)return 0;var e=t.match(/([+-]|\d\d)/g),i=60*e[1]+(+e[2]||0);return 0===i?0:"+"===e[0]?-i:i}(t)}],d=function(t){var e=a[t];return e&&(e.indexOf?e:e.s.concat(e.f))},u=function(t,e){var i,s=a.meridiem;if(s){for(var n=1;n<=24;n+=1)if(t.indexOf(s(n,0,e))>-1){i=n>12;break}}else i=t===(e?"pm":"PM");return i},h={A:[r,function(t){this.afternoon=u(t,!1)}],a:[r,function(t){this.afternoon=u(t,!0)}],Q:[i,function(t){this.month=3*(t-1)+1}],S:[i,function(t){this.milliseconds=100*t}],SS:[s,function(t){this.milliseconds=10*t}],SSS:[/\d{3}/,function(t){this.milliseconds=+t}],s:[n,c("seconds")],ss:[n,c("seconds")],m:[n,c("minutes")],mm:[n,c("minutes")],H:[n,c("hours")],h:[n,c("hours")],HH:[n,c("hours")],hh:[n,c("hours")],D:[n,c("day")],DD:[s,c("day")],Do:[r,function(t){var e=a.ordinal,i=t.match(/\d+/);if(this.day=i[0],e)for(var s=1;s<=31;s+=1)e(s).replace(/\[|\]/g,"")===t&&(this.day=s)}],w:[n,c("week")],ww:[s,c("week")],M:[n,c("month")],MM:[s,c("month")],MMM:[r,function(t){var e=d("months"),i=(d("monthsShort")||e.map(function(t){return t.slice(0,3)})).indexOf(t)+1;if(i<1)throw Error();this.month=i%12||i}],MMMM:[r,function(t){var e=d("months").indexOf(t)+1;if(e<1)throw Error();this.month=e%12||e}],Y:[/[+-]?\d+/,c("year")],YY:[s,function(t){this.year=o(t)}],YYYY:[/\d{4}/,c("year")],Z:l,ZZ:l};function f(i){var s,n;s=i,n=a&&a.formats;for(var r=(i=s.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g,function(e,i,s){var r=s&&s.toUpperCase();return i||n[s]||t[s]||n[r].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g,function(t,e,i){return e||i.slice(1)})})).match(e),o=r.length,c=0;c<o;c+=1){var l=r[c],d=h[l],u=d&&d[0],f=d&&d[1];r[c]=f?{regex:u,parser:f}:l.replace(/^\[|\]$/g,"")}return function(t){for(var e={},i=0,s=0;i<o;i+=1){var n=r[i];if("string"==typeof n)s+=n.length;else{var a=n.regex,c=n.parser,l=t.slice(s),d=a.exec(l)[0];c.call(e,d),t=t.replace(d,"")}}return function(t){var e=t.afternoon;if(void 0!==e){var i=t.hours;e?i<12&&(t.hours+=12):12===i&&(t.hours=0),delete t.afternoon}}(e),e}}return function(t,e,i){i.p.customParseFormat=!0,t&&t.parseTwoDigitYear&&(o=t.parseTwoDigitYear);var s=e.prototype,n=s.parse;s.parse=function(t){var e=t.date,s=t.utc,r=t.args;this.$u=s;var o=r[1];if("string"==typeof o){var c=!0===r[2],l=!0===r[3],d=c||l,u=r[2];l&&(u=r[2]),a=this.$locale(),!c&&u&&(a=i.Ls[u]),this.$d=function(t,e,i,s){try{if(["x","X"].indexOf(e)>-1)return new Date(("X"===e?1e3:1)*t);var n=f(e)(t),r=n.year,a=n.month,o=n.day,c=n.hours,l=n.minutes,d=n.seconds,u=n.milliseconds,h=n.zone,m=n.week,k=new Date,y=o||(r||a?1:k.getDate()),p=r||k.getFullYear(),g=0;r&&!a||(g=a>0?a-1:k.getMonth());var v,x=c||0,T=l||0,b=d||0,$=u||0;return h?new Date(Date.UTC(p,g,y,x,T,b,$+60*h.offset*1e3)):i?new Date(Date.UTC(p,g,y,x,T,b,$)):(v=new Date(p,g,y,x,T,b,$),m&&(v=s(v).week(m).toDate()),v)}catch(t){return new Date("")}}(e,o,s,i),this.init(),u&&!0!==u&&(this.$L=this.locale(u).$L),d&&e!=this.format(o)&&(this.$d=new Date("")),a={}}else if(o instanceof Array)for(var h=o.length,m=1;m<=h;m+=1){r[1]=o[m-1];var k=i.apply(this,r);if(k.isValid()){this.$d=k.$d,this.$L=k.$L,this.init();break}m===h&&(this.$d=new Date(""))}else n.call(this,t)}}})},8472(t){!function(e){t.exports=e()}(function(){"use strict";var t,e,i=1e3,s=6e4,n=36e5,r=864e5,a=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,o=31536e6,c=2628e6,l=/^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/,d={years:o,months:c,days:r,hours:n,minutes:s,seconds:i,milliseconds:1,weeks:6048e5},u=function(t){return t instanceof g},h=function(t,e,i){return new g(t,i,e.$l)},f=function(t){return e.p(t)+"s"},m=function(t){return t<0},k=function(t){return m(t)?Math.ceil(t):Math.floor(t)},y=function(t){return Math.abs(t)},p=function(t,e){return t?m(t)?{negative:!0,format:""+y(t)+e}:{negative:!1,format:""+t+e}:{negative:!1,format:""}},g=function(){function m(t,e,i){var s=this;if(this.$d={},this.$l=i,void 0===t&&(this.$ms=0,this.parseFromMilliseconds()),e)return h(t*d[f(e)],this);if("number"==typeof t)return this.$ms=t,this.parseFromMilliseconds(),this;if("object"==typeof t)return Object.keys(t).forEach(function(e){s.$d[f(e)]=t[e]}),this.calMilliseconds(),this;if("string"==typeof t){var n=t.match(l);if(n){var r=n.slice(2).map(function(t){return null!=t?Number(t):0});return this.$d.years=r[0],this.$d.months=r[1],this.$d.weeks=r[2],this.$d.days=r[3],this.$d.hours=r[4],this.$d.minutes=r[5],this.$d.seconds=r[6],this.calMilliseconds(),this}}return this}var y=m.prototype;return y.calMilliseconds=function(){var t=this;this.$ms=Object.keys(this.$d).reduce(function(e,i){return e+(t.$d[i]||0)*d[i]},0)},y.parseFromMilliseconds=function(){var t=this.$ms;this.$d.years=k(t/o),t%=o,this.$d.months=k(t/c),t%=c,this.$d.days=k(t/r),t%=r,this.$d.hours=k(t/n),t%=n,this.$d.minutes=k(t/s),t%=s,this.$d.seconds=k(t/i),t%=i,this.$d.milliseconds=t},y.toISOString=function(){var t=p(this.$d.years,"Y"),e=p(this.$d.months,"M"),i=+this.$d.days||0;this.$d.weeks&&(i+=7*this.$d.weeks);var s=p(i,"D"),n=p(this.$d.hours,"H"),r=p(this.$d.minutes,"M"),a=this.$d.seconds||0;this.$d.milliseconds&&(a+=this.$d.milliseconds/1e3,a=Math.round(1e3*a)/1e3);var o=p(a,"S"),c=t.negative||e.negative||s.negative||n.negative||r.negative||o.negative,l=n.format||r.format||o.format?"T":"",d=(c?"-":"")+"P"+t.format+e.format+s.format+l+n.format+r.format+o.format;return"P"===d||"-P"===d?"P0D":d},y.toJSON=function(){return this.toISOString()},y.format=function(t){var i=t||"YYYY-MM-DDTHH:mm:ss",s={Y:this.$d.years,YY:e.s(this.$d.years,2,"0"),YYYY:e.s(this.$d.years,4,"0"),M:this.$d.months,MM:e.s(this.$d.months,2,"0"),D:this.$d.days,DD:e.s(this.$d.days,2,"0"),H:this.$d.hours,HH:e.s(this.$d.hours,2,"0"),m:this.$d.minutes,mm:e.s(this.$d.minutes,2,"0"),s:this.$d.seconds,ss:e.s(this.$d.seconds,2,"0"),SSS:e.s(this.$d.milliseconds,3,"0")};return i.replace(a,function(t,e){return e||String(s[t])})},y.as=function(t){return this.$ms/d[f(t)]},y.get=function(t){var e=this.$ms,i=f(t);return"milliseconds"===i?e%=1e3:e="weeks"===i?k(e/d[i]):this.$d[i],e||0},y.add=function(t,e,i){var s;return s=e?t*d[f(e)]:u(t)?t.$ms:h(t,this).$ms,h(this.$ms+s*(i?-1:1),this)},y.subtract=function(t,e){return this.add(t,e,!0)},y.locale=function(t){var e=this.clone();return e.$l=t,e},y.clone=function(){return h(this.$ms,this)},y.humanize=function(e){return t().add(this.$ms,"ms").locale(this.$l).fromNow(!e)},y.valueOf=function(){return this.asMilliseconds()},y.milliseconds=function(){return this.get("milliseconds")},y.asMilliseconds=function(){return this.as("milliseconds")},y.seconds=function(){return this.get("seconds")},y.asSeconds=function(){return this.as("seconds")},y.minutes=function(){return this.get("minutes")},y.asMinutes=function(){return this.as("minutes")},y.hours=function(){return this.get("hours")},y.asHours=function(){return this.as("hours")},y.days=function(){return this.get("days")},y.asDays=function(){return this.as("days")},y.weeks=function(){return this.get("weeks")},y.asWeeks=function(){return this.as("weeks")},y.months=function(){return this.get("months")},y.asMonths=function(){return this.as("months")},y.years=function(){return this.get("years")},y.asYears=function(){return this.as("years")},m}(),v=function(t,e,i){return t.add(e.years()*i,"y").add(e.months()*i,"M").add(e.days()*i,"d").add(e.hours()*i,"h").add(e.minutes()*i,"m").add(e.seconds()*i,"s").add(e.milliseconds()*i,"ms")};return function(i,s,n){t=n,e=n().$utils(),n.duration=function(t,e){var i=n.locale();return h(t,{$l:i},e)},n.isDuration=u;var r=s.prototype.add,a=s.prototype.subtract;s.prototype.add=function(t,e){return u(t)?v(this,t,1):r.bind(this)(t,e)},s.prototype.subtract=function(t,e){return u(t)?v(this,t,-1):a.bind(this)(t,e)}}})},89151(t){!function(e){t.exports=e()}(function(){"use strict";var t="day";return function(e,i,s){var n=function(e){return e.add(4-e.isoWeekday(),t)},r=i.prototype;r.isoWeekYear=function(){return n(this).year()},r.isoWeek=function(e){if(!this.$utils().u(e))return this.add(7*(e-this.isoWeek()),t);var i,r,a,o=n(this),c=(i=this.isoWeekYear(),a=4-(r=(this.$u?s.utc:s)().year(i).startOf("year")).isoWeekday(),r.isoWeekday()>4&&(a+=7),r.add(a,t));return o.diff(c,"week")+1},r.isoWeekday=function(t){return this.$utils().u(t)?this.day()||7:this.day(this.day()%7?t:t-7)};var a=r.startOf;r.startOf=function(t,e){var i=this.$utils(),s=!!i.u(e)||e;return"isoweek"===i.p(t)?s?this.date(this.date()-(this.isoWeekday()-1)).startOf("day"):this.date(this.date()-1-(this.isoWeekday()-1)+7).endOf("day"):a.bind(this)(t,e)}}})},20080(t,e,i){"use strict";i.d(e,{diagram:()=>tG});var s=i(43421),n=i(77130),r=i(80691),a=i(63125),o=i(17828),c=i(26735),l=i(89151),d=i(98331),u=i(44321),h=i(8472),f=i(51949),m=function(){var t=(0,a.K)(function(t,e,i,s){for(i=i||{},s=t.length;s--;i[t[s]]=e);return i},"o"),e=[6,8,10,12,13,14,15,16,17,18,20,21,22,23,24,25,26,27,28,29,30,31,33,35,36,38,40],i=[1,26],s=[1,27],n=[1,28],r=[1,29],o=[1,30],c=[1,31],l=[1,32],d=[1,33],u=[1,34],h=[1,9],f=[1,10],m=[1,11],k=[1,12],y=[1,13],p=[1,14],g=[1,15],v=[1,16],x=[1,19],T=[1,20],b=[1,21],$=[1,22],w=[1,23],_=[1,25],D=[1,35],S={trace:(0,a.K)(function(){},"trace"),yy:{},symbols_:{error:2,start:3,gantt:4,document:5,EOF:6,line:7,SPACE:8,statement:9,NL:10,weekday:11,weekday_monday:12,weekday_tuesday:13,weekday_wednesday:14,weekday_thursday:15,weekday_friday:16,weekday_saturday:17,weekday_sunday:18,weekend:19,weekend_friday:20,weekend_saturday:21,dateFormat:22,inclusiveEndDates:23,topAxis:24,axisFormat:25,tickInterval:26,excludes:27,includes:28,todayMarker:29,title:30,acc_title:31,acc_title_value:32,acc_descr:33,acc_descr_value:34,acc_descr_multiline_value:35,section:36,clickStatement:37,taskTxt:38,taskData:39,click:40,callbackname:41,callbackargs:42,href:43,clickStatementDebug:44,$accept:0,$end:1},terminals_:{2:"error",4:"gantt",6:"EOF",8:"SPACE",10:"NL",12:"weekday_monday",13:"weekday_tuesday",14:"weekday_wednesday",15:"weekday_thursday",16:"weekday_friday",17:"weekday_saturday",18:"weekday_sunday",20:"weekend_friday",21:"weekend_saturday",22:"dateFormat",23:"inclusiveEndDates",24:"topAxis",25:"axisFormat",26:"tickInterval",27:"excludes",28:"includes",29:"todayMarker",30:"title",31:"acc_title",32:"acc_title_value",33:"acc_descr",34:"acc_descr_value",35:"acc_descr_multiline_value",36:"section",38:"taskTxt",39:"taskData",40:"click",41:"callbackname",42:"callbackargs",43:"href"},productions_:[0,[3,3],[5,0],[5,2],[7,2],[7,1],[7,1],[7,1],[11,1],[11,1],[11,1],[11,1],[11,1],[11,1],[11,1],[19,1],[19,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,2],[9,2],[9,1],[9,1],[9,1],[9,2],[37,2],[37,3],[37,3],[37,4],[37,3],[37,4],[37,2],[44,2],[44,3],[44,3],[44,4],[44,3],[44,4],[44,2]],performAction:(0,a.K)(function(t,e,i,s,n,r,a){var o=r.length-1;switch(n){case 1:return r[o-1];case 2:case 6:case 7:this.$=[];break;case 3:r[o-1].push(r[o]),this.$=r[o-1];break;case 4:case 5:this.$=r[o];break;case 8:s.setWeekday("monday");break;case 9:s.setWeekday("tuesday");break;case 10:s.setWeekday("wednesday");break;case 11:s.setWeekday("thursday");break;case 12:s.setWeekday("friday");break;case 13:s.setWeekday("saturday");break;case 14:s.setWeekday("sunday");break;case 15:s.setWeekend("friday");break;case 16:s.setWeekend("saturday");break;case 17:s.setDateFormat(r[o].substr(11)),this.$=r[o].substr(11);break;case 18:s.enableInclusiveEndDates(),this.$=r[o].substr(18);break;case 19:s.TopAxis(),this.$=r[o].substr(8);break;case 20:s.setAxisFormat(r[o].substr(11)),this.$=r[o].substr(11);break;case 21:s.setTickInterval(r[o].substr(13)),this.$=r[o].substr(13);break;case 22:s.setExcludes(r[o].substr(9)),this.$=r[o].substr(9);break;case 23:s.setIncludes(r[o].substr(9)),this.$=r[o].substr(9);break;case 24:s.setTodayMarker(r[o].substr(12)),this.$=r[o].substr(12);break;case 27:s.setDiagramTitle(r[o].substr(6)),this.$=r[o].substr(6);break;case 28:this.$=r[o].trim(),s.setAccTitle(this.$);break;case 29:case 30:this.$=r[o].trim(),s.setAccDescription(this.$);break;case 31:s.addSection(r[o].substr(8)),this.$=r[o].substr(8);break;case 33:s.addTask(r[o-1],r[o]),this.$="task";break;case 34:this.$=r[o-1],s.setClickEvent(r[o-1],r[o],null);break;case 35:this.$=r[o-2],s.setClickEvent(r[o-2],r[o-1],r[o]);break;case 36:this.$=r[o-2],s.setClickEvent(r[o-2],r[o-1],null),s.setLink(r[o-2],r[o]);break;case 37:this.$=r[o-3],s.setClickEvent(r[o-3],r[o-2],r[o-1]),s.setLink(r[o-3],r[o]);break;case 38:this.$=r[o-2],s.setClickEvent(r[o-2],r[o],null),s.setLink(r[o-2],r[o-1]);break;case 39:this.$=r[o-3],s.setClickEvent(r[o-3],r[o-1],r[o]),s.setLink(r[o-3],r[o-2]);break;case 40:this.$=r[o-1],s.setLink(r[o-1],r[o]);break;case 41:case 47:this.$=r[o-1]+" "+r[o];break;case 42:case 43:case 45:this.$=r[o-2]+" "+r[o-1]+" "+r[o];break;case 44:case 46:this.$=r[o-3]+" "+r[o-2]+" "+r[o-1]+" "+r[o]}},"anonymous"),table:[{3:1,4:[1,2]},{1:[3]},t(e,[2,2],{5:3}),{6:[1,4],7:5,8:[1,6],9:7,10:[1,8],11:17,12:i,13:s,14:n,15:r,16:o,17:c,18:l,19:18,20:d,21:u,22:h,23:f,24:m,25:k,26:y,27:p,28:g,29:v,30:x,31:T,33:b,35:$,36:w,37:24,38:_,40:D},t(e,[2,7],{1:[2,1]}),t(e,[2,3]),{9:36,11:17,12:i,13:s,14:n,15:r,16:o,17:c,18:l,19:18,20:d,21:u,22:h,23:f,24:m,25:k,26:y,27:p,28:g,29:v,30:x,31:T,33:b,35:$,36:w,37:24,38:_,40:D},t(e,[2,5]),t(e,[2,6]),t(e,[2,17]),t(e,[2,18]),t(e,[2,19]),t(e,[2,20]),t(e,[2,21]),t(e,[2,22]),t(e,[2,23]),t(e,[2,24]),t(e,[2,25]),t(e,[2,26]),t(e,[2,27]),{32:[1,37]},{34:[1,38]},t(e,[2,30]),t(e,[2,31]),t(e,[2,32]),{39:[1,39]},t(e,[2,8]),t(e,[2,9]),t(e,[2,10]),t(e,[2,11]),t(e,[2,12]),t(e,[2,13]),t(e,[2,14]),t(e,[2,15]),t(e,[2,16]),{41:[1,40],43:[1,41]},t(e,[2,4]),t(e,[2,28]),t(e,[2,29]),t(e,[2,33]),t(e,[2,34],{42:[1,42],43:[1,43]}),t(e,[2,40],{41:[1,44]}),t(e,[2,35],{43:[1,45]}),t(e,[2,36]),t(e,[2,38],{42:[1,46]}),t(e,[2,37]),t(e,[2,39])],defaultActions:{},parseError:(0,a.K)(function(t,e){if(e.recoverable)this.trace(t);else{var i=Error(t);throw i.hash=e,i}},"parseError"),parse:(0,a.K)(function(t){var e=this,i=[0],s=[],n=[null],r=[],o=this.table,c="",l=0,d=0,u=0,h=2,f=1,m=r.slice.call(arguments,1),k=Object.create(this.lexer),y={};for(var p in this.yy)Object.prototype.hasOwnProperty.call(this.yy,p)&&(y[p]=this.yy[p]);k.setInput(t,y),y.lexer=k,y.parser=this,void 0===k.yylloc&&(k.yylloc={});var g=k.yylloc;r.push(g);var v=k.options&&k.options.ranges;function x(t){i.length=i.length-2*t,n.length=n.length-t,r.length=r.length-t}function T(){var t;return"number"!=typeof(t=s.pop()||k.lex()||f)&&(t instanceof Array&&(t=(s=t).pop()),t=e.symbols_[t]||t),t}"function"==typeof y.parseError?this.parseError=y.parseError:this.parseError=Object.getPrototypeOf(this).parseError,(0,a.K)(x,"popStack"),(0,a.K)(T,"lex");for(var b,$,w,_,D,S={},C,M,K,E;;){if(w=i[i.length-1],this.defaultActions[w]?_=this.defaultActions[w]:(null==b&&(b=T()),_=o[w]&&o[w][b]),void 0===_||!_.length||!_[0]){var Y="";for(C in E=[],o[w])this.terminals_[C]&&C>h&&E.push("'"+this.terminals_[C]+"'");Y=k.showPosition?"Parse error on line "+(l+1)+":\n"+k.showPosition()+"\nExpecting "+E.join(", ")+", got '"+(this.terminals_[b]||b)+"'":"Parse error on line "+(l+1)+": Unexpected "+(b==f?"end of input":"'"+(this.terminals_[b]||b)+"'"),this.parseError(Y,{text:k.match,token:this.terminals_[b]||b,line:k.yylineno,loc:g,expected:E})}if(_[0]instanceof Array&&_.length>1)throw Error("Parse Error: multiple actions possible at state: "+w+", token: "+b);switch(_[0]){case 1:i.push(b),n.push(k.yytext),r.push(k.yylloc),i.push(_[1]),b=null,$?(b=$,$=null):(d=k.yyleng,c=k.yytext,l=k.yylineno,g=k.yylloc,u>0&&u--);break;case 2:if(M=this.productions_[_[1]][1],S.$=n[n.length-M],S._$={first_line:r[r.length-(M||1)].first_line,last_line:r[r.length-1].last_line,first_column:r[r.length-(M||1)].first_column,last_column:r[r.length-1].last_column},v&&(S._$.range=[r[r.length-(M||1)].range[0],r[r.length-1].range[1]]),void 0!==(D=this.performAction.apply(S,[c,d,l,y,_[1],n,r].concat(m))))return D;M&&(i=i.slice(0,-1*M*2),n=n.slice(0,-1*M),r=r.slice(0,-1*M)),i.push(this.productions_[_[1]][0]),n.push(S.$),r.push(S._$),K=o[i[i.length-2]][i[i.length-1]],i.push(K);break;case 3:return!0}}return!0},"parse")},C=function(){var t={EOF:1,parseError:(0,a.K)(function(t,e){if(this.yy.parser)this.yy.parser.parseError(t,e);else throw Error(t)},"parseError"),setInput:(0,a.K)(function(t,e){return this.yy=e||this.yy||{},this._input=t,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},"setInput"),input:(0,a.K)(function(){var t=this._input[0];this.yytext+=t,this.yyleng++,this.offset++,this.match+=t,this.matched+=t;var e=t.match(/(?:\r\n?|\n).*/g);return e?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),t},"input"),unput:(0,a.K)(function(t){var e=t.length,i=t.split(/(?:\r\n?|\n)/g);this._input=t+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-e),this.offset-=e;var s=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),i.length-1&&(this.yylineno-=i.length-1);var n=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:i?(i.length===s.length?this.yylloc.first_column:0)+s[s.length-i.length].length-i[0].length:this.yylloc.first_column-e},this.options.ranges&&(this.yylloc.range=[n[0],n[0]+this.yyleng-e]),this.yyleng=this.yytext.length,this},"unput"),more:(0,a.K)(function(){return this._more=!0,this},"more"),reject:(0,a.K)(function(){return this.options.backtrack_lexer?(this._backtrack=!0,this):this.parseError("Lexical error on line "+(this.yylineno+1)+". You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n"+this.showPosition(),{text:"",token:null,line:this.yylineno})},"reject"),less:(0,a.K)(function(t){this.unput(this.match.slice(t))},"less"),pastInput:(0,a.K)(function(){var t=this.matched.substr(0,this.matched.length-this.match.length);return(t.length>20?"...":"")+t.substr(-20).replace(/\n/g,"")},"pastInput"),upcomingInput:(0,a.K)(function(){var t=this.match;return t.length<20&&(t+=this._input.substr(0,20-t.length)),(t.substr(0,20)+(t.length>20?"...":"")).replace(/\n/g,"")},"upcomingInput"),showPosition:(0,a.K)(function(){var t=this.pastInput(),e=Array(t.length+1).join("-");return t+this.upcomingInput()+"\n"+e+"^"},"showPosition"),test_match:(0,a.K)(function(t,e){var i,s,n;if(this.options.backtrack_lexer&&(n={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(n.yylloc.range=this.yylloc.range.slice(0))),(s=t[0].match(/(?:\r\n?|\n).*/g))&&(this.yylineno+=s.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:s?s[s.length-1].length-s[s.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+t[0].length},this.yytext+=t[0],this.match+=t[0],this.matches=t,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(t[0].length),this.matched+=t[0],i=this.performAction.call(this,this.yy,this,e,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),i)return i;if(this._backtrack)for(var r in n)this[r]=n[r];return!1},"test_match"),next:(0,a.K)(function(){if(this.done)return this.EOF;var t,e,i,s;this._input||(this.done=!0),this._more||(this.yytext="",this.match="");for(var n=this._currentRules(),r=0;r<n.length;r++)if((i=this._input.match(this.rules[n[r]]))&&(!e||i[0].length>e[0].length)){if(e=i,s=r,this.options.backtrack_lexer){if(!1!==(t=this.test_match(i,n[r])))return t;if(!this._backtrack)return!1;e=!1;continue}if(!this.options.flex)break}return e?!1!==(t=this.test_match(e,n[s]))&&t:""===this._input?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+". Unrecognized text.\n"+this.showPosition(),{text:"",token:null,line:this.yylineno})},"next"),lex:(0,a.K)(function(){var t=this.next();return t||this.lex()},"lex"),begin:(0,a.K)(function(t){this.conditionStack.push(t)},"begin"),popState:(0,a.K)(function(){var t=this.conditionStack.length-1;return t>0?this.conditionStack.pop():this.conditionStack[0]},"popState"),_currentRules:(0,a.K)(function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules},"_currentRules"),topState:(0,a.K)(function(t){return(t=this.conditionStack.length-1-Math.abs(t||0))>=0?this.conditionStack[t]:"INITIAL"},"topState"),pushState:(0,a.K)(function(t){this.begin(t)},"pushState"),stateStackSize:(0,a.K)(function(){return this.conditionStack.length},"stateStackSize"),options:{"case-insensitive":!0},performAction:(0,a.K)(function(t,e,i,s){switch(i){case 0:return this.begin("open_directive"),"open_directive";case 1:return this.begin("acc_title"),31;case 2:return this.popState(),"acc_title_value";case 3:return this.begin("acc_descr"),33;case 4:return this.popState(),"acc_descr_value";case 5:this.begin("acc_descr_multiline");break;case 6:case 15:case 18:case 21:case 24:this.popState();break;case 7:return"acc_descr_multiline_value";case 8:case 9:case 10:case 12:case 13:break;case 11:return 10;case 14:this.begin("href");break;case 16:return 43;case 17:this.begin("callbackname");break;case 19:this.popState(),this.begin("callbackargs");break;case 20:return 41;case 22:return 42;case 23:this.begin("click");break;case 25:return 40;case 26:return 4;case 27:return 22;case 28:return 23;case 29:return 24;case 30:return 25;case 31:return 26;case 32:return 28;case 33:return 27;case 34:return 29;case 35:return 12;case 36:return 13;case 37:return 14;case 38:return 15;case 39:return 16;case 40:return 17;case 41:return 18;case 42:return 20;case 43:return 21;case 44:return"date";case 45:return 30;case 46:return"accDescription";case 47:return 36;case 48:return 38;case 49:return 39;case 50:return":";case 51:return 6;case 52:return"INVALID"}},"anonymous"),rules:[/^(?:%%\{)/i,/^(?:accTitle\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*\{\s*)/i,/^(?:[\}])/i,/^(?:[^\}]*)/i,/^(?:%%(?!\{)*[^\n]*)/i,/^(?:[^\}]%%*[^\n]*)/i,/^(?:%%*[^\n]*[\n]*)/i,/^(?:[\n]+)/i,/^(?:\s+)/i,/^(?:%[^\n]*)/i,/^(?:href[\s]+["])/i,/^(?:["])/i,/^(?:[^"]*)/i,/^(?:call[\s]+)/i,/^(?:\([\s]*\))/i,/^(?:\()/i,/^(?:[^(]*)/i,/^(?:\))/i,/^(?:[^)]*)/i,/^(?:click[\s]+)/i,/^(?:[\s\n])/i,/^(?:[^\s\n]*)/i,/^(?:gantt\b)/i,/^(?:dateFormat\s[^#\n;]+)/i,/^(?:inclusiveEndDates\b)/i,/^(?:topAxis\b)/i,/^(?:axisFormat\s[^#\n;]+)/i,/^(?:tickInterval\s[^#\n;]+)/i,/^(?:includes\s[^#\n;]+)/i,/^(?:excludes\s[^#\n;]+)/i,/^(?:todayMarker\s[^\n;]+)/i,/^(?:weekday\s+monday\b)/i,/^(?:weekday\s+tuesday\b)/i,/^(?:weekday\s+wednesday\b)/i,/^(?:weekday\s+thursday\b)/i,/^(?:weekday\s+friday\b)/i,/^(?:weekday\s+saturday\b)/i,/^(?:weekday\s+sunday\b)/i,/^(?:weekend\s+friday\b)/i,/^(?:weekend\s+saturday\b)/i,/^(?:\d\d\d\d-\d\d-\d\d\b)/i,/^(?:title\s[^\n]+)/i,/^(?:accDescription\s[^#\n;]+)/i,/^(?:section\s[^\n]+)/i,/^(?:[^:\n]+)/i,/^(?::[^#\n;]+)/i,/^(?::)/i,/^(?:$)/i,/^(?:.)/i],conditions:{acc_descr_multiline:{rules:[6,7],inclusive:!1},acc_descr:{rules:[4],inclusive:!1},acc_title:{rules:[2],inclusive:!1},callbackargs:{rules:[21,22],inclusive:!1},callbackname:{rules:[18,19,20],inclusive:!1},href:{rules:[15,16],inclusive:!1},click:{rules:[24,25],inclusive:!1},INITIAL:{rules:[0,1,3,5,8,9,10,11,12,13,14,17,23,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52],inclusive:!0}}};return t}();function M(){this.yy={}}return S.lexer=C,(0,a.K)(M,"Parser"),M.prototype=S,S.Parser=M,new M}();m.parser=m;var k=m;c.extend(l),c.extend(d),c.extend(u);var y={friday:5,saturday:6},p="",g="",v=void 0,x="",T=[],b=[],$=new Map,w=[],_=[],D="",S="",C=["active","done","crit","milestone","vert"],M=[],K="",E=!1,Y=!1,L="sunday",O="saturday",A=0,I=(0,a.K)(function(){w=[],_=[],D="",M=[],ty=0,tx=void 0,tT=void 0,tb=[],p="",g="",S="",v=void 0,x="",T=[],b=[],E=!1,Y=!1,A=0,$=new Map,K="",(0,n.IU)(),L="sunday",O="saturday"},"clear"),F=(0,a.K)(function(t){K=t},"setDiagramId"),W=(0,a.K)(function(t){g=t},"setAxisFormat"),P=(0,a.K)(function(){return g},"getAxisFormat"),H=(0,a.K)(function(t){v=t},"setTickInterval"),N=(0,a.K)(function(){return v},"getTickInterval"),z=(0,a.K)(function(t){x=t},"setTodayMarker"),B=(0,a.K)(function(){return x},"getTodayMarker"),R=(0,a.K)(function(t){p=t},"setDateFormat"),G=(0,a.K)(function(){E=!0},"enableInclusiveEndDates"),j=(0,a.K)(function(){return E},"endDatesAreInclusive"),U=(0,a.K)(function(){Y=!0},"enableTopAxis"),V=(0,a.K)(function(){return Y},"topAxisEnabled"),Z=(0,a.K)(function(t){S=t},"setDisplayMode"),X=(0,a.K)(function(){return S},"getDisplayMode"),q=(0,a.K)(function(){return p},"getDateFormat"),Q=(0,a.K)((t,e)=>{let i=e.toLowerCase().split(/[\s,]+/).filter(t=>""!==t);return[...new Set([...t,...i])]},"mergeTokens"),J=(0,a.K)(function(t){T=Q(T,t)},"setIncludes"),tt=(0,a.K)(function(){return T},"getIncludes"),te=(0,a.K)(function(t){b=Q(b,t)},"setExcludes"),ti=(0,a.K)(function(){return b},"getExcludes"),ts=(0,a.K)(function(){return $},"getLinks"),tn=(0,a.K)(function(t){D=t,w.push(t)},"addSection"),tr=(0,a.K)(function(){return w},"getSections"),ta=(0,a.K)(function(){let t=tS(),e=10,i=0;for(;!t&&i<e;)t=tS(),i++;return _=tb},"getTasks"),to=(0,a.K)(function(t,e,i,s){let n=t.format(e.trim()),r=t.format("YYYY-MM-DD");return!(s.includes(n)||s.includes(r))&&(!!(i.includes("weekends")&&(t.isoWeekday()===y[O]||t.isoWeekday()===y[O]+1)||i.includes(t.format("dddd").toLowerCase()))||i.includes(n)||i.includes(r))},"isInvalidDate"),tc=(0,a.K)(function(t){L=t},"setWeekday"),tl=(0,a.K)(function(){return L},"getWeekday"),td=(0,a.K)(function(t){O=t},"setWeekend"),tu=(0,a.K)(function(t,e,i,s){if(!i.length||t.manualEndTime)return;let n;n=(n=t.startTime instanceof Date?c(t.startTime):c(t.startTime,e,!0)).add(1,"d");let r;r=t.endTime instanceof Date?c(t.endTime):c(t.endTime,e,!0);let[a,o]=th(n,r,e,i,s);t.endTime=a.toDate(),t.renderEndTime=o},"checkTaskDates"),th=(0,a.K)(function(t,e,i,s,n){let r=!1,a=null,o=e.add(1e4,"d");for(;t<=e;){if(r||(a=e.toDate()),(r=to(t,i,s,n))&&(e=e.add(1,"d"))>o)throw Error("Failed to find a valid date that was not excluded by `excludes` after 10,000 iterations.");t=t.add(1,"d")}return[e,a]},"fixTaskDates"),tf=(0,a.K)(function(t,e,i){i=i.trim();let s=(0,a.K)(t=>{let e=t.trim();return"x"===e||"X"===e},"isTimestampFormat");if(s(e)&&/^\d+$/.test(i))return new Date(Number(i));let n=/^after\s+(?<ids>[\d\w- ]+)/,o=n.exec(i);if(null!==o){let t=null;for(let e of o.groups.ids.split(" ")){let i=t_(e);void 0!==i&&(!t||i.endTime>t.endTime)&&(t=i)}if(t)return t.endTime;let e=new Date;return e.setHours(0,0,0,0),e}let l=c(i,e.trim(),!0);if(l.isValid())return l.toDate();{r.R.debug("Invalid date:"+i),r.R.debug("With date format:"+e.trim());let t=new Date(i);if(void 0===t||isNaN(t.getTime())||-1e4>t.getFullYear()||t.getFullYear()>1e4)throw Error("Invalid date:"+i);return t}},"getStartDate"),tm=(0,a.K)(function(t){let e=/^(\d+(?:\.\d+)?)([Mdhmswy]|ms)$/.exec(t.trim());return null!==e?[Number.parseFloat(e[1]),e[2]]:[NaN,"ms"]},"parseDuration"),tk=(0,a.K)(function(t,e,i,s=!1){i=i.trim();let n=/^until\s+(?<ids>[\d\w- ]+)/,r=n.exec(i);if(null!==r){let t=null;for(let e of r.groups.ids.split(" ")){let i=t_(e);void 0!==i&&(!t||i.startTime<t.startTime)&&(t=i)}if(t)return t.startTime;let e=new Date;return e.setHours(0,0,0,0),e}let a=c(i,e.trim(),!0);if(a.isValid())return s&&(a=a.add(1,"d")),a.toDate();let o=c(t),[l,d]=tm(i);if(!Number.isNaN(l)){let t=o.add(l,d);t.isValid()&&(o=t)}return o.toDate()},"getEndDate"),ty=0,tp=(0,a.K)(function(t){return void 0===t?"task"+(ty+=1):t},"parseId"),tg=(0,a.K)(function(t,e){let i;i=":"===e.substr(0,1)?e.substr(1,e.length):e;let s=i.split(","),n={};tA(s,n,C);for(let t=0;t<s.length;t++)s[t]=s[t].trim();let r="";switch(s.length){case 1:n.id=tp(),n.startTime=t.endTime,r=s[0];break;case 2:n.id=tp(),n.startTime=tf(void 0,p,s[0]),r=s[1];break;case 3:n.id=tp(s[0]),n.startTime=tf(void 0,p,s[1]),r=s[2]}return r&&(n.endTime=tk(n.startTime,p,r,E),n.manualEndTime=c(r,"YYYY-MM-DD",!0).isValid(),tu(n,p,b,T)),n},"compileData"),tv=(0,a.K)(function(t,e){let i;i=":"===e.substr(0,1)?e.substr(1,e.length):e;let s=i.split(","),n={};tA(s,n,C);for(let t=0;t<s.length;t++)s[t]=s[t].trim();switch(s.length){case 1:n.id=tp(),n.startTime={type:"prevTaskEnd",id:t},n.endTime={data:s[0]};break;case 2:n.id=tp(),n.startTime={type:"getStartDate",startData:s[0]},n.endTime={data:s[1]};break;case 3:n.id=tp(s[0]),n.startTime={type:"getStartDate",startData:s[1]},n.endTime={data:s[2]}}return n},"parseData"),tx,tT,tb=[],t$={},tw=(0,a.K)(function(t,e){let i={section:D,type:D,processed:!1,manualEndTime:!1,renderEndTime:null,raw:{data:e},task:t,classes:[]},s=tv(tT,e);i.raw.startTime=s.startTime,i.raw.endTime=s.endTime,i.id=s.id,i.prevTaskId=tT,i.active=s.active,i.done=s.done,i.crit=s.crit,i.milestone=s.milestone,i.vert=s.vert,i.vert?i.order=-1:(i.order=A,A++);let n=tb.push(i);tT=i.id,t$[i.id]=n-1},"addTask"),t_=(0,a.K)(function(t){let e=t$[t];return tb[e]},"findTaskById"),tD=(0,a.K)(function(t,e){let i={section:D,type:D,description:t,task:t,classes:[]},s=tg(tx,e);i.startTime=s.startTime,i.endTime=s.endTime,i.id=s.id,i.active=s.active,i.done=s.done,i.crit=s.crit,i.milestone=s.milestone,i.vert=s.vert,tx=i,_.push(i)},"addTaskOrg"),tS=(0,a.K)(function(){let t=(0,a.K)(function(t){let e=tb[t],i="";switch(tb[t].raw.startTime.type){case"prevTaskEnd":{let t=t_(e.prevTaskId);e.startTime=t.endTime;break}case"getStartDate":(i=tf(void 0,p,tb[t].raw.startTime.startData))&&(tb[t].startTime=i)}return tb[t].startTime&&(tb[t].endTime=tk(tb[t].startTime,p,tb[t].raw.endTime.data,E),tb[t].endTime&&(tb[t].processed=!0,tb[t].manualEndTime=c(tb[t].raw.endTime.data,"YYYY-MM-DD",!0).isValid(),tu(tb[t],p,b,T))),tb[t].processed},"compileTask"),e=!0;for(let[i,s]of tb.entries())t(i),e=e&&s.processed;return e},"compileTasks"),tC=(0,a.K)(function(t,e){let i=e;"loose"!==(0,n.D7)().securityLevel&&(i=(0,o.sanitizeUrl)(e)),t.split(",").forEach(function(t){let e=t_(t);void 0!==e&&(tE(t,()=>{window.open(i,"_self")}),$.set(t,i))}),tM(t,"clickable")},"setLink"),tM=(0,a.K)(function(t,e){t.split(",").forEach(function(t){let i=t_(t);void 0!==i&&i.classes.push(e)})},"setClass"),tK=(0,a.K)(function(t,e,i){if("loose"!==(0,n.D7)().securityLevel||void 0===e)return;let r=[];if("string"==typeof i){r=i.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);for(let t=0;t<r.length;t++){let e=r[t].trim();e.startsWith('"')&&e.endsWith('"')&&(e=e.substr(1,e.length-2)),r[t]=e}}0===r.length&&r.push(t);let a=t_(t);void 0!==a&&tE(t,()=>{s._K.runFunc(e,...r)})},"setClickFun"),tE=(0,a.K)(function(t,e){M.push(function(){let i=K?`${K}-${t}`:t,s=document.querySelector(`[id="${i}"]`);null!==s&&s.addEventListener("click",function(){e()})},function(){let i=K?`${K}-${t}`:t,s=document.querySelector(`[id="${i}-text"]`);null!==s&&s.addEventListener("click",function(){e()})})},"pushFun"),tY=(0,a.K)(function(t,e,i){t.split(",").forEach(function(t){tK(t,e,i)}),tM(t,"clickable")},"setClickEvent"),tL=(0,a.K)(function(t){M.forEach(function(e){e(t)})},"bindFunctions"),tO={getConfig:(0,a.K)(()=>(0,n.D7)().gantt,"getConfig"),clear:I,setDateFormat:R,getDateFormat:q,enableInclusiveEndDates:G,endDatesAreInclusive:j,enableTopAxis:U,topAxisEnabled:V,setAxisFormat:W,getAxisFormat:P,setTickInterval:H,getTickInterval:N,setTodayMarker:z,getTodayMarker:B,setAccTitle:n.SV,getAccTitle:n.iN,setDiagramTitle:n.ke,getDiagramTitle:n.ab,setDiagramId:F,setDisplayMode:Z,getDisplayMode:X,setAccDescription:n.EI,getAccDescription:n.m7,addSection:tn,getSections:tr,getTasks:ta,addTask:tw,findTaskById:t_,addTaskOrg:tD,setIncludes:J,getIncludes:tt,setExcludes:te,getExcludes:ti,setClickEvent:tY,setLink:tC,getLinks:ts,bindFunctions:tL,parseDuration:tm,isInvalidDate:to,setWeekday:tc,getWeekday:tl,setWeekend:td};function tA(t,e,i){let s=!0;for(;s;)s=!1,i.forEach(function(i){let n="^\\s*"+i+"\\s*$",r=new RegExp(n);t[0].match(r)&&(e[i]=!0,t.shift(1),s=!0)})}(0,a.K)(tA,"getTaskTags"),c.extend(h);var tI=(0,a.K)(function(){r.R.debug("Something is calling, setConf, remove the call")},"setConf"),tF={monday:f.ABi,tuesday:f.PGu,wednesday:f.GuW,thursday:f.Mol,friday:f.TUC,saturday:f.rGn,sunday:f.YPH},tW=(0,a.K)((t,e)=>{let i=[...t].map(()=>-1/0),s=[...t].sort((t,e)=>t.startTime-e.startTime||t.order-e.order),n=0;for(let t of s)for(let s=0;s<i.length;s++)if(t.startTime>=i[s]){i[s]=t.endTime,t.order=s+e,s>n&&(n=s);break}return n},"getMaxIntersections"),tP,tH=1e4,tN=(0,a.K)(function(t,e,i,s){let o=(0,n.D7)().gantt;s.db.setDiagramId(e);let l=(0,n.D7)().securityLevel,d;"sandbox"===l&&(d=(0,f.Ltv)("#i"+e));let u="sandbox"===l?(0,f.Ltv)(d.nodes()[0].contentDocument.body):(0,f.Ltv)("body"),h="sandbox"===l?d.nodes()[0].contentDocument:document,m=h.getElementById(e);void 0===(tP=m.parentElement.offsetWidth)&&(tP=1200),void 0!==o.useWidth&&(tP=o.useWidth);let k=s.db.getTasks(),y=k.filter(t=>!t.vert),p=[];for(let t of y)p.push(t.type);p=K(p);let g={},v=2*o.topPadding;if("compact"===s.db.getDisplayMode()||"compact"===o.displayMode){let t={};for(let e of y)void 0===t[e.section]?t[e.section]=[e]:t[e.section].push(e);let e=0;for(let i of Object.keys(t)){let s=tW(t[i],e)+1;e+=s,v+=s*(o.barHeight+o.barGap),g[i]=s}}else for(let t of(v+=y.length*(o.barHeight+o.barGap),p))g[t]=y.filter(e=>e.type===t).length;m.setAttribute("viewBox","0 0 "+tP+" "+v);let x=u.select(`[id="${e}"]`),T=(0,f.w7C)().domain([(0,f.jkA)(k,function(t){return t.startTime}),(0,f.T9B)(k,function(t){return t.endTime})]).rangeRound([0,tP-o.leftPadding-o.rightPadding]);function b(t,e){let i=t.startTime,s=e.startTime,n=0;return i>s?n=1:i<s&&(n=-1),n}function $(t,e,i){let n=o.barHeight,r=n+o.barGap,a=o.topPadding,c=o.leftPadding,l=(0,f.m4Y)().domain([0,p.length]).range(["#00B9FA","#F95002"]).interpolate(f.bEH);_(r,a,c,e,i,t,s.db.getExcludes(),s.db.getIncludes()),S(c,a,e,i),w(t,r,a,c,n,l,e,i),C(r,a,c,n,l),M(c,a,e,i)}function w(t,i,r,a,c,l,d){t.sort((t,e)=>t.vert===e.vert?0:t.vert?1:-1);let u=t.filter(t=>!t.vert),h=[...new Set(u.map(t=>t.order))],m=h.map(t=>u.find(e=>e.order===t));x.append("g").selectAll("rect").data(m).enter().append("rect").attr("x",0).attr("y",function(t,e){return t.order*i+r-2}).attr("width",function(){return d-o.rightPadding/2}).attr("height",i).attr("class",function(t){for(let[e,i]of p.entries())if(t.type===i)return"section section"+e%o.numberSectionStyles;return"section section0"}).enter();let k=x.append("g").selectAll("rect").data(t).enter(),y=s.db.getLinks();k.append("rect").attr("id",function(t){return e+"-"+t.id}).attr("rx",3).attr("ry",3).attr("x",function(t){return t.milestone?T(t.startTime)+a+.5*(T(t.endTime)-T(t.startTime))-.5*c:T(t.startTime)+a}).attr("y",function(t,e){return(e=t.order,t.vert)?o.gridLineStartPadding:e*i+r}).attr("width",function(t){return t.milestone?c:t.vert?.08*c:T(t.renderEndTime||t.endTime)-T(t.startTime)}).attr("height",function(t){return t.vert?u.length*(o.barHeight+o.barGap)+2*o.barHeight:c}).attr("transform-origin",function(t,e){return e=t.order,(T(t.startTime)+a+.5*(T(t.endTime)-T(t.startTime))).toString()+"px "+(e*i+r+.5*c).toString()+"px"}).attr("class",function(t){let e="task",i="";t.classes.length>0&&(i=t.classes.join(" "));let s=0;for(let[e,i]of p.entries())t.type===i&&(s=e%o.numberSectionStyles);let n="";return t.active?t.crit?n+=" activeCrit":n=" active":t.done?n=t.crit?" doneCrit":" done":t.crit&&(n+=" crit"),0===n.length&&(n=" task"),t.milestone&&(n=" milestone "+n),t.vert&&(n=" vert "+n),n+=s,e+(n+=" "+i)}),k.append("text").attr("id",function(t){return e+"-"+t.id+"-text"}).text(function(t){return t.task}).attr("font-size",o.fontSize).attr("x",function(t){let e=T(t.startTime),i=T(t.renderEndTime||t.endTime);if(t.milestone&&(e+=.5*(T(t.endTime)-T(t.startTime))-.5*c,i=e+c),t.vert)return T(t.startTime)+a;let s=this.getBBox().width;return s>i-e?i+s+1.5*o.leftPadding>d?e+a-5:i+a+5:(i-e)/2+e+a}).attr("y",function(t,e){return t.vert?o.gridLineStartPadding+u.length*(o.barHeight+o.barGap)+60:t.order*i+o.barHeight/2+(o.fontSize/2-2)+r}).attr("text-height",c).attr("class",function(t){let e=T(t.startTime),i=T(t.endTime);t.milestone&&(i=e+c);let s=this.getBBox().width,n="";t.classes.length>0&&(n=t.classes.join(" "));let r=0;for(let[e,i]of p.entries())t.type===i&&(r=e%o.numberSectionStyles);let a="";return(t.active&&(a=t.crit?"activeCritText"+r:"activeText"+r),t.done?a=t.crit?a+" doneCritText"+r:a+" doneText"+r:t.crit&&(a=a+" critText"+r),t.milestone&&(a+=" milestoneText"),t.vert&&(a+=" vertText"),s>i-e)?i+s+1.5*o.leftPadding>d?n+" taskTextOutsideLeft taskTextOutside"+r+" "+a:n+" taskTextOutsideRight taskTextOutside"+r+" "+a+" width-"+s:n+" taskText taskText"+r+" "+a+" width-"+s});let g=(0,n.D7)().securityLevel;if("sandbox"===g){let t;t=(0,f.Ltv)("#i"+e);let i=t.nodes()[0].contentDocument;k.filter(function(t){return y.has(t.id)}).each(function(t){var s=i.querySelector("#"+CSS.escape(e+"-"+t.id)),n=i.querySelector("#"+CSS.escape(e+"-"+t.id+"-text"));let r=s.parentNode;var a=i.createElement("a");a.setAttribute("xlink:href",y.get(t.id)),a.setAttribute("target","_top"),r.appendChild(a),a.appendChild(s),a.appendChild(n)})}}function _(t,i,n,a,l,d,u,h){if(0===u.length&&0===h.length)return;let f,m;for(let{startTime:t,endTime:e}of d)(void 0===f||t<f)&&(f=t),(void 0===m||e>m)&&(m=e);if(!f||!m)return;if(c(m).diff(c(f),"year")>5)return void r.R.warn("The difference between the min and max time is more than 5 years. This will cause performance issues. Skipping drawing exclude days.");let k=s.db.getDateFormat(),y=[],p=null,g=c(f);for(;g.valueOf()<=m;)s.db.isInvalidDate(g,k,u,h)?p?p.end=g:p={start:g,end:g}:p&&(y.push(p),p=null),g=g.add(1,"d");let v=x.append("g").selectAll("rect").data(y).enter();v.append("rect").attr("id",t=>e+"-exclude-"+t.start.format("YYYY-MM-DD")).attr("x",t=>T(t.start.startOf("day"))+n).attr("y",o.gridLineStartPadding).attr("width",t=>T(t.end.endOf("day"))-T(t.start.startOf("day"))).attr("height",l-i-o.gridLineStartPadding).attr("transform-origin",function(e,i){return(T(e.start)+n+.5*(T(e.end)-T(e.start))).toString()+"px "+(i*t+.5*l).toString()+"px"}).attr("class","exclude-range")}function D(t,e,i,s){if(i<=0||t>e)return 1/0;let n=e-t,r=c.duration({[null!=s?s:"day"]:i}).asMilliseconds();return r<=0?1/0:Math.ceil(n/r)}function S(t,e,i,n){let a=s.db.getDateFormat(),c=s.db.getAxisFormat(),l;if(c)l=c;else if("D"===a)l="%d";else{var d;l=null!=(d=o.axisFormat)?d:"%Y-%m-%d"}let u=(0,f.l78)(T).tickSize(-n+e+o.gridLineStartPadding).tickFormat((0,f.DCK)(l)),h=/^([1-9]\d*)(millisecond|second|minute|hour|day|week|month)$/,m=h.exec(s.db.getTickInterval()||o.tickInterval);if(null!==m){let t=parseInt(m[1],10);if(isNaN(t)||t<=0)r.R.warn(`Invalid tick interval value: "${m[1]}". Skipping custom tick interval.`);else{let e=m[2],i=s.db.getWeekday()||o.weekday,n=T.domain(),a=n[0],c=n[1],l=D(a,c,t,e);if(l>tH)r.R.warn(`The tick interval "${t}${e}" would generate ${l} ticks, which exceeds the maximum allowed (${tH}). This may indicate an invalid date or time range. Skipping custom tick interval.`);else switch(e){case"millisecond":u.ticks(f.t6C.every(t));break;case"second":u.ticks(f.ucG.every(t));break;case"minute":u.ticks(f.wXd.every(t));break;case"hour":u.ticks(f.Agd.every(t));break;case"day":u.ticks(f.UAC.every(t));break;case"week":u.ticks(tF[i].every(t));break;case"month":u.ticks(f.Ui6.every(t))}}}if(x.append("g").attr("class","grid").attr("transform","translate("+t+", "+(n-50)+")").call(u).selectAll("text").style("text-anchor","middle").attr("fill","#000").attr("stroke","none").attr("font-size",10).attr("dy","1em"),s.db.topAxisEnabled()||o.topAxis){let i=(0,f.tlR)(T).tickSize(-n+e+o.gridLineStartPadding).tickFormat((0,f.DCK)(l));if(null!==m){let t=parseInt(m[1],10);if(isNaN(t)||t<=0)r.R.warn(`Invalid tick interval value: "${m[1]}". Skipping custom tick interval.`);else{let e=m[2],n=s.db.getWeekday()||o.weekday,r=T.domain(),a=r[0],c=r[1],l=D(a,c,t,e);if(l<=tH)switch(e){case"millisecond":i.ticks(f.t6C.every(t));break;case"second":i.ticks(f.ucG.every(t));break;case"minute":i.ticks(f.wXd.every(t));break;case"hour":i.ticks(f.Agd.every(t));break;case"day":i.ticks(f.UAC.every(t));break;case"week":i.ticks(tF[n].every(t));break;case"month":i.ticks(f.Ui6.every(t))}}}x.append("g").attr("class","grid").attr("transform","translate("+t+", "+e+")").call(i).selectAll("text").style("text-anchor","middle").attr("fill","#000").attr("stroke","none").attr("font-size",10)}}function C(t,e){let i=0,s=Object.keys(g).map(t=>[t,g[t]]);x.append("g").selectAll("text").data(s).enter().append(function(t){let e=t[0].split(n.Y2.lineBreakRegex),i=-(e.length-1)/2,s=h.createElementNS("http://www.w3.org/2000/svg","text");for(let[t,n]of(s.setAttribute("dy",i+"em"),e.entries())){let e=h.createElementNS("http://www.w3.org/2000/svg","tspan");e.setAttribute("alignment-baseline","central"),e.setAttribute("x","10"),t>0&&e.setAttribute("dy","1em"),e.textContent=n,s.appendChild(e)}return s}).attr("x",10).attr("y",function(n,r){if(!(r>0))return n[1]*t/2+e;for(let a=0;a<r;a++)return i+=s[r-1][1],n[1]*t/2+i*t+e}).attr("font-size",o.sectionFontSize).attr("class",function(t){for(let[e,i]of p.entries())if(t[0]===i)return"sectionTitle sectionTitle"+e%o.numberSectionStyles;return"sectionTitle"})}function M(t,e,i,n){let r=s.db.getTodayMarker();if("off"===r)return;let a=x.append("g").attr("class","today"),c=new Date,l=a.append("line");l.attr("x1",T(c)+t).attr("x2",T(c)+t).attr("y1",o.titleTopMargin).attr("y2",n-o.titleTopMargin).attr("class","today"),""!==r&&l.attr("style",r.replace(/,/g,";"))}function K(t){let e={},i=[];for(let s=0,n=t.length;s<n;++s)Object.prototype.hasOwnProperty.call(e,t[s])||(e[t[s]]=!0,i.push(t[s]));return i}(0,a.K)(b,"taskCompare"),k.sort(b),$(k,tP,v),(0,n.a$)(x,v,tP,o.useMaxWidth),x.append("text").text(s.db.getDiagramTitle()).attr("x",tP/2).attr("y",o.titleTopMargin).attr("class","titleText"),(0,a.K)($,"makeGantt"),(0,a.K)(w,"drawRects"),(0,a.K)(_,"drawExcludeDays"),(0,a.K)(D,"getEstimatedTickCount"),(0,a.K)(S,"makeGrid"),(0,a.K)(C,"vertLabels"),(0,a.K)(M,"drawToday"),(0,a.K)(K,"checkUnique")},"draw"),tz={setConf:tI,draw:tN},tB=(0,a.K)(t=>`
  .mermaid-main-font {
        font-family: ${t.fontFamily};
  }

  .exclude-range {
    fill: ${t.excludeBkgColor};
  }

  .section {
    stroke: none;
    opacity: 0.2;
  }

  .section0 {
    fill: ${t.sectionBkgColor};
  }

  .section2 {
    fill: ${t.sectionBkgColor2};
  }

  .section1,
  .section3 {
    fill: ${t.altSectionBkgColor};
    opacity: 0.2;
  }

  .sectionTitle0 {
    fill: ${t.titleColor};
  }

  .sectionTitle1 {
    fill: ${t.titleColor};
  }

  .sectionTitle2 {
    fill: ${t.titleColor};
  }

  .sectionTitle3 {
    fill: ${t.titleColor};
  }

  .sectionTitle {
    text-anchor: start;
    font-family: ${t.fontFamily};
  }


  /* Grid and axis */

  .grid .tick {
    stroke: ${t.gridColor};
    opacity: 0.8;
    shape-rendering: crispEdges;
  }

  .grid .tick text {
    font-family: ${t.fontFamily};
    fill: ${t.textColor};
  }

  .grid path {
    stroke-width: 0;
  }


  /* Today line */

  .today {
    fill: none;
    stroke: ${t.todayLineColor};
    stroke-width: 2px;
  }


  /* Task styling */

  /* Default task */

  .task {
    stroke-width: 2;
  }

  .taskText {
    text-anchor: middle;
    font-family: ${t.fontFamily};
  }

  .taskTextOutsideRight {
    fill: ${t.taskTextDarkColor};
    text-anchor: start;
    font-family: ${t.fontFamily};
  }

  .taskTextOutsideLeft {
    fill: ${t.taskTextDarkColor};
    text-anchor: end;
  }


  /* Special case clickable */

  .task.clickable {
    cursor: pointer;
  }

  .taskText.clickable {
    cursor: pointer;
    fill: ${t.taskTextClickableColor} !important;
    font-weight: bold;
  }

  .taskTextOutsideLeft.clickable {
    cursor: pointer;
    fill: ${t.taskTextClickableColor} !important;
    font-weight: bold;
  }

  .taskTextOutsideRight.clickable {
    cursor: pointer;
    fill: ${t.taskTextClickableColor} !important;
    font-weight: bold;
  }


  /* Specific task settings for the sections*/

  .taskText0,
  .taskText1,
  .taskText2,
  .taskText3 {
    fill: ${t.taskTextColor};
  }

  .task0,
  .task1,
  .task2,
  .task3 {
    fill: ${t.taskBkgColor};
    stroke: ${t.taskBorderColor};
  }

  .taskTextOutside0,
  .taskTextOutside2
  {
    fill: ${t.taskTextOutsideColor};
  }

  .taskTextOutside1,
  .taskTextOutside3 {
    fill: ${t.taskTextOutsideColor};
  }


  /* Active task */

  .active0,
  .active1,
  .active2,
  .active3 {
    fill: ${t.activeTaskBkgColor};
    stroke: ${t.activeTaskBorderColor};
  }

  .activeText0,
  .activeText1,
  .activeText2,
  .activeText3 {
    fill: ${t.taskTextDarkColor} !important;
  }


  /* Completed task */

  .done0,
  .done1,
  .done2,
  .done3 {
    stroke: ${t.doneTaskBorderColor};
    fill: ${t.doneTaskBkgColor};
    stroke-width: 2;
  }

  .doneText0,
  .doneText1,
  .doneText2,
  .doneText3 {
    fill: ${t.taskTextDarkColor} !important;
  }

  /* Done task text displayed outside the bar sits against the diagram background,
     not against the done-task bar, so it must use the outside/contrast color. */
  .doneText0.taskTextOutsideLeft,
  .doneText0.taskTextOutsideRight,
  .doneText1.taskTextOutsideLeft,
  .doneText1.taskTextOutsideRight,
  .doneText2.taskTextOutsideLeft,
  .doneText2.taskTextOutsideRight,
  .doneText3.taskTextOutsideLeft,
  .doneText3.taskTextOutsideRight {
    fill: ${t.taskTextOutsideColor} !important;
  }


  /* Tasks on the critical line */

  .crit0,
  .crit1,
  .crit2,
  .crit3 {
    stroke: ${t.critBorderColor};
    fill: ${t.critBkgColor};
    stroke-width: 2;
  }

  .activeCrit0,
  .activeCrit1,
  .activeCrit2,
  .activeCrit3 {
    stroke: ${t.critBorderColor};
    fill: ${t.activeTaskBkgColor};
    stroke-width: 2;
  }

  .doneCrit0,
  .doneCrit1,
  .doneCrit2,
  .doneCrit3 {
    stroke: ${t.critBorderColor};
    fill: ${t.doneTaskBkgColor};
    stroke-width: 2;
    cursor: pointer;
    shape-rendering: crispEdges;
  }

  .milestone {
    transform: rotate(45deg) scale(0.8,0.8);
  }

  .milestoneText {
    font-style: italic;
  }
  .doneCritText0,
  .doneCritText1,
  .doneCritText2,
  .doneCritText3 {
    fill: ${t.taskTextDarkColor} !important;
  }

  /* Done-crit task text outside the bar \u2014 same reasoning as doneText above. */
  .doneCritText0.taskTextOutsideLeft,
  .doneCritText0.taskTextOutsideRight,
  .doneCritText1.taskTextOutsideLeft,
  .doneCritText1.taskTextOutsideRight,
  .doneCritText2.taskTextOutsideLeft,
  .doneCritText2.taskTextOutsideRight,
  .doneCritText3.taskTextOutsideLeft,
  .doneCritText3.taskTextOutsideRight {
    fill: ${t.taskTextOutsideColor} !important;
  }

  .vert {
    stroke: ${t.vertLineColor};
  }

  .vertText {
    font-size: 15px;
    text-anchor: middle;
    fill: ${t.vertLineColor} !important;
  }

  .activeCritText0,
  .activeCritText1,
  .activeCritText2,
  .activeCritText3 {
    fill: ${t.taskTextDarkColor} !important;
  }

  .titleText {
    text-anchor: middle;
    font-size: 18px;
    fill: ${t.titleColor||t.textColor};
    font-family: ${t.fontFamily};
  }
`,"getStyles"),tR=tB,tG={parser:k,db:tO,renderer:tz,styles:tR}}}]);