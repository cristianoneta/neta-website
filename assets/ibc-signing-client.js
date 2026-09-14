var NetaIbcSigning=(()=>{var m6=Object.create;var jg=Object.defineProperty;var C6=Object.getOwnPropertyDescriptor;var S6=Object.getOwnPropertyNames;var k6=Object.getPrototypeOf,E6=Object.prototype.hasOwnProperty;var Q6=(e,n,t)=>()=>{if(t)throw t[0];try{return e&&(n=e(e=0)),n}catch(i){throw t=[i],i}};var I=(e,n)=>()=>{try{return n||e((n={exports:{}}).exports,n),n.exports}catch(t){throw n=0,t}},RD=(e,n)=>{for(var t in n)jg(e,t,{get:n[t],enumerable:!0})},PD=(e,n,t,i)=>{if(n&&typeof n=="object"||typeof n=="function")for(let r of S6(n))!E6.call(e,r)&&r!==t&&jg(e,r,{get:()=>n[r],enumerable:!(i=C6(n,r))||i.enumerable});return e};var ml=(e,n,t)=>(t=e!=null?m6(k6(e)):{},PD(n||!e||!e.__esModule?jg(t,"default",{value:e,enumerable:!0}):t,e)),ND=e=>PD(jg({},"__esModule",{value:!0}),e);var OD=I(ep=>{"use strict";Object.defineProperty(ep,"__esModule",{value:!0});ep.Decimal=void 0;var vD=100,Uy=class e{static fromUserInput(n,t){if(e.verifyFractionalDigits(t),n==="")return e.zero(t);let i,r;n.startsWith("-")?(i=n.substring(1),r=2):(i=n,r=1);let o=i.match(/[^0-9.]/);if(o)throw new Error(`Invalid character at position ${o.index+r}`);let a,s;if(n.search(/\./)===-1)a=n,s="";else{let A=n.split(".");switch(A.length){case 0:case 1:throw new Error("Fewer than two elements in split result. This must not happen here.");case 2:if(!A[1])throw new Error("Fractional part missing");a=A[0],s=A[1].replace(/0+$/,"");break;default:throw new Error("More than one separator found")}}if(s.length>t)throw new Error("Got more fractional digits than supported");let d=BigInt(`${a}${s.padEnd(t,"0")}`);return new e(d,t)}static fromAtomics(n,t){if(typeof n=="string"){if(!n.match(/^-?[0-9]+$/))throw new Error("Invalid string format. Only integers in decimal representation supported.");return e.fromAtomics(BigInt(n),t)}return e.verifyFractionalDigits(t),new e(n,t)}static zero(n){return e.verifyFractionalDigits(n),new e(0n,n)}static one(n){return e.verifyFractionalDigits(n),new e(10n**BigInt(n),n)}static verifyFractionalDigits(n){if(!Number.isInteger(n))throw new Error("Fractional digits is not an integer");if(n<0)throw new Error("Fractional digits must not be negative");if(n>vD)throw new Error(`Fractional digits must not exceed ${vD}`)}static compare(n,t){if(n.fractionalDigits!==t.fractionalDigits)throw new Error("Fractional digits do not match");let i=n.data.atomics-t.data.atomics;return i<0n?-1:i>0n?1:0}get atomics(){return this.data.atomics.toString()}get fractionalDigits(){return this.data.fractionalDigits}data;constructor(n,t){this.data={atomics:n,fractionalDigits:t}}clone(){return new e(this.data.atomics,this.data.fractionalDigits)}floor(){if(this.isNegative())return this.neg().ceil().neg();let n=10n**BigInt(this.data.fractionalDigits),t=this.data.atomics/n;return this.data.atomics%n===0n?this.clone():new e(t*n,this.fractionalDigits)}ceil(){if(this.isNegative())return this.neg().floor().neg();let n=10n**BigInt(this.data.fractionalDigits),t=this.data.atomics/n;return this.data.atomics%n===0n?this.clone():new e((t+1n)*n,this.fractionalDigits)}adjustFractionalDigits(n){e.verifyFractionalDigits(n);let t=n-this.fractionalDigits;return t>0?new e(this.data.atomics*10n**BigInt(t),n):t===0?this.clone():new e(this.data.atomics/10n**BigInt(-t),n)}toString(){if(this.isNegative())return"-"+this.neg().toString();let n=10n**BigInt(this.data.fractionalDigits),t=this.data.atomics/n,i=this.data.atomics%n;if(i===0n)return t.toString();{let o=i.toString().padStart(this.data.fractionalDigits,"0").replace(/0+$/,"");return`${t.toString()}.${o}`}}toFloatApproximation(){let n=Number(this.toString());if(Number.isNaN(n))throw new Error("Conversion to number failed");return n}plus(n){if(this.fractionalDigits!==n.fractionalDigits)throw new Error("Fractional digits do not match");let t=this.data.atomics+n.data.atomics;return new e(t,this.fractionalDigits)}minus(n){if(this.fractionalDigits!==n.fractionalDigits)throw new Error("Fractional digits do not match");let t=this.data.atomics-n.data.atomics;return new e(t,this.fractionalDigits)}multiply(n){let t=this.data.atomics*n.toBigInt();return new e(t,this.fractionalDigits)}neg(){return new e(-this.data.atomics,this.data.fractionalDigits)}abs(){return this.isNegative()?this.neg():this.clone()}equals(n){return e.compare(this,n)===0}isNegative(){return this.data.atomics<0n}isLessThan(n){return e.compare(this,n)<0}isLessThanOrEqual(n){return e.compare(this,n)<=0}isGreaterThan(n){return e.compare(this,n)>0}isGreaterThanOrEqual(n){return e.compare(this,n)>=0}};ep.Decimal=Uy});var DD=I(ps=>{"use strict";Object.defineProperty(ps,"__esModule",{value:!0});ps.Uint64=ps.Uint53=ps.Int53=ps.Uint32=void 0;var w6=18446744073709551615n,xy=class e{static fromBigEndianBytes(n){return e.fromBytes(n)}static fromBytes(n,t="be"){if(n.length!==4)throw new Error("Invalid input length. Expected 4 bytes.");for(let r=0;r<n.length;++r)if(!Number.isInteger(n[r])||n[r]>255||n[r]<0)throw new Error(`Invalid value in byte. Found: ${n[r]}`);let i=t==="be"?n:Array.from(n).reverse();return new e(i[0]*2**24+i[1]*2**16+i[2]*2**8+i[3])}static fromString(n){if(!n.match(/^[0-9]+$/))throw new Error("Invalid string format");return new e(Number.parseInt(n,10))}data;constructor(n){if(Number.isNaN(n))throw new Error("Input is not a number");if(!Number.isInteger(n))throw new Error("Input is not an integer");if(n<0||n>4294967295)throw new Error("Input not in uint32 range: "+n.toString());this.data=n}toBytesBigEndian(){return new Uint8Array([Math.floor(this.data/2**24)&255,Math.floor(this.data/2**16)&255,Math.floor(this.data/2**8)&255,Math.floor(this.data/2**0)&255])}toBytesLittleEndian(){return new Uint8Array([Math.floor(this.data/2**0)&255,Math.floor(this.data/2**8)&255,Math.floor(this.data/2**16)&255,Math.floor(this.data/2**24)&255])}toNumber(){return this.data}toBigInt(){return BigInt(this.toNumber())}toString(){return this.data.toString()}};ps.Uint32=xy;var Cl=class e{static fromString(n){if(!n.match(/^-?[0-9]+$/))throw new Error("Invalid string format");return new e(Number.parseInt(n,10))}data;constructor(n){if(Number.isNaN(n))throw new Error("Input is not a number");if(!Number.isInteger(n))throw new Error("Input is not an integer");if(n<Number.MIN_SAFE_INTEGER||n>Number.MAX_SAFE_INTEGER)throw new Error("Input not in int53 range: "+n.toString());this.data=n}toNumber(){return this.data}toBigInt(){return BigInt(this.toNumber())}toString(){return this.data.toString()}};ps.Int53=Cl;var Ty=class e{static fromString(n){let t=Cl.fromString(n);return new e(t.toNumber())}data;constructor(n){let t=new Cl(n);if(t.toNumber()<0)throw new Error("Input is negative");this.data=t}toNumber(){return this.data.toNumber()}toBigInt(){return BigInt(this.toNumber())}toString(){return this.data.toString()}};ps.Uint53=Ty;var Jy=class e{static fromBytesBigEndian(n){return e.fromBytes(n)}static fromBytes(n,t="be"){if(n.length!==8)throw new Error("Invalid input length. Expected 8 bytes.");let i=t==="be"?Array.from(n):Array.from(n).reverse(),r=0n;for(let o of i){if(r*=256n,!Number.isInteger(o)||o>255||o<0)throw new Error(`Invalid value in byte. Found: ${o}`);r+=BigInt(o)}return new e(r)}static fromString(n){if(!n.match(/^[0-9]+$/))throw new Error("Invalid string format");return new e(BigInt(n))}static fromNumber(n){if(Number.isNaN(n))throw new Error("Input is not a number");if(!Number.isInteger(n))throw new Error("Input is not an integer");if(!Number.isSafeInteger(n))throw new Error("Input is not a safe integer");let t=BigInt(n);return new e(t)}data;constructor(n){if(n<0n)throw new Error("Input is negative");if(n>w6)throw new Error("Input exceeds uint64 range");this.data=n}toBytesBigEndian(){return this.toBytesLittleEndian().reverse()}toBytesLittleEndian(){let n=new Uint8Array(8),t=this.data;for(let i=0;i<n.length;i++)n[i]=Number(t%256n),t/=256n;return n}toString(){return this.data.toString(10)}toBigInt(){return this.data}toNumber(){if(this.data>BigInt(Number.MAX_SAFE_INTEGER))throw new Error("number can only safely store up to 53 bits");return Number(this.data)}};ps.Uint64=Jy});var bi=I(oa=>{"use strict";Object.defineProperty(oa,"__esModule",{value:!0});oa.Uint64=oa.Uint53=oa.Uint32=oa.Int53=oa.Decimal=void 0;var b6=OD();Object.defineProperty(oa,"Decimal",{enumerable:!0,get:function(){return b6.Decimal}});var np=DD();Object.defineProperty(oa,"Int53",{enumerable:!0,get:function(){return np.Int53}});Object.defineProperty(oa,"Uint32",{enumerable:!0,get:function(){return np.Uint32}});Object.defineProperty(oa,"Uint53",{enumerable:!0,get:function(){return np.Uint53}});Object.defineProperty(oa,"Uint64",{enumerable:!0,get:function(){return np.Uint64}})});var UD=I(Sl=>{"use strict";Object.defineProperty(Sl,"__esModule",{value:!0});Sl.utf8Length=R6;Sl.utf8Read=P6;Sl.utf8Write=N6;function R6(e){let n=0,t=0;for(let i=0;i<e.length;++i)t=e.charCodeAt(i),t<128?n+=1:t<2048?n+=2:(t&64512)===55296&&(e.charCodeAt(i+1)&64512)===56320?(++i,n+=4):n+=3;return n}function P6(e,n,t){if(t-n<1)return"";let r=[],o=[],a=0,s;for(;n<t;)s=e[n++],s<128?r[a++]=s:s>191&&s<224?r[a++]=(s&31)<<6|e[n++]&63:s>239&&s<365?(s=((s&7)<<18|(e[n++]&63)<<12|(e[n++]&63)<<6|e[n++]&63)-65536,r[a++]=55296+(s>>10),r[a++]=56320+(s&1023)):r[a++]=(s&15)<<12|(e[n++]&63)<<6|e[n++]&63,a>8191&&((o||(o=[])).push(String.fromCharCode(...r)),a=0);return o?(a&&o.push(String.fromCharCode(...r.slice(0,a))),o.join("")):String.fromCharCode(...r.slice(0,a))}function N6(e,n,t){let i=t,r,o;for(let a=0;a<e.length;++a)r=e.charCodeAt(a),r<128?n[t++]=r:r<2048?(n[t++]=r>>6|192,n[t++]=r&63|128):(r&64512)===55296&&((o=e.charCodeAt(a+1))&64512)===56320?(r=65536+((r&1023)<<10)+(o&1023),++a,n[t++]=r>>18|240,n[t++]=r>>12&63|128,n[t++]=r>>6&63|128,n[t++]=r&63|128):(n[t++]=r>>12|224,n[t++]=r>>6&63|128,n[t++]=r&63|128);return t-i}});var FD=I(hi=>{"use strict";Object.defineProperty(hi,"__esModule",{value:!0});hi.varint64read=v6;hi.varint64write=O6;hi.int64FromString=D6;hi.int64ToString=U6;hi.uInt64ToString=TD;hi.varint32write=T6;hi.varint32read=J6;hi.zzEncode=F6;hi.zzDecode=q6;hi.readUInt32=H6;hi.readInt32=M6;hi.writeVarint32=_6;hi.writeVarint64=G6;hi.int64Length=V6;hi.writeFixed32=K6;hi.writeByte=W6;function v6(){let e=0,n=0;for(let i=0;i<28;i+=7){let r=this.buf[this.pos++];if(e|=(r&127)<<i,(r&128)==0)return this.assertBounds(),[e,n]}let t=this.buf[this.pos++];if(e|=(t&15)<<28,n=(t&112)>>4,(t&128)==0)return this.assertBounds(),[e,n];for(let i=3;i<=31;i+=7){let r=this.buf[this.pos++];if(n|=(r&127)<<i,(r&128)==0)return this.assertBounds(),[e,n]}throw new Error("invalid varint")}function O6(e,n,t){for(let o=0;o<28;o=o+7){let a=e>>>o,s=!(!(a>>>7)&&n==0),d=(s?a|128:a)&255;if(t.push(d),!s)return}let i=e>>>28&15|(n&7)<<4,r=n>>3!=0;if(t.push((r?i|128:i)&255),!!r){for(let o=3;o<31;o=o+7){let a=n>>>o,s=!!(a>>>7),d=(s?a|128:a)&255;if(t.push(d),!s)return}t.push(n>>>31&1)}}var tp=4294967296;function D6(e){let n=e[0]==="-";n&&(e=e.slice(1));let t=1e6,i=0,r=0;function o(a,s){let d=Number(e.slice(a,s));r*=t,i=i*t+d,i>=tp&&(r=r+(i/tp|0),i=i%tp)}return o(-24,-18),o(-18,-12),o(-12,-6),o(-6),n?JD(i,r):Fy(i,r)}function U6(e,n){let t=Fy(e,n),i=t.hi&2147483648;i&&(t=JD(t.lo,t.hi));let r=TD(t.lo,t.hi);return i?"-"+r:r}function TD(e,n){if({lo:e,hi:n}=x6(e,n),n<=2097151)return String(tp*n+e);let t=e&16777215,i=(e>>>24|n<<8)&16777215,r=n>>16&65535,o=t+i*6777216+r*6710656,a=i+r*8147497,s=r*2,d=1e7;return o>=d&&(a+=Math.floor(o/d),o%=d),a>=d&&(s+=Math.floor(a/d),a%=d),s.toString()+xD(a)+xD(o)}function x6(e,n){return{lo:e>>>0,hi:n>>>0}}function Fy(e,n){return{lo:e|0,hi:n|0}}function JD(e,n){return n=~n,e?e=~e+1:n+=1,Fy(e,n)}var xD=e=>{let n=String(e);return"0000000".slice(n.length)+n};function T6(e,n){if(e>=0){for(;e>127;)n.push(e&127|128),e=e>>>7;n.push(e)}else{for(let t=0;t<9;t++)n.push(e&127|128),e=e>>7;n.push(1)}}function J6(){let e=this.buf[this.pos++],n=e&127;if((e&128)==0)return this.assertBounds(),n;if(e=this.buf[this.pos++],n|=(e&127)<<7,(e&128)==0)return this.assertBounds(),n;if(e=this.buf[this.pos++],n|=(e&127)<<14,(e&128)==0)return this.assertBounds(),n;if(e=this.buf[this.pos++],n|=(e&127)<<21,(e&128)==0)return this.assertBounds(),n;e=this.buf[this.pos++],n|=(e&15)<<28;for(let t=5;(e&128)!==0&&t<10;t++)e=this.buf[this.pos++];if((e&128)!=0)throw new Error("invalid varint");return this.assertBounds(),n>>>0}function F6(e,n){let t=n>>31;return n=((n<<1|e>>>31)^t)>>>0,e=(e<<1^t)>>>0,[e,n]}function q6(e,n){let t=-(e&1);return e=((e>>>1|n<<31)^t)>>>0,n=(n>>>1^t)>>>0,[e,n]}function H6(e,n){return(e[n]|e[n+1]<<8|e[n+2]<<16)+e[n+3]*16777216}function M6(e,n){return(e[n]|e[n+1]<<8|e[n+2]<<16)+(e[n+3]<<24)}function _6(e,n,t){for(;e>127;)n[t++]=e&127|128,e>>>=7;n[t]=e}function G6(e,n,t){for(;e.hi;)n[t++]=e.lo&127|128,e.lo=(e.lo>>>7|e.hi<<25)>>>0,e.hi>>>=7;for(;e.lo>127;)n[t++]=e.lo&127|128,e.lo=e.lo>>>7;n[t++]=e.lo}function V6(e,n){let t=e,i=(e>>>28|n<<4)>>>0,r=n>>>24;return r===0?i===0?t<16384?t<128?1:2:t<2097152?3:4:i<16384?i<128?5:6:i<2097152?7:8:r<128?9:10}function K6(e,n,t){n[t]=e&255,n[t+1]=e>>>8&255,n[t+2]=e>>>16&255,n[t+3]=e>>>24}function W6(e,n,t){n[t]=e&255}});var Ce=I(Wd=>{"use strict";Object.defineProperty(Wd,"__esModule",{value:!0});Wd.BinaryWriter=Wd.BinaryReader=Wd.WireType=void 0;var qy=UD(),Nt=FD(),mu;(function(e){e[e.Varint=0]="Varint",e[e.Fixed64=1]="Fixed64",e[e.Bytes=2]="Bytes",e[e.Fixed32=5]="Fixed32"})(mu||(Wd.WireType=mu={}));var Hy=class{buf;pos;type;len;assertBounds(){if(this.pos>this.len)throw new RangeError("premature EOF")}constructor(n){this.buf=n?new Uint8Array(n):new Uint8Array(0),this.pos=0,this.type=0,this.len=this.buf.length}tag(){let n=this.uint32(),t=n>>>3,i=n&7;if(t<=0||i<0||i>5)throw new Error("illegal tag: field no "+t+" wire type "+i);return[t,i,n]}skip(n){if(typeof n=="number"){if(this.pos+n>this.len)throw qD(this,n);this.pos+=n}else do if(this.pos>=this.len)throw qD(this);while(this.buf[this.pos++]&128);return this}skipType(n){switch(n){case mu.Varint:this.skip();break;case mu.Fixed64:this.skip(8);break;case mu.Bytes:this.skip(this.uint32());break;case 3:for(;(n=this.uint32()&7)!==4;)this.skipType(n);break;case mu.Fixed32:this.skip(4);break;default:throw Error("invalid wire type "+n+" at offset "+this.pos)}return this}uint32(){return Nt.varint32read.bind(this)()}int32(){return this.uint32()|0}sint32(){let n=this.uint32();return n%2===1?(n+1)/-2:n/2}fixed32(){let n=(0,Nt.readUInt32)(this.buf,this.pos);return this.pos+=4,n}sfixed32(){let n=(0,Nt.readInt32)(this.buf,this.pos);return this.pos+=4,n}int64(){let[n,t]=Nt.varint64read.bind(this)();return BigInt((0,Nt.int64ToString)(n,t))}uint64(){let[n,t]=Nt.varint64read.bind(this)();return BigInt((0,Nt.uInt64ToString)(n,t))}sint64(){let[n,t]=Nt.varint64read.bind(this)();return[n,t]=(0,Nt.zzDecode)(n,t),BigInt((0,Nt.int64ToString)(n,t))}fixed64(){let n=this.sfixed32(),t=this.sfixed32();return BigInt((0,Nt.uInt64ToString)(n,t))}sfixed64(){let n=this.sfixed32(),t=this.sfixed32();return BigInt((0,Nt.int64ToString)(n,t))}float(){throw new Error("float not supported")}double(){throw new Error("double not supported")}bool(){let[n,t]=Nt.varint64read.bind(this)();return n!==0||t!==0}bytes(){let n=this.uint32(),t=this.pos;return this.pos+=n,this.assertBounds(),this.buf.subarray(t,t+n)}string(){let n=this.bytes();return(0,qy.utf8Read)(n,0,n.length)}};Wd.BinaryReader=Hy;var xc=class{fn;len;val;next;constructor(n,t,i){this.fn=n,this.len=t,this.val=i}proceed(n,t){this.fn&&this.fn(this.val,n,t)}},My=class{head;tail;len;next;constructor(n){this.head=n.head,this.tail=n.tail,this.len=n.len,this.next=n.states}},_y=class e{len=0;head;tail;states;constructor(){this.head=new xc(null,0,0),this.tail=this.head,this.states=null}static create(){return new e}static alloc(n){return typeof Uint8Array<"u"?Y6(t=>new Uint8Array(t),Uint8Array.prototype.subarray)(n):new Array(n)}_push(n,t,i){return this.tail=this.tail.next=new xc(n,t,i),this.len+=t,this}finish(){let n=this.head.next,t=0,i=e.alloc(this.len);for(;n;)n.proceed(i,t),t+=n.len,n=n.next;return i}fork(){return this.states=new My(this),this.head=this.tail=new xc(null,0,0),this.len=0,this}reset(){return this.states?(this.head=this.states.head,this.tail=this.states.tail,this.len=this.states.len,this.states=this.states.next):(this.head=this.tail=new xc(null,0,0),this.len=0),this}ldelim(){let n=this.head,t=this.tail,i=this.len;return this.reset().uint32(i),i&&(this.tail.next=n.next,this.tail=t,this.len+=i),this}tag(n,t){return this.uint32((n<<3|t)>>>0)}uint32(n){return this.len+=(this.tail=this.tail.next=new xc(Nt.writeVarint32,(n=n>>>0)<128?1:n<16384?2:n<2097152?3:n<268435456?4:5,n)).len,this}int32(n){return n<0?this._push(Nt.writeVarint64,10,(0,Nt.int64FromString)(n.toString())):this.uint32(n)}sint32(n){return this.uint32((n<<1^n>>31)>>>0)}int64(n){let{lo:t,hi:i}=(0,Nt.int64FromString)(n.toString());return this._push(Nt.writeVarint64,(0,Nt.int64Length)(t,i),{lo:t,hi:i})}uint64=e.prototype.int64;sint64(n){let{lo:t,hi:i}=(0,Nt.int64FromString)(n.toString());return[t,i]=(0,Nt.zzEncode)(t,i),this._push(Nt.writeVarint64,(0,Nt.int64Length)(t,i),{lo:t,hi:i})}fixed64(n){let{lo:t,hi:i}=(0,Nt.int64FromString)(n.toString());return this._push(Nt.writeFixed32,4,t)._push(Nt.writeFixed32,4,i)}sfixed64=e.prototype.fixed64;bool(n){return this._push(Nt.writeByte,1,n?1:0)}fixed32(n){return this._push(Nt.writeFixed32,4,n>>>0)}sfixed32=e.prototype.fixed32;float(n){throw new Error("float not supported"+n)}double(n){throw new Error("double not supported"+n)}bytes(n){let t=n.length>>>0;return t?this.uint32(t)._push(L6,t,n):this._push(Nt.writeByte,1,0)}string(n){let t=(0,qy.utf8Length)(n);return t?this.uint32(t)._push(qy.utf8Write,t,n):this._push(Nt.writeByte,1,0)}};Wd.BinaryWriter=_y;function L6(e,n,t){if(typeof Uint8Array<"u")n.set(e,t);else for(let i=0;i<e.length;++i)n[t+i]=e[i]}function Y6(e,n,t){let i=t||8192,r=i>>>1,o=null,a=i;return function(d){if(d<1||d>r)return e(d);a+d>i&&(o=e(i),a=0);let A=n.call(o,a,a+=d);return a&7&&(a=(a|7)+1),A}}function qD(e,n){return RangeError("index out of range: "+e.pos+" + "+(n||1)+" > "+e.len)}});var Ee=I(ro=>{"use strict";Object.defineProperty(ro,"__esModule",{value:!0});ro.setPaginationParams=void 0;ro.bytesFromBase64=Z6;ro.base64FromBytes=$6;ro.omitDefault=j6;ro.toDuration=eK;ro.fromDuration=nK;ro.isSet=Gy;ro.isObject=tK;ro.isRpc=iK;ro.toTimestamp=Vy;ro.fromTimestamp=oK;ro.fromJsonTimestamp=sK;var Cu=(()=>{if(typeof Cu<"u")return Cu;if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw"Unable to locate global object"})(),z6=Cu.atob||(e=>Cu.Buffer.from(e,"base64").toString("binary"));function Z6(e){let n=z6(e),t=new Uint8Array(n.length);for(let i=0;i<n.length;++i)t[i]=n.charCodeAt(i);return t}var X6=Cu.btoa||(e=>Cu.Buffer.from(e,"binary").toString("base64"));function $6(e){let n=[];return e.forEach(t=>{n.push(String.fromCharCode(t))}),X6(n.join(""))}function j6(e){if(typeof e=="string")return e===""?void 0:e;if(typeof e=="number")return e===0?void 0:e;if(typeof e=="boolean")return e===!1?void 0:e;if(typeof e=="bigint")return e===BigInt(0)?void 0:e;throw new Error(`Got unsupported type ${typeof e}`)}function eK(e){return{seconds:BigInt(Math.floor(parseInt(e)/1e9)),nanos:parseInt(e)%1e9}}function nK(e){return(parseInt(e.seconds.toString())*1e9+e.nanos).toString()}function Gy(e){return e!=null}function tK(e){return typeof e=="object"&&e!==null}var rK=(e,n)=>(n&&(typeof n?.countTotal<"u"&&(e.params["pagination.count_total"]=n.countTotal),typeof n?.key<"u"&&(e.params["pagination.key"]=Buffer.from(n.key).toString("base64")),typeof n?.limit<"u"&&(e.params["pagination.limit"]=n.limit.toString()),typeof n?.offset<"u"&&(e.params["pagination.offset"]=n.offset.toString()),typeof n?.reverse<"u"&&(e.params["pagination.reverse"]=n.reverse)),e);ro.setPaginationParams=rK;function iK(e){return e!=null&&typeof e.request=="function"}function Vy(e){let n=dK(e.getTime()/1e3),t=e.getTime()%1e3*1e6;return{seconds:n,nanos:t}}function oK(e){let n=Number(e.seconds)*1e3;return n+=e.nanos/1e6,new Date(n)}var aK=e=>({seconds:Gy(e.seconds)?BigInt(e.seconds.toString()):BigInt(0),nanos:Gy(e.nanos)?Number(e.nanos):0});function sK(e){return e instanceof Date?Vy(e):typeof e=="string"?Vy(new Date(e)):aK(e)}function dK(e){return BigInt(Math.trunc(e))}});var vt=I(Su=>{"use strict";Object.defineProperty(Su,"__esModule",{value:!0});Su.Any=Su.protobufPackage=void 0;var Ky=Ce(),rp=Ee();Su.protobufPackage="google.protobuf";function Wy(){return{typeUrl:"",value:new Uint8Array}}Su.Any={typeUrl:"/google.protobuf.Any",encode(e,n=Ky.BinaryWriter.create()){return e.typeUrl!==""&&n.uint32(10).string(e.typeUrl),e.value.length!==0&&n.uint32(18).bytes(e.value),n},decode(e,n){let t=e instanceof Ky.BinaryReader?e:new Ky.BinaryReader(e),i=n===void 0?t.len:t.pos+n,r=Wy();for(;t.pos<i;){let o=t.uint32();switch(o>>>3){case 1:r.typeUrl=t.string();break;case 2:r.value=t.bytes();break;default:t.skipType(o&7);break}}return r},fromJSON(e){let n=Wy();return(0,rp.isSet)(e.typeUrl)&&(n.typeUrl=String(e.typeUrl)),(0,rp.isSet)(e.value)&&(n.value=(0,rp.bytesFromBase64)(e.value)),n},toJSON(e){let n={};return e.typeUrl!==void 0&&(n.typeUrl=e.typeUrl),e.value!==void 0&&(n.value=(0,rp.base64FromBytes)(e.value!==void 0?e.value:new Uint8Array)),n},fromPartial(e){let n=Wy();return n.typeUrl=e.typeUrl??"",n.value=e.value??new Uint8Array,n}}});var qi=I(ku=>{"use strict";Object.defineProperty(ku,"__esModule",{value:!0});ku.Timestamp=ku.protobufPackage=void 0;var Ly=Ce(),HD=Ee();ku.protobufPackage="google.protobuf";function Yy(){return{seconds:BigInt(0),nanos:0}}ku.Timestamp={typeUrl:"/google.protobuf.Timestamp",encode(e,n=Ly.BinaryWriter.create()){return e.seconds!==BigInt(0)&&n.uint32(8).int64(e.seconds),e.nanos!==0&&n.uint32(16).int32(e.nanos),n},decode(e,n){let t=e instanceof Ly.BinaryReader?e:new Ly.BinaryReader(e),i=n===void 0?t.len:t.pos+n,r=Yy();for(;t.pos<i;){let o=t.uint32();switch(o>>>3){case 1:r.seconds=t.int64();break;case 2:r.nanos=t.int32();break;default:t.skipType(o&7);break}}return r},fromJSON(e){let n=Yy();return(0,HD.isSet)(e.seconds)&&(n.seconds=BigInt(e.seconds.toString())),(0,HD.isSet)(e.nanos)&&(n.nanos=Number(e.nanos)),n},toJSON(e){let n={};return e.seconds!==void 0&&(n.seconds=(e.seconds||BigInt(0)).toString()),e.nanos!==void 0&&(n.nanos=Math.round(e.nanos)),n},fromPartial(e){let n=Yy();return e.seconds!==void 0&&e.seconds!==null&&(n.seconds=BigInt(e.seconds.toString())),n.nanos=e.nanos??0,n}}});var ip=I(Ld=>{"use strict";Object.defineProperty(Ld,"__esModule",{value:!0});Ld.CompactBitArray=Ld.MultiSignature=Ld.protobufPackage=void 0;var Qu=Ce(),Eu=Ee();Ld.protobufPackage="cosmos.crypto.multisig.v1beta1";function zy(){return{signatures:[]}}Ld.MultiSignature={typeUrl:"/cosmos.crypto.multisig.v1beta1.MultiSignature",encode(e,n=Qu.BinaryWriter.create()){for(let t of e.signatures)n.uint32(10).bytes(t);return n},decode(e,n){let t=e instanceof Qu.BinaryReader?e:new Qu.BinaryReader(e),i=n===void 0?t.len:t.pos+n,r=zy();for(;t.pos<i;){let o=t.uint32();o>>>3===1?r.signatures.push(t.bytes()):t.skipType(o&7)}return r},fromJSON(e){let n=zy();return Array.isArray(e?.signatures)&&(n.signatures=e.signatures.map(t=>(0,Eu.bytesFromBase64)(t))),n},toJSON(e){let n={};return e.signatures?n.signatures=e.signatures.map(t=>(0,Eu.base64FromBytes)(t!==void 0?t:new Uint8Array)):n.signatures=[],n},fromPartial(e){let n=zy();return n.signatures=e.signatures?.map(t=>t)||[],n}};function Zy(){return{extraBitsStored:0,elems:new Uint8Array}}Ld.CompactBitArray={typeUrl:"/cosmos.crypto.multisig.v1beta1.CompactBitArray",encode(e,n=Qu.BinaryWriter.create()){return e.extraBitsStored!==0&&n.uint32(8).uint32(e.extraBitsStored),e.elems.length!==0&&n.uint32(18).bytes(e.elems),n},decode(e,n){let t=e instanceof Qu.BinaryReader?e:new Qu.BinaryReader(e),i=n===void 0?t.len:t.pos+n,r=Zy();for(;t.pos<i;){let o=t.uint32();switch(o>>>3){case 1:r.extraBitsStored=t.uint32();break;case 2:r.elems=t.bytes();break;default:t.skipType(o&7);break}}return r},fromJSON(e){let n=Zy();return(0,Eu.isSet)(e.extraBitsStored)&&(n.extraBitsStored=Number(e.extraBitsStored)),(0,Eu.isSet)(e.elems)&&(n.elems=(0,Eu.bytesFromBase64)(e.elems)),n},toJSON(e){let n={};return e.extraBitsStored!==void 0&&(n.extraBitsStored=Math.round(e.extraBitsStored)),e.elems!==void 0&&(n.elems=(0,Eu.base64FromBytes)(e.elems!==void 0?e.elems:new Uint8Array)),n},fromPartial(e){let n=Zy();return n.extraBitsStored=e.extraBitsStored??0,n.elems=e.elems??new Uint8Array,n}}});var wu=I(Qn=>{"use strict";Object.defineProperty(Qn,"__esModule",{value:!0});Qn.SignatureDescriptor_Data_Multi=Qn.SignatureDescriptor_Data_Single=Qn.SignatureDescriptor_Data=Qn.SignatureDescriptor=Qn.SignatureDescriptors=Qn.SignMode=Qn.protobufPackage=void 0;Qn.signModeFromJSON=MD;Qn.signModeToJSON=_D;var kl=ip(),El=vt(),io=Ce(),Is=Ee();Qn.protobufPackage="cosmos.tx.signing.v1beta1";var Hi;(function(e){e[e.SIGN_MODE_UNSPECIFIED=0]="SIGN_MODE_UNSPECIFIED",e[e.SIGN_MODE_DIRECT=1]="SIGN_MODE_DIRECT",e[e.SIGN_MODE_TEXTUAL=2]="SIGN_MODE_TEXTUAL",e[e.SIGN_MODE_DIRECT_AUX=3]="SIGN_MODE_DIRECT_AUX",e[e.SIGN_MODE_LEGACY_AMINO_JSON=127]="SIGN_MODE_LEGACY_AMINO_JSON",e[e.SIGN_MODE_EIP_191=191]="SIGN_MODE_EIP_191",e[e.UNRECOGNIZED=-1]="UNRECOGNIZED"})(Hi||(Qn.SignMode=Hi={}));function MD(e){switch(e){case 0:case"SIGN_MODE_UNSPECIFIED":return Hi.SIGN_MODE_UNSPECIFIED;case 1:case"SIGN_MODE_DIRECT":return Hi.SIGN_MODE_DIRECT;case 2:case"SIGN_MODE_TEXTUAL":return Hi.SIGN_MODE_TEXTUAL;case 3:case"SIGN_MODE_DIRECT_AUX":return Hi.SIGN_MODE_DIRECT_AUX;case 127:case"SIGN_MODE_LEGACY_AMINO_JSON":return Hi.SIGN_MODE_LEGACY_AMINO_JSON;case 191:case"SIGN_MODE_EIP_191":return Hi.SIGN_MODE_EIP_191;default:return Hi.UNRECOGNIZED}}function _D(e){switch(e){case Hi.SIGN_MODE_UNSPECIFIED:return"SIGN_MODE_UNSPECIFIED";case Hi.SIGN_MODE_DIRECT:return"SIGN_MODE_DIRECT";case Hi.SIGN_MODE_TEXTUAL:return"SIGN_MODE_TEXTUAL";case Hi.SIGN_MODE_DIRECT_AUX:return"SIGN_MODE_DIRECT_AUX";case Hi.SIGN_MODE_LEGACY_AMINO_JSON:return"SIGN_MODE_LEGACY_AMINO_JSON";case Hi.SIGN_MODE_EIP_191:return"SIGN_MODE_EIP_191";case Hi.UNRECOGNIZED:default:return"UNRECOGNIZED"}}function Xy(){return{signatures:[]}}Qn.SignatureDescriptors={typeUrl:"/cosmos.tx.signing.v1beta1.SignatureDescriptors",encode(e,n=io.BinaryWriter.create()){for(let t of e.signatures)Qn.SignatureDescriptor.encode(t,n.uint32(10).fork()).ldelim();return n},decode(e,n){let t=e instanceof io.BinaryReader?e:new io.BinaryReader(e),i=n===void 0?t.len:t.pos+n,r=Xy();for(;t.pos<i;){let o=t.uint32();o>>>3===1?r.signatures.push(Qn.SignatureDescriptor.decode(t,t.uint32())):t.skipType(o&7)}return r},fromJSON(e){let n=Xy();return Array.isArray(e?.signatures)&&(n.signatures=e.signatures.map(t=>Qn.SignatureDescriptor.fromJSON(t))),n},toJSON(e){let n={};return e.signatures?n.signatures=e.signatures.map(t=>t?Qn.SignatureDescriptor.toJSON(t):void 0):n.signatures=[],n},fromPartial(e){let n=Xy();return n.signatures=e.signatures?.map(t=>Qn.SignatureDescriptor.fromPartial(t))||[],n}};function $y(){return{publicKey:void 0,data:void 0,sequence:BigInt(0)}}Qn.SignatureDescriptor={typeUrl:"/cosmos.tx.signing.v1beta1.SignatureDescriptor",encode(e,n=io.BinaryWriter.create()){return e.publicKey!==void 0&&El.Any.encode(e.publicKey,n.uint32(10).fork()).ldelim(),e.data!==void 0&&Qn.SignatureDescriptor_Data.encode(e.data,n.uint32(18).fork()).ldelim(),e.sequence!==BigInt(0)&&n.uint32(24).uint64(e.sequence),n},decode(e,n){let t=e instanceof io.BinaryReader?e:new io.BinaryReader(e),i=n===void 0?t.len:t.pos+n,r=$y();for(;t.pos<i;){let o=t.uint32();switch(o>>>3){case 1:r.publicKey=El.Any.decode(t,t.uint32());break;case 2:r.data=Qn.SignatureDescriptor_Data.decode(t,t.uint32());break;case 3:r.sequence=t.uint64();break;default:t.skipType(o&7);break}}return r},fromJSON(e){let n=$y();return(0,Is.isSet)(e.publicKey)&&(n.publicKey=El.Any.fromJSON(e.publicKey)),(0,Is.isSet)(e.data)&&(n.data=Qn.SignatureDescriptor_Data.fromJSON(e.data)),(0,Is.isSet)(e.sequence)&&(n.sequence=BigInt(e.sequence.toString())),n},toJSON(e){let n={};return e.publicKey!==void 0&&(n.publicKey=e.publicKey?El.Any.toJSON(e.publicKey):void 0),e.data!==void 0&&(n.data=e.data?Qn.SignatureDescriptor_Data.toJSON(e.data):void 0),e.sequence!==void 0&&(n.sequence=(e.sequence||BigInt(0)).toString()),n},fromPartial(e){let n=$y();return e.publicKey!==void 0&&e.publicKey!==null&&(n.publicKey=El.Any.fromPartial(e.publicKey)),e.data!==void 0&&e.data!==null&&(n.data=Qn.SignatureDescriptor_Data.fromPartial(e.data)),e.sequence!==void 0&&e.sequence!==null&&(n.sequence=BigInt(e.sequence.toString())),n}};function jy(){return{single:void 0,multi:void 0}}Qn.SignatureDescriptor_Data={typeUrl:"/cosmos.tx.signing.v1beta1.Data",encode(e,n=io.BinaryWriter.create()){return e.single!==void 0&&Qn.SignatureDescriptor_Data_Single.encode(e.single,n.uint32(10).fork()).ldelim(),e.multi!==void 0&&Qn.SignatureDescriptor_Data_Multi.encode(e.multi,n.uint32(18).fork()).ldelim(),n},decode(e,n){let t=e instanceof io.BinaryReader?e:new io.BinaryReader(e),i=n===void 0?t.len:t.pos+n,r=jy();for(;t.pos<i;){let o=t.uint32();switch(o>>>3){case 1:r.single=Qn.SignatureDescriptor_Data_Single.decode(t,t.uint32());break;case 2:r.multi=Qn.SignatureDescriptor_Data_Multi.decode(t,t.uint32());break;default:t.skipType(o&7);break}}return r},fromJSON(e){let n=jy();return(0,Is.isSet)(e.single)&&(n.single=Qn.SignatureDescriptor_Data_Single.fromJSON(e.single)),(0,Is.isSet)(e.multi)&&(n.multi=Qn.SignatureDescriptor_Data_Multi.fromJSON(e.multi)),n},toJSON(e){let n={};return e.single!==void 0&&(n.single=e.single?Qn.SignatureDescriptor_Data_Single.toJSON(e.single):void 0),e.multi!==void 0&&(n.multi=e.multi?Qn.SignatureDescriptor_Data_Multi.toJSON(e.multi):void 0),n},fromPartial(e){let n=jy();return e.single!==void 0&&e.single!==null&&(n.single=Qn.SignatureDescriptor_Data_Single.fromPartial(e.single)),e.multi!==void 0&&e.multi!==null&&(n.multi=Qn.SignatureDescriptor_Data_Multi.fromPartial(e.multi)),n}};function eB(){return{mode:0,signature:new Uint8Array}}Qn.SignatureDescriptor_Data_Single={typeUrl:"/cosmos.tx.signing.v1beta1.Single",encode(e,n=io.BinaryWriter.create()){return e.mode!==0&&n.uint32(8).int32(e.mode),e.signature.length!==0&&n.uint32(18).bytes(e.signature),n},decode(e,n){let t=e instanceof io.BinaryReader?e:new io.BinaryReader(e),i=n===void 0?t.len:t.pos+n,r=eB();for(;t.pos<i;){let o=t.uint32();switch(o>>>3){case 1:r.mode=t.int32();break;case 2:r.signature=t.bytes();break;default:t.skipType(o&7);break}}return r},fromJSON(e){let n=eB();return(0,Is.isSet)(e.mode)&&(n.mode=MD(e.mode)),(0,Is.isSet)(e.signature)&&(n.signature=(0,Is.bytesFromBase64)(e.signature)),n},toJSON(e){let n={};return e.mode!==void 0&&(n.mode=_D(e.mode)),e.signature!==void 0&&(n.signature=(0,Is.base64FromBytes)(e.signature!==void 0?e.signature:new Uint8Array)),n},fromPartial(e){let n=eB();return n.mode=e.mode??0,n.signature=e.signature??new Uint8Array,n}};function nB(){return{bitarray:void 0,signatures:[]}}Qn.SignatureDescriptor_Data_Multi={typeUrl:"/cosmos.tx.signing.v1beta1.Multi",encode(e,n=io.BinaryWriter.create()){e.bitarray!==void 0&&kl.CompactBitArray.encode(e.bitarray,n.uint32(10).fork()).ldelim();for(let t of e.signatures)Qn.SignatureDescriptor_Data.encode(t,n.uint32(18).fork()).ldelim();return n},decode(e,n){let t=e instanceof io.BinaryReader?e:new io.BinaryReader(e),i=n===void 0?t.len:t.pos+n,r=nB();for(;t.pos<i;){let o=t.uint32();switch(o>>>3){case 1:r.bitarray=kl.CompactBitArray.decode(t,t.uint32());break;case 2:r.signatures.push(Qn.SignatureDescriptor_Data.decode(t,t.uint32()));break;default:t.skipType(o&7);break}}return r},fromJSON(e){let n=nB();return(0,Is.isSet)(e.bitarray)&&(n.bitarray=kl.CompactBitArray.fromJSON(e.bitarray)),Array.isArray(e?.signatures)&&(n.signatures=e.signatures.map(t=>Qn.SignatureDescriptor_Data.fromJSON(t))),n},toJSON(e){let n={};return e.bitarray!==void 0&&(n.bitarray=e.bitarray?kl.CompactBitArray.toJSON(e.bitarray):void 0),e.signatures?n.signatures=e.signatures.map(t=>t?Qn.SignatureDescriptor_Data.toJSON(t):void 0):n.signatures=[],n},fromPartial(e){let n=nB();return e.bitarray!==void 0&&e.bitarray!==null&&(n.bitarray=kl.CompactBitArray.fromPartial(e.bitarray)),n.signatures=e.signatures?.map(t=>Qn.SignatureDescriptor_Data.fromPartial(t))||[],n}}});var Dr=I(aa=>{"use strict";Object.defineProperty(aa,"__esModule",{value:!0});aa.DecProto=aa.IntProto=aa.DecCoin=aa.Coin=aa.protobufPackage=void 0;var sa=Ce(),bu=Ee();aa.protobufPackage="cosmos.base.v1beta1";function tB(){return{denom:"",amount:""}}aa.Coin={typeUrl:"/cosmos.base.v1beta1.Coin",encode(e,n=sa.BinaryWriter.create()){return e.denom!==""&&n.uint32(10).string(e.denom),e.amount!==""&&n.uint32(18).string(e.amount),n},decode(e,n){let t=e instanceof sa.BinaryReader?e:new sa.BinaryReader(e),i=n===void 0?t.len:t.pos+n,r=tB();for(;t.pos<i;){let o=t.uint32();switch(o>>>3){case 1:r.denom=t.string();break;case 2:r.amount=t.string();break;default:t.skipType(o&7);break}}return r},fromJSON(e){let n=tB();return(0,bu.isSet)(e.denom)&&(n.denom=String(e.denom)),(0,bu.isSet)(e.amount)&&(n.amount=String(e.amount)),n},toJSON(e){let n={};return e.denom!==void 0&&(n.denom=e.denom),e.amount!==void 0&&(n.amount=e.amount),n},fromPartial(e){let n=tB();return n.denom=e.denom??"",n.amount=e.amount??"",n}};function rB(){return{denom:"",amount:""}}aa.DecCoin={typeUrl:"/cosmos.base.v1beta1.DecCoin",encode(e,n=sa.BinaryWriter.create()){return e.denom!==""&&n.uint32(10).string(e.denom),e.amount!==""&&n.uint32(18).string(e.amount),n},decode(e,n){let t=e instanceof sa.BinaryReader?e:new sa.BinaryReader(e),i=n===void 0?t.len:t.pos+n,r=rB();for(;t.pos<i;){let o=t.uint32();switch(o>>>3){case 1:r.denom=t.string();break;case 2:r.amount=t.string();break;default:t.skipType(o&7);break}}return r},fromJSON(e){let n=rB();return(0,bu.isSet)(e.denom)&&(n.denom=String(e.denom)),(0,bu.isSet)(e.amount)&&(n.amount=String(e.amount)),n},toJSON(e){let n={};return e.denom!==void 0&&(n.denom=e.denom),e.amount!==void 0&&(n.amount=e.amount),n},fromPartial(e){let n=rB();return n.denom=e.denom??"",n.amount=e.amount??"",n}};function iB(){return{int:""}}aa.IntProto={typeUrl:"/cosmos.base.v1beta1.IntProto",encode(e,n=sa.BinaryWriter.create()){return e.int!==""&&n.uint32(10).string(e.int),n},decode(e,n){let t=e instanceof sa.BinaryReader?e:new sa.BinaryReader(e),i=n===void 0?t.len:t.pos+n,r=iB();for(;t.pos<i;){let o=t.uint32();o>>>3===1?r.int=t.string():t.skipType(o&7)}return r},fromJSON(e){let n=iB();return(0,bu.isSet)(e.int)&&(n.int=String(e.int)),n},toJSON(e){let n={};return e.int!==void 0&&(n.int=e.int),n},fromPartial(e){let n=iB();return n.int=e.int??"",n}};function oB(){return{dec:""}}aa.DecProto={typeUrl:"/cosmos.base.v1beta1.DecProto",encode(e,n=sa.BinaryWriter.create()){return e.dec!==""&&n.uint32(10).string(e.dec),n},decode(e,n){let t=e instanceof sa.BinaryReader?e:new sa.BinaryReader(e),i=n===void 0?t.len:t.pos+n,r=oB();for(;t.pos<i;){let o=t.uint32();o>>>3===1?r.dec=t.string():t.skipType(o&7)}return r},fromJSON(e){let n=oB();return(0,bu.isSet)(e.dec)&&(n.dec=String(e.dec)),n},toJSON(e){let n={};return e.dec!==void 0&&(n.dec=e.dec),n},fromPartial(e){let n=oB();return n.dec=e.dec??"",n}}});var Yd=I(le=>{"use strict";Object.defineProperty(le,"__esModule",{value:!0});le.AuxSignerData=le.Tip=le.Fee=le.ModeInfo_Multi=le.ModeInfo_Single=le.ModeInfo=le.SignerInfo=le.AuthInfo=le.TxBody=le.SignDocDirectAux=le.SignDoc=le.TxRaw=le.Tx=le.protobufPackage=void 0;var jt=vt(),aB=qi(),op=wu(),Ql=ip(),hs=Dr(),Zn=Ce(),tn=Ee();le.protobufPackage="cosmos.tx.v1beta1";function sB(){return{body:void 0,authInfo:void 0,signatures:[]}}le.Tx={typeUrl:"/cosmos.tx.v1beta1.Tx",encode(e,n=Zn.BinaryWriter.create()){e.body!==void 0&&le.TxBody.encode(e.body,n.uint32(10).fork()).ldelim(),e.authInfo!==void 0&&le.AuthInfo.encode(e.authInfo,n.uint32(18).fork()).ldelim();for(let t of e.signatures)n.uint32(26).bytes(t);return n},decode(e,n){let t=e instanceof Zn.BinaryReader?e:new Zn.BinaryReader(e),i=n===void 0?t.len:t.pos+n,r=sB();for(;t.pos<i;){let o=t.uint32();switch(o>>>3){case 1:r.body=le.TxBody.decode(t,t.uint32());break;case 2:r.authInfo=le.AuthInfo.decode(t,t.uint32());break;case 3:r.signatures.push(t.bytes());break;default:t.skipType(o&7);break}}return r},fromJSON(e){let n=sB();return(0,tn.isSet)(e.body)&&(n.body=le.TxBody.fromJSON(e.body)),(0,tn.isSet)(e.authInfo)&&(n.authInfo=le.AuthInfo.fromJSON(e.authInfo)),Array.isArray(e?.signatures)&&(n.signatures=e.signatures.map(t=>(0,tn.bytesFromBase64)(t))),n},toJSON(e){let n={};return e.body!==void 0&&(n.body=e.body?le.TxBody.toJSON(e.body):void 0),e.authInfo!==void 0&&(n.authInfo=e.authInfo?le.AuthInfo.toJSON(e.authInfo):void 0),e.signatures?n.signatures=e.signatures.map(t=>(0,tn.base64FromBytes)(t!==void 0?t:new Uint8Array)):n.signatures=[],n},fromPartial(e){let n=sB();return e.body!==void 0&&e.body!==null&&(n.body=le.TxBody.fromPartial(e.body)),e.authInfo!==void 0&&e.authInfo!==null&&(n.authInfo=le.AuthInfo.fromPartial(e.authInfo)),n.signatures=e.signatures?.map(t=>t)||[],n}};function dB(){return{bodyBytes:new Uint8Array,authInfoBytes:new Uint8Array,signatures:[]}}le.TxRaw={typeUrl:"/cosmos.tx.v1beta1.TxRaw",encode(e,n=Zn.BinaryWriter.create()){e.bodyBytes.length!==0&&n.uint32(10).bytes(e.bodyBytes),e.authInfoBytes.length!==0&&n.uint32(18).bytes(e.authInfoBytes);for(let t of e.signatures)n.uint32(26).bytes(t);return n},decode(e,n){let t=e instanceof Zn.BinaryReader?e:new Zn.BinaryReader(e),i=n===void 0?t.len:t.pos+n,r=dB();for(;t.pos<i;){let o=t.uint32();switch(o>>>3){case 1:r.bodyBytes=t.bytes();break;case 2:r.authInfoBytes=t.bytes();break;case 3:r.signatures.push(t.bytes());break;default:t.skipType(o&7);break}}return r},fromJSON(e){let n=dB();return(0,tn.isSet)(e.bodyBytes)&&(n.bodyBytes=(0,tn.bytesFromBase64)(e.bodyBytes)),(0,tn.isSet)(e.authInfoBytes)&&(n.authInfoBytes=(0,tn.bytesFromBase64)(e.authInfoBytes)),Array.isArray(e?.signatures)&&(n.signatures=e.signatures.map(t=>(0,tn.bytesFromBase64)(t))),n},toJSON(e){let n={};return e.bodyBytes!==void 0&&(n.bodyBytes=(0,tn.base64FromBytes)(e.bodyBytes!==void 0?e.bodyBytes:new Uint8Array)),e.authInfoBytes!==void 0&&(n.authInfoBytes=(0,tn.base64FromBytes)(e.authInfoBytes!==void 0?e.authInfoBytes:new Uint8Array)),e.signatures?n.signatures=e.signatures.map(t=>(0,tn.base64FromBytes)(t!==void 0?t:new Uint8Array)):n.signatures=[],n},fromPartial(e){let n=dB();return n.bodyBytes=e.bodyBytes??new Uint8Array,n.authInfoBytes=e.authInfoBytes??new Uint8Array,n.signatures=e.signatures?.map(t=>t)||[],n}};function cB(){return{bodyBytes:new Uint8Array,authInfoBytes:new Uint8Array,chainId:"",accountNumber:BigInt(0)}}le.SignDoc={typeUrl:"/cosmos.tx.v1beta1.SignDoc",encode(e,n=Zn.BinaryWriter.create()){return e.bodyBytes.length!==0&&n.uint32(10).bytes(e.bodyBytes),e.authInfoBytes.length!==0&&n.uint32(18).bytes(e.authInfoBytes),e.chainId!==""&&n.uint32(26).string(e.chainId),e.accountNumber!==BigInt(0)&&n.uint32(32).uint64(e.accountNumber),n},decode(e,n){let t=e instanceof Zn.BinaryReader?e:new Zn.BinaryReader(e),i=n===void 0?t.len:t.pos+n,r=cB();for(;t.pos<i;){let o=t.uint32();switch(o>>>3){case 1:r.bodyBytes=t.bytes();break;case 2:r.authInfoBytes=t.bytes();break;case 3:r.chainId=t.string();break;case 4:r.accountNumber=t.uint64();break;default:t.skipType(o&7);break}}return r},fromJSON(e){let n=cB();return(0,tn.isSet)(e.bodyBytes)&&(n.bodyBytes=(0,tn.bytesFromBase64)(e.bodyBytes)),(0,tn.isSet)(e.authInfoBytes)&&(n.authInfoBytes=(0,tn.bytesFromBase64)(e.authInfoBytes)),(0,tn.isSet)(e.chainId)&&(n.chainId=String(e.chainId)),(0,tn.isSet)(e.accountNumber)&&(n.accountNumber=BigInt(e.accountNumber.toString())),n},toJSON(e){let n={};return e.bodyBytes!==void 0&&(n.bodyBytes=(0,tn.base64FromBytes)(e.bodyBytes!==void 0?e.bodyBytes:new Uint8Array)),e.authInfoBytes!==void 0&&(n.authInfoBytes=(0,tn.base64FromBytes)(e.authInfoBytes!==void 0?e.authInfoBytes:new Uint8Array)),e.chainId!==void 0&&(n.chainId=e.chainId),e.accountNumber!==void 0&&(n.accountNumber=(e.accountNumber||BigInt(0)).toString()),n},fromPartial(e){let n=cB();return n.bodyBytes=e.bodyBytes??new Uint8Array,n.authInfoBytes=e.authInfoBytes??new Uint8Array,n.chainId=e.chainId??"",e.accountNumber!==void 0&&e.accountNumber!==null&&(n.accountNumber=BigInt(e.accountNumber.toString())),n}};function uB(){return{bodyBytes:new Uint8Array,publicKey:void 0,chainId:"",accountNumber:BigInt(0),sequence:BigInt(0),tip:void 0}}le.SignDocDirectAux={typeUrl:"/cosmos.tx.v1beta1.SignDocDirectAux",encode(e,n=Zn.BinaryWriter.create()){return e.bodyBytes.length!==0&&n.uint32(10).bytes(e.bodyBytes),e.publicKey!==void 0&&jt.Any.encode(e.publicKey,n.uint32(18).fork()).ldelim(),e.chainId!==""&&n.uint32(26).string(e.chainId),e.accountNumber!==BigInt(0)&&n.uint32(32).uint64(e.accountNumber),e.sequence!==BigInt(0)&&n.uint32(40).uint64(e.sequence),e.tip!==void 0&&le.Tip.encode(e.tip,n.uint32(50).fork()).ldelim(),n},decode(e,n){let t=e instanceof Zn.BinaryReader?e:new Zn.BinaryReader(e),i=n===void 0?t.len:t.pos+n,r=uB();for(;t.pos<i;){let o=t.uint32();switch(o>>>3){case 1:r.bodyBytes=t.bytes();break;case 2:r.publicKey=jt.Any.decode(t,t.uint32());break;case 3:r.chainId=t.string();break;case 4:r.accountNumber=t.uint64();break;case 5:r.sequence=t.uint64();break;case 6:r.tip=le.Tip.decode(t,t.uint32());break;default:t.skipType(o&7);break}}return r},fromJSON(e){let n=uB();return(0,tn.isSet)(e.bodyBytes)&&(n.bodyBytes=(0,tn.bytesFromBase64)(e.bodyBytes)),(0,tn.isSet)(e.publicKey)&&(n.publicKey=jt.Any.fromJSON(e.publicKey)),(0,tn.isSet)(e.chainId)&&(n.chainId=String(e.chainId)),(0,tn.isSet)(e.accountNumber)&&(n.accountNumber=BigInt(e.accountNumber.toString())),(0,tn.isSet)(e.sequence)&&(n.sequence=BigInt(e.sequence.toString())),(0,tn.isSet)(e.tip)&&(n.tip=le.Tip.fromJSON(e.tip)),n},toJSON(e){let n={};return e.bodyBytes!==void 0&&(n.bodyBytes=(0,tn.base64FromBytes)(e.bodyBytes!==void 0?e.bodyBytes:new Uint8Array)),e.publicKey!==void 0&&(n.publicKey=e.publicKey?jt.Any.toJSON(e.publicKey):void 0),e.chainId!==void 0&&(n.chainId=e.chainId),e.accountNumber!==void 0&&(n.accountNumber=(e.accountNumber||BigInt(0)).toString()),e.sequence!==void 0&&(n.sequence=(e.sequence||BigInt(0)).toString()),e.tip!==void 0&&(n.tip=e.tip?le.Tip.toJSON(e.tip):void 0),n},fromPartial(e){let n=uB();return n.bodyBytes=e.bodyBytes??new Uint8Array,e.publicKey!==void 0&&e.publicKey!==null&&(n.publicKey=jt.Any.fromPartial(e.publicKey)),n.chainId=e.chainId??"",e.accountNumber!==void 0&&e.accountNumber!==null&&(n.accountNumber=BigInt(e.accountNumber.toString())),e.sequence!==void 0&&e.sequence!==null&&(n.sequence=BigInt(e.sequence.toString())),e.tip!==void 0&&e.tip!==null&&(n.tip=le.Tip.fromPartial(e.tip)),n}};function AB(){return{messages:[],memo:"",timeoutHeight:BigInt(0),unordered:!1,timeoutTimestamp:void 0,extensionOptions:[],nonCriticalExtensionOptions:[]}}le.TxBody={typeUrl:"/cosmos.tx.v1beta1.TxBody",encode(e,n=Zn.BinaryWriter.create()){for(let t of e.messages)jt.Any.encode(t,n.uint32(10).fork()).ldelim();e.memo!==""&&n.uint32(18).string(e.memo),e.timeoutHeight!==BigInt(0)&&n.uint32(24).uint64(e.timeoutHeight),e.unordered===!0&&n.uint32(32).bool(e.unordered),e.timeoutTimestamp!==void 0&&aB.Timestamp.encode(e.timeoutTimestamp,n.uint32(42).fork()).ldelim();for(let t of e.extensionOptions)jt.Any.encode(t,n.uint32(8186).fork()).ldelim();for(let t of e.nonCriticalExtensionOptions)jt.Any.encode(t,n.uint32(16378).fork()).ldelim();return n},decode(e,n){let t=e instanceof Zn.BinaryReader?e:new Zn.BinaryReader(e),i=n===void 0?t.len:t.pos+n,r=AB();for(;t.pos<i;){let o=t.uint32();switch(o>>>3){case 1:r.messages.push(jt.Any.decode(t,t.uint32()));break;case 2:r.memo=t.string();break;case 3:r.timeoutHeight=t.uint64();break;case 4:r.unordered=t.bool();break;case 5:r.timeoutTimestamp=aB.Timestamp.decode(t,t.uint32());break;case 1023:r.extensionOptions.push(jt.Any.decode(t,t.uint32()));break;case 2047:r.nonCriticalExtensionOptions.push(jt.Any.decode(t,t.uint32()));break;default:t.skipType(o&7);break}}return r},fromJSON(e){let n=AB();return Array.isArray(e?.messages)&&(n.messages=e.messages.map(t=>jt.Any.fromJSON(t))),(0,tn.isSet)(e.memo)&&(n.memo=String(e.memo)),(0,tn.isSet)(e.timeoutHeight)&&(n.timeoutHeight=BigInt(e.timeoutHeight.toString())),(0,tn.isSet)(e.unordered)&&(n.unordered=!!e.unordered),(0,tn.isSet)(e.timeoutTimestamp)&&(n.timeoutTimestamp=(0,tn.fromJsonTimestamp)(e.timeoutTimestamp)),Array.isArray(e?.extensionOptions)&&(n.extensionOptions=e.extensionOptions.map(t=>jt.Any.fromJSON(t))),Array.isArray(e?.nonCriticalExtensionOptions)&&(n.nonCriticalExtensionOptions=e.nonCriticalExtensionOptions.map(t=>jt.Any.fromJSON(t))),n},toJSON(e){let n={};return e.messages?n.messages=e.messages.map(t=>t?jt.Any.toJSON(t):void 0):n.messages=[],e.memo!==void 0&&(n.memo=e.memo),e.timeoutHeight!==void 0&&(n.timeoutHeight=(e.timeoutHeight||BigInt(0)).toString()),e.unordered!==void 0&&(n.unordered=e.unordered),e.timeoutTimestamp!==void 0&&(n.timeoutTimestamp=(0,tn.fromTimestamp)(e.timeoutTimestamp).toISOString()),e.extensionOptions?n.extensionOptions=e.extensionOptions.map(t=>t?jt.Any.toJSON(t):void 0):n.extensionOptions=[],e.nonCriticalExtensionOptions?n.nonCriticalExtensionOptions=e.nonCriticalExtensionOptions.map(t=>t?jt.Any.toJSON(t):void 0):n.nonCriticalExtensionOptions=[],n},fromPartial(e){let n=AB();return n.messages=e.messages?.map(t=>jt.Any.fromPartial(t))||[],n.memo=e.memo??"",e.timeoutHeight!==void 0&&e.timeoutHeight!==null&&(n.timeoutHeight=BigInt(e.timeoutHeight.toString())),n.unordered=e.unordered??!1,e.timeoutTimestamp!==void 0&&e.timeoutTimestamp!==null&&(n.timeoutTimestamp=aB.Timestamp.fromPartial(e.timeoutTimestamp)),n.extensionOptions=e.extensionOptions?.map(t=>jt.Any.fromPartial(t))||[],n.nonCriticalExtensionOptions=e.nonCriticalExtensionOptions?.map(t=>jt.Any.fromPartial(t))||[],n}};function lB(){return{signerInfos:[],fee:void 0,tip:void 0}}le.AuthInfo={typeUrl:"/cosmos.tx.v1beta1.AuthInfo",encode(e,n=Zn.BinaryWriter.create()){for(let t of e.signerInfos)le.SignerInfo.encode(t,n.uint32(10).fork()).ldelim();return e.fee!==void 0&&le.Fee.encode(e.fee,n.uint32(18).fork()).ldelim(),e.tip!==void 0&&le.Tip.encode(e.tip,n.uint32(26).fork()).ldelim(),n},decode(e,n){let t=e instanceof Zn.BinaryReader?e:new Zn.BinaryReader(e),i=n===void 0?t.len:t.pos+n,r=lB();for(;t.pos<i;){let o=t.uint32();switch(o>>>3){case 1:r.signerInfos.push(le.SignerInfo.decode(t,t.uint32()));break;case 2:r.fee=le.Fee.decode(t,t.uint32());break;case 3:r.tip=le.Tip.decode(t,t.uint32());break;default:t.skipType(o&7);break}}return r},fromJSON(e){let n=lB();return Array.isArray(e?.signerInfos)&&(n.signerInfos=e.signerInfos.map(t=>le.SignerInfo.fromJSON(t))),(0,tn.isSet)(e.fee)&&(n.fee=le.Fee.fromJSON(e.fee)),(0,tn.isSet)(e.tip)&&(n.tip=le.Tip.fromJSON(e.tip)),n},toJSON(e){let n={};return e.signerInfos?n.signerInfos=e.signerInfos.map(t=>t?le.SignerInfo.toJSON(t):void 0):n.signerInfos=[],e.fee!==void 0&&(n.fee=e.fee?le.Fee.toJSON(e.fee):void 0),e.tip!==void 0&&(n.tip=e.tip?le.Tip.toJSON(e.tip):void 0),n},fromPartial(e){let n=lB();return n.signerInfos=e.signerInfos?.map(t=>le.SignerInfo.fromPartial(t))||[],e.fee!==void 0&&e.fee!==null&&(n.fee=le.Fee.fromPartial(e.fee)),e.tip!==void 0&&e.tip!==null&&(n.tip=le.Tip.fromPartial(e.tip)),n}};function fB(){return{publicKey:void 0,modeInfo:void 0,sequence:BigInt(0)}}le.SignerInfo={typeUrl:"/cosmos.tx.v1beta1.SignerInfo",encode(e,n=Zn.BinaryWriter.create()){return e.publicKey!==void 0&&jt.Any.encode(e.publicKey,n.uint32(10).fork()).ldelim(),e.modeInfo!==void 0&&le.ModeInfo.encode(e.modeInfo,n.uint32(18).fork()).ldelim(),e.sequence!==BigInt(0)&&n.uint32(24).uint64(e.sequence),n},decode(e,n){let t=e instanceof Zn.BinaryReader?e:new Zn.BinaryReader(e),i=n===void 0?t.len:t.pos+n,r=fB();for(;t.pos<i;){let o=t.uint32();switch(o>>>3){case 1:r.publicKey=jt.Any.decode(t,t.uint32());break;case 2:r.modeInfo=le.ModeInfo.decode(t,t.uint32());break;case 3:r.sequence=t.uint64();break;default:t.skipType(o&7);break}}return r},fromJSON(e){let n=fB();return(0,tn.isSet)(e.publicKey)&&(n.publicKey=jt.Any.fromJSON(e.publicKey)),(0,tn.isSet)(e.modeInfo)&&(n.modeInfo=le.ModeInfo.fromJSON(e.modeInfo)),(0,tn.isSet)(e.sequence)&&(n.sequence=BigInt(e.sequence.toString())),n},toJSON(e){let n={};return e.publicKey!==void 0&&(n.publicKey=e.publicKey?jt.Any.toJSON(e.publicKey):void 0),e.modeInfo!==void 0&&(n.modeInfo=e.modeInfo?le.ModeInfo.toJSON(e.modeInfo):void 0),e.sequence!==void 0&&(n.sequence=(e.sequence||BigInt(0)).toString()),n},fromPartial(e){let n=fB();return e.publicKey!==void 0&&e.publicKey!==null&&(n.publicKey=jt.Any.fromPartial(e.publicKey)),e.modeInfo!==void 0&&e.modeInfo!==null&&(n.modeInfo=le.ModeInfo.fromPartial(e.modeInfo)),e.sequence!==void 0&&e.sequence!==null&&(n.sequence=BigInt(e.sequence.toString())),n}};function gB(){return{single:void 0,multi:void 0}}le.ModeInfo={typeUrl:"/cosmos.tx.v1beta1.ModeInfo",encode(e,n=Zn.BinaryWriter.create()){return e.single!==void 0&&le.ModeInfo_Single.encode(e.single,n.uint32(10).fork()).ldelim(),e.multi!==void 0&&le.ModeInfo_Multi.encode(e.multi,n.uint32(18).fork()).ldelim(),n},decode(e,n){let t=e instanceof Zn.BinaryReader?e:new Zn.BinaryReader(e),i=n===void 0?t.len:t.pos+n,r=gB();for(;t.pos<i;){let o=t.uint32();switch(o>>>3){case 1:r.single=le.ModeInfo_Single.decode(t,t.uint32());break;case 2:r.multi=le.ModeInfo_Multi.decode(t,t.uint32());break;default:t.skipType(o&7);break}}return r},fromJSON(e){let n=gB();return(0,tn.isSet)(e.single)&&(n.single=le.ModeInfo_Single.fromJSON(e.single)),(0,tn.isSet)(e.multi)&&(n.multi=le.ModeInfo_Multi.fromJSON(e.multi)),n},toJSON(e){let n={};return e.single!==void 0&&(n.single=e.single?le.ModeInfo_Single.toJSON(e.single):void 0),e.multi!==void 0&&(n.multi=e.multi?le.ModeInfo_Multi.toJSON(e.multi):void 0),n},fromPartial(e){let n=gB();return e.single!==void 0&&e.single!==null&&(n.single=le.ModeInfo_Single.fromPartial(e.single)),e.multi!==void 0&&e.multi!==null&&(n.multi=le.ModeInfo_Multi.fromPartial(e.multi)),n}};function pB(){return{mode:0}}le.ModeInfo_Single={typeUrl:"/cosmos.tx.v1beta1.Single",encode(e,n=Zn.BinaryWriter.create()){return e.mode!==0&&n.uint32(8).int32(e.mode),n},decode(e,n){let t=e instanceof Zn.BinaryReader?e:new Zn.BinaryReader(e),i=n===void 0?t.len:t.pos+n,r=pB();for(;t.pos<i;){let o=t.uint32();o>>>3===1?r.mode=t.int32():t.skipType(o&7)}return r},fromJSON(e){let n=pB();return(0,tn.isSet)(e.mode)&&(n.mode=(0,op.signModeFromJSON)(e.mode)),n},toJSON(e){let n={};return e.mode!==void 0&&(n.mode=(0,op.signModeToJSON)(e.mode)),n},fromPartial(e){let n=pB();return n.mode=e.mode??0,n}};function IB(){return{bitarray:void 0,modeInfos:[]}}le.ModeInfo_Multi={typeUrl:"/cosmos.tx.v1beta1.Multi",encode(e,n=Zn.BinaryWriter.create()){e.bitarray!==void 0&&Ql.CompactBitArray.encode(e.bitarray,n.uint32(10).fork()).ldelim();for(let t of e.modeInfos)le.ModeInfo.encode(t,n.uint32(18).fork()).ldelim();return n},decode(e,n){let t=e instanceof Zn.BinaryReader?e:new Zn.BinaryReader(e),i=n===void 0?t.len:t.pos+n,r=IB();for(;t.pos<i;){let o=t.uint32();switch(o>>>3){case 1:r.bitarray=Ql.CompactBitArray.decode(t,t.uint32());break;case 2:r.modeInfos.push(le.ModeInfo.decode(t,t.uint32()));break;default:t.skipType(o&7);break}}return r},fromJSON(e){let n=IB();return(0,tn.isSet)(e.bitarray)&&(n.bitarray=Ql.CompactBitArray.fromJSON(e.bitarray)),Array.isArray(e?.modeInfos)&&(n.modeInfos=e.modeInfos.map(t=>le.ModeInfo.fromJSON(t))),n},toJSON(e){let n={};return e.bitarray!==void 0&&(n.bitarray=e.bitarray?Ql.CompactBitArray.toJSON(e.bitarray):void 0),e.modeInfos?n.modeInfos=e.modeInfos.map(t=>t?le.ModeInfo.toJSON(t):void 0):n.modeInfos=[],n},fromPartial(e){let n=IB();return e.bitarray!==void 0&&e.bitarray!==null&&(n.bitarray=Ql.CompactBitArray.fromPartial(e.bitarray)),n.modeInfos=e.modeInfos?.map(t=>le.ModeInfo.fromPartial(t))||[],n}};function hB(){return{amount:[],gasLimit:BigInt(0),payer:"",granter:""}}le.Fee={typeUrl:"/cosmos.tx.v1beta1.Fee",encode(e,n=Zn.BinaryWriter.create()){for(let t of e.amount)hs.Coin.encode(t,n.uint32(10).fork()).ldelim();return e.gasLimit!==BigInt(0)&&n.uint32(16).uint64(e.gasLimit),e.payer!==""&&n.uint32(26).string(e.payer),e.granter!==""&&n.uint32(34).string(e.granter),n},decode(e,n){let t=e instanceof Zn.BinaryReader?e:new Zn.BinaryReader(e),i=n===void 0?t.len:t.pos+n,r=hB();for(;t.pos<i;){let o=t.uint32();switch(o>>>3){case 1:r.amount.push(hs.Coin.decode(t,t.uint32()));break;case 2:r.gasLimit=t.uint64();break;case 3:r.payer=t.string();break;case 4:r.granter=t.string();break;default:t.skipType(o&7);break}}return r},fromJSON(e){let n=hB();return Array.isArray(e?.amount)&&(n.amount=e.amount.map(t=>hs.Coin.fromJSON(t))),(0,tn.isSet)(e.gasLimit)&&(n.gasLimit=BigInt(e.gasLimit.toString())),(0,tn.isSet)(e.payer)&&(n.payer=String(e.payer)),(0,tn.isSet)(e.granter)&&(n.granter=String(e.granter)),n},toJSON(e){let n={};return e.amount?n.amount=e.amount.map(t=>t?hs.Coin.toJSON(t):void 0):n.amount=[],e.gasLimit!==void 0&&(n.gasLimit=(e.gasLimit||BigInt(0)).toString()),e.payer!==void 0&&(n.payer=e.payer),e.granter!==void 0&&(n.granter=e.granter),n},fromPartial(e){let n=hB();return n.amount=e.amount?.map(t=>hs.Coin.fromPartial(t))||[],e.gasLimit!==void 0&&e.gasLimit!==null&&(n.gasLimit=BigInt(e.gasLimit.toString())),n.payer=e.payer??"",n.granter=e.granter??"",n}};function yB(){return{amount:[],tipper:""}}le.Tip={typeUrl:"/cosmos.tx.v1beta1.Tip",encode(e,n=Zn.BinaryWriter.create()){for(let t of e.amount)hs.Coin.encode(t,n.uint32(10).fork()).ldelim();return e.tipper!==""&&n.uint32(18).string(e.tipper),n},decode(e,n){let t=e instanceof Zn.BinaryReader?e:new Zn.BinaryReader(e),i=n===void 0?t.len:t.pos+n,r=yB();for(;t.pos<i;){let o=t.uint32();switch(o>>>3){case 1:r.amount.push(hs.Coin.decode(t,t.uint32()));break;case 2:r.tipper=t.string();break;default:t.skipType(o&7);break}}return r},fromJSON(e){let n=yB();return Array.isArray(e?.amount)&&(n.amount=e.amount.map(t=>hs.Coin.fromJSON(t))),(0,tn.isSet)(e.tipper)&&(n.tipper=String(e.tipper)),n},toJSON(e){let n={};return e.amount?n.amount=e.amount.map(t=>t?hs.Coin.toJSON(t):void 0):n.amount=[],e.tipper!==void 0&&(n.tipper=e.tipper),n},fromPartial(e){let n=yB();return n.amount=e.amount?.map(t=>hs.Coin.fromPartial(t))||[],n.tipper=e.tipper??"",n}};function BB(){return{address:"",signDoc:void 0,mode:0,sig:new Uint8Array}}le.AuxSignerData={typeUrl:"/cosmos.tx.v1beta1.AuxSignerData",encode(e,n=Zn.BinaryWriter.create()){return e.address!==""&&n.uint32(10).string(e.address),e.signDoc!==void 0&&le.SignDocDirectAux.encode(e.signDoc,n.uint32(18).fork()).ldelim(),e.mode!==0&&n.uint32(24).int32(e.mode),e.sig.length!==0&&n.uint32(34).bytes(e.sig),n},decode(e,n){let t=e instanceof Zn.BinaryReader?e:new Zn.BinaryReader(e),i=n===void 0?t.len:t.pos+n,r=BB();for(;t.pos<i;){let o=t.uint32();switch(o>>>3){case 1:r.address=t.string();break;case 2:r.signDoc=le.SignDocDirectAux.decode(t,t.uint32());break;case 3:r.mode=t.int32();break;case 4:r.sig=t.bytes();break;default:t.skipType(o&7);break}}return r},fromJSON(e){let n=BB();return(0,tn.isSet)(e.address)&&(n.address=String(e.address)),(0,tn.isSet)(e.signDoc)&&(n.signDoc=le.SignDocDirectAux.fromJSON(e.signDoc)),(0,tn.isSet)(e.mode)&&(n.mode=(0,op.signModeFromJSON)(e.mode)),(0,tn.isSet)(e.sig)&&(n.sig=(0,tn.bytesFromBase64)(e.sig)),n},toJSON(e){let n={};return e.address!==void 0&&(n.address=e.address),e.signDoc!==void 0&&(n.signDoc=e.signDoc?le.SignDocDirectAux.toJSON(e.signDoc):void 0),e.mode!==void 0&&(n.mode=(0,op.signModeToJSON)(e.mode)),e.sig!==void 0&&(n.sig=(0,tn.base64FromBytes)(e.sig!==void 0?e.sig:new Uint8Array)),n},fromPartial(e){let n=BB();return n.address=e.address??"",e.signDoc!==void 0&&e.signDoc!==null&&(n.signDoc=le.SignDocDirectAux.fromPartial(e.signDoc)),n.mode=e.mode??0,n.sig=e.sig??new Uint8Array,n}}});var GD=I(CB=>{"use strict";Object.defineProperty(CB,"__esModule",{value:!0});CB.decodeTxRaw=cK;var mB=Yd();function cK(e){let n=mB.TxRaw.decode(e);return{authInfo:mB.AuthInfo.decode(n.authInfoBytes),body:mB.TxBody.decode(n.bodyBytes),signatures:n.signatures}}});var VD=I(ap=>{"use strict";Object.defineProperty(ap,"__esModule",{value:!0});ap.arrayContentEquals=uK;ap.arrayContentStartsWith=AK;function uK(e,n){if(e.length!==n.length)return!1;for(let t=0;t<e.length;++t)if(e[t]!==n[t])return!1;return!0}function AK(e,n){if(e.length<n.length)return!1;for(let t=0;t<n.length;++t)if(e[t]!==n[t])return!1;return!0}});var KD=I(wl=>{"use strict";Object.defineProperty(wl,"__esModule",{value:!0});wl.assert=lK;wl.assertDefined=fK;wl.assertDefinedAndNotNull=gK;function lK(e,n){if(!e)throw new Error(n||"condition is not truthy")}function fK(e,n){if(e===void 0)throw new Error(n??"value is undefined")}function gK(e,n){if(e==null)throw new Error(n??"value is undefined or null")}});var WD=I(SB=>{"use strict";Object.defineProperty(SB,"__esModule",{value:!0});SB.sleep=pK;async function pK(e){return new Promise(n=>setTimeout(n,e))}});var YD=I(bl=>{"use strict";Object.defineProperty(bl,"__esModule",{value:!0});bl.isNonNullObject=LD;bl.isUint8Array=IK;bl.isDefined=hK;function LD(e){return typeof e=="object"&&e!==null}function IK(e){return!(!LD(e)||Object.prototype.toString.call(e)!=="[object Uint8Array]"||typeof Buffer<"u"&&typeof Buffer.isBuffer<"u"&&Buffer.isBuffer(e))}function hK(e){return e!==void 0}});var Ur=I(ri=>{"use strict";Object.defineProperty(ri,"__esModule",{value:!0});ri.isUint8Array=ri.isNonNullObject=ri.isDefined=ri.sleep=ri.assertDefinedAndNotNull=ri.assertDefined=ri.assert=ri.arrayContentStartsWith=ri.arrayContentEquals=void 0;var zD=VD();Object.defineProperty(ri,"arrayContentEquals",{enumerable:!0,get:function(){return zD.arrayContentEquals}});Object.defineProperty(ri,"arrayContentStartsWith",{enumerable:!0,get:function(){return zD.arrayContentStartsWith}});var kB=KD();Object.defineProperty(ri,"assert",{enumerable:!0,get:function(){return kB.assert}});Object.defineProperty(ri,"assertDefined",{enumerable:!0,get:function(){return kB.assertDefined}});Object.defineProperty(ri,"assertDefinedAndNotNull",{enumerable:!0,get:function(){return kB.assertDefinedAndNotNull}});var yK=WD();Object.defineProperty(ri,"sleep",{enumerable:!0,get:function(){return yK.sleep}});var EB=YD();Object.defineProperty(ri,"isDefined",{enumerable:!0,get:function(){return EB.isDefined}});Object.defineProperty(ri,"isNonNullObject",{enumerable:!0,get:function(){return EB.isNonNullObject}});Object.defineProperty(ri,"isUint8Array",{enumerable:!0,get:function(){return EB.isUint8Array}})});var XD=I((sp,ZD)=>{(function(e,n){typeof sp=="object"&&typeof ZD<"u"?n(sp):typeof define=="function"&&define.amd?define(["exports"],n):(e=typeof globalThis<"u"?globalThis:e||self,n(e.hashwasm={}))})(sp,(function(e){"use strict";var n="adler32",t="AGFzbQEAAAABDANgAAF/YAAAYAF/AAMHBgABAgEAAgUEAQECAgYOAn8BQYCJBQt/AEGACAsHcAgGbWVtb3J5AgAOSGFzaF9HZXRCdWZmZXIAAAlIYXNoX0luaXQAAQtIYXNoX1VwZGF0ZQACCkhhc2hfRmluYWwAAw1IYXNoX0dldFN0YXRlAAQOSGFzaF9DYWxjdWxhdGUABQpTVEFURV9TSVpFAwEK6wkGBQBBgAkLCgBBAEEBNgKECAvjCAEHf0EAKAKECCIBQf//A3EhAiABQRB2IQMCQAJAIABBAUcNACACQQAtAIAJaiIBQY+AfGogASABQfD/A0sbIgEgA2oiBEEQdCIFQYCAPGogBSAEQfD/A0sbIAFyIQEMAQsCQAJAAkACQAJAIABBEEkNAEGACSEGIABBsCtJDQFBgAkhBgNAQQAhBQNAIAYgBWoiASgCACIEQf8BcSACaiICIANqIAIgBEEIdkH/AXFqIgJqIAIgBEEQdkH/AXFqIgJqIAIgBEEYdmoiAmogAiABQQRqKAIAIgRB/wFxaiICaiACIARBCHZB/wFxaiICaiACIARBEHZB/wFxaiICaiACIARBGHZqIgJqIAIgAUEIaigCACIEQf8BcWoiAmogAiAEQQh2Qf8BcWoiAmogAiAEQRB2Qf8BcWoiAmogAiAEQRh2aiIEaiAEIAFBDGooAgAiAUH/AXFqIgRqIAQgAUEIdkH/AXFqIgRqIAQgAUEQdkH/AXFqIgRqIAQgAUEYdmoiAmohAyAFQRBqIgVBsCtHDQALIANB8f8DcCEDIAJB8f8DcCECIAZBsCtqIQYgAEHQVGoiAEGvK0sNAAsgAEUNBCAAQQ9LDQEMAgsCQCAARQ0AAkACQCAAQQNxIgUNAEGACSEBIAAhBAwBCyAAQXxxIQRBACEBA0AgAiABQYAJai0AAGoiAiADaiEDIAUgAUEBaiIBRw0ACyAFQYAJaiEBCyAAQQRJDQADQCACIAEtAABqIgUgAS0AAWoiBiABLQACaiIAIAFBA2otAABqIgIgACAGIAUgA2pqamohAyABQQRqIQEgBEF8aiIEDQALCyACQY+AfGogAiACQfD/A0sbIANB8f8DcEEQdHIhAQwECwNAIAYoAgAiAUH/AXEgAmoiBCADaiAEIAFBCHZB/wFxaiIEaiAEIAFBEHZB/wFxaiIEaiAEIAFBGHZqIgRqIAQgBkEEaigCACIBQf8BcWoiBGogBCABQQh2Qf8BcWoiBGogBCABQRB2Qf8BcWoiBGogBCABQRh2aiIEaiAEIAZBCGooAgAiAUH/AXFqIgRqIAQgAUEIdkH/AXFqIgRqIAQgAUEQdkH/AXFqIgRqIAQgAUEYdmoiBGogBCAGQQxqKAIAIgFB/wFxaiIEaiAEIAFBCHZB/wFxaiIEaiAEIAFBEHZB/wFxaiIEaiAEIAFBGHZqIgJqIQMgBkEQaiEGIABBcGoiAEEPSw0ACyAARQ0BCyAAQX9qIQcCQCAAQQNxIgVFDQAgAEF8cSEAIAUhBCAGIQEDQCACIAEtAABqIgIgA2ohAyABQQFqIQEgBEF/aiIEDQALIAYgBWohBgsgB0EDSQ0AA0AgAiAGLQAAaiIBIAYtAAFqIgQgBi0AAmoiBSAGQQNqLQAAaiICIAUgBCABIANqampqIQMgBkEEaiEGIABBfGoiAA0ACwsgA0Hx/wNwIQMgAkHx/wNwIQILIAIgA0EQdHIhAQtBACABNgKECAsxAQF/QQBBACgChAgiAEEYdCAAQYD+A3FBCHRyIABBCHZBgP4DcSAAQRh2cnI2AoAJCwUAQYQICzsAQQBBATYChAggABACQQBBACgChAgiAEEYdCAAQYD+A3FBCHRyIABBCHZBgP4DcSAAQRh2cnI2AoAJCwsVAgBBgAgLBAQAAAAAQYQICwQBAAAA",i="02ddbd17",r={name:n,data:t,hash:i};function o(c,f,y,S){function U(G){return G instanceof y?G:new y(function(Ae){Ae(G)})}return new(y||(y=Promise))(function(G,Ae){function ye(qr){try{vr(S.next(qr))}catch(ti){Ae(ti)}}function En(qr){try{vr(S.throw(qr))}catch(ti){Ae(ti)}}function vr(qr){qr.done?G(qr.value):U(qr.value).then(ye,En)}vr((S=S.apply(c,f||[])).next())})}typeof SuppressedError=="function"&&SuppressedError;class a{constructor(){this.mutex=Promise.resolve()}lock(){let f=()=>{};return this.mutex=this.mutex.then(()=>new Promise(f)),new Promise(y=>{f=y})}dispatch(f){return o(this,void 0,void 0,function*(){let y=yield this.lock();try{return yield Promise.resolve(f())}finally{y()}})}}var s;function d(){return typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:global}let A=d(),l=(s=A.Buffer)!==null&&s!==void 0?s:null,p=A.TextEncoder?new A.TextEncoder:null;function g(c,f){return String.fromCharCode(...c.subarray(0,f))}function h(c,f){return(c&15)+(c>>6|c>>3&8)<<4|(f&15)+(f>>6|f>>3&8)}function B(c,f){let y=f.length>>1;for(let S=0;S<y;S++){let U=S<<1;c[S]=h(f.charCodeAt(U),f.charCodeAt(U+1))}}function C(c,f){if(c.length!==f.length*2)return!1;for(let y=0;y<f.length;y++){let S=y<<1;if(f[y]!==h(c.charCodeAt(S),c.charCodeAt(S+1)))return!1}return!0}let Q=87,E=48;function D(c,f,y){let S=0;for(let U=0;U<y;U++){let G=f[U]>>>4;c[S++]=G>9?G+Q:G+E,G=f[U]&15,c[S++]=G>9?G+Q:G+E}return String.fromCharCode.apply(null,c)}let R=l!==null?c=>{if(typeof c=="string"){let f=l.from(c,"utf8");return new Uint8Array(f.buffer,f.byteOffset,f.length)}if(l.isBuffer(c))return new Uint8Array(c.buffer,c.byteOffset,c.length);if(ArrayBuffer.isView(c))return new Uint8Array(c.buffer,c.byteOffset,c.byteLength);throw new Error("Invalid data type!")}:c=>{if(typeof c=="string")return p.encode(c);if(ArrayBuffer.isView(c))return new Uint8Array(c.buffer,c.byteOffset,c.byteLength);throw new Error("Invalid data type!")},K="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",he=new Uint8Array(256);for(let c=0;c<K.length;c++)he[K.charCodeAt(c)]=c;function ke(c,f=!0){let y=c.length,S=y%3,U=[],G=y-S;for(let Ae=0;Ae<G;Ae+=3){let ye=(c[Ae]<<16&16711680)+(c[Ae+1]<<8&65280)+(c[Ae+2]&255),En=K.charAt(ye>>18&63)+K.charAt(ye>>12&63)+K.charAt(ye>>6&63)+K.charAt(ye&63);U.push(En)}if(S===1){let Ae=c[y-1],ye=K.charAt(Ae>>2),En=K.charAt(Ae<<4&63);U.push(`${ye}${En}`),f&&U.push("==")}else if(S===2){let Ae=(c[y-2]<<8)+c[y-1],ye=K.charAt(Ae>>10),En=K.charAt(Ae>>4&63),vr=K.charAt(Ae<<2&63);U.push(`${ye}${En}${vr}`),f&&U.push("=")}return U.join("")}function Ve(c){let f=Math.floor(c.length*.75),y=c.length;return c[y-1]==="="&&(f-=1,c[y-2]==="="&&(f-=1)),f}function qe(c){let f=Ve(c),y=c.length,S=new Uint8Array(f),U=0;for(let G=0;G<y;G+=4){let Ae=he[c.charCodeAt(G)],ye=he[c.charCodeAt(G+1)],En=he[c.charCodeAt(G+2)],vr=he[c.charCodeAt(G+3)];S[U]=Ae<<2|ye>>4,U+=1,S[U]=(ye&15)<<4|En>>2,U+=1,S[U]=(En&3)<<6|vr&63,U+=1}return S}let O=16*1024,re=4,Be=new a,ue=new Map;function k(c,f){return o(this,void 0,void 0,function*(){let y=null,S=null,U=!1;if(typeof WebAssembly>"u")throw new Error("WebAssembly is not supported in this environment!");let G=(bn,yt=0)=>{S.set(bn,yt)},Ae=()=>S,ye=()=>y.exports,En=bn=>{y.exports.Hash_SetMemorySize(bn);let yt=y.exports.Hash_GetBuffer(),to=y.exports.memory.buffer;S=new Uint8Array(to,yt,bn)},vr=()=>new DataView(y.exports.memory.buffer).getUint32(y.exports.STATE_SIZE,!0),qr=Be.dispatch(()=>o(this,void 0,void 0,function*(){if(!ue.has(c.name)){let yt=qe(c.data),to=WebAssembly.compile(yt);ue.set(c.name,to)}let bn=yield ue.get(c.name);y=yield WebAssembly.instantiate(bn,{})})),ti=()=>o(this,void 0,void 0,function*(){y||(yield qr);let bn=y.exports.Hash_GetBuffer(),yt=y.exports.memory.buffer;S=new Uint8Array(yt,bn,O)}),Or=(bn=null)=>{U=!0,y.exports.Hash_Init(bn)},ia=bn=>{let yt=0;for(;yt<bn.length;){let to=bn.subarray(yt,yt+O);yt+=to.length,S.set(to),y.exports.Hash_Update(to.length)}},Fi=bn=>{if(!U)throw new Error("update() called before init()");let yt=R(bn);ia(yt)},yl=new Uint8Array(f*2),Gd=(bn,yt=null)=>{if(!U)throw new Error("digest() called before init()");return U=!1,y.exports.Hash_Final(yt),bn==="binary"?S.slice(0,f):D(yl,S,f)},Ma=()=>{if(!U)throw new Error("save() can only be called after init() and before digest()");let bn=y.exports.Hash_GetState(),yt=vr(),to=y.exports.memory.buffer,Uc=new Uint8Array(to,bn,yt),Bl=new Uint8Array(re+yt);return B(Bl,c.hash),Bl.set(Uc,re),Bl},Vd=bn=>{if(!(bn instanceof Uint8Array))throw new Error("load() expects an Uint8Array generated by save()");let yt=y.exports.Hash_GetState(),to=vr(),Uc=re+to,Bl=y.exports.memory.buffer;if(bn.length!==Uc)throw new Error(`Bad state length (expected ${Uc} bytes, got ${bn.length})`);if(!C(c.hash,bn.subarray(0,re)))throw new Error("This state was written by an incompatible hash implementation");let B6=bn.subarray(re);new Uint8Array(Bl,yt,to).set(B6),U=!0},Bu=bn=>typeof bn=="string"?bn.length<O/4:bn.byteLength<O,Id=Bu;switch(c.name){case"argon2":case"scrypt":Id=()=>!0;break;case"blake2b":case"blake2s":Id=(bn,yt)=>yt<=512&&Bu(bn);break;case"blake3":Id=(bn,yt)=>yt===0&&Bu(bn);break;case"xxhash64":case"xxhash3":case"xxhash128":case"crc64":Id=()=>!1;break}let Kd=(bn,yt=null,to=null)=>{if(!Id(bn,yt))return Or(yt),Fi(bn),Gd("hex",to);let Uc=R(bn);return S.set(Uc),y.exports.Hash_Calculate(Uc.length,yt,to),D(yl,S,f)};return yield ti(),{getMemory:Ae,writeMemory:G,getExports:ye,setMemorySize:En,init:Or,update:Fi,digest:Gd,save:Ma,load:Vd,calculate:Kd,hashLength:f}})}function w(c,f,y){return o(this,void 0,void 0,function*(){let S=yield c.lock(),U=yield k(f,y);return S(),U})}let P=new a,H=null;function W(c){if(H===null)return w(P,r,4).then(f=>(H=f,H.calculate(c)));try{let f=H.calculate(c);return Promise.resolve(f)}catch(f){return Promise.reject(f)}}function oe(){return k(r,4).then(c=>{c.init();let f={init:()=>(c.init(),f),update:y=>(c.update(y),f),digest:y=>c.digest(y),save:()=>c.save(),load:y=>(c.load(y),f),blockSize:4,digestSize:4};return f})}var J="argon2",ie="AGFzbQEAAAABKQVgAX8Bf2AAAX9gEH9/f39/f39/f39/f39/f38AYAR/f39/AGACf38AAwYFAAECAwQFBgEBAoCAAgYIAX8BQZCoBAsHQQQGbWVtb3J5AgASSGFzaF9TZXRNZW1vcnlTaXplAAAOSGFzaF9HZXRCdWZmZXIAAQ5IYXNoX0NhbGN1bGF0ZQAECvEyBVgBAn9BACEBAkAgAEEAKAKICCICRg0AAkAgACACayIAQRB2IABBgIB8cSAASWoiAEAAQX9HDQBB/wHADwtBACEBQQBBACkDiAggAEEQdK18NwOICAsgAcALcAECfwJAQQAoAoAIIgANAEEAPwBBEHQiADYCgAhBACgCiAgiAUGAgCBGDQACQEGAgCAgAWsiAEEQdiAAQYCAfHEgAElqIgBAAEF/Rw0AQQAPC0EAQQApA4gIIABBEHStfDcDiAhBACgCgAghAAsgAAvcDgECfiAAIAQpAwAiECAAKQMAIhF8IBFCAYZC/v///x+DIBBC/////w+DfnwiEDcDACAMIBAgDCkDAIVCIIkiEDcDACAIIBAgCCkDACIRfCARQgGGQv7///8fgyAQQv////8Pg358IhA3AwAgBCAQIAQpAwCFQiiJIhA3AwAgACAQIAApAwAiEXwgEEL/////D4MgEUIBhkL+////H4N+fCIQNwMAIAwgECAMKQMAhUIwiSIQNwMAIAggECAIKQMAIhF8IBBC/////w+DIBFCAYZC/v///x+DfnwiEDcDACAEIBAgBCkDAIVCAYk3AwAgASAFKQMAIhAgASkDACIRfCARQgGGQv7///8fgyAQQv////8Pg358IhA3AwAgDSAQIA0pAwCFQiCJIhA3AwAgCSAQIAkpAwAiEXwgEUIBhkL+////H4MgEEL/////D4N+fCIQNwMAIAUgECAFKQMAhUIoiSIQNwMAIAEgECABKQMAIhF8IBBC/////w+DIBFCAYZC/v///x+DfnwiEDcDACANIBAgDSkDAIVCMIkiEDcDACAJIBAgCSkDACIRfCAQQv////8PgyARQgGGQv7///8fg358IhA3AwAgBSAQIAUpAwCFQgGJNwMAIAIgBikDACIQIAIpAwAiEXwgEUIBhkL+////H4MgEEL/////D4N+fCIQNwMAIA4gECAOKQMAhUIgiSIQNwMAIAogECAKKQMAIhF8IBFCAYZC/v///x+DIBBC/////w+DfnwiEDcDACAGIBAgBikDAIVCKIkiEDcDACACIBAgAikDACIRfCAQQv////8PgyARQgGGQv7///8fg358IhA3AwAgDiAQIA4pAwCFQjCJIhA3AwAgCiAQIAopAwAiEXwgEEL/////D4MgEUIBhkL+////H4N+fCIQNwMAIAYgECAGKQMAhUIBiTcDACADIAcpAwAiECADKQMAIhF8IBFCAYZC/v///x+DIBBC/////w+DfnwiEDcDACAPIBAgDykDAIVCIIkiEDcDACALIBAgCykDACIRfCARQgGGQv7///8fgyAQQv////8Pg358IhA3AwAgByAQIAcpAwCFQiiJIhA3AwAgAyAQIAMpAwAiEXwgEEL/////D4MgEUIBhkL+////H4N+fCIQNwMAIA8gECAPKQMAhUIwiSIQNwMAIAsgECALKQMAIhF8IBBC/////w+DIBFCAYZC/v///x+DfnwiEDcDACAHIBAgBykDAIVCAYk3AwAgACAFKQMAIhAgACkDACIRfCARQgGGQv7///8fgyAQQv////8Pg358IhA3AwAgDyAQIA8pAwCFQiCJIhA3AwAgCiAQIAopAwAiEXwgEUIBhkL+////H4MgEEL/////D4N+fCIQNwMAIAUgECAFKQMAhUIoiSIQNwMAIAAgECAAKQMAIhF8IBBC/////w+DIBFCAYZC/v///x+DfnwiEDcDACAPIBAgDykDAIVCMIkiEDcDACAKIBAgCikDACIRfCAQQv////8PgyARQgGGQv7///8fg358IhA3AwAgBSAQIAUpAwCFQgGJNwMAIAEgBikDACIQIAEpAwAiEXwgEUIBhkL+////H4MgEEL/////D4N+fCIQNwMAIAwgECAMKQMAhUIgiSIQNwMAIAsgECALKQMAIhF8IBFCAYZC/v///x+DIBBC/////w+DfnwiEDcDACAGIBAgBikDAIVCKIkiEDcDACABIBAgASkDACIRfCAQQv////8PgyARQgGGQv7///8fg358IhA3AwAgDCAQIAwpAwCFQjCJIhA3AwAgCyAQIAspAwAiEXwgEEL/////D4MgEUIBhkL+////H4N+fCIQNwMAIAYgECAGKQMAhUIBiTcDACACIAcpAwAiECACKQMAIhF8IBFCAYZC/v///x+DIBBC/////w+DfnwiEDcDACANIBAgDSkDAIVCIIkiEDcDACAIIBAgCCkDACIRfCARQgGGQv7///8fgyAQQv////8Pg358IhA3AwAgByAQIAcpAwCFQiiJIhA3AwAgAiAQIAIpAwAiEXwgEEL/////D4MgEUIBhkL+////H4N+fCIQNwMAIA0gECANKQMAhUIwiSIQNwMAIAggECAIKQMAIhF8IBBC/////w+DIBFCAYZC/v///x+DfnwiEDcDACAHIBAgBykDAIVCAYk3AwAgAyAEKQMAIhAgAykDACIRfCARQgGGQv7///8fgyAQQv////8Pg358IhA3AwAgDiAQIA4pAwCFQiCJIhA3AwAgCSAQIAkpAwAiEXwgEUIBhkL+////H4MgEEL/////D4N+fCIQNwMAIAQgECAEKQMAhUIoiSIQNwMAIAMgECADKQMAIhF8IBBC/////w+DIBFCAYZC/v///x+DfnwiEDcDACAOIBAgDikDAIVCMIkiEDcDACAJIBAgCSkDACIRfCAQQv////8PgyARQgGGQv7///8fg358IhA3AwAgBCAQIAQpAwCFQgGJNwMAC98aAQN/QQAhBEEAIAIpAwAgASkDAIU3A5AIQQAgAikDCCABKQMIhTcDmAhBACACKQMQIAEpAxCFNwOgCEEAIAIpAxggASkDGIU3A6gIQQAgAikDICABKQMghTcDsAhBACACKQMoIAEpAyiFNwO4CEEAIAIpAzAgASkDMIU3A8AIQQAgAikDOCABKQM4hTcDyAhBACACKQNAIAEpA0CFNwPQCEEAIAIpA0ggASkDSIU3A9gIQQAgAikDUCABKQNQhTcD4AhBACACKQNYIAEpA1iFNwPoCEEAIAIpA2AgASkDYIU3A/AIQQAgAikDaCABKQNohTcD+AhBACACKQNwIAEpA3CFNwOACUEAIAIpA3ggASkDeIU3A4gJQQAgAikDgAEgASkDgAGFNwOQCUEAIAIpA4gBIAEpA4gBhTcDmAlBACACKQOQASABKQOQAYU3A6AJQQAgAikDmAEgASkDmAGFNwOoCUEAIAIpA6ABIAEpA6ABhTcDsAlBACACKQOoASABKQOoAYU3A7gJQQAgAikDsAEgASkDsAGFNwPACUEAIAIpA7gBIAEpA7gBhTcDyAlBACACKQPAASABKQPAAYU3A9AJQQAgAikDyAEgASkD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",fe="e4cdc523",be={name:J,data:ie,hash:fe},$n="blake2b",jn="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",mn="c6f286e6",ct={name:$n,data:jn,hash:mn};let Qt=new a,wt=null;function at(c){return!Number.isInteger(c)||c<8||c>512||c%8!==0?new Error("Invalid variant! Valid values: 8, 16, ..., 512"):null}function Fr(c,f){return c|f<<16}function qd(c,f=512,y=null){if(at(f))return Promise.reject(at(f));let S=null,U=f;if(y!==null){if(S=R(y),S.length>64)return Promise.reject(new Error("Max key length is 64 bytes"));U=Fr(f,S.length)}let G=f/8;if(wt===null||wt.hashLength!==G)return w(Qt,ct,G).then(Ae=>(wt=Ae,U>512&&wt.writeMemory(S),wt.calculate(c,U)));try{U>512&&wt.writeMemory(S);let Ae=wt.calculate(c,U);return Promise.resolve(Ae)}catch(Ae){return Promise.reject(Ae)}}function gs(c=512,f=null){if(at(c))return Promise.reject(at(c));let y=null,S=c;if(f!==null){if(y=R(f),y.length>64)return Promise.reject(new Error("Max key length is 64 bytes"));S=Fr(c,y.length)}let U=c/8;return k(ct,U).then(G=>{S>512&&G.writeMemory(y),G.init(S);let Ae={init:S>512?()=>(G.writeMemory(y),G.init(S),Ae):()=>(G.init(S),Ae),update:ye=>(G.update(ye),Ae),digest:ye=>G.digest(ye),save:()=>G.save(),load:ye=>(G.load(ye),Ae),blockSize:128,digestSize:U};return Ae})}function vc(c,f,y){let S=[`m=${f.memorySize}`,`t=${f.iterations}`,`p=${f.parallelism}`].join(",");return`$argon2${f.hashType}$v=19$${S}$${ke(c,!1)}$${ke(y,!1)}`}let pl=new DataView(new ArrayBuffer(4));function ra(c){return pl.setInt32(0,c,!0),new Uint8Array(pl.buffer)}function Ry(c,f,y){return o(this,void 0,void 0,function*(){if(y<=64){let En=yield gs(y*8);return En.update(ra(y)),En.update(f),En.digest("binary")}let S=Math.ceil(y/32)-2,U=new Uint8Array(y);c.init(),c.update(ra(y)),c.update(f);let G=c.digest("binary");U.set(G.subarray(0,32),0);for(let En=1;En<S;En++)c.init(),c.update(G),G=c.digest("binary"),U.set(G.subarray(0,32),En*32);let Ae=y-32*S,ye;return Ae===64?(ye=c,ye.init()):ye=yield gs(Ae*8),ye.update(G),G=ye.digest("binary"),U.set(G.subarray(0,Ae),S*32),U})}function GG(c){switch(c){case"d":return 0;case"i":return 1;default:return 2}}function wg(c){return o(this,void 0,void 0,function*(){var f;let{parallelism:y,iterations:S,hashLength:U}=c,G=R(c.password),Ae=R(c.salt),ye=19,En=GG(c.hashType),{memorySize:vr}=c,qr=R((f=c.secret)!==null&&f!==void 0?f:""),[ti,Or]=yield Promise.all([k(be,1024),gs(512)]);ti.setMemorySize(vr*1024+1024);let ia=new Uint8Array(24),Fi=new DataView(ia.buffer);Fi.setInt32(0,y,!0),Fi.setInt32(4,U,!0),Fi.setInt32(8,vr,!0),Fi.setInt32(12,S,!0),Fi.setInt32(16,ye,!0),Fi.setInt32(20,En,!0),ti.writeMemory(ia,vr*1024),Or.init(),Or.update(ia),Or.update(ra(G.length)),Or.update(G),Or.update(ra(Ae.length)),Or.update(Ae),Or.update(ra(qr.length)),Or.update(qr),Or.update(ra(0));let Gd=Math.floor(vr/(y*4))*4,Ma=new Uint8Array(72),Vd=Or.digest("binary");Ma.set(Vd);for(let Kd=0;Kd<y;Kd++){Ma.set(ra(0),64),Ma.set(ra(Kd),68);let bn=Kd*Gd,yt=yield Ry(Or,Ma,1024);ti.writeMemory(yt,bn*1024),bn+=1,Ma.set(ra(1),64),yt=yield Ry(Or,Ma,1024),ti.writeMemory(yt,bn*1024)}let Bu=new Uint8Array(1024);B(Bu,ti.calculate(new Uint8Array([]),vr));let Id=yield Ry(Or,Bu,U);if(c.outputType==="hex"){let Kd=new Uint8Array(U*2);return D(Kd,Id,U)}return c.outputType==="encoded"?vc(Ae,c,Id):Id})}let bg=c=>{var f;if(!c||typeof c!="object")throw new Error("Invalid options parameter. It requires an object.");if(!c.password)throw new Error("Password must be specified");if(c.password=R(c.password),c.password.length<1)throw new Error("Password must be specified");if(!c.salt)throw new Error("Salt must be specified");if(c.salt=R(c.salt),c.salt.length<8)throw new Error("Salt should be at least 8 bytes long");if(c.secret=R((f=c.secret)!==null&&f!==void 0?f:""),!Number.isInteger(c.iterations)||c.iterations<1)throw new Error("Iterations should be a positive number");if(!Number.isInteger(c.parallelism)||c.parallelism<1)throw new Error("Parallelism should be a positive number");if(!Number.isInteger(c.hashLength)||c.hashLength<4)throw new Error("Hash length should be at least 4 bytes.");if(!Number.isInteger(c.memorySize))throw new Error("Memory size should be specified.");if(c.memorySize<8*c.parallelism)throw new Error("Memory size should be at least 8 * parallelism.");if(c.outputType===void 0&&(c.outputType="hex"),!["hex","binary","encoded"].includes(c.outputType))throw new Error(`Insupported output type ${c.outputType}. Valid values: ['hex', 'binary', 'encoded']`)};function VG(c){return o(this,void 0,void 0,function*(){return bg(c),wg(Object.assign(Object.assign({},c),{hashType:"i"}))})}function KG(c){return o(this,void 0,void 0,function*(){return bg(c),wg(Object.assign(Object.assign({},c),{hashType:"id"}))})}function WG(c){return o(this,void 0,void 0,function*(){return bg(c),wg(Object.assign(Object.assign({},c),{hashType:"d"}))})}let LG=(c,f,y)=>{let S=/^\$argon2(id|i|d)\$v=([0-9]+)\$((?:[mtp]=[0-9]+,){2}[mtp]=[0-9]+)\$([A-Za-z0-9+/]+)\$([A-Za-z0-9+/]+)$/,U=f.match(S);if(!U)throw new Error("Invalid hash");let[,G,Ae,ye,En,vr]=U;if(Ae!=="19")throw new Error(`Unsupported version: ${Ae}`);let qr={},ti={m:"memorySize",p:"parallelism",t:"iterations"};for(let Or of ye.split(",")){let[ia,Fi]=Or.split("=");qr[ti[ia]]=Number(Fi)}return Object.assign(Object.assign({},qr),{password:c,secret:y,hashType:G,salt:qe(En),hashLength:Ve(vr),outputType:"encoded"})},YG=c=>{if(!c||typeof c!="object")throw new Error("Invalid options parameter. It requires an object.");if(c.hash===void 0||typeof c.hash!="string")throw new Error("Hash should be specified")};function zG(c){return o(this,void 0,void 0,function*(){YG(c);let f=LG(c.password,c.hash,c.secret);bg(f);let y=c.hash.lastIndexOf("$")+1;return(yield wg(f)).substring(y)===c.hash.substring(y)})}var ZG="blake2s",XG="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",$G="5c0ff166",cD={name:ZG,data:XG,hash:$G};let jG=new a,Oc=null;function Rg(c){return!Number.isInteger(c)||c<8||c>256||c%8!==0?new Error("Invalid variant! Valid values: 8, 16, ..., 256"):null}function uD(c,f){return c|f<<16}function e4(c,f=256,y=null){if(Rg(f))return Promise.reject(Rg(f));let S=null,U=f;if(y!==null){if(S=R(y),S.length>32)return Promise.reject(new Error("Max key length is 32 bytes"));U=uD(f,S.length)}let G=f/8;if(Oc===null||Oc.hashLength!==G)return w(jG,cD,G).then(Ae=>(Oc=Ae,U>512&&Oc.writeMemory(S),Oc.calculate(c,U)));try{U>512&&Oc.writeMemory(S);let Ae=Oc.calculate(c,U);return Promise.resolve(Ae)}catch(Ae){return Promise.reject(Ae)}}function n4(c=256,f=null){if(Rg(c))return Promise.reject(Rg(c));let y=null,S=c;if(f!==null){if(y=R(f),y.length>32)return Promise.reject(new Error("Max key length is 32 bytes"));S=uD(c,y.length)}let U=c/8;return k(cD,U).then(G=>{S>512&&G.writeMemory(y),G.init(S);let Ae={init:S>512?()=>(G.writeMemory(y),G.init(S),Ae):()=>(G.init(S),Ae),update:ye=>(G.update(ye),Ae),digest:ye=>G.digest(ye),save:()=>G.save(),load:ye=>(G.load(ye),Ae),blockSize:64,digestSize:U};return Ae})}var t4="blake3",r4="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IQEgAkFAaiICQcAASw0ACwsCQEHAACAHQf8BcSIGayIFIAIgBSACSRsiCUUNACAJQQNxIQtBACEFAkAgCUEESQ0AIAAgBmohByAJQfwAcSEIQQAhBQNAIAcgBWoiAkEoaiABIAVqIgotAAA6AAAgAkEpaiAKQQFqLQAAOgAAIAJBKmogCkECai0AADoAACACQStqIApBA2otAAA6AAAgCCAFQQRqIgVHDQALCwJAIAtFDQAgASAFaiEBIAUgBmogAGpBKGohBQNAIAUgAS0AADoAACABQQFqIQEgBUEBaiEFIAtBf2oiCw0ACwsgAC0AaCEHCyAAIAcgCWo6AGggA0HAAGokAAveAwQFfwN+BX8GfiMAQdABayIBJAACQCAAe6ciAkEALQCQigEiA08NAEEALQCKigFBBHIhBCABQShqIQVBACkDmIkBIQBBACkDkIkBIQZBACkDiIkBIQdBACkDgIkBIQggAyEJA0AgASAANwMYIAEgBjcDECABIAc3AwggASAINwMAIAEgA0EFdCIDQdGJAWoiCikDADcDKCABIANB2YkBaiILKQMANwMwIAEgA0HhiQFqIgwpAwA3AzggASADQemJAWoiDSkDADcDQCABIANB8YkBaikDADcDSCABIANB+YkBaikDADcDUCABIANBgYoBaikDADcDWCADQYmKAWopAwAhDiABQcAAOgBoIAEgDjcDYCABQgA3AyAgASAEOgBpIAEgADcDiAEgASAGNwOAASABIAc3A3ggASAINwNwIAFBkAFqIAFB8ABqIAVBwABCACAEQf8BcRACIAEpA7ABIQ4gASkDkAEhDyABKQO4ASEQIAEpA5gBIREgASkDwAEhEiABKQOgASETIA0gASkDyAEgASkDqAGFNwMAIAwgEiAThTcDACALIBAgEYU3AwAgCiAOIA+FNwMAIAlBf2oiCUH/AXEiAyACSw0AC0EAIAk6AJCKAQsgAUHQAWokAAvHCQIKfwV+IwBB4AJrIgUkAAJAAkAgAUGACEsNACAFIAA2AvwBIAVB/AFqIAFBgAhGIgZBECACQQEgA0EBQQIgBBABIAZBCnQiByABTw0BIAVB4ABqIgZCADcDACAFQdgAaiIIQgA3AwAgBUHQAGoiCUIANwMAIAVByABqIgpCADcDACAFQcAAaiILQgA3AwAgBUE4aiIMQgA3AwAgBUEwaiINQgA3AwAgBSADOgBqIAVCADcDKCAFQQA7AWggBUEAKQOAiQE3AwAgBUEAKQOIiQE3AwggBUEAKQOQiQE3AxAgBUEAKQOYiQE3AxggBSABQYAIRiIOrSACfDcDICAFIAAgB2pBACABIA4bEAQgBUGIAWpBMGogDSkDADcDACAFQYgBakE4aiAMKQMANwMAIAUgBSkDACIPNwOIASAFIAUpAwgiEDcDkAEgBSAFKQMQIhE3A5gBIAUgBSkDGCISNwOgASAFIAUpAyg3A7ABIAUtAGohACAFLQBpIQcgBSkDICECIAUtAGghASAFQYgBakHAAGogCykDADcDACAFQYgBakHIAGogCikDADcDACAFQYgBakHQAGogCSkDADcDACAFQYgBakHYAGogCCkDADcDACAFQYgBakHgAGogBikDADcDACAFIAE6APABIAUgAjcDqAEgBSAAIAdFckECciIAOgDxASAFIBI3A5gCIAUgETcDkAIgBSAQNwOIAiAFIA83A4ACIAVBoAJqIAVBgAJqIAVBsAFqIAEgAiAAQf8BcRACIAUpA8ACIQIgBSkDoAIhDyAFKQPIAiEQIAUpA6gCIREgBSkD0AIhEiAFKQOwAiETIAQgDkEFdGoiASAFKQPYAiAFKQO4AoU3AxggASASIBOFNwMQIAEgECARhTcDCCABIAIgD4U3AwBBAkEBIA4bIQYMAQsgAEIBIAFBf2pBCnZBAXKteUI/hYYiD6dBCnQiDiACIAMgBRAGIQcgACAOaiABIA5rIA9C////AYMgAnwgAyAFQcAAQSAgDkGACEsbahAGIQECQCAHQQFHDQAgBCAFKQMANwMAIAQgBSkDCDcDCCAEIAUpAxA3AxAgBCAFKQMYNwMYIAQgBSkDIDcDICAEIAUpAyg3AyggBCAFKQMwNwMwIAQgBSkDODcDOEECIQYMAQtBACEGQQAhAAJAIAEgB2oiCUECSQ0AIAlBfmoiCkEBdkEBaiIGQQNxIQ5BACEHAkAgCkEGSQ0AIAZB/P///wdxIQhBACEHIAVBiAFqIQEgBSEAA0AgASAANgIAIAFBDGogAEHAAWo2AgAgAUEIaiAAQYABajYCACABQQRqIABBwABqNgIAIABBgAJqIQAgAUEQaiEBIAggB0EEaiIHRw0ACwsgCkF+cSEIAkAgDkUNACAFIAdBBnRqIQEgBUGIAWogB0ECdGohAANAIAAgATYCACABQcAAaiEBIABBBGohACAOQX9qIg4NAAsLIAhBAmohAAsgBUGIAWogBkEBQgBBACADQQRyQQBBACAEEAEgACAJTw0AIAQgBkEFdGoiASAFIAZBBnRqIgApAwA3AwAgASAAKQMINwMIIAEgACkDEDcDECABIAApAxg3AxggBkEBaiEGCyAFQeACaiQAIAYLrRAIAn8EfgF/AX4EfwR+BH8EfiMAQfABayIBJAACQCAARQ0AAkBBAC0AkIoBIgINACABQTBqQQApA9CJATcDACABQThqQQApA9iJATcDACABQQApA6CJASIDNwMAIAFBACkDqIkBIgQ3AwggAUEAKQOwiQEiBTcDECABQQApA7iJASIGNwMYIAFBACkDyIkBNwMoQQAtAIqKASECQQAtAImKASEHQQApA8CJASEIQQAtAIiKASEJIAFBwABqQQApA+CJATcDACABQcgAakEAKQPoiQE3AwAgAUHQAGpBACkD8IkBNwMAIAFB2ABqQQApA/iJATcDACABQeAAakEAKQOAigE3AwAgASAJOgBoIAEgCDcDICABIAIgB0VyIgJBAnI6AGkgAUEoaiEKQgAhCEGACSELIAJBCnJB/wFxIQwDQCABQbABaiABIAogCUH/AXEgCCAMEAIgASABKQPQASINIAEpA7ABhTcDcCABIAEpA9gBIg4gASkDuAGFNwN4IAEgASkD4AEiDyABKQPAAYU3A4ABIAEgASkD6AEiECAGhTcDqAEgASAPIAWFNwOgASABIA4gBIU3A5gBIAEgDSADhTcDkAEgASAQIAEpA8gBhTcDiAEgAEHAACAAQcAASRsiEUF/aiESAkACQCARQQdxIhMNACABQfAAaiECIAshByARIRQMAQsgEUH4AHEhFCABQfAAaiECIAshBwNAIAcgAi0AADoAACAHQQFqIQcgAkEBaiECIBNBf2oiEw0ACwsCQCASQQdJDQADQCAHIAIpAAA3AAAgB0EIaiEHIAJBCGohAiAUQXhqIhQNAAsLIAhCAXwhCCALIBFqIQsgACARayIADQAMAgsLAkACQAJAQQAtAImKASIHQQZ0QQBBAC0AiIoBIhFrRg0AIAEgEToAaCABQQApA4CKATcDYCABQQApA/iJATcDWCABQQApA/CJATcDUCABQQApA+iJATcDSCABQQApA+CJATcDQCABQQApA9iJATcDOCABQQApA9CJATcDMCABQQApA8iJATcDKCABQQApA8CJASIINwMgIAFBACkDuIkBIgM3AxggAUEAKQOwiQEiBDcDECABQQApA6iJASIFNwMIIAFBACkDoIkBIgY3AwAgAUEALQCKigEiEyAHRXJBAnIiCzoAaSATQQRyIRNBACkDmIkBIQ1BACkDkIkBIQ5BACkDiIkBIQ9BACkDgIkBIRAMAQtBwAAhESABQcAAOgBoQgAhCCABQgA3AyAgAUEAKQOYiQEiDTcDGCABQQApA5CJASIONwMQIAFBACkDiIkBIg83AwggAUEAKQOAiQEiEDcDACABQQAtAIqKAUEEciITOgBpIAEgAkF+aiICQQV0IgdByYoBaikDADcDYCABIAdBwYoBaikDADcDWCABIAdBuYoBaikDADcDUCABIAdBsYoBaikDADcDSCABIAdBqYoBaikDADcDQCABIAdBoYoBaikDADcDOCABIAdBmYoBaikDADcDMCABIAdBkYoBaikDADcDKCATIQsgECEGIA8hBSAOIQQgDSEDIAJFDQELIAJBf2oiB0EFdCIUQZGKAWopAwAhFSAUQZmKAWopAwAhFiAUQaGKAWopAwAhFyAUQamKAWopAwAhGCABIAM3A4gBIAEgBDcDgAEgASAFNwN4IAEgBjcDcCABQbABaiABQfAAaiABQShqIhQgESAIIAtB/wFxEAIgASATOgBpIAFBwAA6AGggASAYNwNAIAEgFzcDOCABIBY3AzAgASAVNwMoIAFCADcDICABIA03AxggASAONwMQIAEgDzcDCCABIBA3AwAgASABKQPoASABKQPIAYU3A2AgASABKQPgASABKQPAAYU3A1ggASABKQPYASABKQO4AYU3A1AgASABKQPQASABKQOwAYU3A0ggB0UNACACQQV0QemJAWohAiATQf8BcSERA0AgAkFoaikDACEIIAJBcGopAwAhAyACQXhqKQMAIQQgAikDACEFIAEgDTcDiAEgASAONwOAASABIA83A3ggASAQNwNwIAFBsAFqIAFB8ABqIBRBwABCACAREAIgASATOgBpIAFBwAA6AGggASAFNwNAIAEgBDcDOCABIAM3AzAgASAINwMoIAFCADcDICABIA03AxggASAONwMQIAEgDzcDCCABIBA3AwAgASABKQPoASABKQPIAYU3A2AgASABKQPgASABKQPAAYU3A1ggASABKQPYASABKQO4AYU3A1AgASABKQPQASABKQOwAYU3A0ggAkFgaiECIAdBf2oiBw0ACwsgAUEoaiEJQgAhCEGACSELIBNBCHJB/wFxIQoDQCABQbABaiABIAlBwAAgCCAKEAIgASABKQPQASIDIAEpA7ABhTcDcCABIAEpA9gBIgQgASkDuAGFNwN4IAEgASkD4AEiBSABKQPAAYU3A4ABIAEgDSABKQPoASIGhTcDqAEgASAOIAWFNwOgASABIA8gBIU3A5gBIAEgECADhTcDkAEgASAGIAEpA8gBhTcDiAEgAEHAACAAQcAASRsiEUF/aiESAkACQCARQQdxIhMNACABQfAAaiECIAshByARIRQMAQsgEUH4AHEhFCABQfAAaiECIAshBwNAIAcgAi0AADoAACAHQQFqIQcgAkEBaiECIBNBf2oiEw0ACwsCQCASQQdJDQADQCAHIAIpAAA3AAAgB0EIaiEHIAJBCGohAiAUQXhqIhQNAAsLIAhCAXwhCCALIBFqIQsgACARayIADQALCyABQfABaiQAC6MCAQR+AkACQCAAQSBGDQBCq7OP/JGjs/DbACEBQv+kuYjFkdqCm38hAkLy5rvjo6f9p6V/IQNC58yn0NbQ67O7fyEEQQAhAAwBC0EAKQOYCSEBQQApA5AJIQJBACkDiAkhA0EAKQOACSEEQRAhAAtBACAAOgCKigFBAEIANwOAigFBAEIANwP4iQFBAEIANwPwiQFBAEIANwPoiQFBAEIANwPgiQFBAEIANwPYiQFBAEIANwPQiQFBAEIANwPIiQFBAEIANwPAiQFBACABNwO4iQFBACACNwOwiQFBACADNwOoiQFBACAENwOgiQFBACABNwOYiQFBACACNwOQiQFBACADNwOIiQFBACAENwOAiQFBAEEAOgCQigFBAEEAOwGIigELBgAgABADCwYAIAAQBwsGAEGAiQELqwIBBH4CQAJAIAFBIEYNAEKrs4/8kaOz8NsAIQNC/6S5iMWR2oKbfyEEQvLmu+Ojp/2npX8hBULnzKfQ1tDrs7t/IQZBACEBDAELQQApA5gJIQNBACkDkAkhBEEAKQOICSEFQQApA4AJIQZBECEBC0EAIAE6AIqKAUEAQgA3A4CKAUEAQgA3A/iJAUEAQgA3A/CJAUEAQgA3A+iJAUEAQgA3A+CJAUEAQgA3A9iJAUEAQgA3A9CJAUEAQgA3A8iJAUEAQgA3A8CJAUEAIAM3A7iJAUEAIAQ3A7CJAUEAIAU3A6iJAUEAIAY3A6CJAUEAIAM3A5iJAUEAIAQ3A5CJAUEAIAU3A4iJAUEAIAY3A4CJAUEAQQA6AJCKAUEAQQA7AYiKASAAEAMgAhAHCwsLAQBBgAgLBHgHAAA=",i4="215d875f",AD={name:t4,data:r4,hash:i4};let o4=new a,Dc=null;function Pg(c){return!Number.isInteger(c)||c<8||c%8!==0?new Error("Invalid variant! Valid values: 8, 16, ..."):null}function a4(c,f=256,y=null){if(Pg(f))return Promise.reject(Pg(f));let S=null,U=0;if(y!==null){if(S=R(y),S.length!==32)return Promise.reject(new Error("Key length must be exactly 32 bytes"));U=32}let G=f/8,Ae=G;if(Dc===null||Dc.hashLength!==G)return w(o4,AD,G).then(ye=>(Dc=ye,U===32&&Dc.writeMemory(S),Dc.calculate(c,U,Ae)));try{U===32&&Dc.writeMemory(S);let ye=Dc.calculate(c,U,Ae);return Promise.resolve(ye)}catch(ye){return Promise.reject(ye)}}function s4(c=256,f=null){if(Pg(c))return Promise.reject(Pg(c));let y=null,S=0;if(f!==null){if(y=R(f),y.length!==32)return Promise.reject(new Error("Key length must be exactly 32 bytes"));S=32}let U=c/8,G=U;return k(AD,U).then(Ae=>{S===32&&Ae.writeMemory(y),Ae.init(S);let ye={init:S===32?()=>(Ae.writeMemory(y),Ae.init(S),ye):()=>(Ae.init(S),ye),update:En=>(Ae.update(En),ye),digest:En=>Ae.digest(En,G),save:()=>Ae.save(),load:En=>(Ae.load(En),ye),blockSize:64,digestSize:U};return ye})}var d4="crc32",c4="AGFzbQEAAAABEQRgAAF/YAF/AGAAAGACf38AAwgHAAEBAQIAAwUEAQECAgYOAn8BQZDJBQt/AEGACAsHcAgGbWVtb3J5AgAOSGFzaF9HZXRCdWZmZXIAAAlIYXNoX0luaXQAAgtIYXNoX1VwZGF0ZQADCkhhc2hfRmluYWwABA1IYXNoX0dldFN0YXRlAAUOSGFzaF9DYWxjdWxhdGUABgpTVEFURV9TSVpFAwEKkggHBQBBgAkLwwMBA39BgIkBIQFBACECA0AgAUEAQQBBAEEAQQBBAEEAQQAgAkEBcWsgAHEgAkEBdnMiA0EBcWsgAHEgA0EBdnMiA0EBcWsgAHEgA0EBdnMiA0EBcWsgAHEgA0EBdnMiA0EBcWsgAHEgA0EBdnMiA0EBcWsgAHEgA0EBdnMiA0EBcWsgAHEgA0EBdnMiA0EBcWsgAHEgA0EBdnM2AgAgAUEEaiEBIAJBAWoiAkGAAkcNAAtBACEAA0AgAEGEkQFqIABBhIkBaigCACICQf8BcUECdEGAiQFqKAIAIAJBCHZzIgI2AgAgAEGEmQFqIAJB/wFxQQJ0QYCJAWooAgAgAkEIdnMiAjYCACAAQYShAWogAkH/AXFBAnRBgIkBaigCACACQQh2cyICNgIAIABBhKkBaiACQf8BcUECdEGAiQFqKAIAIAJBCHZzIgI2AgAgAEGEsQFqIAJB/wFxQQJ0QYCJAWooAgAgAkEIdnMiAjYCACAAQYS5AWogAkH/AXFBAnRBgIkBaigCACACQQh2cyICNgIAIABBhMEBaiACQf8BcUECdEGAiQFqKAIAIAJBCHZzNgIAIABBBGoiAEH8B0cNAAsLJwACQEEAKAKAyQEgAEYNACAAEAFBACAANgKAyQELQQBBADYChMkBC4gDAQN/QQAoAoTJAUF/cyEBQYAJIQICQCAAQQhJDQBBgAkhAgNAIAJBBGooAgAiA0EOdkH8B3FBgJEBaigCACADQRZ2QfwHcUGAiQFqKAIAcyADQQZ2QfwHcUGAmQFqKAIAcyADQf8BcUECdEGAoQFqKAIAcyACKAIAIAFzIgFBFnZB/AdxQYCpAWooAgBzIAFBDnZB/AdxQYCxAWooAgBzIAFBBnZB/AdxQYC5AWooAgBzIAFB/wFxQQJ0QYDBAWooAgBzIQEgAkEIaiECIABBeGoiAEEHSw0ACwsCQCAARQ0AAkACQCAAQQFxDQAgACEDDAELIAFB/wFxIAItAABzQQJ0QYCJAWooAgAgAUEIdnMhASACQQFqIQIgAEF/aiEDCyAAQQFGDQADQCABQf8BcSACLQAAc0ECdEGAiQFqKAIAIAFBCHZzIgFB/wFxIAJBAWotAABzQQJ0QYCJAWooAgAgAUEIdnMhASACQQJqIQIgA0F+aiIDDQALC0EAIAFBf3M2AoTJAQsyAQF/QQBBACgChMkBIgBBGHQgAEGA/gNxQQh0ciAAQQh2QYD+A3EgAEEYdnJyNgKACQsGAEGEyQELWQACQEEAKAKAyQEgAUYNACABEAFBACABNgKAyQELQQBBADYChMkBIAAQA0EAQQAoAoTJASIBQRh0IAFBgP4DcUEIdHIgAUEIdkGA/gNxIAFBGHZycjYCgAkLCwsBAEGACAsEBAAAAA==",u4="d2eba587",lD={name:d4,data:c4,hash:u4};let A4=new a,Ng=null;function vg(c){return!Number.isInteger(c)||c<0||c>4294967295?new Error("Polynomial must be a valid 32-bit long unsigned integer"):null}function l4(c,f=3988292384){if(vg(f))return Promise.reject(vg(f));if(Ng===null)return w(A4,lD,4).then(y=>(Ng=y,Ng.calculate(c,f)));try{let y=Ng.calculate(c,f);return Promise.resolve(y)}catch(y){return Promise.reject(y)}}function f4(c=3988292384){return vg(c)?Promise.reject(vg(c)):k(lD,4).then(f=>{f.init(c);let y={init:()=>(f.init(c),y),update:S=>(f.update(S),y),digest:S=>f.digest(S),save:()=>f.save(),load:S=>(f.load(S),y),blockSize:4,digestSize:4};return y})}var g4="crc64",p4="AGFzbQEAAAABDANgAAF/YAAAYAF/AAMHBgABAgEAAQUEAQECAgYOAn8BQZCJBgt/AEGACAsHcAgGbWVtb3J5AgAOSGFzaF9HZXRCdWZmZXIAAAlIYXNoX0luaXQAAQtIYXNoX1VwZGF0ZQACCkhhc2hfRmluYWwAAw1IYXNoX0dldFN0YXRlAAQOSGFzaF9DYWxjdWxhdGUABQpTVEFURV9TSVpFAwEKgwgGBQBBgAkL9QMDAX4BfwJ+AkBBACkDgIkCQQApA4AJIgBRDQBBgIkBIQFCACECA0AgAUIAQgBCAEIAQgBCAEIAQgAgAkIBg30gAIMgAkIBiIUiA0IBg30gAIMgA0IBiIUiA0IBg30gAIMgA0IBiIUiA0IBg30gAIMgA0IBiIUiA0IBg30gAIMgA0IBiIUiA0IBg30gAIMgA0IBiIUiA0IBg30gAIMgA0IBiIUiA0IBg30gAIMgA0IBiIU3AwAgAUEIaiEBIAJCAXwiAkKAAlINAAtBACEBA0AgAUGImQFqIAFBiIkBaikDACICp0H/AXFBA3RBgIkBaikDACACQgiIhSICNwMAIAFBiKkBaiACp0H/AXFBA3RBgIkBaikDACACQgiIhSICNwMAIAFBiLkBaiACp0H/AXFBA3RBgIkBaikDACACQgiIhSICNwMAIAFBiMkBaiACp0H/AXFBA3RBgIkBaikDACACQgiIhSICNwMAIAFBiNkBaiACp0H/AXFBA3RBgIkBaikDACACQgiIhSICNwMAIAFBiOkBaiACp0H/AXFBA3RBgIkBaikDACACQgiIhSICNwMAIAFBiPkBaiACp0H/AXFBA3RBgIkBaikDACACQgiIhTcDACABQQhqIgFB+A9HDQALQQAgADcDgIkCC0EAQgA3A4iJAguUAwIBfgJ/QQApA4iJAkJ/hSEBQYAJIQICQCAAQQhJDQBBgAkhAgNAIAIpAwAgAYUiAUIwiKdB/wFxQQN0QYCZAWopAwAgAUI4iKdBA3RBgIkBaikDAIUgAUIoiKdB/wFxQQN0QYCpAWopAwCFIAFCIIinQf8BcUEDdEGAuQFqKQMAhSABpyIDQRV2QfgPcUGAyQFqKQMAhSADQQ12QfgPcUGA2QFqKQMAhSADQQV2QfgPcUGA6QFqKQMAhSADQf8BcUEDdEGA+QFqKQMAhSEBIAJBCGohAiAAQXhqIgBBB0sNAAsLAkAgAEUNAAJAAkAgAEEBcQ0AIAAhAwwBCyABQv8BgyACMQAAhadBA3RBgIkBaikDACABQgiIhSEBIAJBAWohAiAAQX9qIQMLIABBAUYNAANAIAFC/wGDIAIxAACFp0EDdEGAiQFqKQMAIAFCCIiFIgFC/wGDIAJBAWoxAACFp0EDdEGAiQFqKQMAIAFCCIiFIQEgAkECaiECIANBfmoiAw0ACwtBACABQn+FNwOIiQILZAEBfkEAQQApA4iJAiIAQjiGIABCgP4Dg0IohoQgAEKAgPwHg0IYhiAAQoCAgPgPg0IIhoSEIABCCIhCgICA+A+DIABCGIhCgID8B4OEIABCKIhCgP4DgyAAQjiIhISENwOACQsGAEGIiQILAgALCwsBAEGACAsECAAAAA==",I4="c5ac6c16",fD={name:g4,data:p4,hash:I4};let h4=new a,pu=null,Og=new Uint8Array(8);function gD(c){let f="Polynomial must be provided as a 16 char long hex string";if(typeof c!="string"||c.length!==16)return{hi:0,lo:0,err:new Error(f)};let y=+`0x${c.slice(0,8)}`,S=+`0x${c.slice(8)}`;return Number.isNaN(y)||Number.isNaN(S)?{hi:y,lo:S,err:new Error(f)}:{hi:y,lo:S,err:null}}function Py(c,f,y){let S=new DataView(c);S.setUint32(0,f,!0),S.setUint32(4,y,!0)}function y4(c,f="c96c5795d7870f42"){let{hi:y,lo:S,err:U}=gD(f);if(U!==null)return Promise.reject(U);if(pu===null)return w(h4,fD,8).then(G=>(pu=G,Py(Og.buffer,S,y),pu.writeMemory(Og),pu.calculate(c)));try{Py(Og.buffer,S,y),pu.writeMemory(Og);let G=pu.calculate(c);return Promise.resolve(G)}catch(G){return Promise.reject(G)}}function B4(c="c96c5795d7870f42"){let{hi:f,lo:y,err:S}=gD(c);return S!==null?Promise.reject(S):k(fD,8).then(U=>{let G=new Uint8Array(8);Py(G.buffer,y,f),U.writeMemory(G),U.init();let Ae={init:()=>(U.writeMemory(G),U.init(),Ae),update:ye=>(U.update(ye),Ae),digest:ye=>U.digest(ye),save:()=>U.save(),load:ye=>(U.load(ye),Ae),blockSize:8,digestSize:8};return Ae})}var m4="md4",C4="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",S4="bd8ce7c7",pD={name:m4,data:C4,hash:S4};let k4=new a,Dg=null;function E4(c){if(Dg===null)return w(k4,pD,16).then(f=>(Dg=f,Dg.calculate(c)));try{let f=Dg.calculate(c);return Promise.resolve(f)}catch(f){return Promise.reject(f)}}function Q4(){return k(pD,16).then(c=>{c.init();let f={init:()=>(c.init(),f),update:y=>(c.update(y),f),digest:y=>c.digest(y),save:()=>c.save(),load:y=>(c.load(y),f),blockSize:64,digestSize:16};return f})}var w4="md5",b4="AGFzbQEAAAABEgRgAAF/YAAAYAF/AGACf38BfwMIBwABAgMBAAIFBAEBAgIGDgJ/AUGgigULfwBBgAgLB3AIBm1lbW9yeQIADkhhc2hfR2V0QnVmZmVyAAAJSGFzaF9Jbml0AAELSGFzaF9VcGRhdGUAAgpIYXNoX0ZpbmFsAAQNSGFzaF9HZXRTdGF0ZQAFDkhhc2hfQ2FsY3VsYXRlAAYKU1RBVEVfU0laRQMBCoMaBwUAQYAJCy0AQQBC/rnrxemOlZkQNwKQiQFBAEKBxpS6lvHq5m83AoiJAUEAQgA3AoCJAQu+BQEHf0EAQQAoAoCJASIBIABqQf////8BcSICNgKAiQFBAEEAKAKEiQEgAiABSWogAEEddmo2AoSJAQJAAkACQAJAAkACQCABQT9xIgMNAEGACSEEDAELIABBwAAgA2siBUkNASAFQQNxIQZBACEBAkAgA0E/c0EDSQ0AIANBgIkBaiEEIAVB/ABxIQdBACEBA0AgBCABaiICQRhqIAFBgAlqLQAAOgAAIAJBGWogAUGBCWotAAA6AAAgAkEaaiABQYIJai0AADoAACACQRtqIAFBgwlqLQAAOgAAIAcgAUEEaiIBRw0ACwsCQCAGRQ0AIANBmIkBaiECA0AgAiABaiABQYAJai0AADoAACABQQFqIQEgBkF/aiIGDQALC0GYiQFBwAAQAxogACAFayEAIAVBgAlqIQQLIABBwABPDQEgACECDAILIABFDQIgAEEDcSEGQQAhAQJAIABBBEkNACADQYCJAWohBCAAQXxxIQBBACEBA0AgBCABaiICQRhqIAFBgAlqLQAAOgAAIAJBGWogAUGBCWotAAA6AAAgAkEaaiABQYIJai0AADoAACACQRtqIAFBgwlqLQAAOgAAIAAgAUEEaiIBRw0ACwsgBkUNAiADQZiJAWohAgNAIAIgAWogAUGACWotAAA6AAAgAUEBaiEBIAZBf2oiBg0ADAMLCyAAQT9xIQIgBCAAQUBxEAMhBAsgAkUNACACQQNxIQZBACEBAkAgAkEESQ0AIAJBPHEhAEEAIQEDQCABQZiJAWogBCABaiICLQAAOgAAIAFBmYkBaiACQQFqLQAAOgAAIAFBmokBaiACQQJqLQAAOgAAIAFBm4kBaiACQQNqLQAAOgAAIAAgAUEEaiIBRw0ACwsgBkUNAANAIAFBmIkBaiAEIAFqLQAAOgAAIAFBAWohASAGQX9qIgYNAAsLC4cQARl/QQAoApSJASECQQAoApCJASEDQQAoAoyJASEEQQAoAoiJASEFA0AgACgCCCIGIAAoAhgiByAAKAIoIgggACgCOCIJIAAoAjwiCiAAKAIMIgsgACgCHCIMIAAoAiwiDSAMIAsgCiANIAkgCCAHIAMgBmogAiAAKAIEIg5qIAUgBCACIANzcSACc2ogACgCACIPakH4yKq7fWpBB3cgBGoiECAEIANzcSADc2pB1u6exn5qQQx3IBBqIhEgECAEc3EgBHNqQdvhgaECakERdyARaiISaiAAKAIUIhMgEWogACgCECIUIBBqIAQgC2ogEiARIBBzcSAQc2pB7p33jXxqQRZ3IBJqIhAgEiARc3EgEXNqQa+f8Kt/akEHdyAQaiIRIBAgEnNxIBJzakGqjJ+8BGpBDHcgEWoiEiARIBBzcSAQc2pBk4zBwXpqQRF3IBJqIhVqIAAoAiQiFiASaiAAKAIgIhcgEWogDCAQaiAVIBIgEXNxIBFzakGBqppqakEWdyAVaiIQIBUgEnNxIBJzakHYsYLMBmpBB3cgEGoiESAQIBVzcSAVc2pBr++T2nhqQQx3IBFqIhIgESAQc3EgEHNqQbG3fWpBEXcgEmoiFWogACgCNCIYIBJqIAAoAjAiGSARaiANIBBqIBUgEiARc3EgEXNqQb6v88p4akEWdyAVaiIQIBUgEnNxIBJzakGiosDcBmpBB3cgEGoiESAQIBVzcSAVc2pBk+PhbGpBDHcgEWoiFSARIBBzcSAQc2pBjofls3pqQRF3IBVqIhJqIAcgFWogDiARaiAKIBBqIBIgFSARc3EgEXNqQaGQ0M0EakEWdyASaiIQIBJzIBVxIBJzakHiyviwf2pBBXcgEGoiESAQcyAScSAQc2pBwOaCgnxqQQl3IBFqIhIgEXMgEHEgEXNqQdG0+bICakEOdyASaiIVaiAIIBJqIBMgEWogDyAQaiAVIBJzIBFxIBJzakGqj9vNfmpBFHcgFWoiECAVcyAScSAVc2pB3aC8sX1qQQV3IBBqIhEgEHMgFXEgEHNqQdOokBJqQQl3IBFqIhIgEXMgEHEgEXNqQYHNh8V9akEOdyASaiIVaiAJIBJqIBYgEWogFCAQaiAVIBJzIBFxIBJzakHI98++fmpBFHcgFWoiECAVcyAScSAVc2pB5puHjwJqQQV3IBBqIhEgEHMgFXEgEHNqQdaP3Jl8akEJdyARaiISIBFzIBBxIBFzakGHm9Smf2pBDncgEmoiFWogBiASaiAYIBFqIBcgEGogFSAScyARcSASc2pB7anoqgRqQRR3IBVqIhAgFXMgEnEgFXNqQYXSj896akEFdyAQaiIRIBBzIBVxIBBzakH4x75nakEJdyARaiISIBFzIBBxIBFzakHZhby7BmpBDncgEmoiFWogFyASaiATIBFqIBkgEGogFSAScyARcSASc2pBipmp6XhqQRR3IBVqIhAgFXMiFSASc2pBwvJoakEEdyAQaiIRIBVzakGB7ce7eGpBC3cgEWoiEiARcyIaIBBzakGiwvXsBmpBEHcgEmoiFWogFCASaiAOIBFqIAkgEGogFSAac2pBjPCUb2pBF3cgFWoiECAVcyIVIBJzakHE1PulempBBHcgEGoiESAVc2pBqZ/73gRqQQt3IBFqIhIgEXMiCSAQc2pB4JbttX9qQRB3IBJqIhVqIA8gEmogGCARaiAIIBBqIBUgCXNqQfD4/vV7akEXdyAVaiIQIBVzIhUgEnNqQcb97cQCakEEdyAQaiIRIBVzakH6z4TVfmpBC3cgEWoiEiARcyIIIBBzakGF4bynfWpBEHcgEmoiFWogGSASaiAWIBFqIAcgEGogFSAIc2pBhbqgJGpBF3cgFWoiESAVcyIQIBJzakG5oNPOfWpBBHcgEWoiEiAQc2pB5bPutn5qQQt3IBJqIhUgEnMiByARc2pB+PmJ/QFqQRB3IBVqIhBqIAwgFWogDyASaiAGIBFqIBAgB3NqQeWssaV8akEXdyAQaiIRIBVBf3NyIBBzakHExKShf2pBBncgEWoiEiAQQX9zciARc2pBl/+rmQRqQQp3IBJqIhAgEUF/c3IgEnNqQafH0Nx6akEPdyAQaiIVaiALIBBqIBkgEmogEyARaiAVIBJBf3NyIBBzakG5wM5kakEVdyAVaiIRIBBBf3NyIBVzakHDs+2qBmpBBncgEWoiECAVQX9zciARc2pBkpmz+HhqQQp3IBBqIhIgEUF/c3IgEHNqQf3ov39qQQ93IBJqIhVqIAogEmogFyAQaiAOIBFqIBUgEEF/c3IgEnNqQdG7kax4akEVdyAVaiIQIBJBf3NyIBVzakHP/KH9BmpBBncgEGoiESAVQX9zciAQc2pB4M2zcWpBCncgEWoiEiAQQX9zciARc2pBlIaFmHpqQQ93IBJqIhVqIA0gEmogFCARaiAYIBBqIBUgEUF/c3IgEnNqQaGjoPAEakEVdyAVaiIQIBJBf3NyIBVzakGC/c26f2pBBncgEGoiESAVQX9zciAQc2pBteTr6XtqQQp3IBFqIhIgEEF/c3IgEXNqQbul39YCakEPdyASaiIVIARqIBYgEGogFSARQX9zciASc2pBkaeb3H5qQRV3aiEEIBUgA2ohAyASIAJqIQIgESAFaiEFIABBwABqIQAgAUFAaiIBDQALQQAgAjYClIkBQQAgAzYCkIkBQQAgBDYCjIkBQQAgBTYCiIkBIAALyAMBBX9BACgCgIkBQT9xIgBBmIkBakGAAToAACAAQQFqIQECQAJAAkACQCAAQT9zIgJBB0sNACACRQ0BIAFBmIkBakEAOgAAIAJBAUYNASAAQZqJAWpBADoAACACQQJGDQEgAEGbiQFqQQA6AAAgAkEDRg0BIABBnIkBakEAOgAAIAJBBEYNASAAQZ2JAWpBADoAACACQQVGDQEgAEGeiQFqQQA6AAAgAkEGRg0BIABBn4kBakEAOgAADAELIAJBCEYNAkE2IABrIgMhBAJAIAJBA3EiAEUNAEEAIABrIQRBACEAA0AgAEHPiQFqQQA6AAAgBCAAQX9qIgBHDQALIAMgAGohBAsgA0EDSQ0CDAELQZiJAUHAABADGkEAIQFBNyEECyABQYCJAWohAEF/IQIDQCAAIARqQRVqQQA2AAAgAEF8aiEAIAQgAkEEaiICRw0ACwtBAEEAKAKEiQE2AtSJAUEAQQAoAoCJASIAQRV2OgDTiQFBACAAQQ12OgDSiQFBACAAQQV2OgDRiQFBACAAQQN0IgA6ANCJAUEAIAA2AoCJAUGYiQFBwAAQAxpBAEEAKQKIiQE3A4AJQQBBACkCkIkBNwOICQsGAEGAiQELMwBBAEL+uevF6Y6VmRA3ApCJAUEAQoHGlLqW8ermbzcCiIkBQQBCADcCgIkBIAAQAhAECwsLAQBBgAgLBJgAAAA=",R4="e6508e4b",ID={name:w4,data:b4,hash:R4};let P4=new a,Ug=null;function N4(c){if(Ug===null)return w(P4,ID,16).then(f=>(Ug=f,Ug.calculate(c)));try{let f=Ug.calculate(c);return Promise.resolve(f)}catch(f){return Promise.reject(f)}}function v4(){return k(ID,16).then(c=>{c.init();let f={init:()=>(c.init(),f),update:y=>(c.update(y),f),digest:y=>c.digest(y),save:()=>c.save(),load:y=>(c.load(y),f),blockSize:64,digestSize:16};return f})}var O4="sha1",D4="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",U4="6b530c24",hD={name:O4,data:D4,hash:U4};let x4=new a,xg=null;function T4(c){if(xg===null)return w(x4,hD,20).then(f=>(xg=f,xg.calculate(c)));try{let f=xg.calculate(c);return Promise.resolve(f)}catch(f){return Promise.reject(f)}}function J4(){return k(hD,20).then(c=>{c.init();let f={init:()=>(c.init(),f),update:y=>(c.update(y),f),digest:y=>c.digest(y),save:()=>c.save(),load:y=>(c.load(y),f),blockSize:64,digestSize:20};return f})}var F4="sha3",q4="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",H4="fb24e536",Tg={name:F4,data:q4,hash:H4};let M4=new a,Il=null;function Jg(c){return[224,256,384,512].includes(c)?null:new Error("Invalid variant! Valid values: 224, 256, 384, 512")}function _4(c,f=512){if(Jg(f))return Promise.reject(Jg(f));let y=f/8;if(Il===null||Il.hashLength!==y)return w(M4,Tg,y).then(S=>(Il=S,Il.calculate(c,f,6)));try{let S=Il.calculate(c,f,6);return Promise.resolve(S)}catch(S){return Promise.reject(S)}}function G4(c=512){if(Jg(c))return Promise.reject(Jg(c));let f=c/8;return k(Tg,f).then(y=>{y.init(c);let S={init:()=>(y.init(c),S),update:U=>(y.update(U),S),digest:U=>y.digest(U,6),save:()=>y.save(),load:U=>(y.load(U),S),blockSize:200-2*f,digestSize:f};return S})}let V4=new a,hl=null;function Fg(c){return[224,256,384,512].includes(c)?null:new Error("Invalid variant! Valid values: 224, 256, 384, 512")}function K4(c,f=512){if(Fg(f))return Promise.reject(Fg(f));let y=f/8;if(hl===null||hl.hashLength!==y)return w(V4,Tg,y).then(S=>(hl=S,hl.calculate(c,f,1)));try{let S=hl.calculate(c,f,1);return Promise.resolve(S)}catch(S){return Promise.reject(S)}}function W4(c=512){if(Fg(c))return Promise.reject(Fg(c));let f=c/8;return k(Tg,f).then(y=>{y.init(c);let S={init:()=>(y.init(c),S),update:U=>(y.update(U),S),digest:U=>y.digest(U,1),save:()=>y.save(),load:U=>(y.load(U),S),blockSize:200-2*f,digestSize:f};return S})}var L4="sha256",Y4="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c2pBx6KerX1qIhkgASADcyACcSABIANxcyABQR53IAFBE3dzIAFBCndzaiAaaiICaiIJIBMgEnNxIBJzaiAJQRp3IAlBFXdzIAlBB3dzakHRxqk2aiIaIAIgAXMgA3EgAiABcXMgAkEedyACQRN3cyACQQp3c2ogGGoiA2oiESAJIBNzcSATc2ogEUEadyARQRV3cyARQQd3c2pB59KkoQFqIhggAyACcyABcSADIAJxcyADQR53IANBE3dzIANBCndzaiAUaiIBaiISIBEgCXNxIAlzaiASQRp3IBJBFXdzIBJBB3dzakGFldy9AmoiFCABIANzIAJxIAEgA3FzIAFBHncgAUETd3MgAUEKd3NqIBdqIgJqIhMgI2ogJiASaiAiIBFqICUgCWogEyASIBFzcSARc2ogE0EadyATQRV3cyATQQd3c2pBuMLs8AJqIhcgAiABcyADcSACIAFxcyACQR53IAJBE3dzIAJBCndzaiAZaiIDaiIJIBMgEnNxIBJzaiAJQRp3IAlBFXdzIAlBB3dzakH827HpBGoiGSADIAJzIAFxIAMgAnFzIANBHncgA0ETd3MgA0EKd3NqIBpqIgFqIhEgCSATc3EgE3NqIBFBGncgEUEVd3MgEUEHd3NqQZOa4JkFaiIaIAEgA3MgAnEgASADcXMgAUEedyABQRN3cyABQQp3c2ogGGoiAmoiEiARIAlzcSAJc2ogEkEadyASQRV3cyASQQd3c2pB1OapqAZqIhggAiABcyADcSACIAFxcyACQR53IAJBE3dzIAJBCndzaiAUaiIDaiITaiAoIBJqICQgEWogJyAJaiATIBIgEXNxIBFzaiATQRp3IBNBFXdzIBNBB3dzakG7laizB2oiFCADIAJzIAFxIAMgAnFzIANBHncgA0ETd3MgA0EKd3NqIBdqIgFqIgkgEyASc3EgEnNqIAlBGncgCUEVd3MgCUEHd3NqQa6Si454aiIXIAEgA3MgAnEgASADcXMgAUEedyABQRN3cyABQQp3c2ogGWoiAmoiESAJIBNzcSATc2ogEUEadyARQRV3cyARQQd3c2pBhdnIk3lqIhkgAiABcyADcSACIAFxcyACQR53IAJBE3dzIAJBCndzaiAaaiIDaiISIBEgCXNxIAlzaiASQRp3IBJBFXdzIBJBB3dzakGh0f+VemoiGiADIAJz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",z4="8c18dd94",qg={name:L4,data:Y4,hash:z4};let Z4=new a,Hg=null;function X4(c){if(Hg===null)return w(Z4,qg,28).then(f=>(Hg=f,Hg.calculate(c,224)));try{let f=Hg.calculate(c,224);return Promise.resolve(f)}catch(f){return Promise.reject(f)}}function $4(){return k(qg,28).then(c=>{c.init(224);let f={init:()=>(c.init(224),f),update:y=>(c.update(y),f),digest:y=>c.digest(y),save:()=>c.save(),load:y=>(c.load(y),f),blockSize:64,digestSize:28};return f})}let j4=new a,Mg=null;function eV(c){if(Mg===null)return w(j4,qg,32).then(f=>(Mg=f,Mg.calculate(c,256)));try{let f=Mg.calculate(c,256);return Promise.resolve(f)}catch(f){return Promise.reject(f)}}function yD(){return k(qg,32).then(c=>{c.init(256);let f={init:()=>(c.init(256),f),update:y=>(c.update(y),f),digest:y=>c.digest(y),save:()=>c.save(),load:y=>(c.load(y),f),blockSize:64,digestSize:32};return f})}var nV="sha512",tV="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",rV="f2e40eb1",_g={name:nV,data:tV,hash:rV};let iV=new a,Gg=null;function oV(c){if(Gg===null)return w(iV,_g,48).then(f=>(Gg=f,Gg.calculate(c,384)));try{let f=Gg.calculate(c,384);return Promise.resolve(f)}catch(f){return Promise.reject(f)}}function aV(){return k(_g,48).then(c=>{c.init(384);let f={init:()=>(c.init(384),f),update:y=>(c.update(y),f),digest:y=>c.digest(y),save:()=>c.save(),load:y=>(c.load(y),f),blockSize:128,digestSize:48};return f})}let sV=new a,Vg=null;function dV(c){if(Vg===null)return w(sV,_g,64).then(f=>(Vg=f,Vg.calculate(c,512)));try{let f=Vg.calculate(c,512);return Promise.resolve(f)}catch(f){return Promise.reject(f)}}function cV(){return k(_g,64).then(c=>{c.init(512);let f={init:()=>(c.init(512),f),update:y=>(c.update(y),f),digest:y=>c.digest(y),save:()=>c.save(),load:y=>(c.load(y),f),blockSize:128,digestSize:64};return f})}var uV="xxhash32",AV="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",lV="4bb12485",BD={name:uV,data:AV,hash:lV};let fV=new a,Kg=null;function Wg(c){return!Number.isInteger(c)||c<0||c>4294967295?new Error("Seed must be a valid 32-bit long unsigned integer."):null}function gV(c,f=0){if(Wg(f))return Promise.reject(Wg(f));if(Kg===null)return w(fV,BD,4).then(y=>(Kg=y,Kg.calculate(c,f)));try{let y=Kg.calculate(c,f);return Promise.resolve(y)}catch(y){return Promise.reject(y)}}function pV(c=0){return Wg(c)?Promise.reject(Wg(c)):k(BD,4).then(f=>{f.init(c);let y={init:()=>(f.init(c),y),update:S=>(f.update(S),y),digest:S=>f.digest(S),save:()=>f.save(),load:S=>(f.load(S),y),blockSize:16,digestSize:4};return y})}var IV="xxhash64",hV="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",yV="177fbfa3",mD={name:IV,data:hV,hash:yV};let BV=new a,Iu=null,Lg=new Uint8Array(8);function Hd(c){return!Number.isInteger(c)||c<0||c>4294967295?new Error("Seed must be given as two valid 32-bit long unsigned integers (lo + high)."):null}function Ny(c,f,y){let S=new DataView(c);S.setUint32(0,f,!0),S.setUint32(4,y,!0)}function mV(c,f=0,y=0){if(Hd(f))return Promise.reject(Hd(f));if(Hd(y))return Promise.reject(Hd(y));if(Iu===null)return w(BV,mD,8).then(S=>(Iu=S,Ny(Lg.buffer,f,y),Iu.writeMemory(Lg),Iu.calculate(c)));try{Ny(Lg.buffer,f,y),Iu.writeMemory(Lg);let S=Iu.calculate(c);return Promise.resolve(S)}catch(S){return Promise.reject(S)}}function CV(c=0,f=0){return Hd(c)?Promise.reject(Hd(c)):Hd(f)?Promise.reject(Hd(f)):k(mD,8).then(y=>{let S=new Uint8Array(8);Ny(S.buffer,c,f),y.writeMemory(S),y.init();let U={init:()=>(y.writeMemory(S),y.init(),U),update:G=>(y.update(G),U),digest:G=>y.digest(G),save:()=>y.save(),load:G=>(y.load(G),U),blockSize:32,digestSize:8};return U})}var SV="xxhash3",kV="AGFzbQEAAAABNAhgAAF/YAR/f39/AGAHf39/f39/fwBgBH9+fn4BfmAEf39/fgF+YAN/f34BfmAAAGABfwADDg0AAQIDBAUFBQYHBgAGBQQBAQICBg4CfwFBwI4FC38AQcAJCwdwCAZtZW1vcnkCAA5IYXNoX0dldEJ1ZmZlcgAACUhhc2hfSW5pdAAIC0hhc2hfVXBkYXRlAAkKSGFzaF9GaW5hbAAKDUhhc2hfR2V0U3RhdGUACw5IYXNoX0NhbGN1bGF0ZQAMClNUQVRFX1NJWkUDAQr6QQ0FAEGACgvkAwMPfgF/AX4CQCADRQ0AIAApAzAhBCAAKQM4IQUgACkDICEGIAApAyghByAAKQMQIQggACkDGCEJIAApAwAhCiAAKQMIIQsDQCAFIAFBMGopAwAiDHwgAkE4aikDACABQThqKQMAIg2FIgVCIIggBUL/////D4N+fCEFIAcgAUEgaikDACIOfCACQShqKQMAIAFBKGopAwAiD4UiB0IgiCAHQv////8Pg358IQcgCSABQRBqKQMAIhB8IAJBGGopAwAgAUEYaikDACIRhSIJQiCIIAlC/////w+DfnwhCSALIAEpAwAiEnwgAkEIaiITKQMAIAFBCGopAwAiFIUiC0IgiCALQv////8Pg358IQsgAkEwaikDACAMhSIMQiCIIAxC/////w+DfiAEfCANfCEEIAJBIGopAwAgDoUiDEIgiCAMQv////8Pg34gBnwgD3whBiACQRBqKQMAIBCFIgxCIIggDEL/////D4N+IAh8IBF8IQggAikDACAShSIMQiCIIAxC/////w+DfiAKfCAUfCEKIAFBwABqIQEgEyECIANBf2oiAw0ACyAAIAk3AxggACAKNwMAIAAgCzcDCCAAIAc3AyggACAINwMQIAAgBTcDOCAAIAY3AyAgACAENwMwCwveAgIBfwF+AkAgBCACIAEoAgAiB2siAkkNACAAIAMgBSAHQQN0aiACEAEgACAFIAZqIgcpAwAgACkDACIIQi+IhSAIhUKx893xCX43AwAgACAHKQMIIAApAwgiCEIviIUgCIVCsfPd8Ql+NwMIIAAgBykDECAAKQMQIghCL4iFIAiFQrHz3fEJfjcDECAAIAcpAxggACkDGCIIQi+IhSAIhUKx893xCX43AxggACAHKQMgIAApAyAiCEIviIUgCIVCsfPd8Ql+NwMgIAAgBykDKCAAKQMoIghCL4iFIAiFQrHz3fEJfjcDKCAAIAcpAzAgACkDMCIIQi+IhSAIhUKx893xCX43AzAgACAHKQM4IAApAzgiCEIviIUgCIVCsfPd8Ql+NwM4IAAgAyACQQZ0aiAFIAQgAmsiBxABIAEgBzYCAA8LIAAgAyAFIAdBA3RqIAQQASABIAcgBGo2AgALhQEBAX8gAiABhSADpyIEQRh0IARBgP4DcUEIdHIgBEEIdkGA/gNxIARBGHZycq1CIIYgA4V9QQA1AoCMAUIghiAAQfyLAWo1AgCEhSIDQjGJIANCGImFIAOFQqW+4/TRjIfZn39+IgNCI4ggAK18IAOFQqW+4/TRjIfZn39+IgNCHIggA4ULZwAgAiABc60gA3wiA0IhiEEALQCAjAFBEHQgAEEIdHIgAEEBdkGAjAFqLQAAQRh0ciAAQf+LAWotAAByrYUgA4VCz9bTvtLHq9lCfiIDQh2IIAOFQvnz3fGZ9pmrFn4iA0IgiCADhQuJAwEEfgJAIABBCUkNAEEAKQOAjAEgASkDICABKQMYhSACfIUiA0I4hiADQoD+A4NCKIaEIANCgID8B4NCGIYgA0KAgID4D4NCCIaEhCADQgiIQoCAgPgPgyADQhiIQoCA/AeDhCADQiiIQoD+A4MgA0I4iISEhCAArXwgAEH4iwFqKQMAIAEpAzAgASkDKIUgAn2FIgJ8IAJC/////w+DIgQgA0IgiCIFfiIGQv////8PgyACQiCIIgIgA0L/////D4MiA358IAQgA34iA0IgiHwiBEIghiADQv////8Pg4QgBkIgiCACIAV+fCAEQiCIfIV8IgNCJYggA4VC+fPd8ZnymasWfiIDQiCIIAOFDwsCQCAAQQRJDQAgACABQQhqKQMAIAFBEGopAwAgAhADDwsCQCAARQ0AIAAgASgCACABQQRqKAIAIAIQBA8LIAEpAzggASkDQIUgAoUiA0IhiCADhULP1tO+0ser2UJ+IgNCHYggA4VC+fPd8Zn2masWfiIDQiCIIAOFC94IAQZ+IACtQoeVr6+Ytt6bnn9+IQMCQCAAQSFJDQACQCAAQcEASQ0AAkAgAEHhAEkNACABKQNoIAJ9QQApA7iMAYUiBEL/////D4MiBSABKQNgIAJ8QQApA7CMAYUiBkIgiCIHfiIIQv////8PgyAEQiCIIgQgBkL/////D4MiBn58IAUgBn4iBUIgiHwiBkIghiAFQv////8Pg4QgCEIgiCAEIAd+fCAGQiCIfIUgA3wgASkDeCACfSAAQciLAWopAwCFIgNC/////w+DIgQgASkDcCACfCAAQcCLAWopAwCFIgVCIIgiBn4iB0L/////D4MgA0IgiCIDIAVC/////w+DIgV+fCAEIAV+IgRCIIh8IgVCIIYgBEL/////D4OEIAdCIIggAyAGfnwgBUIgiHyFfCEDCyABKQNIIAJ9QQApA6iMAYUiBEL/////D4MiBSABKQNAIAJ8QQApA6CMAYUiBkIgiCIHfiIIQv////8PgyAEQiCIIgQgBkL/////D4MiBn58IAUgBn4iBUIgiHwiBkIghiAFQv////8Pg4QgCEIgiCAEIAd+fCAGQiCIfIUgA3wgASkDWCACfSAAQdiLAWopAwCFIgNC/////w+DIgQgASkDUCACfCAAQdCLAWopAwCFIgVCIIgiBn4iB0L/////D4MgA0IgiCIDIAVC/////w+DIgV+fCAEIAV+IgRCIIh8IgVCIIYgBEL/////D4OEIAdCIIggAyAGfnwgBUIgiHyFfCEDCyABKQMoIAJ9QQApA5iMAYUiBEL/////D4MiBSABKQMgIAJ8QQApA5CMAYUiBkIgiCIHfiIIQv////8PgyAEQiCIIgQgBkL/////D4MiBn58IAUgBn4iBUIgiHwiBkIghiAFQv////8Pg4QgCEIgiCAEIAd+fCAGQiCIfIUgA3wgASkDOCACfSAAQeiLAWopAwCFIgNC/////w+DIgQgASkDMCACfCAAQeCLAWopAwCFIgVCIIgiBn4iB0L/////D4MgA0IgiCIDIAVC/////w+DIgV+fCAEIAV+IgRCIIh8IgVCIIYgBEL/////D4OEIAdCIIggAyAGfnwgBUIgiHyFfCEDCyABKQMIIAJ9QQApA4iMAYUiBEL/////D4MiBSABKQMAIAJ8QQApA4CMAYUiBkIgiCIHfiIIQv////8PgyAEQiCIIgQgBkL/////D4MiBn58IAUgBn4iBUIgiHwiBkIghiAFQv////8Pg4QgCEIgiCAEIAd+fCAGQiCIfIUgA3wgASkDGCACfSAAQfiLAWopAwCFIgNC/////w+DIgQgASkDECACfCAAQfCLAWopAwCFIgJCIIgiBX4iBkL/////D4MgA0IgiCIDIAJC/////w+DIgJ+fCAEIAJ+IgJCIIh8IgRCIIYgAkL/////D4OEIAZCIIggAyAFfnwgBEIgiHyFfCICQiWIIAKFQvnz3fGZ8pmrFn4iAkIgiCAChQv8CgQBfwV+An8BfkEAIQMgASkDeCACfUEAKQP4jAGFIgRC/////w+DIgUgASkDcCACfEEAKQPwjAGFIgZCIIgiB34iCEL/////D4MgBEIgiCIEIAZC/////w+DIgZ+fCAFIAZ+IgVCIIh8IgZCIIYgBUL/////D4OEIAhCIIggBCAHfnwgBkIgiHyFIAEpA2ggAn1BACkD6IwBhSIEQv////8PgyIFIAEpA2AgAnxBACkD4IwBhSIGQiCIIgd+IghC/////w+DIARCIIgiBCAGQv////8PgyIGfnwgBSAGfiIFQiCIfCIGQiCGIAVC/////w+DhCAIQiCIIAQgB358IAZCIIh8hSABKQNYIAJ9QQApA9iMAYUiBEL/////D4MiBSABKQNQIAJ8QQApA9CMAYUiBkIgiCIHfiIIQv////8PgyAEQiCIIgQgBkL/////D4MiBn58IAUgBn4iBUIgiHwiBkIghiAFQv////8Pg4QgCEIgiCAEIAd+fCAGQiCIfIUgASkDSCACfUEAKQPIjAGFIgRC/////w+DIgUgASkDQCACfEEAKQPAjAGFIgZCIIgiB34iCEL/////D4MgBEIgiCIEIAZC/////w+DIgZ+fCAFIAZ+IgVCIIh8IgZCIIYgBUL/////D4OEIAhCIIggBCAHfnwgBkIgiHyFIAEpAzggAn1BACkDuIwBhSIEQv////8PgyIFIAEpAzAgAnxBACkDsIwBhSIGQiCIIgd+IghC/////w+DIARCIIgiBCAGQv////8PgyIGfnwgBSAGfiIFQiCIfCIGQiCGIAVC/////w+DhCAIQiCIIAQgB358IAZCIIh8hSABKQMoIAJ9QQApA6iMAYUiBEL/////D4MiBSABKQMgIAJ8QQApA6CMAYUiBkIgiCIHfiIIQv////8PgyAEQiCIIgQgBkL/////D4MiBn58IAUgBn4iBUIgiHwiBkIghiAFQv////8Pg4QgCEIgiCAEIAd+fCAGQiCIfIUgASkDGCACfUEAKQOYjAGFIgRC/////w+DIgUgASkDECACfEEAKQOQjAGFIgZCIIgiB34iCEL/////D4MgBEIgiCIEIAZC/////w+DIgZ+fCAFIAZ+IgVCIIh8IgZCIIYgBUL/////D4OEIAhCIIggBCAHfnwgBkIgiHyFIAEpAwggAn1BACkDiIwBhSIEQv////8PgyIFIAEpAwAgAnxBACkDgIwBhSIGQiCIIgd+IghC/////w+DIARCIIgiBCAGQv////8PgyIGfnwgBSAGfiIFQiCIfCIGQiCGIAVC/////w+DhCAIQiCIIAQgB358IAZCIIh8hSAArUKHla+vmLbem55/fnx8fHx8fHx8IgRCJYggBIVC+fPd8ZnymasWfiIEQiCIIASFIQQCQCAAQZABSA0AIABBBHZBeGohCQNAIAEgA2oiCkELaikDACACfSADQYiNAWopAwCFIgVC/////w+DIgYgCkEDaikDACACfCADQYCNAWopAwCFIgdCIIgiCH4iC0L/////D4MgBUIgiCIFIAdC/////w+DIgd+fCAGIAd+IgZCIIh8IgdCIIYgBkL/////D4OEIAtCIIggBSAIfnwgB0IgiHyFIAR8IQQgA0EQaiEDIAlBf2oiCQ0ACwsgASkDfyACfSAAQfiLAWopAwCFIgVC/////w+DIgYgASkDdyACfCAAQfCLAWopAwCFIgJCIIgiB34iCEL/////D4MgBUIgiCIFIAJC/////w+DIgJ+fCAGIAJ+IgJCIIh8IgZCIIYgAkL/////D4OEIAhCIIggBSAHfnwgBkIgiHyFIAR8IgJCJYggAoVC+fPd8ZnymasWfiICQiCIIAKFC98FAgF+AX8CQAJAQQApA4AKIgBQRQ0AQYAIIQFCACEADAELAkBBACkDoI4BIABSDQBBACEBDAELQQAhAUEAQq+v79e895Kg/gAgAH03A/iLAUEAIABCxZbr+djShYIofDcD8IsBQQBCj/Hjja2P9JhOIAB9NwPoiwFBACAAQqus+MXV79HQfHw3A+CLAUEAQtOt1LKShbW0nn8gAH03A9iLAUEAIABCl5r0jvWWvO3JAHw3A9CLAUEAQsWDgv2v/8SxayAAfTcDyIsBQQAgAELqi7OdyOb09UN8NwPAiwFBAELIv/rLnJveueQAIAB9NwO4iwFBACAAQoqjgd/Ume2sMXw3A7CLAUEAQvm57738+MKnHSAAfTcDqIsBQQAgAEKo9dv7s5ynmj98NwOgiwFBAEK4sry3lNW31lggAH03A5iLAUEAIABC8cihuqm0w/zOAHw3A5CLAUEAQoihl9u445SXo38gAH03A4iLAUEAIABCvNDI2pvysIBLfDcDgIsBQQBC4OvAtJ7QjpPMACAAfTcD+IoBQQAgAEK4kZii9/6Qko5/fDcD8IoBQQBCgrXB7sf5v7khIAB9NwPoigFBACAAQsvzmffEmfDy+AB8NwPgigFBAELygJGl+vbssx8gAH03A9iKAUEAIABC3qm3y76Q5MtbfDcD0IoBQQBC/IKE5PK+yNYcIAB9NwPIigFBACAAQrj9s8uzhOmlvn98NwPAigELQQBCADcDkI4BQQBCADcDiI4BQQBCADcDgI4BQQBCvdzKlQw3A4CKAUEAQoeVr6+Ytt6bnn83A4iKAUEAQs/W077Sx6vZQjcDkIoBQQBC+fPd8Zn2masWNwOYigFBAELj3MqV/M7y9YV/NwOgigFBAEL3lK+vCDcDqIoBQQBCxc/ZsvHluuonNwOwigFBAEKx893xCTcDuIoBQQAgADcDoI4BQQAgATYCsI4BQQBCkICAgIAQNwOYjgEL9AkBCH9BAEEAKQOQjgEgAK18NwOQjgECQAJAAkBBACgCgI4BIgEgAGoiAkGAAksNACABQYCMAWohA0GACiEEAkAgAEEITw0AIAAhAQwCCwJAAkAgAEF4aiIFQQN2QQFqQQdxIgYNAEGACiEEIAAhAQwBCyAGQQN0IQFBgAohBANAIAMgBCkDADcDACADQQhqIQMgBEEIaiEEIAZBf2oiBg0ACyAAIAFrIQELIAVBOEkNAQNAIAMgBCkDADcDACADQQhqIARBCGopAwA3AwAgA0EQaiAEQRBqKQMANwMAIANBGGogBEEYaikDADcDACADQSBqIARBIGopAwA3AwAgA0EoaiAEQShqKQMANwMAIANBMGogBEEwaikDADcDACADQThqIARBOGopAwA3AwAgA0HAAGohAyAEQcAAaiEEIAFBQGoiAUEHSw0ADAILC0GACiEEIABBgApqIQVBACgCsI4BIgNBwIoBIAMbIQYCQCABRQ0AIAFBgIwBaiEDQYAKIQQCQAJAQYACIAFrIgdBCE8NACAHIQAMAQsCQAJAQfgBIAFrIghBA3ZBAWpBB3EiAg0AQYAKIQQgByEADAELQYAKIQQgAkEDdCIAIQIDQCADIAQpAwA3AwAgA0EIaiEDIARBCGohBCACQXhqIgINAAtBgAIgASAAamshAAsgCEE4SQ0AA0AgAyAEKQMANwMAIANBCGogBEEIaikDADcDACADQRBqIARBEGopAwA3AwAgA0EYaiAEQRhqKQMANwMAIANBIGogBEEgaikDADcDACADQShqIARBKGopAwA3AwAgA0EwaiAEQTBqKQMANwMAIANBOGogBEE4aikDADcDACADQcAAaiEDIARBwABqIQQgAEFAaiIAQQdLDQALCwJAIABFDQACQAJAIABBB3EiAg0AIAAhAQwBCyAAQXhxIQEDQCADIAQtAAA6AAAgA0EBaiEDIARBAWohBCACQX9qIgINAAsLIABBCEkNAANAIAMgBCkAADcAACADQQhqIQMgBEEIaiEEIAFBeGoiAQ0ACwtBgIoBQYiOAUEAKAKYjgFBgIwBQQQgBkEAKAKcjgEQAkEAQQA2AoCOASAHQYAKaiEECwJAIARBgAJqIAVPDQAgBUGAfmohAgNAQYCKAUGIjgFBACgCmI4BIAQiA0EEIAZBACgCnI4BEAIgA0GAAmoiBCACSQ0AC0EAIAMpA8ABNwPAjQFBACADKQPIATcDyI0BQQAgAykD0AE3A9CNAUEAIAMpA9gBNwPYjQFBACADKQPgATcD4I0BQQAgAykD6AE3A+iNAUEAIAMpA/ABNwPwjQFBACADKQP4ATcD+I0BC0GAjAEhAwJAAkAgBSAEayICQQhPDQAgAiEGDAELQYCMASEDIAIhBgNAIAMgBCkDADcDACADQQhqIQMgBEEIaiEEIAZBeGoiBkEHSw0ACwsgBkUNAQNAIAMgBC0AADoAACADQQFqIQMgBEEBaiEEIAZBf2oiBg0ADAILCyABRQ0AAkACQCABQQdxIgYNACABIQIMAQsgAUF4cSECA0AgAyAELQAAOgAAIANBAWohAyAEQQFqIQQgBkF/aiIGDQALCwJAIAFBCEkNAANAIAMgBCkAADcAACADQQhqIQMgBEEIaiEEIAJBeGoiAg0ACwtBACgCgI4BIABqIQILQQAgAjYCgI4BC/ISBQR/A34BfxV+BX8jACIAIQEgAEGAAWtBQHEiAiQAQQAoArCOASIAQcCKASAAGyEDAkACQEEAKQOQjgEiBELxAVQNACACQQApA4CKATcDACACQQApA4iKATcDCCACQQApA5CKATcDECACQQApA5iKATcDGCACQQApA6CKATcDICACQQApA6iKATcDKCACQQApA7CKASIFNwMwIAJBACkDuIoBIgY3AzgCQAJAQQAoAoCOASIHQcAASQ0AIAJBACgCiI4BNgJAIAIgAkHAAGpBACgCmI4BQYCMASAHQX9qQQZ2IANBACgCnI4BIgAQAiADIABqIgBBeWopAwAhCCAAKQMJIQkgACkDGSEKIAApAykhCyAHQcCLAWopAwAhBSAAKQMBIQwgB0HIiwFqKQMAIQYgB0HQiwFqKQMAIQ0gACkDESEOIAdB2IsBaikDACEPIAdB4IsBaikDACEQIAApAyEhESAHQeiLAWopAwAhEiACKQMAIRMgAikDECEUIAIpAyAhFSACKQMwIRYgAikDCCEXIAIpAxghGCACKQMoIRkgAiACKQM4IAdB8IsBaikDACIafCAAKQMxIAdB+IsBaikDACIbhSIcQiCIIBxC/////w+Dfnw3AzggGSAQfCARIBKFIhFCIIggEUL/////D4N+fCERIBggDXwgDiAPhSIOQiCIIA5C/////w+DfnwhDiAXIAV8IAwgBoUiDEIgiCAMQv////8Pg358IQwgGyAWIAsgGoUiC0IgiCALQv////8Pg358fCELIBIgFSAKIBCFIhBCIIggEEL/////D4N+fHwhECAPIBQgCSANhSINQiCIIA1C/////w+Dfnx8IRIgBiATIAggBYUiBUIgiCAFQv////8Pg358fCEIDAELIAdBwI0BaiEdQcAAIAdrIR4gAkHAAGohAAJAAkACQCAHQThNDQAgHiEfDAELAkACQEE4IAdrQQN2QQFqQQdxIh8NACACQcAAaiEAIB4hHwwBCyACQcAAaiEAIB9BA3QiICEfA0AgACAdKQMANwMAIABBCGohACAdQQhqIR0gH0F4aiIfDQALQcAAIAcgIGprIR8LAkAgBw0AA0AgACAdKQMANwMAIABBCGogHUEIaikDADcDACAAQRBqIB1BEGopAwA3AwAgAEEYaiAdQRhqKQMANwMAIABBIGogHUEgaikDADcDACAAQShqIB1BKGopAwA3AwAgAEEwaiAdQTBqKQMANwMAIABBOGogHUE4aikDADcDACAAQcAAaiEAIB1BwABqIR0gH0FAaiIfQQdLDQALCyAfRQ0BCyAfQX9qISECQCAfQQdxIiBFDQAgH0F4cSEfA0AgACAdLQAAOgAAIABBAWohACAdQQFqIR0gIEF/aiIgDQALCyAhQQdJDQADQCAAIB0pAAA3AAAgAEEIaiEAIB1BCGohHSAfQXhqIh8NAAsLIAJBwABqIB5qIR1BgIwBIQACQAJAAkAgB0EISQ0AAkAgB0E4akEDdkEBakEHcSIfDQAMAgsgH0EDdCEgQYCMASEAA0AgHSAAKQMANwMAIB1BCGohHSAAQQhqIQAgH0F/aiIfDQALIAcgIGshBwsgB0UNAQJAAkAgB0EHcSIgDQAgByEfDAELIAdBeHEhHwNAIB0gAC0AADoAACAdQQFqIR0gAEEBaiEAICBBf2oiIA0ACwsgB0EISQ0BCwNAIB0gACkAADcAACAdQQhqIR0gAEEIaiEAIB9BeGoiHw0ACwsgA0EAKAKcjgFqIgBBeWopAwAhCiAAKQMJIRMgACkDGSEUIAApAykhCyAAKQMBIQwgACkDESEOIAApAyEhESACKQMAIRUgAikDECEWIAIpAyAhFyACKQMIIRggAikDQCENIAIpA0ghDyACKQMYIRkgAikDUCESIAIpA1ghCCACKQMoIRogAikDYCEQIAIpA2ghCSACIAYgAikDcCIbfCAAKQMxIAIpA3giBoUiHEIgiCAcQv////8Pg358NwM4IBogEHwgESAJhSIRQiCIIBFC/////w+DfnwhESAZIBJ8IA4gCIUiDkIgiCAOQv////8Pg358IQ4gGCANfCAMIA+FIgxCIIggDEL/////D4N+fCEMIAYgCyAbhSILQiCIIAtC/////w+DfiAFfHwhCyAJIBcgFCAQhSIFQiCIIAVC/////w+Dfnx8IRAgCCAWIBMgEoUiBUIgiCAFQv////8Pg358fCESIA8gFSAKIA2FIgVCIIggBUL/////D4N+fHwhCAsgAykDQyACKQM4hSIFQv////8PgyIGIAMpAzsgC4UiC0IgiCINfiIPQv////8PgyAFQiCIIgUgC0L/////D4MiC358IAYgC34iBkIgiHwiC0IghiAGQv////8Pg4QgD0IgiCAFIA1+fCALQiCIfIUgAykDMyARhSIFQv////8PgyIGIAMpAysgEIUiC0IgiCINfiIPQv////8PgyAFQiCIIgUgC0L/////D4MiC358IAYgC34iBkIgiHwiC0IghiAGQv////8Pg4QgD0IgiCAFIA1+fCALQiCIfIUgAykDIyAOhSIFQv////8PgyIGIAMpAxsgEoUiC0IgiCINfiIPQv////8PgyAFQiCIIgUgC0L/////D4MiC358IAYgC34iBkIgiHwiC0IghiAGQv////8Pg4QgD0IgiCAFIA1+fCALQiCIfIUgAykDEyAMhSIFQv////8PgyIGIAMpAwsgCIUiC0IgiCINfiIPQv////8PgyAFQiCIIgUgC0L/////D4MiC358IAYgC34iBkIgiHwiC0IghiAGQv////8Pg4QgD0IgiCAFIA1+fCALQiCIfIUgBEKHla+vmLbem55/fnx8fHwiBEIliCAEhUL5893xmfKZqxZ+IgRCIIggBIUhBAwBCyAEpyEAAkBBACkDoI4BIgRQDQACQCAAQRBLDQAgAEGACCAEEAUhBAwCCwJAIABBgAFLDQAgAEGACCAEEAYhBAwCCyAAQYAIIAQQByEEDAELAkAgAEEQSw0AIAAgA0IAEAUhBAwBCwJAIABBgAFLDQAgACADQgAQBiEEDAELIAAgA0IAEAchBAtBACAEQjiGIARCgP4Dg0IohoQgBEKAgPwHg0IYhiAEQoCAgPgPg0IIhoSEIARCCIhCgICA+A+DIARCGIhCgID8B4OEIARCKIhCgP4DgyAEQjiIhISENwOACiABJAALBgBBgIoBCwIACwvMAQEAQYAIC8QBuP5sOSOkS758AYEs9yGtHN7UbemDkJfbckCkpLezZx/LeeZOzMDleIJa0H3M/3IhuAhGdPdDJI7gNZDmgTomTDwoUruRwwDLiNBlixtTLqNxZEiXog35TjgZ70ap3qzYqPp2P+OcND/53LvHxwtPHYpR4EvNtFkxyJ9+ydl4c2TqxayDNNPrw8WBoP/6E2PrFw3dUbfw2knTFlUmKdRonisWvlh9R6H8j/i40XrQMc5FyzqPlRYEKK/X+8q7S0B+QAIAAA==",EV="5a2fbdbb",CD={name:SV,data:kV,hash:EV};let QV=new a,hu=null,Yg=new Uint8Array(8);function Md(c){return!Number.isInteger(c)||c<0||c>4294967295?new Error("Seed must be given as two valid 32-bit long unsigned integers (lo + high)."):null}function vy(c,f,y){let S=new DataView(c);S.setUint32(0,f,!0),S.setUint32(4,y,!0)}function wV(c,f=0,y=0){if(Md(f))return Promise.reject(Md(f));if(Md(y))return Promise.reject(Md(y));if(hu===null)return w(QV,CD,8).then(S=>(hu=S,vy(Yg.buffer,f,y),hu.writeMemory(Yg),hu.calculate(c)));try{vy(Yg.buffer,f,y),hu.writeMemory(Yg);let S=hu.calculate(c);return Promise.resolve(S)}catch(S){return Promise.reject(S)}}function bV(c=0,f=0){return Md(c)?Promise.reject(Md(c)):Md(f)?Promise.reject(Md(f)):k(CD,8).then(y=>{let S=new Uint8Array(8);vy(S.buffer,c,f),y.writeMemory(S),y.init();let U={init:()=>(y.writeMemory(S),y.init(),U),update:G=>(y.update(G),U),digest:G=>y.digest(G),save:()=>y.save(),load:G=>(y.load(G),U),blockSize:512,digestSize:8};return U})}var RV="xxhash128",PV="AGFzbQEAAAABKwdgAAF/YAR/f39/AGAHf39/f39/fwBgA39/fgF+YAR/f39+AGAAAGABfwADDQwAAQIDBAQEBQYFAAUFBAEBAgIGDgJ/AUHAjgULfwBBwAkLB3AIBm1lbW9yeQIADkhhc2hfR2V0QnVmZmVyAAAJSGFzaF9Jbml0AAcLSGFzaF9VcGRhdGUACApIYXNoX0ZpbmFsAAkNSGFzaF9HZXRTdGF0ZQAKDkhhc2hfQ2FsY3VsYXRlAAsKU1RBVEVfU0laRQMBCqBNDAUAQYAKC+QDAw9+AX8BfgJAIANFDQAgACkDMCEEIAApAzghBSAAKQMgIQYgACkDKCEHIAApAxAhCCAAKQMYIQkgACkDACEKIAApAwghCwNAIAUgAUEwaikDACIMfCACQThqKQMAIAFBOGopAwAiDYUiBUIgiCAFQv////8Pg358IQUgByABQSBqKQMAIg58IAJBKGopAwAgAUEoaikDACIPhSIHQiCIIAdC/////w+DfnwhByAJIAFBEGopAwAiEHwgAkEYaikDACABQRhqKQMAIhGFIglCIIggCUL/////D4N+fCEJIAsgASkDACISfCACQQhqIhMpAwAgAUEIaikDACIUhSILQiCIIAtC/////w+DfnwhCyACQTBqKQMAIAyFIgxCIIggDEL/////D4N+IAR8IA18IQQgAkEgaikDACAOhSIMQiCIIAxC/////w+DfiAGfCAPfCEGIAJBEGopAwAgEIUiDEIgiCAMQv////8Pg34gCHwgEXwhCCACKQMAIBKFIgxCIIggDEL/////D4N+IAp8IBR8IQogAUHAAGohASATIQIgA0F/aiIDDQALIAAgCTcDGCAAIAo3AwAgACALNwMIIAAgBzcDKCAAIAg3AxAgACAFNwM4IAAgBjcDICAAIAQ3AzALC94CAgF/AX4CQCAEIAIgASgCACIHayICSQ0AIAAgAyAFIAdBA3RqIAIQASAAIAUgBmoiBykDACAAKQMAIghCL4iFIAiFQrHz3fEJfjcDACAAIAcpAwggACkDCCIIQi+IhSAIhUKx893xCX43AwggACAHKQMQIAApAxAiCEIviIUgCIVCsfPd8Ql+NwMQIAAgBykDGCAAKQMYIghCL4iFIAiFQrHz3fEJfjcDGCAAIAcpAyAgACkDICIIQi+IhSAIhUKx893xCX43AyAgACAHKQMoIAApAygiCEIviIUgCIVCsfPd8Ql+NwMoIAAgBykDMCAAKQMwIghCL4iFIAiFQrHz3fEJfjcDMCAAIAcpAzggACkDOCIIQi+IhSAIhUKx893xCX43AzggACADIAJBBnRqIAUgBCACayIHEAEgASAHNgIADwsgACADIAUgB0EDdGogBBABIAEgByAEajYCAAvtAwEFfiABKQM4IAApAziFIgNC/////w+DIgQgASkDMCAAKQMwhSIFQiCIIgZ+IgdC/////w+DIANCIIgiAyAFQv////8PgyIFfnwgBCAFfiIEQiCIfCIFQiCGIARC/////w+DhCAHQiCIIAMgBn58IAVCIIh8hSABKQMoIAApAyiFIgNC/////w+DIgQgASkDICAAKQMghSIFQiCIIgZ+IgdC/////w+DIANCIIgiAyAFQv////8PgyIFfnwgBCAFfiIEQiCIfCIFQiCGIARC/////w+DhCAHQiCIIAMgBn58IAVCIIh8hSABKQMYIAApAxiFIgNC/////w+DIgQgASkDECAAKQMQhSIFQiCIIgZ+IgdC/////w+DIANCIIgiAyAFQv////8PgyIFfnwgBCAFfiIEQiCIfCIFQiCGIARC/////w+DhCAHQiCIIAMgBn58IAVCIIh8hSABKQMIIAApAwiFIgNC/////w+DIgQgASkDACAAKQMAhSIFQiCIIgZ+IgdC/////w+DIANCIIgiAyAFQv////8PgyIFfnwgBCAFfiIEQiCIfCIFQiCGIARC/////w+DhCAHQiCIIAMgBn58IAVCIIh8hSACfHx8fCICQiWIIAKFQvnz3fGZ8pmrFn4iAkIgiCAChQu6CAIFfgN/AkAgAUEJSQ0AIAAgAUH4iwFqKQMAIgQgAikDOCACKQMwhSADfIUiBUL/////D4NC95Svrwh+IAVCgICAgHCDfEEAKQOAjAEgAikDKCACKQMghSADfYUgBIUiA0IgiCIEQrHz3fEJfnwgBEKHla+vCH4iBEIgiHwgBEL/////D4MgA0L/////D4MiA0Kx893xCX58IANCh5Wvrwh+IgRCIIh8IgVCIIh8IgNCOIYgA0KA/gODQiiGhCADQoCA/AeDQhiGIANCgICA+A+DQgiGhIQgA0IIiEKAgID4D4MgA0IYiEKAgPwHg4QgA0IoiEKA/gODIANCOIiEhIQgBEL/////D4MgAUF/aq1CNoaEIAVCIIZ8hSIEQiCIIgVCz9bTvgJ+IgZC/////w+DIARC/////w+DIgRCvdzKlQx+fCAEQs/W074CfiIEQiCIfCIHQiCGIghCJYggCCAEQv////8Pg4SFQvnz3fGZ8pmrFn4iBEIgiCAEhTcDACAAIAVCvdzKlQx+IANCz9bTvtLHq9lCfnwgBkIgiHwgB0IgiHwiA0IliCADhUL5893xmfKZqxZ+IgNCIIggA4U3AwgPCwJAIAFBBEkNACAAIAIpAxggAikDEIUgA6ciAkEYdCACQYD+A3FBCHRyIAJBCHZBgP4DcSACQRh2cnKtQiCGIAOFfCABQfyLAWo1AgBCIIZBADUCgIwBhIUiA0IgiCIEIAFBAnRBh5Wvr3hqrSIFfiIGQiCIIARCsfPd8Ql+fCAGQv////8PgyADQv////8PgyIDQrHz3fEJfnwgAyAFfiIDQiCIfCIEQiCIfCAEQiCGIANC/////w+DhCIEQgGGfCIDQiWIIAOFQvnz3fGZ8pmrFn4iBUIgiCAFhTcDCCAAIANCA4ggBIUiA0IjiCADhUKlvuP00YyH2Z9/fiIDQhyIIAOFNwMADwsCQCABRQ0AIAAgAigCBCACKAIAc60gA3wiBEIhiEEALQCAjAFBEHQgAUEIdHIiCSABQQF2QYCMAWotAABBGHRyIgogAUH/iwFqLQAAIgFyIguthSAEhULP1tO+0ser2UJ+IgRCHYggBIVC+fPd8Zn2masWfiIEQiCIIASFNwMAIAAgAigCDCACKAIIc60gA30iA0IhiCABQRh0IAtBgP4DcUEIdHIgCUEIdkGA/gNxIApBGHZyckENd62FIAOFQs/W077Sx6vZQn4iA0IdiCADhUL5893xmfaZqxZ+IgNCIIggA4U3AwgPCyAAIAIpA1AgAikDWIUgA4UiBEIhiCAEhULP1tO+0ser2UJ+IgRCHYggBIVC+fPd8Zn2masWfiIEQiCIIASFNwMIIAAgAikDQCACKQNIhSADhSIDQiGIIAOFQs/W077Sx6vZQn4iA0IdiCADhUL5893xmfaZqxZ+IgNCIIggA4U3AwALwwoBCn4gAa0iBEKHla+vmLbem55/fiEFAkACQCABQSFPDQBCACEGDAELQgAhBwJAIAFBwQBJDQBCACEHAkAgAUHhAEkNACACQfgAaikDACADfSABQciLAWopAwAiCIUiB0L/////D4MiCSACKQNwIAN8IAFBwIsBaikDACIKhSILQiCIIgx+Ig1CIIggB0IgiCIHIAx+fCANQv////8PgyAHIAtC/////w+DIgt+fCAJIAt+IgdCIIh8IglCIIh8QQApA7iMASILQQApA7CMASIMfIUgCUIghiAHQv////8Pg4SFIQcgAkHoAGopAwAgA30gC4UiCUL/////D4MiCyACKQNgIAN8IAyFIgxCIIgiDX4iBkL/////D4MgCUIgiCIJIAxC/////w+DIgx+fCALIAx+IgtCIIh8IgxCIIYgC0L/////D4OEIAZCIIggCSANfnwgDEIgiHyFIAV8IAggCnyFIQULIAJB2ABqKQMAIAN9IAFB2IsBaikDACIIhSIJQv////8PgyIKIAIpA1AgA3wgAUHQiwFqKQMAIguFIgxCIIgiDX4iBkL/////D4MgCUIgiCIJIAxC/////w+DIgx+fCAKIAx+IgpCIIh8IgxCIIYgCkL/////D4OEIAZCIIggCSANfnwgDEIgiHyFIAd8QQApA6iMASIJQQApA6CMASIKfIUhByACQcgAaikDACADfSAJhSIJQv////8PgyIMIAIpA0AgA3wgCoUiCkIgiCINfiIGQv////8PgyAJQiCIIgkgCkL/////D4MiCn58IAwgCn4iCkIgiHwiDEIghiAKQv////8Pg4QgBkIgiCAJIA1+fCAMQiCIfIUgBXwgCCALfIUhBQsgAkE4aikDACADfSABQeiLAWopAwAiCIUiCUL/////D4MiCiACKQMwIAN8IAFB4IsBaikDACILhSIMQiCIIg1+IgZC/////w+DIAlCIIgiCSAMQv////8PgyIMfnwgCiAMfiIKQiCIfCIMQiCGIApC/////w+DhCAGQiCIIAkgDX58IAxCIIh8hSAHfEEAKQOYjAEiB0EAKQOQjAEiCXyFIQYgAkEoaikDACADfSAHhSIHQv////8PgyIKIAIpAyAgA3wgCYUiCUIgiCIMfiINQv////8PgyAHQiCIIgcgCUL/////D4MiCX58IAogCX4iCUIgiHwiCkIghiAJQv////8Pg4QgDUIgiCAHIAx+fCAKQiCIfIUgBXwgCCALfIUhBQsgACACQRhqKQMAIAN9IAFB+IsBaikDACIHhSIIQv////8PgyIJIAIpAxAgA3wgAUHwiwFqKQMAIgqFIgtCIIgiDH4iDUL/////D4MgCEIgiCIIIAtC/////w+DIgt+fCAJIAt+IglCIIh8IgtCIIYgCUL/////D4OEIA1CIIggCCAMfnwgC0IgiHyFIAZ8QQApA4iMASIIQQApA4CMASIJfIUiCyACQQhqKQMAIAN9IAiFIghC/////w+DIgwgAikDACADfCAJhSIJQiCIIg1+IgZC/////w+DIAhCIIgiCCAJQv////8PgyIJfnwgDCAJfiIJQiCIfCIMQiCGIAlC/////w+DhCAGQiCIIAggDX58IAxCIIh8hSAFfCAHIAp8hSIFfCIHQiWIIAeFQvnz3fGZ8pmrFn4iB0IgiCAHhTcDACAAQgAgBUKHla+vmLbem55/fiAEIAN9Qs/W077Sx6vZQn58IAtC49zKlfzO8vWFf358IgNCJYggA4VC+fPd8ZnymasWfiIDQiCIIAOFfTcDCAuhDwMBfxR+An9BACEEIAJB+ABqKQMAIAN9QQApA/iMASIFhSIGQv////8PgyIHIAIpA3AgA3xBACkD8IwBIgiFIglCIIgiCn4iC0L/////D4MgBkIgiCIGIAlC/////w+DIgl+fCAHIAl+IgdCIIh8IglCIIYgB0L/////D4OEIAtCIIggBiAKfnwgCUIgiHyFIAJB2ABqKQMAIAN9QQApA9iMASIHhSIGQv////8PgyIJIAIpA1AgA3xBACkD0IwBIgqFIgtCIIgiDH4iDUL/////D4MgBkIgiCIGIAtC/////w+DIgt+fCAJIAt+IglCIIh8IgtCIIYgCUL/////D4OEIA1CIIggBiAMfnwgC0IgiHyFIAJBOGopAwAgA31BACkDuIwBIgmFIgZC/////w+DIgsgAikDMCADfEEAKQOwjAEiDIUiDUIgiCIOfiIPQv////8PgyAGQiCIIgYgDUL/////D4MiDX58IAsgDX4iC0IgiHwiDUIghiALQv////8Pg4QgD0IgiCAGIA5+fCANQiCIfIUgAkEYaikDACADfUEAKQOYjAEiC4UiBkL/////D4MiDSACKQMQIAN8QQApA5CMASIOhSIPQiCIIhB+IhFC/////w+DIAZCIIgiBiAPQv////8PgyIPfnwgDSAPfiINQiCIfCIPQiCGIA1C/////w+DhCARQiCIIAYgEH58IA9CIIh8hUEAKQOIjAEiDUEAKQOAjAEiD3yFfEEAKQOojAEiEEEAKQOgjAEiEXyFfEEAKQPIjAEiEkEAKQPAjAEiE3yFfEEAKQPojAEiFEEAKQPgjAEiFXyFIgZCJYggBoVC+fPd8ZnymasWfiIGQiCIIAaFIQYgAkHoAGopAwAgA30gFIUiFEL/////D4MiFiACKQNgIAN8IBWFIhVCIIgiF34iGEL/////D4MgFEIgiCIUIBVC/////w+DIhV+fCAWIBV+IhVCIIh8IhZCIIYgFUL/////D4OEIBhCIIggFCAXfnwgFkIgiHyFIAJByABqKQMAIAN9IBKFIhJC/////w+DIhQgAikDQCADfCAThSITQiCIIhV+IhZC/////w+DIBJCIIgiEiATQv////8PgyITfnwgFCATfiITQiCIfCIUQiCGIBNC/////w+DhCAWQiCIIBIgFX58IBRCIIh8hSACQShqKQMAIAN9IBCFIhBC/////w+DIhIgAikDICADfCARhSIRQiCIIhN+IhRC/////w+DIBBCIIgiECARQv////8PgyIRfnwgEiARfiIRQiCIfCISQiCGIBFC/////w+DhCAUQiCIIBAgE358IBJCIIh8hSACQQhqKQMAIAN9IA2FIg1C/////w+DIhAgAikDACADfCAPhSIPQiCIIhF+IhJC/////w+DIA1CIIgiDSAPQv////8PgyIPfnwgECAPfiIPQiCIfCIQQiCGIA9C/////w+DhCASQiCIIA0gEX58IBBCIIh8hSABrSIPQoeVr6+Ytt6bnn9+fCALIA58hXwgCSAMfIV8IAcgCnyFfCAFIAh8hSIFQiWIIAWFQvnz3fGZ8pmrFn4iBUIgiCAFhSEFAkAgAUGgAUgNACABQQV2QXxqIRkDQCACIARqIhpBG2opAwAgA30gBEGYjQFqKQMAIgeFIghC/////w+DIgkgGkETaikDACADfCAEQZCNAWopAwAiCoUiC0IgiCIMfiINQv////8PgyAIQiCIIgggC0L/////D4MiC358IAkgC34iCUIgiHwiC0IghiAJQv////8Pg4QgDUIgiCAIIAx+fCALQiCIfIUgBnwgBEGIjQFqKQMAIgggBEGAjQFqKQMAIgl8hSEGIBpBC2opAwAgA30gCIUiCEL/////D4MiCyAaQQNqKQMAIAN8IAmFIglCIIgiDH4iDUL/////D4MgCEIgiCIIIAlC/////w+DIgl+fCALIAl+IglCIIh8IgtCIIYgCUL/////D4OEIA1CIIggCCAMfnwgC0IgiHyFIAV8IAcgCnyFIQUgBEEgaiEEIBlBf2oiGQ0ACwsgACACQf8AaikDACADfCABQeiLAWopAwAiB4UiCEL/////D4MiCSACKQN3IAN9IAFB4IsBaikDACIKhSILQiCIIgx+Ig1C/////w+DIAhCIIgiCCALQv////8PgyILfnwgCSALfiIJQiCIfCILQiCGIAlC/////w+DhCANQiCIIAggDH58IAtCIIh8hSAGfCABQfiLAWopAwAiBiABQfCLAWopAwAiCHyFIgkgAkHvAGopAwAgA3wgBoUiBkL/////D4MiCyACKQNnIAN9IAiFIghCIIgiDH4iDUL/////D4MgBkIgiCIGIAhC/////w+DIgh+fCALIAh+IghCIIh8IgtCIIYgCEL/////D4OEIA1CIIggBiAMfnwgC0IgiHyFIAV8IAcgCnyFIgZ8IgVCJYggBYVC+fPd8ZnymasWfiIFQiCIIAWFNwMAIABCACAGQoeVr6+Ytt6bnn9+IA8gA31Cz9bTvtLHq9lCfnwgCULj3MqV/M7y9YV/fnwiA0IliCADhUL5893xmfKZqxZ+IgNCIIggA4V9NwMIC98FAgF+AX8CQAJAQQApA4AKIgBQRQ0AQYAIIQFCACEADAELAkBBACkDoI4BIABSDQBBACEBDAELQQAhAUEAQq+v79e895Kg/gAgAH03A/iLAUEAIABCxZbr+djShYIofDcD8IsBQQBCj/Hjja2P9JhOIAB9NwPoiwFBACAAQqus+MXV79HQfHw3A+CLAUEAQtOt1LKShbW0nn8gAH03A9iLAUEAIABCl5r0jvWWvO3JAHw3A9CLAUEAQsWDgv2v/8SxayAAfTcDyIsBQQAgAELqi7OdyOb09UN8NwPAiwFBAELIv/rLnJveueQAIAB9NwO4iwFBACAAQoqjgd/Ume2sMXw3A7CLAUEAQvm57738+MKnHSAAfTcDqIsBQQAgAEKo9dv7s5ynmj98NwOgiwFBAEK4sry3lNW31lggAH03A5iLAUEAIABC8cihuqm0w/zOAHw3A5CLAUEAQoihl9u445SXo38gAH03A4iL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AkHAAGogDGohC0GAjAEhAAJAAkACQCAHQQhJDQACQCAHQThqQQN2QQFqQQdxIg0NAAwCCyANQQN0IQ5BgIwBIQADQCALIAApAwA3AwAgC0EIaiELIABBCGohACANQX9qIg0NAAsgByAOayEHCyAHRQ0BAkACQCAHQQdxIg4NACAHIQ0MAQsgB0F4cSENA0AgCyAALQAAOgAAIAtBAWohCyAAQQFqIQAgDkF/aiIODQALCyAHQQhJDQELA0AgCyAAKQAANwAAIAtBCGohCyAAQQhqIQAgDUF4aiINDQALCyACIAIpAwggAikDQCIIfCADQQAoApyOAWoiACkDASACKQNIIgmFIgpCIIggCkL/////D4N+fDcDCCACIAIpAxggAikDUCIKfCAAKQMRIAIpA1giEIUiEUIgiCARQv////8Pg358NwMYIAIgECAKIAApAwmFIgpCIIggCkL/////D4N+IAIpAxB8fDcDECACIAkgCCAAQXlqKQMAhSIIQiCIIAhC/////w+DfiACKQMAfHw3AwAgACkDGSEIIAIpAyAhCSACIAIpAyggAikDYCIKfCAAKQMhIAIpA2giEIUiEUIgiCARQv////8Pg358NwMoIAIgECAJIAggCoUiCEIgiCAIQv////8Pg358fDcDICACIAYgAikDcCIIfCAAKQMxIAIpA3giBoUiCUIgiCAJQv////8Pg358NwM4IAIgBiAIIAApAymFIghCIIggCEL/////D4N+IAV8fDcDMAsgAiACIANBC2ogBEKHla+vmLbem55/fhADNwNAIAIgAiADQQAoApyOAWpBdWogBELP1tO+0ser2UJ+Qn+FEAM3A0gMAQsgBKchAAJAQQApA6COASIEUA0AAkAgAEEQSw0AIAJBwABqIABBgAggBBAEDAILAkAgAEGAAUsNACACQcAAaiAAQYAIIAQQBQwCCyACQcAAaiAAQYAIIAQQBgwBCwJAIABBEEsNACACQcAAaiAAIANCABAEDAELAkAgAEGAAUsNACACQcAAaiAAIANCABAFDAELIAJBwABqIAAgA0IAEAYLQQAgAikDcDcDuApBACACKQNgNwOoCkEAIAIpA1A3A5gKQQAgAkH4AGopAwA3A8AKQQAgAkHoAGopAwA3A7AKQQAgAkHYAGopAwA3A6AKQQAgAikDSCIEQjiGIARCgP4Dg0IohoQgBEKAgPwHg0IYhiAEQoCAgPgPg0IIhoSEIARCCIhCgICA+A+DIARCGIhCgID8B4OEIARCKIhCgP4DgyAEQjiIhISEIgQ3A4AKQQAgBDcDkApBACACKQNAIgRCOIYgBEKA/gODQiiGhCAEQoCA/AeDQhiGIARCgICA+A+DQgiGhIQgBEIIiEKAgID4D4MgBEIYiEKAgPwHg4QgBEIoiEKA/gODIARCOIiEhIQ3A4gKIAEkAAsGAEGAigELAgALC8wBAQBBgAgLxAG4/mw5I6RLvnwBgSz3Ia0c3tRt6YOQl9tyQKSkt7NnH8t55k7MwOV4glrQfcz/ciG4CEZ090MkjuA1kOaBOiZMPChSu5HDAMuI0GWLG1Muo3FkSJeiDflOOBnvRqnerNio+nY/45w0P/ncu8fHC08dilHgS820WTHIn37J2XhzZOrFrIM00+vDxYGg//oTY+sXDd1Rt/DaSdMWVSYp1GieKxa+WH1HofyP+LjRetAxzkXLOo+VFgQor9f7yrtLQH5AAgAA",NV="b9ab74e2",SD={name:RV,data:PV,hash:NV};let vV=new a,yu=null,zg=new Uint8Array(8);function _d(c){return!Number.isInteger(c)||c<0||c>4294967295?new Error("Seed must be given as two valid 32-bit long unsigned integers (lo + high)."):null}function Oy(c,f,y){let S=new DataView(c);S.setUint32(0,f,!0),S.setUint32(4,y,!0)}function OV(c,f=0,y=0){if(_d(f))return Promise.reject(_d(f));if(_d(y))return Promise.reject(_d(y));if(yu===null)return w(vV,SD,16).then(S=>(yu=S,Oy(zg.buffer,f,y),yu.writeMemory(zg),yu.calculate(c)));try{Oy(zg.buffer,f,y),yu.writeMemory(zg);let S=yu.calculate(c);return Promise.resolve(S)}catch(S){return Promise.reject(S)}}function DV(c=0,f=0){return _d(c)?Promise.reject(_d(c)):_d(f)?Promise.reject(_d(f)):k(SD,16).then(y=>{let S=new Uint8Array(8);Oy(S.buffer,c,f),y.writeMemory(S),y.init();let U={init:()=>(y.writeMemory(S),y.init(),U),update:G=>(y.update(G),U),digest:G=>y.digest(G),save:()=>y.save(),load:G=>(y.load(G),U),blockSize:512,digestSize:16};return U})}var UV="ripemd160",xV="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",TV="6abbce74",kD={name:UV,data:xV,hash:TV};let JV=new a,Zg=null;function FV(c){if(Zg===null)return w(JV,kD,20).then(f=>(Zg=f,Zg.calculate(c)));try{let f=Zg.calculate(c);return Promise.resolve(f)}catch(f){return Promise.reject(f)}}function qV(){return k(kD,20).then(c=>{c.init();let f={init:()=>(c.init(),f),update:y=>(c.update(y),f),digest:y=>c.digest(y),save:()=>c.save(),load:y=>(c.load(y),f),blockSize:64,digestSize:20};return f})}function HV(c,f){let{blockSize:y}=c,S=R(f);if(S.length>y){c.update(S);let U=c.digest("binary");return c.init(),U}return new Uint8Array(S.buffer,S.byteOffset,S.length)}function MV(c,f){c.init();let{blockSize:y}=c,S=HV(c,f),U=new Uint8Array(y);U.set(S);let G=new Uint8Array(y);for(let ye=0;ye<y;ye++){let En=U[ye];G[ye]=En^92,U[ye]=En^54}c.update(U);let Ae={init:()=>(c.init(),c.update(U),Ae),update:ye=>(c.update(ye),Ae),digest:(ye=>{let En=c.digest("binary");return c.init(),c.update(G),c.update(En),c.digest(ye)}),save:()=>{throw new Error("save() not supported")},load:()=>{throw new Error("load() not supported")},blockSize:c.blockSize,digestSize:c.digestSize};return Ae}function ED(c,f){if(!c||!c.then)throw new Error('Invalid hash function is provided! Usage: createHMAC(createMD5(), "key").');return c.then(y=>MV(y,f))}function _V(c,f,y,S,U){return o(this,void 0,void 0,function*(){let G=new Uint8Array(S),Ae=new Uint8Array(f.length+4),ye=new DataView(Ae.buffer),En=R(f),vr=new Uint8Array(En.buffer,En.byteOffset,En.length);Ae.set(vr);let qr=0,ti=c.digestSize,Or=Math.ceil(S/ti),ia=null,Fi=null;for(let Gd=1;Gd<=Or;Gd++){ye.setUint32(f.length,Gd),c.init(),c.update(Ae),ia=c.digest("binary"),Fi=ia.slice();for(let Ma=1;Ma<y;Ma++){c.init(),c.update(Fi),Fi=c.digest("binary");for(let Vd=0;Vd<ti;Vd++)ia[Vd]^=Fi[Vd]}G.set(ia.subarray(0,S-qr),qr),qr+=ti}if(U==="binary")return G;let yl=new Uint8Array(S*2);return D(yl,G,S)})}let GV=c=>{if(!c||typeof c!="object")throw new Error("Invalid options parameter. It requires an object.");if(!c.hashFunction||!c.hashFunction.then)throw new Error('Invalid hash function is provided! Usage: pbkdf2("password", "salt", 1000, 32, createSHA1()).');if(!Number.isInteger(c.iterations)||c.iterations<1)throw new Error("Iterations should be a positive number");if(!Number.isInteger(c.hashLength)||c.hashLength<1)throw new Error("Hash length should be a positive number");if(c.outputType===void 0&&(c.outputType="hex"),!["hex","binary"].includes(c.outputType))throw new Error(`Insupported output type ${c.outputType}. Valid values: ['hex', 'binary']`)};function Dy(c){return o(this,void 0,void 0,function*(){GV(c);let f=yield ED(c.hashFunction,c.password);return _V(f,c.salt,c.iterations,c.hashLength,c.outputType)})}var VV="scrypt",KV="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cyICajYCOCAAIAAoAjwgAiAKakESdyAGc2o2AjwLvxIDFX8Bfg5/AkAgAkUNACAAQQd0IgNBQGoiBEEAKAKACCIFIAMgAmwiBmogAyABbGoiByADaiIIaiEJIAAgAkEHdCIKIAFBB3RqIgtsIQwgACALQYABamwhDSAAQQV0IgtBASALQQFLGyILQWBxIQ4gC0EBcSEPIAdBeGohECAHQXBqIREgB0FoaiESIAdBYGohEyAHQVhqIRQgB0FQaiEVIAdBSGohFiAHQUBqIRcgAa1Cf3whGCAEIAdqIRkgByAAQQh0IhpqIRsgACAKQYABamwhHCALQQRJIR1BACEeQQAhHwNAQQAoAoAIIiAgAyAfbGohIQJAIABFDQBBACEiAkAgHQ0AICAgHmohI0EAIQtBACEiA0AgByALaiIEICMgC2oiJCgCADYCACAEQQRqICRBBGooAgA2AgAgBEEIaiAkQQhqKAIANgIAIARBDGogJEEMaigCADYCACALQRBqIQsgDiAiQQRqIiJHDQALCyAPRQ0AIAcgIkECdCILaiAhIAtqKAIANgIACwJAIAFFDQBBACElIBwhIyAGISYDQCAFISQgACEiAkACQCAADQAgGyAXKQMANwMAIBsgFikDADcDCCAbIBUpAwA3AxAgGyAUKQMANwMYIBsgEykDADcDICAbIBIpAwA3AyggGyARKQMANwMwIBsgECkDADcDOAwBCwNAICQgJmoiCyAkIAxqIgQpAwA3AwAgC0EIaiAEQQhqKQMANwMAIAtBEGogBEEQaikDADcDACALQRhqIARBGGopAwA3AwAgC0EgaiAEQSBqKQMANwMAIAtBKGogBEEoaikDADcDACALQTBqIARBMGopAwA3AwAgC0E4aiAEQThqKQMANwMAIAtBwABqIARBwABqKQMANwMAIAtByABqIARByABqKQMANwMAIAtB0ABqIARB0ABqKQMANwMAIAtB2ABqIARB2ABqKQMANwMAIAtB4ABqIARB4ABqKQMANwMAIAtB6ABqIARB6ABqKQMANwMAIAtB8ABqIARB8ABqKQMANwMAIAtB+ABqIARB+ABqKQMANwMAICRBgAFqISQgIkF/aiIiDQALIAcgCCAbIAAQAiAFISQgACEiA0AgJCAjaiILICQgDWoiBCkDADcDACALQQhqIARBCGopAwA3AwAgC0EQaiAEQRBqKQMANwMAIAtBGGogBEEYaikDADcDACALQSBqIARBIGopAwA3AwAgC0EoaiAEQShqKQMANwMAIAtBMGogBEEwaikDADcDACALQThqIARBOGopAwA3AwAgC0HAAGogBEHAAGopAwA3AwAgC0HIAGogBEHIAGopAwA3AwAgC0HQAGogBEHQAGopAwA3AwAgC0HYAGogBEHYAGopAwA3AwAgC0HgAGogBEHgAGopAwA3AwAgC0HoAGogBEHoAGopAwA3AwAgC0HwAGogBEHwAGopAwA3AwAgC0H4AGogBEH4AGopAwA3AwAgJEGAAWohJCAiQX9qIiINAAsLIAggByAbIAAQAiAjIBpqISMgJiAaaiEmICVBAmoiJSABSQ0AC0EAISUDQAJAAkAgAA0AIBsgFykDADcDACAbIBYpAwA3AwggGyAVKQMANwMQIBsgFCkDADcDGCAbIBMpAwA3AyAgGyASKQMANwMoIBsgESkDADcDMCAbIBApAwA3AzgMAQsgACAKIBkpAgAgGIOnQQd0amwhJiAFISQgACEiA0AgJCAMaiILIAspAwAgJCAmaiIEKQMAhTcDACALQQhqIiMgIykDACAEQQhqKQMAhTcDACALQRBqIiMgIykDACAEQRBqKQMAhTcDACALQRhqIiMgIykDACAEQRhqKQMAhTcDACALQSBqIiMgIykDACAEQSBqKQMAhTcDACALQShqIiMgIykDACAEQShqKQMAhTcDACALQTBqIiMgIykDACAEQTBqKQMAhTcDACALQThqIiMgIykDACAEQThqKQMAhTcDACALQcAAaiIjICMpAwAgBEHAAGopAwCFNwMAIAtByABqIiMgIykDACAEQcgAaikDAIU3AwAgC0HQAGoiIyAjKQMAIARB0ABqKQMAhTcDACALQdgAaiIjICMpAwAgBEHYAGopAwCFNwMAIAtB4ABqIiMgIykDACAEQeAAaikDAIU3AwAgC0HoAGoiIyAjKQMAIARB6ABqKQMAhTcDACALQfAAaiIjICMpAwAgBEHwAGopAwCFNwMAIAtB+ABqIgsgCykDACAEQfgAaikDAIU3AwAgJEGAAWohJCAiQX9qIiINAAsgByAIIBsgABACIAAgCiAJKQIAIBiDp0EHdGpsISYgBSEkIAAhIgNAICQgDWoiCyALKQMAICQgJmoiBCkDAIU3AwAgC0EIaiIjICMpAwAgBEEIaikDAIU3AwAgC0EQaiIjICMpAwAgBEEQaikDAIU3AwAgC0EYaiIjICMpAwAgBEEYaikDAIU3AwAgC0EgaiIjICMpAwAgBEEgaikDAIU3AwAgC0EoaiIjICMpAwAgBEEoaikDAIU3AwAgC0EwaiIjICMpAwAgBEEwaikDAIU3AwAgC0E4aiIjICMpAwAgBEE4aikDAIU3AwAgC0HAAGoiIyAjKQMAIARBwABqKQMAhTcDACALQcgAaiIjICMpAwAgBEHIAGopAwCFNwMAIAtB0ABqIiMgIykDACAEQdAAaikDAIU3AwAgC0HYAGoiIyAjKQMAIARB2ABqKQMAhTcDACALQeAAaiIjICMpAwAgBEHgAGopAwCFNwMAIAtB6ABqIiMgIykDACAEQegAaikDAIU3AwAgC0HwAGoiIyAjKQMAIARB8ABqKQMAhTcDACALQfgAaiILIAspAwAgBEH4AGopAwCFNwMAICRBgAFqISQgIkF/aiIiDQALCyAIIAcgGyAAEAIgJUECaiIlIAFJDQALCwJAIABFDQBBACEiAkAgHQ0AICAgHmohI0EAIQtBACEiA0AgIyALaiIEIAcgC2oiJCgCADYCACAEQQRqICRBBGooAgA2AgAgBEEIaiAkQQhqKAIANgIAIARBDGogJEEMaigCADYCACALQRBqIQsgDiAiQQRqIiJHDQALCyAPRQ0AICEgIkECdCILaiAHIAtqKAIANgIACyAeIANqIR4gH0EBaiIfIAJHDQALCws=",WV="b32721f8",LV={name:VV,data:KV,hash:WV};function YV(c){return o(this,void 0,void 0,function*(){let{costFactor:f,blockSize:y,parallelism:S,hashLength:U}=c,G=yD(),Ae=yield Dy({password:c.password,salt:c.salt,iterations:1,hashLength:128*y*S,hashFunction:G,outputType:"binary"}),ye=yield k(LV,0),En=128*y*f,vr=256*y;ye.setMemorySize(Ae.length+En+vr),ye.writeMemory(Ae,0),ye.getExports().scrypt(y,f,S);let qr=ye.getMemory().subarray(0,128*y*S),ti=yield Dy({password:c.password,salt:qr,iterations:1,hashLength:U,hashFunction:G,outputType:"binary"});if(c.outputType==="hex"){let Or=new Uint8Array(U*2);return D(Or,ti,U)}return ti})}let zV=c=>c&&!(c&c-1),ZV=c=>{if(!c||typeof c!="object")throw new Error("Invalid options parameter. It requires an object.");if(!Number.isInteger(c.blockSize)||c.blockSize<1)throw new Error("Block size should be a positive number");if(!Number.isInteger(c.costFactor)||c.costFactor<2||!zV(c.costFactor))throw new Error("Cost factor should be a power of 2, greater than 1");if(!Number.isInteger(c.parallelism)||c.parallelism<1)throw new Error("Parallelism should be a positive number");if(!Number.isInteger(c.hashLength)||c.hashLength<1)throw new Error("Hash length should be a positive number.");if(c.outputType===void 0&&(c.outputType="hex"),!["hex","binary"].includes(c.outputType))throw new Error(`Insupported output type ${c.outputType}. Valid values: ['hex', 'binary']`)};function XV(c){return o(this,void 0,void 0,function*(){return ZV(c),YV(c)})}var $V="bcrypt",jV="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",e6="8bd8822d",QD={name:$V,data:jV,hash:e6};function n6(c){return o(this,void 0,void 0,function*(){let{costFactor:f,password:y,salt:S}=c,U=yield k(QD,0);U.writeMemory(R(S),0);let G=R(y);U.writeMemory(G,16);let Ae=c.outputType==="encoded"?1:0;U.getExports().bcrypt(G.length,f,Ae);let ye=U.getMemory();if(c.outputType==="encoded")return g(ye,60);if(c.outputType==="hex"){let En=new Uint8Array(48);return D(En,ye,24)}return ye.slice(0,24)})}let t6=c=>{if(!c||typeof c!="object")throw new Error("Invalid options parameter. It requires an object.");if(!Number.isInteger(c.costFactor)||c.costFactor<4||c.costFactor>31)throw new Error("Cost factor should be a number between 4 and 31");if(c.password=R(c.password),c.password.length<1)throw new Error("Password should be at least 1 byte long");if(c.password.length>72)throw new Error("Password should be at most 72 bytes long");if(c.salt=R(c.salt),c.salt.length!==16)throw new Error("Salt should be 16 bytes long");if(c.outputType===void 0&&(c.outputType="encoded"),!["hex","binary","encoded"].includes(c.outputType))throw new Error(`Insupported output type ${c.outputType}. Valid values: ['hex', 'binary', 'encoded']`)};function r6(c){return o(this,void 0,void 0,function*(){return t6(c),n6(c)})}let i6=c=>!(!/^\$2[axyb]\$[0-3][0-9]\$[./A-Za-z0-9]{53}$/.test(c)||c[4]==="0"&&Number(c[5])<4||c[4]==="3"&&Number(c[5])>1),o6=c=>{if(!c||typeof c!="object")throw new Error("Invalid options parameter. It requires an object.");if(c.hash===void 0||typeof c.hash!="string")throw new Error("Hash should be specified");if(c.hash.length!==60)throw new Error("Hash should be 60 bytes long");if(!i6(c.hash))throw new Error("Invalid hash");if(c.password=R(c.password),c.password.length<1)throw new Error("Password should be at least 1 byte long");if(c.password.length>72)throw new Error("Password should be at most 72 bytes long")};function a6(c){return o(this,void 0,void 0,function*(){o6(c);let{hash:f,password:y}=c,S=yield k(QD,0);S.writeMemory(R(f),0);let U=R(y);return S.writeMemory(U,60),!!S.getExports().bcrypt_verify(U.length)})}var s6="whirlpool",d6="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",c6="8d8f6035",wD={name:s6,data:d6,hash:c6};let u6=new a,Xg=null;function A6(c){if(Xg===null)return w(u6,wD,64).then(f=>(Xg=f,Xg.calculate(c)));try{let f=Xg.calculate(c);return Promise.resolve(f)}catch(f){return Promise.reject(f)}}function l6(){return k(wD,64).then(c=>{c.init();let f={init:()=>(c.init(),f),update:y=>(c.update(y),f),digest:y=>c.digest(y),save:()=>c.save(),load:y=>(c.load(y),f),blockSize:64,digestSize:64};return f})}var f6="sm3",g6="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",p6="b6fb4b8e",bD={name:f6,data:g6,hash:p6};let I6=new a,$g=null;function h6(c){if($g===null)return w(I6,bD,32).then(f=>($g=f,$g.calculate(c)));try{let f=$g.calculate(c);return Promise.resolve(f)}catch(f){return Promise.reject(f)}}function y6(){return k(bD,32).then(c=>{c.init();let f={init:()=>(c.init(),f),update:y=>(c.update(y),f),digest:y=>c.digest(y),save:()=>c.save(),load:y=>(c.load(y),f),blockSize:64,digestSize:32};return f})}e.adler32=W,e.argon2Verify=zG,e.argon2d=WG,e.argon2i=VG,e.argon2id=KG,e.bcrypt=r6,e.bcryptVerify=a6,e.blake2b=qd,e.blake2s=e4,e.blake3=a4,e.crc32=l4,e.crc64=y4,e.createAdler32=oe,e.createBLAKE2b=gs,e.createBLAKE2s=n4,e.createBLAKE3=s4,e.createCRC32=f4,e.createCRC64=B4,e.createHMAC=ED,e.createKeccak=W4,e.createMD4=Q4,e.createMD5=v4,e.createRIPEMD160=qV,e.createSHA1=J4,e.createSHA224=$4,e.createSHA256=yD,e.createSHA3=G4,e.createSHA384=aV,e.createSHA512=cV,e.createSM3=y6,e.createWhirlpool=l6,e.createXXHash128=DV,e.createXXHash3=bV,e.createXXHash32=pV,e.createXXHash64=CV,e.keccak=K4,e.md4=E4,e.md5=N4,e.pbkdf2=Dy,e.ripemd160=FV,e.scrypt=XV,e.sha1=T4,e.sha224=X4,e.sha256=eV,e.sha3=_4,e.sha384=oV,e.sha512=dV,e.sm3=h6,e.whirlpool=A6,e.xxhash128=OV,e.xxhash3=wV,e.xxhash32=gV,e.xxhash64=mV}))});var jD=I(Rl=>{"use strict";Object.defineProperty(Rl,"__esModule",{value:!0});Rl.Argon2id=void 0;Rl.isArgon2idOptions=mK;var $D=Ur(),BK=XD();function mK(e){return!(!(0,$D.isNonNullObject)(e)||typeof e.outputLength!="number"||typeof e.opsLimit!="number"||typeof e.memLimitKib!="number")}var QB=class{static async execute(n,t,i){let r={password:n,salt:t,outputType:"binary",iterations:i.opsLimit,memorySize:i.memLimitKib,parallelism:1,hashLength:i.outputLength};if(t.length!==16)throw new Error(`Got invalid salt length ${t.length}. Must be 16.`);let o=await(0,BK.argon2id)(r);return(0,$D.assert)(typeof o!="string"),o}};Rl.Argon2id=QB});var eU=I(dp=>{"use strict";Object.defineProperty(dp,"__esModule",{value:!0});dp.toAscii=CK;dp.fromAscii=SK;function CK(e){return Uint8Array.from((t=>t.split("").map(i=>{let r=i.charCodeAt(0);if(r<32||r>126)throw new Error(`Cannot encode character that is out of printable ASCII range: ${r}`);return r}))(e))}function SK(e){return(t=>t.map(i=>{if(i<32||i>126)throw new Error(`Cannot decode character that is out of printable ASCII range: ${i}`);return String.fromCharCode(i)}))(Array.from(e)).join("")}});var rU=I(cp=>{"use strict";cp.byteLength=EK;cp.toByteArray=wK;cp.fromByteArray=PK;var ys=[],da=[],kK=typeof Uint8Array<"u"?Uint8Array:Array,wB="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";for(Tc=0,nU=wB.length;Tc<nU;++Tc)ys[Tc]=wB[Tc],da[wB.charCodeAt(Tc)]=Tc;var Tc,nU;da[45]=62;da[95]=63;function tU(e){var n=e.length;if(n%4>0)throw new Error("Invalid string. Length must be a multiple of 4");var t=e.indexOf("=");t===-1&&(t=n);var i=t===n?0:4-t%4;return[t,i]}function EK(e){var n=tU(e),t=n[0],i=n[1];return(t+i)*3/4-i}function QK(e,n,t){return(n+t)*3/4-t}function wK(e){var n,t=tU(e),i=t[0],r=t[1],o=new kK(QK(e,i,r)),a=0,s=r>0?i-4:i,d;for(d=0;d<s;d+=4)n=da[e.charCodeAt(d)]<<18|da[e.charCodeAt(d+1)]<<12|da[e.charCodeAt(d+2)]<<6|da[e.charCodeAt(d+3)],o[a++]=n>>16&255,o[a++]=n>>8&255,o[a++]=n&255;return r===2&&(n=da[e.charCodeAt(d)]<<2|da[e.charCodeAt(d+1)]>>4,o[a++]=n&255),r===1&&(n=da[e.charCodeAt(d)]<<10|da[e.charCodeAt(d+1)]<<4|da[e.charCodeAt(d+2)]>>2,o[a++]=n>>8&255,o[a++]=n&255),o}function bK(e){return ys[e>>18&63]+ys[e>>12&63]+ys[e>>6&63]+ys[e&63]}function RK(e,n,t){for(var i,r=[],o=n;o<t;o+=3)i=(e[o]<<16&16711680)+(e[o+1]<<8&65280)+(e[o+2]&255),r.push(bK(i));return r.join("")}function PK(e){for(var n,t=e.length,i=t%3,r=[],o=16383,a=0,s=t-i;a<s;a+=o)r.push(RK(e,a,a+o>s?s:a+o));return i===1?(n=e[t-1],r.push(ys[n>>2]+ys[n<<4&63]+"==")):i===2&&(n=(e[t-2]<<8)+e[t-1],r.push(ys[n>>10]+ys[n>>4&63]+ys[n<<2&63]+"=")),r.join("")}});var Pl=I(bB=>{"use strict";Object.defineProperty(bB,"__esModule",{value:!0});bB.fixUint8Array=vK;function NK(e){return e.buffer instanceof ArrayBuffer}function vK(e){if(NK(e))return e;let n=new ArrayBuffer(e.byteLength),t=new Uint8Array(n);return t.set(e),t}});var oU=I(Bs=>{"use strict";var OK=Bs&&Bs.__createBinding||(Object.create?(function(e,n,t,i){i===void 0&&(i=t);var r=Object.getOwnPropertyDescriptor(n,t);(!r||("get"in r?!n.__esModule:r.writable||r.configurable))&&(r={enumerable:!0,get:function(){return n[t]}}),Object.defineProperty(e,i,r)}):(function(e,n,t,i){i===void 0&&(i=t),e[i]=n[t]})),DK=Bs&&Bs.__setModuleDefault||(Object.create?(function(e,n){Object.defineProperty(e,"default",{enumerable:!0,value:n})}):function(e,n){e.default=n}),UK=Bs&&Bs.__importStar||(function(){var e=function(n){return e=Object.getOwnPropertyNames||function(t){var i=[];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(i[i.length]=r);return i},e(n)};return function(n){if(n&&n.__esModule)return n;var t={};if(n!=null)for(var i=e(n),r=0;r<i.length;r++)i[r]!=="default"&&OK(t,n,i[r]);return DK(t,n),t}})();Object.defineProperty(Bs,"__esModule",{value:!0});Bs.toBase64=TK;Bs.fromBase64=JK;var iU=UK(rU()),xK=Pl();function TK(e){return iU.fromByteArray(e)}function JK(e){if(!e.match(/^[a-zA-Z0-9+/]*={0,2}$/))throw new Error("Invalid base64 string format");return(0,xK.fixUint8Array)(iU.toByteArray(e))}});var vU={};RD(vU,{__TESTS:()=>fW,ascii:()=>AW,base16:()=>HK,base32:()=>MK,base32crockford:()=>WK,base32hex:()=>GK,base32hexnopad:()=>VK,base32nopad:()=>_K,base36:()=>tW,base58:()=>up,base58check:()=>aW,base58flickr:()=>rW,base58xmr:()=>oW,base58xrp:()=>iW,base64:()=>YK,base64nopad:()=>zK,base64url:()=>ZK,base64urlnopad:()=>XK,bech32:()=>cW,bech32m:()=>uW,createBase58check:()=>wU,hex:()=>IW,utf8:()=>lW});function pU(e){return e instanceof Uint8Array||ArrayBuffer.isView(e)&&e.constructor.name==="Uint8Array"&&"BYTES_PER_ELEMENT"in e&&e.BYTES_PER_ELEMENT===1}function wo(e){if(!pU(e))throw new TypeError("Uint8Array expected")}function FK(e,n){return Array.isArray(n)?n.length===0?!0:e?n.every(t=>typeof t=="string"):n.every(t=>Number.isSafeInteger(t)):!1}function Ap(e){if(typeof e!="function")throw new TypeError("function expected");return!0}function zo(e,n){if(typeof n!="string")throw new TypeError(`${e}: string expected`);return!0}function vl(e,n="number"){if(typeof e!="number")throw new TypeError(`${n}: expected number, got ${typeof e}`);if(!Number.isSafeInteger(e))throw new RangeError(`${n}: expected safe integer, got ${e}`)}function aU(e,n){if(!FK(!1,n))throw new TypeError(`${e}: array of numbers expected`)}function ca(...e){let n=o=>o,t=(o,a)=>s=>o(a(s)),i=e.map(o=>o.encode).reduceRight(t,n),r=e.map(o=>o.decode).reduce(t,n);return{encode:i,decode:r}}function IU(e){return Ap(e),{encode:n=>n,decode:n=>e(n)}}function sU(e,n=e.length){let t=new Array(n);for(let i=0;i<n;i++)t[i]=e[i];return t}function hU(e){let n=e.length;if(dU!==void 0&&n>=12)return dU.decode(e);if(n<=RB)return String.fromCharCode.apply(null,e);let t="";for(let i=0;i<n;i+=RB)t+=String.fromCharCode.apply(null,e.subarray(i,i+RB));return t}function Zo(e){if(vl(e),e<=0||e>8)throw new RangeError("radix2: bits should be in (0..8]");let n=qK[e]-1;return{encode:t=>{wo(t);let i=t.length,r=new Uint8Array(Math.ceil(i*8/e)),o=0,a=0,s=0;for(let d=0;d<i;)for(d+2<i?(o=o<<24|t[d]<<16|t[d+1]<<8|t[d+2],a+=24,d+=3):(o=(o<<8|t[d])&65535,a+=8,d++);a-=e,r[s++]=o>>a&n,!(a<e););return a>0&&(r[s]=o<<e-a&n),r},decode:t=>{let i=t.length,r=new Uint8Array(Math.floor(i*e/8)),o=0,a=0,s=0;for(let d=0;d<i;d++)for(o=(o<<e|t[d])&65535,a+=e;a>=8;a-=8)r[s++]=o>>a-8&255;if(o=o<<8-a&255,a>=e)throw new Error("Excess padding");if(o>0)throw new Error(`Non-zero padding: ${o}`);return r}}}function bo(e,n){let t=e.length;if(t>128)throw new Error("alphabet: max 128 letters");let i=new Uint8Array(t),r=new Int8Array(128).fill(-1);for(let o=0;o<t;o++){let a=e.charCodeAt(o);if(e.codePointAt(o)!==a||a>127)throw new Error("alphabet: single-char ASCII letters only");i[o]=a,r[a]=o}if(n!==void 0)for(let o of Object.keys(n)){let a=o.charCodeAt(0),s=r[n[o].charCodeAt(0)];if(o.length!==1||a>127||s===void 0||s===-1)throw new Error(`alphabet: invalid alias ${o}`);r[a]=s}return{encode:o=>{let a=new Uint8Array(o.length);for(let s=0;s<o.length;s++){let d=o[s],A=i[d];if(A===void 0)throw new Error(`alphabet.encode: invalid digit ${d}`);a[s]=A}return hU(a)},decode:o=>{zo("decode",o);let a=o.length,s=new Uint8Array(a);for(let d=0;d<a;d++){let A=o.charCodeAt(d),l=A<128?r[A]:-1;if(l===-1)throw new Error(`Unknown letter "${o[d]}". Allowed: ${e}`);s[d]=l}return s}}}function lp(e,n="="){return vl(e),zo("padding",n),{encode(t){for(;t.length*e%8;)t+=n;return t},decode(t){zo("decode",t);let i=t.length;if(i*e%8)throw new Error("padding: invalid length");for(;i>0&&t[i-1]===n;i--)if((i-1)*e%8===0)throw new Error("padding: excess padding");return t.slice(0,i)}}}function cU(e){return Ap(e),function(...n){try{return e.apply(null,n)}catch{}}}function yU(e,n){if(vl(e),e<=0)throw new RangeError(`checksum length must be positive: ${e}`);Ap(n);let t=n;return{encode(i){wo(i);let r=t(i).slice(0,e),o=new Uint8Array(i.length+e);return o.set(i),o.set(r,i.length),o},decode(i){wo(i);let r=i.slice(0,-e),o=i.slice(-e),a=t(r).slice(0,e);for(let s=0;s<e;s++)if(a[s]!==o[s])throw new Error("Invalid checksum");return r}}}function lU(e,n){for(let t=0;t<n.length;t++){let i=n.charCodeAt(t);if(i<33||i>126)throw new Error(`${e}: printable ASCII expected`)}}function dW(e){let n=e.length,t=new Uint8Array(n);for(let i=0;i<n;i++){let r=e[i];if(r<0||r>=32)throw new Error(`alphabet.encode: invalid digit ${r}`);t[i]=r}return t}function Nl(e){let n=e>>25,t=(e&33554431)<<5;for(let i=0;i<fU.length;i++)(n>>i&1)===1&&(t^=fU[i]);return t}function gU(e,n,t=1){let i=e.length,r=1;for(let a=0;a<i;a++){let s=e.charCodeAt(a);if(s<33||s>126)throw new Error(`Invalid prefix (${e})`);r=Nl(r)^s>>5}r=Nl(r);for(let a=0;a<i;a++)r=Nl(r)^e.charCodeAt(a)&31;for(let a of n)r=Nl(r)^a;for(let a=0;a<6;a++)r=Nl(r);r^=t;let o=new Uint8Array(6);for(let a=0;a<6;a++)o[a]=r>>>5*(5-a)&31;return PB.encode(o)}function bU(e){let n=e==="bech32"?1:734539939,t=Zo(5),i=p=>{wo(p);let g=p.length,h=new Array(Math.ceil(g*8/5)),B=0,C=0,Q=0;for(let E=0;E<g;E++)for(B=B<<8|p[E],C+=8;C>=5;C-=5)h[Q++]=B>>C-5&31;return C>0&&(h[Q]=B<<5-C&31),h},r=p=>{aU("radix2.decode",p);let g=p.length,h=new Uint8Array(g);for(let B=0;B<g;B++){let C=p[B];if(C<0||C>=32)throw new Error(`convertRadix2: invalid word=${C}`);h[B]=C}return t.decode(h)},o=cU(r);function a(p,g,h=90){zo("bech32.encode prefix",p),h!==!1&&vl(h,"limit"),pU(g)&&(g=sU(g)),aU("bech32.encode",g);let B=p.length;if(B===0)throw new TypeError(`Invalid prefix length ${B}`);let C=B+7+g.length;if(h!==!1&&C>h)throw new TypeError(`Length ${C} exceeds limit ${h}`);lU("bech32.encode prefix",p);let Q=p.toLowerCase(),E=gU(Q,g,n);return`${Q}1${PB.encode(dW(g))}${E}`}function s(p,g=90){zo("bech32.decode input",p),g!==!1&&vl(g,"limit");let h=p.length;if(h<8||g!==!1&&h>g)throw new TypeError(`invalid string length ${h}, expected (8..${g})`);let B=p.toLowerCase();if(p!==B&&!sW.test(p))throw lU("bech32.decode input",p),new Error("mixed-case string not allowed");let C=B.lastIndexOf("1");if(C===0||C===-1)throw new Error('invalid separator "1"');let Q=B.slice(0,C),E=B.slice(C+1);if(E.length<6)throw new Error("invalid data length");let D=PB.decode(E),R=sU(D,D.length-6),K=gU(Q,R,n);if(!E.endsWith(K))throw new Error(`Invalid checksum in ${p}`);return{prefix:Q,words:R}}let d=cU(s);function A(p,g=90){let{prefix:h,words:B}=s(p,g);return{prefix:h,words:B,bytes:r(B)}}function l(p,g){return a(p,i(g))}return{encode:a,decode:s,encodeFromBytes:l,decodeToBytes:A,decodeUnsafe:d,fromWords:r,fromWordsUnsafe:o,toWords:i}}var er,qK,dU,RB,HK,MK,_K,GK,VK,KK,WK,BU,LK,mU,CU,SU,YK,zK,ZK,XK,$K,jK,uU,eW,nW,kU,EU,QU,tW,vB,up,rW,iW,AU,oW,wU,aW,PB,sW,fU,cW,uW,AW,RU,PU,Ru,NB,lW,NU,fW,gW,pW,IW,OU=Q6(()=>{er=e=>Object.freeze(e());qK=(()=>{let e=[];for(let n=0;n<40;n++)e.push(2**n);return e})();dU=(()=>{try{let e=new TextDecoder;return e.decode(Uint8Array.of(65,48,43,127))==="A0+\x7F"?e:void 0}catch{return}})(),RB=8192;HK=er(()=>ca(Zo(4),bo("0123456789ABCDEF"))),MK=er(()=>ca(Zo(5),bo("ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"),lp(5))),_K=er(()=>ca(Zo(5),bo("ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"))),GK=er(()=>ca(Zo(5),bo("0123456789ABCDEFGHIJKLMNOPQRSTUV"),lp(5))),VK=er(()=>ca(Zo(5),bo("0123456789ABCDEFGHIJKLMNOPQRSTUV"))),KK=/^[\x00-\x7f]*$/,WK=er(()=>ca(Zo(5),bo("0123456789ABCDEFGHJKMNPQRSTVWXYZ"),IU(e=>{zo("base32crockford.decode",e);let n=e.toUpperCase();if(e!==n&&!KK.test(e))throw new Error("base32crockford.decode: ASCII expected");return n.replace(/O/g,"0").replace(/[IL]/g,"1")}))),BU=typeof Uint8Array.from([]).toBase64=="function"&&typeof Uint8Array.fromBase64=="function",LK=/[\t\n\f\r ]/,mU=(e,n)=>{zo("base64",e);let t=n?"base64url":"base64";if(e.length>0&&LK.test(e))throw new Error("invalid base64");return Uint8Array.fromBase64(e,{alphabet:t,lastChunkHandling:"strict"})},CU=er(()=>ca(Zo(6),bo("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"),lp(6))),SU=er(()=>ca(Zo(6),bo("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"),lp(6))),YK=er(()=>BU?{encode(e){return wo(e),e.toBase64()},decode(e){return mU(e,!1)}}:CU),zK=er(()=>ca(Zo(6),bo("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"))),ZK=er(()=>BU?{encode(e){return wo(e),e.toBase64({alphabet:"base64url"})},decode(e){return mU(e,!0)}}:SU),XK=er(()=>ca(Zo(6),bo("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"))),$K=656356768,jK=60466176,uU=65536,eW=2048,nW=4096,kU=(e,n)=>({encode:t=>{wo(t);let i=t.length;if(i===0)return new Uint8Array(0);if(i>=uU)throw new Error("invalid length");let r=0;for(;r<i-1&&t[r]===0;)r++;let o=Math.ceil(i/2),a=new Uint16Array(o),s=i&1;s&&(a[0]=t[0]);for(let B=s,C=s;B<i;B+=2,C++)a[C]=t[B]<<8|t[B+1];let d=[],A=0;for(;A<o;){let B=0;for(let C=A;C<o;C++){let Q=B*65536+a[C],E=Math.floor(Q/n);B=Q-E*n,a[C]=E,E===0&&C===A&&A++}d.push(B)}let l=d.length-1,p=l*5;for(let B=d[l];p++,!(B<e);B=Math.floor(B/e));let g=new Uint8Array(r+p),h=g.length-1;for(let B=0;B<l;B++){let C=d[B];for(let Q=0;Q<5;Q++)g[h--]=C%e,C=Math.floor(C/e)}for(let B=d[l];h>=r;B=Math.floor(B/e))g[h--]=B%e;return g},decode:t=>{wo(t);let i=t.length;if(i===0)return new Uint8Array(0);if(i>=uU)throw new Error("invalid length");let r=0;for(;r<i-1&&t[r]===0;)r++;let o=new Uint16Array(Math.ceil(i*6/16)+1),a=0,s=0,d=i%5||5;for(;s<i;){let g=0,h=1;for(let C=s+d;s<C;s++){let Q=t[s];if(Q>=e)throw new Error(`invalid integer: ${Q}`);g=g*e+Q,h*=e}d=5;let B=g;for(let C=0;C<a;C++){let Q=o[C]*h+B;B=Math.floor(Q/65536),o[C]=Q-B*65536}for(;B>0;B=Math.floor(B/65536))o[a++]=B%65536}let A=a===0?1:a*2-(o[a-1]<256?1:0),l=new Uint8Array(r+A),p=l.length-1;for(let g=0;g<a;g++){let h=o[g];l[p--]=h&255,p>=r&&(l[p--]=h>>8)}return l}}),EU=(e,n)=>{let t=bo(n);return{encode(i){if(wo(i),i.length>eW)throw new Error("invalid length");return t.encode(e.encode(i))},decode(i){if(zo("baseN.decode",i),i.length>nW)throw new Error("invalid length");return e.decode(t.decode(i))}}},QU=kU(58,$K),tW=er(()=>EU(kU(36,jK),"0123456789abcdefghijklmnopqrstuvwxyz")),vB=e=>EU(QU,e),up=er(()=>vB("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz")),rW=er(()=>vB("123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ")),iW=er(()=>vB("rpshnaf39wBUDNEGHJKLM4PQRST7VWXYZ2bcdeCg65jkm8oFqi1tuvAxyz")),AU=[0,2,3,5,6,7,9,10,11],oW=er(()=>({encode(e){wo(e);let n="";for(let t=0;t<e.length;t+=8){let i=e.subarray(t,t+8);n+=up.encode(i).padStart(AU[i.length],"1")}return n},decode(e){zo("base58xmr.decode",e);let n=e.length,t=n%11,i=t===0?0:AU.indexOf(t);if(i===-1)throw new Error(`base58xmr: invalid block length ${t}`);let r=new Uint8Array(Math.floor(n/11)*8+i),o=0;for(let a=0;a<n;a+=11){let s=e.slice(a,a+11),d=s.length===11?8:i,A=up.decode(s);for(let l=0;l<A.length-d;l++)if(A[l]!==0)throw new Error("base58xmr: wrong padding");for(let l=A.length-d;l<A.length;l++)r[o++]=A[l]}return r}})),wU=e=>{Ap(e);let n=e;return ca(yU(4,t=>n(n(t))),up)},aW=wU,PB=bo("qpzry9x8gf2tvdw0s3jn54khce6mua7l"),sW=/^[\x21-\x60\x7b-\x7e]+$/;fU=[996825010,642813549,513874426,1027748829,705979059];cW=er(()=>bU("bech32")),uW=er(()=>bU("bech32m")),AW=er(()=>({encode(e){wo(e);for(let n=0;n<e.length;n++){let t=e[n];if(t>127)throw new RangeError(`non-ASCII byte ${t} at ${n}`)}return hU(e)},decode(e){if(typeof e!="string")throw new TypeError("ascii string expected, got "+typeof e);let n=new Uint8Array(e.length);for(let t=0;t<e.length;t++){let i=e.charCodeAt(t);if(i>127)throw new RangeError(`non-ASCII char "${e[t]}" (${i}) at ${t}`);n[t]=i}return n}})),RU=e=>{try{return encodeURI(e)!==null}catch{return!1}},PU=typeof"".isWellFormed=="function"?e=>e.isWellFormed():RU,Ru=e=>new TypeError(`invalid utf8 at byte ${e}`),NB=er(()=>({encode(e){wo(e);let n="";for(let t=0;t<e.length;){let i=e[t++];if(i<128){n+=String.fromCharCode(i);continue}if(i<194||t>=e.length)throw Ru(t-1);let r=e[t++];if((r&192)!==128)throw Ru(t-1);let o=(i&31)<<6|r&63;if(i>=224){if(t>=e.length)throw Ru(t-1);let a=e[t++];if((a&192)!==128||i===224&&r<160||i===237&&r>=160)throw Ru(t-1);if(o=(i&15)<<12|(r&63)<<6|a&63,i>=240){if(t>=e.length)throw Ru(t-1);let s=e[t++];if(i>244||(s&192)!==128||i===240&&r<144||i===244&&r>=144)throw Ru(t-1);o=(i&7)<<18|(r&63)<<12|(a&63)<<6|s&63}}o<65536?n+=String.fromCharCode(o):(o-=65536,n+=String.fromCharCode((o>>10)+55296,(o&1023)+56320))}return n},decode(e){if(zo("utf8",e),!PU(e))throw new TypeError("utf8 expected well-formed string");let n=new Uint8Array(e.length*3),t=0;for(let i=0;i<e.length;i++){let r=e.charCodeAt(i);if(r<128){n[t++]=r;continue}if(r>=55296&&r<=57343){let o=e.charCodeAt(++i);r=65536+(r-55296<<10)+o-56320}r>=65536?(n[t++]=r>>18|240,n[t++]=r>>12&63|128):r>=2048?n[t++]=r>>12|224:n[t++]=r>>6|192,r>=2048&&(n[t++]=r>>6&63|128),n[t++]=r&63|128}return n.subarray(0,t)}})),lW=er(()=>{let e,n,t={encode(i){return wo(i),(n||(n=new TextDecoder("utf-8",{ignoreBOM:!0,fatal:!0}))).decode(i)},decode(i){if(zo("utf8",i),!PU(i))throw new TypeError("utf8 expected well-formed string");return(e||(e=new TextEncoder)).encode(i)}};return{encode:typeof TextDecoder=="function"?t.encode:NB.encode,decode:typeof TextEncoder=="function"?t.decode:NB.decode}}),NU=er(()=>ca(Zo(4),bo("0123456789abcdef",{A:"a",B:"b",C:"c",D:"d",E:"e",F:"f"}),IU(e=>{if(zo("hex",e),e.length%2!==0)throw new TypeError(`hex.decode: odd-length string (${e.length})`);return e}))),fW=er(()=>({alphabet:bo,base64Fallback:CU,base64urlFallback:SU,hexFallback:NU,radix2:Zo,radix58:QU,checksum:yU,utf8Fallback:NB,_isWellFormedShim:RU})),gW=typeof Uint8Array.from([]).toHex=="function"&&typeof Uint8Array.fromHex=="function",pW={encode(e){return wo(e),e.toHex()},decode(e){return zo("hex",e),Uint8Array.fromHex(e)}},IW=er(()=>gW?pW:NU)});var xU=I(Ol=>{"use strict";Object.defineProperty(Ol,"__esModule",{value:!0});Ol.toBech32=DU;Ol.fromBech32=UU;Ol.normalizeBech32=BW;var fp=(OU(),ND(vU)),hW=Pl();function DU(e,n,t){return fp.bech32.encode(e,fp.bech32.toWords(n),t)}function yW(e){return e.indexOf("1")!==-1}function UU(e,n=1/0){if(!yW(e))throw new Error("No bech32 separator found");let t=fp.bech32.decode(e,n);return{prefix:t.prefix,data:(0,hW.fixUint8Array)(fp.bech32.fromWords(t.words))}}function BW(e){let{prefix:n,data:t}=UU(e);return DU(n,t)}});var TU=I(gp=>{"use strict";Object.defineProperty(gp,"__esModule",{value:!0});gp.toHex=mW;gp.fromHex=CW;function mW(e){let n="";for(let t of e)n+=("0"+t.toString(16)).slice(-2);return n}function CW(e){if(e.length%2!==0)throw new Error("hex string length must be a multiple of 2");let n=new Uint8Array(e.length/2);for(let t=0;t<n.length;t++){let i=2*t,r=e.slice(i,i+2);if(!r.match(/[0-9a-f]{2}/i))throw new Error("hex string contains invalid characters");n[t]=parseInt(r,16)}return n}});var JU=I(pp=>{"use strict";Object.defineProperty(pp,"__esModule",{value:!0});pp.fromRfc3339=kW;pp.toRfc3339=EW;var SW=/^(\d{4})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2}):(\d{2})(\.\d{1,9})?((?:[+-]\d{2}:\d{2})|Z)$/;function Pu(e,n=2){return e.toString().padStart(n,"0")}function kW(e){let n=SW.exec(e);if(!n)throw new Error("Date string is not in RFC3339 format");let t=+n[1],i=+n[2],r=+n[3],o=+n[4],a=+n[5],s=+n[6],d=n[7]?Math.floor(+n[7]*1e3):0,A,l,p;n[8]==="Z"?(A=1,l=0,p=0):(A=n[8].substring(0,1)==="-"?-1:1,l=+n[8].substring(1,3),p=+n[8].substring(4,6));let g=A*(l*60+p)*60,h=new Date;return h.setUTCFullYear(t,i-1,r),h.setUTCHours(o,a,s,d),new Date(h.getTime()-g*1e3)}function EW(e){let n=e.getUTCFullYear(),t=Pu(e.getUTCMonth()+1),i=Pu(e.getUTCDate()),r=Pu(e.getUTCHours()),o=Pu(e.getUTCMinutes()),a=Pu(e.getUTCSeconds()),s=Pu(e.getUTCMilliseconds(),3);return`${n}-${t}-${i}T${r}:${o}:${a}.${s}Z`}});var FU=I(Ip=>{"use strict";Object.defineProperty(Ip,"__esModule",{value:!0});Ip.toUtf8=wW;Ip.fromUtf8=bW;var QW=Pl();function wW(e){return(0,QW.fixUint8Array)(new TextEncoder().encode(e))}function bW(e,n=!1){let t=!n;return new TextDecoder("utf-8",{fatal:t}).decode(e)}});var Jn=I(Ot=>{"use strict";Object.defineProperty(Ot,"__esModule",{value:!0});Ot.toUtf8=Ot.fromUtf8=Ot.fixUint8Array=Ot.toRfc3339=Ot.fromRfc3339=Ot.toHex=Ot.fromHex=Ot.toBech32=Ot.normalizeBech32=Ot.fromBech32=Ot.toBase64=Ot.fromBase64=Ot.toAscii=Ot.fromAscii=void 0;var qU=eU();Object.defineProperty(Ot,"fromAscii",{enumerable:!0,get:function(){return qU.fromAscii}});Object.defineProperty(Ot,"toAscii",{enumerable:!0,get:function(){return qU.toAscii}});var HU=oU();Object.defineProperty(Ot,"fromBase64",{enumerable:!0,get:function(){return HU.fromBase64}});Object.defineProperty(Ot,"toBase64",{enumerable:!0,get:function(){return HU.toBase64}});var OB=xU();Object.defineProperty(Ot,"fromBech32",{enumerable:!0,get:function(){return OB.fromBech32}});Object.defineProperty(Ot,"normalizeBech32",{enumerable:!0,get:function(){return OB.normalizeBech32}});Object.defineProperty(Ot,"toBech32",{enumerable:!0,get:function(){return OB.toBech32}});var MU=TU();Object.defineProperty(Ot,"fromHex",{enumerable:!0,get:function(){return MU.fromHex}});Object.defineProperty(Ot,"toHex",{enumerable:!0,get:function(){return MU.toHex}});var _U=JU();Object.defineProperty(Ot,"fromRfc3339",{enumerable:!0,get:function(){return _U.fromRfc3339}});Object.defineProperty(Ot,"toRfc3339",{enumerable:!0,get:function(){return _U.toRfc3339}});var RW=Pl();Object.defineProperty(Ot,"fixUint8Array",{enumerable:!0,get:function(){return RW.fixUint8Array}});var GU=FU();Object.defineProperty(Ot,"fromUtf8",{enumerable:!0,get:function(){return GU.fromUtf8}});Object.defineProperty(Ot,"toUtf8",{enumerable:!0,get:function(){return GU.toUtf8}})});var VU=I(hp=>{"use strict";Object.defineProperty(hp,"__esModule",{value:!0});hp.crypto=void 0;hp.crypto=typeof globalThis=="object"&&"crypto"in globalThis?globalThis.crypto:void 0});var Xo=I(an=>{"use strict";Object.defineProperty(an,"__esModule",{value:!0});an.wrapXOFConstructorWithOpts=an.wrapConstructorWithOpts=an.wrapConstructor=an.Hash=an.nextTick=an.swap32IfBE=an.byteSwapIfBE=an.swap8IfBE=an.isLE=void 0;an.isBytes=WU;an.anumber=DB;an.abytes=vu;an.ahash=PW;an.aexists=NW;an.aoutput=vW;an.u8=OW;an.u32=DW;an.clean=UW;an.createView=xW;an.rotr=TW;an.rotl=JW;an.byteSwap=xB;an.byteSwap32=LU;an.bytesToHex=qW;an.hexToBytes=HW;an.asyncLoop=_W;an.utf8ToBytes=TB;an.bytesToUtf8=GW;an.toBytes=yp;an.kdfInputToBytes=VW;an.concatBytes=KW;an.checkOpts=WW;an.createHasher=zU;an.createOptHasher=ZU;an.createXOFer=XU;an.randomBytes=LW;var Nu=VU();function WU(e){return e instanceof Uint8Array||ArrayBuffer.isView(e)&&e.constructor.name==="Uint8Array"}function DB(e){if(!Number.isSafeInteger(e)||e<0)throw new Error("positive integer expected, got "+e)}function vu(e,...n){if(!WU(e))throw new Error("Uint8Array expected");if(n.length>0&&!n.includes(e.length))throw new Error("Uint8Array expected of length "+n+", got length="+e.length)}function PW(e){if(typeof e!="function"||typeof e.create!="function")throw new Error("Hash should be wrapped by utils.createHasher");DB(e.outputLen),DB(e.blockLen)}function NW(e,n=!0){if(e.destroyed)throw new Error("Hash instance has been destroyed");if(n&&e.finished)throw new Error("Hash#digest() has already been called")}function vW(e,n){vu(e);let t=n.outputLen;if(e.length<t)throw new Error("digestInto() expects output buffer of length at least "+t)}function OW(e){return new Uint8Array(e.buffer,e.byteOffset,e.byteLength)}function DW(e){return new Uint32Array(e.buffer,e.byteOffset,Math.floor(e.byteLength/4))}function UW(...e){for(let n=0;n<e.length;n++)e[n].fill(0)}function xW(e){return new DataView(e.buffer,e.byteOffset,e.byteLength)}function TW(e,n){return e<<32-n|e>>>n}function JW(e,n){return e<<n|e>>>32-n>>>0}an.isLE=new Uint8Array(new Uint32Array([287454020]).buffer)[0]===68;function xB(e){return e<<24&4278190080|e<<8&16711680|e>>>8&65280|e>>>24&255}an.swap8IfBE=an.isLE?e=>e:e=>xB(e);an.byteSwapIfBE=an.swap8IfBE;function LU(e){for(let n=0;n<e.length;n++)e[n]=xB(e[n]);return e}an.swap32IfBE=an.isLE?e=>e:LU;var YU=typeof Uint8Array.from([]).toHex=="function"&&typeof Uint8Array.fromHex=="function",FW=Array.from({length:256},(e,n)=>n.toString(16).padStart(2,"0"));function qW(e){if(vu(e),YU)return e.toHex();let n="";for(let t=0;t<e.length;t++)n+=FW[e[t]];return n}var hd={_0:48,_9:57,A:65,F:70,a:97,f:102};function KU(e){if(e>=hd._0&&e<=hd._9)return e-hd._0;if(e>=hd.A&&e<=hd.F)return e-(hd.A-10);if(e>=hd.a&&e<=hd.f)return e-(hd.a-10)}function HW(e){if(typeof e!="string")throw new Error("hex string expected, got "+typeof e);if(YU)return Uint8Array.fromHex(e);let n=e.length,t=n/2;if(n%2)throw new Error("hex string expected, got unpadded hex of length "+n);let i=new Uint8Array(t);for(let r=0,o=0;r<t;r++,o+=2){let a=KU(e.charCodeAt(o)),s=KU(e.charCodeAt(o+1));if(a===void 0||s===void 0){let d=e[o]+e[o+1];throw new Error('hex string expected, got non-hex character "'+d+'" at index '+o)}i[r]=a*16+s}return i}var MW=async()=>{};an.nextTick=MW;async function _W(e,n,t){let i=Date.now();for(let r=0;r<e;r++){t(r);let o=Date.now()-i;o>=0&&o<n||(await(0,an.nextTick)(),i+=o)}}function TB(e){if(typeof e!="string")throw new Error("string expected");return new Uint8Array(new TextEncoder().encode(e))}function GW(e){return new TextDecoder().decode(e)}function yp(e){return typeof e=="string"&&(e=TB(e)),vu(e),e}function VW(e){return typeof e=="string"&&(e=TB(e)),vu(e),e}function KW(...e){let n=0;for(let i=0;i<e.length;i++){let r=e[i];vu(r),n+=r.length}let t=new Uint8Array(n);for(let i=0,r=0;i<e.length;i++){let o=e[i];t.set(o,r),r+=o.length}return t}function WW(e,n){if(n!==void 0&&{}.toString.call(n)!=="[object Object]")throw new Error("options should be object or undefined");return Object.assign(e,n)}var UB=class{};an.Hash=UB;function zU(e){let n=i=>e().update(yp(i)).digest(),t=e();return n.outputLen=t.outputLen,n.blockLen=t.blockLen,n.create=()=>e(),n}function ZU(e){let n=(i,r)=>e(r).update(yp(i)).digest(),t=e({});return n.outputLen=t.outputLen,n.blockLen=t.blockLen,n.create=i=>e(i),n}function XU(e){let n=(i,r)=>e(r).update(yp(i)).digest(),t=e({});return n.outputLen=t.outputLen,n.blockLen=t.blockLen,n.create=i=>e(i),n}an.wrapConstructor=zU;an.wrapConstructorWithOpts=ZU;an.wrapXOFConstructorWithOpts=XU;function LW(e=32){if(Nu.crypto&&typeof Nu.crypto.getRandomValues=="function")return Nu.crypto.getRandomValues(new Uint8Array(e));if(Nu.crypto&&typeof Nu.crypto.randomBytes=="function")return Uint8Array.from(Nu.crypto.randomBytes(e));throw new Error("crypto.getRandomValues must be defined")}});var JB=I(Fc=>{"use strict";Object.defineProperty(Fc,"__esModule",{value:!0});Fc.hmac=Fc.HMAC=void 0;var Jc=Xo(),Dl=class extends Jc.Hash{constructor(n,t){super(),this.finished=!1,this.destroyed=!1,(0,Jc.ahash)(n);let i=(0,Jc.toBytes)(t);if(this.iHash=n.create(),typeof this.iHash.update!="function")throw new Error("Expected instance of class which extends utils.Hash");this.blockLen=this.iHash.blockLen,this.outputLen=this.iHash.outputLen;let r=this.blockLen,o=new Uint8Array(r);o.set(i.length>r?n.create().update(i).digest():i);for(let a=0;a<o.length;a++)o[a]^=54;this.iHash.update(o),this.oHash=n.create();for(let a=0;a<o.length;a++)o[a]^=106;this.oHash.update(o),(0,Jc.clean)(o)}update(n){return(0,Jc.aexists)(this),this.iHash.update(n),this}digestInto(n){(0,Jc.aexists)(this),(0,Jc.abytes)(n,this.outputLen),this.finished=!0,this.iHash.digestInto(n),this.oHash.update(n),this.oHash.digestInto(n),this.destroy()}digest(){let n=new Uint8Array(this.oHash.outputLen);return this.digestInto(n),n}_cloneInto(n){n||(n=Object.create(Object.getPrototypeOf(this),{}));let{oHash:t,iHash:i,finished:r,destroyed:o,blockLen:a,outputLen:s}=this;return n=n,n.finished=r,n.destroyed=o,n.blockLen=a,n.outputLen=s,n.oHash=t._cloneInto(n.oHash),n.iHash=i._cloneInto(n.iHash),n}clone(){return this._cloneInto()}destroy(){this.destroyed=!0,this.oHash.destroy(),this.iHash.destroy()}};Fc.HMAC=Dl;var YW=(e,n,t)=>new Dl(e,n).update(t).digest();Fc.hmac=YW;Fc.hmac.create=(e,n)=>new Dl(e,n)});var ex=I(Bp=>{"use strict";Object.defineProperty(Bp,"__esModule",{value:!0});Bp.pbkdf2=ZW;Bp.pbkdf2Async=XW;var zW=JB(),_a=Xo();function $U(e,n,t,i){(0,_a.ahash)(e);let r=(0,_a.checkOpts)({dkLen:32,asyncTick:10},i),{c:o,dkLen:a,asyncTick:s}=r;if((0,_a.anumber)(o),(0,_a.anumber)(a),(0,_a.anumber)(s),o<1)throw new Error("iterations (c) should be >= 1");let d=(0,_a.kdfInputToBytes)(n),A=(0,_a.kdfInputToBytes)(t),l=new Uint8Array(a),p=zW.hmac.create(e,d),g=p._cloneInto().update(A);return{c:o,dkLen:a,asyncTick:s,DK:l,PRF:p,PRFSalt:g}}function jU(e,n,t,i,r){return e.destroy(),n.destroy(),i&&i.destroy(),(0,_a.clean)(r),t}function ZW(e,n,t,i){let{c:r,dkLen:o,DK:a,PRF:s,PRFSalt:d}=$U(e,n,t,i),A,l=new Uint8Array(4),p=(0,_a.createView)(l),g=new Uint8Array(s.outputLen);for(let h=1,B=0;B<o;h++,B+=s.outputLen){let C=a.subarray(B,B+s.outputLen);p.setInt32(0,h,!1),(A=d._cloneInto(A)).update(l).digestInto(g),C.set(g.subarray(0,C.length));for(let Q=1;Q<r;Q++){s._cloneInto(A).update(g).digestInto(g);for(let E=0;E<C.length;E++)C[E]^=g[E]}}return jU(s,d,a,A,g)}async function XW(e,n,t,i){let{c:r,dkLen:o,asyncTick:a,DK:s,PRF:d,PRFSalt:A}=$U(e,n,t,i),l,p=new Uint8Array(4),g=(0,_a.createView)(p),h=new Uint8Array(d.outputLen);for(let B=1,C=0;C<o;B++,C+=d.outputLen){let Q=s.subarray(C,C+d.outputLen);g.setInt32(0,B,!1),(l=A._cloneInto(l)).update(p).digestInto(h),Q.set(h.subarray(0,Q.length)),await(0,_a.asyncLoop)(r-1,a,()=>{d._cloneInto(l).update(h).digestInto(h);for(let E=0;E<Q.length;E++)Q[E]^=h[E]})}return jU(d,A,s,l,h)}});var qB=I(oo=>{"use strict";Object.defineProperty(oo,"__esModule",{value:!0});oo.SHA512_IV=oo.SHA384_IV=oo.SHA224_IV=oo.SHA256_IV=oo.HashMD=void 0;oo.setBigUint64=nx;oo.Chi=$W;oo.Maj=jW;var ms=Xo();function nx(e,n,t,i){if(typeof e.setBigUint64=="function")return e.setBigUint64(n,t,i);let r=BigInt(32),o=BigInt(4294967295),a=Number(t>>r&o),s=Number(t&o),d=i?4:0,A=i?0:4;e.setUint32(n+d,a,i),e.setUint32(n+A,s,i)}function $W(e,n,t){return e&n^~e&t}function jW(e,n,t){return e&n^e&t^n&t}var FB=class extends ms.Hash{constructor(n,t,i,r){super(),this.finished=!1,this.length=0,this.pos=0,this.destroyed=!1,this.blockLen=n,this.outputLen=t,this.padOffset=i,this.isLE=r,this.buffer=new Uint8Array(n),this.view=(0,ms.createView)(this.buffer)}update(n){(0,ms.aexists)(this),n=(0,ms.toBytes)(n),(0,ms.abytes)(n);let{view:t,buffer:i,blockLen:r}=this,o=n.length;for(let a=0;a<o;){let s=Math.min(r-this.pos,o-a);if(s===r){let d=(0,ms.createView)(n);for(;r<=o-a;a+=r)this.process(d,a);continue}i.set(n.subarray(a,a+s),this.pos),this.pos+=s,a+=s,this.pos===r&&(this.process(t,0),this.pos=0)}return this.length+=n.length,this.roundClean(),this}digestInto(n){(0,ms.aexists)(this),(0,ms.aoutput)(n,this),this.finished=!0;let{buffer:t,view:i,blockLen:r,isLE:o}=this,{pos:a}=this;t[a++]=128,(0,ms.clean)(this.buffer.subarray(a)),this.padOffset>r-a&&(this.process(i,0),a=0);for(let p=a;p<r;p++)t[p]=0;nx(i,r-8,BigInt(this.length*8),o),this.process(i,0);let s=(0,ms.createView)(n),d=this.outputLen;if(d%4)throw new Error("_sha2: outputLen should be aligned to 32bit");let A=d/4,l=this.get();if(A>l.length)throw new Error("_sha2: outputLen bigger than state");for(let p=0;p<A;p++)s.setUint32(4*p,l[p],o)}digest(){let{buffer:n,outputLen:t}=this;this.digestInto(n);let i=n.slice(0,t);return this.destroy(),i}_cloneInto(n){n||(n=new this.constructor),n.set(...this.get());let{blockLen:t,buffer:i,length:r,finished:o,destroyed:a,pos:s}=this;return n.destroyed=a,n.finished=o,n.length=r,n.pos=s,r%t&&n.buffer.set(i),n}clone(){return this._cloneInto()}};oo.HashMD=FB;oo.SHA256_IV=Uint32Array.from([1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225]);oo.SHA224_IV=Uint32Array.from([3238371032,914150663,812702999,4144912697,4290775857,1750603025,1694076839,3204075428]);oo.SHA384_IV=Uint32Array.from([3418070365,3238371032,1654270250,914150663,2438529370,812702999,355462360,4144912697,1731405415,4290775857,2394180231,1750603025,3675008525,1694076839,1203062813,3204075428]);oo.SHA512_IV=Uint32Array.from([1779033703,4089235720,3144134277,2227873595,1013904242,4271175723,2773480762,1595750129,1359893119,2917565137,2600822924,725511199,528734635,4215389547,1541459225,327033209])});var _B=I(Sn=>{"use strict";Object.defineProperty(Sn,"__esModule",{value:!0});Sn.toBig=Sn.shrSL=Sn.shrSH=Sn.rotrSL=Sn.rotrSH=Sn.rotrBL=Sn.rotrBH=Sn.rotr32L=Sn.rotr32H=Sn.rotlSL=Sn.rotlSH=Sn.rotlBL=Sn.rotlBH=Sn.add5L=Sn.add5H=Sn.add4L=Sn.add4H=Sn.add3L=Sn.add3H=void 0;Sn.add=Ix;Sn.fromBig=MB;Sn.split=tx;var mp=BigInt(2**32-1),HB=BigInt(32);function MB(e,n=!1){return n?{h:Number(e&mp),l:Number(e>>HB&mp)}:{h:Number(e>>HB&mp)|0,l:Number(e&mp)|0}}function tx(e,n=!1){let t=e.length,i=new Uint32Array(t),r=new Uint32Array(t);for(let o=0;o<t;o++){let{h:a,l:s}=MB(e[o],n);[i[o],r[o]]=[a,s]}return[i,r]}var rx=(e,n)=>BigInt(e>>>0)<<HB|BigInt(n>>>0);Sn.toBig=rx;var ix=(e,n,t)=>e>>>t;Sn.shrSH=ix;var ox=(e,n,t)=>e<<32-t|n>>>t;Sn.shrSL=ox;var ax=(e,n,t)=>e>>>t|n<<32-t;Sn.rotrSH=ax;var sx=(e,n,t)=>e<<32-t|n>>>t;Sn.rotrSL=sx;var dx=(e,n,t)=>e<<64-t|n>>>t-32;Sn.rotrBH=dx;var cx=(e,n,t)=>e>>>t-32|n<<64-t;Sn.rotrBL=cx;var ux=(e,n)=>n;Sn.rotr32H=ux;var Ax=(e,n)=>e;Sn.rotr32L=Ax;var lx=(e,n,t)=>e<<t|n>>>32-t;Sn.rotlSH=lx;var fx=(e,n,t)=>n<<t|e>>>32-t;Sn.rotlSL=fx;var gx=(e,n,t)=>n<<t-32|e>>>64-t;Sn.rotlBH=gx;var px=(e,n,t)=>e<<t-32|n>>>64-t;Sn.rotlBL=px;function Ix(e,n,t,i){let r=(n>>>0)+(i>>>0);return{h:e+t+(r/2**32|0)|0,l:r|0}}var hx=(e,n,t)=>(e>>>0)+(n>>>0)+(t>>>0);Sn.add3L=hx;var yx=(e,n,t,i)=>n+t+i+(e/2**32|0)|0;Sn.add3H=yx;var Bx=(e,n,t,i)=>(e>>>0)+(n>>>0)+(t>>>0)+(i>>>0);Sn.add4L=Bx;var mx=(e,n,t,i,r)=>n+t+i+r+(e/2**32|0)|0;Sn.add4H=mx;var Cx=(e,n,t,i,r)=>(e>>>0)+(n>>>0)+(t>>>0)+(i>>>0)+(r>>>0);Sn.add5L=Cx;var Sx=(e,n,t,i,r,o)=>n+t+i+r+o+(e/2**32|0)|0;Sn.add5H=Sx;var eL={fromBig:MB,split:tx,toBig:rx,shrSH:ix,shrSL:ox,rotrSH:ax,rotrSL:sx,rotrBH:dx,rotrBL:cx,rotr32H:ux,rotr32L:Ax,rotlSH:lx,rotlSL:fx,rotlBH:gx,rotlBL:px,add:Ix,add3L:hx,add3H:yx,add4L:Bx,add4H:mx,add5H:Sx,add5L:Cx};Sn.default=eL});var xl=I(Zt=>{"use strict";Object.defineProperty(Zt,"__esModule",{value:!0});Zt.sha512_224=Zt.sha512_256=Zt.sha384=Zt.sha512=Zt.sha224=Zt.sha256=Zt.SHA512_256=Zt.SHA512_224=Zt.SHA384=Zt.SHA512=Zt.SHA224=Zt.SHA256=void 0;var rn=qB(),_n=_B(),ii=Xo(),nL=Uint32Array.from([1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298]),zd=new Uint32Array(64),Ul=class extends rn.HashMD{constructor(n=32){super(64,n,8,!1),this.A=rn.SHA256_IV[0]|0,this.B=rn.SHA256_IV[1]|0,this.C=rn.SHA256_IV[2]|0,this.D=rn.SHA256_IV[3]|0,this.E=rn.SHA256_IV[4]|0,this.F=rn.SHA256_IV[5]|0,this.G=rn.SHA256_IV[6]|0,this.H=rn.SHA256_IV[7]|0}get(){let{A:n,B:t,C:i,D:r,E:o,F:a,G:s,H:d}=this;return[n,t,i,r,o,a,s,d]}set(n,t,i,r,o,a,s,d){this.A=n|0,this.B=t|0,this.C=i|0,this.D=r|0,this.E=o|0,this.F=a|0,this.G=s|0,this.H=d|0}process(n,t){for(let p=0;p<16;p++,t+=4)zd[p]=n.getUint32(t,!1);for(let p=16;p<64;p++){let g=zd[p-15],h=zd[p-2],B=(0,ii.rotr)(g,7)^(0,ii.rotr)(g,18)^g>>>3,C=(0,ii.rotr)(h,17)^(0,ii.rotr)(h,19)^h>>>10;zd[p]=C+zd[p-7]+B+zd[p-16]|0}let{A:i,B:r,C:o,D:a,E:s,F:d,G:A,H:l}=this;for(let p=0;p<64;p++){let g=(0,ii.rotr)(s,6)^(0,ii.rotr)(s,11)^(0,ii.rotr)(s,25),h=l+g+(0,rn.Chi)(s,d,A)+nL[p]+zd[p]|0,C=((0,ii.rotr)(i,2)^(0,ii.rotr)(i,13)^(0,ii.rotr)(i,22))+(0,rn.Maj)(i,r,o)|0;l=A,A=d,d=s,s=a+h|0,a=o,o=r,r=i,i=h+C|0}i=i+this.A|0,r=r+this.B|0,o=o+this.C|0,a=a+this.D|0,s=s+this.E|0,d=d+this.F|0,A=A+this.G|0,l=l+this.H|0,this.set(i,r,o,a,s,d,A,l)}roundClean(){(0,ii.clean)(zd)}destroy(){this.set(0,0,0,0,0,0,0,0),(0,ii.clean)(this.buffer)}};Zt.SHA256=Ul;var Cp=class extends Ul{constructor(){super(28),this.A=rn.SHA224_IV[0]|0,this.B=rn.SHA224_IV[1]|0,this.C=rn.SHA224_IV[2]|0,this.D=rn.SHA224_IV[3]|0,this.E=rn.SHA224_IV[4]|0,this.F=rn.SHA224_IV[5]|0,this.G=rn.SHA224_IV[6]|0,this.H=rn.SHA224_IV[7]|0}};Zt.SHA224=Cp;var kx=_n.split(["0x428a2f98d728ae22","0x7137449123ef65cd","0xb5c0fbcfec4d3b2f","0xe9b5dba58189dbbc","0x3956c25bf348b538","0x59f111f1b605d019","0x923f82a4af194f9b","0xab1c5ed5da6d8118","0xd807aa98a3030242","0x12835b0145706fbe","0x243185be4ee4b28c","0x550c7dc3d5ffb4e2","0x72be5d74f27b896f","0x80deb1fe3b1696b1","0x9bdc06a725c71235","0xc19bf174cf692694","0xe49b69c19ef14ad2","0xefbe4786384f25e3","0x0fc19dc68b8cd5b5","0x240ca1cc77ac9c65","0x2de92c6f592b0275","0x4a7484aa6ea6e483","0x5cb0a9dcbd41fbd4","0x76f988da831153b5","0x983e5152ee66dfab","0xa831c66d2db43210","0xb00327c898fb213f","0xbf597fc7beef0ee4","0xc6e00bf33da88fc2","0xd5a79147930aa725","0x06ca6351e003826f","0x142929670a0e6e70","0x27b70a8546d22ffc","0x2e1b21385c26c926","0x4d2c6dfc5ac42aed","0x53380d139d95b3df","0x650a73548baf63de","0x766a0abb3c77b2a8","0x81c2c92e47edaee6","0x92722c851482353b","0xa2bfe8a14cf10364","0xa81a664bbc423001","0xc24b8b70d0f89791","0xc76c51a30654be30","0xd192e819d6ef5218","0xd69906245565a910","0xf40e35855771202a","0x106aa07032bbd1b8","0x19a4c116b8d2d0c8","0x1e376c085141ab53","0x2748774cdf8eeb99","0x34b0bcb5e19b48a8","0x391c0cb3c5c95a63","0x4ed8aa4ae3418acb","0x5b9cca4f7763e373","0x682e6ff3d6b2b8a3","0x748f82ee5defb2fc","0x78a5636f43172f60","0x84c87814a1f0ab72","0x8cc702081a6439ec","0x90befffa23631e28","0xa4506cebde82bde9","0xbef9a3f7b2c67915","0xc67178f2e372532b","0xca273eceea26619c","0xd186b8c721c0c207","0xeada7dd6cde0eb1e","0xf57d4f7fee6ed178","0x06f067aa72176fba","0x0a637dc5a2c898a6","0x113f9804bef90dae","0x1b710b35131c471b","0x28db77f523047d84","0x32caab7b40c72493","0x3c9ebe0a15c9bebc","0x431d67c49c100d4c","0x4cc5d4becb3e42b6","0x597f299cfc657e2a","0x5fcb6fab3ad6faec","0x6c44198c4a475817"].map(e=>BigInt(e))),tL=kx[0],rL=kx[1],Zd=new Uint32Array(80),Xd=new Uint32Array(80),qc=class extends rn.HashMD{constructor(n=64){super(128,n,16,!1),this.Ah=rn.SHA512_IV[0]|0,this.Al=rn.SHA512_IV[1]|0,this.Bh=rn.SHA512_IV[2]|0,this.Bl=rn.SHA512_IV[3]|0,this.Ch=rn.SHA512_IV[4]|0,this.Cl=rn.SHA512_IV[5]|0,this.Dh=rn.SHA512_IV[6]|0,this.Dl=rn.SHA512_IV[7]|0,this.Eh=rn.SHA512_IV[8]|0,this.El=rn.SHA512_IV[9]|0,this.Fh=rn.SHA512_IV[10]|0,this.Fl=rn.SHA512_IV[11]|0,this.Gh=rn.SHA512_IV[12]|0,this.Gl=rn.SHA512_IV[13]|0,this.Hh=rn.SHA512_IV[14]|0,this.Hl=rn.SHA512_IV[15]|0}get(){let{Ah:n,Al:t,Bh:i,Bl:r,Ch:o,Cl:a,Dh:s,Dl:d,Eh:A,El:l,Fh:p,Fl:g,Gh:h,Gl:B,Hh:C,Hl:Q}=this;return[n,t,i,r,o,a,s,d,A,l,p,g,h,B,C,Q]}set(n,t,i,r,o,a,s,d,A,l,p,g,h,B,C,Q){this.Ah=n|0,this.Al=t|0,this.Bh=i|0,this.Bl=r|0,this.Ch=o|0,this.Cl=a|0,this.Dh=s|0,this.Dl=d|0,this.Eh=A|0,this.El=l|0,this.Fh=p|0,this.Fl=g|0,this.Gh=h|0,this.Gl=B|0,this.Hh=C|0,this.Hl=Q|0}process(n,t){for(let R=0;R<16;R++,t+=4)Zd[R]=n.getUint32(t),Xd[R]=n.getUint32(t+=4);for(let R=16;R<80;R++){let K=Zd[R-15]|0,he=Xd[R-15]|0,ke=_n.rotrSH(K,he,1)^_n.rotrSH(K,he,8)^_n.shrSH(K,he,7),Ve=_n.rotrSL(K,he,1)^_n.rotrSL(K,he,8)^_n.shrSL(K,he,7),qe=Zd[R-2]|0,O=Xd[R-2]|0,re=_n.rotrSH(qe,O,19)^_n.rotrBH(qe,O,61)^_n.shrSH(qe,O,6),Be=_n.rotrSL(qe,O,19)^_n.rotrBL(qe,O,61)^_n.shrSL(qe,O,6),ue=_n.add4L(Ve,Be,Xd[R-7],Xd[R-16]),k=_n.add4H(ue,ke,re,Zd[R-7],Zd[R-16]);Zd[R]=k|0,Xd[R]=ue|0}let{Ah:i,Al:r,Bh:o,Bl:a,Ch:s,Cl:d,Dh:A,Dl:l,Eh:p,El:g,Fh:h,Fl:B,Gh:C,Gl:Q,Hh:E,Hl:D}=this;for(let R=0;R<80;R++){let K=_n.rotrSH(p,g,14)^_n.rotrSH(p,g,18)^_n.rotrBH(p,g,41),he=_n.rotrSL(p,g,14)^_n.rotrSL(p,g,18)^_n.rotrBL(p,g,41),ke=p&h^~p&C,Ve=g&B^~g&Q,qe=_n.add5L(D,he,Ve,rL[R],Xd[R]),O=_n.add5H(qe,E,K,ke,tL[R],Zd[R]),re=qe|0,Be=_n.rotrSH(i,r,28)^_n.rotrBH(i,r,34)^_n.rotrBH(i,r,39),ue=_n.rotrSL(i,r,28)^_n.rotrBL(i,r,34)^_n.rotrBL(i,r,39),k=i&o^i&s^o&s,w=r&a^r&d^a&d;E=C|0,D=Q|0,C=h|0,Q=B|0,h=p|0,B=g|0,{h:p,l:g}=_n.add(A|0,l|0,O|0,re|0),A=s|0,l=d|0,s=o|0,d=a|0,o=i|0,a=r|0;let P=_n.add3L(re,ue,w);i=_n.add3H(P,O,Be,k),r=P|0}({h:i,l:r}=_n.add(this.Ah|0,this.Al|0,i|0,r|0)),{h:o,l:a}=_n.add(this.Bh|0,this.Bl|0,o|0,a|0),{h:s,l:d}=_n.add(this.Ch|0,this.Cl|0,s|0,d|0),{h:A,l}=_n.add(this.Dh|0,this.Dl|0,A|0,l|0),{h:p,l:g}=_n.add(this.Eh|0,this.El|0,p|0,g|0),{h,l:B}=_n.add(this.Fh|0,this.Fl|0,h|0,B|0),{h:C,l:Q}=_n.add(this.Gh|0,this.Gl|0,C|0,Q|0),{h:E,l:D}=_n.add(this.Hh|0,this.Hl|0,E|0,D|0),this.set(i,r,o,a,s,d,A,l,p,g,h,B,C,Q,E,D)}roundClean(){(0,ii.clean)(Zd,Xd)}destroy(){(0,ii.clean)(this.buffer),this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0)}};Zt.SHA512=qc;var Sp=class extends qc{constructor(){super(48),this.Ah=rn.SHA384_IV[0]|0,this.Al=rn.SHA384_IV[1]|0,this.Bh=rn.SHA384_IV[2]|0,this.Bl=rn.SHA384_IV[3]|0,this.Ch=rn.SHA384_IV[4]|0,this.Cl=rn.SHA384_IV[5]|0,this.Dh=rn.SHA384_IV[6]|0,this.Dl=rn.SHA384_IV[7]|0,this.Eh=rn.SHA384_IV[8]|0,this.El=rn.SHA384_IV[9]|0,this.Fh=rn.SHA384_IV[10]|0,this.Fl=rn.SHA384_IV[11]|0,this.Gh=rn.SHA384_IV[12]|0,this.Gl=rn.SHA384_IV[13]|0,this.Hh=rn.SHA384_IV[14]|0,this.Hl=rn.SHA384_IV[15]|0}};Zt.SHA384=Sp;var Mi=Uint32Array.from([2352822216,424955298,1944164710,2312950998,502970286,855612546,1738396948,1479516111,258812777,2077511080,2011393907,79989058,1067287976,1780299464,286451373,2446758561]),_i=Uint32Array.from([573645204,4230739756,2673172387,3360449730,596883563,1867755857,2520282905,1497426621,2519219938,2827943907,3193839141,1401305490,721525244,746961066,246885852,2177182882]),kp=class extends qc{constructor(){super(28),this.Ah=Mi[0]|0,this.Al=Mi[1]|0,this.Bh=Mi[2]|0,this.Bl=Mi[3]|0,this.Ch=Mi[4]|0,this.Cl=Mi[5]|0,this.Dh=Mi[6]|0,this.Dl=Mi[7]|0,this.Eh=Mi[8]|0,this.El=Mi[9]|0,this.Fh=Mi[10]|0,this.Fl=Mi[11]|0,this.Gh=Mi[12]|0,this.Gl=Mi[13]|0,this.Hh=Mi[14]|0,this.Hl=Mi[15]|0}};Zt.SHA512_224=kp;var Ep=class extends qc{constructor(){super(32),this.Ah=_i[0]|0,this.Al=_i[1]|0,this.Bh=_i[2]|0,this.Bl=_i[3]|0,this.Ch=_i[4]|0,this.Cl=_i[5]|0,this.Dh=_i[6]|0,this.Dl=_i[7]|0,this.Eh=_i[8]|0,this.El=_i[9]|0,this.Fh=_i[10]|0,this.Fl=_i[11]|0,this.Gh=_i[12]|0,this.Gl=_i[13]|0,this.Hh=_i[14]|0,this.Hl=_i[15]|0}};Zt.SHA512_256=Ep;Zt.sha256=(0,ii.createHasher)(()=>new Ul);Zt.sha224=(0,ii.createHasher)(()=>new Cp);Zt.sha512=(0,ii.createHasher)(()=>new qc);Zt.sha384=(0,ii.createHasher)(()=>new Sp);Zt.sha512_256=(0,ii.createHasher)(()=>new Ep);Zt.sha512_224=(0,ii.createHasher)(()=>new kp)});var Jx=I(Te=>{"use strict";Object.defineProperty(Te,"__esModule",{value:!0});Te.bytes=Te.stringToBytes=Te.str=Te.bytesToString=Te.hex=Te.utf8=Te.bech32m=Te.bech32=Te.base58check=Te.createBase58check=Te.base58xmr=Te.base58xrp=Te.base58flickr=Te.base58=Te.base64urlnopad=Te.base64url=Te.base64nopad=Te.base64=Te.base32crockford=Te.base32hexnopad=Te.base32hex=Te.base32nopad=Te.base32=Te.base16=Te.utils=void 0;function Hc(e){return e instanceof Uint8Array||ArrayBuffer.isView(e)&&e.constructor.name==="Uint8Array"}function KB(e,...n){if(!Hc(e))throw new Error("Uint8Array expected");if(n.length>0&&!n.includes(e.length))throw new Error("Uint8Array expected of length "+n+", got length="+e.length)}function Rx(e,n){return Array.isArray(n)?n.length===0?!0:e?n.every(t=>typeof t=="string"):n.every(t=>Number.isSafeInteger(t)):!1}function WB(e){if(typeof e!="function")throw new Error("function expected");return!0}function $d(e,n){if(typeof n!="string")throw new Error(`${e}: string expected`);return!0}function Ou(e){if(!Number.isSafeInteger(e))throw new Error(`invalid integer: ${e}`)}function wp(e){if(!Array.isArray(e))throw new Error("array expected")}function bp(e,n){if(!Rx(!0,n))throw new Error(`${e}: array of strings expected`)}function LB(e,n){if(!Rx(!1,n))throw new Error(`${e}: array of numbers expected`)}function ao(...e){let n=o=>o,t=(o,a)=>s=>o(a(s)),i=e.map(o=>o.encode).reduceRight(t,n),r=e.map(o=>o.decode).reduce(t,n);return{encode:i,decode:r}}function Ro(e){let n=typeof e=="string"?e.split(""):e,t=n.length;bp("alphabet",n);let i=new Map(n.map((r,o)=>[r,o]));return{encode:r=>(wp(r),r.map(o=>{if(!Number.isSafeInteger(o)||o<0||o>=t)throw new Error(`alphabet.encode: digit index outside alphabet "${o}". Allowed: ${e}`);return n[o]})),decode:r=>(wp(r),r.map(o=>{$d("alphabet.decode",o);let a=i.get(o);if(a===void 0)throw new Error(`Unknown letter: "${o}". Allowed: ${e}`);return a}))}}function Po(e=""){return $d("join",e),{encode:n=>(bp("join.decode",n),n.join(e)),decode:n=>($d("join.decode",n),n.split(e))}}function Jl(e,n="="){return Ou(e),$d("padding",n),{encode(t){for(bp("padding.encode",t);t.length*e%8;)t.push(n);return t},decode(t){bp("padding.decode",t);let i=t.length;if(i*e%8)throw new Error("padding: invalid, string should have whole number of bytes");for(;i>0&&t[i-1]===n;i--)if((i-1)*e%8===0)throw new Error("padding: invalid, string has too much padding");return t.slice(0,i)}}}function Px(e){return WB(e),{encode:n=>n,decode:n=>e(n)}}function GB(e,n,t){if(n<2)throw new Error(`convertRadix: invalid from=${n}, base cannot be less than 2`);if(t<2)throw new Error(`convertRadix: invalid to=${t}, base cannot be less than 2`);if(wp(e),!e.length)return[];let i=0,r=[],o=Array.from(e,s=>{if(Ou(s),s<0||s>=n)throw new Error(`invalid integer: ${s}`);return s}),a=o.length;for(;;){let s=0,d=!0;for(let A=i;A<a;A++){let l=o[A],p=n*s,g=p+l;if(!Number.isSafeInteger(g)||p/n!==s||g-l!==p)throw new Error("convertRadix: carry overflow");let h=g/t;s=g%t;let B=Math.floor(h);if(o[A]=B,!Number.isSafeInteger(B)||B*t+s!==g)throw new Error("convertRadix: carry overflow");if(d)B?d=!1:i=A;else continue}if(r.push(s),d)break}for(let s=0;s<e.length-1&&e[s]===0;s++)r.push(0);return r.reverse()}var Nx=(e,n)=>n===0?e:Nx(n,e%n),Rp=(e,n)=>e+(n-Nx(e,n)),Qp=(()=>{let e=[];for(let n=0;n<40;n++)e.push(2**n);return e})();function Pp(e,n,t,i){if(wp(e),n<=0||n>32)throw new Error(`convertRadix2: wrong from=${n}`);if(t<=0||t>32)throw new Error(`convertRadix2: wrong to=${t}`);if(Rp(n,t)>32)throw new Error(`convertRadix2: carry overflow from=${n} to=${t} carryBits=${Rp(n,t)}`);let r=0,o=0,a=Qp[n],s=Qp[t]-1,d=[];for(let A of e){if(Ou(A),A>=a)throw new Error(`convertRadix2: invalid data word=${A} from=${n}`);if(r=r<<n|A,o+n>32)throw new Error(`convertRadix2: carry overflow pos=${o} from=${n}`);for(o+=n;o>=t;o-=t)d.push((r>>o-t&s)>>>0);let l=Qp[o];if(l===void 0)throw new Error("invalid carry");r&=l-1}if(r=r<<t-o&s,!i&&o>=n)throw new Error("Excess padding");if(!i&&r>0)throw new Error(`Non-zero padding: ${r}`);return i&&o>0&&d.push(r>>>0),d}function vx(e){Ou(e);let n=2**8;return{encode:t=>{if(!Hc(t))throw new Error("radix.encode input should be Uint8Array");return GB(Array.from(t),n,e)},decode:t=>(LB("radix.decode",t),Uint8Array.from(GB(t,e,n)))}}function $o(e,n=!1){if(Ou(e),e<=0||e>32)throw new Error("radix2: bits should be in (0..32]");if(Rp(8,e)>32||Rp(e,8)>32)throw new Error("radix2: carry overflow");return{encode:t=>{if(!Hc(t))throw new Error("radix2.encode input should be Uint8Array");return Pp(Array.from(t),8,e,!n)},decode:t=>(LB("radix2.decode",t),Uint8Array.from(Pp(t,e,8,n)))}}function Ex(e){return WB(e),function(...n){try{return e.apply(null,n)}catch{}}}function Ox(e,n){return Ou(e),WB(n),{encode(t){if(!Hc(t))throw new Error("checksum.encode: input should be Uint8Array");let i=n(t).slice(0,e),r=new Uint8Array(t.length+e);return r.set(t),r.set(i,t.length),r},decode(t){if(!Hc(t))throw new Error("checksum.decode: input should be Uint8Array");let i=t.slice(0,-e),r=t.slice(-e),o=n(i).slice(0,e);for(let a=0;a<e;a++)if(o[a]!==r[a])throw new Error("Invalid checksum");return i}}}Te.utils={alphabet:Ro,chain:ao,checksum:Ox,convertRadix:GB,convertRadix2:Pp,radix:vx,radix2:$o,join:Po,padding:Jl};Te.base16=ao($o(4),Ro("0123456789ABCDEF"),Po(""));Te.base32=ao($o(5),Ro("ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"),Jl(5),Po(""));Te.base32nopad=ao($o(5),Ro("ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"),Po(""));Te.base32hex=ao($o(5),Ro("0123456789ABCDEFGHIJKLMNOPQRSTUV"),Jl(5),Po(""));Te.base32hexnopad=ao($o(5),Ro("0123456789ABCDEFGHIJKLMNOPQRSTUV"),Po(""));Te.base32crockford=ao($o(5),Ro("0123456789ABCDEFGHJKMNPQRSTVWXYZ"),Po(""),Px(e=>e.toUpperCase().replace(/O/g,"0").replace(/[IL]/g,"1")));var Dx=typeof Uint8Array.from([]).toBase64=="function"&&typeof Uint8Array.fromBase64=="function",Ux=(e,n)=>{$d("base64",e);let t=n?/^[A-Za-z0-9=_-]+$/:/^[A-Za-z0-9=+/]+$/,i=n?"base64url":"base64";if(e.length>0&&!t.test(e))throw new Error("invalid base64");return Uint8Array.fromBase64(e,{alphabet:i,lastChunkHandling:"strict"})};Te.base64=Dx?{encode(e){return KB(e),e.toBase64()},decode(e){return Ux(e,!1)}}:ao($o(6),Ro("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"),Jl(6),Po(""));Te.base64nopad=ao($o(6),Ro("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"),Po(""));Te.base64url=Dx?{encode(e){return KB(e),e.toBase64({alphabet:"base64url"})},decode(e){return Ux(e,!0)}}:ao($o(6),Ro("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"),Jl(6),Po(""));Te.base64urlnopad=ao($o(6),Ro("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"),Po(""));var YB=e=>ao(vx(58),Ro(e),Po(""));Te.base58=YB("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz");Te.base58flickr=YB("123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ");Te.base58xrp=YB("rpshnaf39wBUDNEGHJKLM4PQRST7VWXYZ2bcdeCg65jkm8oFqi1tuvAxyz");var Qx=[0,2,3,5,6,7,9,10,11];Te.base58xmr={encode(e){let n="";for(let t=0;t<e.length;t+=8){let i=e.subarray(t,t+8);n+=Te.base58.encode(i).padStart(Qx[i.length],"1")}return n},decode(e){let n=[];for(let t=0;t<e.length;t+=11){let i=e.slice(t,t+11),r=Qx.indexOf(i.length),o=Te.base58.decode(i);for(let a=0;a<o.length-r;a++)if(o[a]!==0)throw new Error("base58xmr: wrong padding");n=n.concat(Array.from(o.slice(o.length-r)))}return Uint8Array.from(n)}};var iL=e=>ao(Ox(4,n=>e(e(n))),Te.base58);Te.createBase58check=iL;Te.base58check=Te.createBase58check;var VB=ao(Ro("qpzry9x8gf2tvdw0s3jn54khce6mua7l"),Po("")),wx=[996825010,642813549,513874426,1027748829,705979059];function Tl(e){let n=e>>25,t=(e&33554431)<<5;for(let i=0;i<wx.length;i++)(n>>i&1)===1&&(t^=wx[i]);return t}function bx(e,n,t=1){let i=e.length,r=1;for(let o=0;o<i;o++){let a=e.charCodeAt(o);if(a<33||a>126)throw new Error(`Invalid prefix (${e})`);r=Tl(r)^a>>5}r=Tl(r);for(let o=0;o<i;o++)r=Tl(r)^e.charCodeAt(o)&31;for(let o of n)r=Tl(r)^o;for(let o=0;o<6;o++)r=Tl(r);return r^=t,VB.encode(Pp([r%Qp[30]],30,5,!1))}function xx(e){let n=e==="bech32"?1:734539939,t=$o(5),i=t.decode,r=t.encode,o=Ex(i);function a(p,g,h=90){$d("bech32.encode prefix",p),Hc(g)&&(g=Array.from(g)),LB("bech32.encode",g);let B=p.length;if(B===0)throw new TypeError(`Invalid prefix length ${B}`);let C=B+7+g.length;if(h!==!1&&C>h)throw new TypeError(`Length ${C} exceeds limit ${h}`);let Q=p.toLowerCase(),E=bx(Q,g,n);return`${Q}1${VB.encode(g)}${E}`}function s(p,g=90){$d("bech32.decode input",p);let h=p.length;if(h<8||g!==!1&&h>g)throw new TypeError(`invalid string length: ${h} (${p}). Expected (8..${g})`);let B=p.toLowerCase();if(p!==B&&p!==p.toUpperCase())throw new Error("String must be lowercase or uppercase");let C=B.lastIndexOf("1");if(C===0||C===-1)throw new Error('Letter "1" must be present between prefix and data only');let Q=B.slice(0,C),E=B.slice(C+1);if(E.length<6)throw new Error("Data must be at least 6 characters long");let D=VB.decode(E).slice(0,-6),R=bx(Q,D,n);if(!E.endsWith(R))throw new Error(`Invalid checksum in ${p}: expected "${R}"`);return{prefix:Q,words:D}}let d=Ex(s);function A(p){let{prefix:g,words:h}=s(p,!1);return{prefix:g,words:h,bytes:i(h)}}function l(p,g){return a(p,r(g))}return{encode:a,decode:s,encodeFromBytes:l,decodeToBytes:A,decodeUnsafe:d,fromWords:i,fromWordsUnsafe:o,toWords:r}}Te.bech32=xx("bech32");Te.bech32m=xx("bech32m");Te.utf8={encode:e=>new TextDecoder().decode(e),decode:e=>new TextEncoder().encode(e)};var oL=typeof Uint8Array.from([]).toHex=="function"&&typeof Uint8Array.fromHex=="function",aL={encode(e){return KB(e),e.toHex()},decode(e){return $d("hex",e),Uint8Array.fromHex(e)}};Te.hex=oL?aL:ao($o(4),Ro("0123456789abcdef"),Po(""),Px(e=>{if(typeof e!="string"||e.length%2!==0)throw new TypeError(`hex.decode: expected string, got ${typeof e} with length ${e.length}`);return e.toLowerCase()}));var Np={utf8:Te.utf8,hex:Te.hex,base16:Te.base16,base32:Te.base32,base64:Te.base64,base64url:Te.base64url,base58:Te.base58,base58xmr:Te.base58xmr},Tx="Invalid encoding type. Available types: utf8, hex, base16, base32, base64, base64url, base58, base58xmr",sL=(e,n)=>{if(typeof e!="string"||!Np.hasOwnProperty(e))throw new TypeError(Tx);if(!Hc(n))throw new TypeError("bytesToString() expects Uint8Array");return Np[e].encode(n)};Te.bytesToString=sL;Te.str=Te.bytesToString;var dL=(e,n)=>{if(!Np.hasOwnProperty(e))throw new TypeError(Tx);if(typeof n!="string")throw new TypeError("stringToBytes() expects string");return Np[e].decode(n)};Te.stringToBytes=dL;Te.bytes=Te.stringToBytes});var Kx=I(jd=>{"use strict";Object.defineProperty(jd,"__esModule",{value:!0});jd.generateMnemonic=uL;jd.mnemonicToEntropy=_x;jd.entropyToMnemonic=Gx;jd.validateMnemonic=lL;jd.mnemonicToSeed=fL;jd.mnemonicToSeedSync=gL;var Fx=ex(),ZB=xl(),zB=Xo(),vp=Jx(),cL=e=>e[0]==="\u3042\u3044\u3053\u304F\u3057\u3093";function qx(e){if(typeof e!="string")throw new TypeError("invalid mnemonic type: "+typeof e);return e.normalize("NFKD")}function XB(e){let n=qx(e),t=n.split(" ");if(![12,15,18,21,24].includes(t.length))throw new Error("Invalid mnemonic");return{nfkd:n,words:t}}function Hx(e){(0,zB.abytes)(e,16,20,24,28,32)}function uL(e,n=128){if((0,zB.anumber)(n),n%32!==0||n>256)throw new TypeError("Invalid entropy");return Gx((0,zB.randomBytes)(n/8),e)}var AL=e=>{let n=8-e.length/4;return new Uint8Array([(0,ZB.sha256)(e)[0]>>n<<n])};function Mx(e){if(!Array.isArray(e)||e.length!==2048||typeof e[0]!="string")throw new Error("Wordlist: expected array of 2048 strings");return e.forEach(n=>{if(typeof n!="string")throw new Error("wordlist: non-string element: "+n)}),vp.utils.chain(vp.utils.checksum(1,AL),vp.utils.radix2(11,!0),vp.utils.alphabet(e))}function _x(e,n){let{words:t}=XB(e),i=Mx(n).decode(t);return Hx(i),i}function Gx(e,n){return Hx(e),Mx(n).encode(e).join(cL(n)?"\u3000":" ")}function lL(e,n){try{_x(e,n)}catch{return!1}return!0}var Vx=e=>qx("mnemonic"+e);function fL(e,n=""){return(0,Fx.pbkdf2Async)(ZB.sha512,XB(e).nfkd,Vx(n),{c:2048,dkLen:64})}function gL(e,n=""){return(0,Fx.pbkdf2)(ZB.sha512,XB(e).nfkd,Vx(n),{c:2048,dkLen:64})}});var Wx=I(Op=>{"use strict";Object.defineProperty(Op,"__esModule",{value:!0});Op.wordlist=void 0;Op.wordlist=`abandon
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
`)});var Lx=I(Du=>{"use strict";Object.defineProperty(Du,"__esModule",{value:!0});Du.Bip39=Du.EnglishMnemonic=void 0;var pL=Jn(),Dp=Kx(),Up=Wx(),xp=class{static wordlist=Up.wordlist;data;constructor(n){let t=(0,Dp.mnemonicToEntropy)(n,Up.wordlist);this.data=n}toString(){return this.data}};Du.EnglishMnemonic=xp;var $B=class{static encode(n){return new xp((0,Dp.entropyToMnemonic)(n,Up.wordlist))}static decode(n){return(0,pL.fixUint8Array)((0,Dp.mnemonicToEntropy)(n.toString(),Up.wordlist))}static async mnemonicToSeed(n,t){return await(0,Dp.mnemonicToSeed)(n.toString(),t)}};Du.Bip39=$B});var Bd=I(fn=>{"use strict";Object.defineProperty(fn,"__esModule",{value:!0});fn.notImplemented=fn.bitMask=fn.utf8ToBytes=fn.randomBytes=fn.isBytes=fn.hexToBytes=fn.concatBytes=fn.bytesToUtf8=fn.bytesToHex=fn.anumber=fn.abytes=void 0;fn.abool=IL;fn._abool2=hL;fn._abytes2=yL;fn.numberToHexUnpadded=Yx;fn.hexToNumber=em;fn.bytesToNumberBE=BL;fn.bytesToNumberLE=mL;fn.numberToBytesBE=zx;fn.numberToBytesLE=CL;fn.numberToVarBytesBE=SL;fn.ensureBytes=kL;fn.equalBytes=EL;fn.copyBytes=QL;fn.asciiToBytes=wL;fn.inRange=Zx;fn.aInRange=bL;fn.bitLen=RL;fn.bitGet=PL;fn.bitSet=NL;fn.createHmacDrbg=OL;fn.validateObject=UL;fn.isHash=xL;fn._validateObject=TL;fn.memoized=FL;var Cs=Xo(),yd=Xo();Object.defineProperty(fn,"abytes",{enumerable:!0,get:function(){return yd.abytes}});Object.defineProperty(fn,"anumber",{enumerable:!0,get:function(){return yd.anumber}});Object.defineProperty(fn,"bytesToHex",{enumerable:!0,get:function(){return yd.bytesToHex}});Object.defineProperty(fn,"bytesToUtf8",{enumerable:!0,get:function(){return yd.bytesToUtf8}});Object.defineProperty(fn,"concatBytes",{enumerable:!0,get:function(){return yd.concatBytes}});Object.defineProperty(fn,"hexToBytes",{enumerable:!0,get:function(){return yd.hexToBytes}});Object.defineProperty(fn,"isBytes",{enumerable:!0,get:function(){return yd.isBytes}});Object.defineProperty(fn,"randomBytes",{enumerable:!0,get:function(){return yd.randomBytes}});Object.defineProperty(fn,"utf8ToBytes",{enumerable:!0,get:function(){return yd.utf8ToBytes}});var Tp=BigInt(0),Fl=BigInt(1);function IL(e,n){if(typeof n!="boolean")throw new Error(e+" boolean expected, got "+n)}function hL(e,n=""){if(typeof e!="boolean"){let t=n&&`"${n}"`;throw new Error(t+"expected boolean, got type="+typeof e)}return e}function yL(e,n,t=""){let i=(0,Cs.isBytes)(e),r=e?.length,o=n!==void 0;if(!i||o&&r!==n){let a=t&&`"${t}" `,s=o?` of length ${n}`:"",d=i?`length=${r}`:`type=${typeof e}`;throw new Error(a+"expected Uint8Array"+s+", got "+d)}return e}function Yx(e){let n=e.toString(16);return n.length&1?"0"+n:n}function em(e){if(typeof e!="string")throw new Error("hex string expected, got "+typeof e);return e===""?Tp:BigInt("0x"+e)}function BL(e){return em((0,Cs.bytesToHex)(e))}function mL(e){return(0,Cs.abytes)(e),em((0,Cs.bytesToHex)(Uint8Array.from(e).reverse()))}function zx(e,n){return(0,Cs.hexToBytes)(e.toString(16).padStart(n*2,"0"))}function CL(e,n){return zx(e,n).reverse()}function SL(e){return(0,Cs.hexToBytes)(Yx(e))}function kL(e,n,t){let i;if(typeof n=="string")try{i=(0,Cs.hexToBytes)(n)}catch(o){throw new Error(e+" must be hex string or Uint8Array, cause: "+o)}else if((0,Cs.isBytes)(n))i=Uint8Array.from(n);else throw new Error(e+" must be hex string or Uint8Array");let r=i.length;if(typeof t=="number"&&r!==t)throw new Error(e+" of length "+t+" expected, got "+r);return i}function EL(e,n){if(e.length!==n.length)return!1;let t=0;for(let i=0;i<e.length;i++)t|=e[i]^n[i];return t===0}function QL(e){return Uint8Array.from(e)}function wL(e){return Uint8Array.from(e,(n,t)=>{let i=n.charCodeAt(0);if(n.length!==1||i>127)throw new Error(`string contains non-ASCII character "${e[t]}" with code ${i} at position ${t}`);return i})}var jB=e=>typeof e=="bigint"&&Tp<=e;function Zx(e,n,t){return jB(e)&&jB(n)&&jB(t)&&n<=e&&e<t}function bL(e,n,t,i){if(!Zx(n,t,i))throw new Error("expected valid "+e+": "+t+" <= n < "+i+", got "+n)}function RL(e){let n;for(n=0;e>Tp;e>>=Fl,n+=1);return n}function PL(e,n){return e>>BigInt(n)&Fl}function NL(e,n,t){return e|(t?Fl:Tp)<<BigInt(n)}var vL=e=>(Fl<<BigInt(e))-Fl;fn.bitMask=vL;function OL(e,n,t){if(typeof e!="number"||e<2)throw new Error("hashLen must be a number");if(typeof n!="number"||n<2)throw new Error("qByteLen must be a number");if(typeof t!="function")throw new Error("hmacFn must be a function");let i=h=>new Uint8Array(h),r=h=>Uint8Array.of(h),o=i(e),a=i(e),s=0,d=()=>{o.fill(1),a.fill(0),s=0},A=(...h)=>t(a,o,...h),l=(h=i(0))=>{a=A(r(0),h),o=A(),h.length!==0&&(a=A(r(1),h),o=A())},p=()=>{if(s++>=1e3)throw new Error("drbg: tried 1000 values");let h=0,B=[];for(;h<n;){o=A();let C=o.slice();B.push(C),h+=o.length}return(0,Cs.concatBytes)(...B)};return(h,B)=>{d(),l(h);let C;for(;!(C=B(p()));)l();return d(),C}}var DL={bigint:e=>typeof e=="bigint",function:e=>typeof e=="function",boolean:e=>typeof e=="boolean",string:e=>typeof e=="string",stringOrUint8Array:e=>typeof e=="string"||(0,Cs.isBytes)(e),isSafeInteger:e=>Number.isSafeInteger(e),array:e=>Array.isArray(e),field:(e,n)=>n.Fp.isValid(e),hash:e=>typeof e=="function"&&Number.isSafeInteger(e.outputLen)};function UL(e,n,t={}){let i=(r,o,a)=>{let s=DL[o];if(typeof s!="function")throw new Error("invalid validator function");let d=e[r];if(!(a&&d===void 0)&&!s(d,e))throw new Error("param "+String(r)+" is invalid. Expected "+o+", got "+d)};for(let[r,o]of Object.entries(n))i(r,o,!1);for(let[r,o]of Object.entries(t))i(r,o,!0);return e}function xL(e){return typeof e=="function"&&Number.isSafeInteger(e.outputLen)}function TL(e,n,t={}){if(!e||typeof e!="object")throw new Error("expected valid options object");function i(r,o,a){let s=e[r];if(a&&s===void 0)return;let d=typeof s;if(d!==o||s===null)throw new Error(`param "${r}" is invalid: expected ${o}, got ${d}`)}Object.entries(n).forEach(([r,o])=>i(r,o,!1)),Object.entries(t).forEach(([r,o])=>i(r,o,!0))}var JL=()=>{throw new Error("not implemented")};fn.notImplemented=JL;function FL(e){let n=new WeakMap;return(t,...i)=>{let r=n.get(t);if(r!==void 0)return r;let o=e(t,...i);return n.set(t,o),o}}});var ec=I(lr=>{"use strict";Object.defineProperty(lr,"__esModule",{value:!0});lr.isNegativeLE=void 0;lr.mod=No;lr.pow=ML;lr.pow2=_L;lr.invert=Jp;lr.tonelliShanks=tm;lr.FpSqrt=rT;lr.validateField=LL;lr.FpPow=rm;lr.FpInvertBatch=iT;lr.FpDiv=YL;lr.FpLegendre=Fp;lr.FpIsSquare=zL;lr.nLength=im;lr.Field=qp;lr.FpSqrtOdd=ZL;lr.FpSqrtEven=XL;lr.hashToPrivateScalar=$L;lr.getFieldBytesLength=om;lr.getMinHashLength=oT;lr.mapHashToField=jL;var vo=Bd(),so=BigInt(0),oi=BigInt(1),Mc=BigInt(2),Xx=BigInt(3),$x=BigInt(4),jx=BigInt(5),qL=BigInt(7),eT=BigInt(8),HL=BigInt(9),nT=BigInt(16);function No(e,n){let t=e%n;return t>=so?t:n+t}function ML(e,n,t){return rm(qp(t),e,n)}function _L(e,n,t){let i=e;for(;n-- >so;)i*=i,i%=t;return i}function Jp(e,n){if(e===so)throw new Error("invert: expected non-zero number");if(n<=so)throw new Error("invert: expected positive modulus, got "+n);let t=No(e,n),i=n,r=so,o=oi,a=oi,s=so;for(;t!==so;){let A=i/t,l=i%t,p=r-a*A,g=o-s*A;i=t,t=l,r=a,o=s,a=p,s=g}if(i!==oi)throw new Error("invert: does not exist");return No(r,n)}function nm(e,n,t){if(!e.eql(e.sqr(n),t))throw new Error("Cannot find square root")}function tT(e,n){let t=(e.ORDER+oi)/$x,i=e.pow(n,t);return nm(e,i,n),i}function GL(e,n){let t=(e.ORDER-jx)/eT,i=e.mul(n,Mc),r=e.pow(i,t),o=e.mul(n,r),a=e.mul(e.mul(o,Mc),r),s=e.mul(o,e.sub(a,e.ONE));return nm(e,s,n),s}function VL(e){let n=qp(e),t=tm(e),i=t(n,n.neg(n.ONE)),r=t(n,i),o=t(n,n.neg(i)),a=(e+qL)/nT;return(s,d)=>{let A=s.pow(d,a),l=s.mul(A,i),p=s.mul(A,r),g=s.mul(A,o),h=s.eql(s.sqr(l),d),B=s.eql(s.sqr(p),d);A=s.cmov(A,l,h),l=s.cmov(g,p,B);let C=s.eql(s.sqr(l),d),Q=s.cmov(A,l,C);return nm(s,Q,d),Q}}function tm(e){if(e<Xx)throw new Error("sqrt is not defined for small field");let n=e-oi,t=0;for(;n%Mc===so;)n/=Mc,t++;let i=Mc,r=qp(e);for(;Fp(r,i)===1;)if(i++>1e3)throw new Error("Cannot find square root: probably non-prime P");if(t===1)return tT;let o=r.pow(i,n),a=(n+oi)/Mc;return function(d,A){if(d.is0(A))return A;if(Fp(d,A)!==1)throw new Error("Cannot find square root");let l=t,p=d.mul(d.ONE,o),g=d.pow(A,n),h=d.pow(A,a);for(;!d.eql(g,d.ONE);){if(d.is0(g))return d.ZERO;let B=1,C=d.sqr(g);for(;!d.eql(C,d.ONE);)if(B++,C=d.sqr(C),B===l)throw new Error("Cannot find square root");let Q=oi<<BigInt(l-B-1),E=d.pow(p,Q);l=B,p=d.sqr(E),g=d.mul(g,p),h=d.mul(h,E)}return h}}function rT(e){return e%$x===Xx?tT:e%eT===jx?GL:e%nT===HL?VL(e):tm(e)}var KL=(e,n)=>(No(e,n)&oi)===oi;lr.isNegativeLE=KL;var WL=["create","isValid","is0","neg","inv","sqrt","sqr","eql","add","sub","mul","pow","div","addN","subN","mulN","sqrN"];function LL(e){let n={ORDER:"bigint",MASK:"bigint",BYTES:"number",BITS:"number"},t=WL.reduce((i,r)=>(i[r]="function",i),n);return(0,vo._validateObject)(e,t),e}function rm(e,n,t){if(t<so)throw new Error("invalid exponent, negatives unsupported");if(t===so)return e.ONE;if(t===oi)return n;let i=e.ONE,r=n;for(;t>so;)t&oi&&(i=e.mul(i,r)),r=e.sqr(r),t>>=oi;return i}function iT(e,n,t=!1){let i=new Array(n.length).fill(t?e.ZERO:void 0),r=n.reduce((a,s,d)=>e.is0(s)?a:(i[d]=a,e.mul(a,s)),e.ONE),o=e.inv(r);return n.reduceRight((a,s,d)=>e.is0(s)?a:(i[d]=e.mul(a,i[d]),e.mul(a,s)),o),i}function YL(e,n,t){return e.mul(n,typeof t=="bigint"?Jp(t,e.ORDER):e.inv(t))}function Fp(e,n){let t=(e.ORDER-oi)/Mc,i=e.pow(n,t),r=e.eql(i,e.ONE),o=e.eql(i,e.ZERO),a=e.eql(i,e.neg(e.ONE));if(!r&&!o&&!a)throw new Error("invalid Legendre symbol result");return r?1:o?0:-1}function zL(e,n){return Fp(e,n)===1}function im(e,n){n!==void 0&&(0,vo.anumber)(n);let t=n!==void 0?n:e.toString(2).length,i=Math.ceil(t/8);return{nBitLength:t,nByteLength:i}}function qp(e,n,t=!1,i={}){if(e<=so)throw new Error("invalid field: expected ORDER > 0, got "+e);let r,o,a=!1,s;if(typeof n=="object"&&n!=null){if(i.sqrt||t)throw new Error("cannot specify opts in two arguments");let g=n;g.BITS&&(r=g.BITS),g.sqrt&&(o=g.sqrt),typeof g.isLE=="boolean"&&(t=g.isLE),typeof g.modFromBytes=="boolean"&&(a=g.modFromBytes),s=g.allowedLengths}else typeof n=="number"&&(r=n),i.sqrt&&(o=i.sqrt);let{nBitLength:d,nByteLength:A}=im(e,r);if(A>2048)throw new Error("invalid field: expected ORDER of <= 2048 bytes");let l,p=Object.freeze({ORDER:e,isLE:t,BITS:d,BYTES:A,MASK:(0,vo.bitMask)(d),ZERO:so,ONE:oi,allowedLengths:s,create:g=>No(g,e),isValid:g=>{if(typeof g!="bigint")throw new Error("invalid field element: expected bigint, got "+typeof g);return so<=g&&g<e},is0:g=>g===so,isValidNot0:g=>!p.is0(g)&&p.isValid(g),isOdd:g=>(g&oi)===oi,neg:g=>No(-g,e),eql:(g,h)=>g===h,sqr:g=>No(g*g,e),add:(g,h)=>No(g+h,e),sub:(g,h)=>No(g-h,e),mul:(g,h)=>No(g*h,e),pow:(g,h)=>rm(p,g,h),div:(g,h)=>No(g*Jp(h,e),e),sqrN:g=>g*g,addN:(g,h)=>g+h,subN:(g,h)=>g-h,mulN:(g,h)=>g*h,inv:g=>Jp(g,e),sqrt:o||(g=>(l||(l=rT(e)),l(p,g))),toBytes:g=>t?(0,vo.numberToBytesLE)(g,A):(0,vo.numberToBytesBE)(g,A),fromBytes:(g,h=!0)=>{if(s){if(!s.includes(g.length)||g.length>A)throw new Error("Field.fromBytes: expected "+s+" bytes, got "+g.length);let C=new Uint8Array(A);C.set(g,t?0:C.length-g.length),g=C}if(g.length!==A)throw new Error("Field.fromBytes: expected "+A+" bytes, got "+g.length);let B=t?(0,vo.bytesToNumberLE)(g):(0,vo.bytesToNumberBE)(g);if(a&&(B=No(B,e)),!h&&!p.isValid(B))throw new Error("invalid field element: outside of range 0..ORDER");return B},invertBatch:g=>iT(p,g),cmov:(g,h,B)=>B?h:g});return Object.freeze(p)}function ZL(e,n){if(!e.isOdd)throw new Error("Field doesn't have isOdd");let t=e.sqrt(n);return e.isOdd(t)?t:e.neg(t)}function XL(e,n){if(!e.isOdd)throw new Error("Field doesn't have isOdd");let t=e.sqrt(n);return e.isOdd(t)?e.neg(t):t}function $L(e,n,t=!1){e=(0,vo.ensureBytes)("privateHash",e);let i=e.length,r=im(n).nByteLength+8;if(r<24||i<r||i>1024)throw new Error("hashToPrivateScalar: expected "+r+"-1024 bytes of input, got "+i);let o=t?(0,vo.bytesToNumberLE)(e):(0,vo.bytesToNumberBE)(e);return No(o,n-oi)+oi}function om(e){if(typeof e!="bigint")throw new Error("field order must be bigint");let n=e.toString(2).length;return Math.ceil(n/8)}function oT(e){let n=om(e);return n+Math.ceil(n/2)}function jL(e,n,t=!1){let i=e.length,r=om(n),o=oT(n);if(i<16||i<o||i>1024)throw new Error("expected "+o+"-1024 bytes of input, got "+i);let a=t?(0,vo.bytesToNumberLE)(e):(0,vo.bytesToNumberBE)(e),s=No(a,n-oi)+oi;return t?(0,vo.numberToBytesLE)(s,r):(0,vo.numberToBytesBE)(s,r)}});var Hp=I(Ga=>{"use strict";Object.defineProperty(Ga,"__esModule",{value:!0});Ga.wNAF=void 0;Ga.negateCt=cm;Ga.normalizeZ=e5;Ga.mulEndoUnsafe=n5;Ga.pippenger=t5;Ga.precomputeMSMUnsafe=r5;Ga.validateBasic=i5;Ga._createCurveFields=o5;var ql=Bd(),Hl=ec(),Uu=BigInt(0),_c=BigInt(1);function cm(e,n){let t=n.negate();return e?t:n}function e5(e,n){let t=(0,Hl.FpInvertBatch)(e.Fp,n.map(i=>i.Z));return n.map((i,r)=>e.fromAffine(i.toAffine(t[r])))}function Am(e,n){if(!Number.isSafeInteger(e)||e<=0||e>n)throw new Error("invalid window size, expected [1.."+n+"], got W="+e)}function am(e,n){Am(e,n);let t=Math.ceil(n/e)+1,i=2**(e-1),r=2**e,o=(0,ql.bitMask)(e),a=BigInt(e);return{windows:t,windowSize:i,mask:o,maxNumber:r,shiftBy:a}}function aT(e,n,t){let{windowSize:i,mask:r,maxNumber:o,shiftBy:a}=t,s=Number(e&r),d=e>>a;s>i&&(s-=o,d+=_c);let A=n*i,l=A+Math.abs(s)-1,p=s===0,g=s<0,h=n%2!==0;return{nextN:d,offset:l,isZero:p,isNeg:g,isNegF:h,offsetF:A}}function cT(e,n){if(!Array.isArray(e))throw new Error("array expected");e.forEach((t,i)=>{if(!(t instanceof n))throw new Error("invalid point at index "+i)})}function uT(e,n){if(!Array.isArray(e))throw new Error("array of scalars expected");e.forEach((t,i)=>{if(!n.isValid(t))throw new Error("invalid scalar at index "+i)})}var sm=new WeakMap,AT=new WeakMap;function dm(e){return AT.get(e)||1}function sT(e){if(e!==Uu)throw new Error("invalid wNAF")}var um=class{constructor(n,t){this.BASE=n.BASE,this.ZERO=n.ZERO,this.Fn=n.Fn,this.bits=t}_unsafeLadder(n,t,i=this.ZERO){let r=n;for(;t>Uu;)t&_c&&(i=i.add(r)),r=r.double(),t>>=_c;return i}precomputeWindow(n,t){let{windows:i,windowSize:r}=am(t,this.bits),o=[],a=n,s=a;for(let d=0;d<i;d++){s=a,o.push(s);for(let A=1;A<r;A++)s=s.add(a),o.push(s);a=s.double()}return o}wNAF(n,t,i){if(!this.Fn.isValid(i))throw new Error("invalid scalar");let r=this.ZERO,o=this.BASE,a=am(n,this.bits);for(let s=0;s<a.windows;s++){let{nextN:d,offset:A,isZero:l,isNeg:p,isNegF:g,offsetF:h}=aT(i,s,a);i=d,l?o=o.add(cm(g,t[h])):r=r.add(cm(p,t[A]))}return sT(i),{p:r,f:o}}wNAFUnsafe(n,t,i,r=this.ZERO){let o=am(n,this.bits);for(let a=0;a<o.windows&&i!==Uu;a++){let{nextN:s,offset:d,isZero:A,isNeg:l}=aT(i,a,o);if(i=s,!A){let p=t[d];r=r.add(l?p.negate():p)}}return sT(i),r}getPrecomputes(n,t,i){let r=sm.get(t);return r||(r=this.precomputeWindow(t,n),n!==1&&(typeof i=="function"&&(r=i(r)),sm.set(t,r))),r}cached(n,t,i){let r=dm(n);return this.wNAF(r,this.getPrecomputes(r,n,i),t)}unsafe(n,t,i,r){let o=dm(n);return o===1?this._unsafeLadder(n,t,r):this.wNAFUnsafe(o,this.getPrecomputes(o,n,i),t,r)}createCache(n,t){Am(t,this.bits),AT.set(n,t),sm.delete(n)}hasCache(n){return dm(n)!==1}};Ga.wNAF=um;function n5(e,n,t,i){let r=n,o=e.ZERO,a=e.ZERO;for(;t>Uu||i>Uu;)t&_c&&(o=o.add(r)),i&_c&&(a=a.add(r)),r=r.double(),t>>=_c,i>>=_c;return{p1:o,p2:a}}function t5(e,n,t,i){cT(t,e),uT(i,n);let r=t.length,o=i.length;if(r!==o)throw new Error("arrays of points and scalars must have equal length");let a=e.ZERO,s=(0,ql.bitLen)(BigInt(r)),d=1;s>12?d=s-3:s>4?d=s-2:s>0&&(d=2);let A=(0,ql.bitMask)(d),l=new Array(Number(A)+1).fill(a),p=Math.floor((n.BITS-1)/d)*d,g=a;for(let h=p;h>=0;h-=d){l.fill(a);for(let C=0;C<o;C++){let Q=i[C],E=Number(Q>>BigInt(h)&A);l[E]=l[E].add(t[C])}let B=a;for(let C=l.length-1,Q=a;C>0;C--)Q=Q.add(l[C]),B=B.add(Q);if(g=g.add(B),h!==0)for(let C=0;C<d;C++)g=g.double()}return g}function r5(e,n,t,i){Am(i,n.BITS),cT(t,e);let r=e.ZERO,o=2**i-1,a=Math.ceil(n.BITS/i),s=(0,ql.bitMask)(i),d=t.map(A=>{let l=[];for(let p=0,g=A;p<o;p++)l.push(g),g=g.add(A);return l});return A=>{if(uT(A,n),A.length>t.length)throw new Error("array of scalars must be smaller than array of points");let l=r;for(let p=0;p<a;p++){if(l!==r)for(let h=0;h<i;h++)l=l.double();let g=BigInt(a*i-(p+1)*i);for(let h=0;h<A.length;h++){let B=A[h],C=Number(B>>g&s);C&&(l=l.add(d[h][C-1]))}}return l}}function i5(e){return(0,Hl.validateField)(e.Fp),(0,ql.validateObject)(e,{n:"bigint",h:"bigint",Gx:"field",Gy:"field"},{nBitLength:"isSafeInteger",nByteLength:"isSafeInteger"}),Object.freeze({...(0,Hl.nLength)(e.n,e.nBitLength),...e,p:e.Fp.ORDER})}function dT(e,n,t){if(n){if(n.ORDER!==e)throw new Error("Field.ORDER must match order: Fp == p, Fn == n");return(0,Hl.validateField)(n),n}else return(0,Hl.Field)(e,{isLE:t})}function o5(e,n,t={},i){if(i===void 0&&(i=e==="edwards"),!n||typeof n!="object")throw new Error(`expected valid ${e} CURVE object`);for(let d of["p","n","h"]){let A=n[d];if(!(typeof A=="bigint"&&A>Uu))throw new Error(`CURVE.${d} must be positive bigint`)}let r=dT(n.p,t.Fp,i),o=dT(n.n,t.Fn,i),s=["Gx","Gy","a",e==="weierstrass"?"b":"d"];for(let d of s)if(!r.isValid(n[d]))throw new Error(`CURVE.${d} must be valid field element of CURVE.Fp`);return n=Object.freeze(Object.assign({},n)),{CURVE:n,Fp:r,Fn:o}}});var gT=I(Vc=>{"use strict";Object.defineProperty(Vc,"__esModule",{value:!0});Vc.PrimeEdwardsPoint=void 0;Vc.edwards=lT;Vc.eddsa=fT;Vc.twistedEdwards=A5;var Bt=Bd(),Gc=Hp(),a5=ec(),nc=BigInt(0),yi=BigInt(1),lm=BigInt(2),s5=BigInt(8);function d5(e,n,t,i){let r=e.sqr(t),o=e.sqr(i),a=e.add(e.mul(n.a,r),o),s=e.add(e.ONE,e.mul(n.d,e.mul(r,o)));return e.eql(a,s)}function lT(e,n={}){let t=(0,Gc._createCurveFields)("edwards",e,n,n.FpFnLE),{Fp:i,Fn:r}=t,o=t.CURVE,{h:a}=o;(0,Bt._validateObject)(n,{},{uvRatio:"function"});let s=lm<<BigInt(r.BYTES*8)-yi,d=Q=>i.create(Q),A=n.uvRatio||((Q,E)=>{try{return{isValid:!0,value:i.sqrt(i.div(Q,E))}}catch{return{isValid:!1,value:nc}}});if(!d5(i,o,o.Gx,o.Gy))throw new Error("bad curve params: generator point");function l(Q,E,D=!1){let R=D?yi:nc;return(0,Bt.aInRange)("coordinate "+Q,E,R,s),E}function p(Q){if(!(Q instanceof B))throw new Error("ExtendedPoint expected")}let g=(0,Bt.memoized)((Q,E)=>{let{X:D,Y:R,Z:K}=Q,he=Q.is0();E==null&&(E=he?s5:i.inv(K));let ke=d(D*E),Ve=d(R*E),qe=i.mul(K,E);if(he)return{x:nc,y:yi};if(qe!==yi)throw new Error("invZ was invalid");return{x:ke,y:Ve}}),h=(0,Bt.memoized)(Q=>{let{a:E,d:D}=o;if(Q.is0())throw new Error("bad point: ZERO");let{X:R,Y:K,Z:he,T:ke}=Q,Ve=d(R*R),qe=d(K*K),O=d(he*he),re=d(O*O),Be=d(Ve*E),ue=d(O*d(Be+qe)),k=d(re+d(D*d(Ve*qe)));if(ue!==k)throw new Error("bad point: equation left != right (1)");let w=d(R*K),P=d(he*ke);if(w!==P)throw new Error("bad point: equation left != right (2)");return!0});class B{constructor(E,D,R,K){this.X=l("x",E),this.Y=l("y",D),this.Z=l("z",R,!0),this.T=l("t",K),Object.freeze(this)}static CURVE(){return o}static fromAffine(E){if(E instanceof B)throw new Error("extended point not allowed");let{x:D,y:R}=E||{};return l("x",D),l("y",R),new B(D,R,yi,d(D*R))}static fromBytes(E,D=!1){let R=i.BYTES,{a:K,d:he}=o;E=(0,Bt.copyBytes)((0,Bt._abytes2)(E,R,"point")),(0,Bt._abool2)(D,"zip215");let ke=(0,Bt.copyBytes)(E),Ve=E[R-1];ke[R-1]=Ve&-129;let qe=(0,Bt.bytesToNumberLE)(ke),O=D?s:i.ORDER;(0,Bt.aInRange)("point.y",qe,nc,O);let re=d(qe*qe),Be=d(re-yi),ue=d(he*re-K),{isValid:k,value:w}=A(Be,ue);if(!k)throw new Error("bad point: invalid y coordinate");let P=(w&yi)===yi,H=(Ve&128)!==0;if(!D&&w===nc&&H)throw new Error("bad point: x=0 and x_0=1");return H!==P&&(w=d(-w)),B.fromAffine({x:w,y:qe})}static fromHex(E,D=!1){return B.fromBytes((0,Bt.ensureBytes)("point",E),D)}get x(){return this.toAffine().x}get y(){return this.toAffine().y}precompute(E=8,D=!0){return C.createCache(this,E),D||this.multiply(lm),this}assertValidity(){h(this)}equals(E){p(E);let{X:D,Y:R,Z:K}=this,{X:he,Y:ke,Z:Ve}=E,qe=d(D*Ve),O=d(he*K),re=d(R*Ve),Be=d(ke*K);return qe===O&&re===Be}is0(){return this.equals(B.ZERO)}negate(){return new B(d(-this.X),this.Y,this.Z,d(-this.T))}double(){let{a:E}=o,{X:D,Y:R,Z:K}=this,he=d(D*D),ke=d(R*R),Ve=d(lm*d(K*K)),qe=d(E*he),O=D+R,re=d(d(O*O)-he-ke),Be=qe+ke,ue=Be-Ve,k=qe-ke,w=d(re*ue),P=d(Be*k),H=d(re*k),W=d(ue*Be);return new B(w,P,W,H)}add(E){p(E);let{a:D,d:R}=o,{X:K,Y:he,Z:ke,T:Ve}=this,{X:qe,Y:O,Z:re,T:Be}=E,ue=d(K*qe),k=d(he*O),w=d(Ve*R*Be),P=d(ke*re),H=d((K+he)*(qe+O)-ue-k),W=P-w,oe=P+w,J=d(k-D*ue),ie=d(H*W),fe=d(oe*J),be=d(H*J),$n=d(W*oe);return new B(ie,fe,$n,be)}subtract(E){return this.add(E.negate())}multiply(E){if(!r.isValidNot0(E))throw new Error("invalid scalar: expected 1 <= sc < curve.n");let{p:D,f:R}=C.cached(this,E,K=>(0,Gc.normalizeZ)(B,K));return(0,Gc.normalizeZ)(B,[D,R])[0]}multiplyUnsafe(E,D=B.ZERO){if(!r.isValid(E))throw new Error("invalid scalar: expected 0 <= sc < curve.n");return E===nc?B.ZERO:this.is0()||E===yi?this:C.unsafe(this,E,R=>(0,Gc.normalizeZ)(B,R),D)}isSmallOrder(){return this.multiplyUnsafe(a).is0()}isTorsionFree(){return C.unsafe(this,o.n).is0()}toAffine(E){return g(this,E)}clearCofactor(){return a===yi?this:this.multiplyUnsafe(a)}toBytes(){let{x:E,y:D}=this.toAffine(),R=i.toBytes(D);return R[R.length-1]|=E&yi?128:0,R}toHex(){return(0,Bt.bytesToHex)(this.toBytes())}toString(){return`<Point ${this.is0()?"ZERO":this.toHex()}>`}get ex(){return this.X}get ey(){return this.Y}get ez(){return this.Z}get et(){return this.T}static normalizeZ(E){return(0,Gc.normalizeZ)(B,E)}static msm(E,D){return(0,Gc.pippenger)(B,r,E,D)}_setWindowSize(E){this.precompute(E)}toRawBytes(){return this.toBytes()}}B.BASE=new B(o.Gx,o.Gy,yi,d(o.Gx*o.Gy)),B.ZERO=new B(nc,yi,yi,nc),B.Fp=i,B.Fn=r;let C=new Gc.wNAF(B,r.BITS);return B.BASE.precompute(8),B}var fm=class{constructor(n){this.ep=n}static fromBytes(n){(0,Bt.notImplemented)()}static fromHex(n){(0,Bt.notImplemented)()}get x(){return this.toAffine().x}get y(){return this.toAffine().y}clearCofactor(){return this}assertValidity(){this.ep.assertValidity()}toAffine(n){return this.ep.toAffine(n)}toHex(){return(0,Bt.bytesToHex)(this.toBytes())}toString(){return this.toHex()}isTorsionFree(){return!0}isSmallOrder(){return!1}add(n){return this.assertSame(n),this.init(this.ep.add(n.ep))}subtract(n){return this.assertSame(n),this.init(this.ep.subtract(n.ep))}multiply(n){return this.init(this.ep.multiply(n))}multiplyUnsafe(n){return this.init(this.ep.multiplyUnsafe(n))}double(){return this.init(this.ep.double())}negate(){return this.init(this.ep.negate())}precompute(n,t){return this.init(this.ep.precompute(n,t))}toRawBytes(){return this.toBytes()}};Vc.PrimeEdwardsPoint=fm;function fT(e,n,t={}){if(typeof n!="function")throw new Error('"hash" function param is required');(0,Bt._validateObject)(t,{},{adjustScalarBytes:"function",randomBytes:"function",domain:"function",prehash:"function",mapToCurve:"function"});let{prehash:i}=t,{BASE:r,Fp:o,Fn:a}=e,s=t.randomBytes||Bt.randomBytes,d=t.adjustScalarBytes||(O=>O),A=t.domain||((O,re,Be)=>{if((0,Bt._abool2)(Be,"phflag"),re.length||Be)throw new Error("Contexts/pre-hash are not supported");return O});function l(O){return a.create((0,Bt.bytesToNumberLE)(O))}function p(O){let re=R.secretKey;O=(0,Bt.ensureBytes)("private key",O,re);let Be=(0,Bt.ensureBytes)("hashed private key",n(O),2*re),ue=d(Be.slice(0,re)),k=Be.slice(re,2*re),w=l(ue);return{head:ue,prefix:k,scalar:w}}function g(O){let{head:re,prefix:Be,scalar:ue}=p(O),k=r.multiply(ue),w=k.toBytes();return{head:re,prefix:Be,scalar:ue,point:k,pointBytes:w}}function h(O){return g(O).pointBytes}function B(O=Uint8Array.of(),...re){let Be=(0,Bt.concatBytes)(...re);return l(n(A(Be,(0,Bt.ensureBytes)("context",O),!!i)))}function C(O,re,Be={}){O=(0,Bt.ensureBytes)("message",O),i&&(O=i(O));let{prefix:ue,scalar:k,pointBytes:w}=g(re),P=B(Be.context,ue,O),H=r.multiply(P).toBytes(),W=B(Be.context,H,w,O),oe=a.create(P+W*k);if(!a.isValid(oe))throw new Error("sign failed: invalid s");let J=(0,Bt.concatBytes)(H,a.toBytes(oe));return(0,Bt._abytes2)(J,R.signature,"result")}let Q={zip215:!0};function E(O,re,Be,ue=Q){let{context:k,zip215:w}=ue,P=R.signature;O=(0,Bt.ensureBytes)("signature",O,P),re=(0,Bt.ensureBytes)("message",re),Be=(0,Bt.ensureBytes)("publicKey",Be,R.publicKey),w!==void 0&&(0,Bt._abool2)(w,"zip215"),i&&(re=i(re));let H=P/2,W=O.subarray(0,H),oe=(0,Bt.bytesToNumberLE)(O.subarray(H,P)),J,ie,fe;try{J=e.fromBytes(Be,w),ie=e.fromBytes(W,w),fe=r.multiplyUnsafe(oe)}catch{return!1}if(!w&&J.isSmallOrder())return!1;let be=B(k,ie.toBytes(),J.toBytes(),re);return ie.add(J.multiplyUnsafe(be)).subtract(fe).clearCofactor().is0()}let D=o.BYTES,R={secretKey:D,publicKey:D,signature:2*D,seed:D};function K(O=s(R.seed)){return(0,Bt._abytes2)(O,R.seed,"seed")}function he(O){let re=qe.randomSecretKey(O);return{secretKey:re,publicKey:h(re)}}function ke(O){return(0,Bt.isBytes)(O)&&O.length===a.BYTES}function Ve(O,re){try{return!!e.fromBytes(O,re)}catch{return!1}}let qe={getExtendedPublicKey:g,randomSecretKey:K,isValidSecretKey:ke,isValidPublicKey:Ve,toMontgomery(O){let{y:re}=e.fromBytes(O),Be=R.publicKey,ue=Be===32;if(!ue&&Be!==57)throw new Error("only defined for 25519 and 448");let k=ue?o.div(yi+re,yi-re):o.div(re-yi,re+yi);return o.toBytes(k)},toMontgomerySecret(O){let re=R.secretKey;(0,Bt._abytes2)(O,re);let Be=n(O.subarray(0,re));return d(Be).subarray(0,re)},randomPrivateKey:K,precompute(O=8,re=e.BASE){return re.precompute(O,!1)}};return Object.freeze({keygen:he,getPublicKey:h,sign:C,verify:E,utils:qe,Point:e,lengths:R})}function c5(e){let n={a:e.a,d:e.d,p:e.Fp.ORDER,n:e.n,h:e.h,Gx:e.Gx,Gy:e.Gy},t=e.Fp,i=(0,a5.Field)(n.n,e.nBitLength,!0),r={Fp:t,Fn:i,uvRatio:e.uvRatio},o={randomBytes:e.randomBytes,adjustScalarBytes:e.adjustScalarBytes,domain:e.domain,prehash:e.prehash,mapToCurve:e.mapToCurve};return{CURVE:n,curveOpts:r,hash:e.hash,eddsaOpts:o}}function u5(e,n){let t=n.Point;return Object.assign({},n,{ExtendedPoint:t,CURVE:e,nBitLength:t.Fn.BITS,nByteLength:t.Fn.BYTES})}function A5(e){let{CURVE:n,curveOpts:t,hash:i,eddsaOpts:r}=c5(e),o=lT(n,t),a=fT(o,i,r);return u5(e,a)}});var gm=I(Ss=>{"use strict";Object.defineProperty(Ss,"__esModule",{value:!0});Ss._DST_scalar=void 0;Ss.expand_message_xmd=hT;Ss.expand_message_xof=yT;Ss.hash_to_field=Mp;Ss.isogenyMap=g5;Ss.createHasher=p5;var Ri=Bd(),pT=ec(),l5=Ri.bytesToNumberBE;function tc(e,n){if(Ml(e),Ml(n),e<0||e>=1<<8*n)throw new Error("invalid I2OSP input: "+e);let t=Array.from({length:n}).fill(0);for(let i=n-1;i>=0;i--)t[i]=e&255,e>>>=8;return new Uint8Array(t)}function f5(e,n){let t=new Uint8Array(e.length);for(let i=0;i<e.length;i++)t[i]=e[i]^n[i];return t}function Ml(e){if(!Number.isSafeInteger(e))throw new Error("number expected")}function IT(e){if(!(0,Ri.isBytes)(e)&&typeof e!="string")throw new Error("DST must be Uint8Array or string");return typeof e=="string"?(0,Ri.utf8ToBytes)(e):e}function hT(e,n,t,i){(0,Ri.abytes)(e),Ml(t),n=IT(n),n.length>255&&(n=i((0,Ri.concatBytes)((0,Ri.utf8ToBytes)("H2C-OVERSIZE-DST-"),n)));let{outputLen:r,blockLen:o}=i,a=Math.ceil(t/r);if(t>65535||a>255)throw new Error("expand_message_xmd: invalid lenInBytes");let s=(0,Ri.concatBytes)(n,tc(n.length,1)),d=tc(0,o),A=tc(t,2),l=new Array(a),p=i((0,Ri.concatBytes)(d,e,A,tc(0,1),s));l[0]=i((0,Ri.concatBytes)(p,tc(1,1),s));for(let h=1;h<=a;h++){let B=[f5(p,l[h-1]),tc(h+1,1),s];l[h]=i((0,Ri.concatBytes)(...B))}return(0,Ri.concatBytes)(...l).slice(0,t)}function yT(e,n,t,i,r){if((0,Ri.abytes)(e),Ml(t),n=IT(n),n.length>255){let o=Math.ceil(2*i/8);n=r.create({dkLen:o}).update((0,Ri.utf8ToBytes)("H2C-OVERSIZE-DST-")).update(n).digest()}if(t>65535||n.length>255)throw new Error("expand_message_xof: invalid lenInBytes");return r.create({dkLen:t}).update(e).update(tc(t,2)).update(n).update(tc(n.length,1)).digest()}function Mp(e,n,t){(0,Ri._validateObject)(t,{p:"bigint",m:"number",k:"number",hash:"function"});let{p:i,k:r,m:o,hash:a,expand:s,DST:d}=t;if(!(0,Ri.isHash)(t.hash))throw new Error("expected valid hash");(0,Ri.abytes)(e),Ml(n);let A=i.toString(2).length,l=Math.ceil((A+r)/8),p=n*o*l,g;if(s==="xmd")g=hT(e,d,p,a);else if(s==="xof")g=yT(e,d,p,r,a);else if(s==="_internal_pass")g=e;else throw new Error('expand must be "xmd" or "xof"');let h=new Array(n);for(let B=0;B<n;B++){let C=new Array(o);for(let Q=0;Q<o;Q++){let E=l*(Q+B*o),D=g.subarray(E,E+l);C[Q]=(0,pT.mod)(l5(D),i)}h[B]=C}return h}function g5(e,n){let t=n.map(i=>Array.from(i).reverse());return(i,r)=>{let[o,a,s,d]=t.map(p=>p.reduce((g,h)=>e.add(e.mul(g,i),h))),[A,l]=(0,pT.FpInvertBatch)(e,[a,d],!0);return i=e.mul(o,A),r=e.mul(r,e.mul(s,l)),{x:i,y:r}}}Ss._DST_scalar=(0,Ri.utf8ToBytes)("HashToScalar-");function p5(e,n,t){if(typeof n!="function")throw new Error("mapToCurve() must be defined");function i(o){return e.fromAffine(n(o))}function r(o){let a=o.clearCofactor();return a.equals(e.ZERO)?e.ZERO:(a.assertValidity(),a)}return{defaults:t,hashToCurve(o,a){let s=Object.assign({},t,a),d=Mp(o,2,s),A=i(d[0]),l=i(d[1]);return r(A.add(l))},encodeToCurve(o,a){let s=t.encodeDST?{DST:t.encodeDST}:{},d=Object.assign({},t,s,a),A=Mp(o,1,d),l=i(A[0]);return r(l)},mapToCurve(o){if(!Array.isArray(o))throw new Error("expected array of bigints");for(let a of o)if(typeof a!="bigint")throw new Error("expected array of bigints");return r(i(o))},hashToScalar(o,a){let s=e.Fn.ORDER,d=Object.assign({},t,{p:s,m:1,DST:Ss._DST_scalar},a);return Mp(o,1,d)[0][0]}}}});var BT=I(pm=>{"use strict";Object.defineProperty(pm,"__esModule",{value:!0});pm.montgomery=y5;var ks=Bd(),I5=ec(),_l=BigInt(0),xu=BigInt(1),_p=BigInt(2);function h5(e){return(0,ks._validateObject)(e,{adjustScalarBytes:"function",powPminus2:"function"}),Object.freeze({...e})}function y5(e){let n=h5(e),{P:t,type:i,adjustScalarBytes:r,powPminus2:o,randomBytes:a}=n,s=i==="x25519";if(!s&&i!=="x448")throw new Error("invalid type");let d=a||ks.randomBytes,A=s?255:448,l=s?32:56,p=BigInt(s?9:5),g=BigInt(s?121665:39081),h=s?_p**BigInt(254):_p**BigInt(447),B=s?BigInt(8)*_p**BigInt(251)-xu:BigInt(4)*_p**BigInt(445)-xu,C=h+B+xu,Q=k=>(0,I5.mod)(k,t),E=D(p);function D(k){return(0,ks.numberToBytesLE)(Q(k),l)}function R(k){let w=(0,ks.ensureBytes)("u coordinate",k,l);return s&&(w[31]&=127),Q((0,ks.bytesToNumberLE)(w))}function K(k){return(0,ks.bytesToNumberLE)(r((0,ks.ensureBytes)("scalar",k,l)))}function he(k,w){let P=qe(R(w),K(k));if(P===_l)throw new Error("invalid private or public key received");return D(P)}function ke(k){return he(k,E)}function Ve(k,w,P){let H=Q(k*(w-P));return w=Q(w-H),P=Q(P+H),{x_2:w,x_3:P}}function qe(k,w){(0,ks.aInRange)("u",k,_l,t),(0,ks.aInRange)("scalar",w,h,C);let P=w,H=k,W=xu,oe=_l,J=k,ie=xu,fe=_l;for(let $n=BigInt(A-1);$n>=_l;$n--){let jn=P>>$n&xu;fe^=jn,{x_2:W,x_3:J}=Ve(fe,W,J),{x_2:oe,x_3:ie}=Ve(fe,oe,ie),fe=jn;let mn=W+oe,ct=Q(mn*mn),Qt=W-oe,wt=Q(Qt*Qt),at=ct-wt,Fr=J+ie,qd=J-ie,gs=Q(qd*mn),vc=Q(Fr*Qt),pl=gs+vc,ra=gs-vc;J=Q(pl*pl),ie=Q(H*Q(ra*ra)),W=Q(ct*wt),oe=Q(at*(ct+Q(g*at)))}({x_2:W,x_3:J}=Ve(fe,W,J)),{x_2:oe,x_3:ie}=Ve(fe,oe,ie);let be=o(oe);return Q(W*be)}let O={secretKey:l,publicKey:l,seed:l},re=(k=d(l))=>((0,ks.abytes)(k,O.seed),k);function Be(k){let w=re(k);return{secretKey:w,publicKey:ke(w)}}return{keygen:Be,getSharedSecret:(k,w)=>he(k,w),getPublicKey:k=>ke(k),scalarMult:he,scalarMultBase:ke,utils:{randomSecretKey:re,randomPrivateKey:re},GuBytes:E.slice(),lengths:O}}});var vT=I(Bn=>{"use strict";Object.defineProperty(Bn,"__esModule",{value:!0});Bn.hash_to_ristretto255=Bn.hashToRistretto255=Bn.encodeToCurve=Bn.hashToCurve=Bn.RistrettoPoint=Bn.edwardsToMontgomery=Bn.ED25519_TORSION_SUBGROUP=Bn.ristretto255_hasher=Bn.ristretto255=Bn.ed25519_hasher=Bn.x25519=Bn.ed25519ph=Bn.ed25519ctx=Bn.ed25519=void 0;Bn.edwardsToMontgomeryPub=NT;Bn.edwardsToMontgomeryPriv=O5;var Gl=xl(),Vp=Xo(),B5=Hp(),Wp=gT(),Gp=gm(),bt=ec(),m5=BT(),Kc=Bd(),C5=BigInt(0),Es=BigInt(1),Kp=BigInt(2),kT=BigInt(3),ET=BigInt(5),Bm=BigInt(8),md=BigInt("0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffed"),Vl={p:md,n:BigInt("0x1000000000000000000000000000000014def9dea2f79cd65812631a5cf5d3ed"),h:Bm,a:BigInt("0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffec"),d:BigInt("0x52036cee2b6ffe738cc740797779e89800700a4d4141d8ab75eb4dca135978a3"),Gx:BigInt("0x216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51a"),Gy:BigInt("0x6666666666666666666666666666666666666666666666666666666666666658")};function QT(e){let n=BigInt(10),t=BigInt(20),i=BigInt(40),r=BigInt(80),o=md,s=e*e%o*e%o,d=(0,bt.pow2)(s,Kp,o)*s%o,A=(0,bt.pow2)(d,Es,o)*e%o,l=(0,bt.pow2)(A,ET,o)*A%o,p=(0,bt.pow2)(l,n,o)*l%o,g=(0,bt.pow2)(p,t,o)*p%o,h=(0,bt.pow2)(g,i,o)*g%o,B=(0,bt.pow2)(h,r,o)*h%o,C=(0,bt.pow2)(B,r,o)*h%o,Q=(0,bt.pow2)(C,n,o)*l%o;return{pow_p_5_8:(0,bt.pow2)(Q,Kp,o)*e%o,b2:s}}function wT(e){return e[0]&=248,e[31]&=127,e[31]|=64,e}var Im=BigInt("19681161376707505956807079304988542015446066515923890162744021073123829784752");function mm(e,n){let t=md,i=(0,bt.mod)(n*n*n,t),r=(0,bt.mod)(i*i*n,t),o=QT(e*r).pow_p_5_8,a=(0,bt.mod)(e*i*o,t),s=(0,bt.mod)(n*a*a,t),d=a,A=(0,bt.mod)(a*Im,t),l=s===e,p=s===(0,bt.mod)(-e,t),g=s===(0,bt.mod)(-e*Im,t);return l&&(a=d),(p||g)&&(a=A),(0,bt.isNegativeLE)(a,t)&&(a=(0,bt.mod)(-a,t)),{isValid:l||p,value:a}}var Se=(0,bt.Field)(Vl.p,{isLE:!0}),bT=(0,bt.Field)(Vl.n,{isLE:!0}),Cm={...Vl,Fp:Se,hash:Gl.sha512,adjustScalarBytes:wT,uvRatio:mm};Bn.ed25519=(0,Wp.twistedEdwards)(Cm);function RT(e,n,t){if(n.length>255)throw new Error("Context is too big");return(0,Vp.concatBytes)((0,Vp.utf8ToBytes)("SigEd25519 no Ed25519 collisions"),new Uint8Array([t?1:0,n.length]),n,e)}Bn.ed25519ctx=(0,Wp.twistedEdwards)({...Cm,domain:RT});Bn.ed25519ph=(0,Wp.twistedEdwards)(Object.assign({},Cm,{domain:RT,prehash:Gl.sha512}));Bn.x25519=(()=>{let e=Se.ORDER;return(0,m5.montgomery)({P:e,type:"x25519",powPminus2:n=>{let{pow_p_5_8:t,b2:i}=QT(n);return(0,bt.mod)((0,bt.pow2)(t,kT,e)*i,e)},adjustScalarBytes:wT})})();var S5=(md+kT)/Bm,k5=Se.pow(Kp,S5),mT=Se.sqrt(Se.neg(Se.ONE));function E5(e){let n=(md-ET)/Bm,t=BigInt(486662),i=Se.sqr(e);i=Se.mul(i,Kp);let r=Se.add(i,Se.ONE),o=Se.neg(t),a=Se.sqr(r),s=Se.mul(a,r),d=Se.mul(i,t);d=Se.mul(d,o),d=Se.add(d,a),d=Se.mul(d,o);let A=Se.sqr(s);a=Se.sqr(A),A=Se.mul(A,s),A=Se.mul(A,d),a=Se.mul(a,A);let l=Se.pow(a,n);l=Se.mul(l,A);let p=Se.mul(l,mT);a=Se.sqr(l),a=Se.mul(a,s);let g=Se.eql(a,d),h=Se.cmov(p,l,g),B=Se.mul(o,i),C=Se.mul(l,e);C=Se.mul(C,k5);let Q=Se.mul(C,mT),E=Se.mul(d,i);a=Se.sqr(C),a=Se.mul(a,s);let D=Se.eql(a,E),R=Se.cmov(Q,C,D);a=Se.sqr(h),a=Se.mul(a,s);let K=Se.eql(a,d),he=Se.cmov(B,o,K),ke=Se.cmov(R,h,K),Ve=Se.isOdd(ke);return ke=Se.cmov(ke,Se.neg(ke),K!==Ve),{xMn:he,xMd:r,yMn:ke,yMd:Es}}var Q5=(0,bt.FpSqrtEven)(Se,Se.neg(BigInt(486664)));function w5(e){let{xMn:n,xMd:t,yMn:i,yMd:r}=E5(e),o=Se.mul(n,r);o=Se.mul(o,Q5);let a=Se.mul(t,i),s=Se.sub(n,t),d=Se.add(n,t),A=Se.mul(a,d),l=Se.eql(A,Se.ZERO);o=Se.cmov(o,Se.ZERO,l),a=Se.cmov(a,Se.ONE,l),s=Se.cmov(s,Se.ONE,l),d=Se.cmov(d,Se.ONE,l);let[p,g]=(0,bt.FpInvertBatch)(Se,[a,d],!0);return{x:Se.mul(o,p),y:Se.mul(s,g)}}Bn.ed25519_hasher=(0,Gp.createHasher)(Bn.ed25519.Point,e=>w5(e[0]),{DST:"edwards25519_XMD:SHA-512_ELL2_RO_",encodeDST:"edwards25519_XMD:SHA-512_ELL2_NU_",p:md,m:1,k:128,expand:"xmd",hash:Gl.sha512});var hm=Im,b5=BigInt("25063068953384623474111414158702152701244531502492656460079210482610430750235"),R5=BigInt("54469307008909316920995813868745141605393597292927456921205312896311721017578"),P5=BigInt("1159843021668779879193775521855586647937357759715417654439879720876111806838"),N5=BigInt("40440834346308536858101042469323190826248399146238708352240133220865137265952"),CT=e=>mm(Es,e),v5=BigInt("0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"),ym=e=>Bn.ed25519.Point.Fp.create((0,Kc.bytesToNumberLE)(e)&v5);function ST(e){let{d:n}=Vl,t=md,i=E=>Se.create(E),r=i(hm*e*e),o=i((r+Es)*P5),a=BigInt(-1),s=i((a-n*r)*i(r+n)),{isValid:d,value:A}=mm(o,s),l=i(A*e);(0,bt.isNegativeLE)(l,t)||(l=i(-l)),d||(A=l),d||(a=r);let p=i(a*(r-Es)*N5-s),g=A*A,h=i((A+A)*s),B=i(p*b5),C=i(Es-g),Q=i(Es+g);return new Bn.ed25519.Point(i(h*Q),i(C*B),i(B*Q),i(h*C))}function PT(e){(0,Vp.abytes)(e,64);let n=ym(e.subarray(0,32)),t=ST(n),i=ym(e.subarray(32,64)),r=ST(i);return new Va(t.add(r))}var Va=class e extends Wp.PrimeEdwardsPoint{constructor(n){super(n)}static fromAffine(n){return new e(Bn.ed25519.Point.fromAffine(n))}assertSame(n){if(!(n instanceof e))throw new Error("RistrettoPoint expected")}init(n){return new e(n)}static hashToCurve(n){return PT((0,Kc.ensureBytes)("ristrettoHash",n,64))}static fromBytes(n){(0,Vp.abytes)(n,32);let{a:t,d:i}=Vl,r=md,o=K=>Se.create(K),a=ym(n);if(!(0,Kc.equalBytes)(Se.toBytes(a),n)||(0,bt.isNegativeLE)(a,r))throw new Error("invalid ristretto255 encoding 1");let s=o(a*a),d=o(Es+t*s),A=o(Es-t*s),l=o(d*d),p=o(A*A),g=o(t*i*l-p),{isValid:h,value:B}=CT(o(g*p)),C=o(B*A),Q=o(B*C*g),E=o((a+a)*C);(0,bt.isNegativeLE)(E,r)&&(E=o(-E));let D=o(d*Q),R=o(E*D);if(!h||(0,bt.isNegativeLE)(R,r)||D===C5)throw new Error("invalid ristretto255 encoding 2");return new e(new Bn.ed25519.Point(E,D,Es,R))}static fromHex(n){return e.fromBytes((0,Kc.ensureBytes)("ristrettoHex",n,32))}static msm(n,t){return(0,B5.pippenger)(e,Bn.ed25519.Point.Fn,n,t)}toBytes(){let{X:n,Y:t,Z:i,T:r}=this.ep,o=md,a=Q=>Se.create(Q),s=a(a(i+t)*a(i-t)),d=a(n*t),A=a(d*d),{value:l}=CT(a(s*A)),p=a(l*s),g=a(l*d),h=a(p*g*r),B;if((0,bt.isNegativeLE)(r*h,o)){let Q=a(t*hm),E=a(n*hm);n=Q,t=E,B=a(p*R5)}else B=g;(0,bt.isNegativeLE)(n*h,o)&&(t=a(-t));let C=a((i-t)*B);return(0,bt.isNegativeLE)(C,o)&&(C=a(-C)),Se.toBytes(C)}equals(n){this.assertSame(n);let{X:t,Y:i}=this.ep,{X:r,Y:o}=n.ep,a=A=>Se.create(A),s=a(t*o)===a(i*r),d=a(i*o)===a(t*r);return s||d}is0(){return this.equals(e.ZERO)}};Va.BASE=new Va(Bn.ed25519.Point.BASE);Va.ZERO=new Va(Bn.ed25519.Point.ZERO);Va.Fp=Se;Va.Fn=bT;Bn.ristretto255={Point:Va};Bn.ristretto255_hasher={hashToCurve(e,n){let t=n?.DST||"ristretto255_XMD:SHA-512_R255MAP_RO_",i=(0,Gp.expand_message_xmd)(e,t,64,Gl.sha512);return PT(i)},hashToScalar(e,n={DST:Gp._DST_scalar}){let t=(0,Gp.expand_message_xmd)(e,n.DST,64,Gl.sha512);return bT.create((0,Kc.bytesToNumberLE)(t))}};Bn.ED25519_TORSION_SUBGROUP=["0100000000000000000000000000000000000000000000000000000000000000","c7176a703d4dd84fba3c0b760d10670f2a2053fa2c39ccc64ec7fd7792ac037a","0000000000000000000000000000000000000000000000000000000000000080","26e8958fc2b227b045c3f489f2ef98f0d5dfac05d3c63339b13802886d53fc05","ecffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff7f","26e8958fc2b227b045c3f489f2ef98f0d5dfac05d3c63339b13802886d53fc85","0000000000000000000000000000000000000000000000000000000000000000","c7176a703d4dd84fba3c0b760d10670f2a2053fa2c39ccc64ec7fd7792ac03fa"];function NT(e){return Bn.ed25519.utils.toMontgomery((0,Kc.ensureBytes)("pub",e))}Bn.edwardsToMontgomery=NT;function O5(e){return Bn.ed25519.utils.toMontgomerySecret((0,Kc.ensureBytes)("pub",e))}Bn.RistrettoPoint=Va;Bn.hashToCurve=Bn.ed25519_hasher.hashToCurve;Bn.encodeToCurve=Bn.ed25519_hasher.encodeToCurve;Bn.hashToRistretto255=Bn.ristretto255_hasher.hashToCurve;Bn.hash_to_ristretto255=Bn.ristretto255_hasher.hashToCurve});var OT=I(Tu=>{"use strict";Object.defineProperty(Tu,"__esModule",{value:!0});Tu.Ed25519=Tu.Ed25519Keypair=void 0;var Sm=vT(),Lp=class e{static fromLibsodiumPrivkey(n){if(n.length!==64)throw new Error(`Unexpected key length ${n.length}. Must be 64.`);return new e(n.slice(0,32),n.slice(32,64))}privkey;pubkey;constructor(n,t){this.privkey=n,this.pubkey=t}toLibsodiumPrivkey(){return new Uint8Array([...this.privkey,...this.pubkey])}};Tu.Ed25519Keypair=Lp;var km=class{static async makeKeypair(n){let t=Sm.ed25519.getPublicKey(n);return new Lp(n,t)}static async createSignature(n,t){return Sm.ed25519.sign(n,t.privkey)}static async verifySignature(n,t,i){return Sm.ed25519.verify(n,t,i)}};Tu.Ed25519=km});var Qm=I(Yp=>{"use strict";Object.defineProperty(Yp,"__esModule",{value:!0});Yp.Hmac=void 0;var D5=Jn(),Em=class{blockSize;messageHasher;oKeyPad;iKeyPad;hash;constructor(n,t){let i=new n().blockSize;this.hash=o=>(0,D5.fixUint8Array)(new n().update(o).digest());let r=t;if(r.length>i&&(r=this.hash(r)),r.length<i){let o=new Uint8Array(i-r.length);r=new Uint8Array([...r,...o])}this.oKeyPad=r.map(o=>o^92),this.iKeyPad=r.map(o=>o^54),this.messageHasher=new n,this.blockSize=i,this.update(this.iKeyPad)}update(n){return this.messageHasher.update(n),this}digest(){let n=this.messageHasher.digest();return this.hash(new Uint8Array([...this.oKeyPad,...n]))}};Yp.Hmac=Em});var MT=I(nr=>{"use strict";Object.defineProperty(nr,"__esModule",{value:!0});nr.shake256=nr.shake128=nr.keccak_512=nr.keccak_384=nr.keccak_256=nr.keccak_224=nr.sha3_512=nr.sha3_384=nr.sha3_256=nr.sha3_224=nr.Keccak=void 0;nr.keccakP=qT;var Wl=_B(),Gi=Xo(),U5=BigInt(0),Kl=BigInt(1),x5=BigInt(2),T5=BigInt(7),J5=BigInt(256),F5=BigInt(113),xT=[],TT=[],JT=[];for(let e=0,n=Kl,t=1,i=0;e<24;e++){[t,i]=[i,(2*t+3*i)%5],xT.push(2*(5*i+t)),TT.push((e+1)*(e+2)/2%64);let r=U5;for(let o=0;o<7;o++)n=(n<<Kl^(n>>T5)*F5)%J5,n&x5&&(r^=Kl<<(Kl<<BigInt(o))-Kl);JT.push(r)}var FT=(0,Wl.split)(JT,!0),q5=FT[0],H5=FT[1],DT=(e,n,t)=>t>32?(0,Wl.rotlBH)(e,n,t):(0,Wl.rotlSH)(e,n,t),UT=(e,n,t)=>t>32?(0,Wl.rotlBL)(e,n,t):(0,Wl.rotlSL)(e,n,t);function qT(e,n=24){let t=new Uint32Array(10);for(let i=24-n;i<24;i++){for(let a=0;a<10;a++)t[a]=e[a]^e[a+10]^e[a+20]^e[a+30]^e[a+40];for(let a=0;a<10;a+=2){let s=(a+8)%10,d=(a+2)%10,A=t[d],l=t[d+1],p=DT(A,l,1)^t[s],g=UT(A,l,1)^t[s+1];for(let h=0;h<50;h+=10)e[a+h]^=p,e[a+h+1]^=g}let r=e[2],o=e[3];for(let a=0;a<24;a++){let s=TT[a],d=DT(r,o,s),A=UT(r,o,s),l=xT[a];r=e[l],o=e[l+1],e[l]=d,e[l+1]=A}for(let a=0;a<50;a+=10){for(let s=0;s<10;s++)t[s]=e[a+s];for(let s=0;s<10;s++)e[a+s]^=~t[(s+2)%10]&t[(s+4)%10]}e[0]^=q5[i],e[1]^=H5[i]}(0,Gi.clean)(t)}var Ll=class e extends Gi.Hash{constructor(n,t,i,r=!1,o=24){if(super(),this.pos=0,this.posOut=0,this.finished=!1,this.destroyed=!1,this.enableXOF=!1,this.blockLen=n,this.suffix=t,this.outputLen=i,this.enableXOF=r,this.rounds=o,(0,Gi.anumber)(i),!(0<n&&n<200))throw new Error("only keccak-f1600 function is supported");this.state=new Uint8Array(200),this.state32=(0,Gi.u32)(this.state)}clone(){return this._cloneInto()}keccak(){(0,Gi.swap32IfBE)(this.state32),qT(this.state32,this.rounds),(0,Gi.swap32IfBE)(this.state32),this.posOut=0,this.pos=0}update(n){(0,Gi.aexists)(this),n=(0,Gi.toBytes)(n),(0,Gi.abytes)(n);let{blockLen:t,state:i}=this,r=n.length;for(let o=0;o<r;){let a=Math.min(t-this.pos,r-o);for(let s=0;s<a;s++)i[this.pos++]^=n[o++];this.pos===t&&this.keccak()}return this}finish(){if(this.finished)return;this.finished=!0;let{state:n,suffix:t,pos:i,blockLen:r}=this;n[i]^=t,(t&128)!==0&&i===r-1&&this.keccak(),n[r-1]^=128,this.keccak()}writeInto(n){(0,Gi.aexists)(this,!1),(0,Gi.abytes)(n),this.finish();let t=this.state,{blockLen:i}=this;for(let r=0,o=n.length;r<o;){this.posOut>=i&&this.keccak();let a=Math.min(i-this.posOut,o-r);n.set(t.subarray(this.posOut,this.posOut+a),r),this.posOut+=a,r+=a}return n}xofInto(n){if(!this.enableXOF)throw new Error("XOF is not possible for this instance");return this.writeInto(n)}xof(n){return(0,Gi.anumber)(n),this.xofInto(new Uint8Array(n))}digestInto(n){if((0,Gi.aoutput)(n,this),this.finished)throw new Error("digest() was already called");return this.writeInto(n),this.destroy(),n}digest(){return this.digestInto(new Uint8Array(this.outputLen))}destroy(){this.destroyed=!0,(0,Gi.clean)(this.state)}_cloneInto(n){let{blockLen:t,suffix:i,outputLen:r,rounds:o,enableXOF:a}=this;return n||(n=new e(t,i,r,a,o)),n.state32.set(this.state32),n.pos=this.pos,n.posOut=this.posOut,n.finished=this.finished,n.rounds=o,n.suffix=i,n.outputLen=r,n.enableXOF=a,n.destroyed=this.destroyed,n}};nr.Keccak=Ll;var rc=(e,n,t)=>(0,Gi.createHasher)(()=>new Ll(n,e,t));nr.sha3_224=rc(6,144,224/8);nr.sha3_256=rc(6,136,256/8);nr.sha3_384=rc(6,104,384/8);nr.sha3_512=rc(6,72,512/8);nr.keccak_224=rc(1,144,224/8);nr.keccak_256=rc(1,136,256/8);nr.keccak_384=rc(1,104,384/8);nr.keccak_512=rc(1,72,512/8);var HT=(e,n,t)=>(0,Gi.createXOFer)((i={})=>new Ll(n,e,i.dkLen===void 0?t:i.dkLen,!0));nr.shake128=HT(31,168,128/8);nr.shake256=HT(31,136,256/8)});var zp=I(wm=>{"use strict";Object.defineProperty(wm,"__esModule",{value:!0});wm.toRealUint8Array=M5;function M5(e){return e instanceof Uint8Array?e:Uint8Array.from(e)}});var _T=I(Yl=>{"use strict";Object.defineProperty(Yl,"__esModule",{value:!0});Yl.Keccak256=void 0;Yl.keccak256=K5;var _5=Jn(),G5=MT(),V5=zp(),Zp=class{blockSize=512/8;impl=G5.keccak_256.create();constructor(n){n&&this.update(n)}update(n){return this.impl.update((0,V5.toRealUint8Array)(n)),this}digest(){return(0,_5.fixUint8Array)(this.impl.digest())}};Yl.Keccak256=Zp;function K5(e){return new Zp(e).digest()}});var GT=I(Xp=>{"use strict";Object.defineProperty(Xp,"__esModule",{value:!0});Xp.Random=void 0;var bm=class{static getBytes(n){let t=new Uint8Array(n);return globalThis.crypto.getRandomValues(t),t}};Xp.Random=bm});var ZT=I(Oo=>{"use strict";Object.defineProperty(Oo,"__esModule",{value:!0});Oo.ripemd160=Oo.RIPEMD160=Oo.md5=Oo.MD5=Oo.sha1=Oo.SHA1=void 0;var Wc=qB(),Pi=Xo(),Ju=Uint32Array.from([1732584193,4023233417,2562383102,271733878,3285377520]),ic=new Uint32Array(80),eI=class extends Wc.HashMD{constructor(){super(64,20,8,!1),this.A=Ju[0]|0,this.B=Ju[1]|0,this.C=Ju[2]|0,this.D=Ju[3]|0,this.E=Ju[4]|0}get(){let{A:n,B:t,C:i,D:r,E:o}=this;return[n,t,i,r,o]}set(n,t,i,r,o){this.A=n|0,this.B=t|0,this.C=i|0,this.D=r|0,this.E=o|0}process(n,t){for(let d=0;d<16;d++,t+=4)ic[d]=n.getUint32(t,!1);for(let d=16;d<80;d++)ic[d]=(0,Pi.rotl)(ic[d-3]^ic[d-8]^ic[d-14]^ic[d-16],1);let{A:i,B:r,C:o,D:a,E:s}=this;for(let d=0;d<80;d++){let A,l;d<20?(A=(0,Wc.Chi)(r,o,a),l=1518500249):d<40?(A=r^o^a,l=1859775393):d<60?(A=(0,Wc.Maj)(r,o,a),l=2400959708):(A=r^o^a,l=3395469782);let p=(0,Pi.rotl)(i,5)+A+s+l+ic[d]|0;s=a,a=o,o=(0,Pi.rotl)(r,30),r=i,i=p}i=i+this.A|0,r=r+this.B|0,o=o+this.C|0,a=a+this.D|0,s=s+this.E|0,this.set(i,r,o,a,s)}roundClean(){(0,Pi.clean)(ic)}destroy(){this.set(0,0,0,0,0),(0,Pi.clean)(this.buffer)}};Oo.SHA1=eI;Oo.sha1=(0,Pi.createHasher)(()=>new eI);var W5=Math.pow(2,32),L5=Array.from({length:64},(e,n)=>Math.floor(W5*Math.abs(Math.sin(n+1)))),$p=Ju.slice(0,4),Rm=new Uint32Array(16),nI=class extends Wc.HashMD{constructor(){super(64,16,8,!0),this.A=$p[0]|0,this.B=$p[1]|0,this.C=$p[2]|0,this.D=$p[3]|0}get(){let{A:n,B:t,C:i,D:r}=this;return[n,t,i,r]}set(n,t,i,r){this.A=n|0,this.B=t|0,this.C=i|0,this.D=r|0}process(n,t){for(let s=0;s<16;s++,t+=4)Rm[s]=n.getUint32(t,!0);let{A:i,B:r,C:o,D:a}=this;for(let s=0;s<64;s++){let d,A,l;s<16?(d=(0,Wc.Chi)(r,o,a),A=s,l=[7,12,17,22]):s<32?(d=(0,Wc.Chi)(a,r,o),A=(5*s+1)%16,l=[5,9,14,20]):s<48?(d=r^o^a,A=(3*s+5)%16,l=[4,11,16,23]):(d=o^(r|~a),A=7*s%16,l=[6,10,15,21]),d=d+i+L5[s]+Rm[A],i=a,a=o,o=r,r=r+(0,Pi.rotl)(d,l[s%4])}i=i+this.A|0,r=r+this.B|0,o=o+this.C|0,a=a+this.D|0,this.set(i,r,o,a)}roundClean(){(0,Pi.clean)(Rm)}destroy(){this.set(0,0,0,0),(0,Pi.clean)(this.buffer)}};Oo.MD5=nI;Oo.md5=(0,Pi.createHasher)(()=>new nI);var Y5=Uint8Array.from([7,4,13,1,10,6,15,3,12,0,9,5,2,14,11,8]),KT=Uint8Array.from(new Array(16).fill(0).map((e,n)=>n)),z5=KT.map(e=>(9*e+5)%16),WT=(()=>{let t=[[KT],[z5]];for(let i=0;i<4;i++)for(let r of t)r.push(r[i].map(o=>Y5[o]));return t})(),LT=WT[0],YT=WT[1],zT=[[11,14,15,12,5,8,7,9,11,13,14,15,6,7,9,8],[12,13,11,15,6,9,9,7,12,15,11,13,7,8,7,7],[13,15,14,11,7,7,6,8,13,14,13,12,5,5,6,9],[14,11,12,14,8,6,5,5,15,12,15,14,9,9,8,6],[15,12,13,13,9,5,8,6,14,11,12,11,8,6,5,5]].map(e=>Uint8Array.from(e)),Z5=LT.map((e,n)=>e.map(t=>zT[n][t])),X5=YT.map((e,n)=>e.map(t=>zT[n][t])),$5=Uint32Array.from([0,1518500249,1859775393,2400959708,2840853838]),j5=Uint32Array.from([1352829926,1548603684,1836072691,2053994217,0]);function VT(e,n,t,i){return e===0?n^t^i:e===1?n&t|~n&i:e===2?(n|~t)^i:e===3?n&i|t&~i:n^(t|~i)}var jp=new Uint32Array(16),tI=class extends Wc.HashMD{constructor(){super(64,20,8,!0),this.h0=1732584193,this.h1=-271733879,this.h2=-1732584194,this.h3=271733878,this.h4=-1009589776}get(){let{h0:n,h1:t,h2:i,h3:r,h4:o}=this;return[n,t,i,r,o]}set(n,t,i,r,o){this.h0=n|0,this.h1=t|0,this.h2=i|0,this.h3=r|0,this.h4=o|0}process(n,t){for(let h=0;h<16;h++,t+=4)jp[h]=n.getUint32(t,!0);let i=this.h0|0,r=i,o=this.h1|0,a=o,s=this.h2|0,d=s,A=this.h3|0,l=A,p=this.h4|0,g=p;for(let h=0;h<5;h++){let B=4-h,C=$5[h],Q=j5[h],E=LT[h],D=YT[h],R=Z5[h],K=X5[h];for(let he=0;he<16;he++){let ke=(0,Pi.rotl)(i+VT(h,o,s,A)+jp[E[he]]+C,R[he])+p|0;i=p,p=A,A=(0,Pi.rotl)(s,10)|0,s=o,o=ke}for(let he=0;he<16;he++){let ke=(0,Pi.rotl)(r+VT(B,a,d,l)+jp[D[he]]+Q,K[he])+g|0;r=g,g=l,l=(0,Pi.rotl)(d,10)|0,d=a,a=ke}}this.set(this.h1+s+l|0,this.h2+A+g|0,this.h3+p+r|0,this.h4+i+a|0,this.h0+o+d|0)}roundClean(){(0,Pi.clean)(jp)}destroy(){this.destroyed=!0,(0,Pi.clean)(this.buffer),this.set(0,0,0,0,0)}};Oo.RIPEMD160=tI;Oo.ripemd160=(0,Pi.createHasher)(()=>new tI)});var XT=I(zl=>{"use strict";Object.defineProperty(zl,"__esModule",{value:!0});zl.Ripemd160=void 0;zl.ripemd160=rY;var eY=Jn(),nY=ZT(),tY=zp(),rI=class{blockSize=512/8;impl=nY.ripemd160.create();constructor(n){n&&this.update(n)}update(n){return this.impl.update((0,tY.toRealUint8Array)(n)),this}digest(){return(0,eY.fixUint8Array)(this.impl.digest())}};zl.Ripemd160=rI;function rY(e){return new rI(e).digest()}});var Dm=I(tr=>{"use strict";Object.defineProperty(tr,"__esModule",{value:!0});tr.DER=tr.DERErr=void 0;tr._splitEndoScalar=jT;tr._normFnElement=oc;tr.weierstrassN=Om;tr.SWUFpSqrtRatio=nJ;tr.mapToCurveSimpleSWU=aY;tr.ecdh=rJ;tr.ecdsa=iJ;tr.weierstrassPoints=sY;tr._legacyHelperEquat=aJ;tr.weierstrass=AY;var iY=JB(),oY=Xo(),Le=Bd(),Cd=Hp(),qu=ec(),$T=(e,n)=>(e+(e>=0?n:-n)/Qs)/n;function jT(e,n,t){let[[i,r],[o,a]]=n,s=$T(a*e,t),d=$T(-r*e,t),A=e-s*i-d*o,l=-s*r-d*a,p=A<Ka,g=l<Ka;p&&(A=-A),g&&(l=-l);let h=(0,Le.bitMask)(Math.ceil((0,Le.bitLen)(t)/2))+Ni;if(A<Ka||A>=h||l<Ka||l>=h)throw new Error("splitScalar (endomorphism): failed, k="+e);return{k1neg:p,k1:A,k2neg:g,k2:l}}function Nm(e){if(!["compact","recovered","der"].includes(e))throw new Error('Signature format must be "compact", "recovered", or "der"');return e}function Pm(e,n){let t={};for(let i of Object.keys(n))t[i]=e[i]===void 0?n[i]:e[i];return(0,Le._abool2)(t.lowS,"lowS"),(0,Le._abool2)(t.prehash,"prehash"),t.format!==void 0&&Nm(t.format),t}var iI=class extends Error{constructor(n=""){super(n)}};tr.DERErr=iI;tr.DER={Err:iI,_tlv:{encode:(e,n)=>{let{Err:t}=tr.DER;if(e<0||e>256)throw new t("tlv.encode: wrong tag");if(n.length&1)throw new t("tlv.encode: unpadded data");let i=n.length/2,r=(0,Le.numberToHexUnpadded)(i);if(r.length/2&128)throw new t("tlv.encode: long form length too big");let o=i>127?(0,Le.numberToHexUnpadded)(r.length/2|128):"";return(0,Le.numberToHexUnpadded)(e)+o+r+n},decode(e,n){let{Err:t}=tr.DER,i=0;if(e<0||e>256)throw new t("tlv.encode: wrong tag");if(n.length<2||n[i++]!==e)throw new t("tlv.decode: wrong tlv");let r=n[i++],o=!!(r&128),a=0;if(!o)a=r;else{let d=r&127;if(!d)throw new t("tlv.decode(long): indefinite length not supported");if(d>4)throw new ×]½çoÊ×¬¢h­µçYK›Ý\Ê]K•›ÝR[™›Ë™[˜ÛÙJ‹Z[ÌŠN
K™›ÜšÊ
JK›[[J
NÜ™]\›ˆŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ‹š[˜\žT™XY\ÙN›™]È‹š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹ZÌŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹œ›Ý[™]š[ÌŠ
NØœ™XZÎØØ\ÙHŽœ‹›Ý\Ëœ\Ú
K•›ÝR[™›Ë™XÛÙJZ[ÌŠ
JJNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]ZÌŠ
NÜ™]\›ŠKš\ÔÙ]
JKœ›Ý[™
I‰Š‹œ›Ý[™S[X™\ŠKœ›Ý[™
JK\œ˜^Kš\Ð\œ˜^JOË›Ý\ÊI‰Š‹›Ý\ÏYK›Ý\Ë›X\
OK•›ÝR[™›Ë™œ›ÛR”ÓÓŠ
JJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆKœ›Ý[™OO]›ÚY	‰Š‹œ›Ý[™SX]œ›Ý[™
Kœ›Ý[™
JKK›Ý\ÏÛ‹›Ý\ÏYK›Ý\Ë›X\
OÝK•›ÝR[™›ËÒ”ÓÓŠ
N›ÚY
N›‹›Ý\ÏV×KŸKœ›ÛT\X[
J^Û]ZÌŠ
NÜ™]\›ˆ‹œ›Ý[™YKœ›Ý[™ÏÌ‹›Ý\ÏYK›Ý\ÏË›X\
OK•›ÝR[™›Ë™œ›ÛT\X[

J_×KŸ_NÙ[˜Ý[ÛˆLŠ
^Ü™]\›žÜ›Ý[™Œ›Ý\Î–×__]K‘^[™YÛÛ[Z][™›Ï^Ý\U\›ˆ‹Ý[™\›Z[˜X˜ÚK‘^[™YÛÛ[Z][™›È‹[˜ÛÙJKS‹š[˜\žUÜš]\‹˜Ü™X]J
J^ÙKœ›Ý[™OOL	‰›‹Z[ÌŠ
Kš[ÌŠKœ›Ý[™
NÙ›ÜŠ]ÙˆK›Ý\Ê]K‘^[™Y›ÝR[™›Ë™[˜ÛÙJ‹Z[ÌŠN
K™›ÜšÊ
JK›[[J
NÜ™]\›ˆŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ‹š[˜\žT™XY\ÙN›™]È‹š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹QLŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹œ›Ý[™]š[ÌŠ
NØœ™XZÎØØ\ÙHŽœ‹›Ý\Ëœ\Ú
K‘^[™Y›ÝR[™›Ë™XÛÙJZ[ÌŠ
JJNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]QLŠ
NÜ™]\›ŠKš\ÔÙ]
JKœ›Ý[™
I‰Š‹œ›Ý[™S[X™\ŠKœ›Ý[™
JK\œ˜^Kš\Ð\œ˜^JOË›Ý\ÊI‰Š‹›Ý\ÏYK›Ý\Ë›X\
OK‘^[™Y›ÝR[™›Ë™œ›ÛR”ÓÓŠ
JJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆKœ›Ý[™OO]›ÚY	‰Š‹œ›Ý[™SX]œ›Ý[™
Kœ›Ý[™
JKK›Ý\ÏÛ‹›Ý\ÏYK›Ý\Ë›X\
OÝK‘^[™Y›ÝR[™›ËÒ”ÓÓŠ
N›ÚY
N›‹›Ý\ÏV×KŸKœ›ÛT\X[
J^Û]QLŠ
NÜ™]\›ˆ‹œ›Ý[™YKœ›Ý[™ÏÌ‹›Ý\ÏYK›Ý\ÏË›X\
OK‘^[™Y›ÝR[™›Ë™œ›ÛT\X[

J_×KŸ_NÙ[˜Ý[ÛˆLŠ
^Ü™]\›žÝ\Nˆˆ‹]šX]\Î–×__]K‘]™[^Ý\U\›ˆ‹Ý[™\›Z[˜X˜ÚK‘]™[‹[˜ÛÙJKS‹š[˜\žUÜš]\‹˜Ü™X]J
J^ÙK\HOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊK\JNÙ›ÜŠ]ÙˆK˜]šX]\Ê]K‘]™[]šX]K™[˜ÛÙJ‹Z[ÌŠN
K™›ÜšÊ
JK›[[J
NÜ™]\›ˆŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ‹š[˜\žT™XY\ÙN›™]È‹š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹TLŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹\O]œÝš[™Ê
NØœ™XZÎØØ\ÙHŽœ‹˜]šX]\Ëœ\Ú
K‘]™[]šX]K™XÛÙJZ[ÌŠ
JJNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]TLŠ
NÜ™]\›ŠKš\ÔÙ]
JK\JI‰Š‹\OTÝš[™ÊK\JJK\œ˜^Kš\Ð\œ˜^JOË˜]šX]\ÊI‰Š‹˜]šX]\ÏYK˜]šX]\Ë›X\
OK‘]™[]šX]K™œ›ÛR”ÓÓŠ
JJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK\HOO]›ÚY	‰Š‹\OYK\JKK˜]šX]\ÏÛ‹˜]šX]\ÏYK˜]šX]\Ë›X\
OÝK‘]™[]šX]KÒ”ÓÓŠ
N›ÚY
N›‹˜]šX]\ÏV×KŸKœ›ÛT\X[
J^Û]TLŠ
NÜ™]\›ˆ‹\OYK\OÏÈˆ‹‹˜]šX]\ÏYK˜]šX]\ÏË›X\
OK‘]™[]šX]K™œ›ÛT\X[

J_×KŸ_NÙ[˜Ý[ÛˆÌŠ
^Ü™]\›žÚÙ^Nˆˆ‹˜[YNˆˆ‹[™^ˆL__]K‘]™[]šX]O^Ý\U\›ˆ‹Ý[™\›Z[˜X˜ÚK‘]™[]šX]H‹[˜ÛÙJKS‹š[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆKšÙ^HOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊKšÙ^JKK˜[YHOOHˆ‰‰›‹Z[ÌŠN
KœÝš[™ÊK˜[YJKKš[™^OOHL	‰›‹Z[ÌŠ
K˜›ÛÛ
Kš[™^
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ‹š[˜\žT™XY\ÙN›™]È‹š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹]ÌŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹šÙ^O]œÝš[™Ê
NØœ™XZÎØØ\ÙHŽœ‹˜[YO]œÝš[™Ê
NØœ™XZÎØØ\ÙHÎœ‹š[™^]˜›ÛÛ

NØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]]ÌŠ
NÜ™]\›ŠKš\ÔÙ]
JKšÙ^JI‰Š‹šÙ^OTÝš[™ÊKšÙ^JJK
Kš\ÔÙ]
JK˜[YJI‰Š‹˜[YOTÝš[™ÊK˜[YJJK
Kš\ÔÙ]
JKš[™^
I‰Š‹š[™^HHYKš[™^
KŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆKšÙ^HOO]›ÚY	‰Š‹šÙ^OYKšÙ^JKK˜[YHOO]›ÚY	‰Š‹˜[YOYK˜[YJKKš[™^OO]›ÚY	‰Š‹š[™^YKš[™^
KŸKœ›ÛT\X[
J^Û]]ÌŠ
NÜ™]\›ˆ‹šÙ^OYKšÙ^OÏÈˆ‹‹˜[YOYK˜[YOÏÈˆ‹‹š[™^YKš[™^ÏÈLKŸ_NÙ[˜Ý[ÛˆŒŠ
^Ü™]\›žØÛÙNŒ]N›™]ÈZ[\œ˜^KÙÎˆˆ‹[™›Îˆˆ‹Ø\ÕØ[YšYÒ[

KØ\Õ\ÙYšYÒ[

K]™[Î–×KÛÙ\ÜXÙNˆˆŸ_]K‘^XÕ™\Ý[^Ý\U\›ˆ‹Ý[™\›Z[˜X˜ÚK‘^XÕ™\Ý[‹[˜ÛÙJKS‹š[˜\žUÜš]\‹˜Ü™X]J
J^ÙK˜ÛÙHOOL	‰›‹Z[ÌŠ
KZ[ÌŠK˜ÛÙJKK™]K›[™ÝOOL	‰›‹Z[ÌŠN
K˜ž]\ÊK™]JKK›ÙÈOOHˆ‰‰›‹Z[ÌŠŠKœÝš[™ÊK›ÙÊKKš[™›ÈOOHˆ‰‰›‹Z[ÌŠÍ
KœÝš[™ÊKš[™›ÊKK™Ø\ÕØ[YOOPšYÒ[

I‰›‹Z[ÌŠ
Kš[
K™Ø\ÕØ[Y
KK™Ø\Õ\ÙYOOPšYÒ[

I‰›‹Z[ÌŠ
Kš[
K™Ø\Õ\ÙY
NÙ›ÜŠ]ÙˆK™]™[Ê]K‘]™[™[˜ÛÙJ‹Z[ÌŠN
K™›ÜšÊ
JK›[[J
NÜ™]\›ˆK˜ÛÙ\ÜXÙHOOHˆ‰‰›‹Z[ÌŠŠKœÝš[™ÊK˜ÛÙ\ÜXÙJKŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ‹š[˜\žT™XY\ÙN›™]È‹š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹XŒŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹˜ÛÙO]Z[ÌŠ
NØœ™XZÎØØ\ÙHŽœ‹™]O]˜ž]\Ê
NØœ™XZÎØØ\ÙHÎœ‹›ÙÏ]œÝš[™Ê
NØœ™XZÎØØ\ÙHœ‹š[™›Ï]œÝš[™Ê
NØœ™XZÎØØ\ÙHNœ‹™Ø\ÕØ[Y]š[

NØœ™XZÎØØ\ÙHŽœ‹™Ø\Õ\ÙY]š[

NØœ™XZÎØØ\ÙHÎœ‹™]™[Ëœ\Ú
K‘]™[™XÛÙJZ[ÌŠ
JJNØœ™XZÎØØ\ÙHœ‹˜ÛÙ\ÜXÙO]œÝš[™Ê
NØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]XŒŠ
NÜ™]\›ŠKš\ÔÙ]
JK˜ÛÙJI‰Š‹˜ÛÙOS[X™\ŠK˜ÛÙJJK
Kš\ÔÙ]
JK™]JI‰Š‹™]OJK˜ž]\Ñœ›ÛP˜\ÙM
JK™]JJK
Kš\ÔÙ]
JK›ÙÊI‰Š‹›ÙÏTÝš[™ÊK›ÙÊJK
Kš\ÔÙ]
JKš[™›ÊI‰Š‹š[™›ÏTÝš[™ÊKš[™›ÊJK
Kš\ÔÙ]
JK™Ø\×ÝØ[Y
I‰Š‹™Ø\ÕØ[YPšYÒ[
K™Ø\×ÝØ[YÔÝš[™Ê
JJK
Kš\ÔÙ]
JK™Ø\×Ý\ÙY
I‰Š‹™Ø\Õ\ÙYPšYÒ[
K™Ø\×Ý\ÙYÔÝš[™Ê
JJK\œ˜^Kš\Ð\œ˜^JOË™]™[ÊI‰Š‹™]™[ÏYK™]™[Ë›X\
OK‘]™[™œ›ÛR”ÓÓŠ
JJK
Kš\ÔÙ]
JK˜ÛÙ\ÜXÙJI‰Š‹˜ÛÙ\ÜXÙOTÝš[™ÊK˜ÛÙ\ÜXÙJJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK˜ÛÙHOO]›ÚY	‰Š‹˜ÛÙOSX]œ›Ý[™
K˜ÛÙJJKK™]HOO]›ÚY	‰Š‹™]OJK˜˜\ÙMœ›ÛPž]\ÊJK™]HOO]›ÚYÙK™]N›™]ÈZ[\œ˜^JJKK›ÙÈOO]›ÚY	‰Š‹›ÙÏYK›ÙÊKKš[™›ÈOO]›ÚY	‰Š‹š[™›ÏYKš[™›ÊKK™Ø\ÕØ[YOO]›ÚY	‰Š‹™Ø\×ÝØ[YJK™Ø\ÕØ[YšYÒ[

JKÔÝš[™Ê
JKK™Ø\Õ\ÙYOO]›ÚY	‰Š‹™Ø\×Ý\ÙYJK™Ø\Õ\ÙYšYÒ[

JKÔÝš[™Ê
JKK™]™[ÏÛ‹™]™[ÏYK™]™[Ë›X\
OÝK‘]™[Ò”ÓÓŠ
N›ÚY
N›‹™]™[ÏV×KK˜ÛÙ\ÜXÙHOO]›ÚY	‰Š‹˜ÛÙ\ÜXÙOYK˜ÛÙ\ÜXÙJKŸKœ›ÛT\X[
J^Û]XŒŠ
NÜ™]\›ˆ‹˜ÛÙOYK˜ÛÙOÏÌ‹™]OYK™]OÏÛ™]ÈZ[\œ˜^K‹›ÙÏYK›ÙÏÏÈˆ‹‹š[™›ÏYKš[™›ÏÏÈˆ‹K™Ø\ÕØ[YOO]›ÚY	‰™K™Ø\ÕØ[YOO[[	‰Š‹™Ø\ÕØ[YPšYÒ[
K™Ø\ÕØ[YÔÝš[™Ê
JJKK™Ø\Õ\ÙYOO]›ÚY	‰™K™Ø\Õ\ÙYOO[[	‰Š‹™Ø\Õ\ÙYPšYÒ[
K™Ø\Õ\ÙYÔÝš[™Ê
JJK‹™]™[ÏYK™]™[ÏË›X\
OK‘]™[™œ›ÛT\X[

J_×K‹˜ÛÙ\ÜXÙOYK˜ÛÙ\ÜXÙOÏÈˆ‹Ÿ_NÙ[˜Ý[ÛˆŒŠ
^Ü™]\›žÚZYÚšYÒ[

K[™^Œ›™]ÈZ[\œ˜^K™\Ý[K‘^XÕ™\Ý[™œ›ÛT\X[
ßJ__]K•™\Ý[^Ý\U\›ˆ‹Ý[™\›Z[˜X˜ÚK•™\Ý[‹[˜ÛÙJKS‹š[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆKšZYÚOOPšYÒ[

I‰›‹Z[ÌŠ
Kš[
KšZYÚ
KKš[™^OOL	‰›‹Z[ÌŠMŠKZ[ÌŠKš[™^
KK›[™ÝOOL	‰›‹Z[ÌŠŠK˜ž]\ÊK
KKœ™\Ý[OO]›ÚY	‰K‘^XÕ™\Ý[™[˜ÛÙJKœ™\Ý[‹Z[ÌŠÍ
K™›ÜšÊ
JK›[[J
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ‹š[˜\žT™XY\ÙN›™]È‹š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹TŒŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹šZYÚ]š[

NØœ™XZÎØØ\ÙHŽœ‹š[™^]Z[ÌŠ
NØœ™XZÎØØ\ÙHÎœ‹]˜ž]\Ê
NØœ™XZÎØØ\ÙHœ‹œ™\Ý[]K‘^XÕ™\Ý[™XÛÙJZ[ÌŠ
JNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]TŒŠ
NÜ™]\›ŠKš\ÔÙ]
JKšZYÚ
I‰Š‹šZYÚPšYÒ[
KšZYÚÔÝš[™Ê
JJK
Kš\ÔÙ]
JKš[™^
I‰Š‹š[™^S[X™\ŠKš[™^
JK
Kš\ÔÙ]
JK
I‰Š‹JK˜ž]\Ñœ›ÛP˜\ÙM
JK
JK
Kš\ÔÙ]
JKœ™\Ý[
I‰Š‹œ™\Ý[]K‘^XÕ™\Ý[™œ›ÛR”ÓÓŠKœ™\Ý[
JKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆKšZYÚOO]›ÚY	‰Š‹šZYÚJKšZYÚšYÒ[

JKÔÝš[™Ê
JKKš[™^OO]›ÚY	‰Š‹š[™^SX]œ›Ý[™
Kš[™^
JKKOO]›ÚY	‰Š‹JK˜˜\ÙMœ›ÛPž]\ÊJKOO]›ÚYÙK›™]ÈZ[\œ˜^JJKKœ™\Ý[OO]›ÚY	‰Š‹œ™\Ý[YKœ™\Ý[ÝK‘^XÕ™\Ý[Ò”ÓÓŠKœ™\Ý[
N›ÚY
KŸKœ›ÛT\X[
J^Û]TŒŠ
NÜ™]\›ˆKšZYÚOO]›ÚY	‰™KšZYÚOO[[	‰Š‹šZYÚPšYÒ[
KšZYÚÔÝš[™Ê
JJK‹š[™^YKš[™^ÏÌ‹YKÏÛ™]ÈZ[\œ˜^KKœ™\Ý[OO]›ÚY	‰™Kœ™\Ý[OO[[	‰Š‹œ™\Ý[]K‘^XÕ™\Ý[™œ›ÛT\X[
Kœ™\Ý[
JKŸ_NÙ[˜Ý[ÛˆŠ
^Ü™]\›žØY™\ÜÎ›™]ÈZ[\œ˜^KÝÙ\ŽšYÒ[

__]K•˜[Y]Ü^Ý\U\›ˆ‹Ý[™\›Z[˜X˜ÚK•˜[Y]Üˆ‹[˜ÛÙJKS‹š[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK˜Y™\ÜË›[™ÝOOL	‰›‹Z[ÌŠL
K˜ž]\ÊK˜Y™\ÜÊKKœÝÙ\ˆOOPšYÒ[

I‰›‹Z[ÌŠ
Kš[
KœÝÙ\ŠKŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ‹š[˜\žT™XY\ÙN›™]È‹š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹TŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹˜Y™\ÜÏ]˜ž]\Ê
NØœ™XZÎØØ\ÙHÎœ‹œÝÙ\]š[

NØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]TŠ
NÜ™]\›ŠKš\ÔÙ]
JK˜Y™\ÜÊI‰Š‹˜Y™\ÜÏJK˜ž]\Ñœ›ÛP˜\ÙM
JK˜Y™\ÜÊJK
Kš\ÔÙ]
JKœÝÙ\ŠI‰Š‹œÝÙ\PšYÒ[
KœÝÙ\‹ÔÝš[™Ê
JJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK˜Y™\ÜÈOO]›ÚY	‰Š‹˜Y™\ÜÏJK˜˜\ÙMœ›ÛPž]\ÊJK˜Y™\ÜÈOO]›ÚYÙK˜Y™\ÜÎ›™]ÈZ[\œ˜^JJKKœÝÙ\ˆOO]›ÚY	‰Š‹œÝÙ\JKœÝÙ\ŸšYÒ[

JKÔÝš[™Ê
JKŸKœ›ÛT\X[
J^Û]TŠ
NÜ™]\›ˆ‹˜Y™\ÜÏYK˜Y™\ÜÏÏÛ™]ÈZ[\œ˜^KKœÝÙ\ˆOO]›ÚY	‰™KœÝÙ\ˆOO[[	‰Š‹œÝÙ\PšYÒ[
KœÝÙ\‹ÔÝš[™Ê
JJKŸ_NÙ[˜Ý[ÛˆŒŠ
^Ü™]\›žÜX’Ù^N‘K”X›XÒÙ^K™œ›ÛT\X[
ßJKÝÙ\ŽšYÒ[

__]K•˜[Y]Ü•\]O^Ý\U\›ˆ‹Ý[™\›Z[˜X˜ÚK•˜[Y]Ü•\]H‹[˜ÛÙJKS‹š[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆKœX’Ù^HOO]›ÚY	‰‘K”X›XÒÙ^K™[˜ÛÙJKœX’Ù^K‹Z[ÌŠL
K™›ÜšÊ
JK›[[J
KKœÝÙ\ˆOOPšYÒ[

I‰›‹Z[ÌŠMŠKš[
KœÝÙ\ŠKŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ‹š[˜\žT™XY\ÙN›™]È‹š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹SŒŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹œX’Ù^OQK”X›XÒÙ^K™XÛÙJZ[ÌŠ
JNØœ™XZÎØØ\ÙHŽœ‹œÝÙ\]š[

NØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]SŒŠ
NÜ™]\›ŠKš\ÔÙ]
JKœX’Ù^JI‰Š‹œX’Ù^OQK”X›XÒÙ^K™œ›ÛR”ÓÓŠKœX’Ù^JJK
Kš\ÔÙ]
JKœÝÙ\ŠI‰Š‹œÝÙ\PšYÒ[
KœÝÙ\‹ÔÝš[™Ê
JJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆKœX’Ù^HOO]›ÚY	‰Š‹œX’Ù^OYKœX’Ù^OÑK”X›XÒÙ^KÒ”ÓÓŠKœX’Ù^JN›ÚY
KKœÝÙ\ˆOO]›ÚY	‰Š‹œÝÙ\JKœÝÙ\ŸšYÒ[

JKÔÝš[™Ê
JKŸKœ›ÛT\X[
J^Û]SŒŠ
NÜ™]\›ˆKœX’Ù^HOO]›ÚY	‰™KœX’Ù^HOO[[	‰Š‹œX’Ù^OQK”X›XÒÙ^K™œ›ÛT\X[
KœX’Ù^JJKKœÝÙ\ˆOO]›ÚY	‰™KœÝÙ\ˆOO[[	‰Š‹œÝÙ\PšYÒ[
KœÝÙ\‹ÔÝš[™Ê
JJKŸ_NÙ[˜Ý[ÛˆŒŠ
^Ü™]\›žÝ˜[Y]ÜŽK•˜[Y]Ü‹™œ›ÛT\X[
ßJK›ØÚÒY›YÎŒ_]K•›ÝR[™›Ï^Ý\U\›ˆ‹Ý[™\›Z[˜X˜ÚK•›ÝR[™›È‹[˜ÛÙJKS‹š[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK˜[Y]ÜˆOO]›ÚY	‰K•˜[Y]Ü‹™[˜ÛÙJK˜[Y]Ü‹‹Z[ÌŠL
K™›ÜšÊ
JK›[[J
KK˜›ØÚÒY›YÈOOL	‰›‹Z[ÌŠ
Kš[ÌŠK˜›ØÚÒY›YÊKŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ‹š[˜\žT™XY\ÙN›™]È‹š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹]ŒŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹˜[Y]Ü]K•˜[Y]Ü‹™XÛÙJZ[ÌŠ
JNØœ™XZÎØØ\ÙHÎœ‹˜›ØÚÒY›YÏ]š[ÌŠ
NØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]]ŒŠ
NÜ™]\›ŠKš\ÔÙ]
JK˜[Y]ÜŠI‰Š‹˜[Y]Ü]K•˜[Y]Ü‹™œ›ÛR”ÓÓŠK˜[Y]ÜŠJK
Kš\ÔÙ]
JK˜›ØÚÒY›YÊI‰Š‹˜›ØÚÒY›YÏJ˜›ØÚÒQ›YÑœ›ÛR”ÓÓŠJK˜›ØÚÒY›YÊJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK˜[Y]ÜˆOO]›ÚY	‰Š‹˜[Y]ÜYK˜[Y]ÜÝK•˜[Y]Ü‹Ò”ÓÓŠK˜[Y]ÜŠN›ÚY
KK˜›ØÚÒY›YÈOO]›ÚY	‰Š‹˜›ØÚÒY›YÏJ˜›ØÚÒQ›YÕÒ”ÓÓŠJK˜›ØÚÒY›YÊJKŸKœ›ÛT\X[
J^Û]]ŒŠ
NÜ™]\›ˆK˜[Y]ÜˆOO]›ÚY	‰™K˜[Y]ÜˆOO[[	‰Š‹˜[Y]Ü]K•˜[Y]Ü‹™œ›ÛT\X[
K˜[Y]ÜŠJK‹˜›ØÚÒY›YÏYK˜›ØÚÒY›YÏÏÌŸ_NÙ[˜Ý[ÛˆÌŠ
^Ü™]\›žÝ˜[Y]ÜŽK•˜[Y]Ü‹™œ›ÛT\X[
ßJK›ÝQ^[œÚ[ÛŽ›™]ÈZ[\œ˜^K^[œÚ[Û”ÚYÛ˜]\™N›™]ÈZ[\œ˜^K›ØÚÒY›YÎŒ_]K‘^[™Y›ÝR[™›Ï^Ý\U\›ˆ‹Ý[™\›Z[˜X˜ÚK‘^[™Y›ÝR[™›È‹[˜ÛÙJKS‹š[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK˜[Y]ÜˆOO]›ÚY	‰K•˜[Y]Ü‹™[˜ÛÙJK˜[Y]Ü‹‹Z[ÌŠL
K™›ÜšÊ
JK›[[J
KK›ÝQ^[œÚ[Û‹›[™ÝOOL	‰›‹Z[ÌŠŠK˜ž]\ÊK›ÝQ^[œÚ[ÛŠKK™^[œÚ[Û”ÚYÛ˜]\™K›[™ÝOOL	‰›‹Z[ÌŠÍ
K˜ž]\ÊK™^[œÚ[Û”ÚYÛ˜]\™JKK˜›ØÚÒY›YÈOOL	‰›‹Z[ÌŠ
Kš[ÌŠK˜›ØÚÒY›YÊKŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ‹š[˜\žT™XY\ÙN›™]È‹š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹SÌŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹˜[Y]Ü]K•˜[Y]Ü‹™XÛÙJZ[ÌŠ
JNØœ™XZÎØØ\ÙHÎœ‹›ÝQ^[œÚ[Û]˜ž]\Ê
NØœ™XZÎØØ\ÙHœ‹™^[œÚ[Û”ÚYÛ˜]\™O]˜ž]\Ê
NØœ™XZÎØØ\ÙHNœ‹˜›ØÚÒY›YÏ]š[ÌŠ
NØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]SÌŠ
NÜ™]\›ŠKš\ÔÙ]
JK˜[Y]ÜŠI‰Š‹˜[Y]Ü]K•˜[Y]Ü‹™œ›ÛR”ÓÓŠK˜[Y]ÜŠJK
Kš\ÔÙ]
JK›ÝQ^[œÚ[ÛŠI‰Š‹›ÝQ^[œÚ[ÛJK˜ž]\Ñœ›ÛP˜\ÙM
JK›ÝQ^[œÚ[ÛŠJK
Kš\ÔÙ]
JK™^[œÚ[Û”ÚYÛ˜]\™JI‰Š‹™^[œÚ[Û”ÚYÛ˜]\™OJK˜ž]\Ñœ›ÛP˜\ÙM
JK™^[œÚ[Û”ÚYÛ˜]\™JJK
Kš\ÔÙ]
JK˜›ØÚÒY›YÊI‰Š‹˜›ØÚÒY›YÏJ˜›ØÚÒQ›YÑœ›ÛR”ÓÓŠJK˜›ØÚÒY›YÊJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK˜[Y]ÜˆOO]›ÚY	‰Š‹˜[Y]ÜYK˜[Y]ÜÝK•˜[Y]Ü‹Ò”ÓÓŠK˜[Y]ÜŠN›ÚY
KK›ÝQ^[œÚ[ÛˆOO]›ÚY	‰Š‹›ÝQ^[œÚ[ÛJK˜˜\ÙMœ›ÛPž]\ÊJK›ÝQ^[œÚ[ÛˆOO]›ÚYÙK›ÝQ^[œÚ[ÛŽ›™]ÈZ[\œ˜^JJKK™^[œÚ[Û”ÚYÛ˜]\™HOO]›ÚY	‰Š‹™^[œÚ[Û”ÚYÛ˜]\™OJK˜˜\ÙMœ›ÛPž]\ÊJK™^[œÚ[Û”ÚYÛ˜]\™HOO]›ÚYÙK™^[œÚ[Û”ÚYÛ˜]\™N›™]ÈZ[\œ˜^JJKK˜›ØÚÒY›YÈOO]›ÚY	‰Š‹˜›ØÚÒY›YÏJ˜›ØÚÒQ›YÕÒ”ÓÓŠJK˜›ØÚÒY›YÊJKŸKœ›ÛT\X[
J^Û]SÌŠ
NÜ™]\›ˆK˜[Y]ÜˆOO]›ÚY	‰™K˜[Y]ÜˆOO[[	‰Š‹˜[Y]Ü]K•˜[Y]Ü‹™œ›ÛT\X[
K˜[Y]ÜŠJK‹›ÝQ^[œÚ[ÛYK›ÝQ^[œÚ[ÛÏÛ™]ÈZ[\œ˜^K‹™^[œÚ[Û”ÚYÛ˜]\™OYK™^[œÚ[Û”ÚYÛ˜]\™OÏÛ™]ÈZ[\œ˜^K‹˜›ØÚÒY›YÏYK˜›ØÚÒY›YÏÏÌŸ_NÙ[˜Ý[ÛˆŠ
^Ü™]\›žÝ\NŒ˜[Y]ÜŽK•˜[Y]Ü‹™œ›ÛT\X[
ßJKZYÚšYÒ[

K[YNšÜ‹•[Y\Ý[\™œ›ÛT\X[
ßJKÝ[›Ý[™ÔÝÙ\ŽšYÒ[

__]K“Z\Ø™Z]š[Ü^Ý\U\›ˆ‹Ý[™\›Z[˜X˜ÚK“Z\Ø™Z]š[Üˆ‹[˜ÛÙJKS‹š[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK\HOOL	‰›‹Z[ÌŠ
Kš[ÌŠK\JKK˜[Y]ÜˆOO]›ÚY	‰K•˜[Y]Ü‹™[˜ÛÙJK˜[Y]Ü‹‹Z[ÌŠN
K™›ÜšÊ
JK›[[J
KKšZYÚOOPšYÒ[

I‰›‹Z[ÌŠ
Kš[
KšZYÚ
KK[YHOO]›ÚY	‰šÜ‹•[Y\Ý[\™[˜ÛÙJK[YK‹Z[ÌŠÍ
K™›ÜšÊ
JK›[[J
KKÝ[›Ý[™ÔÝÙ\ˆOOPšYÒ[

I‰›‹Z[ÌŠ
Kš[
KÝ[›Ý[™ÔÝÙ\ŠKŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ‹š[˜\žT™XY\ÙN›™]È‹š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹QŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹\O]š[ÌŠ
NØœ™XZÎØØ\ÙHŽœ‹˜[Y]Ü]K•˜[Y]Ü‹™XÛÙJZ[ÌŠ
JNØœ™XZÎØØ\ÙHÎœ‹šZYÚ]š[

NØœ™XZÎØØ\ÙHœ‹[YOZÜ‹•[Y\Ý[\™XÛÙJZ[ÌŠ
JNØœ™XZÎØØ\ÙHNœ‹Ý[›Ý[™ÔÝÙ\]š[

NØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]QŠ
NÜ™]\›ŠKš\ÔÙ]
JK\JI‰Š‹\OYJK\JJK
Kš\ÔÙ]
JK˜[Y]ÜŠI‰Š‹˜[Y]Ü]K•˜[Y]Ü‹™œ›ÛR”ÓÓŠK˜[Y]ÜŠJK
Kš\ÔÙ]
JKšZYÚ
I‰Š‹šZYÚPšYÒ[
KšZYÚÔÝš[™Ê
JJK
Kš\ÔÙ]
JK[YJI‰Š‹[YOJK™œ›ÛRœÛÛ•[Y\Ý[\
JK[YJJK
Kš\ÔÙ]
JKÝ[›Ý[™ÔÝÙ\ŠI‰Š‹Ý[›Ý[™ÔÝÙ\PšYÒ[
KÝ[›Ý[™ÔÝÙ\‹ÔÝš[™Ê
JJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK\HOO]›ÚY	‰Š‹\OXÓJK\JJKK˜[Y]ÜˆOO]›ÚY	‰Š‹˜[Y]ÜYK˜[Y]ÜÝK•˜[Y]Ü‹Ò”ÓÓŠK˜[Y]ÜŠN›ÚY
KKšZYÚOO]›ÚY	‰Š‹šZYÚJKšZYÚšYÒ[

JKÔÝš[™Ê
JKK[YHOO]›ÚY	‰Š‹[YOJK™œ›ÛU[Y\Ý[\
JK[YJKÒTÓÔÝš[™Ê
JKKÝ[›Ý[™ÔÝÙ\ˆOO]›ÚY	‰Š‹Ý[›Ý[™ÔÝÙ\JKÝ[›Ý[™ÔÝÙ\ŸšYÒ[

JKÔÝš[™Ê
JKŸKœ›ÛT\X[
J^Û]QŠ
NÜ™]\›ˆ‹\OYK\OÏÌK˜[Y]ÜˆOO]›ÚY	‰™K˜[Y]ÜˆOO[[	‰Š‹˜[Y]Ü]K•˜[Y]Ü‹™œ›ÛT\X[
K˜[Y]ÜŠJKKšZYÚOO]›ÚY	‰™KšZYÚOO[[	‰Š‹šZYÚPšYÒ[
KšZYÚÔÝš[™Ê
JJKK[YHOO]›ÚY	‰™K[YHOO[[	‰Š‹[YOZÜ‹•[Y\Ý[\™œ›ÛT\X[
K[YJJKKÝ[›Ý[™ÔÝÙ\ˆOO]›ÚY	‰™KÝ[›Ý[™ÔÝÙ\ˆOO[[	‰Š‹Ý[›Ý[™ÔÝÙ\PšYÒ[
KÝ[›Ý[™ÔÝÙ\‹ÔÝš[™Ê
JJKŸ_NÙ[˜Ý[ÛˆLŠ
^Ü™]\›žÚZYÚšYÒ[

K›Ü›X]ŒÚ[šÜÎŒ\Ú›™]ÈZ[\œ˜^KY]Y]N›™]ÈZ[\œ˜^__]K”Û˜\ÚÝ^Ý\U\›ˆ‹Ý[™\›Z[˜X˜ÚK”Û˜\ÚÝ‹[˜ÛÙJKS‹š[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆKšZYÚOOPšYÒ[

I‰›‹Z[ÌŠ
KZ[
KšZYÚ
KK™›Ü›X]OOL	‰›‹Z[ÌŠMŠKZ[ÌŠK™›Ü›X]
KK˜Ú[šÜÈOOL	‰›‹Z[ÌŠ
KZ[ÌŠK˜Ú[šÜÊKKš\Ú›[™ÝOOL	‰›‹Z[ÌŠÍ
K˜ž]\ÊKš\Ú
KK›Y]Y]K›[™ÝOOL	‰›‹Z[ÌŠŠK˜ž]\ÊK›Y]Y]JKŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ‹š[˜\žT™XY\ÙN›™]È‹š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹ULŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹šZYÚ]Z[

NØœ™XZÎØØ\ÙHŽœ‹™›Ü›X]]Z[ÌŠ
NØœ™XZÎØØ\ÙHÎœ‹˜Ú[šÜÏ]Z[ÌŠ
NØœ™XZÎØØ\ÙHœ‹š\Ú]˜ž]\Ê
NØœ™XZÎØØ\ÙHNœ‹›Y]Y]O]˜ž]\Ê
NØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]ULŠ
NÜ™]\›ŠKš\ÔÙ]
JKšZYÚ
I‰Š‹šZYÚPšYÒ[
KšZYÚÔÝš[™Ê
JJK
Kš\ÔÙ]
JK™›Ü›X]
I‰Š‹™›Ü›X]S[X™\ŠK™›Ü›X]
JK
Kš\ÔÙ]
JK˜Ú[šÜÊI‰Š‹˜Ú[šÜÏS[X™\ŠK˜Ú[šÜÊJK
Kš\ÔÙ]
JKš\Ú
I‰Š‹š\ÚJK˜ž]\Ñœ›ÛP˜\ÙM
JKš\Ú
JK
Kš\ÔÙ]
JK›Y]Y]JI‰Š‹›Y]Y]OJK˜ž]\Ñœ›ÛP˜\ÙM
JK›Y]Y]JJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆKšZYÚOO]›ÚY	‰Š‹šZYÚJKšZYÚšYÒ[

JKÔÝš[™Ê
JKK™›Ü›X]OO]›ÚY	‰Š‹™›Ü›X]SX]œ›Ý[™
K™›Ü›X]
JKK˜Ú[šÜÈOO]›ÚY	‰Š‹˜Ú[šÜÏSX]œ›Ý[™
K˜Ú[šÜÊJKKš\ÚOO]›ÚY	‰Š‹š\ÚJK˜˜\ÙMœ›ÛPž]\ÊJKš\ÚOO]›ÚYÙKš\Ú›™]ÈZ[\œ˜^JJKK›Y]Y]HOO]›ÚY	‰Š‹›Y]Y]OJK˜˜\ÙMœ›ÛPž]\ÊJK›Y]Y]HOO]›ÚYÙK›Y]Y]N›™]ÈZ[\œ˜^JJKŸKœ›ÛT\X[
J^Û]ULŠ
NÜ™]\›ˆKšZYÚOO]›ÚY	‰™KšZYÚOO[[	‰Š‹šZYÚPšYÒ[
KšZYÚÔÝš[™Ê
JJK‹™›Ü›X]YK™›Ü›X]ÏÌ‹˜Ú[šÜÏYK˜Ú[šÜÏÏÌ‹š\ÚYKš\ÚÏÛ™]ÈZ[\œ˜^K‹›Y]Y]OYK›Y]Y]OÏÛ™]ÈZ[\œ˜^KŸ__JNÝ˜\ˆ“RJOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\J‹—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÑ‹•˜[Y]Ü•\]\ÏQ‹”ÛÛQ‹”™Y[YØ][Û”™\ÜÛœÙOQ‹”™Y[YØ][Û‘[žT™\ÜÛœÙOQ‹‘[YØ][Û”™\ÜÛœÙOQ‹”\˜[\ÏQ‹”™Y[YØ][ÛQ‹”™Y[YØ][Û‘[žOQ‹•[˜›Û™[™Ñ[YØ][Û‘[žOQ‹•[˜›Û™[™Ñ[YØ][ÛQ‹‘[YØ][ÛQ‹‘••š\]ÏQ‹‘••š\]Q‹‘”Z\œÏQ‹‘”Z\Q‹•˜[Y™\ÜÙ\ÏQ‹•˜[Y]ÜQ‹‘\ØÜš\[ÛQ‹ÛÛ[Z\ÜÚ[ÛQ‹ÛÛ[Z\ÜÚ[Û”˜]\ÏQ‹’\ÝÜšXØ[[™›ÏQ‹’[™œ˜XÝ[ÛQ‹›Û™Ý]\ÏQ‹œ›ÝØY”XÚØYÙO]›ÚYÑ‹˜›Û™Ý]\Ñœ›ÛR”ÓÓ]SNÑ‹˜›Û™Ý]\ÕÒ”ÓÓPSNÑ‹š[™œ˜XÝ[Û‘œ›ÛR”ÓÓTVÑ‹š[™œ˜XÝ[Û•Ò”ÓÓ]ÖÝ˜\ˆPO]J
KO\ZJ
K]

KOT

KPOQŠ
K	^Š
KOPÙJ
KYOQYJ
NÑ‹œ›ÝØY”XÚØYÙOH˜ÛÜÛ[ÜËœÝZÚ[™ËŒX™]LHŽÝ˜\ˆXNÊ[˜Ý[ÛŠJ^ÙVÙK“Ó‘ÔÕUT×ÕS”ÔPÒQ’QQLOH“Ó‘ÔÕUT×ÕS”ÔPÒQ’QQ‹VÙK“Ó‘ÔÕUT×ÕS“Ó‘QLWOH“Ó‘ÔÕUT×ÕS“Ó‘Q‹VÙK“Ó‘ÔÕUT×ÕS“Ó‘S‘ÏL—OH“Ó‘ÔÕUT×ÕS“Ó‘S‘È‹VÙK“Ó‘ÔÕUT×Ð“Ó‘QL×OH“Ó‘ÔÕUT×Ð“Ó‘Q‹VÙK•S”‘PÓÑÓ’V‘QKLWOH•S”‘PÓÑÓ’V‘QŸJJX_
‹›Û™Ý]\ÏUXO^ßJJNÙ[˜Ý[ÛˆSJJ^ÜÝÚ]Ú
J^ØØ\ÙH˜Ø\ÙH“Ó‘ÔÕUT×ÕS”ÔPÒQ’QQŽœ™]\›ˆXK“Ó‘ÔÕUT×ÕS”ÔPÒQ’QQØØ\ÙHN˜Ø\ÙH“Ó‘ÔÕUT×ÕS“Ó‘QŽœ™]\›ˆXK“Ó‘ÔÕUT×ÕS“Ó‘QØØ\ÙHŽ˜Ø\ÙH“Ó‘ÔÕUT×ÕS“Ó‘S‘ÈŽœ™]\›ˆXK“Ó‘ÔÕUT×ÕS“Ó‘S‘ÎØØ\ÙHÎ˜Ø\ÙH“Ó‘ÔÕUT×Ð“Ó‘QŽœ™]\›ˆXK“Ó‘ÔÕUT×Ð“Ó‘QÙY˜][œ™]\›ˆXK•S”‘PÓÑÓ’V‘Q_Y[˜Ý[ÛˆSJJ^ÜÝÚ]Ú
J^ØØ\ÙHXK“Ó‘ÔÕUT×ÕS”ÔPÒQ’QQœ™]\›ˆ“Ó‘ÔÕUT×ÕS”ÔPÒQ’QQŽØØ\ÙHXK“Ó‘ÔÕUT×ÕS“Ó‘Qœ™]\›ˆ“Ó‘ÔÕUT×ÕS“Ó‘QŽØØ\ÙHXK“Ó‘ÔÕUT×ÕS“Ó‘S‘Îœ™]\›ˆ“Ó‘ÔÕUT×ÕS“Ó‘S‘ÈŽØØ\ÙHXK“Ó‘ÔÕUT×Ð“Ó‘Qœ™]\›ˆ“Ó‘ÔÕUT×Ð“Ó‘QŽØØ\ÙHXK•S”‘PÓÑÓ’V‘Q™Y˜][œ™]\›ˆ•S”‘PÓÑÓ’V‘QŸ_]˜\ˆœÎÊ[˜Ý[ÛŠJ^ÙVÙK’S‘”PÕSÓ—ÕS”ÔPÒQ’QQLOH’S‘”PÕSÓ—ÕS”ÔPÒQ’QQ‹VÙK’S‘”PÕSÓ—ÑÕP“WÔÒQÓLWOH’S‘”PÕSÓ—ÑÕP“WÔÒQÓˆ‹VÙK’S‘”PÕSÓ—ÑÕÓ•SQOL—OH’S‘”PÕSÓ—ÑÕÓ•SQH‹VÙK•S”‘PÓÑÓ’V‘QKLWOH•S”‘PÓÑÓ’V‘QŸJJœß
‹’[™œ˜XÝ[ÛVœÏ^ßJJNÙ[˜Ý[ÛˆV
J^ÜÝÚ]Ú
J^ØØ\ÙH˜Ø\ÙH’S‘”PÕSÓ—ÕS”ÔPÒQ’QQŽœ™]\›ˆœË’S‘”PÕSÓ—ÕS”ÔPÒQ’QQØØ\ÙHN˜Ø\ÙH’S‘”PÕSÓ—ÑÕP“WÔÒQÓˆŽœ™]\›ˆœË’S‘”PÕSÓ—ÑÕP“WÔÒQÓŽØØ\ÙHŽ˜Ø\ÙH’S‘”PÕSÓ—ÑÕÓ•SQHŽœ™]\›ˆœË’S‘”PÕSÓ—ÑÕÓ•SQNÙY˜][œ™]\›ˆœË•S”‘PÓÑÓ’V‘Q_Y[˜Ý[ÛˆÖ
J^ÜÝÚ]Ú
J^ØØ\ÙHœË’S‘”PÕSÓ—ÕS”ÔPÒQ’QQœ™]\›ˆ’S‘”PÕSÓ—ÕS”ÔPÒQ’QQŽØØ\ÙHœË’S‘”PÕSÓ—ÑÕP“WÔÒQÓŽœ™]\›ˆ’S‘”PÕSÓ—ÑÕP“WÔÒQÓˆŽØØ\ÙHœË’S‘”PÕSÓ—ÑÕÓ•SQNœ™]\›ˆ’S‘”PÕSÓ—ÑÕÓ•SQHŽØØ\ÙHœË•S”‘PÓÑÓ’V‘Q™Y˜][œ™]\›ˆ•S”‘PÓÑÓ’V‘QŸ_Y[˜Ý[ÛˆŠ
^Ü™]\›žÚXY\ŽœPK’XY\‹™œ›ÛT\X[
ßJK˜[Ù]–×__Q‹’\ÝÜšXØ[[™›Ï^Ý\U\›ˆ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK’\ÝÜšXØ[[™›È‹[˜ÛÙJKRKš[˜\žUÜš]\‹˜Ü™X]J
J^ÙKšXY\ˆOO]›ÚY	‰œPK’XY\‹™[˜ÛÙJKšXY\‹‹Z[ÌŠL
K™›ÜšÊ
JK›[[J
NÙ›ÜŠ]ÙˆK˜[Ù]
Q‹•˜[Y]Ü‹™[˜ÛÙJ‹Z[ÌŠN
K™›ÜšÊ
JK›[[J
NÜ™]\›ˆŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆKš[˜\žT™XY\ÙN›™]ÈKš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹UŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹šXY\\PK’XY\‹™XÛÙJZ[ÌŠ
JNØœ™XZÎØØ\ÙHŽœ‹˜[Ù]œ\Ú
‹•˜[Y]Ü‹™XÛÙJZ[ÌŠ
JJNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]UŠ
NÜ™]\›ŠYKš\ÔÙ]
JKšXY\ŠI‰Š‹šXY\\PK’XY\‹™œ›ÛR”ÓÓŠKšXY\ŠJK\œ˜^Kš\Ð\œ˜^JOË˜[Ù]
I‰Š‹˜[Ù]YK˜[Ù]›X\
O‘‹•˜[Y]Ü‹™œ›ÛR”ÓÓŠ
JJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆKšXY\ˆOO]›ÚY	‰Š‹šXY\YKšXY\ÜPK’XY\‹Ò”ÓÓŠKšXY\ŠN›ÚY
KK˜[Ù]Û‹˜[Ù]YK˜[Ù]›X\
OÑ‹•˜[Y]Ü‹Ò”ÓÓŠ
N›ÚY
N›‹˜[Ù]V×KŸKœ›ÛT\X[
J^Û]UŠ
NÜ™]\›ˆKšXY\ˆOO]›ÚY	‰™KšXY\ˆOO[[	‰Š‹šXY\\PK’XY\‹™œ›ÛT\X[
KšXY\ŠJK‹˜[Ù]YK˜[Ù]Ë›X\
O‘‹•˜[Y]Ü‹™œ›ÛT\X[

J_×KŸ_NÙ[˜Ý[ÛˆŒŠ
^Ü™]\›žÜ˜]Nˆˆ‹X^˜]Nˆˆ‹X^Ú[™ÙT˜]NˆˆŸ_Q‹ÛÛ[Z\ÜÚ[Û”˜]\Ï^Ý\U\›ˆ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LKÛÛ[Z\ÜÚ[Û”˜]\È‹[˜ÛÙJKRKš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆKœ˜]HOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊKœ˜]JKK›X^˜]HOOHˆ‰‰›‹Z[ÌŠN
KœÝš[™ÊK›X^˜]JKK›X^Ú[™ÙT˜]HOOHˆ‰‰›‹Z[ÌŠŠKœÝš[™ÊK›X^Ú[™ÙT˜]JKŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆKš[˜\žT™XY\ÙN›™]ÈKš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹RŒŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹œ˜]O]œÝš[™Ê
NØœ™XZÎØØ\ÙHŽœ‹›X^˜]O]œÝš[™Ê
NØœ™XZÎØØ\ÙHÎœ‹›X^Ú[™ÙT˜]O]œÝš[™Ê
NØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]RŒŠ
NÜ™]\›ŠYKš\ÔÙ]
JKœ˜]JI‰Š‹œ˜]OTÝš[™ÊKœ˜]JJK
YKš\ÔÙ]
JK›X^˜]JI‰Š‹›X^˜]OTÝš[™ÊK›X^˜]JJK
YKš\ÔÙ]
JK›X^Ú[™ÙT˜]JI‰Š‹›X^Ú[™ÙT˜]OTÝš[™ÊK›X^Ú[™ÙT˜]JJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆKœ˜]HOO]›ÚY	‰Š‹œ˜]OYKœ˜]JKK›X^˜]HOO]›ÚY	‰Š‹›X^˜]OYK›X^˜]JKK›X^Ú[™ÙT˜]HOO]›ÚY	‰Š‹›X^Ú[™ÙT˜]OYK›X^Ú[™ÙT˜]JKŸKœ›ÛT\X[
J^Û]RŒŠ
NÜ™]\›ˆ‹œ˜]OYKœ˜]OÏÈˆ‹‹›X^˜]OYK›X^˜]OÏÈˆ‹‹›X^Ú[™ÙT˜]OYK›X^Ú[™ÙT˜]OÏÈˆ‹Ÿ_NÙ[˜Ý[ÛˆŒŠ
^Ü™]\›žØÛÛ[Z\ÜÚ[Û”˜]\Î‘‹ÛÛ[Z\ÜÚ[Û”˜]\Ë™œ›ÛT\X[
ßJK\]U[YN–K•[Y\Ý[\™œ›ÛT\X[
ßJ__Q‹ÛÛ[Z\ÜÚ[Û^Ý\U\›ˆ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LKÛÛ[Z\ÜÚ[Ûˆ‹[˜ÛÙJKRKš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK˜ÛÛ[Z\ÜÚ[Û”˜]\ÈOO]›ÚY	‰‘‹ÛÛ[Z\ÜÚ[Û”˜]\Ë™[˜ÛÙJK˜ÛÛ[Z\ÜÚ[Û”˜]\Ë‹Z[ÌŠL
K™›ÜšÊ
JK›[[J
KK\]U[YHOO]›ÚY	‰–K•[Y\Ý[\™[˜ÛÙJK\]U[YK‹Z[ÌŠN
K™›ÜšÊ
JK›[[J
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆKš[˜\žT™XY\ÙN›™]ÈKš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹QŒŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹˜ÛÛ[Z\ÜÚ[Û”˜]\ÏQ‹ÛÛ[Z\ÜÚ[Û”˜]\Ë™XÛÙJZ[ÌŠ
JNØœ™XZÎØØ\ÙHŽœ‹\]U[YOVK•[Y\Ý[\™XÛÙJZ[ÌŠ
JNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]QŒŠ
NÜ™]\›ŠYKš\ÔÙ]
JK˜ÛÛ[Z\ÜÚ[Û”˜]\ÊI‰Š‹˜ÛÛ[Z\ÜÚ[Û”˜]\ÏQ‹ÛÛ[Z\ÜÚ[Û”˜]\Ë™œ›ÛR”ÓÓŠK˜ÛÛ[Z\ÜÚ[Û”˜]\ÊJK
YKš\ÔÙ]
JK\]U[YJI‰Š‹\]U[YOJYK™œ›ÛRœÛÛ•[Y\Ý[\
JK\]U[YJJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK˜ÛÛ[Z\ÜÚ[Û”˜]\ÈOO]›ÚY	‰Š‹˜ÛÛ[Z\ÜÚ[Û”˜]\ÏYK˜ÛÛ[Z\ÜÚ[Û”˜]\ÏÑ‹ÛÛ[Z\ÜÚ[Û”˜]\ËÒ”ÓÓŠK˜ÛÛ[Z\ÜÚ[Û”˜]\ÊN›ÚY
KK\]U[YHOO]›ÚY	‰Š‹\]U[YOJYK™œ›ÛU[Y\Ý[\
JK\]U[YJKÒTÓÔÝš[™Ê
JKŸKœ›ÛT\X[
J^Û]QŒŠ
NÜ™]\›ˆK˜ÛÛ[Z\ÜÚ[Û”˜]\ÈOO]›ÚY	‰™K˜ÛÛ[Z\ÜÚ[Û”˜]\ÈOO[[	‰Š‹˜ÛÛ[Z\ÜÚ[Û”˜]\ÏQ‹ÛÛ[Z\ÜÚ[Û”˜]\Ë™œ›ÛT\X[
K˜ÛÛ[Z\ÜÚ[Û”˜]\ÊJKK\]U[YHOO]›ÚY	‰™K\]U[YHOO[[	‰Š‹\]U[YOVK•[Y\Ý[\™œ›ÛT\X[
K\]U[YJJKŸ_NÙ[˜Ý[ÛˆLŠ
^Ü™]\›žÛ[ÛšZÙ\Žˆˆ‹Y[]Nˆˆ‹ÙXœÚ]Nˆˆ‹ÙXÝ\š]PÛÛXÝˆˆ‹]Z[ÎˆˆŸ_Q‹‘\ØÜš\[Û^Ý\U\›ˆ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK‘\ØÜš\[Ûˆ‹[˜ÛÙJKRKš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK›[ÛšZÙ\ˆOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊK›[ÛšZÙ\ŠKKšY[]HOOHˆ‰‰›‹Z[ÌŠN
KœÝš[™ÊKšY[]JKKÙXœÚ]HOOHˆ‰‰›‹Z[ÌŠŠKœÝš[™ÊKÙXœÚ]JKKœÙXÝ\š]PÛÛXÝOOHˆ‰‰›‹Z[ÌŠÍ
KœÝš[™ÊKœÙXÝ\š]PÛÛXÝ
KK™]Z[ÈOOHˆ‰‰›‹Z[ÌŠŠKœÝš[™ÊK™]Z[ÊKŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆKš[˜\žT™XY\ÙN›™]ÈKš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹\LŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹›[ÛšZÙ\]œÝš[™Ê
NØœ™XZÎØØ\ÙHŽœ‹šY[]O]œÝš[™Ê
NØœ™XZÎØØ\ÙHÎœ‹ÙXœÚ]O]œÝš[™Ê
NØœ™XZÎØØ\ÙHœ‹œÙXÝ\š]PÛÛXÝ]œÝš[™Ê
NØœ™XZÎØØ\ÙHNœ‹™]Z[Ï]œÝš[™Ê
NØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]\LŠ
NÜ™]\›ŠYKš\ÔÙ]
JK›[ÛšZÙ\ŠI‰Š‹›[ÛšZÙ\TÝš[™ÊK›[ÛšZÙ\ŠJK
YKš\ÔÙ]
JKšY[]JI‰Š‹šY[]OTÝš[™ÊKšY[]JJK
YKš\ÔÙ]
JKÙXœÚ]JI‰Š‹ÙXœÚ]OTÝš[™ÊKÙXœÚ]JJK
YKš\ÔÙ]
JKœÙXÝ\š]PÛÛXÝ
I‰Š‹œÙXÝ\š]PÛÛXÝTÝš[™ÊKœÙXÝ\š]PÛÛXÝ
JK
YKš\ÔÙ]
JK™]Z[ÊI‰Š‹™]Z[ÏTÝš[™ÊK™]Z[ÊJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK›[ÛšZÙ\ˆOO]›ÚY	‰Š‹›[ÛšZÙ\YK›[ÛšZÙ\ŠKKšY[]HOO]›ÚY	‰Š‹šY[]OYKšY[]JKKÙXœÚ]HOO]›ÚY	‰Š‹ÙXœÚ]OYKÙXœÚ]JKKœÙXÝ\š]PÛÛXÝOO]›ÚY	‰Š‹œÙXÝ\š]PÛÛXÝYKœÙXÝ\š]PÛÛXÝ
KK™]Z[ÈOO]›ÚY	‰Š‹™]Z[ÏYK™]Z[ÊKŸKœ›ÛT\X[
J^Û]\LŠ
NÜ™]\›ˆ‹›[ÛšZÙ\YK›[ÛšZÙ\ÏÈˆ‹‹šY[]OYKšY[]OÏÈˆ‹‹ÙXœÚ]OYKÙXœÚ]OÏÈˆ‹‹œÙXÝ\š]PÛÛXÝYKœÙXÝ\š]PÛÛXÝÏÈˆ‹‹™]Z[ÏYK™]Z[ÏÏÈˆ‹Ÿ_NÙ[˜Ý[ÛˆŠ
^Ü™]\›žÛÜ\˜]ÜY™\ÜÎˆˆ‹ÛÛœÙ[œÝ\ÔXšÙ^N›ÚY˜Z[YˆLKÝ]\ÎŒÚÙ[œÎˆˆ‹[YØ]Ü”Ú\™\Îˆˆ‹\ØÜš\[ÛŽ‘‹‘\ØÜš\[Û‹™œ›ÛT\X[
ßJK[˜›Û™[™ÒZYÚšYÒ[

K[˜›Û™[™Õ[YN–K•[Y\Ý[\™œ›ÛT\X[
ßJKÛÛ[Z\ÜÚ[ÛŽ‘‹ÛÛ[Z\ÜÚ[Û‹™œ›ÛT\X[
ßJKZ[”Ù[‘[YØ][ÛŽˆˆ‹[˜›Û™[™ÓÛ’Û™YÛÝ[šYÒ[

K[˜›Û™[™ÒYÎ–×__Q‹•˜[Y]Ü^Ý\U\›ˆ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK•˜[Y]Üˆ‹[˜ÛÙJKRKš[˜\žUÜš]\‹˜Ü™X]J
J^ÙK›Ü\˜]ÜY™\ÜÈOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊK›Ü\˜]ÜY™\ÜÊKK˜ÛÛœÙ[œÝ\ÔXšÙ^HOO]›ÚY	‰–‹[žK™[˜ÛÙJK˜ÛÛœÙ[œÝ\ÔXšÙ^K‹Z[ÌŠN
K™›ÜšÊ
JK›[[J
KKš˜Z[YOOHL	‰›‹Z[ÌŠ
K˜›ÛÛ
Kš˜Z[Y
KKœÝ]\ÈOOL	‰›‹Z[ÌŠÌŠKš[ÌŠKœÝ]\ÊKKÚÙ[œÈOOHˆ‰‰›‹Z[ÌŠŠKœÝš[™ÊKÚÙ[œÊKK™[YØ]Ü”Ú\™\ÈOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊK™[YØ]Ü”Ú\™\ÊKK™\ØÜš\[ÛˆOO]›ÚY	‰‘‹‘\ØÜš\[Û‹™[˜ÛÙJK™\ØÜš\[Û‹‹Z[ÌŠN
K™›ÜšÊ
JK›[[J
KK[˜›Û™[™ÒZYÚOOPšYÒ[

I‰›‹Z[ÌŠ
Kš[
K[˜›Û™[™ÒZYÚ
KK[˜›Û™[™Õ[YHOO]›ÚY	‰–K•[Y\Ý[\™[˜ÛÙJK[˜›Û™[™Õ[YK‹Z[ÌŠÍ
K™›ÜšÊ
JK›[[J
KK˜ÛÛ[Z\ÜÚ[ÛˆOO]›ÚY	‰‘‹ÛÛ[Z\ÜÚ[Û‹™[˜ÛÙJK˜ÛÛ[Z\ÜÚ[Û‹‹Z[ÌŠŠK™›ÜšÊ
JK›[[J
KK›Z[”Ù[‘[YØ][ÛˆOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊK›Z[”Ù[‘[YØ][ÛŠKK[˜›Û™[™ÓÛ’Û™YÛÝ[OOPšYÒ[

I‰›‹Z[ÌŠMŠKš[
K[˜›Û™[™ÓÛ’Û™YÛÝ[
K‹Z[ÌŠLŠK™›ÜšÊ
NÙ›ÜŠ]ÙˆK[˜›Û™[™ÒYÊ[‹Z[

NÜ™]\›ˆ‹›[[J
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆKš[˜\žT™XY\ÙN›™]ÈKš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹RŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹›Ü\˜]ÜY™\ÜÏ]œÝš[™Ê
NØœ™XZÎØØ\ÙHŽœ‹˜ÛÛœÙ[œÝ\ÔXšÙ^OV‹[žK™XÛÙJZ[ÌŠ
JNØœ™XZÎØØ\ÙHÎœ‹š˜Z[Y]˜›ÛÛ

NØœ™XZÎØØ\ÙHœ‹œÝ]\Ï]š[ÌŠ
NØœ™XZÎØØ\ÙHNœ‹ÚÙ[œÏ]œÝš[™Ê
NØœ™XZÎØØ\ÙHŽœ‹™[YØ]Ü”Ú\™\Ï]œÝš[™Ê
NØœ™XZÎØØ\ÙHÎœ‹™\ØÜš\[ÛQ‹‘\ØÜš\[Û‹™XÛÙJZ[ÌŠ
JNØœ™XZÎØØ\ÙHœ‹[˜›Û™[™ÒZYÚ]š[

NØœ™XZÎØØ\ÙHNœ‹[˜›Û™[™Õ[YOVK•[Y\Ý[\™XÛÙJZ[ÌŠ
JNØœ™XZÎØØ\ÙHLœ‹˜ÛÛ[Z\ÜÚ[ÛQ‹ÛÛ[Z\ÜÚ[Û‹™XÛÙJZ[ÌŠ
JNØœ™XZÎØØ\ÙHLNœ‹›Z[”Ù[‘[YØ][Û]œÝš[™Ê
NØœ™XZÎØØ\ÙHLŽœ‹[˜›Û™[™ÓÛ’Û™YÛÝ[]š[

NØœ™XZÎØØ\ÙHLÎšYŠ
ÉÊOOOLŠ^Û]O]Z[ÌŠ
JÝœÜÎÙ›ÜŠÝœÜÏNÊ\‹[˜›Û™[™ÒYËœ\Ú
Z[

J_Y[ÙH‹[˜›Û™[™ÒYËœ\Ú
Z[

JNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]RŠ
NÜ™]\›ŠYKš\ÔÙ]
JK›Ü\˜]ÜY™\ÜÊI‰Š‹›Ü\˜]ÜY™\ÜÏTÝš[™ÊK›Ü\˜]ÜY™\ÜÊJK
YKš\ÔÙ]
JK˜ÛÛœÙ[œÝ\ÔXšÙ^JI‰Š‹˜ÛÛœÙ[œÝ\ÔXšÙ^OV‹[žK™œ›ÛR”ÓÓŠK˜ÛÛœÙ[œÝ\ÔXšÙ^JJK
YKš\ÔÙ]
JKš˜Z[Y
I‰Š‹š˜Z[YHHYKš˜Z[Y
K
YKš\ÔÙ]
JKœÝ]\ÊI‰Š‹œÝ]\Ï]SJKœÝ]\ÊJK
YKš\ÔÙ]
JKÚÙ[œÊI‰Š‹ÚÙ[œÏTÝš[™ÊKÚÙ[œÊJK
YKš\ÔÙ]
JK™[YØ]Ü”Ú\™\ÊI‰Š‹™[YØ]Ü”Ú\™\ÏTÝš[™ÊK™[YØ]Ü”Ú\™\ÊJK
YKš\ÔÙ]
JK™\ØÜš\[ÛŠI‰Š‹™\ØÜš\[ÛQ‹‘\ØÜš\[Û‹™œ›ÛR”ÓÓŠK™\ØÜš\[ÛŠJK
YKš\ÔÙ]
JK[˜›Û™[™ÒZYÚ
I‰Š‹[˜›Û™[™ÒZYÚPšYÒ[
K[˜›Û™[™ÒZYÚÔÝš[™Ê
JJK
YKš\ÔÙ]
JK[˜›Û™[™Õ[YJI‰Š‹[˜›Û™[™Õ[YOJYK™œ›ÛRœÛÛ•[Y\Ý[\
JK[˜›Û™[™Õ[YJJK
YKš\ÔÙ]
JK˜ÛÛ[Z\ÜÚ[ÛŠI‰Š‹˜ÛÛ[Z\ÜÚ[ÛQ‹ÛÛ[Z\ÜÚ[Û‹™œ›ÛR”ÓÓŠK˜ÛÛ[Z\ÜÚ[ÛŠJK
YKš\ÔÙ]
JK›Z[”Ù[‘[YØ][ÛŠI‰Š‹›Z[”Ù[‘[YØ][ÛTÝš[™ÊK›Z[”Ù[‘[YØ][ÛŠJK
YKš\ÔÙ]
JK[˜›Û™[™ÓÛ’Û™YÛÝ[
I‰Š‹[˜›Û™[™ÓÛ’Û™YÛÝ[PšYÒ[
K[˜›Û™[™ÓÛ’Û™YÛÝ[ÔÝš[™Ê
JJK\œ˜^Kš\Ð\œ˜^JOË[˜›Û™[™ÒYÊI‰Š‹[˜›Û™[™ÒYÏYK[˜›Û™[™ÒYË›X\
OšYÒ[
ÔÝš[™Ê
JJJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK›Ü\˜]ÜY™\ÜÈOO]›ÚY	‰Š‹›Ü\˜]ÜY™\ÜÏYK›Ü\˜]ÜY™\ÜÊKK˜ÛÛœÙ[œÝ\ÔXšÙ^HOO]›ÚY	‰Š‹˜ÛÛœÙ[œÝ\ÔXšÙ^OYK˜ÛÛœÙ[œÝ\ÔXšÙ^OÖ‹[žKÒ”ÓÓŠK˜ÛÛœÙ[œÝ\ÔXšÙ^JN›ÚY
KKš˜Z[YOO]›ÚY	‰Š‹š˜Z[YYKš˜Z[Y
KKœÝ]\ÈOO]›ÚY	‰Š‹œÝ]\ÏPSJKœÝ]\ÊJKKÚÙ[œÈOO]›ÚY	‰Š‹ÚÙ[œÏYKÚÙ[œÊKK™[YØ]Ü”Ú\™\ÈOO]›ÚY	‰Š‹™[YØ]Ü”Ú\™\ÏYK™[YØ]Ü”Ú\™\ÊKK™\ØÜš\[ÛˆOO]›ÚY	‰Š‹™\ØÜš\[ÛYK™\ØÜš\[ÛÑ‹‘\ØÜš\[Û‹Ò”ÓÓŠK™\ØÜš\[ÛŠN›ÚY
KK[˜›Û™[™ÒZYÚOO]›ÚY	‰Š‹[˜›Û™[™ÒZYÚJK[˜›Û™[™ÒZYÚšYÒ[

JKÔÝš[™Ê
JKK[˜›Û™[™Õ[YHOO]›ÚY	‰Š‹[˜›Û™[™Õ[YOJYK™œ›ÛU[Y\Ý[\
JK[˜›Û™[™Õ[YJKÒTÓÔÝš[™Ê
JKK˜ÛÛ[Z\ÜÚ[ÛˆOO]›ÚY	‰Š‹˜ÛÛ[Z\ÜÚ[ÛYK˜ÛÛ[Z\ÜÚ[ÛÑ‹ÛÛ[Z\ÜÚ[Û‹Ò”ÓÓŠK˜ÛÛ[Z\ÜÚ[ÛŠN›ÚY
KK›Z[”Ù[‘[YØ][ÛˆOO]›ÚY	‰Š‹›Z[”Ù[‘[YØ][ÛYK›Z[”Ù[‘[YØ][ÛŠKK[˜›Û™[™ÓÛ’Û™YÛÝ[OO]›ÚY	‰Š‹[˜›Û™[™ÓÛ’Û™YÛÝ[JK[˜›Û™[™ÓÛ’Û™YÛÝ[šYÒ[

JKÔÝš[™Ê
JKK[˜›Û™[™ÒYÏÛ‹[˜›Û™[™ÒYÏYK[˜›Û™[™ÒYË›X\
OŠšYÒ[

JKÔÝš[™Ê
JN›‹[˜›Û™[™ÒYÏV×KŸKœ›ÛT\X[
J^Û]RŠ
NÜ™]\›ˆ‹›Ü\˜]ÜY™\ÜÏYK›Ü\˜]ÜY™\ÜÏÏÈˆ‹K˜ÛÛœÙ[œÝ\ÔXšÙ^HOO]›ÚY	‰™K˜ÛÛœÙ[œÝ\ÔXšÙ^HOO[[	‰Š‹˜ÛÛœÙ[œÝ\ÔXšÙ^OV‹[žK™œ›ÛT\X[
K˜ÛÛœÙ[œÝ\ÔXšÙ^JJK‹š˜Z[YYKš˜Z[YÏÈLK‹œÝ]\ÏYKœÝ]\ÏÏÌ‹ÚÙ[œÏYKÚÙ[œÏÏÈˆ‹‹™[YØ]Ü”Ú\™\ÏYK™[YØ]Ü”Ú\™\ÏÏÈˆ‹K™\ØÜš\[ÛˆOO]›ÚY	‰™K™\ØÜš\[ÛˆOO[[	‰Š‹™\ØÜš\[ÛQ‹‘\ØÜš\[Û‹™œ›ÛT\X[
K™\ØÜš\[ÛŠJKK[˜›Û™[™ÒZYÚOO]›ÚY	‰™K[˜›Û™[™ÒZYÚOO[[	‰Š‹[˜›Û™[™ÒZYÚPšYÒ[
K[˜›Û™[™ÒZYÚÔÝš[™Ê
JJKK[˜›Û™[™Õ[YHOO]›ÚY	‰™K[˜›Û™[™Õ[YHOO[[	‰Š‹[˜›Û™[™Õ[YOVK•[Y\Ý[\™œ›ÛT\X[
K[˜›Û™[™Õ[YJJKK˜ÛÛ[Z\ÜÚ[ÛˆOO]›ÚY	‰™K˜ÛÛ[Z\ÜÚ[ÛˆOO[[	‰Š‹˜ÛÛ[Z\ÜÚ[ÛQ‹ÛÛ[Z\ÜÚ[Û‹™œ›ÛT\X[
K˜ÛÛ[Z\ÜÚ[ÛŠJK‹›Z[”Ù[‘[YØ][ÛYK›Z[”Ù[‘[YØ][ÛÏÈˆ‹K[˜›Û™[™ÓÛ’Û™YÛÝ[OO]›ÚY	‰™K[˜›Û™[™ÓÛ’Û™YÛÝ[OO[[	‰Š‹[˜›Û™[™ÓÛ’Û™YÛÝ[PšYÒ[
K[˜›Û™[™ÓÛ’Û™YÛÝ[ÔÝš[™Ê
JJK‹[˜›Û™[™ÒYÏYK[˜›Û™[™ÒYÏË›X\
OšYÒ[
ÔÝš[™Ê
JJ_×KŸ_NÙ[˜Ý[ÛˆLŠ
^Ü™]\›žØY™\ÜÙ\Î–×__Q‹•˜[Y™\ÜÙ\Ï^Ý\U\›ˆ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK•˜[Y™\ÜÙ\È‹[˜ÛÙJKRKš[˜\žUÜš]\‹˜Ü™X]J
J^Ù›ÜŠ]ÙˆK˜Y™\ÜÙ\Ê[‹Z[ÌŠL
KœÝš[™Ê
NÜ™]\›ˆŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆKš[˜\žT™XY\ÙN›™]ÈKš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹SLŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÛÏŒÏOOLOÜ‹˜Y™\ÜÙ\Ëœ\Ú
œÝš[™Ê
JNœÚÚ\\JÉÊ_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]SLŠ
NÜ™]\›ˆ\œ˜^Kš\Ð\œ˜^JOË˜Y™\ÜÙ\ÊI‰Š‹˜Y™\ÜÙ\ÏYK˜Y™\ÜÙ\Ë›X\
O”Ýš[™Ê
JJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK˜Y™\ÜÙ\ÏÛ‹˜Y™\ÜÙ\ÏYK˜Y™\ÜÙ\Ë›X\
O
N›‹˜Y™\ÜÙ\ÏV×KŸKœ›ÛT\X[
J^Û]SLŠ
NÜ™]\›ˆ‹˜Y™\ÜÙ\ÏYK˜Y™\ÜÙ\ÏË›X\
O
_×KŸ_NÙ[˜Ý[ÛˆÌŠ
^Ü™]\›žÙ[YØ]ÜY™\ÜÎˆˆ‹˜[Y]ÜY™\ÜÎˆˆŸ_Q‹‘”Z\^Ý\U\›ˆ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK‘”Z\ˆ‹[˜ÛÙJKRKš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK™[YØ]ÜY™\ÜÈOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊK™[YØ]ÜY™\ÜÊKK˜[Y]ÜY™\ÜÈOOHˆ‰‰›‹Z[ÌŠN
KœÝš[™ÊK˜[Y]ÜY™\ÜÊKŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆKš[˜\žT™XY\ÙN›™]ÈKš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹WÌŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹™[YØ]ÜY™\ÜÏ]œÝš[™Ê
NØœ™XZÎØØ\ÙHŽœ‹˜[Y]ÜY™\ÜÏ]œÝš[™Ê
NØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]WÌŠ
NÜ™]\›ŠYKš\ÔÙ]
JK™[YØ]ÜY™\ÜÊI‰Š‹™[YØ]ÜY™\ÜÏTÝš[™ÊK™[YØ]ÜY™\ÜÊJK
YKš\ÔÙ]
JK˜[Y]ÜY™\ÜÊI‰Š‹˜[Y]ÜY™\ÜÏTÝš[™ÊK˜[Y]ÜY™\ÜÊJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK™[YØ]ÜY™\ÜÈOO]›ÚY	‰Š‹™[YØ]ÜY™\ÜÏYK™[YØ]ÜY™\ÜÊKK˜[Y]ÜY™\ÜÈOO]›ÚY	‰Š‹˜[Y]ÜY™\ÜÏYK˜[Y]ÜY™\ÜÊKŸKœ›ÛT\X[
J^Û]WÌŠ
NÜ™]\›ˆ‹™[YØ]ÜY™\ÜÏYK™[YØ]ÜY™\ÜÏÏÈˆ‹‹˜[Y]ÜY™\ÜÏYK˜[Y]ÜY™\ÜÏÏÈˆ‹Ÿ_NÙ[˜Ý[ÛˆÌŠ
^Ü™]\›žÜZ\œÎ–×__Q‹‘”Z\œÏ^Ý\U\›ˆ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK‘”Z\œÈ‹[˜ÛÙJKRKš[˜\žUÜš]\‹˜Ü™X]J
J^Ù›ÜŠ]ÙˆKœZ\œÊQ‹‘”Z\‹™[˜ÛÙJ‹Z[ÌŠL
K™›ÜšÊ
JK›[[J
NÜ™]\›ˆŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆKš[˜\žT™XY\ÙN›™]ÈKš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹QÌŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÛÏŒÏOOLOÜ‹œZ\œËœ\Ú
‹‘”Z\‹™XÛÙJZ[ÌŠ
JJNœÚÚ\\JÉÊ_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]QÌŠ
NÜ™]\›ˆ\œ˜^Kš\Ð\œ˜^JOËœZ\œÊI‰Š‹œZ\œÏYKœZ\œË›X\
O‘‹‘”Z\‹™œ›ÛR”ÓÓŠ
JJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆKœZ\œÏÛ‹œZ\œÏYKœZ\œË›X\
OÑ‹‘”Z\‹Ò”ÓÓŠ
N›ÚY
N›‹œZ\œÏV×KŸKœ›ÛT\X[
J^Û]QÌŠ
NÜ™]\›ˆ‹œZ\œÏYKœZ\œÏË›X\
O‘‹‘”Z\‹™œ›ÛT\X[

J_×KŸ_NÙ[˜Ý[ÛˆŒŠ
^Ü™]\›žÙ[YØ]ÜY™\ÜÎˆˆ‹˜[Y]Ü”Ü˜ÐY™\ÜÎˆˆ‹˜[Y]Ü‘ÝY™\ÜÎˆˆŸ_Q‹‘••š\]^Ý\U\›ˆ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK‘••š\]‹[˜ÛÙJKRKš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK™[YØ]ÜY™\ÜÈOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊK™[YØ]ÜY™\ÜÊKK˜[Y]Ü”Ü˜ÐY™\ÜÈOOHˆ‰‰›‹Z[ÌŠN
KœÝš[™ÊK˜[Y]Ü”Ü˜ÐY™\ÜÊKK˜[Y]Ü‘ÝY™\ÜÈOOHˆ‰‰›‹Z[ÌŠŠKœÝš[™ÊK˜[Y]Ü‘ÝY™\ÜÊKŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆKš[˜\žT™XY\ÙN›™]ÈKš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹UŒŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹™[YØ]ÜY™\ÜÏ]œÝš[™Ê
NØœ™XZÎØØ\ÙHŽœ‹˜[Y]Ü”Ü˜ÐY™\ÜÏ]œÝš[™Ê
NØœ™XZÎØØ\ÙHÎœ‹˜[Y]Ü‘ÝY™\ÜÏ]œÝš[™Ê
NØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]UŒŠ
NÜ™]\›ŠYKš\ÔÙ]
JK™[YØ]ÜY™\ÜÊI‰Š‹™[YØ]ÜY™\ÜÏTÝš[™ÊK™[YØ]ÜY™\ÜÊJK
YKš\ÔÙ]
JK˜[Y]Ü”Ü˜ÐY™\ÜÊI‰Š‹˜[Y]Ü”Ü˜ÐY™\ÜÏTÝš[™ÊK˜[Y]Ü”Ü˜ÐY™\ÜÊJK
YKš\ÔÙ]
JK˜[Y]Ü‘ÝY™\ÜÊI‰Š‹˜[Y]Ü‘ÝY™\ÜÏTÝš[™ÊK˜[Y]Ü‘ÝY™\ÜÊJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK™[YØ]ÜY™\ÜÈOO]›ÚY	‰Š‹™[YØ]ÜY™\ÜÏYK™[YØ]ÜY™\ÜÊKK˜[Y]Ü”Ü˜ÐY™\ÜÈOO]›ÚY	‰Š‹˜[Y]Ü”Ü˜ÐY™\ÜÏYK˜[Y]Ü”Ü˜ÐY™\ÜÊKK˜[Y]Ü‘ÝY™\ÜÈOO]›ÚY	‰Š‹˜[Y]Ü‘ÝY™\ÜÏYK˜[Y]Ü‘ÝY™\ÜÊKŸKœ›ÛT\X[
J^Û]UŒŠ
NÜ™]\›ˆ‹™[YØ]ÜY™\ÜÏYK™[YØ]ÜY™\ÜÏÏÈˆ‹‹˜[Y]Ü”Ü˜ÐY™\ÜÏYK˜[Y]Ü”Ü˜ÐY™\ÜÏÏÈˆ‹‹˜[Y]Ü‘ÝY™\ÜÏYK˜[Y]Ü‘ÝY™\ÜÏÏÈˆ‹Ÿ_NÙ[˜Ý[ÛˆÌŠ
^Ü™]\›žÝš\]Î–×__Q‹‘••š\]Ï^Ý\U\›ˆ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK‘••š\]È‹[˜ÛÙJKRKš[˜\žUÜš]\‹˜Ü™X]J
J^Ù›ÜŠ]ÙˆKš\]ÊQ‹‘••š\]™[˜ÛÙJ‹Z[ÌŠL
K™›ÜšÊ
JK›[[J
NÜ™]\›ˆŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆKš[˜\žT™XY\ÙN›™]ÈKš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹RÌŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÛÏŒÏOOLOÜ‹š\]Ëœ\Ú
‹‘••š\]™XÛÙJZ[ÌŠ
JJNœÚÚ\\JÉÊ_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]RÌŠ
NÜ™]\›ˆ\œ˜^Kš\Ð\œ˜^JOËš\]ÊI‰Š‹š\]ÏYKš\]Ë›X\
O‘‹‘••š\]™œ›ÛR”ÓÓŠ
JJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆKš\]ÏÛ‹š\]ÏYKš\]Ë›X\
OÑ‹‘••š\]Ò”ÓÓŠ
N›ÚY
N›‹š\]ÏV×KŸKœ›ÛT\X[
J^Û]RÌŠ
NÜ™]\›ˆ‹š\]ÏYKš\]ÏË›X\
O‘‹‘••š\]™œ›ÛT\X[

J_×KŸ_NÙ[˜Ý[ÛˆÌŠ
^Ü™]\›žÙ[YØ]ÜY™\ÜÎˆˆ‹˜[Y]ÜY™\ÜÎˆˆ‹Ú\™\ÎˆˆŸ_Q‹‘[YØ][Û^Ý\U\›ˆ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK‘[YØ][Ûˆ‹[˜ÛÙJKRKš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK™[YØ]ÜY™\ÜÈOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊK™[YØ]ÜY™\ÜÊKK˜[Y]ÜY™\ÜÈOOHˆ‰‰›‹Z[ÌŠN
KœÝš[™ÊK˜[Y]ÜY™\ÜÊKKœÚ\™\ÈOOHˆ‰‰›‹Z[ÌŠŠKœÝš[™ÊKœÚ\™\ÊKŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆKš[˜\žT™XY\ÙN›™]ÈKš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹UÌŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹™[YØ]ÜY™\ÜÏ]œÝš[™Ê
NØœ™XZÎØØ\ÙHŽœ‹˜[Y]ÜY™\ÜÏ]œÝš[™Ê
NØœ™XZÎØØ\ÙHÎœ‹œÚ\™\Ï]œÝš[™Ê
NØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]UÌŠ
NÜ™]\›ŠYKš\ÔÙ]
JK™[YØ]ÜY™\ÜÊI‰Š‹™[YØ]ÜY™\ÜÏTÝš[™ÊK™[YØ]ÜY™\ÜÊJK
YKš\ÔÙ]
JK˜[Y]ÜY™\ÜÊI‰Š‹˜[Y]ÜY™\ÜÏTÝš[™ÊK˜[Y]ÜY™\ÜÊJK
YKš\ÔÙ]
JKœÚ\™\ÊI‰Š‹œÚ\™\ÏTÝš[™ÊKœÚ\™\ÊJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK™[YØ]ÜY™\ÜÈOO]›ÚY	‰Š‹™[YØ]ÜY™\ÜÏYK™[YØ]ÜY™\ÜÊKK˜[Y]ÜY™\ÜÈOO]›ÚY	‰Š‹˜[Y]ÜY™\ÜÏYK˜[Y]ÜY™\ÜÊKKœÚ\™\ÈOO]›ÚY	‰Š‹œÚ\™\ÏYKœÚ\™\ÊKŸKœ›ÛT\X[
J^Û]UÌŠ
NÜ™]\›ˆ‹™[YØ]ÜY™\ÜÏYK™[YØ]ÜY™\ÜÏÏÈˆ‹‹˜[Y]ÜY™\ÜÏYK˜[Y]ÜY™\ÜÏÏÈˆ‹‹œÚ\™\ÏYKœÚ\™\ÏÏÈˆ‹Ÿ_NÙ[˜Ý[ÛˆŠ
^Ü™]\›žÙ[YØ]ÜY™\ÜÎˆˆ‹˜[Y]ÜY™\ÜÎˆˆ‹[šY\Î–×__Q‹•[˜›Û™[™Ñ[YØ][Û^Ý\U\›ˆ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK•[˜›Û™[™Ñ[YØ][Ûˆ‹[˜ÛÙJKRKš[˜\žUÜš]\‹˜Ü™X]J
J^ÙK™[YØ]ÜY™\ÜÈOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊK™[YØ]ÜY™\ÜÊKK˜[Y]ÜY™\ÜÈOOHˆ‰‰›‹Z[ÌŠN
KœÝš[™ÊK˜[Y]ÜY™\ÜÊNÙ›ÜŠ]ÙˆK™[šY\ÊQ‹•[˜›Û™[™Ñ[YØ][Û‘[žK™[˜ÛÙJ‹Z[ÌŠŠK™›ÜšÊ
JK›[[J
NÜ™]\›ˆŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆKš[˜\žT™XY\ÙN›™]ÈKš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹SŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹™[YØ]ÜY™\ÜÏ]œÝš[™Ê
NØœ™XZÎØØ\ÙHŽœ‹˜[Y]ÜY™\ÜÏ]œÝš[™Ê
NØœ™XZÎØØ\ÙHÎœ‹™[šY\Ëœ\Ú
‹•[˜›Û™[™Ñ[YØ][Û‘[žK™XÛÙJZ[ÌŠ
JJNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]SŠ
NÜ™]\›ŠYKš\ÔÙ]
JK™[YØ]ÜY™\ÜÊI‰Š‹™[YØ]ÜY™\ÜÏTÝš[™ÊK™[YØ]ÜY™\ÜÊJK
YKš\ÔÙ]
JK˜[Y]ÜY™\ÜÊI‰Š‹˜[Y]ÜY™\ÜÏTÝš[™ÊK˜[Y]ÜY™\ÜÊJK\œ˜^Kš\Ð\œ˜^JOË™[šY\ÊI‰Š‹™[šY\ÏYK™[šY\Ë›X\
O‘‹•[˜›Û™[™Ñ[YØ][Û‘[žK™œ›ÛR”ÓÓŠ
JJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK™[YØ]ÜY™\ÜÈOO]›ÚY	‰Š‹™[YØ]ÜY™\ÜÏYK™[YØ]ÜY™\ÜÊKK˜[Y]ÜY™\ÜÈOO]›ÚY	‰Š‹˜[Y]ÜY™\ÜÏYK˜[Y]ÜY™\ÜÊKK™[šY\ÏÛ‹™[šY\ÏYK™[šY\Ë›X\
OÑ‹•[˜›Û™[™Ñ[YØ][Û‘[žKÒ”ÓÓŠ
N›ÚY
N›‹™[šY\ÏV×KŸKœ›ÛT\X[
J^Û]SŠ
NÜ™]\›ˆ‹™[YØ]ÜY™\ÜÏYK™[YØ]ÜY™\ÜÏÏÈˆ‹‹˜[Y]ÜY™\ÜÏYK˜[Y]ÜY™\ÜÏÏÈˆ‹‹™[šY\ÏYK™[šY\ÏË›X\
O‘‹•[˜›Û™[™Ñ[YØ][Û‘[žK™œ›ÛT\X[

J_×KŸ_NÙ[˜Ý[ÛˆLŠ
^Ü™]\›žØÜ™X][Û’ZYÚšYÒ[

KÛÛ\][Û•[YN–K•[Y\Ý[\™œ›ÛT\X[
ßJK[š]X[˜[[˜ÙNˆˆ‹˜[[˜ÙNˆˆ‹[˜›Û™[™ÒYšYÒ[

K[˜›Û™[™ÓÛ’Û™YÛÝ[šYÒ[

__Q‹•[˜›Û™[™Ñ[YØ][Û‘[žO^Ý\U\›ˆ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK•[˜›Û™[™Ñ[YØ][Û‘[žH‹[˜ÛÙJKRKš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK˜Ü™X][Û’ZYÚOOPšYÒ[

I‰›‹Z[ÌŠ
Kš[
K˜Ü™X][Û’ZYÚ
KK˜ÛÛ\][Û•[YHOO]›ÚY	‰–K•[Y\Ý[\™[˜ÛÙJK˜ÛÛ\][Û•[YK‹Z[ÌŠN
K™›ÜšÊ
JK›[[J
KKš[š]X[˜[[˜ÙHOOHˆ‰‰›‹Z[ÌŠŠKœÝš[™ÊKš[š]X[˜[[˜ÙJKK˜˜[[˜ÙHOOHˆ‰‰›‹Z[ÌŠÍ
KœÝš[™ÊK˜˜[[˜ÙJKK[˜›Û™[™ÒYOOPšYÒ[

I‰›‹Z[ÌŠ
KZ[
K[˜›Û™[™ÒY
KK[˜›Û™[™ÓÛ’Û™YÛÝ[OOPšYÒ[

I‰›‹Z[ÌŠ
Kš[
K[˜›Û™[™ÓÛ’Û™YÛÝ[
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆKš[˜\žT™XY\ÙN›™]ÈKš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹VLŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹˜Ü™X][Û’ZYÚ]š[

NØœ™XZÎØØ\ÙHŽœ‹˜ÛÛ\][Û•[YOVK•[Y\Ý[\™XÛÙJZ[ÌŠ
JNØœ™XZÎØØ\ÙHÎœ‹š[š]X[˜[[˜ÙO]œÝš[™Ê
NØœ™XZÎØØ\ÙHœ‹˜˜[[˜ÙO]œÝš[™Ê
NØœ™XZÎØØ\ÙHNœ‹[˜›Û™[™ÒY]Z[

NØœ™XZÎØØ\ÙHŽœ‹[˜›Û™[™ÓÛ’Û™YÛÝ[]š[

NØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]VLŠ
NÜ™]\›ŠYKš\ÔÙ]
JK˜Ü™X][Û’ZYÚ
I‰Š‹˜Ü™X][Û’ZYÚPšYÒ[
K˜Ü™X][Û’ZYÚÔÝš[™Ê
JJK
YKš\ÔÙ]
JK˜ÛÛ\][Û•[YJI‰Š‹˜ÛÛ\][Û•[YOJYK™œ›ÛRœÛÛ•[Y\Ý[\
JK˜ÛÛ\][Û•[YJJK
YKš\ÔÙ]
JKš[š]X[˜[[˜ÙJI‰Š‹š[š]X[˜[[˜ÙOTÝš[™ÊKš[š]X[˜[[˜ÙJJK
YKš\ÔÙ]
JK˜˜[[˜ÙJI‰Š‹˜˜[[˜ÙOTÝš[™ÊK˜˜[[˜ÙJJK
YKš\ÔÙ]
JK[˜›Û™[™ÒY
I‰Š‹[˜›Û™[™ÒYPšYÒ[
K[˜›Û™[™ÒYÔÝš[™Ê
JJK
YKš\ÔÙ]
JK[˜›Û™[™ÓÛ’Û™YÛÝ[
I‰Š‹[˜›Û™[™ÓÛ’Û™YÛÝ[PšYÒ[
K[˜›Û™[™ÓÛ’Û™YÛÝ[ÔÝš[™Ê
JJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK˜Ü™X][Û’ZYÚOO]›ÚY	‰Š‹˜Ü™X][Û’ZYÚJK˜Ü™X][Û’ZYÚšYÒ[

JKÔÝš[™Ê
JKK˜ÛÛ\][Û•[YHOO]›ÚY	‰Š‹˜ÛÛ\][Û•[YOJYK™œ›ÛU[Y\Ý[\
JK˜ÛÛ\][Û•[YJKÒTÓÔÝš[™Ê
JKKš[š]X[˜[[˜ÙHOO]›ÚY	‰Š‹š[š]X[˜[[˜ÙOYKš[š]X[˜[[˜ÙJKK˜˜[[˜ÙHOO]›ÚY	‰Š‹˜˜[[˜ÙOYK˜˜[[˜ÙJKK[˜›Û™[™ÒYOO]›ÚY	‰Š‹[˜›Û™[™ÒYJK[˜›Û™[™ÒYšYÒ[

JKÔÝš[™Ê
JKK[˜›Û™[™ÓÛ’Û™YÛÝ[OO]›ÚY	‰Š‹[˜›Û™[™ÓÛ’Û™YÛÝ[JK[˜›Û™[™ÓÛ’Û™YÛÝ[šYÒ[

JKÔÝš[™Ê
JKŸKœ›ÛT\X[
J^Û]VLŠ
NÜ™]\›ˆK˜Ü™X][Û’ZYÚOO]›ÚY	‰™K˜Ü™X][Û’ZYÚOO[[	‰Š‹˜Ü™X][Û’ZYÚPšYÒ[
K˜Ü™X][Û’ZYÚÔÝš[™Ê
JJKK˜ÛÛ\][Û•[YHOO]›ÚY	‰™K˜ÛÛ\][Û•[YHOO[[	‰Š‹˜ÛÛ\][Û•[YOVK•[Y\Ý[\™œ›ÛT\X[
K˜ÛÛ\][Û•[YJJK‹š[š]X[˜[[˜ÙOYKš[š]X[˜[[˜ÙOÏÈˆ‹‹˜˜[[˜ÙOYK˜˜[[˜ÙOÏÈˆ‹K[˜›Û™[™ÒYOO]›ÚY	‰™K[˜›Û™[™ÒYOO[[	‰Š‹[˜›Û™[™ÒYPšYÒ[
K[˜›Û™[™ÒYÔÝš[™Ê
JJKK[˜›Û™[™ÓÛ’Û™YÛÝ[OO]›ÚY	‰™K[˜›Û™[™ÓÛ’Û™YÛÝ[OO[[	‰Š‹[˜›Û™[™ÓÛ’Û™YÛÝ[PšYÒ[
K[˜›Û™[™ÓÛ’Û™YÛÝ[ÔÝš[™Ê
JJKŸ_NÙ[˜Ý[ÛˆŒŠ
^Ü™]\›žØÜ™X][Û’ZYÚšYÒ[

KÛÛ\][Û•[YN–K•[Y\Ý[\™œ›ÛT\X[
ßJK[š]X[˜[[˜ÙNˆˆ‹Ú\™\ÑÝˆˆ‹[˜›Û™[™ÒYšYÒ[

K[˜›Û™[™ÓÛ’Û™YÛÝ[šYÒ[

__Q‹”™Y[YØ][Û‘[žO^Ý\U\›ˆ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK”™Y[YØ][Û‘[žH‹[˜ÛÙJKRKš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK˜Ü™X][Û’ZYÚOOPšYÒ[

I‰›‹Z[ÌŠ
Kš[
K˜Ü™X][Û’ZYÚ
KK˜ÛÛ\][Û•[YHOO]›ÚY	‰–K•[Y\Ý[\™[˜ÛÙJK˜ÛÛ\][Û•[YK‹Z[ÌŠN
K™›ÜšÊ
JK›[[J
KKš[š]X[˜[[˜ÙHOOHˆ‰‰›‹Z[ÌŠŠKœÝš[™ÊKš[š]X[˜[[˜ÙJKKœÚ\™\ÑÝOOHˆ‰‰›‹Z[ÌŠÍ
KœÝš[™ÊKœÚ\™\ÑÝ
KK[˜›Û™[™ÒYOOPšYÒ[

I‰›‹Z[ÌŠ
KZ[
K[˜›Û™[™ÒY
KK[˜›Û™[™ÓÛ’Û™YÛÝ[OOPšYÒ[

I‰›‹Z[ÌŠ
Kš[
K[˜›Û™[™ÓÛ’Û™YÛÝ[
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆKš[˜\žT™XY\ÙN›™]ÈKš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹^ŒŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹˜Ü™X][Û’ZYÚ]š[

NØœ™XZÎØØ\ÙHŽœ‹˜ÛÛ\][Û•[YOVK•[Y\Ý[\™XÛÙJZ[ÌŠ
JNØœ™XZÎØØ\ÙHÎœ‹š[š]X[˜[[˜ÙO]œÝš[™Ê
NØœ™XZÎØØ\ÙHœ‹œÚ\™\ÑÝ]œÝš[™Ê
NØœ™XZÎØØ\ÙHNœ‹[˜›Û™[™ÒY]Z[

NØœ™XZÎØØ\ÙHŽœ‹[˜›Û™[™ÓÛ’Û™YÛÝ[]š[

NØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]^ŒŠ
NÜ™]\›ŠYKš\ÔÙ]
JK˜Ü™X][Û’ZYÚ
I‰Š‹˜Ü™X][Û’ZYÚPšYÒ[
K˜Ü™X][Û’ZYÚÔÝš[™Ê
JJK
YKš\ÔÙ]
JK˜ÛÛ\][Û•[YJI‰Š‹˜ÛÛ\][Û•[YOJYK™œ›ÛRœÛÛ•[Y\Ý[\
JK˜ÛÛ\][Û•[YJJK
YKš\ÔÙ]
JKš[š]X[˜[[˜ÙJI‰Š‹š[š]X[˜[[˜ÙOTÝš[™ÊKš[š]X[˜[[˜ÙJJK
YKš\ÔÙ]
JKœÚ\™\ÑÝ
I‰Š‹œÚ\™\ÑÝTÝš[™ÊKœÚ\™\ÑÝ
JK
YKš\ÔÙ]
JK[˜›Û™[™ÒY
I‰Š‹[˜›Û™[™ÒYPšYÒ[
K[˜›Û™[™ÒYÔÝš[™Ê
JJK
YKš\ÔÙ]
JK[˜›Û™[™ÓÛ’Û™YÛÝ[
I‰Š‹[˜›Û™[™ÓÛ’Û™YÛÝ[PšYÒ[
K[˜›Û™[™ÓÛ’Û™YÛÝ[ÔÝš[™Ê
JJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK˜Ü™X][Û’ZYÚOO]›ÚY	‰Š‹˜Ü™X][Û’ZYÚJK˜Ü™X][Û’ZYÚšYÒ[

JKÔÝš[™Ê
JKK˜ÛÛ\][Û•[YHOO]›ÚY	‰Š‹˜ÛÛ\][Û•[YOJYK™œ›ÛU[Y\Ý[\
JK˜ÛÛ\][Û•[YJKÒTÓÔÝš[™Ê
JKKš[š]X[˜[[˜ÙHOO]›ÚY	‰Š‹š[š]X[˜[[˜ÙOYKš[š]X[˜[[˜ÙJKKœÚ\™\ÑÝOO]›ÚY	‰Š‹œÚ\™\ÑÝYKœÚ\™\ÑÝ
KK[˜›Û™[™ÒYOO]›ÚY	‰Š‹[˜›Û™[™ÒYJK[˜›Û™[™ÒYšYÒ[

JKÔÝš[™Ê
JKK[˜›Û™[™ÓÛ’Û™YÛÝ[OO]›ÚY	‰Š‹[˜›Û™[™ÓÛ’Û™YÛÝ[JK[˜›Û™[™ÓÛ’Û™YÛÝ[šYÒ[

JKÔÝš[™Ê
JKŸKœ›ÛT\X[
J^Û]^ŒŠ
NÜ™]\›ˆK˜Ü™X][Û’ZYÚOO]›ÚY	‰™K˜Ü™X][Û’ZYÚOO[[	‰Š‹˜Ü™X][Û’ZYÚPšYÒ[
K˜Ü™X][Û’ZYÚÔÝš[™Ê
JJKK˜ÛÛ\][Û•[YHOO]›ÚY	‰™K˜ÛÛ\][Û•[YHOO[[	‰Š‹˜ÛÛ\][Û•[YOVK•[Y\Ý[\™œ›ÛT\X[
K˜ÛÛ\][Û•[YJJK‹š[š]X[˜[[˜ÙOYKš[š]X[˜[[˜ÙOÏÈˆ‹‹œÚ\™\ÑÝYKœÚ\™\ÑÝÏÈˆ‹K[˜›Û™[™ÒYOO]›ÚY	‰™K[˜›Û™[™ÒYOO[[	‰Š‹[˜›Û™[™ÒYPšYÒ[
K[˜›Û™[™ÒYÔÝš[™Ê
JJKK[˜›Û™[™ÓÛ’Û™YÛÝ[OO]›ÚY	‰™K[˜›Û™[™ÓÛ’Û™YÛÝ[OO[[	‰Š‹[˜›Û™[™ÓÛ’Û™YÛÝ[PšYÒ[
K[˜›Û™[™ÓÛ’Û™YÛÝ[ÔÝš[™Ê
JJKŸ_NÙ[˜Ý[ÛˆŒŠ
^Ü™]\›žÙ[YØ]ÜY™\ÜÎˆˆ‹˜[Y]Ü”Ü˜ÐY™\ÜÎˆˆ‹˜[Y]Ü‘ÝY™\ÜÎˆˆ‹[šY\Î–×__Q‹”™Y[YØ][Û^Ý\U\›ˆ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK”™Y[YØ][Ûˆ‹[˜ÛÙJKRKš[˜\žUÜš]\‹˜Ü™X]J
J^ÙK™[YØ]ÜY™\ÜÈOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊK™[YØ]ÜY™\ÜÊKK˜[Y]Ü”Ü˜ÐY™\ÜÈOOHˆ‰‰›‹Z[ÌŠN
KœÝš[™ÊK˜[Y]Ü”Ü˜ÐY™\ÜÊKK˜[Y]Ü‘ÝY™\ÜÈOOHˆ‰‰›‹Z[ÌŠŠKœÝš[™ÊK˜[Y]Ü‘ÝY™\ÜÊNÙ›ÜŠ]ÙˆK™[šY\ÊQ‹”™Y[YØ][Û‘[žK™[˜ÛÙJ‹Z[ÌŠÍ
K™›ÜšÊ
JK›[[J
NÜ™]\›ˆŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆKš[˜\žT™XY\ÙN›™]ÈKš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹VŒŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹™[YØ]ÜY™\ÜÏ]œÝš[™Ê
NØœ™XZÎØØ\ÙHŽœ‹˜[Y]Ü”Ü˜ÐY™\ÜÏ]œÝš[™Ê
NØœ™XZÎØØ\ÙHÎœ‹˜[Y]Ü‘ÝY™\ÜÏ]œÝš[™Ê
NØœ™XZÎØØ\ÙHœ‹™[šY\Ëœ\Ú
‹”™Y[YØ][Û‘[žK™XÛÙJZ[ÌŠ
JJNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]VŒŠ
NÜ™]\›ŠYKš\ÔÙ]
JK™[YØ]ÜY™\ÜÊI‰Š‹™[YØ]ÜY™\ÜÏTÝš[™ÊK™[YØ]ÜY™\ÜÊJK
YKš\ÔÙ]
JK˜[Y]Ü”Ü˜ÐY™\ÜÊI‰Š‹˜[Y]Ü”Ü˜ÐY™\ÜÏTÝš[™ÊK˜[Y]Ü”Ü˜ÐY™\ÜÊJK
YKš\ÔÙ]
JK˜[Y]Ü‘ÝY™\ÜÊI‰Š‹˜[Y]Ü‘ÝY™\ÜÏTÝš[™ÊK˜[Y]Ü‘ÝY™\ÜÊJK\œ˜^Kš\Ð\œ˜^JOË™[šY\ÊI‰Š‹™[šY\ÏYK™[šY\Ë›X\
O‘‹”™Y[YØ][Û‘[žK™œ›ÛR”ÓÓŠ
JJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK™[YØ]ÜY™\ÜÈOO]›ÚY	‰Š‹™[YØ]ÜY™\ÜÏYK™[YØ]ÜY™\ÜÊKK˜[Y]Ü”Ü˜ÐY™\ÜÈOO]›ÚY	‰Š‹˜[Y]Ü”Ü˜ÐY™\ÜÏYK˜[Y]Ü”Ü˜ÐY™\ÜÊKK˜[Y]Ü‘ÝY™\ÜÈOO]›ÚY	‰Š‹˜[Y]Ü‘ÝY™\ÜÏYK˜[Y]Ü‘ÝY™\ÜÊKK™[šY\ÏÛ‹™[šY\ÏYK™[šY\Ë›X\
OÑ‹”™Y[YØ][Û‘[žKÒ”ÓÓŠ
N›ÚY
N›‹™[šY\ÏV×KŸKœ›ÛT\X[
J^Û]VŒŠ
NÜ™]\›ˆ‹™[YØ]ÜY™\ÜÏYK™[YØ]ÜY™\ÜÏÏÈˆ‹‹˜[Y]Ü”Ü˜ÐY™\ÜÏYK˜[Y]Ü”Ü˜ÐY™\ÜÏÏÈˆ‹‹˜[Y]Ü‘ÝY™\ÜÏYK˜[Y]Ü‘ÝY™\ÜÏÏÈˆ‹‹™[šY\ÏYK™[šY\ÏË›X\
O‘‹”™Y[YØ][Û‘[žK™œ›ÛT\X[

J_×KŸ_NÙ[˜Ý[ÛˆŠ
^Ü™]\›žÝ[˜›Û™[™Õ[YN’K‘\˜][Û‹™œ›ÛT\X[
ßJKX^˜[Y]ÜœÎŒX^[šY\ÎŒ\ÝÜšXØ[[šY\ÎŒ›Û™[›ÛNˆˆ‹Z[ÛÛ[Z\ÜÚ[Û”˜]NˆˆŸ_Q‹”\˜[\Ï^Ý\U\›ˆ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK”\˜[\È‹[˜ÛÙJKRKš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK[˜›Û™[™Õ[YHOO]›ÚY	‰’K‘\˜][Û‹™[˜ÛÙJK[˜›Û™[™Õ[YK‹Z[ÌŠL
K™›ÜšÊ
JK›[[J
KK›X^˜[Y]ÜœÈOOL	‰›‹Z[ÌŠMŠKZ[ÌŠK›X^˜[Y]ÜœÊKK›X^[šY\ÈOOL	‰›‹Z[ÌŠ
KZ[ÌŠK›X^[šY\ÊKKš\ÝÜšXØ[[šY\ÈOOL	‰›‹Z[ÌŠÌŠKZ[ÌŠKš\ÝÜšXØ[[šY\ÊKK˜›Û™[›ÛHOOHˆ‰‰›‹Z[ÌŠŠKœÝš[™ÊK˜›Û™[›ÛJKK›Z[ÛÛ[Z\ÜÚ[Û”˜]HOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊK›Z[ÛÛ[Z\ÜÚ[Û”˜]JKŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆKš[˜\žT™XY\ÙN›™]ÈKš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹VŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹[˜›Û™[™Õ[YORK‘\˜][Û‹™XÛÙJZ[ÌŠ
JNØœ™XZÎØØ\ÙHŽœ‹›X^˜[Y]ÜœÏ]Z[ÌŠ
NØœ™XZÎØØ\ÙHÎœ‹›X^[šY\Ï]Z[ÌŠ
NØœ™XZÎØØ\ÙHœ‹š\ÝÜšXØ[[šY\Ï]Z[ÌŠ
NØœ™XZÎØØ\ÙHNœ‹˜›Û™[›ÛO]œÝš[™Ê
NØœ™XZÎØØ\ÙHŽœ‹›Z[ÛÛ[Z\ÜÚ[Û”˜]O]œÝš[™Ê
NØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]VŠ
NÜ™]\›ŠYKš\ÔÙ]
JK[˜›Û™[™Õ[YJI‰Š‹[˜›Û™[™Õ[YORK‘\˜][Û‹™œ›ÛR”ÓÓŠK[˜›Û™[™Õ[YJJK
YKš\ÔÙ]
JK›X^˜[Y]ÜœÊI‰Š‹›X^˜[Y]ÜœÏS[X™\ŠK›X^˜[Y]ÜœÊJK
YKš\ÔÙ]
JK›X^[šY\ÊI‰Š‹›X^[šY\ÏS[X™\ŠK›X^[šY\ÊJK
YKš\ÔÙ]
JKš\ÝÜšXØ[[šY\ÊI‰Š‹š\ÝÜšXØ[[šY\ÏS[X™\ŠKš\ÝÜšXØ[[šY\ÊJK
YKš\ÔÙ]
JK˜›Û™[›ÛJI‰Š‹˜›Û™[›ÛOTÝš[™ÊK˜›Û™[›ÛJJK
YKš\ÔÙ]
JK›Z[ÛÛ[Z\ÜÚ[Û”˜]JI‰Š‹›Z[ÛÛ[Z\ÜÚ[Û”˜]OTÝš[™ÊK›Z[ÛÛ[Z\ÜÚ[Û”˜]JJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK[˜›Û™[™Õ[YHOO]›ÚY	‰Š‹[˜›Û™[™Õ[YOYK[˜›Û™[™Õ[YOÒK‘\˜][Û‹Ò”ÓÓŠK[˜›Û™[™Õ[YJN›ÚY
KK›X^˜[Y]ÜœÈOO]›ÚY	‰Š‹›X^˜[Y]ÜœÏSX]œ›Ý[™
K›X^˜[Y]ÜœÊJKK›X^[šY\ÈOO]›ÚY	‰Š‹›X^[šY\ÏSX]œ›Ý[™
K›X^[šY\ÊJKKš\ÝÜšXØ[[šY\ÈOO]›ÚY	‰Š‹š\ÝÜšXØ[[šY\ÏSX]œ›Ý[™
Kš\ÝÜšXØ[[šY\ÊJKK˜›Û™[›ÛHOO]›ÚY	‰Š‹˜›Û™[›ÛOYK˜›Û™[›ÛJKK›Z[ÛÛ[Z\ÜÚ[Û”˜]HOO]›ÚY	‰Š‹›Z[ÛÛ[Z\ÜÚ[Û”˜]OYK›Z[ÛÛ[Z\ÜÚ[Û”˜]JKŸKœ›ÛT\X[
J^Û]VŠ
NÜ™]\›ˆK[˜›Û™[™Õ[YHOO]›ÚY	‰™K[˜›Û™[™Õ[YHOO[[	‰Š‹[˜›Û™[™Õ[YORK‘\˜][Û‹™œ›ÛT\X[
K[˜›Û™[™Õ[YJJK‹›X^˜[Y]ÜœÏYK›X^˜[Y]ÜœÏÏÌ‹›X^[šY\ÏYK›X^[šY\ÏÏÌ‹š\ÝÜšXØ[[šY\ÏYKš\ÝÜšXØ[[šY\ÏÏÌ‹˜›Û™[›ÛOYK˜›Û™[›ÛOÏÈˆ‹‹›Z[ÛÛ[Z\ÜÚ[Û”˜]OYK›Z[ÛÛ[Z\ÜÚ[Û”˜]OÏÈˆ‹Ÿ_NÙ[˜Ý[Ûˆ	Š
^Ü™]\›žÙ[YØ][ÛŽ‘‹‘[YØ][Û‹™œ›ÛT\X[
ßJK˜[[˜ÙN“PKÛÚ[‹™œ›ÛT\X[
ßJ__Q‹‘[YØ][Û”™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK‘[YØ][Û”™\ÜÛœÙH‹[˜ÛÙJKRKš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK™[YØ][ÛˆOO]›ÚY	‰‘‹‘[YØ][Û‹™[˜ÛÙJK™[YØ][Û‹‹Z[ÌŠL
K™›ÜšÊ
JK›[[J
KK˜˜[[˜ÙHOO]›ÚY	‰“PKÛÚ[‹™[˜ÛÙJK˜˜[[˜ÙK‹Z[ÌŠN
K™›ÜšÊ
JK›[[J
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆKš[˜\žT™XY\ÙN›™]ÈKš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹IŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹™[YØ][ÛQ‹‘[YØ][Û‹™XÛÙJZ[ÌŠ
JNØœ™XZÎØØ\ÙHŽœ‹˜˜[[˜ÙOSPKÛÚ[‹™XÛÙJZ[ÌŠ
JNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]IŠ
NÜ™]\›ŠYKš\ÔÙ]
JK™[YØ][ÛŠI‰Š‹™[YØ][ÛQ‹‘[YØ][Û‹™œ›ÛR”ÓÓŠK™[YØ][ÛŠJK
YKš\ÔÙ]
JK˜˜[[˜ÙJI‰Š‹˜˜[[˜ÙOSPKÛÚ[‹™œ›ÛR”ÓÓŠK˜˜[[˜ÙJJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK™[YØ][ÛˆOO]›ÚY	‰Š‹™[YØ][ÛYK™[YØ][ÛÑ‹‘[YØ][Û‹Ò”ÓÓŠK™[YØ][ÛŠN›ÚY
KK˜˜[[˜ÙHOO]›ÚY	‰Š‹˜˜[[˜ÙOYK˜˜[[˜ÙOÓPKÛÚ[‹Ò”ÓÓŠK˜˜[[˜ÙJN›ÚY
KŸKœ›ÛT\X[
J^Û]IŠ
NÜ™]\›ˆK™[YØ][ÛˆOO]›ÚY	‰™K™[YØ][ÛˆOO[[	‰Š‹™[YØ][ÛQ‹‘[YØ][Û‹™œ›ÛT\X[
K™[YØ][ÛŠJKK˜˜[[˜ÙHOO]›ÚY	‰™K˜˜[[˜ÙHOO[[	‰Š‹˜˜[[˜ÙOSPKÛÚ[‹™œ›ÛT\X[
K˜˜[[˜ÙJJKŸ_NÙ[˜Ý[ÛˆŒŠ
^Ü™]\›žÜ™Y[YØ][Û‘[žN‘‹”™Y[YØ][Û‘[žK™œ›ÛT\X[
ßJK˜[[˜ÙNˆˆŸ_Q‹”™Y[YØ][Û‘[žT™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK”™Y[YØ][Û‘[žT™\ÜÛœÙH‹[˜ÛÙJKRKš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆKœ™Y[YØ][Û‘[žHOO]›ÚY	‰‘‹”™Y[YØ][Û‘[žK™[˜ÛÙJKœ™Y[YØ][Û‘[žK‹Z[ÌŠL
K™›ÜšÊ
JK›[[J
KK˜˜[[˜ÙHOOHˆ‰‰›‹Z[ÌŠÍ
KœÝš[™ÊK˜˜[[˜ÙJKŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆKš[˜\žT™XY\ÙN›™]ÈKš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹ZŒŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹œ™Y[YØ][Û‘[žOQ‹”™Y[YØ][Û‘[žK™XÛÙJZ[ÌŠ
JNØœ™XZÎØØ\ÙHœ‹˜˜[[˜ÙO]œÝš[™Ê
NØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]ZŒŠ
NÜ™]\›ŠYKš\ÔÙ]
JKœ™Y[YØ][Û‘[žJI‰Š‹œ™Y[YØ][Û‘[žOQ‹”™Y[YØ][Û‘[žK™œ›ÛR”ÓÓŠKœ™Y[YØ][Û‘[žJJK
YKš\ÔÙ]
JK˜˜[[˜ÙJI‰Š‹˜˜[[˜ÙOTÝš[™ÊK˜˜[[˜ÙJJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆKœ™Y[YØ][Û‘[žHOO]›ÚY	‰Š‹œ™Y[YØ][Û‘[žOYKœ™Y[YØ][Û‘[žOÑ‹”™Y[YØ][Û‘[žKÒ”ÓÓŠKœ™Y[YØ][Û‘[žJN›ÚY
KK˜˜[[˜ÙHOO]›ÚY	‰Š‹˜˜[[˜ÙOYK˜˜[[˜ÙJKŸKœ›ÛT\X[
J^Û]ZŒŠ
NÜ™]\›ˆKœ™Y[YØ][Û‘[žHOO]›ÚY	‰™Kœ™Y[YØ][Û‘[žHOO[[	‰Š‹œ™Y[YØ][Û‘[žOQ‹”™Y[YØ][Û‘[žK™œ›ÛT\X[
Kœ™Y[YØ][Û‘[žJJK‹˜˜[[˜ÙOYK˜˜[[˜ÙOÏÈˆ‹Ÿ_NÙ[˜Ý[ÛˆSŠ
^Ü™]\›žÜ™Y[YØ][ÛŽ‘‹”™Y[YØ][Û‹™œ›ÛT\X[
ßJK[šY\Î–×__Q‹”™Y[YØ][Û”™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK”™Y[YØ][Û”™\ÜÛœÙH‹[˜ÛÙJKRKš[˜\žUÜš]\‹˜Ü™X]J
J^ÙKœ™Y[YØ][ÛˆOO]›ÚY	‰‘‹”™Y[YØ][Û‹™[˜ÛÙJKœ™Y[YØ][Û‹‹Z[ÌŠL
K™›ÜšÊ
JK›[[J
NÙ›ÜŠ]ÙˆK™[šY\ÊQ‹”™Y[YØ][Û‘[žT™\ÜÛœÙK™[˜ÛÙJ‹Z[ÌŠN
K™›ÜšÊ
JK›[[J
NÜ™]\›ˆŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆKš[˜\žT™XY\ÙN›™]ÈKš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹YSŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹œ™Y[YØ][ÛQ‹”™Y[YØ][Û‹™XÛÙJZ[ÌŠ
JNØœ™XZÎØØ\ÙHŽœ‹™[šY\Ëœ\Ú
‹”™Y[YØ][Û‘[žT™\ÜÛœÙK™XÛÙJZ[ÌŠ
JJNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]YSŠ
NÜ™]\›ŠYKš\ÔÙ]
JKœ™Y[YØ][ÛŠI‰Š‹œ™Y[YØ][ÛQ‹”™Y[YØ][Û‹™œ›ÛR”ÓÓŠKœ™Y[YØ][ÛŠJK\œ˜^Kš\Ð\œ˜^JOË™[šY\ÊI‰Š‹™[šY\ÏYK™[šY\Ë›X\
O‘‹”™Y[YØ][Û‘[žT™\ÜÛœÙK™œ›ÛR”ÓÓŠ
JJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆKœ™Y[YØ][ÛˆOO]›ÚY	‰Š‹œ™Y[YØ][ÛYKœ™Y[YØ][ÛÑ‹”™Y[YØ][Û‹Ò”ÓÓŠKœ™Y[YØ][ÛŠN›ÚY
KK™[šY\ÏÛ‹™[šY\ÏYK™[šY\Ë›X\
OÑ‹”™Y[YØ][Û‘[žT™\ÜÛœÙKÒ”ÓÓŠ
N›ÚY
N›‹™[šY\ÏV×KŸKœ›ÛT\X[
J^Û]YSŠ
NÜ™]\›ˆKœ™Y[YØ][ÛˆOO]›ÚY	‰™Kœ™Y[YØ][ÛˆOO[[	‰Š‹œ™Y[YØ][ÛQ‹”™Y[YØ][Û‹™œ›ÛT\X[
Kœ™Y[YØ][ÛŠJK‹™[šY\ÏYK™[šY\ÏË›X\
O‘‹”™Y[YØ][Û‘[žT™\ÜÛœÙK™œ›ÛT\X[

J_×KŸ_NÙ[˜Ý[Ûˆ“Š
^Ü™]\›žÛ›Ý›Û™YÚÙ[œÎˆˆ‹›Û™YÚÙ[œÎˆˆŸ_Q‹”ÛÛ^Ý\U\›ˆ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK”ÛÛ‹[˜ÛÙJKRKš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK››Ý›Û™YÚÙ[œÈOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊK››Ý›Û™YÚÙ[œÊKK˜›Û™YÚÙ[œÈOOHˆ‰‰›‹Z[ÌŠN
KœÝš[™ÊK˜›Û™YÚÙ[œÊKŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆKš[˜\žT™XY\ÙN›™]ÈKš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹[“Š
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹››Ý›Û™YÚÙ[œÏ]œÝš[™Ê
NØœ™XZÎØØ\ÙHŽœ‹˜›Û™YÚÙ[œÏ]œÝš[™Ê
NØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û][“Š
NÜ™]\›ŠYKš\ÔÙ]
JK››Ý›Û™YÚÙ[œÊI‰Š‹››Ý›Û™YÚÙ[œÏTÝš[™ÊK››Ý›Û™YÚÙ[œÊJK
YKš\ÔÙ]
JK˜›Û™YÚÙ[œÊI‰Š‹˜›Û™YÚÙ[œÏTÝš[™ÊK˜›Û™YÚÙ[œÊJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK››Ý›Û™YÚÙ[œÈOO]›ÚY	‰Š‹››Ý›Û™YÚÙ[œÏYK››Ý›Û™YÚÙ[œÊKK˜›Û™YÚÙ[œÈOO]›ÚY	‰Š‹˜›Û™YÚÙ[œÏYK˜›Û™YÚÙ[œÊKŸKœ›ÛT\X[
J^Û][“Š
NÜ™]\›ˆ‹››Ý›Û™YÚÙ[œÏYK››Ý›Û™YÚÙ[œÏÏÈˆ‹‹˜›Û™YÚÙ[œÏYK˜›Û™YÚÙ[œÏÏÈˆ‹Ÿ_NÙ[˜Ý[ÛˆŠ
^Ü™]\›žÝ\]\Î–×__Q‹•˜[Y]Ü•\]\Ï^Ý\U\›ˆ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK•˜[Y]Ü•\]\È‹[˜ÛÙJKRKš[˜\žUÜš]\‹˜Ü™X]J
J^Ù›ÜŠ]ÙˆK\]\ÊI‹•˜[Y]Ü•\]K™[˜ÛÙJ‹Z[ÌŠL
K™›ÜšÊ
JK›[[J
NÜ™]\›ˆŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆKš[˜\žT™XY\ÙN›™]ÈKš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹]Š
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÛÏŒÏOOLOÜ‹\]\Ëœ\Ú
	‹•˜[Y]Ü•\]K™XÛÙJZ[ÌŠ
JJNœÚÚ\\JÉÊ_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]]Š
NÜ™]\›ˆ\œ˜^Kš\Ð\œ˜^JOË\]\ÊI‰Š‹\]\ÏYK\]\Ë›X\
O‰‹•˜[Y]Ü•\]K™œ›ÛR”ÓÓŠ
JJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK\]\ÏÛ‹\]\ÏYK\]\Ë›X\
OÉ‹•˜[Y]Ü•\]KÒ”ÓÓŠ
N›ÚY
N›‹\]\ÏV×KŸKœ›ÛT\X[
J^Û]]Š
NÜ™]\›ˆ‹\]\ÏYK\]\ÏË›X\
O‰‹•˜[Y]Ü•\]K™œ›ÛT\X[

J_×KŸ__JNÝ˜\ˆ“RJ[OžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\J[‹—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÞ[‹“\ÙÐÛY[[\^[‹“\ÙÕ\]T\˜[\Ô™\ÜÛœÙO^[‹“\ÙÕ\]T\˜[\Ï^[‹“\ÙÐØ[˜Ù[[˜›Û™[™Ñ[YØ][Û”™\ÜÛœÙO^[‹“\ÙÐØ[˜Ù[[˜›Û™[™Ñ[YØ][Û^[‹“\ÙÕ[™[YØ]T™\ÜÛœÙO^[‹“\ÙÕ[™[YØ]O^[‹“\ÙÐ™YÚ[”™Y[YØ]T™\ÜÛœÙO^[‹“\ÙÐ™YÚ[”™Y[YØ]O^[‹“\ÙÑ[YØ]T™\ÜÛœÙO^[‹“\ÙÑ[YØ]O^[‹“\ÙÑY]˜[Y]Ü”™\ÜÛœÙO^[‹“\ÙÑY]˜[Y]Ü^[‹“\ÙÐÜ™X]U˜[Y]Ü”™\ÜÛœÙO^[‹“\ÙÐÜ™X]U˜[Y]Ü^[‹œ›ÝØY”XÚØYÙO]›ÚYÝ˜\ˆ\\“Š
K™]

KÝQŠ
KØÏ\ZJ
KPÙJ
KÝQYJ
NÞ[‹œ›ÝØY”XÚØYÙOH˜ÛÜÛ[ÜËœÝZÚ[™ËŒX™]LHŽÙ[˜Ý[ÛˆSŠ
^Ü™]\›žÙ\ØÜš\[ÛŽ‘\‹‘\ØÜš\[Û‹™œ›ÛT\X[
ßJKÛÛ[Z\ÜÚ[ÛŽ‘\‹ÛÛ[Z\ÜÚ[Û”˜]\Ë™œ›ÛT\X[
ßJKZ[”Ù[‘[YØ][ÛŽˆˆ‹[YØ]ÜY™\ÜÎˆˆ‹˜[Y]ÜY™\ÜÎˆˆ‹XšÙ^N›ÚY˜[YN™ÝÛÚ[‹™œ›ÛT\X[
ßJ__^[‹“\ÙÐÜ™X]U˜[Y]Ü^Ý\U\›ˆ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK“\ÙÐÜ™X]U˜[Y]Üˆ‹[˜ÛÙJK[‹š[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK™\ØÜš\[ÛˆOO]›ÚY	‰‘\‹‘\ØÜš\[Û‹™[˜ÛÙJK™\ØÜš\[Û‹‹Z[ÌŠL
K™›ÜšÊ
JK›[[J
KK˜ÛÛ[Z\ÜÚ[ÛˆOO]›ÚY	‰‘\‹ÛÛ[Z\ÜÚ[Û”˜]\Ë™[˜ÛÙJK˜ÛÛ[Z\ÜÚ[Û‹‹Z[ÌŠN
K™›ÜšÊ
JK›[[J
KK›Z[”Ù[‘[YØ][ÛˆOOHˆ‰‰›‹Z[ÌŠŠKœÝš[™ÊK›Z[”Ù[‘[YØ][ÛŠKK™[YØ]ÜY™\ÜÈOOHˆ‰‰›‹Z[ÌŠÍ
KœÝš[™ÊK™[YØ]ÜY™\ÜÊKK˜[Y]ÜY™\ÜÈOOHˆ‰‰›‹Z[ÌŠŠKœÝš[™ÊK˜[Y]ÜY™\ÜÊKKœXšÙ^HOO]›ÚY	‰š™‹[žK™[˜ÛÙJKœXšÙ^K‹Z[ÌŠL
K™›ÜšÊ
JK›[[J
KK˜[YHOO]›ÚY	‰™ÝÛÚ[‹™[˜ÛÙJK˜[YK‹Z[ÌŠN
K™›ÜšÊ
JK›[[J
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ‹š[˜\žT™XY\ÙN›™]È‹š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹ZSŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹™\ØÜš\[ÛQ\‹‘\ØÜš\[Û‹™XÛÙJZ[ÌŠ
JNØœ™XZÎØØ\ÙHŽœ‹˜ÛÛ[Z\ÜÚ[ÛQ\‹ÛÛ[Z\ÜÚ[Û”˜]\Ë™XÛÙJZ[ÌŠ
JNØœ™XZÎØØ\ÙHÎœ‹›Z[”Ù[‘[YØ][Û]œÝš[™Ê
NØœ™XZÎØØ\ÙHœ‹™[YØ]ÜY™\ÜÏ]œÝš[™Ê
NØœ™XZÎØØ\ÙHNœ‹˜[Y]ÜY™\ÜÏ]œÝš[™Ê
NØœ™XZÎØØ\ÙHŽœ‹œXšÙ^OZ™‹[žK™XÛÙJZ[ÌŠ
JNØœ™XZÎØØ\ÙHÎœ‹˜[YOYÝÛÚ[‹™XÛÙJZ[ÌŠ
JNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]ZSŠ
NÜ™]\›ŠÝš\ÔÙ]
JK™\ØÜš\[ÛŠI‰Š‹™\ØÜš\[ÛQ\‹‘\ØÜš\[Û‹™œ›ÛR”ÓÓŠK™\ØÜš\[ÛŠJK
Ýš\ÔÙ]
JK˜ÛÛ[Z\ÜÚ[ÛŠI‰Š‹˜ÛÛ[Z\ÜÚ[ÛQ\‹ÛÛ[Z\ÜÚ[Û”˜]\Ë™œ›ÛR”ÓÓŠK˜ÛÛ[Z\ÜÚ[ÛŠJK
Ýš\ÔÙ]
JK›Z[”Ù[‘[YØ][ÛŠI‰Š‹›Z[”Ù[‘[YØ][ÛTÝš[™ÊK›Z[”Ù[‘[YØ][ÛŠJK
Ýš\ÔÙ]
JK™[YØ]ÜY™\ÜÊI‰Š‹™[YØ]ÜY™\ÜÏTÝš[™ÊK™[YØ]ÜY™\ÜÊJK
Ýš\ÔÙ]
JK˜[Y]ÜY™\ÜÊI‰Š‹˜[Y]ÜY™\ÜÏTÝš[™ÊK˜[Y]ÜY™\ÜÊJK
Ýš\ÔÙ]
JKœXšÙ^JI‰Š‹œXšÙ^OZ™‹[žK™œ›ÛR”ÓÓŠKœXšÙ^JJK
Ýš\ÔÙ]
JK˜[YJI‰Š‹˜[YOYÝÛÚ[‹™œ›ÛR”ÓÓŠK˜[YJJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK™\ØÜš\[ÛˆOO]›ÚY	‰Š‹™\ØÜš\[ÛYK™\ØÜš\[ÛÑ\‹‘\ØÜš\[Û‹Ò”ÓÓŠK™\ØÜš\[ÛŠN›ÚY
KK˜ÛÛ[Z\ÜÚ[ÛˆOO]›ÚY	‰Š‹˜ÛÛ[Z\ÜÚ[ÛYK˜ÛÛ[Z\ÜÚ[ÛÑ\‹ÛÛ[Z\ÜÚ[Û”˜]\ËÒ”ÓÓŠK˜ÛÛ[Z\ÜÚ[ÛŠN›ÚY
KK›Z[”Ù[‘[YØ][ÛˆOO]›ÚY	‰Š‹›Z[”Ù[‘[YØ][ÛYK›Z[”Ù[‘[YØ][ÛŠKK™[YØ]ÜY™\ÜÈOO]›ÚY	‰Š‹™[YØ]ÜY™\ÜÏYK™[YØ]ÜY™\ÜÊKK˜[Y]ÜY™\ÜÈOO]›ÚY	‰Š‹˜[Y]ÜY™\ÜÏYK˜[Y]ÜY™\ÜÊKKœXšÙ^HOO]›ÚY	‰Š‹œXšÙ^OYKœXšÙ^OÚ™‹[žKÒ”ÓÓŠKœXšÙ^JN›ÚY
KK˜[YHOO]›ÚY	‰Š‹˜[YOYK˜[YOÙÝÛÚ[‹Ò”ÓÓŠK˜[YJN›ÚY
KŸKœ›ÛT\X[
J^Û]ZSŠ
NÜ™]\›ˆK™\ØÜš\[ÛˆOO]›ÚY	‰™K™\ØÜš\[ÛˆOO[[	‰Š‹™\ØÜš\[ÛQ\‹‘\ØÜš\[Û‹™œ›ÛT\X[
K™\ØÜš\[ÛŠJKK˜ÛÛ[Z\ÜÚ[ÛˆOO]›ÚY	‰™K˜ÛÛ[Z\ÜÚ[ÛˆOO[[	‰Š‹˜ÛÛ[Z\ÜÚ[ÛQ\‹ÛÛ[Z\ÜÚ[Û”˜]\Ë™œ›ÛT\X[
K˜ÛÛ[Z\ÜÚ[ÛŠJK‹›Z[”Ù[‘[YØ][ÛYK›Z[”Ù[‘[YØ][ÛÏÈˆ‹‹™[YØ]ÜY™\ÜÏYK™[YØ]ÜY™\ÜÏÏÈˆ‹‹˜[Y]ÜY™\ÜÏYK˜[Y]ÜY™\ÜÏÏÈˆ‹KœXšÙ^HOO]›ÚY	‰™KœXšÙ^HOO[[	‰Š‹œXšÙ^OZ™‹[žK™œ›ÛT\X[
KœXšÙ^JJKK˜[YHOO]›ÚY	‰™K˜[YHOO[[	‰Š‹˜[YOYÝÛÚ[‹™œ›ÛT\X[
K˜[YJJKŸ_NÙ[˜Ý[ÛˆÓŠ
^Ü™]\›žß_^[‹“\ÙÐÜ™X]U˜[Y]Ü”™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK“\ÙÐÜ™X]U˜[Y]Ü”™\ÜÛœÙH‹[˜ÛÙJK[‹š[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ‹š[˜\žT™XY\ÙN›™]È‹š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹[ÓŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Ü™]\›ˆÓŠ
_KÒ”ÓÓŠJ^Ü™]\›žß_Kœ›ÛT\X[
J^Ü™]\›ˆÓŠ
__NÙ[˜Ý[ÛˆSŠ
^Ü™]\›žÙ\ØÜš\[ÛŽ‘\‹‘\ØÜš\[Û‹™œ›ÛT\X[
ßJK˜[Y]ÜY™\ÜÎˆˆ‹ÛÛ[Z\ÜÚ[Û”˜]Nˆˆ‹Z[”Ù[‘[YØ][ÛŽˆˆŸ_^[‹“\ÙÑY]˜[Y]Ü^Ý\U\›ˆ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK“\ÙÑY]˜[Y]Üˆ‹[˜ÛÙJK[‹š[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK™\ØÜš\[ÛˆOO]›ÚY	‰‘\‹‘\ØÜš\[Û‹™[˜ÛÙJK™\ØÜš\[Û‹‹Z[ÌŠL
K™›ÜšÊ
JK›[[J
KK˜[Y]ÜY™\ÜÈOOHˆ‰‰›‹Z[ÌŠN
KœÝš[™ÊK˜[Y]ÜY™\ÜÊKK˜ÛÛ[Z\ÜÚ[Û”˜]HOOHˆ‰‰›‹Z[ÌŠŠKœÝš[™ÊK˜ÛÛ[Z\ÜÚ[Û”˜]JKK›Z[”Ù[‘[YØ][ÛˆOOHˆ‰‰›‹Z[ÌŠÍ
KœÝš[™ÊK›Z[”Ù[‘[YØ][ÛŠKŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ‹š[˜\žT™XY\ÙN›™]È‹š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹XSŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹™\ØÜš\[ÛQ\‹‘\ØÜš\[Û‹™XÛÙJZ[ÌŠ
JNØœ™XZÎØØ\ÙHŽœ‹˜[Y]ÜY™\ÜÏ]œÝš[™Ê
NØœ™XZÎØØ\ÙHÎœ‹˜ÛÛ[Z\ÜÚ[Û”˜]O]œÝš[™Ê
NØœ™XZÎØØ\ÙHœ‹›Z[”Ù[‘[YØ][Û]œÝš[™Ê
NØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]XSŠ
NÜ™]\›ŠÝš\ÔÙ]
JK™\ØÜš\[ÛŠI‰Š‹™\ØÜš\[ÛQ\‹‘\ØÜš\[Û‹™œ›ÛR”ÓÓŠK™\ØÜš\[ÛŠJK
Ýš\ÔÙ]
JK˜[Y]ÜY™\ÜÊI‰Š‹˜[Y]ÜY™\ÜÏTÝš[™ÊK˜[Y]ÜY™\ÜÊJK
Ýš\ÔÙ]
JK˜ÛÛ[Z\ÜÚ[Û”˜]JI‰Š‹˜ÛÛ[Z\ÜÚ[Û”˜]OTÝš[™ÊK˜ÛÛ[Z\ÜÚ[Û”˜]JJK
Ýš\ÔÙ]
JK›Z[”Ù[‘[YØ][ÛŠI‰Š‹›Z[”Ù[‘[YØ][ÛTÝš[™ÊK›Z[”Ù[‘[YØ][ÛŠJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK™\ØÜš\[ÛˆOO]›ÚY	‰Š‹™\ØÜš\[ÛYK™\ØÜš\[ÛÑ\‹‘\ØÜš\[Û‹Ò”ÓÓŠK™\ØÜš\[ÛŠN›ÚY
KK˜[Y]ÜY™\ÜÈOO]›ÚY	‰Š‹˜[Y]ÜY™\ÜÏYK˜[Y]ÜY™\ÜÊKK˜ÛÛ[Z\ÜÚ[Û”˜]HOO]›ÚY	‰Š‹˜ÛÛ[Z\ÜÚ[Û”˜]OYK˜ÛÛ[Z\ÜÚ[Û”˜]JKK›Z[”Ù[‘[YØ][ÛˆOO]›ÚY	‰Š‹›Z[”Ù[‘[YØ][ÛYK›Z[”Ù[‘[YØ][ÛŠKŸKœ›ÛT\X[
J^Û]XSŠ
NÜ™]\›ˆK™\ØÜš\[ÛˆOO]›ÚY	‰™K™\ØÜš\[ÛˆOO[[	‰Š‹™\ØÜš\[ÛQ\‹‘\ØÜš\[Û‹™œ›ÛT\X[
K™\ØÜš\[ÛŠJK‹˜[Y]ÜY™\ÜÏYK˜[Y]ÜY™\ÜÏÏÈˆ‹‹˜ÛÛ[Z\ÜÚ[Û”˜]OYK˜ÛÛ[Z\ÜÚ[Û”˜]OÏÈˆ‹‹›Z[”Ù[‘[YØ][ÛYK›Z[”Ù[‘[YØ][ÛÏÈˆ‹Ÿ_NÙ[˜Ý[ÛˆÓŠ
^Ü™]\›žß_^[‹“\ÙÑY]˜[Y]Ü”™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK“\ÙÑY]˜[Y]Ü”™\ÜÛœÙH‹[˜ÛÙJK[‹š[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ‹š[˜\žT™XY\ÙN›™]È‹š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹\ÓŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Ü™]\›ˆÓŠ
_KÒ”ÓÓŠJ^Ü™]\›žß_Kœ›ÛT\X[
J^Ü™]\›ˆÓŠ
__NÙ[˜Ý[ÛˆŠ
^Ü™]\›žÙ[YØ]ÜY™\ÜÎˆˆ‹˜[Y]ÜY™\ÜÎˆˆ‹[[Ý[™ÝÛÚ[‹™œ›ÛT\X[
ßJ__^[‹“\ÙÑ[YØ]O^Ý\U\›ˆ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK“\ÙÑ[YØ]H‹[˜ÛÙJK[‹š[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK™[YØ]ÜY™\ÜÈOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊK™[YØ]ÜY™\ÜÊKK˜[Y]ÜY™\ÜÈOOHˆ‰‰›‹Z[ÌŠN
KœÝš[™ÊK˜[Y]ÜY™\ÜÊKK˜[[Ý[OO]›ÚY	‰™ÝÛÚ[‹™[˜ÛÙJK˜[[Ý[‹Z[ÌŠŠK™›ÜšÊ
JK›[[J
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ‹š[˜\žT™XY\ÙN›™]È‹š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹YŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹™[YØ]ÜY™\ÜÏ]œÝš[™Ê
NØœ™XZÎØØ\ÙHŽœ‹˜[Y]ÜY™\ÜÏ]œÝš[™Ê
NØœ™XZÎØØ\ÙHÎœ‹˜[[Ý[YÝÛÚ[‹™XÛÙJZ[ÌŠ
JNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]YŠ
NÜ™]\›ŠÝš\ÔÙ]
JK™[YØ]ÜY™\ÜÊI‰Š‹™[YØ]ÜY™\ÜÏTÝš[™ÊK™[YØ]ÜY™\ÜÊJK
Ýš\ÔÙ]
JK˜[Y]ÜY™\ÜÊI‰Š‹˜[Y]ÜY™\ÜÏTÝš[™ÊK˜[Y]ÜY™\ÜÊJK
Ýš\ÔÙ]
JK˜[[Ý[
I‰Š‹˜[[Ý[YÝÛÚ[‹™œ›ÛR”ÓÓŠK˜[[Ý[
JKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK™[YØ]ÜY™\ÜÈOO]›ÚY	‰Š‹™[YØ]ÜY™\ÜÏYK™[YØ]ÜY™\ÜÊKK˜[Y]ÜY™\ÜÈOO]›ÚY	‰Š‹˜[Y]ÜY™\ÜÏYK˜[Y]ÜY™\ÜÊKK˜[[Ý[OO]›ÚY	‰Š‹˜[[Ý[YK˜[[Ý[ÙÝÛÚ[‹Ò”ÓÓŠK˜[[Ý[
N›ÚY
KŸKœ›ÛT\X[
J^Û]YŠ
NÜ™]\›ˆ‹™[YØ]ÜY™\ÜÏYK™[YØ]ÜY™\ÜÏÏÈˆ‹‹˜[Y]ÜY™\ÜÏYK˜[Y]ÜY™\ÜÏÏÈˆ‹K˜[[Ý[OO]›ÚY	‰™K˜[[Ý[OO[[	‰Š‹˜[[Ý[YÝÛÚ[‹™œ›ÛT\X[
K˜[[Ý[
JKŸ_NÙ[˜Ý[ÛˆÓŠ
^Ü™]\›žß_^[‹“\ÙÑ[YØ]T™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK“\ÙÑ[YØ]T™\ÜÛœÙH‹[˜ÛÙJK[‹š[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ‹š[˜\žT™XY\ÙN›™]È‹š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹XÓŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Ü™]\›ˆÓŠ
_KÒ”ÓÓŠJ^Ü™]\›žß_Kœ›ÛT\X[
J^Ü™]\›ˆÓŠ
__NÙ[˜Ý[ÛˆSŠ
^Ü™]\›žÙ[YØ]ÜY™\ÜÎˆˆ‹˜[Y]Ü”Ü˜ÐY™\ÜÎˆˆ‹˜[Y]Ü‘ÝY™\ÜÎˆˆ‹[[Ý[™ÝÛÚ[‹™œ›ÛT\X[
ßJ__^[‹“\ÙÐ™YÚ[”™Y[YØ]O^Ý\U\›ˆ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK“\ÙÐ™YÚ[”™Y[YØ]H‹[˜ÛÙJK[‹š[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK™[YØ]ÜY™\ÜÈOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊK™[YØ]ÜY™\ÜÊKK˜[Y]Ü”Ü˜ÐY™\ÜÈOOHˆ‰‰›‹Z[ÌŠN
KœÝš[™ÊK˜[Y]Ü”Ü˜ÐY™\ÜÊKK˜[Y]Ü‘ÝY™\ÜÈOOHˆ‰‰›‹Z[ÌŠŠKœÝš[™ÊK˜[Y]Ü‘ÝY™\ÜÊKK˜[[Ý[OO]›ÚY	‰™ÝÛÚ[‹™[˜ÛÙJK˜[[Ý[‹Z[ÌŠÍ
K™›ÜšÊ
JK›[[J
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ‹š[˜\žT™XY\ÙN›™]È‹š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹]SŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹™[YØ]ÜY™\ÜÏ]œÝš[™Ê
NØœ™XZÎØØ\ÙHŽœ‹˜[Y]Ü”Ü˜ÐY™\ÜÏ]œÝš[™Ê
NØœ™XZÎØØ\ÙHÎœ‹˜[Y]Ü‘ÝY™\ÜÏ]œÝš[™Ê
NØœ™XZÎØØ\ÙHœ‹˜[[Ý[YÝÛÚ[‹™XÛÙJZ[ÌŠ
JNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]]SŠ
NÜ™]\›ŠÝš\ÔÙ]
JK™[YØ]ÜY™\ÜÊI‰Š‹™[YØ]ÜY™\ÜÏTÝš[™ÊK™[YØ]ÜY™\ÜÊJK
Ýš\ÔÙ]
JK˜[Y]Ü”Ü˜ÐY™\ÜÊI‰Š‹˜[Y]Ü”Ü˜ÐY™\ÜÏTÝš[™ÊK˜[Y]Ü”Ü˜ÐY™\ÜÊJK
Ýš\ÔÙ]
JK˜[Y]Ü‘ÝY™\ÜÊI‰Š‹˜[Y]Ü‘ÝY™\ÜÏTÝš[™ÊK˜[Y]Ü‘ÝY™\ÜÊJK
Ýš\ÔÙ]
JK˜[[Ý[
I‰Š‹˜[[Ý[YÝÛÚ[‹™œ›ÛR”ÓÓŠK˜[[Ý[
JKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK™[YØ]ÜY™\ÜÈOO]›ÚY	‰Š‹™[YØ]ÜY™\ÜÏYK™[YØ]ÜY™\ÜÊKK˜[Y]Ü”Ü˜ÐY™\ÜÈOO]›ÚY	‰Š‹˜[Y]Ü”Ü˜ÐY™\ÜÏYK˜[Y]Ü”Ü˜ÐY™\ÜÊKK˜[Y]Ü‘ÝY™\ÜÈOO]›ÚY	‰Š‹˜[Y]Ü‘ÝY™\ÜÏYK˜[Y]Ü‘ÝY™\ÜÊKK˜[[Ý[OO]›ÚY	‰Š‹˜[[Ý[YK˜[[Ý[ÙÝÛÚ[‹Ò”ÓÓŠK˜[[Ý[
N›ÚY
KŸKœ›ÛT\X[
J^Û]]SŠ
NÜ™]\›ˆ‹™[YØ]ÜY™\ÜÏYK™[YØ]ÜY™\ÜÏÏÈˆ‹‹˜[Y]Ü”Ü˜ÐY™\ÜÏYK˜[Y]Ü”Ü˜ÐY™\ÜÏÏÈˆ‹‹˜[Y]Ü‘ÝY™\ÜÏYK˜[Y]Ü‘ÝY™\ÜÏÏÈˆ‹K˜[[Ý[OO]›ÚY	‰™K˜[[Ý[OO[[	‰Š‹˜[[Ý[YÝÛÚ[‹™œ›ÛT\X[
K˜[[Ý[
JKŸ_NÙ[˜Ý[ÛˆSŠ
^Ü™]\›žØÛÛ\][Û•[YN”ØË•[Y\Ý[\™œ›ÛT\X[
ßJ__^[‹“\ÙÐ™YÚ[”™Y[YØ]T™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK“\ÙÐ™YÚ[”™Y[YØ]T™\ÜÛœÙH‹[˜ÛÙJK[‹š[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK˜ÛÛ\][Û•[YHOO]›ÚY	‰”ØË•[Y\Ý[\™[˜ÛÙJK˜ÛÛ\][Û•[YK‹Z[ÌŠL
K™›ÜšÊ
JK›[[J
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ‹š[˜\žT™XY\ÙN›™]È‹š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹PSŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÛÏŒÏOOLOÜ‹˜ÛÛ\][Û•[YOTØË•[Y\Ý[\™XÛÙJZ[ÌŠ
JNœÚÚ\\JÉÊ_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]PSŠ
NÜ™]\›ŠÝš\ÔÙ]
JK˜ÛÛ\][Û•[YJI‰Š‹˜ÛÛ\][Û•[YOJÝ™œ›ÛRœÛÛ•[Y\Ý[\
JK˜ÛÛ\][Û•[YJJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK˜ÛÛ\][Û•[YHOO]›ÚY	‰Š‹˜ÛÛ\][Û•[YOJÝ™œ›ÛU[Y\Ý[\
JK˜ÛÛ\][Û•[YJKÒTÓÔÝš[™Ê
JKŸKœ›ÛT\X[
J^Û]PSŠ
NÜ™]\›ˆK˜ÛÛ\][Û•[YHOO]›ÚY	‰™K˜ÛÛ\][Û•[YHOO[[	‰Š‹˜ÛÛ\][Û•[YOTØË•[Y\Ý[\™œ›ÛT\X[
K˜ÛÛ\][Û•[YJJKŸ_NÙ[˜Ý[ÛˆŠ
^Ü™]\›žÙ[YØ]ÜY™\ÜÎˆˆ‹˜[Y]ÜY™\ÜÎˆˆ‹[[Ý[™ÝÛÚ[‹™œ›ÛT\X[
ßJ__^[‹“\ÙÕ[™[YØ]O^Ý\U\›ˆ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK“\ÙÕ[™[YØ]H‹[˜ÛÙJK[‹š[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK™[YØ]ÜY™\ÜÈOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊK™[YØ]ÜY™\ÜÊKK˜[Y]ÜY™\ÜÈOOHˆ‰‰›‹Z[ÌŠN
KœÝš[™ÊK˜[Y]ÜY™\ÜÊKK˜[[Ý[OO]›ÚY	‰™ÝÛÚ[‹™[˜ÛÙJK˜[[Ý[‹Z[ÌŠŠK™›ÜšÊ
JK›[[J
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ‹š[˜\žT™XY\ÙN›™]È‹š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹[Š
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹™[YØ]ÜY™\ÜÏ]œÝš[™Ê
NØœ™XZÎØØ\ÙHŽœ‹˜[Y]ÜY™\ÜÏ]œÝš[™Ê
NØœ™XZÎØØ\ÙHÎœ‹˜[[Ý[YÝÛÚ[‹™XÛÙJZ[ÌŠ
JNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û][Š
NÜ™]\›ŠÝš\ÔÙ]
JK™[YØ]ÜY™\ÜÊI‰Š‹™[YØ]ÜY™\ÜÏTÝš[™ÊK™[YØ]ÜY™\ÜÊJK
Ýš\ÔÙ]
JK˜[Y]ÜY™\ÜÊI‰Š‹˜[Y]ÜY™\ÜÏTÝš[™ÊK˜[Y]ÜY™\ÜÊJK
Ýš\ÔÙ]
JK˜[[Ý[
I‰Š‹˜[[Ý[YÝÛÚ[‹™œ›ÛR”ÓÓŠK˜[[Ý[
JKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK™[YØ]ÜY™\ÜÈOO]›ÚY	‰Š‹™[YØ]ÜY™\ÜÏYK™[YØ]ÜY™\ÜÊKK˜[Y]ÜY™\ÜÈOO]›ÚY	‰Š‹˜[Y]ÜY™\ÜÏYK˜[Y]ÜY™\ÜÊKK˜[[Ý[OO]›ÚY	‰Š‹˜[[Ý[YK˜[[Ý[ÙÝÛÚ[‹Ò”ÓÓŠK˜[[Ý[
N›ÚY
KŸKœ›ÛT\X[
J^Û][Š
NÜ™]\›ˆ‹™[YØ]ÜY™\ÜÏYK™[YØ]ÜY™\ÜÏÏÈˆ‹‹˜[Y]ÜY™\ÜÏYK˜[Y]ÜY™\ÜÏÏÈˆ‹K˜[[Ý[OO]›ÚY	‰™K˜[[Ý[OO[[	‰Š‹˜[[Ý[YÝÛÚ[‹™œ›ÛT\X[
K˜[[Ý[
JKŸ_NÙ[˜Ý[Ûˆ“Š
^Ü™]\›žØÛÛ\][Û•[YN”ØË•[Y\Ý[\™œ›ÛT\X[
ßJK[[Ý[™ÝÛÚ[‹™œ›ÛT\X[
ßJ__^[‹“\ÙÕ[™[YØ]T™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK“\ÙÕ[™[YØ]T™\ÜÛœÙH‹[˜ÛÙJK[‹š[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK˜ÛÛ\][Û•[YHOO]›ÚY	‰”ØË•[Y\Ý[\™[˜ÛÙJK˜ÛÛ\][Û•[YK‹Z[ÌŠL
K™›ÜšÊ
JK›[[J
KK˜[[Ý[OO]›ÚY	‰™ÝÛÚ[‹™[˜ÛÙJK˜[[Ý[‹Z[ÌŠN
K™›ÜšÊ
JK›[[J
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ‹š[˜\žT™XY\ÙN›™]È‹š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹Y“Š
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹˜ÛÛ\][Û•[YOTØË•[Y\Ý[\™XÛÙJZ[ÌŠ
JNØœ™XZÎØØ\ÙHŽœ‹˜[[Ý[YÝÛÚ[‹™XÛÙJZ[ÌŠ
JNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]Y“Š
NÜ™]\›ŠÝš\ÔÙ]
JK˜ÛÛ\][Û•[YJI‰Š‹˜ÛÛ\][Û•[YOJÝ™œ›ÛRœÛÛ•[Y\Ý[\
JK˜ÛÛ\][Û•[YJJK
Ýš\ÔÙ]
JK˜[[Ý[
I‰Š‹˜[[Ý[YÝÛÚ[‹™œ›ÛR”ÓÓŠK˜[[Ý[
JKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK˜ÛÛ\][Û•[YHOO]›ÚY	‰Š‹˜ÛÛ\][Û•[YOJÝ™œ›ÛU[Y\Ý[\
JK˜ÛÛ\][Û•[YJKÒTÓÔÝš[™Ê
JKK˜[[Ý[OO]›ÚY	‰Š‹˜[[Ý[YK˜[[Ý[ÙÝÛÚ[‹Ò”ÓÓŠK˜[[Ý[
N›ÚY
KŸKœ›ÛT\X[
J^Û]Y“Š
NÜ™]\›ˆK˜ÛÛ\][Û•[YHOO]›ÚY	‰™K˜ÛÛ\][Û•[YHOO[[	‰Š‹˜ÛÛ\][Û•[YOTØË•[Y\Ý[\™œ›ÛT\X[
K˜ÛÛ\][Û•[YJJKK˜[[Ý[OO]›ÚY	‰™K˜[[Ý[OO[[	‰Š‹˜[[Ý[YÝÛÚ[‹™œ›ÛT\X[
K˜[[Ý[
JKŸ_NÙ[˜Ý[ÛˆÓŠ
^Ü™]\›žÙ[YØ]ÜY™\ÜÎˆˆ‹˜[Y]ÜY™\ÜÎˆˆ‹[[Ý[™ÝÛÚ[‹™œ›ÛT\X[
ßJKÜ™X][Û’ZYÚšYÒ[

__^[‹“\ÙÐØ[˜Ù[[˜›Û™[™Ñ[YØ][Û^Ý\U\›ˆ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK“\ÙÐØ[˜Ù[[˜›Û™[™Ñ[YØ][Ûˆ‹[˜ÛÙJK[‹š[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK™[YØ]ÜY™\ÜÈOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊK™[YØ]ÜY™\ÜÊKK˜[Y]ÜY™\ÜÈOOHˆ‰‰›‹Z[ÌŠN
KœÝš[™ÊK˜[Y]ÜY™\ÜÊKK˜[[Ý[OO]›ÚY	‰™ÝÛÚ[‹™[˜ÛÙJK˜[[Ý[‹Z[ÌŠŠK™›ÜšÊ
JK›[[J
KK˜Ü™X][Û’ZYÚOOPšYÒ[

I‰›‹Z[ÌŠÌŠKš[
K˜Ü™X][Û’ZYÚ
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ‹š[˜\žT™XY\ÙN›™]È‹š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹YÓŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹™[YØ]ÜY™\ÜÏ]œÝš[™Ê
NØœ™XZÎØØ\ÙHŽœ‹˜[Y]ÜY™\ÜÏ]œÝš[™Ê
NØœ™XZÎØØ\ÙHÎœ‹˜[[Ý[YÝÛÚ[‹™XÛÙJZ[ÌŠ
JNØœ™XZÎØØ\ÙHœ‹˜Ü™X][Û’ZYÚ]š[

NØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]YÓŠ
NÜ™]\›ŠÝš\ÔÙ]
JK™[YØ]ÜY™\ÜÊI‰Š‹™[YØ]ÜY™\ÜÏTÝš[™ÊK™[YØ]ÜY™\ÜÊJK
Ýš\ÔÙ]
JK˜[Y]ÜY™\ÜÊI‰Š‹˜[Y]ÜY™\ÜÏTÝš[™ÊK˜[Y]ÜY™\ÜÊJK
Ýš\ÔÙ]
JK˜[[Ý[
I‰Š‹˜[[Ý[YÝÛÚ[‹™œ›ÛR”ÓÓŠK˜[[Ý[
JK
Ýš\ÔÙ]
JK˜Ü™X][Û’ZYÚ
I‰Š‹˜Ü™X][Û’ZYÚPšYÒ[
K˜Ü™X][Û’ZYÚÔÝš[™Ê
JJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK™[YØ]ÜY™\ÜÈOO]›ÚY	‰Š‹™[YØ]ÜY™\ÜÏYK™[YØ]ÜY™\ÜÊKK˜[Y]ÜY™\ÜÈOO]›ÚY	‰Š‹˜[Y]ÜY™\ÜÏYK˜[Y]ÜY™\ÜÊKK˜[[Ý[OO]›ÚY	‰Š‹˜[[Ý[YK˜[[Ý[ÙÝÛÚ[‹Ò”ÓÓŠK˜[[Ý[
N›ÚY
KK˜Ü™X][Û’ZYÚOO]›ÚY	‰Š‹˜Ü™X][Û’ZYÚJK˜Ü™X][Û’ZYÚšYÒ[

JKÔÝš[™Ê
JKŸKœ›ÛT\X[
J^Û]YÓŠ
NÜ™]\›ˆ‹™[YØ]ÜY™\ÜÏYK™[YØ]ÜY™\ÜÏÏÈˆ‹‹˜[Y]ÜY™\ÜÏYK˜[Y]ÜY™\ÜÏÏÈˆ‹K˜[[Ý[OO]›ÚY	‰™K˜[[Ý[OO[[	‰Š‹˜[[Ý[YÝÛÚ[‹™œ›ÛT\X[
K˜[[Ý[
JKK˜Ü™X][Û’ZYÚOO]›ÚY	‰™K˜Ü™X][Û’ZYÚOO[[	‰Š‹˜Ü™X][Û’ZYÚPšYÒ[
K˜Ü™X][Û’ZYÚÔÝš[™Ê
JJKŸ_NÙ[˜Ý[ÛˆŠ
^Ü™]\›žß_^[‹“\ÙÐØ[˜Ù[[˜›Û™[™Ñ[YØ][Û”™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK“\ÙÐØ[˜Ù[[˜›Û™[™Ñ[YØ][Û”™\ÜÛœÙH‹[˜ÛÙJK[‹š[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ‹š[˜\žT™XY\ÙN›™]È‹š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹\Š
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Ü™]\›ˆŠ
_KÒ”ÓÓŠJ^Ü™]\›žß_Kœ›ÛT\X[
J^Ü™]\›ˆŠ
__NÙ[˜Ý[ÛˆSŠ
^Ü™]\›žØ]]Üš]Nˆˆ‹\˜[\Î‘\‹”\˜[\Ë™œ›ÛT\X[
ßJ__^[‹“\ÙÕ\]T\˜[\Ï^Ý\U\›ˆ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK“\ÙÕ\]T\˜[\È‹[˜ÛÙJK[‹š[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK˜]]Üš]HOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊK˜]]Üš]JKKœ\˜[\ÈOO]›ÚY	‰‘\‹”\˜[\Ë™[˜ÛÙJKœ\˜[\Ë‹Z[ÌŠN
K™›ÜšÊ
JK›[[J
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ‹š[˜\žT™XY\ÙN›™]È‹š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹RSŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹˜]]Üš]O]œÝš[™Ê
NØœ™XZÎØØ\ÙHŽœ‹œ\˜[\ÏQ\‹”\˜[\Ë™XÛÙJZ[ÌŠ
JNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]RSŠ
NÜ™]\›ŠÝš\ÔÙ]
JK˜]]Üš]JI‰Š‹˜]]Üš]OTÝš[™ÊK˜]]Üš]JJK
Ýš\ÔÙ]
JKœ\˜[\ÊI‰Š‹œ\˜[\ÏQ\‹”\˜[\Ë™œ›ÛR”ÓÓŠKœ\˜[\ÊJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK˜]]Üš]HOO]›ÚY	‰Š‹˜]]Üš]OYK˜]]Üš]JKKœ\˜[\ÈOO]›ÚY	‰Š‹œ\˜[\ÏYKœ\˜[\ÏÑ\‹”\˜[\ËÒ”ÓÓŠKœ\˜[\ÊN›ÚY
KŸKœ›ÛT\X[
J^Û]RSŠ
NÜ™]\›ˆ‹˜]]Üš]OYK˜]]Üš]OÏÈˆ‹Kœ\˜[\ÈOO]›ÚY	‰™Kœ\˜[\ÈOO[[	‰Š‹œ\˜[\ÏQ\‹”\˜[\Ë™œ›ÛT\X[
Kœ\˜[\ÊJKŸ_NÙ[˜Ý[ÛˆŠ
^Ü™]\›žß_^[‹“\ÙÕ\]T\˜[\Ô™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK“\ÙÕ\]T\˜[\Ô™\ÜÛœÙH‹[˜ÛÙJK[‹š[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ‹š[˜\žT™XY\ÙN›™]È‹š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹ZŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Ü™]\›ˆŠ
_KÒ”ÓÓŠJ^Ü™]\›žß_Kœ›ÛT\X[
J^Ü™]\›ˆŠ
__NÝ˜\ˆSXÛ\ÜÞÜœÎØÛÛœÝXÝÜŠŠ^Ý\ËœœÏ[‹\ËÜ™X]U˜[Y]Ü]\ËÜ™X]U˜[Y]Ü‹˜š[™
\ÊK\Ë‘Y]˜[Y]Ü]\Ë‘Y]˜[Y]Ü‹˜š[™
\ÊK\Ë‘[YØ]O]\Ë‘[YØ]K˜š[™
\ÊK\Ë™YÚ[”™Y[YØ]O]\Ë™YÚ[”™Y[YØ]K˜š[™
\ÊK\Ë•[™[YØ]O]\Ë•[™[YØ]K˜š[™
\ÊK\ËØ[˜Ù[[˜›Û™[™Ñ[YØ][Û]\ËØ[˜Ù[[˜›Û™[™Ñ[YØ][Û‹˜š[™
\ÊK\Ë•\]T\˜[\Ï]\Ë•\]T\˜[\Ë˜š[™
\Ê_PÜ™X]U˜[Y]ÜŠŠ^Û]^[‹“\ÙÐÜ™X]U˜[Y]Ü‹™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK“\ÙÈ‹Ü™X]U˜[Y]Üˆ‹
K[ŠOž[‹“\ÙÐÜ™X]U˜[Y]Ü”™\ÜÛœÙK™XÛÙJ™]È‹š[˜\žT™XY\ŠŠJJ_QY]˜[Y]ÜŠŠ^Û]^[‹“\ÙÑY]˜[Y]Ü‹™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK“\ÙÈ‹‘Y]˜[Y]Üˆ‹
K[ŠOž[‹“\ÙÑY]˜[Y]Ü”™\ÜÛœÙK™XÛÙJ™]È‹š[˜\žT™XY\ŠŠJJ_Q[YØ]JŠ^Û]^[‹“\ÙÑ[YØ]K™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK“\ÙÈ‹‘[YØ]H‹
K[ŠOž[‹“\ÙÑ[YØ]T™\ÜÛœÙK™XÛÙJ™]È‹š[˜\žT™XY\ŠŠJJ_P™YÚ[”™Y[YØ]JŠ^Û]^[‹“\ÙÐ™YÚ[”™Y[YØ]K™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK“\ÙÈ‹™YÚ[”™Y[YØ]H‹
K[ŠOž[‹“\ÙÐ™YÚ[”™Y[YØ]T™\ÜÛœÙK™XÛÙJ™]È‹š[˜\žT™XY\ŠŠJJ_U[™[YØ]JŠ^Û]^[‹“\ÙÕ[™[YØ]K™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK“\ÙÈ‹•[™[YØ]H‹
K[ŠOž[‹“\ÙÕ[™[YØ]T™\ÜÛœÙK™XÛÙJ™]È‹š[˜\žT™XY\ŠŠJJ_PØ[˜Ù[[˜›Û™[™Ñ[YØ][ÛŠŠ^Û]^[‹“\ÙÐØ[˜Ù[[˜›Û™[™Ñ[YØ][Û‹™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK“\ÙÈ‹Ø[˜Ù[[˜›Û™[™Ñ[YØ][Ûˆ‹
K[ŠOž[‹“\ÙÐØ[˜Ù[[˜›Û™[™Ñ[YØ][Û”™\ÜÛœÙK™XÛÙJ™]È‹š[˜\žT™XY\ŠŠJJ_U\]T\˜[\ÊŠ^Û]^[‹“\ÙÕ\]T\˜[\Ë™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK“\ÙÈ‹•\]T\˜[\È‹
K[ŠOž[‹“\ÙÕ\]T\˜[\Ô™\ÜÛœÙK™XÛÙJ™]È‹š[˜\žT™XY\ŠŠJJ__NÞ[‹“\ÙÐÛY[[\^SŸJNÝ˜\ˆORJÏOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\JË—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÖËœÝZÚ[™Õ\\Ï]›ÚYÖËš\Ó\ÙÐ™YÚ[”™Y[YØ]Q[˜ÛÙSØš™XÝX–ÖËš\Ó\ÙÐÜ™X]U˜[Y]Ü‘[˜ÛÙSØš™XÝT–ÖËš\Ó\ÙÑ[YØ]Q[˜ÛÙSØš™XÝTÖËš\Ó\ÙÑY]˜[Y]Ü‘[˜ÛÙSØš™XÝS–ÖËš\Ó\ÙÕ[™[YØ]Q[˜ÛÙSØš™XÝ]–ÖËš\Ó\ÙÐØ[˜Ù[[˜›Û™[™Ñ[YØ][Û‘[˜ÛÙSØš™XÝSÖÝ˜\ˆÐOP“Š
NÖËœÝZÚ[™Õ\\ÏVÖÈ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK“\ÙÐ™YÚ[”™Y[YØ]H‹ÐK“\ÙÐ™YÚ[”™Y[YØ]WKÈ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK“\ÙÐÜ™X]U˜[Y]Üˆ‹ÐK“\ÙÐÜ™X]U˜[Y]Ü—KÈ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK“\ÙÑ[YØ]H‹ÐK“\ÙÑ[YØ]WKÈ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK“\ÙÑY]˜[Y]Üˆ‹ÐK“\ÙÑY]˜[Y]Ü—KÈ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK“\ÙÕ[™[YØ]H‹ÐK“\ÙÕ[™[YØ]WKÈ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK“\ÙÐØ[˜Ù[[˜›Û™[™Ñ[YØ][Ûˆ‹ÐK“\ÙÐØ[˜Ù[[˜›Û™[™Ñ[YØ][Û—WNÙ[˜Ý[Ûˆ–
J^Ü™]\›ˆK\U\›OOH‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK“\ÙÐ™YÚ[”™Y[YØ]HŸY[˜Ý[Ûˆ–
J^Ü™]\›ˆK\U\›OOH‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK“\ÙÐÜ™X]U˜[Y]ÜˆŸY[˜Ý[Ûˆ
J^Ü™]\›ˆK\U\›OOH‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK“\ÙÑ[YØ]HŸY[˜Ý[Ûˆ–
J^Ü™]\›ˆK\U\›OOH‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK“\ÙÑY]˜[Y]ÜˆŸY[˜Ý[Ûˆ–
J^Ü™]\›ˆK\U\›OOH‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK“\ÙÕ[™[YØ]HŸY[˜Ý[ÛˆÖ
J^Ü™]\›ˆK\U\›OOH‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK“\ÙÐØ[˜Ù[[˜›Û™[™Ñ[YØ][ÛˆŸ_JNÝ˜\ˆ“ORJÙOOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\JÙK—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÜÙK”]Y\žPÛY[[\\ÙK”]Y\žT\˜[\Ô™\ÜÛœÙO\ÙK”]Y\žT\˜[\Ô™\]Y\Ý\ÙK”]Y\žTÛÛ™\ÜÛœÙO\ÙK”]Y\žTÛÛ™\]Y\Ý\ÙK”]Y\žR\ÝÜšXØ[[™›Ô™\ÜÛœÙO\ÙK”]Y\žR\ÝÜšXØ[[™›Ô™\]Y\Ý\ÙK”]Y\žQ[YØ]Ü•˜[Y]Ü”™\ÜÛœÙO\ÙK”]Y\žQ[YØ]Ü•˜[Y]Ü”™\]Y\Ý\ÙK”]Y\žQ[YØ]Ü•˜[Y]ÜœÔ™\ÜÛœÙO\ÙK”]Y\žQ[YØ]Ü•˜[Y]ÜœÔ™\]Y\Ý\ÙK”]Y\žT™Y[YØ][ÛœÔ™\ÜÛœÙO\ÙK”]Y\žT™Y[YØ][ÛœÔ™\]Y\Ý\ÙK”]Y\žQ[YØ]Ü•[˜›Û™[™Ñ[YØ][ÛœÔ™\ÜÛœÙO\ÙK”]Y\žQ[YØ]Ü•[˜›Û™[™Ñ[YØ][ÛœÔ™\]Y\Ý\ÙK”]Y\žQ[YØ]Ü‘[YØ][ÛœÔ™\ÜÛœÙO\ÙK”]Y\žQ[YØ]Ü‘[YØ][ÛœÔ™\]Y\Ý\ÙK”]Y\žU[˜›Û™[™Ñ[YØ][Û”™\ÜÛœÙO\ÙK”]Y\žU[˜›Û™[™Ñ[YØ][Û”™\]Y\Ý\ÙK”]Y\žQ[YØ][Û”™\ÜÛœÙO\ÙK”]Y\žQ[YØ][Û”™\]Y\Ý\ÙK”]Y\žU˜[Y]Ü•[˜›Û™[™Ñ[YØ][ÛœÔ™\ÜÛœÙO\ÙK”]Y\žU˜[Y]Ü•[˜›Û™[™Ñ[YØ][ÛœÔ™\]Y\Ý\ÙK”]Y\žU˜[Y]Ü‘[YØ][ÛœÔ™\ÜÛœÙO\ÙK”]Y\žU˜[Y]Ü‘[YØ][ÛœÔ™\]Y\Ý\ÙK”]Y\žU˜[Y]Ü”™\ÜÛœÙO\ÙK”]Y\žU˜[Y]Ü”™\]Y\Ý\ÙK”]Y\žU˜[Y]ÜœÔ™\ÜÛœÙO\ÙK”]Y\žU˜[Y]ÜœÔ™\]Y\Ý\ÙKœ›ÝØY”XÚØYÙO]›ÚYÝ˜\ˆÙO[Ê
KYO\“Š
KPÙJ
KQYJ
NÜÙKœ›ÝØY”XÚØYÙOH˜ÛÜÛ[ÜËœÝZÚ[™ËŒX™]LHŽÙ[˜Ý[ÛˆSŠ
^Ü™]\›žÜÝ]\Îˆˆ‹YÚ[˜][ÛŽ›ÚY_\ÙK”]Y\žU˜[Y]ÜœÔ™\]Y\Ý^Ý\U\›ˆ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK”]Y\žU˜[Y]ÜœÔ™\]Y\Ý‹[˜ÛÙJKV‹š[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆKœÝ]\ÈOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊKœÝ]\ÊKKœYÚ[˜][ÛˆOO]›ÚY	‰“ÙK”YÙT™\]Y\Ý™[˜ÛÙJKœYÚ[˜][Û‹‹Z[ÌŠN
K™›ÜšÊ
JK›[[J
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ‹š[˜\žT™XY\ÙN›™]È‹š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹[SŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹œÝ]\Ï]œÝš[™Ê
NØœ™XZÎØØ\ÙHŽœ‹œYÚ[˜][ÛSÙK”YÙT™\]Y\Ý™XÛÙJZ[ÌŠ
JNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û][SŠ
NÜ™]\›Šš\ÔÙ]
JKœÝ]\ÊI‰Š‹œÝ]\ÏTÝš[™ÊKœÝ]\ÊJK
š\ÔÙ]
JKœYÚ[˜][ÛŠI‰Š‹œYÚ[˜][ÛSÙK”YÙT™\]Y\Ý™œ›ÛR”ÓÓŠKœYÚ[˜][ÛŠJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆKœÝ]\ÈOO]›ÚY	‰Š‹œÝ]\ÏYKœÝ]\ÊKKœYÚ[˜][ÛˆOO]›ÚY	‰Š‹œYÚ[˜][ÛYKœYÚ[˜][ÛÓÙK”YÙT™\]Y\ÝÒ”ÓÓŠKœYÚ[˜][ÛŠN›ÚY
KŸKœ›ÛT\X[
J^Û][SŠ
NÜ™]\›ˆ‹œÝ]\ÏYKœÝ]\ÏÏÈˆ‹KœYÚ[˜][ÛˆOO]›ÚY	‰™KœYÚ[˜][ÛˆOO[[	‰Š‹œYÚ[˜][ÛSÙK”YÙT™\]Y\Ý™œ›ÛT\X[
KœYÚ[˜][ÛŠJKŸ_NÙ[˜Ý[ÛˆÓŠ
^Ü™]\›žÝ˜[Y]ÜœÎ–×KYÚ[˜][ÛŽ›ÚY_\ÙK”]Y\žU˜[Y]ÜœÔ™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK”]Y\žU˜[Y]ÜœÔ™\ÜÛœÙH‹[˜ÛÙJKV‹š[˜\žUÜš]\‹˜Ü™X]J
J^Ù›ÜŠ]ÙˆK˜[Y]ÜœÊ[YK•˜[Y]Ü‹™[˜ÛÙJ‹Z[ÌŠL
K™›ÜšÊ
JK›[[J
NÜ™]\›ˆKœYÚ[˜][ÛˆOO]›ÚY	‰“ÙK”YÙT™\ÜÛœÙK™[˜ÛÙJKœYÚ[˜][Û‹‹Z[ÌŠN
K™›ÜšÊ
JK›[[J
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ‹š[˜\žT™XY\ÙN›™]È‹š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹PÓŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹˜[Y]ÜœËœ\Ú
YK•˜[Y]Ü‹™XÛÙJZ[ÌŠ
JJNØœ™XZÎØØ\ÙHŽœ‹œYÚ[˜][ÛSÙK”YÙT™\ÜÛœÙK™XÛÙJZ[ÌŠ
JNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]PÓŠ
NÜ™]\›ˆ\œ˜^Kš\Ð\œ˜^JOË˜[Y]ÜœÊI‰Š‹˜[Y]ÜœÏYK˜[Y]ÜœË›X\
O›YK•˜[Y]Ü‹™œ›ÛR”ÓÓŠ
JJK
š\ÔÙ]
JKœYÚ[˜][ÛŠI‰Š‹œYÚ[˜][ÛSÙK”YÙT™\ÜÛœÙK™œ›ÛR”ÓÓŠKœYÚ[˜][ÛŠJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK˜[Y]ÜœÏÛ‹˜[Y]ÜœÏYK˜[Y]ÜœË›X\
OÛYK•˜[Y]Ü‹Ò”ÓÓŠ
N›ÚY
N›‹˜[Y]ÜœÏV×KKœYÚ[˜][ÛˆOO]›ÚY	‰Š‹œYÚ[˜][ÛYKœYÚ[˜][ÛÓÙK”YÙT™\ÜÛœÙKÒ”ÓÓŠKœYÚ[˜][ÛŠN›ÚY
KŸKœ›ÛT\X[
J^Û]PÓŠ
NÜ™]\›ˆ‹˜[Y]ÜœÏYK˜[Y]ÜœÏË›X\
O›YK•˜[Y]Ü‹™œ›ÛT\X[

J_×KKœYÚ[˜][ÛˆOO]›ÚY	‰™KœYÚ[˜][ÛˆOO[[	‰Š‹œYÚ[˜][ÛSÙK”YÙT™\ÜÛœÙK™œ›ÛT\X[
KœYÚ[˜][ÛŠJKŸ_NÙ[˜Ý[ÛˆÓŠ
^Ü™]\›žÝ˜[Y]ÜYŽˆˆŸ_\ÙK”]Y\žU˜[Y]Ü”™\]Y\Ý^Ý\U\›ˆ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK”]Y\žU˜[Y]Ü”™\]Y\Ý‹[˜ÛÙJKV‹š[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK˜[Y]ÜYˆOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊK˜[Y]ÜYŠKŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ‹š[˜\žT™XY\ÙN›™]È‹š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹TÓŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÛÏŒÏOOLOÜ‹˜[Y]ÜY]œÝš[™Ê
NœÚÚ\\JÉÊ_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]TÓŠ
NÜ™]\›Šš\ÔÙ]
JK˜[Y]ÜYŠI‰Š‹˜[Y]ÜYTÝš[™ÊK˜[Y]ÜYŠJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK˜[Y]ÜYˆOO]›ÚY	‰Š‹˜[Y]ÜYYK˜[Y]ÜYŠKŸKœ›ÛT\X[
J^Û]TÓŠ
NÜ™]\›ˆ‹˜[Y]ÜYYK˜[Y]ÜYÏÈˆ‹Ÿ_NÙ[˜Ý[ÛˆÓŠ
^Ü™]\›žÝ˜[Y]ÜŽ›YK•˜[Y]Ü‹™œ›ÛT\X[
ßJ__\ÙK”]Y\žU˜[Y]Ü”™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK”]Y\žU˜[Y]Ü”™\ÜÛœÙH‹[˜ÛÙJKV‹š[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK˜[Y]ÜˆOO]›ÚY	‰›YK•˜[Y]Ü‹™[˜ÛÙJK˜[Y]Ü‹‹Z[ÌŠL
K™›ÜšÊ
JK›[[J
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ‹š[˜\žT™XY\ÙN›™]È‹š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹ZÓŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÛÏŒÏOOLOÜ‹˜[Y]Ü[YK•˜[Y]Ü‹™XÛÙJZ[ÌŠ
JNœÚÚ\\JÉÊ_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]ZÓŠ
NÜ™]\›Šš\ÔÙ]
JK˜[Y]ÜŠI‰Š‹˜[Y]Ü[YK•˜[Y]Ü‹™œ›ÛR”ÓÓŠK˜[Y]ÜŠJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK˜[Y]ÜˆOO]›ÚY	‰Š‹˜[Y]ÜYK˜[Y]ÜÛYK•˜[Y]Ü‹Ò”ÓÓŠK˜[Y]ÜŠN›ÚY
KŸKœ›ÛT\X[
J^Û]ZÓŠ
NÜ™]\›ˆK˜[Y]ÜˆOO]›ÚY	‰™K˜[Y]ÜˆOO[[	‰Š‹˜[Y]Ü[YK•˜[Y]Ü‹™œ›ÛT\X[
K˜[Y]ÜŠJKŸ_NÙ[˜Ý[ÛˆSŠ
^Ü™]\›žÝ˜[Y]ÜYŽˆˆ‹YÚ[˜][ÛŽ›ÚY_\ÙK”]Y\žU˜[Y]Ü‘[YØ][ÛœÔ™\]Y\Ý^Ý\U\›ˆ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK”]Y\žU˜[Y]Ü‘[YØ][ÛœÔ™\]Y\Ý‹[˜ÛÙJKV‹š[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK˜[Y]ÜYˆOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊK˜[Y]ÜYŠKKœYÚ[˜][ÛˆOO]›ÚY	‰“ÙK”YÙT™\]Y\Ý™[˜ÛÙJKœYÚ[˜][Û‹‹Z[ÌŠN
K™›ÜšÊ
JK›[[J
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ‹š[˜\žT™XY\ÙN›™]È‹š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹QSŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹˜[Y]ÜY]œÝš[™Ê
NØœ™XZÎØØ\ÙHŽœ‹œYÚ[˜][ÛSÙK”YÙT™\]Y\Ý™XÛÙJZ[ÌŠ
JNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]QSŠ
NÜ™]\›Šš\ÔÙ]
JK˜[Y]ÜYŠI‰Š‹˜[Y]ÜYTÝš[™ÊK˜[Y]ÜYŠJK
š\ÔÙ]
JKœYÚ[˜][ÛŠI‰Š‹œYÚ[˜][ÛSÙK”YÙT™\]Y\Ý™œ›ÛR”ÓÓŠKœYÚ[˜][ÛŠJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK˜[Y]ÜYˆOO]›ÚY	‰Š‹˜[Y]ÜYYK˜[Y]ÜYŠKKœYÚ[˜][ÛˆOO]›ÚY	‰Š‹œYÚ[˜][ÛYKœYÚ[˜][ÛÓÙK”YÙT™\]Y\ÝÒ”ÓÓŠKœYÚ[˜][ÛŠN›ÚY
KŸKœ›ÛT\X[
J^Û]QSŠ
NÜ™]\›ˆ‹˜[Y]ÜYYK˜[Y]ÜYÏÈˆ‹KœYÚ[˜][ÛˆOO]›ÚY	‰™KœYÚ[˜][ÛˆOO[[	‰Š‹œYÚ[˜][ÛSÙK”YÙT™\]Y\Ý™œ›ÛT\X[
KœYÚ[˜][ÛŠJKŸ_NÙ[˜Ý[ÛˆSŠ
^Ü™]\›žÙ[YØ][Û”™\ÜÛœÙ\Î–×KYÚ[˜][ÛŽ›ÚY_\ÙK”]Y\žU˜[Y]Ü‘[YØ][ÛœÔ™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK”]Y\žU˜[Y]Ü‘[YØ][ÛœÔ™\ÜÛœÙH‹[˜ÛÙJKV‹š[˜\žUÜš]\‹˜Ü™X]J
J^Ù›ÜŠ]ÙˆK™[YØ][Û”™\ÜÛœÙ\Ê[YK‘[YØ][Û”™\ÜÛœÙK™[˜ÛÙJ‹Z[ÌŠL
K™›ÜšÊ
JK›[[J
NÜ™]\›ˆKœYÚ[˜][ÛˆOO]›ÚY	‰“ÙK”YÙT™\ÜÛœÙK™[˜ÛÙJKœYÚ[˜][Û‹‹Z[ÌŠN
K™›ÜšÊ
JK›[[J
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ‹š[˜\žT™XY\ÙN›™]È‹š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹TSŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹™[YØ][Û”™\ÜÛœÙ\Ëœ\Ú
YK‘[YØ][Û”™\ÜÛœÙK™XÛÙJZ[ÌŠ
JJNØœ™XZÎØØ\ÙHŽœ‹œYÚ[˜][ÛSÙK”YÙT™\ÜÛœÙK™XÛÙJZ[ÌŠ
JNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]TSŠ
NÜ™]\›ˆ\œ˜^Kš\Ð\œ˜^JOË™[YØ][Û”™\ÜÛœÙ\ÊI‰Š‹™[YØ][Û”™\ÜÛœÙ\ÏYK™[YØ][Û”™\ÜÛœÙ\Ë›X\
O›YK‘[YØ][Û”™\ÜÛœÙK™œ›ÛR”ÓÓŠ
JJK
š\ÔÙ]
JKœYÚ[˜][ÛŠI‰Š‹œYÚ[˜][ÛSÙK”YÙT™\ÜÛœÙK™œ›ÛR”ÓÓŠKœYÚ[˜][ÛŠJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK™[YØ][Û”™\ÜÛœÙ\ÏÛ‹™[YØ][Û”™\ÜÛœÙ\ÏYK™[YØ][Û”™\ÜÛœÙ\Ë›X\
OÛYK‘[YØ][Û”™\ÜÛœÙKÒ”ÓÓŠ
N›ÚY
N›‹™[YØ][Û”™\ÜÛœÙ\ÏV×KKœYÚ[˜][ÛˆOO]›ÚY	‰Š‹œYÚ[˜][ÛYKœYÚ[˜][ÛÓÙK”YÙT™\ÜÛœÙKÒ”ÓÓŠKœYÚ[˜][ÛŠN›ÚY
KŸKœ›ÛT\X[
J^Û]TSŠ
NÜ™]\›ˆ‹™[YØ][Û”™\ÜÛœÙ\ÏYK™[YØ][Û”™\ÜÛœÙ\ÏË›X\
O›YK‘[YØ][Û”™\ÜÛœÙK™œ›ÛT\X[

J_×KKœYÚ[˜][ÛˆOO]›ÚY	‰™KœYÚ[˜][ÛˆOO[[	‰Š‹œYÚ[˜][ÛSÙK”YÙT™\ÜÛœÙK™œ›ÛT\X[
KœYÚ[˜][ÛŠJKŸ_NÙ[˜Ý[ÛˆÓŠ
^Ü™]\›žÝ˜[Y]ÜYŽˆˆ‹YÚ[˜][ÛŽ›ÚY_\ÙK”]Y\žU˜[Y]Ü•[˜›Û™[™Ñ[YØ][ÛœÔ™\]Y\Ý^Ý\U\›ˆ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK”]Y\žU˜[Y]Ü•[˜›Û™[™Ñ[YØ][ÛœÔ™\]Y\Ý‹[˜ÛÙJKV‹š[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK˜[Y]ÜYˆOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊK˜[Y]ÜYŠKKœYÚ[˜][ÛˆOO]›ÚY	‰“ÙK”YÙT™\]Y\Ý™[˜ÛÙJKœYÚ[˜][Û‹‹Z[ÌŠN
K™›ÜšÊ
JK›[[J
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ‹š[˜\žT™XY\ÙN›™]È‹š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹]ÓŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹˜[Y]ÜY]œÝš[™Ê
NØœ™XZÎØØ\ÙHŽœ‹œYÚ[˜][ÛSÙK”YÙT™\]Y\Ý™XÛÙJZ[ÌŠ
JNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]]ÓŠ
NÜ™]\›Šš\ÔÙ]
JK˜[Y]ÜYŠI‰Š‹˜[Y]ÜYTÝš[™ÊK˜[Y]ÜYŠJK
š\ÔÙ]
JKœYÚ[˜][ÛŠI‰Š‹œYÚ[˜][ÛSÙK”YÙT™\]Y\Ý™œ›ÛR”ÓÓŠKœYÚ[˜][ÛŠJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK˜[Y]ÜYˆOO]›ÚY	‰Š‹˜[Y]ÜYYK˜[Y]ÜYŠKKœYÚ[˜][ÛˆOO]›ÚY	‰Š‹œYÚ[˜][ÛYKœYÚ[˜][ÛÓÙK”YÙT™\]Y\ÝÒ”ÓÓŠKœYÚ[˜][ÛŠN›ÚY
KŸKœ›ÛT\X[
J^Û]]ÓŠ
NÜ™]\›ˆ‹˜[Y]ÜYYK˜[Y]ÜYÏÈˆ‹KœYÚ[˜][ÛˆOO]›ÚY	‰™KœYÚ[˜][ÛˆOO[[	‰Š‹œYÚ[˜][ÛSÙK”YÙT™\]Y\Ý™œ›ÛT\X[
KœYÚ[˜][ÛŠJKŸ_NÙ[˜Ý[Ûˆ“Š
^Ü™]\›žÝ[˜›Û™[™Ô™\ÜÛœÙ\Î–×KYÚ[˜][ÛŽ›ÚY_\ÙK”]Y\žU˜[Y]Ü•[˜›Û™[™Ñ[YØ][ÛœÔ™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK”]Y\žU˜[Y]Ü•[˜›Û™[™Ñ[YØ][ÛœÔ™\ÜÛœÙH‹[˜ÛÙJKV‹š[˜\žUÜš]\‹˜Ü™X]J
J^Ù›ÜŠ]ÙˆK[˜›Û™[™Ô™\ÜÛœÙ\Ê[YK•[˜›Û™[™Ñ[YØ][Û‹™[˜ÛÙJ‹Z[ÌŠL
K™›ÜšÊ
JK›[[J
NÜ™]\›ˆKœYÚ[˜][ÛˆOO]›ÚY	‰“ÙK”YÙT™\ÜÛœÙK™[˜ÛÙJKœYÚ[˜][Û‹‹Z[ÌŠN
K™›ÜšÊ
JK›[[J
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ‹š[˜\žT™XY\ÙN›™]È‹š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹X“Š
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹[˜›Û™[™Ô™\ÜÛœÙ\Ëœ\Ú
YK•[˜›Û™[™Ñ[YØ][Û‹™XÛÙJZ[ÌŠ
JJNØœ™XZÎØØ\ÙHŽœ‹œYÚ[˜][ÛSÙK”YÙT™\ÜÛœÙK™XÛÙJZ[ÌŠ
JNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]X“Š
NÜ™]\›ˆ\œ˜^Kš\Ð\œ˜^JOË[˜›Û™[™Ô™\ÜÛœÙ\ÊI‰Š‹[˜›Û™[™Ô™\ÜÛœÙ\ÏYK[˜›Û™[™Ô™\ÜÛœÙ\Ë›X\
O›YK•[˜›Û™[™Ñ[YØ][Û‹™œ›ÛR”ÓÓŠ
JJK
š\ÔÙ]
JKœYÚ[˜][ÛŠI‰Š‹œYÚ[˜][ÛSÙK”YÙT™\ÜÛœÙK™œ›ÛR”ÓÓŠKœYÚ[˜][ÛŠJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK[˜›Û™[™Ô™\ÜÛœÙ\ÏÛ‹[˜›Û™[™Ô™\ÜÛœÙ\ÏYK[˜›Û™[™Ô™\ÜÛœÙ\Ë›X\
OÛYK•[˜›Û™[™Ñ[YØ][Û‹Ò”ÓÓŠ
N›ÚY
N›‹[˜›Û™[™Ô™\ÜÛœÙ\ÏV×KKœYÚ[˜][ÛˆOO]›ÚY	‰Š‹œYÚ[˜][ÛYKœYÚ[˜][ÛÓÙK”YÙT™\ÜÛœÙKÒ”ÓÓŠKœYÚ[˜][ÛŠN›ÚY
KŸKœ›ÛT\X[
J^Û]X“Š
NÜ™]\›ˆ‹[˜›Û™[™Ô™\ÜÛœÙ\ÏYK[˜›Û™[™Ô™\ÜÛœÙ\ÏË›X\
O›YK•[˜›Û™[™Ñ[YØ][Û‹™œ›ÛT\X[

J_×KKœYÚ[˜][ÛˆOO]›ÚY	‰™KœYÚ[˜][ÛˆOO[[	‰Š‹œYÚ[˜][ÛSÙK”YÙT™\ÜÛœÙK™œ›ÛT\X[
KœYÚ[˜][ÛŠJKŸ_NÙ[˜Ý[Ûˆ“Š
^Ü™]\›žÙ[YØ]ÜYŽˆˆ‹˜[Y]ÜYŽˆˆŸ_\ÙK”]Y\žQ[YØ][Û”™\]Y\Ý^Ý\U\›ˆ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK”]Y\žQ[YØ][Û”™\]Y\Ý‹[˜ÛÙJKV‹š[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK™[YØ]ÜYˆOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊK™[YØ]ÜYŠKK˜[Y]ÜYˆOOHˆ‰‰›‹Z[ÌŠN
KœÝš[™ÊK˜[Y]ÜYŠKŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ‹š[˜\žT™XY\ÙN›™]È‹š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹T“Š
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹™[YØ]ÜY]œÝš[™Ê
NØœ™XZÎØØ\ÙHŽœ‹˜[Y]ÜY]œÝš[™Ê
NØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]T“Š
NÜ™]\›Šš\ÔÙ]
JK™[YØ]ÜYŠI‰Š‹™[YØ]ÜYTÝš[™ÊK™[YØ]ÜYŠJK
š\ÔÙ]
JK˜[Y]ÜYŠI‰Š‹˜[Y]ÜYTÝš[™ÊK˜[Y]ÜYŠJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK™[YØ]ÜYˆOO]›ÚY	‰Š‹™[YØ]ÜYYK™[YØ]ÜYŠKK˜[Y]ÜYˆOO]›ÚY	‰Š‹˜[Y]ÜYYK˜[Y]ÜYŠKŸKœ›ÛT\X[
J^Û]T“Š
NÜ™]\›ˆ‹™[YØ]ÜYYK™[YØ]ÜYÏÈˆ‹‹˜[Y]ÜYYK˜[Y]ÜYÏÈˆ‹Ÿ_NÙ[˜Ý[ÛˆŠ
^Ü™]\›žÙ[YØ][Û”™\ÜÛœÙN›ÚY_\ÙK”]Y\žQ[YØ][Û”™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK”]Y\žQ[YØ][Û”™\ÜÛœÙH‹[˜ÛÙJKV‹š[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK™[YØ][Û”™\ÜÛœÙHOO]›ÚY	‰›YK‘[YØ][Û”™\ÜÛœÙK™[˜ÛÙJK™[YØ][Û”™\ÜÛœÙK‹Z[ÌŠL
K™›ÜšÊ
JK›[[J
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ‹š[˜\žT™XY\ÙN›™]È‹š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹TŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÛÏŒÏOOLOÜ‹™[YØ][Û”™\ÜÛœÙO[YK‘[YØ][Û”™\ÜÛœÙK™XÛÙJZ[ÌŠ
JNœÚÚ\\JÉÊ_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]TŠ
NÜ™]\›Šš\ÔÙ]
JK™[YØ][Û”™\ÜÛœÙJI‰Š‹™[YØ][Û”™\ÜÛœÙO[YK‘[YØ][Û”™\ÜÛœÙK™œ›ÛR”ÓÓŠK™[YØ][Û”™\ÜÛœÙJJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK™[YØ][Û”™\ÜÛœÙHOO]›ÚY	‰Š‹™[YØ][Û”™\ÜÛœÙOYK™[YØ][Û”™\ÜÛœÙOÛYK‘[YØ][Û”™\ÜÛœÙKÒ”ÓÓŠK™[YØ][Û”™\ÜÛœÙJN›ÚY
KŸKœ›ÛT\X[
J^Û]TŠ
NÜ™]\›ˆK™[YØ][Û”™\ÜÛœÙHOO]›ÚY	‰™K™[YØ][Û”™\ÜÛœÙHOO[[	‰Š‹™[YØ][Û”™\ÜÛœÙO[YK‘[YØ][Û”™\ÜÛœÙK™œ›ÛT\X[
K™[YØ][Û”™\ÜÛœÙJJKŸ_NÙ[˜Ý[Ûˆ“Š
^Ü™]\›žÙ[YØ]ÜYŽˆˆ‹˜[Y]ÜYŽˆˆŸ_\ÙK”]Y\žU[˜›Û™[™Ñ[YØ][Û”™\]Y\Ý^Ý\U\›ˆ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK”]Y\žU[˜›Û™[™Ñ[YØ][Û”™\]Y\Ý‹[˜ÛÙJKV‹š[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK™[YØ]ÜYˆOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊK™[YØ]ÜYŠKK˜[Y]ÜYˆOOHˆ‰‰›‹Z[ÌŠN
KœÝš[™ÊK˜[Y]ÜYŠKŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ‹š[˜\žT™XY\ÙN›™]È‹š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹S“Š
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹™[YØ]ÜY]œÝš[™Ê
NØœ™XZÎØØ\ÙHŽœ‹˜[Y]ÜY]œÝš[™Ê
NØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]S“Š
NÜ™]\›Šš\ÔÙ]
JK™[YØ]ÜYŠI‰Š‹™[YØ]ÜYTÝš[™ÊK™[YØ]ÜYŠJK
š\ÔÙ]
JK˜[Y]ÜYŠI‰Š‹˜[Y]ÜYTÝš[™ÊK˜[Y]ÜYŠJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK™[YØ]ÜYˆOO]›ÚY	‰Š‹™[YØ]ÜYYK™[YØ]ÜYŠKK˜[Y]ÜYˆOO]›ÚY	‰Š‹˜[Y]ÜYYK˜[Y]ÜYŠKŸKœ›ÛT\X[
J^Û]S“Š
NÜ™]\›ˆ‹™[YØ]ÜYYK™[YØ]ÜYÏÈˆ‹‹˜[Y]ÜYYK˜[Y]ÜYÏÈˆ‹Ÿ_NÙ[˜Ý[Ûˆ“Š
^Ü™]\›žÝ[˜›Û™›YK•[˜›Û™[™Ñ[YØ][Û‹™œ›ÛT\X[
ßJ__\ÙK”]Y\žU[˜›Û™[™Ñ[YØ][Û”™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK”]Y\žU[˜›Û™[™Ñ[YØ][Û”™\ÜÛœÙH‹[˜ÛÙJKV‹š[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK[˜›Û™OO]›ÚY	‰›YK•[˜›Û™[™Ñ[YØ][Û‹™[˜ÛÙJK[˜›Û™‹Z[ÌŠL
K™›ÜšÊ
JK›[[J
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ‹š[˜\žT™XY\ÙN›™]È‹š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹]“Š
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÛÏŒÏOOLOÜ‹[˜›Û™[YK•[˜›Û™[™Ñ[YØ][Û‹™XÛÙJZ[ÌŠ
JNœÚÚ\\JÉÊ_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]]“Š
NÜ™]\›Šš\ÔÙ]
JK[˜›Û™
I‰Š‹[˜›Û™[YK•[˜›Û™[™Ñ[YØ][Û‹™œ›ÛR”ÓÓŠK[˜›Û™
JKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK[˜›Û™OO]›ÚY	‰Š‹[˜›Û™YK[˜›Û™ÛYK•[˜›Û™[™Ñ[YØ][Û‹Ò”ÓÓŠK[˜›Û™
N›ÚY
KŸKœ›ÛT\X[
J^Û]]“Š
NÜ™]\›ˆK[˜›Û™OO]›ÚY	‰™K[˜›Û™OO[[	‰Š‹[˜›Û™[YK•[˜›Û™[™Ñ[YØ][Û‹™œ›ÛT\X[
K[˜›Û™
JKŸ_NÙ[˜Ý[ÛˆÓŠ
^Ü™]\›žÙ[YØ]ÜYŽˆˆ‹YÚ[˜][ÛŽ›ÚY_\ÙK”]Y\žQ[YØ]Ü‘[YØ][ÛœÔ™\]Y\Ý^Ý\U\›ˆ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK”]Y\žQ[YØ]Ü‘[YØ][ÛœÔ™\]Y\Ý‹[˜ÛÙJKV‹š[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK™[YØ]ÜYˆOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊK™[YØ]ÜYŠKKœYÚ[˜][ÛˆOO]›ÚY	‰“ÙK”YÙT™\]Y\Ý™[˜ÛÙJKœYÚ[˜][Û‹‹Z[ÌŠN
K™›ÜšÊ
JK›[[J
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ‹š[˜\žT™XY\ÙN›™]È‹š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹SÓŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹™[YØ]ÜY]œÝš[™Ê
NØœ™XZÎØØ\ÙHŽœ‹œYÚ[˜][ÛSÙK”YÙT™\]Y\Ý™XÛÙJZ[ÌŠ
JNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]SÓŠ
NÜ™]\›Šš\ÔÙ]
JK™[YØ]ÜYŠI‰Š‹™[YØ]ÜYTÝš[™ÊK™[YØ]ÜYŠJK
š\ÔÙ]
JKœYÚ[˜][ÛŠI‰Š‹œYÚ[˜][ÛSÙK”YÙT™\]Y\Ý™œ›ÛR”ÓÓŠKœYÚ[˜][ÛŠJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK™[YØ]ÜYˆOO]›ÚY	‰Š‹™[YØ]ÜYYK™[YØ]ÜYŠKKœYÚ[˜][ÛˆOO]›ÚY	‰Š‹œYÚ[˜][ÛYKœYÚ[˜][ÛÓÙK”YÙT™\]Y\ÝÒ”ÓÓŠKœYÚ[˜][ÛŠN›ÚY
KŸKœ›ÛT\X[
J^Û]SÓŠ
NÜ™]\›ˆ‹™[YØ]ÜYYK™[YØ]ÜYÏÈˆ‹KœYÚ[˜][ÛˆOO]›ÚY	‰™KœYÚ[˜][ÛˆOO[[	‰Š‹œYÚ[˜][ÛSÙK”YÙT™\]Y\Ý™œ›ÛT\X[
KœYÚ[˜][ÛŠJKŸ_NÙ[˜Ý[ÛˆŠ
^Ü™]\›žÙ[YØ][Û”™\ÜÛœÙ\Î–×KYÚ[˜][ÛŽ›ÚY_\ÙK”]Y\žQ[YØ]Ü‘[YØ][ÛœÔ™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK”]Y\žQ[YØ]Ü‘[YØ][ÛœÔ™\ÜÛœÙH‹[˜ÛÙJKV‹š[˜\žUÜš]\‹˜Ü™X]J
J^Ù›ÜŠ]ÙˆK™[YØ][Û”™\ÜÛœÙ\Ê[YK‘[YØ][Û”™\ÜÛœÙK™[˜ÛÙJ‹Z[ÌŠL
K™›ÜšÊ
JK›[[J
NÜ™]\›ˆKœYÚ[˜][ÛˆOO]›ÚY	‰“ÙK”YÙT™\ÜÛœÙK™[˜ÛÙJKœYÚ[˜][Û‹‹Z[ÌŠN
K™›ÜšÊ
JK›[[J
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ‹š[˜\žT™XY\ÙN›™]È‹š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹QŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹™[YØ][Û”™\ÜÛœÙ\Ëœ\Ú
YK‘[YØ][Û”™\ÜÛœÙK™XÛÙJZ[ÌŠ
JJNØœ™XZÎØØ\ÙHŽœ‹œYÚ[˜][ÛSÙK”YÙT™\ÜÛœÙK™XÛÙJZ[ÌŠ
JNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]QŠ
NÜ™]\›ˆ\œ˜^Kš\Ð\œ˜^JOË™[YØ][Û”™\ÜÛœÙ\ÊI‰Š‹™[YØ][Û”™\ÜÛœÙ\ÏYK™[YØ][Û”™\ÜÛœÙ\Ë›X\
O›YK‘[YØ][Û”™\ÜÛœÙK™œ›ÛR”ÓÓŠ
JJK
š\ÔÙ]
JKœYÚ[˜][ÛŠI‰Š‹œYÚ[˜][ÛSÙK”YÙT™\ÜÛœÙK™œ›ÛR”ÓÓŠKœYÚ[˜][ÛŠJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK™[YØ][Û”™\ÜÛœÙ\ÏÛ‹™[YØ][Û”™\ÜÛœÙ\ÏYK™[YØ][Û”™\ÜÛœÙ\Ë›X\
OÛYK‘[YØ][Û”™\ÜÛœÙKÒ”ÓÓŠ
N›ÚY
N›‹™[YØ][Û”™\ÜÛœÙ\ÏV×KKœYÚ[˜][ÛˆOO]›ÚY	‰Š‹œYÚ[˜][ÛYKœYÚ[˜][ÛÓÙK”YÙT™\ÜÛœÙKÒ”ÓÓŠKœYÚ[˜][ÛŠN›ÚY
KŸKœ›ÛT\X[
J^Û]QŠ
NÜ™]\›ˆ‹™[YØ][Û”™\ÜÛœÙ\ÏYK™[YØ][Û”™\ÜÛœÙ\ÏË›X\
O›YK‘[YØ][Û”™\ÜÛœÙK™œ›ÛT\X[

J_×KKœYÚ[˜][ÛˆOO]›ÚY	‰™KœYÚ[˜][ÛˆOO[[	‰Š‹œYÚ[˜][ÛSÙK”YÙT™\ÜÛœÙK™œ›ÛT\X[
KœYÚ[˜][ÛŠJKŸ_NÙ[˜Ý[ÛˆSŠ
^Ü™]\›žÙ[YØ]ÜYŽˆˆ‹YÚ[˜][ÛŽ›ÚY_\ÙK”]Y\žQ[YØ]Ü•[˜›Û™[™Ñ[YØ][ÛœÔ™\]Y\Ý^Ý\U\›ˆ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK”]Y\žQ[YØ]Ü•[˜›Û™[™Ñ[YØ][ÛœÔ™\]Y\Ý‹[˜ÛÙJKV‹š[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK™[YØ]ÜYˆOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊK™[YØ]ÜYŠKKœYÚ[˜][ÛˆOO]›ÚY	‰“ÙK”YÙT™\]Y\Ý™[˜ÛÙJKœYÚ[˜][Û‹‹Z[ÌŠN
K™›ÜšÊ
JK›[[J
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ‹š[˜\žT™XY\ÙN›™]È‹š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹USŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹™[YØ]ÜY]œÝš[™Ê
NØœ™XZÎØØ\ÙHŽœ‹œYÚ[˜][ÛSÙK”YÙT™\]Y\Ý™XÛÙJZ[ÌŠ
JNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]USŠ
NÜ™]\›Šš\ÔÙ]
JK™[YØ]ÜYŠI‰Š‹™[YØ]ÜYTÝš[™ÊK™[YØ]ÜYŠJK
š\ÔÙ]
JKœYÚ[˜][ÛŠI‰Š‹œYÚ[˜][ÛSÙK”YÙT™\]Y\Ý™œ›ÛR”ÓÓŠKœYÚ[˜][ÛŠJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK™[YØ]ÜYˆOO]›ÚY	‰Š‹™[YØ]ÜYYK™[YØ]ÜYŠKKœYÚ[˜][ÛˆOO]›ÚY	‰Š‹œYÚ[˜][ÛYKœYÚ[˜][ÛÓÙK”YÙT™\]Y\ÝÒ”ÓÓŠKœYÚ[˜][ÛŠN›ÚY
KŸKœ›ÛT\X[
J^Û]USŠ
NÜ™]\›ˆ‹™[YØ]ÜYYK™[YØ]ÜYÏÈˆ‹KœYÚ[˜][ÛˆOO]›ÚY	‰™KœYÚ[˜][ÛˆOO[[	‰Š‹œYÚ[˜][ÛSÙK”YÙT™\]Y\Ý™œ›ÛT\X[
KœYÚ[˜][ÛŠJKŸ_NÙ[˜Ý[ÛˆŠ
^Ü™]\›žÝ[˜›Û™[™Ô™\ÜÛœÙ\Î–×KYÚ[˜][ÛŽ›ÚY_\ÙK”]Y\žQ[YØ]Ü•[˜›Û™[™Ñ[YØ][ÛœÔ™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK”]Y\žQ[YØ]Ü•[˜›Û™[™Ñ[YØ][ÛœÔ™\ÜÛœÙH‹[˜ÛÙJKV‹š[˜\žUÜš]\‹˜Ü™X]J
J^Ù›ÜŠ]ÙˆK[˜›Û™[™Ô™\ÜÛœÙ\Ê[YK•[˜›Û™[™Ñ[YØ][Û‹™[˜ÛÙJ‹Z[ÌŠL
K™›ÜšÊ
JK›[[J
NÜ™]\›ˆKœYÚ[˜][ÛˆOO]›ÚY	‰“ÙK”YÙT™\ÜÛœÙK™[˜ÛÙJKœYÚ[˜][Û‹‹Z[ÌŠN
K™›ÜšÊ
JK›[[J
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ‹š[˜\žT™XY\ÙN›™]È‹š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹^Š
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹[˜›Û™[™Ô™\ÜÛœÙ\Ëœ\Ú
YK•[˜›Û™[™Ñ[YØ][Û‹™XÛÙJZ[ÌŠ
JJNØœ™XZÎØØ\ÙHŽœ‹œYÚ[˜][ÛSÙK”YÙT™\ÜÛœÙK™XÛÙJZ[ÌŠ
JNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]^Š
NÜ™]\›ˆ\œ˜^Kš\Ð\œ˜^JOË[˜›Û™[™Ô™\ÜÛœÙ\ÊI‰Š‹[˜›Û™[™Ô™\ÜÛœÙ\ÏYK[˜›Û™[™Ô™\ÜÛœÙ\Ë›X\
O›YK•[˜›Û™[™Ñ[YØ][Û‹™œ›ÛR”ÓÓŠ
JJK
š\ÔÙ]
JKœYÚ[˜][ÛŠI‰Š‹œYÚ[˜][ÛSÙK”YÙT™\ÜÛœÙK™œ›ÛR”ÓÓŠKœYÚ[˜][ÛŠJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK[˜›Û™[™Ô™\ÜÛœÙ\ÏÛ‹[˜›Û™[™Ô™\ÜÛœÙ\ÏYK[˜›Û™[™Ô™\ÜÛœÙ\Ë›X\
OÛYK•[˜›Û™[™Ñ[YØ][Û‹Ò”ÓÓŠ
N›ÚY
N›‹[˜›Û™[™Ô™\ÜÛœÙ\ÏV×KKœYÚ[˜][ÛˆOO]›ÚY	‰Š‹œYÚ[˜][ÛYKœYÚ[˜][ÛÓÙK”YÙT™\ÜÛœÙKÒ”ÓÓŠKœYÚ[˜][ÛŠN›ÚY
KŸKœ›ÛT\X[
J^Û]^Š
NÜ™]\›ˆ‹[˜›Û™[™Ô™\ÜÛœÙ\ÏYK[˜›Û™[™Ô™\ÜÛœÙ\ÏË›X\
O›YK•[˜›Û™[™Ñ[YØ][Û‹™œ›ÛT\X[

J_×KKœYÚ[˜][ÛˆOO]›ÚY	‰™KœYÚ[˜][ÛˆOO[[	‰Š‹œYÚ[˜][ÛSÙK”YÙT™\ÜÛœÙK™œ›ÛT\X[
KœYÚ[˜][ÛŠJKŸ_NÙ[˜Ý[ÛˆŠ
^Ü™]\›žÙ[YØ]ÜYŽˆˆ‹Ü˜Õ˜[Y]ÜYŽˆˆ‹Ý˜[Y]ÜYŽˆˆ‹YÚ[˜][ÛŽ›ÚY_\ÙK”]Y\žT™Y[YØ][ÛœÔ™\]Y\Ý^Ý\U\›ˆ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK”]Y\žT™Y[YØ][ÛœÔ™\]Y\Ý‹[˜ÛÙJKV‹š[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK™[YØ]ÜYˆOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊK™[YØ]ÜYŠKKœÜ˜Õ˜[Y]ÜYˆOOHˆ‰‰›‹Z[ÌŠN
KœÝš[™ÊKœÜ˜Õ˜[Y]ÜYŠKK™Ý˜[Y]ÜYˆOOHˆ‰‰›‹Z[ÌŠŠKœÝš[™ÊK™Ý˜[Y]ÜYŠKKœYÚ[˜][ÛˆOO]›ÚY	‰“ÙK”YÙT™\]Y\Ý™[˜ÛÙJKœYÚ[˜][Û‹‹Z[ÌŠÍ
K™›ÜšÊ
JK›[[J
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ‹š[˜\žT™XY\ÙN›™]È‹š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹UŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹™[YØ]ÜY]œÝš[™Ê
NØœ™XZÎØØ\ÙHŽœ‹œÜ˜Õ˜[Y]ÜY]œÝš[™Ê
NØœ™XZÎØØ\ÙHÎœ‹™Ý˜[Y]ÜY]œÝš[™Ê
NØœ™XZÎØØ\ÙHœ‹œYÚ[˜][ÛSÙK”YÙT™\]Y\Ý™XÛÙJZ[ÌŠ
JNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]UŠ
NÜ™]\›Šš\ÔÙ]
JK™[YØ]ÜYŠI‰Š‹™[YØ]ÜYTÝš[™ÊK™[YØ]ÜYŠJK
š\ÔÙ]
JKœÜ˜Õ˜[Y]ÜYŠI‰Š‹œÜ˜Õ˜[Y]ÜYTÝš[™ÊKœÜ˜Õ˜[Y]ÜYŠJK
š\ÔÙ]
JK™Ý˜[Y]ÜYŠI‰Š‹™Ý˜[Y]ÜYTÝš[™ÊK™Ý˜[Y]ÜYŠJK
š\ÔÙ]
JKœYÚ[˜][ÛŠI‰Š‹œYÚ[˜][ÛSÙK”YÙT™\]Y\Ý™œ›ÛR”ÓÓŠKœYÚ[˜][ÛŠJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK™[YØ]ÜYˆOO]›ÚY	‰Š‹™[YØ]ÜYYK™[YØ]ÜYŠKKœÜ˜Õ˜[Y]ÜYˆOO]›ÚY	‰Š‹œÜ˜Õ˜[Y]ÜYYKœÜ˜Õ˜[Y]ÜYŠKK™Ý˜[Y]ÜYˆOO]›ÚY	‰Š‹™Ý˜[Y]ÜYYK™Ý˜[Y]ÜYŠKKœYÚ[˜][ÛˆOO]›ÚY	‰Š‹œYÚ[˜][ÛYKœYÚ[˜][ÛÓÙK”YÙT™\]Y\ÝÒ”ÓÓŠKœYÚ[˜][ÛŠN›ÚY
KŸKœ›ÛT\X[
J^Û]UŠ
NÜ™]\›ˆ‹™[YØ]ÜYYK™[YØ]ÜYÏÈˆ‹‹œÜ˜Õ˜[Y]ÜYYKœÜ˜Õ˜[Y]ÜYÏÈˆ‹‹™Ý˜[Y]ÜYYK™Ý˜[Y]ÜYÏÈˆ‹KœYÚ[˜][ÛˆOO]›ÚY	‰™KœYÚ[˜][ÛˆOO[[	‰Š‹œYÚ[˜][ÛSÙK”YÙT™\]Y\Ý™œ›ÛT\X[
KœYÚ[˜][ÛŠJKŸ_NÙ[˜Ý[Ûˆ“Š
^Ü™]\›žÜ™Y[YØ][Û”™\ÜÛœÙ\Î–×KYÚ[˜][ÛŽ›ÚY_\ÙK”]Y\žT™Y[YØ][ÛœÔ™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK”]Y\žT™Y[YØ][ÛœÔ™\ÜÛœÙH‹[˜ÛÙJKV‹š[˜\žUÜš]\‹˜Ü™X]J
J^Ù›ÜŠ]ÙˆKœ™Y[YØ][Û”™\ÜÛœÙ\Ê[YK”™Y[YØ][Û”™\ÜÛœÙK™[˜ÛÙJ‹Z[ÌŠL
K™›ÜšÊ
JK›[[J
NÜ™]\›ˆKœYÚ[˜][ÛˆOO]›ÚY	‰“ÙK”YÙT™\ÜÛœÙK™[˜ÛÙJKœYÚ[˜][Û‹‹Z[ÌŠN
K™›ÜšÊ
JK›[[J
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ‹š[˜\žT™XY\ÙN›™]È‹š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹R“Š
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹œ™Y[YØ][Û”™\ÜÛœÙ\Ëœ\Ú
YK”™Y[YØ][Û”™\ÜÛœÙK™XÛÙJZ[ÌŠ
JJNØœ™XZÎØØ\ÙHŽœ‹œYÚ[˜][ÛSÙK”YÙT™\ÜÛœÙK™XÛÙJZ[ÌŠ
JNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]R“Š
NÜ™]\›ˆ\œ˜^Kš\Ð\œ˜^JOËœ™Y[YØ][Û”™\ÜÛœÙ\ÊI‰Š‹œ™Y[YØ][Û”™\ÜÛœÙ\ÏYKœ™Y[YØ][Û”™\ÜÛœÙ\Ë›X\
O›YK”™Y[YØ][Û”™\ÜÛœÙK™œ›ÛR”ÓÓŠ
JJK
š\ÔÙ]
JKœYÚ[˜][ÛŠI‰Š‹œYÚ[˜][ÛSÙK”YÙT™\ÜÛœÙK™œ›ÛR”ÓÓŠKœYÚ[˜][ÛŠJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆKœ™Y[YØ][Û”™\ÜÛœÙ\ÏÛ‹œ™Y[YØ][Û”™\ÜÛœÙ\ÏYKœ™Y[YØ][Û”™\ÜÛœÙ\Ë›X\
OÛYK”™Y[YØ][Û”™\ÜÛœÙKÒ”ÓÓŠ
N›ÚY
N›‹œ™Y[YØ][Û”™\ÜÛœÙ\ÏV×KKœYÚ[˜][ÛˆOO]›ÚY	‰Š‹œYÚ[˜][ÛYKœYÚ[˜][ÛÓÙK”YÙT™\ÜÛœÙKÒ”ÓÓŠKœYÚ[˜][ÛŠN›ÚY
KŸKœ›ÛT\X[
J^Û]R“Š
NÜ™]\›ˆ‹œ™Y[YØ][Û”™\ÜÛœÙ\ÏYKœ™Y[YØ][Û”™\ÜÛœÙ\ÏË›X\
O›YK”™Y[YØ][Û”™\ÜÛœÙK™œ›ÛT\X[

J_×KKœYÚ[˜][ÛˆOO]›ÚY	‰™KœYÚ[˜][ÛˆOO[[	‰Š‹œYÚ[˜][ÛSÙK”YÙT™\ÜÛœÙK™œ›ÛT\X[
KœYÚ[˜][ÛŠJKŸ_NÙ[˜Ý[Ûˆ“Š
^Ü™]\›žÙ[YØ]ÜYŽˆˆ‹YÚ[˜][ÛŽ›ÚY_\ÙK”]Y\žQ[YØ]Ü•˜[Y]ÜœÔ™\]Y\Ý^Ý\U\›ˆ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK”]Y\žQ[YØ]Ü•˜[Y]ÜœÔ™\]Y\Ý‹[˜ÛÙJKV‹š[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK™[YØ]ÜYˆOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊK™[YØ]ÜYŠKKœYÚ[˜][ÛˆOO]›ÚY	‰“ÙK”YÙT™\]Y\Ý™[˜ÛÙJKœYÚ[˜][Û‹‹Z[ÌŠN
K™›ÜšÊ
JK›[[J
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ‹š[˜\žT™XY\ÙN›™]È‹š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹Q“Š
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹™[YØ]ÜY]œÝš[™Ê
NØœ™XZÎØØ\ÙHŽœ‹œYÚ[˜][ÛSÙK”YÙT™\]Y\Ý™XÛÙJZ[ÌŠ
JNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]Q“Š
NÜ™]\›Šš\ÔÙ]
JK™[YØ]ÜYŠI‰Š‹™[YØ]ÜYTÝš[™ÊK™[YØ]ÜYŠJK
š\ÔÙ]
JKœYÚ[˜][ÛŠI‰Š‹œYÚ[˜][ÛSÙK”YÙT™\]Y\Ý™œ›ÛR”ÓÓŠKœYÚ[˜][ÛŠJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK™[YØ]ÜYˆOO]›ÚY	‰Š‹™[YØ]ÜYYK™[YØ]ÜYŠKKœYÚ[˜][ÛˆOO]›ÚY	‰Š‹œYÚ[˜][ÛYKœYÚ[˜][ÛÓÙK”YÙT™\]Y\ÝÒ”ÓÓŠKœYÚ[˜][ÛŠN›ÚY
KŸKœ›ÛT\X[
J^Û]Q“Š
NÜ™]\›ˆ‹™[YØ]ÜYYK™[YØ]ÜYÏÈˆ‹KœYÚ[˜][ÛˆOO]›ÚY	‰™KœYÚ[˜][ÛˆOO[[	‰Š‹œYÚ[˜][ÛSÙK”YÙT™\]Y\Ý™œ›ÛT\X[
KœYÚ[˜][ÛŠJKŸ_NÙ[˜Ý[ÛˆSŠ
^Ü™]\›žÝ˜[Y]ÜœÎ–×KYÚ[˜][ÛŽ›ÚY_\ÙK”]Y\žQ[YØ]Ü•˜[Y]ÜœÔ™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK”]Y\žQ[YØ]Ü•˜[Y]ÜœÔ™\ÜÛœÙH‹[˜ÛÙJKV‹š[˜\žUÜš]\‹˜Ü™X]J
J^Ù›ÜŠ]ÙˆK˜[Y]ÜœÊ[YK•˜[Y]Ü‹™[˜ÛÙJ‹Z[ÌŠL
K™›ÜšÊ
JK›[[J
NÜ™]\›ˆKœYÚ[˜][ÛˆOO]›ÚY	‰“ÙK”YÙT™\ÜÛœÙK™[˜ÛÙJKœYÚ[˜][Û‹‹Z[ÌŠN
K™›ÜšÊ
JK›[[J
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ‹š[˜\žT™XY\ÙN›™]È‹š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹\SŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹˜[Y]ÜœËœ\Ú
YK•˜[Y]Ü‹™XÛÙJZ[ÌŠ
JJNØœ™XZÎØØ\ÙHŽœ‹œYÚ[˜][ÛSÙK”YÙT™\ÜÛœÙK™XÛÙJZ[ÌŠ
JNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]\SŠ
NÜ™]\›ˆ\œ˜^Kš\Ð\œ˜^JOË˜[Y]ÜœÊI‰Š‹˜[Y]ÜœÏYK˜[Y]ÜœË›X\
O›YK•˜[Y]Ü‹™œ›ÛR”ÓÓŠ
JJK
š\ÔÙ]
JKœYÚ[˜][ÛŠI‰Š‹œYÚ[˜][ÛSÙK”YÙT™\ÜÛœÙK™œ›ÛR”ÓÓŠKœYÚ[˜][ÛŠJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK˜[Y]ÜœÏÛ‹˜[Y]ÜœÏYK˜[Y]ÜœË›X\
OÛYK•˜[Y]Ü‹Ò”ÓÓŠ
N›ÚY
N›‹˜[Y]ÜœÏV×KKœYÚ[˜][ÛˆOO]›ÚY	‰Š‹œYÚ[˜][ÛYKœYÚ[˜][ÛÓÙK”YÙT™\ÜÛœÙKÒ”ÓÓŠKœYÚ[˜][ÛŠN›ÚY
KŸKœ›ÛT\X[
J^Û]\SŠ
NÜ™]\›ˆ‹˜[Y]ÜœÏYK˜[Y]ÜœÏË›X\
O›YK•˜[Y]Ü‹™œ›ÛT\X[

J_×KKœYÚ[˜][ÛˆOO]›ÚY	‰™KœYÚ[˜][ÛˆOO[[	‰Š‹œYÚ[˜][ÛSÙK”YÙT™\ÜÛœÙK™œ›ÛT\X[
KœYÚ[˜][ÛŠJKŸ_NÙ[˜Ý[ÛˆŠ
^Ü™]\›žÙ[YØ]ÜYŽˆˆ‹˜[Y]ÜYŽˆˆŸ_\ÙK”]Y\žQ[YØ]Ü•˜[Y]Ü”™\]Y\Ý^Ý\U\›ˆ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK”]Y\žQ[YØ]Ü•˜[Y]Ü”™\]Y\Ý‹[˜ÛÙJKV‹š[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK™[YØ]ÜYˆOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊK™[YØ]ÜYŠKK˜[Y]ÜYˆOOHˆ‰‰›‹Z[ÌŠN
KœÝš[™ÊK˜[Y]ÜYŠKŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ‹š[˜\žT™XY\ÙN›™]È‹š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹RŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹™[YØ]ÜY]œÝš[™Ê
NØœ™XZÎØØ\ÙHŽœ‹˜[Y]ÜY]œÝš[™Ê
NØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]RŠ
NÜ™]\›Šš\ÔÙ]
JK™[YØ]ÜYŠI‰Š‹™[YØ]ÜYTÝš[™ÊK™[YØ]ÜYŠJK
š\ÔÙ]
JK˜[Y]ÜYŠI‰Š‹˜[Y]ÜYTÝš[™ÊK˜[Y]ÜYŠJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK™[YØ]ÜYˆOO]›ÚY	‰Š‹™[YØ]ÜYYK™[YØ]ÜYŠKK˜[Y]ÜYˆOO]›ÚY	‰Š‹˜[Y]ÜYYK˜[Y]ÜYŠKŸKœ›ÛT\X[
J^Û]RŠ
NÜ™]\›ˆ‹™[YØ]ÜYYK™[YØ]ÜYÏÈˆ‹‹˜[Y]ÜYYK˜[Y]ÜYÏÈˆ‹Ÿ_NÙ[˜Ý[ÛˆSŠ
^Ü™]\›žÝ˜[Y]ÜŽ›YK•˜[Y]Ü‹™œ›ÛT\X[
ßJ__\ÙK”]Y\žQ[YØ]Ü•˜[Y]Ü”™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK”]Y\žQ[YØ]Ü•˜[Y]Ü”™\ÜÛœÙH‹[˜ÛÙJKV‹š[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK˜[Y]ÜˆOO]›ÚY	‰›YK•˜[Y]Ü‹™[˜ÛÙJK˜[Y]Ü‹‹Z[ÌŠL
K™›ÜšÊ
JK›[[J
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ‹š[˜\žT™XY\ÙN›™]È‹š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹SSŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÛÏŒÏOOLOÜ‹˜[Y]Ü[YK•˜[Y]Ü‹™XÛÙJZ[ÌŠ
JNœÚÚ\\JÉÊ_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]SSŠ
NÜ™]\›Šš\ÔÙ]
JK˜[Y]ÜŠI‰Š‹˜[Y]Ü[YK•˜[Y]Ü‹™œ›ÛR”ÓÓŠK˜[Y]ÜŠJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK˜[Y]ÜˆOO]›ÚY	‰Š‹˜[Y]ÜYK˜[Y]ÜÛYK•˜[Y]Ü‹Ò”ÓÓŠK˜[Y]ÜŠN›ÚY
KŸKœ›ÛT\X[
J^Û]SSŠ
NÜ™]\›ˆK˜[Y]ÜˆOO]›ÚY	‰™K˜[Y]ÜˆOO[[	‰Š‹˜[Y]Ü[YK•˜[Y]Ü‹™œ›ÛT\X[
K˜[Y]ÜŠJKŸ_NÙ[˜Ý[ÛˆÓŠ
^Ü™]\›žÚZYÚšYÒ[

__\ÙK”]Y\žR\ÝÜšXØ[[™›Ô™\]Y\Ý^Ý\U\›ˆ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK”]Y\žR\ÝÜšXØ[[™›Ô™\]Y\Ý‹[˜ÛÙJKV‹š[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆKšZYÚOOPšYÒ[

I‰›‹Z[ÌŠ
Kš[
KšZYÚ
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ‹š[˜\žT™XY\ÙN›™]È‹š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹WÓŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÛÏŒÏOOLOÜ‹šZYÚ]š[

NœÚÚ\\JÉÊ_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]WÓŠ
NÜ™]\›Šš\ÔÙ]
JKšZYÚ
I‰Š‹šZYÚPšYÒ[
KšZYÚÔÝš[™Ê
JJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆKšZYÚOO]›ÚY	‰Š‹šZYÚJKšZYÚšYÒ[

JKÔÝš[™Ê
JKŸKœ›ÛT\X[
J^Û]WÓŠ
NÜ™]\›ˆKšZYÚOO]›ÚY	‰™KšZYÚOO[[	‰Š‹šZYÚPšYÒ[
KšZYÚÔÝš[™Ê
JJKŸ_NÙ[˜Ý[ÛˆÓŠ
^Ü™]\›žÚ\Ý›ÚY_\ÙK”]Y\žR\ÝÜšXØ[[™›Ô™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK”]Y\žR\ÝÜšXØ[[™›Ô™\ÜÛœÙH‹[˜ÛÙJKV‹š[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆKš\ÝOO]›ÚY	‰›YK’\ÝÜšXØ[[™›Ë™[˜ÛÙJKš\Ý‹Z[ÌŠL
K™›ÜšÊ
JK›[[J
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ‹š[˜\žT™XY\ÙN›™]È‹š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹QÓŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÛÏŒÏOOLOÜ‹š\Ý[YK’\ÝÜšXØ[[™›Ë™XÛÙJZ[ÌŠ
JNœÚÚ\\JÉÊ_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]QÓŠ
NÜ™]\›Šš\ÔÙ]
JKš\Ý
I‰Š‹š\Ý[YK’\ÝÜšXØ[[™›Ë™œ›ÛR”ÓÓŠKš\Ý
JKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆKš\ÝOO]›ÚY	‰Š‹š\ÝYKš\ÝÛYK’\ÝÜšXØ[[™›ËÒ”ÓÓŠKš\Ý
N›ÚY
KŸKœ›ÛT\X[
J^Û]QÓŠ
NÜ™]\›ˆKš\ÝOO]›ÚY	‰™Kš\ÝOO[[	‰Š‹š\Ý[YK’\ÝÜšXØ[[™›Ë™œ›ÛT\X[
Kš\Ý
JKŸ_NÙ[˜Ý[Ûˆ“Š
^Ü™]\›žß_\ÙK”]Y\žTÛÛ™\]Y\Ý^Ý\U\›ˆ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK”]Y\žTÛÛ™\]Y\Ý‹[˜ÛÙJKV‹š[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ‹š[˜\žT™XY\ÙN›™]È‹š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹U“Š
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Ü™]\›ˆ“Š
_KÒ”ÓÓŠJ^Ü™]\›žß_Kœ›ÛT\X[
J^Ü™]\›ˆ“Š
__NÙ[˜Ý[ÛˆÓŠ
^Ü™]\›žÜÛÛ›YK”ÛÛ™œ›ÛT\X[
ßJ__\ÙK”]Y\žTÛÛ™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK”]Y\žTÛÛ™\ÜÛœÙH‹[˜ÛÙJKV‹š[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆKœÛÛOO]›ÚY	‰›YK”ÛÛ™[˜ÛÙJKœÛÛ‹Z[ÌŠL
K™›ÜšÊ
JK›[[J
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ‹š[˜\žT™XY\ÙN›™]È‹š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹RÓŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÛÏŒÏOOLOÜ‹œÛÛ[YK”ÛÛ™XÛÙJZ[ÌŠ
JNœÚÚ\\JÉÊ_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]RÓŠ
NÜ™]\›Šš\ÔÙ]
JKœÛÛ
I‰Š‹œÛÛ[YK”ÛÛ™œ›ÛR”ÓÓŠKœÛÛ
JKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆKœÛÛOO]›ÚY	‰Š‹œÛÛYKœÛÛÛYK”ÛÛÒ”ÓÓŠKœÛÛ
N›ÚY
KŸKœ›ÛT\X[
J^Û]RÓŠ
NÜ™]\›ˆKœÛÛOO]›ÚY	‰™KœÛÛOO[[	‰Š‹œÛÛ[YK”ÛÛ™œ›ÛT\X[
KœÛÛ
JKŸ_NÙ[˜Ý[ÛˆÓŠ
^Ü™]\›žß_\ÙK”]Y\žT\˜[\Ô™\]Y\Ý^Ý\U\›ˆ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK”]Y\žT\˜[\Ô™\]Y\Ý‹[˜ÛÙJKV‹š[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ‹š[˜\žT™XY\ÙN›™]È‹š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹UÓŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Ü™]\›ˆÓŠ
_KÒ”ÓÓŠJ^Ü™]\›žß_Kœ›ÛT\X[
J^Ü™]\›ˆÓŠ
__NÙ[˜Ý[ÛˆŠ
^Ü™]\›žÜ\˜[\Î›YK”\˜[\Ë™œ›ÛT\X[
ßJ__\ÙK”]Y\žT\˜[\Ô™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK”]Y\žT\˜[\Ô™\ÜÛœÙH‹[˜ÛÙJKV‹š[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆKœ\˜[\ÈOO]›ÚY	‰›YK”\˜[\Ë™[˜ÛÙJKœ\˜[\Ë‹Z[ÌŠL
K™›ÜšÊ
JK›[[J
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ‹š[˜\žT™XY\ÙN›™]È‹š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹SŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÛÏŒÏOOLOÜ‹œ\˜[\Ï[YK”\˜[\Ë™XÛÙJZ[ÌŠ
JNœÚÚ\\JÉÊ_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]SŠ
NÜ™]\›Šš\ÔÙ]
JKœ\˜[\ÊI‰Š‹œ\˜[\Ï[YK”\˜[\Ë™œ›ÛR”ÓÓŠKœ\˜[\ÊJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆKœ\˜[\ÈOO]›ÚY	‰Š‹œ\˜[\ÏYKœ\˜[\ÏÛYK”\˜[\ËÒ”ÓÓŠKœ\˜[\ÊN›ÚY
KŸKœ›ÛT\X[
J^Û]SŠ
NÜ™]\›ˆKœ\˜[\ÈOO]›ÚY	‰™Kœ\˜[\ÈOO[[	‰Š‹œ\˜[\Ï[YK”\˜[\Ë™œ›ÛT\X[
Kœ\˜[\ÊJKŸ_NÝ˜\ˆSXÛ\ÜÞÜœÎØÛÛœÝXÝÜŠŠ^Ý\ËœœÏ[‹\Ë•˜[Y]ÜœÏ]\Ë•˜[Y]ÜœË˜š[™
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
\Ê_U˜[Y]ÜœÊŠ^Û]\ÙK”]Y\žU˜[Y]ÜœÔ™\]Y\Ý™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK”]Y\žH‹•˜[Y]ÜœÈ‹
K[ŠOœÙK”]Y\žU˜[Y]ÜœÔ™\ÜÛœÙK™XÛÙJ™]È‹š[˜\žT™XY\ŠŠJJ_U˜[Y]ÜŠŠ^Û]\ÙK”]Y\žU˜[Y]Ü”™\]Y\Ý™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK”]Y\žH‹•˜[Y]Üˆ‹
K[ŠOœÙK”]Y\žU˜[Y]Ü”™\ÜÛœÙK™XÛÙJ™]È‹š[˜\žT™XY\ŠŠJJ_U˜[Y]Ü‘[YØ][ÛœÊŠ^Û]\ÙK”]Y\žU˜[Y]Ü‘[YØ][ÛœÔ™\]Y\Ý™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK”]Y\žH‹•˜[Y]Ü‘[YØ][ÛœÈ‹
K[ŠOœÙK”]Y\žU˜[Y]Ü‘[YØ][ÛœÔ™\ÜÛœÙK™XÛÙJ™]È‹š[˜\žT™XY\ŠŠJJ_U˜[Y]Ü•[˜›Û™[™Ñ[YØ][ÛœÊŠ^Û]\ÙK”]Y\žU˜[Y]Ü•[˜›Û™[™Ñ[YØ][ÛœÔ™\]Y\Ý™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK”]Y\žH‹•˜[Y]Ü•[˜›Û™[™Ñ[YØ][ÛœÈ‹
K[ŠOœÙK”]Y\žU˜[Y]Ü•[˜›Û™[™Ñ[YØ][ÛœÔ™\ÜÛœÙK™XÛÙJ™]È‹š[˜\žT™XY\ŠŠJJ_Q[YØ][ÛŠŠ^Û]\ÙK”]Y\žQ[YØ][Û”™\]Y\Ý™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK”]Y\žH‹‘[YØ][Ûˆ‹
K[ŠOœÙK”]Y\žQ[YØ][Û”™\ÜÛœÙK™XÛÙJ™]È‹š[˜\žT™XY\ŠŠJJ_U[˜›Û™[™Ñ[YØ][ÛŠŠ^Û]\ÙK”]Y\žU[˜›Û™[™Ñ[YØ][Û”™\]Y\Ý™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK”]Y\žH‹•[˜›Û™[™Ñ[YØ][Ûˆ‹
K[ŠOœÙK”]Y\žU[˜›Û™[™Ñ[YØ][Û”™\ÜÛœÙK™XÛÙJ™]È‹š[˜\žT™XY\ŠŠJJ_Q[YØ]Ü‘[YØ][ÛœÊŠ^Û]\ÙK”]Y\žQ[YØ]Ü‘[YØ][ÛœÔ™\]Y\Ý™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK”]Y\žH‹‘[YØ]Ü‘[YØ][ÛœÈ‹
K[ŠOœÙK”]Y\žQ[YØ]Ü‘[YØ][ÛœÔ™\ÜÛœÙK™XÛÙJ™]È‹š[˜\žT™XY\ŠŠJJ_Q[YØ]Ü•[˜›Û™[™Ñ[YØ][ÛœÊŠ^Û]\ÙK”]Y\žQ[YØ]Ü•[˜›Û™[™Ñ[YØ][ÛœÔ™\]Y\Ý™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK”]Y\žH‹‘[YØ]Ü•[˜›Û™[™Ñ[YØ][ÛœÈ‹
K[ŠOœÙK”]Y\žQ[YØ]Ü•[˜›Û™[™Ñ[YØ][ÛœÔ™\ÜÛœÙK™XÛÙJ™]È‹š[˜\žT™XY\ŠŠJJ_T™Y[YØ][ÛœÊŠ^Û]\ÙK”]Y\žT™Y[YØ][ÛœÔ™\]Y\Ý™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK”]Y\žH‹”™Y[YØ][ÛœÈ‹
K[ŠOœÙK”]Y\žT™Y[YØ][ÛœÔ™\ÜÛœÙK™XÛÙJ™]È‹š[˜\žT™XY\ŠŠJJ_Q[YØ]Ü•˜[Y]ÜœÊŠ^Û]\ÙK”]Y\žQ[YØ]Ü•˜[Y]ÜœÔ™\]Y\Ý™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK”]Y\žH‹‘[YØ]Ü•˜[Y]ÜœÈ‹
K[ŠOœÙK”]Y\žQ[YØ]Ü•˜[Y]ÜœÔ™\ÜÛœÙK™XÛÙJ™]È‹š[˜\žT™XY\ŠŠJJ_Q[YØ]Ü•˜[Y]ÜŠŠ^Û]\ÙK”]Y\žQ[YØ]Ü•˜[Y]Ü”™\]Y\Ý™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK”]Y\žH‹‘[YØ]Ü•˜[Y]Üˆ‹
K[ŠOœÙK”]Y\žQ[YØ]Ü•˜[Y]Ü”™\ÜÛœÙK™XÛÙJ™]È‹š[˜\žT™XY\ŠŠJJ_R\ÝÜšXØ[[™›ÊŠ^Û]\ÙK”]Y\žR\ÝÜšXØ[[™›Ô™\]Y\Ý™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK”]Y\žH‹’\ÝÜšXØ[[™›È‹
K[ŠOœÙK”]Y\žR\ÝÜšXØ[[™›Ô™\ÜÛœÙK™XÛÙJ™]È‹š[˜\žT™XY\ŠŠJJ_TÛÛ
^ßJ^Û]\ÙK”]Y\žTÛÛ™\]Y\Ý™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK”]Y\žH‹”ÛÛ‹
K[ŠOœÙK”]Y\žTÛÛ™\ÜÛœÙK™XÛÙJ™]È‹š[˜\žT™XY\ŠŠJJ_T\˜[\Ê^ßJ^Û]\ÙK”]Y\žT\˜[\Ô™\]Y\Ý™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK”]Y\žH‹”\˜[\È‹
K[ŠOœÙK”]Y\žT\˜[\Ô™\ÜÛœÙK™XÛÙJ™]È‹š[˜\žT™XY\ŠŠJJ__NÜÙK”]Y\žPÛY[[\VSŸJNÝ˜\ˆÓORJ“OžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\J“‹—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÞ“‹œÙ]\ÝZÚ[™Ñ^[œÚ[ÛUVÝ˜\ˆY“J
KØÏY›Ê
NÙ[˜Ý[ÛˆV
J^Û]JØË˜Ü™X]T›ÝØY”œÐÛY[
JJK[™]È”]Y\žPÛY[[\
ŠNÜ™]\›žÜÝZÚ[™ÎžÙ[YØ][ÛŽ˜\Þ[˜ÊKŠOO˜]ØZ]‘[YØ][ÛŠÙ[YØ]ÜYŽšK˜[Y]ÜYŽœŸJK[YØ]Ü‘[YØ][ÛœÎ˜\Þ[˜ÊKŠOO˜]ØZ]‘[YØ]Ü‘[YØ][ÛœÊÙ[YØ]ÜYŽšKYÚ[˜][ÛŽŠØË˜Ü™X]TYÚ[˜][ÛŠJŠ_JK[YØ]Ü•[˜›Û™[™Ñ[YØ][ÛœÎ˜\Þ[˜ÊKŠOO˜]ØZ]‘[YØ]Ü•[˜›Û™[™Ñ[YØ][ÛœÊÙ[YØ]ÜYŽšKYÚ[˜][ÛŽŠØË˜Ü™X]TYÚ[˜][ÛŠJŠ_JK[YØ]Ü•˜[Y]ÜŽ˜\Þ[˜ÊKŠOO˜]ØZ]‘[YØ]Ü•˜[Y]ÜŠÙ[YØ]ÜYŽšK˜[Y]ÜYŽœŸJK[YØ]Ü•˜[Y]ÜœÎ˜\Þ[˜ÊKŠOO˜]ØZ]‘[YØ]Ü•˜[Y]ÜœÊÙ[YØ]ÜYŽšKYÚ[˜][ÛŽŠØË˜Ü™X]TYÚ[˜][ÛŠJŠ_JK\ÝÜšXØ[[™›Î˜\Þ[˜ÈOO˜]ØZ]’\ÝÜšXØ[[™›ÊÚZYÚšYÒ[
J_JK\˜[\Î˜\Þ[˜Ê
OO˜]ØZ]”\˜[\ÊßJKÛÛ˜\Þ[˜Ê
OO˜]ØZ]”ÛÛ
ßJK™Y[YØ][ÛœÎ˜\Þ[˜ÊK‹ËJOO˜]ØZ]”™Y[YØ][ÛœÊÙ[YØ]ÜYŽšKÜ˜Õ˜[Y]ÜYŽœ‹Ý˜[Y]ÜYŽ›ËYÚ[˜][ÛŽŠØË˜Ü™X]TYÚ[˜][ÛŠJJ_JK[˜›Û™[™Ñ[YØ][ÛŽ˜\Þ[˜ÊKŠOO˜]ØZ]•[˜›Û™[™Ñ[YØ][ÛŠÙ[YØ]ÜYŽšK˜[Y]ÜYŽœŸJK˜[Y]ÜŽ˜\Þ[˜ÈOO˜]ØZ]•˜[Y]ÜŠÝ˜[Y]ÜYŽš_JK˜[Y]Ü‘[YØ][ÛœÎ˜\Þ[˜ÊKŠOO˜]ØZ]•˜[Y]Ü‘[YØ][ÛœÊÝ˜[Y]ÜYŽšKYÚ[˜][ÛŽŠØË˜Ü™X]TYÚ[˜][ÛŠJŠ_JK˜[Y]ÜœÎ˜\Þ[˜ÊKŠOO˜]ØZ]•˜[Y]ÜœÊÜÝ]\ÎšKYÚ[˜][ÛŽŠØË˜Ü™X]TYÚ[˜][ÛŠJŠ_JK˜[Y]Ü•[˜›Û™[™Ñ[YØ][ÛœÎ˜\Þ[˜ÊKŠOO˜]ØZ]•˜[Y]Ü•[˜›Û™[™Ñ[YØ][ÛœÊÝ˜[Y]ÜYŽšKYÚ[˜][ÛŽŠØË˜Ü™X]TYÚ[˜][ÛŠJŠ_J____JNÝ˜\ˆORJOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\J—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÞ‘]šY[˜ÙS\Ý^“YÚÛY[]XÚÑ]šY[˜ÙO^‘\XØ]U›ÝQ]šY[˜ÙO^‘]šY[˜ÙO^œ›ÝØY”XÚØYÙO]›ÚYÝ˜\ˆÛÏ]J
KXÏ\ZJ
KYÏU™Š
KOPÙJ
K[ÏQYJ
NÞœ›ÝØY”XÚØYÙOH[™\›Z[\\ÈŽÙ[˜Ý[Ûˆ“Š
^Ü™]\›žÙ\XØ]U›ÝQ]šY[˜ÙN›ÚYYÚÛY[]XÚÑ]šY[˜ÙN›ÚY_^‘]šY[˜ÙO^Ý\U\›ˆ‹Ý[™\›Z[\\Ë‘]šY[˜ÙH‹[˜ÛÙJK^Kš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK™\XØ]U›ÝQ]šY[˜ÙHOO]›ÚY	‰ž‘\XØ]U›ÝQ]šY[˜ÙK™[˜ÛÙJK™\XØ]U›ÝQ]šY[˜ÙK‹Z[ÌŠL
K™›ÜšÊ
JK›[[J
KK›YÚÛY[]XÚÑ]šY[˜ÙHOO]›ÚY	‰ž“YÚÛY[]XÚÑ]šY[˜ÙK™[˜ÛÙJK›YÚÛY[]XÚÑ]šY[˜ÙK‹Z[ÌŠN
K™›ÜšÊ
JK›[[J
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆKš[˜\žT™XY\ÙN›™]ÈKš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹V“Š
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹™\XØ]U›ÝQ]šY[˜ÙO^‘\XØ]U›ÝQ]šY[˜ÙK™XÛÙJZ[ÌŠ
JNØœ™XZÎØØ\ÙHŽœ‹›YÚÛY[]XÚÑ]šY[˜ÙO^“YÚÛY[]XÚÑ]šY[˜ÙK™XÛÙJZ[ÌŠ
JNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]V“Š
NÜ™]\›Š[Ëš\ÔÙ]
JK™\XØ]U›ÝQ]šY[˜ÙJI‰Š‹™\XØ]U›ÝQ]šY[˜ÙO^‘\XØ]U›ÝQ]šY[˜ÙK™œ›ÛR”ÓÓŠK™\XØ]U›ÝQ]šY[˜ÙJJK
[Ëš\ÔÙ]
JK›YÚÛY[]XÚÑ]šY[˜ÙJI‰Š‹›YÚÛY[]XÚÑ]šY[˜ÙO^“YÚÛY[]XÚÑ]šY[˜ÙK™œ›ÛR”ÓÓŠK›YÚÛY[]XÚÑ]šY[˜ÙJJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK™\XØ]U›ÝQ]šY[˜ÙHOO]›ÚY	‰Š‹™\XØ]U›ÝQ]šY[˜ÙOYK™\XØ]U›ÝQ]šY[˜ÙOÞ‘\XØ]U›ÝQ]šY[˜ÙKÒ”ÓÓŠK™\XØ]U›ÝQ]šY[˜ÙJN›ÚY
KK›YÚÛY[]XÚÑ]šY[˜ÙHOO]›ÚY	‰Š‹›YÚÛY[]XÚÑ]šY[˜ÙOYK›YÚÛY[]XÚÑ]šY[˜ÙOÞ“YÚÛY[]XÚÑ]šY[˜ÙKÒ”ÓÓŠK›YÚÛY[]XÚÑ]šY[˜ÙJN›ÚY
KŸKœ›ÛT\X[
J^Û]V“Š
NÜ™]\›ˆK™\XØ]U›ÝQ]šY[˜ÙHOO]›ÚY	‰™K™\XØ]U›ÝQ]šY[˜ÙHOO[[	‰Š‹™\XØ]U›ÝQ]šY[˜ÙO^‘\XØ]U›ÝQ]šY[˜ÙK™œ›ÛT\X[
K™\XØ]U›ÝQ]šY[˜ÙJJKK›YÚÛY[]XÚÑ]šY[˜ÙHOO]›ÚY	‰™K›YÚÛY[]XÚÑ]šY[˜ÙHOO[[	‰Š‹›YÚÛY[]XÚÑ]šY[˜ÙO^“YÚÛY[]XÚÑ]šY[˜ÙK™œ›ÛT\X[
K›YÚÛY[]XÚÑ]šY[˜ÙJJKŸ_NÙ[˜Ý[ÛˆŠ
^Ü™]\›žÝ›ÝPN›ÚY›ÝPŽ›ÚYÝ[›Ý[™ÔÝÙ\ŽšYÒ[

K˜[Y]Ü”ÝÙ\ŽšYÒ[

K[Y\Ý[\‘XË•[Y\Ý[\™œ›ÛT\X[
ßJ__^‘\XØ]U›ÝQ]šY[˜ÙO^Ý\U\›ˆ‹Ý[™\›Z[\\Ë‘\XØ]U›ÝQ]šY[˜ÙH‹[˜ÛÙJK^Kš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK›ÝPHOO]›ÚY	‰šÛË•›ÝK™[˜ÛÙJK›ÝPK‹Z[ÌŠL
K™›ÜšÊ
JK›[[J
KK›ÝPˆOO]›ÚY	‰šÛË•›ÝK™[˜ÛÙJK›ÝP‹‹Z[ÌŠN
K™›ÜšÊ
JK›[[J
KKÝ[›Ý[™ÔÝÙ\ˆOOPšYÒ[

I‰›‹Z[ÌŠ
Kš[
KÝ[›Ý[™ÔÝÙ\ŠKK˜[Y]Ü”ÝÙ\ˆOOPšYÒ[

I‰›‹Z[ÌŠÌŠKš[
K˜[Y]Ü”ÝÙ\ŠKK[Y\Ý[\OO]›ÚY	‰‘XË•[Y\Ý[\™[˜ÛÙJK[Y\Ý[\‹Z[ÌŠŠK™›ÜšÊ
JK›[[J
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆKš[˜\žT™XY\ÙN›™]ÈKš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹VŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹›ÝPOZÛË•›ÝK™XÛÙJZ[ÌŠ
JNØœ™XZÎØØ\ÙHŽœ‹›ÝPZÛË•›ÝK™XÛÙJZ[ÌŠ
JNØœ™XZÎØØ\ÙHÎœ‹Ý[›Ý[™ÔÝÙ\]š[

NØœ™XZÎØØ\ÙHœ‹˜[Y]Ü”ÝÙ\]š[

NØœ™XZÎØØ\ÙHNœ‹[Y\Ý[\QXË•[Y\Ý[\™XÛÙJZ[ÌŠ
JNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]VŠ
NÜ™]\›Š[Ëš\ÔÙ]
JK›ÝPJI‰Š‹›ÝPOZÛË•›ÝK™œ›ÛR”ÓÓŠK›ÝPJJK
[Ëš\ÔÙ]
JK›ÝPŠI‰Š‹›ÝPZÛË•›ÝK™œ›ÛR”ÓÓŠK›ÝPŠJK
[Ëš\ÔÙ]
JKÝ[›Ý[™ÔÝÙ\ŠI‰Š‹Ý[›Ý[™ÔÝÙ\PšYÒ[
KÝ[›Ý[™ÔÝÙ\‹ÔÝš[™Ê
JJK
[Ëš\ÔÙ]
JK˜[Y]Ü”ÝÙ\ŠI‰Š‹˜[Y]Ü”ÝÙ\PšYÒ[
K˜[Y]Ü”ÝÙ\‹ÔÝš[™Ê
JJK
[Ëš\ÔÙ]
JK[Y\Ý[\
I‰Š‹[Y\Ý[\J[Ë™œ›ÛRœÛÛ•[Y\Ý[\
JK[Y\Ý[\
JKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK›ÝPHOO]›ÚY	‰Š‹›ÝPOYK›ÝPOÚÛË•›ÝKÒ”ÓÓŠK›ÝPJN›ÚY
KK›ÝPˆOO]›ÚY	‰Š‹›ÝPYK›ÝPÚÛË•›ÝKÒ”ÓÓŠK›ÝPŠN›ÚY
KKÝ[›Ý[™ÔÝÙ\ˆOO]›ÚY	‰Š‹Ý[›Ý[™ÔÝÙ\JKÝ[›Ý[™ÔÝÙ\ŸšYÒ[

JKÔÝš[™Ê
JKK˜[Y]Ü”ÝÙ\ˆOO]›ÚY	‰Š‹˜[Y]Ü”ÝÙ\JK˜[Y]Ü”ÝÙ\ŸšYÒ[

JKÔÝš[™Ê
JKK[Y\Ý[\OO]›ÚY	‰Š‹[Y\Ý[\J[Ë™œ›ÛU[Y\Ý[\
JK[Y\Ý[\
KÒTÓÔÝš[™Ê
JKŸKœ›ÛT\X[
J^Û]VŠ
NÜ™]\›ˆK›ÝPHOO]›ÚY	‰™K›ÝPHOO[[	‰Š‹›ÝPOZÛË•›ÝK™œ›ÛT\X[
K›ÝPJJKK›ÝPˆOO]›ÚY	‰™K›ÝPˆOO[[	‰Š‹›ÝPZÛË•›ÝK™œ›ÛT\X[
K›ÝPŠJKKÝ[›Ý[™ÔÝÙ\ˆOO]›ÚY	‰™KÝ[›Ý[™ÔÝÙ\ˆOO[[	‰Š‹Ý[›Ý[™ÔÝÙ\PšYÒ[
KÝ[›Ý[™ÔÝÙ\‹ÔÝš[™Ê
JJKK˜[Y]Ü”ÝÙ\ˆOO]›ÚY	‰™K˜[Y]Ü”ÝÙ\ˆOO[[	‰Š‹˜[Y]Ü”ÝÙ\PšYÒ[
K˜[Y]Ü”ÝÙ\‹ÔÝš[™Ê
JJKK[Y\Ý[\OO]›ÚY	‰™K[Y\Ý[\OO[[	‰Š‹[Y\Ý[\QXË•[Y\Ý[\™œ›ÛT\X[
K[Y\Ý[\
JKŸ_NÙ[˜Ý[Ûˆ	Š
^Ü™]\›žØÛÛ™›XÝ[™Ð›ØÚÎ›ÚYÛÛ[[Û’ZYÚšYÒ[

Kž^˜[[™U˜[Y]ÜœÎ–×KÝ[›Ý[™ÔÝÙ\ŽšYÒ[

K[Y\Ý[\‘XË•[Y\Ý[\™œ›ÛT\X[
ßJ__^“YÚÛY[]XÚÑ]šY[˜ÙO^Ý\U\›ˆ‹Ý[™\›Z[\\Ë“YÚÛY[]XÚÑ]šY[˜ÙH‹[˜ÛÙJK^Kš[˜\žUÜš]\‹˜Ü™X]J
J^ÙK˜ÛÛ™›XÝ[™Ð›ØÚÈOO]›ÚY	‰šÛË“YÚ›ØÚË™[˜ÛÙJK˜ÛÛ™›XÝ[™Ð›ØÚË‹Z[ÌŠL
K™›ÜšÊ
JK›[[J
KK˜ÛÛ[[Û’ZYÚOOPšYÒ[

I‰›‹Z[ÌŠMŠKš[
K˜ÛÛ[[Û’ZYÚ
NÙ›ÜŠ]ÙˆK˜ž^˜[[™U˜[Y]ÜœÊYYË•˜[Y]Ü‹™[˜ÛÙJ‹Z[ÌŠŠK™›ÜšÊ
JK›[[J
NÜ™]\›ˆKÝ[›Ý[™ÔÝÙ\ˆOOPšYÒ[

I‰›‹Z[ÌŠÌŠKš[
KÝ[›Ý[™ÔÝÙ\ŠKK[Y\Ý[\OO]›ÚY	‰‘XË•[Y\Ý[\™[˜ÛÙJK[Y\Ý[\‹Z[ÌŠŠK™›ÜšÊ
JK›[[J
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆKš[˜\žT™XY\ÙN›™]ÈKš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹IŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹˜ÛÛ™›XÝ[™Ð›ØÚÏZÛË“YÚ›ØÚË™XÛÙJZ[ÌŠ
JNØœ™XZÎØØ\ÙHŽœ‹˜ÛÛ[[Û’ZYÚ]š[

NØœ™XZÎØØ\ÙHÎœ‹˜ž^˜[[™U˜[Y]ÜœËœ\Ú
YË•˜[Y]Ü‹™XÛÙJZ[ÌŠ
JJNØœ™XZÎØØ\ÙHœ‹Ý[›Ý[™ÔÝÙ\]š[

NØœ™XZÎØØ\ÙHNœ‹[Y\Ý[\QXË•[Y\Ý[\™XÛÙJZ[ÌŠ
JNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]IŠ
NÜ™]\›Š[Ëš\ÔÙ]
JK˜ÛÛ™›XÝ[™Ð›ØÚÊI‰Š‹˜ÛÛ™›XÝ[™Ð›ØÚÏZÛË“YÚ›ØÚË™œ›ÛR”ÓÓŠK˜ÛÛ™›XÝ[™Ð›ØÚÊJK
[Ëš\ÔÙ]
JK˜ÛÛ[[Û’ZYÚ
I‰Š‹˜ÛÛ[[Û’ZYÚPšYÒ[
K˜ÛÛ[[Û’ZYÚÔÝš[™Ê
JJK\œ˜^Kš\Ð\œ˜^JOË˜ž^˜[[™U˜[Y]ÜœÊI‰Š‹˜ž^˜[[™U˜[Y]ÜœÏYK˜ž^˜[[™U˜[Y]ÜœË›X\
O™YË•˜[Y]Ü‹™œ›ÛR”ÓÓŠ
JJK
[Ëš\ÔÙ]
JKÝ[›Ý[™ÔÝÙ\ŠI‰Š‹Ý[›Ý[™ÔÝÙ\PšYÒ[
KÝ[›Ý[™ÔÝÙ\‹ÔÝš[™Ê
JJK
[Ëš\ÔÙ]
JK[Y\Ý[\
I‰Š‹[Y\Ý[\J[Ë™œ›ÛRœÛÛ•[Y\Ý[\
JK[Y\Ý[\
JKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK˜ÛÛ™›XÝ[™Ð›ØÚÈOO]›ÚY	‰Š‹˜ÛÛ™›XÝ[™Ð›ØÚÏYK˜ÛÛ™›XÝ[™Ð›ØÚÏÚÛË“YÚ›ØÚËÒ”ÓÓŠK˜ÛÛ™›XÝ[™Ð›ØÚÊN›ÚY
KK˜ÛÛ[[Û’ZYÚOO]›ÚY	‰Š‹˜ÛÛ[[Û’ZYÚJK˜ÛÛ[[Û’ZYÚšYÒ[

JKÔÝš[™Ê
JKK˜ž^˜[[™U˜[Y]ÜœÏÛ‹˜ž^˜[[™U˜[Y]ÜœÏYK˜ž^˜[[™U˜[Y]ÜœË›X\
OÙYË•˜[Y]Ü‹Ò”ÓÓŠ
N›ÚY
N›‹˜ž^˜[[™U˜[Y]ÜœÏV×KKÝ[›Ý[™ÔÝÙ\ˆOO]›ÚY	‰Š‹Ý[›Ý[™ÔÝÙ\JKÝ[›Ý[™ÔÝÙ\ŸšYÒ[

JKÔÝš[™Ê
JKK[Y\Ý[\OO]›ÚY	‰Š‹[Y\Ý[\J[Ë™œ›ÛU[Y\Ý[\
JK[Y\Ý[\
KÒTÓÔÝš[™Ê
JKŸKœ›ÛT\X[
J^Û]IŠ
NÜ™]\›ˆK˜ÛÛ™›XÝ[™Ð›ØÚÈOO]›ÚY	‰™K˜ÛÛ™›XÝ[™Ð›ØÚÈOO[[	‰Š‹˜ÛÛ™›XÝ[™Ð›ØÚÏZÛË“YÚ›ØÚË™œ›ÛT\X[
K˜ÛÛ™›XÝ[™Ð›ØÚÊJKK˜ÛÛ[[Û’ZYÚOO]›ÚY	‰™K˜ÛÛ[[Û’ZYÚOO[[	‰Š‹˜ÛÛ[[Û’ZYÚPšYÒ[
K˜ÛÛ[[Û’ZYÚÔÝš[™Ê
JJK‹˜ž^˜[[™U˜[Y]ÜœÏYK˜ž^˜[[™U˜[Y]ÜœÏË›X\
O™YË•˜[Y]Ü‹™œ›ÛT\X[

J_×KKÝ[›Ý[™ÔÝÙ\ˆOO]›ÚY	‰™KÝ[›Ý[™ÔÝÙ\ˆOO[[	‰Š‹Ý[›Ý[™ÔÝÙ\PšYÒ[
KÝ[›Ý[™ÔÝÙ\‹ÔÝš[™Ê
JJKK[Y\Ý[\OO]›ÚY	‰™K[Y\Ý[\OO[[	‰Š‹[Y\Ý[\QXË•[Y\Ý[\™œ›ÛT\X[
K[Y\Ý[\
JKŸ_NÙ[˜Ý[Ûˆ“Š
^Ü™]\›žÙ]šY[˜ÙN–×__^‘]šY[˜ÙS\Ý^Ý\U\›ˆ‹Ý[™\›Z[\\Ë‘]šY[˜ÙS\Ý‹[˜ÛÙJK^Kš[˜\žUÜš]\‹˜Ü™X]J
J^Ù›ÜŠ]ÙˆK™]šY[˜ÙJ^‘]šY[˜ÙK™[˜ÛÙJ‹Z[ÌŠL
K™›ÜšÊ
JK›[[J
NÜ™]\›ˆŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆKš[˜\žT™XY\ÙN›™]ÈKš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹Z“Š
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÛÏŒÏOOLOÜ‹™]šY[˜ÙKœ\Ú
‘]šY[˜ÙK™XÛÙJZ[ÌŠ
JJNœÚÚ\\JÉÊ_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]Z“Š
NÜ™]\›ˆ\œ˜^Kš\Ð\œ˜^JOË™]šY[˜ÙJI‰Š‹™]šY[˜ÙOYK™]šY[˜ÙK›X\
Ož‘]šY[˜ÙK™œ›ÛR”ÓÓŠ
JJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK™]šY[˜ÙOÛ‹™]šY[˜ÙOYK™]šY[˜ÙK›X\
OÞ‘]šY[˜ÙKÒ”ÓÓŠ
N›ÚY
N›‹™]šY[˜ÙOV×KŸKœ›ÛT\X[
J^Û]Z“Š
NÜ™]\›ˆ‹™]šY[˜ÙOYK™]šY[˜ÙOË›X\
Ož‘]šY[˜ÙK™œ›ÛT\X[

J_×KŸ__JNÝ˜\ˆRJOOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\JK—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÕK›ØÚÏUKœ›ÝØY”XÚØYÙO]›ÚYÝ˜\ˆO]J
KÐO\J
K]PÙJ
KZQYJ
NÕKœ›ÝØY”XÚØYÙOH[™\›Z[\\ÈŽÙ[˜Ý[ÛˆŠ
^Ü™]\›žÚXY\Ž•K’XY\‹™œ›ÛT\X[
ßJK]N•K‘]K™œ›ÛT\X[
ßJK]šY[˜ÙN‘ÐK‘]šY[˜ÙS\Ý™œ›ÛT\X[
ßJK\ÝÛÛ[Z]›ÚY_UK›ØÚÏ^Ý\U\›ˆ‹Ý[™\›Z[\\Ë›ØÚÈ‹[˜ÛÙJKY]‹š[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆKšXY\ˆOO]›ÚY	‰•K’XY\‹™[˜ÛÙJKšXY\‹‹Z[ÌŠL
K™›ÜšÊ
JK›[[J
KK™]HOO]›ÚY	‰•K‘]K™[˜ÛÙJK™]K‹Z[ÌŠN
K™›ÜšÊ
JK›[[J
KK™]šY[˜ÙHOO]›ÚY	‰‘ÐK‘]šY[˜ÙS\Ý™[˜ÛÙJK™]šY[˜ÙK‹Z[ÌŠŠK™›ÜšÊ
JK›[[J
KK›\ÝÛÛ[Z]OO]›ÚY	‰•KÛÛ[Z]™[˜ÛÙJK›\ÝÛÛ[Z]‹Z[ÌŠÍ
K™›ÜšÊ
JK›[[J
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ]‹š[˜\žT™XY\ÙN›™]È]‹š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹[Š
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹šXY\UK’XY\‹™XÛÙJZ[ÌŠ
JNØœ™XZÎØØ\ÙHŽœ‹™]OUK‘]K™XÛÙJZ[ÌŠ
JNØœ™XZÎØØ\ÙHÎœ‹™]šY[˜ÙOQÐK‘]šY[˜ÙS\Ý™XÛÙJZ[ÌŠ
JNØœ™XZÎØØ\ÙHœ‹›\ÝÛÛ[Z]UKÛÛ[Z]™XÛÙJZ[ÌŠ
JNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û][Š
NÜ™]\›ŠZš\ÔÙ]
JKšXY\ŠI‰Š‹šXY\UK’XY\‹™œ›ÛR”ÓÓŠKšXY\ŠJK
Zš\ÔÙ]
JK™]JI‰Š‹™]OUK‘]K™œ›ÛR”ÓÓŠK™]JJK
Zš\ÔÙ]
JK™]šY[˜ÙJI‰Š‹™]šY[˜ÙOQÐK‘]šY[˜ÙS\Ý™œ›ÛR”ÓÓŠK™]šY[˜ÙJJK
Zš\ÔÙ]
JK›\ÝÛÛ[Z]
I‰Š‹›\ÝÛÛ[Z]UKÛÛ[Z]™œ›ÛR”ÓÓŠK›\ÝÛÛ[Z]
JKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆKšXY\ˆOO]›ÚY	‰Š‹šXY\YKšXY\ÕK’XY\‹Ò”ÓÓŠKšXY\ŠN›ÚY
KK™]HOO]›ÚY	‰Š‹™]OYK™]OÕK‘]KÒ”ÓÓŠK™]JN›ÚY
KK™]šY[˜ÙHOO]›ÚY	‰Š‹™]šY[˜ÙOYK™]šY[˜ÙOÑÐK‘]šY[˜ÙS\ÝÒ”ÓÓŠK™]šY[˜ÙJN›ÚY
KK›\ÝÛÛ[Z]OO]›ÚY	‰Š‹›\ÝÛÛ[Z]YK›\ÝÛÛ[Z]ÕKÛÛ[Z]Ò”ÓÓŠK›\ÝÛÛ[Z]
N›ÚY
KŸKœ›ÛT\X[
J^Û][Š
NÜ™]\›ˆKšXY\ˆOO]›ÚY	‰™KšXY\ˆOO[[	‰Š‹šXY\UK’XY\‹™œ›ÛT\X[
KšXY\ŠJKK™]HOO]›ÚY	‰™K™]HOO[[	‰Š‹™]OUK‘]K™œ›ÛT\X[
K™]JJKK™]šY[˜ÙHOO]›ÚY	‰™K™]šY[˜ÙHOO[[	‰Š‹™]šY[˜ÙOQÐK‘]šY[˜ÙS\Ý™œ›ÛT\X[
K™]šY[˜ÙJJKK›\ÝÛÛ[Z]OO]›ÚY	‰™K›\ÝÛÛ[Z]OO[[	‰Š‹›\ÝÛÛ[Z]UKÛÛ[Z]™œ›ÛT\X[
K›\ÝÛÛ[Z]
JKŸ__JNÝ˜\ˆÝRJÙOOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\JÙK—×Ù\Ó[Ù[H‹Ý˜[YNˆLJN×ÙK”ÙX\˜Ú›ØÚÜÔ™\Ý[WÙK”ÙX\˜ÚÔ™\Ý[WÙK•\ÙÑ]OWÙK“\ÙÑ]OWÙK”Ú[][][Û”™\ÜÛœÙOWÙK”™\Ý[WÙK‘Ø\Ò[™›ÏWÙK]šX]OWÙK”Ýš[™Ñ]™[WÙKPÒSY\ÜØYÙSÙÏWÙK•™\ÜÛœÙOWÙKœ›ÝØY”XÚØYÙO]›ÚYÝ˜\ˆ[Ï]

K	Ï^Š
K™Ï]Š
K]PÙJ
KQYJ
N×ÙKœ›ÝØY”XÚØYÙOH˜ÛÜÛ[ÜË˜˜\ÙK˜X˜ÚKŒX™]LHŽÙ[˜Ý[ÛˆŠ
^Ü™]\›žÚZYÚšYÒ[

K\Úˆˆ‹ÛÙ\ÜXÙNˆˆ‹ÛÙNŒ]Nˆˆ‹˜]ÓÙÎˆˆ‹ÙÜÎ–×K[™›Îˆˆ‹Ø\ÕØ[YšYÒ[

KØ\Õ\ÙYšYÒ[

K›ÚY[Y\Ý[\ˆˆ‹]™[Î–×__WÙK•™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ[ÜË˜˜\ÙK˜X˜ÚKŒX™]LK•™\ÜÛœÙH‹[˜ÛÙJKQ]š[˜\žUÜš]\‹˜Ü™X]J
J^ÙKšZYÚOOPšYÒ[

I‰›‹Z[ÌŠ
Kš[
KšZYÚ
KK\ÚOOHˆ‰‰›‹Z[ÌŠN
KœÝš[™ÊK\Ú
KK˜ÛÙ\ÜXÙHOOHˆ‰‰›‹Z[ÌŠŠKœÝš[™ÊK˜ÛÙ\ÜXÙJKK˜ÛÙHOOL	‰›‹Z[ÌŠÌŠKZ[ÌŠK˜ÛÙJKK™]HOOHˆ‰‰›‹Z[ÌŠŠKœÝš[™ÊK™]JKKœ˜]ÓÙÈOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊKœ˜]ÓÙÊNÙ›ÜŠ]ÙˆK›ÙÜÊWÙKPÒSY\ÜØYÙSÙË™[˜ÛÙJ‹Z[ÌŠN
K™›ÜšÊ
JK›[[J
NÙKš[™›ÈOOHˆ‰‰›‹Z[ÌŠŠKœÝš[™ÊKš[™›ÊKK™Ø\ÕØ[YOOPšYÒ[

I‰›‹Z[ÌŠÌŠKš[
K™Ø\ÕØ[Y
KK™Ø\Õ\ÙYOOPšYÒ[

I‰›‹Z[ÌŠ
Kš[
K™Ø\Õ\ÙY
KKOO]›ÚY	‰”[Ë[žK™[˜ÛÙJK‹Z[ÌŠL
K™›ÜšÊ
JK›[[J
KK[Y\Ý[\OOHˆ‰‰›‹Z[ÌŠN
KœÝš[™ÊK[Y\Ý[\
NÙ›ÜŠ]ÙˆK™]™[ÊIË‘]™[™[˜ÛÙJ‹Z[ÌŠLŠK™›ÜšÊ
JK›[[J
NÜ™]\›ˆŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ]š[˜\žT™XY\ÙN›™]È]š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹\Š
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹šZYÚ]š[

NØœ™XZÎØØ\ÙHŽœ‹\Ú]œÝš[™Ê
NØœ™XZÎØØ\ÙHÎœ‹˜ÛÙ\ÜXÙO]œÝš[™Ê
NØœ™XZÎØØ\ÙHœ‹˜ÛÙO]Z[ÌŠ
NØœ™XZÎØØ\ÙHNœ‹™]O]œÝš[™Ê
NØœ™XZÎØØ\ÙHŽœ‹œ˜]ÓÙÏ]œÝš[™Ê
NØœ™XZÎØØ\ÙHÎœ‹›ÙÜËœ\Ú
ÙKPÒSY\ÜØYÙSÙË™XÛÙJZ[ÌŠ
JJNØœ™XZÎØØ\ÙHœ‹š[™›Ï]œÝš[™Ê
NØœ™XZÎØØ\ÙHNœ‹™Ø\ÕØ[Y]š[

NØœ™XZÎØØ\ÙHLœ‹™Ø\Õ\ÙY]š[

NØœ™XZÎØØ\ÙHLNœ‹T[Ë[žK™XÛÙJZ[ÌŠ
JNØœ™XZÎØØ\ÙHLŽœ‹[Y\Ý[\]œÝš[™Ê
NØœ™XZÎØØ\ÙHLÎœ‹™]™[Ëœ\Ú
	Ë‘]™[™XÛÙJZ[ÌŠ
JJNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]\Š
NÜ™]\›Šš\ÔÙ]
JKšZYÚ
I‰Š‹šZYÚPšYÒ[
KšZYÚÔÝš[™Ê
JJK
š\ÔÙ]
JK\Ú
I‰Š‹\ÚTÝš[™ÊK\Ú
JK
š\ÔÙ]
JK˜ÛÙ\ÜXÙJI‰Š‹˜ÛÙ\ÜXÙOTÝš[™ÊK˜ÛÙ\ÜXÙJJK
š\ÔÙ]
JK˜ÛÙJI‰Š‹˜ÛÙOS[X™\ŠK˜ÛÙJJK
š\ÔÙ]
JK™]JI‰Š‹™]OTÝš[™ÊK™]JJK
š\ÔÙ]
JKœ˜]ÓÙÊI‰Š‹œ˜]ÓÙÏTÝš[™ÊKœ˜]ÓÙÊJK\œ˜^Kš\Ð\œ˜^JOË›ÙÜÊI‰Š‹›ÙÜÏYK›ÙÜË›X\
O—ÙKPÒSY\ÜØYÙSÙË™œ›ÛR”ÓÓŠ
JJK
š\ÔÙ]
JKš[™›ÊI‰Š‹š[™›ÏTÝš[™ÊKš[™›ÊJK
š\ÔÙ]
JK™Ø\ÕØ[Y
I‰Š‹™Ø\ÕØ[YPšYÒ[
K™Ø\ÕØ[YÔÝš[™Ê
JJK
š\ÔÙ]
JK™Ø\Õ\ÙY
I‰Š‹™Ø\Õ\ÙYPšYÒ[
K™Ø\Õ\ÙYÔÝš[™Ê
JJK
š\ÔÙ]
JK
I‰Š‹T[Ë[žK™œ›ÛR”ÓÓŠK
JK
š\ÔÙ]
JK[Y\Ý[\
I‰Š‹[Y\Ý[\TÝš[™ÊK[Y\Ý[\
JK\œ˜^Kš\Ð\œ˜^JOË™]™[ÊI‰Š‹™]™[ÏYK™]™[Ë›X\
O‰Ë‘]™[™œ›ÛR”ÓÓŠ
JJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆKšZYÚOO]›ÚY	‰Š‹šZYÚJKšZYÚšYÒ[

JKÔÝš[™Ê
JKK\ÚOO]›ÚY	‰Š‹\ÚYK\Ú
KK˜ÛÙ\ÜXÙHOO]›ÚY	‰Š‹˜ÛÙ\ÜXÙOYK˜ÛÙ\ÜXÙJKK˜ÛÙHOO]›ÚY	‰Š‹˜ÛÙOSX]œ›Ý[™
K˜ÛÙJJKK™]HOO]›ÚY	‰Š‹™]OYK™]JKKœ˜]ÓÙÈOO]›ÚY	‰Š‹œ˜]ÓÙÏYKœ˜]ÓÙÊKK›ÙÜÏÛ‹›ÙÜÏYK›ÙÜË›X\
O×ÙKPÒSY\ÜØYÙSÙËÒ”ÓÓŠ
N›ÚY
N›‹›ÙÜÏV×KKš[™›ÈOO]›ÚY	‰Š‹š[™›ÏYKš[™›ÊKK™Ø\ÕØ[YOO]›ÚY	‰Š‹™Ø\ÕØ[YJK™Ø\ÕØ[YšYÒ[

JKÔÝš[™Ê
JKK™Ø\Õ\ÙYOO]›ÚY	‰Š‹™Ø\Õ\ÙYJK™Ø\Õ\ÙYšYÒ[

JKÔÝš[™Ê
JKKOO]›ÚY	‰Š‹YKÔ[Ë[žKÒ”ÓÓŠK
N›ÚY
KK[Y\Ý[\OO]›ÚY	‰Š‹[Y\Ý[\YK[Y\Ý[\
KK™]™[ÏÛ‹™]™[ÏYK™]™[Ë›X\
OÉË‘]™[Ò”ÓÓŠ
N›ÚY
N›‹™]™[ÏV×KŸKœ›ÛT\X[
J^Û]\Š
NÜ™]\›ˆKšZYÚOO]›ÚY	‰™KšZYÚOO[[	‰Š‹šZYÚPšYÒ[
KšZYÚÔÝš[™Ê
JJK‹\ÚYK\ÚÏÈˆ‹‹˜ÛÙ\ÜXÙOYK˜ÛÙ\ÜXÙOÏÈˆ‹‹˜ÛÙOYK˜ÛÙOÏÌ‹™]OYK™]OÏÈˆ‹‹œ˜]ÓÙÏYKœ˜]ÓÙÏÏÈˆ‹‹›ÙÜÏYK›ÙÜÏË›X\
O—ÙKPÒSY\ÜØYÙSÙË™œ›ÛT\X[

J_×K‹š[™›ÏYKš[™›ÏÏÈˆ‹K™Ø\ÕØ[YOO]›ÚY	‰™K™Ø\ÕØ[YOO[[	‰Š‹™Ø\ÕØ[YPšYÒ[
K™Ø\ÕØ[YÔÝš[™Ê
JJKK™Ø\Õ\ÙYOO]›ÚY	‰™K™Ø\Õ\ÙYOO[[	‰Š‹™Ø\Õ\ÙYPšYÒ[
K™Ø\Õ\ÙYÔÝš[™Ê
JJKKOO]›ÚY	‰™KOO[[	‰Š‹T[Ë[žK™œ›ÛT\X[
K
JK‹[Y\Ý[\YK[Y\Ý[\ÏÈˆ‹‹™]™[ÏYK™]™[ÏË›X\
O‰Ë‘]™[™œ›ÛT\X[

J_×KŸ_NÙ[˜Ý[Ûˆ]Š
^Ü™]\›žÛ\ÙÒ[™^ŒÙÎˆˆ‹]™[Î–×__WÙKPÒSY\ÜØYÙSÙÏ^Ý\U\›ˆ‹ØÛÜÛ[ÜË˜˜\ÙK˜X˜ÚKŒX™]LKPÒSY\ÜØYÙSÙÈ‹[˜ÛÙJKQ]š[˜\žUÜš]\‹˜Ü™X]J
J^ÙK›\ÙÒ[™^OOL	‰›‹Z[ÌŠ
KZ[ÌŠK›\ÙÒ[™^
KK›ÙÈOOHˆ‰‰›‹Z[ÌŠN
KœÝš[™ÊK›ÙÊNÙ›ÜŠ]ÙˆK™]™[ÊWÙK”Ýš[™Ñ]™[™[˜ÛÙJ‹Z[ÌŠŠK™›ÜšÊ
JK›[[J
NÜ™]\›ˆŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ]š[˜\žT™XY\ÙN›™]È]š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹Z]Š
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹›\ÙÒ[™^]Z[ÌŠ
NØœ™XZÎØØ\ÙHŽœ‹›ÙÏ]œÝš[™Ê
NØœ™XZÎØØ\ÙHÎœ‹™]™[Ëœ\Ú
ÙK”Ýš[™Ñ]™[™XÛÙJZ[ÌŠ
JJNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]Z]Š
NÜ™]\›Šš\ÔÙ]
JK›\ÙÒ[™^
I‰Š‹›\ÙÒ[™^S[X™\ŠK›\ÙÒ[™^
JK
š\ÔÙ]
JK›ÙÊI‰Š‹›ÙÏTÝš[™ÊK›ÙÊJK\œ˜^Kš\Ð\œ˜^JOË™]™[ÊI‰Š‹™]™[ÏYK™]™[Ë›X\
O—ÙK”Ýš[™Ñ]™[™œ›ÛR”ÓÓŠ
JJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK›\ÙÒ[™^OO]›ÚY	‰Š‹›\ÙÒ[™^SX]œ›Ý[™
K›\ÙÒ[™^
JKK›ÙÈOO]›ÚY	‰Š‹›ÙÏYK›ÙÊKK™]™[ÏÛ‹™]™[ÏYK™]™[Ë›X\
O×ÙK”Ýš[™Ñ]™[Ò”ÓÓŠ
N›ÚY
N›‹™]™[ÏV×KŸKœ›ÛT\X[
J^Û]Z]Š
NÜ™]\›ˆ‹›\ÙÒ[™^YK›\ÙÒ[™^ÏÌ‹›ÙÏYK›ÙÏÏÈˆ‹‹™]™[ÏYK™]™[ÏË›X\
O—ÙK”Ýš[™Ñ]™[™œ›ÛT\X[

J_×KŸ_NÙ[˜Ý[ÛˆÝŠ
^Ü™]\›žÝ\Nˆˆ‹]šX]\Î–×__WÙK”Ýš[™Ñ]™[^Ý\U\›ˆ‹ØÛÜÛ[ÜË˜˜\ÙK˜X˜ÚKŒX™]LK”Ýš[™Ñ]™[‹[˜ÛÙJKQ]š[˜\žUÜš]\‹˜Ü™X]J
J^ÙK\HOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊK\JNÙ›ÜŠ]ÙˆK˜]šX]\ÊWÙK]šX]K™[˜ÛÙJ‹Z[ÌŠN
K™›ÜšÊ
JK›[[J
NÜ™]\›ˆŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ]š[˜\žT™XY\ÙN›™]È]š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹[ÝŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹\O]œÝš[™Ê
NØœ™XZÎØØ\ÙHŽœ‹˜]šX]\Ëœ\Ú
ÙK]šX]K™XÛÙJZ[ÌŠ
JJNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û][ÝŠ
NÜ™]\›Šš\ÔÙ]
JK\JI‰Š‹\OTÝš[™ÊK\JJK\œ˜^Kš\Ð\œ˜^JOË˜]šX]\ÊI‰Š‹˜]šX]\ÏYK˜]šX]\Ë›X\
O—ÙK]šX]K™œ›ÛR”ÓÓŠ
JJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK\HOO]›ÚY	‰Š‹\OYK\JKK˜]šX]\ÏÛ‹˜]šX]\ÏYK˜]šX]\Ë›X\
O×ÙK]šX]KÒ”ÓÓŠ
N›ÚY
N›‹˜]šX]\ÏV×KŸKœ›ÛT\X[
J^Û][ÝŠ
NÜ™]\›ˆ‹\OYK\OÏÈˆ‹‹˜]šX]\ÏYK˜]šX]\ÏË›X\
O—ÙK]šX]K™œ›ÛT\X[

J_×KŸ_NÙ[˜Ý[Ûˆ]Š
^Ü™]\›žÚÙ^Nˆˆ‹˜[YNˆˆŸ_WÙK]šX]O^Ý\U\›ˆ‹ØÛÜÛ[ÜË˜˜\ÙK˜X˜ÚKŒX™]LK]šX]H‹[˜ÛÙJKQ]š[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆKšÙ^HOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊKšÙ^JKK˜[YHOOHˆ‰‰›‹Z[ÌŠN
KœÝš[™ÊK˜[YJKŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ]š[˜\žT™XY\ÙN›™]È]š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹X]Š
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹šÙ^O]œÝš[™Ê
NØœ™XZÎØØ\ÙHŽœ‹˜[YO]œÝš[™Ê
NØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]X]Š
NÜ™]\›Šš\ÔÙ]
JKšÙ^JI‰Š‹šÙ^OTÝš[™ÊKšÙ^JJK
š\ÔÙ]
JK˜[YJI‰Š‹˜[YOTÝš[™ÊK˜[YJJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆKšÙ^HOO]›ÚY	‰Š‹šÙ^OYKšÙ^JKK˜[YHOO]›ÚY	‰Š‹˜[YOYK˜[YJKŸKœ›ÛT\X[
J^Û]X]Š
NÜ™]\›ˆ‹šÙ^OYKšÙ^OÏÈˆ‹‹˜[YOYK˜[YOÏÈˆ‹Ÿ_NÙ[˜Ý[ÛˆÝŠ
^Ü™]\›žÙØ\ÕØ[YšYÒ[

KØ\Õ\ÙYšYÒ[

__WÙK‘Ø\Ò[™›Ï^Ý\U\›ˆ‹ØÛÜÛ[ÜË˜˜\ÙK˜X˜ÚKŒX™]LK‘Ø\Ò[™›È‹[˜ÛÙJKQ]š[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK™Ø\ÕØ[YOOPšYÒ[

I‰›‹Z[ÌŠ
KZ[
K™Ø\ÕØ[Y
KK™Ø\Õ\ÙYOOPšYÒ[

I‰›‹Z[ÌŠMŠKZ[
K™Ø\Õ\ÙY
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ]š[˜\žT™XY\ÙN›™]È]š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹\ÝŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹™Ø\ÕØ[Y]Z[

NØœ™XZÎØØ\ÙHŽœ‹™Ø\Õ\ÙY]Z[

NØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]\ÝŠ
NÜ™]\›Šš\ÔÙ]
JK™Ø\ÕØ[Y
I‰Š‹™Ø\ÕØ[YPšYÒ[
K™Ø\ÕØ[YÔÝš[™Ê
JJK
š\ÔÙ]
JK™Ø\Õ\ÙY
I‰Š‹™Ø\Õ\ÙYPšYÒ[
K™Ø\Õ\ÙYÔÝš[™Ê
JJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK™Ø\ÕØ[YOO]›ÚY	‰Š‹™Ø\ÕØ[YJK™Ø\ÕØ[YšYÒ[

JKÔÝš[™Ê
JKK™Ø\Õ\ÙYOO]›ÚY	‰Š‹™Ø\Õ\ÙYJK™Ø\Õ\ÙYšYÒ[

JKÔÝš[™Ê
JKŸKœ›ÛT\X[
J^Û]\ÝŠ
NÜ™]\›ˆK™Ø\ÕØ[YOO]›ÚY	‰™K™Ø\ÕØ[YOO[[	‰Š‹™Ø\ÕØ[YPšYÒ[
K™Ø\ÕØ[YÔÝš[™Ê
JJKK™Ø\Õ\ÙYOO]›ÚY	‰™K™Ø\Õ\ÙYOO[[	‰Š‹™Ø\Õ\ÙYPšYÒ[
K™Ø\Õ\ÙYÔÝš[™Ê
JJKŸ_NÙ[˜Ý[ÛˆŠ
^Ü™]\›žÙ]N›™]ÈZ[\œ˜^KÙÎˆˆ‹]™[Î–×K\ÙÔ™\ÜÛœÙ\Î–×__WÙK”™\Ý[^Ý\U\›ˆ‹ØÛÜÛ[ÜË˜˜\ÙK˜X˜ÚKŒX™]LK”™\Ý[‹[˜ÛÙJKQ]š[˜\žUÜš]\‹˜Ü™X]J
J^ÙK™]K›[™ÝOOL	‰›‹Z[ÌŠL
K˜ž]\ÊK™]JKK›ÙÈOOHˆ‰‰›‹Z[ÌŠN
KœÝš[™ÊK›ÙÊNÙ›ÜŠ]ÙˆK™]™[ÊIË‘]™[™[˜ÛÙJ‹Z[ÌŠŠK™›ÜšÊ
JK›[[J
NÙ›ÜŠ]ÙˆK›\ÙÔ™\ÜÛœÙ\ÊT[Ë[žK™[˜ÛÙJ‹Z[ÌŠÍ
K™›ÜšÊ
JK›[[J
NÜ™]\›ˆŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ]š[˜\žT™XY\ÙN›™]È]š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹YŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹™]O]˜ž]\Ê
NØœ™XZÎØØ\ÙHŽœ‹›ÙÏ]œÝš[™Ê
NØœ™XZÎØØ\ÙHÎœ‹™]™[Ëœ\Ú
	Ë‘]™[™XÛÙJZ[ÌŠ
JJNØœ™XZÎØØ\ÙHœ‹›\ÙÔ™\ÜÛœÙ\Ëœ\Ú
[Ë[žK™XÛÙJZ[ÌŠ
JJNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]YŠ
NÜ™]\›Šš\ÔÙ]
JK™]JI‰Š‹™]OJ˜ž]\Ñœ›ÛP˜\ÙM
JK™]JJK
š\ÔÙ]
JK›ÙÊI‰Š‹›ÙÏTÝš[™ÊK›ÙÊJK\œ˜^Kš\Ð\œ˜^JOË™]™[ÊI‰Š‹™]™[ÏYK™]™[Ë›X\
O‰Ë‘]™[™œ›ÛR”ÓÓŠ
JJK\œ˜^Kš\Ð\œ˜^JOË›\ÙÔ™\ÜÛœÙ\ÊI‰Š‹›\ÙÔ™\ÜÛœÙ\ÏYK›\ÙÔ™\ÜÛœÙ\Ë›X\
O”[Ë[žK™œ›ÛR”ÓÓŠ
JJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK™]HOO]›ÚY	‰Š‹™]OJ˜˜\ÙMœ›ÛPž]\ÊJK™]HOO]›ÚYÙK™]N›™]ÈZ[\œ˜^JJKK›ÙÈOO]›ÚY	‰Š‹›ÙÏYK›ÙÊKK™]™[ÏÛ‹™]™[ÏYK™]™[Ë›X\
OÉË‘]™[Ò”ÓÓŠ
N›ÚY
N›‹™]™[ÏV×KK›\ÙÔ™\ÜÛœÙ\ÏÛ‹›\ÙÔ™\ÜÛœÙ\ÏYK›\ÙÔ™\ÜÛœÙ\Ë›X\
OÔ[Ë[žKÒ”ÓÓŠ
N›ÚY
N›‹›\ÙÔ™\ÜÛœÙ\ÏV×KŸKœ›ÛT\X[
J^Û]YŠ
NÜ™]\›ˆ‹™]OYK™]OÏÛ™]ÈZ[\œ˜^K‹›ÙÏYK›ÙÏÏÈˆ‹‹™]™[ÏYK™]™[ÏË›X\
O‰Ë‘]™[™œ›ÛT\X[

J_×K‹›\ÙÔ™\ÜÛœÙ\ÏYK›\ÙÔ™\ÜÛœÙ\ÏË›X\
O”[Ë[žK™œ›ÛT\X[

J_×KŸ_NÙ[˜Ý[ÛˆÝŠ
^Ü™]\›žÙØ\Ò[™›Î—ÙK‘Ø\Ò[™›Ë™œ›ÛT\X[
ßJK™\Ý[›ÚY_WÙK”Ú[][][Û”™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ[ÜË˜˜\ÙK˜X˜ÚKŒX™]LK”Ú[][][Û”™\ÜÛœÙH‹[˜ÛÙJKQ]š[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK™Ø\Ò[™›ÈOO]›ÚY	‰—ÙK‘Ø\Ò[™›Ë™[˜ÛÙJK™Ø\Ò[™›Ë‹Z[ÌŠL
K™›ÜšÊ
JK›[[J
KKœ™\Ý[OO]›ÚY	‰—ÙK”™\Ý[™[˜ÛÙJKœ™\Ý[‹Z[ÌŠN
K™›ÜšÊ
JK›[[J
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ]š[˜\žT™XY\ÙN›™]È]š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹XÝŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹™Ø\Ò[™›ÏWÙK‘Ø\Ò[™›Ë™XÛÙJZ[ÌŠ
JNØœ™XZÎØØ\ÙHŽœ‹œ™\Ý[WÙK”™\Ý[™XÛÙJZ[ÌŠ
JNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]XÝŠ
NÜ™]\›Šš\ÔÙ]
JK™Ø\Ò[™›ÊI‰Š‹™Ø\Ò[™›ÏWÙK‘Ø\Ò[™›Ë™œ›ÛR”ÓÓŠK™Ø\Ò[™›ÊJK
š\ÔÙ]
JKœ™\Ý[
I‰Š‹œ™\Ý[WÙK”™\Ý[™œ›ÛR”ÓÓŠKœ™\Ý[
JKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK™Ø\Ò[™›ÈOO]›ÚY	‰Š‹™Ø\Ò[™›ÏYK™Ø\Ò[™›Ï×ÙK‘Ø\Ò[™›ËÒ”ÓÓŠK™Ø\Ò[™›ÊN›ÚY
KKœ™\Ý[OO]›ÚY	‰Š‹œ™\Ý[YKœ™\Ý[×ÙK”™\Ý[Ò”ÓÓŠKœ™\Ý[
N›ÚY
KŸKœ›ÛT\X[
J^Û]XÝŠ
NÜ™]\›ˆK™Ø\Ò[™›ÈOO]›ÚY	‰™K™Ø\Ò[™›ÈOO[[	‰Š‹™Ø\Ò[™›ÏWÙK‘Ø\Ò[™›Ë™œ›ÛT\X[
K™Ø\Ò[™›ÊJKKœ™\Ý[OO]›ÚY	‰™Kœ™\Ý[OO[[	‰Š‹œ™\Ý[WÙK”™\Ý[™œ›ÛT\X[
Kœ™\Ý[
JKŸ_NÙ[˜Ý[Ûˆ]Š
^Ü™]\›žÛ\ÙÕ\Nˆˆ‹]N›™]ÈZ[\œ˜^__WÙK“\ÙÑ]O^Ý\U\›ˆ‹ØÛÜÛ[ÜË˜˜\ÙK˜X˜ÚKŒX™]LK“\ÙÑ]H‹[˜ÛÙJKQ]š[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK›\ÙÕ\HOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊK›\ÙÕ\JKK™]K›[™ÝOOL	‰›‹Z[ÌŠN
K˜ž]\ÊK™]JKŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ]š[˜\žT™XY\ÙN›™]È]š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹]]Š
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹›\ÙÕ\O]œÝš[™Ê
NØœ™XZÎØØ\ÙHŽœ‹™]O]˜ž]\Ê
NØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]]]Š
NÜ™]\›Šš\ÔÙ]
JK›\ÙÕ\JI‰Š‹›\ÙÕ\OTÝš[™ÊK›\ÙÕ\JJK
š\ÔÙ]
JK™]JI‰Š‹™]OJ˜ž]\Ñœ›ÛP˜\ÙM
JK™]JJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK›\ÙÕ\HOO]›ÚY	‰Š‹›\ÙÕ\OYK›\ÙÕ\JKK™]HOO]›ÚY	‰Š‹™]OJ˜˜\ÙMœ›ÛPž]\ÊJK™]HOO]›ÚYÙK™]N›™]ÈZ[\œ˜^JJKŸKœ›ÛT\X[
J^Û]]]Š
NÜ™]\›ˆ‹›\ÙÕ\OYK›\ÙÕ\OÏÈˆ‹‹™]OYK™]OÏÛ™]ÈZ[\œ˜^KŸ_NÙ[˜Ý[Ûˆ]Š
^Ü™]\›žÙ]N–×K\ÙÔ™\ÜÛœÙ\Î–×__WÙK•\ÙÑ]O^Ý\U\›ˆ‹ØÛÜÛ[ÜË˜˜\ÙK˜X˜ÚKŒX™]LK•\ÙÑ]H‹[˜ÛÙJKQ]š[˜\žUÜš]\‹˜Ü™X]J
J^Ù›ÜŠ]ÙˆK™]JWÙK“\ÙÑ]K™[˜ÛÙJ‹Z[ÌŠL
K™›ÜšÊ
JK›[[J
NÙ›ÜŠ]ÙˆK›\ÙÔ™\ÜÛœÙ\ÊT[Ë[žK™[˜ÛÙJ‹Z[ÌŠN
K™›ÜšÊ
JK›[[J
NÜ™]\›ˆŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ]š[˜\žT™XY\ÙN›™]È]š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹P]Š
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹™]Kœ\Ú
ÙK“\ÙÑ]K™XÛÙJZ[ÌŠ
JJNØœ™XZÎØØ\ÙHŽœ‹›\ÙÔ™\ÜÛœÙ\Ëœ\Ú
[Ë[žK™XÛÙJZ[ÌŠ
JJNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]P]Š
NÜ™]\›ˆ\œ˜^Kš\Ð\œ˜^JOË™]JI‰Š‹™]OYK™]K›X\
O—ÙK“\ÙÑ]K™œ›ÛR”ÓÓŠ
JJK\œ˜^Kš\Ð\œ˜^JOË›\ÙÔ™\ÜÛœÙ\ÊI‰Š‹›\ÙÔ™\ÜÛœÙ\ÏYK›\ÙÔ™\ÜÛœÙ\Ë›X\
O”[Ë[žK™œ›ÛR”ÓÓŠ
JJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK™]OÛ‹™]OYK™]K›X\
O×ÙK“\ÙÑ]KÒ”ÓÓŠ
N›ÚY
N›‹™]OV×KK›\ÙÔ™\ÜÛœÙ\ÏÛ‹›\ÙÔ™\ÜÛœÙ\ÏYK›\ÙÔ™\ÜÛœÙ\Ë›X\
OÔ[Ë[žKÒ”ÓÓŠ
N›ÚY
N›‹›\ÙÔ™\ÜÛœÙ\ÏV×KŸKœ›ÛT\X[
J^Û]P]Š
NÜ™]\›ˆ‹™]OYK™]OË›X\
O—ÙK“\ÙÑ]K™œ›ÛT\X[

J_×K‹›\ÙÔ™\ÜÛœÙ\ÏYK›\ÙÔ™\ÜÛœÙ\ÏË›X\
O”[Ë[žK™œ›ÛT\X[

J_×KŸ_NÙ[˜Ý[ÛˆŠ
^Ü™]\›žÝÝ[ÛÝ[šYÒ[

KÛÝ[šYÒ[

KYÙS[X™\ŽšYÒ[

KYÙUÝ[šYÒ[

K[Z]šYÒ[

KÎ–×__WÙK”ÙX\˜ÚÔ™\Ý[^Ý\U\›ˆ‹ØÛÜÛ[ÜË˜˜\ÙK˜X˜ÚKŒX™]LK”ÙX\˜ÚÔ™\Ý[‹[˜ÛÙJKQ]š[˜\žUÜš]\‹˜Ü™X]J
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
NÙ›ÜŠ]ÙˆKÊWÙK•™\ÜÛœÙK™[˜ÛÙJ‹Z[ÌŠL
K™›ÜšÊ
JK›[[J
NÜ™]\›ˆŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ]š[˜\žT™XY\ÙN›™]È]š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹[Š
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹Ý[ÛÝ[]Z[

NØœ™XZÎØØ\ÙHŽœ‹˜ÛÝ[]Z[

NØœ™XZÎØØ\ÙHÎœ‹œYÙS[X™\]Z[

NØœ™XZÎØØ\ÙHœ‹œYÙUÝ[]Z[

NØœ™XZÎØØ\ÙHNœ‹›[Z]]Z[

NØœ™XZÎØØ\ÙHŽœ‹Ëœ\Ú
ÙK•™\ÜÛœÙK™XÛÙJZ[ÌŠ
JJNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û][Š
NÜ™]\›Šš\ÔÙ]
JKÝ[ÛÝ[
I‰Š‹Ý[ÛÝ[PšYÒ[
KÝ[ÛÝ[ÔÝš[™Ê
JJK
š\ÔÙ]
JK˜ÛÝ[
I‰Š‹˜ÛÝ[PšYÒ[
K˜ÛÝ[ÔÝš[™Ê
JJK
š\ÔÙ]
JKœYÙS[X™\ŠI‰Š‹œYÙS[X™\PšYÒ[
KœYÙS[X™\‹ÔÝš[™Ê
JJK
š\ÔÙ]
JKœYÙUÝ[
I‰Š‹œYÙUÝ[PšYÒ[
KœYÙUÝ[ÔÝš[™Ê
JJK
š\ÔÙ]
JK›[Z]
I‰Š‹›[Z]PšYÒ[
K›[Z]ÔÝš[™Ê
JJK\œ˜^Kš\Ð\œ˜^JOËÊI‰Š‹ÏYKË›X\
O—ÙK•™\ÜÛœÙK™œ›ÛR”ÓÓŠ
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
O×ÙK•™\ÜÛœÙKÒ”ÓÓŠ
N›ÚY
N›‹ÏV×KŸKœ›ÛT\X[
J^Û][Š
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
O—ÙK•™\ÜÛœÙK™œ›ÛT\X[

J_×KŸ_NÙ[˜Ý[ÛˆŠ
^Ü™]\›žÝÝ[ÛÝ[šYÒ[

KÛÝ[šYÒ[

KYÙS[X™\ŽšYÒ[

KYÙUÝ[šYÒ[

K[Z]šYÒ[

K›ØÚÜÎ–×__WÙK”ÙX\˜Ú›ØÚÜÔ™\Ý[^Ý\U\›ˆ‹ØÛÜÛ[ÜË˜˜\ÙK˜X˜ÚKŒX™]LK”ÙX\˜Ú›ØÚÜÔ™\Ý[‹[˜ÛÙJKQ]š[˜\žUÜš]\‹˜Ü™X]J
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
NÙ›ÜŠ]ÙˆK˜›ØÚÜÊ[™Ë›ØÚË™[˜ÛÙJ‹Z[ÌŠL
K™›ÜšÊ
JK›[[J
NÜ™]\›ˆŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[Ùˆ]š[˜\žT™XY\ÙN›™]È]š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹YŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹Ý[ÛÝ[]š[

NØœ™XZÎØØ\ÙHŽœ‹˜ÛÝ[]š[

NØœ™XZÎØØ\ÙHÎœ‹œYÙS[X™\]š[

NØœ™XZÎØØ\ÙHœ‹œYÙUÝ[]š[

NØœ™XZÎØØ\ÙHNœ‹›[Z]]š[

NØœ™XZÎØØ\ÙHŽœ‹˜›ØÚÜËœ\Ú
™Ë›ØÚË™XÛÙJZ[ÌŠ
JJNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]YŠ
NÜ™]\›Šš\ÔÙ]
JKÝ[ÛÝ[
I‰Š‹Ý[ÛÝ[PšYÒ[
KÝ[ÛÝ[ÔÝš[™Ê
JJK
š\ÔÙ]
JK˜ÛÝ[
I‰Š‹˜ÛÝ[PšYÒ[
K˜ÛÝ[ÔÝš[™Ê
JJK
š\ÔÙ]
JKœYÙS[X™\ŠI‰Š‹œYÙS[X™\PšYÒ[
KœYÙS[X™\‹ÔÝš[™Ê
JJK
š\ÔÙ]
JKœYÙUÝ[
I‰Š‹œYÙUÝ[PšYÒ[
KœYÙUÝ[ÔÝš[™Ê
JJK
š\ÔÙ]
JK›[Z]
I‰Š‹›[Z]PšYÒ[
K›[Z]ÔÝš[™Ê
JJK\œ˜^Kš\Ð\œ˜^JOË˜›ØÚÜÊI‰Š‹˜›ØÚÜÏYK˜›ØÚÜË›X\
O›™Ë›ØÚË™œ›ÛR”ÓÓŠ
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
OÛ™Ë›ØÚËÒ”ÓÓŠ
N›ÚY
N›‹˜›ØÚÜÏV×KŸKœ›ÛT\X[
J^Û]YŠ
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
O›™Ë›ØÚË™œ›ÛT\X[

J_×KŸ__JNÝ˜\ˆSORJOOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\JK—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÞK”Ù\šXÙPÛY[[\^K•XÛÙP[Z[›Ô™\ÜÛœÙO^K•XÛÙP[Z[›Ô™\]Y\Ý^K•[˜ÛÙP[Z[›Ô™\ÜÛœÙO^K•[˜ÛÙP[Z[›Ô™\]Y\Ý^K•[˜ÛÙT™\ÜÛœÙO^K•[˜ÛÙT™\]Y\Ý^K•XÛÙT™\ÜÛœÙO^K•XÛÙT™\]Y\Ý^K‘Ù]›ØÚÕÚ]Ô™\ÜÛœÙO^K‘Ù]›ØÚÕÚ]Ô™\]Y\Ý^K‘Ù]™\ÜÛœÙO^K‘Ù]™\]Y\Ý^K”Ú[][]T™\ÜÛœÙO^K”Ú[][]T™\]Y\Ý^Kœ›ØYØ\Ý™\ÜÛœÙO^Kœ›ØYØ\Ý™\]Y\Ý^K‘Ù]Ñ]™[™\ÜÛœÙO^K‘Ù]Ñ]™[™\]Y\Ý^Kœ›ØYØ\Ý[ÙO^K“Ü™\žO^Kœ›ÝØY”XÚØYÙO]›ÚYÞK›Ü™\žQœ›ÛR”ÓÓRSNÞK›Ü™\žUÒ”ÓÓZNÞK˜œ›ØYØ\Ý[ÙQœ›ÛR”ÓÓ^SNÞK˜œ›ØYØ\Ý[ÙUÒ”ÓÓP“NÝ˜\ˆVY

KšO[Ê
K\YÝŠ
KÏ]J
K™Ï]Š
KYOPÙJ
KQYJ
NÞKœ›ÝØY”XÚØYÙOH˜ÛÜÛ[ÜËŒX™]LHŽÝ˜\ˆœÎÊ[˜Ý[ÛŠJ^ÙVÙK“Ô‘T—Ð–WÕS”ÔPÒQ’QQLOH“Ô‘T—Ð–WÕS”ÔPÒQ’QQ‹VÙK“Ô‘T—Ð–WÐTÐÏLWOH“Ô‘T—Ð–WÐTÐÈ‹VÙK“Ô‘T—Ð–WÑTÐÏL—OH“Ô‘T—Ð–WÑTÐÈ‹VÙK•S”‘PÓÑÓ’V‘QKLWOH•S”‘PÓÑÓ’V‘QŸJJœß
K“Ü™\žOZœÏ^ßJJNÙ[˜Ý[ÛˆSJJ^ÜÝÚ]Ú
J^ØØ\ÙH˜Ø\ÙH“Ô‘T—Ð–WÕS”ÔPÒQ’QQŽœ™]\›ˆœË“Ô‘T—Ð–WÕS”ÔPÒQ’QQØØ\ÙHN˜Ø\ÙH“Ô‘T—Ð–WÐTÐÈŽœ™]\›ˆœË“Ô‘T—Ð–WÐTÐÎØØ\ÙHŽ˜Ø\ÙH“Ô‘T—Ð–WÑTÐÈŽœ™]\›ˆœË“Ô‘T—Ð–WÑTÐÎÙY˜][œ™]\›ˆœË•S”‘PÓÑÓ’V‘Q_Y[˜Ý[ÛˆJJ^ÜÝÚ]Ú
J^ØØ\ÙHœË“Ô‘T—Ð–WÕS”ÔPÒQ’QQœ™]\›ˆ“Ô‘T—Ð–WÕS”ÔPÒQ’QQŽØØ\ÙHœË“Ô‘T—Ð–WÐTÐÎœ™]\›ˆ“Ô‘T—Ð–WÐTÐÈŽØØ\ÙHœË“Ô‘T—Ð–WÑTÐÎœ™]\›ˆ“Ô‘T—Ð–WÑTÐÈŽØØ\ÙHœË•S”‘PÓÑÓ’V‘Q™Y˜][œ™]\›ˆ•S”‘PÓÑÓ’V‘QŸ_]˜\ˆNÊ[˜Ý[ÛŠJ^ÙVÙK”“ÐQÐTÕÓSÑWÕS”ÔPÒQ’QQLOH”“ÐQÐTÕÓSÑWÕS”ÔPÒQ’QQ‹VÙK”“ÐQÐTÕÓSÑWÐ“ÐÒÏLWOH”“ÐQÐTÕÓSÑWÐ“ÐÒÈ‹VÙK”“ÐQÐTÕÓSÑWÔÖSÏL—OH”“ÐQÐTÕÓSÑWÔÖSÈ‹VÙK”“ÐQÐTÕÓSÑWÐTÖSÏL×OH”“ÐQÐTÕÓSÑWÐTÖSÈ‹VÙK•S”‘PÓÑÓ’V‘QKLWOH•S”‘PÓÑÓ’V‘QŸJJ_
Kœ›ØYØ\Ý[ÙOUO^ßJJNÙ[˜Ý[ÛˆSJJ^ÜÝÚ]Ú
J^ØØ\ÙH˜Ø\ÙH”“ÐQÐTÕÓSÑWÕS”ÔPÒQ’QQŽœ™]\›ˆK”“ÐQÐTÕÓSÑWÕS”ÔPÒQ’QQØØ\ÙHN˜Ø\ÙH”“ÐQÐTÕÓSÑWÐ“ÐÒÈŽœ™]\›ˆK”“ÐQÐTÕÓSÑWÐ“ÐÒÎØØ\ÙHŽ˜Ø\ÙH”“ÐQÐTÕÓSÑWÔÖSÈŽœ™]\›ˆK”“ÐQÐTÕÓSÑWÔÖSÎØØ\ÙHÎ˜Ø\ÙH”“ÐQÐTÕÓSÑWÐTÖSÈŽœ™]\›ˆK”“ÐQÐTÕÓSÑWÐTÖSÎÙY˜][œ™]\›ˆK•S”‘PÓÑÓ’V‘Q_Y[˜Ý[Ûˆ“JJ^ÜÝÚ]Ú
J^ØØ\ÙHK”“ÐQÐTÕÓSÑWÕS”ÔPÒQ’QQœ™]\›ˆ”“ÐQÐTÕÓSÑWÕS”ÔPÒQ’QQŽØØ\ÙHK”“ÐQÐTÕÓSÑWÐ“ÐÒÎœ™]\›ˆ”“ÐQÐTÕÓSÑWÐ“ÐÒÈŽØØ\ÙHK”“ÐQÐTÕÓSÑWÔÖSÎœ™]\›ˆ”“ÐQÐTÕÓSÑWÔÖSÈŽØØ\ÙHK”“ÐQÐTÕÓSÑWÐTÖSÎœ™]\›ˆ”“ÐQÐTÕÓSÑWÐTÖSÈŽØØ\ÙHK•S”‘PÓÑÓ’V‘Q™Y˜][œ™]\›ˆ•S”‘PÓÑÓ’V‘QŸ_Y[˜Ý[ÛˆŠ
^Ü™]\›žÙ]™[Î–×KYÚ[˜][ÛŽ›ÚYÜ™\žNŒYÙNšYÒ[

K[Z]šYÒ[

K]Y\žNˆˆŸ_^K‘Ù]Ñ]™[™\]Y\Ý^Ý\U\›ˆ‹ØÛÜÛ[ÜËŒX™]LK‘Ù]Ñ]™[™\]Y\Ý‹[˜ÛÙJKSYKš[˜\žUÜš]\‹˜Ü™X]J
J^Ù›ÜŠ]ÙˆK™]™[Ê[‹Z[ÌŠL
KœÝš[™Ê
NÜ™]\›ˆKœYÚ[˜][ÛˆOO]›ÚY	‰™šK”YÙT™\]Y\Ý™[˜ÛÙJKœYÚ[˜][Û‹‹Z[ÌŠN
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
KœÝš[™ÊKœ]Y\žJKŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆYKš[˜\žT™XY\ÙN›™]ÈYKš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹\Š
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹™]™[Ëœ\Ú
œÝš[™Ê
JNØœ™XZÎØØ\ÙHŽœ‹œYÚ[˜][ÛYšK”YÙT™\]Y\Ý™XÛÙJZ[ÌŠ
JNØœ™XZÎØØ\ÙHÎœ‹›Ü™\žO]š[ÌŠ
NØœ™XZÎØØ\ÙHœ‹œYÙO]Z[

NØœ™XZÎØØ\ÙHNœ‹›[Z]]Z[

NØœ™XZÎØØ\ÙHŽœ‹œ]Y\žO]œÝš[™Ê
NØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]\Š
NÜ™]\›ˆ\œ˜^Kš\Ð\œ˜^JOË™]™[ÊI‰Š‹™]™[ÏYK™]™[Ë›X\
O”Ýš[™Ê
JJK
‹š\ÔÙ]
JKœYÚ[˜][ÛŠI‰Š‹œYÚ[˜][ÛYšK”YÙT™\]Y\Ý™œ›ÛR”ÓÓŠKœYÚ[˜][ÛŠJK
‹š\ÔÙ]
JK›Ü™\žJI‰Š‹›Ü™\žORSJK›Ü™\žJJK
‹š\ÔÙ]
JKœYÙJI‰Š‹œYÙOPšYÒ[
KœYÙKÔÝš[™Ê
JJK
‹š\ÔÙ]
JK›[Z]
I‰Š‹›[Z]PšYÒ[
K›[Z]ÔÝš[™Ê
JJK
‹š\ÔÙ]
JKœ]Y\žJI‰Š‹œ]Y\žOTÝš[™ÊKœ]Y\žJJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK™]™[ÏÛ‹™]™[ÏYK™]™[Ë›X\
O
N›‹™]™[ÏV×KKœYÚ[˜][ÛˆOO]›ÚY	‰Š‹œYÚ[˜][ÛYKœYÚ[˜][ÛÙšK”YÙT™\]Y\ÝÒ”ÓÓŠKœYÚ[˜][ÛŠN›ÚY
KK›Ü™\žHOO]›ÚY	‰Š‹›Ü™\žOZJK›Ü™\žJJKKœYÙHOO]›ÚY	‰Š‹œYÙOJKœYÙ_šYÒ[

JKÔÝš[™Ê
JKK›[Z]OO]›ÚY	‰Š‹›[Z]JK›[Z]šYÒ[

JKÔÝš[™Ê
JKKœ]Y\žHOO]›ÚY	‰Š‹œ]Y\žOYKœ]Y\žJKŸKœ›ÛT\X[
J^Û]\Š
NÜ™]\›ˆ‹™]™[ÏYK™]™[ÏË›X\
O
_×KKœYÚ[˜][ÛˆOO]›ÚY	‰™KœYÚ[˜][ÛˆOO[[	‰Š‹œYÚ[˜][ÛYšK”YÙT™\]Y\Ý™œ›ÛT\X[
KœYÚ[˜][ÛŠJK‹›Ü™\žOYK›Ü™\žOÏÌKœYÙHOO]›ÚY	‰™KœYÙHOO[[	‰Š‹œYÙOPšYÒ[
KœYÙKÔÝš[™Ê
JJKK›[Z]OO]›ÚY	‰™K›[Z]OO[[	‰Š‹›[Z]PšYÒ[
K›[Z]ÔÝš[™Ê
JJK‹œ]Y\žOYKœ]Y\žOÏÈˆ‹Ÿ_NÙ[˜Ý[Ûˆ]Š
^Ü™]\›žÝÎ–×K™\ÜÛœÙ\Î–×KYÚ[˜][ÛŽ›ÚYÝ[šYÒ[

__^K‘Ù]Ñ]™[™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ[ÜËŒX™]LK‘Ù]Ñ]™[™\ÜÛœÙH‹[˜ÛÙJKSYKš[˜\žUÜš]\‹˜Ü™X]J
J^Ù›ÜŠ]ÙˆKÊR•™[˜ÛÙJ‹Z[ÌŠL
K™›ÜšÊ
JK›[[J
NÙ›ÜŠ]ÙˆK™\ÜÛœÙ\ÊP\‹•™\ÜÛœÙK™[˜ÛÙJ‹Z[ÌŠN
K™›ÜšÊ
JK›[[J
NÜ™]\›ˆKœYÚ[˜][ÛˆOO]›ÚY	‰™šK”YÙT™\ÜÛœÙK™[˜ÛÙJKœYÚ[˜][Û‹‹Z[ÌŠŠK™›ÜšÊ
JK›[[J
KKÝ[OOPšYÒ[

I‰›‹Z[ÌŠÌŠKZ[
KÝ[
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆYKš[˜\žT™XY\ÙN›™]ÈYKš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹R]Š
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹Ëœ\Ú
•™XÛÙJZ[ÌŠ
JJNØœ™XZÎØØ\ÙHŽœ‹™\ÜÛœÙ\Ëœ\Ú
\‹•™\ÜÛœÙK™XÛÙJZ[ÌŠ
JJNØœ™XZÎØØ\ÙHÎœ‹œYÚ[˜][ÛYšK”YÙT™\ÜÛœÙK™XÛÙJZ[ÌŠ
JNØœ™XZÎØØ\ÙHœ‹Ý[]Z[

NØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]R]Š
NÜ™]\›ˆ\œ˜^Kš\Ð\œ˜^JOËÊI‰Š‹ÏYKË›X\
O’•™œ›ÛR”ÓÓŠ
JJK\œ˜^Kš\Ð\œ˜^JOË™\ÜÛœÙ\ÊI‰Š‹™\ÜÛœÙ\ÏYK™\ÜÛœÙ\Ë›X\
O\‹•™\ÜÛœÙK™œ›ÛR”ÓÓŠ
JJK
‹š\ÔÙ]
JKœYÚ[˜][ÛŠI‰Š‹œYÚ[˜][ÛYšK”YÙT™\ÜÛœÙK™œ›ÛR”ÓÓŠKœYÚ[˜][ÛŠJK
‹š\ÔÙ]
JKÝ[
I‰Š‹Ý[PšYÒ[
KÝ[ÔÝš[™Ê
JJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆKÏÛ‹ÏYKË›X\
OÒ•Ò”ÓÓŠ
N›ÚY
N›‹ÏV×KK™\ÜÛœÙ\ÏÛ‹™\ÜÛœÙ\ÏYK™\ÜÛœÙ\Ë›X\
OÐ\‹•™\ÜÛœÙKÒ”ÓÓŠ
N›ÚY
N›‹™\ÜÛœÙ\ÏV×KKœYÚ[˜][ÛˆOO]›ÚY	‰Š‹œYÚ[˜][ÛYKœYÚ[˜][ÛÙšK”YÙT™\ÜÛœÙKÒ”ÓÓŠKœYÚ[˜][ÛŠN›ÚY
KKÝ[OO]›ÚY	‰Š‹Ý[JKÝ[šYÒ[

JKÔÝš[™Ê
JKŸKœ›ÛT\X[
J^Û]R]Š
NÜ™]\›ˆ‹ÏYKÏË›X\
O’•™œ›ÛT\X[

J_×K‹™\ÜÛœÙ\ÏYK™\ÜÛœÙ\ÏË›X\
O\‹•™\ÜÛœÙK™œ›ÛT\X[

J_×KKœYÚ[˜][ÛˆOO]›ÚY	‰™KœYÚ[˜][ÛˆOO[[	‰Š‹œYÚ[˜][ÛYšK”YÙT™\ÜÛœÙK™œ›ÛT\X[
KœYÚ[˜][ÛŠJKKÝ[OO]›ÚY	‰™KÝ[OO[[	‰Š‹Ý[PšYÒ[
KÝ[ÔÝš[™Ê
JJKŸ_NÙ[˜Ý[ÛˆŠ
^Ü™]\›žÝž]\Î›™]ÈZ[\œ˜^K[ÙNŒ_^Kœ›ØYØ\Ý™\]Y\Ý^Ý\U\›ˆ‹ØÛÜÛ[ÜËŒX™]LKœ›ØYØ\Ý™\]Y\Ý‹[˜ÛÙJKSYKš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆKž]\Ë›[™ÝOOL	‰›‹Z[ÌŠL
K˜ž]\ÊKž]\ÊKK›[ÙHOOL	‰›‹Z[ÌŠMŠKš[ÌŠK›[ÙJKŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆYKš[˜\žT™XY\ÙN›™]ÈYKš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹ZŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹ž]\Ï]˜ž]\Ê
NØœ™XZÎØØ\ÙHŽœ‹›[ÙO]š[ÌŠ
NØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]ZŠ
NÜ™]\›Š‹š\ÔÙ]
JKž]\ÊI‰Š‹ž]\ÏJ‹˜ž]\Ñœ›ÛP˜\ÙM
JKž]\ÊJK
‹š\ÔÙ]
JK›[ÙJI‰Š‹›[ÙO^SJK›[ÙJJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆKž]\ÈOO]›ÚY	‰Š‹ž]\ÏJ‹˜˜\ÙMœ›ÛPž]\ÊJKž]\ÈOO]›ÚYÙKž]\Î›™]ÈZ[\œ˜^JJKK›[ÙHOO]›ÚY	‰Š‹›[ÙOP“JK›[ÙJJKŸKœ›ÛT\X[
J^Û]ZŠ
NÜ™]\›ˆ‹ž]\ÏYKž]\ÏÏÛ™]ÈZ[\œ˜^K‹›[ÙOYK›[ÙOÏÌŸ_NÙ[˜Ý[Ûˆ]Š
^Ü™]\›žÝ™\ÜÛœÙN›ÚY_^Kœ›ØYØ\Ý™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ[ÜËŒX™]LKœ›ØYØ\Ý™\ÜÛœÙH‹[˜ÛÙJKSYKš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK™\ÜÛœÙHOO]›ÚY	‰\‹•™\ÜÛœÙK™[˜ÛÙJK™\ÜÛœÙK‹Z[ÌŠL
K™›ÜšÊ
JK›[[J
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆYKš[˜\žT™XY\ÙN›™]ÈYKš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹^]Š
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÛÏŒÏOOLOÜ‹™\ÜÛœÙOP\‹•™\ÜÛœÙK™XÛÙJZ[ÌŠ
JNœÚÚ\\JÉÊ_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]^]Š
NÜ™]\›Š‹š\ÔÙ]
JK™\ÜÛœÙJI‰Š‹™\ÜÛœÙOP\‹•™\ÜÛœÙK™œ›ÛR”ÓÓŠK™\ÜÛœÙJJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK™\ÜÛœÙHOO]›ÚY	‰Š‹™\ÜÛœÙOYK™\ÜÛœÙOÐ\‹•™\ÜÛœÙKÒ”ÓÓŠK™\ÜÛœÙJN›ÚY
KŸKœ›ÛT\X[
J^Û]^]Š
NÜ™]\›ˆK™\ÜÛœÙHOO]›ÚY	‰™K™\ÜÛœÙHOO[[	‰Š‹™\ÜÛœÙOP\‹•™\ÜÛœÙK™œ›ÛT\X[
K™\ÜÛœÙJJKŸ_NÙ[˜Ý[ÛˆŠ
^Ü™]\›žÝ›ÚYž]\Î›™]ÈZ[\œ˜^__^K”Ú[][]T™\]Y\Ý^Ý\U\›ˆ‹ØÛÜÛ[ÜËŒX™]LK”Ú[][]T™\]Y\Ý‹[˜ÛÙJKSYKš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆKOO]›ÚY	‰’•™[˜ÛÙJK‹Z[ÌŠL
K™›ÜšÊ
JK›[[J
KKž]\Ë›[™ÝOOL	‰›‹Z[ÌŠN
K˜ž]\ÊKž]\ÊKŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆYKš[˜\žT™XY\ÙN›™]ÈYKš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹PŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹R•™XÛÙJZ[ÌŠ
JNØœ™XZÎØØ\ÙHŽœ‹ž]\Ï]˜ž]\Ê
NØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]PŠ
NÜ™]\›Š‹š\ÔÙ]
JK
I‰Š‹R•™œ›ÛR”ÓÓŠK
JK
‹š\ÔÙ]
JKž]\ÊI‰Š‹ž]\ÏJ‹˜ž]\Ñœ›ÛP˜\ÙM
JKž]\ÊJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆKOO]›ÚY	‰Š‹YKÒ•Ò”ÓÓŠK
N›ÚY
KKž]\ÈOO]›ÚY	‰Š‹ž]\ÏJ‹˜˜\ÙMœ›ÛPž]\ÊJKž]\ÈOO]›ÚYÙKž]\Î›™]ÈZ[\œ˜^JJKŸKœ›ÛT\X[
J^Û]PŠ
NÜ™]\›ˆKOO]›ÚY	‰™KOO[[	‰Š‹R•™œ›ÛT\X[
K
JK‹ž]\ÏYKž]\ÏÏÛ™]ÈZ[\œ˜^KŸ_NÙ[˜Ý[Ûˆ]Š
^Ü™]\›žÙØ\Ò[™›Î›ÚY™\Ý[›ÚY_^K”Ú[][]T™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ[ÜËŒX™]LK”Ú[][]T™\ÜÛœÙH‹[˜ÛÙJKSYKš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK™Ø\Ò[™›ÈOO]›ÚY	‰\‹‘Ø\Ò[™›Ë™[˜ÛÙJK™Ø\Ò[™›Ë‹Z[ÌŠL
K™›ÜšÊ
JK›[[J
KKœ™\Ý[OO]›ÚY	‰\‹”™\Ý[™[˜ÛÙJKœ™\Ý[‹Z[ÌŠN
K™›ÜšÊ
JK›[[J
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆYKš[˜\žT™XY\ÙN›™]ÈYKš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹[]Š
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹™Ø\Ò[™›ÏP\‹‘Ø\Ò[™›Ë™XÛÙJZ[ÌŠ
JNØœ™XZÎØØ\ÙHŽœ‹œ™\Ý[P\‹”™\Ý[™XÛÙJZ[ÌŠ
JNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û][]Š
NÜ™]\›Š‹š\ÔÙ]
JK™Ø\Ò[™›ÊI‰Š‹™Ø\Ò[™›ÏP\‹‘Ø\Ò[™›Ë™œ›ÛR”ÓÓŠK™Ø\Ò[™›ÊJK
‹š\ÔÙ]
JKœ™\Ý[
I‰Š‹œ™\Ý[P\‹”™\Ý[™œ›ÛR”ÓÓŠKœ™\Ý[
JKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK™Ø\Ò[™›ÈOO]›ÚY	‰Š‹™Ø\Ò[™›ÏYK™Ø\Ò[™›ÏÐ\‹‘Ø\Ò[™›ËÒ”ÓÓŠK™Ø\Ò[™›ÊN›ÚY
KKœ™\Ý[OO]›ÚY	‰Š‹œ™\Ý[YKœ™\Ý[Ð\‹”™\Ý[Ò”ÓÓŠKœ™\Ý[
N›ÚY
KŸKœ›ÛT\X[
J^Û][]Š
NÜ™]\›ˆK™Ø\Ò[™›ÈOO]›ÚY	‰™K™Ø\Ò[™›ÈOO[[	‰Š‹™Ø\Ò[™›ÏP\‹‘Ø\Ò[™›Ë™œ›ÛT\X[
K™Ø\Ò[™›ÊJKKœ™\Ý[OO]›ÚY	‰™Kœ™\Ý[OO[[	‰Š‹œ™\Ý[P\‹”™\Ý[™œ›ÛT\X[
Kœ™\Ý[
JKŸ_NÙ[˜Ý[ÛˆÝŠ
^Ü™]\›žÚ\ÚˆˆŸ_^K‘Ù]™\]Y\Ý^Ý\U\›ˆ‹ØÛÜÛ[ÜËŒX™]LK‘Ù]™\]Y\Ý‹[˜ÛÙJKSYKš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆKš\ÚOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊKš\Ú
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆYKš[˜\žT™XY\ÙN›™]ÈYKš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹PÝŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÛÏŒÏOOLOÜ‹š\Ú]œÝš[™Ê
NœÚÚ\\JÉÊ_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]PÝŠ
NÜ™]\›Š‹š\ÔÙ]
JKš\Ú
I‰Š‹š\ÚTÝš[™ÊKš\Ú
JKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆKš\ÚOO]›ÚY	‰Š‹š\ÚYKš\Ú
KŸKœ›ÛT\X[
J^Û]PÝŠ
NÜ™]\›ˆ‹š\ÚYKš\ÚÏÈˆ‹Ÿ_NÙ[˜Ý[ÛˆÝŠ
^Ü™]\›žÝ›ÚY™\ÜÛœÙN›ÚY_^K‘Ù]™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ[ÜËŒX™]LK‘Ù]™\ÜÛœÙH‹[˜ÛÙJKSYKš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆKOO]›ÚY	‰’•™[˜ÛÙJK‹Z[ÌŠL
K™›ÜšÊ
JK›[[J
KK™\ÜÛœÙHOO]›ÚY	‰\‹•™\ÜÛœÙK™[˜ÛÙJK™\ÜÛœÙK‹Z[ÌŠN
K™›ÜšÊ
JK›[[J
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆYKš[˜\žT™XY\ÙN›™]ÈYKš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹TÝŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹R•™XÛÙJZ[ÌŠ
JNØœ™XZÎØØ\ÙHŽœ‹™\ÜÛœÙOP\‹•™\ÜÛœÙK™XÛÙJZ[ÌŠ
JNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]TÝŠ
NÜ™]\›Š‹š\ÔÙ]
JK
I‰Š‹R•™œ›ÛR”ÓÓŠK
JK
‹š\ÔÙ]
JK™\ÜÛœÙJI‰Š‹™\ÜÛœÙOP\‹•™\ÜÛœÙK™œ›ÛR”ÓÓŠK™\ÜÛœÙJJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆKOO]›ÚY	‰Š‹YKÒ•Ò”ÓÓŠK
N›ÚY
KK™\ÜÛœÙHOO]›ÚY	‰Š‹™\ÜÛœÙOYK™\ÜÛœÙOÐ\‹•™\ÜÛœÙKÒ”ÓÓŠK™\ÜÛœÙJN›ÚY
KŸKœ›ÛT\X[
J^Û]TÝŠ
NÜ™]\›ˆKOO]›ÚY	‰™KOO[[	‰Š‹R•™œ›ÛT\X[
K
JKK™\ÜÛœÙHOO]›ÚY	‰™K™\ÜÛœÙHOO[[	‰Š‹™\ÜÛœÙOP\‹•™\ÜÛœÙK™œ›ÛT\X[
K™\ÜÛœÙJJKŸ_NÙ[˜Ý[ÛˆÝŠ
^Ü™]\›žÚZYÚšYÒ[

KYÚ[˜][ÛŽ›ÚY_^K‘Ù]›ØÚÕÚ]Ô™\]Y\Ý^Ý\U\›ˆ‹ØÛÜÛ[ÜËŒX™]LK‘Ù]›ØÚÕÚ]Ô™\]Y\Ý‹[˜ÛÙJKSYKš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆKšZYÚOOPšYÒ[

I‰›‹Z[ÌŠ
Kš[
KšZYÚ
KKœYÚ[˜][ÛˆOO]›ÚY	‰™šK”YÙT™\]Y\Ý™[˜ÛÙJKœYÚ[˜][Û‹‹Z[ÌŠN
K™›ÜšÊ
JK›[[J
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆYKš[˜\žT™XY\ÙN›™]ÈYKš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹ZÝŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹šZYÚ]š[

NØœ™XZÎØØ\ÙHŽœ‹œYÚ[˜][ÛYšK”YÙT™\]Y\Ý™XÛÙJZ[ÌŠ
JNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]ZÝŠ
NÜ™]\›Š‹š\ÔÙ]
JKšZYÚ
I‰Š‹šZYÚPšYÒ[
KšZYÚÔÝš[™Ê
JJK
‹š\ÔÙ]
JKœYÚ[˜][ÛŠI‰Š‹œYÚ[˜][ÛYšK”YÙT™\]Y\Ý™œ›ÛR”ÓÓŠKœYÚ[˜][ÛŠJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆKšZYÚOO]›ÚY	‰Š‹šZYÚJKšZYÚšYÒ[

JKÔÝš[™Ê
JKKœYÚ[˜][ÛˆOO]›ÚY	‰Š‹œYÚ[˜][ÛYKœYÚ[˜][ÛÙšK”YÙT™\]Y\ÝÒ”ÓÓŠKœYÚ[˜][ÛŠN›ÚY
KŸKœ›ÛT\X[
J^Û]ZÝŠ
NÜ™]\›ˆKšZYÚOO]›ÚY	‰™KšZYÚOO[[	‰Š‹šZYÚPšYÒ[
KšZYÚÔÝš[™Ê
JJKKœYÚ[˜][ÛˆOO]›ÚY	‰™KœYÚ[˜][ÛˆOO[[	‰Š‹œYÚ[˜][ÛYšK”YÙT™\]Y\Ý™œ›ÛT\X[
KœYÚ[˜][ÛŠJKŸ_NÙ[˜Ý[Ûˆ]Š
^Ü™]\›žÝÎ–×K›ØÚÒY›ÚY›ØÚÎ›ÚYYÚ[˜][ÛŽ›ÚY_^K‘Ù]›ØÚÕÚ]Ô™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ[ÜËŒX™]LK‘Ù]›ØÚÕÚ]Ô™\ÜÛœÙH‹[˜ÛÙJKSYKš[˜\žUÜš]\‹˜Ü™X]J
J^Ù›ÜŠ]ÙˆKÊR•™[˜ÛÙJ‹Z[ÌŠL
K™›ÜšÊ
JK›[[J
NÜ™]\›ˆK˜›ØÚÒYOO]›ÚY	‰Ë›ØÚÒQ™[˜ÛÙJK˜›ØÚÒY‹Z[ÌŠN
K™›ÜšÊ
JK›[[J
KK˜›ØÚÈOO]›ÚY	‰œ™Ë›ØÚË™[˜ÛÙJK˜›ØÚË‹Z[ÌŠŠK™›ÜšÊ
JK›[[J
KKœYÚ[˜][ÛˆOO]›ÚY	‰™šK”YÙT™\ÜÛœÙK™[˜ÛÙJKœYÚ[˜][Û‹‹Z[ÌŠÍ
K™›ÜšÊ
JK›[[J
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆYKš[˜\žT™XY\ÙN›™]ÈYKš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹Q]Š
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹Ëœ\Ú
•™XÛÙJZ[ÌŠ
JJNØœ™XZÎØØ\ÙHŽœ‹˜›ØÚÒY]Ë›ØÚÒQ™XÛÙJZ[ÌŠ
JNØœ™XZÎØØ\ÙHÎœ‹˜›ØÚÏ\™Ë›ØÚË™XÛÙJZ[ÌŠ
JNØœ™XZÎØØ\ÙHœ‹œYÚ[˜][ÛYšK”YÙT™\ÜÛœÙK™XÛÙJZ[ÌŠ
JNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]Q]Š
NÜ™]\›ˆ\œ˜^Kš\Ð\œ˜^JOËÊI‰Š‹ÏYKË›X\
O’•™œ›ÛR”ÓÓŠ
JJK
‹š\ÔÙ]
JK˜›ØÚÒY
I‰Š‹˜›ØÚÒY]Ë›ØÚÒQ™œ›ÛR”ÓÓŠK˜›ØÚÒY
JK
‹š\ÔÙ]
JK˜›ØÚÊI‰Š‹˜›ØÚÏ\™Ë›ØÚË™œ›ÛR”ÓÓŠK˜›ØÚÊJK
‹š\ÔÙ]
JKœYÚ[˜][ÛŠI‰Š‹œYÚ[˜][ÛYšK”YÙT™\ÜÛœÙK™œ›ÛR”ÓÓŠKœYÚ[˜][ÛŠJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆKÏÛ‹ÏYKË›X\
OÒ•Ò”ÓÓŠ
N›ÚY
N›‹ÏV×KK˜›ØÚÒYOO]›ÚY	‰Š‹˜›ØÚÒYYK˜›ØÚÒYÝË›ØÚÒQÒ”ÓÓŠK˜›ØÚÒY
N›ÚY
KK˜›ØÚÈOO]›ÚY	‰Š‹˜›ØÚÏYK˜›ØÚÏÜ™Ë›ØÚËÒ”ÓÓŠK˜›ØÚÊN›ÚY
KKœYÚ[˜][ÛˆOO]›ÚY	‰Š‹œYÚ[˜][ÛYKœYÚ[˜][ÛÙšK”YÙT™\ÜÛœÙKÒ”ÓÓŠKœYÚ[˜][ÛŠN›ÚY
KŸKœ›ÛT\X[
J^Û]Q]Š
NÜ™]\›ˆ‹ÏYKÏË›X\
O’•™œ›ÛT\X[

J_×KK˜›ØÚÒYOO]›ÚY	‰™K˜›ØÚÒYOO[[	‰Š‹˜›ØÚÒY]Ë›ØÚÒQ™œ›ÛT\X[
K˜›ØÚÒY
JKK˜›ØÚÈOO]›ÚY	‰™K˜›ØÚÈOO[[	‰Š‹˜›ØÚÏ\™Ë›ØÚË™œ›ÛT\X[
K˜›ØÚÊJKKœYÚ[˜][ÛˆOO]›ÚY	‰™KœYÚ[˜][ÛˆOO[[	‰Š‹œYÚ[˜][ÛYšK”YÙT™\ÜÛœÙK™œ›ÛT\X[
KœYÚ[˜][ÛŠJKŸ_NÙ[˜Ý[Ûˆ]Š
^Ü™]\›žÝž]\Î›™]ÈZ[\œ˜^__^K•XÛÙT™\]Y\Ý^Ý\U\›ˆ‹ØÛÜÛ[ÜËŒX™]LK•XÛÙT™\]Y\Ý‹[˜ÛÙJKSYKš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆKž]\Ë›[™ÝOOL	‰›‹Z[ÌŠL
K˜ž]\ÊKž]\ÊKŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆYKš[˜\žT™XY\ÙN›™]ÈYKš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹T]Š
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÛÏŒÏOOLOÜ‹ž]\Ï]˜ž]\Ê
NœÚÚ\\JÉÊ_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]T]Š
NÜ™]\›Š‹š\ÔÙ]
JKž]\ÊI‰Š‹ž]\ÏJ‹˜ž]\Ñœ›ÛP˜\ÙM
JKž]\ÊJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆKž]\ÈOO]›ÚY	‰Š‹ž]\ÏJ‹˜˜\ÙMœ›ÛPž]\ÊJKž]\ÈOO]›ÚYÙKž]\Î›™]ÈZ[\œ˜^JJKŸKœ›ÛT\X[
J^Û]T]Š
NÜ™]\›ˆ‹ž]\ÏYKž]\ÏÏÛ™]ÈZ[\œ˜^KŸ_NÙ[˜Ý[ÛˆÝŠ
^Ü™]\›žÝ›ÚY_^K•XÛÙT™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ[ÜËŒX™]LK•XÛÙT™\ÜÛœÙH‹[˜ÛÙJKSYKš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆKOO]›ÚY	‰’•™[˜ÛÙJK‹Z[ÌŠL
K™›ÜšÊ
JK›[[J
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆYKš[˜\žT™XY\ÙN›™]ÈYKš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹]ÝŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÛÏŒÏOOLOÜ‹R•™XÛÙJZ[ÌŠ
JNœÚÚ\\JÉÊ_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]]ÝŠ
NÜ™]\›Š‹š\ÔÙ]
JK
I‰Š‹R•™œ›ÛR”ÓÓŠK
JKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆKOO]›ÚY	‰Š‹YKÒ•Ò”ÓÓŠK
N›ÚY
KŸKœ›ÛT\X[
J^Û]]ÝŠ
NÜ™]\›ˆKOO]›ÚY	‰™KOO[[	‰Š‹R•™œ›ÛT\X[
K
JKŸ_NÙ[˜Ý[ÛˆŠ
^Ü™]\›žÝ›ÚY_^K•[˜ÛÙT™\]Y\Ý^Ý\U\›ˆ‹ØÛÜÛ[ÜËŒX™]LK•[˜ÛÙT™\]Y\Ý‹[˜ÛÙJKSYKš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆKOO]›ÚY	‰’•™[˜ÛÙJK‹Z[ÌŠL
K™›ÜšÊ
JK›[[J
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆYKš[˜\žT™XY\ÙN›™]ÈYKš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹XŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÛÏŒÏOOLOÜ‹R•™XÛÙJZ[ÌŠ
JNœÚÚ\\JÉÊ_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]XŠ
NÜ™]\›Š‹š\ÔÙ]
JK
I‰Š‹R•™œ›ÛR”ÓÓŠK
JKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆKOO]›ÚY	‰Š‹YKÒ•Ò”ÓÓŠK
N›ÚY
KŸKœ›ÛT\X[
J^Û]XŠ
NÜ™]\›ˆKOO]›ÚY	‰™KOO[[	‰Š‹R•™œ›ÛT\X[
K
JKŸ_NÙ[˜Ý[ÛˆŠ
^Ü™]\›žÝž]\Î›™]ÈZ[\œ˜^__^K•[˜ÛÙT™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ[ÜËŒX™]LK•[˜ÛÙT™\ÜÛœÙH‹[˜ÛÙJKSYKš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆKž]\Ë›[™ÝOOL	‰›‹Z[ÌŠL
K˜ž]\ÊKž]\ÊKŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆYKš[˜\žT™XY\ÙN›™]ÈYKš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹TŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÛÏŒÏOOLOÜ‹ž]\Ï]˜ž]\Ê
NœÚÚ\\JÉÊ_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]TŠ
NÜ™]\›Š‹š\ÔÙ]
JKž]\ÊI‰Š‹ž]\ÏJ‹˜ž]\Ñœ›ÛP˜\ÙM
JKž]\ÊJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆKž]\ÈOO]›ÚY	‰Š‹ž]\ÏJ‹˜˜\ÙMœ›ÛPž]\ÊJKž]\ÈOO]›ÚYÙKž]\Î›™]ÈZ[\œ˜^JJKŸKœ›ÛT\X[
J^Û]TŠ
NÜ™]\›ˆ‹ž]\ÏYKž]\ÏÏÛ™]ÈZ[\œ˜^KŸ_NÙ[˜Ý[ÛˆŠ
^Ü™]\›žØ[Z[›ÒœÛÛŽˆˆŸ_^K•[˜ÛÙP[Z[›Ô™\]Y\Ý^Ý\U\›ˆ‹ØÛÜÛ[ÜËŒX™]LK•[˜ÛÙP[Z[›Ô™\]Y\Ý‹[˜ÛÙJKSYKš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK˜[Z[›ÒœÛÛˆOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊK˜[Z[›ÒœÛÛŠKŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆYKš[˜\žT™XY\ÙN›™]ÈYKš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹TŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÛÏŒÏOOLOÜ‹˜[Z[›ÒœÛÛ]œÝš[™Ê
NœÚÚ\\JÉÊ_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]TŠ
NÜ™]\›Š‹š\ÔÙ]
JK˜[Z[›ÒœÛÛŠI‰Š‹˜[Z[›ÒœÛÛTÝš[™ÊK˜[Z[›ÒœÛÛŠJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK˜[Z[›ÒœÛÛˆOO]›ÚY	‰Š‹˜[Z[›ÒœÛÛYK˜[Z[›ÒœÛÛŠKŸKœ›ÛT\X[
J^Û]TŠ
NÜ™]\›ˆ‹˜[Z[›ÒœÛÛYK˜[Z[›ÒœÛÛÏÈˆ‹Ÿ_NÙ[˜Ý[ÛˆŠ
^Ü™]\›žØ[Z[›Ðš[˜\žN›™]ÈZ[\œ˜^__^K•[˜ÛÙP[Z[›Ô™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ[ÜËŒX™]LK•[˜ÛÙP[Z[›Ô™\ÜÛœÙH‹[˜ÛÙJKSYKš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK˜[Z[›Ðš[˜\žK›[™ÝOOL	‰›‹Z[ÌŠL
K˜ž]\ÊK˜[Z[›Ðš[˜\žJKŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆYKš[˜\žT™XY\ÙN›™]ÈYKš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹SŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÛÏŒÏOOLOÜ‹˜[Z[›Ðš[˜\žO]˜ž]\Ê
NœÚÚ\\JÉÊ_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]SŠ
NÜ™]\›Š‹š\ÔÙ]
JK˜[Z[›Ðš[˜\žJI‰Š‹˜[Z[›Ðš[˜\žOJ‹˜ž]\Ñœ›ÛP˜\ÙM
JK˜[Z[›Ðš[˜\žJJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK˜[Z[›Ðš[˜\žHOO]›ÚY	‰Š‹˜[Z[›Ðš[˜\žOJ‹˜˜\ÙMœ›ÛPž]\ÊJK˜[Z[›Ðš[˜\žHOO]›ÚYÙK˜[Z[›Ðš[˜\žN›™]ÈZ[\œ˜^JJKŸKœ›ÛT\X[
J^Û]SŠ
NÜ™]\›ˆ‹˜[Z[›Ðš[˜\žOYK˜[Z[›Ðš[˜\žOÏÛ™]ÈZ[\œ˜^KŸ_NÙ[˜Ý[ÛˆŠ
^Ü™]\›žØ[Z[›Ðš[˜\žN›™]ÈZ[\œ˜^__^K•XÛÙP[Z[›Ô™\]Y\Ý^Ý\U\›ˆ‹ØÛÜÛ[ÜËŒX™]LK•XÛÙP[Z[›Ô™\]Y\Ý‹[˜ÛÙJKSYKš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK˜[Z[›Ðš[˜\žK›[™ÝOOL	‰›‹Z[ÌŠL
K˜ž]\ÊK˜[Z[›Ðš[˜\žJKŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆYKš[˜\žT™XY\ÙN›™]ÈYKš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹]Š
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÛÏŒÏOOLOÜ‹˜[Z[›Ðš[˜\žO]˜ž]\Ê
NœÚÚ\\JÉÊ_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]]Š
NÜ™]\›Š‹š\ÔÙ]
JK˜[Z[›Ðš[˜\žJI‰Š‹˜[Z[›Ðš[˜\žOJ‹˜ž]\Ñœ›ÛP˜\ÙM
JK˜[Z[›Ðš[˜\žJJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK˜[Z[›Ðš[˜\žHOO]›ÚY	‰Š‹˜[Z[›Ðš[˜\žOJ‹˜˜\ÙMœ›ÛPž]\ÊJK˜[Z[›Ðš[˜\žHOO]›ÚYÙK˜[Z[›Ðš[˜\žN›™]ÈZ[\œ˜^JJKŸKœ›ÛT\X[
J^Û]]Š
NÜ™]\›ˆ‹˜[Z[›Ðš[˜\žOYK˜[Z[›Ðš[˜\žOÏÛ™]ÈZ[\œ˜^KŸ_NÙ[˜Ý[ÛˆÝŠ
^Ü™]\›žØ[Z[›ÒœÛÛŽˆˆŸ_^K•XÛÙP[Z[›Ô™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ[ÜËŒX™]LK•XÛÙP[Z[›Ô™\ÜÛœÙH‹[˜ÛÙJKSYKš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK˜[Z[›ÒœÛÛˆOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊK˜[Z[›ÒœÛÛŠKŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆYKš[˜\žT™XY\ÙN›™]ÈYKš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹SÝŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÛÏŒÏOOLOÜ‹˜[Z[›ÒœÛÛ]œÝš[™Ê
NœÚÚ\\JÉÊ_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]SÝŠ
NÜ™]\›Š‹š\ÔÙ]
JK˜[Z[›ÒœÛÛŠI‰Š‹˜[Z[›ÒœÛÛTÝš[™ÊK˜[Z[›ÒœÛÛŠJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK˜[Z[›ÒœÛÛˆOO]›ÚY	‰Š‹˜[Z[›ÒœÛÛYK˜[Z[›ÒœÛÛŠKŸKœ›ÛT\X[
J^Û]SÝŠ
NÜ™]\›ˆ‹˜[Z[›ÒœÛÛYK˜[Z[›ÒœÛÛÏÈˆ‹Ÿ_NÝ˜\ˆXÛ\ÜÞÜœÎØÛÛœÝXÝÜŠŠ^Ý\ËœœÏ[‹\Ë”Ú[][]O]\Ë”Ú[][]K˜š[™
\ÊK\Ë‘Ù]]\Ë‘Ù]˜š[™
\ÊK\Ëœ›ØYØ\Ý]\Ëœ›ØYØ\Ý˜š[™
\ÊK\Ë‘Ù]Ñ]™[]\Ë‘Ù]Ñ]™[˜š[™
\ÊK\Ë‘Ù]›ØÚÕÚ]Ï]\Ë‘Ù]›ØÚÕÚ]Ë˜š[™
\ÊK\Ë•XÛÙO]\Ë•XÛÙK˜š[™
\ÊK\Ë•[˜ÛÙO]\Ë•[˜ÛÙK˜š[™
\ÊK\Ë•[˜ÛÙP[Z[›Ï]\Ë•[˜ÛÙP[Z[›Ë˜š[™
\ÊK\Ë•XÛÙP[Z[›Ï]\Ë•XÛÙP[Z[›Ë˜š[™
\Ê_TÚ[][]JŠ^Û]^K”Ú[][]T™\]Y\Ý™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ[ÜËŒX™]LK”Ù\šXÙH‹”Ú[][]H‹
K[ŠOžK”Ú[][]T™\ÜÛœÙK™XÛÙJ™]ÈYKš[˜\žT™XY\ŠŠJJ_QÙ]
Š^Û]^K‘Ù]™\]Y\Ý™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ[ÜËŒX™]LK”Ù\šXÙH‹‘Ù]‹
K[ŠOžK‘Ù]™\ÜÛœÙK™XÛÙJ™]ÈYKš[˜\žT™XY\ŠŠJJ_Pœ›ØYØ\Ý
Š^Û]^Kœ›ØYØ\Ý™\]Y\Ý™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ[ÜËŒX™]LK”Ù\šXÙH‹œ›ØYØ\Ý‹
K[ŠOžKœ›ØYØ\Ý™\ÜÛœÙK™XÛÙJ™]ÈYKš[˜\žT™XY\ŠŠJJ_QÙ]Ñ]™[
Š^Û]^K‘Ù]Ñ]™[™\]Y\Ý™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ[ÜËŒX™]LK”Ù\šXÙH‹‘Ù]Ñ]™[‹
K[ŠOžK‘Ù]Ñ]™[™\ÜÛœÙK™XÛÙJ™]ÈYKš[˜\žT™XY\ŠŠJJ_QÙ]›ØÚÕÚ]ÊŠ^Û]^K‘Ù]›ØÚÕÚ]Ô™\]Y\Ý™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ[ÜËŒX™]LK”Ù\šXÙH‹‘Ù]›ØÚÕÚ]È‹
K[ŠOžK‘Ù]›ØÚÕÚ]Ô™\ÜÛœÙK™XÛÙJ™]ÈYKš[˜\žT™XY\ŠŠJJ_UXÛÙJŠ^Û]^K•XÛÙT™\]Y\Ý™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ[ÜËŒX™]LK”Ù\šXÙH‹•XÛÙH‹
K[ŠOžK•XÛÙT™\ÜÛœÙK™XÛÙJ™]ÈYKš[˜\žT™XY\ŠŠJJ_U[˜ÛÙJŠ^Û]^K•[˜ÛÙT™\]Y\Ý™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ[ÜËŒX™]LK”Ù\šXÙH‹•[˜ÛÙH‹
K[ŠOžK•[˜ÛÙT™\ÜÛœÙK™XÛÙJ™]ÈYKš[˜\žT™XY\ŠŠJJ_U[˜ÛÙP[Z[›ÊŠ^Û]^K•[˜ÛÙP[Z[›Ô™\]Y\Ý™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ[ÜËŒX™]LK”Ù\šXÙH‹•[˜ÛÙP[Z[›È‹
K[ŠOžK•[˜ÛÙP[Z[›Ô™\ÜÛœÙK™XÛÙJ™]ÈYKš[˜\žT™XY\ŠŠJJ_UXÛÙP[Z[›ÊŠ^Û]^K•XÛÙP[Z[›Ô™\]Y\Ý™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ[ÜËŒX™]LK”Ù\šXÙH‹•XÛÙP[Z[›È‹
K[ŠOžK•XÛÙP[Z[›Ô™\ÜÛœÙK™XÛÙJ™]ÈYKš[˜\žT™XY\ŠŠJJ__NÞK”Ù\šXÙPÛY[[\QŸJNÝ˜\ˆÓORJ]OžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\J]‹—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÕ]‹œÙ]\^[œÚ[ÛQ–Ý˜\ˆ]Ù

K]ÝJ
KÓO[SJ
KYÏVY

K–Y›Ê
NÙ[˜Ý[Ûˆ–
J^Û]J–˜Ü™X]T›ÝØY”œÐÛY[
JJK[™]ÈÓK”Ù\šXÙPÛY[[\
ŠNÜ™]\›žÝžÙÙ]˜\Þ[˜ÈOOžÛ]^Ú\Úš_NÜ™]\›ˆ]ØZ]‘Ù]
Š_KÚ[][]N˜\Þ[˜ÊK‹ËJOOžÛ]ÏZYË•™œ›ÛT\X[
Ø]][™›ÎšYË]][™›Ë™œ›ÛT\X[
Ù™YNšYË‘™YK™œ›ÛT\X[
ßJKÚYÛ™\’[™›ÜÎ–ÞÜX›XÒÙ^NŠ™[˜ÛÙTXšÙ^JJÊKÙ\]Y[˜ÙNšYÒ[
JK[ÙR[™›ÎžÜÚ[™ÛNžÛ[ÙN•”ÚYÛ“[ÙK”ÒQÓ—ÓSÑWÕS”ÔPÒQ’QQ__W_JK›ÙNšYË•›ÙK™œ›ÛT\X[
ÛY\ÜØYÙ\Î\œ˜^K™œ›ÛJJKY[[ÎœŸJKÚYÛ˜]\™\Î–Û™]ÈZ[\œ˜^W_JKPÓK”Ú[][]T™\]Y\Ý™œ›ÛT\X[
Ýž]\ÎšYË•™[˜ÛÙJÊK™š[š\Ú

_JNÜ™]\›ˆ]ØZ]”Ú[][]J
_____JNÝ˜\ˆÓORJšOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\Jš—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÐšš\Ð[Z[›Ó\ÙÐÜ™X]U™\Ý[™ÐXØÛÝ[\VÐš˜Ü™X]U™\Ý[™Ð[Z[›ÐÛÛ™\\œÏRÙ[˜Ý[ÛˆV
J^Ü™]\›ˆK\OOOH˜ÛÜÛ[ÜË\ÙËÓ\ÙÐÜ™X]U™\Ý[™ÐXØÛÝ[ŸY[˜Ý[Ûˆ

^Ü™]\›žÈ‹ØÛÜÛ[ÜË™\Ý[™ËŒX™]LK“\ÙÐÜ™X]U™\Ý[™ÐXØÛÝ[ŽžØ[Z[›Õ\Nˆ˜ÛÜÛ[ÜË\ÙËÓ\ÙÐÜ™X]U™\Ý[™ÐXØÛÝ[‹Ð[Z[›ÎŠÙœ›ÛPY™\ÜÎ™KÐY™\ÜÎ›‹[[Ý[[™[YNšK[^YYœŸJOOŠÙœ›ÛWØY™\ÜÎ™K×ØY™\ÜÎ›‹[[Ý[–Ë‹‹K[™Ý[YNšKÔÝš[™Ê
K[^YYœŸJKœ›ÛP[Z[›ÎŠÙœ›ÛWØY™\ÜÎ™K×ØY™\ÜÎ›‹[[Ý[[™Ý[YNšK[^YYœŸJOOŠÙœ›ÛPY™\ÜÎ™KÐY™\ÜÎ›‹[[Ý[–Ë‹‹K[™[YNšYÒ[
JK[^YYœŸJ____JNÝ˜\ˆSORJ\OžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\J\‹—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÔ\‹“\ÙÐÛY[[\T\‹“\ÙÐÜ™X]T\š[ÙXÕ™\Ý[™ÐXØÛÝ[™\ÜÛœÙOT\‹“\ÙÐÜ™X]T\š[ÙXÕ™\Ý[™ÐXØÛÝ[T\‹“\ÙÐÜ™X]T\›X[™[ØÚÙYXØÛÝ[™\ÜÛœÙOT\‹“\ÙÐÜ™X]T\›X[™[ØÚÙYXØÛÝ[T\‹“\ÙÐÜ™X]U™\Ý[™ÐXØÛÝ[™\ÜÛœÙOT\‹“\ÙÐÜ™X]U™\Ý[™ÐXØÛÝ[T\‹œ›ÝØY”XÚØYÙO]›ÚYÝ˜\ˆYQŠ
KÙÏXTÊ
KZOPÙJ
KQYJ
NÔ\‹œ›ÝØY”XÚØYÙOH˜ÛÜÛ[ÜË™\Ý[™ËŒX™]LHŽÙ[˜Ý[ÛˆŠ
^Ü™]\›žÙœ›ÛPY™\ÜÎˆˆ‹ÐY™\ÜÎˆˆ‹[[Ý[–×K[™[YNšYÒ[

K[^YYˆL__T\‹“\ÙÐÜ™X]U™\Ý[™ÐXØÛÝ[^Ý\U\›ˆ‹ØÛÜÛ[ÜË™\Ý[™ËŒX™]LK“\ÙÐÜ™X]U™\Ý[™ÐXØÛÝ[‹[˜ÛÙJKYZKš[˜\žUÜš]\‹˜Ü™X]J
J^ÙK™œ›ÛPY™\ÜÈOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊK™œ›ÛPY™\ÜÊKKÐY™\ÜÈOOHˆ‰‰›‹Z[ÌŠN
KœÝš[™ÊKÐY™\ÜÊNÙ›ÜŠ]ÙˆK˜[[Ý[
YYÛÚ[‹™[˜ÛÙJ‹Z[ÌŠŠK™›ÜšÊ
JK›[[J
NÜ™]\›ˆK™[™[YHOOPšYÒ[

I‰›‹Z[ÌŠÌŠKš[
K™[™[YJKK™[^YYOOHL	‰›‹Z[ÌŠ
K˜›ÛÛ
K™[^YY
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆZKš[˜\žT™XY\ÙN›™]ÈZKš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹^Š
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹™œ›ÛPY™\ÜÏ]œÝš[™Ê
NØœ™XZÎØØ\ÙHŽœ‹ÐY™\ÜÏ]œÝš[™Ê
NØœ™XZÎØØ\ÙHÎœ‹˜[[Ý[œ\Ú
YÛÚ[‹™XÛÙJZ[ÌŠ
JJNØœ™XZÎØØ\ÙHœ‹™[™[YO]š[

NØœ™XZÎØØ\ÙHNœ‹™[^YY]˜›ÛÛ

NØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]^Š
NÜ™]\›Šš\ÔÙ]
JK™œ›ÛPY™\ÜÊI‰Š‹™œ›ÛPY™\ÜÏTÝš[™ÊK™œ›ÛPY™\ÜÊJK
š\ÔÙ]
JKÐY™\ÜÊI‰Š‹ÐY™\ÜÏTÝš[™ÊKÐY™\ÜÊJK\œ˜^Kš\Ð\œ˜^JOË˜[[Ý[
I‰Š‹˜[[Ý[YK˜[[Ý[›X\
O™YÛÚ[‹™œ›ÛR”ÓÓŠ
JJK
š\ÔÙ]
JK™[™[YJI‰Š‹™[™[YOPšYÒ[
K™[™[YKÔÝš[™Ê
JJK
š\ÔÙ]
JK™[^YY
I‰Š‹™[^YYHHYK™[^YY
KŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK™œ›ÛPY™\ÜÈOO]›ÚY	‰Š‹™œ›ÛPY™\ÜÏYK™œ›ÛPY™\ÜÊKKÐY™\ÜÈOO]›ÚY	‰Š‹ÐY™\ÜÏYKÐY™\ÜÊKK˜[[Ý[Û‹˜[[Ý[YK˜[[Ý[›X\
OÙYÛÚ[‹Ò”ÓÓŠ
N›ÚY
N›‹˜[[Ý[V×KK™[™[YHOO]›ÚY	‰Š‹™[™[YOJK™[™[Y_šYÒ[

JKÔÝš[™Ê
JKK™[^YYOO]›ÚY	‰Š‹™[^YYYK™[^YY
KŸKœ›ÛT\X[
J^Û]^Š
NÜ™]\›ˆ‹™œ›ÛPY™\ÜÏYK™œ›ÛPY™\ÜÏÏÈˆ‹‹ÐY™\ÜÏYKÐY™\ÜÏÏÈˆ‹‹˜[[Ý[YK˜[[Ý[Ë›X\
O™YÛÚ[‹™œ›ÛT\X[

J_×KK™[™[YHOO]›ÚY	‰™K™[™[YHOO[[	‰Š‹™[™[YOPšYÒ[
K™[™[YKÔÝš[™Ê
JJK‹™[^YYYK™[^YYÏÈLKŸ_NÙ[˜Ý[ÛˆŠ
^Ü™]\›žß_T\‹“\ÙÐÜ™X]U™\Ý[™ÐXØÛÝ[™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ[ÜË™\Ý[™ËŒX™]LK“\ÙÐÜ™X]U™\Ý[™ÐXØÛÝ[™\ÜÛœÙH‹[˜ÛÙJKYZKš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆZKš[˜\žT™XY\ÙN›™]ÈZKš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹UŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Ü™]\›ˆŠ
_KÒ”ÓÓŠJ^Ü™]\›žß_Kœ›ÛT\X[
J^Ü™]\›ˆŠ
__NÙ[˜Ý[ÛˆŠ
^Ü™]\›žÙœ›ÛPY™\ÜÎˆˆ‹ÐY™\ÜÎˆˆ‹[[Ý[–×__T\‹“\ÙÐÜ™X]T\›X[™[ØÚÙYXØÛÝ[^Ý\U\›ˆ‹ØÛÜÛ[ÜË™\Ý[™ËŒX™]LK“\ÙÐÜ™X]T\›X[™[ØÚÙYXØÛÝ[‹[˜ÛÙJKYZKš[˜\žUÜš]\‹˜Ü™X]J
J^ÙK™œ›ÛPY™\ÜÈOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊK™œ›ÛPY™\ÜÊKKÐY™\ÜÈOOHˆ‰‰›‹Z[ÌŠN
KœÝš[™ÊKÐY™\ÜÊNÙ›ÜŠ]ÙˆK˜[[Ý[
YYÛÚ[‹™[˜ÛÙJ‹Z[ÌŠŠK™›ÜšÊ
JK›[[J
NÜ™]\›ˆŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆZKš[˜\žT™XY\ÙN›™]ÈZKš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹RŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹™œ›ÛPY™\ÜÏ]œÝš[™Ê
NØœ™XZÎØØ\ÙHŽœ‹ÐY™\ÜÏ]œÝš[™Ê
NØœ™XZÎØØ\ÙHÎœ‹˜[[Ý[œ\Ú
YÛÚ[‹™XÛÙJZ[ÌŠ
JJNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]RŠ
NÜ™]\›Šš\ÔÙ]
JK™œ›ÛPY™\ÜÊI‰Š‹™œ›ÛPY™\ÜÏTÝš[™ÊK™œ›ÛPY™\ÜÊJK
š\ÔÙ]
JKÐY™\ÜÊI‰Š‹ÐY™\ÜÏTÝš[™ÊKÐY™\ÜÊJK\œ˜^Kš\Ð\œ˜^JOË˜[[Ý[
I‰Š‹˜[[Ý[YK˜[[Ý[›X\
O™YÛÚ[‹™œ›ÛR”ÓÓŠ
JJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK™œ›ÛPY™\ÜÈOO]›ÚY	‰Š‹™œ›ÛPY™\ÜÏYK™œ›ÛPY™\ÜÊKKÐY™\ÜÈOO]›ÚY	‰Š‹ÐY™\ÜÏYKÐY™\ÜÊKK˜[[Ý[Û‹˜[[Ý[YK˜[[Ý[›X\
OÙYÛÚ[‹Ò”ÓÓŠ
N›ÚY
N›‹˜[[Ý[V×KŸKœ›ÛT\X[
J^Û]RŠ
NÜ™]\›ˆ‹™œ›ÛPY™\ÜÏYK™œ›ÛPY™\ÜÏÏÈˆ‹‹ÐY™\ÜÏYKÐY™\ÜÏÏÈˆ‹‹˜[[Ý[YK˜[[Ý[Ë›X\
O™YÛÚ[‹™œ›ÛT\X[

J_×KŸ_NÙ[˜Ý[ÛˆŠ
^Ü™]\›žß_T\‹“\ÙÐÜ™X]T\›X[™[ØÚÙYXØÛÝ[™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ[ÜË™\Ý[™ËŒX™]LK“\ÙÐÜ™X]T\›X[™[ØÚÙYXØÛÝ[™\ÜÛœÙH‹[˜ÛÙJKYZKš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆZKš[˜\žT™XY\ÙN›™]ÈZKš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹QŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Ü™]\›ˆŠ
_KÒ”ÓÓŠJ^Ü™]\›žß_Kœ›ÛT\X[
J^Ü™]\›ˆŠ
__NÙ[˜Ý[Ûˆ]Š
^Ü™]\›žÙœ›ÛPY™\ÜÎˆˆ‹ÐY™\ÜÎˆˆ‹Ý\[YNšYÒ[

K™\Ý[™Ô\š[ÙÎ–×__T\‹“\ÙÐÜ™X]T\š[ÙXÕ™\Ý[™ÐXØÛÝ[^Ý\U\›ˆ‹ØÛÜÛ[ÜË™\Ý[™ËŒX™]LK“\ÙÐÜ™X]T\š[ÙXÕ™\Ý[™ÐXØÛÝ[‹[˜ÛÙJKYZKš[˜\žUÜš]\‹˜Ü™X]J
J^ÙK™œ›ÛPY™\ÜÈOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊK™œ›ÛPY™\ÜÊKKÐY™\ÜÈOOHˆ‰‰›‹Z[ÌŠN
KœÝš[™ÊKÐY™\ÜÊKKœÝ\[YHOOPšYÒ[

I‰›‹Z[ÌŠ
Kš[
KœÝ\[YJNÙ›ÜŠ]ÙˆK™\Ý[™Ô\š[ÙÊ[ÙË”\š[Ù™[˜ÛÙJ‹Z[ÌŠÍ
K™›ÜšÊ
JK›[[J
NÜ™]\›ˆŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆZKš[˜\žT™XY\ÙN›™]ÈZKš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹\]Š
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹™œ›ÛPY™\ÜÏ]œÝš[™Ê
NØœ™XZÎØØ\ÙHŽœ‹ÐY™\ÜÏ]œÝš[™Ê
NØœ™XZÎØØ\ÙHÎœ‹œÝ\[YO]š[

NØœ™XZÎØØ\ÙHœ‹™\Ý[™Ô\š[ÙËœ\Ú
ÙË”\š[Ù™XÛÙJZ[ÌŠ
JJNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]\]Š
NÜ™]\›Šš\ÔÙ]
JK™œ›ÛPY™\ÜÊI‰Š‹™œ›ÛPY™\ÜÏTÝš[™ÊK™œ›ÛPY™\ÜÊJK
š\ÔÙ]
JKÐY™\ÜÊI‰Š‹ÐY™\ÜÏTÝš[™ÊKÐY™\ÜÊJK
š\ÔÙ]
JKœÝ\[YJI‰Š‹œÝ\[YOPšYÒ[
KœÝ\[YKÔÝš[™Ê
JJK\œ˜^Kš\Ð\œ˜^JOË™\Ý[™Ô\š[ÙÊI‰Š‹™\Ý[™Ô\š[ÙÏYK™\Ý[™Ô\š[ÙË›X\
O›ÙË”\š[Ù™œ›ÛR”ÓÓŠ
JJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK™œ›ÛPY™\ÜÈOO]›ÚY	‰Š‹™œ›ÛPY™\ÜÏYK™œ›ÛPY™\ÜÊKKÐY™\ÜÈOO]›ÚY	‰Š‹ÐY™\ÜÏYKÐY™\ÜÊKKœÝ\[YHOO]›ÚY	‰Š‹œÝ\[YOJKœÝ\[Y_šYÒ[

JKÔÝš[™Ê
JKK™\Ý[™Ô\š[ÙÏÛ‹™\Ý[™Ô\š[ÙÏYK™\Ý[™Ô\š[ÙË›X\
OÛÙË”\š[ÙÒ”ÓÓŠ
N›ÚY
N›‹™\Ý[™Ô\š[ÙÏV×KŸKœ›ÛT\X[
J^Û]\]Š
NÜ™]\›ˆ‹™œ›ÛPY™\ÜÏYK™œ›ÛPY™\ÜÏÏÈˆ‹‹ÐY™\ÜÏYKÐY™\ÜÏÏÈˆ‹KœÝ\[YHOO]›ÚY	‰™KœÝ\[YHOO[[	‰Š‹œÝ\[YOPšYÒ[
KœÝ\[YKÔÝš[™Ê
JJK‹™\Ý[™Ô\š[ÙÏYK™\Ý[™Ô\š[ÙÏË›X\
O›ÙË”\š[Ù™œ›ÛT\X[

J_×KŸ_NÙ[˜Ý[ÛˆŠ
^Ü™]\›žß_T\‹“\ÙÐÜ™X]T\š[ÙXÕ™\Ý[™ÐXØÛÝ[™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ[ÜË™\Ý[™ËŒX™]LK“\ÙÐÜ™X]T\š[ÙXÕ™\Ý[™ÐXØÛÝ[™\ÜÛœÙH‹[˜ÛÙJKYZKš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆZKš[˜\žT™XY\ÙN›™]ÈZKš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹RŠ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Ü™]\›ˆŠ
_KÒ”ÓÓŠJ^Ü™]\›žß_Kœ›ÛT\X[
J^Ü™]\›ˆŠ
__NÝ˜\ˆ]XÛ\ÜÞÜœÎØÛÛœÝXÝÜŠŠ^Ý\ËœœÏ[‹\ËÜ™X]U™\Ý[™ÐXØÛÝ[]\ËÜ™X]U™\Ý[™ÐXØÛÝ[˜š[™
\ÊK\ËÜ™X]T\›X[™[ØÚÙYXØÛÝ[]\ËÜ™X]T\›X[™[ØÚÙYXØÛÝ[˜š[™
\ÊK\ËÜ™X]T\š[ÙXÕ™\Ý[™ÐXØÛÝ[]\ËÜ™X]T\š[ÙXÕ™\Ý[™ÐXØÛÝ[˜š[™
\Ê_PÜ™X]U™\Ý[™ÐXØÛÝ[
Š^Û]T\‹“\ÙÐÜ™X]U™\Ý[™ÐXØÛÝ[™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ[ÜË™\Ý[™ËŒX™]LK“\ÙÈ‹Ü™X]U™\Ý[™ÐXØÛÝ[‹
K[ŠO”\‹“\ÙÐÜ™X]U™\Ý[™ÐXØÛÝ[™\ÜÛœÙK™XÛÙJ™]ÈZKš[˜\žT™XY\ŠŠJJ_PÜ™X]T\›X[™[ØÚÙYXØÛÝ[
Š^Û]T\‹“\ÙÐÜ™X]T\›X[™[ØÚÙYXØÛÝ[™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ[ÜË™\Ý[™ËŒX™]LK“\ÙÈ‹Ü™X]T\›X[™[ØÚÙYXØÛÝ[‹
K[ŠO”\‹“\ÙÐÜ™X]T\›X[™[ØÚÙYXØÛÝ[™\ÜÛœÙK™XÛÙJ™]ÈZKš[˜\žT™XY\ŠŠJJ_PÜ™X]T\š[ÙXÕ™\Ý[™ÐXØÛÝ[
Š^Û]T\‹“\ÙÐÜ™X]T\š[ÙXÕ™\Ý[™ÐXØÛÝ[™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ[ÜË™\Ý[™ËŒX™]LK“\ÙÈ‹Ü™X]T\š[ÙXÕ™\Ý[™ÐXØÛÝ[‹
K[ŠO”\‹“\ÙÐÜ™X]T\š[ÙXÕ™\Ý[™ÐXØÛÝ[™\ÜÛœÙK™XÛÙJ™]ÈZKš[˜\žT™XY\ŠŠJJ__NÔ\‹“\ÙÐÛY[[\S]ŸJNÝ˜\ˆSORJZOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\JZ—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÛZ™\Ý[™Õ\\Ï]›ÚYÝ˜\ˆVQSJ
NÛZ™\Ý[™Õ\\ÏVÖÈ‹ØÛÜÛ[ÜË™\Ý[™ËŒX™]LK“\ÙÐÜ™X]U™\Ý[™ÐXØÛÝ[‹V“\ÙÐÜ™X]U™\Ý[™ÐXØÛÝ[W_JNÝ˜\ˆÚRJOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\J—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÞš\Ð[Z[›Ó\ÙÐÜ™X]U˜[Y]Ü^š\Ð[Z[›Ó\ÙÐ™YÚ[”™Y[YØ]O^˜Ü™X]TÝZÚ[™Ð[Z[›ÐÛÛ™\\œÏ^œÙ]\Û\Ú[™Ñ^[œÚ[Û^š\Ð[Z[›Ó\ÙÕ[š˜Z[^˜Ü™X]TÛ\Ú[™Ð[Z[›ÐÛÛ™\\œÏ^œÙ]\Z[^[œÚ[Û^œÙ]\X˜Ñ^[œÚ[Û^š\Ó\ÙÕ˜[œÙ™\‘[˜ÛÙSØš™XÝ^šX˜Õ\\Ï^š\Ð[Z[›Ó\ÙÕ˜[œÙ™\^˜Ü™X]RX˜Ð[Z[›ÐÛÛ™\\œÏ^™Ü›Ý\\\Ï^˜Ü™X]QÜ›Ý\[Z[›ÐÛÛ™\\œÏ^œÙ]\ÛÝ‘^[œÚ[Û^š\Ó\ÙÕ›ÝUÙZYÚY[˜ÛÙSØš™XÝ^š\Ó\ÙÕ›ÝQ[˜ÛÙSØš™XÝ^š\Ó\ÙÔÝX›Z]›ÜÜØ[[˜ÛÙSØš™XÝ^š\Ó\ÙÑ\ÜÚ][˜ÛÙSØš™XÝ^™ÛÝ•\\Ï^š\Ð[Z[›Ó\ÙÕ›ÝUÙZYÚY^š\Ð[Z[›Ó\ÙÕ›ÝO^š\Ð[Z[›Ó\ÙÔÝX›Z]›ÜÜØ[^š\Ð[Z[›Ó\ÙÑ\ÜÚ]^˜Ü™X]QÛÝ[Z[›ÐÛÛ™\\œÏ^œÙ]\™YYÜ˜[^[œÚ[Û^™™YYÜ˜[\\Ï^˜Ü™X]Q™YYÜ˜[[Z[›ÐÛÛ™\\œÏ^š\Ð[Z[›Ó\ÙÔÝX›Z]]šY[˜ÙO^˜Ü™X]Q]šY[˜ÙP[Z[›ÐÛÛ™\\œÏ^œÙ]\\ÝšX][Û‘^[œÚ[Û^š\Ó\ÙÕÚ]˜]Ñ[YØ]Ü”™]Ø\™[˜ÛÙSØš™XÝ^™\ÝšX][Û•\\Ï^š\Ð[Z[›Ó\ÙÕÚ]˜]Õ˜[Y]ÜÛÛ[Z\ÜÚ[Û^š\Ð[Z[›Ó\ÙÕÚ]˜]Ñ[YØ]Ü”™]Ø\™^š\Ð[Z[›Ó\ÙÔÙ]Ú]˜]ÐY™\ÜÏ^š\Ð[Z[›Ó\ÙÑ[™ÛÛ[][š]TÛÛ^˜Ü™X]Q\ÝšX][Û[Z[›ÐÛÛ™\\œÏ^š\Ð[Z[›Ó\ÙÕ™\šYžR[˜\šX[^˜Ü™X]PÜž\Ú\Ð[Z[›ÐÛÛ™\\œÏ^œÙ]\˜[šÑ^[œÚ[Û^š\Ó\ÙÔÙ[™[˜ÛÙSØš™XÝ^˜˜[šÕ\\Ï^š\Ð[Z[›Ó\ÙÔÙ[™^š\Ð[Z[›Ó\ÙÓ][TÙ[™^˜Ü™X]P˜[šÐ[Z[›ÐÛÛ™\\œÏ^œÙ]\]]‘^[œÚ[Û^˜]]•\\Ï^˜Ü™X]P]][Z[›ÐÛÛ™\\œÏ^œÙ]\]]^[œÚ[Û]›ÚYÞ™\Ý[™Õ\\Ï^š\Ð[Z[›Ó\ÙÐÜ™X]U™\Ý[™ÐXØÛÝ[^˜Ü™X]U™\Ý[™Ð[Z[›ÐÛÛ™\\œÏ^œÙ]\^[œÚ[Û^œÙ]\ÝZÚ[™Ñ^[œÚ[Û^œÝZÚ[™Õ\\Ï^š\Ó\ÙÕ[™[YØ]Q[˜ÛÙSØš™XÝ^š\Ó\ÙÑY]˜[Y]Ü‘[˜ÛÙSØš™XÝ^š\Ó\ÙÑ[YØ]Q[˜ÛÙSØš™XÝ^š\Ó\ÙÐÜ™X]U˜[Y]Ü‘[˜ÛÙSØš™XÝ^š\Ó\ÙÐØ[˜Ù[[˜›Û™[™Ñ[YØ][Û‘[˜ÛÙSØš™XÝ^š\Ó\ÙÐ™YÚ[”™Y[YØ]Q[˜ÛÙSØš™XÝ^š\Ð[Z[›Ó\ÙÕ[™[YØ]O^š\Ð[Z[›Ó\ÙÑY]˜[Y]Ü^š\Ð[Z[›Ó\ÙÑ[YØ]O]›ÚYÝ˜\ˆÖPÜJ
NÓØš™XÝ™Yš[™T›Ü\JœÙ]\]]^[œÚ[Ûˆ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆÖœÙ]\]]^[œÚ[ÛŸ_JNÝ˜\ˆÖTÜJ
NÓØš™XÝ™Yš[™T›Ü\J˜Ü™X]P]][Z[›ÐÛÛ™\\œÈ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆÖ˜Ü™X]P]][Z[›ÐÛÛ™\\œß_JNÝ˜\ˆ–Q\J
NÓØš™XÝ™Yš[™T›Ü\J˜]]•\\È‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ–˜]]•\\ß_JNÝ˜\ˆÖ]ÜJ
NÓØš™XÝ™Yš[™T›Ü\JœÙ]\]]‘^[œÚ[Ûˆ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆÖœÙ]\]]‘^[œÚ[ÛŸ_JNÝ˜\ˆÝXœJ
NÓØš™XÝ™Yš[™T›Ü\J˜Ü™X]P˜[šÐ[Z[›ÐÛÛ™\\œÈ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆÝ‹˜Ü™X]P˜[šÐ[Z[›ÐÛÛ™\\œß_JNÓØš™XÝ™Yš[™T›Ü\Jš\Ð[Z[›Ó\ÙÓ][TÙ[™‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆÝ‹š\Ð[Z[›Ó\ÙÓ][TÙ[™_JNÓØš™XÝ™Yš[™T›Ü\Jš\Ð[Z[›Ó\ÙÔÙ[™‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆÝ‹š\Ð[Z[›Ó\ÙÔÙ[™_JNÝ˜\ˆÓOTJ
NÓØš™XÝ™Yš[™T›Ü\J˜˜[šÕ\\È‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆÓK˜˜[šÕ\\ß_JNÓØš™XÝ™Yš[™T›Ü\Jš\Ó\ÙÔÙ[™[˜ÛÙSØš™XÝ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆÓKš\Ó\ÙÔÙ[™[˜ÛÙSØš™XÝ_JNÝ˜\ˆÖSÜJ
NÓØš™XÝ™Yš[™T›Ü\JœÙ]\˜[šÑ^[œÚ[Ûˆ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆÖœÙ]\˜[šÑ^[œÚ[ÛŸ_JNÝ˜\ˆ“OQJ
NÓØš™XÝ™Yš[™T›Ü\J˜Ü™X]PÜž\Ú\Ð[Z[›ÐÛÛ™\\œÈ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ“K˜Ü™X]PÜž\Ú\Ð[Z[›ÐÛÛ™\\œß_JNÓØš™XÝ™Yš[™T›Ü\Jš\Ð[Z[›Ó\ÙÕ™\šYžR[˜\šX[‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ“Kš\Ð[Z[›Ó\ÙÕ™\šYžR[˜\šX[_JNÝ˜\ˆYÏU\J
NÓØš™XÝ™Yš[™T›Ü\J˜Ü™X]Q\ÝšX][Û[Z[›ÐÛÛ™\\œÈ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆYË˜Ü™X]Q\ÝšX][Û[Z[›ÐÛÛ™\\œß_JNÓØš™XÝ™Yš[™T›Ü\Jš\Ð[Z[›Ó\ÙÑ[™ÛÛ[][š]TÛÛ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆYËš\Ð[Z[›Ó\ÙÑ[™ÛÛ[][š]TÛÛ_JNÓØš™XÝ™Yš[™T›Ü\Jš\Ð[Z[›Ó\ÙÔÙ]Ú]˜]ÐY™\ÜÈ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆYËš\Ð[Z[›Ó\ÙÔÙ]Ú]˜]ÐY™\Üß_JNÓØš™XÝ™Yš[™T›Ü\Jš\Ð[Z[›Ó\ÙÕÚ]˜]Ñ[YØ]Ü”™]Ø\™‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆYËš\Ð[Z[›Ó\ÙÕÚ]˜]Ñ[YØ]Ü”™]Ø\™_JNÓØš™XÝ™Yš[™T›Ü\Jš\Ð[Z[›Ó\ÙÕÚ]˜]Õ˜[Y]ÜÛÛ[Z\ÜÚ[Ûˆ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆYËš\Ð[Z[›Ó\ÙÕÚ]˜]Õ˜[Y]ÜÛÛ[Z\ÜÚ[ÛŸ_JNÝ˜\ˆ“O^J
NÓØš™XÝ™Yš[™T›Ü\J™\ÝšX][Û•\\È‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ“K™\ÝšX][Û•\\ß_JNÓØš™XÝ™Yš[™T›Ü\Jš\Ó\ÙÕÚ]˜]Ñ[YØ]Ü”™]Ø\™[˜ÛÙSØš™XÝ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ“Kš\Ó\ÙÕÚ]˜]Ñ[YØ]Ü”™]Ø\™[˜ÛÙSØš™XÝ_JNÝ˜\ˆQœJ
NÓØš™XÝ™Yš[™T›Ü\JœÙ]\\ÝšX][Û‘^[œÚ[Ûˆ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆœÙ]\\ÝšX][Û‘^[œÚ[ÛŸ_JNÝ˜\ˆO\\J
NÓØš™XÝ™Yš[™T›Ü\J˜Ü™X]Q]šY[˜ÙP[Z[›ÐÛÛ™\\œÈ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆK˜Ü™X]Q]šY[˜ÙP[Z[›ÐÛÛ™\\œß_JNÓØš™XÝ™Yš[™T›Ü\Jš\Ð[Z[›Ó\ÙÔÝX›Z]]šY[˜ÙH‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆKš\Ð[Z[›Ó\ÙÔÝX›Z]]šY[˜Ù__JNÝ˜\ˆVRJ
NÓØš™XÝ™Yš[™T›Ü\J˜Ü™X]Q™YYÜ˜[[Z[›ÐÛÛ™\\œÈ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆV˜Ü™X]Q™YYÜ˜[[Z[›ÐÛÛ™\\œß_JNÝ˜\ˆ–QÜJ
NÓØš™XÝ™Yš[™T›Ü\J™™YYÜ˜[\\È‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ–™™YYÜ˜[\\ß_JNÝ˜\ˆ–V\J
NÓØš™XÝ™Yš[™T›Ü\JœÙ]\™YYÜ˜[^[œÚ[Ûˆ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ–œÙ]\™YYÜ˜[^[œÚ[ÛŸ_JNÝ˜\ˆÙÏVJ
NÓØš™XÝ™Yš[™T›Ü\J˜Ü™X]QÛÝ[Z[›ÐÛÛ™\\œÈ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆÙË˜Ü™X]QÛÝ[Z[›ÐÛÛ™\\œß_JNÓØš™XÝ™Yš[™T›Ü\Jš\Ð[Z[›Ó\ÙÑ\ÜÚ]‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆÙËš\Ð[Z[›Ó\ÙÑ\ÜÚ]_JNÓØš™XÝ™Yš[™T›Ü\Jš\Ð[Z[›Ó\ÙÔÝX›Z]›ÜÜØ[‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆÙËš\Ð[Z[›Ó\ÙÔÝX›Z]›ÜÜØ[_JNÓØš™XÝ™Yš[™T›Ü\Jš\Ð[Z[›Ó\ÙÕ›ÝH‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆÙËš\Ð[Z[›Ó\ÙÕ›Ý__JNÓØš™XÝ™Yš[™T›Ü\Jš\Ð[Z[›Ó\ÙÕ›ÝUÙZYÚY‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆÙËš\Ð[Z[›Ó\ÙÕ›ÝUÙZYÚY_JNÝ˜\ˆÏ[Ò

NÓØš™XÝ™Yš[™T›Ü\J™ÛÝ•\\È‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆË™ÛÝ•\\ß_JNÓØš™XÝ™Yš[™T›Ü\Jš\Ó\ÙÑ\ÜÚ][˜ÛÙSØš™XÝ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆËš\Ó\ÙÑ\ÜÚ][˜ÛÙSØš™XÝ_JNÓØš™XÝ™Yš[™T›Ü\Jš\Ó\ÙÔÝX›Z]›ÜÜØ[[˜ÛÙSØš™XÝ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆËš\Ó\ÙÔÝX›Z]›ÜÜØ[[˜ÛÙSØš™XÝ_JNÓØš™XÝ™Yš[™T›Ü\Jš\Ó\ÙÕ›ÝQ[˜ÛÙSØš™XÝ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆËš\Ó\ÙÕ›ÝQ[˜ÛÙSØš™XÝ_JNÓØš™XÝ™Yš[™T›Ü\Jš\Ó\ÙÕ›ÝUÙZYÚY[˜ÛÙSØš™XÝ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆËš\Ó\ÙÕ›ÝUÙZYÚY[˜ÛÙSØš™XÝ_JNÝ˜\ˆ\Ò

NÓØš™XÝ™Yš[™T›Ü\JœÙ]\ÛÝ‘^[œÚ[Ûˆ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆœÙ]\ÛÝ‘^[œÚ[ÛŸ_JNÝ˜\ˆ	Y

NÓØš™XÝ™Yš[™T›Ü\J˜Ü™X]QÜ›Ý\[Z[›ÐÛÛ™\\œÈ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ	˜Ü™X]QÜ›Ý\[Z[›ÐÛÛ™\\œß_JNÝ˜\ˆ–Z

NÓØš™XÝ™Yš[™T›Ü\J™Ü›Ý\\\È‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ–™Ü›Ý\\\ß_JNÝ˜\ˆ“O^R

NÓØš™XÝ™Yš[™T›Ü\J˜Ü™X]RX˜Ð[Z[›ÐÛÛ™\\œÈ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ“K˜Ü™X]RX˜Ð[Z[›ÐÛÛ™\\œß_JNÓØš™XÝ™Yš[™T›Ü\Jš\Ð[Z[›Ó\ÙÕ˜[œÙ™\ˆ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ“Kš\Ð[Z[›Ó\ÙÕ˜[œÙ™\Ÿ_JNÝ˜\ˆ“OTR

NÓØš™XÝ™Yš[™T›Ü\JšX˜Õ\\È‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ“KšX˜Õ\\ß_JNÓØš™XÝ™Yš[™T›Ü\Jš\Ó\ÙÕ˜[œÙ™\‘[˜ÛÙSØš™XÝ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ“Kš\Ó\ÙÕ˜[œÙ™\‘[˜ÛÙSØš™XÝ_JNÝ˜\ˆNO\R

NÓØš™XÝ™Yš[™T›Ü\JœÙ]\X˜Ñ^[œÚ[Ûˆ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆNKœÙ]\X˜Ñ^[œÚ[ÛŸ_JNÝ˜\ˆŽOWÒ

NÓØš™XÝ™Yš[™T›Ü\JœÙ]\Z[^[œÚ[Ûˆ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆŽKœÙ]\Z[^[œÚ[ÛŸ_JNÝ˜\ˆÓOQÒ

NÓØš™XÝ™Yš[™T›Ü\J˜Ü™X]TÛ\Ú[™Ð[Z[›ÐÛÛ™\\œÈ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆÓK˜Ü™X]TÛ\Ú[™Ð[Z[›ÐÛÛ™\\œß_JNÓØš™XÝ™Yš[™T›Ü\Jš\Ð[Z[›Ó\ÙÕ[š˜Z[‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆÓKš\Ð[Z[›Ó\ÙÕ[š˜Z[_JNÝ˜\ˆOS

NÓØš™XÝ™Yš[™T›Ü\JœÙ]\Û\Ú[™Ñ^[œÚ[Ûˆ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆKœÙ]\Û\Ú[™Ñ^[œÚ[ÛŸ_JNÝ˜\ˆÐOV’

NÓØš™XÝ™Yš[™T›Ü\J˜Ü™X]TÝZÚ[™Ð[Z[›ÐÛÛ™\\œÈ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆÐK˜Ü™X]TÝZÚ[™Ð[Z[›ÐÛÛ™\\œß_JNÓØš™XÝ™Yš[™T›Ü\Jš\Ð[Z[›Ó\ÙÐ™YÚ[”™Y[YØ]H‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆÐKš\Ð[Z[›Ó\ÙÐ™YÚ[”™Y[YØ]__JNÓØš™XÝ™Yš[™T›Ü\Jš\Ð[Z[›Ó\ÙÐÜ™X]U˜[Y]Üˆ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆÐKš\Ð[Z[›Ó\ÙÐÜ™X]U˜[Y]ÜŸ_JNÓØš™XÝ™Yš[™T›Ü\Jš\Ð[Z[›Ó\ÙÑ[YØ]H‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆÐKš\Ð[Z[›Ó\ÙÑ[YØ]__JNÓØš™XÝ™Yš[™T›Ü\Jš\Ð[Z[›Ó\ÙÑY]˜[Y]Üˆ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆÐKš\Ð[Z[›Ó\ÙÑY]˜[Y]ÜŸ_JNÓØš™XÝ™Yš[™T›Ü\Jš\Ð[Z[›Ó\ÙÕ[™[YØ]H‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆÐKš\Ð[Z[›Ó\ÙÕ[™[YØ]__JNÝ˜\ˆ]O[J
NÓØš™XÝ™Yš[™T›Ü\Jš\Ó\ÙÐ™YÚ[”™Y[YØ]Q[˜ÛÙSØš™XÝ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ]Kš\Ó\ÙÐ™YÚ[”™Y[YØ]Q[˜ÛÙSØš™XÝ_JNÓØš™XÝ™Yš[™T›Ü\Jš\Ó\ÙÐØ[˜Ù[[˜›Û™[™Ñ[YØ][Û‘[˜ÛÙSØš™XÝ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ]Kš\Ó\ÙÐØ[˜Ù[[˜›Û™[™Ñ[YØ][Û‘[˜ÛÙSØš™XÝ_JNÓØš™XÝ™Yš[™T›Ü\Jš\Ó\ÙÐÜ™X]U˜[Y]Ü‘[˜ÛÙSØš™XÝ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ]Kš\Ó\ÙÐÜ™X]U˜[Y]Ü‘[˜ÛÙSØš™XÝ_JNÓØš™XÝ™Yš[™T›Ü\Jš\Ó\ÙÑ[YØ]Q[˜ÛÙSØš™XÝ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ]Kš\Ó\ÙÑ[YØ]Q[˜ÛÙSØš™XÝ_JNÓØš™XÝ™Yš[™T›Ü\Jš\Ó\ÙÑY]˜[Y]Ü‘[˜ÛÙSØš™XÝ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ]Kš\Ó\ÙÑY]˜[Y]Ü‘[˜ÛÙSØš™XÝ_JNÓØš™XÝ™Yš[™T›Ü\Jš\Ó\ÙÕ[™[YØ]Q[˜ÛÙSØš™XÝ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ]Kš\Ó\ÙÕ[™[YØ]Q[˜ÛÙSØš™XÝ_JNÓØš™XÝ™Yš[™T›Ü\JœÝZÚ[™Õ\\È‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ]KœÝZÚ[™Õ\\ß_JNÝ˜\ˆŽOYÓJ
NÓØš™XÝ™Yš[™T›Ü\JœÙ]\ÝZÚ[™Ñ^[œÚ[Ûˆ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆŽKœÙ]\ÝZÚ[™Ñ^[œÚ[ÛŸ_JNÝ˜\ˆNOTÓJ
NÓØš™XÝ™Yš[™T›Ü\JœÙ]\^[œÚ[Ûˆ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆNKœÙ]\^[œÚ[ÛŸ_JNÝ˜\ˆOZÓJ
NÓØš™XÝ™Yš[™T›Ü\J˜Ü™X]U™\Ý[™Ð[Z[›ÐÛÛ™\\œÈ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆK˜Ü™X]U™\Ý[™Ð[Z[›ÐÛÛ™\\œß_JNÓØš™XÝ™Yš[™T›Ü\Jš\Ð[Z[›Ó\ÙÐÜ™X]U™\Ý[™ÐXØÛÝ[‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆKš\Ð[Z[›Ó\ÙÐÜ™X]U™\Ý[™ÐXØÛÝ[_JNÝ˜\ˆÎOTSJ
NÓØš™XÝ™Yš[™T›Ü\J™\Ý[™Õ\\È‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆÎK™\Ý[™Õ\\ß_J_JNÝ˜\ˆORJÙÏOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\JÙË—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNØÙË›XZÙPÛÛ\XÝš]\œ˜^OUSNØÙË›XZÙS][\ÚYÛ™Y^NØÙË›XZÙS][\ÚYÛ™Yž]\Ï]NNÝ˜\ˆNOV˜J
KÎOR›Š
KO]Ù

KÝZ\

KÎO]ÝJ
KÚVY

NÙ[˜Ý[ÛˆSJJ^Û]SX]˜ÙZ[
K›[™ÝÎ
KYK›[™ÝSX]™›ÛÜŠK›[™ÝÎ
JŽO[™]ÈZ[\œ˜^JŠNÜ™]\›ˆK™›Ü‘XXÚ

‹ÊOOžÛ]OSX]™›ÛÜŠËÎ
KÏ[ÉNÜ‰‰ŠVØW_LOË\Ê_JKÝ‹ÛÛ\XÝš]\œ˜^K™œ›ÛT\X[
Ù[[\ÎšK^˜Pš]ÔÝÜ™YJ_Y[˜Ý[ÛˆJK‹KŠ^Û]ÏP\œ˜^K™œ›ÛJ‹šÙ^\Ê
JKOJÎK™œ›ÛP™XÚÌŠJÖÌJKœ™Yš^ÏYK˜[YKœXšÙ^\Ë[™]È\œ˜^JË›[™Ý
K™š[
LJKO[™]È\œ˜^NÙ›ÜŠ]LÐË›[™ÝÐŠÊÊ^Û]ÏJNKœXšÙ^UÐY™\ÜÊJÖÐ—KJKO\‹™Ù]
ÊNÔI‰ŠÐ—OHLKœ\Ú
JJ_[]^ÜX›XÒÙ^NŠK™[˜ÛÙTXšÙ^JJJK[ÙR[™›ÎžÛ][NžØš]\œ˜^N•SJ
K[ÙR[™›ÜÎK›X\
OŠÜÚ[™ÛNžÛ[ÙN˜ÎK”ÚYÛ“[ÙK”ÒQÓ—ÓSÑWÓQÐPÖWÐSRS“×Ò”ÓÓŸ_JJ__KÙ\]Y[˜ÙNšYÒ[
Š_KTÚ]][™›Ë™œ›ÛT\X[
ÜÚYÛ™\’[™›ÜÎ–ÛK™YNžØ[[Ý[–Ë‹‹˜[[Ý[KØ\Ó[Z]šYÒ[
™Ø\Ê__JKÏTÚ]][™›Ë™[˜ÛÙJ
K™š[š\Ú

NÜ™]\›ˆÚ•˜]Ë™œ›ÛT\X[
Ø›ÙPž]\ÎšK]][™›Ðž]\Î™ËÚYÛ˜]\™\Î–ÑÝ‹“][TÚYÛ˜]\™K™[˜ÛÙJÝ‹“][TÚYÛ˜]\™K™œ›ÛT\X[
ÜÚYÛ˜]\™\Î_JJK™š[š\Ú

W_J_Y[˜Ý[ÛˆNJK‹KŠ^Û]Ï^JK‹KŠNÜ™]\›ˆZ[\œ˜^K™œ›ÛJÚ•˜]Ë™[˜ÛÙJÊK™š[š\Ú

J__JNÝ˜\ˆÝRJOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\J‹—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÕ‹š\ÔÙX\˜Ú]Y\žP\œ˜^OPNNÙ[˜Ý[ÛˆNJJ^Ü™]\›ˆ\œ˜^Kš\Ð\œ˜^JJ__JNÝ˜\ˆORJÐOOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\JÐK—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÕÐKœ˜]ÑYMLNTXšÙ^UÔ˜]ÐY™\ÜÏR“NÕÐKœ˜]ÔÙXÜMšÌTXšÙ^UÔ˜]ÐY™\ÜÏQ“NÕÐKœXšÙ^UÔ˜]ÐY™\ÜÏ\SNÕÐKœXšÙ^UÐY™\ÜÏYŽNÝ˜\ˆÝUšJ
KOR›Š
NÙ[˜Ý[Ûˆ“JJ^ÚYŠK›[™ÝOOLÌŠ]›ÝÈ™]È\œ›ÜŠ[˜[YYMLNHXšÙ^H[™Ýˆ	ÙK›[™ÝX
NÜ™]\›ŠÝ‹œÚLMŠJJKœÛXÙJŒ
_Y[˜Ý[Ûˆ“JJ^ÚYŠK›[™ÝOOLÌÊ]›ÝÈ™]È\œ›ÜŠ[˜[YÙXÜMšÌHXšÙ^H[™Ý
ÛÛ\™\ÜÙY
Nˆ	ÙK›[™ÝX
NÜ™]\›ŠÝ‹œš\[YMŒ
J
Ý‹œÚLMŠJJJ_Y[˜Ý[ÛˆSJKŠ^ÜÝÚ]Ú
J^ØØ\ÙH™YMLNHŽœ™]\›ˆ“JŠNØØ\ÙHœÙXÜMšÌHŽœ™]\›ˆ“JŠNÙY˜][›ÝÈ™]È\œ›ÜŠXšÙ^H\H	Ù_H›ÝÝ\ÜY
__Y[˜Ý[ÛˆŽJKŠ^Ü™]\›ŠKÒ^
JSJKŠJKÕ\\Ø\ÙJ
__JNÝ˜\ˆSORJOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\J‹—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÓ‹›XZÙRœÛÛ”œÒY\NÝ˜\ˆÎOLYMÙ[˜Ý[ÛˆJ
^Ü™]\›ˆÎJÏL__JNÝ˜\ˆÓORJ]OžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\J]‹—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÖ]‹™Y˜][RNNÙ[˜Ý[ÛˆNJJ^Ý˜\ˆ‹YK”Þ[X›ÛÚYŠ\[ÙˆOH™[˜Ý[ÛˆŠZYŠ›ØœÙ\˜X›J[]›ØœÙ\˜X›NÙ[Ù^Û]™›ÜŠšÎ‹ËÙÚ]X‹˜ÛÛKØ™[›\ÚÜÞ[X›Û[ØœÙ\˜X›HŠNÝž^Ý›ØœÙ\˜X›O[ŸXØ]Úß_Y[ÙHHØœÙ\˜X›HŽÜ™]\›ˆŸ_JNÝ˜\ˆ“ORJ
ÙKÓJOOžÑÓK™^ÜÏWÓJ
_JNÝ˜\ˆRJ
\ÙKÓJOOžÈ\ÙHÝšXÝŽÝ˜\ˆÓOSØš™XÝœ›ÝÝ\KÔÝš[™ÎÕÓK™^ÜÏY[˜Ý[ÛŠŠ^Ý˜\ˆRÓK˜Ø[
ŠKO]OOH–ÛØš™XÝ\™Ý[Y[×HŽÜ™]\›ˆ_
O]OOH–ÛØš™XÝ\œ˜^WH‰‰›ˆOO[[	‰\[ÙˆOH›Øš™XÝ‰‰\[Ùˆ‹›[™ÝOH›[X™\ˆ‰‰›‹›[™ÝL	‰’ÓK˜Ø[
‹˜Ø[YJOOOH–ÛØš™XÝ[˜Ý[Û—HŠK__JNÝ˜\ˆ—ÏRJ
œÙKWÊOOžÈ\ÙHÝšXÝŽÝ˜\ˆ“NÓØš™XÝšÙ^\ß
YÏSØš™XÝœ›ÝÝ\Kš\ÓÝÛ”›Ü\KSØš™XÝœ›ÝÝ\KÔÝš[™ËO^Š
KSØš™XÝœ›ÝÝ\Kœ›Ü\R\Ñ[[Y\˜X›KSOHV‹˜Ø[
ÝÔÝš[™Î›[KÔÝš[™ÈŠK“OV‹˜Ø[
[˜Ý[ÛŠ
^ßKœ›ÝÝ\HŠKYÏVÈÔÝš[™È‹ÓØØ[TÝš[™È‹˜[YSÙˆ‹š\ÓÝÛ”›Ü\H‹š\Ô›ÝÝ\SÙˆ‹œ›Ü\R\Ñ[[Y\˜X›H‹˜ÛÛœÝXÝÜˆ—KÚY[˜Ý[ÛŠJ^Ý˜\ˆYK˜ÛÛœÝXÝÜŽÜ™]\›ˆ‰‰›‹œ›ÝÝ\OOOY_K“O^É\XØ][ÛØXÚNˆL	ÛÛœÛÛNˆL	^\›˜[ˆL	œ˜[YNˆL	œ˜[YQ[[Y[ˆL	œ˜[Y\ÎˆL	[›™\’ZYÚˆL	[›™\•ÚYˆL	Û›[Þ™[ØÜ™Y[˜Ú[™ÙNˆL	Û›[Þ™[ØÜ™Y[™\œ›ÜŽˆL	Ý]\’ZYÚˆL	Ý]\•ÚYˆL	YÙVÙ™œÙ]ˆL	YÙVSÙ™œÙ]ˆL	\™[ˆL	ØÜ›ÛYˆL	ØÜ›ÛÜˆL	ØÜ›ÛˆL	ØÜ›ÛNˆL	Ù[ŽˆL	ÙXšÚ][™^YŽˆL	ÙXšÚ]ÝÜ˜YÙR[™›ÎˆL	Ú[™ÝÎˆLKOJ[˜Ý[ÛŠ
^ÚYŠ\[ÙˆÚ[™ÝÏˆHŠ\™]\›ˆLNÙ›ÜŠ˜\ˆH[ˆÚ[™ÝÊ]ž^ÚYŠV“VÈ‰ŠÙWI‰YË˜Ø[
Ú[™ÝËJI‰Ú[™ÝÖÙWHOO[[	‰\[ÙˆÚ[™ÝÖÙWOOH›Øš™XÝŠ]ž^ÚÚ
Ú[™ÝÖÙWJ_XØ]ÚÜ™]\›ˆL_XØ]ÚÜ™]\›ˆL\™]\›ˆL_JJ
K	OY[˜Ý[ÛŠJ^ÚYŠ\[ÙˆÚ[™ÝÏˆHŸVJ\™]\›ˆÚ
JNÝž^Ü™]\›ˆÚ
J_XØ]ÚÜ™]\›ˆL__K“OY[˜Ý[ÛŠŠ^Ý˜\ˆ[ˆOO[[	‰\[ÙˆOH›Øš™XÝ‹OV‹˜Ø[
ŠOOOH–ÛØš™XÝ[˜Ý[Û—H‹SJŠKÏ]	‰–‹˜Ø[
ŠOOOH–ÛØš™XÝÝš[™×H‹OV×NÚYŠ]	‰ˆZI‰ˆ\Š]›ÝÈ™]È\Q\œ›ÜŠ“Øš™XÝšÙ^\ÈØ[YÛˆH›Û‹[Øš™XÝŠNÝ˜\ˆÏ^“I‰šNÚYŠÉ‰›‹›[™ÝŒ	‰ˆ]YË˜Ø[
‹
JY›ÜŠ˜\ˆLÙ‹›[™ÝÊÊÙ
XKœ\Ú
Ýš[™Ê
JNÚYŠ‰‰›‹›[™ÝŒ
Y›ÜŠ˜\ˆOLÐO‹›[™ÝÊÊÐJXKœ\Ú
Ýš[™ÊJJNÙ[ÙH›ÜŠ˜\ˆ[ˆŠHJÉ‰›OOHœ›ÝÝ\HŠI‰YË˜Ø[
‹
I‰˜Kœ\Ú
Ýš[™Ê
JNÚYŠSJY›ÜŠ˜\ˆIJŠKÏLÙÏYË›[™ÝÊÊÙÊHJ	‰YÖÙ×OOOH˜ÛÛœÝXÝÜˆŠI‰YË˜Ø[
‹YÖÙ×JI‰˜Kœ\Ú
YÖÙ×JNÜ™]\›ˆ_JNÝ˜\ˆYË‹K‹SK“KYËÚ“KK	NÙWË™^ÜÏZ“_JNÝ˜\ˆ×ÏRJ
\ÙKWÊOOžÈ\ÙHÝšXÝŽÝ˜\ˆOP\œ˜^Kœ›ÝÝ\KœÛXÙKNO^Š
KÏSØš™XÝšÙ^\ËZ]ÏÙ[˜Ý[ÛŠŠ^Ü™]\›ˆÊŠ_N›—Ê
K—ÏSØš™XÝšÙ^\ÎÑZœÚ[OY[˜Ý[ÛŠ
^ÚYŠØš™XÝšÙ^\Ê^Ý˜\ˆJ[˜Ý[ÛŠ
^Ý˜\ˆSØš™XÝšÙ^\Ê\™Ý[Y[ÊNÜ™]\›ˆ	‰›[™ÝOOX\™Ý[Y[Ë›[™ÝJJKŠNÛŸ
Øš™XÝšÙ^\ÏY[˜Ý[ÛŠJ^Ü™]\›ˆNJJOÜ—ÊK˜Ø[
JJNœ—ÊJ_J_Y[ÙHØš™XÝšÙ^\ÏQZÜ™]\›ˆØš™XÝšÙ^\ßZNÚWË™^ÜÏQZJNÝ˜\ˆ	RJ
ÜÙKWÊOOžÈ\ÙHÝšXÝŽÝ˜\ˆZSØš™XÝ™Yš[™T›Ü\_LNÚYŠZ
]ž^ÔZ
ßK˜H‹Ý˜[YNŒ_J_XØ]ÚÔZHL_XWË™^ÜÏTZJNÝ˜\ˆÏRJ
ÜÙK×ÊOOžÈ\ÙHÝšXÝŽÜ×Ë™^ÜÏTÞ[^\œ›ÜŸJNÝ˜\ˆWÏRJ
ÜÙK×ÊOOžÈ\ÙHÝšXÝŽØ×Ë™^ÜÏU\Q\œ›ÜŸJNÝ˜\ˆÏRJ
\ÙKWÊOOžÈ\ÙHÝšXÝŽÐWË™^ÜÏSØš™XÝ™Ù]ÝÛ”›Ü\Q\ØÜš\ÜŸJNÝ˜\ˆRJ
\ÙK—ÊOOžÈ\ÙHÝšXÝŽÝ˜\ˆÚ[Ê
NÚYŠÚ
]ž^ÝÚ
×K›[™ÝŠ_XØ]ÚÝÚ[[Y—Ë™^ÜÏ]ÚJNÝ˜\ˆÏRJ
ÜÙKWÊOOžÈ\ÙHÝšXÝŽÝ˜\ˆ×ÏIŠ
KŽOYÊ
KO]WÊ
KÏZŠ
NÒWË™^ÜÏY[˜Ý[ÛŠ‹J^ÚYŠ[Ÿ\[ÙˆˆOH›Øš™XÝ‰‰\[ÙˆˆOH™[˜Ý[ÛˆŠ]›ÝÈ™]ÈJ˜Øš˜]\Ý™H[ˆØš™XÝÜˆH[˜Ý[Û˜ŠNÚYŠ\[ÙˆOHœÝš[™È‰‰\[ÙˆOHœÞ[X›ÛŠ]›ÝÈ™]ÈJ˜›Ü\X]\Ý™HHÝš[™ÈÜˆHÞ[X›ÛŠNÚYŠ\™Ý[Y[Ë›[™ÝŒÉ‰\[Ùˆ\™Ý[Y[ÖÌ×HOH˜›ÛÛX[ˆ‰‰˜\™Ý[Y[ÖÌ×HOO[[
]›ÝÈ™]ÈJ˜›Û‘[[Y\˜X›XYˆ›ÝšYY]\Ý™HH›ÛÛX[ˆÜˆ[ŠNÚYŠ\™Ý[Y[Ë›[™Ý	‰\[Ùˆ\™Ý[Y[ÖÍHOH˜›ÛÛX[ˆ‰‰˜\™Ý[Y[ÖÍHOO[[
]›ÝÈ™]ÈJ˜›Û•Üš]X›XYˆ›ÝšYY]\Ý™HH›ÛÛX[ˆÜˆ[ŠNÚYŠ\™Ý[Y[Ë›[™ÝI‰\[Ùˆ\™Ý[Y[ÖÍWHOH˜›ÛÛX[ˆ‰‰˜\™Ý[Y[ÖÍWHOO[[
]›ÝÈ™]ÈJ˜›ÛÛÛ™šYÝ\˜X›XYˆ›ÝšYY]\Ý™HH›ÛÛX[ˆÜˆ[ŠNÚYŠ\™Ý[Y[Ë›[™Ý‰‰\[Ùˆ\™Ý[Y[ÖÍ—HOH˜›ÛÛX[ˆŠ]›ÝÈ™]ÈJ˜ÛÜÙXYˆ›ÝšYY]\Ý™HH›ÛÛX[ˆŠNÝ˜\ˆX\™Ý[Y[Ë›[™ÝŒÏØ\™Ý[Y[ÖÌ×N›[ÏX\™Ý[Y[Ë›[™ÝØ\™Ý[Y[ÖÍN›[OX\™Ý[Y[Ë›[™ÝOØ\™Ý[Y[ÖÍWN›[ÏX\™Ý[Y[Ë›[™ÝØ\™Ý[Y[ÖÍ—NˆLKHH\É‰œÊ‹
NÚYŠ×ÊY×Ê‹ØÛÛ™šYÝ\˜X›N˜OOO[[	‰™Ù˜ÛÛ™šYÝ\˜X›NˆXK[[Y\˜X›NœOO[[	‰™Ù™[[Y\˜X›Nˆ\‹˜[YNšKÜš]X›N›ÏOO[[	‰™ÙÜš]X›Nˆ[ßJNÙ[ÙHYŠß\‰‰ˆ[É‰ˆXJ[–ÝOZNÙ[ÙH›ÝÈ™]ÈŽJ•\È[š\›Û›Y[Ù\È›ÝÝ\ÜYš[š[™ÈH›Ü\H\È›Û‹XÛÛ™šYÝ\˜X›K›Û‹]Üš]X›KÜˆ›Û‹Y[[Y\˜X›KˆŠ__JNÝ˜\ˆWÏRJ
œÙK—ÊOOžÈ\ÙHÝšXÝŽÝ˜\ˆSÏIŠ
KWÏY[˜Ý[ÛŠ
^Ü™]\›ˆHYSßNÞWËš\Ð\œ˜^S[™ÝYš[™PYÏY[˜Ý[ÛŠ
^ÚYŠYSÊ\™]\›ˆ[Ýž^Ü™]\›ˆSÊ×K›[™Ý‹Ý˜[YNŒ_JK›[™ÝOOL_XØ]ÚÜ™]\›ˆL_NÐ—Ë™^ÜÏ^WßJNÝ˜\ˆ“ÏRJ
œÙKWÊOOžÈ\ÙHÝšXÝŽÝ˜\ˆNO[×Ê
KÎO]\[ÙˆÞ[X›ÛOH™[˜Ý[Ûˆ‰‰\[ÙˆÞ[X›Û
™›ÛÈŠOOHœÞ[X›Û‹ÎOSØš™XÝœ›ÝÝ\KÔÝš[™ËÎOP\œ˜^Kœ›ÝÝ\K˜ÛÛ˜Ø]×ÏZÊ
KNOY[˜Ý[ÛŠJ^Ü™]\›ˆ\[ÙˆOOH™[˜Ý[Ûˆ‰‰”ÎK˜Ø[
JOOOH–ÛØš™XÝ[˜Ý[Û—HŸK×Ï[WÊ
J
KNOY[˜Ý[ÛŠK‹J^ÚYŠˆ[ˆJ^ÚYŠOOOHL
^ÚYŠVÛ—OOO]
\™]\›ŸY[ÙHYŠQNJJ_ZJ
J\™]\›ŸT×ÏÐ×ÊK‹L
N×ÊK‹
_K×ÏY[˜Ý[ÛŠKŠ^Ý˜\ˆX\™Ý[Y[Ë›[™ÝŒØ\™Ý[Y[ÖÌ—NžßKO[NJŠNÐÎI‰ŠOZÎK˜Ø[
KØš™XÝ™Ù]ÝÛ”›Ü\TÞ[X›ÛÊŠJJNÙ›ÜŠ˜\ˆLÜK›[™ÝÜŠÏLJTNJKVÜ—K–ÚVÜ—WKÚVÜ—WJ_NÚ×ËœÝ\ÜÑ\ØÜš\ÜœÏHHT×ÎÑWË™^ÜÏZ×ßJNÝ˜\ˆÏRJ
ÙKš
OOžÈ\ÙHÝšXÝŽÝ\[ÙˆÙ[HØš™^ÜÏ\Ù[Ž\[ÙˆÚ[™ÝÏHØš™^ÜÏ]Ú[™ÝÎ˜š™^ÜÏQ[˜Ý[ÛŠœ™]\›ˆ\ÈŠJ
_JNÝ˜\ˆ“ÏRJ
œÙKWÊOOžÈ\ÙHÝšXÝŽÝ˜\ˆÎO]Ê
NÔWË™^ÜÏY[˜Ý[ÛŠ
^Ü™]\›ˆ\[ÙˆÛØ˜[OH›Øš™XÝŸYÛØ˜[ÛØ˜[“X]OOSX]ÛØ˜[\œ˜^HOOP\œ˜^OÝÎN™ÛØ˜[_JNÝ˜\ˆ—ÏRJ
œÙK×ÊOOžÈ\ÙHÝšXÝŽÝ˜\ˆŽO[“Ê
KŽOZŠ
KO\“Ê
NÝ×Ë™^ÜÏY[˜Ý[ÛŠ
^Ý˜\ˆTJ
NÚYŠŽKœÝ\ÜÑ\ØÜš\ÜœÊ^Ý˜\ˆTŽJ‹™ÛØ˜[\ÈŠNÊ]˜ÛÛ™šYÝ\˜X›I‰Š™[[Y\˜X›_]Üš]X›_ÛØ˜[\ÈOO[ŠJI‰“Øš™XÝ™Yš[™T›Ü\J‹™ÛØ˜[\È‹ØÛÛ™šYÝ\˜X›NˆL[[Y\˜X›NˆLK˜[YN›‹Üš]X›NˆLJ_Y[ÙJ\[ÙˆÛØ˜[\ÈOH›Øš™XÝŸÛØ˜[\ÈOO[ŠI‰Š‹™ÛØ˜[\Ï[ŠNÜ™]\›ˆŸ_JNÝ˜\ˆ—ÏRJ
ÜÙK—ÊOOžÈ\ÙHÝšXÝŽÝ˜\ˆŽO[“Ê
KŽO]Ê
K—Ï\“Ê
KÎOX—Ê
KOT—Ê
KÏY[˜Ý[ÛŠ
^Ü™]\›ˆ_NÓŽJËÙÙ]ÛYš[”—Ë[\[Y[][ÛŽŽKÚ[N“Î_JNÓ—Ë™^ÜÏTßJNÝ˜\ˆØÏRJOOžÈ\ÙHÝšXÝŽÝ˜\ˆNO]I‰K—×Ù^[™ß
[˜Ý[ÛŠ
^Ý˜\ˆOY[˜Ý[ÛŠ‹
^Ü™]\›ˆOSØš™XÝœÙ]›ÝÝ\SÙŸ××Ü›Ý××Î–×_Z[œÝ[˜Ù[Ùˆ\œ˜^I‰™[˜Ý[ÛŠKŠ^ÚK—×Ü›Ý××Ï\Ÿ_[˜Ý[ÛŠKŠ^Ù›ÜŠ˜\ˆÈ[ˆŠ\‹š\ÓÝÛ”›Ü\JÊI‰ŠVÛ×O\–Û×J_KJ‹
_NÜ™]\›ˆ[˜Ý[ÛŠ‹
^ÙJ‹
NÙ[˜Ý[ÛˆJ
^Ý\Ë˜ÛÛœÝXÝÜ[Ÿ[‹œ›ÝÝ\O]OO[[ÓØš™XÝ˜Ü™X]J
NŠKœ›ÝÝ\O]œ›ÝÝ\K™]ÈJ__JJ
NÓØš™XÝ™Yš[™T›Ü\JK—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÝK““×ÒS]K““Ï]K“Y[[ÜžTÝ™X[O]K”Ý™X[O]›ÚYÝ˜\ˆOU“J
KO]—Ê
Kš^K™Y˜][
K™Ù]ÛYš[

JK^ßNÝK““ÏVÙ[˜Ý[Ûˆ	J
^ßY[˜Ý[Ûˆ
J^Ù›ÜŠ˜\ˆYK›[™ÝP\œ˜^JŠKOLÚOŽÊÊÚJ]ÚWOYVÚWNÜ™]\›ˆY[˜Ý[ÛˆŽJKŠ^Ü™]\›ˆ[˜Ý[ÛŠJ^Ü™]\›ˆJJI‰›ŠJ__Y[˜Ý[ÛˆÓÊK‹
^Ýž^Ü™]\›ˆK™ŠŠ_XØ]Ú
J^Ü™]\›ˆ—ÙJJK_]˜\ˆÝO^×ÛŽ‰KÙN‰KØÎ‰_NÝK““×ÒS\ÝNÙ[˜Ý[Ûˆ×ÊJ^ÙK—ÜÝ\Y[˜Ý[ÛŠ
^Ý›™^]—Û‹™\œ›Ü]—ÙK˜ÛÛ\]O]—ØË\ËœÝ\

_KK—ÜÝÜYKœÝÜ]˜\ˆŽOJ[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ‹
^Ý\Ë—ÜÝ™X[O[‹\Ë—Û\Ý[™\]\™]\›ˆKœ›ÝÝ\K[œÝXœØÜšX™OY[˜Ý[ÛŠ
^Ý\Ë—ÜÝ™X[K—Ü™[[Ý™J\Ë—Û\Ý[™\Š_K_JJ
KNOJ[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJŠ^Ý\Ë—Û\Ý[™\[Ÿ\™]\›ˆKœ›ÝÝ\K›™^Y[˜Ý[ÛŠŠ^Ý\Ë—Û\Ý[™\‹—ÛŠŠ_KKœ›ÝÝ\K™\œ›ÜY[˜Ý[ÛŠŠ^Ý\Ë—Û\Ý[™\‹—ÙJŠ_KKœ›ÝÝ\K˜ÛÛ\]OY[˜Ý[ÛŠ
^Ý\Ë—Û\Ý[™\‹—ØÊ
_K_JJ
KOJ[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJŠ^Ý\Ë\OH™œ›ÛSØœÙ\˜X›H‹\Ëš[œÏ[‹\Ë˜XÝ]™OHL_\™]\›ˆKœ›ÝÝ\K—ÜÝ\Y[˜Ý[ÛŠŠ^Ý\Ë›Ý][‹\Ë˜XÝ]™OHL\Ë—ÜÝX]\Ëš[œËœÝXœØÜšX™J™]ÈNJŠJK\Ë˜XÝ]™_\Ë—ÜÝX‹[œÝXœØÜšX™J
_KKœ›ÝÝ\K—ÜÝÜY[˜Ý[ÛŠ
^Ý\Ë—ÜÝX‰‰\Ë—ÜÝX‹[œÝXœØÜšX™J
K\Ë˜XÝ]™OHL_K_JJ
KNOJ[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJŠ^Ý\Ë\OH›Y\™ÙH‹\Ëš[œÐ\œ[‹\Ë›Ý]V\Ë˜XÏL\™]\›ˆKœ›ÝÝ\K—ÜÝ\Y[˜Ý[ÛŠŠ^Ý\Ë›Ý][ŽÝ˜\ˆ]\Ëš[œÐ\œ‹O]›[™ÝÝ\Ë˜XÏZNÙ›ÜŠ˜\ˆLÜNÜŠÊÊ]Ü—K—ØY
\Ê_KKœ›ÝÝ\K—ÜÝÜY[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆ]\Ëš[œÐ\œ‹[‹›[™ÝOLÚOÚJÊÊ[–ÚWK—Ü™[[Ý™J\ÊNÝ\Ë›Ý]VKKœ›ÝÝ\K—ÛY[˜Ý[ÛŠŠ^Ý˜\ˆ]\Ë›Ý]ÝOOV	‰—ÛŠŠ_KKœ›ÝÝ\K—ÙOY[˜Ý[ÛŠŠ^Ý˜\ˆ]\Ë›Ý]ÝOOV	‰—ÙJŠ_KKœ›ÝÝ\K—ØÏY[˜Ý[ÛŠ
^ÚYŠK]\Ë˜XÏL
^Ý˜\ˆ]\Ë›Ý]ÚYŠOOV
\™]\›ŽÛ‹—ØÊ
__K_JJ
KÎOJ[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ‹J^Ý\ËšO[‹\Ë›Ý]]\ËœZKKš[Ëœ\Ú
\Ê_\™]\›ˆKœ›ÝÝ\K—ÛY[˜Ý[ÛŠŠ^Ý˜\ˆ]\ËœO]\Ë›Ý]ÚYŠHOOV	‰\
‹\ËšJJ^Ý˜\ˆT
˜[ÊNÚK—ÛŠŠ__KKœ›ÝÝ\K—ÙOY[˜Ý[ÛŠŠ^Ý˜\ˆ]\Ë›Ý]ÝOOV	‰—ÙJŠ_KKœ›ÝÝ\K—ØÏY[˜Ý[ÛŠ
^Ý˜\ˆ]\ËœÛ‹›Ý]OOV	‰‹K[‹“˜ÏOOL	‰›‹›Ý]—ØÊ
_K_JJ
KÎOJ[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJŠ^Ý\Ë\OH˜ÛÛXš[™H‹\Ëš[œÐ\œ[‹\Ë›Ý]V\Ëš[ÏV×K\Ë“˜Ï]\Ë“›L\Ë˜[ÏV×_\™]\›ˆKœ›ÝÝ\K\Y[˜Ý[ÛŠ‹
^Ý˜\ˆO]\Ë˜[ÖÝK]\Ë“›ÚOOOVËK]\Ë“›Ž\Ë“›ŽŒÜ™]\›ˆ\Ë˜[ÖÝO[‹OOLKKœ›ÝÝ\K—ÜÝ\Y[˜Ý[ÛŠŠ^Ý\Ë›Ý][ŽÝ˜\ˆ]\Ëš[œÐ\œ‹O]\Ë“˜Ï]\Ë“›]›[™Ý]\Ë˜[Ï[™]È\œ˜^JJNÚYŠOOOL
[‹—ÛŠ×JK‹—ØÊ
NÙ[ÙH›ÜŠ˜\ˆÏLÛÏNÛÊÊÊ\–Û×OVÛ×K—ØY
™]ÈÎJË‹\ÊJ_KKœ›ÝÝ\K—ÜÝÜY[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆ]\Ëš[œÐ\œ‹[‹›[™ÝO]\Ëš[ËLÜÜŠÊÊ[–Ü—K—Ü™[[Ý™JVÜ—JNÝ\Ë›Ý]V\Ëš[ÏV×K\Ë˜[ÏV×_K_JJ
KŽOJ[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJŠ^Ý\Ë\OH™œ›ÛP\œ˜^H‹\Ë˜O[Ÿ\™]\›ˆKœ›ÝÝ\K—ÜÝ\Y[˜Ý[ÛŠŠ^Ù›ÜŠ˜\ˆ]\Ë˜KOL]›[™ÝÚOŽÚJÊÊ[‹—ÛŠÚWJNÛ‹—ØÊ
_KKœ›ÝÝ\K—ÜÝÜY[˜Ý[ÛŠ
^ßK_JJ
KÎOJ[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJŠ^Ý\Ë\OH™œ›ÛT›ÛZ\ÙH‹\Ë›ÛHLK\Ëœ[Ÿ\™]\›ˆKœ›ÝÝ\K—ÜÝ\Y[˜Ý[ÛŠŠ^Ý˜\ˆ]\ÎÝ\Ë›ÛHL\Ëœ[Š[˜Ý[ÛŠJ^Ý›Û‰‰Š‹—ÛŠJK‹—ØÊ
J_K[˜Ý[ÛŠJ^Û‹—ÙJJ_JK[Š	K[˜Ý[ÛŠJ^ÜÙ][Y[Ý]
[˜Ý[ÛŠ
^Ý›ÝÈ_J_J_KKœ›ÝÝ\K—ÜÝÜY[˜Ý[ÛŠ
^Ý\Ë›ÛHL_K_JJ
KÎOJ[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJŠ^Ý\Ë\OHœ\š[ÙXÈ‹\Ëœ\š[Ù[‹\Ëš[\˜[QKLK\ËšOL\™]\›ˆKœ›ÝÝ\K—ÜÝ\Y[˜Ý[ÛŠŠ^Ý˜\ˆ]\ÎÙ[˜Ý[ÛˆJ
^Û‹—ÛŠšJÊÊ_]\Ëš[\˜[Q\Ù][\˜[
K\Ëœ\š[Ù
_KKœ›ÝÝ\K—ÜÝÜY[˜Ý[ÛŠ
^Ý\Ëš[\˜[QOOKLI‰˜ÛX\’[\˜[
\Ëš[\˜[Q
K\Ëš[\˜[QKLK\ËšOLK_JJ
KOJ[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ‹
^Ý\Ë\OH™XYÈ‹\Ëš[œÏ[‹\Ë›Ý]V\ËœÏIK\Ë›Hˆ‹\[ÙˆOHœÝš[™ÈÝ\Ë›]\[ÙˆOH™[˜Ý[Ûˆ‰‰Š\ËœÏ]
_\™]\›ˆKœ›ÝÝ\K—ÜÝ\Y[˜Ý[ÛŠŠ^Ý\Ë›Ý][‹\Ëš[œË—ØY
\Ê_KKœ›ÝÝ\K—ÜÝÜY[˜Ý[ÛŠ
^Ý\Ëš[œË—Ü™[[Ý™J\ÊK\Ë›Ý]VKKœ›ÝÝ\K—ÛY[˜Ý[ÛŠŠ^Ý˜\ˆ]\Ë›Ý]ÚYŠOOV
^Ý˜\ˆO]\ËœË]\Ë›ÚYŠHOOIJ]ž^ÚJŠ_XØ]Ú
Ê^Ý—ÙJÊ_Y[ÙHØÛÛœÛÛK›ÙÊŠÈŽˆ‹ŠN˜ÛÛœÛÛK›ÙÊŠNÝ—ÛŠŠ__KKœ›ÝÝ\K—ÙOY[˜Ý[ÛŠŠ^Ý˜\ˆ]\Ë›Ý]ÝOOV	‰—ÙJŠ_KKœ›ÝÝ\K—ØÏY[˜Ý[ÛŠ
^Ý˜\ˆ]\Ë›Ý]ÛˆOOV	‰›‹—ØÊ
_K_JJ
KNOJ[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ‹
^Ý\Ë\OH™›Ü‹\Ëš[œÏ]\Ë›Ý]V\Ë›X^[‹\Ë™›ÜYL\™]\›ˆKœ›ÝÝ\K—ÜÝ\Y[˜Ý[ÛŠŠ^Ý\Ë›Ý][‹\Ë™›ÜYL\Ëš[œË—ØY
\Ê_KKœ›ÝÝ\K—ÜÝÜY[˜Ý[ÛŠ
^Ý\Ëš[œË—Ü™[[Ý™J\ÊK\Ë›Ý]VKKœ›ÝÝ\K—ÛY[˜Ý[ÛŠŠ^Ý˜\ˆ]\Ë›Ý]ÝOOV	‰\Ë™›ÜY
ÊÏ]\Ë›X^	‰—ÛŠŠ_KKœ›ÝÝ\K—ÙOY[˜Ý[ÛŠŠ^Ý˜\ˆ]\Ë›Ý]ÝOOV	‰—ÙJŠ_KKœ›ÝÝ\K—ØÏY[˜Ý[ÛŠ
^Ý˜\ˆ]\Ë›Ý]ÛˆOOV	‰›‹—ØÊ
_K_JJ
KŽOJ[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ‹
^Ý\Ë›Ý][‹\Ë›Ü]\™]\›ˆKœ›ÝÝ\K—ÛY[˜Ý[ÛŠ
^Ý\Ë›Ü™[™

_KKœ›ÝÝ\K—ÙOY[˜Ý[ÛŠŠ^Ý\Ë›Ý]—ÙJŠ_KKœ›ÝÝ\K—ØÏY[˜Ý[ÛŠ
^Ý\Ë›Ü™[™

_K_JJ
KŽOJ[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ‹
^Ý\Ë\OH™[™Ú[ˆ‹\Ëš[œÏ]\Ë›Ý]V\Ë›Ï[‹\Ë›Ú[\Ý_\™]\›ˆKœ›ÝÝ\K—ÜÝ\Y[˜Ý[ÛŠŠ^Ý\Ë›Ý][‹\Ë›Ë—ØY
\Ë›Ú[[™]ÈŽJ‹\ÊJK\Ëš[œË—ØY
\Ê_KKœ›ÝÝ\K—ÜÝÜY[˜Ý[ÛŠ
^Ý\Ëš[œË—Ü™[[Ý™J\ÊK\Ë›Ë—Ü™[[Ý™J\Ë›Ú[
K\Ë›Ý]V\Ë›Ú[\Ý_KKœ›ÝÝ\K™[™Y[˜Ý[ÛŠ
^Ý˜\ˆ]\Ë›Ý]ÛˆOOV	‰›‹—ØÊ
_KKœ›ÝÝ\K—ÛY[˜Ý[ÛŠŠ^Ý˜\ˆ]\Ë›Ý]ÝOOV	‰—ÛŠŠ_KKœ›ÝÝ\K—ÙOY[˜Ý[ÛŠŠ^Ý˜\ˆ]\Ë›Ý]ÝOOV	‰—ÙJŠ_KKœ›ÝÝ\K—ØÏY[˜Ý[ÛŠ
^Ý\Ë™[™

_K_JJ
KSÏJ[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ‹
^Ý\Ë\OH™š[\ˆ‹\Ëš[œÏ]\Ë›Ý]V\Ë™[Ÿ\™]\›ˆKœ›ÝÝ\K—ÜÝ\Y[˜Ý[ÛŠŠ^Ý\Ë›Ý][‹\Ëš[œË—ØY
\Ê_KKœ›ÝÝ\K—ÜÝÜY[˜Ý[ÛŠ
^Ý\Ëš[œË—Ü™[[Ý™J\ÊK\Ë›Ý]VKKœ›ÝÝ\K—ÛY[˜Ý[ÛŠŠ^Ý˜\ˆ]\Ë›Ý]ÚYŠOOV
^Ý˜\ˆO[ÓÊ\Ë‹
NÚOOOVZ_—ÛŠŠ__KKœ›ÝÝ\K—ÙOY[˜Ý[ÛŠŠ^Ý˜\ˆ]\Ë›Ý]ÝOOV	‰—ÙJŠ_KKœ›ÝÝ\K—ØÏY[˜Ý[ÛŠ
^Ý˜\ˆ]\Ë›Ý]ÛˆOOV	‰›‹—ØÊ
_K_JJ
KOJ[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ‹
^Ý\Ë›Ý][‹\Ë›Ü]\™]\›ˆKœ›ÝÝ\K—ÛY[˜Ý[ÛŠŠ^Ý\Ë›Ý]—ÛŠŠ_KKœ›ÝÝ\K—ÙOY[˜Ý[ÛŠŠ^Ý\Ë›Ý]—ÙJŠ_KKœ›ÝÝ\K—ØÏY[˜Ý[ÛŠ
^Ý\Ë›Üš[›™\V\Ë›Ü›\ÜÊ
_K_JJ
K	OJ[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJŠ^Ý\Ë\OH™›][ˆ‹\Ëš[œÏ[‹\Ë›Ý]V\Ë›Ü[HL\Ëš[›™\V\Ëš[\Ý_\™]\›ˆKœ›ÝÝ\K—ÜÝ\Y[˜Ý[ÛŠŠ^Ý\Ë›Ý][‹\Ë›Ü[HL\Ëš[›™\V\Ëš[\ÝK\Ëš[œË—ØY
\Ê_KKœ›ÝÝ\K—ÜÝÜY[˜Ý[ÛŠ
^Ý\Ëš[œË—Ü™[[Ý™J\ÊK\Ëš[›™\ˆOOV	‰\Ëš[›™\‹—Ü™[[Ý™J\Ëš[
K\Ë›Ý]V\Ë›Ü[HL\Ëš[›™\V\Ëš[\Ý_KKœ›ÝÝ\K›\ÜÏY[˜Ý[ÛŠ
^Ý˜\ˆ]\Ë›Ý]ÛˆOOV	‰ˆ]\Ë›Ü[‰‰\Ëš[›™\OOV	‰›‹—ØÊ
_KKœ›ÝÝ\K—ÛY[˜Ý[ÛŠŠ^Ý˜\ˆ]\Ë›Ý]ÚYŠOOV
^Ý˜\ˆO]\ËZKš[›™\‹ÏZKš[ÜˆOOV	‰›ÈOO\ÝI‰œ‹—Ü™[[Ý™JÊK
\Ëš[›™\[ŠK—ØY
\Ëš[[™]ÈJ\ÊJ__KKœ›ÝÝ\K—ÙOY[˜Ý[ÛŠŠ^Ý˜\ˆ]\Ë›Ý]ÝOOV	‰—ÙJŠ_KKœ›ÝÝ\K—ØÏY[˜Ý[ÛŠ
^Ý\Ë›Ü[HLK\Ë›\ÜÊ
_K_JJ
KŽOJ[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ‹J^Ý˜\ˆ]\ÎÝ\Ë\OH™›Û‹\Ëš[œÏZK\Ë›Ý]V\Ë™Y[˜Ý[ÛŠÊ^Ü™]\›ˆŠ‹˜XØËÊ_K\Ë˜XØÏ]\ËœÙYY]\™]\›ˆKœ›ÝÝ\K—ÜÝ\Y[˜Ý[ÛŠŠ^Ý\Ë›Ý][‹\Ë˜XØÏ]\ËœÙYY‹—ÛŠ\Ë˜XØÊK\Ëš[œË—ØY
\Ê_KKœ›ÝÝ\K—ÜÝÜY[˜Ý[ÛŠ
^Ý\Ëš[œË—Ü™[[Ý™J\ÊK\Ë›Ý]V\Ë˜XØÏ]\ËœÙYYKKœ›ÝÝ\K—ÛY[˜Ý[ÛŠŠ^Ý˜\ˆ]\Ë›Ý]ÚYŠOOV
^Ý˜\ˆO[ÓÊ\Ë‹
NÚHOOV	‰—ÛŠ\Ë˜XØÏZJ__KKœ›ÝÝ\K—ÙOY[˜Ý[ÛŠŠ^Ý˜\ˆ]\Ë›Ý]ÝOOV	‰—ÙJŠ_KKœ›ÝÝ\K—ØÏY[˜Ý[ÛŠ
^Ý˜\ˆ]\Ë›Ý]ÛˆOOV	‰›‹—ØÊ
_K_JJ
KIJ[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJŠ^Ý\Ë\OH›\Ý‹\Ëš[œÏ[‹\Ë›Ý]V\Ëš\ÏHLK\Ë˜[V\™]\›ˆKœ›ÝÝ\K—ÜÝ\Y[˜Ý[ÛŠŠ^Ý\Ë›Ý][‹\Ëš\ÏHLK\Ëš[œË—ØY
\Ê_KKœ›ÝÝ\K—ÜÝÜY[˜Ý[ÛŠ
^Ý\Ëš[œË—Ü™[[Ý™J\ÊK\Ë›Ý]V\Ë˜[VKKœ›ÝÝ\K—ÛY[˜Ý[ÛŠŠ^Ý\Ëš\ÏHL\Ë˜[[ŸKKœ›ÝÝ\K—ÙOY[˜Ý[ÛŠŠ^Ý˜\ˆ]\Ë›Ý]ÝOOV	‰—ÙJŠ_KKœ›ÝÝ\K—ØÏY[˜Ý[ÛŠ
^Ý˜\ˆ]\Ë›Ý]ÛˆOOV	‰Š\Ëš\ÏÊ‹—ÛŠ\Ë˜[
K‹—ØÊ
JN›‹—ÙJ™]È\œ›ÜŠ›\Ý

H˜Z[Y™XØ]\ÙH[œ]Ý™X[HÛÛ\]YŠJJ_K_JJ
K‰J[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ‹
^Ý\Ë\OH›X\‹\Ëš[œÏ]\Ë›Ý]V\Ë™[Ÿ\™]\›ˆKœ›ÝÝ\K—ÜÝ\Y[˜Ý[ÛŠŠ^Ý\Ë›Ý][‹\Ëš[œË—ØY
\Ê_KKœ›ÝÝ\K—ÜÝÜY[˜Ý[ÛŠ
^Ý\Ëš[œË—Ü™[[Ý™J\ÊK\Ë›Ý]VKKœ›ÝÝ\K—ÛY[˜Ý[ÛŠŠ^Ý˜\ˆ]\Ë›Ý]ÚYŠOOV
^Ý˜\ˆO[ÓÊ\Ë‹
NÚHOOV	‰—ÛŠJ__KKœ›ÝÝ\K—ÙOY[˜Ý[ÛŠŠ^Ý˜\ˆ]\Ë›Ý]ÝOOV	‰—ÙJŠ_KKœ›ÝÝ\K—ØÏY[˜Ý[ÛŠ
^Ý˜\ˆ]\Ë›Ý]ÛˆOOV	‰›‹—ØÊ
_K_JJ
K	J[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJŠ^Ý\Ë\OHœ™[Y[X™\ˆ‹\Ëš[œÏ[‹\Ë›Ý]V\™]\›ˆKœ›ÝÝ\K—ÜÝ\Y[˜Ý[ÛŠŠ^Ý\Ë›Ý][‹\Ëš[œË—ØY
Š_KKœ›ÝÝ\K—ÜÝÜY[˜Ý[ÛŠ
^Ý\Ëš[œË—Ü™[[Ý™J\Ë›Ý]
K\Ë›Ý]VK_JJ
K‰J[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ‹
^Ý\Ë\OHœ™\XÙQ\œ›Üˆ‹\Ëš[œÏ]\Ë›Ý]V\Ë™[Ÿ\™]\›ˆKœ›ÝÝ\K—ÜÝ\Y[˜Ý[ÛŠŠ^Ý\Ë›Ý][‹\Ëš[œË—ØY
\Ê_KKœ›ÝÝ\K—ÜÝÜY[˜Ý[ÛŠ
^Ý\Ëš[œË—Ü™[[Ý™J\ÊK\Ë›Ý]VKKœ›ÝÝ\K—ÛY[˜Ý[ÛŠŠ^Ý˜\ˆ]\Ë›Ý]ÝOOV	‰—ÛŠŠ_KKœ›ÝÝ\K—ÙOY[˜Ý[ÛŠŠ^Ý˜\ˆ]\Ë›Ý]ÚYŠOOV
]ž^Ý\Ëš[œË—Ü™[[Ý™J\ÊK
\Ëš[œÏ]\Ë™ŠŠJK—ØY
\Ê_XØ]Ú
J^Ý—ÙJJ__KKœ›ÝÝ\K—ØÏY[˜Ý[ÛŠ
^Ý˜\ˆ]\Ë›Ý]ÛˆOOV	‰›‹—ØÊ
_K_JJ
KIJ[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ‹
^Ý\Ë\OHœÝ\Ú]‹\Ëš[œÏ[‹\Ë›Ý]V\Ë˜[]\™]\›ˆKœ›ÝÝ\K—ÜÝ\Y[˜Ý[ÛŠŠ^Ý\Ë›Ý][‹\Ë›Ý]—ÛŠ\Ë˜[
K\Ëš[œË—ØY
Š_KKœ›ÝÝ\K—ÜÝÜY[˜Ý[ÛŠ
^Ý\Ëš[œË—Ü™[[Ý™J\Ë›Ý]
K\Ë›Ý]VK_JJ
KÉJ[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJ‹
^Ý\Ë\OHZÙH‹\Ëš[œÏ]\Ë›Ý]V\Ë›X^[‹\ËZÙ[L\™]\›ˆKœ›ÝÝ\K—ÜÝ\Y[˜Ý[ÛŠŠ^Ý\Ë›Ý][‹\ËZÙ[L\Ë›X^LÛ‹—ØÊ
N\Ëš[œË—ØY
\Ê_KKœ›ÝÝ\K—ÜÝÜY[˜Ý[ÛŠ
^Ý\Ëš[œË—Ü™[[Ý™J\ÊK\Ë›Ý]VKKœ›ÝÝ\K—ÛY[˜Ý[ÛŠŠ^Ý˜\ˆ]\Ë›Ý]ÚYŠOOV
^Ý˜\ˆOJÊÝ\ËZÙ[ŽÚO\Ë›X^Ý—ÛŠŠNšOOO]\Ë›X^	‰Š—ÛŠŠK—ØÊ
J__KKœ›ÝÝ\K—ÙOY[˜Ý[ÛŠŠ^Ý˜\ˆ]\Ë›Ý]ÝOOV	‰—ÙJŠ_KKœ›ÝÝ\K—ØÏY[˜Ý[ÛŠ
^Ý˜\ˆ]\Ë›Ý]ÛˆOOV	‰›‹—ØÊ
_K_JJ
KSÏJ[˜Ý[ÛŠ
^Ù[˜Ý[ÛˆJŠ^Ý\Ë—Ü›Ù[Ÿ\Ë—Ú[ÏV×K\Ë—ÜÝÜQV\Ë—ÙV\Ë—ÙHLK\Ë—Ý\™Ù][[\Ë—Ù\œV\™]\›ˆKœ›ÝÝ\K—ÛY[˜Ý[ÛŠŠ^Ý˜\ˆ]\Ë—Ú[ËO]›[™ÝÚYŠ\Ë—Ù	‰\Ë—Ù—ÛŠŠKOOLJ]ÌK—ÛŠŠNÙ[Ù^ÚYŠOOL
\™]\›ŽÙ›ÜŠ˜\ˆT

KÏLÛÏNÛÊÊÊ\–Û×K—ÛŠŠ__KKœ›ÝÝ\K—ÙOY[˜Ý[ÛŠŠ^ÚYŠ\Ë—Ù\œOOV
^Ý\Ë—Ù\œ[ŽÝ˜\ˆ]\Ë—Ú[ËO]›[™ÝÚYŠ\Ë—Þ

K\Ë—Ù	‰\Ë—Ù—ÙJŠKOOLJ]ÌK—ÙJŠNÙ[Ù^ÚYŠOOL
\™]\›ŽÙ›ÜŠ˜\ˆT

KÏLÛÏNÛÊÊÊ\–Û×K—ÙJŠ_ZYŠ]\Ë—Ù	‰šOOL
]›ÝÈ\Ë—Ù\œŸ_KKœ›ÝÝ\K—ØÏY[˜Ý[ÛŠ
^Ý˜\ˆ]\Ë—Ú[Ë[‹›[™ÝÚYŠ\Ë—Þ

K\Ë—Ù	‰\Ë—Ù—ØÊ
KOLJ[–ÌK—ØÊ
NÙ[Ù^ÚYŠOL
\™]\›ŽÙ›ÜŠ˜\ˆOT
ŠKLÜÜŠÊÊZVÜ—K—ØÊ
__KKœ›ÝÝ\K—ÞY[˜Ý[ÛŠ
^Ý\Ë—Ú[Ë›[™ÝOOL	‰Š\Ë—Ü›ÙOOV	‰\Ë—Ü›Ù—ÜÝÜ

K\Ë—Ù\œV\Ë—Ú[ÏV×J_KKœ›ÝÝ\K—ÜÝÜ›ÝÏY[˜Ý[ÛŠ
^Ý\Ë—Ü›Ù—ÜÝÜ

K\Ë—Ù\œV\Ë—ÜÝÜQVKKœ›ÝÝ\K—ØYY[˜Ý[ÛŠŠ^Ý˜\ˆ]\Ë—Ý\™Ù]ÚYŠ
\™]\›ˆ—ØY
ŠNÝ˜\ˆO]\Ë—Ú[ÎÚYŠKœ\Ú
ŠKJK›[™ÝŒJJZYŠ\Ë—ÜÝÜQOOV
XÛX\•[Y[Ý]
\Ë—ÜÝÜQ
K\Ë—ÜÝÜQVÙ[Ù^Ý˜\ˆ]\Ë—Ü›ÙÜˆOOV	‰œ‹—ÜÝ\
\Ê__KKœ›ÝÝ\K—Ü™[[Ý™OY[˜Ý[ÛŠŠ^Ý˜\ˆ]\ËO]\Ë—Ý\™Ù]ÚYŠJ\™]\›ˆK—Ü™[[Ý™JŠNÝ˜\ˆ]\Ë—Ú[ËÏ\‹š[™^ÙŠŠNÛÏ‹LI‰Š‹œÜXÙJËJK\Ë—Ü›ÙOOV	‰œ‹›[™ÝLÊ\Ë—Ù\œV\Ë—ÜÝÜQ\Ù][Y[Ý]
[˜Ý[ÛŠ
^Ü™]\›ˆ—ÜÝÜ›ÝÊ
_JJNœ‹›[™ÝOOLI‰\Ë—Ü[™PÞXÛ\Ê
J_KKœ›ÝÝ\K—Ü[™PÞXÛ\ÏY[˜Ý[ÛŠ
^Ý\Ë—Ú\Ó›ÔÚ[šÜÊ\Ë×JI‰\Ë—Ü™[[Ý™J\Ë—Ú[ÖÌJ_KKœ›ÝÝ\K—Ú\Ó›ÔÚ[šÜÏY[˜Ý[ÛŠ‹
^ÚYŠš[™^ÙŠŠHOOKLJ\™]\›ˆLÚYŠ‹›Ý]OO]\Ê\™]\›ˆLÚYŠ‹›Ý]	‰›‹›Ý]OOV
\™]\›ˆ\Ë—Ú\Ó›ÔÚ[šÜÊ‹›Ý]˜ÛÛ˜Ø]
ŠJNÚYŠ‹—Ú[Ê^Ù›ÜŠ˜\ˆOL[‹—Ú[Ë›[™ÝÚOŽÚJÊÊZYŠ]\Ë—Ú\Ó›ÔÚ[šÜÊ‹—Ú[ÖÚWK˜ÛÛ˜Ø]
ŠJJ\™]\›ˆLNÜ™]\›ˆLY[ÙH™]\›ˆL_KKœ›ÝÝ\K˜ÝÜY[˜Ý[ÛŠ
^Ü™]\›ˆ\È[œÝ[˜Ù[ÙˆXÏÔXÎ™_KKœ›ÝÝ\K˜Y\Ý[™\Y[˜Ý[ÛŠŠ^Û‹—Û[‹›™^	K‹—ÙO[‹™\œ›ÜŸ	K‹—ØÏ[‹˜ÛÛ\]_	K\Ë—ØY
Š_KKœ›ÝÝ\Kœ™[[Ý™S\Ý[™\Y[˜Ý[ÛŠŠ^Ý\Ë—Ü™[[Ý™JŠ_KKœ›ÝÝ\KœÝXœØÜšX™OY[˜Ý[ÛŠŠ^Ü™]\›ˆ\Ë˜Y\Ý[™\ŠŠK™]ÈŽJ\ËŠ_KKœ›ÝÝ\VÔšOY[˜Ý[ÛŠ
^Ü™]\›ˆ\ßKK˜Ü™X]OY[˜Ý[ÛŠŠ^ÚYŠŠ^ÚYŠ\[Ùˆ‹œÝ\OH™[˜Ý[ÛˆŸ\[Ùˆ‹œÝÜOH™[˜Ý[ÛˆŠ]›ÝÈ™]È\œ›ÜŠœ›ÙXÙ\ˆ™\]Z\™\È›ÝÝ\[™ÝÜ[˜Ý[ÛœÈŠNÓ×ÊŠ_\™]\›ˆ™]ÈJŠ_KK˜Ü™X]UÚ]Y[[ÜžOY[˜Ý[ÛŠŠ^Ü™]\›ˆ‰‰“×ÊŠK™]ÈXÊŠ_KK›™]™\Y[˜Ý[ÛŠ
^Ü™]\›ˆ™]ÈJ×ÜÝ\‰KÜÝÜ‰_J_KK™[\OY[˜Ý[ÛŠ
^Ü™]\›ˆ™]ÈJ×ÜÝ\™[˜Ý[ÛŠŠ^Û‹—ØÊ
_KÜÝÜ‰_J_KK›ÝÏY[˜Ý[ÛŠŠ^Ü™]\›ˆ™]ÈJ×ÜÝ\™[˜Ý[ÛŠ
^Ý—ÙJŠ_KÜÝÜ‰_J_KK™œ›ÛOY[˜Ý[ÛŠŠ^ÚYŠ\[Ùˆ–ÔšOOH™[˜Ý[ÛˆŠ\™]\›ˆK™œ›ÛSØœÙ\˜X›JŠNÚYŠ\[Ùˆ‹[OH™[˜Ý[ÛˆŠ\™]\›ˆK™œ›ÛT›ÛZ\ÙJŠNÚYŠ\œ˜^Kš\Ð\œ˜^JŠJ\™]\›ˆK™œ›ÛP\œ˜^JŠNÝ›ÝÈ™]È\Q\œ›ÜŠ•\HÙˆ[œ]Èœ›ÛJ
H]\Ý™H[ˆ\œ˜^K›ÛZ\ÙKÜˆØœÙ\˜X›HŠ_KK›ÙY[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KLÝ\™Ý[Y[Ë›[™ÝÝ
ÊÊ[–ÝOX\™Ý[Y[ÖÝNÜ™]\›ˆK™œ›ÛP\œ˜^JŠ_KK™œ›ÛP\œ˜^OY[˜Ý[ÛŠŠ^Ü™]\›ˆ™]ÈJ™]ÈŽJŠJ_KK™œ›ÛT›ÛZ\ÙOY[˜Ý[ÛŠŠ^Ü™]\›ˆ™]ÈJ™]ÈÎJŠJ_KK™œ›ÛSØœÙ\˜X›OY[˜Ý[ÛŠŠ^ÚYŠ‹™[™Ú[ˆOO]›ÚY
\™]\›ˆŽÝ˜\ˆ]\[Ùˆ–ÔšOOH™[˜Ý[ÛˆÛ–ÔšJ
N›ŽÜ™]\›ˆ™]ÈJ™]ÈJ
J_KKœ\š[ÙXÏY[˜Ý[ÛŠŠ^Ü™]\›ˆ™]ÈJ™]ÈÎJŠJ_KKœ›ÝÝ\K—ÛX\Y[˜Ý[ÛŠŠ^Ü™]\›ˆ™]Ê\Ë˜ÝÜŠ
JJ™]È‰
‹\ÊJ_KKœ›ÝÝ\K›X\Y[˜Ý[ÛŠŠ^Ü™]\›ˆ\Ë—ÛX\
Š_KKœ›ÝÝ\K›X\ÏY[˜Ý[ÛŠŠ^Ý˜\ˆ]\Ë›X\
[˜Ý[ÛŠ
^Ü™]\›ˆŸJKO]—Ü›ÙÜ™]\›ˆK\OH›X\È‹KKœ›ÝÝ\K™š[\Y[˜Ý[ÛŠŠ^Ý˜\ˆ]\Ë—Ü›ÙÜ™]\›ˆ[œÝ[˜Ù[ÙˆSÏÛ™]ÈJ™]ÈSÊŽJ™‹ŠKš[œÊJN›™]ÈJ™]ÈSÊ‹\ÊJ_KKœ›ÝÝ\KZÙOY[˜Ý[ÛŠŠ^Ü™]\›ˆ™]Ê\Ë˜ÝÜŠ
JJ™]ÈÉ
‹\ÊJ_KKœ›ÝÝ\K™›ÜY[˜Ý[ÛŠŠ^Ü™]\›ˆ™]ÈJ™]ÈNJ‹\ÊJ_KKœ›ÝÝ\K›\ÝY[˜Ý[ÛŠ
^Ü™]\›ˆ™]ÈJ™]ÈI
\ÊJ_KKœ›ÝÝ\KœÝ\Ú]Y[˜Ý[ÛŠŠ^Ü™]\›ˆ™]ÈXÊ™]ÈI
\ËŠJ_KKœ›ÝÝ\K™[™Ú[Y[˜Ý[ÛŠŠ^Ü™]\›ˆ™]Ê\Ë˜ÝÜŠ
JJ™]ÈŽJ‹\ÊJ_KKœ›ÝÝ\K™›ÛY[˜Ý[ÛŠ‹
^Ü™]\›ˆ™]ÈXÊ™]ÈŽJ‹\ÊJ_KKœ›ÝÝ\Kœ™\XÙQ\œ›ÜY[˜Ý[ÛŠŠ^Ü™]\›ˆ™]Ê\Ë˜ÝÜŠ
JJ™]È‰
‹\ÊJ_KKœ›ÝÝ\K™›][Y[˜Ý[ÛŠ
^Ü™]\›ˆ™]ÈJ™]È	J\ÊJ_KKœ›ÝÝ\K˜ÛÛ\ÜÙOY[˜Ý[ÛŠŠ^Ü™]\›ˆŠ\Ê_KKœ›ÝÝ\Kœ™[Y[X™\Y[˜Ý[ÛŠ
^Ü™]\›ˆ™]ÈXÊ™]È	
\ÊJ_KKœ›ÝÝ\K™XYÏY[˜Ý[ÛŠŠ^Ü™]\›ˆ™]Ê\Ë˜ÝÜŠ
JJ™]ÈJ\ËŠJ_KKœ›ÝÝ\Kš[Z]]OY[˜Ý[ÛŠŠ^ÚYŠˆ[œÝ[˜Ù[ÙˆXÊ]›ÝÈ™]È\œ›ÜŠHY[[ÜžTÝ™X[HØ\ÈÚ]™[ˆÈ[Z]]J
K]]Û›HÝ\ÜÈHÝ™X[Kˆ™XY[Ü™HX›Ý]\È™\ÝšXÝ[Ûˆ\™NˆÎ‹ËÙÚ]X‹˜ÛÛKÜÝ[‹ÞÝ™X[HÙ˜\HŠNÝ\Ë—Ý\™Ù][ŽÙ›ÜŠ˜\ˆ]\Ë—Ú[ËO]›[™ÝLÜNÜŠÊÊ[‹—ØY
Ü—JNÝ\Ë—Ú[ÏV×_KKœ›ÝÝ\KœÚ[YY[TÙ[™™^Y[˜Ý[ÛŠŠ^Ý\Ë—ÛŠŠ_KKœ›ÝÝ\KœÚ[YY[TÙ[™\œ›ÜY[˜Ý[ÛŠŠ^Ý\Ë—ÙJŠ_KKœ›ÝÝ\KœÚ[YY[TÙ[™ÛÛ\]OY[˜Ý[ÛŠ
^Ý\Ë—ØÊ
_KKœ›ÝÝ\KœÙ]XYÓ\Ý[™\Y[˜Ý[ÛŠŠ^ÛÊ\Ë—ÙHL‹—Û[‹›™^	K‹—ÙO[‹™\œ›ÜŸ	K‹—ØÏ[‹˜ÛÛ\]_	K\Ë—Ù[ŠNŠ\Ë—ÙHLK\Ë—ÙV
_KK›Y\™ÙOY[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÚO\™Ý[Y[Ë›[™ÝÚJÊÊ]ÚWOX\™Ý[Y[ÖÚWNÜ™]\›ˆ™]ÈJ™]ÈNJ
J_KK˜ÛÛXš[™OY[˜Ý[ÛŠ
^Ù›ÜŠ˜\ˆV×KOLÚO\™Ý[Y[Ë›[™ÝÚJÊÊ]ÚWOX\™Ý[Y[ÖÚWNÜ™]\›ˆ™]ÈJ™]ÈÎJ
J_K_JJ
NÝK”Ý™X[OXSÎÝ˜\ˆXÏJ[˜Ý[ÛŠJ^ÕNJ‹JNÙ[˜Ý[ÛˆŠ
^Ý˜\ˆOYK˜Ø[
\Ë
_\ÎÜ™]\›ˆK—Ú\ÏHLK_\™]\›ˆ‹œ›ÝÝ\K—ÛY[˜Ý[ÛŠ
^Ý\Ë—Ý]\Ë—Ú\ÏHLKœ›ÝÝ\K—Û‹˜Ø[
\Ë
_K‹œ›ÝÝ\K—ØYY[˜Ý[ÛŠ
^Ý˜\ˆO]\Ë—Ý\™Ù]ÚYŠJ\™]\›ˆK—ØY

NÝ˜\ˆ]\Ë—Ú[ÎÚYŠ‹œ\Ú

K‹›[™ÝŒJ^Ý\Ë—Ú\É‰—ÛŠ\Ë—ÝŠNÜ™]\›ŸZYŠ\Ë—ÜÝÜQOOV
]\Ë—Ú\É‰—ÛŠ\Ë—ÝŠKÛX\•[Y[Ý]
\Ë—ÜÝÜQ
K\Ë—ÜÝÜQVÙ[ÙHYŠ\Ë—Ú\Ê]—ÛŠ\Ë—ÝŠNÙ[Ù^Ý˜\ˆÏ]\Ë—Ü›ÙÛÈOOV	‰›Ë—ÜÝ\
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
_KŸJJSÊNÝK“Y[[ÜžTÝ™X[OTXÎÝ˜\ˆIXSÎÝK™Y˜][XIJNÝ˜\ˆÏRJÓÏOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\JÓË—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÜÓË˜ÛÛ˜Ø]Y	Ý˜\ˆÉ]ØÊ
NÙ[˜Ý[Ûˆ	
‹‹™J^Û][™]È\œ˜^K[™]È\œ˜^KO[™]ÈÙ]LÙ[˜Ý[ÛˆÊ
^Ù›ÜŠÛ‹›[™ÝŒÊ[‹œÚY

K[œÝXœØÜšX™J
NÝ›[™ÝLK˜ÛX\Š
KL[]O^ÜÝ\œÏOžÙK™›Ü‘XXÚ
Oœ\Ú
×JJNÙ[˜Ý[Ûˆ

^Ù›ÜŠÎÊ^Û]]ÛKœÚY

NÚYŠOO]›ÚY
\™]\›ŽÜË›™^

__Y[˜Ý[ÛˆJ
^Ü™]\›ˆYK›[™ÝZYŠJ
J^ÜË˜ÛÛ\]J
NÜ™]\›ŸYK™›Ü‘XXÚ


OOžÛ‹œ\Ú
œÝXœØÜšX™JÛ™^™ÏOžÜOO\ÜË›™^
ÊNÜKœ\Ú
Ê_KÛÛ\]NŠ
OOžÙ›ÜŠK˜Y

NÚKš\ÊŠNÊY
ŠKŠÊÎÐJ
OÜË˜ÛÛ\]J
N™
Š_K\œ›ÜŽ™ÏOžÜË™\œ›ÜŠÊKÊ
__JJ_J_KÝÜŠ
OOžÛÊ
__NÜ™]\›ˆÉ”Ý™X[K˜Ü™X]JJ__JNÝ˜\ˆWÏRJšOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\Jš—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÓš‘Y˜][˜[YT›ÙXÙ\]›ÚYÝ˜\ˆÏXÛ\ÜÞÙÙ]˜[YJ
^Ü™]\›ˆ\Ëš[\›˜[˜[Y_XØ[˜XÚÜÎÚ[\›˜[˜[YNÛ\Ý[™\ŽØÛÛœÝXÝÜŠ‹
^Ý\Ë˜Ø[˜XÚÜÏ]\Ëš[\›˜[˜[YO[Ÿ]\]JŠ^Ý\Ëš[\›˜[˜[YO[‹\Ë›\Ý[™\‰‰\Ë›\Ý[™\‹›™^
Š_Y\œ›ÜŠŠ^Ý\Ë›\Ý[™\‰‰\Ë›\Ý[™\‹™\œ›ÜŠŠ_\Ý\
Š^Ý\Ë›\Ý[™\[‹‹›™^
\Ëš[\›˜[˜[YJK\Ë˜Ø[˜XÚÜÉ‰\Ë˜Ø[˜XÚÜË›Û”Ý\Y

_\ÝÜ

^Ý\Ë˜Ø[˜XÚÜÉ‰\Ë˜Ø[˜XÚÜË›Û”ÝÜ

K\Ë›\Ý[™\]›ÚY_NÓš‘Y˜][˜[YT›ÙXÙ\YßJNÝ˜\ˆÏRJÓÏOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\JÓË—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNØÓË™›Ü\XØ]\ÏXÉÙ[˜Ý[ÛˆÉ
J^Ü™]\›ˆOžÛ]O[™]ÈÙ]Ü™]\›ˆ™š[\ŠÏOˆZKš\ÊJÊJJK™XYÊÏOšK˜Y
JÊJJ___JNÝ˜\ˆ—ÏRJÏOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\JË—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÛË™œ›ÛS\Ý›ÛZ\ÙOPIÛËÓ\Ý›ÛZ\ÙOUÎÛË™š\œÝ]™[[	Ý˜\ˆI]ØÊ
NÙ[˜Ý[ÛˆI
J^Û]^ÜÝ\OžÙK[ŠOOžÙ›ÜŠ]ˆÙˆJ]›™^
ŠNÝ˜ÛÛ\]J
_JK˜Ø]Ú
OOžÝ™\œ›ÜŠJ_J_KÝÜŠ
OOžß_NÜ™]\›ˆI”Ý™X[K˜Ü™X]JŠ_X\Þ[˜È[˜Ý[ÛˆÊKŠ^Ü™]\›ˆ™]È›ÛZ\ÙJ
JOOžÚYŠOOL
^Ý
×JNÜ™]\›Ÿ[][™]È\œ˜^NÙKZÙJŠKœÝXœØÜšX™JÛ™^›ÏOžÜ‹œ\Ú
ÊK‹›[™ÝOO[‰‰
Š_KÛÛ\]NŠ
OOžÚJ™]È\œ›ÜŠÝ™X[HÛÛ\]Y™Y›Ü™H[]™[ÈÛÝ[™HÛÛXÝYˆÛÛXÝY	Ü‹›[™ÝK^XÝY	ÛŸX
J_K\œ›ÜŽ›ÏOžÚJÊ__J_J_X\Þ[˜È[˜Ý[Ûˆ	
J^Ü™]\›Š]ØZ]ÊKJJVÌ__JNÝ˜\ˆ—ÏRJOOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\JK—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÙK”™YXÙ\]›ÚYÙK˜ÛÝ[Ý™X[OYÉÙK˜\Ð\œ˜^ORIÙK›\Ý˜[YO^IÝ˜\ˆPOXÛ\ÜÞÜÝ™X[NÜ™YXÙ\ŽÜÝ]NØÛÛ\]YØÛÛœÝXÝÜŠ‹J^Ý\ËœÝ™X[O[‹\Ëœ™YXÙ\]\ËœÝ]OZK\Ë˜ÛÛ\]Y[™]È›ÛZ\ÙJ
‹ÊOOžÛ]O]\ËœÝ™X[KœÝXœØÜšX™JÛ™^œÏOžÝ\ËœÝ]O]\Ëœ™YXÙ\Š\ËœÝ]KÊ_KÛÛ\]NŠ
OOžÜŠ
KK[œÝXœØÜšX™J
_K\œ›ÜŽœÏOžÛÊÊKK[œÝXœØÜšX™J
__J_J_]˜[YJ
^Ü™]\›ˆ\ËœÝ]_X\Þ[˜Èš[š\ÚY

^Ü™]\›ˆ\Ë˜ÛÛ\]Y_NÙK”™YXÙ\VPNÙ[˜Ý[Ûˆ‰
KŠ^Ü™]\›ˆJÌ_Y[˜Ý[ÛˆÉ
J^Ü™]\›ˆ™]ÈPJK‰
_Y[˜Ý[Ûˆ	
KŠ^Ü™]\›–Ë‹‹™K—_Y[˜Ý[ÛˆI
J^Ü™]\›ˆ™]ÈPJK	×J_Y[˜Ý[Ûˆ	
KŠ^Ü™]\›ˆŸY[˜Ý[ÛˆI
J^Ü™]\›ˆ™]ÈPJK	›ÚY
__JNÝ˜\ˆWÏRJšOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\Jš—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÝš•˜[YP[™\]\Ï]›ÚYÝ˜\ˆ‰]ØÊ
KSÏXÛ\ÜÞÝ\]\ÎÙÙ]˜[YJ
^Ü™]\›ˆ\Ëœ›ÙXÙ\‹˜[Y_\›ÙXÙ\ŽØÛÛœÝXÝÜŠŠ^Ý\Ëœ›ÙXÙ\[‹\Ë\]\ÏP‰“Y[[ÜžTÝ™X[K˜Ü™X]UÚ]Y[[ÜžJ\Ëœ›ÙXÙ\Š_X\Þ[˜ÈØZ]›ÜŠŠ^Û]]\[ÙˆOH™[˜Ý[ÛˆÛŽšOOšOOO[ŽÜ™]\›ˆ™]È›ÛZ\ÙJ
KŠOOžÛ]Ï]\Ë\]\ËœÝXœØÜšX™JÛ™^˜OOžÝ
JI‰ŠJJKÙ][Y[Ý]


OOžÛË[œÝXœØÜšX™J
_K
J_KÛÛ\]NŠ
OOžÛË[œÝXœØÜšX™J
KŠ™]È\œ›ÜŠ•\]HÝ™X[HÛÛ\]YÚ]Ý]^XÝY˜[YHŠJ_K\œ›ÜŽ˜OOžÜŠJ__J_J__NÝš•˜[YP[™\]\Ï]SßJNÝ˜\ˆÚRJšOOžÈ\ÙHÝšXÝŽÝ˜\ˆI[šI‰›šK—×ØÜ™X]Pš[™[™ß
Øš™XÝ˜Ü™X]OÊ[˜Ý[ÛŠK‹J^ÚOOO]›ÚY	‰ŠO]
NÝ˜\ˆSØš™XÝ™Ù]ÝÛ”›Ü\Q\ØÜš\ÜŠ‹
NÊ\Ÿ
™Ù]š[ˆÈ[‹—×Ù\Ó[Ù[Nœ‹Üš]X›_‹˜ÛÛ™šYÝ\˜X›JJI‰Š^Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ–Ý__JKØš™XÝ™Yš[™T›Ü\JKKŠ_JNŠ[˜Ý[ÛŠK‹J^ÚOOO]›ÚY	‰ŠO]
KVÚWO[–Ý_JJKÉ[šI‰›šK—×Ù^ÜÝ\Ÿ[˜Ý[ÛŠKŠ^Ù›ÜŠ˜\ˆ[ˆJ]OOH™Y˜][‰‰ˆSØš™XÝœ›ÝÝ\Kš\ÓÝÛ”›Ü\K˜Ø[
‹
I‰›I
‹K
_NÓØš™XÝ™Yš[™T›Ü\JšK—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÛšK•˜[YP[™\]\Ï[šKÓ\Ý›ÛZ\ÙO[šK™œ›ÛS\Ý›ÛZ\ÙO[šK™š\œÝ]™[[šK™›Ü\XØ]\Ï[šK‘Y˜][˜[YT›ÙXÙ\[šK˜ÛÛ˜Ø]]›ÚYÝ˜\ˆÉQÊ
NÓØš™XÝ™Yš[™T›Ü\JšK˜ÛÛ˜Ø]‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆÉ˜ÛÛ˜Ø]_JNÝ˜\ˆÉUWÊ
NÓØš™XÝ™Yš[™T›Ü\JšK‘Y˜][˜[YT›ÙXÙ\ˆ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆÉ‘Y˜][˜[YT›ÙXÙ\Ÿ_JNÝ˜\ˆI^Ê
NÓØš™XÝ™Yš[™T›Ü\JšK™›Ü\XØ]\È‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆI™›Ü\XØ]\ß_JNÝ˜\ˆSÏR—Ê
NÓØš™XÝ™Yš[™T›Ü\JšK™š\œÝ]™[‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆSË™š\œÝ]™[_JNÓØš™XÝ™Yš[™T›Ü\JšK™œ›ÛS\Ý›ÛZ\ÙH‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆSË™œ›ÛS\Ý›ÛZ\Ù__JNÓØš™XÝ™Yš[™T›Ü\JšKÓ\Ý›ÛZ\ÙH‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆSËÓ\Ý›ÛZ\Ù__JNÐÉ
—Ê
KšJNÝ˜\ˆI\WÊ
NÓØš™XÝ™Yš[™T›Ü\JšK•˜[YP[™\]\È‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆI•˜[YP[™\]\ß_J_JNÝ˜\ˆÏRJOOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\JK—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÞKšœÛÛ”œÐÛÙO]›ÚYÞKš\ÒœÛÛ”œÑ\œ›Ü”™\ÜÛœÙORÎÞKš\ÒœÛÛ”œÔÝXØÙ\ÜÔ™\ÜÛœÙO]ÉÙ[˜Ý[ÛˆÊJ^Ü™]\›ˆ\[ÙˆK™\œ›ÜOH›Øš™XÝŸY[˜Ý[ÛˆÉ
J^Ü™]\›ˆRÊJ_^KšœÛÛ”œÐÛÙO^Ü\œÙQ\œ›ÜŽ‹LÌÌ[˜[Y™\]Y\Ý‹LÌŒY]Ù›Ý›Ý[™‹LÌŒK[˜[Y\˜[\Î‹LÌŒ‹[\›˜[\œ›ÜŽ‹LÌŒËÙ\™\‘\œ›ÜŽžÙY˜][‹LÌ™Lß__JNÝ˜\ˆWÏRJOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\J—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÑ’œÛÛ”œÐÛY[]›ÚYÝ˜\ˆ‰SÚ

K‰[Ê
K“ÏXÛ\ÜÞØÛÛ›™XÝ[ÛŽØÛÛœÝXÝÜŠŠ^Ý\Ë˜ÛÛ›™XÝ[Û[ŸX\Þ[˜È[ŠŠ^Û]]\Ë˜ÛÛ›™XÝ[Û‹œ™\ÜÛœÙTÝ™X[K™š[\ŠÏO›ËšYOO[‹šY
KOJ‰™š\œÝ]™[
J
NÝ\Ë˜ÛÛ›™XÝ[Û‹œÙ[™™\]Y\Ý
ŠNÛ]X]ØZ]NÚYŠ
‰š\ÒœÛÛ”œÑ\œ›Ü”™\ÜÛœÙJJŠJ^Û]Ï\‹™\œ›ÜŽÝ›ÝÈ™]È\œ›ÜŠ”ÓÓˆ”È\œ›ÜŽˆÛÙOIÛË˜ÛÙ_NÈY\ÜØYÙOIÉÛË›Y\ÜØYÙ_IØ
_\™]\›ˆŸ_NÑ’œÛÛ”œÐÛY[Y“ßJNÝ˜\ˆ—ÏRJ™ÏOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\J™Ë—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÙ™Ëš\ÒœÛÛÛÛ\]X›U˜[YOYÓÎÙ™Ëš\ÒœÛÛÛÛ\]X›P\œ˜^OW×ÎÙ™Ëš\ÒœÛÛÛÛ\]X›QXÝ[Û˜\žOQ×ÎÙ[˜Ý[ÛˆÓÊJ^Ü™]\›ˆHJ\[ÙˆOOHœÝš[™ÈŸ\[ÙˆOOH›[X™\ˆŸ\[ÙˆOOH˜›ÛÛX[ˆŸOOO[[×ÊJ_×ÊJJ_Y[˜Ý[Ûˆ×ÊJ^ÚYŠP\œ˜^Kš\Ð\œ˜^JJJ\™]\›ˆLNÙ›ÜŠ]ˆÙˆJZYŠYÓÊŠJ\™]\›ˆLNÜ™]\›ˆLY[˜Ý[Ûˆ×ÊJ^Ü™]\›ˆ\[ÙˆHOH›Øš™XÝŸOOO[[Øš™XÝœ›ÝÝ\KÔÝš[™Ë˜Ø[
JHOOH–ÛØš™XÝØš™XÝHÈLN“Øš™XÝ˜[Y\ÊJK™]™\žJÓÊ__JNÝ˜\ˆWÏRJÝOOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\JÝK—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNØÝKœ\œÙRœÛÛ”œÒYR×ÎØÝKœ\œÙRœÛÛ”œÔ™\]Y\ÝT	ØÝKœ\œÙRœÛÛ”œÑ\œ›Ü”™\ÜÛœÙOU×ÎØÝKœ\œÙRœÛÛ”œÔÝXØÙ\ÜÔ™\ÜÛœÙOSÎØÝKœ\œÙRœÛÛ”œÔ™\ÜÛœÙO]‰Ý˜\ˆ˜ÏU—Ê
NÙ[˜Ý[Ûˆ×ÊJ^ÚYŠJ˜Ëš\ÒœÛÛÛÛ\]X›QXÝ[Û˜\žJJJJ]›ÝÈ™]È\œ›ÜŠ‘]H]\Ý™H”ÓÓˆÛÛ\]X›HXÝ[Û˜\žHŠNÛ]YKšYÜ™]\›ˆ\[ÙˆˆOH›[X™\ˆ‰‰\[ÙˆˆOHœÝš[™ÈÛ[›ŸY[˜Ý[Ûˆ	
J^ÚYŠJ˜Ëš\ÒœÛÛÛÛ\]X›QXÝ[Û˜\žJJJJ]›ÝÈ™]È\œ›ÜŠ‘]H]\Ý™H”ÓÓˆÛÛ\]X›HXÝ[Û˜\žHŠNÚYŠ\[ÙˆKšœÛÛœœÈOHœÝš[™ÈŠ]›ÝÈ™]È\œ›ÜŠ	Ò[˜[YšœÛÛœœÈˆšY[ˆ]\Ý™HHÝš[™Ë‰ÊNÚYŠKšœÛÛœœÈOOHŒ‹ŒŠ]›ÝÈ™]È\œ›ÜŠÛÝ[™^XÝYœÛÛœœÈ™\œÚ[ÛŽˆ	ÙKšœÛÛœœßX
NÛ]R×ÊJNÚYŠOO[[
]›ÝÈ™]È\œ›ÜŠ’[˜[YYšY[ŠNÛ]YK›Y]ÙÚYŠ\[ÙˆOHœÝš[™ÈŠ]›ÝÈ™]È\œ›ÜŠ	Ò[˜[Y›Y]ÙˆšY[ˆ]\Ý™HHÝš[™Ë‰ÊNÚYŠJ˜Ëš\ÒœÛÛÛÛ\]X›P\œ˜^JJKœ\˜[\ÊI‰ˆJ˜Ëš\ÒœÛÛÛÛ\]X›QXÝ[Û˜\žJJKœ\˜[\ÊJ]›ÝÈ™]È\œ›ÜŠ’[˜[Y\˜[\ÈšY[ŠNÜ™]\›žÚœÛÛœœÎˆŒ‹Œ‹Y›‹Y]Ù\˜[\Î™Kœ\˜[\ß_Y[˜Ý[Ûˆ‰
J^ÚYŠ\[ÙˆK˜ÛÙHOH›[X™\ˆŠ]›ÝÈ™]È\œ›ÜŠ‘\œ›Üˆ›Ü\H	ØÛÙIÈ\È›ÝH[X™\ˆŠNÚYŠ\[ÙˆK›Y\ÜØYÙHOHœÝš[™ÈŠ]›ÝÈ™]È\œ›ÜŠ‘\œ›Üˆ›Ü\H	ÛY\ÜØYÙIÈ\È›ÝHÝš[™ÈŠNÛ]ŽÚYŠK™]OOO]›ÚY
[]›ÚYÙ[ÙHYŠ
˜Ëš\ÒœÛÛÛÛ\]X›U˜[YJJK™]JJ[YK™]NÙ[ÙH›ÝÈ™]È\œ›ÜŠ‘\œ›Üˆ›Ü\H	Ù]IÈ\ÈYš[™Y]›ÝH”ÓÓˆÛÛ\]X›H˜[YKˆŠNÜ™]\›žØÛÙN™K˜ÛÙKY\ÜØYÙN™K›Y\ÜØYÙK‹‹›ˆOO]›ÚYÞÙ]N›ŸNžß__Y[˜Ý[Ûˆ×ÊJ^ÚYŠJ˜Ëš\ÒœÛÛÛÛ\]X›QXÝ[Û˜\žJJJJ]›ÝÈ™]È\œ›ÜŠ‘]H]\Ý™H”ÓÓˆÛÛ\]X›HXÝ[Û˜\žHŠNÚYŠKšœÛÛœœÈOOHŒ‹ŒŠ]›ÝÈ™]È\œ›ÜŠÛÝ[™^XÝYœÛÛœœÈ™\œÚ[ÛŽˆ	Ò”ÓÓ‹œÝš[™ÚYžJJ_X
NÛ]YKšYÚYŠ\[ÙˆˆOH›[X™\ˆ‰‰\[ÙˆˆOHœÝš[™È‰‰›ˆOO[[
]›ÝÈ™]È\œ›ÜŠ’[˜[YYšY[ŠNÚYŠ\[ÙˆK™\œ›ÜˆHŸJ˜Ëš\ÒœÛÛÛÛ\]X›QXÝ[Û˜\žJJK™\œ›ÜŠJ]›ÝÈ™]È\œ›ÜŠ’[˜[Y\œ›ÜˆšY[ŠNÜ™]\›žÚœÛÛœœÎˆŒ‹Œ‹Y›‹\œ›ÜŽ“‰
K™\œ›ÜŠ__Y[˜Ý[ÛˆÊJ^ÚYŠJ˜Ëš\ÒœÛÛÛÛ\]X›QXÝ[Û˜\žJJJJ]›ÝÈ™]È\œ›ÜŠ‘]H]\Ý™H”ÓÓˆÛÛ\]X›HXÝ[Û˜\žHŠNÚYŠKšœÛÛœœÈOOHŒ‹ŒŠ]›ÝÈ™]È\œ›ÜŠÛÝ[™^XÝYœÛÛœœÈ™\œÚ[ÛŽˆ	Ò”ÓÓ‹œÝš[™ÚYžJJ_X
NÛ]YKšYÚYŠ\[ÙˆˆOH›[X™\ˆ‰‰\[ÙˆˆOHœÝš[™ÈŠ]›ÝÈ™]È\œ›ÜŠ’[˜[YYšY[ŠNÚYŠ\[ÙˆKœ™\Ý[ˆHŠ]›ÝÈ™]È\œ›ÜŠ’[˜[Y™\Ý[šY[ŠNÛ]YKœ™\Ý[Ü™]\›žÚœÛÛœœÎˆŒ‹Œ‹Y›‹™\Ý[_Y[˜Ý[Ûˆ‰
J^Û]ŽÝž^ÛU×ÊJ_XØ]ÚÛSÊJ_\™]\›ˆŸ_JNÝ˜\ˆZRJœOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\Jœ‹—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÒœ‹šœÛÛ”œÐÛÙORœ‹š\ÒœÛÛ”œÔÝXØÙ\ÜÔ™\ÜÛœÙORœ‹š\ÒœÛÛ”œÑ\œ›Ü”™\ÜÛœÙORœ‹œ\œÙRœÛÛ”œÔÝXØÙ\ÜÔ™\ÜÛœÙORœ‹œ\œÙRœÛÛ”œÔ™\ÜÛœÙORœ‹œ\œÙRœÛÛ”œÔ™\]Y\ÝRœ‹œ\œÙRœÛÛ”œÒYRœ‹œ\œÙRœÛÛ”œÑ\œ›Ü”™\ÜÛœÙORœ‹’œÛÛ”œÐÛY[Rœ‹›XZÙRœÛÛ”œÒY]›ÚYÝ˜\ˆÉSSJ
NÓØš™XÝ™Yš[™T›Ü\Jœ‹›XZÙRœÛÛ”œÒY‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆÉ›XZÙRœÛÛ”œÒY_JNÝ˜\ˆ	SWÊ
NÓØš™XÝ™Yš[™T›Ü\Jœ‹’œÛÛ”œÐÛY[‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ	’œÛÛ”œÐÛY[_JNÝ˜\ˆÙÏVWÊ
NÓØš™XÝ™Yš[™T›Ü\Jœ‹œ\œÙRœÛÛ”œÑ\œ›Ü”™\ÜÛœÙH‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆÙËœ\œÙRœÛÛ”œÑ\œ›Ü”™\ÜÛœÙ__JNÓØš™XÝ™Yš[™T›Ü\Jœ‹œ\œÙRœÛÛ”œÒY‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆÙËœ\œÙRœÛÛ”œÒY_JNÓØš™XÝ™Yš[™T›Ü\Jœ‹œ\œÙRœÛÛ”œÔ™\]Y\Ý‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆÙËœ\œÙRœÛÛ”œÔ™\]Y\Ý_JNÓØš™XÝ™Yš[™T›Ü\Jœ‹œ\œÙRœÛÛ”œÔ™\ÜÛœÙH‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆÙËœ\œÙRœÛÛ”œÔ™\ÜÛœÙ__JNÓØš™XÝ™Yš[™T›Ü\Jœ‹œ\œÙRœÛÛ”œÔÝXØÙ\ÜÔ™\ÜÛœÙH‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆÙËœ\œÙRœÛÛ”œÔÝXØÙ\ÜÔ™\ÜÛœÙ__JNÝ˜\ˆÏ[Ê
NÓØš™XÝ™Yš[™T›Ü\Jœ‹š\ÒœÛÛ”œÑ\œ›Ü”™\ÜÛœÙH‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆËš\ÒœÛÛ”œÑ\œ›Ü”™\ÜÛœÙ__JNÓØš™XÝ™Yš[™T›Ü\Jœ‹š\ÒœÛÛ”œÔÝXØÙ\ÜÔ™\ÜÛœÙH‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆËš\ÒœÛÛ”œÔÝXØÙ\ÜÔ™\ÜÛœÙ__JNÓØš™XÝ™Yš[™T›Ü\Jœ‹šœÛÛ”œÐÛÙH‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆËšœÛÛ”œÐÛÙ__J_JNÝ˜\ˆÏRJSÏOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\JSË—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÒSËš^	Ø\Þ[˜È[˜Ý[ÛˆI
J^ÚYŠKœÝ]\ÏM
^Û]X]ØZ]K^

K˜Ø]Ú


OOˆ•[˜X›HÈ™]šY]™H›ÙHÛÛ[ŠNÝ›ÝÈ™]È\œ›ÜŠ˜YÝ]\ÈÛˆ™\ÜÛœÙNˆ	ÙKœÝ]\ßXØØ]\ÙNžÜÝ]\Î™KœÝ]\Ë›ÙN›Ÿ_J_\™]\›ˆ_X\Þ[˜È[˜Ý[Ûˆ	
K‹KŠ^Û]Ï^ÛY]Ù™K›ÙNšOÒ”ÓÓ‹œÝš[™ÚYžJJN›ÚYXY\œÎžÈÛÛ[U\HŽˆ˜\XØ][Û‹ÚœÛÛˆ‹‹‹KÚYÛ˜[œÐX›ÜÚYÛ˜[[Y[Ý]
ŠN›ÚYNÜ™]\›ˆ™]Ú
‹ÊK[ŠI
K[ŠOO˜KšœÛÛŠ
J__JNÝ˜\ˆÏRJOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\J—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÞš[œÝ[˜ÙSÙ”œÔÝ™X[Z[™ÐÛY[U	Þš\Ô›ÝØÛÛR‰Ù[˜Ý[Ûˆ	
J^Ü™]\›ˆ›\Ý[ˆš[ˆI‰\[ÙˆK›\Ý[OH™[˜Ý[ÛˆŸY[˜Ý[Ûˆ‰
J^Ü™]\›ˆKœÙX\˜Ú
Ž‹ËÈŠHOOKL__JNÝ˜\ˆÏRJOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\J—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÕ’˜]ÚÛY[]›ÚYÝ˜\ˆ—ÏUZ

K‰ZÊ
KI\Ê
K—Ï^Ù\Ü]Ú[\˜[ŒŒ˜]ÚÚ^™S[Z]ŒŒKSÏXÛ\ÜÞÝ\›ÚXY\œÎÛÜ[ÛœÎÝ[Y\ŽÜ]Y]YOV×NØÛÛœÝXÝÜŠ‹^ßJ^ÚYŠ\Ë›Ü[ÛœÏ^Ø˜]ÚÚ^™S[Z]˜˜]ÚÚ^™S[Z]ÏÖ—Ë˜˜]ÚÚ^™S[Z]\Ü]Ú[\˜[™\Ü]Ú[\˜[ÏÖ—Ë™\Ü]Ú[\˜[[Y[Ý]š[Y[Ý]K\[ÙˆOHœÝš[™ÈŠ^ÚYŠJIš\Ô›ÝØÛÛ
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
NÊ‰š
J”ÔÕ‹\Ë\›\ËšXY\œË\Ë›Ü[ÛœËš[Y[Ý]
K[ŠOžÊ\œ˜^Kš\Ð\œ˜^JŠOÜŽ–Ü—JK™›Ü‘XXÚ
OOžÛ]Ï[‹™š[™
Oœœ™\]Y\ÝšYOOXKšY
NÚYŠ\Ê\™]\›ŽÛ]Ü™Z™XÝ™™\ÛÛ™N_O\ËJ—Ëœ\œÙRœÛÛ”œÔ™\ÜÛœÙJJJNÊ—Ëš\ÒœÛÛ”œÑ\œ›Ü”™\ÜÛœÙJJ
OÙ
™]È\œ›ÜŠ”ÓÓ‹œÝš[™ÚYžJ™\œ›ÜŠJJNJ
_J_KOžÙ›ÜŠ]ÈÙˆJ^Û]O[‹™š[™
ÏOœËœ™\]Y\ÝšYOO[ÊNÚYŠXJ\™]\›ŽØKœ™Z™XÝ
Š__J__NÕ’˜]ÚÛY[^SßJNÝ˜\ˆ—ÏRJšOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\Jš—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÒš’ÛY[]›ÚYÝ˜\ˆ	ÏUZ

K	ZÊ
KI\Ê
K“ÏXÛ\ÜÞÝ\›ÚXY\œÎÝ[Y[Ý]ØÛÛœÝXÝÜŠ‹
^ÚYŠ\[ÙˆOHœÝš[™ÈŠ^ÚYŠJIš\Ô›ÝØÛÛ
JŠJ]›ÝÈ™]È\œ›ÜŠ‘[™Ú[T“\ÈZ\ÜÚ[™ÈH›ÝØÛÛˆ^XÝY	ÚÎ‹ËÉÈÜˆ	Ú‹ËÉËˆŠNÝ\Ë\›[ŸY[ÙH\Ë\›[‹\›\ËšXY\œÏ[‹šXY\œÎÝ\Ë[Y[Ý]]Y\ØÛÛ›™XÝ

^ßX\Þ[˜È^XÝ]JŠ^Û]J	Ëœ\œÙRœÛÛ”œÔ™\ÜÛœÙJJ]ØZ]
	š
J”ÔÕ‹\Ë\›\ËšXY\œË‹\Ë[Y[Ý]
JNÚYŠ
	Ëš\ÒœÛÛ”œÑ\œ›Ü”™\ÜÛœÙJJ
J]›ÝÈ™]È\œ›ÜŠ”ÓÓ‹œÝš[™ÚYžJ™\œ›ÜŠJNÜ™]\›ˆ_NÒš’ÛY[P“ßJNÝ˜\ˆŽRJ
œÙKN
OOžÝ˜\ˆO[[Ý\[ÙˆÙX”ÛØÚÙ]HÖOUÙX”ÛØÚÙ]\[Ùˆ[Þ•ÙX”ÛØÚÙ]HÖOS[Þ•ÙX”ÛØÚÙ]\[ÙˆÛØ˜[HÖOYÛØ˜[•ÙX”ÛØÚÙ]ÛØ˜[“[Þ•ÙX”ÛØÚÙ]\[ÙˆÚ[™ÝÏHÖO]Ú[™ÝË•ÙX”ÛØÚÙ]Ú[™ÝË“[Þ•ÙX”ÛØÚÙ]\[ÙˆÙ[H‰‰ŠO\Ù[‹•ÙX”ÛØÚÙ]Ù[‹“[Þ•ÙX”ÛØÚÙ]
NÙN™^ÜÏV_JNÝ˜\ˆÓÏRJ	OOžÈ\ÙHÝšXÝŽÝ˜\ˆÉII‰‰K—×Ú[\ÜY˜][[˜Ý[ÛŠJ^Ü™]\›ˆI‰™K—×Ù\Ó[Ù[OÙNžÙY˜][™__NÓØš™XÝ™Yš[™T›Ü\J	K—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÉK”ÛØÚÙ]Ü˜\\]›ÚYÝ˜\ˆOWÉ
Ž

JNÙ[˜Ý[ÛˆÉ

^Ü™]\›ˆ\[Ùˆ›ØÙ\ÜÏH‰‰\[Ùˆ›ØÙ\ÜË™\œÚ[ÛœÏH‰‰\[Ùˆ›ØÙ\ÜË™\œÚ[ÛœË››ÙOHŸ]˜\ˆSÏXÛ\ÜÞØÛÛ›™XÝYØÛÛ›™XÝY™\ÛÛ™\ŽØÛÛ›™XÝY™Z™XÝ\ŽÜÛØÚÙ]Ý[Y[Ý]YØÛÜÙYHLNÝ\›ÛY\ÜØYÙR[™\ŽÙ\œ›Ü’[™\ŽÛÜ[’[™\ŽØÛÜÙR[™\ŽÝ[Y[Ý]ØÛÛœÝXÝÜŠ‹K‹ËOLYM
^Ý\Ë˜ÛÛ›™XÝY[™]È›ÛZ\ÙJ
Ë
OOžÝ\Ë˜ÛÛ›™XÝY™\ÛÛ™\\Ë\Ë˜ÛÛ›™XÝY™Z™XÝ\YJK\Ë\›[‹\Ë›Y\ÜØYÙR[™\]\Ë™\œ›Ü’[™\ZK\Ë›Ü[’[™\\‹\Ë˜ÛÜÙR[™\[Ë\Ë[Y[Ý]X_XÛÛ›™XÝ

^Û][™]ÈK™Y˜][
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

K\ËœÛØÚÙ]œ™XYTÝ]J^ØØ\ÙHK™Y˜][“ÔSŽ\ËœÛØÚÙ]˜ÛÜÙJYLÊNØœ™XZÎØØ\ÙHK™Y˜][ÓÔÑQ˜œ™XZÎØØ\ÙHK™Y˜][ÓÓ“‘PÕS‘Î\ËœÛØÚÙ]›Û›Ü[J
OOŒ\ËœÛØÚÙ]›Û˜ÛÜÙOJ
OOŒ\ËœÛØÚÙ]›Û™\œ›ÜJ
OOŒ\ËœÛØÚÙ]›Û›Y\ÜØYÙOJ
OOŒ\ËœÛØÚÙ]]›ÚY\Ë˜ÛÜÙR[™\‰‰\Ë˜ÛÜÙR[™\ŠÝØ\ÐÛX[ŽˆLKÛÙN_JNØœ™XZÎØØ\ÙHK™Y˜][ÓÔÒS‘Î˜œ™XZÎÙY˜][›ÝÈ™]È\œ›ÜŠ[šÛ›ÝÛˆ™XYTÝ]Nˆ	Ý\ËœÛØÚÙ]œ™XYTÝ]_X
__X\Þ[˜ÈÙ[™
Š^Ü™]\›ˆ™]È›ÛZ\ÙJ
JOOžÚYŠ]\ËœÛØÚÙ]
]›ÝÈ™]È\œ›ÜŠ”ÛØÚÙ][™Yš[™Yˆ\È]\Ý™HØ[YY\ˆÛÛ›™XÝ[™ËˆŠNÚYŠ\Ë˜ÛÜÙY
]›ÝÈ™]È\œ›ÜŠ”ÛØÚÙ]Ø\ÈÛÜÙYÛÈ›È]HØ[ˆ™HÙ[[ž[[Ü™KˆŠNÚYŠ\ËœÛØÚÙ]œ™XYTÝ]HOOVK™Y˜][“ÔSŠ]›ÝÈ™]È\œ›ÜŠ•ÙXœÛØÚÙ]\È›ÝÜ[ˆŠNÑÉ

OÝ\ËœÛØÚÙ]œÙ[™
‹OžÜÚJŠN

_JNŠ\ËœÛØÚÙ]œÙ[™
ŠK

J_J_XÛX\•[Y[Ý]

^ÚYŠ]\Ë[Y[Ý]Y
]›ÝÈ™]È\œ›ÜŠ•[Y[Ý]Q›ÝÙ]ˆ\ÈÚÝ[›Ý\[ˆ[™\ÝX[HYX[œÈÛÛ›™XÝ

HØ\È›ÝØ[YˆŠNØÛX\•[Y[Ý]
\Ë[Y[Ý]Y
__NÉK”ÛØÚÙ]Ü˜\\[SßJNÝ˜\ˆÓÏRJšOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\Jš—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÑš”Ý™X[Z[™ÔÛØÚÙ]]›ÚYÝ˜\ˆ‰]ØÊ
KÉPÓÊ
KÓÏXÛ\ÜÞØÛÛ›™XÝYÙ]™[ÎÙ]™[›ÙXÙ\“\Ý[™\ŽÜÛØÚÙ]ØÛÛœÝXÝÜŠ‹LYM
^Ý\ËœÛØÚÙ][™]ÈÉ”ÛØÚÙ]Ü˜\\Š‹OžÝ\Ë™]™[›ÙXÙ\“\Ý[™\‰‰\Ë™]™[›ÙXÙ\“\Ý[™\‹›™^
Š_KOžÝ\Ë™]™[›ÙXÙ\“\Ý[™\‰‰\Ë™]™[›ÙXÙ\“\Ý[™\‹™\œ›ÜŠŠ_K

OOžßKOžÝ\Ë™]™[›ÙXÙ\“\Ý[™\‰‰Š‹Ø\ÐÛX[Ý\Ë™]™[›ÙXÙ\“\Ý[™\‹˜ÛÛ\]J
N\Ë™]™[›ÙXÙ\“\Ý[™\‹™\œ›ÜŠ”ÛØÚÙ]Ø\ÈÛÜÙY[˜ÛX[ˆŠJ_K
K\Ë˜ÛÛ›™XÝY]\ËœÛØÚÙ]˜ÛÛ›™XÝYÛ]O^ÜÝ\œO\Ë™]™[›ÙXÙ\“\Ý[™\\‹ÝÜŠ
OO\Ë™]™[›ÙXÙ\“\Ý[™\]›ÚYNÝ\Ë™]™[ÏU‰”Ý™X[K˜Ü™X]JJ_XÛÛ›™XÝ

^Ý\ËœÛØÚÙ]˜ÛÛ›™XÝ

_Y\ØÛÛ›™XÝ

^Ý\ËœÛØÚÙ]™\ØÛÛ›™XÝ

_X\Þ[˜ÈÙ[™
Š^Ü™]\›ˆ\ËœÛØÚÙ]œÙ[™
Š__NÑš”Ý™X[Z[™ÔÛØÚÙ]TÓßJNÝ˜\ˆSÏRJOOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\JK—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÚK”]Y]YZ[™ÔÝ™X[Z[™ÔÛØÚÙ]ZKÛÛ›™XÝ[Û”Ý]\Ï]›ÚYÝ˜\ˆSÚ

KÉ]ØÊ
KŽZÓÊ
K™Ê[˜Ý[ÛŠJ^ÙVÙK•[˜ÛÛ›™XÝYLOH•[˜ÛÛ›™XÝY‹VÙKÛÛ›™XÝ[™ÏLWOHÛÛ›™XÝ[™È‹VÙKÛÛ›™XÝYL—OHÛÛ›™XÝY‹VÙK‘\ØÛÛ›™XÝYL×OH‘\ØÛÛ›™XÝYŸJJ™
KÛÛ›™XÝ[Û”Ý]\Ï[™^ßJJNÝ˜\ˆSÏXÛ\ÜÞØÛÛ›™XÝ[Û”Ý]\ÎÙ]™[ÎÝ\›Ý[Y[Ý]Ü]Y]YOV×NÜÛØÚÙ]Ú\Ô›ØÙ\ÜÚ[™Ô]Y]YOHLNÙ]™[›ÙXÙ\“\Ý[™\ŽØÛÛ›™XÝ[Û”Ý]\Ô›ÙXÙ\ŽÜ™XÛÛ›™XÝY[™\ŽØÛÛœÝXÝÜŠ‹LYMJ^Ý\Ë\›[‹\Ë[Y[Ý]]\Ëœ™XÛÛ›™XÝY[™\ZNÛ]^ÜÝ\›ÏO\Ë™]™[›ÙXÙ\“\Ý[™\[ËÝÜŠ
OO\Ë™]™[›ÙXÙ\“\Ý[™\]›ÚYNÝ\Ë™]™[ÏUÉ”Ý™X[K˜Ü™X]JŠK\Ë˜ÛÛ›™XÝ[Û”Ý]\Ô›ÙXÙ\[™]È‘Y˜][˜[YT›ÙXÙ\Š™•[˜ÛÛ›™XÝY
K\Ë˜ÛÛ›™XÝ[Û”Ý]\Ï[™]È•˜[YP[™\]\Ê\Ë˜ÛÛ›™XÝ[Û”Ý]\Ô›ÙXÙ\ŠK\ËœÛØÚÙ][™]ÈŽ”Ý™X[Z[™ÔÛØÚÙ]
\Ë\›\Ë[Y[Ý]
K\ËœÛØÚÙ]™]™[ËœÝXœØÜšX™JÛ™^›ÏOžÚYŠ]\Ë™]™[›ÙXÙ\“\Ý[™\Š]›ÝÈ™]È\œ›ÜŠ“›È]™[›ÙXÙ\ˆ\Ý[™\ˆÙ]ŠNÝ\Ë™]™[›ÙXÙ\“\Ý[™\‹›™^
Ê_K\œ›ÜŽŠ
OOžÝ\Ë˜ÛÛ›™XÝ[Û”Ý]\Ô›ÙXÙ\‹\]J™‘\ØÛÛ›™XÝY
__J_XÛÛ›™XÝ

^Ý\Ë˜ÛÛ›™XÝ[Û”Ý]\Ô›ÙXÙ\‹\]J™ÛÛ›™XÝ[™ÊK\ËœÛØÚÙ]˜ÛÛ›™XÝY[Š\Þ[˜Ê
OOŠ\Ë˜ÛÛ›™XÝ[Û”Ý]\Ô›ÙXÙ\‹\]J™ÛÛ›™XÝY
K\Ëœ›ØÙ\ÜÔ]Y]YJ
JK

OOžÝ\Ë˜ÛÛ›™XÝ[Û”Ý]\Ô›ÙXÙ\‹\]J™‘\ØÛÛ›™XÝY
_JK\ËœÛØÚÙ]˜ÛÛ›™XÝ

_Y\ØÛÛ›™XÝ

^Ý\Ë˜ÛÛ›™XÝ[Û”Ý]\Ô›ÙXÙ\‹\]J™‘\ØÛÛ›™XÝY
K\ËœÛØÚÙ]™\ØÛÛ›™XÝ

_\™XÛÛ›™XÝ

^Ý\ËœÛØÚÙ][™]ÈŽ”Ý™X[Z[™ÔÛØÚÙ]
\Ë\›\Ë[Y[Ý]
K\ËœÛØÚÙ]™]™[ËœÝXœØÜšX™JÛ™^›OžÚYŠ]\Ë™]™[›ÙXÙ\“\Ý[™\Š]›ÝÈ™]È\œ›ÜŠ“›È]™[›ÙXÙ\ˆ\Ý[™\ˆÙ]ŠNÝ\Ë™]™[›ÙXÙ\“\Ý[™\‹›™^
Š_K\œ›ÜŽŠ
OOžÝ\Ë˜ÛÛ›™XÝ[Û”Ý]\Ô›ÙXÙ\‹\]J™‘\ØÛÛ›™XÝY
__JK\ËœÛØÚÙ]˜ÛÛ›™XÝY[Š

OOžÝ\Ëœ™XÛÛ›™XÝY[™\‰‰\Ëœ™XÛÛ›™XÝY[™\Š
_JK\Ë˜ÛÛ›™XÝ

_YÙ]]Y]YS[™Ý

^Ü™]\›ˆ\Ëœ]Y]YK›[™Ý\]Y]YT™\]Y\Ý
Š^Ý\Ëœ]Y]YKœ\Ú
ŠK\Ëœ›ØÙ\ÜÔ]Y]YJ
_X\Þ[˜È›ØÙ\ÜÔ]Y]YJ
^ÚYŠ\Ëš\Ô›ØÙ\ÜÚ[™Ô]Y]Y_\Ë˜ÛÛ›™XÝ[Û”Ý]\Ë˜[YHOO[™ÛÛ›™XÝY
\™]\›ŽÝ\Ëš\Ô›ØÙ\ÜÚ[™Ô]Y]YOHLÛ]ŽÙ›ÜŠÛ]\Ëœ]Y]YKœÚY

NÊ]ž^Ø]ØZ]\ËœÛØÚÙ]œÙ[™
ŠK\Ëš\Ô›ØÙ\ÜÚ[™Ô]Y]YOHL_XØ]ÚÝ\Ëœ]Y]YK[œÚY
ŠK\Ëš\Ô›ØÙ\ÜÚ[™Ô]Y]YOHLNÜ™]\›Ÿ__NÚK”]Y]YZ[™ÔÝ™X[Z[™ÔÛØÚÙ]QSßJNÝ˜\ˆNRJZOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\JZ—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÜZ”™XÛÛ›™XÝ[™ÔÛØÚÙ]]›ÚYÝ˜\ˆ	]ØÊ
KÓÏTSÊ
K“ÏXÛ\ÜÈ^ÜÝ]XÈØ[Ý[]U[Y[Ý]
Š^Ü™]\›ˆX]›Z[ŠŠŠ›ŠŒLYLÊ_XÛÛ›™XÝ[Û”Ý]\ÎÙ]™[ÎÜÛØÚÙ]Ù]™[›ÙXÙ\“\Ý[™\ŽÝ[˜ÛÛ›™XÝYHLÙ\ØÛÛ›™XÝYHLNÝ[Y[Ý][™^LÜ™XÛÛ›™XÝ[Y[Ý][[ØÛÛœÝXÝÜŠ‹LYMJ^Û]^ÜÝ\›ÏO\Ë™]™[›ÙXÙ\“\Ý[™\[ËÝÜŠ
OO\Ë™]™[›ÙXÙ\“\Ý[™\]›ÚYNÝ\Ë™]™[ÏS	”Ý™X[K˜Ü™X]JŠK\ËœÛØÚÙ][™]ÈÓË”]Y]YZ[™ÔÝ™X[Z[™ÔÛØÚÙ]
‹JK\ËœÛØÚÙ]™]™[ËœÝXœØÜšX™JÛ™^›ÏOžÝ\Ë™]™[›ÙXÙ\“\Ý[™\‰‰\Ë™]™[›ÙXÙ\“\Ý[™\‹›™^
Ê_K\œ›ÜŽ›ÏOžÝ\Ë™]™[›ÙXÙ\“\Ý[™\‰‰\Ë™]™[›ÙXÙ\“\Ý[™\‹™\œ›ÜŠÊ__JK\Ë˜ÛÛ›™XÝ[Û”Ý]\Ï]\ËœÛØÚÙ]˜ÛÛ›™XÝ[Û”Ý]\Ë\Ë˜ÛÛ›™XÝ[Û”Ý]\Ë\]\ËœÝXœØÜšX™JÛ™^›ÏOžÛÏOO]ÓËÛÛ›™XÝ[Û”Ý]\ËÛÛ›™XÝY	‰Š\Ë[Y[Ý][™^L
KÏOO]ÓËÛÛ›™XÝ[Û”Ý]\Ë‘\ØÛÛ›™XÝY	‰Š\Ëœ™XÛÛ›™XÝ[Y[Ý]	‰ŠÛX\•[Y[Ý]
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
Š__NÜZ”™XÛÛ›™XÝ[™ÔÛØÚÙ]X“ßJNÝ˜\ˆNRJ˜OOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\J˜K—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÒ˜K”Ý™X[Z[™ÔÛØÚÙ]R˜K”ÛØÚÙ]Ü˜\\R˜K”™XÛÛ›™XÝ[™ÔÛØÚÙ]R˜K”]Y]YZ[™ÔÝ™X[Z[™ÔÛØÚÙ]R˜KÛÛ›™XÝ[Û”Ý]\Ï]›ÚYÝ˜\ˆÎTSÊ
NÓØš™XÝ™Yš[™T›Ü\J˜KÛÛ›™XÝ[Û”Ý]\È‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆÎÛÛ›™XÝ[Û”Ý]\ß_JNÓØš™XÝ™Yš[™T›Ü\J˜K”]Y]YZ[™ÔÝ™X[Z[™ÔÛØÚÙ]‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆÎ”]Y]YZ[™ÔÝ™X[Z[™ÔÛØÚÙ]_JNÝ˜\ˆIZN

NÓØš™XÝ™Yš[™T›Ü\J˜K”™XÛÛ›™XÝ[™ÔÛØÚÙ]‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆI”™XÛÛ›™XÝ[™ÔÛØÚÙ]_JNÝ˜\ˆ‰PÓÊ
NÓØš™XÝ™Yš[™T›Ü\J˜K”ÛØÚÙ]Ü˜\\ˆ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ‰”ÛØÚÙ]Ü˜\\Ÿ_JNÝ˜\ˆ‰ZÓÊ
NÓØš™XÝ™Yš[™T›Ü\J˜K”Ý™X[Z[™ÔÛØÚÙ]‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ‰”Ý™X[Z[™ÔÛØÚÙ]_J_JNÝ˜\ˆÎRJZOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\JZ—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÓZ•ÙXœÛØÚÙ]ÛY[]›ÚYÝ˜\ˆUZ

KÎXN

K	SÚ

K		]ØÊ
K‰\Ê
NÙ[˜Ý[ÛˆZŠJ^Ý›ÝÈ_Y[˜Ý[Ûˆ
J^ÚYŠK\HOOH›Y\ÜØYÙHŠ]›ÝÈ™]È\œ›ÜŠ[™^XÝYY\ÜØYÙH\HÛˆÙXœÛØÚÙ]ˆ	ÙK\_X
NÜ™]\›Šœ\œÙRœÛÛ”œÔ™\ÜÛœÙJJ”ÓÓ‹œ\œÙJK™]JJ_]˜\ˆ“ÏXÛ\ÜÞÜ™\]Y\ÝÜÛØÚÙ]Ü[›š[™ÏHLNÜÝXœØÜš\[ÛœÏV×NØÛÛœÝXÝÜŠ‹
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

KO]™š[\ŠOO˜KšYOO]\Ëœ™\]Y\ÝšY
KœÝXœØÜšX™JÛ™^˜OOžÊš\ÒœÛÛ”œÑ\œ›Ü”™\ÜÛœÙJJJI‰Š\Ë˜ÛÜÙTÝXœØÜš\[ÛœÊ
K‹™\œ›ÜŠ”ÓÓ‹œÝš[™ÚYžJK™\œ›ÜŠJJKK[œÝXœØÜšX™J
__JK]™š[\ŠOO˜KšYOO]\Ëœ™\]Y\ÝšY
KœÝXœØÜšX™JÛ™^˜OOžÊš\ÒœÛÛ”œÑ\œ›Ü”™\ÜÛœÙJJJOÊ\Ë˜ÛÜÙTÝXœØÜš\[ÛœÊ
K‹™\œ›ÜŠ”ÓÓ‹œÝš[™ÚYžJK™\œ›ÜŠJJN›‹›™^
Kœ™\Ý[
__JKÏ]œÝXœØÜšX™JÙ\œ›ÜŽ˜OOžÝ\Ë˜ÛÜÙTÝXœØÜš\[ÛœÊ
K‹™\œ›ÜŠJ_KÛÛ\]NŠ
OOžÝ\Ë˜ÛÜÙTÝXœØÜš\[ÛœÊ
K‹˜ÛÛ\]J
__JNÝ\ËœÝXœØÜš\[ÛœËœ\Ú
K‹Ê_XÛÜÙTÝXœØÜš\[ÛœÊ
^Ù›ÜŠ]ˆÙˆ\ËœÝXœØÜš\[ÛœÊ[‹[œÝXœØÜšX™J
NÝ\ËœÝXœØÜš\[ÛœÏV×__KÏXÛ\ÜÞÝ\›ÜÛØÚÙ]ÚœÛÛ”œÔ™\ÜÛœÙTÝ™X[NÜÝXœØÜš\[Û”Ý™X[\Ï[™]ÈX\ØÛÛœÝXÝÜŠ‹YZŠ^ÚYŠJ‰š\Ô›ÝØÛÛ
JŠJ]›ÝÈ™]È\œ›ÜŠ˜\ÙHT“\ÈZ\ÜÚ[™ÈH›ÝØÛÛˆ^XÝY	ÝÜÎ‹ËÉÈÜˆ	ÝÜÜÎ‹ËÉËˆŠNÛ]O[‹™[™ÕÚ]
‹ÈŠOÈÙXœÛØÚÙ]Žˆ‹ÝÙXœÛØÚÙ]ŽÝ\Ë\›[ŠÚK\ËœÛØÚÙ][™]ÈÎ”™XÛÛ›™XÝ[™ÔÛØÚÙ]
\Ë\›
NÛ]]\ËœÛØÚÙ]™]™[ËœÝXœØÜšX™JÙ\œ›ÜŽ›ÏOžÝ
ÊK‹[œÝXœØÜšX™J
__JNÝ\ËšœÛÛ”œÔ™\ÜÛœÙTÝ™X[O]\ËœÛØÚÙ]™]™[Ë›X\

K\ËœÛØÚÙ]˜ÛÛ›™XÝ

_X\Þ[˜È^XÝ]JŠ^Û]]\Ëœ™\ÜÛœÙQ›Ü”™\]Y\ÝY
‹šY
NÝ\ËœÛØÚÙ]œ]Y]YT™\]Y\Ý
”ÓÓ‹œÝš[™ÚYžJŠJNÛ]OX]ØZ]ÚYŠ
š\ÒœÛÛ”œÑ\œ›Ü”™\ÜÛœÙJJJJ]›ÝÈ™]È\œ›ÜŠ”ÓÓ‹œÝš[™ÚYžJK™\œ›ÜŠJNÜ™]\›ˆ_[\Ý[ŠŠ^ÚYŠ‹›Y]ÙOOHœÝXœØÜšX™HŠ]›ÝÈ™]È\œ›ÜŠ	Ô™\]Y\ÝY]Ù]\Ý™HœÝXœØÜšX™HˆÈÝ\]™[\Ý[š[™ÉÊNÛ][‹œ\˜[\Ëœ]Y\žNÚYŠ\[ÙˆOHœÝš[™ÈŠ]›ÝÈ™]È\œ›ÜŠœ™\]Y\Ýœ\˜[\Ëœ]Y\žH]\Ý™HHÝš[™ÈŠNÚYŠ]\ËœÝXœØÜš\[Û”Ý™X[\Ëš\Ê
J^Û]O[™]È“Ê‹\ËœÛØÚÙ]
KI	”Ý™X[K˜Ü™X]JJNÝ\ËœÝXœØÜš\[Û”Ý™X[\ËœÙ]
Š_\™]\›ˆ\ËœÝXœØÜš\[Û”Ý™X[\Ë™Ù]

K™š[\ŠOOšKœ]Y\žHOO]›ÚY
_X\Þ[˜ÈÛÛ›™XÝY

^Ø]ØZ]\ËœÛØÚÙ]˜ÛÛ›™XÝ[Û”Ý]\ËØZ]›ÜŠÎÛÛ›™XÝ[Û”Ý]\ËÛÛ›™XÝY
_Y\ØÛÛ›™XÝ

^Ý\ËœÛØÚÙ]™\ØÛÛ›™XÝ

_X\Þ[˜È™\ÜÛœÙQ›Ü”™\]Y\ÝY
Š^Ü™]\›Š	™š\œÝ]™[
J\ËšœÛÛ”œÔ™\ÜÛœÙTÝ™X[K™š[\ŠOšYOO[ŠJ__NÓZ•ÙXœÛØÚÙ]ÛY[TßJNÝ˜\ˆYÏRJOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\J—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÝ•ÙXœÛØÚÙ]ÛY[]š[œÝ[˜ÙSÙ”œÔÝ™X[Z[™ÐÛY[]’ÛY[]’˜]ÚÛY[]›ÚYÝ˜\ˆšVÊ
NÓØš™XÝ™Yš[™T›Ü\J’˜]ÚÛY[‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆš‹’˜]ÚÛY[_JNÝ˜\ˆZ—Ê
NÓØš™XÝ™Yš[™T›Ü\J’ÛY[‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ‹’ÛY[_JNÝ˜\ˆš\Ê
NÓØš™XÝ™Yš[™T›Ü\Jš[œÝ[˜ÙSÙ”œÔÝ™X[Z[™ÐÛY[‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆš‹š[œÝ[˜ÙSÙ”œÔÝ™X[Z[™ÐÛY[_JNÝ˜\ˆZXÎ

NÓØš™XÝ™Yš[™T›Ü\J•ÙXœÛØÚÙ]ÛY[‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆZ‹•ÙXœÛØÚÙ]ÛY[_J_JNÝ˜\ˆ›RJ™OžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\J™—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÜ™šÚXÚÔÙ]Y[Ü™šÚXÚÐ›ÛÛX[[ÚŽÜ™šÚXÚÔÝš[™Ï]NÜ™šÚXÚÓ[X™\PNÜ™šÚXÚÐ\œ˜^OXZŽÜ™šÚXÚÓØš™XÝ\ÚŽÜ™šÚXÚÓ›Û‘[\TÝš[™ÏYŽÜ™šÚXÚÓ›Û–™\›Ó[X™\XÚŽÙ[˜Ý[Ûˆ[
J^ÚYŠOOO]›ÚY
]›ÝÈ™]È\œ›ÜŠ•˜[YH]\Ý›Ý™H[™Yš[™YŠNÚYŠOOO[[
]›ÝÈ™]È\œ›ÜŠ•˜[YH]\Ý›Ý™H[ŠNÜ™]\›ˆ_Y[˜Ý[ÛˆÚŠJ^ÚYŠ[
JK\[ÙˆHOH˜›ÛÛX[ˆŠ]›ÝÈ™]È\œ›ÜŠ•˜[YH]\Ý™HH›ÛÛX[ˆŠNÜ™]\›ˆ_Y[˜Ý[ÛˆN
J^ÚYŠ[
JK\[ÙˆHOHœÝš[™ÈŠ]›ÝÈ™]È\œ›ÜŠ•˜[YH]\Ý™HHÝš[™ÈŠNÜ™]\›ˆ_Y[˜Ý[ÛˆN
J^ÚYŠ[
JK\[ÙˆHOH›[X™\ˆŠ]›ÝÈ™]È\œ›ÜŠ•˜[YH]\Ý™HH[X™\ˆŠNÜ™]\›ˆ_Y[˜Ý[ÛˆZŠJ^ÚYŠ[
JKP\œ˜^Kš\Ð\œ˜^JJJ]›ÝÈ™]È\œ›ÜŠ•˜[YH]\Ý™H[ˆ\œ˜^HŠNÜ™]\›ˆ_Y[˜Ý[ÛˆÚŠJ^ÚYŠ[
JK\[ÙˆHOH›Øš™XÝŠ]›ÝÈ™]È\œ›ÜŠ•˜[YH]\Ý™H[ˆØš™XÝŠNÚYŠØš™XÝœ›ÝÝ\KÔÝš[™Ë˜Ø[
JHOOH–ÛØš™XÝØš™XÝHŠ]›ÝÈ™]È\œ›ÜŠ•˜[YH]\Ý™HHÚ[\HØš™XÝŠNÜ™]\›ˆ_Y[˜Ý[ÛˆŠJ^ÚYŠN
JKK›[™ÝOOL
]›ÝÈ™]È\œ›ÜŠ•˜[YH]\Ý›Ý™H[\HŠNÜ™]\›ˆ_Y[˜Ý[ÛˆÚŠJ^ÚYŠN
JKOOOL
]›ÝÈ™]È\œ›ÜŠ•˜[YH]\Ý›Ý™H™\›ÈŠNÜ™]\›ˆ__JNÝ˜\ˆ]ORJÏOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\JË—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÚË˜\UÔÛX[[PZŽÚË˜\UÐšYÒ[[ŽÚËœÛX[[Ð\OYšŽÝ˜\ˆ“ÏXšJ
KZ[›

NÙ[˜Ý[ÛˆZŠJ^Ü™]\›Š\[ÙˆOOH›[X™\ˆÛ™]È“Ë’[LÊJN““Ë’[LË™œ›ÛTÝš[™ÊJJKÓ[X™\Š
_Y[˜Ý[ÛˆŠJ^ÚYŠ
Z‹šÚXÚÔÝš[™ÊJJKYK›X]Ú
×‹OÖÌNWJÉÊJ]›ÝÈ™]È\œ›ÜŠ’[˜[YÝš[™È›Ü›X]ŠNÜ™]\›ˆšYÒ[
J_Y[˜Ý[ÛˆšŠJ^Ü™]\›ˆ™]È“Ë’[LÊJKÔÝš[™Ê
__JNÝ˜\ˆÚRJ“ÏOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\J“Ë—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÝ“Ë˜Ü™X]RœÛÛ”œÔ™\]Y\ÝRZŽÝ˜\ˆHŒLŒÍMÎHŽÙ[˜Ý[ÛˆÚŠ
^Ü™]\›ˆÓX]™›ÛÜŠX]œ˜[™ÛJ
J››[™Ý
W_Y[˜Ý[ÛˆŠ
^Ü™]\›ˆ\œÙR[
\œ˜^K™œ›ÛJÛ[™ÝŒLŸJK›X\


OO™ÚŠ
JKš›Ú[ŠˆŠKL
_Y[˜Ý[ÛˆZŠKŠ^Û][ÞË‹‹›ŸNžßNÜ™]\›žÚœÛÛœœÎˆŒ‹Œ‹YœŠ
KY]Ù™K\˜[\Î__JNÝ˜\ˆÚRJYOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\JY—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÚY›X^O^ZŽÚY™XÝ[Û˜\žUÔÝš[™ÓX\PšŽÚY™[˜ÛÙTÝš[™Ï[ZŽÚY™[˜ÛÙU]˜\š[]ÚY™[˜ÛÙU[YOPÚŽÚY™[˜ÛÙPž]\ÏTÚŽÚY™[˜ÛÙU™\œÚ[ÛZÚŽÚY™[˜ÛÙP›ØÚÒYQZŽÝ˜\ˆR›Š
NÙ[˜Ý[ÛˆZŠKŠ^Ü™]\›ˆO[[Ý›ÚY™JŠ_Y[˜Ý[ÛˆšŠJ^Û][™]ÈX\Ù›ÜŠ]ÙˆØš™XÝšÙ^\ÊJJ^Û]OYVÝNÚYŠ\[ÙˆHOHœÝš[™ÈŠ]›ÝÈ™]È\œ›ÜŠ‘›Ý[™XÝ[Û˜\žH˜[YHÙˆ\HÝ\ˆ[ˆÝš[™ÈŠNÛ‹œÙ]
J_\™]\›ˆŸY[˜Ý[ÛˆZŠJ^Û]J‹Õ]Ž
JJNÜ™]\›ˆZ[\œ˜^K™œ›ÛJÛ‹›[™Ý‹‹›—J_Y[˜Ý[Ûˆ
J^Ü™]\›ˆOLLŽÕZ[\œ˜^K™œ›ÛJÙIŒM_LŽ‹‹
OÊWJN•Z[\œ˜^K™œ›ÛJÙIŒMWJ_Y[˜Ý[ÛˆÚŠJ^Û]YK™Ù][YJ
KSX]™›ÛÜŠ‹ÌYLÊKO]ÖÎ‹‹

WN›™]ÈZ[\œ˜^KJK›˜[›ÜÙXÛÛ™ß
JÛ‰LYLÊŒYM‹Ï\ÖÌM‹‹‹
ŠWN›™]ÈZ[\œ˜^NÜ™]\›ˆZ[\œ˜^K™œ›ÛJË‹‹šK‹‹›×J_Y[˜Ý[ÛˆÚŠJ^ÚYŠK›[™ÝLLŽ
]›ÝÈ™]È\œ›ÜŠ“›Ý[\[Y[Y›Üˆž]H\œ˜^\ÈÙˆ[™ÝLŽÜˆ[Ü™HŠNÜ™]\›ˆK›[™ÝÕZ[\œ˜^K™œ›ÛJÙK›[™Ý‹‹™WJN›™]ÈZ[\œ˜^_Y[˜Ý[ÛˆÚŠJ^Û]YK˜›ØÚÏÕZ[\œ˜^K™œ›ÛJÎ‹‹
K˜›ØÚÊWJN›™]ÈZ[\œ˜^KYK˜\ÕZ[\œ˜^K™œ›ÛJÌM‹‹‹
K˜\
WJN›™]ÈZ[\œ˜^NÜ™]\›ˆZ[\œ˜^K™œ›ÛJË‹‹›‹‹‹J_Y[˜Ý[ÛˆZŠJ^Ü™]\›ˆZ[\œ˜^K™œ›ÛJÌLKš\Ú›[™Ý‹‹™Kš\ÚNKœ\Ëš\Ú›[™Ý
ÍKœ\ËÝ[NKœ\Ëš\Ú›[™Ý‹‹™Kœ\Ëš\ÚJ__JNÝ˜\ˆšRJ]OOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\J]K—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÐ]K”ÝXœØÜš\[Û‘]™[\OP]K“Y]Ù]›ÚYÐ]K˜Z[]Y\žOTZŽÝ˜\ˆŽÊ[˜Ý[ÛŠJ^ÙKX˜ÚR[™›ÏH˜X˜ÚWÚ[™›È‹KX˜ÚT]Y\žOH˜X˜ÚWÜ]Y\žH‹K›ØÚÏH˜›ØÚÈ‹K›ØÚØÚZ[H˜›ØÚØÚZ[ˆ‹K›ØÚÔ™\Ý[ÏH˜›ØÚ×Ü™\Ý[È‹K›ØÚÔÙX\˜ÚH˜›ØÚ×ÜÙX\˜Ú‹Kœ›ØYØ\Ý\Þ[˜ÏH˜œ›ØYØ\ÝÝØ\Þ[˜È‹Kœ›ØYØ\ÝÞ[˜ÏH˜œ›ØYØ\ÝÝÜÞ[˜È‹Kœ›ØYØ\ÝÛÛ[Z]H˜œ›ØYØ\ÝÝØÛÛ[Z]‹KÛÛ[Z]H˜ÛÛ[Z]‹K‘Ù[™\Ú\ÏH™Ù[™\Ú\È‹K’X[HšX[‹K“[U[˜ÛÛ™š\›YYÏH›[WÝ[˜ÛÛ™š\›YYÝÈ‹K”Ý]\ÏHœÝ]\È‹K”ÝXœØÜšX™OHœÝXœØÜšX™H‹K•H‹K•ÙX\˜ÚHÜÙX\˜Ú‹K•˜[Y]ÜœÏH˜[Y]ÜœÈ‹K•[œÝXœØÜšX™OH[œÝXœØÜšX™HŸJJŽ
]K“Y]ÙYŽ^ßJJNÝ˜\ˆÎÊ[˜Ý[ÛŠJ^ÙK“™]Ð›ØÚÏH“™]Ð›ØÚÈ‹K“™]Ð›ØÚÒXY\H“™]Ð›ØÚÒXY\ˆ‹K•H•ŸJJÎ
]K”ÝXœØÜš\[Û‘]™[\OYÎ^ßJJNÙ[˜Ý[ÛˆZŠJ^Û]JKYÜÏÙKYÜÎ–×JK›X\
O˜	Ü‹šÙ^_OIÉÜ‹˜[Y_IØ
KOYKœ˜]ÏÖÙKœ˜]×N–×NÜ™]\›–Ë‹‹‹‹šWKš›Ú[ŠˆS‘Š__JNÝ˜\ˆRJÙOžÈ\ÙHÝšXÝŽÝ˜\ˆÚ[Ù	‰›Ù—×ØÜ™X]Pš[™[™ß
Øš™XÝ˜Ü™X]OÊ[˜Ý[ÛŠK‹J^ÚOOO]›ÚY	‰ŠO]
NÝ˜\ˆSØš™XÝ™Ù]ÝÛ”›Ü\Q\ØÜš\ÜŠ‹
NÊ\Ÿ
™Ù]š[ˆÈ[‹—×Ù\Ó[Ù[Nœ‹Üš]X›_‹˜ÛÛ™šYÝ\˜X›JJI‰Š^Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ–Ý__JKØš™XÝ™Yš[™T›Ü\JKKŠ_JNŠ[˜Ý[ÛŠK‹J^ÚOOO]›ÚY	‰ŠO]
KVÚWO[–Ý_JJKš[Ù	‰›Ù—×ÜÙ][Ù[QY˜][
Øš™XÝ˜Ü™X]OÊ[˜Ý[ÛŠKŠ^ÓØš™XÝ™Yš[™T›Ü\JK™Y˜][‹Ù[[Y\˜X›NˆL˜[YN›ŸJ_JN™[˜Ý[ÛŠKŠ^ÙK™Y˜][[ŸJKš[Ù	‰›Ù—×Ú[\ÜÝ\Ÿ
[˜Ý[ÛŠ
^Ý˜\ˆOY[˜Ý[ÛŠŠ^Ü™]\›ˆOSØš™XÝ™Ù]ÝÛ”›Ü\S˜[Y\ß[˜Ý[ÛŠ
^Ý˜\ˆOV×NÙ›ÜŠ˜\ˆˆ[ˆ
SØš™XÝœ›ÝÝ\Kš\ÓÝÛ”›Ü\K˜Ø[
ŠI‰ŠVÚK›[™ÝO\ŠNÜ™]\›ˆ_KJŠ_NÜ™]\›ˆ[˜Ý[ÛŠŠ^ÚYŠ‰‰›‹—×Ù\Ó[Ù[J\™]\›ˆŽÝ˜\ˆ^ßNÚYŠˆO[[
Y›ÜŠ˜\ˆOYJŠKLÜK›[™ÝÜŠÊÊZVÜ—HOOH™Y˜][‰‰ÚŠ‹VÜ—JNÜ™]\›ˆšŠŠK_JJ
NÓØš™XÝ™Yš[™T›Ü\JÙ—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÛÙ”\˜[\Ï]›ÚYÝ˜\ˆSÏR›Š
KÜÏ]]J
KšOWÚ

KÏQÚ

KTšŠš

JNÙ[˜Ý[ÛˆÓÊJ^Ü™]\›žÚZYÚŠË›X^JJÜËœÛX[[Ð\KKšZYÚ
__Y[˜Ý[ÛˆšŠJ^Ü™]\›žÛZ[’ZYÚŠË›X^JJÜËœÛX[[Ð\KK›Z[’ZYÚ
KX^ZYÚŠË›X^JJÜËœÛX[[Ð\KK›X^ZYÚ
__Y[˜Ý[ÛˆšŠJ^Ü™]\›žÜ]Y\žN™Kœ]Y\žKYÙNŠË›X^JJÜËœÛX[[Ð\KKœYÙJK\—ÜYÙNŠË›X^JJÜËœÛX[[Ð\KKœ\—ÜYÙJKÜ™\—ØžN™K›Ü™\—Øž__Y[˜Ý[ÛˆÚŠJ^Ü™]\›žÜ]™Kœ]]NŠSËÒ^
JK™]JKZYÚŠË›X^JJÜËœÛX[[Ð\KKšZYÚ
K›Ý™N™Kœ›Ý™__Y[˜Ý[ÛˆŠJ^Ü™]\›žÝŠSËÐ˜\ÙM
JK
__Y[˜Ý[ÛˆZŠJ^Ü™]\›žÚ\ÚŠSËÐ˜\ÙM
JKš\Ú
K›Ý™N™Kœ›Ý™__Y[˜Ý[ÛˆŠJ^Ü™]\›žÜ]Y\žN™Kœ]Y\žK›Ý™N™Kœ›Ý™KYÙNŠË›X^JJÜËœÛX[[Ð\KKœYÙJK\—ÜYÙNŠË›X^JJÜËœÛX[[Ð\KKœ\—ÜYÙJKÜ™\—ØžN™K›Ü™\—Øž__Y[˜Ý[ÛˆŠJ^Ü™]\›žÚZYÚŠË›X^JJÜËœÛX[[Ð\KKšZYÚ
KYÙNŠË›X^JJÜËœÛX[[Ð\KKœYÙJK\—ÜYÙNŠË›X^JJÜËœÛX[[Ð\KKœ\—ÜYÙJ__]˜\ˆÏXÛ\ÜÞÜÝ]XÈ[˜ÛÙPX˜ÚR[™›ÊŠ^Ü™]\›ŠšK˜Ü™X]RœÛÛ”œÔ™\]Y\Ý
J‹›Y]Ù
_\Ý]XÈ[˜ÛÙPX˜ÚT]Y\žJŠ^Ü™]\›ŠšK˜Ü™X]RœÛÛ”œÔ™\]Y\Ý
J‹›Y]ÙÚŠ‹œ\˜[\ÊJ_\Ý]XÈ[˜ÛÙP›ØÚÊŠ^Ü™]\›ŠšK˜Ü™X]RœÛÛ”œÔ™\]Y\Ý
J‹›Y]ÙÓÊ‹œ\˜[\ÊJ_\Ý]XÈ[˜ÛÙP›ØÚØÚZ[ŠŠ^Ü™]\›ŠšK˜Ü™X]RœÛÛ”œÔ™\]Y\Ý
J‹›Y]ÙšŠ‹œ\˜[\ÊJ_\Ý]XÈ[˜ÛÙP›ØÚÔ™\Ý[ÊŠ^Ü™]\›ŠšK˜Ü™X]RœÛÛ”œÔ™\]Y\Ý
J‹›Y]ÙÓÊ‹œ\˜[\ÊJ_\Ý]XÈ[˜ÛÙP›ØÚÔÙX\˜Ú
Š^Ü™]\›ŠšK˜Ü™X]RœÛÛ”œÔ™\]Y\Ý
J‹›Y]ÙšŠ‹œ\˜[\ÊJ_\Ý]XÈ[˜ÛÙPœ›ØYØ\Ý
Š^Ü™]\›ŠšK˜Ü™X]RœÛÛ”œÔ™\]Y\Ý
J‹›Y]ÙŠ‹œ\˜[\ÊJ_\Ý]XÈ[˜ÛÙPÛÛ[Z]
Š^Ü™]\›ŠšK˜Ü™X]RœÛÛ”œÔ™\]Y\Ý
J‹›Y]ÙÓÊ‹œ\˜[\ÊJ_\Ý]XÈ[˜ÛÙQÙ[™\Ú\ÊŠ^Ü™]\›ŠšK˜Ü™X]RœÛÛ”œÔ™\]Y\Ý
J‹›Y]Ù
_\Ý]XÈ[˜ÛÙRX[
Š^Ü™]\›ŠšK˜Ü™X]RœÛÛ”œÔ™\]Y\Ý
J‹›Y]Ù
_\Ý]XÈ[˜ÛÙS[U[˜ÛÛ™š\›YYÊŠ^Ü™]\›ŠšK˜Ü™X]RœÛÛ”œÔ™\]Y\Ý
J‹›Y]Ù
_\Ý]XÈ[˜ÛÙTÝ]\ÊŠ^Ü™]\›ŠšK˜Ü™X]RœÛÛ”œÔ™\]Y\Ý
J‹›Y]Ù
_\Ý]XÈ[˜ÛÙTÝXœØÜšX™JŠ^Û]^ÚÙ^NˆK™]™[‹˜[YN›‹œ]Y\žK\_KOT‹˜Z[]Y\žJÝYÜÎ–ÝK˜]Î›‹œ]Y\žKœ˜]ßJNÜ™]\›ŠšK˜Ü™X]RœÛÛ”œÔ™\]Y\Ý
JœÝXœØÜšX™H‹Ü]Y\žNš_J_\Ý]XÈ[˜ÛÙU
Š^Ü™]\›ŠšK˜Ü™X]RœÛÛ”œÔ™\]Y\Ý
J‹›Y]ÙZŠ‹œ\˜[\ÊJ_\Ý]XÈ[˜ÛÙUÙX\˜Ú
Š^Ü™]\›ŠšK˜Ü™X]RœÛÛ”œÔ™\]Y\Ý
J‹›Y]ÙŠ‹œ\˜[\ÊJ_\Ý]XÈ[˜ÛÙU˜[Y]ÜœÊŠ^Ü™]\›ŠšK˜Ü™X]RœÛÛ”œÔ™\]Y\Ý
J‹›Y]ÙŠ‹œ\˜[\ÊJ__NÛÙ”\˜[\ÏQßJNÝ˜\ˆYÏRJ˜ÏOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\J˜Ë—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÔ˜Ë‘]U[YO]›ÚYÔ˜Ë™œ›ÛT™˜ÌÌÌÎUÚ]˜[›ÜÙXÛÛ™ÏRNÔ˜ËÔ™˜ÌÌÌÎUÚ]˜[›ÜÙXÛÛ™ÏZÔ˜Ë™œ›ÛTÙXÛÛ™Ï\ZŽÔ˜ËÔÙXÛÛ™ÏRŽÝ˜\ˆšR›Š
KšXšJ
NÙ[˜Ý[ÛˆN
J^Û]Jš‹™œ›ÛT™˜ÌÌÌÎJJJKYK›X]Ú
×Š
ÊV‰ÊKO]ÝÌWKœÛXÙJÊNˆˆŽÜ™]\›ˆ‹›˜[›ÜÙXÛÛ™Ï\\œÙR[
KœY[™
‹ŒŠKL
KŸY[˜Ý[Ûˆ
J^Û]YKÒTÓÔÝš[™Ê
KYK›˜[›ÜÙXÛÛ™ÏËÔÝš[™Ê
OÏÈˆŽÜ™]\›˜	Û‹œÛXÙJLJ_IÝœYÝ\
‹ŒŠ_V˜Y[˜Ý[ÛˆZŠKL
^Û][™]Èš‹•Z[ÌŠŠKÓ[X™\Š
NÚYŠŽNNNNNNNNJ]›ÝÈ™]È\œ›ÜŠ“˜[›ÈÙXÛÛ™È]\Ý›Ý^ÙYYNNNNNNNNHŠNÛ]O[™]È]JJŒYLÊÓX]™›ÛÜŠÌYMŠJNÜ™]\›ˆK›˜[›ÜÙXÛÛ™Ï]	LYM‹_Y[˜Ý[ÛˆŠJ^Ü™]\›žÜÙXÛÛ™Î“X]™›ÛÜŠK™Ù][YJ
KÌYLÊK˜[›ÜÎ™K™Ù][YJ
ILYLÊŒYMŠÊK›˜[›ÜÙXÛÛ™ÏÏÌ
__]˜\ˆÏXÛ\ÜÞÜÝ]XÈXÛÙJŠ^Ü™]\›ˆN
Š_\Ý]XÈ[˜ÛÙJŠ^Ü™]\›ˆ
Š__NÔ˜Ë‘]U[YO^ßJNÝ˜\ˆ™ÏRJÚOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\JÚ—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÒÚ›ØÚÒY›YÏ]›ÚYÝ˜\ˆNÊ[˜Ý[ÛŠJ^ÙVÙK•[šÛ›ÝÛLOH•[šÛ›ÝÛˆ‹VÙKXœÙ[LWOHXœÙ[‹VÙKÛÛ[Z]L—OHÛÛ[Z]‹VÙK“š[L×OH“š[‹VÙK•[œ™XÛÙÛš^™YKLWOH•[œ™XÛÙÛš^™YŸJJN
Ú›ØÚÒY›YÏ^N^ßJJ_JNÝ˜\ˆŽRJÚOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\JÚ—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÕÚš\ÚSZŽÕÚš\Ú›ØÚÏRÚŽÝ˜\ˆ“ÏUšJ
KÛÏQÚ

NÙ[˜Ý[ÛˆZŠJ^Ü™]\›Š“ËœÚLMŠJJ_Y[˜Ý[ÛˆÚŠJ^ÚYŠOJ]›ÝÈ™]È\œ›ÜŠØ[››ÝÜ][ˆ[\H™YHŠNÛ]LŠŠ“X]™›ÛÜŠX]›ÙÌŠJJNÜ™]\›ˆOÛŽ›‹ÌŸY[˜Ý[ÛˆÚŠJ^Û][™]È“Ë”ÚLMŠZ[\œ˜^K™œ›ÛJÌJJNÜ™]\›ˆ‹\]JJK‹™YÙ\Ý

_Y[˜Ý[ÛˆšŠKŠ^Û][™]È“Ë”ÚLMŠZ[\œ˜^K™œ›ÛJÌWJJNÜ™]\›ˆ\]JJK\]JŠK™YÙ\Ý

_Y[˜Ý[ÛˆÊJ^ÜÝÚ]Ú
K›[™Ý
^ØØ\ÙH›ÝÈ™]È\œ›ÜŠØ[››Ý\Ú[\H™YHŠNØØ\ÙHNœ™]\›ˆÚŠVÌJNÙY˜][žÛ]WÚŠK›[™Ý
KUÊKœÛXÙJŠJKOUÊKœÛXÙJŠJNÜ™]\›ˆšŠJ___Y[˜Ý[ÛˆÚŠJ^ÚYŠYK›\Ý›ØÚÒY
]›ÝÈ™]È\œ›ÜŠ’\Ú[™ÈH›ØÚÈXY\ˆÚ]›È\Ý›ØÚÈQ
K™KˆXY\ˆ]ZYÚJH\È›ÝÝ\ÜYˆYˆ[ÝH™YY\ËÛÛšX][ÛœÈ\™HÙ[ÛÛYKˆX\ÙHYØÝ[Y[][Ûˆ[™\Ý™XÝÜœÈ›Üˆ\ÈØ\ÙKˆŠNÛ]VÊÛË™[˜ÛÙU™\œÚ[ÛŠJK™\œÚ[ÛŠK
ÛË™[˜ÛÙTÝš[™ÊJK˜ÚZ[’Y
K
ÛË™[˜ÛÙU]˜\š[
JKšZYÚ
K
ÛË™[˜ÛÙU[YJJK[YJK
ÛË™[˜ÛÙP›ØÚÒY
JK›\Ý›ØÚÒY
K
ÛË™[˜ÛÙPž]\ÊJK›\ÝÛÛ[Z]\Ú
K
ÛË™[˜ÛÙPž]\ÊJK™]R\Ú
K
ÛË™[˜ÛÙPž]\ÊJK˜[Y]ÜœÒ\Ú
K
ÛË™[˜ÛÙPž]\ÊJK›™^˜[Y]ÜœÒ\Ú
K
ÛË™[˜ÛÙPž]\ÊJK˜ÛÛœÙ[œÝ\Ò\Ú
K
ÛË™[˜ÛÙPž]\ÊJK˜\\Ú
K
ÛË™[˜ÛÙPž]\ÊJK›\Ý™\Ý[Ò\Ú
K
ÛË™[˜ÛÙPž]\ÊJK™]šY[˜ÙR\Ú
K
ÛË™[˜ÛÙPž]\ÊJKœ›ÜÜÙ\Y™\ÜÊWNÜ™]\›ˆÊŠ__JNÝ˜\ˆŽRJÙOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\JÙ—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÜÙ”™\ÜÛœÙ\Ï]›ÚYÜÙ™XÛÙQ]™[PÎÜÙ™XÛÙU˜[Y]Ü•\]OTNÜÙ™XÛÙP›ØÚÔ™\Ý[Ï]ÎÜÙ™XÛÙPÛÛ[Z]\SÎÜÙ™XÛÙU˜[Y]Ü‘Ù[™\Ú\ÏXŽÜÙ™XÛÙU˜[Y]Ü’[™›ÏRÎÝ˜\ˆ[R›Š
KNU\Š
KYÏ^YÊ
K[]]J
K[›

KÚP™Ê
KYQÚ

KPŽ

NÙ[˜Ý[ÛˆZŠJ^Ü™]\›žÙ]N™K™]K\Ý›ØÚÒZYÚŠY›X^JJ[‹˜\UÔÛX[[K›\ÝØ›ØÚ×ÚZYÚ
K\Ý›ØÚÐ\\ÚŠY›X^JJ[‹™œ›ÛP˜\ÙMK›\ÝØ›ØÚ×Ø\Ú\Ú
__Y[˜Ý[ÛˆšŠJ^Ü™]\›žÛÜÎ™K›ÜË›X\
OŠÝ\N›‹\KÙ^NŠ[‹™œ›ÛP˜\ÙM
J‹šÙ^JK]NŠ[‹™œ›ÛP˜\ÙM
J‹™]J_JJ__Y[˜Ý[ÛˆšŠJ^Ü™]\›žÚÙ^NŠ[‹™œ›ÛP˜\ÙM
J
šÚXÚÔÝš[™ÊJKšÙ^OÏÈˆŠJK˜[YNŠ[‹™œ›ÛP˜\ÙM
J
šÚXÚÔÝš[™ÊJK˜[YOÏÈˆŠJK›ÛÙŽŠY›X^JJš‹Kœ›ÛÙ“ÜÊKZYÚŠY›X^JJ[‹˜\UÔÛX[[KšZYÚ
KÛÙNŠY›X^JJ[‹˜\UÔÛX[[K˜ÛÙJKÛÙ\ÜXÙNŠšÚXÚÔÝš[™ÊJK˜ÛÙ\ÜXÙOÏÈˆŠK[™^ŠY›X^JJ[‹˜\UÔÛX[[Kš[™^
KÙÎ™K›ÙË[™›ÎŠšÚXÚÔÝš[™ÊJKš[™›ÏÏÈˆŠ__Y[˜Ý[ÛˆŠJ^Ü™]\›žÚÙ^NŠšÚXÚÓ›Û‘[\TÝš[™ÊJKšÙ^JK˜[YN™K˜[YOÏÈˆŸ_Y[˜Ý[Ûˆ	ŠJ^Ü™]\›ŠšÚXÚÐ\œ˜^JJJK›X\
Š_Y[˜Ý[ÛˆÎ
J^Ü™]\›žÝ\N™K\K]šX]\Î™K˜]šX]\ÏÉŠK˜]šX]\ÊN–×__Y[˜Ý[ÛˆÎ
J^Ü™]\›ŠšÚXÚÐ\œ˜^JJJK›X\
Î
_Y[˜Ý[Ûˆ›
J^Ü™]\›žØÛÙNŠ[‹˜\UÔÛX[[
J
šÚXÚÓ[X™\ŠJK˜ÛÙOÏÌ
JKÛÙ\ÜXÙN™K˜ÛÙ\ÜXÙKÙÎ™K›ÙË]NŠY›X^JJ[‹™œ›ÛP˜\ÙMK™]JK]™[Î™K™]™[ÏÔÎ
K™]™[ÊN–×KØ\ÕØ[YŠ[‹˜\UÐšYÒ[
JK™Ø\×ÝØ[YÏÈŒŠKØ\Õ\ÙYŠ[‹˜\UÐšYÒ[
JK™Ø\×Ý\ÙYÏÈŒŠ__Y[˜Ý[ÛˆÎ
J^ÚYŠ”Ý[Hš[ˆJ^Û]ÖÛ‹WOSØš™XÝ™[šY\ÊK”Ý[K˜[YJNÜ™]\›ŠN˜\ÜÙ\
JOOH™YMLNHŸOOHœÙXÜMšÌH‹[šÛ›ÝÛˆXšÙ^H\Nˆ	ÛŸX
KØ[ÛÜš]N›‹]NŠ[‹™œ›ÛP˜\ÙM
J
šÚXÚÓ›Û‘[\TÝš[™ÊJ
J__Y[ÙHÝÚ]Ú
K\J^ØØ\ÙH[™\›Z[ÔX’Ù^QYMLNHŽœ™]\›žØ[ÛÜš]Nˆ™YMLNH‹]NŠ[‹™œ›ÛP˜\ÙM
J
šÚXÚÓ›Û‘[\TÝš[™ÊJK˜[YJJ_NØØ\ÙH[™\›Z[ÔX’Ù^TÙXÜMšÌHŽœ™]\›žØ[ÛÜš]NˆœÙXÜMšÌH‹]NŠ[‹™œ›ÛP˜\ÙM
J
šÚXÚÓ›Û‘[\TÝš[™ÊJK˜[YJJ_NÙY˜][›ÝÈ™]È\œ›ÜŠ[šÛ›ÝÛˆXšÙ^H\Nˆ	ÙK\_X
__Y[˜Ý[ÛˆšŠJ^Ü™]\›žÛX^ž]\ÎŠ[‹˜\UÔÛX[[
J
šÚXÚÓ›Û‘[\TÝš[™ÊJK›X^Øž]\ÊJKX^Ø\ÎŠ[‹˜\UÔÛX[[
J
šÚXÚÓ›Û‘[\TÝš[™ÊJK›X^ÙØ\ÊJ__Y[˜Ý[ÛˆYYJJ^Ü™]\›žÛX^YÙS[P›ØÚÜÎŠ[‹˜\UÔÛX[[
J
šÚXÚÓ›Û‘[\TÝš[™ÊJK›X^ØYÙWÛ[WØ›ØÚÜÊJKX^YÙQ\˜][ÛŽŠ[‹˜\UÔÛX[[
J
šÚXÚÓ›Û‘[\TÝš[™ÊJK›X^ØYÙWÙ\˜][ÛŠJ__Y[˜Ý[ÛˆN
J^Ü™]\›žØ›ØÚÎ™K˜›ØÚÏÚšŠ
šÚXÚÓØš™XÝ
JK˜›ØÚÊJN›ÚY]šY[˜ÙN™K™]šY[˜ÙOÙYYJ
šÚXÚÓØš™XÝ
JK™]šY[˜ÙJJN›ÚY_Y[˜Ý[ÛˆN
J^Ü™]\›žÜXšÙ^NžØž]\ÎŠ[‹™œ›ÛP˜\ÙM
J
šÚXÚÔÝš[™ÊJKœX—ÚÙ^WØž]\ÊJK\NŠšÚXÚÔÝš[™ÊJKœX—ÚÙ^WÝ\J_K›Ý[™ÔÝÙ\ŽŠ[‹˜\UÐšYÒ[
JKœÝÙ\ÏÈŒŠ__Y[˜Ý[ÛˆÎ
J^Ü™]\›žÚZYÚŠ[‹˜\UÔÛX[[
J
šÚXÚÓ›Û‘[\TÝš[™ÊJKšZYÚ
JK™\Ý[ÎŠK×Ü™\Ý[ß×JK›X\
›
K˜[Y]Ü•\]\ÎŠK˜[Y]Ü—Ý\]\ß×JK›X\
N
KÛÛœÙ[œÝ\Õ\]\ÎŠY›X^JJNK˜ÛÛœÙ[œÝ\×Ü\˜[WÝ\]\ÊKš[˜[^™P›ØÚÑ]™[Î”Î
K™š[˜[^™WØ›ØÚ×Ù]™[ß×J__Y[˜Ý[Ûˆ
J^Ü™]\›žÚ\ÚŠ[‹™œ›ÛR^
J
šÚXÚÓ›Û‘[\TÝš[™ÊJKš\Ú
JK\ÎžÝÝ[ŠšÚXÚÓ›Û–™\›Ó[X™\ŠJKœ\ËÝ[
K\ÚŠ[‹™œ›ÛR^
J
šÚXÚÓ›Û‘[\TÝš[™ÊJKœ\Ëš\Ú
J___Y[˜Ý[Ûˆ™YJJ^Ü™]\›žØ›ØÚÎŠ[‹˜\UÔÛX[[
JK˜›ØÚÊK\Š[‹˜\UÔÛX[[
JK˜\ÏÌ
__Y[˜Ý[ÛˆZ
J^Ü™]\›žÝ™\œÚ[ÛŽ›™YJK™\œÚ[ÛŠKÚZ[’YŠšÚXÚÓ›Û‘[\TÝš[™ÊJK˜ÚZ[—ÚY
KZYÚŠ[‹˜\UÔÛX[[
J
šÚXÚÓ›Û‘[\TÝš[™ÊJKšZYÚ
JK[YNŠYË™œ›ÛT™˜ÌÌÌÎUÚ]˜[›ÜÙXÛÛ™ÊJ
šÚXÚÓ›Û‘[\TÝš[™ÊJK[YJJK\Ý›ØÚÒY™K›\ÝØ›ØÚ×ÚYš\ÚÓ
K›\ÝØ›ØÚ×ÚY
N›[\ÝÛÛ[Z]\ÚŠ[‹™œ›ÛR^
J
šÚXÚÔÙ]
JK›\ÝØÛÛ[Z]Ú\Ú
JK]R\ÚŠ[‹™œ›ÛR^
J
šÚXÚÔÙ]
JK™]WÚ\Ú
JK˜[Y]ÜœÒ\ÚŠ[‹™œ›ÛR^
J
šÚXÚÔÙ]
JK˜[Y]Üœ×Ú\Ú
JK™^˜[Y]ÜœÒ\ÚŠ[‹™œ›ÛR^
J
šÚXÚÔÙ]
JK›™^Ý˜[Y]Üœ×Ú\Ú
JKÛÛœÙ[œÝ\Ò\ÚŠ[‹™œ›ÛR^
J
šÚXÚÔÙ]
JK˜ÛÛœÙ[œÝ\×Ú\Ú
JK\\ÚŠ[‹™œ›ÛR^
J
šÚXÚÔÙ]
JK˜\Ú\Ú
JK\Ý™\Ý[Ò\ÚŠ[‹™œ›ÛR^
J
šÚXÚÔÙ]
JK›\ÝÜ™\Ý[×Ú\Ú
JK]šY[˜ÙR\ÚŠ[‹™œ›ÛR^
J
šÚXÚÔÙ]
JK™]šY[˜ÙWÚ\Ú
JK›ÜÜÙ\Y™\ÜÎŠ[‹™œ›ÛR^
J
šÚXÚÓ›Û‘[\TÝš[™ÊJKœ›ÜÜÙ\—ØY™\ÜÊJ__Y[˜Ý[ÛˆYJJ^Ü™]\›žØ›ØÚÒY“
K˜›ØÚ×ÚY
K›ØÚÔÚ^™NŠ[‹˜\UÔÛX[[
J
šÚXÚÓ›Û‘[\TÝš[™ÊJK˜›ØÚ×ÜÚ^™JJKXY\Ž–Z
KšXY\ŠK[UÎŠ[‹˜\UÔÛX[[
J
šÚXÚÓ›Û‘[\TÝš[™ÊJK›[WÝÊJ__Y[˜Ý[Ûˆ™YJJ^Ü™]\›žÛ\ÝZYÚŠ[‹˜\UÔÛX[[
J
šÚXÚÓ›Û‘[\TÝš[™ÊJK›\ÝÚZYÚ
JK›ØÚÓY]\ÎŠšÚXÚÐ\œ˜^JJK˜›ØÚ×ÛY]\ÊK›X\
YJ__Y[˜Ý[ÛˆYYJJ^Ü™]\›žË‹‹œ›
JK\ÚŠ[‹™œ›ÛR^
J
šÚXÚÓ›Û‘[\TÝš[™ÊJKš\Ú
J__Y[˜Ý[ÛˆÙYJJ^Û]YKÜ™\Ý[Ü›
KÜ™\Ý[
N›ÚYÜ™]\›žÚZYÚŠ[‹˜\UÔÛX[[
JKšZYÚ
K\ÚŠ[‹™œ›ÛR^
J
šÚXÚÓ›Û‘[\TÝš[™ÊJKš\Ú
JKÚXÚÕœ›

šÚXÚÓØš™XÝ
JK˜ÚXÚ×Ý
JK[]™\•›‹™\Ý[›Ÿ_Y[˜Ý[ÛˆYYJJ^Ü™]\›ŠN˜\ÜÙ\
JH[ˆÚ‹›ØÚÒY›YÊK_Y[˜Ý[ÛˆÙYJJ^Ü™]\›žØ›ØÚÒY›YÎ˜YYJK˜›ØÚ×ÚYÙ›YÊK˜[Y]ÜY™\ÜÎ™K˜[Y]Ü—ØY™\ÜÏÊ[‹™œ›ÛR^
JK˜[Y]Ü—ØY™\ÜÊN›ÚY[Y\Ý[\™K[Y\Ý[\ÊYË™œ›ÛT™˜ÌÌÌÎUÚ]˜[›ÜÙXÛÛ™ÊJK[Y\Ý[\
N›ÚYÚYÛ˜]\™N™KœÚYÛ˜]\™OÊ[‹™œ›ÛP˜\ÙM
JKœÚYÛ˜]\™JN›ÚY_Y[˜Ý[ÛˆSÊJ^Ü™]\›žØ›ØÚÒY“

šÚXÚÓØš™XÝ
JK˜›ØÚ×ÚY
JKZYÚŠ[‹˜\UÔÛX[[
J
šÚXÚÓ›Û‘[\TÝš[™ÊJKšZYÚ
JK›Ý[™Š[‹˜\UÔÛX[[
JKœ›Ý[™
KÚYÛ˜]\™\Î™KœÚYÛ˜]\™\ÏÊšÚXÚÐ\œ˜^JJKœÚYÛ˜]\™\ÊK›X\
ÙYJN–×__Y[˜Ý[ÛˆYJJ^Ü™]\›žØØ[›ÛšXØ[ŠšÚXÚÐ›ÛÛX[ŠJK˜Ø[›ÛšXØ[
KXY\Ž–Z
KœÚYÛ™YÚXY\‹šXY\ŠKÛÛ[Z]œSÊKœÚYÛ™YÚXY\‹˜ÛÛ[Z]
__Y[˜Ý[ÛˆŽ
J^Ü™]\›žØY™\ÜÎŠ[‹™œ›ÛR^
J
šÚXÚÓ›Û‘[\TÝš[™ÊJK˜Y™\ÜÊJKXšÙ^NšÎ

šÚXÚÓØš™XÝ
JKœX—ÚÙ^JJKÝÙ\ŽŠ[‹˜\UÐšYÒ[
J
šÚXÚÓ›Û‘[\TÝš[™ÊJKœÝÙ\ŠJK˜[YN™K›˜[Y__Y[˜Ý[ÛˆÙYJJ^Ü™]\›žÙÙ[™\Ú\Õ[YNŠYË™œ›ÛT™˜ÌÌÌÎUÚ]˜[›ÜÙXÛÛ™ÊJ
šÚXÚÓ›Û‘[\TÝš[™ÊJK™Ù[™\Ú\×Ý[YJJKÚZ[’YŠšÚXÚÓ›Û‘[\TÝš[™ÊJK˜ÚZ[—ÚY
KÛÛœÙ[œÝ\Ô\˜[\Î‘N
K˜ÛÛœÙ[œÝ\×Ü\˜[\ÊK˜[Y]ÜœÎ™K˜[Y]ÜœÏÊšÚXÚÐ\œ˜^JJK˜[Y]ÜœÊK›X\
Ž
N–×K\\ÚŠ[‹™œ›ÛR^
J
šÚXÚÔÙ]
JK˜\Ú\Ú
JK\Ý]N™K˜\ÜÝ]__Y[˜Ý[ÛˆÊJ^Ü™]\›žÜXšÙ^NšÎ

šÚXÚÓØš™XÝ
JKœX—ÚÙ^JJK›Ý[™ÔÝÙ\ŽŠ[‹˜\UÐšYÒ[
J
šÚXÚÓ›Û‘[\TÝš[™ÊJK›Ý[™×ÜÝÙ\ŠJKY™\ÜÎŠ[‹™œ›ÛR^
J
šÚXÚÓ›Û‘[\TÝš[™ÊJK˜Y™\ÜÊJK›ÜÜÙ\”š[Üš]N™Kœ›ÜÜÙ\—Üš[Üš]OÊ[‹˜\UÔÛX[[
JKœ›ÜÜÙ\—Üš[Üš]JN›ÚY_Y[˜Ý[ÛˆYYJJ^Ü™]\›žÚYŠ[‹™œ›ÛR^
J
šÚXÚÓ›Û‘[\TÝš[™ÊJKšY
JK\Ý[YŽŠšÚXÚÓ›Û‘[\TÝš[™ÊJK›\Ý[—ØYŠK™]ÛÜšÎŠšÚXÚÓ›Û‘[\TÝš[™ÊJK›™]ÛÜšÊK™\œÚ[ÛŽŠšÚXÚÔÝš[™ÊJK™\œÚ[ÛŠKÚ[›™[ÎŠšÚXÚÔÝš[™ÊJK˜Ú[›™[ÊK[ÛšZÙ\ŽŠšÚXÚÓ›Û‘[\TÝš[™ÊJK›[ÛšZÙ\ŠKÝ\ŽŠY™XÝ[Û˜\žUÔÝš[™ÓX\
JK›Ý\ŠK›ÝØÛÛ™\œÚ[ÛŽžØ\Š[‹˜\UÔÛX[[
J
šÚXÚÓ›Û‘[\TÝš[™ÊJKœ›ÝØÛÛÝ™\œÚ[Û‹˜\
JK›ØÚÎŠ[‹˜\UÔÛX[[
J
šÚXÚÓ›Û‘[\TÝš[™ÊJKœ›ÝØÛÛÝ™\œÚ[Û‹˜›ØÚÊJKœŠ[‹˜\UÔÛX[[
J
šÚXÚÓ›Û‘[\TÝš[™ÊJKœ›ÝØÛÛÝ™\œÚ[Û‹œœ
J___Y[˜Ý[ÛˆYYJJ^Û]YK™X\›Y\ÝØ›ØÚ×ÚZYÚÊ[‹˜\UÔÛX[[
JK™X\›Y\ÝØ›ØÚ×ÚZYÚ
N›ÚYYK™X\›Y\ÝØ›ØÚ×Ý[YOÊYË™œ›ÛT™˜ÌÌÌÎUÚ]˜[›ÜÙXÛÛ™ÊJK™X\›Y\ÝØ›ØÚ×Ý[YJN›ÚYÜ™]\›žÙX\›Y\Ý\\Ú™K™X\›Y\ÝØ\Ú\ÚÊ[‹™œ›ÛR^
JK™X\›Y\ÝØ\Ú\Ú
N›ÚYX\›Y\Ý›ØÚÒ\Ú™K™X\›Y\ÝØ›ØÚ×Ú\ÚÊ[‹™œ›ÛR^
JK™X\›Y\ÝØ›ØÚ×Ú\Ú
N›ÚYX\›Y\Ý›ØÚÒZYÚ›Ÿ›ÚYX\›Y\Ý›ØÚÕ[YNË™Ù][YJ
OÝ›ÚY]\Ý›ØÚÒ\ÚŠ[‹™œ›ÛR^
J
šÚXÚÓ›Û‘[\TÝš[™ÊJK›]\ÝØ›ØÚ×Ú\Ú
JK]\Ý\\ÚŠ[‹™œ›ÛR^
J
šÚXÚÓ›Û‘[\TÝš[™ÊJK›]\ÝØ\Ú\Ú
JK]\Ý›ØÚÕ[YNŠYË™œ›ÛT™˜ÌÌÌÎUÚ]˜[›ÜÙXÛÛ™ÊJ
šÚXÚÓ›Û‘[\TÝš[™ÊJK›]\ÝØ›ØÚ×Ý[YJJK]\Ý›ØÚÒZYÚŠ[‹˜\UÔÛX[[
J
šÚXÚÓ›Û‘[\TÝš[™ÊJK›]\ÝØ›ØÚ×ÚZYÚ
JKØ]Ú[™Õ\ŠšÚXÚÐ›ÛÛX[ŠJK˜Ø]Ú[™×Ý\
__Y[˜Ý[ÛˆYJJ^Ü™]\›žÛ›ÙR[™›ÎYYJK››ÙWÚ[™›ÊKÞ[˜Ò[™›ÎYYJKœÞ[˜×Ú[™›ÊK˜[Y]Ü’[™›Î’ÊK˜[Y]Ü—Ú[™›Ê__Y[˜Ý[Ûˆ™YJJ^Ü™]\›žÙ]NŠ[‹™œ›ÛP˜\ÙM
J
šÚXÚÓ›Û‘[\TÝš[™ÊJK™]JJK›ÛÝ\ÚŠ[‹™œ›ÛR^
J
šÚXÚÓ›Û‘[\TÝš[™ÊJKœ›ÛÝÚ\Ú
JK›ÛÙŽžÝÝ[Š[‹˜\UÔÛX[[
J
šÚXÚÓ›Û‘[\TÝš[™ÊJKœ›ÛÙ‹Ý[
JK[™^Š[‹˜\UÔÛX[[
J
šÚXÚÓ›Û‘[\TÝš[™ÊJKœ›ÛÙ‹š[™^
JKXY’\ÚŠ[‹™œ›ÛP˜\ÙM
J
šÚXÚÓ›Û‘[\TÝš[™ÊJKœ›ÛÙ‹›XY—Ú\Ú
JK][ÎŠšÚXÚÐ\œ˜^JJKœ›ÛÙ‹˜][ÊK›X\
[‹™œ›ÛP˜\ÙM
___Y[˜Ý[ÛˆŽ
J^Ü™]\›žÝŠ[‹™œ›ÛP˜\ÙM
J
šÚXÚÓ›Û‘[\TÝš[™ÊJK
JK™\Ý[œ›

šÚXÚÓØš™XÝ
JKÜ™\Ý[
JKZYÚŠ[‹˜\UÔÛX[[
J
šÚXÚÓ›Û‘[\TÝš[™ÊJKšZYÚ
JK[™^Š[‹˜\UÔÛX[[
J
šÚXÚÓ[X™\ŠJKš[™^
JK\ÚŠ[‹™œ›ÛR^
J
šÚXÚÓ›Û‘[\TÝš[™ÊJKš\Ú
JK›ÛÙŽŠY›X^JJ™YKKœ›ÛÙŠ__Y[˜Ý[ÛˆÙYJJ^Ü™]\›žÝÝ[ÛÝ[Š[‹˜\UÔÛX[[
J
šÚXÚÓ›Û‘[\TÝš[™ÊJKÝ[ØÛÝ[
JKÎŠšÚXÚÐ\œ˜^JJKÊK›X\
Ž
__Y[˜Ý[ÛˆYJJ^Û]J[‹™œ›ÛP˜\ÙM
J
šÚXÚÓ›Û‘[\TÝš[™ÊJK
JNÜ™]\›žÝ›‹\ÚŠ‹š\Ú
JŠK™\Ý[œ›
Kœ™\Ý[
KZYÚŠ[‹˜\UÔÛX[[
J
šÚXÚÓ›Û‘[\TÝš[™ÊJKšZYÚ
J__Y[˜Ý[ÛˆYYJJ^Ü™]\›žØ›ØÚÒZYÚŠ[‹˜\UÔÛX[[
J
šÚXÚÓ›Û‘[\TÝš[™ÊJK˜›ØÚ×ÚZYÚ
JK˜[Y]ÜœÎŠšÚXÚÐ\œ˜^JJK˜[Y]ÜœÊK›X\
ÊKÛÝ[Š[‹˜\UÔÛX[[
J
šÚXÚÓ›Û‘[\TÝš[™ÊJK˜ÛÝ[
JKÝ[Š[‹˜\UÔÛX[[
J
šÚXÚÓ›Û‘[\TÝš[™ÊJKÝ[
J__Y[˜Ý[Ûˆ
J^Ü™]\›žÚXY\Ž–Z

šÚXÚÓØš™XÝ
JKšXY\ŠJK\ÝÛÛ[Z]™K›\ÝØÛÛ[Z]˜›ØÚ×ÚYš\ÚÜSÊ
šÚXÚÓØš™XÝ
JK›\ÝØÛÛ[Z]
JN›[Î™K™]KÏÊšÚXÚÐ\œ˜^JJK™]KÊK›X\
[‹™œ›ÛP˜\ÙM
N–×K]šY[˜ÙN™K™]šY[˜ÙOË™]šY[˜ÙOÏÖ×__Y[˜Ý[ÛˆŽ
J^Ü™]\›žØ›ØÚÒY“
K˜›ØÚ×ÚY
K›ØÚÎ”
K˜›ØÚÊ__Y[˜Ý[ÛˆYJJ^Ü™]\›žÝÝ[ÛÝ[Š[‹˜\UÔÛX[[
J
šÚXÚÓ›Û‘[\TÝš[™ÊJKÝ[ØÛÝ[
JK›ØÚÜÎŠšÚXÚÐ\œ˜^JJK˜›ØÚÜÊK›X\
Ž
__Y[˜Ý[ÛˆYYJJ^Ü™]\›žÝÝ[Š[‹˜\UÔÛX[[
J
šÚXÚÓ›Û‘[\TÝš[™ÊJKÝ[
JKÝ[ž]\ÎŠ[‹˜\UÔÛX[[
J
šÚXÚÓ›Û‘[\TÝš[™ÊJKÝ[Øž]\ÊJ__]˜\ˆ“ÏXÛ\ÜÈ^ÜÝ]XÈXÛÙPX˜ÚR[™›ÊŠ^Ü™]\›ˆZŠ
šÚXÚÓØš™XÝ
J‹œ™\Ý[œ™\ÜÛœÙJJ_\Ý]XÈXÛÙPX˜ÚT]Y\žJŠ^Ü™]\›ˆšŠ
šÚXÚÓØš™XÝ
J‹œ™\Ý[œ™\ÜÛœÙJJ_\Ý]XÈXÛÙP›ØÚÊŠ^Ü™]\›ˆŽ
‹œ™\Ý[
_\Ý]XÈXÛÙP›ØÚÔ™\Ý[ÊŠ^Ü™]\›ˆÎ
‹œ™\Ý[
_\Ý]XÈXÛÙP›ØÚÔÙX\˜Ú
Š^Ü™]\›ˆYJ‹œ™\Ý[
_\Ý]XÈXÛÙP›ØÚØÚZ[ŠŠ^Ü™]\›ˆ™YJ‹œ™\Ý[
_\Ý]XÈXÛÙPœ›ØYØ\ÝÞ[˜ÊŠ^Ü™]\›ˆYYJ‹œ™\Ý[
_\Ý]XÈXÛÙPœ›ØYØ\Ý\Þ[˜ÊŠ^Ü™]\›ˆK™XÛÙPœ›ØYØ\ÝÞ[˜ÊŠ_\Ý]XÈXÛÙPœ›ØYØ\ÝÛÛ[Z]
Š^Ü™]\›ˆÙYJ‹œ™\Ý[
_\Ý]XÈXÛÙPÛÛ[Z]
Š^Ü™]\›ˆYJ‹œ™\Ý[
_\Ý]XÈXÛÙQÙ[™\Ú\ÊŠ^Ü™]\›ˆÙYJ
šÚXÚÓØš™XÝ
J‹œ™\Ý[™Ù[™\Ú\ÊJ_\Ý]XÈXÛÙRX[

^Ü™]\›ˆ[\Ý]XÈXÛÙS[U[˜ÛÛ™š\›YYÊŠ^Ü™]\›ˆYYJ‹œ™\Ý[
_\Ý]XÈXÛÙTÝ]\ÊŠ^Ü™]\›ˆYJ‹œ™\Ý[
_\Ý]XÈXÛÙS™]Ð›ØÚÑ]™[
Š^Ü™]\›ˆ
‹™]K˜[YK˜›ØÚÊ_\Ý]XÈXÛÙS™]Ð›ØÚÒXY\‘]™[
Š^Ü™]\›ˆZ
‹™]K˜[YKšXY\Š_\Ý]XÈXÛÙU]™[
Š^Ü™]\›ˆYJ‹™]K˜[YK•™\Ý[
_\Ý]XÈXÛÙU
Š^Ü™]\›ˆŽ
‹œ™\Ý[
_\Ý]XÈXÛÙUÙX\˜Ú
Š^Ü™]\›ˆÙYJ‹œ™\Ý[
_\Ý]XÈXÛÙU˜[Y]ÜœÊŠ^Ü™]\›ˆYYJ‹œ™\Ý[
__NÜÙ”™\ÜÛœÙ\ÏQ“ßJNÝ˜\ˆÎRJ[OžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\J[—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÚ[”™\ÜÛœÙ\ÏZ[”\˜[\Ï]›ÚYÝ˜\ˆ™YO\

NÓØš™XÝ™Yš[™T›Ü\J[”\˜[\È‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ™YK”\˜[\ß_JNÝ˜\ˆYYO]Ž

NÓØš™XÝ™Yš[™T›Ü\J[”™\ÜÛœÙ\È‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆYYK”™\ÜÛœÙ\ß_J_JNÝ˜\ˆRJOžÈ\ÙHÝšXÝŽÝ˜\ˆÙYOY	‰™—×ØÜ™X]Pš[™[™ß
Øš™XÝ˜Ü™X]OÊ[˜Ý[ÛŠK‹J^ÚOOO]›ÚY	‰ŠO]
NÝ˜\ˆSØš™XÝ™Ù]ÝÛ”›Ü\Q\ØÜš\ÜŠ‹
NÊ\Ÿ
™Ù]š[ˆÈ[‹—×Ù\Ó[Ù[Nœ‹Üš]X›_‹˜ÛÛ™šYÝ\˜X›JJI‰Š^Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ–Ý__JKØš™XÝ™Yš[™T›Ü\JKKŠ_JNŠ[˜Ý[ÛŠK‹J^ÚOOO]›ÚY	‰ŠO]
KVÚWO[–Ý_JJKÙYOY	‰™—×ÜÙ][Ù[QY˜][
Øš™XÝ˜Ü™X]OÊ[˜Ý[ÛŠKŠ^ÓØš™XÝ™Yš[™T›Ü\JK™Y˜][‹Ù[[Y\˜X›NˆL˜[YN›ŸJ_JN™[˜Ý[ÛŠKŠ^ÙK™Y˜][[ŸJKÙYOY	‰™—×Ú[\ÜÝ\Ÿ
[˜Ý[ÛŠ
^Ý˜\ˆOY[˜Ý[ÛŠŠ^Ü™]\›ˆOSØš™XÝ™Ù]ÝÛ”›Ü\S˜[Y\ß[˜Ý[ÛŠ
^Ý˜\ˆOV×NÙ›ÜŠ˜\ˆˆ[ˆ
SØš™XÝœ›ÝÝ\Kš\ÓÝÛ”›Ü\K˜Ø[
ŠI‰ŠVÚK›[™ÝO\ŠNÜ™]\›ˆ_KJŠ_NÜ™]\›ˆ[˜Ý[ÛŠŠ^ÚYŠ‰‰›‹—×Ù\Ó[Ù[J\™]\›ˆŽÝ˜\ˆ^ßNÚYŠˆO[[
Y›ÜŠ˜\ˆOYJŠKLÜK›[™ÝÜŠÊÊZVÜ—HOOH™Y˜][‰‰ÙYJ‹VÜ—JNÜ™]\›ˆÙYJŠK_JJ
NÓØš™XÝ™Yš[™T›Ü\J—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÙÛÛY]PÛY[]›ÚYÝ˜\ˆšRYÊ
KSÎ

KœZÙYJš

JKSÏXÛ\ÜÈ^ÜÝ]XÈ\Þ[˜ÈÛÛ›™XÝ
Š^Û]Ü™]\›ˆ\[ÙˆOH›Øš™XÝÝ[™]Èš’ÛY[
ŠN[‹œÝ\ÕÚ]
š‹ËÈŠ_‹œÝ\ÕÚ]
šÎ‹ËÈŠOÛ™]Èš’ÛY[
ŠN›™]Èš•ÙXœÛØÚÙ]ÛY[
ŠKK˜Ü™X]J
_\Ý]XÈÜ™X]JŠ^Ü™]\›ˆ™]ÈJŠ_XÛY[ØÛÛœÝXÝÜŠŠ^Ý\Ë˜ÛY[[ŸY\ØÛÛ›™XÝ

^Ý\Ë˜ÛY[™\ØÛÛ›™XÝ

_X\Þ[˜ÈX˜ÚR[™›Ê
^Û]^ÛY]Ù”œ‹“Y]ÙX˜ÚR[™›ßNÜ™]\›ˆ\Ë™ÐØ[
‹”\˜[\Ë™[˜ÛÙPX˜ÚR[™›Ë”™\ÜÛœÙ\Ë™XÛÙPX˜ÚR[™›Ê_X\Þ[˜ÈX˜ÚT]Y\žJŠ^Û]^Ü\˜[\Î›‹Y]Ù”œ‹“Y]ÙX˜ÚT]Y\ž_NÜ™]\›ˆ\Ë™ÐØ[
”\˜[\Ë™[˜ÛÙPX˜ÚT]Y\žK”™\ÜÛœÙ\Ë™XÛÙPX˜ÚT]Y\žJ_X\Þ[˜È›ØÚÊŠ^Û]^ÛY]Ù”œ‹“Y]Ù›ØÚË\˜[\ÎžÚZYÚ›Ÿ_NÜ™]\›ˆ\Ë™ÐØ[
”\˜[\Ë™[˜ÛÙP›ØÚË”™\ÜÛœÙ\Ë™XÛÙP›ØÚÊ_X\Þ[˜È›ØÚÔ™\Ý[ÊŠ^Û]^ÛY]Ù”œ‹“Y]Ù›ØÚÔ™\Ý[Ë\˜[\ÎžÚZYÚ›Ÿ_NÜ™]\›ˆ\Ë™ÐØ[
”\˜[\Ë™[˜ÛÙP›ØÚÔ™\Ý[Ë”™\ÜÛœÙ\Ë™XÛÙP›ØÚÔ™\Ý[Ê_X\Þ[˜È›ØÚÔÙX\˜Ú
Š^Û]^Ü\˜[\Î›‹Y]Ù”œ‹“Y]Ù›ØÚÔÙX\˜ÚKOX]ØZ]\Ë™ÐØ[
”\˜[\Ë™[˜ÛÙP›ØÚÔÙX\˜Ú”™\ÜÛœÙ\Ë™XÛÙP›ØÚÔÙX\˜Ú
NÜ™]\›žË‹‹šK›ØÚÜÎ–Ë‹‹šK˜›ØÚÜ×KœÛÜ

‹ÊOOœ‹˜›ØÚËšXY\‹šZYÚ[Ë˜›ØÚËšXY\‹šZYÚ
__X\Þ[˜È›ØÚÔÙX\˜Ú[
Š^Û][‹œYÙ_KOV×KHLNÙ›ÜŠÈ\ŽÊ^Û]ÏX]ØZ]\Ë˜›ØÚÔÙX\˜Ú
Ë‹‹›‹YÙNJNÚKœ\Ú
‹‹›Ë˜›ØÚÜÊKK›[™ÝËÝ[ÛÝ[Ý
ÊÎœHL\™]\›ˆKœÛÜ

ËJOO›Ë˜›ØÚËšXY\‹šZYÚXK˜›ØÚËšXY\‹šZYÚ
KÝÝ[ÛÝ[šK›[™Ý›ØÚÜÎš__X\Þ[˜È›ØÚØÚZ[Š‹
^Û]O^ÛY]Ù”œ‹“Y]Ù›ØÚØÚZ[‹\˜[\ÎžÛZ[’ZYÚ›‹X^ZYÚ_NÜ™]\›ˆ\Ë™ÐØ[
K”\˜[\Ë™[˜ÛÙP›ØÚØÚZ[‹”™\ÜÛœÙ\Ë™XÛÙP›ØÚØÚZ[Š_X\Þ[˜Èœ›ØYØ\ÝÞ[˜ÊŠ^Û]^Ü\˜[\Î›‹Y]Ù”œ‹“Y]Ùœ›ØYØ\ÝÞ[˜ßNÜ™]\›ˆ\Ë™ÐØ[
”\˜[\Ë™[˜ÛÙPœ›ØYØ\Ý”™\ÜÛœÙ\Ë™XÛÙPœ›ØYØ\ÝÞ[˜Ê_X\Þ[˜Èœ›ØYØ\Ý\Þ[˜ÊŠ^Û]^Ü\˜[\Î›‹Y]Ù”œ‹“Y]Ùœ›ØYØ\Ý\Þ[˜ßNÜ™]\›ˆ\Ë™ÐØ[
”\˜[\Ë™[˜ÛÙPœ›ØYØ\Ý”™\ÜÛœÙ\Ë™XÛÙPœ›ØYØ\Ý\Þ[˜Ê_X\Þ[˜Èœ›ØYØ\ÝÛÛ[Z]
Š^Û]^Ü\˜[\Î›‹Y]Ù”œ‹“Y]Ùœ›ØYØ\ÝÛÛ[Z]NÜ™]\›ˆ\Ë™ÐØ[
”\˜[\Ë™[˜ÛÙPœ›ØYØ\Ý”™\ÜÛœÙ\Ë™XÛÙPœ›ØYØ\ÝÛÛ[Z]
_X\Þ[˜ÈÛÛ[Z]
Š^Û]^ÛY]Ù”œ‹“Y]ÙÛÛ[Z]\˜[\ÎžÚZYÚ›Ÿ_NÜ™]\›ˆ\Ë™ÐØ[
”\˜[\Ë™[˜ÛÙPÛÛ[Z]”™\ÜÛœÙ\Ë™XÛÙPÛÛ[Z]
_X\Þ[˜ÈÙ[™\Ú\Ê
^Û]^ÛY]Ù”œ‹“Y]Ù‘Ù[™\Ú\ßNÜ™]\›ˆ\Ë™ÐØ[
‹”\˜[\Ë™[˜ÛÙQÙ[™\Ú\Ë”™\ÜÛœÙ\Ë™XÛÙQÙ[™\Ú\Ê_X\Þ[˜ÈX[

^Û]^ÛY]Ù”œ‹“Y]Ù’X[NÜ™]\›ˆ\Ë™ÐØ[
‹”\˜[\Ë™[˜ÛÙRX[”™\ÜÛœÙ\Ë™XÛÙRX[
_X\Þ[˜È[U[˜ÛÛ™š\›YYÊ
^Û]^ÛY]Ù”œ‹“Y]Ù“[U[˜ÛÛ™š\›YYßNÜ™]\›ˆ\Ë™ÐØ[
‹”\˜[\Ë™[˜ÛÙS[U[˜ÛÛ™š\›YYË”™\ÜÛœÙ\Ë™XÛÙS[U[˜ÛÛ™š\›YYÊ_X\Þ[˜ÈÝ]\Ê
^Û]^ÛY]Ù”œ‹“Y]Ù”Ý]\ßNÜ™]\›ˆ\Ë™ÐØ[
‹”\˜[\Ë™[˜ÛÙTÝ]\Ë”™\ÜÛœÙ\Ë™XÛÙTÝ]\Ê_\ÝXœØÜšX™S™]Ð›ØÚÊ
^Û]^ÛY]Ù”œ‹“Y]Ù”ÝXœØÜšX™K]Y\žNžÝ\N”œ‹”ÝXœØÜš\[Û‘]™[\K“™]Ð›ØÚß_NÜ™]\›ˆ\ËœÝXœØÜšX™J‹”™\ÜÛœÙ\Ë™XÛÙS™]Ð›ØÚÑ]™[
_\ÝXœØÜšX™S™]Ð›ØÚÒXY\Š
^Û]^ÛY]Ù”œ‹“Y]Ù”ÝXœØÜšX™K]Y\žNžÝ\N”œ‹”ÝXœØÜš\[Û‘]™[\K“™]Ð›ØÚÒXY\Ÿ_NÜ™]\›ˆ\ËœÝXœØÜšX™J‹”™\ÜÛœÙ\Ë™XÛÙS™]Ð›ØÚÒXY\‘]™[
_\ÝXœØÜšX™U
Š^Û]^ÛY]Ù”œ‹“Y]Ù”ÝXœØÜšX™K]Y\žNžÝ\N”œ‹”ÝXœØÜš\[Û‘]™[\K•˜]Î›Ÿ_NÜ™]\›ˆ\ËœÝXœØÜšX™J”™\ÜÛœÙ\Ë™XÛÙU]™[
_X\Þ[˜È
Š^Û]^Ü\˜[\Î›‹Y]Ù”œ‹“Y]Ù•NÜ™]\›ˆ\Ë™ÐØ[
”\˜[\Ë™[˜ÛÙU”™\ÜÛœÙ\Ë™XÛÙU
_X\Þ[˜ÈÙX\˜Ú
Š^Û]^Ü\˜[\Î›‹Y]Ù”œ‹“Y]Ù•ÙX\˜ÚNÜ™]\›ˆ\Ë™ÐØ[
”\˜[\Ë™[˜ÛÙUÙX\˜Ú”™\ÜÛœÙ\Ë™XÛÙUÙX\˜Ú
_X\Þ[˜ÈÙX\˜Ú[
Š^Û][‹œYÙ_KOV×KHLNÙ›ÜŠÈ\ŽÊ^Û]ÏX]ØZ]\ËÙX\˜Ú
Ë‹‹›‹YÙNJNÚKœ\Ú
‹‹›ËÊKK›[™ÝËÝ[ÛÝ[Ý
ÊÎœHL\™]\›žÝÝ[ÛÝ[šK›[™ÝÎš__X\Þ[˜È˜[Y]ÜœÊŠ^Û]^ÛY]Ù”œ‹“Y]Ù•˜[Y]ÜœË\˜[\Î›ŸNÜ™]\›ˆ\Ë™ÐØ[
”\˜[\Ë™[˜ÛÙU˜[Y]ÜœË”™\ÜÛœÙ\Ë™XÛÙU˜[Y]ÜœÊ_X\Þ[˜È˜[Y]ÜœÐ[
Š^Û]V×KOLKHLKÏ[ŽÙ›ÜŠÈ\ŽÊ^Û]OX]ØZ]\Ë˜[Y]ÜœÊÜ\—ÜYÙNLZYÚ›ËYÙNš_JNÝœ\Ú
‹‹˜K˜[Y]ÜœÊKÏ[ßK˜›ØÚÒZYÚ›[™ÝKÝ[ÚJÊÎœHL\™]\›žØ›ØÚÒZYÚ›ÏÏÌÛÝ[›[™ÝÝ[›[™Ý˜[Y]ÜœÎ_X\Þ[˜ÈÐØ[
‹J^Û]]
ŠKÏX]ØZ]\Ë˜ÛY[™^XÝ]JŠNÜ™]\›ˆJÊ_\ÝXœØÜšX™J‹
^ÚYŠJšš[œÝ[˜ÙSÙ”œÔÝ™X[Z[™ÐÛY[
J\Ë˜ÛY[
J]›ÝÈ™]È\œ›ÜŠ•\È”ÈÛY[\HØ[››ÝÝXœØÜšX™HÈ]™[ÈŠNÛ]O\”\˜[\Ë™[˜ÛÙTÝXœØÜšX™JŠNÜ™]\›ˆ\Ë˜ÛY[›\Ý[ŠJK›X\
ÏO
ÊJ__NÙÛÛY]PÛY[SSßJNÝ˜\ˆRJÛOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\JÛ—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÛÛ•›ÝU\O]›ÚYÛÛ˜œ›ØYØ\ÝÞ[˜ÔÝXØÙ\ÜÏQYYNÛÛ˜œ›ØYØ\ÝÛÛ[Z]ÝXØÙ\ÜÏTYYNÙ[˜Ý[ÛˆYYJJ^Ü™]\›ˆK˜ÛÙOOOLY[˜Ý[ÛˆYYJJ^Ü™]\›ˆK˜ÚXÚÕ˜ÛÙOOOL	‰ˆHYK™[]™\•	‰™K™[]™\•˜ÛÙOOOL]˜\ˆNÊ[˜Ý[ÛŠJ^ÙVÙK”™U›ÝOLWOH”™U›ÝH‹VÙK”™PÛÛ[Z]L—OH”™PÛÛ[Z]ŸJJN
Û•›ÝU\OUN^ßJJ_JNÝ˜\ˆšRJ›ÏOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\J›Ë—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÕ›Ë•›ÝU\OU›Ë˜œ›ØYØ\ÝÞ[˜ÔÝXØÙ\ÜÏU›Ë˜œ›ØYØ\ÝÛÛ[Z]ÝXØÙ\ÜÏU›Ë”ÝXœØÜš\[Û‘]™[\OU›Ë“Y]ÙU›ËÛÛY]PÛY[]›ÚYÝ˜\ˆÙYOQ

NÓØš™XÝ™Yš[™T›Ü\J›ËÛÛY]PÛY[‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆÙYKÛÛY]PÛY[_JNÝ˜\ˆUš

NÓØš™XÝ™Yš[™T›Ü\J›Ë“Y]Ù‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ“Y]Ù_JNÓØš™XÝ™Yš[™T›Ü\J›Ë”ÝXœØÜš\[Û‘]™[\H‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ”ÝXœØÜš\[Û‘]™[\__JNÝ˜\ˆÓÏ^

NÓØš™XÝ™Yš[™T›Ü\J›Ë˜œ›ØYØ\ÝÛÛ[Z]ÝXØÙ\ÜÈ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆÓË˜œ›ØYØ\ÝÛÛ[Z]ÝXØÙ\Üß_JNÓØš™XÝ™Yš[™T›Ü\J›Ë˜œ›ØYØ\ÝÞ[˜ÔÝXØÙ\ÜÈ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆÓË˜œ›ØYØ\ÝÞ[˜ÔÝXØÙ\Üß_JNÓØš™XÝ™Yš[™T›Ü\J›Ë•›ÝU\H‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆÓË•›ÝU\__J_JNÝ˜\ˆRJÙOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\JÙ—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNØÙ›X^OT™YNØÙ™XÝ[Û˜\žUÔÝš[™ÓX\TYNØÙ™[˜ÛÙTÝš[™ÏS™YNØÙ™[˜ÛÙU]˜\š[X[ØÙ™[˜ÛÙU[YO]™YNØÙ™[˜ÛÙPž]\ÏSÙYNØÙ™[˜ÛÙU™\œÚ[ÛQYNØÙ™[˜ÛÙP›ØÚÒYUYYNÝ˜\ˆ™YOR›Š
NÙ[˜Ý[Ûˆ™YJKŠ^Ü™]\›ˆO[[Ý›ÚY™JŠ_Y[˜Ý[ÛˆYJJ^Û][™]ÈX\Ù›ÜŠ]ÙˆØš™XÝšÙ^\ÊJJ^Û]OYVÝNÚYŠ\[ÙˆHOHœÝš[™ÈŠ]›ÝÈ™]È\œ›ÜŠ‘›Ý[™XÝ[Û˜\žH˜[YHÙˆ\HÝ\ˆ[ˆÝš[™ÈŠNÛ‹œÙ]
J_\™]\›ˆŸY[˜Ý[Ûˆ™YJJ^Û]J™YKÕ]Ž
JJNÜ™]\›ˆZ[\œ˜^K™œ›ÛJÛ‹›[™Ý‹‹›—J_Y[˜Ý[Ûˆ[
J^Ü™]\›ˆOLLŽÕZ[\œ˜^K™œ›ÛJÙIŒM_LŽ‹‹˜[
OÊWJN•Z[\œ˜^K™œ›ÛJÙIŒMWJ_Y[˜Ý[Ûˆ™YJJ^Û]YK™Ù][YJ
KSX]™›ÛÜŠ‹ÌYLÊKO]ÖÎ‹‹˜[

WN›™]ÈZ[\œ˜^KJK›˜[›ÜÙXÛÛ™ß
JÛ‰LYLÊŒYM‹Ï\ÖÌM‹‹‹˜[
ŠWN›™]ÈZ[\œ˜^NÜ™]\›ˆZ[\œ˜^K™œ›ÛJË‹‹šK‹‹›×J_Y[˜Ý[ÛˆÙYJJ^ÚYŠK›[™ÝLLŽ
]›ÝÈ™]È\œ›ÜŠ“›Ý[\[Y[Y›Üˆž]H\œ˜^\ÈÙˆ[™ÝLŽÜˆ[Ü™HŠNÜ™]\›ˆK›[™ÝÕZ[\œ˜^K™œ›ÛJÙK›[™Ý‹‹™WJN›™]ÈZ[\œ˜^_Y[˜Ý[ÛˆYJJ^Û]YK˜›ØÚÏÕZ[\œ˜^K™œ›ÛJÎ‹‹˜[
K˜›ØÚÊWJN›™]ÈZ[\œ˜^KYK˜\ÕZ[\œ˜^K™œ›ÛJÌM‹‹‹˜[
K˜\
WJN›™]ÈZ[\œ˜^NÜ™]\›ˆZ[\œ˜^K™œ›ÛJË‹‹›‹‹‹J_Y[˜Ý[ÛˆYYJJ^Ü™]\›ˆZ[\œ˜^K™œ›ÛJÌLKš\Ú›[™Ý‹‹™Kš\ÚNKœ\Ëš\Ú›[™Ý
ÍKœ\ËÝ[NKœ\Ëš\Ú›[™Ý‹‹™Kœ\Ëš\ÚJ__JNÝ˜\ˆ	RJOOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\JK—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÛK”ÝXœØÜš\[Û‘]™[\O[K“Y]Ù]›ÚYÛK˜Z[]Y\žO^YNÝ˜\ˆŽÊ[˜Ý[ÛŠJ^ÙKX˜ÚR[™›ÏH˜X˜ÚWÚ[™›È‹KX˜ÚT]Y\žOH˜X˜ÚWÜ]Y\žH‹K›ØÚÏH˜›ØÚÈ‹K›ØÚØÚZ[H˜›ØÚØÚZ[ˆ‹K›ØÚÔ™\Ý[ÏH˜›ØÚ×Ü™\Ý[È‹K›ØÚÔÙX\˜ÚH˜›ØÚ×ÜÙX\˜Ú‹Kœ›ØYØ\Ý\Þ[˜ÏH˜œ›ØYØ\ÝÝØ\Þ[˜È‹Kœ›ØYØ\ÝÞ[˜ÏH˜œ›ØYØ\ÝÝÜÞ[˜È‹Kœ›ØYØ\ÝÛÛ[Z]H˜œ›ØYØ\ÝÝØÛÛ[Z]‹KÛÛ[Z]H˜ÛÛ[Z]‹K‘Ù[™\Ú\ÏH™Ù[™\Ú\È‹K’X[HšX[‹K“[U[˜ÛÛ™š\›YYÏH›[WÝ[˜ÛÛ™š\›YYÝÈ‹K”Ý]\ÏHœÝ]\È‹K”ÝXœØÜšX™OHœÝXœØÜšX™H‹K•H‹K•ÙX\˜ÚHÜÙX\˜Ú‹K•˜[Y]ÜœÏH˜[Y]ÜœÈ‹K•[œÝXœØÜšX™OH[œÝXœØÜšX™HŸJJŽ
K“Y]ÙRŽ^ßJJNÝ˜\ˆŽÊ[˜Ý[ÛŠJ^ÙK“™]Ð›ØÚÏH“™]Ð›ØÚÈ‹K“™]Ð›ØÚÒXY\H“™]Ð›ØÚÒXY\ˆ‹K•H•ŸJJŽ
K”ÝXœØÜš\[Û‘]™[\OQŽ^ßJJNÙ[˜Ý[ÛˆYJJ^Û]JKYÜÏÙKYÜÎ–×JK›X\
O˜	Ü‹šÙ^_OIÉÜ‹˜[Y_IØ
KOYKœ˜]ÏÖÙKœ˜]×N–×NÜ™]\›–Ë‹‹‹‹šWKš›Ú[ŠˆS‘Š__JNÝ˜\ˆNRJYOžÈ\ÙHÝšXÝŽÝ˜\ˆYO]Y	‰Y—×ØÜ™X]Pš[™[™ß
Øš™XÝ˜Ü™X]OÊ[˜Ý[ÛŠK‹J^ÚOOO]›ÚY	‰ŠO]
NÝ˜\ˆSØš™XÝ™Ù]ÝÛ”›Ü\Q\ØÜš\ÜŠ‹
NÊ\Ÿ
™Ù]š[ˆÈ[‹—×Ù\Ó[Ù[Nœ‹Üš]X›_‹˜ÛÛ™šYÝ\˜X›JJI‰Š^Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ–Ý__JKØš™XÝ™Yš[™T›Ü\JKKŠ_JNŠ[˜Ý[ÛŠK‹J^ÚOOO]›ÚY	‰ŠO]
KVÚWO[–Ý_JJK™YO]Y	‰Y—×ÜÙ][Ù[QY˜][
Øš™XÝ˜Ü™X]OÊ[˜Ý[ÛŠKŠ^ÓØš™XÝ™Yš[™T›Ü\JK™Y˜][‹Ù[[Y\˜X›NˆL˜[YN›ŸJ_JN™[˜Ý[ÛŠKŠ^ÙK™Y˜][[ŸJK™YO]Y	‰Y—×Ú[\ÜÝ\Ÿ
[˜Ý[ÛŠ
^Ý˜\ˆOY[˜Ý[ÛŠŠ^Ü™]\›ˆOSØš™XÝ™Ù]ÝÛ”›Ü\S˜[Y\ß[˜Ý[ÛŠ
^Ý˜\ˆOV×NÙ›ÜŠ˜\ˆˆ[ˆ
SØš™XÝœ›ÝÝ\Kš\ÓÝÛ”›Ü\K˜Ø[
ŠI‰ŠVÚK›[™ÝO\ŠNÜ™]\›ˆ_KJŠ_NÜ™]\›ˆ[˜Ý[ÛŠŠ^ÚYŠ‰‰›‹—×Ù\Ó[Ù[J\™]\›ˆŽÝ˜\ˆ^ßNÚYŠˆO[[
Y›ÜŠ˜\ˆOYJŠKLÜK›[™ÝÜŠÊÊZVÜ—HOOH™Y˜][‰‰•YJ‹VÜ—JNÜ™]\›ˆ™YJŠK_JJ
NÓØš™XÝ™Yš[™T›Ü\JY—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÝY”\˜[\Ï]›ÚYÝ˜\ˆÓÏR›Š
KÜÏ]]J
KYYO[›

K[ÏWÚ

K\ÏV

KYOQ™YJ	

JNÙ[˜Ý[ÛˆÓÊJ^Ü™]\›žÚZYÚŠ\Ë›X^JJÜËœÛX[[Ð\KKšZYÚ
__Y[˜Ý[ÛˆYYJJ^Ü™]\›žÛZ[’ZYÚŠ\Ë›X^JJÜËœÛX[[Ð\KK›Z[’ZYÚ
KX^ZYÚŠ\Ë›X^JJÜËœÛX[[Ð\KK›X^ZYÚ
__Y[˜Ý[ÛˆÙYJJ^Ü™]\›žÜ]Y\žN™Kœ]Y\žKYÙNŠ\Ë›X^JJÜËœÛX[[Ð\KKœYÙJK\—ÜYÙNŠ\Ë›X^JJÜËœÛX[[Ð\KKœ\—ÜYÙJKÜ™\—ØžN™K›Ü™\—Øž__Y[˜Ý[ÛˆÙYJJ^Ü™]\›žÜ]ŠYYKšÚXÚÓ›Û‘[\TÝš[™ÊJKœ]
K]NŠÓËÒ^
JK™]JKZYÚŠ\Ë›X^JJÜËœÛX[[Ð\KKšZYÚ
K›Ý™N™Kœ›Ý™__Y[˜Ý[Ûˆ™YJJ^Ü™]\›žÝŠÓËÐ˜\ÙM
JK
__Y[˜Ý[ÛˆÙYJJ^Ü™]\›žÚ\ÚŠÓËÐ˜\ÙM
JKš\Ú
K›Ý™N™Kœ›Ý™__Y[˜Ý[ÛˆÙYJJ^Ü™]\›žÜ]Y\žN™Kœ]Y\žK›Ý™N™Kœ›Ý™KYÙNŠ\Ë›X^JJÜËœÛX[[Ð\KKœYÙJK\—ÜYÙNŠ\Ë›X^JJÜËœÛX[[Ð\KKœ\—ÜYÙJKÜ™\—ØžN™K›Ü™\—Øž__Y[˜Ý[ÛˆYJJ^Ü™]\›žÚZYÚŠ\Ë›X^JJÜËœÛX[[Ð\KKšZYÚ
KYÙNŠ\Ë›X^JJÜËœÛX[[Ð\KKœYÙJK\—ÜYÙNŠ\Ë›X^JJÜËœÛX[[Ð\KKœ\—ÜYÙJ__]˜\ˆ“ÏXÛ\ÜÞÜÝ]XÈ[˜ÛÙPX˜ÚR[™›ÊŠ^Ü™]\›Š[Ë˜Ü™X]RœÛÛ”œÔ™\]Y\Ý
J‹›Y]Ù
_\Ý]XÈ[˜ÛÙPX˜ÚT]Y\žJŠ^Ü™]\›Š[Ë˜Ü™X]RœÛÛ”œÔ™\]Y\Ý
J‹›Y]ÙÙYJ‹œ\˜[\ÊJ_\Ý]XÈ[˜ÛÙP›ØÚÊŠ^Ü™]\›Š[Ë˜Ü™X]RœÛÛ”œÔ™\]Y\Ý
J‹›Y]ÙÓÊ‹œ\˜[\ÊJ_\Ý]XÈ[˜ÛÙP›ØÚØÚZ[ŠŠ^Ü™]\›Š[Ë˜Ü™X]RœÛÛ”œÔ™\]Y\Ý
J‹›Y]ÙYYJ‹œ\˜[\ÊJ_\Ý]XÈ[˜ÛÙP›ØÚÔ™\Ý[ÊŠ^Ü™]\›Š[Ë˜Ü™X]RœÛÛ”œÔ™\]Y\Ý
J‹›Y]ÙÓÊ‹œ\˜[\ÊJ_\Ý]XÈ[˜ÛÙP›ØÚÔÙX\˜Ú
Š^Ü™]\›Š[Ë˜Ü™X]RœÛÛ”œÔ™\]Y\Ý
J‹›Y]ÙÙYJ‹œ\˜[\ÊJ_\Ý]XÈ[˜ÛÙPœ›ØYØ\Ý
Š^Ü™]\›Š[Ë˜Ü™X]RœÛÛ”œÔ™\]Y\Ý
J‹›Y]Ù™YJ‹œ\˜[\ÊJ_\Ý]XÈ[˜ÛÙPÛÛ[Z]
Š^Ü™]\›Š[Ë˜Ü™X]RœÛÛ”œÔ™\]Y\Ý
J‹›Y]ÙÓÊ‹œ\˜[\ÊJ_\Ý]XÈ[˜ÛÙQÙ[™\Ú\ÊŠ^Ü™]\›Š[Ë˜Ü™X]RœÛÛ”œÔ™\]Y\Ý
J‹›Y]Ù
_\Ý]XÈ[˜ÛÙRX[
Š^Ü™]\›Š[Ë˜Ü™X]RœÛÛ”œÔ™\]Y\Ý
J‹›Y]Ù
_\Ý]XÈ[˜ÛÙS[U[˜ÛÛ™š\›YYÊŠ^Ü™]\›Š[Ë˜Ü™X]RœÛÛ”œÔ™\]Y\Ý
J‹›Y]Ù
_\Ý]XÈ[˜ÛÙTÝ]\ÊŠ^Ü™]\›Š[Ë˜Ü™X]RœÛÛ”œÔ™\]Y\Ý
J‹›Y]Ù
_\Ý]XÈ[˜ÛÙTÝXœØÜšX™JŠ^Û]^ÚÙ^NˆK™]™[‹˜[YN›‹œ]Y\žK\_KORYK˜Z[]Y\žJÝYÜÎ–ÝK˜]Î›‹œ]Y\žKœ˜]ßJNÜ™]\›Š[Ë˜Ü™X]RœÛÛ”œÔ™\]Y\Ý
JœÝXœØÜšX™H‹Ü]Y\žNš_J_\Ý]XÈ[˜ÛÙU
Š^Ü™]\›Š[Ë˜Ü™X]RœÛÛ”œÔ™\]Y\Ý
J‹›Y]ÙÙYJ‹œ\˜[\ÊJ_\Ý]XÈ[˜ÛÙUÙX\˜Ú
Š^Ü™]\›Š[Ë˜Ü™X]RœÛÛ”œÔ™\]Y\Ý
J‹›Y]ÙÙYJ‹œ\˜[\ÊJ_\Ý]XÈ[˜ÛÙU˜[Y]ÜœÊŠ^Ü™]\›Š[Ë˜Ü™X]RœÛÛ”œÔ™\]Y\Ý
J‹›Y]ÙYJ‹œ\˜[\ÊJ__NÝY”\˜[\ÏU“ßJNÝ˜\ˆRJšOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\Jš—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÚšš\ÚVYYNÚšš\Ú›ØÚÏIYNÝ˜\ˆÏUšJ
KÛÏV

NÙ[˜Ý[ÛˆYYJJ^Ü™]\›ŠËœÚLMŠJJ_Y[˜Ý[Ûˆ™YJJ^ÚYŠOJ]›ÝÈ™]È\œ›ÜŠØ[››ÝÜ][ˆ[\H™YHŠNÛ]LŠŠ“X]™›ÛÜŠX]›ÙÌŠJJNÜ™]\›ˆOÛŽ›‹ÌŸY[˜Ý[Ûˆ™YJJ^Û][™]ÈË”ÚLMŠZ[\œ˜^K™œ›ÛJÌJJNÜ™]\›ˆ‹\]JJK‹™YÙ\Ý

_Y[˜Ý[ÛˆYJKŠ^Û][™]ÈË”ÚLMŠZ[\œ˜^K™œ›ÛJÌWJJNÜ™]\›ˆ\]JJK\]JŠK™YÙ\Ý

_Y[˜Ý[ÛˆÓÊJ^ÜÝÚ]Ú
K›[™Ý
^ØØ\ÙH›ÝÈ™]È\œ›ÜŠØ[››Ý\Ú[\H™YHŠNØØ\ÙHNœ™]\›ˆ™YJVÌJNÙY˜][žÛ]^™YJK›[™Ý
KUÓÊKœÛXÙJŠJKOUÓÊKœÛXÙJŠJNÜ™]\›ˆYJJ___Y[˜Ý[Ûˆ	YJJ^ÚYŠYK›\Ý›ØÚÒY
]›ÝÈ™]È\œ›ÜŠ’\Ú[™ÈH›ØÚÈXY\ˆÚ]›È\Ý›ØÚÈQ
K™KˆXY\ˆ]ZYÚJH\È›ÝÝ\ÜYˆYˆ[ÝH™YY\ËÛÛšX][ÛœÈ\™HÙ[ÛÛYKˆX\ÙHYØÝ[Y[][Ûˆ[™\Ý™XÝÜœÈ›Üˆ\ÈØ\ÙKˆŠNÛ]VÊÛË™[˜ÛÙU™\œÚ[ÛŠJK™\œÚ[ÛŠK
ÛË™[˜ÛÙTÝš[™ÊJK˜ÚZ[’Y
K
ÛË™[˜ÛÙU]˜\š[
JKšZYÚ
K
ÛË™[˜ÛÙU[YJJK[YJK
ÛË™[˜ÛÙP›ØÚÒY
JK›\Ý›ØÚÒY
K
ÛË™[˜ÛÙPž]\ÊJK›\ÝÛÛ[Z]\Ú
K
ÛË™[˜ÛÙPž]\ÊJK™]R\Ú
K
ÛË™[˜ÛÙPž]\ÊJK˜[Y]ÜœÒ\Ú
K
ÛË™[˜ÛÙPž]\ÊJK›™^˜[Y]ÜœÒ\Ú
K
ÛË™[˜ÛÙPž]\ÊJK˜ÛÛœÙ[œÝ\Ò\Ú
K
ÛË™[˜ÛÙPž]\ÊJK˜\\Ú
K
ÛË™[˜ÛÙPž]\ÊJK›\Ý™\Ý[Ò\Ú
K
ÛË™[˜ÛÙPž]\ÊJK™]šY[˜ÙR\Ú
K
ÛË™[˜ÛÙPž]\ÊJKœ›ÜÜÙ\Y™\ÜÊWNÜ™]\›ˆÓÊŠ__JNÝ˜\ˆŽRJ™OžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\J™—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÒ™”™\ÜÛœÙ\Ï]›ÚYÒ™™XÛÙQ]™[WÎÒ™™XÛÙU˜[Y]Ü•\]ORÎÒ™™XÛÙPÛÛ[Z]V“ÎÒ™™XÛÙU˜[Y]Ü‘Ù[™\Ú\ÏUÎÒ™™XÛÙU˜[Y]Ü’[™›ÏVÎÝ˜\ˆ[R›Š
KNU\Š
KÙÏ^YÊ
K]]J
K	[›

K™YOP™Ê
KYV

K[™OR

NÙ[˜Ý[Ûˆ›™JJ^Ü™]\›žÙ]N™K™]K\Ý›ØÚÒZYÚŠY›X^JJ‹˜\UÔÛX[[K›\ÝØ›ØÚ×ÚZYÚ
K\Ý›ØÚÐ\\ÚŠY›X^JJ[‹™œ›ÛP˜\ÙMK›\ÝØ›ØÚ×Ø\Ú\Ú
__Y[˜Ý[Ûˆ™JJ^Ü™]\›žÛÜÎ™K›ÜË›X\
OŠÝ\N›‹\KÙ^NŠ[‹™œ›ÛP˜\ÙM
J‹šÙ^JK]NŠ[‹™œ›ÛP˜\ÙM
J‹™]J_JJ__Y[˜Ý[Ûˆ›™JJ^Ü™]\›žÚÙ^NŠ[‹™œ›ÛP˜\ÙM
J
	šÚXÚÔÝš[™ÊJKšÙ^OÏÈˆŠJK˜[YNŠ[‹™œ›ÛP˜\ÙM
J
	šÚXÚÔÝš[™ÊJK˜[YOÏÈˆŠJK›ÛÙŽŠY›X^JJ™KKœ›ÛÙ“ÜÊKZYÚŠY›X^JJ‹˜\UÔÛX[[KšZYÚ
KÛÙNŠY›X^JJ‹˜\UÔÛX[[K˜ÛÙJKÛÙ\ÜXÙNŠ	šÚXÚÔÝš[™ÊJK˜ÛÙ\ÜXÙOÏÈˆŠK[™^ŠY›X^JJ‹˜\UÔÛX[[Kš[™^
KÙÎ™K›ÙË[™›ÎŠ	šÚXÚÔÝš[™ÊJKš[™›ÏÏÈˆŠ__Y[˜Ý[Ûˆ[™JJ^Ü™]\›žÚÙ^NŠ	šÚXÚÓ›Û‘[\TÝš[™ÊJKšÙ^JK˜[YN™K˜[YOÏÈˆŸ_Y[˜Ý[ÛˆÛ™JJ^Ü™]\›Š	šÚXÚÐ\œ˜^JJJK›X\
[™J_Y[˜Ý[ÛˆÎ
J^Ü™]\›žÝ\N™K\K]šX]\Î™K˜]šX]\ÏÛÛ™JK˜]šX]\ÊN–×__Y[˜Ý[ÛˆÎ
J^Ü™]\›Š	šÚXÚÐ\œ˜^JJJK›X\
Î
_Y[˜Ý[ÛˆÛ
J^Ü™]\›žØÛÙNŠ‹˜\UÔÛX[[
J
	šÚXÚÓ[X™\ŠJK˜ÛÙOÏÌ
JKÛÙ\ÜXÙN™K˜ÛÙ\ÜXÙKÙÎ™K›ÙË]NŠY›X^JJ[‹™œ›ÛP˜\ÙMK™]JK]™[Î™K™]™[ÏÑÎ
K™]™[ÊN–×KØ\ÕØ[YŠ‹˜\UÐšYÒ[
JK™Ø\×ÝØ[YÏÈŒŠKØ\Õ\ÙYŠ‹˜\UÐšYÒ[
JK™Ø\×Ý\ÙYÏÈŒŠ__Y[˜Ý[Ûˆ“ÊJ^ÚYŠ”Ý[Hš[ˆJ^Û]ÖÛ‹WOSØš™XÝ™[šY\ÊK”Ý[K˜[YJNÜ™]\›ŠN˜\ÜÙ\
JOOH™YMLNHŸOOHœÙXÜMšÌH‹[šÛ›ÝÛˆXšÙ^H\Nˆ	ÛŸX
KØ[ÛÜš]N›‹]NŠ[‹™œ›ÛP˜\ÙM
J
	šÚXÚÓ›Û‘[\TÝš[™ÊJ
J__Y[ÙHÝÚ]Ú
K\J^ØØ\ÙH[™\›Z[ÔX’Ù^QYMLNHŽœ™]\›žØ[ÛÜš]Nˆ™YMLNH‹]NŠ[‹™œ›ÛP˜\ÙM
J
	šÚXÚÓ›Û‘[\TÝš[™ÊJK˜[YJJ_NØØ\ÙH[™\›Z[ÔX’Ù^TÙXÜMšÌHŽœ™]\›žØ[ÛÜš]NˆœÙXÜMšÌH‹]NŠ[‹™œ›ÛP˜\ÙM
J
	šÚXÚÓ›Û‘[\TÝš[™ÊJK˜[YJJ_NÙY˜][›ÝÈ™]È\œ›ÜŠ[šÛ›ÝÛˆXšÙ^H\Nˆ	ÙK\_X
__Y[˜Ý[Ûˆ[™JJ^Ü™]\›žÛX^ž]\ÎŠ‹˜\UÔÛX[[
J
	šÚXÚÓ›Û‘[\TÝš[™ÊJK›X^Øž]\ÊJKX^Ø\ÎŠ‹˜\UÔÛX[[
J
	šÚXÚÓ›Û‘[\TÝš[™ÊJK›X^ÙØ\ÊJ__Y[˜Ý[ÛˆÛ™JJ^Ü™]\›žÛX^YÙS[P›ØÚÜÎŠ‹˜\UÔÛX[[
J
	šÚXÚÓ›Û‘[\TÝš[™ÊJK›X^ØYÙWÛ[WØ›ØÚÜÊJKX^YÙQ\˜][ÛŽŠ‹˜\UÔÛX[[
J
	šÚXÚÓ›Û‘[\TÝš[™ÊJK›X^ØYÙWÙ\˜][ÛŠJ__Y[˜Ý[ÛˆŽ
J^Ü™]\›žØ›ØÚÎ™K˜›ØÚÏØ[™J
	šÚXÚÓØš™XÝ
JK˜›ØÚÊJN›ÚY]šY[˜ÙN™K™]šY[˜ÙOÜÛ™J
	šÚXÚÓØš™XÝ
JK™]šY[˜ÙJJN›ÚY_Y[˜Ý[ÛˆÎ
J^Ü™]\›žÜXšÙ^Nž“Ê
	šÚXÚÓØš™XÝ
JKœX—ÚÙ^JJK›Ý[™ÔÝÙ\ŽŠ‹˜\UÐšYÒ[
JKœÝÙ\ÏÈŒŠ__Y[˜Ý[Ûˆ™JJ^Ü™]\›žÚZYÚŠ‹˜\UÔÛX[[
J
	šÚXÚÓ›Û‘[\TÝš[™ÊJKšZYÚ
JK™\Ý[ÎŠK×Ü™\Ý[ß×JK›X\
Û
K˜[Y]Ü•\]\ÎŠK˜[Y]Ü—Ý\]\ß×JK›X\
Î
KÛÛœÙ[œÝ\Õ\]\ÎŠY›X^JJŽK˜ÛÛœÙ[œÝ\×Ü\˜[WÝ\]\ÊKš[˜[^™P›ØÚÑ]™[Î‘Î
K™š[˜[^™WØ›ØÚ×Ù]™[ß×J__Y[˜Ý[Ûˆ^JJ^Ü™]\›žÚ\ÚŠ[‹™œ›ÛR^
J
	šÚXÚÓ›Û‘[\TÝš[™ÊJKš\Ú
JK\ÎžÝÝ[Š	šÚXÚÓ›Û–™\›Ó[X™\ŠJKœ\ËÝ[
K\ÚŠ[‹™œ›ÛR^
J
	šÚXÚÓ›Û‘[\TÝš[™ÊJKœ\Ëš\Ú
J___Y[˜Ý[ÛˆÛ™JJ^Ü™]\›žØ›ØÚÎŠ‹˜\UÔÛX[[
JK˜›ØÚÊK\Š‹˜\UÔÛX[[
JK˜\ÏÌ
__Y[˜Ý[ÛˆžJJ^Ü™]\›žÝ™\œÚ[ÛŽ˜Û™JK™\œÚ[ÛŠKÚZ[’YŠ	šÚXÚÓ›Û‘[\TÝš[™ÊJK˜ÚZ[—ÚY
KZYÚŠ‹˜\UÔÛX[[
J
	šÚXÚÓ›Û‘[\TÝš[™ÊJKšZYÚ
JK[YNŠÙË™œ›ÛT™˜ÌÌÌÎUÚ]˜[›ÜÙXÛÛ™ÊJ
	šÚXÚÓ›Û‘[\TÝš[™ÊJK[YJJK\Ý›ØÚÒY™K›\ÝØ›ØÚ×ÚYš\ÚÙ^JK›\ÝØ›ØÚ×ÚY
N›[\ÝÛÛ[Z]\ÚŠ[‹™œ›ÛR^
J
	šÚXÚÔÙ]
JK›\ÝØÛÛ[Z]Ú\Ú
JK]R\ÚŠ[‹™œ›ÛR^
J
	šÚXÚÔÙ]
JK™]WÚ\Ú
JK˜[Y]ÜœÒ\ÚŠ[‹™œ›ÛR^
J
	šÚXÚÔÙ]
JK˜[Y]Üœ×Ú\Ú
JK™^˜[Y]ÜœÒ\ÚŠ[‹™œ›ÛR^
J
	šÚXÚÔÙ]
JK›™^Ý˜[Y]Üœ×Ú\Ú
JKÛÛœÙ[œÝ\Ò\ÚŠ[‹™œ›ÛR^
J
	šÚXÚÔÙ]
JK˜ÛÛœÙ[œÝ\×Ú\Ú
JK\\ÚŠ[‹™œ›ÛR^
J
	šÚXÚÔÙ]
JK˜\Ú\Ú
JK\Ý™\Ý[Ò\ÚŠ[‹™œ›ÛR^
J
	šÚXÚÔÙ]
JK›\ÝÜ™\Ý[×Ú\Ú
JK]šY[˜ÙR\ÚŠ[‹™œ›ÛR^
J
	šÚXÚÔÙ]
JK™]šY[˜ÙWÚ\Ú
JK›ÜÜÙ\Y™\ÜÎŠ[‹™œ›ÛR^
J
	šÚXÚÓ›Û‘[\TÝš[™ÊJKœ›ÜÜÙ\—ØY™\ÜÊJ__Y[˜Ý[Ûˆ[™JJ^Ü™]\›žØ›ØÚÒY™^JK˜›ØÚ×ÚY
K›ØÚÔÚ^™NŠ‹˜\UÔÛX[[
J
	šÚXÚÓ›Û‘[\TÝš[™ÊJK˜›ØÚ×ÜÚ^™JJKXY\Ž›žJKšXY\ŠK[UÎŠ‹˜\UÔÛX[[
J
	šÚXÚÓ›Û‘[\TÝš[™ÊJK›[WÝÊJ__Y[˜Ý[Ûˆ[™JJ^Ü™]\›žÛ\ÝZYÚŠ‹˜\UÔÛX[[
J
	šÚXÚÓ›Û‘[\TÝš[™ÊJK›\ÝÚZYÚ
JK›ØÚÓY]\ÎŠ	šÚXÚÐ\œ˜^JJK˜›ØÚ×ÛY]\ÊK›X\
[™J__Y[˜Ý[Ûˆ™JJ^Ü™]\›žË‹‹œÛ
JK\ÚŠ[‹™œ›ÛR^
J
	šÚXÚÓ›Û‘[\TÝš[™ÊJKš\Ú
J__Y[˜Ý[Ûˆ›™JJ^Û]YKÜ™\Ý[ÜÛ
KÜ™\Ý[
N›ÚYÜ™]\›žÚZYÚŠ‹˜\UÔÛX[[
JKšZYÚ
K\ÚŠ[‹™œ›ÛR^
J
	šÚXÚÓ›Û‘[\TÝš[™ÊJKš\Ú
JKÚXÚÕœÛ

	šÚXÚÓØš™XÝ
JK˜ÚXÚ×Ý
JK[]™\•›‹™\Ý[›Ÿ_Y[˜Ý[ÛˆÛ™JJ^Ü™]\›ŠN˜\ÜÙ\
JH[ˆ™YK›ØÚÒY›YÊK_Y[˜Ý[Ûˆ™JJ^Ü™]\›žØ›ØÚÒY›YÎ™Û™JK˜›ØÚ×ÚYÙ›YÊK˜[Y]ÜY™\ÜÎ™K˜[Y]Ü—ØY™\ÜÏÊ[‹™œ›ÛR^
JK˜[Y]Ü—ØY™\ÜÊN›ÚY[Y\Ý[\™K[Y\Ý[\ÊÙË™œ›ÛT™˜ÌÌÌÎUÚ]˜[›ÜÙXÛÛ™ÊJK[Y\Ý[\
N›ÚYÚYÛ˜]\™N™KœÚYÛ˜]\™OÊ[‹™œ›ÛP˜\ÙM
JKœÚYÛ˜]\™JN›ÚY_Y[˜Ý[Ûˆ“ÊJ^Ü™]\›žØ›ØÚÒY™^J
	šÚXÚÓØš™XÝ
JK˜›ØÚ×ÚY
JKZYÚŠ‹˜\UÔÛX[[
J
	šÚXÚÓ›Û‘[\TÝš[™ÊJKšZYÚ
JK›Ý[™Š‹˜\UÔÛX[[
JKœ›Ý[™
KÚYÛ˜]\™\Î™KœÚYÛ˜]\™\ÏÊ	šÚXÚÐ\œ˜^JJKœÚYÛ˜]\™\ÊK›X\
™JN–×__Y[˜Ý[Ûˆ[™JJ^Ü™]\›žØØ[›ÛšXØ[Š	šÚXÚÐ›ÛÛX[ŠJK˜Ø[›ÛšXØ[
KXY\Ž›žJKœÚYÛ™YÚXY\‹šXY\ŠKÛÛ[Z]–“ÊKœÚYÛ™YÚXY\‹˜ÛÛ[Z]
__Y[˜Ý[ÛˆÎ
J^Ü™]\›žØY™\ÜÎŠ[‹™œ›ÛR^
J
	šÚXÚÓ›Û‘[\TÝš[™ÊJK˜Y™\ÜÊJKXšÙ^Nž“Ê
	šÚXÚÓØš™XÝ
JKœX—ÚÙ^JJK›Ý[™ÔÝÙ\ŽŠ‹˜\UÐšYÒ[
J
	šÚXÚÓ›Û‘[\TÝš[™ÊJKœÝÙ\ŠJ__Y[˜Ý[Ûˆ™JJ^Ü™]\›žÙÙ[™\Ú\Õ[YNŠÙË™œ›ÛT™˜ÌÌÌÎUÚ]˜[›ÜÙXÛÛ™ÊJ
	šÚXÚÓ›Û‘[\TÝš[™ÊJK™Ù[™\Ú\×Ý[YJJKÚZ[’YŠ	šÚXÚÓ›Û‘[\TÝš[™ÊJK˜ÚZ[—ÚY
KÛÛœÙ[œÝ\Ô\˜[\Î•Ž
K˜ÛÛœÙ[œÝ\×Ü\˜[\ÊK˜[Y]ÜœÎ™K˜[Y]ÜœÏÊ	šÚXÚÐ\œ˜^JJK˜[Y]ÜœÊK›X\
Î
N–×K\\ÚŠ[‹™œ›ÛR^
J
	šÚXÚÔÙ]
JK˜\Ú\Ú
JK\Ý]N™K˜\ÜÝ]__Y[˜Ý[ÛˆÊJ^Ü™]\›žÜXšÙ^Nž“Ê
	šÚXÚÓØš™XÝ
JKœX—ÚÙ^JJK›Ý[™ÔÝÙ\ŽŠ‹˜\UÐšYÒ[
J
	šÚXÚÓ›Û‘[\TÝš[™ÊJK›Ý[™×ÜÝÙ\ŠJKY™\ÜÎŠ[‹™œ›ÛR^
J
	šÚXÚÓ›Û‘[\TÝš[™ÊJK˜Y™\ÜÊJK›ÜÜÙ\”š[Üš]N™Kœ›ÜÜÙ\—Üš[Üš]OÊ‹˜\UÔÛX[[
JKœ›ÜÜÙ\—Üš[Üš]JN›ÚY_Y[˜Ý[Ûˆ[™JJ^Ü™]\›žÚYŠ[‹™œ›ÛR^
J
	šÚXÚÓ›Û‘[\TÝš[™ÊJKšY
JK\Ý[YŽŠ	šÚXÚÓ›Û‘[\TÝš[™ÊJK›\Ý[—ØYŠK™]ÛÜšÎŠ	šÚXÚÓ›Û‘[\TÝš[™ÊJK›™]ÛÜšÊK™\œÚ[ÛŽŠ	šÚXÚÔÝš[™ÊJK™\œÚ[ÛŠKÚ[›™[ÎŠ	šÚXÚÔÝš[™ÊJK˜Ú[›™[ÊK[ÛšZÙ\ŽŠ	šÚXÚÓ›Û‘[\TÝš[™ÊJK›[ÛšZÙ\ŠKÝ\ŽŠY™XÝ[Û˜\žUÔÝš[™ÓX\
JK›Ý\ŠK›ÝØÛÛ™\œÚ[ÛŽžØ\Š‹˜\UÔÛX[[
J
	šÚXÚÓ›Û‘[\TÝš[™ÊJKœ›ÝØÛÛÝ™\œÚ[Û‹˜\
JK›ØÚÎŠ‹˜\UÔÛX[[
J
	šÚXÚÓ›Û‘[\TÝš[™ÊJKœ›ÝØÛÛÝ™\œÚ[Û‹˜›ØÚÊJKœŠ‹˜\UÔÛX[[
J
	šÚXÚÓ›Û‘[\TÝš[™ÊJKœ›ÝØÛÛÝ™\œÚ[Û‹œœ
J___Y[˜Ý[Ûˆ›™JJ^Û]YK™X\›Y\ÝØ›ØÚ×ÚZYÚÊ‹˜\UÔÛX[[
JK™X\›Y\ÝØ›ØÚ×ÚZYÚ
N›ÚYYK™X\›Y\ÝØ›ØÚ×Ý[YOÊÙË™œ›ÛT™˜ÌÌÌÎUÚ]˜[›ÜÙXÛÛ™ÊJK™X\›Y\ÝØ›ØÚ×Ý[YJN›ÚYÜ™]\›žÙX\›Y\Ý\\Ú™K™X\›Y\ÝØ\Ú\ÚÊ[‹™œ›ÛR^
JK™X\›Y\ÝØ\Ú\Ú
N›ÚYX\›Y\Ý›ØÚÒ\Ú™K™X\›Y\ÝØ›ØÚ×Ú\ÚÊ[‹™œ›ÛR^
JK™X\›Y\ÝØ›ØÚ×Ú\Ú
N›ÚYX\›Y\Ý›ØÚÒZYÚ›Ÿ›ÚYX\›Y\Ý›ØÚÕ[YNË™Ù][YJ
OÝ›ÚY]\Ý›ØÚÒ\ÚŠ[‹™œ›ÛR^
J
	šÚXÚÓ›Û‘[\TÝš[™ÊJK›]\ÝØ›ØÚ×Ú\Ú
JK]\Ý\\ÚŠ[‹™œ›ÛR^
J
	šÚXÚÓ›Û‘[\TÝš[™ÊJK›]\ÝØ\Ú\Ú
JK]\Ý›ØÚÕ[YNŠÙË™œ›ÛT™˜ÌÌÌÎUÚ]˜[›ÜÙXÛÛ™ÊJ
	šÚXÚÓ›Û‘[\TÝš[™ÊJK›]\ÝØ›ØÚ×Ý[YJJK]\Ý›ØÚÒZYÚŠ‹˜\UÔÛX[[
J
	šÚXÚÓ›Û‘[\TÝš[™ÊJK›]\ÝØ›ØÚ×ÚZYÚ
JKØ]Ú[™Õ\Š	šÚXÚÐ›ÛÛX[ŠJK˜Ø]Ú[™×Ý\
__Y[˜Ý[Ûˆ[™JJ^Ü™]\›žÛ›ÙR[™›Îž[™JK››ÙWÚ[™›ÊKÞ[˜Ò[™›Î›™JKœÞ[˜×Ú[™›ÊK˜[Y]Ü’[™›Î–ÊK˜[Y]Ü—Ú[™›Ê__Y[˜Ý[ÛˆÛ™JJ^Ü™]\›žÙ]NŠ[‹™œ›ÛP˜\ÙM
J
	šÚXÚÓ›Û‘[\TÝš[™ÊJK™]JJK›ÛÝ\ÚŠ[‹™œ›ÛR^
J
	šÚXÚÓ›Û‘[\TÝš[™ÊJKœ›ÛÝÚ\Ú
JK›ÛÙŽžÝÝ[Š‹˜\UÔÛX[[
J
	šÚXÚÓ›Û‘[\TÝš[™ÊJKœ›ÛÙ‹Ý[
JK[™^Š‹˜\UÔÛX[[
J
	šÚXÚÓ›Û‘[\TÝš[™ÊJKœ›ÛÙ‹š[™^
JKXY’\ÚŠ[‹™œ›ÛP˜\ÙM
J
	šÚXÚÓ›Û‘[\TÝš[™ÊJKœ›ÛÙ‹›XY—Ú\Ú
JK][ÎŠ	šÚXÚÐ\œ˜^JJKœ›ÛÙ‹˜][ÊK›X\
[‹™œ›ÛP˜\ÙM
___Y[˜Ý[Ûˆ
J^Ü™]\›žÝŠ[‹™œ›ÛP˜\ÙM
J
	šÚXÚÓ›Û‘[\TÝš[™ÊJK
JK™\Ý[œÛ

	šÚXÚÓØš™XÝ
JKÜ™\Ý[
JKZYÚŠ‹˜\UÔÛX[[
J
	šÚXÚÓ›Û‘[\TÝš[™ÊJKšZYÚ
JK[™^Š‹˜\UÔÛX[[
J
	šÚXÚÓ[X™\ŠJKš[™^
JK\ÚŠ[‹™œ›ÛR^
J
	šÚXÚÓ›Û‘[\TÝš[™ÊJKš\Ú
JK›ÛÙŽŠY›X^JJÛ™KKœ›ÛÙŠ__Y[˜Ý[ÛˆÛ™JJ^Ü™]\›žÝÝ[ÛÝ[Š‹˜\UÔÛX[[
J
	šÚXÚÓ›Û‘[\TÝš[™ÊJKÝ[ØÛÝ[
JKÎŠ	šÚXÚÐ\œ˜^JJKÊK›X\

__Y[˜Ý[ÛˆÛ™JJ^Û]J[‹™œ›ÛP˜\ÙM
J
	šÚXÚÓ›Û‘[\TÝš[™ÊJK
JNÜ™]\›žÝ›‹\ÚŠ[™Kš\Ú
JŠK™\Ý[œÛ
Kœ™\Ý[
KZYÚŠ‹˜\UÔÛX[[
J
	šÚXÚÓ›Û‘[\TÝš[™ÊJKšZYÚ
J__Y[˜Ý[Ûˆ[™JJ^Ü™]\›žØ›ØÚÒZYÚŠ‹˜\UÔÛX[[
J
	šÚXÚÓ›Û‘[\TÝš[™ÊJK˜›ØÚ×ÚZYÚ
JK˜[Y]ÜœÎŠ	šÚXÚÐ\œ˜^JJK˜[Y]ÜœÊK›X\
ÊKÛÝ[Š‹˜\UÔÛX[[
J
	šÚXÚÓ›Û‘[\TÝš[™ÊJK˜ÛÝ[
JKÝ[Š‹˜\UÔÛX[[
J
	šÚXÚÓ›Û‘[\TÝš[™ÊJKÝ[
J__Y[˜Ý[ÛˆN
J^Ü™]\›žÚXY\Ž›žJ
	šÚXÚÓØš™XÝ
JKšXY\ŠJK\ÝÛÛ[Z]™K›\ÝØÛÛ[Z]˜›ØÚ×ÚYš\ÚÖ“Ê
	šÚXÚÓØš™XÝ
JK›\ÝØÛÛ[Z]
JN›[Î™K™]KÏÊ	šÚXÚÐ\œ˜^JJK™]KÊK›X\
[‹™œ›ÛP˜\ÙM
N–×K]šY[˜ÙN™K™]šY[˜ÙOË™]šY[˜ÙOÏÖ×__Y[˜Ý[ÛˆŽ
J^Ü™]\›žØ›ØÚÒY™^JK˜›ØÚ×ÚY
K›ØÚÎ–N
K˜›ØÚÊ__Y[˜Ý[Ûˆ[™JJ^Ü™]\›žÝÝ[ÛÝ[Š‹˜\UÔÛX[[
J
	šÚXÚÓ›Û‘[\TÝš[™ÊJKÝ[ØÛÝ[
JK›ØÚÜÎŠ	šÚXÚÐ\œ˜^JJK˜›ØÚÜÊK›X\
Ž
__Y[˜Ý[ÛˆÛ™JJ^Ü™]\›žÝÝ[Š‹˜\UÔÛX[[
J
	šÚXÚÓ›Û‘[\TÝš[™ÊJKÝ[
JKÝ[ž]\ÎŠ‹˜\UÔÛX[[
J
	šÚXÚÓ›Û‘[\TÝš[™ÊJKÝ[Øž]\ÊJ__]˜\ˆSÏXÛ\ÜÈ^ÜÝ]XÈXÛÙPX˜ÚR[™›ÊŠ^Ü™]\›ˆ›™J
	šÚXÚÓØš™XÝ
J‹œ™\Ý[œ™\ÜÛœÙJJ_\Ý]XÈXÛÙPX˜ÚT]Y\žJŠ^Ü™]\›ˆ›™J
	šÚXÚÓØš™XÝ
J‹œ™\Ý[œ™\ÜÛœÙJJ_\Ý]XÈXÛÙP›ØÚÊŠ^Ü™]\›ˆŽ
‹œ™\Ý[
_\Ý]XÈXÛÙP›ØÚÔ™\Ý[ÊŠ^Ü™]\›ˆ™J‹œ™\Ý[
_\Ý]XÈXÛÙP›ØÚÔÙX\˜Ú
Š^Ü™]\›ˆ[™J‹œ™\Ý[
_\Ý]XÈXÛÙP›ØÚØÚZ[ŠŠ^Ü™]\›ˆ[™J‹œ™\Ý[
_\Ý]XÈXÛÙPœ›ØYØ\ÝÞ[˜ÊŠ^Ü™]\›ˆ™J‹œ™\Ý[
_\Ý]XÈXÛÙPœ›ØYØ\Ý\Þ[˜ÊŠ^Ü™]\›ˆK™XÛÙPœ›ØYØ\ÝÞ[˜ÊŠ_\Ý]XÈXÛÙPœ›ØYØ\ÝÛÛ[Z]
Š^Ü™]\›ˆ›™J‹œ™\Ý[
_\Ý]XÈXÛÙPÛÛ[Z]
Š^Ü™]\›ˆ[™J‹œ™\Ý[
_\Ý]XÈXÛÙQÙ[™\Ú\ÊŠ^Ü™]\›ˆ™J
	šÚXÚÓØš™XÝ
J‹œ™\Ý[™Ù[™\Ú\ÊJ_\Ý]XÈXÛÙRX[

^Ü™]\›ˆ[\Ý]XÈXÛÙS[U[˜ÛÛ™š\›YYÊŠ^Ü™]\›ˆÛ™J‹œ™\Ý[
_\Ý]XÈXÛÙTÝ]\ÊŠ^Ü™]\›ˆ[™J‹œ™\Ý[
_\Ý]XÈXÛÙS™]Ð›ØÚÑ]™[
Š^Ü™]\›ˆN
‹™]K˜[YK˜›ØÚÊ_\Ý]XÈXÛÙS™]Ð›ØÚÒXY\‘]™[
Š^Ü™]\›ˆžJ‹™]K˜[YKšXY\Š_\Ý]XÈXÛÙU]™[
Š^Ü™]\›ˆÛ™J‹™]K˜[YK•™\Ý[
_\Ý]XÈXÛÙU
Š^Ü™]\›ˆ
‹œ™\Ý[
_\Ý]XÈXÛÙUÙX\˜Ú
Š^Ü™]\›ˆÛ™J‹œ™\Ý[
_\Ý]XÈXÛÙU˜[Y]ÜœÊŠ^Ü™]\›ˆ[™J‹œ™\Ý[
__NÒ™”™\ÜÛœÙ\ÏVSßJNÝ˜\ˆRJOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\J—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÙ”™\ÜÛœÙ\ÏY”\˜[\Ï]›ÚYÝ˜\ˆ›™O\N

NÓØš™XÝ™Yš[™T›Ü\J”\˜[\È‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ›™K”\˜[\ß_JNÝ˜\ˆ›™OVŽ

NÓØš™XÝ™Yš[™T›Ü\J”™\ÜÛœÙ\È‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ›™K”™\ÜÛœÙ\ß_J_JNÝ˜\ˆ	RJOžÈ\ÙHÝšXÝŽÝ˜\ˆ™O[	‰›—×ØÜ™X]Pš[™[™ß
Øš™XÝ˜Ü™X]OÊ[˜Ý[ÛŠK‹J^ÚOOO]›ÚY	‰ŠO]
NÝ˜\ˆSØš™XÝ™Ù]ÝÛ”›Ü\Q\ØÜš\ÜŠ‹
NÊ\Ÿ
™Ù]š[ˆÈ[‹—×Ù\Ó[Ù[Nœ‹Üš]X›_‹˜ÛÛ™šYÝ\˜X›JJI‰Š^Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ–Ý__JKØš™XÝ™Yš[™T›Ü\JKKŠ_JNŠ[˜Ý[ÛŠK‹J^ÚOOO]›ÚY	‰ŠO]
KVÚWO[–Ý_JJK›™O[	‰›—×ÜÙ][Ù[QY˜][
Øš™XÝ˜Ü™X]OÊ[˜Ý[ÛŠKŠ^ÓØš™XÝ™Yš[™T›Ü\JK™Y˜][‹Ù[[Y\˜X›NˆL˜[YN›ŸJ_JN™[˜Ý[ÛŠKŠ^ÙK™Y˜][[ŸJK›™O[	‰›—×Ú[\ÜÝ\Ÿ
[˜Ý[ÛŠ
^Ý˜\ˆOY[˜Ý[ÛŠŠ^Ü™]\›ˆOSØš™XÝ™Ù]ÝÛ”›Ü\S˜[Y\ß[˜Ý[ÛŠ
^Ý˜\ˆOV×NÙ›ÜŠ˜\ˆˆ[ˆ
SØš™XÝœ›ÝÝ\Kš\ÓÝÛ”›Ü\K˜Ø[
ŠI‰ŠVÚK›[™ÝO\ŠNÜ™]\›ˆ_KJŠ_NÜ™]\›ˆ[˜Ý[ÛŠŠ^ÚYŠ‰‰›‹—×Ù\Ó[Ù[J\™]\›ˆŽÝ˜\ˆ^ßNÚYŠˆO[[
Y›ÜŠ˜\ˆOYJŠKLÜK›[™ÝÜŠÊÊZVÜ—HOOH™Y˜][‰‰”™J‹VÜ—JNÜ™]\›ˆ›™JŠK_JJ
NÓØš™XÝ™Yš[™T›Ü\J—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÛÛÛY]ÎÛY[]›ÚYÝ˜\ˆORYÊ
K]V

K]›™J	

JK	ÏXÛ\ÜÈ^ÜÝ]XÈ\Þ[˜ÈÛÛ›™XÝ
Š^Û]Ü™]\›ˆ\[ÙˆOH›Øš™XÝÝ[™]ÈK’ÛY[
ŠN[‹œÝ\ÕÚ]
š‹ËÈŠ_‹œÝ\ÕÚ]
šÎ‹ËÈŠOÛ™]ÈK’ÛY[
ŠN›™]ÈK•ÙXœÛØÚÙ]ÛY[
ŠKK˜Ü™X]J
_\Ý]XÈÜ™X]JŠ^Ü™]\›ˆ™]ÈJŠ_XÛY[ØÛÛœÝXÝÜŠŠ^Ý\Ë˜ÛY[[ŸY\ØÛÛ›™XÝ

^Ý\Ë˜ÛY[™\ØÛÛ›™XÝ

_X\Þ[˜ÈX˜ÚR[™›Ê
^Û]^ÛY]Ù”‹“Y]ÙX˜ÚR[™›ßNÜ™]\›ˆ\Ë™ÐØ[
‹]”\˜[\Ë™[˜ÛÙPX˜ÚR[™›Ë]”™\ÜÛœÙ\Ë™XÛÙPX˜ÚR[™›Ê_X\Þ[˜ÈX˜ÚT]Y\žJŠ^Û]^Ü\˜[\Î›‹Y]Ù”‹“Y]ÙX˜ÚT]Y\ž_NÜ™]\›ˆ\Ë™ÐØ[
]”\˜[\Ë™[˜ÛÙPX˜ÚT]Y\žK]”™\ÜÛœÙ\Ë™XÛÙPX˜ÚT]Y\žJ_X\Þ[˜È›ØÚÊŠ^Û]^ÛY]Ù”‹“Y]Ù›ØÚË\˜[\ÎžÚZYÚ›Ÿ_NÜ™]\›ˆ\Ë™ÐØ[
]”\˜[\Ë™[˜ÛÙP›ØÚË]”™\ÜÛœÙ\Ë™XÛÙP›ØÚÊ_X\Þ[˜È›ØÚÔ™\Ý[ÊŠ^Û]^ÛY]Ù”‹“Y]Ù›ØÚÔ™\Ý[Ë\˜[\ÎžÚZYÚ›Ÿ_NÜ™]\›ˆ\Ë™ÐØ[
]”\˜[\Ë™[˜ÛÙP›ØÚÔ™\Ý[Ë]”™\ÜÛœÙ\Ë™XÛÙP›ØÚÔ™\Ý[Ê_X\Þ[˜È›ØÚÔÙX\˜Ú
Š^Û]^Ü\˜[\Î›‹Y]Ù”‹“Y]Ù›ØÚÔÙX\˜ÚKOX]ØZ]\Ë™ÐØ[
]”\˜[\Ë™[˜ÛÙP›ØÚÔÙX\˜Ú]”™\ÜÛœÙ\Ë™XÛÙP›ØÚÔÙX\˜Ú
NÜ™]\›žË‹‹šK›ØÚÜÎ–Ë‹‹šK˜›ØÚÜ×KœÛÜ

‹ÊOOœ‹˜›ØÚËšXY\‹šZYÚ[Ë˜›ØÚËšXY\‹šZYÚ
__X\Þ[˜È›ØÚÔÙX\˜Ú[
Š^Û][‹œYÙ_KOV×KHLNÙ›ÜŠÈ\ŽÊ^Û]ÏX]ØZ]\Ë˜›ØÚÔÙX\˜Ú
Ë‹‹›‹YÙNJNÚKœ\Ú
‹‹›Ë˜›ØÚÜÊKK›[™ÝËÝ[ÛÝ[Ý
ÊÎœHL\™]\›ˆKœÛÜ

ËJOO›Ë˜›ØÚËšXY\‹šZYÚXK˜›ØÚËšXY\‹šZYÚ
KÝÝ[ÛÝ[šK›[™Ý›ØÚÜÎš__X\Þ[˜È›ØÚØÚZ[Š‹
^Û]O^ÛY]Ù”‹“Y]Ù›ØÚØÚZ[‹\˜[\ÎžÛZ[’ZYÚ›‹X^ZYÚ_NÜ™]\›ˆ\Ë™ÐØ[
K]”\˜[\Ë™[˜ÛÙP›ØÚØÚZ[‹]”™\ÜÛœÙ\Ë™XÛÙP›ØÚØÚZ[Š_X\Þ[˜Èœ›ØYØ\ÝÞ[˜ÊŠ^Û]^Ü\˜[\Î›‹Y]Ù”‹“Y]Ùœ›ØYØ\ÝÞ[˜ßNÜ™]\›ˆ\Ë™ÐØ[
]”\˜[\Ë™[˜ÛÙPœ›ØYØ\Ý]”™\ÜÛœÙ\Ë™XÛÙPœ›ØYØ\ÝÞ[˜Ê_X\Þ[˜Èœ›ØYØ\Ý\Þ[˜ÊŠ^Û]^Ü\˜[\Î›‹Y]Ù”‹“Y]Ùœ›ØYØ\Ý\Þ[˜ßNÜ™]\›ˆ\Ë™ÐØ[
]”\˜[\Ë™[˜ÛÙPœ›ØYØ\Ý]”™\ÜÛœÙ\Ë™XÛÙPœ›ØYØ\Ý\Þ[˜Ê_X\Þ[˜Èœ›ØYØ\ÝÛÛ[Z]
Š^Û]^Ü\˜[\Î›‹Y]Ù”‹“Y]Ùœ›ØYØ\ÝÛÛ[Z]NÜ™]\›ˆ\Ë™ÐØ[
]”\˜[\Ë™[˜ÛÙPœ›ØYØ\Ý]”™\ÜÛœÙ\Ë™XÛÙPœ›ØYØ\ÝÛÛ[Z]
_X\Þ[˜ÈÛÛ[Z]
Š^Û]^ÛY]Ù”‹“Y]ÙÛÛ[Z]\˜[\ÎžÚZYÚ›Ÿ_NÜ™]\›ˆ\Ë™ÐØ[
]”\˜[\Ë™[˜ÛÙPÛÛ[Z]]”™\ÜÛœÙ\Ë™XÛÙPÛÛ[Z]
_X\Þ[˜ÈÙ[™\Ú\Ê
^Û]^ÛY]Ù”‹“Y]Ù‘Ù[™\Ú\ßNÜ™]\›ˆ\Ë™ÐØ[
‹]”\˜[\Ë™[˜ÛÙQÙ[™\Ú\Ë]”™\ÜÛœÙ\Ë™XÛÙQÙ[™\Ú\Ê_X\Þ[˜ÈX[

^Û]^ÛY]Ù”‹“Y]Ù’X[NÜ™]\›ˆ\Ë™ÐØ[
‹]”\˜[\Ë™[˜ÛÙRX[]”™\ÜÛœÙ\Ë™XÛÙRX[
_X\Þ[˜È[U[˜ÛÛ™š\›YYÊ
^Û]^ÛY]Ù”‹“Y]Ù“[U[˜ÛÛ™š\›YYßNÜ™]\›ˆ\Ë™ÐØ[
‹]”\˜[\Ë™[˜ÛÙS[U[˜ÛÛ™š\›YYË]”™\ÜÛœÙ\Ë™XÛÙS[U[˜ÛÛ™š\›YYÊ_X\Þ[˜ÈÝ]\Ê
^Û]^ÛY]Ù”‹“Y]Ù”Ý]\ßNÜ™]\›ˆ\Ë™ÐØ[
‹]”\˜[\Ë™[˜ÛÙTÝ]\Ë]”™\ÜÛœÙ\Ë™XÛÙTÝ]\Ê_\ÝXœØÜšX™S™]Ð›ØÚÊ
^Û]^ÛY]Ù”‹“Y]Ù”ÝXœØÜšX™K]Y\žNžÝ\N”‹”ÝXœØÜš\[Û‘]™[\K“™]Ð›ØÚß_NÜ™]\›ˆ\ËœÝXœØÜšX™J‹]”™\ÜÛœÙ\Ë™XÛÙS™]Ð›ØÚÑ]™[
_\ÝXœØÜšX™S™]Ð›ØÚÒXY\Š
^Û]^ÛY]Ù”‹“Y]Ù”ÝXœØÜšX™K]Y\žNžÝ\N”‹”ÝXœØÜš\[Û‘]™[\K“™]Ð›ØÚÒXY\Ÿ_NÜ™]\›ˆ\ËœÝXœØÜšX™J‹]”™\ÜÛœÙ\Ë™XÛÙS™]Ð›ØÚÒXY\‘]™[
_\ÝXœØÜšX™U
Š^Û]^ÛY]Ù”‹“Y]Ù”ÝXœØÜšX™K]Y\žNžÝ\N”‹”ÝXœØÜš\[Û‘]™[\K•˜]Î›Ÿ_NÜ™]\›ˆ\ËœÝXœØÜšX™J]”™\ÜÛœÙ\Ë™XÛÙU]™[
_X\Þ[˜È
Š^Û]^Ü\˜[\Î›‹Y]Ù”‹“Y]Ù•NÜ™]\›ˆ\Ë™ÐØ[
]”\˜[\Ë™[˜ÛÙU]”™\ÜÛœÙ\Ë™XÛÙU
_X\Þ[˜ÈÙX\˜Ú
Š^Û]^Ü\˜[\Î›‹Y]Ù”‹“Y]Ù•ÙX\˜ÚNÜ™]\›ˆ\Ë™ÐØ[
]”\˜[\Ë™[˜ÛÙUÙX\˜Ú]”™\ÜÛœÙ\Ë™XÛÙUÙX\˜Ú
_X\Þ[˜ÈÙX\˜Ú[
Š^Û][‹œYÙ_KOV×KHLNÙ›ÜŠÈ\ŽÊ^Û]ÏX]ØZ]\ËÙX\˜Ú
Ë‹‹›‹YÙNJNÚKœ\Ú
‹‹›ËÊKK›[™ÝËÝ[ÛÝ[Ý
ÊÎœHL\™]\›žÝÝ[ÛÝ[šK›[™ÝÎš__X\Þ[˜È˜[Y]ÜœÊŠ^Û]^ÛY]Ù”‹“Y]Ù•˜[Y]ÜœË\˜[\Î›ŸNÜ™]\›ˆ\Ë™ÐØ[
]”\˜[\Ë™[˜ÛÙU˜[Y]ÜœË]”™\ÜÛœÙ\Ë™XÛÙU˜[Y]ÜœÊ_X\Þ[˜È˜[Y]ÜœÐ[
Š^Û]V×KOLKHLKÏ[ŽÙ›ÜŠÈ\ŽÊ^Û]OX]ØZ]\Ë˜[Y]ÜœÊÜ\—ÜYÙNLZYÚ›ËYÙNš_JNÝœ\Ú
‹‹˜K˜[Y]ÜœÊKÏ[ßK˜›ØÚÒZYÚ›[™ÝKÝ[ÚJÊÎœHL\™]\›žØ›ØÚÒZYÚ›ÏÏÌÛÝ[›[™ÝÝ[›[™Ý˜[Y]ÜœÎ_X\Þ[˜ÈÐØ[
‹J^Û]]
ŠKÏX]ØZ]\Ë˜ÛY[™^XÝ]JŠNÜ™]\›ˆJÊ_\ÝXœØÜšX™J‹
^ÚYŠJKš[œÝ[˜ÙSÙ”œÔÝ™X[Z[™ÐÛY[
J\Ë˜ÛY[
J]›ÝÈ™]È\œ›ÜŠ•\È”ÈÛY[\HØ[››ÝÝXœØÜšX™HÈ]™[ÈŠNÛ]OZ]”\˜[\Ë™[˜ÛÙTÝXœØÜšX™JŠNÜ™]\›ˆ\Ë˜ÛY[›\Ý[ŠJK›X\
ÏO
ÊJ__NÛÛÛY]ÎÛY[IßJNÝ˜\ˆQÏRJÛOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\JÛ—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNØÛ•›ÝU\O]›ÚYØÛ˜œ›ØYØ\ÝÞ[˜ÔÝXØÙ\ÜÏSÛ™NØÛ˜œ›ØYØ\ÝÛÛ[Z]ÝXØÙ\ÜÏQ™NÙ[˜Ý[ÛˆÛ™JJ^Ü™]\›ˆK˜ÛÙOOOLY[˜Ý[Ûˆ™JJ^Ü™]\›ˆK˜ÚXÚÕ˜ÛÙOOOL	‰ˆHYK™[]™\•	‰™K™[]™\•˜ÛÙOOOL]˜\ˆŽÊ[˜Ý[ÛŠJ^ÙVÙK”™U›ÝOLWOH”™U›ÝH‹VÙK”™PÛÛ[Z]L—OH”™PÛÛ[Z]ŸJJŽ
Û•›ÝU\OZŽ^ßJJ_JNÝ˜\ˆžORJÛÏOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\JÛË—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÕÛË•›ÝU\OUÛË˜œ›ØYØ\ÝÞ[˜ÔÝXØÙ\ÜÏUÛË˜œ›ØYØ\ÝÛÛ[Z]ÝXØÙ\ÜÏUÛË”ÝXœØÜš\[Û‘]™[\OUÛË“Y]ÙUÛËÛÛY]ÎÛY[]›ÚYÝ˜\ˆ[™OI

NÓØš™XÝ™Yš[™T›Ü\JÛËÛÛY]ÎÛY[‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ[™KÛÛY]ÎÛY[_JNÝ˜\ˆ‘ÏI

NÓØš™XÝ™Yš[™T›Ü\JÛË“Y]Ù‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ‘Ë“Y]Ù_JNÓØš™XÝ™Yš[™T›Ü\JÛË”ÝXœØÜš\[Û‘]™[\H‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ‘Ë”ÝXœØÜš\[Û‘]™[\__JNÝ˜\ˆ“ÏYQÊ
NÓØš™XÝ™Yš[™T›Ü\JÛË˜œ›ØYØ\ÝÛÛ[Z]ÝXØÙ\ÜÈ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ“Ë˜œ›ØYØ\ÝÛÛ[Z]ÝXØÙ\Üß_JNÓØš™XÝ™Yš[™T›Ü\JÛË˜œ›ØYØ\ÝÞ[˜ÔÝXØÙ\ÜÈ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ“Ë˜œ›ØYØ\ÝÞ[˜ÔÝXØÙ\Üß_JNÓØš™XÝ™Yš[™T›Ü\JÛË•›ÝU\H‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ“Ë•›ÝU\__J_JNÝ˜\ˆ^ORJOOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\JK—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÙK”ÝXœØÜš\[Û‘]™[\OYK“Y]Ù]›ÚYÙK˜Z[]Y\žO^™NÝ˜\ˆÎÊ[˜Ý[ÛŠJ^ÙKX˜ÚR[™›ÏH˜X˜ÚWÚ[™›È‹KX˜ÚT]Y\žOH˜X˜ÚWÜ]Y\žH‹K›ØÚÏH˜›ØÚÈ‹K›ØÚØÚZ[H˜›ØÚØÚZ[ˆ‹K›ØÚÔ™\Ý[ÏH˜›ØÚ×Ü™\Ý[È‹K›ØÚÔÙX\˜ÚH˜›ØÚ×ÜÙX\˜Ú‹Kœ›ØYØ\Ý\Þ[˜ÏH˜œ›ØYØ\ÝÝØ\Þ[˜È‹Kœ›ØYØ\ÝÞ[˜ÏH˜œ›ØYØ\ÝÝÜÞ[˜È‹Kœ›ØYØ\ÝÛÛ[Z]H˜œ›ØYØ\ÝÝØÛÛ[Z]‹KÛÛ[Z]H˜ÛÛ[Z]‹K‘Ù[™\Ú\ÏH™Ù[™\Ú\È‹K’X[HšX[‹K“[U[˜ÛÛ™š\›YYÏH›[WÝ[˜ÛÛ™š\›YYÝÈ‹K”Ý]\ÏHœÝ]\È‹K”ÝXœØÜšX™OHœÝXœØÜšX™H‹K•H‹K•ÙX\˜ÚHÜÙX\˜Ú‹K•˜[Y]ÜœÏH˜[Y]ÜœÈ‹K•[œÝXœØÜšX™OH[œÝXœØÜšX™HŸJJß
K“Y]Ù]Ï^ßJJNÝ˜\ˆ‘ÎÊ[˜Ý[ÛŠJ^ÙK“™]Ð›ØÚÏH“™]Ð›ØÚÈ‹K“™]Ð›ØÚÒXY\H“™]Ð›ØÚÒXY\ˆ‹K•H•ŸJJ‘ß
K”ÝXœØÜš\[Û‘]™[\O\‘Ï^ßJJNÙ[˜Ý[Ûˆ™JJ^Û]JKYÜÏÙKYÜÎ–×JK›X\
O˜	Ü‹šÙ^_OIÉÜ‹˜[Y_IØ
KOYKœ˜]ÏÖÙKœ˜]×N–×NÜ™]\›–Ë‹‹‹‹šWKš›Ú[ŠˆS‘Š__JNÝ˜\ˆÑÏRJ[OžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\J[—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÝ[•›ÝU\O]›ÚYÝ[˜œ›ØYØ\ÝÞ[˜ÔÝXØÙ\ÜÏU™NÝ[˜œ›ØYØ\ÝÛÛ[Z]ÝXØÙ\ÜÏR›™NÙ[˜Ý[Ûˆ™JJ^Ü™]\›ˆK˜ÛÙOOOLY[˜Ý[Ûˆ›™JJ^Ü™]\›ˆK˜ÚXÚÕ˜ÛÙOOOL	‰ˆHYK™[]™\•	‰™K™[]™\•˜ÛÙOOOL]˜\ˆQÎÊ[˜Ý[ÛŠJ^ÙVÙK”™U›ÝOLWOH”™U›ÝH‹VÙK”™PÛÛ[Z]L—OH”™PÛÛ[Z]ŸJJQß
[•›ÝU\OZQÏ^ßJJ_JNÝ˜\ˆÞORJ™OžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\J™—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÙ™›X^O\[™NÙ™™XÝ[Û˜\žUÔÝš[™ÓX\R™NÙ™™[˜ÛÙTÝš[™ÏS[™NÙ™™[˜ÛÙU]˜\š[P[Ù™™[˜ÛÙU[YOWÛ™NÙ™™[˜ÛÙPž]\ÏQÛ™NÙ™™[˜ÛÙU™\œÚ[ÛU›™NÙ™™[˜ÛÙP›ØÚÒYRÛ™NÝ˜\ˆ›™OR›Š
NÙ[˜Ý[Ûˆ[™JKŠ^Ü™]\›ˆO[[Ý›ÚY™JŠ_Y[˜Ý[Ûˆ™JJ^Û][™]ÈX\Ù›ÜŠ]ÙˆØš™XÝšÙ^\ÊJJ^Û]OYVÝNÚYŠ\[ÙˆHOHœÝš[™ÈŠ]›ÝÈ™]È\œ›ÜŠ‘›Ý[™XÝ[Û˜\žH˜[YHÙˆ\HÝ\ˆ[ˆÝš[™ÈŠNÛ‹œÙ]
J_\™]\›ˆŸY[˜Ý[Ûˆ[™JJ^Û]J›™KÕ]Ž
JJNÜ™]\›ˆZ[\œ˜^K™œ›ÛJÛ‹›[™Ý‹‹›—J_Y[˜Ý[Ûˆ[
J^Ü™]\›ˆOLLŽÕZ[\œ˜^K™œ›ÛJÙIŒM_LŽ‹‹[
OÊWJN•Z[\œ˜^K™œ›ÛJÙIŒMWJ_Y[˜Ý[ÛˆÛ™JJ^Û]YK™Ù][YJ
KSX]™›ÛÜŠ‹ÌYLÊKO]ÖÎ‹‹[

WN›™]ÈZ[\œ˜^KJK›˜[›ÜÙXÛÛ™ß
JÛ‰LYLÊŒYM‹Ï\ÖÌM‹‹‹[
ŠWN›™]ÈZ[\œ˜^NÜ™]\›ˆZ[\œ˜^K™œ›ÛJË‹‹šK‹‹›×J_Y[˜Ý[ÛˆÛ™JJ^ÚYŠK›[™ÝLLŽ
]›ÝÈ™]È\œ›ÜŠ“›Ý[\[Y[Y›Üˆž]H\œ˜^\ÈÙˆ[™ÝLŽÜˆ[Ü™HŠNÜ™]\›ˆK›[™ÝÕZ[\œ˜^K™œ›ÛJÙK›[™Ý‹‹™WJN›™]ÈZ[\œ˜^_Y[˜Ý[Ûˆ›™JJ^Û]YK˜›ØÚÏÕZ[\œ˜^K™œ›ÛJÎ‹‹[
K˜›ØÚÊWJN›™]ÈZ[\œ˜^KYK˜\ÕZ[\œ˜^K™œ›ÛJÌM‹‹‹[
K˜\
WJN›™]ÈZ[\œ˜^NÜ™]\›ˆZ[\œ˜^K™œ›ÛJË‹‹›‹‹‹J_Y[˜Ý[ÛˆÛ™JJ^Ü™]\›ˆZ[\œ˜^K™œ›ÛJÌLKš\Ú›[™Ý‹‹™Kš\ÚNKœ\Ëš\Ú›[™Ý
ÍKœ\ËÝ[NKœ\Ëš\Ú›[™Ý‹‹™Kœ\Ëš\ÚJ__JNÝ˜\ˆQÏRJÙOžÈ\ÙHÝšXÝŽÝ˜\ˆÛ™OYÙ	‰™Ù—×ØÜ™X]Pš[™[™ß
Øš™XÝ˜Ü™X]OÊ[˜Ý[ÛŠK‹J^ÚOOO]›ÚY	‰ŠO]
NÝ˜\ˆSØš™XÝ™Ù]ÝÛ”›Ü\Q\ØÜš\ÜŠ‹
NÊ\Ÿ
™Ù]š[ˆÈ[‹—×Ù\Ó[Ù[Nœ‹Üš]X›_‹˜ÛÛ™šYÝ\˜X›JJI‰Š^Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ–Ý__JKØš™XÝ™Yš[™T›Ü\JKKŠ_JNŠ[˜Ý[ÛŠK‹J^ÚOOO]›ÚY	‰ŠO]
KVÚWO[–Ý_JJK™OYÙ	‰™Ù—×ÜÙ][Ù[QY˜][
Øš™XÝ˜Ü™X]OÊ[˜Ý[ÛŠKŠ^ÓØš™XÝ™Yš[™T›Ü\JK™Y˜][‹Ù[[Y\˜X›NˆL˜[YN›ŸJ_JN™[˜Ý[ÛŠKŠ^ÙK™Y˜][[ŸJK[™OYÙ	‰™Ù—×Ú[\ÜÝ\Ÿ
[˜Ý[ÛŠ
^Ý˜\ˆOY[˜Ý[ÛŠŠ^Ü™]\›ˆOSØš™XÝ™Ù]ÝÛ”›Ü\S˜[Y\ß[˜Ý[ÛŠ
^Ý˜\ˆOV×NÙ›ÜŠ˜\ˆˆ[ˆ
SØš™XÝœ›ÝÝ\Kš\ÓÝÛ”›Ü\K˜Ø[
ŠI‰ŠVÚK›[™ÝO\ŠNÜ™]\›ˆ_KJŠ_NÜ™]\›ˆ[˜Ý[ÛŠŠ^ÚYŠ‰‰›‹—×Ù\Ó[Ù[J\™]\›ˆŽÝ˜\ˆ^ßNÚYŠˆO[[
Y›ÜŠ˜\ˆOYJŠKLÜK›[™ÝÜŠÊÊZVÜ—HOOH™Y˜][‰‰•Û™J‹VÜ—JNÜ™]\›ˆ™JŠK_JJ
NÓØš™XÝ™Yš[™T›Ü\JÙ—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÙÙ”\˜[\Ï]›ÚYÝ˜\ˆOR›Š
K\Ï]]J
K›ÏWÚ

KÏ[ÞJ
K›™OV[™J^J
JNÙ[˜Ý[ÛˆLJJ^Ü™]\›žÚZYÚŠË›X^JJ\ËœÛX[[Ð\KKšZYÚ
__Y[˜Ý[Ûˆ›™JJ^Ü™]\›žÛZ[’ZYÚŠË›X^JJ\ËœÛX[[Ð\KK›Z[’ZYÚ
KX^ZYÚŠË›X^JJ\ËœÛX[[Ð\KK›X^ZYÚ
__Y[˜Ý[Ûˆ™JJ^Ü™]\›žÜ]Y\žN™Kœ]Y\žKYÙNŠË›X^JJ\ËœÛX[[Ð\KKœYÙJK\—ÜYÙNŠË›X^JJ\ËœÛX[[Ð\KKœ\—ÜYÙJKÜ™\—ØžN™K›Ü™\—Øž__Y[˜Ý[Ûˆ	™JJ^Ü™]\›žÜ]™Kœ]]NŠKÒ^
JK™]JKZYÚŠË›X^JJ\ËœÛX[[Ð\KKšZYÚ
K›Ý™N™Kœ›Ý™__Y[˜Ý[Ûˆ›™JJ^Ü™]\›žÝŠKÐ˜\ÙM
JK
__Y[˜Ý[Ûˆ]JJ^Ü™]\›žÚ\ÚŠKÐ˜\ÙM
JKš\Ú
K›Ý™N™Kœ›Ý™__Y[˜Ý[ÛˆJJ^Ü™]\›žÜ]Y\žN™Kœ]Y\žK›Ý™N™Kœ›Ý™KYÙNŠË›X^JJ\ËœÛX[[Ð\KKœYÙJK\—ÜYÙNŠË›X^JJ\ËœÛX[[Ð\KKœ\—ÜYÙJKÜ™\—ØžN™K›Ü™\—Øž__Y[˜Ý[ÛˆJJ^Ü™]\›žÚZYÚŠË›X^JJ\ËœÛX[[Ð\KKšZYÚ
KYÙNŠË›X^JJ\ËœÛX[[Ð\KKœYÙJK\—ÜYÙNŠË›X^JJ\ËœÛX[[Ð\KKœ\—ÜYÙJ__]˜\ˆŒOXÛ\ÜÞÜÝ]XÈ[˜ÛÙPX˜ÚR[™›ÊŠ^Ü™]\›Š›Ë˜Ü™X]RœÛÛ”œÔ™\]Y\Ý
J‹›Y]Ù
_\Ý]XÈ[˜ÛÙPX˜ÚT]Y\žJŠ^Ü™]\›Š›Ë˜Ü™X]RœÛÛ”œÔ™\]Y\Ý
J‹›Y]Ù	™J‹œ\˜[\ÊJ_\Ý]XÈ[˜ÛÙP›ØÚÊŠ^Ü™]\›Š›Ë˜Ü™X]RœÛÛ”œÔ™\]Y\Ý
J‹›Y]ÙLJ‹œ\˜[\ÊJ_\Ý]XÈ[˜ÛÙP›ØÚØÚZ[ŠŠ^Ü™]\›Š›Ë˜Ü™X]RœÛÛ”œÔ™\]Y\Ý
J‹›Y]Ù›™J‹œ\˜[\ÊJ_\Ý]XÈ[˜ÛÙP›ØÚÔ™\Ý[ÊŠ^Ü™]\›Š›Ë˜Ü™X]RœÛÛ”œÔ™\]Y\Ý
J‹›Y]ÙLJ‹œ\˜[\ÊJ_\Ý]XÈ[˜ÛÙP›ØÚÔÙX\˜Ú
Š^Ü™]\›Š›Ë˜Ü™X]RœÛÛ”œÔ™\]Y\Ý
J‹›Y]Ù™J‹œ\˜[\ÊJ_\Ý]XÈ[˜ÛÙPœ›ØYØ\Ý
Š^Ü™]\›Š›Ë˜Ü™X]RœÛÛ”œÔ™\]Y\Ý
J‹›Y]Ù›™J‹œ\˜[\ÊJ_\Ý]XÈ[˜ÛÙPÛÛ[Z]
Š^Ü™]\›Š›Ë˜Ü™X]RœÛÛ”œÔ™\]Y\Ý
J‹›Y]ÙLJ‹œ\˜[\ÊJ_\Ý]XÈ[˜ÛÙQÙ[™\Ú\ÊŠ^Ü™]\›Š›Ë˜Ü™X]RœÛÛ”œÔ™\]Y\Ý
J‹›Y]Ù
_\Ý]XÈ[˜ÛÙRX[
Š^Ü™]\›Š›Ë˜Ü™X]RœÛÛ”œÔ™\]Y\Ý
J‹›Y]Ù
_\Ý]XÈ[˜ÛÙS[U[˜ÛÛ™š\›YYÊŠ^Ü™]\›Š›Ë˜Ü™X]RœÛÛ”œÔ™\]Y\Ý
J‹›Y]Ù
_\Ý]XÈ[˜ÛÙTÝ]\ÊŠ^Ü™]\›Š›Ë˜Ü™X]RœÛÛ”œÔ™\]Y\Ý
J‹›Y]Ù
_\Ý]XÈ[˜ÛÙTÝXœØÜšX™JŠ^Û]^ÚÙ^NˆK™]™[‹˜[YN›‹œ]Y\žK\_KO^›™K˜Z[]Y\žJÝYÜÎ–ÝK˜]Î›‹œ]Y\žKœ˜]ßJNÜ™]\›Š›Ë˜Ü™X]RœÛÛ”œÔ™\]Y\Ý
JœÝXœØÜšX™H‹Ü]Y\žNš_J_\Ý]XÈ[˜ÛÙU
Š^Ü™]\›Š›Ë˜Ü™X]RœÛÛ”œÔ™\]Y\Ý
J‹›Y]Ù]J‹œ\˜[\ÊJ_\Ý]XÈ[˜ÛÙUÙX\˜Ú
Š^Ü™]\›Š›Ë˜Ü™X]RœÛÛ”œÔ™\]Y\Ý
J‹›Y]ÙJ‹œ\˜[\ÊJ_\Ý]XÈ[˜ÛÙU˜[Y]ÜœÊŠ^Ü™]\›Š›Ë˜Ü™X]RœÛÛ”œÔ™\]Y\Ý
J‹›Y]ÙJ‹œ\˜[\ÊJ__NÙÙ”\˜[\Ï[Œ_JNÝ˜\ˆÑÏRJ^OOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\J^K—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNØ^Kš\Ú\NØ^Kš\Ú›ØÚÏ\ÝNÝ˜\ˆLOUšJ
KÏ[ÞJ
NÙ[˜Ý[ÛˆJJ^Ü™]\›ŠLKœÚLMŠJJ_Y[˜Ý[Ûˆ]JJ^ÚYŠOJ]›ÝÈ™]È\œ›ÜŠØ[››ÝÜ][ˆ[\H™YHŠNÛ]LŠŠ“X]™›ÛÜŠX]›ÙÌŠJJNÜ™]\›ˆOÛŽ›‹ÌŸY[˜Ý[ÛˆÝJJ^Û][™]ÈLK”ÚLMŠZ[\œ˜^K™œ›ÛJÌJJNÜ™]\›ˆ‹\]JJK‹™YÙ\Ý

_Y[˜Ý[Ûˆ]JKŠ^Û][™]ÈLK”ÚLMŠZ[\œ˜^K™œ›ÛJÌWJJNÜ™]\›ˆ\]JJK\]JŠK™YÙ\Ý

_Y[˜Ý[ÛˆŒJJ^ÜÝÚ]Ú
K›[™Ý
^ØØ\ÙH›ÝÈ™]È\œ›ÜŠØ[››Ý\Ú[\H™YHŠNØØ\ÙHNœ™]\›ˆÝJVÌJNÙY˜][žÛ]Z]JK›[™Ý
K\ŒJKœÛXÙJŠJKO\ŒJKœÛXÙJŠJNÜ™]\›ˆ]JJ___Y[˜Ý[ÛˆÝJJ^ÚYŠYK›\Ý›ØÚÒY
]›ÝÈ™]È\œ›ÜŠ’\Ú[™ÈH›ØÚÈXY\ˆÚ]›È\Ý›ØÚÈQ
K™KˆXY\ˆ]ZYÚJH\È›ÝÝ\ÜYˆYˆ[ÝH™YY\ËÛÛšX][ÛœÈ\™HÙ[ÛÛYKˆX\ÙHYØÝ[Y[][Ûˆ[™\Ý™XÝÜœÈ›Üˆ\ÈØ\ÙKˆŠNÛ]VÊË™[˜ÛÙU™\œÚ[ÛŠJK™\œÚ[ÛŠK
Ë™[˜ÛÙTÝš[™ÊJK˜ÚZ[’Y
K
Ë™[˜ÛÙU]˜\š[
JKšZYÚ
K
Ë™[˜ÛÙU[YJJK[YJK
Ë™[˜ÛÙP›ØÚÒY
JK›\Ý›ØÚÒY
K
Ë™[˜ÛÙPž]\ÊJK›\ÝÛÛ[Z]\Ú
K
Ë™[˜ÛÙPž]\ÊJK™]R\Ú
K
Ë™[˜ÛÙPž]\ÊJK˜[Y]ÜœÒ\Ú
K
Ë™[˜ÛÙPž]\ÊJK›™^˜[Y]ÜœÒ\Ú
K
Ë™[˜ÛÙPž]\ÊJK˜ÛÛœÙ[œÝ\Ò\Ú
K
Ë™[˜ÛÙPž]\ÊJK˜\\Ú
K
Ë™[˜ÛÙPž]\ÊJK›\Ý™\Ý[Ò\Ú
K
Ë™[˜ÛÙPž]\ÊJK™]šY[˜ÙR\Ú
K
Ë™[˜ÛÙPž]\ÊJKœ›ÜÜÙ\Y™\ÜÊWNÜ™]\›ˆŒJŠ__JNÝ˜\ˆÏRJÏOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\JË—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÔË”™\ÜÛœÙ\Ï]›ÚYÔË™XÛÙQ]™[XÑÎÔË™XÛÙU˜[Y]Ü•\]OPQÎÔË™XÛÙU˜[Y]Ü‘Ù[™\Ú\ÏY‘ÎÔË™XÛÙU˜[Y]Ü’[™›ÏYNÝ˜\ˆ›R›Š
KÏU\Š
KÙÏ^YÊ
K]]J
K[›

KOP™Ê
KœÏ[ÞJ
KÝO\ÑÊ
NÙ[˜Ý[Ûˆ]JJ^Ü™]\›žÙ]N™K™]K\Ý›ØÚÒZYÚŠœË›X^JJ‹˜\UÔÛX[[K›\ÝØ›ØÚ×ÚZYÚ
K\Ý›ØÚÐ\\ÚŠœË›X^JJ›‹™œ›ÛP˜\ÙMK›\ÝØ›ØÚ×Ø\Ú\Ú
__Y[˜Ý[Ûˆ]JJ^Ü™]\›žÛÜÎ™K›ÜË›X\
OŠÝ\N›‹\KÙ^NŠ›‹™œ›ÛP˜\ÙM
J‹šÙ^JK]NŠ›‹™œ›ÛP˜\ÙM
J‹™]J_JJ__Y[˜Ý[ÛˆJJ^Ü™]\›žÚÙ^NŠ›‹™œ›ÛP˜\ÙM
J
‹šÚXÚÔÝš[™ÊJKšÙ^OÏÈˆŠJK˜[YNŠ›‹™œ›ÛP˜\ÙM
J
‹šÚXÚÔÝš[™ÊJK˜[YOÏÈˆŠJK›ÛÙŽŠœË›X^JJ]KKœ›ÛÙ“ÜÊKZYÚŠœË›X^JJ‹˜\UÔÛX[[KšZYÚ
KÛÙNŠœË›X^JJ‹˜\UÔÛX[[K˜ÛÙJKÛÙ\ÜXÙNŠ‹šÚXÚÔÝš[™ÊJK˜ÛÙ\ÜXÙOÏÈˆŠK[™^ŠœË›X^JJ‹˜\UÔÛX[[Kš[™^
KÙÎ™K›ÙË[™›ÎŠ‹šÚXÚÔÝš[™ÊJKš[™›ÏÏÈˆŠ__Y[˜Ý[ÛˆJJ^Ü™]\›žÚÙ^NŠ‹šÚXÚÓ›Û‘[\TÝš[™ÊJKšÙ^JK˜[YN™K˜[YOÏÈˆŸ_Y[˜Ý[ÛˆÝJJ^Ü™]\›Š‹šÚXÚÐ\œ˜^JJJK›X\
J_Y[˜Ý[ÛˆÑÊJ^Ü™]\›žÝ\N™K\K]šX]\Î™K˜]šX]\ÏÙÝJK˜]šX]\ÊN–×__Y[˜Ý[ÛˆÌJJ^Ü™]\›Š‹šÚXÚÐ\œ˜^JJJK›X\
ÑÊ_Y[˜Ý[Ûˆ
J^Ü™]\›žØÛÙNŠ‹˜\UÔÛX[[
J
‹šÚXÚÓ[X™\ŠJK˜ÛÙOÏÌ
JKÛÙ\ÜXÙN™K˜ÛÙ\ÜXÙKÙÎ™K›ÙË]NŠœË›X^JJ›‹™œ›ÛP˜\ÙMK™]JK]™[Î™K™]™[ÏÛÌJK™]™[ÊN–×KØ\ÕØ[YŠ‹˜\UÐšYÒ[
JK™Ø\×ÝØ[YÏÈŒŠKØ\Õ\ÙYŠ‹˜\UÐšYÒ[
JK™Ø\×Ý\ÙYÏÈŒŠ__Y[˜Ý[ÛˆÌJJ^ÚYŠ”Ý[Hš[ˆJ^Û]ÖÛ‹WOSØš™XÝ™[šY\ÊK”Ý[K˜[YJNÜ™]\›ŠË˜\ÜÙ\
JOOH™YMLNHŸOOHœÙXÜMšÌH‹[šÛ›ÝÛˆXšÙ^H\Nˆ	ÛŸX
KØ[ÛÜš]N›‹]NŠ›‹™œ›ÛP˜\ÙM
J
‹šÚXÚÓ›Û‘[\TÝš[™ÊJ
J__Y[ÙHÝÚ]Ú
K\J^ØØ\ÙH[™\›Z[ÔX’Ù^QYMLNHŽœ™]\›žØ[ÛÜš]Nˆ™YMLNH‹]NŠ›‹™œ›ÛP˜\ÙM
J
‹šÚXÚÓ›Û‘[\TÝš[™ÊJK˜[YJJ_NØØ\ÙH[™\›Z[ÔX’Ù^TÙXÜMšÌHŽœ™]\›žØ[ÛÜš]NˆœÙXÜMšÌH‹]NŠ›‹™œ›ÛP˜\ÙM
J
‹šÚXÚÓ›Û‘[\TÝš[™ÊJK˜[YJJ_NÙY˜][›ÝÈ™]È\œ›ÜŠ[šÛ›ÝÛˆXšÙ^H\Nˆ	ÙK\_X
__Y[˜Ý[ÛˆJJ^Ü™]\›žÛX^ž]\ÎŠ‹˜\UÔÛX[[
J
‹šÚXÚÓ›Û‘[\TÝš[™ÊJK›X^Øž]\ÊJKX^Ø\ÎŠ‹˜\UÔÛX[[
J
‹šÚXÚÓ›Û‘[\TÝš[™ÊJK›X^ÙØ\ÊJ__Y[˜Ý[Ûˆ]JJ^Ü™]\›žÛX^YÙS[P›ØÚÜÎŠ‹˜\UÔÛX[[
J
‹šÚXÚÓ›Û‘[\TÝš[™ÊJK›X^ØYÙWÛ[WØ›ØÚÜÊJKX^YÙQ\˜][ÛŽŠ‹˜\UÔÛX[[
J
‹šÚXÚÓ›Û‘[\TÝš[™ÊJK›X^ØYÙWÙ\˜][ÛŠJ__Y[˜Ý[ÛˆQÊJ^Ü™]\›žØ›ØÚÎ™K˜›ØÚÏÜJ
‹šÚXÚÓØš™XÝ
JK˜›ØÚÊJN›ÚY]šY[˜ÙN™K™]šY[˜ÙOÒ]J
‹šÚXÚÓØš™XÝ
JK™]šY[˜ÙJJN›ÚY_Y[˜Ý[ÛˆQÊJ^Ü™]\›žÜXšÙ^NœÌJ
‹šÚXÚÓØš™XÝ
JKœX—ÚÙ^JJK›Ý[™ÔÝÙ\ŽŠ‹˜\UÐšYÒ[
JKœÝÙ\ÏÈŒŠ__Y[˜Ý[ÛˆJJ^Ü™]\›žÚZYÚŠ‹˜\UÔÛX[[
J
‹šÚXÚÓ›Û‘[\TÝš[™ÊJKšZYÚ
JK™\Ý[ÎŠK×Ü™\Ý[ß×JK›X\

K˜[Y]Ü•\]\ÎŠK˜[Y]Ü—Ý\]\ß×JK›X\
QÊKÛÛœÙ[œÝ\Õ\]\ÎŠœË›X^JJQËK˜ÛÛœÙ[œÝ\×Ü\˜[WÝ\]\ÊK™YÚ[›ØÚÑ]™[Î›ÌJK˜™YÚ[—Ø›ØÚ×Ù]™[ß×JK[™›ØÚÑ]™[Î›ÌJK™[™Ø›ØÚ×Ù]™[ß×J__Y[˜Ý[ÛˆÞJJ^Ü™]\›žÚ\ÚŠ›‹™œ›ÛR^
J
‹šÚXÚÓ›Û‘[\TÝš[™ÊJKš\Ú
JK\ÎžÝÝ[Š‹šÚXÚÓ›Û–™\›Ó[X™\ŠJKœ\ËÝ[
K\ÚŠ›‹™œ›ÛR^
J
‹šÚXÚÓ›Û‘[\TÝš[™ÊJKœ\Ëš\Ú
J___Y[˜Ý[Ûˆ]JJ^Ü™]\›žØ›ØÚÎŠ‹˜\UÔÛX[[
JK˜›ØÚÊK\Š‹˜\UÔÛX[[
JK˜\ÏÌ
__Y[˜Ý[ÛˆJJ^Ü™]\›žÝ™\œÚ[ÛŽž]JK™\œÚ[ÛŠKÚZ[’YŠ‹šÚXÚÓ›Û‘[\TÝš[™ÊJK˜ÚZ[—ÚY
KZYÚŠ‹˜\UÔÛX[[
J
‹šÚXÚÓ›Û‘[\TÝš[™ÊJKšZYÚ
JK[YNŠÙË™œ›ÛT™˜ÌÌÌÎUÚ]˜[›ÜÙXÛÛ™ÊJ
‹šÚXÚÓ›Û‘[\TÝš[™ÊJK[YJJK\Ý›ØÚÒY™K›\ÝØ›ØÚ×ÚYš\ÚÜÞJK›\ÝØ›ØÚ×ÚY
N›[\ÝÛÛ[Z]\ÚŠ›‹™œ›ÛR^
J
‹šÚXÚÔÙ]
JK›\ÝØÛÛ[Z]Ú\Ú
JK]R\ÚŠ›‹™œ›ÛR^
J
‹šÚXÚÔÙ]
JK™]WÚ\Ú
JK˜[Y]ÜœÒ\ÚŠ›‹™œ›ÛR^
J
‹šÚXÚÔÙ]
JK˜[Y]Üœ×Ú\Ú
JK™^˜[Y]ÜœÒ\ÚŠ›‹™œ›ÛR^
J
‹šÚXÚÔÙ]
JK›™^Ý˜[Y]Üœ×Ú\Ú
JKÛÛœÙ[œÝ\Ò\ÚŠ›‹™œ›ÛR^
J
‹šÚXÚÔÙ]
JK˜ÛÛœÙ[œÝ\×Ú\Ú
JK\\ÚŠ›‹™œ›ÛR^
J
‹šÚXÚÔÙ]
JK˜\Ú\Ú
JK\Ý™\Ý[Ò\ÚŠ›‹™œ›ÛR^
J
‹šÚXÚÔÙ]
JK›\ÝÜ™\Ý[×Ú\Ú
JK]šY[˜ÙR\ÚŠ›‹™œ›ÛR^
J
‹šÚXÚÔÙ]
JK™]šY[˜ÙWÚ\Ú
JK›ÜÜÙ\Y™\ÜÎŠ›‹™œ›ÛR^
J
‹šÚXÚÓ›Û‘[\TÝš[™ÊJKœ›ÜÜÙ\—ØY™\ÜÊJ__Y[˜Ý[ÛˆJJ^Ü™]\›žØ›ØÚÒYœÞJK˜›ØÚ×ÚY
K›ØÚÔÚ^™NŠ‹˜\UÔÛX[[
J
‹šÚXÚÓ›Û‘[\TÝš[™ÊJK˜›ØÚ×ÜÚ^™JJKXY\Ž™JKšXY\ŠK[UÎŠ‹˜\UÔÛX[[
J
‹šÚXÚÓ›Û‘[\TÝš[™ÊJK›[WÝÊJ__Y[˜Ý[Ûˆ]JJ^Ü™]\›žÛ\ÝZYÚŠ‹˜\UÔÛX[[
J
‹šÚXÚÓ›Û‘[\TÝš[™ÊJK›\ÝÚZYÚ
JK›ØÚÓY]\ÎŠ‹šÚXÚÐ\œ˜^JJK˜›ØÚ×ÛY]\ÊK›X\
J__Y[˜Ý[ÛˆÝJJ^Ü™]\›žË‹‹›
JK\ÚŠ›‹™œ›ÛR^
J
‹šÚXÚÓ›Û‘[\TÝš[™ÊJKš\Ú
J__Y[˜Ý[ÛˆÝJJ^Ü™]\›žÚZYÚŠ‹˜\UÔÛX[[
JKšZYÚ
K\ÚŠ›‹™œ›ÛR^
J
‹šÚXÚÓ›Û‘[\TÝš[™ÊJKš\Ú
JKÚXÚÕ›

‹šÚXÚÓØš™XÝ
JK˜ÚXÚ×Ý
JK[]™\•ŠœË›X^JJK™[]™\—Ý
__Y[˜Ý[ÛˆÝJJ^Ü™]\›ŠË˜\ÜÙ\
JH[ˆK›ØÚÒY›YÊK_Y[˜Ý[Ûˆ]JJ^Ü™]\›žØ›ØÚÒY›YÎšÝJK˜›ØÚ×ÚYÙ›YÊK˜[Y]ÜY™\ÜÎ™K˜[Y]Ü—ØY™\ÜÏÊ›‹™œ›ÛR^
JK˜[Y]Ü—ØY™\ÜÊN›ÚY[Y\Ý[\™K[Y\Ý[\ÊÙË™œ›ÛT™˜ÌÌÌÎUÚ]˜[›ÜÙXÛÛ™ÊJK[Y\Ý[\
N›ÚYÚYÛ˜]\™N™KœÚYÛ˜]\™OÊ›‹™œ›ÛP˜\ÙM
JKœÚYÛ˜]\™JN›ÚY_Y[˜Ý[ÛˆÊJ^Ü™]\›žØ›ØÚÒYœÞJ
‹šÚXÚÓØš™XÝ
JK˜›ØÚ×ÚY
JKZYÚŠ‹˜\UÔÛX[[
J
‹šÚXÚÓ›Û‘[\TÝš[™ÊJKšZYÚ
JK›Ý[™Š‹˜\UÔÛX[[
JKœ›Ý[™
KÚYÛ˜]\™\ÎŠ‹šÚXÚÐ\œ˜^JJKœÚYÛ˜]\™\ÊK›X\
]J__Y[˜Ý[Ûˆ]JJ^Ü™]\›žØØ[›ÛšXØ[Š‹šÚXÚÐ›ÛÛX[ŠJK˜Ø[›ÛšXØ[
KXY\Ž™JKœÚYÛ™YÚXY\‹šXY\ŠKÛÛ[Z]›ÊKœÚYÛ™YÚXY\‹˜ÛÛ[Z]
__Y[˜Ý[Ûˆ‘ÊJ^Ü™]\›žØY™\ÜÎŠ›‹™œ›ÛR^
J
‹šÚXÚÓ›Û‘[\TÝš[™ÊJK˜Y™\ÜÊJKXšÙ^NœÌJ
‹šÚXÚÓØš™XÝ
JKœX—ÚÙ^JJK›Ý[™ÔÝÙ\ŽŠ‹˜\UÐšYÒ[
J
‹šÚXÚÓ›Û‘[\TÝš[™ÊJKœÝÙ\ŠJ__Y[˜Ý[ÛˆÝJJ^Ü™]\›žÙÙ[™\Ú\Õ[YNŠÙË™œ›ÛT™˜ÌÌÌÎUÚ]˜[›ÜÙXÛÛ™ÊJ
‹šÚXÚÓ›Û‘[\TÝš[™ÊJK™Ù[™\Ú\×Ý[YJJKÚZ[’YŠ‹šÚXÚÓ›Û‘[\TÝš[™ÊJK˜ÚZ[—ÚY
KÛÛœÙ[œÝ\Ô\˜[\ÎQÊK˜ÛÛœÙ[œÝ\×Ü\˜[\ÊK˜[Y]ÜœÎ™K˜[Y]ÜœÏÊ‹šÚXÚÐ\œ˜^JJK˜[Y]ÜœÊK›X\
‘ÊN–×K\\ÚŠ›‹™œ›ÛR^
J
‹šÚXÚÔÙ]
JK˜\Ú\Ú
JK\Ý]N™K˜\ÜÝ]__Y[˜Ý[ÛˆJJ^Ü™]\›žÜXšÙ^NœÌJ
‹šÚXÚÓØš™XÝ
JKœX—ÚÙ^JJK›Ý[™ÔÝÙ\ŽŠ‹˜\UÐšYÒ[
J
‹šÚXÚÓ›Û‘[\TÝš[™ÊJK›Ý[™×ÜÝÙ\ŠJKY™\ÜÎŠ›‹™œ›ÛR^
J
‹šÚXÚÓ›Û‘[\TÝš[™ÊJK˜Y™\ÜÊJK›ÜÜÙ\”š[Üš]N™Kœ›ÜÜÙ\—Üš[Üš]OÊ‹˜\UÔÛX[[
JKœ›ÜÜÙ\—Üš[Üš]JN›ÚY_Y[˜Ý[ÛˆJJ^Ü™]\›žÚYŠ›‹™œ›ÛR^
J
‹šÚXÚÓ›Û‘[\TÝš[™ÊJKšY
JK\Ý[YŽŠ‹šÚXÚÓ›Û‘[\TÝš[™ÊJK›\Ý[—ØYŠK™]ÛÜšÎŠ‹šÚXÚÓ›Û‘[\TÝš[™ÊJK›™]ÛÜšÊK™\œÚ[ÛŽŠ‹šÚXÚÔÝš[™ÊJK™\œÚ[ÛŠKÚ[›™[ÎŠ‹šÚXÚÔÝš[™ÊJK˜Ú[›™[ÊK[ÛšZÙ\ŽŠ‹šÚXÚÓ›Û‘[\TÝš[™ÊJK›[ÛšZÙ\ŠKÝ\ŽŠœË™XÝ[Û˜\žUÔÝš[™ÓX\
JK›Ý\ŠK›ÝØÛÛ™\œÚ[ÛŽžØ\Š‹˜\UÔÛX[[
J
‹šÚXÚÓ›Û‘[\TÝš[™ÊJKœ›ÝØÛÛÝ™\œÚ[Û‹˜\
JK›ØÚÎŠ‹˜\UÔÛX[[
J
‹šÚXÚÓ›Û‘[\TÝš[™ÊJKœ›ÝØÛÛÝ™\œÚ[Û‹˜›ØÚÊJKœŠ‹˜\UÔÛX[[
J
‹šÚXÚÓ›Û‘[\TÝš[™ÊJKœ›ÝØÛÛÝ™\œÚ[Û‹œœ
J___Y[˜Ý[ÛˆJJ^Û]YK™X\›Y\ÝØ›ØÚ×ÚZYÚÊ‹˜\UÔÛX[[
JK™X\›Y\ÝØ›ØÚ×ÚZYÚ
N›ÚYYK™X\›Y\ÝØ›ØÚ×Ý[YOÊÙË™œ›ÛT™˜ÌÌÌÎUÚ]˜[›ÜÙXÛÛ™ÊJK™X\›Y\ÝØ›ØÚ×Ý[YJN›ÚYÜ™]\›žÙX\›Y\Ý\\Ú™K™X\›Y\ÝØ\Ú\ÚÊ›‹™œ›ÛR^
JK™X\›Y\ÝØ\Ú\Ú
N›ÚYX\›Y\Ý›ØÚÒ\Ú™K™X\›Y\ÝØ›ØÚ×Ú\ÚÊ›‹™œ›ÛR^
JK™X\›Y\ÝØ›ØÚ×Ú\Ú
N›ÚYX\›Y\Ý›ØÚÒZYÚ›Ÿ›ÚYX\›Y\Ý›ØÚÕ[YNË™Ù][YJ
OÝ›ÚY]\Ý›ØÚÒ\ÚŠ›‹™œ›ÛR^
J
‹šÚXÚÓ›Û‘[\TÝš[™ÊJK›]\ÝØ›ØÚ×Ú\Ú
JK]\Ý\\ÚŠ›‹™œ›ÛR^
J
‹šÚXÚÓ›Û‘[\TÝš[™ÊJK›]\ÝØ\Ú\Ú
JK]\Ý›ØÚÕ[YNŠÙË™œ›ÛT™˜ÌÌÌÎUÚ]˜[›ÜÙXÛÛ™ÊJ
‹šÚXÚÓ›Û‘[\TÝš[™ÊJK›]\ÝØ›ØÚ×Ý[YJJK]\Ý›ØÚÒZYÚŠ‹˜\UÔÛX[[
J
‹šÚXÚÓ›Û‘[\TÝš[™ÊJK›]\ÝØ›ØÚ×ÚZYÚ
JKØ]Ú[™Õ\Š‹šÚXÚÐ›ÛÛX[ŠJK˜Ø]Ú[™×Ý\
__Y[˜Ý[ÛˆJJ^Ü™]\›žÛ›ÙR[™›Î˜JK››ÙWÚ[™›ÊKÞ[˜Ò[™›Î”JKœÞ[˜×Ú[™›ÊK˜[Y]Ü’[™›Î™JK˜[Y]Ü—Ú[™›Ê__Y[˜Ý[ÛˆJJ^Ü™]\›žÙ]NŠ›‹™œ›ÛP˜\ÙM
J
‹šÚXÚÓ›Û‘[\TÝš[™ÊJK™]JJK›ÛÝ\ÚŠ›‹™œ›ÛR^
J
‹šÚXÚÓ›Û‘[\TÝš[™ÊJKœ›ÛÝÚ\Ú
JK›ÛÙŽžÝÝ[Š‹˜\UÔÛX[[
J
‹šÚXÚÓ›Û‘[\TÝš[™ÊJKœ›ÛÙ‹Ý[
JK[™^Š‹˜\UÔÛX[[
J
‹šÚXÚÓ›Û‘[\TÝš[™ÊJKœ›ÛÙ‹š[™^
JKXY’\ÚŠ›‹™œ›ÛP˜\ÙM
J
‹šÚXÚÓ›Û‘[\TÝš[™ÊJKœ›ÛÙ‹›XY—Ú\Ú
JK][ÎŠ‹šÚXÚÐ\œ˜^JJKœ›ÛÙ‹˜][ÊK›X\
›‹™œ›ÛP˜\ÙM
___Y[˜Ý[ÛˆÑÊJ^Ü™]\›žÝŠ›‹™œ›ÛP˜\ÙM
J
‹šÚXÚÓ›Û‘[\TÝš[™ÊJK
JK™\Ý[›

‹šÚXÚÓØš™XÝ
JKÜ™\Ý[
JKZYÚŠ‹˜\UÔÛX[[
J
‹šÚXÚÓ›Û‘[\TÝš[™ÊJKšZYÚ
JK[™^Š‹˜\UÔÛX[[
J
‹šÚXÚÓ[X™\ŠJKš[™^
JK\ÚŠ›‹™œ›ÛR^
J
‹šÚXÚÓ›Û‘[\TÝš[™ÊJKš\Ú
JK›ÛÙŽŠœË›X^JJKKœ›ÛÙŠ__Y[˜Ý[ÛˆJJ^Ü™]\›žÝÝ[ÛÝ[Š‹˜\UÔÛX[[
J
‹šÚXÚÓ›Û‘[\TÝš[™ÊJKÝ[ØÛÝ[
JKÎŠ‹šÚXÚÐ\œ˜^JJKÊK›X\
ÑÊ__Y[˜Ý[ÛˆÝJJ^Û]J›‹™œ›ÛP˜\ÙM
J
‹šÚXÚÓ›Û‘[\TÝš[™ÊJK
JNÜ™]\›žÝ›‹\ÚŠÝKš\Ú
JŠK™\Ý[›
Kœ™\Ý[
KZYÚŠ‹˜\UÔÛX[[
J
‹šÚXÚÓ›Û‘[\TÝš[™ÊJKšZYÚ
J__Y[˜Ý[ÛˆJJ^Ü™]\›žØ›ØÚÒZYÚŠ‹˜\UÔÛX[[
J
‹šÚXÚÓ›Û‘[\TÝš[™ÊJK˜›ØÚ×ÚZYÚ
JK˜[Y]ÜœÎŠ‹šÚXÚÐ\œ˜^JJK˜[Y]ÜœÊK›X\
JKÛÝ[Š‹˜\UÔÛX[[
J
‹šÚXÚÓ›Û‘[\TÝš[™ÊJK˜ÛÝ[
JKÝ[Š‹˜\UÔÛX[[
J
‹šÚXÚÓ›Û‘[\TÝš[™ÊJKÝ[
J__Y[˜Ý[ÛˆÊJ^Ü™]\›žÚXY\Ž™J
‹šÚXÚÓØš™XÝ
JKšXY\ŠJK\ÝÛÛ[Z]™K›\ÝØÛÛ[Z]˜›ØÚ×ÚYš\ÚÛÊ
‹šÚXÚÓØš™XÝ
JK›\ÝØÛÛ[Z]
JN›[Î™K™]KÏÊ‹šÚXÚÐ\œ˜^JJK™]KÊK›X\
›‹™œ›ÛP˜\ÙM
N–×K]šY[˜ÙN™K™]šY[˜ÙOË™]šY[˜ÙOÏÖ×__Y[˜Ý[ÛˆQÊJ^Ü™]\›žØ›ØÚÒYœÞJK˜›ØÚ×ÚY
K›ØÚÎœÊK˜›ØÚÊ__Y[˜Ý[Ûˆ]JJ^Ü™]\›žÝÝ[ÛÝ[Š‹˜\UÔÛX[[
J
‹šÚXÚÓ›Û‘[\TÝš[™ÊJKÝ[ØÛÝ[
JK›ØÚÜÎŠ‹šÚXÚÐ\œ˜^JJK˜›ØÚÜÊK›X\
QÊ__Y[˜Ý[ÛˆJJ^Ü™]\›žÝÝ[Š‹˜\UÔÛX[[
J
‹šÚXÚÓ›Û‘[\TÝš[™ÊJKÝ[
JKÝ[ž]\ÎŠ‹˜\UÔÛX[[
J
‹šÚXÚÓ›Û‘[\TÝš[™ÊJKÝ[Øž]\ÊJ__]˜\ˆLOXÛ\ÜÈ^ÜÝ]XÈXÛÙPX˜ÚR[™›ÊŠ^Ü™]\›ˆ]J
‹šÚXÚÓØš™XÝ
J‹œ™\Ý[œ™\ÜÛœÙJJ_\Ý]XÈXÛÙPX˜ÚT]Y\žJŠ^Ü™]\›ˆJ
‹šÚXÚÓØš™XÝ
J‹œ™\Ý[œ™\ÜÛœÙJJ_\Ý]XÈXÛÙP›ØÚÊŠ^Ü™]\›ˆQÊ‹œ™\Ý[
_\Ý]XÈXÛÙP›ØÚÔ™\Ý[ÊŠ^Ü™]\›ˆJ‹œ™\Ý[
_\Ý]XÈXÛÙP›ØÚÔÙX\˜Ú
Š^Ü™]\›ˆ]J‹œ™\Ý[
_\Ý]XÈXÛÙP›ØÚØÚZ[ŠŠ^Ü™]\›ˆ]J‹œ™\Ý[
_\Ý]XÈXÛÙPœ›ØYØ\ÝÞ[˜ÊŠ^Ü™]\›ˆÝJ‹œ™\Ý[
_\Ý]XÈXÛÙPœ›ØYØ\Ý\Þ[˜ÊŠ^Ü™]\›ˆK™XÛÙPœ›ØYØ\ÝÞ[˜ÊŠ_\Ý]XÈXÛÙPœ›ØYØ\ÝÛÛ[Z]
Š^Ü™]\›ˆÝJ‹œ™\Ý[
_\Ý]XÈXÛÙPÛÛ[Z]
Š^Ü™]\›ˆ]J‹œ™\Ý[
_\Ý]XÈXÛÙQÙ[™\Ú\ÊŠ^Ü™]\›ˆÝJ
‹šÚXÚÓØš™XÝ
J‹œ™\Ý[™Ù[™\Ú\ÊJ_\Ý]XÈXÛÙRX[

^Ü™]\›ˆ[\Ý]XÈXÛÙS[U[˜ÛÛ™š\›YYÊŠ^Ü™]\›ˆJ‹œ™\Ý[
_\Ý]XÈXÛÙTÝ]\ÊŠ^Ü™]\›ˆJ‹œ™\Ý[
_\Ý]XÈXÛÙS™]Ð›ØÚÑ]™[
Š^Ü™]\›ˆÊ‹™]K˜[YK˜›ØÚÊ_\Ý]XÈXÛÙS™]Ð›ØÚÒXY\‘]™[
Š^Ü™]\›ˆJ‹™]K˜[YKšXY\Š_\Ý]XÈXÛÙU]™[
Š^Ü™]\›ˆÝJ‹™]K˜[YK•™\Ý[
_\Ý]XÈXÛÙU
Š^Ü™]\›ˆÑÊ‹œ™\Ý[
_\Ý]XÈXÛÙUÙX\˜Ú
Š^Ü™]\›ˆJ‹œ™\Ý[
_\Ý]XÈXÛÙU˜[Y]ÜœÊŠ^Ü™]\›ˆJ‹œ™\Ý[
__NÔË”™\ÜÛœÙ\ÏXL_JNÝ˜\ˆQÏRJ›OžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\J›—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÙ›”™\ÜÛœÙ\ÏY›”\˜[\Ï]›ÚYÝ˜\ˆOXQÊ
NÓØš™XÝ™Yš[™T›Ü\J›”\˜[\È‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆK”\˜[\ß_JNÝ˜\ˆOZÊ
NÓØš™XÝ™Yš[™T›Ü\J›”™\ÜÛœÙ\È‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆK”™\ÜÛœÙ\ß_J_JNÝ˜\ˆ‘ÏRJOžÈ\ÙHÝšXÝŽÝ˜\ˆO\	‰œ—×ØÜ™X]Pš[™[™ß
Øš™XÝ˜Ü™X]OÊ[˜Ý[ÛŠK‹J^ÚOOO]›ÚY	‰ŠO]
NÝ˜\ˆSØš™XÝ™Ù]ÝÛ”›Ü\Q\ØÜš\ÜŠ‹
NÊ\Ÿ
™Ù]š[ˆÈ[‹—×Ù\Ó[Ù[Nœ‹Üš]X›_‹˜ÛÛ™šYÝ\˜X›JJI‰Š^Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ–Ý__JKØš™XÝ™Yš[™T›Ü\JKKŠ_JNŠ[˜Ý[ÛŠK‹J^ÚOOO]›ÚY	‰ŠO]
KVÚWO[–Ý_JJK]O\	‰œ—×ÜÙ][Ù[QY˜][
Øš™XÝ˜Ü™X]OÊ[˜Ý[ÛŠKŠ^ÓØš™XÝ™Yš[™T›Ü\JK™Y˜][‹Ù[[Y\˜X›NˆL˜[YN›ŸJ_JN™[˜Ý[ÛŠKŠ^ÙK™Y˜][[ŸJKO\	‰œ—×Ú[\ÜÝ\Ÿ
[˜Ý[ÛŠ
^Ý˜\ˆOY[˜Ý[ÛŠŠ^Ü™]\›ˆOSØš™XÝ™Ù]ÝÛ”›Ü\S˜[Y\ß[˜Ý[ÛŠ
^Ý˜\ˆOV×NÙ›ÜŠ˜\ˆˆ[ˆ
SØš™XÝœ›ÝÝ\Kš\ÓÝÛ”›Ü\K˜Ø[
ŠI‰ŠVÚK›[™ÝO\ŠNÜ™]\›ˆ_KJŠ_NÜ™]\›ˆ[˜Ý[ÛŠŠ^ÚYŠ‰‰›‹—×Ù\Ó[Ù[J\™]\›ˆŽÝ˜\ˆ^ßNÚYŠˆO[[
Y›ÜŠ˜\ˆOYJŠKLÜK›[™ÝÜŠÊÊZVÜ—HOOH™Y˜][‰‰‘J‹VÜ—JNÜ™]\›ˆ]JŠK_JJ
NÓØš™XÝ™Yš[™T›Ü\J—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÜ•[™\›Z[ÍÐÛY[]›ÚYÝ˜\ˆÞORYÊ
KÝ^QÊ
KœRJ^J
JKÌOXÛ\ÜÈ^ÜÝ]XÈ\Þ[˜ÈÛÛ›™XÝ
Š^Û]Ü™]\›ˆ\[ÙˆOH›Øš™XÝÝ[™]ÈÞK’ÛY[
ŠN[‹œÝ\ÕÚ]
š‹ËÈŠ_‹œÝ\ÕÚ]
šÎ‹ËÈŠOÛ™]ÈÞK’ÛY[
ŠN›™]ÈÞK•ÙXœÛØÚÙ]ÛY[
ŠKK˜Ü™X]J
_\Ý]XÈÜ™X]JŠ^Ü™]\›ˆ™]ÈJŠ_XÛY[ØÛÛœÝXÝÜŠŠ^Ý\Ë˜ÛY[[ŸY\ØÛÛ›™XÝ

^Ý\Ë˜ÛY[™\ØÛÛ›™XÝ

_X\Þ[˜ÈX˜ÚR[™›Ê
^Û]^ÛY]Ù“œ‹“Y]ÙX˜ÚR[™›ßNÜ™]\›ˆ\Ë™ÐØ[
‹Ý”\˜[\Ë™[˜ÛÙPX˜ÚR[™›ËÝ”™\ÜÛœÙ\Ë™XÛÙPX˜ÚR[™›Ê_X\Þ[˜ÈX˜ÚT]Y\žJŠ^Û]^Ü\˜[\Î›‹Y]Ù“œ‹“Y]ÙX˜ÚT]Y\ž_NÜ™]\›ˆ\Ë™ÐØ[
Ý”\˜[\Ë™[˜ÛÙPX˜ÚT]Y\žKÝ”™\ÜÛœÙ\Ë™XÛÙPX˜ÚT]Y\žJ_X\Þ[˜È›ØÚÊŠ^Û]^ÛY]Ù“œ‹“Y]Ù›ØÚË\˜[\ÎžÚZYÚ›Ÿ_NÜ™]\›ˆ\Ë™ÐØ[
Ý”\˜[\Ë™[˜ÛÙP›ØÚËÝ”™\ÜÛœÙ\Ë™XÛÙP›ØÚÊ_X\Þ[˜È›ØÚÔ™\Ý[ÊŠ^Û]^ÛY]Ù“œ‹“Y]Ù›ØÚÔ™\Ý[Ë\˜[\ÎžÚZYÚ›Ÿ_NÜ™]\›ˆ\Ë™ÐØ[
Ý”\˜[\Ë™[˜ÛÙP›ØÚÔ™\Ý[ËÝ”™\ÜÛœÙ\Ë™XÛÙP›ØÚÔ™\Ý[Ê_X\Þ[˜È›ØÚÔÙX\˜Ú
Š^Û]^Ü\˜[\Î›‹Y]Ù“œ‹“Y]Ù›ØÚÔÙX\˜ÚKOX]ØZ]\Ë™ÐØ[
Ý”\˜[\Ë™[˜ÛÙP›ØÚÔÙX\˜ÚÝ”™\ÜÛœÙ\Ë™XÛÙP›ØÚÔÙX\˜Ú
NÜ™]\›žË‹‹šK›ØÚÜÎ–Ë‹‹šK˜›ØÚÜ×KœÛÜ

‹ÊOOœ‹˜›ØÚËšXY\‹šZYÚ[Ë˜›ØÚËšXY\‹šZYÚ
__X\Þ[˜È›ØÚÔÙX\˜Ú[
Š^Û][‹œYÙ_KOV×KHLNÙ›ÜŠÈ\ŽÊ^Û]ÏX]ØZ]\Ë˜›ØÚÔÙX\˜Ú
Ë‹‹›‹YÙNJNÚKœ\Ú
‹‹›Ë˜›ØÚÜÊKK›[™ÝËÝ[ÛÝ[Ý
ÊÎœHL\™]\›ˆKœÛÜ

ËJOO›Ë˜›ØÚËšXY\‹šZYÚXK˜›ØÚËšXY\‹šZYÚ
KÝÝ[ÛÝ[šK›[™Ý›ØÚÜÎš__X\Þ[˜È›ØÚØÚZ[Š‹
^Û]O^ÛY]Ù“œ‹“Y]Ù›ØÚØÚZ[‹\˜[\ÎžÛZ[’ZYÚ›‹X^ZYÚ_NÜ™]\›ˆ\Ë™ÐØ[
KÝ”\˜[\Ë™[˜ÛÙP›ØÚØÚZ[‹Ý”™\ÜÛœÙ\Ë™XÛÙP›ØÚØÚZ[Š_X\Þ[˜Èœ›ØYØ\ÝÞ[˜ÊŠ^Û]^Ü\˜[\Î›‹Y]Ù“œ‹“Y]Ùœ›ØYØ\ÝÞ[˜ßNÜ™]\›ˆ\Ë™ÐØ[
Ý”\˜[\Ë™[˜ÛÙPœ›ØYØ\ÝÝ”™\ÜÛœÙ\Ë™XÛÙPœ›ØYØ\ÝÞ[˜Ê_X\Þ[˜Èœ›ØYØ\Ý\Þ[˜ÊŠ^Û]^Ü\˜[\Î›‹Y]Ù“œ‹“Y]Ùœ›ØYØ\Ý\Þ[˜ßNÜ™]\›ˆ\Ë™ÐØ[
Ý”\˜[\Ë™[˜ÛÙPœ›ØYØ\ÝÝ”™\ÜÛœÙ\Ë™XÛÙPœ›ØYØ\Ý\Þ[˜Ê_X\Þ[˜Èœ›ØYØ\ÝÛÛ[Z]
Š^Û]^Ü\˜[\Î›‹Y]Ù“œ‹“Y]Ùœ›ØYØ\ÝÛÛ[Z]NÜ™]\›ˆ\Ë™ÐØ[
Ý”\˜[\Ë™[˜ÛÙPœ›ØYØ\ÝÝ”™\ÜÛœÙ\Ë™XÛÙPœ›ØYØ\ÝÛÛ[Z]
_X\Þ[˜ÈÛÛ[Z]
Š^Û]^ÛY]Ù“œ‹“Y]ÙÛÛ[Z]\˜[\ÎžÚZYÚ›Ÿ_NÜ™]\›ˆ\Ë™ÐØ[
Ý”\˜[\Ë™[˜ÛÙPÛÛ[Z]Ý”™\ÜÛœÙ\Ë™XÛÙPÛÛ[Z]
_X\Þ[˜ÈÙ[™\Ú\Ê
^Û]^ÛY]Ù“œ‹“Y]Ù‘Ù[™\Ú\ßNÜ™]\›ˆ\Ë™ÐØ[
‹Ý”\˜[\Ë™[˜ÛÙQÙ[™\Ú\ËÝ”™\ÜÛœÙ\Ë™XÛÙQÙ[™\Ú\Ê_X\Þ[˜ÈX[

^Û]^ÛY]Ù“œ‹“Y]Ù’X[NÜ™]\›ˆ\Ë™ÐØ[
‹Ý”\˜[\Ë™[˜ÛÙRX[Ý”™\ÜÛœÙ\Ë™XÛÙRX[
_X\Þ[˜È[U[˜ÛÛ™š\›YYÊ
^Û]^ÛY]Ù“œ‹“Y]Ù“[U[˜ÛÛ™š\›YYßNÜ™]\›ˆ\Ë™ÐØ[
‹Ý”\˜[\Ë™[˜ÛÙS[U[˜ÛÛ™š\›YYËÝ”™\ÜÛœÙ\Ë™XÛÙS[U[˜ÛÛ™š\›YYÊ_X\Þ[˜ÈÝ]\Ê
^Û]^ÛY]Ù“œ‹“Y]Ù”Ý]\ßNÜ™]\›ˆ\Ë™ÐØ[
‹Ý”\˜[\Ë™[˜ÛÙTÝ]\ËÝ”™\ÜÛœÙ\Ë™XÛÙTÝ]\Ê_\ÝXœØÜšX™S™]Ð›ØÚÊ
^Û]^ÛY]Ù“œ‹“Y]Ù”ÝXœØÜšX™K]Y\žNžÝ\N“œ‹”ÝXœØÜš\[Û‘]™[\K“™]Ð›ØÚß_NÜ™]\›ˆ\ËœÝXœØÜšX™J‹Ý”™\ÜÛœÙ\Ë™XÛÙS™]Ð›ØÚÑ]™[
_\ÝXœØÜšX™S™]Ð›ØÚÒXY\Š
^Û]^ÛY]Ù“œ‹“Y]Ù”ÝXœØÜšX™K]Y\žNžÝ\N“œ‹”ÝXœØÜš\[Û‘]™[\K“™]Ð›ØÚÒXY\Ÿ_NÜ™]\›ˆ\ËœÝXœØÜšX™J‹Ý”™\ÜÛœÙ\Ë™XÛÙS™]Ð›ØÚÒXY\‘]™[
_\ÝXœØÜšX™U
Š^Û]^ÛY]Ù“œ‹“Y]Ù”ÝXœØÜšX™K]Y\žNžÝ\N“œ‹”ÝXœØÜš\[Û‘]™[\K•˜]Î›Ÿ_NÜ™]\›ˆ\ËœÝXœØÜšX™JÝ”™\ÜÛœÙ\Ë™XÛÙU]™[
_X\Þ[˜È
Š^Û]^Ü\˜[\Î›‹Y]Ù“œ‹“Y]Ù•NÜ™]\›ˆ\Ë™ÐØ[
Ý”\˜[\Ë™[˜ÛÙUÝ”™\ÜÛœÙ\Ë™XÛÙU
_X\Þ[˜ÈÙX\˜Ú
Š^Û]^Ü\˜[\Î›‹Y]Ù“œ‹“Y]Ù•ÙX\˜ÚNÜ™]\›ˆ\Ë™ÐØ[
Ý”\˜[\Ë™[˜ÛÙUÙX\˜ÚÝ”™\ÜÛœÙ\Ë™XÛÙUÙX\˜Ú
_X\Þ[˜ÈÙX\˜Ú[
Š^Û][‹œYÙ_KOV×KHLNÙ›ÜŠÈ\ŽÊ^Û]ÏX]ØZ]\ËÙX\˜Ú
Ë‹‹›‹YÙNJNÚKœ\Ú
‹‹›ËÊKK›[™ÝËÝ[ÛÝ[Ý
ÊÎœHL\™]\›žÝÝ[ÛÝ[šK›[™ÝÎš__X\Þ[˜È˜[Y]ÜœÊŠ^Û]^ÛY]Ù“œ‹“Y]Ù•˜[Y]ÜœË\˜[\Î›ŸNÜ™]\›ˆ\Ë™ÐØ[
Ý”\˜[\Ë™[˜ÛÙU˜[Y]ÜœËÝ”™\ÜÛœÙ\Ë™XÛÙU˜[Y]ÜœÊ_X\Þ[˜È˜[Y]ÜœÐ[
Š^Û]V×KOLKHLKÏ[ŽÙ›ÜŠÈ\ŽÊ^Û]OX]ØZ]\Ë˜[Y]ÜœÊÜ\—ÜYÙNLZYÚ›ËYÙNš_JNÝœ\Ú
‹‹˜K˜[Y]ÜœÊKÏ[ßK˜›ØÚÒZYÚ›[™ÝKÝ[ÚJÊÎœHL\™]\›žØ›ØÚÒZYÚ›ÏÏÌÛÝ[›[™ÝÝ[›[™Ý˜[Y]ÜœÎ_X\Þ[˜ÈÐØ[
‹J^Û]]
ŠKÏX]ØZ]\Ë˜ÛY[™^XÝ]JŠNÜ™]\›ˆJÊ_\ÝXœØÜšX™J‹
^ÚYŠJÞKš[œÝ[˜ÙSÙ”œÔÝ™X[Z[™ÐÛY[
J\Ë˜ÛY[
J]›ÝÈ™]È\œ›ÜŠ•\È”ÈÛY[\HØ[››ÝÝXœØÜšX™HÈ]™[ÈŠNÛ]O[Ý”\˜[\Ë™[˜ÛÙTÝXœØÜšX™JŠNÜ™]\›ˆ\Ë˜ÛY[›\Ý[ŠJK›X\
ÏO
ÊJ__NÜ•[™\›Z[ÍÐÛY[XÌ_JNÝ˜\ˆ^ORJ[ÏOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\J[Ë—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÖ[Ë•[™\›Z[ÍÐÛY[V[Ë•›ÝU\OV[Ë˜œ›ØYØ\ÝÞ[˜ÔÝXØÙ\ÜÏV[Ë˜œ›ØYØ\ÝÛÛ[Z]ÝXØÙ\ÜÏV[Ë”ÝXœØÜš\[Û‘]™[\OV[Ë“Y]Ù]›ÚYÝ˜\ˆQÏZ^J
NÓØš™XÝ™Yš[™T›Ü\J[Ë“Y]Ù‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆQË“Y]Ù_JNÓØš™XÝ™Yš[™T›Ü\J[Ë”ÝXœØÜš\[Û‘]™[\H‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆQË”ÝXœØÜš\[Û‘]™[\__JNÝ˜\ˆLO[ÑÊ
NÓØš™XÝ™Yš[™T›Ü\J[Ë˜œ›ØYØ\ÝÛÛ[Z]ÝXØÙ\ÜÈ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆLK˜œ›ØYØ\ÝÛÛ[Z]ÝXØÙ\Üß_JNÓØš™XÝ™Yš[™T›Ü\J[Ë˜œ›ØYØ\ÝÞ[˜ÔÝXØÙ\ÜÈ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆLK˜œ›ØYØ\ÝÞ[˜ÔÝXØÙ\Üß_JNÓØš™XÝ™Yš[™T›Ü\J[Ë•›ÝU\H‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆLK•›ÝU\__JNÝ˜\ˆ]OP‘Ê
NÓØš™XÝ™Yš[™T›Ü\J[Ë•[™\›Z[ÍÐÛY[‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ]K•[™\›Z[ÍÐÛY[_J_JNÝ˜\ˆQÏRJÛOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\JÛ—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÙÛš\Õ[™\›Z[ÍÐÛY[WÝNÙÛš\ÐÛÛY]ÎÛY[QÝNÙÛš\ÐÛÛY]PÛY[UNÙÛ˜ÛÛ›™XÝÛÛY]RÝNÝ˜\ˆÑÏVš

KÑÏ\žJ
KÑÏ]^J
NÙ[˜Ý[ÛˆÝJJ^Ü™]\›ˆH[œÝ[˜Ù[ÙˆÑË•[™\›Z[ÍÐÛY[Y[˜Ý[ÛˆÝJJ^Ü™]\›ˆH[œÝ[˜Ù[ÙˆÑËÛÛY]ÎÛY[Y[˜Ý[ÛˆJJ^Ü™]\›ˆH[œÝ[˜Ù[ÙˆÑËÛÛY]PÛY[X\Þ[˜È[˜Ý[ÛˆÝJJ^Û]‹X]ØZ]ÑË•[™\›Z[ÍÐÛY[˜ÛÛ›™XÝ
JKOJ]ØZ]œÝ]\Ê
JK››ÙR[™›Ë™\œÚ[ÛŽÜ™]\›ˆKœÝ\ÕÚ]
ŒŒÍËˆŠOÛ]šKœÝ\ÕÚ]
ŒŒÎˆŠOÊ™\ØÛÛ›™XÝ

KX]ØZ]ÑËÛÛY]ÎÛY[˜ÛÛ›™XÝ
JJNšKœÝ\ÕÚ]
ŒKˆŠOÊ™\ØÛÛ›™XÝ

KX]ØZ]ÑËÛÛY]PÛY[˜ÛÛ›™XÝ
JJN›]Ÿ_JNÝ˜\ˆŒORJ›OžÈ\ÙHÝšXÝŽÝ˜\ˆÝO[›‰‰››‹—×ØÜ™X]Pš[™[™ß
Øš™XÝ˜Ü™X]OÊ[˜Ý[ÛŠK‹J^ÚOOO]›ÚY	‰ŠO]
NÝ˜\ˆSØš™XÝ™Ù]ÝÛ”›Ü\Q\ØÜš\ÜŠ‹
NÊ\Ÿ
™Ù]š[ˆÈ[‹—×Ù\Ó[Ù[Nœ‹Üš]X›_‹˜ÛÛ™šYÝ\˜X›JJI‰Š^Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ–Ý__JKØš™XÝ™Yš[™T›Ü\JKKŠ_JNŠ[˜Ý[ÛŠK‹J^ÚOOO]›ÚY	‰ŠO]
KVÚWO[–Ý_JJKO[›‰‰››‹—×ÜÙ][Ù[QY˜][
Øš™XÝ˜Ü™X]OÊ[˜Ý[ÛŠKŠ^ÓØš™XÝ™Yš[™T›Ü\JK™Y˜][‹Ù[[Y\˜X›NˆL˜[YN›ŸJ_JN™[˜Ý[ÛŠKŠ^ÙK™Y˜][[ŸJKLO[›‰‰››‹—×Ú[\ÜÝ\Ÿ
[˜Ý[ÛŠ
^Ý˜\ˆOY[˜Ý[ÛŠŠ^Ü™]\›ˆOSØš™XÝ™Ù]ÝÛ”›Ü\S˜[Y\ß[˜Ý[ÛŠ
^Ý˜\ˆOV×NÙ›ÜŠ˜\ˆˆ[ˆ
SØš™XÝœ›ÝÝ\Kš\ÓÝÛ”›Ü\K˜Ø[
ŠI‰ŠVÚK›[™ÝO\ŠNÜ™]\›ˆ_KJŠ_NÜ™]\›ˆ[˜Ý[ÛŠŠ^ÚYŠ‰‰›‹—×Ù\Ó[Ù[J\™]\›ˆŽÝ˜\ˆ^ßNÚYŠˆO[[
Y›ÜŠ˜\ˆOYJŠKLÜK›[™ÝÜŠÊÊZVÜ—HOOH™Y˜][‰‰•ÝJ‹VÜ—JNÜ™]\›ˆJŠK_JJ
NÓØš™XÝ™Yš[™T›Ü\J›‹—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÛ›‹›ØÚÒY›YÏ[›‹š\Õ[™\›Z[ÍÐÛY[[›‹š\ÐÛÛY]ÎÛY[[›‹š\ÐÛÛY]PÛY[[›‹˜ÛÛ›™XÝÛÛY][›‹•[™\›Z[ÍÐÛY[[›‹[™\›Z[ÍÏ[›‹•ÙXœÛØÚÙ]ÛY[[›‹’ÛY[[›‹’˜]ÚÛY[[›‹ÔÙXÛÛ™Ï[›‹Ô™˜ÌÌÌÎUÚ]˜[›ÜÙXÛÛ™Ï[›‹™œ›ÛTÙXÛÛ™Ï[›‹™œ›ÛT™˜ÌÌÌÎUÚ]˜[›ÜÙXÛÛ™Ï[›‹‘]U[YO[›‹ÛÛY]ÎÛY[[›‹˜ÛÛY]Î[›‹ÛÛY]PÛY[[›‹˜ÛÛY]O[›‹œ˜]ÔÙXÜMšÌTXšÙ^UÔ˜]ÐY™\ÜÏ[›‹œ˜]ÑYMLNTXšÙ^UÔ˜]ÐY™\ÜÏ[›‹œXšÙ^UÔ˜]ÐY™\ÜÏ[›‹œXšÙ^UÐY™\ÜÏ]›ÚYÝ˜\ˆ^ORJ
NÓØš™XÝ™Yš[™T›Ü\J›‹œXšÙ^UÐY™\ÜÈ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ^KœXšÙ^UÐY™\Üß_JNÓØš™XÝ™Yš[™T›Ü\J›‹œXšÙ^UÔ˜]ÐY™\ÜÈ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ^KœXšÙ^UÔ˜]ÐY™\Üß_JNÓØš™XÝ™Yš[™T›Ü\J›‹œ˜]ÑYMLNTXšÙ^UÔ˜]ÐY™\ÜÈ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ^Kœ˜]ÑYMLNTXšÙ^UÔ˜]ÐY™\Üß_JNÓØš™XÝ™Yš[™T›Ü\J›‹œ˜]ÔÙXÜMšÌTXšÙ^UÔ˜]ÐY™\ÜÈ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ^Kœ˜]ÔÙXÜMšÌTXšÙ^UÔ˜]ÐY™\Üß_JNÛ›‹˜ÛÛY]OPLJš

JNÝ˜\ˆ]OVš

NÓØš™XÝ™Yš[™T›Ü\J›‹ÛÛY]PÛY[‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ]KÛÛY]PÛY[_JNÛ›‹˜ÛÛY]ÎPLJžJ
JNÝ˜\ˆO\žJ
NÓØš™XÝ™Yš[™T›Ü\J›‹ÛÛY]ÎÛY[‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆKÛÛY]ÎÛY[_JNÝ˜\ˆÙÏ^YÊ
NÓØš™XÝ™Yš[™T›Ü\J›‹‘]U[YH‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆÙË‘]U[Y__JNÓØš™XÝ™Yš[™T›Ü\J›‹™œ›ÛT™˜ÌÌÌÎUÚ]˜[›ÜÙXÛÛ™È‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆÙË™œ›ÛT™˜ÌÌÌÎUÚ]˜[›ÜÙXÛÛ™ß_JNÓØš™XÝ™Yš[™T›Ü\J›‹™œ›ÛTÙXÛÛ™È‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆÙË™œ›ÛTÙXÛÛ™ß_JNÓØš™XÝ™Yš[™T›Ü\J›‹Ô™˜ÌÌÌÎUÚ]˜[›ÜÙXÛÛ™È‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆÙËÔ™˜ÌÌÌÎUÚ]˜[›ÜÙXÛÛ™ß_JNÓØš™XÝ™Yš[™T›Ü\J›‹ÔÙXÛÛ™È‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆÙËÔÙXÛÛ™ß_JNÝ˜\ˆORYÊ
NÓØš™XÝ™Yš[™T›Ü\J›‹’˜]ÚÛY[‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆK’˜]ÚÛY[_JNÓØš™XÝ™Yš[™T›Ü\J›‹’ÛY[‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆK’ÛY[_JNÓØš™XÝ™Yš[™T›Ü\J›‹•ÙXœÛØÚÙ]ÛY[‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆK•ÙXœÛØÚÙ]ÛY[_JNÛ›‹[™\›Z[ÍÏPLJ^J
JNÝ˜\ˆO]^J
NÓØš™XÝ™Yš[™T›Ü\J›‹•[™\›Z[ÍÐÛY[‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆK•[™\›Z[ÍÐÛY[_JNÝ˜\ˆOQQÊ
NÓØš™XÝ™Yš[™T›Ü\J›‹˜ÛÛ›™XÝÛÛY]‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆK˜ÛÛ›™XÝÛÛY]_JNÓØš™XÝ™Yš[™T›Ü\J›‹š\ÐÛÛY]PÛY[‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆKš\ÐÛÛY]PÛY[_JNÓØš™XÝ™Yš[™T›Ü\J›‹š\ÐÛÛY]ÎÛY[‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆKš\ÐÛÛY]ÎÛY[_JNÓØš™XÝ™Yš[™T›Ü\J›‹š\Õ[™\›Z[ÍÐÛY[‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆKš\Õ[™\›Z[ÍÐÛY[_JNÝ˜\ˆOP™Ê
NÓØš™XÝ™Yš[™T›Ü\J›‹›ØÚÒY›YÈ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆK›ØÚÒY›Yß_J_JNÝ˜\ˆLORJ˜OOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\J˜K—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÑ˜K”Ý\™Ø]PÛY[Q˜Kœ›ØYØ\Ý\œ›ÜQ˜K•[Y[Ý]\œ›Ü]›ÚYÑ˜Kš\Ñ[]™\•˜Z[\™O\NÑ˜Kš\Ñ[]™\•ÝXØÙ\ÜÏX‘ÎÑ˜K˜\ÜÙ\\Ñ[]™\•ÝXØÙ\ÜÏZ\™NÑ˜K˜\ÜÙ\\Ñ[]™\•˜Z[\™O[Ü™NÝ˜\ˆ	OV˜J
KžOR›Š
KQÏXšJ
KÑÏYŒJ
KÞOU\Š
KOYÝŠ
K\™OYÊ
Kœ™O[Ê
KOPÚ

K™OY›Ê
Kœ™ORÝŠ
K^OXÛ\ÜÈ^[™È\œ›ÜžÝYØÛÛœÝXÝÜŠ‹
^ÜÝ\\ŠŠK\Ë›˜[YO]\Ë˜ÛÛœÝXÝÜ‹›˜[YK\ËY]_NÑ˜K•[Y[Ý]\œ›ÜR^NÙ[˜Ý[ÛˆJJ^Ü™]\›ˆHYK˜ÛÙ_Y[˜Ý[Ûˆ‘ÊJ^Ü™]\›ˆ\JJ_Y[˜Ý[Ûˆ\™JJ^ÚYŠJJJ]›ÝÈ™]È\œ›ÜŠ\œ›ÜˆÚ[ˆœ›ØYØ\Ý[™È	ÙK˜[œØXÝ[Û’\ÚH]ZYÚ	ÙKšZYÚKˆÛÙNˆ	ÙK˜ÛÙ_NÈ˜]ÈÙÎˆ	ÙKœ˜]ÓÙßX
_Y[˜Ý[ÛˆÜ™JJ^ÚYŠ‘ÊJJ]›ÝÈ™]È\œ›ÜŠ˜[œØXÝ[Ûˆ	ÙK˜[œØXÝ[Û’\ÚHY›Ý˜Z[]ZYÚ	ÙKšZYÚKˆÛÙNˆ	ÙK˜ÛÙ_NÈ˜]ÈÙÎˆ	ÙKœ˜]ÓÙßX
_]˜\ˆOXÛ\ÜÈ^[™È\œ›ÜžØÛÙNØÛÙ\ÜXÙNÛÙÎØÛÛœÝXÝÜŠ‹J^ÜÝ\\Šœ›ØYØ\Ý[™È˜[œØXÝ[Ûˆ˜Z[YÚ]ÛÙH	ÛŸH
ÛÙ\ÜXÙNˆ	ÝJKˆÙÎˆ	Ú_X
K\Ë›˜[YO]\Ë˜ÛÛœÝXÝÜ‹›˜[YK\Ë˜ÛÙO[‹\Ë˜ÛÙ\ÜXÙO]\Ë›ÙÏZ__NÑ˜Kœ›ØYØ\Ý\œ›ÜZNÝ˜\ˆÌOXÛ\ÜÈ^ØÛÛY]ÛY[Ü]Y\žPÛY[ØÚZ[’YØXØÛÝ[\œÙ\ŽÜÝ]XÈ\Þ[˜ÈÛÛ›™XÝ
‹^ßJ^Û]OX]ØZ]
ÑË˜ÛÛ›™XÝÛÛY]
JŠNÜ™]\›ˆK˜Ü™X]JK
_\Ý]XÈÜ™X]J‹^ßJ^Ü™]\›ˆ™]ÈJ‹
_XÛÛœÝXÝÜŠ‹
^Û‰‰Š\Ë˜ÛÛY]ÛY[[‹\Ëœ]Y\žPÛY[]™K”]Y\žPÛY[Ú]^[œÚ[ÛœÊ‹KœÙ]\]]^[œÚ[Û‹KœÙ]\˜[šÑ^[œÚ[Û‹KœÙ]\ÝZÚ[™Ñ^[œÚ[Û‹KœÙ]\^[œÚ[ÛŠJNÛ]ØXØÛÝ[\œÙ\ŽšOY\™K˜XØÛÝ[œ›ÛP[ž_O]Ý\Ë˜XØÛÝ[\œÙ\Z_YÙ]ÛÛY]ÛY[

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
ÞK˜\ÜÙ\
J[œÝ[˜Ù[Ùˆ\œ›ÜŠKÜœÈ\œ›ÜŽˆÛÙHH›Ý›Ý[™ÚK\Ý
ÔÝš[™Ê
JJ\™]\›ˆ[Ý›ÝÈ_X\Þ[˜ÈÙ]Ù\]Y[˜ÙJŠ^Û]X]ØZ]\Ë™Ù]XØÛÝ[
ŠNÚYŠ]
]›ÝÈ™]È\œ›ÜŠXØÛÝ[	ÉÛŸIÈÙ\È›Ý^\ÝÛˆÚZ[‹ˆÙ[™ÛÛYHÚÙ[œÈ\™H™Y›Ü™HžZ[™ÈÈ]Y\žHÙ\]Y[˜ÙK˜
NÜ™]\›žØXØÛÝ[[X™\Ž˜XØÛÝ[[X™\‹Ù\]Y[˜ÙNœÙ\]Y[˜Ù__X\Þ[˜ÈÙ]›ØÚÊŠ^Û]X]ØZ]\Ë™›Ü˜ÙQÙ]ÛÛY]ÛY[

K˜›ØÚÊŠNÜ™]\›žÚYŠžKÒ^
J˜›ØÚÒYš\Ú
KÕ\\Ø\ÙJ
KXY\ŽžÝ™\œÚ[ÛŽžØ›ØÚÎ›™]ÈQË•Z[LÊ˜›ØÚËšXY\‹™\œÚ[Û‹˜›ØÚÊKÔÝš[™Ê
K\›™]ÈQË•Z[LÊ˜›ØÚËšXY\‹™\œÚ[Û‹˜\
KÔÝš[™Ê
_KZYÚ˜›ØÚËšXY\‹šZYÚÚZ[’Y˜›ØÚËšXY\‹˜ÚZ[’Y[YNŠÑËÔ™˜ÌÌÌÎUÚ]˜[›ÜÙXÛÛ™ÊJ˜›ØÚËšXY\‹[YJ_KÎ˜›ØÚËß_X\Þ[˜ÈÙ]˜[[˜ÙJ‹
^Ü™]\›ˆ\Ë™›Ü˜ÙQÙ]]Y\žPÛY[

K˜˜[šË˜˜[[˜ÙJ‹
_X\Þ[˜ÈÙ][˜[[˜Ù\ÊŠ^Ü™]\›ˆ\Ë™›Ü˜ÙQÙ]]Y\žPÛY[

K˜˜[šË˜[˜[[˜Ù\ÊŠ_X\Þ[˜ÈÙ]˜[[˜ÙTÝZÙY
Š^Û]V×KNÙÞÛ]Ù[YØ][Û”™\ÜÛœÙ\Î›ËYÚ[˜][ÛŽ˜_OX]ØZ]\Ë™›Ü˜ÙQÙ]]Y\žPÛY[

KœÝZÚ[™Ë™[YØ]Ü‘[YØ][ÛœÊ‹JKÏ[ß×NÝœ\Ú
‹‹œÊKOXOË›™^Ù^_]Ú[JHOO]›ÚY	‰šK›[™ÝOOL
NÜ™]\›ˆœ™YXÙJ
ËJOOŠ
ÞK˜\ÜÙ\
JK˜˜[[˜ÙJKÈOO[[Ê	K˜YÛÚ[œÊJËK˜˜[[˜ÙJN˜K˜˜[[˜ÙJK[
_X\Þ[˜ÈÙ][YØ][ÛŠ‹
^Û]NÝž^ÚOJ]ØZ]\Ë™›Ü˜ÙQÙ]]Y\žPÛY[

KœÝZÚ[™Ë™[YØ][ÛŠ‹
JK™[YØ][Û”™\ÜÛœÙOË˜˜[[˜Ù_XØ]Ú
Š^ÚYŠ
ÞK˜\ÜÙ\
Jˆ[œÝ[˜Ù[Ùˆ\œ›ÜŠK\‹ÔÝš[™Ê
Kš[˜ÛY\ÊšÙ^H›Ý›Ý[™ŠJ]›ÝÈŸ\™]\›ˆ_[X\Þ[˜ÈÙ]
Š^Ü™]\›Š]ØZ]\ËÔ]Y\žJš\ÚIÉÛŸIØ
JVÌOÏÛ[X\Þ[˜ÈÙX\˜Ú
Š^Û]ÚYŠ\[ÙˆOHœÝš[™ÈŠ][ŽÙ[ÙHYŠ
œ™Kš\ÔÙX\˜Ú]Y\žP\œ˜^JJŠJ][‹›X\
OO\[ÙˆK˜[YOOHœÝš[™ÈØ	ÚKšÙ^_OIÉÚK˜[Y_IØ˜	ÚKšÙ^_OIÚK˜[Y_X
Kš›Ú[ŠˆS‘ŠNÙ[ÙH›ÝÈ™]È\œ›ÜŠ‘ÛÝ[œÝ\ÜY]Y\žH\KˆÙYHÛÜÛR”ÈŒÌHÒS‘ÑSÑÈ›ÜˆTHœ™XZÚ[™ÈÚ[™Ù\È\™KˆŠNÜ™]\›ˆ\ËÔ]Y\žJ
_Y\ØÛÛ›™XÝ

^Ý\Ë˜ÛÛY]ÛY[	‰\Ë˜ÛÛY]ÛY[™\ØÛÛ›™XÝ

_X\Þ[˜Èœ›ØYØ\Ý
‹M™MOLÙLÊ^Û]HLKÏ\Ù][Y[Ý]


OOžÜHLK
KOX\Þ[˜ÈOžÚYŠŠ]›ÝÈ™]È^J˜[œØXÝ[ÛˆÚ]Q	ÙHØ\ÈÝX›Z]Y]Ø\È›ÝY]›Ý[™ÛˆHÚZ[‹ˆ[ÝHZYÚØ[ÈÚXÚÈ]\‹ˆ\™HØ\ÈHØZ]Ùˆ	ÝÌYLßHÙXÛÛ™Ë˜
NØ]ØZ]
ÞKœÛY\
JJNÛ]OX]ØZ]\Ë™Ù]

NÜ™]\›ˆOÞØÛÙNK˜ÛÙKZYÚKšZYÚ[™^K[™^]™[ÎK™]™[Ë˜]ÓÙÎKœ˜]ÓÙË˜[œØXÝ[Û’\Ú™\ÙÔ™\ÜÛœÙ\ÎK›\ÙÔ™\ÜÛœÙ\ËØ\Õ\ÙYK™Ø\Õ\ÙYØ\ÕØ[YK™Ø\ÕØ[YN˜J
_KÏX]ØZ]\Ë˜œ›ØYØ\ÝÞ[˜ÊŠNÜ™]\›ˆJÊK™š[˜[J

OOžØÛX\•[Y[Ý]
Ê_J_X\Þ[˜Èœ›ØYØ\ÝÞ[˜ÊŠ^Û]X]ØZ]\Ë™›Ü˜ÙQÙ]ÛÛY]ÛY[

K˜œ›ØYØ\ÝÞ[˜ÊÝ›ŸJNÜ™]\›ˆ˜ÛÙOÔ›ÛZ\ÙKœ™Z™XÝ
™]ÈJ˜ÛÙK˜ÛÙ\ÜXÙOÏÈˆ‹›ÙÊJNŠžKÒ^
Jš\Ú
KÕ\\Ø\ÙJ
_X\Þ[˜ÈÔ]Y\žJŠ^Ü™]\›Š]ØZ]\Ë™›Ü˜ÙQÙ]ÛÛY]ÛY[

KÙX\˜Ú[
Ü]Y\žN›ŸJJKË›X\
OOžÛ]ZK•\ÙÑ]K™XÛÙJKœ™\Ý[™]OÏÛ™]ÈZ[\œ˜^JNÜ™]\›žÚZYÚšKšZYÚ[™^šKš[™^\ÚŠžKÒ^
JKš\Ú
KÕ\\Ø\ÙJ
KÛÙNšKœ™\Ý[˜ÛÙK]™[ÎšKœ™\Ý[™]™[Ë›X\
œ™K™œ›ÛU[™\›Z[]™[
K˜]ÓÙÎšKœ™\Ý[›Ùßˆ‹šK\ÙÔ™\ÜÛœÙ\Îœ‹›\ÙÔ™\ÜÛœÙ\Ë›X\
ÏOŠÝ\U\››Ë\U\›˜[YNŠžK™š^Z[\œ˜^JJË˜[YJ_JJKØ\Õ\ÙYšKœ™\Ý[™Ø\Õ\ÙYØ\ÕØ[YšKœ™\Ý[™Ø\ÕØ[Y_J__NÑ˜K”Ý\™Ø]PÛY[YÌ_JNÝ˜\ˆ‘ÏRJ˜ÏOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\J˜Ë—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÓ˜Ë”ÚYÛš[™ÔÝ\™Ø]PÛY[S˜Ë™Y˜][™YÚ\ÝžU\\Ï]›ÚYÓ˜Ë˜Ü™X]QY˜][[Z[›ÐÛÛ™\\œÏS‘ÎÝ˜\ˆ^OV˜J
K‘ÏR›Š
KžOXšJ
K™]Ù

K\™OYŒJ
K^OU\Š
KÜ™OQŠ
K™O\Ê
KÏP“Š
KÜ™O]ÝJ
KÞOVY

K\™OUYŠ
K\™O]TÊ
KYÏY”Ê
KOZÊ
KšOPÚ

K™ORLJ
NÓ˜Ë™Y˜][™YÚ\ÝžU\\ÏVÖÈ‹ØÛÜÛ[ÜË˜˜\ÙKŒX™]LKÛÚ[ˆ‹Ü™KÛÚ[—K‹‹’šK˜]]•\\Ë‹‹’šK˜˜[šÕ\\Ë‹‹’šK™\ÝšX][Û•\\Ë‹‹’šK™™YYÜ˜[\\Ë‹‹’šK™ÛÝ•\\Ë‹‹’šK™Ü›Ý\\\Ë‹‹’šKœÝZÚ[™Õ\\Ë‹‹’šKšX˜Õ\\Ë‹‹’šK™\Ý[™Õ\\×NÙ[˜Ý[Ûˆ‘Ê
^Ü™]\›žË‹‹ŠšK˜Ü™X]P]][Z[›ÐÛÛ™\\œÊJ
K‹‹ŠšK˜Ü™X]P˜[šÐ[Z[›ÐÛÛ™\\œÊJ
K‹‹ŠšK˜Ü™X]Q\ÝšX][Û[Z[›ÐÛÛ™\\œÊJ
K‹‹ŠšK˜Ü™X]QÛÝ[Z[›ÐÛÛ™\\œÊJ
K‹‹ŠšK˜Ü™X]TÝZÚ[™Ð[Z[›ÐÛÛ™\\œÊJ
K‹‹ŠšK˜Ü™X]RX˜Ð[Z[›ÐÛÛ™\\œÊJ
K‹‹ŠšK˜Ü™X]Q™YYÜ˜[[Z[›ÐÛÛ™\\œÊJ
K‹‹ŠšK˜Ü™X]U™\Ý[™Ð[Z[›ÐÛÛ™\\œÊJ
__]˜\ˆLOXÛ\ÜÈH^[™È™K”Ý\™Ø]PÛY[Ü™YÚ\ÝžNØœ›ØYØ\Ý[Y[Ý]\ÎØœ›ØYØ\ÝÛ[\˜[\ÎÜÚYÛ™\ŽØ[Z[›Õ\\ÎÙØ\ÔšXÙNÙY˜][Ø\Ó][\Y\LKÙY˜][[˜[ZXÑØ\ÔšXÙS][\Y\LKŒÎÜÝ]XÈ\Þ[˜ÈÛÛ›™XÝÚ]ÚYÛ™\Š‹O^ßJ^Û]X]ØZ]
\™K˜ÛÛ›™XÝÛÛY]
JŠNÜ™]\›ˆK˜Ü™X]UÚ]ÚYÛ™\Š‹J_\Ý]XÈÜ™X]UÚ]ÚYÛ™\Š‹O^ßJ^Ü™]\›ˆ™]ÈJ‹J_\Ý]XÈ\Þ[˜ÈÙ™›[™J‹^ßJ^Ü™]\›ˆ™]ÈJ›ÚY‹
_XÛÛœÝXÝÜŠ‹J^ÜÝ\\Š‹JNÛ]Ü™YÚ\ÝžNœ[™]È™”™YÚ\ÝžJ˜Ë™Y˜][™YÚ\ÝžU\\ÊK[Z[›Õ\\Î›Ï[™]È\™K[Z[›Õ\\Ê‘Ê
J_OZNÝ\Ëœ™YÚ\ÝžO\‹\Ë˜[Z[›Õ\\Ï[Ë\ËœÚYÛ™\]\Ë˜œ›ØYØ\Ý[Y[Ý]\ÏZK˜œ›ØYØ\Ý[Y[Ý]\Ë\Ë˜œ›ØYØ\ÝÛ[\˜[\ÏZK˜œ›ØYØ\ÝÛ[\˜[\Ë\Ë™Ø\ÔšXÙOZK™Ø\ÔšXÙ_X\Þ[˜ÈÚ[][]J‹J^Û]]›X\
OO\Ëœ™YÚ\ÝžK™[˜ÛÙP\Ð[žJJJKÏJ]ØZ]\ËœÚYÛ™\‹™Ù]XØÛÝ[Ê
JK™š[™
OOK˜Y™\ÜÏOO[ŠNÚYŠ[Ê]›ÝÈ™]È\œ›ÜŠ‘˜Z[YÈ™]šY]™HXØÛÝ[œ›ÛHÚYÛ™\ˆŠNÛ]OJ^K™[˜ÛÙTÙXÜMšÌTXšÙ^JJËœXšÙ^JKÜÙ\]Y[˜ÙNœßOX]ØZ]\Ë™Ù]Ù\]Y[˜ÙJŠKÙØ\Ò[™›Î™OX]ØZ]\Ë™›Ü˜ÙQÙ]]Y\žPÛY[

KœÚ[][]J‹KKÊNÜ™]\›Š^K˜\ÜÙ\Yš[™Y
J
KžK•Z[LË™œ›ÛTÝš[™Ê™Ø\Õ\ÙYÔÝš[™Ê
JKÓ[X™\Š
_X\Þ[˜ÈÙ[™ÚÙ[œÊ‹K‹ÏHˆŠ^Û]O^Ý\U\›ˆ‹ØÛÜÛ[ÜË˜˜[šËŒX™]LK“\ÙÔÙ[™‹˜[YNžÙœ›ÛPY™\ÜÎ›‹ÐY™\ÜÎ[[Ý[–Ë‹‹šW__NÜ™]\›ˆ\ËœÚYÛ[™œ›ØYØ\Ý
‹ØWK‹Ê_X\Þ[˜È[YØ]UÚÙ[œÊ‹K‹ÏHˆŠ^Û]O^Ý\U\›ˆ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK“\ÙÑ[YØ]H‹˜[YN”Ë“\ÙÑ[YØ]K™œ›ÛT\X[
Ù[YØ]ÜY™\ÜÎ›‹˜[Y]ÜY™\ÜÎ[[Ý[š_J_NÜ™]\›ˆ\ËœÚYÛ[™œ›ØYØ\Ý
‹ØWK‹Ê_X\Þ[˜È[™[YØ]UÚÙ[œÊ‹K‹ÏHˆŠ^Û]O^Ý\U\›ˆ‹ØÛÜÛ[ÜËœÝZÚ[™ËŒX™]LK“\ÙÕ[™[YØ]H‹˜[YN”Ë“\ÙÕ[™[YØ]K™œ›ÛT\X[
Ù[YØ]ÜY™\ÜÎ›‹˜[Y]ÜY™\ÜÎ[[Ý[š_J_NÜ™]\›ˆ\ËœÚYÛ[™œ›ØYØ\Ý
‹ØWK‹Ê_X\Þ[˜ÈÚ]˜]Ô™]Ø\™Ê‹KHˆŠ^Û]Ï^Ý\U\›ˆ‹ØÛÜÛ[ÜË™\ÝšX][Û‹ŒX™]LK“\ÙÕÚ]˜]Ñ[YØ]Ü”™]Ø\™‹˜[YN™™K“\ÙÕÚ]˜]Ñ[YØ]Ü”™]Ø\™™œ›ÛT\X[
Ù[YØ]ÜY™\ÜÎ›‹˜[Y]ÜY™\ÜÎJ_NÜ™]\›ˆ\ËœÚYÛ[™œ›ØYØ\Ý
‹Û×KKŠ_X\Þ[˜ÈÙ[™X˜ÕÚÙ[œÊ‹K‹ËKËOHˆŠ^Û]\ÏÐšYÒ[
ÊJšYÒ[
YNJN›ÚY^Ý\U\›ˆ‹ÚX˜Ë˜\XØ][ÛœË˜[œÙ™\‹ŒK“\ÙÕ˜[œÙ™\ˆ‹˜[YN\™K“\ÙÕ˜[œÙ™\‹™œ›ÛT\X[
ÜÛÝ\˜ÙTÜœ‹ÛÝ\˜ÙPÚ[›™[›ËÙ[™\Ž›‹™XÙZ]™\ŽÚÙ[ŽšK[Y[Ý]ZYÚ˜K[Y[Ý][Y\Ý[\›J_NÜ™]\›ˆ\ËœÚYÛ[™œ›ØYØ\Ý
‹ÜKJ_X\Þ[˜ÈÚYÛ[™œ›ØYØ\Ý
‹KHˆ‹Ê^Û]NÚOOH˜]]ÈŸ\[ÙˆOOH›[X™\ˆØOX]ØZ]\Ë˜Ø[Ý[]Q™YQ›Ü•˜[œØXÝ[ÛŠ‹‹JN˜OZNÛ]ÏX]ØZ]\ËœÚYÛŠ‹K‹›ÚYÊKPÞK•˜]Ë™[˜ÛÙJÊK™š[š\Ú

NÜ™]\›ˆ\Ë˜œ›ØYØ\Ý
\Ë˜œ›ØYØ\Ý[Y[Ý]\Ë\Ë˜œ›ØYØ\ÝÛ[\˜[\Ê_X\Þ[˜ÈÚYÛ[™œ›ØYØ\ÝÞ[˜Ê‹KHˆ‹Ê^Û]NÚOOH˜]]ÈŸ\[ÙˆOOH›[X™\ˆØOX]ØZ]\Ë˜Ø[Ý[]Q™YQ›Ü•˜[œØXÝ[ÛŠ‹‹JN˜OZNÛ]ÏX]ØZ]\ËœÚYÛŠ‹K‹›ÚYÊKPÞK•˜]Ë™[˜ÛÙJÊK™š[š\Ú

NÜ™]\›ˆ\Ë˜œ›ØYØ\ÝÞ[˜Ê
_X\Þ[˜ÈØ[Ý[]Q™YQ›Ü•˜[œØXÝ[ÛŠ‹KŠ^Û]ÏX]ØZ]\ËœÚ[][]J‹JKO]\[ÙˆOH›[X™\ˆÜŽ\Ë™Y˜][Ø\Ó][\Y\‹ÏSX]˜ÙZ[
Ê˜JK]\Ë™Ø\ÔšXÙNÚYŠY
]›ÝÈ™]È\œ›ÜŠ‘Ø\ÈšXÙH]\Ý™HÙ][ˆHÛY[Ü[ÛœÈÚ[ˆ]]ÈØ\È\È\ÙYˆŠNÚYŠ
Kš\Ñ[˜[ZXÑØ\ÔšXÙPÛÛ™šYÊJ
J^Û]OYPK›][\Y\ÏÝ\Ë™Y˜][[˜[ZXÑØ\ÔšXÙS][\Y\‹PK›Z[‘Ø\ÔšXÙKÏPK›X^Ø\ÔšXÙNÝž^Û]X]ØZ]\Ë™Ù]ÚZ[’Y

K]\Ë™›Ü˜ÙQÙ]]Y\žPÛY[

KÏX]ØZ]
Kœ]Y\žQ[˜[ZXÑØ\ÔšXÙJJ‹K™[›ÛK
KO\˜[[Ý[™œ˜XÝ[Û˜[YÚ]ËOJK›][\QXÚ[X[žS[X™\ŠJËJKQKš\ÑÜ™X]\•[Š˜[[Ý[
OÑNœ˜[[Ý[ÚYŠÊ^Û]ÏYË˜[[Ý[˜Y\Ýœ˜XÝ[Û˜[YÚ]ÊJNÑQš\Ó\ÜÕ[ŠÊOÑ’ß[][™]ÈYË‘Ø\ÔšXÙJK™[›ÛJNÜ™]\›ŠYË˜Ø[Ý[]Q™YJJËŠ_XØ]ÚÜ™]\›ŠYË˜Ø[Ý[]Q™YJJË
__Y[ÙH™]\›Š^K˜\ÜÙ\
J[œÝ[˜Ù[ÙˆYË‘Ø\ÔšXÙK‘Ø\ÈšXÙH]\Ý™HHØ\ÔšXÙH[œÝ[˜ÙHÚ[ˆ\Ú[™ÈÝ]XÈšXÚ[™ËˆŠK
YË˜Ø[Ý[]Q™YJJË
_X\Þ[˜ÈÚYÛŠ‹K‹ËJ^Û]ÎÚYŠÊ\Ï[ÎÙ[Ù^Û]ØXØÛÝ[[X™\Ž™Ù\]Y[˜ÙN_OX]ØZ]\Ë™Ù]Ù\]Y[˜ÙJŠKX]ØZ]\Ë™Ù]ÚZ[’Y

NÜÏ^ØXØÛÝ[[X™\Ž™Ù\]Y[˜ÙNKÚZ[’Y›_\™]\›Š™š\ÓÙ™›[™Q\™XÝÚYÛ™\ŠJ\ËœÚYÛ™\ŠOÝ\ËœÚYÛ‘\™XÝ
‹K‹ËJN\ËœÚYÛ[Z[›Ê‹K‹ËJ_X\Þ[˜ÈÚYÛ[Z[›Ê‹K‹ØXØÛÝ[[X™\Ž›ËÙ\]Y[˜ÙN˜KÚZ[’YœßK
^Ê^K˜\ÜÙ\
JJ™š\ÓÙ™›[™Q\™XÝÚYÛ™\ŠJ\ËœÚYÛ™\ŠJNÛ]OJ]ØZ]\ËœÚYÛ™\‹™Ù]XØÛÝ[Ê
JK™š[™
ÙOOšÙK˜Y™\ÜÏOO[ŠNÚYŠPJ]›ÝÈ™]È\œ›ÜŠ‘˜Z[YÈ™]šY]™HXØÛÝ[œ›ÛHÚYÛ™\ˆŠNÛ]J™™[˜ÛÙTXšÙ^JJ
^K™Ù][Z[›ÔXšÙ^JJJJKXÜ™K”ÚYÛ“[ÙK”ÒQÓ—ÓSÑWÓQÐPÖWÐSRS“×Ò”ÓÓ‹Ï]›X\
ÙOO\Ë˜[Z[›Õ\\ËÐ[Z[›ÊÙJJKJ^K›XZÙTÚYÛ‘ØÊJËKË‹ËK
KÜÚYÛ˜]\™N‹ÚYÛ™YßOX]ØZ]\ËœÚYÛ™\‹œÚYÛ[Z[›Ê‹
KO^Ý\U\›ˆ‹ØÛÜÛ[ÜËŒX™]LK•›ÙH‹˜[YNžÛY\ÜØYÙ\ÎË›\ÙÜË›X\
ÙOO\Ë˜[Z[›Õ\\Ë™œ›ÛP[Z[›ÊÙJJKY[[ÎË›Y[[Ë[Y[Ý]ZYÚ™_K]\Ëœ™YÚ\ÝžK™[˜ÛÙJJKPžK’[LË™œ›ÛTÝš[™ÊË™™YK™Ø\ÊKÓ[X™\Š
KÏPžK’[LË™œ›ÛTÝš[™ÊËœÙ\]Y[˜ÙJKÓ[X™\Š
KOJ™›XZÙP]][™›Ðž]\ÊJÞÜXšÙ^N›Ù\]Y[˜ÙN’ßWKË™™YK˜[[Ý[‹Ë™™YK™Ü˜[\‹Ë™™YKœ^Y\‹
NÜ™]\›ˆÞK•˜]Ë™œ›ÛT\X[
Ø›ÙPž]\Î‘]][™›Ðž]\ÎšKÚYÛ˜]\™\Î–Ê‘Ë™œ›ÛP˜\ÙM
J‹œÚYÛ˜]\™JW_J_X\Þ[˜ÈÚYÛ‘\™XÝ
‹K‹ØXØÛÝ[[X™\Ž›ËÙ\]Y[˜ÙN˜KÚZ[’YœßK
^Ê^K˜\ÜÙ\
J
™š\ÓÙ™›[™Q\™XÝÚYÛ™\ŠJ\ËœÚYÛ™\ŠJNÛ]OJ]ØZ]\ËœÚYÛ™\‹™Ù]XØÛÝ[Ê
JK™š[™
O‘˜Y™\ÜÏOO[ŠNÚYŠPJ]›ÝÈ™]È\œ›ÜŠ‘˜Z[YÈ™]šY]™HXØÛÝ[œ›ÛHÚYÛ™\ˆŠNÛ]J™™[˜ÛÙTXšÙ^JJ
^K™Ù][Z[›ÔXšÙ^JJJJK^Ý\U\›ˆ‹ØÛÜÛ[ÜËŒX™]LK•›ÙH‹˜[YNžÛY\ÜØYÙ\ÎY[[Îœ‹[Y[Ý]ZYÚ™_KÏ]\Ëœ™YÚ\ÝžK™[˜ÛÙJ
KPžK’[LË™œ›ÛTÝš[™ÊK™Ø\ÊKÓ[X™\Š
KJ™›XZÙP]][™›Ðž]\ÊJÞÜXšÙ^N›Ù\]Y[˜ÙN˜_WKK˜[[Ý[K™Ü˜[\‹Kœ^Y\ŠKÏJ™›XZÙTÚYÛ‘ØÊJË‹ËÊKÜÚYÛ˜]\™N”KÚYÛ™Y‘_OX]ØZ]\ËœÚYÛ™\‹œÚYÛ‘\™XÝ
‹ÊNÜ™]\›ˆÞK•˜]Ë™œ›ÛT\X[
Ø›ÙPž]\Î‘K˜›ÙPž]\Ë]][™›Ðž]\Î‘K˜]][™›Ðž]\ËÚYÛ˜]\™\Î–Ê‘Ë™œ›ÛP˜\ÙM
JKœÚYÛ˜]\™JW_J__NÓ˜Ë”ÚYÛš[™ÔÝ\™Ø]PÛY[^L_JNÝ˜\ˆQÏRJOžÈ\ÙHÝšXÝŽÝ˜\ˆœ™OX‰‰˜‹—×ØÜ™X]Pš[™[™ß
Øš™XÝ˜Ü™X]OÊ[˜Ý[ÛŠK‹J^ÚOOO]›ÚY	‰ŠO]
NÝ˜\ˆSØš™XÝ™Ù]ÝÛ”›Ü\Q\ØÜš\ÜŠ‹
NÊ\Ÿ
™Ù]š[ˆÈ[‹—×Ù\Ó[Ù[Nœ‹Üš]X›_‹˜ÛÛ™šYÝ\˜X›JJI‰Š^Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ–Ý__JKØš™XÝ™Yš[™T›Ü\JKKŠ_JNŠ[˜Ý[ÛŠK‹J^ÚOOO]›ÚY	‰ŠO]
KVÚWO[–Ý_JJKÜ™OX‰‰˜‹—×ÜÙ][Ù[QY˜][
Øš™XÝ˜Ü™X]OÊ[˜Ý[ÛŠKŠ^ÓØš™XÝ™Yš[™T›Ü\JK™Y˜][‹Ù[[Y\˜X›NˆL˜[YN›ŸJ_JN™[˜Ý[ÛŠKŠ^ÙK™Y˜][[ŸJK™OX‰‰˜‹—×Ú[\ÜÝ\Ÿ
[˜Ý[ÛŠ
^Ý˜\ˆOY[˜Ý[ÛŠŠ^Ü™]\›ˆOSØš™XÝ™Ù]ÝÛ”›Ü\S˜[Y\ß[˜Ý[ÛŠ
^Ý˜\ˆOV×NÙ›ÜŠ˜\ˆˆ[ˆ
SØš™XÝœ›ÝÝ\Kš\ÓÝÛ”›Ü\K˜Ø[
ŠI‰ŠVÚK›[™ÝO\ŠNÜ™]\›ˆ_KJŠ_NÜ™]\›ˆ[˜Ý[ÛŠŠ^ÚYŠ‰‰›‹—×Ù\Ó[Ù[J\™]\›ˆŽÝ˜\ˆ^ßNÚYŠˆO[[
Y›ÜŠ˜\ˆOYJŠKLÜK›[™ÝÜŠÊÊZVÜ—HOOH™Y˜][‰‰™œ™J‹VÜ—JNÜ™]\›ˆÜ™JŠK_JJ
NÓØš™XÝ™Yš[™T›Ü\J‹—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNØ‹š\Ó\ÙÔÝX›Z]›ÜÜØ[[˜ÛÙSØš™XÝX‹š\Ó\ÙÔÙ[™[˜ÛÙSØš™XÝX‹š\Ó\ÙÑY]˜[Y]Ü‘[˜ÛÙSØš™XÝX‹š\Ó\ÙÑ\ÜÚ][˜ÛÙSØš™XÝX‹š\Ó\ÙÑ[YØ]Q[˜ÛÙSØš™XÝX‹š\Ó\ÙÐÜ™X]U˜[Y]Ü‘[˜ÛÙSØš™XÝX‹š\Ó\ÙÐØ[˜Ù[[˜›Û™[™Ñ[YØ][Û‘[˜ÛÙSØš™XÝX‹š\Ó\ÙÐ™YÚ[”™Y[YØ]Q[˜ÛÙSØš™XÝX‹š\Ð[Z[›Ó\ÙÕÚ]˜]Õ˜[Y]ÜÛÛ[Z\ÜÚ[ÛX‹š\Ð[Z[›Ó\ÙÕÚ]˜]Ñ[YØ]Ü”™]Ø\™X‹š\Ð[Z[›Ó\ÙÕ›ÝUÙZYÚYX‹š\Ð[Z[›Ó\ÙÕ›ÝOX‹š\Ð[Z[›Ó\ÙÕ™\šYžR[˜\šX[X‹š\Ð[Z[›Ó\ÙÕ[š˜Z[X‹š\Ð[Z[›Ó\ÙÕ[™[YØ]OX‹š\Ð[Z[›Ó\ÙÕ˜[œÙ™\X‹š\Ð[Z[›Ó\ÙÔÝX›Z]›ÜÜØ[X‹š\Ð[Z[›Ó\ÙÔÝX›Z]]šY[˜ÙOX‹š\Ð[Z[›Ó\ÙÔÙ]Ú]˜]ÐY™\ÜÏX‹š\Ð[Z[›Ó\ÙÔÙ[™X‹š\Ð[Z[›Ó\ÙÓ][TÙ[™X‹š\Ð[Z[›Ó\ÙÑ[™ÛÛ[][š]TÛÛX‹š\Ð[Z[›Ó\ÙÑY]˜[Y]ÜX‹š\Ð[Z[›Ó\ÙÑ\ÜÚ]X‹š\Ð[Z[›Ó\ÙÑ[YØ]OX‹š\Ð[Z[›Ó\ÙÐÜ™X]U™\Ý[™ÐXØÛÝ[X‹š\Ð[Z[›Ó\ÙÐÜ™X]U˜[Y]ÜX‹š\Ð[Z[›Ó\ÙÐ™YÚ[”™Y[YØ]OX‹˜Ü™X]U™\Ý[™Ð[Z[›ÐÛÛ™\\œÏX‹˜Ü™X]TÝZÚ[™Ð[Z[›ÐÛÛ™\\œÏX‹˜Ü™X]TÛ\Ú[™Ð[Z[›ÐÛÛ™\\œÏX‹˜Ü™X]RX˜Ð[Z[›ÐÛÛ™\\œÏX‹˜Ü™X]QÜ›Ý\[Z[›ÐÛÛ™\\œÏX‹˜Ü™X]QÛÝ[Z[›ÐÛÛ™\\œÏX‹˜Ü™X]Q™YYÜ˜[[Z[›ÐÛÛ™\\œÏX‹˜Ü™X]Q]šY[˜ÙP[Z[›ÐÛÛ™\\œÏX‹˜Ü™X]Q\ÝšX][Û[Z[›ÐÛÛ™\\œÏX‹˜Ü™X]PÜž\Ú\Ð[Z[›ÐÛÛ™\\œÏX‹˜Ü™X]P˜[šÐ[Z[›ÐÛÛ™\\œÏX‹˜Ü™X]P]][Z[›ÐÛÛ™\\œÏX‹›ÙÜÏX‹œ]Y\žQ[˜[ZXÑØ\ÔšXÙOX‹›][\QXÚ[X[žS[X™\X‹š\Ñ[˜[ZXÑØ\ÔšXÙPÛÛ™šYÏX‹˜ÚXÚÑ[˜[ZXÑØ\ÔšXÙTÝ\ÜX‹‘Ø\ÔšXÙOX‹˜Ø[Ý[]Q™YOX‹™œ›ÛU[™\›Z[]™[X‹[Z[›Õ\\ÏX‹˜XØÛÝ[œ›ÛP[žO]›ÚYØ‹œ\œÙPÛÚ[œÏX‹›XZÙPÛÜÛ[ÜÚX”]X‹˜ÛÚ[œÏX‹˜ÛÚ[X‹•[Y[Ý]\œ›ÜX‹”Ý\™Ø]PÛY[X‹š\Ñ[]™\•ÝXØÙ\ÜÏX‹š\Ñ[]™\•˜Z[\™OX‹œ›ØYØ\Ý\œ›ÜX‹˜\ÜÙ\\Ñ[]™\•ÝXØÙ\ÜÏX‹˜\ÜÙ\\Ñ[]™\•˜Z[\™OX‹”ÚYÛš[™ÔÝ\™Ø]PÛY[X‹™Y˜][™YÚ\ÝžU\\ÏX‹˜Ü™X]QY˜][[Z[›ÐÛÛ™\\œÏX‹š\ÔÙX\˜Ú]Y\žP\œ˜^OX‹”]Y\žPÛY[X‹™XÛÙPÛÜÛ[ÜÔÙÑXÑœ›ÛT›ÝÏX‹˜Ü™X]T›ÝØY”œÐÛY[X‹˜Ü™X]TYÚ[˜][ÛX‹›XZÙS][\ÚYÛ™Yž]\ÏX‹›XZÙS][\ÚYÛ™YX‹œÙ]\^[œÚ[ÛX‹œÙ]\ÝZÚ[™Ñ^[œÚ[ÛX‹œÙ]\Û\Ú[™Ñ^[œÚ[ÛX‹œÙ]\Z[^[œÚ[ÛX‹œÙ]\X˜Ñ^[œÚ[ÛX‹œÙ]\ÛÝ‘^[œÚ[ÛX‹œÙ]\™YYÜ˜[^[œÚ[ÛX‹œÙ]\\ÝšX][Û‘^[œÚ[ÛX‹œÙ]\˜[šÑ^[œÚ[ÛX‹œÙ]\]]‘^[œÚ[ÛX‹œÙ]\]]^[œÚ[ÛX‹š\Ó\ÙÕÚ]˜]Ñ[YØ]Ü”™]Ø\™[˜ÛÙSØš™XÝX‹š\Ó\ÙÕ›ÝUÙZYÚY[˜ÛÙSØš™XÝX‹š\Ó\ÙÕ›ÝQ[˜ÛÙSØš™XÝX‹š\Ó\ÙÕ[™[YØ]Q[˜ÛÙSØš™XÝX‹š\Ó\ÙÕ˜[œÙ™\‘[˜ÛÙSØš™XÝ]›ÚYÝ˜\ˆ\™OYÊ
NÓØš™XÝ™Yš[™T›Ü\J‹˜XØÛÝ[œ›ÛP[žH‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ\™K˜XØÛÝ[œ›ÛP[ž__JNÝ˜\ˆ™O]TÊ
NÓØš™XÝ™Yš[™T›Ü\J‹[Z[›Õ\\È‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ™K[Z[›Õ\\ß_JNÝ˜\ˆ\™O[Ê
NÓØš™XÝ™Yš[™T›Ü\J‹™œ›ÛU[™\›Z[]™[‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ\™K™œ›ÛU[™\›Z[]™[_JNÝ˜\ˆÑÏY”Ê
NÓØš™XÝ™Yš[™T›Ü\J‹˜Ø[Ý[]Q™YH‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆÑË˜Ø[Ý[]Q™Y__JNÓØš™XÝ™Yš[™T›Ü\J‹‘Ø\ÔšXÙH‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆÑË‘Ø\ÔšXÙ__JNÝ˜\ˆÞOZÊ
NÓØš™XÝ™Yš[™T›Ü\J‹˜ÚXÚÑ[˜[ZXÑØ\ÔšXÙTÝ\Ü‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆÞK˜ÚXÚÑ[˜[ZXÑØ\ÔšXÙTÝ\Ü_JNÓØš™XÝ™Yš[™T›Ü\J‹š\Ñ[˜[ZXÑØ\ÔšXÙPÛÛ™šYÈ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆÞKš\Ñ[˜[ZXÑØ\ÔšXÙPÛÛ™šYß_JNÓØš™XÝ™Yš[™T›Ü\J‹›][\QXÚ[X[žS[X™\ˆ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆÞK›][\QXÚ[X[žS[X™\Ÿ_JNÓØš™XÝ™Yš[™T›Ü\J‹œ]Y\žQ[˜[ZXÑØ\ÔšXÙH‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆÞKœ]Y\žQ[˜[ZXÑØ\ÔšXÙ__JNØ‹›ÙÜÏ\™J\J
JNÝ˜\ˆ	OPÚ

NÓØš™XÝ™Yš[™T›Ü\J‹˜Ü™X]P]][Z[›ÐÛÛ™\\œÈ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ	K˜Ü™X]P]][Z[›ÐÛÛ™\\œß_JNÓØš™XÝ™Yš[™T›Ü\J‹˜Ü™X]P˜[šÐ[Z[›ÐÛÛ™\\œÈ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ	K˜Ü™X]P˜[šÐ[Z[›ÐÛÛ™\\œß_JNÓØš™XÝ™Yš[™T›Ü\J‹˜Ü™X]PÜž\Ú\Ð[Z[›ÐÛÛ™\\œÈ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ	K˜Ü™X]PÜž\Ú\Ð[Z[›ÐÛÛ™\\œß_JNÓØš™XÝ™Yš[™T›Ü\J‹˜Ü™X]Q\ÝšX][Û[Z[›ÐÛÛ™\\œÈ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ	K˜Ü™X]Q\ÝšX][Û[Z[›ÐÛÛ™\\œß_JNÓØš™XÝ™Yš[™T›Ü\J‹˜Ü™X]Q]šY[˜ÙP[Z[›ÐÛÛ™\\œÈ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ	K˜Ü™X]Q]šY[˜ÙP[Z[›ÐÛÛ™\\œß_JNÓØš™XÝ™Yš[™T›Ü\J‹˜Ü™X]Q™YYÜ˜[[Z[›ÐÛÛ™\\œÈ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ	K˜Ü™X]Q™YYÜ˜[[Z[›ÐÛÛ™\\œß_JNÓØš™XÝ™Yš[™T›Ü\J‹˜Ü™X]QÛÝ[Z[›ÐÛÛ™\\œÈ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ	K˜Ü™X]QÛÝ[Z[›ÐÛÛ™\\œß_JNÓØš™XÝ™Yš[™T›Ü\J‹˜Ü™X]QÜ›Ý\[Z[›ÐÛÛ™\\œÈ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ	K˜Ü™X]QÜ›Ý\[Z[›ÐÛÛ™\\œß_JNÓØš™XÝ™Yš[™T›Ü\J‹˜Ü™X]RX˜Ð[Z[›ÐÛÛ™\\œÈ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ	K˜Ü™X]RX˜Ð[Z[›ÐÛÛ™\\œß_JNÓØš™XÝ™Yš[™T›Ü\J‹˜Ü™X]TÛ\Ú[™Ð[Z[›ÐÛÛ™\\œÈ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ	K˜Ü™X]TÛ\Ú[™Ð[Z[›ÐÛÛ™\\œß_JNÓØš™XÝ™Yš[™T›Ü\J‹˜Ü™X]TÝZÚ[™Ð[Z[›ÐÛÛ™\\œÈ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ	K˜Ü™X]TÝZÚ[™Ð[Z[›ÐÛÛ™\\œß_JNÓØš™XÝ™Yš[™T›Ü\J‹˜Ü™X]U™\Ý[™Ð[Z[›ÐÛÛ™\\œÈ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ	K˜Ü™X]U™\Ý[™Ð[Z[›ÐÛÛ™\\œß_JNÓØš™XÝ™Yš[™T›Ü\J‹š\Ð[Z[›Ó\ÙÐ™YÚ[”™Y[YØ]H‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ	Kš\Ð[Z[›Ó\ÙÐ™YÚ[”™Y[YØ]__JNÓØš™XÝ™Yš[™T›Ü\J‹š\Ð[Z[›Ó\ÙÐÜ™X]U˜[Y]Üˆ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ	Kš\Ð[Z[›Ó\ÙÐÜ™X]U˜[Y]ÜŸ_JNÓØš™XÝ™Yš[™T›Ü\J‹š\Ð[Z[›Ó\ÙÐÜ™X]U™\Ý[™ÐXØÛÝ[‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ	Kš\Ð[Z[›Ó\ÙÐÜ™X]U™\Ý[™ÐXØÛÝ[_JNÓØš™XÝ™Yš[™T›Ü\J‹š\Ð[Z[›Ó\ÙÑ[YØ]H‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ	Kš\Ð[Z[›Ó\ÙÑ[YØ]__JNÓØš™XÝ™Yš[™T›Ü\J‹š\Ð[Z[›Ó\ÙÑ\ÜÚ]‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ	Kš\Ð[Z[›Ó\ÙÑ\ÜÚ]_JNÓØš™XÝ™Yš[™T›Ü\J‹š\Ð[Z[›Ó\ÙÑY]˜[Y]Üˆ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ	Kš\Ð[Z[›Ó\ÙÑY]˜[Y]ÜŸ_JNÓØš™XÝ™Yš[™T›Ü\J‹š\Ð[Z[›Ó\ÙÑ[™ÛÛ[][š]TÛÛ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ	Kš\Ð[Z[›Ó\ÙÑ[™ÛÛ[][š]TÛÛ_JNÓØš™XÝ™Yš[™T›Ü\J‹š\Ð[Z[›Ó\ÙÓ][TÙ[™‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ	Kš\Ð[Z[›Ó\ÙÓ][TÙ[™_JNÓØš™XÝ™Yš[™T›Ü\J‹š\Ð[Z[›Ó\ÙÔÙ[™‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ	Kš\Ð[Z[›Ó\ÙÔÙ[™_JNÓØš™XÝ™Yš[™T›Ü\J‹š\Ð[Z[›Ó\ÙÔÙ]Ú]˜]ÐY™\ÜÈ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ	Kš\Ð[Z[›Ó\ÙÔÙ]Ú]˜]ÐY™\Üß_JNÓØš™XÝ™Yš[™T›Ü\J‹š\Ð[Z[›Ó\ÙÔÝX›Z]]šY[˜ÙH‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ	Kš\Ð[Z[›Ó\ÙÔÝX›Z]]šY[˜Ù__JNÓØš™XÝ™Yš[™T›Ü\J‹š\Ð[Z[›Ó\ÙÔÝX›Z]›ÜÜØ[‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ	Kš\Ð[Z[›Ó\ÙÔÝX›Z]›ÜÜØ[_JNÓØš™XÝ™Yš[™T›Ü\J‹š\Ð[Z[›Ó\ÙÕ˜[œÙ™\ˆ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ	Kš\Ð[Z[›Ó\ÙÕ˜[œÙ™\Ÿ_JNÓØš™XÝ™Yš[™T›Ü\J‹š\Ð[Z[›Ó\ÙÕ[™[YØ]H‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ	Kš\Ð[Z[›Ó\ÙÕ[™[YØ]__JNÓØš™XÝ™Yš[™T›Ü\J‹š\Ð[Z[›Ó\ÙÕ[š˜Z[‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ	Kš\Ð[Z[›Ó\ÙÕ[š˜Z[_JNÓØš™XÝ™Yš[™T›Ü\J‹š\Ð[Z[›Ó\ÙÕ™\šYžR[˜\šX[‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ	Kš\Ð[Z[›Ó\ÙÕ™\šYžR[˜\šX[_JNÓØš™XÝ™Yš[™T›Ü\J‹š\Ð[Z[›Ó\ÙÕ›ÝH‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ	Kš\Ð[Z[›Ó\ÙÕ›Ý__JNÓØš™XÝ™Yš[™T›Ü\J‹š\Ð[Z[›Ó\ÙÕ›ÝUÙZYÚY‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ	Kš\Ð[Z[›Ó\ÙÕ›ÝUÙZYÚY_JNÓØš™XÝ™Yš[™T›Ü\J‹š\Ð[Z[›Ó\ÙÕÚ]˜]Ñ[YØ]Ü”™]Ø\™‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ	Kš\Ð[Z[›Ó\ÙÕÚ]˜]Ñ[YØ]Ü”™]Ø\™_JNÓØš™XÝ™Yš[™T›Ü\J‹š\Ð[Z[›Ó\ÙÕÚ]˜]Õ˜[Y]ÜÛÛ[Z\ÜÚ[Ûˆ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ	Kš\Ð[Z[›Ó\ÙÕÚ]˜]Õ˜[Y]ÜÛÛ[Z\ÜÚ[ÛŸ_JNÓØš™XÝ™Yš[™T›Ü\J‹š\Ó\ÙÐ™YÚ[”™Y[YØ]Q[˜ÛÙSØš™XÝ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ	Kš\Ó\ÙÐ™YÚ[”™Y[YØ]Q[˜ÛÙSØš™XÝ_JNÓØš™XÝ™Yš[™T›Ü\J‹š\Ó\ÙÐØ[˜Ù[[˜›Û™[™Ñ[YØ][Û‘[˜ÛÙSØš™XÝ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ	Kš\Ó\ÙÐØ[˜Ù[[˜›Û™[™Ñ[YØ][Û‘[˜ÛÙSØš™XÝ_JNÓØš™XÝ™Yš[™T›Ü\J‹š\Ó\ÙÐÜ™X]U˜[Y]Ü‘[˜ÛÙSØš™XÝ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ	Kš\Ó\ÙÐÜ™X]U˜[Y]Ü‘[˜ÛÙSØš™XÝ_JNÓØš™XÝ™Yš[™T›Ü\J‹š\Ó\ÙÑ[YØ]Q[˜ÛÙSØš™XÝ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ	Kš\Ó\ÙÑ[YØ]Q[˜ÛÙSØš™XÝ_JNÓØš™XÝ™Yš[™T›Ü\J‹š\Ó\ÙÑ\ÜÚ][˜ÛÙSØš™XÝ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ	Kš\Ó\ÙÑ\ÜÚ][˜ÛÙSØš™XÝ_JNÓØš™XÝ™Yš[™T›Ü\J‹š\Ó\ÙÑY]˜[Y]Ü‘[˜ÛÙSØš™XÝ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ	Kš\Ó\ÙÑY]˜[Y]Ü‘[˜ÛÙSØš™XÝ_JNÓØš™XÝ™Yš[™T›Ü\J‹š\Ó\ÙÔÙ[™[˜ÛÙSØš™XÝ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ	Kš\Ó\ÙÔÙ[™[˜ÛÙSØš™XÝ_JNÓØš™XÝ™Yš[™T›Ü\J‹š\Ó\ÙÔÝX›Z]›ÜÜØ[[˜ÛÙSØš™XÝ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ	Kš\Ó\ÙÔÝX›Z]›ÜÜØ[[˜ÛÙSØš™XÝ_JNÓØš™XÝ™Yš[™T›Ü\J‹š\Ó\ÙÕ˜[œÙ™\‘[˜ÛÙSØš™XÝ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ	Kš\Ó\ÙÕ˜[œÙ™\‘[˜ÛÙSØš™XÝ_JNÓØš™XÝ™Yš[™T›Ü\J‹š\Ó\ÙÕ[™[YØ]Q[˜ÛÙSØš™XÝ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ	Kš\Ó\ÙÕ[™[YØ]Q[˜ÛÙSØš™XÝ_JNÓØš™XÝ™Yš[™T›Ü\J‹š\Ó\ÙÕ›ÝQ[˜ÛÙSØš™XÝ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ	Kš\Ó\ÙÕ›ÝQ[˜ÛÙSØš™XÝ_JNÓØš™XÝ™Yš[™T›Ü\J‹š\Ó\ÙÕ›ÝUÙZYÚY[˜ÛÙSØš™XÝ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ	Kš\Ó\ÙÕ›ÝUÙZYÚY[˜ÛÙSØš™XÝ_JNÓØš™XÝ™Yš[™T›Ü\J‹š\Ó\ÙÕÚ]˜]Ñ[YØ]Ü”™]Ø\™[˜ÛÙSØš™XÝ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ	Kš\Ó\ÙÕÚ]˜]Ñ[YØ]Ü”™]Ø\™[˜ÛÙSØš™XÝ_JNÓØš™XÝ™Yš[™T›Ü\J‹œÙ]\]]^[œÚ[Ûˆ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ	KœÙ]\]]^[œÚ[ÛŸ_JNÓØš™XÝ™Yš[™T›Ü\J‹œÙ]\]]‘^[œÚ[Ûˆ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ	KœÙ]\]]‘^[œÚ[ÛŸ_JNÓØš™XÝ™Yš[™T›Ü\J‹œÙ]\˜[šÑ^[œÚ[Ûˆ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ	KœÙ]\˜[šÑ^[œÚ[ÛŸ_JNÓØš™XÝ™Yš[™T›Ü\J‹œÙ]\\ÝšX][Û‘^[œÚ[Ûˆ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ	KœÙ]\\ÝšX][Û‘^[œÚ[ÛŸ_JNÓØš™XÝ™Yš[™T›Ü\J‹œÙ]\™YYÜ˜[^[œÚ[Ûˆ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ	KœÙ]\™YYÜ˜[^[œÚ[ÛŸ_JNÓØš™XÝ™Yš[™T›Ü\J‹œÙ]\ÛÝ‘^[œÚ[Ûˆ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ	KœÙ]\ÛÝ‘^[œÚ[ÛŸ_JNÓØš™XÝ™Yš[™T›Ü\J‹œÙ]\X˜Ñ^[œÚ[Ûˆ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ	KœÙ]\X˜Ñ^[œÚ[ÛŸ_JNÓØš™XÝ™Yš[™T›Ü\J‹œÙ]\Z[^[œÚ[Ûˆ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ	KœÙ]\Z[^[œÚ[ÛŸ_JNÓØš™XÝ™Yš[™T›Ü\J‹œÙ]\Û\Ú[™Ñ^[œÚ[Ûˆ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ	KœÙ]\Û\Ú[™Ñ^[œÚ[ÛŸ_JNÓØš™XÝ™Yš[™T›Ü\J‹œÙ]\ÝZÚ[™Ñ^[œÚ[Ûˆ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ	KœÙ]\ÝZÚ[™Ñ^[œÚ[ÛŸ_JNÓØš™XÝ™Yš[™T›Ü\J‹œÙ]\^[œÚ[Ûˆ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ	KœÙ]\^[œÚ[ÛŸ_JNÝ˜\ˆÏUJ
NÓØš™XÝ™Yš[™T›Ü\J‹›XZÙS][\ÚYÛ™Y‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆË›XZÙS][\ÚYÛ™Y_JNÓØš™XÝ™Yš[™T›Ü\J‹›XZÙS][\ÚYÛ™Yž]\È‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆË›XZÙS][\ÚYÛ™Yž]\ß_JNÝ˜\ˆÞOY›Ê
NÓØš™XÝ™Yš[™T›Ü\J‹˜Ü™X]TYÚ[˜][Ûˆ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆÞK˜Ü™X]TYÚ[˜][ÛŸ_JNÓØš™XÝ™Yš[™T›Ü\J‹˜Ü™X]T›ÝØY”œÐÛY[‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆÞK˜Ü™X]T›ÝØY”œÐÛY[_JNÓØš™XÝ™Yš[™T›Ü\J‹™XÛÙPÛÜÛ[ÜÔÙÑXÑœ›ÛT›ÝÈ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆÞK™XÛÙPÛÜÛ[ÜÔÙÑXÑœ›ÛT›Ýß_JNÓØš™XÝ™Yš[™T›Ü\J‹”]Y\žPÛY[‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆÞK”]Y\žPÛY[_JNÝ˜\ˆœ™ORÝŠ
NÓØš™XÝ™Yš[™T›Ü\J‹š\ÔÙX\˜Ú]Y\žP\œ˜^H‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆœ™Kš\ÔÙX\˜Ú]Y\žP\œ˜^__JNÝ˜\ˆŒO]‘Ê
NÓØš™XÝ™Yš[™T›Ü\J‹˜Ü™X]QY˜][[Z[›ÐÛÛ™\\œÈ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆŒK˜Ü™X]QY˜][[Z[›ÐÛÛ™\\œß_JNÓØš™XÝ™Yš[™T›Ü\J‹™Y˜][™YÚ\ÝžU\\È‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆŒK™Y˜][™YÚ\ÝžU\\ß_JNÓØš™XÝ™Yš[™T›Ü\J‹”ÚYÛš[™ÔÝ\™Ø]PÛY[‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆŒK”ÚYÛš[™ÔÝ\™Ø]PÛY[_JNÝ˜\ˆÝORLJ
NÓØš™XÝ™Yš[™T›Ü\J‹˜\ÜÙ\\Ñ[]™\•˜Z[\™H‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆÝK˜\ÜÙ\\Ñ[]™\•˜Z[\™__JNÓØš™XÝ™Yš[™T›Ü\J‹˜\ÜÙ\\Ñ[]™\•ÝXØÙ\ÜÈ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆÝK˜\ÜÙ\\Ñ[]™\•ÝXØÙ\Üß_JNÓØš™XÝ™Yš[™T›Ü\J‹œ›ØYØ\Ý\œ›Üˆ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆÝKœ›ØYØ\Ý\œ›ÜŸ_JNÓØš™XÝ™Yš[™T›Ü\J‹š\Ñ[]™\•˜Z[\™H‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆÝKš\Ñ[]™\•˜Z[\™__JNÓØš™XÝ™Yš[™T›Ü\J‹š\Ñ[]™\•ÝXØÙ\ÜÈ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆÝKš\Ñ[]™\•ÝXØÙ\Üß_JNÓØš™XÝ™Yš[™T›Ü\J‹”Ý\™Ø]PÛY[‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆÝK”Ý\™Ø]PÛY[_JNÓØš™XÝ™Yš[™T›Ü\J‹•[Y[Ý]\œ›Üˆ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆÝK•[Y[Ý]\œ›ÜŸ_JNÝ˜\ˆ^O]Ù

NÓØš™XÝ™Yš[™T›Ü\J‹˜ÛÚ[ˆ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ^K˜ÛÚ[Ÿ_JNÓØš™XÝ™Yš[™T›Ü\J‹˜ÛÚ[œÈ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ^K˜ÛÚ[œß_JNÓØš™XÝ™Yš[™T›Ü\J‹›XZÙPÛÜÛ[ÜÚX”]‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ^K›XZÙPÛÜÛ[ÜÚX”]_JNÓØš™XÝ™Yš[™T›Ü\J‹œ\œÙPÛÚ[œÈ‹Ù[[Y\˜X›NˆLÙ]™[˜Ý[ÛŠ
^Ü™]\›ˆ^Kœ\œÙPÛÚ[œß_J_JNÝ˜\ˆ‘ÏRJÛOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\JÛ‹—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNØÛ‹“[Ù[XÛ‹XœÛÛ]UÜÚ][ÛXÛ‹ÛÛ˜XÝÛÙR\ÝÜžQ[žOXÛ‹ÛÛ˜XÝ[™›ÏXÛ‹ÛÙR[™›ÏXÛ‹”\˜[\ÏXÛ‹XØÙ\ÜÐÛÛ™šYÏXÛ‹XØÙ\ÜÕ\T\˜[OXÛ‹ÛÛ˜XÝÛÙR\ÝÜžSÜ\˜][Û•\OXÛ‹XØÙ\ÜÕ\OXÛ‹œ›ÝØY”XÚØYÙO]›ÚYØÛ‹˜XØÙ\ÜÕ\Qœ›ÛR”ÓÓT^NØÛ‹˜XØÙ\ÜÕ\UÒ”ÓÓ]ÞNØÛ‹˜ÛÛ˜XÝÛÙR\ÝÜžSÜ\˜][Û•\Qœ›ÛR”ÓÓ^ÎØÛ‹˜ÛÛ˜XÝÛÙR\ÝÜžSÜ\˜][Û•\UÒ”ÓÓUÎÝ˜\ˆYÏ]

KÜPÙJ
KQYJ
NØÛ‹œ›ÝØY”XÚØYÙOH˜ÛÜÛ]Ø\ÛKØ\ÛKŒHŽÝ˜\ˆXNÊ[˜Ý[ÛŠJ^ÙVÙKPÐÑTÔ×ÕTWÕS”ÔPÒQ’QQLOHPÐÑTÔ×ÕTWÕS”ÔPÒQ’QQ‹VÙKPÐÑTÔ×ÕTWÓ“Ð“ÑOLWOHPÐÑTÔ×ÕTWÓ“Ð“ÑH‹VÙKPÐÑTÔ×ÕTWÑU‘T–P“ÑOL×OHPÐÑTÔ×ÕTWÑU‘T–P“ÑH‹VÙKPÐÑTÔ×ÕTWÐS–WÓÑ—ÐQ‘TÔÑTÏMOHPÐÑTÔ×ÕTWÐS–WÓÑ—ÐQ‘TÔÑTÈ‹VÙK•S”‘PÓÑÓ’V‘QKLWOH•S”‘PÓÑÓ’V‘QŸJJX_
Û‹XØÙ\ÜÕ\O\XO^ßJJNÙ[˜Ý[Ûˆ^JJ^ÜÝÚ]Ú
J^ØØ\ÙH˜Ø\ÙHPÐÑTÔ×ÕTWÕS”ÔPÒQ’QQŽœ™]\›ˆXKPÐÑTÔ×ÕTWÕS”ÔPÒQ’QQØØ\ÙHN˜Ø\ÙHPÐÑTÔ×ÕTWÓ“Ð“ÑHŽœ™]\›ˆXKPÐÑTÔ×ÕTWÓ“Ð“ÑNØØ\ÙHÎ˜Ø\ÙHPÐÑTÔ×ÕTWÑU‘T–P“ÑHŽœ™]\›ˆXKPÐÑTÔ×ÕTWÑU‘T–P“ÑNØØ\ÙH˜Ø\ÙHPÐÑTÔ×ÕTWÐS–WÓÑ—ÐQ‘TÔÑTÈŽœ™]\›ˆXKPÐÑTÔ×ÕTWÐS–WÓÑ—ÐQ‘TÔÑTÎÙY˜][œ™]\›ˆXK•S”‘PÓÑÓ’V‘Q_Y[˜Ý[ÛˆÞJJ^ÜÝÚ]Ú
J^ØØ\ÙHXKPÐÑTÔ×ÕTWÕS”ÔPÒQ’QQœ™]\›ˆPÐÑTÔ×ÕTWÕS”ÔPÒQ’QQŽØØ\ÙHXKPÐÑTÔ×ÕTWÓ“Ð“ÑNœ™]\›ˆPÐÑTÔ×ÕTWÓ“Ð“ÑHŽØØ\ÙHXKPÐÑTÔ×ÕTWÑU‘T–P“ÑNœ™]\›ˆPÐÑTÔ×ÕTWÑU‘T–P“ÑHŽØØ\ÙHXKPÐÑTÔ×ÕTWÐS–WÓÑ—ÐQ‘TÔÑTÎœ™]\›ˆPÐÑTÔ×ÕTWÐS–WÓÑ—ÐQ‘TÔÑTÈŽØØ\ÙHXK•S”‘PÓÑÓ’V‘Q™Y˜][œ™]\›ˆ•S”‘PÓÑÓ’V‘QŸ_]˜\ˆNÊ[˜Ý[ÛŠJ^ÙVÙKÓÓ•PÕÐÓÑWÒTÕÔ–WÓÔTUSÓ—ÕTWÕS”ÔPÒQ’QQLOHÓÓ•PÕÐÓÑWÒTÕÔ–WÓÔTUSÓ—ÕTWÕS”ÔPÒQ’QQ‹VÙKÓÓ•PÕÐÓÑWÒTÕÔ–WÓÔTUSÓ—ÕTWÒS’ULWOHÓÓ•PÕÐÓÑWÒTÕÔ–WÓÔTUSÓ—ÕTWÒS’U‹VÙKÓÓ•PÕÐÓÑWÒTÕÔ–WÓÔTUSÓ—ÕTWÓRQÔUOL—OHÓÓ•PÕÐÓÑWÒTÕÔ–WÓÔTUSÓ—ÕTWÓRQÔUH‹VÙKÓÓ•PÕÐÓÑWÒTÕÔ–WÓÔTUSÓ—ÕTWÑÑS‘TÒTÏL×OHÓÓ•PÕÐÓÑWÒTÕÔ–WÓÔTUSÓ—ÕTWÑÑS‘TÒTÈ‹VÙK•S”‘PÓÑÓ’V‘QKLWOH•S”‘PÓÑÓ’V‘QŸJJ_
Û‹ÛÛ˜XÝÛÙR\ÝÜžSÜ\˜][Û•\ORO^ßJJNÙ[˜Ý[ÛˆÊJ^ÜÝÚ]Ú
J^ØØ\ÙH˜Ø\ÙHÓÓ•PÕÐÓÑWÒTÕÔ–WÓÔTUSÓ—ÕTWÕS”ÔPÒQ’QQŽœ™]\›ˆKÓÓ•PÕÐÓÑWÒTÕÔ–WÓÔTUSÓ—ÕTWÕS”ÔPÒQ’QQØØ\ÙHN˜Ø\ÙHÓÓ•PÕÐÓÑWÒTÕÔ–WÓÔTUSÓ—ÕTWÒS’UŽœ™]\›ˆKÓÓ•PÕÐÓÑWÒTÕÔ–WÓÔTUSÓ—ÕTWÒS’UØØ\ÙHŽ˜Ø\ÙHÓÓ•PÕÐÓÑWÒTÕÔ–WÓÔTUSÓ—ÕTWÓRQÔUHŽœ™]\›ˆKÓÓ•PÕÐÓÑWÒTÕÔ–WÓÔTUSÓ—ÕTWÓRQÔUNØØ\ÙHÎ˜Ø\ÙHÓÓ•PÕÐÓÑWÒTÕÔ–WÓÔTUSÓ—ÕTWÑÑS‘TÒTÈŽœ™]\›ˆKÓÓ•PÕÐÓÑWÒTÕÔ–WÓÔTUSÓ—ÕTWÑÑS‘TÒTÎÙY˜][œ™]\›ˆK•S”‘PÓÑÓ’V‘Q_Y[˜Ý[ÛˆÊJ^ÜÝÚ]Ú
J^ØØ\ÙHKÓÓ•PÕÐÓÑWÒTÕÔ–WÓÔTUSÓ—ÕTWÕS”ÔPÒQ’QQœ™]\›ˆÓÓ•PÕÐÓÑWÒTÕÔ–WÓÔTUSÓ—ÕTWÕS”ÔPÒQ’QQŽØØ\ÙHKÓÓ•PÕÐÓÑWÒTÕÔ–WÓÔTUSÓ—ÕTWÒS’Uœ™]\›ˆÓÓ•PÕÐÓÑWÒTÕÔ–WÓÔTUSÓ—ÕTWÒS’UŽØØ\ÙHKÓÓ•PÕÐÓÑWÒTÕÔ–WÓÔTUSÓ—ÕTWÓRQÔUNœ™]\›ˆÓÓ•PÕÐÓÑWÒTÕÔ–WÓÔTUSÓ—ÕTWÓRQÔUHŽØØ\ÙHKÓÓ•PÕÐÓÑWÒTÕÔ–WÓÔTUSÓ—ÕTWÑÑS‘TÒTÎœ™]\›ˆÓÓ•PÕÐÓÑWÒTÕÔ–WÓÔTUSÓ—ÕTWÑÑS‘TÒTÈŽØØ\ÙHK•S”‘PÓÑÓ’V‘Q™Y˜][œ™]\›ˆ•S”‘PÓÑÓ’V‘QŸ_Y[˜Ý[ÛˆLJ
^Ü™]\›žÝ˜[YNŒ_XÛ‹XØÙ\ÜÕ\T\˜[O^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒKXØÙ\ÜÕ\T\˜[H‹[˜ÛÙJK]Ü‹š[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK˜[YHOOL	‰›‹Z[ÌŠ
Kš[ÌŠK˜[YJKŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆÜ‹š[˜\žT™XY\ÙN›™]ÈÜ‹š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹[LJ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÛÏŒÏOOLOÜ‹˜[YO]š[ÌŠ
NœÚÚ\\JÉÊ_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û][LJ
NÜ™]\›Šš\ÔÙ]
JK˜[YJI‰Š‹˜[YOT^JK˜[YJJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK˜[YHOO]›ÚY	‰Š‹˜[YO]ÞJK˜[YJJKŸKœ›ÛT\X[
J^Û][LJ
NÜ™]\›ˆ‹˜[YOYK˜[YOÏÌŸ_NÙ[˜Ý[ÛˆÌJ
^Ü™]\›žÜ\›Z\ÜÚ[ÛŽŒY™\ÜÙ\Î–×__XÛ‹XØÙ\ÜÐÛÛ™šYÏ^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒKXØÙ\ÜÐÛÛ™šYÈ‹[˜ÛÙJK]Ü‹š[˜\žUÜš]\‹˜Ü™X]J
J^ÙKœ\›Z\ÜÚ[ÛˆOOL	‰›‹Z[ÌŠ
Kš[ÌŠKœ\›Z\ÜÚ[ÛŠNÙ›ÜŠ]ÙˆK˜Y™\ÜÙ\Ê[‹Z[ÌŠŠKœÝš[™Ê
NÜ™]\›ˆŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆÜ‹š[˜\žT™XY\ÙN›™]ÈÜ‹š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹PÌJ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹œ\›Z\ÜÚ[Û]š[ÌŠ
NØœ™XZÎØØ\ÙHÎœ‹˜Y™\ÜÙ\Ëœ\Ú
œÝš[™Ê
JNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]PÌJ
NÜ™]\›Šš\ÔÙ]
JKœ\›Z\ÜÚ[ÛŠI‰Š‹œ\›Z\ÜÚ[ÛT^JKœ\›Z\ÜÚ[ÛŠJK\œ˜^Kš\Ð\œ˜^JOË˜Y™\ÜÙ\ÊI‰Š‹˜Y™\ÜÙ\ÏYK˜Y™\ÜÙ\Ë›X\
O”Ýš[™Ê
JJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆKœ\›Z\ÜÚ[ÛˆOO]›ÚY	‰Š‹œ\›Z\ÜÚ[Û]ÞJKœ\›Z\ÜÚ[ÛŠJKK˜Y™\ÜÙ\ÏÛ‹˜Y™\ÜÙ\ÏYK˜Y™\ÜÙ\Ë›X\
O
N›‹˜Y™\ÜÙ\ÏV×KŸKœ›ÛT\X[
J^Û]PÌJ
NÜ™]\›ˆ‹œ\›Z\ÜÚ[ÛYKœ\›Z\ÜÚ[ÛÏÌ‹˜Y™\ÜÙ\ÏYK˜Y™\ÜÙ\ÏË›X\
O
_×KŸ_NÙ[˜Ý[ÛˆÌJ
^Ü™]\›žØÛÙU\ØYXØÙ\ÜÎ˜Û‹XØÙ\ÜÐÛÛ™šYË™œ›ÛT\X[
ßJK[œÝ[X]QY˜][\›Z\ÜÚ[ÛŽŒ_XÛ‹”\˜[\Ï^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK”\˜[\È‹[˜ÛÙJK]Ü‹š[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK˜ÛÙU\ØYXØÙ\ÜÈOO]›ÚY	‰˜Û‹XØÙ\ÜÐÛÛ™šYË™[˜ÛÙJK˜ÛÙU\ØYXØÙ\ÜË‹Z[ÌŠL
K™›ÜšÊ
JK›[[J
KKš[œÝ[X]QY˜][\›Z\ÜÚ[ÛˆOOL	‰›‹Z[ÌŠMŠKš[ÌŠKš[œÝ[X]QY˜][\›Z\ÜÚ[ÛŠKŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆÜ‹š[˜\žT™XY\ÙN›™]ÈÜ‹š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹TÌJ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹˜ÛÙU\ØYXØÙ\ÜÏXÛ‹XØÙ\ÜÐÛÛ™šYË™XÛÙJZ[ÌŠ
JNØœ™XZÎØØ\ÙHŽœ‹š[œÝ[X]QY˜][\›Z\ÜÚ[Û]š[ÌŠ
NØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]TÌJ
NÜ™]\›Šš\ÔÙ]
JK˜ÛÙU\ØYXØÙ\ÜÊI‰Š‹˜ÛÙU\ØYXØÙ\ÜÏXÛ‹XØÙ\ÜÐÛÛ™šYË™œ›ÛR”ÓÓŠK˜ÛÙU\ØYXØÙ\ÜÊJK
š\ÔÙ]
JKš[œÝ[X]QY˜][\›Z\ÜÚ[ÛŠI‰Š‹š[œÝ[X]QY˜][\›Z\ÜÚ[ÛT^JKš[œÝ[X]QY˜][\›Z\ÜÚ[ÛŠJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK˜ÛÙU\ØYXØÙ\ÜÈOO]›ÚY	‰Š‹˜ÛÙU\ØYXØÙ\ÜÏYK˜ÛÙU\ØYXØÙ\ÜÏØÛ‹XØÙ\ÜÐÛÛ™šYËÒ”ÓÓŠK˜ÛÙU\ØYXØÙ\ÜÊN›ÚY
KKš[œÝ[X]QY˜][\›Z\ÜÚ[ÛˆOO]›ÚY	‰Š‹š[œÝ[X]QY˜][\›Z\ÜÚ[Û]ÞJKš[œÝ[X]QY˜][\›Z\ÜÚ[ÛŠJKŸKœ›ÛT\X[
J^Û]TÌJ
NÜ™]\›ˆK˜ÛÙU\ØYXØÙ\ÜÈOO]›ÚY	‰™K˜ÛÙU\ØYXØÙ\ÜÈOO[[	‰Š‹˜ÛÙU\ØYXØÙ\ÜÏXÛ‹XØÙ\ÜÐÛÛ™šYË™œ›ÛT\X[
K˜ÛÙU\ØYXØÙ\ÜÊJK‹š[œÝ[X]QY˜][\›Z\ÜÚ[ÛYKš[œÝ[X]QY˜][\›Z\ÜÚ[ÛÏÌŸ_NÙ[˜Ý[ÛˆÌJ
^Ü™]\›žØÛÙR\Ú›™]ÈZ[\œ˜^KÜ™X]ÜŽˆˆ‹[œÝ[X]PÛÛ™šYÎ˜Û‹XØÙ\ÜÐÛÛ™šYË™œ›ÛT\X[
ßJ__XÛ‹ÛÙR[™›Ï^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒKÛÙR[™›È‹[˜ÛÙJK]Ü‹š[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK˜ÛÙR\Ú›[™ÝOOL	‰›‹Z[ÌŠL
K˜ž]\ÊK˜ÛÙR\Ú
KK˜Ü™X]ÜˆOOHˆ‰‰›‹Z[ÌŠN
KœÝš[™ÊK˜Ü™X]ÜŠKKš[œÝ[X]PÛÛ™šYÈOO]›ÚY	‰˜Û‹XØÙ\ÜÐÛÛ™šYË™[˜ÛÙJKš[œÝ[X]PÛÛ™šYË‹Z[ÌŠŠK™›ÜšÊ
JK›[[J
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆÜ‹š[˜\žT™XY\ÙN›™]ÈÜ‹š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹ZÌJ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹˜ÛÙR\Ú]˜ž]\Ê
NØœ™XZÎØØ\ÙHŽœ‹˜Ü™X]Ü]œÝš[™Ê
NØœ™XZÎØØ\ÙHNœ‹š[œÝ[X]PÛÛ™šYÏXÛ‹XØÙ\ÜÐÛÛ™šYË™XÛÙJZ[ÌŠ
JNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]ZÌJ
NÜ™]\›Šš\ÔÙ]
JK˜ÛÙR\Ú
I‰Š‹˜ÛÙR\ÚJ˜ž]\Ñœ›ÛP˜\ÙM
JK˜ÛÙR\Ú
JK
š\ÔÙ]
JK˜Ü™X]ÜŠI‰Š‹˜Ü™X]ÜTÝš[™ÊK˜Ü™X]ÜŠJK
š\ÔÙ]
JKš[œÝ[X]PÛÛ™šYÊI‰Š‹š[œÝ[X]PÛÛ™šYÏXÛ‹XØÙ\ÜÐÛÛ™šYË™œ›ÛR”ÓÓŠKš[œÝ[X]PÛÛ™šYÊJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK˜ÛÙR\ÚOO]›ÚY	‰Š‹˜ÛÙR\ÚJ˜˜\ÙMœ›ÛPž]\ÊJK˜ÛÙR\ÚOO]›ÚYÙK˜ÛÙR\Ú›™]ÈZ[\œ˜^JJKK˜Ü™X]ÜˆOO]›ÚY	‰Š‹˜Ü™X]ÜYK˜Ü™X]ÜŠKKš[œÝ[X]PÛÛ™šYÈOO]›ÚY	‰Š‹š[œÝ[X]PÛÛ™šYÏYKš[œÝ[X]PÛÛ™šYÏØÛ‹XØÙ\ÜÐÛÛ™šYËÒ”ÓÓŠKš[œÝ[X]PÛÛ™šYÊN›ÚY
KŸKœ›ÛT\X[
J^Û]ZÌJ
NÜ™]\›ˆ‹˜ÛÙR\ÚYK˜ÛÙR\ÚÏÛ™]ÈZ[\œ˜^K‹˜Ü™X]ÜYK˜Ü™X]ÜÏÈˆ‹Kš[œÝ[X]PÛÛ™šYÈOO]›ÚY	‰™Kš[œÝ[X]PÛÛ™šYÈOO[[	‰Š‹š[œÝ[X]PÛÛ™šYÏXÛ‹XØÙ\ÜÐÛÛ™šYË™œ›ÛT\X[
Kš[œÝ[X]PÛÛ™šYÊJKŸ_NÙ[˜Ý[ÛˆLJ
^Ü™]\›žØÛÙRYšYÒ[

KÜ™X]ÜŽˆˆ‹YZ[Žˆˆ‹X™[ˆˆ‹Ü™X]Y›ÚYX˜ÔÜYˆˆ‹^[œÚ[ÛŽ›ÚYX˜Ì”ÜYˆˆŸ_XÛ‹ÛÛ˜XÝ[™›Ï^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒKÛÛ˜XÝ[™›È‹[˜ÛÙJK]Ü‹š[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK˜ÛÙRYOOPšYÒ[

I‰›‹Z[ÌŠ
KZ[
K˜ÛÙRY
KK˜Ü™X]ÜˆOOHˆ‰‰›‹Z[ÌŠN
KœÝš[™ÊK˜Ü™X]ÜŠKK˜YZ[ˆOOHˆ‰‰›‹Z[ÌŠŠKœÝš[™ÊK˜YZ[ŠKK›X™[OOHˆ‰‰›‹Z[ÌŠÍ
KœÝš[™ÊK›X™[
KK˜Ü™X]YOO]›ÚY	‰˜Û‹XœÛÛ]UÜÚ][Û‹™[˜ÛÙJK˜Ü™X]Y‹Z[ÌŠŠK™›ÜšÊ
JK›[[J
KKšX˜ÔÜYOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊKšX˜ÔÜY
KK™^[œÚ[ÛˆOO]›ÚY	‰”YË[žK™[˜ÛÙJK™^[œÚ[Û‹‹Z[ÌŠN
K™›ÜšÊ
JK›[[J
KKšX˜Ì”ÜYOOHˆ‰‰›‹Z[ÌŠŠKœÝš[™ÊKšX˜Ì”ÜY
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆÜ‹š[˜\žT™XY\ÙN›™]ÈÜ‹š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹QLJ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹˜ÛÙRY]Z[

NØœ™XZÎØØ\ÙHŽœ‹˜Ü™X]Ü]œÝš[™Ê
NØœ™XZÎØØ\ÙHÎœ‹˜YZ[]œÝš[™Ê
NØœ™XZÎØØ\ÙHœ‹›X™[]œÝš[™Ê
NØœ™XZÎØØ\ÙHNœ‹˜Ü™X]YXÛ‹XœÛÛ]UÜÚ][Û‹™XÛÙJZ[ÌŠ
JNØœ™XZÎØØ\ÙHŽœ‹šX˜ÔÜY]œÝš[™Ê
NØœ™XZÎØØ\ÙHÎœ‹™^[œÚ[ÛTYË[žK™XÛÙJZ[ÌŠ
JNØœ™XZÎØØ\ÙHœ‹šX˜Ì”ÜY]œÝš[™Ê
NØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]QLJ
NÜ™]\›Šš\ÔÙ]
JK˜ÛÙRY
I‰Š‹˜ÛÙRYPšYÒ[
K˜ÛÙRYÔÝš[™Ê
JJK
š\ÔÙ]
JK˜Ü™X]ÜŠI‰Š‹˜Ü™X]ÜTÝš[™ÊK˜Ü™X]ÜŠJK
š\ÔÙ]
JK˜YZ[ŠI‰Š‹˜YZ[TÝš[™ÊK˜YZ[ŠJK
š\ÔÙ]
JK›X™[
I‰Š‹›X™[TÝš[™ÊK›X™[
JK
š\ÔÙ]
JK˜Ü™X]Y
I‰Š‹˜Ü™X]YXÛ‹XœÛÛ]UÜÚ][Û‹™œ›ÛR”ÓÓŠK˜Ü™X]Y
JK
š\ÔÙ]
JKšX˜ÔÜY
I‰Š‹šX˜ÔÜYTÝš[™ÊKšX˜ÔÜY
JK
š\ÔÙ]
JK™^[œÚ[ÛŠI‰Š‹™^[œÚ[ÛTYË[žK™œ›ÛR”ÓÓŠK™^[œÚ[ÛŠJK
š\ÔÙ]
JKšX˜Ì”ÜY
I‰Š‹šX˜Ì”ÜYTÝš[™ÊKšX˜Ì”ÜY
JKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK˜ÛÙRYOO]›ÚY	‰Š‹˜ÛÙRYJK˜ÛÙRYšYÒ[

JKÔÝš[™Ê
JKK˜Ü™X]ÜˆOO]›ÚY	‰Š‹˜Ü™X]ÜYK˜Ü™X]ÜŠKK˜YZ[ˆOO]›ÚY	‰Š‹˜YZ[YK˜YZ[ŠKK›X™[OO]›ÚY	‰Š‹›X™[YK›X™[
KK˜Ü™X]YOO]›ÚY	‰Š‹˜Ü™X]YYK˜Ü™X]YØÛ‹XœÛÛ]UÜÚ][Û‹Ò”ÓÓŠK˜Ü™X]Y
N›ÚY
KKšX˜ÔÜYOO]›ÚY	‰Š‹šX˜ÔÜYYKšX˜ÔÜY
KK™^[œÚ[ÛˆOO]›ÚY	‰Š‹™^[œÚ[ÛYK™^[œÚ[ÛÔYË[žKÒ”ÓÓŠK™^[œÚ[ÛŠN›ÚY
KKšX˜Ì”ÜYOO]›ÚY	‰Š‹šX˜Ì”ÜYYKšX˜Ì”ÜY
KŸKœ›ÛT\X[
J^Û]QLJ
NÜ™]\›ˆK˜ÛÙRYOO]›ÚY	‰™K˜ÛÙRYOO[[	‰Š‹˜ÛÙRYPšYÒ[
K˜ÛÙRYÔÝš[™Ê
JJK‹˜Ü™X]ÜYK˜Ü™X]ÜÏÈˆ‹‹˜YZ[YK˜YZ[ÏÈˆ‹‹›X™[YK›X™[ÏÈˆ‹K˜Ü™X]YOO]›ÚY	‰™K˜Ü™X]YOO[[	‰Š‹˜Ü™X]YXÛ‹XœÛÛ]UÜÚ][Û‹™œ›ÛT\X[
K˜Ü™X]Y
JK‹šX˜ÔÜYYKšX˜ÔÜYÏÈˆ‹K™^[œÚ[ÛˆOO]›ÚY	‰™K™^[œÚ[ÛˆOO[[	‰Š‹™^[œÚ[ÛTYË[žK™œ›ÛT\X[
K™^[œÚ[ÛŠJK‹šX˜Ì”ÜYYKšX˜Ì”ÜYÏÈˆ‹Ÿ_NÙ[˜Ý[ÛˆLJ
^Ü™]\›žÛÜ\˜][ÛŽŒÛÙRYšYÒ[

K\]Y›ÚY\ÙÎ›™]ÈZ[\œ˜^__XÛ‹ÛÛ˜XÝÛÙR\ÝÜžQ[žO^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒKÛÛ˜XÝÛÙR\ÝÜžQ[žH‹[˜ÛÙJK]Ü‹š[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK›Ü\˜][ÛˆOOL	‰›‹Z[ÌŠ
Kš[ÌŠK›Ü\˜][ÛŠKK˜ÛÙRYOOPšYÒ[

I‰›‹Z[ÌŠMŠKZ[
K˜ÛÙRY
KK\]YOO]›ÚY	‰˜Û‹XœÛÛ]UÜÚ][Û‹™[˜ÛÙJK\]Y‹Z[ÌŠŠK™›ÜšÊ
JK›[[J
KK›\ÙË›[™ÝOOL	‰›‹Z[ÌŠÍ
K˜ž]\ÊK›\ÙÊKŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆÜ‹š[˜\žT™XY\ÙN›™]ÈÜ‹š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹TLJ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹›Ü\˜][Û]š[ÌŠ
NØœ™XZÎØØ\ÙHŽœ‹˜ÛÙRY]Z[

NØœ™XZÎØØ\ÙHÎœ‹\]YXÛ‹XœÛÛ]UÜÚ][Û‹™XÛÙJZ[ÌŠ
JNØœ™XZÎØØ\ÙHœ‹›\ÙÏ]˜ž]\Ê
NØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]TLJ
NÜ™]\›Šš\ÔÙ]
JK›Ü\˜][ÛŠI‰Š‹›Ü\˜][Û^ÊK›Ü\˜][ÛŠJK
š\ÔÙ]
JK˜ÛÙRY
I‰Š‹˜ÛÙRYPšYÒ[
K˜ÛÙRYÔÝš[™Ê
JJK
š\ÔÙ]
JK\]Y
I‰Š‹\]YXÛ‹XœÛÛ]UÜÚ][Û‹™œ›ÛR”ÓÓŠK\]Y
JK
š\ÔÙ]
JK›\ÙÊI‰Š‹›\ÙÏJ˜ž]\Ñœ›ÛP˜\ÙM
JK›\ÙÊJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK›Ü\˜][ÛˆOO]›ÚY	‰Š‹›Ü\˜][ÛUÊK›Ü\˜][ÛŠJKK˜ÛÙRYOO]›ÚY	‰Š‹˜ÛÙRYJK˜ÛÙRYšYÒ[

JKÔÝš[™Ê
JKK\]YOO]›ÚY	‰Š‹\]YYK\]YØÛ‹XœÛÛ]UÜÚ][Û‹Ò”ÓÓŠK\]Y
N›ÚY
KK›\ÙÈOO]›ÚY	‰Š‹›\ÙÏJ˜˜\ÙMœ›ÛPž]\ÊJK›\ÙÈOO]›ÚYÙK›\ÙÎ›™]ÈZ[\œ˜^JJKŸKœ›ÛT\X[
J^Û]TLJ
NÜ™]\›ˆ‹›Ü\˜][ÛYK›Ü\˜][ÛÏÌK˜ÛÙRYOO]›ÚY	‰™K˜ÛÙRYOO[[	‰Š‹˜ÛÙRYPšYÒ[
K˜ÛÙRYÔÝš[™Ê
JJKK\]YOO]›ÚY	‰™K\]YOO[[	‰Š‹\]YXÛ‹XœÛÛ]UÜÚ][Û‹™œ›ÛT\X[
K\]Y
JK‹›\ÙÏYK›\ÙÏÏÛ™]ÈZ[\œ˜^KŸ_NÙ[˜Ý[ÛˆÌJ
^Ü™]\›žØ›ØÚÒZYÚšYÒ[

K[™^šYÒ[

__XÛ‹XœÛÛ]UÜÚ][Û^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒKXœÛÛ]UÜÚ][Ûˆ‹[˜ÛÙJK]Ü‹š[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK˜›ØÚÒZYÚOOPšYÒ[

I‰›‹Z[ÌŠ
KZ[
K˜›ØÚÒZYÚ
KK[™^OOPšYÒ[

I‰›‹Z[ÌŠMŠKZ[
K[™^
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆÜ‹š[˜\žT™XY\ÙN›™]ÈÜ‹š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹]ÌJ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹˜›ØÚÒZYÚ]Z[

NØœ™XZÎØØ\ÙHŽœ‹[™^]Z[

NØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]]ÌJ
NÜ™]\›Šš\ÔÙ]
JK˜›ØÚÒZYÚ
I‰Š‹˜›ØÚÒZYÚPšYÒ[
K˜›ØÚÒZYÚÔÝš[™Ê
JJK
š\ÔÙ]
JK[™^
I‰Š‹[™^PšYÒ[
K[™^ÔÝš[™Ê
JJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK˜›ØÚÒZYÚOO]›ÚY	‰Š‹˜›ØÚÒZYÚJK˜›ØÚÒZYÚšYÒ[

JKÔÝš[™Ê
JKK[™^OO]›ÚY	‰Š‹[™^JK[™^šYÒ[

JKÔÝš[™Ê
JKŸKœ›ÛT\X[
J^Û]]ÌJ
NÜ™]\›ˆK˜›ØÚÒZYÚOO]›ÚY	‰™K˜›ØÚÒZYÚOO[[	‰Š‹˜›ØÚÒZYÚPšYÒ[
K˜›ØÚÒZYÚÔÝš[™Ê
JJKK[™^OO]›ÚY	‰™K[™^OO[[	‰Š‹[™^PšYÒ[
K[™^ÔÝš[™Ê
JJKŸ_NÙ[˜Ý[ÛˆŒJ
^Ü™]\›žÚÙ^N›™]ÈZ[\œ˜^K˜[YN›™]ÈZ[\œ˜^__XÛ‹“[Ù[^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK“[Ù[‹[˜ÛÙJK]Ü‹š[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆKšÙ^K›[™ÝOOL	‰›‹Z[ÌŠL
K˜ž]\ÊKšÙ^JKK˜[YK›[™ÝOOL	‰›‹Z[ÌŠN
K˜ž]\ÊK˜[YJKŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆÜ‹š[˜\žT™XY\ÙN›™]ÈÜ‹š[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹XŒJ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹šÙ^O]˜ž]\Ê
NØœ™XZÎØØ\ÙHŽœ‹˜[YO]˜ž]\Ê
NØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]XŒJ
NÜ™]\›Šš\ÔÙ]
JKšÙ^JI‰Š‹šÙ^OJ˜ž]\Ñœ›ÛP˜\ÙM
JKšÙ^JJK
š\ÔÙ]
JK˜[YJI‰Š‹˜[YOJ˜ž]\Ñœ›ÛP˜\ÙM
JK˜[YJJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆKšÙ^HOO]›ÚY	‰Š‹šÙ^OJ˜˜\ÙMœ›ÛPž]\ÊJKšÙ^HOO]›ÚYÙKšÙ^N›™]ÈZ[\œ˜^JJKK˜[YHOO]›ÚY	‰Š‹˜[YOJ˜˜\ÙMœ›ÛPž]\ÊJK˜[YHOO]›ÚYÙK˜[YN›™]ÈZ[\œ˜^JJKŸKœ›ÛT\X[
J^Û]XŒJ
NÜ™]\›ˆ‹šÙ^OYKšÙ^OÏÛ™]ÈZ[\œ˜^K‹˜[YOYK˜[YOÏÛ™]ÈZ[\œ˜^KŸ__JNÝ˜\ˆ‘ÏRJOžÈ\ÙHÝšXÝŽÓØš™XÝ™Yš[™T›Ü\J‹—×Ù\Ó[Ù[H‹Ý˜[YNˆLJNÕ‹“\ÙÐÛY[[\U‹“\ÙÕ\]PÛÛ˜XÝX™[™\ÜÛœÙOU‹“\ÙÕ\]PÛÛ˜XÝX™[U‹“\ÙÔÝÜ™P[™ZYÜ˜]PÛÛ˜XÝ™\ÜÛœÙOU‹“\ÙÔÝÜ™P[™ZYÜ˜]PÛÛ˜XÝU‹“\ÙÔ™[[Ý™PÛÙU\ØY\˜[\ÐY™\ÜÙ\Ô™\ÜÛœÙOU‹“\ÙÔ™[[Ý™PÛÙU\ØY\˜[\ÐY™\ÜÙ\ÏU‹“\ÙÐYÛÙU\ØY\˜[\ÐY™\ÜÙ\Ô™\ÜÛœÙOU‹“\ÙÐYÛÙU\ØY\˜[\ÐY™\ÜÙ\ÏU‹“\ÙÔÝÜ™P[™[œÝ[X]PÛÛ˜XÝ™\ÜÛœÙOU‹“\ÙÔÝÜ™P[™[œÝ[X]PÛÛ˜XÝU‹“\ÙÕ[œ[ÛÙ\Ô™\ÜÛœÙOU‹“\ÙÕ[œ[ÛÙ\ÏU‹“\ÙÔ[ÛÙ\Ô™\ÜÛœÙOU‹“\ÙÔ[ÛÙ\ÏU‹“\ÙÔÝYÐÛÛ˜XÝ™\ÜÛœÙOU‹“\ÙÔÝYÐÛÛ˜XÝU‹“\ÙÕ\]T\˜[\Ô™\ÜÛœÙOU‹“\ÙÕ\]T\˜[\ÏU‹“\ÙÕ\]R[œÝ[X]PÛÛ™šYÔ™\ÜÛœÙOU‹“\ÙÕ\]R[œÝ[X]PÛÛ™šYÏU‹“\ÙÐÛX\YZ[”™\ÜÛœÙOU‹“\ÙÐÛX\YZ[U‹“\ÙÕ\]PYZ[”™\ÜÛœÙOU‹“\ÙÕ\]PYZ[U‹“\ÙÓZYÜ˜]PÛÛ˜XÝ™\ÜÛœÙOU‹“\ÙÓZYÜ˜]PÛÛ˜XÝU‹“\ÙÑ^XÝ]PÛÛ˜XÝ™\ÜÛœÙOU‹“\ÙÑ^XÝ]PÛÛ˜XÝU‹“\ÙÒ[œÝ[X]PÛÛ˜XÝ”™\ÜÛœÙOU‹“\ÙÒ[œÝ[X]PÛÛ˜XÝU‹“\ÙÒ[œÝ[X]PÛÛ˜XÝ™\ÜÛœÙOU‹“\ÙÒ[œÝ[X]PÛÛ˜XÝU‹“\ÙÔÝÜ™PÛÙT™\ÜÛœÙOU‹“\ÙÔÝÜ™PÛÙOU‹œ›ÝØY”XÚØYÙO]›ÚYÝ˜\ˆ	R‘Ê
KÚOQŠ
KOPÙJ
KOQYJ
NÕ‹œ›ÝØY”XÚØYÙOH˜ÛÜÛ]Ø\ÛKØ\ÛKŒHŽÙ[˜Ý[ÛˆŒJ
^Ü™]\›žÜÙ[™\Žˆˆ‹Ø\ÛPž]PÛÙN›™]ÈZ[\œ˜^K[œÝ[X]T\›Z\ÜÚ[ÛŽ›ÚY_U‹“\ÙÔÝÜ™PÛÙO^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÔÝÜ™PÛÙH‹[˜ÛÙJK\Kš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆKœÙ[™\ˆOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊKœÙ[™\ŠKKØ\ÛPž]PÛÙK›[™ÝOOL	‰›‹Z[ÌŠN
K˜ž]\ÊKØ\ÛPž]PÛÙJKKš[œÝ[X]T\›Z\ÜÚ[ÛˆOO]›ÚY	‰‰XØÙ\ÜÐÛÛ™šYË™[˜ÛÙJKš[œÝ[X]T\›Z\ÜÚ[Û‹‹Z[ÌŠŠK™›ÜšÊ
JK›[[J
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆKš[˜\žT™XY\ÙN›™]ÈKš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹TŒJ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹œÙ[™\]œÝš[™Ê
NØœ™XZÎØØ\ÙHŽœ‹Ø\ÛPž]PÛÙO]˜ž]\Ê
NØœ™XZÎØØ\ÙHNœ‹š[œÝ[X]T\›Z\ÜÚ[ÛIXØÙ\ÜÐÛÛ™šYË™XÛÙJZ[ÌŠ
JNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]TŒJ
NÜ™]\›ŠKš\ÔÙ]
JKœÙ[™\ŠI‰Š‹œÙ[™\TÝš[™ÊKœÙ[™\ŠJK
Kš\ÔÙ]
JKØ\ÛPž]PÛÙJI‰Š‹Ø\ÛPž]PÛÙOJK˜ž]\Ñœ›ÛP˜\ÙM
JKØ\ÛPž]PÛÙJJK
Kš\ÔÙ]
JKš[œÝ[X]T\›Z\ÜÚ[ÛŠI‰Š‹š[œÝ[X]T\›Z\ÜÚ[ÛIXØÙ\ÜÐÛÛ™šYË™œ›ÛR”ÓÓŠKš[œÝ[X]T\›Z\ÜÚ[ÛŠJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆKœÙ[™\ˆOO]›ÚY	‰Š‹œÙ[™\YKœÙ[™\ŠKKØ\ÛPž]PÛÙHOO]›ÚY	‰Š‹Ø\ÛPž]PÛÙOJK˜˜\ÙMœ›ÛPž]\ÊJKØ\ÛPž]PÛÙHOO]›ÚYÙKØ\ÛPž]PÛÙN›™]ÈZ[\œ˜^JJKKš[œÝ[X]T\›Z\ÜÚ[ÛˆOO]›ÚY	‰Š‹š[œÝ[X]T\›Z\ÜÚ[ÛYKš[œÝ[X]T\›Z\ÜÚ[ÛÉXØÙ\ÜÐÛÛ™šYËÒ”ÓÓŠKš[œÝ[X]T\›Z\ÜÚ[ÛŠN›ÚY
KŸKœ›ÛT\X[
J^Û]TŒJ
NÜ™]\›ˆ‹œÙ[™\YKœÙ[™\ÏÈˆ‹‹Ø\ÛPž]PÛÙOYKØ\ÛPž]PÛÙOÏÛ™]ÈZ[\œ˜^KKš[œÝ[X]T\›Z\ÜÚ[ÛˆOO]›ÚY	‰™Kš[œÝ[X]T\›Z\ÜÚ[ÛˆOO[[	‰Š‹š[œÝ[X]T\›Z\ÜÚ[ÛIXØÙ\ÜÐÛÛ™šYË™œ›ÛT\X[
Kš[œÝ[X]T\›Z\ÜÚ[ÛŠJKŸ_NÙ[˜Ý[ÛˆJ
^Ü™]\›žØÛÙRYšYÒ[

KÚXÚÜÝ[N›™]ÈZ[\œ˜^__U‹“\ÙÔÝÜ™PÛÙT™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÔÝÜ™PÛÙT™\ÜÛœÙH‹[˜ÛÙJK\Kš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK˜ÛÙRYOOPšYÒ[

I‰›‹Z[ÌŠ
KZ[
K˜ÛÙRY
KK˜ÚXÚÜÝ[K›[™ÝOOL	‰›‹Z[ÌŠN
K˜ž]\ÊK˜ÚXÚÜÝ[JKŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆKš[˜\žT™XY\ÙN›™]ÈKš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹TJ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹˜ÛÙRY]Z[

NØœ™XZÎØØ\ÙHŽœ‹˜ÚXÚÜÝ[O]˜ž]\Ê
NØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]TJ
NÜ™]\›ŠKš\ÔÙ]
JK˜ÛÙRY
I‰Š‹˜ÛÙRYPšYÒ[
K˜ÛÙRYÔÝš[™Ê
JJK
Kš\ÔÙ]
JK˜ÚXÚÜÝ[JI‰Š‹˜ÚXÚÜÝ[OJK˜ž]\Ñœ›ÛP˜\ÙM
JK˜ÚXÚÜÝ[JJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK˜ÛÙRYOO]›ÚY	‰Š‹˜ÛÙRYJK˜ÛÙRYšYÒ[

JKÔÝš[™Ê
JKK˜ÚXÚÜÝ[HOO]›ÚY	‰Š‹˜ÚXÚÜÝ[OJK˜˜\ÙMœ›ÛPž]\ÊJK˜ÚXÚÜÝ[HOO]›ÚYÙK˜ÚXÚÜÝ[N›™]ÈZ[\œ˜^JJKŸKœ›ÛT\X[
J^Û]TJ
NÜ™]\›ˆK˜ÛÙRYOO]›ÚY	‰™K˜ÛÙRYOO[[	‰Š‹˜ÛÙRYPšYÒ[
K˜ÛÙRYÔÝš[™Ê
JJK‹˜ÚXÚÜÝ[OYK˜ÚXÚÜÝ[OÏÛ™]ÈZ[\œ˜^KŸ_NÙ[˜Ý[ÛˆŒJ
^Ü™]\›žÜÙ[™\Žˆˆ‹YZ[Žˆˆ‹ÛÙRYšYÒ[

KX™[ˆˆ‹\ÙÎ›™]ÈZ[\œ˜^K[™Î–×__U‹“\ÙÒ[œÝ[X]PÛÛ˜XÝ^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÒ[œÝ[X]PÛÛ˜XÝ‹[˜ÛÙJK\Kš[˜\žUÜš]\‹˜Ü™X]J
J^ÙKœÙ[™\ˆOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊKœÙ[™\ŠKK˜YZ[ˆOOHˆ‰‰›‹Z[ÌŠN
KœÝš[™ÊK˜YZ[ŠKK˜ÛÙRYOOPšYÒ[

I‰›‹Z[ÌŠ
KZ[
K˜ÛÙRY
KK›X™[OOHˆ‰‰›‹Z[ÌŠÍ
KœÝš[™ÊK›X™[
KK›\ÙË›[™ÝOOL	‰›‹Z[ÌŠŠK˜ž]\ÊK›\ÙÊNÙ›ÜŠ]ÙˆK™[™ÊYÚKÛÚ[‹™[˜ÛÙJ‹Z[ÌŠL
K™›ÜšÊ
JK›[[J
NÜ™]\›ˆŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆKš[˜\žT™XY\ÙN›™]ÈKš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹SŒJ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹œÙ[™\]œÝš[™Ê
NØœ™XZÎØØ\ÙHŽœ‹˜YZ[]œÝš[™Ê
NØœ™XZÎØØ\ÙHÎœ‹˜ÛÙRY]Z[

NØœ™XZÎØØ\ÙHœ‹›X™[]œÝš[™Ê
NØœ™XZÎØØ\ÙHNœ‹›\ÙÏ]˜ž]\Ê
NØœ™XZÎØØ\ÙHŽœ‹™[™Ëœ\Ú
ÚKÛÚ[‹™XÛÙJZ[ÌŠ
JJNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]SŒJ
NÜ™]\›ŠKš\ÔÙ]
JKœÙ[™\ŠI‰Š‹œÙ[™\TÝš[™ÊKœÙ[™\ŠJK
Kš\ÔÙ]
JK˜YZ[ŠI‰Š‹˜YZ[TÝš[™ÊK˜YZ[ŠJK
Kš\ÔÙ]
JK˜ÛÙRY
I‰Š‹˜ÛÙRYPšYÒ[
K˜ÛÙRYÔÝš[™Ê
JJK
Kš\ÔÙ]
JK›X™[
I‰Š‹›X™[TÝš[™ÊK›X™[
JK
Kš\ÔÙ]
JK›\ÙÊI‰Š‹›\ÙÏJK˜ž]\Ñœ›ÛP˜\ÙM
JK›\ÙÊJK\œ˜^Kš\Ð\œ˜^JOË™[™ÊI‰Š‹™[™ÏYK™[™Ë›X\
O™ÚKÛÚ[‹™œ›ÛR”ÓÓŠ
JJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆKœÙ[™\ˆOO]›ÚY	‰Š‹œÙ[™\YKœÙ[™\ŠKK˜YZ[ˆOO]›ÚY	‰Š‹˜YZ[YK˜YZ[ŠKK˜ÛÙRYOO]›ÚY	‰Š‹˜ÛÙRYJK˜ÛÙRYšYÒ[

JKÔÝš[™Ê
JKK›X™[OO]›ÚY	‰Š‹›X™[YK›X™[
KK›\ÙÈOO]›ÚY	‰Š‹›\ÙÏJK˜˜\ÙMœ›ÛPž]\ÊJK›\ÙÈOO]›ÚYÙK›\ÙÎ›™]ÈZ[\œ˜^JJKK™[™ÏÛ‹™[™ÏYK™[™Ë›X\
OÙÚKÛÚ[‹Ò”ÓÓŠ
N›ÚY
N›‹™[™ÏV×KŸKœ›ÛT\X[
J^Û]SŒJ
NÜ™]\›ˆ‹œÙ[™\YKœÙ[™\ÏÈˆ‹‹˜YZ[YK˜YZ[ÏÈˆ‹K˜ÛÙRYOO]›ÚY	‰™K˜ÛÙRYOO[[	‰Š‹˜ÛÙRYPšYÒ[
K˜ÛÙRYÔÝš[™Ê
JJK‹›X™[YK›X™[ÏÈˆ‹‹›\ÙÏYK›\ÙÏÏÛ™]ÈZ[\œ˜^K‹™[™ÏYK™[™ÏË›X\
O™ÚKÛÚ[‹™œ›ÛT\X[

J_×KŸ_NÙ[˜Ý[ÛˆŒJ
^Ü™]\›žØY™\ÜÎˆˆ‹]N›™]ÈZ[\œ˜^__U‹“\ÙÒ[œÝ[X]PÛÛ˜XÝ™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÒ[œÝ[X]PÛÛ˜XÝ™\ÜÛœÙH‹[˜ÛÙJK\Kš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK˜Y™\ÜÈOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊK˜Y™\ÜÊKK™]K›[™ÝOOL	‰›‹Z[ÌŠN
K˜ž]\ÊK™]JKŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆKš[˜\žT™XY\ÙN›™]ÈKš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹]ŒJ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹˜Y™\ÜÏ]œÝš[™Ê
NØœ™XZÎØØ\ÙHŽœ‹™]O]˜ž]\Ê
NØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]]ŒJ
NÜ™]\›ŠKš\ÔÙ]
JK˜Y™\ÜÊI‰Š‹˜Y™\ÜÏTÝš[™ÊK˜Y™\ÜÊJK
Kš\ÔÙ]
JK™]JI‰Š‹™]OJK˜ž]\Ñœ›ÛP˜\ÙM
JK™]JJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK˜Y™\ÜÈOO]›ÚY	‰Š‹˜Y™\ÜÏYK˜Y™\ÜÊKK™]HOO]›ÚY	‰Š‹™]OJK˜˜\ÙMœ›ÛPž]\ÊJK™]HOO]›ÚYÙK™]N›™]ÈZ[\œ˜^JJKŸKœ›ÛT\X[
J^Û]]ŒJ
NÜ™]\›ˆ‹˜Y™\ÜÏYK˜Y™\ÜÏÏÈˆ‹‹™]OYK™]OÏÛ™]ÈZ[\œ˜^KŸ_NÙ[˜Ý[ÛˆÌJ
^Ü™]\›žÜÙ[™\Žˆˆ‹YZ[Žˆˆ‹ÛÙRYšYÒ[

KX™[ˆˆ‹\ÙÎ›™]ÈZ[\œ˜^K[™Î–×KØ[›™]ÈZ[\œ˜^Kš^\ÙÎˆL__U‹“\ÙÒ[œÝ[X]PÛÛ˜XÝ^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÒ[œÝ[X]PÛÛ˜XÝˆ‹[˜ÛÙJK\Kš[˜\žUÜš]\‹˜Ü™X]J
J^ÙKœÙ[™\ˆOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊKœÙ[™\ŠKK˜YZ[ˆOOHˆ‰‰›‹Z[ÌŠN
KœÝš[™ÊK˜YZ[ŠKK˜ÛÙRYOOPšYÒ[

I‰›‹Z[ÌŠ
KZ[
K˜ÛÙRY
KK›X™[OOHˆ‰‰›‹Z[ÌŠÍ
KœÝš[™ÊK›X™[
KK›\ÙË›[™ÝOOL	‰›‹Z[ÌŠŠK˜ž]\ÊK›\ÙÊNÙ›ÜŠ]ÙˆK™[™ÊYÚKÛÚ[‹™[˜ÛÙJ‹Z[ÌŠL
K™›ÜšÊ
JK›[[J
NÜ™]\›ˆKœØ[›[™ÝOOL	‰›‹Z[ÌŠN
K˜ž]\ÊKœØ[
KK™š^\ÙÏOOHL	‰›‹Z[ÌŠ
K˜›ÛÛ
K™š^\ÙÊKŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆKš[˜\žT™XY\ÙN›™]ÈKš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹SÌJ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹œÙ[™\]œÝš[™Ê
NØœ™XZÎØØ\ÙHŽœ‹˜YZ[]œÝš[™Ê
NØœ™XZÎØØ\ÙHÎœ‹˜ÛÙRY]Z[

NØœ™XZÎØØ\ÙHœ‹›X™[]œÝš[™Ê
NØœ™XZÎØØ\ÙHNœ‹›\ÙÏ]˜ž]\Ê
NØœ™XZÎØØ\ÙHŽœ‹™[™Ëœ\Ú
ÚKÛÚ[‹™XÛÙJZ[ÌŠ
JJNØœ™XZÎØØ\ÙHÎœ‹œØ[]˜ž]\Ê
NØœ™XZÎØØ\ÙHœ‹™š^\ÙÏ]˜›ÛÛ

NØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]SÌJ
NÜ™]\›ŠKš\ÔÙ]
JKœÙ[™\ŠI‰Š‹œÙ[™\TÝš[™ÊKœÙ[™\ŠJK
Kš\ÔÙ]
JK˜YZ[ŠI‰Š‹˜YZ[TÝš[™ÊK˜YZ[ŠJK
Kš\ÔÙ]
JK˜ÛÙRY
I‰Š‹˜ÛÙRYPšYÒ[
K˜ÛÙRYÔÝš[™Ê
JJK
Kš\ÔÙ]
JK›X™[
I‰Š‹›X™[TÝš[™ÊK›X™[
JK
Kš\ÔÙ]
JK›\ÙÊI‰Š‹›\ÙÏJK˜ž]\Ñœ›ÛP˜\ÙM
JK›\ÙÊJK\œ˜^Kš\Ð\œ˜^JOË™[™ÊI‰Š‹™[™ÏYK™[™Ë›X\
O™ÚKÛÚ[‹™œ›ÛR”ÓÓŠ
JJK
Kš\ÔÙ]
JKœØ[
I‰Š‹œØ[JK˜ž]\Ñœ›ÛP˜\ÙM
JKœØ[
JK
Kš\ÔÙ]
JK™š^\ÙÊI‰Š‹™š^\ÙÏHHYK™š^\ÙÊKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆKœÙ[™\ˆOO]›ÚY	‰Š‹œÙ[™\YKœÙ[™\ŠKK˜YZ[ˆOO]›ÚY	‰Š‹˜YZ[YK˜YZ[ŠKK˜ÛÙRYOO]›ÚY	‰Š‹˜ÛÙRYJK˜ÛÙRYšYÒ[

JKÔÝš[™Ê
JKK›X™[OO]›ÚY	‰Š‹›X™[YK›X™[
KK›\ÙÈOO]›ÚY	‰Š‹›\ÙÏJK˜˜\ÙMœ›ÛPž]\ÊJK›\ÙÈOO]›ÚYÙK›\ÙÎ›™]ÈZ[\œ˜^JJKK™[™ÏÛ‹™[™ÏYK™[™Ë›X\
OÙÚKÛÚ[‹Ò”ÓÓŠ
N›ÚY
N›‹™[™ÏV×KKœØ[OO]›ÚY	‰Š‹œØ[JK˜˜\ÙMœ›ÛPž]\ÊJKœØ[OO]›ÚYÙKœØ[›™]ÈZ[\œ˜^JJKK™š^\ÙÈOO]›ÚY	‰Š‹™š^\ÙÏYK™š^\ÙÊKŸKœ›ÛT\X[
J^Û]SÌJ
NÜ™]\›ˆ‹œÙ[™\YKœÙ[™\ÏÈˆ‹‹˜YZ[YK˜YZ[ÏÈˆ‹K˜ÛÙRYOO]›ÚY	‰™K˜ÛÙRYOO[[	‰Š‹˜ÛÙRYPšYÒ[
K˜ÛÙRYÔÝš[™Ê
JJK‹›X™[YK›X™[ÏÈˆ‹‹›\ÙÏYK›\ÙÏÏÛ™]ÈZ[\œ˜^K‹™[™ÏYK™[™ÏË›X\
O™ÚKÛÚ[‹™œ›ÛT\X[

J_×K‹œØ[YKœØ[ÏÛ™]ÈZ[\œ˜^K‹™š^\ÙÏYK™š^\ÙÏÏÈLKŸ_NÙ[˜Ý[ÛˆJ
^Ü™]\›žØY™\ÜÎˆˆ‹]N›™]ÈZ[\œ˜^__U‹“\ÙÒ[œÝ[X]PÛÛ˜XÝ”™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÒ[œÝ[X]PÛÛ˜XÝ”™\ÜÛœÙH‹[˜ÛÙJK\Kš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK˜Y™\ÜÈOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊK˜Y™\ÜÊKK™]K›[™ÝOOL	‰›‹Z[ÌŠN
K˜ž]\ÊK™]JKŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆKš[˜\žT™XY\ÙN›™]ÈKš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹QJ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹˜Y™\ÜÏ]œÝš[™Ê
NØœ™XZÎØØ\ÙHŽœ‹™]O]˜ž]\Ê
NØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]QJ
NÜ™]\›ŠKš\ÔÙ]
JK˜Y™\ÜÊI‰Š‹˜Y™\ÜÏTÝš[™ÊK˜Y™\ÜÊJK
Kš\ÔÙ]
JK™]JI‰Š‹™]OJK˜ž]\Ñœ›ÛP˜\ÙM
JK™]JJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK˜Y™\ÜÈOO]›ÚY	‰Š‹˜Y™\ÜÏYK˜Y™\ÜÊKK™]HOO]›ÚY	‰Š‹™]OJK˜˜\ÙMœ›ÛPž]\ÊJK™]HOO]›ÚYÙK™]N›™]ÈZ[\œ˜^JJKŸKœ›ÛT\X[
J^Û]QJ
NÜ™]\›ˆ‹˜Y™\ÜÏYK˜Y™\ÜÏÏÈˆ‹‹™]OYK™]OÏÛ™]ÈZ[\œ˜^KŸ_NÙ[˜Ý[ÛˆLJ
^Ü™]\›žÜÙ[™\Žˆˆ‹ÛÛ˜XÝˆˆ‹\ÙÎ›™]ÈZ[\œ˜^K[™Î–×__U‹“\ÙÑ^XÝ]PÛÛ˜XÝ^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÑ^XÝ]PÛÛ˜XÝ‹[˜ÛÙJK\Kš[˜\žUÜš]\‹˜Ü™X]J
J^ÙKœÙ[™\ˆOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊKœÙ[™\ŠKK˜ÛÛ˜XÝOOHˆ‰‰›‹Z[ÌŠN
KœÝš[™ÊK˜ÛÛ˜XÝ
KK›\ÙË›[™ÝOOL	‰›‹Z[ÌŠŠK˜ž]\ÊK›\ÙÊNÙ›ÜŠ]ÙˆK™[™ÊYÚKÛÚ[‹™[˜ÛÙJ‹Z[ÌŠŠK™›ÜšÊ
JK›[[J
NÜ™]\›ˆŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆKš[˜\žT™XY\ÙN›™]ÈKš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹ULJ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹œÙ[™\]œÝš[™Ê
NØœ™XZÎØØ\ÙHŽœ‹˜ÛÛ˜XÝ]œÝš[™Ê
NØœ™XZÎØØ\ÙHÎœ‹›\ÙÏ]˜ž]\Ê
NØœ™XZÎØØ\ÙHNœ‹™[™Ëœ\Ú
ÚKÛÚ[‹™XÛÙJZ[ÌŠ
JJNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]ULJ
NÜ™]\›ŠKš\ÔÙ]
JKœÙ[™\ŠI‰Š‹œÙ[™\TÝš[™ÊKœÙ[™\ŠJK
Kš\ÔÙ]
JK˜ÛÛ˜XÝ
I‰Š‹˜ÛÛ˜XÝTÝš[™ÊK˜ÛÛ˜XÝ
JK
Kš\ÔÙ]
JK›\ÙÊI‰Š‹›\ÙÏJK˜ž]\Ñœ›ÛP˜\ÙM
JK›\ÙÊJK\œ˜^Kš\Ð\œ˜^JOË™[™ÊI‰Š‹™[™ÏYK™[™Ë›X\
O™ÚKÛÚ[‹™œ›ÛR”ÓÓŠ
JJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆKœÙ[™\ˆOO]›ÚY	‰Š‹œÙ[™\YKœÙ[™\ŠKK˜ÛÛ˜XÝOO]›ÚY	‰Š‹˜ÛÛ˜XÝYK˜ÛÛ˜XÝ
KK›\ÙÈOO]›ÚY	‰Š‹›\ÙÏJK˜˜\ÙMœ›ÛPž]\ÊJK›\ÙÈOO]›ÚYÙK›\ÙÎ›™]ÈZ[\œ˜^JJKK™[™ÏÛ‹™[™ÏYK™[™Ë›X\
OÙÚKÛÚ[‹Ò”ÓÓŠ
N›ÚY
N›‹™[™ÏV×KŸKœ›ÛT\X[
J^Û]ULJ
NÜ™]\›ˆ‹œÙ[™\YKœÙ[™\ÏÈˆ‹‹˜ÛÛ˜XÝYK˜ÛÛ˜XÝÏÈˆ‹‹›\ÙÏYK›\ÙÏÏÛ™]ÈZ[\œ˜^K‹™[™ÏYK™[™ÏË›X\
O™ÚKÛÚ[‹™œ›ÛT\X[

J_×KŸ_NÙ[˜Ý[ÛˆJ
^Ü™]\›žÙ]N›™]ÈZ[\œ˜^__U‹“\ÙÑ^XÝ]PÛÛ˜XÝ™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÑ^XÝ]PÛÛ˜XÝ™\ÜÛœÙH‹[˜ÛÙJK\Kš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK™]K›[™ÝOOL	‰›‹Z[ÌŠL
K˜ž]\ÊK™]JKŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆKš[˜\žT™XY\ÙN›™]ÈKš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹^J
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÛÏŒÏOOLOÜ‹™]O]˜ž]\Ê
NœÚÚ\\JÉÊ_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]^J
NÜ™]\›ŠKš\ÔÙ]
JK™]JI‰Š‹™]OJK˜ž]\Ñœ›ÛP˜\ÙM
JK™]JJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK™]HOO]›ÚY	‰Š‹™]OJK˜˜\ÙMœ›ÛPž]\ÊJK™]HOO]›ÚYÙK™]N›™]ÈZ[\œ˜^JJKŸKœ›ÛT\X[
J^Û]^J
NÜ™]\›ˆ‹™]OYK™]OÏÛ™]ÈZ[\œ˜^KŸ_NÙ[˜Ý[ÛˆJ
^Ü™]\›žÜÙ[™\Žˆˆ‹ÛÛ˜XÝˆˆ‹ÛÙRYšYÒ[

K\ÙÎ›™]ÈZ[\œ˜^__U‹“\ÙÓZYÜ˜]PÛÛ˜XÝ^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÓZYÜ˜]PÛÛ˜XÝ‹[˜ÛÙJK\Kš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆKœÙ[™\ˆOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊKœÙ[™\ŠKK˜ÛÛ˜XÝOOHˆ‰‰›‹Z[ÌŠN
KœÝš[™ÊK˜ÛÛ˜XÝ
KK˜ÛÙRYOOPšYÒ[

I‰›‹Z[ÌŠ
KZ[
K˜ÛÙRY
KK›\ÙË›[™ÝOOL	‰›‹Z[ÌŠÍ
K˜ž]\ÊK›\ÙÊKŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆKš[˜\žT™XY\ÙN›™]ÈKš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹UJ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹œÙ[™\]œÝš[™Ê
NØœ™XZÎØØ\ÙHŽœ‹˜ÛÛ˜XÝ]œÝš[™Ê
NØœ™XZÎØØ\ÙHÎœ‹˜ÛÙRY]Z[

NØœ™XZÎØØ\ÙHœ‹›\ÙÏ]˜ž]\Ê
NØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]UJ
NÜ™]\›ŠKš\ÔÙ]
JKœÙ[™\ŠI‰Š‹œÙ[™\TÝš[™ÊKœÙ[™\ŠJK
Kš\ÔÙ]
JK˜ÛÛ˜XÝ
I‰Š‹˜ÛÛ˜XÝTÝš[™ÊK˜ÛÛ˜XÝ
JK
Kš\ÔÙ]
JK˜ÛÙRY
I‰Š‹˜ÛÙRYPšYÒ[
K˜ÛÙRYÔÝš[™Ê
JJK
Kš\ÔÙ]
JK›\ÙÊI‰Š‹›\ÙÏJK˜ž]\Ñœ›ÛP˜\ÙM
JK›\ÙÊJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆKœÙ[™\ˆOO]›ÚY	‰Š‹œÙ[™\YKœÙ[™\ŠKK˜ÛÛ˜XÝOO]›ÚY	‰Š‹˜ÛÛ˜XÝYK˜ÛÛ˜XÝ
KK˜ÛÙRYOO]›ÚY	‰Š‹˜ÛÙRYJK˜ÛÙRYšYÒ[

JKÔÝš[™Ê
JKK›\ÙÈOO]›ÚY	‰Š‹›\ÙÏJK˜˜\ÙMœ›ÛPž]\ÊJK›\ÙÈOO]›ÚYÙK›\ÙÎ›™]ÈZ[\œ˜^JJKŸKœ›ÛT\X[
J^Û]UJ
NÜ™]\›ˆ‹œÙ[™\YKœÙ[™\ÏÈˆ‹‹˜ÛÛ˜XÝYK˜ÛÛ˜XÝÏÈˆ‹K˜ÛÙRYOO]›ÚY	‰™K˜ÛÙRYOO[[	‰Š‹˜ÛÙRYPšYÒ[
K˜ÛÙRYÔÝš[™Ê
JJK‹›\ÙÏYK›\ÙÏÏÛ™]ÈZ[\œ˜^KŸ_NÙ[˜Ý[ÛˆŒJ
^Ü™]\›žÙ]N›™]ÈZ[\œ˜^__U‹“\ÙÓZYÜ˜]PÛÛ˜XÝ™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÓZYÜ˜]PÛÛ˜XÝ™\ÜÛœÙH‹[˜ÛÙJK\Kš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK™]K›[™ÝOOL	‰›‹Z[ÌŠL
K˜ž]\ÊK™]JKŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆKš[˜\žT™XY\ÙN›™]ÈKš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹RŒJ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÛÏŒÏOOLOÜ‹™]O]˜ž]\Ê
NœÚÚ\\JÉÊ_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]RŒJ
NÜ™]\›ŠKš\ÔÙ]
JK™]JI‰Š‹™]OJK˜ž]\Ñœ›ÛP˜\ÙM
JK™]JJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK™]HOO]›ÚY	‰Š‹™]OJK˜˜\ÙMœ›ÛPž]\ÊJK™]HOO]›ÚYÙK™]N›™]ÈZ[\œ˜^JJKŸKœ›ÛT\X[
J^Û]RŒJ
NÜ™]\›ˆ‹™]OYK™]OÏÛ™]ÈZ[\œ˜^KŸ_NÙ[˜Ý[ÛˆŒJ
^Ü™]\›žÜÙ[™\Žˆˆ‹™]ÐYZ[Žˆˆ‹ÛÛ˜XÝˆˆŸ_U‹“\ÙÕ\]PYZ[^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÕ\]PYZ[ˆ‹[˜ÛÙJK\Kš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆKœÙ[™\ˆOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊKœÙ[™\ŠKK›™]ÐYZ[ˆOOHˆ‰‰›‹Z[ÌŠN
KœÝš[™ÊK›™]ÐYZ[ŠKK˜ÛÛ˜XÝOOHˆ‰‰›‹Z[ÌŠŠKœÝš[™ÊK˜ÛÛ˜XÝ
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆKš[˜\žT™XY\ÙN›™]ÈKš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹QŒJ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹œÙ[™\]œÝš[™Ê
NØœ™XZÎØØ\ÙHŽœ‹›™]ÐYZ[]œÝš[™Ê
NØœ™XZÎØØ\ÙHÎœ‹˜ÛÛ˜XÝ]œÝš[™Ê
NØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]QŒJ
NÜ™]\›ŠKš\ÔÙ]
JKœÙ[™\ŠI‰Š‹œÙ[™\TÝš[™ÊKœÙ[™\ŠJK
Kš\ÔÙ]
JK›™]ÐYZ[ŠI‰Š‹›™]ÐYZ[TÝš[™ÊK›™]ÐYZ[ŠJK
Kš\ÔÙ]
JK˜ÛÛ˜XÝ
I‰Š‹˜ÛÛ˜XÝTÝš[™ÊK˜ÛÛ˜XÝ
JKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆKœÙ[™\ˆOO]›ÚY	‰Š‹œÙ[™\YKœÙ[™\ŠKK›™]ÐYZ[ˆOO]›ÚY	‰Š‹›™]ÐYZ[YK›™]ÐYZ[ŠKK˜ÛÛ˜XÝOO]›ÚY	‰Š‹˜ÛÛ˜XÝYK˜ÛÛ˜XÝ
KŸKœ›ÛT\X[
J^Û]QŒJ
NÜ™]\›ˆ‹œÙ[™\YKœÙ[™\ÏÈˆ‹‹›™]ÐYZ[YK›™]ÐYZ[ÏÈˆ‹‹˜ÛÛ˜XÝYK˜ÛÛ˜XÝÏÈˆ‹Ÿ_NÙ[˜Ý[ÛˆLJ
^Ü™]\›žß_U‹“\ÙÕ\]PYZ[”™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÕ\]PYZ[”™\ÜÛœÙH‹[˜ÛÙJK\Kš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆKš[˜\žT™XY\ÙN›™]ÈKš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹\LJ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Ü™]\›ˆLJ
_KÒ”ÓÓŠJ^Ü™]\›žß_Kœ›ÛT\X[
J^Ü™]\›ˆLJ
__NÙ[˜Ý[ÛˆJ
^Ü™]\›žÜÙ[™\Žˆˆ‹ÛÛ˜XÝˆˆŸ_U‹“\ÙÐÛX\YZ[^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÐÛX\YZ[ˆ‹[˜ÛÙJK\Kš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆKœÙ[™\ˆOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊKœÙ[™\ŠKK˜ÛÛ˜XÝOOHˆ‰‰›‹Z[ÌŠŠKœÝš[™ÊK˜ÛÛ˜XÝ
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆKš[˜\žT™XY\ÙN›™]ÈKš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹RJ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹œÙ[™\]œÝš[™Ê
NØœ™XZÎØØ\ÙHÎœ‹˜ÛÛ˜XÝ]œÝš[™Ê
NØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]RJ
NÜ™]\›ŠKš\ÔÙ]
JKœÙ[™\ŠI‰Š‹œÙ[™\TÝš[™ÊKœÙ[™\ŠJK
Kš\ÔÙ]
JK˜ÛÛ˜XÝ
I‰Š‹˜ÛÛ˜XÝTÝš[™ÊK˜ÛÛ˜XÝ
JKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆKœÙ[™\ˆOO]›ÚY	‰Š‹œÙ[™\YKœÙ[™\ŠKK˜ÛÛ˜XÝOO]›ÚY	‰Š‹˜ÛÛ˜XÝYK˜ÛÛ˜XÝ
KŸKœ›ÛT\X[
J^Û]RJ
NÜ™]\›ˆ‹œÙ[™\YKœÙ[™\ÏÈˆ‹‹˜ÛÛ˜XÝYK˜ÛÛ˜XÝÏÈˆ‹Ÿ_NÙ[˜Ý[ÛˆLJ
^Ü™]\›žß_U‹“\ÙÐÛX\YZ[”™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÐÛX\YZ[”™\ÜÛœÙH‹[˜ÛÙJK\Kš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆKš[˜\žT™XY\ÙN›™]ÈKš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹SLJ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Ü™]\›ˆLJ
_KÒ”ÓÓŠJ^Ü™]\›žß_Kœ›ÛT\X[
J^Ü™]\›ˆLJ
__NÙ[˜Ý[ÛˆÌJ
^Ü™]\›žÜÙ[™\Žˆˆ‹ÛÙRYšYÒ[

K™]Ò[œÝ[X]T\›Z\ÜÚ[ÛŽ›ÚY_U‹“\ÙÕ\]R[œÝ[X]PÛÛ™šYÏ^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÕ\]R[œÝ[X]PÛÛ™šYÈ‹[˜ÛÙJK\Kš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆKœÙ[™\ˆOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊKœÙ[™\ŠKK˜ÛÙRYOOPšYÒ[

I‰›‹Z[ÌŠMŠKZ[
K˜ÛÙRY
KK›™]Ò[œÝ[X]T\›Z\ÜÚ[ÛˆOO]›ÚY	‰‰XØÙ\ÜÐÛÛ™šYË™[˜ÛÙJK›™]Ò[œÝ[X]T\›Z\ÜÚ[Û‹‹Z[ÌŠŠK™›ÜšÊ
JK›[[J
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆKš[˜\žT™XY\ÙN›™]ÈKš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹WÌJ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹œÙ[™\]œÝš[™Ê
NØœ™XZÎØØ\ÙHŽœ‹˜ÛÙRY]Z[

NØœ™XZÎØØ\ÙHÎœ‹›™]Ò[œÝ[X]T\›Z\ÜÚ[ÛIXØÙ\ÜÐÛÛ™šYË™XÛÙJZ[ÌŠ
JNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]WÌJ
NÜ™]\›ŠKš\ÔÙ]
JKœÙ[™\ŠI‰Š‹œÙ[™\TÝš[™ÊKœÙ[™\ŠJK
Kš\ÔÙ]
JK˜ÛÙRY
I‰Š‹˜ÛÙRYPšYÒ[
K˜ÛÙRYÔÝš[™Ê
JJK
Kš\ÔÙ]
JK›™]Ò[œÝ[X]T\›Z\ÜÚ[ÛŠI‰Š‹›™]Ò[œÝ[X]T\›Z\ÜÚ[ÛIXØÙ\ÜÐÛÛ™šYË™œ›ÛR”ÓÓŠK›™]Ò[œÝ[X]T\›Z\ÜÚ[ÛŠJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆKœÙ[™\ˆOO]›ÚY	‰Š‹œÙ[™\YKœÙ[™\ŠKK˜ÛÙRYOO]›ÚY	‰Š‹˜ÛÙRYJK˜ÛÙRYšYÒ[

JKÔÝš[™Ê
JKK›™]Ò[œÝ[X]T\›Z\ÜÚ[ÛˆOO]›ÚY	‰Š‹›™]Ò[œÝ[X]T\›Z\ÜÚ[ÛYK›™]Ò[œÝ[X]T\›Z\ÜÚ[ÛÉXØÙ\ÜÐÛÛ™šYËÒ”ÓÓŠK›™]Ò[œÝ[X]T\›Z\ÜÚ[ÛŠN›ÚY
KŸKœ›ÛT\X[
J^Û]WÌJ
NÜ™]\›ˆ‹œÙ[™\YKœÙ[™\ÏÈˆ‹K˜ÛÙRYOO]›ÚY	‰™K˜ÛÙRYOO[[	‰Š‹˜ÛÙRYPšYÒ[
K˜ÛÙRYÔÝš[™Ê
JJKK›™]Ò[œÝ[X]T\›Z\ÜÚ[ÛˆOO]›ÚY	‰™K›™]Ò[œÝ[X]T\›Z\ÜÚ[ÛˆOO[[	‰Š‹›™]Ò[œÝ[X]T\›Z\ÜÚ[ÛIXØÙ\ÜÐÛÛ™šYË™œ›ÛT\X[
K›™]Ò[œÝ[X]T\›Z\ÜÚ[ÛŠJKŸ_NÙ[˜Ý[ÛˆÌJ
^Ü™]\›žß_U‹“\ÙÕ\]R[œÝ[X]PÛÛ™šYÔ™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÕ\]R[œÝ[X]PÛÛ™šYÔ™\ÜÛœÙH‹[˜ÛÙJK\Kš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆKš[˜\žT™XY\ÙN›™]ÈKš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹QÌJ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Ü™]\›ˆÌJ
_KÒ”ÓÓŠJ^Ü™]\›žß_Kœ›ÛT\X[
J^Ü™]\›ˆÌJ
__NÙ[˜Ý[ÛˆŒJ
^Ü™]\›žØ]]Üš]Nˆˆ‹\˜[\Î‰”\˜[\Ë™œ›ÛT\X[
ßJ__U‹“\ÙÕ\]T\˜[\Ï^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÕ\]T\˜[\È‹[˜ÛÙJK\Kš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK˜]]Üš]HOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊK˜]]Üš]JKKœ\˜[\ÈOO]›ÚY	‰‰”\˜[\Ë™[˜ÛÙJKœ\˜[\Ë‹Z[ÌŠN
K™›ÜšÊ
JK›[[J
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆKš[˜\žT™XY\ÙN›™]ÈKš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹UŒJ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹˜]]Üš]O]œÝš[™Ê
NØœ™XZÎØØ\ÙHŽœ‹œ\˜[\ÏI”\˜[\Ë™XÛÙJZ[ÌŠ
JNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]UŒJ
NÜ™]\›ŠKš\ÔÙ]
JK˜]]Üš]JI‰Š‹˜]]Üš]OTÝš[™ÊK˜]]Üš]JJK
Kš\ÔÙ]
JKœ\˜[\ÊI‰Š‹œ\˜[\ÏI”\˜[\Ë™œ›ÛR”ÓÓŠKœ\˜[\ÊJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK˜]]Üš]HOO]›ÚY	‰Š‹˜]]Üš]OYK˜]]Üš]JKKœ\˜[\ÈOO]›ÚY	‰Š‹œ\˜[\ÏYKœ\˜[\ÏÉ”\˜[\ËÒ”ÓÓŠKœ\˜[\ÊN›ÚY
KŸKœ›ÛT\X[
J^Û]UŒJ
NÜ™]\›ˆ‹˜]]Üš]OYK˜]]Üš]OÏÈˆ‹Kœ\˜[\ÈOO]›ÚY	‰™Kœ\˜[\ÈOO[[	‰Š‹œ\˜[\ÏI”\˜[\Ë™œ›ÛT\X[
Kœ\˜[\ÊJKŸ_NÙ[˜Ý[ÛˆÌJ
^Ü™]\›žß_U‹“\ÙÕ\]T\˜[\Ô™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÕ\]T\˜[\Ô™\ÜÛœÙH‹[˜ÛÙJK\Kš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆKš[˜\žT™XY\ÙN›™]ÈKš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹RÌJ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Ü™]\›ˆÌJ
_KÒ”ÓÓŠJ^Ü™]\›žß_Kœ›ÛT\X[
J^Ü™]\›ˆÌJ
__NÙ[˜Ý[ÛˆÌJ
^Ü™]\›žØ]]Üš]Nˆˆ‹ÛÛ˜XÝˆˆ‹\ÙÎ›™]ÈZ[\œ˜^__U‹“\ÙÔÝYÐÛÛ˜XÝ^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÔÝYÐÛÛ˜XÝ‹[˜ÛÙJK\Kš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK˜]]Üš]HOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊK˜]]Üš]JKK˜ÛÛ˜XÝOOHˆ‰‰›‹Z[ÌŠN
KœÝš[™ÊK˜ÛÛ˜XÝ
KK›\ÙË›[™ÝOOL	‰›‹Z[ÌŠŠK˜ž]\ÊK›\ÙÊKŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆKš[˜\žT™XY\ÙN›™]ÈKš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹UÌJ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹˜]]Üš]O]œÝš[™Ê
NØœ™XZÎØØ\ÙHŽœ‹˜ÛÛ˜XÝ]œÝš[™Ê
NØœ™XZÎØØ\ÙHÎœ‹›\ÙÏ]˜ž]\Ê
NØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]UÌJ
NÜ™]\›ŠKš\ÔÙ]
JK˜]]Üš]JI‰Š‹˜]]Üš]OTÝš[™ÊK˜]]Üš]JJK
Kš\ÔÙ]
JK˜ÛÛ˜XÝ
I‰Š‹˜ÛÛ˜XÝTÝš[™ÊK˜ÛÛ˜XÝ
JK
Kš\ÔÙ]
JK›\ÙÊI‰Š‹›\ÙÏJK˜ž]\Ñœ›ÛP˜\ÙM
JK›\ÙÊJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK˜]]Üš]HOO]›ÚY	‰Š‹˜]]Üš]OYK˜]]Üš]JKK˜ÛÛ˜XÝOO]›ÚY	‰Š‹˜ÛÛ˜XÝYK˜ÛÛ˜XÝ
KK›\ÙÈOO]›ÚY	‰Š‹›\ÙÏJK˜˜\ÙMœ›ÛPž]\ÊJK›\ÙÈOO]›ÚYÙK›\ÙÎ›™]ÈZ[\œ˜^JJKŸKœ›ÛT\X[
J^Û]UÌJ
NÜ™]\›ˆ‹˜]]Üš]OYK˜]]Üš]OÏÈˆ‹‹˜ÛÛ˜XÝYK˜ÛÛ˜XÝÏÈˆ‹‹›\ÙÏYK›\ÙÏÏÛ™]ÈZ[\œ˜^KŸ_NÙ[˜Ý[ÛˆJ
^Ü™]\›žÙ]N›™]ÈZ[\œ˜^__U‹“\ÙÔÝYÐÛÛ˜XÝ™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÔÝYÐÛÛ˜XÝ™\ÜÛœÙH‹[˜ÛÙJK\Kš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK™]K›[™ÝOOL	‰›‹Z[ÌŠL
K˜ž]\ÊK™]JKŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆKš[˜\žT™XY\ÙN›™]ÈKš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹SJ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÛÏŒÏOOLOÜ‹™]O]˜ž]\Ê
NœÚÚ\\JÉÊ_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]SJ
NÜ™]\›ŠKš\ÔÙ]
JK™]JI‰Š‹™]OJK˜ž]\Ñœ›ÛP˜\ÙM
JK™]JJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK™]HOO]›ÚY	‰Š‹™]OJK˜˜\ÙMœ›ÛPž]\ÊJK™]HOO]›ÚYÙK™]N›™]ÈZ[\œ˜^JJKŸKœ›ÛT\X[
J^Û]SJ
NÜ™]\›ˆ‹™]OYK™]OÏÛ™]ÈZ[\œ˜^KŸ_NÙ[˜Ý[ÛˆLJ
^Ü™]\›žØ]]Üš]Nˆˆ‹ÛÙRYÎ–×__U‹“\ÙÔ[ÛÙ\Ï^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÔ[ÛÙ\È‹[˜ÛÙJK\Kš[˜\žUÜš]\‹˜Ü™X]J
J^ÙK˜]]Üš]HOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊK˜]]Üš]JK‹Z[ÌŠN
K™›ÜšÊ
NÙ›ÜŠ]ÙˆK˜ÛÙRYÊ[‹Z[

NÜ™]\›ˆ‹›[[J
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆKš[˜\žT™XY\ÙN›™]ÈKš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹VLJ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹˜]]Üš]O]œÝš[™Ê
NØœ™XZÎØØ\ÙHŽšYŠ
ÉÊOOOLŠ^Û]O]Z[ÌŠ
JÝœÜÎÙ›ÜŠÝœÜÏNÊ\‹˜ÛÙRYËœ\Ú
Z[

J_Y[ÙH‹˜ÛÙRYËœ\Ú
Z[

JNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]VLJ
NÜ™]\›ŠKš\ÔÙ]
JK˜]]Üš]JI‰Š‹˜]]Üš]OTÝš[™ÊK˜]]Üš]JJK\œ˜^Kš\Ð\œ˜^JOË˜ÛÙRYÊI‰Š‹˜ÛÙRYÏYK˜ÛÙRYË›X\
OšYÒ[
ÔÝš[™Ê
JJJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK˜]]Üš]HOO]›ÚY	‰Š‹˜]]Üš]OYK˜]]Üš]JKK˜ÛÙRYÏÛ‹˜ÛÙRYÏYK˜ÛÙRYË›X\
OŠšYÒ[

JKÔÝš[™Ê
JN›‹˜ÛÙRYÏV×KŸKœ›ÛT\X[
J^Û]VLJ
NÜ™]\›ˆ‹˜]]Üš]OYK˜]]Üš]OÏÈˆ‹‹˜ÛÙRYÏYK˜ÛÙRYÏË›X\
OšYÒ[
ÔÝš[™Ê
JJ_×KŸ_NÙ[˜Ý[ÛˆŒJ
^Ü™]\›žß_U‹“\ÙÔ[ÛÙ\Ô™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÔ[ÛÙ\Ô™\ÜÛœÙH‹[˜ÛÙJK\Kš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆKš[˜\žT™XY\ÙN›™]ÈKš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹^ŒJ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Ü™]\›ˆŒJ
_KÒ”ÓÓŠJ^Ü™]\›žß_Kœ›ÛT\X[
J^Ü™]\›ˆŒJ
__NÙ[˜Ý[ÛˆŒJ
^Ü™]\›žØ]]Üš]Nˆˆ‹ÛÙRYÎ–×__U‹“\ÙÕ[œ[ÛÙ\Ï^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÕ[œ[ÛÙ\È‹[˜ÛÙJK\Kš[˜\žUÜš]\‹˜Ü™X]J
J^ÙK˜]]Üš]HOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊK˜]]Üš]JK‹Z[ÌŠN
K™›ÜšÊ
NÙ›ÜŠ]ÙˆK˜ÛÙRYÊ[‹Z[

NÜ™]\›ˆ‹›[[J
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆKš[˜\žT™XY\ÙN›™]ÈKš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹VŒJ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹˜]]Üš]O]œÝš[™Ê
NØœ™XZÎØØ\ÙHŽšYŠ
ÉÊOOOLŠ^Û]O]Z[ÌŠ
JÝœÜÎÙ›ÜŠÝœÜÏNÊ\‹˜ÛÙRYËœ\Ú
Z[

J_Y[ÙH‹˜ÛÙRYËœ\Ú
Z[

JNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]VŒJ
NÜ™]\›ŠKš\ÔÙ]
JK˜]]Üš]JI‰Š‹˜]]Üš]OTÝš[™ÊK˜]]Üš]JJK\œ˜^Kš\Ð\œ˜^JOË˜ÛÙRYÊI‰Š‹˜ÛÙRYÏYK˜ÛÙRYË›X\
OšYÒ[
ÔÝš[™Ê
JJJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK˜]]Üš]HOO]›ÚY	‰Š‹˜]]Üš]OYK˜]]Üš]JKK˜ÛÙRYÏÛ‹˜ÛÙRYÏYK˜ÛÙRYË›X\
OŠšYÒ[

JKÔÝš[™Ê
JN›‹˜ÛÙRYÏV×KŸKœ›ÛT\X[
J^Û]VŒJ
NÜ™]\›ˆ‹˜]]Üš]OYK˜]]Üš]OÏÈˆ‹‹˜ÛÙRYÏYK˜ÛÙRYÏË›X\
OšYÒ[
ÔÝš[™Ê
JJ_×KŸ_NÙ[˜Ý[ÛˆJ
^Ü™]\›žß_U‹“\ÙÕ[œ[ÛÙ\Ô™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÕ[œ[ÛÙ\Ô™\ÜÛœÙH‹[˜ÛÙJK\Kš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆKš[˜\žT™XY\ÙN›™]ÈKš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹VJ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Ü™]\›ˆJ
_KÒ”ÓÓŠJ^Ü™]\›žß_Kœ›ÛT\X[
J^Ü™]\›ˆJ
__NÙ[˜Ý[Ûˆ	J
^Ü™]\›žØ]]Üš]Nˆˆ‹Ø\ÛPž]PÛÙN›™]ÈZ[\œ˜^K[œÝ[X]T\›Z\ÜÚ[ÛŽ›ÚY[œ[ÛÙNˆLKYZ[Žˆˆ‹X™[ˆˆ‹\ÙÎ›™]ÈZ[\œ˜^K[™Î–×KÛÝ\˜ÙNˆˆ‹Z[\Žˆˆ‹ÛÙR\Ú›™]ÈZ[\œ˜^__U‹“\ÙÔÝÜ™P[™[œÝ[X]PÛÛ˜XÝ^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÔÝÜ™P[™[œÝ[X]PÛÛ˜XÝ‹[˜ÛÙJK\Kš[˜\žUÜš]\‹˜Ü™X]J
J^ÙK˜]]Üš]HOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊK˜]]Üš]JKKØ\ÛPž]PÛÙK›[™ÝOOL	‰›‹Z[ÌŠŠK˜ž]\ÊKØ\ÛPž]PÛÙJKKš[œÝ[X]T\›Z\ÜÚ[ÛˆOO]›ÚY	‰‰XØÙ\ÜÐÛÛ™šYË™[˜ÛÙJKš[œÝ[X]T\›Z\ÜÚ[Û‹‹Z[ÌŠÍ
K™›ÜšÊ
JK›[[J
KK[œ[ÛÙOOOHL	‰›‹Z[ÌŠ
K˜›ÛÛ
K[œ[ÛÙJKK˜YZ[ˆOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊK˜YZ[ŠKK›X™[OOHˆ‰‰›‹Z[ÌŠN
KœÝš[™ÊK›X™[
KK›\ÙË›[™ÝOOL	‰›‹Z[ÌŠŠK˜ž]\ÊK›\ÙÊNÙ›ÜŠ]ÙˆK™[™ÊYÚKÛÚ[‹™[˜ÛÙJ‹Z[ÌŠÍ
K™›ÜšÊ
JK›[[J
NÜ™]\›ˆKœÛÝ\˜ÙHOOHˆ‰‰›‹Z[ÌŠŠKœÝš[™ÊKœÛÝ\˜ÙJKK˜Z[\ˆOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊK˜Z[\ŠKK˜ÛÙR\Ú›[™ÝOOL	‰›‹Z[ÌŠN
K˜ž]\ÊK˜ÛÙR\Ú
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆKš[˜\žT™XY\ÙN›™]ÈKš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹IJ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹˜]]Üš]O]œÝš[™Ê
NØœ™XZÎØØ\ÙHÎœ‹Ø\ÛPž]PÛÙO]˜ž]\Ê
NØœ™XZÎØØ\ÙHœ‹š[œÝ[X]T\›Z\ÜÚ[ÛIXØÙ\ÜÐÛÛ™šYË™XÛÙJZ[ÌŠ
JNØœ™XZÎØØ\ÙHNœ‹[œ[ÛÙO]˜›ÛÛ

NØœ™XZÎØØ\ÙHŽœ‹˜YZ[]œÝš[™Ê
NØœ™XZÎØØ\ÙHÎœ‹›X™[]œÝš[™Ê
NØœ™XZÎØØ\ÙHœ‹›\ÙÏ]˜ž]\Ê
NØœ™XZÎØØ\ÙHNœ‹™[™Ëœ\Ú
ÚKÛÚ[‹™XÛÙJZ[ÌŠ
JJNØœ™XZÎØØ\ÙHLœ‹œÛÝ\˜ÙO]œÝš[™Ê
NØœ™XZÎØØ\ÙHLNœ‹˜Z[\]œÝš[™Ê
NØœ™XZÎØØ\ÙHLŽœ‹˜ÛÙR\Ú]˜ž]\Ê
NØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]IJ
NÜ™]\›ŠKš\ÔÙ]
JK˜]]Üš]JI‰Š‹˜]]Üš]OTÝš[™ÊK˜]]Üš]JJK
Kš\ÔÙ]
JKØ\ÛPž]PÛÙJI‰Š‹Ø\ÛPž]PÛÙOJK˜ž]\Ñœ›ÛP˜\ÙM
JKØ\ÛPž]PÛÙJJK
Kš\ÔÙ]
JKš[œÝ[X]T\›Z\ÜÚ[ÛŠI‰Š‹š[œÝ[X]T\›Z\ÜÚ[ÛIXØÙ\ÜÐÛÛ™šYË™œ›ÛR”ÓÓŠKš[œÝ[X]T\›Z\ÜÚ[ÛŠJK
Kš\ÔÙ]
JK[œ[ÛÙJI‰Š‹[œ[ÛÙOHHYK[œ[ÛÙJK
Kš\ÔÙ]
JK˜YZ[ŠI‰Š‹˜YZ[TÝš[™ÊK˜YZ[ŠJK
Kš\ÔÙ]
JK›X™[
I‰Š‹›X™[TÝš[™ÊK›X™[
JK
Kš\ÔÙ]
JK›\ÙÊI‰Š‹›\ÙÏJK˜ž]\Ñœ›ÛP˜\ÙM
JK›\ÙÊJK\œ˜^Kš\Ð\œ˜^JOË™[™ÊI‰Š‹™[™ÏYK™[™Ë›X\
O™ÚKÛÚ[‹™œ›ÛR”ÓÓŠ
JJK
Kš\ÔÙ]
JKœÛÝ\˜ÙJI‰Š‹œÛÝ\˜ÙOTÝš[™ÊKœÛÝ\˜ÙJJK
Kš\ÔÙ]
JK˜Z[\ŠI‰Š‹˜Z[\TÝš[™ÊK˜Z[\ŠJK
Kš\ÔÙ]
JK˜ÛÙR\Ú
I‰Š‹˜ÛÙR\ÚJK˜ž]\Ñœ›ÛP˜\ÙM
JK˜ÛÙR\Ú
JKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK˜]]Üš]HOO]›ÚY	‰Š‹˜]]Üš]OYK˜]]Üš]JKKØ\ÛPž]PÛÙHOO]›ÚY	‰Š‹Ø\ÛPž]PÛÙOJK˜˜\ÙMœ›ÛPž]\ÊJKØ\ÛPž]PÛÙHOO]›ÚYÙKØ\ÛPž]PÛÙN›™]ÈZ[\œ˜^JJKKš[œÝ[X]T\›Z\ÜÚ[ÛˆOO]›ÚY	‰Š‹š[œÝ[X]T\›Z\ÜÚ[ÛYKš[œÝ[X]T\›Z\ÜÚ[ÛÉXØÙ\ÜÐÛÛ™šYËÒ”ÓÓŠKš[œÝ[X]T\›Z\ÜÚ[ÛŠN›ÚY
KK[œ[ÛÙHOO]›ÚY	‰Š‹[œ[ÛÙOYK[œ[ÛÙJKK˜YZ[ˆOO]›ÚY	‰Š‹˜YZ[YK˜YZ[ŠKK›X™[OO]›ÚY	‰Š‹›X™[YK›X™[
KK›\ÙÈOO]›ÚY	‰Š‹›\ÙÏJK˜˜\ÙMœ›ÛPž]\ÊJK›\ÙÈOO]›ÚYÙK›\ÙÎ›™]ÈZ[\œ˜^JJKK™[™ÏÛ‹™[™ÏYK™[™Ë›X\
OÙÚKÛÚ[‹Ò”ÓÓŠ
N›ÚY
N›‹™[™ÏV×KKœÛÝ\˜ÙHOO]›ÚY	‰Š‹œÛÝ\˜ÙOYKœÛÝ\˜ÙJKK˜Z[\ˆOO]›ÚY	‰Š‹˜Z[\YK˜Z[\ŠKK˜ÛÙR\ÚOO]›ÚY	‰Š‹˜ÛÙR\ÚJK˜˜\ÙMœ›ÛPž]\ÊJK˜ÛÙR\ÚOO]›ÚYÙK˜ÛÙR\Ú›™]ÈZ[\œ˜^JJKŸKœ›ÛT\X[
J^Û]IJ
NÜ™]\›ˆ‹˜]]Üš]OYK˜]]Üš]OÏÈˆ‹‹Ø\ÛPž]PÛÙOYKØ\ÛPž]PÛÙOÏÛ™]ÈZ[\œ˜^KKš[œÝ[X]T\›Z\ÜÚ[ÛˆOO]›ÚY	‰™Kš[œÝ[X]T\›Z\ÜÚ[ÛˆOO[[	‰Š‹š[œÝ[X]T\›Z\ÜÚ[ÛIXØÙ\ÜÐÛÛ™šYË™œ›ÛT\X[
Kš[œÝ[X]T\›Z\ÜÚ[ÛŠJK‹[œ[ÛÙOYK[œ[ÛÙOÏÈLK‹˜YZ[YK˜YZ[ÏÈˆ‹‹›X™[YK›X™[ÏÈˆ‹‹›\ÙÏYK›\ÙÏÏÛ™]ÈZ[\œ˜^K‹™[™ÏYK™[™ÏË›X\
O™ÚKÛÚ[‹™œ›ÛT\X[

J_×K‹œÛÝ\˜ÙOYKœÛÝ\˜ÙOÏÈˆ‹‹˜Z[\YK˜Z[\ÏÈˆ‹‹˜ÛÙR\ÚYK˜ÛÙR\ÚÏÛ™]ÈZ[\œ˜^KŸ_NÙ[˜Ý[ÛˆŒJ
^Ü™]\›žØY™\ÜÎˆˆ‹]N›™]ÈZ[\œ˜^__U‹“\ÙÔÝÜ™P[™[œÝ[X]PÛÛ˜XÝ™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÔÝÜ™P[™[œÝ[X]PÛÛ˜XÝ™\ÜÛœÙH‹[˜ÛÙJK\Kš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK˜Y™\ÜÈOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊK˜Y™\ÜÊKK™]K›[™ÝOOL	‰›‹Z[ÌŠN
K˜ž]\ÊK™]JKŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆKš[˜\žT™XY\ÙN›™]ÈKš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹ZŒJ
NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹˜Y™\ÜÏ]œÝš[™Ê
NØœ™XZÎØØ\ÙHŽœ‹™]O]˜ž]\Ê
NØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]ZŒJ
NÜ™]\›ŠKš\ÔÙ]
JK˜Y™\ÜÊI‰Š‹˜Y™\ÜÏTÝš[™ÊK˜Y™\ÜÊJK
Kš\ÔÙ]
JK™]JI‰Š‹™]OJK˜ž]\Ñœ›ÛP˜\ÙM
JK™]JJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK˜Y™\ÜÈOO]›ÚY	‰Š‹˜Y™\ÜÏYK˜Y™\ÜÊKK™]HOO]›ÚY	‰Š‹™]OJK˜˜\ÙMœ›ÛPž]\ÊJK™]HOO]›ÚYÙK™]N›™]ÈZ[\œ˜^JJKŸKœ›ÛT\X[
J^Û]ZŒJ
NÜ™]\›ˆ‹˜Y™\ÜÏYK˜Y™\ÜÏÏÈˆ‹‹™]OYK™]OÏÛ™]ÈZ[\œ˜^KŸ_NÙ[˜Ý[ÛˆQ

^Ü™]\›žØ]]Üš]Nˆˆ‹Y™\ÜÙ\Î–×__U‹“\ÙÐYÛÙU\ØY\˜[\ÐY™\ÜÙ\Ï^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÐYÛÙU\ØY\˜[\ÐY™\ÜÙ\È‹[˜ÛÙJK\Kš[˜\žUÜš]\‹˜Ü™X]J
J^ÙK˜]]Üš]HOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊK˜]]Üš]JNÙ›ÜŠ]ÙˆK˜Y™\ÜÙ\Ê[‹Z[ÌŠN
KœÝš[™Ê
NÜ™]\›ˆŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆKš[˜\žT™XY\ÙN›™]ÈKš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹YQ

NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹˜]]Üš]O]œÝš[™Ê
NØœ™XZÎØØ\ÙHŽœ‹˜Y™\ÜÙ\Ëœ\Ú
œÝš[™Ê
JNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]YQ

NÜ™]\›ŠKš\ÔÙ]
JK˜]]Üš]JI‰Š‹˜]]Üš]OTÝš[™ÊK˜]]Üš]JJK\œ˜^Kš\Ð\œ˜^JOË˜Y™\ÜÙ\ÊI‰Š‹˜Y™\ÜÙ\ÏYK˜Y™\ÜÙ\Ë›X\
O”Ýš[™Ê
JJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK˜]]Üš]HOO]›ÚY	‰Š‹˜]]Üš]OYK˜]]Üš]JKK˜Y™\ÜÙ\ÏÛ‹˜Y™\ÜÙ\ÏYK˜Y™\ÜÙ\Ë›X\
O
N›‹˜Y™\ÜÙ\ÏV×KŸKœ›ÛT\X[
J^Û]YQ

NÜ™]\›ˆ‹˜]]Üš]OYK˜]]Üš]OÏÈˆ‹‹˜Y™\ÜÙ\ÏYK˜Y™\ÜÙ\ÏË›X\
O
_×KŸ_NÙ[˜Ý[Ûˆ‘

^Ü™]\›žß_U‹“\ÙÐYÛÙU\ØY\˜[\ÐY™\ÜÙ\Ô™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÐYÛÙU\ØY\˜[\ÐY™\ÜÙ\Ô™\ÜÛœÙH‹[˜ÛÙJK\Kš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆKš[˜\žT™XY\ÙN›™]ÈKš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹[‘

NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Ü™]\›ˆ‘

_KÒ”ÓÓŠJ^Ü™]\›žß_Kœ›ÛT\X[
J^Ü™]\›ˆ‘

__NÙ[˜Ý[Ûˆ

^Ü™]\›žØ]]Üš]Nˆˆ‹Y™\ÜÙ\Î–×__U‹“\ÙÔ™[[Ý™PÛÙU\ØY\˜[\ÐY™\ÜÙ\Ï^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÔ™[[Ý™PÛÙU\ØY\˜[\ÐY™\ÜÙ\È‹[˜ÛÙJK\Kš[˜\žUÜš]\‹˜Ü™X]J
J^ÙK˜]]Üš]HOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊK˜]]Üš]JNÙ›ÜŠ]ÙˆK˜Y™\ÜÙ\Ê[‹Z[ÌŠN
KœÝš[™Ê
NÜ™]\›ˆŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆKš[˜\žT™XY\ÙN›™]ÈKš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹]

NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹˜]]Üš]O]œÝš[™Ê
NØœ™XZÎØØ\ÙHŽœ‹˜Y™\ÜÙ\Ëœ\Ú
œÝš[™Ê
JNØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]]

NÜ™]\›ŠKš\ÔÙ]
JK˜]]Üš]JI‰Š‹˜]]Üš]OTÝš[™ÊK˜]]Üš]JJK\œ˜^Kš\Ð\œ˜^JOË˜Y™\ÜÙ\ÊI‰Š‹˜Y™\ÜÙ\ÏYK˜Y™\ÜÙ\Ë›X\
O”Ýš[™Ê
JJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK˜]]Üš]HOO]›ÚY	‰Š‹˜]]Üš]OYK˜]]Üš]JKK˜Y™\ÜÙ\ÏÛ‹˜Y™\ÜÙ\ÏYK˜Y™\ÜÙ\Ë›X\
O
N›‹˜Y™\ÜÙ\ÏV×KŸKœ›ÛT\X[
J^Û]]

NÜ™]\›ˆ‹˜]]Üš]OYK˜]]Üš]OÏÈˆ‹‹˜Y™\ÜÙ\ÏYK˜Y™\ÜÙ\ÏË›X\
O
_×KŸ_NÙ[˜Ý[Ûˆ‘

^Ü™]\›žß_U‹“\ÙÔ™[[Ý™PÛÙU\ØY\˜[\ÐY™\ÜÙ\Ô™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÔ™[[Ý™PÛÙU\ØY\˜[\ÐY™\ÜÙ\Ô™\ÜÛœÙH‹[˜ÛÙJK\Kš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆKš[˜\žT™XY\ÙN›™]ÈKš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹\‘

NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Ü™]\›ˆ‘

_KÒ”ÓÓŠJ^Ü™]\›žß_Kœ›ÛT\X[
J^Ü™]\›ˆ‘

__NÙ[˜Ý[ÛˆQ

^Ü™]\›žØ]]Üš]Nˆˆ‹Ø\ÛPž]PÛÙN›™]ÈZ[\œ˜^K[œÝ[X]T\›Z\ÜÚ[ÛŽ›ÚYÛÛ˜XÝˆˆ‹\ÙÎ›™]ÈZ[\œ˜^__U‹“\ÙÔÝÜ™P[™ZYÜ˜]PÛÛ˜XÝ^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÔÝÜ™P[™ZYÜ˜]PÛÛ˜XÝ‹[˜ÛÙJK\Kš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK˜]]Üš]HOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊK˜]]Üš]JKKØ\ÛPž]PÛÙK›[™ÝOOL	‰›‹Z[ÌŠN
K˜ž]\ÊKØ\ÛPž]PÛÙJKKš[œÝ[X]T\›Z\ÜÚ[ÛˆOO]›ÚY	‰‰XØÙ\ÜÐÛÛ™šYË™[˜ÛÙJKš[œÝ[X]T\›Z\ÜÚ[Û‹‹Z[ÌŠŠK™›ÜšÊ
JK›[[J
KK˜ÛÛ˜XÝOOHˆ‰‰›‹Z[ÌŠÍ
KœÝš[™ÊK˜ÛÛ˜XÝ
KK›\ÙË›[™ÝOOL	‰›‹Z[ÌŠŠK˜ž]\ÊK›\ÙÊKŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆKš[˜\žT™XY\ÙN›™]ÈKš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹ZQ

NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹˜]]Üš]O]œÝš[™Ê
NØœ™XZÎØØ\ÙHŽœ‹Ø\ÛPž]PÛÙO]˜ž]\Ê
NØœ™XZÎØØ\ÙHÎœ‹š[œÝ[X]T\›Z\ÜÚ[ÛIXØÙ\ÜÐÛÛ™šYË™XÛÙJZ[ÌŠ
JNØœ™XZÎØØ\ÙHœ‹˜ÛÛ˜XÝ]œÝš[™Ê
NØœ™XZÎØØ\ÙHNœ‹›\ÙÏ]˜ž]\Ê
NØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]ZQ

NÜ™]\›ŠKš\ÔÙ]
JK˜]]Üš]JI‰Š‹˜]]Üš]OTÝš[™ÊK˜]]Üš]JJK
Kš\ÔÙ]
JKØ\ÛPž]PÛÙJI‰Š‹Ø\ÛPž]PÛÙOJK˜ž]\Ñœ›ÛP˜\ÙM
JKØ\ÛPž]PÛÙJJK
Kš\ÔÙ]
JKš[œÝ[X]T\›Z\ÜÚ[ÛŠI‰Š‹š[œÝ[X]T\›Z\ÜÚ[ÛIXØÙ\ÜÐÛÛ™šYË™œ›ÛR”ÓÓŠKš[œÝ[X]T\›Z\ÜÚ[ÛŠJK
Kš\ÔÙ]
JK˜ÛÛ˜XÝ
I‰Š‹˜ÛÛ˜XÝTÝš[™ÊK˜ÛÛ˜XÝ
JK
Kš\ÔÙ]
JK›\ÙÊI‰Š‹›\ÙÏJK˜ž]\Ñœ›ÛP˜\ÙM
JK›\ÙÊJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK˜]]Üš]HOO]›ÚY	‰Š‹˜]]Üš]OYK˜]]Üš]JKKØ\ÛPž]PÛÙHOO]›ÚY	‰Š‹Ø\ÛPž]PÛÙOJK˜˜\ÙMœ›ÛPž]\ÊJKØ\ÛPž]PÛÙHOO]›ÚYÙKØ\ÛPž]PÛÙN›™]ÈZ[\œ˜^JJKKš[œÝ[X]T\›Z\ÜÚ[ÛˆOO]›ÚY	‰Š‹š[œÝ[X]T\›Z\ÜÚ[ÛYKš[œÝ[X]T\›Z\ÜÚ[ÛÉXØÙ\ÜÐÛÛ™šYËÒ”ÓÓŠKš[œÝ[X]T\›Z\ÜÚ[ÛŠN›ÚY
KK˜ÛÛ˜XÝOO]›ÚY	‰Š‹˜ÛÛ˜XÝYK˜ÛÛ˜XÝ
KK›\ÙÈOO]›ÚY	‰Š‹›\ÙÏJK˜˜\ÙMœ›ÛPž]\ÊJK›\ÙÈOO]›ÚYÙK›\ÙÎ›™]ÈZ[\œ˜^JJKŸKœ›ÛT\X[
J^Û]ZQ

NÜ™]\›ˆ‹˜]]Üš]OYK˜]]Üš]OÏÈˆ‹‹Ø\ÛPž]PÛÙOYKØ\ÛPž]PÛÙOÏÛ™]ÈZ[\œ˜^KKš[œÝ[X]T\›Z\ÜÚ[ÛˆOO]›ÚY	‰™Kš[œÝ[X]T\›Z\ÜÚ[ÛˆOO[[	‰Š‹š[œÝ[X]T\›Z\ÜÚ[ÛIXØÙ\ÜÐÛÛ™šYË™œ›ÛT\X[
Kš[œÝ[X]T\›Z\ÜÚ[ÛŠJK‹˜ÛÛ˜XÝYK˜ÛÛ˜XÝÏÈˆ‹‹›\ÙÏYK›\ÙÏÏÛ™]ÈZ[\œ˜^KŸ_NÙ[˜Ý[ÛˆÑ

^Ü™]\›žØÛÙRYšYÒ[

KÚXÚÜÝ[N›™]ÈZ[\œ˜^K]N›™]ÈZ[\œ˜^__U‹“\ÙÔÝÜ™P[™ZYÜ˜]PÛÛ˜XÝ™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÔÝÜ™P[™ZYÜ˜]PÛÛ˜XÝ™\ÜÛœÙH‹[˜ÛÙJK\Kš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆK˜ÛÙRYOOPšYÒ[

I‰›‹Z[ÌŠ
KZ[
K˜ÛÙRY
KK˜ÚXÚÜÝ[K›[™ÝOOL	‰›‹Z[ÌŠN
K˜ž]\ÊK˜ÚXÚÜÝ[JKK™]K›[™ÝOOL	‰›‹Z[ÌŠŠK˜ž]\ÊK™]JKŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆKš[˜\žT™XY\ÙN›™]ÈKš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹[Ñ

NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹˜ÛÙRY]Z[

NØœ™XZÎØØ\ÙHŽœ‹˜ÚXÚÜÝ[O]˜ž]\Ê
NØœ™XZÎØØ\ÙHÎœ‹™]O]˜ž]\Ê
NØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û][Ñ

NÜ™]\›ŠKš\ÔÙ]
JK˜ÛÙRY
I‰Š‹˜ÛÙRYPšYÒ[
K˜ÛÙRYÔÝš[™Ê
JJK
Kš\ÔÙ]
JK˜ÚXÚÜÝ[JI‰Š‹˜ÚXÚÜÝ[OJK˜ž]\Ñœ›ÛP˜\ÙM
JK˜ÚXÚÜÝ[JJK
Kš\ÔÙ]
JK™]JI‰Š‹™]OJK˜ž]\Ñœ›ÛP˜\ÙM
JK™]JJKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆK˜ÛÙRYOO]›ÚY	‰Š‹˜ÛÙRYJK˜ÛÙRYšYÒ[

JKÔÝš[™Ê
JKK˜ÚXÚÜÝ[HOO]›ÚY	‰Š‹˜ÚXÚÜÝ[OJK˜˜\ÙMœ›ÛPž]\ÊJK˜ÚXÚÜÝ[HOO]›ÚYÙK˜ÚXÚÜÝ[N›™]ÈZ[\œ˜^JJKK™]HOO]›ÚY	‰Š‹™]OJK˜˜\ÙMœ›ÛPž]\ÊJK™]HOO]›ÚYÙK™]N›™]ÈZ[\œ˜^JJKŸKœ›ÛT\X[
J^Û][Ñ

NÜ™]\›ˆK˜ÛÙRYOO]›ÚY	‰™K˜ÛÙRYOO[[	‰Š‹˜ÛÙRYPšYÒ[
K˜ÛÙRYÔÝš[™Ê
JJK‹˜ÚXÚÜÝ[OYK˜ÚXÚÜÝ[OÏÛ™]ÈZ[\œ˜^K‹™]OYK™]OÏÛ™]ÈZ[\œ˜^KŸ_NÙ[˜Ý[ÛˆQ

^Ü™]\›žÜÙ[™\Žˆˆ‹™]ÓX™[ˆˆ‹ÛÛ˜XÝˆˆŸ_U‹“\ÙÕ\]PÛÛ˜XÝX™[^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÕ\]PÛÛ˜XÝX™[‹[˜ÛÙJK\Kš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆKœÙ[™\ˆOOHˆ‰‰›‹Z[ÌŠL
KœÝš[™ÊKœÙ[™\ŠKK›™]ÓX™[OOHˆ‰‰›‹Z[ÌŠN
KœÝš[™ÊK›™]ÓX™[
KK˜ÛÛ˜XÝOOHˆ‰‰›‹Z[ÌŠŠKœÝš[™ÊK˜ÛÛ˜XÝ
KŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆKš[˜\žT™XY\ÙN›™]ÈKš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹XQ

NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ØØ\ÙHNœ‹œÙ[™\]œÝš[™Ê
NØœ™XZÎØØ\ÙHŽœ‹›™]ÓX™[]œÝš[™Ê
NØœ™XZÎØØ\ÙHÎœ‹˜ÛÛ˜XÝ]œÝš[™Ê
NØœ™XZÎÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Û]XQ

NÜ™]\›ŠKš\ÔÙ]
JKœÙ[™\ŠI‰Š‹œÙ[™\TÝš[™ÊKœÙ[™\ŠJK
Kš\ÔÙ]
JK›™]ÓX™[
I‰Š‹›™]ÓX™[TÝš[™ÊK›™]ÓX™[
JK
Kš\ÔÙ]
JK˜ÛÛ˜XÝ
I‰Š‹˜ÛÛ˜XÝTÝš[™ÊK˜ÛÛ˜XÝ
JKŸKÒ”ÓÓŠJ^Û]^ßNÜ™]\›ˆKœÙ[™\ˆOO]›ÚY	‰Š‹œÙ[™\YKœÙ[™\ŠKK›™]ÓX™[OO]›ÚY	‰Š‹›™]ÓX™[YK›™]ÓX™[
KK˜ÛÛ˜XÝOO]›ÚY	‰Š‹˜ÛÛ˜XÝYK˜ÛÛ˜XÝ
KŸKœ›ÛT\X[
J^Û]XQ

NÜ™]\›ˆ‹œÙ[™\YKœÙ[™\ÏÈˆ‹‹›™]ÓX™[YK›™]ÓX™[ÏÈˆ‹‹˜ÛÛ˜XÝYK˜ÛÛ˜XÝÏÈˆ‹Ÿ_NÙ[˜Ý[ÛˆÑ

^Ü™]\›žß_U‹“\ÙÕ\]PÛÛ˜XÝX™[™\ÜÛœÙO^Ý\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÕ\]PÛÛ˜XÝX™[™\ÜÛœÙH‹[˜ÛÙJK\Kš[˜\žUÜš]\‹˜Ü™X]J
J^Ü™]\›ˆŸKXÛÙJKŠ^Û]YH[œÝ[˜Ù[ÙˆKš[˜\žT™XY\ÙN›™]ÈKš[˜\žT™XY\ŠJKO[OO]›ÚYÝ›[ŽœÜÊÛ‹\Ñ

NÙ›ÜŠÝœÜÏNÊ^Û]Ï]Z[ÌŠ
NÜÝÚ]Ú
ÏŒÊ^ÙY˜][œÚÚ\\JÉÊNØœ™XZß_\™]\›ˆŸKœ›ÛR”ÓÓŠJ^Ü™]\›ˆÑ

_KÒ”ÓÓŠJ^Ü™]\›žß_Kœ›ÛT\X[
J^Ü™]\›ˆÑ

__NÝ˜\ˆXÛ\ÜÞÜœÎØÛÛœÝXÝÜŠŠ^Ý\ËœœÏ[‹\Ë”ÝÜ™PÛÙO]\Ë”ÝÜ™PÛÙK˜š[™
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
\Ê_TÝÜ™PÛÙJŠ^Û]U‹“\ÙÔÝÜ™PÛÙK™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÈ‹”ÝÜ™PÛÙH‹
K[ŠO•‹“\ÙÔÝÜ™PÛÙT™\ÜÛœÙK™XÛÙJ™]ÈKš[˜\žT™XY\ŠŠJJ_R[œÝ[X]PÛÛ˜XÝ
Š^Û]U‹“\ÙÒ[œÝ[X]PÛÛ˜XÝ™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÈ‹’[œÝ[X]PÛÛ˜XÝ‹
K[ŠO•‹“\ÙÒ[œÝ[X]PÛÛ˜XÝ™\ÜÛœÙK™XÛÙJ™]ÈKš[˜\žT™XY\ŠŠJJ_R[œÝ[X]PÛÛ˜XÝŠŠ^Û]U‹“\ÙÒ[œÝ[X]PÛÛ˜XÝ‹™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÈ‹’[œÝ[X]PÛÛ˜XÝˆ‹
K[ŠO•‹“\ÙÒ[œÝ[X]PÛÛ˜XÝ”™\ÜÛœÙK™XÛÙJ™]ÈKš[˜\žT™XY\ŠŠJJ_Q^XÝ]PÛÛ˜XÝ
Š^Û]U‹“\ÙÑ^XÝ]PÛÛ˜XÝ™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÈ‹‘^XÝ]PÛÛ˜XÝ‹
K[ŠO•‹“\ÙÑ^XÝ]PÛÛ˜XÝ™\ÜÛœÙK™XÛÙJ™]ÈKš[˜\žT™XY\ŠŠJJ_SZYÜ˜]PÛÛ˜XÝ
Š^Û]U‹“\ÙÓZYÜ˜]PÛÛ˜XÝ™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÈ‹“ZYÜ˜]PÛÛ˜XÝ‹
K[ŠO•‹“\ÙÓZYÜ˜]PÛÛ˜XÝ™\ÜÛœÙK™XÛÙJ™]ÈKš[˜\žT™XY\ŠŠJJ_U\]PYZ[ŠŠ^Û]U‹“\ÙÕ\]PYZ[‹™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÈ‹•\]PYZ[ˆ‹
K[ŠO•‹“\ÙÕ\]PYZ[”™\ÜÛœÙK™XÛÙJ™]ÈKš[˜\žT™XY\ŠŠJJ_PÛX\YZ[ŠŠ^Û]U‹“\ÙÐÛX\YZ[‹™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÈ‹ÛX\YZ[ˆ‹
K[ŠO•‹“\ÙÐÛX\YZ[”™\ÜÛœÙK™XÛÙJ™]ÈKš[˜\žT™XY\ŠŠJJ_U\]R[œÝ[X]PÛÛ™šYÊŠ^Û]U‹“\ÙÕ\]R[œÝ[X]PÛÛ™šYË™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÈ‹•\]R[œÝ[X]PÛÛ™šYÈ‹
K[ŠO•‹“\ÙÕ\]R[œÝ[X]PÛÛ™šYÔ™\ÜÛœÙK™XÛÙJ™]ÈKš[˜\žT™XY\ŠŠJJ_U\]T\˜[\ÊŠ^Û]U‹“\ÙÕ\]T\˜[\Ë™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÈ‹•\]T\˜[\È‹
K[ŠO•‹“\ÙÕ\]T\˜[\Ô™\ÜÛœÙK™XÛÙJ™]ÈKš[˜\žT™XY\ŠŠJJ_TÝYÐÛÛ˜XÝ
Š^Û]U‹“\ÙÔÝYÐÛÛ˜XÝ™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÈ‹”ÝYÐÛÛ˜XÝ‹
K[ŠO•‹“\ÙÔÝYÐÛÛ˜XÝ™\ÜÛœÙK™XÛÙJ™]ÈKš[˜\žT™XY\ŠŠJJ_T[ÛÙ\ÊŠ^Û]U‹“\ÙÔ[ÛÙ\Ë™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÈ‹”[ÛÙ\È‹
K[ŠO•‹“\ÙÔ[ÛÙ\Ô™\ÜÛœÙK™XÛÙJ™]ÈKš[˜\žT™XY\ŠŠJJ_U[œ[ÛÙ\ÊŠ^Û]U‹“\ÙÕ[œ[ÛÙ\Ë™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÈ‹•[œ[ÛÙ\È‹
K[ŠO•‹“\ÙÕ[œ[ÛÙ\Ô™\ÜÛœÙK™XÛÙJ™]ÈKš[˜\žT™XY\ŠŠJJ_TÝÜ™P[™[œÝ[X]PÛÛ˜XÝ
Š^Û]U‹“\ÙÔÝÜ™P[™[œÝ[X]PÛÛ˜XÝ™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÈ‹”ÝÜ™P[™[œÝ[X]PÛÛ˜XÝ‹
K[ŠO•‹“\ÙÔÝÜ™P[™[œÝ[X]PÛÛ˜XÝ™\ÜÛœÙK™XÛÙJ™]ÈKš[˜\žT™XY\ŠŠJJ_T™[[Ý™PÛÙU\ØY\˜[\ÐY™\ÜÙ\ÊŠ^Û]U‹“\ÙÔ™[[Ý™PÛÙU\ØY\˜[\ÐY™\ÜÙ\Ë™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÈ‹”™[[Ý™PÛÙU\ØY\˜[\ÐY™\ÜÙ\È‹
K[ŠO•‹“\ÙÔ™[[Ý™PÛÙU\ØY\˜[\ÐY™\ÜÙ\Ô™\ÜÛœÙK™XÛÙJ™]ÈKš[˜\žT™XY\ŠŠJJ_PYÛÙU\ØY\˜[\ÐY™\ÜÙ\ÊŠ^Û]U‹“\ÙÐYÛÙU\ØY\˜[\ÐY™\ÜÙ\Ë™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÈ‹YÛÙU\ØY\˜[\ÐY™\ÜÙ\È‹
K[ŠO•‹“\ÙÐYÛÙU\ØY\˜[\ÐY™\ÜÙ\Ô™\ÜÛœÙK™XÛÙJ™]ÈKš[˜\žT™XY\ŠŠJJ_TÝÜ™P[™ZYÜ˜]PÛÛ˜XÝ
Š^Û]U‹“\ÙÔÝÜ™P[™ZYÜ˜]PÛÛ˜XÝ™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÈ‹”ÝÜ™P[™ZYÜ˜]PÛÛ˜XÝ‹
K[ŠO•‹“\ÙÔÝÜ™P[™ZYÜ˜]PÛÛ˜XÝ™\ÜÛœÙK™XÛÙJ™]ÈKš[˜\žT™XY\ŠŠJJ_U\]PÛÛ˜XÝX™[
Š^Û]U‹“\ÙÕ\]PÛÛ˜XÝX™[™[˜ÛÙJŠK™š[š\Ú

NÜ™]\›ˆ\ËœœËœ™\]Y\Ý
˜ÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÈ‹•\]PÛÛ˜XÝX™[‹
K[ŠO•‹“\ÙÕ\]PÛÛ˜XÝX™[™\ÜÛœÙK™XÛÙJ™]ÈKš[˜\žT™XY\ŠŠJJ__NÕ‹“\ÙÐÛY[[\YJNÝ˜\ˆÜ™O^ßNÔ‘
Ü™KØœ›ØYØ\ÝŠ
OO”\™KÛÛ›™XÝŠ
OOÜ™K^XÝ]SY\ÜØYÙNŠ
OOšÜ™KÚ[][]NŠ
OO‘\™K˜[œÙ™\“Y\ÜØYÙNŠ
OO”Ü™_JNÝ˜\ˆžO[[
QÊ
JKQÏ[[
Ù

JKÏ[[
YŠ
JKQÏ[[
‘Ê
JKÑÏ[[
›Š
JK\™O[™]ÈQË”™YÚ\ÝžJÖÈ‹ÚX˜Ë˜\XØ][ÛœË˜[œÙ™\‹ŒK“\ÙÕ˜[œÙ™\ˆ‹Ë“\ÙÕ˜[œÙ™\—KÈ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÑ^XÝ]PÛÛ˜XÝ‹QË“\ÙÑ^XÝ]PÛÛ˜XÝWJNØ\Þ[˜È[˜Ý[ÛˆÜ™JK‹
^Û]OV×NÙ›ÜŠ]ˆÙˆJ]ž^Ü™]\›žØÛY[˜]ØZ]žK”ÚYÛš[™ÔÝ\™Ø]PÛY[˜ÛÛ›™XÝÚ]ÚYÛ™\Š‹‹Ü™YÚ\ÝžN›\™KØ\ÔšXÙN˜žK‘Ø\ÔšXÙK™œ›ÛTÝš[™Ê
_JK[™Ú[œŸ_XØ]Ú
Ê^ÚKœ\Ú
	ÜŸNˆ	ÛÈ[œÝ[˜Ù[Ùˆ\œ›ÜÛË›Y\ÜØYÙN”Ýš[™ÊÊ_X
_]›ÝÈ™]È\œ›ÜŠ“ÈÒQÓ’S‘È”ÈURSP“HËÈ	ÚKš›Ú[ŠˆËÈŠ_X
_Y[˜Ý[ÛˆÜ™JK‹K‹Ê^Ü™]\›žÝ\U\›ˆ‹ÚX˜Ë˜\XØ][ÛœË˜[œÙ™\‹ŒK“\ÙÕ˜[œÙ™\ˆ‹˜[YNžÜÛÝ\˜ÙTÜˆ˜[œÙ™\ˆ‹ÛÝ\˜ÙPÚ[›™[ÚÙ[ŽžÙ[›ÛNšK[[Ý[œŸKÙ[™\Ž™K™XÙZ]™\Ž›‹[Y[Ý]ZYÚ›ÚY[Y[Ý][Y\Ý[\šYÒ[
ÊKY[[ÎˆˆŸ__Y[˜Ý[ÛˆÜ™JK‹
^Ü™]\›žÝ\U\›ˆ‹ØÛÜÛ]Ø\ÛKØ\ÛKŒK“\ÙÑ^XÝ]PÛÛ˜XÝ‹˜[YNžÜÙ[™\Ž™KÛÛ˜XÝ›‹\ÙÎŠÑËÕ]Ž
J”ÓÓ‹œÝš[™ÚYžJ
JK[™Î–×___X\Þ[˜È[˜Ý[Ûˆ\™JK‹J^Ü™]\›ˆKœÚ[][]J‹ÝKJ_X\Þ[˜È[˜Ý[Ûˆ\™JK‹KŠ^Ü™]\›ˆKœÚYÛ[™œ›ØYØ\Ý
‹ÝKKŠ_\™]\›ˆ‘
Ü™JNßJJ
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