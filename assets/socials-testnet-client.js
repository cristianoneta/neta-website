var NetaSocialsTestnet=(()=>{var oK=Object.create;var Rp=Object.defineProperty;var aK=Object.getOwnPropertyDescriptor;var sK=Object.getOwnPropertyNames;var dK=Object.getPrototypeOf,cK=Object.prototype.hasOwnProperty;var uK=(e,n,t)=>()=>{if(t)throw t[0];try{return e&&(n=e(e=0)),n}catch(i){throw t=[i],i}};var I=(e,n)=>()=>{try{return n||e((n={exports:{}}).exports,n),n.exports}catch(t){throw n=0,t}},ZU=(e,n)=>{for(var t in n)Rp(e,t,{get:n[t],enumerable:!0})},XU=(e,n,t,i)=>{if(n&&typeof n=="object"||typeof n=="function")for(let r of sK(n))!cK.call(e,r)&&r!==t&&Rp(e,r,{get:()=>n[r],enumerable:!(i=aK(n,r))||i.enumerable});return e};var $U=(e,n,t)=>(t=e!=null?oK(dK(e)):{},XU(n||!e||!e.__esModule?Rp(t,"default",{value:e,enumerable:!0}):t,e)),jU=e=>XU(Rp({},"__esModule",{value:!0}),e);var nT=I(bp=>{"use strict";Object.defineProperty(bp,"__esModule",{value:!0});bp.Decimal=void 0;var eT=100,CB=class e{static fromUserInput(n,t){if(e.verifyFractionalDigits(t),n==="")return e.zero(t);let i,r;n.startsWith("-")?(i=n.substring(1),r=2):(i=n,r=1);let o=i.match(/[^0-9.]/);if(o)throw new Error(`Invalid character at position ${o.index+r}`);let a,s;if(n.search(/\./)===-1)a=n,s="";else{let u=n.split(".");switch(u.length){case 0:case 1:throw new Error("Fewer than two elements in split result. This must not happen here.");case 2:if(!u[1])throw new Error("Fractional part missing");a=u[0],s=u[1].replace(/0+$/,"");break;default:throw new Error("More than one separator found")}}if(s.length>t)throw new Error("Got more fractional digits than supported");let d=BigInt(`${a}${s.padEnd(t,"0")}`);return new e(d,t)}static fromAtomics(n,t){if(typeof n=="string"){if(!n.match(/^-?[0-9]+$/))throw new Error("Invalid string format. Only integers in decimal representation supported.");return e.fromAtomics(BigInt(n),t)}return e.verifyFractionalDigits(t),new e(n,t)}static zero(n){return e.verifyFractionalDigits(n),new e(0n,n)}static one(n){return e.verifyFractionalDigits(n),new e(10n**BigInt(n),n)}static verifyFractionalDigits(n){if(!Number.isInteger(n))throw new Error("Fractional digits is not an integer");if(n<0)throw new Error("Fractional digits must not be negative");if(n>eT)throw new Error(`Fractional digits must not exceed ${eT}`)}static compare(n,t){if(n.fractionalDigits!==t.fractionalDigits)throw new Error("Fractional digits do not match");let i=n.data.atomics-t.data.atomics;return i<0n?-1:i>0n?1:0}get atomics(){return this.data.atomics.toString()}get fractionalDigits(){return this.data.fractionalDigits}data;constructor(n,t){this.data={atomics:n,fractionalDigits:t}}clone(){return new e(this.data.atomics,this.data.fractionalDigits)}floor(){if(this.isNegative())return this.neg().ceil().neg();let n=10n**BigInt(this.data.fractionalDigits),t=this.data.atomics/n;return this.data.atomics%n===0n?this.clone():new e(t*n,this.fractionalDigits)}ceil(){if(this.isNegative())return this.neg().floor().neg();let n=10n**BigInt(this.data.fractionalDigits),t=this.data.atomics/n;return this.data.atomics%n===0n?this.clone():new e((t+1n)*n,this.fractionalDigits)}adjustFractionalDigits(n){e.verifyFractionalDigits(n);let t=n-this.fractionalDigits;return t>0?new e(this.data.atomics*10n**BigInt(t),n):t===0?this.clone():new e(this.data.atomics/10n**BigInt(-t),n)}toString(){if(this.isNegative())return"-"+this.neg().toString();let n=10n**BigInt(this.data.fractionalDigits),t=this.data.atomics/n,i=this.data.atomics%n;if(i===0n)return t.toString();{let o=i.toString().padStart(this.data.fractionalDigits,"0").replace(/0+$/,"");return`${t.toString()}.${o}`}}toFloatApproximation(){let n=Number(this.toString());if(Number.isNaN(n))throw new Error("Conversion to number failed");return n}plus(n){if(this.fractionalDigits!==n.fractionalDigits)throw new Error("Fractional digits do not match");let t=this.data.atomics+n.data.atomics;return new e(t,this.fractionalDigits)}minus(n){if(this.fractionalDigits!==n.fractionalDigits)throw new Error("Fractional digits do not match");let t=this.data.atomics-n.data.atomics;return new e(t,this.fractionalDigits)}multiply(n){let t=this.data.atomics*n.toBigInt();return new e(t,this.fractionalDigits)}neg(){return new e(-this.data.atomics,this.data.fractionalDigits)}abs(){return this.isNegative()?this.neg():this.clone()}equals(n){return e.compare(this,n)===0}isNegative(){return this.data.atomics<0n}isLessThan(n){return e.compare(this,n)<0}isLessThanOrEqual(n){return e.compare(this,n)<=0}isGreaterThan(n){return e.compare(this,n)>0}isGreaterThanOrEqual(n){return e.compare(this,n)>=0}};bp.Decimal=CB});var tT=I(ws=>{"use strict";Object.defineProperty(ws,"__esModule",{value:!0});ws.Uint64=ws.Uint53=ws.Int53=ws.Uint32=void 0;var AK=18446744073709551615n,SB=class e{static fromBigEndianBytes(n){return e.fromBytes(n)}static fromBytes(n,t="be"){if(n.length!==4)throw new Error("Invalid input length. Expected 4 bytes.");for(let r=0;r<n.length;++r)if(!Number.isInteger(n[r])||n[r]>255||n[r]<0)throw new Error(`Invalid value in byte. Found: ${n[r]}`);let i=t==="be"?n:Array.from(n).reverse();return new e(i[0]*2**24+i[1]*2**16+i[2]*2**8+i[3])}static fromString(n){if(!n.match(/^[0-9]+$/))throw new Error("Invalid string format");return new e(Number.parseInt(n,10))}data;constructor(n){if(Number.isNaN(n))throw new Error("Input is not a number");if(!Number.isInteger(n))throw new Error("Input is not an integer");if(n<0||n>4294967295)throw new Error("Input not in uint32 range: "+n.toString());this.data=n}toBytesBigEndian(){return new Uint8Array([Math.floor(this.data/2**24)&255,Math.floor(this.data/2**16)&255,Math.floor(this.data/2**8)&255,Math.floor(this.data/2**0)&255])}toBytesLittleEndian(){return new Uint8Array([Math.floor(this.data/2**0)&255,Math.floor(this.data/2**8)&255,Math.floor(this.data/2**16)&255,Math.floor(this.data/2**24)&255])}toNumber(){return this.data}toBigInt(){return BigInt(this.toNumber())}toString(){return this.data.toString()}};ws.Uint32=SB;var Wf=class e{static fromString(n){if(!n.match(/^-?[0-9]+$/))throw new Error("Invalid string format");return new e(Number.parseInt(n,10))}data;constructor(n){if(Number.isNaN(n))throw new Error("Input is not a number");if(!Number.isInteger(n))throw new Error("Input is not an integer");if(n<Number.MIN_SAFE_INTEGER||n>Number.MAX_SAFE_INTEGER)throw new Error("Input not in int53 range: "+n.toString());this.data=n}toNumber(){return this.data}toBigInt(){return BigInt(this.toNumber())}toString(){return this.data.toString()}};ws.Int53=Wf;var kB=class e{static fromString(n){let t=Wf.fromString(n);return new e(t.toNumber())}data;constructor(n){let t=new Wf(n);if(t.toNumber()<0)throw new Error("Input is negative");this.data=t}toNumber(){return this.data.toNumber()}toBigInt(){return BigInt(this.toNumber())}toString(){return this.data.toString()}};ws.Uint53=kB;var EB=class e{static fromBytesBigEndian(n){return e.fromBytes(n)}static fromBytes(n,t="be"){if(n.length!==8)throw new Error("Invalid input length. Expected 8 bytes.");let i=t==="be"?Array.from(n):Array.from(n).reverse(),r=0n;for(let o of i){if(r*=256n,!Number.isInteger(o)||o>255||o<0)throw new Error(`Invalid value in byte. Found: ${o}`);r+=BigInt(o)}return new e(r)}static fromString(n){if(!n.match(/^[0-9]+$/))throw new Error("Invalid string format");return new e(BigInt(n))}static fromNumber(n){if(Number.isNaN(n))throw new Error("Input is not a number");if(!Number.isInteger(n))throw new Error("Input is not an integer");if(!Number.isSafeInteger(n))throw new Error("Input is not a safe integer");let t=BigInt(n);return new e(t)}data;constructor(n){if(n<0n)throw new Error("Input is negative");if(n>AK)throw new Error("Input exceeds uint64 range");this.data=n}toBytesBigEndian(){return this.toBytesLittleEndian().reverse()}toBytesLittleEndian(){let n=new Uint8Array(8),t=this.data;for(let i=0;i<n.length;i++)n[i]=Number(t%256n),t/=256n;return n}toString(){return this.data.toString(10)}toBigInt(){return this.data}toNumber(){if(this.data>BigInt(Number.MAX_SAFE_INTEGER))throw new Error("number can only safely store up to 53 bits");return Number(this.data)}};ws.Uint64=EB});var Ai=I(ga=>{"use strict";Object.defineProperty(ga,"__esModule",{value:!0});ga.Uint64=ga.Uint53=ga.Uint32=ga.Int53=ga.Decimal=void 0;var fK=nT();Object.defineProperty(ga,"Decimal",{enumerable:!0,get:function(){return fK.Decimal}});var Pp=tT();Object.defineProperty(ga,"Int53",{enumerable:!0,get:function(){return Pp.Int53}});Object.defineProperty(ga,"Uint32",{enumerable:!0,get:function(){return Pp.Uint32}});Object.defineProperty(ga,"Uint53",{enumerable:!0,get:function(){return Pp.Uint53}});Object.defineProperty(ga,"Uint64",{enumerable:!0,get:function(){return Pp.Uint64}})});var rT=I(Kf=>{"use strict";Object.defineProperty(Kf,"__esModule",{value:!0});Kf.utf8Length=lK;Kf.utf8Read=gK;Kf.utf8Write=pK;function lK(e){let n=0,t=0;for(let i=0;i<e.length;++i)t=e.charCodeAt(i),t<128?n+=1:t<2048?n+=2:(t&64512)===55296&&(e.charCodeAt(i+1)&64512)===56320?(++i,n+=4):n+=3;return n}function gK(e,n,t){if(t-n<1)return"";let r=[],o=[],a=0,s;for(;n<t;)s=e[n++],s<128?r[a++]=s:s>191&&s<224?r[a++]=(s&31)<<6|e[n++]&63:s>239&&s<365?(s=((s&7)<<18|(e[n++]&63)<<12|(e[n++]&63)<<6|e[n++]&63)-65536,r[a++]=55296+(s>>10),r[a++]=56320+(s&1023)):r[a++]=(s&15)<<12|(e[n++]&63)<<6|e[n++]&63,a>8191&&((o||(o=[])).push(String.fromCharCode(...r)),a=0);return o?(a&&o.push(String.fromCharCode(...r.slice(0,a))),o.join("")):String.fromCharCode(...r.slice(0,a))}function pK(e,n,t){let i=t,r,o;for(let a=0;a<e.length;++a)r=e.charCodeAt(a),r<128?n[t++]=r:r<2048?(n[t++]=r>>6|192,n[t++]=r&63|128):(r&64512)===55296&&((o=e.charCodeAt(a+1))&64512)===56320?(r=65536+((r&1023)<<10)+(o&1023),++a,n[t++]=r>>18|240,n[t++]=r>>12&63|128,n[t++]=r>>6&63|128,n[t++]=r&63|128):(n[t++]=r>>12|224,n[t++]=r>>6&63|128,n[t++]=r&63|128);return t-i}});var sT=I(wi=>{"use strict";Object.defineProperty(wi,"__esModule",{value:!0});wi.varint64read=IK;wi.varint64write=hK;wi.int64FromString=yK;wi.int64ToString=BK;wi.uInt64ToString=oT;wi.varint32write=CK;wi.varint32read=SK;wi.zzEncode=kK;wi.zzDecode=EK;wi.readUInt32=QK;wi.readInt32=wK;wi.writeVarint32=RK;wi.writeVarint64=bK;wi.int64Length=PK;wi.writeFixed32=NK;wi.writeByte=vK;function IK(){let e=0,n=0;for(let i=0;i<28;i+=7){let r=this.buf[this.pos++];if(e|=(r&127)<<i,(r&128)==0)return this.assertBounds(),[e,n]}let t=this.buf[this.pos++];if(e|=(t&15)<<28,n=(t&112)>>4,(t&128)==0)return this.assertBounds(),[e,n];for(let i=3;i<=31;i+=7){let r=this.buf[this.pos++];if(n|=(r&127)<<i,(r&128)==0)return this.assertBounds(),[e,n]}throw new Error("invalid varint")}function hK(e,n,t){for(let o=0;o<28;o=o+7){let a=e>>>o,s=!(!(a>>>7)&&n==0),d=(s?a|128:a)&255;if(t.push(d),!s)return}let i=e>>>28&15|(n&7)<<4,r=n>>3!=0;if(t.push((r?i|128:i)&255),!!r){for(let o=3;o<31;o=o+7){let a=n>>>o,s=!!(a>>>7),d=(s?a|128:a)&255;if(t.push(d),!s)return}t.push(n>>>31&1)}}var Np=4294967296;function yK(e){let n=e[0]==="-";n&&(e=e.slice(1));let t=1e6,i=0,r=0;function o(a,s){let d=Number(e.slice(a,s));r*=t,i=i*t+d,i>=Np&&(r=r+(i/Np|0),i=i%Np)}return o(-24,-18),o(-18,-12),o(-12,-6),o(-6),n?aT(i,r):QB(i,r)}function BK(e,n){let t=QB(e,n),i=t.hi&2147483648;i&&(t=aT(t.lo,t.hi));let r=oT(t.lo,t.hi);return i?"-"+r:r}function oT(e,n){if({lo:e,hi:n}=mK(e,n),n<=2097151)return String(Np*n+e);let t=e&16777215,i=(e>>>24|n<<8)&16777215,r=n>>16&65535,o=t+i*6777216+r*6710656,a=i+r*8147497,s=r*2,d=1e7;return o>=d&&(a+=Math.floor(o/d),o%=d),a>=d&&(s+=Math.floor(a/d),a%=d),s.toString()+iT(a)+iT(o)}function mK(e,n){return{lo:e>>>0,hi:n>>>0}}function QB(e,n){return{lo:e|0,hi:n|0}}function aT(e,n){return n=~n,e?e=~e+1:n+=1,QB(e,n)}var iT=e=>{let n=String(e);return"0000000".slice(n.length)+n};function CK(e,n){if(e>=0){for(;e>127;)n.push(e&127|128),e=e>>>7;n.push(e)}else{for(let t=0;t<9;t++)n.push(e&127|128),e=e>>7;n.push(1)}}function SK(){let e=this.buf[this.pos++],n=e&127;if((e&128)==0)return this.assertBounds(),n;if(e=this.buf[this.pos++],n|=(e&127)<<7,(e&128)==0)return this.assertBounds(),n;if(e=this.buf[this.pos++],n|=(e&127)<<14,(e&128)==0)return this.assertBounds(),n;if(e=this.buf[this.pos++],n|=(e&127)<<21,(e&128)==0)return this.assertBounds(),n;e=this.buf[this.pos++],n|=(e&15)<<28;for(let t=5;(e&128)!==0&&t<10;t++)e=this.buf[this.pos++];if((e&128)!=0)throw new Error("invalid varint");return this.assertBounds(),n>>>0}function kK(e,n){let t=n>>31;return n=((n<<1|e>>>31)^t)>>>0,e=(e<<1^t)>>>0,[e,n]}function EK(e,n){let t=-(e&1);return e=((e>>>1|n<<31)^t)>>>0,n=(n>>>1^t)>>>0,[e,n]}function QK(e,n){return(e[n]|e[n+1]<<8|e[n+2]<<16)+e[n+3]*16777216}function wK(e,n){return(e[n]|e[n+1]<<8|e[n+2]<<16)+(e[n+3]<<24)}function RK(e,n,t){for(;e>127;)n[t++]=e&127|128,e>>>=7;n[t]=e}function bK(e,n,t){for(;e.hi;)n[t++]=e.lo&127|128,e.lo=(e.lo>>>7|e.hi<<25)>>>0,e.hi>>>=7;for(;e.lo>127;)n[t++]=e.lo&127|128,e.lo=e.lo>>>7;n[t++]=e.lo}function PK(e,n){let t=e,i=(e>>>28|n<<4)>>>0,r=n>>>24;return r===0?i===0?t<16384?t<128?1:2:t<2097152?3:4:i<16384?i<128?5:6:i<2097152?7:8:r<128?9:10}function NK(e,n,t){n[t]=e&255,n[t+1]=e>>>8&255,n[t+2]=e>>>16&255,n[t+3]=e>>>24}function vK(e,n,t){n[t]=e&255}});var Se=I(sc=>{"use strict";Object.defineProperty(sc,"__esModule",{value:!0});sc.BinaryWriter=sc.BinaryReader=sc.WireType=void 0;var wB=rT(),xt=sT(),Gu;(function(e){e[e.Varint=0]="Varint",e[e.Fixed64=1]="Fixed64",e[e.Bytes=2]="Bytes",e[e.Fixed32=5]="Fixed32"})(Gu||(sc.WireType=Gu={}));var RB=class{buf;pos;type;len;assertBounds(){if(this.pos>this.len)throw new RangeError("premature EOF")}constructor(n){this.buf=n?new Uint8Array(n):new Uint8Array(0),this.pos=0,this.type=0,this.len=this.buf.length}tag(){let n=this.uint32(),t=n>>>3,i=n&7;if(t<=0||i<0||i>5)throw new Error("illegal tag: field no "+t+" wire type "+i);return[t,i,n]}skip(n){if(typeof n=="number"){if(this.pos+n>this.len)throw dT(this,n);this.pos+=n}else do if(this.pos>=this.len)throw dT(this);while(this.buf[this.pos++]&128);return this}skipType(n){switch(n){case Gu.Varint:this.skip();break;case Gu.Fixed64:this.skip(8);break;case Gu.Bytes:this.skip(this.uint32());break;case 3:for(;(n=this.uint32()&7)!==4;)this.skipType(n);break;case Gu.Fixed32:this.skip(4);break;default:throw Error("invalid wire type "+n+" at offset "+this.pos)}return this}uint32(){return xt.varint32read.bind(this)()}int32(){return this.uint32()|0}sint32(){let n=this.uint32();return n%2===1?(n+1)/-2:n/2}fixed32(){let n=(0,xt.readUInt32)(this.buf,this.pos);return this.pos+=4,n}sfixed32(){let n=(0,xt.readInt32)(this.buf,this.pos);return this.pos+=4,n}int64(){let[n,t]=xt.varint64read.bind(this)();return BigInt((0,xt.int64ToString)(n,t))}uint64(){let[n,t]=xt.varint64read.bind(this)();return BigInt((0,xt.uInt64ToString)(n,t))}sint64(){let[n,t]=xt.varint64read.bind(this)();return[n,t]=(0,xt.zzDecode)(n,t),BigInt((0,xt.int64ToString)(n,t))}fixed64(){let n=this.sfixed32(),t=this.sfixed32();return BigInt((0,xt.uInt64ToString)(n,t))}sfixed64(){let n=this.sfixed32(),t=this.sfixed32();return BigInt((0,xt.int64ToString)(n,t))}float(){throw new Error("float not supported")}double(){throw new Error("double not supported")}bool(){let[n,t]=xt.varint64read.bind(this)();return n!==0||t!==0}bytes(){let n=this.uint32(),t=this.pos;return this.pos+=n,this.assertBounds(),this.buf.subarray(t,t+n)}string(){let n=this.bytes();return(0,wB.utf8Read)(n,0,n.length)}};sc.BinaryReader=RB;var Zc=class{fn;len;val;next;constructor(n,t,i){this.fn=n,this.len=t,this.val=i}proceed(n,t){this.fn&&this.fn(this.val,n,t)}},bB=class{head;tail;len;next;constructor(n){this.head=n.head,this.tail=n.tail,this.len=n.len,this.next=n.states}},PB=class e{len=0;head;tail;states;constructor(){this.head=new Zc(null,0,0),this.tail=this.head,this.states=null}static create(){return new e}static alloc(n){return typeof Uint8Array<"u"?DK(t=>new Uint8Array(t),Uint8Array.prototype.subarray)(n):new Array(n)}_push(n,t,i){return this.tail=this.tail.next=new Zc(n,t,i),this.len+=t,this}finish(){let n=this.head.next,t=0,i=e.alloc(this.len);for(;n;)n.proceed(i,t),t+=n.len,n=n.next;return i}fork(){return this.states=new bB(this),this.head=this.tail=new Zc(null,0,0),this.len=0,this}reset(){return this.states?(this.head=this.states.head,this.tail=this.states.tail,this.len=this.states.len,this.states=this.states.next):(this.head=this.tail=new Zc(null,0,0),this.len=0),this}ldelim(){let n=this.head,t=this.tail,i=this.len;return this.reset().uint32(i),i&&(this.tail.next=n.next,this.tail=t,this.len+=i),this}tag(n,t){return this.uint32((n<<3|t)>>>0)}uint32(n){return this.len+=(this.tail=this.tail.next=new Zc(xt.writeVarint32,(n=n>>>0)<128?1:n<16384?2:n<2097152?3:n<268435456?4:5,n)).len,this}int32(n){return n<0?this._push(xt.writeVarint64,10,(0,xt.int64FromString)(n.toString())):this.uint32(n)}sint32(n){return this.uint32((n<<1^n>>31)>>>0)}int64(n){let{lo:t,hi:i}=(0,xt.int64FromString)(n.toString());return this._push(xt.writeVarint64,(0,xt.int64Length)(t,i),{lo:t,hi:i})}uint64=e.prototype.int64;sint64(n){let{lo:t,hi:i}=(0,xt.int64FromString)(n.toString());return[t,i]=(0,xt.zzEncode)(t,i),this._push(xt.writeVarint64,(0,xt.int64Length)(t,i),{lo:t,hi:i})}fixed64(n){let{lo:t,hi:i}=(0,xt.int64FromString)(n.toString());return this._push(xt.writeFixed32,4,t)._push(xt.writeFixed32,4,i)}sfixed64=e.prototype.fixed64;bool(n){return this._push(xt.writeByte,1,n?1:0)}fixed32(n){return this._push(xt.writeFixed32,4,n>>>0)}sfixed32=e.prototype.fixed32;float(n){throw new Error("float not supported"+n)}double(n){throw new Error("double not supported"+n)}bytes(n){let t=n.length>>>0;return t?this.uint32(t)._push(OK,t,n):this._push(xt.writeByte,1,0)}string(n){let t=(0,wB.utf8Length)(n);return t?this.uint32(t)._push(wB.utf8Write,t,n):this._push(xt.writeByte,1,0)}};sc.BinaryWriter=PB;function OK(e,n,t){if(typeof Uint8Array<"u")n.set(e,t);else for(let i=0;i<e.length;++i)n[t+i]=e[i]}function DK(e,n,t){let i=t||8192,r=i>>>1,o=null,a=i;return function(d){if(d<1||d>r)return e(d);a+d>i&&(o=e(i),a=0);let u=n.call(o,a,a+=d);return a&7&&(a=(a|7)+1),u}}function dT(e,n){return RangeError("index out of range: "+e.pos+" + "+(n||1)+" > "+e.len)}});var Ee=I(lo=>{"use strict";Object.defineProperty(lo,"__esModule",{value:!0});lo.setPaginationParams=void 0;lo.bytesFromBase64=TK;lo.base64FromBytes=JK;lo.omitDefault=qK;lo.toDuration=FK;lo.fromDuration=MK;lo.isSet=NB;lo.isObject=HK;lo.isRpc=GK;lo.toTimestamp=vB;lo.fromTimestamp=VK;lo.fromJsonTimestamp=KK;var Vu=(()=>{if(typeof Vu<"u")return Vu;if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw"Unable to locate global object"})(),UK=Vu.atob||(e=>Vu.Buffer.from(e,"base64").toString("binary"));function TK(e){let n=UK(e),t=new Uint8Array(n.length);for(let i=0;i<n.length;++i)t[i]=n.charCodeAt(i);return t}var xK=Vu.btoa||(e=>Vu.Buffer.from(e,"binary").toString("base64"));function JK(e){let n=[];return e.forEach(t=>{n.push(String.fromCharCode(t))}),xK(n.join(""))}function qK(e){if(typeof e=="string")return e===""?void 0:e;if(typeof e=="number")return e===0?void 0:e;if(typeof e=="boolean")return e===!1?void 0:e;if(typeof e=="bigint")return e===BigInt(0)?void 0:e;throw new Error(`Got unsupported type ${typeof e}`)}function FK(e){return{seconds:BigInt(Math.floor(parseInt(e)/1e9)),nanos:parseInt(e)%1e9}}function MK(e){return(parseInt(e.seconds.toString())*1e9+e.nanos).toString()}function NB(e){return e!=null}function HK(e){return typeof e=="object"&&e!==null}var _K=(e,n)=>(n&&(typeof n?.countTotal<"u"&&(e.params["pagination.count_total"]=n.countTotal),typeof n?.key<"u"&&(e.params["pagination.key"]=Buffer.from(n.key).toString("base64")),typeof n?.limit<"u"&&(e.params["pagination.limit"]=n.limit.toString()),typeof n?.offset<"u"&&(e.params["pagination.offset"]=n.offset.toString()),typeof n?.reverse<"u"&&(e.params["pagination.reverse"]=n.reverse)),e);lo.setPaginationParams=_K;function GK(e){return e!=null&&typeof e.request=="function"}function vB(e){let n=LK(e.getTime()/1e3),t=e.getTime()%1e3*1e6;return{seconds:n,nanos:t}}function VK(e){let n=Number(e.seconds)*1e3;return n+=e.nanos/1e6,new Date(n)}var WK=e=>({seconds:NB(e.seconds)?BigInt(e.seconds.toString()):BigInt(0),nanos:NB(e.nanos)?Number(e.nanos):0});function KK(e){return e instanceof Date?vB(e):typeof e=="string"?vB(new Date(e)):WK(e)}function LK(e){return BigInt(Math.trunc(e))}});var Jt=I(Wu=>{"use strict";Object.defineProperty(Wu,"__esModule",{value:!0});Wu.Any=Wu.protobufPackage=void 0;var OB=Se(),vp=Ee();Wu.protobufPackage="google.protobuf";function DB(){return{typeUrl:"",value:new Uint8Array}}Wu.Any={typeUrl:"/google.protobuf.Any",encode(e,n=OB.BinaryWriter.create()){return e.typeUrl!==""&&n.uint32(10).string(e.typeUrl),e.value.length!==0&&n.uint32(18).bytes(e.value),n},decode(e,n){let t=e instanceof OB.BinaryReader?e:new OB.BinaryReader(e),i=n===void 0?t.len:t.pos+n,r=DB();for(;t.pos<i;){let o=t.uint32();switch(o>>>3){case 1:r.typeUrl=t.string();break;case 2:r.value=t.bytes();break;default:t.skipType(o&7);break}}return r},fromJSON(e){let n=DB();return(0,vp.isSet)(e.typeUrl)&&(n.typeUrl=String(e.typeUrl)),(0,vp.isSet)(e.value)&&(n.value=(0,vp.bytesFromBase64)(e.value)),n},toJSON(e){let n={};return e.typeUrl!==void 0&&(n.typeUrl=e.typeUrl),e.value!==void 0&&(n.value=(0,vp.base64FromBytes)(e.value!==void 0?e.value:new Uint8Array)),n},fromPartial(e){let n=DB();return n.typeUrl=e.typeUrl??"",n.value=e.value??new Uint8Array,n}}});var Yi=I(Ku=>{"use strict";Object.defineProperty(Ku,"__esModule",{value:!0});Ku.Timestamp=Ku.protobufPackage=void 0;var UB=Se(),cT=Ee();Ku.protobufPackage="google.protobuf";function TB(){return{seconds:BigInt(0),nanos:0}}Ku.Timestamp={typeUrl:"/google.protobuf.Timestamp",encode(e,n=UB.BinaryWriter.create()){return e.seconds!==BigInt(0)&&n.uint32(8).int64(e.seconds),e.nanos!==0&&n.uint32(16).int32(e.nanos),n},decode(e,n){let t=e instanceof UB.BinaryReader?e:new UB.BinaryReader(e),i=n===void 0?t.len:t.pos+n,r=TB();for(;t.pos<i;){let o=t.uint32();switch(o>>>3){case 1:r.seconds=t.int64();break;case 2:r.nanos=t.int32();break;default:t.skipType(o&7);break}}return r},fromJSON(e){let n=TB();return(0,cT.isSet)(e.seconds)&&(n.seconds=BigInt(e.seconds.toString())),(0,cT.isSet)(e.nanos)&&(n.nanos=Number(e.nanos)),n},toJSON(e){let n={};return e.seconds!==void 0&&(n.seconds=(e.seconds||BigInt(0)).toString()),e.nanos!==void 0&&(n.nanos=Math.round(e.nanos)),n},fromPartial(e){let n=TB();return e.seconds!==void 0&&e.seconds!==null&&(n.seconds=BigInt(e.seconds.toString())),n.nanos=e.nanos??0,n}}});var Op=I(dc=>{"use strict";Object.defineProperty(dc,"__esModule",{value:!0});dc.CompactBitArray=dc.MultiSignature=dc.protobufPackage=void 0;var Yu=Se(),Lu=Ee();dc.protobufPackage="cosmos.crypto.multisig.v1beta1";function xB(){return{signatures:[]}}dc.MultiSignature={typeUrl:"/cosmos.crypto.multisig.v1beta1.MultiSignature",encode(e,n=Yu.BinaryWriter.create()){for(let t of e.signatures)n.uint32(10).bytes(t);return n},decode(e,n){let t=e instanceof Yu.BinaryReader?e:new Yu.BinaryReader(e),i=n===void 0?t.len:t.pos+n,r=xB();for(;t.pos<i;){let o=t.uint32();o>>>3===1?r.signatures.push(t.bytes()):t.skipType(o&7)}return r},fromJSON(e){let n=xB();return Array.isArray(e?.signatures)&&(n.signatures=e.signatures.map(t=>(0,Lu.bytesFromBase64)(t))),n},toJSON(e){let n={};return e.signatures?n.signatures=e.signatures.map(t=>(0,Lu.base64FromBytes)(t!==void 0?t:new Uint8Array)):n.signatures=[],n},fromPartial(e){let n=xB();return n.signatures=e.signatures?.map(t=>t)||[],n}};function JB(){return{extraBitsStored:0,elems:new Uint8Array}}dc.CompactBitArray={typeUrl:"/cosmos.crypto.multisig.v1beta1.CompactBitArray",encode(e,n=Yu.BinaryWriter.create()){return e.extraBitsStored!==0&&n.uint32(8).uint32(e.extraBitsStored),e.elems.length!==0&&n.uint32(18).bytes(e.elems),n},decode(e,n){let t=e instanceof Yu.BinaryReader?e:new Yu.BinaryReader(e),i=n===void 0?t.len:t.pos+n,r=JB();for(;t.pos<i;){let o=t.uint32();switch(o>>>3){case 1:r.extraBitsStored=t.uint32();break;case 2:r.elems=t.bytes();break;default:t.skipType(o&7);break}}return r},fromJSON(e){let n=JB();return(0,Lu.isSet)(e.extraBitsStored)&&(n.extraBitsStored=Number(e.extraBitsStored)),(0,Lu.isSet)(e.elems)&&(n.elems=(0,Lu.bytesFromBase64)(e.elems)),n},toJSON(e){let n={};return e.extraBitsStored!==void 0&&(n.extraBitsStored=Math.round(e.extraBitsStored)),e.elems!==void 0&&(n.elems=(0,Lu.base64FromBytes)(e.elems!==void 0?e.elems:new Uint8Array)),n},fromPartial(e){let n=JB();return n.extraBitsStored=e.extraBitsStored??0,n.elems=e.elems??new Uint8Array,n}}});var Xc=I(Nn=>{"use strict";Object.defineProperty(Nn,"__esModule",{value:!0});Nn.SignatureDescriptor_Data_Multi=Nn.SignatureDescriptor_Data_Single=Nn.SignatureDescriptor_Data=Nn.SignatureDescriptor=Nn.SignatureDescriptors=Nn.SignMode=Nn.protobufPackage=void 0;Nn.signModeFromJSON=uT;Nn.signModeToJSON=AT;var Lf=Op(),Yf=Jt(),go=Se(),Rs=Ee();Nn.protobufPackage="cosmos.tx.signing.v1beta1";var zi;(function(e){e[e.SIGN_MODE_UNSPECIFIED=0]="SIGN_MODE_UNSPECIFIED",e[e.SIGN_MODE_DIRECT=1]="SIGN_MODE_DIRECT",e[e.SIGN_MODE_TEXTUAL=2]="SIGN_MODE_TEXTUAL",e[e.SIGN_MODE_DIRECT_AUX=3]="SIGN_MODE_DIRECT_AUX",e[e.SIGN_MODE_LEGACY_AMINO_JSON=127]="SIGN_MODE_LEGACY_AMINO_JSON",e[e.SIGN_MODE_EIP_191=191]="SIGN_MODE_EIP_191",e[e.UNRECOGNIZED=-1]="UNRECOGNIZED"})(zi||(Nn.SignMode=zi={}));function uT(e){switch(e){case 0:case"SIGN_MODE_UNSPECIFIED":return zi.SIGN_MODE_UNSPECIFIED;case 1:case"SIGN_MODE_DIRECT":return zi.SIGN_MODE_DIRECT;case 2:case"SIGN_MODE_TEXTUAL":return zi.SIGN_MODE_TEXTUAL;case 3:case"SIGN_MODE_DIRECT_AUX":return zi.SIGN_MODE_DIRECT_AUX;case 127:case"SIGN_MODE_LEGACY_AMINO_JSON":return zi.SIGN_MODE_LEGACY_AMINO_JSON;case 191:case"SIGN_MODE_EIP_191":return zi.SIGN_MODE_EIP_191;default:return zi.UNRECOGNIZED}}function AT(e){switch(e){case zi.SIGN_MODE_UNSPECIFIED:return"SIGN_MODE_UNSPECIFIED";case zi.SIGN_MODE_DIRECT:return"SIGN_MODE_DIRECT";case zi.SIGN_MODE_TEXTUAL:return"SIGN_MODE_TEXTUAL";case zi.SIGN_MODE_DIRECT_AUX:return"SIGN_MODE_DIRECT_AUX";case zi.SIGN_MODE_LEGACY_AMINO_JSON:return"SIGN_MODE_LEGACY_AMINO_JSON";case zi.SIGN_MODE_EIP_191:return"SIGN_MODE_EIP_191";case zi.UNRECOGNIZED:default:return"UNRECOGNIZED"}}function qB(){return{signatures:[]}}Nn.SignatureDescriptors={typeUrl:"/cosmos.tx.signing.v1beta1.SignatureDescriptors",encode(e,n=go.BinaryWriter.create()){for(let t of e.signatures)Nn.SignatureDescriptor.encode(t,n.uint32(10).fork()).ldelim();return n},decode(e,n){let t=e instanceof go.BinaryReader?e:new go.BinaryReader(e),i=n===void 0?t.len:t.pos+n,r=qB();for(;t.pos<i;){let o=t.uint32();o>>>3===1?r.signatures.push(Nn.SignatureDescriptor.decode(t,t.uint32())):t.skipType(o&7)}return r},fromJSON(e){let n=qB();return Array.isArray(e?.signatures)&&(n.signatures=e.signatures.map(t=>Nn.SignatureDescriptor.fromJSON(t))),n},toJSON(e){let n={};return e.signatures?n.signatures=e.signatures.map(t=>t?Nn.SignatureDescriptor.toJSON(t):void 0):n.signatures=[],n},fromPartial(e){let n=qB();return n.signatures=e.signatures?.map(t=>Nn.SignatureDescriptor.fromPartial(t))||[],n}};function FB(){return{publicKey:void 0,data:void 0,sequence:BigInt(0)}}Nn.SignatureDescriptor={typeUrl:"/cosmos.tx.signing.v1beta1.SignatureDescriptor",encode(e,n=go.BinaryWriter.create()){return e.publicKey!==void 0&&Yf.Any.encode(e.publicKey,n.uint32(10).fork()).ldelim(),e.data!==void 0&&Nn.SignatureDescriptor_Data.encode(e.data,n.uint32(18).fork()).ldelim(),e.sequence!==BigInt(0)&&n.uint32(24).uint64(e.sequence),n},decode(e,n){let t=e instanceof go.BinaryReader?e:new go.BinaryReader(e),i=n===void 0?t.len:t.pos+n,r=FB();for(;t.pos<i;){let o=t.uint32();switch(o>>>3){case 1:r.publicKey=Yf.Any.decode(t,t.uint32());break;case 2:r.data=Nn.SignatureDescriptor_Data.decode(t,t.uint32());break;case 3:r.sequence=t.uint64();break;default:t.skipType(o&7);break}}return r},fromJSON(e){let n=FB();return(0,Rs.isSet)(e.publicKey)&&(n.publicKey=Yf.Any.fromJSON(e.publicKey)),(0,Rs.isSet)(e.data)&&(n.data=Nn.SignatureDescriptor_Data.fromJSON(e.data)),(0,Rs.isSet)(e.sequence)&&(n.sequence=BigInt(e.sequence.toString())),n},toJSON(e){let n={};return e.publicKey!==void 0&&(n.publicKey=e.publicKey?Yf.Any.toJSON(e.publicKey):void 0),e.data!==void 0&&(n.data=e.data?Nn.SignatureDescriptor_Data.toJSON(e.data):void 0),e.sequence!==void 0&&(n.sequence=(e.sequence||BigInt(0)).toString()),n},fromPartial(e){let n=FB();return e.publicKey!==void 0&&e.publicKey!==null&&(n.publicKey=Yf.Any.fromPartial(e.publicKey)),e.data!==void 0&&e.data!==null&&(n.data=Nn.SignatureDescriptor_Data.fromPartial(e.data)),e.sequence!==void 0&&e.sequence!==null&&(n.sequence=BigInt(e.sequence.toString())),n}};function MB(){return{single:void 0,multi:void 0}}Nn.SignatureDescriptor_Data={typeUrl:"/cosmos.tx.signing.v1beta1.Data",encode(e,n=go.BinaryWriter.create()){return e.single!==void 0&&Nn.SignatureDescriptor_Data_Single.encode(e.single,n.uint32(10).fork()).ldelim(),e.multi!==void 0&&Nn.SignatureDescriptor_Data_Multi.encode(e.multi,n.uint32(18).fork()).ldelim(),n},decode(e,n){let t=e instanceof go.BinaryReader?e:new go.BinaryReader(e),i=n===void 0?t.len:t.pos+n,r=MB();for(;t.pos<i;){let o=t.uint32();switch(o>>>3){case 1:r.single=Nn.SignatureDescriptor_Data_Single.decode(t,t.uint32());break;case 2:r.multi=Nn.SignatureDescriptor_Data_Multi.decode(t,t.uint32());break;default:t.skipType(o&7);break}}return r},fromJSON(e){let n=MB();return(0,Rs.isSet)(e.single)&&(n.single=Nn.SignatureDescriptor_Data_Single.fromJSON(e.single)),(0,Rs.isSet)(e.multi)&&(n.multi=Nn.SignatureDescriptor_Data_Multi.fromJSON(e.multi)),n},toJSON(e){let n={};return e.single!==void 0&&(n.single=e.single?Nn.SignatureDescriptor_Data_Single.toJSON(e.single):void 0),e.multi!==void 0&&(n.multi=e.multi?Nn.SignatureDescriptor_Data_Multi.toJSON(e.multi):void 0),n},fromPartial(e){let n=MB();return e.single!==void 0&&e.single!==null&&(n.single=Nn.SignatureDescriptor_Data_Single.fromPartial(e.single)),e.multi!==void 0&&e.multi!==null&&(n.multi=Nn.SignatureDescriptor_Data_Multi.fromPartial(e.multi)),n}};function HB(){return{mode:0,signature:new Uint8Array}}Nn.SignatureDescriptor_Data_Single={typeUrl:"/cosmos.tx.signing.v1beta1.Single",encode(e,n=go.BinaryWriter.create()){return e.mode!==0&&n.uint32(8).int32(e.mode),e.signature.length!==0&&n.uint32(18).bytes(e.signature),n},decode(e,n){let t=e instanceof go.BinaryReader?e:new go.BinaryReader(e),i=n===void 0?t.len:t.pos+n,r=HB();for(;t.pos<i;){let o=t.uint32();switch(o>>>3){case 1:r.mode=t.int32();break;case 2:r.signature=t.bytes();break;default:t.skipType(o&7);break}}return r},fromJSON(e){let n=HB();return(0,Rs.isSet)(e.mode)&&(n.mode=uT(e.mode)),(0,Rs.isSet)(e.signature)&&(n.signature=(0,Rs.bytesFromBase64)(e.signature)),n},toJSON(e){let n={};return e.mode!==void 0&&(n.mode=AT(e.mode)),e.signature!==void 0&&(n.signature=(0,Rs.base64FromBytes)(e.signature!==void 0?e.signature:new Uint8Array)),n},fromPartial(e){let n=HB();return n.mode=e.mode??0,n.signature=e.signature??new Uint8Array,n}};function _B(){return{bitarray:void 0,signatures:[]}}Nn.SignatureDescriptor_Data_Multi={typeUrl:"/cosmos.tx.signing.v1beta1.Multi",encode(e,n=go.BinaryWriter.create()){e.bitarray!==void 0&&Lf.CompactBitArray.encode(e.bitarray,n.uint32(10).fork()).ldelim();for(let t of e.signatures)Nn.SignatureDescriptor_Data.encode(t,n.uint32(18).fork()).ldelim();return n},decode(e,n){let t=e instanceof go.BinaryReader?e:new go.BinaryReader(e),i=n===void 0?t.len:t.pos+n,r=_B();for(;t.pos<i;){let o=t.uint32();switch(o>>>3){case 1:r.bitarray=Lf.CompactBitArray.decode(t,t.uint32());break;case 2:r.signatures.push(Nn.SignatureDescriptor_Data.decode(t,t.uint32()));break;default:t.skipType(o&7);break}}return r},fromJSON(e){let n=_B();return(0,Rs.isSet)(e.bitarray)&&(n.bitarray=Lf.CompactBitArray.fromJSON(e.bitarray)),Array.isArray(e?.signatures)&&(n.signatures=e.signatures.map(t=>Nn.SignatureDescriptor_Data.fromJSON(t))),n},toJSON(e){let n={};return e.bitarray!==void 0&&(n.bitarray=e.bitarray?Lf.CompactBitArray.toJSON(e.bitarray):void 0),e.signatures?n.signatures=e.signatures.map(t=>t?Nn.SignatureDescriptor_Data.toJSON(t):void 0):n.signatures=[],n},fromPartial(e){let n=_B();return e.bitarray!==void 0&&e.bitarray!==null&&(n.bitarray=Lf.CompactBitArray.fromPartial(e.bitarray)),n.signatures=e.signatures?.map(t=>Nn.SignatureDescriptor_Data.fromPartial(t))||[],n}}});var Hr=I(pa=>{"use strict";Object.defineProperty(pa,"__esModule",{value:!0});pa.DecProto=pa.IntProto=pa.DecCoin=pa.Coin=pa.protobufPackage=void 0;var Ia=Se(),zu=Ee();pa.protobufPackage="cosmos.base.v1beta1";function GB(){return{denom:"",amount:""}}pa.Coin={typeUrl:"/cosmos.base.v1beta1.Coin",encode(e,n=Ia.BinaryWriter.create()){return e.denom!==""&&n.uint32(10).string(e.denom),e.amount!==""&&n.uint32(18).string(e.amount),n},decode(e,n){let t=e instanceof Ia.BinaryReader?e:new Ia.BinaryReader(e),i=n===void 0?t.len:t.pos+n,r=GB();for(;t.pos<i;){let o=t.uint32();switch(o>>>3){case 1:r.denom=t.string();break;case 2:r.amount=t.string();break;default:t.skipType(o&7);break}}return r},fromJSON(e){let n=GB();return(0,zu.isSet)(e.denom)&&(n.denom=String(e.denom)),(0,zu.isSet)(e.amount)&&(n.amount=String(e.amount)),n},toJSON(e){let n={};return e.denom!==void 0&&(n.denom=e.denom),e.amount!==void 0&&(n.amount=e.amount),n},fromPartial(e){let n=GB();return n.denom=e.denom??"",n.amount=e.amount??"",n}};function VB(){return{denom:"",amount:""}}pa.DecCoin={typeUrl:"/cosmos.base.v1beta1.DecCoin",encode(e,n=Ia.BinaryWriter.create()){return e.denom!==""&&n.uint32(10).string(e.denom),e.amount!==""&&n.uint32(18).string(e.amount),n},decode(e,n){let t=e instanceof Ia.BinaryReader?e:new Ia.BinaryReader(e),i=n===void 0?t.len:t.pos+n,r=VB();for(;t.pos<i;){let o=t.uint32();switch(o>>>3){case 1:r.denom=t.string();break;case 2:r.amount=t.string();break;default:t.skipType(o&7);break}}return r},fromJSON(e){let n=VB();return(0,zu.isSet)(e.denom)&&(n.denom=String(e.denom)),(0,zu.isSet)(e.amount)&&(n.amount=String(e.amount)),n},toJSON(e){let n={};return e.denom!==void 0&&(n.denom=e.denom),e.amount!==void 0&&(n.amount=e.amount),n},fromPartial(e){let n=VB();return n.denom=e.denom??"",n.amount=e.amount??"",n}};function WB(){return{int:""}}pa.IntProto={typeUrl:"/cosmos.base.v1beta1.IntProto",encode(e,n=Ia.BinaryWriter.create()){return e.int!==""&&n.uint32(10).string(e.int),n},decode(e,n){let t=e instanceof Ia.BinaryReader?e:new Ia.BinaryReader(e),i=n===void 0?t.len:t.pos+n,r=WB();for(;t.pos<i;){let o=t.uint32();o>>>3===1?r.int=t.string():t.skipType(o&7)}return r},fromJSON(e){let n=WB();return(0,zu.isSet)(e.int)&&(n.int=String(e.int)),n},toJSON(e){let n={};return e.int!==void 0&&(n.int=e.int),n},fromPartial(e){let n=WB();return n.int=e.int??"",n}};function KB(){return{dec:""}}pa.DecProto={typeUrl:"/cosmos.base.v1beta1.DecProto",encode(e,n=Ia.BinaryWriter.create()){return e.dec!==""&&n.uint32(10).string(e.dec),n},decode(e,n){let t=e instanceof Ia.BinaryReader?e:new Ia.BinaryReader(e),i=n===void 0?t.len:t.pos+n,r=KB();for(;t.pos<i;){let o=t.uint32();o>>>3===1?r.dec=t.string():t.skipType(o&7)}return r},fromJSON(e){let n=KB();return(0,zu.isSet)(e.dec)&&(n.dec=String(e.dec)),n},toJSON(e){let n={};return e.dec!==void 0&&(n.dec=e.dec),n},fromPartial(e){let n=KB();return n.dec=e.dec??"",n}}});var Pd=I(ge=>{"use strict";Object.defineProperty(ge,"__esModule",{value:!0});ge.AuxSignerData=ge.Tip=ge.Fee=ge.ModeInfo_Multi=ge.ModeInfo_Single=ge.ModeInfo=ge.SignerInfo=ge.AuthInfo=ge.TxBody=ge.SignDocDirectAux=ge.SignDoc=ge.TxRaw=ge.Tx=ge.protobufPackage=void 0;var or=Jt(),LB=Yi(),Dp=Xc(),zf=Op(),bs=Hr(),et=Se(),sn=Ee();ge.protobufPackage="cosmos.tx.v1beta1";function YB(){return{body:void 0,authInfo:void 0,signatures:[]}}ge.Tx={typeUrl:"/cosmos.tx.v1beta1.Tx",encode(e,n=et.BinaryWriter.create()){e.body!==void 0&&ge.TxBody.encode(e.body,n.uint32(10).fork()).ldelim(),e.authInfo!==void 0&&ge.AuthInfo.encode(e.authInfo,n.uint32(18).fork()).ldelim();for(let t of e.signatures)n.uint32(26).bytes(t);return n},decode(e,n){let t=e instanceof et.BinaryReader?e:new et.BinaryReader(e),i=n===void 0?t.len:t.pos+n,r=YB();for(;t.pos<i;){let o=t.uint32();switch(o>>>3){case 1:r.body=ge.TxBody.decode(t,t.uint32());break;case 2:r.authInfo=ge.AuthInfo.decode(t,t.uint32());break;case 3:r.signatures.push(t.bytes());break;default:t.skipType(o&7);break}}return r},fromJSON(e){let n=YB();return(0,sn.isSet)(e.body)&&(n.body=ge.TxBody.fromJSON(e.body)),(0,sn.isSet)(e.authInfo)&&(n.authInfo=ge.AuthInfo.fromJSON(e.authInfo)),Array.isArray(e?.signatures)&&(n.signatures=e.signatures.map(t=>(0,sn.bytesFromBase64)(t))),n},toJSON(e){let n={};return e.body!==void 0&&(n.body=e.body?ge.TxBody.toJSON(e.body):void 0),e.authInfo!==void 0&&(n.authInfo=e.authInfo?ge.AuthInfo.toJSON(e.authInfo):void 0),e.signatures?n.signatures=e.signatures.map(t=>(0,sn.base64FromBytes)(t!==void 0?t:new Uint8Array)):n.signatures=[],n},fromPartial(e){let n=YB();return e.body!==void 0&&e.body!==null&&(n.body=ge.TxBody.fromPartial(e.body)),e.authInfo!==void 0&&e.authInfo!==null&&(n.authInfo=ge.AuthInfo.fromPartial(e.authInfo)),n.signatures=e.signatures?.map(t=>t)||[],n}};function zB(){return{bodyBytes:new Uint8Array,authInfoBytes:new Uint8Array,signatures:[]}}ge.TxRaw={typeUrl:"/cosmos.tx.v1beta1.TxRaw",encode(e,n=et.BinaryWriter.create()){e.bodyBytes.length!==0&&n.uint32(10).bytes(e.bodyBytes),e.authInfoBytes.length!==0&&n.uint32(18).bytes(e.authInfoBytes);for(let t of e.signatures)n.uint32(26).bytes(t);return n},decode(e,n){let t=e instanceof et.BinaryReader?e:new et.BinaryReader(e),i=n===void 0?t.len:t.pos+n,r=zB();for(;t.pos<i;){let o=t.uint32();switch(o>>>3){case 1:r.bodyBytes=t.bytes();break;case 2:r.authInfoBytes=t.bytes();break;case 3:r.signatures.push(t.bytes());break;default:t.skipType(o&7);break}}return r},fromJSON(e){let n=zB();return(0,sn.isSet)(e.bodyBytes)&&(n.bodyBytes=(0,sn.bytesFromBase64)(e.bodyBytes)),(0,sn.isSet)(e.authInfoBytes)&&(n.authInfoBytes=(0,sn.bytesFromBase64)(e.authInfoBytes)),Array.isArray(e?.signatures)&&(n.signatures=e.signatures.map(t=>(0,sn.bytesFromBase64)(t))),n},toJSON(e){let n={};return e.bodyBytes!==void 0&&(n.bodyBytes=(0,sn.base64FromBytes)(e.bodyBytes!==void 0?e.bodyBytes:new Uint8Array)),e.authInfoBytes!==void 0&&(n.authInfoBytes=(0,sn.base64FromBytes)(e.authInfoBytes!==void 0?e.authInfoBytes:new Uint8Array)),e.signatures?n.signatures=e.signatures.map(t=>(0,sn.base64FromBytes)(t!==void 0?t:new Uint8Array)):n.signatures=[],n},fromPartial(e){let n=zB();return n.bodyBytes=e.bodyBytes??new Uint8Array,n.authInfoBytes=e.authInfoBytes??new Uint8Array,n.signatures=e.signatures?.map(t=>t)||[],n}};function ZB(){return{bodyBytes:new Uint8Array,authInfoBytes:new Uint8Array,chainId:"",accountNumber:BigInt(0)}}ge.SignDoc={typeUrl:"/cosmos.tx.v1beta1.SignDoc",encode(e,n=et.BinaryWriter.create()){return e.bodyBytes.length!==0&&n.uint32(10).bytes(e.bodyBytes),e.authInfoBytes.length!==0&&n.uint32(18).bytes(e.authInfoBytes),e.chainId!==""&&n.uint32(26).string(e.chainId),e.accountNumber!==BigInt(0)&&n.uint32(32).uint64(e.accountNumber),n},decode(e,n){let t=e instanceof et.BinaryReader?e:new et.BinaryReader(e),i=n===void 0?t.len:t.pos+n,r=ZB();for(;t.pos<i;){let o=t.uint32();switch(o>>>3){case 1:r.bodyBytes=t.bytes();break;case 2:r.authInfoBytes=t.bytes();break;case 3:r.chainId=t.string();break;case 4:r.accountNumber=t.uint64();break;default:t.skipType(o&7);break}}return r},fromJSON(e){let n=ZB();return(0,sn.isSet)(e.bodyBytes)&&(n.bodyBytes=(0,sn.bytesFromBase64)(e.bodyBytes)),(0,sn.isSet)(e.authInfoBytes)&&(n.authInfoBytes=(0,sn.bytesFromBase64)(e.authInfoBytes)),(0,sn.isSet)(e.chainId)&&(n.chainId=String(e.chainId)),(0,sn.isSet)(e.accountNumber)&&(n.accountNumber=BigInt(e.accountNumber.toString())),n},toJSON(e){let n={};return e.bodyBytes!==void 0&&(n.bodyBytes=(0,sn.base64FromBytes)(e.bodyBytes!==void 0?e.bodyBytes:new Uint8Array)),e.authInfoBytes!==void 0&&(n.authInfoBytes=(0,sn.base64FromBytes)(e.authInfoBytes!==void 0?e.authInfoBytes:new Uint8Array)),e.chainId!==void 0&&(n.chainId=e.chainId),e.accountNumber!==void 0&&(n.accountNumber=(e.accountNumber||BigInt(0)).toString()),n},fromPartial(e){let n=ZB();return n.bodyBytes=e.bodyBytes??new Uint8Array,n.authInfoBytes=e.authInfoBytes??new Uint8Array,n.chainId=e.chainId??"",e.accountNumber!==void 0&&e.accountNumber!==null&&(n.accountNumber=BigInt(e.accountNumber.toString())),n}};function XB(){return{bodyBytes:new Uint8Array,publicKey:void 0,chainId:"",accountNumber:BigInt(0),sequence:BigInt(0),tip:void 0}}ge.SignDocDirectAux={typeUrl:"/cosmos.tx.v1beta1.SignDocDirectAux",encode(e,n=et.BinaryWriter.create()){return e.bodyBytes.length!==0&&n.uint32(10).bytes(e.bodyBytes),e.publicKey!==void 0&&or.Any.encode(e.publicKey,n.uint32(18).fork()).ldelim(),e.chainId!==""&&n.uint32(26).string(e.chainId),e.accountNumber!==BigInt(0)&&n.uint32(32).uint64(e.accountNumber),e.sequence!==BigInt(0)&&n.uint32(40).uint64(e.sequence),e.tip!==void 0&&ge.Tip.encode(e.tip,n.uint32(50).fork()).ldelim(),n},decode(e,n){let t=e instanceof et.BinaryReader?e:new et.BinaryReader(e),i=n===void 0?t.len:t.pos+n,r=XB();for(;t.pos<i;){let o=t.uint32();switch(o>>>3){case 1:r.bodyBytes=t.bytes();break;case 2:r.publicKey=or.Any.decode(t,t.uint32());break;case 3:r.chainId=t.string();break;case 4:r.accountNumber=t.uint64();break;case 5:r.sequence=t.uint64();break;case 6:r.tip=ge.Tip.decode(t,t.uint32());break;default:t.skipType(o&7);break}}return r},fromJSON(e){let n=XB();return(0,sn.isSet)(e.bodyBytes)&&(n.bodyBytes=(0,sn.bytesFromBase64)(e.bodyBytes)),(0,sn.isSet)(e.publicKey)&&(n.publicKey=or.Any.fromJSON(e.publicKey)),(0,sn.isSet)(e.chainId)&&(n.chainId=String(e.chainId)),(0,sn.isSet)(e.accountNumber)&&(n.accountNumber=BigInt(e.accountNumber.toString())),(0,sn.isSet)(e.sequence)&&(n.sequence=BigInt(e.sequence.toString())),(0,sn.isSet)(e.tip)&&(n.tip=ge.Tip.fromJSON(e.tip)),n},toJSON(e){let n={};return e.bodyBytes!==void 0&&(n.bodyBytes=(0,sn.base64FromBytes)(e.bodyBytes!==void 0?e.bodyBytes:new Uint8Array)),e.publicKey!==void 0&&(n.publicKey=e.publicKey?or.Any.toJSON(e.publicKey):void 0),e.chainId!==void 0&&(n.chainId=e.chainId),e.accountNumber!==void 0&&(n.accountNumber=(e.accountNumber||BigInt(0)).toString()),e.sequence!==void 0&&(n.sequence=(e.sequence||BigInt(0)).toString()),e.tip!==void 0&&(n.tip=e.tip?ge.Tip.toJSON(e.tip):void 0),n},fromPartial(e){let n=XB();return n.bodyBytes=e.bodyBytes??new Uint8Array,e.publicKey!==void 0&&e.publicKey!==null&&(n.publicKey=or.Any.fromPartial(e.publicKey)),n.chainId=e.chainId??"",e.accountNumber!==void 0&&e.accountNumber!==null&&(n.accountNumber=BigInt(e.accountNumber.toString())),e.sequence!==void 0&&e.sequence!==null&&(n.sequence=BigInt(e.sequence.toString())),e.tip!==void 0&&e.tip!==null&&(n.tip=ge.Tip.fromPartial(e.tip)),n}};function $B(){return{messages:[],memo:"",timeoutHeight:BigInt(0),unordered:!1,timeoutTimestamp:void 0,extensionOptions:[],nonCriticalExtensionOptions:[]}}ge.TxBody={typeUrl:"/cosmos.tx.v1beta1.TxBody",encode(e,n=et.BinaryWriter.create()){for(let t of e.messages)or.Any.encode(t,n.uint32(10).fork()).ldelim();e.memo!==""&&n.uint32(18).string(e.memo),e.timeoutHeight!==BigInt(0)&&n.uint32(24).uint64(e.timeoutHeight),e.unordered===!0&&n.uint32(32).bool(e.unordered),e.timeoutTimestamp!==void 0&&LB.Timestamp.encode(e.timeoutTimestamp,n.uint32(42).fork()).ldelim();for(let t of e.extensionOptions)or.Any.encode(t,n.uint32(8186).fork()).ldelim();for(let t of e.nonCriticalExtensionOptions)or.Any.encode(t,n.uint32(16378).fork()).ldelim();return n},decode(e,n){let t=e instanceof et.BinaryReader?e:new et.BinaryReader(e),i=n===void 0?t.len:t.pos+n,r=$B();for(;t.pos<i;){let o=t.uint32();switch(o>>>3){case 1:r.messages.push(or.Any.decode(t,t.uint32()));break;case 2:r.memo=t.string();break;case 3:r.timeoutHeight=t.uint64();break;case 4:r.unordered=t.bool();break;case 5:r.timeoutTimestamp=LB.Timestamp.decode(t,t.uint32());break;case 1023:r.extensionOptions.push(or.Any.decode(t,t.uint32()));break;case 2047:r.nonCriticalExtensionOptions.push(or.Any.decode(t,t.uint32()));break;default:t.skipType(o&7);break}}return r},fromJSON(e){let n=$B();return Array.isArray(e?.messages)&&(n.messages=e.messages.map(t=>or.Any.fromJSON(t))),(0,sn.isSet)(e.memo)&&(n.memo=String(e.memo)),(0,sn.isSet)(e.timeoutHeight)&&(n.timeoutHeight=BigInt(e.timeoutHeight.toString())),(0,sn.isSet)(e.unordered)&&(n.unordered=!!e.unordered),(0,sn.isSet)(e.timeoutTimestamp)&&(n.timeoutTimestamp=(0,sn.fromJsonTimestamp)(e.timeoutTimestamp)),Array.isArray(e?.extensionOptions)&&(n.extensionOptions=e.extensionOptions.map(t=>or.Any.fromJSON(t))),Array.isArray(e?.nonCriticalExtensionOptions)&&(n.nonCriticalExtensionOptions=e.nonCriticalExtensionOptions.map(t=>or.Any.fromJSON(t))),n},toJSON(e){let n={};return e.messages?n.messages=e.messages.map(t=>t?or.Any.toJSON(t):void 0):n.messages=[],e.memo!==void 0&&(n.memo=e.memo),e.timeoutHeight!==void 0&&(n.timeoutHeight=(e.timeoutHeight||BigInt(0)).toString()),e.unordered!==void 0&&(n.unordered=e.unordered),e.timeoutTimestamp!==void 0&&(n.timeoutTimestamp=(0,sn.fromTimestamp)(e.timeoutTimestamp).toISOString()),e.extensionOptions?n.extensionOptions=e.extensionOptions.map(t=>t?or.Any.toJSON(t):void 0):n.extensionOptions=[],e.nonCriticalExtensionOptions?n.nonCriticalExtensionOptions=e.nonCriticalExtensionOptions.map(t=>t?or.Any.toJSON(t):void 0):n.nonCriticalExtensionOptions=[],n},fromPartial(e){let n=$B();return n.messages=e.messages?.map(t=>or.Any.fromPartial(t))||[],n.memo=e.memo??"",e.timeoutHeight!==void 0&&e.timeoutHeight!==null&&(n.timeoutHeight=BigInt(e.timeoutHeight.toString())),n.unordered=e.unordered??!1,e.timeoutTimestamp!==void 0&&e.timeoutTimestamp!==null&&(n.timeoutTimestamp=LB.Timestamp.fromPartial(e.timeoutTimestamp)),n.extensionOptions=e.extensionOptions?.map(t=>or.Any.fromPartial(t))||[],n.nonCriticalExtensionOptions=e.nonCriticalExtensionOptions?.map(t=>or.Any.fromPartial(t))||[],n}};function jB(){return{signerInfos:[],fee:void 0,tip:void 0}}ge.AuthInfo={typeUrl:"/cosmos.tx.v1beta1.AuthInfo",encode(e,n=et.BinaryWriter.create()){for(let t of e.signerInfos)ge.SignerInfo.encode(t,n.uint32(10).fork()).ldelim();return e.fee!==void 0&&ge.Fee.encode(e.fee,n.uint32(18).fork()).ldelim(),e.tip!==void 0&&ge.Tip.encode(e.tip,n.uint32(26).fork()).ldelim(),n},decode(e,n){let t=e instanceof et.BinaryReader?e:new et.BinaryReader(e),i=n===void 0?t.len:t.pos+n,r=jB();for(;t.pos<i;){let o=t.uint32();switch(o>>>3){case 1:r.signerInfos.push(ge.SignerInfo.decode(t,t.uint32()));break;case 2:r.fee=ge.Fee.decode(t,t.uint32());break;case 3:r.tip=ge.Tip.decode(t,t.uint32());break;default:t.skipType(o&7);break}}return r},fromJSON(e){let n=jB();return Array.isArray(e?.signerInfos)&&(n.signerInfos=e.signerInfos.map(t=>ge.SignerInfo.fromJSON(t))),(0,sn.isSet)(e.fee)&&(n.fee=ge.Fee.fromJSON(e.fee)),(0,sn.isSet)(e.tip)&&(n.tip=ge.Tip.fromJSON(e.tip)),n},toJSON(e){let n={};return e.signerInfos?n.signerInfos=e.signerInfos.map(t=>t?ge.SignerInfo.toJSON(t):void 0):n.signerInfos=[],e.fee!==void 0&&(n.fee=e.fee?ge.Fee.toJSON(e.fee):void 0),e.tip!==void 0&&(n.tip=e.tip?ge.Tip.toJSON(e.tip):void 0),n},fromPartial(e){let n=jB();return n.signerInfos=e.signerInfos?.map(t=>ge.SignerInfo.fromPartial(t))||[],e.fee!==void 0&&e.fee!==null&&(n.fee=ge.Fee.fromPartial(e.fee)),e.tip!==void 0&&e.tip!==null&&(n.tip=ge.Tip.fromPartial(e.tip)),n}};function em(){return{publicKey:void 0,modeInfo:void 0,sequence:BigInt(0)}}ge.SignerInfo={typeUrl:"/cosmos.tx.v1beta1.SignerInfo",encode(e,n=et.BinaryWriter.create()){return e.publicKey!==void 0&&or.Any.encode(e.publicKey,n.uint32(10).fork()).ldelim(),e.modeInfo!==void 0&&ge.ModeInfo.encode(e.modeInfo,n.uint32(18).fork()).ldelim(),e.sequence!==BigInt(0)&&n.uint32(24).uint64(e.sequence),n},decode(e,n){let t=e instanceof et.BinaryReader?e:new et.BinaryReader(e),i=n===void 0?t.len:t.pos+n,r=em();for(;t.pos<i;){let o=t.uint32();switch(o>>>3){case 1:r.publicKey=or.Any.decode(t,t.uint32());break;case 2:r.modeInfo=ge.ModeInfo.decode(t,t.uint32());break;case 3:r.sequence=t.uint64();break;default:t.skipType(o&7);break}}return r},fromJSON(e){let n=em();return(0,sn.isSet)(e.publicKey)&&(n.publicKey=or.Any.fromJSON(e.publicKey)),(0,sn.isSet)(e.modeInfo)&&(n.modeInfo=ge.ModeInfo.fromJSON(e.modeInfo)),(0,sn.isSet)(e.sequence)&&(n.sequence=BigInt(e.sequence.toString())),n},toJSON(e){let n={};return e.publicKey!==void 0&&(n.publicKey=e.publicKey?or.Any.toJSON(e.publicKey):void 0),e.modeInfo!==void 0&&(n.modeInfo=e.modeInfo?ge.ModeInfo.toJSON(e.modeInfo):void 0),e.sequence!==void 0&&(n.sequence=(e.sequence||BigInt(0)).toString()),n},fromPartial(e){let n=em();return e.publicKey!==void 0&&e.publicKey!==null&&(n.publicKey=or.Any.fromPartial(e.publicKey)),e.modeInfo!==void 0&&e.modeInfo!==null&&(n.modeInfo=ge.ModeInfo.fromPartial(e.modeInfo)),e.sequence!==void 0&&e.sequence!==null&&(n.sequence=BigInt(e.sequence.toString())),n}};function nm(){return{single:void 0,multi:void 0}}ge.ModeInfo={typeUrl:"/cosmos.tx.v1beta1.ModeInfo",encode(e,n=et.BinaryWriter.create()){return e.single!==void 0&&ge.ModeInfo_Single.encode(e.single,n.uint32(10).fork()).ldelim(),e.multi!==void 0&&ge.ModeInfo_Multi.encode(e.multi,n.uint32(18).fork()).ldelim(),n},decode(e,n){let t=e instanceof et.BinaryReader?e:new et.BinaryReader(e),i=n===void 0?t.len:t.pos+n,r=nm();for(;t.pos<i;){let o=t.uint32();switch(o>>>3){case 1:r.single=ge.ModeInfo_Single.decode(t,t.uint32());break;case 2:r.multi=ge.ModeInfo_Multi.decode(t,t.uint32());break;default:t.skipType(o&7);break}}return r},fromJSON(e){let n=nm();return(0,sn.isSet)(e.single)&&(n.single=ge.ModeInfo_Single.fromJSON(e.single)),(0,sn.isSet)(e.multi)&&(n.multi=ge.ModeInfo_Multi.fromJSON(e.multi)),n},toJSON(e){let n={};return e.single!==void 0&&(n.single=e.single?ge.ModeInfo_Single.toJSON(e.single):void 0),e.multi!==void 0&&(n.multi=e.multi?ge.ModeInfo_Multi.toJSON(e.multi):void 0),n},fromPartial(e){let n=nm();return e.single!==void 0&&e.single!==null&&(n.single=ge.ModeInfo_Single.fromPartial(e.single)),e.multi!==void 0&&e.multi!==null&&(n.multi=ge.ModeInfo_Multi.fromPartial(e.multi)),n}};function tm(){return{mode:0}}ge.ModeInfo_Single={typeUrl:"/cosmos.tx.v1beta1.Single",encode(e,n=et.BinaryWriter.create()){return e.mode!==0&&n.uint32(8).int32(e.mode),n},decode(e,n){let t=e instanceof et.BinaryReader?e:new et.BinaryReader(e),i=n===void 0?t.len:t.pos+n,r=tm();for(;t.pos<i;){let o=t.uint32();o>>>3===1?r.mode=t.int32():t.skipType(o&7)}return r},fromJSON(e){let n=tm();return(0,sn.isSet)(e.mode)&&(n.mode=(0,Dp.signModeFromJSON)(e.mode)),n},toJSON(e){let n={};return e.mode!==void 0&&(n.mode=(0,Dp.signModeToJSON)(e.mode)),n},fromPartial(e){let n=tm();return n.mode=e.mode??0,n}};function rm(){return{bitarray:void 0,modeInfos:[]}}ge.ModeInfo_Multi={typeUrl:"/cosmos.tx.v1beta1.Multi",encode(e,n=et.BinaryWriter.create()){e.bitarray!==void 0&&zf.CompactBitArray.encode(e.bitarray,n.uint32(10).fork()).ldelim();for(let t of e.modeInfos)ge.ModeInfo.encode(t,n.uint32(18).fork()).ldelim();return n},decode(e,n){let t=e instanceof et.BinaryReader?e:new et.BinaryReader(e),i=n===void 0?t.len:t.pos+n,r=rm();for(;t.pos<i;){let o=t.uint32();switch(o>>>3){case 1:r.bitarray=zf.CompactBitArray.decode(t,t.uint32());break;case 2:r.modeInfos.push(ge.ModeInfo.decode(t,t.uint32()));break;default:t.skipType(o&7);break}}return r},fromJSON(e){let n=rm();return(0,sn.isSet)(e.bitarray)&&(n.bitarray=zf.CompactBitArray.fromJSON(e.bitarray)),Array.isArray(e?.modeInfos)&&(n.modeInfos=e.modeInfos.map(t=>ge.ModeInfo.fromJSON(t))),n},toJSON(e){let n={};return e.bitarray!==void 0&&(n.bitarray=e.bitarray?zf.CompactBitArray.toJSON(e.bitarray):void 0),e.modeInfos?n.modeInfos=e.modeInfos.map(t=>t?ge.ModeInfo.toJSON(t):void 0):n.modeInfos=[],n},fromPartial(e){let n=rm();return e.bitarray!==void 0&&e.bitarray!==null&&(n.bitarray=zf.CompactBitArray.fromPartial(e.bitarray)),n.modeInfos=e.modeInfos?.map(t=>ge.ModeInfo.fromPartial(t))||[],n}};function im(){return{amount:[],gasLimit:BigInt(0),payer:"",granter:""}}ge.Fee={typeUrl:"/cosmos.tx.v1beta1.Fee",encode(e,n=et.BinaryWriter.create()){for(let t of e.amount)bs.Coin.encode(t,n.uint32(10).fork()).ldelim();return e.gasLimit!==BigInt(0)&&n.uint32(16).uint64(e.gasLimit),e.payer!==""&&n.uint32(26).string(e.payer),e.granter!==""&&n.uint32(34).string(e.granter),n},decode(e,n){let t=e instanceof et.BinaryReader?e:new et.BinaryReader(e),i=n===void 0?t.len:t.pos+n,r=im();for(;t.pos<i;){let o=t.uint32();switch(o>>>3){case 1:r.amount.push(bs.Coin.decode(t,t.uint32()));break;case 2:r.gasLimit=t.uint64();break;case 3:r.payer=t.string();break;case 4:r.granter=t.string();break;default:t.skipType(o&7);break}}return r},fromJSON(e){let n=im();return Array.isArray(e?.amount)&&(n.amount=e.amount.map(t=>bs.Coin.fromJSON(t))),(0,sn.isSet)(e.gasLimit)&&(n.gasLimit=BigInt(e.gasLimit.toString())),(0,sn.isSet)(e.payer)&&(n.payer=String(e.payer)),(0,sn.isSet)(e.granter)&&(n.granter=String(e.granter)),n},toJSON(e){let n={};return e.amount?n.amount=e.amount.map(t=>t?bs.Coin.toJSON(t):void 0):n.amount=[],e.gasLimit!==void 0&&(n.gasLimit=(e.gasLimit||BigInt(0)).toString()),e.payer!==void 0&&(n.payer=e.payer),e.granter!==void 0&&(n.granter=e.granter),n},fromPartial(e){let n=im();return n.amount=e.amount?.map(t=>bs.Coin.fromPartial(t))||[],e.gasLimit!==void 0&&e.gasLimit!==null&&(n.gasLimit=BigInt(e.gasLimit.toString())),n.payer=e.payer??"",n.granter=e.granter??"",n}};function om(){return{amount:[],tipper:""}}ge.Tip={typeUrl:"/cosmos.tx.v1beta1.Tip",encode(e,n=et.BinaryWriter.create()){for(let t of e.amount)bs.Coin.encode(t,n.uint32(10).fork()).ldelim();return e.tipper!==""&&n.uint32(18).string(e.tipper),n},decode(e,n){let t=e instanceof et.BinaryReader?e:new et.BinaryReader(e),i=n===void 0?t.len:t.pos+n,r=om();for(;t.pos<i;){let o=t.uint32();switch(o>>>3){case 1:r.amount.push(bs.Coin.decode(t,t.uint32()));break;case 2:r.tipper=t.string();break;default:t.skipType(o&7);break}}return r},fromJSON(e){let n=om();return Array.isArray(e?.amount)&&(n.amount=e.amount.map(t=>bs.Coin.fromJSON(t))),(0,sn.isSet)(e.tipper)&&(n.tipper=String(e.tipper)),n},toJSON(e){let n={};return e.amount?n.amount=e.amount.map(t=>t?bs.Coin.toJSON(t):void 0):n.amount=[],e.tipper!==void 0&&(n.tipper=e.tipper),n},fromPartial(e){let n=om();return n.amount=e.amount?.map(t=>bs.Coin.fromPartial(t))||[],n.tipper=e.tipper??"",n}};function am(){return{address:"",signDoc:void 0,mode:0,sig:new Uint8Array}}ge.AuxSignerData={typeUrl:"/cosmos.tx.v1beta1.AuxSignerData",encode(e,n=et.BinaryWriter.create()){return e.address!==""&&n.uint32(10).string(e.address),e.signDoc!==void 0&&ge.SignDocDirectAux.encode(e.signDoc,n.uint32(18).fork()).ldelim(),e.mode!==0&&n.uint32(24).int32(e.mode),e.sig.length!==0&&n.uint32(34).bytes(e.sig),n},decode(e,n){let t=e instanceof et.BinaryReader?e:new et.BinaryReader(e),i=n===void 0?t.len:t.pos+n,r=am();for(;t.pos<i;){let o=t.uint32();switch(o>>>3){case 1:r.address=t.string();break;case 2:r.signDoc=ge.SignDocDirectAux.decode(t,t.uint32());break;case 3:r.mode=t.int32();break;case 4:r.sig=t.bytes();break;default:t.skipType(o&7);break}}return r},fromJSON(e){let n=am();return(0,sn.isSet)(e.address)&&(n.address=String(e.address)),(0,sn.isSet)(e.signDoc)&&(n.signDoc=ge.SignDocDirectAux.fromJSON(e.signDoc)),(0,sn.isSet)(e.mode)&&(n.mode=(0,Dp.signModeFromJSON)(e.mode)),(0,sn.isSet)(e.sig)&&(n.sig=(0,sn.bytesFromBase64)(e.sig)),n},toJSON(e){let n={};return e.address!==void 0&&(n.address=e.address),e.signDoc!==void 0&&(n.signDoc=e.signDoc?ge.SignDocDirectAux.toJSON(e.signDoc):void 0),e.mode!==void 0&&(n.mode=(0,Dp.signModeToJSON)(e.mode)),e.sig!==void 0&&(n.sig=(0,sn.base64FromBytes)(e.sig!==void 0?e.sig:new Uint8Array)),n},fromPartial(e){let n=am();return n.address=e.address??"",e.signDoc!==void 0&&e.signDoc!==null&&(n.signDoc=ge.SignDocDirectAux.fromPartial(e.signDoc)),n.mode=e.mode??0,n.sig=e.sig??new Uint8Array,n}}});var fT=I(dm=>{"use strict";Object.defineProperty(dm,"__esModule",{value:!0});dm.decodeTxRaw=YK;var sm=Pd();function YK(e){let n=sm.TxRaw.decode(e);return{authInfo:sm.AuthInfo.decode(n.authInfoBytes),body:sm.TxBody.decode(n.bodyBytes),signatures:n.signatures}}});var lT=I(Up=>{"use strict";Object.defineProperty(Up,"__esModule",{value:!0});Up.arrayContentEquals=zK;Up.arrayContentStartsWith=ZK;function zK(e,n){if(e.length!==n.length)return!1;for(let t=0;t<e.length;++t)if(e[t]!==n[t])return!1;return!0}function ZK(e,n){if(e.length<n.length)return!1;for(let t=0;t<n.length;++t)if(e[t]!==n[t])return!1;return!0}});var gT=I(Zf=>{"use strict";Object.defineProperty(Zf,"__esModule",{value:!0});Zf.assert=XK;Zf.assertDefined=$K;Zf.assertDefinedAndNotNull=jK;function XK(e,n){if(!e)throw new Error(n||"condition is not truthy")}function $K(e,n){if(e===void 0)throw new Error(n??"value is undefined")}function jK(e,n){if(e==null)throw new Error(n??"value is undefined or null")}});var pT=I(cm=>{"use strict";Object.defineProperty(cm,"__esModule",{value:!0});cm.sleep=eL;async function eL(e){return new Promise(n=>setTimeout(n,e))}});var hT=I(Xf=>{"use strict";Object.defineProperty(Xf,"__esModule",{value:!0});Xf.isNonNullObject=IT;Xf.isUint8Array=nL;Xf.isDefined=tL;function IT(e){return typeof e=="object"&&e!==null}function nL(e){return!(!IT(e)||Object.prototype.toString.call(e)!=="[object Uint8Array]"||typeof Buffer<"u"&&typeof Buffer.isBuffer<"u"&&Buffer.isBuffer(e))}function tL(e){return e!==void 0}});var ar=I(fi=>{"use strict";Object.defineProperty(fi,"__esModule",{value:!0});fi.isUint8Array=fi.isNonNullObject=fi.isDefined=fi.sleep=fi.assertDefinedAndNotNull=fi.assertDefined=fi.assert=fi.arrayContentStartsWith=fi.arrayContentEquals=void 0;var yT=lT();Object.defineProperty(fi,"arrayContentEquals",{enumerable:!0,get:function(){return yT.arrayContentEquals}});Object.defineProperty(fi,"arrayContentStartsWith",{enumerable:!0,get:function(){return yT.arrayContentStartsWith}});var um=gT();Object.defineProperty(fi,"assert",{enumerable:!0,get:function(){return um.assert}});Object.defineProperty(fi,"assertDefined",{enumerable:!0,get:function(){return um.assertDefined}});Object.defineProperty(fi,"assertDefinedAndNotNull",{enumerable:!0,get:function(){return um.assertDefinedAndNotNull}});var rL=pT();Object.defineProperty(fi,"sleep",{enumerable:!0,get:function(){return rL.sleep}});var Am=hT();Object.defineProperty(fi,"isDefined",{enumerable:!0,get:function(){return Am.isDefined}});Object.defineProperty(fi,"isNonNullObject",{enumerable:!0,get:function(){return Am.isNonNullObject}});Object.defineProperty(fi,"isUint8Array",{enumerable:!0,get:function(){return Am.isUint8Array}})});var mT=I((Tp,BT)=>{(function(e,n){typeof Tp=="object"&&typeof BT<"u"?n(Tp):typeof define=="function"&&define.amd?define(["exports"],n):(e=typeof globalThis<"u"?globalThis:e||self,n(e.hashwasm={}))})(Tp,(function(e){"use strict";var n="adler32",t="AGFzbQEAAAABDANgAAF/YAAAYAF/AAMHBgABAgEAAgUEAQECAgYOAn8BQYCJBQt/AEGACAsHcAgGbWVtb3J5AgAOSGFzaF9HZXRCdWZmZXIAAAlIYXNoX0luaXQAAQtIYXNoX1VwZGF0ZQACCkhhc2hfRmluYWwAAw1IYXNoX0dldFN0YXRlAAQOSGFzaF9DYWxjdWxhdGUABQpTVEFURV9TSVpFAwEK6wkGBQBBgAkLCgBBAEEBNgKECAvjCAEHf0EAKAKECCIBQf//A3EhAiABQRB2IQMCQAJAIABBAUcNACACQQAtAIAJaiIBQY+AfGogASABQfD/A0sbIgEgA2oiBEEQdCIFQYCAPGogBSAEQfD/A0sbIAFyIQEMAQsCQAJAAkACQAJAIABBEEkNAEGACSEGIABBsCtJDQFBgAkhBgNAQQAhBQNAIAYgBWoiASgCACIEQf8BcSACaiICIANqIAIgBEEIdkH/AXFqIgJqIAIgBEEQdkH/AXFqIgJqIAIgBEEYdmoiAmogAiABQQRqKAIAIgRB/wFxaiICaiACIARBCHZB/wFxaiICaiACIARBEHZB/wFxaiICaiACIARBGHZqIgJqIAIgAUEIaigCACIEQf8BcWoiAmogAiAEQQh2Qf8BcWoiAmogAiAEQRB2Qf8BcWoiAmogAiAEQRh2aiIEaiAEIAFBDGooAgAiAUH/AXFqIgRqIAQgAUEIdkH/AXFqIgRqIAQgAUEQdkH/AXFqIgRqIAQgAUEYdmoiAmohAyAFQRBqIgVBsCtHDQALIANB8f8DcCEDIAJB8f8DcCECIAZBsCtqIQYgAEHQVGoiAEGvK0sNAAsgAEUNBCAAQQ9LDQEMAgsCQCAARQ0AAkACQCAAQQNxIgUNAEGACSEBIAAhBAwBCyAAQXxxIQRBACEBA0AgAiABQYAJai0AAGoiAiADaiEDIAUgAUEBaiIBRw0ACyAFQYAJaiEBCyAAQQRJDQADQCACIAEtAABqIgUgAS0AAWoiBiABLQACaiIAIAFBA2otAABqIgIgACAGIAUgA2pqamohAyABQQRqIQEgBEF8aiIEDQALCyACQY+AfGogAiACQfD/A0sbIANB8f8DcEEQdHIhAQwECwNAIAYoAgAiAUH/AXEgAmoiBCADaiAEIAFBCHZB/wFxaiIEaiAEIAFBEHZB/wFxaiIEaiAEIAFBGHZqIgRqIAQgBkEEaigCACIBQf8BcWoiBGogBCABQQh2Qf8BcWoiBGogBCABQRB2Qf8BcWoiBGogBCABQRh2aiIEaiAEIAZBCGooAgAiAUH/AXFqIgRqIAQgAUEIdkH/AXFqIgRqIAQgAUEQdkH/AXFqIgRqIAQgAUEYdmoiBGogBCAGQQxqKAIAIgFB/wFxaiIEaiAEIAFBCHZB/wFxaiIEaiAEIAFBEHZB/wFxaiIEaiAEIAFBGHZqIgJqIQMgBkEQaiEGIABBcGoiAEEPSw0ACyAARQ0BCyAAQX9qIQcCQCAAQQNxIgVFDQAgAEF8cSEAIAUhBCAGIQEDQCACIAEtAABqIgIgA2ohAyABQQFqIQEgBEF/aiIEDQALIAYgBWohBgsgB0EDSQ0AA0AgAiAGLQAAaiIBIAYtAAFqIgQgBi0AAmoiBSAGQQNqLQAAaiICIAUgBCABIANqampqIQMgBkEEaiEGIABBfGoiAA0ACwsgA0Hx/wNwIQMgAkHx/wNwIQILIAIgA0EQdHIhAQtBACABNgKECAsxAQF/QQBBACgChAgiAEEYdCAAQYD+A3FBCHRyIABBCHZBgP4DcSAAQRh2cnI2AoAJCwUAQYQICzsAQQBBATYChAggABACQQBBACgChAgiAEEYdCAAQYD+A3FBCHRyIABBCHZBgP4DcSAAQRh2cnI2AoAJCwsVAgBBgAgLBAQAAAAAQYQICwQBAAAA",i="02ddbd17",r={name:n,data:t,hash:i};function o(c,g,y,k){function U(G){return G instanceof y?G:new y(function(le){le(G)})}return new(y||(y=Promise))(function(G,le){function me(Lr){try{Fr(k.next(Lr))}catch(ui){le(ui)}}function Pn(Lr){try{Fr(k.throw(Lr))}catch(ui){le(ui)}}function Fr(Lr){Lr.done?G(Lr.value):U(Lr.value).then(me,Pn)}Fr((k=k.apply(c,g||[])).next())})}typeof SuppressedError=="function"&&SuppressedError;class a{constructor(){this.mutex=Promise.resolve()}lock(){let g=()=>{};return this.mutex=this.mutex.then(()=>new Promise(g)),new Promise(y=>{g=y})}dispatch(g){return o(this,void 0,void 0,function*(){let y=yield this.lock();try{return yield Promise.resolve(g())}finally{y()}})}}var s;function d(){return typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:global}let u=d(),f=(s=u.Buffer)!==null&&s!==void 0?s:null,p=u.TextEncoder?new u.TextEncoder:null;function l(c,g){return String.fromCharCode(...c.subarray(0,g))}function h(c,g){return(c&15)+(c>>6|c>>3&8)<<4|(g&15)+(g>>6|g>>3&8)}function B(c,g){let y=g.length>>1;for(let k=0;k<y;k++){let U=k<<1;c[k]=h(g.charCodeAt(U),g.charCodeAt(U+1))}}function C(c,g){if(c.length!==g.length*2)return!1;for(let y=0;y<g.length;y++){let k=y<<1;if(g[y]!==h(c.charCodeAt(k),c.charCodeAt(k+1)))return!1}return!0}let E=87,S=48;function N(c,g,y){let k=0;for(let U=0;U<y;U++){let G=g[U]>>>4;c[k++]=G>9?G+E:G+S,G=g[U]&15,c[k++]=G>9?G+E:G+S}return String.fromCharCode.apply(null,c)}let b=f!==null?c=>{if(typeof c=="string"){let g=f.from(c,"utf8");return new Uint8Array(g.buffer,g.byteOffset,g.length)}if(f.isBuffer(c))return new Uint8Array(c.buffer,c.byteOffset,c.length);if(ArrayBuffer.isView(c))return new Uint8Array(c.buffer,c.byteOffset,c.byteLength);throw new Error("Invalid data type!")}:c=>{if(typeof c=="string")return p.encode(c);if(ArrayBuffer.isView(c))return new Uint8Array(c.buffer,c.byteOffset,c.byteLength);throw new Error("Invalid data type!")},V="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",pe=new Uint8Array(256);for(let c=0;c<V.length;c++)pe[V.charCodeAt(c)]=c;function we(c,g=!0){let y=c.length,k=y%3,U=[],G=y-k;for(let le=0;le<G;le+=3){let me=(c[le]<<16&16711680)+(c[le+1]<<8&65280)+(c[le+2]&255),Pn=V.charAt(me>>18&63)+V.charAt(me>>12&63)+V.charAt(me>>6&63)+V.charAt(me&63);U.push(Pn)}if(k===1){let le=c[y-1],me=V.charAt(le>>2),Pn=V.charAt(le<<4&63);U.push(`${me}${Pn}`),g&&U.push("==")}else if(k===2){let le=(c[y-2]<<8)+c[y-1],me=V.charAt(le>>10),Pn=V.charAt(le>>4&63),Fr=V.charAt(le<<2&63);U.push(`${me}${Pn}${Fr}`),g&&U.push("=")}return U.join("")}function Ye(c){let g=Math.floor(c.length*.75),y=c.length;return c[y-1]==="="&&(g-=1,c[y-2]==="="&&(g-=1)),g}function He(c){let g=Ye(c),y=c.length,k=new Uint8Array(g),U=0;for(let G=0;G<y;G+=4){let le=pe[c.charCodeAt(G)],me=pe[c.charCodeAt(G+1)],Pn=pe[c.charCodeAt(G+2)],Fr=pe[c.charCodeAt(G+3)];k[U]=le<<2|me>>4,U+=1,k[U]=(me&15)<<4|Pn>>2,U+=1,k[U]=(Pn&3)<<6|Fr&63,U+=1}return k}let D=16*1024,oe=4,Ce=new a,fe=new Map;function Q(c,g){return o(this,void 0,void 0,function*(){let y=null,k=null,U=!1;if(typeof WebAssembly>"u")throw new Error("WebAssembly is not supported in this environment!");let G=(On,St=0)=>{k.set(On,St)},le=()=>k,me=()=>y.exports,Pn=On=>{y.exports.Hash_SetMemorySize(On);let St=y.exports.Hash_GetBuffer(),fo=y.exports.memory.buffer;k=new Uint8Array(fo,St,On)},Fr=()=>new DataView(y.exports.memory.buffer).getUint32(y.exports.STATE_SIZE,!0),Lr=Ce.dispatch(()=>o(this,void 0,void 0,function*(){if(!fe.has(c.name)){let St=He(c.data),fo=WebAssembly.compile(St);fe.set(c.name,fo)}let On=yield fe.get(c.name);y=yield WebAssembly.instantiate(On,{})})),ui=()=>o(this,void 0,void 0,function*(){y||(yield Lr);let On=y.exports.Hash_GetBuffer(),St=y.exports.memory.buffer;k=new Uint8Array(St,On,D)}),Mr=(On=null)=>{U=!0,y.exports.Hash_Init(On)},la=On=>{let St=0;for(;St<On.length;){let fo=On.subarray(St,St+D);St+=fo.length,k.set(fo),y.exports.Hash_Update(fo.length)}},Li=On=>{if(!U)throw new Error("update() called before init()");let St=b(On);la(St)},Gf=new Uint8Array(g*2),ic=(On,St=null)=>{if(!U)throw new Error("digest() called before init()");return U=!1,y.exports.Hash_Final(St),On==="binary"?k.slice(0,g):N(Gf,k,g)},Xa=()=>{if(!U)throw new Error("save() can only be called after init() and before digest()");let On=y.exports.Hash_GetState(),St=Fr(),fo=y.exports.memory.buffer,zc=new Uint8Array(fo,On,St),Vf=new Uint8Array(oe+St);return B(Vf,c.hash),Vf.set(zc,oe),Vf},oc=On=>{if(!(On instanceof Uint8Array))throw new Error("load() expects an Uint8Array generated by save()");let St=y.exports.Hash_GetState(),fo=Fr(),zc=oe+fo,Vf=y.exports.memory.buffer;if(On.length!==zc)throw new Error(`Bad state length (expected ${zc} bytes, got ${On.length})`);if(!C(c.hash,On.subarray(0,oe)))throw new Error("This state was written by an incompatible hash implementation");let iK=On.subarray(oe);new Uint8Array(Vf,St,fo).set(iK),U=!0},_u=On=>typeof On=="string"?On.length<D/4:On.byteLength<D,bd=_u;switch(c.name){case"argon2":case"scrypt":bd=()=>!0;break;case"blake2b":case"blake2s":bd=(On,St)=>St<=512&&_u(On);break;case"blake3":bd=(On,St)=>St===0&&_u(On);break;case"xxhash64":case"xxhash3":case"xxhash128":case"crc64":bd=()=>!1;break}let ac=(On,St=null,fo=null)=>{if(!bd(On,St))return Mr(St),Li(On),ic("hex",fo);let zc=b(On);return k.set(zc),y.exports.Hash_Calculate(zc.length,St,fo),N(Gf,k,g)};return yield ui(),{getMemory:le,writeMemory:G,getExports:me,setMemorySize:Pn,init:Mr,update:Li,digest:ic,save:Xa,load:oc,calculate:ac,hashLength:g}})}function w(c,g,y){return o(this,void 0,void 0,function*(){let k=yield c.lock(),U=yield Q(g,y);return k(),U})}let P=new a,M=null;function Y(c){if(M===null)return w(P,r,4).then(g=>(M=g,M.calculate(c)));try{let g=M.calculate(c);return Promise.resolve(g)}catch(g){return Promise.reject(g)}}function se(){return Q(r,4).then(c=>{c.init();let g={init:()=>(c.init(),g),update:y=>(c.update(y),g),digest:y=>c.digest(y),save:()=>c.save(),load:y=>(c.load(y),g),blockSize:4,digestSize:4};return g})}var J="argon2",ae="AGFzbQEAAAABKQVgAX8Bf2AAAX9gEH9/f39/f39/f39/f39/f38AYAR/f39/AGACf38AAwYFAAECAwQFBgEBAoCAAgYIAX8BQZCoBAsHQQQGbWVtb3J5AgASSGFzaF9TZXRNZW1vcnlTaXplAAAOSGFzaF9HZXRCdWZmZXIAAQ5IYXNoX0NhbGN1bGF0ZQAECvEyBVgBAn9BACEBAkAgAEEAKAKICCICRg0AAkAgACACayIAQRB2IABBgIB8cSAASWoiAEAAQX9HDQBB/wHADwtBACEBQQBBACkDiAggAEEQdK18NwOICAsgAcALcAECfwJAQQAoAoAIIgANAEEAPwBBEHQiADYCgAhBACgCiAgiAUGAgCBGDQACQEGAgCAgAWsiAEEQdiAAQYCAfHEgAElqIgBAAEF/Rw0AQQAPC0EAQQApA4gIIABBEHStfDcDiAhBACgCgAghAAsgAAvcDgECfiAAIAQpAwAiECAAKQMAIhF8IBFCAYZC/v///x+DIBBC/////w+DfnwiEDcDACAMIBAgDCkDAIVCIIkiEDcDACAIIBAgCCkDACIRfCARQgGGQv7///8fgyAQQv////8Pg358IhA3AwAgBCAQIAQpAwCFQiiJIhA3AwAgACAQIAApAwAiEXwgEEL/////D4MgEUIBhkL+////H4N+fCIQNwMAIAwgECAMKQMAhUIwiSIQNwMAIAggECAIKQMAIhF8IBBC/////w+DIBFCAYZC/v///x+DfnwiEDcDACAEIBAgBCkDAIVCAYk3AwAgASAFKQMAIhAgASkDACIRfCARQgGGQv7///8fgyAQQv////8Pg358IhA3AwAgDSAQIA0pAwCFQiCJIhA3AwAgCSAQIAkpAwAiEXwgEUIBhkL+////H4MgEEL/////D4N+fCIQNwMAIAUgECAFKQMAhUIoiSIQNwMAIAEgECABKQMAIhF8IBBC/////w+DIBFCAYZC/v///x+DfnwiEDcDACANIBAgDSkDAIVCMIkiEDcDACAJIBAgCSkDACIRfCAQQv////8PgyARQgGGQv7///8fg358IhA3AwAgBSAQIAUpAwCFQgGJNwMAIAIgBikDACIQIAIpAwAiEXwgEUIBhkL+////H4MgEEL/////D4N+fCIQNwMAIA4gECAOKQMAhUIgiSIQNwMAIAogECAKKQMAIhF8IBFCAYZC/v///x+DIBBC/////w+DfnwiEDcDACAGIBAgBikDAIVCKIkiEDcDACACIBAgAikDACIRfCAQQv////8PgyARQgGGQv7///8fg358IhA3AwAgDiAQIA4pAwCFQjCJIhA3AwAgCiAQIAopAwAiEXwgEEL/////D4MgEUIBhkL+////H4N+fCIQNwMAIAYgECAGKQMAhUIBiTcDACADIAcpAwAiECADKQMAIhF8IBFCAYZC/v///x+DIBBC/////w+DfnwiEDcDACAPIBAgDykDAIVCIIkiEDcDACALIBAgCykDACIRfCARQgGGQv7///8fgyAQQv////8Pg358IhA3AwAgByAQIAcpAwCFQiiJIhA3AwAgAyAQIAMpAwAiEXwgEEL/////D4MgEUIBhkL+////H4N+fCIQNwMAIA8gECAPKQMAhUIwiSIQNwMAIAsgECALKQMAIhF8IBBC/////w+DIBFCAYZC/v///x+DfnwiEDcDACAHIBAgBykDAIVCAYk3AwAgACAFKQMAIhAgACkDACIRfCARQgGGQv7///8fgyAQQv////8Pg358IhA3AwAgDyAQIA8pAwCFQiCJIhA3AwAgCiAQIAopAwAiEXwgEUIBhkL+////H4MgEEL/////D4N+fCIQNwMAIAUgECAFKQMAhUIoiSIQNwMAIAAgECAAKQMAIhF8IBBC/////w+DIBFCAYZC/v///x+DfnwiEDcDACAPIBAgDykDAIVCMIkiEDcDACAKIBAgCikDACIRfCAQQv////8PgyARQgGGQv7///8fg358IhA3AwAgBSAQIAUpAwCFQgGJNwMAIAEgBikDACIQIAEpAwAiEXwgEUIBhkL+////H4MgEEL/////D4N+fCIQNwMAIAwgECAMKQMAhUIgiSIQNwMAIAsgECALKQMAIhF8IBFCAYZC/v///x+DIBBC/////w+DfnwiEDcDACAGIBAgBikDAIVCKIkiEDcDACABIBAgASkDACIRfCAQQv////8PgyARQgGGQv7///8fg358IhA3AwAgDCAQIAwpAwCFQjCJIhA3AwAgCyAQIAspAwAiEXwgEEL/////D4MgEUIBhkL+////H4N+fCIQNwMAIAYgECAGKQMAhUIBiTcDACACIAcpAwAiECACKQMAIhF8IBFCAYZC/v///x+DIBBC/////w+DfnwiEDcDACANIBAgDSkDAIVCIIkiEDcDACAIIBAgCCkDACIRfCARQgGGQv7///8fgyAQQv////8Pg358IhA3AwAgByAQIAcpAwCFQiiJIhA3AwAgAiAQIAIpAwAiEXwgEEL/////D4MgEUIBhkL+////H4N+fCIQNwMAIA0gECANKQMAhUIwiSIQNwMAIAggECAIKQMAIhF8IBBC/////w+DIBFCAYZC/v///x+DfnwiEDcDACAHIBAgBykDAIVCAYk3AwAgAyAEKQMAIhAgAykDACIRfCARQgGGQv7///8fgyAQQv////8Pg358IhA3AwAgDiAQIA4pAwCFQiCJIhA3AwAgCSAQIAkpAwAiEXwgEUIBhkL+////H4MgEEL/////D4N+fCIQNwMAIAQgECAEKQMAhUIoiSIQNwMAIAMgECADKQMAIhF8IBBC/////w+DIBFCAYZC/v///x+DfnwiEDcDACAOIBAgDikDAIVCMIkiEDcDACAJIBAgCSkDACIRfCAQQv////8PgyARQgGGQv7///8fg358IhA3AwAgBCAQIAQpAwCFQgGJNwMAC98aAQN/QQAhBEEAIAIpAwAgASkDAIU3A5AIQQAgAikDCCABKQMIhTcDmAhBACACKQMQIAEpAxCFNwOgCEEAIAIpAxggASkDGIU3A6gIQQAgAikDICABKQMghTcDsAhBACACKQMoIAEpAyiFNwO4CEEAIAIpAzAgASkDMIU3A8AIQQAgAikDOCABKQM4hTcDyAhBACACKQNAIAEpA0CFNwPQCEEAIAIpA0ggASkDSIU3A9gIQQAgAikDUCABKQNQhTcD4AhBACACKQNYIAEpA1iFNwPoCEEAIAIpA2AgASkDYIU3A/AIQQAgAikDaCABKQNohTcD+AhBACACKQNwIAEpA3CFNwOACUEAIAIpA3ggASkDeIU3A4gJQQAgAikDgAEgASkDgAGFNwOQCUEAIAIpA4gBIAEpA4gBhTcDmAlBACACKQOQASABKQOQAYU3A6AJQQAgAikDmAEgASkDmAGFNwOoCUEAIAIpA6ABIAEpA6ABhTcDsAlBACACKQOoASABKQOoAYU3A7gJQQAgAikDsAEgASkDsAGFNwPACUEAIAIpA7gBIAEpA7gBhTcDyAlBACACKQPAASABKQPAAYU3A9AJQQAgAikDyAEgASkD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",Ie="e4cdc523",Pe={name:J,data:ae,hash:Ie},tt="blake2b",rt="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",Qn="c6f286e6",lt={name:tt,data:rt,hash:Qn};let vt=new a,Ot=null;function ut(c){return!Number.isInteger(c)||c<8||c>512||c%8!==0?new Error("Invalid variant! Valid values: 8, 16, ..., 512"):null}function Kr(c,g){return c|g<<16}function ec(c,g=512,y=null){if(ut(g))return Promise.reject(ut(g));let k=null,U=g;if(y!==null){if(k=b(y),k.length>64)return Promise.reject(new Error("Max key length is 64 bytes"));U=Kr(g,k.length)}let G=g/8;if(Ot===null||Ot.hashLength!==G)return w(vt,lt,G).then(le=>(Ot=le,U>512&&Ot.writeMemory(k),Ot.calculate(c,U)));try{U>512&&Ot.writeMemory(k);let le=Ot.calculate(c,U);return Promise.resolve(le)}catch(le){return Promise.reject(le)}}function Qs(c=512,g=null){if(ut(c))return Promise.reject(ut(c));let y=null,k=c;if(g!==null){if(y=b(g),y.length>64)return Promise.reject(new Error("Max key length is 64 bytes"));k=Kr(c,y.length)}let U=c/8;return Q(lt,U).then(G=>{k>512&&G.writeMemory(y),G.init(k);let le={init:k>512?()=>(G.writeMemory(y),G.init(k),le):()=>(G.init(k),le),update:me=>(G.update(me),le),digest:me=>G.digest(me),save:()=>G.save(),load:me=>(G.load(me),le),blockSize:128,digestSize:U};return le})}function Kc(c,g,y){let k=[`m=${g.memorySize}`,`t=${g.iterations}`,`p=${g.parallelism}`].join(",");return`$argon2${g.hashType}$v=19$${k}$${we(c,!1)}$${we(y,!1)}`}let Mf=new DataView(new ArrayBuffer(4));function fa(c){return Mf.setInt32(0,c,!0),new Uint8Array(Mf.buffer)}function pB(c,g,y){return o(this,void 0,void 0,function*(){if(y<=64){let Pn=yield Qs(y*8);return Pn.update(fa(y)),Pn.update(g),Pn.digest("binary")}let k=Math.ceil(y/32)-2,U=new Uint8Array(y);c.init(),c.update(fa(y)),c.update(g);let G=c.digest("binary");U.set(G.subarray(0,32),0);for(let Pn=1;Pn<k;Pn++)c.init(),c.update(G),G=c.digest("binary"),U.set(G.subarray(0,32),Pn*32);let le=y-32*k,me;return le===64?(me=c,me.init()):me=yield Qs(le*8),me.update(G),G=me.digest("binary"),U.set(G.subarray(0,le),k*32),U})}function bV(c){switch(c){case"d":return 0;case"i":return 1;default:return 2}}function ep(c){return o(this,void 0,void 0,function*(){var g;let{parallelism:y,iterations:k,hashLength:U}=c,G=b(c.password),le=b(c.salt),me=19,Pn=bV(c.hashType),{memorySize:Fr}=c,Lr=b((g=c.secret)!==null&&g!==void 0?g:""),[ui,Mr]=yield Promise.all([Q(Pe,1024),Qs(512)]);ui.setMemorySize(Fr*1024+1024);let la=new Uint8Array(24),Li=new DataView(la.buffer);Li.setInt32(0,y,!0),Li.setInt32(4,U,!0),Li.setInt32(8,Fr,!0),Li.setInt32(12,k,!0),Li.setInt32(16,me,!0),Li.setInt32(20,Pn,!0),ui.writeMemory(la,Fr*1024),Mr.init(),Mr.update(la),Mr.update(fa(G.length)),Mr.update(G),Mr.update(fa(le.length)),Mr.update(le),Mr.update(fa(Lr.length)),Mr.update(Lr),Mr.update(fa(0));let ic=Math.floor(Fr/(y*4))*4,Xa=new Uint8Array(72),oc=Mr.digest("binary");Xa.set(oc);for(let ac=0;ac<y;ac++){Xa.set(fa(0),64),Xa.set(fa(ac),68);let On=ac*ic,St=yield pB(Mr,Xa,1024);ui.writeMemory(St,On*1024),On+=1,Xa.set(fa(1),64),St=yield pB(Mr,Xa,1024),ui.writeMemory(St,On*1024)}let _u=new Uint8Array(1024);B(_u,ui.calculate(new Uint8Array([]),Fr));let bd=yield pB(Mr,_u,U);if(c.outputType==="hex"){let ac=new Uint8Array(U*2);return N(ac,bd,U)}return c.outputType==="encoded"?Kc(le,c,bd):bd})}let np=c=>{var g;if(!c||typeof c!="object")throw new Error("Invalid options parameter. It requires an object.");if(!c.password)throw new Error("Password must be specified");if(c.password=b(c.password),c.password.length<1)throw new Error("Password must be specified");if(!c.salt)throw new Error("Salt must be specified");if(c.salt=b(c.salt),c.salt.length<8)throw new Error("Salt should be at least 8 bytes long");if(c.secret=b((g=c.secret)!==null&&g!==void 0?g:""),!Number.isInteger(c.iterations)||c.iterations<1)throw new Error("Iterations should be a positive number");if(!Number.isInteger(c.parallelism)||c.parallelism<1)throw new Error("Parallelism should be a positive number");if(!Number.isInteger(c.hashLength)||c.hashLength<4)throw new Error("Hash length should be at least 4 bytes.");if(!Number.isInteger(c.memorySize))throw new Error("Memory size should be specified.");if(c.memorySize<8*c.parallelism)throw new Error("Memory size should be at least 8 * parallelism.");if(c.outputType===void 0&&(c.outputType="hex"),!["hex","binary","encoded"].includes(c.outputType))throw new Error(`Insupported output type ${c.outputType}. Valid values: ['hex', 'binary', 'encoded']`)};function PV(c){return o(this,void 0,void 0,function*(){return np(c),ep(Object.assign(Object.assign({},c),{hashType:"i"}))})}function NV(c){return o(this,void 0,void 0,function*(){return np(c),ep(Object.assign(Object.assign({},c),{hashType:"id"}))})}function vV(c){return o(this,void 0,void 0,function*(){return np(c),ep(Object.assign(Object.assign({},c),{hashType:"d"}))})}let OV=(c,g,y)=>{let k=/^\$argon2(id|i|d)\$v=([0-9]+)\$((?:[mtp]=[0-9]+,){2}[mtp]=[0-9]+)\$([A-Za-z0-9+/]+)\$([A-Za-z0-9+/]+)$/,U=g.match(k);if(!U)throw new Error("Invalid hash");let[,G,le,me,Pn,Fr]=U;if(le!=="19")throw new Error(`Unsupported version: ${le}`);let Lr={},ui={m:"memorySize",p:"parallelism",t:"iterations"};for(let Mr of me.split(",")){let[la,Li]=Mr.split("=");Lr[ui[la]]=Number(Li)}return Object.assign(Object.assign({},Lr),{password:c,secret:y,hashType:G,salt:He(Pn),hashLength:Ye(Fr),outputType:"encoded"})},DV=c=>{if(!c||typeof c!="object")throw new Error("Invalid options parameter. It requires an object.");if(c.hash===void 0||typeof c.hash!="string")throw new Error("Hash should be specified")};function UV(c){return o(this,void 0,void 0,function*(){DV(c);let g=OV(c.password,c.hash,c.secret);np(g);let y=c.hash.lastIndexOf("$")+1;return(yield ep(g)).substring(y)===c.hash.substring(y)})}var TV="blake2s",xV="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",JV="5c0ff166",vU={name:TV,data:xV,hash:JV};let qV=new a,Lc=null;function tp(c){return!Number.isInteger(c)||c<8||c>256||c%8!==0?new Error("Invalid variant! Valid values: 8, 16, ..., 256"):null}function OU(c,g){return c|g<<16}function FV(c,g=256,y=null){if(tp(g))return Promise.reject(tp(g));let k=null,U=g;if(y!==null){if(k=b(y),k.length>32)return Promise.reject(new Error("Max key length is 32 bytes"));U=OU(g,k.length)}let G=g/8;if(Lc===null||Lc.hashLength!==G)return w(qV,vU,G).then(le=>(Lc=le,U>512&&Lc.writeMemory(k),Lc.calculate(c,U)));try{U>512&&Lc.writeMemory(k);let le=Lc.calculate(c,U);return Promise.resolve(le)}catch(le){return Promise.reject(le)}}function MV(c=256,g=null){if(tp(c))return Promise.reject(tp(c));let y=null,k=c;if(g!==null){if(y=b(g),y.length>32)return Promise.reject(new Error("Max key length is 32 bytes"));k=OU(c,y.length)}let U=c/8;return Q(vU,U).then(G=>{k>512&&G.writeMemory(y),G.init(k);let le={init:k>512?()=>(G.writeMemory(y),G.init(k),le):()=>(G.init(k),le),update:me=>(G.update(me),le),digest:me=>G.digest(me),save:()=>G.save(),load:me=>(G.load(me),le),blockSize:64,digestSize:U};return le})}var HV="blake3",_V="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IQEgAkFAaiICQcAASw0ACwsCQEHAACAHQf8BcSIGayIFIAIgBSACSRsiCUUNACAJQQNxIQtBACEFAkAgCUEESQ0AIAAgBmohByAJQfwAcSEIQQAhBQNAIAcgBWoiAkEoaiABIAVqIgotAAA6AAAgAkEpaiAKQQFqLQAAOgAAIAJBKmogCkECai0AADoAACACQStqIApBA2otAAA6AAAgCCAFQQRqIgVHDQALCwJAIAtFDQAgASAFaiEBIAUgBmogAGpBKGohBQNAIAUgAS0AADoAACABQQFqIQEgBUEBaiEFIAtBf2oiCw0ACwsgAC0AaCEHCyAAIAcgCWo6AGggA0HAAGokAAveAwQFfwN+BX8GfiMAQdABayIBJAACQCAAe6ciAkEALQCQigEiA08NAEEALQCKigFBBHIhBCABQShqIQVBACkDmIkBIQBBACkDkIkBIQZBACkDiIkBIQdBACkDgIkBIQggAyEJA0AgASAANwMYIAEgBjcDECABIAc3AwggASAINwMAIAEgA0EFdCIDQdGJAWoiCikDADcDKCABIANB2YkBaiILKQMANwMwIAEgA0HhiQFqIgwpAwA3AzggASADQemJAWoiDSkDADcDQCABIANB8YkBaikDADcDSCABIANB+YkBaikDADcDUCABIANBgYoBaikDADcDWCADQYmKAWopAwAhDiABQcAAOgBoIAEgDjcDYCABQgA3AyAgASAEOgBpIAEgADcDiAEgASAGNwOAASABIAc3A3ggASAINwNwIAFBkAFqIAFB8ABqIAVBwABCACAEQf8BcRACIAEpA7ABIQ4gASkDkAEhDyABKQO4ASEQIAEpA5gBIREgASkDwAEhEiABKQOgASETIA0gASkDyAEgASkDqAGFNwMAIAwgEiAThTcDACALIBAgEYU3AwAgCiAOIA+FNwMAIAlBf2oiCUH/AXEiAyACSw0AC0EAIAk6AJCKAQsgAUHQAWokAAvHCQIKfwV+IwBB4AJrIgUkAAJAAkAgAUGACEsNACAFIAA2AvwBIAVB/AFqIAFBgAhGIgZBECACQQEgA0EBQQIgBBABIAZBCnQiByABTw0BIAVB4ABqIgZCADcDACAFQdgAaiIIQgA3AwAgBUHQAGoiCUIANwMAIAVByABqIgpCADcDACAFQcAAaiILQgA3AwAgBUE4aiIMQgA3AwAgBUEwaiINQgA3AwAgBSADOgBqIAVCADcDKCAFQQA7AWggBUEAKQOAiQE3AwAgBUEAKQOIiQE3AwggBUEAKQOQiQE3AxAgBUEAKQOYiQE3AxggBSABQYAIRiIOrSACfDcDICAFIAAgB2pBACABIA4bEAQgBUGIAWpBMGogDSkDADcDACAFQYgBakE4aiAMKQMANwMAIAUgBSkDACIPNwOIASAFIAUpAwgiEDcDkAEgBSAFKQMQIhE3A5gBIAUgBSkDGCISNwOgASAFIAUpAyg3A7ABIAUtAGohACAFLQBpIQcgBSkDICECIAUtAGghASAFQYgBakHAAGogCykDADcDACAFQYgBakHIAGogCikDADcDACAFQYgBakHQAGogCSkDADcDACAFQYgBakHYAGogCCkDADcDACAFQYgBakHgAGogBikDADcDACAFIAE6APABIAUgAjcDqAEgBSAAIAdFckECciIAOgDxASAFIBI3A5gCIAUgETcDkAIgBSAQNwOIAiAFIA83A4ACIAVBoAJqIAVBgAJqIAVBsAFqIAEgAiAAQf8BcRACIAUpA8ACIQIgBSkDoAIhDyAFKQPIAiEQIAUpA6gCIREgBSkD0AIhEiAFKQOwAiETIAQgDkEFdGoiASAFKQPYAiAFKQO4AoU3AxggASASIBOFNwMQIAEgECARhTcDCCABIAIgD4U3AwBBAkEBIA4bIQYMAQsgAEIBIAFBf2pBCnZBAXKteUI/hYYiD6dBCnQiDiACIAMgBRAGIQcgACAOaiABIA5rIA9C////AYMgAnwgAyAFQcAAQSAgDkGACEsbahAGIQECQCAHQQFHDQAgBCAFKQMANwMAIAQgBSkDCDcDCCAEIAUpAxA3AxAgBCAFKQMYNwMYIAQgBSkDIDcDICAEIAUpAyg3AyggBCAFKQMwNwMwIAQgBSkDODcDOEECIQYMAQtBACEGQQAhAAJAIAEgB2oiCUECSQ0AIAlBfmoiCkEBdkEBaiIGQQNxIQ5BACEHAkAgCkEGSQ0AIAZB/P///wdxIQhBACEHIAVBiAFqIQEgBSEAA0AgASAANgIAIAFBDGogAEHAAWo2AgAgAUEIaiAAQYABajYCACABQQRqIABBwABqNgIAIABBgAJqIQAgAUEQaiEBIAggB0EEaiIHRw0ACwsgCkF+cSEIAkAgDkUNACAFIAdBBnRqIQEgBUGIAWogB0ECdGohAANAIAAgATYCACABQcAAaiEBIABBBGohACAOQX9qIg4NAAsLIAhBAmohAAsgBUGIAWogBkEBQgBBACADQQRyQQBBACAEEAEgACAJTw0AIAQgBkEFdGoiASAFIAZBBnRqIgApAwA3AwAgASAAKQMINwMIIAEgACkDEDcDECABIAApAxg3AxggBkEBaiEGCyAFQeACaiQAIAYLrRAIAn8EfgF/AX4EfwR+BH8EfiMAQfABayIBJAACQCAARQ0AAkBBAC0AkIoBIgINACABQTBqQQApA9CJATcDACABQThqQQApA9iJATcDACABQQApA6CJASIDNwMAIAFBACkDqIkBIgQ3AwggAUEAKQOwiQEiBTcDECABQQApA7iJASIGNwMYIAFBACkDyIkBNwMoQQAtAIqKASECQQAtAImKASEHQQApA8CJASEIQQAtAIiKASEJIAFBwABqQQApA+CJATcDACABQcgAakEAKQPoiQE3AwAgAUHQAGpBACkD8IkBNwMAIAFB2ABqQQApA/iJATcDACABQeAAakEAKQOAigE3AwAgASAJOgBoIAEgCDcDICABIAIgB0VyIgJBAnI6AGkgAUEoaiEKQgAhCEGACSELIAJBCnJB/wFxIQwDQCABQbABaiABIAogCUH/AXEgCCAMEAIgASABKQPQASINIAEpA7ABhTcDcCABIAEpA9gBIg4gASkDuAGFNwN4IAEgASkD4AEiDyABKQPAAYU3A4ABIAEgASkD6AEiECAGhTcDqAEgASAPIAWFNwOgASABIA4gBIU3A5gBIAEgDSADhTcDkAEgASAQIAEpA8gBhTcDiAEgAEHAACAAQcAASRsiEUF/aiESAkACQCARQQdxIhMNACABQfAAaiECIAshByARIRQMAQsgEUH4AHEhFCABQfAAaiECIAshBwNAIAcgAi0AADoAACAHQQFqIQcgAkEBaiECIBNBf2oiEw0ACwsCQCASQQdJDQADQCAHIAIpAAA3AAAgB0EIaiEHIAJBCGohAiAUQXhqIhQNAAsLIAhCAXwhCCALIBFqIQsgACARayIADQAMAgsLAkACQAJAQQAtAImKASIHQQZ0QQBBAC0AiIoBIhFrRg0AIAEgEToAaCABQQApA4CKATcDYCABQQApA/iJATcDWCABQQApA/CJATcDUCABQQApA+iJATcDSCABQQApA+CJATcDQCABQQApA9iJATcDOCABQQApA9CJATcDMCABQQApA8iJATcDKCABQQApA8CJASIINwMgIAFBACkDuIkBIgM3AxggAUEAKQOwiQEiBDcDECABQQApA6iJASIFNwMIIAFBACkDoIkBIgY3AwAgAUEALQCKigEiEyAHRXJBAnIiCzoAaSATQQRyIRNBACkDmIkBIQ1BACkDkIkBIQ5BACkDiIkBIQ9BACkDgIkBIRAMAQtBwAAhESABQcAAOgBoQgAhCCABQgA3AyAgAUEAKQOYiQEiDTcDGCABQQApA5CJASIONwMQIAFBACkDiIkBIg83AwggAUEAKQOAiQEiEDcDACABQQAtAIqKAUEEciITOgBpIAEgAkF+aiICQQV0IgdByYoBaikDADcDYCABIAdBwYoBaikDADcDWCABIAdBuYoBaikDADcDUCABIAdBsYoBaikDADcDSCABIAdBqYoBaikDADcDQCABIAdBoYoBaikDADcDOCABIAdBmYoBaikDADcDMCABIAdBkYoBaikDADcDKCATIQsgECEGIA8hBSAOIQQgDSEDIAJFDQELIAJBf2oiB0EFdCIUQZGKAWopAwAhFSAUQZmKAWopAwAhFiAUQaGKAWopAwAhFyAUQamKAWopAwAhGCABIAM3A4gBIAEgBDcDgAEgASAFNwN4IAEgBjcDcCABQbABaiABQfAAaiABQShqIhQgESAIIAtB/wFxEAIgASATOgBpIAFBwAA6AGggASAYNwNAIAEgFzcDOCABIBY3AzAgASAVNwMoIAFCADcDICABIA03AxggASAONwMQIAEgDzcDCCABIBA3AwAgASABKQPoASABKQPIAYU3A2AgASABKQPgASABKQPAAYU3A1ggASABKQPYASABKQO4AYU3A1AgASABKQPQASABKQOwAYU3A0ggB0UNACACQQV0QemJAWohAiATQf8BcSERA0AgAkFoaikDACEIIAJBcGopAwAhAyACQXhqKQMAIQQgAikDACEFIAEgDTcDiAEgASAONwOAASABIA83A3ggASAQNwNwIAFBsAFqIAFB8ABqIBRBwABCACAREAIgASATOgBpIAFBwAA6AGggASAFNwNAIAEgBDcDOCABIAM3AzAgASAINwMoIAFCADcDICABIA03AxggASAONwMQIAEgDzcDCCABIBA3AwAgASABKQPoASABKQPIAYU3A2AgASABKQPgASABKQPAAYU3A1ggASABKQPYASABKQO4AYU3A1AgASABKQPQASABKQOwAYU3A0ggAkFgaiECIAdBf2oiBw0ACwsgAUEoaiEJQgAhCEGACSELIBNBCHJB/wFxIQoDQCABQbABaiABIAlBwAAgCCAKEAIgASABKQPQASIDIAEpA7ABhTcDcCABIAEpA9gBIgQgASkDuAGFNwN4IAEgASkD4AEiBSABKQPAAYU3A4ABIAEgDSABKQPoASIGhTcDqAEgASAOIAWFNwOgASABIA8gBIU3A5gBIAEgECADhTcDkAEgASAGIAEpA8gBhTcDiAEgAEHAACAAQcAASRsiEUF/aiESAkACQCARQQdxIhMNACABQfAAaiECIAshByARIRQMAQsgEUH4AHEhFCABQfAAaiECIAshBwNAIAcgAi0AADoAACAHQQFqIQcgAkEBaiECIBNBf2oiEw0ACwsCQCASQQdJDQADQCAHIAIpAAA3AAAgB0EIaiEHIAJBCGohAiAUQXhqIhQNAAsLIAhCAXwhCCALIBFqIQsgACARayIADQALCyABQfABaiQAC6MCAQR+AkACQCAAQSBGDQBCq7OP/JGjs/DbACEBQv+kuYjFkdqCm38hAkLy5rvjo6f9p6V/IQNC58yn0NbQ67O7fyEEQQAhAAwBC0EAKQOYCSEBQQApA5AJIQJBACkDiAkhA0EAKQOACSEEQRAhAAtBACAAOgCKigFBAEIANwOAigFBAEIANwP4iQFBAEIANwPwiQFBAEIANwPoiQFBAEIANwPgiQFBAEIANwPYiQFBAEIANwPQiQFBAEIANwPIiQFBAEIANwPAiQFBACABNwO4iQFBACACNwOwiQFBACADNwOoiQFBACAENwOgiQFBACABNwOYiQFBACACNwOQiQFBACADNwOIiQFBACAENwOAiQFBAEEAOgCQigFBAEEAOwGIigELBgAgABADCwYAIAAQBwsGAEGAiQELqwIBBH4CQAJAIAFBIEYNAEKrs4/8kaOz8NsAIQNC/6S5iMWR2oKbfyEEQvLmu+Ojp/2npX8hBULnzKfQ1tDrs7t/IQZBACEBDAELQQApA5gJIQNBACkDkAkhBEEAKQOICSEFQQApA4AJIQZBECEBC0EAIAE6AIqKAUEAQgA3A4CKAUEAQgA3A/iJAUEAQgA3A/CJAUEAQgA3A+iJAUEAQgA3A+CJAUEAQgA3A9iJAUEAQgA3A9CJAUEAQgA3A8iJAUEAQgA3A8CJAUEAIAM3A7iJAUEAIAQ3A7CJAUEAIAU3A6iJAUEAIAY3A6CJAUEAIAM3A5iJAUEAIAQ3A5CJAUEAIAU3A4iJAUEAIAY3A4CJAUEAQQA6AJCKAUEAQQA7AYiKASAAEAMgAhAHCwsLAQBBgAgLBHgHAAA=",GV="215d875f",DU={name:HV,data:_V,hash:GV};let VV=new a,Yc=null;function rp(c){return!Number.isInteger(c)||c<8||c%8!==0?new Error("Invalid variant! Valid values: 8, 16, ..."):null}function WV(c,g=256,y=null){if(rp(g))return Promise.reject(rp(g));let k=null,U=0;if(y!==null){if(k=b(y),k.length!==32)return Promise.reject(new Error("Key length must be exactly 32 bytes"));U=32}let G=g/8,le=G;if(Yc===null||Yc.hashLength!==G)return w(VV,DU,G).then(me=>(Yc=me,U===32&&Yc.writeMemory(k),Yc.calculate(c,U,le)));try{U===32&&Yc.writeMemory(k);let me=Yc.calculate(c,U,le);return Promise.resolve(me)}catch(me){return Promise.reject(me)}}function KV(c=256,g=null){if(rp(c))return Promise.reject(rp(c));let y=null,k=0;if(g!==null){if(y=b(g),y.length!==32)return Promise.reject(new Error("Key length must be exactly 32 bytes"));k=32}let U=c/8,G=U;return Q(DU,U).then(le=>{k===32&&le.writeMemory(y),le.init(k);let me={init:k===32?()=>(le.writeMemory(y),le.init(k),me):()=>(le.init(k),me),update:Pn=>(le.update(Pn),me),digest:Pn=>le.digest(Pn,G),save:()=>le.save(),load:Pn=>(le.load(Pn),me),blockSize:64,digestSize:U};return me})}var LV="crc32",YV="AGFzbQEAAAABEQRgAAF/YAF/AGAAAGACf38AAwgHAAEBAQIAAwUEAQECAgYOAn8BQZDJBQt/AEGACAsHcAgGbWVtb3J5AgAOSGFzaF9HZXRCdWZmZXIAAAlIYXNoX0luaXQAAgtIYXNoX1VwZGF0ZQADCkhhc2hfRmluYWwABA1IYXNoX0dldFN0YXRlAAUOSGFzaF9DYWxjdWxhdGUABgpTVEFURV9TSVpFAwEKkggHBQBBgAkLwwMBA39BgIkBIQFBACECA0AgAUEAQQBBAEEAQQBBAEEAQQAgAkEBcWsgAHEgAkEBdnMiA0EBcWsgAHEgA0EBdnMiA0EBcWsgAHEgA0EBdnMiA0EBcWsgAHEgA0EBdnMiA0EBcWsgAHEgA0EBdnMiA0EBcWsgAHEgA0EBdnMiA0EBcWsgAHEgA0EBdnMiA0EBcWsgAHEgA0EBdnM2AgAgAUEEaiEBIAJBAWoiAkGAAkcNAAtBACEAA0AgAEGEkQFqIABBhIkBaigCACICQf8BcUECdEGAiQFqKAIAIAJBCHZzIgI2AgAgAEGEmQFqIAJB/wFxQQJ0QYCJAWooAgAgAkEIdnMiAjYCACAAQYShAWogAkH/AXFBAnRBgIkBaigCACACQQh2cyICNgIAIABBhKkBaiACQf8BcUECdEGAiQFqKAIAIAJBCHZzIgI2AgAgAEGEsQFqIAJB/wFxQQJ0QYCJAWooAgAgAkEIdnMiAjYCACAAQYS5AWogAkH/AXFBAnRBgIkBaigCACACQQh2cyICNgIAIABBhMEBaiACQf8BcUECdEGAiQFqKAIAIAJBCHZzNgIAIABBBGoiAEH8B0cNAAsLJwACQEEAKAKAyQEgAEYNACAAEAFBACAANgKAyQELQQBBADYChMkBC4gDAQN/QQAoAoTJAUF/cyEBQYAJIQICQCAAQQhJDQBBgAkhAgNAIAJBBGooAgAiA0EOdkH8B3FBgJEBaigCACADQRZ2QfwHcUGAiQFqKAIAcyADQQZ2QfwHcUGAmQFqKAIAcyADQf8BcUECdEGAoQFqKAIAcyACKAIAIAFzIgFBFnZB/AdxQYCpAWooAgBzIAFBDnZB/AdxQYCxAWooAgBzIAFBBnZB/AdxQYC5AWooAgBzIAFB/wFxQQJ0QYDBAWooAgBzIQEgAkEIaiECIABBeGoiAEEHSw0ACwsCQCAARQ0AAkACQCAAQQFxDQAgACEDDAELIAFB/wFxIAItAABzQQJ0QYCJAWooAgAgAUEIdnMhASACQQFqIQIgAEF/aiEDCyAAQQFGDQADQCABQf8BcSACLQAAc0ECdEGAiQFqKAIAIAFBCHZzIgFB/wFxIAJBAWotAABzQQJ0QYCJAWooAgAgAUEIdnMhASACQQJqIQIgA0F+aiIDDQALC0EAIAFBf3M2AoTJAQsyAQF/QQBBACgChMkBIgBBGHQgAEGA/gNxQQh0ciAAQQh2QYD+A3EgAEEYdnJyNgKACQsGAEGEyQELWQACQEEAKAKAyQEgAUYNACABEAFBACABNgKAyQELQQBBADYChMkBIAAQA0EAQQAoAoTJASIBQRh0IAFBgP4DcUEIdHIgAUEIdkGA/gNxIAFBGHZycjYCgAkLCwsBAEGACAsEBAAAAA==",zV="d2eba587",UU={name:LV,data:YV,hash:zV};let ZV=new a,ip=null;function op(c){return!Number.isInteger(c)||c<0||c>4294967295?new Error("Polynomial must be a valid 32-bit long unsigned integer"):null}function XV(c,g=3988292384){if(op(g))return Promise.reject(op(g));if(ip===null)return w(ZV,UU,4).then(y=>(ip=y,ip.calculate(c,g)));try{let y=ip.calculate(c,g);return Promise.resolve(y)}catch(y){return Promise.reject(y)}}function $V(c=3988292384){return op(c)?Promise.reject(op(c)):Q(UU,4).then(g=>{g.init(c);let y={init:()=>(g.init(c),y),update:k=>(g.update(k),y),digest:k=>g.digest(k),save:()=>g.save(),load:k=>(g.load(k),y),blockSize:4,digestSize:4};return y})}var jV="crc64",e6="AGFzbQEAAAABDANgAAF/YAAAYAF/AAMHBgABAgEAAQUEAQECAgYOAn8BQZCJBgt/AEGACAsHcAgGbWVtb3J5AgAOSGFzaF9HZXRCdWZmZXIAAAlIYXNoX0luaXQAAQtIYXNoX1VwZGF0ZQACCkhhc2hfRmluYWwAAw1IYXNoX0dldFN0YXRlAAQOSGFzaF9DYWxjdWxhdGUABQpTVEFURV9TSVpFAwEKgwgGBQBBgAkL9QMDAX4BfwJ+AkBBACkDgIkCQQApA4AJIgBRDQBBgIkBIQFCACECA0AgAUIAQgBCAEIAQgBCAEIAQgAgAkIBg30gAIMgAkIBiIUiA0IBg30gAIMgA0IBiIUiA0IBg30gAIMgA0IBiIUiA0IBg30gAIMgA0IBiIUiA0IBg30gAIMgA0IBiIUiA0IBg30gAIMgA0IBiIUiA0IBg30gAIMgA0IBiIUiA0IBg30gAIMgA0IBiIU3AwAgAUEIaiEBIAJCAXwiAkKAAlINAAtBACEBA0AgAUGImQFqIAFBiIkBaikDACICp0H/AXFBA3RBgIkBaikDACACQgiIhSICNwMAIAFBiKkBaiACp0H/AXFBA3RBgIkBaikDACACQgiIhSICNwMAIAFBiLkBaiACp0H/AXFBA3RBgIkBaikDACACQgiIhSICNwMAIAFBiMkBaiACp0H/AXFBA3RBgIkBaikDACACQgiIhSICNwMAIAFBiNkBaiACp0H/AXFBA3RBgIkBaikDACACQgiIhSICNwMAIAFBiOkBaiACp0H/AXFBA3RBgIkBaikDACACQgiIhSICNwMAIAFBiPkBaiACp0H/AXFBA3RBgIkBaikDACACQgiIhTcDACABQQhqIgFB+A9HDQALQQAgADcDgIkCC0EAQgA3A4iJAguUAwIBfgJ/QQApA4iJAkJ/hSEBQYAJIQICQCAAQQhJDQBBgAkhAgNAIAIpAwAgAYUiAUIwiKdB/wFxQQN0QYCZAWopAwAgAUI4iKdBA3RBgIkBaikDAIUgAUIoiKdB/wFxQQN0QYCpAWopAwCFIAFCIIinQf8BcUEDdEGAuQFqKQMAhSABpyIDQRV2QfgPcUGAyQFqKQMAhSADQQ12QfgPcUGA2QFqKQMAhSADQQV2QfgPcUGA6QFqKQMAhSADQf8BcUEDdEGA+QFqKQMAhSEBIAJBCGohAiAAQXhqIgBBB0sNAAsLAkAgAEUNAAJAAkAgAEEBcQ0AIAAhAwwBCyABQv8BgyACMQAAhadBA3RBgIkBaikDACABQgiIhSEBIAJBAWohAiAAQX9qIQMLIABBAUYNAANAIAFC/wGDIAIxAACFp0EDdEGAiQFqKQMAIAFCCIiFIgFC/wGDIAJBAWoxAACFp0EDdEGAiQFqKQMAIAFCCIiFIQEgAkECaiECIANBfmoiAw0ACwtBACABQn+FNwOIiQILZAEBfkEAQQApA4iJAiIAQjiGIABCgP4Dg0IohoQgAEKAgPwHg0IYhiAAQoCAgPgPg0IIhoSEIABCCIhCgICA+A+DIABCGIhCgID8B4OEIABCKIhCgP4DgyAAQjiIhISENwOACQsGAEGIiQILAgALCwsBAEGACAsECAAAAA==",n6="c5ac6c16",TU={name:jV,data:e6,hash:n6};let t6=new a,qu=null,ap=new Uint8Array(8);function xU(c){let g="Polynomial must be provided as a 16 char long hex string";if(typeof c!="string"||c.length!==16)return{hi:0,lo:0,err:new Error(g)};let y=+`0x${c.slice(0,8)}`,k=+`0x${c.slice(8)}`;return Number.isNaN(y)||Number.isNaN(k)?{hi:y,lo:k,err:new Error(g)}:{hi:y,lo:k,err:null}}function IB(c,g,y){let k=new DataView(c);k.setUint32(0,g,!0),k.setUint32(4,y,!0)}function r6(c,g="c96c5795d7870f42"){let{hi:y,lo:k,err:U}=xU(g);if(U!==null)return Promise.reject(U);if(qu===null)return w(t6,TU,8).then(G=>(qu=G,IB(ap.buffer,k,y),qu.writeMemory(ap),qu.calculate(c)));try{IB(ap.buffer,k,y),qu.writeMemory(ap);let G=qu.calculate(c);return Promise.resolve(G)}catch(G){return Promise.reject(G)}}function i6(c="c96c5795d7870f42"){let{hi:g,lo:y,err:k}=xU(c);return k!==null?Promise.reject(k):Q(TU,8).then(U=>{let G=new Uint8Array(8);IB(G.buffer,y,g),U.writeMemory(G),U.init();let le={init:()=>(U.writeMemory(G),U.init(),le),update:me=>(U.update(me),le),digest:me=>U.digest(me),save:()=>U.save(),load:me=>(U.load(me),le),blockSize:8,digestSize:8};return le})}var o6="md4",a6="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",s6="bd8ce7c7",JU={name:o6,data:a6,hash:s6};let d6=new a,sp=null;function c6(c){if(sp===null)return w(d6,JU,16).then(g=>(sp=g,sp.calculate(c)));try{let g=sp.calculate(c);return Promise.resolve(g)}catch(g){return Promise.reject(g)}}function u6(){return Q(JU,16).then(c=>{c.init();let g={init:()=>(c.init(),g),update:y=>(c.update(y),g),digest:y=>c.digest(y),save:()=>c.save(),load:y=>(c.load(y),g),blockSize:64,digestSize:16};return g})}var A6="md5",f6="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",l6="e6508e4b",qU={name:A6,data:f6,hash:l6};let g6=new a,dp=null;function p6(c){if(dp===null)return w(g6,qU,16).then(g=>(dp=g,dp.calculate(c)));try{let g=dp.calculate(c);return Promise.resolve(g)}catch(g){return Promise.reject(g)}}function I6(){return Q(qU,16).then(c=>{c.init();let g={init:()=>(c.init(),g),update:y=>(c.update(y),g),digest:y=>c.digest(y),save:()=>c.save(),load:y=>(c.load(y),g),blockSize:64,digestSize:16};return g})}var h6="sha1",y6="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",B6="6b530c24",FU={name:h6,data:y6,hash:B6};let m6=new a,cp=null;function C6(c){if(cp===null)return w(m6,FU,20).then(g=>(cp=g,cp.calculate(c)));try{let g=cp.calculate(c);return Promise.resolve(g)}catch(g){return Promise.reject(g)}}function S6(){return Q(FU,20).then(c=>{c.init();let g={init:()=>(c.init(),g),update:y=>(c.update(y),g),digest:y=>c.digest(y),save:()=>c.save(),load:y=>(c.load(y),g),blockSize:64,digestSize:20};return g})}var k6="sha3",E6="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",Q6="fb24e536",up={name:k6,data:E6,hash:Q6};let w6=new a,Hf=null;function Ap(c){return[224,256,384,512].includes(c)?null:new Error("Invalid variant! Valid values: 224, 256, 384, 512")}function R6(c,g=512){if(Ap(g))return Promise.reject(Ap(g));let y=g/8;if(Hf===null||Hf.hashLength!==y)return w(w6,up,y).then(k=>(Hf=k,Hf.calculate(c,g,6)));try{let k=Hf.calculate(c,g,6);return Promise.resolve(k)}catch(k){return Promise.reject(k)}}function b6(c=512){if(Ap(c))return Promise.reject(Ap(c));let g=c/8;return Q(up,g).then(y=>{y.init(c);let k={init:()=>(y.init(c),k),update:U=>(y.update(U),k),digest:U=>y.digest(U,6),save:()=>y.save(),load:U=>(y.load(U),k),blockSize:200-2*g,digestSize:g};return k})}let P6=new a,_f=null;function fp(c){return[224,256,384,512].includes(c)?null:new Error("Invalid variant! Valid values: 224, 256, 384, 512")}function N6(c,g=512){if(fp(g))return Promise.reject(fp(g));let y=g/8;if(_f===null||_f.hashLength!==y)return w(P6,up,y).then(k=>(_f=k,_f.calculate(c,g,1)));try{let k=_f.calculate(c,g,1);return Promise.resolve(k)}catch(k){return Promise.reject(k)}}function v6(c=512){if(fp(c))return Promise.reject(fp(c));let g=c/8;return Q(up,g).then(y=>{y.init(c);let k={init:()=>(y.init(c),k),update:U=>(y.update(U),k),digest:U=>y.digest(U,1),save:()=>y.save(),load:U=>(y.load(U),k),blockSize:200-2*g,digestSize:g};return k})}var O6="sha256",D6="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c2pBx6KerX1qIhkgASADcyACcSABIANxcyABQR53IAFBE3dzIAFBCndzaiAaaiICaiIJIBMgEnNxIBJzaiAJQRp3IAlBFXdzIAlBB3dzakHRxqk2aiIaIAIgAXMgA3EgAiABcXMgAkEedyACQRN3cyACQQp3c2ogGGoiA2oiESAJIBNzcSATc2ogEUEadyARQRV3cyARQQd3c2pB59KkoQFqIhggAyACcyABcSADIAJxcyADQR53IANBE3dzIANBCndzaiAUaiIBaiISIBEgCXNxIAlzaiASQRp3IBJBFXdzIBJBB3dzakGFldy9AmoiFCABIANzIAJxIAEgA3FzIAFBHncgAUETd3MgAUEKd3NqIBdqIgJqIhMgI2ogJiASaiAiIBFqICUgCWogEyASIBFzcSARc2ogE0EadyATQRV3cyATQQd3c2pBuMLs8AJqIhcgAiABcyADcSACIAFxcyACQR53IAJBE3dzIAJBCndzaiAZaiIDaiIJIBMgEnNxIBJzaiAJQRp3IAlBFXdzIAlBB3dzakH827HpBGoiGSADIAJzIAFxIAMgAnFzIANBHncgA0ETd3MgA0EKd3NqIBpqIgFqIhEgCSATc3EgE3NqIBFBGncgEUEVd3MgEUEHd3NqQZOa4JkFaiIaIAEgA3MgAnEgASADcXMgAUEedyABQRN3cyABQQp3c2ogGGoiAmoiEiARIAlzcSAJc2ogEkEadyASQRV3cyASQQd3c2pB1OapqAZqIhggAiABcyADcSACIAFxcyACQR53IAJBE3dzIAJBCndzaiAUaiIDaiITaiAoIBJqICQgEWogJyAJaiATIBIgEXNxIBFzaiATQRp3IBNBFXdzIBNBB3dzakG7laizB2oiFCADIAJzIAFxIAMgAnFzIANBHncgA0ETd3MgA0EKd3NqIBdqIgFqIgkgEyASc3EgEnNqIAlBGncgCUEVd3MgCUEHd3NqQa6Si454aiIXIAEgA3MgAnEgASADcXMgAUEedyABQRN3cyABQQp3c2ogGWoiAmoiESAJIBNzcSATc2ogEUEadyARQRV3cyARQQd3c2pBhdnIk3lqIhkgAiABcyADcSACIAFxcyACQR53IAJBE3dzIAJBCndzaiAaaiIDaiISIBEgCXNxIAlzaiASQRp3IBJBFXdzIBJBB3dzakGh0f+VemoiGiADIAJz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",U6="8c18dd94",lp={name:O6,data:D6,hash:U6};let T6=new a,gp=null;function x6(c){if(gp===null)return w(T6,lp,28).then(g=>(gp=g,gp.calculate(c,224)));try{let g=gp.calculate(c,224);return Promise.resolve(g)}catch(g){return Promise.reject(g)}}function J6(){return Q(lp,28).then(c=>{c.init(224);let g={init:()=>(c.init(224),g),update:y=>(c.update(y),g),digest:y=>c.digest(y),save:()=>c.save(),load:y=>(c.load(y),g),blockSize:64,digestSize:28};return g})}let q6=new a,pp=null;function F6(c){if(pp===null)return w(q6,lp,32).then(g=>(pp=g,pp.calculate(c,256)));try{let g=pp.calculate(c,256);return Promise.resolve(g)}catch(g){return Promise.reject(g)}}function MU(){return Q(lp,32).then(c=>{c.init(256);let g={init:()=>(c.init(256),g),update:y=>(c.update(y),g),digest:y=>c.digest(y),save:()=>c.save(),load:y=>(c.load(y),g),blockSize:64,digestSize:32};return g})}var M6="sha512",H6="AGFzbQEAAAABEQRgAAF/YAF/AGAAAGACf38AAwgHAAEBAQIAAwUEAQECAgYOAn8BQdCKBQt/AEGACAsHcAgGbWVtb3J5AgAOSGFzaF9HZXRCdWZmZXIAAAlIYXNoX0luaXQAAQtIYXNoX1VwZGF0ZQACCkhhc2hfRmluYWwABA1IYXNoX0dldFN0YXRlAAUOSGFzaF9DYWxjdWxhdGUABgpTVEFURV9TSVpFAwEKlWgHBQBBgAkLmwIAQQBCADcDgIoBQQBBMEHAACAAQYADRiIAGzYCyIoBQQBCpJ/p99uD0trHAEL5wvibkaOz8NsAIAAbNwPAigFBAEKnn+an1sGLhltC6/qG2r+19sEfIAAbNwO4igFBAEKRquDC9tCS2o5/Qp/Y+dnCkdqCm38gABs3A7CKAUEAQrGWgP7/zMmZ5wBC0YWa7/rPlIfRACAAGzcDqIoBQQBCubK5uI+b+5cVQvHt9Pilp/2npX8gABs3A6CKAUEAQpe6w4Ojq8CskX9Cq/DT9K/uvLc8IAAbNwOYigFBAEKHqvOzo6WKzeIAQrvOqqbY0Ouzu38gABs3A5CKAUEAQti9lojcq+fdS0KIkvOd/8z5hOoAIAAbNwOIigEL8gICAX4Gf0EAQQApA4CKASIBIACtfDcDgIoBAkACQAJAIAGnQf8AcSICDQBBgAkhAwwBCwJAQYABIAJrIgQgACAEIABJGyIDRQ0AIANBA3EhBSACQYCJAWohBkEAIQICQCADQQRJDQAgA0H8AXEhB0EAIQIDQCAGIAJqIgMgAkGACWotAAA6AAAgA0EBaiACQYEJai0AADoAACADQQJqIAJBgglqLQAAOgAAIANBA2ogAkGDCWotAAA6AAAgByACQQRqIgJHDQALCyAFRQ0AA0AgBiACaiACQYAJai0AADoAACACQQFqIQIgBUF/aiIFDQALCyAAIARJDQFBgIkBEAMgACAEayEAIARBgAlqIQMLAkAgAEGAAUkNAANAIAMQAyADQYABaiEDIABBgH9qIgBB/wBLDQALCyAARQ0AQQAhAkEAIQUDQCACQYCJAWogAyACai0AADoAACACQQFqIQIgACAFQQFqIgVB/wFxSw0ACwsL3FYBVn5BACAAKQMIIgFCOIYgAUKA/gODQiiGhCABQoCA/AeDQhiGIAFCgICA+A+DQgiGhIQgAUIIiEKAgID4D4MgAUIYiEKAgPwHg4QgAUIoiEKA/gODIAFCOIiEhIQiAkI/iSACQjiJhSACQgeIhSAAKQMAIgFCOIYgAUKA/gODQiiGhCABQoCA/AeDQhiGIAFCgICA+A+DQgiGhIQgAUIIiEKAgID4D4MgAUIYiEKAgPwHg4QgAUIoiEKA/gODIAFCOIiEhIQiA3wgACkDSCIBQjiGIAFCgP4Dg0IohoQgAUKAgPwHg0IYhiABQoCAgPgPg0IIhoSEIAFCCIhCgICA+A+DIAFCGIhCgID8B4OEIAFCKIhCgP4DgyABQjiIhISEIgR8IAApA3AiAUI4hiABQoD+A4NCKIaEIAFCgID8B4NCGIYgAUKAgID4D4NCCIaEhCABQgiIQoCAgPgPgyABQhiIQoCA/AeDhCABQiiIQoD+A4MgAUI4iISEhCIFQi2JIAVCA4mFIAVCBoiFfCIGQj+JIAZCOImFIAZCB4iFIAApA3giAUI4hiABQoD+A4NCKIaEIAFCgID8B4NCGIYgAUKAgID4D4NCCIaEhCABQgiIQoCAgPgPgyABQhiIQoCA/AeDhCABQiiIQoD+A4MgAUI4iISEhCIHfCAEQj+JIARCOImFIARCB4iFIAApA0AiAUI4hiABQoD+A4NCKIaEIAFCgID8B4NCGIYgAUKAgID4D4NCCIaEhCABQgiIQoCAgPgPgyABQhiIQoCA/AeDhCABQiiIQoD+A4MgAUI4iISEhCIIfCAAKQMQIgFCOIYgAUKA/gODQiiGhCABQoCA/AeDQhiGIAFCgICA+A+DQgiGhIQgAUIIiEKAgID4D4MgAUIYiEKAgPwHg4QgAUIoiEKA/gODIAFCOIiEhIQiCUI/iSAJQjiJhSAJQgeIhSACfCAAKQNQIgFCOIYgAUKA/gODQiiGhCABQoCA/AeDQhiGIAFCgICA+A+DQgiGhIQgAUIIiEKAgID4D4MgAUIYiEKAgPwHg4QgAUIoiEKA/gODIAFCOIiEhIQiCnwgB0ItiSAHQgOJhSAHQgaIhXwiC3wgACkDOCIBQjiGIAFCgP4Dg0IohoQgAUKAgPwHg0IYhiABQoCAgPgPg0IIhoSEIAFCCIhCgICA+A+DIAFCGIhCgID8B4OEIAFCKIhCgP4DgyABQjiIhISEIgxCP4kgDEI4iYUgDEIHiIUgACkDMCIBQjiGIAFCgP4Dg0IohoQgAUKAgPwHg0IYhiABQoCAgPgPg0IIhoSEIAFCCIhCgICA+A+DIAFCGIhCgID8B4OEIAFCKIhCgP4DgyABQjiIhISEIg18IAd8IAApAygiAUI4hiABQoD+A4NCKIaEIAFCgID8B4NCGIYgAUKAgID4D4NCCIaEhCABQgiIQoCAgPgPgyABQhiIQoCA/AeDhCABQiiIQoD+A4MgAUI4iISEhCIOQj+JIA5COImFIA5CB4iFIAApAyAiAUI4hiABQoD+A4NCKIaEIAFCgID8B4NCGIYgAUKAgID4D4NCCIaEhCABQgiIQoCAgPgPgyABQhiIQoCA/AeDhCABQiiIQoD+A4MgAUI4iISEhCIPfCAAKQNoIgFCOIYgAUKA/gODQiiGhCABQoCA/AeDQhiGIAFCgICA+A+DQgiGhIQgAUIIiEKAgID4D4MgAUIYiEKAgPwHg4QgAUIoiEKA/gODIAFCOIiEhIQiEHwgACkDGCIBQjiGIAFCgP4Dg0IohoQgAUKAgPwHg0IYhiABQoCAgPgPg0IIhoSEIAFCCIhCgICA+A+DIAFCGIhCgID8B4OEIAFCKIhCgP4DgyABQjiIhISEIhFCP4kgEUI4iYUgEUIHiIUgCXwgACkDWCIBQjiGIAFCgP4Dg0IohoQgAUKAgPwHg0IYhiABQoCAgPgPg0IIhoSEIAFCCIhCgICA+A+DIAFCGIhCgID8B4OEIAFCKIhCgP4DgyABQjiIhISEIhJ8IAZCLYkgBkIDiYUgBkIGiIV8IhNCLYkgE0IDiYUgE0IGiIV8IhRCLYkgFEIDiYUgFEIGiIV8IhVCLYkgFUIDiYUgFUIGiIV8IhZ8IAVCP4kgBUI4iYUgBUIHiIUgEHwgFXwgACkDYCIBQjiGIAFCgP4Dg0IohoQgAUKAgPwHg0IYhiABQoCAgPgPg0IIhoSEIAFCCIhCgICA+A+DIAFCGIhCgID8B4OEIAFCKIhCgP4DgyABQjiIhISEIhdCP4kgF0I4iYUgF0IHiIUgEnwgFHwgCkI/iSAKQjiJhSAKQgeIhSAEfCATfCAIQj+JIAhCOImFIAhCB4iFIAx8IAZ8IA1CP4kgDUI4iYUgDUIHiIUgDnwgBXwgD0I/iSAPQjiJhSAPQgeIhSARfCAXfCALQi2JIAtCA4mFIAtCBoiFfCIYQi2JIBhCA4mFIBhCBoiFfCIZQi2JIBlCA4mFIBlCBoiFfCIaQi2JIBpCA4mFIBpCBoiFfCIbQi2JIBtCA4mFIBtCBoiFfCIcQi2JIBxCA4mFIBxCBoiFfCIdQi2JIB1CA4mFIB1CBoiFfCIeQj+JIB5COImFIB5CB4iFIAdCP4kgB0I4iYUgB0IHiIUgBXwgGnwgEEI/iSAQQjiJhSAQQgeIhSAXfCAZfCASQj+JIBJCOImFIBJCB4iFIAp8IBh8IBZCLYkgFkIDiYUgFkIGiIV8Ih9CLYkgH0IDiYUgH0IGiIV8IiBCLYkgIEIDiYUgIEIGiIV8IiF8IBZCP4kgFkI4iYUgFkIHiIUgGnwgC0I/iSALQjiJhSALQgeIhSAGfCAbfCAhQi2JICFCA4mFICFCBoiFfCIifCAVQj+JIBVCOImFIBVCB4iFIBl8ICF8IBRCP4kgFEI4iYUgFEIHiIUgGHwgIHwgE0I/iSATQjiJhSATQgeIhSALfCAffCAeQi2JIB5CA4mFIB5CBoiFfCIjQi2JICNCA4mFICNCBoiFfCIkQi2JICRCA4mFICRCBoiFfCIlQi2JICVCA4mFICVCBoiFfCImfCAdQj+JIB1COImFIB1CB4iFICB8ICV8IBxCP4kgHEI4iYUgHEIHiIUgH3wgJHwgG0I/iSAbQjiJhSAbQgeIhSAWfCAjfCAaQj+JIBpCOImFIBpCB4iFIBV8IB58IBlCP4kgGUI4iYUgGUIHiIUgFHwgHXwgGEI/iSAYQjiJhSAYQgeIhSATfCAcfCAiQi2JICJCA4mFICJCBoiFfCInQi2JICdCA4mFICdCBoiFfCIoQi2JIChCA4mFIChCBoiFfCIpQi2JIClCA4mFIClCBoiFfCIqQi2JICpCA4mFICpCBoiFfCIrQi2JICtCA4mFICtCBoiFfCIsQi2JICxCA4mFICxCBoiFfCItQj+JIC1COImFIC1CB4iFICFCP4kgIUI4iYUgIUIHiIUgHXwgKXwgIEI/iSAgQjiJhSAgQgeIhSAcfCAofCAfQj+JIB9COImFIB9CB4iFIBt8ICd8ICZCLYkgJkIDiYUgJkIGiIV8Ii5CLYkgLkIDiYUgLkIGiIV8Ii9CLYkgL0IDiYUgL0IGiIV8IjB8ICZCP4kgJkI4iYUgJkIHiIUgKXwgIkI/iSAiQjiJhSAiQgeIhSAefCAqfCAwQi2JIDBCA4mFIDBCBoiFfCIxfCAlQj+JICVCOImFICVCB4iFICh8IDB8ICRCP4kgJEI4iYUgJEIHiIUgJ3wgL3wgI0I/iSAjQjiJhSAjQgeIhSAifCAufCAtQi2JIC1CA4mFIC1CBoiFfCIyQi2JIDJCA4mFIDJCBoiFfCIzQi2JIDNCA4mFIDNCBoiFfCI0Qi2JIDRCA4mFIDRCBoiFfCI1fCAsQj+JICxCOImFICxCB4iFIC98IDR8ICtCP4kgK0I4iYUgK0IHiIUgLnwgM3wgKkI/iSAqQjiJhSAqQgeIhSAmfCAyfCApQj+JIClCOImFIClCB4iFICV8IC18IChCP4kgKEI4iYUgKEIHiIUgJHwgLHwgJ0I/iSAnQjiJhSAnQgeIhSAjfCArfCAxQi2JIDFCA4mFIDFCBoiFfCI2Qi2JIDZCA4mFIDZCBoiFfCI3Qi2JIDdCA4mFIDdCBoiFfCI4Qi2JIDhCA4mFIDhCBoiFfCI5Qi2JIDlCA4mFIDlCBoiFfCI6Qi2JIDpCA4mFIDpCBoiFfCI7Qi2JIDtCA4mFIDtCBoiFfCI8Qj+JIDxCOImFIDxCB4iFIDBCP4kgMEI4iYUgMEIHiIUgLHwgOHwgL0I/iSAvQjiJhSAvQgeIhSArfCA3fCAuQj+JIC5COImFIC5CB4iFICp8IDZ8IDVCLYkgNUIDiYUgNUIGiIV8Ij1CLYkgPUIDiYUgPUIGiIV8Ij5CLYkgPkIDiYUgPkIGiIV8Ij98IDVCP4kgNUI4iYUgNUIHiIUgOHwgMUI/iSAxQjiJhSAxQgeIhSAtfCA5fCA/Qi2JID9CA4mFID9CBoiFfCJAfCA0Qj+JIDRCOImFIDRCB4iFIDd8ID98IDNCP4kgM0I4iYUgM0IHiIUgNnwgPnwgMkI/iSAyQjiJhSAyQgeIhSAxfCA9fCA8Qi2JIDxCA4mFIDxCBoiFfCJBQi2JIEFCA4mFIEFCBoiFfCJCQi2JIEJCA4mFIEJCBoiFfCJDQi2JIENCA4mFIENCBoiFfCJEfCA7Qj+JIDtCOImFIDtCB4iFID58IEN8IDpCP4kgOkI4iYUgOkIHiIUgPXwgQnwgOUI/iSA5QjiJhSA5QgeIhSA1fCBBfCA4Qj+JIDhCOImFIDhCB4iFIDR8IDx8IDdCP4kgN0I4iYUgN0IHiIUgM3wgO3wgNkI/iSA2QjiJhSA2QgeIhSAyfCA6fCBAQi2JIEBCA4mFIEBCBoiFfCJFQi2JIEVCA4mFIEVCBoiFfCJGQi2JIEZCA4mFIEZCBoiFfCJHQi2JIEdCA4mFIEdCBoiFfCJIQi2JIEhCA4mFIEhCBoiFfCJJQi2JIElCA4mFIElCBoiFfCJKQi2JIEpCA4mFIEpCBoiFfCJLIEkgRSA/ID0gMiAsICogIiAgIBYgBiAXIAhBACkDqIoBIkxCMokgTEIuiYUgTEIXiYVBACkDwIoBIk18QQApA7iKASJOQQApA7CKASJPhSBMgyBOhXwgA3xCotyiuY3zi8XCAHwiA0EAKQOgigEiUHwiASAPfCBMIBF8IE8gCXwgTiACfCABIE8gTIWDIE+FfCABQjKJIAFCLomFIAFCF4mFfELNy72fkpLRm/EAfCJRQQApA5iKASJSfCIJIAEgTIWDIEyFfCAJQjKJIAlCLomFIAlCF4mFfEKv9rTi/vm+4LV/fCJTQQApA5CKASJUfCIPIAkgAYWDIAGFfCAPQjKJIA9CLomFIA9CF4mFfEK8t6eM2PT22ml8IlVBACkDiIoBIgF8IhEgDyAJhYMgCYV8IBFCMokgEUIuiYUgEUIXiYV8Qrjqopq/y7CrOXwiViBSIFQgAYWDIFQgAYOFIAFCJIkgAUIeiYUgAUIZiYV8IAN8IgJ8IgN8IAwgEXwgDSAPfCAOIAl8IAMgESAPhYMgD4V8IANCMokgA0IuiYUgA0IXiYV8Qpmgl7CbvsT42QB8Ig0gAiABhSBUgyACIAGDhSACQiSJIAJCHomFIAJCGYmFfCBRfCIJfCIIIAMgEYWDIBGFfCAIQjKJIAhCLomFIAhCF4mFfEKbn+X4ytTgn5J/fCIOIAkgAoUgAYMgCSACg4UgCUIkiSAJQh6JhSAJQhmJhXwgU3wiD3wiESAIIAOFgyADhXwgEUIyiSARQi6JhSARQheJhXxCmIK2093al46rf3wiUSAPIAmFIAKDIA8gCYOFIA9CJIkgD0IeiYUgD0IZiYV8IFV8IgJ8IgMgESAIhYMgCIV8IANCMokgA0IuiYUgA0IXiYV8QsKEjJiK0+qDWHwiUyACIA+FIAmDIAIgD4OFIAJCJIkgAkIeiYUgAkIZiYV8IFZ8Igl8Igx8IBIgA3wgCiARfCAEIAh8IAwgAyARhYMgEYV8IAxCMokgDEIuiYUgDEIXiYV8Qr7fwauU4NbBEnwiBCAJIAKFIA+DIAkgAoOFIAlCJIkgCUIeiYUgCUIZiYV8IA18Ig98IhEgDCADhYMgA4V8IBFCMokgEUIuiYUgEUIXiYV8Qozlkvfkt+GYJHwiCiAPIAmFIAKDIA8gCYOFIA9CJIkgD0IeiYUgD0IZiYV8IA58IgJ8IgMgESAMhYMgDIV8IANCMokgA0IuiYUgA0IXiYV8QuLp/q+9uJ+G1QB8IhIgAiAPhSAJgyACIA+DhSACQiSJIAJCHomFIAJCGYmFfCBRfCIJfCIIIAMgEYWDIBGFfCAIQjKJIAhCLomFIAhCF4mFfELvku6Tz66X3/IAfCIXIAkgAoUgD4MgCSACg4UgCUIkiSAJQh6JhSAJQhmJhXwgU3wiD3wiDHwgByAIfCAFIAN8IBAgEXwgDCAIIAOFgyADhXwgDEIyiSAMQi6JhSAMQheJhXxCsa3a2OO/rO+Af3wiAyAPIAmFIAKDIA8gCYOFIA9CJIkgD0IeiYUgD0IZiYV8IAR8IgV8IgIgDCAIhYMgCIV8IAJCMokgAkIuiYUgAkIXiYV8QrWknK7y1IHum398IgggBSAPhSAJgyAFIA+DhSAFQiSJIAVCHomFIAVCGYmFfCAKfCIGfCIJIAIgDIWDIAyFfCAJQjKJIAlCLomFIAlCF4mFfEKUzaT7zK78zUF8IgwgBiAFhSAPgyAGIAWDhSAGQiSJIAZCHomFIAZCGYmFfCASfCIHfCIPIAkgAoWDIAKFfCAPQjKJIA9CLomFIA9CF4mFfELSlcX3mbjazWR8IgQgByAGhSAFgyAHIAaDhSAHQiSJIAdCHomFIAdCGYmFfCAXfCIFfCIRIBR8IBggD3wgEyAJfCALIAJ8IBEgDyAJhYMgCYV8IBFCMokgEUIuiYUgEUIXiYV8QuPLvMLj8JHfb3wiAiAFIAeFIAaDIAUgB4OFIAVCJIkgBUIeiYUgBUIZiYV8IAN8IgZ8IgsgESAPhYMgD4V8IAtCMokgC0IuiYUgC0IXiYV8QrWrs9zouOfgD3wiCSAGIAWFIAeDIAYgBYOFIAZCJIkgBkIeiYUgBkIZiYV8IAh8Igd8IhMgCyARhYMgEYV8IBNCMokgE0IuiYUgE0IXiYV8QuW4sr3HuaiGJHwiDyAHIAaFIAWDIAcgBoOFIAdCJIkgB0IeiYUgB0IZiYV8IAx8IgV8IhQgEyALhYMgC4V8IBRCMokgFEIuiYUgFEIXiYV8QvWErMn1jcv0LXwiESAFIAeFIAaDIAUgB4OFIAVCJIkgBUIeiYUgBUIZiYV8IAR8IgZ8Ihh8IBogFHwgFSATfCAZIAt8IBggFCAThYMgE4V8IBhCMokgGEIuiYUgGEIXiYV8QoPJm/WmlaG6ygB8IhYgBiAFhSAHgyAGIAWDhSAGQiSJIAZCHomFIAZCGYmFfCACfCIHfCILIBggFIWDIBSFfCALQjKJIAtCLomFIAtCF4mFfELU94fqy7uq2NwAfCIZIAcgBoUgBYMgByAGg4UgB0IkiSAHQh6JhSAHQhmJhXwgCXwiBXwiEyALIBiFgyAYhXwgE0IyiSATQi6JhSATQheJhXxCtafFmKib4vz2AHwiGCAFIAeFIAaDIAUgB4OFIAVCJIkgBUIeiYUgBUIZiYV8IA98IgZ8IhQgEyALhYMgC4V8IBRCMokgFEIuiYUgFEIXiYV8Qqu/m/OuqpSfmH98IhogBiAFhSAHgyAGIAWDhSAGQiSJIAZCHomFIAZCGYmFfCARfCIHfCIVfCAcIBR8IB8gE3wgGyALfCAVIBQgE4WDIBOFfCAVQjKJIBVCLomFIBVCF4mFfEKQ5NDt0s3xmKh/fCIbIAcgBoUgBYMgByAGg4UgB0IkiSAHQh6JhSAHQhmJhXwgFnwiBXwiCyAVIBSFgyAUhXwgC0IyiSALQi6JhSALQheJhXxCv8Lsx4n5yYGwf3wiFiAFIAeFIAaDIAUgB4OFIAVCJIkgBUIeiYUgBUIZiYV8IBl8IgZ8IhMgCyAVhYMgFYV8IBNCMokgE0IuiYUgE0IXiYV8QuSdvPf7+N+sv398IhkgBiAFhSAHgyAGIAWDhSAGQiSJIAZCHomFIAZCGYmFfCAYfCIHfCIUIBMgC4WDIAuFfCAUQjKJIBRCLomFIBRCF4mFfELCn6Lts/6C8EZ8IhggByAGhSAFgyAHIAaDhSAHQiSJIAdCHomFIAdCGYmFfCAafCIFfCIVfCAeIBR8ICEgE3wgHSALfCAVIBQgE4WDIBOFfCAVQjKJIBVCLomFIBVCF4mFfEKlzqqY+ajk01V8IhogBSAHhSAGgyAFIAeDhSAFQiSJIAVCHomFIAVCGYmFfCAbfCIGfCILIBUgFIWDIBSFfCALQjKJIAtCLomFIAtCF4mFfELvhI6AnuqY5QZ8IhsgBiAFhSAHgyAGIAWDhSAGQiSJIAZCHomFIAZCGYmFfCAWfCIHfCITIAsgFYWDIBWFfCATQjKJIBNCLomFIBNCF4mFfELw3LnQ8KzKlBR8IhYgByAGhSAFgyAHIAaDhSAHQiSJIAdCHomFIAdCGYmFfCAZfCIFfCIUIBMgC4WDIAuFfCAUQjKJIBRCLomFIBRCF4mFfEL838i21NDC2yd8IhkgBSAHhSAGgyAFIAeDhSAFQiSJIAVCHomFIAVCGYmFfCAYfCIGfCIVICh8ICQgFHwgJyATfCAjIAt8IBUgFCAThYMgE4V8IBVCMokgFUIuiYUgFUIXiYV8QqaSm+GFp8iNLnwiGCAGIAWFIAeDIAYgBYOFIAZCJIkgBkIeiYUgBkIZiYV8IBp8Igd8IgsgFSAUhYMgFIV8IAtCMokgC0IuiYUgC0IXiYV8Qu3VkNbFv5uWzQB8IhogByAGhSAFgyAHIAaDhSAHQiSJIAdCHomFIAdCGYmFfCAbfCIFfCITIAsgFYWDIBWFfCATQjKJIBNCLomFIBNCF4mFfELf59bsuaKDnNMAfCIbIAUgB4UgBoMgBSAHg4UgBUIkiSAFQh6JhSAFQhmJhXwgFnwiBnwiFCATIAuFgyALhXwgFEIyiSAUQi6JhSAUQheJhXxC3se93cjqnIXlAHwiFiAGIAWFIAeDIAYgBYOFIAZCJIkgBkIeiYUgBkIZiYV8IBl8Igd8IhV8ICYgFHwgKSATfCAlIAt8IBUgFCAThYMgE4V8IBVCMokgFUIuiYUgFUIXiYV8Qqjl3uOz14K19gB8IhkgByAGhSAFgyAHIAaDhSAHQiSJIAdCHomFIAdCGYmFfCAYfCIFfCILIBUgFIWDIBSFfCALQjKJIAtCLomFIAtCF4mFfELm3ba/5KWy4YF/fCIYIAUgB4UgBoMgBSAHg4UgBUIkiSAFQh6JhSAFQhmJhXwgGnwiBnwiEyALIBWFgyAVhXwgE0IyiSATQi6JhSATQheJhXxCu+qIpNGQi7mSf3wiGiAGIAWFIAeDIAYgBYOFIAZCJIkgBkIeiYUgBkIZiYV8IBt8Igd8IhQgEyALhYMgC4V8IBRCMokgFEIuiYUgFEIXiYV8QuSGxOeUlPrfon98IhsgByAGhSAFgyAHIAaDhSAHQiSJIAdCHomFIAdCGYmFfCAWfCIFfCIVfCAvIBR8ICsgE3wgLiALfCAVIBQgE4WDIBOFfCAVQjKJIBVCLomFIBVCF4mFfEKB4Ijiu8mZjah/fCIWIAUgB4UgBoMgBSAHg4UgBUIkiSAFQh6JhSAFQhmJhXwgGXwiBnwiCyAVIBSFgyAUhXwgC0IyiSALQi6JhSALQheJhXxCka/ih43u4qVCfCIZIAYgBYUgB4MgBiAFg4UgBkIkiSAGQh6JhSAGQhmJhXwgGHwiB3wiEyALIBWFgyAVhXwgE0IyiSATQi6JhSATQheJhXxCsPzSsrC0lLZHfCIYIAcgBoUgBYMgByAGg4UgB0IkiSAHQh6JhSAHQhmJhXwgGnwiBXwiFCATIAuFgyALhXwgFEIyiSAUQi6JhSAUQheJhXxCmKS9t52DuslRfCIaIAUgB4UgBoMgBSAHg4UgBUIkiSAFQh6JhSAFQhmJhXwgG3wiBnwiFXwgMSAUfCAtIBN8IDAgC3wgFSAUIBOFgyAThXwgFUIyiSAVQi6JhSAVQheJhXxCkNKWq8XEwcxWfCIbIAYgBYUgB4MgBiAFg4UgBkIkiSAGQh6JhSAGQhmJhXwgFnwiB3wiCyAVIBSFgyAUhXwgC0IyiSALQi6JhSALQheJhXxCqsDEu9WwjYd0fCIWIAcgBoUgBYMgByAGg4UgB0IkiSAHQh6JhSAHQhmJhXwgGXwiBXwiEyALIBWFgyAVhXwgE0IyiSATQi6JhSATQheJhXxCuKPvlYOOqLUQfCIZIAUgB4UgBoMgBSAHg4UgBUIkiSAFQh6JhSAFQhmJhXwgGHwiBnwiFCATIAuFgyALhXwgFEIyiSAUQi6JhSAUQheJhXxCyKHLxuuisNIZfCIYIAYgBYUgB4MgBiAFg4UgBkIkiSAGQh6JhSAGQhmJhXwgGnwiB3wiFSA0fCA3IBR8IDMgE3wgNiALfCAVIBQgE4WDIBOFfCAVQjKJIBVCLomFIBVCF4mFfELT1oaKhYHbmx58IhogByAGhSAFgyAHIAaDhSAHQiSJIAdCHomFIAdCGYmFfCAbfCIFfCILIBUgFIWDIBSFfCALQjKJIAtCLomFIAtCF4mFfEKZ17v8zemdpCd8IhsgBSAHhSAGgyAFIAeDhSAFQiSJIAVCHomFIAVCGYmFfCAWfCIGfCITIAsgFYWDIBWFfCATQjKJIBNCLomFIBNCF4mFfEKoke2M3pav2DR8IhYgBiAFhSAHgyAGIAWDhSAGQiSJIAZCHomFIAZCGYmFfCAZfCIHfCIUIBMgC4WDIAuFfCAUQjKJIBRCLomFIBRCF4mFfELjtKWuvJaDjjl8IhkgByAGhSAFgyAHIAaDhSAHQiSJIAdCHomFIAdCGYmFfCAYfCIFfCIVfCA5IBR8IDUgE3wgOCALfCAVIBQgE4WDIBOFfCAVQjKJIBVCLomFIBVCF4mFfELLlYaarsmq7M4AfCIYIAUgB4UgBoMgBSAHg4UgBUIkiSAFQh6JhSAFQhmJhXwgGnwiBnwiCyAVIBSFgyAUhXwgC0IyiSALQi6JhSALQheJhXxC88aPu/fJss7bAHwiGiAGIAWFIAeDIAYgBYOFIAZCJIkgBkIeiYUgBkIZiYV8IBt8Igd8IhMgCyAVhYMgFYV8IBNCMokgE0IuiYUgE0IXiYV8QqPxyrW9/puX6AB8IhsgByAGhSAFgyAHIAaDhSAHQiSJIAdCHomFIAdCGYmFfCAWfCIFfCIUIBMgC4WDIAuFfCAUQjKJIBRCLomFIBRCF4mFfEL85b7v5d3gx/QAfCIWIAUgB4UgBoMgBSAHg4UgBUIkiSAFQh6JhSAFQhmJhXwgGXwiBnwiFXwgOyAUfCA+IBN8IDogC3wgFSAUIBOFgyAThXwgFUIyiSAVQi6JhSAVQheJhXxC4N7cmPTt2NL4AHwiGSAGIAWFIAeDIAYgBYOFIAZCJIkgBkIeiYUgBkIZiYV8IBh8Igd8IgsgFSAUhYMgFIV8IAtCMokgC0IuiYUgC0IXiYV8QvLWwo/Kgp7khH98IhggByAGhSAFgyAHIAaDhSAHQiSJIAdCHomFIAdCGYmFfCAafCIFfCITIAsgFYWDIBWFfCATQjKJIBNCLomFIBNCF4mFfELs85DTgcHA44x/fCIaIAUgB4UgBoMgBSAHg4UgBUIkiSAFQh6JhSAFQhmJhXwgG3wiBnwiFCATIAuFgyALhXwgFEIyiSAUQi6JhSAUQheJhXxCqLyMm6L/v9+Qf3wiGyAGIAWFIAeDIAYgBYOFIAZCJIkgBkIeiYUgBkIZiYV8IBZ8Igd8IhV8IEEgFHwgQCATfCA8IAt8IBUgFCAThYMgE4V8IBVCMokgFUIuiYUgFUIXiYV8Qun7ivS9nZuopH98IhYgByAGhSAFgyAHIAaDhSAHQiSJIAdCHomFIAdCGYmFfCAZfCIFfCILIBUgFIWDIBSFfCALQjKJIAtCLomFIAtCF4mFfEKV8pmW+/7o/L5/fCIZIAUgB4UgBoMgBSAHg4UgBUIkiSAFQh6JhSAFQhmJhXwgGHwiBnwiEyALIBWFgyAVhXwgE0IyiSATQi6JhSATQheJhXxCq6bJm66e3rhGfCIYIAYgBYUgB4MgBiAFg4UgBkIkiSAGQh6JhSAGQhmJhXwgGnwiB3wiFCATIAuFgyALhXwgFEIyiSAUQi6JhSAUQheJhXxCnMOZ0e7Zz5NKfCIaIAcgBoUgBYMgByAGg4UgB0IkiSAHQh6JhSAHQhmJhXwgG3wiBXwiFSBHfCBDIBR8IEYgE3wgQiALfCAVIBQgE4WDIBOFfCAVQjKJIBVCLomFIBVCF4mFfEKHhIOO8piuw1F8IhsgBSAHhSAGgyAFIAeDhSAFQiSJIAVCHomFIAVCGYmFfCAWfCIGfCILIBUgFIWDIBSFfCALQjKJIAtCLomFIAtCF4mFfEKe1oPv7Lqf7Wp8IhYgBiAFhSAHgyAGIAWDhSAGQiSJIAZCHomFIAZCGYmFfCAZfCIHfCITIAsgFYWDIBWFfCATQjKJIBNCLomFIBNCF4mFfEL4orvz/u/TvnV8IhkgByAGhSAFgyAHIAaDhSAHQiSJIAdCHomFIAdCGYmFfCAYfCIFfCIUIBMgC4WDIAuFfCAUQjKJIBRCLomFIBRCF4mFfEK6392Qp/WZ+AZ8IhwgBSAHhSAGgyAFIAeDhSAFQiSJIAVCHomFIAVCGYmFfCAafCIGfCIVfCA9Qj+JID1COImFID1CB4iFIDl8IEV8IERCLYkgREIDiYUgREIGiIV8IhggFHwgSCATfCBEIAt8IBUgFCAThYMgE4V8IBVCMokgFUIuiYUgFUIXiYV8QqaxopbauN+xCnwiGiAGIAWFIAeDIAYgBYOFIAZCJIkgBkIeiYUgBkIZiYV8IBt8Igd8IgsgFSAUhYMgFIV8IAtCMokgC0IuiYUgC0IXiYV8Qq6b5PfLgOafEXwiGyAHIAaFIAWDIAcgBoOFIAdCJIkgB0IeiYUgB0IZiYV8IBZ8IgV8IhMgCyAVhYMgFYV8IBNCMokgE0IuiYUgE0IXiYV8QpuO8ZjR5sK4G3wiHSAFIAeFIAaDIAUgB4OFIAVCJIkgBUIeiYUgBUIZiYV8IBl8IgZ8IhQgEyALhYMgC4V8IBRCMokgFEIuiYUgFEIXiYV8QoT7kZjS/t3tKHwiHiAGIAWFIAeDIAYgBYOFIAZCJIkgBkIeiYUgBkIZiYV8IBx8Igd8IhV8ID9CP4kgP0I4iYUgP0IHiIUgO3wgR3wgPkI/iSA+QjiJhSA+QgeIhSA6fCBGfCAYQi2JIBhCA4mFIBhCBoiFfCIWQi2JIBZCA4mFIBZCBoiFfCIZIBR8IEogE3wgFiALfCAVIBQgE4WDIBOFfCAVQjKJIBVCLomFIBVCF4mFfEKTyZyGtO+q5TJ8IgsgByAGhSAFgyAHIAaDhSAHQiSJIAdCHomFIAdCGYmFfCAafCIFfCITIBUgFIWDIBSFfCATQjKJIBNCLomFIBNCF4mFfEK8/aauocGvzzx8IhogBSAHhSAGgyAFIAeDhSAFQiSJIAVCHomFIAVCGYmFfCAbfCIGfCIUIBMgFYWDIBWFfCAUQjKJIBRCLomFIBRCF4mFfELMmsDgyfjZjsMAfCIbIAYgBYUgB4MgBiAFg4UgBkIkiSAGQh6JhSAGQhmJhXwgHXwiB3wiFSAUIBOFgyAThXwgFUIyiSAVQi6JhSAVQheJhXxCtoX52eyX9eLMAHwiHCAHIAaFIAWDIAcgBoOFIAdCJIkgB0IeiYUgB0IZiYV8IB58IgV8IhYgTXw3A8CKAUEAIFAgBSAHhSAGgyAFIAeDhSAFQiSJIAVCHomFIAVCGYmFfCALfCIGIAWFIAeDIAYgBYOFIAZCJIkgBkIeiYUgBkIZiYV8IBp8IgcgBoUgBYMgByAGg4UgB0IkiSAHQh6JhSAHQhmJhXwgG3wiBSAHhSAGgyAFIAeDhSAFQiSJIAVCHomFIAVCGYmFfCAcfCILfDcDoIoBQQAgTiBAQj+JIEBCOImFIEBCB4iFIDx8IEh8IBlCLYkgGUIDiYUgGUIGiIV8IhkgE3wgFiAVIBSFgyAUhXwgFkIyiSAWQi6JhSAWQheJhXxCqvyV48+zyr/ZAHwiGiAGfCITfDcDuIoBQQAgUiALIAWFIAeDIAsgBYOFIAtCJIkgC0IeiYUgC0IZiYV8IBp8IgZ8NwOYigFBACBPIEFCP4kgQUI4iYUgQUIHiIUgQHwgGHwgS0ItiSBLQgOJhSBLQgaIhXwgFHwgEyAWIBWFgyAVhXwgE0IyiSATQi6JhSATQheJhXxC7PXb1rP12+XfAHwiGCAHfCIUfDcDsIoBQQAgVCAGIAuFIAWDIAYgC4OFIAZCJIkgBkIeiYUgBkIZiYV8IBh8Igd8NwOQigFBACBMIEVCP4kgRUI4iYUgRUIHiIUgQXwgSXwgGUItiSAZQgOJhSAZQgaIhXwgFXwgFCATIBaFgyAWhXwgFEIyiSAUQi6JhSAUQheJhXxCl7Cd0sSxhqLsAHwiEyAFfHw3A6iKAUEAIAEgByAGhSALgyAHIAaDhSAHQiSJIAdCHomFIAdCGYmFfCATfHw3A4iKAQvzCQIBfgR/QQApA4CKASIAp0EDdkEPcSIBQQN0QYCJAWoiAiACKQMAQn8gAEIDhiIAhkJ/hYNCgAEgAIaFNwMAIAFBAWohAwJAIAFBDkkNAAJAIANBD0cNAEEAQgA3A/iJAQtBgIkBEANBACEDCyADIQQCQEEHIANrQQdxIgJFDQAgAyACaiEEIANBA3RBgIkBaiEBA0AgAUIANwMAIAFBCGohASACQX9qIgINAAsLAkAgA0F4akEHSQ0AIARBA3QhAQNAIAFBuIkBakIANwMAIAFBsIkBakIANwMAIAFBqIkBakIANwMAIAFBoIkBakIANwMAIAFBmIkBakIANwMAIAFBkIkBakIANwMAIAFBiIkBakIANwMAIAFBgIkBakIANwMAIAFBwABqIgFB+ABHDQALC0EAIQFBAEEAKQOAigEiAEI7hiAAQiuGQoCAgICAgMD/AIOEIABCG4ZCgICAgIDgP4MgAEILhkKAgICA8B+DhIQgAEIFiEKAgID4D4MgAEIViEKAgPwHg4QgAEIliEKA/gODIABCA4ZCOIiEhIQ3A/iJAUGAiQEQA0EAQQApA8CKASIAQjiGIABCgP4Dg0IohoQgAEKAgPwHg0IYhiAAQoCAgPgPg0IIhoSEIABCCIhCgICA+A+DIABCGIhCgID8B4OEIABCKIhCgP4DgyAAQjiIhISENwPAigFBAEEAKQO4igEiAEI4hiAAQoD+A4NCKIaEIABCgID8B4NCGIYgAEKAgID4D4NCCIaEhCAAQgiIQoCAgPgPgyAAQhiIQoCA/AeDhCAAQiiIQoD+A4MgAEI4iISEhDcDuIoBQQBBACkDsIoBIgBCOIYgAEKA/gODQiiGhCAAQoCA/AeDQhiGIABCgICA+A+DQgiGhIQgAEIIiEKAgID4D4MgAEIYiEKAgPwHg4QgAEIoiEKA/gODIABCOIiEhIQ3A7CKAUEAQQApA6iKASIAQjiGIABCgP4Dg0IohoQgAEKAgPwHg0IYhiAAQoCAgPgPg0IIhoSEIABCCIhCgICA+A+DIABCGIhCgID8B4OEIABCKIhCgP4DgyAAQjiIhISENwOoigFBAEEAKQOgigEiAEI4hiAAQoD+A4NCKIaEIABCgID8B4NCGIYgAEKAgID4D4NCCIaEhCAAQgiIQoCAgPgPgyAAQhiIQoCA/AeDhCAAQiiIQoD+A4MgAEI4iISEhDcDoIoBQQBBACkDmIoBIgBCOIYgAEKA/gODQiiGhCAAQoCA/AeDQhiGIABCgICA+A+DQgiGhIQgAEIIiEKAgID4D4MgAEIYiEKAgPwHg4QgAEIoiEKA/gODIABCOIiEhIQ3A5iKAUEAQQApA5CKASIAQjiGIABCgP4Dg0IohoQgAEKAgPwHg0IYhiAAQoCAgPgPg0IIhoSEIABCCIhCgICA+A+DIABCGIhCgID8B4OEIABCKIhCgP4DgyAAQjiIhISENwOQigFBAEEAKQOIigEiAEI4hiAAQoD+A4NCKIaEIABCgID8B4NCGIYgAEKAgID4D4NCCIaEhCAAQgiIQoCAgPgPgyAAQhiIQoCA/AeDhCAAQiiIQoD+A4MgAEI4iISEhDcDiIoBAkBBACgCyIoBIgNFDQBBACECA0AgAUGACWogAUGIigFqLQAAOgAAIAFBAWohASADIAJBAWoiAkH/AXFLDQALCwsGAEGAiQELoQIAQQBCADcDgIoBQQBBMEHAACABQYADRiIBGzYCyIoBQQBCpJ/p99uD0trHAEL5wvibkaOz8NsAIAEbNwPAigFBAEKnn+an1sGLhltC6/qG2r+19sEfIAEbNwO4igFBAEKRquDC9tCS2o5/Qp/Y+dnCkdqCm38gARs3A7CKAUEAQrGWgP7/zMmZ5wBC0YWa7/rPlIfRACABGzcDqIoBQQBCubK5uI+b+5cVQvHt9Pilp/2npX8gARs3A6CKAUEAQpe6w4Ojq8CskX9Cq/DT9K/uvLc8IAEbNwOYigFBAEKHqvOzo6WKzeIAQrvOqqbY0Ouzu38gARs3A5CKAUEAQti9lojcq+fdS0KIkvOd/8z5hOoAIAEbNwOIigEgABACEAQLCwsBAEGACAsE0AAAAA==",_6="f2e40eb1",Ip={name:M6,data:H6,hash:_6};let G6=new a,hp=null;function V6(c){if(hp===null)return w(G6,Ip,48).then(g=>(hp=g,hp.calculate(c,384)));try{let g=hp.calculate(c,384);return Promise.resolve(g)}catch(g){return Promise.reject(g)}}function W6(){return Q(Ip,48).then(c=>{c.init(384);let g={init:()=>(c.init(384),g),update:y=>(c.update(y),g),digest:y=>c.digest(y),save:()=>c.save(),load:y=>(c.load(y),g),blockSize:128,digestSize:48};return g})}let K6=new a,yp=null;function L6(c){if(yp===null)return w(K6,Ip,64).then(g=>(yp=g,yp.calculate(c,512)));try{let g=yp.calculate(c,512);return Promise.resolve(g)}catch(g){return Promise.reject(g)}}function Y6(){return Q(Ip,64).then(c=>{c.init(512);let g={init:()=>(c.init(512),g),update:y=>(c.update(y),g),digest:y=>c.digest(y),save:()=>c.save(),load:y=>(c.load(y),g),blockSize:128,digestSize:64};return g})}var z6="xxhash32",Z6="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",X6="4bb12485",HU={name:z6,data:Z6,hash:X6};let $6=new a,Bp=null;function mp(c){return!Number.isInteger(c)||c<0||c>4294967295?new Error("Seed must be a valid 32-bit long unsigned integer."):null}function j6(c,g=0){if(mp(g))return Promise.reject(mp(g));if(Bp===null)return w($6,HU,4).then(y=>(Bp=y,Bp.calculate(c,g)));try{let y=Bp.calculate(c,g);return Promise.resolve(y)}catch(y){return Promise.reject(y)}}function eW(c=0){return mp(c)?Promise.reject(mp(c)):Q(HU,4).then(g=>{g.init(c);let y={init:()=>(g.init(c),y),update:k=>(g.update(k),y),digest:k=>g.digest(k),save:()=>g.save(),load:k=>(g.load(k),y),blockSize:16,digestSize:4};return y})}var nW="xxhash64",tW="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",rW="177fbfa3",_U={name:nW,data:tW,hash:rW};let iW=new a,Fu=null,Cp=new Uint8Array(8);function nc(c){return!Number.isInteger(c)||c<0||c>4294967295?new Error("Seed must be given as two valid 32-bit long unsigned integers (lo + high)."):null}function hB(c,g,y){let k=new DataView(c);k.setUint32(0,g,!0),k.setUint32(4,y,!0)}function oW(c,g=0,y=0){if(nc(g))return Promise.reject(nc(g));if(nc(y))return Promise.reject(nc(y));if(Fu===null)return w(iW,_U,8).then(k=>(Fu=k,hB(Cp.buffer,g,y),Fu.writeMemory(Cp),Fu.calculate(c)));try{hB(Cp.buffer,g,y),Fu.writeMemory(Cp);let k=Fu.calculate(c);return Promise.resolve(k)}catch(k){return Promise.reject(k)}}function aW(c=0,g=0){return nc(c)?Promise.reject(nc(c)):nc(g)?Promise.reject(nc(g)):Q(_U,8).then(y=>{let k=new Uint8Array(8);hB(k.buffer,c,g),y.writeMemory(k),y.init();let U={init:()=>(y.writeMemory(k),y.init(),U),update:G=>(y.update(G),U),digest:G=>y.digest(G),save:()=>y.save(),load:G=>(y.load(G),U),blockSize:32,digestSize:8};return U})}var sW="xxhash3",dW="AGFzbQEAAAABNAhgAAF/YAR/f39/AGAHf39/f39/fwBgBH9+fn4BfmAEf39/fgF+YAN/f34BfmAAAGABfwADDg0AAQIDBAUFBQYHBgAGBQQBAQICBg4CfwFBwI4FC38AQcAJCwdwCAZtZW1vcnkCAA5IYXNoX0dldEJ1ZmZlcgAACUhhc2hfSW5pdAAIC0hhc2hfVXBkYXRlAAkKSGFzaF9GaW5hbAAKDUhhc2hfR2V0U3RhdGUACw5IYXNoX0NhbGN1bGF0ZQAMClNUQVRFX1NJWkUDAQr6QQ0FAEGACgvkAwMPfgF/AX4CQCADRQ0AIAApAzAhBCAAKQM4IQUgACkDICEGIAApAyghByAAKQMQIQggACkDGCEJIAApAwAhCiAAKQMIIQsDQCAFIAFBMGopAwAiDHwgAkE4aikDACABQThqKQMAIg2FIgVCIIggBUL/////D4N+fCEFIAcgAUEgaikDACIOfCACQShqKQMAIAFBKGopAwAiD4UiB0IgiCAHQv////8Pg358IQcgCSABQRBqKQMAIhB8IAJBGGopAwAgAUEYaikDACIRhSIJQiCIIAlC/////w+DfnwhCSALIAEpAwAiEnwgAkEIaiITKQMAIAFBCGopAwAiFIUiC0IgiCALQv////8Pg358IQsgAkEwaikDACAMhSIMQiCIIAxC/////w+DfiAEfCANfCEEIAJBIGopAwAgDoUiDEIgiCAMQv////8Pg34gBnwgD3whBiACQRBqKQMAIBCFIgxCIIggDEL/////D4N+IAh8IBF8IQggAikDACAShSIMQiCIIAxC/////w+DfiAKfCAUfCEKIAFBwABqIQEgEyECIANBf2oiAw0ACyAAIAk3AxggACAKNwMAIAAgCzcDCCAAIAc3AyggACAINwMQIAAgBTcDOCAAIAY3AyAgACAENwMwCwveAgIBfwF+AkAgBCACIAEoAgAiB2siAkkNACAAIAMgBSAHQQN0aiACEAEgACAFIAZqIgcpAwAgACkDACIIQi+IhSAIhUKx893xCX43AwAgACAHKQMIIAApAwgiCEIviIUgCIVCsfPd8Ql+NwMIIAAgBykDECAAKQMQIghCL4iFIAiFQrHz3fEJfjcDECAAIAcpAxggACkDGCIIQi+IhSAIhUKx893xCX43AxggACAHKQMgIAApAyAiCEIviIUgCIVCsfPd8Ql+NwMgIAAgBykDKCAAKQMoIghCL4iFIAiFQrHz3fEJfjcDKCAAIAcpAzAgACkDMCIIQi+IhSAIhUKx893xCX43AzAgACAHKQM4IAApAzgiCEIviIUgCIVCsfPd8Ql+NwM4IAAgAyACQQZ0aiAFIAQgAmsiBxABIAEgBzYCAA8LIAAgAyAFIAdBA3RqIAQQASABIAcgBGo2AgALhQEBAX8gAiABhSADpyIEQRh0IARBgP4DcUEIdHIgBEEIdkGA/gNxIARBGHZycq1CIIYgA4V9QQA1AoCMAUIghiAAQfyLAWo1AgCEhSIDQjGJIANCGImFIAOFQqW+4/TRjIfZn39+IgNCI4ggAK18IAOFQqW+4/TRjIfZn39+IgNCHIggA4ULZwAgAiABc60gA3wiA0IhiEEALQCAjAFBEHQgAEEIdHIgAEEBdkGAjAFqLQAAQRh0ciAAQf+LAWotAAByrYUgA4VCz9bTvtLHq9lCfiIDQh2IIAOFQvnz3fGZ9pmrFn4iA0IgiCADhQuJAwEEfgJAIABBCUkNAEEAKQOAjAEgASkDICABKQMYhSACfIUiA0I4hiADQoD+A4NCKIaEIANCgID8B4NCGIYgA0KAgID4D4NCCIaEhCADQgiIQoCAgPgPgyADQhiIQoCA/AeDhCADQiiIQoD+A4MgA0I4iISEhCAArXwgAEH4iwFqKQMAIAEpAzAgASkDKIUgAn2FIgJ8IAJC/////w+DIgQgA0IgiCIFfiIGQv////8PgyACQiCIIgIgA0L/////D4MiA358IAQgA34iA0IgiHwiBEIghiADQv////8Pg4QgBkIgiCACIAV+fCAEQiCIfIV8IgNCJYggA4VC+fPd8ZnymasWfiIDQiCIIAOFDwsCQCAAQQRJDQAgACABQQhqKQMAIAFBEGopAwAgAhADDwsCQCAARQ0AIAAgASgCACABQQRqKAIAIAIQBA8LIAEpAzggASkDQIUgAoUiA0IhiCADhULP1tO+0ser2UJ+IgNCHYggA4VC+fPd8Zn2masWfiIDQiCIIAOFC94IAQZ+IACtQoeVr6+Ytt6bnn9+IQMCQCAAQSFJDQACQCAAQcEASQ0AAkAgAEHhAEkNACABKQNoIAJ9QQApA7iMAYUiBEL/////D4MiBSABKQNgIAJ8QQApA7CMAYUiBkIgiCIHfiIIQv////8PgyAEQiCIIgQgBkL/////D4MiBn58IAUgBn4iBUIgiHwiBkIghiAFQv////8Pg4QgCEIgiCAEIAd+fCAGQiCIfIUgA3wgASkDeCACfSAAQciLAWopAwCFIgNC/////w+DIgQgASkDcCACfCAAQcCLAWopAwCFIgVCIIgiBn4iB0L/////D4MgA0IgiCIDIAVC/////w+DIgV+fCAEIAV+IgRCIIh8IgVCIIYgBEL/////D4OEIAdCIIggAyAGfnwgBUIgiHyFfCEDCyABKQNIIAJ9QQApA6iMAYUiBEL/////D4MiBSABKQNAIAJ8QQApA6CMAYUiBkIgiCIHfiIIQv////8PgyAEQiCIIgQgBkL/////D4MiBn58IAUgBn4iBUIgiHwiBkIghiAFQv////8Pg4QgCEIgiCAEIAd+fCAGQiCIfIUgA3wgASkDWCACfSAAQdiLAWopAwCFIgNC/////w+DIgQgASkDUCACfCAAQdCLAWopAwCFIgVCIIgiBn4iB0L/////D4MgA0IgiCIDIAVC/////w+DIgV+fCAEIAV+IgRCIIh8IgVCIIYgBEL/////D4OEIAdCIIggAyAGfnwgBUIgiHyFfCEDCyABKQMoIAJ9QQApA5iMAYUiBEL/////D4MiBSABKQMgIAJ8QQApA5CMAYUiBkIgiCIHfiIIQv////8PgyAEQiCIIgQgBkL/////D4MiBn58IAUgBn4iBUIgiHwiBkIghiAFQv////8Pg4QgCEIgiCAEIAd+fCAGQiCIfIUgA3wgASkDOCACfSAAQeiLAWopAwCFIgNC/////w+DIgQgASkDMCACfCAAQeCLAWopAwCFIgVCIIgiBn4iB0L/////D4MgA0IgiCIDIAVC/////w+DIgV+fCAEIAV+IgRCIIh8IgVCIIYgBEL/////D4OEIAdCIIggAyAGfnwgBUIgiHyFfCEDCyABKQMIIAJ9QQApA4iMAYUiBEL/////D4MiBSABKQMAIAJ8QQApA4CMAYUiBkIgiCIHfiIIQv////8PgyAEQiCIIgQgBkL/////D4MiBn58IAUgBn4iBUIgiHwiBkIghiAFQv////8Pg4QgCEIgiCAEIAd+fCAGQiCIfIUgA3wgASkDGCACfSAAQfiLAWopAwCFIgNC/////w+DIgQgASkDECACfCAAQfCLAWopAwCFIgJCIIgiBX4iBkL/////D4MgA0IgiCIDIAJC/////w+DIgJ+fCAEIAJ+IgJCIIh8IgRCIIYgAkL/////D4OEIAZCIIggAyAFfnwgBEIgiHyFfCICQiWIIAKFQvnz3fGZ8pmrFn4iAkIgiCAChQv8CgQBfwV+An8BfkEAIQMgASkDeCACfUEAKQP4jAGFIgRC/////w+DIgUgASkDcCACfEEAKQPwjAGFIgZCIIgiB34iCEL/////D4MgBEIgiCIEIAZC/////w+DIgZ+fCAFIAZ+IgVCIIh8IgZCIIYgBUL/////D4OEIAhCIIggBCAHfnwgBkIgiHyFIAEpA2ggAn1BACkD6IwBhSIEQv////8PgyIFIAEpA2AgAnxBACkD4IwBhSIGQiCIIgd+IghC/////w+DIARCIIgiBCAGQv////8PgyIGfnwgBSAGfiIFQiCIfCIGQiCGIAVC/////w+DhCAIQiCIIAQgB358IAZCIIh8hSABKQNYIAJ9QQApA9iMAYUiBEL/////D4MiBSABKQNQIAJ8QQApA9CMAYUiBkIgiCIHfiIIQv////8PgyAEQiCIIgQgBkL/////D4MiBn58IAUgBn4iBUIgiHwiBkIghiAFQv////8Pg4QgCEIgiCAEIAd+fCAGQiCIfIUgASkDSCACfUEAKQPIjAGFIgRC/////w+DIgUgASkDQCACfEEAKQPAjAGFIgZCIIgiB34iCEL/////D4MgBEIgiCIEIAZC/////w+DIgZ+fCAFIAZ+IgVCIIh8IgZCIIYgBUL/////D4OEIAhCIIggBCAHfnwgBkIgiHyFIAEpAzggAn1BACkDuIwBhSIEQv////8PgyIFIAEpAzAgAnxBACkDsIwBhSIGQiCIIgd+IghC/////w+DIARCIIgiBCAGQv////8PgyIGfnwgBSAGfiIFQiCIfCIGQiCGIAVC/////w+DhCAIQiCIIAQgB358IAZCIIh8hSABKQMoIAJ9QQApA6iMAYUiBEL/////D4MiBSABKQMgIAJ8QQApA6CMAYUiBkIgiCIHfiIIQv////8PgyAEQiCIIgQgBkL/////D4MiBn58IAUgBn4iBUIgiHwiBkIghiAFQv////8Pg4QgCEIgiCAEIAd+fCAGQiCIfIUgASkDGCACfUEAKQOYjAGFIgRC/////w+DIgUgASkDECACfEEAKQOQjAGFIgZCIIgiB34iCEL/////D4MgBEIgiCIEIAZC/////w+DIgZ+fCAFIAZ+IgVCIIh8IgZCIIYgBUL/////D4OEIAhCIIggBCAHfnwgBkIgiHyFIAEpAwggAn1BACkDiIwBhSIEQv////8PgyIFIAEpAwAgAnxBACkDgIwBhSIGQiCIIgd+IghC/////w+DIARCIIgiBCAGQv////8PgyIGfnwgBSAGfiIFQiCIfCIGQiCGIAVC/////w+DhCAIQiCIIAQgB358IAZCIIh8hSAArUKHla+vmLbem55/fnx8fHx8fHx8IgRCJYggBIVC+fPd8ZnymasWfiIEQiCIIASFIQQCQCAAQZABSA0AIABBBHZBeGohCQNAIAEgA2oiCkELaikDACACfSADQYiNAWopAwCFIgVC/////w+DIgYgCkEDaikDACACfCADQYCNAWopAwCFIgdCIIgiCH4iC0L/////D4MgBUIgiCIFIAdC/////w+DIgd+fCAGIAd+IgZCIIh8IgdCIIYgBkL/////D4OEIAtCIIggBSAIfnwgB0IgiHyFIAR8IQQgA0EQaiEDIAlBf2oiCQ0ACwsgASkDfyACfSAAQfiLAWopAwCFIgVC/////w+DIgYgASkDdyACfCAAQfCLAWopAwCFIgJCIIgiB34iCEL/////D4MgBUIgiCIFIAJC/////w+DIgJ+fCAGIAJ+IgJCIIh8IgZCIIYgAkL/////D4OEIAhCIIggBSAHfnwgBkIgiHyFIAR8IgJCJYggAoVC+fPd8ZnymasWfiICQiCIIAKFC98FAgF+AX8CQAJAQQApA4AKIgBQRQ0AQYAIIQFCACEADAELAkBBACkDoI4BIABSDQBBACEBDAELQQAhAUEAQq+v79e895Kg/gAgAH03A/iLAUEAIABCxZbr+djShYIofDcD8IsBQQBCj/Hjja2P9JhOIAB9NwPoiwFBACAAQqus+MXV79HQfHw3A+CLAUEAQtOt1LKShbW0nn8gAH03A9iLAUEAIABCl5r0jvWWvO3JAHw3A9CLAUEAQsWDgv2v/8SxayAAfTcDyIsBQQAgAELqi7OdyOb09UN8NwPAiwFBAELIv/rLnJveueQAIAB9NwO4iwFBACAAQoqjgd/Ume2sMXw3A7CLAUEAQvm57738+MKnHSAA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QQApA4CKATcDACACQQApA4iKATcDCCACQQApA5CKATcDECACQQApA5iKATcDGCACQQApA6CKATcDICACQQApA6iKATcDKCACQQApA7CKASIFNwMwIAJBACkDuIoBIgY3AzgCQAJAQQAoAoCOASIHQcAASQ0AIAJBACgCiI4BNgJAIAIgAkHAAGpBACgCmI4BQYCMASAHQX9qQQZ2IANBACgCnI4BIgAQAiADIABqIgBBeWopAwAhCCAAKQMJIQkgACkDGSEKIAApAykhCyAHQcCLAWopAwAhBSAAKQMBIQwgB0HIiwFqKQMAIQYgB0HQiwFqKQMAIQ0gACkDESEOIAdB2IsBaikDACEPIAdB4IsBaikDACEQIAApAyEhESAHQeiLAWopAwAhEiACKQMAIRMgAikDECEUIAIpAyAhFSACKQMwIRYgAikDCCEXIAIpAxghGCACKQMoIRkgAiACKQM4IAdB8IsBaikDACIafCAAKQMxIAdB+IsBaikDACIbhSIcQiCIIBxC/////w+Dfnw3AzggGSAQfCARIBKFIhFCIIggEUL/////D4N+fCERIBggDXwgDiAPhSIOQiCIIA5C/////w+DfnwhDiAXIAV8IAwgBoUiDEIgiCAMQv////8Pg358IQwgGyAWIAsgGoUiC0IgiCALQv////8Pg358fCELIBIgFSAKIBCFIhBCIIggEEL/////D4N+fHwhECAPIBQgCSANhSINQiCIIA1C/////w+Dfnx8IRIgBiATIAggBYUiBUIgiCAFQv////8Pg358fCEIDAELIAdBwI0BaiEdQcAAIAdrIR4gAkHAAGohAAJAAkACQCAHQThNDQAgHiEfDAELAkACQEE4IAdrQQN2QQFqQQdxIh8NACACQcAAaiEAIB4hHwwBCyACQcAAaiEAIB9BA3QiICEfA0AgACAdKQMANwMAIABBCGohACAdQQhqIR0gH0F4aiIfDQALQcAAIAcgIGprIR8LAkAgBw0AA0AgACAdKQMANwMAIABBCGogHUEIaikDADcDACAAQRBqIB1BEGopAwA3AwAgAEEYaiAdQRhqKQMANwMAIABBIGogHUEgaikDADcDACAAQShqIB1BKGopAwA3AwAgAEEwaiAdQTBqKQMANwMAIABBOGogHUE4aikDADcDACAAQcAAaiEAIB1BwABqIR0gH0FAaiIfQQdLDQALCyAfRQ0BCyAfQX9qISECQCAfQQdxIiBFDQAgH0F4cSEfA0AgACAdLQAAOgAAIABBAWohACAdQQFqIR0gIEF/aiIgDQALCyAhQQdJDQADQCAAIB0pAAA3AAAgAEEIaiEAIB1BCGohHSAfQXhqIh8NAAsLIAJBwABqIB5qIR1BgIwBIQACQAJAAkAgB0EISQ0AAkAgB0E4akEDdkEBakEHcSIfDQAMAgsgH0EDdCEgQYCMASEAA0AgHSAAKQMANwMAIB1BCGohHSAAQQhqIQAgH0F/aiIfDQALIAcgIGshBwsgB0UNAQJAAkAgB0EHcSIgDQAgByEfDAELIAdBeHEhHwNAIB0gAC0AADoAACAdQQFqIR0gAEEBaiEAICBBf2oiIA0ACwsgB0EISQ0BCwNAIB0gACkAADcAACAdQQhqIR0gAEEIaiEAIB9BeGoiHw0ACwsgA0EAKAKcjgFqIgBBeWopAwAhCiAAKQMJIRMgACkDGSEUIAApAykhCyAAKQMBIQwgACkDESEOIAApAyEhESACKQMAIRUgAikDECEWIAIpAyAhFyACKQMIIRggAikDQCENIAIpA0ghDyACKQMYIRkgAikDUCESIAIpA1ghCCACKQMoIRogAikDYCEQIAIpA2ghCSACIAYgAikDcCIbfCAAKQMxIAIpA3giBoUiHEIgiCAcQv////8Pg358NwM4IBogEHwgESAJhSIRQiCIIBFC/////w+DfnwhESAZIBJ8IA4gCIUiDkIgiCAOQv////8Pg358IQ4gGCANfCAMIA+FIgxCIIggDEL/////D4N+fCEMIAYgCyAbhSILQiCIIAtC/////w+DfiAFfHwhCyAJIBcgFCAQhSIFQiCIIAVC/////w+Dfnx8IRAgCCAWIBMgEoUiBUIgiCAFQv////8Pg358fCESIA8gFSAKIA2FIgVCIIggBUL/////D4N+fHwhCAsgAykDQyACKQM4hSIFQv////8PgyIGIAMpAzsgC4UiC0IgiCINfiIPQv////8PgyAFQiCIIgUgC0L/////D4MiC358IAYgC34iBkIgiHwiC0IghiAGQv////8Pg4QgD0IgiCAFIA1+fCALQiCIfIUgAykDMyARhSIFQv////8PgyIGIAMpAysgEIUiC0IgiCINfiIPQv////8PgyAFQiCIIgUgC0L/////D4MiC358IAYgC34iBkIgiHwiC0IghiAGQv////8Pg4QgD0IgiCAFIA1+fCALQiCIfIUgAykDIyAOhSIFQv////8PgyIGIAMpAxsgEoUiC0IgiCINfiIPQv////8PgyAFQiCIIgUgC0L/////D4MiC358IAYgC34iBkIgiHwiC0IghiAGQv////8Pg4QgD0IgiCAFIA1+fCALQiCIfIUgAykDEyAMhSIFQv////8PgyIGIAMpAwsgCIUiC0IgiCINfiIPQv////8PgyAFQiCIIgUgC0L/////D4MiC358IAYgC34iBkIgiHwiC0IghiAGQv////8Pg4QgD0IgiCAFIA1+fCALQiCIfIUgBEKHla+vmLbem55/fnx8fHwiBEIliCAEhUL5893xmfKZqxZ+IgRCIIggBIUhBAwBCyAEpyEAAkBBACkDoI4BIgRQDQACQCAAQRBLDQAgAEGACCAEEAUhBAwCCwJAIABBgAFLDQAgAEGACCAEEAYhBAwCCyAAQYAIIAQQByEEDAELAkAgAEEQSw0AIAAgA0IAEAUhBAwBCwJAIABBgAFLDQAgACADQgAQBiEEDAELIAAgA0IAEAchBAtBACAEQjiGIARCgP4Dg0IohoQgBEKAgPwHg0IYhiAEQoCAgPgPg0IIhoSEIARCCIhCgICA+A+DIARCGIhCgID8B4OEIARCKIhCgP4DgyAEQjiIhISENwOACiABJAALBgBBgIoBCwIACwvMAQEAQYAIC8QBuP5sOSOkS758AYEs9yGtHN7UbemDkJfbckCkpLezZx/LeeZOzMDleIJa0H3M/3IhuAhGdPdDJI7gNZDmgTomTDwoUruRwwDLiNBlixtTLqNxZEiXog35TjgZ70ap3qzYqPp2P+OcND/53LvHxwtPHYpR4EvNtFkxyJ9+ydl4c2TqxayDNNPrw8WBoP/6E2PrFw3dUbfw2knTFlUmKdRonisWvlh9R6H8j/i40XrQMc5FyzqPlRYEKK/X+8q7S0B+QAIAAA==",cW="5a2fbdbb",GU={name:sW,data:dW,hash:cW};let uW=new a,Mu=null,Sp=new Uint8Array(8);function tc(c){return!Number.isInteger(c)||c<0||c>4294967295?new Error("Seed must be given as two valid 32-bit long unsigned integers (lo + high)."):null}function yB(c,g,y){let k=new DataView(c);k.setUint32(0,g,!0),k.setUint32(4,y,!0)}function AW(c,g=0,y=0){if(tc(g))return Promise.reject(tc(g));if(tc(y))return Promise.reject(tc(y));if(Mu===null)return w(uW,GU,8).then(k=>(Mu=k,yB(Sp.buffer,g,y),Mu.writeMemory(Sp),Mu.calculate(c)));try{yB(Sp.buffer,g,y),Mu.writeMemory(Sp);let k=Mu.calculate(c);return Promise.resolve(k)}catch(k){return Promise.reject(k)}}function fW(c=0,g=0){return tc(c)?Promise.reject(tc(c)):tc(g)?Promise.reject(tc(g)):Q(GU,8).then(y=>{let k=new Uint8Array(8);yB(k.buffer,c,g),y.writeMemory(k),y.init();let U={init:()=>(y.writeMemory(k),y.init(),U),update:G=>(y.update(G),U),digest:G=>y.digest(G),save:()=>y.save(),load:G=>(y.load(G),U),blockSize:512,digestSize:8};return U})}var lW="xxhash128",gW="AGFzbQEAAAABKwdgAAF/YAR/f39/AGAHf39/f39/fwBgA39/fgF+YAR/f39+AGAAAGABfwADDQwAAQIDBAQEBQYFAAUFBAEBAgIGDgJ/AUHAjgULfwBBwAkLB3AIBm1lbW9yeQIADkhhc2hfR2V0QnVmZmVyAAAJSGFzaF9Jbml0AAcLSGFzaF9VcGRhdGUACApIYXNoX0ZpbmFsAAkNSGFzaF9HZXRTdGF0ZQAKDkhhc2hfQ2FsY3VsYXRlAAsKU1RBVEVfU0laRQMBCqBNDAUAQYAKC+QDAw9+AX8BfgJAIANFDQAgACkDMCEEIAApAzghBSAAKQMgIQYgACkDKCEHIAApAxAhCCAAKQMYIQkgACkDACEKIAApAwghCwNAIAUgAUEwaikDACIMfCACQThqKQMAIAFBOGopAwAiDYUiBUIgiCAFQv////8Pg358IQUgByABQSBqKQMAIg58IAJBKGopAwAgAUEoaikDACIPhSIHQiCIIAdC/////w+DfnwhByAJIAFBEGopAwAiEHwgAkEYaikDACABQRhqKQMAIhGFIglCIIggCUL/////D4N+fCEJIAsgASkDACISfCACQQhqIhMpAwAgAUEIaikDACIUhSILQiCIIAtC/////w+DfnwhCyACQTBqKQMAIAyFIgxCIIggDEL/////D4N+IAR8IA18IQQgAkEgaikDACAOhSIMQiCIIAxC/////w+DfiAGfCAPfCEGIAJBEGopAwAgEIUiDEIgiCAMQv////8Pg34gCHwgEXwhCCACKQMAIBKFIgxCIIggDEL/////D4N+IAp8IBR8IQogAUHAAGohASATIQIgA0F/aiIDDQALIAAgCTcDGCAAIAo3AwAgACALNwMIIAAgBzcDKCAAIAg3AxAgACAFNwM4IAAgBjcDICAAIAQ3AzALC94CAgF/AX4CQCAEIAIgASgCACIHayICSQ0AIAAgAyAFIAdBA3RqIAIQASAAIAUgBmoiBykDACAAKQMAIghCL4iFIAiFQrHz3fEJfjcDACAAIAcpAwggACkDCCIIQi+IhSAIhUKx893xCX43AwggACAHKQMQIAApAxAiCEIviIUgCIVCsfPd8Ql+NwMQIAAgBykDGCAAKQMYIghCL4iFIAiFQrHz3fEJfjcDGCAAIAcpAyAgACkDICIIQi+IhSAIhUKx893xCX43AyAgACAHKQMoIAApAygiCEIviIUgCIVCsfPd8Ql+NwMoIAAgBykDMCAAKQMwIghCL4iFIAiFQrHz3fEJfjcDMCAAIAcpAzggACkDOCIIQi+IhSAIhUKx893xCX43AzggACADIAJBBnRqIAUgBCACayIHEAEgASAHNgIADwsgACADIAUgB0EDdGogBBABIAEgByAEajYCAAvtAwEFfiABKQM4IAApAziFIgNC/////w+DIgQgASkDMCAAKQMwhSIFQiCIIgZ+IgdC/////w+DIANCIIgiAyAFQv////8PgyIFfnwgBCAFfiIEQiCIfCIFQiCGIARC/////w+DhCAHQiCIIAMgBn58IAVCIIh8hSABKQMoIAApAyiFIgNC/////w+DIgQgASkDICAAKQMghSIFQiCIIgZ+IgdC/////w+DIANCIIgiAyAFQv////8PgyIFfnwgBCAFfiIEQiCIfCIFQiCGIARC/////w+DhCAHQiCIIAMgBn58IAVCIIh8hSABKQMYIAApAxiFIgNC/////w+DIgQgASkDECAAKQMQhSIFQiCIIgZ+IgdC/////w+DIANCIIgiAyAFQv////8PgyIFfnwgBCAFfiIEQiCIfCIFQiCGIARC/////w+DhCAHQiCIIAMgBn58IAVCIIh8hSABKQMIIAApAwiFIgNC/////w+DIgQgASkDACAAKQMAhSIFQiCIIgZ+IgdC/////w+DIANCIIgiAyAFQv////8PgyIFfnwgBCAFfiIEQiCIfCIFQiCGIARC/////w+DhCAHQiCIIAMgBn58IAVCIIh8hSACfHx8fCICQiWIIAKFQvnz3fGZ8pmrFn4iAkIgiCAChQu6CAIFfgN/AkAgAUEJSQ0AIAAgAUH4iwFqKQMAIgQgAikDOCACKQMwhSADfIUiBUL/////D4NC95Svrwh+IAVCgICAgHCDfEEAKQOAjAEgAikDKCACKQMghSADfYUgBIUiA0IgiCIEQrHz3fEJfnwgBEKHla+vCH4iBEIgiHwgBEL/////D4MgA0L/////D4MiA0Kx893xCX58IANCh5Wvrwh+IgRCIIh8IgVCIIh8IgNCOIYgA0KA/gODQiiGhCADQoCA/AeDQhiGIANCgICA+A+DQgiGhIQgA0IIiEKAgID4D4MgA0IYiEKAgPwHg4QgA0IoiEKA/gODIANCOIiEhIQgBEL/////D4MgAUF/aq1CNoaEIAVCIIZ8hSIEQiCIIgVCz9bTvgJ+IgZC/////w+DIARC/////w+DIgRCvdzKlQx+fCAEQs/W074CfiIEQiCIfCIHQiCGIghCJYggCCAEQv////8Pg4SFQvnz3fGZ8pmrFn4iBEIgiCAEhTcDACAAIAVCvdzKlQx+IANCz9bTvtLHq9lCfnwgBkIgiHwgB0IgiHwiA0IliCADhUL5893xmfKZqxZ+IgNCIIggA4U3AwgPCwJAIAFBBEkNACAAIAIpAxggAikDEIUgA6ciAkEYdCACQYD+A3FBCHRyIAJBCHZBgP4DcSACQRh2cnKtQiCGIAOFfCABQfyLAWo1AgBCIIZBADUCgIwBhIUiA0IgiCIEIAFBAnRBh5Wvr3hqrSIFfiIGQiCIIARCsfPd8Ql+fCAGQv////8PgyADQv////8PgyIDQrHz3fEJfnwgAyAFfiIDQiCIfCIEQiCIfCAEQiCGIANC/////w+DhCIEQgGGfCIDQiWIIAOFQvnz3fGZ8pmrFn4iBUIgiCAFhTcDCCAAIANCA4ggBIUiA0IjiCADhUKlvuP00YyH2Z9/fiIDQhyIIAOFNwMADwsCQCABRQ0AIAAgAigCBCACKAIAc60gA3wiBEIhiEEALQCAjAFBEHQgAUEIdHIiCSABQQF2QYCMAWotAABBGHRyIgogAUH/iwFqLQAAIgFyIguthSAEhULP1tO+0ser2UJ+IgRCHYggBIVC+fPd8Zn2masWfiIEQiCIIASFNwMAIAAgAigCDCACKAIIc60gA30iA0IhiCABQRh0IAtBgP4DcUEIdHIgCUEIdkGA/gNxIApBGHZyckENd62FIAOFQs/W077Sx6vZQn4iA0IdiCADhUL5893xmfaZqxZ+IgNCIIggA4U3AwgPCyAAIAIpA1AgAikDWIUgA4UiBEIhiCAEhULP1tO+0ser2UJ+IgRCHYggBIVC+fPd8Zn2masWfiIEQiCIIASFNwMIIAAgAikDQCACKQNIhSADhSIDQiGIIAOFQs/W077Sx6vZQn4iA0IdiCADhUL5893xmfaZqxZ+IgNCIIggA4U3AwALwwoBCn4gAa0iBEKHla+vmLbem55/fiEFAkACQCABQSFPDQBCACEGDAELQgAhBwJAIAFBwQBJDQBCACEHAkAgAUHhAEkNACACQfgAaikDACADfSABQciLAWopAwAiCIUiB0L/////D4MiCSACKQNwIAN8IAFBwIsBaikDACIKhSILQiCIIgx+Ig1CIIggB0IgiCIHIAx+fCANQv////8PgyAHIAtC/////w+DIgt+fCAJIAt+IgdCIIh8IglCIIh8QQApA7iMASILQQApA7CMASIMfIUgCUIghiAHQv////8Pg4SFIQcgAkHoAGopAwAgA30gC4UiCUL/////D4MiCyACKQNgIAN8IAyFIgxCIIgiDX4iBkL/////D4MgCUIgiCIJIAxC/////w+DIgx+fCALIAx+IgtCIIh8IgxCIIYgC0L/////D4OEIAZCIIggCSANfnwgDEIgiHyFIAV8IAggCnyFIQULIAJB2ABqKQMAIAN9IAFB2IsBaikDACIIhSIJQv////8PgyIKIAIpA1AgA3wgAUHQiwFqKQMAIguFIgxCIIgiDX4iBkL/////D4MgCUIgiCIJIAxC/////w+DIgx+fCAKIAx+IgpCIIh8IgxCIIYgCkL/////D4OEIAZCIIggCSANfnwgDEIgiHyFIAd8QQApA6iMASIJQQApA6CMASIKfIUhByACQcgAaikDACADfSAJhSIJQv////8PgyIMIAIpA0AgA3wgCoUiCkIgiCINfiIGQv////8PgyAJQiCIIgkgCkL/////D4MiCn58IAwgCn4iCkIgiHwiDEIghiAKQv////8Pg4QgBkIgiCAJIA1+fCAMQiCIfIUgBXwgCCALfIUhBQsgAkE4aikDACADfSABQeiLAWopAwAiCIUiCUL/////D4MiCiACKQMwIAN8IAFB4IsBaikDACILhSIMQiCIIg1+IgZC/////w+DIAlCIIgiCSAMQv////8PgyIMfnwgCiAMfiIKQiCIfCIMQiCGIApC/////w+DhCAGQiCIIAkgDX58IAxCIIh8hSAHfEEAKQOYjAEiB0EAKQOQjAEiCXyFIQYgAkEoaikDACADfSAHhSIHQv////8PgyIKIAIpAyAgA3wgCYUiCUIgiCIMfiINQv////8PgyAHQiCIIgcgCUL/////D4MiCX58IAogCX4iCUIgiHwiCkIghiAJQv////8Pg4QgDUIgiCAHIAx+fCAKQiCIfIUgBXwgCCALfIUhBQsgACACQRhqKQMAIAN9IAFB+IsBaikDACIHhSIIQv////8PgyIJIAIpAxAgA3wgAUHwiwFqKQMAIgqFIgtCIIgiDH4iDUL/////D4MgCEIgiCIIIAtC/////w+DIgt+fCAJIAt+IglCIIh8IgtCIIYgCUL/////D4OEIA1CIIggCCAMfnwgC0IgiHyFIAZ8QQApA4iMASIIQQApA4CMASIJfIUiCyACQQhqKQMAIAN9IAiFIghC/////w+DIgwgAikDACADfCAJhSIJQiCIIg1+IgZC/////w+DIAhCIIgiCCAJQv////8PgyIJfnwgDCAJfiIJQiCIfCIMQiCGIAlC/////w+DhCAGQiCIIAggDX58IAxCIIh8hSAFfCAHIAp8hSIFfCIHQiWIIAeFQvnz3fGZ8pmrFn4iB0IgiCAHhTcDACAAQgAgBUKHla+vmLbem55/fiAEIAN9Qs/W077Sx6vZQn58IAtC49zKlfzO8vWFf358IgNCJYggA4VC+fPd8ZnymasWfiIDQiCIIAOFfTcDCAuhDwMBfxR+An9BACEEIAJB+ABqKQMAIAN9QQApA/iMASIFhSIGQv////8PgyIHIAIpA3AgA3xBACkD8IwBIgiFIglCIIgiCn4iC0L/////D4MgBkIgiCIGIAlC/////w+DIgl+fCAHIAl+IgdCIIh8IglCIIYgB0L/////D4OEIAtCIIggBiAKfnwgCUIgiHyFIAJB2ABqKQMAIAN9QQApA9iMASIHhSIGQv////8PgyIJIAIpA1AgA3xBACkD0IwBIgqFIgtCIIgiDH4iDUL/////D4MgBkIgiCIGIAtC/////w+DIgt+fCAJIAt+IglCIIh8IgtCIIYgCUL/////D4OEIA1CIIggBiAMfnwgC0IgiHyFIAJBOGopAwAgA31BACkDuIwBIgmFIgZC/////w+DIgsgAikDMCADfEEAKQOwjAEiDIUiDUIgiCIOfiIPQv////8PgyAGQiCIIgYgDUL/////D4MiDX58IAsgDX4iC0IgiHwiDUIghiALQv////8Pg4QgD0IgiCAGIA5+fCANQiCIfIUgAkEYaikDACADfUEAKQOYjAEiC4UiBkL/////D4MiDSACKQMQIAN8QQApA5CMASIOhSIPQiCIIhB+IhFC/////w+DIAZCIIgiBiAPQv////8PgyIPfnwgDSAPfiINQiCIfCIPQiCGIA1C/////w+DhCARQiCIIAYgEH58IA9CIIh8hUEAKQOIjAEiDUEAKQOAjAEiD3yFfEEAKQOojAEiEEEAKQOgjAEiEXyFfEEAKQPIjAEiEkEAKQPAjAEiE3yFfEEAKQPojAEiFEEAKQPgjAEiFXyFIgZCJYggBoVC+fPd8ZnymasWfiIGQiCIIAaFIQYgAkHoAGopAwAgA30gFIUiFEL/////D4MiFiACKQNgIAN8IBWFIhVCIIgiF34iGEL/////D4MgFEIgiCIUIBVC/////w+DIhV+fCAWIBV+IhVCIIh8IhZCIIYgFUL/////D4OEIBhCIIggFCAXfnwgFkIgiHyFIAJByABqKQMAIAN9IBKFIhJC/////w+DIhQgAikDQCADfCAThSITQiCIIhV+IhZC/////w+DIBJCIIgiEiATQv////8PgyITfnwgFCATfiITQiCIfCIUQiCGIBNC/////w+DhCAWQiCIIBIgFX58IBRCIIh8hSACQShqKQMAIAN9IBCFIhBC/////w+DIhIgAikDICADfCARhSIRQiCIIhN+IhRC/////w+DIBBCIIgiECARQv////8PgyIRfnwgEiARfiIRQiCIfCISQiCGIBFC/////w+DhCAUQiCIIBAgE358IBJCIIh8hSACQQhqKQMAIAN9IA2FIg1C/////w+DIhAgAikDACADfCAPhSIPQiCIIhF+IhJC/////w+DIA1CIIgiDSAPQv////8PgyIPfnwgECAPfiIPQiCIfCIQQiCGIA9C/////w+DhCASQiCIIA0gEX58IBBCIIh8hSABrSIPQoeVr6+Ytt6bnn9+fCALIA58hXwgCSAMfIV8IAcgCnyFfCAFIAh8hSIFQiWIIAWFQvnz3fGZ8pmrFn4iBUIgiCAFhSEFAkAgAUGgAUgNACABQQV2QXxqIRkDQCACIARqIhpBG2opAwAgA30gBEGYjQFqKQMAIgeFIghC/////w+DIgkgGkETaikDACADfCAEQZCNAWopAwAiCoUiC0IgiCIMfiINQv////8PgyAIQiCIIgggC0L/////D4MiC358IAkgC34iCUIgiHwiC0IghiAJQv////8Pg4QgDUIgiCAIIAx+fCALQiCIfIUgBnwgBEGIjQFqKQMAIgggBEGAjQFqKQMAIgl8hSEGIBpBC2opAwAgA30gCIUiCEL/////D4MiCyAaQQNqKQMAIAN8IAmFIglCIIgiDH4iDUL/////D4MgCEIgiCIIIAlC/////w+DIgl+fCALIAl+IglCIIh8IgtCIIYgCUL/////D4OEIA1CIIggCCAMfnwgC0IgiHyFIAV8IAcgCnyFIQUgBEEgaiEEIBlBf2oiGQ0ACwsgACACQf8AaikDACADfCABQeiLAWopAwAiB4UiCEL/////D4MiCSACKQN3IAN9IAFB4IsBaikDACIKhSILQiCIIgx+Ig1C/////w+DIAhCIIgiCCALQv////8PgyILfnwgCSALfiIJQiCIfCILQiCGIAlC/////w+DhCANQiCIIAggDH58IAtCIIh8hSAGfCABQfiLAWopAwAiBiABQfCLAWopAwAiCHyFIgkgAkHvAGopAwAgA3wgBoUiBkL/////D4MiCyACKQNnIAN9IAiFIghCIIgiDH4iDUL/////D4MgBkIgiCIGIAhC/////w+DIgh+fCALIAh+IghCIIh8IgtCIIYgCEL/////D4OEIA1CIIggBiAMfnwgC0IgiHyFIAV8IAcgCnyFIgZ8IgVCJYggBYVC+fPd8ZnymasWfiIFQiCIIAWFNwMAIABCACAGQoeVr6+Ytt6bnn9+IA8gA31Cz9bTvtLHq9lCfnwgCULj3MqV/M7y9YV/fnwiA0IliCADhUL5893xmfKZqxZ+IgNCIIggA4V9NwMIC98FAgF+AX8CQAJAQQApA4AKIgBQRQ0AQYAIIQFCACEADAELAkBBACkDoI4BIABSDQBBACEBDAELQQAhAUEAQq+v79e895Kg/gAgAH03A/iLAUEAIABCxZbr+djShYIofDcD8IsBQQBCj/Hjja2P9JhOIAB9NwPoiwFBACAAQqus+MXV79HQfHw3A+CLAUEAQtOt1LKShbW0nn8gAH03A9iLAUEAIABCl5r0jvWWvO3JAHw3A9CLAUEAQsWDgv2v/8SxayAAfTcDyIsBQQAgAELqi7OdyOb09UN8NwPAiwFBAELIv/rLnJveueQAIAB9NwO4iwFBACAAQoqjgd/Ume2sMXw3A7CLAUEAQvm57738+MKnHSAAfTcDqIsBQQAgAEKo9dv7s5ynmj98NwOgiwFBAEK4sry3lNW31lggAH03A5iLAUEAIABC8cihuqm0w/zOAHw3A5CLAUEAQoihl9u445SXo38gAH03A4iL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AkHAAGogDGohC0GAjAEhAAJAAkACQCAHQQhJDQACQCAHQThqQQN2QQFqQQdxIg0NAAwCCyANQQN0IQ5BgIwBIQADQCALIAApAwA3AwAgC0EIaiELIABBCGohACANQX9qIg0NAAsgByAOayEHCyAHRQ0BAkACQCAHQQdxIg4NACAHIQ0MAQsgB0F4cSENA0AgCyAALQAAOgAAIAtBAWohCyAAQQFqIQAgDkF/aiIODQALCyAHQQhJDQELA0AgCyAAKQAANwAAIAtBCGohCyAAQQhqIQAgDUF4aiINDQALCyACIAIpAwggAikDQCIIfCADQQAoApyOAWoiACkDASACKQNIIgmFIgpCIIggCkL/////D4N+fDcDCCACIAIpAxggAikDUCIKfCAAKQMRIAIpA1giEIUiEUIgiCARQv////8Pg358NwMYIAIgECAKIAApAwmFIgpCIIggCkL/////D4N+IAIpAxB8fDcDECACIAkgCCAAQXlqKQMAhSIIQiCIIAhC/////w+DfiACKQMAfHw3AwAgACkDGSEIIAIpAyAhCSACIAIpAyggAikDYCIKfCAAKQMhIAIpA2giEIUiEUIgiCARQv////8Pg358NwMoIAIgECAJIAggCoUiCEIgiCAIQv////8Pg358fDcDICACIAYgAikDcCIIfCAAKQMxIAIpA3giBoUiCUIgiCAJQv////8Pg358NwM4IAIgBiAIIAApAymFIghCIIggCEL/////D4N+IAV8fDcDMAsgAiACIANBC2ogBEKHla+vmLbem55/fhADNwNAIAIgAiADQQAoApyOAWpBdWogBELP1tO+0ser2UJ+Qn+FEAM3A0gMAQsgBKchAAJAQQApA6COASIEUA0AAkAgAEEQSw0AIAJBwABqIABBgAggBBAEDAILAkAgAEGAAUsNACACQcAAaiAAQYAIIAQQBQwCCyACQcAAaiAAQYAIIAQQBgwBCwJAIABBEEsNACACQcAAaiAAIANCABAEDAELAkAgAEGAAUsNACACQcAAaiAAIANCABAFDAELIAJBwABqIAAgA0IAEAYLQQAgAikDcDcDuApBACACKQNgNwOoCkEAIAIpA1A3A5gKQQAgAkH4AGopAwA3A8AKQQAgAkHoAGopAwA3A7AKQQAgAkHYAGopAwA3A6AKQQAgAikDSCIEQjiGIARCgP4Dg0IohoQgBEKAgPwHg0IYhiAEQoCAgPgPg0IIhoSEIARCCIhCgICA+A+DIARCGIhCgID8B4OEIARCKIhCgP4DgyAEQjiIhISEIgQ3A4AKQQAgBDcDkApBACACKQNAIgRCOIYgBEKA/gODQiiGhCAEQoCA/AeDQhiGIARCgICA+A+DQgiGhIQgBEIIiEKAgID4D4MgBEIYiEKAgPwHg4QgBEIoiEKA/gODIARCOIiEhIQ3A4gKIAEkAAsGAEGAigELAgALC8wBAQBBgAgLxAG4/mw5I6RLvnwBgSz3Ia0c3tRt6YOQl9tyQKSkt7NnH8t55k7MwOV4glrQfcz/ciG4CEZ090MkjuA1kOaBOiZMPChSu5HDAMuI0GWLG1Muo3FkSJeiDflOOBnvRqnerNio+nY/45w0P/ncu8fHC08dilHgS820WTHIn37J2XhzZOrFrIM00+vDxYGg//oTY+sXDd1Rt/DaSdMWVSYp1GieKxa+WH1HofyP+LjRetAxzkXLOo+VFgQor9f7yrtLQH5AAgAA",pW="b9ab74e2",VU={name:lW,data:gW,hash:pW};let IW=new a,Hu=null,kp=new Uint8Array(8);function rc(c){return!Number.isInteger(c)||c<0||c>4294967295?new Error("Seed must be given as two valid 32-bit long unsigned integers (lo + high)."):null}function BB(c,g,y){let k=new DataView(c);k.setUint32(0,g,!0),k.setUint32(4,y,!0)}function hW(c,g=0,y=0){if(rc(g))return Promise.reject(rc(g));if(rc(y))return Promise.reject(rc(y));if(Hu===null)return w(IW,VU,16).then(k=>(Hu=k,BB(kp.buffer,g,y),Hu.writeMemory(kp),Hu.calculate(c)));try{BB(kp.buffer,g,y),Hu.writeMemory(kp);let k=Hu.calculate(c);return Promise.resolve(k)}catch(k){return Promise.reject(k)}}function yW(c=0,g=0){return rc(c)?Promise.reject(rc(c)):rc(g)?Promise.reject(rc(g)):Q(VU,16).then(y=>{let k=new Uint8Array(8);BB(k.buffer,c,g),y.writeMemory(k),y.init();let U={init:()=>(y.writeMemory(k),y.init(),U),update:G=>(y.update(G),U),digest:G=>y.digest(G),save:()=>y.save(),load:G=>(y.load(G),U),blockSize:512,digestSize:16};return U})}var BW="ripemd160",mW="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",CW="6abbce74",WU={name:BW,data:mW,hash:CW};let SW=new a,Ep=null;function kW(c){if(Ep===null)return w(SW,WU,20).then(g=>(Ep=g,Ep.calculate(c)));try{let g=Ep.calculate(c);return Promise.resolve(g)}catch(g){return Promise.reject(g)}}function EW(){return Q(WU,20).then(c=>{c.init();let g={init:()=>(c.init(),g),update:y=>(c.update(y),g),digest:y=>c.digest(y),save:()=>c.save(),load:y=>(c.load(y),g),blockSize:64,digestSize:20};return g})}function QW(c,g){let{blockSize:y}=c,k=b(g);if(k.length>y){c.update(k);let U=c.digest("binary");return c.init(),U}return new Uint8Array(k.buffer,k.byteOffset,k.length)}function wW(c,g){c.init();let{blockSize:y}=c,k=QW(c,g),U=new Uint8Array(y);U.set(k);let G=new Uint8Array(y);for(let me=0;me<y;me++){let Pn=U[me];G[me]=Pn^92,U[me]=Pn^54}c.update(U);let le={init:()=>(c.init(),c.update(U),le),update:me=>(c.update(me),le),digest:(me=>{let Pn=c.digest("binary");return c.init(),c.update(G),c.update(Pn),c.digest(me)}),save:()=>{throw new Error("save() not supported")},load:()=>{throw new Error("load() not supported")},blockSize:c.blockSize,digestSize:c.digestSize};return le}function KU(c,g){if(!c||!c.then)throw new Error('Invalid hash function is provided! Usage: createHMAC(createMD5(), "key").');return c.then(y=>wW(y,g))}function RW(c,g,y,k,U){return o(this,void 0,void 0,function*(){let G=new Uint8Array(k),le=new Uint8Array(g.length+4),me=new DataView(le.buffer),Pn=b(g),Fr=new Uint8Array(Pn.buffer,Pn.byteOffset,Pn.length);le.set(Fr);let Lr=0,ui=c.digestSize,Mr=Math.ceil(k/ui),la=null,Li=null;for(let ic=1;ic<=Mr;ic++){me.setUint32(g.length,ic),c.init(),c.update(le),la=c.digest("binary"),Li=la.slice();for(let Xa=1;Xa<y;Xa++){c.init(),c.update(Li),Li=c.digest("binary");for(let oc=0;oc<ui;oc++)la[oc]^=Li[oc]}G.set(la.subarray(0,k-Lr),Lr),Lr+=ui}if(U==="binary")return G;let Gf=new Uint8Array(k*2);return N(Gf,G,k)})}let bW=c=>{if(!c||typeof c!="object")throw new Error("Invalid options parameter. It requires an object.");if(!c.hashFunction||!c.hashFunction.then)throw new Error('Invalid hash function is provided! Usage: pbkdf2("password", "salt", 1000, 32, createSHA1()).');if(!Number.isInteger(c.iterations)||c.iterations<1)throw new Error("Iterations should be a positive number");if(!Number.isInteger(c.hashLength)||c.hashLength<1)throw new Error("Hash length should be a positive number");if(c.outputType===void 0&&(c.outputType="hex"),!["hex","binary"].includes(c.outputType))throw new Error(`Insupported output type ${c.outputType}. Valid values: ['hex', 'binary']`)};function mB(c){return o(this,void 0,void 0,function*(){bW(c);let g=yield KU(c.hashFunction,c.password);return RW(g,c.salt,c.iterations,c.hashLength,c.outputType)})}var PW="scrypt",NW="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cyICajYCOCAAIAAoAjwgAiAKakESdyAGc2o2AjwLvxIDFX8Bfg5/AkAgAkUNACAAQQd0IgNBQGoiBEEAKAKACCIFIAMgAmwiBmogAyABbGoiByADaiIIaiEJIAAgAkEHdCIKIAFBB3RqIgtsIQwgACALQYABamwhDSAAQQV0IgtBASALQQFLGyILQWBxIQ4gC0EBcSEPIAdBeGohECAHQXBqIREgB0FoaiESIAdBYGohEyAHQVhqIRQgB0FQaiEVIAdBSGohFiAHQUBqIRcgAa1Cf3whGCAEIAdqIRkgByAAQQh0IhpqIRsgACAKQYABamwhHCALQQRJIR1BACEeQQAhHwNAQQAoAoAIIiAgAyAfbGohIQJAIABFDQBBACEiAkAgHQ0AICAgHmohI0EAIQtBACEiA0AgByALaiIEICMgC2oiJCgCADYCACAEQQRqICRBBGooAgA2AgAgBEEIaiAkQQhqKAIANgIAIARBDGogJEEMaigCADYCACALQRBqIQsgDiAiQQRqIiJHDQALCyAPRQ0AIAcgIkECdCILaiAhIAtqKAIANgIACwJAIAFFDQBBACElIBwhIyAGISYDQCAFISQgACEiAkACQCAADQAgGyAXKQMANwMAIBsgFikDADcDCCAbIBUpAwA3AxAgGyAUKQMANwMYIBsgEykDADcDICAbIBIpAwA3AyggGyARKQMANwMwIBsgECkDADcDOAwBCwNAICQgJmoiCyAkIAxqIgQpAwA3AwAgC0EIaiAEQQhqKQMANwMAIAtBEGogBEEQaikDADcDACALQRhqIARBGGopAwA3AwAgC0EgaiAEQSBqKQMANwMAIAtBKGogBEEoaikDADcDACALQTBqIARBMGopAwA3AwAgC0E4aiAEQThqKQMANwMAIAtBwABqIARBwABqKQMANwMAIAtByABqIARByABqKQMANwMAIAtB0ABqIARB0ABqKQMANwMAIAtB2ABqIARB2ABqKQMANwMAIAtB4ABqIARB4ABqKQMANwMAIAtB6ABqIARB6ABqKQMANwMAIAtB8ABqIARB8ABqKQMANwMAIAtB+ABqIARB+ABqKQMANwMAICRBgAFqISQgIkF/aiIiDQALIAcgCCAbIAAQAiAFISQgACEiA0AgJCAjaiILICQgDWoiBCkDADcDACALQQhqIARBCGopAwA3AwAgC0EQaiAEQRBqKQMANwMAIAtBGGogBEEYaikDADcDACALQSBqIARBIGopAwA3AwAgC0EoaiAEQShqKQMANwMAIAtBMGogBEEwaikDADcDACALQThqIARBOGopAwA3AwAgC0HAAGogBEHAAGopAwA3AwAgC0HIAGogBEHIAGopAwA3AwAgC0HQAGogBEHQAGopAwA3AwAgC0HYAGogBEHYAGopAwA3AwAgC0HgAGogBEHgAGopAwA3AwAgC0HoAGogBEHoAGopAwA3AwAgC0HwAGogBEHwAGopAwA3AwAgC0H4AGogBEH4AGopAwA3AwAgJEGAAWohJCAiQX9qIiINAAsLIAggByAbIAAQAiAjIBpqISMgJiAaaiEmICVBAmoiJSABSQ0AC0EAISUDQAJAAkAgAA0AIBsgFykDADcDACAbIBYpAwA3AwggGyAVKQMANwMQIBsgFCkDADcDGCAbIBMpAwA3AyAgGyASKQMANwMoIBsgESkDADcDMCAbIBApAwA3AzgMAQsgACAKIBkpAgAgGIOnQQd0amwhJiAFISQgACEiA0AgJCAMaiILIAspAwAgJCAmaiIEKQMAhTcDACALQQhqIiMgIykDACAEQQhqKQMAhTcDACALQRBqIiMgIykDACAEQRBqKQMAhTcDACALQRhqIiMgIykDACAEQRhqKQMAhTcDACALQSBqIiMgIykDACAEQSBqKQMAhTcDACALQShqIiMgIykDACAEQShqKQMAhTcDACALQTBqIiMgIykDACAEQTBqKQMAhTcDACALQThqIiMgIykDACAEQThqKQMAhTcDACALQcAAaiIjICMpAwAgBEHAAGopAwCFNwMAIAtByABqIiMgIykDACAEQcgAaikDAIU3AwAgC0HQAGoiIyAjKQMAIARB0ABqKQMAhTcDACALQdgAaiIjICMpAwAgBEHYAGopAwCFNwMAIAtB4ABqIiMgIykDACAEQeAAaikDAIU3AwAgC0HoAGoiIyAjKQMAIARB6ABqKQMAhTcDACALQfAAaiIjICMpAwAgBEHwAGopAwCFNwMAIAtB+ABqIgsgCykDACAEQfgAaikDAIU3AwAgJEGAAWohJCAiQX9qIiINAAsgByAIIBsgABACIAAgCiAJKQIAIBiDp0EHdGpsISYgBSEkIAAhIgNAICQgDWoiCyALKQMAICQgJmoiBCkDAIU3AwAgC0EIaiIjICMpAwAgBEEIaikDAIU3AwAgC0EQaiIjICMpAwAgBEEQaikDAIU3AwAgC0EYaiIjICMpAwAgBEEYaikDAIU3AwAgC0EgaiIjICMpAwAgBEEgaikDAIU3AwAgC0EoaiIjICMpAwAgBEEoaikDAIU3AwAgC0EwaiIjICMpAwAgBEEwaikDAIU3AwAgC0E4aiIjICMpAwAgBEE4aikDAIU3AwAgC0HAAGoiIyAjKQMAIARBwABqKQMAhTcDACALQcgAaiIjICMpAwAgBEHIAGopAwCFNwMAIAtB0ABqIiMgIykDACAEQdAAaikDAIU3AwAgC0HYAGoiIyAjKQMAIARB2ABqKQMAhTcDACALQeAAaiIjICMpAwAgBEHgAGopAwCFNwMAIAtB6ABqIiMgIykDACAEQegAaikDAIU3AwAgC0HwAGoiIyAjKQMAIARB8ABqKQMAhTcDACALQfgAaiILIAspAwAgBEH4AGopAwCFNwMAICRBgAFqISQgIkF/aiIiDQALCyAIIAcgGyAAEAIgJUECaiIlIAFJDQALCwJAIABFDQBBACEiAkAgHQ0AICAgHmohI0EAIQtBACEiA0AgIyALaiIEIAcgC2oiJCgCADYCACAEQQRqICRBBGooAgA2AgAgBEEIaiAkQQhqKAIANgIAIARBDGogJEEMaigCADYCACALQRBqIQsgDiAiQQRqIiJHDQALCyAPRQ0AICEgIkECdCILaiAHIAtqKAIANgIACyAeIANqIR4gH0EBaiIfIAJHDQALCws=",vW="b32721f8",OW={name:PW,data:NW,hash:vW};function DW(c){return o(this,void 0,void 0,function*(){let{costFactor:g,blockSize:y,parallelism:k,hashLength:U}=c,G=MU(),le=yield mB({password:c.password,salt:c.salt,iterations:1,hashLength:128*y*k,hashFunction:G,outputType:"binary"}),me=yield Q(OW,0),Pn=128*y*g,Fr=256*y;me.setMemorySize(le.length+Pn+Fr),me.writeMemory(le,0),me.getExports().scrypt(y,g,k);let Lr=me.getMemory().subarray(0,128*y*k),ui=yield mB({password:c.password,salt:Lr,iterations:1,hashLength:U,hashFunction:G,outputType:"binary"});if(c.outputType==="hex"){let Mr=new Uint8Array(U*2);return N(Mr,ui,U)}return ui})}let UW=c=>c&&!(c&c-1),TW=c=>{if(!c||typeof c!="object")throw new Error("Invalid options parameter. It requires an object.");if(!Number.isInteger(c.blockSize)||c.blockSize<1)throw new Error("Block size should be a positive number");if(!Number.isInteger(c.costFactor)||c.costFactor<2||!UW(c.costFactor))throw new Error("Cost factor should be a power of 2, greater than 1");if(!Number.isInteger(c.parallelism)||c.parallelism<1)throw new Error("Parallelism should be a positive number");if(!Number.isInteger(c.hashLength)||c.hashLength<1)throw new Error("Hash length should be a positive number.");if(c.outputType===void 0&&(c.outputType="hex"),!["hex","binary"].includes(c.outputType))throw new Error(`Insupported output type ${c.outputType}. Valid values: ['hex', 'binary']`)};function xW(c){return o(this,void 0,void 0,function*(){return TW(c),DW(c)})}var JW="bcrypt",qW="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",FW="8bd8822d",LU={name:JW,data:qW,hash:FW};function MW(c){return o(this,void 0,void 0,function*(){let{costFactor:g,password:y,salt:k}=c,U=yield Q(LU,0);U.writeMemory(b(k),0);let G=b(y);U.writeMemory(G,16);let le=c.outputType==="encoded"?1:0;U.getExports().bcrypt(G.length,g,le);let me=U.getMemory();if(c.outputType==="encoded")return l(me,60);if(c.outputType==="hex"){let Pn=new Uint8Array(48);return N(Pn,me,24)}return me.slice(0,24)})}let HW=c=>{if(!c||typeof c!="object")throw new Error("Invalid options parameter. It requires an object.");if(!Number.isInteger(c.costFactor)||c.costFactor<4||c.costFactor>31)throw new Error("Cost factor should be a number between 4 and 31");if(c.password=b(c.password),c.password.length<1)throw new Error("Password should be at least 1 byte long");if(c.password.length>72)throw new Error("Password should be at most 72 bytes long");if(c.salt=b(c.salt),c.salt.length!==16)throw new Error("Salt should be 16 bytes long");if(c.outputType===void 0&&(c.outputType="encoded"),!["hex","binary","encoded"].includes(c.outputType))throw new Error(`Insupported output type ${c.outputType}. Valid values: ['hex', 'binary', 'encoded']`)};function _W(c){return o(this,void 0,void 0,function*(){return HW(c),MW(c)})}let GW=c=>!(!/^\$2[axyb]\$[0-3][0-9]\$[./A-Za-z0-9]{53}$/.test(c)||c[4]==="0"&&Number(c[5])<4||c[4]==="3"&&Number(c[5])>1),VW=c=>{if(!c||typeof c!="object")throw new Error("Invalid options parameter. It requires an object.");if(c.hash===void 0||typeof c.hash!="string")throw new Error("Hash should be specified");if(c.hash.length!==60)throw new Error("Hash should be 60 bytes long");if(!GW(c.hash))throw new Error("Invalid hash");if(c.password=b(c.password),c.password.length<1)throw new Error("Password should be at least 1 byte long");if(c.password.length>72)throw new Error("Password should be at most 72 bytes long")};function WW(c){return o(this,void 0,void 0,function*(){VW(c);let{hash:g,password:y}=c,k=yield Q(LU,0);k.writeMemory(b(g),0);let U=b(y);return k.writeMemory(U,60),!!k.getExports().bcrypt_verify(U.length)})}var KW="whirlpool",LW="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",YW="8d8f6035",YU={name:KW,data:LW,hash:YW};let zW=new a,Qp=null;function ZW(c){if(Qp===null)return w(zW,YU,64).then(g=>(Qp=g,Qp.calculate(c)));try{let g=Qp.calculate(c);return Promise.resolve(g)}catch(g){return Promise.reject(g)}}function XW(){return Q(YU,64).then(c=>{c.init();let g={init:()=>(c.init(),g),update:y=>(c.update(y),g),digest:y=>c.digest(y),save:()=>c.save(),load:y=>(c.load(y),g),blockSize:64,digestSize:64};return g})}var $W="sm3",jW="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",eK="b6fb4b8e",zU={name:$W,data:jW,hash:eK};let nK=new a,wp=null;function tK(c){if(wp===null)return w(nK,zU,32).then(g=>(wp=g,wp.calculate(c)));try{let g=wp.calculate(c);return Promise.resolve(g)}catch(g){return Promise.reject(g)}}function rK(){return Q(zU,32).then(c=>{c.init();let g={init:()=>(c.init(),g),update:y=>(c.update(y),g),digest:y=>c.digest(y),save:()=>c.save(),load:y=>(c.load(y),g),blockSize:64,digestSize:32};return g})}e.adler32=Y,e.argon2Verify=UV,e.argon2d=vV,e.argon2i=PV,e.argon2id=NV,e.bcrypt=_W,e.bcryptVerify=WW,e.blake2b=ec,e.blake2s=FV,e.blake3=WV,e.crc32=XV,e.crc64=r6,e.createAdler32=se,e.createBLAKE2b=Qs,e.createBLAKE2s=MV,e.createBLAKE3=KV,e.createCRC32=$V,e.createCRC64=i6,e.createHMAC=KU,e.createKeccak=v6,e.createMD4=u6,e.createMD5=I6,e.createRIPEMD160=EW,e.createSHA1=S6,e.createSHA224=J6,e.createSHA256=MU,e.createSHA3=b6,e.createSHA384=W6,e.createSHA512=Y6,e.createSM3=rK,e.createWhirlpool=XW,e.createXXHash128=yW,e.createXXHash3=fW,e.createXXHash32=eW,e.createXXHash64=aW,e.keccak=N6,e.md4=c6,e.md5=p6,e.pbkdf2=mB,e.ripemd160=kW,e.scrypt=xW,e.sha1=C6,e.sha224=x6,e.sha256=F6,e.sha3=R6,e.sha384=V6,e.sha512=L6,e.sm3=tK,e.whirlpool=ZW,e.xxhash128=hW,e.xxhash3=AW,e.xxhash32=j6,e.xxhash64=oW}))});var ST=I($f=>{"use strict";Object.defineProperty($f,"__esModule",{value:!0});$f.Argon2id=void 0;$f.isArgon2idOptions=oL;var CT=ar(),iL=mT();function oL(e){return!(!(0,CT.isNonNullObject)(e)||typeof e.outputLength!="number"||typeof e.opsLimit!="number"||typeof e.memLimitKib!="number")}var fm=class{static async execute(n,t,i){let r={password:n,salt:t,outputType:"binary",iterations:i.opsLimit,memorySize:i.memLimitKib,parallelism:1,hashLength:i.outputLength};if(t.length!==16)throw new Error(`Got invalid salt length ${t.length}. Must be 16.`);let o=await(0,iL.argon2id)(r);return(0,CT.assert)(typeof o!="string"),o}};$f.Argon2id=fm});var kT=I(xp=>{"use strict";Object.defineProperty(xp,"__esModule",{value:!0});xp.toAscii=aL;xp.fromAscii=sL;function aL(e){return Uint8Array.from((t=>t.split("").map(i=>{let r=i.charCodeAt(0);if(r<32||r>126)throw new Error(`Cannot encode character that is out of printable ASCII range: ${r}`);return r}))(e))}function sL(e){return(t=>t.map(i=>{if(i<32||i>126)throw new Error(`Cannot decode character that is out of printable ASCII range: ${i}`);return String.fromCharCode(i)}))(Array.from(e)).join("")}});var wT=I(Jp=>{"use strict";Jp.byteLength=cL;Jp.toByteArray=AL;Jp.fromByteArray=gL;var Ps=[],ha=[],dL=typeof Uint8Array<"u"?Uint8Array:Array,lm="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";for($c=0,ET=lm.length;$c<ET;++$c)Ps[$c]=lm[$c],ha[lm.charCodeAt($c)]=$c;var $c,ET;ha[45]=62;ha[95]=63;function QT(e){var n=e.length;if(n%4>0)throw new Error("Invalid string. Length must be a multiple of 4");var t=e.indexOf("=");t===-1&&(t=n);var i=t===n?0:4-t%4;return[t,i]}function cL(e){var n=QT(e),t=n[0],i=n[1];return(t+i)*3/4-i}function uL(e,n,t){return(n+t)*3/4-t}function AL(e){var n,t=QT(e),i=t[0],r=t[1],o=new dL(uL(e,i,r)),a=0,s=r>0?i-4:i,d;for(d=0;d<s;d+=4)n=ha[e.charCodeAt(d)]<<18|ha[e.charCodeAt(d+1)]<<12|ha[e.charCodeAt(d+2)]<<6|ha[e.charCodeAt(d+3)],o[a++]=n>>16&255,o[a++]=n>>8&255,o[a++]=n&255;return r===2&&(n=ha[e.charCodeAt(d)]<<2|ha[e.charCodeAt(d+1)]>>4,o[a++]=n&255),r===1&&(n=ha[e.charCodeAt(d)]<<10|ha[e.charCodeAt(d+1)]<<4|ha[e.charCodeAt(d+2)]>>2,o[a++]=n>>8&255,o[a++]=n&255),o}function fL(e){return Ps[e>>18&63]+Ps[e>>12&63]+Ps[e>>6&63]+Ps[e&63]}function lL(e,n,t){for(var i,r=[],o=n;o<t;o+=3)i=(e[o]<<16&16711680)+(e[o+1]<<8&65280)+(e[o+2]&255),r.push(fL(i));return r.join("")}function gL(e){for(var n,t=e.length,i=t%3,r=[],o=16383,a=0,s=t-i;a<s;a+=o)r.push(lL(e,a,a+o>s?s:a+o));return i===1?(n=e[t-1],r.push(Ps[n>>2]+Ps[n<<4&63]+"==")):i===2&&(n=(e[t-2]<<8)+e[t-1],r.push(Ps[n>>10]+Ps[n>>4&63]+Ps[n<<2&63]+"=")),r.join("")}});var jf=I(gm=>{"use strict";Object.defineProperty(gm,"__esModule",{value:!0});gm.fixUint8Array=IL;function pL(e){return e.buffer instanceof ArrayBuffer}function IL(e){if(pL(e))return e;let n=new ArrayBuffer(e.byteLength),t=new Uint8Array(n);return t.set(e),t}});var bT=I(Ns=>{"use strict";var hL=Ns&&Ns.__createBinding||(Object.create?(function(e,n,t,i){i===void 0&&(i=t);var r=Object.getOwnPropertyDescriptor(n,t);(!r||("get"in r?!n.__esModule:r.writable||r.configurable))&&(r={enumerable:!0,get:function(){return n[t]}}),Object.defineProperty(e,i,r)}):(function(e,n,t,i){i===void 0&&(i=t),e[i]=n[t]})),yL=Ns&&Ns.__setModuleDefault||(Object.create?(function(e,n){Object.defineProperty(e,"default",{enumerable:!0,value:n})}):function(e,n){e.default=n}),BL=Ns&&Ns.__importStar||(function(){var e=function(n){return e=Object.getOwnPropertyNames||function(t){var i=[];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(i[i.length]=r);return i},e(n)};return function(n){if(n&&n.__esModule)return n;var t={};if(n!=null)for(var i=e(n),r=0;r<i.length;r++)i[r]!=="default"&&hL(t,n,i[r]);return yL(t,n),t}})();Object.defineProperty(Ns,"__esModule",{value:!0});Ns.toBase64=CL;Ns.fromBase64=SL;var RT=BL(wT()),mL=jf();function CL(e){return RT.fromByteArray(e)}function SL(e){if(!e.match(/^[a-zA-Z0-9+/]*={0,2}$/))throw new Error("Invalid base64 string format");return(0,mL.fixUint8Array)(RT.toByteArray(e))}});var ex={};ZU(ex,{__TESTS:()=>$L,ascii:()=>ZL,base16:()=>QL,base32:()=>wL,base32crockford:()=>vL,base32hex:()=>bL,base32hexnopad:()=>PL,base32nopad:()=>RL,base36:()=>HL,base58:()=>qp,base58check:()=>WL,base58flickr:()=>_L,base58xmr:()=>VL,base58xrp:()=>GL,base64:()=>DL,base64nopad:()=>UL,base64url:()=>TL,base64urlnopad:()=>xL,bech32:()=>YL,bech32m:()=>zL,createBase58check:()=>zT,hex:()=>n5,utf8:()=>XL});function qT(e){return e instanceof Uint8Array||ArrayBuffer.isView(e)&&e.constructor.name==="Uint8Array"&&"BYTES_PER_ELEMENT"in e&&e.BYTES_PER_ELEMENT===1}function Uo(e){if(!qT(e))throw new TypeError("Uint8Array expected")}function kL(e,n){return Array.isArray(n)?n.length===0?!0:e?n.every(t=>typeof t=="string"):n.every(t=>Number.isSafeInteger(t)):!1}function Fp(e){if(typeof e!="function")throw new TypeError("function expected");return!0}function ra(e,n){if(typeof n!="string")throw new TypeError(`${e}: string expected`);return!0}function nl(e,n="number"){if(typeof e!="number")throw new TypeError(`${n}: expected number, got ${typeof e}`);if(!Number.isSafeInteger(e))throw new RangeError(`${n}: expected safe integer, got ${e}`)}function PT(e,n){if(!kL(!1,n))throw new TypeError(`${e}: array of numbers expected`)}function ya(...e){let n=o=>o,t=(o,a)=>s=>o(a(s)),i=e.map(o=>o.encode).reduceRight(t,n),r=e.map(o=>o.decode).reduce(t,n);return{encode:i,decode:r}}function FT(e){return Fp(e),{encode:n=>n,decode:n=>e(n)}}function NT(e,n=e.length){let t=new Array(n);for(let i=0;i<n;i++)t[i]=e[i];return t}function MT(e){let n=e.length;if(vT!==void 0&&n>=12)return vT.decode(e);if(n<=pm)return String.fromCharCode.apply(null,e);let t="";for(let i=0;i<n;i+=pm)t+=String.fromCharCode.apply(null,e.subarray(i,i+pm));return t}function ia(e){if(nl(e),e<=0||e>8)throw new RangeError("radix2: bits should be in (0..8]");let n=EL[e]-1;return{encode:t=>{Uo(t);let i=t.length,r=new Uint8Array(Math.ceil(i*8/e)),o=0,a=0,s=0;for(let d=0;d<i;)for(d+2<i?(o=o<<24|t[d]<<16|t[d+1]<<8|t[d+2],a+=24,d+=3):(o=(o<<8|t[d])&65535,a+=8,d++);a-=e,r[s++]=o>>a&n,!(a<e););return a>0&&(r[s]=o<<e-a&n),r},decode:t=>{let i=t.length,r=new Uint8Array(Math.floor(i*e/8)),o=0,a=0,s=0;for(let d=0;d<i;d++)for(o=(o<<e|t[d])&65535,a+=e;a>=8;a-=8)r[s++]=o>>a-8&255;if(o=o<<8-a&255,a>=e)throw new Error("Excess padding");if(o>0)throw new Error(`Non-zero padding: ${o}`);return r}}}function To(e,n){let t=e.length;if(t>128)throw new Error("alphabet: max 128 letters");let i=new Uint8Array(t),r=new Int8Array(128).fill(-1);for(let o=0;o<t;o++){let a=e.charCodeAt(o);if(e.codePointAt(o)!==a||a>127)throw new Error("alphabet: single-char ASCII letters only");i[o]=a,r[a]=o}if(n!==void 0)for(let o of Object.keys(n)){let a=o.charCodeAt(0),s=r[n[o].charCodeAt(0)];if(o.length!==1||a>127||s===void 0||s===-1)throw new Error(`alphabet: invalid alias ${o}`);r[a]=s}return{encode:o=>{let a=new Uint8Array(o.length);for(let s=0;s<o.length;s++){let d=o[s],u=i[d];if(u===void 0)throw new Error(`alphabet.encode: invalid digit ${d}`);a[s]=u}return MT(a)},decode:o=>{ra("decode",o);let a=o.length,s=new Uint8Array(a);for(let d=0;d<a;d++){let u=o.charCodeAt(d),f=u<128?r[u]:-1;if(f===-1)throw new Error(`Unknown letter "${o[d]}". Allowed: ${e}`);s[d]=f}return s}}}function Mp(e,n="="){return nl(e),ra("padding",n),{encode(t){for(;t.length*e%8;)t+=n;return t},decode(t){ra("decode",t);let i=t.length;if(i*e%8)throw new Error("padding: invalid length");for(;i>0&&t[i-1]===n;i--)if((i-1)*e%8===0)throw new Error("padding: excess padding");return t.slice(0,i)}}}function OT(e){return Fp(e),function(...n){try{return e.apply(null,n)}catch{}}}function HT(e,n){if(nl(e),e<=0)throw new RangeError(`checksum length must be positive: ${e}`);Fp(n);let t=n;return{encode(i){Uo(i);let r=t(i).slice(0,e),o=new Uint8Array(i.length+e);return o.set(i),o.set(r,i.length),o},decode(i){Uo(i);let r=i.slice(0,-e),o=i.slice(-e),a=t(r).slice(0,e);for(let s=0;s<e;s++)if(a[s]!==o[s])throw new Error("Invalid checksum");return r}}}function TT(e,n){for(let t=0;t<n.length;t++){let i=n.charCodeAt(t);if(i<33||i>126)throw new Error(`${e}: printable ASCII expected`)}}function LL(e){let n=e.length,t=new Uint8Array(n);for(let i=0;i<n;i++){let r=e[i];if(r<0||r>=32)throw new Error(`alphabet.encode: invalid digit ${r}`);t[i]=r}return t}function el(e){let n=e>>25,t=(e&33554431)<<5;for(let i=0;i<xT.length;i++)(n>>i&1)===1&&(t^=xT[i]);return t}function JT(e,n,t=1){let i=e.length,r=1;for(let a=0;a<i;a++){let s=e.charCodeAt(a);if(s<33||s>126)throw new Error(`Invalid prefix (${e})`);r=el(r)^s>>5}r=el(r);for(let a=0;a<i;a++)r=el(r)^e.charCodeAt(a)&31;for(let a of n)r=el(r)^a;for(let a=0;a<6;a++)r=el(r);r^=t;let o=new Uint8Array(6);for(let a=0;a<6;a++)o[a]=r>>>5*(5-a)&31;return Im.encode(o)}function ZT(e){let n=e==="bech32"?1:734539939,t=ia(5),i=p=>{Uo(p);let l=p.length,h=new Array(Math.ceil(l*8/5)),B=0,C=0,E=0;for(let S=0;S<l;S++)for(B=B<<8|p[S],C+=8;C>=5;C-=5)h[E++]=B>>C-5&31;return C>0&&(h[E]=B<<5-C&31),h},r=p=>{PT("radix2.decode",p);let l=p.length,h=new Uint8Array(l);for(let B=0;B<l;B++){let C=p[B];if(C<0||C>=32)throw new Error(`convertRadix2: invalid word=${C}`);h[B]=C}return t.decode(h)},o=OT(r);function a(p,l,h=90){ra("bech32.encode prefix",p),h!==!1&&nl(h,"limit"),qT(l)&&(l=NT(l)),PT("bech32.encode",l);let B=p.length;if(B===0)throw new TypeError(`Invalid prefix length ${B}`);let C=B+7+l.length;if(h!==!1&&C>h)throw new TypeError(`Length ${C} exceeds limit ${h}`);TT("bech32.encode prefix",p);let E=p.toLowerCase(),S=JT(E,l,n);return`${E}1${Im.encode(LL(l))}${S}`}function s(p,l=90){ra("bech32.decode input",p),l!==!1&&nl(l,"limit");let h=p.length;if(h<8||l!==!1&&h>l)throw new TypeError(`invalid string length ${h}, expected (8..${l})`);let B=p.toLowerCase();if(p!==B&&!KL.test(p))throw TT("bech32.decode input",p),new Error("mixed-case string not allowed");let C=B.lastIndexOf("1");if(C===0||C===-1)throw new Error('invalid separator "1"');let E=B.slice(0,C),S=B.slice(C+1);if(S.length<6)throw new Error("invalid data length");let N=Im.decode(S),b=NT(N,N.length-6),V=JT(E,b,n);if(!S.endsWith(V))throw new Error(`Invalid checksum in ${p}`);return{prefix:E,words:b}}let d=OT(s);function u(p,l=90){let{prefix:h,words:B}=s(p,l);return{prefix:h,words:B,bytes:r(B)}}function f(p,l){return a(p,i(l))}return{encode:a,decode:s,encodeFromBytes:f,decodeToBytes:u,decodeUnsafe:d,fromWords:r,fromWordsUnsafe:o,toWords:i}}var sr,EL,vT,pm,QL,wL,RL,bL,PL,NL,vL,_T,OL,GT,VT,WT,DL,UL,TL,xL,JL,qL,DT,FL,ML,KT,LT,YT,HL,ym,qp,_L,GL,UT,VL,zT,WL,Im,KL,xT,YL,zL,ZL,XT,$T,Zu,hm,XL,jT,$L,jL,e5,n5,nx=uK(()=>{sr=e=>Object.freeze(e());EL=(()=>{let e=[];for(let n=0;n<40;n++)e.push(2**n);return e})();vT=(()=>{try{let e=new TextDecoder;return e.decode(Uint8Array.of(65,48,43,127))==="A0+\x7F"?e:void 0}catch{return}})(),pm=8192;QL=sr(()=>ya(ia(4),To("0123456789ABCDEF"))),wL=sr(()=>ya(ia(5),To("ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"),Mp(5))),RL=sr(()=>ya(ia(5),To("ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"))),bL=sr(()=>ya(ia(5),To("0123456789ABCDEFGHIJKLMNOPQRSTUV"),Mp(5))),PL=sr(()=>ya(ia(5),To("0123456789ABCDEFGHIJKLMNOPQRSTUV"))),NL=/^[\x00-\x7f]*$/,vL=sr(()=>ya(ia(5),To("0123456789ABCDEFGHJKMNPQRSTVWXYZ"),FT(e=>{ra("base32crockford.decode",e);let n=e.toUpperCase();if(e!==n&&!NL.test(e))throw new Error("base32crockford.decode: ASCII expected");return n.replace(/O/g,"0").replace(/[IL]/g,"1")}))),_T=typeof Uint8Array.from([]).toBase64=="function"&&typeof Uint8Array.fromBase64=="function",OL=/[\t\n\f\r ]/,GT=(e,n)=>{ra("base64",e);let t=n?"base64url":"base64";if(e.length>0&&OL.test(e))throw new Error("invalid base64");return Uint8Array.fromBase64(e,{alphabet:t,lastChunkHandling:"strict"})},VT=sr(()=>ya(ia(6),To("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"),Mp(6))),WT=sr(()=>ya(ia(6),To("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"),Mp(6))),DL=sr(()=>_T?{encode(e){return Uo(e),e.toBase64()},decode(e){return GT(e,!1)}}:VT),UL=sr(()=>ya(ia(6),To("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"))),TL=sr(()=>_T?{encode(e){return Uo(e),e.toBase64({alphabet:"base64url"})},decode(e){return GT(e,!0)}}:WT),xL=sr(()=>ya(ia(6),To("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"))),JL=656356768,qL=60466176,DT=65536,FL=2048,ML=4096,KT=(e,n)=>({encode:t=>{Uo(t);let i=t.length;if(i===0)return new Uint8Array(0);if(i>=DT)throw new Error("invalid length");let r=0;for(;r<i-1&&t[r]===0;)r++;let o=Math.ceil(i/2),a=new Uint16Array(o),s=i&1;s&&(a[0]=t[0]);for(let B=s,C=s;B<i;B+=2,C++)a[C]=t[B]<<8|t[B+1];let d=[],u=0;for(;u<o;){let B=0;for(let C=u;C<o;C++){let E=B*65536+a[C],S=Math.floor(E/n);B=E-S*n,a[C]=S,S===0&&C===u&&u++}d.push(B)}let f=d.length-1,p=f*5;for(let B=d[f];p++,!(B<e);B=Math.floor(B/e));let l=new Uint8Array(r+p),h=l.length-1;for(let B=0;B<f;B++){let C=d[B];for(let E=0;E<5;E++)l[h--]=C%e,C=Math.floor(C/e)}for(let B=d[f];h>=r;B=Math.floor(B/e))l[h--]=B%e;return l},decode:t=>{Uo(t);let i=t.length;if(i===0)return new Uint8Array(0);if(i>=DT)throw new Error("invalid length");let r=0;for(;r<i-1&&t[r]===0;)r++;let o=new Uint16Array(Math.ceil(i*6/16)+1),a=0,s=0,d=i%5||5;for(;s<i;){let l=0,h=1;for(let C=s+d;s<C;s++){let E=t[s];if(E>=e)throw new Error(`invalid integer: ${E}`);l=l*e+E,h*=e}d=5;let B=l;for(let C=0;C<a;C++){let E=o[C]*h+B;B=Math.floor(E/65536),o[C]=E-B*65536}for(;B>0;B=Math.floor(B/65536))o[a++]=B%65536}let u=a===0?1:a*2-(o[a-1]<256?1:0),f=new Uint8Array(r+u),p=f.length-1;for(let l=0;l<a;l++){let h=o[l];f[p--]=h&255,p>=r&&(f[p--]=h>>8)}return f}}),LT=(e,n)=>{let t=To(n);return{encode(i){if(Uo(i),i.length>FL)throw new Error("invalid length");return t.encode(e.encode(i))},decode(i){if(ra("baseN.decode",i),i.length>ML)throw new Error("invalid length");return e.decode(t.decode(i))}}},YT=KT(58,JL),HL=sr(()=>LT(KT(36,qL),"0123456789abcdefghijklmnopqrstuvwxyz")),ym=e=>LT(YT,e),qp=sr(()=>ym("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz")),_L=sr(()=>ym("123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ")),GL=sr(()=>ym("rpshnaf39wBUDNEGHJKLM4PQRST7VWXYZ2bcdeCg65jkm8oFqi1tuvAxyz")),UT=[0,2,3,5,6,7,9,10,11],VL=sr(()=>({encode(e){Uo(e);let n="";for(let t=0;t<e.length;t+=8){let i=e.subarray(t,t+8);n+=qp.encode(i).padStart(UT[i.length],"1")}return n},decode(e){ra("base58xmr.decode",e);let n=e.length,t=n%11,i=t===0?0:UT.indexOf(t);if(i===-1)throw new Error(`base58xmr: invalid block length ${t}`);let r=new Uint8Array(Math.floor(n/11)*8+i),o=0;for(let a=0;a<n;a+=11){let s=e.slice(a,a+11),d=s.length===11?8:i,u=qp.decode(s);for(let f=0;f<u.length-d;f++)if(u[f]!==0)throw new Error("base58xmr: wrong padding");for(let f=u.length-d;f<u.length;f++)r[o++]=u[f]}return r}})),zT=e=>{Fp(e);let n=e;return ya(HT(4,t=>n(n(t))),qp)},WL=zT,Im=To("qpzry9x8gf2tvdw0s3jn54khce6mua7l"),KL=/^[\x21-\x60\x7b-\x7e]+$/;xT=[996825010,642813549,513874426,1027748829,705979059];YL=sr(()=>ZT("bech32")),zL=sr(()=>ZT("bech32m")),ZL=sr(()=>({encode(e){Uo(e);for(let n=0;n<e.length;n++){let t=e[n];if(t>127)throw new RangeError(`non-ASCII byte ${t} at ${n}`)}return MT(e)},decode(e){if(typeof e!="string")throw new TypeError("ascii string expected, got "+typeof e);let n=new Uint8Array(e.length);for(let t=0;t<e.length;t++){let i=e.charCodeAt(t);if(i>127)throw new RangeError(`non-ASCII char "${e[t]}" (${i}) at ${t}`);n[t]=i}return n}})),XT=e=>{try{return encodeURI(e)!==null}catch{return!1}},$T=typeof"".isWellFormed=="function"?e=>e.isWellFormed():XT,Zu=e=>new TypeError(`invalid utf8 at byte ${e}`),hm=sr(()=>({encode(e){Uo(e);let n="";for(let t=0;t<e.length;){let i=e[t++];if(i<128){n+=String.fromCharCode(i);continue}if(i<194||t>=e.length)throw Zu(t-1);let r=e[t++];if((r&192)!==128)throw Zu(t-1);let o=(i&31)<<6|r&63;if(i>=224){if(t>=e.length)throw Zu(t-1);let a=e[t++];if((a&192)!==128||i===224&&r<160||i===237&&r>=160)throw Zu(t-1);if(o=(i&15)<<12|(r&63)<<6|a&63,i>=240){if(t>=e.length)throw Zu(t-1);let s=e[t++];if(i>244||(s&192)!==128||i===240&&r<144||i===244&&r>=144)throw Zu(t-1);o=(i&7)<<18|(r&63)<<12|(a&63)<<6|s&63}}o<65536?n+=String.fromCharCode(o):(o-=65536,n+=String.fromCharCode((o>>10)+55296,(o&1023)+56320))}return n},decode(e){if(ra("utf8",e),!$T(e))throw new TypeError("utf8 expected well-formed string");let n=new Uint8Array(e.length*3),t=0;for(let i=0;i<e.length;i++){let r=e.charCodeAt(i);if(r<128){n[t++]=r;continue}if(r>=55296&&r<=57343){let o=e.charCodeAt(++i);r=65536+(r-55296<<10)+o-56320}r>=65536?(n[t++]=r>>18|240,n[t++]=r>>12&63|128):r>=2048?n[t++]=r>>12|224:n[t++]=r>>6|192,r>=2048&&(n[t++]=r>>6&63|128),n[t++]=r&63|128}return n.subarray(0,t)}})),XL=sr(()=>{let e,n,t={encode(i){return Uo(i),(n||(n=new TextDecoder("utf-8",{ignoreBOM:!0,fatal:!0}))).decode(i)},decode(i){if(ra("utf8",i),!$T(i))throw new TypeError("utf8 expected well-formed string");return(e||(e=new TextEncoder)).encode(i)}};return{encode:typeof TextDecoder=="function"?t.encode:hm.encode,decode:typeof TextEncoder=="function"?t.decode:hm.decode}}),jT=sr(()=>ya(ia(4),To("0123456789abcdef",{A:"a",B:"b",C:"c",D:"d",E:"e",F:"f"}),FT(e=>{if(ra("hex",e),e.length%2!==0)throw new TypeError(`hex.decode: odd-length string (${e.length})`);return e}))),$L=sr(()=>({alphabet:To,base64Fallback:VT,base64urlFallback:WT,hexFallback:jT,radix2:ia,radix58:YT,checksum:HT,utf8Fallback:hm,_isWellFormedShim:XT})),jL=typeof Uint8Array.from([]).toHex=="function"&&typeof Uint8Array.fromHex=="function",e5={encode(e){return Uo(e),e.toHex()},decode(e){return ra("hex",e),Uint8Array.fromHex(e)}},n5=sr(()=>jL?e5:jT)});var ix=I(tl=>{"use strict";Object.defineProperty(tl,"__esModule",{value:!0});tl.toBech32=tx;tl.fromBech32=rx;tl.normalizeBech32=i5;var Hp=(nx(),jU(ex)),t5=jf();function tx(e,n,t){return Hp.bech32.encode(e,Hp.bech32.toWords(n),t)}function r5(e){return e.indexOf("1")!==-1}function rx(e,n=1/0){if(!r5(e))throw new Error("No bech32 separator found");let t=Hp.bech32.decode(e,n);return{prefix:t.prefix,data:(0,t5.fixUint8Array)(Hp.bech32.fromWords(t.words))}}function i5(e){let{prefix:n,data:t}=rx(e);return tx(n,t)}});var ox=I(_p=>{"use strict";Object.defineProperty(_p,"__esModule",{value:!0});_p.toHex=o5;_p.fromHex=a5;function o5(e){let n="";for(let t of e)n+=("0"+t.toString(16)).slice(-2);return n}function a5(e){if(e.length%2!==0)throw new Error("hex string length must be a multiple of 2");let n=new Uint8Array(e.length/2);for(let t=0;t<n.length;t++){let i=2*t,r=e.slice(i,i+2);if(!r.match(/[0-9a-f]{2}/i))throw new Error("hex string contains invalid characters");n[t]=parseInt(r,16)}return n}});var ax=I(Gp=>{"use strict";Object.defineProperty(Gp,"__esModule",{value:!0});Gp.fromRfc3339=d5;Gp.toRfc3339=c5;var s5=/^(\d{4})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2}):(\d{2})(\.\d{1,9})?((?:[+-]\d{2}:\d{2})|Z)$/;function Xu(e,n=2){return e.toString().padStart(n,"0")}function d5(e){let n=s5.exec(e);if(!n)throw new Error("Date string is not in RFC3339 format");let t=+n[1],i=+n[2],r=+n[3],o=+n[4],a=+n[5],s=+n[6],d=n[7]?Math.floor(+n[7]*1e3):0,u,f,p;n[8]==="Z"?(u=1,f=0,p=0):(u=n[8].substring(0,1)==="-"?-1:1,f=+n[8].substring(1,3),p=+n[8].substring(4,6));let l=u*(f*60+p)*60,h=new Date;return h.setUTCFullYear(t,i-1,r),h.setUTCHours(o,a,s,d),new Date(h.getTime()-l*1e3)}function c5(e){let n=e.getUTCFullYear(),t=Xu(e.getUTCMonth()+1),i=Xu(e.getUTCDate()),r=Xu(e.getUTCHours()),o=Xu(e.getUTCMinutes()),a=Xu(e.getUTCSeconds()),s=Xu(e.getUTCMilliseconds(),3);return`${n}-${t}-${i}T${r}:${o}:${a}.${s}Z`}});var sx=I(Vp=>{"use strict";Object.defineProperty(Vp,"__esModule",{value:!0});Vp.toUtf8=A5;Vp.fromUtf8=f5;var u5=jf();function A5(e){return(0,u5.fixUint8Array)(new TextEncoder().encode(e))}function f5(e,n=!1){let t=!n;return new TextDecoder("utf-8",{fatal:t}).decode(e)}});var kn=I(qt=>{"use strict";Object.defineProperty(qt,"__esModule",{value:!0});qt.toUtf8=qt.fromUtf8=qt.fixUint8Array=qt.toRfc3339=qt.fromRfc3339=qt.toHex=qt.fromHex=qt.toBech32=qt.normalizeBech32=qt.fromBech32=qt.toBase64=qt.fromBase64=qt.toAscii=qt.fromAscii=void 0;var dx=kT();Object.defineProperty(qt,"fromAscii",{enumerable:!0,get:function(){return dx.fromAscii}});Object.defineProperty(qt,"toAscii",{enumerable:!0,get:function(){return dx.toAscii}});var cx=bT();Object.defineProperty(qt,"fromBase64",{enumerable:!0,get:function(){return cx.fromBase64}});Object.defineProperty(qt,"toBase64",{enumerable:!0,get:function(){return cx.toBase64}});var Bm=ix();Object.defineProperty(qt,"fromBech32",{enumerable:!0,get:function(){return Bm.fromBech32}});Object.defineProperty(qt,"normalizeBech32",{enumerable:!0,get:function(){return Bm.normalizeBech32}});Object.defineProperty(qt,"toBech32",{enumerable:!0,get:function(){return Bm.toBech32}});var ux=ox();Object.defineProperty(qt,"fromHex",{enumerable:!0,get:function(){return ux.fromHex}});Object.defineProperty(qt,"toHex",{enumerable:!0,get:function(){return ux.toHex}});var Ax=ax();Object.defineProperty(qt,"fromRfc3339",{enumerable:!0,get:function(){return Ax.fromRfc3339}});Object.defineProperty(qt,"toRfc3339",{enumerable:!0,get:function(){return Ax.toRfc3339}});var l5=jf();Object.defineProperty(qt,"fixUint8Array",{enumerable:!0,get:function(){return l5.fixUint8Array}});var fx=sx();Object.defineProperty(qt,"fromUtf8",{enumerable:!0,get:function(){return fx.fromUtf8}});Object.defineProperty(qt,"toUtf8",{enumerable:!0,get:function(){return fx.toUtf8}})});var lx=I(Wp=>{"use strict";Object.defineProperty(Wp,"__esModule",{value:!0});Wp.crypto=void 0;Wp.crypto=typeof globalThis=="object"&&"crypto"in globalThis?globalThis.crypto:void 0});var oa=I(un=>{"use strict";Object.defineProperty(un,"__esModule",{value:!0});un.wrapXOFConstructorWithOpts=un.wrapConstructorWithOpts=un.wrapConstructor=un.Hash=un.nextTick=un.swap32IfBE=un.byteSwapIfBE=un.swap8IfBE=un.isLE=void 0;un.isBytes=px;un.anumber=mm;un.abytes=ju;un.ahash=g5;un.aexists=p5;un.aoutput=I5;un.u8=h5;un.u32=y5;un.clean=B5;un.createView=m5;un.rotr=C5;un.rotl=S5;un.byteSwap=Sm;un.byteSwap32=Ix;un.bytesToHex=E5;un.hexToBytes=Q5;un.asyncLoop=R5;un.utf8ToBytes=km;un.bytesToUtf8=b5;un.toBytes=Kp;un.kdfInputToBytes=P5;un.concatBytes=N5;un.checkOpts=v5;un.createHasher=yx;un.createOptHasher=Bx;un.createXOFer=mx;un.randomBytes=O5;var $u=lx();function px(e){return e instanceof Uint8Array||ArrayBuffer.isView(e)&&e.constructor.name==="Uint8Array"}function mm(e){if(!Number.isSafeInteger(e)||e<0)throw new Error("positive integer expected, got "+e)}function ju(e,...n){if(!px(e))throw new Error("Uint8Array expected");if(n.length>0&&!n.includes(e.length))throw new Error("Uint8Array expected of length "+n+", got length="+e.length)}function g5(e){if(typeof e!="function"||typeof e.create!="function")throw new Error("Hash should be wrapped by utils.createHasher");mm(e.outputLen),mm(e.blockLen)}function p5(e,n=!0){if(e.destroyed)throw new Error("Hash instance has been destroyed");if(n&&e.finished)throw new Error("Hash#digest() has already been called")}function I5(e,n){ju(e);let t=n.outputLen;if(e.length<t)throw new Error("digestInto() expects output buffer of length at least "+t)}function h5(e){return new Uint8Array(e.buffer,e.byteOffset,e.byteLength)}function y5(e){return new Uint32Array(e.buffer,e.byteOffset,Math.floor(e.byteLength/4))}function B5(...e){for(let n=0;n<e.length;n++)e[n].fill(0)}function m5(e){return new DataView(e.buffer,e.byteOffset,e.byteLength)}function C5(e,n){return e<<32-n|e>>>n}function S5(e,n){return e<<n|e>>>32-n>>>0}un.isLE=new Uint8Array(new Uint32Array([287454020]).buffer)[0]===68;function Sm(e){return e<<24&4278190080|e<<8&16711680|e>>>8&65280|e>>>24&255}un.swap8IfBE=un.isLE?e=>e:e=>Sm(e);un.byteSwapIfBE=un.swap8IfBE;function Ix(e){for(let n=0;n<e.length;n++)e[n]=Sm(e[n]);return e}un.swap32IfBE=un.isLE?e=>e:Ix;var hx=typeof Uint8Array.from([]).toHex=="function"&&typeof Uint8Array.fromHex=="function",k5=Array.from({length:256},(e,n)=>n.toString(16).padStart(2,"0"));function E5(e){if(ju(e),hx)return e.toHex();let n="";for(let t=0;t<e.length;t++)n+=k5[e[t]];return n}var Nd={_0:48,_9:57,A:65,F:70,a:97,f:102};function gx(e){if(e>=Nd._0&&e<=Nd._9)return e-Nd._0;if(e>=Nd.A&&e<=Nd.F)return e-(Nd.A-10);if(e>=Nd.a&&e<=Nd.f)return e-(Nd.a-10)}function Q5(e){if(typeof e!="string")throw new Error("hex string expected, got "+typeof e);if(hx)return Uint8Array.fromHex(e);let n=e.length,t=n/2;if(n%2)throw new Error("hex string expected, got unpadded hex of length "+n);let i=new Uint8Array(t);for(let r=0,o=0;r<t;r++,o+=2){let a=gx(e.charCodeAt(o)),s=gx(e.charCodeAt(o+1));if(a===void 0||s===void 0){let d=e[o]+e[o+1];throw new Error('hex string expected, got non-hex character "'+d+'" at index '+o)}i[r]=a*16+s}return i}var w5=async()=>{};un.nextTick=w5;async function R5(e,n,t){let i=Date.now();for(let r=0;r<e;r++){t(r);let o=Date.now()-i;o>=0&&o<n||(await(0,un.nextTick)(),i+=o)}}function km(e){if(typeof e!="string")throw new Error("string expected");return new Uint8Array(new TextEncoder().encode(e))}function b5(e){return new TextDecoder().decode(e)}function Kp(e){return typeof e=="string"&&(e=km(e)),ju(e),e}function P5(e){return typeof e=="string"&&(e=km(e)),ju(e),e}function N5(...e){let n=0;for(let i=0;i<e.length;i++){let r=e[i];ju(r),n+=r.length}let t=new Uint8Array(n);for(let i=0,r=0;i<e.length;i++){let o=e[i];t.set(o,r),r+=o.length}return t}function v5(e,n){if(n!==void 0&&{}.toString.call(n)!=="[object Object]")throw new Error("options should be object or undefined");return Object.assign(e,n)}var Cm=class{};un.Hash=Cm;function yx(e){let n=i=>e().update(Kp(i)).digest(),t=e();return n.outputLen=t.outputLen,n.blockLen=t.blockLen,n.create=()=>e(),n}function Bx(e){let n=(i,r)=>e(r).update(Kp(i)).digest(),t=e({});return n.outputLen=t.outputLen,n.blockLen=t.blockLen,n.create=i=>e(i),n}function mx(e){let n=(i,r)=>e(r).update(Kp(i)).digest(),t=e({});return n.outputLen=t.outputLen,n.blockLen=t.blockLen,n.create=i=>e(i),n}un.wrapConstructor=yx;un.wrapConstructorWithOpts=Bx;un.wrapXOFConstructorWithOpts=mx;function O5(e=32){if($u.crypto&&typeof $u.crypto.getRandomValues=="function")return $u.crypto.getRandomValues(new Uint8Array(e));if($u.crypto&&typeof $u.crypto.randomBytes=="function")return Uint8Array.from($u.crypto.randomBytes(e));throw new Error("crypto.getRandomValues must be defined")}});var Em=I(eu=>{"use strict";Object.defineProperty(eu,"__esModule",{value:!0});eu.hmac=eu.HMAC=void 0;var jc=oa(),rl=class extends jc.Hash{constructor(n,t){super(),this.finished=!1,this.destroyed=!1,(0,jc.ahash)(n);let i=(0,jc.toBytes)(t);if(this.iHash=n.create(),typeof this.iHash.update!="function")throw new Error("Expected instance of class which extends utils.Hash");this.blockLen=this.iHash.blockLen,this.outputLen=this.iHash.outputLen;let r=this.blockLen,o=new Uint8Array(r);o.set(i.length>r?n.create().update(i).digest():i);for(let a=0;a<o.length;a++)o[a]^=54;this.iHash.update(o),this.oHash=n.create();for(let a=0;a<o.length;a++)o[a]^=106;this.oHash.update(o),(0,jc.clean)(o)}update(n){return(0,jc.aexists)(this),this.iHash.update(n),this}digestInto(n){(0,jc.aexists)(this),(0,jc.abytes)(n,this.outputLen),this.finished=!0,this.iHash.digestInto(n),this.oHash.update(n),this.oHash.digestInto(n),this.destroy()}digest(){let n=new Uint8Array(this.oHash.outputLen);return this.digestInto(n),n}_cloneInto(n){n||(n=Object.create(Object.getPrototypeOf(this),{}));let{oHash:t,iHash:i,finished:r,destroyed:o,blockLen:a,outputLen:s}=this;return n=n,n.finished=r,n.destroyed=o,n.blockLen=a,n.outputLen=s,n.oHash=t._cloneInto(n.oHash),n.iHash=i._cloneInto(n.iHash),n}clone(){return this._cloneInto()}destroy(){this.destroyed=!0,this.oHash.destroy(),this.iHash.destroy()}};eu.HMAC=rl;var D5=(e,n,t)=>new rl(e,n).update(t).digest();eu.hmac=D5;eu.hmac.create=(e,n)=>new rl(e,n)});var kx=I(Lp=>{"use strict";Object.defineProperty(Lp,"__esModule",{value:!0});Lp.pbkdf2=T5;Lp.pbkdf2Async=x5;var U5=Em(),$a=oa();function Cx(e,n,t,i){(0,$a.ahash)(e);let r=(0,$a.checkOpts)({dkLen:32,asyncTick:10},i),{c:o,dkLen:a,asyncTick:s}=r;if((0,$a.anumber)(o),(0,$a.anumber)(a),(0,$a.anumber)(s),o<1)throw new Error("iterations (c) should be >= 1");let d=(0,$a.kdfInputToBytes)(n),u=(0,$a.kdfInputToBytes)(t),f=new Uint8Array(a),p=U5.hmac.create(e,d),l=p._cloneInto().update(u);return{c:o,dkLen:a,asyncTick:s,DK:f,PRF:p,PRFSalt:l}}function Sx(e,n,t,i,r){return e.destroy(),n.destroy(),i&&i.destroy(),(0,$a.clean)(r),t}function T5(e,n,t,i){let{c:r,dkLen:o,DK:a,PRF:s,PRFSalt:d}=Cx(e,n,t,i),u,f=new Uint8Array(4),p=(0,$a.createView)(f),l=new Uint8Array(s.outputLen);for(let h=1,B=0;B<o;h++,B+=s.outputLen){let C=a.subarray(B,B+s.outputLen);p.setInt32(0,h,!1),(u=d._cloneInto(u)).update(f).digestInto(l),C.set(l.subarray(0,C.length));for(let E=1;E<r;E++){s._cloneInto(u).update(l).digestInto(l);for(let S=0;S<C.length;S++)C[S]^=l[S]}}return Sx(s,d,a,u,l)}async function x5(e,n,t,i){let{c:r,dkLen:o,asyncTick:a,DK:s,PRF:d,PRFSalt:u}=Cx(e,n,t,i),f,p=new Uint8Array(4),l=(0,$a.createView)(p),h=new Uint8Array(d.outputLen);for(let B=1,C=0;C<o;B++,C+=d.outputLen){let E=s.subarray(C,C+d.outputLen);l.setInt32(0,B,!1),(f=u._cloneInto(f)).update(p).digestInto(h),E.set(h.subarray(0,E.length)),await(0,$a.asyncLoop)(r-1,a,()=>{d._cloneInto(f).update(h).digestInto(h);for(let S=0;S<E.length;S++)E[S]^=h[S]})}return Sx(d,u,s,f,h)}});var wm=I(po=>{"use strict";Object.defineProperty(po,"__esModule",{value:!0});po.SHA512_IV=po.SHA384_IV=po.SHA224_IV=po.SHA256_IV=po.HashMD=void 0;po.setBigUint64=Ex;po.Chi=J5;po.Maj=q5;var vs=oa();function Ex(e,n,t,i){if(typeof e.setBigUint64=="function")return e.setBigUint64(n,t,i);let r=BigInt(32),o=BigInt(4294967295),a=Number(t>>r&o),s=Number(t&o),d=i?4:0,u=i?0:4;e.setUint32(n+d,a,i),e.setUint32(n+u,s,i)}function J5(e,n,t){return e&n^~e&t}function q5(e,n,t){return e&n^e&t^n&t}var Qm=class extends vs.Hash{constructor(n,t,i,r){super(),this.finished=!1,this.length=0,this.pos=0,this.destroyed=!1,this.blockLen=n,this.outputLen=t,this.padOffset=i,this.isLE=r,this.buffer=new Uint8Array(n),this.view=(0,vs.createView)(this.buffer)}update(n){(0,vs.aexists)(this),n=(0,vs.toBytes)(n),(0,vs.abytes)(n);let{view:t,buffer:i,blockLen:r}=this,o=n.length;for(let a=0;a<o;){let s=Math.min(r-this.pos,o-a);if(s===r){let d=(0,vs.createView)(n);for(;r<=o-a;a+=r)this.process(d,a);continue}i.set(n.subarray(a,a+s),this.pos),this.pos+=s,a+=s,this.pos===r&&(this.process(t,0),this.pos=0)}return this.length+=n.length,this.roundClean(),this}digestInto(n){(0,vs.aexists)(this),(0,vs.aoutput)(n,this),this.finished=!0;let{buffer:t,view:i,blockLen:r,isLE:o}=this,{pos:a}=this;t[a++]=128,(0,vs.clean)(this.buffer.subarray(a)),this.padOffset>r-a&&(this.process(i,0),a=0);for(let p=a;p<r;p++)t[p]=0;Ex(i,r-8,BigInt(this.length*8),o),this.process(i,0);let s=(0,vs.createView)(n),d=this.outputLen;if(d%4)throw new Error("_sha2: outputLen should be aligned to 32bit");let u=d/4,f=this.get();if(u>f.length)throw new Error("_sha2: outputLen bigger than state");for(let p=0;p<u;p++)s.setUint32(4*p,f[p],o)}digest(){let{buffer:n,outputLen:t}=this;this.digestInto(n);let i=n.slice(0,t);return this.destroy(),i}_cloneInto(n){n||(n=new this.constructor),n.set(...this.get());let{blockLen:t,buffer:i,length:r,finished:o,destroyed:a,pos:s}=this;return n.destroyed=a,n.finished=o,n.length=r,n.pos=s,r%t&&n.buffer.set(i),n}clone(){return this._cloneInto()}};po.HashMD=Qm;po.SHA256_IV=Uint32Array.from([1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225]);po.SHA224_IV=Uint32Array.from([3238371032,914150663,812702999,4144912697,4290775857,1750603025,1694076839,3204075428]);po.SHA384_IV=Uint32Array.from([3418070365,3238371032,1654270250,914150663,2438529370,812702999,355462360,4144912697,1731405415,4290775857,2394180231,1750603025,3675008525,1694076839,1203062813,3204075428]);po.SHA512_IV=Uint32Array.from([1779033703,4089235720,3144134277,2227873595,1013904242,4271175723,2773480762,1595750129,1359893119,2917565137,2600822924,725511199,528734635,4215389547,1541459225,327033209])});var Pm=I(Rn=>{"use strict";Object.defineProperty(Rn,"__esModule",{value:!0});Rn.toBig=Rn.shrSL=Rn.shrSH=Rn.rotrSL=Rn.rotrSH=Rn.rotrBL=Rn.rotrBH=Rn.rotr32L=Rn.rotr32H=Rn.rotlSL=Rn.rotlSH=Rn.rotlBL=Rn.rotlBH=Rn.add5L=Rn.add5H=Rn.add4L=Rn.add4H=Rn.add3L=Rn.add3H=void 0;Rn.add=Fx;Rn.fromBig=bm;Rn.split=Qx;var Yp=BigInt(2**32-1),Rm=BigInt(32);function bm(e,n=!1){return n?{h:Number(e&Yp),l:Number(e>>Rm&Yp)}:{h:Number(e>>Rm&Yp)|0,l:Number(e&Yp)|0}}function Qx(e,n=!1){let t=e.length,i=new Uint32Array(t),r=new Uint32Array(t);for(let o=0;o<t;o++){let{h:a,l:s}=bm(e[o],n);[i[o],r[o]]=[a,s]}return[i,r]}var wx=(e,n)=>BigInt(e>>>0)<<Rm|BigInt(n>>>0);Rn.toBig=wx;var Rx=(e,n,t)=>e>>>t;Rn.shrSH=Rx;var bx=(e,n,t)=>e<<32-t|n>>>t;Rn.shrSL=bx;var Px=(e,n,t)=>e>>>t|n<<32-t;Rn.rotrSH=Px;var Nx=(e,n,t)=>e<<32-t|n>>>t;Rn.rotrSL=Nx;var vx=(e,n,t)=>e<<64-t|n>>>t-32;Rn.rotrBH=vx;var Ox=(e,n,t)=>e>>>t-32|n<<64-t;Rn.rotrBL=Ox;var Dx=(e,n)=>n;Rn.rotr32H=Dx;var Ux=(e,n)=>e;Rn.rotr32L=Ux;var Tx=(e,n,t)=>e<<t|n>>>32-t;Rn.rotlSH=Tx;var xx=(e,n,t)=>n<<t|e>>>32-t;Rn.rotlSL=xx;var Jx=(e,n,t)=>n<<t-32|e>>>64-t;Rn.rotlBH=Jx;var qx=(e,n,t)=>e<<t-32|n>>>64-t;Rn.rotlBL=qx;function Fx(e,n,t,i){let r=(n>>>0)+(i>>>0);return{h:e+t+(r/2**32|0)|0,l:r|0}}var Mx=(e,n,t)=>(e>>>0)+(n>>>0)+(t>>>0);Rn.add3L=Mx;var Hx=(e,n,t,i)=>n+t+i+(e/2**32|0)|0;Rn.add3H=Hx;var _x=(e,n,t,i)=>(e>>>0)+(n>>>0)+(t>>>0)+(i>>>0);Rn.add4L=_x;var Gx=(e,n,t,i,r)=>n+t+i+r+(e/2**32|0)|0;Rn.add4H=Gx;var Vx=(e,n,t,i,r)=>(e>>>0)+(n>>>0)+(t>>>0)+(i>>>0)+(r>>>0);Rn.add5L=Vx;var Wx=(e,n,t,i,r,o)=>n+t+i+r+o+(e/2**32|0)|0;Rn.add5H=Wx;var F5={fromBig:bm,split:Qx,toBig:wx,shrSH:Rx,shrSL:bx,rotrSH:Px,rotrSL:Nx,rotrBH:vx,rotrBL:Ox,rotr32H:Dx,rotr32L:Ux,rotlSH:Tx,rotlSL:xx,rotlBH:Jx,rotlBL:qx,add:Fx,add3L:Mx,add3H:Hx,add4L:_x,add4H:Gx,add5H:Wx,add5L:Vx};Rn.default=F5});var ol=I(tr=>{"use strict";Object.defineProperty(tr,"__esModule",{value:!0});tr.sha512_224=tr.sha512_256=tr.sha384=tr.sha512=tr.sha224=tr.sha256=tr.SHA512_256=tr.SHA512_224=tr.SHA384=tr.SHA512=tr.SHA224=tr.SHA256=void 0;var dn=wm(),Kn=Pm(),li=oa(),M5=Uint32Array.from([1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298]),cc=new Uint32Array(64),il=class extends dn.HashMD{constructor(n=32){super(64,n,8,!1),this.A=dn.SHA256_IV[0]|0,this.B=dn.SHA256_IV[1]|0,this.C=dn.SHA256_IV[2]|0,this.D=dn.SHA256_IV[3]|0,this.E=dn.SHA256_IV[4]|0,this.F=dn.SHA256_IV[5]|0,this.G=dn.SHA256_IV[6]|0,this.H=dn.SHA256_IV[7]|0}get(){let{A:n,B:t,C:i,D:r,E:o,F:a,G:s,H:d}=this;return[n,t,i,r,o,a,s,d]}set(n,t,i,r,o,a,s,d){this.A=n|0,this.B=t|0,this.C=i|0,this.D=r|0,this.E=o|0,this.F=a|0,this.G=s|0,this.H=d|0}process(n,t){for(let p=0;p<16;p++,t+=4)cc[p]=n.getUint32(t,!1);for(let p=16;p<64;p++){let l=cc[p-15],h=cc[p-2],B=(0,li.rotr)(l,7)^(0,li.rotr)(l,18)^l>>>3,C=(0,li.rotr)(h,17)^(0,li.rotr)(h,19)^h>>>10;cc[p]=C+cc[p-7]+B+cc[p-16]|0}let{A:i,B:r,C:o,D:a,E:s,F:d,G:u,H:f}=this;for(let p=0;p<64;p++){let l=(0,li.rotr)(s,6)^(0,li.rotr)(s,11)^(0,li.rotr)(s,25),h=f+l+(0,dn.Chi)(s,d,u)+M5[p]+cc[p]|0,C=((0,li.rotr)(i,2)^(0,li.rotr)(i,13)^(0,li.rotr)(i,22))+(0,dn.Maj)(i,r,o)|0;f=u,u=d,d=s,s=a+h|0,a=o,o=r,r=i,i=h+C|0}i=i+this.A|0,r=r+this.B|0,o=o+this.C|0,a=a+this.D|0,s=s+this.E|0,d=d+this.F|0,u=u+this.G|0,f=f+this.H|0,this.set(i,r,o,a,s,d,u,f)}roundClean(){(0,li.clean)(cc)}destroy(){this.set(0,0,0,0,0,0,0,0),(0,li.clean)(this.buffer)}};tr.SHA256=il;var zp=class extends il{constructor(){super(28),this.A=dn.SHA224_IV[0]|0,this.B=dn.SHA224_IV[1]|0,this.C=dn.SHA224_IV[2]|0,this.D=dn.SHA224_IV[3]|0,this.E=dn.SHA224_IV[4]|0,this.F=dn.SHA224_IV[5]|0,this.G=dn.SHA224_IV[6]|0,this.H=dn.SHA224_IV[7]|0}};tr.SHA224=zp;var Kx=Kn.split(["0x428a2f98d728ae22","0x7137449123ef65cd","0xb5c0fbcfec4d3b2f","0xe9b5dba58189dbbc","0x3956c25bf348b538","0x59f111f1b605d019","0x923f82a4af194f9b","0xab1c5ed5da6d8118","0xd807aa98a3030242","0x12835b0145706fbe","0x243185be4ee4b28c","0x550c7dc3d5ffb4e2","0x72be5d74f27b896f","0x80deb1fe3b1696b1","0x9bdc06a725c71235","0xc19bf174cf692694","0xe49b69c19ef14ad2","0xefbe4786384f25e3","0x0fc19dc68b8cd5b5","0x240ca1cc77ac9c65","0x2de92c6f592b0275","0x4a7484aa6ea6e483","0x5cb0a9dcbd41fbd4","0x76f988da831153b5","0x983e5152ee66dfab","0xa831c66d2db43210","0xb00327c898fb213f","0xbf597fc7beef0ee4","0xc6e00bf33da88fc2","0xd5a79147930aa725","0x06ca6351e003826f","0x142929670a0e6e70","0x27b70a8546d22ffc","0x2e1b21385c26c926","0x4d2c6dfc5ac42aed","0x53380d139d95b3df","0x650a73548baf63de","0x766a0abb3c77b2a8","0x81c2c92e47edaee6","0x92722c851482353b","0xa2bfe8a14cf10364","0xa81a664bbc423001","0xc24b8b70d0f89791","0xc76c51a30654be30","0xd192e819d6ef5218","0xd69906245565a910","0xf40e35855771202a","0x106aa07032bbd1b8","0x19a4c116b8d2d0c8","0x1e376c085141ab53","0x2748774cdf8eeb99","0x34b0bcb5e19b48a8","0x391c0cb3c5c95a63","0x4ed8aa4ae3418acb","0x5b9cca4f7763e373","0x682e6ff3d6b2b8a3","0x748f82ee5defb2fc","0x78a5636f43172f60","0x84c87814a1f0ab72","0x8cc702081a6439ec","0x90befffa23631e28","0xa4506cebde82bde9","0xbef9a3f7b2c67915","0xc67178f2e372532b","0xca273eceea26619c","0xd186b8c721c0c207","0xeada7dd6cde0eb1e","0xf57d4f7fee6ed178","0x06f067aa72176fba","0x0a637dc5a2c898a6","0x113f9804bef90dae","0x1b710b35131c471b","0x28db77f523047d84","0x32caab7b40c72493","0x3c9ebe0a15c9bebc","0x431d67c49c100d4c","0x4cc5d4becb3e42b6","0x597f299cfc657e2a","0x5fcb6fab3ad6faec","0x6c44198c4a475817"].map(e=>BigInt(e))),H5=Kx[0],_5=Kx[1],uc=new Uint32Array(80),Ac=new Uint32Array(80),nu=class extends dn.HashMD{constructor(n=64){super(128,n,16,!1),this.Ah=dn.SHA512_IV[0]|0,this.Al=dn.SHA512_IV[1]|0,this.Bh=dn.SHA512_IV[2]|0,this.Bl=dn.SHA512_IV[3]|0,this.Ch=dn.SHA512_IV[4]|0,this.Cl=dn.SHA512_IV[5]|0,this.Dh=dn.SHA512_IV[6]|0,this.Dl=dn.SHA512_IV[7]|0,this.Eh=dn.SHA512_IV[8]|0,this.El=dn.SHA512_IV[9]|0,this.Fh=dn.SHA512_IV[10]|0,this.Fl=dn.SHA512_IV[11]|0,this.Gh=dn.SHA512_IV[12]|0,this.Gl=dn.SHA512_IV[13]|0,this.Hh=dn.SHA512_IV[14]|0,this.Hl=dn.SHA512_IV[15]|0}get(){let{Ah:n,Al:t,Bh:i,Bl:r,Ch:o,Cl:a,Dh:s,Dl:d,Eh:u,El:f,Fh:p,Fl:l,Gh:h,Gl:B,Hh:C,Hl:E}=this;return[n,t,i,r,o,a,s,d,u,f,p,l,h,B,C,E]}set(n,t,i,r,o,a,s,d,u,f,p,l,h,B,C,E){this.Ah=n|0,this.Al=t|0,this.Bh=i|0,this.Bl=r|0,this.Ch=o|0,this.Cl=a|0,this.Dh=s|0,this.Dl=d|0,this.Eh=u|0,this.El=f|0,this.Fh=p|0,this.Fl=l|0,this.Gh=h|0,this.Gl=B|0,this.Hh=C|0,this.Hl=E|0}process(n,t){for(let b=0;b<16;b++,t+=4)uc[b]=n.getUint32(t),Ac[b]=n.getUint32(t+=4);for(let b=16;b<80;b++){let V=uc[b-15]|0,pe=Ac[b-15]|0,we=Kn.rotrSH(V,pe,1)^Kn.rotrSH(V,pe,8)^Kn.shrSH(V,pe,7),Ye=Kn.rotrSL(V,pe,1)^Kn.rotrSL(V,pe,8)^Kn.shrSL(V,pe,7),He=uc[b-2]|0,D=Ac[b-2]|0,oe=Kn.rotrSH(He,D,19)^Kn.rotrBH(He,D,61)^Kn.shrSH(He,D,6),Ce=Kn.rotrSL(He,D,19)^Kn.rotrBL(He,D,61)^Kn.shrSL(He,D,6),fe=Kn.add4L(Ye,Ce,Ac[b-7],Ac[b-16]),Q=Kn.add4H(fe,we,oe,uc[b-7],uc[b-16]);uc[b]=Q|0,Ac[b]=fe|0}let{Ah:i,Al:r,Bh:o,Bl:a,Ch:s,Cl:d,Dh:u,Dl:f,Eh:p,El:l,Fh:h,Fl:B,Gh:C,Gl:E,Hh:S,Hl:N}=this;for(let b=0;b<80;b++){let V=Kn.rotrSH(p,l,14)^Kn.rotrSH(p,l,18)^Kn.rotrBH(p,l,41),pe=Kn.rotrSL(p,l,14)^Kn.rotrSL(p,l,18)^Kn.rotrBL(p,l,41),we=p&h^~p&C,Ye=l&B^~l&E,He=Kn.add5L(N,pe,Ye,_5[b],Ac[b]),D=Kn.add5H(He,S,V,we,H5[b],uc[b]),oe=He|0,Ce=Kn.rotrSH(i,r,28)^Kn.rotrBH(i,r,34)^Kn.rotrBH(i,r,39),fe=Kn.rotrSL(i,r,28)^Kn.rotrBL(i,r,34)^Kn.rotrBL(i,r,39),Q=i&o^i&s^o&s,w=r&a^r&d^a&d;S=C|0,N=E|0,C=h|0,E=B|0,h=p|0,B=l|0,{h:p,l}=Kn.add(u|0,f|0,D|0,oe|0),u=s|0,f=d|0,s=o|0,d=a|0,o=i|0,a=r|0;let P=Kn.add3L(oe,fe,w);i=Kn.add3H(P,D,Ce,Q),r=P|0}({h:i,l:r}=Kn.add(this.Ah|0,this.Al|0,i|0,r|0)),{h:o,l:a}=Kn.add(this.Bh|0,this.Bl|0,o|0,a|0),{h:s,l:d}=Kn.add(this.Ch|0,this.Cl|0,s|0,d|0),{h:u,l:f}=Kn.add(this.Dh|0,this.Dl|0,u|0,f|0),{h:p,l}=Kn.add(this.Eh|0,this.El|0,p|0,l|0),{h,l:B}=Kn.add(this.Fh|0,this.Fl|0,h|0,B|0),{h:C,l:E}=Kn.add(this.Gh|0,this.Gl|0,C|0,E|0),{h:S,l:N}=Kn.add(this.Hh|0,this.Hl|0,S|0,N|0),this.set(i,r,o,a,s,d,u,f,p,l,h,B,C,E,S,N)}roundClean(){(0,li.clean)(uc,Ac)}destroy(){(0,li.clean)(this.buffer),this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0)}};tr.SHA512=nu;var Zp=class extends nu{constructor(){super(48),this.Ah=dn.SHA384_IV[0]|0,this.Al=dn.SHA384_IV[1]|0,this.Bh=dn.SHA384_IV[2]|0,this.Bl=dn.SHA384_IV[3]|0,this.Ch=dn.SHA384_IV[4]|0,this.Cl=dn.SHA384_IV[5]|0,this.Dh=dn.SHA384_IV[6]|0,this.Dl=dn.SHA384_IV[7]|0,this.Eh=dn.SHA384_IV[8]|0,this.El=dn.SHA384_IV[9]|0,this.Fh=dn.SHA384_IV[10]|0,this.Fl=dn.SHA384_IV[11]|0,this.Gh=dn.SHA384_IV[12]|0,this.Gl=dn.SHA384_IV[13]|0,this.Hh=dn.SHA384_IV[14]|0,this.Hl=dn.SHA384_IV[15]|0}};tr.SHA384=Zp;var Zi=Uint32Array.from([2352822216,424955298,1944164710,2312950998,502970286,855612546,1738396948,1479516111,258812777,2077511080,2011393907,79989058,1067287976,1780299464,286451373,2446758561]),Xi=Uint32Array.from([573645204,4230739756,2673172387,3360449730,596883563,1867755857,2520282905,1497426621,2519219938,2827943907,3193839141,1401305490,721525244,746961066,246885852,2177182882]),Xp=class extends nu{constructor(){super(28),this.Ah=Zi[0]|0,this.Al=Zi[1]|0,this.Bh=Zi[2]|0,this.Bl=Zi[3]|0,this.Ch=Zi[4]|0,this.Cl=Zi[5]|0,this.Dh=Zi[6]|0,this.Dl=Zi[7]|0,this.Eh=Zi[8]|0,this.El=Zi[9]|0,this.Fh=Zi[10]|0,this.Fl=Zi[11]|0,this.Gh=Zi[12]|0,this.Gl=Zi[13]|0,this.Hh=Zi[14]|0,this.Hl=Zi[15]|0}};tr.SHA512_224=Xp;var $p=class extends nu{constructor(){super(32),this.Ah=Xi[0]|0,this.Al=Xi[1]|0,this.Bh=Xi[2]|0,this.Bl=Xi[3]|0,this.Ch=Xi[4]|0,this.Cl=Xi[5]|0,this.Dh=Xi[6]|0,this.Dl=Xi[7]|0,this.Eh=Xi[8]|0,this.El=Xi[9]|0,this.Fh=Xi[10]|0,this.Fl=Xi[11]|0,this.Gh=Xi[12]|0,this.Gl=Xi[13]|0,this.Hh=Xi[14]|0,this.Hl=Xi[15]|0}};tr.SHA512_256=$p;tr.sha256=(0,li.createHasher)(()=>new il);tr.sha224=(0,li.createHasher)(()=>new zp);tr.sha512=(0,li.createHasher)(()=>new nu);tr.sha384=(0,li.createHasher)(()=>new Zp);tr.sha512_256=(0,li.createHasher)(()=>new $p);tr.sha512_224=(0,li.createHasher)(()=>new Xp)});var aJ=I(qe=>{"use strict";Object.defineProperty(qe,"__esModule",{value:!0});qe.bytes=qe.stringToBytes=qe.str=qe.bytesToString=qe.hex=qe.utf8=qe.bech32m=qe.bech32=qe.base58check=qe.createBase58check=qe.base58xmr=qe.base58xrp=qe.base58flickr=qe.base58=qe.base64urlnopad=qe.base64url=qe.base64nopad=qe.base64=qe.base32crockford=qe.base32hexnopad=qe.base32hex=qe.base32nopad=qe.base32=qe.base16=qe.utils=void 0;function tu(e){return e instanceof Uint8Array||ArrayBuffer.isView(e)&&e.constructor.name==="Uint8Array"}function Om(e,...n){if(!tu(e))throw new Error("Uint8Array expected");if(n.length>0&&!n.includes(e.length))throw new Error("Uint8Array expected of length "+n+", got length="+e.length)}function Xx(e,n){return Array.isArray(n)?n.length===0?!0:e?n.every(t=>typeof t=="string"):n.every(t=>Number.isSafeInteger(t)):!1}function Dm(e){if(typeof e!="function")throw new Error("function expected");return!0}function fc(e,n){if(typeof n!="string")throw new Error(`${e}: string expected`);return!0}function eA(e){if(!Number.isSafeInteger(e))throw new Error(`invalid integer: ${e}`)}function eI(e){if(!Array.isArray(e))throw new Error("array expected")}function nI(e,n){if(!Xx(!0,n))throw new Error(`${e}: array of strings expected`)}function Um(e,n){if(!Xx(!1,n))throw new Error(`${e}: array of numbers expected`)}function Io(...e){let n=o=>o,t=(o,a)=>s=>o(a(s)),i=e.map(o=>o.encode).reduceRight(t,n),r=e.map(o=>o.decode).reduce(t,n);return{encode:i,decode:r}}function xo(e){let n=typeof e=="string"?e.split(""):e,t=n.length;nI("alphabet",n);let i=new Map(n.map((r,o)=>[r,o]));return{encode:r=>(eI(r),r.map(o=>{if(!Number.isSafeInteger(o)||o<0||o>=t)throw new Error(`alphabet.encode: digit index outside alphabet "${o}". Allowed: ${e}`);return n[o]})),decode:r=>(eI(r),r.map(o=>{fc("alphabet.decode",o);let a=i.get(o);if(a===void 0)throw new Error(`Unknown letter: "${o}". Allowed: ${e}`);return a}))}}function Jo(e=""){return fc("join",e),{encode:n=>(nI("join.decode",n),n.join(e)),decode:n=>(fc("join.decode",n),n.split(e))}}function sl(e,n="="){return eA(e),fc("padding",n),{encode(t){for(nI("padding.encode",t);t.length*e%8;)t.push(n);return t},decode(t){nI("padding.decode",t);let i=t.length;if(i*e%8)throw new Error("padding: invalid, string should have whole number of bytes");for(;i>0&&t[i-1]===n;i--)if((i-1)*e%8===0)throw new Error("padding: invalid, string has too much padding");return t.slice(0,i)}}}function $x(e){return Dm(e),{encode:n=>n,decode:n=>e(n)}}function Nm(e,n,t){if(n<2)throw new Error(`convertRadix: invalid from=${n}, base cannot be less than 2`);if(t<2)throw new Error(`convertRadix: invalid to=${t}, base cannot be less than 2`);if(eI(e),!e.length)return[];let i=0,r=[],o=Array.from(e,s=>{if(eA(s),s<0||s>=n)throw new Error(`invalid integer: ${s}`);return s}),a=o.length;for(;;){let s=0,d=!0;for(let u=i;u<a;u++){let f=o[u],p=n*s,l=p+f;if(!Number.isSafeInteger(l)||p/n!==s||l-f!==p)throw new Error("convertRadix: carry overflow");let h=l/t;s=l%t;let B=Math.floor(h);if(o[u]=B,!Number.isSafeInteger(B)||B*t+s!==l)throw new Error("convertRadix: carry overflow");if(d)B?d=!1:i=u;else continue}if(r.push(s),d)break}for(let s=0;s<e.length-1&&e[s]===0;s++)r.push(0);return r.reverse()}var jx=(e,n)=>n===0?e:jx(n,e%n),tI=(e,n)=>e+(n-jx(e,n)),jp=(()=>{let e=[];for(let n=0;n<40;n++)e.push(2**n);return e})();function rI(e,n,t,i){if(eI(e),n<=0||n>32)throw new Error(`convertRadix2: wrong from=${n}`);if(t<=0||t>32)throw new Error(`convertRadix2: wrong to=${t}`);if(tI(n,t)>32)throw new Error(`convertRadix2: carry overflow from=${n} to=${t} carryBits=${tI(n,t)}`);let r=0,o=0,a=jp[n],s=jp[t]-1,d=[];for(let u of e){if(eA(u),u>=a)throw new Error(`convertRadix2: invalid data word=${u} from=${n}`);if(r=r<<n|u,o+n>32)throw new Error(`convertRadix2: carry overflow pos=${o} from=${n}`);for(o+=n;o>=t;o-=t)d.push((r>>o-t&s)>>>0);let f=jp[o];if(f===void 0)throw new Error("invalid carry");r&=f-1}if(r=r<<t-o&s,!i&&o>=n)throw new Error("Excess padding");if(!i&&r>0)throw new Error(`Non-zero padding: ${r}`);return i&&o>0&&d.push(r>>>0),d}function eJ(e){eA(e);let n=2**8;return{encode:t=>{if(!tu(t))throw new Error("radix.encode input should be Uint8Array");return Nm(Array.from(t),n,e)},decode:t=>(Um("radix.decode",t),Uint8Array.from(Nm(t,e,n)))}}function aa(e,n=!1){if(eA(e),e<=0||e>32)throw new Error("radix2: bits should be in (0..32]");if(tI(8,e)>32||tI(e,8)>32)throw new Error("radix2: carry overflow");return{encode:t=>{if(!tu(t))throw new Error("radix2.encode input should be Uint8Array");return rI(Array.from(t),8,e,!n)},decode:t=>(Um("radix2.decode",t),Uint8Array.from(rI(t,e,8,n)))}}function Lx(e){return Dm(e),function(...n){try{return e.apply(null,n)}catch{}}}function nJ(e,n){return eA(e),Dm(n),{encode(t){if(!tu(t))throw new Error("checksum.encode: input should be Uint8Array");let i=n(t).slice(0,e),r=new Uint8Array(t.length+e);return r.set(t),r.set(i,t.length),r},decode(t){if(!tu(t))throw new Error("checksum.decode: input should be Uint8Array");let i=t.slice(0,-e),r=t.slice(-e),o=n(i).slice(0,e);for(let a=0;a<e;a++)if(o[a]!==r[a])throw new Error("Invalid checksum");return i}}}qe.utils={alphabet:xo,chain:Io,checksum:nJ,convertRadix:Nm,convertRadix2:rI,radix:eJ,radix2:aa,join:Jo,padding:sl};qe.base16=Io(aa(4),xo("0123456789ABCDEF"),Jo(""));qe.base32=Io(aa(5),xo("ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"),sl(5),Jo(""));qe.base32nopad=Io(aa(5),xo("ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"),Jo(""));qe.base32hex=Io(aa(5),xo("0123456789ABCDEFGHIJKLMNOPQRSTUV"),sl(5),Jo(""));qe.base32hexnopad=Io(aa(5),xo("0123456789ABCDEFGHIJKLMNOPQRSTUV"),Jo(""));qe.base32crockford=Io(aa(5),xo("0123456789ABCDEFGHJKMNPQRSTVWXYZ"),Jo(""),$x(e=>e.toUpperCase().replace(/O/g,"0").replace(/[IL]/g,"1")));var tJ=typeof Uint8Array.from([]).toBase64=="function"&&typeof Uint8Array.fromBase64=="function",rJ=(e,n)=>{fc("base64",e);let t=n?/^[A-Za-z0-9=_-]+$/:/^[A-Za-z0-9=+/]+$/,i=n?"base64url":"base64";if(e.length>0&&!t.test(e))throw new Error("invalid base64");return Uint8Array.fromBase64(e,{alphabet:i,lastChunkHandling:"strict"})};qe.base64=tJ?{encode(e){return Om(e),e.toBase64()},decode(e){return rJ(e,!1)}}:Io(aa(6),xo("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"),sl(6),Jo(""));qe.base64nopad=Io(aa(6),xo("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"),Jo(""));qe.base64url=tJ?{encode(e){return Om(e),e.toBase64({alphabet:"base64url"})},decode(e){return rJ(e,!0)}}:Io(aa(6),xo("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"),sl(6),Jo(""));qe.base64urlnopad=Io(aa(6),xo("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"),Jo(""));var Tm=e=>Io(eJ(58),xo(e),Jo(""));qe.base58=Tm("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz");qe.base58flickr=Tm("123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ");qe.base58xrp=Tm("rpshnaf39wBUDNEGHJKLM4PQRST7VWXYZ2bcdeCg65jkm8oFqi1tuvAxyz");var Yx=[0,2,3,5,6,7,9,10,11];qe.base58xmr={encode(e){let n="";for(let t=0;t<e.length;t+=8){let i=e.subarray(t,t+8);n+=qe.base58.encode(i).padStart(Yx[i.length],"1")}return n},decode(e){let n=[];for(let t=0;t<e.length;t+=11){let i=e.slice(t,t+11),r=Yx.indexOf(i.length),o=qe.base58.decode(i);for(let a=0;a<o.length-r;a++)if(o[a]!==0)throw new Error("base58xmr: wrong padding");n=n.concat(Array.from(o.slice(o.length-r)))}return Uint8Array.from(n)}};var G5=e=>Io(nJ(4,n=>e(e(n))),qe.base58);qe.createBase58check=G5;qe.base58check=qe.createBase58check;var vm=Io(xo("qpzry9x8gf2tvdw0s3jn54khce6mua7l"),Jo("")),zx=[996825010,642813549,513874426,1027748829,705979059];function al(e){let n=e>>25,t=(e&33554431)<<5;for(let i=0;i<zx.length;i++)(n>>i&1)===1&&(t^=zx[i]);return t}function Zx(e,n,t=1){let i=e.length,r=1;for(let o=0;o<i;o++){let a=e.charCodeAt(o);if(a<33||a>126)throw new Error(`Invalid prefix (${e})`);r=al(r)^a>>5}r=al(r);for(let o=0;o<i;o++)r=al(r)^e.charCodeAt(o)&31;for(let o of n)r=al(r)^o;for(let o=0;o<6;o++)r=al(r);return r^=t,vm.encode(rI([r%jp[30]],30,5,!1))}function iJ(e){let n=e==="bech32"?1:734539939,t=aa(5),i=t.decode,r=t.encode,o=Lx(i);function a(p,l,h=90){fc("bech32.encode prefix",p),tu(l)&&(l=Array.from(l)),Um("bech32.encode",l);let B=p.length;if(B===0)throw new TypeError(`Invalid prefix length ${B}`);let C=B+7+l.length;if(h!==!1&&C>h)throw new TypeError(`Length ${C} exceeds limit ${h}`);let E=p.toLowerCase(),S=Zx(E,l,n);return`${E}1${vm.encode(l)}${S}`}function s(p,l=90){fc("bech32.decode input",p);let h=p.length;if(h<8||l!==!1&&h>l)throw new TypeError(`invalid string length: ${h} (${p}). Expected (8..${l})`);let B=p.toLowerCase();if(p!==B&&p!==p.toUpperCase())throw new Error("String must be lowercase or uppercase");let C=B.lastIndexOf("1");if(C===0||C===-1)throw new Error('Letter "1" must be present between prefix and data only');let E=B.slice(0,C),S=B.slice(C+1);if(S.length<6)throw new Error("Data must be at least 6 characters long");let N=vm.decode(S).slice(0,-6),b=Zx(E,N,n);if(!S.endsWith(b))throw new Error(`Invalid checksum in ${p}: expected "${b}"`);return{prefix:E,words:N}}let d=Lx(s);function u(p){let{prefix:l,words:h}=s(p,!1);return{prefix:l,words:h,bytes:i(h)}}function f(p,l){return a(p,r(l))}return{encode:a,decode:s,encodeFromBytes:f,decodeToBytes:u,decodeUnsafe:d,fromWords:i,fromWordsUnsafe:o,toWords:r}}qe.bech32=iJ("bech32");qe.bech32m=iJ("bech32m");qe.utf8={encode:e=>new TextDecoder().decode(e),decode:e=>new TextEncoder().encode(e)};var V5=typeof Uint8Array.from([]).toHex=="function"&&typeof Uint8Array.fromHex=="function",W5={encode(e){return Om(e),e.toHex()},decode(e){return fc("hex",e),Uint8Array.fromHex(e)}};qe.hex=V5?W5:Io(aa(4),xo("0123456789abcdef"),Jo(""),$x(e=>{if(typeof e!="string"||e.length%2!==0)throw new TypeError(`hex.decode: expected string, got ${typeof e} with length ${e.length}`);return e.toLowerCase()}));var iI={utf8:qe.utf8,hex:qe.hex,base16:qe.base16,base32:qe.base32,base64:qe.base64,base64url:qe.base64url,base58:qe.base58,base58xmr:qe.base58xmr},oJ="Invalid encoding type. Available types: utf8, hex, base16, base32, base64, base64url, base58, base58xmr",K5=(e,n)=>{if(typeof e!="string"||!iI.hasOwnProperty(e))throw new TypeError(oJ);if(!tu(n))throw new TypeError("bytesToString() expects Uint8Array");return iI[e].encode(n)};qe.bytesToString=K5;qe.str=qe.bytesToString;var L5=(e,n)=>{if(!iI.hasOwnProperty(e))throw new TypeError(oJ);if(typeof n!="string")throw new TypeError("stringToBytes() expects string");return iI[e].decode(n)};qe.stringToBytes=L5;qe.bytes=qe.stringToBytes});var gJ=I(lc=>{"use strict";Object.defineProperty(lc,"__esModule",{value:!0});lc.generateMnemonic=z5;lc.mnemonicToEntropy=AJ;lc.entropyToMnemonic=fJ;lc.validateMnemonic=X5;lc.mnemonicToSeed=$5;lc.mnemonicToSeedSync=j5;var sJ=kx(),Jm=ol(),xm=oa(),oI=aJ(),Y5=e=>e[0]==="\u3042\u3044\u3053\u304F\u3057\u3093";function dJ(e){if(typeof e!="string")throw new TypeError("invalid mnemonic type: "+typeof e);return e.normalize("NFKD")}function qm(e){let n=dJ(e),t=n.split(" ");if(![12,15,18,21,24].includes(t.length))throw new Error("Invalid mnemonic");return{nfkd:n,words:t}}function cJ(e){(0,xm.abytes)(e,16,20,24,28,32)}function z5(e,n=128){if((0,xm.anumber)(n),n%32!==0||n>256)throw new TypeError("Invalid entropy");return fJ((0,xm.randomBytes)(n/8),e)}var Z5=e=>{let n=8-e.length/4;return new Uint8Array([(0,Jm.sha256)(e)[0]>>n<<n])};function uJ(e){if(!Array.isArray(e)||e.length!==2048||typeof e[0]!="string")throw new Error("Wordlist: expected array of 2048 strings");return e.forEach(n=>{if(typeof n!="string")throw new Error("wordlist: non-string element: "+n)}),oI.utils.chain(oI.utils.checksum(1,Z5),oI.utils.radix2(11,!0),oI.utils.alphabet(e))}function AJ(e,n){let{words:t}=qm(e),i=uJ(n).decode(t);return cJ(i),i}function fJ(e,n){return cJ(e),uJ(n).encode(e).join(Y5(n)?"\u3000":" ")}function X5(e,n){try{AJ(e,n)}catch{return!1}return!0}var lJ=e=>dJ("mnemonic"+e);function $5(e,n=""){return(0,sJ.pbkdf2Async)(Jm.sha512,qm(e).nfkd,lJ(n),{c:2048,dkLen:64})}function j5(e,n=""){return(0,sJ.pbkdf2)(Jm.sha512,qm(e).nfkd,lJ(n),{c:2048,dkLen:64})}});var pJ=I(aI=>{"use strict";Object.defineProperty(aI,"__esModule",{value:!0});aI.wordlist=void 0;aI.wordlist=`abandon
ability
able
about
above
absent
absorb
abstract
absurd
abuse
access
accident
account
accuse
achieve
acid
acoustic
acquire
across
act
action
actor
actress
actual
adapt
add
addict
address
adjust
admit
adult
advance
advice
aerobic
affair
afford
afraid
again
age
agent
agree
ahead
aim
air
airport
aisle
alarm
album
alcohol
alert
alien
all
alley
allow
almost
alone
alpha
already
also
alter
always
amateur
amazing
among
amount
amused
analyst
anchor
ancient
anger
angle
angry
animal
ankle
announce
annual
another
answer
antenna
antique
anxiety
any
apart
apology
appear
apple
approve
april
arch
arctic
area
arena
argue
arm
armed
armor
army
around
arrange
arrest
arrive
arrow
art
artefact
artist
artwork
ask
aspect
assault
asset
assist
assume
asthma
athlete
atom
attack
attend
attitude
attract
auction
audit
august
aunt
author
auto
autumn
average
avocado
avoid
awake
aware
away
awesome
awful
awkward
axis
baby
bachelor
bacon
badge
bag
balance
balcony
ball
bamboo
banana
banner
bar
barely
bargain
barrel
base
basic
basket
battle
beach
bean
beauty
because
become
beef
before
begin
behave
behind
believe
below
belt
bench
benefit
best
betray
better
between
beyond
bicycle
bid
bike
bind
biology
bird
birth
bitter
black
blade
blame
blanket
blast
bleak
bless
blind
blood
blossom
blouse
blue
blur
blush
board
boat
body
boil
bomb
bone
bonus
book
boost
border
boring
borrow
boss
bottom
bounce
box
boy
bracket
brain
brand
brass
brave
bread
breeze
brick
bridge
brief
bright
bring
brisk
broccoli
broken
bronze
broom
brother
brown
brush
bubble
buddy
budget
buffalo
build
bulb
bulk
bullet
bundle
bunker
burden
burger
burst
bus
business
busy
butter
buyer
buzz
cabbage
cabin
cable
cactus
cage
cake
call
calm
camera
camp
can
canal
cancel
candy
cannon
canoe
canvas
canyon
capable
capital
captain
car
carbon
card
cargo
carpet
carry
cart
case
cash
casino
castle
casual
cat
catalog
catch
category
cattle
caught
cause
caution
cave
ceiling
celery
cement
census
century
cereal
certain
chair
chalk
champion
change
chaos
chapter
charge
chase
chat
cheap
check
cheese
chef
cherry
chest
chicken
chief
child
chimney
choice
choose
chronic
chuckle
chunk
churn
cigar
cinnamon
circle
citizen
city
civil
claim
clap
clarify
claw
clay
clean
clerk
clever
click
client
cliff
climb
clinic
clip
clock
clog
close
cloth
cloud
clown
club
clump
cluster
clutch
coach
coast
coconut
code
coffee
coil
coin
collect
color
column
combine
come
comfort
comic
common
company
concert
conduct
confirm
congress
connect
consider
control
convince
cook
cool
copper
copy
coral
core
corn
correct
cost
cotton
couch
country
couple
course
cousin
cover
coyote
crack
cradle
craft
cram
crane
crash
crater
crawl
crazy
cream
credit
creek
crew
cricket
crime
crisp
critic
crop
cross
crouch
crowd
crucial
cruel
cruise
crumble
crunch
crush
cry
crystal
cube
culture
cup
cupboard
curious
current
curtain
curve
cushion
custom
cute
cycle
dad
damage
damp
dance
danger
daring
dash
daughter
dawn
day
deal
debate
debris
decade
december
decide
decline
decorate
decrease
deer
defense
define
defy
degree
delay
deliver
demand
demise
denial
dentist
deny
depart
depend
deposit
depth
deputy
derive
describe
desert
design
desk
despair
destroy
detail
detect
develop
device
devote
diagram
dial
diamond
diary
dice
diesel
diet
differ
digital
dignity
dilemma
dinner
dinosaur
direct
dirt
disagree
discover
disease
dish
dismiss
disorder
display
distance
divert
divide
divorce
dizzy
doctor
document
dog
doll
dolphin
domain
donate
donkey
donor
door
dose
double
dove
draft
dragon
drama
drastic
draw
dream
dress
drift
drill
drink
drip
drive
drop
drum
dry
duck
dumb
dune
during
dust
dutch
duty
dwarf
dynamic
eager
eagle
early
earn
earth
easily
east
easy
echo
ecology
economy
edge
edit
educate
effort
egg
eight
either
elbow
elder
electric
elegant
element
elephant
elevator
elite
else
embark
embody
embrace
emerge
emotion
employ
empower
empty
enable
enact
end
endless
endorse
enemy
energy
enforce
engage
engine
enhance
enjoy
enlist
enough
enrich
enroll
ensure
enter
entire
entry
envelope
episode
equal
equip
era
erase
erode
erosion
error
erupt
escape
essay
essence
estate
eternal
ethics
evidence
evil
evoke
evolve
exact
example
excess
exchange
excite
exclude
excuse
execute
exercise
exhaust
exhibit
exile
exist
exit
exotic
expand
expect
expire
explain
expose
express
extend
extra
eye
eyebrow
fabric
face
faculty
fade
faint
faith
fall
false
fame
family
famous
fan
fancy
fantasy
farm
fashion
fat
fatal
father
fatigue
fault
favorite
feature
february
federal
fee
feed
feel
female
fence
festival
fetch
fever
few
fiber
fiction
field
figure
file
film
filter
final
find
fine
finger
finish
fire
firm
first
fiscal
fish
fit
fitness
fix
flag
flame
flash
flat
flavor
flee
flight
flip
float
flock
floor
flower
fluid
flush
fly
foam
focus
fog
foil
fold
follow
food
foot
force
forest
forget
fork
fortune
forum
forward
fossil
foster
found
fox
fragile
frame
frequent
fresh
friend
fringe
frog
front
frost
frown
frozen
fruit
fuel
fun
funny
furnace
fury
future
gadget
gain
galaxy
gallery
game
gap
garage
garbage
garden
garlic
garment
gas
gasp
gate
gather
gauge
gaze
general
genius
genre
gentle
genuine
gesture
ghost
giant
gift
giggle
ginger
giraffe
girl
give
glad
glance
glare
glass
glide
glimpse
globe
gloom
glory
glove
glow
glue
goat
goddess
gold
good
goose
gorilla
gospel
gossip
govern
gown
grab
grace
grain
grant
grape
grass
gravity
great
green
grid
grief
grit
grocery
group
grow
grunt
guard
guess
guide
guilt
guitar
gun
gym
habit
hair
half
hammer
hamster
hand
happy
harbor
hard
harsh
harvest
hat
have
hawk
hazard
head
health
heart
heavy
hedgehog
height
hello
helmet
help
hen
hero
hidden
high
hill
hint
hip
hire
history
hobby
hockey
hold
hole
holiday
hollow
home
honey
hood
hope
horn
horror
horse
hospital
host
hotel
hour
hover
hub
huge
human
humble
humor
hundred
hungry
hunt
hurdle
hurry
hurt
husband
hybrid
ice
icon
idea
identify
idle
ignore
ill
illegal
illness
image
imitate
immense
immune
impact
impose
improve
impulse
inch
include
income
increase
index
indicate
indoor
industry
infant
inflict
inform
inhale
inherit
initial
inject
injury
inmate
inner
innocent
input
inquiry
insane
insect
inside
inspire
install
intact
interest
into
invest
invite
involve
iron
island
isolate
issue
item
ivory
jacket
jaguar
jar
jazz
jealous
jeans
jelly
jewel
job
join
joke
journey
joy
judge
juice
jump
jungle
junior
junk
just
kangaroo
keen
keep
ketchup
key
kick
kid
kidney
kind
kingdom
kiss
kit
kitchen
kite
kitten
kiwi
knee
knife
knock
know
lab
label
labor
ladder
lady
lake
lamp
language
laptop
large
later
latin
laugh
laundry
lava
law
lawn
lawsuit
layer
lazy
leader
leaf
learn
leave
lecture
left
leg
legal
legend
leisure
lemon
lend
length
lens
leopard
lesson
letter
level
liar
liberty
library
license
life
lift
light
like
limb
limit
link
lion
liquid
list
little
live
lizard
load
loan
lobster
local
lock
logic
lonely
long
loop
lottery
loud
lounge
love
loyal
lucky
luggage
lumber
lunar
lunch
luxury
lyrics
machine
mad
magic
magnet
maid
mail
main
major
make
mammal
man
manage
mandate
mango
mansion
manual
maple
marble
march
margin
marine
market
marriage
mask
mass
master
match
material
math
matrix
matter
maximum
maze
meadow
mean
measure
meat
mechanic
medal
media
melody
melt
member
memory
mention
menu
mercy
merge
merit
merry
mesh
message
metal
method
middle
midnight
milk
million
mimic
mind
minimum
minor
minute
miracle
mirror
misery
miss
mistake
mix
mixed
mixture
mobile
model
modify
mom
moment
monitor
monkey
monster
month
moon
moral
more
morning
mosquito
mother
motion
motor
mountain
mouse
move
movie
much
muffin
mule
multiply
muscle
museum
mushroom
music
must
mutual
myself
mystery
myth
naive
name
napkin
narrow
nasty
nation
nature
near
neck
need
negative
neglect
neither
nephew
nerve
nest
net
network
neutral
never
news
next
nice
night
noble
noise
nominee
noodle
normal
north
nose
notable
note
nothing
notice
novel
now
nuclear
number
nurse
nut
oak
obey
object
oblige
obscure
observe
obtain
obvious
occur
ocean
october
odor
off
offer
office
often
oil
okay
old
olive
olympic
omit
once
one
onion
online
only
open
opera
opinion
oppose
option
orange
orbit
orchard
order
ordinary
organ
orient
original
orphan
ostrich
other
outdoor
outer
output
outside
oval
oven
over
own
owner
oxygen
oyster
ozone
pact
paddle
page
pair
palace
palm
panda
panel
panic
panther
paper
parade
parent
park
parrot
party
pass
patch
path
patient
patrol
pattern
pause
pave
payment
peace
peanut
pear
peasant
pelican
pen
penalty
pencil
people
pepper
perfect
permit
person
pet
phone
photo
phrase
physical
piano
picnic
picture
piece
pig
pigeon
pill
pilot
pink
pioneer
pipe
pistol
pitch
pizza
place
planet
plastic
plate
play
please
pledge
pluck
plug
plunge
poem
poet
point
polar
pole
police
pond
pony
pool
popular
portion
position
possible
post
potato
pottery
poverty
powder
power
practice
praise
predict
prefer
prepare
present
pretty
prevent
price
pride
primary
print
priority
prison
private
prize
problem
process
produce
profit
program
project
promote
proof
property
prosper
protect
proud
provide
public
pudding
pull
pulp
pulse
pumpkin
punch
pupil
puppy
purchase
purity
purpose
purse
push
put
puzzle
pyramid
quality
quantum
quarter
question
quick
quit
quiz
quote
rabbit
raccoon
race
rack
radar
radio
rail
rain
raise
rally
ramp
ranch
random
range
rapid
rare
rate
rather
raven
raw
razor
ready
real
reason
rebel
rebuild
recall
receive
recipe
record
recycle
reduce
reflect
reform
refuse
region
regret
regular
reject
relax
release
relief
rely
remain
remember
remind
remove
render
renew
rent
reopen
repair
repeat
replace
report
require
rescue
resemble
resist
resource
response
result
retire
retreat
return
reunion
reveal
review
reward
rhythm
rib
ribbon
rice
rich
ride
ridge
rifle
right
rigid
ring
riot
ripple
risk
ritual
rival
river
road
roast
robot
robust
rocket
romance
roof
rookie
room
rose
rotate
rough
round
route
royal
rubber
rude
rug
rule
run
runway
rural
sad
saddle
sadness
safe
sail
salad
salmon
salon
salt
salute
same
sample
sand
satisfy
satoshi
sauce
sausage
save
say
scale
scan
scare
scatter
scene
scheme
school
science
scissors
scorpion
scout
scrap
screen
script
scrub
sea
search
season
seat
second
secret
section
security
seed
seek
segment
select
sell
seminar
senior
sense
sentence
series
service
session
settle
setup
seven
shadow
shaft
shallow
share
shed
shell
sheriff
shield
shift
shine
ship
shiver
shock
shoe
shoot
shop
short
shoulder
shove
shrimp
shrug
shuffle
shy
sibling
sick
side
siege
sight
sign
silent
silk
silly
silver
similar
simple
since
sing
siren
sister
situate
six
size
skate
sketch
ski
skill
skin
skirt
skull
slab
slam
sleep
slender
slice
slide
slight
slim
slogan
slot
slow
slush
small
smart
smile
smoke
smooth
snack
snake
snap
sniff
snow
soap
soccer
social
sock
soda
soft
solar
soldier
solid
solution
solve
someone
song
soon
sorry
sort
soul
sound
soup
source
south
space
spare
spatial
spawn
speak
special
speed
spell
spend
sphere
spice
spider
spike
spin
spirit
split
spoil
sponsor
spoon
sport
spot
spray
spread
spring
spy
square
squeeze
squirrel
stable
stadium
staff
stage
stairs
stamp
stand
start
state
stay
steak
steel
stem
step
stereo
stick
still
sting
stock
stomach
stone
stool
story
stove
strategy
street
strike
strong
struggle
student
stuff
stumble
style
subject
submit
subway
success
such
sudden
suffer
sugar
suggest
suit
summer
sun
sunny
sunset
super
supply
supreme
sure
surface
surge
surprise
surround
survey
suspect
sustain
swallow
swamp
swap
swarm
swear
sweet
swift
swim
swing
switch
sword
symbol
symptom
syrup
system
table
tackle
tag
tail
talent
talk
tank
tape
target
task
taste
tattoo
taxi
teach
team
tell
ten
tenant
tennis
tent
term
test
text
thank
that
theme
then
theory
there
they
thing
this
thought
three
thrive
throw
thumb
thunder
ticket
tide
tiger
tilt
timber
time
tiny
tip
tired
tissue
title
toast
tobacco
today
toddler
toe
together
toilet
token
tomato
tomorrow
tone
tongue
tonight
tool
tooth
top
topic
topple
torch
tornado
tortoise
toss
total
tourist
toward
tower
town
toy
track
trade
traffic
tragic
train
transfer
trap
trash
travel
tray
treat
tree
trend
trial
tribe
trick
trigger
trim
trip
trophy
trouble
truck
true
truly
trumpet
trust
truth
try
tube
tuition
tumble
tuna
tunnel
turkey
turn
turtle
twelve
twenty
twice
twin
twist
two
type
typical
ugly
umbrella
unable
unaware
uncle
uncover
under
undo
unfair
unfold
unhappy
uniform
unique
unit
universe
unknown
unlock
until
unusual
unveil
update
upgrade
uphold
upon
upper
upset
urban
urge
usage
use
used
useful
useless
usual
utility
vacant
vacuum
vague
valid
valley
valve
van
vanish
vapor
various
vast
vault
vehicle
velvet
vendor
venture
venue
verb
verify
version
very
vessel
veteran
viable
vibrant
vicious
victory
video
view
village
vintage
violin
virtual
virus
visa
visit
visual
vital
vivid
vocal
voice
void
volcano
volume
vote
voyage
wage
wagon
wait
walk
wall
walnut
want
warfare
warm
warrior
wash
wasp
waste
water
wave
way
wealth
weapon
wear
weasel
weather
web
wedding
weekend
weird
welcome
west
wet
whale
what
wheat
wheel
when
where
whip
whisper
wide
width
wife
wild
will
win
window
wine
wing
wink
winner
winter
wire
wisdom
wise
wish
witness
wolf
woman
wonder
wood
wool
word
work
world
worry
worth
wrap
wreck
wrestle
wrist
write
wrong
yard
year
yellow
you
young
youth
zebra
zero
zone
zoo`.split(`
`)});var IJ=I(nA=>{"use strict";Object.defineProperty(nA,"__esModule",{value:!0});nA.Bip39=nA.EnglishMnemonic=void 0;var eY=kn(),sI=gJ(),dI=pJ(),cI=class{static wordlist=dI.wordlist;data;constructor(n){let t=(0,sI.mnemonicToEntropy)(n,dI.wordlist);this.data=n}toString(){return this.data}};nA.EnglishMnemonic=cI;var Fm=class{static encode(n){return new cI((0,sI.entropyToMnemonic)(n,dI.wordlist))}static decode(n){return(0,eY.fixUint8Array)((0,sI.mnemonicToEntropy)(n.toString(),dI.wordlist))}static async mnemonicToSeed(n,t){return await(0,sI.mnemonicToSeed)(n.toString(),t)}};nA.Bip39=Fm});var Od=I(hn=>{"use strict";Object.defineProperty(hn,"__esModule",{value:!0});hn.notImplemented=hn.bitMask=hn.utf8ToBytes=hn.randomBytes=hn.isBytes=hn.hexToBytes=hn.concatBytes=hn.bytesToUtf8=hn.bytesToHex=hn.anumber=hn.abytes=void 0;hn.abool=nY;hn._abool2=tY;hn._abytes2=rY;hn.numberToHexUnpadded=hJ;hn.hexToNumber=Hm;hn.bytesToNumberBE=iY;hn.bytesToNumberLE=oY;hn.numberToBytesBE=yJ;hn.numberToBytesLE=aY;hn.numberToVarBytesBE=sY;hn.ensureBytes=dY;hn.equalBytes=cY;hn.copyBytes=uY;hn.asciiToBytes=AY;hn.inRange=BJ;hn.aInRange=fY;hn.bitLen=lY;hn.bitGet=gY;hn.bitSet=pY;hn.createHmacDrbg=hY;hn.validateObject=BY;hn.isHash=mY;hn._validateObject=CY;hn.memoized=kY;var Os=oa(),vd=oa();Object.defineProperty(hn,"abytes",{enumerable:!0,get:function(){return vd.abytes}});Object.defineProperty(hn,"anumber",{enumerable:!0,get:function(){return vd.anumber}});Object.defineProperty(hn,"bytesToHex",{enumerable:!0,get:function(){return vd.bytesToHex}});Object.defineProperty(hn,"bytesToUtf8",{enumerable:!0,get:function(){return vd.bytesToUtf8}});Object.defineProperty(hn,"concatBytes",{enumerable:!0,get:function(){return vd.concatBytes}});Object.defineProperty(hn,"hexToBytes",{enumerable:!0,get:function(){return vd.hexToBytes}});Object.defineProperty(hn,"isBytes",{enumerable:!0,get:function(){return vd.isBytes}});Object.defineProperty(hn,"randomBytes",{enumerable:!0,get:function(){return vd.randomBytes}});Object.defineProperty(hn,"utf8ToBytes",{enumerable:!0,get:function(){return vd.utf8ToBytes}});var uI=BigInt(0),dl=BigInt(1);function nY(e,n){if(typeof n!="boolean")throw new Error(e+" boolean expected, got "+n)}function tY(e,n=""){if(typeof e!="boolean"){let t=n&&`"${n}"`;throw new Error(t+"expected boolean, got type="+typeof e)}return e}function rY(e,n,t=""){let i=(0,Os.isBytes)(e),r=e?.length,o=n!==void 0;if(!i||o&&r!==n){let a=t&&`"${t}" `,s=o?` of length ${n}`:"",d=i?`length=${r}`:`type=${typeof e}`;throw new Error(a+"expected Uint8Array"+s+", got "+d)}return e}function hJ(e){let n=e.toString(16);return n.length&1?"0"+n:n}function Hm(e){if(typeof e!="string")throw new Error("hex string expected, got "+typeof e);return e===""?uI:BigInt("0x"+e)}function iY(e){return Hm((0,Os.bytesToHex)(e))}function oY(e){return(0,Os.abytes)(e),Hm((0,Os.bytesToHex)(Uint8Array.from(e).reverse()))}function yJ(e,n){return(0,Os.hexToBytes)(e.toString(16).padStart(n*2,"0"))}function aY(e,n){return yJ(e,n).reverse()}function sY(e){return(0,Os.hexToBytes)(hJ(e))}function dY(e,n,t){let i;if(typeof n=="string")try{i=(0,Os.hexToBytes)(n)}catch(o){throw new Error(e+" must be hex string or Uint8Array, cause: "+o)}else if((0,Os.isBytes)(n))i=Uint8Array.from(n);else throw new Error(e+" must be hex string or Uint8Array");let r=i.length;if(typeof t=="number"&&r!==t)throw new Error(e+" of length "+t+" expected, got "+r);return i}function cY(e,n){if(e.length!==n.length)return!1;let t=0;for(let i=0;i<e.length;i++)t|=e[i]^n[i];return t===0}function uY(e){return Uint8Array.from(e)}function AY(e){return Uint8Array.from(e,(n,t)=>{let i=n.charCodeAt(0);if(n.length!==1||i>127)throw new Error(`string contains non-ASCII character "${e[t]}" with code ${i} at position ${t}`);return i})}var Mm=e=>typeof e=="bigint"&&uI<=e;function BJ(e,n,t){return Mm(e)&&Mm(n)&&Mm(t)&&n<=e&&e<t}function fY(e,n,t,i){if(!BJ(n,t,i))throw new Error("expected valid "+e+": "+t+" <= n < "+i+", got "+n)}function lY(e){let n;for(n=0;e>uI;e>>=dl,n+=1);return n}function gY(e,n){return e>>BigInt(n)&dl}function pY(e,n,t){return e|(t?dl:uI)<<BigInt(n)}var IY=e=>(dl<<BigInt(e))-dl;hn.bitMask=IY;function hY(e,n,t){if(typeof e!="number"||e<2)throw new Error("hashLen must be a number");if(typeof n!="number"||n<2)throw new Error("qByteLen must be a number");if(typeof t!="function")throw new Error("hmacFn must be a function");let i=h=>new Uint8Array(h),r=h=>Uint8Array.of(h),o=i(e),a=i(e),s=0,d=()=>{o.fill(1),a.fill(0),s=0},u=(...h)=>t(a,o,...h),f=(h=i(0))=>{a=u(r(0),h),o=u(),h.length!==0&&(a=u(r(1),h),o=u())},p=()=>{if(s++>=1e3)throw new Error("drbg: tried 1000 values");let h=0,B=[];for(;h<n;){o=u();let C=o.slice();B.push(C),h+=o.length}return(0,Os.concatBytes)(...B)};return(h,B)=>{d(),f(h);let C;for(;!(C=B(p()));)f();return d(),C}}var yY={bigint:e=>typeof e=="bigint",function:e=>typeof e=="function",boolean:e=>typeof e=="boolean",string:e=>typeof e=="string",stringOrUint8Array:e=>typeof e=="string"||(0,Os.isBytes)(e),isSafeInteger:e=>Number.isSafeInteger(e),array:e=>Array.isArray(e),field:(e,n)=>n.Fp.isValid(e),hash:e=>typeof e=="function"&&Number.isSafeInteger(e.outputLen)};function BY(e,n,t={}){let i=(r,o,a)=>{let s=yY[o];if(typeof s!="function")throw new Error("invalid validator function");let d=e[r];if(!(a&&d===void 0)&&!s(d,e))throw new Error("param "+String(r)+" is invalid. Expected "+o+", got "+d)};for(let[r,o]of Object.entries(n))i(r,o,!1);for(let[r,o]of Object.entries(t))i(r,o,!0);return e}function mY(e){return typeof e=="function"&&Number.isSafeInteger(e.outputLen)}function CY(e,n,t={}){if(!e||typeof e!="object")throw new Error("expected valid options object");function i(r,o,a){let s=e[r];if(a&&s===void 0)return;let d=typeof s;if(d!==o||s===null)throw new Error(`param "${r}" is invalid: expected ${o}, got ${d}`)}Object.entries(n).forEach(([r,o])=>i(r,o,!1)),Object.entries(t).forEach(([r,o])=>i(r,o,!0))}var SY=()=>{throw new Error("not implemented")};hn.notImplemented=SY;function kY(e){let n=new WeakMap;return(t,...i)=>{let r=n.get(t);if(r!==void 0)return r;let o=e(t,...i);return n.set(t,o),o}}});var gc=I(mr=>{"use strict";Object.defineProperty(mr,"__esModule",{value:!0});mr.isNegativeLE=void 0;mr.mod=qo;mr.pow=wY;mr.pow2=RY;mr.invert=AI;mr.tonelliShanks=Gm;mr.FpSqrt=wJ;mr.validateField=OY;mr.FpPow=Vm;mr.FpInvertBatch=RJ;mr.FpDiv=DY;mr.FpLegendre=fI;mr.FpIsSquare=UY;mr.nLength=Wm;mr.Field=lI;mr.FpSqrtOdd=TY;mr.FpSqrtEven=xY;mr.hashToPrivateScalar=JY;mr.getFieldBytesLength=Km;mr.getMinHashLength=bJ;mr.mapHashToField=qY;var Fo=Od(),ho=BigInt(0),gi=BigInt(1),ru=BigInt(2),mJ=BigInt(3),CJ=BigInt(4),SJ=BigInt(5),EY=BigInt(7),kJ=BigInt(8),QY=BigInt(9),EJ=BigInt(16);function qo(e,n){let t=e%n;return t>=ho?t:n+t}function wY(e,n,t){return Vm(lI(t),e,n)}function RY(e,n,t){let i=e;for(;n-- >ho;)i*=i,i%=t;return i}function AI(e,n){if(e===ho)throw new Error("invert: expected non-zero number");if(n<=ho)throw new Error("invert: expected positive modulus, got "+n);let t=qo(e,n),i=n,r=ho,o=gi,a=gi,s=ho;for(;t!==ho;){let u=i/t,f=i%t,p=r-a*u,l=o-s*u;i=t,t=f,r=a,o=s,a=p,s=l}if(i!==gi)throw new Error("invert: does not exist");return qo(r,n)}function _m(e,n,t){if(!e.eql(e.sqr(n),t))throw new Error("Cannot find square root")}function QJ(e,n){let t=(e.ORDER+gi)/CJ,i=e.pow(n,t);return _m(e,i,n),i}function bY(e,n){let t=(e.ORDER-SJ)/kJ,i=e.mul(n,ru),r=e.pow(i,t),o=e.mul(n,r),a=e.mul(e.mul(o,ru),r),s=e.mul(o,e.sub(a,e.ONE));return _m(e,s,n),s}function PY(e){let n=lI(e),t=Gm(e),i=t(n,n.neg(n.ONE)),r=t(n,i),o=t(n,n.neg(i)),a=(e+EY)/EJ;return(s,d)=>{let u=s.pow(d,a),f=s.mul(u,i),p=s.mul(u,r),l=s.mul(u,o),h=s.eql(s.sqr(f),d),B=s.eql(s.sqr(p),d);u=s.cmov(u,f,h),f=s.cmov(l,p,B);let C=s.eql(s.sqr(f),d),E=s.cmov(u,f,C);return _m(s,E,d),E}}function Gm(e){if(e<mJ)throw new Error("sqrt is not defined for small field");let n=e-gi,t=0;for(;n%ru===ho;)n/=ru,t++;let i=ru,r=lI(e);for(;fI(r,i)===1;)if(i++>1e3)throw new Error("Cannot find square root: probably non-prime P");if(t===1)return QJ;let o=r.pow(i,n),a=(n+gi)/ru;return function(d,u){if(d.is0(u))return u;if(fI(d,u)!==1)throw new Error("Cannot find square root");let f=t,p=d.mul(d.ONE,o),l=d.pow(u,n),h=d.pow(u,a);for(;!d.eql(l,d.ONE);){if(d.is0(l))return d.ZERO;let B=1,C=d.sqr(l);for(;!d.eql(C,d.ONE);)if(B++,C=d.sqr(C),B===f)throw new Error("Cannot find square root");let E=gi<<BigInt(f-B-1),S=d.pow(p,E);f=B,p=d.sqr(S),l=d.mul(l,p),h=d.mul(h,S)}return h}}function wJ(e){return e%CJ===mJ?QJ:e%kJ===SJ?bY:e%EJ===QY?PY(e):Gm(e)}var NY=(e,n)=>(qo(e,n)&gi)===gi;mr.isNegativeLE=NY;var vY=["create","isValid","is0","neg","inv","sqrt","sqr","eql","add","sub","mul","pow","div","addN","subN","mulN","sqrN"];function OY(e){let n={ORDER:"bigint",MASK:"bigint",BYTES:"number",BITS:"number"},t=vY.reduce((i,r)=>(i[r]="function",i),n);return(0,Fo._validateObject)(e,t),e}function Vm(e,n,t){if(t<ho)throw new Error("invalid exponent, negatives unsupported");if(t===ho)return e.ONE;if(t===gi)return n;let i=e.ONE,r=n;for(;t>ho;)t&gi&&(i=e.mul(i,r)),r=e.sqr(r),t>>=gi;return i}function RJ(e,n,t=!1){let i=new Array(n.length).fill(t?e.ZERO:void 0),r=n.reduce((a,s,d)=>e.is0(s)?a:(i[d]=a,e.mul(a,s)),e.ONE),o=e.inv(r);return n.reduceRight((a,s,d)=>e.is0(s)?a:(i[d]=e.mul(a,i[d]),e.mul(a,s)),o),i}function DY(e,n,t){return e.mul(n,typeof t=="bigint"?AI(t,e.ORDER):e.inv(t))}function fI(e,n){let t=(e.ORDER-gi)/ru,i=e.pow(n,t),r=e.eql(i,e.ONE),o=e.eql(i,e.ZERO),a=e.eql(i,e.neg(e.ONE));if(!r&&!o&&!a)throw new Error("invalid Legendre symbol result");return r?1:o?0:-1}function UY(e,n){return fI(e,n)===1}function Wm(e,n){n!==void 0&&(0,Fo.anumber)(n);let t=n!==void 0?n:e.toString(2).length,i=Math.ceil(t/8);return{nBitLength:t,nByteLength:i}}function lI(e,n,t=!1,i={}){if(e<=ho)throw new Error("invalid field: expected ORDER > 0, got "+e);let r,o,a=!1,s;if(typeof n=="object"&&n!=null){if(i.sqrt||t)throw new Error("cannot specify opts in two arguments");let l=n;l.BITS&&(r=l.BITS),l.sqrt&&(o=l.sqrt),typeof l.isLE=="boolean"&&(t=l.isLE),typeof l.modFromBytes=="boolean"&&(a=l.modFromBytes),s=l.allowedLengths}else typeof n=="number"&&(r=n),i.sqrt&&(o=i.sqrt);let{nBitLength:d,nByteLength:u}=Wm(e,r);if(u>2048)throw new Error("invalid field: expected ORDER of <= 2048 bytes");let f,p=Object.freeze({ORDER:e,isLE:t,BITS:d,BYTES:u,MASK:(0,Fo.bitMask)(d),ZERO:ho,ONE:gi,allowedLengths:s,create:l=>qo(l,e),isValid:l=>{if(typeof l!="bigint")throw new Error("invalid field element: expected bigint, got "+typeof l);return ho<=l&&l<e},is0:l=>l===ho,isValidNot0:l=>!p.is0(l)&&p.isValid(l),isOdd:l=>(l&gi)===gi,neg:l=>qo(-l,e),eql:(l,h)=>l===h,sqr:l=>qo(l*l,e),add:(l,h)=>qo(l+h,e),sub:(l,h)=>qo(l-h,e),mul:(l,h)=>qo(l*h,e),pow:(l,h)=>Vm(p,l,h),div:(l,h)=>qo(l*AI(h,e),e),sqrN:l=>l*l,addN:(l,h)=>l+h,subN:(l,h)=>l-h,mulN:(l,h)=>l*h,inv:l=>AI(l,e),sqrt:o||(l=>(f||(f=wJ(e)),f(p,l))),toBytes:l=>t?(0,Fo.numberToBytesLE)(l,u):(0,Fo.numberToBytesBE)(l,u),fromBytes:(l,h=!0)=>{if(s){if(!s.includes(l.length)||l.length>u)throw new Error("Field.fromBytes: expected "+s+" bytes, got "+l.length);let C=new Uint8Array(u);C.set(l,t?0:C.length-l.length),l=C}if(l.length!==u)throw new Error("Field.fromBytes: expected "+u+" bytes, got "+l.length);let B=t?(0,Fo.bytesToNumberLE)(l):(0,Fo.bytesToNumberBE)(l);if(a&&(B=qo(B,e)),!h&&!p.isValid(B))throw new Error("invalid field element: outside of range 0..ORDER");return B},invertBatch:l=>RJ(p,l),cmov:(l,h,B)=>B?h:l});return Object.freeze(p)}function TY(e,n){if(!e.isOdd)throw new Error("Field doesn't have isOdd");let t=e.sqrt(n);return e.isOdd(t)?t:e.neg(t)}function xY(e,n){if(!e.isOdd)throw new Error("Field doesn't have isOdd");let t=e.sqrt(n);return e.isOdd(t)?e.neg(t):t}function JY(e,n,t=!1){e=(0,Fo.ensureBytes)("privateHash",e);let i=e.length,r=Wm(n).nByteLength+8;if(r<24||i<r||i>1024)throw new Error("hashToPrivateScalar: expected "+r+"-1024 bytes of input, got "+i);let o=t?(0,Fo.bytesToNumberLE)(e):(0,Fo.bytesToNumberBE)(e);return qo(o,n-gi)+gi}function Km(e){if(typeof e!="bigint")throw new Error("field order must be bigint");let n=e.toString(2).length;return Math.ceil(n/8)}function bJ(e){let n=Km(e);return n+Math.ceil(n/2)}function qY(e,n,t=!1){let i=e.length,r=Km(n),o=bJ(n);if(i<16||i<o||i>1024)throw new Error("expected "+o+"-1024 bytes of input, got "+i);let a=t?(0,Fo.bytesToNumberLE)(e):(0,Fo.bytesToNumberBE)(e),s=qo(a,n-gi)+gi;return t?(0,Fo.numberToBytesLE)(s,r):(0,Fo.numberToBytesBE)(s,r)}});var gI=I(ja=>{"use strict";Object.defineProperty(ja,"__esModule",{value:!0});ja.wNAF=void 0;ja.negateCt=Zm;ja.normalizeZ=FY;ja.mulEndoUnsafe=MY;ja.pippenger=HY;ja.precomputeMSMUnsafe=_Y;ja.validateBasic=GY;ja._createCurveFields=VY;var cl=Od(),ul=gc(),tA=BigInt(0),iu=BigInt(1);function Zm(e,n){let t=n.negate();return e?t:n}function FY(e,n){let t=(0,ul.FpInvertBatch)(e.Fp,n.map(i=>i.Z));return n.map((i,r)=>e.fromAffine(i.toAffine(t[r])))}function $m(e,n){if(!Number.isSafeInteger(e)||e<=0||e>n)throw new Error("invalid window size, expected [1.."+n+"], got W="+e)}function Lm(e,n){$m(e,n);let t=Math.ceil(n/e)+1,i=2**(e-1),r=2**e,o=(0,cl.bitMask)(e),a=BigInt(e);return{windows:t,windowSize:i,mask:o,maxNumber:r,shiftBy:a}}function PJ(e,n,t){let{windowSize:i,mask:r,maxNumber:o,shiftBy:a}=t,s=Number(e&r),d=e>>a;s>i&&(s-=o,d+=iu);let u=n*i,f=u+Math.abs(s)-1,p=s===0,l=s<0,h=n%2!==0;return{nextN:d,offset:f,isZero:p,isNeg:l,isNegF:h,offsetF:u}}function OJ(e,n){if(!Array.isArray(e))throw new Error("array expected");e.forEach((t,i)=>{if(!(t instanceof n))throw new Error("invalid point at index "+i)})}function DJ(e,n){if(!Array.isArray(e))throw new Error("array of scalars expected");e.forEach((t,i)=>{if(!n.isValid(t))throw new Error("invalid scalar at index "+i)})}var Ym=new WeakMap,UJ=new WeakMap;function zm(e){return UJ.get(e)||1}function NJ(e){if(e!==tA)throw new Error("invalid wNAF")}var Xm=class{constructor(n,t){this.BASE=n.BASE,this.ZERO=n.ZERO,this.Fn=n.Fn,this.bits=t}_unsafeLadder(n,t,i=this.ZERO){let r=n;for(;t>tA;)t&iu&&(i=i.add(r)),r=r.double(),t>>=iu;return i}precomputeWindow(n,t){let{windows:i,windowSize:r}=Lm(t,this.bits),o=[],a=n,s=a;for(let d=0;d<i;d++){s=a,o.push(s);for(let u=1;u<r;u++)s=s.add(a),o.push(s);a=s.double()}return o}wNAF(n,t,i){if(!this.Fn.isValid(i))throw new Error("invalid scalar");let r=this.ZERO,o=this.BASE,a=Lm(n,this.bits);for(let s=0;s<a.windows;s++){let{nextN:d,offset:u,isZero:f,isNeg:p,isNegF:l,offsetF:h}=PJ(i,s,a);i=d,f?o=o.add(Zm(l,t[h])):r=r.add(Zm(p,t[u]))}return NJ(i),{p:r,f:o}}wNAFUnsafe(n,t,i,r=this.ZERO){let o=Lm(n,this.bits);for(let a=0;a<o.windows&&i!==tA;a++){let{nextN:s,offset:d,isZero:u,isNeg:f}=PJ(i,a,o);if(i=s,!u){let p=t[d];r=r.add(f?p.negate():p)}}return NJ(i),r}getPrecomputes(n,t,i){let r=Ym.get(t);return r||(r=this.precomputeWindow(t,n),n!==1&&(typeof i=="function"&&(r=i(r)),Ym.set(t,r))),r}cached(n,t,i){let r=zm(n);return this.wNAF(r,this.getPrecomputes(r,n,i),t)}unsafe(n,t,i,r){let o=zm(n);return o===1?this._unsafeLadder(n,t,r):this.wNAFUnsafe(o,this.getPrecomputes(o,n,i),t,r)}createCache(n,t){$m(t,this.bits),UJ.set(n,t),Ym.delete(n)}hasCache(n){return zm(n)!==1}};ja.wNAF=Xm;function MY(e,n,t,i){let r=n,o=e.ZERO,a=e.ZERO;for(;t>tA||i>tA;)t&iu&&(o=o.add(r)),i&iu&&(a=a.add(r)),r=r.double(),t>>=iu,i>>=iu;return{p1:o,p2:a}}function HY(e,n,t,i){OJ(t,e),DJ(i,n);let r=t.length,o=i.length;if(r!==o)throw new Error("arrays of points and scalars must have equal length");let a=e.ZERO,s=(0,cl.bitLen)(BigInt(r)),d=1;s>12?d=s-3:s>4?d=s-2:s>0&&(d=2);let u=(0,cl.bitMask)(d),f=new Array(Number(u)+1).fill(a),p=Math.floor((n.BITS-1)/d)*d,l=a;for(let h=p;h>=0;h-=d){f.fill(a);for(let C=0;C<o;C++){let E=i[C],S=Number(E>>BigInt(h)&u);f[S]=f[S].add(t[C])}let B=a;for(let C=f.length-1,E=a;C>0;C--)E=E.add(f[C]),B=B.add(E);if(l=l.add(B),h!==0)for(let C=0;C<d;C++)l=l.double()}return l}function _Y(e,n,t,i){$m(i,n.BITS),OJ(t,e);let r=e.ZERO,o=2**i-1,a=Math.ceil(n.BITS/i),s=(0,cl.bitMask)(i),d=t.map(u=>{let f=[];for(let p=0,l=u;p<o;p++)f.push(l),l=l.add(u);return f});return u=>{if(DJ(u,n),u.length>t.length)throw new Error("array of scalars must be smaller than array of points");let f=r;for(let p=0;p<a;p++){if(f!==r)for(let h=0;h<i;h++)f=f.double();let l=BigInt(a*i-(p+1)*i);for(let h=0;h<u.length;h++){let B=u[h],C=Number(B>>l&s);C&&(f=f.add(d[h][C-1]))}}return f}}function GY(e){return(0,ul.validateField)(e.Fp),(0,cl.validateObject)(e,{n:"bigint",h:"bigint",Gx:"field",Gy:"field"},{nBitLength:"isSafeInteger",nByteLength:"isSafeInteger"}),Object.freeze({...(0,ul.nLength)(e.n,e.nBitLength),...e,p:e.Fp.ORDER})}function vJ(e,n,t){if(n){if(n.ORDER!==e)throw new Error("Field.ORDER must match order: Fp == p, Fn == n");return(0,ul.validateField)(n),n}else return(0,ul.Field)(e,{isLE:t})}function VY(e,n,t={},i){if(i===void 0&&(i=e==="edwards"),!n||typeof n!="object")throw new Error(`expected valid ${e} CURVE object`);for(let d of["p","n","h"]){let u=n[d];if(!(typeof u=="bigint"&&u>tA))throw new Error(`CURVE.${d} must be positive bigint`)}let r=vJ(n.p,t.Fp,i),o=vJ(n.n,t.Fn,i),s=["Gx","Gy","a",e==="weierstrass"?"b":"d"];for(let d of s)if(!r.isValid(n[d]))throw new Error(`CURVE.${d} must be valid field element of CURVE.Fp`);return n=Object.freeze(Object.assign({},n)),{CURVE:n,Fp:r,Fn:o}}});var JJ=I(au=>{"use strict";Object.defineProperty(au,"__esModule",{value:!0});au.PrimeEdwardsPoint=void 0;au.edwards=TJ;au.eddsa=xJ;au.twistedEdwards=ZY;var kt=Od(),ou=gI(),WY=gc(),pc=BigInt(0),Ri=BigInt(1),jm=BigInt(2),KY=BigInt(8);function LY(e,n,t,i){let r=e.sqr(t),o=e.sqr(i),a=e.add(e.mul(n.a,r),o),s=e.add(e.ONE,e.mul(n.d,e.mul(r,o)));return e.eql(a,s)}function TJ(e,n={}){let t=(0,ou._createCurveFields)("edwards",e,n,n.FpFnLE),{Fp:i,Fn:r}=t,o=t.CURVE,{h:a}=o;(0,kt._validateObject)(n,{},{uvRatio:"function"});let s=jm<<BigInt(r.BYTES*8)-Ri,d=E=>i.create(E),u=n.uvRatio||((E,S)=>{try{return{isValid:!0,value:i.sqrt(i.div(E,S))}}catch{return{isValid:!1,value:pc}}});if(!LY(i,o,o.Gx,o.Gy))throw new Error("bad curve params: generator point");function f(E,S,N=!1){let b=N?Ri:pc;return(0,kt.aInRange)("coordinate "+E,S,b,s),S}function p(E){if(!(E instanceof B))throw new Error("ExtendedPoint expected")}let l=(0,kt.memoized)((E,S)=>{let{X:N,Y:b,Z:V}=E,pe=E.is0();S==null&&(S=pe?KY:i.inv(V));let we=d(N*S),Ye=d(b*S),He=i.mul(V,S);if(pe)return{x:pc,y:Ri};if(He!==Ri)throw new Error("invZ was invalid");return{x:we,y:Ye}}),h=(0,kt.memoized)(E=>{let{a:S,d:N}=o;if(E.is0())throw new Error("bad point: ZERO");let{X:b,Y:V,Z:pe,T:we}=E,Ye=d(b*b),He=d(V*V),D=d(pe*pe),oe=d(D*D),Ce=d(Ye*S),fe=d(D*d(Ce+He)),Q=d(oe+d(N*d(Ye*He)));if(fe!==Q)throw new Error("bad point: equation left != right (1)");let w=d(b*V),P=d(pe*we);if(w!==P)throw new Error("bad point: equation left != right (2)");return!0});class B{constructor(S,N,b,V){this.X=f("x",S),this.Y=f("y",N),this.Z=f("z",b,!0),this.T=f("t",V),Object.freeze(this)}static CURVE(){return o}static fromAffine(S){if(S instanceof B)throw new Error("extended point not allowed");let{x:N,y:b}=S||{};return f("x",N),f("y",b),new B(N,b,Ri,d(N*b))}static fromBytes(S,N=!1){let b=i.BYTES,{a:V,d:pe}=o;S=(0,kt.copyBytes)((0,kt._abytes2)(S,b,"point")),(0,kt._abool2)(N,"zip215");let we=(0,kt.copyBytes)(S),Ye=S[b-1];we[b-1]=Ye&-129;let He=(0,kt.bytesToNumberLE)(we),D=N?s:i.ORDER;(0,kt.aInRange)("point.y",He,pc,D);let oe=d(He*He),Ce=d(oe-Ri),fe=d(pe*oe-V),{isValid:Q,value:w}=u(Ce,fe);if(!Q)throw new Error("bad point: invalid y coordinate");let P=(w&Ri)===Ri,M=(Ye&128)!==0;if(!N&&w===pc&&M)throw new Error("bad point: x=0 and x_0=1");return M!==P&&(w=d(-w)),B.fromAffine({x:w,y:He})}static fromHex(S,N=!1){return B.fromBytes((0,kt.ensureBytes)("point",S),N)}get x(){return this.toAffine().x}get y(){return this.toAffine().y}precompute(S=8,N=!0){return C.createCache(this,S),N||this.multiply(jm),this}assertValidity(){h(this)}equals(S){p(S);let{X:N,Y:b,Z:V}=this,{X:pe,Y:we,Z:Ye}=S,He=d(N*Ye),D=d(pe*V),oe=d(b*Ye),Ce=d(we*V);return He===D&&oe===Ce}is0(){return this.equals(B.ZERO)}negate(){return new B(d(-this.X),this.Y,this.Z,d(-this.T))}double(){let{a:S}=o,{X:N,Y:b,Z:V}=this,pe=d(N*N),we=d(b*b),Ye=d(jm*d(V*V)),He=d(S*pe),D=N+b,oe=d(d(D*D)-pe-we),Ce=He+we,fe=Ce-Ye,Q=He-we,w=d(oe*fe),P=d(Ce*Q),M=d(oe*Q),Y=d(fe*Ce);return new B(w,P,Y,M)}add(S){p(S);let{a:N,d:b}=o,{X:V,Y:pe,Z:we,T:Ye}=this,{X:He,Y:D,Z:oe,T:Ce}=S,fe=d(V*He),Q=d(pe*D),w=d(Ye*b*Ce),P=d(we*oe),M=d((V+pe)*(He+D)-fe-Q),Y=P-w,se=P+w,J=d(Q-N*fe),ae=d(M*Y),Ie=d(se*J),Pe=d(M*J),tt=d(Y*se);return new B(ae,Ie,tt,Pe)}subtract(S){return this.add(S.negate())}multiply(S){if(!r.isValidNot0(S))throw new Error("invalid scalar: expected 1 <= sc < curve.n");let{p:N,f:b}=C.cached(this,S,V=>(0,ou.normalizeZ)(B,V));return(0,ou.normalizeZ)(B,[N,b])[0]}multiplyUnsafe(S,N=B.ZERO){if(!r.isValid(S))throw new Error("invalid scalar: expected 0 <= sc < curve.n");return S===pc?B.ZERO:this.is0()||S===Ri?this:C.unsafe(this,S,b=>(0,ou.normalizeZ)(B,b),N)}isSmallOrder(){return this.multiplyUnsafe(a).is0()}isTorsionFree(){return C.unsafe(this,o.n).is0()}toAffine(S){return l(this,S)}clearCofactor(){return a===Ri?this:this.multiplyUnsafe(a)}toBytes(){let{x:S,y:N}=this.toAffine(),b=i.toBytes(N);return b[b.length-1]|=S&Ri?128:0,b}toHex(){return(0,kt.bytesToHex)(this.toBytes())}toString(){return`<Point ${this.is0()?"ZERO":this.toHex()}>`}get ex(){return this.X}get ey(){return this.Y}get ez(){return this.Z}get et(){return this.T}static normalizeZ(S){return(0,ou.normalizeZ)(B,S)}static msm(S,N){return(0,ou.pippenger)(B,r,S,N)}_setWindowSize(S){this.precompute(S)}toRawBytes(){return this.toBytes()}}B.BASE=new B(o.Gx,o.Gy,Ri,d(o.Gx*o.Gy)),B.ZERO=new B(pc,Ri,Ri,pc),B.Fp=i,B.Fn=r;let C=new ou.wNAF(B,r.BITS);return B.BASE.precompute(8),B}var eC=class{constructor(n){this.ep=n}static fromBytes(n){(0,kt.notImplemented)()}static fromHex(n){(0,kt.notImplemented)()}get x(){return this.toAffine().x}get y(){return this.toAffine().y}clearCofactor(){return this}assertValidity(){this.ep.assertValidity()}toAffine(n){return this.ep.toAffine(n)}toHex(){return(0,kt.bytesToHex)(this.toBytes())}toString(){return this.toHex()}isTorsionFree(){return!0}isSmallOrder(){return!1}add(n){return this.assertSame(n),this.init(this.ep.add(n.ep))}subtract(n){return this.assertSame(n),this.init(this.ep.subtract(n.ep))}multiply(n){return this.init(this.ep.multiply(n))}multiplyUnsafe(n){return this.init(this.ep.multiplyUnsafe(n))}double(){return this.init(this.ep.double())}negate(){return this.init(this.ep.negate())}precompute(n,t){return this.init(this.ep.precompute(n,t))}toRawBytes(){return this.toBytes()}};au.PrimeEdwardsPoint=eC;function xJ(e,n,t={}){if(typeof n!="function")throw new Error('"hash" function param is required');(0,kt._validateObject)(t,{},{adjustScalarBytes:"function",randomBytes:"function",domain:"function",prehash:"function",mapToCurve:"function"});let{prehash:i}=t,{BASE:r,Fp:o,Fn:a}=e,s=t.randomBytes||kt.randomBytes,d=t.adjustScalarBytes||(D=>D),u=t.domain||((D,oe,Ce)=>{if((0,kt._abool2)(Ce,"phflag"),oe.length||Ce)throw new Error("Contexts/pre-hash are not supported");return D});function f(D){return a.create((0,kt.bytesToNumberLE)(D))}function p(D){let oe=b.secretKey;D=(0,kt.ensureBytes)("private key",D,oe);let Ce=(0,kt.ensureBytes)("hashed private key",n(D),2*oe),fe=d(Ce.slice(0,oe)),Q=Ce.slice(oe,2*oe),w=f(fe);return{head:fe,prefix:Q,scalar:w}}function l(D){let{head:oe,prefix:Ce,scalar:fe}=p(D),Q=r.multiply(fe),w=Q.toBytes();return{head:oe,prefix:Ce,scalar:fe,point:Q,pointBytes:w}}function h(D){return l(D).pointBytes}function B(D=Uint8Array.of(),...oe){let Ce=(0,kt.concatBytes)(...oe);return f(n(u(Ce,(0,kt.ensureBytes)("context",D),!!i)))}function C(D,oe,Ce={}){D=(0,kt.ensureBytes)("message",D),i&&(D=i(D));let{prefix:fe,scalar:Q,pointBytes:w}=l(oe),P=B(Ce.context,fe,D),M=r.multiply(P).toBytes(),Y=B(Ce.context,M,w,D),se=a.create(P+Y*Q);if(!a.isValid(se))throw new Error("sign failed: invalid s");let J=(0,kt.concatBytes)(M,a.toBytes(se));return(0,kt._abytes2)(J,b.signature,"result")}let E={zip215:!0};function S(D,oe,Ce,fe=E){let{context:Q,zip215:w}=fe,P=b.signature;D=(0,kt.ensureBytes)("signature",D,P),oe=(0,kt.ensureBytes)("message",oe),Ce=(0,kt.ensureBytes)("publicKey",Ce,b.publicKey),w!==void 0&&(0,kt._abool2)(w,"zip215"),i&&(oe=i(oe));let M=P/2,Y=D.subarray(0,M),se=(0,kt.bytesToNumberLE)(D.subarray(M,P)),J,ae,Ie;try{J=e.fromBytes(Ce,w),ae=e.fromBytes(Y,w),Ie=r.multiplyUnsafe(se)}catch{return!1}if(!w&&J.isSmallOrder())return!1;let Pe=B(Q,ae.toBytes(),J.toBytes(),oe);return ae.add(J.multiplyUnsafe(Pe)).subtract(Ie).clearCofactor().is0()}let N=o.BYTES,b={secretKey:N,publicKey:N,signature:2*N,seed:N};function V(D=s(b.seed)){return(0,kt._abytes2)(D,b.seed,"seed")}function pe(D){let oe=He.randomSecretKey(D);return{secretKey:oe,publicKey:h(oe)}}function we(D){return(0,kt.isBytes)(D)&&D.length===a.BYTES}function Ye(D,oe){try{return!!e.fromBytes(D,oe)}catch{return!1}}let He={getExtendedPublicKey:l,randomSecretKey:V,isValidSecretKey:we,isValidPublicKey:Ye,toMontgomery(D){let{y:oe}=e.fromBytes(D),Ce=b.publicKey,fe=Ce===32;if(!fe&&Ce!==57)throw new Error("only defined for 25519 and 448");let Q=fe?o.div(Ri+oe,Ri-oe):o.div(oe-Ri,oe+Ri);return o.toBytes(Q)},toMontgomerySecret(D){let oe=b.secretKey;(0,kt._abytes2)(D,oe);let Ce=n(D.subarray(0,oe));return d(Ce).subarray(0,oe)},randomPrivateKey:V,precompute(D=8,oe=e.BASE){return oe.precompute(D,!1)}};return Object.freeze({keygen:pe,getPublicKey:h,sign:C,verify:S,utils:He,Point:e,lengths:b})}function YY(e){let n={a:e.a,d:e.d,p:e.Fp.ORDER,n:e.n,h:e.h,Gx:e.Gx,Gy:e.Gy},t=e.Fp,i=(0,WY.Field)(n.n,e.nBitLength,!0),r={Fp:t,Fn:i,uvRatio:e.uvRatio},o={randomBytes:e.randomBytes,adjustScalarBytes:e.adjustScalarBytes,domain:e.domain,prehash:e.prehash,mapToCurve:e.mapToCurve};return{CURVE:n,curveOpts:r,hash:e.hash,eddsaOpts:o}}function zY(e,n){let t=n.Point;return Object.assign({},n,{ExtendedPoint:t,CURVE:e,nBitLength:t.Fn.BITS,nByteLength:t.Fn.BYTES})}function ZY(e){let{CURVE:n,curveOpts:t,hash:i,eddsaOpts:r}=YY(e),o=TJ(n,t),a=xJ(o,i,r);return zY(e,a)}});var nC=I(Ds=>{"use strict";Object.defineProperty(Ds,"__esModule",{value:!0});Ds._DST_scalar=void 0;Ds.expand_message_xmd=MJ;Ds.expand_message_xof=HJ;Ds.hash_to_field=pI;Ds.isogenyMap=jY;Ds.createHasher=ez;var Ji=Od(),qJ=gc(),XY=Ji.bytesToNumberBE;function Ic(e,n){if(Al(e),Al(n),e<0||e>=1<<8*n)throw new Error("invalid I2OSP input: "+e);let t=Array.from({length:n}).fill(0);for(let i=n-1;i>=0;i--)t[i]=e&255,e>>>=8;return new Uint8Array(t)}function $Y(e,n){let t=new Uint8Array(e.length);for(let i=0;i<e.length;i++)t[i]=e[i]^n[i];return t}function Al(e){if(!Number.isSafeInteger(e))throw new Error("number expected")}function FJ(e){if(!(0,Ji.isBytes)(e)&&typeof e!="string")throw new Error("DST must be Uint8Array or string");return typeof e=="string"?(0,Ji.utf8ToBytes)(e):e}function MJ(e,n,t,i){(0,Ji.abytes)(e),Al(t),n=FJ(n),n.length>255&&(n=i((0,Ji.concatBytes)((0,Ji.utf8ToBytes)("H2C-OVERSIZE-DST-"),n)));let{outputLen:r,blockLen:o}=i,a=Math.ceil(t/r);if(t>65535||a>255)throw new Error("expand_message_xmd: invalid lenInBytes");let s=(0,Ji.concatBytes)(n,Ic(n.length,1)),d=Ic(0,o),u=Ic(t,2),f=new Array(a),p=i((0,Ji.concatBytes)(d,e,u,Ic(0,1),s));f[0]=i((0,Ji.concatBytes)(p,Ic(1,1),s));for(let h=1;h<=a;h++){let B=[$Y(p,f[h-1]),Ic(h+1,1),s];f[h]=i((0,Ji.concatBytes)(...B))}return(0,Ji.concatBytes)(...f).slice(0,t)}function HJ(e,n,t,i,r){if((0,Ji.abytes)(e),Al(t),n=FJ(n),n.length>255){let o=Math.ceil(2*i/8);n=r.create({dkLen:o}).update((0,Ji.utf8ToBytes)("H2C-OVERSIZE-DST-")).update(n).digest()}if(t>65535||n.length>255)throw new Error("expand_message_xof: invalid lenInBytes");return r.create({dkLen:t}).update(e).update(Ic(t,2)).update(n).update(Ic(n.length,1)).digest()}function pI(e,n,t){(0,Ji._validateObject)(t,{p:"bigint",m:"number",k:"number",hash:"function"});let{p:i,k:r,m:o,hash:a,expand:s,DST:d}=t;if(!(0,Ji.isHash)(t.hash))throw new Error("expected valid hash");(0,Ji.abytes)(e),Al(n);let u=i.toString(2).length,f=Math.ceil((u+r)/8),p=n*o*f,l;if(s==="xmd")l=MJ(e,d,p,a);else if(s==="xof")l=HJ(e,d,p,r,a);else if(s==="_internal_pass")l=e;else throw new Error('expand must be "xmd" or "xof"');let h=new Array(n);for(let B=0;B<n;B++){let C=new Array(o);for(let E=0;E<o;E++){let S=f*(E+B*o),N=l.subarray(S,S+f);C[E]=(0,qJ.mod)(XY(N),i)}h[B]=C}return h}function jY(e,n){let t=n.map(i=>Array.from(i).reverse());return(i,r)=>{let[o,a,s,d]=t.map(p=>p.reduce((l,h)=>e.add(e.mul(l,i),h))),[u,f]=(0,qJ.FpInvertBatch)(e,[a,d],!0);return i=e.mul(o,u),r=e.mul(r,e.mul(s,f)),{x:i,y:r}}}Ds._DST_scalar=(0,Ji.utf8ToBytes)("HashToScalar-");function ez(e,n,t){if(typeof n!="function")throw new Error("mapToCurve() must be defined");function i(o){return e.fromAffine(n(o))}function r(o){let a=o.clearCofactor();return a.equals(e.ZERO)?e.ZERO:(a.assertValidity(),a)}return{defaults:t,hashToCurve(o,a){let s=Object.assign({},t,a),d=pI(o,2,s),u=i(d[0]),f=i(d[1]);return r(u.add(f))},encodeToCurve(o,a){let s=t.encodeDST?{DST:t.encodeDST}:{},d=Object.assign({},t,s,a),u=pI(o,1,d),f=i(u[0]);return r(f)},mapToCurve(o){if(!Array.isArray(o))throw new Error("expected array of bigints");for(let a of o)if(typeof a!="bigint")throw new Error("expected array of bigints");return r(i(o))},hashToScalar(o,a){let s=e.Fn.ORDER,d=Object.assign({},t,{p:s,m:1,DST:Ds._DST_scalar},a);return pI(o,1,d)[0][0]}}}});var _J=I(tC=>{"use strict";Object.defineProperty(tC,"__esModule",{value:!0});tC.montgomery=rz;var Us=Od(),nz=gc(),fl=BigInt(0),rA=BigInt(1),II=BigInt(2);function tz(e){return(0,Us._validateObject)(e,{adjustScalarBytes:"function",powPminus2:"function"}),Object.freeze({...e})}function rz(e){let n=tz(e),{P:t,type:i,adjustScalarBytes:r,powPminus2:o,randomBytes:a}=n,s=i==="x25519";if(!s&&i!=="x448")throw new Error("invalid type");let d=a||Us.randomBytes,u=s?255:448,f=s?32:56,p=BigInt(s?9:5),l=BigInt(s?121665:39081),h=s?II**BigInt(254):II**BigInt(447),B=s?BigInt(8)*II**BigInt(251)-rA:BigInt(4)*II**BigInt(445)-rA,C=h+B+rA,E=Q=>(0,nz.mod)(Q,t),S=N(p);function N(Q){return(0,Us.numberToBytesLE)(E(Q),f)}function b(Q){let w=(0,Us.ensureBytes)("u coordinate",Q,f);return s&&(w[31]&=127),E((0,Us.bytesToNumberLE)(w))}function V(Q){return(0,Us.bytesToNumberLE)(r((0,Us.ensureBytes)("scalar",Q,f)))}function pe(Q,w){let P=He(b(w),V(Q));if(P===fl)throw new Error("invalid private or public key received");return N(P)}function we(Q){return pe(Q,S)}function Ye(Q,w,P){let M=E(Q*(w-P));return w=E(w-M),P=E(P+M),{x_2:w,x_3:P}}function He(Q,w){(0,Us.aInRange)("u",Q,fl,t),(0,Us.aInRange)("scalar",w,h,C);let P=w,M=Q,Y=rA,se=fl,J=Q,ae=rA,Ie=fl;for(let tt=BigInt(u-1);tt>=fl;tt--){let rt=P>>tt&rA;Ie^=rt,{x_2:Y,x_3:J}=Ye(Ie,Y,J),{x_2:se,x_3:ae}=Ye(Ie,se,ae),Ie=rt;let Qn=Y+se,lt=E(Qn*Qn),vt=Y-se,Ot=E(vt*vt),ut=lt-Ot,Kr=J+ae,ec=J-ae,Qs=E(ec*Qn),Kc=E(Kr*vt),Mf=Qs+Kc,fa=Qs-Kc;J=E(Mf*Mf),ae=E(M*E(fa*fa)),Y=E(lt*Ot),se=E(ut*(lt+E(l*ut)))}({x_2:Y,x_3:J}=Ye(Ie,Y,J)),{x_2:se,x_3:ae}=Ye(Ie,se,ae);let Pe=o(se);return E(Y*Pe)}let D={secretKey:f,publicKey:f,seed:f},oe=(Q=d(f))=>((0,Us.abytes)(Q,D.seed),Q);function Ce(Q){let w=oe(Q);return{secretKey:w,publicKey:we(w)}}return{keygen:Ce,getSharedSecret:(Q,w)=>pe(Q,w),getPublicKey:Q=>we(Q),scalarMult:pe,scalarMultBase:we,utils:{randomSecretKey:oe,randomPrivateKey:oe},GuBytes:S.slice(),lengths:D}}});var eq=I(En=>{"use strict";Object.defineProperty(En,"__esModule",{value:!0});En.hash_to_ristretto255=En.hashToRistretto255=En.encodeToCurve=En.hashToCurve=En.RistrettoPoint=En.edwardsToMontgomery=En.ED25519_TORSION_SUBGROUP=En.ristretto255_hasher=En.ristretto255=En.ed25519_hasher=En.x25519=En.ed25519ph=En.ed25519ctx=En.ed25519=void 0;En.edwardsToMontgomeryPub=jJ;En.edwardsToMontgomeryPriv=hz;var ll=ol(),yI=oa(),iz=gI(),mI=JJ(),hI=nC(),Dt=gc(),oz=_J(),su=Od(),az=BigInt(0),Ts=BigInt(1),BI=BigInt(2),KJ=BigInt(3),LJ=BigInt(5),aC=BigInt(8),Dd=BigInt("0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffed"),gl={p:Dd,n:BigInt("0x1000000000000000000000000000000014def9dea2f79cd65812631a5cf5d3ed"),h:aC,a:BigInt("0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffec"),d:BigInt("0x52036cee2b6ffe738cc740797779e89800700a4d4141d8ab75eb4dca135978a3"),Gx:BigInt("0x216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51a"),Gy:BigInt("0x6666666666666666666666666666666666666666666666666666666666666658")};function YJ(e){let n=BigInt(10),t=BigInt(20),i=BigInt(40),r=BigInt(80),o=Dd,s=e*e%o*e%o,d=(0,Dt.pow2)(s,BI,o)*s%o,u=(0,Dt.pow2)(d,Ts,o)*e%o,f=(0,Dt.pow2)(u,LJ,o)*u%o,p=(0,Dt.pow2)(f,n,o)*f%o,l=(0,Dt.pow2)(p,t,o)*p%o,h=(0,Dt.pow2)(l,i,o)*l%o,B=(0,Dt.pow2)(h,r,o)*h%o,C=(0,Dt.pow2)(B,r,o)*h%o,E=(0,Dt.pow2)(C,n,o)*f%o;return{pow_p_5_8:(0,Dt.pow2)(E,BI,o)*e%o,b2:s}}function zJ(e){return e[0]&=248,e[31]&=127,e[31]|=64,e}var rC=BigInt("19681161376707505956807079304988542015446066515923890162744021073123829784752");function sC(e,n){let t=Dd,i=(0,Dt.mod)(n*n*n,t),r=(0,Dt.mod)(i*i*n,t),o=YJ(e*r).pow_p_5_8,a=(0,Dt.mod)(e*i*o,t),s=(0,Dt.mod)(n*a*a,t),d=a,u=(0,Dt.mod)(a*rC,t),f=s===e,p=s===(0,Dt.mod)(-e,t),l=s===(0,Dt.mod)(-e*rC,t);return f&&(a=d),(p||l)&&(a=u),(0,Dt.isNegativeLE)(a,t)&&(a=(0,Dt.mod)(-a,t)),{isValid:f||p,value:a}}var Qe=(0,Dt.Field)(gl.p,{isLE:!0}),ZJ=(0,Dt.Field)(gl.n,{isLE:!0}),dC={...gl,Fp:Qe,hash:ll.sha512,adjustScalarBytes:zJ,uvRatio:sC};En.ed25519=(0,mI.twistedEdwards)(dC);function XJ(e,n,t){if(n.length>255)throw new Error("Context is too big");return(0,yI.concatBytes)((0,yI.utf8ToBytes)("SigEd25519 no Ed25519 collisions"),new Uint8Array([t?1:0,n.length]),n,e)}En.ed25519ctx=(0,mI.twistedEdwards)({...dC,domain:XJ});En.ed25519ph=(0,mI.twistedEdwards)(Object.assign({},dC,{domain:XJ,prehash:ll.sha512}));En.x25519=(()=>{let e=Qe.ORDER;return(0,oz.montgomery)({P:e,type:"x25519",powPminus2:n=>{let{pow_p_5_8:t,b2:i}=YJ(n);return(0,Dt.mod)((0,Dt.pow2)(t,KJ,e)*i,e)},adjustScalarBytes:zJ})})();var sz=(Dd+KJ)/aC,dz=Qe.pow(BI,sz),GJ=Qe.sqrt(Qe.neg(Qe.ONE));function cz(e){let n=(Dd-LJ)/aC,t=BigInt(486662),i=Qe.sqr(e);i=Qe.mul(i,BI);let r=Qe.add(i,Qe.ONE),o=Qe.neg(t),a=Qe.sqr(r),s=Qe.mul(a,r),d=Qe.mul(i,t);d=Qe.mul(d,o),d=Qe.add(d,a),d=Qe.mul(d,o);let u=Qe.sqr(s);a=Qe.sqr(u),u=Qe.mul(u,s),u=Qe.mul(u,d),a=Qe.mul(a,u);let f=Qe.pow(a,n);f=Qe.mul(f,u);let p=Qe.mul(f,GJ);a=Qe.sqr(f),a=Qe.mul(a,s);let l=Qe.eql(a,d),h=Qe.cmov(p,f,l),B=Qe.mul(o,i),C=Qe.mul(f,e);C=Qe.mul(C,dz);let E=Qe.mul(C,GJ),S=Qe.mul(d,i);a=Qe.sqr(C),a=Qe.mul(a,s);let N=Qe.eql(a,S),b=Qe.cmov(E,C,N);a=Qe.sqr(h),a=Qe.mul(a,s);let V=Qe.eql(a,d),pe=Qe.cmov(B,o,V),we=Qe.cmov(b,h,V),Ye=Qe.isOdd(we);return we=Qe.cmov(we,Qe.neg(we),V!==Ye),{xMn:pe,xMd:r,yMn:we,yMd:Ts}}var uz=(0,Dt.FpSqrtEven)(Qe,Qe.neg(BigInt(486664)));function Az(e){let{xMn:n,xMd:t,yMn:i,yMd:r}=cz(e),o=Qe.mul(n,r);o=Qe.mul(o,uz);let a=Qe.mul(t,i),s=Qe.sub(n,t),d=Qe.add(n,t),u=Qe.mul(a,d),f=Qe.eql(u,Qe.ZERO);o=Qe.cmov(o,Qe.ZERO,f),a=Qe.cmov(a,Qe.ONE,f),s=Qe.cmov(s,Qe.ONE,f),d=Qe.cmov(d,Qe.ONE,f);let[p,l]=(0,Dt.FpInvertBatch)(Qe,[a,d],!0);return{x:Qe.mul(o,p),y:Qe.mul(s,l)}}En.ed25519_hasher=(0,hI.createHasher)(En.ed25519.Point,e=>Az(e[0]),{DST:"edwards25519_XMD:SHA-512_ELL2_RO_",encodeDST:"edwards25519_XMD:SHA-512_ELL2_NU_",p:Dd,m:1,k:128,expand:"xmd",hash:ll.sha512});var iC=rC,fz=BigInt("25063068953384623474111414158702152701244531502492656460079210482610430750235"),lz=BigInt("54469307008909316920995813868745141605393597292927456921205312896311721017578"),gz=BigInt("1159843021668779879193775521855586647937357759715417654439879720876111806838"),pz=BigInt("40440834346308536858101042469323190826248399146238708352240133220865137265952"),VJ=e=>sC(Ts,e),Iz=BigInt("0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"),oC=e=>En.ed25519.Point.Fp.create((0,su.bytesToNumberLE)(e)&Iz);function WJ(e){let{d:n}=gl,t=Dd,i=S=>Qe.create(S),r=i(iC*e*e),o=i((r+Ts)*gz),a=BigInt(-1),s=i((a-n*r)*i(r+n)),{isValid:d,value:u}=sC(o,s),f=i(u*e);(0,Dt.isNegativeLE)(f,t)||(f=i(-f)),d||(u=f),d||(a=r);let p=i(a*(r-Ts)*pz-s),l=u*u,h=i((u+u)*s),B=i(p*fz),C=i(Ts-l),E=i(Ts+l);return new En.ed25519.Point(i(h*E),i(C*B),i(B*E),i(h*C))}function $J(e){(0,yI.abytes)(e,64);let n=oC(e.subarray(0,32)),t=WJ(n),i=oC(e.subarray(32,64)),r=WJ(i);return new es(t.add(r))}var es=class e extends mI.PrimeEdwardsPoint{constructor(n){super(n)}static fromAffine(n){return new e(En.ed25519.Point.fromAffine(n))}assertSame(n){if(!(n instanceof e))throw new Error("RistrettoPoint expected")}init(n){return new e(n)}static hashToCurve(n){return $J((0,su.ensureBytes)("ristrettoHash",n,64))}static fromBytes(n){(0,yI.abytes)(n,32);let{a:t,d:i}=gl,r=Dd,o=V=>Qe.create(V),a=oC(n);if(!(0,su.equalBytes)(Qe.toBytes(a),n)||(0,Dt.isNegativeLE)(a,r))throw new Error("invalid ristretto255 encoding 1");let s=o(a*a),d=o(Ts+t*s),u=o(Ts-t*s),f=o(d*d),p=o(u*u),l=o(t*i*f-p),{isValid:h,value:B}=VJ(o(l*p)),C=o(B*u),E=o(B*C*l),S=o((a+a)*C);(0,Dt.isNegativeLE)(S,r)&&(S=o(-S));let N=o(d*E),b=o(S*N);if(!h||(0,Dt.isNegativeLE)(b,r)||N===az)throw new Error("invalid ristretto255 encoding 2");return new e(new En.ed25519.Point(S,N,Ts,b))}static fromHex(n){return e.fromBytes((0,su.ensureBytes)("ristrettoHex",n,32))}static msm(n,t){return(0,iz.pippenger)(e,En.ed25519.Point.Fn,n,t)}toBytes(){let{X:n,Y:t,Z:i,T:r}=this.ep,o=Dd,a=E=>Qe.create(E),s=a(a(i+t)*a(i-t)),d=a(n*t),u=a(d*d),{value:f}=VJ(a(s*u)),p=a(f*s),l=a(f*d),h=a(p*l*r),B;if((0,Dt.isNegativeLE)(r*h,o)){let E=a(t*iC),S=a(n*iC);n=E,t=S,B=a(p*lz)}else B=l;(0,Dt.isNegativeLE)(n*h,o)&&(t=a(-t));let C=a((i-t)*B);return(0,Dt.isNegativeLE)(C,o)&&(C=a(-C)),Qe.toBytes(C)}equals(n){this.assertSame(n);let{X:t,Y:i}=this.ep,{X:r,Y:o}=n.ep,a=u=>Qe.create(u),s=a(t*o)===a(i*r),d=a(i*o)===a(t*r);return s||d}is0(){return this.equals(e.ZERO)}};es.BASE=new es(En.ed25519.Point.BASE);es.ZERO=new es(En.ed25519.Point.ZERO);es.Fp=Qe;es.Fn=ZJ;En.ristretto255={Point:es};En.ristretto255_hasher={hashToCurve(e,n){let t=n?.DST||"ristretto255_XMD:SHA-512_R255MAP_RO_",i=(0,hI.expand_message_xmd)(e,t,64,ll.sha512);return $J(i)},hashToScalar(e,n={DST:hI._DST_scalar}){let t=(0,hI.expand_message_xmd)(e,n.DST,64,ll.sha512);return ZJ.create((0,su.bytesToNumberLE)(t))}};En.ED25519_TORSION_SUBGROUP=["0100000000000000000000000000000000000000000000000000000000000000","c7176a703d4dd84fba3c0b760d10670f2a2053fa2c39ccc64ec7fd7792ac037a","0000000000000000000000000000000000000000000000000000000000000080","26e8958fc2b227b045c3f489f2ef98f0d5dfac05d3c63339b13802886d53fc05","ecffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff7f","26e8958fc2b227b045c3f489f2ef98f0d5dfac05d3c63339b13802886d53fc85","0000000000000000000000000000000000000000000000000000000000000000","c7176a703d4dd84fba3c0b760d10670f2a2053fa2c39ccc64ec7fd7792ac03fa"];function jJ(e){return En.ed25519.utils.toMontgomery((0,su.ensureBytes)("pub",e))}En.edwardsToMontgomery=jJ;function hz(e){return En.ed25519.utils.toMontgomerySecret((0,su.ensureBytes)("pub",e))}En.RistrettoPoint=es;En.hashToCurve=En.ed25519_hasher.hashToCurve;En.encodeToCurve=En.ed25519_hasher.encodeToCurve;En.hashToRistretto255=En.ristretto255_hasher.hashToCurve;En.hash_to_ristretto255=En.ristretto255_hasher.hashToCurve});var nq=I(iA=>{"use strict";Object.defineProperty(iA,"__esModule",{value:!0});iA.Ed25519=iA.Ed25519Keypair=void 0;var cC=eq(),CI=class e{static fromLibsodiumPrivkey(n){if(n.length!==64)throw new Error(`Unexpected key length ${n.length}. Must be 64.`);return new e(n.slice(0,32),n.slice(32,64))}privkey;pubkey;constructor(n,t){this.privkey=n,this.pubkey=t}toLibsodiumPrivkey(){return new Uint8Array([...this.privkey,...this.pubkey])}};iA.Ed25519Keypair=CI;var uC=class{static async makeKeypair(n){let t=cC.ed25519.getPublicKey(n);return new CI(n,t)}static async createSignature(n,t){return cC.ed25519.sign(n,t.privkey)}static async verifySignature(n,t,i){return cC.ed25519.verify(n,t,i)}};iA.Ed25519=uC});var fC=I(SI=>{"use strict";Object.defineProperty(SI,"__esModule",{value:!0});SI.Hmac=void 0;var yz=kn(),AC=class{blockSize;messageHasher;oKeyPad;iKeyPad;hash;constructor(n,t){let i=new n().blockSize;this.hash=o=>(0,yz.fixUint8Array)(new n().update(o).digest());let r=t;if(r.length>i&&(r=this.hash(r)),r.length<i){let o=new Uint8Array(i-r.length);r=new Uint8Array([...r,...o])}this.oKeyPad=r.map(o=>o^92),this.iKeyPad=r.map(o=>o^54),this.messageHasher=new n,this.blockSize=i,this.update(this.iKeyPad)}update(n){return this.messageHasher.update(n),this}digest(){let n=this.messageHasher.digest();return this.hash(new Uint8Array([...this.oKeyPad,...n]))}};SI.Hmac=AC});var uq=I(dr=>{"use strict";Object.defineProperty(dr,"__esModule",{value:!0});dr.shake256=dr.shake128=dr.keccak_512=dr.keccak_384=dr.keccak_256=dr.keccak_224=dr.sha3_512=dr.sha3_384=dr.sha3_256=dr.sha3_224=dr.Keccak=void 0;dr.keccakP=dq;var Il=Pm(),$i=oa(),Bz=BigInt(0),pl=BigInt(1),mz=BigInt(2),Cz=BigInt(7),Sz=BigInt(256),kz=BigInt(113),iq=[],oq=[],aq=[];for(let e=0,n=pl,t=1,i=0;e<24;e++){[t,i]=[i,(2*t+3*i)%5],iq.push(2*(5*i+t)),oq.push((e+1)*(e+2)/2%64);let r=Bz;for(let o=0;o<7;o++)n=(n<<pl^(n>>Cz)*kz)%Sz,n&mz&&(r^=pl<<(pl<<BigInt(o))-pl);aq.push(r)}var sq=(0,Il.split)(aq,!0),Ez=sq[0],Qz=sq[1],tq=(e,n,t)=>t>32?(0,Il.rotlBH)(e,n,t):(0,Il.rotlSH)(e,n,t),rq=(e,n,t)=>t>32?(0,Il.rotlBL)(e,n,t):(0,Il.rotlSL)(e,n,t);function dq(e,n=24){let t=new Uint32Array(10);for(let i=24-n;i<24;i++){for(let a=0;a<10;a++)t[a]=e[a]^e[a+10]^e[a+20]^e[a+30]^e[a+40];for(let a=0;a<10;a+=2){let s=(a+8)%10,d=(a+2)%10,u=t[d],f=t[d+1],p=tq(u,f,1)^t[s],l=rq(u,f,1)^t[s+1];for(let h=0;h<50;h+=10)e[a+h]^=p,e[a+h+1]^=l}let r=e[2],o=e[3];for(let a=0;a<24;a++){let s=oq[a],d=tq(r,o,s),u=rq(r,o,s),f=iq[a];r=e[f],o=e[f+1],e[f]=d,e[f+1]=u}for(let a=0;a<50;a+=10){for(let s=0;s<10;s++)t[s]=e[a+s];for(let s=0;s<10;s++)e[a+s]^=~t[(s+2)%10]&t[(s+4)%10]}e[0]^=Ez[i],e[1]^=Qz[i]}(0,$i.clean)(t)}var hl=class e extends $i.Hash{constructor(n,t,i,r=!1,o=24){if(super(),this.pos=0,this.posOut=0,this.finished=!1,this.destroyed=!1,this.enableXOF=!1,this.blockLen=n,this.suffix=t,this.outputLen=i,this.enableXOF=r,this.rounds=o,(0,$i.anumber)(i),!(0<n&&n<200))throw new Error("only keccak-f1600 function is supported");this.state=new Uint8Array(200),this.state32=(0,$i.u32)(this.state)}clone(){return this._cloneInto()}keccak(){(0,$i.swap32IfBE)(this.state32),dq(this.state32,this.rounds),(0,$i.swap32IfBE)(this.state32),this.posOut=0,this.pos=0}update(n){(0,$i.aexists)(this),n=(0,$i.toBytes)(n),(0,$i.abytes)(n);let{blockLen:t,state:i}=this,r=n.length;for(let o=0;o<r;){let a=Math.min(t-this.pos,r-o);for(let s=0;s<a;s++)i[this.pos++]^=n[o++];this.pos===t&&this.keccak()}return this}finish(){if(this.finished)return;this.finished=!0;let{state:n,suffix:t,pos:i,blockLen:r}=this;n[i]^=t,(t&128)!==0&&i===r-1&&this.keccak(),n[r-1]^=128,this.keccak()}writeInto(n){(0,$i.aexists)(this,!1),(0,$i.abytes)(n),this.finish();let t=this.state,{blockLen:i}=this;for(let r=0,o=n.length;r<o;){this.posOut>=i&&this.keccak();let a=Math.min(i-this.posOut,o-r);n.set(t.subarray(this.posOut,this.posOut+a),r),this.posOut+=a,r+=a}return n}xofInto(n){if(!this.enableXOF)throw new Error("XOF is not possible for this instance");return this.writeInto(n)}xof(n){return(0,$i.anumber)(n),this.xofInto(new Uint8Array(n))}digestInto(n){if((0,$i.aoutput)(n,this),this.finished)throw new Error("digest() was already called");return this.writeInto(n),this.destroy(),n}digest(){return this.digestInto(new Uint8Array(this.outputLen))}destroy(){this.destroyed=!0,(0,$i.clean)(this.state)}_cloneInto(n){let{blockLen:t,suffix:i,outputLen:r,rounds:o,enableXOF:a}=this;return n||(n=new e(t,i,r,a,o)),n.state32.set(this.state32),n.pos=this.pos,n.posOut=this.posOut,n.finished=this.finished,n.rounds=o,n.suffix=i,n.outputLen=r,n.enableXOF=a,n.destroyed=this.destroyed,n}};dr.Keccak=hl;var hc=(e,n,t)=>(0,$i.createHasher)(()=>new hl(n,e,t));dr.sha3_224=hc(6,144,224/8);dr.sha3_256=hc(6,136,256/8);dr.sha3_384=hc(6,104,384/8);dr.sha3_512=hc(6,72,512/8);dr.keccak_224=hc(1,144,224/8);dr.keccak_256=hc(1,136,256/8);dr.keccak_384=hc(1,104,384/8);dr.keccak_512=hc(1,72,512/8);var cq=(e,n,t)=>(0,$i.createXOFer)((i={})=>new hl(n,e,i.dkLen===void 0?t:i.dkLen,!0));dr.shake128=cq(31,168,128/8);dr.shake256=cq(31,136,256/8)});var kI=I(lC=>{"use strict";Object.defineProperty(lC,"__esModule",{value:!0});lC.toRealUint8Array=wz;function wz(e){return e instanceof Uint8Array?e:Uint8Array.from(e)}});var Aq=I(yl=>{"use strict";Object.defineProperty(yl,"__esModule",{value:!0});yl.Keccak256=void 0;yl.keccak256=Nz;var Rz=kn(),bz=uq(),Pz=kI(),EI=class{blockSize=512/8;impl=bz.keccak_256.create();constructor(n){n&&this.update(n)}update(n){return this.impl.update((0,Pz.toRealUint8Array)(n)),this}digest(){return(0,Rz.fixUint8Array)(this.impl.digest())}};yl.Keccak256=EI;function Nz(e){return new EI(e).digest()}});var fq=I(QI=>{"use strict";Object.defineProperty(QI,"__esModule",{value:!0});QI.Random=void 0;var gC=class{static getBytes(n){let t=new Uint8Array(n);return globalThis.crypto.getRandomValues(t),t}};QI.Random=gC});var Bq=I(Mo=>{"use strict";Object.defineProperty(Mo,"__esModule",{value:!0});Mo.ripemd160=Mo.RIPEMD160=Mo.md5=Mo.MD5=Mo.sha1=Mo.SHA1=void 0;var du=wm(),qi=oa(),oA=Uint32Array.from([1732584193,4023233417,2562383102,271733878,3285377520]),yc=new Uint32Array(80),bI=class extends du.HashMD{constructor(){super(64,20,8,!1),this.A=oA[0]|0,this.B=oA[1]|0,this.C=oA[2]|0,this.D=oA[3]|0,this.E=oA[4]|0}get(){let{A:n,B:t,C:i,D:r,E:o}=this;return[n,t,i,r,o]}set(n,t,i,r,o){this.A=n|0,this.B=t|0,this.C=i|0,this.D=r|0,this.E=o|0}process(n,t){for(let d=0;d<16;d++,t+=4)yc[d]=n.getUint32(t,!1);for(let d=16;d<80;d++)yc[d]=(0,qi.rotl)(yc[d-3]^yc[d-8]^yc[d-14]^yc[d-16],1);let{A:i,B:r,C:o,D:a,E:s}=this;for(let d=0;d<80;d++){let u,f;d<20?(u=(0,du.Chi)(r,o,a),f=1518500249):d<40?(u=r^o^a,f=1859775393):d<60?(u=(0,du.Maj)(r,o,a),f=2400959708):(u=r^o^a,f=3395469782);let p=(0,qi.rotl)(i,5)+u+s+f+yc[d]|0;s=a,a=o,o=(0,qi.rotl)(r,30),r=i,i=p}i=i+this.A|0,r=r+this.B|0,o=o+this.C|0,a=a+this.D|0,s=s+this.E|0,this.set(i,r,o,a,s)}roundClean(){(0,qi.clean)(yc)}destroy(){this.set(0,0,0,0,0),(0,qi.clean)(this.buffer)}};Mo.SHA1=bI;Mo.sha1=(0,qi.createHasher)(()=>new bI);var vz=Math.pow(2,32),Oz=Array.from({length:64},(e,n)=>Math.floor(vz*Math.abs(Math.sin(n+1)))),wI=oA.slice(0,4),pC=new Uint32Array(16),PI=class extends du.HashMD{constructor(){super(64,16,8,!0),this.A=wI[0]|0,this.B=wI[1]|0,this.C=wI[2]|0,this.D=wI[3]|0}get(){let{A:n,B:t,C:i,D:r}=this;return[n,t,i,r]}set(n,t,i,r){this.A=n|0,this.B=t|0,this.C=i|0,this.D=r|0}process(n,t){for(let s=0;s<16;s++,t+=4)pC[s]=n.getUint32(t,!0);let{A:i,B:r,C:o,D:a}=this;for(let s=0;s<64;s++){let d,u,f;s<16?(d=(0,du.Chi)(r,o,a),u=s,f=[7,12,17,22]):s<32?(d=(0,du.Chi)(a,r,o),u=(5*s+1)%16,f=[5,9,14,20]):s<48?(d=r^o^a,u=(3*s+5)%16,f=[4,11,16,23]):(d=o^(r|~a),u=7*s%16,f=[6,10,15,21]),d=d+i+Oz[s]+pC[u],i=a,a=o,o=r,r=r+(0,qi.rotl)(d,f[s%4])}i=i+this.A|0,r=r+this.B|0,o=o+this.C|0,a=a+this.D|0,this.set(i,r,o,a)}roundClean(){(0,qi.clean)(pC)}destroy(){this.set(0,0,0,0),(0,qi.clean)(this.buffer)}};Mo.MD5=PI;Mo.md5=(0,qi.createHasher)(()=>new PI);var Dz=Uint8Array.from([7,4,13,1,10,6,15,3,12,0,9,5,2,14,11,8]),gq=Uint8Array.from(new Array(16).fill(0).map((e,n)=>n)),Uz=gq.map(e=>(9*e+5)%16),pq=(()=>{let t=[[gq],[Uz]];for(let i=0;i<4;i++)for(let r of t)r.push(r[i].map(o=>Dz[o]));return t})(),Iq=pq[0],hq=pq[1],yq=[[11,14,15,12,5,8,7,9,11,13,14,15,6,7,9,8],[12,13,11,15,6,9,9,7,12,15,11,13,7,8,7,7],[13,15,14,11,7,7,6,8,13,14,13,12,5,5,6,9],[14,11,12,14,8,6,5,5,15,12,15,14,9,9,8,6],[15,12,13,13,9,5,8,6,14,11,12,11,8,6,5,5]].map(e=>Uint8Array.from(e)),Tz=Iq.map((e,n)=>e.map(t=>yq[n][t])),xz=hq.map((e,n)=>e.map(t=>yq[n][t])),Jz=Uint32Array.from([0,1518500249,1859775393,2400959708,2840853838]),qz=Uint32Array.from([1352829926,1548603684,1836072691,2053994217,0]);function lq(e,n,t,i){return e===0?n^t^i:e===1?n&t|~n&i:e===2?(n|~t)^i:e===3?n&i|t&~i:n^(t|~i)}var RI=new Uint32Array(16),NI=class extends du.HashMD{constructor(){super(64,20,8,!0),this.h0=1732584193,this.h1=-271733879,this.h2=-1732584194,this.h3=271733878,this.h4=-1009589776}get(){let{h0:n,h1:t,h2:i,h3:r,h4:o}=this;return[n,t,i,r,o]}set(n,t,i,r,o){this.h0=n|0,this.h1=t|0,this.h2=i|0,this.h3=r|0,this.h4=o|0}process(n,t){for(let h=0;h<16;h++,t+=4)RI[h]=n.getUint32(t,!0);let i=this.h0|0,r=i,o=this.h1|0,a=o,s=this.h2|0,d=s,u=this.h3|0,f=u,p=this.h4|0,l=p;for(let h=0;h<5;h++){let B=4-h,C=Jz[h],E=qz[h],S=Iq[h],N=hq[h],b=Tz[h],V=xz[h];for(let pe=0;pe<16;pe++){let we=(0,qi.rotl)(i+lq(h,o,s,u)+RI[S[pe]]+C,b[pe])+p|0;i=p,p=u,u=(0,qi.rotl)(s,10)|0,s=o,o=we}for(let pe=0;pe<16;pe++){let we=(0,qi.rotl)(r+lq(B,a,d,f)+RI[N[pe]]+E,V[pe])+l|0;r=l,l=f,f=(0,qi.rotl)(d,10)|0,d=a,a=we}}this.set(this.h1+s+f|0,this.h2+u+l|0,this.h3+p+r|0,this.h4+i+a|0,this.h0+o+d|0)}roundClean(){(0,qi.clean)(RI)}destroy(){this.destroyed=!0,(0,qi.clean)(this.buffer),this.set(0,0,0,0,0)}};Mo.RIPEMD160=NI;Mo.ripemd160=(0,qi.createHasher)(()=>new NI)});var mq=I(Bl=>{"use strict";Object.defineProperty(Bl,"__esModule",{value:!0});Bl.Ripemd160=void 0;Bl.ripemd160=_z;var Fz=kn(),Mz=Bq(),Hz=kI(),vI=class{blockSize=512/8;impl=Mz.ripemd160.create();constructor(n){n&&this.update(n)}update(n){return this.impl.update((0,Hz.toRealUint8Array)(n)),this}digest(){return(0,Fz.fixUint8Array)(this.impl.digest())}};Bl.Ripemd160=vI;function _z(e){return new vI(e).digest()}});var mC=I(cr=>{"use strict";Object.defineProperty(cr,"__esModule",{value:!0});cr.DER=cr.DERErr=void 0;cr._splitEndoScalar=Sq;cr._normFnElement=Bc;cr.weierstrassN=BC;cr.SWUFpSqrtRatio=Eq;cr.mapToCurveSimpleSWU=Wz;cr.ecdh=wq;cr.ecdsa=Rq;cr.weierstrassPoints=Kz;cr._legacyHelperEquat=Pq;cr.weierstrass=Zz;var Gz=Em(),Vz=oa(),Xe=Od(),Ud=gI(),sA=gc(),Cq=(e,n)=>(e+(e>=0?n:-n)/xs)/n;function Sq(e,n,t){let[[i,r],[o,a]]=n,s=Cq(a*e,t),d=Cq(-r*e,t),u=e-s*i-d*o,f=-s*r-d*a,p=u<ns,l=f<ns;p&&(u=-u),l&&(f=-f);let h=(0,Xe.bitMask)(Math.ceil((0,Xe.bitLen)(t)/2))+Fi;if(u<ns||u>=h||f<ns||f>=h)throw new Error("splitScalar (endomorphism): failed, k="+e);return{k1neg:p,k1:u,k2neg:l,k2:f}}function hC(e){if(!["compact","recovered","der"].includes(e))throw new Error('Signature format must be "compact", "recovered", or "der"');return e}function IC(e,n){let t={};for(let i of Object.keys(n))t[i]=e[i]===void 0?n[i]:e[i];return(0,Xe._abool2)(t.lowS,"lowS"),(0,Xe._abool2)(t.prehash,"prehash"),t.format!==void 0&&hC(t.format),t}var OI=class extends Error{constructor(n=""){super(n)}};cr.DERErr=OI;cr.DER={Err:OI,_tlv:{encode:(e,n)=>{let{Err:t}=cr.DER;if(e<0||e>256)throw new t("tlv.encode: wrong tag");if(n.length&1)throw new t("tlv.encode: unpadded data");let i=n.length/2,r=(0,Xe.numberToHexUnpadded)(i);if(r.length/2&128)throw new t("tlv.encode: long form length too big");let o=i>127?(0,Xe.numberToHexUnpadded)(r.length/2|128):"";return(0,Xe.numberToHexUnpadded)(e)+o+r+n},decode(e,n){let{Err:t}=cr.DER,i=0;if(e<0||e>256)throw new t("tlv.encode: wrong tag");if(n.length<2||n[i++]!==e)throw new t("tlv.decode: wrong tlv");let r=n[i++],o=!!(r&128),a=0;if(!o)a=r;else{let d=r&127;if(!d)throw new t("tlv.decode(long): indefinite length not supported");if(d>4)throw ne×mvóMÊ×¬¢h­µçPY™\ÜÊKK˜[[Ý[OO]›ÚY	‰Š‹˜[[Ý[YK˜[[Ý[Þ]ÛÚ[‹Ò”ÓÓŠK˜[[Ý[
N›ÚY
KŸKœ›ÛT\X[
J^Û]V“Š
NÜ™]\›ˆ‹™[YØ]ÜY™\ÜÏYK™[YØ]ÜY™\ÜÏÏÈˆ‹‹˜[Y]Ü”Ü˜ÐY™\ÜÏYK˜[Y]Ü”Ü˜ÐY™\ÜÏÏÈˆ‹‹˜[Y]Ü‘ÝY™\ÜÏYK˜[Y]Ü‘ÝY™\ÜÏÏÈˆ‹K˜[[Ý[OO]›ÚY	‰™K˜[[Ý[OO[[	‰Š‹˜[[Ý[^]ÛÚ[‹™œ›ÛT\X[
K˜[[Ý[
JKŸ_NÙ[˜Ý[ÛˆŠ
^Ü™]\›žØÛÛ\][Û•[YNžË•[Y\Ý[\™œ›ÛT\X[
ßJ__TÛ‹“\ÙÐ™YÚ[”™Y[YØ]T™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK“\ÙÐ™YÚ[”™Y[YØ]T™\ÜÛœÙH‹[˜ÛÙJKR[‹š[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK˜ÛÛ\][Û•[YHOO]›ÚY	‰žË•[Y\Ý[\™[˜ÛÙJK˜ÛÛ\][Û•[YK‹Z[ÌŠL
K™›ÜšÊ
JK›[[J
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ[‹š[˜\žT™XY\ÙN›™]È[‹š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹VŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÛÏŒÏOOLOÜ‹˜ÛÛ\][Û•[YO^Ë•[Y\Ý[\™XÛÙJZ[ÌŠ
JNœÚÚ\\JÉÊ_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]VŠ
NÜ™]\›Š]š\ÔÙ]
JK˜ÛÛ\][Û•[YJI‰Š‹˜ÛÛ\][Û•[YOJ]™œ›ÛRœÛÛ•[Y\Ý[\
JK˜ÛÛ\][Û•[YJJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK˜ÛÛ\][Û•[YHOO]›ÚY	‰Š‹˜ÛÛ\][Û•[YOJ]™œ›ÛU[Y\Ý[\
JK˜ÛÛ\][Û•[YJKÒTÓÔÝš[™Ê
JKŸKœ›ÛT\X[
J^Û]VŠ
NÜ™]\›ˆK˜ÛÛ\][Û•[YHOO]›ÚY	‰™K˜ÛÛ\][Û•[YHOO[[	‰Š‹˜ÛÛ\][Û•[YO^Ë•[Y\Ý[\™œ›ÛT\X[
K˜ÛÛ\][Û•[YJJKŸ_NÙ[˜Ý[Ûˆ	Š
^Ü™]\›žÙ[YØ]ÜY™\ÜÎˆˆ‹˜[Y]ÜY™\ÜÎˆˆ‹[[Ý[ž]ÛÚ[‹™œ›ÛT\X[
ßJ__TÛ‹“\ÙÕ[™[YØ]O^Ý\U\›ˆ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK“\ÙÕ[™[YØ]H‹[˜ÛÙJKR[‹š[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK™[YØ]ÜY™\ÜÈOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊK™[YØ]ÜY™\ÜÊKK˜[Y]ÜY™\ÜÈOOHˆ‰‰›‹Z[ÌŠN
KœÝš[™ÊK˜[Y]ÜY™\ÜÊKK˜[[Ý[OO]›ÚY	‰ž]ÛÚ[‹™[˜ÛÙJK˜[[Ý[‹Z[ÌŠŠK™›ÜšÊ
JK›[[J
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ[‹š[˜\žT™XY\ÙN›™]È[‹š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹IŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹™[YØ]ÜY™\ÜÏ]œÝš[™Ê
NØœ™XZÎØØ\ÙHŽœ‹˜[Y]ÜY™\ÜÏ]œÝš[™Ê
NØœ™XZÎØØ\ÙHÎœ‹˜[[Ý[^]ÛÚ[‹™XÛÙJZ[ÌŠ
JNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]IŠ
NÜ™]\›Š]š\ÔÙ]
JK™[YØ]ÜY™\ÜÊI‰Š‹™[YØ]ÜY™\ÜÏTÝš[™ÊK™[YØ]ÜY™\ÜÊJK
]š\ÔÙ]
JK˜[Y]ÜY™\ÜÊI‰Š‹˜[Y]ÜY™\ÜÏTÝš[™ÊK˜[Y]ÜY™\ÜÊJK
]š\ÔÙ]
JK˜[[Ý[
I‰Š‹˜[[Ý[^]ÛÚ[‹™œ›ÛR”ÓÓŠK˜[[Ý[
JKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK™[YØ]ÜY™\ÜÈOO]›ÚY	‰Š‹™[YØ]ÜY™\ÜÏYK™[YØ]ÜY™\ÜÊKK˜[Y]ÜY™\ÜÈOO]›ÚY	‰Š‹˜[Y]ÜY™\ÜÏYK˜[Y]ÜY™\ÜÊKK˜[[Ý[OO]›ÚY	‰Š‹˜[[Ý[YK˜[[Ý[Þ]ÛÚ[‹Ò”ÓÓŠK˜[[Ý[
N›ÚY
KŸKœ›ÛT\X[
J^Û]IŠ
NÜ™]\›ˆ‹™[YØ]ÜY™\ÜÏYK™[YØ]ÜY™\ÜÏÏÈˆ‹‹˜[Y]ÜY™\ÜÏYK˜[Y]ÜY™\ÜÏÏÈˆ‹K˜[[Ý[OO]›ÚY	‰™K˜[[Ý[OO[[	‰Š‹˜[[Ý[^]ÛÚ[‹™œ›ÛT\X[
K˜[[Ý[
JKŸ_NÙ[˜Ý[Ûˆ“Š
^Ü™]\›žØÛÛ\][Û•[YNžË•[Y\Ý[\™œ›ÛT\X[
ßJK[[Ý[ž]ÛÚ[‹™œ›ÛT\X[
ßJ__TÛ‹“\ÙÕ[™[YØ]T™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK“\ÙÕ[™[YØ]T™\ÜÛœÙH‹[˜ÛÙJKR[‹š[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK˜ÛÛ\][Û•[YHOO]›ÚY	‰žË•[Y\Ý[\™[˜ÛÙJK˜ÛÛ\][Û•[YK‹Z[ÌŠL
K™›ÜšÊ
JK›[[J
KK˜[[Ý[OO]›ÚY	‰ž]ÛÚ[‹™[˜ÛÙJK˜[[Ý[‹Z[ÌŠN
K™›ÜšÊ
JK›[[J
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ[‹š[˜\žT™XY\ÙN›™]È[‹š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹Z“Š
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹˜ÛÛ\][Û•[YO^Ë•[Y\Ý[\™XÛÙJZ[ÌŠ
JNØœ™XZÎØØ\ÙHŽœ‹˜[[Ý[^]ÛÚ[‹™XÛÙJZ[ÌŠ
JNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]Z“Š
NÜ™]\›Š]š\ÔÙ]
JK˜ÛÛ\][Û•[YJI‰Š‹˜ÛÛ\][Û•[YOJ]™œ›ÛRœÛÛ•[Y\Ý[\
JK˜ÛÛ\][Û•[YJJK
]š\ÔÙ]
JK˜[[Ý[
I‰Š‹˜[[Ý[^]ÛÚ[‹™œ›ÛR”ÓÓŠK˜[[Ý[
JKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK˜ÛÛ\][Û•[YHOO]›ÚY	‰Š‹˜ÛÛ\][Û•[YOJ]™œ›ÛU[Y\Ý[\
JK˜ÛÛ\][Û•[YJKÒTÓÔÝš[™Ê
JKK˜[[Ý[OO]›ÚY	‰Š‹˜[[Ý[YK˜[[Ý[Þ]ÛÚ[‹Ò”ÓÓŠK˜[[Ý[
N›ÚY
KŸKœ›ÛT\X[
J^Û]Z“Š
NÜ™]\›ˆK˜ÛÛ\][Û•[YHOO]›ÚY	‰™K˜ÛÛ\][Û•[YHOO[[	‰Š‹˜ÛÛ\][Û•[YO^Ë•[Y\Ý[\™œ›ÛT\X[
K˜ÛÛ\][Û•[YJJKK˜[[Ý[OO]›ÚY	‰™K˜[[Ý[OO[[	‰Š‹˜[[Ý[^]ÛÚ[‹™œ›ÛT\X[
K˜[[Ý[
JKŸ_NÙ[˜Ý[Ûˆ]Š
^Ü™]\›žÙ[YØ]ÜY™\ÜÎˆˆ‹˜[Y]ÜY™\ÜÎˆˆ‹[[Ý[ž]ÛÚ[‹™œ›ÛT\X[
ßJKÜ™X][Û’ZYÚšYÒ[

__TÛ‹“\ÙÐØ[˜Ù[[˜›Û™[™Ñ[YØ][Û^Ý\U\›ˆ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK“\ÙÐØ[˜Ù[[˜›Û™[™Ñ[YØ][Ûˆ‹[˜ÛÙJKR[‹š[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK™[YØ]ÜY™\ÜÈOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊK™[YØ]ÜY™\ÜÊKK˜[Y]ÜY™\ÜÈOOHˆ‰‰›‹Z[ÌŠN
KœÝš[™ÊK˜[Y]ÜY™\ÜÊKK˜[[Ý[OO]›ÚY	‰ž]ÛÚ[‹™[˜ÛÙJK˜[[Ý[‹Z[ÌŠŠK™›ÜšÊ
JK›[[J
KK˜Ü™X][Û’ZYÚOOPšYÒ[

I‰›‹Z[ÌŠÌŠKš[
K˜Ü™X][Û’ZYÚ
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ[‹š[˜\žT™XY\ÙN›™]È[‹š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹Y]Š
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹™[YØ]ÜY™\ÜÏ]œÝš[™Ê
NØœ™XZÎØØ\ÙHŽœ‹˜[Y]ÜY™\ÜÏ]œÝš[™Ê
NØœ™XZÎØØ\ÙHÎœ‹˜[[Ý[^]ÛÚ[‹™XÛÙJZ[ÌŠ
JNØœ™XZÎØØ\ÙHœ‹˜Ü™X][Û’ZYÚ]š[

NØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]Y]Š
NÜ™]\›Š]š\ÔÙ]
JK™[YØ]ÜY™\ÜÊI‰Š‹™[YØ]ÜY™\ÜÏTÝš[™ÊK™[YØ]ÜY™\ÜÊJK
]š\ÔÙ]
JK˜[Y]ÜY™\ÜÊI‰Š‹˜[Y]ÜY™\ÜÏTÝš[™ÊK˜[Y]ÜY™\ÜÊJK
]š\ÔÙ]
JK˜[[Ý[
I‰Š‹˜[[Ý[^]ÛÚ[‹™œ›ÛR”ÓÓŠK˜[[Ý[
JK
]š\ÔÙ]
JK˜Ü™X][Û’ZYÚ
I‰Š‹˜Ü™X][Û’ZYÚPšYÒ[
K˜Ü™X][Û’ZYÚÔÝš[™Ê
JJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK™[YØ]ÜY™\ÜÈOO]›ÚY	‰Š‹™[YØ]ÜY™\ÜÏYK™[YØ]ÜY™\ÜÊKK˜[Y]ÜY™\ÜÈOO]›ÚY	‰Š‹˜[Y]ÜY™\ÜÏYK˜[Y]ÜY™\ÜÊKK˜[[Ý[OO]›ÚY	‰Š‹˜[[Ý[YK˜[[Ý[Þ]ÛÚ[‹Ò”ÓÓŠK˜[[Ý[
N›ÚY
KK˜Ü™X][Û’ZYÚOO]›ÚY	‰Š‹˜Ü™X][Û’ZYÚJK˜Ü™X][Û’ZYÚšYÒ[

JKÔÝš[™Ê
JKŸKœ›ÛT\X[
J^Û]Y]Š
NÜ™]\›ˆ‹™[YØ]ÜY™\ÜÏYK™[YØ]ÜY™\ÜÏÏÈˆ‹‹˜[Y]ÜY™\ÜÏYK˜[Y]ÜY™\ÜÏÏÈˆ‹K˜[[Ý[OO]›ÚY	‰™K˜[[Ý[OO[[	‰Š‹˜[[Ý[^]ÛÚ[‹™œ›ÛT\X[
K˜[[Ý[
JKK˜Ü™X][Û’ZYÚOO]›ÚY	‰™K˜Ü™X][Û’ZYÚOO[[	‰Š‹˜Ü™X][Û’ZYÚPšYÒ[
K˜Ü™X][Û’ZYÚÔÝš[™Ê
JJKŸ_NÙ[˜Ý[ÛˆŠ
^Ü™]\›žß_TÛ‹“\ÙÐØ[˜Ù[[˜›Û™[™Ñ[YØ][Û”™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK“\ÙÐØ[˜Ù[[˜›Û™[™Ñ[YØ][Û”™\ÜÛœÙH‹[˜ÛÙJKR[‹š[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ[‹š[˜\žT™XY\ÙN›™]È[‹š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹[Š
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Ü™]\›ˆŠ
_KÒ”ÓÓŠJ^Ü™]\›žß_Kœ›ÛT\X[
J^Ü™]\›ˆŠ
__NÙ[˜Ý[ÛˆŠ
^Ü™]\›žØ]]Üš]Nˆˆ‹\˜[\Î“Ü‹”\˜[\Ë™œ›ÛT\X[
ßJ__TÛ‹“\ÙÕ\]T\˜[\Ï^Ý\U\›ˆ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK“\ÙÕ\]T\˜[\È‹[˜ÛÙJKR[‹š[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK˜]]Üš]HOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊK˜]]Üš]JKKœ\˜[\ÈOO]›ÚY	‰“Ü‹”\˜[\Ë™[˜ÛÙJKœ\˜[\Ë‹Z[ÌŠN
K™›ÜšÊ
JK›[[J
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ[‹š[˜\žT™XY\ÙN›™]È[‹š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹]Š
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹˜]]Üš]O]œÝš[™Ê
NØœ™XZÎØØ\ÙHŽœ‹œ\˜[\ÏSÜ‹”\˜[\Ë™XÛÙJZ[ÌŠ
JNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]]Š
NÜ™]\›Š]š\ÔÙ]
JK˜]]Üš]JI‰Š‹˜]]Üš]OTÝš[™ÊK˜]]Üš]JJK
]š\ÔÙ]
JKœ\˜[\ÊI‰Š‹œ\˜[\ÏSÜ‹”\˜[\Ë™œ›ÛR”ÓÓŠKœ\˜[\ÊJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK˜]]Üš]HOO]›ÚY	‰Š‹˜]]Üš]OYK˜]]Üš]JKKœ\˜[\ÈOO]›ÚY	‰Š‹œ\˜[\ÏYKœ\˜[\ÏÓÜ‹”\˜[\ËÒ”ÓÓŠKœ\˜[\ÊN›ÚY
KŸKœ›ÛT\X[
J^Û]]Š
NÜ™]\›ˆ‹˜]]Üš]OYK˜]]Üš]OÏÈˆ‹Kœ\˜[\ÈOO]›ÚY	‰™Kœ\˜[\ÈOO[[	‰Š‹œ\˜[\ÏSÜ‹”\˜[\Ë™œ›ÛT\X[
Kœ\˜[\ÊJKŸ_NÙ[˜Ý[ÛˆŠ
^Ü™]\›žß_TÛ‹“\ÙÕ\]T\˜[\Ô™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK“\ÙÕ\]T\˜[\Ô™\ÜÛœÙH‹[˜ÛÙJKR[‹š[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ[‹š[˜\žT™XY\ÙN›™]È[‹š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹\Š
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Ü™]\›ˆŠ
_KÒ”ÓÓŠJ^Ü™]\›žß_Kœ›ÛT\X[
J^Ü™]\›ˆŠ
__NÝ˜\ˆ]XÛ\ÜÞÜœÎØÛÛœÝXÝÜŠŠ^Ý\ËœœÏ[‹\ËÜ™X]U˜[Y]Ü]\ËÜ™X]U˜[Y]Ü‹˜š[™
\ÊK\Ë‘Y]˜[Y]Ü]\Ë‘Y]˜[Y]Ü‹˜š[™
\ÊK\Ë‘[YØ]O]\Ë‘[YØ]K˜š[™
\ÊK\Ë™YÚ[”™Y[YØ]O]\Ë™YÚ[”™Y[YØ]K˜š[™
\ÊK\Ë•[™[YØ]O]\Ë•[™[YØ]K˜š[™
\ÊK\ËØ[˜Ù[[˜›Û™[™Ñ[YØ][Û]\ËØ[˜Ù[[˜›Û™[™Ñ[YØ][Û‹˜š[™
\ÊK\Ë•\]T\˜[\Ï]\Ë•\]T\˜[\Ë˜š[™
\Ê_PÜ™X]U˜[Y]ÜŠŠ^Û]TÛ‹“\ÙÐÜ™X]U˜[Y]Ü‹™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK“\ÙÈ‹Ü™X]U˜[Y]Üˆ‹
K[ŠO”Û‹“\ÙÐÜ™X]U˜[Y]Ü”™\ÜÛœÙK™XÛÙJ™]È[‹š[˜\žT™XY\ŠŠJJ_QY]˜[Y]ÜŠŠ^Û]TÛ‹“\ÙÑY]˜[Y]Ü‹™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK“\ÙÈ‹‘Y]˜[Y]Üˆ‹
K[ŠO”Û‹“\ÙÑY]˜[Y]Ü”™\ÜÛœÙK™XÛÙJ™]È[‹š[˜\žT™XY\ŠŠJJ_Q[YØ]JŠ^Û]TÛ‹“\ÙÑ[YØ]K™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK“\ÙÈ‹‘[YØ]H‹
K[ŠO”Û‹“\ÙÑ[YØ]T™\ÜÛœÙK™XÛÙJ™]È[‹š[˜\žT™XY\ŠŠJJ_P™YÚ[”™Y[YØ]JŠ^Û]TÛ‹“\ÙÐ™YÚ[”™Y[YØ]K™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK“\ÙÈ‹™YÚ[”™Y[YØ]H‹
K[ŠO”Û‹“\ÙÐ™YÚ[”™Y[YØ]T™\ÜÛœÙK™XÛÙJ™]È[‹š[˜\žT™XY\ŠŠJJ_U[™[YØ]JŠ^Û]TÛ‹“\ÙÕ[™[YØ]K™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK“\ÙÈ‹•[™[YØ]H‹
K[ŠO”Û‹“\ÙÕ[™[YØ]T™\ÜÛœÙK™XÛÙJ™]È[‹š[˜\žT™XY\ŠŠJJ_PØ[˜Ù[[˜›Û™[™Ñ[YØ][ÛŠŠ^Û]TÛ‹“\ÙÐØ[˜Ù[[˜›Û™[™Ñ[YØ][Û‹™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK“\ÙÈ‹Ø[˜Ù[[˜›Û™[™Ñ[YØ][Ûˆ‹
K[ŠO”Û‹“\ÙÐØ[˜Ù[[˜›Û™[™Ñ[YØ][Û”™\ÜÛœÙK™XÛÙJ™]È[‹š[˜\žT™XY\ŠŠJJ_U\]T\˜[\ÊŠ^Û]TÛ‹“\ÙÕ\]T\˜[\Ë™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK“\ÙÈ‹•\]T\˜[\È‹
K[ŠO”Û‹“\ÙÕ\]T\˜[\Ô™\ÜÛœÙK™XÛÙJ™]È[‹š[˜\žT™XY\ŠŠJJ__NÔÛ‹“\ÙÐÛY[[\Z]ŸJNÝ˜\ˆÏRJOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\J—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÙœÝZÚ[™Õ\\Ï]›ÚYÙš\Ó\ÙÐ™YÚ[”™Y[YØ]Q[˜ÛÙSØš™XÝY‰Ùš\Ó\ÙÐÜ™X]U˜[Y]Ü‘[˜ÛÙSØš™XÝ[	Ùš\Ó\ÙÑ[YØ]Q[˜ÛÙSØš™XÝYÉÙš\Ó\ÙÑY]˜[Y]Ü‘[˜ÛÙSØš™XÝ\	Ùš\Ó\ÙÕ[™[YØ]Q[˜ÛÙSØš™XÝRIÙš\Ó\ÙÐØ[˜Ù[[˜›Û™[™Ñ[YØ][Û‘[˜ÛÙSØš™XÝZ	Ý˜\ˆYVZ

NÙœÝZÚ[™Õ\\ÏVÖÈ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK“\ÙÐ™YÚ[”™Y[YØ]H‹Y‹“\ÙÐ™YÚ[”™Y[YØ]WKÈ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK“\ÙÐÜ™X]U˜[Y]Üˆ‹Y‹“\ÙÐÜ™X]U˜[Y]Ü—KÈ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK“\ÙÑ[YØ]H‹Y‹“\ÙÑ[YØ]WKÈ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK“\ÙÑY]˜[Y]Üˆ‹Y‹“\ÙÑY]˜[Y]Ü—KÈ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK“\ÙÕ[™[YØ]H‹Y‹“\ÙÕ[™[YØ]WKÈ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK“\ÙÐØ[˜Ù[[˜›Û™[™Ñ[YØ][Ûˆ‹Y‹“\ÙÐØ[˜Ù[[˜›Û™[™Ñ[YØ][Û—WNÙ[˜Ý[Ûˆ‰
J^Ü™]\›ˆK\U\›OOH‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK“\ÙÐ™YÚ[”™Y[YØ]HŸY[˜Ý[Ûˆ	
J^Ü™]\›ˆK\U\›OOH‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK“\ÙÐÜ™X]U˜[Y]ÜˆŸY[˜Ý[ÛˆÉ
J^Ü™]\›ˆK\U\›OOH‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK“\ÙÑ[YØ]HŸY[˜Ý[Ûˆ	
J^Ü™]\›ˆK\U\›OOH‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK“\ÙÑY]˜[Y]ÜˆŸY[˜Ý[ÛˆI
J^Ü™]\›ˆK\U\›OOH‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK“\ÙÕ[™[YØ]HŸY[˜Ý[Ûˆ	
J^Ü™]\›ˆK\U\›OOH‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK“\ÙÐØ[˜Ù[[˜›Û™[™Ñ[YØ][ÛˆŸ_JNÝ˜\ˆÏRJÙOOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\JÙK—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNØÙK”]Y\žPÛY[[\XÙK”]Y\žT\˜[\Ô™\ÜÛœÙOXÙK”]Y\žT\˜[\Ô™\]Y\ÝXÙK”]Y\žTÛÛ™\ÜÛœÙOXÙK”]Y\žTÛÛ™\]Y\ÝXÙK”]Y\žR\ÝÜšXØ[[™›Ô™\ÜÛœÙOXÙK”]Y\žR\ÝÜšXØ[[™›Ô™\]Y\ÝXÙK”]Y\žQ[YØ]Ü•˜[Y]Ü”™\ÜÛœÙOXÙK”]Y\žQ[YØ]Ü•˜[Y]Ü”™\]Y\ÝXÙK”]Y\žQ[YØ]Ü•˜[Y]ÜœÔ™\ÜÛœÙOXÙK”]Y\žQ[YØ]Ü•˜[Y]ÜœÔ™\]Y\ÝXÙK”]Y\žT™Y[YØ][ÛœÔ™\ÜÛœÙOXÙK”]Y\žT™Y[YØ][ÛœÔ™\]Y\ÝXÙK”]Y\žQ[YØ]Ü•[˜›Û™[™Ñ[YØ][ÛœÔ™\ÜÛœÙOXÙK”]Y\žQ[YØ]Ü•[˜›Û™[™Ñ[YØ][ÛœÔ™\]Y\ÝXÙK”]Y\žQ[YØ]Ü‘[YØ][ÛœÔ™\ÜÛœÙOXÙK”]Y\žQ[YØ]Ü‘[YØ][ÛœÔ™\]Y\ÝXÙK”]Y\žU[˜›Û™[™Ñ[YØ][Û”™\ÜÛœÙOXÙK”]Y\žU[˜›Û™[™Ñ[YØ][Û”™\]Y\ÝXÙK”]Y\žQ[YØ][Û”™\ÜÛœÙOXÙK”]Y\žQ[YØ][Û”™\]Y\ÝXÙK”]Y\žU˜[Y]Ü•[˜›Û™[™Ñ[YØ][ÛœÔ™\ÜÛœÙOXÙK”]Y\žU˜[Y]Ü•[˜›Û™[™Ñ[YØ][ÛœÔ™\]Y\ÝXÙK”]Y\žU˜[Y]Ü‘[YØ][ÛœÔ™\ÜÛœÙOXÙK”]Y\žU˜[Y]Ü‘[YØ][ÛœÔ™\]Y\ÝXÙK”]Y\žU˜[Y]Ü”™\ÜÛœÙOXÙK”]Y\žU˜[Y]Ü”™\]Y\ÝXÙK”]Y\žU˜[Y]ÜœÔ™\ÜÛœÙOXÙK”]Y\žU˜[Y]ÜœÔ™\]Y\ÝXÙKœ›ÝØY”XÚØYÙO]›ÚYÝ˜\ˆYOZšJ
KÙOQÓŠ
K	TÙJ
KÝQYJ
NØÙKœ›ÝØY”XÚØYÙOH˜ÛÜÛ[ÜËœÝZÚ[™ËŒX™]LHŽÙ[˜Ý[ÛˆÝŠ
^Ü™]\›žÜÝ]\Îˆˆ‹YÚ[˜][ÛŽ›ÚY_XÙK”]Y\žU˜[Y]ÜœÔ™\]Y\Ý^Ý\U\›ˆ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK”]Y\žU˜[Y]ÜœÔ™\]Y\Ý‹[˜ÛÙJKIš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆKœÝ]\ÈOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊKœÝ]\ÊKKœYÚ[˜][ÛˆOO]›ÚY	‰•YK”YÙT™\]Y\Ý™[˜ÛÙJKœYÚ[˜][Û‹‹Z[ÌŠN
K™›ÜšÊ
JK›[[J
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ	š[˜\žT™XY\ÙN›™]È	š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹[ÝŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹œÝ]\Ï]œÝš[™Ê
NØœ™XZÎØØ\ÙHŽœ‹œYÚ[˜][ÛUYK”YÙT™\]Y\Ý™XÛÙJZ[ÌŠ
JNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û][ÝŠ
NÜ™]\›ŠÝš\ÔÙ]
JKœÝ]\ÊI‰Š‹œÝ]\ÏTÝš[™ÊKœÝ]\ÊJK
Ýš\ÔÙ]
JKœYÚ[˜][ÛŠI‰Š‹œYÚ[˜][ÛUYK”YÙT™\]Y\Ý™œ›ÛR”ÓÓŠKœYÚ[˜][ÛŠJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆKœÝ]\ÈOO]›ÚY	‰Š‹œÝ]\ÏYKœÝ]\ÊKKœYÚ[˜][ÛˆOO]›ÚY	‰Š‹œYÚ[˜][ÛYKœYÚ[˜][ÛÕYK”YÙT™\]Y\ÝÒ”ÓÓŠKœYÚ[˜][ÛŠN›ÚY
KŸKœ›ÛT\X[
J^Û][ÝŠ
NÜ™]\›ˆ‹œÝ]\ÏYKœÝ]\ÏÏÈˆ‹KœYÚ[˜][ÛˆOO]›ÚY	‰™KœYÚ[˜][ÛˆOO[[	‰Š‹œYÚ[˜][ÛUYK”YÙT™\]Y\Ý™œ›ÛT\X[
KœYÚ[˜][ÛŠJKŸ_NÙ[˜Ý[Ûˆ]Š
^Ü™]\›žÝ˜[Y]ÜœÎ–×KYÚ[˜][ÛŽ›ÚY_XÙK”]Y\žU˜[Y]ÜœÔ™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK”]Y\žU˜[Y]ÜœÔ™\ÜÛœÙH‹[˜ÛÙJKIš[˜\žUÜš]\‹˜Ü™X]J
J^Ù›ÜŠ]ÙˆK˜[Y]ÜœÊZÙK•˜[Y]Ü‹™[˜ÛÙJ‹Z[ÌŠL
K™›ÜšÊ
JK›[[J
NÜ™]\›ˆKœYÚ[˜][ÛˆOO]›ÚY	‰•YK”YÙT™\ÜÛœÙK™[˜ÛÙJKœYÚ[˜][Û‹‹Z[ÌŠN
K™›ÜšÊ
JK›[[J
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ	š[˜\žT™XY\ÙN›™]È	š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹X]Š
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹˜[Y]ÜœËœ\Ú
ÙK•˜[Y]Ü‹™XÛÙJZ[ÌŠ
JJNØœ™XZÎØØ\ÙHŽœ‹œYÚ[˜][ÛUYK”YÙT™\ÜÛœÙK™XÛÙJZ[ÌŠ
JNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]X]Š
NÜ™]\›ˆ\œ˜^Kš\Ð\œ˜^JOË˜[Y]ÜœÊI‰Š‹˜[Y]ÜœÏYK˜[Y]ÜœË›X\
OšÙK•˜[Y]Ü‹™œ›ÛR”ÓÓŠ
JJK
Ýš\ÔÙ]
JKœYÚ[˜][ÛŠI‰Š‹œYÚ[˜][ÛUYK”YÙT™\ÜÛœÙK™œ›ÛR”ÓÓŠKœYÚ[˜][ÛŠJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK˜[Y]ÜœÏÛ‹˜[Y]ÜœÏYK˜[Y]ÜœË›X\
OÚÙK•˜[Y]Ü‹Ò”ÓÓŠ
N›ÚY
N›‹˜[Y]ÜœÏV×KKœYÚ[˜][ÛˆOO]›ÚY	‰Š‹œYÚ[˜][ÛYKœYÚ[˜][ÛÕYK”YÙT™\ÜÛœÙKÒ”ÓÓŠKœYÚ[˜][ÛŠN›ÚY
KŸKœ›ÛT\X[
J^Û]X]Š
NÜ™]\›ˆ‹˜[Y]ÜœÏYK˜[Y]ÜœÏË›X\
OšÙK•˜[Y]Ü‹™œ›ÛT\X[

J_×KKœYÚ[˜][ÛˆOO]›ÚY	‰™KœYÚ[˜][ÛˆOO[[	‰Š‹œYÚ[˜][ÛUYK”YÙT™\ÜÛœÙK™œ›ÛT\X[
KœYÚ[˜][ÛŠJKŸ_NÙ[˜Ý[ÛˆÝŠ
^Ü™]\›žÝ˜[Y]ÜYŽˆˆŸ_XÙK”]Y\žU˜[Y]Ü”™\]Y\Ý^Ý\U\›ˆ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK”]Y\žU˜[Y]Ü”™\]Y\Ý‹[˜ÛÙJKIš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK˜[Y]ÜYˆOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊK˜[Y]ÜYŠKŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ	š[˜\žT™XY\ÙN›™]È	š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹\ÝŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÛÏŒÏOOLOÜ‹˜[Y]ÜY]œÝš[™Ê
NœÚÚ\\JÉÊ_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]\ÝŠ
NÜ™]\›ŠÝš\ÔÙ]
JK˜[Y]ÜYŠI‰Š‹˜[Y]ÜYTÝš[™ÊK˜[Y]ÜYŠJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK˜[Y]ÜYˆOO]›ÚY	‰Š‹˜[Y]ÜYYK˜[Y]ÜYŠKŸKœ›ÛT\X[
J^Û]\ÝŠ
NÜ™]\›ˆ‹˜[Y]ÜYYK˜[Y]ÜYÏÈˆ‹Ÿ_NÙ[˜Ý[ÛˆŠ
^Ü™]\›žÝ˜[Y]ÜŽšÙK•˜[Y]Ü‹™œ›ÛT\X[
ßJ__XÙK”]Y\žU˜[Y]Ü”™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK”]Y\žU˜[Y]Ü”™\ÜÛœÙH‹[˜ÛÙJKIš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK˜[Y]ÜˆOO]›ÚY	‰šÙK•˜[Y]Ü‹™[˜ÛÙJK˜[Y]Ü‹‹Z[ÌŠL
K™›ÜšÊ
JK›[[J
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ	š[˜\žT™XY\ÙN›™]È	š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹YŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÛÏŒÏOOLOÜ‹˜[Y]ÜZÙK•˜[Y]Ü‹™XÛÙJZ[ÌŠ
JNœÚÚ\\JÉÊ_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]YŠ
NÜ™]\›ŠÝš\ÔÙ]
JK˜[Y]ÜŠI‰Š‹˜[Y]ÜZÙK•˜[Y]Ü‹™œ›ÛR”ÓÓŠK˜[Y]ÜŠJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK˜[Y]ÜˆOO]›ÚY	‰Š‹˜[Y]ÜYK˜[Y]ÜÚÙK•˜[Y]Ü‹Ò”ÓÓŠK˜[Y]ÜŠN›ÚY
KŸKœ›ÛT\X[
J^Û]YŠ
NÜ™]\›ˆK˜[Y]ÜˆOO]›ÚY	‰™K˜[Y]ÜˆOO[[	‰Š‹˜[Y]ÜZÙK•˜[Y]Ü‹™œ›ÛT\X[
K˜[Y]ÜŠJKŸ_NÙ[˜Ý[ÛˆÝŠ
^Ü™]\›žÝ˜[Y]ÜYŽˆˆ‹YÚ[˜][ÛŽ›ÚY_XÙK”]Y\žU˜[Y]Ü‘[YØ][ÛœÔ™\]Y\Ý^Ý\U\›ˆ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK”]Y\žU˜[Y]Ü‘[YØ][ÛœÔ™\]Y\Ý‹[˜ÛÙJKIš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK˜[Y]ÜYˆOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊK˜[Y]ÜYŠKKœYÚ[˜][ÛˆOO]›ÚY	‰•YK”YÙT™\]Y\Ý™[˜ÛÙJKœYÚ[˜][Û‹‹Z[ÌŠN
K™›ÜšÊ
JK›[[J
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ	š[˜\žT™XY\ÙN›™]È	š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹XÝŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹˜[Y]ÜY]œÝš[™Ê
NØœ™XZÎØØ\ÙHŽœ‹œYÚ[˜][ÛUYK”YÙT™\]Y\Ý™XÛÙJZ[ÌŠ
JNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]XÝŠ
NÜ™]\›ŠÝš\ÔÙ]
JK˜[Y]ÜYŠI‰Š‹˜[Y]ÜYTÝš[™ÊK˜[Y]ÜYŠJK
Ýš\ÔÙ]
JKœYÚ[˜][ÛŠI‰Š‹œYÚ[˜][ÛUYK”YÙT™\]Y\Ý™œ›ÛR”ÓÓŠKœYÚ[˜][ÛŠJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK˜[Y]ÜYˆOO]›ÚY	‰Š‹˜[Y]ÜYYK˜[Y]ÜYŠKKœYÚ[˜][ÛˆOO]›ÚY	‰Š‹œYÚ[˜][ÛYKœYÚ[˜][ÛÕYK”YÙT™\]Y\ÝÒ”ÓÓŠKœYÚ[˜][ÛŠN›ÚY
KŸKœ›ÛT\X[
J^Û]XÝŠ
NÜ™]\›ˆ‹˜[Y]ÜYYK˜[Y]ÜYÏÈˆ‹KœYÚ[˜][ÛˆOO]›ÚY	‰™KœYÚ[˜][ÛˆOO[[	‰Š‹œYÚ[˜][ÛUYK”YÙT™\]Y\Ý™œ›ÛT\X[
KœYÚ[˜][ÛŠJKŸ_NÙ[˜Ý[Ûˆ]Š
^Ü™]\›žÙ[YØ][Û”™\ÜÛœÙ\Î–×KYÚ[˜][ÛŽ›ÚY_XÙK”]Y\žU˜[Y]Ü‘[YØ][ÛœÔ™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK”]Y\žU˜[Y]Ü‘[YØ][ÛœÔ™\ÜÛœÙH‹[˜ÛÙJKIš[˜\žUÜš]\‹˜Ü™X]J
J^Ù›ÜŠ]ÙˆK™[YØ][Û”™\ÜÛœÙ\ÊZÙK‘[YØ][Û”™\ÜÛœÙK™[˜ÛÙJ‹Z[ÌŠL
K™›ÜšÊ
JK›[[J
NÜ™]\›ˆKœYÚ[˜][ÛˆOO]›ÚY	‰•YK”YÙT™\ÜÛœÙK™[˜ÛÙJKœYÚ[˜][Û‹‹Z[ÌŠN
K™›ÜšÊ
JK›[[J
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ	š[˜\žT™XY\ÙN›™]È	š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹]]Š
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹™[YØ][Û”™\ÜÛœÙ\Ëœ\Ú
ÙK‘[YØ][Û”™\ÜÛœÙK™XÛÙJZ[ÌŠ
JJNØœ™XZÎØØ\ÙHŽœ‹œYÚ[˜][ÛUYK”YÙT™\ÜÛœÙK™XÛÙJZ[ÌŠ
JNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]]]Š
NÜ™]\›ˆ\œ˜^Kš\Ð\œ˜^JOË™[YØ][Û”™\ÜÛœÙ\ÊI‰Š‹™[YØ][Û”™\ÜÛœÙ\ÏYK™[YØ][Û”™\ÜÛœÙ\Ë›X\
OšÙK‘[YØ][Û”™\ÜÛœÙK™œ›ÛR”ÓÓŠ
JJK
Ýš\ÔÙ]
JKœYÚ[˜][ÛŠI‰Š‹œYÚ[˜][ÛUYK”YÙT™\ÜÛœÙK™œ›ÛR”ÓÓŠKœYÚ[˜][ÛŠJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK™[YØ][Û”™\ÜÛœÙ\ÏÛ‹™[YØ][Û”™\ÜÛœÙ\ÏYK™[YØ][Û”™\ÜÛœÙ\Ë›X\
OÚÙK‘[YØ][Û”™\ÜÛœÙKÒ”ÓÓŠ
N›ÚY
N›‹™[YØ][Û”™\ÜÛœÙ\ÏV×KKœYÚ[˜][ÛˆOO]›ÚY	‰Š‹œYÚ[˜][ÛYKœYÚ[˜][ÛÕYK”YÙT™\ÜÛœÙKÒ”ÓÓŠKœYÚ[˜][ÛŠN›ÚY
KŸKœ›ÛT\X[
J^Û]]]Š
NÜ™]\›ˆ‹™[YØ][Û”™\ÜÛœÙ\ÏYK™[YØ][Û”™\ÜÛœÙ\ÏË›X\
OšÙK‘[YØ][Û”™\ÜÛœÙK™œ›ÛT\X[

J_×KKœYÚ[˜][ÛˆOO]›ÚY	‰™KœYÚ[˜][ÛˆOO[[	‰Š‹œYÚ[˜][ÛUYK”YÙT™\ÜÛœÙK™œ›ÛT\X[
KœYÚ[˜][ÛŠJKŸ_NÙ[˜Ý[Ûˆ]Š
^Ü™]\›žÝ˜[Y]ÜYŽˆˆ‹YÚ[˜][ÛŽ›ÚY_XÙK”]Y\žU˜[Y]Ü•[˜›Û™[™Ñ[YØ][ÛœÔ™\]Y\Ý^Ý\U\›ˆ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK”]Y\žU˜[Y]Ü•[˜›Û™[™Ñ[YØ][ÛœÔ™\]Y\Ý‹[˜ÛÙJKIš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK˜[Y]ÜYˆOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊK˜[Y]ÜYŠKKœYÚ[˜][ÛˆOO]›ÚY	‰•YK”YÙT™\]Y\Ý™[˜ÛÙJKœYÚ[˜][Û‹‹Z[ÌŠN
K™›ÜšÊ
JK›[[J
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ	š[˜\žT™XY\ÙN›™]È	š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹P]Š
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹˜[Y]ÜY]œÝš[™Ê
NØœ™XZÎØØ\ÙHŽœ‹œYÚ[˜][ÛUYK”YÙT™\]Y\Ý™XÛÙJZ[ÌŠ
JNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]P]Š
NÜ™]\›ŠÝš\ÔÙ]
JK˜[Y]ÜYŠI‰Š‹˜[Y]ÜYTÝš[™ÊK˜[Y]ÜYŠJK
Ýš\ÔÙ]
JKœYÚ[˜][ÛŠI‰Š‹œYÚ[˜][ÛUYK”YÙT™\]Y\Ý™œ›ÛR”ÓÓŠKœYÚ[˜][ÛŠJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK˜[Y]ÜYˆOO]›ÚY	‰Š‹˜[Y]ÜYYK˜[Y]ÜYŠKKœYÚ[˜][ÛˆOO]›ÚY	‰Š‹œYÚ[˜][ÛYKœYÚ[˜][ÛÕYK”YÙT™\]Y\ÝÒ”ÓÓŠKœYÚ[˜][ÛŠN›ÚY
KŸKœ›ÛT\X[
J^Û]P]Š
NÜ™]\›ˆ‹˜[Y]ÜYYK˜[Y]ÜYÏÈˆ‹KœYÚ[˜][ÛˆOO]›ÚY	‰™KœYÚ[˜][ÛˆOO[[	‰Š‹œYÚ[˜][ÛUYK”YÙT™\]Y\Ý™œ›ÛT\X[
KœYÚ[˜][ÛŠJKŸ_NÙ[˜Ý[ÛˆŠ
^Ü™]\›žÝ[˜›Û™[™Ô™\ÜÛœÙ\Î–×KYÚ[˜][ÛŽ›ÚY_XÙK”]Y\žU˜[Y]Ü•[˜›Û™[™Ñ[YØ][ÛœÔ™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK”]Y\žU˜[Y]Ü•[˜›Û™[™Ñ[YØ][ÛœÔ™\ÜÛœÙH‹[˜ÛÙJKIš[˜\žUÜš]\‹˜Ü™X]J
J^Ù›ÜŠ]ÙˆK[˜›Û™[™Ô™\ÜÛœÙ\ÊZÙK•[˜›Û™[™Ñ[YØ][Û‹™[˜ÛÙJ‹Z[ÌŠL
K™›ÜšÊ
JK›[[J
NÜ™]\›ˆKœYÚ[˜][ÛˆOO]›ÚY	‰•YK”YÙT™\ÜÛœÙK™[˜ÛÙJKœYÚ[˜][Û‹‹Z[ÌŠN
K™›ÜšÊ
JK›[[J
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ	š[˜\žT™XY\ÙN›™]È	š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹YŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹[˜›Û™[™Ô™\ÜÛœÙ\Ëœ\Ú
ÙK•[˜›Û™[™Ñ[YØ][Û‹™XÛÙJZ[ÌŠ
JJNØœ™XZÎØØ\ÙHŽœ‹œYÚ[˜][ÛUYK”YÙT™\ÜÛœÙK™XÛÙJZ[ÌŠ
JNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]YŠ
NÜ™]\›ˆ\œ˜^Kš\Ð\œ˜^JOË[˜›Û™[™Ô™\ÜÛœÙ\ÊI‰Š‹[˜›Û™[™Ô™\ÜÛœÙ\ÏYK[˜›Û™[™Ô™\ÜÛœÙ\Ë›X\
OšÙK•[˜›Û™[™Ñ[YØ][Û‹™œ›ÛR”ÓÓŠ
JJK
Ýš\ÔÙ]
JKœYÚ[˜][ÛŠI‰Š‹œYÚ[˜][ÛUYK”YÙT™\ÜÛœÙK™œ›ÛR”ÓÓŠKœYÚ[˜][ÛŠJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK[˜›Û™[™Ô™\ÜÛœÙ\ÏÛ‹[˜›Û™[™Ô™\ÜÛœÙ\ÏYK[˜›Û™[™Ô™\ÜÛœÙ\Ë›X\
OÚÙK•[˜›Û™[™Ñ[YØ][Û‹Ò”ÓÓŠ
N›ÚY
N›‹[˜›Û™[™Ô™\ÜÛœÙ\ÏV×KKœYÚ[˜][ÛˆOO]›ÚY	‰Š‹œYÚ[˜][ÛYKœYÚ[˜][ÛÕYK”YÙT™\ÜÛœÙKÒ”ÓÓŠKœYÚ[˜][ÛŠN›ÚY
KŸKœ›ÛT\X[
J^Û]YŠ
NÜ™]\›ˆ‹[˜›Û™[™Ô™\ÜÛœÙ\ÏYK[˜›Û™[™Ô™\ÜÛœÙ\ÏË›X\
OšÙK•[˜›Û™[™Ñ[YØ][Û‹™œ›ÛT\X[

J_×KKœYÚ[˜][ÛˆOO]›ÚY	‰™KœYÚ[˜][ÛˆOO[[	‰Š‹œYÚ[˜][ÛUYK”YÙT™\ÜÛœÙK™œ›ÛT\X[
KœYÚ[˜][ÛŠJKŸ_NÙ[˜Ý[ÛˆŠ
^Ü™]\›žÙ[YØ]ÜYŽˆˆ‹˜[Y]ÜYŽˆˆŸ_XÙK”]Y\žQ[YØ][Û”™\]Y\Ý^Ý\U\›ˆ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK”]Y\žQ[YØ][Û”™\]Y\Ý‹[˜ÛÙJKIš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK™[YØ]ÜYˆOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊK™[YØ]ÜYŠKK˜[Y]ÜYˆOOHˆ‰‰›‹Z[ÌŠN
KœÝš[™ÊK˜[Y]ÜYŠKŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ	š[˜\žT™XY\ÙN›™]È	š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹[Š
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹™[YØ]ÜY]œÝš[™Ê
NØœ™XZÎØØ\ÙHŽœ‹˜[Y]ÜY]œÝš[™Ê
NØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û][Š
NÜ™]\›ŠÝš\ÔÙ]
JK™[YØ]ÜYŠI‰Š‹™[YØ]ÜYTÝš[™ÊK™[YØ]ÜYŠJK
Ýš\ÔÙ]
JK˜[Y]ÜYŠI‰Š‹˜[Y]ÜYTÝš[™ÊK˜[Y]ÜYŠJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK™[YØ]ÜYˆOO]›ÚY	‰Š‹™[YØ]ÜYYK™[YØ]ÜYŠKK˜[Y]ÜYˆOO]›ÚY	‰Š‹˜[Y]ÜYYK˜[Y]ÜYŠKŸKœ›ÛT\X[
J^Û][Š
NÜ™]\›ˆ‹™[YØ]ÜYYK™[YØ]ÜYÏÈˆ‹‹˜[Y]ÜYYK˜[Y]ÜYÏÈˆ‹Ÿ_NÙ[˜Ý[ÛˆÝŠ
^Ü™]\›žÙ[YØ][Û”™\ÜÛœÙN›ÚY_XÙK”]Y\žQ[YØ][Û”™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK”]Y\žQ[YØ][Û”™\ÜÛœÙH‹[˜ÛÙJKIš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK™[YØ][Û”™\ÜÛœÙHOO]›ÚY	‰šÙK‘[YØ][Û”™\ÜÛœÙK™[˜ÛÙJK™[YØ][Û”™\ÜÛœÙK‹Z[ÌŠL
K™›ÜšÊ
JK›[[J
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ	š[˜\žT™XY\ÙN›™]È	š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹YÝŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÛÏŒÏOOLOÜ‹™[YØ][Û”™\ÜÛœÙOZÙK‘[YØ][Û”™\ÜÛœÙK™XÛÙJZ[ÌŠ
JNœÚÚ\\JÉÊ_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]YÝŠ
NÜ™]\›ŠÝš\ÔÙ]
JK™[YØ][Û”™\ÜÛœÙJI‰Š‹™[YØ][Û”™\ÜÛœÙOZÙK‘[YØ][Û”™\ÜÛœÙK™œ›ÛR”ÓÓŠK™[YØ][Û”™\ÜÛœÙJJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK™[YØ][Û”™\ÜÛœÙHOO]›ÚY	‰Š‹™[YØ][Û”™\ÜÛœÙOYK™[YØ][Û”™\ÜÛœÙOÚÙK‘[YØ][Û”™\ÜÛœÙKÒ”ÓÓŠK™[YØ][Û”™\ÜÛœÙJN›ÚY
KŸKœ›ÛT\X[
J^Û]YÝŠ
NÜ™]\›ˆK™[YØ][Û”™\ÜÛœÙHOO]›ÚY	‰™K™[YØ][Û”™\ÜÛœÙHOO[[	‰Š‹™[YØ][Û”™\ÜÛœÙOZÙK‘[YØ][Û”™\ÜÛœÙK™œ›ÛT\X[
K™[YØ][Û”™\ÜÛœÙJJKŸ_NÙ[˜Ý[ÛˆŠ
^Ü™]\›žÙ[YØ]ÜYŽˆˆ‹˜[Y]ÜYŽˆˆŸ_XÙK”]Y\žU[˜›Û™[™Ñ[YØ][Û”™\]Y\Ý^Ý\U\›ˆ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK”]Y\žU[˜›Û™[™Ñ[YØ][Û”™\]Y\Ý‹[˜ÛÙJKIš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK™[YØ]ÜYˆOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊK™[YØ]ÜYŠKK˜[Y]ÜYˆOOHˆ‰‰›‹Z[ÌŠN
KœÝš[™ÊK˜[Y]ÜYŠKŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ	š[˜\žT™XY\ÙN›™]È	š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹\Š
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹™[YØ]ÜY]œÝš[™Ê
NØœ™XZÎØØ\ÙHŽœ‹˜[Y]ÜY]œÝš[™Ê
NØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]\Š
NÜ™]\›ŠÝš\ÔÙ]
JK™[YØ]ÜYŠI‰Š‹™[YØ]ÜYTÝš[™ÊK™[YØ]ÜYŠJK
Ýš\ÔÙ]
JK˜[Y]ÜYŠI‰Š‹˜[Y]ÜYTÝš[™ÊK˜[Y]ÜYŠJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK™[YØ]ÜYˆOO]›ÚY	‰Š‹™[YØ]ÜYYK™[YØ]ÜYŠKK˜[Y]ÜYˆOO]›ÚY	‰Š‹˜[Y]ÜYYK˜[Y]ÜYŠKŸKœ›ÛT\X[
J^Û]\Š
NÜ™]\›ˆ‹™[YØ]ÜYYK™[YØ]ÜYÏÈˆ‹‹˜[Y]ÜYYK˜[Y]ÜYÏÈˆ‹Ÿ_NÙ[˜Ý[Ûˆ]Š
^Ü™]\›žÝ[˜›Û™šÙK•[˜›Û™[™Ñ[YØ][Û‹™œ›ÛT\X[
ßJ__XÙK”]Y\žU[˜›Û™[™Ñ[YØ][Û”™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK”]Y\žU[˜›Û™[™Ñ[YØ][Û”™\ÜÛœÙH‹[˜ÛÙJKIš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK[˜›Û™OO]›ÚY	‰šÙK•[˜›Û™[™Ñ[YØ][Û‹™[˜ÛÙJK[˜›Û™‹Z[ÌŠL
K™›ÜšÊ
JK›[[J
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ	š[˜\žT™XY\ÙN›™]È	š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹R]Š
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÛÏŒÏOOLOÜ‹[˜›Û™ZÙK•[˜›Û™[™Ñ[YØ][Û‹™XÛÙJZ[ÌŠ
JNœÚÚ\\JÉÊ_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]R]Š
NÜ™]\›ŠÝš\ÔÙ]
JK[˜›Û™
I‰Š‹[˜›Û™ZÙK•[˜›Û™[™Ñ[YØ][Û‹™œ›ÛR”ÓÓŠK[˜›Û™
JKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK[˜›Û™OO]›ÚY	‰Š‹[˜›Û™YK[˜›Û™ÚÙK•[˜›Û™[™Ñ[YØ][Û‹Ò”ÓÓŠK[˜›Û™
N›ÚY
KŸKœ›ÛT\X[
J^Û]R]Š
NÜ™]\›ˆK[˜›Û™OO]›ÚY	‰™K[˜›Û™OO[[	‰Š‹[˜›Û™ZÙK•[˜›Û™[™Ñ[YØ][Û‹™œ›ÛT\X[
K[˜›Û™
JKŸ_NÙ[˜Ý[ÛˆŠ
^Ü™]\›žÙ[YØ]ÜYŽˆˆ‹YÚ[˜][ÛŽ›ÚY_XÙK”]Y\žQ[YØ]Ü‘[YØ][ÛœÔ™\]Y\Ý^Ý\U\›ˆ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK”]Y\žQ[YØ]Ü‘[YØ][ÛœÔ™\]Y\Ý‹[˜ÛÙJKIš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK™[YØ]ÜYˆOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊK™[YØ]ÜYŠKKœYÚ[˜][ÛˆOO]›ÚY	‰•YK”YÙT™\]Y\Ý™[˜ÛÙJKœYÚ[˜][Û‹‹Z[ÌŠN
K™›ÜšÊ
JK›[[J
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ	š[˜\žT™XY\ÙN›™]È	š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹ZŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹™[YØ]ÜY]œÝš[™Ê
NØœ™XZÎØØ\ÙHŽœ‹œYÚ[˜][ÛUYK”YÙT™\]Y\Ý™XÛÙJZ[ÌŠ
JNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]ZŠ
NÜ™]\›ŠÝš\ÔÙ]
JK™[YØ]ÜYŠI‰Š‹™[YØ]ÜYTÝš[™ÊK™[YØ]ÜYŠJK
Ýš\ÔÙ]
JKœYÚ[˜][ÛŠI‰Š‹œYÚ[˜][ÛUYK”YÙT™\]Y\Ý™œ›ÛR”ÓÓŠKœYÚ[˜][ÛŠJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK™[YØ]ÜYˆOO]›ÚY	‰Š‹™[YØ]ÜYYK™[YØ]ÜYŠKKœYÚ[˜][ÛˆOO]›ÚY	‰Š‹œYÚ[˜][ÛYKœYÚ[˜][ÛÕYK”YÙT™\]Y\ÝÒ”ÓÓŠKœYÚ[˜][ÛŠN›ÚY
KŸKœ›ÛT\X[
J^Û]ZŠ
NÜ™]\›ˆ‹™[YØ]ÜYYK™[YØ]ÜYÏÈˆ‹KœYÚ[˜][ÛˆOO]›ÚY	‰™KœYÚ[˜][ÛˆOO[[	‰Š‹œYÚ[˜][ÛUYK”YÙT™\]Y\Ý™œ›ÛT\X[
KœYÚ[˜][ÛŠJKŸ_NÙ[˜Ý[Ûˆ]Š
^Ü™]\›žÙ[YØ][Û”™\ÜÛœÙ\Î–×KYÚ[˜][ÛŽ›ÚY_XÙK”]Y\žQ[YØ]Ü‘[YØ][ÛœÔ™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK”]Y\žQ[YØ]Ü‘[YØ][ÛœÔ™\ÜÛœÙH‹[˜ÛÙJKIš[˜\žUÜš]\‹˜Ü™X]J
J^Ù›ÜŠ]ÙˆK™[YØ][Û”™\ÜÛœÙ\ÊZÙK‘[YØ][Û”™\ÜÛœÙK™[˜ÛÙJ‹Z[ÌŠL
K™›ÜšÊ
JK›[[J
NÜ™]\›ˆKœYÚ[˜][ÛˆOO]›ÚY	‰•YK”YÙT™\ÜÛœÙK™[˜ÛÙJKœYÚ[˜][Û‹‹Z[ÌŠN
K™›ÜšÊ
JK›[[J
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ	š[˜\žT™XY\ÙN›™]È	š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹^]Š
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹™[YØ][Û”™\ÜÛœÙ\Ëœ\Ú
ÙK‘[YØ][Û”™\ÜÛœÙK™XÛÙJZ[ÌŠ
JJNØœ™XZÎØØ\ÙHŽœ‹œYÚ[˜][ÛUYK”YÙT™\ÜÛœÙK™XÛÙJZ[ÌŠ
JNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]^]Š
NÜ™]\›ˆ\œ˜^Kš\Ð\œ˜^JOË™[YØ][Û”™\ÜÛœÙ\ÊI‰Š‹™[YØ][Û”™\ÜÛœÙ\ÏYK™[YØ][Û”™\ÜÛœÙ\Ë›X\
OšÙK‘[YØ][Û”™\ÜÛœÙK™œ›ÛR”ÓÓŠ
JJK
Ýš\ÔÙ]
JKœYÚ[˜][ÛŠI‰Š‹œYÚ[˜][ÛUYK”YÙT™\ÜÛœÙK™œ›ÛR”ÓÓŠKœYÚ[˜][ÛŠJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK™[YØ][Û”™\ÜÛœÙ\ÏÛ‹™[YØ][Û”™\ÜÛœÙ\ÏYK™[YØ][Û”™\ÜÛœÙ\Ë›X\
OÚÙK‘[YØ][Û”™\ÜÛœÙKÒ”ÓÓŠ
N›ÚY
N›‹™[YØ][Û”™\ÜÛœÙ\ÏV×KKœYÚ[˜][ÛˆOO]›ÚY	‰Š‹œYÚ[˜][ÛYKœYÚ[˜][ÛÕYK”YÙT™\ÜÛœÙKÒ”ÓÓŠKœYÚ[˜][ÛŠN›ÚY
KŸKœ›ÛT\X[
J^Û]^]Š
NÜ™]\›ˆ‹™[YØ][Û”™\ÜÛœÙ\ÏYK™[YØ][Û”™\ÜÛœÙ\ÏË›X\
OšÙK‘[YØ][Û”™\ÜÛœÙK™œ›ÛT\X[

J_×KKœYÚ[˜][ÛˆOO]›ÚY	‰™KœYÚ[˜][ÛˆOO[[	‰Š‹œYÚ[˜][ÛUYK”YÙT™\ÜÛœÙK™œ›ÛT\X[
KœYÚ[˜][ÛŠJKŸ_NÙ[˜Ý[ÛˆŠ
^Ü™]\›žÙ[YØ]ÜYŽˆˆ‹YÚ[˜][ÛŽ›ÚY_XÙK”]Y\žQ[YØ]Ü•[˜›Û™[™Ñ[YØ][ÛœÔ™\]Y\Ý^Ý\U\›ˆ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK”]Y\žQ[YØ]Ü•[˜›Û™[™Ñ[YØ][ÛœÔ™\]Y\Ý‹[˜ÛÙJKIš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK™[YØ]ÜYˆOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊK™[YØ]ÜYŠKKœYÚ[˜][ÛˆOO]›ÚY	‰•YK”YÙT™\]Y\Ý™[˜ÛÙJKœYÚ[˜][Û‹‹Z[ÌŠN
K™›ÜšÊ
JK›[[J
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ	š[˜\žT™XY\ÙN›™]È	š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹PŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹™[YØ]ÜY]œÝš[™Ê
NØœ™XZÎØØ\ÙHŽœ‹œYÚ[˜][ÛUYK”YÙT™\]Y\Ý™XÛÙJZ[ÌŠ
JNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]PŠ
NÜ™]\›ŠÝš\ÔÙ]
JK™[YØ]ÜYŠI‰Š‹™[YØ]ÜYTÝš[™ÊK™[YØ]ÜYŠJK
Ýš\ÔÙ]
JKœYÚ[˜][ÛŠI‰Š‹œYÚ[˜][ÛUYK”YÙT™\]Y\Ý™œ›ÛR”ÓÓŠKœYÚ[˜][ÛŠJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK™[YØ]ÜYˆOO]›ÚY	‰Š‹™[YØ]ÜYYK™[YØ]ÜYŠKKœYÚ[˜][ÛˆOO]›ÚY	‰Š‹œYÚ[˜][ÛYKœYÚ[˜][ÛÕYK”YÙT™\]Y\ÝÒ”ÓÓŠKœYÚ[˜][ÛŠN›ÚY
KŸKœ›ÛT\X[
J^Û]PŠ
NÜ™]\›ˆ‹™[YØ]ÜYYK™[YØ]ÜYÏÈˆ‹KœYÚ[˜][ÛˆOO]›ÚY	‰™KœYÚ[˜][ÛˆOO[[	‰Š‹œYÚ[˜][ÛUYK”YÙT™\]Y\Ý™œ›ÛT\X[
KœYÚ[˜][ÛŠJKŸ_NÙ[˜Ý[Ûˆ]Š
^Ü™]\›žÝ[˜›Û™[™Ô™\ÜÛœÙ\Î–×KYÚ[˜][ÛŽ›ÚY_XÙK”]Y\žQ[YØ]Ü•[˜›Û™[™Ñ[YØ][ÛœÔ™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK”]Y\žQ[YØ]Ü•[˜›Û™[™Ñ[YØ][ÛœÔ™\ÜÛœÙH‹[˜ÛÙJKIš[˜\žUÜš]\‹˜Ü™X]J
J^Ù›ÜŠ]ÙˆK[˜›Û™[™Ô™\ÜÛœÙ\ÊZÙK•[˜›Û™[™Ñ[YØ][Û‹™[˜ÛÙJ‹Z[ÌŠL
K™›ÜšÊ
JK›[[J
NÜ™]\›ˆKœYÚ[˜][ÛˆOO]›ÚY	‰•YK”YÙT™\ÜÛœÙK™[˜ÛÙJKœYÚ[˜][Û‹‹Z[ÌŠN
K™›ÜšÊ
JK›[[J
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ	š[˜\žT™XY\ÙN›™]È	š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹[]Š
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹[˜›Û™[™Ô™\ÜÛœÙ\Ëœ\Ú
ÙK•[˜›Û™[™Ñ[YØ][Û‹™XÛÙJZ[ÌŠ
JJNØœ™XZÎØØ\ÙHŽœ‹œYÚ[˜][ÛUYK”YÙT™\ÜÛœÙK™XÛÙJZ[ÌŠ
JNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û][]Š
NÜ™]\›ˆ\œ˜^Kš\Ð\œ˜^JOË[˜›Û™[™Ô™\ÜÛœÙ\ÊI‰Š‹[˜›Û™[™Ô™\ÜÛœÙ\ÏYK[˜›Û™[™Ô™\ÜÛœÙ\Ë›X\
OšÙK•[˜›Û™[™Ñ[YØ][Û‹™œ›ÛR”ÓÓŠ
JJK
Ýš\ÔÙ]
JKœYÚ[˜][ÛŠI‰Š‹œYÚ[˜][ÛUYK”YÙT™\ÜÛœÙK™œ›ÛR”ÓÓŠKœYÚ[˜][ÛŠJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK[˜›Û™[™Ô™\ÜÛœÙ\ÏÛ‹[˜›Û™[™Ô™\ÜÛœÙ\ÏYK[˜›Û™[™Ô™\ÜÛœÙ\Ë›X\
OÚÙK•[˜›Û™[™Ñ[YØ][Û‹Ò”ÓÓŠ
N›ÚY
N›‹[˜›Û™[™Ô™\ÜÛœÙ\ÏV×KKœYÚ[˜][ÛˆOO]›ÚY	‰Š‹œYÚ[˜][ÛYKœYÚ[˜][ÛÕYK”YÙT™\ÜÛœÙKÒ”ÓÓŠKœYÚ[˜][ÛŠN›ÚY
KŸKœ›ÛT\X[
J^Û][]Š
NÜ™]\›ˆ‹[˜›Û™[™Ô™\ÜÛœÙ\ÏYK[˜›Û™[™Ô™\ÜÛœÙ\ÏË›X\
OšÙK•[˜›Û™[™Ñ[YØ][Û‹™œ›ÛT\X[

J_×KKœYÚ[˜][ÛˆOO]›ÚY	‰™KœYÚ[˜][ÛˆOO[[	‰Š‹œYÚ[˜][ÛUYK”YÙT™\ÜÛœÙK™œ›ÛT\X[
KœYÚ[˜][ÛŠJKŸ_NÙ[˜Ý[ÛˆÝŠ
^Ü™]\›žÙ[YØ]ÜYŽˆˆ‹Ü˜Õ˜[Y]ÜYŽˆˆ‹Ý˜[Y]ÜYŽˆˆ‹YÚ[˜][ÛŽ›ÚY_XÙK”]Y\žT™Y[YØ][ÛœÔ™\]Y\Ý^Ý\U\›ˆ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK”]Y\žT™Y[YØ][ÛœÔ™\]Y\Ý‹[˜ÛÙJKIš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK™[YØ]ÜYˆOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊK™[YØ]ÜYŠKKœÜ˜Õ˜[Y]ÜYˆOOHˆ‰‰›‹Z[ÌŠN
KœÝš[™ÊKœÜ˜Õ˜[Y]ÜYŠKK™Ý˜[Y]ÜYˆOOHˆ‰‰›‹Z[ÌŠŠKœÝš[™ÊK™Ý˜[Y]ÜYŠKKœYÚ[˜][ÛˆOO]›ÚY	‰•YK”YÙT™\]Y\Ý™[˜ÛÙJKœYÚ[˜][Û‹‹Z[ÌŠÍ
K™›ÜšÊ
JK›[[J
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ	š[˜\žT™XY\ÙN›™]È	š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹PÝŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹™[YØ]ÜY]œÝš[™Ê
NØœ™XZÎØØ\ÙHŽœ‹œÜ˜Õ˜[Y]ÜY]œÝš[™Ê
NØœ™XZÎØØ\ÙHÎœ‹™Ý˜[Y]ÜY]œÝš[™Ê
NØœ™XZÎØØ\ÙHœ‹œYÚ[˜][ÛUYK”YÙT™\]Y\Ý™XÛÙJZ[ÌŠ
JNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]PÝŠ
NÜ™]\›ŠÝš\ÔÙ]
JK™[YØ]ÜYŠI‰Š‹™[YØ]ÜYTÝš[™ÊK™[YØ]ÜYŠJK
Ýš\ÔÙ]
JKœÜ˜Õ˜[Y]ÜYŠI‰Š‹œÜ˜Õ˜[Y]ÜYTÝš[™ÊKœÜ˜Õ˜[Y]ÜYŠJK
Ýš\ÔÙ]
JK™Ý˜[Y]ÜYŠI‰Š‹™Ý˜[Y]ÜYTÝš[™ÊK™Ý˜[Y]ÜYŠJK
Ýš\ÔÙ]
JKœYÚ[˜][ÛŠI‰Š‹œYÚ[˜][ÛUYK”YÙT™\]Y\Ý™œ›ÛR”ÓÓŠKœYÚ[˜][ÛŠJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK™[YØ]ÜYˆOO]›ÚY	‰Š‹™[YØ]ÜYYK™[YØ]ÜYŠKKœÜ˜Õ˜[Y]ÜYˆOO]›ÚY	‰Š‹œÜ˜Õ˜[Y]ÜYYKœÜ˜Õ˜[Y]ÜYŠKK™Ý˜[Y]ÜYˆOO]›ÚY	‰Š‹™Ý˜[Y]ÜYYK™Ý˜[Y]ÜYŠKKœYÚ[˜][ÛˆOO]›ÚY	‰Š‹œYÚ[˜][ÛYKœYÚ[˜][ÛÕYK”YÙT™\]Y\ÝÒ”ÓÓŠKœYÚ[˜][ÛŠN›ÚY
KŸKœ›ÛT\X[
J^Û]PÝŠ
NÜ™]\›ˆ‹™[YØ]ÜYYK™[YØ]ÜYÏÈˆ‹‹œÜ˜Õ˜[Y]ÜYYKœÜ˜Õ˜[Y]ÜYÏÈˆ‹‹™Ý˜[Y]ÜYYK™Ý˜[Y]ÜYÏÈˆ‹KœYÚ[˜][ÛˆOO]›ÚY	‰™KœYÚ[˜][ÛˆOO[[	‰Š‹œYÚ[˜][ÛUYK”YÙT™\]Y\Ý™œ›ÛT\X[
KœYÚ[˜][ÛŠJKŸ_NÙ[˜Ý[ÛˆÝŠ
^Ü™]\›žÜ™Y[YØ][Û”™\ÜÛœÙ\Î–×KYÚ[˜][ÛŽ›ÚY_XÙK”]Y\žT™Y[YØ][ÛœÔ™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK”]Y\žT™Y[YØ][ÛœÔ™\ÜÛœÙH‹[˜ÛÙJKIš[˜\žUÜš]\‹˜Ü™X]J
J^Ù›ÜŠ]ÙˆKœ™Y[YØ][Û”™\ÜÛœÙ\ÊZÙK”™Y[YØ][Û”™\ÜÛœÙK™[˜ÛÙJ‹Z[ÌŠL
K™›ÜšÊ
JK›[[J
NÜ™]\›ˆKœYÚ[˜][ÛˆOO]›ÚY	‰•YK”YÙT™\ÜÛœÙK™[˜ÛÙJKœYÚ[˜][Û‹‹Z[ÌŠN
K™›ÜšÊ
JK›[[J
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ	š[˜\žT™XY\ÙN›™]È	š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹TÝŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹œ™Y[YØ][Û”™\ÜÛœÙ\Ëœ\Ú
ÙK”™Y[YØ][Û”™\ÜÛœÙK™XÛÙJZ[ÌŠ
JJNØœ™XZÎØØ\ÙHŽœ‹œYÚ[˜][ÛUYK”YÙT™\ÜÛœÙK™XÛÙJZ[ÌŠ
JNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]TÝŠ
NÜ™]\›ˆ\œ˜^Kš\Ð\œ˜^JOËœ™Y[YØ][Û”™\ÜÛœÙ\ÊI‰Š‹œ™Y[YØ][Û”™\ÜÛœÙ\ÏYKœ™Y[YØ][Û”™\ÜÛœÙ\Ë›X\
OšÙK”™Y[YØ][Û”™\ÜÛœÙK™œ›ÛR”ÓÓŠ
JJK
Ýš\ÔÙ]
JKœYÚ[˜][ÛŠI‰Š‹œYÚ[˜][ÛUYK”YÙT™\ÜÛœÙK™œ›ÛR”ÓÓŠKœYÚ[˜][ÛŠJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆKœ™Y[YØ][Û”™\ÜÛœÙ\ÏÛ‹œ™Y[YØ][Û”™\ÜÛœÙ\ÏYKœ™Y[YØ][Û”™\ÜÛœÙ\Ë›X\
OÚÙK”™Y[YØ][Û”™\ÜÛœÙKÒ”ÓÓŠ
N›ÚY
N›‹œ™Y[YØ][Û”™\ÜÛœÙ\ÏV×KKœYÚ[˜][ÛˆOO]›ÚY	‰Š‹œYÚ[˜][ÛYKœYÚ[˜][ÛÕYK”YÙT™\ÜÛœÙKÒ”ÓÓŠKœYÚ[˜][ÛŠN›ÚY
KŸKœ›ÛT\X[
J^Û]TÝŠ
NÜ™]\›ˆ‹œ™Y[YØ][Û”™\ÜÛœÙ\ÏYKœ™Y[YØ][Û”™\ÜÛœÙ\ÏË›X\
OšÙK”™Y[YØ][Û”™\ÜÛœÙK™œ›ÛT\X[

J_×KKœYÚ[˜][ÛˆOO]›ÚY	‰™KœYÚ[˜][ÛˆOO[[	‰Š‹œYÚ[˜][ÛUYK”YÙT™\ÜÛœÙK™œ›ÛT\X[
KœYÚ[˜][ÛŠJKŸ_NÙ[˜Ý[ÛˆÝŠ
^Ü™]\›žÙ[YØ]ÜYŽˆˆ‹YÚ[˜][ÛŽ›ÚY_XÙK”]Y\žQ[YØ]Ü•˜[Y]ÜœÔ™\]Y\Ý^Ý\U\›ˆ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK”]Y\žQ[YØ]Ü•˜[Y]ÜœÔ™\]Y\Ý‹[˜ÛÙJKIš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK™[YØ]ÜYˆOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊK™[YØ]ÜYŠKKœYÚ[˜][ÛˆOO]›ÚY	‰•YK”YÙT™\]Y\Ý™[˜ÛÙJKœYÚ[˜][Û‹‹Z[ÌŠN
K™›ÜšÊ
JK›[[J
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ	š[˜\žT™XY\ÙN›™]È	š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹ZÝŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹™[YØ]ÜY]œÝš[™Ê
NØœ™XZÎØØ\ÙHŽœ‹œYÚ[˜][ÛUYK”YÙT™\]Y\Ý™XÛÙJZ[ÌŠ
JNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]ZÝŠ
NÜ™]\›ŠÝš\ÔÙ]
JK™[YØ]ÜYŠI‰Š‹™[YØ]ÜYTÝš[™ÊK™[YØ]ÜYŠJK
Ýš\ÔÙ]
JKœYÚ[˜][ÛŠI‰Š‹œYÚ[˜][ÛUYK”YÙT™\]Y\Ý™œ›ÛR”ÓÓŠKœYÚ[˜][ÛŠJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK™[YØ]ÜYˆOO]›ÚY	‰Š‹™[YØ]ÜYYK™[YØ]ÜYŠKKœYÚ[˜][ÛˆOO]›ÚY	‰Š‹œYÚ[˜][ÛYKœYÚ[˜][ÛÕYK”YÙT™\]Y\ÝÒ”ÓÓŠKœYÚ[˜][ÛŠN›ÚY
KŸKœ›ÛT\X[
J^Û]ZÝŠ
NÜ™]\›ˆ‹™[YØ]ÜYYK™[YØ]ÜYÏÈˆ‹KœYÚ[˜][ÛˆOO]›ÚY	‰™KœYÚ[˜][ÛˆOO[[	‰Š‹œYÚ[˜][ÛUYK”YÙT™\]Y\Ý™œ›ÛT\X[
KœYÚ[˜][ÛŠJKŸ_NÙ[˜Ý[Ûˆ]Š
^Ü™]\›žÝ˜[Y]ÜœÎ–×KYÚ[˜][ÛŽ›ÚY_XÙK”]Y\žQ[YØ]Ü•˜[Y]ÜœÔ™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK”]Y\žQ[YØ]Ü•˜[Y]ÜœÔ™\ÜÛœÙH‹[˜ÛÙJKIš[˜\žUÜš]\‹˜Ü™X]J
J^Ù›ÜŠ]ÙˆK˜[Y]ÜœÊZÙK•˜[Y]Ü‹™[˜ÛÙJ‹Z[ÌŠL
K™›ÜšÊ
JK›[[J
NÜ™]\›ˆKœYÚ[˜][ÛˆOO]›ÚY	‰•YK”YÙT™\ÜÛœÙK™[˜ÛÙJKœYÚ[˜][Û‹‹Z[ÌŠN
K™›ÜšÊ
JK›[[J
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ	š[˜\žT™XY\ÙN›™]È	š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹Q]Š
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹˜[Y]ÜœËœ\Ú
ÙK•˜[Y]Ü‹™XÛÙJZ[ÌŠ
JJNØœ™XZÎØØ\ÙHŽœ‹œYÚ[˜][ÛUYK”YÙT™\ÜÛœÙK™XÛÙJZ[ÌŠ
JNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]Q]Š
NÜ™]\›ˆ\œ˜^Kš\Ð\œ˜^JOË˜[Y]ÜœÊI‰Š‹˜[Y]ÜœÏYK˜[Y]ÜœË›X\
OšÙK•˜[Y]Ü‹™œ›ÛR”ÓÓŠ
JJK
Ýš\ÔÙ]
JKœYÚ[˜][ÛŠI‰Š‹œYÚ[˜][ÛUYK”YÙT™\ÜÛœÙK™œ›ÛR”ÓÓŠKœYÚ[˜][ÛŠJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK˜[Y]ÜœÏÛ‹˜[Y]ÜœÏYK˜[Y]ÜœË›X\
OÚÙK•˜[Y]Ü‹Ò”ÓÓŠ
N›ÚY
N›‹˜[Y]ÜœÏV×KKœYÚ[˜][ÛˆOO]›ÚY	‰Š‹œYÚ[˜][ÛYKœYÚ[˜][ÛÕYK”YÙT™\ÜÛœÙKÒ”ÓÓŠKœYÚ[˜][ÛŠN›ÚY
KŸKœ›ÛT\X[
J^Û]Q]Š
NÜ™]\›ˆ‹˜[Y]ÜœÏYK˜[Y]ÜœÏË›X\
OšÙK•˜[Y]Ü‹™œ›ÛT\X[

J_×KKœYÚ[˜][ÛˆOO]›ÚY	‰™KœYÚ[˜][ÛˆOO[[	‰Š‹œYÚ[˜][ÛUYK”YÙT™\ÜÛœÙK™œ›ÛT\X[
KœYÚ[˜][ÛŠJKŸ_NÙ[˜Ý[Ûˆ]Š
^Ü™]\›žÙ[YØ]ÜYŽˆˆ‹˜[Y]ÜYŽˆˆŸ_XÙK”]Y\žQ[YØ]Ü•˜[Y]Ü”™\]Y\Ý^Ý\U\›ˆ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK”]Y\žQ[YØ]Ü•˜[Y]Ü”™\]Y\Ý‹[˜ÛÙJKIš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK™[YØ]ÜYˆOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊK™[YØ]ÜYŠKK˜[Y]ÜYˆOOHˆ‰‰›‹Z[ÌŠN
KœÝš[™ÊK˜[Y]ÜYŠKŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ	š[˜\žT™XY\ÙN›™]È	š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹T]Š
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹™[YØ]ÜY]œÝš[™Ê
NØœ™XZÎØØ\ÙHŽœ‹˜[Y]ÜY]œÝš[™Ê
NØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]T]Š
NÜ™]\›ŠÝš\ÔÙ]
JK™[YØ]ÜYŠI‰Š‹™[YØ]ÜYTÝš[™ÊK™[YØ]ÜYŠJK
Ýš\ÔÙ]
JK˜[Y]ÜYŠI‰Š‹˜[Y]ÜYTÝš[™ÊK˜[Y]ÜYŠJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK™[YØ]ÜYˆOO]›ÚY	‰Š‹™[YØ]ÜYYK™[YØ]ÜYŠKK˜[Y]ÜYˆOO]›ÚY	‰Š‹˜[Y]ÜYYK˜[Y]ÜYŠKŸKœ›ÛT\X[
J^Û]T]Š
NÜ™]\›ˆ‹™[YØ]ÜYYK™[YØ]ÜYÏÈˆ‹‹˜[Y]ÜYYK˜[Y]ÜYÏÈˆ‹Ÿ_NÙ[˜Ý[ÛˆÝŠ
^Ü™]\›žÝ˜[Y]ÜŽšÙK•˜[Y]Ü‹™œ›ÛT\X[
ßJ__XÙK”]Y\žQ[YØ]Ü•˜[Y]Ü”™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK”]Y\žQ[YØ]Ü•˜[Y]Ü”™\ÜÛœÙH‹[˜ÛÙJKIš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK˜[Y]ÜˆOO]›ÚY	‰šÙK•˜[Y]Ü‹™[˜ÛÙJK˜[Y]Ü‹‹Z[ÌŠL
K™›ÜšÊ
JK›[[J
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ	š[˜\žT™XY\ÙN›™]È	š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹]ÝŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÛÏŒÏOOLOÜ‹˜[Y]ÜZÙK•˜[Y]Ü‹™XÛÙJZ[ÌŠ
JNœÚÚ\\JÉÊ_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]]ÝŠ
NÜ™]\›ŠÝš\ÔÙ]
JK˜[Y]ÜŠI‰Š‹˜[Y]ÜZÙK•˜[Y]Ü‹™œ›ÛR”ÓÓŠK˜[Y]ÜŠJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK˜[Y]ÜˆOO]›ÚY	‰Š‹˜[Y]ÜYK˜[Y]ÜÚÙK•˜[Y]Ü‹Ò”ÓÓŠK˜[Y]ÜŠN›ÚY
KŸKœ›ÛT\X[
J^Û]]ÝŠ
NÜ™]\›ˆK˜[Y]ÜˆOO]›ÚY	‰™K˜[Y]ÜˆOO[[	‰Š‹˜[Y]ÜZÙK•˜[Y]Ü‹™œ›ÛT\X[
K˜[Y]ÜŠJKŸ_NÙ[˜Ý[ÛˆŠ
^Ü™]\›žÚZYÚšYÒ[

__XÙK”]Y\žR\ÝÜšXØ[[™›Ô™\]Y\Ý^Ý\U\›ˆ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK”]Y\žR\ÝÜšXØ[[™›Ô™\]Y\Ý‹[˜ÛÙJKIš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆKšZYÚOOPšYÒ[

I‰›‹Z[ÌŠ
Kš[
KšZYÚ
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ	š[˜\žT™XY\ÙN›™]È	š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹TŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÛÏŒÏOOLOÜ‹šZYÚ]š[

NœÚÚ\\JÉÊ_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]TŠ
NÜ™]\›ŠÝš\ÔÙ]
JKšZYÚ
I‰Š‹šZYÚPšYÒ[
KšZYÚÔÝš[™Ê
JJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆKšZYÚOO]›ÚY	‰Š‹šZYÚJKšZYÚšYÒ[

JKÔÝš[™Ê
JKŸKœ›ÛT\X[
J^Û]TŠ
NÜ™]\›ˆKšZYÚOO]›ÚY	‰™KšZYÚOO[[	‰Š‹šZYÚPšYÒ[
KšZYÚÔÝš[™Ê
JJKŸ_NÙ[˜Ý[ÛˆŠ
^Ü™]\›žÚ\Ý›ÚY_XÙK”]Y\žR\ÝÜšXØ[[™›Ô™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK”]Y\žR\ÝÜšXØ[[™›Ô™\ÜÛœÙH‹[˜ÛÙJKIš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆKš\ÝOO]›ÚY	‰šÙK’\ÝÜšXØ[[™›Ë™[˜ÛÙJKš\Ý‹Z[ÌŠL
K™›ÜšÊ
JK›[[J
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ	š[˜\žT™XY\ÙN›™]È	š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹XŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÛÏŒÏOOLOÜ‹š\ÝZÙK’\ÝÜšXØ[[™›Ë™XÛÙJZ[ÌŠ
JNœÚÚ\\JÉÊ_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]XŠ
NÜ™]\›ŠÝš\ÔÙ]
JKš\Ý
I‰Š‹š\ÝZÙK’\ÝÜšXØ[[™›Ë™œ›ÛR”ÓÓŠKš\Ý
JKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆKš\ÝOO]›ÚY	‰Š‹š\ÝYKš\ÝÚÙK’\ÝÜšXØ[[™›ËÒ”ÓÓŠKš\Ý
N›ÚY
KŸKœ›ÛT\X[
J^Û]XŠ
NÜ™]\›ˆKš\ÝOO]›ÚY	‰™Kš\ÝOO[[	‰Š‹š\ÝZÙK’\ÝÜšXØ[[™›Ë™œ›ÛT\X[
Kš\Ý
JKŸ_NÙ[˜Ý[ÛˆŠ
^Ü™]\›žß_XÙK”]Y\žTÛÛ™\]Y\Ý^Ý\U\›ˆ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK”]Y\žTÛÛ™\]Y\Ý‹[˜ÛÙJKIš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ	š[˜\žT™XY\ÙN›™]È	š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹TŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Ü™]\›ˆŠ
_KÒ”ÓÓŠJ^Ü™]\›žß_Kœ›ÛT\X[
J^Ü™]\›ˆŠ
__NÙ[˜Ý[ÛˆŠ
^Ü™]\›žÜÛÛšÙK”ÛÛ™œ›ÛT\X[
ßJ__XÙK”]Y\žTÛÛ™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK”]Y\žTÛÛ™\ÜÛœÙH‹[˜ÛÙJKIš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆKœÛÛOO]›ÚY	‰šÙK”ÛÛ™[˜ÛÙJKœÛÛ‹Z[ÌŠL
K™›ÜšÊ
JK›[[J
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ	š[˜\žT™XY\ÙN›™]È	š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹SŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÛÏŒÏOOLOÜ‹œÛÛZÙK”ÛÛ™XÛÙJZ[ÌŠ
JNœÚÚ\\JÉÊ_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]SŠ
NÜ™]\›ŠÝš\ÔÙ]
JKœÛÛ
I‰Š‹œÛÛZÙK”ÛÛ™œ›ÛR”ÓÓŠKœÛÛ
JKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆKœÛÛOO]›ÚY	‰Š‹œÛÛYKœÛÛÚÙK”ÛÛÒ”ÓÓŠKœÛÛ
N›ÚY
KŸKœ›ÛT\X[
J^Û]SŠ
NÜ™]\›ˆKœÛÛOO]›ÚY	‰™KœÛÛOO[[	‰Š‹œÛÛZÙK”ÛÛ™œ›ÛT\X[
KœÛÛ
JKŸ_NÙ[˜Ý[ÛˆŠ
^Ü™]\›žß_XÙK”]Y\žT\˜[\Ô™\]Y\Ý^Ý\U\›ˆ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK”]Y\žT\˜[\Ô™\]Y\Ý‹[˜ÛÙJKIš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ	š[˜\žT™XY\ÙN›™]È	š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹]Š
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Ü™]\›ˆŠ
_KÒ”ÓÓŠJ^Ü™]\›žß_Kœ›ÛT\X[
J^Ü™]\›ˆŠ
__NÙ[˜Ý[ÛˆÝŠ
^Ü™]\›žÜ\˜[\ÎšÙK”\˜[\Ë™œ›ÛT\X[
ßJ__XÙK”]Y\žT\˜[\Ô™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK”]Y\žT\˜[\Ô™\ÜÛœÙH‹[˜ÛÙJKIš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆKœ\˜[\ÈOO]›ÚY	‰šÙK”\˜[\Ë™[˜ÛÙJKœ\˜[\Ë‹Z[ÌŠL
K™›ÜšÊ
JK›[[J
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ	š[˜\žT™XY\ÙN›™]È	š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹SÝŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÛÏŒÏOOLOÜ‹œ\˜[\ÏZÙK”\˜[\Ë™XÛÙJZ[ÌŠ
JNœÚÚ\\JÉÊ_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]SÝŠ
NÜ™]\›ŠÝš\ÔÙ]
JKœ\˜[\ÊI‰Š‹œ\˜[\ÏZÙK”\˜[\Ë™œ›ÛR”ÓÓŠKœ\˜[\ÊJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆKœ\˜[\ÈOO]›ÚY	‰Š‹œ\˜[\ÏYKœ\˜[\ÏÚÙK”\˜[\ËÒ”ÓÓŠKœ\˜[\ÊN›ÚY
KŸKœ›ÛT\X[
J^Û]SÝŠ
NÜ™]\›ˆKœ\˜[\ÈOO]›ÚY	‰™Kœ\˜[\ÈOO[[	‰Š‹œ\˜[\ÏZÙK”\˜[\Ë™œ›ÛT\X[
Kœ\˜[\ÊJKŸ_NÝ˜\ˆXÛ\ÜÞÜœÎØÛÛœÝXÝÜŠŠ^Ý\ËœœÏ[‹\Ë•˜[Y]ÜœÏ]\Ë•˜[Y]ÜœË˜š[™
\ÊK\Ë•˜[Y]Ü]\Ë•˜[Y]Ü‹˜š[™
\ÊK\Ë•˜[Y]Ü‘[YØ][ÛœÏ]\Ë•˜[Y]Ü‘[YØ][ÛœË˜š[™
\ÊK\Ë•˜[Y]Ü•[˜›Û™[™Ñ[YØ][ÛœÏ]\Ë•˜[Y]Ü•[˜›Û™[™Ñ[YØ][ÛœË˜š[™
\ÊK\Ë‘[YØ][Û]\Ë‘[YØ][Û‹˜š[™
\ÊK\Ë•[˜›Û™[™Ñ[YØ][Û]\Ë•[˜›Û™[™Ñ[YØ][Û‹˜š[™
\ÊK\Ë‘[YØ]Ü‘[YØ][ÛœÏ]\Ë‘[YØ]Ü‘[YØ][ÛœË˜š[™
\ÊK\Ë‘[YØ]Ü•[˜›Û™[™Ñ[YØ][ÛœÏ]\Ë‘[YØ]Ü•[˜›Û™[™Ñ[YØ][ÛœË˜š[™
\ÊK\Ë”™Y[YØ][ÛœÏ]\Ë”™Y[YØ][ÛœË˜š[™
\ÊK\Ë‘[YØ]Ü•˜[Y]ÜœÏ]\Ë‘[YØ]Ü•˜[Y]ÜœË˜š[™
\ÊK\Ë‘[YØ]Ü•˜[Y]Ü]\Ë‘[YØ]Ü•˜[Y]Ü‹˜š[™
\ÊK\Ë’\ÝÜšXØ[[™›Ï]\Ë’\ÝÜšXØ[[™›Ë˜š[™
\ÊK\Ë”ÛÛ]\Ë”ÛÛ˜š[™
\ÊK\Ë”\˜[\Ï]\Ë”\˜[\Ë˜š[™
\Ê_U˜[Y]ÜœÊŠ^Û]XÙK”]Y\žU˜[Y]ÜœÔ™\]Y\Ý™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK”]Y\žH‹•˜[Y]ÜœÈ‹
K[ŠO˜ÙK”]Y\žU˜[Y]ÜœÔ™\ÜÛœÙK™XÛÙJ™]È	š[˜\žT™XY\ŠŠJJ_U˜[Y]ÜŠŠ^Û]XÙK”]Y\žU˜[Y]Ü”™\]Y\Ý™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK”]Y\žH‹•˜[Y]Üˆ‹
K[ŠO˜ÙK”]Y\žU˜[Y]Ü”™\ÜÛœÙK™XÛÙJ™]È	š[˜\žT™XY\ŠŠJJ_U˜[Y]Ü‘[YØ][ÛœÊŠ^Û]XÙK”]Y\žU˜[Y]Ü‘[YØ][ÛœÔ™\]Y\Ý™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK”]Y\žH‹•˜[Y]Ü‘[YØ][ÛœÈ‹
K[ŠO˜ÙK”]Y\žU˜[Y]Ü‘[YØ][ÛœÔ™\ÜÛœÙK™XÛÙJ™]È	š[˜\žT™XY\ŠŠJJ_U˜[Y]Ü•[˜›Û™[™Ñ[YØ][ÛœÊŠ^Û]XÙK”]Y\žU˜[Y]Ü•[˜›Û™[™Ñ[YØ][ÛœÔ™\]Y\Ý™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK”]Y\žH‹•˜[Y]Ü•[˜›Û™[™Ñ[YØ][ÛœÈ‹
K[ŠO˜ÙK”]Y\žU˜[Y]Ü•[˜›Û™[™Ñ[YØ][ÛœÔ™\ÜÛœÙK™XÛÙJ™]È	š[˜\žT™XY\ŠŠJJ_Q[YØ][ÛŠŠ^Û]XÙK”]Y\žQ[YØ][Û”™\]Y\Ý™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK”]Y\žH‹‘[YØ][Ûˆ‹
K[ŠO˜ÙK”]Y\žQ[YØ][Û”™\ÜÛœÙK™XÛÙJ™]È	š[˜\žT™XY\ŠŠJJ_U[˜›Û™[™Ñ[YØ][ÛŠŠ^Û]XÙK”]Y\žU[˜›Û™[™Ñ[YØ][Û”™\]Y\Ý™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK”]Y\žH‹•[˜›Û™[™Ñ[YØ][Ûˆ‹
K[ŠO˜ÙK”]Y\žU[˜›Û™[™Ñ[YØ][Û”™\ÜÛœÙK™XÛÙJ™]È	š[˜\žT™XY\ŠŠJJ_Q[YØ]Ü‘[YØ][ÛœÊŠ^Û]XÙK”]Y\žQ[YØ]Ü‘[YØ][ÛœÔ™\]Y\Ý™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK”]Y\žH‹‘[YØ]Ü‘[YØ][ÛœÈ‹
K[ŠO˜ÙK”]Y\žQ[YØ]Ü‘[YØ][ÛœÔ™\ÜÛœÙK™XÛÙJ™]È	š[˜\žT™XY\ŠŠJJ_Q[YØ]Ü•[˜›Û™[™Ñ[YØ][ÛœÊŠ^Û]XÙK”]Y\žQ[YØ]Ü•[˜›Û™[™Ñ[YØ][ÛœÔ™\]Y\Ý™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK”]Y\žH‹‘[YØ]Ü•[˜›Û™[™Ñ[YØ][ÛœÈ‹
K[ŠO˜ÙK”]Y\žQ[YØ]Ü•[˜›Û™[™Ñ[YØ][ÛœÔ™\ÜÛœÙK™XÛÙJ™]È	š[˜\žT™XY\ŠŠJJ_T™Y[YØ][ÛœÊŠ^Û]XÙK”]Y\žT™Y[YØ][ÛœÔ™\]Y\Ý™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK”]Y\žH‹”™Y[YØ][ÛœÈ‹
K[ŠO˜ÙK”]Y\žT™Y[YØ][ÛœÔ™\ÜÛœÙK™XÛÙJ™]È	š[˜\žT™XY\ŠŠJJ_Q[YØ]Ü•˜[Y]ÜœÊŠ^Û]XÙK”]Y\žQ[YØ]Ü•˜[Y]ÜœÔ™\]Y\Ý™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK”]Y\žH‹‘[YØ]Ü•˜[Y]ÜœÈ‹
K[ŠO˜ÙK”]Y\žQ[YØ]Ü•˜[Y]ÜœÔ™\ÜÛœÙK™XÛÙJ™]È	š[˜\žT™XY\ŠŠJJ_Q[YØ]Ü•˜[Y]ÜŠŠ^Û]XÙK”]Y\žQ[YØ]Ü•˜[Y]Ü”™\]Y\Ý™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK”]Y\žH‹‘[YØ]Ü•˜[Y]Üˆ‹
K[ŠO˜ÙK”]Y\žQ[YØ]Ü•˜[Y]Ü”™\ÜÛœÙK™XÛÙJ™]È	š[˜\žT™XY\ŠŠJJ_R\ÝÜšXØ[[™›ÊŠ^Û]XÙK”]Y\žR\ÝÜšXØ[[™›Ô™\]Y\Ý™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK”]Y\žH‹’\ÝÜšXØ[[™›È‹
K[ŠO˜ÙK”]Y\žR\ÝÜšXØ[[™›Ô™\ÜÛœÙK™XÛÙJ™]È	š[˜\žT™XY\ŠŠJJ_TÛÛ
^ßJ^Û]XÙK”]Y\žTÛÛ™\]Y\Ý™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK”]Y\žH‹”ÛÛ‹
K[ŠO˜ÙK”]Y\žTÛÛ™\ÜÛœÙK™XÛÙJ™]È	š[˜\žT™XY\ŠŠJJ_T\˜[\Ê^ßJ^Û]XÙK”]Y\žT\˜[\Ô™\]Y\Ý™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK”]Y\žH‹”\˜[\È‹
K[ŠO˜ÙK”]Y\žT\˜[\Ô™\ÜÛœÙK™XÛÙJ™]È	š[˜\žT™XY\ŠŠJJ__NØÙK”]Y\žPÛY[[\QŸJNÝ˜\ˆ—ÏRJ]OžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\J]‹—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÕ]‹œÙ]\ÝZÚ[™Ñ^[œÚ[ÛP‰Ý˜\ˆI^Ê
K˜ÏPÛÊ
NÙ[˜Ý[Ûˆ‰
J^Û]J˜Ë˜Ü™X]T›ÝØY”œÐÛY[
JJK[™]ÈI”]Y\žPÛY[[\
ŠNÜ™]\›žÜÝZÚ[™ÎžÙ[YØ][ÛŽ˜\Þ[˜ÊKŠOO˜]ØZ]‘[YØ][ÛŠÙ[YØ]ÜYŽšK˜[Y]ÜYŽœŸJK[YØ]Ü‘[YØ][ÛœÎ˜\Þ[˜ÊKŠOO˜]ØZ]‘[YØ]Ü‘[YØ][ÛœÊÙ[YØ]ÜYŽšKYÚ[˜][ÛŽŠ˜Ë˜Ü™X]TYÚ[˜][ÛŠJŠ_JK[YØ]Ü•[˜›Û™[™Ñ[YØ][ÛœÎ˜\Þ[˜ÊKŠOO˜]ØZ]‘[YØ]Ü•[˜›Û™[™Ñ[YØ][ÛœÊÙ[YØ]ÜYŽšKYÚ[˜][ÛŽŠ˜Ë˜Ü™X]TYÚ[˜][ÛŠJŠ_JK[YØ]Ü•˜[Y]ÜŽ˜\Þ[˜ÊKŠOO˜]ØZ]‘[YØ]Ü•˜[Y]ÜŠÙ[YØ]ÜYŽšK˜[Y]ÜYŽœŸJK[YØ]Ü•˜[Y]ÜœÎ˜\Þ[˜ÊKŠOO˜]ØZ]‘[YØ]Ü•˜[Y]ÜœÊÙ[YØ]ÜYŽšKYÚ[˜][ÛŽŠ˜Ë˜Ü™X]TYÚ[˜][ÛŠJŠ_JK\ÝÜšXØ[[™›Î˜\Þ[˜ÈOO˜]ØZ]’\ÝÜšXØ[[™›ÊÚZYÚšYÒ[
J_JK\˜[\Î˜\Þ[˜Ê
OO˜]ØZ]”\˜[\ÊßJKÛÛ˜\Þ[˜Ê
OO˜]ØZ]”ÛÛ
ßJK™Y[YØ][ÛœÎ˜\Þ[˜ÊK‹ËJOO˜]ØZ]”™Y[YØ][ÛœÊÙ[YØ]ÜYŽšKÜ˜Õ˜[Y]ÜYŽœ‹Ý˜[Y]ÜYŽ›ËYÚ[˜][ÛŽŠ˜Ë˜Ü™X]TYÚ[˜][ÛŠJJ_JK[˜›Û™[™Ñ[YØ][ÛŽ˜\Þ[˜ÊKŠOO˜]ØZ]•[˜›Û™[™Ñ[YØ][ÛŠÙ[YØ]ÜYŽšK˜[Y]ÜYŽœŸJK˜[Y]ÜŽ˜\Þ[˜ÈOO˜]ØZ]•˜[Y]ÜŠÝ˜[Y]ÜYŽš_JK˜[Y]Ü‘[YØ][ÛœÎ˜\Þ[˜ÊKŠOO˜]ØZ]•˜[Y]Ü‘[YØ][ÛœÊÝ˜[Y]ÜYŽšKYÚ[˜][ÛŽŠ˜Ë˜Ü™X]TYÚ[˜][ÛŠJŠ_JK˜[Y]ÜœÎ˜\Þ[˜ÊKŠOO˜]ØZ]•˜[Y]ÜœÊÜÝ]\ÎšKYÚ[˜][ÛŽŠ˜Ë˜Ü™X]TYÚ[˜][ÛŠJŠ_JK˜[Y]Ü•[˜›Û™[™Ñ[YØ][ÛœÎ˜\Þ[˜ÊKŠOO˜]ØZ]•˜[Y]Ü•[˜›Û™[™Ñ[YØ][ÛœÊÝ˜[Y]ÜYŽšKYÚ[˜][ÛŽŠ˜Ë˜Ü™X]TYÚ[˜][ÛŠJŠ_J____JNÝ˜\ˆWÏRJœOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\Jœ‹—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÛœ‹‘]šY[˜ÙS\Ý[œ‹“YÚÛY[]XÚÑ]šY[˜ÙO[œ‹‘\XØ]U›ÝQ]šY[˜ÙO[œ‹‘]šY[˜ÙO[œ‹œ›ÝØY”XÚØYÙO]›ÚYÝ˜\ˆ›ÏZJ
KXÏVZJ
KÙÏY™Ê
K˜OTÙJ
KÛÏQYJ
NÛœ‹œ›ÝØY”XÚØYÙOH[™\›Z[\\ÈŽÙ[˜Ý[ÛˆŠ
^Ü™]\›žÙ\XØ]U›ÝQ]šY[˜ÙN›ÚYYÚÛY[]XÚÑ]šY[˜ÙN›ÚY_[œ‹‘]šY[˜ÙO^Ý\U\›ˆ‹Ý[™\›Z[\\Ë‘]šY[˜ÙH‹[˜ÛÙJKU˜Kš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK™\XØ]U›ÝQ]šY[˜ÙHOO]›ÚY	‰›œ‹‘\XØ]U›ÝQ]šY[˜ÙK™[˜ÛÙJK™\XØ]U›ÝQ]šY[˜ÙK‹Z[ÌŠL
K™›ÜšÊ
JK›[[J
KK›YÚÛY[]XÚÑ]šY[˜ÙHOO]›ÚY	‰›œ‹“YÚÛY[]XÚÑ]šY[˜ÙK™[˜ÛÙJK›YÚÛY[]XÚÑ]šY[˜ÙK‹Z[ÌŠN
K™›ÜšÊ
JK›[[J
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ˜Kš[˜\žT™XY\ÙN›™]È˜Kš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹UŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹™\XØ]U›ÝQ]šY[˜ÙO[œ‹‘\XØ]U›ÝQ]šY[˜ÙK™XÛÙJZ[ÌŠ
JNØœ™XZÎØØ\ÙHŽœ‹›YÚÛY[]XÚÑ]šY[˜ÙO[œ‹“YÚÛY[]XÚÑ]šY[˜ÙK™XÛÙJZ[ÌŠ
JNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]UŠ
NÜ™]\›ŠÛËš\ÔÙ]
JK™\XØ]U›ÝQ]šY[˜ÙJI‰Š‹™\XØ]U›ÝQ]šY[˜ÙO[œ‹‘\XØ]U›ÝQ]šY[˜ÙK™œ›ÛR”ÓÓŠK™\XØ]U›ÝQ]šY[˜ÙJJK
ÛËš\ÔÙ]
JK›YÚÛY[]XÚÑ]šY[˜ÙJI‰Š‹›YÚÛY[]XÚÑ]šY[˜ÙO[œ‹“YÚÛY[]XÚÑ]šY[˜ÙK™œ›ÛR”ÓÓŠK›YÚÛY[]XÚÑ]šY[˜ÙJJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK™\XØ]U›ÝQ]šY[˜ÙHOO]›ÚY	‰Š‹™\XØ]U›ÝQ]šY[˜ÙOYK™\XØ]U›ÝQ]šY[˜ÙOÛœ‹‘\XØ]U›ÝQ]šY[˜ÙKÒ”ÓÓŠK™\XØ]U›ÝQ]šY[˜ÙJN›ÚY
KK›YÚÛY[]XÚÑ]šY[˜ÙHOO]›ÚY	‰Š‹›YÚÛY[]XÚÑ]šY[˜ÙOYK›YÚÛY[]XÚÑ]šY[˜ÙOÛœ‹“YÚÛY[]XÚÑ]šY[˜ÙKÒ”ÓÓŠK›YÚÛY[]XÚÑ]šY[˜ÙJN›ÚY
KŸKœ›ÛT\X[
J^Û]UŠ
NÜ™]\›ˆK™\XØ]U›ÝQ]šY[˜ÙHOO]›ÚY	‰™K™\XØ]U›ÝQ]šY[˜ÙHOO[[	‰Š‹™\XØ]U›ÝQ]šY[˜ÙO[œ‹‘\XØ]U›ÝQ]šY[˜ÙK™œ›ÛT\X[
K™\XØ]U›ÝQ]šY[˜ÙJJKK›YÚÛY[]XÚÑ]šY[˜ÙHOO]›ÚY	‰™K›YÚÛY[]XÚÑ]šY[˜ÙHOO[[	‰Š‹›YÚÛY[]XÚÑ]šY[˜ÙO[œ‹“YÚÛY[]XÚÑ]šY[˜ÙK™œ›ÛT\X[
K›YÚÛY[]XÚÑ]šY[˜ÙJJKŸ_NÙ[˜Ý[ÛˆŠ
^Ü™]\›žÝ›ÝPN›ÚY›ÝPŽ›ÚYÝ[›Ý[™ÔÝÙ\ŽšYÒ[

K˜[Y]Ü”ÝÙ\ŽšYÒ[

K[Y\Ý[\œXË•[Y\Ý[\™œ›ÛT\X[
ßJ__[œ‹‘\XØ]U›ÝQ]šY[˜ÙO^Ý\U\›ˆ‹Ý[™\›Z[\\Ë‘\XØ]U›ÝQ]šY[˜ÙH‹[˜ÛÙJKU˜Kš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK›ÝPHOO]›ÚY	‰›Ë•›ÝK™[˜ÛÙJK›ÝPK‹Z[ÌŠL
K™›ÜšÊ
JK›[[J
KK›ÝPˆOO]›ÚY	‰›Ë•›ÝK™[˜ÛÙJK›ÝP‹‹Z[ÌŠN
K™›ÜšÊ
JK›[[J
KKÝ[›Ý[™ÔÝÙ\ˆOOPšYÒ[

I‰›‹Z[ÌŠ
Kš[
KÝ[›Ý[™ÔÝÙ\ŠKK˜[Y]Ü”ÝÙ\ˆOOPšYÒ[

I‰›‹Z[ÌŠÌŠKš[
K˜[Y]Ü”ÝÙ\ŠKK[Y\Ý[\OO]›ÚY	‰œXË•[Y\Ý[\™[˜ÛÙJK[Y\Ý[\‹Z[ÌŠŠK™›ÜšÊ
JK›[[J
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ˜Kš[˜\žT™XY\ÙN›™]È˜Kš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹^Š
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹›ÝPO]›Ë•›ÝK™XÛÙJZ[ÌŠ
JNØœ™XZÎØØ\ÙHŽœ‹›ÝP]›Ë•›ÝK™XÛÙJZ[ÌŠ
JNØœ™XZÎØØ\ÙHÎœ‹Ý[›Ý[™ÔÝÙ\]š[

NØœ™XZÎØØ\ÙHœ‹˜[Y]Ü”ÝÙ\]š[

NØœ™XZÎØØ\ÙHNœ‹[Y\Ý[\\XË•[Y\Ý[\™XÛÙJZ[ÌŠ
JNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]^Š
NÜ™]\›ŠÛËš\ÔÙ]
JK›ÝPJI‰Š‹›ÝPO]›Ë•›ÝK™œ›ÛR”ÓÓŠK›ÝPJJK
ÛËš\ÔÙ]
JK›ÝPŠI‰Š‹›ÝP]›Ë•›ÝK™œ›ÛR”ÓÓŠK›ÝPŠJK
ÛËš\ÔÙ]
JKÝ[›Ý[™ÔÝÙ\ŠI‰Š‹Ý[›Ý[™ÔÝÙ\PšYÒ[
KÝ[›Ý[™ÔÝÙ\‹ÔÝš[™Ê
JJK
ÛËš\ÔÙ]
JK˜[Y]Ü”ÝÙ\ŠI‰Š‹˜[Y]Ü”ÝÙ\PšYÒ[
K˜[Y]Ü”ÝÙ\‹ÔÝš[™Ê
JJK
ÛËš\ÔÙ]
JK[Y\Ý[\
I‰Š‹[Y\Ý[\JÛË™œ›ÛRœÛÛ•[Y\Ý[\
JK[Y\Ý[\
JKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK›ÝPHOO]›ÚY	‰Š‹›ÝPOYK›ÝPOÝ›Ë•›ÝKÒ”ÓÓŠK›ÝPJN›ÚY
KK›ÝPˆOO]›ÚY	‰Š‹›ÝPYK›ÝPÝ›Ë•›ÝKÒ”ÓÓŠK›ÝPŠN›ÚY
KKÝ[›Ý[™ÔÝÙ\ˆOO]›ÚY	‰Š‹Ý[›Ý[™ÔÝÙ\JKÝ[›Ý[™ÔÝÙ\ŸšYÒ[

JKÔÝš[™Ê
JKK˜[Y]Ü”ÝÙ\ˆOO]›ÚY	‰Š‹˜[Y]Ü”ÝÙ\JK˜[Y]Ü”ÝÙ\ŸšYÒ[

JKÔÝš[™Ê
JKK[Y\Ý[\OO]›ÚY	‰Š‹[Y\Ý[\JÛË™œ›ÛU[Y\Ý[\
JK[Y\Ý[\
KÒTÓÔÝš[™Ê
JKŸKœ›ÛT\X[
J^Û]^Š
NÜ™]\›ˆK›ÝPHOO]›ÚY	‰™K›ÝPHOO[[	‰Š‹›ÝPO]›Ë•›ÝK™œ›ÛT\X[
K›ÝPJJKK›ÝPˆOO]›ÚY	‰™K›ÝPˆOO[[	‰Š‹›ÝP]›Ë•›ÝK™œ›ÛT\X[
K›ÝPŠJKKÝ[›Ý[™ÔÝÙ\ˆOO]›ÚY	‰™KÝ[›Ý[™ÔÝÙ\ˆOO[[	‰Š‹Ý[›Ý[™ÔÝÙ\PšYÒ[
KÝ[›Ý[™ÔÝÙ\‹ÔÝš[™Ê
JJKK˜[Y]Ü”ÝÙ\ˆOO]›ÚY	‰™K˜[Y]Ü”ÝÙ\ˆOO[[	‰Š‹˜[Y]Ü”ÝÙ\PšYÒ[
K˜[Y]Ü”ÝÙ\‹ÔÝš[™Ê
JJKK[Y\Ý[\OO]›ÚY	‰™K[Y\Ý[\OO[[	‰Š‹[Y\Ý[\\XË•[Y\Ý[\™œ›ÛT\X[
K[Y\Ý[\
JKŸ_NÙ[˜Ý[ÛˆŠ
^Ü™]\›žØÛÛ™›XÝ[™Ð›ØÚÎ›ÚYÛÛ[[Û’ZYÚšYÒ[

Kž^˜[[™U˜[Y]ÜœÎ–×KÝ[›Ý[™ÔÝÙ\ŽšYÒ[

K[Y\Ý[\œXË•[Y\Ý[\™œ›ÛT\X[
ßJ__[œ‹“YÚÛY[]XÚÑ]šY[˜ÙO^Ý\U\›ˆ‹Ý[™\›Z[\\Ë“YÚÛY[]XÚÑ]šY[˜ÙH‹[˜ÛÙJKU˜Kš[˜\žUÜš]\‹˜Ü™X]J
J^ÙK˜ÛÛ™›XÝ[™Ð›ØÚÈOO]›ÚY	‰›Ë“YÚ›ØÚË™[˜ÛÙJK˜ÛÛ™›XÝ[™Ð›ØÚË‹Z[ÌŠL
K™›ÜšÊ
JK›[[J
KK˜ÛÛ[[Û’ZYÚOOPšYÒ[

I‰›‹Z[ÌŠMŠKš[
K˜ÛÛ[[Û’ZYÚ
NÙ›ÜŠ]ÙˆK˜ž^˜[[™U˜[Y]ÜœÊTÙË•˜[Y]Ü‹™[˜ÛÙJ‹Z[ÌŠŠK™›ÜšÊ
JK›[[J
NÜ™]\›ˆKÝ[›Ý[™ÔÝÙ\ˆOOPšYÒ[

I‰›‹Z[ÌŠÌŠKš[
KÝ[›Ý[™ÔÝÙ\ŠKK[Y\Ý[\OO]›ÚY	‰œXË•[Y\Ý[\™[˜ÛÙJK[Y\Ý[\‹Z[ÌŠŠK™›ÜšÊ
JK›[[J
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ˜Kš[˜\žT™XY\ÙN›™]È˜Kš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹RŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹˜ÛÛ™›XÝ[™Ð›ØÚÏ]›Ë“YÚ›ØÚË™XÛÙJZ[ÌŠ
JNØœ™XZÎØØ\ÙHŽœ‹˜ÛÛ[[Û’ZYÚ]š[

NØœ™XZÎØØ\ÙHÎœ‹˜ž^˜[[™U˜[Y]ÜœËœ\Ú
ÙË•˜[Y]Ü‹™XÛÙJZ[ÌŠ
JJNØœ™XZÎØØ\ÙHœ‹Ý[›Ý[™ÔÝÙ\]š[

NØœ™XZÎØØ\ÙHNœ‹[Y\Ý[\\XË•[Y\Ý[\™XÛÙJZ[ÌŠ
JNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]RŠ
NÜ™]\›ŠÛËš\ÔÙ]
JK˜ÛÛ™›XÝ[™Ð›ØÚÊI‰Š‹˜ÛÛ™›XÝ[™Ð›ØÚÏ]›Ë“YÚ›ØÚË™œ›ÛR”ÓÓŠK˜ÛÛ™›XÝ[™Ð›ØÚÊJK
ÛËš\ÔÙ]
JK˜ÛÛ[[Û’ZYÚ
I‰Š‹˜ÛÛ[[Û’ZYÚPšYÒ[
K˜ÛÛ[[Û’ZYÚÔÝš[™Ê
JJK\œ˜^Kš\Ð\œ˜^JOË˜ž^˜[[™U˜[Y]ÜœÊI‰Š‹˜ž^˜[[™U˜[Y]ÜœÏYK˜ž^˜[[™U˜[Y]ÜœË›X\
O”ÙË•˜[Y]Ü‹™œ›ÛR”ÓÓŠ
JJK
ÛËš\ÔÙ]
JKÝ[›Ý[™ÔÝÙ\ŠI‰Š‹Ý[›Ý[™ÔÝÙ\PšYÒ[
KÝ[›Ý[™ÔÝÙ\‹ÔÝš[™Ê
JJK
ÛËš\ÔÙ]
JK[Y\Ý[\
I‰Š‹[Y\Ý[\JÛË™œ›ÛRœÛÛ•[Y\Ý[\
JK[Y\Ý[\
JKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK˜ÛÛ™›XÝ[™Ð›ØÚÈOO]›ÚY	‰Š‹˜ÛÛ™›XÝ[™Ð›ØÚÏYK˜ÛÛ™›XÝ[™Ð›ØÚÏÝ›Ë“YÚ›ØÚËÒ”ÓÓŠK˜ÛÛ™›XÝ[™Ð›ØÚÊN›ÚY
KK˜ÛÛ[[Û’ZYÚOO]›ÚY	‰Š‹˜ÛÛ[[Û’ZYÚJK˜ÛÛ[[Û’ZYÚšYÒ[

JKÔÝš[™Ê
JKK˜ž^˜[[™U˜[Y]ÜœÏÛ‹˜ž^˜[[™U˜[Y]ÜœÏYK˜ž^˜[[™U˜[Y]ÜœË›X\
OÔÙË•˜[Y]Ü‹Ò”ÓÓŠ
N›ÚY
N›‹˜ž^˜[[™U˜[Y]ÜœÏV×KKÝ[›Ý[™ÔÝÙ\ˆOO]›ÚY	‰Š‹Ý[›Ý[™ÔÝÙ\JKÝ[›Ý[™ÔÝÙ\ŸšYÒ[

JKÔÝš[™Ê
JKK[Y\Ý[\OO]›ÚY	‰Š‹[Y\Ý[\JÛË™œ›ÛU[Y\Ý[\
JK[Y\Ý[\
KÒTÓÔÝš[™Ê
JKŸKœ›ÛT\X[
J^Û]RŠ
NÜ™]\›ˆK˜ÛÛ™›XÝ[™Ð›ØÚÈOO]›ÚY	‰™K˜ÛÛ™›XÝ[™Ð›ØÚÈOO[[	‰Š‹˜ÛÛ™›XÝ[™Ð›ØÚÏ]›Ë“YÚ›ØÚË™œ›ÛT\X[
K˜ÛÛ™›XÝ[™Ð›ØÚÊJKK˜ÛÛ[[Û’ZYÚOO]›ÚY	‰™K˜ÛÛ[[Û’ZYÚOO[[	‰Š‹˜ÛÛ[[Û’ZYÚPšYÒ[
K˜ÛÛ[[Û’ZYÚÔÝš[™Ê
JJK‹˜ž^˜[[™U˜[Y]ÜœÏYK˜ž^˜[[™U˜[Y]ÜœÏË›X\
O”ÙË•˜[Y]Ü‹™œ›ÛT\X[

J_×KKÝ[›Ý[™ÔÝÙ\ˆOO]›ÚY	‰™KÝ[›Ý[™ÔÝÙ\ˆOO[[	‰Š‹Ý[›Ý[™ÔÝÙ\PšYÒ[
KÝ[›Ý[™ÔÝÙ\‹ÔÝš[™Ê
JJKK[Y\Ý[\OO]›ÚY	‰™K[Y\Ý[\OO[[	‰Š‹[Y\Ý[\\XË•[Y\Ý[\™œ›ÛT\X[
K[Y\Ý[\
JKŸ_NÙ[˜Ý[Ûˆ]Š
^Ü™]\›žÙ]šY[˜ÙN–×__[œ‹‘]šY[˜ÙS\Ý^Ý\U\›ˆ‹Ý[™\›Z[\\Ë‘]šY[˜ÙS\Ý‹[˜ÛÙJKU˜Kš[˜\žUÜš]\‹˜Ü™X]J
J^Ù›ÜŠ]ÙˆK™]šY[˜ÙJ[œ‹‘]šY[˜ÙK™[˜ÛÙJ‹Z[ÌŠL
K™›ÜšÊ
JK›[[J
NÜ™]\›ˆŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ˜Kš[˜\žT™XY\ÙN›™]È˜Kš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹\]Š
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÛÏŒÏOOLOÜ‹™]šY[˜ÙKœ\Ú
œ‹‘]šY[˜ÙK™XÛÙJZ[ÌŠ
JJNœÚÚ\\JÉÊ_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]\]Š
NÜ™]\›ˆ\œ˜^Kš\Ð\œ˜^JOË™]šY[˜ÙJI‰Š‹™]šY[˜ÙOYK™]šY[˜ÙK›X\
O›œ‹‘]šY[˜ÙK™œ›ÛR”ÓÓŠ
JJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK™]šY[˜ÙOÛ‹™]šY[˜ÙOYK™]šY[˜ÙK›X\
OÛœ‹‘]šY[˜ÙKÒ”ÓÓŠ
N›ÚY
N›‹™]šY[˜ÙOV×KŸKœ›ÛT\X[
J^Û]\]Š
NÜ™]\›ˆ‹™]šY[˜ÙOYK™]šY[˜ÙOË›X\
O›œ‹‘]šY[˜ÙK™œ›ÛT\X[

J_×KŸ__JNÝ˜\ˆRJOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\J‹—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÛ‹›ØÚÏ[‹œ›ÝØY”XÚØYÙO]›ÚYÝ˜\ˆÚOZJ
K™\WÊ
KTÙJ
KšQYJ
NÛ‹œ›ÝØY”XÚØYÙOH[™\›Z[\\ÈŽÙ[˜Ý[Ûˆ]Š
^Ü™]\›žÚXY\Ž•ÚK’XY\‹™œ›ÛT\X[
ßJK]N•ÚK‘]K™œ›ÛT\X[
ßJK]šY[˜ÙN™™‹‘]šY[˜ÙS\Ý™œ›ÛT\X[
ßJK\ÝÛÛ[Z]›ÚY_[‹›ØÚÏ^Ý\U\›ˆ‹Ý[™\›Z[\\Ë›ØÚÈ‹[˜ÛÙJKQ‹š[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆKšXY\ˆOO]›ÚY	‰•ÚK’XY\‹™[˜ÛÙJKšXY\‹‹Z[ÌŠL
K™›ÜšÊ
JK›[[J
KK™]HOO]›ÚY	‰•ÚK‘]K™[˜ÛÙJK™]K‹Z[ÌŠN
K™›ÜšÊ
JK›[[J
KK™]šY[˜ÙHOO]›ÚY	‰™™‹‘]šY[˜ÙS\Ý™[˜ÛÙJK™]šY[˜ÙK‹Z[ÌŠŠK™›ÜšÊ
JK›[[J
KK›\ÝÛÛ[Z]OO]›ÚY	‰•ÚKÛÛ[Z]™[˜ÛÙJK›\ÝÛÛ[Z]‹Z[ÌŠÍ
K™›ÜšÊ
JK›[[J
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ‹š[˜\žT™XY\ÙN›™]È‹š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹S]Š
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹šXY\UÚK’XY\‹™XÛÙJZ[ÌŠ
JNØœ™XZÎØØ\ÙHŽœ‹™]OUÚK‘]K™XÛÙJZ[ÌŠ
JNØœ™XZÎØØ\ÙHÎœ‹™]šY[˜ÙOY™‹‘]šY[˜ÙS\Ý™XÛÙJZ[ÌŠ
JNØœ™XZÎØØ\ÙHœ‹›\ÝÛÛ[Z]UÚKÛÛ[Z]™XÛÙJZ[ÌŠ
JNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]S]Š
NÜ™]\›Ššš\ÔÙ]
JKšXY\ŠI‰Š‹šXY\UÚK’XY\‹™œ›ÛR”ÓÓŠKšXY\ŠJK
šš\ÔÙ]
JK™]JI‰Š‹™]OUÚK‘]K™œ›ÛR”ÓÓŠK™]JJK
šš\ÔÙ]
JK™]šY[˜ÙJI‰Š‹™]šY[˜ÙOY™‹‘]šY[˜ÙS\Ý™œ›ÛR”ÓÓŠK™]šY[˜ÙJJK
šš\ÔÙ]
JK›\ÝÛÛ[Z]
I‰Š‹›\ÝÛÛ[Z]UÚKÛÛ[Z]™œ›ÛR”ÓÓŠK›\ÝÛÛ[Z]
JKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆKšXY\ˆOO]›ÚY	‰Š‹šXY\YKšXY\ÕÚK’XY\‹Ò”ÓÓŠKšXY\ŠN›ÚY
KK™]HOO]›ÚY	‰Š‹™]OYK™]OÕÚK‘]KÒ”ÓÓŠK™]JN›ÚY
KK™]šY[˜ÙHOO]›ÚY	‰Š‹™]šY[˜ÙOYK™]šY[˜ÙOÙ™‹‘]šY[˜ÙS\ÝÒ”ÓÓŠK™]šY[˜ÙJN›ÚY
KK›\ÝÛÛ[Z]OO]›ÚY	‰Š‹›\ÝÛÛ[Z]YK›\ÝÛÛ[Z]ÕÚKÛÛ[Z]Ò”ÓÓŠK›\ÝÛÛ[Z]
N›ÚY
KŸKœ›ÛT\X[
J^Û]S]Š
NÜ™]\›ˆKšXY\ˆOO]›ÚY	‰™KšXY\ˆOO[[	‰Š‹šXY\UÚK’XY\‹™œ›ÛT\X[
KšXY\ŠJKK™]HOO]›ÚY	‰™K™]HOO[[	‰Š‹™]OUÚK‘]K™œ›ÛT\X[
K™]JJKK™]šY[˜ÙHOO]›ÚY	‰™K™]šY[˜ÙHOO[[	‰Š‹™]šY[˜ÙOY™‹‘]šY[˜ÙS\Ý™œ›ÛT\X[
K™]šY[˜ÙJJKK›\ÝÛÛ[Z]OO]›ÚY	‰™K›\ÝÛÛ[Z]OO[[	‰Š‹›\ÝÛÛ[Z]UÚKÛÛ[Z]™œ›ÛT\X[
K›\ÝÛÛ[Z]
JKŸ__JNÝ˜\ˆšRJ™OOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\J™K—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÕ™K”ÙX\˜Ú›ØÚÜÔ™\Ý[U™K”ÙX\˜ÚÔ™\Ý[U™K•\ÙÑ]OU™K“\ÙÑ]OU™K”Ú[][][Û”™\ÜÛœÙOU™K”™\Ý[U™K‘Ø\Ò[™›ÏU™K]šX]OU™K”Ýš[™Ñ]™[U™KPÒSY\ÜØYÙSÙÏU™K•™\ÜÛœÙOU™Kœ›ÝØY”XÚØYÙO]›ÚYÝ˜\ˆÏR

KÙPÓŠ
KÙÏRŠ
KTÙJ
K]QYJ
NÕ™Kœ›ÝØY”XÚØYÙOH˜ÛÜÛ[ÜË˜˜\ÙK˜X˜ÚKŒX™]LHŽÙ[˜Ý[ÛˆÝŠ
^Ü™]\›žÚZYÚšYÒ[

K\Úˆˆ‹ÛÙ\ÜXÙNˆˆ‹ÛÙNŒ]Nˆˆ‹˜]ÓÙÎˆˆ‹ÙÜÎ–×K[™›Îˆˆ‹Ø\ÕØ[YšYÒ[

KØ\Õ\ÙYšYÒ[

K›ÚY[Y\Ý[\ˆˆ‹]™[Î–×__U™K•™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ[ÜË˜˜\ÙK˜X˜ÚKŒX™]LK•™\ÜÛœÙH‹[˜ÛÙJKSš[˜\žUÜš]\‹˜Ü™X]J
J^ÙKšZYÚOOPšYÒ[

I‰›‹Z[ÌŠ
Kš[
KšZYÚ
KK\ÚOOHˆ‰‰›‹Z[ÌŠN
KœÝš[™ÊK\Ú
KK˜ÛÙ\ÜXÙHOOHˆ‰‰›‹Z[ÌŠŠKœÝš[™ÊK˜ÛÙ\ÜXÙJKK˜ÛÙHOOL	‰›‹Z[ÌŠÌŠKZ[ÌŠK˜ÛÙJKK™]HOOHˆ‰‰›‹Z[ÌŠŠKœÝš[™ÊK™]JKKœ˜]ÓÙÈOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊKœ˜]ÓÙÊNÙ›ÜŠ]ÙˆK›ÙÜÊU™KPÒSY\ÜØYÙSÙË™[˜ÛÙJ‹Z[ÌŠN
K™›ÜšÊ
JK›[[J
NÙKš[™›ÈOOHˆ‰‰›‹Z[ÌŠŠKœÝš[™ÊKš[™›ÊKK™Ø\ÕØ[YOOPšYÒ[

I‰›‹Z[ÌŠÌŠKš[
K™Ø\ÕØ[Y
KK™Ø\Õ\ÙYOOPšYÒ[

I‰›‹Z[ÌŠ
Kš[
K™Ø\Õ\ÙY
KKOO]›ÚY	‰‘Ë[žK™[˜ÛÙJK‹Z[ÌŠL
K™›ÜšÊ
JK›[[J
KK[Y\Ý[\OOHˆ‰‰›‹Z[ÌŠN
KœÝš[™ÊK[Y\Ý[\
NÙ›ÜŠ]ÙˆK™]™[ÊXÙ‘]™[™[˜ÛÙJ‹Z[ÌŠLŠK™›ÜšÊ
JK›[[J
NÜ™]\›ˆŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆš[˜\žT™XY\ÙN›™]Èš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹WÝŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹šZYÚ]š[

NØœ™XZÎØØ\ÙHŽœ‹\Ú]œÝš[™Ê
NØœ™XZÎØØ\ÙHÎœ‹˜ÛÙ\ÜXÙO]œÝš[™Ê
NØœ™XZÎØØ\ÙHœ‹˜ÛÙO]Z[ÌŠ
NØœ™XZÎØØ\ÙHNœ‹™]O]œÝš[™Ê
NØœ™XZÎØØ\ÙHŽœ‹œ˜]ÓÙÏ]œÝš[™Ê
NØœ™XZÎØØ\ÙHÎœ‹›ÙÜËœ\Ú
™KPÒSY\ÜØYÙSÙË™XÛÙJZ[ÌŠ
JJNØœ™XZÎØØ\ÙHœ‹š[™›Ï]œÝš[™Ê
NØœ™XZÎØØ\ÙHNœ‹™Ø\ÕØ[Y]š[

NØœ™XZÎØØ\ÙHLœ‹™Ø\Õ\ÙY]š[

NØœ™XZÎØØ\ÙHLNœ‹QË[žK™XÛÙJZ[ÌŠ
JNØœ™XZÎØØ\ÙHLŽœ‹[Y\Ý[\]œÝš[™Ê
NØœ™XZÎØØ\ÙHLÎœ‹™]™[Ëœ\Ú
Ù‘]™[™XÛÙJZ[ÌŠ
JJNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]WÝŠ
NÜ™]\›Š]š\ÔÙ]
JKšZYÚ
I‰Š‹šZYÚPšYÒ[
KšZYÚÔÝš[™Ê
JJK
]š\ÔÙ]
JK\Ú
I‰Š‹\ÚTÝš[™ÊK\Ú
JK
]š\ÔÙ]
JK˜ÛÙ\ÜXÙJI‰Š‹˜ÛÙ\ÜXÙOTÝš[™ÊK˜ÛÙ\ÜXÙJJK
]š\ÔÙ]
JK˜ÛÙJI‰Š‹˜ÛÙOS[X™\ŠK˜ÛÙJJK
]š\ÔÙ]
JK™]JI‰Š‹™]OTÝš[™ÊK™]JJK
]š\ÔÙ]
JKœ˜]ÓÙÊI‰Š‹œ˜]ÓÙÏTÝš[™ÊKœ˜]ÓÙÊJK\œ˜^Kš\Ð\œ˜^JOË›ÙÜÊI‰Š‹›ÙÜÏYK›ÙÜË›X\
O•™KPÒSY\ÜØYÙSÙË™œ›ÛR”ÓÓŠ
JJK
]š\ÔÙ]
JKš[™›ÊI‰Š‹š[™›ÏTÝš[™ÊKš[™›ÊJK
]š\ÔÙ]
JK™Ø\ÕØ[Y
I‰Š‹™Ø\ÕØ[YPšYÒ[
K™Ø\ÕØ[YÔÝš[™Ê
JJK
]š\ÔÙ]
JK™Ø\Õ\ÙY
I‰Š‹™Ø\Õ\ÙYPšYÒ[
K™Ø\Õ\ÙYÔÝš[™Ê
JJK
]š\ÔÙ]
JK
I‰Š‹QË[žK™œ›ÛR”ÓÓŠK
JK
]š\ÔÙ]
JK[Y\Ý[\
I‰Š‹[Y\Ý[\TÝš[™ÊK[Y\Ý[\
JK\œ˜^Kš\Ð\œ˜^JOË™]™[ÊI‰Š‹™]™[ÏYK™]™[Ë›X\
O˜Ù‘]™[™œ›ÛR”ÓÓŠ
JJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆKšZYÚOO]›ÚY	‰Š‹šZYÚJKšZYÚšYÒ[

JKÔÝš[™Ê
JKK\ÚOO]›ÚY	‰Š‹\ÚYK\Ú
KK˜ÛÙ\ÜXÙHOO]›ÚY	‰Š‹˜ÛÙ\ÜXÙOYK˜ÛÙ\ÜXÙJKK˜ÛÙHOO]›ÚY	‰Š‹˜ÛÙOSX]œ›Ý[™
K˜ÛÙJJKK™]HOO]›ÚY	‰Š‹™]OYK™]JKKœ˜]ÓÙÈOO]›ÚY	‰Š‹œ˜]ÓÙÏYKœ˜]ÓÙÊKK›ÙÜÏÛ‹›ÙÜÏYK›ÙÜË›X\
OÕ™KPÒSY\ÜØYÙSÙËÒ”ÓÓŠ
N›ÚY
N›‹›ÙÜÏV×KKš[™›ÈOO]›ÚY	‰Š‹š[™›ÏYKš[™›ÊKK™Ø\ÕØ[YOO]›ÚY	‰Š‹™Ø\ÕØ[YJK™Ø\ÕØ[YšYÒ[

JKÔÝš[™Ê
JKK™Ø\Õ\ÙYOO]›ÚY	‰Š‹™Ø\Õ\ÙYJK™Ø\Õ\ÙYšYÒ[

JKÔÝš[™Ê
JKKOO]›ÚY	‰Š‹YKÑË[žKÒ”ÓÓŠK
N›ÚY
KK[Y\Ý[\OO]›ÚY	‰Š‹[Y\Ý[\YK[Y\Ý[\
KK™]™[ÏÛ‹™]™[ÏYK™]™[Ë›X\
OØÙ‘]™[Ò”ÓÓŠ
N›ÚY
N›‹™]™[ÏV×KŸKœ›ÛT\X[
J^Û]WÝŠ
NÜ™]\›ˆKšZYÚOO]›ÚY	‰™KšZYÚOO[[	‰Š‹šZYÚPšYÒ[
KšZYÚÔÝš[™Ê
JJK‹\ÚYK\ÚÏÈˆ‹‹˜ÛÙ\ÜXÙOYK˜ÛÙ\ÜXÙOÏÈˆ‹‹˜ÛÙOYK˜ÛÙOÏÌ‹™]OYK™]OÏÈˆ‹‹œ˜]ÓÙÏYKœ˜]ÓÙÏÏÈˆ‹‹›ÙÜÏYK›ÙÜÏË›X\
O•™KPÒSY\ÜØYÙSÙË™œ›ÛT\X[

J_×K‹š[™›ÏYKš[™›ÏÏÈˆ‹K™Ø\ÕØ[YOO]›ÚY	‰™K™Ø\ÕØ[YOO[[	‰Š‹™Ø\ÕØ[YPšYÒ[
K™Ø\ÕØ[YÔÝš[™Ê
JJKK™Ø\Õ\ÙYOO]›ÚY	‰™K™Ø\Õ\ÙYOO[[	‰Š‹™Ø\Õ\ÙYPšYÒ[
K™Ø\Õ\ÙYÔÝš[™Ê
JJKKOO]›ÚY	‰™KOO[[	‰Š‹QË[žK™œ›ÛT\X[
K
JK‹[Y\Ý[\YK[Y\Ý[\ÏÈˆ‹‹™]™[ÏYK™]™[ÏË›X\
O˜Ù‘]™[™œ›ÛT\X[

J_×KŸ_NÙ[˜Ý[ÛˆÝŠ
^Ü™]\›žÛ\ÙÒ[™^ŒÙÎˆˆ‹]™[Î–×__U™KPÒSY\ÜØYÙSÙÏ^Ý\U\›ˆ‹ØÛÜÛ[ÜË˜˜\ÙK˜X˜ÚKŒX™]LKPÒSY\ÜØYÙSÙÈ‹[˜ÛÙJKSš[˜\žUÜš]\‹˜Ü™X]J
J^ÙK›\ÙÒ[™^OOL	‰›‹Z[ÌŠ
KZ[ÌŠK›\ÙÒ[™^
KK›ÙÈOOHˆ‰‰›‹Z[ÌŠN
KœÝš[™ÊK›ÙÊNÙ›ÜŠ]ÙˆK™]™[ÊU™K”Ýš[™Ñ]™[™[˜ÛÙJ‹Z[ÌŠŠK™›ÜšÊ
JK›[[J
NÜ™]\›ˆŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆš[˜\žT™XY\ÙN›™]Èš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹QÝŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹›\ÙÒ[™^]Z[ÌŠ
NØœ™XZÎØØ\ÙHŽœ‹›ÙÏ]œÝš[™Ê
NØœ™XZÎØØ\ÙHÎœ‹™]™[Ëœ\Ú
™K”Ýš[™Ñ]™[™XÛÙJZ[ÌŠ
JJNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]QÝŠ
NÜ™]\›Š]š\ÔÙ]
JK›\ÙÒ[™^
I‰Š‹›\ÙÒ[™^S[X™\ŠK›\ÙÒ[™^
JK
]š\ÔÙ]
JK›ÙÊI‰Š‹›ÙÏTÝš[™ÊK›ÙÊJK\œ˜^Kš\Ð\œ˜^JOË™]™[ÊI‰Š‹™]™[ÏYK™]™[Ë›X\
O•™K”Ýš[™Ñ]™[™œ›ÛR”ÓÓŠ
JJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK›\ÙÒ[™^OO]›ÚY	‰Š‹›\ÙÒ[™^SX]œ›Ý[™
K›\ÙÒ[™^
JKK›ÙÈOO]›ÚY	‰Š‹›ÙÏYK›ÙÊKK™]™[ÏÛ‹™]™[ÏYK™]™[Ë›X\
OÕ™K”Ýš[™Ñ]™[Ò”ÓÓŠ
N›ÚY
N›‹™]™[ÏV×KŸKœ›ÛT\X[
J^Û]QÝŠ
NÜ™]\›ˆ‹›\ÙÒ[™^YK›\ÙÒ[™^ÏÌ‹›ÙÏYK›ÙÏÏÈˆ‹‹™]™[ÏYK™]™[ÏË›X\
O•™K”Ýš[™Ñ]™[™œ›ÛT\X[

J_×KŸ_NÙ[˜Ý[ÛˆŠ
^Ü™]\›žÝ\Nˆˆ‹]šX]\Î–×__U™K”Ýš[™Ñ]™[^Ý\U\›ˆ‹ØÛÜÛ[ÜË˜˜\ÙK˜X˜ÚKŒX™]LK”Ýš[™Ñ]™[‹[˜ÛÙJKSš[˜\žUÜš]\‹˜Ü™X]J
J^ÙK\HOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊK\JNÙ›ÜŠ]ÙˆK˜]šX]\ÊU™K]šX]K™[˜ÛÙJ‹Z[ÌŠN
K™›ÜšÊ
JK›[[J
NÜ™]\›ˆŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆš[˜\žT™XY\ÙN›™]Èš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹UŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹\O]œÝš[™Ê
NØœ™XZÎØØ\ÙHŽœ‹˜]šX]\Ëœ\Ú
™K]šX]K™XÛÙJZ[ÌŠ
JJNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]UŠ
NÜ™]\›Š]š\ÔÙ]
JK\JI‰Š‹\OTÝš[™ÊK\JJK\œ˜^Kš\Ð\œ˜^JOË˜]šX]\ÊI‰Š‹˜]šX]\ÏYK˜]šX]\Ë›X\
O•™K]šX]K™œ›ÛR”ÓÓŠ
JJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK\HOO]›ÚY	‰Š‹\OYK\JKK˜]šX]\ÏÛ‹˜]šX]\ÏYK˜]šX]\Ë›X\
OÕ™K]šX]KÒ”ÓÓŠ
N›ÚY
N›‹˜]šX]\ÏV×KŸKœ›ÛT\X[
J^Û]UŠ
NÜ™]\›ˆ‹\OYK\OÏÈˆ‹‹˜]šX]\ÏYK˜]šX]\ÏË›X\
O•™K]šX]K™œ›ÛT\X[

J_×KŸ_NÙ[˜Ý[ÛˆÝŠ
^Ü™]\›žÚÙ^Nˆˆ‹˜[YNˆˆŸ_U™K]šX]O^Ý\U\›ˆ‹ØÛÜÛ[ÜË˜˜\ÙK˜X˜ÚKŒX™]LK]šX]H‹[˜ÛÙJKSš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆKšÙ^HOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊKšÙ^JKK˜[YHOOHˆ‰‰›‹Z[ÌŠN
KœÝš[™ÊK˜[YJKŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆš[˜\žT™XY\ÙN›™]Èš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹UÝŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹šÙ^O]œÝš[™Ê
NØœ™XZÎØØ\ÙHŽœ‹˜[YO]œÝš[™Ê
NØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]UÝŠ
NÜ™]\›Š]š\ÔÙ]
JKšÙ^JI‰Š‹šÙ^OTÝš[™ÊKšÙ^JJK
]š\ÔÙ]
JK˜[YJI‰Š‹˜[YOTÝš[™ÊK˜[YJJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆKšÙ^HOO]›ÚY	‰Š‹šÙ^OYKšÙ^JKK˜[YHOO]›ÚY	‰Š‹˜[YOYK˜[YJKŸKœ›ÛT\X[
J^Û]UÝŠ
NÜ™]\›ˆ‹šÙ^OYKšÙ^OÏÈˆ‹‹˜[YOYK˜[YOÏÈˆ‹Ÿ_NÙ[˜Ý[ÛˆÝŠ
^Ü™]\›žÙØ\ÕØ[YšYÒ[

KØ\Õ\ÙYšYÒ[

__U™K‘Ø\Ò[™›Ï^Ý\U\›ˆ‹ØÛÜÛ[ÜË˜˜\ÙK˜X˜ÚKŒX™]LK‘Ø\Ò[™›È‹[˜ÛÙJKSš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK™Ø\ÕØ[YOOPšYÒ[

I‰›‹Z[ÌŠ
KZ[
K™Ø\ÕØ[Y
KK™Ø\Õ\ÙYOOPšYÒ[

I‰›‹Z[ÌŠMŠKZ[
K™Ø\Õ\ÙY
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆš[˜\žT™XY\ÙN›™]Èš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹RÝŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹™Ø\ÕØ[Y]Z[

NØœ™XZÎØØ\ÙHŽœ‹™Ø\Õ\ÙY]Z[

NØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]RÝŠ
NÜ™]\›Š]š\ÔÙ]
JK™Ø\ÕØ[Y
I‰Š‹™Ø\ÕØ[YPšYÒ[
K™Ø\ÕØ[YÔÝš[™Ê
JJK
]š\ÔÙ]
JK™Ø\Õ\ÙY
I‰Š‹™Ø\Õ\ÙYPšYÒ[
K™Ø\Õ\ÙYÔÝš[™Ê
JJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK™Ø\ÕØ[YOO]›ÚY	‰Š‹™Ø\ÕØ[YJK™Ø\ÕØ[YšYÒ[

JKÔÝš[™Ê
JKK™Ø\Õ\ÙYOO]›ÚY	‰Š‹™Ø\Õ\ÙYJK™Ø\Õ\ÙYšYÒ[

JKÔÝš[™Ê
JKŸKœ›ÛT\X[
J^Û]RÝŠ
NÜ™]\›ˆK™Ø\ÕØ[YOO]›ÚY	‰™K™Ø\ÕØ[YOO[[	‰Š‹™Ø\ÕØ[YPšYÒ[
K™Ø\ÕØ[YÔÝš[™Ê
JJKK™Ø\Õ\ÙYOO]›ÚY	‰™K™Ø\Õ\ÙYOO[[	‰Š‹™Ø\Õ\ÙYPšYÒ[
K™Ø\Õ\ÙYÔÝš[™Ê
JJKŸ_NÙ[˜Ý[ÛˆŠ
^Ü™]\›žÙ]N›™]ÈZ[\œ˜^KÙÎˆˆ‹]™[Î–×K\ÙÔ™\ÜÛœÙ\Î–×__U™K”™\Ý[^Ý\U\›ˆ‹ØÛÜÛ[ÜË˜˜\ÙK˜X˜ÚKŒX™]LK”™\Ý[‹[˜ÛÙJKSš[˜\žUÜš]\‹˜Ü™X]J
J^ÙK™]K›[™ÝOOL	‰›‹Z[ÌŠL
K˜ž]\ÊK™]JKK›ÙÈOOHˆ‰‰›‹Z[ÌŠN
KœÝš[™ÊK›ÙÊNÙ›ÜŠ]ÙˆK™]™[ÊXÙ‘]™[™[˜ÛÙJ‹Z[ÌŠŠK™›ÜšÊ
JK›[[J
NÙ›ÜŠ]ÙˆK›\ÙÔ™\ÜÛœÙ\ÊQË[žK™[˜ÛÙJ‹Z[ÌŠÍ
K™›ÜšÊ
JK›[[J
NÜ™]\›ˆŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆš[˜\žT™XY\ÙN›™]Èš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹SŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹™]O]˜ž]\Ê
NØœ™XZÎØØ\ÙHŽœ‹›ÙÏ]œÝš[™Ê
NØœ™XZÎØØ\ÙHÎœ‹™]™[Ëœ\Ú
Ù‘]™[™XÛÙJZ[ÌŠ
JJNØœ™XZÎØØ\ÙHœ‹›\ÙÔ™\ÜÛœÙ\Ëœ\Ú
Ë[žK™XÛÙJZ[ÌŠ
JJNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]SŠ
NÜ™]\›Š]š\ÔÙ]
JK™]JI‰Š‹™]OJ]˜ž]\Ñœ›ÛP˜\ÙM
JK™]JJK
]š\ÔÙ]
JK›ÙÊI‰Š‹›ÙÏTÝš[™ÊK›ÙÊJK\œ˜^Kš\Ð\œ˜^JOË™]™[ÊI‰Š‹™]™[ÏYK™]™[Ë›X\
O˜Ù‘]™[™œ›ÛR”ÓÓŠ
JJK\œ˜^Kš\Ð\œ˜^JOË›\ÙÔ™\ÜÛœÙ\ÊI‰Š‹›\ÙÔ™\ÜÛœÙ\ÏYK›\ÙÔ™\ÜÛœÙ\Ë›X\
O‘Ë[žK™œ›ÛR”ÓÓŠ
JJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK™]HOO]›ÚY	‰Š‹™]OJ]˜˜\ÙMœ›ÛPž]\ÊJK™]HOO]›ÚYÙK™]N›™]ÈZ[\œ˜^JJKK›ÙÈOO]›ÚY	‰Š‹›ÙÏYK›ÙÊKK™]™[ÏÛ‹™]™[ÏYK™]™[Ë›X\
OØÙ‘]™[Ò”ÓÓŠ
N›ÚY
N›‹™]™[ÏV×KK›\ÙÔ™\ÜÛœÙ\ÏÛ‹›\ÙÔ™\ÜÛœÙ\ÏYK›\ÙÔ™\ÜÛœÙ\Ë›X\
OÑË[žKÒ”ÓÓŠ
N›ÚY
N›‹›\ÙÔ™\ÜÛœÙ\ÏV×KŸKœ›ÛT\X[
J^Û]SŠ
NÜ™]\›ˆ‹™]OYK™]OÏÛ™]ÈZ[\œ˜^K‹›ÙÏYK›ÙÏÏÈˆ‹‹™]™[ÏYK™]™[ÏË›X\
O˜Ù‘]™[™œ›ÛT\X[

J_×K‹›\ÙÔ™\ÜÛœÙ\ÏYK›\ÙÔ™\ÜÛœÙ\ÏË›X\
O‘Ë[žK™œ›ÛT\X[

J_×KŸ_NÙ[˜Ý[Ûˆ]Š
^Ü™]\›žÙØ\Ò[™›Î•™K‘Ø\Ò[™›Ë™œ›ÛT\X[
ßJK™\Ý[›ÚY_U™K”Ú[][][Û”™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ[ÜË˜˜\ÙK˜X˜ÚKŒX™]LK”Ú[][][Û”™\ÜÛœÙH‹[˜ÛÙJKSš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK™Ø\Ò[™›ÈOO]›ÚY	‰•™K‘Ø\Ò[™›Ë™[˜ÛÙJK™Ø\Ò[™›Ë‹Z[ÌŠL
K™›ÜšÊ
JK›[[J
KKœ™\Ý[OO]›ÚY	‰•™K”™\Ý[™[˜ÛÙJKœ™\Ý[‹Z[ÌŠN
K™›ÜšÊ
JK›[[J
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆš[˜\žT™XY\ÙN›™]Èš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹V]Š
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹™Ø\Ò[™›ÏU™K‘Ø\Ò[™›Ë™XÛÙJZ[ÌŠ
JNØœ™XZÎØØ\ÙHŽœ‹œ™\Ý[U™K”™\Ý[™XÛÙJZ[ÌŠ
JNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]V]Š
NÜ™]\›Š]š\ÔÙ]
JK™Ø\Ò[™›ÊI‰Š‹™Ø\Ò[™›ÏU™K‘Ø\Ò[™›Ë™œ›ÛR”ÓÓŠK™Ø\Ò[™›ÊJK
]š\ÔÙ]
JKœ™\Ý[
I‰Š‹œ™\Ý[U™K”™\Ý[™œ›ÛR”ÓÓŠKœ™\Ý[
JKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK™Ø\Ò[™›ÈOO]›ÚY	‰Š‹™Ø\Ò[™›ÏYK™Ø\Ò[™›ÏÕ™K‘Ø\Ò[™›ËÒ”ÓÓŠK™Ø\Ò[™›ÊN›ÚY
KKœ™\Ý[OO]›ÚY	‰Š‹œ™\Ý[YKœ™\Ý[Õ™K”™\Ý[Ò”ÓÓŠKœ™\Ý[
N›ÚY
KŸKœ›ÛT\X[
J^Û]V]Š
NÜ™]\›ˆK™Ø\Ò[™›ÈOO]›ÚY	‰™K™Ø\Ò[™›ÈOO[[	‰Š‹™Ø\Ò[™›ÏU™K‘Ø\Ò[™›Ë™œ›ÛT\X[
K™Ø\Ò[™›ÊJKKœ™\Ý[OO]›ÚY	‰™Kœ™\Ý[OO[[	‰Š‹œ™\Ý[U™K”™\Ý[™œ›ÛT\X[
Kœ™\Ý[
JKŸ_NÙ[˜Ý[ÛˆŠ
^Ü™]\›žÛ\ÙÕ\Nˆˆ‹]N›™]ÈZ[\œ˜^__U™K“\ÙÑ]O^Ý\U\›ˆ‹ØÛÜÛ[ÜË˜˜\ÙK˜X˜ÚKŒX™]LK“\ÙÑ]H‹[˜ÛÙJKSš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK›\ÙÕ\HOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊK›\ÙÕ\JKK™]K›[™ÝOOL	‰›‹Z[ÌŠN
K˜ž]\ÊK™]JKŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆš[˜\žT™XY\ÙN›™]Èš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹^Š
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹›\ÙÕ\O]œÝš[™Ê
NØœ™XZÎØØ\ÙHŽœ‹™]O]˜ž]\Ê
NØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]^Š
NÜ™]\›Š]š\ÔÙ]
JK›\ÙÕ\JI‰Š‹›\ÙÕ\OTÝš[™ÊK›\ÙÕ\JJK
]š\ÔÙ]
JK™]JI‰Š‹™]OJ]˜ž]\Ñœ›ÛP˜\ÙM
JK™]JJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK›\ÙÕ\HOO]›ÚY	‰Š‹›\ÙÕ\OYK›\ÙÕ\JKK™]HOO]›ÚY	‰Š‹™]OJ]˜˜\ÙMœ›ÛPž]\ÊJK™]HOO]›ÚYÙK™]N›™]ÈZ[\œ˜^JJKŸKœ›ÛT\X[
J^Û]^Š
NÜ™]\›ˆ‹›\ÙÕ\OYK›\ÙÕ\OÏÈˆ‹‹™]OYK™]OÏÛ™]ÈZ[\œ˜^KŸ_NÙ[˜Ý[ÛˆŠ
^Ü™]\›žÙ]N–×K\ÙÔ™\ÜÛœÙ\Î–×__U™K•\ÙÑ]O^Ý\U\›ˆ‹ØÛÜÛ[ÜË˜˜\ÙK˜X˜ÚKŒX™]LK•\ÙÑ]H‹[˜ÛÙJKSš[˜\žUÜš]\‹˜Ü™X]J
J^Ù›ÜŠ]ÙˆK™]JU™K“\ÙÑ]K™[˜ÛÙJ‹Z[ÌŠL
K™›ÜšÊ
JK›[[J
NÙ›ÜŠ]ÙˆK›\ÙÔ™\ÜÛœÙ\ÊQË[žK™[˜ÛÙJ‹Z[ÌŠN
K™›ÜšÊ
JK›[[J
NÜ™]\›ˆŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆš[˜\žT™XY\ÙN›™]Èš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹VŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹™]Kœ\Ú
™K“\ÙÑ]K™XÛÙJZ[ÌŠ
JJNØœ™XZÎØØ\ÙHŽœ‹›\ÙÔ™\ÜÛœÙ\Ëœ\Ú
Ë[žK™XÛÙJZ[ÌŠ
JJNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]VŠ
NÜ™]\›ˆ\œ˜^Kš\Ð\œ˜^JOË™]JI‰Š‹™]OYK™]K›X\
O•™K“\ÙÑ]K™œ›ÛR”ÓÓŠ
JJK\œ˜^Kš\Ð\œ˜^JOË›\ÙÔ™\ÜÛœÙ\ÊI‰Š‹›\ÙÔ™\ÜÛœÙ\ÏYK›\ÙÔ™\ÜÛœÙ\Ë›X\
O‘Ë[žK™œ›ÛR”ÓÓŠ
JJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK™]OÛ‹™]OYK™]K›X\
OÕ™K“\ÙÑ]KÒ”ÓÓŠ
N›ÚY
N›‹™]OV×KK›\ÙÔ™\ÜÛœÙ\ÏÛ‹›\ÙÔ™\ÜÛœÙ\ÏYK›\ÙÔ™\ÜÛœÙ\Ë›X\
OÑË[žKÒ”ÓÓŠ
N›ÚY
N›‹›\ÙÔ™\ÜÛœÙ\ÏV×KŸKœ›ÛT\X[
J^Û]VŠ
NÜ™]\›ˆ‹™]OYK™]OË›X\
O•™K“\ÙÑ]K™œ›ÛT\X[

J_×K‹›\ÙÔ™\ÜÛœÙ\ÏYK›\ÙÔ™\ÜÛœÙ\ÏË›X\
O‘Ë[žK™œ›ÛT\X[

J_×KŸ_NÙ[˜Ý[ÛˆŠ
^Ü™]\›žÝÝ[ÛÝ[šYÒ[

KÛÝ[šYÒ[

KYÙS[X™\ŽšYÒ[

KYÙUÝ[šYÒ[

K[Z]šYÒ[

KÎ–×__U™K”ÙX\˜ÚÔ™\Ý[^Ý\U\›ˆ‹ØÛÜÛ[ÜË˜˜\ÙK˜X˜ÚKŒX™]LK”ÙX\˜ÚÔ™\Ý[‹[˜ÛÙJKSš[˜\žUÜš]\‹˜Ü™X]J
J^ÙKÝ[ÛÝ[OOPšYÒ[

I‰›‹Z[ÌŠ
KZ[
KÝ[ÛÝ[
KK˜ÛÝ[OOPšYÒ[

I‰›‹Z[ÌŠMŠKZ[
K˜ÛÝ[
KKœYÙS[X™\ˆOOPšYÒ[

I‰›‹Z[ÌŠ
KZ[
KœYÙS[X™\ŠKKœYÙUÝ[OOPšYÒ[

I‰›‹Z[ÌŠÌŠKZ[
KœYÙUÝ[
KK›[Z]OOPšYÒ[

I‰›‹Z[ÌŠ
KZ[
K›[Z]
NÙ›ÜŠ]ÙˆKÊU™K•™\ÜÛœÙK™[˜ÛÙJ‹Z[ÌŠL
K™›ÜšÊ
JK›[[J
NÜ™]\›ˆŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆš[˜\žT™XY\ÙN›™]Èš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹VŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹Ý[ÛÝ[]Z[

NØœ™XZÎØØ\ÙHŽœ‹˜ÛÝ[]Z[

NØœ™XZÎØØ\ÙHÎœ‹œYÙS[X™\]Z[

NØœ™XZÎØØ\ÙHœ‹œYÙUÝ[]Z[

NØœ™XZÎØØ\ÙHNœ‹›[Z]]Z[

NØœ™XZÎØØ\ÙHŽœ‹Ëœ\Ú
™K•™\ÜÛœÙK™XÛÙJZ[ÌŠ
JJNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]VŠ
NÜ™]\›Š]š\ÔÙ]
JKÝ[ÛÝ[
I‰Š‹Ý[ÛÝ[PšYÒ[
KÝ[ÛÝ[ÔÝš[™Ê
JJK
]š\ÔÙ]
JK˜ÛÝ[
I‰Š‹˜ÛÝ[PšYÒ[
K˜ÛÝ[ÔÝš[™Ê
JJK
]š\ÔÙ]
JKœYÙS[X™\ŠI‰Š‹œYÙS[X™\PšYÒ[
KœYÙS[X™\‹ÔÝš[™Ê
JJK
]š\ÔÙ]
JKœYÙUÝ[
I‰Š‹œYÙUÝ[PšYÒ[
KœYÙUÝ[ÔÝš[™Ê
JJK
]š\ÔÙ]
JK›[Z]
I‰Š‹›[Z]PšYÒ[
K›[Z]ÔÝš[™Ê
JJK\œ˜^Kš\Ð\œ˜^JOËÊI‰Š‹ÏYKË›X\
O•™K•™\ÜÛœÙK™œ›ÛR”ÓÓŠ
JJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆKÝ[ÛÝ[OO]›ÚY	‰Š‹Ý[ÛÝ[JKÝ[ÛÝ[šYÒ[

JKÔÝš[™Ê
JKK˜ÛÝ[OO]›ÚY	‰Š‹˜ÛÝ[JK˜ÛÝ[šYÒ[

JKÔÝš[™Ê
JKKœYÙS[X™\ˆOO]›ÚY	‰Š‹œYÙS[X™\JKœYÙS[X™\ŸšYÒ[

JKÔÝš[™Ê
JKKœYÙUÝ[OO]›ÚY	‰Š‹œYÙUÝ[JKœYÙUÝ[šYÒ[

JKÔÝš[™Ê
JKK›[Z]OO]›ÚY	‰Š‹›[Z]JK›[Z]šYÒ[

JKÔÝš[™Ê
JKKÏÛ‹ÏYKË›X\
OÕ™K•™\ÜÛœÙKÒ”ÓÓŠ
N›ÚY
N›‹ÏV×KŸKœ›ÛT\X[
J^Û]VŠ
NÜ™]\›ˆKÝ[ÛÝ[OO]›ÚY	‰™KÝ[ÛÝ[OO[[	‰Š‹Ý[ÛÝ[PšYÒ[
KÝ[ÛÝ[ÔÝš[™Ê
JJKK˜ÛÝ[OO]›ÚY	‰™K˜ÛÝ[OO[[	‰Š‹˜ÛÝ[PšYÒ[
K˜ÛÝ[ÔÝš[™Ê
JJKKœYÙS[X™\ˆOO]›ÚY	‰™KœYÙS[X™\ˆOO[[	‰Š‹œYÙS[X™\PšYÒ[
KœYÙS[X™\‹ÔÝš[™Ê
JJKKœYÙUÝ[OO]›ÚY	‰™KœYÙUÝ[OO[[	‰Š‹œYÙUÝ[PšYÒ[
KœYÙUÝ[ÔÝš[™Ê
JJKK›[Z]OO]›ÚY	‰™K›[Z]OO[[	‰Š‹›[Z]PšYÒ[
K›[Z]ÔÝš[™Ê
JJK‹ÏYKÏË›X\
O•™K•™\ÜÛœÙK™œ›ÛT\X[

J_×KŸ_NÙ[˜Ý[Ûˆ	Š
^Ü™]\›žÝÝ[ÛÝ[šYÒ[

KÛÝ[šYÒ[

KYÙS[X™\ŽšYÒ[

KYÙUÝ[šYÒ[

K[Z]šYÒ[

K›ØÚÜÎ–×__U™K”ÙX\˜Ú›ØÚÜÔ™\Ý[^Ý\U\›ˆ‹ØÛÜÛ[ÜË˜˜\ÙK˜X˜ÚKŒX™]LK”ÙX\˜Ú›ØÚÜÔ™\Ý[‹[˜ÛÙJKSš[˜\žUÜš]\‹˜Ü™X]J
J^ÙKÝ[ÛÝ[OOPšYÒ[

I‰›‹Z[ÌŠ
Kš[
KÝ[ÛÝ[
KK˜ÛÝ[OOPšYÒ[

I‰›‹Z[ÌŠMŠKš[
K˜ÛÝ[
KKœYÙS[X™\ˆOOPšYÒ[

I‰›‹Z[ÌŠ
Kš[
KœYÙS[X™\ŠKKœYÙUÝ[OOPšYÒ[

I‰›‹Z[ÌŠÌŠKš[
KœYÙUÝ[
KK›[Z]OOPšYÒ[

I‰›‹Z[ÌŠ
Kš[
K›[Z]
NÙ›ÜŠ]ÙˆK˜›ØÚÜÊZÙË›ØÚË™[˜ÛÙJ‹Z[ÌŠL
K™›ÜšÊ
JK›[[J
NÜ™]\›ˆŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆš[˜\žT™XY\ÙN›™]Èš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹IŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹Ý[ÛÝ[]š[

NØœ™XZÎØØ\ÙHŽœ‹˜ÛÝ[]š[

NØœ™XZÎØØ\ÙHÎœ‹œYÙS[X™\]š[

NØœ™XZÎØØ\ÙHœ‹œYÙUÝ[]š[

NØœ™XZÎØØ\ÙHNœ‹›[Z]]š[

NØœ™XZÎØØ\ÙHŽœ‹˜›ØÚÜËœ\Ú
ÙË›ØÚË™XÛÙJZ[ÌŠ
JJNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]IŠ
NÜ™]\›Š]š\ÔÙ]
JKÝ[ÛÝ[
I‰Š‹Ý[ÛÝ[PšYÒ[
KÝ[ÛÝ[ÔÝš[™Ê
JJK
]š\ÔÙ]
JK˜ÛÝ[
I‰Š‹˜ÛÝ[PšYÒ[
K˜ÛÝ[ÔÝš[™Ê
JJK
]š\ÔÙ]
JKœYÙS[X™\ŠI‰Š‹œYÙS[X™\PšYÒ[
KœYÙS[X™\‹ÔÝš[™Ê
JJK
]š\ÔÙ]
JKœYÙUÝ[
I‰Š‹œYÙUÝ[PšYÒ[
KœYÙUÝ[ÔÝš[™Ê
JJK
]š\ÔÙ]
JK›[Z]
I‰Š‹›[Z]PšYÒ[
K›[Z]ÔÝš[™Ê
JJK\œ˜^Kš\Ð\œ˜^JOË˜›ØÚÜÊI‰Š‹˜›ØÚÜÏYK˜›ØÚÜË›X\
OšÙË›ØÚË™œ›ÛR”ÓÓŠ
JJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆKÝ[ÛÝ[OO]›ÚY	‰Š‹Ý[ÛÝ[JKÝ[ÛÝ[šYÒ[

JKÔÝš[™Ê
JKK˜ÛÝ[OO]›ÚY	‰Š‹˜ÛÝ[JK˜ÛÝ[šYÒ[

JKÔÝš[™Ê
JKKœYÙS[X™\ˆOO]›ÚY	‰Š‹œYÙS[X™\JKœYÙS[X™\ŸšYÒ[

JKÔÝš[™Ê
JKKœYÙUÝ[OO]›ÚY	‰Š‹œYÙUÝ[JKœYÙUÝ[šYÒ[

JKÔÝš[™Ê
JKK›[Z]OO]›ÚY	‰Š‹›[Z]JK›[Z]šYÒ[

JKÔÝš[™Ê
JKK˜›ØÚÜÏÛ‹˜›ØÚÜÏYK˜›ØÚÜË›X\
OÚÙË›ØÚËÒ”ÓÓŠ
N›ÚY
N›‹˜›ØÚÜÏV×KŸKœ›ÛT\X[
J^Û]IŠ
NÜ™]\›ˆKÝ[ÛÝ[OO]›ÚY	‰™KÝ[ÛÝ[OO[[	‰Š‹Ý[ÛÝ[PšYÒ[
KÝ[ÛÝ[ÔÝš[™Ê
JJKK˜ÛÝ[OO]›ÚY	‰™K˜ÛÝ[OO[[	‰Š‹˜ÛÝ[PšYÒ[
K˜ÛÝ[ÔÝš[™Ê
JJKKœYÙS[X™\ˆOO]›ÚY	‰™KœYÙS[X™\ˆOO[[	‰Š‹œYÙS[X™\PšYÒ[
KœYÙS[X™\‹ÔÝš[™Ê
JJKKœYÙUÝ[OO]›ÚY	‰™KœYÙUÝ[OO[[	‰Š‹œYÙUÝ[PšYÒ[
KœYÙUÝ[ÔÝš[™Ê
JJKK›[Z]OO]›ÚY	‰™K›[Z]OO[[	‰Š‹›[Z]PšYÒ[
K›[Z]ÔÝš[™Ê
JJK‹˜›ØÚÜÏYK˜›ØÚÜÏË›X\
OšÙË›ØÚË™œ›ÛT\X[

J_×KŸ__JNÝ˜\ˆ×ÏRJ™OOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\J™K—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÒ™K”Ù\šXÙPÛY[[\R™K•XÛÙP[Z[›Ô™\ÜÛœÙOR™K•XÛÙP[Z[›Ô™\]Y\ÝR™K•[˜ÛÙP[Z[›Ô™\ÜÛœÙOR™K•[˜ÛÙP[Z[›Ô™\]Y\ÝR™K•[˜ÛÙT™\ÜÛœÙOR™K•[˜ÛÙT™\]Y\ÝR™K•XÛÙT™\ÜÛœÙOR™K•XÛÙT™\]Y\ÝR™K‘Ù]›ØÚÕÚ]Ô™\ÜÛœÙOR™K‘Ù]›ØÚÕÚ]Ô™\]Y\ÝR™K‘Ù]™\ÜÛœÙOR™K‘Ù]™\]Y\ÝR™K”Ú[][]T™\ÜÛœÙOR™K”Ú[][]T™\]Y\ÝR™Kœ›ØYØ\Ý™\ÜÛœÙOR™Kœ›ØYØ\Ý™\]Y\ÝR™K‘Ù]Ñ]™[™\ÜÛœÙOR™K‘Ù]Ñ]™[™\]Y\ÝR™Kœ›ØYØ\Ý[ÙOR™K“Ü™\žOR™Kœ›ÝØY”XÚØYÙO]›ÚYÒ™K›Ü™\žQœ›ÛR”ÓÓQ—ÎÒ™K›Ü™\žUÒ”ÓÓSWÎÒ™K˜œ›ØYØ\Ý[ÙQœ›ÛR”ÓÓRÎÒ™K˜œ›ØYØ\Ý[ÙUÒ”ÓÓW×ÎÝ˜\ˆÝT

KÚOZšJ
K\Vš

KYÏZJ
KYÏRŠ
KÙOTÙJ
K[QYJ
NÒ™Kœ›ÝØY”XÚØYÙOH˜ÛÜÛ[ÜËŒX™]LHŽÝ˜\ˆYÊ[˜Ý[ÛŠJ^ÙVÙK“Ô‘T—Ð–WÕS”ÔPÒQ’QQLOH“Ô‘T—Ð–WÕS”ÔPÒQ’QQ‹VÙK“Ô‘T—Ð–WÐTÐÏLWOH“Ô‘T—Ð–WÐTÐÈ‹VÙK“Ô‘T—Ð–WÑTÐÏL—OH“Ô‘T—Ð–WÑTÐÈ‹VÙK•S”‘PÓÑÓ’V‘QKLWOH•S”‘PÓÑÓ’V‘QŸJJY
™K“Ü™\žO]Y^ßJJNÙ[˜Ý[Ûˆ—ÊJ^ÜÝÚ]Ú
J^ØØ\ÙH˜Ø\ÙH“Ô‘T—Ð–WÕS”ÔPÒQ’QQŽœ™]\›ˆY“Ô‘T—Ð–WÕS”ÔPÒQ’QQØØ\ÙHN˜Ø\ÙH“Ô‘T—Ð–WÐTÐÈŽœ™]\›ˆY“Ô‘T—Ð–WÐTÐÎØØ\ÙHŽ˜Ø\ÙH“Ô‘T—Ð–WÑTÐÈŽœ™]\›ˆY“Ô‘T—Ð–WÑTÐÎÙY˜][œ™]\›ˆY•S”‘PÓÑÓ’V‘Q_Y[˜Ý[ÛˆWÊJ^ÜÝÚ]Ú
J^ØØ\ÙHY“Ô‘T—Ð–WÕS”ÔPÒQ’QQœ™]\›ˆ“Ô‘T—Ð–WÕS”ÔPÒQ’QQŽØØ\ÙHY“Ô‘T—Ð–WÐTÐÎœ™]\›ˆ“Ô‘T—Ð–WÐTÐÈŽØØ\ÙHY“Ô‘T—Ð–WÑTÐÎœ™]\›ˆ“Ô‘T—Ð–WÑTÐÈŽØØ\ÙHY•S”‘PÓÑÓ’V‘Q™Y˜][œ™]\›ˆ•S”‘PÓÑÓ’V‘QŸ_]˜\ˆØNÊ[˜Ý[ÛŠJ^ÙVÙK”“ÐQÐTÕÓSÑWÕS”ÔPÒQ’QQLOH”“ÐQÐTÕÓSÑWÕS”ÔPÒQ’QQ‹VÙK”“ÐQÐTÕÓSÑWÐ“ÐÒÏLWOH”“ÐQÐTÕÓSÑWÐ“ÐÒÈ‹VÙK”“ÐQÐTÕÓSÑWÔÖSÏL—OH”“ÐQÐTÕÓSÑWÔÖSÈ‹VÙK”“ÐQÐTÕÓSÑWÐTÖSÏL×OH”“ÐQÐTÕÓSÑWÐTÖSÈ‹VÙK•S”‘PÓÑÓ’V‘QKLWOH•S”‘PÓÑÓ’V‘QŸJJØ_
™Kœ›ØYØ\Ý[ÙOUØO^ßJJNÙ[˜Ý[ÛˆÊJ^ÜÝÚ]Ú
J^ØØ\ÙH˜Ø\ÙH”“ÐQÐTÕÓSÑWÕS”ÔPÒQ’QQŽœ™]\›ˆØK”“ÐQÐTÕÓSÑWÕS”ÔPÒQ’QQØØ\ÙHN˜Ø\ÙH”“ÐQÐTÕÓSÑWÐ“ÐÒÈŽœ™]\›ˆØK”“ÐQÐTÕÓSÑWÐ“ÐÒÎØØ\ÙHŽ˜Ø\ÙH”“ÐQÐTÕÓSÑWÔÖSÈŽœ™]\›ˆØK”“ÐQÐTÕÓSÑWÔÖSÎØØ\ÙHÎ˜Ø\ÙH”“ÐQÐTÕÓSÑWÐTÖSÈŽœ™]\›ˆØK”“ÐQÐTÕÓSÑWÐTÖSÎÙY˜][œ™]\›ˆØK•S”‘PÓÑÓ’V‘Q_Y[˜Ý[Ûˆ×ÊJ^ÜÝÚ]Ú
J^ØØ\ÙHØK”“ÐQÐTÕÓSÑWÕS”ÔPÒQ’QQœ™]\›ˆ”“ÐQÐTÕÓSÑWÕS”ÔPÒQ’QQŽØØ\ÙHØK”“ÐQÐTÕÓSÑWÐ“ÐÒÎœ™]\›ˆ”“ÐQÐTÕÓSÑWÐ“ÐÒÈŽØØ\ÙHØK”“ÐQÐTÕÓSÑWÔÖSÎœ™]\›ˆ”“ÐQÐTÕÓSÑWÔÖSÈŽØØ\ÙHØK”“ÐQÐTÕÓSÑWÐTÖSÎœ™]\›ˆ”“ÐQÐTÕÓSÑWÐTÖSÈŽØØ\ÙHØK•S”‘PÓÑÓ’V‘Q™Y˜][œ™]\›ˆ•S”‘PÓÑÓ’V‘QŸ_Y[˜Ý[ÛˆŠ
^Ü™]\›žÙ]™[Î–×KYÚ[˜][ÛŽ›ÚYÜ™\žNŒYÙNšYÒ[

K[Z]šYÒ[

K]Y\žNˆˆŸ_R™K‘Ù]Ñ]™[™\]Y\Ý^Ý\U\›ˆ‹ØÛÜÛ[ÜËŒX™]LK‘Ù]Ñ]™[™\]Y\Ý‹[˜ÛÙJKQÙKš[˜\žUÜš]\‹˜Ü™X]J
J^Ù›ÜŠ]ÙˆK™]™[Ê[‹Z[ÌŠL
KœÝš[™Ê
NÜ™]\›ˆKœYÚ[˜][ÛˆOO]›ÚY	‰”ÚK”YÙT™\]Y\Ý™[˜ÛÙJKœYÚ[˜][Û‹‹Z[ÌŠN
K™›ÜšÊ
JK›[[J
KK›Ü™\žHOOL	‰›‹Z[ÌŠ
Kš[ÌŠK›Ü™\žJKKœYÙHOOPšYÒ[

I‰›‹Z[ÌŠÌŠKZ[
KœYÙJKK›[Z]OOPšYÒ[

I‰›‹Z[ÌŠ
KZ[
K›[Z]
KKœ]Y\žHOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊKœ]Y\žJKŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆÙKš[˜\žT™XY\ÙN›™]ÈÙKš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹ZŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹™]™[Ëœ\Ú
œÝš[™Ê
JNØœ™XZÎØØ\ÙHŽœ‹œYÚ[˜][ÛTÚK”YÙT™\]Y\Ý™XÛÙJZ[ÌŠ
JNØœ™XZÎØØ\ÙHÎœ‹›Ü™\žO]š[ÌŠ
NØœ™XZÎØØ\ÙHœ‹œYÙO]Z[

NØœ™XZÎØØ\ÙHNœ‹›[Z]]Z[

NØœ™XZÎØØ\ÙHŽœ‹œ]Y\žO]œÝš[™Ê
NØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]ZŠ
NÜ™]\›ˆ\œ˜^Kš\Ð\œ˜^JOË™]™[ÊI‰Š‹™]™[ÏYK™]™[Ë›X\
O”Ýš[™Ê
JJK
[‹š\ÔÙ]
JKœYÚ[˜][ÛŠI‰Š‹œYÚ[˜][ÛTÚK”YÙT™\]Y\Ý™œ›ÛR”ÓÓŠKœYÚ[˜][ÛŠJK
[‹š\ÔÙ]
JK›Ü™\žJI‰Š‹›Ü™\žOQ—ÊK›Ü™\žJJK
[‹š\ÔÙ]
JKœYÙJI‰Š‹œYÙOPšYÒ[
KœYÙKÔÝš[™Ê
JJK
[‹š\ÔÙ]
JK›[Z]
I‰Š‹›[Z]PšYÒ[
K›[Z]ÔÝš[™Ê
JJK
[‹š\ÔÙ]
JKœ]Y\žJI‰Š‹œ]Y\žOTÝš[™ÊKœ]Y\žJJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK™]™[ÏÛ‹™]™[ÏYK™]™[Ë›X\
O
N›‹™]™[ÏV×KKœYÚ[˜][ÛˆOO]›ÚY	‰Š‹œYÚ[˜][ÛYKœYÚ[˜][ÛÔÚK”YÙT™\]Y\ÝÒ”ÓÓŠKœYÚ[˜][ÛŠN›ÚY
KK›Ü™\žHOO]›ÚY	‰Š‹›Ü™\žOSWÊK›Ü™\žJJKKœYÙHOO]›ÚY	‰Š‹œYÙOJKœYÙ_šYÒ[

JKÔÝš[™Ê
JKK›[Z]OO]›ÚY	‰Š‹›[Z]JK›[Z]šYÒ[

JKÔÝš[™Ê
JKKœ]Y\žHOO]›ÚY	‰Š‹œ]Y\žOYKœ]Y\žJKŸKœ›ÛT\X[
J^Û]ZŠ
NÜ™]\›ˆ‹™]™[ÏYK™]™[ÏË›X\
O
_×KKœYÚ[˜][ÛˆOO]›ÚY	‰™KœYÚ[˜][ÛˆOO[[	‰Š‹œYÚ[˜][ÛTÚK”YÙT™\]Y\Ý™œ›ÛT\X[
KœYÚ[˜][ÛŠJK‹›Ü™\žOYK›Ü™\žOÏÌKœYÙHOO]›ÚY	‰™KœYÙHOO[[	‰Š‹œYÙOPšYÒ[
KœYÙKÔÝš[™Ê
JJKK›[Z]OO]›ÚY	‰™K›[Z]OO[[	‰Š‹›[Z]PšYÒ[
K›[Z]ÔÝš[™Ê
JJK‹œ]Y\žOYKœ]Y\žOÏÈˆ‹Ÿ_NÙ[˜Ý[ÛˆSÊ
^Ü™]\›žÝÎ–×K™\ÜÛœÙ\Î–×KYÚ[˜][ÛŽ›ÚYÝ[šYÒ[

__R™K‘Ù]Ñ]™[™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ[ÜËŒX™]LK‘Ù]Ñ]™[™\ÜÛœÙH‹[˜ÛÙJKQÙKš[˜\žUÜš]\‹˜Ü™X]J
J^Ù›ÜŠ]ÙˆKÊRÝ•™[˜ÛÙJ‹Z[ÌŠL
K™›ÜšÊ
JK›[[J
NÙ›ÜŠ]ÙˆK™\ÜÛœÙ\Ê^\‹•™\ÜÛœÙK™[˜ÛÙJ‹Z[ÌŠN
K™›ÜšÊ
JK›[[J
NÜ™]\›ˆKœYÚ[˜][ÛˆOO]›ÚY	‰”ÚK”YÙT™\ÜÛœÙK™[˜ÛÙJKœYÚ[˜][Û‹‹Z[ÌŠŠK™›ÜšÊ
JK›[[J
KKÝ[OOPšYÒ[

I‰›‹Z[ÌŠÌŠKZ[
KÝ[
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆÙKš[˜\žT™XY\ÙN›™]ÈÙKš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹YSÊ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹Ëœ\Ú
Ý•™XÛÙJZ[ÌŠ
JJNØœ™XZÎØØ\ÙHŽœ‹™\ÜÛœÙ\Ëœ\Ú
\‹•™\ÜÛœÙK™XÛÙJZ[ÌŠ
JJNØœ™XZÎØØ\ÙHÎœ‹œYÚ[˜][ÛTÚK”YÙT™\ÜÛœÙK™XÛÙJZ[ÌŠ
JNØœ™XZÎØØ\ÙHœ‹Ý[]Z[

NØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]YSÊ
NÜ™]\›ˆ\œ˜^Kš\Ð\œ˜^JOËÊI‰Š‹ÏYKË›X\
O’Ý•™œ›ÛR”ÓÓŠ
JJK\œ˜^Kš\Ð\œ˜^JOË™\ÜÛœÙ\ÊI‰Š‹™\ÜÛœÙ\ÏYK™\ÜÛœÙ\Ë›X\
Ož\‹•™\ÜÛœÙK™œ›ÛR”ÓÓŠ
JJK
[‹š\ÔÙ]
JKœYÚ[˜][ÛŠI‰Š‹œYÚ[˜][ÛTÚK”YÙT™\ÜÛœÙK™œ›ÛR”ÓÓŠKœYÚ[˜][ÛŠJK
[‹š\ÔÙ]
JKÝ[
I‰Š‹Ý[PšYÒ[
KÝ[ÔÝš[™Ê
JJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆKÏÛ‹ÏYKË›X\
OÒÝ•Ò”ÓÓŠ
N›ÚY
N›‹ÏV×KK™\ÜÛœÙ\ÏÛ‹™\ÜÛœÙ\ÏYK™\ÜÛœÙ\Ë›X\
OÞ\‹•™\ÜÛœÙKÒ”ÓÓŠ
N›ÚY
N›‹™\ÜÛœÙ\ÏV×KKœYÚ[˜][ÛˆOO]›ÚY	‰Š‹œYÚ[˜][ÛYKœYÚ[˜][ÛÔÚK”YÙT™\ÜÛœÙKÒ”ÓÓŠKœYÚ[˜][ÛŠN›ÚY
KKÝ[OO]›ÚY	‰Š‹Ý[JKÝ[šYÒ[

JKÔÝš[™Ê
JKŸKœ›ÛT\X[
J^Û]YSÊ
NÜ™]\›ˆ‹ÏYKÏË›X\
O’Ý•™œ›ÛT\X[

J_×K‹™\ÜÛœÙ\ÏYK™\ÜÛœÙ\ÏË›X\
Ož\‹•™\ÜÛœÙK™œ›ÛT\X[

J_×KKœYÚ[˜][ÛˆOO]›ÚY	‰™KœYÚ[˜][ÛˆOO[[	‰Š‹œYÚ[˜][ÛTÚK”YÙT™\ÜÛœÙK™œ›ÛT\X[
KœYÚ[˜][ÛŠJKKÝ[OO]›ÚY	‰™KÝ[OO[[	‰Š‹Ý[PšYÒ[
KÝ[ÔÝš[™Ê
JJKŸ_NÙ[˜Ý[Ûˆ“Ê
^Ü™]\›žÝž]\Î›™]ÈZ[\œ˜^K[ÙNŒ_R™Kœ›ØYØ\Ý™\]Y\Ý^Ý\U\›ˆ‹ØÛÜÛ[ÜËŒX™]LKœ›ØYØ\Ý™\]Y\Ý‹[˜ÛÙJKQÙKš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆKž]\Ë›[™ÝOOL	‰›‹Z[ÌŠL
K˜ž]\ÊKž]\ÊKK›[ÙHOOL	‰›‹Z[ÌŠMŠKš[ÌŠK›[ÙJKŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆÙKš[˜\žT™XY\ÙN›™]ÈÙKš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹[“Ê
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹ž]\Ï]˜ž]\Ê
NØœ™XZÎØØ\ÙHŽœ‹›[ÙO]š[ÌŠ
NØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û][“Ê
NÜ™]\›Š[‹š\ÔÙ]
JKž]\ÊI‰Š‹ž]\ÏJ[‹˜ž]\Ñœ›ÛP˜\ÙM
JKž]\ÊJK
[‹š\ÔÙ]
JK›[ÙJI‰Š‹›[ÙORÊK›[ÙJJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆKž]\ÈOO]›ÚY	‰Š‹ž]\ÏJ[‹˜˜\ÙMœ›ÛPž]\ÊJKž]\ÈOO]›ÚYÙKž]\Î›™]ÈZ[\œ˜^JJKK›[ÙHOO]›ÚY	‰Š‹›[ÙOW×ÊK›[ÙJJKŸKœ›ÛT\X[
J^Û][“Ê
NÜ™]\›ˆ‹ž]\ÏYKž]\ÏÏÛ™]ÈZ[\œ˜^K‹›[ÙOYK›[ÙOÏÌŸ_NÙ[˜Ý[ÛˆÊ
^Ü™]\›žÝ™\ÜÛœÙN›ÚY_R™Kœ›ØYØ\Ý™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ[ÜËŒX™]LKœ›ØYØ\Ý™\ÜÛœÙH‹[˜ÛÙJKQÙKš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK™\ÜÛœÙHOO]›ÚY	‰ž\‹•™\ÜÛœÙK™[˜ÛÙJK™\ÜÛœÙK‹Z[ÌŠL
K™›ÜšÊ
JK›[[J
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆÙKš[˜\žT™XY\ÙN›™]ÈÙKš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹]Ê
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÛÏŒÏOOLOÜ‹™\ÜÛœÙO^\‹•™\ÜÛœÙK™XÛÙJZ[ÌŠ
JNœÚÚ\\JÉÊ_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]]Ê
NÜ™]\›Š[‹š\ÔÙ]
JK™\ÜÛœÙJI‰Š‹™\ÜÛœÙO^\‹•™\ÜÛœÙK™œ›ÛR”ÓÓŠK™\ÜÛœÙJJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK™\ÜÛœÙHOO]›ÚY	‰Š‹™\ÜÛœÙOYK™\ÜÛœÙOÞ\‹•™\ÜÛœÙKÒ”ÓÓŠK™\ÜÛœÙJN›ÚY
KŸKœ›ÛT\X[
J^Û]]Ê
NÜ™]\›ˆK™\ÜÛœÙHOO]›ÚY	‰™K™\ÜÛœÙHOO[[	‰Š‹™\ÜÛœÙO^\‹•™\ÜÛœÙK™œ›ÛT\X[
K™\ÜÛœÙJJKŸ_NÙ[˜Ý[Ûˆ“Ê
^Ü™]\›žÝ›ÚYž]\Î›™]ÈZ[\œ˜^__R™K”Ú[][]T™\]Y\Ý^Ý\U\›ˆ‹ØÛÜÛ[ÜËŒX™]LK”Ú[][]T™\]Y\Ý‹[˜ÛÙJKQÙKš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆKOO]›ÚY	‰’Ý•™[˜ÛÙJK‹Z[ÌŠL
K™›ÜšÊ
JK›[[J
KKž]\Ë›[™ÝOOL	‰›‹Z[ÌŠN
K˜ž]\ÊKž]\ÊKŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆÙKš[˜\žT™XY\ÙN›™]ÈÙKš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹\“Ê
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹RÝ•™XÛÙJZ[ÌŠ
JNØœ™XZÎØØ\ÙHŽœ‹ž]\Ï]˜ž]\Ê
NØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]\“Ê
NÜ™]\›Š[‹š\ÔÙ]
JK
I‰Š‹RÝ•™œ›ÛR”ÓÓŠK
JK
[‹š\ÔÙ]
JKž]\ÊI‰Š‹ž]\ÏJ[‹˜ž]\Ñœ›ÛP˜\ÙM
JKž]\ÊJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆKOO]›ÚY	‰Š‹YKÒÝ•Ò”ÓÓŠK
N›ÚY
KKž]\ÈOO]›ÚY	‰Š‹ž]\ÏJ[‹˜˜\ÙMœ›ÛPž]\ÊJKž]\ÈOO]›ÚYÙKž]\Î›™]ÈZ[\œ˜^JJKŸKœ›ÛT\X[
J^Û]\“Ê
NÜ™]\›ˆKOO]›ÚY	‰™KOO[[	‰Š‹RÝ•™œ›ÛT\X[
K
JK‹ž]\ÏYKž]\ÏÏÛ™]ÈZ[\œ˜^KŸ_NÙ[˜Ý[ÛˆSÊ
^Ü™]\›žÙØ\Ò[™›Î›ÚY™\Ý[›ÚY_R™K”Ú[][]T™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ[ÜËŒX™]LK”Ú[][]T™\ÜÛœÙH‹[˜ÛÙJKQÙKš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK™Ø\Ò[™›ÈOO]›ÚY	‰ž\‹‘Ø\Ò[™›Ë™[˜ÛÙJK™Ø\Ò[™›Ë‹Z[ÌŠL
K™›ÜšÊ
JK›[[J
KKœ™\Ý[OO]›ÚY	‰ž\‹”™\Ý[™[˜ÛÙJKœ™\Ý[‹Z[ÌŠN
K™›ÜšÊ
JK›[[J
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆÙKš[˜\žT™XY\ÙN›™]ÈÙKš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹ZSÊ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹™Ø\Ò[™›Ï^\‹‘Ø\Ò[™›Ë™XÛÙJZ[ÌŠ
JNØœ™XZÎØØ\ÙHŽœ‹œ™\Ý[^\‹”™\Ý[™XÛÙJZ[ÌŠ
JNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]ZSÊ
NÜ™]\›Š[‹š\ÔÙ]
JK™Ø\Ò[™›ÊI‰Š‹™Ø\Ò[™›Ï^\‹‘Ø\Ò[™›Ë™œ›ÛR”ÓÓŠK™Ø\Ò[™›ÊJK
[‹š\ÔÙ]
JKœ™\Ý[
I‰Š‹œ™\Ý[^\‹”™\Ý[™œ›ÛR”ÓÓŠKœ™\Ý[
JKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK™Ø\Ò[™›ÈOO]›ÚY	‰Š‹™Ø\Ò[™›ÏYK™Ø\Ò[™›ÏÞ\‹‘Ø\Ò[™›ËÒ”ÓÓŠK™Ø\Ò[™›ÊN›ÚY
KKœ™\Ý[OO]›ÚY	‰Š‹œ™\Ý[YKœ™\Ý[Þ\‹”™\Ý[Ò”ÓÓŠKœ™\Ý[
N›ÚY
KŸKœ›ÛT\X[
J^Û]ZSÊ
NÜ™]\›ˆK™Ø\Ò[™›ÈOO]›ÚY	‰™K™Ø\Ò[™›ÈOO[[	‰Š‹™Ø\Ò[™›Ï^\‹‘Ø\Ò[™›Ë™œ›ÛT\X[
K™Ø\Ò[™›ÊJKKœ™\Ý[OO]›ÚY	‰™Kœ™\Ý[OO[[	‰Š‹œ™\Ý[^\‹”™\Ý[™œ›ÛT\X[
Kœ™\Ý[
JKŸ_NÙ[˜Ý[ÛˆÓÊ
^Ü™]\›žÚ\ÚˆˆŸ_R™K‘Ù]™\]Y\Ý^Ý\U\›ˆ‹ØÛÜÛ[ÜËŒX™]LK‘Ù]™\]Y\Ý‹[˜ÛÙJKQÙKš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆKš\ÚOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊKš\Ú
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆÙKš[˜\žT™XY\ÙN›™]ÈÙKš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹[ÓÊ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÛÏŒÏOOLOÜ‹š\Ú]œÝš[™Ê
NœÚÚ\\JÉÊ_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û][ÓÊ
NÜ™]\›Š[‹š\ÔÙ]
JKš\Ú
I‰Š‹š\ÚTÝš[™ÊKš\Ú
JKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆKš\ÚOO]›ÚY	‰Š‹š\ÚYKš\Ú
KŸKœ›ÛT\X[
J^Û][ÓÊ
NÜ™]\›ˆ‹š\ÚYKš\ÚÏÈˆ‹Ÿ_NÙ[˜Ý[ÛˆSÊ
^Ü™]\›žÝ›ÚY™\ÜÛœÙN›ÚY_R™K‘Ù]™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ[ÜËŒX™]LK‘Ù]™\ÜÛœÙH‹[˜ÛÙJKQÙKš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆKOO]›ÚY	‰’Ý•™[˜ÛÙJK‹Z[ÌŠL
K™›ÜšÊ
JK›[[J
KK™\ÜÛœÙHOO]›ÚY	‰ž\‹•™\ÜÛœÙK™[˜ÛÙJK™\ÜÛœÙK‹Z[ÌŠN
K™›ÜšÊ
JK›[[J
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆÙKš[˜\žT™XY\ÙN›™]ÈÙKš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹XSÊ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹RÝ•™XÛÙJZ[ÌŠ
JNØœ™XZÎØØ\ÙHŽœ‹™\ÜÛœÙO^\‹•™\ÜÛœÙK™XÛÙJZ[ÌŠ
JNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]XSÊ
NÜ™]\›Š[‹š\ÔÙ]
JK
I‰Š‹RÝ•™œ›ÛR”ÓÓŠK
JK
[‹š\ÔÙ]
JK™\ÜÛœÙJI‰Š‹™\ÜÛœÙO^\‹•™\ÜÛœÙK™œ›ÛR”ÓÓŠK™\ÜÛœÙJJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆKOO]›ÚY	‰Š‹YKÒÝ•Ò”ÓÓŠK
N›ÚY
KK™\ÜÛœÙHOO]›ÚY	‰Š‹™\ÜÛœÙOYK™\ÜÛœÙOÞ\‹•™\ÜÛœÙKÒ”ÓÓŠK™\ÜÛœÙJN›ÚY
KŸKœ›ÛT\X[
J^Û]XSÊ
NÜ™]\›ˆKOO]›ÚY	‰™KOO[[	‰Š‹RÝ•™œ›ÛT\X[
K
JKK™\ÜÛœÙHOO]›ÚY	‰™K™\ÜÛœÙHOO[[	‰Š‹™\ÜÛœÙO^\‹•™\ÜÛœÙK™œ›ÛT\X[
K™\ÜÛœÙJJKŸ_NÙ[˜Ý[ÛˆÓÊ
^Ü™]\›žÚZYÚšYÒ[

KYÚ[˜][ÛŽ›ÚY_R™K‘Ù]›ØÚÕÚ]Ô™\]Y\Ý^Ý\U\›ˆ‹ØÛÜÛ[ÜËŒX™]LK‘Ù]›ØÚÕÚ]Ô™\]Y\Ý‹[˜ÛÙJKQÙKš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆKšZYÚOOPšYÒ[

I‰›‹Z[ÌŠ
Kš[
KšZYÚ
KKœYÚ[˜][ÛˆOO]›ÚY	‰”ÚK”YÙT™\]Y\Ý™[˜ÛÙJKœYÚ[˜][Û‹‹Z[ÌŠN
K™›ÜšÊ
JK›[[J
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆÙKš[˜\žT™XY\ÙN›™]ÈÙKš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹\ÓÊ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹šZYÚ]š[

NØœ™XZÎØØ\ÙHŽœ‹œYÚ[˜][ÛTÚK”YÙT™\]Y\Ý™XÛÙJZ[ÌŠ
JNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]\ÓÊ
NÜ™]\›Š[‹š\ÔÙ]
JKšZYÚ
I‰Š‹šZYÚPšYÒ[
KšZYÚÔÝš[™Ê
JJK
[‹š\ÔÙ]
JKœYÚ[˜][ÛŠI‰Š‹œYÚ[˜][ÛTÚK”YÙT™\]Y\Ý™œ›ÛR”ÓÓŠKœYÚ[˜][ÛŠJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆKšZYÚOO]›ÚY	‰Š‹šZYÚJKšZYÚšYÒ[

JKÔÝš[™Ê
JKKœYÚ[˜][ÛˆOO]›ÚY	‰Š‹œYÚ[˜][ÛYKœYÚ[˜][ÛÔÚK”YÙT™\]Y\ÝÒ”ÓÓŠKœYÚ[˜][ÛŠN›ÚY
KŸKœ›ÛT\X[
J^Û]\ÓÊ
NÜ™]\›ˆKšZYÚOO]›ÚY	‰™KšZYÚOO[[	‰Š‹šZYÚPšYÒ[
KšZYÚÔÝš[™Ê
JJKKœYÚ[˜][ÛˆOO]›ÚY	‰™KœYÚ[˜][ÛˆOO[[	‰Š‹œYÚ[˜][ÛTÚK”YÙT™\]Y\Ý™œ›ÛT\X[
KœYÚ[˜][ÛŠJKŸ_NÙ[˜Ý[ÛˆÊ
^Ü™]\›žÝÎ–×K›ØÚÒY›ÚY›ØÚÎ›ÚYYÚ[˜][ÛŽ›ÚY_R™K‘Ù]›ØÚÕÚ]Ô™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ[ÜËŒX™]LK‘Ù]›ØÚÕÚ]Ô™\ÜÛœÙH‹[˜ÛÙJKQÙKš[˜\žUÜš]\‹˜Ü™X]J
J^Ù›ÜŠ]ÙˆKÊRÝ•™[˜ÛÙJ‹Z[ÌŠL
K™›ÜšÊ
JK›[[J
NÜ™]\›ˆK˜›ØÚÒYOO]›ÚY	‰‘YË›ØÚÒQ™[˜ÛÙJK˜›ØÚÒY‹Z[ÌŠN
K™›ÜšÊ
JK›[[J
KK˜›ØÚÈOO]›ÚY	‰”YË›ØÚË™[˜ÛÙJK˜›ØÚË‹Z[ÌŠŠK™›ÜšÊ
JK›[[J
KKœYÚ[˜][ÛˆOO]›ÚY	‰”ÚK”YÙT™\ÜÛœÙK™[˜ÛÙJKœYÚ[˜][Û‹‹Z[ÌŠÍ
K™›ÜšÊ
JK›[[J
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆÙKš[˜\žT™XY\ÙN›™]ÈÙKš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹YÊ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹Ëœ\Ú
Ý•™XÛÙJZ[ÌŠ
JJNØœ™XZÎØØ\ÙHŽœ‹˜›ØÚÒYQYË›ØÚÒQ™XÛÙJZ[ÌŠ
JNØœ™XZÎØØ\ÙHÎœ‹˜›ØÚÏTYË›ØÚË™XÛÙJZ[ÌŠ
JNØœ™XZÎØØ\ÙHœ‹œYÚ[˜][ÛTÚK”YÙT™\ÜÛœÙK™XÛÙJZ[ÌŠ
JNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]YÊ
NÜ™]\›ˆ\œ˜^Kš\Ð\œ˜^JOËÊI‰Š‹ÏYKË›X\
O’Ý•™œ›ÛR”ÓÓŠ
JJK
[‹š\ÔÙ]
JK˜›ØÚÒY
I‰Š‹˜›ØÚÒYQYË›ØÚÒQ™œ›ÛR”ÓÓŠK˜›ØÚÒY
JK
[‹š\ÔÙ]
JK˜›ØÚÊI‰Š‹˜›ØÚÏTYË›ØÚË™œ›ÛR”ÓÓŠK˜›ØÚÊJK
[‹š\ÔÙ]
JKœYÚ[˜][ÛŠI‰Š‹œYÚ[˜][ÛTÚK”YÙT™\ÜÛœÙK™œ›ÛR”ÓÓŠKœYÚ[˜][ÛŠJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆKÏÛ‹ÏYKË›X\
OÒÝ•Ò”ÓÓŠ
N›ÚY
N›‹ÏV×KK˜›ØÚÒYOO]›ÚY	‰Š‹˜›ØÚÒYYK˜›ØÚÒYÑYË›ØÚÒQÒ”ÓÓŠK˜›ØÚÒY
N›ÚY
KK˜›ØÚÈOO]›ÚY	‰Š‹˜›ØÚÏYK˜›ØÚÏÔYË›ØÚËÒ”ÓÓŠK˜›ØÚÊN›ÚY
KKœYÚ[˜][ÛˆOO]›ÚY	‰Š‹œYÚ[˜][ÛYKœYÚ[˜][ÛÔÚK”YÙT™\ÜÛœÙKÒ”ÓÓŠKœYÚ[˜][ÛŠN›ÚY
KŸKœ›ÛT\X[
J^Û]YÊ
NÜ™]\›ˆ‹ÏYKÏË›X\
O’Ý•™œ›ÛT\X[

J_×KK˜›ØÚÒYOO]›ÚY	‰™K˜›ØÚÒYOO[[	‰Š‹˜›ØÚÒYQYË›ØÚÒQ™œ›ÛT\X[
K˜›ØÚÒY
JKK˜›ØÚÈOO]›ÚY	‰™K˜›ØÚÈOO[[	‰Š‹˜›ØÚÏTYË›ØÚË™œ›ÛT\X[
K˜›ØÚÊJKKœYÚ[˜][ÛˆOO]›ÚY	‰™KœYÚ[˜][ÛˆOO[[	‰Š‹œYÚ[˜][ÛTÚK”YÙT™\ÜÛœÙK™œ›ÛT\X[
KœYÚ[˜][ÛŠJKŸ_NÙ[˜Ý[ÛˆÓÊ
^Ü™]\›žÝž]\Î›™]ÈZ[\œ˜^__R™K•XÛÙT™\]Y\Ý^Ý\U\›ˆ‹ØÛÜÛ[ÜËŒX™]LK•XÛÙT™\]Y\Ý‹[˜ÛÙJKQÙKš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆKž]\Ë›[™ÝOOL	‰›‹Z[ÌŠL
K˜ž]\ÊKž]\ÊKŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆÙKš[˜\žT™XY\ÙN›™]ÈÙKš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹XÓÊ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÛÏŒÏOOLOÜ‹ž]\Ï]˜ž]\Ê
NœÚÚ\\JÉÊ_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]XÓÊ
NÜ™]\›Š[‹š\ÔÙ]
JKž]\ÊI‰Š‹ž]\ÏJ[‹˜ž]\Ñœ›ÛP˜\ÙM
JKž]\ÊJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆKž]\ÈOO]›ÚY	‰Š‹ž]\ÏJ[‹˜˜\ÙMœ›ÛPž]\ÊJKž]\ÈOO]›ÚYÙKž]\Î›™]ÈZ[\œ˜^JJKŸKœ›ÛT\X[
J^Û]XÓÊ
NÜ™]\›ˆ‹ž]\ÏYKž]\ÏÏÛ™]ÈZ[\œ˜^KŸ_NÙ[˜Ý[ÛˆSÊ
^Ü™]\›žÝ›ÚY_R™K•XÛÙT™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ[ÜËŒX™]LK•XÛÙT™\ÜÛœÙH‹[˜ÛÙJKQÙKš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆKOO]›ÚY	‰’Ý•™[˜ÛÙJK‹Z[ÌŠL
K™›ÜšÊ
JK›[[J
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆÙKš[˜\žT™XY\ÙN›™]ÈÙKš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹]SÊ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÛÏŒÏOOLOÜ‹RÝ•™XÛÙJZ[ÌŠ
JNœÚÚ\\JÉÊ_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]]SÊ
NÜ™]\›Š[‹š\ÔÙ]
JK
I‰Š‹RÝ•™œ›ÛR”ÓÓŠK
JKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆKOO]›ÚY	‰Š‹YKÒÝ•Ò”ÓÓŠK
N›ÚY
KŸKœ›ÛT\X[
J^Û]]SÊ
NÜ™]\›ˆKOO]›ÚY	‰™KOO[[	‰Š‹RÝ•™œ›ÛT\X[
K
JKŸ_NÙ[˜Ý[ÛˆSÊ
^Ü™]\›žÝ›ÚY_R™K•[˜ÛÙT™\]Y\Ý^Ý\U\›ˆ‹ØÛÜÛ[ÜËŒX™]LK•[˜ÛÙT™\]Y\Ý‹[˜ÛÙJKQÙKš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆKOO]›ÚY	‰’Ý•™[˜ÛÙJK‹Z[ÌŠL
K™›ÜšÊ
JK›[[J
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆÙKš[˜\žT™XY\ÙN›™]ÈÙKš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹PSÊ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÛÏŒÏOOLOÜ‹RÝ•™XÛÙJZ[ÌŠ
JNœÚÚ\\JÉÊ_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]PSÊ
NÜ™]\›Š[‹š\ÔÙ]
JK
I‰Š‹RÝ•™œ›ÛR”ÓÓŠK
JKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆKOO]›ÚY	‰Š‹YKÒÝ•Ò”ÓÓŠK
N›ÚY
KŸKœ›ÛT\X[
J^Û]PSÊ
NÜ™]\›ˆKOO]›ÚY	‰™KOO[[	‰Š‹RÝ•™œ›ÛT\X[
K
JKŸ_NÙ[˜Ý[Ûˆ“Ê
^Ü™]\›žÝž]\Î›™]ÈZ[\œ˜^__R™K•[˜ÛÙT™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ[ÜËŒX™]LK•[˜ÛÙT™\ÜÛœÙH‹[˜ÛÙJKQÙKš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆKž]\Ë›[™ÝOOL	‰›‹Z[ÌŠL
K˜ž]\ÊKž]\ÊKŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆÙKš[˜\žT™XY\ÙN›™]ÈÙKš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹Y“Ê
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÛÏŒÏOOLOÜ‹ž]\Ï]˜ž]\Ê
NœÚÚ\\JÉÊ_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]Y“Ê
NÜ™]\›Š[‹š\ÔÙ]
JKž]\ÊI‰Š‹ž]\ÏJ[‹˜ž]\Ñœ›ÛP˜\ÙM
JKž]\ÊJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆKž]\ÈOO]›ÚY	‰Š‹ž]\ÏJ[‹˜˜\ÙMœ›ÛPž]\ÊJKž]\ÈOO]›ÚYÙKž]\Î›™]ÈZ[\œ˜^JJKŸKœ›ÛT\X[
J^Û]Y“Ê
NÜ™]\›ˆ‹ž]\ÏYKž]\ÏÏÛ™]ÈZ[\œ˜^KŸ_NÙ[˜Ý[ÛˆÊ
^Ü™]\›žØ[Z[›ÒœÛÛŽˆˆŸ_R™K•[˜ÛÙP[Z[›Ô™\]Y\Ý^Ý\U\›ˆ‹ØÛÜÛ[ÜËŒX™]LK•[˜ÛÙP[Z[›Ô™\]Y\Ý‹[˜ÛÙJKQÙKš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK˜[Z[›ÒœÛÛˆOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊK˜[Z[›ÒœÛÛŠKŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆÙKš[˜\žT™XY\ÙN›™]ÈÙKš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹[Ê
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÛÏŒÏOOLOÜ‹˜[Z[›ÒœÛÛ]œÝš[™Ê
NœÚÚ\\JÉÊ_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û][Ê
NÜ™]\›Š[‹š\ÔÙ]
JK˜[Z[›ÒœÛÛŠI‰Š‹˜[Z[›ÒœÛÛTÝš[™ÊK˜[Z[›ÒœÛÛŠJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK˜[Z[›ÒœÛÛˆOO]›ÚY	‰Š‹˜[Z[›ÒœÛÛYK˜[Z[›ÒœÛÛŠKŸKœ›ÛT\X[
J^Û][Ê
NÜ™]\›ˆ‹˜[Z[›ÒœÛÛYK˜[Z[›ÒœÛÛÏÈˆ‹Ÿ_NÙ[˜Ý[ÛˆÓÊ
^Ü™]\›žØ[Z[›Ðš[˜\žN›™]ÈZ[\œ˜^__R™K•[˜ÛÙP[Z[›Ô™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ[ÜËŒX™]LK•[˜ÛÙP[Z[›Ô™\ÜÛœÙH‹[˜ÛÙJKQÙKš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK˜[Z[›Ðš[˜\žK›[™ÝOOL	‰›‹Z[ÌŠL
K˜ž]\ÊK˜[Z[›Ðš[˜\žJKŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆÙKš[˜\žT™XY\ÙN›™]ÈÙKš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹YÓÊ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÛÏŒÏOOLOÜ‹˜[Z[›Ðš[˜\žO]˜ž]\Ê
NœÚÚ\\JÉÊ_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]YÓÊ
NÜ™]\›Š[‹š\ÔÙ]
JK˜[Z[›Ðš[˜\žJI‰Š‹˜[Z[›Ðš[˜\žOJ[‹˜ž]\Ñœ›ÛP˜\ÙM
JK˜[Z[›Ðš[˜\žJJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK˜[Z[›Ðš[˜\žHOO]›ÚY	‰Š‹˜[Z[›Ðš[˜\žOJ[‹˜˜\ÙMœ›ÛPž]\ÊJK˜[Z[›Ðš[˜\žHOO]›ÚYÙK˜[Z[›Ðš[˜\žN›™]ÈZ[\œ˜^JJKŸKœ›ÛT\X[
J^Û]YÓÊ
NÜ™]\›ˆ‹˜[Z[›Ðš[˜\žOYK˜[Z[›Ðš[˜\žOÏÛ™]ÈZ[\œ˜^KŸ_NÙ[˜Ý[ÛˆÊ
^Ü™]\›žØ[Z[›Ðš[˜\žN›™]ÈZ[\œ˜^__R™K•XÛÙP[Z[›Ô™\]Y\Ý^Ý\U\›ˆ‹ØÛÜÛ[ÜËŒX™]LK•XÛÙP[Z[›Ô™\]Y\Ý‹[˜ÛÙJKQÙKš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK˜[Z[›Ðš[˜\žK›[™ÝOOL	‰›‹Z[ÌŠL
K˜ž]\ÊK˜[Z[›Ðš[˜\žJKŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆÙKš[˜\žT™XY\ÙN›™]ÈÙKš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹\Ê
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÛÏŒÏOOLOÜ‹˜[Z[›Ðš[˜\žO]˜ž]\Ê
NœÚÚ\\JÉÊ_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]\Ê
NÜ™]\›Š[‹š\ÔÙ]
JK˜[Z[›Ðš[˜\žJI‰Š‹˜[Z[›Ðš[˜\žOJ[‹˜ž]\Ñœ›ÛP˜\ÙM
JK˜[Z[›Ðš[˜\žJJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK˜[Z[›Ðš[˜\žHOO]›ÚY	‰Š‹˜[Z[›Ðš[˜\žOJ[‹˜˜\ÙMœ›ÛPž]\ÊJK˜[Z[›Ðš[˜\žHOO]›ÚYÙK˜[Z[›Ðš[˜\žN›™]ÈZ[\œ˜^JJKŸKœ›ÛT\X[
J^Û]\Ê
NÜ™]\›ˆ‹˜[Z[›Ðš[˜\žOYK˜[Z[›Ðš[˜\žOÏÛ™]ÈZ[\œ˜^KŸ_NÙ[˜Ý[ÛˆSÊ
^Ü™]\›žØ[Z[›ÒœÛÛŽˆˆŸ_R™K•XÛÙP[Z[›Ô™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ[ÜËŒX™]LK•XÛÙP[Z[›Ô™\ÜÛœÙH‹[˜ÛÙJKQÙKš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK˜[Z[›ÒœÛÛˆOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊK˜[Z[›ÒœÛÛŠKŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆÙKš[˜\žT™XY\ÙN›™]ÈÙKš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹RSÊ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÛÏŒÏOOLOÜ‹˜[Z[›ÒœÛÛ]œÝš[™Ê
NœÚÚ\\JÉÊ_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]RSÊ
NÜ™]\›Š[‹š\ÔÙ]
JK˜[Z[›ÒœÛÛŠI‰Š‹˜[Z[›ÒœÛÛTÝš[™ÊK˜[Z[›ÒœÛÛŠJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK˜[Z[›ÒœÛÛˆOO]›ÚY	‰Š‹˜[Z[›ÒœÛÛYK˜[Z[›ÒœÛÛŠKŸKœ›ÛT\X[
J^Û]RSÊ
NÜ™]\›ˆ‹˜[Z[›ÒœÛÛYK˜[Z[›ÒœÛÛÏÈˆ‹Ÿ_NÝ˜\ˆÏXÛ\ÜÞÜœÎØÛÛœÝXÝÜŠŠ^Ý\ËœœÏ[‹\Ë”Ú[][]O]\Ë”Ú[][]K˜š[™
\ÊK\Ë‘Ù]]\Ë‘Ù]˜š[™
\ÊK\Ëœ›ØYØ\Ý]\Ëœ›ØYØ\Ý˜š[™
\ÊK\Ë‘Ù]Ñ]™[]\Ë‘Ù]Ñ]™[˜š[™
\ÊK\Ë‘Ù]›ØÚÕÚ]Ï]\Ë‘Ù]›ØÚÕÚ]Ë˜š[™
\ÊK\Ë•XÛÙO]\Ë•XÛÙK˜š[™
\ÊK\Ë•[˜ÛÙO]\Ë•[˜ÛÙK˜š[™
\ÊK\Ë•[˜ÛÙP[Z[›Ï]\Ë•[˜ÛÙP[Z[›Ë˜š[™
\ÊK\Ë•XÛÙP[Z[›Ï]\Ë•XÛÙP[Z[›Ë˜š[™
\Ê_TÚ[][]JŠ^Û]R™K”Ú[][]T™\]Y\Ý™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ[ÜËŒX™]LK”Ù\šXÙH‹”Ú[][]H‹
K[ŠO’™K”Ú[][]T™\ÜÛœÙK™XÛÙJ™]ÈÙKš[˜\žT™XY\ŠŠJJ_QÙ]
Š^Û]R™K‘Ù]™\]Y\Ý™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ[ÜËŒX™]LK”Ù\šXÙH‹‘Ù]‹
K[ŠO’™K‘Ù]™\ÜÛœÙK™XÛÙJ™]ÈÙKš[˜\žT™XY\ŠŠJJ_Pœ›ØYØ\Ý
Š^Û]R™Kœ›ØYØ\Ý™\]Y\Ý™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ[ÜËŒX™]LK”Ù\šXÙH‹œ›ØYØ\Ý‹
K[ŠO’™Kœ›ØYØ\Ý™\ÜÛœÙK™XÛÙJ™]ÈÙKš[˜\žT™XY\ŠŠJJ_QÙ]Ñ]™[
Š^Û]R™K‘Ù]Ñ]™[™\]Y\Ý™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ[ÜËŒX™]LK”Ù\šXÙH‹‘Ù]Ñ]™[‹
K[ŠO’™K‘Ù]Ñ]™[™\ÜÛœÙK™XÛÙJ™]ÈÙKš[˜\žT™XY\ŠŠJJ_QÙ]›ØÚÕÚ]ÊŠ^Û]R™K‘Ù]›ØÚÕÚ]Ô™\]Y\Ý™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ[ÜËŒX™]LK”Ù\šXÙH‹‘Ù]›ØÚÕÚ]È‹
K[ŠO’™K‘Ù]›ØÚÕÚ]Ô™\ÜÛœÙK™XÛÙJ™]ÈÙKš[˜\žT™XY\ŠŠJJ_UXÛÙJŠ^Û]R™K•XÛÙT™\]Y\Ý™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ[ÜËŒX™]LK”Ù\šXÙH‹•XÛÙH‹
K[ŠO’™K•XÛÙT™\ÜÛœÙK™XÛÙJ™]ÈÙKš[˜\žT™XY\ŠŠJJ_U[˜ÛÙJŠ^Û]R™K•[˜ÛÙT™\]Y\Ý™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ[ÜËŒX™]LK”Ù\šXÙH‹•[˜ÛÙH‹
K[ŠO’™K•[˜ÛÙT™\ÜÛœÙK™XÛÙJ™]ÈÙKš[˜\žT™XY\ŠŠJJ_U[˜ÛÙP[Z[›ÊŠ^Û]R™K•[˜ÛÙP[Z[›Ô™\]Y\Ý™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ[ÜËŒX™]LK”Ù\šXÙH‹•[˜ÛÙP[Z[›È‹
K[ŠO’™K•[˜ÛÙP[Z[›Ô™\ÜÛœÙK™XÛÙJ™]ÈÙKš[˜\žT™XY\ŠŠJJ_UXÛÙP[Z[›ÊŠ^Û]R™K•XÛÙP[Z[›Ô™\]Y\Ý™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ[ÜËŒX™]LK”Ù\šXÙH‹•XÛÙP[Z[›È‹
K[ŠO’™K•XÛÙP[Z[›Ô™\ÜÛœÙK™XÛÙJ™]ÈÙKš[˜\žT™XY\ŠŠJJ__NÒ™K”Ù\šXÙPÛY[[\ZßJNÝ˜\ˆ×ÏRJSÏOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\JSË—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÞSËœÙ]\^[œÚ[ÛZÉÝ˜\ˆIQ™

KÉVÊ
K—ÏQ×Ê
KÙÏT

KÉPÛÊ
NÙ[˜Ý[ÛˆÉ
J^Û]JÉ˜Ü™X]T›ÝØY”œÐÛY[
JJK[™]È—Ë”Ù\šXÙPÛY[[\
ŠNÜ™]\›žÝžÙÙ]˜\Þ[˜ÈOOžÛ]^Ú\Úš_NÜ™]\›ˆ]ØZ]‘Ù]
Š_KÚ[][]N˜\Þ[˜ÊK‹ËJOOžÛ]Ï]ÙË•™œ›ÛT\X[
Ø]][™›ÎÙË]][™›Ë™œ›ÛT\X[
Ù™YNÙË‘™YK™œ›ÛT\X[
ßJKÚYÛ™\’[™›ÜÎ–ÞÜX›XÒÙ^NŠI™[˜ÛÙTXšÙ^JJÊKÙ\]Y[˜ÙNšYÒ[
JK[ÙR[™›ÎžÜÚ[™ÛNžÛ[ÙNÉ”ÚYÛ“[ÙK”ÒQÓ—ÓSÑWÕS”ÔPÒQ’QQ__W_JK›ÙNÙË•›ÙK™œ›ÛT\X[
ÛY\ÜØYÙ\Î\œ˜^K™œ›ÛJJKY[[ÎœŸJKÚYÛ˜]\™\Î–Û™]ÈZ[\œ˜^W_JKU—Ë”Ú[][]T™\]Y\Ý™œ›ÛT\X[
Ýž]\ÎÙË•™[˜ÛÙJÊK™š[š\Ú

_JNÜ™]\›ˆ]ØZ]”Ú[][]J
_____JNÝ˜\ˆ×ÏRJOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\J—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÖš\Ð[Z[›Ó\ÙÐÜ™X]U™\Ý[™ÐXØÛÝ[QIÖ˜Ü™X]U™\Ý[™Ð[Z[›ÐÛÛ™\\œÏTIÙ[˜Ý[ÛˆI
J^Ü™]\›ˆK\OOOH˜ÛÜÛ[ÜË\ÙËÓ\ÙÐÜ™X]U™\Ý[™ÐXØÛÝ[ŸY[˜Ý[ÛˆI

^Ü™]\›žÈ‹ØÛÜÛ[ÜË™\Ý[™ËŒX™]LK“\ÙÐÜ™X]U™\Ý[™ÐXØÛÝ[ŽžØ[Z[›Õ\Nˆ˜ÛÜÛ[ÜË\ÙËÓ\ÙÐÜ™X]U™\Ý[™ÐXØÛÝ[‹Ð[Z[›ÎŠÙœ›ÛPY™\ÜÎ™KÐY™\ÜÎ›‹[[Ý[[™[YNšK[^YYœŸJOOŠÙœ›ÛWØY™\ÜÎ™K×ØY™\ÜÎ›‹[[Ý[–Ë‹‹K[™Ý[YNšKÔÝš[™Ê
K[^YYœŸJKœ›ÛP[Z[›ÎŠÙœ›ÛWØY™\ÜÎ™K×ØY™\ÜÎ›‹[[Ý[[™Ý[YNšK[^YYœŸJOOŠÙœ›ÛPY™\ÜÎ™KÐY™\ÜÎ›‹[[Ý[–Ë‹‹K[™[YNšYÒ[
JK[^YYœŸJ____JNÝ˜\ˆÏRJOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\J‹—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÑ‹“\ÙÐÛY[[\Q‹“\ÙÐÜ™X]T\š[ÙXÕ™\Ý[™ÐXØÛÝ[™\ÜÛœÙOQ‹“\ÙÐÜ™X]T\š[ÙXÕ™\Ý[™ÐXØÛÝ[Q‹“\ÙÐÜ™X]T\›X[™[ØÚÙYXØÛÝ[™\ÜÛœÙOQ‹“\ÙÐÜ™X]T\›X[™[ØÚÙYXØÛÝ[Q‹“\ÙÐÜ™X]U™\Ý[™ÐXØÛÝ[™\ÜÛœÙOQ‹“\ÙÐÜ™X]U™\Ý[™ÐXØÛÝ[Q‹œ›ÝØY”XÚØYÙO]›ÚYÝ˜\ˆYRŠ
K™ÏSÊ
KOTÙJ
K™QYJ
NÑ‹œ›ÝØY”XÚØYÙOH˜ÛÜÛ[ÜË™\Ý[™ËŒX™]LHŽÙ[˜Ý[Ûˆ“Ê
^Ü™]\›žÙœ›ÛPY™\ÜÎˆˆ‹ÐY™\ÜÎˆˆ‹[[Ý[–×K[™[YNšYÒ[

K[^YYˆL__Q‹“\ÙÐÜ™X]U™\Ý[™ÐXØÛÝ[^Ý\U\›ˆ‹ØÛÜÛ[ÜË™\Ý[™ËŒX™]LK“\ÙÐÜ™X]U™\Ý[™ÐXØÛÝ[‹[˜ÛÙJKYKš[˜\žUÜš]\‹˜Ü™X]J
J^ÙK™œ›ÛPY™\ÜÈOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊK™œ›ÛPY™\ÜÊKKÐY™\ÜÈOOHˆ‰‰›‹Z[ÌŠN
KœÝš[™ÊKÐY™\ÜÊNÙ›ÜŠ]ÙˆK˜[[Ý[
PYÛÚ[‹™[˜ÛÙJ‹Z[ÌŠŠK™›ÜšÊ
JK›[[J
NÜ™]\›ˆK™[™[YHOOPšYÒ[

I‰›‹Z[ÌŠÌŠKš[
K™[™[YJKK™[^YYOOHL	‰›‹Z[ÌŠ
K˜›ÛÛ
K™[^YY
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆKš[˜\žT™XY\ÙN›™]ÈKš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹P“Ê
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹™œ›ÛPY™\ÜÏ]œÝš[™Ê
NØœ™XZÎØØ\ÙHŽœ‹ÐY™\ÜÏ]œÝš[™Ê
NØœ™XZÎØØ\ÙHÎœ‹˜[[Ý[œ\Ú
YÛÚ[‹™XÛÙJZ[ÌŠ
JJNØœ™XZÎØØ\ÙHœ‹™[™[YO]š[

NØœ™XZÎØØ\ÙHNœ‹™[^YY]˜›ÛÛ

NØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]P“Ê
NÜ™]\›Š™š\ÔÙ]
JK™œ›ÛPY™\ÜÊI‰Š‹™œ›ÛPY™\ÜÏTÝš[™ÊK™œ›ÛPY™\ÜÊJK
™š\ÔÙ]
JKÐY™\ÜÊI‰Š‹ÐY™\ÜÏTÝš[™ÊKÐY™\ÜÊJK\œ˜^Kš\Ð\œ˜^JOË˜[[Ý[
I‰Š‹˜[[Ý[YK˜[[Ý[›X\
OYÛÚ[‹™œ›ÛR”ÓÓŠ
JJK
™š\ÔÙ]
JK™[™[YJI‰Š‹™[™[YOPšYÒ[
K™[™[YKÔÝš[™Ê
JJK
™š\ÔÙ]
JK™[^YY
I‰Š‹™[^YYHHYK™[^YY
KŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK™œ›ÛPY™\ÜÈOO]›ÚY	‰Š‹™œ›ÛPY™\ÜÏYK™œ›ÛPY™\ÜÊKKÐY™\ÜÈOO]›ÚY	‰Š‹ÐY™\ÜÏYKÐY™\ÜÊKK˜[[Ý[Û‹˜[[Ý[YK˜[[Ý[›X\
OÐYÛÚ[‹Ò”ÓÓŠ
N›ÚY
N›‹˜[[Ý[V×KK™[™[YHOO]›ÚY	‰Š‹™[™[YOJK™[™[Y_šYÒ[

JKÔÝš[™Ê
JKK™[^YYOO]›ÚY	‰Š‹™[^YYYK™[^YY
KŸKœ›ÛT\X[
J^Û]P“Ê
NÜ™]\›ˆ‹™œ›ÛPY™\ÜÏYK™œ›ÛPY™\ÜÏÏÈˆ‹‹ÐY™\ÜÏYKÐY™\ÜÏÏÈˆ‹‹˜[[Ý[YK˜[[Ý[Ë›X\
OYÛÚ[‹™œ›ÛT\X[

J_×KK™[™[YHOO]›ÚY	‰™K™[™[YHOO[[	‰Š‹™[™[YOPšYÒ[
K™[™[YKÔÝš[™Ê
JJK‹™[^YYYK™[^YYÏÈLKŸ_NÙ[˜Ý[ÛˆSÊ
^Ü™]\›žß_Q‹“\ÙÐÜ™X]U™\Ý[™ÐXØÛÝ[™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ[ÜË™\Ý[™ËŒX™]LK“\ÙÐÜ™X]U™\Ý[™ÐXØÛÝ[™\ÜÛœÙH‹[˜ÛÙJKYKš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆKš[˜\žT™XY\ÙN›™]ÈKš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹[SÊ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Ü™]\›ˆSÊ
_KÒ”ÓÓŠJ^Ü™]\›žß_Kœ›ÛT\X[
J^Ü™]\›ˆSÊ
__NÙ[˜Ý[ÛˆÓÊ
^Ü™]\›žÙœ›ÛPY™\ÜÎˆˆ‹ÐY™\ÜÎˆˆ‹[[Ý[–×__Q‹“\ÙÐÜ™X]T\›X[™[ØÚÙYXØÛÝ[^Ý\U\›ˆ‹ØÛÜÛ[ÜË™\Ý[™ËŒX™]LK“\ÙÐÜ™X]T\›X[™[ØÚÙYXØÛÝ[‹[˜ÛÙJKYKš[˜\žUÜš]\‹˜Ü™X]J
J^ÙK™œ›ÛPY™\ÜÈOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊK™œ›ÛPY™\ÜÊKKÐY™\ÜÈOOHˆ‰‰›‹Z[ÌŠN
KœÝš[™ÊKÐY™\ÜÊNÙ›ÜŠ]ÙˆK˜[[Ý[
PYÛÚ[‹™[˜ÛÙJ‹Z[ÌŠŠK™›ÜšÊ
JK›[[J
NÜ™]\›ˆŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆKš[˜\žT™XY\ÙN›™]ÈKš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹PÓÊ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹™œ›ÛPY™\ÜÏ]œÝš[™Ê
NØœ™XZÎØØ\ÙHŽœ‹ÐY™\ÜÏ]œÝš[™Ê
NØœ™XZÎØØ\ÙHÎœ‹˜[[Ý[œ\Ú
YÛÚ[‹™XÛÙJZ[ÌŠ
JJNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]PÓÊ
NÜ™]\›Š™š\ÔÙ]
JK™œ›ÛPY™\ÜÊI‰Š‹™œ›ÛPY™\ÜÏTÝš[™ÊK™œ›ÛPY™\ÜÊJK
™š\ÔÙ]
JKÐY™\ÜÊI‰Š‹ÐY™\ÜÏTÝš[™ÊKÐY™\ÜÊJK\œ˜^Kš\Ð\œ˜^JOË˜[[Ý[
I‰Š‹˜[[Ý[YK˜[[Ý[›X\
OYÛÚ[‹™œ›ÛR”ÓÓŠ
JJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK™œ›ÛPY™\ÜÈOO]›ÚY	‰Š‹™œ›ÛPY™\ÜÏYK™œ›ÛPY™\ÜÊKKÐY™\ÜÈOO]›ÚY	‰Š‹ÐY™\ÜÏYKÐY™\ÜÊKK˜[[Ý[Û‹˜[[Ý[YK˜[[Ý[›X\
OÐYÛÚ[‹Ò”ÓÓŠ
N›ÚY
N›‹˜[[Ý[V×KŸKœ›ÛT\X[
J^Û]PÓÊ
NÜ™]\›ˆ‹™œ›ÛPY™\ÜÏYK™œ›ÛPY™\ÜÏÏÈˆ‹‹ÐY™\ÜÏYKÐY™\ÜÏÏÈˆ‹‹˜[[Ý[YK˜[[Ý[Ë›X\
OYÛÚ[‹™œ›ÛT\X[

J_×KŸ_NÙ[˜Ý[ÛˆÓÊ
^Ü™]\›žß_Q‹“\ÙÐÜ™X]T\›X[™[ØÚÙYXØÛÝ[™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ[ÜË™\Ý[™ËŒX™]LK“\ÙÐÜ™X]T\›X[™[ØÚÙYXØÛÝ[™\ÜÛœÙH‹[˜ÛÙJKYKš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆKš[˜\žT™XY\ÙN›™]ÈKš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹TÓÊ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Ü™]\›ˆÓÊ
_KÒ”ÓÓŠJ^Ü™]\›žß_Kœ›ÛT\X[
J^Ü™]\›ˆÓÊ
__NÙ[˜Ý[ÛˆÓÊ
^Ü™]\›žÙœ›ÛPY™\ÜÎˆˆ‹ÐY™\ÜÎˆˆ‹Ý\[YNšYÒ[

K™\Ý[™Ô\š[ÙÎ–×__Q‹“\ÙÐÜ™X]T\š[ÙXÕ™\Ý[™ÐXØÛÝ[^Ý\U\›ˆ‹ØÛÜÛ[ÜË™\Ý[™ËŒX™]LK“\ÙÐÜ™X]T\š[ÙXÕ™\Ý[™ÐXØÛÝ[‹[˜ÛÙJKYKš[˜\žUÜš]\‹˜Ü™X]J
J^ÙK™œ›ÛPY™\ÜÈOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊK™œ›ÛPY™\ÜÊKKÐY™\ÜÈOOHˆ‰‰›‹Z[ÌŠN
KœÝš[™ÊKÐY™\ÜÊKKœÝ\[YHOOPšYÒ[

I‰›‹Z[ÌŠ
Kš[
KœÝ\[YJNÙ›ÜŠ]ÙˆK™\Ý[™Ô\š[ÙÊT™Ë”\š[Ù™[˜ÛÙJ‹Z[ÌŠÍ
K™›ÜšÊ
JK›[[J
NÜ™]\›ˆŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆKš[˜\žT™XY\ÙN›™]ÈKš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹ZÓÊ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹™œ›ÛPY™\ÜÏ]œÝš[™Ê
NØœ™XZÎØØ\ÙHŽœ‹ÐY™\ÜÏ]œÝš[™Ê
NØœ™XZÎØØ\ÙHÎœ‹œÝ\[YO]š[

NØœ™XZÎØØ\ÙHœ‹™\Ý[™Ô\š[ÙËœ\Ú
™Ë”\š[Ù™XÛÙJZ[ÌŠ
JJNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]ZÓÊ
NÜ™]\›Š™š\ÔÙ]
JK™œ›ÛPY™\ÜÊI‰Š‹™œ›ÛPY™\ÜÏTÝš[™ÊK™œ›ÛPY™\ÜÊJK
™š\ÔÙ]
JKÐY™\ÜÊI‰Š‹ÐY™\ÜÏTÝš[™ÊKÐY™\ÜÊJK
™š\ÔÙ]
JKœÝ\[YJI‰Š‹œÝ\[YOPšYÒ[
KœÝ\[YKÔÝš[™Ê
JJK\œ˜^Kš\Ð\œ˜^JOË™\Ý[™Ô\š[ÙÊI‰Š‹™\Ý[™Ô\š[ÙÏYK™\Ý[™Ô\š[ÙË›X\
O”™Ë”\š[Ù™œ›ÛR”ÓÓŠ
JJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK™œ›ÛPY™\ÜÈOO]›ÚY	‰Š‹™œ›ÛPY™\ÜÏYK™œ›ÛPY™\ÜÊKKÐY™\ÜÈOO]›ÚY	‰Š‹ÐY™\ÜÏYKÐY™\ÜÊKKœÝ\[YHOO]›ÚY	‰Š‹œÝ\[YOJKœÝ\[Y_šYÒ[

JKÔÝš[™Ê
JKK™\Ý[™Ô\š[ÙÏÛ‹™\Ý[™Ô\š[ÙÏYK™\Ý[™Ô\š[ÙË›X\
OÔ™Ë”\š[ÙÒ”ÓÓŠ
N›ÚY
N›‹™\Ý[™Ô\š[ÙÏV×KŸKœ›ÛT\X[
J^Û]ZÓÊ
NÜ™]\›ˆ‹™œ›ÛPY™\ÜÏYK™œ›ÛPY™\ÜÏÏÈˆ‹‹ÐY™\ÜÏYKÐY™\ÜÏÏÈˆ‹KœÝ\[YHOO]›ÚY	‰™KœÝ\[YHOO[[	‰Š‹œÝ\[YOPšYÒ[
KœÝ\[YKÔÝš[™Ê
JJK‹™\Ý[™Ô\š[ÙÏYK™\Ý[™Ô\š[ÙÏË›X\
O”™Ë”\š[Ù™œ›ÛT\X[

J_×KŸ_NÙ[˜Ý[ÛˆSÊ
^Ü™]\›žß_Q‹“\ÙÐÜ™X]T\š[ÙXÕ™\Ý[™ÐXØÛÝ[™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ[ÜË™\Ý[™ËŒX™]LK“\ÙÐÜ™X]T\š[ÙXÕ™\Ý[™ÐXØÛÝ[™\ÜÛœÙH‹[˜ÛÙJKYKš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆKš[˜\žT™XY\ÙN›™]ÈKš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹QSÊ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Ü™]\›ˆSÊ
_KÒ”ÓÓŠJ^Ü™]\›žß_Kœ›ÛT\X[
J^Ü™]\›ˆSÊ
__NÝ˜\ˆSÏXÛ\ÜÞÜœÎØÛÛœÝXÝÜŠŠ^Ý\ËœœÏ[‹\ËÜ™X]U™\Ý[™ÐXØÛÝ[]\ËÜ™X]U™\Ý[™ÐXØÛÝ[˜š[™
\ÊK\ËÜ™X]T\›X[™[ØÚÙYXØÛÝ[]\ËÜ™X]T\›X[™[ØÚÙYXØÛÝ[˜š[™
\ÊK\ËÜ™X]T\š[ÙXÕ™\Ý[™ÐXØÛÝ[]\ËÜ™X]T\š[ÙXÕ™\Ý[™ÐXØÛÝ[˜š[™
\Ê_PÜ™X]U™\Ý[™ÐXØÛÝ[
Š^Û]Q‹“\ÙÐÜ™X]U™\Ý[™ÐXØÛÝ[™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ[ÜË™\Ý[™ËŒX™]LK“\ÙÈ‹Ü™X]U™\Ý[™ÐXØÛÝ[‹
K[ŠO‘‹“\ÙÐÜ™X]U™\Ý[™ÐXØÛÝ[™\ÜÛœÙK™XÛÙJ™]ÈKš[˜\žT™XY\ŠŠJJ_PÜ™X]T\›X[™[ØÚÙYXØÛÝ[
Š^Û]Q‹“\ÙÐÜ™X]T\›X[™[ØÚÙYXØÛÝ[™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ[ÜË™\Ý[™ËŒX™]LK“\ÙÈ‹Ü™X]T\›X[™[ØÚÙYXØÛÝ[‹
K[ŠO‘‹“\ÙÐÜ™X]T\›X[™[ØÚÙYXØÛÝ[™\ÜÛœÙK™XÛÙJ™]ÈKš[˜\žT™XY\ŠŠJJ_PÜ™X]T\š[ÙXÕ™\Ý[™ÐXØÛÝ[
Š^Û]Q‹“\ÙÐÜ™X]T\š[ÙXÕ™\Ý[™ÐXØÛÝ[™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ[ÜË™\Ý[™ËŒX™]LK“\ÙÈ‹Ü™X]T\š[ÙXÕ™\Ý[™ÐXØÛÝ[‹
K[ŠO‘‹“\ÙÐÜ™X]T\š[ÙXÕ™\Ý[™ÐXØÛÝ[™\ÜÛœÙK™XÛÙJ™]ÈKš[˜\žT™XY\ŠŠJJ__NÑ‹“\ÙÐÛY[[\TSßJNÝ˜\ˆWÏRJ	OžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\J	—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÉ™\Ý[™Õ\\Ï]›ÚYÝ˜\ˆÉSÊ
NÉ™\Ý[™Õ\\ÏVÖÈ‹ØÛÜÛ[ÜË™\Ý[™ËŒX™]LK“\ÙÐÜ™X]U™\Ý[™ÐXØÛÝ[‹É“\ÙÐÜ™X]U™\Ý[™ÐXØÛÝ[W_JNÝ˜\ˆšRJOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\J—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÕš\Ð[Z[›Ó\ÙÐÜ™X]U˜[Y]ÜUš\Ð[Z[›Ó\ÙÐ™YÚ[”™Y[YØ]OU˜Ü™X]TÝZÚ[™Ð[Z[›ÐÛÛ™\\œÏUœÙ]\Û\Ú[™Ñ^[œÚ[ÛUš\Ð[Z[›Ó\ÙÕ[š˜Z[U˜Ü™X]TÛ\Ú[™Ð[Z[›ÐÛÛ™\\œÏUœÙ]\Z[^[œÚ[ÛUœÙ]\X˜Ñ^[œÚ[ÛUš\Ó\ÙÕ˜[œÙ™\‘[˜ÛÙSØš™XÝUšX˜Õ\\ÏUš\Ð[Z[›Ó\ÙÕ˜[œÙ™\U˜Ü™X]RX˜Ð[Z[›ÐÛÛ™\\œÏU™Ü›Ý\\\ÏU˜Ü™X]QÜ›Ý\[Z[›ÐÛÛ™\\œÏUœÙ]\ÛÝ‘^[œÚ[ÛUš\Ó\ÙÕ›ÝUÙZYÚY[˜ÛÙSØš™XÝUš\Ó\ÙÕ›ÝQ[˜ÛÙSØš™XÝUš\Ó\ÙÔÝX›Z]›ÜÜØ[[˜ÛÙSØš™XÝUš\Ó\ÙÑ\ÜÚ][˜ÛÙSØš™XÝU™ÛÝ•\\ÏUš\Ð[Z[›Ó\ÙÕ›ÝUÙZYÚYUš\Ð[Z[›Ó\ÙÕ›ÝOUš\Ð[Z[›Ó\ÙÔÝX›Z]›ÜÜØ[Uš\Ð[Z[›Ó\ÙÑ\ÜÚ]U˜Ü™X]QÛÝ[Z[›ÐÛÛ™\\œÏUœÙ]\™YYÜ˜[^[œÚ[ÛU™™YYÜ˜[\\ÏU˜Ü™X]Q™YYÜ˜[[Z[›ÐÛÛ™\\œÏUš\Ð[Z[›Ó\ÙÔÝX›Z]]šY[˜ÙOU˜Ü™X]Q]šY[˜ÙP[Z[›ÐÛÛ™\\œÏUœÙ]\\ÝšX][Û‘^[œÚ[ÛUš\Ó\ÙÕÚ]˜]Ñ[YØ]Ü”™]Ø\™[˜ÛÙSØš™XÝU™\ÝšX][Û•\\ÏUš\Ð[Z[›Ó\ÙÕÚ]˜]Õ˜[Y]ÜÛÛ[Z\ÜÚ[ÛUš\Ð[Z[›Ó\ÙÕÚ]˜]Ñ[YØ]Ü”™]Ø\™Uš\Ð[Z[›Ó\ÙÔÙ]Ú]˜]ÐY™\ÜÏUš\Ð[Z[›Ó\ÙÑ[™ÛÛ[][š]TÛÛU˜Ü™X]Q\ÝšX][Û[Z[›ÐÛÛ™\\œÏUš\Ð[Z[›Ó\ÙÕ™\šYžR[˜\šX[U˜Ü™X]PÜž\Ú\Ð[Z[›ÐÛÛ™\\œÏUœÙ]\˜[šÑ^[œÚ[ÛUš\Ó\ÙÔÙ[™[˜ÛÙSØš™XÝU˜˜[šÕ\\ÏUš\Ð[Z[›Ó\ÙÔÙ[™Uš\Ð[Z[›Ó\ÙÓ][TÙ[™U˜Ü™X]P˜[šÐ[Z[›ÐÛÛ™\\œÏUœÙ]\]]‘^[œÚ[ÛU˜]]•\\ÏU˜Ü™X]P]][Z[›ÐÛÛ™\\œÏUœÙ]\]]^[œÚ[Û]›ÚYÕ™\Ý[™Õ\\ÏUš\Ð[Z[›Ó\ÙÐÜ™X]U™\Ý[™ÐXØÛÝ[U˜Ü™X]U™\Ý[™Ð[Z[›ÐÛÛ™\\œÏUœÙ]\^[œÚ[ÛUœÙ]\ÝZÚ[™Ñ^[œÚ[ÛUœÝZÚ[™Õ\\ÏUš\Ó\ÙÕ[™[YØ]Q[˜ÛÙSØš™XÝUš\Ó\ÙÑY]˜[Y]Ü‘[˜ÛÙSØš™XÝUš\Ó\ÙÑ[YØ]Q[˜ÛÙSØš™XÝUš\Ó\ÙÐÜ™X]U˜[Y]Ü‘[˜ÛÙSØš™XÝUš\Ó\ÙÐØ[˜Ù[[˜›Û™[™Ñ[YØ][Û‘[˜ÛÙSØš™XÝUš\Ó\ÙÐ™YÚ[”™Y[YØ]Q[˜ÛÙSØš™XÝUš\Ð[Z[›Ó\ÙÕ[™[YØ]OUš\Ð[Z[›Ó\ÙÑY]˜[Y]ÜUš\Ð[Z[›Ó\ÙÑ[YØ]O]›ÚYÝ˜\ˆ‰U“J
NÓØš™XÝ™Yš[™T›Ü\JœÙ]\]]^[œÚ[Ûˆ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ‰œÙ]\]]^[œÚ[ÛŸ_JNÝ˜\ˆ‰UÓJ
NÓØš™XÝ™Yš[™T›Ü\J˜Ü™X]P]][Z[›ÐÛÛ™\\œÈ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ‰˜Ü™X]P]][Z[›ÐÛÛ™\\œß_JNÝ˜\ˆ	SJ
NÓØš™XÝ™Yš[™T›Ü\J˜]]•\\È‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ	˜]]•\\ß_JNÝ˜\ˆ‰^“J
NÓØš™XÝ™Yš[™T›Ü\JœÙ]\]]‘^[œÚ[Ûˆ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ‰œÙ]\]]‘^[œÚ[ÛŸ_JNÝ˜\ˆÓÏV“J
NÓØš™XÝ™Yš[™T›Ü\J˜Ü™X]P˜[šÐ[Z[›ÐÛÛ™\\œÈ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆÓË˜Ü™X]P˜[šÐ[Z[›ÐÛÛ™\\œß_JNÓØš™XÝ™Yš[™T›Ü\Jš\Ð[Z[›Ó\ÙÓ][TÙ[™‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆÓËš\Ð[Z[›Ó\ÙÓ][TÙ[™_JNÓØš™XÝ™Yš[™T›Ü\Jš\Ð[Z[›Ó\ÙÔÙ[™‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆÓËš\Ð[Z[›Ó\ÙÔÙ[™_JNÝ˜\ˆ—ÏIJ
NÓØš™XÝ™Yš[™T›Ü\J˜˜[šÕ\\È‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ—Ë˜˜[šÕ\\ß_JNÓØš™XÝ™Yš[™T›Ü\Jš\Ó\ÙÔÙ[™[˜ÛÙSØš™XÝ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ—Ëš\Ó\ÙÔÙ[™[˜ÛÙSØš™XÝ_JNÝ˜\ˆ‰[’

NÓØš™XÝ™Yš[™T›Ü\JœÙ]\˜[šÑ^[œÚ[Ûˆ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ‰œÙ]\˜[šÑ^[œÚ[ÛŸ_JNÝ˜\ˆ—Ï]

NÓØš™XÝ™Yš[™T›Ü\J˜Ü™X]PÜž\Ú\Ð[Z[›ÐÛÛ™\\œÈ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ—Ë˜Ü™X]PÜž\Ú\Ð[Z[›ÐÛÛ™\\œß_JNÓØš™XÝ™Yš[™T›Ü\Jš\Ð[Z[›Ó\ÙÕ™\šYžR[˜\šX[‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ—Ëš\Ð[Z[›Ó\ÙÕ™\šYžR[˜\šX[_JNÝ˜\ˆ™Ï\’

NÓØš™XÝ™Yš[™T›Ü\J˜Ü™X]Q\ÝšX][Û[Z[›ÐÛÛ™\\œÈ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ™Ë˜Ü™X]Q\ÝšX][Û[Z[›ÐÛÛ™\\œß_JNÓØš™XÝ™Yš[™T›Ü\Jš\Ð[Z[›Ó\ÙÑ[™ÛÛ[][š]TÛÛ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ™Ëš\Ð[Z[›Ó\ÙÑ[™ÛÛ[][š]TÛÛ_JNÓØš™XÝ™Yš[™T›Ü\Jš\Ð[Z[›Ó\ÙÔÙ]Ú]˜]ÐY™\ÜÈ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ™Ëš\Ð[Z[›Ó\ÙÔÙ]Ú]˜]ÐY™\Üß_JNÓØš™XÝ™Yš[™T›Ü\Jš\Ð[Z[›Ó\ÙÕÚ]˜]Ñ[YØ]Ü”™]Ø\™‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ™Ëš\Ð[Z[›Ó\ÙÕÚ]˜]Ñ[YØ]Ü”™]Ø\™_JNÓØš™XÝ™Yš[™T›Ü\Jš\Ð[Z[›Ó\ÙÕÚ]˜]Õ˜[Y]ÜÛÛ[Z\ÜÚ[Ûˆ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ™Ëš\Ð[Z[›Ó\ÙÕÚ]˜]Õ˜[Y]ÜÛÛ[Z\ÜÚ[ÛŸ_JNÝ˜\ˆÏZR

NÓØš™XÝ™Yš[™T›Ü\J™\ÝšX][Û•\\È‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆË™\ÝšX][Û•\\ß_JNÓØš™XÝ™Yš[™T›Ü\Jš\Ó\ÙÕÚ]˜]Ñ[YØ]Ü”™]Ø\™[˜ÛÙSØš™XÝ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆËš\Ó\ÙÕÚ]˜]Ñ[YØ]Ü”™]Ø\™[˜ÛÙSØš™XÝ_JNÝ˜\ˆÉ\Ò

NÓØš™XÝ™Yš[™T›Ü\JœÙ]\\ÝšX][Û‘^[œÚ[Ûˆ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆÉœÙ]\\ÝšX][Û‘^[œÚ[ÛŸ_JNÝ˜\ˆ	ÏY

NÓØš™XÝ™Yš[™T›Ü\J˜Ü™X]Q]šY[˜ÙP[Z[›ÐÛÛ™\\œÈ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ	Ë˜Ü™X]Q]šY[˜ÙP[Z[›ÐÛÛ™\\œß_JNÓØš™XÝ™Yš[™T›Ü\Jš\Ð[Z[›Ó\ÙÔÝX›Z]]šY[˜ÙH‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ	Ëš\Ð[Z[›Ó\ÙÔÝX›Z]]šY[˜Ù__JNÝ˜\ˆ	XÒ

NÓØš™XÝ™Yš[™T›Ü\J˜Ü™X]Q™YYÜ˜[[Z[›ÐÛÛ™\\œÈ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ	˜Ü™X]Q™YYÜ˜[[Z[›ÐÛÛ™\\œß_JNÝ˜\ˆIY’

NÓØš™XÝ™Yš[™T›Ü\J™™YYÜ˜[\\È‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆI™™YYÜ˜[\\ß_JNÝ˜\ˆ	Z

NÓØš™XÝ™Yš[™T›Ü\JœÙ]\™YYÜ˜[^[œÚ[Ûˆ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ	œÙ]\™YYÜ˜[^[œÚ[ÛŸ_JNÝ˜\ˆÏ[R

NÓØš™XÝ™Yš[™T›Ü\J˜Ü™X]QÛÝ[Z[›ÐÛÛ™\\œÈ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆË˜Ü™X]QÛÝ[Z[›ÐÛÛ™\\œß_JNÓØš™XÝ™Yš[™T›Ü\Jš\Ð[Z[›Ó\ÙÑ\ÜÚ]‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆËš\Ð[Z[›Ó\ÙÑ\ÜÚ]_JNÓØš™XÝ™Yš[™T›Ü\Jš\Ð[Z[›Ó\ÙÔÝX›Z]›ÜÜØ[‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆËš\Ð[Z[›Ó\ÙÔÝX›Z]›ÜÜØ[_JNÓØš™XÝ™Yš[™T›Ü\Jš\Ð[Z[›Ó\ÙÕ›ÝH‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆËš\Ð[Z[›Ó\ÙÕ›Ý__JNÓØš™XÝ™Yš[™T›Ü\Jš\Ð[Z[›Ó\ÙÕ›ÝUÙZYÚY‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆËš\Ð[Z[›Ó\ÙÕ›ÝUÙZYÚY_JNÝ˜\ˆ™ÏX’

NÓØš™XÝ™Yš[™T›Ü\J™ÛÝ•\\È‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ™Ë™ÛÝ•\\ß_JNÓØš™XÝ™Yš[™T›Ü\Jš\Ó\ÙÑ\ÜÚ][˜ÛÙSØš™XÝ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ™Ëš\Ó\ÙÑ\ÜÚ][˜ÛÙSØš™XÝ_JNÓØš™XÝ™Yš[™T›Ü\Jš\Ó\ÙÔÝX›Z]›ÜÜØ[[˜ÛÙSØš™XÝ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ™Ëš\Ó\ÙÔÝX›Z]›ÜÜØ[[˜ÛÙSØš™XÝ_JNÓØš™XÝ™Yš[™T›Ü\Jš\Ó\ÙÕ›ÝQ[˜ÛÙSØš™XÝ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ™Ëš\Ó\ÙÕ›ÝQ[˜ÛÙSØš™XÝ_JNÓØš™XÝ™Yš[™T›Ü\Jš\Ó\ÙÕ›ÝUÙZYÚY[˜ÛÙSØš™XÝ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ™Ëš\Ó\ÙÕ›ÝUÙZYÚY[˜ÛÙSØš™XÝ_JNÝ˜\ˆ	S’

NÓØš™XÝ™Yš[™T›Ü\JœÙ]\ÛÝ‘^[œÚ[Ûˆ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ	œÙ]\ÛÝ‘^[œÚ[ÛŸ_JNÝ˜\ˆ‰]’

NÓØš™XÝ™Yš[™T›Ü\J˜Ü™X]QÜ›Ý\[Z[›ÐÛÛ™\\œÈ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ‰˜Ü™X]QÜ›Ý\[Z[›ÐÛÛ™\\œß_JNÝ˜\ˆISR

NÓØš™XÝ™Yš[™T›Ü\J™Ü›Ý\\\È‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆI™Ü›Ý\\\ß_JNÝ˜\ˆ—ÏR

NÓØš™XÝ™Yš[™T›Ü\J˜Ü™X]RX˜Ð[Z[›ÐÛÛ™\\œÈ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ—Ë˜Ü™X]RX˜Ð[Z[›ÐÛÛ™\\œß_JNÓØš™XÝ™Yš[™T›Ü\Jš\Ð[Z[›Ó\ÙÕ˜[œÙ™\ˆ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ—Ëš\Ð[Z[›Ó\ÙÕ˜[œÙ™\Ÿ_JNÝ˜\ˆNVR

NÓØš™XÝ™Yš[™T›Ü\JšX˜Õ\\È‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆNšX˜Õ\\ß_JNÓØš™XÝ™Yš[™T›Ü\Jš\Ó\ÙÕ˜[œÙ™\‘[˜ÛÙSØš™XÝ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆNš\Ó\ÙÕ˜[œÙ™\‘[˜ÛÙSØš™XÝ_JNÝ˜\ˆ‰YÊ
NÓØš™XÝ™Yš[™T›Ü\JœÙ]\X˜Ñ^[œÚ[Ûˆ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ‰œÙ]\X˜Ñ^[œÚ[ÛŸ_JNÝ˜\ˆIPWÊ
NÓØš™XÝ™Yš[™T›Ü\JœÙ]\Z[^[œÚ[Ûˆ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆIœÙ]\Z[^[œÚ[ÛŸ_JNÝ˜\ˆŽY—Ê
NÓØš™XÝ™Yš[™T›Ü\J˜Ü™X]TÛ\Ú[™Ð[Z[›ÐÛÛ™\\œÈ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆŽ˜Ü™X]TÛ\Ú[™Ð[Z[›ÐÛÛ™\\œß_JNÓØš™XÝ™Yš[™T›Ü\Jš\Ð[Z[›Ó\ÙÕ[š˜Z[‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆŽš\Ð[Z[›Ó\ÙÕ[š˜Z[_JNÝ˜\ˆ	RWÊ
NÓØš™XÝ™Yš[™T›Ü\JœÙ]\Û\Ú[™Ñ^[œÚ[Ûˆ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ	œÙ]\Û\Ú[™Ñ^[œÚ[ÛŸ_JNÝ˜\ˆÙP—Ê
NÓØš™XÝ™Yš[™T›Ü\J˜Ü™X]TÝZÚ[™Ð[Z[›ÐÛÛ™\\œÈ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆÙ‹˜Ü™X]TÝZÚ[™Ð[Z[›ÐÛÛ™\\œß_JNÓØš™XÝ™Yš[™T›Ü\Jš\Ð[Z[›Ó\ÙÐ™YÚ[”™Y[YØ]H‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆÙ‹š\Ð[Z[›Ó\ÙÐ™YÚ[”™Y[YØ]__JNÓØš™XÝ™Yš[™T›Ü\Jš\Ð[Z[›Ó\ÙÐÜ™X]U˜[Y]Üˆ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆÙ‹š\Ð[Z[›Ó\ÙÐÜ™X]U˜[Y]ÜŸ_JNÓØš™XÝ™Yš[™T›Ü\Jš\Ð[Z[›Ó\ÙÑ[YØ]H‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆÙ‹š\Ð[Z[›Ó\ÙÑ[YØ]__JNÓØš™XÝ™Yš[™T›Ü\Jš\Ð[Z[›Ó\ÙÑY]˜[Y]Üˆ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆÙ‹š\Ð[Z[›Ó\ÙÑY]˜[Y]ÜŸ_JNÓØš™XÝ™Yš[™T›Ü\Jš\Ð[Z[›Ó\ÙÕ[™[YØ]H‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆÙ‹š\Ð[Z[›Ó\ÙÕ[™[YØ]__JNÝ˜\ˆÝOUÊ
NÓØš™XÝ™Yš[™T›Ü\Jš\Ó\ÙÐ™YÚ[”™Y[YØ]Q[˜ÛÙSØš™XÝ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆÝKš\Ó\ÙÐ™YÚ[”™Y[YØ]Q[˜ÛÙSØš™XÝ_JNÓØš™XÝ™Yš[™T›Ü\Jš\Ó\ÙÐØ[˜Ù[[˜›Û™[™Ñ[YØ][Û‘[˜ÛÙSØš™XÝ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆÝKš\Ó\ÙÐØ[˜Ù[[˜›Û™[™Ñ[YØ][Û‘[˜ÛÙSØš™XÝ_JNÓØš™XÝ™Yš[™T›Ü\Jš\Ó\ÙÐÜ™X]U˜[Y]Ü‘[˜ÛÙSØš™XÝ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆÝKš\Ó\ÙÐÜ™X]U˜[Y]Ü‘[˜ÛÙSØš™XÝ_JNÓØš™XÝ™Yš[™T›Ü\Jš\Ó\ÙÑ[YØ]Q[˜ÛÙSØš™XÝ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆÝKš\Ó\ÙÑ[YØ]Q[˜ÛÙSØš™XÝ_JNÓØš™XÝ™Yš[™T›Ü\Jš\Ó\ÙÑY]˜[Y]Ü‘[˜ÛÙSØš™XÝ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆÝKš\Ó\ÙÑY]˜[Y]Ü‘[˜ÛÙSØš™XÝ_JNÓØš™XÝ™Yš[™T›Ü\Jš\Ó\ÙÕ[™[YØ]Q[˜ÛÙSØš™XÝ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆÝKš\Ó\ÙÕ[™[YØ]Q[˜ÛÙSØš™XÝ_JNÓØš™XÝ™Yš[™T›Ü\JœÝZÚ[™Õ\\È‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆÝKœÝZÚ[™Õ\\ß_JNÝ˜\ˆÉR—Ê
NÓØš™XÝ™Yš[™T›Ü\JœÙ]\ÝZÚ[™Ñ^[œÚ[Ûˆ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆÉœÙ]\ÝZÚ[™Ñ^[œÚ[ÛŸ_JNÝ˜\ˆÉU×Ê
NÓØš™XÝ™Yš[™T›Ü\JœÙ]\^[œÚ[Ûˆ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆÉœÙ]\^[œÚ[ÛŸ_JNÝ˜\ˆR×Ê
NÓØš™XÝ™Yš[™T›Ü\J˜Ü™X]U™\Ý[™Ð[Z[›ÐÛÛ™\\œÈ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ˜Ü™X]U™\Ý[™Ð[Z[›ÐÛÛ™\\œß_JNÓØš™XÝ™Yš[™T›Ü\Jš\Ð[Z[›Ó\ÙÐÜ™X]U™\Ý[™ÐXØÛÝ[‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆš\Ð[Z[›Ó\ÙÐÜ™X]U™\Ý[™ÐXØÛÝ[_JNÝ˜\ˆ‰VWÊ
NÓØš™XÝ™Yš[™T›Ü\J™\Ý[™Õ\\È‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ‰™\Ý[™Õ\\ß_J_JNÝ˜\ˆÎRJ™ÏOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\J™Ë—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÝ™Ë›XZÙPÛÛ\XÝš]\œ˜^O\ŽÝ™Ë›XZÙS][\ÚYÛ™YZNÝ™Ë›XZÙS][\ÚYÛ™Yž]\Ï^‰Ý˜\ˆÉXØJ
KÉZÛŠ
K	Q™

K“ÏSÜ

KIVÊ
K^OT

NÙ[˜Ý[ÛˆŽ
J^Û]SX]˜ÙZ[
K›[™ÝÎ
KYK›[™ÝSX]™›ÛÜŠK›[™ÝÎ
JŽO[™]ÈZ[\œ˜^JŠNÜ™]\›ˆK™›Ü‘XXÚ

‹ÊOOžÛ]OSX]™›ÛÜŠËÎ
KÏ[ÉNÜ‰‰ŠVØW_LOË\Ê_JK“ËÛÛ\XÝš]\œ˜^K™œ›ÛT\X[
Ù[[\ÎšK^˜Pš]ÔÝÜ™YJ_Y[˜Ý[ÛˆN
K‹KŠ^Û]ÏP\œ˜^K™œ›ÛJ‹šÙ^\Ê
JKOJÉ™œ›ÛP™XÚÌŠJÖÌJKœ™Yš^ÏYK˜[YKœXšÙ^\Ë[™]È\œ˜^JË›[™Ý
K™š[
LJKO[™]È\œ˜^NÙ›ÜŠ]LÐË›[™ÝÐŠÊÊ^Û]ÏJÉœXšÙ^UÐY™\ÜÊJÖÐ—KJKO\‹™Ù]
ÊNÑI‰ŠÐ—OHLKœ\Ú
JJ_[]^ÜX›XÒÙ^NŠ	™[˜ÛÙTXšÙ^JJJK[ÙR[™›ÎžÛ][NžØš]\œ˜^NœŽ

K[ÙR[™›ÜÎK›X\
OŠÜÚ[™ÛNžÛ[ÙN–I”ÚYÛ“[ÙK”ÒQÓ—ÓSÑWÓQÐPÖWÐSRS“×Ò”ÓÓŸ_JJ__KÙ\]Y[˜ÙNšYÒ[
Š_KY^K]][™›Ë™œ›ÛT\X[
ÜÚYÛ™\’[™›ÜÎ–Ù—K™YNžØ[[Ý[–Ë‹‹˜[[Ý[KØ\Ó[Z]šYÒ[
™Ø\Ê__JKY^K]][™›Ë™[˜ÛÙJ
K™š[š\Ú

NÜ™]\›ˆ^K•˜]Ë™œ›ÛT\X[
Ø›ÙPž]\ÎšK]][™›Ðž]\Î›ÚYÛ˜]\™\Î–Ô“Ë“][TÚYÛ˜]\™K™[˜ÛÙJ“Ë“][TÚYÛ˜]\™K™œ›ÛT\X[
ÜÚYÛ˜]\™\Î_JJK™š[š\Ú

W_J_Y[˜Ý[Ûˆ‰
K‹KŠ^Û]ÏZN
K‹KŠNÜ™]\›ˆZ[\œ˜^K™œ›ÛJ^K•˜]Ë™[˜ÛÙJÊK™š[š\Ú

J__JNÝ˜\ˆÏRJ“ÏOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\J“Ë—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNØ“Ëš\ÔÙX\˜Ú]Y\žP\œ˜^OV‰Ù[˜Ý[Ûˆ‰
J^Ü™]\›ˆ\œ˜^Kš\Ð\œ˜^JJ__JNÝ˜\ˆÎRJOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\J‹—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÜ‹œ˜]ÑYMLNTXšÙ^UÔ˜]ÐY™\ÜÏXNÜ‹œ˜]ÔÙXÜMšÌTXšÙ^UÔ˜]ÐY™\ÜÏ\ÎÜ‹œXšÙ^UÔ˜]ÐY™\ÜÏYÜ‹œXšÙ^UÐY™\ÜÏI	Ý˜\ˆ“ÏXšJ
K	ZÛŠ
NÙ[˜Ý[ÛˆN
J^ÚYŠK›[™ÝOOLÌŠ]›ÝÈ™]È\œ›ÜŠ[˜[YYMLNHXšÙ^H[™Ýˆ	ÙK›[™ÝX
NÜ™]\›Š“ËœÚLMŠJJKœÛXÙJŒ
_Y[˜Ý[ÛˆÎ
J^ÚYŠK›[™ÝOOLÌÊ]›ÝÈ™]È\œ›ÜŠ[˜[YÙXÜMšÌHXšÙ^H[™Ý
ÛÛ\™\ÜÙY
Nˆ	ÙK›[™ÝX
NÜ™]\›Š“Ëœš\[YMŒ
J
“ËœÚLMŠJJJ_Y[˜Ý[Ûˆ
KŠ^ÜÝÚ]Ú
J^ØØ\ÙH™YMLNHŽœ™]\›ˆN
ŠNØØ\ÙHœÙXÜMšÌHŽœ™]\›ˆÎ
ŠNÙY˜][›ÝÈ™]È\œ›ÜŠXšÙ^H\H	Ù_H›ÝÝ\ÜY
__Y[˜Ý[Ûˆ		
KŠ^Ü™]\›Š	Ò^
J
KŠJKÕ\\Ø\ÙJ
__JNÝ˜\ˆNRJ“ÏOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\J“Ë—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÝ“Ë›XZÙRœÛÛ”œÒYYZŽÝ˜\ˆ‰LYMÙ[˜Ý[ÛˆZŠ
^Ü™]\›ˆ‰
ÏL__JNÝ˜\ˆNRJÓÏOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\JÓË—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÓÓË™Y˜][[šŽÙ[˜Ý[ÛˆšŠJ^Ý˜\ˆ‹YK”Þ[X›ÛÚYŠ\[ÙˆOH™[˜Ý[ÛˆŠZYŠ›ØœÙ\˜X›J[]›ØœÙ\˜X›NÙ[Ù^Û]™›ÜŠšÎ‹ËÙÚ]X‹˜ÛÛKØ™[›\ÚÜÞ[X›Û[ØœÙ\˜X›HŠNÝž^Ý›ØœÙ\˜X›O[ŸXØ]Úß_Y[ÙHHØœÙ\˜X›HŽÜ™]\›ˆŸ_JNÝ˜\ˆRJ
˜ÙKŽ
OOžÙŽ™^ÜÏPN

_JNÝ˜\ˆÏRJ
ØÙK
OOžÈ\ÙHÝšXÝŽÝ˜\ˆÎSØš™XÝœ›ÝÝ\KÔÝš[™ÎÜ™^ÜÏY[˜Ý[ÛŠŠ^Ý˜\ˆYÎ˜Ø[
ŠKO]OOH–ÛØš™XÝ\™Ý[Y[×HŽÜ™]\›ˆ_
O]OOH–ÛØš™XÝ\œ˜^WH‰‰›ˆOO[[	‰\[ÙˆOH›Øš™XÝ‰‰\[Ùˆ‹›[™ÝOH›[X™\ˆ‰‰›‹›[™ÝL	‰™Î˜Ø[
‹˜Ø[YJOOOH–ÛØš™XÝ[˜Ý[Û—HŠK__JNÝ˜\ˆNRJ
ÙKÎ
OOžÈ\ÙHÝšXÝŽÝ˜\ˆÎÓØš™XÝšÙ^\ß
ÙÏSØš™XÝœ›ÝÝ\Kš\ÓÝÛ”›Ü\KSÏSØš™XÝœ›ÝÝ\KÔÝš[™ËNQÊ
KÏSØš™XÝœ›ÝÝ\Kœ›Ü\R\Ñ[[Y\˜X›KHUË˜Ø[
ÝÔÝš[™Î›[KÔÝš[™ÈŠKNUË˜Ø[
[˜Ý[ÛŠ
^ßKœ›ÝÝ\HŠKÏVÈÔÝš[™È‹ÓØØ[TÝš[™È‹˜[YSÙˆ‹š\ÓÝÛ”›Ü\H‹š\Ô›ÝÝ\SÙˆ‹œ›Ü\R\Ñ[[Y\˜X›H‹˜ÛÛœÝXÝÜˆ—KžOY[˜Ý[ÛŠJ^Ý˜\ˆYK˜ÛÛœÝXÝÜŽÜ™]\›ˆ‰‰›‹œ›ÝÝ\OOOY_KŽ^É\XØ][ÛØXÚNˆL	ÛÛœÛÛNˆL	^\›˜[ˆL	œ˜[YNˆL	œ˜[YQ[[Y[ˆL	œ˜[Y\ÎˆL	[›™\’ZYÚˆL	[›™\•ÚYˆL	Û›[Þ™[ØÜ™Y[˜Ú[™ÙNˆL	Û›[Þ™[ØÜ™Y[™\œ›ÜŽˆL	Ý]\’ZYÚˆL	Ý]\•ÚYˆL	YÙVÙ™œÙ]ˆL	YÙVSÙ™œÙ]ˆL	\™[ˆL	ØÜ›ÛYˆL	ØÜ›ÛÜˆL	ØÜ›ÛˆL	ØÜ›ÛNˆL	Ù[ŽˆL	ÙXšÚ][™^YŽˆL	ÙXšÚ]ÝÜ˜YÙR[™›ÎˆL	Ú[™ÝÎˆLKNJ[˜Ý[ÛŠ
^ÚYŠ\[ÙˆÚ[™ÝÏˆHŠ\™]\›ˆLNÙ›ÜŠ˜\ˆH[ˆÚ[™ÝÊ]ž^ÚYŠPŽÈ‰ŠÙWI‰“ÙË˜Ø[
Ú[™ÝËJI‰Ú[™ÝÖÙWHOO[[	‰\[ÙˆÚ[™ÝÖÙWOOH›Øš™XÝŠ]ž^ÛžJÚ[™ÝÖÙWJ_XØ]ÚÜ™]\›ˆL_XØ]ÚÜ™]\›ˆL\™]\›ˆL_JJ
KÎY[˜Ý[ÛŠJ^ÚYŠ\[ÙˆÚ[™ÝÏˆHŸ[N
\™]\›ˆžJJNÝž^Ü™]\›ˆžJJ_XØ]ÚÜ™]\›ˆL__KÎY[˜Ý[ÛŠŠ^Ý˜\ˆ[ˆOO[[	‰\[ÙˆOH›Øš™XÝ‹OUSË˜Ø[
ŠOOOH–ÛØš™XÝ[˜Ý[Û—H‹RN
ŠKÏ]	‰•SË˜Ø[
ŠOOOH–ÛØš™XÝÝš[™×H‹OV×NÚYŠ]	‰ˆZI‰ˆ\Š]›ÝÈ™]È\Q\œ›ÜŠ“Øš™XÝšÙ^\ÈØ[YÛˆH›Û‹[Øš™XÝŠNÝ˜\ˆÏ^N	‰šNÚYŠÉ‰›‹›[™ÝŒ	‰ˆSÙË˜Ø[
‹
JY›ÜŠ˜\ˆLÙ‹›[™ÝÊÊÙ
XKœ\Ú
Ýš[™Ê
JNÚYŠ‰‰›‹›[™ÝŒ
Y›ÜŠ˜\ˆOLÝO‹›[™ÝÊÊÝJXKœ\Ú
Ýš[™ÊJJNÙ[ÙH›ÜŠ˜\ˆˆ[ˆŠHJÉ‰™OOHœ›ÝÝ\HŠI‰“ÙË˜Ø[
‹ŠI‰˜Kœ\Ú
Ýš[™ÊŠJNÚYŠ
Y›ÜŠ˜\ˆPÎ
ŠKLÛË›[™ÝÊÊÛ
HJ	‰‘ÖÛOOOH˜ÛÛœÝXÝÜˆŠI‰“ÙË˜Ø[
‹ÖÛJI‰˜Kœ\Ú
ÖÛJNÜ™]\›ˆ_JNÝ˜\ˆÙËSËNËNËžKŽNÎÚÎ™^ÜÏTÎJNÝ˜\ˆŽRJ
XÙKŽ
OOžÈ\ÙHÝšXÝŽÝ˜\ˆP\œ˜^Kœ›ÝÝ\KœÛXÙKšQÊ
KNSØš™XÝšÙ^\ËOTNÙ[˜Ý[ÛŠŠ^Ü™]\›ˆN
Š_N‘N

KÎSØš™XÝšÙ^\ÎÝKœÚ[OY[˜Ý[ÛŠ
^ÚYŠØš™XÝšÙ^\Ê^Ý˜\ˆJ[˜Ý[ÛŠ
^Ý˜\ˆSØš™XÝšÙ^\Ê\™Ý[Y[ÊNÜ™]\›ˆ	‰›[™ÝOOX\™Ý[Y[Ë›[™ÝJJKŠNÛŸ
Øš™XÝšÙ^\ÏY[˜Ý[ÛŠJ^Ü™]\›ˆšŠJOÝÎ
‹˜Ø[
JJNÎ
J_J_Y[ÙHØš™XÝšÙ^\Ï]NÜ™]\›ˆØš™XÝšÙ^\ß_NÔŽ™^ÜÏ]_JNÝ˜\ˆÏRJ
ÙK
OOžÈ\ÙHÝšXÝŽÝ˜\ˆžOSØš™XÝ™Yš[™T›Ü\_LNÚYŠžJ]ž^ÜžJßK˜H‹Ý˜[YNŒ_J_XØ]ÚÜžOHL_T™^ÜÏ\ž_JNÝ˜\ˆŽRJ
ÙKŽ
OOžÈ\ÙHÝšXÝŽÓŽ™^ÜÏTÞ[^\œ›ÜŸJNÝ˜\ˆRJ
˜ÙKÎ
OOžÈ\ÙHÝšXÝŽÓÎ™^ÜÏU\Q\œ›ÜŸJNÝ˜\ˆRJ
XÙKN
OOžÈ\ÙHÝšXÝŽÕN™^ÜÏSØš™XÝ™Ù]ÝÛ”›Ü\Q\ØÜš\ÜŸJNÝ˜\ˆ“ÏRJ
˜ÙK
OOžÈ\ÙHÝšXÝŽÝ˜\ˆ^OU

NÚYŠ^J]ž^Ú^J×K›[™ÝŠ_XØ]ÚÚ^O[[^™^ÜÏZ^_JNÝ˜\ˆNRJ
XÙKŽ
OOžÈ\ÙHÝšXÝŽÝ˜\ˆŽ^Ê
KZ]Ž

KYQ

KNR“Ê
NÑŽ™^ÜÏY[˜Ý[ÛŠ‹J^ÚYŠ[Ÿ\[ÙˆˆOH›Øš™XÝ‰‰\[ÙˆˆOH™[˜Ý[ÛˆŠ]›ÝÈ™]ÈYŠ˜Øš˜]\Ý™H[ˆØš™XÝÜˆH[˜Ý[Û˜ŠNÚYŠ\[ÙˆOHœÝš[™È‰‰\[ÙˆOHœÞ[X›ÛŠ]›ÝÈ™]ÈYŠ˜›Ü\X]\Ý™HHÝš[™ÈÜˆHÞ[X›ÛŠNÚYŠ\™Ý[Y[Ë›[™ÝŒÉ‰\[Ùˆ\™Ý[Y[ÖÌ×HOH˜›ÛÛX[ˆ‰‰˜\™Ý[Y[ÖÌ×HOO[[
]›ÝÈ™]ÈYŠ˜›Û‘[[Y\˜X›XYˆ›ÝšYY]\Ý™HH›ÛÛX[ˆÜˆ[ŠNÚYŠ\™Ý[Y[Ë›[™Ý	‰\[Ùˆ\™Ý[Y[ÖÍHOH˜›ÛÛX[ˆ‰‰˜\™Ý[Y[ÖÍHOO[[
]›ÝÈ™]ÈYŠ˜›Û•Üš]X›XYˆ›ÝšYY]\Ý™HH›ÛÛX[ˆÜˆ[ŠNÚYŠ\™Ý[Y[Ë›[™ÝI‰\[Ùˆ\™Ý[Y[ÖÍWHOH˜›ÛÛX[ˆ‰‰˜\™Ý[Y[ÖÍWHOO[[
]›ÝÈ™]ÈYŠ˜›ÛÛÛ™šYÝ\˜X›XYˆ›ÝšYY]\Ý™HH›ÛÛX[ˆÜˆ[ŠNÚYŠ\™Ý[Y[Ë›[™Ý‰‰\[Ùˆ\™Ý[Y[ÖÍ—HOH˜›ÛÛX[ˆŠ]›ÝÈ™]ÈYŠ˜ÛÜÙXYˆ›ÝšYY]\Ý™HH›ÛÛX[ˆŠNÝ˜\ˆX\™Ý[Y[Ë›[™ÝŒÏØ\™Ý[Y[ÖÌ×N›[ÏX\™Ý[Y[Ë›[™ÝØ\™Ý[Y[ÖÍN›[OX\™Ý[Y[Ë›[™ÝOØ\™Ý[Y[ÖÍWN›[ÏX\™Ý[Y[Ë›[™ÝØ\™Ý[Y[ÖÍ—NˆLKHH\N	‰œN
‹
NÚYŠŽ
RŽ
‹ØÛÛ™šYÝ\˜X›N˜OOO[[	‰™Ù˜ÛÛ™šYÝ\˜X›NˆXK[[Y\˜X›NœOO[[	‰™Ù™[[Y\˜X›Nˆ\‹˜[YNšKÜš]X›N›ÏOO[[	‰™ÙÜš]X›Nˆ[ßJNÙ[ÙHYŠß\‰‰ˆ[É‰ˆXJ[–ÝOZNÙ[ÙH›ÝÈ™]ÈZŠ•\È[š\›Û›Y[Ù\È›ÝÝ\ÜYš[š[™ÈH›Ü\H\È›Û‹XÛÛ™šYÝ\˜X›K›Û‹]Üš]X›KÜˆ›Û‹Y[[Y\˜X›KˆŠ__JNÝ˜\ˆÎRJ
ÙKÎ
OOžÈ\ÙHÝšXÝŽÝ˜\ˆSÏ^Ê
KY[˜Ý[ÛŠ
^Ü™]\›ˆH\SßNÒš\Ð\œ˜^S[™ÝYš[™PYÏY[˜Ý[ÛŠ
^ÚYŠ\SÊ\™]\›ˆ[Ýž^Ü™]\›ˆSÊ×K›[™Ý‹Ý˜[YNŒ_JK›[™ÝOOL_XØ]ÚÜ™]\›ˆL_N×Î™^ÜÏRJNÝ˜\ˆ“ÏRJ
ØÙK
OOžÈ\ÙHÝšXÝŽÝ˜\ˆÚXŽ

KZ]\[ÙˆÞ[X›ÛOH™[˜Ý[Ûˆ‰‰\[ÙˆÞ[X›Û
™›ÛÈŠOOHœÞ[X›Û‹ÚSØš™XÝœ›ÝÝ\KÔÝš[™ËP\œ˜^Kœ›ÝÝ\K˜ÛÛ˜Ø]ŽSN

KÚY[˜Ý[ÛŠJ^Ü™]\›ˆ\[ÙˆOOH™[˜Ý[Ûˆ‰‰œÚ‹˜Ø[
JOOOH–ÛØš™XÝ[˜Ý[Û—HŸKÎQÎ

J
KZY[˜Ý[ÛŠK‹J^ÚYŠˆ[ˆJ^ÚYŠOOOHL
^ÚYŠVÛ—OOO]
\™]\›ŸY[ÙHYŠXÚŠJ_ZJ
J\™]\›ŸUÎÕŽ
K‹L
N•Ž
K‹
_KÎY[˜Ý[ÛŠKŠ^Ý˜\ˆX\™Ý[Y[Ë›[™ÝŒØ\™Ý[Y[ÖÌ—NžßKO[ÚŠŠNØZ‰‰ŠOY‹˜Ø[
KØš™XÝ™Ù]ÝÛ”›Ü\TÞ[X›ÛÊŠJJNÙ›ÜŠ˜\ˆLÜK›[™ÝÜŠÏLJ]ZŠKVÜ—K–ÚVÜ—WKÚVÜ—WJ_NÒÎœÝ\ÜÑ\ØÜš\ÜœÏHHUÎÓ™^ÜÏRÎJNÝ˜\ˆSÏRJ
ØÙKÞJOOžÈ\ÙHÝšXÝŽÝ\[ÙˆÙ[HÛÞK™^ÜÏ\Ù[Ž\[ÙˆÚ[™ÝÏHÛÞK™^ÜÏ]Ú[™ÝÎ›ÞK™^ÜÏQ[˜Ý[ÛŠœ™]\›ˆ\ÈŠJ
_JNÝ˜\ˆÏRJ
˜ÙKN
OOžÈ\ÙHÝšXÝŽÝ˜\ˆZSSÊ
NÖN™^ÜÏY[˜Ý[ÛŠ
^Ü™]\›ˆ\[ÙˆÛØ˜[OH›Øš™XÝŸYÛØ˜[ÛØ˜[“X]OOSX]ÛØ˜[\œ˜^HOOP\œ˜^OÐZŽ™ÛØ˜[_JNÝ˜\ˆŽRJ
ØÙKŽ
OOžÈ\ÙHÝšXÝŽÝ˜\ˆšQ“Ê
KR“Ê
KÚRÊ
NÞŽ™^ÜÏY[˜Ý[ÛŠ
^Ý˜\ˆYÚŠ
NÚYŠš‹œÝ\ÜÑ\ØÜš\ÜœÊ^Ý˜\ˆ[Š‹™ÛØ˜[\ÈŠNÊ]˜ÛÛ™šYÝ\˜X›I‰Š™[[Y\˜X›_]Üš]X›_ÛØ˜[\ÈOO[ŠJI‰“Øš™XÝ™Yš[™T›Ü\J‹™ÛØ˜[\È‹ØÛÛ™šYÝ\˜X›NˆL[[Y\˜X›NˆLK˜[YN›‹Üš]X›NˆLJ_Y[ÙJ\[ÙˆÛØ˜[\ÈOH›Øš™XÝŸÛØ˜[\ÈOO[ŠI‰Š‹™ÛØ˜[\Ï[ŠNÜ™]\›ˆŸ_JNÝ˜\ˆQÏRJ
ØÙKŽ
OOžÈ\ÙHÝšXÝŽÝ˜\ˆQ“Ê
KZSSÊ
KRÊ
KVŽ

KZV

K	Y[˜Ý[ÛŠ
^Ü™]\›ˆZŸNÜŠ	ÙÙ]ÛYš[–[\[Y[][ÛŽ’Z‹Ú[NšŸJNÚŽ™^ÜÏIJNÝ˜\ˆXÏRJXOOžÈ\ÙHÝšXÝŽÝ˜\ˆšPXI‰XK—×Ù^[™ß
[˜Ý[ÛŠ
^Ý˜\ˆOY[˜Ý[ÛŠ‹
^Ü™]\›ˆOSØš™XÝœÙ]›ÝÝ\SÙŸ××Ü›Ý××Î–×_Z[œÝ[˜Ù[Ùˆ\œ˜^I‰™[˜Ý[ÛŠKŠ^ÚK—×Ü›Ý××Ï\Ÿ_[˜Ý[ÛŠKŠ^Ù›ÜŠ˜\ˆÈ[ˆŠ\‹š\ÓÝÛ”›Ü\JÊI‰ŠVÛ×O\–Û×J_KJ‹
_NÜ™]\›ˆ[˜Ý[ÛŠ‹
^ÙJ‹
NÙ[˜Ý[ÛˆJ
^Ý\Ë˜ÛÛœÝXÝÜ[Ÿ[‹œ›ÝÝ\O]OO[[ÓØš™XÝ˜Ü™X]J
NŠKœ›ÝÝ\O]œ›ÝÝ\K™]ÈJ__JJ
NÓØš™XÝ™Yš[™T›Ü\JXK—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÐXK““×ÒSPXK““ÏPXK“Y[[ÜžTÝ™X[OPXK”Ý™X[O]›ÚYÝ˜\ˆZ[

KÚYQÊ
K^O[Z‹™Y˜][
Ú‹™Ù]ÛYš[

JK^ßNÐXK““ÏZŽÙ[˜Ý[ÛˆÛÊ
^ßY[˜Ý[ÛˆÞJJ^Ù›ÜŠ˜\ˆYK›[™ÝP\œ˜^JŠKOLÚOŽÊÊÚJ]ÚWOYVÚWNÜ™]\›ˆY[˜Ý[ÛˆÚŠKŠ^Ü™]\›ˆ[˜Ý[ÛŠJ^Ü™]\›ˆJJI‰›ŠJ__Y[˜Ý[ÛˆÓÊK‹
^Ýž^Ü™]\›ˆK™ŠŠ_XØ]Ú
J^Ü™]\›ˆ—ÙJJKŸ_]˜\ˆÝO^×ÛŽœÛËÙNœÛËØÎœÛßNÐXK““×ÒSZÝNÙ[˜Ý[Ûˆ‘ÊJ^ÙK—ÜÝ\Y[˜Ý[ÛŠ
^Ý›™^]—Û‹™\œ›Ü]—ÙK˜ÛÛ\]O]—ØË\ËœÝ\

_KK—ÜÝÜYKœÝÜ]˜\ˆÚJ[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ‹
^Ý\Ë—ÜÝ™X[O[‹\Ë—Û\Ý[™\]\™]\›ˆKœ›ÝÝ\K[œÝXœØÜšX™OY[˜Ý[ÛŠ
^Ý\Ë—ÜÝ™X[K—Ü™[[Ý™J\Ë—Û\Ý[™\Š_K_JJ
KZJ[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJŠ^Ý\Ë—Û\Ý[™\[Ÿ\™]\›ˆKœ›ÝÝ\K›™^Y[˜Ý[ÛŠŠ^Ý\Ë—Û\Ý[™\‹—ÛŠŠ_KKœ›ÝÝ\K™\œ›ÜY[˜Ý[ÛŠŠ^Ý\Ë—Û\Ý[™\‹—ÙJŠ_KKœ›ÝÝ\K˜ÛÛ\]OY[˜Ý[ÛŠ
^Ý\Ë—Û\Ý[™\‹—ØÊ
_K_JJ
KZJ[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJŠ^Ý\Ë\OH™œ›ÛSØœÙ\˜X›H‹\Ëš[œÏ[‹\Ë˜XÝ]™OHL_\™]\›ˆKœ›ÝÝ\K—ÜÝ\Y[˜Ý[ÛŠŠ^Ý\Ë›Ý][‹\Ë˜XÝ]™OHL\Ë—ÜÝX]\Ëš[œËœÝXœØÜšX™J™]ÈZŠŠJK\Ë˜XÝ]™_\Ë—ÜÝX‹[œÝXœØÜšX™J
_KKœ›ÝÝ\K—ÜÝÜY[˜Ý[ÛŠ
^Ý\Ë—ÜÝX‰‰\Ë—ÜÝX‹[œÝXœØÜšX™J
K\Ë˜XÝ]™OHL_K_JJ
KÚJ[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJŠ^Ý\Ë\OH›Y\™ÙH‹\Ëš[œÐ\œ[‹\Ë›Ý]Z‹\Ë˜XÏL\™]\›ˆKœ›ÝÝ\K—ÜÝ\Y[˜Ý[ÛŠŠ^Ý\Ë›Ý][ŽÝ˜\ˆ]\Ëš[œÐ\œ‹O]›[™ÝÝ\Ë˜XÏZNÙ›ÜŠ˜\ˆLÜNÜŠÊÊ]Ü—K—ØY
\Ê_KKœ›ÝÝ\K—ÜÝÜY[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆ]\Ëš[œÐ\œ‹[‹›[™ÝOLÚOÚJÊÊ[–ÚWK—Ü™[[Ý™J\ÊNÝ\Ë›Ý]ZŸKKœ›ÝÝ\K—ÛY[˜Ý[ÛŠŠ^Ý˜\ˆ]\Ë›Ý]ÝOOZ‰‰—ÛŠŠ_KKœ›ÝÝ\K—ÙOY[˜Ý[ÛŠŠ^Ý˜\ˆ]\Ë›Ý]ÝOOZ‰‰—ÙJŠ_KKœ›ÝÝ\K—ØÏY[˜Ý[ÛŠ
^ÚYŠK]\Ë˜XÏL
^Ý˜\ˆ]\Ë›Ý]ÚYŠOOZŠ\™]\›ŽÛ‹—ØÊ
__K_JJ
KšJ[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ‹J^Ý\ËšO[‹\Ë›Ý]]\ËœZKKš[Ëœ\Ú
\Ê_\™]\›ˆKœ›ÝÝ\K—ÛY[˜Ý[ÛŠŠ^Ý˜\ˆ]\ËœO]\Ë›Ý]ÚYŠHOOZ‰‰\
‹\ËšJJ^Ý˜\ˆ\ÞJ˜[ÊNÚK—ÛŠŠ__KKœ›ÝÝ\K—ÙOY[˜Ý[ÛŠŠ^Ý˜\ˆ]\Ë›Ý]ÝOOZ‰‰—ÙJŠ_KKœ›ÝÝ\K—ØÏY[˜Ý[ÛŠ
^Ý˜\ˆ]\ËœÛ‹›Ý]OOZ‰‰‹K[‹“˜ÏOOL	‰›‹›Ý]—ØÊ
_K_JJ
KšJ[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJŠ^Ý\Ë\OH˜ÛÛXš[™H‹\Ëš[œÐ\œ[‹\Ë›Ý]Z‹\Ëš[ÏV×K\Ë“˜Ï]\Ë“›L\Ë˜[ÏV×_\™]\›ˆKœ›ÝÝ\K\Y[˜Ý[ÛŠ‹
^Ý˜\ˆO]\Ë˜[ÖÝK]\Ë“›ÚOOOZËK]\Ë“›Ž\Ë“›ŽŒÜ™]\›ˆ\Ë˜[ÖÝO[‹OOLKKœ›ÝÝ\K—ÜÝ\Y[˜Ý[ÛŠŠ^Ý\Ë›Ý][ŽÝ˜\ˆ]\Ëš[œÐ\œ‹O]\Ë“˜Ï]\Ë“›]›[™Ý]\Ë˜[Ï[™]È\œ˜^JJNÚYŠOOOL
[‹—ÛŠ×JK‹—ØÊ
NÙ[ÙH›ÜŠ˜\ˆÏLÛÏNÛÊÊÊ\–Û×OZ‹Û×K—ØY
™]ÈšŠË‹\ÊJ_KKœ›ÝÝ\K—ÜÝÜY[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆ]\Ëš[œÐ\œ‹[‹›[™ÝO]\Ëš[ËLÜÜŠÊÊ[–Ü—K—Ü™[[Ý™JVÜ—JNÝ\Ë›Ý]Z‹\Ëš[ÏV×K\Ë˜[ÏV×_K_JJ
KJ[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJŠ^Ý\Ë\OH™œ›ÛP\œ˜^H‹\Ë˜O[Ÿ\™]\›ˆKœ›ÝÝ\K—ÜÝ\Y[˜Ý[ÛŠŠ^Ù›ÜŠ˜\ˆ]\Ë˜KOL]›[™ÝÚOŽÚJÊÊ[‹—ÛŠÚWJNÛ‹—ØÊ
_KKœ›ÝÝ\K—ÜÝÜY[˜Ý[ÛŠ
^ßK_JJ
KšJ[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJŠ^Ý\Ë\OH™œ›ÛT›ÛZ\ÙH‹\Ë›ÛHLK\Ëœ[Ÿ\™]\›ˆKœ›ÝÝ\K—ÜÝ\Y[˜Ý[ÛŠŠ^Ý˜\ˆ]\ÎÝ\Ë›ÛHL\Ëœ[Š[˜Ý[ÛŠJ^Ý›Û‰‰Š‹—ÛŠJK‹—ØÊ
J_K[˜Ý[ÛŠJ^Û‹—ÙJJ_JK[ŠÛË[˜Ý[ÛŠJ^ÜÙ][Y[Ý]
[˜Ý[ÛŠ
^Ý›ÝÈ_J_J_KKœ›ÝÝ\K—ÜÝÜY[˜Ý[ÛŠ
^Ý\Ë›ÛHL_K_JJ
KšJ[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJŠ^Ý\Ë\OHœ\š[ÙXÈ‹\Ëœ\š[Ù[‹\Ëš[\˜[QKLK\ËšOL\™]\›ˆKœ›ÝÝ\K—ÜÝ\Y[˜Ý[ÛŠŠ^Ý˜\ˆ]\ÎÙ[˜Ý[ÛˆJ
^Û‹—ÛŠšJÊÊ_]\Ëš[\˜[Q\Ù][\˜[
K\Ëœ\š[Ù
_KKœ›ÝÝ\K—ÜÝÜY[˜Ý[ÛŠ
^Ý\Ëš[\˜[QOOKLI‰˜ÛX\’[\˜[
\Ëš[\˜[Q
K\Ëš[\˜[QKLK\ËšOLK_JJ
KÚJ[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ‹
^Ý\Ë\OH™XYÈ‹\Ëš[œÏ[‹\Ë›Ý]Z‹\ËœÏ\ÛË\Ë›Hˆ‹\[ÙˆOHœÝš[™ÈÝ\Ë›]\[ÙˆOH™[˜Ý[Ûˆ‰‰Š\ËœÏ]
_\™]\›ˆKœ›ÝÝ\K—ÜÝ\Y[˜Ý[ÛŠŠ^Ý\Ë›Ý][‹\Ëš[œË—ØY
\Ê_KKœ›ÝÝ\K—ÜÝÜY[˜Ý[ÛŠ
^Ý\Ëš[œË—Ü™[[Ý™J\ÊK\Ë›Ý]ZŸKKœ›ÝÝ\K—ÛY[˜Ý[ÛŠŠ^Ý˜\ˆ]\Ë›Ý]ÚYŠOOZŠ^Ý˜\ˆO]\ËœË]\Ë›ÚYŠHOO\ÛÊ]ž^ÚJŠ_XØ]Ú
Ê^Ý—ÙJÊ_Y[ÙHØÛÛœÛÛK›ÙÊŠÈŽˆ‹ŠN˜ÛÛœÛÛK›ÙÊŠNÝ—ÛŠŠ__KKœ›ÝÝ\K—ÙOY[˜Ý[ÛŠŠ^Ý˜\ˆ]\Ë›Ý]ÝOOZ‰‰—ÙJŠ_KKœ›ÝÝ\K—ØÏY[˜Ý[ÛŠ
^Ý˜\ˆ]\Ë›Ý]ÛˆOOZ‰‰›‹—ØÊ
_K_JJ
KJ[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ‹
^Ý\Ë\OH™›Ü‹\Ëš[œÏ]\Ë›Ý]Z‹\Ë›X^[‹\Ë™›ÜYL\™]\›ˆKœ›ÝÝ\K—ÜÝ\Y[˜Ý[ÛŠŠ^Ý\Ë›Ý][‹\Ë™›ÜYL\Ëš[œË—ØY
\Ê_KKœ›ÝÝ\K—ÜÝÜY[˜Ý[ÛŠ
^Ý\Ëš[œË—Ü™[[Ý™J\ÊK\Ë›Ý]ZŸKKœ›ÝÝ\K—ÛY[˜Ý[ÛŠŠ^Ý˜\ˆ]\Ë›Ý]ÝOOZ‰‰\Ë™›ÜY
ÊÏ]\Ë›X^	‰—ÛŠŠ_KKœ›ÝÝ\K—ÙOY[˜Ý[ÛŠŠ^Ý˜\ˆ]\Ë›Ý]ÝOOZ‰‰—ÙJŠ_KKœ›ÝÝ\K—ØÏY[˜Ý[ÛŠ
^Ý˜\ˆ]\Ë›Ý]ÛˆOOZ‰‰›‹—ØÊ
_K_JJ
KZJ[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ‹
^Ý\Ë›Ý][‹\Ë›Ü]\™]\›ˆKœ›ÝÝ\K—ÛY[˜Ý[ÛŠ
^Ý\Ë›Ü™[™

_KKœ›ÝÝ\K—ÙOY[˜Ý[ÛŠŠ^Ý\Ë›Ý]—ÙJŠ_KKœ›ÝÝ\K—ØÏY[˜Ý[ÛŠ
^Ý\Ë›Ü™[™

_K_JJ
KJ[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ‹
^Ý\Ë\OH™[™Ú[ˆ‹\Ëš[œÏ]\Ë›Ý]Z‹\Ë›Ï[‹\Ë›Ú[ZÝ_\™]\›ˆKœ›ÝÝ\K—ÜÝ\Y[˜Ý[ÛŠŠ^Ý\Ë›Ý][‹\Ë›Ë—ØY
\Ë›Ú[[™]ÈZŠ‹\ÊJK\Ëš[œË—ØY
\Ê_KKœ›ÝÝ\K—ÜÝÜY[˜Ý[ÛŠ
^Ý\Ëš[œË—Ü™[[Ý™J\ÊK\Ë›Ë—Ü™[[Ý™J\Ë›Ú[
K\Ë›Ý]Z‹\Ë›Ú[ZÝ_KKœ›ÝÝ\K™[™Y[˜Ý[ÛŠ
^Ý˜\ˆ]\Ë›Ý]ÛˆOOZ‰‰›‹—ØÊ
_KKœ›ÝÝ\K—ÛY[˜Ý[ÛŠŠ^Ý˜\ˆ]\Ë›Ý]ÝOOZ‰‰—ÛŠŠ_KKœ›ÝÝ\K—ÙOY[˜Ý[ÛŠŠ^Ý˜\ˆ]\Ë›Ý]ÝOOZ‰‰—ÙJŠ_KKœ›ÝÝ\K—ØÏY[˜Ý[ÛŠ
^Ý\Ë™[™

_K_JJ
KÓÏJ[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ‹
^Ý\Ë\OH™š[\ˆ‹\Ëš[œÏ]\Ë›Ý]Z‹\Ë™[Ÿ\™]\›ˆKœ›ÝÝ\K—ÜÝ\Y[˜Ý[ÛŠŠ^Ý\Ë›Ý][‹\Ëš[œË—ØY
\Ê_KKœ›ÝÝ\K—ÜÝÜY[˜Ý[ÛŠ
^Ý\Ëš[œË—Ü™[[Ý™J\ÊK\Ë›Ý]ZŸKKœ›ÝÝ\K—ÛY[˜Ý[ÛŠŠ^Ý˜\ˆ]\Ë›Ý]ÚYŠOOZŠ^Ý˜\ˆOQÓÊ\Ë‹
NÚOOOZŸZ_—ÛŠŠ__KKœ›ÝÝ\K—ÙOY[˜Ý[ÛŠŠ^Ý˜\ˆ]\Ë›Ý]ÝOOZ‰‰—ÙJŠ_KKœ›ÝÝ\K—ØÏY[˜Ý[ÛŠ
^Ý˜\ˆ]\Ë›Ý]ÛˆOOZ‰‰›‹—ØÊ
_K_JJ
KJ[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ‹
^Ý\Ë›Ý][‹\Ë›Ü]\™]\›ˆKœ›ÝÝ\K—ÛY[˜Ý[ÛŠŠ^Ý\Ë›Ý]—ÛŠŠ_KKœ›ÝÝ\K—ÙOY[˜Ý[ÛŠŠ^Ý\Ë›Ý]—ÙJŠ_KKœ›ÝÝ\K—ØÏY[˜Ý[ÛŠ
^Ý\Ë›Üš[›™\Z‹\Ë›Ü›\ÜÊ
_K_JJ
KšJ[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJŠ^Ý\Ë\OH™›][ˆ‹\Ëš[œÏ[‹\Ë›Ý]Z‹\Ë›Ü[HL\Ëš[›™\Z‹\Ëš[ZÝ_\™]\›ˆKœ›ÝÝ\K—ÜÝ\Y[˜Ý[ÛŠŠ^Ý\Ë›Ý][‹\Ë›Ü[HL\Ëš[›™\Z‹\Ëš[ZÝK\Ëš[œË—ØY
\Ê_KKœ›ÝÝ\K—ÜÝÜY[˜Ý[ÛŠ
^Ý\Ëš[œË—Ü™[[Ý™J\ÊK\Ëš[›™\ˆOOZ‰‰\Ëš[›™\‹—Ü™[[Ý™J\Ëš[
K\Ë›Ý]Z‹\Ë›Ü[HL\Ëš[›™\Z‹\Ëš[ZÝ_KKœ›ÝÝ\K›\ÜÏY[˜Ý[ÛŠ
^Ý˜\ˆ]\Ë›Ý]ÛˆOOZ‰‰ˆ]\Ë›Ü[‰‰\Ëš[›™\OOZ‰‰›‹—ØÊ
_KKœ›ÝÝ\K—ÛY[˜Ý[ÛŠŠ^Ý˜\ˆ]\Ë›Ý]ÚYŠOOZŠ^Ý˜\ˆO]\ËZKš[›™\‹ÏZKš[ÜˆOOZ‰‰›ÈOOZÝI‰œ‹—Ü™[[Ý™JÊK
\Ëš[›™\[ŠK—ØY
\Ëš[[™]ÈŠ\ÊJ__KKœ›ÝÝ\K—ÙOY[˜Ý[ÛŠŠ^Ý˜\ˆ]\Ë›Ý]ÝOOZ‰‰—ÙJŠ_KKœ›ÝÝ\K—ØÏY[˜Ý[ÛŠ
^Ý\Ë›Ü[HLK\Ë›\ÜÊ
_K_JJ
KZJ[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ‹J^Ý˜\ˆ]\ÎÝ\Ë\OH™›Û‹\Ëš[œÏZK\Ë›Ý]Z‹\Ë™Y[˜Ý[ÛŠÊ^Ü™]\›ˆŠ‹˜XØËÊ_K\Ë˜XØÏ]\ËœÙYY]\™]\›ˆKœ›ÝÝ\K—ÜÝ\Y[˜Ý[ÛŠŠ^Ý\Ë›Ý][‹\Ë˜XØÏ]\ËœÙYY‹—ÛŠ\Ë˜XØÊK\Ëš[œË—ØY
\Ê_KKœ›ÝÝ\K—ÜÝÜY[˜Ý[ÛŠ
^Ý\Ëš[œË—Ü™[[Ý™J\ÊK\Ë›Ý]Z‹\Ë˜XØÏ]\ËœÙYYKKœ›ÝÝ\K—ÛY[˜Ý[ÛŠŠ^Ý˜\ˆ]\Ë›Ý]ÚYŠOOZŠ^Ý˜\ˆOQÓÊ\Ë‹
NÚHOOZ‰‰—ÛŠ\Ë˜XØÏZJ__KKœ›ÝÝ\K—ÙOY[˜Ý[ÛŠŠ^Ý˜\ˆ]\Ë›Ý]ÝOOZ‰‰—ÙJŠ_KKœ›ÝÝ\K—ØÏY[˜Ý[ÛŠ
^Ý˜\ˆ]\Ë›Ý]ÛˆOOZ‰‰›‹—ØÊ
_K_JJ
KšJ[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJŠ^Ý\Ë\OH›\Ý‹\Ëš[œÏ[‹\Ë›Ý]Z‹\Ëš\ÏHLK\Ë˜[ZŸ\™]\›ˆKœ›ÝÝ\K—ÜÝ\Y[˜Ý[ÛŠŠ^Ý\Ë›Ý][‹\Ëš\ÏHLK\Ëš[œË—ØY
\Ê_KKœ›ÝÝ\K—ÜÝÜY[˜Ý[ÛŠ
^Ý\Ëš[œË—Ü™[[Ý™J\ÊK\Ë›Ý]Z‹\Ë˜[ZŸKKœ›ÝÝ\K—ÛY[˜Ý[ÛŠŠ^Ý\Ëš\ÏHL\Ë˜[[ŸKKœ›ÝÝ\K—ÙOY[˜Ý[ÛŠŠ^Ý˜\ˆ]\Ë›Ý]ÝOOZ‰‰—ÙJŠ_KKœ›ÝÝ\K—ØÏY[˜Ý[ÛŠ
^Ý˜\ˆ]\Ë›Ý]ÛˆOOZ‰‰Š\Ëš\ÏÊ‹—ÛŠ\Ë˜[
K‹—ØÊ
JN›‹—ÙJ™]È\œ›ÜŠ›\Ý

H˜Z[Y™XØ]\ÙH[œ]Ý™X[HÛÛ\]YŠJJ_K_JJ
KZJ[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ‹
^Ý\Ë\OH›X\‹\Ëš[œÏ]\Ë›Ý]Z‹\Ë™[Ÿ\™]\›ˆKœ›ÝÝ\K—ÜÝ\Y[˜Ý[ÛŠŠ^Ý\Ë›Ý][‹\Ëš[œË—ØY
\Ê_KKœ›ÝÝ\K—ÜÝÜY[˜Ý[ÛŠ
^Ý\Ëš[œË—Ü™[[Ý™J\ÊK\Ë›Ý]ZŸKKœ›ÝÝ\K—ÛY[˜Ý[ÛŠŠ^Ý˜\ˆ]\Ë›Ý]ÚYŠOOZŠ^Ý˜\ˆOQÓÊ\Ë‹
NÚHOOZ‰‰—ÛŠJ__KKœ›ÝÝ\K—ÙOY[˜Ý[ÛŠŠ^Ý˜\ˆ]\Ë›Ý]ÝOOZ‰‰—ÙJŠ_KKœ›ÝÝ\K—ØÏY[˜Ý[ÛŠ
^Ý˜\ˆ]\Ë›Ý]ÛˆOOZ‰‰›‹—ØÊ
_K_JJ
KJ[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJŠ^Ý\Ë\OHœ™[Y[X™\ˆ‹\Ëš[œÏ[‹\Ë›Ý]ZŸ\™]\›ˆKœ›ÝÝ\K—ÜÝ\Y[˜Ý[ÛŠŠ^Ý\Ë›Ý][‹\Ëš[œË—ØY
Š_KKœ›ÝÝ\K—ÜÝÜY[˜Ý[ÛŠ
^Ý\Ëš[œË—Ü™[[Ý™J\Ë›Ý]
K\Ë›Ý]ZŸK_JJ
KÚJ[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ‹
^Ý\Ë\OHœ™\XÙQ\œ›Üˆ‹\Ëš[œÏ]\Ë›Ý]Z‹\Ë™[Ÿ\™]\›ˆKœ›ÝÝ\K—ÜÝ\Y[˜Ý[ÛŠŠ^Ý\Ë›Ý][‹\Ëš[œË—ØY
\Ê_KKœ›ÝÝ\K—ÜÝÜY[˜Ý[ÛŠ
^Ý\Ëš[œË—Ü™[[Ý™J\ÊK\Ë›Ý]ZŸKKœ›ÝÝ\K—ÛY[˜Ý[ÛŠŠ^Ý˜\ˆ]\Ë›Ý]ÝOOZ‰‰—ÛŠŠ_KKœ›ÝÝ\K—ÙOY[˜Ý[ÛŠŠ^Ý˜\ˆ]\Ë›Ý]ÚYŠOOZŠ]ž^Ý\Ëš[œË—Ü™[[Ý™J\ÊK
\Ëš[œÏ]\Ë™ŠŠJK—ØY
\Ê_XØ]Ú
J^Ý—ÙJJ__KKœ›ÝÝ\K—ØÏY[˜Ý[ÛŠ
^Ý˜\ˆ]\Ë›Ý]ÛˆOOZ‰‰›‹—ØÊ
_K_JJ
KÚJ[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ‹
^Ý\Ë\OHœÝ\Ú]‹\Ëš[œÏ[‹\Ë›Ý]Z‹\Ë˜[]\™]\›ˆKœ›ÝÝ\K—ÜÝ\Y[˜Ý[ÛŠŠ^Ý\Ë›Ý][‹\Ë›Ý]—ÛŠ\Ë˜[
K\Ëš[œË—ØY
Š_KKœ›ÝÝ\K—ÜÝÜY[˜Ý[ÛŠ
^Ý\Ëš[œË—Ü™[[Ý™J\Ë›Ý]
K\Ë›Ý]ZŸK_JJ
KšJ[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ‹
^Ý\Ë\OHZÙH‹\Ëš[œÏ]\Ë›Ý]Z‹\Ë›X^[‹\ËZÙ[L\™]\›ˆKœ›ÝÝ\K—ÜÝ\Y[˜Ý[ÛŠŠ^Ý\Ë›Ý][‹\ËZÙ[L\Ë›X^LÛ‹—ØÊ
N\Ëš[œË—ØY
\Ê_KKœ›ÝÝ\K—ÜÝÜY[˜Ý[ÛŠ
^Ý\Ëš[œË—Ü™[[Ý™J\ÊK\Ë›Ý]ZŸKKœ›ÝÝ\K—ÛY[˜Ý[ÛŠŠ^Ý˜\ˆ]\Ë›Ý]ÚYŠOOZŠ^Ý˜\ˆOJÊÝ\ËZÙ[ŽÚO\Ë›X^Ý—ÛŠŠNšOOO]\Ë›X^	‰Š—ÛŠŠK—ØÊ
J__KKœ›ÝÝ\K—ÙOY[˜Ý[ÛŠŠ^Ý˜\ˆ]\Ë›Ý]ÝOOZ‰‰—ÙJŠ_KKœ›ÝÝ\K—ØÏY[˜Ý[ÛŠ
^Ý˜\ˆ]\Ë›Ý]ÛˆOOZ‰‰›‹—ØÊ
_K_JJ
K“ÏJ[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJŠ^Ý\Ë—Ü›Ù[Ÿ‹\Ë—Ú[ÏV×K\Ë—ÜÝÜQZ‹\Ë—ÙZ‹\Ë—ÙHLK\Ë—Ý\™Ù][[\Ë—Ù\œZŸ\™]\›ˆKœ›ÝÝ\K—ÛY[˜Ý[ÛŠŠ^Ý˜\ˆ]\Ë—Ú[ËO]›[™ÝÚYŠ\Ë—Ù	‰\Ë—Ù—ÛŠŠKOOLJ]ÌK—ÛŠŠNÙ[Ù^ÚYŠOOL
\™]\›ŽÙ›ÜŠ˜\ˆ\ÞJ
KÏLÛÏNÛÊÊÊ\–Û×K—ÛŠŠ__KKœ›ÝÝ\K—ÙOY[˜Ý[ÛŠŠ^ÚYŠ\Ë—Ù\œOOZŠ^Ý\Ë—Ù\œ[ŽÝ˜\ˆ]\Ë—Ú[ËO]›[™ÝÚYŠ\Ë—Þ

K\Ë—Ù	‰\Ë—Ù—ÙJŠKOOLJ]ÌK—ÙJŠNÙ[Ù^ÚYŠOOL
\™]\›ŽÙ›ÜŠ˜\ˆ\ÞJ
KÏLÛÏNÛÊÊÊ\–Û×K—ÙJŠ_ZYŠ]\Ë—Ù	‰šOOL
]›ÝÈ\Ë—Ù\œŸ_KKœ›ÝÝ\K—ØÏY[˜Ý[ÛŠ
^Ý˜\ˆ]\Ë—Ú[Ë[‹›[™ÝÚYŠ\Ë—Þ

K\Ë—Ù	‰\Ë—Ù—ØÊ
KOLJ[–ÌK—ØÊ
NÙ[Ù^ÚYŠOL
\™]\›ŽÙ›ÜŠ˜\ˆO\ÞJŠKLÜÜŠÊÊZVÜ—K—ØÊ
__KKœ›ÝÝ\K—ÞY[˜Ý[ÛŠ
^Ý\Ë—Ú[Ë›[™ÝOOL	‰Š\Ë—Ü›ÙOOZ‰‰\Ë—Ü›Ù—ÜÝÜ

K\Ë—Ù\œZ‹\Ë—Ú[ÏV×J_KKœ›ÝÝ\K—ÜÝÜ›ÝÏY[˜Ý[ÛŠ
^Ý\Ë—Ü›Ù—ÜÝÜ

K\Ë—Ù\œZ‹\Ë—ÜÝÜQZŸKKœ›ÝÝ\K—ØYY[˜Ý[ÛŠŠ^Ý˜\ˆ]\Ë—Ý\™Ù]ÚYŠ
\™]\›ˆ—ØY
ŠNÝ˜\ˆO]\Ë—Ú[ÎÚYŠKœ\Ú
ŠKJK›[™ÝŒJJZYŠ\Ë—ÜÝÜQOOZŠXÛX\•[Y[Ý]
\Ë—ÜÝÜQ
K\Ë—ÜÝÜQZŽÙ[Ù^Ý˜\ˆ]\Ë—Ü›ÙÜˆOOZ‰‰œ‹—ÜÝ\
\Ê__KKœ›ÝÝ\K—Ü™[[Ý™OY[˜Ý[ÛŠŠ^Ý˜\ˆ]\ËO]\Ë—Ý\™Ù]ÚYŠJ\™]\›ˆK—Ü™[[Ý™JŠNÝ˜\ˆ]\Ë—Ú[ËÏ\‹š[™^ÙŠŠNÛÏ‹LI‰Š‹œÜXÙJËJK\Ë—Ü›ÙOOZ‰‰œ‹›[™ÝLÊ\Ë—Ù\œZ‹\Ë—ÜÝÜQ\Ù][Y[Ý]
[˜Ý[ÛŠ
^Ü™]\›ˆ—ÜÝÜ›ÝÊ
_JJNœ‹›[™ÝOOLI‰\Ë—Ü[™PÞXÛ\Ê
J_KKœ›ÝÝ\K—Ü[™PÞXÛ\ÏY[˜Ý[ÛŠ
^Ý\Ë—Ú\Ó›ÔÚ[šÜÊ\Ë×JI‰\Ë—Ü™[[Ý™J\Ë—Ú[ÖÌJ_KKœ›ÝÝ\K—Ú\Ó›ÔÚ[šÜÏY[˜Ý[ÛŠ‹
^ÚYŠš[™^ÙŠŠHOOKLJ\™]\›ˆLÚYŠ‹›Ý]OO]\Ê\™]\›ˆLÚYŠ‹›Ý]	‰›‹›Ý]OOZŠ\™]\›ˆ\Ë—Ú\Ó›ÔÚ[šÜÊ‹›Ý]˜ÛÛ˜Ø]
ŠJNÚYŠ‹—Ú[Ê^Ù›ÜŠ˜\ˆOL[‹—Ú[Ë›[™ÝÚOŽÚJÊÊZYŠ]\Ë—Ú\Ó›ÔÚ[šÜÊ‹—Ú[ÖÚWK˜ÛÛ˜Ø]
ŠJJ\™]\›ˆLNÜ™]\›ˆLY[ÙH™]\›ˆL_KKœ›ÝÝ\K˜ÝÜY[˜Ý[ÛŠ
^Ü™]\›ˆ\È[œÝ[˜Ù[Ùˆ˜ÏÑ˜Î™_KKœ›ÝÝ\K˜Y\Ý[™\Y[˜Ý[ÛŠŠ^Û‹—Û[‹›™^ÛË‹—ÙO[‹™\œ›ÜŸÛË‹—ØÏ[‹˜ÛÛ\]_ÛË\Ë—ØY
Š_KKœ›ÝÝ\Kœ™[[Ý™S\Ý[™\Y[˜Ý[ÛŠŠ^Ý\Ë—Ü™[[Ý™JŠ_KKœ›ÝÝ\KœÝXœØÜšX™OY[˜Ý[ÛŠŠ^Ü™]\›ˆ\Ë˜Y\Ý[™\ŠŠK™]ÈÚŠ\ËŠ_KKœ›ÝÝ\VØ^WOY[˜Ý[ÛŠ
^Ü™]\›ˆ\ßKK˜Ü™X]OY[˜Ý[ÛŠŠ^ÚYŠŠ^ÚYŠ\[Ùˆ‹œÝ\OH™[˜Ý[ÛˆŸ\[Ùˆ‹œÝÜOH™[˜Ý[ÛˆŠ]›ÝÈ™]È\œ›ÜŠœ›ÙXÙ\ˆ™\]Z\™\È›ÝÝ\[™ÝÜ[˜Ý[ÛœÈŠNÛ‘ÊŠ_\™]\›ˆ™]ÈJŠ_KK˜Ü™X]UÚ]Y[[ÜžOY[˜Ý[ÛŠŠ^Ü™]\›ˆ‰‰›‘ÊŠK™]È˜ÊŠ_KK›™]™\Y[˜Ý[ÛŠ
^Ü™]\›ˆ™]ÈJ×ÜÝ\œÛËÜÝÜœÛßJ_KK™[\OY[˜Ý[ÛŠ
^Ü™]\›ˆ™]ÈJ×ÜÝ\™[˜Ý[ÛŠŠ^Û‹—ØÊ
_KÜÝÜœÛßJ_KK›ÝÏY[˜Ý[ÛŠŠ^Ü™]\›ˆ™]ÈJ×ÜÝ\™[˜Ý[ÛŠ
^Ý—ÙJŠ_KÜÝÜœÛßJ_KK™œ›ÛOY[˜Ý[ÛŠŠ^ÚYŠ\[Ùˆ–Ø^WOOH™[˜Ý[ÛˆŠ\™]\›ˆK™œ›ÛSØœÙ\˜X›JŠNÚYŠ\[Ùˆ‹[OH™[˜Ý[ÛˆŠ\™]\›ˆK™œ›ÛT›ÛZ\ÙJŠNÚYŠ\œ˜^Kš\Ð\œ˜^JŠJ\™]\›ˆK™œ›ÛP\œ˜^JŠNÝ›ÝÈ™]È\Q\œ›ÜŠ•\HÙˆ[œ]Èœ›ÛJ
H]\Ý™H[ˆ\œ˜^K›ÛZ\ÙKÜˆØœÙ\˜X›HŠ_KK›ÙY[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KLÝ\™Ý[Y[Ë›[™ÝÝ
ÊÊ[–ÝOX\™Ý[Y[ÖÝNÜ™]\›ˆK™œ›ÛP\œ˜^JŠ_KK™œ›ÛP\œ˜^OY[˜Ý[ÛŠŠ^Ü™]\›ˆ™]ÈJ™]ÈŠŠJ_KK™œ›ÛT›ÛZ\ÙOY[˜Ý[ÛŠŠ^Ü™]\›ˆ™]ÈJ™]ÈšŠŠJ_KK™œ›ÛSØœÙ\˜X›OY[˜Ý[ÛŠŠ^ÚYŠ‹™[™Ú[ˆOO]›ÚY
\™]\›ˆŽÝ˜\ˆ]\[Ùˆ–Ø^WOOH™[˜Ý[ÛˆÛ–Ø^WJ
N›ŽÜ™]\›ˆ™]ÈJ™]ÈZŠ
J_KKœ\š[ÙXÏY[˜Ý[ÛŠŠ^Ü™]\›ˆ™]ÈJ™]ÈšŠŠJ_KKœ›ÝÝ\K—ÛX\Y[˜Ý[ÛŠŠ^Ü™]\›ˆ™]Ê\Ë˜ÝÜŠ
JJ™]ÈZŠ‹\ÊJ_KKœ›ÝÝ\K›X\Y[˜Ý[ÛŠŠ^Ü™]\›ˆ\Ë—ÛX\
Š_KKœ›ÝÝ\K›X\ÏY[˜Ý[ÛŠŠ^Ý˜\ˆ]\Ë›X\
[˜Ý[ÛŠ
^Ü™]\›ˆŸJKO]—Ü›ÙÜ™]\›ˆK\OH›X\È‹KKœ›ÝÝ\K™š[\Y[˜Ý[ÛŠŠ^Ý˜\ˆ]\Ë—Ü›ÙÜ™]\›ˆ[œÝ[˜Ù[ÙˆÓÏÛ™]ÈJ™]ÈÓÊÚŠ™‹ŠKš[œÊJN›™]ÈJ™]ÈÓÊ‹\ÊJ_KKœ›ÝÝ\KZÙOY[˜Ý[ÛŠŠ^Ü™]\›ˆ™]Ê\Ë˜ÝÜŠ
JJ™]ÈšŠ‹\ÊJ_KKœ›ÝÝ\K™›ÜY[˜Ý[ÛŠŠ^Ü™]\›ˆ™]ÈJ™]ÈŠ‹\ÊJ_KKœ›ÝÝ\K›\ÝY[˜Ý[ÛŠ
^Ü™]\›ˆ™]ÈJ™]ÈšŠ\ÊJ_KKœ›ÝÝ\KœÝ\Ú]Y[˜Ý[ÛŠŠ^Ü™]\›ˆ™]È˜Ê™]ÈÚŠ\ËŠJ_KKœ›ÝÝ\K™[™Ú[Y[˜Ý[ÛŠŠ^Ü™]\›ˆ™]Ê\Ë˜ÝÜŠ
JJ™]ÈŠ‹\ÊJ_KKœ›ÝÝ\K™›ÛY[˜Ý[ÛŠ‹
^Ü™]\›ˆ™]È˜Ê™]ÈZŠ‹\ÊJ_KKœ›ÝÝ\Kœ™\XÙQ\œ›ÜY[˜Ý[ÛŠŠ^Ü™]\›ˆ™]Ê\Ë˜ÝÜŠ
JJ™]ÈÚŠ‹\ÊJ_KKœ›ÝÝ\K™›][Y[˜Ý[ÛŠ
^Ü™]\›ˆ™]ÈJ™]ÈšŠ\ÊJ_KKœ›ÝÝ\K˜ÛÛ\ÜÙOY[˜Ý[ÛŠŠ^Ü™]\›ˆŠ\Ê_KKœ›ÝÝ\Kœ™[Y[X™\Y[˜Ý[ÛŠ
^Ü™]\›ˆ™]È˜Ê™]ÈŠ\ÊJ_KKœ›ÝÝ\K™XYÏY[˜Ý[ÛŠŠ^Ü™]\›ˆ™]Ê\Ë˜ÝÜŠ
JJ™]ÈÚŠ\ËŠJ_KKœ›ÝÝ\Kš[Z]]OY[˜Ý[ÛŠŠ^ÚYŠˆ[œÝ[˜Ù[Ùˆ˜Ê]›ÝÈ™]È\œ›ÜŠHY[[ÜžTÝ™X[HØ\ÈÚ]™[ˆÈ[Z]]J
K]]Û›HÝ\ÜÈHÝ™X[Kˆ™XY[Ü™HX›Ý]\È™\ÝšXÝ[Ûˆ\™NˆÎ‹ËÙÚ]X‹˜ÛÛKÜÝ[‹ÞÝ™X[HÙ˜\HŠNÝ\Ë—Ý\™Ù][ŽÙ›ÜŠ˜\ˆ]\Ë—Ú[ËO]›[™ÝLÜNÜŠÊÊ[‹—ØY
Ü—JNÝ\Ë—Ú[ÏV×_KKœ›ÝÝ\KœÚ[YY[TÙ[™™^Y[˜Ý[ÛŠŠ^Ý\Ë—ÛŠŠ_KKœ›ÝÝ\KœÚ[YY[TÙ[™\œ›ÜY[˜Ý[ÛŠŠ^Ý\Ë—ÙJŠ_KKœ›ÝÝ\KœÚ[YY[TÙ[™ÛÛ\]OY[˜Ý[ÛŠ
^Ý\Ë—ØÊ
_KKœ›ÝÝ\KœÙ]XYÓ\Ý[™\Y[˜Ý[ÛŠŠ^ÛÊ\Ë—ÙHL‹—Û[‹›™^ÛË‹—ÙO[‹™\œ›ÜŸÛË‹—ØÏ[‹˜ÛÛ\]_ÛË\Ë—Ù[ŠNŠ\Ë—ÙHLK\Ë—ÙZŠ_KK›Y\™ÙOY[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÚO\™Ý[Y[Ë›[™ÝÚJÊÊ]ÚWOX\™Ý[Y[ÖÚWNÜ™]\›ˆ™]ÈJ™]ÈÚŠ
J_KK˜ÛÛXš[™OY[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÚO\™Ý[Y[Ë›[™ÝÚJÊÊ]ÚWOX\™Ý[Y[ÖÚWNÜ™]\›ˆ™]ÈJ™]ÈšŠ
J_K_JJ
NÐXK”Ý™X[OU“ÎÝ˜\ˆ˜ÏJ[˜Ý[ÛŠJ^ÐšŠ‹JNÙ[˜Ý[ÛˆŠ
^Ý˜\ˆOYK˜Ø[
\Ë
_\ÎÜ™]\›ˆK—Ú\ÏHLK_\™]\›ˆ‹œ›ÝÝ\K—ÛY[˜Ý[ÛŠ
^Ý\Ë—Ý]\Ë—Ú\ÏHLKœ›ÝÝ\K—Û‹˜Ø[
\Ë
_K‹œ›ÝÝ\K—ØYY[˜Ý[ÛŠ
^Ý˜\ˆO]\Ë—Ý\™Ù]ÚYŠJ\™]\›ˆK—ØY

NÝ˜\ˆ]\Ë—Ú[ÎÚYŠ‹œ\Ú

K‹›[™ÝŒJ^Ý\Ë—Ú\É‰—ÛŠ\Ë—ÝŠNÜ™]\›ŸZYŠ\Ë—ÜÝÜQOOZŠ]\Ë—Ú\É‰—ÛŠ\Ë—ÝŠKÛX\•[Y[Ý]
\Ë—ÜÝÜQ
K\Ë—ÜÝÜQZŽÙ[ÙHYŠ\Ë—Ú\Ê]—ÛŠ\Ë—ÝŠNÙ[Ù^Ý˜\ˆÏ]\Ë—Ü›ÙÛÈOOZ‰‰›Ë—ÜÝ\
\Ê__K‹œ›ÝÝ\K—ÜÝÜ›ÝÏY[˜Ý[ÛŠ
^Ý\Ë—Ú\ÏHLKKœ›ÝÝ\K—ÜÝÜ›ÝË˜Ø[
\Ê_K‹œ›ÝÝ\K—ÞY[˜Ý[ÛŠ
^Ý\Ë—Ú\ÏHLKKœ›ÝÝ\K—Þ˜Ø[
\Ê_K‹œ›ÝÝ\K›X\Y[˜Ý[ÛŠ
^Ü™]\›ˆ\Ë—ÛX\

_K‹œ›ÝÝ\K›X\ÏY[˜Ý[ÛŠ
^Ü™]\›ˆKœ›ÝÝ\K›X\Ë˜Ø[
\Ë
_K‹œ›ÝÝ\KZÙOY[˜Ý[ÛŠ
^Ü™]\›ˆKœ›ÝÝ\KZÙK˜Ø[
\Ë
_K‹œ›ÝÝ\K™[™Ú[Y[˜Ý[ÛŠ
^Ü™]\›ˆKœ›ÝÝ\K™[™Ú[‹˜Ø[
\Ë
_K‹œ›ÝÝ\Kœ™\XÙQ\œ›ÜY[˜Ý[ÛŠ
^Ü™]\›ˆKœ›ÝÝ\Kœ™\XÙQ\œ›Ü‹˜Ø[
\Ë
_K‹œ›ÝÝ\Kœ™[Y[X™\Y[˜Ý[ÛŠ
^Ü™]\›ˆ\ßK‹œ›ÝÝ\K™XYÏY[˜Ý[ÛŠ
^Ü™]\›ˆKœ›ÝÝ\K™XYË˜Ø[
\Ë
_KŸJJ“ÊNÐXK“Y[[ÜžTÝ™X[OQ˜ÎÝ˜\ˆÚU“ÎÐXK™Y˜][UÚŸJNÝ˜\ˆÏRJÓÏOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\JÓË—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÕÓË˜ÛÛ˜Ø]SŽÝ˜\ˆÚSXÊ
NÙ[˜Ý[ÛˆŠ‹‹™J^Û][™]È\œ˜^K[™]È\œ˜^KO[™]ÈÙ]LÙ[˜Ý[ÛˆÊ
^Ù›ÜŠÛ‹›[™ÝŒÊ[‹œÚY

K[œÝXœØÜšX™J
NÝ›[™ÝLK˜ÛX\Š
KL[]O^ÜÝ\œÏOžÙK™›Ü‘XXÚ
Oœ\Ú
×JJNÙ[˜Ý[Ûˆ
Š^Ù›ÜŠÎÊ^Û]]Ù—KœÚY

NÚYŠOO]›ÚY
\™]\›ŽÜË›™^

__Y[˜Ý[ÛˆJ
^Ü™]\›ˆYK›[™ÝZYŠJ
J^ÜË˜ÛÛ\]J
NÜ™]\›ŸYK™›Ü‘XXÚ

‹
OOžÛ‹œ\Ú
‹œÝXœØÜšX™JÛ™^›OžÜOO\ÜË›™^

NÜKœ\Ú

_KÛÛ\]NŠ
OOžÙ›ÜŠK˜Y

NÚKš\ÊŠNÊY
ŠKŠÊÎÝJ
OÜË˜ÛÛ\]J
N™
Š_K\œ›ÜŽ›OžÜË™\œ›ÜŠ
KÊ
__JJ_J_KÝÜŠ
OOžÛÊ
__NÜ™]\›ˆÚ‹”Ý™X[K˜Ü™X]JJ__JNÝ˜\ˆ‘ÏRJOOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\JK—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÙK‘Y˜][˜[YT›ÙXÙ\]›ÚYÝ˜\ˆÓÏXÛ\ÜÞÙÙ]˜[YJ
^Ü™]\›ˆ\Ëš[\›˜[˜[Y_XØ[˜XÚÜÎÚ[\›˜[˜[YNÛ\Ý[™\ŽØÛÛœÝXÝÜŠ‹
^Ý\Ë˜Ø[˜XÚÜÏ]\Ëš[\›˜[˜[YO[Ÿ]\]JŠ^Ý\Ëš[\›˜[˜[YO[‹\Ë›\Ý[™\‰‰\Ë›\Ý[™\‹›™^
Š_Y\œ›ÜŠŠ^Ý\Ë›\Ý[™\‰‰\Ë›\Ý[™\‹™\œ›ÜŠŠ_\Ý\
Š^Ý\Ë›\Ý[™\[‹‹›™^
\Ëš[\›˜[˜[YJK\Ë˜Ø[˜XÚÜÉ‰\Ë˜Ø[˜XÚÜË›Û”Ý\Y

_\ÝÜ

^Ý\Ë˜Ø[˜XÚÜÉ‰\Ë˜Ø[˜XÚÜË›Û”ÝÜ

K\Ë›\Ý[™\]›ÚY_NÙK‘Y˜][˜[YT›ÙXÙ\RÓßJNÝ˜\ˆQÏRJÏOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\JË—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÓË™›Ü\XØ]\ÏVZŽÙ[˜Ý[ÛˆZŠJ^Ü™]\›ˆOžÛ]O[™]ÈÙ]Ü™]\›ˆ™š[\ŠÏOˆZKš\ÊJÊJJK™XYÊÏOšK˜Y
JÊJJ___JNÝ˜\ˆQÏRJYÏOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\JYË—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÕYË™œ›ÛS\Ý›ÛZ\ÙOVšŽÕYËÓ\Ý›ÛZ\ÙO[ÑÎÕYË™š\œÝ]™[VŽÝ˜\ˆšSXÊ
NÙ[˜Ý[ÛˆšŠJ^Û]^ÜÝ\OžÙK[ŠOOžÙ›ÜŠ]ˆÙˆJ]›™^
ŠNÝ˜ÛÛ\]J
_JK˜Ø]Ú
OOžÝ™\œ›ÜŠJ_J_KÝÜŠ
OOžß_NÜ™]\›ˆš‹”Ý™X[K˜Ü™X]JŠ_X\Þ[˜È[˜Ý[ÛˆÑÊKŠ^Ü™]\›ˆ™]È›ÛZ\ÙJ
JOOžÚYŠOOL
^Ý
×JNÜ™]\›Ÿ[][™]È\œ˜^NÙKZÙJŠKœÝXœØÜšX™JÛ™^›ÏOžÜ‹œ\Ú
ÊK‹›[™ÝOO[‰‰
Š_KÛÛ\]NŠ
OOžÚJ™]È\œ›ÜŠÝ™X[HÛÛ\]Y™Y›Ü™H[]™[ÈÛÝ[™HÛÛXÝYˆÛÛXÝY	Ü‹›[™ÝK^XÝY	ÛŸX
J_K\œ›ÜŽ›ÏOžÚJÊ__J_J_X\Þ[˜È[˜Ý[ÛˆŠJ^Ü™]\›Š]ØZ]ÑÊKJJVÌ__JNÝ˜\ˆÑÏRJ]OOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\J]K—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÑ]K”™YXÙ\]›ÚYÑ]K˜ÛÝ[Ý™X[OZšŽÑ]K˜\Ð\œ˜^O[™YNÑ]K›\Ý˜[YO\™YNÝ˜\ˆXÛ\ÜÞÜÝ™X[NÜ™YXÙ\ŽÜÝ]NØÛÛ\]YØÛÛœÝXÝÜŠ‹J^Ý\ËœÝ™X[O[‹\Ëœ™YXÙ\]\ËœÝ]OZK\Ë˜ÛÛ\]Y[™]È›ÛZ\ÙJ
‹ÊOOžÛ]O]\ËœÝ™X[KœÝXœØÜšX™JÛ™^œÏOžÝ\ËœÝ]O]\Ëœ™YXÙ\Š\ËœÝ]KÊ_KÛÛ\]NŠ
OOžÜŠ
KK[œÝXœØÜšX™J
_K\œ›ÜŽœÏOžÛÊÊKK[œÝXœØÜšX™J
__J_J_]˜[YJ
^Ü™]\›ˆ\ËœÝ]_X\Þ[˜Èš[š\ÚY

^Ü™]\›ˆ\Ë˜ÛÛ\]Y_NÑ]K”™YXÙ\ZŽÙ[˜Ý[Ûˆ	ŠKŠ^Ü™]\›ˆJÌ_Y[˜Ý[ÛˆšŠJ^Ü™]\›ˆ™]ÈŠK	‹
_Y[˜Ý[ÛˆYYJKŠ^Ü™]\›–Ë‹‹™K—_Y[˜Ý[Ûˆ™YJJ^Ü™]\›ˆ™]ÈŠKYYK×J_Y[˜Ý[ÛˆYJKŠ^Ü™]\›ˆŸY[˜Ý[Ûˆ™YJJ^Ü™]\›ˆ™]ÈŠKYK›ÚY
__JNÝ˜\ˆÏRJÞOOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\JÞK—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNØÞK•˜[YP[™\]\Ï]›ÚYÝ˜\ˆYYOSXÊ
KSÏXÛ\ÜÞÝ\]\ÎÙÙ]˜[YJ
^Ü™]\›ˆ\Ëœ›ÙXÙ\‹˜[Y_\›ÙXÙ\ŽØÛÛœÝXÝÜŠŠ^Ý\Ëœ›ÙXÙ\[‹\Ë\]\ÏZYYK“Y[[ÜžTÝ™X[K˜Ü™X]UÚ]Y[[ÜžJ\Ëœ›ÙXÙ\Š_X\Þ[˜ÈØZ]›ÜŠŠ^Û]]\[ÙˆOH™[˜Ý[ÛˆÛŽšOOšOOO[ŽÜ™]\›ˆ™]È›ÛZ\ÙJ
KŠOOžÛ]Ï]\Ë\]\ËœÝXœØÜšX™JÛ™^˜OOžÝ
JI‰ŠJJKÙ][Y[Ý]


OOžÛË[œÝXœØÜšX™J
_K
J_KÛÛ\]NŠ
OOžÛË[œÝXœØÜšX™J
KŠ™]È\œ›ÜŠ•\]HÝ™X[HÛÛ\]YÚ]Ý]^XÝY˜[YHŠJ_K\œ›ÜŽ˜OOžÜŠJ__J_J__NØÞK•˜[YP[™\]\ÏVSßJNÝ˜\ˆ^ORJÚOOžÈ\ÙHÝšXÝŽÝ˜\ˆÙYOXÚI‰˜ÚK—×ØÜ™X]Pš[™[™ß
Øš™XÝ˜Ü™X]OÊ[˜Ý[ÛŠK‹J^ÚOOO]›ÚY	‰ŠO]
NÝ˜\ˆSØš™XÝ™Ù]ÝÛ”›Ü\Q\ØÜš\ÜŠ‹
NÊ\Ÿ
™Ù]š[ˆÈ[‹—×Ù\Ó[Ù[Nœ‹Üš]X›_‹˜ÛÛ™šYÝ\˜X›JJI‰Š^Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ–Ý__JKØš™XÝ™Yš[™T›Ü\JKKŠ_JNŠ[˜Ý[ÛŠK‹J^ÚOOO]›ÚY	‰ŠO]
KVÚWO[–Ý_JJKYYOXÚI‰˜ÚK—×Ù^ÜÝ\Ÿ[˜Ý[ÛŠKŠ^Ù›ÜŠ˜\ˆ[ˆJ]OOH™Y˜][‰‰ˆSØš™XÝœ›ÝÝ\Kš\ÓÝÛ”›Ü\K˜Ø[
‹
I‰›ÙYJ‹K
_NÓØš™XÝ™Yš[™T›Ü\JÚK—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNØÚK•˜[YP[™\]\ÏXÚKÓ\Ý›ÛZ\ÙOXÚK™œ›ÛS\Ý›ÛZ\ÙOXÚK™š\œÝ]™[XÚK™›Ü\XØ]\ÏXÚK‘Y˜][˜[YT›ÙXÙ\XÚK˜ÛÛ˜Ø]]›ÚYÝ˜\ˆÙYO]Ê
NÓØš™XÝ™Yš[™T›Ü\JÚK˜ÛÛ˜Ø]‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆÙYK˜ÛÛ˜Ø]_JNÝ˜\ˆYO\‘Ê
NÓØš™XÝ™Yš[™T›Ü\JÚK‘Y˜][˜[YT›ÙXÙ\ˆ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆYK‘Y˜][˜[YT›ÙXÙ\Ÿ_JNÝ˜\ˆÙYOZQÊ
NÓØš™XÝ™Yš[™T›Ü\JÚK™›Ü\XØ]\È‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆÙYK™›Ü\XØ]\ß_JNÝ˜\ˆ“ÏXQÊ
NÓØš™XÝ™Yš[™T›Ü\JÚK™š\œÝ]™[‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ“Ë™š\œÝ]™[_JNÓØš™XÝ™Yš[™T›Ü\JÚK™œ›ÛS\Ý›ÛZ\ÙH‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ“Ë™œ›ÛS\Ý›ÛZ\Ù__JNÓØš™XÝ™Yš[™T›Ü\JÚKÓ\Ý›ÛZ\ÙH‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ“ËÓ\Ý›ÛZ\Ù__JNØYYJÑÊ
KÚJNÝ˜\ˆYYOYÊ
NÓØš™XÝ™Yš[™T›Ü\JÚK•˜[YP[™\]\È‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆYYK•˜[YP[™\]\ß_J_JNÝ˜\ˆ“ÏRJYOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\JY‹—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÞY‹šœÛÛ”œÐÛÙO]›ÚYÞY‹š\ÒœÛÛ”œÑ\œ›Ü”™\ÜÛœÙOXÑÎÞY‹š\ÒœÛÛ”œÔÝXØÙ\ÜÔ™\ÜÛœÙOPYYNÙ[˜Ý[ÛˆÑÊJ^Ü™]\›ˆ\[ÙˆK™\œ›ÜOH›Øš™XÝŸY[˜Ý[ÛˆYYJJ^Ü™]\›ˆXÑÊJ_^Y‹šœÛÛ”œÐÛÙO^Ü\œÙQ\œ›ÜŽ‹LÌÌ[˜[Y™\]Y\Ý‹LÌŒY]Ù›Ý›Ý[™‹LÌŒK[˜[Y\˜[\Î‹LÌŒ‹[\›˜[\œ›ÜŽ‹LÌŒËÙ\™\‘\œ›ÜŽžÙY˜][‹LÌ™Lß__JNÝ˜\ˆQÏRJ^OOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\J^K—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÐ^K’œÛÛ”œÐÛY[]›ÚYÝ˜\ˆ™YO]^J
KYOV“Ê
KÏXÛ\ÜÞØÛÛ›™XÝ[ÛŽØÛÛœÝXÝÜŠŠ^Ý\Ë˜ÛÛ›™XÝ[Û[ŸX\Þ[˜È[ŠŠ^Û]]\Ë˜ÛÛ›™XÝ[Û‹œ™\ÜÛœÙTÝ™X[K™š[\ŠÏO›ËšYOO[‹šY
KOJ™YK™š\œÝ]™[
J
NÝ\Ë˜ÛÛ›™XÝ[Û‹œÙ[™™\]Y\Ý
ŠNÛ]X]ØZ]NÚYŠ
YKš\ÒœÛÛ”œÑ\œ›Ü”™\ÜÛœÙJJŠJ^Û]Ï\‹™\œ›ÜŽÝ›ÝÈ™]È\œ›ÜŠ”ÓÓˆ”È\œ›ÜŽˆÛÙOIÛË˜ÛÙ_NÈY\ÜØYÙOIÉÛË›Y\ÜØYÙ_IØ
_\™]\›ˆŸ_NÐ^K’œÛÛ”œÐÛY[VßJNÝ˜\ˆÏRJÏOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\JË—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÕËš\ÒœÛÛÛÛ\]X›U˜[YOIÎÕËš\ÒœÛÛÛÛ\]X›P\œ˜^OPQÎÕËš\ÒœÛÛÛÛ\]X›QXÝ[Û˜\žOY‘ÎÙ[˜Ý[Ûˆ	ÊJ^Ü™]\›ˆHJ\[ÙˆOOHœÝš[™ÈŸ\[ÙˆOOH›[X™\ˆŸ\[ÙˆOOH˜›ÛÛX[ˆŸOOO[[QÊJ_‘ÊJJ_Y[˜Ý[ÛˆQÊJ^ÚYŠP\œ˜^Kš\Ð\œ˜^JJJ\™]\›ˆLNÙ›ÜŠ]ˆÙˆJZYŠIÊŠJ\™]\›ˆLNÜ™]\›ˆLY[˜Ý[Ûˆ‘ÊJ^Ü™]\›ˆ\[ÙˆHOH›Øš™XÝŸOOO[[Øš™XÝœ›ÝÝ\KÔÝš[™Ë˜Ø[
JHOOH–ÛØš™XÝØš™XÝHÈLN“Øš™XÝ˜[Y\ÊJK™]™\žJ	Ê__JNÝ˜\ˆÏRJ]OOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\J]K—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÔ]Kœ\œÙRœÛÛ”œÒYYÑÎÔ]Kœ\œÙRœÛÛ”œÔ™\]Y\ÝYÙYNÔ]Kœ\œÙRœÛÛ”œÑ\œ›Ü”™\ÜÛœÙO\ÎÔ]Kœ\œÙRœÛÛ”œÔÝXØÙ\ÜÔ™\ÜÛœÙORQÎÔ]Kœ\œÙRœÛÛ”œÔ™\ÜÛœÙORYYNÝ˜\ˆÏ[Ê
NÙ[˜Ý[ÛˆÑÊJ^ÚYŠJËš\ÒœÛÛÛÛ\]X›QXÝ[Û˜\žJJJJ]›ÝÈ™]È\œ›ÜŠ‘]H]\Ý™H”ÓÓˆÛÛ\]X›HXÝ[Û˜\žHŠNÛ]YKšYÜ™]\›ˆ\[ÙˆˆOH›[X™\ˆ‰‰\[ÙˆˆOHœÝš[™ÈÛ[›ŸY[˜Ý[ÛˆÙYJJ^ÚYŠJËš\ÒœÛÛÛÛ\]X›QXÝ[Û˜\žJJJJ]›ÝÈ™]È\œ›ÜŠ‘]H]\Ý™H”ÓÓˆÛÛ\]X›HXÝ[Û˜\žHŠNÚYŠ\[ÙˆKšœÛÛœœÈOHœÝš[™ÈŠ]›ÝÈ™]È\œ›ÜŠ	Ò[˜[YšœÛÛœœÈˆšY[ˆ]\Ý™HHÝš[™Ë‰ÊNÚYŠKšœÛÛœœÈOOHŒ‹ŒŠ]›ÝÈ™]È\œ›ÜŠÛÝ[™^XÝYœÛÛœœÈ™\œÚ[ÛŽˆ	ÙKšœÛÛœœßX
NÛ]YÑÊJNÚYŠOO[[
]›ÝÈ™]È\œ›ÜŠ’[˜[YYšY[ŠNÛ]YK›Y]ÙÚYŠ\[ÙˆOHœÝš[™ÈŠ]›ÝÈ™]È\œ›ÜŠ	Ò[˜[Y›Y]ÙˆšY[ˆ]\Ý™HHÝš[™Ë‰ÊNÚYŠJËš\ÒœÛÛÛÛ\]X›P\œ˜^JJKœ\˜[\ÊI‰ˆJËš\ÒœÛÛÛÛ\]X›QXÝ[Û˜\žJJKœ\˜[\ÊJ]›ÝÈ™]È\œ›ÜŠ’[˜[Y\˜[\ÈšY[ŠNÜ™]\›žÚœÛÛœœÎˆŒ‹Œ‹Y›‹Y]Ù\˜[\Î™Kœ\˜[\ß_Y[˜Ý[ÛˆYJJ^ÚYŠ\[ÙˆK˜ÛÙHOH›[X™\ˆŠ]›ÝÈ™]È\œ›ÜŠ‘\œ›Üˆ›Ü\H	ØÛÙIÈ\È›ÝH[X™\ˆŠNÚYŠ\[ÙˆK›Y\ÜØYÙHOHœÝš[™ÈŠ]›ÝÈ™]È\œ›ÜŠ‘\œ›Üˆ›Ü\H	ÛY\ÜØYÙIÈ\È›ÝHÝš[™ÈŠNÛ]ŽÚYŠK™]OOO]›ÚY
[]›ÚYÙ[ÙHYŠ
Ëš\ÒœÛÛÛÛ\]X›U˜[YJJK™]JJ[YK™]NÙ[ÙH›ÝÈ™]È\œ›ÜŠ‘\œ›Üˆ›Ü\H	Ù]IÈ\ÈYš[™Y]›ÝH”ÓÓˆÛÛ\]X›H˜[YKˆŠNÜ™]\›žØÛÙN™K˜ÛÙKY\ÜØYÙN™K›Y\ÜØYÙK‹‹›ˆOO]›ÚYÞÙ]N›ŸNžß__Y[˜Ý[ÛˆÊJ^ÚYŠJËš\ÒœÛÛÛÛ\]X›QXÝ[Û˜\žJJJJ]›ÝÈ™]È\œ›ÜŠ‘]H]\Ý™H”ÓÓˆÛÛ\]X›HXÝ[Û˜\žHŠNÚYŠKšœÛÛœœÈOOHŒ‹ŒŠ]›ÝÈ™]È\œ›ÜŠÛÝ[™^XÝYœÛÛœœÈ™\œÚ[ÛŽˆ	Ò”ÓÓ‹œÝš[™ÚYžJJ_X
NÛ]YKšYÚYŠ\[ÙˆˆOH›[X™\ˆ‰‰\[ÙˆˆOHœÝš[™È‰‰›ˆOO[[
]›ÝÈ™]È\œ›ÜŠ’[˜[YYšY[ŠNÚYŠ\[ÙˆK™\œ›ÜˆHŸJËš\ÒœÛÛÛÛ\]X›QXÝ[Û˜\žJJK™\œ›ÜŠJ]›ÝÈ™]È\œ›ÜŠ’[˜[Y\œ›ÜˆšY[ŠNÜ™]\›žÚœÛÛœœÎˆŒ‹Œ‹Y›‹\œ›ÜŽœYJK™\œ›ÜŠ__Y[˜Ý[ÛˆQÊJ^ÚYŠJËš\ÒœÛÛÛÛ\]X›QXÝ[Û˜\žJJJJ]›ÝÈ™]È\œ›ÜŠ‘]H]\Ý™H”ÓÓˆÛÛ\]X›HXÝ[Û˜\žHŠNÚYŠKšœÛÛœœÈOOHŒ‹ŒŠ]›ÝÈ™]È\œ›ÜŠÛÝ[™^XÝYœÛÛœœÈ™\œÚ[ÛŽˆ	Ò”ÓÓ‹œÝš[™ÚYžJJ_X
NÛ]YKšYÚYŠ\[ÙˆˆOH›[X™\ˆ‰‰\[ÙˆˆOHœÝš[™ÈŠ]›ÝÈ™]È\œ›ÜŠ’[˜[YYšY[ŠNÚYŠ\[ÙˆKœ™\Ý[ˆHŠ]›ÝÈ™]È\œ›ÜŠ’[˜[Y™\Ý[šY[ŠNÛ]YKœ™\Ý[Ü™]\›žÚœÛÛœœÎˆŒ‹Œ‹Y›‹™\Ý[_Y[˜Ý[ÛˆYYJJ^Û]ŽÝž^Û\ÊJ_XØ]ÚÛRQÊJ_\™]\›ˆŸ_JNÝ˜\ˆžORJœOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\Jœ‹—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÕœ‹šœÛÛ”œÐÛÙOUœ‹š\ÒœÛÛ”œÔÝXØÙ\ÜÔ™\ÜÛœÙOUœ‹š\ÒœÛÛ”œÑ\œ›Ü”™\ÜÛœÙOUœ‹œ\œÙRœÛÛ”œÔÝXØÙ\ÜÔ™\ÜÛœÙOUœ‹œ\œÙRœÛÛ”œÔ™\ÜÛœÙOUœ‹œ\œÙRœÛÛ”œÔ™\]Y\ÝUœ‹œ\œÙRœÛÛ”œÒYUœ‹œ\œÙRœÛÛ”œÑ\œ›Ü”™\ÜÛœÙOUœ‹’œÛÛ”œÐÛY[Uœ‹›XZÙRœÛÛ”œÒY]›ÚYÝ˜\ˆYO]N

NÓØš™XÝ™Yš[™T›Ü\Jœ‹›XZÙRœÛÛ”œÒY‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆYK›XZÙRœÛÛ”œÒY_JNÝ˜\ˆYYO]QÊ
NÓØš™XÝ™Yš[™T›Ü\Jœ‹’œÛÛ”œÐÛY[‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆYYK’œÛÛ”œÐÛY[_JNÝ˜\ˆÏZÊ
NÓØš™XÝ™Yš[™T›Ü\Jœ‹œ\œÙRœÛÛ”œÑ\œ›Ü”™\ÜÛœÙH‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆËœ\œÙRœÛÛ”œÑ\œ›Ü”™\ÜÛœÙ__JNÓØš™XÝ™Yš[™T›Ü\Jœ‹œ\œÙRœÛÛ”œÒY‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆËœ\œÙRœÛÛ”œÒY_JNÓØš™XÝ™Yš[™T›Ü\Jœ‹œ\œÙRœÛÛ”œÔ™\]Y\Ý‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆËœ\œÙRœÛÛ”œÔ™\]Y\Ý_JNÓØš™XÝ™Yš[™T›Ü\Jœ‹œ\œÙRœÛÛ”œÔ™\ÜÛœÙH‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆËœ\œÙRœÛÛ”œÔ™\ÜÛœÙ__JNÓØš™XÝ™Yš[™T›Ü\Jœ‹œ\œÙRœÛÛ”œÔÝXØÙ\ÜÔ™\ÜÛœÙH‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆËœ\œÙRœÛÛ”œÔÝXØÙ\ÜÔ™\ÜÛœÙ__JNÝ˜\ˆ“ÏV“Ê
NÓØš™XÝ™Yš[™T›Ü\Jœ‹š\ÒœÛÛ”œÑ\œ›Ü”™\ÜÛœÙH‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ“Ëš\ÒœÛÛ”œÑ\œ›Ü”™\ÜÛœÙ__JNÓØš™XÝ™Yš[™T›Ü\Jœ‹š\ÒœÛÛ”œÔÝXØÙ\ÜÔ™\ÜÛœÙH‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ“Ëš\ÒœÛÛ”œÔÝXØÙ\ÜÔ™\ÜÛœÙ__JNÓØš™XÝ™Yš[™T›Ü\Jœ‹šœÛÛ”œÐÛÙH‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ“ËšœÛÛ”œÐÛÙ__J_JNÝ˜\ˆŒORJLOOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\JLK—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÙLKš[YYNØ\Þ[˜È[˜Ý[Ûˆ™YJJ^ÚYŠKœÝ]\ÏM
^Û]X]ØZ]K^

K˜Ø]Ú


OOˆ•[˜X›HÈ™]šY]™H›ÙHÛÛ[ŠNÝ›ÝÈ™]È\œ›ÜŠ˜YÝ]\ÈÛˆ™\ÜÛœÙNˆ	ÙKœÝ]\ßXØØ]\ÙNžÜÝ]\Î™KœÝ]\Ë›ÙN›Ÿ_J_\™]\›ˆ_X\Þ[˜È[˜Ý[ÛˆYYJK‹KŠ^Û]Ï^ÛY]Ù™K›ÙNšOÒ”ÓÓ‹œÝš[™ÚYžJJN›ÚYXY\œÎžÈÛÛ[U\HŽˆ˜\XØ][Û‹ÚœÛÛˆ‹‹‹KÚYÛ˜[œÐX›ÜÚYÛ˜[[Y[Ý]
ŠN›ÚYNÜ™]\›ˆ™]Ú
‹ÊK[Š™YJK[ŠOO˜KšœÛÛŠ
J__JNÝ˜\ˆ™ÏRJOOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\JK—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÛKš[œÝ[˜ÙSÙ”œÔÝ™X[Z[™ÐÛY[PÙYNÛKš\Ô›ÝØÛÛTÙYNÙ[˜Ý[ÛˆÙYJJ^Ü™]\›ˆ›\Ý[ˆš[ˆI‰\[ÙˆK›\Ý[OH™[˜Ý[ÛˆŸY[˜Ý[ÛˆÙYJJ^Ü™]\›ˆKœÙX\˜Ú
Ž‹ËÈŠHOOKL__JNÝ˜\ˆQÏRJÞOOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\JÞK—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÙÞK’˜]ÚÛY[]›ÚYÝ˜\ˆQÏYžJ
KÙYO[ŒJ
KYYOR™Ê
K‘Ï^Ù\Ü]Ú[\˜[ŒŒ˜]ÚÚ^™S[Z]ŒŒKOXÛ\ÜÞÝ\›ÚXY\œÎÛÜ[ÛœÎÝ[Y\ŽÜ]Y]YOV×NØÛÛœÝXÝÜŠ‹^ßJ^ÚYŠ\Ë›Ü[ÛœÏ^Ø˜]ÚÚ^™S[Z]˜˜]ÚÚ^™S[Z]ÏÐ‘Ë˜˜]ÚÚ^™S[Z]\Ü]Ú[\˜[™\Ü]Ú[\˜[ÏÐ‘Ë™\Ü]Ú[\˜[[Y[Ý]š[Y[Ý]K\[ÙˆOHœÝš[™ÈŠ^ÚYŠJYYKš\Ô›ÝØÛÛ
JŠJ]›ÝÈ™]È\œ›ÜŠ‘[™Ú[T“\ÈZ\ÜÚ[™ÈH›ÝØÛÛˆ^XÝY	ÚÎ‹ËÉÈÜˆ	Ú‹ËÉËˆŠNÝ\Ë\›[ŸY[ÙH\Ë\›[‹\›\ËšXY\œÏ[‹šXY\œÎÝ\Ë[Y\\Ù][\˜[


OOžÝ\ËXÚÊ
_K™\Ü]Ú[\˜[
K\Ë˜[Y]J
_Y\ØÛÛ›™XÝ

^Ý\Ë[Y\‰‰˜ÛX\’[\˜[
\Ë[Y\ŠK\Ë[Y\]›ÚYX\Þ[˜È^XÝ]JŠ^Ü™]\›ˆ™]È›ÛZ\ÙJ
JOOžÝ\Ëœ]Y]YKœ\Ú
Ü™\]Y\Ý›‹™\ÛÛ™N™Z™XÝš_JK\Ëœ]Y]YK›[™Ý]\Ë›Ü[ÛœË˜˜]ÚÚ^™S[Z]	‰\ËXÚÊ
_J_]˜[Y]J
^ÚYŠ]\Ë›Ü[ÛœË˜˜]ÚÚ^™S[Z]S[X™\‹š\ÔØY™R[YÙ\Š\Ë›Ü[ÛœË˜˜]ÚÚ^™S[Z]
_\Ë›Ü[ÛœË˜˜]ÚÚ^™S[Z]J]›ÝÈ™]È\œ›ÜŠ˜˜]ÚÚ^™S[Z]]\Ý™HHØY™H[YÙ\ˆHHŠ_]XÚÊ
^Û]]\Ëœ]Y]YKœÜXÙJ\Ë›Ü[ÛœË˜˜]ÚÚ^™S[Z]
NÚYŠ[‹›[™Ý
\™]\›ŽÛ][‹›X\
Oœ‹œ™\]Y\Ý
KO]›X\
Oœ‹šY
NÊÙYKš
J”ÔÕ‹\Ë\›\ËšXY\œË\Ë›Ü[ÛœËš[Y[Ý]
K[ŠOžÊ\œ˜^Kš\Ð\œ˜^JŠOÜŽ–Ü—JK™›Ü‘XXÚ
OOžÛ]Ï[‹™š[™
Oœœ™\]Y\ÝšYOOXKšY
NÚYŠ\Ê\™]\›ŽÛ]Ü™Z™XÝ™™\ÛÛ™N_O\ËJQËœ\œÙRœÛÛ”œÔ™\ÜÛœÙJJJNÊQËš\ÒœÛÛ”œÑ\œ›Ü”™\ÜÛœÙJJŠOÙ
™]È\œ›ÜŠ”ÓÓ‹œÝš[™ÚYžJ‹™\œ›ÜŠJJNJŠ_J_KOžÙ›ÜŠ]ÈÙˆJ^Û]O[‹™š[™
ÏOœËœ™\]Y\ÝšYOO[ÊNÚYŠXJ\™]\›ŽØKœ™Z™XÝ
Š__J__NÙÞK’˜]ÚÛY[]_JNÝ˜\ˆÑÏRJOOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\JK—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÜK’ÛY[]›ÚYÝ˜\ˆÑÏYžJ
KYYO[ŒJ
KÙYOR™Ê
KŒOXÛ\ÜÞÝ\›ÚXY\œÎÝ[Y[Ý]ØÛÛœÝXÝÜŠ‹
^ÚYŠ\[ÙˆOHœÝš[™ÈŠ^ÚYŠJÙYKš\Ô›ÝØÛÛ
JŠJ]›ÝÈ™]È\œ›ÜŠ‘[™Ú[T“\ÈZ\ÜÚ[™ÈH›ÝØÛÛˆ^XÝY	ÚÎ‹ËÉÈÜˆ	Ú‹ËÉËˆŠNÝ\Ë\›[ŸY[ÙH\Ë\›[‹\›\ËšXY\œÏ[‹šXY\œÎÝ\Ë[Y[Ý]]Y\ØÛÛ›™XÝ

^ßX\Þ[˜È^XÝ]JŠ^Û]JÑËœ\œÙRœÛÛ”œÔ™\ÜÛœÙJJ]ØZ]
YYKš
J”ÔÕ‹\Ë\›\ËšXY\œË‹\Ë[Y[Ý]
JNÚYŠ
ÑËš\ÒœÛÛ”œÑ\œ›Ü”™\ÜÛœÙJJ
J]›ÝÈ™]È\œ›ÜŠ”ÓÓ‹œÝš[™ÚYžJ™\œ›ÜŠJNÜ™]\›ˆ_NÜK’ÛY[\Œ_JNÝ˜\ˆQÏRJ
]YKÑÊOOžÝ˜\ˆ™[[Ý\[ÙˆÙX”ÛØÚÙ]HÐ™UÙX”ÛØÚÙ]\[Ùˆ[Þ•ÙX”ÛØÚÙ]HÐ™S[Þ•ÙX”ÛØÚÙ]\[ÙˆÛØ˜[HÐ™YÛØ˜[•ÙX”ÛØÚÙ]ÛØ˜[“[Þ•ÙX”ÛØÚÙ]\[ÙˆÚ[™ÝÏHÐ™]Ú[™ÝË•ÙX”ÛØÚÙ]Ú[™ÝË“[Þ•ÙX”ÛØÚÙ]\[ÙˆÙ[H‰‰Š™\Ù[‹•ÙX”ÛØÚÙ]Ù[‹“[Þ•ÙX”ÛØÚÙ]
NÚÑË™^ÜÏP™ŸJNÝ˜\ˆÌORJÙOžÈ\ÙHÝšXÝŽÝ˜\ˆ™YOPÙ‰‰Ù‹—×Ú[\ÜY˜][[˜Ý[ÛŠJ^Ü™]\›ˆI‰™K—×Ù\Ó[Ù[OÙNžÙY˜][™__NÓØš™XÝ™Yš[™T›Ü\JÙ‹—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÐÙ‹”ÛØÚÙ]Ü˜\\]›ÚYÝ˜\ˆYT™YJQÊ
JNÙ[˜Ý[Ûˆ™YJ
^Ü™]\›ˆ\[Ùˆ›ØÙ\ÜÏH‰‰\[Ùˆ›ØÙ\ÜË™\œÚ[ÛœÏH‰‰\[Ùˆ›ØÙ\ÜË™\œÚ[ÛœË››ÙOHŸ]˜\ˆLOXÛ\ÜÞØÛÛ›™XÝYØÛÛ›™XÝY™\ÛÛ™\ŽØÛÛ›™XÝY™Z™XÝ\ŽÜÛØÚÙ]Ý[Y[Ý]YØÛÜÙYHLNÝ\›ÛY\ÜØYÙR[™\ŽÙ\œ›Ü’[™\ŽÛÜ[’[™\ŽØÛÜÙR[™\ŽÝ[Y[Ý]ØÛÛœÝXÝÜŠ‹K‹ËOLYM
^Ý\Ë˜ÛÛ›™XÝY[™]È›ÛZ\ÙJ
Ë
OOžÝ\Ë˜ÛÛ›™XÝY™\ÛÛ™\\Ë\Ë˜ÛÛ›™XÝY™Z™XÝ\YJK\Ë\›[‹\Ë›Y\ÜØYÙR[™\]\Ë™\œ›Ü’[™\ZK\Ë›Ü[’[™\\‹\Ë˜ÛÜÙR[™\[Ë\Ë[Y[Ý]X_XÛÛ›™XÝ

^Û][™]ÈY‹™Y˜][
\Ë\›
NÛ‹›Û™\œ›ÜZOOžÝ\Ë˜ÛX\•[Y[Ý]

K\Ë™\œ›Ü’[™\‰‰\Ë™\œ›Ü’[™\ŠJ_K‹›Û›Y\ÜØYÙOZOOžÝ\Ë›Y\ÜØYÙR[™\ŠÝ\NšK\K]NšK™]_J_K‹›Û›Ü[ZOOžÝ\Ë˜ÛX\•[Y[Ý]

K\Ë˜ÛÛ›™XÝY™\ÛÛ™\Š
K\Ë›Ü[’[™\‰‰\Ë›Ü[’[™\Š
_K‹›Û˜ÛÜÙOZOOžÝ\Ë˜ÛÜÙYHL\Ë˜ÛÜÙR[™\‰‰\Ë˜ÛÜÙR[™\ŠJ_NÛ]Q]K››ÝÊ
NÝ\Ë[Y[Ý]Y\Ù][Y[Ý]


OOžÛ‹›Û›Y\ÜØYÙOJ
OOŒ‹›Û™\œ›ÜJ
OOŒ‹›Û›Ü[J
OOŒ‹›Û˜ÛÜÙOJ
OOŒ‹˜ÛÜÙJ
K\ËœÛØÚÙ]]›ÚYÛ]OSX]™›ÛÜŠ]K››ÝÊ
K]
NÝ\Ë˜ÛÛ›™XÝY™Z™XÝ\Š™]È\œ›ÜŠÛÛ›™XÝ[Ûˆ][\[YYÝ]Y\ˆ	Ú_H\Ø
J_K\Ë[Y[Ý]
K\ËœÛØÚÙ][ŸY\ØÛÛ›™XÝ

^ÚYŠ]\ËœÛØÚÙ]
]›ÝÈ™]È\œ›ÜŠ”ÛØÚÙ][™Yš[™Yˆ\È]\Ý™HØ[YY\ˆÛÛ›™XÝ[™ËˆŠNÜÝÚ]Ú
\Ë˜ÛX\•[Y[Ý]

K\ËœÛØÚÙ]œ™XYTÝ]J^ØØ\ÙHY‹™Y˜][“ÔSŽ\ËœÛØÚÙ]˜ÛÜÙJYLÊNØœ™XZÎØØ\ÙHY‹™Y˜][ÓÔÑQ˜œ™XZÎØØ\ÙHY‹™Y˜][ÓÓ“‘PÕS‘Î\ËœÛØÚÙ]›Û›Ü[J
OOŒ\ËœÛØÚÙ]›Û˜ÛÜÙOJ
OOŒ\ËœÛØÚÙ]›Û™\œ›ÜJ
OOŒ\ËœÛØÚÙ]›Û›Y\ÜØYÙOJ
OOŒ\ËœÛØÚÙ]]›ÚY\Ë˜ÛÜÙR[™\‰‰\Ë˜ÛÜÙR[™\ŠÝØ\ÐÛX[ŽˆLKÛÙN_JNØœ™XZÎØØ\ÙHY‹™Y˜][ÓÔÒS‘Î˜œ™XZÎÙY˜][›ÝÈ™]È\œ›ÜŠ[šÛ›ÝÛˆ™XYTÝ]Nˆ	Ý\ËœÛØÚÙ]œ™XYTÝ]_X
__X\Þ[˜ÈÙ[™
Š^Ü™]\›ˆ™]È›ÛZ\ÙJ
JOOžÚYŠ]\ËœÛØÚÙ]
]›ÝÈ™]È\œ›ÜŠ”ÛØÚÙ][™Yš[™Yˆ\È]\Ý™HØ[YY\ˆÛÛ›™XÝ[™ËˆŠNÚYŠ\Ë˜ÛÜÙY
]›ÝÈ™]È\œ›ÜŠ”ÛØÚÙ]Ø\ÈÛÜÙYÛÈ›È]HØ[ˆ™HÙ[[ž[[Ü™KˆŠNÚYŠ\ËœÛØÚÙ]œ™XYTÝ]HOO[Y‹™Y˜][“ÔSŠ]›ÝÈ™]È\œ›ÜŠ•ÙXœÛØÚÙ]\È›ÝÜ[ˆŠNØ™YJ
OÝ\ËœÛØÚÙ]œÙ[™
‹OžÜÚJŠN

_JNŠ\ËœÛØÚÙ]œÙ[™
ŠK

J_J_XÛX\•[Y[Ý]

^ÚYŠ]\Ë[Y[Ý]Y
]›ÝÈ™]È\œ›ÜŠ•[Y[Ý]Q›ÝÙ]ˆ\ÈÚÝ[›Ý\[ˆ[™\ÝX[HYX[œÈÛÛ›™XÝ

HØ\È›ÝØ[YˆŠNØÛX\•[Y[Ý]
\Ë[Y[Ý]Y
__NÐÙ‹”ÛØÚÙ]Ü˜\\ZL_JNÝ˜\ˆÌORJ^OOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\J^K—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÒ^K”Ý™X[Z[™ÔÛØÚÙ]]›ÚYÝ˜\ˆYOSXÊ
K™YO[ÌJ
KLOXÛ\ÜÞØÛÛ›™XÝYÙ]™[ÎÙ]™[›ÙXÙ\“\Ý[™\ŽÜÛØÚÙ]ØÛÛœÝXÝÜŠ‹LYM
^Ý\ËœÛØÚÙ][™]È™YK”ÛØÚÙ]Ü˜\\Š‹OžÝ\Ë™]™[›ÙXÙ\“\Ý[™\‰‰\Ë™]™[›ÙXÙ\“\Ý[™\‹›™^
Š_KOžÝ\Ë™]™[›ÙXÙ\“\Ý[™\‰‰\Ë™]™[›ÙXÙ\“\Ý[™\‹™\œ›ÜŠŠ_K

OOžßKOžÝ\Ë™]™[›ÙXÙ\“\Ý[™\‰‰Š‹Ø\ÐÛX[Ý\Ë™]™[›ÙXÙ\“\Ý[™\‹˜ÛÛ\]J
N\Ë™]™[›ÙXÙ\“\Ý[™\‹™\œ›ÜŠ”ÛØÚÙ]Ø\ÈÛÜÙY[˜ÛX[ˆŠJ_K
K\Ë˜ÛÛ›™XÝY]\ËœÛØÚÙ]˜ÛÛ›™XÝYÛ]O^ÜÝ\œO\Ë™]™[›ÙXÙ\“\Ý[™\\‹ÝÜŠ
OO\Ë™]™[›ÙXÙ\“\Ý[™\]›ÚYNÝ\Ë™]™[ÏTYK”Ý™X[K˜Ü™X]JJ_XÛÛ›™XÝ

^Ý\ËœÛØÚÙ]˜ÛÛ›™XÝ

_Y\ØÛÛ›™XÝ

^Ý\ËœÛØÚÙ]™\ØÛÛ›™XÝ

_X\Þ[˜ÈÙ[™
Š^Ü™]\›ˆ\ËœÛØÚÙ]œÙ[™
Š__NÒ^K”Ý™X[Z[™ÔÛØÚÙ]XL_JNÝ˜\ˆÌORJÙOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\JÙ‹—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÔÙ‹”]Y]YZ[™ÔÝ™X[Z[™ÔÛØÚÙ]TÙ‹ÛÛ›™XÝ[Û”Ý]\Ï]›ÚYÝ˜\ˆQÏ]^J
K™YOSXÊ
KÑÏ\ÌJ
K™Ê[˜Ý[ÛŠJ^ÙVÙK•[˜ÛÛ›™XÝYLOH•[˜ÛÛ›™XÝY‹VÙKÛÛ›™XÝ[™ÏLWOHÛÛ›™XÝ[™È‹VÙKÛÛ›™XÝYL—OHÛÛ›™XÝY‹VÙK‘\ØÛÛ›™XÝYL×OH‘\ØÛÛ›™XÝYŸJJ™
Ù‹ÛÛ›™XÝ[Û”Ý]\ÏY™^ßJJNÝ˜\ˆOXÛ\ÜÞØÛÛ›™XÝ[Û”Ý]\ÎÙ]™[ÎÝ\›Ý[Y[Ý]Ü]Y]YOV×NÜÛØÚÙ]Ú\Ô›ØÙ\ÜÚ[™Ô]Y]YOHLNÙ]™[›ÙXÙ\“\Ý[™\ŽØÛÛ›™XÝ[Û”Ý]\Ô›ÙXÙ\ŽÜ™XÛÛ›™XÝY[™\ŽØÛÛœÝXÝÜŠ‹LYMJ^Ý\Ë\›[‹\Ë[Y[Ý]]\Ëœ™XÛÛ›™XÝY[™\ZNÛ]^ÜÝ\›ÏO\Ë™]™[›ÙXÙ\“\Ý[™\[ËÝÜŠ
OO\Ë™]™[›ÙXÙ\“\Ý[™\]›ÚYNÝ\Ë™]™[Ï]™YK”Ý™X[K˜Ü™X]JŠK\Ë˜ÛÛ›™XÝ[Û”Ý]\Ô›ÙXÙ\[™]ÈQË‘Y˜][˜[YT›ÙXÙ\Š™•[˜ÛÛ›™XÝY
K\Ë˜ÛÛ›™XÝ[Û”Ý]\Ï[™]ÈQË•˜[YP[™\]\Ê\Ë˜ÛÛ›™XÝ[Û”Ý]\Ô›ÙXÙ\ŠK\ËœÛØÚÙ][™]ÈÑË”Ý™X[Z[™ÔÛØÚÙ]
\Ë\›\Ë[Y[Ý]
K\ËœÛØÚÙ]™]™[ËœÝXœØÜšX™JÛ™^›ÏOžÚYŠ]\Ë™]™[›ÙXÙ\“\Ý[™\Š]›ÝÈ™]È\œ›ÜŠ“›È]™[›ÙXÙ\ˆ\Ý[™\ˆÙ]ŠNÝ\Ë™]™[›ÙXÙ\“\Ý[™\‹›™^
Ê_K\œ›ÜŽŠ
OOžÝ\Ë˜ÛÛ›™XÝ[Û”Ý]\Ô›ÙXÙ\‹\]J™‘\ØÛÛ›™XÝY
__J_XÛÛ›™XÝ

^Ý\Ë˜ÛÛ›™XÝ[Û”Ý]\Ô›ÙXÙ\‹\]J™ÛÛ›™XÝ[™ÊK\ËœÛØÚÙ]˜ÛÛ›™XÝY[Š\Þ[˜Ê
OOŠ\Ë˜ÛÛ›™XÝ[Û”Ý]\Ô›ÙXÙ\‹\]J™ÛÛ›™XÝY
K\Ëœ›ØÙ\ÜÔ]Y]YJ
JK

OOžÝ\Ë˜ÛÛ›™XÝ[Û”Ý]\Ô›ÙXÙ\‹\]J™‘\ØÛÛ›™XÝY
_JK\ËœÛØÚÙ]˜ÛÛ›™XÝ

_Y\ØÛÛ›™XÝ

^Ý\Ë˜ÛÛ›™XÝ[Û”Ý]\Ô›ÙXÙ\‹\]J™‘\ØÛÛ›™XÝY
K\ËœÛØÚÙ]™\ØÛÛ›™XÝ

_\™XÛÛ›™XÝ

^Ý\ËœÛØÚÙ][™]ÈÑË”Ý™X[Z[™ÔÛØÚÙ]
\Ë\›\Ë[Y[Ý]
K\ËœÛØÚÙ]™]™[ËœÝXœØÜšX™JÛ™^›OžÚYŠ]\Ë™]™[›ÙXÙ\“\Ý[™\Š]›ÝÈ™]È\œ›ÜŠ“›È]™[›ÙXÙ\ˆ\Ý[™\ˆÙ]ŠNÝ\Ë™]™[›ÙXÙ\“\Ý[™\‹›™^
Š_K\œ›ÜŽŠ
OOžÝ\Ë˜ÛÛ›™XÝ[Û”Ý]\Ô›ÙXÙ\‹\]J™‘\ØÛÛ›™XÝY
__JK\ËœÛØÚÙ]˜ÛÛ›™XÝY[Š

OOžÝ\Ëœ™XÛÛ›™XÝY[™\‰‰\Ëœ™XÛÛ›™XÝY[™\Š
_JK\Ë˜ÛÛ›™XÝ

_YÙ]]Y]YS[™Ý

^Ü™]\›ˆ\Ëœ]Y]YK›[™Ý\]Y]YT™\]Y\Ý
Š^Ý\Ëœ]Y]YKœ\Ú
ŠK\Ëœ›ØÙ\ÜÔ]Y]YJ
_X\Þ[˜È›ØÙ\ÜÔ]Y]YJ
^ÚYŠ\Ëš\Ô›ØÙ\ÜÚ[™Ô]Y]Y_\Ë˜ÛÛ›™XÝ[Û”Ý]\Ë˜[YHOOY™ÛÛ›™XÝY
\™]\›ŽÝ\Ëš\Ô›ØÙ\ÜÚ[™Ô]Y]YOHLÛ]ŽÙ›ÜŠÛ]\Ëœ]Y]YKœÚY

NÊ]ž^Ø]ØZ]\ËœÛØÚÙ]œÙ[™
ŠK\Ëš\Ô›ØÙ\ÜÚ[™Ô]Y]YOHL_XØ]ÚÝ\Ëœ]Y]YK[œÚY
ŠK\Ëš\Ô›ØÙ\ÜÚ[™Ô]Y]YOHLNÜ™]\›Ÿ__NÔÙ‹”]Y]YZ[™ÔÝ™X[Z[™ÔÛØÚÙ]Y_JNÝ˜\ˆ‘ÏRJOOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\JK—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÚK”™XÛÛ›™XÝ[™ÔÛØÚÙ]]›ÚYÝ˜\ˆÙYOSXÊ
KLOXÌJ
KLOXÛ\ÜÈ^ÜÝ]XÈØ[Ý[]U[Y[Ý]
Š^Ü™]\›ˆX]›Z[ŠŠŠ›ŠŒLYLÊ_XÛÛ›™XÝ[Û”Ý]\ÎÙ]™[ÎÜÛØÚÙ]Ù]™[›ÙXÙ\“\Ý[™\ŽÝ[˜ÛÛ›™XÝYHLÙ\ØÛÛ›™XÝYHLNÝ[Y[Ý][™^LÜ™XÛÛ›™XÝ[Y[Ý][[ØÛÛœÝXÝÜŠ‹LYMJ^Û]^ÜÝ\›ÏO\Ë™]™[›ÙXÙ\“\Ý[™\[ËÝÜŠ
OO\Ë™]™[›ÙXÙ\“\Ý[™\]›ÚYNÝ\Ë™]™[ÏSÙYK”Ý™X[K˜Ü™X]JŠK\ËœÛØÚÙ][™]ÈLK”]Y]YZ[™ÔÝ™X[Z[™ÔÛØÚÙ]
‹JK\ËœÛØÚÙ]™]™[ËœÝXœØÜšX™JÛ™^›ÏOžÝ\Ë™]™[›ÙXÙ\“\Ý[™\‰‰\Ë™]™[›ÙXÙ\“\Ý[™\‹›™^
Ê_K\œ›ÜŽ›ÏOžÝ\Ë™]™[›ÙXÙ\“\Ý[™\‰‰\Ë™]™[›ÙXÙ\“\Ý[™\‹™\œ›ÜŠÊ__JK\Ë˜ÛÛ›™XÝ[Û”Ý]\Ï]\ËœÛØÚÙ]˜ÛÛ›™XÝ[Û”Ý]\Ë\Ë˜ÛÛ›™XÝ[Û”Ý]\Ë\]\ËœÝXœØÜšX™JÛ™^›ÏOžÛÏOO]LKÛÛ›™XÝ[Û”Ý]\ËÛÛ›™XÝY	‰Š\Ë[Y[Ý][™^L
KÏOO]LKÛÛ›™XÝ[Û”Ý]\Ë‘\ØÛÛ›™XÝY	‰Š\Ëœ™XÛÛ›™XÝ[Y[Ý]	‰ŠÛX\•[Y[Ý]
\Ëœ™XÛÛ›™XÝ[Y[Ý]
K\Ëœ™XÛÛ›™XÝ[Y[Ý][[
K\Ëœ™XÛÛ›™XÝ[Y[Ý]\Ù][Y[Ý]


OOžÝ\ËœÛØÚÙ]œ™XÛÛ›™XÝ

_KK˜Ø[Ý[]U[Y[Ý]
\Ë[Y[Ý][™^
ÊÊJJ__J_XÛÛ›™XÝ

^ÚYŠ]\Ë[˜ÛÛ›™XÝY
]›ÝÈ™]È\œ›ÜŠØ[››ÝÛÛ›™XÝˆÛØÚÙ]\È[™XYHÛÛ›™XÝYŠNÝ\ËœÛØÚÙ]˜ÛÛ›™XÝ

K\Ë[˜ÛÛ›™XÝYHL_Y\ØÛÛ›™XÝ

^ÚYŠ\Ë[˜ÛÛ›™XÝY
]›ÝÈ™]È\œ›ÜŠØ[››Ý\ØÛÛ›™XÝˆÛØÚÙ]\È›ÝY]ÛÛ›™XÝYŠNÝ\ËœÛØÚÙ]™\ØÛÛ›™XÝ

K\Ë™]™[›ÙXÙ\“\Ý[™\‰‰\Ë™]™[›ÙXÙ\“\Ý[™\‹˜ÛÛ\]J
K\Ë™\ØÛÛ›™XÝYHL\]Y]YT™\]Y\Ý
Š^ÚYŠ\Ë™\ØÛÛ›™XÝY
]›ÝÈ™]È\œ›ÜŠØ[››Ý]Y]YH™\]Y\ÝˆÛØÚÙ]\È\ØÛÛ›™XÝYŠNÝ\ËœÛØÚÙ]œ]Y]YT™\]Y\Ý
Š__NÚK”™XÛÛ›™XÝ[™ÔÛØÚÙ]PL_JNÝ˜\ˆÏRJØOOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\JØK—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÒØK”Ý™X[Z[™ÔÛØÚÙ]RØK”ÛØÚÙ]Ü˜\\RØK”™XÛÛ›™XÝ[™ÔÛØÚÙ]RØK”]Y]YZ[™ÔÝ™X[Z[™ÔÛØÚÙ]RØKÛÛ›™XÝ[Û”Ý]\Ï]›ÚYÝ˜\ˆ‘ÏXÌJ
NÓØš™XÝ™Yš[™T›Ü\JØKÛÛ›™XÝ[Û”Ý]\È‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ‘ËÛÛ›™XÝ[Û”Ý]\ß_JNÓØš™XÝ™Yš[™T›Ü\JØK”]Y]YZ[™ÔÝ™X[Z[™ÔÛØÚÙ]‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ‘Ë”]Y]YZ[™ÔÝ™X[Z[™ÔÛØÚÙ]_JNÝ˜\ˆYOT‘Ê
NÓØš™XÝ™Yš[™T›Ü\JØK”™XÛÛ›™XÝ[™ÔÛØÚÙ]‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆYK”™XÛÛ›™XÝ[™ÔÛØÚÙ]_JNÝ˜\ˆYYO[ÌJ
NÓØš™XÝ™Yš[™T›Ü\JØK”ÛØÚÙ]Ü˜\\ˆ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆYYK”ÛØÚÙ]Ü˜\\Ÿ_JNÝ˜\ˆYO\ÌJ
NÓØš™XÝ™Yš[™T›Ü\JØK”Ý™X[Z[™ÔÛØÚÙ]‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆYK”Ý™X[Z[™ÔÛØÚÙ]_J_JNÝ˜\ˆÑÏRJžOOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\JžK—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÐžK•ÙXœÛØÚÙ]ÛY[]›ÚYÝ˜\ˆ^OYžJ
K‘ÏTÊ
KYO]^J
K™YOSXÊ
KYYOR™Ê
NÙ[˜Ý[Ûˆ™YJJ^Ý›ÝÈ_Y[˜Ý[Ûˆ‘ÊJ^ÚYŠK\HOOH›Y\ÜØYÙHŠ]›ÝÈ™]È\œ›ÜŠ[™^XÝYY\ÜØYÙH\HÛˆÙXœÛØÚÙ]ˆ	ÙK\_X
NÜ™]\›Š^Kœ\œÙRœÛÛ”œÔ™\ÜÛœÙJJ”ÓÓ‹œ\œÙJK™]JJ_]˜\ˆŒOXÛ\ÜÞÜ™\]Y\ÝÜÛØÚÙ]Ü[›š[™ÏHLNÜÝXœØÜš\[ÛœÏV×NØÛÛœÝXÝÜŠ‹
^Ý\Ëœ™\]Y\Ý[‹\ËœÛØÚÙ]]\Ý\
Š^ÚYŠ\Ëœ[›š[™Ê]›ÝÈ\œ›ÜŠ[™XYHÝ\YˆX\ÙHÝÜš\œÝ™Y›Ü™H™\Ý\[™ËˆŠNÝ\Ëœ[›š[™ÏHL\Ë˜ÛÛ›™XÝÐÛY[
ŠK\ËœÛØÚÙ]œ]Y]YT™\]Y\Ý
”ÓÓ‹œÝš[™ÚYžJ\Ëœ™\]Y\Ý
J_\ÝÜ

^Ý\Ëœ[›š[™ÏHLNÛ]^Ë‹‹\Ëœ™\]Y\ÝY]Ùˆ[œÝXœØÜšX™HŸNÝž^Ý\ËœÛØÚÙ]œ]Y]YT™\]Y\Ý
”ÓÓ‹œÝš[™ÚYžJŠJ_XØ]Ú

^ÚYŠJ[œÝ[˜Ù[Ùˆ\œ›Ü‰‰›Y\ÜØYÙK›X]Ú
ÜÛØÚÙ]\È\ØÛÛ›™XÝYÚJJJ]›ÝÈ_XÛÛ›™XÝÐÛY[
Š^Û]]\ËœÛØÚÙ]™]™[Ë›X\
‘ÊKO]™š[\ŠOO˜KšYOO]\Ëœ™\]Y\ÝšY
KœÝXœØÜšX™JÛ™^˜OOžÊ^Kš\ÒœÛÛ”œÑ\œ›Ü”™\ÜÛœÙJJJI‰Š\Ë˜ÛÜÙTÝXœØÜš\[ÛœÊ
K‹™\œ›ÜŠ”ÓÓ‹œÝš[™ÚYžJK™\œ›ÜŠJJKK[œÝXœØÜšX™J
__JK]™š[\ŠOO˜KšYOO]\Ëœ™\]Y\ÝšY
KœÝXœØÜšX™JÛ™^˜OOžÊ^Kš\ÒœÛÛ”œÑ\œ›Ü”™\ÜÛœÙJJJOÊ\Ë˜ÛÜÙTÝXœØÜš\[ÛœÊ
K‹™\œ›ÜŠ”ÓÓ‹œÝš[™ÚYžJK™\œ›ÜŠJJN›‹›™^
Kœ™\Ý[
__JKÏ]œÝXœØÜšX™JÙ\œ›ÜŽ˜OOžÝ\Ë˜ÛÜÙTÝXœØÜš\[ÛœÊ
K‹™\œ›ÜŠJ_KÛÛ\]NŠ
OOžÝ\Ë˜ÛÜÙTÝXœØÜš\[ÛœÊ
K‹˜ÛÛ\]J
__JNÝ\ËœÝXœØÜš\[ÛœËœ\Ú
K‹Ê_XÛÜÙTÝXœØÜš\[ÛœÊ
^Ù›ÜŠ]ˆÙˆ\ËœÝXœØÜš\[ÛœÊ[‹[œÝXœØÜšX™J
NÝ\ËœÝXœØÜš\[ÛœÏV×__KOXÛ\ÜÞÝ\›ÜÛØÚÙ]ÚœÛÛ”œÔ™\ÜÛœÙTÝ™X[NÜÝXœØÜš\[Û”Ý™X[\Ï[™]ÈX\ØÛÛœÝXÝÜŠ‹Q™YJ^ÚYŠJYYKš\Ô›ÝØÛÛ
JŠJ]›ÝÈ™]È\œ›ÜŠ˜\ÙHT“\ÈZ\ÜÚ[™ÈH›ÝØÛÛˆ^XÝY	ÝÜÎ‹ËÉÈÜˆ	ÝÜÜÎ‹ËÉËˆŠNÛ]O[‹™[™ÕÚ]
‹ÈŠOÈÙXœÛØÚÙ]Žˆ‹ÝÙXœÛØÚÙ]ŽÝ\Ë\›[ŠÚK\ËœÛØÚÙ][™]È‘Ë”™XÛÛ›™XÝ[™ÔÛØÚÙ]
\Ë\›
NÛ]]\ËœÛØÚÙ]™]™[ËœÝXœØÜšX™JÙ\œ›ÜŽ›ÏOžÝ
ÊK‹[œÝXœØÜšX™J
__JNÝ\ËšœÛÛ”œÔ™\ÜÛœÙTÝ™X[O]\ËœÛØÚÙ]™]™[Ë›X\
‘ÊK\ËœÛØÚÙ]˜ÛÛ›™XÝ

_X\Þ[˜È^XÝ]JŠ^Û]]\Ëœ™\ÜÛœÙQ›Ü”™\]Y\ÝY
‹šY
NÝ\ËœÛØÚÙ]œ]Y]YT™\]Y\Ý
”ÓÓ‹œÝš[™ÚYžJŠJNÛ]OX]ØZ]ÚYŠ
^Kš\ÒœÛÛ”œÑ\œ›Ü”™\ÜÛœÙJJJJ]›ÝÈ™]È\œ›ÜŠ”ÓÓ‹œÝš[™ÚYžJK™\œ›ÜŠJNÜ™]\›ˆ_[\Ý[ŠŠ^ÚYŠ‹›Y]ÙOOHœÝXœØÜšX™HŠ]›ÝÈ™]È\œ›ÜŠ	Ô™\]Y\ÝY]Ù]\Ý™HœÝXœØÜšX™HˆÈÝ\]™[\Ý[š[™ÉÊNÛ][‹œ\˜[\Ëœ]Y\žNÚYŠ\[ÙˆOHœÝš[™ÈŠ]›ÝÈ™]È\œ›ÜŠœ™\]Y\Ýœ\˜[\Ëœ]Y\žH]\Ý™HHÝš[™ÈŠNÚYŠ]\ËœÝXœØÜš\[Û”Ý™X[\Ëš\Ê
J^Û]O[™]ÈŒJ‹\ËœÛØÚÙ]
KR™YK”Ý™X[K˜Ü™X]JJNÝ\ËœÝXœØÜš\[Û”Ý™X[\ËœÙ]
Š_\™]\›ˆ\ËœÝXœØÜš\[Û”Ý™X[\Ë™Ù]

K™š[\ŠOOšKœ]Y\žHOO]›ÚY
_X\Þ[˜ÈÛÛ›™XÝY

^Ø]ØZ]\ËœÛØÚÙ]˜ÛÛ›™XÝ[Û”Ý]\ËØZ]›ÜŠ‘ËÛÛ›™XÝ[Û”Ý]\ËÛÛ›™XÝY
_Y\ØÛÛ›™XÝ

^Ý\ËœÛØÚÙ]™\ØÛÛ›™XÝ

_X\Þ[˜È™\ÜÛœÙQ›Ü”™\]Y\ÝY
Š^Ü™]\›ŠYK™š\œÝ]™[
J\ËšœÛÛ”œÔ™\ÜÛœÙTÝ™X[K™š[\ŠOšYOO[ŠJ__NÐžK•ÙXœÛØÚÙ]ÛY[[_JNÝ˜\ˆYÏRJOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\J—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÛ•ÙXœÛØÚÙ]ÛY[[š[œÝ[˜ÙSÙ”œÔÝ™X[Z[™ÐÛY[[’ÛY[[’˜]ÚÛY[]›ÚYÝ˜\ˆYYO[QÊ
NÓØš™XÝ™Yš[™T›Ü\J’˜]ÚÛY[‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆYYK’˜]ÚÛY[_JNÝ˜\ˆYOTÑÊ
NÓØš™XÝ™Yš[™T›Ü\J’ÛY[‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆYK’ÛY[_JNÝ˜\ˆÙYOR™Ê
NÓØš™XÝ™Yš[™T›Ü\Jš[œÝ[˜ÙSÙ”œÔÝ™X[Z[™ÐÛY[‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆÙYKš[œÝ[˜ÙSÙ”œÔÝ™X[Z[™ÐÛY[_JNÝ˜\ˆÙYOSÑÊ
NÓØš™XÝ™Yš[™T›Ü\J•ÙXœÛØÚÙ]ÛY[‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆÙYK•ÙXœÛØÚÙ]ÛY[_J_JNÝ˜\ˆYRJÙOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\JÙ—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÙÙšÚXÚÔÙ]ZÙŽÙÙšÚXÚÐ›ÛÛX[U™YNÙÙšÚXÚÔÝš[™ÏQÎÙÙšÚXÚÓ[X™\UQÎÙÙšÚXÚÐ\œ˜^OUÙYNÙÙšÚXÚÓØš™XÝRÙYNÙÙšÚXÚÓ›Û‘[\TÝš[™ÏSYNÙÙšÚXÚÓ›Û–™\›Ó[X™\VYYNÙ[˜Ý[ÛˆÙŠJ^ÚYŠOOO]›ÚY
]›ÝÈ™]È\œ›ÜŠ•˜[YH]\Ý›Ý™H[™Yš[™YŠNÚYŠOOO[[
]›ÝÈ™]È\œ›ÜŠ•˜[YH]\Ý›Ý™H[ŠNÜ™]\›ˆ_Y[˜Ý[Ûˆ™YJJ^ÚYŠÙŠJK\[ÙˆHOH˜›ÛÛX[ˆŠ]›ÝÈ™]È\œ›ÜŠ•˜[YH]\Ý™HH›ÛÛX[ˆŠNÜ™]\›ˆ_Y[˜Ý[ÛˆÊJ^ÚYŠÙŠJK\[ÙˆHOHœÝš[™ÈŠ]›ÝÈ™]È\œ›ÜŠ•˜[YH]\Ý™HHÝš[™ÈŠNÜ™]\›ˆ_Y[˜Ý[ÛˆQÊJ^ÚYŠÙŠJK\[ÙˆHOH›[X™\ˆŠ]›ÝÈ™]È\œ›ÜŠ•˜[YH]\Ý™HH[X™\ˆŠNÜ™]\›ˆ_Y[˜Ý[ÛˆÙYJJ^ÚYŠÙŠJKP\œ˜^Kš\Ð\œ˜^JJJ]›ÝÈ™]È\œ›ÜŠ•˜[YH]\Ý™H[ˆ\œ˜^HŠNÜ™]\›ˆ_Y[˜Ý[ÛˆÙYJJ^ÚYŠÙŠJK\[ÙˆHOH›Øš™XÝŠ]›ÝÈ™]È\œ›ÜŠ•˜[YH]\Ý™H[ˆØš™XÝŠNÚYŠØš™XÝœ›ÝÝ\KÔÝš[™Ë˜Ø[
JHOOH–ÛØš™XÝØš™XÝHŠ]›ÝÈ™]È\œ›ÜŠ•˜[YH]\Ý™HHÚ[\HØš™XÝŠNÜ™]\›ˆ_Y[˜Ý[ÛˆYJJ^ÚYŠÊJKK›[™ÝOOL
]›ÝÈ™]È\œ›ÜŠ•˜[YH]\Ý›Ý™H[\HŠNÜ™]\›ˆ_Y[˜Ý[ÛˆYYJJ^ÚYŠQÊJKOOOL
]›ÝÈ™]È\œ›ÜŠ•˜[YH]\Ý›Ý™H™\›ÈŠNÜ™]\›ˆ__JNÝ˜\ˆÝORJ™ÏOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\J™Ë—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÑ™Ë˜\UÔÛX[[V™YNÑ™Ë˜\UÐšYÒ[VYNÑ™ËœÛX[[Ð\OIYNÝ˜\ˆÌOPZJ
K™YOQYŠ
NÙ[˜Ý[Ûˆ™YJJ^Ü™]\›Š\[ÙˆOOH›[X™\ˆÛ™]ÈÌK’[LÊJN™ÌK’[LË™œ›ÛTÝš[™ÊJJKÓ[X™\Š
_Y[˜Ý[ÛˆYJJ^ÚYŠ
™YKšÚXÚÔÝš[™ÊJJKYK›X]Ú
×‹OÖÌNWJÉÊJ]›ÝÈ™]È\œ›ÜŠ’[˜[YÝš[™È›Ü›X]ŠNÜ™]\›ˆšYÒ[
J_Y[˜Ý[Ûˆ	YJJ^Ü™]\›ˆ™]ÈÌK’[LÊJKÔÝš[™Ê
__JNÝ˜\ˆ^ORJOOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\JK—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÜK˜Ü™X]RœÛÛ”œÔ™\]Y\Ý[›™NÝ˜\ˆÏHŒLŒÍMÎHŽÙ[˜Ý[Ûˆ™YJ
^Ü™]\›ˆÖÓX]™›ÛÜŠX]œ˜[™ÛJ
J•Ë›[™Ý
W_Y[˜Ý[Ûˆ[™J
^Ü™]\›ˆ\œÙR[
\œ˜^K™œ›ÛJÛ[™ÝŒLŸJK›X\


OOš™YJ
JKš›Ú[ŠˆŠKL
_Y[˜Ý[Ûˆ›™JKŠ^Û][ÞË‹‹›ŸNžßNÜ™]\›žÚœÛÛœœÎˆŒ‹Œ‹Y™[™J
KY]Ù™K\˜[\Î__JNÝ˜\ˆÞORJOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\J—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÜ›X^O\›™NÜ™XÝ[Û˜\žUÔÝš[™ÓX\Z[™NÜ™[˜ÛÙTÝš[™Ï[Û™NÜ™[˜ÛÙU]˜\š[TYŽÜ™[˜ÛÙU[YOX[™NÜ™[˜ÛÙPž]\Ï\Û™NÜ™[˜ÛÙU™\œÚ[ÛY™NÜ™[˜ÛÙP›ØÚÒYXÛ™NÝ˜\ˆ™OZÛŠ
NÙ[˜Ý[Ûˆ›™JKŠ^Ü™]\›ˆO[[Ý›ÚY™JŠ_Y[˜Ý[Ûˆ[™JJ^Û][™]ÈX\Ù›ÜŠ]ÙˆØš™XÝšÙ^\ÊJJ^Û]OYVÝNÚYŠ\[ÙˆHOHœÝš[™ÈŠ]›ÝÈ™]È\œ›ÜŠ‘›Ý[™XÝ[Û˜\žH˜[YHÙˆ\HÝ\ˆ[ˆÝš[™ÈŠNÛ‹œÙ]
J_\™]\›ˆŸY[˜Ý[ÛˆÛ™JJ^Û]J™KÕ]Ž
JJNÜ™]\›ˆZ[\œ˜^K™œ›ÛJÛ‹›[™Ý‹‹›—J_Y[˜Ý[ÛˆYŠJ^Ü™]\›ˆOLLŽÕZ[\œ˜^K™œ›ÛJÙIŒM_LŽ‹‹”YŠOÊWJN•Z[\œ˜^K™œ›ÛJÙIŒMWJ_Y[˜Ý[Ûˆ[™JJ^Û]YK™Ù][YJ
KSX]™›ÛÜŠ‹ÌYLÊKO]ÖÎ‹‹”YŠ
WN›™]ÈZ[\œ˜^KJK›˜[›ÜÙXÛÛ™ß
JÛ‰LYLÊŒYM‹Ï\ÖÌM‹‹‹”YŠŠWN›™]ÈZ[\œ˜^NÜ™]\›ˆZ[\œ˜^K™œ›ÛJË‹‹šK‹‹›×J_Y[˜Ý[ÛˆÛ™JJ^ÚYŠK›[™ÝLLŽ
]›ÝÈ™]È\œ›ÜŠ“›Ý[\[Y[Y›Üˆž]H\œ˜^\ÈÙˆ[™ÝLŽÜˆ[Ü™HŠNÜ™]\›ˆK›[™ÝÕZ[\œ˜^K™œ›ÛJÙK›[™Ý‹‹™WJN›™]ÈZ[\œ˜^_Y[˜Ý[Ûˆ™JJ^Û]YK˜›ØÚÏÕZ[\œ˜^K™œ›ÛJÎ‹‹”YŠK˜›ØÚÊWJN›™]ÈZ[\œ˜^KYK˜\ÕZ[\œ˜^K™œ›ÛJÌM‹‹‹”YŠK˜\
WJN›™]ÈZ[\œ˜^NÜ™]\›ˆZ[\œ˜^K™œ›ÛJË‹‹›‹‹‹J_Y[˜Ý[ÛˆÛ™JJ^Ü™]\›ˆZ[\œ˜^K™œ›ÛJÌLKš\Ú›[™Ý‹‹™Kš\ÚNKœ\Ëš\Ú›[™Ý
ÍKœ\ËÝ[NKœ\Ëš\Ú›[™Ý‹‹™Kœ\Ëš\ÚJ__JNÝ˜\ˆÞORJOOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\JK—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÔK”ÝXœØÜš\[Û‘]™[\OTK“Y]Ù]›ÚYÔK˜Z[]Y\žO][™NÝ˜\ˆÎÊ[˜Ý[ÛŠJ^ÙKX˜ÚR[™›ÏH˜X˜ÚWÚ[™›È‹KX˜ÚT]Y\žOH˜X˜ÚWÜ]Y\žH‹K›ØÚÏH˜›ØÚÈ‹K›ØÚØÚZ[H˜›ØÚØÚZ[ˆ‹K›ØÚÔ™\Ý[ÏH˜›ØÚ×Ü™\Ý[È‹K›ØÚÔÙX\˜ÚH˜›ØÚ×ÜÙX\˜Ú‹Kœ›ØYØ\Ý\Þ[˜ÏH˜œ›ØYØ\ÝÝØ\Þ[˜È‹Kœ›ØYØ\ÝÞ[˜ÏH˜œ›ØYØ\ÝÝÜÞ[˜È‹Kœ›ØYØ\ÝÛÛ[Z]H˜œ›ØYØ\ÝÝØÛÛ[Z]‹KÛÛ[Z]H˜ÛÛ[Z]‹K‘Ù[™\Ú\ÏH™Ù[™\Ú\È‹K’X[HšX[‹K“[U[˜ÛÛ™š\›YYÏH›[WÝ[˜ÛÛ™š\›YYÝÈ‹K”Ý]\ÏHœÝ]\È‹K”ÝXœØÜšX™OHœÝXœØÜšX™H‹K•H‹K•ÙX\˜ÚHÜÙX\˜Ú‹K•˜[Y]ÜœÏH˜[Y]ÜœÈ‹K•[œÝXœØÜšX™OH[œÝXœØÜšX™HŸJJß
K“Y]Ù^Ï^ßJJNÝ˜\ˆ‘ÎÊ[˜Ý[ÛŠJ^ÙK“™]Ð›ØÚÏH“™]Ð›ØÚÈ‹K“™]Ð›ØÚÒXY\H“™]Ð›ØÚÒXY\ˆ‹K•H•ŸJJ‘ß
K”ÝXœØÜš\[Û‘]™[\OR‘Ï^ßJJNÙ[˜Ý[Ûˆ[™JJ^Û]JKYÜÏÙKYÜÎ–×JK›X\
O˜	Ü‹šÙ^_OIÉÜ‹˜[Y_IØ
KOYKœ˜]ÏÖÙKœ˜]×N–×NÜ™]\›–Ë‹‹‹‹šWKš›Ú[ŠˆS‘Š__JNÝ˜\ˆQÏRJYOžÈ\ÙHÝšXÝŽÝ˜\ˆ[™ORY	‰’Y—×ØÜ™X]Pš[™[™ß
Øš™XÝ˜Ü™X]OÊ[˜Ý[ÛŠK‹J^ÚOOO]›ÚY	‰ŠO]
NÝ˜\ˆSØš™XÝ™Ù]ÝÛ”›Ü\Q\ØÜš\ÜŠ‹
NÊ\Ÿ
™Ù]š[ˆÈ[‹—×Ù\Ó[Ù[Nœ‹Üš]X›_‹˜ÛÛ™šYÝ\˜X›JJI‰Š^Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ–Ý__JKØš™XÝ™Yš[™T›Ü\JKKŠ_JNŠ[˜Ý[ÛŠK‹J^ÚOOO]›ÚY	‰ŠO]
KVÚWO[–Ý_JJK›™ORY	‰’Y—×ÜÙ][Ù[QY˜][
Øš™XÝ˜Ü™X]OÊ[˜Ý[ÛŠKŠ^ÓØš™XÝ™Yš[™T›Ü\JK™Y˜][‹Ù[[Y\˜X›NˆL˜[YN›ŸJ_JN™[˜Ý[ÛŠKŠ^ÙK™Y˜][[ŸJK™ORY	‰’Y—×Ú[\ÜÝ\Ÿ
[˜Ý[ÛŠ
^Ý˜\ˆOY[˜Ý[ÛŠŠ^Ü™]\›ˆOSØš™XÝ™Ù]ÝÛ”›Ü\S˜[Y\ß[˜Ý[ÛŠ
^Ý˜\ˆOV×NÙ›ÜŠ˜\ˆˆ[ˆ
SØš™XÝœ›ÝÝ\Kš\ÓÝÛ”›Ü\K˜Ø[
ŠI‰ŠVÚK›[™ÝO\ŠNÜ™]\›ˆ_KJŠ_NÜ™]\›ˆ[˜Ý[ÛŠŠ^ÚYŠ‰‰›‹—×Ù\Ó[Ù[J\™]\›ˆŽÝ˜\ˆ^ßNÚYŠˆO[[
Y›ÜŠ˜\ˆOYJŠKLÜK›[™ÝÜŠÊÊZVÜ—HOOH™Y˜][‰‰[™J‹VÜ—JNÜ™]\›ˆ›™JŠK_JJ
NÓØš™XÝ™Yš[™T›Ü\JY—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÒY”\˜[\Ï]›ÚYÝ˜\ˆLOZÛŠ
K\Ï]ÝJ
KÛÏ[^J
KÏPÞJ
KÛ™O[™JÞJ
JNÙ[˜Ý[ÛˆLJJ^Ü™]\›žÚZYÚŠË›X^JJ\ËœÛX[[Ð\KKšZYÚ
__Y[˜Ý[Ûˆ™JJ^Ü™]\›žÛZ[’ZYÚŠË›X^JJ\ËœÛX[[Ð\KK›Z[’ZYÚ
KX^ZYÚŠË›X^JJ\ËœÛX[[Ð\KK›X^ZYÚ
__Y[˜Ý[Ûˆ[™JJ^Ü™]\›žÜ]Y\žN™Kœ]Y\žKYÙNŠË›X^JJ\ËœÛX[[Ð\KKœYÙJK\—ÜYÙNŠË›X^JJ\ËœÛX[[Ð\KKœ\—ÜYÙJKÜ™\—ØžN™K›Ü™\—Øž__Y[˜Ý[Ûˆ™JJ^Ü™]\›žÜ]™Kœ]]NŠLKÒ^
JK™]JKZYÚŠË›X^JJ\ËœÛX[[Ð\KKšZYÚ
K›Ý™N™Kœ›Ý™__Y[˜Ý[Ûˆ[™JJ^Ü™]\›žÝŠLKÐ˜\ÙM
JK
__Y[˜Ý[Ûˆ›™JJ^Ü™]\›žÚ\ÚŠLKÐ˜\ÙM
JKš\Ú
K›Ý™N™Kœ›Ý™__Y[˜Ý[Ûˆ[™JJ^Ü™]\›žÜ]Y\žN™Kœ]Y\žK›Ý™N™Kœ›Ý™KYÙNŠË›X^JJ\ËœÛX[[Ð\KKœYÙJK\—ÜYÙNŠË›X^JJ\ËœÛX[[Ð\KKœ\—ÜYÙJKÜ™\—ØžN™K›Ü™\—Øž__Y[˜Ý[ÛˆÛ™JJ^Ü™]\›žÚZYÚŠË›X^JJ\ËœÛX[[Ð\KKšZYÚ
KYÙNŠË›X^JJ\ËœÛX[[Ð\KKœYÙJK\—ÜYÙNŠË›X^JJ\ËœÛX[[Ð\KKœ\—ÜYÙJ__]˜\ˆOXÛ\ÜÞÜÝ]XÈ[˜ÛÙPX˜ÚR[™›ÊŠ^Ü™]\›ŠÛË˜Ü™X]RœÛÛ”œÔ™\]Y\Ý
J‹›Y]Ù
_\Ý]XÈ[˜ÛÙPX˜ÚT]Y\žJŠ^Ü™]\›ŠÛË˜Ü™X]RœÛÛ”œÔ™\]Y\Ý
J‹›Y]Ù™J‹œ\˜[\ÊJ_\Ý]XÈ[˜ÛÙP›ØÚÊŠ^Ü™]\›ŠÛË˜Ü™X]RœÛÛ”œÔ™\]Y\Ý
J‹›Y]ÙLJ‹œ\˜[\ÊJ_\Ý]XÈ[˜ÛÙP›ØÚØÚZ[ŠŠ^Ü™]\›ŠÛË˜Ü™X]RœÛÛ”œÔ™\]Y\Ý
J‹›Y]Ù™J‹œ\˜[\ÊJ_\Ý]XÈ[˜ÛÙP›ØÚÔ™\Ý[ÊŠ^Ü™]\›ŠÛË˜Ü™X]RœÛÛ”œÔ™\]Y\Ý
J‹›Y]ÙLJ‹œ\˜[\ÊJ_\Ý]XÈ[˜ÛÙP›ØÚÔÙX\˜Ú
Š^Ü™]\›ŠÛË˜Ü™X]RœÛÛ”œÔ™\]Y\Ý
J‹›Y]Ù[™J‹œ\˜[\ÊJ_\Ý]XÈ[˜ÛÙPœ›ØYØ\Ý
Š^Ü™]\›ŠÛË˜Ü™X]RœÛÛ”œÔ™\]Y\Ý
J‹›Y]Ù[™J‹œ\˜[\ÊJ_\Ý]XÈ[˜ÛÙPÛÛ[Z]
Š^Ü™]\›ŠÛË˜Ü™X]RœÛÛ”œÔ™\]Y\Ý
J‹›Y]ÙLJ‹œ\˜[\ÊJ_\Ý]XÈ[˜ÛÙQÙ[™\Ú\ÊŠ^Ü™]\›ŠÛË˜Ü™X]RœÛÛ”œÔ™\]Y\Ý
J‹›Y]Ù
_\Ý]XÈ[˜ÛÙRX[
Š^Ü™]\›ŠÛË˜Ü™X]RœÛÛ”œÔ™\]Y\Ý
J‹›Y]Ù
_\Ý]XÈ[˜ÛÙS[U[˜ÛÛ™š\›YYÊŠ^Ü™]\›ŠÛË˜Ü™X]RœÛÛ”œÔ™\]Y\Ý
J‹›Y]Ù
_\Ý]XÈ[˜ÛÙTÝ]\ÊŠ^Ü™]\›ŠÛË˜Ü™X]RœÛÛ”œÔ™\]Y\Ý
J‹›Y]Ù
_\Ý]XÈ[˜ÛÙTÝXœØÜšX™JŠ^Û]^ÚÙ^NˆK™]™[‹˜[YN›‹œ]Y\žK\_KOYÛ™K˜Z[]Y\žJÝYÜÎ–ÝK˜]Î›‹œ]Y\žKœ˜]ßJNÜ™]\›ŠÛË˜Ü™X]RœÛÛ”œÔ™\]Y\Ý
JœÝXœØÜšX™H‹Ü]Y\žNš_J_\Ý]XÈ[˜ÛÙU
Š^Ü™]\›ŠÛË˜Ü™X]RœÛÛ”œÔ™\]Y\Ý
J‹›Y]Ù›™J‹œ\˜[\ÊJ_\Ý]XÈ[˜ÛÙUÙX\˜Ú
Š^Ü™]\›ŠÛË˜Ü™X]RœÛÛ”œÔ™\]Y\Ý
J‹›Y]Ù[™J‹œ\˜[\ÊJ_\Ý]XÈ[˜ÛÙU˜[Y]ÜœÊŠ^Ü™]\›ŠÛË˜Ü™X]RœÛÛ”œÔ™\]Y\Ý
J‹›Y]ÙÛ™J‹œ\˜[\ÊJ__NÒY”\˜[\ÏZ_JNÝ˜\ˆYÏRJØÏOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\JØË—×Ù\Ó[Ù[H‹Ý˜[YNˆLJN×ØË‘]U[YO]›ÚY×ØË™œ›ÛT™˜ÌÌÌÎUÚ]˜[›ÜÙXÛÛ™ÏQ‘Î×ØËÔ™˜ÌÌÌÎUÚ]˜[›ÜÙXÛÛ™ÏSQÎ×ØË™œ›ÛTÙXÛÛ™ÏQ[™N×ØËÔÙXÛÛ™ÏT[™NÝ˜\ˆÛ™OZÛŠ
KÛ™OPZJ
NÙ[˜Ý[Ûˆ‘ÊJ^Û]JÛ™K™œ›ÛT™˜ÌÌÌÎJJJKYK›X]Ú
×Š
ÊV‰ÊKO]ÝÌWKœÛXÙJÊNˆˆŽÜ™]\›ˆ‹›˜[›ÜÙXÛÛ™Ï\\œÙR[
KœY[™
‹ŒŠKL
KŸY[˜Ý[ÛˆQÊJ^Û]YKÒTÓÔÝš[™Ê
KYK›˜[›ÜÙXÛÛ™ÏËÔÝš[™Ê
OÏÈˆŽÜ™]\›˜	Û‹œÛXÙJLJ_IÝœYÝ\
‹ŒŠ_V˜Y[˜Ý[Ûˆ[™JKL
^Û][™]ÈÛ™K•Z[ÌŠŠKÓ[X™\Š
NÚYŠŽNNNNNNNNJ]›ÝÈ™]È\œ›ÜŠ“˜[›ÈÙXÛÛ™È]\Ý›Ý^ÙYYNNNNNNNNHŠNÛ]O[™]È]JJŒYLÊÓX]™›ÛÜŠÌYMŠJNÜ™]\›ˆK›˜[›ÜÙXÛÛ™Ï]	LYM‹_Y[˜Ý[Ûˆ[™JJ^Ü™]\›žÜÙXÛÛ™Î“X]™›ÛÜŠK™Ù][YJ
KÌYLÊK˜[›ÜÎ™K™Ù][YJ
ILYLÊŒYMŠÊK›˜[›ÜÙXÛÛ™ÏÏÌ
__]˜\ˆŒOXÛ\ÜÞÜÝ]XÈXÛÙJŠ^Ü™]\›ˆ‘ÊŠ_\Ý]XÈ[˜ÛÙJŠ^Ü™]\›ˆQÊŠ__N×ØË‘]U[YOPŒ_JNÝ˜\ˆÏRJÞOOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\JÞK—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÚÞK›ØÚÒY›YÏ]›ÚYÝ˜\ˆÎÊ[˜Ý[ÛŠJ^ÙVÙK•[šÛ›ÝÛLOH•[šÛ›ÝÛˆ‹VÙKXœÙ[LWOHXœÙ[‹VÙKÛÛ[Z]L—OHÛÛ[Z]‹VÙK“š[L×OH“š[‹VÙK•[œ™XÛÙÛš^™YKLWOH•[œ™XÛÙÛš^™YŸJJß
ÞK›ØÚÒY›YÏRÏ^ßJJ_JNÝ˜\ˆÑÏRJ^OOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\J^K—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÑ^Kš\Ú]Û™NÑ^Kš\Ú›ØÚÏS›™NÝ˜\ˆÌOXšJ
KÏPÞJ
NÙ[˜Ý[ÛˆÛ™JJ^Ü™]\›ŠÌKœÚLMŠJJ_Y[˜Ý[Ûˆ›™JJ^ÚYŠOJ]›ÝÈ™]È\œ›ÜŠØ[››ÝÜ][ˆ[\H™YHŠNÛ]LŠŠ“X]™›ÛÜŠX]›ÙÌŠJJNÜ™]\›ˆOÛŽ›‹ÌŸY[˜Ý[Ûˆ›™JJ^Û][™]ÈÌK”ÚLMŠZ[\œ˜^K™œ›ÛJÌJJNÜ™]\›ˆ‹\]JJK‹™YÙ\Ý

_Y[˜Ý[Ûˆ™JKŠ^Û][™]ÈÌK”ÚLMŠZ[\œ˜^K™œ›ÛJÌWJJNÜ™]\›ˆ\]JJK\]JŠK™YÙ\Ý

_Y[˜Ý[ÛˆLJJ^ÜÝÚ]Ú
K›[™Ý
^ØØ\ÙH›ÝÈ™]È\œ›ÜŠØ[››Ý\Ú[\H™YHŠNØØ\ÙHNœ™]\›ˆ›™JVÌJNÙY˜][žÛ]T›™JK›[™Ý
K[LJKœÛXÙJŠJKO[LJKœÛXÙJŠJNÜ™]\›ˆ™JJ___Y[˜Ý[Ûˆ›™JJ^ÚYŠYK›\Ý›ØÚÒY
]›ÝÈ™]È\œ›ÜŠ’\Ú[™ÈH›ØÚÈXY\ˆÚ]›È\Ý›ØÚÈQ
K™KˆXY\ˆ]ZYÚJH\È›ÝÝ\ÜYˆYˆ[ÝH™YY\ËÛÛšX][ÛœÈ\™HÙ[ÛÛYKˆX\ÙHYØÝ[Y[][Ûˆ[™\Ý™XÝÜœÈ›Üˆ\ÈØ\ÙKˆŠNÛ]VÊË™[˜ÛÙU™\œÚ[ÛŠJK™\œÚ[ÛŠK
Ë™[˜ÛÙTÝš[™ÊJK˜ÚZ[’Y
K
Ë™[˜ÛÙU]˜\š[
JKšZYÚ
K
Ë™[˜ÛÙU[YJJK[YJK
Ë™[˜ÛÙP›ØÚÒY
JK›\Ý›ØÚÒY
K
Ë™[˜ÛÙPž]\ÊJK›\ÝÛÛ[Z]\Ú
K
Ë™[˜ÛÙPž]\ÊJK™]R\Ú
K
Ë™[˜ÛÙPž]\ÊJK˜[Y]ÜœÒ\Ú
K
Ë™[˜ÛÙPž]\ÊJK›™^˜[Y]ÜœÒ\Ú
K
Ë™[˜ÛÙPž]\ÊJK˜ÛÛœÙ[œÝ\Ò\Ú
K
Ë™[˜ÛÙPž]\ÊJK˜\\Ú
K
Ë™[˜ÛÙPž]\ÊJK›\Ý™\Ý[Ò\Ú
K
Ë™[˜ÛÙPž]\ÊJK™]šY[˜ÙR\Ú
K
Ë™[˜ÛÙPž]\ÊJKœ›ÜÜÙ\Y™\ÜÊWNÜ™]\›ˆLJŠ__JNÝ˜\ˆMRJYOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\JY—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÞY”™\ÜÛœÙ\Ï]›ÚYÞY™XÛÙQ]™[U‘ÎÞY™XÛÙU˜[Y]Ü•\]OVQÎÞY™XÛÙP›ØÚÔ™\Ý[Ï^‘ÎÞY™XÛÙPÛÛ[Z]ZÌNÞY™XÛÙU˜[Y]Ü‘Ù[™\Ú\ÏV‘ÎÞY™XÛÙU˜[Y]Ü’[™›ÏQLNÝ˜\ˆÛZÛŠ
KÑÏX\Š
KÙÏSYÊ
K›]ÝJ
KQYŠ
K›™ORÊ
KPÞJ
KÛ™OWÑÊ
NÙ[˜Ý[Ûˆ™JJ^Ü™]\›žÙ]N™K™]K\Ý›ØÚÒZYÚŠ›X^JJ›‹˜\UÔÛX[[K›\ÝØ›ØÚ×ÚZYÚ
K\Ý›ØÚÐ\\ÚŠ›X^JJÛ‹™œ›ÛP˜\ÙMK›\ÝØ›ØÚ×Ø\Ú\Ú
__Y[˜Ý[Ûˆ[™JJ^Ü™]\›žÛÜÎ™K›ÜË›X\
OŠÝ\N›‹\KÙ^NŠÛ‹™œ›ÛP˜\ÙM
J‹šÙ^JK]NŠÛ‹™œ›ÛP˜\ÙM
J‹™]J_JJ__Y[˜Ý[Ûˆ™JJ^Ü™]\›žÚÙ^NŠÛ‹™œ›ÛP˜\ÙM
J
‹šÚXÚÔÝš[™ÊJKšÙ^OÏÈˆŠJK˜[YNŠÛ‹™œ›ÛP˜\ÙM
J
‹šÚXÚÔÝš[™ÊJK˜[YOÏÈˆŠJK›ÛÙŽŠ›X^JJ[™KKœ›ÛÙ“ÜÊKZYÚŠ›X^JJ›‹˜\UÔÛX[[KšZYÚ
KÛÙNŠ›X^JJ›‹˜\UÔÛX[[K˜ÛÙJKÛÙ\ÜXÙNŠ‹šÚXÚÔÝš[™ÊJK˜ÛÙ\ÜXÙOÏÈˆŠK[™^Š›X^JJ›‹˜\UÔÛX[[Kš[™^
KÙÎ™K›ÙË[™›ÎŠ‹šÚXÚÔÝš[™ÊJKš[™›ÏÏÈˆŠ__Y[˜Ý[Ûˆ™JJ^Ü™]\›žÚÙ^NŠ‹šÚXÚÓ›Û‘[\TÝš[™ÊJKšÙ^JK˜[YN™K˜[YOÏÈˆŸ_Y[˜Ý[Ûˆ›™JJ^Ü™]\›Š‹šÚXÚÐ\œ˜^JJJK›X\
™J_Y[˜Ý[Ûˆ‘ÊJ^Ü™]\›žÝ\N™K\K]šX]\Î™K˜]šX]\ÏÒ›™JK˜]šX]\ÊN–×__Y[˜Ý[ÛˆÑÊJ^Ü™]\›Š‹šÚXÚÐ\œ˜^JJJK›X\
‘Ê_Y[˜Ý[ÛˆÙŠJ^Ü™]\›žØÛÙNŠ›‹˜\UÔÛX[[
J
‹šÚXÚÓ[X™\ŠJK˜ÛÙOÏÌ
JKÛÙ\ÜXÙN™K˜ÛÙ\ÜXÙKÙÎ™K›ÙË]NŠ›X^JJÛ‹™œ›ÛP˜\ÙMK™]JK]™[Î™K™]™[ÏÕÑÊK™]™[ÊN–×KØ\ÕØ[YŠ›‹˜\UÐšYÒ[
JK™Ø\×ÝØ[YÏÈŒŠKØ\Õ\ÙYŠ›‹˜\UÐšYÒ[
JK™Ø\×Ý\ÙYÏÈŒŠ__Y[˜Ý[ÛˆÑÊJ^ÚYŠ”Ý[Hš[ˆJ^Û]ÖÛ‹WOSØš™XÝ™[šY\ÊK”Ý[K˜[YJNÜ™]\›ŠÑË˜\ÜÙ\
JOOH™YMLNHŸOOHœÙXÜMšÌH‹[šÛ›ÝÛˆXšÙ^H\Nˆ	ÛŸX
KØ[ÛÜš]N›‹]NŠÛ‹™œ›ÛP˜\ÙM
J
‹šÚXÚÓ›Û‘[\TÝš[™ÊJ
J__Y[ÙHÝÚ]Ú
K\J^ØØ\ÙH[™\›Z[ÔX’Ù^QYMLNHŽœ™]\›žØ[ÛÜš]Nˆ™YMLNH‹]NŠÛ‹™œ›ÛP˜\ÙM
J
‹šÚXÚÓ›Û‘[\TÝš[™ÊJK˜[YJJ_NØØ\ÙH[™\›Z[ÔX’Ù^TÙXÜMšÌHŽœ™]\›žØ[ÛÜš]NˆœÙXÜMšÌH‹]NŠÛ‹™œ›ÛP˜\ÙM
J
‹šÚXÚÓ›Û‘[\TÝš[™ÊJK˜[YJJ_NÙY˜][›ÝÈ™]È\œ›ÜŠ[šÛ›ÝÛˆXšÙ^H\Nˆ	ÙK\_X
__Y[˜Ý[Ûˆ[™JJ^Ü™]\›žÛX^ž]\ÎŠ›‹˜\UÔÛX[[
J
‹šÚXÚÓ›Û‘[\TÝš[™ÊJK›X^Øž]\ÊJKX^Ø\ÎŠ›‹˜\UÔÛX[[
J
‹šÚXÚÓ›Û‘[\TÝš[™ÊJK›X^ÙØ\ÊJ__Y[˜Ý[Ûˆ›™JJ^Ü™]\›žÛX^YÙS[P›ØÚÜÎŠ›‹˜\UÔÛX[[
J
‹šÚXÚÓ›Û‘[\TÝš[™ÊJK›X^ØYÙWÛ[WØ›ØÚÜÊJKX^YÙQ\˜][ÛŽŠ›‹˜\UÔÛX[[
J
‹šÚXÚÓ›Û‘[\TÝš[™ÊJK›X^ØYÙWÙ\˜][ÛŠJ__Y[˜Ý[ÛˆÊJ^Ü™]\›žØ›ØÚÎ™K˜›ØÚÏÜ[™J
‹šÚXÚÓØš™XÝ
JK˜›ØÚÊJN›ÚY]šY[˜ÙN™K™]šY[˜ÙOÑ›™J
‹šÚXÚÓØš™XÝ
JK™]šY[˜ÙJJN›ÚY_Y[˜Ý[ÛˆQÊJ^Ü™]\›žÜXšÙ^NžØž]\ÎŠÛ‹™œ›ÛP˜\ÙM
J
‹šÚXÚÔÝš[™ÊJKœX—ÚÙ^WØž]\ÊJK\NŠ‹šÚXÚÔÝš[™ÊJKœX—ÚÙ^WÝ\J_K›Ý[™ÔÝÙ\ŽŠ›‹˜\UÐšYÒ[
JKœÝÙ\ÏÈŒŠ__Y[˜Ý[Ûˆ‘ÊJ^Ü™]\›žÚZYÚŠ›‹˜\UÔÛX[[
J
‹šÚXÚÓ›Û‘[\TÝš[™ÊJKšZYÚ
JK™\Ý[ÎŠK×Ü™\Ý[ß×JK›X\
ÙŠK˜[Y]Ü•\]\ÎŠK˜[Y]Ü—Ý\]\ß×JK›X\
QÊKÛÛœÙ[œÝ\Õ\]\ÎŠ›X^JJËK˜ÛÛœÙ[œÝ\×Ü\˜[WÝ\]\ÊKš[˜[^™P›ØÚÑ]™[Î•ÑÊK™š[˜[^™WØ›ØÚ×Ù]™[ß×J__Y[˜Ý[Ûˆ^JJ^Ü™]\›žÚ\ÚŠÛ‹™œ›ÛR^
J
‹šÚXÚÓ›Û‘[\TÝš[™ÊJKš\Ú
JK\ÎžÝÝ[Š‹šÚXÚÓ›Û–™\›Ó[X™\ŠJKœ\ËÝ[
K\ÚŠÛ‹™œ›ÛR^
J
‹šÚXÚÓ›Û‘[\TÝš[™ÊJKœ\Ëš\Ú
J___Y[˜Ý[Ûˆ[™JJ^Ü™]\›žØ›ØÚÎŠ›‹˜\UÔÛX[[
JK˜›ØÚÊK\Š›‹˜\UÔÛX[[
JK˜\ÏÌ
__Y[˜Ý[ÛˆÞJJ^Ü™]\›žÝ™\œÚ[ÛŽ“[™JK™\œÚ[ÛŠKÚZ[’YŠ‹šÚXÚÓ›Û‘[\TÝš[™ÊJK˜ÚZ[—ÚY
KZYÚŠ›‹˜\UÔÛX[[
J
‹šÚXÚÓ›Û‘[\TÝš[™ÊJKšZYÚ
JK[YNŠÙË™œ›ÛT™˜ÌÌÌÎUÚ]˜[›ÜÙXÛÛ™ÊJ
‹šÚXÚÓ›Û‘[\TÝš[™ÊJK[YJJK\Ý›ØÚÒY™K›\ÝØ›ØÚ×ÚYš\ÚÔ^JK›\ÝØ›ØÚ×ÚY
N›[\ÝÛÛ[Z]\ÚŠÛ‹™œ›ÛR^
J
‹šÚXÚÔÙ]
JK›\ÝØÛÛ[Z]Ú\Ú
JK]R\ÚŠÛ‹™œ›ÛR^
J
‹šÚXÚÔÙ]
JK™]WÚ\Ú
JK˜[Y]ÜœÒ\ÚŠÛ‹™œ›ÛR^
J
‹šÚXÚÔÙ]
JK˜[Y]Üœ×Ú\Ú
JK™^˜[Y]ÜœÒ\ÚŠÛ‹™œ›ÛR^
J
‹šÚXÚÔÙ]
JK›™^Ý˜[Y]Üœ×Ú\Ú
JKÛÛœÙ[œÝ\Ò\ÚŠÛ‹™œ›ÛR^
J
‹šÚXÚÔÙ]
JK˜ÛÛœÙ[œÝ\×Ú\Ú
JK\\ÚŠÛ‹™œ›ÛR^
J
‹šÚXÚÔÙ]
JK˜\Ú\Ú
JK\Ý™\Ý[Ò\ÚŠÛ‹™œ›ÛR^
J
‹šÚXÚÔÙ]
JK›\ÝÜ™\Ý[×Ú\Ú
JK]šY[˜ÙR\ÚŠÛ‹™œ›ÛR^
J
‹šÚXÚÔÙ]
JK™]šY[˜ÙWÚ\Ú
JK›ÜÜÙ\Y™\ÜÎŠÛ‹™œ›ÛR^
J
‹šÚXÚÓ›Û‘[\TÝš[™ÊJKœ›ÜÜÙ\—ØY™\ÜÊJ__Y[˜Ý[Ûˆ™JJ^Ü™]\›žØ›ØÚÒY”^JK˜›ØÚ×ÚY
K›ØÚÔÚ^™NŠ›‹˜\UÔÛX[[
J
‹šÚXÚÓ›Û‘[\TÝš[™ÊJK˜›ØÚ×ÜÚ^™JJKXY\ŽÞJKšXY\ŠK[UÎŠ›‹˜\UÔÛX[[
J
‹šÚXÚÓ›Û‘[\TÝš[™ÊJK›[WÝÊJ__Y[˜Ý[ÛˆÛ™JJ^Ü™]\›žÛ\ÝZYÚŠ›‹˜\UÔÛX[[
J
‹šÚXÚÓ›Û‘[\TÝš[™ÊJK›\ÝÚZYÚ
JK›ØÚÓY]\ÎŠ‹šÚXÚÐ\œ˜^JJK˜›ØÚ×ÛY]\ÊK›X\
™J__Y[˜Ý[ÛˆÛ™JJ^Ü™]\›žË‹‹ÙŠJK\ÚŠÛ‹™œ›ÛR^
J
‹šÚXÚÓ›Û‘[\TÝš[™ÊJKš\Ú
J__Y[˜Ý[Ûˆ›™JJ^Û]YKÜ™\Ý[ÝÙŠKÜ™\Ý[
N›ÚYÜ™]\›žÚZYÚŠ›‹˜\UÔÛX[[
JKšZYÚ
K\ÚŠÛ‹™œ›ÛR^
J
‹šÚXÚÓ›Û‘[\TÝš[™ÊJKš\Ú
JKÚXÚÕÙŠ
‹šÚXÚÓØš™XÝ
JK˜ÚXÚ×Ý
JK[]™\•›‹™\Ý[›Ÿ_Y[˜Ý[ÛˆÛ™JJ^Ü™]\›ŠÑË˜\ÜÙ\
JH[ˆ›™K›ØÚÒY›YÊK_Y[˜Ý[ÛˆÛ™JJ^Ü™]\›žØ›ØÚÒY›YÎ•Û™JK˜›ØÚ×ÚYÙ›YÊK˜[Y]ÜY™\ÜÎ™K˜[Y]Ü—ØY™\ÜÏÊÛ‹™œ›ÛR^
JK˜[Y]Ü—ØY™\ÜÊN›ÚY[Y\Ý[\™K[Y\Ý[\ÊÙË™œ›ÛT™˜ÌÌÌÎUÚ]˜[›ÜÙXÛÛ™ÊJK[Y\Ý[\
N›ÚYÚYÛ˜]\™N™KœÚYÛ˜]\™OÊÛ‹™œ›ÛP˜\ÙM
JKœÚYÛ˜]\™JN›ÚY_Y[˜Ý[ÛˆÌJJ^Ü™]\›žØ›ØÚÒY”^J
‹šÚXÚÓØš™XÝ
JK˜›ØÚ×ÚY
JKZYÚŠ›‹˜\UÔÛX[[
J
‹šÚXÚÓ›Û‘[\TÝš[™ÊJKšZYÚ
JK›Ý[™Š›‹˜\UÔÛX[[
JKœ›Ý[™
KÚYÛ˜]\™\Î™KœÚYÛ˜]\™\ÏÊ‹šÚXÚÐ\œ˜^JJKœÚYÛ˜]\™\ÊK›X\
Û™JN–×__Y[˜Ý[Ûˆ™JJ^Ü™]\›žØØ[›ÛšXØ[Š‹šÚXÚÐ›ÛÛX[ŠJK˜Ø[›ÛšXØ[
KXY\ŽÞJKœÚYÛ™YÚXY\‹šXY\ŠKÛÛ[Z]šÌJKœÚYÛ™YÚXY\‹˜ÛÛ[Z]
__Y[˜Ý[Ûˆ‘ÊJ^Ü™]\›žØY™\ÜÎŠÛ‹™œ›ÛR^
J
‹šÚXÚÓ›Û‘[\TÝš[™ÊJK˜Y™\ÜÊJKXšÙ^N’ÑÊ
‹šÚXÚÓØš™XÝ
JKœX—ÚÙ^JJKÝÙ\ŽŠ›‹˜\UÐšYÒ[
J
‹šÚXÚÓ›Û‘[\TÝš[™ÊJKœÝÙ\ŠJK˜[YN™K›˜[Y__Y[˜Ý[Ûˆ[™JJ^Ü™]\›žÙÙ[™\Ú\Õ[YNŠÙË™œ›ÛT™˜ÌÌÌÎUÚ]˜[›ÜÙXÛÛ™ÊJ
‹šÚXÚÓ›Û‘[\TÝš[™ÊJK™Ù[™\Ú\×Ý[YJJKÚZ[’YŠ‹šÚXÚÓ›Û‘[\TÝš[™ÊJK˜ÚZ[—ÚY
KÛÛœÙ[œÝ\Ô\˜[\Î“ÊK˜ÛÛœÙ[œÝ\×Ü\˜[\ÊK˜[Y]ÜœÎ™K˜[Y]ÜœÏÊ‹šÚXÚÐ\œ˜^JJK˜[Y]ÜœÊK›X\
‘ÊN–×K\\ÚŠÛ‹™œ›ÛR^
J
‹šÚXÚÔÙ]
JK˜\Ú\Ú
JK\Ý]N™K˜\ÜÝ]__Y[˜Ý[ÛˆLJJ^Ü™]\›žÜXšÙ^N’ÑÊ
‹šÚXÚÓØš™XÝ
JKœX—ÚÙ^JJK›Ý[™ÔÝÙ\ŽŠ›‹˜\UÐšYÒ[
J
‹šÚXÚÓ›Û‘[\TÝš[™ÊJK›Ý[™×ÜÝÙ\ŠJKY™\ÜÎŠÛ‹™œ›ÛR^
J
‹šÚXÚÓ›Û‘[\TÝš[™ÊJK˜Y™\ÜÊJK›ÜÜÙ\”š[Üš]N™Kœ›ÜÜÙ\—Üš[Üš]OÊ›‹˜\UÔÛX[[
JKœ›ÜÜÙ\—Üš[Üš]JN›ÚY_Y[˜Ý[Ûˆ›™JJ^Ü™]\›žÚYŠÛ‹™œ›ÛR^
J
‹šÚXÚÓ›Û‘[\TÝš[™ÊJKšY
JK\Ý[YŽŠ‹šÚXÚÓ›Û‘[\TÝš[™ÊJK›\Ý[—ØYŠK™]ÛÜšÎŠ‹šÚXÚÓ›Û‘[\TÝš[™ÊJK›™]ÛÜšÊK™\œÚ[ÛŽŠ‹šÚXÚÔÝš[™ÊJK™\œÚ[ÛŠKÚ[›™[ÎŠ‹šÚXÚÔÝš[™ÊJK˜Ú[›™[ÊK[ÛšZÙ\ŽŠ‹šÚXÚÓ›Û‘[\TÝš[™ÊJK›[ÛšZÙ\ŠKÝ\ŽŠ™XÝ[Û˜\žUÔÝš[™ÓX\
JK›Ý\ŠK›ÝØÛÛ™\œÚ[ÛŽžØ\Š›‹˜\UÔÛX[[
J
‹šÚXÚÓ›Û‘[\TÝš[™ÊJKœ›ÝØÛÛÝ™\œÚ[Û‹˜\
JK›ØÚÎŠ›‹˜\UÔÛX[[
J
‹šÚXÚÓ›Û‘[\TÝš[™ÊJKœ›ÝØÛÛÝ™\œÚ[Û‹˜›ØÚÊJKœŠ›‹˜\UÔÛX[[
J
‹šÚXÚÓ›Û‘[\TÝš[™ÊJKœ›ÝØÛÛÝ™\œÚ[Û‹œœ
J___Y[˜Ý[Ûˆ›™JJ^Û]YK™X\›Y\ÝØ›ØÚ×ÚZYÚÊ›‹˜\UÔÛX[[
JK™X\›Y\ÝØ›ØÚ×ÚZYÚ
N›ÚYYK™X\›Y\ÝØ›ØÚ×Ý[YOÊÙË™œ›ÛT™˜ÌÌÌÎUÚ]˜[›ÜÙXÛÛ™ÊJK™X\›Y\ÝØ›ØÚ×Ý[YJN›ÚYÜ™]\›žÙX\›Y\Ý\\Ú™K™X\›Y\ÝØ\Ú\ÚÊÛ‹™œ›ÛR^
JK™X\›Y\ÝØ\Ú\Ú
N›ÚYX\›Y\Ý›ØÚÒ\Ú™K™X\›Y\ÝØ›ØÚ×Ú\ÚÊÛ‹™œ›ÛR^
JK™X\›Y\ÝØ›ØÚ×Ú\Ú
N›ÚYX\›Y\Ý›ØÚÒZYÚ›Ÿ›ÚYX\›Y\Ý›ØÚÕ[YNË™Ù][YJ
OÝ›ÚY]\Ý›ØÚÒ\ÚŠÛ‹™œ›ÛR^
J
‹šÚXÚÓ›Û‘[\TÝš[™ÊJK›]\ÝØ›ØÚ×Ú\Ú
JK]\Ý\\ÚŠÛ‹™œ›ÛR^
J
‹šÚXÚÓ›Û‘[\TÝš[™ÊJK›]\ÝØ\Ú\Ú
JK]\Ý›ØÚÕ[YNŠÙË™œ›ÛT™˜ÌÌÌÎUÚ]˜[›ÜÙXÛÛ™ÊJ
‹šÚXÚÓ›Û‘[\TÝš[™ÊJK›]\ÝØ›ØÚ×Ý[YJJK]\Ý›ØÚÒZYÚŠ›‹˜\UÔÛX[[
J
‹šÚXÚÓ›Û‘[\TÝš[™ÊJK›]\ÝØ›ØÚ×ÚZYÚ
JKØ]Ú[™Õ\Š‹šÚXÚÐ›ÛÛX[ŠJK˜Ø]Ú[™×Ý\
__Y[˜Ý[Ûˆ™JJ^Ü™]\›žÛ›ÙR[™›Îž›™JK››ÙWÚ[™›ÊKÞ[˜Ò[™›Î–›™JKœÞ[˜×Ú[™›ÊK˜[Y]Ü’[™›Î‘LJK˜[Y]Ü—Ú[™›Ê__Y[˜Ý[Ûˆ	™JJ^Ü™]\›žÙ]NŠÛ‹™œ›ÛP˜\ÙM
J
‹šÚXÚÓ›Û‘[\TÝš[™ÊJK™]JJK›ÛÝ\ÚŠÛ‹™œ›ÛR^
J
‹šÚXÚÓ›Û‘[\TÝš[™ÊJKœ›ÛÝÚ\Ú
JK›ÛÙŽžÝÝ[Š›‹˜\UÔÛX[[
J
‹šÚXÚÓ›Û‘[\TÝš[™ÊJKœ›ÛÙ‹Ý[
JK[™^Š›‹˜\UÔÛX[[
J
‹šÚXÚÓ›Û‘[\TÝš[™ÊJKœ›ÛÙ‹š[™^
JKXY’\ÚŠÛ‹™œ›ÛP˜\ÙM
J
‹šÚXÚÓ›Û‘[\TÝš[™ÊJKœ›ÛÙ‹›XY—Ú\Ú
JK][ÎŠ‹šÚXÚÐ\œ˜^JJKœ›ÛÙ‹˜][ÊK›X\
Û‹™œ›ÛP˜\ÙM
___Y[˜Ý[ÛˆÊJ^Ü™]\›žÝŠÛ‹™œ›ÛP˜\ÙM
J
‹šÚXÚÓ›Û‘[\TÝš[™ÊJK
JK™\Ý[ÙŠ
‹šÚXÚÓØš™XÝ
JKÜ™\Ý[
JKZYÚŠ›‹˜\UÔÛX[[
J
‹šÚXÚÓ›Û‘[\TÝš[™ÊJKšZYÚ
JK[™^Š›‹˜\UÔÛX[[
J
‹šÚXÚÓ[X™\ŠJKš[™^
JK\ÚŠÛ‹™œ›ÛR^
J
‹šÚXÚÓ›Û‘[\TÝš[™ÊJKš\Ú
JK›ÛÙŽŠ›X^JJ	™KKœ›ÛÙŠ__Y[˜Ý[Ûˆ›™JJ^Ü™]\›žÝÝ[ÛÝ[Š›‹˜\UÔÛX[[
J
‹šÚXÚÓ›Û‘[\TÝš[™ÊJKÝ[ØÛÝ[
JKÎŠ‹šÚXÚÐ\œ˜^JJKÊK›X\
Ê__Y[˜Ý[Ûˆ]JJ^Û]JÛ‹™œ›ÛP˜\ÙM
J
‹šÚXÚÓ›Û‘[\TÝš[™ÊJK
JNÜ™]\›žÝ›‹\ÚŠÛ™Kš\Ú
JŠK™\Ý[ÙŠKœ™\Ý[
KZYÚŠ›‹˜\UÔÛX[[
J
‹šÚXÚÓ›Û‘[\TÝš[™ÊJKšZYÚ
J__Y[˜Ý[ÛˆJJ^Ü™]\›žØ›ØÚÒZYÚŠ›‹˜\UÔÛX[[
J
‹šÚXÚÓ›Û‘[\TÝš[™ÊJK˜›ØÚ×ÚZYÚ
JK˜[Y]ÜœÎŠ‹šÚXÚÐ\œ˜^JJK˜[Y]ÜœÊK›X\
LJKÛÝ[Š›‹˜\UÔÛX[[
J
‹šÚXÚÓ›Û‘[\TÝš[™ÊJK˜ÛÝ[
JKÝ[Š›‹˜\UÔÛX[[
J
‹šÚXÚÓ›Û‘[\TÝš[™ÊJKÝ[
J__Y[˜Ý[Ûˆ	ÊJ^Ü™]\›žÚXY\ŽÞJ
‹šÚXÚÓØš™XÝ
JKšXY\ŠJK\ÝÛÛ[Z]™K›\ÝØÛÛ[Z]˜›ØÚ×ÚYš\ÚÚÌJ
‹šÚXÚÓØš™XÝ
JK›\ÝØÛÛ[Z]
JN›[Î™K™]KÏÊ‹šÚXÚÐ\œ˜^JJK™]KÊK›X\
Û‹™œ›ÛP˜\ÙM
N–×K]šY[˜ÙN™K™]šY[˜ÙOË™]šY[˜ÙOÏÖ×__Y[˜Ý[Ûˆ‘ÊJ^Ü™]\›žØ›ØÚÒY”^JK˜›ØÚ×ÚY
K›ØÚÎ‰ÊK˜›ØÚÊ__Y[˜Ý[ÛˆJJ^Ü™]\›žÝÝ[ÛÝ[Š›‹˜\UÔÛX[[
J
‹šÚXÚÓ›Û‘[\TÝš[™ÊJKÝ[ØÛÝ[
JK›ØÚÜÎŠ‹šÚXÚÐ\œ˜^JJK˜›ØÚÜÊK›X\
‘Ê__Y[˜Ý[ÛˆJJ^Ü™]\›žÝÝ[Š›‹˜\UÔÛX[[
J
‹šÚXÚÓ›Û‘[\TÝš[™ÊJKÝ[
JKÝ[ž]\ÎŠ›‹˜\UÔÛX[[
J
‹šÚXÚÓ›Û‘[\TÝš[™ÊJKÝ[Øž]\ÊJ__]˜\ˆÌOXÛ\ÜÈ^ÜÝ]XÈXÛÙPX˜ÚR[™›ÊŠ^Ü™]\›ˆ™J
‹šÚXÚÓØš™XÝ
J‹œ™\Ý[œ™\ÜÛœÙJJ_\Ý]XÈXÛÙPX˜ÚT]Y\žJŠ^Ü™]\›ˆ™J
‹šÚXÚÓØš™XÝ
J‹œ™\Ý[œ™\ÜÛœÙJJ_\Ý]XÈXÛÙP›ØÚÊŠ^Ü™]\›ˆ‘Ê‹œ™\Ý[
_\Ý]XÈXÛÙP›ØÚÔ™\Ý[ÊŠ^Ü™]\›ˆ‘Ê‹œ™\Ý[
_\Ý]XÈXÛÙP›ØÚÔÙX\˜Ú
Š^Ü™]\›ˆJ‹œ™\Ý[
_\Ý]XÈXÛÙP›ØÚØÚZ[ŠŠ^Ü™]\›ˆÛ™J‹œ™\Ý[
_\Ý]XÈXÛÙPœ›ØYØ\ÝÞ[˜ÊŠ^Ü™]\›ˆÛ™J‹œ™\Ý[
_\Ý]XÈXÛÙPœ›ØYØ\Ý\Þ[˜ÊŠ^Ü™]\›ˆK™XÛÙPœ›ØYØ\ÝÞ[˜ÊŠ_\Ý]XÈXÛÙPœ›ØYØ\ÝÛÛ[Z]
Š^Ü™]\›ˆ›™J‹œ™\Ý[
_\Ý]XÈXÛÙPÛÛ[Z]
Š^Ü™]\›ˆ™J‹œ™\Ý[
_\Ý]XÈXÛÙQÙ[™\Ú\ÊŠ^Ü™]\›ˆ[™J
‹šÚXÚÓØš™XÝ
J‹œ™\Ý[™Ù[™\Ú\ÊJ_\Ý]XÈXÛÙRX[

^Ü™]\›ˆ[\Ý]XÈXÛÙS[U[˜ÛÛ™š\›YYÊŠ^Ü™]\›ˆJ‹œ™\Ý[
_\Ý]XÈXÛÙTÝ]\ÊŠ^Ü™]\›ˆ™J‹œ™\Ý[
_\Ý]XÈXÛÙS™]Ð›ØÚÑ]™[
Š^Ü™]\›ˆ	Ê‹™]K˜[YK˜›ØÚÊ_\Ý]XÈXÛÙS™]Ð›ØÚÒXY\‘]™[
Š^Ü™]\›ˆÞJ‹™]K˜[YKšXY\Š_\Ý]XÈXÛÙU]™[
Š^Ü™]\›ˆ]J‹™]K˜[YK•™\Ý[
_\Ý]XÈXÛÙU
Š^Ü™]\›ˆÊ‹œ™\Ý[
_\Ý]XÈXÛÙUÙX\˜Ú
Š^Ü™]\›ˆ›™J‹œ™\Ý[
_\Ý]XÈXÛÙU˜[Y]ÜœÊŠ^Ü™]\›ˆJ‹œ™\Ý[
__NÞY”™\ÜÛœÙ\ÏTÌ_JNÝ˜\ˆRJ™OžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\J™‹—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÔ™‹”™\ÜÛœÙ\ÏT™‹”\˜[\Ï]›ÚYÝ˜\ˆ]O\QÊ
NÓØš™XÝ™Yš[™T›Ü\J™‹”\˜[\È‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ]K”\˜[\ß_JNÝ˜\ˆÝOYM

NÓØš™XÝ™Yš[™T›Ü\J™‹”™\ÜÛœÙ\È‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆÝK”™\ÜÛœÙ\ß_J_JNÝ˜\ˆRJ™OžÈ\ÙHÝšXÝŽÝ˜\ˆ]OP™	‰™—×ØÜ™X]Pš[™[™ß
Øš™XÝ˜Ü™X]OÊ[˜Ý[ÛŠK‹J^ÚOOO]›ÚY	‰ŠO]
NÝ˜\ˆSØš™XÝ™Ù]ÝÛ”›Ü\Q\ØÜš\ÜŠ‹
NÊ\Ÿ
™Ù]š[ˆÈ[‹—×Ù\Ó[Ù[Nœ‹Üš]X›_‹˜ÛÛ™šYÝ\˜X›JJI‰Š^Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ–Ý__JKØš™XÝ™Yš[™T›Ü\JKKŠ_JNŠ[˜Ý[ÛŠK‹J^ÚOOO]›ÚY	‰ŠO]
KVÚWO[–Ý_JJKÝOP™	‰™—×ÜÙ][Ù[QY˜][
Øš™XÝ˜Ü™X]OÊ[˜Ý[ÛŠKŠ^ÓØš™XÝ™Yš[™T›Ü\JK™Y˜][‹Ù[[Y\˜X›NˆL˜[YN›ŸJ_JN™[˜Ý[ÛŠKŠ^ÙK™Y˜][[ŸJKOP™	‰™—×Ú[\ÜÝ\Ÿ
[˜Ý[ÛŠ
^Ý˜\ˆOY[˜Ý[ÛŠŠ^Ü™]\›ˆOSØš™XÝ™Ù]ÝÛ”›Ü\S˜[Y\ß[˜Ý[ÛŠ
^Ý˜\ˆOV×NÙ›ÜŠ˜\ˆˆ[ˆ
SØš™XÝœ›ÝÝ\Kš\ÓÝÛ”›Ü\K˜Ø[
ŠI‰ŠVÚK›[™ÝO\ŠNÜ™]\›ˆ_KJŠ_NÜ™]\›ˆ[˜Ý[ÛŠŠ^ÚYŠ‰‰›‹—×Ù\Ó[Ù[J\™]\›ˆŽÝ˜\ˆ^ßNÚYŠˆO[[
Y›ÜŠ˜\ˆOYJŠKLÜK›[™ÝÜŠÊÊZVÜ—HOOH™Y˜][‰‰˜]J‹VÜ—JNÜ™]\›ˆÝJŠK_JJ
NÓØš™XÝ™Yš[™T›Ü\J™—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÐ™ÛÛY]PÛY[]›ÚYÝ˜\ˆžO\YÊ
KÝ[

KYJÞJ
JKLOXÛ\ÜÈ^ÜÝ]XÈ\Þ[˜ÈÛÛ›™XÝ
Š^Û]Ü™]\›ˆ\[ÙˆOH›Øš™XÝÝ[™]ÈžK’ÛY[
ŠN[‹œÝ\ÕÚ]
š‹ËÈŠ_‹œÝ\ÕÚ]
šÎ‹ËÈŠOÛ™]ÈžK’ÛY[
ŠN›™]ÈžK•ÙXœÛØÚÙ]ÛY[
ŠKK˜Ü™X]J
_\Ý]XÈÜ™X]JŠ^Ü™]\›ˆ™]ÈJŠ_XÛY[ØÛÛœÝXÝÜŠŠ^Ý\Ë˜ÛY[[ŸY\ØÛÛ›™XÝ

^Ý\Ë˜ÛY[™\ØÛÛ›™XÝ

_X\Þ[˜ÈX˜ÚR[™›Ê
^Û]^ÛY]Ùž‹“Y]ÙX˜ÚR[™›ßNÜ™]\›ˆ\Ë™ÐØ[
‹Ý”\˜[\Ë™[˜ÛÙPX˜ÚR[™›ËÝ”™\ÜÛœÙ\Ë™XÛÙPX˜ÚR[™›Ê_X\Þ[˜ÈX˜ÚT]Y\žJŠ^Û]^Ü\˜[\Î›‹Y]Ùž‹“Y]ÙX˜ÚT]Y\ž_NÜ™]\›ˆ\Ë™ÐØ[
Ý”\˜[\Ë™[˜ÛÙPX˜ÚT]Y\žKÝ”™\ÜÛœÙ\Ë™XÛÙPX˜ÚT]Y\žJ_X\Þ[˜È›ØÚÊŠ^Û]^ÛY]Ùž‹“Y]Ù›ØÚË\˜[\ÎžÚZYÚ›Ÿ_NÜ™]\›ˆ\Ë™ÐØ[
Ý”\˜[\Ë™[˜ÛÙP›ØÚËÝ”™\ÜÛœÙ\Ë™XÛÙP›ØÚÊ_X\Þ[˜È›ØÚÔ™\Ý[ÊŠ^Û]^ÛY]Ùž‹“Y]Ù›ØÚÔ™\Ý[Ë\˜[\ÎžÚZYÚ›Ÿ_NÜ™]\›ˆ\Ë™ÐØ[
Ý”\˜[\Ë™[˜ÛÙP›ØÚÔ™\Ý[ËÝ”™\ÜÛœÙ\Ë™XÛÙP›ØÚÔ™\Ý[Ê_X\Þ[˜È›ØÚÔÙX\˜Ú
Š^Û]^Ü\˜[\Î›‹Y]Ùž‹“Y]Ù›ØÚÔÙX\˜ÚKOX]ØZ]\Ë™ÐØ[
Ý”\˜[\Ë™[˜ÛÙP›ØÚÔÙX\˜ÚÝ”™\ÜÛœÙ\Ë™XÛÙP›ØÚÔÙX\˜Ú
NÜ™]\›žË‹‹šK›ØÚÜÎ–Ë‹‹šK˜›ØÚÜ×KœÛÜ

‹ÊOOœ‹˜›ØÚËšXY\‹šZYÚ[Ë˜›ØÚËšXY\‹šZYÚ
__X\Þ[˜È›ØÚÔÙX\˜Ú[
Š^Û][‹œYÙ_KOV×KHLNÙ›ÜŠÈ\ŽÊ^Û]ÏX]ØZ]\Ë˜›ØÚÔÙX\˜Ú
Ë‹‹›‹YÙNJNÚKœ\Ú
‹‹›Ë˜›ØÚÜÊKK›[™ÝËÝ[ÛÝ[Ý
ÊÎœHL\™]\›ˆKœÛÜ

ËJOO›Ë˜›ØÚËšXY\‹šZYÚXK˜›ØÚËšXY\‹šZYÚ
KÝÝ[ÛÝ[šK›[™Ý›ØÚÜÎš__X\Þ[˜È›ØÚØÚZ[Š‹
^Û]O^ÛY]Ùž‹“Y]Ù›ØÚØÚZ[‹\˜[\ÎžÛZ[’ZYÚ›‹X^ZYÚ_NÜ™]\›ˆ\Ë™ÐØ[
KÝ”\˜[\Ë™[˜ÛÙP›ØÚØÚZ[‹Ý”™\ÜÛœÙ\Ë™XÛÙP›ØÚØÚZ[Š_X\Þ[˜Èœ›ØYØ\ÝÞ[˜ÊŠ^Û]^Ü\˜[\Î›‹Y]Ùž‹“Y]Ùœ›ØYØ\ÝÞ[˜ßNÜ™]\›ˆ\Ë™ÐØ[
Ý”\˜[\Ë™[˜ÛÙPœ›ØYØ\ÝÝ”™\ÜÛœÙ\Ë™XÛÙPœ›ØYØ\ÝÞ[˜Ê_X\Þ[˜Èœ›ØYØ\Ý\Þ[˜ÊŠ^Û]^Ü\˜[\Î›‹Y]Ùž‹“Y]Ùœ›ØYØ\Ý\Þ[˜ßNÜ™]\›ˆ\Ë™ÐØ[
Ý”\˜[\Ë™[˜ÛÙPœ›ØYØ\ÝÝ”™\ÜÛœÙ\Ë™XÛÙPœ›ØYØ\Ý\Þ[˜Ê_X\Þ[˜Èœ›ØYØ\ÝÛÛ[Z]
Š^Û]^Ü\˜[\Î›‹Y]Ùž‹“Y]Ùœ›ØYØ\ÝÛÛ[Z]NÜ™]\›ˆ\Ë™ÐØ[
Ý”\˜[\Ë™[˜ÛÙPœ›ØYØ\ÝÝ”™\ÜÛœÙ\Ë™XÛÙPœ›ØYØ\ÝÛÛ[Z]
_X\Þ[˜ÈÛÛ[Z]
Š^Û]^ÛY]Ùž‹“Y]ÙÛÛ[Z]\˜[\ÎžÚZYÚ›Ÿ_NÜ™]\›ˆ\Ë™ÐØ[
Ý”\˜[\Ë™[˜ÛÙPÛÛ[Z]Ý”™\ÜÛœÙ\Ë™XÛÙPÛÛ[Z]
_X\Þ[˜ÈÙ[™\Ú\Ê
^Û]^ÛY]Ùž‹“Y]Ù‘Ù[™\Ú\ßNÜ™]\›ˆ\Ë™ÐØ[
‹Ý”\˜[\Ë™[˜ÛÙQÙ[™\Ú\ËÝ”™\ÜÛœÙ\Ë™XÛÙQÙ[™\Ú\Ê_X\Þ[˜ÈX[

^Û]^ÛY]Ùž‹“Y]Ù’X[NÜ™]\›ˆ\Ë™ÐØ[
‹Ý”\˜[\Ë™[˜ÛÙRX[Ý”™\ÜÛœÙ\Ë™XÛÙRX[
_X\Þ[˜È[U[˜ÛÛ™š\›YYÊ
^Û]^ÛY]Ùž‹“Y]Ù“[U[˜ÛÛ™š\›YYßNÜ™]\›ˆ\Ë™ÐØ[
‹Ý”\˜[\Ë™[˜ÛÙS[U[˜ÛÛ™š\›YYËÝ”™\ÜÛœÙ\Ë™XÛÙS[U[˜ÛÛ™š\›YYÊ_X\Þ[˜ÈÝ]\Ê
^Û]^ÛY]Ùž‹“Y]Ù”Ý]\ßNÜ™]\›ˆ\Ë™ÐØ[
‹Ý”\˜[\Ë™[˜ÛÙTÝ]\ËÝ”™\ÜÛœÙ\Ë™XÛÙTÝ]\Ê_\ÝXœØÜšX™S™]Ð›ØÚÊ
^Û]^ÛY]Ùž‹“Y]Ù”ÝXœØÜšX™K]Y\žNžÝ\Nž‹”ÝXœØÜš\[Û‘]™[\K“™]Ð›ØÚß_NÜ™]\›ˆ\ËœÝXœØÜšX™J‹Ý”™\ÜÛœÙ\Ë™XÛÙS™]Ð›ØÚÑ]™[
_\ÝXœØÜšX™S™]Ð›ØÚÒXY\Š
^Û]^ÛY]Ùž‹“Y]Ù”ÝXœØÜšX™K]Y\žNžÝ\Nž‹”ÝXœØÜš\[Û‘]™[\K“™]Ð›ØÚÒXY\Ÿ_NÜ™]\›ˆ\ËœÝXœØÜšX™J‹Ý”™\ÜÛœÙ\Ë™XÛÙS™]Ð›ØÚÒXY\‘]™[
_\ÝXœØÜšX™U
Š^Û]^ÛY]Ùž‹“Y]Ù”ÝXœØÜšX™K]Y\žNžÝ\Nž‹”ÝXœØÜš\[Û‘]™[\K•˜]Î›Ÿ_NÜ™]\›ˆ\ËœÝXœØÜšX™JÝ”™\ÜÛœÙ\Ë™XÛÙU]™[
_X\Þ[˜È
Š^Û]^Ü\˜[\Î›‹Y]Ùž‹“Y]Ù•NÜ™]\›ˆ\Ë™ÐØ[
Ý”\˜[\Ë™[˜ÛÙUÝ”™\ÜÛœÙ\Ë™XÛÙU
_X\Þ[˜ÈÙX\˜Ú
Š^Û]^Ü\˜[\Î›‹Y]Ùž‹“Y]Ù•ÙX\˜ÚNÜ™]\›ˆ\Ë™ÐØ[
Ý”\˜[\Ë™[˜ÛÙUÙX\˜ÚÝ”™\ÜÛœÙ\Ë™XÛÙUÙX\˜Ú
_X\Þ[˜ÈÙX\˜Ú[
Š^Û][‹œYÙ_KOV×KHLNÙ›ÜŠÈ\ŽÊ^Û]ÏX]ØZ]\ËÙX\˜Ú
Ë‹‹›‹YÙNJNÚKœ\Ú
‹‹›ËÊKK›[™ÝËÝ[ÛÝ[Ý
ÊÎœHL\™]\›žÝÝ[ÛÝ[šK›[™ÝÎš__X\Þ[˜È˜[Y]ÜœÊŠ^Û]^ÛY]Ùž‹“Y]Ù•˜[Y]ÜœË\˜[\Î›ŸNÜ™]\›ˆ\Ë™ÐØ[
Ý”\˜[\Ë™[˜ÛÙU˜[Y]ÜœËÝ”™\ÜÛœÙ\Ë™XÛÙU˜[Y]ÜœÊ_X\Þ[˜È˜[Y]ÜœÐ[
Š^Û]V×KOLKHLKÏ[ŽÙ›ÜŠÈ\ŽÊ^Û]OX]ØZ]\Ë˜[Y]ÜœÊÜ\—ÜYÙNLZYÚ›ËYÙNš_JNÝœ\Ú
‹‹˜K˜[Y]ÜœÊKÏ[ßK˜›ØÚÒZYÚ›[™ÝKÝ[ÚJÊÎœHL\™]\›žØ›ØÚÒZYÚ›ÏÏÌÛÝ[›[™ÝÝ[›[™Ý˜[Y]ÜœÎ_X\Þ[˜ÈÐØ[
‹J^Û]]
ŠKÏX]ØZ]\Ë˜ÛY[™^XÝ]JŠNÜ™]\›ˆJÊ_\ÝXœØÜšX™J‹
^ÚYŠJžKš[œÝ[˜ÙSÙ”œÔÝ™X[Z[™ÐÛY[
J\Ë˜ÛY[
J]›ÝÈ™]È\œ›ÜŠ•\È”ÈÛY[\HØ[››ÝÝXœØÜšX™HÈ]™[ÈŠNÛ]O\Ý”\˜[\Ë™[˜ÛÙTÝXœØÜšX™JŠNÜ™]\›ˆ\Ë˜ÛY[›\Ý[ŠJK›X\
ÏO
ÊJ__NÐ™ÛÛY]PÛY[TL_JNÝ˜\ˆMRJ™OžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\J™‹—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNØ™‹•›ÝU\O]›ÚYØ™‹˜œ›ØYØ\ÝÞ[˜ÔÝXØÙ\ÜÏXÝNØ™‹˜œ›ØYØ\ÝÛÛ[Z]ÝXØÙ\ÜÏ]]NÙ[˜Ý[ÛˆÝJJ^Ü™]\›ˆK˜ÛÙOOOLY[˜Ý[Ûˆ]JJ^Ü™]\›ˆK˜ÚXÚÕ˜ÛÙOOOL	‰ˆHYK™[]™\•	‰™K™[]™\•˜ÛÙOOOL]˜\ˆÊ[˜Ý[ÛŠJ^ÙVÙK”™U›ÝOLWOH”™U›ÝH‹VÙK”™PÛÛ[Z]L—OH”™PÛÛ[Z]ŸJJ
™‹•›ÝU\O\^ßJJ_JNÝ˜\ˆžORJ	ÏOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\J	Ë—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÉË•›ÝU\OIË˜œ›ØYØ\ÝÞ[˜ÔÝXØÙ\ÜÏIË˜œ›ØYØ\ÝÛÛ[Z]ÝXØÙ\ÜÏIË”ÝXœØÜš\[Û‘]™[\OIË“Y]ÙIËÛÛY]PÛY[]›ÚYÝ˜\ˆ]O]

NÓØš™XÝ™Yš[™T›Ü\J	ËÛÛY]PÛY[‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ]KÛÛY]PÛY[_JNÝ˜\ˆÍTÞJ
NÓØš™XÝ™Yš[™T›Ü\J	Ë“Y]Ù‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆÍ“Y]Ù_JNÓØš™XÝ™Yš[™T›Ü\J	Ë”ÝXœØÜš\[Û‘]™[\H‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆÍ”ÝXœØÜš\[Û‘]™[\__JNÝ˜\ˆÌOZM

NÓØš™XÝ™Yš[™T›Ü\J	Ë˜œ›ØYØ\ÝÛÛ[Z]ÝXØÙ\ÜÈ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆÌK˜œ›ØYØ\ÝÛÛ[Z]ÝXØÙ\Üß_JNÓØš™XÝ™Yš[™T›Ü\J	Ë˜œ›ØYØ\ÝÞ[˜ÔÝXØÙ\ÜÈ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆÌK˜œ›ØYØ\ÝÞ[˜ÔÝXØÙ\Üß_JNÓØš™XÝ™Yš[™T›Ü\J	Ë•›ÝU\H‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆÌK•›ÝU\__J_JNÝ˜\ˆORJYOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\JY—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÛY›X^O[NÛY™XÝ[Û˜\žUÔÝš[™ÓX\YÝNÛY™[˜ÛÙTÝš[™Ï\NÛY™[˜ÛÙU]˜\š[TŽÛY™[˜ÛÙU[YOR]NÛY™[˜ÛÙPž]\ÏZNÛY™[˜ÛÙU™\œÚ[Û^]NÛY™[˜ÛÙP›ØÚÒYPNÝ˜\ˆOZÛŠ
NÙ[˜Ý[ÛˆJKŠ^Ü™]\›ˆO[[Ý›ÚY™JŠ_Y[˜Ý[ÛˆÝJJ^Û][™]ÈX\Ù›ÜŠ]ÙˆØš™XÝšÙ^\ÊJJ^Û]OYVÝNÚYŠ\[ÙˆHOHœÝš[™ÈŠ]›ÝÈ™]È\œ›ÜŠ‘›Ý[™XÝ[Û˜\žH˜[YHÙˆ\HÝ\ˆ[ˆÝš[™ÈŠNÛ‹œÙ]
J_\™]\›ˆŸY[˜Ý[ÛˆJJ^Û]JKÕ]Ž
JJNÜ™]\›ˆZ[\œ˜^K™œ›ÛJÛ‹›[™Ý‹‹›—J_Y[˜Ý[ÛˆŠJ^Ü™]\›ˆOLLŽÕZ[\œ˜^K™œ›ÛJÙIŒM_LŽ‹‹”ŠOÊWJN•Z[\œ˜^K™œ›ÛJÙIŒMWJ_Y[˜Ý[Ûˆ]JJ^Û]YK™Ù][YJ
KSX]™›ÛÜŠ‹ÌYLÊKO]ÖÎ‹‹”Š
WN›™]ÈZ[\œ˜^KJK›˜[›ÜÙXÛÛ™ß
JÛ‰LYLÊŒYM‹Ï\ÖÌM‹‹‹”ŠŠWN›™]ÈZ[\œ˜^NÜ™]\›ˆZ[\œ˜^K™œ›ÛJË‹‹šK‹‹›×J_Y[˜Ý[ÛˆJJ^ÚYŠK›[™ÝLLŽ
]›ÝÈ™]È\œ›ÜŠ“›Ý[\[Y[Y›Üˆž]H\œ˜^\ÈÙˆ[™ÝLŽÜˆ[Ü™HŠNÜ™]\›ˆK›[™ÝÕZ[\œ˜^K™œ›ÛJÙK›[™Ý‹‹™WJN›™]ÈZ[\œ˜^_Y[˜Ý[Ûˆ]JJ^Û]YK˜›ØÚÏÕZ[\œ˜^K™œ›ÛJÎ‹‹”ŠK˜›ØÚÊWJN›™]ÈZ[\œ˜^KYK˜\ÕZ[\œ˜^K™œ›ÛJÌM‹‹‹”ŠK˜\
WJN›™]ÈZ[\œ˜^NÜ™]\›ˆZ[\œ˜^K™œ›ÛJË‹‹›‹‹‹J_Y[˜Ý[ÛˆJJ^Ü™]\›ˆZ[\œ˜^K™œ›ÛJÌLKš\Ú›[™Ý‹‹™Kš\ÚNKœ\Ëš\Ú›[™Ý
ÍKœ\ËÝ[NKœ\Ëš\Ú›[™Ý‹‹™Kœ\Ëš\ÚJ__JNÝ˜\ˆžORJOOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\JK—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNØK”ÝXœØÜš\[Û‘]™[\OXK“Y]Ù]›ÚYØK˜Z[]Y\žO[]NÝ˜\ˆMÊ[˜Ý[ÛŠJ^ÙKX˜ÚR[™›ÏH˜X˜ÚWÚ[™›È‹KX˜ÚT]Y\žOH˜X˜ÚWÜ]Y\žH‹K›ØÚÏH˜›ØÚÈ‹K›ØÚØÚZ[H˜›ØÚØÚZ[ˆ‹K›ØÚÔ™\Ý[ÏH˜›ØÚ×Ü™\Ý[È‹K›ØÚÔÙX\˜ÚH˜›ØÚ×ÜÙX\˜Ú‹Kœ›ØYØ\Ý\Þ[˜ÏH˜œ›ØYØ\ÝÝØ\Þ[˜È‹Kœ›ØYØ\ÝÞ[˜ÏH˜œ›ØYØ\ÝÝÜÞ[˜È‹Kœ›ØYØ\ÝÛÛ[Z]H˜œ›ØYØ\ÝÝØÛÛ[Z]‹KÛÛ[Z]H˜ÛÛ[Z]‹K‘Ù[™\Ú\ÏH™Ù[™\Ú\È‹K’X[HšX[‹K“[U[˜ÛÛ™š\›YYÏH›[WÝ[˜ÛÛ™š\›YYÝÈ‹K”Ý]\ÏHœÝ]\È‹K”ÝXœØÜšX™OHœÝXœØÜšX™H‹K•H‹K•ÙX\˜ÚHÜÙX\˜Ú‹K•˜[Y]ÜœÏH˜[Y]ÜœÈ‹K•[œÝXœØÜšX™OH[œÝXœØÜšX™HŸJJM
K“Y]ÙXM^ßJJNÝ˜\ˆÍÊ[˜Ý[ÛŠJ^ÙK“™]Ð›ØÚÏH“™]Ð›ØÚÈ‹K“™]Ð›ØÚÒXY\H“™]Ð›ØÚÒXY\ˆ‹K•H•ŸJJÍ
K”ÝXœØÜš\[Û‘]™[\O\Í^ßJJNÙ[˜Ý[Ûˆ]JJ^Û]JKYÜÏÙKYÜÎ–×JK›X\
O˜	Ü‹šÙ^_OIÉÜ‹˜[Y_IØ
KOYKœ˜]ÏÖÙKœ˜]×N–×NÜ™]\›–Ë‹‹‹‹šWKš›Ú[ŠˆS‘Š__JNÝ˜\ˆRJÙOžÈ\ÙHÝšXÝŽÝ˜\ˆÝOPÙ	‰Ù—×ØÜ™X]Pš[™[™ß
Øš™XÝ˜Ü™X]OÊ[˜Ý[ÛŠK‹J^ÚOOO]›ÚY	‰ŠO]
NÝ˜\ˆSØš™XÝ™Ù]ÝÛ”›Ü\Q\ØÜš\ÜŠ‹
NÊ\Ÿ
™Ù]š[ˆÈ[‹—×Ù\Ó[Ù[Nœ‹Üš]X›_‹˜ÛÛ™šYÝ\˜X›JJI‰Š^Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ–Ý__JKØš™XÝ™Yš[™T›Ü\JKKŠ_JNŠ[˜Ý[ÛŠK‹J^ÚOOO]›ÚY	‰ŠO]
KVÚWO[–Ý_JJKÝOPÙ	‰Ù—×ÜÙ][Ù[QY˜][
Øš™XÝ˜Ü™X]OÊ[˜Ý[ÛŠKŠ^ÓØš™XÝ™Yš[™T›Ü\JK™Y˜][‹Ù[[Y\˜X›NˆL˜[YN›ŸJ_JN™[˜Ý[ÛŠKŠ^ÙK™Y˜][[ŸJKÝOPÙ	‰Ù—×Ú[\ÜÝ\Ÿ
[˜Ý[ÛŠ
^Ý˜\ˆOY[˜Ý[ÛŠŠ^Ü™]\›ˆOSØš™XÝ™Ù]ÝÛ”›Ü\S˜[Y\ß[˜Ý[ÛŠ
^Ý˜\ˆOV×NÙ›ÜŠ˜\ˆˆ[ˆ
SØš™XÝœ›ÝÝ\Kš\ÓÝÛ”›Ü\K˜Ø[
ŠI‰ŠVÚK›[™ÝO\ŠNÜ™]\›ˆ_KJŠ_NÜ™]\›ˆ[˜Ý[ÛŠŠ^ÚYŠ‰‰›‹—×Ù\Ó[Ù[J\™]\›ˆŽÝ˜\ˆ^ßNÚYŠˆO[[
Y›ÜŠ˜\ˆOYJŠKLÜK›[™ÝÜŠÊÊZVÜ—HOOH™Y˜][‰‰ÝJ‹VÜ—JNÜ™]\›ˆÝJŠK_JJ
NÓØš™XÝ™Yš[™T›Ü\JÙ—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÐÙ”\˜[\Ï]›ÚYÝ˜\ˆOZÛŠ
K\Ï]ÝJ
K]OQYŠ
K[Ï[^J
KœÏTJ
K]OZÝJžJ
JNÙ[˜Ý[ÛˆŒJJ^Ü™]\›žÚZYÚŠœË›X^JJ\ËœÛX[[Ð\KKšZYÚ
__Y[˜Ý[ÛˆÝJJ^Ü™]\›žÛZ[’ZYÚŠœË›X^JJ\ËœÛX[[Ð\KK›Z[’ZYÚ
KX^ZYÚŠœË›X^JJ\ËœÛX[[Ð\KK›X^ZYÚ
__Y[˜Ý[ÛˆJJ^Ü™]\›žÜ]Y\žN™Kœ]Y\žKYÙNŠœË›X^JJ\ËœÛX[[Ð\KKœYÙJK\—ÜYÙNŠœË›X^JJ\ËœÛX[[Ð\KKœ\—ÜYÙJKÜ™\—ØžN™K›Ü™\—Øž__Y[˜Ý[ÛˆJJ^Ü™]\›žÜ]Š]KšÚXÚÓ›Û‘[\TÝš[™ÊJKœ]
K]NŠKÒ^
JK™]JKZYÚŠœË›X^JJ\ËœÛX[[Ð\KKšZYÚ
K›Ý™N™Kœ›Ý™__Y[˜Ý[ÛˆJJ^Ü™]\›žÝŠKÐ˜\ÙM
JK
__Y[˜Ý[ÛˆJJ^Ü™]\›žÚ\ÚŠKÐ˜\ÙM
JKš\Ú
K›Ý™N™Kœ›Ý™__Y[˜Ý[ÛˆJJ^Ü™]\›žÜ]Y\žN™Kœ]Y\žK›Ý™N™Kœ›Ý™KYÙNŠœË›X^JJ\ËœÛX[[Ð\KKœYÙJK\—ÜYÙNŠœË›X^JJ\ËœÛX[[Ð\KKœ\—ÜYÙJKÜ™\—ØžN™K›Ü™\—Øž__Y[˜Ý[ÛˆÝJJ^Ü™]\›žÚZYÚŠœË›X^JJ\ËœÛX[[Ð\KKšZYÚ
KYÙNŠœË›X^JJ\ËœÛX[[Ð\KKœYÙJK\—ÜYÙNŠœË›X^JJ\ËœÛX[[Ð\KKœ\—ÜYÙJ__]˜\ˆŒOXÛ\ÜÞÜÝ]XÈ[˜ÛÙPX˜ÚR[™›ÊŠ^Ü™]\›Š[Ë˜Ü™X]RœÛÛ”œÔ™\]Y\Ý
J‹›Y]Ù
_\Ý]XÈ[˜ÛÙPX˜ÚT]Y\žJŠ^Ü™]\›Š[Ë˜Ü™X]RœÛÛ”œÔ™\]Y\Ý
J‹›Y]ÙJ‹œ\˜[\ÊJ_\Ý]XÈ[˜ÛÙP›ØÚÊŠ^Ü™]\›Š[Ë˜Ü™X]RœÛÛ”œÔ™\]Y\Ý
J‹›Y]ÙŒJ‹œ\˜[\ÊJ_\Ý]XÈ[˜ÛÙP›ØÚØÚZ[ŠŠ^Ü™]\›Š[Ë˜Ü™X]RœÛÛ”œÔ™\]Y\Ý
J‹›Y]ÙÝJ‹œ\˜[\ÊJ_\Ý]XÈ[˜ÛÙP›ØÚÔ™\Ý[ÊŠ^Ü™]\›Š[Ë˜Ü™X]RœÛÛ”œÔ™\]Y\Ý
J‹›Y]ÙŒJ‹œ\˜[\ÊJ_\Ý]XÈ[˜ÛÙP›ØÚÔÙX\˜Ú
Š^Ü™]\›Š[Ë˜Ü™X]RœÛÛ”œÔ™\]Y\Ý
J‹›Y]ÙJ‹œ\˜[\ÊJ_\Ý]XÈ[˜ÛÙPœ›ØYØ\Ý
Š^Ü™]\›Š[Ë˜Ü™X]RœÛÛ”œÔ™\]Y\Ý
J‹›Y]ÙJ‹œ\˜[\ÊJ_\Ý]XÈ[˜ÛÙPÛÛ[Z]
Š^Ü™]\›Š[Ë˜Ü™X]RœÛÛ”œÔ™\]Y\Ý
J‹›Y]ÙŒJ‹œ\˜[\ÊJ_\Ý]XÈ[˜ÛÙQÙ[™\Ú\ÊŠ^Ü™]\›Š[Ë˜Ü™X]RœÛÛ”œÔ™\]Y\Ý
J‹›Y]Ù
_\Ý]XÈ[˜ÛÙRX[
Š^Ü™]\›Š[Ë˜Ü™X]RœÛÛ”œÔ™\]Y\Ý
J‹›Y]Ù
_\Ý]XÈ[˜ÛÙS[U[˜ÛÛ™š\›YYÊŠ^Ü™]\›Š[Ë˜Ü™X]RœÛÛ”œÔ™\]Y\Ý
J‹›Y]Ù
_\Ý]XÈ[˜ÛÙTÝ]\ÊŠ^Ü™]\›Š[Ë˜Ü™X]RœÛÛ”œÔ™\]Y\Ý
J‹›Y]Ù
_\Ý]XÈ[˜ÛÙTÝXœØÜšX™JŠ^Û]^ÚÙ^NˆK™]™[‹˜[YN›‹œ]Y\žK\_KOT]K˜Z[]Y\žJÝYÜÎ–ÝK˜]Î›‹œ]Y\žKœ˜]ßJNÜ™]\›Š[Ë˜Ü™X]RœÛÛ”œÔ™\]Y\Ý
JœÝXœØÜšX™H‹Ü]Y\žNš_J_\Ý]XÈ[˜ÛÙU
Š^Ü™]\›Š[Ë˜Ü™X]RœÛÛ”œÔ™\]Y\Ý
J‹›Y]ÙJ‹œ\˜[\ÊJ_\Ý]XÈ[˜ÛÙUÙX\˜Ú
Š^Ü™]\›Š[Ë˜Ü™X]RœÛÛ”œÔ™\]Y\Ý
J‹›Y]ÙJ‹œ\˜[\ÊJ_\Ý]XÈ[˜ÛÙU˜[Y]ÜœÊŠ^Ü™]\›Š[Ë˜Ü™X]RœÛÛ”œÔ™\]Y\Ý
J‹›Y]ÙÝJ‹œ\˜[\ÊJ__NÐÙ”\˜[\ÏXŒ_JNÝ˜\ˆÍRJžOOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\JžK—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÝžKš\ÚQNÝžKš\Ú›ØÚÏRNÝ˜\ˆŒOXšJ
K›ÏTJ
NÙ[˜Ý[ÛˆJJ^Ü™]\›ŠŒKœÚLMŠJJ_Y[˜Ý[Ûˆ]JJ^ÚYŠOJ]›ÝÈ™]È\œ›ÜŠØ[››ÝÜ][ˆ[\H™YHŠNÛ]LŠŠ“X]™›ÛÜŠX]›ÙÌŠJJNÜ™]\›ˆOÛŽ›‹ÌŸY[˜Ý[ÛˆJJ^Û][™]ÈŒK”ÚLMŠZ[\œ˜^K™œ›ÛJÌJJNÜ™]\›ˆ‹\]JJK‹™YÙ\Ý

_Y[˜Ý[ÛˆJKŠ^Û][™]ÈŒK”ÚLMŠZ[\œ˜^K™œ›ÛJÌWJJNÜ™]\›ˆ\]JJK\]JŠK™YÙ\Ý

_Y[˜Ý[ÛˆŒJJ^ÜÝÚ]Ú
K›[™Ý
^ØØ\ÙH›ÝÈ™]È\œ›ÜŠØ[››Ý\Ú[\H™YHŠNØØ\ÙHNœ™]\›ˆJVÌJNÙY˜][žÛ]U]JK›[™Ý
KSŒJKœÛXÙJŠJKOSŒJKœÛXÙJŠJNÜ™]\›ˆJJ___Y[˜Ý[ÛˆJJ^ÚYŠYK›\Ý›ØÚÒY
]›ÝÈ™]È\œ›ÜŠ’\Ú[™ÈH›ØÚÈXY\ˆÚ]›È\Ý›ØÚÈQ
K™KˆXY\ˆ]ZYÚJH\È›ÝÝ\ÜYˆYˆ[ÝH™YY\ËÛÛšX][ÛœÈ\™HÙ[ÛÛYKˆX\ÙHYØÝ[Y[][Ûˆ[™\Ý™XÝÜœÈ›Üˆ\ÈØ\ÙKˆŠNÛ]VÊ›Ë™[˜ÛÙU™\œÚ[ÛŠJK™\œÚ[ÛŠK
›Ë™[˜ÛÙTÝš[™ÊJK˜ÚZ[’Y
K
›Ë™[˜ÛÙU]˜\š[
JKšZYÚ
K
›Ë™[˜ÛÙU[YJJK[YJK
›Ë™[˜ÛÙP›ØÚÒY
JK›\Ý›ØÚÒY
K
›Ë™[˜ÛÙPž]\ÊJK›\ÝÛÛ[Z]\Ú
K
›Ë™[˜ÛÙPž]\ÊJK™]R\Ú
K
›Ë™[˜ÛÙPž]\ÊJK˜[Y]ÜœÒ\Ú
K
›Ë™[˜ÛÙPž]\ÊJK›™^˜[Y]ÜœÒ\Ú
K
›Ë™[˜ÛÙPž]\ÊJK˜ÛÛœÙ[œÝ\Ò\Ú
K
›Ë™[˜ÛÙPž]\ÊJK˜\\Ú
K
›Ë™[˜ÛÙPž]\ÊJK›\Ý™\Ý[Ò\Ú
K
›Ë™[˜ÛÙPž]\ÊJK™]šY[˜ÙR\Ú
K
›Ë™[˜ÛÙPž]\ÊJKœ›ÜÜÙ\Y™\ÜÊWNÜ™]\›ˆŒJŠ__JNÝ˜\ˆRJ™OžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\J™—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÖ™”™\ÜÛœÙ\Ï]›ÚYÖ™™XÛÙQ]™[PMÖ™™XÛÙU˜[Y]Ü•\]OYÍÖ™™XÛÙPÛÛ[Z]ULNÖ™™XÛÙU˜[Y]Ü‘Ù[™\Ú\Ï\Ö™™XÛÙU˜[Y]Ü’[™›ÏUNÝ˜\ˆ	ZÛŠ
KMX\Š
KÙÏSYÊ
K[]ÝJ
KYOQYŠ
K]ORÊ
KÙTJ
KOXÍ

NÙ[˜Ý[Ûˆ]JJ^Ü™]\›žÙ]N™K™]K\Ý›ØÚÒZYÚŠÙ›X^JJ[‹˜\UÔÛX[[K›\ÝØ›ØÚ×ÚZYÚ
K\Ý›ØÚÐ\\ÚŠÙ›X^JJ	‹™œ›ÛP˜\ÙMK›\ÝØ›ØÚ×Ø\Ú\Ú
__Y[˜Ý[ÛˆJJ^Ü™]\›žÛÜÎ™K›ÜË›X\
OŠÝ\N›‹\KÙ^NŠ	‹™œ›ÛP˜\ÙM
J‹šÙ^JK]NŠ	‹™œ›ÛP˜\ÙM
J‹™]J_JJ__Y[˜Ý[ÛˆÝJJ^Ü™]\›žÚÙ^NŠ	‹™œ›ÛP˜\ÙM
J
YKšÚXÚÔÝš[™ÊJKšÙ^OÏÈˆŠJK˜[YNŠ	‹™œ›ÛP˜\ÙM
J
YKšÚXÚÔÝš[™ÊJK˜[YOÏÈˆŠJK›ÛÙŽŠÙ›X^JJKKœ›ÛÙ“ÜÊKZYÚŠÙ›X^JJ[‹˜\UÔÛX[[KšZYÚ
KÛÙNŠÙ›X^JJ[‹˜\UÔÛX[[K˜ÛÙJKÛÙ\ÜXÙNŠYKšÚXÚÔÝš[™ÊJK˜ÛÙ\ÜXÙOÏÈˆŠK[™^ŠÙ›X^JJ[‹˜\UÔÛX[[Kš[™^
KÙÎ™K›ÙË[™›ÎŠYKšÚXÚÔÝš[™ÊJKš[™›ÏÏÈˆŠ__Y[˜Ý[ÛˆÝJJ^Ü™]\›žÚÙ^NŠYKšÚXÚÓ›Û‘[\TÝš[™ÊJKšÙ^JK˜[YN™K˜[YOÏÈˆŸ_Y[˜Ý[ÛˆJJ^Ü™]\›ŠYKšÚXÚÐ\œ˜^JJJK›X\
ÝJ_Y[˜Ý[ÛˆM
J^Ü™]\›žÝ\N™K\K]šX]\Î™K˜]šX]\ÏÕJK˜]šX]\ÊN–×__Y[˜Ý[Ûˆ
J^Ü™]\›ŠYKšÚXÚÐ\œ˜^JJJK›X\
M
_Y[˜Ý[Ûˆ™ŠJ^Ü™]\›žØÛÙNŠ[‹˜\UÔÛX[[
J
YKšÚXÚÓ[X™\ŠJK˜ÛÙOÏÌ
JKÛÙ\ÜXÙN™K˜ÛÙ\ÜXÙKÙÎ™K›ÙË]NŠÙ›X^JJ	‹™œ›ÛP˜\ÙMK™]JK]™[Î™K™]™[ÏÙ
K™]™[ÊN–×KØ\ÕØ[YŠ[‹˜\UÐšYÒ[
JK™Ø\×ÝØ[YÏÈŒŠKØ\Õ\ÙYŠ[‹˜\UÐšYÒ[
JK™Ø\×Ý\ÙYÏÈŒŠ__Y[˜Ý[ÛˆJJ^ÚYŠ”Ý[Hš[ˆJ^Û]ÖÛ‹WOSØš™XÝ™[šY\ÊK”Ý[K˜[YJNÜ™]\›ŠM˜\ÜÙ\
JOOH™YMLNHŸOOHœÙXÜMšÌH‹[šÛ›ÝÛˆXšÙ^H\Nˆ	ÛŸX
KØ[ÛÜš]N›‹]NŠ	‹™œ›ÛP˜\ÙM
J
YKšÚXÚÓ›Û‘[\TÝš[™ÊJ
J__Y[ÙHÝÚ]Ú
K\J^ØØ\ÙH[™\›Z[ÔX’Ù^QYMLNHŽœ™]\›žØ[ÛÜš]Nˆ™YMLNH‹]NŠ	‹™œ›ÛP˜\ÙM
J
YKšÚXÚÓ›Û‘[\TÝš[™ÊJK˜[YJJ_NØØ\ÙH[™\›Z[ÔX’Ù^TÙXÜMšÌHŽœ™]\›žØ[ÛÜš]NˆœÙXÜMšÌH‹]NŠ	‹™œ›ÛP˜\ÙM
J
YKšÚXÚÓ›Û‘[\TÝš[™ÊJK˜[YJJ_NÙY˜][›ÝÈ™]È\œ›ÜŠ[šÛ›ÝÛˆXšÙ^H\Nˆ	ÙK\_X
__Y[˜Ý[ÛˆÝJJ^Ü™]\›žÛX^ž]\ÎŠ[‹˜\UÔÛX[[
J
YKšÚXÚÓ›Û‘[\TÝš[™ÊJK›X^Øž]\ÊJKX^Ø\ÎŠ[‹˜\UÔÛX[[
J
YKšÚXÚÓ›Û‘[\TÝš[™ÊJK›X^ÙØ\ÊJ__Y[˜Ý[ÛˆÝJJ^Ü™]\›žÛX^YÙS[P›ØÚÜÎŠ[‹˜\UÔÛX[[
J
YKšÚXÚÓ›Û‘[\TÝš[™ÊJK›X^ØYÙWÛ[WØ›ØÚÜÊJKX^YÙQ\˜][ÛŽŠ[‹˜\UÔÛX[[
J
YKšÚXÚÓ›Û‘[\TÝš[™ÊJK›X^ØYÙWÙ\˜][ÛŠJ__Y[˜Ý[Ûˆ
J^Ü™]\›žØ›ØÚÎ™K˜›ØÚÏÕÝJ
YKšÚXÚÓØš™XÝ
JK˜›ØÚÊJN›ÚY]šY[˜ÙN™K™]šY[˜ÙOÒÝJ
YKšÚXÚÓØš™XÝ
JK™]šY[˜ÙJJN›ÚY_Y[˜Ý[ÛˆÍ
J^Ü™]\›žÜXšÙ^N‘J
YKšÚXÚÓØš™XÝ
JKœX—ÚÙ^JJK›Ý[™ÔÝÙ\ŽŠ[‹˜\UÐšYÒ[
JKœÝÙ\ÏÈŒŠ__Y[˜Ý[ÛˆJJ^Ü™]\›žÚZYÚŠ[‹˜\UÔÛX[[
J
YKšÚXÚÓ›Û‘[\TÝš[™ÊJKšZYÚ
JK™\Ý[ÎŠK×Ü™\Ý[ß×JK›X\
™ŠK˜[Y]Ü•\]\ÎŠK˜[Y]Ü—Ý\]\ß×JK›X\
Í
KÛÛœÙ[œÝ\Õ\]\ÎŠÙ›X^JJK˜ÛÛœÙ[œÝ\×Ü\˜[WÝ\]\ÊKš[˜[^™P›ØÚÑ]™[Î™
K™š[˜[^™WØ›ØÚ×Ù]™[ß×J__Y[˜Ý[ÛˆÞJJ^Ü™]\›žÚ\ÚŠ	‹™œ›ÛR^
J
YKšÚXÚÓ›Û‘[\TÝš[™ÊJKš\Ú
JK\ÎžÝÝ[ŠYKšÚXÚÓ›Û–™\›Ó[X™\ŠJKœ\ËÝ[
K\ÚŠ	‹™œ›ÛR^
J
YKšÚXÚÓ›Û‘[\TÝš[™ÊJKœ\Ëš\Ú
J___Y[˜Ý[Ûˆ]JJ^Ü™]\›žØ›ØÚÎŠ[‹˜\UÔÛX[[
JK˜›ØÚÊK\Š[‹˜\UÔÛX[[
JK˜\ÏÌ
__Y[˜Ý[ÛˆJJ^Ü™]\›žÝ™\œÚ[ÛŽ–]JK™\œÚ[ÛŠKÚZ[’YŠYKšÚXÚÓ›Û‘[\TÝš[™ÊJK˜ÚZ[—ÚY
KZYÚŠ[‹˜\UÔÛX[[
J
YKšÚXÚÓ›Û‘[\TÝš[™ÊJKšZYÚ
JK[YNŠÙË™œ›ÛT™˜ÌÌÌÎUÚ]˜[›ÜÙXÛÛ™ÊJ
YKšÚXÚÓ›Û‘[\TÝš[™ÊJK[YJJK\Ý›ØÚÒY™K›\ÝØ›ØÚ×ÚYš\ÚÓÞJK›\ÝØ›ØÚ×ÚY
N›[\ÝÛÛ[Z]\ÚŠ	‹™œ›ÛR^
J
YKšÚXÚÔÙ]
JK›\ÝØÛÛ[Z]Ú\Ú
JK]R\ÚŠ	‹™œ›ÛR^
J
YKšÚXÚÔÙ]
JK™]WÚ\Ú
JK˜[Y]ÜœÒ\ÚŠ	‹™œ›ÛR^
J
YKšÚXÚÔÙ]
JK˜[Y]Üœ×Ú\Ú
JK™^˜[Y]ÜœÒ\ÚŠ	‹™œ›ÛR^
J
YKšÚXÚÔÙ]
JK›™^Ý˜[Y]Üœ×Ú\Ú
JKÛÛœÙ[œÝ\Ò\ÚŠ	‹™œ›ÛR^
J
YKšÚXÚÔÙ]
JK˜ÛÛœÙ[œÝ\×Ú\Ú
JK\\ÚŠ	‹™œ›ÛR^
J
YKšÚXÚÔÙ]
JK˜\Ú\Ú
JK\Ý™\Ý[Ò\ÚŠ	‹™œ›ÛR^
J
YKšÚXÚÔÙ]
JK›\ÝÜ™\Ý[×Ú\Ú
JK]šY[˜ÙR\ÚŠ	‹™œ›ÛR^
J
YKšÚXÚÔÙ]
JK™]šY[˜ÙWÚ\Ú
JK›ÜÜÙ\Y™\ÜÎŠ	‹™œ›ÛR^
J
YKšÚXÚÓ›Û‘[\TÝš[™ÊJKœ›ÜÜÙ\—ØY™\ÜÊJ__Y[˜Ý[ÛˆJJ^Ü™]\›žØ›ØÚÒY“ÞJK˜›ØÚ×ÚY
K›ØÚÔÚ^™NŠ[‹˜\UÔÛX[[
J
YKšÚXÚÓ›Û‘[\TÝš[™ÊJK˜›ØÚ×ÜÚ^™JJKXY\Ž‘JKšXY\ŠK[UÎŠ[‹˜\UÔÛX[[
J
YKšÚXÚÓ›Û‘[\TÝš[™ÊJK›[WÝÊJ__Y[˜Ý[ÛˆJJ^Ü™]\›žÛ\ÝZYÚŠ[‹˜\UÔÛX[[
J
YKšÚXÚÓ›Û‘[\TÝš[™ÊJK›\ÝÚZYÚ
JK›ØÚÓY]\ÎŠYKšÚXÚÐ\œ˜^JJK˜›ØÚ×ÛY]\ÊK›X\
J__Y[˜Ý[ÛˆJJ^Ü™]\›žË‹‹“™ŠJK\ÚŠ	‹™œ›ÛR^
J
YKšÚXÚÓ›Û‘[\TÝš[™ÊJKš\Ú
J__Y[˜Ý[Ûˆ	JJ^Û]YKÜ™\Ý[Ó™ŠKÜ™\Ý[
N›ÚYÜ™]\›žÚZYÚŠ[‹˜\UÔÛX[[
JKšZYÚ
K\ÚŠ	‹™œ›ÛR^
J
YKšÚXÚÓ›Û‘[\TÝš[™ÊJKš\Ú
JKÚXÚÕ“™Š
YKšÚXÚÓØš™XÝ
JK˜ÚXÚ×Ý
JK[]™\•›‹™\Ý[›Ÿ_Y[˜Ý[ÛˆJJ^Ü™]\›ŠM˜\ÜÙ\
JH[ˆ]K›ØÚÒY›YÊK_Y[˜Ý[Ûˆ\™JJ^Ü™]\›žØ›ØÚÒY›YÎšJK˜›ØÚ×ÚYÙ›YÊK˜[Y]ÜY™\ÜÎ™K˜[Y]Ü—ØY™\ÜÏÊ	‹™œ›ÛR^
JK˜[Y]Ü—ØY™\ÜÊN›ÚY[Y\Ý[\™K[Y\Ý[\ÊÙË™œ›ÛT™˜ÌÌÌÎUÚ]˜[›ÜÙXÛÛ™ÊJK[Y\Ý[\
N›ÚYÚYÛ˜]\™N™KœÚYÛ˜]\™OÊ	‹™œ›ÛP˜\ÙM
JKœÚYÛ˜]\™JN›ÚY_Y[˜Ý[ÛˆLJJ^Ü™]\›žØ›ØÚÒY“ÞJ
YKšÚXÚÓØš™XÝ
JK˜›ØÚ×ÚY
JKZYÚŠ[‹˜\UÔÛX[[
J
YKšÚXÚÓ›Û‘[\TÝš[™ÊJKšZYÚ
JK›Ý[™Š[‹˜\UÔÛX[[
JKœ›Ý[™
KÚYÛ˜]\™\Î™KœÚYÛ˜]\™\ÏÊYKšÚXÚÐ\œ˜^JJKœÚYÛ˜]\™\ÊK›X\
\™JN–×__Y[˜Ý[Ûˆœ™JJ^Ü™]\›žØØ[›ÛšXØ[ŠYKšÚXÚÐ›ÛÛX[ŠJK˜Ø[›ÛšXØ[
KXY\Ž‘JKœÚYÛ™YÚXY\‹šXY\ŠKÛÛ[Z]•LJKœÚYÛ™YÚXY\‹˜ÛÛ[Z]
__Y[˜Ý[Ûˆ
J^Ü™]\›žØY™\ÜÎŠ	‹™œ›ÛR^
J
YKšÚXÚÓ›Û‘[\TÝš[™ÊJK˜Y™\ÜÊJKXšÙ^N‘J
YKšÚXÚÓØš™XÝ
JKœX—ÚÙ^JJK›Ý[™ÔÝÙ\ŽŠ[‹˜\UÐšYÒ[
J
YKšÚXÚÓ›Û‘[\TÝš[™ÊJKœÝÙ\ŠJ__Y[˜Ý[Ûˆ™JJ^Ü™]\›žÙÙ[™\Ú\Õ[YNŠÙË™œ›ÛT™˜ÌÌÌÎUÚ]˜[›ÜÙXÛÛ™ÊJ
YKšÚXÚÓ›Û‘[\TÝš[™ÊJK™Ù[™\Ú\×Ý[YJJKÚZ[’YŠYKšÚXÚÓ›Û‘[\TÝš[™ÊJK˜ÚZ[—ÚY
KÛÛœÙ[œÝ\Ô\˜[\Î›
K˜ÛÛœÙ[œÝ\×Ü\˜[\ÊK˜[Y]ÜœÎ™K˜[Y]ÜœÏÊYKšÚXÚÐ\œ˜^JJK˜[Y]ÜœÊK›X\

N–×K\\ÚŠ	‹™œ›ÛR^
J
YKšÚXÚÔÙ]
JK˜\Ú\Ú
JK\Ý]N™K˜\ÜÝ]__Y[˜Ý[ÛˆJJ^Ü™]\›žÜXšÙ^N‘J
YKšÚXÚÓØš™XÝ
JKœX—ÚÙ^JJK›Ý[™ÔÝÙ\ŽŠ[‹˜\UÐšYÒ[
J
YKšÚXÚÓ›Û‘[\TÝš[™ÊJK›Ý[™×ÜÝÙ\ŠJKY™\ÜÎŠ	‹™œ›ÛR^
J
YKšÚXÚÓ›Û‘[\TÝš[™ÊJK˜Y™\ÜÊJK›ÜÜÙ\”š[Üš]N™Kœ›ÜÜÙ\—Üš[Üš]OÊ[‹˜\UÔÛX[[
JKœ›ÜÜÙ\—Üš[Üš]JN›ÚY_Y[˜Ý[Ûˆœ™JJ^Ü™]\›žÚYŠ	‹™œ›ÛR^
J
YKšÚXÚÓ›Û‘[\TÝš[™ÊJKšY
JK\Ý[YŽŠYKšÚXÚÓ›Û‘[\TÝš[™ÊJK›\Ý[—ØYŠK™]ÛÜšÎŠYKšÚXÚÓ›Û‘[\TÝš[™ÊJK›™]ÛÜšÊK™\œÚ[ÛŽŠYKšÚXÚÔÝš[™ÊJK™\œÚ[ÛŠKÚ[›™[ÎŠYKšÚXÚÔÝš[™ÊJK˜Ú[›™[ÊK[ÛšZÙ\ŽŠYKšÚXÚÓ›Û‘[\TÝš[™ÊJK›[ÛšZÙ\ŠKÝ\ŽŠÙ™XÝ[Û˜\žUÔÝš[™ÓX\
JK›Ý\ŠK›ÝØÛÛ™\œÚ[ÛŽžØ\Š[‹˜\UÔÛX[[
J
YKšÚXÚÓ›Û‘[\TÝš[™ÊJKœ›ÝØÛÛÝ™\œÚ[Û‹˜\
JK›ØÚÎŠ[‹˜\UÔÛX[[
J
YKšÚXÚÓ›Û‘[\TÝš[™ÊJKœ›ÝØÛÛÝ™\œÚ[Û‹˜›ØÚÊJKœŠ[‹˜\UÔÛX[[
J
YKšÚXÚÓ›Û‘[\TÝš[™ÊJKœ›ÝØÛÛÝ™\œÚ[Û‹œœ
J___Y[˜Ý[Ûˆ\™JJ^Û]YK™X\›Y\ÝØ›ØÚ×ÚZYÚÊ[‹˜\UÔÛX[[
JK™X\›Y\ÝØ›ØÚ×ÚZYÚ
N›ÚYYK™X\›Y\ÝØ›ØÚ×Ý[YOÊÙË™œ›ÛT™˜ÌÌÌÎUÚ]˜[›ÜÙXÛÛ™ÊJK™X\›Y\ÝØ›ØÚ×Ý[YJN›ÚYÜ™]\›žÙX\›Y\Ý\\Ú™K™X\›Y\ÝØ\Ú\ÚÊ	‹™œ›ÛR^
JK™X\›Y\ÝØ\Ú\Ú
N›ÚYX\›Y\Ý›ØÚÒ\Ú™K™X\›Y\ÝØ›ØÚ×Ú\ÚÊ	‹™œ›ÛR^
JK™X\›Y\ÝØ›ØÚ×Ú\Ú
N›ÚYX\›Y\Ý›ØÚÒZYÚ›Ÿ›ÚYX\›Y\Ý›ØÚÕ[YNË™Ù][YJ
OÝ›ÚY]\Ý›ØÚÒ\ÚŠ	‹™œ›ÛR^
J
YKšÚXÚÓ›Û‘[\TÝš[™ÊJK›]\ÝØ›ØÚ×Ú\Ú
JK]\Ý\\ÚŠ	‹™œ›ÛR^
J
YKšÚXÚÓ›Û‘[\TÝš[™ÊJK›]\ÝØ\Ú\Ú
JK]\Ý›ØÚÕ[YNŠÙË™œ›ÛT™˜ÌÌÌÎUÚ]˜[›ÜÙXÛÛ™ÊJ
YKšÚXÚÓ›Û‘[\TÝš[™ÊJK›]\ÝØ›ØÚ×Ý[YJJK]\Ý›ØÚÒZYÚŠ[‹˜\UÔÛX[[
J
YKšÚXÚÓ›Û‘[\TÝš[™ÊJK›]\ÝØ›ØÚ×ÚZYÚ
JKØ]Ú[™Õ\ŠYKšÚXÚÐ›ÛÛX[ŠJK˜Ø]Ú[™×Ý\
__Y[˜Ý[ÛˆÜ™JJ^Ü™]\›žÛ›ÙR[™›Îœœ™JK››ÙWÚ[™›ÊKÞ[˜Ò[™›Îš\™JKœÞ[˜×Ú[™›ÊK˜[Y]Ü’[™›Î•JK˜[Y]Ü—Ú[™›Ê__Y[˜Ý[Ûˆ\™JJ^Ü™]\›žÙ]NŠ	‹™œ›ÛP˜\ÙM
J
YKšÚXÚÓ›Û‘[\TÝš[™ÊJK™]JJK›ÛÝ\ÚŠ	‹™œ›ÛR^
J
YKšÚXÚÓ›Û‘[\TÝš[™ÊJKœ›ÛÝÚ\Ú
JK›ÛÙŽžÝÝ[Š[‹˜\UÔÛX[[
J
YKšÚXÚÓ›Û‘[\TÝš[™ÊJKœ›ÛÙ‹Ý[
JK[™^Š[‹˜\UÔÛX[[
J
YKšÚXÚÓ›Û‘[\TÝš[™ÊJKœ›ÛÙ‹š[™^
JKXY’\ÚŠ	‹™œ›ÛP˜\ÙM
J
YKšÚXÚÓ›Û‘[\TÝš[™ÊJKœ›ÛÙ‹›XY—Ú\Ú
JK][ÎŠYKšÚXÚÐ\œ˜^JJKœ›ÛÙ‹˜][ÊK›X\
	‹™œ›ÛP˜\ÙM
___Y[˜Ý[ÛˆM
J^Ü™]\›žÝŠ	‹™œ›ÛP˜\ÙM
J
YKšÚXÚÓ›Û‘[\TÝš[™ÊJK
JK™\Ý[“™Š
YKšÚXÚÓØš™XÝ
JKÜ™\Ý[
JKZYÚŠ[‹˜\UÔÛX[[
J
YKšÚXÚÓ›Û‘[\TÝš[™ÊJKšZYÚ
JK[™^Š[‹˜\UÔÛX[[
J
YKšÚXÚÓ[X™\ŠJKš[™^
JK\ÚŠ	‹™œ›ÛR^
J
YKšÚXÚÓ›Û‘[\TÝš[™ÊJKš\Ú
JK›ÛÙŽŠÙ›X^JJ\™KKœ›ÛÙŠ__Y[˜Ý[ÛˆÜ™JJ^Ü™]\›žÝÝ[ÛÝ[Š[‹˜\UÔÛX[[
J
YKšÚXÚÓ›Û‘[\TÝš[™ÊJKÝ[ØÛÝ[
JKÎŠYKšÚXÚÐ\œ˜^JJKÊK›X\
M
__Y[˜Ý[Ûˆ™JJ^Û]J	‹™œ›ÛP˜\ÙM
J
YKšÚXÚÓ›Û‘[\TÝš[™ÊJK
JNÜ™]\›žÝ›‹\ÚŠKš\Ú
JŠK™\Ý[“™ŠKœ™\Ý[
KZYÚŠ[‹˜\UÔÛX[[
J
YKšÚXÚÓ›Û‘[\TÝš[™ÊJKšZYÚ
J__Y[˜Ý[ÛˆÜ™JJ^Ü™]\›žØ›ØÚÒZYÚŠ[‹˜\UÔÛX[[
J
YKšÚXÚÓ›Û‘[\TÝš[™ÊJK˜›ØÚ×ÚZYÚ
JK˜[Y]ÜœÎŠYKšÚXÚÐ\œ˜^JJK˜[Y]ÜœÊK›X\
JKÛÝ[Š[‹˜\UÔÛX[[
J
YKšÚXÚÓ›Û‘[\TÝš[™ÊJK˜ÛÝ[
JKÝ[Š[‹˜\UÔÛX[[
J
YKšÚXÚÓ›Û‘[\TÝš[™ÊJKÝ[
J__Y[˜Ý[Ûˆ
J^Ü™]\›žÚXY\Ž‘J
YKšÚXÚÓØš™XÝ
JKšXY\ŠJK\ÝÛÛ[Z]™K›\ÝØÛÛ[Z]˜›ØÚ×ÚYš\ÚÕLJ
YKšÚXÚÓØš™XÝ
JK›\ÝØÛÛ[Z]
JN›[Î™K™]KÏÊYKšÚXÚÐ\œ˜^JJK™]KÊK›X\
	‹™œ›ÛP˜\ÙM
N–×K]šY[˜ÙN™K™]šY[˜ÙOË™]šY[˜ÙOÏÖ×__Y[˜Ý[ÛˆM
J^Ü™]\›žØ›ØÚÒY“ÞJK˜›ØÚ×ÚY
K›ØÚÎš
K˜›ØÚÊ__Y[˜Ý[Ûˆ\™JJ^Ü™]\›žÝÝ[ÛÝ[Š[‹˜\UÔÛX[[
J
YKšÚXÚÓ›Û‘[\TÝš[™ÊJKÝ[ØÛÝ[
JK›ØÚÜÎŠYKšÚXÚÐ\œ˜^JJK˜›ØÚÜÊK›X\
M
__Y[˜Ý[Ûˆ\™JJ^Ü™]\›žÝÝ[Š[‹˜\UÔÛX[[
J
YKšÚXÚÓ›Û‘[\TÝš[™ÊJKÝ[
JKÝ[ž]\ÎŠ[‹˜\UÔÛX[[
J
YKšÚXÚÓ›Û‘[\TÝš[™ÊJKÝ[Øž]\ÊJ__]˜\ˆÌOXÛ\ÜÈ^ÜÝ]XÈXÛÙPX˜ÚR[™›ÊŠ^Ü™]\›ˆ]J
YKšÚXÚÓØš™XÝ
J‹œ™\Ý[œ™\ÜÛœÙJJ_\Ý]XÈXÛÙPX˜ÚT]Y\žJŠ^Ü™]\›ˆÝJ
YKšÚXÚÓØš™XÝ
J‹œ™\Ý[œ™\ÜÛœÙJJ_\Ý]XÈXÛÙP›ØÚÊŠ^Ü™]\›ˆM
‹œ™\Ý[
_\Ý]XÈXÛÙP›ØÚÔ™\Ý[ÊŠ^Ü™]\›ˆJ‹œ™\Ý[
_\Ý]XÈXÛÙP›ØÚÔÙX\˜Ú
Š^Ü™]\›ˆ\™J‹œ™\Ý[
_\Ý]XÈXÛÙP›ØÚØÚZ[ŠŠ^Ü™]\›ˆJ‹œ™\Ý[
_\Ý]XÈXÛÙPœ›ØYØ\ÝÞ[˜ÊŠ^Ü™]\›ˆJ‹œ™\Ý[
_\Ý]XÈXÛÙPœ›ØYØ\Ý\Þ[˜ÊŠ^Ü™]\›ˆK™XÛÙPœ›ØYØ\ÝÞ[˜ÊŠ_\Ý]XÈXÛÙPœ›ØYØ\ÝÛÛ[Z]
Š^Ü™]\›ˆ	J‹œ™\Ý[
_\Ý]XÈXÛÙPÛÛ[Z]
Š^Ü™]\›ˆœ™J‹œ™\Ý[
_\Ý]XÈXÛÙQÙ[™\Ú\ÊŠ^Ü™]\›ˆ™J
YKšÚXÚÓØš™XÝ
J‹œ™\Ý[™Ù[™\Ú\ÊJ_\Ý]XÈXÛÙRX[

^Ü™]\›ˆ[\Ý]XÈXÛÙS[U[˜ÛÛ™š\›YYÊŠ^Ü™]\›ˆ\™J‹œ™\Ý[
_\Ý]XÈXÛÙTÝ]\ÊŠ^Ü™]\›ˆÜ™J‹œ™\Ý[
_\Ý]XÈXÛÙS™]Ð›ØÚÑ]™[
Š^Ü™]\›ˆ
‹™]K˜[YK˜›ØÚÊ_\Ý]XÈXÛÙS™]Ð›ØÚÒXY\‘]™[
Š^Ü™]\›ˆJ‹™]K˜[YKšXY\Š_\Ý]XÈXÛÙU]™[
Š^Ü™]\›ˆ™J‹™]K˜[YK•™\Ý[
_\Ý]XÈXÛÙU
Š^Ü™]\›ˆM
‹œ™\Ý[
_\Ý]XÈXÛÙUÙX\˜Ú
Š^Ü™]\›ˆÜ™J‹œ™\Ý[
_\Ý]XÈXÛÙU˜[Y]ÜœÊŠ^Ü™]\›ˆÜ™J‹œ™\Ý[
__NÖ™”™\ÜÛœÙ\ÏSÌ_JNÝ˜\ˆMRJ™OžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\J™‹—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÝ™‹”™\ÜÛœÙ\Ï]™‹”\˜[\Ï]›ÚYÝ˜\ˆœ™OY

NÓØš™XÝ™Yš[™T›Ü\J™‹”\˜[\È‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆœ™K”\˜[\ß_JNÝ˜\ˆ™OP

NÓØš™XÝ™Yš[™T›Ü\J™‹”™\ÜÛœÙ\È‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ™K”™\ÜÛœÙ\ß_J_JNÝ˜\ˆÍRJÙOžÈ\ÙHÝšXÝŽÝ˜\ˆÜ™OZÙ	‰šÙ—×ØÜ™X]Pš[™[™ß
Øš™XÝ˜Ü™X]OÊ[˜Ý[ÛŠK‹J^ÚOOO]›ÚY	‰ŠO]
NÝ˜\ˆSØš™XÝ™Ù]ÝÛ”›Ü\Q\ØÜš\ÜŠ‹
NÊ\Ÿ
™Ù]š[ˆÈ[‹—×Ù\Ó[Ù[Nœ‹Üš]X›_‹˜ÛÛ™šYÝ\˜X›JJI‰Š^Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ–Ý__JKØš™XÝ™Yš[™T›Ü\JKKŠ_JNŠ[˜Ý[ÛŠK‹J^ÚOOO]›ÚY	‰ŠO]
KVÚWO[–Ý_JJK™OZÙ	‰šÙ—×ÜÙ][Ù[QY˜][
Øš™XÝ˜Ü™X]OÊ[˜Ý[ÛŠKŠ^ÓØš™XÝ™Yš[™T›Ü\JK™Y˜][‹Ù[[Y\˜X›NˆL˜[YN›ŸJ_JN™[˜Ý[ÛŠKŠ^ÙK™Y˜][[ŸJK\™OZÙ	‰šÙ—×Ú[\ÜÝ\Ÿ
[˜Ý[ÛŠ
^Ý˜\ˆOY[˜Ý[ÛŠŠ^Ü™]\›ˆOSØš™XÝ™Ù]ÝÛ”›Ü\S˜[Y\ß[˜Ý[ÛŠ
^Ý˜\ˆOV×NÙ›ÜŠ˜\ˆˆ[ˆ
SØš™XÝœ›ÝÝ\Kš\ÓÝÛ”›Ü\K˜Ø[
ŠI‰ŠVÚK›[™ÝO\ŠNÜ™]\›ˆ_KJŠ_NÜ™]\›ˆ[˜Ý[ÛŠŠ^ÚYŠ‰‰›‹—×Ù\Ó[Ù[J\™]\›ˆŽÝ˜\ˆ^ßNÚYŠˆO[[
Y›ÜŠ˜\ˆOYJŠKLÜK›[™ÝÜŠÊÊZVÜ—HOOH™Y˜][‰‰™Ü™J‹VÜ—JNÜ™]\›ˆ™JŠK_JJ
NÓØš™XÝ™Yš[™T›Ü\JÙ—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÚÙÛÛY]ÎÛY[]›ÚYÝ˜\ˆ^O\YÊ
K[M

KœR\™JžJ
JKOXÛ\ÜÈ^ÜÝ]XÈ\Þ[˜ÈÛÛ›™XÝ
Š^Û]Ü™]\›ˆ\[ÙˆOH›Øš™XÝÝ[™]È^K’ÛY[
ŠN[‹œÝ\ÕÚ]
š‹ËÈŠ_‹œÝ\ÕÚ]
šÎ‹ËÈŠOÛ™]È^K’ÛY[
ŠN›™]È^K•ÙXœÛØÚÙ]ÛY[
ŠKK˜Ü™X]J
_\Ý]XÈÜ™X]JŠ^Ü™]\›ˆ™]ÈJŠ_XÛY[ØÛÛœÝXÝÜŠŠ^Ý\Ë˜ÛY[[ŸY\ØÛÛ›™XÝ

^Ý\Ë˜ÛY[™\ØÛÛ›™XÝ

_X\Þ[˜ÈX˜ÚR[™›Ê
^Û]^ÛY]Ù’œ‹“Y]ÙX˜ÚR[™›ßNÜ™]\›ˆ\Ë™ÐØ[
‹”\˜[\Ë™[˜ÛÙPX˜ÚR[™›Ë”™\ÜÛœÙ\Ë™XÛÙPX˜ÚR[™›Ê_X\Þ[˜ÈX˜ÚT]Y\žJŠ^Û]^Ü\˜[\Î›‹Y]Ù’œ‹“Y]ÙX˜ÚT]Y\ž_NÜ™]\›ˆ\Ë™ÐØ[
”\˜[\Ë™[˜ÛÙPX˜ÚT]Y\žK”™\ÜÛœÙ\Ë™XÛÙPX˜ÚT]Y\žJ_X\Þ[˜È›ØÚÊŠ^Û]^ÛY]Ù’œ‹“Y]Ù›ØÚË\˜[\ÎžÚZYÚ›Ÿ_NÜ™]\›ˆ\Ë™ÐØ[
”\˜[\Ë™[˜ÛÙP›ØÚË”™\ÜÛœÙ\Ë™XÛÙP›ØÚÊ_X\Þ[˜È›ØÚÔ™\Ý[ÊŠ^Û]^ÛY]Ù’œ‹“Y]Ù›ØÚÔ™\Ý[Ë\˜[\ÎžÚZYÚ›Ÿ_NÜ™]\›ˆ\Ë™ÐØ[
”\˜[\Ë™[˜ÛÙP›ØÚÔ™\Ý[Ë”™\ÜÛœÙ\Ë™XÛÙP›ØÚÔ™\Ý[Ê_X\Þ[˜È›ØÚÔÙX\˜Ú
Š^Û]^Ü\˜[\Î›‹Y]Ù’œ‹“Y]Ù›ØÚÔÙX\˜ÚKOX]ØZ]\Ë™ÐØ[
”\˜[\Ë™[˜ÛÙP›ØÚÔÙX\˜Ú”™\ÜÛœÙ\Ë™XÛÙP›ØÚÔÙX\˜Ú
NÜ™]\›žË‹‹šK›ØÚÜÎ–Ë‹‹šK˜›ØÚÜ×KœÛÜ

‹ÊOOœ‹˜›ØÚËšXY\‹šZYÚ[Ë˜›ØÚËšXY\‹šZYÚ
__X\Þ[˜È›ØÚÔÙX\˜Ú[
Š^Û][‹œYÙ_KOV×KHLNÙ›ÜŠÈ\ŽÊ^Û]ÏX]ØZ]\Ë˜›ØÚÔÙX\˜Ú
Ë‹‹›‹YÙNJNÚKœ\Ú
‹‹›Ë˜›ØÚÜÊKK›[™ÝËÝ[ÛÝ[Ý
ÊÎœHL\™]\›ˆKœÛÜ

ËJOO›Ë˜›ØÚËšXY\‹šZYÚXK˜›ØÚËšXY\‹šZYÚ
KÝÝ[ÛÝ[šK›[™Ý›ØÚÜÎš__X\Þ[˜È›ØÚØÚZ[Š‹
^Û]O^ÛY]Ù’œ‹“Y]Ù›ØÚØÚZ[‹\˜[\ÎžÛZ[’ZYÚ›‹X^ZYÚ_NÜ™]\›ˆ\Ë™ÐØ[
K”\˜[\Ë™[˜ÛÙP›ØÚØÚZ[‹”™\ÜÛœÙ\Ë™XÛÙP›ØÚØÚZ[Š_X\Þ[˜Èœ›ØYØ\ÝÞ[˜ÊŠ^Û]^Ü\˜[\Î›‹Y]Ù’œ‹“Y]Ùœ›ØYØ\ÝÞ[˜ßNÜ™]\›ˆ\Ë™ÐØ[
”\˜[\Ë™[˜ÛÙPœ›ØYØ\Ý”™\ÜÛœÙ\Ë™XÛÙPœ›ØYØ\ÝÞ[˜Ê_X\Þ[˜Èœ›ØYØ\Ý\Þ[˜ÊŠ^Û]^Ü\˜[\Î›‹Y]Ù’œ‹“Y]Ùœ›ØYØ\Ý\Þ[˜ßNÜ™]\›ˆ\Ë™ÐØ[
”\˜[\Ë™[˜ÛÙPœ›ØYØ\Ý”™\ÜÛœÙ\Ë™XÛÙPœ›ØYØ\Ý\Þ[˜Ê_X\Þ[˜Èœ›ØYØ\ÝÛÛ[Z]
Š^Û]^Ü\˜[\Î›‹Y]Ù’œ‹“Y]Ùœ›ØYØ\ÝÛÛ[Z]NÜ™]\›ˆ\Ë™ÐØ[
”\˜[\Ë™[˜ÛÙPœ›ØYØ\Ý”™\ÜÛœÙ\Ë™XÛÙPœ›ØYØ\ÝÛÛ[Z]
_X\Þ[˜ÈÛÛ[Z]
Š^Û]^ÛY]Ù’œ‹“Y]ÙÛÛ[Z]\˜[\ÎžÚZYÚ›Ÿ_NÜ™]\›ˆ\Ë™ÐØ[
”\˜[\Ë™[˜ÛÙPÛÛ[Z]”™\ÜÛœÙ\Ë™XÛÙPÛÛ[Z]
_X\Þ[˜ÈÙ[™\Ú\Ê
^Û]^ÛY]Ù’œ‹“Y]Ù‘Ù[™\Ú\ßNÜ™]\›ˆ\Ë™ÐØ[
‹”\˜[\Ë™[˜ÛÙQÙ[™\Ú\Ë”™\ÜÛœÙ\Ë™XÛÙQÙ[™\Ú\Ê_X\Þ[˜ÈX[

^Û]^ÛY]Ù’œ‹“Y]Ù’X[NÜ™]\›ˆ\Ë™ÐØ[
‹”\˜[\Ë™[˜ÛÙRX[”™\ÜÛœÙ\Ë™XÛÙRX[
_X\Þ[˜È[U[˜ÛÛ™š\›YYÊ
^Û]^ÛY]Ù’œ‹“Y]Ù“[U[˜ÛÛ™š\›YYßNÜ™]\›ˆ\Ë™ÐØ[
‹”\˜[\Ë™[˜ÛÙS[U[˜ÛÛ™š\›YYË”™\ÜÛœÙ\Ë™XÛÙS[U[˜ÛÛ™š\›YYÊ_X\Þ[˜ÈÝ]\Ê
^Û]^ÛY]Ù’œ‹“Y]Ù”Ý]\ßNÜ™]\›ˆ\Ë™ÐØ[
‹”\˜[\Ë™[˜ÛÙTÝ]\Ë”™\ÜÛœÙ\Ë™XÛÙTÝ]\Ê_\ÝXœØÜšX™S™]Ð›ØÚÊ
^Û]^ÛY]Ù’œ‹“Y]Ù”ÝXœØÜšX™K]Y\žNžÝ\N’œ‹”ÝXœØÜš\[Û‘]™[\K“™]Ð›ØÚß_NÜ™]\›ˆ\ËœÝXœØÜšX™J‹”™\ÜÛœÙ\Ë™XÛÙS™]Ð›ØÚÑ]™[
_\ÝXœØÜšX™S™]Ð›ØÚÒXY\Š
^Û]^ÛY]Ù’œ‹“Y]Ù”ÝXœØÜšX™K]Y\žNžÝ\N’œ‹”ÝXœØÜš\[Û‘]™[\K“™]Ð›ØÚÒXY\Ÿ_NÜ™]\›ˆ\ËœÝXœØÜšX™J‹”™\ÜÛœÙ\Ë™XÛÙS™]Ð›ØÚÒXY\‘]™[
_\ÝXœØÜšX™U
Š^Û]^ÛY]Ù’œ‹“Y]Ù”ÝXœØÜšX™K]Y\žNžÝ\N’œ‹”ÝXœØÜš\[Û‘]™[\K•˜]Î›Ÿ_NÜ™]\›ˆ\ËœÝXœØÜšX™J”™\ÜÛœÙ\Ë™XÛÙU]™[
_X\Þ[˜È
Š^Û]^Ü\˜[\Î›‹Y]Ù’œ‹“Y]Ù•NÜ™]\›ˆ\Ë™ÐØ[
”\˜[\Ë™[˜ÛÙU”™\ÜÛœÙ\Ë™XÛÙU
_X\Þ[˜ÈÙX\˜Ú
Š^Û]^Ü\˜[\Î›‹Y]Ù’œ‹“Y]Ù•ÙX\˜ÚNÜ™]\›ˆ\Ë™ÐØ[
”\˜[\Ë™[˜ÛÙUÙX\˜Ú”™\ÜÛœÙ\Ë™XÛÙUÙX\˜Ú
_X\Þ[˜ÈÙX\˜Ú[
Š^Û][‹œYÙ_KOV×KHLNÙ›ÜŠÈ\ŽÊ^Û]ÏX]ØZ]\ËÙX\˜Ú
Ë‹‹›‹YÙNJNÚKœ\Ú
‹‹›ËÊKK›[™ÝËÝ[ÛÝ[Ý
ÊÎœHL\™]\›žÝÝ[ÛÝ[šK›[™ÝÎš__X\Þ[˜È˜[Y]ÜœÊŠ^Û]^ÛY]Ù’œ‹“Y]Ù•˜[Y]ÜœË\˜[\Î›ŸNÜ™]\›ˆ\Ë™ÐØ[
”\˜[\Ë™[˜ÛÙU˜[Y]ÜœË”™\ÜÛœÙ\Ë™XÛÙU˜[Y]ÜœÊ_X\Þ[˜È˜[Y]ÜœÐ[
Š^Û]V×KOLKHLKÏ[ŽÙ›ÜŠÈ\ŽÊ^Û]OX]ØZ]\Ë˜[Y]ÜœÊÜ\—ÜYÙNLZYÚ›ËYÙNš_JNÝœ\Ú
‹‹˜K˜[Y]ÜœÊKÏ[ßK˜›ØÚÒZYÚ›[™ÝKÝ[ÚJÊÎœHL\™]\›žØ›ØÚÒZYÚ›ÏÏÌÛÝ[›[™ÝÝ[›[™Ý˜[Y]ÜœÎ_X\Þ[˜ÈÐØ[
‹J^Û]]
ŠKÏX]ØZ]\Ë˜ÛY[™^XÝ]JŠNÜ™]\›ˆJÊ_\ÝXœØÜšX™J‹
^ÚYŠJ^Kš[œÝ[˜ÙSÙ”œÔÝ™X[Z[™ÐÛY[
J\Ë˜ÛY[
J]›ÝÈ™]È\œ›ÜŠ•\È”ÈÛY[\HØ[››ÝÝXœØÜšX™HÈ]™[ÈŠNÛ]OY”\˜[\Ë™[˜ÛÙTÝXœØÜšX™JŠNÜ™]\›ˆ\Ë˜ÛY[›\Ý[ŠJK›X\
ÏO
ÊJ__NÚÙÛÛY]ÎÛY[^_JNÝ˜\ˆÍRJÙOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\JÙ‹—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÓÙ‹•›ÝU\O]›ÚYÓÙ‹˜œ›ØYØ\ÝÞ[˜ÔÝXØÙ\ÜÏZ™NÓÙ‹˜œ›ØYØ\ÝÛÛ[Z]ÝXØÙ\ÜÏ^\™NÙ[˜Ý[Ûˆ™JJ^Ü™]\›ˆK˜ÛÙOOOLY[˜Ý[Ûˆ\™JJ^Ü™]\›ˆK˜ÚXÚÕ˜ÛÙOOOL	‰ˆHYK™[]™\•	‰™K™[]™\•˜ÛÙOOOL]˜\ˆÍÊ[˜Ý[ÛŠJ^ÙVÙK”™U›ÝOLWOH”™U›ÝH‹VÙK”™PÛÛ[Z]L—OH”™PÛÛ[Z]ŸJJÍ
Ù‹•›ÝU\OTÍ^ßJJ_JNÝ˜\ˆORJXOOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\JXK—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÙXK•›ÝU\OYXK˜œ›ØYØ\ÝÞ[˜ÔÝXØÙ\ÜÏYXK˜œ›ØYØ\ÝÛÛ[Z]ÝXØÙ\ÜÏYXK”ÝXœØÜš\[Û‘]™[\OYXK“Y]ÙYXKÛÛY]ÎÛY[]›ÚYÝ˜\ˆœ™OPÍ

NÓØš™XÝ™Yš[™T›Ü\JXKÛÛY]ÎÛY[‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆœ™KÛÛY]ÎÛY[_JNÝ˜\ˆMSžJ
NÓØš™XÝ™Yš[™T›Ü\JXK“Y]Ù‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆM“Y]Ù_JNÓØš™XÝ™Yš[™T›Ü\JXK”ÝXœØÜš\[Û‘]™[\H‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆM”ÝXœØÜš\[Û‘]™[\__JNÝ˜\ˆŒOZÍ

NÓØš™XÝ™Yš[™T›Ü\JXK˜œ›ØYØ\ÝÛÛ[Z]ÝXØÙ\ÜÈ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆŒK˜œ›ØYØ\ÝÛÛ[Z]ÝXØÙ\Üß_JNÓØš™XÝ™Yš[™T›Ü\JXK˜œ›ØYØ\ÝÞ[˜ÔÝXØÙ\ÜÈ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆŒK˜œ›ØYØ\ÝÞ[˜ÔÝXØÙ\Üß_JNÓØš™XÝ™Yš[™T›Ü\JXK•›ÝU\H‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆŒK•›ÝU\__J_JNÝ˜\ˆORJOOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\JK—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÔK”ÝXœØÜš\[Û‘]™[\OTK“Y]Ù]›ÚYÔK˜Z[]Y\žO[\™NÝ˜\ˆMÊ[˜Ý[ÛŠJ^ÙKX˜ÚR[™›ÏH˜X˜ÚWÚ[™›È‹KX˜ÚT]Y\žOH˜X˜ÚWÜ]Y\žH‹K›ØÚÏH˜›ØÚÈ‹K›ØÚØÚZ[H˜›ØÚØÚZ[ˆ‹K›ØÚÔ™\Ý[ÏH˜›ØÚ×Ü™\Ý[È‹K›ØÚÔÙX\˜ÚH˜›ØÚ×ÜÙX\˜Ú‹Kœ›ØYØ\Ý\Þ[˜ÏH˜œ›ØYØ\ÝÝØ\Þ[˜È‹Kœ›ØYØ\ÝÞ[˜ÏH˜œ›ØYØ\ÝÝÜÞ[˜È‹Kœ›ØYØ\ÝÛÛ[Z]H˜œ›ØYØ\ÝÝØÛÛ[Z]‹KÛÛ[Z]H˜ÛÛ[Z]‹K‘Ù[™\Ú\ÏH™Ù[™\Ú\È‹K’X[HšX[‹K“[U[˜ÛÛ™š\›YYÏH›[WÝ[˜ÛÛ™š\›YYÝÈ‹K”Ý]\ÏHœÝ]\È‹K”ÝXœØÜšX™OHœÝXœØÜšX™H‹K•H‹K•ÙX\˜ÚHÜÙX\˜Ú‹K•˜[Y]ÜœÏH˜[Y]ÜœÈ‹K•[œÝXœØÜšX™OH[œÝXœØÜšX™HŸJJM
K“Y]ÙTM^ßJJNÝ˜\ˆÍÊ[˜Ý[ÛŠJ^ÙK“™]Ð›ØÚÏH“™]Ð›ØÚÈ‹K“™]Ð›ØÚÒXY\H“™]Ð›ØÚÒXY\ˆ‹K•H•ŸJJÍ
K”ÝXœØÜš\[Û‘]™[\O]Í^ßJJNÙ[˜Ý[Ûˆ\™JJ^Û]JKYÜÏÙKYÜÎ–×JK›X\
O˜	Ü‹šÙ^_OIÉÜ‹˜[Y_IØ
KOYKœ˜]ÏÖÙKœ˜]×N–×NÜ™]\›–Ë‹‹‹‹šWKš›Ú[ŠˆS‘Š__JNÝ˜\ˆRJOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\J‹—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÑ‹•›ÝU\O]›ÚYÑ‹˜œ›ØYØ\ÝÞ[˜ÔÝXØÙ\ÜÏPÜ™NÑ‹˜œ›ØYØ\ÝÛÛ[Z]ÝXØÙ\ÜÏTÜ™NÙ[˜Ý[ÛˆÜ™JJ^Ü™]\›ˆK˜ÛÙOOOLY[˜Ý[ÛˆÜ™JJ^Ü™]\›ˆK˜ÚXÚÕ˜ÛÙOOOL	‰ˆHYK™[]™\•	‰™K™[]™\•˜ÛÙOOOL]˜\ˆÊ[˜Ý[ÛŠJ^ÙVÙK”™U›ÝOLWOH”™U›ÝH‹VÙK”™PÛÛ[Z]L—OH”™PÛÛ[Z]ŸJJ
‹•›ÝU\OT^ßJJ_JNÝ˜\ˆžORJYOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\JY—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÑY›X^OQ\™NÑY™XÝ[Û˜\žUÔÝš[™ÓX\T\™NÑY™[˜ÛÙTÝš[™Ï]Ü™NÑY™[˜ÛÙU]˜\š[UYŽÑY™[˜ÛÙU[YOTœ™NÑY™[˜ÛÙPž]\ÏXœ™NÑY™[˜ÛÙU™\œÚ[ÛT™NÑY™[˜ÛÙP›ØÚÒYSœ™NÝ˜\ˆÜ™OZÛŠ
NÙ[˜Ý[Ûˆ\™JKŠ^Ü™]\›ˆO[[Ý›ÚY™JŠ_Y[˜Ý[Ûˆ\™JJ^Û][™]ÈX\Ù›ÜŠ]ÙˆØš™XÝšÙ^\ÊJJ^Û]OYVÝNÚYŠ\[ÙˆHOHœÝš[™ÈŠ]›ÝÈ™]È\œ›ÜŠ‘›Ý[™XÝ[Û˜\žH˜[YHÙˆ\HÝ\ˆ[ˆÝš[™ÈŠNÛ‹œÙ]
J_\™]\›ˆŸY[˜Ý[ÛˆÜ™JJ^Û]JÜ™KÕ]Ž
JJNÜ™]\›ˆZ[\œ˜^K™œ›ÛJÛ‹›[™Ý‹‹›—J_Y[˜Ý[ÛˆYŠJ^Ü™]\›ˆOLLŽÕZ[\œ˜^K™œ›ÛJÙIŒM_LŽ‹‹•YŠOÊWJN•Z[\œ˜^K™œ›ÛJÙIŒMWJ_Y[˜Ý[Ûˆœ™JJ^Û]YK™Ù][YJ
KSX]™›ÛÜŠ‹ÌYLÊKO]ÖÎ‹‹•YŠ
WN›™]ÈZ[\œ˜^KJK›˜[›ÜÙXÛÛ™ß
JÛ‰LYLÊŒYM‹Ï\ÖÌM‹‹‹•YŠŠWN›™]ÈZ[\œ˜^NÜ™]\›ˆZ[\œ˜^K™œ›ÛJË‹‹šK‹‹›×J_Y[˜Ý[Ûˆœ™JJ^ÚYŠK›[™ÝLLŽ
]›ÝÈ™]È\œ›ÜŠ“›Ý[\[Y[Y›Üˆž]H\œ˜^\ÈÙˆ[™ÝLŽÜˆ[Ü™HŠNÜ™]\›ˆK›[™ÝÕZ[\œ˜^K™œ›ÛJÙK›[™Ý‹‹™WJN›™]ÈZ[\œ˜^_Y[˜Ý[Ûˆ™JJ^Û]YK˜›ØÚÏÕZ[\œ˜^K™œ›ÛJÎ‹‹•YŠK˜›ØÚÊWJN›™]ÈZ[\œ˜^KYK˜\ÕZ[\œ˜^K™œ›ÛJÌM‹‹‹•YŠK˜\
WJN›™]ÈZ[\œ˜^NÜ™]\›ˆZ[\œ˜^K™œ›ÛJË‹‹›‹‹‹J_Y[˜Ý[Ûˆœ™JJ^Ü™]\›ˆZ[\œ˜^K™œ›ÛJÌLKš\Ú›[™Ý‹‹™Kš\ÚNKœ\Ëš\Ú›[™Ý
ÍKœ\ËÝ[NKœ\Ëš\Ú›[™Ý‹‹™Kœ\Ëš\ÚJ__JNÝ˜\ˆRJYOžÈ\ÙHÝšXÝŽÝ˜\ˆœ™OTY	‰”Y—×ØÜ™X]Pš[™[™ß
Øš™XÝ˜Ü™X]OÊ[˜Ý[ÛŠK‹J^ÚOOO]›ÚY	‰ŠO]
NÝ˜\ˆSØš™XÝ™Ù]ÝÛ”›Ü\Q\ØÜš\ÜŠ‹
NÊ\Ÿ
™Ù]š[ˆÈ[‹—×Ù\Ó[Ù[Nœ‹Üš]X›_‹˜ÛÛ™šYÝ\˜X›JJI‰Š^Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ–Ý__JKØš™XÝ™Yš[™T›Ü\JKKŠ_JNŠ[˜Ý[ÛŠK‹J^ÚOOO]›ÚY	‰ŠO]
KVÚWO[–Ý_JJKÜ™OTY	‰”Y—×ÜÙ][Ù[QY˜][
Øš™XÝ˜Ü™X]OÊ[˜Ý[ÛŠKŠ^ÓØš™XÝ™Yš[™T›Ü\JK™Y˜][‹Ù[[Y\˜X›NˆL˜[YN›ŸJ_JN™[˜Ý[ÛŠKŠ^ÙK™Y˜][[ŸJK™OTY	‰”Y—×Ú[\ÜÝ\Ÿ
[˜Ý[ÛŠ
^Ý˜\ˆOY[˜Ý[ÛŠŠ^Ü™]\›ˆOSØš™XÝ™Ù]ÝÛ”›Ü\S˜[Y\ß[˜Ý[ÛŠ
^Ý˜\ˆOV×NÙ›ÜŠ˜\ˆˆ[ˆ
SØš™XÝœ›ÝÝ\Kš\ÓÝÛ”›Ü\K˜Ø[
ŠI‰ŠVÚK›[™ÝO\ŠNÜ™]\›ˆ_KJŠ_NÜ™]\›ˆ[˜Ý[ÛŠŠ^ÚYŠ‰‰›‹—×Ù\Ó[Ù[J\™]\›ˆŽÝ˜\ˆ^ßNÚYŠˆO[[
Y›ÜŠ˜\ˆOYJŠKLÜK›[™ÝÜŠÊÊZVÜ—HOOH™Y˜][‰‰œ™J‹VÜ—JNÜ™]\›ˆÜ™JŠK_JJ
NÓØš™XÝ™Yš[™T›Ü\JY—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÔY”\˜[\Ï]›ÚYÝ˜\ˆLOZÛŠ
K\Ï]ÝJ
K[Ï[^J
KÜÏRžJ
K\™OQ™JJ
JNÙ[˜Ý[ÛˆLJJ^Ü™]\›žÚZYÚŠÜË›X^JJ\ËœÛX[[Ð\KKšZYÚ
__Y[˜Ý[Ûˆ™JJ^Ü™]\›žÛZ[’ZYÚŠÜË›X^JJ\ËœÛX[[Ð\KK›Z[’ZYÚ
KX^ZYÚŠÜË›X^JJ\ËœÛX[[Ð\KK›X^ZYÚ
__Y[˜Ý[Ûˆ™JJ^Ü™]\›žÜ]Y\žN™Kœ]Y\žKYÙNŠÜË›X^JJ\ËœÛX[[Ð\KKœYÙJK\—ÜYÙNŠÜË›X^JJ\ËœÛX[[Ð\KKœ\—ÜYÙJKÜ™\—ØžN™K›Ü™\—Øž__Y[˜Ý[Ûˆœ™JJ^Ü™]\›žÜ]™Kœ]]NŠLKÒ^
JK™]JKZYÚŠÜË›X^JJ\ËœÛX[[Ð\KKšZYÚ
K›Ý™N™Kœ›Ý™__Y[˜Ý[Ûˆ\™JJ^Ü™]\›žÝŠLKÐ˜\ÙM
JK
__Y[˜Ý[Ûˆœ™JJ^Ü™]\›žÚ\ÚŠLKÐ˜\ÙM
JKš\Ú
K›Ý™N™Kœ›Ý™__Y[˜Ý[Ûˆ\™JJ^Ü™]\›žÜ]Y\žN™Kœ]Y\žK›Ý™N™Kœ›Ý™KYÙNŠÜË›X^JJ\ËœÛX[[Ð\KKœYÙJK\—ÜYÙNŠÜË›X^JJ\ËœÛX[[Ð\KKœ\—ÜYÙJKÜ™\—ØžN™K›Ü™\—Øž__Y[˜Ý[Ûˆ™JJ^Ü™]\›žÚZYÚŠÜË›X^JJ\ËœÛX[[Ð\KKšZYÚ
KYÙNŠÜË›X^JJ\ËœÛX[[Ð\KKœYÙJK\—ÜYÙNŠÜË›X^JJ\ËœÛX[[Ð\KKœ\—ÜYÙJ__]˜\ˆŒOXÛ\ÜÞÜÝ]XÈ[˜ÛÙPX˜ÚR[™›ÊŠ^Ü™]\›Š[Ë˜Ü™X]RœÛÛ”œÔ™\]Y\Ý
J‹›Y]Ù
_\Ý]XÈ[˜ÛÙPX˜ÚT]Y\žJŠ^Ü™]\›Š[Ë˜Ü™X]RœÛÛ”œÔ™\]Y\Ý
J‹›Y]Ùœ™J‹œ\˜[\ÊJ_\Ý]XÈ[˜ÛÙP›ØÚÊŠ^Ü™]\›Š[Ë˜Ü™X]RœÛÛ”œÔ™\]Y\Ý
J‹›Y]ÙLJ‹œ\˜[\ÊJ_\Ý]XÈ[˜ÛÙP›ØÚØÚZ[ŠŠ^Ü™]\›Š[Ë˜Ü™X]RœÛÛ”œÔ™\]Y\Ý
J‹›Y]Ù™J‹œ\˜[\ÊJ_\Ý]XÈ[˜ÛÙP›ØÚÔ™\Ý[ÊŠ^Ü™]\›Š[Ë˜Ü™X]RœÛÛ”œÔ™\]Y\Ý
J‹›Y]ÙLJ‹œ\˜[\ÊJ_\Ý]XÈ[˜ÛÙP›ØÚÔÙX\˜Ú
Š^Ü™]\›Š[Ë˜Ü™X]RœÛÛ”œÔ™\]Y\Ý
J‹›Y]Ù™J‹œ\˜[\ÊJ_\Ý]XÈ[˜ÛÙPœ›ØYØ\Ý
Š^Ü™]\›Š[Ë˜Ü™X]RœÛÛ”œÔ™\]Y\Ý
J‹›Y]Ù\™J‹œ\˜[\ÊJ_\Ý]XÈ[˜ÛÙPÛÛ[Z]
Š^Ü™]\›Š[Ë˜Ü™X]RœÛÛ”œÔ™\]Y\Ý
J‹›Y]ÙLJ‹œ\˜[\ÊJ_\Ý]XÈ[˜ÛÙQÙ[™\Ú\ÊŠ^Ü™]\›Š[Ë˜Ü™X]RœÛÛ”œÔ™\]Y\Ý
J‹›Y]Ù
_\Ý]XÈ[˜ÛÙRX[
Š^Ü™]\›Š[Ë˜Ü™X]RœÛÛ”œÔ™\]Y\Ý
J‹›Y]Ù
_\Ý]XÈ[˜ÛÙS[U[˜ÛÛ™š\›YYÊŠ^Ü™]\›Š[Ë˜Ü™X]RœÛÛ”œÔ™\]Y\Ý
J‹›Y]Ù
_\Ý]XÈ[˜ÛÙTÝ]\ÊŠ^Ü™]\›Š[Ë˜Ü™X]RœÛÛ”œÔ™\]Y\Ý
J‹›Y]Ù
_\Ý]XÈ[˜ÛÙTÝXœØÜšX™JŠ^Û]^ÚÙ^NˆK™]™[‹˜[YN›‹œ]Y\žK\_KOU\™K˜Z[]Y\žJÝYÜÎ–ÝK˜]Î›‹œ]Y\žKœ˜]ßJNÜ™]\›Š[Ë˜Ü™X]RœÛÛ”œÔ™\]Y\Ý
JœÝXœØÜšX™H‹Ü]Y\žNš_J_\Ý]XÈ[˜ÛÙU
Š^Ü™]\›Š[Ë˜Ü™X]RœÛÛ”œÔ™\]Y\Ý
J‹›Y]Ùœ™J‹œ\˜[\ÊJ_\Ý]XÈ[˜ÛÙUÙX\˜Ú
Š^Ü™]\›Š[Ë˜Ü™X]RœÛÛ”œÔ™\]Y\Ý
J‹›Y]Ù\™J‹œ\˜[\ÊJ_\Ý]XÈ[˜ÛÙU˜[Y]ÜœÊŠ^Ü™]\›Š[Ë˜Ü™X]RœÛÛ”œÔ™\]Y\Ý
J‹›Y]Ù™J‹œ\˜[\ÊJ__NÔY”\˜[\ÏQŒ_JNÝ˜\ˆRJ^OOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\J^K—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÜ^Kš\ÚWÜ™NÜ^Kš\Ú›ØÚÏRÜ™NÝ˜\ˆÌOXšJ
K˜ORžJ
NÙ[˜Ý[ÛˆÜ™JJ^Ü™]\›ŠÌKœÚLMŠJJ_Y[˜Ý[ÛˆÜ™JJ^ÚYŠOJ]›ÝÈ™]È\œ›ÜŠØ[››ÝÜ][ˆ[\H™YHŠNÛ]LŠŠ“X]™›ÛÜŠX]›ÙÌŠJJNÜ™]\›ˆOÛŽ›‹ÌŸY[˜Ý[Ûˆœ™JJ^Û][™]ÈÌK”ÚLMŠZ[\œ˜^K™œ›ÛJÌJJNÜ™]\›ˆ‹\]JJK‹™YÙ\Ý

_Y[˜Ý[ÛˆÜ™JKŠ^Û][™]ÈÌK”ÚLMŠZ[\œ˜^K™œ›ÛJÌWJJNÜ™]\›ˆ\]JJK\]JŠK™YÙ\Ý

_Y[˜Ý[ÛˆJJ^ÜÝÚ]Ú
K›[™Ý
^ØØ\ÙH›ÝÈ™]È\œ›ÜŠØ[››Ý\Ú[\H™YHŠNØØ\ÙHNœ™]\›ˆœ™JVÌJNÙY˜][žÛ]QÜ™JK›[™Ý
KRJKœÛXÙJŠJKORJKœÛXÙJŠJNÜ™]\›ˆÜ™JJ___Y[˜Ý[ÛˆÜ™JJ^ÚYŠYK›\Ý›ØÚÒY
]›ÝÈ™]È\œ›ÜŠ’\Ú[™ÈH›ØÚÈXY\ˆÚ]›È\Ý›ØÚÈQ
K™KˆXY\ˆ]ZYÚJH\È›ÝÝ\ÜYˆYˆ[ÝH™YY\ËÛÛšX][ÛœÈ\™HÙ[ÛÛYKˆX\ÙHYØÝ[Y[][Ûˆ[™\Ý™XÝÜœÈ›Üˆ\ÈØ\ÙKˆŠNÛ]VÊ˜K™[˜ÛÙU™\œÚ[ÛŠJK™\œÚ[ÛŠK
˜K™[˜ÛÙTÝš[™ÊJK˜ÚZ[’Y
K
˜K™[˜ÛÙU]˜\š[
JKšZYÚ
K
˜K™[˜ÛÙU[YJJK[YJK
˜K™[˜ÛÙP›ØÚÒY
JK›\Ý›ØÚÒY
K
˜K™[˜ÛÙPž]\ÊJK›\ÝÛÛ[Z]\Ú
K
˜K™[˜ÛÙPž]\ÊJK™]R\Ú
K
˜K™[˜ÛÙPž]\ÊJK˜[Y]ÜœÒ\Ú
K
˜K™[˜ÛÙPž]\ÊJK›™^˜[Y]ÜœÒ\Ú
K
˜K™[˜ÛÙPž]\ÊJK˜ÛÛœÙ[œÝ\Ò\Ú
K
˜K™[˜ÛÙPž]\ÊJK˜\\Ú
K
˜K™[˜ÛÙPž]\ÊJK›\Ý™\Ý[Ò\Ú
K
˜K™[˜ÛÙPž]\ÊJK™]šY[˜ÙR\Ú
K
˜K™[˜ÛÙPž]\ÊJKœ›ÜÜÙ\Y™\ÜÊWNÜ™]\›ˆJŠ__JNÝ˜\ˆMRJØÏOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\JØË—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÑØË”™\ÜÛœÙ\Ï]›ÚYÑØË™XÛÙQ]™[SÍÑØË™XÛÙU˜[Y]Ü•\]OUMÑØË™XÛÙU˜[Y]Ü‘Ù[™\Ú\Ï^ÑØË™XÛÙU˜[Y]Ü’[™›ÏRÌNÝ˜\ˆ›ZÛŠ
KX\Š
K™ÏSYÊ
K]ÝJ
K™OQYŠ
K™ORÊ
KÜÏRžJ
K\™OS

NÙ[˜Ý[Ûˆœ™JJ^Ü™]\›žÙ]N™K™]K\Ý›ØÚÒZYÚŠÜË›X^JJ‹˜\UÔÛX[[K›\ÝØ›ØÚ×ÚZYÚ
K\Ý›ØÚÐ\\ÚŠÜË›X^JJ›‹™œ›ÛP˜\ÙMK›\ÝØ›ØÚ×Ø\Ú\Ú
__Y[˜Ý[Ûˆœ™JJ^Ü™]\›žÛÜÎ™K›ÜË›X\
OŠÝ\N›‹\KÙ^NŠ›‹™œ›ÛP˜\ÙM
J‹šÙ^JK]NŠ›‹™œ›ÛP˜\ÙM
J‹™]J_JJ__Y[˜Ý[Ûˆ™JJ^Ü™]\›žÚÙ^NŠ›‹™œ›ÛP˜\ÙM
J
™KšÚXÚÔÝš[™ÊJKšÙ^OÏÈˆŠJK˜[YNŠ›‹™œ›ÛP˜\ÙM
J
™KšÚXÚÔÝš[™ÊJK˜[YOÏÈˆŠJK›ÛÙŽŠÜË›X^JJœ™KKœ›ÛÙ“ÜÊKZYÚŠÜË›X^JJ‹˜\UÔÛX[[KšZYÚ
KÛÙNŠÜË›X^JJ‹˜\UÔÛX[[K˜ÛÙJKÛÙ\ÜXÙNŠ™KšÚXÚÔÝš[™ÊJK˜ÛÙ\ÜXÙOÏÈˆŠK[™^ŠÜË›X^JJ‹˜\UÔÛX[[Kš[™^
KÙÎ™K›ÙË[™›ÎŠ™KšÚXÚÔÝš[™ÊJKš[™›ÏÏÈˆŠ__Y[˜Ý[Ûˆ	™JJ^Ü™]\›žÚÙ^NŠ™KšÚXÚÓ›Û‘[\TÝš[™ÊJKšÙ^JK˜[YN™K˜[YOÏÈˆŸ_Y[˜Ý[Ûˆœ™JJ^Ü™]\›Š™KšÚXÚÐ\œ˜^JJJK›X\
	™J_Y[˜Ý[ÛˆÍ
J^Ü™]\›žÝ\N™K\K]šX]\Î™K˜]šX]\ÏÚœ™JK˜]šX]\ÊN–×__Y[˜Ý[ÛˆÌJJ^Ü™]\›Š™KšÚXÚÐ\œ˜^JJJK›X\
Í
_Y[˜Ý[ÛˆŠJ^Ü™]\›žØÛÙNŠ‹˜\UÔÛX[[
J
™KšÚXÚÓ[X™\ŠJK˜ÛÙOÏÌ
JKÛÙ\ÜXÙN™K˜ÛÙ\ÜXÙKÙÎ™K›ÙË]NŠÜË›X^JJ›‹™œ›ÛP˜\ÙMK™]JK]™[Î™K™]™[ÏÑÌJK™]™[ÊN–×KØ\ÕØ[YŠ‹˜\UÐšYÒ[
JK™Ø\×ÝØ[YÏÈŒŠKØ\Õ\ÙYŠ‹˜\UÐšYÒ[
JK™Ø\×Ý\ÙYÏÈŒŠ__Y[˜Ý[ÛˆÌJJ^ÚYŠ”Ý[Hš[ˆJ^Û]ÖÛ‹WOSØš™XÝ™[šY\ÊK”Ý[K˜[YJNÜ™]\›Š˜\ÜÙ\
JOOH™YMLNHŸOOHœÙXÜMšÌH‹[šÛ›ÝÛˆXšÙ^H\Nˆ	ÛŸX
KØ[ÛÜš]N›‹]NŠ›‹™œ›ÛP˜\ÙM
J
™KšÚXÚÓ›Û‘[\TÝš[™ÊJ
J__Y[ÙHÝÚ]Ú
K\J^ØØ\ÙH[™\›Z[ÔX’Ù^QYMLNHŽœ™]\›žØ[ÛÜš]Nˆ™YMLNH‹]NŠ›‹™œ›ÛP˜\ÙM
J
™KšÚXÚÓ›Û‘[\TÝš[™ÊJK˜[YJJ_NØØ\ÙH[™\›Z[ÔX’Ù^TÙXÜMšÌHŽœ™]\›žØ[ÛÜš]NˆœÙXÜMšÌH‹]NŠ›‹™œ›ÛP˜\ÙM
J
™KšÚXÚÓ›Û‘[\TÝš[™ÊJK˜[YJJ_NÙY˜][›ÝÈ™]È\œ›ÜŠ[šÛ›ÝÛˆXšÙ^H\Nˆ	ÙK\_X
__Y[˜Ý[ÛˆZYJJ^Ü™]\›žÛX^ž]\ÎŠ‹˜\UÔÛX[[
J
™KšÚXÚÓ›Û‘[\TÝš[™ÊJK›X^Øž]\ÊJKX^Ø\ÎŠ‹˜\UÔÛX[[
J
™KšÚXÚÓ›Û‘[\TÝš[™ÊJK›X^ÙØ\ÊJ__Y[˜Ý[ÛˆšYJJ^Ü™]\›žÛX^YÙS[P›ØÚÜÎŠ‹˜\UÔÛX[[
J
™KšÚXÚÓ›Û‘[\TÝš[™ÊJK›X^ØYÙWÛ[WØ›ØÚÜÊJKX^YÙQ\˜][ÛŽŠ‹˜\UÔÛX[[
J
™KšÚXÚÓ›Û‘[\TÝš[™ÊJK›X^ØYÙWÙ\˜][ÛŠJ__Y[˜Ý[Ûˆ
J^Ü™]\›žØ›ØÚÎ™K˜›ØÚÏÙZYJ
™KšÚXÚÓØš™XÝ
JK˜›ØÚÊJN›ÚY]šY[˜ÙN™K™]šY[˜ÙOÛšYJ
™KšÚXÚÓØš™XÝ
JK™]šY[˜ÙJJN›ÚY_Y[˜Ý[ÛˆM
J^Ü™]\›žÜXšÙ^N•ÌJ
™KšÚXÚÓØš™XÝ
JKœX—ÚÙ^JJK›Ý[™ÔÝÙ\ŽŠ‹˜\UÐšYÒ[
JKœÝÙ\ÏÈŒŠ__Y[˜Ý[ÛˆYJJ^Ü™]\›žÚZYÚŠ‹˜\UÔÛX[[
J
™KšÚXÚÓ›Û‘[\TÝš[™ÊJKšZYÚ
JK™\Ý[ÎŠK×Ü™\Ý[ß×JK›X\
ŠK˜[Y]Ü•\]\ÎŠK˜[Y]Ü—Ý\]\ß×JK›X\
M
KÛÛœÙ[œÝ\Õ\]\ÎŠÜË›X^JJK˜ÛÛœÙ[œÝ\×Ü\˜[WÝ\]\ÊK™YÚ[›ØÚÑ]™[Î‘ÌJK˜™YÚ[—Ø›ØÚ×Ù]™[ß×JK[™›ØÚÑ]™[Î‘ÌJK™[™Ø›ØÚ×Ù]™[ß×J__Y[˜Ý[ÛˆžJJ^Ü™]\›žÚ\ÚŠ›‹™œ›ÛR^
J
™KšÚXÚÓ›Û‘[\TÝš[™ÊJKš\Ú
JK\ÎžÝÝ[Š™KšÚXÚÓ›Û–™\›Ó[X™\ŠJKœ\ËÝ[
K\ÚŠ›‹™œ›ÛR^
J
™KšÚXÚÓ›Û‘[\TÝš[™ÊJKœ\Ëš\Ú
J___Y[˜Ý[ÛˆšYJJ^Ü™]\›žØ›ØÚÎŠ‹˜\UÔÛX[[
JK˜›ØÚÊK\Š‹˜\UÔÛX[[
JK˜\ÏÌ
__Y[˜Ý[Ûˆ^JJ^Ü™]\›žÝ™\œÚ[ÛŽœšYJK™\œÚ[ÛŠKÚZ[’YŠ™KšÚXÚÓ›Û‘[\TÝš[™ÊJK˜ÚZ[—ÚY
KZYÚŠ‹˜\UÔÛX[[
J
™KšÚXÚÓ›Û‘[\TÝš[™ÊJKšZYÚ
JK[YNŠ™Ë™œ›ÛT™˜ÌÌÌÎUÚ]˜[›ÜÙXÛÛ™ÊJ
™KšÚXÚÓ›Û‘[\TÝš[™ÊJK[YJJK\Ý›ØÚÒY™K›\ÝØ›ØÚ×ÚYš\ÚÑžJK›\ÝØ›ØÚ×ÚY
N›[\ÝÛÛ[Z]\ÚŠ›‹™œ›ÛR^
J
™KšÚXÚÔÙ]
JK›\ÝØÛÛ[Z]Ú\Ú
JK]R\ÚŠ›‹™œ›ÛR^
J
™KšÚXÚÔÙ]
JK™]WÚ\Ú
JK˜[Y]ÜœÒ\ÚŠ›‹™œ›ÛR^
J
™KšÚXÚÔÙ]
JK˜[Y]Üœ×Ú\Ú
JK™^˜[Y]ÜœÒ\ÚŠ›‹™œ›ÛR^
J
™KšÚXÚÔÙ]
JK›™^Ý˜[Y]Üœ×Ú\Ú
JKÛÛœÙ[œÝ\Ò\ÚŠ›‹™œ›ÛR^
J
™KšÚXÚÔÙ]
JK˜ÛÛœÙ[œÝ\×Ú\Ú
JK\\ÚŠ›‹™œ›ÛR^
J
™KšÚXÚÔÙ]
JK˜\Ú\Ú
JK\Ý™\Ý[Ò\ÚŠ›‹™œ›ÛR^
J
™KšÚXÚÔÙ]
JK›\ÝÜ™\Ý[×Ú\Ú
JK]šY[˜ÙR\ÚŠ›‹™œ›ÛR^
J
™KšÚXÚÔÙ]
JK™]šY[˜ÙWÚ\Ú
JK›ÜÜÙ\Y™\ÜÎŠ›‹™œ›ÛR^
J
™KšÚXÚÓ›Û‘[\TÝš[™ÊJKœ›ÜÜÙ\—ØY™\ÜÊJ__Y[˜Ý[ÛˆZYJJ^Ü™]\›žØ›ØÚÒY‘žJK˜›ØÚ×ÚY
K›ØÚÔÚ^™NŠ‹˜\UÔÛX[[
J
™KšÚXÚÓ›Û‘[\TÝš[™ÊJK˜›ØÚ×ÜÚ^™JJKXY\Ž“^JKšXY\ŠK[UÎŠ‹˜\UÔÛX[[
J
™KšÚXÚÓ›Û‘[\TÝš[™ÊJK›[WÝÊJ__Y[˜Ý[ÛˆÚYJJ^Ü™]\›žÛ\ÝZYÚŠ‹˜\UÔÛX[[
J
™KšÚXÚÓ›Û‘[\TÝš[™ÊJK›\ÝÚZYÚ
JK›ØÚÓY]\ÎŠ™KšÚXÚÐ\œ˜^JJK˜›ØÚ×ÛY]\ÊK›X\
ZYJ__Y[˜Ý[ÛˆZYJJ^Ü™]\›žË‹‹•ŠJK\ÚŠ›‹™œ›ÛR^
J
™KšÚXÚÓ›Û‘[\TÝš[™ÊJKš\Ú
J__Y[˜Ý[ÛˆÚYJJ^Ü™]\›žÚZYÚŠ‹˜\UÔÛX[[
JKšZYÚ
K\ÚŠ›‹™œ›ÛR^
J
™KšÚXÚÓ›Û‘[\TÝš[™ÊJKš\Ú
JKÚXÚÕ•Š
™KšÚXÚÓØš™XÝ
JK˜ÚXÚ×Ý
JK[]™\•ŠÜË›X^JJ‹K™[]™\—Ý
__Y[˜Ý[ÛˆYJJ^Ü™]\›Š˜\ÜÙ\
JH[ˆ™K›ØÚÒY›YÊK_Y[˜Ý[ÛˆÚYJJ^Ü™]\›žØ›ØÚÒY›YÎ™YJK˜›ØÚ×ÚYÙ›YÊK˜[Y]ÜY™\ÜÎ™K˜[Y]Ü—ØY™\ÜÏÊ›‹™œ›ÛR^
JK˜[Y]Ü—ØY™\ÜÊN›ÚY[Y\Ý[\™K[Y\Ý[\Ê™Ë™œ›ÛT™˜ÌÌÌÎUÚ]˜[›ÜÙXÛÛ™ÊJK[Y\Ý[\
N›ÚYÚYÛ˜]\™N™KœÚYÛ˜]\™OÊ›‹™œ›ÛP˜\ÙM
JKœÚYÛ˜]\™JN›ÚY_Y[˜Ý[Ûˆ
J^Ü™]\›žØ›ØÚÒY‘žJ
™KšÚXÚÓØš™XÝ
JK˜›ØÚ×ÚY
JKZYÚŠ‹˜\UÔÛX[[
J
™KšÚXÚÓ›Û‘[\TÝš[™ÊJKšZYÚ
JK›Ý[™Š‹˜\UÔÛX[[
JKœ›Ý[™
KÚYÛ˜]\™\ÎŠ™KšÚXÚÐ\œ˜^JJKœÚYÛ˜]\™\ÊK›X\
ÚYJ__Y[˜Ý[ÛˆZYJJ^Ü™]\›žØØ[›ÛšXØ[Š™KšÚXÚÐ›ÛÛX[ŠJK˜Ø[›ÛšXØ[
KXY\Ž“^JKœÚYÛ™YÚXY\‹šXY\ŠKÛÛ[Z]•
KœÚYÛ™YÚXY\‹˜ÛÛ[Z]
__Y[˜Ý[Ûˆ
J^Ü™]\›žØY™\ÜÎŠ›‹™œ›ÛR^
J
™KšÚXÚÓ›Û‘[\TÝš[™ÊJK˜Y™\ÜÊJKXšÙ^N•ÌJ
™KšÚXÚÓØš™XÝ
JKœX—ÚÙ^JJK›Ý[™ÔÝÙ\ŽŠ‹˜\UÐšYÒ[
J
™KšÚXÚÓ›Û‘[\TÝš[™ÊJKœÝÙ\ŠJ__Y[˜Ý[ÛˆZYJJ^Ü™]\›žÙÙ[™\Ú\Õ[YNŠ™Ë™œ›ÛT™˜ÌÌÌÎUÚ]˜[›ÜÙXÛÛ™ÊJ
™KšÚXÚÓ›Û‘[\TÝš[™ÊJK™Ù[™\Ú\×Ý[YJJKÚZ[’YŠ™KšÚXÚÓ›Û‘[\TÝš[™ÊJK˜ÚZ[—ÚY
KÛÛœÙ[œÝ\Ô\˜[\Î‘
K˜ÛÛœÙ[œÝ\×Ü\˜[\ÊK˜[Y]ÜœÎ™K˜[Y]ÜœÏÊ™KšÚXÚÐ\œ˜^JJK˜[Y]ÜœÊK›X\

N–×K\\ÚŠ›‹™œ›ÛR^
J
™KšÚXÚÔÙ]
JK˜\Ú\Ú
JK\Ý]N™K˜\ÜÝ]__Y[˜Ý[ÛˆÌJJ^Ü™]\›žÜXšÙ^N•ÌJ
™KšÚXÚÓØš™XÝ
JKœX—ÚÙ^JJK›Ý[™ÔÝÙ\ŽŠ‹˜\UÐšYÒ[
J
™KšÚXÚÓ›Û‘[\TÝš[™ÊJK›Ý[™×ÜÝÙ\ŠJKY™\ÜÎŠ›‹™œ›ÛR^
J
™KšÚXÚÓ›Û‘[\TÝš[™ÊJK˜Y™\ÜÊJK›ÜÜÙ\”š[Üš]N™Kœ›ÜÜÙ\—Üš[Üš]OÊ‹˜\UÔÛX[[
JKœ›ÜÜÙ\—Üš[Üš]JN›ÚY_Y[˜Ý[ÛˆšYJJ^Ü™]\›žÚYŠ›‹™œ›ÛR^
J
™KšÚXÚÓ›Û‘[\TÝš[™ÊJKšY
JK\Ý[YŽŠ™KšÚXÚÓ›Û‘[\TÝš[™ÊJK›\Ý[—ØYŠK™]ÛÜšÎŠ™KšÚXÚÓ›Û‘[\TÝš[™ÊJK›™]ÛÜšÊK™\œÚ[ÛŽŠ™KšÚXÚÔÝš[™ÊJK™\œÚ[ÛŠKÚ[›™[ÎŠ™KšÚXÚÔÝš[™ÊJK˜Ú[›™[ÊK[ÛšZÙ\ŽŠ™KšÚXÚÓ›Û‘[\TÝš[™ÊJK›[ÛšZÙ\ŠKÝ\ŽŠÜË™XÝ[Û˜\žUÔÝš[™ÓX\
JK›Ý\ŠK›ÝØÛÛ™\œÚ[ÛŽžØ\Š‹˜\UÔÛX[[
J
™KšÚXÚÓ›Û‘[\TÝš[™ÊJKœ›ÝØÛÛÝ™\œÚ[Û‹˜\
JK›ØÚÎŠ‹˜\UÔÛX[[
J
™KšÚXÚÓ›Û‘[\TÝš[™ÊJKœ›ÝØÛÛÝ™\œÚ[Û‹˜›ØÚÊJKœŠ‹˜\UÔÛX[[
J
™KšÚXÚÓ›Û‘[\TÝš[™ÊJKœ›ÝØÛÛÝ™\œÚ[Û‹œœ
J___Y[˜Ý[ÛˆYJJ^Û]YK™X\›Y\ÝØ›ØÚ×ÚZYÚÊ‹˜\UÔÛX[[
JK™X\›Y\ÝØ›ØÚ×ÚZYÚ
N›ÚYYK™X\›Y\ÝØ›ØÚ×Ý[YOÊ™Ë™œ›ÛT™˜ÌÌÌÎUÚ]˜[›ÜÙXÛÛ™ÊJK™X\›Y\ÝØ›ØÚ×Ý[YJN›ÚYÜ™]\›žÙX\›Y\Ý\\Ú™K™X\›Y\ÝØ\Ú\ÚÊ›‹™œ›ÛR^
JK™X\›Y\ÝØ\Ú\Ú
N›ÚYX\›Y\Ý›ØÚÒ\Ú™K™X\›Y\ÝØ›ØÚ×Ú\ÚÊ›‹™œ›ÛR^
JK™X\›Y\ÝØ›ØÚ×Ú\Ú
N›ÚYX\›Y\Ý›ØÚÒZYÚ›Ÿ›ÚYX\›Y\Ý›ØÚÕ[YNË™Ù][YJ
OÝ›ÚY]\Ý›ØÚÒ\ÚŠ›‹™œ›ÛR^
J
™KšÚXÚÓ›Û‘[\TÝš[™ÊJK›]\ÝØ›ØÚ×Ú\Ú
JK]\Ý\\ÚŠ›‹™œ›ÛR^
J
™KšÚXÚÓ›Û‘[\TÝš[™ÊJK›]\ÝØ\Ú\Ú
JK]\Ý›ØÚÕ[YNŠ™Ë™œ›ÛT™˜ÌÌÌÎUÚ]˜[›ÜÙXÛÛ™ÊJ
™KšÚXÚÓ›Û‘[\TÝš[™ÊJK›]\ÝØ›ØÚ×Ý[YJJK]\Ý›ØÚÒZYÚŠ‹˜\UÔÛX[[
J
™KšÚXÚÓ›Û‘[\TÝš[™ÊJK›]\ÝØ›ØÚ×ÚZYÚ
JKØ]Ú[™Õ\Š™KšÚXÚÐ›ÛÛX[ŠJK˜Ø]Ú[™×Ý\
__Y[˜Ý[ÛˆÚYJJ^Ü™]\›žÛ›ÙR[™›Î™šYJK››ÙWÚ[™›ÊKÞ[˜Ò[™›Î›YJKœÞ[˜×Ú[™›ÊK˜[Y]Ü’[™›Î’ÌJK˜[Y]Ü—Ú[™›Ê__Y[˜Ý[ÛˆYJJ^Ü™]\›žÙ]NŠ›‹™œ›ÛP˜\ÙM
J
™KšÚXÚÓ›Û‘[\TÝš[™ÊJK™]JJK›ÛÝ\ÚŠ›‹™œ›ÛR^
J
™KšÚXÚÓ›Û‘[\TÝš[™ÊJKœ›ÛÝÚ\Ú
JK›ÛÙŽžÝÝ[Š‹˜\UÔÛX[[
J
™KšÚXÚÓ›Û‘[\TÝš[™ÊJKœ›ÛÙ‹Ý[
JK[™^Š‹˜\UÔÛX[[
J
™KšÚXÚÓ›Û‘[\TÝš[™ÊJKœ›ÛÙ‹š[™^
JKXY’\ÚŠ›‹™œ›ÛP˜\ÙM
J
™KšÚXÚÓ›Û‘[\TÝš[™ÊJKœ›ÛÙ‹›XY—Ú\Ú
JK][ÎŠ™KšÚXÚÐ\œ˜^JJKœ›ÛÙ‹˜][ÊK›X\
›‹™œ›ÛP˜\ÙM
___Y[˜Ý[Ûˆ
J^Ü™]\›žÝŠ›‹™œ›ÛP˜\ÙM
J
™KšÚXÚÓ›Û‘[\TÝš[™ÊJK
JK™\Ý[•Š
™KšÚXÚÓØš™XÝ
JKÜ™\Ý[
JKZYÚŠ‹˜\UÔÛX[[
J
™KšÚXÚÓ›Û‘[\TÝš[™ÊJKšZYÚ
JK[™^Š‹˜\UÔÛX[[
J
™KšÚXÚÓ[X™\ŠJKš[™^
JK\ÚŠ›‹™œ›ÛR^
J
™KšÚXÚÓ›Û‘[\TÝš[™ÊJKš\Ú
JK›ÛÙŽŠÜË›X^JJYKKœ›ÛÙŠ__Y[˜Ý[ÛˆZYJJ^Ü™]\›žÝÝ[ÛÝ[Š‹˜\UÔÛX[[
J
™KšÚXÚÓ›Û‘[\TÝš[™ÊJKÝ[ØÛÝ[
JKÎŠ™KšÚXÚÐ\œ˜^JJKÊK›X\

__Y[˜Ý[ÛˆYJJ^Û]J›‹™œ›ÛP˜\ÙM
J
™KšÚXÚÓ›Û‘[\TÝš[™ÊJK
JNÜ™]\›žÝ›‹\ÚŠ\™Kš\Ú
JŠK™\Ý[•ŠKœ™\Ý[
KZYÚŠ‹˜\UÔÛX[[
J
™KšÚXÚÓ›Û‘[\TÝš[™ÊJKšZYÚ
J__Y[˜Ý[ÛˆZYJJ^Ü™]\›žØ›ØÚÒZYÚŠ‹˜\UÔÛX[[
J
™KšÚXÚÓ›Û‘[\TÝš[™ÊJK˜›ØÚ×ÚZYÚ
JK˜[Y]ÜœÎŠ™KšÚXÚÐ\œ˜^JJK˜[Y]ÜœÊK›X\
ÌJKÛÝ[Š‹˜\UÔÛX[[
J
™KšÚXÚÓ›Û‘[\TÝš[™ÊJK˜ÛÝ[
JKÝ[Š‹˜\UÔÛX[[
J
™KšÚXÚÓ›Û‘[\TÝš[™ÊJKÝ[
J__Y[˜Ý[ÛˆM
J^Ü™]\›žÚXY\Ž“^J
™KšÚXÚÓØš™XÝ
JKšXY\ŠJK\ÝÛÛ[Z]™K›\ÝØÛÛ[Z]˜›ØÚ×ÚYš\ÚÕ

™KšÚXÚÓØš™XÝ
JK›\ÝØÛÛ[Z]
JN›[Î™K™]KÏÊ™KšÚXÚÐ\œ˜^JJK™]KÊK›X\
›‹™œ›ÛP˜\ÙM
N–×K]šY[˜ÙN™K™]šY[˜ÙOË™]šY[˜ÙOÏÖ×__Y[˜Ý[Ûˆ
J^Ü™]\›žØ›ØÚÒY‘žJK˜›ØÚ×ÚY
K›ØÚÎœM
K˜›ØÚÊ__Y[˜Ý[ÛˆšYJJ^Ü™]\›žÝÝ[ÛÝ[Š‹˜\UÔÛX[[
J
™KšÚXÚÓ›Û‘[\TÝš[™ÊJKÝ[ØÛÝ[
JK›ØÚÜÎŠ™KšÚXÚÐ\œ˜^JJK˜›ØÚÜÊK›X\

__Y[˜Ý[ÛˆZYJJ^Ü™]\›žÝÝ[Š‹˜\UÔÛX[[
J
™KšÚXÚÓ›Û‘[\TÝš[™ÊJKÝ[
JKÝ[ž]\ÎŠ‹˜\UÔÛX[[
J
™KšÚXÚÓ›Û‘[\TÝš[™ÊJKÝ[Øž]\ÊJ__]˜\ˆŒOXÛ\ÜÈ^ÜÝ]XÈXÛÙPX˜ÚR[™›ÊŠ^Ü™]\›ˆœ™J
™KšÚXÚÓØš™XÝ
J‹œ™\Ý[œ™\ÜÛœÙJJ_\Ý]XÈXÛÙPX˜ÚT]Y\žJŠ^Ü™]\›ˆ™J
™KšÚXÚÓØš™XÝ
J‹œ™\Ý[œ™\ÜÛœÙJJ_\Ý]XÈXÛÙP›ØÚÊŠ^Ü™]\›ˆ
‹œ™\Ý[
_\Ý]XÈXÛÙP›ØÚÔ™\Ý[ÊŠ^Ü™]\›ˆYJ‹œ™\Ý[
_\Ý]XÈXÛÙP›ØÚÔÙX\˜Ú
Š^Ü™]\›ˆšYJ‹œ™\Ý[
_\Ý]XÈXÛÙP›ØÚØÚZ[ŠŠ^Ü™]\›ˆÚYJ‹œ™\Ý[
_\Ý]XÈXÛÙPœ›ØYØ\ÝÞ[˜ÊŠ^Ü™]\›ˆZYJ‹œ™\Ý[
_\Ý]XÈXÛÙPœ›ØYØ\Ý\Þ[˜ÊŠ^Ü™]\›ˆK™XÛÙPœ›ØYØ\ÝÞ[˜ÊŠ_\Ý]XÈXÛÙPœ›ØYØ\ÝÛÛ[Z]
Š^Ü™]\›ˆÚYJ‹œ™\Ý[
_\Ý]XÈXÛÙPÛÛ[Z]
Š^Ü™]\›ˆZYJ‹œ™\Ý[
_\Ý]XÈXÛÙQÙ[™\Ú\ÊŠ^Ü™]\›ˆZYJ
™KšÚXÚÓØš™XÝ
J‹œ™\Ý[™Ù[™\Ú\ÊJ_\Ý]XÈXÛÙRX[

^Ü™]\›ˆ[\Ý]XÈXÛÙS[U[˜ÛÛ™š\›YYÊŠ^Ü™]\›ˆZYJ‹œ™\Ý[
_\Ý]XÈXÛÙTÝ]\ÊŠ^Ü™]\›ˆÚYJ‹œ™\Ý[
_\Ý]XÈXÛÙS™]Ð›ØÚÑ]™[
Š^Ü™]\›ˆM
‹™]K˜[YK˜›ØÚÊ_\Ý]XÈXÛÙS™]Ð›ØÚÒXY\‘]™[
Š^Ü™]\›ˆ^J‹™]K˜[YKšXY\Š_\Ý]XÈXÛÙU]™[
Š^Ü™]\›ˆYJ‹™]K˜[YK•™\Ý[
_\Ý]XÈXÛÙU
Š^Ü™]\›ˆ
‹œ™\Ý[
_\Ý]XÈXÛÙUÙX\˜Ú
Š^Ü™]\›ˆZYJ‹œ™\Ý[
_\Ý]XÈXÛÙU˜[Y]ÜœÊŠ^Ü™]\›ˆZYJ‹œ™\Ý[
__NÑØË”™\ÜÛœÙ\ÏUŒ_JNÝ˜\ˆRJOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\J‹—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÞ‹”™\ÜÛœÙ\Ï^‹”\˜[\Ï]›ÚYÝ˜\ˆÚYOT

NÓØš™XÝ™Yš[™T›Ü\J‹”\˜[\È‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆÚYK”\˜[\ß_JNÝ˜\ˆÚYOSM

NÓØš™XÝ™Yš[™T›Ü\J‹”™\ÜÛœÙ\È‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆÚYK”™\ÜÛœÙ\ß_J_JNÝ˜\ˆÍRJÙOžÈ\ÙHÝšXÝŽÝ˜\ˆÚYO]Ù	‰Ù—×ØÜ™X]Pš[™[™ß
Øš™XÝ˜Ü™X]OÊ[˜Ý[ÛŠK‹J^ÚOOO]›ÚY	‰ŠO]
NÝ˜\ˆSØš™XÝ™Ù]ÝÛ”›Ü\Q\ØÜš\ÜŠ‹
NÊ\Ÿ
™Ù]š[ˆÈ[‹—×Ù\Ó[Ù[Nœ‹Üš]X›_‹˜ÛÛ™šYÝ\˜X›JJI‰Š^Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ–Ý__JKØš™XÝ™Yš[™T›Ü\JKKŠ_JNŠ[˜Ý[ÛŠK‹J^ÚOOO]›ÚY	‰ŠO]
KVÚWO[–Ý_JJKZYO]Ù	‰Ù—×ÜÙ][Ù[QY˜][
Øš™XÝ˜Ü™X]OÊ[˜Ý[ÛŠKŠ^ÓØš™XÝ™Yš[™T›Ü\JK™Y˜][‹Ù[[Y\˜X›NˆL˜[YN›ŸJ_JN™[˜Ý[ÛŠKŠ^ÙK™Y˜][[ŸJKZYO]Ù	‰Ù—×Ú[\ÜÝ\Ÿ
[˜Ý[ÛŠ
^Ý˜\ˆOY[˜Ý[ÛŠŠ^Ü™]\›ˆOSØš™XÝ™Ù]ÝÛ”›Ü\S˜[Y\ß[˜Ý[ÛŠ
^Ý˜\ˆOV×NÙ›ÜŠ˜\ˆˆ[ˆ
SØš™XÝœ›ÝÝ\Kš\ÓÝÛ”›Ü\K˜Ø[
ŠI‰ŠVÚK›[™ÝO\ŠNÜ™]\›ˆ_KJŠ_NÜ™]\›ˆ[˜Ý[ÛŠŠ^ÚYŠ‰‰›‹—×Ù\Ó[Ù[J\™]\›ˆŽÝ˜\ˆ^ßNÚYŠˆO[[
Y›ÜŠ˜\ˆOYJŠKLÜK›[™ÝÜŠÊÊZVÜ—HOOH™Y˜][‰‰šÚYJ‹VÜ—JNÜ™]\›ˆZYJŠK_JJ
NÓØš™XÝ™Yš[™T›Ü\JÙ—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÝÙ•[™\›Z[ÍÐÛY[]›ÚYÝ˜\ˆO\YÊ
KÝR

K\TZYJJ
JKOXÛ\ÜÈ^ÜÝ]XÈ\Þ[˜ÈÛÛ›™XÝ
Š^Û]Ü™]\›ˆ\[ÙˆOH›Øš™XÝÝ[™]ÈK’ÛY[
ŠN[‹œÝ\ÕÚ]
š‹ËÈŠ_‹œÝ\ÕÚ]
šÎ‹ËÈŠOÛ™]ÈK’ÛY[
ŠN›™]ÈK•ÙXœÛØÚÙ]ÛY[
ŠKK˜Ü™X]J
_\Ý]XÈÜ™X]JŠ^Ü™]\›ˆ™]ÈJŠ_XÛY[ØÛÛœÝXÝÜŠŠ^Ý\Ë˜ÛY[[ŸY\ØÛÛ›™XÝ

^Ý\Ë˜ÛY[™\ØÛÛ›™XÝ

_X\Þ[˜ÈX˜ÚR[™›Ê
^Û]^ÛY]Ùœ\‹“Y]ÙX˜ÚR[™›ßNÜ™]\›ˆ\Ë™ÐØ[
‹Ý”\˜[\Ë™[˜ÛÙPX˜ÚR[™›ËÝ”™\ÜÛœÙ\Ë™XÛÙPX˜ÚR[™›Ê_X\Þ[˜ÈX˜ÚT]Y\žJŠ^Û]^Ü\˜[\Î›‹Y]Ùœ\‹“Y]ÙX˜ÚT]Y\ž_NÜ™]\›ˆ\Ë™ÐØ[
Ý”\˜[\Ë™[˜ÛÙPX˜ÚT]Y\žKÝ”™\ÜÛœÙ\Ë™XÛÙPX˜ÚT]Y\žJ_X\Þ[˜È›ØÚÊŠ^Û]^ÛY]Ùœ\‹“Y]Ù›ØÚË\˜[\ÎžÚZYÚ›Ÿ_NÜ™]\›ˆ\Ë™ÐØ[
Ý”\˜[\Ë™[˜ÛÙP›ØÚËÝ”™\ÜÛœÙ\Ë™XÛÙP›ØÚÊ_X\Þ[˜È›ØÚÔ™\Ý[ÊŠ^Û]^ÛY]Ùœ\‹“Y]Ù›ØÚÔ™\Ý[Ë\˜[\ÎžÚZYÚ›Ÿ_NÜ™]\›ˆ\Ë™ÐØ[
Ý”\˜[\Ë™[˜ÛÙP›ØÚÔ™\Ý[ËÝ”™\ÜÛœÙ\Ë™XÛÙP›ØÚÔ™\Ý[Ê_X\Þ[˜È›ØÚÔÙX\˜Ú
Š^Û]^Ü\˜[\Î›‹Y]Ùœ\‹“Y]Ù›ØÚÔÙX\˜ÚKOX]ØZ]\Ë™ÐØ[
Ý”\˜[\Ë™[˜ÛÙP›ØÚÔÙX\˜ÚÝ”™\ÜÛœÙ\Ë™XÛÙP›ØÚÔÙX\˜Ú
NÜ™]\›žË‹‹šK›ØÚÜÎ–Ë‹‹šK˜›ØÚÜ×KœÛÜ

‹ÊOOœ‹˜›ØÚËšXY\‹šZYÚ[Ë˜›ØÚËšXY\‹šZYÚ
__X\Þ[˜È›ØÚÔÙX\˜Ú[
Š^Û][‹œYÙ_KOV×KHLNÙ›ÜŠÈ\ŽÊ^Û]ÏX]ØZ]\Ë˜›ØÚÔÙX\˜Ú
Ë‹‹›‹YÙNJNÚKœ\Ú
‹‹›Ë˜›ØÚÜÊKK›[™ÝËÝ[ÛÝ[Ý
ÊÎœHL\™]\›ˆKœÛÜ

ËJOO›Ë˜›ØÚËšXY\‹šZYÚXK˜›ØÚËšXY\‹šZYÚ
KÝÝ[ÛÝ[šK›[™Ý›ØÚÜÎš__X\Þ[˜È›ØÚØÚZ[Š‹
^Û]O^ÛY]Ùœ\‹“Y]Ù›ØÚØÚZ[‹\˜[\ÎžÛZ[’ZYÚ›‹X^ZYÚ_NÜ™]\›ˆ\Ë™ÐØ[
KÝ”\˜[\Ë™[˜ÛÙP›ØÚØÚZ[‹Ý”™\ÜÛœÙ\Ë™XÛÙP›ØÚØÚZ[Š_X\Þ[˜Èœ›ØYØ\ÝÞ[˜ÊŠ^Û]^Ü\˜[\Î›‹Y]Ùœ\‹“Y]Ùœ›ØYØ\ÝÞ[˜ßNÜ™]\›ˆ\Ë™ÐØ[
Ý”\˜[\Ë™[˜ÛÙPœ›ØYØ\ÝÝ”™\ÜÛœÙ\Ë™XÛÙPœ›ØYØ\ÝÞ[˜Ê_X\Þ[˜Èœ›ØYØ\Ý\Þ[˜ÊŠ^Û]^Ü\˜[\Î›‹Y]Ùœ\‹“Y]Ùœ›ØYØ\Ý\Þ[˜ßNÜ™]\›ˆ\Ë™ÐØ[
Ý”\˜[\Ë™[˜ÛÙPœ›ØYØ\ÝÝ”™\ÜÛœÙ\Ë™XÛÙPœ›ØYØ\Ý\Þ[˜Ê_X\Þ[˜Èœ›ØYØ\ÝÛÛ[Z]
Š^Û]^Ü\˜[\Î›‹Y]Ùœ\‹“Y]Ùœ›ØYØ\ÝÛÛ[Z]NÜ™]\›ˆ\Ë™ÐØ[
Ý”\˜[\Ë™[˜ÛÙPœ›ØYØ\ÝÝ”™\ÜÛœÙ\Ë™XÛÙPœ›ØYØ\ÝÛÛ[Z]
_X\Þ[˜ÈÛÛ[Z]
Š^Û]^ÛY]Ùœ\‹“Y]ÙÛÛ[Z]\˜[\ÎžÚZYÚ›Ÿ_NÜ™]\›ˆ\Ë™ÐØ[
Ý”\˜[\Ë™[˜ÛÙPÛÛ[Z]Ý”™\ÜÛœÙ\Ë™XÛÙPÛÛ[Z]
_X\Þ[˜ÈÙ[™\Ú\Ê
^Û]^ÛY]Ùœ\‹“Y]Ù‘Ù[™\Ú\ßNÜ™]\›ˆ\Ë™ÐØ[
‹Ý”\˜[\Ë™[˜ÛÙQÙ[™\Ú\ËÝ”™\ÜÛœÙ\Ë™XÛÙQÙ[™\Ú\Ê_X\Þ[˜ÈX[

^Û]^ÛY]Ùœ\‹“Y]Ù’X[NÜ™]\›ˆ\Ë™ÐØ[
‹Ý”\˜[\Ë™[˜ÛÙRX[Ý”™\ÜÛœÙ\Ë™XÛÙRX[
_X\Þ[˜È[U[˜ÛÛ™š\›YYÊ
^Û]^ÛY]Ùœ\‹“Y]Ù“[U[˜ÛÛ™š\›YYßNÜ™]\›ˆ\Ë™ÐØ[
‹Ý”\˜[\Ë™[˜ÛÙS[U[˜ÛÛ™š\›YYËÝ”™\ÜÛœÙ\Ë™XÛÙS[U[˜ÛÛ™š\›YYÊ_X\Þ[˜ÈÝ]\Ê
^Û]^ÛY]Ùœ\‹“Y]Ù”Ý]\ßNÜ™]\›ˆ\Ë™ÐØ[
‹Ý”\˜[\Ë™[˜ÛÙTÝ]\ËÝ”™\ÜÛœÙ\Ë™XÛÙTÝ]\Ê_\ÝXœØÜšX™S™]Ð›ØÚÊ
^Û]^ÛY]Ùœ\‹“Y]Ù”ÝXœØÜšX™K]Y\žNžÝ\Nœ\‹”ÝXœØÜš\[Û‘]™[\K“™]Ð›ØÚß_NÜ™]\›ˆ\ËœÝXœØÜšX™J‹Ý”™\ÜÛœÙ\Ë™XÛÙS™]Ð›ØÚÑ]™[
_\ÝXœØÜšX™S™]Ð›ØÚÒXY\Š
^Û]^ÛY]Ùœ\‹“Y]Ù”ÝXœØÜšX™K]Y\žNžÝ\Nœ\‹”ÝXœØÜš\[Û‘]™[\K“™]Ð›ØÚÒXY\Ÿ_NÜ™]\›ˆ\ËœÝXœØÜšX™J‹Ý”™\ÜÛœÙ\Ë™XÛÙS™]Ð›ØÚÒXY\‘]™[
_\ÝXœØÜšX™U
Š^Û]^ÛY]Ùœ\‹“Y]Ù”ÝXœØÜšX™K]Y\žNžÝ\Nœ\‹”ÝXœØÜš\[Û‘]™[\K•˜]Î›Ÿ_NÜ™]\›ˆ\ËœÝXœØÜšX™JÝ”™\ÜÛœÙ\Ë™XÛÙU]™[
_X\Þ[˜È
Š^Û]^Ü\˜[\Î›‹Y]Ùœ\‹“Y]Ù•NÜ™]\›ˆ\Ë™ÐØ[
Ý”\˜[\Ë™[˜ÛÙUÝ”™\ÜÛœÙ\Ë™XÛÙU
_X\Þ[˜ÈÙX\˜Ú
Š^Û]^Ü\˜[\Î›‹Y]Ùœ\‹“Y]Ù•ÙX\˜ÚNÜ™]\›ˆ\Ë™ÐØ[
Ý”\˜[\Ë™[˜ÛÙUÙX\˜ÚÝ”™\ÜÛœÙ\Ë™XÛÙUÙX\˜Ú
_X\Þ[˜ÈÙX\˜Ú[
Š^Û][‹œYÙ_KOV×KHLNÙ›ÜŠÈ\ŽÊ^Û]ÏX]ØZ]\ËÙX\˜Ú
Ë‹‹›‹YÙNJNÚKœ\Ú
‹‹›ËÊKK›[™ÝËÝ[ÛÝ[Ý
ÊÎœHL\™]\›žÝÝ[ÛÝ[šK›[™ÝÎš__X\Þ[˜È˜[Y]ÜœÊŠ^Û]^ÛY]Ùœ\‹“Y]Ù•˜[Y]ÜœË\˜[\Î›ŸNÜ™]\›ˆ\Ë™ÐØ[
Ý”\˜[\Ë™[˜ÛÙU˜[Y]ÜœËÝ”™\ÜÛœÙ\Ë™XÛÙU˜[Y]ÜœÊ_X\Þ[˜È˜[Y]ÜœÐ[
Š^Û]V×KOLKHLKÏ[ŽÙ›ÜŠÈ\ŽÊ^Û]OX]ØZ]\Ë˜[Y]ÜœÊÜ\—ÜYÙNLZYÚ›ËYÙNš_JNÝœ\Ú
‹‹˜K˜[Y]ÜœÊKÏ[ßK˜›ØÚÒZYÚ›[™ÝKÝ[ÚJÊÎœHL\™]\›žØ›ØÚÒZYÚ›ÏÏÌÛÝ[›[™ÝÝ[›[™Ý˜[Y]ÜœÎ_X\Þ[˜ÈÐØ[
‹J^Û]]
ŠKÏX]ØZ]\Ë˜ÛY[™^XÝ]JŠNÜ™]\›ˆJÊ_\ÝXœØÜšX™J‹
^ÚYŠJKš[œÝ[˜ÙSÙ”œÔÝ™X[Z[™ÐÛY[
J\Ë˜ÛY[
J]›ÝÈ™]È\œ›ÜŠ•\È”ÈÛY[\HØ[››ÝÝXœØÜšX™HÈ]™[ÈŠNÛ]OXÝ”\˜[\Ë™[˜ÛÙTÝXœØÜšX™JŠNÜ™]\›ˆ\Ë˜ÛY[›\Ý[ŠJK›X\
ÏO
ÊJ__NÝÙ•[™\›Z[ÍÐÛY[S_JNÝ˜\ˆÞORJOOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\JK—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÝK•[™\›Z[ÍÐÛY[]K•›ÝU\O]K˜œ›ØYØ\ÝÞ[˜ÔÝXØÙ\ÜÏ]K˜œ›ØYØ\ÝÛÛ[Z]ÝXØÙ\ÜÏ]K”ÝXœØÜš\[Û‘]™[\O]K“Y]Ù]›ÚYÝ˜\ˆÍ^J
NÓØš™XÝ™Yš[™T›Ü\JK“Y]Ù‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆÍ“Y]Ù_JNÓØš™XÝ™Yš[™T›Ü\JK”ÝXœØÜš\[Û‘]™[\H‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆÍ”ÝXœØÜš\[Û‘]™[\__JNÝ˜\ˆLOX

NÓØš™XÝ™Yš[™T›Ü\JK˜œ›ØYØ\ÝÛÛ[Z]ÝXØÙ\ÜÈ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆLK˜œ›ØYØ\ÝÛÛ[Z]ÝXØÙ\Üß_JNÓØš™XÝ™Yš[™T›Ü\JK˜œ›ØYØ\ÝÞ[˜ÔÝXØÙ\ÜÈ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆLK˜œ›ØYØ\ÝÞ[˜ÔÝXØÙ\Üß_JNÓØš™XÝ™Yš[™T›Ü\JK•›ÝU\H‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆLK•›ÝU\__JNÝ˜\ˆÚYOWÍ

NÓØš™XÝ™Yš[™T›Ü\JK•[™\›Z[ÍÐÛY[‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆÚYK•[™\›Z[ÍÐÛY[_J_JNÝ˜\ˆRJ™OžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\J™‹—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÒ™‹š\Õ[™\›Z[ÍÐÛY[TšYNÒ™‹š\ÐÛÛY]ÎÛY[XšYNÒ™‹š\ÐÛÛY]PÛY[TYNÒ™‹˜ÛÛ›™XÝÛÛY]SšYNÝ˜\ˆXžJ
KÍUJ
KÍWÞJ
NÙ[˜Ý[ÛˆšYJJ^Ü™]\›ˆH[œÝ[˜Ù[ÙˆÍ•[™\›Z[ÍÐÛY[Y[˜Ý[ÛˆšYJJ^Ü™]\›ˆH[œÝ[˜Ù[ÙˆÍÛÛY]ÎÛY[Y[˜Ý[ÛˆYJJ^Ü™]\›ˆH[œÝ[˜Ù[ÙˆÛÛY]PÛY[X\Þ[˜È[˜Ý[ÛˆšYJJ^Û]‹X]ØZ]Í•[™\›Z[ÍÐÛY[˜ÛÛ›™XÝ
JKOJ]ØZ]œÝ]\Ê
JK››ÙR[™›Ë™\œÚ[ÛŽÜ™]\›ˆKœÝ\ÕÚ]
ŒŒÍËˆŠOÛ]šKœÝ\ÕÚ]
ŒŒÎˆŠOÊ™\ØÛÛ›™XÝ

KX]ØZ]ÍÛÛY]ÎÛY[˜ÛÛ›™XÝ
JJNšKœÝ\ÕÚ]
ŒKˆŠOÊ™\ØÛÛ›™XÝ

KX]ØZ]ÛÛY]PÛY[˜ÛÛ›™XÝ
JJN›]Ÿ_JNÝ˜\ˆÙÏRJ[OžÈ\ÙHÝšXÝŽÝ˜\ˆšYOX[‰‰˜[‹—×ØÜ™X]Pš[™[™ß
Øš™XÝ˜Ü™X]OÊ[˜Ý[ÛŠK‹J^ÚOOO]›ÚY	‰ŠO]
NÝ˜\ˆSØš™XÝ™Ù]ÝÛ”›Ü\Q\ØÜš\ÜŠ‹
NÊ\Ÿ
™Ù]š[ˆÈ[‹—×Ù\Ó[Ù[Nœ‹Üš]X›_‹˜ÛÛ™šYÝ\˜X›JJI‰Š^Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ–Ý__JKØš™XÝ™Yš[™T›Ü\JKKŠ_JNŠ[˜Ý[ÛŠK‹J^ÚOOO]›ÚY	‰ŠO]
KVÚWO[–Ý_JJKÚYOX[‰‰˜[‹—×ÜÙ][Ù[QY˜][
Øš™XÝ˜Ü™X]OÊ[˜Ý[ÛŠKŠ^ÓØš™XÝ™Yš[™T›Ü\JK™Y˜][‹Ù[[Y\˜X›NˆL˜[YN›ŸJ_JN™[˜Ý[ÛŠKŠ^ÙK™Y˜][[ŸJKŒOX[‰‰˜[‹—×Ú[\ÜÝ\Ÿ
[˜Ý[ÛŠ
^Ý˜\ˆOY[˜Ý[ÛŠŠ^Ü™]\›ˆOSØš™XÝ™Ù]ÝÛ”›Ü\S˜[Y\ß[˜Ý[ÛŠ
^Ý˜\ˆOV×NÙ›ÜŠ˜\ˆˆ[ˆ
SØš™XÝœ›ÝÝ\Kš\ÓÝÛ”›Ü\K˜Ø[
ŠI‰ŠVÚK›[™ÝO\ŠNÜ™]\›ˆ_KJŠ_NÜ™]\›ˆ[˜Ý[ÛŠŠ^ÚYŠ‰‰›‹—×Ù\Ó[Ù[J\™]\›ˆŽÝ˜\ˆ^ßNÚYŠˆO[[
Y›ÜŠ˜\ˆOYJŠKLÜK›[™ÝÜŠÊÊZVÜ—HOOH™Y˜][‰‰šYJ‹VÜ—JNÜ™]\›ˆÚYJŠK_JJ
NÓØš™XÝ™Yš[™T›Ü\J[‹—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNØ[‹›ØÚÒY›YÏX[‹š\Õ[™\›Z[ÍÐÛY[X[‹š\ÐÛÛY]ÎÛY[X[‹š\ÐÛÛY]PÛY[X[‹˜ÛÛ›™XÝÛÛY]X[‹•[™\›Z[ÍÐÛY[X[‹[™\›Z[ÍÏX[‹•ÙXœÛØÚÙ]ÛY[X[‹’ÛY[X[‹’˜]ÚÛY[X[‹ÔÙXÛÛ™ÏX[‹Ô™˜ÌÌÌÎUÚ]˜[›ÜÙXÛÛ™ÏX[‹™œ›ÛTÙXÛÛ™ÏX[‹™œ›ÛT™˜ÌÌÌÎUÚ]˜[›ÜÙXÛÛ™ÏX[‹‘]U[YOX[‹ÛÛY]ÎÛY[X[‹˜ÛÛY]ÎX[‹ÛÛY]PÛY[X[‹˜ÛÛY]OX[‹œ˜]ÔÙXÜMšÌTXšÙ^UÔ˜]ÐY™\ÜÏX[‹œ˜]ÑYMLNTXšÙ^UÔ˜]ÐY™\ÜÏX[‹œXšÙ^UÔ˜]ÐY™\ÜÏX[‹œXšÙ^UÐY™\ÜÏ]›ÚYÝ˜\ˆÞOXÎ

NÓØš™XÝ™Yš[™T›Ü\J[‹œXšÙ^UÐY™\ÜÈ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆÞKœXšÙ^UÐY™\Üß_JNÓØš™XÝ™Yš[™T›Ü\J[‹œXšÙ^UÔ˜]ÐY™\ÜÈ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆÞKœXšÙ^UÔ˜]ÐY™\Üß_JNÓØš™XÝ™Yš[™T›Ü\J[‹œ˜]ÑYMLNTXšÙ^UÔ˜]ÐY™\ÜÈ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆÞKœ˜]ÑYMLNTXšÙ^UÔ˜]ÐY™\Üß_JNÓØš™XÝ™Yš[™T›Ü\J[‹œ˜]ÔÙXÜMšÌTXšÙ^UÔ˜]ÐY™\ÜÈ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆÞKœ˜]ÔÙXÜMšÌTXšÙ^UÔ˜]ÐY™\Üß_JNØ[‹˜ÛÛY]O^ŒJžJ
JNÝ˜\ˆYOXžJ
NÓØš™XÝ™Yš[™T›Ü\J[‹ÛÛY]PÛY[‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆYKÛÛY]PÛY[_JNØ[‹˜ÛÛY]Î^ŒJJ
JNÝ˜\ˆZYOUJ
NÓØš™XÝ™Yš[™T›Ü\J[‹ÛÛY]ÎÛY[‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆZYKÛÛY]ÎÛY[_JNÝ˜\ˆÙÏSYÊ
NÓØš™XÝ™Yš[™T›Ü\J[‹‘]U[YH‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆÙË‘]U[Y__JNÓØš™XÝ™Yš[™T›Ü\J[‹™œ›ÛT™˜ÌÌÌÎUÚ]˜[›ÜÙXÛÛ™È‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆÙË™œ›ÛT™˜ÌÌÌÎUÚ]˜[›ÜÙXÛÛ™ß_JNÓØš™XÝ™Yš[™T›Ü\J[‹™œ›ÛTÙXÛÛ™È‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆÙË™œ›ÛTÙXÛÛ™ß_JNÓØš™XÝ™Yš[™T›Ü\J[‹Ô™˜ÌÌÌÎUÚ]˜[›ÜÙXÛÛ™È‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆÙËÔ™˜ÌÌÌÎUÚ]˜[›ÜÙXÛÛ™ß_JNÓØš™XÝ™Yš[™T›Ü\J[‹ÔÙXÛÛ™È‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆÙËÔÙXÛÛ™ß_JNÝ˜\ˆŒO\YÊ
NÓØš™XÝ™Yš[™T›Ü\J[‹’˜]ÚÛY[‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆŒK’˜]ÚÛY[_JNÓØš™XÝ™Yš[™T›Ü\J[‹’ÛY[‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆŒK’ÛY[_JNÓØš™XÝ™Yš[™T›Ü\J[‹•ÙXœÛØÚÙ]ÛY[‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆŒK•ÙXœÛØÚÙ]ÛY[_JNØ[‹[™\›Z[ÍÏ^ŒJÞJ
JNÝ˜\ˆYOWÞJ
NÓØš™XÝ™Yš[™T›Ü\J[‹•[™\›Z[ÍÐÛY[‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆYK•[™\›Z[ÍÐÛY[_JNÝ˜\ˆžOS

NÓØš™XÝ™Yš[™T›Ü\J[‹˜ÛÛ›™XÝÛÛY]‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆžK˜ÛÛ›™XÝÛÛY]_JNÓØš™XÝ™Yš[™T›Ü\J[‹š\ÐÛÛY]PÛY[‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆžKš\ÐÛÛY]PÛY[_JNÓØš™XÝ™Yš[™T›Ü\J[‹š\ÐÛÛY]ÎÛY[‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆžKš\ÐÛÛY]ÎÛY[_JNÓØš™XÝ™Yš[™T›Ü\J[‹š\Õ[™\›Z[ÍÐÛY[‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆžKš\Õ[™\›Z[ÍÐÛY[_JNÝ˜\ˆYORÊ
NÓØš™XÝ™Yš[™T›Ü\J[‹›ØÚÒY›YÈ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆYK›ØÚÒY›Yß_J_JNÝ˜\ˆŒORJOOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\JK—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÓK”Ý\™Ø]PÛY[SKœ›ØYØ\Ý\œ›ÜSK•[Y[Ý]\œ›Ü]›ÚYÓKš\Ñ[]™\•˜Z[\™OINÓKš\Ñ[]™\•ÝXØÙ\ÜÏVÓK˜\ÜÙ\\Ñ[]™\•ÝXØÙ\ÜÏQÚYNÓK˜\ÜÙ\\Ñ[]™\•˜Z[\™OUšYNÝ˜\ˆšYOXØJ
KÞOZÛŠ
KMPZJ
KRÙÊ
KÞOX\Š
KZYOVš

KšYO^”Ê
KZYOZ”Ê
KOZš

KYOPÛÊ
KÚYOTÊ
K^OXÛ\ÜÈ^[™È\œ›ÜžÝYØÛÛœÝXÝÜŠ‹
^ÜÝ\\ŠŠK\Ë›˜[YO]\Ë˜ÛÛœÝXÝÜ‹›˜[YK\ËY]_NÓK•[Y[Ý]\œ›ÜV^NÙ[˜Ý[Ûˆ	JJ^Ü™]\›ˆHYK˜ÛÙ_Y[˜Ý[Ûˆ
J^Ü™]\›ˆIJJ_Y[˜Ý[ÛˆÚYJJ^ÚYŠ	JJJ]›ÝÈ™]È\œ›ÜŠ\œ›ÜˆÚ[ˆœ›ØYØ\Ý[™È	ÙK˜[œØXÝ[Û’\ÚH]ZYÚ	ÙKšZYÚKˆÛÙNˆ	ÙK˜ÛÙ_NÈ˜]ÈÙÎˆ	ÙKœ˜]ÓÙßX
_Y[˜Ý[ÛˆšYJJ^ÚYŠ
JJ]›ÝÈ™]È\œ›ÜŠ˜[œØXÝ[Ûˆ	ÙK˜[œØXÝ[Û’\ÚHY›Ý˜Z[]ZYÚ	ÙKšZYÚKˆÛÙNˆ	ÙK˜ÛÙ_NÈ˜]ÈÙÎˆ	ÙKœ˜]ÓÙßX
_]˜\ˆžOXÛ\ÜÈ^[™È\œ›ÜžØÛÙNØÛÙ\ÜXÙNÛÙÎØÛÛœÝXÝÜŠ‹J^ÜÝ\\Šœ›ØYØ\Ý[™È˜[œØXÝ[Ûˆ˜Z[YÚ]ÛÙH	ÛŸH
ÛÙ\ÜXÙNˆ	ÝJKˆÙÎˆ	Ú_X
K\Ë›˜[YO]\Ë˜ÛÛœÝXÝÜ‹›˜[YK\Ë˜ÛÙO[‹\Ë˜ÛÙ\ÜXÙO]\Ë›ÙÏZ__NÓKœ›ØYØ\Ý\œ›Ü^žNÝ˜\ˆOXÛ\ÜÈ^ØÛÛY]ÛY[Ü]Y\žPÛY[ØÚZ[’YØXØÛÝ[\œÙ\ŽÜÝ]XÈ\Þ[˜ÈÛÛ›™XÝ
‹^ßJ^Û]OX]ØZ]
˜ÛÛ›™XÝÛÛY]
JŠNÜ™]\›ˆK˜Ü™X]JK
_\Ý]XÈÜ™X]J‹^ßJ^Ü™]\›ˆ™]ÈJ‹
_XÛÛœÝXÝÜŠ‹
^Û‰‰Š\Ë˜ÛÛY]ÛY[[‹\Ëœ]Y\žPÛY[RYK”]Y\žPÛY[Ú]^[œÚ[ÛœÊ‹KœÙ]\]]^[œÚ[Û‹KœÙ]\˜[šÑ^[œÚ[Û‹KœÙ]\ÝZÚ[™Ñ^[œÚ[Û‹KœÙ]\^[œÚ[ÛŠJNÛ]ØXØÛÝ[\œÙ\ŽšOQšYK˜XØÛÝ[œ›ÛP[ž_O]Ý\Ë˜XØÛÝ[\œÙ\Z_YÙ]ÛÛY]ÛY[

^Ü™]\›ˆ\Ë˜ÛÛY]ÛY[Y›Ü˜ÙQÙ]ÛÛY]ÛY[

^ÚYŠ]\Ë˜ÛÛY]ÛY[
]›ÝÈ™]È\œ›ÜŠÛÛY]ÛY[›Ý]˜Z[X›Kˆ[ÝHØ[››Ý\ÙHÛ›[™H[˜Ý[Û˜[]H[ˆÙ™›[™H[ÙKˆŠNÜ™]\›ˆ\Ë˜ÛÛY]ÛY[YÙ]]Y\žPÛY[

^Ü™]\›ˆ\Ëœ]Y\žPÛY[Y›Ü˜ÙQÙ]]Y\žPÛY[

^ÚYŠ]\Ëœ]Y\žPÛY[
]›ÝÈ™]È\œ›ÜŠ”]Y\žHÛY[›Ý]˜Z[X›Kˆ[ÝHØ[››Ý\ÙHÛ›[™H[˜Ý[Û˜[]H[ˆÙ™›[™H[ÙKˆŠNÜ™]\›ˆ\Ëœ]Y\žPÛY[X\Þ[˜ÈÙ]ÚZ[’Y

^ÚYŠ]\Ë˜ÚZ[’Y
^Û]J]ØZ]\Ë™›Ü˜ÙQÙ]ÛÛY]ÛY[

KœÝ]\Ê
JK››ÙR[™›Ë›™]ÛÜšÎÚYŠ]
]›ÝÈ™]È\œ›ÜŠÚZ[ˆQ]\Ý›Ý™H[\HŠNÝ\Ë˜ÚZ[’Y]\™]\›ˆ\Ë˜ÚZ[’YX\Þ[˜ÈÙ]ZYÚ

^Ü™]\›Š]ØZ]\Ë™›Ü˜ÙQÙ]ÛÛY]ÛY[

KœÝ]\Ê
JKœÞ[˜Ò[™›Ë›]\Ý›ØÚÒZYÚX\Þ[˜ÈÙ]XØÛÝ[
Š^Ýž^Û]X]ØZ]\Ë™›Ü˜ÙQÙ]]Y\žPÛY[

K˜]]˜XØÛÝ[
ŠNÜ™]\›ˆÝ\Ë˜XØÛÝ[\œÙ\Š
N›[XØ]Ú

^ÚYŠ
ÞK˜\ÜÙ\
J[œÝ[˜Ù[Ùˆ\œ›ÜŠKÜœÈ\œ›ÜŽˆÛÙHH›Ý›Ý[™ÚK\Ý
ÔÝš[™Ê
JJ\™]\›ˆ[Ý›ÝÈ_X\Þ[˜ÈÙ]Ù\]Y[˜ÙJŠ^Û]X]ØZ]\Ë™Ù]XØÛÝ[
ŠNÚYŠ]
]›ÝÈ™]È\œ›ÜŠXØÛÝ[	ÉÛŸIÈÙ\È›Ý^\ÝÛˆÚZ[‹ˆÙ[™ÛÛYHÚÙ[œÈ\™H™Y›Ü™HžZ[™ÈÈ]Y\žHÙ\]Y[˜ÙK˜
NÜ™]\›žØXØÛÝ[[X™\Ž˜XØÛÝ[[X™\‹Ù\]Y[˜ÙNœÙ\]Y[˜Ù__X\Þ[˜ÈÙ]›ØÚÊŠ^Û]X]ØZ]\Ë™›Ü˜ÙQÙ]ÛÛY]ÛY[

K˜›ØÚÊŠNÜ™]\›žÚYŠÞKÒ^
J˜›ØÚÒYš\Ú
KÕ\\Ø\ÙJ
KXY\ŽžÝ™\œÚ[ÛŽžØ›ØÚÎ›™]ÈM•Z[LÊ˜›ØÚËšXY\‹™\œÚ[Û‹˜›ØÚÊKÔÝš[™Ê
K\›™]ÈM•Z[LÊ˜›ØÚËšXY\‹™\œÚ[Û‹˜\
KÔÝš[™Ê
_KZYÚ˜›ØÚËšXY\‹šZYÚÚZ[’Y˜›ØÚËšXY\‹˜ÚZ[’Y[YNŠÔ™˜ÌÌÌÎUÚ]˜[›ÜÙXÛÛ™ÊJ˜›ØÚËšXY\‹[YJ_KÎ˜›ØÚËß_X\Þ[˜ÈÙ]˜[[˜ÙJ‹
^Ü™]\›ˆ\Ë™›Ü˜ÙQÙ]]Y\žPÛY[

K˜˜[šË˜˜[[˜ÙJ‹
_X\Þ[˜ÈÙ][˜[[˜Ù\ÊŠ^Ü™]\›ˆ\Ë™›Ü˜ÙQÙ]]Y\žPÛY[

K˜˜[šË˜[˜[[˜Ù\ÊŠ_X\Þ[˜ÈÙ]˜[[˜ÙTÝZÙY
Š^Û]V×KNÙÞÛ]Ù[YØ][Û”™\ÜÛœÙ\Î›ËYÚ[˜][ÛŽ˜_OX]ØZ]\Ë™›Ü˜ÙQÙ]]Y\žPÛY[

KœÝZÚ[™Ë™[YØ]Ü‘[YØ][ÛœÊ‹JKÏ[ß×NÝœ\Ú
‹‹œÊKOXOË›™^Ù^_]Ú[JHOO]›ÚY	‰šK›[™ÝOOL
NÜ™]\›ˆœ™YXÙJ
ËJOOŠ
ÞK˜\ÜÙ\
JK˜˜[[˜ÙJKÈOO[[ÊšYK˜YÛÚ[œÊJËK˜˜[[˜ÙJN˜K˜˜[[˜ÙJK[
_X\Þ[˜ÈÙ][YØ][ÛŠ‹
^Û]NÝž^ÚOJ]ØZ]\Ë™›Ü˜ÙQÙ]]Y\žPÛY[

KœÝZÚ[™Ë™[YØ][ÛŠ‹
JK™[YØ][Û”™\ÜÛœÙOË˜˜[[˜Ù_XØ]Ú
Š^ÚYŠ
ÞK˜\ÜÙ\
Jˆ[œÝ[˜Ù[Ùˆ\œ›ÜŠK\‹ÔÝš[™Ê
Kš[˜ÛY\ÊšÙ^H›Ý›Ý[™ŠJ]›ÝÈŸ\™]\›ˆ_[X\Þ[˜ÈÙ]
Š^Ü™]\›Š]ØZ]\ËÔ]Y\žJš\ÚIÉÛŸIØ
JVÌOÏÛ[X\Þ[˜ÈÙX\˜Ú
Š^Û]ÚYŠ\[ÙˆOHœÝš[™ÈŠ][ŽÙ[ÙHYŠ
ÚYKš\ÔÙX\˜Ú]Y\žP\œ˜^JJŠJ][‹›X\
OO\[ÙˆK˜[YOOHœÝš[™ÈØ	ÚKšÙ^_OIÉÚK˜[Y_IØ˜	ÚKšÙ^_OIÚK˜[Y_X
Kš›Ú[ŠˆS‘ŠNÙ[ÙH›ÝÈ™]È\œ›ÜŠ‘ÛÝ[œÝ\ÜY]Y\žH\KˆÙYHÛÜÛR”ÈŒÌHÒS‘ÑSÑÈ›ÜˆTHœ™XZÚ[™ÈÚ[™Ù\È\™KˆŠNÜ™]\›ˆ\ËÔ]Y\žJ
_Y\ØÛÛ›™XÝ

^Ý\Ë˜ÛÛY]ÛY[	‰\Ë˜ÛÛY]ÛY[™\ØÛÛ›™XÝ

_X\Þ[˜Èœ›ØYØ\Ý
‹M™MOLÙLÊ^Û]HLKÏ\Ù][Y[Ý]


OOžÜHLK
KOX\Þ[˜ÈOžÚYŠŠ]›ÝÈ™]È^J˜[œØXÝ[ÛˆÚ]Q	ÙHØ\ÈÝX›Z]Y]Ø\È›ÝY]›Ý[™ÛˆHÚZ[‹ˆ[ÝHZYÚØ[ÈÚXÚÈ]\‹ˆ\™HØ\ÈHØZ]Ùˆ	ÝÌYLßHÙXÛÛ™Ë˜
NØ]ØZ]
ÞKœÛY\
JJNÛ]OX]ØZ]\Ë™Ù]

NÜ™]\›ˆOÞØÛÙNK˜ÛÙKZYÚKšZYÚ[™^K[™^]™[ÎK™]™[Ë˜]ÓÙÎKœ˜]ÓÙË˜[œØXÝ[Û’\Ú™\ÙÔ™\ÜÛœÙ\ÎK›\ÙÔ™\ÜÛœÙ\ËØ\Õ\ÙYK™Ø\Õ\ÙYØ\ÕØ[YK™Ø\ÕØ[YN˜J
_KÏX]ØZ]\Ë˜œ›ØYØ\ÝÞ[˜ÊŠNÜ™]\›ˆJÊK™š[˜[J

OOžØÛX\•[Y[Ý]
Ê_J_X\Þ[˜Èœ›ØYØ\ÝÞ[˜ÊŠ^Û]X]ØZ]\Ë™›Ü˜ÙQÙ]ÛÛY]ÛY[

K˜œ›ØYØ\ÝÞ[˜ÊÝ›ŸJNÜ™]\›ˆ˜ÛÙOÔ›ÛZ\ÙKœ™Z™XÝ
™]ÈžJ˜ÛÙK˜ÛÙ\ÜXÙOÏÈˆ‹›ÙÊJNŠÞKÒ^
Jš\Ú
KÕ\\Ø\ÙJ
_X\Þ[˜ÈÔ]Y\žJŠ^Ü™]\›Š]ØZ]\Ë™›Ü˜ÙQÙ]ÛÛY]ÛY[

KÙX\˜Ú[
Ü]Y\žN›ŸJJKË›X\
OOžÛ]\ZYK•\ÙÑ]K™XÛÙJKœ™\Ý[™]OÏÛ™]ÈZ[\œ˜^JNÜ™]\›žÚZYÚšKšZYÚ[™^šKš[™^\ÚŠÞKÒ^
JKš\Ú
KÕ\\Ø\ÙJ
KÛÙNšKœ™\Ý[˜ÛÙK]™[ÎšKœ™\Ý[™]™[Ë›X\
ZYK™œ›ÛU[™\›Z[]™[
K˜]ÓÙÎšKœ™\Ý[›Ùßˆ‹šK\ÙÔ™\ÜÛœÙ\Îœ‹›\ÙÔ™\ÜÛœÙ\Ë›X\
ÏOŠÝ\U\››Ë\U\›˜[YNŠÞK™š^Z[\œ˜^JJË˜[YJ_JJKØ\Õ\ÙYšKœ™\Ý[™Ø\Õ\ÙYØ\ÕØ[YšKœ™\Ý[™Ø\ÕØ[Y_J__NÓK”Ý\™Ø]PÛY[V_JNÝ˜\ˆURJ˜ÏOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\J˜Ë—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÕ˜Ë”ÚYÛš[™ÔÝ\™Ø]PÛY[U˜Ë™Y˜][™YÚ\ÝžU\\Ï]›ÚYÕ˜Ë˜Ü™X]QY˜][[Z[›ÐÛÛ™\\œÏZÝ˜\ˆžOXØJ
KZÛŠ
KOPZJ
KQ™

KÚYORÙÊ
K	OX\Š
KÚYORŠ
KYOXš

K	VZ

KZYOVÊ
KžOT

KšYO^

KšYOVÊ
KÏYL

KQZL

KÚOZš

KYOZŒJ
NÕ˜Ë™Y˜][™YÚ\ÝžU\\ÏVÖÈ‹ØÛÜÛ[ÜË˜˜\ÙKŒX™]LKÛÚ[ˆ‹ÚYKÛÚ[—K‹‹’ÚK˜]]•\\Ë‹‹’ÚK˜˜[šÕ\\Ë‹‹’ÚK™\ÝšX][Û•\\Ë‹‹’ÚK™™YYÜ˜[\\Ë‹‹’ÚK™ÛÝ•\\Ë‹‹’ÚK™Ü›Ý\\\Ë‹‹’ÚKœÝZÚ[™Õ\\Ë‹‹’ÚKšX˜Õ\\Ë‹‹’ÚK™\Ý[™Õ\\×NÙ[˜Ý[Ûˆ

^Ü™]\›žË‹‹ŠÚK˜Ü™X]P]][Z[›ÐÛÛ™\\œÊJ
K‹‹ŠÚK˜Ü™X]P˜[šÐ[Z[›ÐÛÛ™\\œÊJ
K‹‹ŠÚK˜Ü™X]Q\ÝšX][Û[Z[›ÐÛÛ™\\œÊJ
K‹‹ŠÚK˜Ü™X]QÛÝ[Z[›ÐÛÛ™\\œÊJ
K‹‹ŠÚK˜Ü™X]TÝZÚ[™Ð[Z[›ÐÛÛ™\\œÊJ
K‹‹ŠÚK˜Ü™X]RX˜Ð[Z[›ÐÛÛ™\\œÊJ
K‹‹ŠÚK˜Ü™X]Q™YYÜ˜[[Z[›ÐÛÛ™\\œÊJ
K‹‹ŠÚK˜Ü™X]U™\Ý[™Ð[Z[›ÐÛÛ™\\œÊJ
__]˜\ˆ‘XÛ\ÜÈH^[™ÈYK”Ý\™Ø]PÛY[Ü™YÚ\ÝžNØœ›ØYØ\Ý[Y[Ý]\ÎØœ›ØYØ\ÝÛ[\˜[\ÎÜÚYÛ™\ŽØ[Z[›Õ\\ÎÙØ\ÔšXÙNÙY˜][Ø\Ó][\Y\LKÙY˜][[˜[ZXÑØ\ÔšXÙS][\Y\LKŒÎÜÝ]XÈ\Þ[˜ÈÛÛ›™XÝÚ]ÚYÛ™\Š‹O^ßJ^Û]X]ØZ]
ÚYK˜ÛÛ›™XÝÛÛY]
JŠNÜ™]\›ˆK˜Ü™X]UÚ]ÚYÛ™\Š‹J_\Ý]XÈÜ™X]UÚ]ÚYÛ™\Š‹O^ßJ^Ü™]\›ˆ™]ÈJ‹J_\Ý]XÈ\Þ[˜ÈÙ™›[™J‹^ßJ^Ü™]\›ˆ™]ÈJ›ÚY‹
_XÛÛœÝXÝÜŠ‹J^ÜÝ\\Š‹JNÛ]Ü™YÚ\ÝžNœ[™]È”™YÚ\ÝžJ˜Ë™Y˜][™YÚ\ÝžU\\ÊK[Z[›Õ\\Î›Ï[™]ÈšYK[Z[›Õ\\Ê

J_OZNÝ\Ëœ™YÚ\ÝžO\‹\Ë˜[Z[›Õ\\Ï[Ë\ËœÚYÛ™\]\Ë˜œ›ØYØ\Ý[Y[Ý]\ÏZK˜œ›ØYØ\Ý[Y[Ý]\Ë\Ë˜œ›ØYØ\ÝÛ[\˜[\ÏZK˜œ›ØYØ\ÝÛ[\˜[\Ë\Ë™Ø\ÔšXÙOZK™Ø\ÔšXÙ_X\Þ[˜ÈÚ[][]J‹J^Û]]›X\
OO\Ëœ™YÚ\ÝžK™[˜ÛÙP\Ð[žJJJKÏJ]ØZ]\ËœÚYÛ™\‹™Ù]XØÛÝ[Ê
JK™š[™
OOK˜Y™\ÜÏOO[ŠNÚYŠ[Ê]›ÝÈ™]È\œ›ÜŠ‘˜Z[YÈ™]šY]™HXØÛÝ[œ›ÛHÚYÛ™\ˆŠNÛ]OJžK™[˜ÛÙTÙXÜMšÌTXšÙ^JJËœXšÙ^JKÜÙ\]Y[˜ÙNœßOX]ØZ]\Ë™Ù]Ù\]Y[˜ÙJŠKÙØ\Ò[™›Î™OX]ØZ]\Ë™›Ü˜ÙQÙ]]Y\žPÛY[

KœÚ[][]J‹KKÊNÜ™]\›Š	K˜\ÜÙ\Yš[™Y
J
KK•Z[LË™œ›ÛTÝš[™Ê™Ø\Õ\ÙYÔÝš[™Ê
JKÓ[X™\Š
_X\Þ[˜ÈÙ[™ÚÙ[œÊ‹K‹ÏHˆŠ^Û]O^Ý\U\›ˆ‹ØÛÜÛ[ÜË˜˜[šËŒX™]LK“\ÙÔÙ[™‹˜[YNžÙœ›ÛPY™\ÜÎ›‹ÐY™\ÜÎ[[Ý[–Ë‹‹šW__NÜ™]\›ˆ\ËœÚYÛ[™œ›ØYØ\Ý
‹ØWK‹Ê_X\Þ[˜È[YØ]UÚÙ[œÊ‹K‹ÏHˆŠ^Û]O^Ý\U\›ˆ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK“\ÙÑ[YØ]H‹˜[YN‰“\ÙÑ[YØ]K™œ›ÛT\X[
Ù[YØ]ÜY™\ÜÎ›‹˜[Y]ÜY™\ÜÎ[[Ý[š_J_NÜ™]\›ˆ\ËœÚYÛ[™œ›ØYØ\Ý
‹ØWK‹Ê_X\Þ[˜È[™[YØ]UÚÙ[œÊ‹K‹ÏHˆŠ^Û]O^Ý\U\›ˆ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK“\ÙÕ[™[YØ]H‹˜[YN‰“\ÙÕ[™[YØ]K™œ›ÛT\X[
Ù[YØ]ÜY™\ÜÎ›‹˜[Y]ÜY™\ÜÎ[[Ý[š_J_NÜ™]\›ˆ\ËœÚYÛ[™œ›ØYØ\Ý
‹ØWK‹Ê_X\Þ[˜ÈÚ]˜]Ô™]Ø\™Ê‹KHˆŠ^Û]Ï^Ý\U\›ˆ‹ØÛÜÛ[ÜË™\ÝšX][Û‹ŒX™]LK“\ÙÕÚ]˜]Ñ[YØ]Ü”™]Ø\™‹˜[YN“YK“\ÙÕÚ]˜]Ñ[YØ]Ü”™]Ø\™™œ›ÛT\X[
Ù[YØ]ÜY™\ÜÎ›‹˜[Y]ÜY™\ÜÎJ_NÜ™]\›ˆ\ËœÚYÛ[™œ›ØYØ\Ý
‹Û×KKŠ_X\Þ[˜ÈÙ[™X˜ÕÚÙ[œÊ‹K‹ËKËOHˆŠ^Û]\ÏÐšYÒ[
ÊJšYÒ[
YNJN›ÚY^Ý\U\›ˆ‹ÚX˜Ë˜\XØ][ÛœË˜[œÙ™\‹ŒK“\ÙÕ˜[œÙ™\ˆ‹˜[YNžšYK“\ÙÕ˜[œÙ™\‹™œ›ÛT\X[
ÜÛÝ\˜ÙTÜœ‹ÛÝ\˜ÙPÚ[›™[›ËÙ[™\Ž›‹™XÙZ]™\ŽÚÙ[ŽšK[Y[Ý]ZYÚ˜K[Y[Ý][Y\Ý[\™ŸJ_NÜ™]\›ˆ\ËœÚYÛ[™œ›ØYØ\Ý
‹ÜKJ_X\Þ[˜ÈÚYÛ[™œ›ØYØ\Ý
‹KHˆ‹Ê^Û]NÚOOH˜]]ÈŸ\[ÙˆOOH›[X™\ˆØOX]ØZ]\Ë˜Ø[Ý[]Q™YQ›Ü•˜[œØXÝ[ÛŠ‹‹JN˜OZNÛ]ÏX]ØZ]\ËœÚYÛŠ‹K‹›ÚYÊKZžK•˜]Ë™[˜ÛÙJÊK™š[š\Ú

NÜ™]\›ˆ\Ë˜œ›ØYØ\Ý
\Ë˜œ›ØYØ\Ý[Y[Ý]\Ë\Ë˜œ›ØYØ\ÝÛ[\˜[\Ê_X\Þ[˜ÈÚYÛ[™œ›ØYØ\ÝÞ[˜Ê‹KHˆ‹Ê^Û]NÚOOH˜]]ÈŸ\[ÙˆOOH›[X™\ˆØOX]ØZ]\Ë˜Ø[Ý[]Q™YQ›Ü•˜[œØXÝ[ÛŠ‹‹JN˜OZNÛ]ÏX]ØZ]\ËœÚYÛŠ‹K‹›ÚYÊKZžK•˜]Ë™[˜ÛÙJÊK™š[š\Ú

NÜ™]\›ˆ\Ë˜œ›ØYØ\ÝÞ[˜Ê
_X\Þ[˜ÈØ[Ý[]Q™YQ›Ü•˜[œØXÝ[ÛŠ‹KŠ^Û]ÏX]ØZ]\ËœÚ[][]J‹JKO]\[ÙˆOH›[X™\ˆÜŽ\Ë™Y˜][Ø\Ó][\Y\‹ÏSX]˜ÙZ[
Ê˜JK]\Ë™Ø\ÔšXÙNÚYŠY
]›ÝÈ™]È\œ›ÜŠ‘Ø\ÈšXÙH]\Ý™HÙ][ˆHÛY[Ü[ÛœÈÚ[ˆ]]ÈØ\È\È\ÙYˆŠNÚYŠ
Qš\Ñ[˜[ZXÑØ\ÔšXÙPÛÛ™šYÊJ
J^Û]OY]K›][\Y\ÏÝ\Ë™Y˜][[˜[ZXÑØ\ÔšXÙS][\Y\‹]K›Z[‘Ø\ÔšXÙK]K›X^Ø\ÔšXÙNÝž^Û]X]ØZ]\Ë™Ù]ÚZ[’Y

K]\Ë™›Ü˜ÙQÙ]]Y\žPÛY[

KÏX]ØZ]
Qœ]Y\žQ[˜[ZXÑØ\ÔšXÙJJ‹K™[›ÛK
KO\˜[[Ý[™œ˜XÝ[Û˜[YÚ]ËÏJQ›][\QXÚ[X[žS[X™\ŠJË‹JKTËš\ÑÜ™X]\•[Š˜[[Ý[
OÔÎœ˜[[Ý[ÚYŠ
^Û][˜[[Ý[˜Y\Ýœ˜XÝ[Û˜[YÚ]ÊJNÓS‹š\Ó\ÜÕ[ŠŠOÓŽ•Ÿ[][™]ÈË‘Ø\ÔšXÙJ‹K™[›ÛJNÜ™]\›ŠË˜Ø[Ý[]Q™YJJËŠ_XØ]ÚÜ™]\›ŠË˜Ø[Ý[]Q™YJJË
__Y[ÙH™]\›Š	K˜\ÜÙ\
J[œÝ[˜Ù[ÙˆË‘Ø\ÔšXÙK‘Ø\ÈšXÙH]\Ý™HHØ\ÔšXÙH[œÝ[˜ÙHÚ[ˆ\Ú[™ÈÝ]XÈšXÚ[™ËˆŠK
Ë˜Ø[Ý[]Q™YJJË
_X\Þ[˜ÈÚYÛŠ‹K‹ËJ^Û]ÎÚYŠÊ\Ï[ÎÙ[Ù^Û]ØXØÛÝ[[X™\Ž™Ù\]Y[˜ÙN_OX]ØZ]\Ë™Ù]Ù\]Y[˜ÙJŠKX]ØZ]\Ë™Ù]ÚZ[’Y

NÜÏ^ØXØÛÝ[[X™\Ž™Ù\]Y[˜ÙNKÚZ[’Y™Ÿ_\™]\›Šš\ÓÙ™›[™Q\™XÝÚYÛ™\ŠJ\ËœÚYÛ™\ŠOÝ\ËœÚYÛ‘\™XÝ
‹K‹ËJN\ËœÚYÛ[Z[›Ê‹K‹ËJ_X\Þ[˜ÈÚYÛ[Z[›Ê‹K‹ØXØÛÝ[[X™\Ž›ËÙ\]Y[˜ÙN˜KÚZ[’YœßK
^Ê	K˜\ÜÙ\
JJš\ÓÙ™›[™Q\™XÝÚYÛ™\ŠJ\ËœÚYÛ™\ŠJNÛ]OJ]ØZ]\ËœÚYÛ™\‹™Ù]XØÛÝ[Ê
JK™š[™
ÙOOÙK˜Y™\ÜÏOO[ŠNÚYŠ]J]›ÝÈ™]È\œ›ÜŠ‘˜Z[YÈ™]šY]™HXØÛÝ[œ›ÛHÚYÛ™\ˆŠNÛ]J™[˜ÛÙTXšÙ^JJ
žK™Ù][Z[›ÔXšÙ^JJJJKVZYK”ÚYÛ“[ÙK”ÒQÓ—ÓSÑWÓQÐPÖWÐSRS“×Ò”ÓÓ‹]›X\
ÙOO\Ë˜[Z[›Õ\\ËÐ[Z[›ÊÙJJKJžK›XZÙTÚYÛ‘ØÊJKË‹ËK
KÜÚYÛ˜]\™N‹ÚYÛ™YßOX]ØZ]\ËœÚYÛ™\‹œÚYÛ[Z[›Ê‹
KÏ^Ý\U\›ˆ‹ØÛÜÛ[ÜËŒX™]LK•›ÙH‹˜[YNžÛY\ÜØYÙ\ÎË›\ÙÜË›X\
ÙOO\Ë˜[Z[›Õ\\Ë™œ›ÛP[Z[›ÊÙJJKY[[ÎË›Y[[Ë[Y[Ý]ZYÚ™_K]\Ëœ™YÚ\ÝžK™[˜ÛÙJÊKVK’[LË™œ›ÛTÝš[™ÊË™™YK™Ø\ÊKÓ[X™\Š
KVK’[LË™œ›ÛTÝš[™ÊËœÙ\]Y[˜ÙJKÓ[X™\Š
KOJ›XZÙP]][™›Ðž]\ÊJÞÜXšÙ^N™‹Ù\]Y[˜ÙN•ŸWKË™™YK˜[[Ý[‹Ë™™YK™Ü˜[\‹Ë™™YKœ^Y\‹
NÜ™]\›ˆžK•˜]Ë™œ›ÛT\X[
Ø›ÙPž]\Î“‹]][™›Ðž]\ÎœKÚYÛ˜]\™\Î–Ê™œ›ÛP˜\ÙM
J‹œÚYÛ˜]\™JW_J_X\Þ[˜ÈÚYÛ‘\™XÝ
‹K‹ØXØÛÝ[[X™\Ž›ËÙ\]Y[˜ÙN˜KÚZ[’YœßK
^Ê	K˜\ÜÙ\
J
š\ÓÙ™›[™Q\™XÝÚYÛ™\ŠJ\ËœÚYÛ™\ŠJNÛ]OJ]ØZ]\ËœÚYÛ™\‹™Ù]XØÛÝ[Ê
JK™š[™
O“‹˜Y™\ÜÏOO[ŠNÚYŠ]J]›ÝÈ™]È\œ›ÜŠ‘˜Z[YÈ™]šY]™HXØÛÝ[œ›ÛHÚYÛ™\ˆŠNÛ]J™[˜ÛÙTXšÙ^JJ
žK™Ù][Z[›ÔXšÙ^JJJJK^Ý\U\›ˆ‹ØÛÜÛ[ÜËŒX™]LK•›ÙH‹˜[YNžÛY\ÜØYÙ\ÎY[[Îœ‹[Y[Ý]ZYÚ™_K]\Ëœ™YÚ\ÝžK™[˜ÛÙJ
KVK’[LË™œ›ÛTÝš[™ÊK™Ø\ÊKÓ[X™\Š
KJ›XZÙP]][™›Ðž]\ÊJÞÜXšÙ^N™‹Ù\]Y[˜ÙN˜_WKK˜[[Ý[K™Ü˜[\‹Kœ^Y\ŠKÏJ›XZÙTÚYÛ‘ØÊJ‹ËÊKÜÚYÛ˜]\™N‘KÚYÛ™Y”ßOX]ØZ]\ËœÚYÛ™\‹œÚYÛ‘\™XÝ
‹ÊNÜ™]\›ˆžK•˜]Ë™œ›ÛT\X[
Ø›ÙPž]\Î”Ë˜›ÙPž]\Ë]][™›Ðž]\Î”Ë˜]][™›Ðž]\ËÚYÛ˜]\™\Î–Ê™œ›ÛP˜\ÙM
JKœÚYÛ˜]\™JW_J__NÕ˜Ë”ÚYÛš[™ÔÝ\™Ø]PÛY[[‘JNÝ˜\ˆYÏRJOžÈ\ÙHÝšXÝŽÝ˜\ˆ	YOT‰‰”‹—×ØÜ™X]Pš[™[™ß
Øš™XÝ˜Ü™X]OÊ[˜Ý[ÛŠK‹J^ÚOOO]›ÚY	‰ŠO]
NÝ˜\ˆSØš™XÝ™Ù]ÝÛ”›Ü\Q\ØÜš\ÜŠ‹
NÊ\Ÿ
™Ù]š[ˆÈ[‹—×Ù\Ó[Ù[Nœ‹Üš]X›_‹˜ÛÛ™šYÝ\˜X›JJI‰Š^Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ–Ý__JKØš™XÝ™Yš[™T›Ü\JKKŠ_JNŠ[˜Ý[ÛŠK‹J^ÚOOO]›ÚY	‰ŠO]
KVÚWO[–Ý_JJKšYOT‰‰”‹—×ÜÙ][Ù[QY˜][
Øš™XÝ˜Ü™X]OÊ[˜Ý[ÛŠKŠ^ÓØš™XÝ™Yš[™T›Ü\JK™Y˜][‹Ù[[Y\˜X›NˆL˜[YN›ŸJ_JN™[˜Ý[ÛŠKŠ^ÙK™Y˜][[ŸJK[ÙOT‰‰”‹—×Ú[\ÜÝ\Ÿ
[˜Ý[ÛŠ
^Ý˜\ˆOY[˜Ý[ÛŠŠ^Ü™]\›ˆOSØš™XÝ™Ù]ÝÛ”›Ü\S˜[Y\ß[˜Ý[ÛŠ
^Ý˜\ˆOV×NÙ›ÜŠ˜\ˆˆ[ˆ
SØš™XÝœ›ÝÝ\Kš\ÓÝÛ”›Ü\K˜Ø[
ŠI‰ŠVÚK›[™ÝO\ŠNÜ™]\›ˆ_KJŠ_NÜ™]\›ˆ[˜Ý[ÛŠŠ^ÚYŠ‰‰›‹—×Ù\Ó[Ù[J\™]\›ˆŽÝ˜\ˆ^ßNÚYŠˆO[[
Y›ÜŠ˜\ˆOYJŠKLÜK›[™ÝÜŠÊÊZVÜ—HOOH™Y˜][‰‰‰YJ‹VÜ—JNÜ™]\›ˆšYJŠK_JJ
NÓØš™XÝ™Yš[™T›Ü\J‹—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÔ‹š\Ó\ÙÔÝX›Z]›ÜÜØ[[˜ÛÙSØš™XÝT‹š\Ó\ÙÔÙ[™[˜ÛÙSØš™XÝT‹š\Ó\ÙÑY]˜[Y]Ü‘[˜ÛÙSØš™XÝT‹š\Ó\ÙÑ\ÜÚ][˜ÛÙSØš™XÝT‹š\Ó\ÙÑ[YØ]Q[˜ÛÙSØš™XÝT‹š\Ó\ÙÐÜ™X]U˜[Y]Ü‘[˜ÛÙSØš™XÝT‹š\Ó\ÙÐØ[˜Ù[[˜›Û™[™Ñ[YØ][Û‘[˜ÛÙSØš™XÝT‹š\Ó\ÙÐ™YÚ[”™Y[YØ]Q[˜ÛÙSØš™XÝT‹š\Ð[Z[›Ó\ÙÕÚ]˜]Õ˜[Y]ÜÛÛ[Z\ÜÚ[ÛT‹š\Ð[Z[›Ó\ÙÕÚ]˜]Ñ[YØ]Ü”™]Ø\™T‹š\Ð[Z[›Ó\ÙÕ›ÝUÙZYÚYT‹š\Ð[Z[›Ó\ÙÕ›ÝOT‹š\Ð[Z[›Ó\ÙÕ™\šYžR[˜\šX[T‹š\Ð[Z[›Ó\ÙÕ[š˜Z[T‹š\Ð[Z[›Ó\ÙÕ[™[YØ]OT‹š\Ð[Z[›Ó\ÙÕ˜[œÙ™\T‹š\Ð[Z[›Ó\ÙÔÝX›Z]›ÜÜØ[T‹š\Ð[Z[›Ó\ÙÔÝX›Z]]šY[˜ÙOT‹š\Ð[Z[›Ó\ÙÔÙ]Ú]˜]ÐY™\ÜÏT‹š\Ð[Z[›Ó\ÙÔÙ[™T‹š\Ð[Z[›Ó\ÙÓ][TÙ[™T‹š\Ð[Z[›Ó\ÙÑ[™ÛÛ[][š]TÛÛT‹š\Ð[Z[›Ó\ÙÑY]˜[Y]ÜT‹š\Ð[Z[›Ó\ÙÑ\ÜÚ]T‹š\Ð[Z[›Ó\ÙÑ[YØ]OT‹š\Ð[Z[›Ó\ÙÐÜ™X]U™\Ý[™ÐXØÛÝ[T‹š\Ð[Z[›Ó\ÙÐÜ™X]U˜[Y]ÜT‹š\Ð[Z[›Ó\ÙÐ™YÚ[”™Y[YØ]OT‹˜Ü™X]U™\Ý[™Ð[Z[›ÐÛÛ™\\œÏT‹˜Ü™X]TÝZÚ[™Ð[Z[›ÐÛÛ™\\œÏT‹˜Ü™X]TÛ\Ú[™Ð[Z[›ÐÛÛ™\\œÏT‹˜Ü™X]RX˜Ð[Z[›ÐÛÛ™\\œÏT‹˜Ü™X]QÜ›Ý\[Z[›ÐÛÛ™\\œÏT‹˜Ü™X]QÛÝ[Z[›ÐÛÛ™\\œÏT‹˜Ü™X]Q™YYÜ˜[[Z[›ÐÛÛ™\\œÏT‹˜Ü™X]Q]šY[˜ÙP[Z[›ÐÛÛ™\\œÏT‹˜Ü™X]Q\ÝšX][Û[Z[›ÐÛÛ™\\œÏT‹˜Ü™X]PÜž\Ú\Ð[Z[›ÐÛÛ™\\œÏT‹˜Ü™X]P˜[šÐ[Z[›ÐÛÛ™\\œÏT‹˜Ü™X]P]][Z[›ÐÛÛ™\\œÏT‹›ÙÜÏT‹œ]Y\žQ[˜[ZXÑØ\ÔšXÙOT‹›][\QXÚ[X[žS[X™\T‹š\Ñ[˜[ZXÑØ\ÔšXÙPÛÛ™šYÏT‹˜ÚXÚÑ[˜[ZXÑØ\ÔšXÙTÝ\ÜT‹‘Ø\ÔšXÙOT‹˜Ø[Ý[]Q™YOT‹™œ›ÛU[™\›Z[]™[T‹[Z[›Õ\\ÏT‹˜XØÛÝ[œ›ÛP[žO]›ÚYÔ‹œ\œÙPÛÚ[œÏT‹›XZÙPÛÜÛ[ÜÚX”]T‹˜ÛÚ[œÏT‹˜ÛÚ[T‹•[Y[Ý]\œ›ÜT‹”Ý\™Ø]PÛY[T‹š\Ñ[]™\•ÝXØÙ\ÜÏT‹š\Ñ[]™\•˜Z[\™OT‹œ›ØYØ\Ý\œ›ÜT‹˜\ÜÙ\\Ñ[]™\•ÝXØÙ\ÜÏT‹˜\ÜÙ\\Ñ[]™\•˜Z[\™OT‹”ÚYÛš[™ÔÝ\™Ø]PÛY[T‹™Y˜][™YÚ\ÝžU\\ÏT‹˜Ü™X]QY˜][[Z[›ÐÛÛ™\\œÏT‹š\ÔÙX\˜Ú]Y\žP\œ˜^OT‹”]Y\žPÛY[T‹™XÛÙPÛÜÛ[ÜÔÙÑXÑœ›ÛT›ÝÏT‹˜Ü™X]T›ÝØY”œÐÛY[T‹˜Ü™X]TYÚ[˜][ÛT‹›XZÙS][\ÚYÛ™Yž]\ÏT‹›XZÙS][\ÚYÛ™YT‹œÙ]\^[œÚ[ÛT‹œÙ]\ÝZÚ[™Ñ^[œÚ[ÛT‹œÙ]\Û\Ú[™Ñ^[œÚ[ÛT‹œÙ]\Z[^[œÚ[ÛT‹œÙ]\X˜Ñ^[œÚ[ÛT‹œÙ]\ÛÝ‘^[œÚ[ÛT‹œÙ]\™YYÜ˜[^[œÚ[ÛT‹œÙ]\\ÝšX][Û‘^[œÚ[ÛT‹œÙ]\˜[šÑ^[œÚ[ÛT‹œÙ]\]]‘^[œÚ[ÛT‹œÙ]\]]^[œÚ[ÛT‹š\Ó\ÙÕÚ]˜]Ñ[YØ]Ü”™]Ø\™[˜ÛÙSØš™XÝT‹š\Ó\ÙÕ›ÝUÙZYÚY[˜ÛÙSØš™XÝT‹š\Ó\ÙÕ›ÝQ[˜ÛÙSØš™XÝT‹š\Ó\ÙÕ[™[YØ]Q[˜ÛÙSØš™XÝT‹š\Ó\ÙÕ˜[œÙ™\‘[˜ÛÙSØš™XÝ]›ÚYÝ˜\ˆ›ÙO^”Ê
NÓØš™XÝ™Yš[™T›Ü\J‹˜XØÛÝ[œ›ÛP[žH‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ›ÙK˜XØÛÝ[œ›ÛP[ž__JNÝ˜\ˆÙOVÊ
NÓØš™XÝ™Yš[™T›Ü\J‹[Z[›Õ\\È‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆÙK[Z[›Õ\\ß_JNÝ˜\ˆ›ÙOZ”Ê
NÓØš™XÝ™Yš[™T›Ü\J‹™œ›ÛU[™\›Z[]™[‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ›ÙK™œ›ÛU[™\›Z[]™[_JNÝ˜\ˆ•YL

NÓØš™XÝ™Yš[™T›Ü\J‹˜Ø[Ý[]Q™YH‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ•‹˜Ø[Ý[]Q™Y__JNÓØš™XÝ™Yš[™T›Ü\J‹‘Ø\ÔšXÙH‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ•‹‘Ø\ÔšXÙ__JNÝ˜\ˆPZL

NÓØš™XÝ™Yš[™T›Ü\J‹˜ÚXÚÑ[˜[ZXÑØ\ÔšXÙTÝ\Ü‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆP‹˜ÚXÚÑ[˜[ZXÑØ\ÔšXÙTÝ\Ü_JNÓØš™XÝ™Yš[™T›Ü\J‹š\Ñ[˜[ZXÑØ\ÔšXÙPÛÛ™šYÈ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆP‹š\Ñ[˜[ZXÑØ\ÔšXÙPÛÛ™šYß_JNÓØš™XÝ™Yš[™T›Ü\J‹›][\QXÚ[X[žS[X™\ˆ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆP‹›][\QXÚ[X[žS[X™\Ÿ_JNÓØš™XÝ™Yš[™T›Ü\J‹œ]Y\žQ[˜[ZXÑØ\ÔšXÙH‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆP‹œ]Y\žQ[˜[ZXÑØ\ÔšXÙ__JNÔ‹›ÙÜÏY[ÙJJ
JNÝ˜\ˆZš

NÓØš™XÝ™Yš[™T›Ü\J‹˜Ü™X]P]][Z[›ÐÛÛ™\\œÈ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ‹˜Ü™X]P]][Z[›ÐÛÛ™\\œß_JNÓØš™XÝ™Yš[™T›Ü\J‹˜Ü™X]P˜[šÐ[Z[›ÐÛÛ™\\œÈ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ‹˜Ü™X]P˜[šÐ[Z[›ÐÛÛ™\\œß_JNÓØš™XÝ™Yš[™T›Ü\J‹˜Ü™X]PÜž\Ú\Ð[Z[›ÐÛÛ™\\œÈ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ‹˜Ü™X]PÜž\Ú\Ð[Z[›ÐÛÛ™\\œß_JNÓØš™XÝ™Yš[™T›Ü\J‹˜Ü™X]Q\ÝšX][Û[Z[›ÐÛÛ™\\œÈ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ‹˜Ü™X]Q\ÝšX][Û[Z[›ÐÛÛ™\\œß_JNÓØš™XÝ™Yš[™T›Ü\J‹˜Ü™X]Q]šY[˜ÙP[Z[›ÐÛÛ™\\œÈ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ‹˜Ü™X]Q]šY[˜ÙP[Z[›ÐÛÛ™\\œß_JNÓØš™XÝ™Yš[™T›Ü\J‹˜Ü™X]Q™YYÜ˜[[Z[›ÐÛÛ™\\œÈ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ‹˜Ü™X]Q™YYÜ˜[[Z[›ÐÛÛ™\\œß_JNÓØš™XÝ™Yš[™T›Ü\J‹˜Ü™X]QÛÝ[Z[›ÐÛÛ™\\œÈ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ‹˜Ü™X]QÛÝ[Z[›ÐÛÛ™\\œß_JNÓØš™XÝ™Yš[™T›Ü\J‹˜Ü™X]QÜ›Ý\[Z[›ÐÛÛ™\\œÈ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ‹˜Ü™X]QÜ›Ý\[Z[›ÐÛÛ™\\œß_JNÓØš™XÝ™Yš[™T›Ü\J‹˜Ü™X]RX˜Ð[Z[›ÐÛÛ™\\œÈ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ‹˜Ü™X]RX˜Ð[Z[›ÐÛÛ™\\œß_JNÓØš™XÝ™Yš[™T›Ü\J‹˜Ü™X]TÛ\Ú[™Ð[Z[›ÐÛÛ™\\œÈ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ‹˜Ü™X]TÛ\Ú[™Ð[Z[›ÐÛÛ™\\œß_JNÓØš™XÝ™Yš[™T›Ü\J‹˜Ü™X]TÝZÚ[™Ð[Z[›ÐÛÛ™\\œÈ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ‹˜Ü™X]TÝZÚ[™Ð[Z[›ÐÛÛ™\\œß_JNÓØš™XÝ™Yš[™T›Ü\J‹˜Ü™X]U™\Ý[™Ð[Z[›ÐÛÛ™\\œÈ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ‹˜Ü™X]U™\Ý[™Ð[Z[›ÐÛÛ™\\œß_JNÓØš™XÝ™Yš[™T›Ü\J‹š\Ð[Z[›Ó\ÙÐ™YÚ[”™Y[YØ]H‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ‹š\Ð[Z[›Ó\ÙÐ™YÚ[”™Y[YØ]__JNÓØš™XÝ™Yš[™T›Ü\J‹š\Ð[Z[›Ó\ÙÐÜ™X]U˜[Y]Üˆ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ‹š\Ð[Z[›Ó\ÙÐÜ™X]U˜[Y]ÜŸ_JNÓØš™XÝ™Yš[™T›Ü\J‹š\Ð[Z[›Ó\ÙÐÜ™X]U™\Ý[™ÐXØÛÝ[‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ‹š\Ð[Z[›Ó\ÙÐÜ™X]U™\Ý[™ÐXØÛÝ[_JNÓØš™XÝ™Yš[™T›Ü\J‹š\Ð[Z[›Ó\ÙÑ[YØ]H‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ‹š\Ð[Z[›Ó\ÙÑ[YØ]__JNÓØš™XÝ™Yš[™T›Ü\J‹š\Ð[Z[›Ó\ÙÑ\ÜÚ]‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ‹š\Ð[Z[›Ó\ÙÑ\ÜÚ]_JNÓØš™XÝ™Yš[™T›Ü\J‹š\Ð[Z[›Ó\ÙÑY]˜[Y]Üˆ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ‹š\Ð[Z[›Ó\ÙÑY]˜[Y]ÜŸ_JNÓØš™XÝ™Yš[™T›Ü\J‹š\Ð[Z[›Ó\ÙÑ[™ÛÛ[][š]TÛÛ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ‹š\Ð[Z[›Ó\ÙÑ[™ÛÛ[][š]TÛÛ_JNÓØš™XÝ™Yš[™T›Ü\J‹š\Ð[Z[›Ó\ÙÓ][TÙ[™‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ‹š\Ð[Z[›Ó\ÙÓ][TÙ[™_JNÓØš™XÝ™Yš[™T›Ü\J‹š\Ð[Z[›Ó\ÙÔÙ[™‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ‹š\Ð[Z[›Ó\ÙÔÙ[™_JNÓØš™XÝ™Yš[™T›Ü\J‹š\Ð[Z[›Ó\ÙÔÙ]Ú]˜]ÐY™\ÜÈ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ‹š\Ð[Z[›Ó\ÙÔÙ]Ú]˜]ÐY™\Üß_JNÓØš™XÝ™Yš[™T›Ü\J‹š\Ð[Z[›Ó\ÙÔÝX›Z]]šY[˜ÙH‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ‹š\Ð[Z[›Ó\ÙÔÝX›Z]]šY[˜Ù__JNÓØš™XÝ™Yš[™T›Ü\J‹š\Ð[Z[›Ó\ÙÔÝX›Z]›ÜÜØ[‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ‹š\Ð[Z[›Ó\ÙÔÝX›Z]›ÜÜØ[_JNÓØš™XÝ™Yš[™T›Ü\J‹š\Ð[Z[›Ó\ÙÕ˜[œÙ™\ˆ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ‹š\Ð[Z[›Ó\ÙÕ˜[œÙ™\Ÿ_JNÓØš™XÝ™Yš[™T›Ü\J‹š\Ð[Z[›Ó\ÙÕ[™[YØ]H‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ‹š\Ð[Z[›Ó\ÙÕ[™[YØ]__JNÓØš™XÝ™Yš[™T›Ü\J‹š\Ð[Z[›Ó\ÙÕ[š˜Z[‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ‹š\Ð[Z[›Ó\ÙÕ[š˜Z[_JNÓØš™XÝ™Yš[™T›Ü\J‹š\Ð[Z[›Ó\ÙÕ™\šYžR[˜\šX[‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ‹š\Ð[Z[›Ó\ÙÕ™\šYžR[˜\šX[_JNÓØš™XÝ™Yš[™T›Ü\J‹š\Ð[Z[›Ó\ÙÕ›ÝH‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ‹š\Ð[Z[›Ó\ÙÕ›Ý__JNÓØš™XÝ™Yš[™T›Ü\J‹š\Ð[Z[›Ó\ÙÕ›ÝUÙZYÚY‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ‹š\Ð[Z[›Ó\ÙÕ›ÝUÙZYÚY_JNÓØš™XÝ™Yš[™T›Ü\J‹š\Ð[Z[›Ó\ÙÕÚ]˜]Ñ[YØ]Ü”™]Ø\™‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ‹š\Ð[Z[›Ó\ÙÕÚ]˜]Ñ[YØ]Ü”™]Ø\™_JNÓØš™XÝ™Yš[™T›Ü\J‹š\Ð[Z[›Ó\ÙÕÚ]˜]Õ˜[Y]ÜÛÛ[Z\ÜÚ[Ûˆ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ‹š\Ð[Z[›Ó\ÙÕÚ]˜]Õ˜[Y]ÜÛÛ[Z\ÜÚ[ÛŸ_JNÓØš™XÝ™Yš[™T›Ü\J‹š\Ó\ÙÐ™YÚ[”™Y[YØ]Q[˜ÛÙSØš™XÝ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ‹š\Ó\ÙÐ™YÚ[”™Y[YØ]Q[˜ÛÙSØš™XÝ_JNÓØš™XÝ™Yš[™T›Ü\J‹š\Ó\ÙÐØ[˜Ù[[˜›Û™[™Ñ[YØ][Û‘[˜ÛÙSØš™XÝ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ‹š\Ó\ÙÐØ[˜Ù[[˜›Û™[™Ñ[YØ][Û‘[˜ÛÙSØš™XÝ_JNÓØš™XÝ™Yš[™T›Ü\J‹š\Ó\ÙÐÜ™X]U˜[Y]Ü‘[˜ÛÙSØš™XÝ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ‹š\Ó\ÙÐÜ™X]U˜[Y]Ü‘[˜ÛÙSØš™XÝ_JNÓØš™XÝ™Yš[™T›Ü\J‹š\Ó\ÙÑ[YØ]Q[˜ÛÙSØš™XÝ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ‹š\Ó\ÙÑ[YØ]Q[˜ÛÙSØš™XÝ_JNÓØš™XÝ™Yš[™T›Ü\J‹š\Ó\ÙÑ\ÜÚ][˜ÛÙSØš™XÝ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ‹š\Ó\ÙÑ\ÜÚ][˜ÛÙSØš™XÝ_JNÓØš™XÝ™Yš[™T›Ü\J‹š\Ó\ÙÑY]˜[Y]Ü‘[˜ÛÙSØš™XÝ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ‹š\Ó\ÙÑY]˜[Y]Ü‘[˜ÛÙSØš™XÝ_JNÓØš™XÝ™Yš[™T›Ü\J‹š\Ó\ÙÔÙ[™[˜ÛÙSØš™XÝ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ‹š\Ó\ÙÔÙ[™[˜ÛÙSØš™XÝ_JNÓØš™XÝ™Yš[™T›Ü\J‹š\Ó\ÙÔÝX›Z]›ÜÜØ[[˜ÛÙSØš™XÝ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ‹š\Ó\ÙÔÝX›Z]›ÜÜØ[[˜ÛÙSØš™XÝ_JNÓØš™XÝ™Yš[™T›Ü\J‹š\Ó\ÙÕ˜[œÙ™\‘[˜ÛÙSØš™XÝ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ‹š\Ó\ÙÕ˜[œÙ™\‘[˜ÛÙSØš™XÝ_JNÓØš™XÝ™Yš[™T›Ü\J‹š\Ó\ÙÕ[™[YØ]Q[˜ÛÙSØš™XÝ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ‹š\Ó\ÙÕ[™[YØ]Q[˜ÛÙSØš™XÝ_JNÓØš™XÝ™Yš[™T›Ü\J‹š\Ó\ÙÕ›ÝQ[˜ÛÙSØš™XÝ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ‹š\Ó\ÙÕ›ÝQ[˜ÛÙSØš™XÝ_JNÓØš™XÝ™Yš[™T›Ü\J‹š\Ó\ÙÕ›ÝUÙZYÚY[˜ÛÙSØš™XÝ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ‹š\Ó\ÙÕ›ÝUÙZYÚY[˜ÛÙSØš™XÝ_JNÓØš™XÝ™Yš[™T›Ü\J‹š\Ó\ÙÕÚ]˜]Ñ[YØ]Ü”™]Ø\™[˜ÛÙSØš™XÝ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ‹š\Ó\ÙÕÚ]˜]Ñ[YØ]Ü”™]Ø\™[˜ÛÙSØš™XÝ_JNÓØš™XÝ™Yš[™T›Ü\J‹œÙ]\]]^[œÚ[Ûˆ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ‹œÙ]\]]^[œÚ[ÛŸ_JNÓØš™XÝ™Yš[™T›Ü\J‹œÙ]\]]‘^[œÚ[Ûˆ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ‹œÙ]\]]‘^[œÚ[ÛŸ_JNÓØš™XÝ™Yš[™T›Ü\J‹œÙ]\˜[šÑ^[œÚ[Ûˆ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ‹œÙ]\˜[šÑ^[œÚ[ÛŸ_JNÓØš™XÝ™Yš[™T›Ü\J‹œÙ]\\ÝšX][Û‘^[œÚ[Ûˆ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ‹œÙ]\\ÝšX][Û‘^[œÚ[ÛŸ_JNÓØš™XÝ™Yš[™T›Ü\J‹œÙ]\™YYÜ˜[^[œÚ[Ûˆ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ‹œÙ]\™YYÜ˜[^[œÚ[ÛŸ_JNÓØš™XÝ™Yš[™T›Ü\J‹œÙ]\ÛÝ‘^[œÚ[Ûˆ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ‹œÙ]\ÛÝ‘^[œÚ[ÛŸ_JNÓØš™XÝ™Yš[™T›Ü\J‹œÙ]\X˜Ñ^[œÚ[Ûˆ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ‹œÙ]\X˜Ñ^[œÚ[ÛŸ_JNÓØš™XÝ™Yš[™T›Ü\J‹œÙ]\Z[^[œÚ[Ûˆ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ‹œÙ]\Z[^[œÚ[ÛŸ_JNÓØš™XÝ™Yš[™T›Ü\J‹œÙ]\Û\Ú[™Ñ^[œÚ[Ûˆ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ‹œÙ]\Û\Ú[™Ñ^[œÚ[ÛŸ_JNÓØš™XÝ™Yš[™T›Ü\J‹œÙ]\ÝZÚ[™Ñ^[œÚ[Ûˆ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ‹œÙ]\ÝZÚ[™Ñ^[œÚ[ÛŸ_JNÓØš™XÝ™Yš[™T›Ü\J‹œÙ]\^[œÚ[Ûˆ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ‹œÙ]\^[œÚ[ÛŸ_JNÝ˜\ˆ[Î

NÓØš™XÝ™Yš[™T›Ü\J‹›XZÙS][\ÚYÛ™Y‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ‹›XZÙS][\ÚYÛ™Y_JNÓØš™XÝ™Yš[™T›Ü\J‹›XZÙS][\ÚYÛ™Yž]\È‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ‹›XZÙS][\ÚYÛ™Yž]\ß_JNÝ˜\ˆPÛÊ
NÓØš™XÝ™Yš[™T›Ü\J‹˜Ü™X]TYÚ[˜][Ûˆ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ‹˜Ü™X]TYÚ[˜][ÛŸ_JNÓØš™XÝ™Yš[™T›Ü\J‹˜Ü™X]T›ÝØY”œÐÛY[‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ‹˜Ü™X]T›ÝØY”œÐÛY[_JNÓØš™XÝ™Yš[™T›Ü\J‹™XÛÙPÛÜÛ[ÜÔÙÑXÑœ›ÛT›ÝÈ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ‹™XÛÙPÛÜÛ[ÜÔÙÑXÑœ›ÛT›Ýß_JNÓØš™XÝ™Yš[™T›Ü\J‹”]Y\žPÛY[‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ‹”]Y\žPÛY[_JNÝ˜\ˆ[ÙOTÊ
NÓØš™XÝ™Yš[™T›Ü\J‹š\ÔÙX\˜Ú]Y\žP\œ˜^H‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ[ÙKš\ÔÙX\˜Ú]Y\žP\œ˜^__JNÝ˜\ˆYUŠ
NÓØš™XÝ™Yš[™T›Ü\J‹˜Ü™X]QY˜][[Z[›ÐÛÛ™\\œÈ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ˜Ü™X]QY˜][[Z[›ÐÛÛ™\\œß_JNÓØš™XÝ™Yš[™T›Ü\J‹™Y˜][™YÚ\ÝžU\\È‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ™Y˜][™YÚ\ÝžU\\ß_JNÓØš™XÝ™Yš[™T›Ü\J‹”ÚYÛš[™ÔÝ\™Ø]PÛY[‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ”ÚYÛš[™ÔÝ\™Ø]PÛY[_JNÝ˜\ˆOZŒJ
NÓØš™XÝ™Yš[™T›Ü\J‹˜\ÜÙ\\Ñ[]™\•˜Z[\™H‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆK˜\ÜÙ\\Ñ[]™\•˜Z[\™__JNÓØš™XÝ™Yš[™T›Ü\J‹˜\ÜÙ\\Ñ[]™\•ÝXØÙ\ÜÈ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆK˜\ÜÙ\\Ñ[]™\•ÝXØÙ\Üß_JNÓØš™XÝ™Yš[™T›Ü\J‹œ›ØYØ\Ý\œ›Üˆ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆKœ›ØYØ\Ý\œ›ÜŸ_JNÓØš™XÝ™Yš[™T›Ü\J‹š\Ñ[]™\•˜Z[\™H‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆKš\Ñ[]™\•˜Z[\™__JNÓØš™XÝ™Yš[™T›Ü\J‹š\Ñ[]™\•ÝXØÙ\ÜÈ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆKš\Ñ[]™\•ÝXØÙ\Üß_JNÓØš™XÝ™Yš[™T›Ü\J‹”Ý\™Ø]PÛY[‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆK”Ý\™Ø]PÛY[_JNÓØš™XÝ™Yš[™T›Ü\J‹•[Y[Ý]\œ›Üˆ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆK•[Y[Ý]\œ›ÜŸ_JNÝ˜\ˆQ™

NÓØš™XÝ™Yš[™T›Ü\J‹˜ÛÚ[ˆ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ‹˜ÛÚ[Ÿ_JNÓØš™XÝ™Yš[™T›Ü\J‹˜ÛÚ[œÈ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ‹˜ÛÚ[œß_JNÓØš™XÝ™Yš[™T›Ü\J‹›XZÙPÛÜÛ[ÜÚX”]‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ‹›XZÙPÛÜÛ[ÜÚX”]_JNÓØš™XÝ™Yš[™T›Ü\J‹œ\œÙPÛÚ[œÈ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ‹œ\œÙPÛÚ[œß_J_JNÝ˜\ˆ™ÏRJOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\J‹—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÛ‹“[Ù[[‹XœÛÛ]UÜÚ][Û[‹ÛÛ˜XÝÛÙR\ÝÜžQ[žO[‹ÛÛ˜XÝ[™›Ï[‹ÛÙR[™›Ï[‹”\˜[\Ï[‹XØÙ\ÜÐÛÛ™šYÏ[‹XØÙ\ÜÕ\T\˜[O[‹ÛÛ˜XÝÛÙR\ÝÜžSÜ\˜][Û•\O[‹XØÙ\ÜÕ\O[‹œ›ÝØY”XÚØYÙO]›ÚYÛ‹˜XØÙ\ÜÕ\Qœ›ÛR”ÓÓ\ŽÛ‹˜XØÙ\ÜÕ\UÒ”ÓÓZPŽÛ‹˜ÛÛ˜XÝÛÙR\ÝÜžSÜ\˜][Û•\Qœ›ÛR”ÓÓ\•ŽÛ‹˜ÛÛ˜XÝÛÙR\ÝÜžSÜ\˜][Û•\UÒ”ÓÓZUŽÝ˜\ˆ™ÏR

K\TÙJ
KQYJ
NÛ‹œ›ÝØY”XÚØYÙOH˜ÛÜÛ]Ø\ÛKØ\ÛKŒHŽÝ˜\ˆXNÊ[˜Ý[ÛŠJ^ÙVÙKPÐÑTÔ×ÕTWÕS”ÔPÒQ’QQLOHPÐÑTÔ×ÕTWÕS”ÔPÒQ’QQ‹VÙKPÐÑTÔ×ÕTWÓ“Ð“ÑOLWOHPÐÑTÔ×ÕTWÓ“Ð“ÑH‹VÙKPÐÑTÔ×ÕTWÑU‘T–P“ÑOL×OHPÐÑTÔ×ÕTWÑU‘T–P“ÑH‹VÙKPÐÑTÔ×ÕTWÐS–WÓÑ—ÐQ‘TÔÑTÏMOHPÐÑTÔ×ÕTWÐS–WÓÑ—ÐQ‘TÔÑTÈ‹VÙK•S”‘PÓÑÓ’V‘QKLWOH•S”‘PÓÑÓ’V‘QŸJJX_
‹XØÙ\ÜÕ\OVXO^ßJJNÙ[˜Ý[ÛˆŠJ^ÜÝÚ]Ú
J^ØØ\ÙH˜Ø\ÙHPÐÑTÔ×ÕTWÕS”ÔPÒQ’QQŽœ™]\›ˆXKPÐÑTÔ×ÕTWÕS”ÔPÒQ’QQØØ\ÙHN˜Ø\ÙHPÐÑTÔ×ÕTWÓ“Ð“ÑHŽœ™]\›ˆXKPÐÑTÔ×ÕTWÓ“Ð“ÑNØØ\ÙHÎ˜Ø\ÙHPÐÑTÔ×ÕTWÑU‘T–P“ÑHŽœ™]\›ˆXKPÐÑTÔ×ÕTWÑU‘T–P“ÑNØØ\ÙH˜Ø\ÙHPÐÑTÔ×ÕTWÐS–WÓÑ—ÐQ‘TÔÑTÈŽœ™]\›ˆXKPÐÑTÔ×ÕTWÐS–WÓÑ—ÐQ‘TÔÑTÎÙY˜][œ™]\›ˆXK•S”‘PÓÑÓ’V‘Q_Y[˜Ý[ÛˆPŠJ^ÜÝÚ]Ú
J^ØØ\ÙHXKPÐÑTÔ×ÕTWÕS”ÔPÒQ’QQœ™]\›ˆPÐÑTÔ×ÕTWÕS”ÔPÒQ’QQŽØØ\ÙHXKPÐÑTÔ×ÕTWÓ“Ð“ÑNœ™]\›ˆPÐÑTÔ×ÕTWÓ“Ð“ÑHŽØØ\ÙHXKPÐÑTÔ×ÕTWÑU‘T–P“ÑNœ™]\›ˆPÐÑTÔ×ÕTWÑU‘T–P“ÑHŽØØ\ÙHXKPÐÑTÔ×ÕTWÐS–WÓÑ—ÐQ‘TÔÑTÎœ™]\›ˆPÐÑTÔ×ÕTWÐS–WÓÑ—ÐQ‘TÔÑTÈŽØØ\ÙHXK•S”‘PÓÑÓ’V‘Q™Y˜][œ™]\›ˆ•S”‘PÓÑÓ’V‘QŸ_]˜\ˆ˜NÊ[˜Ý[ÛŠJ^ÙVÙKÓÓ•PÕÐÓÑWÒTÕÔ–WÓÔTUSÓ—ÕTWÕS”ÔPÒQ’QQLOHÓÓ•PÕÐÓÑWÒTÕÔ–WÓÔTUSÓ—ÕTWÕS”ÔPÒQ’QQ‹VÙKÓÓ•PÕÐÓÑWÒTÕÔ–WÓÔTUSÓ—ÕTWÒS’ULWOHÓÓ•PÕÐÓÑWÒTÕÔ–WÓÔTUSÓ—ÕTWÒS’U‹VÙKÓÓ•PÕÐÓÑWÒTÕÔ–WÓÔTUSÓ—ÕTWÓRQÔUOL—OHÓÓ•PÕÐÓÑWÒTÕÔ–WÓÔTUSÓ—ÕTWÓRQÔUH‹VÙKÓÓ•PÕÐÓÑWÒTÕÔ–WÓÔTUSÓ—ÕTWÑÑS‘TÒTÏL×OHÓÓ•PÕÐÓÑWÒTÕÔ–WÓÔTUSÓ—ÕTWÑÑS‘TÒTÈ‹VÙK•S”‘PÓÑÓ’V‘QKLWOH•S”‘PÓÑÓ’V‘QŸJJ˜_
‹ÛÛ˜XÝÛÙR\ÝÜžSÜ\˜][Û•\O^˜O^ßJJNÙ[˜Ý[Ûˆ•ŠJ^ÜÝÚ]Ú
J^ØØ\ÙH˜Ø\ÙHÓÓ•PÕÐÓÑWÒTÕÔ–WÓÔTUSÓ—ÕTWÕS”ÔPÒQ’QQŽœ™]\›ˆ˜KÓÓ•PÕÐÓÑWÒTÕÔ–WÓÔTUSÓ—ÕTWÕS”ÔPÒQ’QQØØ\ÙHN˜Ø\ÙHÓÓ•PÕÐÓÑWÒTÕÔ–WÓÔTUSÓ—ÕTWÒS’UŽœ™]\›ˆ˜KÓÓ•PÕÐÓÑWÒTÕÔ–WÓÔTUSÓ—ÕTWÒS’UØØ\ÙHŽ˜Ø\ÙHÓÓ•PÕÐÓÑWÒTÕÔ–WÓÔTUSÓ—ÕTWÓRQÔUHŽœ™]\›ˆ˜KÓÓ•PÕÐÓÑWÒTÕÔ–WÓÔTUSÓ—ÕTWÓRQÔUNØØ\ÙHÎ˜Ø\ÙHÓÓ•PÕÐÓÑWÒTÕÔ–WÓÔTUSÓ—ÕTWÑÑS‘TÒTÈŽœ™]\›ˆ˜KÓÓ•PÕÐÓÑWÒTÕÔ–WÓÔTUSÓ—ÕTWÑÑS‘TÒTÎÙY˜][œ™]\›ˆ˜K•S”‘PÓÑÓ’V‘Q_Y[˜Ý[ÛˆUŠJ^ÜÝÚ]Ú
J^ØØ\ÙH˜KÓÓ•PÕÐÓÑWÒTÕÔ–WÓÔTUSÓ—ÕTWÕS”ÔPÒQ’QQœ™]\›ˆÓÓ•PÕÐÓÑWÒTÕÔ–WÓÔTUSÓ—ÕTWÕS”ÔPÒQ’QQŽØØ\ÙH˜KÓÓ•PÕÐÓÑWÒTÕÔ–WÓÔTUSÓ—ÕTWÒS’Uœ™]\›ˆÓÓ•PÕÐÓÑWÒTÕÔ–WÓÔTUSÓ—ÕTWÒS’UŽØØ\ÙH˜KÓÓ•PÕÐÓÑWÒTÕÔ–WÓÔTUSÓ—ÕTWÓRQÔUNœ™]\›ˆÓÓ•PÕÐÓÑWÒTÕÔ–WÓÔTUSÓ—ÕTWÓRQÔUHŽØØ\ÙH˜KÓÓ•PÕÐÓÑWÒTÕÔ–WÓÔTUSÓ—ÕTWÑÑS‘TÒTÎœ™]\›ˆÓÓ•PÕÐÓÑWÒTÕÔ–WÓÔTUSÓ—ÕTWÑÑS‘TÒTÈŽØØ\ÙH˜K•S”‘PÓÑÓ’V‘Q™Y˜][œ™]\›ˆ•S”‘PÓÑÓ’V‘QŸ_Y[˜Ý[Ûˆ‘

^Ü™]\›žÝ˜[YNŒ_[‹XØÙ\ÜÕ\T\˜[O^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒKXØÙ\ÜÕ\T\˜[H‹[˜ÛÙJKU\‹š[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK˜[YHOOL	‰›‹Z[ÌŠ
Kš[ÌŠK˜[YJKŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ\‹š[˜\žT™XY\ÙN›™]È\‹š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹\‘

NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÛÏŒÏOOLOÜ‹˜[YO]š[ÌŠ
NœÚÚ\\JÉÊ_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]\‘

NÜ™]\›Šš\ÔÙ]
JK˜[YJI‰Š‹˜[YO\ŠK˜[YJJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK˜[YHOO]›ÚY	‰Š‹˜[YOZPŠK˜[YJJKŸKœ›ÛT\X[
J^Û]\‘

NÜ™]\›ˆ‹˜[YOYK˜[YOÏÌŸ_NÙ[˜Ý[ÛˆQ

^Ü™]\›žÜ\›Z\ÜÚ[ÛŽŒY™\ÜÙ\Î–×__[‹XØÙ\ÜÐÛÛ™šYÏ^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒKXØÙ\ÜÐÛÛ™šYÈ‹[˜ÛÙJKU\‹š[˜\žUÜš]\‹˜Ü™X]J
J^ÙKœ\›Z\ÜÚ[ÛˆOOL	‰›‹Z[ÌŠ
Kš[ÌŠKœ\›Z\ÜÚ[ÛŠNÙ›ÜŠ]ÙˆK˜Y™\ÜÙ\Ê[‹Z[ÌŠŠKœÝš[™Ê
NÜ™]\›ˆŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ\‹š[˜\žT™XY\ÙN›™]È\‹š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹ZQ

NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹œ\›Z\ÜÚ[Û]š[ÌŠ
NØœ™XZÎØØ\ÙHÎœ‹˜Y™\ÜÙ\Ëœ\Ú
œÝš[™Ê
JNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]ZQ

NÜ™]\›Šš\ÔÙ]
JKœ\›Z\ÜÚ[ÛŠI‰Š‹œ\›Z\ÜÚ[Û\ŠKœ\›Z\ÜÚ[ÛŠJK\œ˜^Kš\Ð\œ˜^JOË˜Y™\ÜÙ\ÊI‰Š‹˜Y™\ÜÙ\ÏYK˜Y™\ÜÙ\Ë›X\
O”Ýš[™Ê
JJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆKœ\›Z\ÜÚ[ÛˆOO]›ÚY	‰Š‹œ\›Z\ÜÚ[ÛZPŠKœ\›Z\ÜÚ[ÛŠJKK˜Y™\ÜÙ\ÏÛ‹˜Y™\ÜÙ\ÏYK˜Y™\ÜÙ\Ë›X\
O
N›‹˜Y™\ÜÙ\ÏV×KŸKœ›ÛT\X[
J^Û]ZQ

NÜ™]\›ˆ‹œ\›Z\ÜÚ[ÛYKœ\›Z\ÜÚ[ÛÏÌ‹˜Y™\ÜÙ\ÏYK˜Y™\ÜÙ\ÏË›X\
O
_×KŸ_NÙ[˜Ý[ÛˆÑ

^Ü™]\›žØÛÙU\ØYXØÙ\ÜÎ›‹XØÙ\ÜÐÛÛ™šYË™œ›ÛT\X[
ßJK[œÝ[X]QY˜][\›Z\ÜÚ[ÛŽŒ_[‹”\˜[\Ï^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK”\˜[\È‹[˜ÛÙJKU\‹š[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK˜ÛÙU\ØYXØÙ\ÜÈOO]›ÚY	‰›‹XØÙ\ÜÐÛÛ™šYË™[˜ÛÙJK˜ÛÙU\ØYXØÙ\ÜË‹Z[ÌŠL
K™›ÜšÊ
JK›[[J
KKš[œÝ[X]QY˜][\›Z\ÜÚ[ÛˆOOL	‰›‹Z[ÌŠMŠKš[ÌŠKš[œÝ[X]QY˜][\›Z\ÜÚ[ÛŠKŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ\‹š[˜\žT™XY\ÙN›™]È\‹š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹[Ñ

NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹˜ÛÙU\ØYXØÙ\ÜÏ[‹XØÙ\ÜÐÛÛ™šYË™XÛÙJZ[ÌŠ
JNØœ™XZÎØØ\ÙHŽœ‹š[œÝ[X]QY˜][\›Z\ÜÚ[Û]š[ÌŠ
NØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û][Ñ

NÜ™]\›Šš\ÔÙ]
JK˜ÛÙU\ØYXØÙ\ÜÊI‰Š‹˜ÛÙU\ØYXØÙ\ÜÏ[‹XØÙ\ÜÐÛÛ™šYË™œ›ÛR”ÓÓŠK˜ÛÙU\ØYXØÙ\ÜÊJK
š\ÔÙ]
JKš[œÝ[X]QY˜][\›Z\ÜÚ[ÛŠI‰Š‹š[œÝ[X]QY˜][\›Z\ÜÚ[Û\ŠKš[œÝ[X]QY˜][\›Z\ÜÚ[ÛŠJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK˜ÛÙU\ØYXØÙ\ÜÈOO]›ÚY	‰Š‹˜ÛÙU\ØYXØÙ\ÜÏYK˜ÛÙU\ØYXØÙ\ÜÏÛ‹XØÙ\ÜÐÛÛ™šYËÒ”ÓÓŠK˜ÛÙU\ØYXØÙ\ÜÊN›ÚY
KKš[œÝ[X]QY˜][\›Z\ÜÚ[ÛˆOO]›ÚY	‰Š‹š[œÝ[X]QY˜][\›Z\ÜÚ[ÛZPŠKš[œÝ[X]QY˜][\›Z\ÜÚ[ÛŠJKŸKœ›ÛT\X[
J^Û][Ñ

NÜ™]\›ˆK˜ÛÙU\ØYXØÙ\ÜÈOO]›ÚY	‰™K˜ÛÙU\ØYXØÙ\ÜÈOO[[	‰Š‹˜ÛÙU\ØYXØÙ\ÜÏ[‹XØÙ\ÜÐÛÛ™šYË™œ›ÛT\X[
K˜ÛÙU\ØYXØÙ\ÜÊJK‹š[œÝ[X]QY˜][\›Z\ÜÚ[ÛYKš[œÝ[X]QY˜][\›Z\ÜÚ[ÛÏÌŸ_NÙ[˜Ý[ÛˆQ

^Ü™]\›žØÛÙR\Ú›™]ÈZ[\œ˜^KÜ™X]ÜŽˆˆ‹[œÝ[X]PÛÛ™šYÎ›‹XØÙ\ÜÐÛÛ™šYË™œ›ÛT\X[
ßJ__[‹ÛÙR[™›Ï^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒKÛÙR[™›È‹[˜ÛÙJKU\‹š[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK˜ÛÙR\Ú›[™ÝOOL	‰›‹Z[ÌŠL
K˜ž]\ÊK˜ÛÙR\Ú
KK˜Ü™X]ÜˆOOHˆ‰‰›‹Z[ÌŠN
KœÝš[™ÊK˜Ü™X]ÜŠKKš[œÝ[X]PÛÛ™šYÈOO]›ÚY	‰›‹XØÙ\ÜÐÛÛ™šYË™[˜ÛÙJKš[œÝ[X]PÛÛ™šYË‹Z[ÌŠŠK™›ÜšÊ
JK›[[J
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ\‹š[˜\žT™XY\ÙN›™]È\‹š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹XQ

NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹˜ÛÙR\Ú]˜ž]\Ê
NØœ™XZÎØØ\ÙHŽœ‹˜Ü™X]Ü]œÝš[™Ê
NØœ™XZÎØØ\ÙHNœ‹š[œÝ[X]PÛÛ™šYÏ[‹XØÙ\ÜÐÛÛ™šYË™XÛÙJZ[ÌŠ
JNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]XQ

NÜ™]\›Šš\ÔÙ]
JK˜ÛÙR\Ú
I‰Š‹˜ÛÙR\ÚJ˜ž]\Ñœ›ÛP˜\ÙM
JK˜ÛÙR\Ú
JK
š\ÔÙ]
JK˜Ü™X]ÜŠI‰Š‹˜Ü™X]ÜTÝš[™ÊK˜Ü™X]ÜŠJK
š\ÔÙ]
JKš[œÝ[X]PÛÛ™šYÊI‰Š‹š[œÝ[X]PÛÛ™šYÏ[‹XØÙ\ÜÐÛÛ™šYË™œ›ÛR”ÓÓŠKš[œÝ[X]PÛÛ™šYÊJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK˜ÛÙR\ÚOO]›ÚY	‰Š‹˜ÛÙR\ÚJ˜˜\ÙMœ›ÛPž]\ÊJK˜ÛÙR\ÚOO]›ÚYÙK˜ÛÙR\Ú›™]ÈZ[\œ˜^JJKK˜Ü™X]ÜˆOO]›ÚY	‰Š‹˜Ü™X]ÜYK˜Ü™X]ÜŠKKš[œÝ[X]PÛÛ™šYÈOO]›ÚY	‰Š‹š[œÝ[X]PÛÛ™šYÏYKš[œÝ[X]PÛÛ™šYÏÛ‹XØÙ\ÜÐÛÛ™šYËÒ”ÓÓŠKš[œÝ[X]PÛÛ™šYÊN›ÚY
KŸKœ›ÛT\X[
J^Û]XQ

NÜ™]\›ˆ‹˜ÛÙR\ÚYK˜ÛÙR\ÚÏÛ™]ÈZ[\œ˜^K‹˜Ü™X]ÜYK˜Ü™X]ÜÏÈˆ‹Kš[œÝ[X]PÛÛ™šYÈOO]›ÚY	‰™Kš[œÝ[X]PÛÛ™šYÈOO[[	‰Š‹š[œÝ[X]PÛÛ™šYÏ[‹XØÙ\ÜÐÛÛ™šYË™œ›ÛT\X[
Kš[œÝ[X]PÛÛ™šYÊJKŸ_NÙ[˜Ý[ÛˆÑ

^Ü™]\›žØÛÙRYšYÒ[

KÜ™X]ÜŽˆˆ‹YZ[Žˆˆ‹X™[ˆˆ‹Ü™X]Y›ÚYX˜ÔÜYˆˆ‹^[œÚ[ÛŽ›ÚYX˜Ì”ÜYˆˆŸ_[‹ÛÛ˜XÝ[™›Ï^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒKÛÛ˜XÝ[™›È‹[˜ÛÙJKU\‹š[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK˜ÛÙRYOOPšYÒ[

I‰›‹Z[ÌŠ
KZ[
K˜ÛÙRY
KK˜Ü™X]ÜˆOOHˆ‰‰›‹Z[ÌŠN
KœÝš[™ÊK˜Ü™X]ÜŠKK˜YZ[ˆOOHˆ‰‰›‹Z[ÌŠŠKœÝš[™ÊK˜YZ[ŠKK›X™[OOHˆ‰‰›‹Z[ÌŠÍ
KœÝš[™ÊK›X™[
KK˜Ü™X]YOO]›ÚY	‰›‹XœÛÛ]UÜÚ][Û‹™[˜ÛÙJK˜Ü™X]Y‹Z[ÌŠŠK™›ÜšÊ
JK›[[J
KKšX˜ÔÜYOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊKšX˜ÔÜY
KK™^[œÚ[ÛˆOO]›ÚY	‰ž™Ë[žK™[˜ÛÙJK™^[œÚ[Û‹‹Z[ÌŠN
K™›ÜšÊ
JK›[[J
KKšX˜Ì”ÜYOOHˆ‰‰›‹Z[ÌŠŠKœÝš[™ÊKšX˜Ì”ÜY
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ\‹š[˜\žT™XY\ÙN›™]È\‹š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹\Ñ

NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹˜ÛÙRY]Z[

NØœ™XZÎØØ\ÙHŽœ‹˜Ü™X]Ü]œÝš[™Ê
NØœ™XZÎØØ\ÙHÎœ‹˜YZ[]œÝš[™Ê
NØœ™XZÎØØ\ÙHœ‹›X™[]œÝš[™Ê
NØœ™XZÎØØ\ÙHNœ‹˜Ü™X]Y[‹XœÛÛ]UÜÚ][Û‹™XÛÙJZ[ÌŠ
JNØœ™XZÎØØ\ÙHŽœ‹šX˜ÔÜY]œÝš[™Ê
NØœ™XZÎØØ\ÙHÎœ‹™^[œÚ[Û^™Ë[žK™XÛÙJZ[ÌŠ
JNØœ™XZÎØØ\ÙHœ‹šX˜Ì”ÜY]œÝš[™Ê
NØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]\Ñ

NÜ™]\›Šš\ÔÙ]
JK˜ÛÙRY
I‰Š‹˜ÛÙRYPšYÒ[
K˜ÛÙRYÔÝš[™Ê
JJK
š\ÔÙ]
JK˜Ü™X]ÜŠI‰Š‹˜Ü™X]ÜTÝš[™ÊK˜Ü™X]ÜŠJK
š\ÔÙ]
JK˜YZ[ŠI‰Š‹˜YZ[TÝš[™ÊK˜YZ[ŠJK
š\ÔÙ]
JK›X™[
I‰Š‹›X™[TÝš[™ÊK›X™[
JK
š\ÔÙ]
JK˜Ü™X]Y
I‰Š‹˜Ü™X]Y[‹XœÛÛ]UÜÚ][Û‹™œ›ÛR”ÓÓŠK˜Ü™X]Y
JK
š\ÔÙ]
JKšX˜ÔÜY
I‰Š‹šX˜ÔÜYTÝš[™ÊKšX˜ÔÜY
JK
š\ÔÙ]
JK™^[œÚ[ÛŠI‰Š‹™^[œÚ[Û^™Ë[žK™œ›ÛR”ÓÓŠK™^[œÚ[ÛŠJK
š\ÔÙ]
JKšX˜Ì”ÜY
I‰Š‹šX˜Ì”ÜYTÝš[™ÊKšX˜Ì”ÜY
JKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK˜ÛÙRYOO]›ÚY	‰Š‹˜ÛÙRYJK˜ÛÙRYšYÒ[

JKÔÝš[™Ê
JKK˜Ü™X]ÜˆOO]›ÚY	‰Š‹˜Ü™X]ÜYK˜Ü™X]ÜŠKK˜YZ[ˆOO]›ÚY	‰Š‹˜YZ[YK˜YZ[ŠKK›X™[OO]›ÚY	‰Š‹›X™[YK›X™[
KK˜Ü™X]YOO]›ÚY	‰Š‹˜Ü™X]YYK˜Ü™X]YÛ‹XœÛÛ]UÜÚ][Û‹Ò”ÓÓŠK˜Ü™X]Y
N›ÚY
KKšX˜ÔÜYOO]›ÚY	‰Š‹šX˜ÔÜYYKšX˜ÔÜY
KK™^[œÚ[ÛˆOO]›ÚY	‰Š‹™^[œÚ[ÛYK™^[œÚ[ÛÞ™Ë[žKÒ”ÓÓŠK™^[œÚ[ÛŠN›ÚY
KKšX˜Ì”ÜYOO]›ÚY	‰Š‹šX˜Ì”ÜYYKšX˜Ì”ÜY
KŸKœ›ÛT\X[
J^Û]\Ñ

NÜ™]\›ˆK˜ÛÙRYOO]›ÚY	‰™K˜ÛÙRYOO[[	‰Š‹˜ÛÙRYPšYÒ[
K˜ÛÙRYÔÝš[™Ê
JJK‹˜Ü™X]ÜYK˜Ü™X]ÜÏÈˆ‹‹˜YZ[YK˜YZ[ÏÈˆ‹‹›X™[YK›X™[ÏÈˆ‹K˜Ü™X]YOO]›ÚY	‰™K˜Ü™X]YOO[[	‰Š‹˜Ü™X]Y[‹XœÛÛ]UÜÚ][Û‹™œ›ÛT\X[
K˜Ü™X]Y
JK‹šX˜ÔÜYYKšX˜ÔÜYÏÈˆ‹K™^[œÚ[ÛˆOO]›ÚY	‰™K™^[œÚ[ÛˆOO[[	‰Š‹™^[œÚ[Û^™Ë[žK™œ›ÛT\X[
K™^[œÚ[ÛŠJK‹šX˜Ì”ÜYYKšX˜Ì”ÜYÏÈˆ‹Ÿ_NÙ[˜Ý[Ûˆ

^Ü™]\›žÛÜ\˜][ÛŽŒÛÙRYšYÒ[

K\]Y›ÚY\ÙÎ›™]ÈZ[\œ˜^__[‹ÛÛ˜XÝÛÙR\ÝÜžQ[žO^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒKÛÛ˜XÝÛÙR\ÝÜžQ[žH‹[˜ÛÙJKU\‹š[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK›Ü\˜][ÛˆOOL	‰›‹Z[ÌŠ
Kš[ÌŠK›Ü\˜][ÛŠKK˜ÛÙRYOOPšYÒ[

I‰›‹Z[ÌŠMŠKZ[
K˜ÛÙRY
KK\]YOO]›ÚY	‰›‹XœÛÛ]UÜÚ][Û‹™[˜ÛÙJK\]Y‹Z[ÌŠŠK™›ÜšÊ
JK›[[J
KK›\ÙË›[™ÝOOL	‰›‹Z[ÌŠÍ
K˜ž]\ÊK›\ÙÊKŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ\‹š[˜\žT™XY\ÙN›™]È\‹š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹Y

NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹›Ü\˜][Û]š[ÌŠ
NØœ™XZÎØØ\ÙHŽœ‹˜ÛÙRY]Z[

NØœ™XZÎØØ\ÙHÎœ‹\]Y[‹XœÛÛ]UÜÚ][Û‹™XÛÙJZ[ÌŠ
JNØœ™XZÎØØ\ÙHœ‹›\ÙÏ]˜ž]\Ê
NØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]Y

NÜ™]\›Šš\ÔÙ]
JK›Ü\˜][ÛŠI‰Š‹›Ü\˜][Û\•ŠK›Ü\˜][ÛŠJK
š\ÔÙ]
JK˜ÛÙRY
I‰Š‹˜ÛÙRYPšYÒ[
K˜ÛÙRYÔÝš[™Ê
JJK
š\ÔÙ]
JK\]Y
I‰Š‹\]Y[‹XœÛÛ]UÜÚ][Û‹™œ›ÛR”ÓÓŠK\]Y
JK
š\ÔÙ]
JK›\ÙÊI‰Š‹›\ÙÏJ˜ž]\Ñœ›ÛP˜\ÙM
JK›\ÙÊJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK›Ü\˜][ÛˆOO]›ÚY	‰Š‹›Ü\˜][ÛZUŠK›Ü\˜][ÛŠJKK˜ÛÙRYOO]›ÚY	‰Š‹˜ÛÙRYJK˜ÛÙRYšYÒ[

JKÔÝš[™Ê
JKK\]YOO]›ÚY	‰Š‹\]YYK\]YÛ‹XœÛÛ]UÜÚ][Û‹Ò”ÓÓŠK\]Y
N›ÚY
KK›\ÙÈOO]›ÚY	‰Š‹›\ÙÏJ˜˜\ÙMœ›ÛPž]\ÊJK›\ÙÈOO]›ÚYÙK›\ÙÎ›™]ÈZ[\œ˜^JJKŸKœ›ÛT\X[
J^Û]Y

NÜ™]\›ˆ‹›Ü\˜][ÛYK›Ü\˜][ÛÏÌK˜ÛÙRYOO]›ÚY	‰™K˜ÛÙRYOO[[	‰Š‹˜ÛÙRYPšYÒ[
K˜ÛÙRYÔÝš[™Ê
JJKK\]YOO]›ÚY	‰™K\]YOO[[	‰Š‹\]Y[‹XœÛÛ]UÜÚ][Û‹™œ›ÛT\X[
K\]Y
JK‹›\ÙÏYK›\ÙÏÏÛ™]ÈZ[\œ˜^KŸ_NÙ[˜Ý[ÛˆÑ

^Ü™]\›žØ›ØÚÒZYÚšYÒ[

K[™^šYÒ[

__[‹XœÛÛ]UÜÚ][Û^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒKXœÛÛ]UÜÚ][Ûˆ‹[˜ÛÙJKU\‹š[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK˜›ØÚÒZYÚOOPšYÒ[

I‰›‹Z[ÌŠ
KZ[
K˜›ØÚÒZYÚ
KK[™^OOPšYÒ[

I‰›‹Z[ÌŠMŠKZ[
K[™^
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ\‹š[˜\žT™XY\ÙN›™]È\‹š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹XÑ

NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹˜›ØÚÒZYÚ]Z[

NØœ™XZÎØØ\ÙHŽœ‹[™^]Z[

NØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]XÑ

NÜ™]\›Šš\ÔÙ]
JK˜›ØÚÒZYÚ
I‰Š‹˜›ØÚÒZYÚPšYÒ[
K˜›ØÚÒZYÚÔÝš[™Ê
JJK
š\ÔÙ]
JK[™^
I‰Š‹[™^PšYÒ[
K[™^ÔÝš[™Ê
JJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK˜›ØÚÒZYÚOO]›ÚY	‰Š‹˜›ØÚÒZYÚJK˜›ØÚÒZYÚšYÒ[

JKÔÝš[™Ê
JKK[™^OO]›ÚY	‰Š‹[™^JK[™^šYÒ[

JKÔÝš[™Ê
JKŸKœ›ÛT\X[
J^Û]XÑ

NÜ™]\›ˆK˜›ØÚÒZYÚOO]›ÚY	‰™K˜›ØÚÒZYÚOO[[	‰Š‹˜›ØÚÒZYÚPšYÒ[
K˜›ØÚÒZYÚÔÝš[™Ê
JJKK[™^OO]›ÚY	‰™K[™^OO[[	‰Š‹[™^PšYÒ[
K[™^ÔÝš[™Ê
JJKŸ_NÙ[˜Ý[ÛˆQ

^Ü™]\›žÚÙ^N›™]ÈZ[\œ˜^K˜[YN›™]ÈZ[\œ˜^__[‹“[Ù[^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK“[Ù[‹[˜ÛÙJKU\‹š[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆKšÙ^K›[™ÝOOL	‰›‹Z[ÌŠL
K˜ž]\ÊKšÙ^JKK˜[YK›[™ÝOOL	‰›‹Z[ÌŠN
K˜ž]\ÊK˜[YJKŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ\‹š[˜\žT™XY\ÙN›™]È\‹š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹]Q

NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹šÙ^O]˜ž]\Ê
NØœ™XZÎØØ\ÙHŽœ‹˜[YO]˜ž]\Ê
NØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]]Q

NÜ™]\›Šš\ÔÙ]
JKšÙ^JI‰Š‹šÙ^OJ˜ž]\Ñœ›ÛP˜\ÙM
JKšÙ^JJK
š\ÔÙ]
JK˜[YJI‰Š‹˜[YOJ˜ž]\Ñœ›ÛP˜\ÙM
JK˜[YJJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆKšÙ^HOO]›ÚY	‰Š‹šÙ^OJ˜˜\ÙMœ›ÛPž]\ÊJKšÙ^HOO]›ÚYÙKšÙ^N›™]ÈZ[\œ˜^JJKK˜[YHOO]›ÚY	‰Š‹˜[YOJ˜˜\ÙMœ›ÛPž]\ÊJK˜[YHOO]›ÚYÙK˜[YN›™]ÈZ[\œ˜^JJKŸKœ›ÛT\X[
J^Û]]Q

NÜ™]\›ˆ‹šÙ^OYKšÙ^OÏÛ™]ÈZ[\œ˜^K‹˜[YOYK˜[YOÏÛ™]ÈZ[\œ˜^KŸ__JNÝ˜\ˆÕRJÏOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\JË—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÖË˜XØÙ\ÜÕ\Qœ›ÛTÝš[™Ï[ÕŽÖË˜XØÙ\ÜÕ\UÔÝš[™ÏXUŽÖË˜Ü™X]UØ\ÛP[Z[›ÐÛÛ™\\œÏ[ÛÙNÝ˜\ˆQXØJ
K˜OZÛŠ
KÜÏV™Ê
NÙ[˜Ý[ÛˆÕŠJ^ÜÝÚ]Ú
J^ØØ\ÙH•[œÜXÚYšYYŽœ™]\›ˆÜËXØÙ\ÜÕ\KPÐÑTÔ×ÕTWÕS”ÔPÒQ’QQØØ\ÙH“›Ø›ÙHŽœ™]\›ˆÜËXØÙ\ÜÕ\KPÐÑTÔ×ÕTWÓ“Ð“ÑNØØ\ÙH‘]™\žX›ÙHŽœ™]\›ˆÜËXØÙ\ÜÕ\KPÐÑTÔ×ÕTWÑU‘T–P“ÑNØØ\ÙH[žSÙY™\ÜÙ\ÈŽœ™]\›ˆÜËXØÙ\ÜÕ\KPÐÑTÔ×ÕTWÐS–WÓÑ—ÐQ‘TÔÑTÎÙY˜][œ™]\›ˆÜËXØÙ\ÜÕ\K•S”‘PÓÑÓ’V‘Q_Y[˜Ý[ÛˆUŠJ^ÜÝÚ]Ú
J^ØØ\ÙHÜËXØÙ\ÜÕ\KPÐÑTÔ×ÕTWÕS”ÔPÒQ’QQœ™]\›ˆ•[œÜXÚYšYYŽØØ\ÙHÜËXØÙ\ÜÕ\KPÐÑTÔ×ÕTWÓ“Ð“ÑNœ™]\›ˆ“›Ø›ÙHŽØØ\ÙHÜËXØÙ\ÜÕ\KPÐÑTÔ×ÕTWÑU‘T–P“ÑNœ™]\›ˆ‘]™\žX›ÙHŽØØ\ÙHÜËXØÙ\ÜÕ\KPÐÑTÔ×ÕTWÐS–WÓÑ—ÐQ‘TÔÑTÎœ™]\›ˆ[žSÙY™\ÜÙ\ÈŽØØ\ÙHÜËXØÙ\ÜÕ\K•S”‘PÓÑÓ’V‘Q™Y˜][œ™]\›ˆ•S”‘PÓÑÓ’V‘QŸ_Y[˜Ý[ÛˆÛÙJ
^Ü™]\›žÈ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÔÝÜ™PÛÙHŽžØ[Z[›Õ\NˆØ\ÛKÓ\ÙÔÝÜ™PÛÙH‹Ð[Z[›ÎŠÜÙ[™\Ž™KØ\ÛPž]PÛÙN›‹[œÝ[X]T\›Z\ÜÚ[ÛŽJOOŠÜÙ[™\Ž™KØ\ÛWØž]WØÛÙNŠ˜KÐ˜\ÙM
JŠK[œÝ[X]WÜ\›Z\ÜÚ[ÛŽÞÜ\›Z\ÜÚ[ÛŽ˜UŠœ\›Z\ÜÚ[ÛŠKY™\ÜÙ\Î˜Y™\ÜÙ\Ë›[™ÝOOLÝ˜Y™\ÜÙ\Î›ÚYN›ÚYJKœ›ÛP[Z[›ÎŠÜÙ[™\Ž™KØ\ÛWØž]WØÛÙN›‹[œÝ[X]WÜ\›Z\ÜÚ[ÛŽJOOŠÜÙ[™\Ž™KØ\ÛPž]PÛÙNŠ˜K™œ›ÛP˜\ÙM
JŠK[œÝ[X]T\›Z\ÜÚ[ÛŽÚÜËXØÙ\ÜÐÛÛ™šYË™œ›ÛT\X[
Ü\›Z\ÜÚ[ÛŽ›ÕŠœ\›Z\ÜÚ[ÛŠKY™\ÜÙ\Î˜Y™\ÜÙ\ÏÏÖ×_JN›ÚYJ_K‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÒ[œÝ[X]PÛÛ˜XÝŽžØ[Z[›Õ\NˆØ\ÛKÓ\ÙÒ[œÝ[X]PÛÛ˜XÝ‹Ð[Z[›ÎŠÜÙ[™\Ž™KÛÙRY›‹X™[\ÙÎšK[™Îœ‹YZ[Ž›ßJOOŠÜÙ[™\Ž™KÛÙWÚY›‹ÔÝš[™Ê
KX™[\ÙÎ’”ÓÓ‹œ\œÙJ
˜K™œ›ÛU]Ž
JJJK[™Îœ‹YZ[ŽŠQ›ÛZ]Y˜][
JÊ_JKœ›ÛP[Z[›ÎŠÜÙ[™\Ž™KÛÙWÚY›‹X™[\ÙÎšK[™Îœ‹YZ[Ž›ßJOOŠÜÙ[™\Ž™KÛÙRYšYÒ[
ŠKX™[\ÙÎŠ˜KÕ]Ž
J”ÓÓ‹œÝš[™ÚYžJJJK[™Î–Ë‹‹œ—KYZ[Ž›ÏÏÈˆŸJ_K‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÒ[œÝ[X]PÛÛ˜XÝˆŽžØ[Z[›Õ\NˆØ\ÛKÓ\ÙÒ[œÝ[X]PÛÛ˜XÝˆ‹Ð[Z[›ÎŠÜÙ[™\Ž™KÛÙRY›‹X™[\ÙÎšK[™Îœ‹YZ[Ž›ËØ[˜Kš^\ÙÎœßJOOŠÜÙ[™\Ž™KÛÙWÚY›‹ÔÝš[™Ê
KX™[\ÙÎ’”ÓÓ‹œ\œÙJ
˜K™œ›ÛU]Ž
JJJK[™Îœ‹YZ[ŽŠQ›ÛZ]Y˜][
JÊKØ[Š˜KÐ˜\ÙM
JJKš^Û\ÙÎŠQ›ÛZ]Y˜][
JÊ_JKœ›ÛP[Z[›ÎŠÜÙ[™\Ž™KÛÙWÚY›‹X™[\ÙÎšK[™Îœ‹YZ[Ž›ËØ[˜Kš^Û\ÙÎœßJOOŠÜÙ[™\Ž™KÛÙRYšYÒ[
ŠKX™[\ÙÎŠ˜KÕ]Ž
J”ÓÓ‹œÝš[™ÚYžJJJK[™Î–Ë‹‹œ—KYZ[Ž›ÏÏÈˆ‹Ø[Š˜K™œ›ÛP˜\ÙM
JJKš^\ÙÎœÏÏÈL_J_K‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÕ\]PYZ[ˆŽžØ[Z[›Õ\NˆØ\ÛKÓ\ÙÕ\]PYZ[ˆ‹Ð[Z[›ÎŠÜÙ[™\Ž™K™]ÐYZ[Ž›‹ÛÛ˜XÝJOOŠÜÙ[™\Ž™K™]×ØYZ[Ž›‹ÛÛ˜XÝJKœ›ÛP[Z[›ÎŠÜÙ[™\Ž™K™]×ØYZ[Ž›‹ÛÛ˜XÝJOOŠÜÙ[™\Ž™K™]ÐYZ[Ž›‹ÛÛ˜XÝJ_K‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÐÛX\YZ[ˆŽžØ[Z[›Õ\NˆØ\ÛKÓ\ÙÐÛX\YZ[ˆ‹Ð[Z[›ÎŠÜÙ[™\Ž™KÛÛ˜XÝ›ŸJOOŠÜÙ[™\Ž™KÛÛ˜XÝ›ŸJKœ›ÛP[Z[›ÎŠÜÙ[™\Ž™KÛÛ˜XÝ›ŸJOOŠÜÙ[™\Ž™KÛÛ˜XÝ›ŸJ_K‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÑ^XÝ]PÛÛ˜XÝŽžØ[Z[›Õ\NˆØ\ÛKÓ\ÙÑ^XÝ]PÛÛ˜XÝ‹Ð[Z[›ÎŠÜÙ[™\Ž™KÛÛ˜XÝ›‹\ÙÎ[™Îš_JOOŠÜÙ[™\Ž™KÛÛ˜XÝ›‹\ÙÎ’”ÓÓ‹œ\œÙJ
˜K™œ›ÛU]Ž
J
JK[™Îš_JKœ›ÛP[Z[›ÎŠÜÙ[™\Ž™KÛÛ˜XÝ›‹\ÙÎ[™Îš_JOOŠÜÙ[™\Ž™KÛÛ˜XÝ›‹\ÙÎŠ˜KÕ]Ž
J”ÓÓ‹œÝš[™ÚYžJ
JK[™Î–Ë‹‹šW_J_K‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÓZYÜ˜]PÛÛ˜XÝŽžØ[Z[›Õ\NˆØ\ÛKÓ\ÙÓZYÜ˜]PÛÛ˜XÝ‹Ð[Z[›ÎŠÜÙ[™\Ž™KÛÛ˜XÝ›‹ÛÙRY\ÙÎš_JOOŠÜÙ[™\Ž™KÛÛ˜XÝ›‹ÛÙWÚYÔÝš[™Ê
K\ÙÎ’”ÓÓ‹œ\œÙJ
˜K™œ›ÛU]Ž
JJJ_JKœ›ÛP[Z[›ÎŠÜÙ[™\Ž™KÛÛ˜XÝ›‹ÛÙWÚY\ÙÎš_JOOŠÜÙ[™\Ž™KÛÛ˜XÝ›‹ÛÙRYšYÒ[

K\ÙÎŠ˜KÕ]Ž
J”ÓÓ‹œÝš[™ÚYžJJJ_J____JNÝ˜\ˆRJÏOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\JË—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÕË“\ÙÐÛY[[\UË“\ÙÕ\]PÛÛ˜XÝX™[™\ÜÛœÙOUË“\ÙÕ\]PÛÛ˜XÝX™[UË“\ÙÔÝÜ™P[™ZYÜ˜]PÛÛ˜XÝ™\ÜÛœÙOUË“\ÙÔÝÜ™P[™ZYÜ˜]PÛÛ˜XÝUË“\ÙÔ™[[Ý™PÛÙU\ØY\˜[\ÐY™\ÜÙ\Ô™\ÜÛœÙOUË“\ÙÔ™[[Ý™PÛÙU\ØY\˜[\ÐY™\ÜÙ\ÏUË“\ÙÐYÛÙU\ØY\˜[\ÐY™\ÜÙ\Ô™\ÜÛœÙOUË“\ÙÐYÛÙU\ØY\˜[\ÐY™\ÜÙ\ÏUË“\ÙÔÝÜ™P[™[œÝ[X]PÛÛ˜XÝ™\ÜÛœÙOUË“\ÙÔÝÜ™P[™[œÝ[X]PÛÛ˜XÝUË“\ÙÕ[œ[ÛÙ\Ô™\ÜÛœÙOUË“\ÙÕ[œ[ÛÙ\ÏUË“\ÙÔ[ÛÙ\Ô™\ÜÛœÙOUË“\ÙÔ[ÛÙ\ÏUË“\ÙÔÝYÐÛÛ˜XÝ™\ÜÛœÙOUË“\ÙÔÝYÐÛÛ˜XÝUË“\ÙÕ\]T\˜[\Ô™\ÜÛœÙOUË“\ÙÕ\]T\˜[\ÏUË“\ÙÕ\]R[œÝ[X]PÛÛ™šYÔ™\ÜÛœÙOUË“\ÙÕ\]R[œÝ[X]PÛÛ™šYÏUË“\ÙÐÛX\YZ[”™\ÜÛœÙOUË“\ÙÐÛX\YZ[UË“\ÙÕ\]PYZ[”™\ÜÛœÙOUË“\ÙÕ\]PYZ[UË“\ÙÓZYÜ˜]PÛÛ˜XÝ™\ÜÛœÙOUË“\ÙÓZYÜ˜]PÛÛ˜XÝUË“\ÙÑ^XÝ]PÛÛ˜XÝ™\ÜÛœÙOUË“\ÙÑ^XÝ]PÛÛ˜XÝUË“\ÙÒ[œÝ[X]PÛÛ˜XÝ”™\ÜÛœÙOUË“\ÙÒ[œÝ[X]PÛÛ˜XÝUË“\ÙÒ[œÝ[X]PÛÛ˜XÝ™\ÜÛœÙOUË“\ÙÒ[œÝ[X]PÛÛ˜XÝUË“\ÙÔÝÜ™PÛÙT™\ÜÛœÙOUË“\ÙÔÝÜ™PÛÙOUËœ›ÝØY”XÚØYÙO]›ÚYÝ˜\ˆ\V™Ê
KÚORŠ
KTÙJ
KQYJ
NÕËœ›ÝØY”XÚØYÙOH˜ÛÜÛ]Ø\ÛKØ\ÛKŒHŽÙ[˜Ý[Ûˆ‘

^Ü™]\›žÜÙ[™\Žˆˆ‹Ø\ÛPž]PÛÙN›™]ÈZ[\œ˜^K[œÝ[X]T\›Z\ÜÚ[ÛŽ›ÚY_UË“\ÙÔÝÜ™PÛÙO^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÔÝÜ™PÛÙH‹[˜ÛÙJKQ‹š[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆKœÙ[™\ˆOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊKœÙ[™\ŠKKØ\ÛPž]PÛÙK›[™ÝOOL	‰›‹Z[ÌŠN
K˜ž]\ÊKØ\ÛPž]PÛÙJKKš[œÝ[X]T\›Z\ÜÚ[ÛˆOO]›ÚY	‰š\‹XØÙ\ÜÐÛÛ™šYË™[˜ÛÙJKš[œÝ[X]T\›Z\ÜÚ[Û‹‹Z[ÌŠŠK™›ÜšÊ
JK›[[J
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ‹š[˜\žT™XY\ÙN›™]È‹š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹Y‘

NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹œÙ[™\]œÝš[™Ê
NØœ™XZÎØØ\ÙHŽœ‹Ø\ÛPž]PÛÙO]˜ž]\Ê
NØœ™XZÎØØ\ÙHNœ‹š[œÝ[X]T\›Z\ÜÚ[ÛZ\‹XØÙ\ÜÐÛÛ™šYË™XÛÙJZ[ÌŠ
JNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]Y‘

NÜ™]\›Šš\ÔÙ]
JKœÙ[™\ŠI‰Š‹œÙ[™\TÝš[™ÊKœÙ[™\ŠJK
š\ÔÙ]
JKØ\ÛPž]PÛÙJI‰Š‹Ø\ÛPž]PÛÙOJ˜ž]\Ñœ›ÛP˜\ÙM
JKØ\ÛPž]PÛÙJJK
š\ÔÙ]
JKš[œÝ[X]T\›Z\ÜÚ[ÛŠI‰Š‹š[œÝ[X]T\›Z\ÜÚ[ÛZ\‹XØÙ\ÜÐÛÛ™šYË™œ›ÛR”ÓÓŠKš[œÝ[X]T\›Z\ÜÚ[ÛŠJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆKœÙ[™\ˆOO]›ÚY	‰Š‹œÙ[™\YKœÙ[™\ŠKKØ\ÛPž]PÛÙHOO]›ÚY	‰Š‹Ø\ÛPž]PÛÙOJ˜˜\ÙMœ›ÛPž]\ÊJKØ\ÛPž]PÛÙHOO]›ÚYÙKØ\ÛPž]PÛÙN›™]ÈZ[\œ˜^JJKKš[œÝ[X]T\›Z\ÜÚ[ÛˆOO]›ÚY	‰Š‹š[œÝ[X]T\›Z\ÜÚ[ÛYKš[œÝ[X]T\›Z\ÜÚ[ÛÚ\‹XØÙ\ÜÐÛÛ™šYËÒ”ÓÓŠKš[œÝ[X]T\›Z\ÜÚ[ÛŠN›ÚY
KŸKœ›ÛT\X[
J^Û]Y‘

NÜ™]\›ˆ‹œÙ[™\YKœÙ[™\ÏÈˆ‹‹Ø\ÛPž]PÛÙOYKØ\ÛPž]PÛÙOÏÛ™]ÈZ[\œ˜^KKš[œÝ[X]T\›Z\ÜÚ[ÛˆOO]›ÚY	‰™Kš[œÝ[X]T\›Z\ÜÚ[ÛˆOO[[	‰Š‹š[œÝ[X]T\›Z\ÜÚ[ÛZ\‹XØÙ\ÜÐÛÛ™šYË™œ›ÛT\X[
Kš[œÝ[X]T\›Z\ÜÚ[ÛŠJKŸ_NÙ[˜Ý[Ûˆ

^Ü™]\›žØÛÙRYšYÒ[

KÚXÚÜÝ[N›™]ÈZ[\œ˜^__UË“\ÙÔÝÜ™PÛÙT™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÔÝÜ™PÛÙT™\ÜÛœÙH‹[˜ÛÙJKQ‹š[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK˜ÛÙRYOOPšYÒ[

I‰›‹Z[ÌŠ
KZ[
K˜ÛÙRY
KK˜ÚXÚÜÝ[K›[™ÝOOL	‰›‹Z[ÌŠN
K˜ž]\ÊK˜ÚXÚÜÝ[JKŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ‹š[˜\žT™XY\ÙN›™]È‹š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹[

NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹˜ÛÙRY]Z[

NØœ™XZÎØØ\ÙHŽœ‹˜ÚXÚÜÝ[O]˜ž]\Ê
NØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û][

NÜ™]\›Šš\ÔÙ]
JK˜ÛÙRY
I‰Š‹˜ÛÙRYPšYÒ[
K˜ÛÙRYÔÝš[™Ê
JJK
š\ÔÙ]
JK˜ÚXÚÜÝ[JI‰Š‹˜ÚXÚÜÝ[OJ˜ž]\Ñœ›ÛP˜\ÙM
JK˜ÚXÚÜÝ[JJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK˜ÛÙRYOO]›ÚY	‰Š‹˜ÛÙRYJK˜ÛÙRYšYÒ[

JKÔÝš[™Ê
JKK˜ÚXÚÜÝ[HOO]›ÚY	‰Š‹˜ÚXÚÜÝ[OJ˜˜\ÙMœ›ÛPž]\ÊJK˜ÚXÚÜÝ[HOO]›ÚYÙK˜ÚXÚÜÝ[N›™]ÈZ[\œ˜^JJKŸKœ›ÛT\X[
J^Û][

NÜ™]\›ˆK˜ÛÙRYOO]›ÚY	‰™K˜ÛÙRYOO[[	‰Š‹˜ÛÙRYPšYÒ[
K˜ÛÙRYÔÝš[™Ê
JJK‹˜ÚXÚÜÝ[OYK˜ÚXÚÜÝ[OÏÛ™]ÈZ[\œ˜^KŸ_NÙ[˜Ý[ÛˆÑ

^Ü™]\›žÜÙ[™\Žˆˆ‹YZ[Žˆˆ‹ÛÙRYšYÒ[

KX™[ˆˆ‹\ÙÎ›™]ÈZ[\œ˜^K[™Î–×__UË“\ÙÒ[œÝ[X]PÛÛ˜XÝ^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÒ[œÝ[X]PÛÛ˜XÝ‹[˜ÛÙJKQ‹š[˜\žUÜš]\‹˜Ü™X]J
J^ÙKœÙ[™\ˆOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊKœÙ[™\ŠKK˜YZ[ˆOOHˆ‰‰›‹Z[ÌŠN
KœÝš[™ÊK˜YZ[ŠKK˜ÛÙRYOOPšYÒ[

I‰›‹Z[ÌŠ
KZ[
K˜ÛÙRY
KK›X™[OOHˆ‰‰›‹Z[ÌŠÍ
KœÝš[™ÊK›X™[
KK›\ÙË›[™ÝOOL	‰›‹Z[ÌŠŠK˜ž]\ÊK›\ÙÊNÙ›ÜŠ]ÙˆK™[™ÊZÚKÛÚ[‹™[˜ÛÙJ‹Z[ÌŠL
K™›ÜšÊ
JK›[[J
NÜ™]\›ˆŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ‹š[˜\žT™XY\ÙN›™]È‹š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹YÑ

NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹œÙ[™\]œÝš[™Ê
NØœ™XZÎØØ\ÙHŽœ‹˜YZ[]œÝš[™Ê
NØœ™XZÎØØ\ÙHÎœ‹˜ÛÙRY]Z[

NØœ™XZÎØØ\ÙHœ‹›X™[]œÝš[™Ê
NØœ™XZÎØØ\ÙHNœ‹›\ÙÏ]˜ž]\Ê
NØœ™XZÎØØ\ÙHŽœ‹™[™Ëœ\Ú
ÚKÛÚ[‹™XÛÙJZ[ÌŠ
JJNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]YÑ

NÜ™]\›Šš\ÔÙ]
JKœÙ[™\ŠI‰Š‹œÙ[™\TÝš[™ÊKœÙ[™\ŠJK
š\ÔÙ]
JK˜YZ[ŠI‰Š‹˜YZ[TÝš[™ÊK˜YZ[ŠJK
š\ÔÙ]
JK˜ÛÙRY
I‰Š‹˜ÛÙRYPšYÒ[
K˜ÛÙRYÔÝš[™Ê
JJK
š\ÔÙ]
JK›X™[
I‰Š‹›X™[TÝš[™ÊK›X™[
JK
š\ÔÙ]
JK›\ÙÊI‰Š‹›\ÙÏJ˜ž]\Ñœ›ÛP˜\ÙM
JK›\ÙÊJK\œ˜^Kš\Ð\œ˜^JOË™[™ÊI‰Š‹™[™ÏYK™[™Ë›X\
OšÚKÛÚ[‹™œ›ÛR”ÓÓŠ
JJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆKœÙ[™\ˆOO]›ÚY	‰Š‹œÙ[™\YKœÙ[™\ŠKK˜YZ[ˆOO]›ÚY	‰Š‹˜YZ[YK˜YZ[ŠKK˜ÛÙRYOO]›ÚY	‰Š‹˜ÛÙRYJK˜ÛÙRYšYÒ[

JKÔÝš[™Ê
JKK›X™[OO]›ÚY	‰Š‹›X™[YK›X™[
KK›\ÙÈOO]›ÚY	‰Š‹›\ÙÏJ˜˜\ÙMœ›ÛPž]\ÊJK›\ÙÈOO]›ÚYÙK›\ÙÎ›™]ÈZ[\œ˜^JJKK™[™ÏÛ‹™[™ÏYK™[™Ë›X\
OÚÚKÛÚ[‹Ò”ÓÓŠ
N›ÚY
N›‹™[™ÏV×KŸKœ›ÛT\X[
J^Û]YÑ

NÜ™]\›ˆ‹œÙ[™\YKœÙ[™\ÏÈˆ‹‹˜YZ[YK˜YZ[ÏÈˆ‹K˜ÛÙRYOO]›ÚY	‰™K˜ÛÙRYOO[[	‰Š‹˜ÛÙRYPšYÒ[
K˜ÛÙRYÔÝš[™Ê
JJK‹›X™[YK›X™[ÏÈˆ‹‹›\ÙÏYK›\ÙÏÏÛ™]ÈZ[\œ˜^K‹™[™ÏYK™[™ÏË›X\
OšÚKÛÚ[‹™œ›ÛT\X[

J_×KŸ_NÙ[˜Ý[Ûˆ

^Ü™]\›žØY™\ÜÎˆˆ‹]N›™]ÈZ[\œ˜^__UË“\ÙÒ[œÝ[X]PÛÛ˜XÝ™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÒ[œÝ[X]PÛÛ˜XÝ™\ÜÛœÙH‹[˜ÛÙJKQ‹š[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK˜Y™\ÜÈOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊK˜Y™\ÜÊKK™]K›[™ÝOOL	‰›‹Z[ÌŠN
K˜ž]\ÊK™]JKŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ‹š[˜\žT™XY\ÙN›™]È‹š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹\

NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹˜Y™\ÜÏ]œÝš[™Ê
NØœ™XZÎØØ\ÙHŽœ‹™]O]˜ž]\Ê
NØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]\

NÜ™]\›Šš\ÔÙ]
JK˜Y™\ÜÊI‰Š‹˜Y™\ÜÏTÝš[™ÊK˜Y™\ÜÊJK
š\ÔÙ]
JK™]JI‰Š‹™]OJ˜ž]\Ñœ›ÛP˜\ÙM
JK™]JJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK˜Y™\ÜÈOO]›ÚY	‰Š‹˜Y™\ÜÏYK˜Y™\ÜÊKK™]HOO]›ÚY	‰Š‹™]OJ˜˜\ÙMœ›ÛPž]\ÊJK™]HOO]›ÚYÙK™]N›™]ÈZ[\œ˜^JJKŸKœ›ÛT\X[
J^Û]\

NÜ™]\›ˆ‹˜Y™\ÜÏYK˜Y™\ÜÏÏÈˆ‹‹™]OYK™]OÏÛ™]ÈZ[\œ˜^KŸ_NÙ[˜Ý[ÛˆQ

^Ü™]\›žÜÙ[™\Žˆˆ‹YZ[Žˆˆ‹ÛÙRYšYÒ[

KX™[ˆˆ‹\ÙÎ›™]ÈZ[\œ˜^K[™Î–×KØ[›™]ÈZ[\œ˜^Kš^\ÙÎˆL__UË“\ÙÒ[œÝ[X]PÛÛ˜XÝ^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÒ[œÝ[X]PÛÛ˜XÝˆ‹[˜ÛÙJKQ‹š[˜\žUÜš]\‹˜Ü™X]J
J^ÙKœÙ[™\ˆOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊKœÙ[™\ŠKK˜YZ[ˆOOHˆ‰‰›‹Z[ÌŠN
KœÝš[™ÊK˜YZ[ŠKK˜ÛÙRYOOPšYÒ[

I‰›‹Z[ÌŠ
KZ[
K˜ÛÙRY
KK›X™[OOHˆ‰‰›‹Z[ÌŠÍ
KœÝš[™ÊK›X™[
KK›\ÙË›[™ÝOOL	‰›‹Z[ÌŠŠK˜ž]\ÊK›\ÙÊNÙ›ÜŠ]ÙˆK™[™ÊZÚKÛÚ[‹™[˜ÛÙJ‹Z[ÌŠL
K™›ÜšÊ
JK›[[J
NÜ™]\›ˆKœØ[›[™ÝOOL	‰›‹Z[ÌŠN
K˜ž]\ÊKœØ[
KK™š^\ÙÏOOHL	‰›‹Z[ÌŠ
K˜›ÛÛ
K™š^\ÙÊKŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ‹š[˜\žT™XY\ÙN›™]È‹š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹RQ

NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹œÙ[™\]œÝš[™Ê
NØœ™XZÎØØ\ÙHŽœ‹˜YZ[]œÝš[™Ê
NØœ™XZÎØØ\ÙHÎœ‹˜ÛÙRY]Z[

NØœ™XZÎØØ\ÙHœ‹›X™[]œÝš[™Ê
NØœ™XZÎØØ\ÙHNœ‹›\ÙÏ]˜ž]\Ê
NØœ™XZÎØØ\ÙHŽœ‹™[™Ëœ\Ú
ÚKÛÚ[‹™XÛÙJZ[ÌŠ
JJNØœ™XZÎØØ\ÙHÎœ‹œØ[]˜ž]\Ê
NØœ™XZÎØØ\ÙHœ‹™š^\ÙÏ]˜›ÛÛ

NØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]RQ

NÜ™]\›Šš\ÔÙ]
JKœÙ[™\ŠI‰Š‹œÙ[™\TÝš[™ÊKœÙ[™\ŠJK
š\ÔÙ]
JK˜YZ[ŠI‰Š‹˜YZ[TÝš[™ÊK˜YZ[ŠJK
š\ÔÙ]
JK˜ÛÙRY
I‰Š‹˜ÛÙRYPšYÒ[
K˜ÛÙRYÔÝš[™Ê
JJK
š\ÔÙ]
JK›X™[
I‰Š‹›X™[TÝš[™ÊK›X™[
JK
š\ÔÙ]
JK›\ÙÊI‰Š‹›\ÙÏJ˜ž]\Ñœ›ÛP˜\ÙM
JK›\ÙÊJK\œ˜^Kš\Ð\œ˜^JOË™[™ÊI‰Š‹™[™ÏYK™[™Ë›X\
OšÚKÛÚ[‹™œ›ÛR”ÓÓŠ
JJK
š\ÔÙ]
JKœØ[
I‰Š‹œØ[J˜ž]\Ñœ›ÛP˜\ÙM
JKœØ[
JK
š\ÔÙ]
JK™š^\ÙÊI‰Š‹™š^\ÙÏHHYK™š^\ÙÊKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆKœÙ[™\ˆOO]›ÚY	‰Š‹œÙ[™\YKœÙ[™\ŠKK˜YZ[ˆOO]›ÚY	‰Š‹˜YZ[YK˜YZ[ŠKK˜ÛÙRYOO]›ÚY	‰Š‹˜ÛÙRYJK˜ÛÙRYšYÒ[

JKÔÝš[™Ê
JKK›X™[OO]›ÚY	‰Š‹›X™[YK›X™[
KK›\ÙÈOO]›ÚY	‰Š‹›\ÙÏJ˜˜\ÙMœ›ÛPž]\ÊJK›\ÙÈOO]›ÚYÙK›\ÙÎ›™]ÈZ[\œ˜^JJKK™[™ÏÛ‹™[™ÏYK™[™Ë›X\
OÚÚKÛÚ[‹Ò”ÓÓŠ
N›ÚY
N›‹™[™ÏV×KKœØ[OO]›ÚY	‰Š‹œØ[J˜˜\ÙMœ›ÛPž]\ÊJKœØ[OO]›ÚYÙKœØ[›™]ÈZ[\œ˜^JJKK™š^\ÙÈOO]›ÚY	‰Š‹™š^\ÙÏYK™š^\ÙÊKŸKœ›ÛT\X[
J^Û]RQ

NÜ™]\›ˆ‹œÙ[™\YKœÙ[™\ÏÈˆ‹‹˜YZ[YK˜YZ[ÏÈˆ‹K˜ÛÙRYOO]›ÚY	‰™K˜ÛÙRYOO[[	‰Š‹˜ÛÙRYPšYÒ[
K˜ÛÙRYÔÝš[™Ê
JJK‹›X™[YK›X™[ÏÈˆ‹‹›\ÙÏYK›\ÙÏÏÛ™]ÈZ[\œ˜^K‹™[™ÏYK™[™ÏË›X\
OšÚKÛÚ[‹™œ›ÛT\X[

J_×K‹œØ[YKœØ[ÏÛ™]ÈZ[\œ˜^K‹™š^\ÙÏYK™š^\ÙÏÏÈLKŸ_NÙ[˜Ý[Ûˆ

^Ü™]\›žØY™\ÜÎˆˆ‹]N›™]ÈZ[\œ˜^__UË“\ÙÒ[œÝ[X]PÛÛ˜XÝ”™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÒ[œÝ[X]PÛÛ˜XÝ”™\ÜÛœÙH‹[˜ÛÙJKQ‹š[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK˜Y™\ÜÈOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊK˜Y™\ÜÊKK™]K›[™ÝOOL	‰›‹Z[ÌŠN
K˜ž]\ÊK™]JKŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ‹š[˜\žT™XY\ÙN›™]È‹š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹Z

NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹˜Y™\ÜÏ]œÝš[™Ê
NØœ™XZÎØØ\ÙHŽœ‹™]O]˜ž]\Ê
NØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]Z

NÜ™]\›Šš\ÔÙ]
JK˜Y™\ÜÊI‰Š‹˜Y™\ÜÏTÝš[™ÊK˜Y™\ÜÊJK
š\ÔÙ]
JK™]JI‰Š‹™]OJ˜ž]\Ñœ›ÛP˜\ÙM
JK™]JJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK˜Y™\ÜÈOO]›ÚY	‰Š‹˜Y™\ÜÏYK˜Y™\ÜÊKK™]HOO]›ÚY	‰Š‹™]OJ˜˜\ÙMœ›ÛPž]\ÊJK™]HOO]›ÚYÙK™]N›™]ÈZ[\œ˜^JJKŸKœ›ÛT\X[
J^Û]Z

NÜ™]\›ˆ‹˜Y™\ÜÏYK˜Y™\ÜÏÏÈˆ‹‹™]OYK™]OÏÛ™]ÈZ[\œ˜^KŸ_NÙ[˜Ý[ÛˆQ

^Ü™]\›žÜÙ[™\Žˆˆ‹ÛÛ˜XÝˆˆ‹\ÙÎ›™]ÈZ[\œ˜^K[™Î–×__UË“\ÙÑ^XÝ]PÛÛ˜XÝ^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÑ^XÝ]PÛÛ˜XÝ‹[˜ÛÙJKQ‹š[˜\žUÜš]\‹˜Ü™X]J
J^ÙKœÙ[™\ˆOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊKœÙ[™\ŠKK˜ÛÛ˜XÝOOHˆ‰‰›‹Z[ÌŠN
KœÝš[™ÊK˜ÛÛ˜XÝ
KK›\ÙË›[™ÝOOL	‰›‹Z[ÌŠŠK˜ž]\ÊK›\ÙÊNÙ›ÜŠ]ÙˆK™[™ÊZÚKÛÚ[‹™[˜ÛÙJ‹Z[ÌŠŠK™›ÜšÊ
JK›[[J
NÜ™]\›ˆŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ‹š[˜\žT™XY\ÙN›™]È‹š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹^Q

NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹œÙ[™\]œÝš[™Ê
NØœ™XZÎØØ\ÙHŽœ‹˜ÛÛ˜XÝ]œÝš[™Ê
NØœ™XZÎØØ\ÙHÎœ‹›\ÙÏ]˜ž]\Ê
NØœ™XZÎØØ\ÙHNœ‹™[™Ëœ\Ú
ÚKÛÚ[‹™XÛÙJZ[ÌŠ
JJNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]^Q

NÜ™]\›Šš\ÔÙ]
JKœÙ[™\ŠI‰Š‹œÙ[™\TÝš[™ÊKœÙ[™\ŠJK
š\ÔÙ]
JK˜ÛÛ˜XÝ
I‰Š‹˜ÛÛ˜XÝTÝš[™ÊK˜ÛÛ˜XÝ
JK
š\ÔÙ]
JK›\ÙÊI‰Š‹›\ÙÏJ˜ž]\Ñœ›ÛP˜\ÙM
JK›\ÙÊJK\œ˜^Kš\Ð\œ˜^JOË™[™ÊI‰Š‹™[™ÏYK™[™Ë›X\
OšÚKÛÚ[‹™œ›ÛR”ÓÓŠ
JJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆKœÙ[™\ˆOO]›ÚY	‰Š‹œÙ[™\YKœÙ[™\ŠKK˜ÛÛ˜XÝOO]›ÚY	‰Š‹˜ÛÛ˜XÝYK˜ÛÛ˜XÝ
KK›\ÙÈOO]›ÚY	‰Š‹›\ÙÏJ˜˜\ÙMœ›ÛPž]\ÊJK›\ÙÈOO]›ÚYÙK›\ÙÎ›™]ÈZ[\œ˜^JJKK™[™ÏÛ‹™[™ÏYK™[™Ë›X\
OÚÚKÛÚ[‹Ò”ÓÓŠ
N›ÚY
N›‹™[™ÏV×KŸKœ›ÛT\X[
J^Û]^Q

NÜ™]\›ˆ‹œÙ[™\YKœÙ[™\ÏÈˆ‹‹˜ÛÛ˜XÝYK˜ÛÛ˜XÝÏÈˆ‹‹›\ÙÏYK›\ÙÏÏÛ™]ÈZ[\œ˜^K‹™[™ÏYK™[™ÏË›X\
OšÚKÛÚ[‹™œ›ÛT\X[

J_×KŸ_NÙ[˜Ý[Ûˆ‘

^Ü™]\›žÙ]N›™]ÈZ[\œ˜^__UË“\ÙÑ^XÝ]PÛÛ˜XÝ™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÑ^XÝ]PÛÛ˜XÝ™\ÜÛœÙH‹[˜ÛÙJKQ‹š[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK™]K›[™ÝOOL	‰›‹Z[ÌŠL
K˜ž]\ÊK™]JKŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ‹š[˜\žT™XY\ÙN›™]È‹š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹P‘

NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÛÏŒÏOOLOÜ‹™]O]˜ž]\Ê
NœÚÚ\\JÉÊ_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]P‘

NÜ™]\›Šš\ÔÙ]
JK™]JI‰Š‹™]OJ˜ž]\Ñœ›ÛP˜\ÙM
JK™]JJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK™]HOO]›ÚY	‰Š‹™]OJ˜˜\ÙMœ›ÛPž]\ÊJK™]HOO]›ÚYÙK™]N›™]ÈZ[\œ˜^JJKŸKœ›ÛT\X[
J^Û]P‘

NÜ™]\›ˆ‹™]OYK™]OÏÛ™]ÈZ[\œ˜^KŸ_NÙ[˜Ý[ÛˆQ

^Ü™]\›žÜÙ[™\Žˆˆ‹ÛÛ˜XÝˆˆ‹ÛÙRYšYÒ[

K\ÙÎ›™]ÈZ[\œ˜^__UË“\ÙÓZYÜ˜]PÛÛ˜XÝ^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÓZYÜ˜]PÛÛ˜XÝ‹[˜ÛÙJKQ‹š[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆKœÙ[™\ˆOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊKœÙ[™\ŠKK˜ÛÛ˜XÝOOHˆ‰‰›‹Z[ÌŠN
KœÝš[™ÊK˜ÛÛ˜XÝ
KK˜ÛÙRYOOPšYÒ[

I‰›‹Z[ÌŠ
KZ[
K˜ÛÙRY
KK›\ÙË›[™ÝOOL	‰›‹Z[ÌŠÍ
K˜ž]\ÊK›\ÙÊKŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ‹š[˜\žT™XY\ÙN›™]È‹š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹[Q

NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹œÙ[™\]œÝš[™Ê
NØœ™XZÎØØ\ÙHŽœ‹˜ÛÛ˜XÝ]œÝš[™Ê
NØœ™XZÎØØ\ÙHÎœ‹˜ÛÙRY]Z[

NØœ™XZÎØØ\ÙHœ‹›\ÙÏ]˜ž]\Ê
NØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û][Q

NÜ™]\›Šš\ÔÙ]
JKœÙ[™\ŠI‰Š‹œÙ[™\TÝš[™ÊKœÙ[™\ŠJK
š\ÔÙ]
JK˜ÛÛ˜XÝ
I‰Š‹˜ÛÛ˜XÝTÝš[™ÊK˜ÛÛ˜XÝ
JK
š\ÔÙ]
JK˜ÛÙRY
I‰Š‹˜ÛÙRYPšYÒ[
K˜ÛÙRYÔÝš[™Ê
JJK
š\ÔÙ]
JK›\ÙÊI‰Š‹›\ÙÏJ˜ž]\Ñœ›ÛP˜\ÙM
JK›\ÙÊJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆKœÙ[™\ˆOO]›ÚY	‰Š‹œÙ[™\YKœÙ[™\ŠKK˜ÛÛ˜XÝOO]›ÚY	‰Š‹˜ÛÛ˜XÝYK˜ÛÛ˜XÝ
KK˜ÛÙRYOO]›ÚY	‰Š‹˜ÛÙRYJK˜ÛÙRYšYÒ[

JKÔÝš[™Ê
JKK›\ÙÈOO]›ÚY	‰Š‹›\ÙÏJ˜˜\ÙMœ›ÛPž]\ÊJK›\ÙÈOO]›ÚYÙK›\ÙÎ›™]ÈZ[\œ˜^JJKŸKœ›ÛT\X[
J^Û][Q

NÜ™]\›ˆ‹œÙ[™\YKœÙ[™\ÏÈˆ‹‹˜ÛÛ˜XÝYK˜ÛÛ˜XÝÏÈˆ‹K˜ÛÙRYOO]›ÚY	‰™K˜ÛÙRYOO[[	‰Š‹˜ÛÙRYPšYÒ[
K˜ÛÙRYÔÝš[™Ê
JJK‹›\ÙÏYK›\ÙÏÏÛ™]ÈZ[\œ˜^KŸ_NÙ[˜Ý[ÛˆÑ

^Ü™]\›žÙ]N›™]ÈZ[\œ˜^__UË“\ÙÓZYÜ˜]PÛÛ˜XÝ™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÓZYÜ˜]PÛÛ˜XÝ™\ÜÛœÙH‹[˜ÛÙJKQ‹š[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK™]K›[™ÝOOL	‰›‹Z[ÌŠL
K˜ž]\ÊK™]JKŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ‹š[˜\žT™XY\ÙN›™]È‹š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹PÑ

NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÛÏŒÏOOLOÜ‹™]O]˜ž]\Ê
NœÚÚ\\JÉÊ_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]PÑ

NÜ™]\›Šš\ÔÙ]
JK™]JI‰Š‹™]OJ˜ž]\Ñœ›ÛP˜\ÙM
JK™]JJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK™]HOO]›ÚY	‰Š‹™]OJ˜˜\ÙMœ›ÛPž]\ÊJK™]HOO]›ÚYÙK™]N›™]ÈZ[\œ˜^JJKŸKœ›ÛT\X[
J^Û]PÑ

NÜ™]\›ˆ‹™]OYK™]OÏÛ™]ÈZ[\œ˜^KŸ_NÙ[˜Ý[ÛˆÑ

^Ü™]\›žÜÙ[™\Žˆˆ‹™]ÐYZ[Žˆˆ‹ÛÛ˜XÝˆˆŸ_UË“\ÙÕ\]PYZ[^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÕ\]PYZ[ˆ‹[˜ÛÙJKQ‹š[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆKœÙ[™\ˆOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊKœÙ[™\ŠKK›™]ÐYZ[ˆOOHˆ‰‰›‹Z[ÌŠN
KœÝš[™ÊK›™]ÐYZ[ŠKK˜ÛÛ˜XÝOOHˆ‰‰›‹Z[ÌŠŠKœÝš[™ÊK˜ÛÛ˜XÝ
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ‹š[˜\žT™XY\ÙN›™]È‹š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹TÑ

NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹œÙ[™\]œÝš[™Ê
NØœ™XZÎØØ\ÙHŽœ‹›™]ÐYZ[]œÝš[™Ê
NØœ™XZÎØØ\ÙHÎœ‹˜ÛÛ˜XÝ]œÝš[™Ê
NØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]TÑ

NÜ™]\›Šš\ÔÙ]
JKœÙ[™\ŠI‰Š‹œÙ[™\TÝš[™ÊKœÙ[™\ŠJK
š\ÔÙ]
JK›™]ÐYZ[ŠI‰Š‹›™]ÐYZ[TÝš[™ÊK›™]ÐYZ[ŠJK
š\ÔÙ]
JK˜ÛÛ˜XÝ
I‰Š‹˜ÛÛ˜XÝTÝš[™ÊK˜ÛÛ˜XÝ
JKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆKœÙ[™\ˆOO]›ÚY	‰Š‹œÙ[™\YKœÙ[™\ŠKK›™]ÐYZ[ˆOO]›ÚY	‰Š‹›™]ÐYZ[YK›™]ÐYZ[ŠKK˜ÛÛ˜XÝOO]›ÚY	‰Š‹˜ÛÛ˜XÝYK˜ÛÛ˜XÝ
KŸKœ›ÛT\X[
J^Û]TÑ

NÜ™]\›ˆ‹œÙ[™\YKœÙ[™\ÏÈˆ‹‹›™]ÐYZ[YK›™]ÐYZ[ÏÈˆ‹‹˜ÛÛ˜XÝYK˜ÛÛ˜XÝÏÈˆ‹Ÿ_NÙ[˜Ý[ÛˆÑ

^Ü™]\›žß_UË“\ÙÕ\]PYZ[”™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÕ\]PYZ[”™\ÜÛœÙH‹[˜ÛÙJKQ‹š[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ‹š[˜\žT™XY\ÙN›™]È‹š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹ZÑ

NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Ü™]\›ˆÑ

_KÒ”ÓÓŠJ^Ü™]\›žß_Kœ›ÛT\X[
J^Ü™]\›ˆÑ

__NÙ[˜Ý[ÛˆQ

^Ü™]\›žÜÙ[™\Žˆˆ‹ÛÛ˜XÝˆˆŸ_UË“\ÙÐÛX\YZ[^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÐÛX\YZ[ˆ‹[˜ÛÙJKQ‹š[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆKœÙ[™\ˆOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊKœÙ[™\ŠKK˜ÛÛ˜XÝOOHˆ‰‰›‹Z[ÌŠŠKœÝš[™ÊK˜ÛÛ˜XÝ
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ‹š[˜\žT™XY\ÙN›™]È‹š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹QQ

NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹œÙ[™\]œÝš[™Ê
NØœ™XZÎØØ\ÙHÎœ‹˜ÛÛ˜XÝ]œÝš[™Ê
NØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]QQ

NÜ™]\›Šš\ÔÙ]
JKœÙ[™\ŠI‰Š‹œÙ[™\TÝš[™ÊKœÙ[™\ŠJK
š\ÔÙ]
JK˜ÛÛ˜XÝ
I‰Š‹˜ÛÛ˜XÝTÝš[™ÊK˜ÛÛ˜XÝ
JKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆKœÙ[™\ˆOO]›ÚY	‰Š‹œÙ[™\YKœÙ[™\ŠKK˜ÛÛ˜XÝOO]›ÚY	‰Š‹˜ÛÛ˜XÝYK˜ÛÛ˜XÝ
KŸKœ›ÛT\X[
J^Û]QQ

NÜ™]\›ˆ‹œÙ[™\YKœÙ[™\ÏÈˆ‹‹˜ÛÛ˜XÝYK˜ÛÛ˜XÝÏÈˆ‹Ÿ_NÙ[˜Ý[ÛˆQ

^Ü™]\›žß_UË“\ÙÐÛX\YZ[”™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÐÛX\YZ[”™\ÜÛœÙH‹[˜ÛÙJKQ‹š[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ‹š[˜\žT™XY\ÙN›™]È‹š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹TQ

NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Ü™]\›ˆQ

_KÒ”ÓÓŠJ^Ü™]\›žß_Kœ›ÛT\X[
J^Ü™]\›ˆQ

__NÙ[˜Ý[ÛˆÑ

^Ü™]\›žÜÙ[™\Žˆˆ‹ÛÙRYšYÒ[

K™]Ò[œÝ[X]T\›Z\ÜÚ[ÛŽ›ÚY_UË“\ÙÕ\]R[œÝ[X]PÛÛ™šYÏ^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÕ\]R[œÝ[X]PÛÛ™šYÈ‹[˜ÛÙJKQ‹š[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆKœÙ[™\ˆOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊKœÙ[™\ŠKK˜ÛÙRYOOPšYÒ[

I‰›‹Z[ÌŠMŠKZ[
K˜ÛÙRY
KK›™]Ò[œÝ[X]T\›Z\ÜÚ[ÛˆOO]›ÚY	‰š\‹XØÙ\ÜÐÛÛ™šYË™[˜ÛÙJK›™]Ò[œÝ[X]T\›Z\ÜÚ[Û‹‹Z[ÌŠŠK™›ÜšÊ
JK›[[J
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ‹š[˜\žT™XY\ÙN›™]È‹š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹]Ñ

NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹œÙ[™\]œÝš[™Ê
NØœ™XZÎØØ\ÙHŽœ‹˜ÛÙRY]Z[

NØœ™XZÎØØ\ÙHÎœ‹›™]Ò[œÝ[X]T\›Z\ÜÚ[ÛZ\‹XØÙ\ÜÐÛÛ™šYË™XÛÙJZ[ÌŠ
JNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]]Ñ

NÜ™]\›Šš\ÔÙ]
JKœÙ[™\ŠI‰Š‹œÙ[™\TÝš[™ÊKœÙ[™\ŠJK
š\ÔÙ]
JK˜ÛÙRY
I‰Š‹˜ÛÙRYPšYÒ[
K˜ÛÙRYÔÝš[™Ê
JJK
š\ÔÙ]
JK›™]Ò[œÝ[X]T\›Z\ÜÚ[ÛŠI‰Š‹›™]Ò[œÝ[X]T\›Z\ÜÚ[ÛZ\‹XØÙ\ÜÐÛÛ™šYË™œ›ÛR”ÓÓŠK›™]Ò[œÝ[X]T\›Z\ÜÚ[ÛŠJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆKœÙ[™\ˆOO]›ÚY	‰Š‹œÙ[™\YKœÙ[™\ŠKK˜ÛÙRYOO]›ÚY	‰Š‹˜ÛÙRYJK˜ÛÙRYšYÒ[

JKÔÝš[™Ê
JKK›™]Ò[œÝ[X]T\›Z\ÜÚ[ÛˆOO]›ÚY	‰Š‹›™]Ò[œÝ[X]T\›Z\ÜÚ[ÛYK›™]Ò[œÝ[X]T\›Z\ÜÚ[ÛÚ\‹XØÙ\ÜÐÛÛ™šYËÒ”ÓÓŠK›™]Ò[œÝ[X]T\›Z\ÜÚ[ÛŠN›ÚY
KŸKœ›ÛT\X[
J^Û]]Ñ

NÜ™]\›ˆ‹œÙ[™\YKœÙ[™\ÏÈˆ‹K˜ÛÙRYOO]›ÚY	‰™K˜ÛÙRYOO[[	‰Š‹˜ÛÙRYPšYÒ[
K˜ÛÙRYÔÝš[™Ê
JJKK›™]Ò[œÝ[X]T\›Z\ÜÚ[ÛˆOO]›ÚY	‰™K›™]Ò[œÝ[X]T\›Z\ÜÚ[ÛˆOO[[	‰Š‹›™]Ò[œÝ[X]T\›Z\ÜÚ[ÛZ\‹XØÙ\ÜÐÛÛ™šYË™œ›ÛT\X[
K›™]Ò[œÝ[X]T\›Z\ÜÚ[ÛŠJKŸ_NÙ[˜Ý[Ûˆ‘

^Ü™]\›žß_UË“\ÙÕ\]R[œÝ[X]PÛÛ™šYÔ™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÕ\]R[œÝ[X]PÛÛ™šYÔ™\ÜÛœÙH‹[˜ÛÙJKQ‹š[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ‹š[˜\žT™XY\ÙN›™]È‹š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹T‘

NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Ü™]\›ˆ‘

_KÒ”ÓÓŠJ^Ü™]\›žß_Kœ›ÛT\X[
J^Ü™]\›ˆ‘

__NÙ[˜Ý[Ûˆ‘

^Ü™]\›žØ]]Üš]Nˆˆ‹\˜[\Îš\‹”\˜[\Ë™œ›ÛT\X[
ßJ__UË“\ÙÕ\]T\˜[\Ï^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÕ\]T\˜[\È‹[˜ÛÙJKQ‹š[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK˜]]Üš]HOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊK˜]]Üš]JKKœ\˜[\ÈOO]›ÚY	‰š\‹”\˜[\Ë™[˜ÛÙJKœ\˜[\Ë‹Z[ÌŠN
K™›ÜšÊ
JK›[[J
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ‹š[˜\žT™XY\ÙN›™]È‹š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹X‘

NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹˜]]Üš]O]œÝš[™Ê
NØœ™XZÎØØ\ÙHŽœ‹œ\˜[\ÏZ\‹”\˜[\Ë™XÛÙJZ[ÌŠ
JNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]X‘

NÜ™]\›Šš\ÔÙ]
JK˜]]Üš]JI‰Š‹˜]]Üš]OTÝš[™ÊK˜]]Üš]JJK
š\ÔÙ]
JKœ\˜[\ÊI‰Š‹œ\˜[\ÏZ\‹”\˜[\Ë™œ›ÛR”ÓÓŠKœ\˜[\ÊJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK˜]]Üš]HOO]›ÚY	‰Š‹˜]]Üš]OYK˜]]Üš]JKKœ\˜[\ÈOO]›ÚY	‰Š‹œ\˜[\ÏYKœ\˜[\ÏÚ\‹”\˜[\ËÒ”ÓÓŠKœ\˜[\ÊN›ÚY
KŸKœ›ÛT\X[
J^Û]X‘

NÜ™]\›ˆ‹˜]]Üš]OYK˜]]Üš]OÏÈˆ‹Kœ\˜[\ÈOO]›ÚY	‰™Kœ\˜[\ÈOO[[	‰Š‹œ\˜[\ÏZ\‹”\˜[\Ë™œ›ÛT\X[
Kœ\˜[\ÊJKŸ_NÙ[˜Ý[Ûˆ

^Ü™]\›žß_UË“\ÙÕ\]T\˜[\Ô™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÕ\]T\˜[\Ô™\ÜÛœÙH‹[˜ÛÙJKQ‹š[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ‹š[˜\žT™XY\ÙN›™]È‹š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹T

NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Ü™]\›ˆ

_KÒ”ÓÓŠJ^Ü™]\›žß_Kœ›ÛT\X[
J^Ü™]\›ˆ

__NÙ[˜Ý[Ûˆ‘

^Ü™]\›žØ]]Üš]Nˆˆ‹ÛÛ˜XÝˆˆ‹\ÙÎ›™]ÈZ[\œ˜^__UË“\ÙÔÝYÐÛÛ˜XÝ^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÔÝYÐÛÛ˜XÝ‹[˜ÛÙJKQ‹š[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK˜]]Üš]HOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊK˜]]Üš]JKK˜ÛÛ˜XÝOOHˆ‰‰›‹Z[ÌŠN
KœÝš[™ÊK˜ÛÛ˜XÝ
KK›\ÙË›[™ÝOOL	‰›‹Z[ÌŠŠK˜ž]\ÊK›\ÙÊKŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ‹š[˜\žT™XY\ÙN›™]È‹š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹S‘

NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹˜]]Üš]O]œÝš[™Ê
NØœ™XZÎØØ\ÙHŽœ‹˜ÛÛ˜XÝ]œÝš[™Ê
NØœ™XZÎØØ\ÙHÎœ‹›\ÙÏ]˜ž]\Ê
NØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]S‘

NÜ™]\›Šš\ÔÙ]
JK˜]]Üš]JI‰Š‹˜]]Üš]OTÝš[™ÊK˜]]Üš]JJK
š\ÔÙ]
JK˜ÛÛ˜XÝ
I‰Š‹˜ÛÛ˜XÝTÝš[™ÊK˜ÛÛ˜XÝ
JK
š\ÔÙ]
JK›\ÙÊI‰Š‹›\ÙÏJ˜ž]\Ñœ›ÛP˜\ÙM
JK›\ÙÊJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK˜]]Üš]HOO]›ÚY	‰Š‹˜]]Üš]OYK˜]]Üš]JKK˜ÛÛ˜XÝOO]›ÚY	‰Š‹˜ÛÛ˜XÝYK˜ÛÛ˜XÝ
KK›\ÙÈOO]›ÚY	‰Š‹›\ÙÏJ˜˜\ÙMœ›ÛPž]\ÊJK›\ÙÈOO]›ÚYÙK›\ÙÎ›™]ÈZ[\œ˜^JJKŸKœ›ÛT\X[
J^Û]S‘

NÜ™]\›ˆ‹˜]]Üš]OYK˜]]Üš]OÏÈˆ‹‹˜ÛÛ˜XÝYK˜ÛÛ˜XÝÏÈˆ‹‹›\ÙÏYK›\ÙÏÏÛ™]ÈZ[\œ˜^KŸ_NÙ[˜Ý[Ûˆ‘

^Ü™]\›žÙ]N›™]ÈZ[\œ˜^__UË“\ÙÔÝYÐÛÛ˜XÝ™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÔÝYÐÛÛ˜XÝ™\ÜÛœÙH‹[˜ÛÙJKQ‹š[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK™]K›[™ÝOOL	‰›‹Z[ÌŠL
K˜ž]\ÊK™]JKŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ‹š[˜\žT™XY\ÙN›™]È‹š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹]‘

NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÛÏŒÏOOLOÜ‹™]O]˜ž]\Ê
NœÚÚ\\JÉÊ_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]]‘

NÜ™]\›Šš\ÔÙ]
JK™]JI‰Š‹™]OJ˜ž]\Ñœ›ÛP˜\ÙM
JK™]JJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK™]HOO]›ÚY	‰Š‹™]OJ˜˜\ÙMœ›ÛPž]\ÊJK™]HOO]›ÚYÙK™]N›™]ÈZ[\œ˜^JJKŸKœ›ÛT\X[
J^Û]]‘

NÜ™]\›ˆ‹™]OYK™]OÏÛ™]ÈZ[\œ˜^KŸ_NÙ[˜Ý[ÛˆÑ

^Ü™]\›žØ]]Üš]Nˆˆ‹ÛÙRYÎ–×__UË“\ÙÔ[ÛÙ\Ï^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÔ[ÛÙ\È‹[˜ÛÙJKQ‹š[˜\žUÜš]\‹˜Ü™X]J
J^ÙK˜]]Üš]HOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊK˜]]Üš]JK‹Z[ÌŠN
K™›ÜšÊ
NÙ›ÜŠ]ÙˆK˜ÛÙRYÊ[‹Z[

NÜ™]\›ˆ‹›[[J
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ‹š[˜\žT™XY\ÙN›™]È‹š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹SÑ

NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹˜]]Üš]O]œÝš[™Ê
NØœ™XZÎØØ\ÙHŽšYŠ
ÉÊOOOLŠ^Û]O]Z[ÌŠ
JÝœÜÎÙ›ÜŠÝœÜÏNÊ\‹˜ÛÙRYËœ\Ú
Z[

J_Y[ÙH‹˜ÛÙRYËœ\Ú
Z[

JNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]SÑ

NÜ™]\›Šš\ÔÙ]
JK˜]]Üš]JI‰Š‹˜]]Üš]OTÝš[™ÊK˜]]Üš]JJK\œ˜^Kš\Ð\œ˜^JOË˜ÛÙRYÊI‰Š‹˜ÛÙRYÏYK˜ÛÙRYË›X\
OšYÒ[
ÔÝš[™Ê
JJJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK˜]]Üš]HOO]›ÚY	‰Š‹˜]]Üš]OYK˜]]Üš]JKK˜ÛÙRYÏÛ‹˜ÛÙRYÏYK˜ÛÙRYË›X\
OŠšYÒ[

JKÔÝš[™Ê
JN›‹˜ÛÙRYÏV×KŸKœ›ÛT\X[
J^Û]SÑ

NÜ™]\›ˆ‹˜]]Üš]OYK˜]]Üš]OÏÈˆ‹‹˜ÛÙRYÏYK˜ÛÙRYÏË›X\
OšYÒ[
ÔÝš[™Ê
JJ_×KŸ_NÙ[˜Ý[Ûˆ

^Ü™]\›žß_UË“\ÙÔ[ÛÙ\Ô™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÔ[ÛÙ\Ô™\ÜÛœÙH‹[˜ÛÙJKQ‹š[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ‹š[˜\žT™XY\ÙN›™]È‹š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹Q

NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Ü™]\›ˆ

_KÒ”ÓÓŠJ^Ü™]\›žß_Kœ›ÛT\X[
J^Ü™]\›ˆ

__NÙ[˜Ý[ÛˆQ

^Ü™]\›žØ]]Üš]Nˆˆ‹ÛÙRYÎ–×__UË“\ÙÕ[œ[ÛÙ\Ï^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÕ[œ[ÛÙ\È‹[˜ÛÙJKQ‹š[˜\žUÜš]\‹˜Ü™X]J
J^ÙK˜]]Üš]HOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊK˜]]Üš]JK‹Z[ÌŠN
K™›ÜšÊ
NÙ›ÜŠ]ÙˆK˜ÛÙRYÊ[‹Z[

NÜ™]\›ˆ‹›[[J
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ‹š[˜\žT™XY\ÙN›™]È‹š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹UQ

NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹˜]]Üš]O]œÝš[™Ê
NØœ™XZÎØØ\ÙHŽšYŠ
ÉÊOOOLŠ^Û]O]Z[ÌŠ
JÝœÜÎÙ›ÜŠÝœÜÏNÊ\‹˜ÛÙRYËœ\Ú
Z[

J_Y[ÙH‹˜ÛÙRYËœ\Ú
Z[

JNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]UQ

NÜ™]\›Šš\ÔÙ]
JK˜]]Üš]JI‰Š‹˜]]Üš]OTÝš[™ÊK˜]]Üš]JJK\œ˜^Kš\Ð\œ˜^JOË˜ÛÙRYÊI‰Š‹˜ÛÙRYÏYK˜ÛÙRYË›X\
OšYÒ[
ÔÝš[™Ê
JJJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK˜]]Üš]HOO]›ÚY	‰Š‹˜]]Üš]OYK˜]]Üš]JKK˜ÛÙRYÏÛ‹˜ÛÙRYÏYK˜ÛÙRYË›X\
OŠšYÒ[

JKÔÝš[™Ê
JN›‹˜ÛÙRYÏV×KŸKœ›ÛT\X[
J^Û]UQ

NÜ™]\›ˆ‹˜]]Üš]OYK˜]]Üš]OÏÈˆ‹‹˜ÛÙRYÏYK˜ÛÙRYÏË›X\
OšYÒ[
ÔÝš[™Ê
JJ_×KŸ_NÙ[˜Ý[Ûˆ

^Ü™]\›žß_UË“\ÙÕ[œ[ÛÙ\Ô™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÕ[œ[ÛÙ\Ô™\ÜÛœÙH‹[˜ÛÙJKQ‹š[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ‹š[˜\žT™XY\ÙN›™]È‹š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹U

NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Ü™]\›ˆ

_KÒ”ÓÓŠJ^Ü™]\›žß_Kœ›ÛT\X[
J^Ü™]\›ˆ

__NÙ[˜Ý[Ûˆ

^Ü™]\›žØ]]Üš]Nˆˆ‹Ø\ÛPž]PÛÙN›™]ÈZ[\œ˜^K[œÝ[X]T\›Z\ÜÚ[ÛŽ›ÚY[œ[ÛÙNˆLKYZ[Žˆˆ‹X™[ˆˆ‹\ÙÎ›™]ÈZ[\œ˜^K[™Î–×KÛÝ\˜ÙNˆˆ‹Z[\Žˆˆ‹ÛÙR\Ú›™]ÈZ[\œ˜^__UË“\ÙÔÝÜ™P[™[œÝ[X]PÛÛ˜XÝ^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÔÝÜ™P[™[œÝ[X]PÛÛ˜XÝ‹[˜ÛÙJKQ‹š[˜\žUÜš]\‹˜Ü™X]J
J^ÙK˜]]Üš]HOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊK˜]]Üš]JKKØ\ÛPž]PÛÙK›[™ÝOOL	‰›‹Z[ÌŠŠK˜ž]\ÊKØ\ÛPž]PÛÙJKKš[œÝ[X]T\›Z\ÜÚ[ÛˆOO]›ÚY	‰š\‹XØÙ\ÜÐÛÛ™šYË™[˜ÛÙJKš[œÝ[X]T\›Z\ÜÚ[Û‹‹Z[ÌŠÍ
K™›ÜšÊ
JK›[[J
KK[œ[ÛÙOOOHL	‰›‹Z[ÌŠ
K˜›ÛÛ
K[œ[ÛÙJKK˜YZ[ˆOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊK˜YZ[ŠKK›X™[OOHˆ‰‰›‹Z[ÌŠN
KœÝš[™ÊK›X™[
KK›\ÙË›[™ÝOOL	‰›‹Z[ÌŠŠK˜ž]\ÊK›\ÙÊNÙ›ÜŠ]ÙˆK™[™ÊZÚKÛÚ[‹™[˜ÛÙJ‹Z[ÌŠÍ
K™›ÜšÊ
JK›[[J
NÜ™]\›ˆKœÛÝ\˜ÙHOOHˆ‰‰›‹Z[ÌŠŠKœÝš[™ÊKœÛÝ\˜ÙJKK˜Z[\ˆOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊK˜Z[\ŠKK˜ÛÙR\Ú›[™ÝOOL	‰›‹Z[ÌŠN
K˜ž]\ÊK˜ÛÙR\Ú
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ‹š[˜\žT™XY\ÙN›™]È‹š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹^

NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹˜]]Üš]O]œÝš[™Ê
NØœ™XZÎØØ\ÙHÎœ‹Ø\ÛPž]PÛÙO]˜ž]\Ê
NØœ™XZÎØØ\ÙHœ‹š[œÝ[X]T\›Z\ÜÚ[ÛZ\‹XØÙ\ÜÐÛÛ™šYË™XÛÙJZ[ÌŠ
JNØœ™XZÎØØ\ÙHNœ‹[œ[ÛÙO]˜›ÛÛ

NØœ™XZÎØØ\ÙHŽœ‹˜YZ[]œÝš[™Ê
NØœ™XZÎØØ\ÙHÎœ‹›X™[]œÝš[™Ê
NØœ™XZÎØØ\ÙHœ‹›\ÙÏ]˜ž]\Ê
NØœ™XZÎØØ\ÙHNœ‹™[™Ëœ\Ú
ÚKÛÚ[‹™XÛÙJZ[ÌŠ
JJNØœ™XZÎØØ\ÙHLœ‹œÛÝ\˜ÙO]œÝš[™Ê
NØœ™XZÎØØ\ÙHLNœ‹˜Z[\]œÝš[™Ê
NØœ™XZÎØØ\ÙHLŽœ‹˜ÛÙR\Ú]˜ž]\Ê
NØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]^

NÜ™]\›Šš\ÔÙ]
JK˜]]Üš]JI‰Š‹˜]]Üš]OTÝš[™ÊK˜]]Üš]JJK
š\ÔÙ]
JKØ\ÛPž]PÛÙJI‰Š‹Ø\ÛPž]PÛÙOJ˜ž]\Ñœ›ÛP˜\ÙM
JKØ\ÛPž]PÛÙJJK
š\ÔÙ]
JKš[œÝ[X]T\›Z\ÜÚ[ÛŠI‰Š‹š[œÝ[X]T\›Z\ÜÚ[ÛZ\‹XØÙ\ÜÐÛÛ™šYË™œ›ÛR”ÓÓŠKš[œÝ[X]T\›Z\ÜÚ[ÛŠJK
š\ÔÙ]
JK[œ[ÛÙJI‰Š‹[œ[ÛÙOHHYK[œ[ÛÙJK
š\ÔÙ]
JK˜YZ[ŠI‰Š‹˜YZ[TÝš[™ÊK˜YZ[ŠJK
š\ÔÙ]
JK›X™[
I‰Š‹›X™[TÝš[™ÊK›X™[
JK
š\ÔÙ]
JK›\ÙÊI‰Š‹›\ÙÏJ˜ž]\Ñœ›ÛP˜\ÙM
JK›\ÙÊJK\œ˜^Kš\Ð\œ˜^JOË™[™ÊI‰Š‹™[™ÏYK™[™Ë›X\
OšÚKÛÚ[‹™œ›ÛR”ÓÓŠ
JJK
š\ÔÙ]
JKœÛÝ\˜ÙJI‰Š‹œÛÝ\˜ÙOTÝš[™ÊKœÛÝ\˜ÙJJK
š\ÔÙ]
JK˜Z[\ŠI‰Š‹˜Z[\TÝš[™ÊK˜Z[\ŠJK
š\ÔÙ]
JK˜ÛÙR\Ú
I‰Š‹˜ÛÙR\ÚJ˜ž]\Ñœ›ÛP˜\ÙM
JK˜ÛÙR\Ú
JKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK˜]]Üš]HOO]›ÚY	‰Š‹˜]]Üš]OYK˜]]Üš]JKKØ\ÛPž]PÛÙHOO]›ÚY	‰Š‹Ø\ÛPž]PÛÙOJ˜˜\ÙMœ›ÛPž]\ÊJKØ\ÛPž]PÛÙHOO]›ÚYÙKØ\ÛPž]PÛÙN›™]ÈZ[\œ˜^JJKKš[œÝ[X]T\›Z\ÜÚ[ÛˆOO]›ÚY	‰Š‹š[œÝ[X]T\›Z\ÜÚ[ÛYKš[œÝ[X]T\›Z\ÜÚ[ÛÚ\‹XØÙ\ÜÐÛÛ™šYËÒ”ÓÓŠKš[œÝ[X]T\›Z\ÜÚ[ÛŠN›ÚY
KK[œ[ÛÙHOO]›ÚY	‰Š‹[œ[ÛÙOYK[œ[ÛÙJKK˜YZ[ˆOO]›ÚY	‰Š‹˜YZ[YK˜YZ[ŠKK›X™[OO]›ÚY	‰Š‹›X™[YK›X™[
KK›\ÙÈOO]›ÚY	‰Š‹›\ÙÏJ˜˜\ÙMœ›ÛPž]\ÊJK›\ÙÈOO]›ÚYÙK›\ÙÎ›™]ÈZ[\œ˜^JJKK™[™ÏÛ‹™[™ÏYK™[™Ë›X\
OÚÚKÛÚ[‹Ò”ÓÓŠ
N›ÚY
N›‹™[™ÏV×KKœÛÝ\˜ÙHOO]›ÚY	‰Š‹œÛÝ\˜ÙOYKœÛÝ\˜ÙJKK˜Z[\ˆOO]›ÚY	‰Š‹˜Z[\YK˜Z[\ŠKK˜ÛÙR\ÚOO]›ÚY	‰Š‹˜ÛÙR\ÚJ˜˜\ÙMœ›ÛPž]\ÊJK˜ÛÙR\ÚOO]›ÚYÙK˜ÛÙR\Ú›™]ÈZ[\œ˜^JJKŸKœ›ÛT\X[
J^Û]^

NÜ™]\›ˆ‹˜]]Üš]OYK˜]]Üš]OÏÈˆ‹‹Ø\ÛPž]PÛÙOYKØ\ÛPž]PÛÙOÏÛ™]ÈZ[\œ˜^KKš[œÝ[X]T\›Z\ÜÚ[ÛˆOO]›ÚY	‰™Kš[œÝ[X]T\›Z\ÜÚ[ÛˆOO[[	‰Š‹š[œÝ[X]T\›Z\ÜÚ[ÛZ\‹XØÙ\ÜÐÛÛ™šYË™œ›ÛT\X[
Kš[œÝ[X]T\›Z\ÜÚ[ÛŠJK‹[œ[ÛÙOYK[œ[ÛÙOÏÈLK‹˜YZ[YK˜YZ[ÏÈˆ‹‹›X™[YK›X™[ÏÈˆ‹‹›\ÙÏYK›\ÙÏÏÛ™]ÈZ[\œ˜^K‹™[™ÏYK™[™ÏË›X\
OšÚKÛÚ[‹™œ›ÛT\X[

J_×K‹œÛÝ\˜ÙOYKœÛÝ\˜ÙOÏÈˆ‹‹˜Z[\YK˜Z[\ÏÈˆ‹‹˜ÛÙR\ÚYK˜ÛÙR\ÚÏÛ™]ÈZ[\œ˜^KŸ_NÙ[˜Ý[Ûˆ‘

^Ü™]\›žØY™\ÜÎˆˆ‹]N›™]ÈZ[\œ˜^__UË“\ÙÔÝÜ™P[™[œÝ[X]PÛÛ˜XÝ™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÔÝÜ™P[™[œÝ[X]PÛÛ˜XÝ™\ÜÛœÙH‹[˜ÛÙJKQ‹š[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK˜Y™\ÜÈOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊK˜Y™\ÜÊKK™]K›[™ÝOOL	‰›‹Z[ÌŠN
K˜ž]\ÊK™]JKŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ‹š[˜\žT™XY\ÙN›™]È‹š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹R‘

NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹˜Y™\ÜÏ]œÝš[™Ê
NØœ™XZÎØØ\ÙHŽœ‹™]O]˜ž]\Ê
NØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]R‘

NÜ™]\›Šš\ÔÙ]
JK˜Y™\ÜÊI‰Š‹˜Y™\ÜÏTÝš[™ÊK˜Y™\ÜÊJK
š\ÔÙ]
JK™]JI‰Š‹™]OJ˜ž]\Ñœ›ÛP˜\ÙM
JK™]JJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK˜Y™\ÜÈOO]›ÚY	‰Š‹˜Y™\ÜÏYK˜Y™\ÜÊKK™]HOO]›ÚY	‰Š‹™]OJ˜˜\ÙMœ›ÛPž]\ÊJK™]HOO]›ÚYÙK™]N›™]ÈZ[\œ˜^JJKŸKœ›ÛT\X[
J^Û]R‘

NÜ™]\›ˆ‹˜Y™\ÜÏYK˜Y™\ÜÏÏÈˆ‹‹™]OYK™]OÏÛ™]ÈZ[\œ˜^KŸ_NÙ[˜Ý[ÛˆQ

^Ü™]\›žØ]]Üš]Nˆˆ‹Y™\ÜÙ\Î–×__UË“\ÙÐYÛÙU\ØY\˜[\ÐY™\ÜÙ\Ï^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÐYÛÙU\ØY\˜[\ÐY™\ÜÙ\È‹[˜ÛÙJKQ‹š[˜\žUÜš]\‹˜Ü™X]J
J^ÙK˜]]Üš]HOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊK˜]]Üš]JNÙ›ÜŠ]ÙˆK˜Y™\ÜÙ\Ê[‹Z[ÌŠN
KœÝš[™Ê
NÜ™]\›ˆŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ‹š[˜\žT™XY\ÙN›™]È‹š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹\Q

NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹˜]]Üš]O]œÝš[™Ê
NØœ™XZÎØØ\ÙHŽœ‹˜Y™\ÜÙ\Ëœ\Ú
œÝš[™Ê
JNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]\Q

NÜ™]\›Šš\ÔÙ]
JK˜]]Üš]JI‰Š‹˜]]Üš]OTÝš[™ÊK˜]]Üš]JJK\œ˜^Kš\Ð\œ˜^JOË˜Y™\ÜÙ\ÊI‰Š‹˜Y™\ÜÙ\ÏYK˜Y™\ÜÙ\Ë›X\
O”Ýš[™Ê
JJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK˜]]Üš]HOO]›ÚY	‰Š‹˜]]Üš]OYK˜]]Üš]JKK˜Y™\ÜÙ\ÏÛ‹˜Y™\ÜÙ\ÏYK˜Y™\ÜÙ\Ë›X\
O
N›‹˜Y™\ÜÙ\ÏV×KŸKœ›ÛT\X[
J^Û]\Q

NÜ™]\›ˆ‹˜]]Üš]OYK˜]]Üš]OÏÈˆ‹‹˜Y™\ÜÙ\ÏYK˜Y™\ÜÙ\ÏË›X\
O
_×KŸ_NÙ[˜Ý[Ûˆ‘

^Ü™]\›žß_UË“\ÙÐYÛÙU\ØY\˜[\ÐY™\ÜÙ\Ô™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÐYÛÙU\ØY\˜[\ÐY™\ÜÙ\Ô™\ÜÛœÙH‹[˜ÛÙJKQ‹š[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ‹š[˜\žT™XY\ÙN›™]È‹š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹Q‘

NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Ü™]\›ˆ‘

_KÒ”ÓÓŠJ^Ü™]\›žß_Kœ›ÛT\X[
J^Ü™]\›ˆ‘

__NÙ[˜Ý[ÛˆQ

^Ü™]\›žØ]]Üš]Nˆˆ‹Y™\ÜÙ\Î–×__UË“\ÙÔ™[[Ý™PÛÙU\ØY\˜[\ÐY™\ÜÙ\Ï^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÔ™[[Ý™PÛÙU\ØY\˜[\ÐY™\ÜÙ\È‹[˜ÛÙJKQ‹š[˜\žUÜš]\‹˜Ü™X]J
J^ÙK˜]]Üš]HOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊK˜]]Üš]JNÙ›ÜŠ]ÙˆK˜Y™\ÜÙ\Ê[‹Z[ÌŠN
KœÝš[™Ê
NÜ™]\›ˆŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ‹š[˜\žT™XY\ÙN›™]È‹š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹SQ

NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹˜]]Üš]O]œÝš[™Ê
NØœ™XZÎØØ\ÙHŽœ‹˜Y™\ÜÙ\Ëœ\Ú
œÝš[™Ê
JNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]SQ

NÜ™]\›Šš\ÔÙ]
JK˜]]Üš]JI‰Š‹˜]]Üš]OTÝš[™ÊK˜]]Üš]JJK\œ˜^Kš\Ð\œ˜^JOË˜Y™\ÜÙ\ÊI‰Š‹˜Y™\ÜÙ\ÏYK˜Y™\ÜÙ\Ë›X\
O”Ýš[™Ê
JJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK˜]]Üš]HOO]›ÚY	‰Š‹˜]]Üš]OYK˜]]Üš]JKK˜Y™\ÜÙ\ÏÛ‹˜Y™\ÜÙ\ÏYK˜Y™\ÜÙ\Ë›X\
O
N›‹˜Y™\ÜÙ\ÏV×KŸKœ›ÛT\X[
J^Û]SQ

NÜ™]\›ˆ‹˜]]Üš]OYK˜]]Üš]OÏÈˆ‹‹˜Y™\ÜÙ\ÏYK˜Y™\ÜÙ\ÏË›X\
O
_×KŸ_NÙ[˜Ý[Ûˆ

^Ü™]\›žß_UË“\ÙÔ™[[Ý™PÛÙU\ØY\˜[\ÐY™\ÜÙ\Ô™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÔ™[[Ý™PÛÙU\ØY\˜[\ÐY™\ÜÙ\Ô™\ÜÛœÙH‹[˜ÛÙJKQ‹š[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ‹š[˜\žT™XY\ÙN›™]È‹š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹R

NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Ü™]\›ˆ

_KÒ”ÓÓŠJ^Ü™]\›žß_Kœ›ÛT\X[
J^Ü™]\›ˆ

__NÙ[˜Ý[ÛˆÑ

^Ü™]\›žØ]]Üš]Nˆˆ‹Ø\ÛPž]PÛÙN›™]ÈZ[\œ˜^K[œÝ[X]T\›Z\ÜÚ[ÛŽ›ÚYÛÛ˜XÝˆˆ‹\ÙÎ›™]ÈZ[\œ˜^__UË“\ÙÔÝÜ™P[™ZYÜ˜]PÛÛ˜XÝ^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÔÝÜ™P[™ZYÜ˜]PÛÛ˜XÝ‹[˜ÛÙJKQ‹š[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK˜]]Üš]HOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊK˜]]Üš]JKKØ\ÛPž]PÛÙK›[™ÝOOL	‰›‹Z[ÌŠN
K˜ž]\ÊKØ\ÛPž]PÛÙJKKš[œÝ[X]T\›Z\ÜÚ[ÛˆOO]›ÚY	‰š\‹XØÙ\ÜÐÛÛ™šYË™[˜ÛÙJKš[œÝ[X]T\›Z\ÜÚ[Û‹‹Z[ÌŠŠK™›ÜšÊ
JK›[[J
KK˜ÛÛ˜XÝOOHˆ‰‰›‹Z[ÌŠÍ
KœÝš[™ÊK˜ÛÛ˜XÝ
KK›\ÙË›[™ÝOOL	‰›‹Z[ÌŠŠK˜ž]\ÊK›\ÙÊKŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ‹š[˜\žT™XY\ÙN›™]È‹š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹WÑ

NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹˜]]Üš]O]œÝš[™Ê
NØœ™XZÎØØ\ÙHŽœ‹Ø\ÛPž]PÛÙO]˜ž]\Ê
NØœ™XZÎØØ\ÙHÎœ‹š[œÝ[X]T\›Z\ÜÚ[ÛZ\‹XØÙ\ÜÐÛÛ™šYË™XÛÙJZ[ÌŠ
JNØœ™XZÎØØ\ÙHœ‹˜ÛÛ˜XÝ]œÝš[™Ê
NØœ™XZÎØØ\ÙHNœ‹›\ÙÏ]˜ž]\Ê
NØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]WÑ

NÜ™]\›Šš\ÔÙ]
JK˜]]Üš]JI‰Š‹˜]]Üš]OTÝš[™ÊK˜]]Üš]JJK
š\ÔÙ]
JKØ\ÛPž]PÛÙJI‰Š‹Ø\ÛPž]PÛÙOJ˜ž]\Ñœ›ÛP˜\ÙM
JKØ\ÛPž]PÛÙJJK
š\ÔÙ]
JKš[œÝ[X]T\›Z\ÜÚ[ÛŠI‰Š‹š[œÝ[X]T\›Z\ÜÚ[ÛZ\‹XØÙ\ÜÐÛÛ™šYË™œ›ÛR”ÓÓŠKš[œÝ[X]T\›Z\ÜÚ[ÛŠJK
š\ÔÙ]
JK˜ÛÛ˜XÝ
I‰Š‹˜ÛÛ˜XÝTÝš[™ÊK˜ÛÛ˜XÝ
JK
š\ÔÙ]
JK›\ÙÊI‰Š‹›\ÙÏJ˜ž]\Ñœ›ÛP˜\ÙM
JK›\ÙÊJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK˜]]Üš]HOO]›ÚY	‰Š‹˜]]Üš]OYK˜]]Üš]JKKØ\ÛPž]PÛÙHOO]›ÚY	‰Š‹Ø\ÛPž]PÛÙOJ˜˜\ÙMœ›ÛPž]\ÊJKØ\ÛPž]PÛÙHOO]›ÚYÙKØ\ÛPž]PÛÙN›™]ÈZ[\œ˜^JJKKš[œÝ[X]T\›Z\ÜÚ[ÛˆOO]›ÚY	‰Š‹š[œÝ[X]T\›Z\ÜÚ[ÛYKš[œÝ[X]T\›Z\ÜÚ[ÛÚ\‹XØÙ\ÜÐÛÛ™šYËÒ”ÓÓŠKš[œÝ[X]T\›Z\ÜÚ[ÛŠN›ÚY
KK˜ÛÛ˜XÝOO]›ÚY	‰Š‹˜ÛÛ˜XÝYK˜ÛÛ˜XÝ
KK›\ÙÈOO]›ÚY	‰Š‹›\ÙÏJ˜˜\ÙMœ›ÛPž]\ÊJK›\ÙÈOO]›ÚYÙK›\ÙÎ›™]ÈZ[\œ˜^JJKŸKœ›ÛT\X[
J^Û]WÑ

NÜ™]\›ˆ‹˜]]Üš]OYK˜]]Üš]OÏÈˆ‹‹Ø\ÛPž]PÛÙOYKØ\ÛPž]PÛÙOÏÛ™]ÈZ[\œ˜^KKš[œÝ[X]T\›Z\ÜÚ[ÛˆOO]›ÚY	‰™Kš[œÝ[X]T\›Z\ÜÚ[ÛˆOO[[	‰Š‹š[œÝ[X]T\›Z\ÜÚ[ÛZ\‹XØÙ\ÜÐÛÛ™šYË™œ›ÛT\X[
Kš[œÝ[X]T\›Z\ÜÚ[ÛŠJK‹˜ÛÛ˜XÝYK˜ÛÛ˜XÝÏÈˆ‹‹›\ÙÏYK›\ÙÏÏÛ™]ÈZ[\œ˜^KŸ_NÙ[˜Ý[ÛˆÑ

^Ü™]\›žØÛÙRYšYÒ[

KÚXÚÜÝ[N›™]ÈZ[\œ˜^K]N›™]ÈZ[\œ˜^__UË“\ÙÔÝÜ™P[™ZYÜ˜]PÛÛ˜XÝ™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÔÝÜ™P[™ZYÜ˜]PÛÛ˜XÝ™\ÜÛœÙH‹[˜ÛÙJKQ‹š[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK˜ÛÙRYOOPšYÒ[

I‰›‹Z[ÌŠ
KZ[
K˜ÛÙRY
KK˜ÚXÚÜÝ[K›[™ÝOOL	‰›‹Z[ÌŠN
K˜ž]\ÊK˜ÚXÚÜÝ[JKK™]K›[™ÝOOL	‰›‹Z[ÌŠŠK˜ž]\ÊK™]JKŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ‹š[˜\žT™XY\ÙN›™]È‹š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹QÑ

NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹˜ÛÙRY]Z[

NØœ™XZÎØØ\ÙHŽœ‹˜ÚXÚÜÝ[O]˜ž]\Ê
NØœ™XZÎØØ\ÙHÎœ‹™]O]˜ž]\Ê
NØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]QÑ

NÜ™]\›Šš\ÔÙ]
JK˜ÛÙRY
I‰Š‹˜ÛÙRYPšYÒ[
K˜ÛÙRYÔÝš[™Ê
JJK
š\ÔÙ]
JK˜ÚXÚÜÝ[JI‰Š‹˜ÚXÚÜÝ[OJ˜ž]\Ñœ›ÛP˜\ÙM
JK˜ÚXÚÜÝ[JJK
š\ÔÙ]
JK™]JI‰Š‹™]OJ˜ž]\Ñœ›ÛP˜\ÙM
JK™]JJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK˜ÛÙRYOO]›ÚY	‰Š‹˜ÛÙRYJK˜ÛÙRYšYÒ[

JKÔÝš[™Ê
JKK˜ÚXÚÜÝ[HOO]›ÚY	‰Š‹˜ÚXÚÜÝ[OJ˜˜\ÙMœ›ÛPž]\ÊJK˜ÚXÚÜÝ[HOO]›ÚYÙK˜ÚXÚÜÝ[N›™]ÈZ[\œ˜^JJKK™]HOO]›ÚY	‰Š‹™]OJ˜˜\ÙMœ›ÛPž]\ÊJK™]HOO]›ÚYÙK™]N›™]ÈZ[\œ˜^JJKŸKœ›ÛT\X[
J^Û]QÑ

NÜ™]\›ˆK˜ÛÙRYOO]›ÚY	‰™K˜ÛÙRYOO[[	‰Š‹˜ÛÙRYPšYÒ[
K˜ÛÙRYÔÝš[™Ê
JJK‹˜ÚXÚÜÝ[OYK˜ÚXÚÜÝ[OÏÛ™]ÈZ[\œ˜^K‹™]OYK™]OÏÛ™]ÈZ[\œ˜^KŸ_NÙ[˜Ý[Ûˆ‘

^Ü™]\›žÜÙ[™\Žˆˆ‹™]ÓX™[ˆˆ‹ÛÛ˜XÝˆˆŸ_UË“\ÙÕ\]PÛÛ˜XÝX™[^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÕ\]PÛÛ˜XÝX™[‹[˜ÛÙJKQ‹š[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆKœÙ[™\ˆOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊKœÙ[™\ŠKK›™]ÓX™[OOHˆ‰‰›‹Z[ÌŠN
KœÝš[™ÊK›™]ÓX™[
KK˜ÛÛ˜XÝOOHˆ‰‰›‹Z[ÌŠŠKœÝš[™ÊK˜ÛÛ˜XÝ
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ‹š[˜\žT™XY\ÙN›™]È‹š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹U‘

NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹œÙ[™\]œÝš[™Ê
NØœ™XZÎØØ\ÙHŽœ‹›™]ÓX™[]œÝš[™Ê
NØœ™XZÎØØ\ÙHÎœ‹˜ÛÛ˜XÝ]œÝš[™Ê
NØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]U‘

NÜ™]\›Šš\ÔÙ]
JKœÙ[™\ŠI‰Š‹œÙ[™\TÝš[™ÊKœÙ[™\ŠJK
š\ÔÙ]
JK›™]ÓX™[
I‰Š‹›™]ÓX™[TÝš[™ÊK›™]ÓX™[
JK
š\ÔÙ]
JK˜ÛÛ˜XÝ
I‰Š‹˜ÛÛ˜XÝTÝš[™ÊK˜ÛÛ˜XÝ
JKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆKœÙ[™\ˆOO]›ÚY	‰Š‹œÙ[™\YKœÙ[™\ŠKK›™]ÓX™[OO]›ÚY	‰Š‹›™]ÓX™[YK›™]ÓX™[
KK˜ÛÛ˜XÝOO]›ÚY	‰Š‹˜ÛÛ˜XÝYK˜ÛÛ˜XÝ
KŸKœ›ÛT\X[
J^Û]U‘

NÜ™]\›ˆ‹œÙ[™\YKœÙ[™\ÏÈˆ‹‹›™]ÓX™[YK›™]ÓX™[ÏÈˆ‹‹˜ÛÛ˜XÝYK˜ÛÛ˜XÝÏÈˆ‹Ÿ_NÙ[˜Ý[ÛˆÑ

^Ü™]\›žß_UË“\ÙÕ\]PÛÛ˜XÝX™[™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÕ\]PÛÛ˜XÝX™[™\ÜÛœÙH‹[˜ÛÙJKQ‹š[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ‹š[˜\žT™XY\ÙN›™]È‹š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹UÑ

NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Ü™]\›ˆÑ

_KÒ”ÓÓŠJ^Ü™]\›žß_Kœ›ÛT\X[
J^Ü™]\›ˆÑ

__NÝ˜\ˆÑXÛ\ÜÞÜœÎØÛÛœÝXÝÜŠŠ^Ý\ËœœÏ[‹\Ë”ÝÜ™PÛÙO]\Ë”ÝÜ™PÛÙK˜š[™
\ÊK\Ë’[œÝ[X]PÛÛ˜XÝ]\Ë’[œÝ[X]PÛÛ˜XÝ˜š[™
\ÊK\Ë’[œÝ[X]PÛÛ˜XÝ]\Ë’[œÝ[X]PÛÛ˜XÝ‹˜š[™
\ÊK\Ë‘^XÝ]PÛÛ˜XÝ]\Ë‘^XÝ]PÛÛ˜XÝ˜š[™
\ÊK\Ë“ZYÜ˜]PÛÛ˜XÝ]\Ë“ZYÜ˜]PÛÛ˜XÝ˜š[™
\ÊK\Ë•\]PYZ[]\Ë•\]PYZ[‹˜š[™
\ÊK\ËÛX\YZ[]\ËÛX\YZ[‹˜š[™
\ÊK\Ë•\]R[œÝ[X]PÛÛ™šYÏ]\Ë•\]R[œÝ[X]PÛÛ™šYË˜š[™
\ÊK\Ë•\]T\˜[\Ï]\Ë•\]T\˜[\Ë˜š[™
\ÊK\Ë”ÝYÐÛÛ˜XÝ]\Ë”ÝYÐÛÛ˜XÝ˜š[™
\ÊK\Ë”[ÛÙ\Ï]\Ë”[ÛÙ\Ë˜š[™
\ÊK\Ë•[œ[ÛÙ\Ï]\Ë•[œ[ÛÙ\Ë˜š[™
\ÊK\Ë”ÝÜ™P[™[œÝ[X]PÛÛ˜XÝ]\Ë”ÝÜ™P[™[œÝ[X]PÛÛ˜XÝ˜š[™
\ÊK\Ë”™[[Ý™PÛÙU\ØY\˜[\ÐY™\ÜÙ\Ï]\Ë”™[[Ý™PÛÙU\ØY\˜[\ÐY™\ÜÙ\Ë˜š[™
\ÊK\ËYÛÙU\ØY\˜[\ÐY™\ÜÙ\Ï]\ËYÛÙU\ØY\˜[\ÐY™\ÜÙ\Ë˜š[™
\ÊK\Ë”ÝÜ™P[™ZYÜ˜]PÛÛ˜XÝ]\Ë”ÝÜ™P[™ZYÜ˜]PÛÛ˜XÝ˜š[™
\ÊK\Ë•\]PÛÛ˜XÝX™[]\Ë•\]PÛÛ˜XÝX™[˜š[™
\Ê_TÝÜ™PÛÙJŠ^Û]UË“\ÙÔÝÜ™PÛÙK™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÈ‹”ÝÜ™PÛÙH‹
K[ŠO•Ë“\ÙÔÝÜ™PÛÙT™\ÜÛœÙK™XÛÙJ™]È‹š[˜\žT™XY\ŠŠJJ_R[œÝ[X]PÛÛ˜XÝ
Š^Û]UË“\ÙÒ[œÝ[X]PÛÛ˜XÝ™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÈ‹’[œÝ[X]PÛÛ˜XÝ‹
K[ŠO•Ë“\ÙÒ[œÝ[X]PÛÛ˜XÝ™\ÜÛœÙK™XÛÙJ™]È‹š[˜\žT™XY\ŠŠJJ_R[œÝ[X]PÛÛ˜XÝŠŠ^Û]UË“\ÙÒ[œÝ[X]PÛÛ˜XÝ‹™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÈ‹’[œÝ[X]PÛÛ˜XÝˆ‹
K[ŠO•Ë“\ÙÒ[œÝ[X]PÛÛ˜XÝ”™\ÜÛœÙK™XÛÙJ™]È‹š[˜\žT™XY\ŠŠJJ_Q^XÝ]PÛÛ˜XÝ
Š^Û]UË“\ÙÑ^XÝ]PÛÛ˜XÝ™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÈ‹‘^XÝ]PÛÛ˜XÝ‹
K[ŠO•Ë“\ÙÑ^XÝ]PÛÛ˜XÝ™\ÜÛœÙK™XÛÙJ™]È‹š[˜\žT™XY\ŠŠJJ_SZYÜ˜]PÛÛ˜XÝ
Š^Û]UË“\ÙÓZYÜ˜]PÛÛ˜XÝ™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÈ‹“ZYÜ˜]PÛÛ˜XÝ‹
K[ŠO•Ë“\ÙÓZYÜ˜]PÛÛ˜XÝ™\ÜÛœÙK™XÛÙJ™]È‹š[˜\žT™XY\ŠŠJJ_U\]PYZ[ŠŠ^Û]UË“\ÙÕ\]PYZ[‹™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÈ‹•\]PYZ[ˆ‹
K[ŠO•Ë“\ÙÕ\]PYZ[”™\ÜÛœÙK™XÛÙJ™]È‹š[˜\žT™XY\ŠŠJJ_PÛX\YZ[ŠŠ^Û]UË“\ÙÐÛX\YZ[‹™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÈ‹ÛX\YZ[ˆ‹
K[ŠO•Ë“\ÙÐÛX\YZ[”™\ÜÛœÙK™XÛÙJ™]È‹š[˜\žT™XY\ŠŠJJ_U\]R[œÝ[X]PÛÛ™šYÊŠ^Û]UË“\ÙÕ\]R[œÝ[X]PÛÛ™šYË™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÈ‹•\]R[œÝ[X]PÛÛ™šYÈ‹
K[ŠO•Ë“\ÙÕ\]R[œÝ[X]PÛÛ™šYÔ™\ÜÛœÙK™XÛÙJ™]È‹š[˜\žT™XY\ŠŠJJ_U\]T\˜[\ÊŠ^Û]UË“\ÙÕ\]T\˜[\Ë™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÈ‹•\]T\˜[\È‹
K[ŠO•Ë“\ÙÕ\]T\˜[\Ô™\ÜÛœÙK™XÛÙJ™]È‹š[˜\žT™XY\ŠŠJJ_TÝYÐÛÛ˜XÝ
Š^Û]UË“\ÙÔÝYÐÛÛ˜XÝ™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÈ‹”ÝYÐÛÛ˜XÝ‹
K[ŠO•Ë“\ÙÔÝYÐÛÛ˜XÝ™\ÜÛœÙK™XÛÙJ™]È‹š[˜\žT™XY\ŠŠJJ_T[ÛÙ\ÊŠ^Û]UË“\ÙÔ[ÛÙ\Ë™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÈ‹”[ÛÙ\È‹
K[ŠO•Ë“\ÙÔ[ÛÙ\Ô™\ÜÛœÙK™XÛÙJ™]È‹š[˜\žT™XY\ŠŠJJ_U[œ[ÛÙ\ÊŠ^Û]UË“\ÙÕ[œ[ÛÙ\Ë™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÈ‹•[œ[ÛÙ\È‹
K[ŠO•Ë“\ÙÕ[œ[ÛÙ\Ô™\ÜÛœÙK™XÛÙJ™]È‹š[˜\žT™XY\ŠŠJJ_TÝÜ™P[™[œÝ[X]PÛÛ˜XÝ
Š^Û]UË“\ÙÔÝÜ™P[™[œÝ[X]PÛÛ˜XÝ™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÈ‹”ÝÜ™P[™[œÝ[X]PÛÛ˜XÝ‹
K[ŠO•Ë“\ÙÔÝÜ™P[™[œÝ[X]PÛÛ˜XÝ™\ÜÛœÙK™XÛÙJ™]È‹š[˜\žT™XY\ŠŠJJ_T™[[Ý™PÛÙU\ØY\˜[\ÐY™\ÜÙ\ÊŠ^Û]UË“\ÙÔ™[[Ý™PÛÙU\ØY\˜[\ÐY™\ÜÙ\Ë™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÈ‹”™[[Ý™PÛÙU\ØY\˜[\ÐY™\ÜÙ\È‹
K[ŠO•Ë“\ÙÔ™[[Ý™PÛÙU\ØY\˜[\ÐY™\ÜÙ\Ô™\ÜÛœÙK™XÛÙJ™]È‹š[˜\žT™XY\ŠŠJJ_PYÛÙU\ØY\˜[\ÐY™\ÜÙ\ÊŠ^Û]UË“\ÙÐYÛÙU\ØY\˜[\ÐY™\ÜÙ\Ë™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÈ‹YÛÙU\ØY\˜[\ÐY™\ÜÙ\È‹
K[ŠO•Ë“\ÙÐYÛÙU\ØY\˜[\ÐY™\ÜÙ\Ô™\ÜÛœÙK™XÛÙJ™]È‹š[˜\žT™XY\ŠŠJJ_TÝÜ™P[™ZYÜ˜]PÛÛ˜XÝ
Š^Û]UË“\ÙÔÝÜ™P[™ZYÜ˜]PÛÛ˜XÝ™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÈ‹”ÝÜ™P[™ZYÜ˜]PÛÛ˜XÝ‹
K[ŠO•Ë“\ÙÔÝÜ™P[™ZYÜ˜]PÛÛ˜XÝ™\ÜÛœÙK™XÛÙJ™]È‹š[˜\žT™XY\ŠŠJJ_U\]PÛÛ˜XÝX™[
Š^Û]UË“\ÙÕ\]PÛÛ˜XÝX™[™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÈ‹•\]PÛÛ˜XÝX™[‹
K[ŠO•Ë“\ÙÕ\]PÛÛ˜XÝX™[™\ÜÛœÙK™XÛÙJ™]È‹š[˜\žT™XY\ŠŠJJ__NÕË“\ÙÐÛY[[\RÑJNÝ˜\ˆRJ\ÏOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\J\Ë—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÑ\ËØ\ÛU\\Ï]›ÚYÑ\Ëš\Ó\ÙÔÝÜ™PÛÙQ[˜ÛÙSØš™XÝX[ÙNÑ\Ëš\Ó\ÙÒ[œÝ[X]PÛÛ˜XÝ[˜ÛÙSØš™XÝ\ÛÙNÑ\Ëš\Ó\ÙÒ[œÝ[X]PÛÛ˜XÝ‘[˜ÛÙSØš™XÝYÙNÑ\Ëš\Ó\ÙÕ\]PYZ[‘[˜ÛÙSØš™XÝXÛÙNÑ\Ëš\Ó\ÙÐÛX\YZ[‘[˜ÛÙSØš™XÝ][ÙNÑ\Ëš\Ó\ÙÓZYÜ˜]Q[˜ÛÙSØš™XÝP[ÙNÑ\Ëš\Ó\ÙÑ^XÝ]Q[˜ÛÙSØš™XÝY›ÙNÝ˜\ˆOS

NÑ\ËØ\ÛU\\ÏVÖÈ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÐÛX\YZ[ˆ‹K“\ÙÐÛX\YZ[—KÈ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÑ^XÝ]PÛÛ˜XÝ‹K“\ÙÑ^XÝ]PÛÛ˜XÝKÈ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÓZYÜ˜]PÛÛ˜XÝ‹K“\ÙÓZYÜ˜]PÛÛ˜XÝKÈ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÔÝÜ™PÛÙH‹K“\ÙÔÝÜ™PÛÙWKÈ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÒ[œÝ[X]PÛÛ˜XÝ‹K“\ÙÒ[œÝ[X]PÛÛ˜XÝKÈ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÒ[œÝ[X]PÛÛ˜XÝˆ‹K“\ÙÒ[œÝ[X]PÛÛ˜XÝ—KÈ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÕ\]PYZ[ˆ‹K“\ÙÕ\]PYZ[—WNÙ[˜Ý[Ûˆ[ÙJJ^Ü™]\›ˆK\U\›OOH‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÔÝÜ™PÛÙHŸY[˜Ý[ÛˆÛÙJJ^Ü™]\›ˆK\U\›OOH‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÒ[œÝ[X]PÛÛ˜XÝŸY[˜Ý[ÛˆÙJJ^Ü™]\›ˆK\U\›OOH‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÒ[œÝ[X]PÛÛ˜XÝˆŸY[˜Ý[ÛˆÛÙJJ^Ü™]\›ˆK\U\›OOH‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÕ\]PYZ[ˆŸY[˜Ý[Ûˆ[ÙJJ^Ü™]\›ˆK\U\›OOH‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÐÛX\YZ[ˆŸY[˜Ý[Ûˆ[ÙJJ^Ü™]\›ˆK\U\›OOH‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÓZYÜ˜]PÛÛ˜XÝŸY[˜Ý[Ûˆ›ÙJJ^Ü™]\›ˆK\U\›OOH‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÑ^XÝ]PÛÛ˜XÝŸ_JNÝ˜\ˆÕRJÏOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\JË—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÒË”]Y\žPÛY[[\RË”]Y\žPZ[Y™\ÜÔ™\ÜÛœÙORË”]Y\žPZ[Y™\ÜÔ™\]Y\ÝRË”]Y\žUØ\ÛS[Z]ÐÛÛ™šYÔ™\ÜÛœÙORË”]Y\žUØ\ÛS[Z]ÐÛÛ™šYÔ™\]Y\ÝRË”]Y\žPÛÛ˜XÝÐžPÜ™X]Ü”™\ÜÛœÙORË”]Y\žPÛÛ˜XÝÐžPÜ™X]Ü”™\]Y\ÝRË”]Y\žT\˜[\Ô™\ÜÛœÙORË”]Y\žT\˜[\Ô™\]Y\ÝRË”]Y\žT[›™YÛÙ\Ô™\ÜÛœÙORË”]Y\žT[›™YÛÙ\Ô™\]Y\ÝRË”]Y\žPÛÙ\Ô™\ÜÛœÙORË”]Y\žPÛÙ\Ô™\]Y\ÝRË”]Y\žPÛÙT™\ÜÛœÙORËÛÙR[™›Ô™\ÜÛœÙORË”]Y\žPÛÙR[™›Ô™\ÜÛœÙORË”]Y\žPÛÙR[™›Ô™\]Y\ÝRË”]Y\žPÛÙT™\]Y\ÝRË”]Y\žTÛX\ÛÛ˜XÝÝ]T™\ÜÛœÙORË”]Y\žTÛX\ÛÛ˜XÝÝ]T™\]Y\ÝRË”]Y\žT˜]ÐÛÛ˜XÝÝ]T™\ÜÛœÙORË”]Y\žT˜]ÐÛÛ˜XÝÝ]T™\]Y\ÝRË”]Y\žP[ÛÛ˜XÝÝ]T™\ÜÛœÙORË”]Y\žP[ÛÛ˜XÝÝ]T™\]Y\ÝRË”]Y\žPÛÛ˜XÝÐžPÛÙT™\ÜÛœÙORË”]Y\žPÛÛ˜XÝÐžPÛÙT™\]Y\ÝRË”]Y\žPÛÛ˜XÝ\ÝÜžT™\ÜÛœÙORË”]Y\žPÛÛ˜XÝ\ÝÜžT™\]Y\ÝRË”]Y\žPÛÛ˜XÝ[™›Ô™\ÜÛœÙORË”]Y\žPÛÛ˜XÝ[™›Ô™\]Y\ÝRËœ›ÝØY”XÚØYÙO]›ÚYÝ˜\ˆÙOZšJ
KÝV™Ê
KTÙJ
KOQYJ
NÒËœ›ÝØY”XÚØYÙOH˜ÛÜÛ]Ø\ÛKØ\ÛKŒHŽÙ[˜Ý[ÛˆQ

^Ü™]\›žØY™\ÜÎˆˆŸ_RË”]Y\žPÛÛ˜XÝ[™›Ô™\]Y\Ý^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK”]Y\žPÛÛ˜XÝ[™›Ô™\]Y\Ý‹[˜ÛÙJKSš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK˜Y™\ÜÈOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊK˜Y™\ÜÊKŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆš[˜\žT™XY\ÙN›™]Èš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹VQ

NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÛÏŒÏOOLOÜ‹˜Y™\ÜÏ]œÝš[™Ê
NœÚÚ\\JÉÊ_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]VQ

NÜ™]\›ŠKš\ÔÙ]
JK˜Y™\ÜÊI‰Š‹˜Y™\ÜÏTÝš[™ÊK˜Y™\ÜÊJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK˜Y™\ÜÈOO]›ÚY	‰Š‹˜Y™\ÜÏYK˜Y™\ÜÊKŸKœ›ÛT\X[
J^Û]VQ

NÜ™]\›ˆ‹˜Y™\ÜÏYK˜Y™\ÜÏÏÈˆ‹Ÿ_NÙ[˜Ý[Ûˆ‘

^Ü™]\›žØY™\ÜÎˆˆ‹ÛÛ˜XÝ[™›ÎÝÛÛ˜XÝ[™›Ë™œ›ÛT\X[
ßJ__RË”]Y\žPÛÛ˜XÝ[™›Ô™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK”]Y\žPÛÛ˜XÝ[™›Ô™\ÜÛœÙH‹[˜ÛÙJKSš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK˜Y™\ÜÈOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊK˜Y™\ÜÊKK˜ÛÛ˜XÝ[™›ÈOO]›ÚY	‰ÝÛÛ˜XÝ[™›Ë™[˜ÛÙJK˜ÛÛ˜XÝ[™›Ë‹Z[ÌŠN
K™›ÜšÊ
JK›[[J
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆš[˜\žT™XY\ÙN›™]Èš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹^‘

NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹˜Y™\ÜÏ]œÝš[™Ê
NØœ™XZÎØØ\ÙHŽœ‹˜ÛÛ˜XÝ[™›Ï]ÝÛÛ˜XÝ[™›Ë™XÛÙJZ[ÌŠ
JNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]^‘

NÜ™]\›ŠKš\ÔÙ]
JK˜Y™\ÜÊI‰Š‹˜Y™\ÜÏTÝš[™ÊK˜Y™\ÜÊJK
Kš\ÔÙ]
JK˜ÛÛ˜XÝ[™›ÊI‰Š‹˜ÛÛ˜XÝ[™›Ï]ÝÛÛ˜XÝ[™›Ë™œ›ÛR”ÓÓŠK˜ÛÛ˜XÝ[™›ÊJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK˜Y™\ÜÈOO]›ÚY	‰Š‹˜Y™\ÜÏYK˜Y™\ÜÊKK˜ÛÛ˜XÝ[™›ÈOO]›ÚY	‰Š‹˜ÛÛ˜XÝ[™›ÏYK˜ÛÛ˜XÝ[™›ÏÝÝÛÛ˜XÝ[™›ËÒ”ÓÓŠK˜ÛÛ˜XÝ[™›ÊN›ÚY
KŸKœ›ÛT\X[
J^Û]^‘

NÜ™]\›ˆ‹˜Y™\ÜÏYK˜Y™\ÜÏÏÈˆ‹K˜ÛÛ˜XÝ[™›ÈOO]›ÚY	‰™K˜ÛÛ˜XÝ[™›ÈOO[[	‰Š‹˜ÛÛ˜XÝ[™›Ï]ÝÛÛ˜XÝ[™›Ë™œ›ÛT\X[
K˜ÛÛ˜XÝ[™›ÊJKŸ_NÙ[˜Ý[Ûˆ‘

^Ü™]\›žØY™\ÜÎˆˆ‹YÚ[˜][ÛŽ›ÚY_RË”]Y\žPÛÛ˜XÝ\ÝÜžT™\]Y\Ý^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK”]Y\žPÛÛ˜XÝ\ÝÜžT™\]Y\Ý‹[˜ÛÙJKSš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK˜Y™\ÜÈOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊK˜Y™\ÜÊKKœYÚ[˜][ÛˆOO]›ÚY	‰•ÙK”YÙT™\]Y\Ý™[˜ÛÙJKœYÚ[˜][Û‹‹Z[ÌŠN
K™›ÜšÊ
JK›[[J
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆš[˜\žT™XY\ÙN›™]Èš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹V‘

NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹˜Y™\ÜÏ]œÝš[™Ê
NØœ™XZÎØØ\ÙHŽœ‹œYÚ[˜][ÛUÙK”YÙT™\]Y\Ý™XÛÙJZ[ÌŠ
JNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]V‘

NÜ™]\›ŠKš\ÔÙ]
JK˜Y™\ÜÊI‰Š‹˜Y™\ÜÏTÝš[™ÊK˜Y™\ÜÊJK
Kš\ÔÙ]
JKœYÚ[˜][ÛŠI‰Š‹œYÚ[˜][ÛUÙK”YÙT™\]Y\Ý™œ›ÛR”ÓÓŠKœYÚ[˜][ÛŠJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK˜Y™\ÜÈOO]›ÚY	‰Š‹˜Y™\ÜÏYK˜Y™\ÜÊKKœYÚ[˜][ÛˆOO]›ÚY	‰Š‹œYÚ[˜][ÛYKœYÚ[˜][ÛÕÙK”YÙT™\]Y\ÝÒ”ÓÓŠKœYÚ[˜][ÛŠN›ÚY
KŸKœ›ÛT\X[
J^Û]V‘

NÜ™]\›ˆ‹˜Y™\ÜÏYK˜Y™\ÜÏÏÈˆ‹KœYÚ[˜][ÛˆOO]›ÚY	‰™KœYÚ[˜][ÛˆOO[[	‰Š‹œYÚ[˜][ÛUÙK”YÙT™\]Y\Ý™œ›ÛT\X[
KœYÚ[˜][ÛŠJKŸ_NÙ[˜Ý[Ûˆ

^Ü™]\›žÙ[šY\Î–×KYÚ[˜][ÛŽ›ÚY_RË”]Y\žPÛÛ˜XÝ\ÝÜžT™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK”]Y\žPÛÛ˜XÝ\ÝÜžT™\ÜÛœÙH‹[˜ÛÙJKSš[˜\žUÜš]\‹˜Ü™X]J
J^Ù›ÜŠ]ÙˆK™[šY\Ê]ÝÛÛ˜XÝÛÙR\ÝÜžQ[žK™[˜ÛÙJ‹Z[ÌŠL
K™›ÜšÊ
JK›[[J
NÜ™]\›ˆKœYÚ[˜][ÛˆOO]›ÚY	‰•ÙK”YÙT™\ÜÛœÙK™[˜ÛÙJKœYÚ[˜][Û‹‹Z[ÌŠN
K™›ÜšÊ
JK›[[J
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆš[˜\žT™XY\ÙN›™]Èš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹V

NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹™[šY\Ëœ\Ú
ÝÛÛ˜XÝÛÙR\ÝÜžQ[žK™XÛÙJZ[ÌŠ
JJNØœ™XZÎØØ\ÙHŽœ‹œYÚ[˜][ÛUÙK”YÙT™\ÜÛœÙK™XÛÙJZ[ÌŠ
JNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]V

NÜ™]\›ˆ\œ˜^Kš\Ð\œ˜^JOË™[šY\ÊI‰Š‹™[šY\ÏYK™[šY\Ë›X\
OÝÛÛ˜XÝÛÙR\ÝÜžQ[žK™œ›ÛR”ÓÓŠ
JJK
Kš\ÔÙ]
JKœYÚ[˜][ÛŠI‰Š‹œYÚ[˜][ÛUÙK”YÙT™\ÜÛœÙK™œ›ÛR”ÓÓŠKœYÚ[˜][ÛŠJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK™[šY\ÏÛ‹™[šY\ÏYK™[šY\Ë›X\
OÝÝÛÛ˜XÝÛÙR\ÝÜžQ[žKÒ”ÓÓŠ
N›ÚY
N›‹™[šY\ÏV×KKœYÚ[˜][ÛˆOO]›ÚY	‰Š‹œYÚ[˜][ÛYKœYÚ[˜][ÛÕÙK”YÙT™\ÜÛœÙKÒ”ÓÓŠKœYÚ[˜][ÛŠN›ÚY
KŸKœ›ÛT\X[
J^Û]V

NÜ™]\›ˆ‹™[šY\ÏYK™[šY\ÏË›X\
OÝÛÛ˜XÝÛÙR\ÝÜžQ[žK™œ›ÛT\X[

J_×KKœYÚ[˜][ÛˆOO]›ÚY	‰™KœYÚ[˜][ÛˆOO[[	‰Š‹œYÚ[˜][ÛUÙK”YÙT™\ÜÛœÙK™œ›ÛT\X[
KœYÚ[˜][ÛŠJKŸ_NÙ[˜Ý[Ûˆ	

^Ü™]\›žØÛÙRYšYÒ[

KYÚ[˜][ÛŽ›ÚY_RË”]Y\žPÛÛ˜XÝÐžPÛÙT™\]Y\Ý^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK”]Y\žPÛÛ˜XÝÐžPÛÙT™\]Y\Ý‹[˜ÛÙJKSš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK˜ÛÙRYOOPšYÒ[

I‰›‹Z[ÌŠ
KZ[
K˜ÛÙRY
KKœYÚ[˜][ÛˆOO]›ÚY	‰•ÙK”YÙT™\]Y\Ý™[˜ÛÙJKœYÚ[˜][Û‹‹Z[ÌŠN
K™›ÜšÊ
JK›[[J
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆš[˜\žT™XY\ÙN›™]Èš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹I

NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹˜ÛÙRY]Z[

NØœ™XZÎØØ\ÙHŽœ‹œYÚ[˜][ÛUÙK”YÙT™\]Y\Ý™XÛÙJZ[ÌŠ
JNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]I

NÜ™]\›ŠKš\ÔÙ]
JK˜ÛÙRY
I‰Š‹˜ÛÙRYPšYÒ[
K˜ÛÙRYÔÝš[™Ê
JJK
Kš\ÔÙ]
JKœYÚ[˜][ÛŠI‰Š‹œYÚ[˜][ÛUÙK”YÙT™\]Y\Ý™œ›ÛR”ÓÓŠKœYÚ[˜][ÛŠJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK˜ÛÙRYOO]›ÚY	‰Š‹˜ÛÙRYJK˜ÛÙRYšYÒ[

JKÔÝš[™Ê
JKKœYÚ[˜][ÛˆOO]›ÚY	‰Š‹œYÚ[˜][ÛYKœYÚ[˜][ÛÕÙK”YÙT™\]Y\ÝÒ”ÓÓŠKœYÚ[˜][ÛŠN›ÚY
KŸKœ›ÛT\X[
J^Û]I

NÜ™]\›ˆK˜ÛÙRYOO]›ÚY	‰™K˜ÛÙRYOO[[	‰Š‹˜ÛÙRYPšYÒ[
K˜ÛÙRYÔÝš[™Ê
JJKKœYÚ[˜][ÛˆOO]›ÚY	‰™KœYÚ[˜][ÛˆOO[[	‰Š‹œYÚ[˜][ÛUÙK”YÙT™\]Y\Ý™œ›ÛT\X[
KœYÚ[˜][ÛŠJKŸ_NÙ[˜Ý[Ûˆ‘

^Ü™]\›žØÛÛ˜XÝÎ–×KYÚ[˜][ÛŽ›ÚY_RË”]Y\žPÛÛ˜XÝÐžPÛÙT™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK”]Y\žPÛÛ˜XÝÐžPÛÙT™\ÜÛœÙH‹[˜ÛÙJKSš[˜\žUÜš]\‹˜Ü™X]J
J^Ù›ÜŠ]ÙˆK˜ÛÛ˜XÝÊ[‹Z[ÌŠL
KœÝš[™Ê
NÜ™]\›ˆKœYÚ[˜][ÛˆOO]›ÚY	‰•ÙK”YÙT™\ÜÛœÙK™[˜ÛÙJKœYÚ[˜][Û‹‹Z[ÌŠN
K™›ÜšÊ
JK›[[J
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆš[˜\žT™XY\ÙN›™]Èš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹Z‘

NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹˜ÛÛ˜XÝËœ\Ú
œÝš[™Ê
JNØœ™XZÎØØ\ÙHŽœ‹œYÚ[˜][ÛUÙK”YÙT™\ÜÛœÙK™XÛÙJZ[ÌŠ
JNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]Z‘

NÜ™]\›ˆ\œ˜^Kš\Ð\œ˜^JOË˜ÛÛ˜XÝÊI‰Š‹˜ÛÛ˜XÝÏYK˜ÛÛ˜XÝË›X\
O”Ýš[™Ê
JJK
Kš\ÔÙ]
JKœYÚ[˜][ÛŠI‰Š‹œYÚ[˜][ÛUÙK”YÙT™\ÜÛœÙK™œ›ÛR”ÓÓŠKœYÚ[˜][ÛŠJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK˜ÛÛ˜XÝÏÛ‹˜ÛÛ˜XÝÏYK˜ÛÛ˜XÝË›X\
O
N›‹˜ÛÛ˜XÝÏV×KKœYÚ[˜][ÛˆOO]›ÚY	‰Š‹œYÚ[˜][ÛYKœYÚ[˜][ÛÕÙK”YÙT™\ÜÛœÙKÒ”ÓÓŠKœYÚ[˜][ÛŠN›ÚY
KŸKœ›ÛT\X[
J^Û]Z‘

NÜ™]\›ˆ‹˜ÛÛ˜XÝÏYK˜ÛÛ˜XÝÏË›X\
O
_×KKœYÚ[˜][ÛˆOO]›ÚY	‰™KœYÚ[˜][ÛˆOO[[	‰Š‹œYÚ[˜][ÛUÙK”YÙT™\ÜÛœÙK™œ›ÛT\X[
KœYÚ[˜][ÛŠJKŸ_NÙ[˜Ý[ÛˆUJ
^Ü™]\›žØY™\ÜÎˆˆ‹YÚ[˜][ÛŽ›ÚY_RË”]Y\žP[ÛÛ˜XÝÝ]T™\]Y\Ý^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK”]Y\žP[ÛÛ˜XÝÝ]T™\]Y\Ý‹[˜ÛÙJKSš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK˜Y™\ÜÈOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊK˜Y™\ÜÊKKœYÚ[˜][ÛˆOO]›ÚY	‰•ÙK”YÙT™\]Y\Ý™[˜ÛÙJKœYÚ[˜][Û‹‹Z[ÌŠN
K™›ÜšÊ
JK›[[J
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆš[˜\žT™XY\ÙN›™]Èš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹YUJ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹˜Y™\ÜÏ]œÝš[™Ê
NØœ™XZÎØØ\ÙHŽœ‹œYÚ[˜][ÛUÙK”YÙT™\]Y\Ý™XÛÙJZ[ÌŠ
JNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]YUJ
NÜ™]\›ŠKš\ÔÙ]
JK˜Y™\ÜÊI‰Š‹˜Y™\ÜÏTÝš[™ÊK˜Y™\ÜÊJK
Kš\ÔÙ]
JKœYÚ[˜][ÛŠI‰Š‹œYÚ[˜][ÛUÙK”YÙT™\]Y\Ý™œ›ÛR”ÓÓŠKœYÚ[˜][ÛŠJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK˜Y™\ÜÈOO]›ÚY	‰Š‹˜Y™\ÜÏYK˜Y™\ÜÊKKœYÚ[˜][ÛˆOO]›ÚY	‰Š‹œYÚ[˜][ÛYKœYÚ[˜][ÛÕÙK”YÙT™\]Y\ÝÒ”ÓÓŠKœYÚ[˜][ÛŠN›ÚY
KŸKœ›ÛT\X[
J^Û]YUJ
NÜ™]\›ˆ‹˜Y™\ÜÏYK˜Y™\ÜÏÏÈˆ‹KœYÚ[˜][ÛˆOO]›ÚY	‰™KœYÚ[˜][ÛˆOO[[	‰Š‹œYÚ[˜][ÛUÙK”YÙT™\]Y\Ý™œ›ÛT\X[
KœYÚ[˜][ÛŠJKŸ_NÙ[˜Ý[Ûˆ•J
^Ü™]\›žÛ[Ù[Î–×KYÚ[˜][ÛŽ›ÚY_RË”]Y\žP[ÛÛ˜XÝÝ]T™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK”]Y\žP[ÛÛ˜XÝÝ]T™\ÜÛœÙH‹[˜ÛÙJKSš[˜\žUÜš]\‹˜Ü™X]J
J^Ù›ÜŠ]ÙˆK›[Ù[Ê]Ý“[Ù[™[˜ÛÙJ‹Z[ÌŠL
K™›ÜšÊ
JK›[[J
NÜ™]\›ˆKœYÚ[˜][ÛˆOO]›ÚY	‰•ÙK”YÙT™\ÜÛœÙK™[˜ÛÙJKœYÚ[˜][Û‹‹Z[ÌŠN
K™›ÜšÊ
JK›[[J
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆš[˜\žT™XY\ÙN›™]Èš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹[•J
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹›[Ù[Ëœ\Ú
Ý“[Ù[™XÛÙJZ[ÌŠ
JJNØœ™XZÎØØ\ÙHŽœ‹œYÚ[˜][ÛUÙK”YÙT™\ÜÛœÙK™XÛÙJZ[ÌŠ
JNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û][•J
NÜ™]\›ˆ\œ˜^Kš\Ð\œ˜^JOË›[Ù[ÊI‰Š‹›[Ù[ÏYK›[Ù[Ë›X\
OÝ“[Ù[™œ›ÛR”ÓÓŠ
JJK
Kš\ÔÙ]
JKœYÚ[˜][ÛŠI‰Š‹œYÚ[˜][ÛUÙK”YÙT™\ÜÛœÙK™œ›ÛR”ÓÓŠKœYÚ[˜][ÛŠJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK›[Ù[ÏÛ‹›[Ù[ÏYK›[Ù[Ë›X\
OÝÝ“[Ù[Ò”ÓÓŠ
N›ÚY
N›‹›[Ù[ÏV×KKœYÚ[˜][ÛˆOO]›ÚY	‰Š‹œYÚ[˜][ÛYKœYÚ[˜][ÛÕÙK”YÙT™\ÜÛœÙKÒ”ÓÓŠKœYÚ[˜][ÛŠN›ÚY
KŸKœ›ÛT\X[
J^Û][•J
NÜ™]\›ˆ‹›[Ù[ÏYK›[Ù[ÏË›X\
OÝ“[Ù[™œ›ÛT\X[

J_×KKœYÚ[˜][ÛˆOO]›ÚY	‰™KœYÚ[˜][ÛˆOO[[	‰Š‹œYÚ[˜][ÛUÙK”YÙT™\ÜÛœÙK™œ›ÛT\X[
KœYÚ[˜][ÛŠJKŸ_NÙ[˜Ý[ÛˆJ
^Ü™]\›žØY™\ÜÎˆˆ‹]Y\žQ]N›™]ÈZ[\œ˜^__RË”]Y\žT˜]ÐÛÛ˜XÝÝ]T™\]Y\Ý^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK”]Y\žT˜]ÐÛÛ˜XÝÝ]T™\]Y\Ý‹[˜ÛÙJKSš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK˜Y™\ÜÈOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊK˜Y™\ÜÊKKœ]Y\žQ]K›[™ÝOOL	‰›‹Z[ÌŠN
K˜ž]\ÊKœ]Y\žQ]JKŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆš[˜\žT™XY\ÙN›™]Èš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹]J
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹˜Y™\ÜÏ]œÝš[™Ê
NØœ™XZÎØØ\ÙHŽœ‹œ]Y\žQ]O]˜ž]\Ê
NØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]]J
NÜ™]\›ŠKš\ÔÙ]
JK˜Y™\ÜÊI‰Š‹˜Y™\ÜÏTÝš[™ÊK˜Y™\ÜÊJK
Kš\ÔÙ]
JKœ]Y\žQ]JI‰Š‹œ]Y\žQ]OJK˜ž]\Ñœ›ÛP˜\ÙM
JKœ]Y\žQ]JJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK˜Y™\ÜÈOO]›ÚY	‰Š‹˜Y™\ÜÏYK˜Y™\ÜÊKKœ]Y\žQ]HOO]›ÚY	‰Š‹œ]Y\žQ]OJK˜˜\ÙMœ›ÛPž]\ÊJKœ]Y\žQ]HOO]›ÚYÙKœ]Y\žQ]N›™]ÈZ[\œ˜^JJKŸKœ›ÛT\X[
J^Û]]J
NÜ™]\›ˆ‹˜Y™\ÜÏYK˜Y™\ÜÏÏÈˆ‹‹œ]Y\žQ]OYKœ]Y\žQ]OÏÛ™]ÈZ[\œ˜^KŸ_NÙ[˜Ý[Ûˆ•J
^Ü™]\›žÙ]N›™]ÈZ[\œ˜^__RË”]Y\žT˜]ÐÛÛ˜XÝÝ]T™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK”]Y\žT˜]ÐÛÛ˜XÝÝ]T™\ÜÛœÙH‹[˜ÛÙJKSš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK™]K›[™ÝOOL	‰›‹Z[ÌŠL
K˜ž]\ÊK™]JKŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆš[˜\žT™XY\ÙN›™]Èš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹\•J
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÛÏŒÏOOLOÜ‹™]O]˜ž]\Ê
NœÚÚ\\JÉÊ_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]\•J
NÜ™]\›ŠKš\ÔÙ]
JK™]JI‰Š‹™]OJK˜ž]\Ñœ›ÛP˜\ÙM
JK™]JJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK™]HOO]›ÚY	‰Š‹™]OJK˜˜\ÙMœ›ÛPž]\ÊJK™]HOO]›ÚYÙK™]N›™]ÈZ[\œ˜^JJKŸKœ›ÛT\X[
J^Û]\•J
NÜ™]\›ˆ‹™]OYK™]OÏÛ™]ÈZ[\œ˜^KŸ_NÙ[˜Ý[ÛˆUJ
^Ü™]\›žØY™\ÜÎˆˆ‹]Y\žQ]N›™]ÈZ[\œ˜^__RË”]Y\žTÛX\ÛÛ˜XÝÝ]T™\]Y\Ý^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK”]Y\žTÛX\ÛÛ˜XÝÝ]T™\]Y\Ý‹[˜ÛÙJKSš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK˜Y™\ÜÈOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊK˜Y™\ÜÊKKœ]Y\žQ]K›[™ÝOOL	‰›‹Z[ÌŠN
K˜ž]\ÊKœ]Y\žQ]JKŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆš[˜\žT™XY\ÙN›™]Èš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹ZUJ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹˜Y™\ÜÏ]œÝš[™Ê
NØœ™XZÎØØ\ÙHŽœ‹œ]Y\žQ]O]˜ž]\Ê
NØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]ZUJ
NÜ™]\›ŠKš\ÔÙ]
JK˜Y™\ÜÊI‰Š‹˜Y™\ÜÏTÝš[™ÊK˜Y™\ÜÊJK
Kš\ÔÙ]
JKœ]Y\žQ]JI‰Š‹œ]Y\žQ]OJK˜ž]\Ñœ›ÛP˜\ÙM
JKœ]Y\žQ]JJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK˜Y™\ÜÈOO]›ÚY	‰Š‹˜Y™\ÜÏYK˜Y™\ÜÊKKœ]Y\žQ]HOO]›ÚY	‰Š‹œ]Y\žQ]OJK˜˜\ÙMœ›ÛPž]\ÊJKœ]Y\žQ]HOO]›ÚYÙKœ]Y\žQ]N›™]ÈZ[\œ˜^JJKŸKœ›ÛT\X[
J^Û]ZUJ
NÜ™]\›ˆ‹˜Y™\ÜÏYK˜Y™\ÜÏÏÈˆ‹‹œ]Y\žQ]OYKœ]Y\žQ]OÏÛ™]ÈZ[\œ˜^KŸ_NÙ[˜Ý[ÛˆÕJ
^Ü™]\›žÙ]N›™]ÈZ[\œ˜^__RË”]Y\žTÛX\ÛÛ˜XÝÝ]T™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK”]Y\žTÛX\ÛÛ˜XÝÝ]T™\ÜÛœÙH‹[˜ÛÙJKSš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK™]K›[™ÝOOL	‰›‹Z[ÌŠL
K˜ž]\ÊK™]JKŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆš[˜\žT™XY\ÙN›™]Èš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹[ÕJ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÛÏŒÏOOLOÜ‹™]O]˜ž]\Ê
NœÚÚ\\JÉÊ_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û][ÕJ
NÜ™]\›ŠKš\ÔÙ]
JK™]JI‰Š‹™]OJK˜ž]\Ñœ›ÛP˜\ÙM
JK™]JJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK™]HOO]›ÚY	‰Š‹™]OJK˜˜\ÙMœ›ÛPž]\ÊJK™]HOO]›ÚYÙK™]N›™]ÈZ[\œ˜^JJKŸKœ›ÛT\X[
J^Û][ÕJ
NÜ™]\›ˆ‹™]OYK™]OÏÛ™]ÈZ[\œ˜^KŸ_NÙ[˜Ý[ÛˆUJ
^Ü™]\›žØÛÙRYšYÒ[

__RË”]Y\žPÛÙT™\]Y\Ý^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK”]Y\žPÛÙT™\]Y\Ý‹[˜ÛÙJKSš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK˜ÛÙRYOOPšYÒ[

I‰›‹Z[ÌŠ
KZ[
K˜ÛÙRY
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆš[˜\žT™XY\ÙN›™]Èš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹XUJ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÛÏŒÏOOLOÜ‹˜ÛÙRY]Z[

NœÚÚ\\JÉÊ_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]XUJ
NÜ™]\›ŠKš\ÔÙ]
JK˜ÛÙRY
I‰Š‹˜ÛÙRYPšYÒ[
K˜ÛÙRYÔÝš[™Ê
JJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK˜ÛÙRYOO]›ÚY	‰Š‹˜ÛÙRYJK˜ÛÙRYšYÒ[

JKÔÝš[™Ê
JKŸKœ›ÛT\X[
J^Û]XUJ
NÜ™]\›ˆK˜ÛÙRYOO]›ÚY	‰™K˜ÛÙRYOO[[	‰Š‹˜ÛÙRYPšYÒ[
K˜ÛÙRYÔÝš[™Ê
JJKŸ_NÙ[˜Ý[ÛˆÕJ
^Ü™]\›žØÛÙRYšYÒ[

__RË”]Y\žPÛÙR[™›Ô™\]Y\Ý^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK”]Y\žPÛÙR[™›Ô™\]Y\Ý‹[˜ÛÙJKSš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK˜ÛÙRYOOPšYÒ[

I‰›‹Z[ÌŠ
KZ[
K˜ÛÙRY
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆš[˜\žT™XY\ÙN›™]Èš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹\ÕJ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÛÏŒÏOOLOÜ‹˜ÛÙRY]Z[

NœÚÚ\\JÉÊ_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]\ÕJ
NÜ™]\›ŠKš\ÔÙ]
JK˜ÛÙRY
I‰Š‹˜ÛÙRYPšYÒ[
K˜ÛÙRYÔÝš[™Ê
JJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK˜ÛÙRYOO]›ÚY	‰Š‹˜ÛÙRYJK˜ÛÙRYšYÒ[

JKÔÝš[™Ê
JKŸKœ›ÛT\X[
J^Û]\ÕJ
NÜ™]\›ˆK˜ÛÙRYOO]›ÚY	‰™K˜ÛÙRYOO[[	‰Š‹˜ÛÙRYPšYÒ[
K˜ÛÙRYÔÝš[™Ê
JJKŸ_NÙ[˜Ý[ÛˆJ
^Ü™]\›žØÛÙRYšYÒ[

KÜ™X]ÜŽˆˆ‹ÚXÚÜÝ[N›™]ÈZ[\œ˜^K[œÝ[X]T\›Z\ÜÚ[ÛŽÝXØÙ\ÜÐÛÛ™šYË™œ›ÛT\X[
ßJ__RË”]Y\žPÛÙR[™›Ô™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK”]Y\žPÛÙR[™›Ô™\ÜÛœÙH‹[˜ÛÙJKSš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK˜ÛÙRYOOPšYÒ[

I‰›‹Z[ÌŠ
KZ[
K˜ÛÙRY
KK˜Ü™X]ÜˆOOHˆ‰‰›‹Z[ÌŠN
KœÝš[™ÊK˜Ü™X]ÜŠKK˜ÚXÚÜÝ[K›[™ÝOOL	‰›‹Z[ÌŠŠK˜ž]\ÊK˜ÚXÚÜÝ[JKKš[œÝ[X]T\›Z\ÜÚ[ÛˆOO]›ÚY	‰ÝXØÙ\ÜÐÛÛ™šYË™[˜ÛÙJKš[œÝ[X]T\›Z\ÜÚ[Û‹‹Z[ÌŠÍ
K™›ÜšÊ
JK›[[J
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆš[˜\žT™XY\ÙN›™]Èš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹YJ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹˜ÛÙRY]Z[

NØœ™XZÎØØ\ÙHŽœ‹˜Ü™X]Ü]œÝš[™Ê
NØœ™XZÎØØ\ÙHÎœ‹˜ÚXÚÜÝ[O]˜ž]\Ê
NØœ™XZÎØØ\ÙHœ‹š[œÝ[X]T\›Z\ÜÚ[Û]ÝXØÙ\ÜÐÛÛ™šYË™XÛÙJZ[ÌŠ
JNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]YJ
NÜ™]\›ŠKš\ÔÙ]
JK˜ÛÙRY
I‰Š‹˜ÛÙRYPšYÒ[
K˜ÛÙRYÔÝš[™Ê
JJK
Kš\ÔÙ]
JK˜Ü™X]ÜŠI‰Š‹˜Ü™X]ÜTÝš[™ÊK˜Ü™X]ÜŠJK
Kš\ÔÙ]
JK˜ÚXÚÜÝ[JI‰Š‹˜ÚXÚÜÝ[OJK˜ž]\Ñœ›ÛP˜\ÙM
JK˜ÚXÚÜÝ[JJK
Kš\ÔÙ]
JKš[œÝ[X]T\›Z\ÜÚ[ÛŠI‰Š‹š[œÝ[X]T\›Z\ÜÚ[Û]ÝXØÙ\ÜÐÛÛ™šYË™œ›ÛR”ÓÓŠKš[œÝ[X]T\›Z\ÜÚ[ÛŠJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK˜ÛÙRYOO]›ÚY	‰Š‹˜ÛÙRYJK˜ÛÙRYšYÒ[

JKÔÝš[™Ê
JKK˜Ü™X]ÜˆOO]›ÚY	‰Š‹˜Ü™X]ÜYK˜Ü™X]ÜŠKK˜ÚXÚÜÝ[HOO]›ÚY	‰Š‹˜ÚXÚÜÝ[OJK˜˜\ÙMœ›ÛPž]\ÊJK˜ÚXÚÜÝ[HOO]›ÚYÙK˜ÚXÚÜÝ[N›™]ÈZ[\œ˜^JJKKš[œÝ[X]T\›Z\ÜÚ[ÛˆOO]›ÚY	‰Š‹š[œÝ[X]T\›Z\ÜÚ[ÛYKš[œÝ[X]T\›Z\ÜÚ[ÛÝÝXØÙ\ÜÐÛÛ™šYËÒ”ÓÓŠKš[œÝ[X]T\›Z\ÜÚ[ÛŠN›ÚY
KŸKœ›ÛT\X[
J^Û]YJ
NÜ™]\›ˆK˜ÛÙRYOO]›ÚY	‰™K˜ÛÙRYOO[[	‰Š‹˜ÛÙRYPšYÒ[
K˜ÛÙRYÔÝš[™Ê
JJK‹˜Ü™X]ÜYK˜Ü™X]ÜÏÈˆ‹‹˜ÚXÚÜÝ[OYK˜ÚXÚÜÝ[OÏÛ™]ÈZ[\œ˜^KKš[œÝ[X]T\›Z\ÜÚ[ÛˆOO]›ÚY	‰™Kš[œÝ[X]T\›Z\ÜÚ[ÛˆOO[[	‰Š‹š[œÝ[X]T\›Z\ÜÚ[Û]ÝXØÙ\ÜÐÛÛ™šYË™œ›ÛT\X[
Kš[œÝ[X]T\›Z\ÜÚ[ÛŠJKŸ_NÙ[˜Ý[ÛˆÕJ
^Ü™]\›žØÛÙRYšYÒ[

KÜ™X]ÜŽˆˆ‹]R\Ú›™]ÈZ[\œ˜^K[œÝ[X]T\›Z\ÜÚ[ÛŽÝXØÙ\ÜÐÛÛ™šYË™œ›ÛT\X[
ßJ__RËÛÙR[™›Ô™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒKÛÙR[™›Ô™\ÜÛœÙH‹[˜ÛÙJKSš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK˜ÛÙRYOOPšYÒ[

I‰›‹Z[ÌŠ
KZ[
K˜ÛÙRY
KK˜Ü™X]ÜˆOOHˆ‰‰›‹Z[ÌŠN
KœÝš[™ÊK˜Ü™X]ÜŠKK™]R\Ú›[™ÝOOL	‰›‹Z[ÌŠŠK˜ž]\ÊK™]R\Ú
KKš[œÝ[X]T\›Z\ÜÚ[ÛˆOO]›ÚY	‰ÝXØÙ\ÜÐÛÛ™šYË™[˜ÛÙJKš[œÝ[X]T\›Z\ÜÚ[Û‹‹Z[ÌŠL
K™›ÜšÊ
JK›[[J
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆš[˜\žT™XY\ÙN›™]Èš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹XÕJ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹˜ÛÙRY]Z[

NØœ™XZÎØØ\ÙHŽœ‹˜Ü™X]Ü]œÝš[™Ê
NØœ™XZÎØØ\ÙHÎœ‹™]R\Ú]˜ž]\Ê
NØœ™XZÎØØ\ÙHŽœ‹š[œÝ[X]T\›Z\ÜÚ[Û]ÝXØÙ\ÜÐÛÛ™šYË™XÛÙJZ[ÌŠ
JNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]XÕJ
NÜ™]\›ŠKš\ÔÙ]
JK˜ÛÙRY
I‰Š‹˜ÛÙRYPšYÒ[
K˜ÛÙRYÔÝš[™Ê
JJK
Kš\ÔÙ]
JK˜Ü™X]ÜŠI‰Š‹˜Ü™X]ÜTÝš[™ÊK˜Ü™X]ÜŠJK
Kš\ÔÙ]
JK™]R\Ú
I‰Š‹™]R\ÚJK˜ž]\Ñœ›ÛP˜\ÙM
JK™]R\Ú
JK
Kš\ÔÙ]
JKš[œÝ[X]T\›Z\ÜÚ[ÛŠI‰Š‹š[œÝ[X]T\›Z\ÜÚ[Û]ÝXØÙ\ÜÐÛÛ™šYË™œ›ÛR”ÓÓŠKš[œÝ[X]T\›Z\ÜÚ[ÛŠJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK˜ÛÙRYOO]›ÚY	‰Š‹˜ÛÙRYJK˜ÛÙRYšYÒ[

JKÔÝš[™Ê
JKK˜Ü™X]ÜˆOO]›ÚY	‰Š‹˜Ü™X]ÜYK˜Ü™X]ÜŠKK™]R\ÚOO]›ÚY	‰Š‹™]R\ÚJK˜˜\ÙMœ›ÛPž]\ÊJK™]R\ÚOO]›ÚYÙK™]R\Ú›™]ÈZ[\œ˜^JJKKš[œÝ[X]T\›Z\ÜÚ[ÛˆOO]›ÚY	‰Š‹š[œÝ[X]T\›Z\ÜÚ[ÛYKš[œÝ[X]T\›Z\ÜÚ[ÛÝÝXØÙ\ÜÐÛÛ™šYËÒ”ÓÓŠKš[œÝ[X]T\›Z\ÜÚ[ÛŠN›ÚY
KŸKœ›ÛT\X[
J^Û]XÕJ
NÜ™]\›ˆK˜ÛÙRYOO]›ÚY	‰™K˜ÛÙRYOO[[	‰Š‹˜ÛÙRYPšYÒ[
K˜ÛÙRYÔÝš[™Ê
JJK‹˜Ü™X]ÜYK˜Ü™X]ÜÏÈˆ‹‹™]R\ÚYK™]R\ÚÏÛ™]ÈZ[\œ˜^KKš[œÝ[X]T\›Z\ÜÚ[ÛˆOO]›ÚY	‰™Kš[œÝ[X]T\›Z\ÜÚ[ÛˆOO[[	‰Š‹š[œÝ[X]T\›Z\ÜÚ[Û]ÝXØÙ\ÜÐÛÛ™šYË™œ›ÛT\X[
Kš[œÝ[X]T\›Z\ÜÚ[ÛŠJKŸ_NÙ[˜Ý[ÛˆUJ
^Ü™]\›žØÛÙR[™›Î›ÚY]N›™]ÈZ[\œ˜^__RË”]Y\žPÛÙT™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK”]Y\žPÛÙT™\ÜÛœÙH‹[˜ÛÙJKSš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK˜ÛÙR[™›ÈOO]›ÚY	‰’ËÛÙR[™›Ô™\ÜÛœÙK™[˜ÛÙJK˜ÛÙR[™›Ë‹Z[ÌŠL
K™›ÜšÊ
JK›[[J
KK™]K›[™ÝOOL	‰›‹Z[ÌŠN
K˜ž]\ÊK™]JKŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆš[˜\žT™XY\ÙN›™]Èš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹]UJ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹˜ÛÙR[™›ÏRËÛÙR[™›Ô™\ÜÛœÙK™XÛÙJZ[ÌŠ
JNØœ™XZÎØØ\ÙHŽœ‹™]O]˜ž]\Ê
NØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]]UJ
NÜ™]\›ŠKš\ÔÙ]
JK˜ÛÙR[™›ÊI‰Š‹˜ÛÙR[™›ÏRËÛÙR[™›Ô™\ÜÛœÙK™œ›ÛR”ÓÓŠK˜ÛÙR[™›ÊJK
Kš\ÔÙ]
JK™]JI‰Š‹™]OJK˜ž]\Ñœ›ÛP˜\ÙM
JK™]JJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK˜ÛÙR[™›ÈOO]›ÚY	‰Š‹˜ÛÙR[™›ÏYK˜ÛÙR[™›ÏÒËÛÙR[™›Ô™\ÜÛœÙKÒ”ÓÓŠK˜ÛÙR[™›ÊN›ÚY
KK™]HOO]›ÚY	‰Š‹™]OJK˜˜\ÙMœ›ÛPž]\ÊJK™]HOO]›ÚYÙK™]N›™]ÈZ[\œ˜^JJKŸKœ›ÛT\X[
J^Û]]UJ
NÜ™]\›ˆK˜ÛÙR[™›ÈOO]›ÚY	‰™K˜ÛÙR[™›ÈOO[[	‰Š‹˜ÛÙR[™›ÏRËÛÙR[™›Ô™\ÜÛœÙK™œ›ÛT\X[
K˜ÛÙR[™›ÊJK‹™]OYK™]OÏÛ™]ÈZ[\œ˜^KŸ_NÙ[˜Ý[ÛˆUJ
^Ü™]\›žÜYÚ[˜][ÛŽ›ÚY_RË”]Y\žPÛÙ\Ô™\]Y\Ý^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK”]Y\žPÛÙ\Ô™\]Y\Ý‹[˜ÛÙJKSš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆKœYÚ[˜][ÛˆOO]›ÚY	‰•ÙK”YÙT™\]Y\Ý™[˜ÛÙJKœYÚ[˜][Û‹‹Z[ÌŠL
K™›ÜšÊ
JK›[[J
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆš[˜\žT™XY\ÙN›™]Èš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹PUJ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÛÏŒÏOOLOÜ‹œYÚ[˜][ÛUÙK”YÙT™\]Y\Ý™XÛÙJZ[ÌŠ
JNœÚÚ\\JÉÊ_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]PUJ
NÜ™]\›ŠKš\ÔÙ]
JKœYÚ[˜][ÛŠI‰Š‹œYÚ[˜][ÛUÙK”YÙT™\]Y\Ý™œ›ÛR”ÓÓŠKœYÚ[˜][ÛŠJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆKœYÚ[˜][ÛˆOO]›ÚY	‰Š‹œYÚ[˜][ÛYKœYÚ[˜][ÛÕÙK”YÙT™\]Y\ÝÒ”ÓÓŠKœYÚ[˜][ÛŠN›ÚY
KŸKœ›ÛT\X[
J^Û]PUJ
NÜ™]\›ˆKœYÚ[˜][ÛˆOO]›ÚY	‰™KœYÚ[˜][ÛˆOO[[	‰Š‹œYÚ[˜][ÛUÙK”YÙT™\]Y\Ý™œ›ÛT\X[
KœYÚ[˜][ÛŠJKŸ_NÙ[˜Ý[Ûˆ•J
^Ü™]\›žØÛÙR[™›ÜÎ–×KYÚ[˜][ÛŽ›ÚY_RË”]Y\žPÛÙ\Ô™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK”]Y\žPÛÙ\Ô™\ÜÛœÙH‹[˜ÛÙJKSš[˜\žUÜš]\‹˜Ü™X]J
J^Ù›ÜŠ]ÙˆK˜ÛÙR[™›ÜÊRËÛÙR[™›Ô™\ÜÛœÙK™[˜ÛÙJ‹Z[ÌŠL
K™›ÜšÊ
JK›[[J
NÜ™]\›ˆKœYÚ[˜][ÛˆOO]›ÚY	‰•ÙK”YÙT™\ÜÛœÙK™[˜ÛÙJKœYÚ[˜][Û‹‹Z[ÌŠN
K™›ÜšÊ
JK›[[J
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆš[˜\žT™XY\ÙN›™]Èš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹Y•J
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹˜ÛÙR[™›ÜËœ\Ú
ËÛÙR[™›Ô™\ÜÛœÙK™XÛÙJZ[ÌŠ
JJNØœ™XZÎØØ\ÙHŽœ‹œYÚ[˜][ÛUÙK”YÙT™\ÜÛœÙK™XÛÙJZ[ÌŠ
JNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]Y•J
NÜ™]\›ˆ\œ˜^Kš\Ð\œ˜^JOË˜ÛÙR[™›ÜÊI‰Š‹˜ÛÙR[™›ÜÏYK˜ÛÙR[™›ÜË›X\
O’ËÛÙR[™›Ô™\ÜÛœÙK™œ›ÛR”ÓÓŠ
JJK
Kš\ÔÙ]
JKœYÚ[˜][ÛŠI‰Š‹œYÚ[˜][ÛUÙK”YÙT™\ÜÛœÙK™œ›ÛR”ÓÓŠKœYÚ[˜][ÛŠJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK˜ÛÙR[™›ÜÏÛ‹˜ÛÙR[™›ÜÏYK˜ÛÙR[™›ÜË›X\
OÒËÛÙR[™›Ô™\ÜÛœÙKÒ”ÓÓŠ
N›ÚY
N›‹˜ÛÙR[™›ÜÏV×KKœYÚ[˜][ÛˆOO]›ÚY	‰Š‹œYÚ[˜][ÛYKœYÚ[˜][ÛÕÙK”YÙT™\ÜÛœÙKÒ”ÓÓŠKœYÚ[˜][ÛŠN›ÚY
KŸKœ›ÛT\X[
J^Û]Y•J
NÜ™]\›ˆ‹˜ÛÙR[™›ÜÏYK˜ÛÙR[™›ÜÏË›X\
O’ËÛÙR[™›Ô™\ÜÛœÙK™œ›ÛT\X[

J_×KKœYÚ[˜][ÛˆOO]›ÚY	‰™KœYÚ[˜][ÛˆOO[[	‰Š‹œYÚ[˜][ÛUÙK”YÙT™\ÜÛœÙK™œ›ÛT\X[
KœYÚ[˜][ÛŠJKŸ_NÙ[˜Ý[ÛˆJ
^Ü™]\›žÜYÚ[˜][ÛŽ›ÚY_RË”]Y\žT[›™YÛÙ\Ô™\]Y\Ý^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK”]Y\žT[›™YÛÙ\Ô™\]Y\Ý‹[˜ÛÙJKSš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆKœYÚ[˜][ÛˆOO]›ÚY	‰•ÙK”YÙT™\]Y\Ý™[˜ÛÙJKœYÚ[˜][Û‹‹Z[ÌŠN
K™›ÜšÊ
JK›[[J
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆš[˜\žT™XY\ÙN›™]Èš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹[J
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÛÏŒÏOOLÜ‹œYÚ[˜][ÛUÙK”YÙT™\]Y\Ý™XÛÙJZ[ÌŠ
JNœÚÚ\\JÉÊ_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û][J
NÜ™]\›ŠKš\ÔÙ]
JKœYÚ[˜][ÛŠI‰Š‹œYÚ[˜][ÛUÙK”YÙT™\]Y\Ý™œ›ÛR”ÓÓŠKœYÚ[˜][ÛŠJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆKœYÚ[˜][ÛˆOO]›ÚY	‰Š‹œYÚ[˜][ÛYKœYÚ[˜][ÛÕÙK”YÙT™\]Y\ÝÒ”ÓÓŠKœYÚ[˜][ÛŠN›ÚY
KŸKœ›ÛT\X[
J^Û][J
NÜ™]\›ˆKœYÚ[˜][ÛˆOO]›ÚY	‰™KœYÚ[˜][ÛˆOO[[	‰Š‹œYÚ[˜][ÛUÙK”YÙT™\]Y\Ý™œ›ÛT\X[
KœYÚ[˜][ÛŠJKŸ_NÙ[˜Ý[ÛˆÕJ
^Ü™]\›žØÛÙRYÎ–×KYÚ[˜][ÛŽ›ÚY_RË”]Y\žT[›™YÛÙ\Ô™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK”]Y\žT[›™YÛÙ\Ô™\ÜÛœÙH‹[˜ÛÙJKSš[˜\žUÜš]\‹˜Ü™X]J
J^Û‹Z[ÌŠL
K™›ÜšÊ
NÙ›ÜŠ]ÙˆK˜ÛÙRYÊ[‹Z[

NÜ™]\›ˆ‹›[[J
KKœYÚ[˜][ÛˆOO]›ÚY	‰•ÙK”YÙT™\ÜÛœÙK™[˜ÛÙJKœYÚ[˜][Û‹‹Z[ÌŠN
K™›ÜšÊ
JK›[[J
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆš[˜\žT™XY\ÙN›™]Èš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹YÕJ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNšYŠ
ÉÊOOOLŠ^Û]O]Z[ÌŠ
JÝœÜÎÙ›ÜŠÝœÜÏNÊ\‹˜ÛÙRYËœ\Ú
Z[

J_Y[ÙH‹˜ÛÙRYËœ\Ú
Z[

JNØœ™XZÎØØ\ÙHŽœ‹œYÚ[˜][ÛUÙK”YÙT™\ÜÛœÙK™XÛÙJZ[ÌŠ
JNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]YÕJ
NÜ™]\›ˆ\œ˜^Kš\Ð\œ˜^JOË˜ÛÙRYÊI‰Š‹˜ÛÙRYÏYK˜ÛÙRYË›X\
OšYÒ[
ÔÝš[™Ê
JJJK
Kš\ÔÙ]
JKœYÚ[˜][ÛŠI‰Š‹œYÚ[˜][ÛUÙK”YÙT™\ÜÛœÙK™œ›ÛR”ÓÓŠKœYÚ[˜][ÛŠJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK˜ÛÙRYÏÛ‹˜ÛÙRYÏYK˜ÛÙRYË›X\
OŠšYÒ[

JKÔÝš[™Ê
JN›‹˜ÛÙRYÏV×KKœYÚ[˜][ÛˆOO]›ÚY	‰Š‹œYÚ[˜][ÛYKœYÚ[˜][ÛÕÙK”YÙT™\ÜÛœÙKÒ”ÓÓŠKœYÚ[˜][ÛŠN›ÚY
KŸKœ›ÛT\X[
J^Û]YÕJ
NÜ™]\›ˆ‹˜ÛÙRYÏYK˜ÛÙRYÏË›X\
OšYÒ[
ÔÝš[™Ê
JJ_×KKœYÚ[˜][ÛˆOO]›ÚY	‰™KœYÚ[˜][ÛˆOO[[	‰Š‹œYÚ[˜][ÛUÙK”YÙT™\ÜÛœÙK™œ›ÛT\X[
KœYÚ[˜][ÛŠJKŸ_NÙ[˜Ý[ÛˆJ
^Ü™]\›žß_RË”]Y\žT\˜[\Ô™\]Y\Ý^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK”]Y\žT\˜[\Ô™\]Y\Ý‹[˜ÛÙJKSš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆš[˜\žT™XY\ÙN›™]Èš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹\J
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Ü™]\›ˆJ
_KÒ”ÓÓŠJ^Ü™]\›žß_Kœ›ÛT\X[
J^Ü™]\›ˆJ
__NÙ[˜Ý[ÛˆUJ
^Ü™]\›žÜ\˜[\ÎÝ”\˜[\Ë™œ›ÛT\X[
ßJ__RË”]Y\žT\˜[\Ô™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK”]Y\žT\˜[\Ô™\ÜÛœÙH‹[˜ÛÙJKSš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆKœ\˜[\ÈOO]›ÚY	‰Ý”\˜[\Ë™[˜ÛÙJKœ\˜[\Ë‹Z[ÌŠL
K™›ÜšÊ
JK›[[J
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆš[˜\žT™XY\ÙN›™]Èš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹RUJ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÛÏŒÏOOLOÜ‹œ\˜[\Ï]Ý”\˜[\Ë™XÛÙJZ[ÌŠ
JNœÚÚ\\JÉÊ_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]RUJ
NÜ™]\›ŠKš\ÔÙ]
JKœ\˜[\ÊI‰Š‹œ\˜[\Ï]Ý”\˜[\Ë™œ›ÛR”ÓÓŠKœ\˜[\ÊJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆKœ\˜[\ÈOO]›ÚY	‰Š‹œ\˜[\ÏYKœ\˜[\ÏÝÝ”\˜[\ËÒ”ÓÓŠKœ\˜[\ÊN›ÚY
KŸKœ›ÛT\X[
J^Û]RUJ
NÜ™]\›ˆKœ\˜[\ÈOO]›ÚY	‰™Kœ\˜[\ÈOO[[	‰Š‹œ\˜[\Ï]Ý”\˜[\Ë™œ›ÛT\X[
Kœ\˜[\ÊJKŸ_NÙ[˜Ý[ÛˆJ
^Ü™]\›žØÜ™X]ÜY™\ÜÎˆˆ‹YÚ[˜][ÛŽ›ÚY_RË”]Y\žPÛÛ˜XÝÐžPÜ™X]Ü”™\]Y\Ý^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK”]Y\žPÛÛ˜XÝÐžPÜ™X]Ü”™\]Y\Ý‹[˜ÛÙJKSš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK˜Ü™X]ÜY™\ÜÈOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊK˜Ü™X]ÜY™\ÜÊKKœYÚ[˜][ÛˆOO]›ÚY	‰•ÙK”YÙT™\]Y\Ý™[˜ÛÙJKœYÚ[˜][Û‹‹Z[ÌŠN
K™›ÜšÊ
JK›[[J
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆš[˜\žT™XY\ÙN›™]Èš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹ZJ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹˜Ü™X]ÜY™\ÜÏ]œÝš[™Ê
NØœ™XZÎØØ\ÙHŽœ‹œYÚ[˜][ÛUÙK”YÙT™\]Y\Ý™XÛÙJZ[ÌŠ
JNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]ZJ
NÜ™]\›ŠKš\ÔÙ]
JK˜Ü™X]ÜY™\ÜÊI‰Š‹˜Ü™X]ÜY™\ÜÏTÝš[™ÊK˜Ü™X]ÜY™\ÜÊJK
Kš\ÔÙ]
JKœYÚ[˜][ÛŠI‰Š‹œYÚ[˜][ÛUÙK”YÙT™\]Y\Ý™œ›ÛR”ÓÓŠKœYÚ[˜][ÛŠJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK˜Ü™X]ÜY™\ÜÈOO]›ÚY	‰Š‹˜Ü™X]ÜY™\ÜÏYK˜Ü™X]ÜY™\ÜÊKKœYÚ[˜][ÛˆOO]›ÚY	‰Š‹œYÚ[˜][ÛYKœYÚ[˜][ÛÕÙK”YÙT™\]Y\ÝÒ”ÓÓŠKœYÚ[˜][ÛŠN›ÚY
KŸKœ›ÛT\X[
J^Û]ZJ
NÜ™]\›ˆ‹˜Ü™X]ÜY™\ÜÏYK˜Ü™X]ÜY™\ÜÏÏÈˆ‹KœYÚ[˜][ÛˆOO]›ÚY	‰™KœYÚ[˜][ÛˆOO[[	‰Š‹œYÚ[˜][ÛUÙK”YÙT™\]Y\Ý™œ›ÛT\X[
KœYÚ[˜][ÛŠJKŸ_NÙ[˜Ý[ÛˆUJ
^Ü™]\›žØÛÛ˜XÝY™\ÜÙ\Î–×KYÚ[˜][ÛŽ›ÚY_RË”]Y\žPÛÛ˜XÝÐžPÜ™X]Ü”™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK”]Y\žPÛÛ˜XÝÐžPÜ™X]Ü”™\ÜÛœÙH‹[˜ÛÙJKSš[˜\žUÜš]\‹˜Ü™X]J
J^Ù›ÜŠ]ÙˆK˜ÛÛ˜XÝY™\ÜÙ\Ê[‹Z[ÌŠL
KœÝš[™Ê
NÜ™]\›ˆKœYÚ[˜][ÛˆOO]›ÚY	‰•ÙK”YÙT™\ÜÛœÙK™[˜ÛÙJKœYÚ[˜][Û‹‹Z[ÌŠN
K™›ÜšÊ
JK›[[J
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆš[˜\žT™XY\ÙN›™]Èš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹^UJ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹˜ÛÛ˜XÝY™\ÜÙ\Ëœ\Ú
œÝš[™Ê
JNØœ™XZÎØØ\ÙHŽœ‹œYÚ[˜][ÛUÙK”YÙT™\ÜÛœÙK™XÛÙJZ[ÌŠ
JNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]^UJ
NÜ™]\›ˆ\œ˜^Kš\Ð\œ˜^JOË˜ÛÛ˜XÝY™\ÜÙ\ÊI‰Š‹˜ÛÛ˜XÝY™\ÜÙ\ÏYK˜ÛÛ˜XÝY™\ÜÙ\Ë›X\
O”Ýš[™Ê
JJK
Kš\ÔÙ]
JKœYÚ[˜][ÛŠI‰Š‹œYÚ[˜][ÛUÙK”YÙT™\ÜÛœÙK™œ›ÛR”ÓÓŠKœYÚ[˜][ÛŠJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK˜ÛÛ˜XÝY™\ÜÙ\ÏÛ‹˜ÛÛ˜XÝY™\ÜÙ\ÏYK˜ÛÛ˜XÝY™\ÜÙ\Ë›X\
O
N›‹˜ÛÛ˜XÝY™\ÜÙ\ÏV×KKœYÚ[˜][ÛˆOO]›ÚY	‰Š‹œYÚ[˜][ÛYKœYÚ[˜][ÛÕÙK”YÙT™\ÜÛœÙKÒ”ÓÓŠKœYÚ[˜][ÛŠN›ÚY
KŸKœ›ÛT\X[
J^Û]^UJ
NÜ™]\›ˆ‹˜ÛÛ˜XÝY™\ÜÙ\ÏYK˜ÛÛ˜XÝY™\ÜÙ\ÏË›X\
O
_×KKœYÚ[˜][ÛˆOO]›ÚY	‰™KœYÚ[˜][ÛˆOO[[	‰Š‹œYÚ[˜][ÛUÙK”YÙT™\ÜÛœÙK™œ›ÛT\X[
KœYÚ[˜][ÛŠJKŸ_NÙ[˜Ý[Ûˆ•J
^Ü™]\›žß_RË”]Y\žUØ\ÛS[Z]ÐÛÛ™šYÔ™\]Y\Ý^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK”]Y\žUØ\ÛS[Z]ÐÛÛ™šYÔ™\]Y\Ý‹[˜ÛÙJKSš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆš[˜\žT™XY\ÙN›™]Èš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹P•J
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Ü™]\›ˆ•J
_KÒ”ÓÓŠJ^Ü™]\›žß_Kœ›ÛT\X[
J^Ü™]\›ˆ•J
__NÙ[˜Ý[ÛˆUJ
^Ü™]\›žØÛÛ™šYÎˆˆŸ_RË”]Y\žUØ\ÛS[Z]ÐÛÛ™šYÔ™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK”]Y\žUØ\ÛS[Z]ÐÛÛ™šYÔ™\ÜÛœÙH‹[˜ÛÙJKSš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK˜ÛÛ™šYÈOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊK˜ÛÛ™šYÊKŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆš[˜\žT™XY\ÙN›™]Èš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹[UJ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÛÏŒÏOOLOÜ‹˜ÛÛ™šYÏ]œÝš[™Ê
NœÚÚ\\JÉÊ_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û][UJ
NÜ™]\›ŠKš\ÔÙ]
JK˜ÛÛ™šYÊI‰Š‹˜ÛÛ™šYÏTÝš[™ÊK˜ÛÛ™šYÊJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK˜ÛÛ™šYÈOO]›ÚY	‰Š‹˜ÛÛ™šYÏYK˜ÛÛ™šYÊKŸKœ›ÛT\X[
J^Û][UJ
NÜ™]\›ˆ‹˜ÛÛ™šYÏYK˜ÛÛ™šYÏÏÈˆ‹Ÿ_NÙ[˜Ý[ÛˆÕJ
^Ü™]\›žØÛÙR\Úˆˆ‹Ü™X]ÜY™\ÜÎˆˆ‹Ø[ˆˆ‹[š]\™ÜÎ›™]ÈZ[\œ˜^__RË”]Y\žPZ[Y™\ÜÔ™\]Y\Ý^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK”]Y\žPZ[Y™\ÜÔ™\]Y\Ý‹[˜ÛÙJKSš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK˜ÛÙR\ÚOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊK˜ÛÙR\Ú
KK˜Ü™X]ÜY™\ÜÈOOHˆ‰‰›‹Z[ÌŠN
KœÝš[™ÊK˜Ü™X]ÜY™\ÜÊKKœØ[OOHˆ‰‰›‹Z[ÌŠŠKœÝš[™ÊKœØ[
KKš[š]\™ÜË›[™ÝOOL	‰›‹Z[ÌŠÍ
K˜ž]\ÊKš[š]\™ÜÊKŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆš[˜\žT™XY\ÙN›™]Èš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹PÕJ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹˜ÛÙR\Ú]œÝš[™Ê
NØœ™XZÎØØ\ÙHŽœ‹˜Ü™X]ÜY™\ÜÏ]œÝš[™Ê
NØœ™XZÎØØ\ÙHÎœ‹œØ[]œÝš[™Ê
NØœ™XZÎØØ\ÙHœ‹š[š]\™ÜÏ]˜ž]\Ê
NØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]PÕJ
NÜ™]\›ŠKš\ÔÙ]
JK˜ÛÙR\Ú
I‰Š‹˜ÛÙR\ÚTÝš[™ÊK˜ÛÙR\Ú
JK
Kš\ÔÙ]
JK˜Ü™X]ÜY™\ÜÊI‰Š‹˜Ü™X]ÜY™\ÜÏTÝš[™ÊK˜Ü™X]ÜY™\ÜÊJK
Kš\ÔÙ]
JKœØ[
I‰Š‹œØ[TÝš[™ÊKœØ[
JK
Kš\ÔÙ]
JKš[š]\™ÜÊI‰Š‹š[š]\™ÜÏJK˜ž]\Ñœ›ÛP˜\ÙM
JKš[š]\™ÜÊJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK˜ÛÙR\ÚOO]›ÚY	‰Š‹˜ÛÙR\ÚYK˜ÛÙR\Ú
KK˜Ü™X]ÜY™\ÜÈOO]›ÚY	‰Š‹˜Ü™X]ÜY™\ÜÏYK˜Ü™X]ÜY™\ÜÊKKœØ[OO]›ÚY	‰Š‹œØ[YKœØ[
KKš[š]\™ÜÈOO]›ÚY	‰Š‹š[š]\™ÜÏJK˜˜\ÙMœ›ÛPž]\ÊJKš[š]\™ÜÈOO]›ÚYÙKš[š]\™ÜÎ›™]ÈZ[\œ˜^JJKŸKœ›ÛT\X[
J^Û]PÕJ
NÜ™]\›ˆ‹˜ÛÙR\ÚYK˜ÛÙR\ÚÏÈˆ‹‹˜Ü™X]ÜY™\ÜÏYK˜Ü™X]ÜY™\ÜÏÏÈˆ‹‹œØ[YKœØ[ÏÈˆ‹‹š[š]\™ÜÏYKš[š]\™ÜÏÏÛ™]ÈZ[\œ˜^KŸ_NÙ[˜Ý[ÛˆÕJ
^Ü™]\›žØY™\ÜÎˆˆŸ_RË”]Y\žPZ[Y™\ÜÔ™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK”]Y\žPZ[Y™\ÜÔ™\ÜÛœÙH‹[˜ÛÙJKSš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK˜Y™\ÜÈOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊK˜Y™\ÜÊKŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆš[˜\žT™XY\ÙN›™]Èš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹TÕJ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÛÏŒÏOOLOÜ‹˜Y™\ÜÏ]œÝš[™Ê
NœÚÚ\\JÉÊ_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]TÕJ
NÜ™]\›ŠKš\ÔÙ]
JK˜Y™\ÜÊI‰Š‹˜Y™\ÜÏTÝš[™ÊK˜Y™\ÜÊJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK˜Y™\ÜÈOO]›ÚY	‰Š‹˜Y™\ÜÏYK˜Y™\ÜÊKŸKœ›ÛT\X[
J^Û]TÕJ
NÜ™]\›ˆ‹˜Y™\ÜÏYK˜Y™\ÜÏÏÈˆ‹Ÿ_NÝ˜\ˆÕOXÛ\ÜÞÜœÎØÛÛœÝXÝÜŠŠ^Ý\ËœœÏ[‹\ËÛÛ˜XÝ[™›Ï]\ËÛÛ˜XÝ[™›Ë˜š[™
\ÊK\ËÛÛ˜XÝ\ÝÜžO]\ËÛÛ˜XÝ\ÝÜžK˜š[™
\ÊK\ËÛÛ˜XÝÐžPÛÙO]\ËÛÛ˜XÝÐžPÛÙK˜š[™
\ÊK\Ë[ÛÛ˜XÝÝ]O]\Ë[ÛÛ˜XÝÝ]K˜š[™
\ÊK\Ë”˜]ÐÛÛ˜XÝÝ]O]\Ë”˜]ÐÛÛ˜XÝÝ]K˜š[™
\ÊK\Ë”ÛX\ÛÛ˜XÝÝ]O]\Ë”ÛX\ÛÛ˜XÝÝ]K˜š[™
\ÊK\ËÛÙO]\ËÛÙK˜š[™
\ÊK\ËÛÙ\Ï]\ËÛÙ\Ë˜š[™
\ÊK\ËÛÙR[™›Ï]\ËÛÙR[™›Ë˜š[™
\ÊK\Ë”[›™YÛÙ\Ï]\Ë”[›™YÛÙ\Ë˜š[™
\ÊK\Ë”\˜[\Ï]\Ë”\˜[\Ë˜š[™
\ÊK\ËÛÛ˜XÝÐžPÜ™X]Ü]\ËÛÛ˜XÝÐžPÜ™X]Ü‹˜š[™
\ÊK\Ë•Ø\ÛS[Z]ÐÛÛ™šYÏ]\Ë•Ø\ÛS[Z]ÐÛÛ™šYË˜š[™
\ÊK\ËZ[Y™\ÜÏ]\ËZ[Y™\ÜË˜š[™
\Ê_PÛÛ˜XÝ[™›ÊŠ^Û]RË”]Y\žPÛÛ˜XÝ[™›Ô™\]Y\Ý™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ]Ø\ÛKØ\ÛKŒK”]Y\žH‹ÛÛ˜XÝ[™›È‹
K[ŠO’Ë”]Y\žPÛÛ˜XÝ[™›Ô™\ÜÛœÙK™XÛÙJ™]Èš[˜\žT™XY\ŠŠJJ_PÛÛ˜XÝ\ÝÜžJŠ^Û]RË”]Y\žPÛÛ˜XÝ\ÝÜžT™\]Y\Ý™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ]Ø\ÛKØ\ÛKŒK”]Y\žH‹ÛÛ˜XÝ\ÝÜžH‹
K[ŠO’Ë”]Y\žPÛÛ˜XÝ\ÝÜžT™\ÜÛœÙK™XÛÙJ™]Èš[˜\žT™XY\ŠŠJJ_PÛÛ˜XÝÐžPÛÙJŠ^Û]RË”]Y\žPÛÛ˜XÝÐžPÛÙT™\]Y\Ý™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ]Ø\ÛKØ\ÛKŒK”]Y\žH‹ÛÛ˜XÝÐžPÛÙH‹
K[ŠO’Ë”]Y\žPÛÛ˜XÝÐžPÛÙT™\ÜÛœÙK™XÛÙJ™]Èš[˜\žT™XY\ŠŠJJ_P[ÛÛ˜XÝÝ]JŠ^Û]RË”]Y\žP[ÛÛ˜XÝÝ]T™\]Y\Ý™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ]Ø\ÛKØ\ÛKŒK”]Y\žH‹[ÛÛ˜XÝÝ]H‹
K[ŠO’Ë”]Y\žP[ÛÛ˜XÝÝ]T™\ÜÛœÙK™XÛÙJ™]Èš[˜\žT™XY\ŠŠJJ_T˜]ÐÛÛ˜XÝÝ]JŠ^Û]RË”]Y\žT˜]ÐÛÛ˜XÝÝ]T™\]Y\Ý™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ]Ø\ÛKØ\ÛKŒK”]Y\žH‹”˜]ÐÛÛ˜XÝÝ]H‹
K[ŠO’Ë”]Y\žT˜]ÐÛÛ˜XÝÝ]T™\ÜÛœÙK™XÛÙJ™]Èš[˜\žT™XY\ŠŠJJ_TÛX\ÛÛ˜XÝÝ]JŠ^Û]RË”]Y\žTÛX\ÛÛ˜XÝÝ]T™\]Y\Ý™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ]Ø\ÛKØ\ÛKŒK”]Y\žH‹”ÛX\ÛÛ˜XÝÝ]H‹
K[ŠO’Ë”]Y\žTÛX\ÛÛ˜XÝÝ]T™\ÜÛœÙK™XÛÙJ™]Èš[˜\žT™XY\ŠŠJJ_PÛÙJŠ^Û]RË”]Y\žPÛÙT™\]Y\Ý™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ]Ø\ÛKØ\ÛKŒK”]Y\žH‹ÛÙH‹
K[ŠO’Ë”]Y\žPÛÙT™\ÜÛœÙK™XÛÙJ™]Èš[˜\žT™XY\ŠŠJJ_PÛÙ\Ê^ÜYÚ[˜][ÛŽ•ÙK”YÙT™\]Y\Ý™œ›ÛT\X[
ßJ_J^Û]RË”]Y\žPÛÙ\Ô™\]Y\Ý™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ]Ø\ÛKØ\ÛKŒK”]Y\žH‹ÛÙ\È‹
K[ŠO’Ë”]Y\žPÛÙ\Ô™\ÜÛœÙK™XÛÙJ™]Èš[˜\žT™XY\ŠŠJJ_PÛÙR[™›ÊŠ^Û]RË”]Y\žPÛÙR[™›Ô™\]Y\Ý™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ]Ø\ÛKØ\ÛKŒK”]Y\žH‹ÛÙR[™›È‹
K[ŠO’Ë”]Y\žPÛÙR[™›Ô™\ÜÛœÙK™XÛÙJ™]Èš[˜\žT™XY\ŠŠJJ_T[›™YÛÙ\Ê^ÜYÚ[˜][ÛŽ•ÙK”YÙT™\]Y\Ý™œ›ÛT\X[
ßJ_J^Û]RË”]Y\žT[›™YÛÙ\Ô™\]Y\Ý™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ]Ø\ÛKØ\ÛKŒK”]Y\žH‹”[›™YÛÙ\È‹
K[ŠO’Ë”]Y\žT[›™YÛÙ\Ô™\ÜÛœÙK™XÛÙJ™]Èš[˜\žT™XY\ŠŠJJ_T\˜[\Ê^ßJ^Û]RË”]Y\žT\˜[\Ô™\]Y\Ý™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ]Ø\ÛKØ\ÛKŒK”]Y\žH‹”\˜[\È‹
K[ŠO’Ë”]Y\žT\˜[\Ô™\ÜÛœÙK™XÛÙJ™]Èš[˜\žT™XY\ŠŠJJ_PÛÛ˜XÝÐžPÜ™X]ÜŠŠ^Û]RË”]Y\žPÛÛ˜XÝÐžPÜ™X]Ü”™\]Y\Ý™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ]Ø\ÛKØ\ÛKŒK”]Y\žH‹ÛÛ˜XÝÐžPÜ™X]Üˆ‹
K[ŠO’Ë”]Y\žPÛÛ˜XÝÐžPÜ™X]Ü”™\ÜÛœÙK™XÛÙJ™]Èš[˜\žT™XY\ŠŠJJ_UØ\ÛS[Z]ÐÛÛ™šYÊ^ßJ^Û]RË”]Y\žUØ\ÛS[Z]ÐÛÛ™šYÔ™\]Y\Ý™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ]Ø\ÛKØ\ÛKŒK”]Y\žH‹•Ø\ÛS[Z]ÐÛÛ™šYÈ‹
K[ŠO’Ë”]Y\žUØ\ÛS[Z]ÐÛÛ™šYÔ™\ÜÛœÙK™XÛÙJ™]Èš[˜\žT™XY\ŠŠJJ_PZ[Y™\ÜÊŠ^Û]RË”]Y\žPZ[Y™\ÜÔ™\]Y\Ý™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ]Ø\ÛKØ\ÛKŒK”]Y\žH‹Z[Y™\ÜÈ‹
K[ŠO’Ë”]Y\žPZ[Y™\ÜÔ™\ÜÛœÙK™XÛÙJ™]Èš[˜\žT™XY\ŠŠJJ__NÒË”]Y\žPÛY[[\ZÕ_JNÝ˜\ˆURJUOOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\JUK—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÔUKœÙ]\Ø\ÛQ^[œÚ[Û[ÙNÝ˜\ˆUZÛŠ
KYVYÊ
KUOXÕŠ
NÙ[˜Ý[ÛˆÙJJ^Û]JY‹˜Ü™X]T›ÝØY”œÐÛY[
JJK[™]ÈUK”]Y\žPÛY[[\
ŠNÜ™]\›žÝØ\ÛNžÛ\ÝÛÙR[™›Î˜\Þ[˜ÈOOžÛ]^ÜYÚ[˜][ÛŽŠY‹˜Ü™X]TYÚ[˜][ÛŠJJ_NÜ™]\›ˆÛÙ\ÊŠ_KÙ]ÛÙN˜\Þ[˜ÈOOžÛ]QUK”]Y\žPÛÙT™\]Y\Ý™œ›ÛT\X[
ØÛÙRYšYÒ[
J_JNÜ™]\›ˆÛÙJŠ_K\ÝÛÛ˜XÝÐžPÛÙRY˜\Þ[˜ÊKŠOOžÛ]ÏQUK”]Y\žPÛÛ˜XÝÐžPÛÙT™\]Y\Ý™œ›ÛT\X[
ØÛÙRYšYÒ[
JKYÚ[˜][ÛŽŠY‹˜Ü™X]TYÚ[˜][ÛŠJŠ_JNÜ™]\›ˆÛÛ˜XÝÐžPÛÙJÊ_K\ÝÛÛ˜XÝÐžPÜ™X]ÜŽ˜\Þ[˜ÊKŠOOžÛ]Ï^ØÜ™X]ÜY™\ÜÎšKYÚ[˜][ÛŽŠY‹˜Ü™X]TYÚ[˜][ÛŠJŠ_NÜ™]\›ˆÛÛ˜XÝÐžPÜ™X]ÜŠÊ_KÙ]ÛÛ˜XÝ[™›Î˜\Þ[˜ÈOOžÛ]^ØY™\ÜÎš_NÜ™]\›ˆÛÛ˜XÝ[™›ÊŠ_KÙ]ÛÛ˜XÝÛÙR\ÝÜžN˜\Þ[˜ÊKŠOOžÛ]Ï^ØY™\ÜÎšKYÚ[˜][ÛŽŠY‹˜Ü™X]TYÚ[˜][ÛŠJŠ_NÜ™]\›ˆÛÛ˜XÝ\ÝÜžJÊ_KÙ][ÛÛ˜XÝÝ]N˜\Þ[˜ÊKŠOOžÛ]Ï^ØY™\ÜÎšKYÚ[˜][ÛŽŠY‹˜Ü™X]TYÚ[˜][ÛŠJŠ_NÜ™]\›ˆ[ÛÛ˜XÝÝ]JÊ_K]Y\žPÛÛ˜XÝ˜]Î˜\Þ[˜ÊKŠOOžÛ]Ï^ØY™\ÜÎšK]Y\žQ]NœŸNÜ™]\›ˆ”˜]ÐÛÛ˜XÝÝ]JÊ_K]Y\žPÛÛ˜XÝÛX\˜\Þ[˜ÊKŠOOžÛ]Ï^ØY™\ÜÎšK]Y\žQ]NŠU‹Õ]Ž
J”ÓÓ‹œÝš[™ÚYžJŠJ_KÙ]N˜_OX]ØZ]”ÛX\ÛÛ˜XÝÝ]JÊKÎÝž^ÜÏJU‹™œ›ÛU]Ž
JJ_XØ]Ú

^Ý›ÝÈ™]È\œ›ÜŠÛÝ[›ÝU‹NXÛÙHÛX\]Y\žH™\ÜÛœÙHœ›ÛHÛÛ˜XÝˆ	ÙX
_]ž^Ü™]\›ˆ”ÓÓ‹œ\œÙJÊ_XØ]Ú

^Ý›ÝÈ™]È\œ›ÜŠÛÝ[›Ý”ÓÓˆ\œÙHÛX\]Y\žH™\ÜÛœÙHœ›ÛHÛÛ˜XÝˆ	ÙX
______JNÝ˜\ˆÐRJÜOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\JÜ‹—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÕÜ‹œÙ]\Ø\ÛQ^[œÚ[ÛUÜ‹Ø\ÛU\\ÏUÜ‹š\Ó\ÙÕ\]PYZ[‘[˜ÛÙSØš™XÝUÜ‹š\Ó\ÙÔÝÜ™PÛÙQ[˜ÛÙSØš™XÝUÜ‹š\Ó\ÙÓZYÜ˜]Q[˜ÛÙSØš™XÝUÜ‹š\Ó\ÙÒ[œÝ[X]PÛÛ˜XÝ[˜ÛÙSØš™XÝUÜ‹š\Ó\ÙÒ[œÝ[X]PÛÛ˜XÝ‘[˜ÛÙSØš™XÝUÜ‹š\Ó\ÙÑ^XÝ]Q[˜ÛÙSØš™XÝUÜ‹š\Ó\ÙÐÛX\YZ[‘[˜ÛÙSØš™XÝUÜ‹˜Ü™X]UØ\ÛP[Z[›ÐÛÛ™\\œÏ]›ÚYÝ˜\ˆÛÙO\ÕŠ
NÓØš™XÝ™Yš[™T›Ü\JÜ‹˜Ü™X]UØ\ÛP[Z[›ÐÛÛ™\\œÈ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆÛÙK˜Ü™X]UØ\ÛP[Z[›ÐÛÛ™\\œß_JNÝ˜\ˆØÏYŠ
NÓØš™XÝ™Yš[™T›Ü\JÜ‹š\Ó\ÙÐÛX\YZ[‘[˜ÛÙSØš™XÝ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆØËš\Ó\ÙÐÛX\YZ[‘[˜ÛÙSØš™XÝ_JNÓØš™XÝ™Yš[™T›Ü\JÜ‹š\Ó\ÙÑ^XÝ]Q[˜ÛÙSØš™XÝ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆØËš\Ó\ÙÑ^XÝ]Q[˜ÛÙSØš™XÝ_JNÓØš™XÝ™Yš[™T›Ü\JÜ‹š\Ó\ÙÒ[œÝ[X]PÛÛ˜XÝ‘[˜ÛÙSØš™XÝ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆØËš\Ó\ÙÒ[œÝ[X]PÛÛ˜XÝ‘[˜ÛÙSØš™XÝ_JNÓØš™XÝ™Yš[™T›Ü\JÜ‹š\Ó\ÙÒ[œÝ[X]PÛÛ˜XÝ[˜ÛÙSØš™XÝ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆØËš\Ó\ÙÒ[œÝ[X]PÛÛ˜XÝ[˜ÛÙSØš™XÝ_JNÓØš™XÝ™Yš[™T›Ü\JÜ‹š\Ó\ÙÓZYÜ˜]Q[˜ÛÙSØš™XÝ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆØËš\Ó\ÙÓZYÜ˜]Q[˜ÛÙSØš™XÝ_JNÓØš™XÝ™Yš[™T›Ü\JÜ‹š\Ó\ÙÔÝÜ™PÛÙQ[˜ÛÙSØš™XÝ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆØËš\Ó\ÙÔÝÜ™PÛÙQ[˜ÛÙSØš™XÝ_JNÓØš™XÝ™Yš[™T›Ü\JÜ‹š\Ó\ÙÕ\]PYZ[‘[˜ÛÙSØš™XÝ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆØËš\Ó\ÙÕ\]PYZ[‘[˜ÛÙSØš™XÝ_JNÓØš™XÝ™Yš[™T›Ü\JÜ‹Ø\ÛU\\È‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆØËØ\ÛU\\ß_JNÝ˜\ˆÙOPUŠ
NÓØš™XÝ™Yš[™T›Ü\JÜ‹œÙ]\Ø\ÛQ^[œÚ[Ûˆ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆÙKœÙ]\Ø\ÛQ^[œÚ[ÛŸ_J_JNÝ˜\ˆ•ORJPOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\JP‹—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNØP‹ÛÜÛUØ\ÛPÛY[]›ÚYÝ˜\ˆÝOZÛŠ
K•PZJ
K	VYÊ
KRÙÊ
K™X\Š
K[ÙOVš

KÕOV™Ê
KÙO[ÐŠ
K•OXÛ\ÜÈ^ØÛÛY]ÛY[Ü]Y\žPÛY[ØÛÙ\ÐØXÚO[™]ÈX\ØÚZ[’YØXØÛÝ[\œÙ\ŽÜÝ]XÈ\Þ[˜ÈÛÛ›™XÝ
‹^ßJ^Û]OX]ØZ]
‹˜ÛÛ›™XÝÛÛY]
JŠNÜ™]\›ˆK˜Ü™X]JK
_\Ý]XÈÜ™X]J‹^ßJ^Ü™]\›ˆ™]ÈJ‹
_XÛÛœÝXÝÜŠ‹^ßJ^Û‰‰Š\Ë˜ÛÛY]ÛY[[‹\Ëœ]Y\žPÛY[I”]Y\žPÛY[Ú]^[œÚ[ÛœÊ‹	œÙ]\]]^[œÚ[Û‹	œÙ]\˜[šÑ^[œÚ[Û‹ÙKœÙ]\Ø\ÛQ^[œÚ[Û‹	œÙ]\^[œÚ[ÛŠJNÛ]ØXØÛÝ[\œÙ\ŽšOI˜XØÛÝ[œ›ÛP[ž_O]Ý\Ë˜XØÛÝ[\œÙ\Z_YÙ]ÛÛY]ÛY[

^Ü™]\›ˆ\Ë˜ÛÛY]ÛY[Y›Ü˜ÙQÙ]ÛÛY]ÛY[

^ÚYŠ]\Ë˜ÛÛY]ÛY[
]›ÝÈ™]È\œ›ÜŠÛÛY]ÛY[›Ý]˜Z[X›Kˆ[ÝHØ[››Ý\ÙHÛ›[™H[˜Ý[Û˜[]H[ˆÙ™›[™H[ÙKˆŠNÜ™]\›ˆ\Ë˜ÛÛY]ÛY[YÙ]]Y\žPÛY[

^Ü™]\›ˆ\Ëœ]Y\žPÛY[Y›Ü˜ÙQÙ]]Y\žPÛY[

^ÚYŠ]\Ëœ]Y\žPÛY[
]›ÝÈ™]È\œ›ÜŠ”]Y\žHÛY[›Ý]˜Z[X›Kˆ[ÝHØ[››Ý\ÙHÛ›[™H[˜Ý[Û˜[]H[ˆÙ™›[™H[ÙKˆŠNÜ™]\›ˆ\Ëœ]Y\žPÛY[X\Þ[˜ÈÙ]ÚZ[’Y

^ÚYŠ]\Ë˜ÚZ[’Y
^Û]J]ØZ]\Ë™›Ü˜ÙQÙ]ÛÛY]ÛY[

KœÝ]\Ê
JK››ÙR[™›Ë›™]ÛÜšÎÚYŠ]
]›ÝÈ™]È\œ›ÜŠÚZ[ˆQ]\Ý›Ý™H[\HŠNÝ\Ë˜ÚZ[’Y]\™]\›ˆ\Ë˜ÚZ[’YX\Þ[˜ÈÙ]ZYÚ

^Ü™]\›Š]ØZ]\Ë™›Ü˜ÙQÙ]ÛÛY]ÛY[

KœÝ]\Ê
JKœÞ[˜Ò[™›Ë›]\Ý›ØÚÒZYÚX\Þ[˜ÈÙ]XØÛÝ[
Š^Ýž^Û]X]ØZ]\Ë™›Ü˜ÙQÙ]]Y\žPÛY[

K˜]]˜XØÛÝ[
ŠNÜ™]\›ˆÝ\Ë˜XØÛÝ[\œÙ\Š
N›[XØ]Ú

^ÚYŠÜœÈ\œ›ÜŽˆÛÙHH›Ý›Ý[™ÚK\Ý
Ýš[™Ê
JJ\™]\›ˆ[Ý›ÝÈ_X\Þ[˜ÈÙ]Ù\]Y[˜ÙJŠ^Û]X]ØZ]\Ë™Ù]XØÛÝ[
ŠNÚYŠ]
]›ÝÈ™]È\œ›ÜŠXØÛÝ[	ÉÛŸIÈÙ\È›Ý^\ÝÛˆÚZ[‹ˆÙ[™ÛÛYHÚÙ[œÈ\™H™Y›Ü™HžZ[™ÈÈ]Y\žHÙ\]Y[˜ÙK˜
NÜ™]\›žØXØÛÝ[[X™\Ž˜XØÛÝ[[X™\‹Ù\]Y[˜ÙNœÙ\]Y[˜Ù__X\Þ[˜ÈÙ]›ØÚÊŠ^Û]X]ØZ]\Ë™›Ü˜ÙQÙ]ÛÛY]ÛY[

K˜›ØÚÊŠNÜ™]\›žÚYŠÝKÒ^
J˜›ØÚÒYš\Ú
KÕ\\Ø\ÙJ
KXY\ŽžÝ™\œÚ[ÛŽžØ›ØÚÎ›™]È•‹•Z[LÊ˜›ØÚËšXY\‹™\œÚ[Û‹˜›ØÚÊKÔÝš[™Ê
K\›™]È•‹•Z[LÊ˜›ØÚËšXY\‹™\œÚ[Û‹˜\
KÔÝš[™Ê
_KZYÚ˜›ØÚËšXY\‹šZYÚÚZ[’Y˜›ØÚËšXY\‹˜ÚZ[’Y[YNŠ‹Ô™˜ÌÌÌÎUÚ]˜[›ÜÙXÛÛ™ÊJ˜›ØÚËšXY\‹[YJ_KÎ˜›ØÚËß_X\Þ[˜ÈÙ]˜[[˜ÙJ‹
^Ü™]\›ˆ\Ë™›Ü˜ÙQÙ]]Y\žPÛY[

K˜˜[šË˜˜[[˜ÙJ‹
_X\Þ[˜ÈÙ]
Š^Ü™]\›Š]ØZ]\ËÔ]Y\žJš\ÚIÉÛŸIØ
JVÌOÏÛ[X\Þ[˜ÈÙX\˜Ú
Š^Û]ÚYŠ\[ÙˆOHœÝš[™ÈŠ][ŽÙ[ÙHYŠ
	š\ÔÙX\˜Ú]Y\žP\œ˜^JJŠJ][‹›X\
OO\[ÙˆK˜[YOOHœÝš[™ÈØ	ÚKšÙ^_OIÉÚK˜[Y_IØ˜	ÚKšÙ^_OIÚK˜[Y_X
Kš›Ú[ŠˆS‘ŠNÙ[ÙH›ÝÈ™]È\œ›ÜŠ‘ÛÝ[œÝ\ÜY]Y\žH\KˆÙYHÛÜÛR”ÈŒÌHÒS‘ÑSÑÈ›ÜˆTHœ™XZÚ[™ÈÚ[™Ù\È\™KˆŠNÜ™]\›ˆ\ËÔ]Y\žJ
_Y\ØÛÛ›™XÝ

^Ý\Ë˜ÛÛY]ÛY[	‰\Ë˜ÛÛY]ÛY[™\ØÛÛ›™XÝ

_X\Þ[˜Èœ›ØYØ\Ý
‹M™MOLÙLÊ^Û]HLKÏ\Ù][Y[Ý]


OOžÜHLK
KOX\Þ[˜ÈOžÚYŠŠ]›ÝÈ™]È	•[Y[Ý]\œ›ÜŠ˜[œØXÝ[ÛˆÚ]Q	ÙHØ\ÈÝX›Z]Y]Ø\È›ÝY]›Ý[™ÛˆHÚZ[‹ˆ[ÝHZYÚØ[ÈÚXÚÈ]\‹ˆ\™HØ\ÈHØZ]Ùˆ	ÝÌYLßHÙXÛÛ™Ë˜
NØ]ØZ]
™‹œÛY\
JJNÛ]OX]ØZ]\Ë™Ù]

NÜ™]\›ˆOÞØÛÙNK˜ÛÙKZYÚKšZYÚ[™^K[™^˜]ÓÙÎKœ˜]ÓÙË˜[œØXÝ[Û’\Ú™]™[ÎK™]™[Ë\ÙÔ™\ÜÛœÙ\ÎK›\ÙÔ™\ÜÛœÙ\ËØ\Õ\ÙYK™Ø\Õ\ÙYØ\ÕØ[YK™Ø\ÕØ[YN˜J
_KÏX]ØZ]\Ë˜œ›ØYØ\ÝÞ[˜ÊŠNÜ™]\›ˆJÊK™š[˜[J

OOžØÛX\•[Y[Ý]
Ê_J_X\Þ[˜Èœ›ØYØ\ÝÞ[˜ÊŠ^Û]X]ØZ]\Ë™›Ü˜ÙQÙ]ÛÛY]ÛY[

K˜œ›ØYØ\ÝÞ[˜ÊÝ›ŸJNÜ™]\›ˆ˜ÛÙOÔ›ÛZ\ÙKœ™Z™XÝ
™]È	œ›ØYØ\Ý\œ›ÜŠ˜ÛÙK˜ÛÙ\ÜXÙOÏÈˆ‹›ÙÊJNŠÝKÒ^
Jš\Ú
KÕ\\Ø\ÙJ
_X\Þ[˜ÈÙ]ÛÙ\Ê
^Û]V×KÙÞÛ]ØÛÙR[™›ÜÎšKYÚ[˜][ÛŽœŸOX]ØZ]\Ë™›Ü˜ÙQÙ]]Y\žPÛY[

KØ\ÛK›\ÝÛÙR[™›Ê
KÏZ_×NÛ‹œ\Ú
‹‹›ÊK\Ë›™^Ù^_]Ú[JË›[™ÝOOL
NÜ™]\›ˆ‹›X\
OOŠ
™‹˜\ÜÙ\
JK˜Ü™X]Ü‰‰šK˜ÛÙRY	‰šK™]R\Ú™[žH[˜ÛÛ\]HŠKÚY“[X™\ŠK˜ÛÙRY
KÜ™X]ÜŽšK˜Ü™X]Ü‹ÚXÚÜÝ[NŠÝKÒ^
JK™]R\Ú
_JJ_X\Þ[˜ÈÙ]ÛÙQ]Z[ÊŠ^Û]]\Ë˜ÛÙ\ÐØXÚK™Ù]
ŠNÚYŠ
\™]\›ˆÛ]ØÛÙR[™›ÎšK]NœŸOX]ØZ]\Ë™›Ü˜ÙQÙ]]Y\žPÛY[

KØ\ÛK™Ù]ÛÙJŠNÊ™‹˜\ÜÙ\
JI‰šK˜ÛÙRY	‰šK˜Ü™X]Ü‰‰šK™]R\Ú	‰œ‹˜ÛÙR[™›ÈZ\ÜÚ[™ÈÜˆ[˜ÛÛ\]HŠNÛ]Ï^ÚY“[X™\ŠK˜ÛÙRY
KÜ™X]ÜŽšK˜Ü™X]Ü‹ÚXÚÜÝ[NŠÝKÒ^
JK™]R\Ú
K]NœŸNÜ™]\›ˆ\Ë˜ÛÙ\ÐØXÚKœÙ]
‹ÊKßX\Þ[˜ÈÙ]ÛÛ˜XÝÊŠ^Û]V×KNÙÞÛ]ØÛÛ˜XÝÎœ‹YÚ[˜][ÛŽ›ßOX]ØZ]\Ë™›Ü˜ÙQÙ]]Y\žPÛY[

KØ\ÛK›\ÝÛÛ˜XÝÐžPÛÙRY
‹JNÝœ\Ú
‹‹œŠKO[ÏË›™^Ù^_]Ú[JOË›[™ÝOOL	‰šHOO]›ÚY
NÜ™]\›ˆX\Þ[˜ÈÙ]ÛÛ˜XÝÐžPÜ™X]ÜŠŠ^Û]V×KNÙÞÛ]ØÛÛ˜XÝY™\ÜÙ\Îœ‹YÚ[˜][ÛŽ›ßOX]ØZ]\Ë™›Ü˜ÙQÙ]]Y\žPÛY[

KØ\ÛK›\ÝÛÛ˜XÝÐžPÜ™X]ÜŠ‹JNÝœ\Ú
‹‹œŠKO[ÏË›™^Ù^_]Ú[JOË›[™ÝOOL	‰šHOO]›ÚY
NÜ™]\›ˆX\Þ[˜ÈÙ]ÛÛ˜XÝ
Š^Û]ØY™\ÜÎÛÛ˜XÝ[™›Îš_OX]ØZ]\Ë™›Ü˜ÙQÙ]]Y\žPÛY[

KØ\ÛK™Ù]ÛÛ˜XÝ[™›ÊŠNÚYŠZJ]›ÝÈ™]È\œ›ÜŠ›ÈÛÛ˜XÝ›Ý[™]Y™\ÜÈ‰ÛŸH˜
NÜ™]\›Š™‹˜\ÜÙ\
J˜Y™\ÜÈZ\ÜÚ[™ÈŠK
™‹˜\ÜÙ\
JK˜ÛÙRY	‰šK˜Ü™X]Ü‰‰šK›X™[˜ÛÛ˜XÝ[™›È[˜ÛÛ\]HŠKØY™\ÜÎÛÙRY“[X™\ŠK˜ÛÙRY
KÜ™X]ÜŽšK˜Ü™X]Ü‹YZ[ŽšK˜YZ[Ÿ›ÚYX™[šK›X™[X˜ÔÜYšKšX˜ÔÜY›ÚY_X\Þ[˜ÈÙ]ÛÛ˜XÝÛÙR\ÝÜžJŠ^Û]X]ØZ]\Ë™›Ü˜ÙQÙ]]Y\žPÛY[

KØ\ÛK™Ù]ÛÛ˜XÝÛÙR\ÝÜžJŠNÚYŠ]
]›ÝÈ™]È\œ›ÜŠ›ÈÛÛ˜XÝ\ÝÜžH›Ý[™›ÜˆY™\ÜÈ‰ÛŸH˜
NÛ]O^ÖÝÕKÛÛ˜XÝÛÙR\ÝÜžSÜ\˜][Û•\KÓÓ•PÕÐÓÑWÒTÕÔ–WÓÔTUSÓ—ÕTWÒS’UNˆ’[š]‹ÝÕKÛÛ˜XÝÛÙR\ÝÜžSÜ\˜][Û•\KÓÓ•PÕÐÓÑWÒTÕÔ–WÓÔTUSÓ—ÕTWÑÑS‘TÒT×Nˆ‘Ù[™\Ú\È‹ÝÕKÛÛ˜XÝÛÙR\ÝÜžSÜ\˜][Û•\KÓÓ•PÕÐÓÑWÒTÕÔ–WÓÔTUSÓ—ÕTWÓRQÔUWNˆ“ZYÜ˜]HŸNÜ™]\›Š™[šY\ß×JK›X\
OŠ
™‹˜\ÜÙ\
J‹›Ü\˜][Û‰‰œ‹˜ÛÙRY	‰œ‹›\ÙÊKÛÜ\˜][ÛŽšVÜ‹›Ü\˜][Û—KÛÙRY“[X™\Š‹˜ÛÙRY
K\ÙÎ’”ÓÓ‹œ\œÙJ
ÝK™œ›ÛU]Ž
J‹›\ÙÊJ_JJ_X\Þ[˜È]Y\žPÛÛ˜XÝ˜]Ê‹
^Ø]ØZ]\Ë™Ù]ÛÛ˜XÝ
ŠNÛ]Ù]Nš_OX]ØZ]\Ë™›Ü˜ÙQÙ]]Y\žPÛY[

KØ\ÛKœ]Y\žPÛÛ˜XÝ˜]Ê‹
NÜ™]\›ˆOÏÛ[X\Þ[˜È]Y\žPÛÛ˜XÝÛX\
‹
^Ýž^Ü™]\›ˆ]ØZ]\Ë™›Ü˜ÙQÙ]]Y\žPÛY[

KØ\ÛKœ]Y\žPÛÛ˜XÝÛX\
‹
_XØ]Ú
J^Ý›ÝÈH[œÝ[˜Ù[Ùˆ\œ›Ü‰‰šK›Y\ÜØYÙKœÝ\ÕÚ]
››Ý›Ý[™ˆÛÛ˜XÝŠOÛ™]È\œ›ÜŠ›ÈÛÛ˜XÝ›Ý[™]Y™\ÜÈ‰ÛŸH˜
Nš__X\Þ[˜ÈÔ]Y\žJŠ^Ü™]\›Š]ØZ]\Ë™›Ü˜ÙQÙ]ÛÛY]ÛY[

KÙX\˜Ú[
Ü]Y\žN›ŸJJKË›X\
OOžÛ]R[ÙK•\ÙÑ]K™XÛÙJKœ™\Ý[™]OÏÛ™]ÈZ[\œ˜^JNÜ™]\›žÚZYÚšKšZYÚ[™^šKš[™^\ÚŠÝKÒ^
JKš\Ú
KÕ\\Ø\ÙJ
KÛÙNšKœ™\Ý[˜ÛÙK]™[ÎšKœ™\Ý[™]™[Ë›X\
	™œ›ÛU[™\›Z[]™[
K˜]ÓÙÎšKœ™\Ý[›Ùßˆ‹šK\ÙÔ™\ÜÛœÙ\Îœ‹›\ÙÔ™\ÜÛœÙ\Ë›X\
ÏOŠÝ\U\››Ë\U\›˜[YNŠÝK™š^Z[\œ˜^JJË˜[YJ_JJKØ\Õ\ÙYšKœ™\Ý[™Ø\Õ\ÙYØ\ÕØ[YšKœ™\Ý[™Ø\ÕØ[Y_J__NØP‹ÛÜÛUØ\ÛPÛY[T•_JNÝ˜\ˆÕRJOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\J‹—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÙ‹Ðš[˜\žO^[ÙNÙ‹™œ›ÛPš[˜\žOP›ÙNÝ˜\ˆÐZÛŠ
NÙ[˜Ý[Ûˆ[ÙJJ^Ü™]\›ŠÐ‹Ð˜\ÙM
J
Ð‹Õ]Ž
J”ÓÓ‹œÝš[™ÚYžJJJJ_Y[˜Ý[Ûˆ›ÙJJ^Ü™]\›ˆ”ÓÓ‹œ\œÙJ
Ð‹™œ›ÛU]Ž
J
Ð‹™œ›ÛP˜\ÙM
JJJJ__JNÝ˜\ˆRJPOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\JP‹—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÝP‹—Ú[œÝ[X]LY™\ÜÒ[\›YYX]ORUŽÝP‹š[œÝ[X]LY™\ÜÏZÛÙNÝ˜\ˆXšJ
K	ÏZÛŠ
K[ÙOPZJ
KÛÙOX\Š
NÙ[˜Ý[ÛˆÛÙJKŠ^Ü™]\›ˆ™]È‹”ÚLMŠ
‹œÚLMŠJ
	ËÐ\ØÚZJJJJJK\]JŠK™YÙ\Ý

_Y[˜Ý[ÛˆÐŠJ^Ü™]\›ˆ[ÙK•Z[™œ›ÛS[X™\ŠJKÐž]\ÐšYÑ[™X[Š
_Y[˜Ý[ÛˆUŠK‹KŠ^ÊÛÙK˜\ÜÙ\
JK›[™ÝOOLÌŠNÛ]ÏJ	Ë™œ›ÛP™XÚÌŠJŠK™]KO]\[ÙˆOOHœÝš[™ÈÊ	ËÕ]Ž
JJN›™]ÈZ[\œ˜^NÚYŠ›[™Ý_›[™Ý
]›ÝÈ™]È\œ›ÜŠ”Ø[]\Ý™H™]ÙY[ˆH[™ž]\ÈŠNÛ]Ï[™]ÈZ[\œ˜^JË‹‹Š	ËÐ\ØÚZJJØ\ÛHŠK‹‹˜ÐŠK›[™Ý
K‹‹™K‹‹˜ÐŠË›[™Ý
K‹‹›Ë‹‹˜ÐŠ›[™Ý
K‹‹‹‹˜ÐŠK›[™Ý
K‹‹˜WJKTÛÙJ›[Ù[H‹ÊKOJ	ËÐ™XÚÌŠJ‹
NÜ™]\›žÚÙ^NœËY™\ÜÑ]N™Y™\ÜÎ__Y[˜Ý[ÛˆÛÙJK‹J^Ü™]\›ˆUŠK‹[JK˜Y™\Üß_JNÝ˜\ˆURJOOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\JK—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÔK™Þš\Q[ÙNØ\Þ[˜È[˜Ý[Ûˆ[ÙJJ^Û][™]È›ØŠÙWJKœÝ™X[J
Kœ\U›ÝYÚ
™]ÈÛÛ\™\ÜÚ[Û”Ý™X[J™Þš\ŠJKOX]ØZ]™]È™\ÜÛœÙJ
K˜\œ˜^PY™™\Š
NÜ™]\›ˆ™]ÈZ[\œ˜^JJ__JNÝ˜\ˆÕRJ™ÏOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\J™Ë—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÚ™Ë”ÚYÛš[™ÐÛÜÛUØ\ÛPÛY[]›ÚYÚ™Ë™š[™]šX]OYÐŽÝ˜\ˆPXØJ
K[ÙOXšJ
KOZÛŠ
K]OPZJ
K™Q™

KœVYÊ
KÛÙORÙÊ
KX\Š
K›ÙOXš

K•VZ

K›ÙOVÊ
KT

KOS

KÙO^UŠ
K›ÙOX•J
KU[ÐŠ
NÙ[˜Ý[ÛˆÐŠK‹
^Û]YK™š[\ŠÏO›Ë\OOO[ŠK™›]X\
ÏO›Ë˜]šX]\ÊK™š[™
ÏO›ËšÙ^OOO]
NÚYŠ\Š]›ÝÈ™]È\œ›ÜŠÛÝ[›Ýš[™]šX]H	ÉÝIÈ[ˆš\œÝ]™[Ùˆ\H	ÉÛŸIÈ[ˆš\œÝÙË˜
NÜ™]\›ˆŸY[˜Ý[ÛˆJJ^Ü™]\›˜\œ›ÜˆÚ[ˆœ›ØYØ\Ý[™È	ÙK˜[œØXÝ[Û’\ÚH]ZYÚ	ÙKšZYÚKˆÛÙNˆ	ÙK˜ÛÙ_NÈ˜]ÈÙÎˆ	ÙKœ˜]ÓÙßX]˜\ˆ•OXÛ\ÜÈH^[™È›ÙKÛÜÛUØ\ÛPÛY[Ü™YÚ\ÝžNØœ›ØYØ\Ý[Y[Ý]\ÎØœ›ØYØ\ÝÛ[\˜[\ÎÜÚYÛ™\ŽØ[Z[›Õ\\ÎÙØ\ÔšXÙNÙY˜][Ø\Ó][\Y\LKÙY˜][[˜[ZXÑØ\ÔšXÙS][\Y\LKŒÎÜÝ]XÈ\Þ[˜ÈÛÛ›™XÝÚ]ÚYÛ™\Š‹O^ßJ^Û]X]ØZ]
ÛÙK˜ÛÛ›™XÝÛÛY]
JŠNÜ™]\›ˆK˜Ü™X]UÚ]ÚYÛ™\Š‹J_\Ý]XÈÜ™X]UÚ]ÚYÛ™\Š‹O^ßJ^Ü™]\›ˆ™]ÈJ‹J_\Ý]XÈ\Þ[˜ÈÙ™›[™J‹^ßJ^Ü™]\›ˆ™]ÈJ›ÚY‹
_XÛÛœÝXÝÜŠ‹J^ÜÝ\\Š‹JNÛ]Ü™YÚ\ÝžNœ[™]È™”™YÚ\ÝžJË‹‹œ‹™Y˜][™YÚ\ÝžU\\Ë‹‹›U‹Ø\ÛU\\×JK[Z[›Õ\\Î›Ï[™]Èœ‹[Z[›Õ\\ÊË‹‹Šœ‹˜Ü™X]QY˜][[Z[›ÐÛÛ™\\œÊJ
K‹‹ŠU‹˜Ü™X]UØ\ÛP[Z[›ÐÛÛ™\\œÊJ
_J_OZNÝ\Ëœ™YÚ\ÝžO\‹\Ë˜[Z[›Õ\\Ï[Ë\ËœÚYÛ™\]\Ë˜œ›ØYØ\Ý[Y[Ý]\ÏZK˜œ›ØYØ\Ý[Y[Ý]\Ë\Ë˜œ›ØYØ\ÝÛ[\˜[\ÏZK˜œ›ØYØ\ÝÛ[\˜[\Ë\Ë™Ø\ÔšXÙOZK™Ø\ÔšXÙ_X\Þ[˜ÈÚ[][]J‹J^Û]]›X\
OO\Ëœ™YÚ\ÝžK™[˜ÛÙP\Ð[žJJJKÏJ]ØZ]\ËœÚYÛ™\‹™Ù]XØÛÝ[Ê
JK™š[™
OOK˜Y™\ÜÏOO[ŠNÚYŠ[Ê]›ÝÈ™]È\œ›ÜŠ‘˜Z[YÈ™]šY]™HXØÛÝ[œ›ÛHÚYÛ™\ˆŠNÛ]OJP‹™[˜ÛÙTÙXÜMšÌTXšÙ^JJËœXšÙ^JKÜÙ\]Y[˜ÙNœßOX]ØZ]\Ë™Ù]Ù\]Y[˜ÙJŠKÙØ\Ò[™›Î™OX]ØZ]\Ë™›Ü˜ÙQÙ]]Y\žPÛY[

KœÚ[][]J‹KKÊNÜ™]\›Š‹˜\ÜÙ\Yš[™Y
J
K]K•Z[LË™œ›ÛTÝš[™Ê™Ø\Õ\ÙYÔÝš[™Ê
JKÓ[X™\Š
_X\Þ[˜È\ØY
‹KHˆ‹Ê^Û]OX]ØZ]
ÙK™Þš\
J
KÏ^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÔÝÜ™PÛÙH‹˜[YN•K“\ÙÔÝÜ™PÛÙK™œ›ÛT\X[
ÜÙ[™\Ž›‹Ø\ÛPž]PÛÙN˜K[œÝ[X]T\›Z\ÜÚ[ÛŽ›ßJ_KZOOH˜]]ÈÌKŒNšKOX]ØZ]\ËœÚYÛ[™œ›ØYØ\Ý
‹Ü×KŠNÚYŠ
œ‹š\Ñ[]™\•˜Z[\™JJJJ]›ÝÈ™]È\œ›ÜŠJJJNÛ]YÐŠK™]™[ËœÝÜ™WØÛÙH‹˜ÛÙWÚYŠNÜ™]\›žØÚXÚÜÝ[NŠKÒ^
J
[ÙKœÚLMŠJ
JKÜšYÚ[˜[Ú^™N›[™ÝÛÛ\™\ÜÙYÚ^™N˜K›[™ÝÛÙRY“[X™\‹œ\œÙR[
‹˜[YKL
KÙÜÎœ‹›ÙÜËœ\œÙT˜]ÓÙÊKœ˜]ÓÙÊKZYÚKšZYÚ˜[œØXÝ[Û’\ÚK˜[œØXÝ[Û’\Ú]™[ÎK™]™[ËØ\ÕØ[YK™Ø\ÕØ[YØ\Õ\ÙYK™Ø\Õ\ÙY_X\Þ[˜È[œÝ[X]J‹K‹ËO^ßJ^Û]Ï^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÒ[œÝ[X]PÛÛ˜XÝ‹˜[YN•K“\ÙÒ[œÝ[X]PÛÛ˜XÝ™œ›ÛT\X[
ÜÙ[™\Ž›‹ÛÙRYšYÒ[
™]È]K•Z[LÊ
KÔÝš[™Ê
JKX™[œ‹\ÙÎŠKÕ]Ž
J”ÓÓ‹œÝš[™ÚYžJJJK[™Î–Ë‹‹˜K™[™ß×WKYZ[Ž˜K˜YZ[ŸJ_KX]ØZ]\ËœÚYÛ[™œ›ØYØ\Ý
‹Ü×KËK›Y[[ÊNÚYŠ
œ‹š\Ñ[]™\•˜Z[\™JJ
J]›ÝÈ™]È\œ›ÜŠJ
JNÜ™]\›žØÛÛ˜XÝY™\ÜÎ™ÐŠ™]™[Ëš[œÝ[X]H‹—ØÛÛ˜XÝØY™\ÜÈŠK˜[YKÙÜÎœ‹›ÙÜËœ\œÙT˜]ÓÙÊœ˜]ÓÙÊKZYÚ™šZYÚ˜[œØXÝ[Û’\Ú™˜[œØXÝ[Û’\Ú]™[Î™™]™[ËØ\ÕØ[Y™™Ø\ÕØ[YØ\Õ\ÙY™™Ø\Õ\ÙY_X\Þ[˜È[œÝ[X]LŠ‹K‹ËKÏ^ßJ^Û]^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÒ[œÝ[X]PÛÛ˜XÝˆ‹˜[YN•K“\ÙÒ[œÝ[X]PÛÛ˜XÝ‹™œ›ÛT\X[
ÜÙ[™\Ž›‹ÛÙRYšYÒ[
™]È]K•Z[LÊ
KÔÝš[™Ê
JKX™[›Ë\ÙÎŠKÕ]Ž
J”ÓÓ‹œÝš[™ÚYžJŠJK[™Î–Ë‹‹œË™[™ß×WKYZ[ŽœË˜YZ[‹Ø[šKš^\ÙÎˆL_J_KOX]ØZ]\ËœÚYÛ[™œ›ØYØ\Ý
‹ÙKKË›Y[[ÊNÚYŠ
œ‹š\Ñ[]™\•˜Z[\™JJJJ]›ÝÈ™]È\œ›ÜŠJJJNÜ™]\›žØÛÛ˜XÝY™\ÜÎ™ÐŠK™]™[Ëš[œÝ[X]H‹—ØÛÛ˜XÝØY™\ÜÈŠK˜[YKÙÜÎœ‹›ÙÜËœ\œÙT˜]ÓÙÊKœ˜]ÓÙÊKZYÚKšZYÚ˜[œØXÝ[Û’\ÚK˜[œØXÝ[Û’\Ú]™[ÎK™]™[ËØ\ÕØ[YK™Ø\ÕØ[YØ\Õ\ÙYK™Ø\Õ\ÙY_X\Þ[˜È\]PYZ[Š‹K‹ÏHˆŠ^Û]O^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÕ\]PYZ[ˆ‹˜[YN•K“\ÙÕ\]PYZ[‹™œ›ÛT\X[
ÜÙ[™\Ž›‹ÛÛ˜XÝ™]ÐYZ[Žš_J_KÏX]ØZ]\ËœÚYÛ[™œ›ØYØ\Ý
‹ØWK‹ÊNÚYŠ
œ‹š\Ñ[]™\•˜Z[\™JJÊJ]›ÝÈ™]È\œ›ÜŠJÊJNÜ™]\›žÛÙÜÎœ‹›ÙÜËœ\œÙT˜]ÓÙÊËœ˜]ÓÙÊKZYÚœËšZYÚ˜[œØXÝ[Û’\ÚœË˜[œØXÝ[Û’\Ú]™[ÎœË™]™[ËØ\ÕØ[YœË™Ø\ÕØ[YØ\Õ\ÙYœË™Ø\Õ\ÙY_X\Þ[˜ÈÛX\YZ[Š‹KHˆŠ^Û]Ï^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÐÛX\YZ[ˆ‹˜[YN•K“\ÙÐÛX\YZ[‹™œ›ÛT\X[
ÜÙ[™\Ž›‹ÛÛ˜XÝJ_KOX]ØZ]\ËœÚYÛ[™œ›ØYØ\Ý
‹Û×KKŠNÚYŠ
œ‹š\Ñ[]™\•˜Z[\™JJJJ]›ÝÈ™]È\œ›ÜŠJJJNÜ™]\›žÛÙÜÎœ‹›ÙÜËœ\œÙT˜]ÓÙÊKœ˜]ÓÙÊKZYÚ˜KšZYÚ˜[œØXÝ[Û’\Ú˜K˜[œØXÝ[Û’\Ú]™[Î˜K™]™[ËØ\ÕØ[Y˜K™Ø\ÕØ[YØ\Õ\ÙY˜K™Ø\Õ\ÙY_X\Þ[˜ÈZYÜ˜]J‹K‹ËOHˆŠ^Û]Ï^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÓZYÜ˜]PÛÛ˜XÝ‹˜[YN•K“\ÙÓZYÜ˜]PÛÛ˜XÝ™œ›ÛT\X[
ÜÙ[™\Ž›‹ÛÛ˜XÝÛÙRYšYÒ[
™]È]K•Z[LÊJKÔÝš[™Ê
JK\ÙÎŠKÕ]Ž
J”ÓÓ‹œÝš[™ÚYžJŠJ_J_KX]ØZ]\ËœÚYÛ[™œ›ØYØ\Ý
‹Ü×KËJNÚYŠ
œ‹š\Ñ[]™\•˜Z[\™JJ
J]›ÝÈ™]È\œ›ÜŠJ
JNÜ™]\›žÛÙÜÎœ‹›ÙÜËœ\œÙT˜]ÓÙÊœ˜]ÓÙÊKZYÚ™šZYÚ˜[œØXÝ[Û’\Ú™˜[œØXÝ[Û’\Ú]™[Î™™]™[ËØ\ÕØ[Y™™Ø\ÕØ[YØ\Õ\ÙY™™Ø\Õ\ÙY_X\Þ[˜È^XÝ]J‹K‹ÏHˆ‹J^Û]Ï^ØÛÛ˜XÝY™\ÜÎ\ÙÎšK[™Î˜_NÜ™]\›ˆ\Ë™^XÝ]S][\J‹Ü×K‹Ê_X\Þ[˜È^XÝ]S][\J‹KHˆŠ^Û]Ï]›X\
ÏOŠÝ\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÑ^XÝ]PÛÛ˜XÝ‹˜[YN•K“\ÙÑ^XÝ]PÛÛ˜XÝ™œ›ÛT\X[
ÜÙ[™\Ž›‹ÛÛ˜XÝœË˜ÛÛ˜XÝY™\ÜË\ÙÎŠKÕ]Ž
J”ÓÓ‹œÝš[™ÚYžJË›\ÙÊJK[™Î–Ë‹‹œË™[™ß×W_J_JJKOX]ØZ]\ËœÚYÛ[™œ›ØYØ\Ý
‹ËKŠNÚYŠ
œ‹š\Ñ[]™\•˜Z[\™JJJJ]›ÝÈ™]È\œ›ÜŠJJJNÜ™]\›žÛÙÜÎœ‹›ÙÜËœ\œÙT˜]ÓÙÊKœ˜]ÓÙÊKZYÚ˜KšZYÚ˜[œØXÝ[Û’\Ú˜K˜[œØXÝ[Û’\Ú]™[Î˜K™]™[ËØ\ÕØ[Y˜K™Ø\ÕØ[YØ\Õ\ÙY˜K™Ø\Õ\ÙY_X\Þ[˜ÈÙ[™ÚÙ[œÊ‹K‹ÏHˆŠ^Û]O^Ý\U\›ˆ‹ØÛÜÛ[ÜË˜˜[šËŒX™]LK“\ÙÔÙ[™‹˜[YNžÙœ›ÛPY™\ÜÎ›‹ÐY™\ÜÎ[[Ý[–Ë‹‹šW__NÜ™]\›ˆ\ËœÚYÛ[™œ›ØYØ\Ý
‹ØWK‹Ê_X\Þ[˜È[YØ]UÚÙ[œÊ‹K‹ÏHˆŠ^Û]O^Ý\U\›ˆ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK“\ÙÑ[YØ]H‹˜[YN•‹“\ÙÑ[YØ]K™œ›ÛT\X[
Ù[YØ]ÜY™\ÜÎ›‹˜[Y]ÜY™\ÜÎ[[Ý[š_J_NÜ™]\›ˆ\ËœÚYÛ[™œ›ØYØ\Ý
‹ØWK‹Ê_X\Þ[˜È[™[YØ]UÚÙ[œÊ‹K‹ÏHˆŠ^Û]O^Ý\U\›ˆ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK“\ÙÕ[™[YØ]H‹˜[YN•‹“\ÙÕ[™[YØ]K™œ›ÛT\X[
Ù[YØ]ÜY™\ÜÎ›‹˜[Y]ÜY™\ÜÎ[[Ý[š_J_NÜ™]\›ˆ\ËœÚYÛ[™œ›ØYØ\Ý
‹ØWK‹Ê_X\Þ[˜ÈÚ]˜]Ô™]Ø\™Ê‹KHˆŠ^Û]Ï^Ý\U\›ˆ‹ØÛÜÛ[ÜË™\ÝšX][Û‹ŒX™]LK“\ÙÕÚ]˜]Ñ[YØ]Ü”™]Ø\™‹˜[YN”›ÙK“\ÙÕÚ]˜]Ñ[YØ]Ü”™]Ø\™™œ›ÛT\X[
Ù[YØ]ÜY™\ÜÎ›‹˜[Y]ÜY™\ÜÎJ_NÜ™]\›ˆ\ËœÚYÛ[™œ›ØYØ\Ý
‹Û×KKŠ_X\Þ[˜ÈÚYÛ[™œ›ØYØ\Ý
‹KHˆ‹Ê^Û]NÚOOH˜]]ÈŸ\[ÙˆOOH›[X™\ˆØOX]ØZ]\Ë˜Ø[Ý[]Q™YQ›Ü•˜[œØXÝ[ÛŠ‹‹JN˜OZNÛ]ÏX]ØZ]\ËœÚYÛŠ‹K‹›ÚYÊK[‹•˜]Ë™[˜ÛÙJÊK™š[š\Ú

NÜ™]\›ˆ\Ë˜œ›ØYØ\Ý
\Ë˜œ›ØYØ\Ý[Y[Ý]\Ë\Ë˜œ›ØYØ\ÝÛ[\˜[\Ê_X\Þ[˜ÈÚYÛ[™œ›ØYØ\ÝÞ[˜Ê‹KHˆ‹Ê^Û]NÚOOH˜]]ÈŸ\[ÙˆOOH›[X™\ˆØOX]ØZ]\Ë˜Ø[Ý[]Q™YQ›Ü•˜[œØXÝ[ÛŠ‹‹JN˜OZNÛ]ÏX]ØZ]\ËœÚYÛŠ‹K‹›ÚYÊK[‹•˜]Ë™[˜ÛÙJÊK™š[š\Ú

NÜ™]\›ˆ\Ë˜œ›ØYØ\ÝÞ[˜Ê
_X\Þ[˜ÈØ[Ý[]Q™YQ›Ü•˜[œØXÝ[ÛŠ‹KŠ^Û]ÏX]ØZ]\ËœÚ[][]J‹JKO]\[ÙˆOH›[X™\ˆÜŽ\Ë™Y˜][Ø\Ó][\Y\‹ÏSX]˜ÙZ[
Ê˜JK]\Ë™Ø\ÔšXÙNÚYŠY
]›ÝÈ™]È\œ›ÜŠ‘Ø\ÈšXÙH]\Ý™HÙ][ˆHÛY[Ü[ÛœÈÚ[ˆ]]ÈØ\È\È\ÙYˆŠNÚYŠ
œ‹š\Ñ[˜[ZXÑØ\ÔšXÙPÛÛ™šYÊJ
J^Û]OY]K›][\Y\ÏÝ\Ë™Y˜][[˜[ZXÑØ\ÔšXÙS][\Y\‹]K›Z[‘Ø\ÔšXÙK]K›X^Ø\ÔšXÙNÝž^Û]X]ØZ]\Ë™Ù]ÚZ[’Y

K]\Ë™›Ü˜ÙQÙ]]Y\žPÛY[

KÏX]ØZ]
œ‹œ]Y\žQ[˜[ZXÑØ\ÔšXÙJJ‹K™[›ÛK
KO\˜[[Ý[™œ˜XÝ[Û˜[YÚ]ËÏJœ‹›][\QXÚ[X[žS[X™\ŠJË‹JKTËš\ÑÜ™X]\•[Š˜[[Ý[
OÔÎœ˜[[Ý[ÚYŠ
^Û][˜[[Ý[˜Y\Ýœ˜XÝ[Û˜[YÚ]ÊJNÓS‹š\Ó\ÜÕ[ŠŠOÓŽ•Ÿ[][™]Èœ‹‘Ø\ÔšXÙJ‹K™[›ÛJNÜ™]\›Šœ‹˜Ø[Ý[]Q™YJJËŠ_XØ]ÚÜ™]\›Šœ‹˜Ø[Ý[]Q™YJJË
__Y[ÙH™]\›Š‹˜\ÜÙ\
J[œÝ[˜Ù[Ùˆœ‹‘Ø\ÔšXÙK‘Ø\ÈšXÙH]\Ý™HHØ\ÔšXÙH[œÝ[˜ÙHÚ[ˆ\Ú[™ÈÝ]XÈšXÚ[™ËˆŠK
œ‹˜Ø[Ý[]Q™YJJË
_X\Þ[˜ÈÚYÛŠ‹K‹ËJ^Û]ÎÚYŠÊ\Ï[ÎÙ[Ù^Û]ØXØÛÝ[[X™\Ž™Ù\]Y[˜ÙN_OX]ØZ]\Ë™Ù]Ù\]Y[˜ÙJŠKX]ØZ]\Ë™Ù]ÚZ[’Y

NÜÏ^ØXØÛÝ[[X™\Ž™Ù\]Y[˜ÙNKÚZ[’Y™Ÿ_\™]\›Š™š\ÓÙ™›[™Q\™XÝÚYÛ™\ŠJ\ËœÚYÛ™\ŠOÝ\ËœÚYÛ‘\™XÝ
‹K‹ËJN\ËœÚYÛ[Z[›Ê‹K‹ËJ_X\Þ[˜ÈÚYÛ[Z[›Ê‹K‹ØXØÛÝ[[X™\Ž›ËÙ\]Y[˜ÙN˜KÚZ[’YœßK
^Ê‹˜\ÜÙ\
JJ™š\ÓÙ™›[™Q\™XÝÚYÛ™\ŠJ\ËœÚYÛ™\ŠJNÛ]OJ]ØZ]\ËœÚYÛ™\‹™Ù]XØÛÝ[Ê
JK™š[™
OOœK˜Y™\ÜÏOO[ŠNÚYŠ]J]›ÝÈ™]È\œ›ÜŠ‘˜Z[YÈ™]šY]™HXØÛÝ[œ›ÛHÚYÛ™\ˆŠNÛ]J™™[˜ÛÙTXšÙ^JJ
P‹™Ù][Z[›ÔXšÙ^JJJJKX›ÙK”ÚYÛ“[ÙK”ÒQÓ—ÓSÑWÓQÐPÖWÐSRS“×Ò”ÓÓ‹]›X\
OO\Ë˜[Z[›Õ\\ËÐ[Z[›ÊJJKJP‹›XZÙTÚYÛ‘ØÊJKË‹ËK
KÜÚYÛ˜]\™N‹ÚYÛ™YßOX]ØZ]\ËœÚYÛ™\‹œÚYÛ[Z[›Ê‹
KO^Ý\U\›ˆ‹ØÛÜÛ[ÜËŒX™]LK•›ÙH‹˜[YNžÛY\ÜØYÙ\ÎË›\ÙÜË›X\
OO\Ë˜[Z[›Õ\\Ë™œ›ÛP[Z[›ÊJJKY[[ÎË›Y[[Ë[Y[Ý]ZYÚ™_KÏ]\Ëœ™YÚ\ÝžK™[˜ÛÙJJKU]K’[LË™œ›ÛTÝš[™ÊË™™YK™Ø\ÊKÓ[X™\Š
KU]K’[LË™œ›ÛTÝš[™ÊËœÙ\]Y[˜ÙJKÓ[X™\Š
KJ™›XZÙP]][™›Ðž]\ÊJÞÜXšÙ^N™‹Ù\]Y[˜ÙN˜ŸWKË™™YK˜[[Ý[‹Ë™™YK™Ü˜[\‹Ë™™YKœ^Y\‹
NÜ™]\›ˆ‹•˜]Ë™œ›ÛT\X[
Ø›ÙPž]\Î”Ë]][™›Ðž]\Î•‹ÚYÛ˜]\™\Î–ÊK™œ›ÛP˜\ÙM
J‹œÚYÛ˜]\™JW_J_X\Þ[˜ÈÚYÛ‘\™XÝ
‹K‹ØXØÛÝ[[X™\Ž›ËÙ\]Y[˜ÙN˜KÚZ[’YœßK
^Ê‹˜\ÜÙ\
J
™š\ÓÙ™›[™Q\™XÝÚYÛ™\ŠJ\ËœÚYÛ™\ŠJNÛ]OJ]ØZ]\ËœÚYÛ™\‹™Ù]XØÛÝ[Ê
JK™š[™
O“‹˜Y™\ÜÏOO[ŠNÚYŠ]J]›ÝÈ™]È\œ›ÜŠ‘˜Z[YÈ™]šY]™HXØÛÝ[œ›ÛHÚYÛ™\ˆŠNÛ]J™™[˜ÛÙTXšÙ^JJ
P‹™Ù][Z[›ÔXšÙ^JJJJK^Ý\U\›ˆ‹ØÛÜÛ[ÜËŒX™]LK•›ÙH‹˜[YNžÛY\ÜØYÙ\ÎY[[Îœ‹[Y[Ý]ZYÚ™_K]\Ëœ™YÚ\ÝžK™[˜ÛÙJ
KU]K’[LË™œ›ÛTÝš[™ÊK™Ø\ÊKÓ[X™\Š
KJ™›XZÙP]][™›Ðž]\ÊJÞÜXšÙ^N™‹Ù\]Y[˜ÙN˜_WKK˜[[Ý[K™Ü˜[\‹Kœ^Y\ŠKÏJ™›XZÙTÚYÛ‘ØÊJ‹ËÊKÜÚYÛ˜]\™N‘KÚYÛ™Y”ßOX]ØZ]\ËœÚYÛ™\‹œÚYÛ‘\™XÝ
‹ÊNÜ™]\›ˆ‹•˜]Ë™œ›ÛT\X[
Ø›ÙPž]\Î”Ë˜›ÙPž]\Ë]][™›Ðž]\Î”Ë˜]][™›Ðž]\ËÚYÛ˜]\™\Î–ÊK™œ›ÛP˜\ÙM
JKœÚYÛ˜]\™JW_J__NÚ™Ë”ÚYÛš[™ÐÛÜÛUØ\ÛPÛY[S•_JNÝ˜\ˆURJOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\J—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÔ”ÚYÛš[™ÐÛÜÛUØ\ÛPÛY[TØ\ÛU\\ÏTœÙ]\Ø\ÛQ^[œÚ[ÛTš\Ó\ÙÕ\]PYZ[‘[˜ÛÙSØš™XÝTš\Ó\ÙÔÝÜ™PÛÙQ[˜ÛÙSØš™XÝTš\Ó\ÙÓZYÜ˜]Q[˜ÛÙSØš™XÝTš\Ó\ÙÒ[œÝ[X]PÛÛ˜XÝ[˜ÛÙSØš™XÝTš\Ó\ÙÒ[œÝ[X]PÛÛ˜XÝ‘[˜ÛÙSØš™XÝTš\Ó\ÙÑ^XÝ]Q[˜ÛÙSØš™XÝTš\Ó\ÙÐÛX\YZ[‘[˜ÛÙSØš™XÝT˜Ü™X]UØ\ÛP[Z[›ÐÛÛ™\\œÏTš[œÝ[X]LY™\ÜÏT—Ú[œÝ[X]LY™\ÜÒ[\›YYX]OTÐš[˜\žOT™œ›ÛPš[˜\žOTÛÜÛUØ\ÛPÛY[]›ÚYÝ˜\ˆ›ÙOX•J
NÓØš™XÝ™Yš[™T›Ü\JÛÜÛUØ\ÛPÛY[‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ›ÙKÛÜÛUØ\ÛPÛY[_JNÝ˜\ˆÕYÕŠ
NÓØš™XÝ™Yš[™T›Ü\J™œ›ÛPš[˜\žH‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆÕ‹™œ›ÛPš[˜\ž__JNÓØš™XÝ™Yš[™T›Ü\JÐš[˜\žH‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆÕ‹Ðš[˜\ž__JNÝ˜\ˆÕZŠ
NÓØš™XÝ™Yš[™T›Ü\J—Ú[œÝ[X]LY™\ÜÒ[\›YYX]H‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆÕ‹—Ú[œÝ[X]LY™\ÜÒ[\›YYX]__JNÓØš™XÝ™Yš[™T›Ü\Jš[œÝ[X]LY™\ÜÈ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆÕ‹š[œÝ[X]LY™\Üß_JNÝ˜\ˆ™[ÐŠ
NÓØš™XÝ™Yš[™T›Ü\J˜Ü™X]UØ\ÛP[Z[›ÐÛÛ™\\œÈ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ™˜Ü™X]UØ\ÛP[Z[›ÐÛÛ™\\œß_JNÓØš™XÝ™Yš[™T›Ü\Jš\Ó\ÙÐÛX\YZ[‘[˜ÛÙSØš™XÝ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ™š\Ó\ÙÐÛX\YZ[‘[˜ÛÙSØš™XÝ_JNÓØš™XÝ™Yš[™T›Ü\Jš\Ó\ÙÑ^XÝ]Q[˜ÛÙSØš™XÝ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ™š\Ó\ÙÑ^XÝ]Q[˜ÛÙSØš™XÝ_JNÓØš™XÝ™Yš[™T›Ü\Jš\Ó\ÙÒ[œÝ[X]PÛÛ˜XÝ‘[˜ÛÙSØš™XÝ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ™š\Ó\ÙÒ[œÝ[X]PÛÛ˜XÝ‘[˜ÛÙSØš™XÝ_JNÓØš™XÝ™Yš[™T›Ü\Jš\Ó\ÙÒ[œÝ[X]PÛÛ˜XÝ[˜ÛÙSØš™XÝ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ™š\Ó\ÙÒ[œÝ[X]PÛÛ˜XÝ[˜ÛÙSØš™XÝ_JNÓØš™XÝ™Yš[™T›Ü\Jš\Ó\ÙÓZYÜ˜]Q[˜ÛÙSØš™XÝ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ™š\Ó\ÙÓZYÜ˜]Q[˜ÛÙSØš™XÝ_JNÓØš™XÝ™Yš[™T›Ü\Jš\Ó\ÙÔÝÜ™PÛÙQ[˜ÛÙSØš™XÝ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ™š\Ó\ÙÔÝÜ™PÛÙQ[˜ÛÙSØš™XÝ_JNÓØš™XÝ™Yš[™T›Ü\Jš\Ó\ÙÕ\]PYZ[‘[˜ÛÙSØš™XÝ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ™š\Ó\ÙÕ\]PYZ[‘[˜ÛÙSØš™XÝ_JNÓØš™XÝ™Yš[™T›Ü\JœÙ]\Ø\ÛQ^[œÚ[Ûˆ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ™œÙ]\Ø\ÛQ^[œÚ[ÛŸ_JNÓØš™XÝ™Yš[™T›Ü\JØ\ÛU\\È‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ™Ø\ÛU\\ß_JNÝ˜\ˆÛÙOPÕŠ
NÓØš™XÝ™Yš[™T›Ü\J”ÚYÛš[™ÐÛÜÛUØ\ÛPÛY[‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆÛÙK”ÚYÛš[™ÐÛÜÛUØ\ÛPÛY[_J_JNÝ˜\ˆURJOOžÈ\ÙHÝšXÝŽÝ˜\ˆÙORI‰’K—×ØÜ™X]Pš[™[™ß
Øš™XÝ˜Ü™X]OÊ[˜Ý[ÛŠK‹J^ÚOOO]›ÚY	‰ŠO]
NÝ˜\ˆSØš™XÝ™Ù]ÝÛ”›Ü\Q\ØÜš\ÜŠ‹
NÊ\Ÿ
™Ù]š[ˆÈ[‹—×Ù\Ó[Ù[Nœ‹Üš]X›_‹˜ÛÛ™šYÝ\˜X›JJI‰Š^Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ–Ý__JKØš™XÝ™Yš[™T›Ü\JKKŠ_JNŠ[˜Ý[ÛŠK‹J^ÚOOO]›ÚY	‰ŠO]
KVÚWO[–Ý_JJK[ÙORI‰’K—×Ù^ÜÝ\Ÿ[˜Ý[ÛŠKŠ^Ù›ÜŠ˜\ˆ[ˆJ]OOH™Y˜][‰‰ˆSØš™XÝœ›ÝÝ\Kš\ÓÝÛ”›Ü\K˜Ø[
‹
I‰‘ÙJ‹K
_NÓØš™XÝ™Yš[™T›Ü\JK—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÕ[ÙJUŠ
KJ_JNÝ˜\ˆ[ÙO^ßNÖ•J[ÙKØÛÛ›™XÝŠ
OO•ÙK^XÝ]NŠ
OOœ[ÙK[œÝ[X]NŠ
OO’›ÙK]Y\žNŠ
OO‘›ÙK\ØYŠ
OOžÙ_JNÝ˜\ˆÕIJYÊ
JK•IJUŠ
JNØ\Þ[˜È[˜Ý[ÛˆÙJKŠ^Ü™]\›ˆ•‹”ÚYÛš[™ÐÛÜÛUØ\ÛPÛY[˜ÛÛ›™XÝÚ]ÚYÛ™\ŠK‹ÙØ\ÔšXÙNÕ‹‘Ø\ÔšXÙK™œ›ÛTÝš[™ÊŒŒ]Z[›ÞŠ_J_X\Þ[˜È[˜Ý[ÛˆÙJK‹J^Ü™]\›ˆK\ØY
‹˜]]È‹J_X\Þ[˜È[˜Ý[Ûˆ›ÙJK‹KŠ^Ü™]\›ˆKš[œÝ[X]J‹K‹˜]]È‹ØYZ[Ž›ŸJ_X\Þ[˜È[˜Ý[Ûˆ[ÙJK‹KŠ^Ü™]\›ˆK™^XÝ]J‹K˜]]È‹Š_X\Þ[˜È[˜Ý[Ûˆ›ÙJK‹
^Ü™]\›ˆKœ]Y\žPÛÛ˜XÝÛX\
‹
_\™]\›ˆ•J[ÙJNßJJ
NÂ‹ÊˆH[™YXÙ[œÙH[™›Ü›X][ÛŽ‚‚š\Ú]Ø\ÛKÙ\ÝÚ[™^[YšœÎ‚ˆ

ˆBˆ
ˆ\Ú]Ø\ÛH
Î‹ËÝÝÝË›œZœË˜ÛÛKÜXÚØYÙKÚ\Ú]Ø\ÛJBˆ
ˆ
ÊH[šHš\›Âˆ
ˆXÙ[œÙHRUˆ
ŠB‚ØÝ\™KØ˜\ÙKÚ[™^šœÎ‚ØÝ\™KØ˜\ÙKÛX‹Ú[™^šœÎ‚ˆ

ˆHØÝ\™KX˜\ÙHHRUXÙ[œÙH
ÊHŒŒˆ][Z[\ˆ
][Z[‹˜ÛÛJH
ŠB‚›Ø›KÚ\Ú\ËÝ][ËšœÎ‚ˆ

ˆH›Ø›KZ\Ú\ÈHRUXÙ[œÙH
ÊHŒŒˆ][Z[\ˆ
][Z[‹˜ÛÛJH
ŠB‚ØÝ\™KØš\ÎKÚ[™^šœÎ‚ˆ

ˆHØÝ\™KXš\ÎHHRUXÙ[œÙH
ÊHŒŒˆ]šXÚ[È[Y[›Ë][Z[\ˆ
][Z[‹˜ÛÛJH
ŠB‚›Ø›KØÝ\™\ËÝ][ËšœÎ‚›Ø›KØÝ\™\ËØXœÝ˜XÝÛ[Ù[\‹šœÎ‚›Ø›KØÝ\™\ËØXœÝ˜XÝØÝ\™KšœÎ‚›Ø›KØÝ\™\ËØXœÝ˜XÝÙYØ\™ËšœÎ‚›Ø›KØÝ\™\ËØXœÝ˜XÝÛ[ÛÛÛY\žKšœÎ‚›Ø›KØÝ\™\ËÙYMLNKšœÎ‚›Ø›KØÝ\™\ËØXœÝ˜XÝÝÙZY\œÝ˜\ÜËšœÎ‚›Ø›KØÝ\™\Ë×ÜÚÜ×Ý][ËšœÎ‚›Ø›KØÝ\™\ËÜÙXÜMšÌKšœÎ‚ˆ

ˆH›Ø›KXÝ\™\ÈHRUXÙ[œÙH
ÊHŒŒˆ][Z[\ˆ
][Z[‹˜ÛÛJH
ŠB‚›Ø›KØÚ\\œËÝ][ËšœÎ‚ˆ

ˆH›Ø›KXÚ\\œÈHRUXÙ[œÙH
ÊHŒŒÈ][Z[\ˆ
][Z[‹˜ÛÛJH
ŠBŠ‹Â