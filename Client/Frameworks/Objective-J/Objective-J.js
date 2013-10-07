var ObjectiveJ={};
(function(_1,_2){
if(!Object.create){
Object.create=function(o){
if(arguments.length>1){
throw new Error("Object.create implementation only accepts the first parameter.");
}
function F(){
};
F.prototype=o;
return new F();
};
}
if(!Object.keys){
Object.keys=(function(){
var _3=Object.prototype.hasOwnProperty,_4=!({toString:null}).propertyIsEnumerable("toString"),_5=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"],_6=_5.length;
return function(_7){
if(typeof _7!=="object"&&typeof _7!=="function"||_7===null){
throw new TypeError("Object.keys called on non-object");
}
var _8=[];
for(var _9 in _7){
if(_3.call(_7,_9)){
_8.push(_9);
}
}
if(_4){
for(var i=0;i<_6;i++){
if(_3.call(_7,_5[i])){
_8.push(_5[i]);
}
}
}
return _8;
};
})();
}
if(!Array.prototype.indexOf){
Array.prototype.indexOf=function(_a){
"use strict";
if(this===null){
throw new TypeError();
}
var t=new Object(this),_b=t.length>>>0;
if(_b===0){
return -1;
}
var n=0;
if(arguments.length>1){
n=Number(arguments[1]);
if(n!=n){
n=0;
}else{
if(n!==0&&n!=Infinity&&n!=-Infinity){
n=(n>0||-1)*Math.floor(Math.abs(n));
}
}
}
if(n>=_b){
return -1;
}
var k=n>=0?n:Math.max(_b-Math.abs(n),0);
for(;k<_b;k++){
if(k in t&&t[k]===_a){
return k;
}
}
return -1;
};
}
if(!this.JSON){
JSON={};
}
(function(){
function f(n){
return n<10?"0"+n:n;
};
if(typeof Date.prototype.toJSON!=="function"){
Date.prototype.toJSON=function(_c){
return this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z";
};
String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(_d){
return this.valueOf();
};
}
var cx=new RegExp("[\\u0000\\u00ad\\u0600-\\u0604\\u070f\\u17b4\\u17b5\\u200c-\\u200f\\u2028-\\u202f\\u2060-\\u206f\\ufeff\\ufff0-\\uffff]","g");
var _e=new RegExp("[\\\\\\\"\\x00-\\x1f\\x7f-\\x9f\\u00ad\\u0600-\\u0604\\u070f\\u17b4\\u17b5\\u200c-\\u200f\\u2028-\\u202f\\u2060-\\u206f\\ufeff\\ufff0-\\uffff]","g");
var _f,_10,_11={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r","\"":"\\\"","\\":"\\\\"},rep;
function _12(_13){
_e.lastIndex=0;
return _e.test(_13)?"\""+_13.replace(_e,function(a){
var c=_11[a];
return typeof c==="string"?c:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4);
})+"\"":"\""+_13+"\"";
};
function str(key,_14){
var i,k,v,_15,_16=_f,_17,_18=_14[key];
if(_18&&typeof _18==="object"&&typeof _18.toJSON==="function"){
_18=_18.toJSON(key);
}
if(typeof rep==="function"){
_18=rep.call(_14,key,_18);
}
switch(typeof _18){
case "string":
return _12(_18);
case "number":
return isFinite(_18)?String(_18):"null";
case "boolean":
case "null":
return String(_18);
case "object":
if(!_18){
return "null";
}
_f+=_10;
_17=[];
if(Object.prototype.toString.apply(_18)==="[object Array]"){
_15=_18.length;
for(i=0;i<_15;i+=1){
_17[i]=str(i,_18)||"null";
}
v=_17.length===0?"[]":_f?"[\n"+_f+_17.join(",\n"+_f)+"\n"+_16+"]":"["+_17.join(",")+"]";
_f=_16;
return v;
}
if(rep&&typeof rep==="object"){
_15=rep.length;
for(i=0;i<_15;i+=1){
k=rep[i];
if(typeof k==="string"){
v=str(k,_18);
if(v){
_17.push(_12(k)+(_f?": ":":")+v);
}
}
}
}else{
for(k in _18){
if(Object.hasOwnProperty.call(_18,k)){
v=str(k,_18);
if(v){
_17.push(_12(k)+(_f?": ":":")+v);
}
}
}
}
v=_17.length===0?"{}":_f?"{\n"+_f+_17.join(",\n"+_f)+"\n"+_16+"}":"{"+_17.join(",")+"}";
_f=_16;
return v;
}
};
if(typeof JSON.stringify!=="function"){
JSON.stringify=function(_19,_1a,_1b){
var i;
_f="";
_10="";
if(typeof _1b==="number"){
for(i=0;i<_1b;i+=1){
_10+=" ";
}
}else{
if(typeof _1b==="string"){
_10=_1b;
}
}
rep=_1a;
if(_1a&&typeof _1a!=="function"&&(typeof _1a!=="object"||typeof _1a.length!=="number")){
throw new Error("JSON.stringify");
}
return str("",{"":_19});
};
}
if(typeof JSON.parse!=="function"){
JSON.parse=function(_1c,_1d){
var j;
function _1e(_1f,key){
var k,v,_20=_1f[key];
if(_20&&typeof _20==="object"){
for(k in _20){
if(Object.hasOwnProperty.call(_20,k)){
v=_1e(_20,k);
if(v!==_2f){
_20[k]=v;
}else{
delete _20[k];
}
}
}
}
return _1d.call(_1f,key,_20);
};
cx.lastIndex=0;
if(cx.test(_1c)){
_1c=_1c.replace(cx,function(a){
return "\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4);
});
}
if(/^[\],:{}\s]*$/.test(_1c.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){
j=eval("("+_1c+")");
return typeof _1d==="function"?_1e({"":j},""):j;
}
throw new SyntaxError("JSON.parse");
};
}
}());
var _21=/([^%]+|%(?:\d+\$)?[\+\-\ \#0]*[0-9\*]*(.[0-9\*]+)?[hlL]?[cbBdieEfgGosuxXpn%@])/g,_22=/(%)(?:(\d+)\$)?([\+\-\ \#0]*)([0-9\*]*)((?:.[0-9\*]+)?)([hlL]?)([cbBdieEfgGosuxXpn%@])/;
_2.sprintf=function(_23){
var _23=arguments[0],_24=_23.match(_21),_25=0,_26="",arg=1;
for(var i=0;i<_24.length;i++){
var t=_24[i];
if(_23.substring(_25,_25+t.length)!==t){
return _26;
}
_25+=t.length;
if(t.charAt(0)!=="%"){
_26+=t;
}else{
if(t==="%%"){
_26+="%";
}else{
var _27=t.match(_22);
if(_27.length!==8||_27[0]!==t){
return _26;
}
var _28=_27[1],_29=_27[2],_2a=_27[3],_2b=_27[4],_2c=_27[5],_2d=_27[6],_2e=_27[7];
if(_29===_2f||_29===null||_29===""){
_29=arg++;
}else{
_29=Number(_29);
}
var _30=null;
if(_2b=="*"){
_30=arguments[_29];
}else{
if(_2b!==""){
_30=Number(_2b);
}
}
var _31=null;
if(_2c===".*"){
_31=arguments[_29];
}else{
if(_2c!==""){
_31=Number(_2c.substring(1));
}
}
var _32=(_2a.indexOf("-")>=0),_33=(_2a.indexOf("0")>=0),_34="";
if(/[bBdiufeExXo]/.test(_2e)){
var num=Number(arguments[_29]),_35="";
if(num<0){
_35="-";
}else{
if(_2a.indexOf("+")>=0){
_35="+";
}else{
if(_2a.indexOf(" ")>=0){
_35=" ";
}
}
}
if(_2e==="d"||_2e==="i"||_2e==="u"){
var _36=String(Math.abs(Math.floor(num)));
_34=_37(_35,"",_36,"",_30,_32,_33);
}
if(_2e=="f"){
var _36=String((_31!==null)?Math.abs(num).toFixed(_31):Math.abs(num)),_38=(_2a.indexOf("#")>=0&&_36.indexOf(".")<0)?".":"";
_34=_37(_35,"",_36,_38,_30,_32,_33);
}
if(_2e==="e"||_2e==="E"){
var _36=String(Math.abs(num).toExponential(_31!==null?_31:21)),_38=(_2a.indexOf("#")>=0&&_36.indexOf(".")<0)?".":"";
_34=_37(_35,"",_36,_38,_30,_32,_33);
}
if(_2e=="x"||_2e=="X"){
var _36=String(Math.abs(num).toString(16));
var _39=(_2a.indexOf("#")>=0&&num!=0)?"0x":"";
_34=_37(_35,_39,_36,"",_30,_32,_33);
}
if(_2e=="b"||_2e=="B"){
var _36=String(Math.abs(num).toString(2));
var _39=(_2a.indexOf("#")>=0&&num!=0)?"0b":"";
_34=_37(_35,_39,_36,"",_30,_32,_33);
}
if(_2e=="o"){
var _36=String(Math.abs(num).toString(8));
var _39=(_2a.indexOf("#")>=0&&num!=0)?"0":"";
_34=_37(_35,_39,_36,"",_30,_32,_33);
}
if(/[A-Z]/.test(_2e)){
_34=_34.toUpperCase();
}else{
_34=_34.toLowerCase();
}
}else{
var _34="";
if(_2e==="%"){
_34="%";
}else{
if(_2e==="c"){
_34=String(arguments[_29]).charAt(0);
}else{
if(_2e==="s"||_2e==="@"){
_34=String(arguments[_29]);
}else{
if(_2e==="p"||_2e==="n"){
_34="";
}
}
}
}
_34=_37("","",_34,"",_30,_32,false);
}
_26+=_34;
}
}
}
return _26;
};
function _37(_3a,_3b,_3c,_3d,_3e,_3f,_40){
var _41=(_3a.length+_3b.length+_3c.length+_3d.length);
if(_3f){
return _3a+_3b+_3c+_3d+pad(_3e-_41," ");
}else{
if(_40){
return _3a+_3b+pad(_3e-_41,"0")+_3c+_3d;
}else{
return pad(_3e-_41," ")+_3a+_3b+_3c+_3d;
}
}
};
function pad(n,ch){
return Array(MAX(0,n)+1).join(ch);
};
CPLogDisable=false;
var _42="Cappuccino";
var _43=["fatal","error","warn","info","debug","trace"];
var _44=_43[3];
var _45={};
for(var i=0;i<_43.length;i++){
_45[_43[i]]=i;
}
var _46={};
CPLogRegister=function(_47,_48,_49){
CPLogRegisterRange(_47,_43[0],_48||_43[_43.length-1],_49);
};
CPLogRegisterRange=function(_4a,_4b,_4c,_4d){
var min=_45[_4b];
var max=_45[_4c];
if(min!==_2f&&max!==_2f&&min<=max){
for(var i=min;i<=max;i++){
CPLogRegisterSingle(_4a,_43[i],_4d);
}
}
};
CPLogRegisterSingle=function(_4e,_4f,_50){
if(!_46[_4f]){
_46[_4f]=[];
}
for(var i=0;i<_46[_4f].length;i++){
if(_46[_4f][i][0]===_4e){
_46[_4f][i][1]=_50;
return;
}
}
_46[_4f].push([_4e,_50]);
};
CPLogUnregister=function(_51){
for(var _52 in _46){
for(var i=0;i<_46[_52].length;i++){
if(_46[_52][i][0]===_51){
_46[_52].splice(i--,1);
}
}
}
};
function _53(_54,_55,_56){
if(_56==_2f){
_56=_42;
}
if(_55==_2f){
_55=_44;
}
var _57=(typeof _54[0]=="string"&&_54.length>1)?_2.sprintf.apply(null,_54):String(_54[0]);
if(_46[_55]){
for(var i=0;i<_46[_55].length;i++){
var _58=_46[_55][i];
_58[0](_57,_55,_56,_58[1]);
}
}
};
CPLog=function(){
_53(arguments);
};
for(var i=0;i<_43.length;i++){
CPLog[_43[i]]=(function(_59){
return function(){
_53(arguments,_59);
};
})(_43[i]);
}
var _5a=function(_5b,_5c,_5d){
var now=new Date(),_5e;
if(_5c===null){
_5c="";
}else{
_5c=_5c||"info";
_5c="["+CPLogColorize(_5c,_5c)+"]";
}
_5d=_5d||"";
if(_5d&&_5c){
_5d+=" ";
}
_5e=_5d+_5c;
if(_5e){
_5e+=": ";
}
if(typeof _2.sprintf=="function"){
return _2.sprintf("%4d-%02d-%02d %02d:%02d:%02d.%03d %s%s",now.getFullYear(),now.getMonth()+1,now.getDate(),now.getHours(),now.getMinutes(),now.getSeconds(),now.getMilliseconds(),_5e,_5b);
}else{
return now+" "+_5e+": "+_5b;
}
};
CPLogConsole=function(_5f,_60,_61,_62){
if(typeof console!="undefined"){
var _63=(_62||_5a)(_5f,_60,_61),_64={"fatal":"error","error":"error","warn":"warn","info":"info","debug":"debug","trace":"debug"}[_60];
if(_64&&console[_64]){
console[_64](_63);
}else{
if(console.log){
console.log(_63);
}
}
}
};
CPLogColorize=function(_65,_66){
return _65;
};
CPLogAlert=function(_67,_68,_69,_6a){
if(typeof alert!="undefined"&&!CPLogDisable){
var _6b=(_6a||_5a)(_67,_68,_69);
CPLogDisable=!confirm(_6b+"\n\n(Click cancel to stop log alerts)");
}
};
var _6c=null;
CPLogPopup=function(_6d,_6e,_6f,_70){
try{
if(CPLogDisable||window.open==_2f){
return;
}
if(!_6c||!_6c.document){
_6c=window.open("","_blank","width=600,height=400,status=no,resizable=yes,scrollbars=yes");
if(!_6c){
CPLogDisable=!confirm(_6d+"\n\n(Disable pop-up blocking for CPLog window; Click cancel to stop log alerts)");
return;
}
_71(_6c);
}
var _72=_6c.document.createElement("div");
_72.setAttribute("class",_6e||"fatal");
var _73=(_70||_5a)(_6d,_70?_6e:null,_6f);
_72.appendChild(_6c.document.createTextNode(_73));
_6c.log.appendChild(_72);
if(_6c.focusEnabled.checked){
_6c.focus();
}
if(_6c.blockEnabled.checked){
_6c.blockEnabled.checked=_6c.confirm(_73+"\nContinue blocking?");
}
if(_6c.scrollEnabled.checked){
_6c.scrollToBottom();
}
}
catch(e){
}
};
var _74="<style type=\"text/css\" media=\"screen\"> body{font:10px Monaco,Courier,\"Courier New\",monospace,mono;padding-top:15px;} div > .fatal,div > .error,div > .warn,div > .info,div > .debug,div > .trace{display:none;overflow:hidden;white-space:pre;padding:0px 5px 0px 5px;margin-top:2px;-moz-border-radius:5px;-webkit-border-radius:5px;} div[wrap=\"yes\"] > div{white-space:normal;} .fatal{background-color:#ffb2b3;} .error{background-color:#ffe2b2;} .warn{background-color:#fdffb2;} .info{background-color:#e4ffb2;} .debug{background-color:#a0e5a0;} .trace{background-color:#99b9ff;} .enfatal .fatal,.enerror .error,.enwarn .warn,.eninfo .info,.endebug .debug,.entrace .trace{display:block;} div#header{background-color:rgba(240,240,240,0.82);position:fixed;top:0px;left:0px;width:100%;border-bottom:1px solid rgba(0,0,0,0.33);text-align:center;} ul#enablers{display:inline-block;margin:1px 15px 0 15px;padding:2px 0 2px 0;} ul#enablers li{display:inline;padding:0px 5px 0px 5px;margin-left:4px;-moz-border-radius:5px;-webkit-border-radius:5px;} [enabled=\"no\"]{opacity:0.25;} ul#options{display:inline-block;margin:0 15px 0px 15px;padding:0 0px;} ul#options li{margin:0 0 0 0;padding:0 0 0 0;display:inline;} </style>";
function _71(_75){
var doc=_75.document;
doc.writeln("<html><head><title></title>"+_74+"</head><body></body></html>");
doc.title=_42+" Run Log";
var _76=doc.getElementsByTagName("head")[0];
var _77=doc.getElementsByTagName("body")[0];
var _78=window.location.protocol+"//"+window.location.host+window.location.pathname;
_78=_78.substring(0,_78.lastIndexOf("/")+1);
var div=doc.createElement("div");
div.setAttribute("id","header");
_77.appendChild(div);
var ul=doc.createElement("ul");
ul.setAttribute("id","enablers");
div.appendChild(ul);
for(var i=0;i<_43.length;i++){
var li=doc.createElement("li");
li.setAttribute("id","en"+_43[i]);
li.setAttribute("class",_43[i]);
li.setAttribute("onclick","toggle(this);");
li.setAttribute("enabled","yes");
li.appendChild(doc.createTextNode(_43[i]));
ul.appendChild(li);
}
var ul=doc.createElement("ul");
ul.setAttribute("id","options");
div.appendChild(ul);
var _79={"focus":["Focus",false],"block":["Block",false],"wrap":["Wrap",false],"scroll":["Scroll",true],"close":["Close",true]};
for(o in _79){
var li=doc.createElement("li");
ul.appendChild(li);
_75[o+"Enabled"]=doc.createElement("input");
_75[o+"Enabled"].setAttribute("id",o);
_75[o+"Enabled"].setAttribute("type","checkbox");
if(_79[o][1]){
_75[o+"Enabled"].setAttribute("checked","checked");
}
li.appendChild(_75[o+"Enabled"]);
var _7a=doc.createElement("label");
_7a.setAttribute("for",o);
_7a.appendChild(doc.createTextNode(_79[o][0]));
li.appendChild(_7a);
}
_75.log=doc.createElement("div");
_75.log.setAttribute("class","enerror endebug enwarn eninfo enfatal entrace");
_77.appendChild(_75.log);
_75.toggle=function(_7b){
var _7c=(_7b.getAttribute("enabled")=="yes")?"no":"yes";
_7b.setAttribute("enabled",_7c);
if(_7c=="yes"){
_75.log.className+=" "+_7b.id;
}else{
_75.log.className=_75.log.className.replace(new RegExp("[\\s]*"+_7b.id,"g"),"");
}
};
_75.scrollToBottom=function(){
_75.scrollTo(0,_77.offsetHeight);
};
_75.wrapEnabled.addEventListener("click",function(){
_75.log.setAttribute("wrap",_75.wrapEnabled.checked?"yes":"no");
},false);
_75.addEventListener("keydown",function(e){
var e=e||_75.event;
if(e.keyCode==75&&(e.ctrlKey||e.metaKey)){
while(_75.log.firstChild){
_75.log.removeChild(_75.log.firstChild);
}
e.preventDefault();
}
},"false");
window.addEventListener("unload",function(){
if(_75&&_75.closeEnabled&&_75.closeEnabled.checked){
CPLogDisable=true;
_75.close();
}
},false);
_75.addEventListener("unload",function(){
if(!CPLogDisable){
CPLogDisable=!confirm("Click cancel to stop logging");
}
},false);
};
CPLogDefault=(typeof window==="object"&&window.console)?CPLogConsole:CPLogPopup;
var _2f;
if(typeof window!=="undefined"){
window.setNativeTimeout=window.setTimeout;
window.clearNativeTimeout=window.clearTimeout;
window.setNativeInterval=window.setInterval;
window.clearNativeInterval=window.clearInterval;
}
NO=false;
YES=true;
nil=null;
Nil=null;
NULL=null;
ABS=Math.abs;
ASIN=Math.asin;
ACOS=Math.acos;
ATAN=Math.atan;
ATAN2=Math.atan2;
SIN=Math.sin;
COS=Math.cos;
TAN=Math.tan;
EXP=Math.exp;
POW=Math.pow;
CEIL=Math.ceil;
FLOOR=Math.floor;
ROUND=Math.round;
MIN=Math.min;
MAX=Math.max;
RAND=Math.random;
SQRT=Math.sqrt;
E=Math.E;
LN2=Math.LN2;
LN10=Math.LN10;
LOG=Math.log;
LOG2E=Math.LOG2E;
LOG10E=Math.LOG10E;
PI=Math.PI;
PI2=Math.PI*2;
PI_2=Math.PI/2;
SQRT1_2=Math.SQRT1_2;
SQRT2=Math.SQRT2;
function _7d(_7e){
this._eventListenersForEventNames={};
this._owner=_7e;
};
_7d.prototype.addEventListener=function(_7f,_80){
var _81=this._eventListenersForEventNames;
if(!_82.call(_81,_7f)){
var _83=[];
_81[_7f]=_83;
}else{
var _83=_81[_7f];
}
var _84=_83.length;
while(_84--){
if(_83[_84]===_80){
return;
}
}
_83.push(_80);
};
_7d.prototype.removeEventListener=function(_85,_86){
var _87=this._eventListenersForEventNames;
if(!_82.call(_87,_85)){
return;
}
var _88=_87[_85],_89=_88.length;
while(_89--){
if(_88[_89]===_86){
return _88.splice(_89,1);
}
}
};
_7d.prototype.dispatchEvent=function(_8a){
var _8b=_8a.type,_8c=this._eventListenersForEventNames;
if(_82.call(_8c,_8b)){
var _8d=this._eventListenersForEventNames[_8b],_8e=0,_8f=_8d.length;
for(;_8e<_8f;++_8e){
_8d[_8e](_8a);
}
}
var _90=(this._owner||this)["on"+_8b];
if(_90){
_90(_8a);
}
};
var _91=0,_92=null,_93=[];
function _94(_95){
var _96=_91;
if(_92===null){
window.setNativeTimeout(function(){
var _97=_93,_98=0,_99=_93.length;
++_91;
_92=null;
_93=[];
for(;_98<_99;++_98){
_97[_98]();
}
},0);
}
return function(){
var _9a=arguments;
if(_91>_96){
_95.apply(this,_9a);
}else{
_93.push(function(){
_95.apply(this,_9a);
});
}
};
};
var _9b=null;
if(window.XMLHttpRequest){
_9b=window.XMLHttpRequest;
}else{
if(window.ActiveXObject!==_2f){
var _9c=["Msxml2.XMLHTTP.3.0","Msxml2.XMLHTTP.6.0"],_9d=_9c.length;
while(_9d--){
try{
var _9e=_9c[_9d];
new ActiveXObject(_9e);
_9b=function(){
return new ActiveXObject(_9e);
};
break;
}
catch(anException){
}
}
}
}
CFHTTPRequest=function(){
this._isOpen=false;
this._requestHeaders={};
this._mimeType=null;
this._eventDispatcher=new _7d(this);
this._nativeRequest=new _9b();
var _9f=this;
this._stateChangeHandler=function(){
_b2(_9f);
};
this._nativeRequest.onreadystatechange=this._stateChangeHandler;
if(CFHTTPRequest.AuthenticationDelegate!==nil){
this._eventDispatcher.addEventListener("HTTP403",function(){
CFHTTPRequest.AuthenticationDelegate(_9f);
});
}
};
CFHTTPRequest.UninitializedState=0;
CFHTTPRequest.LoadingState=1;
CFHTTPRequest.LoadedState=2;
CFHTTPRequest.InteractiveState=3;
CFHTTPRequest.CompleteState=4;
CFHTTPRequest.AuthenticationDelegate=nil;
CFHTTPRequest.prototype.status=function(){
try{
return this._nativeRequest.status||0;
}
catch(anException){
return 0;
}
};
CFHTTPRequest.prototype.statusText=function(){
try{
return this._nativeRequest.statusText||"";
}
catch(anException){
return "";
}
};
CFHTTPRequest.prototype.readyState=function(){
return this._nativeRequest.readyState;
};
CFHTTPRequest.prototype.success=function(){
var _a0=this.status();
if(_a0>=200&&_a0<300){
return YES;
}
return _a0===0&&this.responseText()&&this.responseText().length;
};
CFHTTPRequest.prototype.responseXML=function(){
var _a1=this._nativeRequest.responseXML;
if(_a1&&(_9b===window.XMLHttpRequest)){
return _a1;
}
return _a2(this.responseText());
};
CFHTTPRequest.prototype.responsePropertyList=function(){
var _a3=this.responseText();
if(CFPropertyList.sniffedFormatOfString(_a3)===CFPropertyList.FormatXML_v1_0){
return CFPropertyList.propertyListFromXML(this.responseXML());
}
return CFPropertyList.propertyListFromString(_a3);
};
CFHTTPRequest.prototype.responseText=function(){
return this._nativeRequest.responseText;
};
CFHTTPRequest.prototype.setRequestHeader=function(_a4,_a5){
this._requestHeaders[_a4]=_a5;
};
CFHTTPRequest.prototype.getResponseHeader=function(_a6){
return this._nativeRequest.getResponseHeader(_a6);
};
CFHTTPRequest.prototype.getAllResponseHeaders=function(){
return this._nativeRequest.getAllResponseHeaders();
};
CFHTTPRequest.prototype.overrideMimeType=function(_a7){
this._mimeType=_a7;
};
CFHTTPRequest.prototype.open=function(_a8,_a9,_aa,_ab,_ac){
this._isOpen=true;
this._URL=_a9;
this._async=_aa;
this._method=_a8;
this._user=_ab;
this._password=_ac;
return this._nativeRequest.open(_a8,_a9,_aa,_ab,_ac);
};
CFHTTPRequest.prototype.send=function(_ad){
if(!this._isOpen){
delete this._nativeRequest.onreadystatechange;
this._nativeRequest.open(this._method,this._URL,this._async,this._user,this._password);
this._nativeRequest.onreadystatechange=this._stateChangeHandler;
}
for(var i in this._requestHeaders){
if(this._requestHeaders.hasOwnProperty(i)){
this._nativeRequest.setRequestHeader(i,this._requestHeaders[i]);
}
}
if(this._mimeType&&"overrideMimeType" in this._nativeRequest){
this._nativeRequest.overrideMimeType(this._mimeType);
}
this._isOpen=false;
try{
return this._nativeRequest.send(_ad);
}
catch(anException){
this._eventDispatcher.dispatchEvent({type:"failure",request:this});
}
};
CFHTTPRequest.prototype.abort=function(){
this._isOpen=false;
return this._nativeRequest.abort();
};
CFHTTPRequest.prototype.addEventListener=function(_ae,_af){
this._eventDispatcher.addEventListener(_ae,_af);
};
CFHTTPRequest.prototype.removeEventListener=function(_b0,_b1){
this._eventDispatcher.removeEventListener(_b0,_b1);
};
function _b2(_b3){
var _b4=_b3._eventDispatcher;
_b4.dispatchEvent({type:"readystatechange",request:_b3});
var _b5=_b3._nativeRequest,_b6=["uninitialized","loading","loaded","interactive","complete"];
if(_b6[_b3.readyState()]==="complete"){
var _b7="HTTP"+_b3.status();
_b4.dispatchEvent({type:_b7,request:_b3});
var _b8=_b3.success()?"success":"failure";
_b4.dispatchEvent({type:_b8,request:_b3});
_b4.dispatchEvent({type:_b6[_b3.readyState()],request:_b3});
}else{
_b4.dispatchEvent({type:_b6[_b3.readyState()],request:_b3});
}
};
function _b9(_ba,_bb,_bc,_bd){
var _be=new CFHTTPRequest();
if(_ba.pathExtension()==="plist"){
_be.overrideMimeType("text/xml");
}
var _bf=0,_c0=null;
function _c1(_c2){
_bd(_c2.loaded-_bf);
_bf=_c2.loaded;
};
function _c3(_c4){
if(_bd&&_c0===null){
_bd(_c4.request.responseText().length);
}
_bb(_c4);
};
if(_2.asyncLoader){
_be.onsuccess=_94(_c3);
_be.onfailure=_94(_bc);
}else{
_be.onsuccess=_c3;
_be.onfailure=_bc;
}
if(_bd){
var _c5=true;
if(document.all){
_c5=!!window.atob;
}
if(_c5){
try{
_c0=_2.asyncLoader?_94(_c1):_c1;
_be._nativeRequest.onprogress=_c0;
}
catch(anException){
_c0=null;
}
}
}
_be.open("GET",_ba.absoluteString(),_2.asyncLoader);
_be.send("");
};
_2.asyncLoader=YES;
_2.Asynchronous=_94;
_2.determineAndDispatchHTTPRequestEvents=_b2;
var _c6=0;
objj_generateObjectUID=function(){
return _c6++;
};
CFPropertyList=function(){
this._UID=objj_generateObjectUID();
};
CFPropertyList.DTDRE=/^\s*(?:<\?\s*xml\s+version\s*=\s*\"1.0\"[^>]*\?>\s*)?(?:<\!DOCTYPE[^>]*>\s*)?/i;
CFPropertyList.XMLRE=/^\s*(?:<\?\s*xml\s+version\s*=\s*\"1.0\"[^>]*\?>\s*)?(?:<\!DOCTYPE[^>]*>\s*)?<\s*plist[^>]*\>/i;
CFPropertyList.FormatXMLDTD="<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<!DOCTYPE plist PUBLIC \"-//Apple//DTD PLIST 1.0//EN\" \"http://www.apple.com/DTDs/PropertyList-1.0.dtd\">";
CFPropertyList.Format280NorthMagicNumber="280NPLIST";
CFPropertyList.FormatOpenStep=1,CFPropertyList.FormatXML_v1_0=100,CFPropertyList.FormatBinary_v1_0=200,CFPropertyList.Format280North_v1_0=-1000;
CFPropertyList.sniffedFormatOfString=function(_c7){
if(_c7.match(CFPropertyList.XMLRE)){
return CFPropertyList.FormatXML_v1_0;
}
if(_c7.substr(0,CFPropertyList.Format280NorthMagicNumber.length)===CFPropertyList.Format280NorthMagicNumber){
return CFPropertyList.Format280North_v1_0;
}
return NULL;
};
CFPropertyList.dataFromPropertyList=function(_c8,_c9){
var _ca=new CFMutableData();
_ca.setRawString(CFPropertyList.stringFromPropertyList(_c8,_c9));
return _ca;
};
CFPropertyList.stringFromPropertyList=function(_cb,_cc){
if(!_cc){
_cc=CFPropertyList.Format280North_v1_0;
}
var _cd=_ce[_cc];
return _cd["start"]()+_cf(_cb,_cd)+_cd["finish"]();
};
function _cf(_d0,_d1){
var _d2=typeof _d0,_d3=_d0.valueOf(),_d4=typeof _d3;
if(_d2!==_d4){
_d2=_d4;
_d0=_d3;
}
if(_d0===YES||_d0===NO){
_d2="boolean";
}else{
if(_d2==="number"){
if(FLOOR(_d0)===_d0&&(""+_d0).indexOf("e")==-1){
_d2="integer";
}else{
_d2="real";
}
}else{
if(_d2!=="string"){
if(_d0.slice){
_d2="array";
}else{
_d2="dictionary";
}
}
}
}
return _d1[_d2](_d0,_d1);
};
var _ce={};
_ce[CFPropertyList.FormatXML_v1_0]={"start":function(){
return CFPropertyList.FormatXMLDTD+"<plist version = \"1.0\">";
},"finish":function(){
return "</plist>";
},"string":function(_d5){
return "<string>"+_d6(_d5)+"</string>";
},"boolean":function(_d7){
return _d7?"<true/>":"<false/>";
},"integer":function(_d8){
return "<integer>"+_d8+"</integer>";
},"real":function(_d9){
return "<real>"+_d9+"</real>";
},"array":function(_da,_db){
var _dc=0,_dd=_da.length,_de="<array>";
for(;_dc<_dd;++_dc){
_de+=_cf(_da[_dc],_db);
}
return _de+"</array>";
},"dictionary":function(_df,_e0){
var _e1=_df._keys,_9d=0,_e2=_e1.length,_e3="<dict>";
for(;_9d<_e2;++_9d){
var key=_e1[_9d];
_e3+="<key>"+key+"</key>";
_e3+=_cf(_df.valueForKey(key),_e0);
}
return _e3+"</dict>";
}};
var _e4="A",_e5="D",_e6="f",_e7="d",_e8="S",_e9="T",_ea="F",_eb="K",_ec="E";
_ce[CFPropertyList.Format280North_v1_0]={"start":function(){
return CFPropertyList.Format280NorthMagicNumber+";1.0;";
},"finish":function(){
return "";
},"string":function(_ed){
return _e8+";"+_ed.length+";"+_ed;
},"boolean":function(_ee){
return (_ee?_e9:_ea)+";";
},"integer":function(_ef){
var _f0=""+_ef;
return _e7+";"+_f0.length+";"+_f0;
},"real":function(_f1){
var _f2=""+_f1;
return _e6+";"+_f2.length+";"+_f2;
},"array":function(_f3,_f4){
var _f5=0,_f6=_f3.length,_f7=_e4+";";
for(;_f5<_f6;++_f5){
_f7+=_cf(_f3[_f5],_f4);
}
return _f7+_ec+";";
},"dictionary":function(_f8,_f9){
var _fa=_f8._keys,_9d=0,_fb=_fa.length,_fc=_e5+";";
for(;_9d<_fb;++_9d){
var key=_fa[_9d];
_fc+=_eb+";"+key.length+";"+key;
_fc+=_cf(_f8.valueForKey(key),_f9);
}
return _fc+_ec+";";
}};
var _fd="xml",_fe="#document",_ff="plist",_100="key",_101="dict",_102="array",_103="string",_104="date",_105="true",_106="false",_107="real",_108="integer",_109="data";
var _10a=function(_10b){
var text="",_9d=0,_10c=_10b.length;
for(;_9d<_10c;++_9d){
var node=_10b[_9d];
if(node.nodeType===3||node.nodeType===4){
text+=node.nodeValue;
}else{
if(node.nodeType!==8){
text+=_10a(node.childNodes);
}
}
}
return text;
};
var _10d=function(_10e,_10f,_110){
var node=_10e;
node=(node.firstChild);
if(node!==NULL&&((node.nodeType)===8||(node.nodeType)===3)){
while((node=(node.nextSibling))&&((node.nodeType)===8||(node.nodeType)===3)){
}
}
if(node){
return node;
}
if((String(_10e.nodeName))===_102||(String(_10e.nodeName))===_101){
_110.pop();
}else{
if(node===_10f){
return NULL;
}
node=_10e;
while((node=(node.nextSibling))&&((node.nodeType)===8||(node.nodeType)===3)){
}
if(node){
return node;
}
}
node=_10e;
while(node){
var next=node;
while((next=(next.nextSibling))&&((next.nodeType)===8||(next.nodeType)===3)){
}
if(next){
return next;
}
var node=(node.parentNode);
if(_10f&&node===_10f){
return NULL;
}
_110.pop();
}
return NULL;
};
CFPropertyList.propertyListFromData=function(_111,_112){
return CFPropertyList.propertyListFromString(_111.rawString(),_112);
};
CFPropertyList.propertyListFromString=function(_113,_114){
if(!_114){
_114=CFPropertyList.sniffedFormatOfString(_113);
}
if(_114===CFPropertyList.FormatXML_v1_0){
return CFPropertyList.propertyListFromXML(_113);
}
if(_114===CFPropertyList.Format280North_v1_0){
return _115(_113);
}
return NULL;
};
var _e4="A",_e5="D",_e6="f",_e7="d",_e8="S",_e9="T",_ea="F",_eb="K",_ec="E";
function _115(_116){
var _117=new _118(_116),_119=NULL,key="",_11a=NULL,_11b=NULL,_11c=[],_11d=NULL;
while(_119=_117.getMarker()){
if(_119===_ec){
_11c.pop();
continue;
}
var _11e=_11c.length;
if(_11e){
_11d=_11c[_11e-1];
}
if(_119===_eb){
key=_117.getString();
_119=_117.getMarker();
}
switch(_119){
case _e4:
_11a=[];
_11c.push(_11a);
break;
case _e5:
_11a=new CFMutableDictionary();
_11c.push(_11a);
break;
case _e6:
_11a=parseFloat(_117.getString());
break;
case _e7:
_11a=parseInt(_117.getString(),10);
break;
case _e8:
_11a=_117.getString();
break;
case _e9:
_11a=YES;
break;
case _ea:
_11a=NO;
break;
default:
throw new Error("*** "+_119+" marker not recognized in Plist.");
}
if(!_11b){
_11b=_11a;
}else{
if(_11d){
if(_11d.slice){
_11d.push(_11a);
}else{
_11d.setValueForKey(key,_11a);
}
}
}
}
return _11b;
};
function _d6(_11f){
return _11f.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&apos;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
};
function _120(_121){
return _121.replace(/&quot;/g,"\"").replace(/&apos;/g,"'").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&");
};
function _a2(_122){
if(window.DOMParser){
return (new window.DOMParser().parseFromString(_122,"text/xml").documentElement);
}else{
if(window.ActiveXObject){
XMLNode=new ActiveXObject("Microsoft.XMLDOM");
var _123=_122.match(CFPropertyList.DTDRE);
if(_123){
_122=_122.substr(_123[0].length);
}
XMLNode.loadXML(_122);
return XMLNode;
}
}
return NULL;
};
CFPropertyList.propertyListFromXML=function(_124){
var _125=_124;
if(_124.valueOf&&typeof _124.valueOf()==="string"){
_125=_a2(_124);
}
while(((String(_125.nodeName))===_fe)||((String(_125.nodeName))===_fd)){
_125=(_125.firstChild);
}
if(_125!==NULL&&((_125.nodeType)===8||(_125.nodeType)===3)){
while((_125=(_125.nextSibling))&&((_125.nodeType)===8||(_125.nodeType)===3)){
}
}
if(((_125.nodeType)===10)){
while((_125=(_125.nextSibling))&&((_125.nodeType)===8||(_125.nodeType)===3)){
}
}
if(!((String(_125.nodeName))===_ff)){
return NULL;
}
var key="",_126=NULL,_127=NULL,_128=_125,_129=[],_12a=NULL;
while(_125=_10d(_125,_128,_129)){
var _12b=_129.length;
if(_12b){
_12a=_129[_12b-1];
}
if((String(_125.nodeName))===_100){
key=(_125.textContent||(_125.textContent!==""&&_10a([_125])));
while((_125=(_125.nextSibling))&&((_125.nodeType)===8||(_125.nodeType)===3)){
}
}
switch(String((String(_125.nodeName)))){
case _102:
_126=[];
_129.push(_126);
break;
case _101:
_126=new CFMutableDictionary();
_129.push(_126);
break;
case _107:
_126=parseFloat((_125.textContent||(_125.textContent!==""&&_10a([_125]))));
break;
case _108:
_126=parseInt((_125.textContent||(_125.textContent!==""&&_10a([_125]))),10);
break;
case _103:
if((_125.getAttribute("type")==="base64")){
_126=(_125.firstChild)?CFData.decodeBase64ToString((_125.textContent||(_125.textContent!==""&&_10a([_125])))):"";
}else{
_126=_120((_125.firstChild)?(_125.textContent||(_125.textContent!==""&&_10a([_125]))):"");
}
break;
case _104:
var _12c=Date.parseISO8601((_125.textContent||(_125.textContent!==""&&_10a([_125]))));
_126=isNaN(_12c)?new Date():new Date(_12c);
break;
case _105:
_126=YES;
break;
case _106:
_126=NO;
break;
case _109:
_126=new CFMutableData();
var _12d=(_125.firstChild)?CFData.decodeBase64ToArray((_125.textContent||(_125.textContent!==""&&_10a([_125]))),YES):[];
_126.setBytes(_12d);
break;
default:
throw new Error("*** "+(String(_125.nodeName))+" tag not recognized in Plist.");
}
if(!_127){
_127=_126;
}else{
if(_12a){
if(_12a.slice){
_12a.push(_126);
}else{
_12a.setValueForKey(key,_126);
}
}
}
}
return _127;
};
kCFPropertyListOpenStepFormat=CFPropertyList.FormatOpenStep;
kCFPropertyListXMLFormat_v1_0=CFPropertyList.FormatXML_v1_0;
kCFPropertyListBinaryFormat_v1_0=CFPropertyList.FormatBinary_v1_0;
kCFPropertyList280NorthFormat_v1_0=CFPropertyList.Format280North_v1_0;
CFPropertyListCreate=function(){
return new CFPropertyList();
};
CFPropertyListCreateFromXMLData=function(data){
return CFPropertyList.propertyListFromData(data,CFPropertyList.FormatXML_v1_0);
};
CFPropertyListCreateXMLData=function(_12e){
return CFPropertyList.dataFromPropertyList(_12e,CFPropertyList.FormatXML_v1_0);
};
CFPropertyListCreateFrom280NorthData=function(data){
return CFPropertyList.propertyListFromData(data,CFPropertyList.Format280North_v1_0);
};
CFPropertyListCreate280NorthData=function(_12f){
return CFPropertyList.dataFromPropertyList(_12f,CFPropertyList.Format280North_v1_0);
};
CPPropertyListCreateFromData=function(data,_130){
return CFPropertyList.propertyListFromData(data,_130);
};
CPPropertyListCreateData=function(_131,_132){
return CFPropertyList.dataFromPropertyList(_131,_132);
};
CFDictionary=function(_133){
this._keys=[];
this._count=0;
this._buckets={};
this._UID=objj_generateObjectUID();
};
var _134=Array.prototype.indexOf,_82=Object.prototype.hasOwnProperty;
CFDictionary.prototype.copy=function(){
return this;
};
CFDictionary.prototype.mutableCopy=function(){
var _135=new CFMutableDictionary(),keys=this._keys,_136=this._count;
_135._keys=keys.slice();
_135._count=_136;
var _137=0,_138=this._buckets,_139=_135._buckets;
for(;_137<_136;++_137){
var key=keys[_137];
_139[key]=_138[key];
}
return _135;
};
CFDictionary.prototype.containsKey=function(aKey){
return _82.apply(this._buckets,[aKey]);
};
CFDictionary.prototype.containsValue=function(_13a){
var keys=this._keys,_13b=this._buckets,_9d=0,_13c=keys.length;
for(;_9d<_13c;++_9d){
if(_13b[keys[_9d]]===_13a){
return YES;
}
}
return NO;
};
CFDictionary.prototype.count=function(){
return this._count;
};
CFDictionary.prototype.countOfKey=function(aKey){
return this.containsKey(aKey)?1:0;
};
CFDictionary.prototype.countOfValue=function(_13d){
var keys=this._keys,_13e=this._buckets,_9d=0,_13f=keys.length,_140=0;
for(;_9d<_13f;++_9d){
if(_13e[keys[_9d]]===_13d){
++_140;
}
}
return _140;
};
CFDictionary.prototype.keys=function(){
return this._keys.slice();
};
CFDictionary.prototype.valueForKey=function(aKey){
var _141=this._buckets;
if(!_82.apply(_141,[aKey])){
return nil;
}
return _141[aKey];
};
CFDictionary.prototype.toString=function(){
var _142="{\n",keys=this._keys,_9d=0,_143=this._count;
for(;_9d<_143;++_9d){
var key=keys[_9d];
_142+="\t"+key+" = \""+String(this.valueForKey(key)).split("\n").join("\n\t")+"\"\n";
}
return _142+"}";
};
CFMutableDictionary=function(_144){
CFDictionary.apply(this,[]);
};
CFMutableDictionary.prototype=new CFDictionary();
CFMutableDictionary.prototype.copy=function(){
return this.mutableCopy();
};
CFMutableDictionary.prototype.addValueForKey=function(aKey,_145){
if(this.containsKey(aKey)){
return;
}
++this._count;
this._keys.push(aKey);
this._buckets[aKey]=_145;
};
CFMutableDictionary.prototype.removeValueForKey=function(aKey){
var _146=-1;
if(_134){
_146=_134.call(this._keys,aKey);
}else{
var keys=this._keys,_9d=0,_147=keys.length;
for(;_9d<_147;++_9d){
if(keys[_9d]===aKey){
_146=_9d;
break;
}
}
}
if(_146===-1){
return;
}
--this._count;
this._keys.splice(_146,1);
delete this._buckets[aKey];
};
CFMutableDictionary.prototype.removeAllValues=function(){
this._count=0;
this._keys=[];
this._buckets={};
};
CFMutableDictionary.prototype.replaceValueForKey=function(aKey,_148){
if(!this.containsKey(aKey)){
return;
}
this._buckets[aKey]=_148;
};
CFMutableDictionary.prototype.setValueForKey=function(aKey,_149){
if(_149===nil||_149===_2f){
this.removeValueForKey(aKey);
}else{
if(this.containsKey(aKey)){
this.replaceValueForKey(aKey,_149);
}else{
this.addValueForKey(aKey,_149);
}
}
};
CFData=function(){
this._rawString=NULL;
this._propertyList=NULL;
this._propertyListFormat=NULL;
this._JSONObject=NULL;
this._bytes=NULL;
this._base64=NULL;
};
CFData.prototype.propertyList=function(){
if(!this._propertyList){
this._propertyList=CFPropertyList.propertyListFromString(this.rawString());
}
return this._propertyList;
};
CFData.prototype.JSONObject=function(){
if(!this._JSONObject){
try{
this._JSONObject=JSON.parse(this.rawString());
}
catch(anException){
}
}
return this._JSONObject;
};
CFData.prototype.rawString=function(){
if(this._rawString===NULL){
if(this._propertyList){
this._rawString=CFPropertyList.stringFromPropertyList(this._propertyList,this._propertyListFormat);
}else{
if(this._JSONObject){
this._rawString=JSON.stringify(this._JSONObject);
}else{
if(this._bytes){
this._rawString=CFData.bytesToString(this._bytes);
}else{
if(this._base64){
this._rawString=CFData.decodeBase64ToString(this._base64,true);
}else{
throw new Error("Can't convert data to string.");
}
}
}
}
}
return this._rawString;
};
CFData.prototype.bytes=function(){
if(this._bytes===NULL){
var _14a=CFData.stringToBytes(this.rawString());
this.setBytes(_14a);
}
return this._bytes;
};
CFData.prototype.base64=function(){
if(this._base64===NULL){
var _14b;
if(this._bytes){
_14b=CFData.encodeBase64Array(this._bytes);
}else{
_14b=CFData.encodeBase64String(this.rawString());
}
this.setBase64String(_14b);
}
return this._base64;
};
CFMutableData=function(){
CFData.call(this);
};
CFMutableData.prototype=new CFData();
function _14c(_14d){
this._rawString=NULL;
this._propertyList=NULL;
this._propertyListFormat=NULL;
this._JSONObject=NULL;
this._bytes=NULL;
this._base64=NULL;
};
CFMutableData.prototype.setPropertyList=function(_14e,_14f){
_14c(this);
this._propertyList=_14e;
this._propertyListFormat=_14f;
};
CFMutableData.prototype.setJSONObject=function(_150){
_14c(this);
this._JSONObject=_150;
};
CFMutableData.prototype.setRawString=function(_151){
_14c(this);
this._rawString=_151;
};
CFMutableData.prototype.setBytes=function(_152){
_14c(this);
this._bytes=_152;
};
CFMutableData.prototype.setBase64String=function(_153){
_14c(this);
this._base64=_153;
};
var _154=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","0","1","2","3","4","5","6","7","8","9","+","/","="],_155=[];
for(var i=0;i<_154.length;i++){
_155[_154[i].charCodeAt(0)]=i;
}
CFData.decodeBase64ToArray=function(_156,_157){
if(_157){
_156=_156.replace(/[^A-Za-z0-9\+\/\=]/g,"");
}
var pad=(_156[_156.length-1]=="="?1:0)+(_156[_156.length-2]=="="?1:0),_158=_156.length,_159=[];
var i=0;
while(i<_158){
var bits=(_155[_156.charCodeAt(i++)]<<18)|(_155[_156.charCodeAt(i++)]<<12)|(_155[_156.charCodeAt(i++)]<<6)|(_155[_156.charCodeAt(i++)]);
_159.push((bits&16711680)>>16);
_159.push((bits&65280)>>8);
_159.push(bits&255);
}
if(pad>0){
return _159.slice(0,-1*pad);
}
return _159;
};
CFData.encodeBase64Array=function(_15a){
var pad=(3-(_15a.length%3))%3,_15b=_15a.length+pad,_15c=[];
if(pad>0){
_15a.push(0);
}
if(pad>1){
_15a.push(0);
}
var i=0;
while(i<_15b){
var bits=(_15a[i++]<<16)|(_15a[i++]<<8)|(_15a[i++]);
_15c.push(_154[(bits&16515072)>>18]);
_15c.push(_154[(bits&258048)>>12]);
_15c.push(_154[(bits&4032)>>6]);
_15c.push(_154[bits&63]);
}
if(pad>0){
_15c[_15c.length-1]="=";
_15a.pop();
}
if(pad>1){
_15c[_15c.length-2]="=";
_15a.pop();
}
return _15c.join("");
};
CFData.decodeBase64ToString=function(_15d,_15e){
return CFData.bytesToString(CFData.decodeBase64ToArray(_15d,_15e));
};
CFData.decodeBase64ToUtf16String=function(_15f,_160){
return CFData.bytesToUtf16String(CFData.decodeBase64ToArray(_15f,_160));
};
CFData.bytesToString=function(_161){
return String.fromCharCode.apply(NULL,_161);
};
CFData.stringToBytes=function(_162){
var temp=[];
for(var i=0;i<_162.length;i++){
temp.push(_162.charCodeAt(i));
}
return temp;
};
CFData.encodeBase64String=function(_163){
var temp=[];
for(var i=0;i<_163.length;i++){
temp.push(_163.charCodeAt(i));
}
return CFData.encodeBase64Array(temp);
};
CFData.bytesToUtf16String=function(_164){
var temp=[];
for(var i=0;i<_164.length;i+=2){
temp.push(_164[i+1]<<8|_164[i]);
}
return String.fromCharCode.apply(NULL,temp);
};
CFData.encodeBase64Utf16String=function(_165){
var temp=[];
for(var i=0;i<_165.length;i++){
var c=_165.charCodeAt(i);
temp.push(c&255);
temp.push((c&65280)>>8);
}
return CFData.encodeBase64Array(temp);
};
var _166,_167,_168=0;
function _169(){
if(++_168!==1){
return;
}
_166={};
_167={};
};
function _16a(){
_168=MAX(_168-1,0);
if(_168!==0){
return;
}
delete _166;
delete _167;
};
var _16b=new RegExp("^"+"(?:"+"([^:/?#]+):"+")?"+"(?:"+"(//)"+"("+"(?:"+"("+"([^:@]*)"+":?"+"([^:@]*)"+")?"+"@"+")?"+"([^:/?#]*)"+"(?::(\\d*))?"+")"+")?"+"([^?#]*)"+"(?:\\?([^#]*))?"+"(?:#(.*))?");
var _16c=["url","scheme","authorityRoot","authority","userInfo","user","password","domain","portNumber","path","queryString","fragment"];
function _16d(aURL){
if(aURL._parts){
return aURL._parts;
}
var _16e=aURL.string(),_16f=_16e.match(/^mhtml:/);
if(_16f){
_16e=_16e.substr("mhtml:".length);
}
if(_168>0&&_82.call(_167,_16e)){
aURL._parts=_167[_16e];
return aURL._parts;
}
aURL._parts={};
var _170=aURL._parts,_171=_16b.exec(_16e),_9d=_171.length;
while(_9d--){
_170[_16c[_9d]]=_171[_9d]||NULL;
}
_170.portNumber=parseInt(_170.portNumber,10);
if(isNaN(_170.portNumber)){
_170.portNumber=-1;
}
_170.pathComponents=[];
if(_170.path){
var _172=_170.path.split("/"),_173=_170.pathComponents,_174=_172.length;
for(_9d=0;_9d<_174;++_9d){
var _175=_172[_9d];
if(_175){
_173.push(_175);
}else{
if(_9d===0){
_173.push("/");
}
}
}
_170.pathComponents=_173;
}
if(_16f){
_170.url="mhtml:"+_170.url;
_170.scheme="mhtml:"+_170.scheme;
}
if(_168>0){
_167[_16e]=_170;
}
return _170;
};
CFURL=function(aURL,_176){
aURL=aURL||"";
if(aURL instanceof CFURL){
if(!_176){
return new CFURL(aURL.absoluteString());
}
var _177=aURL.baseURL();
if(_177){
_176=new CFURL(_177.absoluteURL(),_176);
}
aURL=aURL.string();
}
if(_168>0){
var _178=aURL+" "+(_176&&_176.UID()||"");
if(_82.call(_166,_178)){
return _166[_178];
}
_166[_178]=this;
}
if(aURL.match(/^data:/)){
var _179={},_9d=_16c.length;
while(_9d--){
_179[_16c[_9d]]="";
}
_179.url=aURL;
_179.scheme="data";
_179.pathComponents=[];
this._parts=_179;
this._standardizedURL=this;
this._absoluteURL=this;
}
this._UID=objj_generateObjectUID();
this._string=aURL;
this._baseURL=_176;
};
CFURL.prototype.UID=function(){
return this._UID;
};
var _17a={};
CFURL.prototype.mappedURL=function(){
return _17a[this.absoluteString()]||this;
};
CFURL.setMappedURLForURL=function(_17b,_17c){
_17a[_17b.absoluteString()]=_17c;
};
CFURL.prototype.schemeAndAuthority=function(){
var _17d="",_17e=this.scheme();
if(_17e){
_17d+=_17e+":";
}
var _17f=this.authority();
if(_17f){
_17d+="//"+_17f;
}
return _17d;
};
CFURL.prototype.absoluteString=function(){
if(this._absoluteString===_2f){
this._absoluteString=this.absoluteURL().string();
}
return this._absoluteString;
};
CFURL.prototype.toString=function(){
return this.absoluteString();
};
function _180(aURL){
aURL=aURL.standardizedURL();
var _181=aURL.baseURL();
if(!_181){
return aURL;
}
var _182=((aURL)._parts||_16d(aURL)),_183,_184=_181.absoluteURL(),_185=((_184)._parts||_16d(_184));
if(_182.scheme||_182.authority){
_183=_182;
}else{
_183={};
_183.scheme=_185.scheme;
_183.authority=_185.authority;
_183.userInfo=_185.userInfo;
_183.user=_185.user;
_183.password=_185.password;
_183.domain=_185.domain;
_183.portNumber=_185.portNumber;
_183.queryString=_182.queryString;
_183.fragment=_182.fragment;
var _186=_182.pathComponents;
if(_186.length&&_186[0]==="/"){
_183.path=_182.path;
_183.pathComponents=_186;
}else{
var _187=_185.pathComponents,_188=_187.concat(_186);
if(!_181.hasDirectoryPath()&&_187.length){
_188.splice(_187.length-1,1);
}
if(_186.length&&(_186[0]===".."||_186[0]===".")){
_189(_188,YES);
}
_183.pathComponents=_188;
_183.path=_18a(_188,_186.length<=0||aURL.hasDirectoryPath());
}
}
var _18b=_18c(_183),_18d=new CFURL(_18b);
_18d._parts=_183;
_18d._standardizedURL=_18d;
_18d._standardizedString=_18b;
_18d._absoluteURL=_18d;
_18d._absoluteString=_18b;
return _18d;
};
function _18a(_18e,_18f){
var path=_18e.join("/");
if(path.length&&path.charAt(0)==="/"){
path=path.substr(1);
}
if(_18f){
path+="/";
}
return path;
};
function _189(_190,_191){
var _192=0,_193=0,_194=_190.length,_195=_191?_190:[],_196=NO;
for(;_192<_194;++_192){
var _197=_190[_192];
if(_197===""){
continue;
}
if(_197==="."){
_196=_193===0;
continue;
}
if(_197!==".."||_193===0||_195[_193-1]===".."){
_195[_193]=_197;
_193++;
continue;
}
if(_193>0&&_195[_193-1]!=="/"){
--_193;
}
}
if(_196&&_193===0){
_195[_193++]=".";
}
_195.length=_193;
return _195;
};
function _18c(_198){
var _199="",_19a=_198.scheme;
if(_19a){
_199+=_19a+":";
}
var _19b=_198.authority;
if(_19b){
_199+="//"+_19b;
}
_199+=_198.path;
var _19c=_198.queryString;
if(_19c){
_199+="?"+_19c;
}
var _19d=_198.fragment;
if(_19d){
_199+="#"+_19d;
}
return _199;
};
CFURL.prototype.absoluteURL=function(){
if(this._absoluteURL===_2f){
this._absoluteURL=_180(this);
}
return this._absoluteURL;
};
CFURL.prototype.standardizedURL=function(){
if(this._standardizedURL===_2f){
var _19e=((this)._parts||_16d(this)),_19f=_19e.pathComponents,_1a0=_189(_19f,NO);
var _1a1=_18a(_1a0,this.hasDirectoryPath());
if(_19e.path===_1a1){
this._standardizedURL=this;
}else{
var _1a2=_1a3(_19e);
_1a2.pathComponents=_1a0;
_1a2.path=_1a1;
var _1a4=new CFURL(_18c(_1a2),this.baseURL());
_1a4._parts=_1a2;
_1a4._standardizedURL=_1a4;
this._standardizedURL=_1a4;
}
}
return this._standardizedURL;
};
function _1a3(_1a5){
var _1a6={},_1a7=_16c.length;
while(_1a7--){
var _1a8=_16c[_1a7];
_1a6[_1a8]=_1a5[_1a8];
}
return _1a6;
};
CFURL.prototype.string=function(){
return this._string;
};
CFURL.prototype.authority=function(){
var _1a9=((this)._parts||_16d(this)).authority;
if(_1a9){
return _1a9;
}
var _1aa=this.baseURL();
return _1aa&&_1aa.authority()||"";
};
CFURL.prototype.hasDirectoryPath=function(){
var _1ab=this._hasDirectoryPath;
if(_1ab===_2f){
var path=this.path();
if(!path){
return NO;
}
if(path.charAt(path.length-1)==="/"){
return YES;
}
var _1ac=this.lastPathComponent();
_1ab=_1ac==="."||_1ac==="..";
this._hasDirectoryPath=_1ab;
}
return _1ab;
};
CFURL.prototype.hostName=function(){
return this.authority();
};
CFURL.prototype.fragment=function(){
return ((this)._parts||_16d(this)).fragment;
};
CFURL.prototype.lastPathComponent=function(){
if(this._lastPathComponent===_2f){
var _1ad=this.pathComponents(),_1ae=_1ad.length;
if(!_1ae){
this._lastPathComponent="";
}else{
this._lastPathComponent=_1ad[_1ae-1];
}
}
return this._lastPathComponent;
};
CFURL.prototype.path=function(){
return ((this)._parts||_16d(this)).path;
};
CFURL.prototype.createCopyDeletingLastPathComponent=function(){
var _1af=((this)._parts||_16d(this)),_1b0=_189(_1af.pathComponents,NO);
if(_1b0.length>0){
if(_1b0.length>1||_1b0[0]!=="/"){
_1b0.pop();
}
}
var _1b1=_1b0.length===1&&_1b0[0]==="/";
_1af.pathComponents=_1b0;
_1af.path=_1b1?"/":_18a(_1b0,NO);
return new CFURL(_18c(_1af));
};
CFURL.prototype.pathComponents=function(){
return ((this)._parts||_16d(this)).pathComponents;
};
CFURL.prototype.pathExtension=function(){
var _1b2=this.lastPathComponent();
if(!_1b2){
return NULL;
}
_1b2=_1b2.replace(/^\.*/,"");
var _1b3=_1b2.lastIndexOf(".");
return _1b3<=0?"":_1b2.substring(_1b3+1);
};
CFURL.prototype.queryString=function(){
return ((this)._parts||_16d(this)).queryString;
};
CFURL.prototype.scheme=function(){
var _1b4=this._scheme;
if(_1b4===_2f){
_1b4=((this)._parts||_16d(this)).scheme;
if(!_1b4){
var _1b5=this.baseURL();
_1b4=_1b5&&_1b5.scheme();
}
this._scheme=_1b4;
}
return _1b4;
};
CFURL.prototype.user=function(){
return ((this)._parts||_16d(this)).user;
};
CFURL.prototype.password=function(){
return ((this)._parts||_16d(this)).password;
};
CFURL.prototype.portNumber=function(){
return ((this)._parts||_16d(this)).portNumber;
};
CFURL.prototype.domain=function(){
return ((this)._parts||_16d(this)).domain;
};
CFURL.prototype.baseURL=function(){
return this._baseURL;
};
CFURL.prototype.asDirectoryPathURL=function(){
if(this.hasDirectoryPath()){
return this;
}
var _1b6=this.lastPathComponent();
if(_1b6!=="/"){
_1b6="./"+_1b6;
}
return new CFURL(_1b6+"/",this);
};
function _1b7(aURL){
if(!aURL._resourcePropertiesForKeys){
aURL._resourcePropertiesForKeys=new CFMutableDictionary();
}
return aURL._resourcePropertiesForKeys;
};
CFURL.prototype.resourcePropertyForKey=function(aKey){
return _1b7(this).valueForKey(aKey);
};
CFURL.prototype.setResourcePropertyForKey=function(aKey,_1b8){
_1b7(this).setValueForKey(aKey,_1b8);
};
CFURL.prototype.staticResourceData=function(){
var data=new CFMutableData();
data.setRawString(_1b9.resourceAtURL(this).contents());
return data;
};
function _118(_1ba){
this._string=_1ba;
var _1bb=_1ba.indexOf(";");
this._magicNumber=_1ba.substr(0,_1bb);
this._location=_1ba.indexOf(";",++_1bb);
this._version=_1ba.substring(_1bb,this._location++);
};
_118.prototype.magicNumber=function(){
return this._magicNumber;
};
_118.prototype.version=function(){
return this._version;
};
_118.prototype.getMarker=function(){
var _1bc=this._string,_1bd=this._location;
if(_1bd>=_1bc.length){
return null;
}
var next=_1bc.indexOf(";",_1bd);
if(next<0){
return null;
}
var _1be=_1bc.substring(_1bd,next);
if(_1be==="e"){
return null;
}
this._location=next+1;
return _1be;
};
_118.prototype.getString=function(){
var _1bf=this._string,_1c0=this._location;
if(_1c0>=_1bf.length){
return null;
}
var next=_1bf.indexOf(";",_1c0);
if(next<0){
return null;
}
var size=parseInt(_1bf.substring(_1c0,next),10),text=_1bf.substr(next+1,size);
this._location=next+1+size;
return text;
};
var _1c1=0,_1c2=1<<0,_1c3=1<<1,_1c4=1<<2,_1c5=1<<3,_1c6=1<<4;
var _1c7={},_1c8={},_1c9={},_1ca=new Date().getTime(),_1cb=0,_1cc=0;
CFBundle=function(aURL){
aURL=_1cd(aURL).asDirectoryPathURL();
var _1ce=aURL.absoluteString(),_1cf=_1c7[_1ce];
if(_1cf){
return _1cf;
}
_1c7[_1ce]=this;
this._bundleURL=aURL;
this._resourcesDirectoryURL=new CFURL("Resources/",aURL);
this._staticResource=NULL;
this._isValid=NO;
this._loadStatus=_1c1;
this._loadRequests=[];
this._infoDictionary=new CFDictionary();
this._eventDispatcher=new _7d(this);
};
CFBundle.environments=function(){
return ["Browser","ObjJ"];
};
CFBundle.bundleContainingURL=function(aURL){
aURL=new CFURL(".",_1cd(aURL));
var _1d0,_1d1=aURL.absoluteString();
while(!_1d0||_1d0!==_1d1){
var _1d2=_1c7[_1d1];
if(_1d2&&_1d2._isValid){
return _1d2;
}
aURL=new CFURL("..",aURL);
_1d0=_1d1;
_1d1=aURL.absoluteString();
}
return NULL;
};
CFBundle.mainBundle=function(){
return new CFBundle(_1d3);
};
function _1d4(_1d5,_1d6){
if(_1d6){
_1c8[_1d5.name]=_1d6;
}
};
function _1d7(){
_1c7={};
_1c8={};
_1c9={};
_1cb=0;
_1cc=0;
};
CFBundle.bundleForClass=function(_1d8){
return _1c8[_1d8.name]||CFBundle.mainBundle();
};
CFBundle.bundleWithIdentifier=function(_1d9){
return _1c9[_1d9]||NULL;
};
CFBundle.prototype.bundleURL=function(){
return this._bundleURL.absoluteURL();
};
CFBundle.prototype.resourcesDirectoryURL=function(){
return this._resourcesDirectoryURL;
};
CFBundle.prototype.resourceURL=function(_1da,_1db,_1dc){
if(_1db){
_1da=_1da+"."+_1db;
}
if(_1dc){
_1da=_1dc+"/"+_1da;
}
var _1dd=(new CFURL(_1da,this.resourcesDirectoryURL())).mappedURL();
return _1dd.absoluteURL();
};
CFBundle.prototype.mostEligibleEnvironmentURL=function(){
if(this._mostEligibleEnvironmentURL===_2f){
this._mostEligibleEnvironmentURL=new CFURL(this.mostEligibleEnvironment()+".environment/",this.bundleURL());
}
return this._mostEligibleEnvironmentURL;
};
CFBundle.prototype.executableURL=function(){
if(this._executableURL===_2f){
var _1de=this.valueForInfoDictionaryKey("CPBundleExecutable");
if(!_1de){
this._executableURL=NULL;
}else{
this._executableURL=new CFURL(_1de,this.mostEligibleEnvironmentURL());
}
}
return this._executableURL;
};
CFBundle.prototype.infoDictionary=function(){
return this._infoDictionary;
};
CFBundle.prototype.valueForInfoDictionaryKey=function(aKey){
return this._infoDictionary.valueForKey(aKey);
};
CFBundle.prototype.identifier=function(){
return this._infoDictionary.valueForKey("CPBundleIdentifier");
};
CFBundle.prototype.hasSpritedImages=function(){
var _1df=this._infoDictionary.valueForKey("CPBundleEnvironmentsWithImageSprites")||[],_9d=_1df.length,_1e0=this.mostEligibleEnvironment();
while(_9d--){
if(_1df[_9d]===_1e0){
return YES;
}
}
return NO;
};
CFBundle.prototype.environments=function(){
return this._infoDictionary.valueForKey("CPBundleEnvironments")||["ObjJ"];
};
CFBundle.prototype.mostEligibleEnvironment=function(_1e1){
_1e1=_1e1||this.environments();
var _1e2=CFBundle.environments(),_9d=0,_1e3=_1e2.length,_1e4=_1e1.length;
for(;_9d<_1e3;++_9d){
var _1e5=0,_1e6=_1e2[_9d];
for(;_1e5<_1e4;++_1e5){
if(_1e6===_1e1[_1e5]){
return _1e6;
}
}
}
return NULL;
};
CFBundle.prototype.isLoading=function(){
return this._loadStatus&_1c2;
};
CFBundle.prototype.isLoaded=function(){
return !!(this._loadStatus&_1c6);
};
CFBundle.prototype.load=function(_1e7){
if(this._loadStatus!==_1c1){
return;
}
this._loadStatus=_1c2|_1c3;
var self=this,_1e8=this.bundleURL(),_1e9=new CFURL("..",_1e8);
if(_1e9.absoluteString()===_1e8.absoluteString()){
_1e9=_1e9.schemeAndAuthority();
}
_1b9.resolveResourceAtURL(_1e9,YES,function(_1ea){
var _1eb=_1e8.lastPathComponent();
self._staticResource=_1ea._children[_1eb]||new _1b9(_1e8,_1ea,YES,NO);
function _1ec(_1ed){
self._loadStatus&=~_1c3;
var _1ee=_1ed.request.responsePropertyList();
self._isValid=!!_1ee||CFBundle.mainBundle()===self;
if(_1ee){
self._infoDictionary=_1ee;
var _1ef=self._infoDictionary.valueForKey("CPBundleIdentifier");
if(_1ef){
_1c9[_1ef]=self;
}
}
if(!self._infoDictionary){
_1f1(self,new Error("Could not load bundle at \""+path+"\""));
return;
}
if(self===CFBundle.mainBundle()&&self.valueForInfoDictionaryKey("CPApplicationSize")){
_1cc=self.valueForInfoDictionaryKey("CPApplicationSize").valueForKey("executable")||0;
}
_1f5(self,_1e7);
};
function _1f0(){
self._isValid=CFBundle.mainBundle()===self;
self._loadStatus=_1c1;
_1f1(self,new Error("Could not load bundle at \""+self.bundleURL()+"\""));
};
new _b9(new CFURL("Info.plist",self.bundleURL()),_1ec,_1f0);
});
};
function _1f1(_1f2,_1f3){
_1f4(_1f2._staticResource);
_1f2._eventDispatcher.dispatchEvent({type:"error",error:_1f3,bundle:_1f2});
};
function _1f5(_1f6,_1f7){
if(!_1f6.mostEligibleEnvironment()){
return _1f8();
}
_1f9(_1f6,_1fa,_1f8,_1fb);
_1fc(_1f6,_1fa,_1f8,_1fb);
if(_1f6._loadStatus===_1c2){
return _1fa();
}
function _1f8(_1fd){
var _1fe=_1f6._loadRequests,_1ff=_1fe.length;
while(_1ff--){
_1fe[_1ff].abort();
}
this._loadRequests=[];
_1f6._loadStatus=_1c1;
_1f1(_1f6,_1fd||new Error("Could not recognize executable code format in Bundle "+_1f6));
};
function _1fb(_200){
if((typeof CPApp==="undefined"||!CPApp||!CPApp._finishedLaunching)&&typeof OBJJ_PROGRESS_CALLBACK==="function"){
_1cb+=_200;
var _201=_1cc?MAX(MIN(1,_1cb/_1cc),0):0;
OBJJ_PROGRESS_CALLBACK(_201,_1cc,_1f6.bundlePath());
}
};
function _1fa(){
if(_1f6._loadStatus===_1c2){
_1f6._loadStatus=_1c6;
}else{
return;
}
_1f4(_1f6._staticResource);
function _202(){
_1f6._eventDispatcher.dispatchEvent({type:"load",bundle:_1f6});
};
if(_1f7){
_203(_1f6,_202);
}else{
_202();
}
};
};
function _1f9(_204,_205,_206,_207){
var _208=_204.executableURL();
if(!_208){
return;
}
_204._loadStatus|=_1c4;
new _b9(_208,function(_209){
try{
_20a(_204,_209.request.responseText(),_208);
_204._loadStatus&=~_1c4;
_205();
}
catch(anException){
_206(anException);
}
},_206,_207);
};
function _20b(_20c){
return "mhtml:"+new CFURL("MHTMLTest.txt",_20c.mostEligibleEnvironmentURL());
};
function _20d(_20e){
if(_20f===_210){
return new CFURL("dataURLs.txt",_20e.mostEligibleEnvironmentURL());
}
if(_20f===_211||_20f===_212){
return new CFURL("MHTMLPaths.txt",_20e.mostEligibleEnvironmentURL());
}
return NULL;
};
function _1fc(_213,_214,_215,_216){
if(!_213.hasSpritedImages()){
return;
}
_213._loadStatus|=_1c5;
if(!_217()){
return _218(_20b(_213),function(){
_1fc(_213,_214,_215,_216);
});
}
var _219=_20d(_213);
if(!_219){
_213._loadStatus&=~_1c5;
return _214();
}
new _b9(_219,function(_21a){
try{
_20a(_213,_21a.request.responseText(),_219);
_213._loadStatus&=~_1c5;
_214();
}
catch(anException){
_215(anException);
}
},_215,_216);
};
var _21b=[],_20f=-1,_21c=0,_210=1,_211=2,_212=3;
function _217(){
return _20f!==-1;
};
function _218(_21d,_21e){
if(_217()){
return;
}
_21b.push(_21e);
if(_21b.length>1){
return;
}
_21b.push(function(){
var size=0,_21f=CFBundle.mainBundle().valueForInfoDictionaryKey("CPApplicationSize");
if(!_21f){
return;
}
switch(_20f){
case _210:
size=_21f.valueForKey("data");
break;
case _211:
case _212:
size=_21f.valueForKey("mhtml");
break;
}
_1cc+=size;
});
_220([_210,"data:image/gif;base64,R0lGODlhAQABAIAAAMc9BQAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==",_211,_21d+"!test",_212,_21d+"?"+_1ca+"!test"]);
};
function _221(){
var _222=_21b.length;
while(_222--){
_21b[_222]();
}
};
function _220(_223){
if(!("Image" in _1)||_223.length<2){
_20f=_21c;
_221();
return;
}
var _224=new Image();
_224.onload=function(){
if(_224.width===1&&_224.height===1){
_20f=_223[0];
_221();
}else{
_224.onerror();
}
};
_224.onerror=function(){
_220(_223.slice(2));
};
_224.src=_223[1];
};
function _203(_225,_226){
var _227=[_225._staticResource];
function _228(_229){
for(;_229<_227.length;++_229){
var _22a=_227[_229];
if(_22a.isNotFound()){
continue;
}
if(_22a.isFile()){
var _22b=new _5f6(_22a.URL());
if(_22b.hasLoadedFileDependencies()){
_22b.execute();
}else{
_22b.loadFileDependencies(function(){
_228(_229);
});
return;
}
}else{
if(_22a.URL().absoluteString()===_225.resourcesDirectoryURL().absoluteString()){
continue;
}
var _22c=_22a.children();
for(var name in _22c){
if(_82.call(_22c,name)){
_227.push(_22c[name]);
}
}
}
}
_226();
};
_228(0);
};
var _22d="@STATIC",_22e="p",_22f="u",_230="c",_231="t",_232="I",_233="i";
function _20a(_234,_235,_236){
var _237=new _118(_235);
if(_237.magicNumber()!==_22d){
throw new Error("Could not read static file: "+_236);
}
if(_237.version()!=="1.0"){
throw new Error("Could not read static file: "+_236);
}
var _238,_239=_234.bundleURL(),file=NULL;
while(_238=_237.getMarker()){
var text=_237.getString();
if(_238===_22e){
var _23a=new CFURL(text,_239),_23b=_1b9.resourceAtURL(new CFURL(".",_23a),YES);
file=new _1b9(_23a,_23b,NO,YES);
}else{
if(_238===_22f){
var URL=new CFURL(text,_239),_23c=_237.getString();
if(_23c.indexOf("mhtml:")===0){
_23c="mhtml:"+new CFURL(_23c.substr("mhtml:".length),_239);
if(_20f===_212){
var _23d=_23c.indexOf("!"),_23e=_23c.substring(0,_23d),_23f=_23c.substring(_23d);
_23c=_23e+"?"+_1ca+_23f;
}
}
CFURL.setMappedURLForURL(URL,new CFURL(_23c));
var _23b=_1b9.resourceAtURL(new CFURL(".",URL),YES);
new _1b9(URL,_23b,NO,YES);
}else{
if(_238===_231){
file.write(text);
}
}
}
}
};
CFBundle.prototype.addEventListener=function(_240,_241){
this._eventDispatcher.addEventListener(_240,_241);
};
CFBundle.prototype.removeEventListener=function(_242,_243){
this._eventDispatcher.removeEventListener(_242,_243);
};
CFBundle.prototype.onerror=function(_244){
throw _244.error;
};
CFBundle.prototype.bundlePath=function(){
return this.bundleURL().path();
};
CFBundle.prototype.path=function(){
CPLog.warn("CFBundle.prototype.path is deprecated, use CFBundle.prototype.bundlePath instead.");
return this.bundlePath.apply(this,arguments);
};
CFBundle.prototype.pathForResource=function(_245){
return this.resourceURL(_245).absoluteString();
};
var _246={};
function _1b9(aURL,_247,_248,_249,_24a){
this._parent=_247;
this._eventDispatcher=new _7d(this);
var name=aURL.absoluteURL().lastPathComponent()||aURL.schemeAndAuthority();
this._name=name;
this._URL=aURL;
this._isResolved=!!_249;
this._filenameTranslateDictionary=_24a;
if(_248){
this._URL=this._URL.asDirectoryPathURL();
}
if(!_247){
_246[name]=this;
}
this._isDirectory=!!_248;
this._isNotFound=NO;
if(_247){
_247._children[name]=this;
}
if(_248){
this._children={};
}else{
this._contents="";
}
};
_1b9.rootResources=function(){
return _246;
};
function _24b(x){
var _24c=0;
for(var k in x){
if(x.hasOwnProperty(k)){
++_24c;
}
}
return _24c;
};
_1b9.resetRootResources=function(){
_246={};
};
_1b9.prototype.filenameTranslateDictionary=function(){
return this._filenameTranslateDictionary||{};
};
_2.StaticResource=_1b9;
function _1f4(_24d){
_24d._isResolved=YES;
_24d._eventDispatcher.dispatchEvent({type:"resolve",staticResource:_24d});
};
_1b9.prototype.resolve=function(){
if(this.isDirectory()){
var _24e=new CFBundle(this.URL());
_24e.onerror=function(){
};
_24e.load(NO);
}else{
var self=this;
function _24f(_250){
self._contents=_250.request.responseText();
_1f4(self);
};
function _251(){
self._isNotFound=YES;
_1f4(self);
};
var url=this.URL(),_252=this.filenameTranslateDictionary();
if(_252){
var _253=url.toString(),_254=url.lastPathComponent(),_255=_253.substring(0,_253.length-_254.length),_256=_252[_254];
if(_256&&_253.slice(-_256.length)!==_256){
url=new CFURL(_255+_256);
}
}
new _b9(url,_24f,_251);
}
};
_1b9.prototype.name=function(){
return this._name;
};
_1b9.prototype.URL=function(){
return this._URL;
};
_1b9.prototype.contents=function(){
return this._contents;
};
_1b9.prototype.children=function(){
return this._children;
};
_1b9.prototype.parent=function(){
return this._parent;
};
_1b9.prototype.isResolved=function(){
return this._isResolved;
};
_1b9.prototype.write=function(_257){
this._contents+=_257;
};
function _258(_259){
var _25a=_259.schemeAndAuthority(),_25b=_246[_25a];
if(!_25b){
_25b=new _1b9(new CFURL(_25a),NULL,YES,YES);
}
return _25b;
};
_1b9.resourceAtURL=function(aURL,_25c){
aURL=_1cd(aURL).absoluteURL();
var _25d=_258(aURL),_25e=aURL.pathComponents(),_9d=0,_25f=_25e.length;
for(;_9d<_25f;++_9d){
var name=_25e[_9d];
if(_82.call(_25d._children,name)){
_25d=_25d._children[name];
}else{
if(_25c){
if(name!=="/"){
name="./"+name;
}
_25d=new _1b9(new CFURL(name,_25d.URL()),_25d,YES,YES);
}else{
throw new Error("Static Resource at "+aURL+" is not resolved (\""+name+"\")");
}
}
}
return _25d;
};
_1b9.prototype.resourceAtURL=function(aURL,_260){
return _1b9.resourceAtURL(new CFURL(aURL,this.URL()),_260);
};
_1b9.resolveResourceAtURL=function(aURL,_261,_262,_263){
aURL=_1cd(aURL).absoluteURL();
_264(_258(aURL),_261,aURL.pathComponents(),0,_262,_263);
};
_1b9.prototype.resolveResourceAtURL=function(aURL,_265,_266){
_1b9.resolveResourceAtURL(new CFURL(aURL,this.URL()).absoluteURL(),_265,_266);
};
function _264(_267,_268,_269,_26a,_26b,_26c){
var _26d=_269.length;
for(;_26a<_26d;++_26a){
var name=_269[_26a],_26e=_82.call(_267._children,name)&&_267._children[name];
if(!_26e){
_26e=new _1b9(new CFURL(name,_267.URL()),_267,_26a+1<_26d||_268,NO,_26c);
_26e.resolve();
}
if(!_26e.isResolved()){
return _26e.addEventListener("resolve",function(){
_264(_267,_268,_269,_26a,_26b,_26c);
});
}
if(_26e.isNotFound()){
return _26b(null,new Error("File not found: "+_269.join("/")));
}
if((_26a+1<_26d)&&_26e.isFile()){
return _26b(null,new Error("File is not a directory: "+_269.join("/")));
}
_267=_26e;
}
_26b(_267);
};
function _26f(aURL,_270,_271){
var _272=_1b9.includeURLs(),_273=new CFURL(aURL,_272[_270]).absoluteURL();
_1b9.resolveResourceAtURL(_273,NO,function(_274){
if(!_274){
if(_270+1<_272.length){
_26f(aURL,_270+1,_271);
}else{
_271(NULL);
}
return;
}
_271(_274);
});
};
_1b9.resolveResourceAtURLSearchingIncludeURLs=function(aURL,_275){
_26f(aURL,0,_275);
};
_1b9.prototype.addEventListener=function(_276,_277){
this._eventDispatcher.addEventListener(_276,_277);
};
_1b9.prototype.removeEventListener=function(_278,_279){
this._eventDispatcher.removeEventListener(_278,_279);
};
_1b9.prototype.isNotFound=function(){
return this._isNotFound;
};
_1b9.prototype.isFile=function(){
return !this._isDirectory;
};
_1b9.prototype.isDirectory=function(){
return this._isDirectory;
};
_1b9.prototype.toString=function(_27a){
if(this.isNotFound()){
return "<file not found: "+this.name()+">";
}
var _27b=this.name();
if(this.isDirectory()){
var _27c=this._children;
for(var name in _27c){
if(_27c.hasOwnProperty(name)){
var _27d=_27c[name];
if(_27a||!_27d.isNotFound()){
_27b+="\n\t"+_27c[name].toString(_27a).split("\n").join("\n\t");
}
}
}
}
return _27b;
};
var _27e=NULL;
_1b9.includeURLs=function(){
if(_27e!==NULL){
return _27e;
}
_27e=[];
if(!_1.OBJJ_INCLUDE_PATHS&&!_1.OBJJ_INCLUDE_URLS){
_27e=["Frameworks","Frameworks/Debug"];
}else{
_27e=(_1.OBJJ_INCLUDE_PATHS||[]).concat(_1.OBJJ_INCLUDE_URLS||[]);
}
var _27f=_27e.length;
while(_27f--){
_27e[_27f]=new CFURL(_27e[_27f]).asDirectoryPathURL();
}
return _27e;
};
var _280="accessors",_281="class",_282="end",_283="function",_284="implementation",_285="import",_286="each",_287="outlet",_288="action",_289="new",_28a="selector",_28b="super",_28c="var",_28d="in",_28e="pragma",_28f="mark",_290="=",_291="+",_292="-",_293=":",_294=",",_295=".",_296="*",_297=";",_298="<",_299="{",_29a="}",_29b=">",_29c="[",_29d="\"",_29e="@",_29f="#",_2a0="]",_2a1="?",_2a2="(",_2a3=")",_2a4=/^(?:(?:\s+$)|(?:\/(?:\/|\*)))/,_2a5=/^[+-]?\d+(([.]\d+)*([eE][+-]?\d+))?$/,_2a6=/^[a-zA-Z_$](\w|$)*$/;
function _2a7(_2a8){
this._index=-1;
this._tokens=(_2a8+"\n").match(/\/\/.*(\r|\n)?|\/\*(?:.|\n|\r)*?\*\/|\w+\b|[+-]?\d+(([.]\d+)*([eE][+-]?\d+))?|"[^"\\]*(\\[\s\S][^"\\]*)*"|'[^'\\]*(\\[\s\S][^'\\]*)*'|\s+|./g);
this._context=[];
return this;
};
_2a7.prototype.push=function(){
this._context.push(this._index);
};
_2a7.prototype.pop=function(){
this._index=this._context.pop();
};
_2a7.prototype.peek=function(_2a9){
if(_2a9){
this.push();
var _2aa=this.skip_whitespace();
this.pop();
return _2aa;
}
return this._tokens[this._index+1];
};
_2a7.prototype.next=function(){
return this._tokens[++this._index];
};
_2a7.prototype.previous=function(){
return this._tokens[--this._index];
};
_2a7.prototype.last=function(){
if(this._index<0){
return NULL;
}
return this._tokens[this._index-1];
};
_2a7.prototype.skip_whitespace=function(_2ab){
var _2ac;
if(_2ab){
while((_2ac=this.previous())&&_2a4.test(_2ac)){
}
}else{
while((_2ac=this.next())&&_2a4.test(_2ac)){
}
}
return _2ac;
};
_2.Lexer=_2a7;
function _2ad(){
this.atoms=[];
};
_2ad.prototype.toString=function(){
return this.atoms.join("");
};
_2.preprocess=function(_2ae,aURL,_2af){
return new _2b0(_2ae,aURL,_2af).executable();
};
_2.eval=function(_2b1){
return eval(_2.preprocess(_2b1).code());
};
var _2b0=function(_2b2,aURL,_2b3){
this._URL=new CFURL(aURL);
_2b2=_2b2.replace(/^#[^\n]+\n/,"\n");
this._currentSelector="";
this._currentClass="";
this._currentSuperClass="";
this._currentSuperMetaClass="";
this._buffer=new _2ad();
this._preprocessed=NULL;
this._dependencies=[];
this._tokens=new _2a7(_2b2);
this._flags=_2b3;
this._classMethod=false;
this._executable=NULL;
this._classLookupTable={};
this._classVars={};
var _2b4=new objj_class();
for(var i in _2b4){
this._classVars[i]=1;
}
this.preprocess(this._tokens,this._buffer);
};
_2b0.prototype.setClassInfo=function(_2b5,_2b6,_2b7){
this._classLookupTable[_2b5]={superClassName:_2b6,ivars:_2b7};
};
_2b0.prototype.getClassInfo=function(_2b8){
return this._classLookupTable[_2b8];
};
_2b0.prototype.allIvarNamesForClassName=function(_2b9){
var _2ba={},_2bb=this.getClassInfo(_2b9);
while(_2bb){
for(var i in _2bb.ivars){
_2ba[i]=1;
}
_2bb=this.getClassInfo(_2bb.superClassName);
}
return _2ba;
};
_2.Preprocessor=_2b0;
_2b0.Flags={};
_2b0.Flags.IncludeDebugSymbols=1<<0;
_2b0.Flags.IncludeTypeSignatures=1<<1;
_2b0.prototype.executable=function(){
if(!this._executable){
this._executable=new _2bc(this._buffer.toString(),this._dependencies,this._URL);
}
return this._executable;
};
_2b0.prototype.accessors=function(_2bd){
var _2be=_2bd.skip_whitespace(),_2bf={};
if(_2be!=_2a2){
_2bd.previous();
return _2bf;
}
while((_2be=_2bd.skip_whitespace())!=_2a3){
var name=_2be,_2c0=true;
if(!/^\w+$/.test(name)){
throw new SyntaxError(this.error_message("*** @accessors attribute name not valid."));
}
if((_2be=_2bd.skip_whitespace())==_290){
_2c0=_2bd.skip_whitespace();
if(!/^\w+$/.test(_2c0)){
throw new SyntaxError(this.error_message("*** @accessors attribute value not valid."));
}
if(name=="setter"){
if((_2be=_2bd.next())!=_293){
throw new SyntaxError(this.error_message("*** @accessors setter attribute requires argument with \":\" at end of selector name."));
}
_2c0+=":";
}
_2be=_2bd.skip_whitespace();
}
_2bf[name]=_2c0;
if(_2be==_2a3){
break;
}
if(_2be!=_294){
throw new SyntaxError(this.error_message("*** Expected ',' or ')' in @accessors attribute list."));
}
}
return _2bf;
};
_2b0.prototype.brackets=function(_2c1,_2c2){
var _2c3=[];
while(this.preprocess(_2c1,NULL,NULL,NULL,_2c3[_2c3.length]=[])){
}
if(_2c3[0].length===1){
_2c2.atoms[_2c2.atoms.length]="[";
_2c2.atoms[_2c2.atoms.length]=_2c3[0][0];
_2c2.atoms[_2c2.atoms.length]="]";
}else{
var _2c4=new _2ad();
if(_2c3[0][0].atoms[0]==_28b){
_2c2.atoms[_2c2.atoms.length]="objj_msgSendSuper(";
_2c2.atoms[_2c2.atoms.length]="{ receiver:self, super_class:"+(this._classMethod?this._currentSuperMetaClass:this._currentSuperClass)+" }";
}else{
_2c2.atoms[_2c2.atoms.length]="objj_msgSend(";
_2c2.atoms[_2c2.atoms.length]=_2c3[0][0];
}
_2c4.atoms[_2c4.atoms.length]=_2c3[0][1];
var _2c5=1,_2c6=_2c3.length,_2c7=new _2ad();
for(;_2c5<_2c6;++_2c5){
var pair=_2c3[_2c5];
_2c4.atoms[_2c4.atoms.length]=pair[1];
_2c7.atoms[_2c7.atoms.length]=", "+pair[0];
}
_2c2.atoms[_2c2.atoms.length]=", \"";
_2c2.atoms[_2c2.atoms.length]=_2c4;
_2c2.atoms[_2c2.atoms.length]="\"";
_2c2.atoms[_2c2.atoms.length]=_2c7;
_2c2.atoms[_2c2.atoms.length]=")";
}
};
_2b0.prototype.directive=function(_2c8,_2c9,_2ca){
var _2cb=_2c9?_2c9:new _2ad(),_2cc=_2c8.next();
if(_2cc.charAt(0)==_29d){
_2cb.atoms[_2cb.atoms.length]=_2cc;
}else{
if(_2cc===_281){
_2c8.skip_whitespace();
return;
}else{
if(_2cc===_284){
this.implementation(_2c8,_2cb);
}else{
if(_2cc===_285){
this._import(_2c8);
}else{
if(_2cc===_28a){
this.selector(_2c8,_2cb);
}
}
}
}
}
if(!_2c9){
return _2cb;
}
};
_2b0.prototype.hash=function(_2cd,_2ce){
var _2cf=_2ce?_2ce:new _2ad(),_2d0=_2cd.next();
if(_2d0===_28e){
_2d0=_2cd.skip_whitespace();
if(_2d0===_28f){
while((_2d0=_2cd.next()).indexOf("\n")<0){
}
}
}else{
throw new SyntaxError(this.error_message("*** Expected \"pragma\" to follow # but instead saw \""+_2d0+"\"."));
}
};
_2b0.prototype.implementation=function(_2d1,_2d2){
var _2d3=_2d2,_2d4="",_2d5=NO,_2d6=_2d1.skip_whitespace(),_2d7="Nil",_2d8=new _2ad(),_2d9=new _2ad();
if(!(/^\w/).test(_2d6)){
throw new Error(this.error_message("*** Expected class name, found \""+_2d6+"\"."));
}
this._currentSuperClass="objj_getClass(\""+_2d6+"\").super_class";
this._currentSuperMetaClass="objj_getMetaClass(\""+_2d6+"\").super_class";
this._currentClass=_2d6;
this._currentSelector="";
if((_2d4=_2d1.skip_whitespace())==_2a2){
_2d4=_2d1.skip_whitespace();
if(_2d4==_2a3){
throw new SyntaxError(this.error_message("*** Can't Have Empty Category Name for class \""+_2d6+"\"."));
}
if(_2d1.skip_whitespace()!=_2a3){
throw new SyntaxError(this.error_message("*** Improper Category Definition for class \""+_2d6+"\"."));
}
_2d3.atoms[_2d3.atoms.length]="{\nvar the_class = objj_getClass(\""+_2d6+"\")\n";
_2d3.atoms[_2d3.atoms.length]="if(!the_class) throw new SyntaxError(\"*** Could not find definition for class \\\""+_2d6+"\\\"\");\n";
_2d3.atoms[_2d3.atoms.length]="var meta_class = the_class.isa;";
}else{
if(_2d4==_293){
_2d4=_2d1.skip_whitespace();
if(!_2a6.test(_2d4)){
throw new SyntaxError(this.error_message("*** Expected class name, found \""+_2d4+"\"."));
}
_2d7=_2d4;
_2d4=_2d1.skip_whitespace();
}
_2d3.atoms[_2d3.atoms.length]="{var the_class = objj_allocateClassPair("+_2d7+", \""+_2d6+"\"),\nmeta_class = the_class.isa;";
if(_2d4==_299){
var _2da={},_2db=0,_2dc=[],_2dd,_2de={},_2df=[];
while((_2d4=_2d1.skip_whitespace())&&_2d4!=_29a){
if(_2d4===_29e){
_2d4=_2d1.next();
if(_2d4===_280){
_2dd=this.accessors(_2d1);
}else{
if(_2d4!==_287){
throw new SyntaxError(this.error_message("*** Unexpected '@' token in ivar declaration ('@"+_2d4+"')."));
}else{
_2df.push("@"+_2d4);
}
}
}else{
if(_2d4==_297){
if(_2db++===0){
_2d3.atoms[_2d3.atoms.length]="class_addIvars(the_class, [";
}else{
_2d3.atoms[_2d3.atoms.length]=", ";
}
var name=_2dc[_2dc.length-1];
if(this._flags&_2b0.Flags.IncludeTypeSignatures){
_2d3.atoms[_2d3.atoms.length]="new objj_ivar(\""+name+"\", \""+_2df.slice(0,_2df.length-1).join(" ")+"\")";
}else{
_2d3.atoms[_2d3.atoms.length]="new objj_ivar(\""+name+"\")";
}
_2da[name]=1;
_2dc=[];
_2df=[];
if(_2dd){
_2de[name]=_2dd;
_2dd=NULL;
}
}else{
_2dc.push(_2d4);
_2df.push(_2d4);
}
}
}
if(_2dc.length){
throw new SyntaxError(this.error_message("*** Expected ';' in ivar declaration, found '}'."));
}
if(_2db){
_2d3.atoms[_2d3.atoms.length]="]);\n";
}
if(!_2d4){
throw new SyntaxError(this.error_message("*** Expected '}'"));
}
this.setClassInfo(_2d6,_2d7==="Nil"?null:_2d7,_2da);
var _2da=this.allIvarNamesForClassName(_2d6);
for(ivar_name in _2de){
var _2e0=_2de[ivar_name],_2e1=_2e0["property"]||ivar_name;
var _2e2=_2e0["getter"]||_2e1,_2e3="(id)"+_2e2+"\n{\nreturn "+ivar_name+";\n}";
if(_2d8.atoms.length!==0){
_2d8.atoms[_2d8.atoms.length]=",\n";
}
_2d8.atoms[_2d8.atoms.length]=this.method(new _2a7(_2e3),_2da);
if(_2e0["readonly"]){
continue;
}
var _2e4=_2e0["setter"];
if(!_2e4){
var _2e5=_2e1.charAt(0)=="_"?1:0;
_2e4=(_2e5?"_":"")+"set"+_2e1.substr(_2e5,1).toUpperCase()+_2e1.substring(_2e5+1)+":";
}
var _2e6="(void)"+_2e4+"(id)newValue\n{\n";
if(_2e0["copy"]){
_2e6+="if ("+ivar_name+" !== newValue)\n"+ivar_name+" = [newValue copy];\n}";
}else{
_2e6+=ivar_name+" = newValue;\n}";
}
if(_2d8.atoms.length!==0){
_2d8.atoms[_2d8.atoms.length]=",\n";
}
_2d8.atoms[_2d8.atoms.length]=this.method(new _2a7(_2e6),_2da);
}
}else{
_2d1.previous();
}
_2d3.atoms[_2d3.atoms.length]="objj_registerClassPair(the_class);\n";
}
if(!_2da){
var _2da=this.allIvarNamesForClassName(_2d6);
}
while((_2d4=_2d1.skip_whitespace())){
if(_2d4==_291){
this._classMethod=true;
if(_2d9.atoms.length!==0){
_2d9.atoms[_2d9.atoms.length]=", ";
}
_2d9.atoms[_2d9.atoms.length]=this.method(_2d1,this._classVars);
}else{
if(_2d4==_292){
this._classMethod=false;
if(_2d8.atoms.length!==0){
_2d8.atoms[_2d8.atoms.length]=", ";
}
_2d8.atoms[_2d8.atoms.length]=this.method(_2d1,_2da);
}else{
if(_2d4==_29f){
this.hash(_2d1,_2d3);
}else{
if(_2d4==_29e){
if((_2d4=_2d1.next())==_282){
break;
}else{
throw new SyntaxError(this.error_message("*** Expected \"@end\", found \"@"+_2d4+"\"."));
}
}
}
}
}
}
if(_2d8.atoms.length!==0){
_2d3.atoms[_2d3.atoms.length]="class_addMethods(the_class, [";
_2d3.atoms[_2d3.atoms.length]=_2d8;
_2d3.atoms[_2d3.atoms.length]="]);\n";
}
if(_2d9.atoms.length!==0){
_2d3.atoms[_2d3.atoms.length]="class_addMethods(meta_class, [";
_2d3.atoms[_2d3.atoms.length]=_2d9;
_2d3.atoms[_2d3.atoms.length]="]);\n";
}
_2d3.atoms[_2d3.atoms.length]="}";
this._currentClass="";
};
_2b0.prototype._import=function(_2e7){
var _2e8="",_2e9=_2e7.skip_whitespace(),_2ea=(_2e9!==_298);
if(_2e9===_298){
while((_2e9=_2e7.next())&&_2e9!==_29b){
_2e8+=_2e9;
}
if(!_2e9){
throw new SyntaxError(this.error_message("*** Unterminated import statement."));
}
}else{
if(_2e9.charAt(0)===_29d){
_2e8=_2e9.substr(1,_2e9.length-2);
}else{
throw new SyntaxError(this.error_message("*** Expecting '<' or '\"', found \""+_2e9+"\"."));
}
}
this._buffer.atoms[this._buffer.atoms.length]="objj_executeFile(\"";
this._buffer.atoms[this._buffer.atoms.length]=_2e8;
this._buffer.atoms[this._buffer.atoms.length]=_2ea?"\", YES);":"\", NO);";
this._dependencies.push(new _2eb(new CFURL(_2e8),_2ea));
};
_2b0.prototype.method=function(_2ec,_2ed){
var _2ee=new _2ad(),_2ef,_2f0="",_2f1=[],_2f2=[null];
_2ed=_2ed||{};
while((_2ef=_2ec.skip_whitespace())&&_2ef!==_299&&_2ef!==_297){
if(_2ef==_293){
var type="";
_2f0+=_2ef;
_2ef=_2ec.skip_whitespace();
if(_2ef==_2a2){
while((_2ef=_2ec.skip_whitespace())&&_2ef!=_2a3){
type+=_2ef;
}
_2ef=_2ec.skip_whitespace();
}
_2f2[_2f1.length+1]=type||null;
_2f1[_2f1.length]=_2ef;
if(_2ef in _2ed){
CPLog.warn(this.error_message("*** Warning: Method ( "+_2f0+" ) uses a parameter name that is already in use ( "+_2ef+" )"));
}
}else{
if(_2ef==_2a2){
var type="";
while((_2ef=_2ec.skip_whitespace())&&_2ef!=_2a3){
type+=_2ef;
}
_2f2[0]=type||null;
}else{
if(_2ef==_294){
if((_2ef=_2ec.skip_whitespace())!=_295||_2ec.next()!=_295||_2ec.next()!=_295){
throw new SyntaxError(this.error_message("*** Argument list expected after ','."));
}
}else{
_2f0+=_2ef;
}
}
}
}
if(_2ef===_297){
_2ef=_2ec.skip_whitespace();
if(_2ef!==_299){
throw new SyntaxError(this.error_message("Invalid semi-colon in method declaration. "+"Semi-colons are allowed only to terminate the method signature, before the open brace."));
}
}
var _2f3=0,_2f4=_2f1.length;
_2ee.atoms[_2ee.atoms.length]="new objj_method(sel_getUid(\"";
_2ee.atoms[_2ee.atoms.length]=_2f0;
_2ee.atoms[_2ee.atoms.length]="\"), function";
this._currentSelector=_2f0;
if(this._flags&_2b0.Flags.IncludeDebugSymbols){
_2ee.atoms[_2ee.atoms.length]=" $"+this._currentClass+"__"+_2f0.replace(/:/g,"_");
}
_2ee.atoms[_2ee.atoms.length]="(self, _cmd";
for(;_2f3<_2f4;++_2f3){
_2ee.atoms[_2ee.atoms.length]=", ";
_2ee.atoms[_2ee.atoms.length]=_2f1[_2f3];
}
_2ee.atoms[_2ee.atoms.length]=")\n{ with(self)\n{";
_2ee.atoms[_2ee.atoms.length]=this.preprocess(_2ec,NULL,_29a,_299);
_2ee.atoms[_2ee.atoms.length]="}\n}";
if(this._flags&_2b0.Flags.IncludeDebugSymbols){
_2ee.atoms[_2ee.atoms.length]=","+JSON.stringify(_2f2);
}
_2ee.atoms[_2ee.atoms.length]=")";
this._currentSelector="";
return _2ee;
};
_2b0.prototype.preprocess=function(_2f5,_2f6,_2f7,_2f8,_2f9){
var _2fa=_2f6?_2f6:new _2ad(),_2fb=0,_2fc="";
if(_2f9){
_2f9[0]=_2fa;
var _2fd=false,_2fe=[0,0,0];
}
while((_2fc=_2f5.next())&&((_2fc!==_2f7)||_2fb)){
if(_2f9){
if(_2fc===_2a1){
++_2fe[2];
}else{
if(_2fc===_299){
++_2fe[0];
}else{
if(_2fc===_29a){
--_2fe[0];
}else{
if(_2fc===_2a2){
++_2fe[1];
}else{
if(_2fc===_2a3){
--_2fe[1];
}else{
if((_2fc===_293&&_2fe[2]--===0||(_2fd=(_2fc===_2a0)))&&_2fe[0]===0&&_2fe[1]===0){
_2f5.push();
var _2ff=_2fd?_2f5.skip_whitespace(true):_2f5.previous(),_300=_2a4.test(_2ff);
if(_300||_2a6.test(_2ff)&&_2a4.test(_2f5.previous())){
_2f5.push();
var last=_2f5.skip_whitespace(true),_301=true,_302=false;
if(last==="+"||last==="-"){
if(_2f5.previous()!==last){
_301=false;
}else{
last=_2f5.skip_whitespace(true);
_302=true;
}
}
_2f5.pop();
_2f5.pop();
if(_301&&((!_302&&(last===_29a))||last===_2a3||last===_2a0||last===_295||_2a5.test(last)||last.charAt(last.length-1)==="\""||last.charAt(last.length-1)==="'"||_2a6.test(last)&&!/^(new|return|case|var)$/.test(last))){
if(_300){
_2f9[1]=":";
}else{
_2f9[1]=_2ff;
if(!_2fd){
_2f9[1]+=":";
}
var _2fb=_2fa.atoms.length;
while(_2fa.atoms[_2fb--]!==_2ff){
}
_2fa.atoms.length=_2fb;
}
return !_2fd;
}
if(_2fd){
return NO;
}
}
_2f5.pop();
if(_2fd){
return NO;
}
}
}
}
}
}
}
_2fe[2]=MAX(_2fe[2],0);
}
if(_2f8){
if(_2fc===_2f8){
++_2fb;
}else{
if(_2fc===_2f7){
--_2fb;
}
}
}
if(_2fc===_283){
var _303="";
while((_2fc=_2f5.next())&&_2fc!==_2a2&&!(/^\w/).test(_2fc)){
_303+=_2fc;
}
if(_2fc===_2a2){
if(_2f8===_2a2){
++_2fb;
}
_2fa.atoms[_2fa.atoms.length]="function"+_303+"(";
if(_2f9){
++_2fe[1];
}
}else{
_2fa.atoms[_2fa.atoms.length]=_2fc+" = function";
}
}else{
if(_2fc==_29e){
this.directive(_2f5,_2fa);
}else{
if(_2fc==_29f){
this.hash(_2f5,_2fa);
}else{
if(_2fc==_29c){
this.brackets(_2f5,_2fa);
}else{
_2fa.atoms[_2fa.atoms.length]=_2fc;
}
}
}
}
}
if(_2f9){
throw new SyntaxError(this.error_message("*** Expected ']' - Unterminated message send or array."));
}
if(!_2f6){
return _2fa;
}
};
_2b0.prototype.selector=function(_304,_305){
var _306=_305?_305:new _2ad();
_306.atoms[_306.atoms.length]="sel_getUid(\"";
if(_304.skip_whitespace()!=_2a2){
throw new SyntaxError(this.error_message("*** Expected '('"));
}
var _307=_304.skip_whitespace();
if(_307==_2a3){
throw new SyntaxError(this.error_message("*** Unexpected ')', can't have empty @selector()"));
}
_305.atoms[_305.atoms.length]=_307;
var _308,_309=true;
while((_308=_304.next())&&_308!=_2a3){
if(_309&&/^\d+$/.test(_308)||!(/^(\w|$|\:)/.test(_308))){
if(!(/\S/).test(_308)){
if(_304.skip_whitespace()==_2a3){
break;
}else{
throw new SyntaxError(this.error_message("*** Unexpected whitespace in @selector()."));
}
}else{
throw new SyntaxError(this.error_message("*** Illegal character '"+_308+"' in @selector()."));
}
}
_306.atoms[_306.atoms.length]=_308;
_309=(_308==_293);
}
_306.atoms[_306.atoms.length]="\")";
if(!_305){
return _306;
}
};
_2b0.prototype.error_message=function(_30a){
return _30a+" <Context File: "+this._URL+(this._currentClass?" Class: "+this._currentClass:"")+(this._currentSelector?" Method: "+this._currentSelector:"")+">";
};
if(typeof _2!="undefined"&&!_2.acorn){
_2.acorn={};
_2.acorn.walk={};
}
(function(_30b){
"use strict";
_30b.version="0.1.01";
var _30c,_30d,_30e,_30f;
_30b.parse=function(inpt,opts){
_30d=String(inpt);
_30e=_30d.length;
_310(opts);
_311();
return _312(_30c.program);
};
var _313=_30b.defaultOptions={ecmaVersion:5,strictSemicolons:false,allowTrailingCommas:true,forbidReserved:false,trackComments:false,trackSpaces:false,locations:false,ranges:false,program:null,sourceFile:null,objj:true,preprocess:true,preprocessAddMacro:_314,preprocessGetMacro:_315,preprocessUndefineMacro:_316,preprocessIsMacro:_317};
function _310(opts){
_30c=opts||{};
for(var opt in _313){
if(!_30c.hasOwnProperty(opt)){
_30c[opt]=_313[opt];
}
}
_30f=_30c.sourceFile||null;
};
var _318;
var _319;
function _314(_31a){
_318[_31a.identifier]=_31a;
_319=null;
};
function _315(_31b){
return _318[_31b];
};
function _316(_31c){
delete _318[_31c];
_319=null;
};
function _317(_31d){
var x=Object.keys(_318).join(" ");
return (_319||(_319=_31e(x)))(_31d);
};
var _31f=_30b.getLineInfo=function(_320,_321){
for(var line=1,cur=0;;){
_322.lastIndex=cur;
var _323=_322.exec(_320);
if(_323&&_323.index<_321){
++line;
cur=_323.index+_323[0].length;
}else{
break;
}
}
return {line:line,column:_321-cur,lineStart:cur,lineEnd:(_323?_323.index+_323[0].length:_320.length)};
};
_30b.tokenize=function(inpt,opts){
_30d=String(inpt);
_30e=_30d.length;
_310(opts);
_311();
var t={};
function _324(_325){
_3ca(_325);
t.start=_32d;
t.end=_32e;
t.startLoc=_32f;
t.endLoc=_330;
t.type=_331;
t.value=_332;
return t;
};
_324.jumpTo=function(pos,_326){
_327=pos;
if(_30c.locations){
_328=_329=_322.lastIndex=0;
var _32a;
while((_32a=_322.exec(_30d))&&_32a.index<pos){
++_328;
_329=_32a.index+_32a[0].length;
}
}
var ch=_30d.charAt(pos-1);
_32b=_326;
_32c();
};
return _324;
};
var _327;
var _32d,_32e;
var _32f,_330;
var _331,_332;
var _333,_334,_335;
var _336,_337,_338;
var _32b,_339,_33a;
var _328,_329,_33b;
var _33c,_33d;
var _33e,_33f,_340;
var _341;
var _342;
var _343,_344,_345;
var _346,_347,_348,_349,_34a;
var _34b,_34c;
var _34d=[];
var _34e=false;
function _34f(pos,_350){
if(typeof pos=="number"){
pos=_31f(_30d,pos);
}
var _351=new SyntaxError(_350);
_351.line=pos.line;
_351.column=pos.column;
_351.lineStart=pos.lineStart;
_351.lineEnd=pos.lineEnd;
_351.fileName=_30f;
throw _351;
};
var _352={type:"num"},_353={type:"regexp"},_354={type:"string"};
var _355={type:"name"},_356={type:"eof"},_357={type:"eol"};
var _358={keyword:"break"},_359={keyword:"case",beforeExpr:true},_35a={keyword:"catch"};
var _35b={keyword:"continue"},_35c={keyword:"debugger"},_35d={keyword:"default"};
var _35e={keyword:"do",isLoop:true},_35f={keyword:"else",beforeExpr:true};
var _360={keyword:"finally"},_361={keyword:"for",isLoop:true},_362={keyword:"function"};
var _363={keyword:"if"},_364={keyword:"return",beforeExpr:true},_365={keyword:"switch"};
var _366={keyword:"throw",beforeExpr:true},_367={keyword:"try"},_368={keyword:"var"};
var _369={keyword:"while",isLoop:true},_36a={keyword:"with"},_36b={keyword:"new",beforeExpr:true};
var _36c={keyword:"this"};
var _36d={keyword:"void",prefix:true,beforeExpr:true};
var _36e={keyword:"null",atomValue:null},_36f={keyword:"true",atomValue:true};
var _370={keyword:"false",atomValue:false};
var _371={keyword:"in",binop:7,beforeExpr:true};
var _372={keyword:"implementation"},_373={keyword:"outlet"},_374={keyword:"accessors"};
var _375={keyword:"end"},_376={keyword:"import",afterImport:true};
var _377={keyword:"action"},_378={keyword:"selector"},_379={keyword:"class"},_37a={keyword:"global"};
var _37b={keyword:"{"},_37c={keyword:"["};
var _37d={keyword:"ref"},_37e={keyword:"deref"};
var _37f={keyword:"filename"},_380={keyword:"unsigned",okAsIdent:true},_381={keyword:"signed",okAsIdent:true};
var _382={keyword:"byte",okAsIdent:true},_383={keyword:"char",okAsIdent:true},_384={keyword:"short",okAsIdent:true};
var _385={keyword:"int",okAsIdent:true},_386={keyword:"long",okAsIdent:true},_387={keyword:"#"};
var _388={keyword:"define"};
var _389={keyword:"undef"};
var _38a={keyword:"ifdef"};
var _38b={keyword:"ifndef"};
var _38c={keyword:"if"};
var _38d={keyword:"else"};
var _38e={keyword:"endif"};
var _38f={keyword:"elif"};
var _390={keyword:"pragma"};
var _391={keyword:"defined"};
var _392={keyword:"\\"};
var _393={type:"preprocessParamItem"};
var _394={"break":_358,"case":_359,"catch":_35a,"continue":_35b,"debugger":_35c,"default":_35d,"do":_35e,"else":_35f,"finally":_360,"for":_361,"function":_362,"if":_363,"return":_364,"switch":_365,"throw":_366,"try":_367,"var":_368,"while":_369,"with":_36a,"null":_36e,"true":_36f,"false":_370,"new":_36b,"in":_371,"instanceof":{keyword:"instanceof",binop:7,beforeExpr:true},"this":_36c,"typeof":{keyword:"typeof",prefix:true,beforeExpr:true},"void":_36d,"delete":{keyword:"delete",prefix:true,beforeExpr:true}};
var _395={"IBAction":_377,"IBOutlet":_373,"unsigned":_380,"signed":_381,"byte":_382,"char":_383,"short":_384,"int":_385,"long":_386};
var _396={"implementation":_372,"outlet":_373,"accessors":_374,"end":_375,"import":_376,"action":_377,"selector":_378,"class":_379,"global":_37a,"ref":_37d,"deref":_37e};
var _397={"define":_388,"pragma":_390,"ifdef":_38a,"ifndef":_38b,"undef":_389,"if":_38c,"endif":_38e,"else":_38d,"elif":_38f,"defined":_391};
var _398={type:"[",beforeExpr:true},_399={type:"]"},_39a={type:"{",beforeExpr:true};
var _39b={type:"}"},_39c={type:"(",beforeExpr:true},_39d={type:")"};
var _39e={type:",",beforeExpr:true},_39f={type:";",beforeExpr:true};
var _3a0={type:":",beforeExpr:true},_3a1={type:"."},_3a2={type:"?",beforeExpr:true};
var _3a3={type:"@"},_3a4={type:"..."},_3a5={type:"#"};
var _3a6={binop:10,beforeExpr:true,preprocess:true},_3a7={isAssign:true,beforeExpr:true,preprocess:true};
var _3a8={isAssign:true,beforeExpr:true},_3a9={binop:9,prefix:true,beforeExpr:true,preprocess:true};
var _3aa={postfix:true,prefix:true,isUpdate:true},_3ab={prefix:true,beforeExpr:true};
var _3ac={binop:1,beforeExpr:true,preprocess:true},_3ad={binop:2,beforeExpr:true,preprocess:true};
var _3ae={binop:3,beforeExpr:true,preprocess:true},_3af={binop:4,beforeExpr:true,preprocess:true};
var _3b0={binop:5,beforeExpr:true,preprocess:true},_3b1={binop:6,beforeExpr:true,preprocess:true};
var _3b2={binop:7,beforeExpr:true,preprocess:true},_3b3={binop:8,beforeExpr:true,preprocess:true};
var _3b4={binop:10,beforeExpr:true,preprocess:true};
_30b.tokTypes={bracketL:_398,bracketR:_399,braceL:_39a,braceR:_39b,parenL:_39c,parenR:_39d,comma:_39e,semi:_39f,colon:_3a0,dot:_3a1,question:_3a2,slash:_3a6,eq:_3a7,name:_355,eof:_356,num:_352,regexp:_353,string:_354};
for(var kw in _394){
_30b.tokTypes[kw]=_394[kw];
}
function _31e(_3b5){
_3b5=_3b5.split(" ");
var f="",cats=[];
out:
for(var i=0;i<_3b5.length;++i){
for(var j=0;j<cats.length;++j){
if(cats[j][0].length==_3b5[i].length){
cats[j].push(_3b5[i]);
continue out;
}
}
cats.push([_3b5[i]]);
}
function _3b6(arr){
if(arr.length==1){
return f+="return str === "+JSON.stringify(arr[0])+";";
}
f+="switch(str){";
for(var i=0;i<arr.length;++i){
f+="case "+JSON.stringify(arr[i])+":";
}
f+="return true}return false;";
};
if(cats.length>3){
cats.sort(function(a,b){
return b.length-a.length;
});
f+="switch(str.length){";
for(var i=0;i<cats.length;++i){
var cat=cats[i];
f+="case "+cat[0].length+":";
_3b6(cat);
}
f+="}";
}else{
_3b6(_3b5);
}
return new Function("str",f);
};
_30b.makePredicate=_31e;
var _3b7=_31e("abstract boolean byte char class double enum export extends final float goto implements import int interface long native package private protected public short static super synchronized throws transient volatile");
var _3b8=_31e("class enum extends super const export import");
var _3b9=_31e("implements interface let package private protected public static yield");
var _3ba=_31e("eval arguments");
var _3bb=_31e("break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this");
var _3bc=_31e("IBAction IBOutlet byte char short int long unsigned signed");
var _3bd=_31e("define pragma if ifdef ifndef else elif endif defined");
var _3be=/[\u1680\u180e\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]/;
var _3bf=/[\u1680\u180e\u2000-\u200a\u202f\u205f\u3000\ufeff]/;
var _3c0="ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԧԱ-Ֆՙա-ևא-תװ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࢠࢢ-ࢬऄ-हऽॐक़-ॡॱ-ॷॹ-ॿঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-ళవ-హఽౘౙౠౡಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೞೠೡೱೲഅ-ഌഎ-ഐഒ-ഺഽൎൠൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄງຈຊຍດ-ທນ-ຟມ-ຣລວສຫອ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏼᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛮ-ᛰᜀ-ᜌᜎ-ᜑᜠ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡷᢀ-ᢨᢪᢰ-ᣵᤀ-ᤜᥐ-ᥭᥰ-ᥴᦀ-ᦫᧁ-ᧇᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭋᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᳩ-ᳬᳮ-ᳱᳵᳶᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕℙ-ℝℤΩℨK-ℭℯ-ℹℼ-ℿⅅ-ⅉⅎⅠ-ↈⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞⸯ々-〇〡-〩〱-〵〸-〼ぁ-ゖゝ-ゟァ-ヺー-ヿㄅ-ㄭㄱ-ㆎㆠ-ㆺㇰ-ㇿ㐀-䶵一-鿌ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚗꚠ-ꛯꜗ-ꜟꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꪀ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꯀ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ";
var _3c1="ͱ-ʹ҃-֑҇-ׇֽֿׁׂׅׄؐ-ؚؠ-ىٲ-ۓۧ-ۨۻ-ۼܰ-݊ࠀ-ࠔࠛ-ࠣࠥ-ࠧࠩ-࠭ࡀ-ࡗࣤ-ࣾऀ-ःऺ-़ा-ॏ॑-ॗॢ-ॣ०-९ঁ-ঃ়া-ৄেৈৗয়-ৠਁ-ਃ਼ਾ-ੂੇੈੋ-੍ੑ੦-ੱੵઁ-ઃ઼ા-ૅે-ૉો-્ૢ-ૣ૦-૯ଁ-ଃ଼ା-ୄେୈୋ-୍ୖୗୟ-ୠ୦-୯ஂா-ூெ-ைொ-்ௗ௦-௯ఁ-ఃె-ైొ-్ౕౖౢ-ౣ౦-౯ಂಃ಼ಾ-ೄೆ-ೈೊ-್ೕೖೢ-ೣ೦-೯ംഃെ-ൈൗൢ-ൣ൦-൯ංඃ්ා-ුූෘ-ෟෲෳิ-ฺเ-ๅ๐-๙ິ-ູ່-ໍ໐-໙༘༙༠-༩༹༵༷ཁ-ཇཱ-྄྆-྇ྍ-ྗྙ-ྼ࿆က-ဩ၀-၉ၧ-ၭၱ-ၴႂ-ႍႏ-ႝ፝-፟ᜎ-ᜐᜠ-ᜰᝀ-ᝐᝲᝳក-ឲ៝០-៩᠋-᠍᠐-᠙ᤠ-ᤫᤰ-᤻ᥑ-ᥭᦰ-ᧀᧈ-ᧉ᧐-᧙ᨀ-ᨕᨠ-ᩓ᩠-᩿᩼-᪉᪐-᪙ᭆ-ᭋ᭐-᭙᭫-᭳᮰-᮹᯦-᯳ᰀ-ᰢ᱀-᱉ᱛ-ᱽ᳐-᳒ᴀ-ᶾḁ-ἕ‌‍‿⁀⁔⃐-⃥⃜⃡-⃰ⶁ-ⶖⷠ-ⷿ〡-〨゙゚Ꙁ-ꙭꙴ-꙽ꚟ꛰-꛱ꟸ-ꠀ꠆ꠋꠣ-ꠧꢀ-ꢁꢴ-꣄꣐-꣙ꣳ-ꣷ꤀-꤉ꤦ-꤭ꤰ-ꥅꦀ-ꦃ꦳-꧀ꨀ-ꨧꩀ-ꩁꩌ-ꩍ꩐-꩙ꩻꫠ-ꫩꫲ-ꫳꯀ-ꯡ꯬꯭꯰-꯹ﬠ-ﬨ︀-️︠-︦︳︴﹍-﹏０-９＿";
var _3c2=new RegExp("["+_3c0+"]");
var _3c3=new RegExp("["+_3c0+_3c1+"]");
var _3c4=/[\n\r\u2028\u2029]/;
var _322=/\r\n|[\n\r\u2028\u2029]/g;
function _3c5(code){
if(code<65){
return code===36;
}
if(code<91){
return true;
}
if(code<97){
return code===95;
}
if(code<123){
return true;
}
return code>=170&&_3c2.test(String.fromCharCode(code));
};
function _3c6(code){
if(code<48){
return code===36;
}
if(code<58){
return true;
}
if(code<65){
return false;
}
if(code<91){
return true;
}
if(code<97){
return code===95;
}
if(code<123){
return true;
}
return code>=170&&_3c3.test(String.fromCharCode(code));
};
function _3c7(){
this.line=_328;
this.column=_327-_329;
};
function _311(){
_318=Object.create(null);
_328=1;
_327=_329=0;
_32b=true;
_339=null;
_33a=null;
_32c();
};
var _3c8=[_38c,_38a,_38b,_38d,_38f,_38e];
function _3c9(type,val){
if(type in _3c8){
return _3ca();
}
_32e=_327;
if(_30c.locations){
_330=new _3c7;
}
_331=type;
_32c();
if(_30c.preprocess&&_30d.charCodeAt(_327)===35&&_30d.charCodeAt(_327+1)===35){
var val1=type===_355?val:type.keyword;
_327+=2;
if(val1){
_32c();
_3ca();
var val2=_331===_355?_332:_331.keyword;
if(val2){
var _3cb=""+val1+val2,code=_3cb.charCodeAt(0),tok;
if(_3c5(code)){
tok=_3cc(_3cb)!==false;
}
if(tok){
return tok;
}
tok=_3cd(code,_3c9);
if(tok===false){
_3ce();
}
return tok;
}else{
}
}
}
_332=val;
_335=_334;
_338=_337;
_334=_339;
_337=_33a;
_32b=type.beforeExpr;
_341=type.afterImport;
};
function _3cf(){
var _3d0=_30c.onComment&&_30c.locations&&new _3c7;
var _3d1=_327,end=_30d.indexOf("*/",_327+=2);
if(end===-1){
_34f(_327-2,"Unterminated comment");
}
_327=end+2;
if(_30c.locations){
_322.lastIndex=_3d1;
var _3d2;
while((_3d2=_322.exec(_30d))&&_3d2.index<_327){
++_328;
_329=_3d2.index+_3d2[0].length;
}
}
if(_30c.onComment){
_30c.onComment(true,_30d.slice(_3d1+2,end),_3d1,_327,_3d0,_30c.locations&&new _3c7);
}
if(_30c.trackComments){
(_339||(_339=[])).push(_30d.slice(_3d1,end));
}
};
function _3d3(){
var _3d4=_327;
var _3d5=_30c.onComment&&_30c.locations&&new _3c7;
var ch=_30d.charCodeAt(_327+=2);
while(_327<_30e&&ch!==10&&ch!==13&&ch!==8232&&ch!==8329){
++_327;
ch=_30d.charCodeAt(_327);
}
if(_30c.onComment){
_30c.onComment(false,_30d.slice(_3d4+2,_327),_3d4,_327,_3d5,_30c.locations&&new _3c7);
}
if(_30c.trackComments){
(_339||(_339=[])).push(_30d.slice(_3d4,_327));
}
};
function _3d6(){
var ch=_30d.charCodeAt(_327);
var last;
while(_327<_30e&&((ch!==10&&ch!==13&&ch!==8232&&ch!==8329)||last===92)){
if(ch!=32&&ch!=9&&ch!=160&&(ch<5760||!_3bf.test(String.fromCharCode(ch)))){
last=ch;
}
ch=_30d.charCodeAt(++_327);
}
};
function _32c(){
_339=null;
_33a=null;
var _3d7=_327;
for(;;){
var ch=_30d.charCodeAt(_327);
if(ch===32){
++_327;
}else{
if(ch===13){
++_327;
var next=_30d.charCodeAt(_327);
if(next===10){
++_327;
}
if(_30c.locations){
++_328;
_329=_327;
}
}else{
if(ch===10){
++_327;
++_328;
_329=_327;
}else{
if(ch<14&&ch>8){
++_327;
}else{
if(ch===47){
var next=_30d.charCodeAt(_327+1);
if(next===42){
if(_30c.trackSpaces){
(_33a||(_33a=[])).push(_30d.slice(_3d7,_327));
}
_3cf();
_3d7=_327;
}else{
if(next===47){
if(_30c.trackSpaces){
(_33a||(_33a=[])).push(_30d.slice(_3d7,_327));
}
_3d3();
_3d7=_327;
}else{
break;
}
}
}else{
if(ch===160){
++_327;
}else{
if(ch>=5760&&_3be.test(String.fromCharCode(ch))){
++_327;
}else{
if(_327>=_30e){
if(_30c.preprocess&&_34d.length){
var _3d8=_34d.pop();
_327=_3d8.end;
_30d=_3d8.input;
_30e=_3d8.inputLen;
_33f=_3d8.lastEnd;
_33e=_3d8.lastStart;
}else{
break;
}
}else{
break;
}
}
}
}
}
}
}
}
}
};
function _3d9(code,_3da){
var next=_30d.charCodeAt(_327+1);
if(next>=48&&next<=57){
return _3db(String.fromCharCode(code),_3da);
}
if(next===46&&_30c.objj&&_30d.charCodeAt(_327+2)===46){
_327+=3;
return _3da(_3a4);
}
++_327;
return _3da(_3a1);
};
function _3dc(_3dd){
var next=_30d.charCodeAt(_327+1);
if(_32b){
++_327;
return _3de();
}
if(next===61){
return _3df(_3a8,2,_3dd);
}
return _3df(_3a6,1,_3dd);
};
function _3e0(_3e1){
var next=_30d.charCodeAt(_327+1);
if(next===61){
return _3df(_3a8,2,_3e1);
}
return _3df(_3b4,1,_3e1);
};
function _3e2(code,_3e3){
var next=_30d.charCodeAt(_327+1);
if(next===code){
return _3df(code===124?_3ac:_3ad,2,_3e3);
}
if(next===61){
return _3df(_3a8,2,_3e3);
}
return _3df(code===124?_3ae:_3b0,1,_3e3);
};
function _3e4(_3e5){
var next=_30d.charCodeAt(_327+1);
if(next===61){
return _3df(_3a8,2,_3e5);
}
return _3df(_3af,1,_3e5);
};
function _3e6(code,_3e7){
var next=_30d.charCodeAt(_327+1);
if(next===code){
return _3df(_3aa,2,_3e7);
}
if(next===61){
return _3df(_3a8,2,_3e7);
}
return _3df(_3a9,1,_3e7);
};
function _3e8(code,_3e9){
if(_341&&_30c.objj&&code===60){
var str=[];
for(;;){
if(_327>=_30e){
_34f(_32d,"Unterminated import statement");
}
var ch=_30d.charCodeAt(++_327);
if(ch===62){
++_327;
return _3e9(_37f,String.fromCharCode.apply(null,str));
}
str.push(ch);
}
}
var next=_30d.charCodeAt(_327+1);
var size=1;
if(next===code){
size=code===62&&_30d.charCodeAt(_327+2)===62?3:2;
if(_30d.charCodeAt(_327+size)===61){
return _3df(_3a8,size+1,_3e9);
}
return _3df(_3b3,size,_3e9);
}
if(next===61){
size=_30d.charCodeAt(_327+2)===61?3:2;
}
return _3df(_3b2,size,_3e9);
};
function _3ea(code,_3eb){
var next=_30d.charCodeAt(_327+1);
if(next===61){
return _3df(_3b1,_30d.charCodeAt(_327+2)===61?3:2,_3eb);
}
return _3df(code===61?_3a7:_3ab,1,_3eb);
};
function _3ec(code,_3ed){
var next=_30d.charCodeAt(++_327);
if(next===34||next===39){
return _3ee(next,_3ed);
}
if(next===123){
return _3ed(_37b);
}
if(next===91){
return _3ed(_37c);
}
var word=_3ef(),_3f0=_396[word];
if(!_3f0){
_34f(_327,"Unrecognized Objective-J keyword '@"+word+"'");
}
return _3ed(_3f0);
};
var _3f1=true;
var _3f2=0;
function _3f3(_3f4){
++_327;
_3f5();
switch(_347){
case _388:
_3f5();
var _3f6=_34a;
var _3f7=_3f8();
if(_30d.charCodeAt(_3f6)===40){
_3f9(_39c);
var _3fa=[];
var _3fb=true;
while(!_3fc(_39d)){
if(!_3fb){
_3f9(_39e,"Expected ',' between macro parameters");
}else{
_3fb=false;
}
_3fa.push(_3f8());
}
}
var _3fd=_327=_349;
_3d6();
var _3fe=_30d.slice(_3fd,_327);
_3fe=_3fe.replace(/\\/g," ");
_30c.preprocessAddMacro(new _3ff(_3f7,_3fe,_3fa));
break;
case _389:
_3f5();
_30c.preprocessUndefineMacro(_3f8());
_3d6();
break;
case _38c:
if(_3f1){
_3f2++;
_3f5();
var expr=_400();
var test=_401(expr);
if(!test){
_3f1=false;
}
_402(!test);
}else{
return _3f4(_38c);
}
break;
case _38a:
if(_3f1){
_3f2++;
_3f5();
var _403=_3f8();
var test=_30c.preprocessGetMacro(_403);
if(!test){
_3f1=false;
}
_402(!test);
}else{
return _3f4(_38a);
}
break;
case _38b:
if(_3f1){
_3f2++;
_3f5();
var _403=_3f8();
var test=_30c.preprocessGetMacro(_403);
if(test){
_3f1=false;
}
_402(test);
}else{
return _3f4(_38b);
}
break;
case _38d:
if(_3f2){
if(_3f1){
_3f1=false;
_3f4(_38d);
_3f5();
_402(true,true);
}else{
return _3f4(_38d);
}
}else{
_34f(_349,"#else without #if");
}
break;
case _38e:
if(_3f2){
if(_3f1){
_3f2--;
break;
}
}else{
_34f(_349,"#endif without #if");
}
return _3f4(_38e);
break;
case _390:
_3d6();
break;
case _3ab:
_3d6();
break;
default:
_34f(_349,"Invalid preprocessing directive");
_3d6();
return _3f4(_387);
}
_3c9(_387);
return _3ca();
};
function _401(expr){
return _30b.walk.recursive(expr,{},{BinaryExpression:function(node,st,c){
var left=node.left,_404=node.right;
switch(node.operator){
case "+":
return c(left,st)+c(_404,st);
case "-":
return c(left,st)-c(_404,st);
case "*":
return c(left,st)*c(_404,st);
case "/":
return c(left,st)/c(_404,st);
case "%":
return c(left,st)%c(_404,st);
case "<":
return c(left,st)<c(_404,st);
case ">":
return c(left,st)>c(_404,st);
case "=":
case "==":
case "===":
return c(left,st)===c(_404,st);
case "<=":
return c(left,st)<=c(_404,st);
case ">=":
return c(left,st)>=c(_404,st);
case "&&":
return c(left,st)&&c(_404,st);
case "||":
return c(left,st)||c(_404,st);
}
},Literal:function(node,st,c){
return node.value;
},Identifier:function(node,st,c){
var name=node.name,_405=_30c.preprocessGetMacro(name);
return (_405&&parseInt(_405.macro))||0;
},DefinedExpression:function(node,st,c){
return !!_30c.preprocessGetMacro(node.id.name);
}},{});
};
function _3cd(code,_406,_407){
switch(code){
case 46:
return _3d9(code,_406);
case 40:
++_327;
return _406(_39c);
case 41:
++_327;
return _406(_39d);
case 59:
++_327;
return _406(_39f);
case 44:
++_327;
return _406(_39e);
case 91:
++_327;
return _406(_398);
case 93:
++_327;
return _406(_399);
case 123:
++_327;
return _406(_39a);
case 125:
++_327;
return _406(_39b);
case 58:
++_327;
return _406(_3a0);
case 63:
++_327;
return _406(_3a2);
case 48:
var next=_30d.charCodeAt(_327+1);
if(next===120||next===88){
return _408(_406);
}
case 49:
case 50:
case 51:
case 52:
case 53:
case 54:
case 55:
case 56:
case 57:
return _3db(false,_406);
case 34:
case 39:
return _3ee(code,_406);
case 47:
return _3dc(_406);
case 37:
case 42:
return _3e0(_406);
case 124:
case 38:
return _3e2(code,_406);
case 94:
return _3e4(_406);
case 43:
case 45:
return _3e6(code,_406);
case 60:
case 62:
return _3e8(code,_406,_406);
case 61:
case 33:
return _3ea(code,_406);
case 126:
return _3df(_3ab,1,_406);
case 64:
if(_30c.objj){
return _3ec(code,_406);
}
return false;
case 35:
if(_30c.preprocess){
return _3f3(_406);
}
return false;
case 92:
if(_30c.preprocess){
return _3df(_392,1,_406);
}
return false;
}
if(_407&&_3c4.test(String.fromCharCode(code))){
return _3df(_357,1,_406);
}
return false;
};
function _409(){
while(_327<_30e){
var ch=_30d.charCodeAt(_327);
if(ch===32||ch===9||ch===160||(ch>=5760&&_3bf.test(String.fromCharCode(ch)))){
++_327;
}else{
if(ch===92){
var pos=_327+1;
ch=_30d.charCodeAt(pos);
while(pos<_30e&&(ch===32||ch===9||ch===11||ch===12||(ch>=5760&&_3bf.test(String.fromCharCode(ch))))){
ch=_30d.charCodeAt(++pos);
}
_322.lastIndex=0;
var _40a=_322.exec(_30d.slice(pos,pos+2));
if(_40a&&_40a.index===0){
_327=pos+_40a[0].length;
}else{
return false;
}
}else{
_322.lastIndex=0;
var _40a=_322.exec(_30d.slice(_327,_327+2));
return _40a&&_40a.index===0;
}
}
}
};
function _402(test,_40b){
if(test){
var _40c=0;
while(_40c>0||(_347!=_38e&&(_347!=_38d||_40b))){
switch(_347){
case _38c:
case _38a:
case _38b:
_40c++;
break;
case _38e:
_40c--;
break;
case _356:
_3f1=true;
_34f(_349,"Missing #endif");
}
_3f5();
}
_3f1=true;
if(_347===_38e){
_3f2--;
}
}
};
function _3f5(){
_349=_327;
_33d=_30d;
if(_327>=_30e){
return _356;
}
var code=_30d.charCodeAt(_327);
if(_34e&&code!==41&&code!==44){
var _40d=0;
while(_327<_30e&&(_40d||(code!==41&&code!==44))){
if(code===40){
_40d++;
}
if(code===41){
_40d--;
}
code=_30d.charCodeAt(++_327);
}
return _40e(_393,_30d.slice(_349,_327));
}
if(_3c5(code)||(code===92&&_30d.charCodeAt(_327+1)===117)){
return _40f();
}
if(_3cd(code,_40e,true)===false){
var ch=String.fromCharCode(code);
if(ch==="\\"||_3c2.test(ch)){
return _40f();
}
_34f(_327,"Unexpected character '"+ch+"'");
}
};
function _40f(){
var word=_3ef();
_40e(_3bd(word)?_397[word]:_355,word);
};
function _40e(type,val){
_347=type;
_348=val;
_34a=_327;
_409();
};
function _410(){
_34b=_32d;
_34c=_32e;
return _3f5();
};
function _3fc(type){
if(_347===type){
_410();
return true;
}
};
function _3f9(type,_411){
if(_347===type){
_3f5();
}else{
_34f(_349,_411||"Unexpected token");
}
};
function _3f8(){
var _412=_347===_355?_348:((!_30c.forbidReserved||_347.okAsIdent)&&_347.keyword)||_34f(_349,"Expected Macro identifier");
_410();
return _412;
};
function _413(){
var node=_414();
node.name=_3f8();
return _415(node,"Identifier");
};
function _400(){
return _416();
};
function _416(){
return _417(_418(),-1);
};
function _417(left,_419){
var prec=_347.binop;
if(prec){
if(!_347.preprocess){
_34f(_349,"Unsupported macro operator");
}
if(prec>_419){
var node=_41a(left);
node.left=left;
node.operator=_348;
_410();
node.right=_417(_418(),prec);
var node=_415(node,"BinaryExpression");
return _417(node,_419);
}
}
return left;
};
function _418(){
if(_347.preprocess&&_347.prefix){
var node=_414();
node.operator=_332;
node.prefix=true;
_410();
node.argument=_418();
return _415(node,"UnaryExpression");
}
return _41b();
};
function _41b(){
switch(_347){
case _355:
return _413();
case _352:
case _354:
return _41c();
case _39c:
var _41d=_349;
_410();
var val=_400();
val.start=_41d;
val.end=_34a;
_3f9(_39d,"Expected closing ')' in macro expression");
return val;
case _391:
var node=_414();
_410();
node.id=_413();
return _415(node,"DefinedExpression");
default:
_3ce();
}
};
function _41c(){
var node=_414();
node.value=_348;
node.raw=_33d.slice(_349,_34a);
_410();
return _415(node,"Literal");
};
function _415(node,type){
node.type=type;
node.end=_34c;
return node;
};
function _3ca(_41e){
_32d=_327;
_33c=_30d;
if(_30c.locations){
_32f=new _3c7;
}
_333=_339;
_336=_33a;
if(_41e){
return _3de();
}
if(_327>=_30e){
return _3c9(_356);
}
var code=_30d.charCodeAt(_327);
if(_3c5(code)||code===92){
return _3cc();
}
var tok=_3cd(code,_3c9);
if(tok===false){
var ch=String.fromCharCode(code);
if(ch==="\\"||_3c2.test(ch)){
return _3cc();
}
_34f(_327,"Unexpected character '"+ch+"'");
}
return tok;
};
function _3df(type,size,_41f){
var str=_30d.slice(_327,_327+size);
_327+=size;
_41f(type,str);
};
function _3de(){
var _420="",_421,_422,_423=_327;
for(;;){
if(_327>=_30e){
_34f(_423,"Unterminated regular expression");
}
var ch=_30d.charAt(_327);
if(_3c4.test(ch)){
_34f(_423,"Unterminated regular expression");
}
if(!_421){
if(ch==="["){
_422=true;
}else{
if(ch==="]"&&_422){
_422=false;
}else{
if(ch==="/"&&!_422){
break;
}
}
}
_421=ch==="\\";
}else{
_421=false;
}
++_327;
}
var _420=_30d.slice(_423,_327);
++_327;
var mods=_3ef();
if(mods&&!/^[gmsiy]*$/.test(mods)){
_34f(_423,"Invalid regexp flag");
}
return _3c9(_353,new RegExp(_420,mods));
};
function _424(_425,len){
var _426=_327,_427=0;
for(var i=0,e=len==null?Infinity:len;i<e;++i){
var code=_30d.charCodeAt(_327),val;
if(code>=97){
val=code-97+10;
}else{
if(code>=65){
val=code-65+10;
}else{
if(code>=48&&code<=57){
val=code-48;
}else{
val=Infinity;
}
}
}
if(val>=_425){
break;
}
++_327;
_427=_427*_425+val;
}
if(_327===_426||len!=null&&_327-_426!==len){
return null;
}
return _427;
};
function _408(_428){
_327+=2;
var val=_424(16);
if(val==null){
_34f(_32d+2,"Expected hexadecimal number");
}
if(_3c5(_30d.charCodeAt(_327))){
_34f(_327,"Identifier directly after number");
}
return _428(_352,val);
};
function _3db(_429,_42a){
var _42b=_327,_42c=false,_42d=_30d.charCodeAt(_327)===48;
if(!_429&&_424(10)===null){
_34f(_42b,"Invalid number");
}
if(_30d.charCodeAt(_327)===46){
++_327;
_424(10);
_42c=true;
}
var next=_30d.charCodeAt(_327);
if(next===69||next===101){
next=_30d.charCodeAt(++_327);
if(next===43||next===45){
++_327;
}
if(_424(10)===null){
_34f(_42b,"Invalid number");
}
_42c=true;
}
if(_3c5(_30d.charCodeAt(_327))){
_34f(_327,"Identifier directly after number");
}
var str=_30d.slice(_42b,_327),val;
if(_42c){
val=parseFloat(str);
}else{
if(!_42d||str.length===1){
val=parseInt(str,10);
}else{
if(/[89]/.test(str)||_345){
_34f(_42b,"Invalid number");
}else{
val=parseInt(str,8);
}
}
}
return _42a(_352,val);
};
var _42e=[];
function _3ee(_42f,_430){
_327++;
_42e.length=0;
for(;;){
if(_327>=_30e){
_34f(_32d,"Unterminated string constant");
}
var ch=_30d.charCodeAt(_327);
if(ch===_42f){
++_327;
return _430(_354,String.fromCharCode.apply(null,_42e));
}
if(ch===92){
ch=_30d.charCodeAt(++_327);
var _431=/^[0-7]+/.exec(_30d.slice(_327,_327+3));
if(_431){
_431=_431[0];
}
while(_431&&parseInt(_431,8)>255){
_431=_431.slice(0,_431.length-1);
}
if(_431==="0"){
_431=null;
}
++_327;
if(_431){
if(_345){
_34f(_327-2,"Octal literal in strict mode");
}
_42e.push(parseInt(_431,8));
_327+=_431.length-1;
}else{
switch(ch){
case 110:
_42e.push(10);
break;
case 114:
_42e.push(13);
break;
case 120:
_42e.push(_432(2));
break;
case 117:
_42e.push(_432(4));
break;
case 85:
_42e.push(_432(8));
break;
case 116:
_42e.push(9);
break;
case 98:
_42e.push(8);
break;
case 118:
_42e.push(11);
break;
case 102:
_42e.push(12);
break;
case 48:
_42e.push(0);
break;
case 13:
if(_30d.charCodeAt(_327)===10){
++_327;
}
case 10:
if(_30c.locations){
_329=_327;
++_328;
}
break;
default:
_42e.push(ch);
break;
}
}
}else{
if(ch===13||ch===10||ch===8232||ch===8329){
_34f(_32d,"Unterminated string constant");
}
_42e.push(ch);
++_327;
}
}
};
function _432(len){
var n=_424(16,len);
if(n===null){
_34f(_32d,"Bad character escape sequence");
}
return n;
};
var _433;
function _3ef(){
_433=false;
var word,_434=true,_435=_327;
for(;;){
var ch=_30d.charCodeAt(_327);
if(_3c6(ch)){
if(_433){
word+=_30d.charAt(_327);
}
++_327;
}else{
if(ch===92){
if(!_433){
word=_30d.slice(_435,_327);
}
_433=true;
if(_30d.charCodeAt(++_327)!=117){
_34f(_327,"Expecting Unicode escape sequence \\uXXXX");
}
++_327;
var esc=_432(4);
var _436=String.fromCharCode(esc);
if(!_436){
_34f(_327-1,"Invalid Unicode escape");
}
if(!(_434?_3c5(esc):_3c6(esc))){
_34f(_327-4,"Invalid Unicode escape");
}
word+=_436;
}else{
break;
}
}
_434=false;
}
return _433?word:_30d.slice(_435,_327);
};
function _3cc(_437){
var word=_437||_3ef();
var type=_355;
var _438;
if(_30c.preprocess){
var _439;
var i=_34d.length;
if(i>0){
var _43a=_34d[i-1];
if(_43a.parameterDict&&_43a.macro.isParameterFunction()(word)){
_439=_43a.parameterDict[word];
}
}
if(!_439&&_30c.preprocessIsMacro(word)){
_439=_30c.preprocessGetMacro(word);
}
if(_439){
var _43b=_32d;
var _43c;
var _43d=_439.parameters;
var _43e;
if(_43d){
_43e=_327<_30e&&_30d.charCodeAt(_327)===40;
}
if(!_43d||_43e){
var _43f=_439.macro;
var _440=_327;
if(_43e){
var _441=true;
var _442=0;
_43c=Object.create(null);
_3f5();
_34e=true;
_3f9(_39c);
_440=_327;
while(!_3fc(_39d)){
if(!_441){
_3f9(_39e,"Expected ',' between macro parameters");
}else{
_441=false;
}
var _443=_43d[_442++];
var val=_348;
_3f9(_393);
_43c[_443]=new _3ff(_443,val);
_440=_327;
}
_34e=false;
}
if(_43f){
_34d.push({macro:_439,parameterDict:_43c,start:_43b,end:_440,input:_30d,inputLen:_30e,lastStart:_32d,lastEnd:_440});
_30d=_43f;
_30e=_43f.length;
_327=0;
}
return next();
}
}
}
if(!_433){
if(_3bb(word)){
type=_394[word];
}else{
if(_30c.objj&&_3bc(word)){
type=_395[word];
}else{
if(_30c.forbidReserved&&(_30c.ecmaVersion===3?_3b7:_3b8)(word)||_345&&_3b9(word)){
_34f(_32d,"The keyword '"+word+"' is reserved");
}
}
}
}
return _3c9(type,word);
};
function _3ff(_444,_445,_446){
this.identifier=_444;
if(_445){
this.macro=_445;
}
if(_446){
this.parameters=_446;
}
};
_3ff.prototype.isParameterFunction=function(){
var y=(this.parameters||[]).join(" ");
return this.isParameterFunctionVar||(this.isParameterFunctionVar=_31e(y));
};
function next(){
_33e=_32d;
_33f=_32e;
_340=_330;
_342=null;
return _3ca();
};
function _447(_448){
_345=_448;
_327=_33f;
_32c();
_3ca();
};
function _449(){
this.type=null;
this.start=_32d;
this.end=null;
};
function _44a(){
this.start=_32f;
this.end=null;
if(_30f!==null){
this.source=_30f;
}
};
function _414(){
var node=new _449();
if(_30c.trackComments&&_333){
node.commentsBefore=_333;
_333=null;
}
if(_30c.trackSpaces&&_336){
node.spacesBefore=_336;
_336=null;
}
if(_30c.locations){
node.loc=new _44a();
}
if(_30c.ranges){
node.range=[_32d,0];
}
return node;
};
function _41a(_44b){
var node=new _449();
node.start=_44b.start;
if(_44b.commentsBefore){
node.commentsBefore=_44b.commentsBefore;
delete _44b.commentsBefore;
}
if(_44b.spacesBefore){
node.spacesBefore=_44b.spacesBefore;
delete _44b.spacesBefore;
}
if(_30c.locations){
node.loc=new _44a();
node.loc.start=_44b.loc.start;
}
if(_30c.ranges){
node.range=[_44b.range[0],0];
}
return node;
};
var _44c;
function _44d(node,type){
node.type=type;
node.end=_33f;
if(_30c.trackComments){
if(_335){
node.commentsAfter=_335;
_334=null;
}else{
if(_44c&&_44c.end===_33f&&_44c.commentsAfter){
node.commentsAfter=_44c.commentsAfter;
delete _44c.commentsAfter;
}
}
if(!_30c.trackSpaces){
_44c=node;
}
}
if(_30c.trackSpaces){
if(_338){
node.spacesAfter=_338;
_338=null;
}else{
if(_44c&&_44c.end===_33f&&_44c.spacesAfter){
node.spacesAfter=_44c.spacesAfter;
delete _44c.spacesAfter;
}
}
_44c=node;
}
if(_30c.locations){
node.loc.end=_340;
}
if(_30c.ranges){
node.range[1]=_33f;
}
return node;
};
function _44e(stmt){
return _30c.ecmaVersion>=5&&stmt.type==="ExpressionStatement"&&stmt.expression.type==="Literal"&&stmt.expression.value==="use strict";
};
function eat(type){
if(_331===type){
next();
return true;
}
};
function _44f(){
return !_30c.strictSemicolons&&(_331===_356||_331===_39b||_3c4.test(_33c.slice(_33f,_32d))||(_342&&_30c.objj));
};
function _450(){
if(!eat(_39f)&&!_44f()){
_34f(_32d,"Expected a semicolon");
}
};
function _451(type,_452){
if(_331===type){
next();
}else{
_452?_34f(_32d,_452):_3ce();
}
};
function _3ce(){
_34f(_32d,"Unexpected token");
};
function _453(expr){
if(expr.type!=="Identifier"&&expr.type!=="MemberExpression"&&expr.type!=="Dereference"){
_34f(expr.start,"Assigning to rvalue");
}
if(_345&&expr.type==="Identifier"&&_3ba(expr.name)){
_34f(expr.start,"Assigning to "+expr.name+" in strict mode");
}
};
function _312(_454){
_33e=_33f=_327;
if(_30c.locations){
_340=new _3c7;
}
_343=_345=null;
_344=[];
_3ca();
var node=_454||_414(),_455=true;
if(!_454){
node.body=[];
}
while(_331!==_356){
var stmt=_456();
node.body.push(stmt);
if(_455&&_44e(stmt)){
_447(true);
}
_455=false;
}
return _44d(node,"Program");
};
var _457={kind:"loop"},_458={kind:"switch"};
function _456(){
if(_331===_3a6){
_3ca(true);
}
var _459=_331,node=_414();
if(_342){
node.expression=_45a(_342,_342.object);
_450();
return _44d(node,"ExpressionStatement");
}
switch(_459){
case _358:
case _35b:
next();
var _45b=_459===_358;
if(eat(_39f)||_44f()){
node.label=null;
}else{
if(_331!==_355){
_3ce();
}else{
node.label=_45c();
_450();
}
}
for(var i=0;i<_344.length;++i){
var lab=_344[i];
if(node.label==null||lab.name===node.label.name){
if(lab.kind!=null&&(_45b||lab.kind==="loop")){
break;
}
if(node.label&&_45b){
break;
}
}
}
if(i===_344.length){
_34f(node.start,"Unsyntactic "+_459.keyword);
}
return _44d(node,_45b?"BreakStatement":"ContinueStatement");
case _35c:
next();
_450();
return _44d(node,"DebuggerStatement");
case _35e:
next();
_344.push(_457);
node.body=_456();
_344.pop();
_451(_369,"Expected 'while' at end of do statement");
node.test=_45d();
_450();
return _44d(node,"DoWhileStatement");
case _361:
next();
_344.push(_457);
_451(_39c,"Expected '(' after 'for'");
if(_331===_39f){
return _45e(node,null);
}
if(_331===_368){
var init=_414();
next();
_45f(init,true);
if(init.declarations.length===1&&eat(_371)){
return _460(node,init);
}
return _45e(node,init);
}
var init=_461(false,true);
if(eat(_371)){
_453(init);
return _460(node,init);
}
return _45e(node,init);
case _362:
next();
return _462(node,true);
case _363:
next();
node.test=_45d();
node.consequent=_456();
node.alternate=eat(_35f)?_456():null;
return _44d(node,"IfStatement");
case _364:
if(!_343){
_34f(_32d,"'return' outside of function");
}
next();
if(eat(_39f)||_44f()){
node.argument=null;
}else{
node.argument=_461();
_450();
}
return _44d(node,"ReturnStatement");
case _365:
next();
node.discriminant=_45d();
node.cases=[];
_451(_39a,"Expected '{' in switch statement");
_344.push(_458);
for(var cur,_463;_331!=_39b;){
if(_331===_359||_331===_35d){
var _464=_331===_359;
if(cur){
_44d(cur,"SwitchCase");
}
node.cases.push(cur=_414());
cur.consequent=[];
next();
if(_464){
cur.test=_461();
}else{
if(_463){
_34f(_33e,"Multiple default clauses");
}
_463=true;
cur.test=null;
}
_451(_3a0,"Expected ':' after case clause");
}else{
if(!cur){
_3ce();
}
cur.consequent.push(_456());
}
}
if(cur){
_44d(cur,"SwitchCase");
}
next();
_344.pop();
return _44d(node,"SwitchStatement");
case _366:
next();
if(_3c4.test(_33c.slice(_33f,_32d))){
_34f(_33f,"Illegal newline after throw");
}
node.argument=_461();
_450();
return _44d(node,"ThrowStatement");
case _367:
next();
node.block=_465();
node.handlers=[];
while(_331===_35a){
var _466=_414();
next();
_451(_39c,"Expected '(' after 'catch'");
_466.param=_45c();
if(_345&&_3ba(_466.param.name)){
_34f(_466.param.start,"Binding "+_466.param.name+" in strict mode");
}
_451(_39d,"Expected closing ')' after catch");
_466.guard=null;
_466.body=_465();
node.handlers.push(_44d(_466,"CatchClause"));
}
node.finalizer=eat(_360)?_465():null;
if(!node.handlers.length&&!node.finalizer){
_34f(node.start,"Missing catch or finally clause");
}
return _44d(node,"TryStatement");
case _368:
next();
node=_45f(node);
_450();
return node;
case _369:
next();
node.test=_45d();
_344.push(_457);
node.body=_456();
_344.pop();
return _44d(node,"WhileStatement");
case _36a:
if(_345){
_34f(_32d,"'with' in strict mode");
}
next();
node.object=_45d();
node.body=_456();
return _44d(node,"WithStatement");
case _39a:
return _465();
case _39f:
next();
return _44d(node,"EmptyStatement");
case _372:
if(_30c.objj){
next();
node.classname=_45c(true);
if(eat(_3a0)){
node.superclassname=_45c(true);
}else{
if(eat(_39c)){
node.categoryname=_45c(true);
_451(_39d,"Expected closing ')' after category name");
}
}
if(eat(_39a)){
node.ivardeclarations=[];
for(;;){
if(eat(_39b)){
break;
}
_467(node);
}
node.endOfIvars=_32d;
}
node.body=[];
while(!eat(_375)){
if(_331===_356){
_34f(_327,"Expected '@end' after '@implementation'");
}
node.body.push(_468());
}
}
return _44d(node,"ClassDeclarationStatement");
case _376:
next();
if(_331===_354){
node.localfilepath=true;
}else{
if(_331===_37f){
node.localfilepath=false;
}else{
_3ce();
}
}
node.filename=_469();
return _44d(node,"ImportStatement");
case _387:
next();
return _44d(node,"PreprocessStatement");
case _379:
next();
node.id=_45c(false);
return _44d(node,"ClassStatement");
case _37a:
next();
node.id=_45c(false);
return _44d(node,"GlobalStatement");
default:
var _46a=_332,expr=_461();
if(_459===_355&&expr.type==="Identifier"&&eat(_3a0)){
for(var i=0;i<_344.length;++i){
if(_344[i].name===_46a){
_34f(expr.start,"Label '"+_46a+"' is already declared");
}
}
var kind=_331.isLoop?"loop":_331===_365?"switch":null;
_344.push({name:_46a,kind:kind});
node.body=_456();
_344.pop();
node.label=expr;
return _44d(node,"LabeledStatement");
}else{
node.expression=expr;
_450();
return _44d(node,"ExpressionStatement");
}
}
};
function _467(node){
var _46b;
if(eat(_373)){
_46b=true;
}
var type=_46c();
if(_345&&_3ba(type.name)){
_34f(type.start,"Binding "+type.name+" in strict mode");
}
for(;;){
var decl=_414();
if(_46b){
decl.outlet=_46b;
}
decl.ivartype=type;
decl.id=_45c();
if(_345&&_3ba(decl.id.name)){
_34f(decl.id.start,"Binding "+decl.id.name+" in strict mode");
}
if(eat(_374)){
decl.accessors={};
if(eat(_39c)){
if(!eat(_39d)){
for(;;){
var _46d=_45c(true);
switch(_46d.name){
case "property":
case "getter":
_451(_3a7,"Expected '=' after 'getter' accessor attribute");
decl.accessors[_46d.name]=_45c(true);
break;
case "setter":
_451(_3a7,"Expected '=' after 'setter' accessor attribute");
var _46e=_45c(true);
decl.accessors[_46d.name]=_46e;
if(eat(_3a0)){
_46e.end=_32d;
}
_46e.name+=":";
break;
case "readwrite":
case "readonly":
case "copy":
decl.accessors[_46d.name]=true;
break;
default:
_34f(_46d.start,"Unknown accessors attribute '"+_46d.name+"'");
}
if(!eat(_39e)){
break;
}
}
_451(_39d,"Expected closing ')' after accessor attributes");
}
}
}
_44d(decl,"IvarDeclaration");
node.ivardeclarations.push(decl);
if(!eat(_39e)){
break;
}
}
_450();
};
function _468(){
var _46f=_332,_470=_414();
if(eat(_3a9)){
_470.methodtype=_46f;
if(eat(_39c)){
if(eat(_377)){
_470.action=true;
}
if(!eat(_39d)){
_470.returntype=_46c();
_451(_39d,"Expected closing ')' after method return type");
}
}
var _471=true,_472=[],args=[];
_470.selectors=_472;
_470.arguments=args;
for(;;){
if(_331!==_3a0){
_472.push(_45c(true));
if(_471&&_331!==_3a0){
break;
}
}else{
_472.push(null);
}
_451(_3a0,"Expected ':' in selector");
var _473={};
args.push(_473);
if(eat(_39c)){
_473.type=_46c();
_451(_39d,"Expected closing ')' after method argument type");
}
_473.identifier=_45c(false);
if(_331===_39a||eat(_39f)){
break;
}
if(eat(_39e)){
_451(_3a4,"Expected '...' after ',' in method declaration");
_470.parameters=true;
break;
}
_471=false;
}
_470.startOfBody=_33f;
var _474=_343,_475=_344;
_343=true;
_344=[];
_470.body=_465(true);
_343=_474;
_344=_475;
return _44d(_470,"MethodDeclarationStatement");
}else{
return _456();
}
};
function _45d(){
_451(_39c,"Expected '(' before expression");
var val=_461();
_451(_39d,"Expected closing ')' after expression");
return val;
};
function _465(_476){
var node=_414(),_477=true,_345=false,_478;
node.body=[];
_451(_39a,"Expected '{' before block");
while(!eat(_39b)){
var stmt=_456();
node.body.push(stmt);
if(_477&&_44e(stmt)){
_478=_345;
_447(_345=true);
}
_477=false;
}
if(_345&&!_478){
_447(false);
}
return _44d(node,"BlockStatement");
};
function _45e(node,init){
node.init=init;
_451(_39f,"Expected ';' in for statement");
node.test=_331===_39f?null:_461();
_451(_39f,"Expected ';' in for statement");
node.update=_331===_39d?null:_461();
_451(_39d,"Expected closing ')' in for statement");
node.body=_456();
_344.pop();
return _44d(node,"ForStatement");
};
function _460(node,init){
node.left=init;
node.right=_461();
_451(_39d,"Expected closing ')' in for statement");
node.body=_456();
_344.pop();
return _44d(node,"ForInStatement");
};
function _45f(node,noIn){
node.declarations=[];
node.kind="var";
for(;;){
var decl=_414();
decl.id=_45c();
if(_345&&_3ba(decl.id.name)){
_34f(decl.id.start,"Binding "+decl.id.name+" in strict mode");
}
decl.init=eat(_3a7)?_461(true,noIn):null;
node.declarations.push(_44d(decl,"VariableDeclarator"));
if(!eat(_39e)){
break;
}
}
return _44d(node,"VariableDeclaration");
};
function _461(_479,noIn){
var expr=_47a(noIn);
if(!_479&&_331===_39e){
var node=_41a(expr);
node.expressions=[expr];
while(eat(_39e)){
node.expressions.push(_47a(noIn));
}
return _44d(node,"SequenceExpression");
}
return expr;
};
function _47a(noIn){
var left=_47b(noIn);
if(_331.isAssign){
var node=_41a(left);
node.operator=_332;
node.left=left;
next();
node.right=_47a(noIn);
_453(left);
return _44d(node,"AssignmentExpression");
}
return left;
};
function _47b(noIn){
var expr=_47c(noIn);
if(eat(_3a2)){
var node=_41a(expr);
node.test=expr;
node.consequent=_461(true);
_451(_3a0,"Expected ':' in conditional expression");
node.alternate=_461(true,noIn);
return _44d(node,"ConditionalExpression");
}
return expr;
};
function _47c(noIn){
return _47d(_47e(noIn),-1,noIn);
};
function _47d(left,_47f,noIn){
var prec=_331.binop;
if(prec!=null&&(!noIn||_331!==_371)){
if(prec>_47f){
var node=_41a(left);
node.left=left;
node.operator=_332;
next();
node.right=_47d(_47e(noIn),prec,noIn);
var node=_44d(node,/&&|\|\|/.test(node.operator)?"LogicalExpression":"BinaryExpression");
return _47d(node,_47f,noIn);
}
}
return left;
};
function _47e(noIn){
if(_331.prefix){
var node=_414(),_480=_331.isUpdate;
node.operator=_332;
node.prefix=true;
next();
node.argument=_47e(noIn);
if(_480){
_453(node.argument);
}else{
if(_345&&node.operator==="delete"&&node.argument.type==="Identifier"){
_34f(node.start,"Deleting local variable in strict mode");
}
}
return _44d(node,_480?"UpdateExpression":"UnaryExpression");
}
var expr=_481();
while(_331.postfix&&!_44f()){
var node=_41a(expr);
node.operator=_332;
node.prefix=false;
node.argument=expr;
_453(expr);
next();
expr=_44d(node,"UpdateExpression");
}
return expr;
};
function _481(){
return _482(_483());
};
function _482(base,_484){
if(eat(_3a1)){
var node=_41a(base);
node.object=base;
node.property=_45c(true);
node.computed=false;
return _482(_44d(node,"MemberExpression"),_484);
}else{
if(_30c.objj){
var _485=_414();
}
if(eat(_398)){
var expr=_461();
if(_30c.objj&&_331!==_399){
_485.object=expr;
_342=_485;
return base;
}
var node=_41a(base);
node.object=base;
node.property=expr;
node.computed=true;
_451(_399,"Expected closing ']' in subscript");
return _482(_44d(node,"MemberExpression"),_484);
}else{
if(!_484&&eat(_39c)){
var node=_41a(base);
node.callee=base;
node.arguments=_486(_39d,_331===_39d?null:_461(true),false);
return _482(_44d(node,"CallExpression"),_484);
}
}
}
return base;
};
function _483(){
switch(_331){
case _36c:
var node=_414();
next();
return _44d(node,"ThisExpression");
case _355:
return _45c();
case _352:
case _354:
case _353:
return _469();
case _36e:
case _36f:
case _370:
var node=_414();
node.value=_331.atomValue;
node.raw=_331.keyword;
next();
return _44d(node,"Literal");
case _39c:
var _487=_32f,_488=_32d;
next();
var val=_461();
val.start=_488;
val.end=_32e;
if(_30c.locations){
val.loc.start=_487;
val.loc.end=_330;
}
if(_30c.ranges){
val.range=[_488,_32e];
}
_451(_39d,"Expected closing ')' in expression");
return val;
case _37c:
var node=_414(),_489=null;
next();
_451(_398,"Expected '[' at beginning of array literal");
if(_331!==_399){
_489=_461(true,true);
}
node.elements=_486(_399,_489,true,true);
return _44d(node,"ArrayLiteral");
case _398:
var node=_414(),_489=null;
next();
if(_331!==_39e&&_331!==_399){
_489=_461(true,true);
if(_331!==_39e&&_331!==_399){
return _45a(node,_489);
}
}
node.elements=_486(_399,_489,true,true);
return _44d(node,"ArrayExpression");
case _37b:
var node=_414();
next();
var r=_48a();
node.keys=r[0];
node.values=r[1];
return _44d(node,"DictionaryLiteral");
case _39a:
return _48b();
case _362:
var node=_414();
next();
return _462(node,false);
case _36b:
return _48c();
case _378:
var node=_414();
next();
_451(_39c,"Expected '(' after '@selector'");
_48d(node,_39d);
_451(_39d,"Expected closing ')' after selector");
return _44d(node,"SelectorLiteralExpression");
case _37d:
var node=_414();
next();
_451(_39c,"Expected '(' after '@ref'");
node.element=_45c(node,_39d);
_451(_39d,"Expected closing ')' after ref");
return _44d(node,"Reference");
case _37e:
var node=_414();
next();
_451(_39c,"Expected '(' after '@deref'");
node.expr=_461(true,true);
_451(_39d,"Expected closing ')' after deref");
return _44d(node,"Dereference");
default:
_3ce();
}
};
function _45a(node,_48e){
_48f(node,_399);
if(_48e.type==="Identifier"&&_48e.name==="super"){
node.superObject=true;
}else{
node.object=_48e;
}
return _44d(node,"MessageSendExpression");
};
function _48d(node,_490){
var _491=true,_492=[];
for(;;){
if(_331!==_3a0){
_492.push(_45c(true).name);
if(_491&&_331===_490){
break;
}
}
_451(_3a0,"Expected ':' in selector");
_492.push(":");
if(_331===_490){
break;
}
_491=false;
}
node.selector=_492.join("");
};
function _48f(node,_493){
var _494=true,_495=[],args=[],_496=[];
node.selectors=_495;
node.arguments=args;
for(;;){
if(_331!==_3a0){
_495.push(_45c(true));
if(_494&&eat(_493)){
break;
}
}else{
_495.push(null);
}
_451(_3a0,"Expected ':' in selector");
args.push(_461(true,true));
if(eat(_493)){
break;
}
if(_331===_39e){
node.parameters=[];
while(eat(_39e)){
node.parameters.push(_461(true,true));
}
eat(_493);
break;
}
_494=false;
}
};
function _48c(){
var node=_414();
next();
node.callee=_482(_483(false),true);
if(eat(_39c)){
node.arguments=_486(_39d,_331===_39d?null:_461(true),false);
}else{
node.arguments=[];
}
return _44d(node,"NewExpression");
};
function _48b(){
var node=_414(),_497=true,_498=false;
node.properties=[];
next();
while(!eat(_39b)){
if(!_497){
_451(_39e,"Expected ',' in object literal");
if(_30c.allowTrailingCommas&&eat(_39b)){
break;
}
}else{
_497=false;
}
var prop={key:_499()},_49a=false,kind;
if(eat(_3a0)){
prop.value=_461(true);
kind=prop.kind="init";
}else{
if(_30c.ecmaVersion>=5&&prop.key.type==="Identifier"&&(prop.key.name==="get"||prop.key.name==="set")){
_49a=_498=true;
kind=prop.kind=prop.key.name;
prop.key=_499();
if(_331!==_39c){
_3ce();
}
prop.value=_462(_414(),false);
}else{
_3ce();
}
}
if(prop.key.type==="Identifier"&&(_345||_498)){
for(var i=0;i<node.properties.length;++i){
var _49b=node.properties[i];
if(_49b.key.name===prop.key.name){
var _49c=kind==_49b.kind||_49a&&_49b.kind==="init"||kind==="init"&&(_49b.kind==="get"||_49b.kind==="set");
if(_49c&&!_345&&kind==="init"&&_49b.kind==="init"){
_49c=false;
}
if(_49c){
_34f(prop.key.start,"Redefinition of property");
}
}
}
}
node.properties.push(prop);
}
return _44d(node,"ObjectExpression");
};
function _499(){
if(_331===_352||_331===_354){
return _483();
}
return _45c(true);
};
function _462(node,_49d){
if(_331===_355){
node.id=_45c();
}else{
if(_49d){
_3ce();
}else{
node.id=null;
}
}
node.params=[];
var _49e=true;
_451(_39c,"Expected '(' before function parameters");
while(!eat(_39d)){
if(!_49e){
_451(_39e,"Expected ',' between function parameters");
}else{
_49e=false;
}
node.params.push(_45c());
}
var _49f=_343,_4a0=_344;
_343=true;
_344=[];
node.body=_465(true);
_343=_49f;
_344=_4a0;
if(_345||node.body.body.length&&_44e(node.body.body[0])){
for(var i=node.id?-1:0;i<node.params.length;++i){
var id=i<0?node.id:node.params[i];
if(_3b9(id.name)||_3ba(id.name)){
_34f(id.start,"Defining '"+id.name+"' in strict mode");
}
if(i>=0){
for(var j=0;j<i;++j){
if(id.name===node.params[j].name){
_34f(id.start,"Argument name clash in strict mode");
}
}
}
}
}
return _44d(node,_49d?"FunctionDeclaration":"FunctionExpression");
};
function _486(_4a1,_4a2,_4a3,_4a4){
if(_4a2&&eat(_4a1)){
return [_4a2];
}
var elts=[],_4a5=true;
while(!eat(_4a1)){
if(_4a5){
_4a5=false;
if(_4a4&&_331===_39e&&!_4a2){
elts.push(null);
}else{
elts.push(_4a2);
}
}else{
_451(_39e,"Expected ',' between expressions");
if(_4a3&&_30c.allowTrailingCommas&&eat(_4a1)){
break;
}
if(_4a4&&_331===_39e){
elts.push(null);
}else{
elts.push(_461(true));
}
}
}
return elts;
};
function _48a(){
_451(_39a,"Expected '{' before dictionary");
var keys=[],_4a6=[],_4a7=true;
while(!eat(_39b)){
if(!_4a7){
_451(_39e,"Expected ',' between expressions");
if(_30c.allowTrailingCommas&&eat(_39b)){
break;
}
}
keys.push(_461(true,true));
_451(_3a0,"Expected ':' between dictionary key and value");
_4a6.push(_461(true,true));
_4a7=false;
}
return [keys,_4a6];
};
function _45c(_4a8){
var node=_414();
node.name=_331===_355?_332:(((_4a8&&!_30c.forbidReserved)||_331.okAsIdent)&&_331.keyword)||_3ce();
next();
return _44d(node,"Identifier");
};
function _469(){
var node=_414();
node.value=_332;
node.raw=_33c.slice(_32d,_32e);
next();
return _44d(node,"Literal");
};
function _46c(){
var node=_414();
if(_331===_355){
node.name=_332;
next();
if(_332==="<"){
next();
node.protocol=_45c(true);
if(_332!==">"){
_3ce();
}
next();
}
}else{
node.name=_331.keyword;
if(!eat(_36d)){
var _4a9;
if(eat(_381)||eat(_380)){
_4a9=_331.keyword||true;
}
if(eat(_383)||eat(_382)||eat(_384)){
if(_4a9){
node.name+=" "+_4a9;
}
_4a9=_331.keyword||true;
}else{
if(eat(_385)){
if(_4a9){
node.name+=" "+_4a9;
}
_4a9=_331.keyword||true;
}
if(eat(_386)){
if(_4a9){
node.name+=" "+_4a9;
}
_4a9=_331.keyword||true;
if(eat(_386)){
node.name+=" "+_4a9;
}
}
}
if(!_4a9){
node.name=(!_30c.forbidReserved&&_331.keyword)||_3ce();
next();
}
}
}
return _44d(node,"ObjectiveJType");
};
})(typeof _2==="undefined"?(self.acorn={}):_2.acorn);
if(!_2.acorn){
_2.acorn={};
_2.acorn.walk={};
}
(function(_4aa){
"use strict";
_4aa.simple=function(node,_4ab,base,_4ac){
if(!base){
base=_4aa;
}
function c(node,st,_4ad){
var type=_4ad||node.type,_4ae=_4ab[type];
if(_4ae){
_4ae(node,st);
}
base[type](node,st,c);
};
c(node,_4ac);
};
_4aa.recursive=function(node,_4af,_4b0,base){
var _4b1=_4aa.make(_4b0,base);
function c(node,st,_4b2){
return _4b1[_4b2||node.type](node,st,c);
};
return c(node,_4af);
};
_4aa.make=function(_4b3,base){
if(!base){
base=_4aa;
}
var _4b4={};
for(var type in base){
_4b4[type]=base[type];
}
for(var type in _4b3){
_4b4[type]=_4b3[type];
}
return _4b4;
};
function _4b5(node,st,c){
c(node,st);
};
function _4b6(node,st,c){
};
_4aa.Program=_4aa.BlockStatement=function(node,st,c){
for(var i=0;i<node.body.length;++i){
c(node.body[i],st,"Statement");
}
};
_4aa.Statement=_4b5;
_4aa.EmptyStatement=_4b6;
_4aa.ExpressionStatement=function(node,st,c){
c(node.expression,st,"Expression");
};
_4aa.IfStatement=function(node,st,c){
c(node.test,st,"Expression");
c(node.consequent,st,"Statement");
if(node.alternate){
c(node.alternate,st,"Statement");
}
};
_4aa.LabeledStatement=function(node,st,c){
c(node.body,st,"Statement");
};
_4aa.BreakStatement=_4aa.ContinueStatement=_4b6;
_4aa.WithStatement=function(node,st,c){
c(node.object,st,"Expression");
c(node.body,st,"Statement");
};
_4aa.SwitchStatement=function(node,st,c){
c(node.discriminant,st,"Expression");
for(var i=0;i<node.cases.length;++i){
var cs=node.cases[i];
if(cs.test){
c(cs.test,st,"Expression");
}
for(var j=0;j<cs.consequent.length;++j){
c(cs.consequent[j],st,"Statement");
}
}
};
_4aa.ReturnStatement=function(node,st,c){
if(node.argument){
c(node.argument,st,"Expression");
}
};
_4aa.ThrowStatement=function(node,st,c){
c(node.argument,st,"Expression");
};
_4aa.TryStatement=function(node,st,c){
c(node.block,st,"Statement");
for(var i=0;i<node.handlers.length;++i){
c(node.handlers[i].body,st,"ScopeBody");
}
if(node.finalizer){
c(node.finalizer,st,"Statement");
}
};
_4aa.WhileStatement=function(node,st,c){
c(node.test,st,"Expression");
c(node.body,st,"Statement");
};
_4aa.DoWhileStatement=function(node,st,c){
c(node.body,st,"Statement");
c(node.test,st,"Expression");
};
_4aa.ForStatement=function(node,st,c){
if(node.init){
c(node.init,st,"ForInit");
}
if(node.test){
c(node.test,st,"Expression");
}
if(node.update){
c(node.update,st,"Expression");
}
c(node.body,st,"Statement");
};
_4aa.ForInStatement=function(node,st,c){
c(node.left,st,"ForInit");
c(node.right,st,"Expression");
c(node.body,st,"Statement");
};
_4aa.ForInit=function(node,st,c){
if(node.type=="VariableDeclaration"){
c(node,st);
}else{
c(node,st,"Expression");
}
};
_4aa.DebuggerStatement=_4b6;
_4aa.FunctionDeclaration=function(node,st,c){
c(node,st,"Function");
};
_4aa.VariableDeclaration=function(node,st,c){
for(var i=0;i<node.declarations.length;++i){
var decl=node.declarations[i];
if(decl.init){
c(decl.init,st,"Expression");
}
}
};
_4aa.Function=function(node,st,c){
c(node.body,st,"ScopeBody");
};
_4aa.ScopeBody=function(node,st,c){
c(node,st,"Statement");
};
_4aa.Expression=_4b5;
_4aa.ThisExpression=_4b6;
_4aa.ArrayExpression=_4aa.ArrayLiteral=function(node,st,c){
for(var i=0;i<node.elements.length;++i){
var elt=node.elements[i];
if(elt){
c(elt,st,"Expression");
}
}
};
_4aa.DictionaryLiteral=function(node,st,c){
for(var i=0;i<node.keys.length;i++){
var key=node.keys[i];
c(key,st,"Expression");
var _4b7=node.values[i];
c(_4b7,st,"Expression");
}
};
_4aa.ObjectExpression=function(node,st,c){
for(var i=0;i<node.properties.length;++i){
c(node.properties[i].value,st,"Expression");
}
};
_4aa.FunctionExpression=_4aa.FunctionDeclaration;
_4aa.SequenceExpression=function(node,st,c){
for(var i=0;i<node.expressions.length;++i){
c(node.expressions[i],st,"Expression");
}
};
_4aa.UnaryExpression=_4aa.UpdateExpression=function(node,st,c){
c(node.argument,st,"Expression");
};
_4aa.BinaryExpression=_4aa.AssignmentExpression=_4aa.LogicalExpression=function(node,st,c){
c(node.left,st,"Expression");
c(node.right,st,"Expression");
};
_4aa.ConditionalExpression=function(node,st,c){
c(node.test,st,"Expression");
c(node.consequent,st,"Expression");
c(node.alternate,st,"Expression");
};
_4aa.NewExpression=_4aa.CallExpression=function(node,st,c){
c(node.callee,st,"Expression");
if(node.arguments){
for(var i=0;i<node.arguments.length;++i){
c(node.arguments[i],st,"Expression");
}
}
};
_4aa.MemberExpression=function(node,st,c){
c(node.object,st,"Expression");
if(node.computed){
c(node.property,st,"Expression");
}
};
_4aa.Identifier=_4aa.Literal=_4b6;
_4aa.ClassDeclarationStatement=function(node,st,c){
if(node.ivardeclarations){
for(var i=0;i<node.ivardeclarations.length;++i){
c(node.ivardeclarations[i],st,"IvarDeclaration");
}
}
for(var i=0;i<node.body.length;++i){
c(node.body[i],st,"Statement");
}
};
_4aa.ImportStatement=_4b6;
_4aa.IvarDeclaration=_4b6;
_4aa.MethodDeclarationStatement=_4b6;
_4aa.PreprocessStatement=_4b6;
_4aa.ClassStatement=_4b6;
_4aa.GlobalStatement=_4b6;
_4aa.MethodDeclarationStatement=function(node,st,c){
c(node.body,st,"Statement");
};
_4aa.MessageSendExpression=function(node,st,c){
if(!node.superObject){
c(node.object,st,"Expression");
}
if(node.arguments){
for(var i=0;i<node.arguments.length;++i){
c(node.arguments[i],st,"Expression");
}
}
if(node.parameters){
for(var i=0;i<node.parameters.length;++i){
c(node.parameters[i],st,"Expression");
}
}
};
_4aa.SelectorLiteralExpression=_4b6;
_4aa.Reference=function(node,st,c){
c(node.element,st,"Identifier");
};
_4aa.Dereference=function(node,st,c){
c(node.expr,st,"Expression");
};
function _4b8(prev){
return {vars:Object.create(null),prev:prev};
};
_4aa.scopeVisitor=_4aa.make({Function:function(node,_4b9,c){
var _4ba=_4b8(_4b9);
for(var i=0;i<node.params.length;++i){
_4ba.vars[node.params[i].name]={type:"argument",node:node.params[i]};
}
if(node.id){
var decl=node.type=="FunctionDeclaration";
(decl?_4b9:_4ba).vars[node.id.name]={type:decl?"function":"function name",node:node.id};
}
c(node.body,_4ba,"ScopeBody");
},TryStatement:function(node,_4bb,c){
c(node.block,_4bb,"Statement");
for(var i=0;i<node.handlers.length;++i){
var _4bc=node.handlers[i],_4bd=_4b8(_4bb);
_4bd.vars[_4bc.param.name]={type:"catch clause",node:_4bc.param};
c(_4bc.body,_4bd,"ScopeBody");
}
if(node.finalizer){
c(node.finalizer,_4bb,"Statement");
}
},VariableDeclaration:function(node,_4be,c){
for(var i=0;i<node.declarations.length;++i){
var decl=node.declarations[i];
_4be.vars[decl.id.name]={type:"var",node:decl.id};
if(decl.init){
c(decl.init,_4be,"Expression");
}
}
}});
})(typeof _2=="undefined"?acorn.walk={}:_2.acorn.walk);
var _4bf=function(prev,base){
this.vars=Object.create(null);
if(base){
for(var key in base){
this[key]=base[key];
}
}
this.prev=prev;
if(prev){
this.compiler=prev.compiler;
}
};
_4bf.prototype.compiler=function(){
return this.compiler;
};
_4bf.prototype.rootScope=function(){
return this.prev?this.prev.rootScope():this;
};
_4bf.prototype.isRootScope=function(){
return !this.prev;
};
_4bf.prototype.currentClassName=function(){
return this.classDef?this.classDef.className:this.prev?this.prev.currentClassName():null;
};
_4bf.prototype.getIvarForCurrentClass=function(_4c0){
if(this.ivars){
var ivar=this.ivars[_4c0];
if(ivar){
return ivar;
}
}
var prev=this.prev;
if(prev&&!this.classDef){
return prev.getIvarForCurrentClass(_4c0);
}
return null;
};
_4bf.prototype.getLvar=function(_4c1,_4c2){
if(this.vars){
var lvar=this.vars[_4c1];
if(lvar){
return lvar;
}
}
var prev=this.prev;
if(prev&&(!_4c2||!this.methodType)){
return prev.getLvar(_4c1,_4c2);
}
return null;
};
_4bf.prototype.currentMethodType=function(){
return this.methodType?this.methodType:this.prev?this.prev.currentMethodType():null;
};
_4bf.prototype.copyAddedSelfToIvarsToParent=function(){
if(this.prev&&this.addedSelfToIvars){
for(var key in this.addedSelfToIvars){
var _4c3=this.addedSelfToIvars[key],_4c4=(this.prev.addedSelfToIvars||(this.prev.addedSelfToIvars=Object.create(null)))[key]||(this.prev.addedSelfToIvars[key]=[]);
_4c4.push.apply(_4c4,_4c3);
}
}
};
_4bf.prototype.addMaybeWarning=function(_4c5){
var _4c6=this.rootScope();
(_4c6._maybeWarnings||(_4c6._maybeWarnings=[])).push(_4c5);
};
_4bf.prototype.maybeWarnings=function(){
return this.rootScope()._maybeWarnings;
};
var _4c7=function(_4c8,node,code){
this.message=_4c9(_4c8,node,code);
this.node=node;
};
_4c7.prototype.checkIfWarning=function(st){
var _4ca=this.node.name;
return !st.getLvar(_4ca)&&typeof _1[_4ca]==="undefined"&&typeof window[_4ca]==="undefined"&&!st.compiler.getClassDef(_4ca);
};
function _2ad(){
this.atoms=[];
};
_2ad.prototype.toString=function(){
return this.atoms.join("");
};
_2ad.prototype.concat=function(_4cb){
this.atoms.push(_4cb);
};
_2ad.prototype.isEmpty=function(){
return this.atoms.length!==0;
};
var _4cc="";
var _4cd=_2.acorn.makePredicate("self _cmd undefined localStorage arguments");
var _4ce=_2.acorn.makePredicate("delete in instanceof new typeof void");
var _4cf=_2.acorn.makePredicate("LogicalExpression BinaryExpression");
var _4d0=_2.acorn.makePredicate("in instanceof");
var _4d1=function(_4d2,aURL,_4d3,pass,_4d4){
this.source=_4d2;
this.URL=new CFURL(aURL);
this.pass=pass;
this.jsBuffer=new _2ad();
this.imBuffer=null;
this.cmBuffer=null;
this.warnings=[];
try{
this.tokens=_2.acorn.parse(_4d2);
}
catch(e){
if(e.lineStart){
var _4d5=this.prettifyMessage(e,"ERROR");
console.log(_4d5);
}
throw e;
}
this.dependencies=[];
this.flags=_4d3|_4d1.Flags.IncludeDebugSymbols;
this.classDefs=_4d4?_4d4:Object.create(null);
this.lastPos=0;
if(_4cc&_4d1.Flags.Generate){
this.generate=true;
}
this.generate=true;
_4d6(this.tokens,new _4bf(null,{compiler:this}),pass===2?_4d7:_4d8);
};
_2.ObjJAcornCompiler=_4d1;
_2.ObjJAcornCompiler.compileToExecutable=function(_4d9,aURL,_4da){
_4d1.currentCompileFile=aURL;
return new _4d1(_4d9,aURL,_4da,2).executable();
};
_2.ObjJAcornCompiler.compileToIMBuffer=function(_4db,aURL,_4dc,_4dd){
return new _4d1(_4db,aURL,_4dc,2,_4dd).IMBuffer();
};
_2.ObjJAcornCompiler.compileFileDependencies=function(_4de,aURL,_4df){
_4d1.currentCompileFile=aURL;
return new _4d1(_4de,aURL,_4df,1).executable();
};
_4d1.prototype.compilePass2=function(){
_4d1.currentCompileFile=this.URL;
this.pass=2;
this.jsBuffer=new _2ad();
this.warnings=[];
_4d6(this.tokens,new _4bf(null,{compiler:this}),_4d7);
for(var i=0;i<this.warnings.length;i++){
var _4e0=this.prettifyMessage(this.warnings[i],"WARNING");
console.log(_4e0);
}
return this.jsBuffer.toString();
};
var _4cc="";
_2.setCurrentCompilerFlags=function(_4e1){
_4cc=_4e1;
};
_2.currentCompilerFlags=function(_4e2){
return _4cc;
};
_4d1.Flags={};
_4d1.Flags.IncludeDebugSymbols=1<<0;
_4d1.Flags.IncludeTypeSignatures=1<<1;
_4d1.Flags.Generate=1<<2;
_4d1.prototype.addWarning=function(_4e3){
this.warnings.push(_4e3);
};
_4d1.prototype.getIvarForClass=function(_4e4,_4e5){
var ivar=_4e5.getIvarForCurrentClass(_4e4);
if(ivar){
return ivar;
}
var c=this.getClassDef(_4e5.currentClassName());
while(c){
var _4e6=c.ivars;
if(_4e6){
var _4e7=_4e6[_4e4];
if(_4e7){
return _4e7;
}
}
c=this.getClassDef(c.superClassName);
}
};
_4d1.prototype.getClassDef=function(_4e8){
if(!_4e8){
return null;
}
var c=this.classDefs[_4e8];
if(c){
return c;
}
if(objj_getClass){
var _4e9=objj_getClass(_4e8);
if(_4e9){
var _4ea=class_copyIvarList(_4e9),_4eb=_4ea.length,_4ec=Object.create(null),_4ed=_4e9.super_class;
for(var i=0;i<_4eb;i++){
var ivar=_4ea[i];
_4ec[ivar.name]={"type":ivar.type,"name":ivar.name};
}
c={"className":_4e8,"ivars":_4ec};
if(_4ed){
c.superClassName=_4ed.name;
}
this.classDefs[_4e8]=c;
return c;
}
}
return null;
};
_4d1.prototype.executable=function(){
if(!this._executable){
this._executable=new _2bc(this.jsBuffer?this.jsBuffer.toString():null,this.dependencies,this.URL,null,this);
}
return this._executable;
};
_4d1.prototype.IMBuffer=function(){
return this.imBuffer;
};
_4d1.prototype.JSBuffer=function(){
return this.jsBuffer;
};
_4d1.prototype.prettifyMessage=function(_4ee,_4ef){
var line=this.source.substring(_4ee.lineStart,_4ee.lineEnd),_4f0="\n"+line;
_4f0+=(new Array(_4ee.column+1)).join(" ");
_4f0+=(new Array(Math.min(1,line.length)+1)).join("^")+"\n";
_4f0+=_4ef+" line "+_4ee.line+" in "+this.URL+": "+_4ee.message;
return _4f0;
};
_4d1.prototype.error_message=function(_4f1,node){
var pos=_2.acorn.getLineInfo(this.source,node.start),_4f2={message:_4f1,line:pos.line,column:pos.column,lineStart:pos.lineStart,lineEnd:pos.lineEnd};
return new SyntaxError(this.prettifyMessage(_4f2,"ERROR"));
};
_4d1.prototype.pushImport=function(url){
if(!_4d1.importStack){
_4d1.importStack=[];
}
_4d1.importStack.push(url);
};
_4d1.prototype.popImport=function(){
_4d1.importStack.pop();
};
function _4c9(_4f3,node,code){
var _4f4=_2.acorn.getLineInfo(code,node.start);
_4f4.message=_4f3;
return _4f4;
};
function _4d6(node,_4f5,_4f6){
function c(node,st,_4f7){
_4f6[_4f7||node.type](node,st,c);
};
c(node,_4f5);
};
function _4f8(node){
switch(node.type){
case "Literal":
case "Identifier":
return true;
case "ArrayExpression":
for(var i=0;i<node.elements.length;++i){
if(!_4f8(node.elements[i])){
return false;
}
}
return true;
case "DictionaryLiteral":
for(var i=0;i<node.keys.length;++i){
if(!_4f8(node.keys[i])){
return false;
}
if(!_4f8(node.values[i])){
return false;
}
}
return true;
case "ObjectExpression":
for(var i=0;i<node.properties.length;++i){
if(!_4f8(node.properties[i].value)){
return false;
}
}
return true;
case "FunctionExpression":
for(var i=0;i<node.params.length;++i){
if(!_4f8(node.params[i])){
return false;
}
}
return true;
case "SequenceExpression":
for(var i=0;i<node.expressions.length;++i){
if(!_4f8(node.expressions[i])){
return false;
}
}
return true;
case "UnaryExpression":
return _4f8(node.argument);
case "BinaryExpression":
return _4f8(node.left)&&_4f8(node.right);
case "ConditionalExpression":
return _4f8(node.test)&&_4f8(node.consequent)&&_4f8(node.alternate);
case "MemberExpression":
return _4f8(node.object)&&(!node.computed||_4f8(node.property));
case "Dereference":
return _4f8(node.expr);
case "Reference":
return _4f8(node.element);
default:
return false;
}
};
function _4f9(st,node){
if(!_4f8(node)){
throw st.compiler.error_message("Dereference of expression with side effects",node);
}
};
function _4fa(c){
return function(node,st,_4fb){
st.compiler.jsBuffer.concat("(");
c(node,st,_4fb);
st.compiler.jsBuffer.concat(")");
};
};
var _4fc={"*":3,"/":3,"%":3,"+":4,"-":4,"<<":5,">>":5,">>>":5,"<":6,"<=":6,">":6,">=":6,"in":6,"instanceof":6,"==":7,"!=":7,"===":7,"!==":7,"&":8,"^":9,"|":10,"&&":11,"||":12};
var _4fd={MemberExpression:0,CallExpression:1,NewExpression:2,FunctionExpression:3,UnaryExpression:4,UpdateExpression:4,BinaryExpression:5,LogicalExpression:6,ConditionalExpression:7,AssignmentExpression:8};
function _4fe(node,_4ff,_500){
var _501=node.type,_4fe=_4fd[_501]||-1,_502=_4fd[_4ff.type]||-1,_503,_504;
return _4fe<_502||(_4fe===_502&&_4cf(_501)&&((_503=_4fc[node.operator])<(_504=_4fc[_4ff.operator])||(_500&&_503===_504)));
};
var _4d8=_2.acorn.walk.make({ImportStatement:function(node,st,c){
var _505=node.filename.value;
st.compiler.dependencies.push(new _2eb(new CFURL(_505),node.localfilepath));
}});
var _506=4;
var _507=Array(_506+1).join(" ");
var _508="";
var _4d7=_2.acorn.walk.make({Program:function(node,st,c){
var _509=st.compiler,_50a=_509.generate;
_508="";
for(var i=0;i<node.body.length;++i){
c(node.body[i],st,"Statement");
}
if(!_50a){
_509.jsBuffer.concat(_509.source.substring(_509.lastPos,node.end));
}
var _50b=st.maybeWarnings();
if(_50b){
for(var i=0;i<_50b.length;i++){
var _50c=_50b[i];
if(_50c.checkIfWarning(st)){
_509.addWarning(_50c.message);
}
}
}
},BlockStatement:function(node,st,c){
var _50d=st.compiler,_50e=_50d.generate,_50f;
if(_50e){
st.indentBlockLevel=typeof st.indentBlockLevel==="undefined"?0:st.indentBlockLevel+1;
_50f=_50d.jsBuffer;
_50f.concat(_508.substring(_506));
_50f.concat("{\n");
}
for(var i=0;i<node.body.length;++i){
c(node.body[i],st,"Statement");
}
if(_50e){
_50f.concat(_508.substring(_506));
_50f.concat("}");
if(st.isDecl||st.indentBlockLevel>0){
_50f.concat("\n");
}
st.indentBlockLevel--;
}
},ExpressionStatement:function(node,st,c){
var _510=st.compiler,_511=_510.generate;
if(_511){
_510.jsBuffer.concat(_508);
}
c(node.expression,st,"Expression");
if(_511){
_510.jsBuffer.concat(";\n");
}
},IfStatement:function(node,st,c){
var _512=st.compiler,_513=_512.generate,_514;
if(_513){
_514=_512.jsBuffer;
if(!st.superNodeIsElse){
_514.concat(_508);
}else{
delete st.superNodeIsElse;
}
_514.concat("if (");
}
c(node.test,st,"Expression");
if(_513){
_514.concat(node.consequent.type==="EmptyStatement"?");\n":")\n");
}
_508+=_507;
c(node.consequent,st,"Statement");
_508=_508.substring(_506);
var _515=node.alternate;
if(_515){
var _516=_515.type!=="IfStatement";
if(_513){
var _517=_515.type==="EmptyStatement";
_514.concat(_508);
_514.concat(_516?_517?"else;\n":"else\n":"else ");
}
if(_516){
_508+=_507;
}else{
st.superNodeIsElse=true;
}
c(_515,st,"Statement");
if(_516){
_508=_508.substring(_506);
}
}
},LabeledStatement:function(node,st,c){
var _518=st.compiler;
if(_518.generate){
var _519=_518.jsBuffer;
_519.concat(_508);
_519.concat(node.label.name);
_519.concat(": ");
}
c(node.body,st,"Statement");
},BreakStatement:function(node,st,c){
var _51a=st.compiler;
if(_51a.generate){
_51a.jsBuffer.concat(_508);
if(node.label){
_51a.jsBuffer.concat("break ");
_51a.jsBuffer.concat(node.label.name);
_51a.jsBuffer.concat(";\n");
}else{
_51a.jsBuffer.concat("break;\n");
}
}
},ContinueStatement:function(node,st,c){
var _51b=st.compiler;
if(_51b.generate){
var _51c=_51b.jsBuffer;
_51c.concat(_508);
if(node.label){
_51c.concat("continue ");
_51c.concat(node.label.name);
_51c.concat(";\n");
}else{
_51c.concat("continue;\n");
}
}
},WithStatement:function(node,st,c){
var _51d=st.compiler,_51e=_51d.generate,_51f;
if(_51e){
_51f=_51d.jsBuffer;
_51f.concat(_508);
_51f.concat("with(");
}
c(node.object,st,"Expression");
if(_51e){
_51f.concat(")\n");
}
_508+=_507;
c(node.body,st,"Statement");
_508=_508.substring(_506);
},SwitchStatement:function(node,st,c){
var _520=st.compiler,_521=_520.generate,_522;
if(_521){
_522=_520.jsBuffer;
_522.concat(_508);
_522.concat("switch(");
}
c(node.discriminant,st,"Expression");
if(_521){
_522.concat(") {\n");
}
for(var i=0;i<node.cases.length;++i){
var cs=node.cases[i];
if(cs.test){
if(_521){
_522.concat(_508);
_522.concat("case ");
}
c(cs.test,st,"Expression");
if(_521){
_522.concat(":\n");
}
}else{
if(_521){
_522.concat("default:\n");
}
}
_508+=_507;
for(var j=0;j<cs.consequent.length;++j){
c(cs.consequent[j],st,"Statement");
}
_508=_508.substring(_506);
}
if(_521){
_522.concat(_508);
_522.concat("}\n");
}
},ReturnStatement:function(node,st,c){
var _523=st.compiler,_524=_523.generate,_525;
if(_524){
_525=_523.jsBuffer;
_525.concat(_508);
_525.concat("return");
}
if(node.argument){
if(_524){
_525.concat(" ");
}
c(node.argument,st,"Expression");
}
if(_524){
_525.concat(";\n");
}
},ThrowStatement:function(node,st,c){
var _526=st.compiler,_527=_526.generate,_528;
if(_527){
_528=_526.jsBuffer;
_528.concat(_508);
_528.concat("throw ");
}
c(node.argument,st,"Expression");
if(_527){
_528.concat(";\n");
}
},TryStatement:function(node,st,c){
var _529=st.compiler,_52a=_529.generate,_52b;
if(_52a){
_52b=_529.jsBuffer;
_52b.concat(_508);
_52b.concat("try");
}
_508+=_507;
c(node.block,st,"Statement");
_508=_508.substring(_506);
for(var i=0;i<node.handlers.length;++i){
var _52c=node.handlers[i],_52d=new _4bf(st),_52e=_52c.param,name=_52e.name;
_52d.vars[name]={type:"catch clause",node:_52e};
if(_52a){
_52b.concat(_508);
_52b.concat("catch(");
_52b.concat(name);
_52b.concat(") ");
}
_508+=_507;
c(_52c.body,_52d,"ScopeBody");
_508=_508.substring(_506);
_52d.copyAddedSelfToIvarsToParent();
}
if(node.finalizer){
if(_52a){
_52b.concat(_508);
_52b.concat("finally ");
}
_508+=_507;
c(node.finalizer,st,"Statement");
_508=_508.substring(_506);
}
},WhileStatement:function(node,st,c){
var _52f=st.compiler,_530=_52f.generate,body=node.body,_531;
if(_530){
_531=_52f.jsBuffer;
_531.concat(_508);
_531.concat("while (");
}
c(node.test,st,"Expression");
if(_530){
_531.concat(body.type==="EmptyStatement"?");\n":")\n");
}
_508+=_507;
c(body,st,"Statement");
_508=_508.substring(_506);
},DoWhileStatement:function(node,st,c){
var _532=st.compiler,_533=_532.generate,_534;
if(_533){
_534=_532.jsBuffer;
_534.concat(_508);
_534.concat("do\n");
}
_508+=_507;
c(node.body,st,"Statement");
_508=_508.substring(_506);
if(_533){
_534.concat(_508);
_534.concat("while (");
}
c(node.test,st,"Expression");
if(_533){
_534.concat(");\n");
}
},ForStatement:function(node,st,c){
var _535=st.compiler,_536=_535.generate,body=node.body,_537;
if(_536){
_537=_535.jsBuffer;
_537.concat(_508);
_537.concat("for (");
}
if(node.init){
c(node.init,st,"ForInit");
}
if(_536){
_537.concat("; ");
}
if(node.test){
c(node.test,st,"Expression");
}
if(_536){
_537.concat("; ");
}
if(node.update){
c(node.update,st,"Expression");
}
if(_536){
_537.concat(body.type==="EmptyStatement"?");\n":")\n");
}
_508+=_507;
c(body,st,"Statement");
_508=_508.substring(_506);
},ForInStatement:function(node,st,c){
var _538=st.compiler,_539=_538.generate,body=node.body,_53a;
if(_539){
_53a=_538.jsBuffer;
_53a.concat(_508);
_53a.concat("for (");
}
c(node.left,st,"ForInit");
if(_539){
_53a.concat(" in ");
}
c(node.right,st,"Expression");
if(_539){
_53a.concat(body.type==="EmptyStatement"?");\n":")\n");
}
_508+=_507;
c(body,st,"Statement");
_508=_508.substring(_506);
},ForInit:function(node,st,c){
var _53b=st.compiler,_53c=_53b.generate;
if(node.type==="VariableDeclaration"){
st.isFor=true;
c(node,st);
delete st.isFor;
}else{
c(node,st,"Expression");
}
},DebuggerStatement:function(node,st,c){
var _53d=st.compiler;
if(_53d.generate){
var _53e=_53d.jsBuffer;
_53e.concat(_508);
_53e.concat("debugger;\n");
}
},Function:function(node,st,c){
var _53f=st.compiler,_540=_53f.generate,_541=_53f.jsBuffer;
inner=new _4bf(st),decl=node.type=="FunctionDeclaration";
inner.isDecl=decl;
for(var i=0;i<node.params.length;++i){
inner.vars[node.params[i].name]={type:"argument",node:node.params[i]};
}
if(node.id){
(decl?st:inner).vars[node.id.name]={type:decl?"function":"function name",node:node.id};
if(_540){
_541.concat(node.id.name);
_541.concat(" = ");
}else{
_541.concat(_53f.source.substring(_53f.lastPos,node.start));
_541.concat(node.id.name);
_541.concat(" = function");
_53f.lastPos=node.id.end;
}
}
if(_540){
_541.concat("function(");
for(var i=0;i<node.params.length;++i){
if(i){
_541.concat(", ");
}
_541.concat(node.params[i].name);
}
_541.concat(")\n");
}
_508+=_507;
c(node.body,inner,"ScopeBody");
_508=_508.substring(_506);
inner.copyAddedSelfToIvarsToParent();
},VariableDeclaration:function(node,st,c){
var _542=st.compiler,_543=_542.generate,_544;
if(_543){
_544=_542.jsBuffer;
if(!st.isFor){
_544.concat(_508);
}
_544.concat("var ");
}
for(var i=0;i<node.declarations.length;++i){
var decl=node.declarations[i],_545=decl.id.name;
if(i){
if(_543){
if(st.isFor){
_544.concat(", ");
}else{
_544.concat(",\n");
_544.concat(_508);
_544.concat("    ");
}
}
}
st.vars[_545]={type:"var",node:decl.id};
if(_543){
_544.concat(_545);
}
if(decl.init){
if(_543){
_544.concat(" = ");
}
c(decl.init,st,"Expression");
}
if(st.addedSelfToIvars){
var _546=st.addedSelfToIvars[_545];
if(_546){
var _544=st.compiler.jsBuffer.atoms;
for(var i=0;i<_546.length;i++){
var dict=_546[i];
_544[dict.index]="";
_542.addWarning(_4c9("Local declaration of '"+_545+"' hides instance variable",dict.node,_542.source));
}
st.addedSelfToIvars[_545]=[];
}
}
}
if(_543&&!st.isFor){
_542.jsBuffer.concat(";\n");
}
},ThisExpression:function(node,st,c){
var _547=st.compiler;
if(_547.generate){
_547.jsBuffer.concat("this");
}
},ArrayExpression:function(node,st,c){
var _548=st.compiler,_549=_548.generate;
if(_549){
_548.jsBuffer.concat("[");
}
for(var i=0;i<node.elements.length;++i){
var elt=node.elements[i];
if(i!==0){
if(_549){
_548.jsBuffer.concat(", ");
}
}
if(elt){
c(elt,st,"Expression");
}
}
if(_549){
_548.jsBuffer.concat("]");
}
},ObjectExpression:function(node,st,c){
var _54a=st.compiler,_54b=_54a.generate;
if(_54b){
_54a.jsBuffer.concat("{");
}
for(var i=0;i<node.properties.length;++i){
var prop=node.properties[i];
if(_54b){
if(i){
_54a.jsBuffer.concat(", ");
}
st.isPropertyKey=true;
c(prop.key,st,"Expression");
delete st.isPropertyKey;
_54a.jsBuffer.concat(": ");
}else{
if(prop.key.raw&&prop.key.raw.charAt(0)==="@"){
_54a.jsBuffer.concat(_54a.source.substring(_54a.lastPos,prop.key.start));
_54a.lastPos=prop.key.start+1;
}
}
c(prop.value,st,"Expression");
}
if(_54b){
_54a.jsBuffer.concat("}");
}
},SequenceExpression:function(node,st,c){
var _54c=st.compiler,_54d=_54c.generate;
if(_54d){
_54c.jsBuffer.concat("(");
}
for(var i=0;i<node.expressions.length;++i){
if(_54d&&i!==0){
_54c.jsBuffer.concat(", ");
}
c(node.expressions[i],st,"Expression");
}
if(_54d){
_54c.jsBuffer.concat(")");
}
},UnaryExpression:function(node,st,c){
var _54e=st.compiler,_54f=_54e.generate,_550=node.argument;
if(_54f){
if(node.prefix){
_54e.jsBuffer.concat(node.operator);
if(_4ce(node.operator)){
_54e.jsBuffer.concat(" ");
}
(_4fe(node,_550)?_4fa(c):c)(_550,st,"Expression");
}else{
(_4fe(node,_550)?_4fa(c):c)(_550,st,"Expression");
_54e.jsBuffer.concat(node.operator);
}
}else{
c(_550,st,"Expression");
}
},UpdateExpression:function(node,st,c){
var _551=st.compiler,_552=_551.generate;
if(node.argument.type==="Dereference"){
_4f9(st,node.argument);
if(!_552){
_551.jsBuffer.concat(_551.source.substring(_551.lastPos,node.start));
}
_551.jsBuffer.concat((node.prefix?"":"(")+"(");
if(!_552){
_551.lastPos=node.argument.expr.start;
}
c(node.argument.expr,st,"Expression");
if(!_552){
_551.jsBuffer.concat(_551.source.substring(_551.lastPos,node.argument.expr.end));
}
_551.jsBuffer.concat(")(");
if(!_552){
_551.lastPos=node.argument.start;
}
c(node.argument,st,"Expression");
if(!_552){
_551.jsBuffer.concat(_551.source.substring(_551.lastPos,node.argument.end));
}
_551.jsBuffer.concat(" "+node.operator.substring(0,1)+" 1)"+(node.prefix?"":node.operator=="++"?" - 1)":" + 1)"));
if(!_552){
_551.lastPos=node.end;
}
return;
}
if(node.prefix){
if(_552){
_551.jsBuffer.concat(node.operator);
if(_4ce(node.operator)){
_551.jsBuffer.concat(" ");
}
}
(_552&&_4fe(node,node.argument)?_4fa(c):c)(node.argument,st,"Expression");
}else{
(_552&&_4fe(node,node.argument)?_4fa(c):c)(node.argument,st,"Expression");
if(_552){
_551.jsBuffer.concat(node.operator);
}
}
},BinaryExpression:function(node,st,c){
var _553=st.compiler,_554=_553.generate,_555=_4d0(node.operator);
(_554&&_4fe(node,node.left)?_4fa(c):c)(node.left,st,"Expression");
if(_554){
var _556=_553.jsBuffer;
_556.concat(" ");
_556.concat(node.operator);
_556.concat(" ");
}
(_554&&_4fe(node,node.right,true)?_4fa(c):c)(node.right,st,"Expression");
},LogicalExpression:function(node,st,c){
var _557=st.compiler,_558=_557.generate;
(_558&&_4fe(node,node.left)?_4fa(c):c)(node.left,st,"Expression");
if(_558){
var _559=_557.jsBuffer;
_559.concat(" ");
_559.concat(node.operator);
_559.concat(" ");
}
(_558&&_4fe(node,node.right,true)?_4fa(c):c)(node.right,st,"Expression");
},AssignmentExpression:function(node,st,c){
var _55a=st.compiler,_55b=_55a.generate,_55c=st.assignment,_55d=_55a.jsBuffer;
if(node.left.type==="Dereference"){
_4f9(st,node.left);
if(!_55b){
_55d.concat(_55a.source.substring(_55a.lastPos,node.start));
}
_55d.concat("(");
if(!_55b){
_55a.lastPos=node.left.expr.start;
}
c(node.left.expr,st,"Expression");
if(!_55b){
_55d.concat(_55a.source.substring(_55a.lastPos,node.left.expr.end));
}
_55d.concat(")(");
if(node.operator!=="="){
if(!_55b){
_55a.lastPos=node.left.start;
}
c(node.left,st,"Expression");
if(!_55b){
_55d.concat(_55a.source.substring(_55a.lastPos,node.left.end));
}
_55d.concat(" "+node.operator.substring(0,1)+" ");
}
if(!_55b){
_55a.lastPos=node.right.start;
}
c(node.right,st,"Expression");
if(!_55b){
_55d.concat(_55a.source.substring(_55a.lastPos,node.right.end));
}
_55d.concat(")");
if(!_55b){
_55a.lastPos=node.end;
}
return;
}
var _55c=st.assignment;
st.assignment=true;
(_55b&&_4fe(node,node.left)?_4fa(c):c)(node.left,st,"Expression");
if(_55b){
_55d.concat(" ");
_55d.concat(node.operator);
_55d.concat(" ");
}
st.assignment=_55c;
(_55b&&_4fe(node,node.right,true)?_4fa(c):c)(node.right,st,"Expression");
if(st.isRootScope()&&node.left.type==="Identifier"&&!st.getLvar(node.left.name)){
st.vars[node.left.name]={type:"global",node:node.left};
}
},ConditionalExpression:function(node,st,c){
var _55e=st.compiler,_55f=_55e.generate;
(_55f&&_4fe(node,node.test)?_4fa(c):c)(node.test,st,"Expression");
if(_55f){
_55e.jsBuffer.concat(" ? ");
}
c(node.consequent,st,"Expression");
if(_55f){
_55e.jsBuffer.concat(" : ");
}
c(node.alternate,st,"Expression");
},NewExpression:function(node,st,c){
var _560=st.compiler,_561=_560.generate;
if(_561){
_560.jsBuffer.concat("new ");
}
(_561&&_4fe(node,node.callee)?_4fa(c):c)(node.callee,st,"Expression");
if(_561){
_560.jsBuffer.concat("(");
}
if(node.arguments){
for(var i=0;i<node.arguments.length;++i){
if(_561&&i){
_560.jsBuffer.concat(", ");
}
c(node.arguments[i],st,"Expression");
}
}
if(_561){
_560.jsBuffer.concat(")");
}
},CallExpression:function(node,st,c){
var _562=st.compiler,_563=_562.generate;
(_563&&_4fe(node,node.callee)?_4fa(c):c)(node.callee,st,"Expression");
if(_563){
_562.jsBuffer.concat("(");
}
if(node.arguments){
for(var i=0;i<node.arguments.length;++i){
if(_563&&i){
_562.jsBuffer.concat(", ");
}
c(node.arguments[i],st,"Expression");
}
}
if(_563){
_562.jsBuffer.concat(")");
}
},MemberExpression:function(node,st,c){
var _564=st.compiler,_565=_564.generate,_566=node.computed;
(_565&&_4fe(node,node.object)?_4fa(c):c)(node.object,st,"Expression");
if(_565){
if(_566){
_564.jsBuffer.concat("[");
}else{
_564.jsBuffer.concat(".");
}
}
st.secondMemberExpression=!_566;
(_565&&!_566&&_4fe(node,node.property)?_4fa(c):c)(node.property,st,"Expression");
st.secondMemberExpression=false;
if(_565&&_566){
_564.jsBuffer.concat("]");
}
},Identifier:function(node,st,c){
var _567=st.compiler,_568=_567.generate,_569=node.name;
if(st.currentMethodType()==="-"&&!st.secondMemberExpression&&!st.isPropertyKey){
var lvar=st.getLvar(_569,true),ivar=_567.getIvarForClass(_569,st);
if(ivar){
if(lvar){
_567.addWarning(_4c9("Local declaration of '"+_569+"' hides instance variable",node,_567.source));
}else{
var _56a=node.start;
if(!_568){
do{
_567.jsBuffer.concat(_567.source.substring(_567.lastPos,_56a));
_567.lastPos=_56a;
}while(_567.source.substr(_56a++,1)==="(");
}
((st.addedSelfToIvars||(st.addedSelfToIvars=Object.create(null)))[_569]||(st.addedSelfToIvars[_569]=[])).push({node:node,index:_567.jsBuffer.atoms.length});
_567.jsBuffer.concat("self.");
}
}else{
if(!_4cd(_569)){
var _56b,_56c=typeof _1[_569]!=="undefined"||typeof window[_569]!=="undefined"||_567.getClassDef(_569),_56d=st.getLvar(_569);
if(_56c&&(!_56d||_56d.type!=="class")){
}else{
if(!_56d){
if(st.assignment){
_56b=new _4c7("Creating global variable inside function or method '"+_569+"'",node,_567.source);
st.vars[_569]={type:"remove global warning",node:node};
}else{
_56b=new _4c7("Using unknown class or uninitialized global variable '"+_569+"'",node,_567.source);
}
}
}
if(_56b){
st.addMaybeWarning(_56b);
}
}
}
}
if(_568){
_567.jsBuffer.concat(_569);
}
},Literal:function(node,st,c){
var _56e=st.compiler,_56f=_56e.generate;
if(_56f){
if(node.raw&&node.raw.charAt(0)==="@"){
_56e.jsBuffer.concat(node.raw.substring(1));
}else{
_56e.jsBuffer.concat(node.raw);
}
}else{
if(node.raw.charAt(0)==="@"){
_56e.jsBuffer.concat(_56e.source.substring(_56e.lastPos,node.start));
_56e.lastPos=node.start+1;
}
}
},ArrayLiteral:function(node,st,c){
var _570=st.compiler,_571=_570.generate;
if(!_571){
_570.jsBuffer.concat(_570.source.substring(_570.lastPos,node.start));
_570.lastPos=node.start;
}
if(!_571){
buffer.concat(" ");
}
if(!node.elements.length){
_570.jsBuffer.concat("objj_msgSend(objj_msgSend(CPArray, \"alloc\"), \"init\")");
}else{
_570.jsBuffer.concat("objj_msgSend(objj_msgSend(CPArray, \"alloc\"), \"initWithObjects:count:\", [");
for(var i=0;i<node.elements.length;i++){
var elt=node.elements[i];
if(i){
_570.jsBuffer.concat(", ");
}
if(!_571){
_570.lastPos=elt.start;
}
c(elt,st,"Expression");
if(!_571){
_570.jsBuffer.concat(_570.source.substring(_570.lastPos,elt.end));
}
}
_570.jsBuffer.concat("], "+node.elements.length+")");
}
if(!_571){
_570.lastPos=node.end;
}
},DictionaryLiteral:function(node,st,c){
var _572=st.compiler,_573=_572.generate;
if(!_573){
_572.jsBuffer.concat(_572.source.substring(_572.lastPos,node.start));
_572.lastPos=node.start;
}
if(!_573){
buffer.concat(" ");
}
if(!node.keys.length){
_572.jsBuffer.concat("objj_msgSend(objj_msgSend(CPDictionary, \"alloc\"), \"init\")");
}else{
_572.jsBuffer.concat("objj_msgSend(objj_msgSend(CPDictionary, \"alloc\"), \"initWithObjectsAndKeys:\"");
for(var i=0;i<node.keys.length;i++){
var key=node.keys[i],_574=node.values[i];
_572.jsBuffer.concat(", ");
if(!_573){
_572.lastPos=_574.start;
}
c(_574,st,"Expression");
if(!_573){
_572.jsBuffer.concat(_572.source.substring(_572.lastPos,_574.end));
}
_572.jsBuffer.concat(", ");
if(!_573){
_572.lastPos=key.start;
}
c(key,st,"Expression");
if(!_573){
_572.jsBuffer.concat(_572.source.substring(_572.lastPos,key.end));
}
}
_572.jsBuffer.concat(")");
}
if(!_573){
_572.lastPos=node.end;
}
},ImportStatement:function(node,st,c){
var _575=st.compiler,_576=_575.generate,_577=_575.jsBuffer;
if(!_576){
_577.concat(_575.source.substring(_575.lastPos,node.start));
}
_577.concat("objj_executeFile(\"");
_577.concat(node.filename.value);
_577.concat(node.localfilepath?"\", YES);":"\", NO);");
if(!_576){
_575.lastPos=node.end;
}
},ClassDeclarationStatement:function(node,st,c){
var _578=st.compiler,_579=_578.generate,_57a,_57b=_578.jsBuffer,_57c=node.classname.name,_57d=new _4bf(st);
_578.imBuffer=new _2ad();
_578.cmBuffer=new _2ad();
_578.classBodyBuffer=new _2ad();
if(!_579){
_57b.concat(_578.source.substring(_578.lastPos,node.start));
}
if(node.superclassname){
_57a=_578.getClassDef(_57c);
if(_57a&&_57a.ivars){
throw _578.error_message("Duplicate class "+_57c,node.classname);
}
if(!_578.getClassDef(node.superclassname.name)){
var _57e="Can't find superclass "+node.superclassname.name;
for(var i=_4d1.importStack.length;--i>=0;){
_57e+="\n"+Array((_4d1.importStack.length-i)*2+1).join(" ")+"Imported by: "+_4d1.importStack[i];
}
throw _578.error_message(_57e,node.superclassname);
}
_57a={"className":_57c,"superClassName":node.superclassname.name,"ivars":Object.create(null),"methods":Object.create(null)};
_57b.concat("{var the_class = objj_allocateClassPair("+node.superclassname.name+", \""+_57c+"\"),\nmeta_class = the_class.isa;");
}else{
if(node.categoryname){
_57a=_578.getClassDef(_57c);
if(!_57a){
throw _578.error_message("Class "+_57c+" not found ",node.classname);
}
_57b.concat("{\nvar the_class = objj_getClass(\""+_57c+"\")\n");
_57b.concat("if(!the_class) throw new SyntaxError(\"*** Could not find definition for class \\\""+_57c+"\\\"\");\n");
_57b.concat("var meta_class = the_class.isa;");
}else{
_57a={"className":_57c,"superClassName":null,"ivars":Object.create(null),"methods":Object.create(null)};
_57b.concat("{var the_class = objj_allocateClassPair(Nil, \""+_57c+"\"),\nmeta_class = the_class.isa;");
}
}
_57d.classDef=_57a;
_578.currentSuperClass="objj_getClass(\""+_57c+"\").super_class";
_578.currentSuperMetaClass="objj_getMetaClass(\""+_57c+"\").super_class";
var _57f=true,_580=false;
if(node.ivardeclarations){
for(var i=0;i<node.ivardeclarations.length;++i){
var _581=node.ivardeclarations[i],_582=_581.ivartype?_581.ivartype.name:null,_583=_581.id.name,ivar={"type":_582,"name":_583};
if(_57f){
_57f=false;
_57b.concat("class_addIvars(the_class, [");
}else{
_57b.concat(", ");
}
if(_578.flags&_4d1.Flags.IncludeTypeSignatures){
_57b.concat("new objj_ivar(\""+_583+"\", \""+_582+"\")");
}else{
_57b.concat("new objj_ivar(\""+_583+"\")");
}
if(_581.outlet){
ivar.outlet=true;
}
_57a.ivars[_583]=ivar;
if(!_57d.ivars){
_57d.ivars=Object.create(null);
}
_57d.ivars[_583]={type:"ivar",name:_583,node:_581.id,ivar:ivar};
if(!_580&&_581.accessors){
_580=true;
}
}
}
if(!_57f){
_57b.concat("]);");
}
if(_580){
var _584=new _2ad();
_584.concat(_578.source.substring(node.start,node.endOfIvars));
_584.concat("\n");
for(var i=0;i<node.ivardeclarations.length;++i){
var _581=node.ivardeclarations[i],_582=_581.ivartype?_581.ivartype.name:null,_583=_581.id.name,_585=_581.accessors;
if(!_585){
continue;
}
var _586=(_585.property&&_585.property.name)||_583,_587=(_585.getter&&_585.getter.name)||_586,_588="- ("+(_582?_582:"id")+")"+_587+"\n{\nreturn "+_583+";\n}\n";
_584.concat(_588);
if(_585.readonly){
continue;
}
var _589=_585.setter?_585.setter.name:null;
if(!_589){
var _58a=_586.charAt(0)=="_"?1:0;
_589=(_58a?"_":"")+"set"+_586.substr(_58a,1).toUpperCase()+_586.substring(_58a+1)+":";
}
var _58b="- (void)"+_589+"("+(_582?_582:"id")+")newValue\n{\n";
if(_585.copy){
_58b+="if ("+_583+" !== newValue)\n"+_583+" = [newValue copy];\n}\n";
}else{
_58b+=_583+" = newValue;\n}\n";
}
_584.concat(_58b);
}
_584.concat("\n@end");
var b=_584.toString().replace(/@accessors(\(.*\))?/g,"");
var _58c=_4d1.compileToIMBuffer(b,"Accessors",_578.flags,_578.classDefs);
_578.imBuffer.concat(_58c);
}
_578.classDefs[_57c]=_57a;
if(node.body.length>0){
if(!_579){
_578.lastPos=node.body[0].start;
}
for(var i=0;i<node.body.length;++i){
var body=node.body[i];
c(body,_57d,"Statement");
}
if(!_579){
_57b.concat(_578.source.substring(_578.lastPos,body.end));
}
}
if(!node.categoryname){
_57b.concat("objj_registerClassPair(the_class);\n");
}
if(_578.imBuffer.isEmpty()){
_57b.concat("class_addMethods(the_class, [");
_57b.atoms.push.apply(_57b.atoms,_578.imBuffer.atoms);
_57b.concat("]);\n");
}
if(_578.cmBuffer.isEmpty()){
_57b.concat("class_addMethods(meta_class, [");
_57b.atoms.push.apply(_57b.atoms,_578.cmBuffer.atoms);
_57b.concat("]);\n");
}
_57b.concat("}");
_578.jsBuffer=_57b;
if(!_579){
_578.lastPos=node.end;
}
},MethodDeclarationStatement:function(node,st,c){
var _58d=st.compiler,_58e=_58d.generate,_58f=_58d.jsBuffer,_590=new _4bf(st),_591=node.selectors,_592=node.arguments,_593=[node.returntype?node.returntype.name:"id"],_594=_591[0].name;
if(!_58e){
_58f.concat(_58d.source.substring(_58d.lastPos,node.start));
}
_58d.jsBuffer=node.methodtype==="-"?_58d.imBuffer:_58d.cmBuffer;
for(var i=0;i<_592.length;i++){
if(i===0){
_594+=":";
}else{
_594+=(_591[i]?_591[i].name:"")+":";
}
}
if(_58d.jsBuffer.isEmpty()){
_58d.jsBuffer.concat(", ");
}
_58d.jsBuffer.concat("new objj_method(sel_getUid(\"");
_58d.jsBuffer.concat(_594);
_58d.jsBuffer.concat("\"), function");
if(_58d.flags&_4d1.Flags.IncludeDebugSymbols){
_58d.jsBuffer.concat(" $"+st.currentClassName()+"__"+_594.replace(/:/g,"_"));
}
_58d.jsBuffer.concat("(self, _cmd");
_590.methodType=node.methodtype;
if(_592){
for(var i=0;i<_592.length;i++){
var _595=_592[i],_596=_595.identifier.name;
_58d.jsBuffer.concat(", ");
_58d.jsBuffer.concat(_596);
_593.push(_595.type?_595.type.name:null);
_590.vars[_596]={type:"method argument",node:_595};
}
}
_58d.jsBuffer.concat(")\n");
if(!_58e){
_58d.lastPos=node.startOfBody;
}
_508+=_507;
c(node.body,_590,"Statement");
_508=_508.substring(_506);
if(!_58e){
_58d.jsBuffer.concat(_58d.source.substring(_58d.lastPos,node.body.end));
}
_58d.jsBuffer.concat("\n");
if(_58d.flags&_4d1.Flags.IncludeDebugSymbols){
_58d.jsBuffer.concat(","+JSON.stringify(_593));
}
_58d.jsBuffer.concat(")");
_58d.jsBuffer=_58f;
if(!_58e){
_58d.lastPos=node.end;
}
},MessageSendExpression:function(node,st,c){
var _597=st.compiler,_598=_597.generate,_599=_597.jsBuffer;
if(!_598){
_599.concat(_597.source.substring(_597.lastPos,node.start));
_597.lastPos=node.object?node.object.start:node.arguments.length?node.arguments[0].start:node.end;
}
if(node.superObject){
if(!_598){
_599.concat(" ");
}
_599.concat("objj_msgSendSuper(");
_599.concat("{ receiver:self, super_class:"+(st.currentMethodType()==="+"?_597.currentSuperMetaClass:_597.currentSuperClass)+" }");
}else{
if(!_598){
_599.concat(" ");
}
_599.concat("objj_msgSend(");
c(node.object,st,"Expression");
if(!_598){
_599.concat(_597.source.substring(_597.lastPos,node.object.end));
}
}
var _59a=node.selectors,_59b=node.arguments,_59c=_59a[0],_59d=_59c?_59c.name:"";
for(var i=0;i<_59b.length;i++){
if(i===0){
_59d+=":";
}else{
_59d+=(_59a[i]?_59a[i].name:"")+":";
}
}
_599.concat(", \"");
_599.concat(_59d);
_599.concat("\"");
if(node.arguments){
for(var i=0;i<node.arguments.length;i++){
var _59e=node.arguments[i];
_599.concat(", ");
if(!_598){
_597.lastPos=_59e.start;
}
c(_59e,st,"Expression");
if(!_598){
_599.concat(_597.source.substring(_597.lastPos,_59e.end));
_597.lastPos=_59e.end;
}
}
}
if(node.parameters){
for(var i=0;i<node.parameters.length;++i){
var _59f=node.parameters[i];
_599.concat(", ");
if(!_598){
_597.lastPos=_59f.start;
}
c(_59f,st,"Expression");
if(!_598){
_599.concat(_597.source.substring(_597.lastPos,_59f.end));
_597.lastPos=_59f.end;
}
}
}
_599.concat(")");
if(!_598){
_597.lastPos=node.end;
}
},SelectorLiteralExpression:function(node,st,c){
var _5a0=st.compiler,_5a1=_5a0.jsBuffer,_5a2=_5a0.generate;
if(!_5a2){
_5a1.concat(_5a0.source.substring(_5a0.lastPos,node.start));
_5a1.concat(" ");
}
_5a1.concat("sel_getUid(\"");
_5a1.concat(node.selector);
_5a1.concat("\")");
if(!_5a2){
_5a0.lastPos=node.end;
}
},Reference:function(node,st,c){
var _5a3=st.compiler,_5a4=_5a3.jsBuffer,_5a5=_5a3.generate;
if(!_5a5){
_5a4.concat(_5a3.source.substring(_5a3.lastPos,node.start));
_5a4.concat(" ");
}
_5a4.concat("function(__input) { if (arguments.length) return ");
_5a4.concat(node.element.name);
_5a4.concat(" = __input; return ");
_5a4.concat(node.element.name);
_5a4.concat("; }");
if(!_5a5){
_5a3.lastPos=node.end;
}
},Dereference:function(node,st,c){
var _5a6=st.compiler,_5a7=_5a6.generate;
_4f9(st,node.expr);
if(!_5a7){
_5a6.jsBuffer.concat(_5a6.source.substring(_5a6.lastPos,node.start));
_5a6.lastPos=node.expr.start;
}
c(node.expr,st,"Expression");
if(!_5a7){
_5a6.jsBuffer.concat(_5a6.source.substring(_5a6.lastPos,node.expr.end));
}
_5a6.jsBuffer.concat("()");
if(!_5a7){
_5a6.lastPos=node.end;
}
},ClassStatement:function(node,st,c){
var _5a8=st.compiler;
if(!_5a8.generate){
_5a8.jsBuffer.concat(_5a8.source.substring(_5a8.lastPos,node.start));
_5a8.lastPos=node.start;
_5a8.jsBuffer.concat("//");
}
var _5a9=node.id.name;
if(!_5a8.getClassDef(_5a9)){
classDef={"className":_5a9};
_5a8.classDefs[_5a9]=classDef;
}
st.vars[node.id.name]={type:"class",node:node.id};
},GlobalStatement:function(node,st,c){
var _5aa=st.compiler;
if(!_5aa.generate){
_5aa.jsBuffer.concat(_5aa.source.substring(_5aa.lastPos,node.start));
_5aa.lastPos=node.start;
_5aa.jsBuffer.concat("//");
}
st.rootScope().vars[node.id.name]={type:"global",node:node.id};
},PreprocessStatement:function(node,st,c){
var _5ab=st.compiler;
if(!_5ab.generate){
_5ab.jsBuffer.concat(_5ab.source.substring(_5ab.lastPos,node.start));
_5ab.lastPos=node.start;
_5ab.jsBuffer.concat("//");
}
}});
function _2eb(aURL,_5ac){
this._URL=aURL;
this._isLocal=_5ac;
};
_2.FileDependency=_2eb;
_2eb.prototype.URL=function(){
return this._URL;
};
_2eb.prototype.isLocal=function(){
return this._isLocal;
};
_2eb.prototype.toMarkedString=function(){
var _5ad=this.URL().absoluteString();
return (this.isLocal()?_233:_232)+";"+_5ad.length+";"+_5ad;
};
_2eb.prototype.toString=function(){
return (this.isLocal()?"LOCAL: ":"STD: ")+this.URL();
};
var _5ae=0,_5af=1,_5b0=2,_5b1=0;
function _2bc(_5b2,_5b3,aURL,_5b4,_5b5,_5b6){
if(arguments.length===0){
return this;
}
this._code=_5b2;
this._function=_5b4||null;
this._URL=_1cd(aURL||new CFURL("(Anonymous"+(_5b1++)+")"));
this._compiler=_5b5||null;
this._fileDependencies=_5b3;
this._filenameTranslateDictionary=_5b6;
if(_5b3.length){
this._fileDependencyStatus=_5ae;
this._fileDependencyCallbacks=[];
}else{
this._fileDependencyStatus=_5b0;
}
if(this._function){
return;
}
if(!_5b5){
this.setCode(_5b2);
}
};
_2.Executable=_2bc;
_2bc.prototype.path=function(){
return this.URL().path();
};
_2bc.prototype.URL=function(){
return this._URL;
};
_2bc.prototype.functionParameters=function(){
var _5b7=["global","objj_executeFile","objj_importFile"];
return _5b7;
};
_2bc.prototype.functionArguments=function(){
var _5b8=[_1,this.fileExecuter(),this.fileImporter()];
return _5b8;
};
_2bc.prototype.execute=function(){
if(this._compiler){
var _5b9=this.fileDependencies(),_9d=0,_5ba=_5b9.length;
this._compiler.pushImport(this.URL().lastPathComponent());
for(;_9d<_5ba;++_9d){
var _5bb=_5b9[_9d],_5bc=_5bb.isLocal(),URL=_5bb.URL();
this.fileExecuter()(URL,_5bc);
}
this._compiler.popImport();
this.setCode(this._compiler.compilePass2());
this._compiler=null;
}
var _5bd=_5be;
_5be=CFBundle.bundleContainingURL(this.URL());
var _5bf=this._function.apply(_1,this.functionArguments());
_5be=_5bd;
return _5bf;
};
_2bc.prototype.code=function(){
return this._code;
};
_2bc.prototype.setCode=function(code){
this._code=code;
var _5c0=this.functionParameters().join(",");
this._function=new Function(_5c0,code);
};
_2bc.prototype.fileDependencies=function(){
return this._fileDependencies;
};
_2bc.prototype.hasLoadedFileDependencies=function(){
return this._fileDependencyStatus===_5b0;
};
var _5c1=0,_5c2=[],_5c3={};
_2bc.prototype.loadFileDependencies=function(_5c4){
var _5c5=this._fileDependencyStatus;
if(_5c4){
if(_5c5===_5b0){
return _5c4();
}
this._fileDependencyCallbacks.push(_5c4);
}
if(_5c5===_5ae){
if(_5c1){
throw "Can't load";
}
_5c6(this);
}
};
function _5c6(_5c7){
_5c2.push(_5c7);
_5c7._fileDependencyStatus=_5af;
var _5c8=_5c7.fileDependencies(),_9d=0,_5c9=_5c8.length,_5ca=_5c7.referenceURL(),_5cb=_5ca.absoluteString(),_5cc=_5c7.fileExecutableSearcher();
_5c1+=_5c9;
for(;_9d<_5c9;++_9d){
var _5cd=_5c8[_9d],_5ce=_5cd.isLocal(),URL=_5cd.URL(),_5cf=(_5ce&&(_5cb+" ")||"")+URL;
if(_5c3[_5cf]){
if(--_5c1===0){
_5d0();
}
continue;
}
_5c3[_5cf]=YES;
_5cc(URL,_5ce,_5d1);
}
};
function _5d1(_5d2){
--_5c1;
if(_5d2._fileDependencyStatus===_5ae){
_5c6(_5d2);
}else{
if(_5c1===0){
_5d0();
}
}
};
function _5d0(){
var _5d3=_5c2,_9d=0,_5d4=_5d3.length;
_5c2=[];
for(;_9d<_5d4;++_9d){
_5d3[_9d]._fileDependencyStatus=_5b0;
}
for(_9d=0;_9d<_5d4;++_9d){
var _5d5=_5d3[_9d],_5d6=_5d5._fileDependencyCallbacks,_5d7=0,_5d8=_5d6.length;
for(;_5d7<_5d8;++_5d7){
_5d6[_5d7]();
}
_5d5._fileDependencyCallbacks=[];
}
};
_2bc.prototype.referenceURL=function(){
if(this._referenceURL===_2f){
this._referenceURL=new CFURL(".",this.URL());
}
return this._referenceURL;
};
_2bc.prototype.fileImporter=function(){
return _2bc.fileImporterForURL(this.referenceURL());
};
_2bc.prototype.fileExecuter=function(){
return _2bc.fileExecuterForURL(this.referenceURL());
};
_2bc.prototype.fileExecutableSearcher=function(){
return _2bc.fileExecutableSearcherForURL(this.referenceURL());
};
var _5d9={};
_2bc.fileExecuterForURL=function(aURL){
var _5da=_1cd(aURL),_5db=_5da.absoluteString(),_5dc=_5d9[_5db];
if(!_5dc){
_5dc=function(aURL,_5dd,_5de){
_2bc.fileExecutableSearcherForURL(_5da)(aURL,_5dd,function(_5df){
if(!_5df.hasLoadedFileDependencies()){
throw "No executable loaded for file at URL "+aURL;
}
_5df.execute(_5de);
});
};
_5d9[_5db]=_5dc;
}
return _5dc;
};
var _5e0={};
_2bc.fileImporterForURL=function(aURL){
var _5e1=_1cd(aURL),_5e2=_5e1.absoluteString(),_5e3=_5e0[_5e2];
if(!_5e3){
_5e3=function(aURL,_5e4,_5e5){
_169();
_2bc.fileExecutableSearcherForURL(_5e1)(aURL,_5e4,function(_5e6){
_5e6.loadFileDependencies(function(){
_5e6.execute();
_16a();
if(_5e5){
_5e5();
}
});
});
};
_5e0[_5e2]=_5e3;
}
return _5e3;
};
var _5e7={},_5e8={};
function _24b(x){
var _5e9=0;
for(var k in x){
if(x.hasOwnProperty(k)){
++_5e9;
}
}
return _5e9;
};
_2bc.resetCachedFileExecutableSearchers=function(){
_5e7={};
_5e8={};
_5e0={};
_5d9={};
_5c3={};
};
_2bc.fileExecutableSearcherForURL=function(_5ea){
var _5eb=_5ea.absoluteString(),_5ec=_5e7[_5eb],_5ed=_2bc.filenameTranslateDictionary?_2bc.filenameTranslateDictionary():null;
cachedSearchResults={};
if(!_5ec){
_5ec=function(aURL,_5ee,_5ef){
var _5f0=(_5ee&&_5ea||"")+aURL,_5f1=_5e8[_5f0];
if(_5f1){
return _5f2(_5f1);
}
var _5f3=(aURL instanceof CFURL)&&aURL.scheme();
if(_5ee||_5f3){
if(!_5f3){
aURL=new CFURL(aURL,_5ea);
}
_1b9.resolveResourceAtURL(aURL,NO,_5f2,_5ed);
}else{
_1b9.resolveResourceAtURLSearchingIncludeURLs(aURL,_5f2);
}
function _5f2(_5f4){
if(!_5f4){
var _5f5=_4d1?_4d1.currentCompileFile:null;
throw new Error("Could not load file at "+aURL+(_5f5?" when compiling "+_5f5:""));
}
_5e8[_5f0]=_5f4;
_5ef(new _5f6(_5f4.URL(),_5ed));
};
};
_5e7[_5eb]=_5ec;
}
return _5ec;
};
var _5f7={};
function _5f6(aURL,_5f8){
aURL=_1cd(aURL);
var _5f9=aURL.absoluteString(),_5fa=_5f7[_5f9];
if(_5fa){
return _5fa;
}
_5f7[_5f9]=this;
var _5fb=_1b9.resourceAtURL(aURL).contents(),_5fc=NULL,_5fd=aURL.pathExtension().toLowerCase();
if(_5fb.match(/^@STATIC;/)){
_5fc=_5fe(_5fb,aURL);
}else{
if((_5fd==="j"||!_5fd)&&!_5fb.match(/^{/)){
_5fc=_2.ObjJAcornCompiler.compileFileDependencies(_5fb,aURL,_4d1.Flags.IncludeDebugSymbols);
}else{
_5fc=new _2bc(_5fb,[],aURL);
}
}
_2bc.apply(this,[_5fc.code(),_5fc.fileDependencies(),aURL,_5fc._function,_5fc._compiler,_5f8]);
this._hasExecuted=NO;
};
_2.FileExecutable=_5f6;
_5f6.prototype=new _2bc();
_5f6.resetFileExecutables=function(){
_5f7={};
_5ff={};
};
_5f6.prototype.execute=function(_600){
if(this._hasExecuted&&!_600){
return;
}
this._hasExecuted=YES;
_2bc.prototype.execute.call(this);
};
_5f6.prototype.hasExecuted=function(){
return this._hasExecuted;
};
function _5fe(_601,aURL){
var _602=new _118(_601);
var _603=NULL,code="",_604=[];
while(_603=_602.getMarker()){
var text=_602.getString();
if(_603===_231){
code+=text;
}else{
if(_603===_232){
_604.push(new _2eb(new CFURL(text),NO));
}else{
if(_603===_233){
_604.push(new _2eb(new CFURL(text),YES));
}
}
}
}
var fn=_5f6._lookupCachedFunction(aURL);
if(fn){
return new _2bc(code,_604,aURL,fn);
}
return new _2bc(code,_604,aURL);
};
var _5ff={};
_5f6._cacheFunction=function(aURL,fn){
aURL=typeof aURL==="string"?aURL:aURL.absoluteString();
_5ff[aURL]=fn;
};
_5f6._lookupCachedFunction=function(aURL){
aURL=typeof aURL==="string"?aURL:aURL.absoluteString();
return _5ff[aURL];
};
var _605=1,_606=2,_607=4,_608=8;
objj_ivar=function(_609,_60a){
this.name=_609;
this.type=_60a;
};
objj_method=function(_60b,_60c,_60d){
this.name=_60b;
this.method_imp=_60c;
this.types=_60d;
};
objj_class=function(_60e){
this.isa=NULL;
this.version=0;
this.super_class=NULL;
this.sub_classes=[];
this.name=NULL;
this.info=0;
this.ivar_list=[];
this.ivar_store=function(){
};
this.ivar_dtable=this.ivar_store.prototype;
this.method_list=[];
this.method_store=function(){
};
this.method_dtable=this.method_store.prototype;
this.allocator=function(){
};
this._UID=-1;
};
objj_object=function(){
this.isa=NULL;
this._UID=-1;
};
class_getName=function(_60f){
if(_60f==Nil){
return "";
}
return _60f.name;
};
class_isMetaClass=function(_610){
if(!_610){
return NO;
}
return ((_610.info&(_606)));
};
class_getSuperclass=function(_611){
if(_611==Nil){
return Nil;
}
return _611.super_class;
};
class_setSuperclass=function(_612,_613){
_612.super_class=_613;
_612.isa.super_class=_613.isa;
};
class_addIvar=function(_614,_615,_616){
var _617=_614.allocator.prototype;
if(typeof _617[_615]!="undefined"){
return NO;
}
var ivar=new objj_ivar(_615,_616);
_614.ivar_list.push(ivar);
_614.ivar_dtable[_615]=ivar;
_617[_615]=NULL;
return YES;
};
class_addIvars=function(_618,_619){
var _61a=0,_61b=_619.length,_61c=_618.allocator.prototype;
for(;_61a<_61b;++_61a){
var ivar=_619[_61a],name=ivar.name;
if(typeof _61c[name]==="undefined"){
_618.ivar_list.push(ivar);
_618.ivar_dtable[name]=ivar;
_61c[name]=NULL;
}
}
};
class_copyIvarList=function(_61d){
return _61d.ivar_list.slice(0);
};
class_addMethod=function(_61e,_61f,_620,_621){
var _622=new objj_method(_61f,_620,_621);
_61e.method_list.push(_622);
_61e.method_dtable[_61f]=_622;
if(!((_61e.info&(_606)))&&(((_61e.info&(_606)))?_61e:_61e.isa).isa===(((_61e.info&(_606)))?_61e:_61e.isa)){
class_addMethod((((_61e.info&(_606)))?_61e:_61e.isa),_61f,_620,_621);
}
return YES;
};
class_addMethods=function(_623,_624){
var _625=0,_626=_624.length,_627=_623.method_list,_628=_623.method_dtable;
for(;_625<_626;++_625){
var _629=_624[_625];
_627.push(_629);
_628[_629.name]=_629;
}
if(!((_623.info&(_606)))&&(((_623.info&(_606)))?_623:_623.isa).isa===(((_623.info&(_606)))?_623:_623.isa)){
class_addMethods((((_623.info&(_606)))?_623:_623.isa),_624);
}
};
class_getInstanceMethod=function(_62a,_62b){
if(!_62a||!_62b){
return NULL;
}
var _62c=_62a.method_dtable[_62b];
return _62c?_62c:NULL;
};
class_getInstanceVariable=function(_62d,_62e){
if(!_62d||!_62e){
return NULL;
}
var _62f=_62d.ivar_dtable[_62e];
return _62f;
};
class_getClassMethod=function(_630,_631){
if(!_630||!_631){
return NULL;
}
var _632=(((_630.info&(_606)))?_630:_630.isa).method_dtable[_631];
return _632?_632:NULL;
};
class_respondsToSelector=function(_633,_634){
return class_getClassMethod(_633,_634)!=NULL;
};
class_copyMethodList=function(_635){
return _635.method_list.slice(0);
};
class_getVersion=function(_636){
return _636.version;
};
class_setVersion=function(_637,_638){
_637.version=parseInt(_638,10);
};
class_replaceMethod=function(_639,_63a,_63b){
if(!_639||!_63a){
return NULL;
}
var _63c=_639.method_dtable[_63a],_63d=NULL;
if(_63c){
_63d=_63c.method_imp;
}
_63c.method_imp=_63b;
return _63d;
};
var _63e=function(_63f){
var meta=(((_63f.info&(_606)))?_63f:_63f.isa);
if((_63f.info&(_606))){
_63f=objj_getClass(_63f.name);
}
if(_63f.super_class&&!((((_63f.super_class.info&(_606)))?_63f.super_class:_63f.super_class.isa).info&(_607))){
_63e(_63f.super_class);
}
if(!(meta.info&(_607))&&!(meta.info&(_608))){
meta.info=(meta.info|(_608))&~(0);
objj_msgSend(_63f,"initialize");
meta.info=(meta.info|(_607))&~(_608);
}
};
var _640=function(self,_641){
var isa=self.isa,_642=isa.method_dtable[_643];
if(_642){
var _644=_642.method_imp.call(this,self,_643,_641);
if(_644&&_644!==self){
arguments[0]=_644;
return objj_msgSend.apply(this,arguments);
}
}
_642=isa.method_dtable[_645];
if(_642){
var _646=isa.method_dtable[_647];
if(_646){
var _648=_642.method_imp.call(this,self,_645,_641);
if(_648){
var _649=objj_lookUpClass("CPInvocation");
if(_649){
var _64a=objj_msgSend(_649,_64b,_648),_9d=0,_64c=arguments.length;
for(;_9d<_64c;++_9d){
objj_msgSend(_64a,_64d,arguments[_9d],_9d);
}
_646.method_imp.call(this,self,_647,_64a);
return objj_msgSend(_64a,_64e);
}
}
}
}
_642=isa.method_dtable[_64f];
if(_642){
return _642.method_imp.call(this,self,_64f,_641);
}
throw class_getName(isa)+" does not implement doesNotRecognizeSelector:. Did you forget a superclass for "+class_getName(isa)+"?";
};
class_getMethodImplementation=function(_650,_651){
if(!((((_650.info&(_606)))?_650:_650.isa).info&(_607))){
_63e(_650);
}
var _652=_650.method_dtable[_651];
var _653=_652?_652.method_imp:_640;
return _653;
};
var _654={};
objj_allocateClassPair=function(_655,_656){
var _657=new objj_class(_656),_658=new objj_class(_656),_659=_657;
if(_655){
_659=_655;
while(_659.superclass){
_659=_659.superclass;
}
_657.allocator.prototype=new _655.allocator;
_657.ivar_dtable=_657.ivar_store.prototype=new _655.ivar_store;
_657.method_dtable=_657.method_store.prototype=new _655.method_store;
_658.method_dtable=_658.method_store.prototype=new _655.isa.method_store;
_657.super_class=_655;
_658.super_class=_655.isa;
}else{
_657.allocator.prototype=new objj_object();
}
_657.isa=_658;
_657.name=_656;
_657.info=_605;
_657._UID=objj_generateObjectUID();
_658.isa=_659.isa;
_658.name=_656;
_658.info=_606;
_658._UID=objj_generateObjectUID();
return _657;
};
var _5be=nil;
objj_registerClassPair=function(_65a){
_1[_65a.name]=_65a;
_654[_65a.name]=_65a;
_1d4(_65a,_5be);
};
objj_resetRegisterClasses=function(){
for(var key in _654){
delete _1[key];
}
_654={};
_1d7();
};
class_createInstance=function(_65b){
if(!_65b){
throw new Error("*** Attempting to create object with Nil class.");
}
var _65c=new _65b.allocator();
_65c.isa=_65b;
_65c._UID=objj_generateObjectUID();
return _65c;
};
var _65d=function(){
};
_65d.prototype.member=false;
with(new _65d()){
member=true;
}
if(new _65d().member){
var _65e=class_createInstance;
class_createInstance=function(_65f){
var _660=_65e(_65f);
if(_660){
var _661=_660.isa,_662=_661;
while(_661){
var _663=_661.ivar_list,_664=_663.length;
while(_664--){
_660[_663[_664].name]=NULL;
}
_661=_661.super_class;
}
_660.isa=_662;
}
return _660;
};
}
object_getClassName=function(_665){
if(!_665){
return "";
}
var _666=_665.isa;
return _666?class_getName(_666):"";
};
objj_lookUpClass=function(_667){
var _668=_654[_667];
return _668?_668:Nil;
};
objj_getClass=function(_669){
var _66a=_654[_669];
if(!_66a){
}
return _66a?_66a:Nil;
};
objj_getClassList=function(_66b,_66c){
for(var _66d in _654){
_66b.push(_654[_66d]);
if(_66c&&--_66c===0){
break;
}
}
return _66b.length;
};
objj_getMetaClass=function(_66e){
var _66f=objj_getClass(_66e);
return (((_66f.info&(_606)))?_66f:_66f.isa);
};
ivar_getName=function(_670){
return _670.name;
};
ivar_getTypeEncoding=function(_671){
return _671.type;
};
objj_msgSend=function(_672,_673){
if(_672==nil){
return nil;
}
var isa=_672.isa;
if(!((((isa.info&(_606)))?isa:isa.isa).info&(_607))){
_63e(isa);
}
var _674=isa.method_dtable[_673];
var _675=_674?_674.method_imp:_640;
switch(arguments.length){
case 2:
return _675(_672,_673);
case 3:
return _675(_672,_673,arguments[2]);
case 4:
return _675(_672,_673,arguments[2],arguments[3]);
}
return _675.apply(_672,arguments);
};
objj_msgSendSuper=function(_676,_677){
var _678=_676.super_class;
arguments[0]=_676.receiver;
if(!((((_678.info&(_606)))?_678:_678.isa).info&(_607))){
_63e(_678);
}
var _679=_678.method_dtable[_677];
var _67a=_679?_679.method_imp:_640;
return _67a.apply(_676.receiver,arguments);
};
method_getName=function(_67b){
return _67b.name;
};
method_getImplementation=function(_67c){
return _67c.method_imp;
};
method_setImplementation=function(_67d,_67e){
var _67f=_67d.method_imp;
_67d.method_imp=_67e;
return _67f;
};
method_exchangeImplementations=function(lhs,rhs){
var _680=method_getImplementation(lhs),_681=method_getImplementation(rhs);
method_setImplementation(lhs,_681);
method_setImplementation(rhs,_680);
};
sel_getName=function(_682){
return _682?_682:"<null selector>";
};
sel_getUid=function(_683){
return _683;
};
sel_isEqual=function(lhs,rhs){
return lhs===rhs;
};
sel_registerName=function(_684){
return _684;
};
objj_class.prototype.toString=objj_object.prototype.toString=function(){
var isa=this.isa;
if(class_getInstanceMethod(isa,_685)){
return objj_msgSend(this,_685);
}
if(class_isMetaClass(isa)){
return this.name;
}
return "["+isa.name+" Object](-description not implemented)";
};
var _685=sel_getUid("description"),_643=sel_getUid("forwardingTargetForSelector:"),_645=sel_getUid("methodSignatureForSelector:"),_647=sel_getUid("forwardInvocation:"),_64f=sel_getUid("doesNotRecognizeSelector:"),_64b=sel_getUid("invocationWithMethodSignature:"),_686=sel_getUid("setTarget:"),_687=sel_getUid("setSelector:"),_64d=sel_getUid("setArgument:atIndex:"),_64e=sel_getUid("returnValue");
objj_eval=function(_688){
var url=_2.pageURL;
var _689=_2.asyncLoader;
_2.asyncLoader=NO;
var _68a=_2.preprocess(_688,url,0);
if(!_68a.hasLoadedFileDependencies()){
_68a.loadFileDependencies();
}
_1._objj_eval_scope={};
_1._objj_eval_scope.objj_executeFile=_2bc.fileExecuterForURL(url);
_1._objj_eval_scope.objj_importFile=_2bc.fileImporterForURL(url);
var code="with(_objj_eval_scope){"+_68a._code+"\n//*/\n}";
var _68b;
_68b=eval(code);
_2.asyncLoader=_689;
return _68b;
};
_2.objj_eval=objj_eval;
_169();
var _68c=new CFURL(window.location.href),_68d=document.getElementsByTagName("base"),_68e=_68d.length;
if(_68e>0){
var _68f=_68d[_68e-1],_690=_68f&&_68f.getAttribute("href");
if(_690){
_68c=new CFURL(_690,_68c);
}
}
var _691=new CFURL(window.OBJJ_MAIN_FILE||"main.j"),_1d3=new CFURL(".",new CFURL(_691,_68c)).absoluteURL(),_692=new CFURL("..",_1d3).absoluteURL();
if(_1d3===_692){
_692=new CFURL(_692.schemeAndAuthority());
}
_1b9.resourceAtURL(_692,YES);
_2.pageURL=_68c;
_2.bootstrap=function(){
_693();
};
function _693(){
_1b9.resolveResourceAtURL(_1d3,YES,function(_694){
var _695=_1b9.includeURLs(),_9d=0,_696=_695.length;
for(;_9d<_696;++_9d){
_694.resourceAtURL(_695[_9d],YES);
}
_2bc.fileImporterForURL(_1d3)(_691.lastPathComponent(),YES,function(){
_16a();
_69c(function(){
var _697=window.location.hash.substring(1),args=[];
if(_697.length){
args=_697.split("/");
for(var i=0,_696=args.length;i<_696;i++){
args[i]=decodeURIComponent(args[i]);
}
}
var _698=window.location.search.substring(1).split("&"),_699=new CFMutableDictionary();
for(var i=0,_696=_698.length;i<_696;i++){
var _69a=_698[i].split("=");
if(!_69a[0]){
continue;
}
if(_69a[1]==null){
_69a[1]=true;
}
_699.setValueForKey(decodeURIComponent(_69a[0]),decodeURIComponent(_69a[1]));
}
main(args,_699);
});
});
});
};
var _69b=NO;
function _69c(_69d){
if(_69b||document.readyState==="complete"){
return _69d();
}
if(window.addEventListener){
window.addEventListener("load",_69d,NO);
}else{
if(window.attachEvent){
window.attachEvent("onload",_69d);
}
}
};
_69c(function(){
_69b=YES;
});
if(typeof OBJJ_AUTO_BOOTSTRAP==="undefined"||OBJJ_AUTO_BOOTSTRAP){
_2.bootstrap();
}
function _1cd(aURL){
if(aURL instanceof CFURL&&aURL.scheme()){
return aURL;
}
return new CFURL(aURL,_1d3);
};
objj_importFile=_2bc.fileImporterForURL(_1d3);
objj_executeFile=_2bc.fileExecuterForURL(_1d3);
objj_import=function(){
CPLog.warn("objj_import is deprecated, use objj_importFile instead");
objj_importFile.apply(this,arguments);
};
})(window,ObjectiveJ);
