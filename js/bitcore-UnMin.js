require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"bitcore":[function(require,module,exports){
module.exports=require('tmvhGl');
},{}],"tmvhGl":[function(require,module,exports){
(function (Buffer){
/* 
One way to require files is this simple way:
module.exports.Address = require('./Address');

However, that will load all classes in memory even if they are not used.
Instead, we can set the 'get' property of each class to only require them when
they are accessed, saving memory if they are not used in a given project.
*/
var requireWhenAccessed = function(name, file) {
  Object.defineProperty(module.exports, name, {
    get: function() {
      return require(file)
    }
  });
};

requireWhenAccessed('Bignum', 'bignum');
Object.defineProperty(module.exports, 'bignum', {
  get: function() {
    console.log('bignum (with a lower-case "b") is deprecated. Use bitcore.Bignum (capital "B") instead.');
    return require('bignum');
  }
});
requireWhenAccessed('Base58', './lib/Base58');
Object.defineProperty(module.exports, 'base58', {
  get: function() {
    console.log('base58 (with a lower-case "b") is deprecated. Use bitcore.Base58 (capital "B") instead.');
    return require('./lib/Base58');
  }
});
requireWhenAccessed('bufferput', 'bufferput');
requireWhenAccessed('buffertools', 'buffertools');
requireWhenAccessed('Buffers.monkey', './patches/Buffers.monkey');
requireWhenAccessed('config', './config');
requireWhenAccessed('const', './const');
requireWhenAccessed('Curve', './lib/Curve');
requireWhenAccessed('Deserialize', './lib/Deserialize');
requireWhenAccessed('ECIES', './lib/ECIES');
requireWhenAccessed('log', './util/log');
requireWhenAccessed('networks', './networks');
requireWhenAccessed('SecureRandom', './lib/SecureRandom');
requireWhenAccessed('sjcl', './lib/sjcl');
requireWhenAccessed('util', './util/util');
requireWhenAccessed('EncodedData', './util/EncodedData');
requireWhenAccessed('VersionedData', './util/VersionedData');
requireWhenAccessed('BinaryParser', './util/BinaryParser');
requireWhenAccessed('Address', './lib/Address');
requireWhenAccessed('HierarchicalKey', './lib/HierarchicalKey');
Object.defineProperty(module.exports, 'BIP32', {
  get: function() {
    console.log('BIP32 is deprecated. Use bitcore.HierarchicalKey instead.');
    return require('./lib/HierarchicalKey');
  }
});
requireWhenAccessed('BIP39', './lib/BIP39');
requireWhenAccessed('BIP39WordlistEn', './lib/BIP39WordlistEn');
requireWhenAccessed('Point', './lib/Point');
requireWhenAccessed('Opcode', './lib/Opcode');
requireWhenAccessed('Script', './lib/Script');
requireWhenAccessed('Transaction', './lib/Transaction');
requireWhenAccessed('TransactionBuilder', './lib/TransactionBuilder');
requireWhenAccessed('Connection', './lib/Connection');
requireWhenAccessed('PayPro', './lib/PayPro');
requireWhenAccessed('Peer', './lib/Peer');
requireWhenAccessed('Block', './lib/Block');
requireWhenAccessed('ScriptInterpreter', './lib/ScriptInterpreter');
requireWhenAccessed('Bloom', './lib/Bloom');
requireWhenAccessed('Key', './lib/Key');
Object.defineProperty(module.exports, 'KeyModule', {
  get: function() {
    console.log('KeyModule is deprecated.');
    return require('bindings')('KeyModule');
  }
});
requireWhenAccessed('SINKey', './lib/SINKey');
requireWhenAccessed('SIN', './lib/SIN');
requireWhenAccessed('PrivateKey', './lib/PrivateKey');
requireWhenAccessed('RpcClient', './lib/RpcClient');
requireWhenAccessed('Wallet', './lib/Wallet');
requireWhenAccessed('WalletKey', './lib/WalletKey');
requireWhenAccessed('PeerManager', './lib/PeerManager');
requireWhenAccessed('Message', './lib/Message');
requireWhenAccessed('Electrum', './lib/Electrum');
requireWhenAccessed('Armory', './lib/Armory');
module.exports.Buffer = Buffer;

}).call(this,require("buffer").Buffer)
},{"./lib/Base58":7,"./lib/HierarchicalKey":"x1O6JW","bignum":13,"bindings":24,"buffer":31}],3:[function(require,module,exports){
if ('undefined' === typeof window) window = this;
Bitcoin = {};
if (typeof navigator === 'undefined') {
  var navigator = {};
  navigator.appName = 'NodeJS';
}
/*!
 * Crypto-JS v2.0.0
 * http://code.google.com/p/crypto-js/
 * Copyright (c) 2009, Jeff Mott. All rights reserved.
 * http://code.google.com/p/crypto-js/wiki/License
 */

var base64map = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

// Global Crypto object
var Crypto = window.Crypto = {};

// Crypto utilities
var util = Crypto.util = {

	// Bit-wise rotate left
	rotl: function (n, b) {
		return (n << b) | (n >>> (32 - b));
	},

	// Bit-wise rotate right
	rotr: function (n, b) {
		return (n << (32 - b)) | (n >>> b);
	},

	// Swap big-endian to little-endian and vice versa
	endian: function (n) {

		// If number given, swap endian
		if (n.constructor == Number) {
			return util.rotl(n,  8) & 0x00FF00FF |
			       util.rotl(n, 24) & 0xFF00FF00;
		}

		// Else, assume array and swap all items
		for (var i = 0; i < n.length; i++)
			n[i] = util.endian(n[i]);
		return n;

	},

	// Generate an array of any length of random bytes
	randomBytes: function (n) {
		for (var bytes = []; n > 0; n--)
			bytes.push(Math.floor(Math.random() * 256));
		return bytes;
	},

	// Convert a byte array to big-endian 32-bit words
	bytesToWords: function (bytes) {
		for (var words = [], i = 0, b = 0; i < bytes.length; i++, b += 8)
			words[b >>> 5] |= bytes[i] << (24 - b % 32);
		return words;
	},

	// Convert big-endian 32-bit words to a byte array
	wordsToBytes: function (words) {
		for (var bytes = [], b = 0; b < words.length * 32; b += 8)
			bytes.push((words[b >>> 5] >>> (24 - b % 32)) & 0xFF);
		return bytes;
	},

	// Convert a byte array to a hex string
	bytesToHex: function (bytes) {
		for (var hex = [], i = 0; i < bytes.length; i++) {
			hex.push((bytes[i] >>> 4).toString(16));
			hex.push((bytes[i] & 0xF).toString(16));
		}
		return hex.join("");
	},

	// Convert a hex string to a byte array
	hexToBytes: function (hex) {
		for (var bytes = [], c = 0; c < hex.length; c += 2)
			bytes.push(parseInt(hex.substr(c, 2), 16));
		return bytes;
	},

	// Convert a byte array to a base-64 string
	bytesToBase64: function (bytes) {

		// Use browser-native function if it exists
		if (typeof btoa == "function") return btoa(Binary.bytesToString(bytes));

		for(var base64 = [], i = 0; i < bytes.length; i += 3) {
			var triplet = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];
			for (var j = 0; j < 4; j++) {
				if (i * 8 + j * 6 <= bytes.length * 8)
					base64.push(base64map.charAt((triplet >>> 6 * (3 - j)) & 0x3F));
				else base64.push("=");
			}
		}

		return base64.join("");

	},

	// Convert a base-64 string to a byte array
	base64ToBytes: function (base64) {

		// Use browser-native function if it exists
		if (typeof atob == "function") return Binary.stringToBytes(atob(base64));

		// Remove non-base-64 characters
		base64 = base64.replace(/[^A-Z0-9+\/]/ig, "");

		for (var bytes = [], i = 0, imod4 = 0; i < base64.length; imod4 = ++i % 4) {
			if (imod4 == 0) continue;
			bytes.push(((base64map.indexOf(base64.charAt(i - 1)) & (Math.pow(2, -2 * imod4 + 8) - 1)) << (imod4 * 2)) |
			           (base64map.indexOf(base64.charAt(i)) >>> (6 - imod4 * 2)));
		}

		return bytes;

	}

};

// Crypto mode namespace
Crypto.mode = {};

// Crypto character encodings
var charenc = Crypto.charenc = {};

// UTF-8 encoding
var UTF8 = charenc.UTF8 = {

	// Convert a string to a byte array
	stringToBytes: function (str) {
		return Binary.stringToBytes(unescape(encodeURIComponent(str)));
	},

	// Convert a byte array to a string
	bytesToString: function (bytes) {
		return decodeURIComponent(escape(Binary.bytesToString(bytes)));
	}

};

// Binary encoding
var Binary = charenc.Binary = {

	// Convert a string to a byte array
	stringToBytes: function (str) {
		for (var bytes = [], i = 0; i < str.length; i++)
			bytes.push(str.charCodeAt(i));
		return bytes;
	},

	// Convert a byte array to a string
	bytesToString: function (bytes) {
		for (var str = [], i = 0; i < bytes.length; i++)
			str.push(String.fromCharCode(bytes[i]));
		return str.join("");
	}

};

/*
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
/*

(c) 2012 by C?dric Mesnil. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

    - Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
    - Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
var CryptoJS=CryptoJS||function(j,k){var e={},l=e.lib={},z=function(){},t=l.Base={extend:function(a){z.prototype=this;var c=new z;a&&c.mixIn(a);c.hasOwnProperty("init")||(c.init=function(){c.$super.init.apply(this,arguments)});c.init.prototype=c;c.$super=this;return c},create:function(){var a=this.extend();a.init.apply(a,arguments);return a},init:function(){},mixIn:function(a){for(var c in a)a.hasOwnProperty(c)&&(this[c]=a[c]);a.hasOwnProperty("toString")&&(this.toString=a.toString)},clone:function(){return this.init.prototype.extend(this)}},
u=l.WordArray=t.extend({init:function(a,c){a=this.words=a||[];this.sigBytes=c!=k?c:4*a.length},toString:function(a){return(a||D).stringify(this)},concat:function(a){var c=this.words,h=a.words,d=this.sigBytes;a=a.sigBytes;this.clamp();if(d%4)for(var b=0;b<a;b++)c[d+b>>>2]|=(h[b>>>2]>>>24-8*(b%4)&255)<<24-8*((d+b)%4);else if(65535<h.length)for(b=0;b<a;b+=4)c[d+b>>>2]=h[b>>>2];else c.push.apply(c,h);this.sigBytes+=a;return this},clamp:function(){var a=this.words,c=this.sigBytes;a[c>>>2]&=4294967295<<
32-8*(c%4);a.length=j.ceil(c/4)},clone:function(){var a=t.clone.call(this);a.words=this.words.slice(0);return a},random:function(a){for(var c=[],b=0;b<a;b+=4)c.push(4294967296*j.random()|0);return new u.init(c,a)}}),w=e.enc={},D=w.Hex={stringify:function(a){var c=a.words;a=a.sigBytes;for(var b=[],d=0;d<a;d++){var g=c[d>>>2]>>>24-8*(d%4)&255;b.push((g>>>4).toString(16));b.push((g&15).toString(16))}return b.join("")},parse:function(a){for(var c=a.length,b=[],d=0;d<c;d+=2)b[d>>>3]|=parseInt(a.substr(d,
2),16)<<24-4*(d%8);return new u.init(b,c/2)}},A=w.Latin1={stringify:function(a){var c=a.words;a=a.sigBytes;for(var b=[],d=0;d<a;d++)b.push(String.fromCharCode(c[d>>>2]>>>24-8*(d%4)&255));return b.join("")},parse:function(a){for(var b=a.length,h=[],d=0;d<b;d++)h[d>>>2]|=(a.charCodeAt(d)&255)<<24-8*(d%4);return new u.init(h,b)}},g=w.Utf8={stringify:function(a){try{return decodeURIComponent(escape(A.stringify(a)))}catch(b){throw Error("Malformed UTF-8 data");}},parse:function(a){return A.parse(unescape(encodeURIComponent(a)))}},
v=l.BufferedBlockAlgorithm=t.extend({reset:function(){this._data=new u.init;this._nDataBytes=0},_append:function(a){"string"==typeof a&&(a=g.parse(a));this._data.concat(a);this._nDataBytes+=a.sigBytes},_process:function(a){var b=this._data,h=b.words,d=b.sigBytes,g=this.blockSize,v=d/(4*g),v=a?j.ceil(v):j.max((v|0)-this._minBufferSize,0);a=v*g;d=j.min(4*a,d);if(a){for(var e=0;e<a;e+=g)this._doProcessBlock(h,e);e=h.splice(0,a);b.sigBytes-=d}return new u.init(e,d)},clone:function(){var a=t.clone.call(this);
a._data=this._data.clone();return a},_minBufferSize:0});l.Hasher=v.extend({cfg:t.extend(),init:function(a){this.cfg=this.cfg.extend(a);this.reset()},reset:function(){v.reset.call(this);this._doReset()},update:function(a){this._append(a);this._process();return this},finalize:function(a){a&&this._append(a);return this._doFinalize()},blockSize:16,_createHelper:function(a){return function(b,g){return(new a.init(g)).finalize(b)}},_createHmacHelper:function(a){return function(c,g){return(new b.HMAC.init(a,
g)).finalize(c)}}});var b=e.algo={};return e}(Math);
(function(){var j=CryptoJS,k=j.lib,e=k.WordArray,l=k.Hasher,k=j.algo,z=e.create([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,7,4,13,1,10,6,15,3,12,0,9,5,2,14,11,8,3,10,14,4,9,15,8,1,2,7,0,6,13,11,5,12,1,9,11,10,0,8,12,4,13,3,7,15,14,5,6,2,4,0,5,9,7,12,2,10,14,1,3,8,11,6,15,13]),t=e.create([5,14,7,0,9,2,11,4,13,6,15,8,1,10,3,12,6,11,3,7,0,13,5,10,14,15,8,12,4,9,1,2,15,5,1,3,7,14,6,9,11,8,12,2,10,0,4,13,8,6,4,1,3,11,15,0,5,12,2,13,9,7,10,14,12,15,10,4,1,5,8,7,6,2,13,14,0,3,9,11]),u=e.create([11,14,15,12,
5,8,7,9,11,13,14,15,6,7,9,8,7,6,8,13,11,9,7,15,7,12,15,9,11,7,13,12,11,13,6,7,14,9,13,15,14,8,13,6,5,12,7,5,11,12,14,15,14,15,9,8,9,14,5,6,8,6,5,12,9,15,5,11,6,8,13,12,5,12,13,14,11,8,5,6]),w=e.create([8,9,9,11,13,15,15,5,7,7,8,11,14,14,12,6,9,13,15,7,12,8,9,11,7,7,12,7,6,15,13,11,9,7,15,11,8,6,6,14,12,13,5,14,13,13,7,5,15,5,8,11,14,14,6,14,6,9,12,9,12,5,15,8,8,5,12,9,12,5,14,6,8,13,6,5,15,13,11,11]),D=e.create([0,1518500249,1859775393,2400959708,2840853838]),A=e.create([1352829926,1548603684,1836072691,
2053994217,0]),k=k.RIPEMD160=l.extend({_doReset:function(){this._hash=e.create([1732584193,4023233417,2562383102,271733878,3285377520])},_doProcessBlock:function(g,e){for(var b=0;16>b;b++){var a=e+b,c=g[a];g[a]=(c<<8|c>>>24)&16711935|(c<<24|c>>>8)&4278255360}var a=this._hash.words,c=D.words,h=A.words,d=z.words,j=t.words,k=u.words,l=w.words,B,m,n,p,x,C,q,r,s,y;C=B=a[0];q=m=a[1];r=n=a[2];s=p=a[3];y=x=a[4];for(var f,b=0;80>b;b+=1)f=B+g[e+d[b]]|0,f=16>b?f+((m^n^p)+c[0]):32>b?f+((m&n|~m&p)+c[1]):48>b?
f+(((m|~n)^p)+c[2]):64>b?f+((m&p|n&~p)+c[3]):f+((m^(n|~p))+c[4]),f|=0,f=f<<k[b]|f>>>32-k[b],f=f+x|0,B=x,x=p,p=n<<10|n>>>22,n=m,m=f,f=C+g[e+j[b]]|0,f=16>b?f+((q^(r|~s))+h[0]):32>b?f+((q&s|r&~s)+h[1]):48>b?f+(((q|~r)^s)+h[2]):64>b?f+((q&r|~q&s)+h[3]):f+((q^r^s)+h[4]),f|=0,f=f<<l[b]|f>>>32-l[b],f=f+y|0,C=y,y=s,s=r<<10|r>>>22,r=q,q=f;f=a[1]+n+s|0;a[1]=a[2]+p+y|0;a[2]=a[3]+x+C|0;a[3]=a[4]+B+q|0;a[4]=a[0]+m+r|0;a[0]=f},_doFinalize:function(){var g=this._data,e=g.words,b=8*this._nDataBytes,a=8*g.sigBytes;
e[a>>>5]|=128<<24-a%32;e[(a+64>>>9<<4)+14]=(b<<8|b>>>24)&16711935|(b<<24|b>>>8)&4278255360;g.sigBytes=4*(e.length+1);this._process();g=this._hash;e=g.words;for(b=0;5>b;b++)a=e[b],e[b]=(a<<8|a>>>24)&16711935|(a<<24|a>>>8)&4278255360;return g},clone:function(){var e=l.clone.call(this);e._hash=this._hash.clone();return e}});j.RIPEMD160=l._createHelper(k);j.HmacRIPEMD160=l._createHmacHelper(k)})(Math);

module.exports.crypto31 = CryptoJS;
// Copyright (c) 2005  Tom Wu
// All Rights Reserved.
// See "LICENSE" for details.

// Basic JavaScript BN library - subset useful for RSA encryption.

// Bits per digit
var dbits;

// JavaScript engine analysis
var canary = 0xdeadbeefcafe;
var j_lm = ((canary&0xffffff)==0xefcafe);

// (public) Constructor
function BigInteger(a,b,c) {
  if(a != null)
    if("number" == typeof a) this.fromNumber(a,b,c);
    else if(b == null && "string" != typeof a) this.fromString(a,256);
    else this.fromString(a,b);
}

// return new, unset BigInteger
function nbi() { return new BigInteger(null); }

// am: Compute w_j += (x*this_i), propagate carries,
// c is initial carry, returns final carry.
// c < 3*dvalue, x < 2*dvalue, this_i < dvalue
// We need to select the fastest one that works in this environment.

// am1: use a single mult and divide to get the high bits,
// max digit bits should be 26 because
// max internal value = 2*dvalue^2-2*dvalue (< 2^53)
function am1(i,x,w,j,c,n) {
  while(--n >= 0) {
    var v = x*this[i++]+w[j]+c;
    c = Math.floor(v/0x4000000);
    w[j++] = v&0x3ffffff;
  }
  return c;
}
// am2 avoids a big mult-and-extract completely.
// Max digit bits should be <= 30 because we do bitwise ops
// on values up to 2*hdvalue^2-hdvalue-1 (< 2^31)
function am2(i,x,w,j,c,n) {
  var xl = x&0x7fff, xh = x>>15;
  while(--n >= 0) {
    var l = this[i]&0x7fff;
    var h = this[i++]>>15;
    var m = xh*l+h*xl;
    l = xl*l+((m&0x7fff)<<15)+w[j]+(c&0x3fffffff);
    c = (l>>>30)+(m>>>15)+xh*h+(c>>>30);
    w[j++] = l&0x3fffffff;
  }
  return c;
}
// Alternately, set max digit bits to 28 since some
// browsers slow down when dealing with 32-bit numbers.
function am3(i,x,w,j,c,n) {
  var xl = x&0x3fff, xh = x>>14;
  while(--n >= 0) {
    var l = this[i]&0x3fff;
    var h = this[i++]>>14;
    var m = xh*l+h*xl;
    l = xl*l+((m&0x3fff)<<14)+w[j]+c;
    c = (l>>28)+(m>>14)+xh*h;
    w[j++] = l&0xfffffff;
  }
  return c;
}
if(j_lm && (navigator.appName == "Microsoft Internet Explorer")) {
  BigInteger.prototype.am = am2;
  dbits = 30;
}
else if(j_lm && (navigator.appName != "Netscape")) {
  BigInteger.prototype.am = am1;
  dbits = 26;
}
else { // Mozilla/Netscape seems to prefer am3
  BigInteger.prototype.am = am3;
  dbits = 28;
}

BigInteger.prototype.DB = dbits;
BigInteger.prototype.DM = ((1<<dbits)-1);
BigInteger.prototype.DV = (1<<dbits);

var BI_FP = 52;
BigInteger.prototype.FV = Math.pow(2,BI_FP);
BigInteger.prototype.F1 = BI_FP-dbits;
BigInteger.prototype.F2 = 2*dbits-BI_FP;

// Digit conversions
var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz";
var BI_RC = new Array();
var rr,vv;
rr = "0".charCodeAt(0);
for(vv = 0; vv <= 9; ++vv) BI_RC[rr++] = vv;
rr = "a".charCodeAt(0);
for(vv = 10; vv < 36; ++vv) BI_RC[rr++] = vv;
rr = "A".charCodeAt(0);
for(vv = 10; vv < 36; ++vv) BI_RC[rr++] = vv;

function int2char(n) { return BI_RM.charAt(n); }
function intAt(s,i) {
  var c = BI_RC[s.charCodeAt(i)];
  return (c==null)?-1:c;
}

// (protected) copy this to r
function bnpCopyTo(r) {
  for(var i = this.t-1; i >= 0; --i) r[i] = this[i];
  r.t = this.t;
  r.s = this.s;
}

// (protected) set from integer value x, -DV <= x < DV
function bnpFromInt(x) {
  this.t = 1;
  this.s = (x<0)?-1:0;
  if(x > 0) this[0] = x;
  else if(x < -1) this[0] = x+DV;
  else this.t = 0;
}

// return bigint initialized to value
function nbv(i) { var r = nbi(); r.fromInt(i); return r; }

// (protected) set from string and radix
function bnpFromString(s,b) {
  var k;
  if(b == 16) k = 4;
  else if(b == 8) k = 3;
  else if(b == 256) k = 8; // byte array
  else if(b == 2) k = 1;
  else if(b == 32) k = 5;
  else if(b == 4) k = 2;
  else { this.fromRadix(s,b); return; }
  this.t = 0;
  this.s = 0;
  var i = s.length, mi = false, sh = 0;
  while(--i >= 0) {
    var x = (k==8)?s[i]&0xff:intAt(s,i);
    if(x < 0) {
      if(s.charAt(i) == "-") mi = true;
      continue;
    }
    mi = false;
    if(sh == 0)
      this[this.t++] = x;
    else if(sh+k > this.DB) {
      this[this.t-1] |= (x&((1<<(this.DB-sh))-1))<<sh;
      this[this.t++] = (x>>(this.DB-sh));
    }
    else
      this[this.t-1] |= x<<sh;
    sh += k;
    if(sh >= this.DB) sh -= this.DB;
  }
  if(k == 8 && (s[0]&0x80) != 0) {
    this.s = -1;
    if(sh > 0) this[this.t-1] |= ((1<<(this.DB-sh))-1)<<sh;
  }
  this.clamp();
  if(mi) BigInteger.ZERO.subTo(this,this);
}

// (protected) clamp off excess high words
function bnpClamp() {
  var c = this.s&this.DM;
  while(this.t > 0 && this[this.t-1] == c) --this.t;
}

// (public) return string representation in given radix
function bnToString(b) {
  if(this.s < 0) return "-"+this.negate().toString(b);
  var k;
  if(b == 16) k = 4;
  else if(b == 8) k = 3;
  else if(b == 2) k = 1;
  else if(b == 32) k = 5;
  else if(b == 4) k = 2;
  else return this.toRadix(b);
  var km = (1<<k)-1, d, m = false, r = "", i = this.t;
  var p = this.DB-(i*this.DB)%k;
  if(i-- > 0) {
    if(p < this.DB && (d = this[i]>>p) > 0) { m = true; r = int2char(d); }
    while(i >= 0) {
      if(p < k) {
        d = (this[i]&((1<<p)-1))<<(k-p);
        d |= this[--i]>>(p+=this.DB-k);
      }
      else {
        d = (this[i]>>(p-=k))&km;
        if(p <= 0) { p += this.DB; --i; }
      }
      if(d > 0) m = true;
      if(m) r += int2char(d);
    }
  }
  return m?r:"0";
}

// (public) -this
function bnNegate() { var r = nbi(); BigInteger.ZERO.subTo(this,r); return r; }

// (public) |this|
function bnAbs() { return (this.s<0)?this.negate():this; }

// (public) return + if this > a, - if this < a, 0 if equal
function bnCompareTo(a) {
  var r = this.s-a.s;
  if(r != 0) return r;
  var i = this.t;
  r = i-a.t;
  if(r != 0) return (this.s<0)?-r:r;
  while(--i >= 0) if((r=this[i]-a[i]) != 0) return r;
  return 0;
}

// returns bit length of the integer x
function nbits(x) {
  var r = 1, t;
  if((t=x>>>16) != 0) { x = t; r += 16; }
  if((t=x>>8) != 0) { x = t; r += 8; }
  if((t=x>>4) != 0) { x = t; r += 4; }
  if((t=x>>2) != 0) { x = t; r += 2; }
  if((t=x>>1) != 0) { x = t; r += 1; }
  return r;
}

// (public) return the number of bits in "this"
function bnBitLength() {
  if(this.t <= 0) return 0;
  return this.DB*(this.t-1)+nbits(this[this.t-1]^(this.s&this.DM));
}

// (protected) r = this << n*DB
function bnpDLShiftTo(n,r) {
  var i;
  for(i = this.t-1; i >= 0; --i) r[i+n] = this[i];
  for(i = n-1; i >= 0; --i) r[i] = 0;
  r.t = this.t+n;
  r.s = this.s;
}

// (protected) r = this >> n*DB
function bnpDRShiftTo(n,r) {
  for(var i = n; i < this.t; ++i) r[i-n] = this[i];
  r.t = Math.max(this.t-n,0);
  r.s = this.s;
}

// (protected) r = this << n
function bnpLShiftTo(n,r) {
  var bs = n%this.DB;
  var cbs = this.DB-bs;
  var bm = (1<<cbs)-1;
  var ds = Math.floor(n/this.DB), c = (this.s<<bs)&this.DM, i;
  for(i = this.t-1; i >= 0; --i) {
    r[i+ds+1] = (this[i]>>cbs)|c;
    c = (this[i]&bm)<<bs;
  }
  for(i = ds-1; i >= 0; --i) r[i] = 0;
  r[ds] = c;
  r.t = this.t+ds+1;
  r.s = this.s;
  r.clamp();
}

// (protected) r = this >> n
function bnpRShiftTo(n,r) {
  r.s = this.s;
  var ds = Math.floor(n/this.DB);
  if(ds >= this.t) { r.t = 0; return; }
  var bs = n%this.DB;
  var cbs = this.DB-bs;
  var bm = (1<<bs)-1;
  r[0] = this[ds]>>bs;
  for(var i = ds+1; i < this.t; ++i) {
    r[i-ds-1] |= (this[i]&bm)<<cbs;
    r[i-ds] = this[i]>>bs;
  }
  if(bs > 0) r[this.t-ds-1] |= (this.s&bm)<<cbs;
  r.t = this.t-ds;
  r.clamp();
}

// (protected) r = this - a
function bnpSubTo(a,r) {
  var i = 0, c = 0, m = Math.min(a.t,this.t);
  while(i < m) {
    c += this[i]-a[i];
    r[i++] = c&this.DM;
    c >>= this.DB;
  }
  if(a.t < this.t) {
    c -= a.s;
    while(i < this.t) {
      c += this[i];
      r[i++] = c&this.DM;
      c >>= this.DB;
    }
    c += this.s;
  }
  else {
    c += this.s;
    while(i < a.t) {
      c -= a[i];
      r[i++] = c&this.DM;
      c >>= this.DB;
    }
    c -= a.s;
  }
  r.s = (c<0)?-1:0;
  if(c < -1) r[i++] = this.DV+c;
  else if(c > 0) r[i++] = c;
  r.t = i;
  r.clamp();
}

// (protected) r = this * a, r != this,a (HAC 14.12)
// "this" should be the larger one if appropriate.
function bnpMultiplyTo(a,r) {
  var x = this.abs(), y = a.abs();
  var i = x.t;
  r.t = i+y.t;
  while(--i >= 0) r[i] = 0;
  for(i = 0; i < y.t; ++i) r[i+x.t] = x.am(0,y[i],r,i,0,x.t);
  r.s = 0;
  r.clamp();
  if(this.s != a.s) BigInteger.ZERO.subTo(r,r);
}

// (protected) r = this^2, r != this (HAC 14.16)
function bnpSquareTo(r) {
  var x = this.abs();
  var i = r.t = 2*x.t;
  while(--i >= 0) r[i] = 0;
  for(i = 0; i < x.t-1; ++i) {
    var c = x.am(i,x[i],r,2*i,0,1);
    if((r[i+x.t]+=x.am(i+1,2*x[i],r,2*i+1,c,x.t-i-1)) >= x.DV) {
      r[i+x.t] -= x.DV;
      r[i+x.t+1] = 1;
    }
  }
  if(r.t > 0) r[r.t-1] += x.am(i,x[i],r,2*i,0,1);
  r.s = 0;
  r.clamp();
}

// (protected) divide this by m, quotient and remainder to q, r (HAC 14.20)
// r != q, this != m.  q or r may be null.
function bnpDivRemTo(m,q,r) {
  var pm = m.abs();
  if(pm.t <= 0) return;
  var pt = this.abs();
  if(pt.t < pm.t) {
    if(q != null) q.fromInt(0);
    if(r != null) this.copyTo(r);
    return;
  }
  if(r == null) r = nbi();
  var y = nbi(), ts = this.s, ms = m.s;
  var nsh = this.DB-nbits(pm[pm.t-1]);	// normalize modulus
  if(nsh > 0) { pm.lShiftTo(nsh,y); pt.lShiftTo(nsh,r); }
  else { pm.copyTo(y); pt.copyTo(r); }
  var ys = y.t;
  var y0 = y[ys-1];
  if(y0 == 0) return;
  var yt = y0*(1<<this.F1)+((ys>1)?y[ys-2]>>this.F2:0);
  var d1 = this.FV/yt, d2 = (1<<this.F1)/yt, e = 1<<this.F2;
  var i = r.t, j = i-ys, t = (q==null)?nbi():q;
  y.dlShiftTo(j,t);
  if(r.compareTo(t) >= 0) {
    r[r.t++] = 1;
    r.subTo(t,r);
  }
  BigInteger.ONE.dlShiftTo(ys,t);
  t.subTo(y,y);	// "negative" y so we can replace sub with am later
  while(y.t < ys) y[y.t++] = 0;
  while(--j >= 0) {
    // Estimate quotient digit
    var qd = (r[--i]==y0)?this.DM:Math.floor(r[i]*d1+(r[i-1]+e)*d2);
    if((r[i]+=y.am(0,qd,r,j,0,ys)) < qd) {	// Try it out
      y.dlShiftTo(j,t);
      r.subTo(t,r);
      while(r[i] < --qd) r.subTo(t,r);
    }
  }
  if(q != null) {
    r.drShiftTo(ys,q);
    if(ts != ms) BigInteger.ZERO.subTo(q,q);
  }
  r.t = ys;
  r.clamp();
  if(nsh > 0) r.rShiftTo(nsh,r);	// Denormalize remainder
  if(ts < 0) BigInteger.ZERO.subTo(r,r);
}

// (public) this mod a
function bnMod(a) {
  var r = nbi();
  this.abs().divRemTo(a,null,r);
  if(this.s < 0 && r.compareTo(BigInteger.ZERO) > 0) a.subTo(r,r);
  return r;
}

// Modular reduction using "classic" algorithm
function Classic(m) { this.m = m; }
function cConvert(x) {
  if(x.s < 0 || x.compareTo(this.m) >= 0) return x.mod(this.m);
  else return x;
}
function cRevert(x) { return x; }
function cReduce(x) { x.divRemTo(this.m,null,x); }
function cMulTo(x,y,r) { x.multiplyTo(y,r); this.reduce(r); }
function cSqrTo(x,r) { x.squareTo(r); this.reduce(r); }

Classic.prototype.convert = cConvert;
Classic.prototype.revert = cRevert;
Classic.prototype.reduce = cReduce;
Classic.prototype.mulTo = cMulTo;
Classic.prototype.sqrTo = cSqrTo;

// (protected) return "-1/this % 2^DB"; useful for Mont. reduction
// justification:
//         xy == 1 (mod m)
//         xy =  1+km
//   xy(2-xy) = (1+km)(1-km)
// x[y(2-xy)] = 1-k^2m^2
// x[y(2-xy)] == 1 (mod m^2)
// if y is 1/x mod m, then y(2-xy) is 1/x mod m^2
// should reduce x and y(2-xy) by m^2 at each step to keep size bounded.
// JS multiply "overflows" differently from C/C++, so care is needed here.
function bnpInvDigit() {
  if(this.t < 1) return 0;
  var x = this[0];
  if((x&1) == 0) return 0;
  var y = x&3;		// y == 1/x mod 2^2
  y = (y*(2-(x&0xf)*y))&0xf;	// y == 1/x mod 2^4
  y = (y*(2-(x&0xff)*y))&0xff;	// y == 1/x mod 2^8
  y = (y*(2-(((x&0xffff)*y)&0xffff)))&0xffff;	// y == 1/x mod 2^16
  // last step - calculate inverse mod DV directly;
  // assumes 16 < DB <= 32 and assumes ability to handle 48-bit ints
  y = (y*(2-x*y%this.DV))%this.DV;		// y == 1/x mod 2^dbits
  // we really want the negative inverse, and -DV < y < DV
  return (y>0)?this.DV-y:-y;
}

// Montgomery reduction
function Montgomery(m) {
  this.m = m;
  this.mp = m.invDigit();
  this.mpl = this.mp&0x7fff;
  this.mph = this.mp>>15;
  this.um = (1<<(m.DB-15))-1;
  this.mt2 = 2*m.t;
}

// xR mod m
function montConvert(x) {
  var r = nbi();
  x.abs().dlShiftTo(this.m.t,r);
  r.divRemTo(this.m,null,r);
  if(x.s < 0 && r.compareTo(BigInteger.ZERO) > 0) this.m.subTo(r,r);
  return r;
}

// x/R mod m
function montRevert(x) {
  var r = nbi();
  x.copyTo(r);
  this.reduce(r);
  return r;
}

// x = x/R mod m (HAC 14.32)
function montReduce(x) {
  while(x.t <= this.mt2)	// pad x so am has enough room later
    x[x.t++] = 0;
  for(var i = 0; i < this.m.t; ++i) {
    // faster way of calculating u0 = x[i]*mp mod DV
    var j = x[i]&0x7fff;
    var u0 = (j*this.mpl+(((j*this.mph+(x[i]>>15)*this.mpl)&this.um)<<15))&x.DM;
    // use am to combine the multiply-shift-add into one call
    j = i+this.m.t;
    x[j] += this.m.am(0,u0,x,i,0,this.m.t);
    // propagate carry
    while(x[j] >= x.DV) { x[j] -= x.DV; x[++j]++; }
  }
  x.clamp();
  x.drShiftTo(this.m.t,x);
  if(x.compareTo(this.m) >= 0) x.subTo(this.m,x);
}

// r = "x^2/R mod m"; x != r
function montSqrTo(x,r) { x.squareTo(r); this.reduce(r); }

// r = "xy/R mod m"; x,y != r
function montMulTo(x,y,r) { x.multiplyTo(y,r); this.reduce(r); }

Montgomery.prototype.convert = montConvert;
Montgomery.prototype.revert = montRevert;
Montgomery.prototype.reduce = montReduce;
Montgomery.prototype.mulTo = montMulTo;
Montgomery.prototype.sqrTo = montSqrTo;

// (protected) true iff this is even
function bnpIsEven() { return ((this.t>0)?(this[0]&1):this.s) == 0; }

// (protected) this^e, e < 2^32, doing sqr and mul with "r" (HAC 14.79)
function bnpExp(e,z) {
  if(e > 0xffffffff || e < 1) return BigInteger.ONE;
  var r = nbi(), r2 = nbi(), g = z.convert(this), i = nbits(e)-1;
  g.copyTo(r);
  while(--i >= 0) {
    z.sqrTo(r,r2);
    if((e&(1<<i)) > 0) z.mulTo(r2,g,r);
    else { var t = r; r = r2; r2 = t; }
  }
  return z.revert(r);
}

// (public) this^e % m, 0 <= e < 2^32
function bnModPowInt(e,m) {
  var z;
  if(e < 256 || m.isEven()) z = new Classic(m); else z = new Montgomery(m);
  return this.exp(e,z);
}

// protected
BigInteger.prototype.copyTo = bnpCopyTo;
BigInteger.prototype.fromInt = bnpFromInt;
BigInteger.prototype.fromString = bnpFromString;
BigInteger.prototype.clamp = bnpClamp;
BigInteger.prototype.dlShiftTo = bnpDLShiftTo;
BigInteger.prototype.drShiftTo = bnpDRShiftTo;
BigInteger.prototype.lShiftTo = bnpLShiftTo;
BigInteger.prototype.rShiftTo = bnpRShiftTo;
BigInteger.prototype.subTo = bnpSubTo;
BigInteger.prototype.multiplyTo = bnpMultiplyTo;
BigInteger.prototype.squareTo = bnpSquareTo;
BigInteger.prototype.divRemTo = bnpDivRemTo;
BigInteger.prototype.invDigit = bnpInvDigit;
BigInteger.prototype.isEven = bnpIsEven;
BigInteger.prototype.exp = bnpExp;

// public
BigInteger.prototype.toString = bnToString;
BigInteger.prototype.negate = bnNegate;
BigInteger.prototype.abs = bnAbs;
BigInteger.prototype.compareTo = bnCompareTo;
BigInteger.prototype.bitLength = bnBitLength;
BigInteger.prototype.mod = bnMod;
BigInteger.prototype.modPowInt = bnModPowInt;

// "constants"
BigInteger.ZERO = nbv(0);
BigInteger.ONE = nbv(1);
// Copyright (c) 2005-2009  Tom Wu
// All Rights Reserved.
// See "LICENSE" for details.

// Extended JavaScript BN functions, required for RSA private ops.

// Version 1.1: new BigInteger("0", 10) returns "proper" zero
// Version 1.2: square() API, isProbablePrime fix

// (public)
function bnClone() { var r = nbi(); this.copyTo(r); return r; }

// (public) return value as integer
function bnIntValue() {
  if(this.s < 0) {
    if(this.t == 1) return this[0]-this.DV;
    else if(this.t == 0) return -1;
  }
  else if(this.t == 1) return this[0];
  else if(this.t == 0) return 0;
  // assumes 16 < DB < 32
  return ((this[1]&((1<<(32-this.DB))-1))<<this.DB)|this[0];
}

// (public) return value as byte
function bnByteValue() { return (this.t==0)?this.s:(this[0]<<24)>>24; }

// (public) return value as short (assumes DB>=16)
function bnShortValue() { return (this.t==0)?this.s:(this[0]<<16)>>16; }

// (protected) return x s.t. r^x < DV
function bnpChunkSize(r) { return Math.floor(Math.LN2*this.DB/Math.log(r)); }

// (public) 0 if this == 0, 1 if this > 0
function bnSigNum() {
  if(this.s < 0) return -1;
  else if(this.t <= 0 || (this.t == 1 && this[0] <= 0)) return 0;
  else return 1;
}

// (protected) convert to radix string
function bnpToRadix(b) {
  if(b == null) b = 10;
  if(this.signum() == 0 || b < 2 || b > 36) return "0";
  var cs = this.chunkSize(b);
  var a = Math.pow(b,cs);
  var d = nbv(a), y = nbi(), z = nbi(), r = "";
  this.divRemTo(d,y,z);
  while(y.signum() > 0) {
    r = (a+z.intValue()).toString(b).substr(1) + r;
    y.divRemTo(d,y,z);
  }
  return z.intValue().toString(b) + r;
}

// (protected) convert from radix string
function bnpFromRadix(s,b) {
  this.fromInt(0);
  if(b == null) b = 10;
  var cs = this.chunkSize(b);
  var d = Math.pow(b,cs), mi = false, j = 0, w = 0;
  for(var i = 0; i < s.length; ++i) {
    var x = intAt(s,i);
    if(x < 0) {
      if(s.charAt(i) == "-" && this.signum() == 0) mi = true;
      continue;
    }
    w = b*w+x;
    if(++j >= cs) {
      this.dMultiply(d);
      this.dAddOffset(w,0);
      j = 0;
      w = 0;
    }
  }
  if(j > 0) {
    this.dMultiply(Math.pow(b,j));
    this.dAddOffset(w,0);
  }
  if(mi) BigInteger.ZERO.subTo(this,this);
}

// (protected) alternate constructor
function bnpFromNumber(a,b,c) {
  if("number" == typeof b) {
    // new BigInteger(int,int,RNG)
    if(a < 2) this.fromInt(1);
    else {
      this.fromNumber(a,c);
      if(!this.testBit(a-1))	// force MSB set
        this.bitwiseTo(BigInteger.ONE.shiftLeft(a-1),op_or,this);
      if(this.isEven()) this.dAddOffset(1,0); // force odd
      while(!this.isProbablePrime(b)) {
        this.dAddOffset(2,0);
        if(this.bitLength() > a) this.subTo(BigInteger.ONE.shiftLeft(a-1),this);
      }
    }
  }
  else {
    // new BigInteger(int,RNG)
    var x = new Array(), t = a&7;
    x.length = (a>>3)+1;
    b.nextBytes(x);
    if(t > 0) x[0] &= ((1<<t)-1); else x[0] = 0;
    this.fromString(x,256);
  }
}

// (public) convert to bigendian byte array
function bnToByteArray() {
  var i = this.t, r = new Array();
  r[0] = this.s;
  var p = this.DB-(i*this.DB)%8, d, k = 0;
  if(i-- > 0) {
    if(p < this.DB && (d = this[i]>>p) != (this.s&this.DM)>>p)
      r[k++] = d|(this.s<<(this.DB-p));
    while(i >= 0) {
      if(p < 8) {
        d = (this[i]&((1<<p)-1))<<(8-p);
        d |= this[--i]>>(p+=this.DB-8);
      }
      else {
        d = (this[i]>>(p-=8))&0xff;
        if(p <= 0) { p += this.DB; --i; }
      }
      if((d&0x80) != 0) d |= -256;
      if(k == 0 && (this.s&0x80) != (d&0x80)) ++k;
      if(k > 0 || d != this.s) r[k++] = d;
    }
  }
  return r;
}

function bnEquals(a) { return(this.compareTo(a)==0); }
function bnMin(a) { return(this.compareTo(a)<0)?this:a; }
function bnMax(a) { return(this.compareTo(a)>0)?this:a; }

// (protected) r = this op a (bitwise)
function bnpBitwiseTo(a,op,r) {
  var i, f, m = Math.min(a.t,this.t);
  for(i = 0; i < m; ++i) r[i] = op(this[i],a[i]);
  if(a.t < this.t) {
    f = a.s&this.DM;
    for(i = m; i < this.t; ++i) r[i] = op(this[i],f);
    r.t = this.t;
  }
  else {
    f = this.s&this.DM;
    for(i = m; i < a.t; ++i) r[i] = op(f,a[i]);
    r.t = a.t;
  }
  r.s = op(this.s,a.s);
  r.clamp();
}

// (public) this & a
function op_and(x,y) { return x&y; }
function bnAnd(a) { var r = nbi(); this.bitwiseTo(a,op_and,r); return r; }

// (public) this | a
function op_or(x,y) { return x|y; }
function bnOr(a) { var r = nbi(); this.bitwiseTo(a,op_or,r); return r; }

// (public) this ^ a
function op_xor(x,y) { return x^y; }
function bnXor(a) { var r = nbi(); this.bitwiseTo(a,op_xor,r); return r; }

// (public) this & ~a
function op_andnot(x,y) { return x&~y; }
function bnAndNot(a) { var r = nbi(); this.bitwiseTo(a,op_andnot,r); return r; }

// (public) ~this
function bnNot() {
  var r = nbi();
  for(var i = 0; i < this.t; ++i) r[i] = this.DM&~this[i];
  r.t = this.t;
  r.s = ~this.s;
  return r;
}

// (public) this << n
function bnShiftLeft(n) {
  var r = nbi();
  if(n < 0) this.rShiftTo(-n,r); else this.lShiftTo(n,r);
  return r;
}

// (public) this >> n
function bnShiftRight(n) {
  var r = nbi();
  if(n < 0) this.lShiftTo(-n,r); else this.rShiftTo(n,r);
  return r;
}

// return index of lowest 1-bit in x, x < 2^31
function lbit(x) {
  if(x == 0) return -1;
  var r = 0;
  if((x&0xffff) == 0) { x >>= 16; r += 16; }
  if((x&0xff) == 0) { x >>= 8; r += 8; }
  if((x&0xf) == 0) { x >>= 4; r += 4; }
  if((x&3) == 0) { x >>= 2; r += 2; }
  if((x&1) == 0) ++r;
  return r;
}

// (public) returns index of lowest 1-bit (or -1 if none)
function bnGetLowestSetBit() {
  for(var i = 0; i < this.t; ++i)
    if(this[i] != 0) return i*this.DB+lbit(this[i]);
  if(this.s < 0) return this.t*this.DB;
  return -1;
}

// return number of 1 bits in x
function cbit(x) {
  var r = 0;
  while(x != 0) { x &= x-1; ++r; }
  return r;
}

// (public) return number of set bits
function bnBitCount() {
  var r = 0, x = this.s&this.DM;
  for(var i = 0; i < this.t; ++i) r += cbit(this[i]^x);
  return r;
}

// (public) true iff nth bit is set
function bnTestBit(n) {
  var j = Math.floor(n/this.DB);
  if(j >= this.t) return(this.s!=0);
  return((this[j]&(1<<(n%this.DB)))!=0);
}

// (protected) this op (1<<n)
function bnpChangeBit(n,op) {
  var r = BigInteger.ONE.shiftLeft(n);
  this.bitwiseTo(r,op,r);
  return r;
}

// (public) this | (1<<n)
function bnSetBit(n) { return this.changeBit(n,op_or); }

// (public) this & ~(1<<n)
function bnClearBit(n) { return this.changeBit(n,op_andnot); }

// (public) this ^ (1<<n)
function bnFlipBit(n) { return this.changeBit(n,op_xor); }

// (protected) r = this + a
function bnpAddTo(a,r) {
  var i = 0, c = 0, m = Math.min(a.t,this.t);
  while(i < m) {
    c += this[i]+a[i];
    r[i++] = c&this.DM;
    c >>= this.DB;
  }
  if(a.t < this.t) {
    c += a.s;
    while(i < this.t) {
      c += this[i];
      r[i++] = c&this.DM;
      c >>= this.DB;
    }
    c += this.s;
  }
  else {
    c += this.s;
    while(i < a.t) {
      c += a[i];
      r[i++] = c&this.DM;
      c >>= this.DB;
    }
    c += a.s;
  }
  r.s = (c<0)?-1:0;
  if(c > 0) r[i++] = c;
  else if(c < -1) r[i++] = this.DV+c;
  r.t = i;
  r.clamp();
}

// (public) this + a
function bnAdd(a) { var r = nbi(); this.addTo(a,r); return r; }

// (public) this - a
function bnSubtract(a) { var r = nbi(); this.subTo(a,r); return r; }

// (public) this * a
function bnMultiply(a) { var r = nbi(); this.multiplyTo(a,r); return r; }

// (public) this^2
function bnSquare() { var r = nbi(); this.squareTo(r); return r; }

// (public) this / a
function bnDivide(a) { var r = nbi(); this.divRemTo(a,r,null); return r; }

// (public) this % a
function bnRemainder(a) { var r = nbi(); this.divRemTo(a,null,r); return r; }

// (public) [this/a,this%a]
function bnDivideAndRemainder(a) {
  var q = nbi(), r = nbi();
  this.divRemTo(a,q,r);
  return new Array(q,r);
}

// (protected) this *= n, this >= 0, 1 < n < DV
function bnpDMultiply(n) {
  this[this.t] = this.am(0,n-1,this,0,0,this.t);
  ++this.t;
  this.clamp();
}

// (protected) this += n << w words, this >= 0
function bnpDAddOffset(n,w) {
  if(n == 0) return;
  while(this.t <= w) this[this.t++] = 0;
  this[w] += n;
  while(this[w] >= this.DV) {
    this[w] -= this.DV;
    if(++w >= this.t) this[this.t++] = 0;
    ++this[w];
  }
}

// A "null" reducer
function NullExp() {}
function nNop(x) { return x; }
function nMulTo(x,y,r) { x.multiplyTo(y,r); }
function nSqrTo(x,r) { x.squareTo(r); }

NullExp.prototype.convert = nNop;
NullExp.prototype.revert = nNop;
NullExp.prototype.mulTo = nMulTo;
NullExp.prototype.sqrTo = nSqrTo;

// (public) this^e
function bnPow(e) { return this.exp(e,new NullExp()); }

// (protected) r = lower n words of "this * a", a.t <= n
// "this" should be the larger one if appropriate.
function bnpMultiplyLowerTo(a,n,r) {
  var i = Math.min(this.t+a.t,n);
  r.s = 0; // assumes a,this >= 0
  r.t = i;
  while(i > 0) r[--i] = 0;
  var j;
  for(j = r.t-this.t; i < j; ++i) r[i+this.t] = this.am(0,a[i],r,i,0,this.t);
  for(j = Math.min(a.t,n); i < j; ++i) this.am(0,a[i],r,i,0,n-i);
  r.clamp();
}

// (protected) r = "this * a" without lower n words, n > 0
// "this" should be the larger one if appropriate.
function bnpMultiplyUpperTo(a,n,r) {
  --n;
  var i = r.t = this.t+a.t-n;
  r.s = 0; // assumes a,this >= 0
  while(--i >= 0) r[i] = 0;
  for(i = Math.max(n-this.t,0); i < a.t; ++i)
    r[this.t+i-n] = this.am(n-i,a[i],r,0,0,this.t+i-n);
  r.clamp();
  r.drShiftTo(1,r);
}

// Barrett modular reduction
function Barrett(m) {
  // setup Barrett
  this.r2 = nbi();
  this.q3 = nbi();
  BigInteger.ONE.dlShiftTo(2*m.t,this.r2);
  this.mu = this.r2.divide(m);
  this.m = m;
}

function barrettConvert(x) {
  if(x.s < 0 || x.t > 2*this.m.t) return x.mod(this.m);
  else if(x.compareTo(this.m) < 0) return x;
  else { var r = nbi(); x.copyTo(r); this.reduce(r); return r; }
}

function barrettRevert(x) { return x; }

// x = x mod m (HAC 14.42)
function barrettReduce(x) {
  x.drShiftTo(this.m.t-1,this.r2);
  if(x.t > this.m.t+1) { x.t = this.m.t+1; x.clamp(); }
  this.mu.multiplyUpperTo(this.r2,this.m.t+1,this.q3);
  this.m.multiplyLowerTo(this.q3,this.m.t+1,this.r2);
  while(x.compareTo(this.r2) < 0) x.dAddOffset(1,this.m.t+1);
  x.subTo(this.r2,x);
  while(x.compareTo(this.m) >= 0) x.subTo(this.m,x);
}

// r = x^2 mod m; x != r
function barrettSqrTo(x,r) { x.squareTo(r); this.reduce(r); }

// r = x*y mod m; x,y != r
function barrettMulTo(x,y,r) { x.multiplyTo(y,r); this.reduce(r); }

Barrett.prototype.convert = barrettConvert;
Barrett.prototype.revert = barrettRevert;
Barrett.prototype.reduce = barrettReduce;
Barrett.prototype.mulTo = barrettMulTo;
Barrett.prototype.sqrTo = barrettSqrTo;

// (public) this^e % m (HAC 14.85)
function bnModPow(e,m) {
  var i = e.bitLength(), k, r = nbv(1), z;
  if(i <= 0) return r;
  else if(i < 18) k = 1;
  else if(i < 48) k = 3;
  else if(i < 144) k = 4;
  else if(i < 768) k = 5;
  else k = 6;
  if(i < 8)
    z = new Classic(m);
  else if(m.isEven())
    z = new Barrett(m);
  else
    z = new Montgomery(m);

  // precomputation
  var g = new Array(), n = 3, k1 = k-1, km = (1<<k)-1;
  g[1] = z.convert(this);
  if(k > 1) {
    var g2 = nbi();
    z.sqrTo(g[1],g2);
    while(n <= km) {
      g[n] = nbi();
      z.mulTo(g2,g[n-2],g[n]);
      n += 2;
    }
  }

  var j = e.t-1, w, is1 = true, r2 = nbi(), t;
  i = nbits(e[j])-1;
  while(j >= 0) {
    if(i >= k1) w = (e[j]>>(i-k1))&km;
    else {
      w = (e[j]&((1<<(i+1))-1))<<(k1-i);
      if(j > 0) w |= e[j-1]>>(this.DB+i-k1);
    }

    n = k;
    while((w&1) == 0) { w >>= 1; --n; }
    if((i -= n) < 0) { i += this.DB; --j; }
    if(is1) {	// ret == 1, don't bother squaring or multiplying it
      g[w].copyTo(r);
      is1 = false;
    }
    else {
      while(n > 1) { z.sqrTo(r,r2); z.sqrTo(r2,r); n -= 2; }
      if(n > 0) z.sqrTo(r,r2); else { t = r; r = r2; r2 = t; }
      z.mulTo(r2,g[w],r);
    }

    while(j >= 0 && (e[j]&(1<<i)) == 0) {
      z.sqrTo(r,r2); t = r; r = r2; r2 = t;
      if(--i < 0) { i = this.DB-1; --j; }
    }
  }
  return z.revert(r);
}

// (public) gcd(this,a) (HAC 14.54)
function bnGCD(a) {
  var x = (this.s<0)?this.negate():this.clone();
  var y = (a.s<0)?a.negate():a.clone();
  if(x.compareTo(y) < 0) { var t = x; x = y; y = t; }
  var i = x.getLowestSetBit(), g = y.getLowestSetBit();
  if(g < 0) return x;
  if(i < g) g = i;
  if(g > 0) {
    x.rShiftTo(g,x);
    y.rShiftTo(g,y);
  }
  while(x.signum() > 0) {
    if((i = x.getLowestSetBit()) > 0) x.rShiftTo(i,x);
    if((i = y.getLowestSetBit()) > 0) y.rShiftTo(i,y);
    if(x.compareTo(y) >= 0) {
      x.subTo(y,x);
      x.rShiftTo(1,x);
    }
    else {
      y.subTo(x,y);
      y.rShiftTo(1,y);
    }
  }
  if(g > 0) y.lShiftTo(g,y);
  return y;
}

// (protected) this % n, n < 2^26
function bnpModInt(n) {
  if(n <= 0) return 0;
  var d = this.DV%n, r = (this.s<0)?n-1:0;
  if(this.t > 0)
    if(d == 0) r = this[0]%n;
    else for(var i = this.t-1; i >= 0; --i) r = (d*r+this[i])%n;
  return r;
}

// (public) 1/this % m (HAC 14.61)
function bnModInverse(m) {
  var ac = m.isEven();
  if((this.isEven() && ac) || m.signum() == 0) return BigInteger.ZERO;
  var u = m.clone(), v = this.clone();
  var a = nbv(1), b = nbv(0), c = nbv(0), d = nbv(1);
  while(u.signum() != 0) {
    while(u.isEven()) {
      u.rShiftTo(1,u);
      if(ac) {
        if(!a.isEven() || !b.isEven()) { a.addTo(this,a); b.subTo(m,b); }
        a.rShiftTo(1,a);
      }
      else if(!b.isEven()) b.subTo(m,b);
      b.rShiftTo(1,b);
    }
    while(v.isEven()) {
      v.rShiftTo(1,v);
      if(ac) {
        if(!c.isEven() || !d.isEven()) { c.addTo(this,c); d.subTo(m,d); }
        c.rShiftTo(1,c);
      }
      else if(!d.isEven()) d.subTo(m,d);
      d.rShiftTo(1,d);
    }
    if(u.compareTo(v) >= 0) {
      u.subTo(v,u);
      if(ac) a.subTo(c,a);
      b.subTo(d,b);
    }
    else {
      v.subTo(u,v);
      if(ac) c.subTo(a,c);
      d.subTo(b,d);
    }
  }
  if(v.compareTo(BigInteger.ONE) != 0) return BigInteger.ZERO;
  if(d.compareTo(m) >= 0) return d.subtract(m);
  if(d.signum() < 0) d.addTo(m,d); else return d;
  if(d.signum() < 0) return d.add(m); else return d;
}

var lowprimes = [2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97,101,103,107,109,113,127,131,137,139,149,151,157,163,167,173,179,181,191,193,197,199,211,223,227,229,233,239,241,251,257,263,269,271,277,281,283,293,307,311,313,317,331,337,347,349,353,359,367,373,379,383,389,397,401,409,419,421,431,433,439,443,449,457,461,463,467,479,487,491,499,503,509,521,523,541,547,557,563,569,571,577,587,593,599,601,607,613,617,619,631,641,643,647,653,659,661,673,677,683,691,701,709,719,727,733,739,743,751,757,761,769,773,787,797,809,811,821,823,827,829,839,853,857,859,863,877,881,883,887,907,911,919,929,937,941,947,953,967,971,977,983,991,997];
var lplim = (1<<26)/lowprimes[lowprimes.length-1];

// (public) test primality with certainty >= 1-.5^t
function bnIsProbablePrime(t) {
  var i, x = this.abs();
  if(x.t == 1 && x[0] <= lowprimes[lowprimes.length-1]) {
    for(i = 0; i < lowprimes.length; ++i)
      if(x[0] == lowprimes[i]) return true;
    return false;
  }
  if(x.isEven()) return false;
  i = 1;
  while(i < lowprimes.length) {
    var m = lowprimes[i], j = i+1;
    while(j < lowprimes.length && m < lplim) m *= lowprimes[j++];
    m = x.modInt(m);
    while(i < j) if(m%lowprimes[i++] == 0) return false;
  }
  return x.millerRabin(t);
}

// (protected) true if probably prime (HAC 4.24, Miller-Rabin)
function bnpMillerRabin(t) {
  var n1 = this.subtract(BigInteger.ONE);
  var k = n1.getLowestSetBit();
  if(k <= 0) return false;
  var r = n1.shiftRight(k);
  t = (t+1)>>1;
  if(t > lowprimes.length) t = lowprimes.length;
  var a = nbi();
  for(var i = 0; i < t; ++i) {
    //Pick bases at random, instead of starting at 2
    a.fromInt(lowprimes[Math.floor(Math.random()*lowprimes.length)]);
    var y = a.modPow(r,this);
    if(y.compareTo(BigInteger.ONE) != 0 && y.compareTo(n1) != 0) {
      var j = 1;
      while(j++ < k && y.compareTo(n1) != 0) {
        y = y.modPowInt(2,this);
        if(y.compareTo(BigInteger.ONE) == 0) return false;
      }
      if(y.compareTo(n1) != 0) return false;
    }
  }
  return true;
}

// protected
BigInteger.prototype.chunkSize = bnpChunkSize;
BigInteger.prototype.toRadix = bnpToRadix;
BigInteger.prototype.fromRadix = bnpFromRadix;
BigInteger.prototype.fromNumber = bnpFromNumber;
BigInteger.prototype.bitwiseTo = bnpBitwiseTo;
BigInteger.prototype.changeBit = bnpChangeBit;
BigInteger.prototype.addTo = bnpAddTo;
BigInteger.prototype.dMultiply = bnpDMultiply;
BigInteger.prototype.dAddOffset = bnpDAddOffset;
BigInteger.prototype.multiplyLowerTo = bnpMultiplyLowerTo;
BigInteger.prototype.multiplyUpperTo = bnpMultiplyUpperTo;
BigInteger.prototype.modInt = bnpModInt;
BigInteger.prototype.millerRabin = bnpMillerRabin;

// public
BigInteger.prototype.clone = bnClone;
BigInteger.prototype.intValue = bnIntValue;
BigInteger.prototype.byteValue = bnByteValue;
BigInteger.prototype.shortValue = bnShortValue;
BigInteger.prototype.signum = bnSigNum;
BigInteger.prototype.toByteArray = bnToByteArray;
BigInteger.prototype.equals = bnEquals;
BigInteger.prototype.min = bnMin;
BigInteger.prototype.max = bnMax;
BigInteger.prototype.and = bnAnd;
BigInteger.prototype.or = bnOr;
BigInteger.prototype.xor = bnXor;
BigInteger.prototype.andNot = bnAndNot;
BigInteger.prototype.not = bnNot;
BigInteger.prototype.shiftLeft = bnShiftLeft;
BigInteger.prototype.shiftRight = bnShiftRight;
BigInteger.prototype.getLowestSetBit = bnGetLowestSetBit;
BigInteger.prototype.bitCount = bnBitCount;
BigInteger.prototype.testBit = bnTestBit;
BigInteger.prototype.setBit = bnSetBit;
BigInteger.prototype.clearBit = bnClearBit;
BigInteger.prototype.flipBit = bnFlipBit;
BigInteger.prototype.add = bnAdd;
BigInteger.prototype.subtract = bnSubtract;
BigInteger.prototype.multiply = bnMultiply;
BigInteger.prototype.divide = bnDivide;
BigInteger.prototype.remainder = bnRemainder;
BigInteger.prototype.divideAndRemainder = bnDivideAndRemainder;
BigInteger.prototype.modPow = bnModPow;
BigInteger.prototype.modInverse = bnModInverse;
BigInteger.prototype.pow = bnPow;
BigInteger.prototype.gcd = bnGCD;
BigInteger.prototype.isProbablePrime = bnIsProbablePrime;

// JSBN-specific extension
BigInteger.prototype.square = bnSquare;

// BigInteger interfaces not implemented in jsbn:

// BigInteger(int signum, byte[] magnitude)
// double doubleValue()
// float floatValue()
// int hashCode()
// long longValue()
// static BigInteger valueOf(long val)

module.exports.BigInteger = BigInteger;
// prng4.js - uses Arcfour as a PRNG

function Arcfour() {
  this.i = 0;
  this.j = 0;
  this.S = new Array();
}

// Initialize arcfour context from key, an array of ints, each from [0..255]
function ARC4init(key) {
  var i, j, t;
  for(i = 0; i < 256; ++i)
    this.S[i] = i;
  j = 0;
  for(i = 0; i < 256; ++i) {
    j = (j + this.S[i] + key[i % key.length]) & 255;
    t = this.S[i];
    this.S[i] = this.S[j];
    this.S[j] = t;
  }
  this.i = 0;
  this.j = 0;
}

function ARC4next() {
  var t;
  this.i = (this.i + 1) & 255;
  this.j = (this.j + this.S[this.i]) & 255;
  t = this.S[this.i];
  this.S[this.i] = this.S[this.j];
  this.S[this.j] = t;
  return this.S[(t + this.S[this.i]) & 255];
}

Arcfour.prototype.init = ARC4init;
Arcfour.prototype.next = ARC4next;

// Plug in your RNG constructor here
function prng_newstate() {
  return new Arcfour();
}

// Pool size must be a multiple of 4 and greater than 32.
// An array of bytes the size of the pool will be passed to init()
var rng_psize = 256;
// BigInteger monkey patching
BigInteger.valueOf = nbv;

/**
 * Returns a byte array representation of the big integer.
 *
 * This returns the absolute of the contained value in big endian
 * form. A value of zero results in an empty array.
 */
BigInteger.prototype.toByteArrayUnsigned = function () {
  var ba = this.abs().toByteArray();
  if (ba.length) {
    if (ba[0] == 0) {
      ba = ba.slice(1);
    }
    return ba.map(function (v) {
      return (v < 0) ? v + 256 : v;
    });
  } else {
    // Empty array, nothing to do
    return ba;
  }
};

/**
 * Turns a byte array into a big integer.
 *
 * This function will interpret a byte array as a big integer in big
 * endian notation and ignore leading zeros.
 */
BigInteger.fromByteArrayUnsigned = function (ba) {
  if (!ba.length) {
    return ba.valueOf(0);
  } else if (ba[0] & 0x80) {
    // Prepend a zero so the BigInteger class doesn't mistake this
    // for a negative integer.
    return new BigInteger([0].concat(ba));
  } else {
    return new BigInteger(ba);
  }
};

/**
 * Converts big integer to signed byte representation.
 *
 * The format for this value uses a the most significant bit as a sign
 * bit. If the most significant bit is already occupied by the
 * absolute value, an extra byte is prepended and the sign bit is set
 * there.
 *
 * Examples:
 *
 *      0 =>     0x00
 *      1 =>     0x01
 *     -1 =>     0x81
 *    127 =>     0x7f
 *   -127 =>     0xff
 *    128 =>   0x0080
 *   -128 =>   0x8080
 *    255 =>   0x00ff
 *   -255 =>   0x80ff
 *  16300 =>   0x3fac
 * -16300 =>   0xbfac
 *  62300 => 0x00f35c
 * -62300 => 0x80f35c
 */
BigInteger.prototype.toByteArraySigned = function () {
  var val = this.abs().toByteArrayUnsigned();
  var neg = this.compareTo(BigInteger.ZERO) < 0;

  if (neg) {
    if (val[0] & 0x80) {
      val.unshift(0x80);
    } else {
      val[0] |= 0x80;
    }
  } else {
    if (val[0] & 0x80) {
      val.unshift(0x00);
    }
  }

  return val;
};

/**
 * Parse a signed big integer byte representation.
 *
 * For details on the format please see BigInteger.toByteArraySigned.
 */
BigInteger.fromByteArraySigned = function (ba) {
  // Check for negative value
  if (ba[0] & 0x80) {
    // Remove sign bit
    ba[0] &= 0x7f;

    return BigInteger.fromByteArrayUnsigned(ba).negate();
  } else {
    return BigInteger.fromByteArrayUnsigned(ba);
  }
};

// Console ignore
var names = ["log", "debug", "info", "warn", "error", "assert", "dir",
             "dirxml", "group", "groupEnd", "time", "timeEnd", "count",
             "trace", "profile", "profileEnd"];

if ("undefined" == typeof window.console) window.console = {};
for (var i = 0; i < names.length; ++i)
  if ("undefined" == typeof window.console[names[i]])
    window.console[names[i]] = function() {};

// Bitcoin utility functions
Bitcoin.Util = {
  /**
   * Cross-browser compatibility version of Array.isArray.
   */
  isArray: Array.isArray || function(o)
  {
    return Object.prototype.toString.call(o) === '[object Array]';
  },

  /**
   * Create an array of a certain length filled with a specific value.
   */
  makeFilledArray: function (len, val)
  {
    var array = [];
    var i = 0;
    while (i < len) {
      array[i++] = val;
    }
    return array;
  },

  /**
   * Turn an integer into a "var_int".
   *
   * "var_int" is a variable length integer used by Bitcoin's binary format.
   *
   * Returns a byte array.
   */
  numToVarInt: function (i)
  {
    if (i < 0xfd) {
      // unsigned char
      return [i];
    } else if (i < 0x10000) {
      // unsigned short (LE)
      return [0xfd, i & 255 , i >>> 8];
    } else if (i < 0x100000000) {
      // unsigned int (LE)
      return [0xfe].concat(Crypto.util.wordsToBytes([i]).reverse());
    } else {
      throw 'quadword not implemented'
      // unsigned long long (LE)
      //return [0xff].concat(Crypto.util.wordsToBytes([i >>> 32, i]));
    }
  },

  /**
   * Parse a Bitcoin value byte array, returning a BigInteger.
   */
  valueToBigInt: function (valueBuffer)
  {
    if (valueBuffer instanceof BigInteger) return valueBuffer;

    // Prepend zero byte to prevent interpretation as negative integer
    return BigInteger.fromByteArrayUnsigned(valueBuffer);
  },

  /**
   * Format a Bitcoin value as a string.
   *
   * Takes a BigInteger or byte-array and returns that amount of Bitcoins in a
   * nice standard formatting.
   *
   * Examples:
   * 12.3555
   * 0.1234
   * 900.99998888
   * 34.00
   */
  formatValue: function (valueBuffer) {
    var value = this.valueToBigInt(valueBuffer).toString();
    var integerPart = value.length > 8 ? value.substr(0, value.length-8) : '0';
    var decimalPart = value.length > 8 ? value.substr(value.length-8) : value;
    while (decimalPart.length < 8) decimalPart = "0"+decimalPart;
    decimalPart = decimalPart.replace(/0*$/, '');
    while (decimalPart.length < 2) decimalPart += "0";
    return integerPart+"."+decimalPart;
  },

  /**
   * Parse a floating point string as a Bitcoin value.
   *
   * Keep in mind that parsing user input is messy. You should always display
   * the parsed value back to the user to make sure we understood his input
   * correctly.
   */
  parseValue: function (valueString) {
    // TODO: Detect other number formats (e.g. comma as decimal separator)
    var valueComp = valueString.split('.');
    var integralPart = valueComp[0];
    var fractionalPart = valueComp[1] || "0";
    while (fractionalPart.length < 8) fractionalPart += "0";
    fractionalPart = fractionalPart.replace(/^0+/g, '');
    var value = BigInteger.valueOf(parseInt(integralPart));
    value = value.multiply(BigInteger.valueOf(100000000));
    value = value.add(BigInteger.valueOf(parseInt(fractionalPart)));
    return value;
  },

  /**
   * Calculate RIPEMD160(SHA256(data)).
   *
   * Takes an arbitrary byte array as inputs and returns the hash as a byte
   * array.
   */
  sha256ripe160: function (data) {
    return Crypto.RIPEMD160(Crypto.SHA256(data, {asBytes: true}), {asBytes: true});
  }
};

for (var i in Crypto.util) {
  if (Crypto.util.hasOwnProperty(i)) {
    Bitcoin.Util[i] = Crypto.util[i];
  }
}
// Random number generator - requires a PRNG backend, e.g. prng4.js

// For best results, put code like
// <body onClick='rng_seed_time();' onKeyPress='rng_seed_time();'>
// in your main HTML document.

var rng_state;
var rng_pool;
var rng_pptr;

// Mix in a 32-bit integer into the pool
function rng_seed_int(x) {
  rng_pool[rng_pptr++] ^= x & 255;
  rng_pool[rng_pptr++] ^= (x >> 8) & 255;
  rng_pool[rng_pptr++] ^= (x >> 16) & 255;
  rng_pool[rng_pptr++] ^= (x >> 24) & 255;
  if(rng_pptr >= rng_psize) rng_pptr -= rng_psize;
}

// Mix in the current time (w/milliseconds) into the pool
function rng_seed_time() {
  rng_seed_int(new Date().getTime());
}

// Initialize the pool with junk if needed.
if(rng_pool == null) {
  rng_pool = new Array();
  rng_pptr = 0;
  var t;
  if(navigator.appName == "Netscape" && navigator.appVersion < "5" && window.crypto) {
    // Extract entropy (256 bits) from NS4 RNG if available
    var z = window.crypto.random(32);
    for(t = 0; t < z.length; ++t)
      rng_pool[rng_pptr++] = z.charCodeAt(t) & 255;
  }  
  while(rng_pptr < rng_psize) {  // extract some randomness from Math.random()
    t = Math.floor(65536 * Math.random());
    rng_pool[rng_pptr++] = t >>> 8;
    rng_pool[rng_pptr++] = t & 255;
  }
  rng_pptr = 0;
  rng_seed_time();
  //rng_seed_int(window.screenX);
  //rng_seed_int(window.screenY);
}

function rng_get_byte() {
  if(rng_state == null) {
    rng_seed_time();
    rng_state = prng_newstate();
    rng_state.init(rng_pool);
    for(rng_pptr = 0; rng_pptr < rng_pool.length; ++rng_pptr)
      rng_pool[rng_pptr] = 0;
    rng_pptr = 0;
    //rng_pool = null;
  }
  // TODO: allow reseeding after first request
  return rng_state.next();
}

function rng_get_bytes(ba) {
  var i;
  for(i = 0; i < ba.length; ++i) ba[i] = rng_get_byte();
}

function SecureRandom() {}

SecureRandom.prototype.nextBytes = function() {
  throw new Error('Should not use old RNG');
};
// Basic Javascript Elliptic Curve implementation
// Ported loosely from BouncyCastle's Java EC code
// Only Fp curves implemented for now

// Requires jsbn.js and jsbn2.js

// ----------------
// ECFieldElementFp

// constructor
function ECFieldElementFp(q,x) {
    this.x = x;
    // TODO if(x.compareTo(q) >= 0) error
    this.q = q;
}

function feFpEquals(other) {
    if(other == this) return true;
    return (this.q.equals(other.q) && this.x.equals(other.x));
}

function feFpToBigInteger() {
    return this.x;
}

function feFpNegate() {
    return new ECFieldElementFp(this.q, this.x.negate().mod(this.q));
}

function feFpAdd(b) {
    return new ECFieldElementFp(this.q, this.x.add(b.toBigInteger()).mod(this.q));
}

function feFpSubtract(b) {
    return new ECFieldElementFp(this.q, this.x.subtract(b.toBigInteger()).mod(this.q));
}

function feFpMultiply(b) {
    return new ECFieldElementFp(this.q, this.x.multiply(b.toBigInteger()).mod(this.q));
}

function feFpSquare() {
    return new ECFieldElementFp(this.q, this.x.square().mod(this.q));
}

function feFpDivide(b) {
    return new ECFieldElementFp(this.q, this.x.multiply(b.toBigInteger().modInverse(this.q)).mod(this.q));
}

ECFieldElementFp.prototype.equals = feFpEquals;
ECFieldElementFp.prototype.toBigInteger = feFpToBigInteger;
ECFieldElementFp.prototype.negate = feFpNegate;
ECFieldElementFp.prototype.add = feFpAdd;
ECFieldElementFp.prototype.subtract = feFpSubtract;
ECFieldElementFp.prototype.multiply = feFpMultiply;
ECFieldElementFp.prototype.square = feFpSquare;
ECFieldElementFp.prototype.divide = feFpDivide;

// ----------------
// ECPointFp

// constructor
function ECPointFp(curve,x,y,z) {
    this.curve = curve;
    this.x = x;
    this.y = y;
    // Projective coordinates: either zinv == null or z * zinv == 1
    // z and zinv are just BigIntegers, not fieldElements
    if(z == null) {
      this.z = BigInteger.ONE;
    }
    else {
      this.z = z;
    }
    this.zinv = null;
    //TODO: compression flag
}

function pointFpGetX() {
    if(this.zinv == null) {
      this.zinv = this.z.modInverse(this.curve.q);
    }
    return this.curve.fromBigInteger(this.x.toBigInteger().multiply(this.zinv).mod(this.curve.q));
}

function pointFpGetY() {
    if(this.zinv == null) {
      this.zinv = this.z.modInverse(this.curve.q);
    }
    return this.curve.fromBigInteger(this.y.toBigInteger().multiply(this.zinv).mod(this.curve.q));
}

function pointFpEquals(other) {
    if(other == this) return true;
    if(this.isInfinity()) return other.isInfinity();
    if(other.isInfinity()) return this.isInfinity();
    var u, v;
    // u = Y2 * Z1 - Y1 * Z2
    u = other.y.toBigInteger().multiply(this.z).subtract(this.y.toBigInteger().multiply(other.z)).mod(this.curve.q);
    if(!u.equals(BigInteger.ZERO)) return false;
    // v = X2 * Z1 - X1 * Z2
    v = other.x.toBigInteger().multiply(this.z).subtract(this.x.toBigInteger().multiply(other.z)).mod(this.curve.q);
    return v.equals(BigInteger.ZERO);
}

function pointFpIsInfinity() {
    if((this.x == null) && (this.y == null)) return true;
    return this.z.equals(BigInteger.ZERO) && !this.y.toBigInteger().equals(BigInteger.ZERO);
}

function pointFpNegate() {
    return new ECPointFp(this.curve, this.x, this.y.negate(), this.z);
}

function pointFpAdd(b) {
    if(this.isInfinity()) return b;
    if(b.isInfinity()) return this;

    // u = Y2 * Z1 - Y1 * Z2
    var u = b.y.toBigInteger().multiply(this.z).subtract(this.y.toBigInteger().multiply(b.z)).mod(this.curve.q);
    // v = X2 * Z1 - X1 * Z2
    var v = b.x.toBigInteger().multiply(this.z).subtract(this.x.toBigInteger().multiply(b.z)).mod(this.curve.q);

    if(BigInteger.ZERO.equals(v)) {
        if(BigInteger.ZERO.equals(u)) {
            return this.twice(); // this == b, so double
        }
	return this.curve.getInfinity(); // this = -b, so infinity
    }

    var THREE = new BigInteger("3");
    var x1 = this.x.toBigInteger();
    var y1 = this.y.toBigInteger();
    var x2 = b.x.toBigInteger();
    var y2 = b.y.toBigInteger();

    var v2 = v.square();
    var v3 = v2.multiply(v);
    var x1v2 = x1.multiply(v2);
    var zu2 = u.square().multiply(this.z);

    // x3 = v * (z2 * (z1 * u^2 - 2 * x1 * v^2) - v^3)
    var x3 = zu2.subtract(x1v2.shiftLeft(1)).multiply(b.z).subtract(v3).multiply(v).mod(this.curve.q);
    // y3 = z2 * (3 * x1 * u * v^2 - y1 * v^3 - z1 * u^3) + u * v^3
    var y3 = x1v2.multiply(THREE).multiply(u).subtract(y1.multiply(v3)).subtract(zu2.multiply(u)).multiply(b.z).add(u.multiply(v3)).mod(this.curve.q);
    // z3 = v^3 * z1 * z2
    var z3 = v3.multiply(this.z).multiply(b.z).mod(this.curve.q);

    return new ECPointFp(this.curve, this.curve.fromBigInteger(x3), this.curve.fromBigInteger(y3), z3);
}

function pointFpTwice() {
    if(this.isInfinity()) return this;
    if(this.y.toBigInteger().signum() == 0) return this.curve.getInfinity();

    // TODO: optimized handling of constants
    var THREE = new BigInteger("3");
    var x1 = this.x.toBigInteger();
    var y1 = this.y.toBigInteger();

    var y1z1 = y1.multiply(this.z);
    var y1sqz1 = y1z1.multiply(y1).mod(this.curve.q);
    var a = this.curve.a.toBigInteger();

    // w = 3 * x1^2 + a * z1^2
    var w = x1.square().multiply(THREE);
    if(!BigInteger.ZERO.equals(a)) {
      w = w.add(this.z.square().multiply(a));
    }
    w = w.mod(this.curve.q);
    // x3 = 2 * y1 * z1 * (w^2 - 8 * x1 * y1^2 * z1)
    var x3 = w.square().subtract(x1.shiftLeft(3).multiply(y1sqz1)).shiftLeft(1).multiply(y1z1).mod(this.curve.q);
    // y3 = 4 * y1^2 * z1 * (3 * w * x1 - 2 * y1^2 * z1) - w^3
    var y3 = w.multiply(THREE).multiply(x1).subtract(y1sqz1.shiftLeft(1)).shiftLeft(2).multiply(y1sqz1).subtract(w.square().multiply(w)).mod(this.curve.q);
    // z3 = 8 * (y1 * z1)^3
    var z3 = y1z1.square().multiply(y1z1).shiftLeft(3).mod(this.curve.q);

    return new ECPointFp(this.curve, this.curve.fromBigInteger(x3), this.curve.fromBigInteger(y3), z3);
}

// Simple NAF (Non-Adjacent Form) multiplication algorithm
// TODO: modularize the multiplication algorithm
function pointFpMultiply(k) {
    if(this.isInfinity()) return this;
    if(k.signum() == 0) return this.curve.getInfinity();

    var e = k;
    var h = e.multiply(new BigInteger("3"));

    var neg = this.negate();
    var R = this;

    var i;
    for(i = h.bitLength() - 2; i > 0; --i) {
	R = R.twice();

	var hBit = h.testBit(i);
	var eBit = e.testBit(i);

	if (hBit != eBit) {
	    R = R.add(hBit ? this : neg);
	}
    }

    return R;
}

// Compute this*j + x*k (simultaneous multiplication)
function pointFpMultiplyTwo(j,x,k) {
  var i;
  if(j.bitLength() > k.bitLength())
    i = j.bitLength() - 1;
  else
    i = k.bitLength() - 1;

  var R = this.curve.getInfinity();
  var both = this.add(x);
  while(i >= 0) {
    R = R.twice();
    if(j.testBit(i)) {
      if(k.testBit(i)) {
        R = R.add(both);
      }
      else {
        R = R.add(this);
      }
    }
    else {
      if(k.testBit(i)) {
        R = R.add(x);
      }
    }
    --i;
  }

  return R;
}

ECPointFp.prototype.getX = pointFpGetX;
ECPointFp.prototype.getY = pointFpGetY;
ECPointFp.prototype.equals = pointFpEquals;
ECPointFp.prototype.isInfinity = pointFpIsInfinity;
ECPointFp.prototype.negate = pointFpNegate;
ECPointFp.prototype.add = pointFpAdd;
ECPointFp.prototype.twice = pointFpTwice;
ECPointFp.prototype.multiply = pointFpMultiply;
ECPointFp.prototype.multiplyTwo = pointFpMultiplyTwo;

// ----------------
// ECCurveFp

// constructor
function ECCurveFp(q,a,b) {
    this.q = q;
    this.a = this.fromBigInteger(a);
    this.b = this.fromBigInteger(b);
    this.infinity = new ECPointFp(this, null, null);
}

function curveFpGetQ() {
    return this.q;
}

function curveFpGetA() {
    return this.a;
}

function curveFpGetB() {
    return this.b;
}

function curveFpEquals(other) {
    if(other == this) return true;
    return(this.q.equals(other.q) && this.a.equals(other.a) && this.b.equals(other.b));
}

function curveFpGetInfinity() {
    return this.infinity;
}

function curveFpFromBigInteger(x) {
    return new ECFieldElementFp(this.q, x);
}

// for now, work with hex strings because they're easier in JS
function curveFpDecodePointHex(s) {
    switch(parseInt(s.substr(0,2), 16)) { // first byte
    case 0:
	return this.infinity;
    case 2:
    case 3:
	// point compression not supported yet
	return null;
    case 4:
    case 6:
    case 7:
	var len = (s.length - 2) / 2;
	var xHex = s.substr(2, len);
	var yHex = s.substr(len+2, len);

	return new ECPointFp(this,
			     this.fromBigInteger(new BigInteger(xHex, 16)),
			     this.fromBigInteger(new BigInteger(yHex, 16)));

    default: // unsupported
	return null;
    }
}

ECCurveFp.prototype.getQ = curveFpGetQ;
ECCurveFp.prototype.getA = curveFpGetA;
ECCurveFp.prototype.getB = curveFpGetB;
ECCurveFp.prototype.equals = curveFpEquals;
ECCurveFp.prototype.getInfinity = curveFpGetInfinity;
ECCurveFp.prototype.fromBigInteger = curveFpFromBigInteger;
ECCurveFp.prototype.decodePointHex = curveFpDecodePointHex;

module.exports.ECPointFp = ECPointFp;
module.exports.ECFieldElementFp = ECFieldElementFp;
// Named EC curves

// Requires ec.js, jsbn.js, and jsbn2.js

// ----------------
// X9ECParameters

// constructor
function X9ECParameters(curve,g,n,h) {
    this.curve = curve;
    this.g = g;
    this.n = n;
    this.h = h;
}

function x9getCurve() {
    return this.curve;
}

function x9getG() {
    return this.g;
}

function x9getN() {
    return this.n;
}

function x9getH() {
    return this.h;
}

X9ECParameters.prototype.getCurve = x9getCurve;
X9ECParameters.prototype.getG = x9getG;
X9ECParameters.prototype.getN = x9getN;
X9ECParameters.prototype.getH = x9getH;

// ----------------
// SECNamedCurves

function fromHex(s) { return new BigInteger(s, 16); }

function secp128r1() {
    // p = 2^128 - 2^97 - 1
    var p = fromHex("FFFFFFFDFFFFFFFFFFFFFFFFFFFFFFFF");
    var a = fromHex("FFFFFFFDFFFFFFFFFFFFFFFFFFFFFFFC");
    var b = fromHex("E87579C11079F43DD824993C2CEE5ED3");
    //byte[] S = Hex.decode("000E0D4D696E6768756151750CC03A4473D03679");
    var n = fromHex("FFFFFFFE0000000075A30D1B9038A115");
    var h = BigInteger.ONE;
    var curve = new ECCurveFp(p, a, b);
    var G = curve.decodePointHex("04"
                + "161FF7528B899B2D0C28607CA52C5B86"
		+ "CF5AC8395BAFEB13C02DA292DDED7A83");
    return new X9ECParameters(curve, G, n, h);
}

function secp160k1() {
    // p = 2^160 - 2^32 - 2^14 - 2^12 - 2^9 - 2^8 - 2^7 - 2^3 - 2^2 - 1
    var p = fromHex("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFAC73");
    var a = BigInteger.ZERO;
    var b = fromHex("7");
    //byte[] S = null;
    var n = fromHex("0100000000000000000001B8FA16DFAB9ACA16B6B3");
    var h = BigInteger.ONE;
    var curve = new ECCurveFp(p, a, b);
    var G = curve.decodePointHex("04"
                + "3B4C382CE37AA192A4019E763036F4F5DD4D7EBB"
                + "938CF935318FDCED6BC28286531733C3F03C4FEE");
    return new X9ECParameters(curve, G, n, h);
}

function secp160r1() {
    // p = 2^160 - 2^31 - 1
    var p = fromHex("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF7FFFFFFF");
    var a = fromHex("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF7FFFFFFC");
    var b = fromHex("1C97BEFC54BD7A8B65ACF89F81D4D4ADC565FA45");
    //byte[] S = Hex.decode("1053CDE42C14D696E67687561517533BF3F83345");
    var n = fromHex("0100000000000000000001F4C8F927AED3CA752257");
    var h = BigInteger.ONE;
    var curve = new ECCurveFp(p, a, b);
    var G = curve.decodePointHex("04"
		+ "4A96B5688EF573284664698968C38BB913CBFC82"
		+ "23A628553168947D59DCC912042351377AC5FB32");
    return new X9ECParameters(curve, G, n, h);
}

function secp192k1() {
    // p = 2^192 - 2^32 - 2^12 - 2^8 - 2^7 - 2^6 - 2^3 - 1
    var p = fromHex("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFEE37");
    var a = BigInteger.ZERO;
    var b = fromHex("3");
    //byte[] S = null;
    var n = fromHex("FFFFFFFFFFFFFFFFFFFFFFFE26F2FC170F69466A74DEFD8D");
    var h = BigInteger.ONE;
    var curve = new ECCurveFp(p, a, b);
    var G = curve.decodePointHex("04"
                + "DB4FF10EC057E9AE26B07D0280B7F4341DA5D1B1EAE06C7D"
                + "9B2F2F6D9C5628A7844163D015BE86344082AA88D95E2F9D");
    return new X9ECParameters(curve, G, n, h);
}

function secp192r1() {
    // p = 2^192 - 2^64 - 1
    var p = fromHex("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFFFFFFFFFF");
    var a = fromHex("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFFFFFFFFFC");
    var b = fromHex("64210519E59C80E70FA7E9AB72243049FEB8DEECC146B9B1");
    //byte[] S = Hex.decode("3045AE6FC8422F64ED579528D38120EAE12196D5");
    var n = fromHex("FFFFFFFFFFFFFFFFFFFFFFFF99DEF836146BC9B1B4D22831");
    var h = BigInteger.ONE;
    var curve = new ECCurveFp(p, a, b);
    var G = curve.decodePointHex("04"
                + "188DA80EB03090F67CBF20EB43A18800F4FF0AFD82FF1012"
                + "07192B95FFC8DA78631011ED6B24CDD573F977A11E794811");
    return new X9ECParameters(curve, G, n, h);
}

function secp224r1() {
    // p = 2^224 - 2^96 + 1
    var p = fromHex("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF000000000000000000000001");
    var a = fromHex("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFFFFFFFFFFFFFFFFFE");
    var b = fromHex("B4050A850C04B3ABF54132565044B0B7D7BFD8BA270B39432355FFB4");
    //byte[] S = Hex.decode("BD71344799D5C7FCDC45B59FA3B9AB8F6A948BC5");
    var n = fromHex("FFFFFFFFFFFFFFFFFFFFFFFFFFFF16A2E0B8F03E13DD29455C5C2A3D");
    var h = BigInteger.ONE;
    var curve = new ECCurveFp(p, a, b);
    var G = curve.decodePointHex("04"
                + "B70E0CBD6BB4BF7F321390B94A03C1D356C21122343280D6115C1D21"
                + "BD376388B5F723FB4C22DFE6CD4375A05A07476444D5819985007E34");
    return new X9ECParameters(curve, G, n, h);
}

function secp256k1() {
    // p = 2^256 - 2^32 - 2^9 - 2^8 - 2^7 - 2^6 - 2^4 - 1
    var p = fromHex("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFC2F");
    var a = BigInteger.ZERO;
    var b = fromHex("7");
    //byte[] S = null;
    var n = fromHex("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141");
    var h = BigInteger.ONE;
    var curve = new ECCurveFp(p, a, b);
    var G = curve.decodePointHex("04"
                + "79BE667EF9DCBBAC55A06295CE870B07029BFCDB2DCE28D959F2815B16F81798"
	            + "483ADA7726A3C4655DA4FBFC0E1108A8FD17B448A68554199C47D08FFB10D4B8");
    return new X9ECParameters(curve, G, n, h);
}

function secp256r1() {
    // p = 2^224 (2^32 - 1) + 2^192 + 2^96 - 1
    var p = fromHex("FFFFFFFF00000001000000000000000000000000FFFFFFFFFFFFFFFFFFFFFFFF");
    var a = fromHex("FFFFFFFF00000001000000000000000000000000FFFFFFFFFFFFFFFFFFFFFFFC");
    var b = fromHex("5AC635D8AA3A93E7B3EBBD55769886BC651D06B0CC53B0F63BCE3C3E27D2604B");
    //byte[] S = Hex.decode("C49D360886E704936A6678E1139D26B7819F7E90");
    var n = fromHex("FFFFFFFF00000000FFFFFFFFFFFFFFFFBCE6FAADA7179E84F3B9CAC2FC632551");
    var h = BigInteger.ONE;
    var curve = new ECCurveFp(p, a, b);
    var G = curve.decodePointHex("04"
                + "6B17D1F2E12C4247F8BCE6E563A440F277037D812DEB33A0F4A13945D898C296"
		+ "4FE342E2FE1A7F9B8EE7EB4A7C0F9E162BCE33576B315ECECBB6406837BF51F5");
    return new X9ECParameters(curve, G, n, h);
}

// TODO: make this into a proper hashtable
function getSECCurveByName(name) {
    if(name == "secp128r1") return secp128r1();
    if(name == "secp160k1") return secp160k1();
    if(name == "secp160r1") return secp160r1();
    if(name == "secp192k1") return secp192k1();
    if(name == "secp192r1") return secp192r1();
    if(name == "secp224r1") return secp224r1();
    if(name == "secp256k1") return secp256k1();
    if(name == "secp256r1") return secp256r1();
    return null;
}

module.exports.getSECCurveByName = getSECCurveByName;
function integerToBytes(i, len) {
  var bytes = i.toByteArrayUnsigned();

  if (len < bytes.length) {
    bytes = bytes.slice(bytes.length-len);
  } else while (len > bytes.length) {
    bytes.unshift(0);
  }

  return bytes;
};

ECFieldElementFp.prototype.getByteLength = function () {
  return Math.floor((this.toBigInteger().bitLength() + 7) / 8);
};

ECPointFp.prototype.getEncoded = function (compressed) {
  var x = this.getX().toBigInteger();
  var y = this.getY().toBigInteger();

  // Get value as a 32-byte Buffer
  // Fixed length based on a patch by bitaddress.org and Casascius
  var enc = integerToBytes(x, 32);

  if (compressed) {
    if (y.isEven()) {
      // Compressed even pubkey
      // M = 02 || X
      enc.unshift(0x02);
    } else {
      // Compressed uneven pubkey
      // M = 03 || X
      enc.unshift(0x03);
    }
  } else {
    // Uncompressed pubkey
    // M = 04 || X || Y
    enc.unshift(0x04);
    enc = enc.concat(integerToBytes(y, 32));
  }
  return enc;
};

ECPointFp.decodeFrom = function (ecparams, enc) {
  var type = enc[0];
  var dataLen = enc.length-1;

  // Extract x and y as byte arrays
  if (type === 4) {
    var xBa = enc.slice(1, 1 + dataLen/2),
        yBa = enc.slice(1 + dataLen/2, 1 + dataLen),
        x = BigInteger.fromByteArrayUnsigned(xBa),
        y = BigInteger.fromByteArrayUnsigned(yBa);
  }
  else {
    var xBa = enc.slice(1),
        x = BigInteger.fromByteArrayUnsigned(xBa),
        p = ecparams.getQ(),
        xCubedPlus7 = x.multiply(x).multiply(x).add(new BigInteger('7')).mod(p),
        pPlus1Over4 = p.add(new BigInteger('1'))
                       .divide(new BigInteger('4')),
        y = xCubedPlus7.modPow(pPlus1Over4,p);
    if (y.mod(new BigInteger('2')).toString() != ''+(type % 2)) {
        y = p.subtract(y)
    }
  }

  // Return point
  return new ECPointFp(ecparams,
                       ecparams.fromBigInteger(x),
                       ecparams.fromBigInteger(y));
};

ECPointFp.prototype.add2D = function (b) {
  if(this.isInfinity()) return b;
  if(b.isInfinity()) return this;

  if (this.x.equals(b.x)) {
    if (this.y.equals(b.y)) {
      // this = b, i.e. this must be doubled
      return this.twice();
    }
    // this = -b, i.e. the result is the point at infinity
    return this.curve.getInfinity();
  }

  var x_x = b.x.subtract(this.x);
  var y_y = b.y.subtract(this.y);
  var gamma = y_y.divide(x_x);

  var x3 = gamma.square().subtract(this.x).subtract(b.x);
  var y3 = gamma.multiply(this.x.subtract(x3)).subtract(this.y);

  return new ECPointFp(this.curve, x3, y3);
};

ECPointFp.prototype.twice2D = function () {
  if (this.isInfinity()) return this;
  if (this.y.toBigInteger().signum() == 0) {
    // if y1 == 0, then (x1, y1) == (x1, -y1)
    // and hence this = -this and thus 2(x1, y1) == infinity
    return this.curve.getInfinity();
  }

  var TWO = this.curve.fromBigInteger(BigInteger.valueOf(2));
  var THREE = this.curve.fromBigInteger(BigInteger.valueOf(3));
  var gamma = this.x.square().multiply(THREE).add(this.curve.a).divide(this.y.multiply(TWO));

  var x3 = gamma.square().subtract(this.x.multiply(TWO));
  var y3 = gamma.multiply(this.x.subtract(x3)).subtract(this.y);

  return new ECPointFp(this.curve, x3, y3);
};

ECPointFp.prototype.multiply2D = function (k) {
  if(this.isInfinity()) return this;
  if(k.signum() == 0) return this.curve.getInfinity();

  var e = k;
  var h = e.multiply(new BigInteger("3"));

  var neg = this.negate();
  var R = this;

  var i;
  for (i = h.bitLength() - 2; i > 0; --i) {
    R = R.twice();

    var hBit = h.testBit(i);
    var eBit = e.testBit(i);

    if (hBit != eBit) {
      R = R.add2D(hBit ? this : neg);
    }
  }

  return R;
};

ECPointFp.prototype.isOnCurve = function () {
  var x = this.getX().toBigInteger();
  var y = this.getY().toBigInteger();
  var a = this.curve.getA().toBigInteger();
  var b = this.curve.getB().toBigInteger();
  var n = this.curve.getQ();
  var lhs = y.multiply(y).mod(n);
  var rhs = x.multiply(x).multiply(x)
    .add(a.multiply(x)).add(b).mod(n);
  return lhs.equals(rhs);
};

ECPointFp.prototype.toString = function () {
  return '('+this.getX().toBigInteger().toString()+','+
    this.getY().toBigInteger().toString()+')';
};

/**
 * Validate an elliptic curve point.
 *
 * See SEC 1, section 3.2.2.1: Elliptic Curve Public Key Validation Primitive
 */
ECPointFp.prototype.validate = function () {
  var n = this.curve.getQ();

  // Check Q != O
  if (this.isInfinity()) {
    throw new Error("Point is at infinity.");
  }

  // Check coordinate bounds
  var x = this.getX().toBigInteger();
  var y = this.getY().toBigInteger();
  if (x.compareTo(BigInteger.ONE) < 0 ||
      x.compareTo(n.subtract(BigInteger.ONE)) > 0) {
    throw new Error('x coordinate out of bounds');
  }
  if (y.compareTo(BigInteger.ONE) < 0 ||
      y.compareTo(n.subtract(BigInteger.ONE)) > 0) {
    throw new Error('y coordinate out of bounds');
  }

  // Check y^2 = x^3 + ax + b (mod n)
  if (!this.isOnCurve()) {
    throw new Error("Point is not on the curve.");
  }

  // Check nQ = 0 (Q is a scalar multiple of G)
  if (this.multiply(n).isInfinity()) {
    // TODO: This check doesn't work - fix.
    throw new Error("Point is not a scalar multiple of G.");
  }

  return true;
};

function dmp(v) {
  if (!(v instanceof BigInteger)) v = v.toBigInteger();
  return Crypto.util.bytesToHex(v.toByteArrayUnsigned());
};

Bitcoin.ECDSA = (function () {
  var ecparams = getSECCurveByName("secp256k1");
  var rng = new SecureRandom();

  var P_OVER_FOUR = null;

  function implShamirsTrick(P, k, Q, l)
  {
    var m = Math.max(k.bitLength(), l.bitLength());
    var Z = P.add2D(Q);
    var R = P.curve.getInfinity();

    for (var i = m - 1; i >= 0; --i) {
      R = R.twice2D();

      R.z = BigInteger.ONE;

      if (k.testBit(i)) {
        if (l.testBit(i)) {
          R = R.add2D(Z);
        } else {
          R = R.add2D(P);
        }
      } else {
        if (l.testBit(i)) {
          R = R.add2D(Q);
        }
      }
    }

    return R;
  };

  var ECDSA = {
    getBigRandom: function (limit) {
      return new BigInteger(limit.bitLength(), rng)
        .mod(limit.subtract(BigInteger.ONE))
        .add(BigInteger.ONE)
      ;
    },
    sign: function (hash, priv) {
      var d = priv;
      var n = ecparams.getN();
      var e = BigInteger.fromByteArrayUnsigned(hash);

      do {
        var k = ECDSA.getBigRandom(n);
        var G = ecparams.getG();
        var Q = G.multiply(k);
        var r = Q.getX().toBigInteger().mod(n);
      } while (r.compareTo(BigInteger.ZERO) <= 0);

      var s = k.modInverse(n).multiply(e.add(d.multiply(r))).mod(n);

      return ECDSA.serializeSig(r, s);
    },

    verify: function (hash, sig, pubkey) {
      var r,s;
      if (Bitcoin.Util.isArray(sig)) {
        var obj = ECDSA.parseSig(sig);
        r = obj.r;
        s = obj.s;
      } else if ("object" === typeof sig && sig.r && sig.s) {
        r = sig.r;
        s = sig.s;
      } else {
        throw "Invalid value for signature";
      }

      var Q;
      if (pubkey instanceof ECPointFp) {
        Q = pubkey;
      } else if (Bitcoin.Util.isArray(pubkey)) {
        Q = ECPointFp.decodeFrom(ecparams.getCurve(), pubkey);
      } else {
        throw "Invalid format for pubkey value, must be byte array or ECPointFp";
      }
      var e = BigInteger.fromByteArrayUnsigned(hash);

      return ECDSA.verifyRaw(e, r, s, Q);
    },

    verifyRaw: function (e, r, s, Q) {
      var n = ecparams.getN();
      var G = ecparams.getG();

      if (r.compareTo(BigInteger.ONE) < 0 ||
          r.compareTo(n) >= 0)
        return false;

      if (s.compareTo(BigInteger.ONE) < 0 ||
          s.compareTo(n) >= 0)
        return false;

      var c = s.modInverse(n);

      var u1 = e.multiply(c).mod(n);
      var u2 = r.multiply(c).mod(n);

      // TODO(!!!): For some reason Shamir's trick isn't working with
      // signed message verification!? Probably an implementation
      // error!
      //var point = implShamirsTrick(G, u1, Q, u2);
      var point = G.multiply(u1).add(Q.multiply(u2));

      var v = point.getX().toBigInteger().mod(n);

      return v.equals(r);
    },

    /**
     * Serialize a signature into DER format.
     *
     * Takes two BigIntegers representing r and s and returns a byte array.
     */
    serializeSig: function (r, s) {
      var rBa = r.toByteArraySigned();
      var sBa = s.toByteArraySigned();

      var sequence = [];
      sequence.push(0x02); // INTEGER
      sequence.push(rBa.length);
      sequence = sequence.concat(rBa);

      sequence.push(0x02); // INTEGER
      sequence.push(sBa.length);
      sequence = sequence.concat(sBa);

      sequence.unshift(sequence.length);
      sequence.unshift(0x30); // SEQUENCE

      return sequence;
    },

    /**
     * Parses a byte array containing a DER-encoded signature.
     *
     * This function will return an object of the form:
     *
     * {
     *   r: BigInteger,
     *   s: BigInteger
     * }
     */
    parseSig: function (sig) {
      var cursor;
      if (sig[0] != 0x30)
        throw new Error("Signature not a valid DERSequence");

      cursor = 2;
      if (sig[cursor] != 0x02)
        throw new Error("First element in signature must be a DERInteger");;
      var rBa = sig.slice(cursor+2, cursor+2+sig[cursor+1]);

      cursor += 2+sig[cursor+1];
      if (sig[cursor] != 0x02)
        throw new Error("Second element in signature must be a DERInteger");
      var sBa = sig.slice(cursor+2, cursor+2+sig[cursor+1]);

      cursor += 2+sig[cursor+1];

      //if (cursor != sig.length)
      //  throw new Error("Extra bytes in signature");

      var r = BigInteger.fromByteArrayUnsigned(rBa);
      var s = BigInteger.fromByteArrayUnsigned(sBa);

      return {r: r, s: s};
    },

    parseSigCompact: function (sig) {
      if (sig.length !== 65) {
        throw "Signature has the wrong length";
      }

      // Signature is prefixed with a type byte storing three bits of
      // information.
      var i = sig[0] - 27;
      if (i < 0 || i > 7) {
        throw "Invalid signature type";
      }

      var n = ecparams.getN();
      var r = BigInteger.fromByteArrayUnsigned(sig.slice(1, 33)).mod(n);
      var s = BigInteger.fromByteArrayUnsigned(sig.slice(33, 65)).mod(n);

      return {r: r, s: s, i: i};
    },

    /**
     * Recover a public key from a signature.
     *
     * See SEC 1: Elliptic Curve Cryptography, section 4.1.6, "Public
     * Key Recovery Operation".
     *
     * http://www.secg.org/download/aid-780/sec1-v2.pdf
     */
    recoverPubKey: function (r, s, hash, i) {
      // The recovery parameter i has two bits.
      i = i & 3;

      // The less significant bit specifies whether the y coordinate
      // of the compressed point is even or not.
      var isYEven = i & 1;

      // The more significant bit specifies whether we should use the
      // first or second candidate key.
      var isSecondKey = i >> 1;

      var n = ecparams.getN();
      var G = ecparams.getG();
      var curve = ecparams.getCurve();
      var p = curve.getQ();
      var a = curve.getA().toBigInteger();
      var b = curve.getB().toBigInteger();

      // We precalculate (p + 1) / 4 where p is if the field order
      if (!P_OVER_FOUR) {
        P_OVER_FOUR = p.add(BigInteger.ONE).divide(BigInteger.valueOf(4));
      }

      // 1.1 Compute x
      var x = isSecondKey ? r.add(n) : r;

      // 1.3 Convert x to point
      var alpha = x.multiply(x).multiply(x).add(a.multiply(x)).add(b).mod(p);
      var beta = alpha.modPow(P_OVER_FOUR, p);

      var xorOdd = beta.isEven() ? (i % 2) : ((i+1) % 2);
      // If beta is even, but y isn't or vice versa, then convert it,
      // otherwise we're done and y == beta.
      var y = (beta.isEven() ? !isYEven : isYEven) ? beta : p.subtract(beta);

      // 1.4 Check that nR is at infinity
      var R = new ECPointFp(curve,
                            curve.fromBigInteger(x),
                            curve.fromBigInteger(y));
      R.validate();

      // 1.5 Compute e from M
      var e = BigInteger.fromByteArrayUnsigned(hash);
      var eNeg = BigInteger.ZERO.subtract(e).mod(n);

      // 1.6 Compute Q = r^-1 (sR - eG)
      var rInv = r.modInverse(n);
      var Q = implShamirsTrick(R, s, G, eNeg).multiply(rInv);

      Q.validate();
      if (!ECDSA.verifyRaw(e, r, s, Q)) {
        throw "Pubkey recovery unsuccessful";
      }

      var pubKey = new Bitcoin.ECKey();
      pubKey.pub = Q;
      return pubKey;
    },

    /**
     * Calculate pubkey extraction parameter.
     *
     * When extracting a pubkey from a signature, we have to
     * distinguish four different cases. Rather than putting this
     * burden on the verifier, Bitcoin includes a 2-bit value with the
     * signature.
     *
     * This function simply tries all four cases and returns the value
     * that resulted in a successful pubkey recovery.
     */
    calcPubkeyRecoveryParam: function (address, r, s, hash)
    {
      for (var i = 0; i < 4; i++) {
        try {
          var pubkey = Bitcoin.ECDSA.recoverPubKey(r, s, hash, i);
          if (pubkey.getBitcoinAddress().toString() == address) {
            return i;
          }
        } catch (e) {}
      }
      throw "Unable to find valid recovery factor";
    }
  };

  return ECDSA;
})();
Bitcoin.ECKey = (function () {
  var ECDSA = Bitcoin.ECDSA;
  var ecparams = getSECCurveByName("secp256k1");
  var rng = new SecureRandom();

  var ECKey = function (input) {
    if (!input) {
      // Generate new key
      var n = ecparams.getN();
      //this.priv = ECDSA.getBigRandom(n);
    } else if (input instanceof BigInteger) {
      // Input is a private key value
      this.priv = input;
    } else if (Bitcoin.Util.isArray(input)) {
      // Prepend zero byte to prevent interpretation as negative integer
      this.priv = BigInteger.fromByteArrayUnsigned(input);
    } else if ("string" == typeof input) {
      if (input.length == 51 && input[0] == '5') {
        // Base58 encoded private key
        this.priv = BigInteger.fromByteArrayUnsigned(ECKey.decodeString(input));
      } else {
        // Prepend zero byte to prevent interpretation as negative integer
        this.priv = BigInteger.fromByteArrayUnsigned(Crypto.util.hexToBytes(input));
      }
    }
    this.compressed = !!ECKey.compressByDefault;
  };

  /**
   * Whether public keys should be returned compressed by default.
   */
  ECKey.compressByDefault = false;

  /**
   * Set whether the public key should be returned compressed or not.
   */
  ECKey.prototype.setCompressed = function (v) {
    this.compressed = !!v;
  };

  /**
   * Return public key in DER encoding.
   */
  ECKey.prototype.getPub = function () {
    return this.getPubPoint().getEncoded(this.compressed);
  };

  /**
   * Return public point as ECPoint object.
   */
  ECKey.prototype.getPubPoint = function () {
    if (!this.pub) this.pub = ecparams.getG().multiply(this.priv);

    return this.pub;
  };

  /**
   * Get the pubKeyHash for this key.
   *
   * This is calculated as RIPE160(SHA256([encoded pubkey])) and returned as
   * a byte array.
   */
  ECKey.prototype.getPubKeyHash = function () {
    if (this.pubKeyHash) return this.pubKeyHash;

    return this.pubKeyHash = Bitcoin.Util.sha256ripe160(this.getPub());
  };

  ECKey.prototype.getBitcoinAddress = function () {
    var hash = this.getPubKeyHash();
    var addr = new Bitcoin.Address(hash);
    return addr;
  };

  ECKey.prototype.getExportedPrivateKey = function () {
    var hash = this.priv.toByteArrayUnsigned();
    while (hash.length < 32) hash.unshift(0);
    hash.unshift(0x80);
    var checksum = Crypto.SHA256(Crypto.SHA256(hash, {asBytes: true}), {asBytes: true});
    var bytes = hash.concat(checksum.slice(0,4));
    return Bitcoin.Base58.encode(bytes);
  };

  ECKey.prototype.setPub = function (pub) {
    this.pub = ECPointFp.decodeFrom(ecparams.getCurve(), pub);
  };

  ECKey.prototype.toString = function (format) {
    if (format === "base64") {
      return Crypto.util.bytesToBase64(this.priv.toByteArrayUnsigned());
    } else {
      return Crypto.util.bytesToHex(this.priv.toByteArrayUnsigned());
    }
  };

  ECKey.prototype.sign = function (hash) {
    return ECDSA.sign(hash, this.priv);
  };

  ECKey.prototype.verify = function (hash, sig) {
    return ECDSA.verify(hash, sig, this.getPub());
  };

  /**
   * Parse an exported private key contained in a string.
   */
  ECKey.decodeString = function (string) {
    var bytes = Bitcoin.Base58.decode(string);

    var hash = bytes.slice(0, 33);

    var checksum = Crypto.SHA256(Crypto.SHA256(hash, {asBytes: true}), {asBytes: true});

    if (checksum[0] != bytes[33] ||
        checksum[1] != bytes[34] ||
        checksum[2] != bytes[35] ||
        checksum[3] != bytes[36]) {
      throw "Checksum validation failed!";
    }

    var version = hash.shift();

    if (version != 0x80) {
      throw "Version "+version+" not supported!";
    }

    return hash;
  };

  return ECKey;
})();


module.exports.ECKey = Bitcoin.ECKey;

},{}],4:[function(require,module,exports){
module.exports = {
  network: 'livenet',
  logger: 'normal' // none, normal, debug
};

},{}],"G+CcXD":[function(require,module,exports){
(function (Buffer){
// Address
// =======
//
// Handles a bitcoin address
//
//
// Synopsis
// --------
// ```
//     var address = new Address('1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa');
//     if (address.isValid()) {
//        //...
//     }
//
//     // Also an address can be created from 
//     // public keys
//     var address = Address.fromPubKey(myPubkey);
//
//     // Or from a ScriptPubKey (from a transaction output)
//     var address  = Address.fromScriptPubKey(scriptPubKey);
//
//     // Multisig address p2sh handling
//     var myPukeys = [pubkey0, pubkey1, pubkey2]; 
//     var p2shAddress = Address.fromPubKeys(2, myPubkeys);
//     if (p2shAddress.isScript()) { //true 
//     }
//
//
// ```


'use strict';
var coinUtil = require('../util');
var VersionedData = require('../util/VersionedData');
var EncodedData = require('../util/EncodedData');
var networks = require('../networks');
var Script = require('./Script');
var util = require('util');

function Address(version, hash) {
  if (hash && hash.length && hash.length != 20)
    throw new Error('Hash must be 20 bytes');
  Address.super_.call(this, version, hash);
}

util.inherits(Address, VersionedData);
EncodedData.applyEncodingsTo(Address);

// create a pubKeyHash address
Address.fromPubKey = function(pubKey, network) {
  if (!network)
    network = 'livenet';

  if (pubKey.length !== 33 && pubKey.length !== 65)
    throw new Error('Invalid public key');

  var version = networks[network].addressVersion;
  var hash = coinUtil.sha256ripe160(pubKey);

  return new Address(version, hash);
};

// create an address from a Key object
Address.fromKey = function(key, network) {
  return Address.fromPubKey(key.public, network);
};

// create a p2sh m-of-n multisig address
Address.fromPubKeys = function(mReq, pubKeys, network, opts) {
  if (!network)
    network = 'livenet';

  for (var i in pubKeys) {
    var pubKey = pubKeys[i];
    if (pubKey.length != 33 && pubKey.length != 65)
      throw new Error('Invalid public key');
  }

  var script = Script.createMultisig(mReq, pubKeys, opts);
  return Address.fromScript(script, network);
};

//create a p2sh address from redeemScript
Address.fromScript = function(script, network) {
  if (!network)
    network = 'livenet';

  if (typeof script === 'string') {
    script = new Script(new Buffer(script, 'hex'));
  }

  var version = networks[network].P2SHVersion;
  var buf = script.getBuffer();
  var hash = coinUtil.sha256ripe160(buf);

  return new Address(version, hash);
};

//extract and address from scriptPubKey
Address.fromScriptPubKey = function(scriptPubKey, network) {

  if (typeof scriptPubKey === 'string') {
    scriptPubKey = new Script(new Buffer(scriptPubKey, 'hex'));
  }

  if (!network)
    network = 'livenet';

  var ret = [],
    version;
  var payload = scriptPubKey.capture();

  if (payload) {
    var txType = scriptPubKey.classify();
    switch (txType) {
      case Script.TX_PUBKEY:
        payload[0] = coinUtil.sha256ripe160(payload[0]);
        version = networks[network].addressVersion;
        break;
      case Script.TX_PUBKEYHASH:
        version = networks[network].addressVersion;
        break;
      case Script.TX_MULTISIG:
        version = networks[network].addressVersion;
        for (var i in payload)
          payload[i] = coinUtil.sha256ripe160(payload[i]);
        break;
      case Script.TX_SCRIPTHASH:
        version = networks[network].P2SHVersion;
        break;
    }
    for (var i in payload)
      ret.push(new Address(version, payload[i]));
  }
  return ret;
};

// validates the address
Address.prototype.validate = function() {
  this.doAsBinary(function() {
    Address.super_.prototype.validate.apply(this);
    if (this.data.length !== 21) throw new Error('invalid data length');
  });
  if (typeof this.network() === 'undefined') throw new Error('invalid network');
};

// returns the network information (livenet or testnet, as described on networks.js) of the address
Address.prototype.network = function() {
  var version = this.version();

  var livenet = networks.livenet;
  var testnet = networks.testnet;

  var answer;
  if (version === livenet.addressVersion || version === livenet.P2SHVersion)
    answer = livenet;
  else if (version === testnet.addressVersion || version === testnet.P2SHVersion)
    answer = testnet;

  return answer;
};

// returns true is the address is a pay-to-script (P2SH) address type.
Address.prototype.isScript = function() {
  return this.isValid() && this.version() === this.network().P2SHVersion;
};

// returns the scriptPubKey
Address.prototype.getScriptPubKey = function() {
  var version = this.version();
  var livenet = networks.livenet;
  var testnet = networks.testnet;

  var script;
  if (version === livenet.addressVersion || version === testnet.addressVersion)
    script = Script.createPubKeyHashOut(this.payload());
  else if (version === livenet.P2SHVersion || version === testnet.P2SHVersion)
    script = Script.createP2SH(this.payload());
  else
    throw new Error('invalid address - unknown version');

  return script;
};


module.exports = Address;

}).call(this,require("buffer").Buffer)
},{"../networks":19,"../util":61,"../util/EncodedData":59,"../util/VersionedData":60,"./Script":12,"buffer":31,"util":53}],"./lib/Address":[function(require,module,exports){
module.exports=require('G+CcXD');
},{}],7:[function(require,module,exports){
(function (Buffer){
var crypto = require('crypto');
var bignum = require('bignum');

var globalBuffer = new Buffer(1024);
var zerobuf = new Buffer(0);
var ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
var ALPHABET_ZERO = ALPHABET[0];
var ALPHABET_BUF = new Buffer(ALPHABET, 'ascii');
var ALPHABET_INV = {};
for (var i = 0; i < ALPHABET.length; i++) {
  ALPHABET_INV[ALPHABET[i]] = i;
};

// Vanilla Base58 Encoding
var base58 = {
  encode: function(buf) {
    var str;
    var x = bignum.fromBuffer(buf);
    var r;

    if (buf.length < 512) {
      str = globalBuffer;
    } else {
      str = new Buffer(buf.length << 1);
    }
    var i = str.length - 1;
    while (x.gt(0)) {
      r = x.mod(58);
      x = x.div(58);
      str[i] = ALPHABET_BUF[r.toNumber()];
      i--;
    }

    // deal with leading zeros
    var j = 0;
    while (buf[j] == 0) {
      str[i] = ALPHABET_BUF[0];
      j++;
      i--;
    }

    return str.slice(i + 1, str.length).toString('ascii');
  },

  decode: function(str) {
    if (str.length == 0) return zerobuf;
    var answer = bignum(0);
    for (var i = 0; i < str.length; i++) {
      answer = answer.mul(58);
      answer = answer.add(ALPHABET_INV[str[i]]);
    };
    var i = 0;
    while (i < str.length && str[i] == ALPHABET_ZERO) {
      i++;
    }
    if (i > 0) {
      var zb = new Buffer(i);
      zb.fill(0);
      if (i == str.length) return zb;
      answer = answer.toBuffer();
      return Buffer.concat([zb, answer], i + answer.length);
    } else {
      return answer.toBuffer();
    }
  },
};

// Base58Check Encoding
function sha256(data) {
  return new Buffer(crypto.createHash('sha256').update(data).digest('binary'), 'binary');
};

function doubleSHA256(data) {
  return sha256(sha256(data));
};

var base58Check = {
  encode: function(buf) {
    var checkedBuf = new Buffer(buf.length + 4);
    var hash = doubleSHA256(buf);
    buf.copy(checkedBuf);
    hash.copy(checkedBuf, buf.length);
    return base58.encode(checkedBuf);
  },

  decode: function(s) {
    var buf = base58.decode(s);
    if (buf.length < 4) {
      throw new Error("invalid input: too short");
    }

    var data = buf.slice(0, -4);
    var csum = buf.slice(-4);

    var hash = doubleSHA256(data);
    var hash4 = hash.slice(0, 4);

    if (csum.toString('hex') !== hash4.toString('hex')) {
      throw new Error("checksum mismatch");
    }

    return data;
  },
};

// if you frequently do base58 encodings with data larger
// than 512 bytes, you can use this method to expand the
// size of the reusable buffer
exports.setBuffer = function(buf) {
  globalBuffer = buf;
};

exports.base58 = base58;
exports.base58Check = base58Check;
exports.encode = base58.encode;
exports.decode = base58.decode;

}).call(this,require("buffer").Buffer)
},{"bignum":13,"buffer":31,"crypto":35}],8:[function(require,module,exports){
(function (Buffer){
"use strict";
var bignum = require('bignum');
var Point = require('./Point');

var n = bignum.fromBuffer(new Buffer("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141", 'hex'), {
  size: 32
});


var Curve = function() {};

/* secp256k1 curve */
var G;
Curve.getG = function() {
  // don't use Point in top scope, causes exception in browser
  // when Point is not loaded yet

  // use cached version if available
  G = G || new Point(bignum.fromBuffer(new Buffer("79BE667EF9DCBBAC55A06295CE870B07029BFCDB2DCE28D959F2815B16F81798", 'hex'), {
      size: 32
    }),
    bignum.fromBuffer(new Buffer("483ADA7726A3C4655DA4FBFC0E1108A8FD17B448A68554199C47D08FFB10D4B8", 'hex'), {
      size: 32
    }));
  return G;
};

Curve.getN = function() {
  return n;
};

module.exports = (Curve);

}).call(this,require("buffer").Buffer)
},{"./Point":15,"bignum":13,"buffer":31}],"./lib/HierarchicalKey":[function(require,module,exports){
module.exports=require('x1O6JW');
},{}],"x1O6JW":[function(require,module,exports){
(function (Buffer){
var base58 = require('./Base58').base58;
var coinUtil = require('../util');
var Key = require('./Key');
var Point = require('./Point');
var SecureRandom = require('./SecureRandom');
var bignum = require('bignum');
var networks = require('../networks');

var secp256k1_n = new bignum('FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141', 16);
var secp256k1_Gx = new bignum('79BE667EF9DCBBAC55A06295CE870B07029BFCDB2DCE28D959F2815B16F81798', 16);

/*
random new HierarchicalKey: new HierarchicalKey();
from extended public or private key: new HierarchicalKey(str);
new blank HierarchicalKey: new HierarchicalKey(null);
*/
var HierarchicalKey = function(bytes) {
  if (typeof bytes == 'undefined' || bytes == 'mainnet' || bytes == 'livenet') {
    bytes = 'livenet';
    this.version = networks['livenet'].hkeyPrivateVersion;
  } else if (bytes == 'testnet') {
    this.version = networks['testnet'].hkeyPrivateVersion;
  }
  if (bytes == 'livenet' || bytes == 'testnet') {
    this.depth = 0x00;
    this.parentFingerprint = new Buffer([0, 0, 0, 0]);
    this.childIndex = new Buffer([0, 0, 0, 0]);
    this.chainCode = SecureRandom.getRandomBuffer(32);
    this.eckey = Key.generateSync();
    this.hasPrivateKey = true;
    this.pubKeyHash = coinUtil.sha256ripe160(this.eckey.public);
    this.buildExtendedPublicKey();
    this.buildExtendedPrivateKey();
    return;
  }

  // decode base58
  if (typeof bytes === 'string') {
    var decoded = base58.decode(bytes);
    if (decoded.length != 82)
      throw new Error('Not enough data, expected 82 and received ' + decoded.length);
    var checksum = decoded.slice(78, 82);
    bytes = decoded.slice(0, 78);

    var hash = coinUtil.sha256(coinUtil.sha256(bytes));

    if (hash[0] != checksum[0] || hash[1] != checksum[1] || hash[2] != checksum[2] || hash[3] != checksum[3]) {
      throw new Error('Invalid checksum');
    }
  }

  if (bytes !== undefined && bytes !== null)
    this.initFromBytes(bytes);
}

HierarchicalKey.seed = function(bytes, network) {
  if (!network)
    network = 'livenet';

  if (!Buffer.isBuffer(bytes))
    bytes = new Buffer(bytes, 'hex'); //if not buffer, assume hex
  if (bytes.length < 128 / 8)
    return false; //need more entropy
  if (bytes.length > 512 / 8)
    return false;
  var hash = coinUtil.sha512hmac(bytes, new Buffer('Bitcoin seed'));

  var hkey = new HierarchicalKey(null);
  hkey.depth = 0x00;
  hkey.parentFingerprint = new Buffer([0, 0, 0, 0]);
  hkey.childIndex = new Buffer([0, 0, 0, 0]);
  hkey.chainCode = hash.slice(32, 64);
  hkey.version = networks[network].hkeyPrivateVersion;
  hkey.eckey = new Key();
  hkey.eckey.private = hash.slice(0, 32);
  hkey.eckey.regenerateSync();
  hkey.hasPrivateKey = true;
  hkey.pubKeyHash = coinUtil.sha256ripe160(hkey.eckey.public);

  hkey.buildExtendedPublicKey();
  hkey.buildExtendedPrivateKey();

  return hkey;
};

HierarchicalKey.prototype.initFromBytes = function(bytes) {
  // Both pub and private extended keys are 78 bytes
  if (bytes.length != 78) throw new Error('not enough data');

  this.version = u32(bytes.slice(0, 4));
  this.depth = u8(bytes.slice(4, 5));
  this.parentFingerprint = bytes.slice(5, 9);
  this.childIndex = u32(bytes.slice(9, 13));
  this.chainCode = bytes.slice(13, 45);

  var keyBytes = bytes.slice(45, 78);

  var isPrivate =
    (this.version == networks['livenet'].hkeyPrivateVersion ||
      this.version == networks['testnet'].hkeyPrivateVersion);

  var isPublic =
    (this.version == networks['livenet'].hkeyPublicVersion ||
      this.version == networks['testnet'].hkeyPublicVersion);

  if (isPrivate && keyBytes[0] == 0) {
    this.eckey = new Key();
    this.eckey.private = keyBytes.slice(1, 33);
    this.eckey.compressed = true;
    this.eckey.regenerateSync();
    this.pubKeyHash = coinUtil.sha256ripe160(this.eckey.public);
    this.hasPrivateKey = true;
  } else if (isPublic && (keyBytes[0] == 0x02 || keyBytes[0] == 0x03)) {
    this.eckey = new Key();
    this.eckey.public = keyBytes;
    this.pubKeyHash = coinUtil.sha256ripe160(this.eckey.public);
    this.hasPrivateKey = false;
  } else {
    throw new Error('Invalid key');
  }

  this.buildExtendedPublicKey();
  this.buildExtendedPrivateKey();
}

HierarchicalKey.prototype.buildExtendedPublicKey = function() {
  this.extendedPublicKey = new Buffer([]);

  var v = null;
  switch (this.version) {
    case networks['livenet'].hkeyPublicVersion:
    case networks['livenet'].hkeyPrivateVersion:
      v = networks['livenet'].hkeyPublicVersion;
      break;
    case networks['testnet'].hkeyPublicVersion:
    case networks['testnet'].hkeyPrivateVersion:
      v = networks['testnet'].hkeyPublicVersion;
      break;
    default:
      throw new Error('Unknown version');
  }

  // Version
  this.extendedPublicKey = Buffer.concat([
    new Buffer([v >> 24]),
    new Buffer([(v >> 16) & 0xff]),
    new Buffer([(v >> 8) & 0xff]),
    new Buffer([v & 0xff]),
    new Buffer([this.depth]),
    this.parentFingerprint,
    new Buffer([this.childIndex >>> 24]),
    new Buffer([(this.childIndex >>> 16) & 0xff]),
    new Buffer([(this.childIndex >>> 8) & 0xff]),
    new Buffer([this.childIndex & 0xff]),
    this.chainCode,
    this.eckey.public
  ]);
}

HierarchicalKey.prototype.extendedPublicKeyString = function(format) {
  if (format === undefined || format === 'base58') {
    var hash = coinUtil.sha256(coinUtil.sha256(this.extendedPublicKey));
    var checksum = hash.slice(0, 4);
    var data = Buffer.concat([this.extendedPublicKey, checksum]);
    return base58.encode(data);
  } else if (format === 'hex') {
    return this.extendedPublicKey.toString('hex');;
  } else {
    throw new Error('bad format');
  }
}

HierarchicalKey.prototype.buildExtendedPrivateKey = function() {
  if (!this.hasPrivateKey) return;
  this.extendedPrivateKey = new Buffer([]);

  var v = this.version;

  this.extendedPrivateKey = Buffer.concat([
    new Buffer([v >> 24]),
    new Buffer([(v >> 16) & 0xff]),
    new Buffer([(v >> 8) & 0xff]),
    new Buffer([v & 0xff]),
    new Buffer([this.depth]),
    this.parentFingerprint,
    new Buffer([this.childIndex >>> 24]),
    new Buffer([(this.childIndex >>> 16) & 0xff]),
    new Buffer([(this.childIndex >>> 8) & 0xff]),
    new Buffer([this.childIndex & 0xff]),
    this.chainCode,
    new Buffer([0]),
    this.eckey.private
  ]);
}

HierarchicalKey.prototype.extendedPrivateKeyString = function(format) {
  if (format === undefined || format === 'base58') {
    var hash = coinUtil.sha256(coinUtil.sha256(this.extendedPrivateKey));
    var checksum = hash.slice(0, 4);
    var data = Buffer.concat([this.extendedPrivateKey, checksum]);
    return base58.encode(data);
  } else if (format === 'hex') {
    return this.extendedPrivateKey.toString('hex');
  } else {
    throw new Error('bad format');
  }
}


HierarchicalKey.prototype.derive = function(path) {
  var e = path.split('/');

  // Special cases:
  if (path == 'm' || path == 'M' || path == 'm\'' || path == 'M\'')
    return this;

  var hkey = this;
  for (var i in e) {
    var c = e[i];

    if (i == 0) {
      if (c != 'm') throw new Error('invalid path');
      continue;
    }

    var usePrivate = (c.length > 1) && (c[c.length - 1] == '\'');
    var childIndex = parseInt(usePrivate ? c.slice(0, c.length - 1) : c) & 0x7fffffff;

    if (usePrivate)
      childIndex += 0x80000000;

    hkey = hkey.deriveChild(childIndex);
  }

  return hkey;
}

HierarchicalKey.prototype.deriveChild = function(i) {
  var ib = [];
  ib.push((i >> 24) & 0xff);
  ib.push((i >> 16) & 0xff);
  ib.push((i >> 8) & 0xff);
  ib.push(i & 0xff);
  ib = new Buffer(ib);

  var usePrivate = (i & 0x80000000) != 0;

  var isPrivate =
    (this.version == networks['livenet'].hkeyPrivateVersion ||
      this.version == networks['testnet'].hkeyPrivateVersion);

  if (usePrivate && (!this.hasPrivateKey || !isPrivate))
    throw new Error('Cannot do private key derivation without private key');

  var ret = null;
  if (this.hasPrivateKey) {
    var data = null;

    if (usePrivate) {
      data = Buffer.concat([new Buffer([0]), this.eckey.private, ib]);
    } else {
      data = Buffer.concat([this.eckey.public, ib]);
    }

    var hash = coinUtil.sha512hmac(data, this.chainCode);
    var il = bignum.fromBuffer(hash.slice(0, 32), {
      size: 32
    });
    var ir = hash.slice(32, 64);

    // ki = IL + kpar (mod n).
    var priv = bignum.fromBuffer(this.eckey.private, {
      size: 32
    });
    var k = il.add(priv).mod(secp256k1_n);

    ret = new HierarchicalKey(null);
    ret.chainCode = ir;

    ret.eckey = new Key();
    ret.eckey.private = k.toBuffer({
      size: 32
    });
    ret.eckey.regenerateSync();
    ret.hasPrivateKey = true;

  } else {
    var data = Buffer.concat([this.eckey.public, ib]);
    var hash = coinUtil.sha512hmac(data, this.chainCode);
    var il = hash.slice(0, 32);
    var ir = hash.slice(32, 64);

    // Ki = (IL + kpar)*G = IL*G + Kpar
    var ilGkey = new Key();
    ilGkey.private = il;
    ilGkey.regenerateSync();
    ilGkey.compressed = false;
    var ilG = Point.fromUncompressedPubKey(ilGkey.public);
    var oldkey = new Key();
    oldkey.public = this.eckey.public;
    oldkey.compressed = false;
    var Kpar = Point.fromUncompressedPubKey(oldkey.public);
    var newpub = Point.add(ilG, Kpar).toUncompressedPubKey();

    ret = new HierarchicalKey(null);
    ret.chainCode = new Buffer(ir);

    var eckey = new Key();
    eckey.public = newpub;
    eckey.compressed = true;
    ret.eckey = eckey;
    ret.hasPrivateKey = false;
  }

  ret.childIndex = i;
  ret.parentFingerprint = this.pubKeyHash.slice(0, 4);
  ret.version = this.version;
  ret.depth = this.depth + 1;

  ret.eckey.compressed = true;
  ret.pubKeyHash = coinUtil.sha256ripe160(ret.eckey.public);

  ret.buildExtendedPublicKey();
  ret.buildExtendedPrivateKey();

  return ret;
}


function uint(f, size) {
  if (f.length < size)
    throw new Error('not enough data');
  var n = 0;
  for (var i = 0; i < size; i++) {
    n *= 256;
    n += f[i];
  }
  return n;
}

function u8(f) {
  return uint(f, 1);
}

function u16(f) {
  return uint(f, 2);
}

function u32(f) {
  return uint(f, 4);
}

function u64(f) {
  return uint(f, 8);
}

module.exports = HierarchicalKey;

}).call(this,require("buffer").Buffer)
},{"../networks":19,"../util":61,"./Base58":7,"./Key":14,"./Point":15,"./SecureRandom":16,"bignum":13,"buffer":31}],11:[function(require,module,exports){
function Opcode(num) {
  this.code = num;
};

Opcode.prototype.toString = function() {
  return Opcode.reverseMap[this.code];
};

Opcode.map = {
  // push value
  OP_FALSE: 0,
  OP_0: 0,
  OP_PUSHDATA1: 76,
  OP_PUSHDATA2: 77,
  OP_PUSHDATA4: 78,
  OP_1NEGATE: 79,
  OP_RESERVED: 80,
  OP_TRUE: 81,
  OP_1: 81,
  OP_2: 82,
  OP_3: 83,
  OP_4: 84,
  OP_5: 85,
  OP_6: 86,
  OP_7: 87,
  OP_8: 88,
  OP_9: 89,
  OP_10: 90,
  OP_11: 91,
  OP_12: 92,
  OP_13: 93,
  OP_14: 94,
  OP_15: 95,
  OP_16: 96,

  // control
  OP_NOP: 97,
  OP_VER: 98,
  OP_IF: 99,
  OP_NOTIF: 100,
  OP_VERIF: 101,
  OP_VERNOTIF: 102,
  OP_ELSE: 103,
  OP_ENDIF: 104,
  OP_VERIFY: 105,
  OP_RETURN: 106,

  // stack ops
  OP_TOALTSTACK: 107,
  OP_FROMALTSTACK: 108,
  OP_2DROP: 109,
  OP_2DUP: 110,
  OP_3DUP: 111,
  OP_2OVER: 112,
  OP_2ROT: 113,
  OP_2SWAP: 114,
  OP_IFDUP: 115,
  OP_DEPTH: 116,
  OP_DROP: 117,
  OP_DUP: 118,
  OP_NIP: 119,
  OP_OVER: 120,
  OP_PICK: 121,
  OP_ROLL: 122,
  OP_ROT: 123,
  OP_SWAP: 124,
  OP_TUCK: 125,

  // splice ops
  OP_CAT: 126,
  OP_SUBSTR: 127,
  OP_LEFT: 128,
  OP_RIGHT: 129,
  OP_SIZE: 130,

  // bit logic
  OP_INVERT: 131,
  OP_AND: 132,
  OP_OR: 133,
  OP_XOR: 134,
  OP_EQUAL: 135,
  OP_EQUALVERIFY: 136,
  OP_RESERVED1: 137,
  OP_RESERVED2: 138,

  // numeric
  OP_1ADD: 139,
  OP_1SUB: 140,
  OP_2MUL: 141,
  OP_2DIV: 142,
  OP_NEGATE: 143,
  OP_ABS: 144,
  OP_NOT: 145,
  OP_0NOTEQUAL: 146,

  OP_ADD: 147,
  OP_SUB: 148,
  OP_MUL: 149,
  OP_DIV: 150,
  OP_MOD: 151,
  OP_LSHIFT: 152,
  OP_RSHIFT: 153,

  OP_BOOLAND: 154,
  OP_BOOLOR: 155,
  OP_NUMEQUAL: 156,
  OP_NUMEQUALVERIFY: 157,
  OP_NUMNOTEQUAL: 158,
  OP_LESSTHAN: 159,
  OP_GREATERTHAN: 160,
  OP_LESSTHANOREQUAL: 161,
  OP_GREATERTHANOREQUAL: 162,
  OP_MIN: 163,
  OP_MAX: 164,

  OP_WITHIN: 165,

  // crypto
  OP_RIPEMD160: 166,
  OP_SHA1: 167,
  OP_SHA256: 168,
  OP_HASH160: 169,
  OP_HASH256: 170,
  OP_CODESEPARATOR: 171,
  OP_CHECKSIG: 172,
  OP_CHECKSIGVERIFY: 173,
  OP_CHECKMULTISIG: 174,
  OP_CHECKMULTISIGVERIFY: 175,

  // expansion
  OP_NOP1: 176,
  OP_NOP2: 177,
  OP_NOP3: 178,
  OP_NOP4: 179,
  OP_NOP5: 180,
  OP_NOP6: 181,
  OP_NOP7: 182,
  OP_NOP8: 183,
  OP_NOP9: 184,
  OP_NOP10: 185,

  // template matching params
  OP_PUBKEYHASH: 253,
  OP_PUBKEY: 254,
  OP_INVALIDOPCODE: 255
};

Opcode.reverseMap = [];

for (var k in Opcode.map) {
  if (Opcode.map.hasOwnProperty(k)) {
    Opcode.reverseMap[Opcode.map[k]] = k.substr(3);
  }
}

Opcode.asList = function() {
  var keys = [];
  for (var prop in Opcode.map) {
    if (Opcode.map.hasOwnProperty(prop)) {
      keys.push(prop);
    }
  }
  return keys;
};

module.exports = (Opcode);

},{}],12:[function(require,module,exports){
(function (Buffer){
var config = require('../config');
var log = require('../util/log');
var Opcode = require('./Opcode');
var buffertools = require('buffertools');
var util = require('../util/util');
var Parser = require('../util/BinaryParser');
var Put = require('bufferput');

var TX_UNKNOWN = 0;
var TX_PUBKEY = 1;
var TX_PUBKEYHASH = 2;
var TX_MULTISIG = 3;
var TX_SCRIPTHASH = 4;

var TX_TYPES = [
  'unknown',
  'pubkey',
  'pubkeyhash',
  'multisig',
  'scripthash'
];

function Script(buffer) {
  if (buffer) {
    this.buffer = buffer;
  } else {
    this.buffer = util.EMPTY_BUFFER;
  }
  this.chunks = [];
  this.parse();
}

Script.TX_UNKNOWN = TX_UNKNOWN;
Script.TX_PUBKEY = TX_PUBKEY;
Script.TX_PUBKEYHASH = TX_PUBKEYHASH;
Script.TX_MULTISIG = TX_MULTISIG;
Script.TX_SCRIPTHASH = TX_SCRIPTHASH;

Script.prototype.parse = function() {
  this.chunks = [];

  var parser = new Parser(this.buffer);
  while (!parser.eof()) {
    var opcode = parser.word8();

    var len, chunk;
    if (opcode > 0 && opcode < Opcode.map.OP_PUSHDATA1) {
      // Read some bytes of data, opcode value is the length of data
      this.chunks.push(parser.buffer(opcode));
    } else if (opcode === Opcode.map.OP_PUSHDATA1) {
      len = parser.word8();
      chunk = parser.buffer(len);
      this.chunks.push(chunk);
    } else if (opcode === Opcode.map.OP_PUSHDATA2) {
      len = parser.word16le();
      chunk = parser.buffer(len);
      this.chunks.push(chunk);
    } else if (opcode === Opcode.map.OP_PUSHDATA4) {
      len = parser.word32le();
      chunk = parser.buffer(len);
      this.chunks.push(chunk);
    } else {
      this.chunks.push(opcode);
    }
  }
};

Script.prototype.isPushOnly = function() {
  for (var i = 0; i < this.chunks.length; i++) {
    var op = this.chunks[i];
    if (!Buffer.isBuffer(op) && op > Opcode.map.OP_16) {
      return false;
    }
  }

  return true;
};

Script.prototype.isP2SH = function() {
  return (this.chunks.length == 3 &&
    this.chunks[0] == Opcode.map.OP_HASH160 &&
    Buffer.isBuffer(this.chunks[1]) &&
    this.chunks[1].length == 20 &&
    this.chunks[2] == Opcode.map.OP_EQUAL);
};

Script.prototype.isPubkey = function() {
  return (this.chunks.length == 2 &&
    Buffer.isBuffer(this.chunks[0]) &&
    this.chunks[1] == Opcode.map.OP_CHECKSIG);
};

Script.prototype.isPubkeyHash = function() {
  return (this.chunks.length == 5 &&
    this.chunks[0] == Opcode.map.OP_DUP &&
    this.chunks[1] == Opcode.map.OP_HASH160 &&
    Buffer.isBuffer(this.chunks[2]) &&
    this.chunks[2].length == 20 &&
    this.chunks[3] == Opcode.map.OP_EQUALVERIFY &&
    this.chunks[4] == Opcode.map.OP_CHECKSIG);
};

function isSmallIntOp(opcode) {
  return ((opcode == Opcode.map.OP_0) ||
    ((opcode >= Opcode.map.OP_1) && (opcode <= Opcode.map.OP_16)));
};

Script.prototype.isMultiSig = function() {
  return (this.chunks.length > 3 &&
    isSmallIntOp(this.chunks[0]) &&
    this.chunks.slice(1, this.chunks.length - 2).every(function(i) {
      return Buffer.isBuffer(i);
    }) &&
    isSmallIntOp(this.chunks[this.chunks.length - 2]) &&
    this.chunks[this.chunks.length - 1] == Opcode.map.OP_CHECKMULTISIG);
};

Script.prototype.isP2shScriptSig = function() {
  if (!isSmallIntOp(this.chunks[0]) || this.chunks[0] !== 0)
    return false;

  var redeemScript = new Script(this.chunks[this.chunks.length - 1]);
  var type = redeemScript.classify();
  return type !== TX_UNKNOWN;
};

Script.prototype.isMultiSigScriptSig = function() {
  if (!isSmallIntOp(this.chunks[0]) || this.chunks[0] !== 0)
    return false;
  return !this.isP2shScriptSig();
};

Script.prototype.countSignatures = function() {
  var ret = 0;
  var l = this.chunks.length;

  // Multisig?
  if (this.isMultiSigScriptSig()) {
    ret = l - 1;
  } else if (this.isP2shScriptSig()) {
    ret = l - 2;
  }
  // p2pubkey or p2pubkeyhash
  else {
    ret = buffertools.compare(this.getBuffer(), util.EMPTY_BUFFER) === 0 ? 0 : 1;
  }
  return ret;
};

Script.prototype.countMissingSignatures = function() {
  if (this.isMultiSig()) {
    log.debug("Can not count missing signatures on normal Multisig script");
    return null;
  }

  var ret = 0;
  var l = this.chunks.length;
  // P2SH?
  if (isSmallIntOp(this.chunks[0]) && this.chunks[0] === 0) {
    var redeemScript = new Script(this.chunks[l - 1]);
    if (!isSmallIntOp(redeemScript.chunks[0])) {
      log.debug("Unrecognized script type");
    } else {
      var nreq = redeemScript.chunks[0] - 80; //see OP_2-OP_16
      ret = nreq - (l - 2); // 2-> marked 0 + redeemScript
    }
  }
  // p2pubkey or p2pubkeyhash
  else {
    if (buffertools.compare(this.getBuffer(), util.EMPTY_BUFFER) === 0) {
      ret = 1;
    }
  }
  return ret;
};

Script.prototype.finishedMultiSig = function() {
  var missing = this.countMissingSignatures();
  if (missing === null) return null;

  return missing === 0;
};

Script.prototype.getMultiSigInfo = function() {
  if (!this.isMultiSig()) {
    throw new Error("Script.getMultiSigInfo(): Not a multiSig script.");
  }

  var nsigs = this.chunks[0] - 80; //see OP_2-OP_16;
  var npubkeys = this.chunks[this.chunks.length - 2] - 80; //see OP_2-OP_16;

  var pubkeys = [];
  for (var i = 1; i < this.chunks.length - 2; i++) {
    pubkeys.push(this.chunks[i]);
  }

  if (pubkeys.length != npubkeys) {
    throw new Error("Script.getMultiSigInfo(): Amount of PKs does not match what the script specifies.");
  }

  return {
    nsigs: nsigs,
    npubkeys: npubkeys,
    pubkeys: pubkeys
  }
};

Script.prototype.prependOp0 = function() {
  var chunks = [0];
  for (i in this.chunks) {
    if (this.chunks.hasOwnProperty(i)) {
      chunks.push(this.chunks[i]);
    }
  }
  this.chunks = chunks;
  this.updateBuffer();
  return this;
};

// is this a script form we know?
Script.prototype.classify = function() {
  if (this.isPubkeyHash())
    return TX_PUBKEYHASH;
  if (this.isP2SH())
    return TX_SCRIPTHASH;
  if (this.isMultiSig())
    return TX_MULTISIG;
  if (this.isPubkey())
    return TX_PUBKEY;
  return TX_UNKNOWN;
};

// extract useful data items from known scripts
Script.prototype.capture = function() {
  var txType = this.classify();
  var res = [];
  switch (txType) {
    case TX_PUBKEY:
      res.push(this.chunks[0]);
      break;
    case TX_PUBKEYHASH:
      res.push(this.chunks[2]);
      break;
    case TX_MULTISIG:
      for (var i = 1; i < (this.chunks.length - 2); i++)
        res.push(this.chunks[i]);
      break;
    case TX_SCRIPTHASH:
      res.push(this.chunks[1]);
      break;

    case TX_UNKNOWN:
    default:
      // do nothing
      break;
  }

  return res;
};

// return first extracted data item from script
Script.prototype.captureOne = function() {
  var arr = this.capture();
  return arr[0];
};

Script.prototype.getOutType = function() {
  var txType = this.classify();
  switch (txType) {
    case TX_PUBKEY:
      return 'Pubkey';
    case TX_PUBKEYHASH:
      return 'Address';
    default:
      return 'Strange';
  }
};

Script.prototype.getRawOutType = function() {
  return TX_TYPES[this.classify()];
};

Script.prototype.simpleOutHash = function() {
  switch (this.getOutType()) {
    case 'Address':
      return this.chunks[2];
    case 'Pubkey':
      return util.sha256ripe160(this.chunks[0]);
    default:
      log.debug("Encountered non-standard scriptPubKey");
      log.debug("Strange script was: " + this.toString());
      return null;
  }
};

Script.prototype.getInType = function() {
  if (this.chunks.length == 1) {
    // Direct IP to IP transactions only have the public key in their scriptSig.
    return 'Pubkey';
  } else if (this.chunks.length == 2 &&
    Buffer.isBuffer(this.chunks[0]) &&
    Buffer.isBuffer(this.chunks[1])) {
    return 'Address';
  } else {
    return 'Strange';
  }
};

Script.prototype.simpleInPubKey = function() {
  switch (this.getInType()) {
    case 'Address':
      return this.chunks[1];
    case 'Pubkey':
      return null;
    default:
      log.debug("Encountered non-standard scriptSig");
      log.debug("Strange script was: " + this.toString());
      return null;
  }
};

Script.prototype.getBuffer = function() {
  return this.buffer;
};

Script.prototype.serialize = Script.prototype.getBuffer;

Script.prototype.getStringContent = function(truncate, maxEl) {
  if (truncate === null) {
    truncate = true;
  }

  if ('undefined' === typeof maxEl) {
    maxEl = 15;
  }

  var s = '';
  for (var i = 0, l = this.chunks.length; i < l; i++) {
    var chunk = this.chunks[i];

    if (i > 0) {
      s += ' ';
    }

    if (Buffer.isBuffer(chunk)) {
      s += '0x' + util.formatBuffer(chunk, truncate ? null : 0);
    } else {
      s += Opcode.reverseMap[chunk];
    }

    if (maxEl && i > maxEl) {
      s += ' ...';
      break;
    }
  }
  return s;
};

Script.prototype.toString = function(truncate, maxEl) {
  var script = "<Script ";
  script += this.getStringContent(truncate, maxEl);
  script += ">";
  return script;
};

Script.prototype.writeOp = function(opcode) {
  var buf = Buffer(this.buffer.length + 1);
  this.buffer.copy(buf);
  buf.writeUInt8(opcode, this.buffer.length);

  this.buffer = buf;

  this.chunks.push(opcode);
};

Script.prototype.writeN = function(n) {
  if (n < 0 || n > 16)
    throw new Error("writeN: out of range value " + n);

  if (n == 0)
    this.writeOp(Opcode.map.OP_0);
  else
    this.writeOp(Opcode.map.OP_1 + n - 1);
};

function prefixSize(data_length) {
  if (data_length < Opcode.map.OP_PUSHDATA1) {
    return 1;
  } else if (data_length <= 0xff) {
    return 1 + 1;
  } else if (data_length <= 0xffff) {
    return 1 + 2;
  } else {
    return 1 + 4;
  }
};

function encodeLen(data_length) {
  var buf = undefined;
  if (data_length < Opcode.map.OP_PUSHDATA1) {
    buf = new Buffer(1);
    buf.writeUInt8(data_length, 0);
  } else if (data_length <= 0xff) {
    buf = new Buffer(1 + 1);
    buf.writeUInt8(Opcode.map.OP_PUSHDATA1, 0);
    buf.writeUInt8(data_length, 1);
  } else if (data_length <= 0xffff) {
    buf = new Buffer(1 + 2);
    buf.writeUInt8(Opcode.map.OP_PUSHDATA2, 0);
    buf.writeUInt16LE(data_length, 1);
  } else {
    buf = new Buffer(1 + 4);
    buf.writeUInt8(Opcode.map.OP_PUSHDATA4, 0);
    buf.writeUInt32LE(data_length, 1);
  }

  return buf;
};

Script.prototype.writeBytes = function(data) {
  var newSize = this.buffer.length + prefixSize(data.length) + data.length;
  this.buffer = Buffer.concat([this.buffer, encodeLen(data.length), data]);
  this.chunks.push(data);
};

Script.prototype.updateBuffer = function() {
  this.buffer = Script.chunksToBuffer(this.chunks);
};

Script.prototype.findAndDelete = function(chunk) {
  var dirty = false;
  if (Buffer.isBuffer(chunk)) {
    for (var i = 0, l = this.chunks.length; i < l; i++) {
      if (Buffer.isBuffer(this.chunks[i]) &&
        buffertools.compare(this.chunks[i], chunk) === 0) {
        this.chunks.splice(i, 1);
        i--;
        dirty = true;
      }
    }
  } else if ("number" === typeof chunk) {
    for (var i = 0, l = this.chunks.length; i < l; i++) {
      if (this.chunks[i] === chunk) {
        this.chunks.splice(i, 1);
        i--;
        dirty = true;
      }
    }
  } else {
    throw new Error("Invalid chunk datatype.");
  }
  if (dirty) {
    this.updateBuffer();
  }
};

/**
 * Creates a simple OP_CHECKSIG with pubkey output script.
 *
 * These are used for coinbase transactions and at some point were used for
 * IP-based transactions as well.
 */
Script.createPubKeyOut = function(pubkey) {
  var script = new Script();
  script.writeBytes(pubkey);
  script.writeOp(Opcode.map.OP_CHECKSIG);
  return script;
};

/**
 * Creates a standard txout script.
 */
Script.createPubKeyHashOut = function(pubKeyHash) {
  var script = new Script();
  script.writeOp(Opcode.map.OP_DUP);
  script.writeOp(Opcode.map.OP_HASH160);
  script.writeBytes(pubKeyHash);
  script.writeOp(Opcode.map.OP_EQUALVERIFY);
  script.writeOp(Opcode.map.OP_CHECKSIG);
  return script;
};

Script._sortKeys = function(keys) {
  return keys.sort(function(buf1, buf2) {
    var len = buf1.length > buf1.length ? buf1.length : buf2.length;
    for (var i = 0; i <= len; i++) {
      if (buf1[i] === undefined)
        return -1; //shorter strings come first
      if (buf2[i] === undefined)
        return 1;
      if (buf1[i] < buf2[i])
        return -1;
      if (buf1[i] > buf2[i])
        return 1;
      else
        continue;
    }
    return 0;
  });
};

Script.createMultisig = function(n_required, inKeys, opts) {
  opts = opts || {};
  var keys = opts.noSorting ? inKeys : this._sortKeys(inKeys);
  var script = new Script();
  script.writeN(n_required);
  keys.forEach(function(key) {
    script.writeBytes(key);
  });
  script.writeN(keys.length);
  script.writeOp(Opcode.map.OP_CHECKMULTISIG);
  return script;
};

Script.createP2SH = function(scriptHash) {
  var script = new Script();
  script.writeOp(Opcode.map.OP_HASH160);
  script.writeBytes(scriptHash);
  script.writeOp(Opcode.map.OP_EQUAL);
  return script;
};

Script.fromTestData = function(testData) {
  testData = testData.map(function(chunk) {
    if ("string" === typeof chunk) {
      return new Buffer(chunk, 'hex');
    } else {
      return chunk;
    }
  });

  var script = new Script();
  script.chunks = testData;
  script.updateBuffer();
  return script;
};

Script.fromChunks = function(chunks) {
  var script = new Script();
  script.chunks = chunks;
  script.updateBuffer();
  return script;
};

Script.fromHumanReadable = function(s) {
  return new Script(Script.stringToBuffer(s));
};

Script.prototype.toHumanReadable = function() {
  var s = '';
  for (var i = 0, l = this.chunks.length; i < l; i++) {
    var chunk = this.chunks[i];

    if (i > 0) {
      s += ' ';
    }

    if (Buffer.isBuffer(chunk)) {
      if (chunk.length === 0) {
        s += '0';
      } else {
        s += '0x' + util.formatBuffer(encodeLen(chunk.length), 0) + ' ';
        s += '0x' + util.formatBuffer(chunk, 0);
      }
    } else {
      var opcode = Opcode.reverseMap[chunk];
      if (typeof opcode === 'undefined') {
        opcode = '0x' + chunk.toString(16);
      }
      s += opcode;
    }
  }
  return s;
};

Script.stringToBuffer = function(s) {
  var buf = new Put();
  var split = s.split(' ');
  for (var i = 0; i < split.length; i++) {
    var word = split[i];
    if (word === '') continue;
    if (word.length > 2 && word.substring(0, 2) === '0x') {
      // raw hex value
      //console.log('hex value');
      buf.put(new Buffer(word.substring(2, word.length), 'hex'));
    } else {
      var opcode = Opcode.map['OP_' + word] || Opcode.map[word];
      if (typeof opcode !== 'undefined') {
        // op code in string form
        //console.log('opcode');
        buf.word8(opcode);
      } else {
        var integer = parseInt(word);
        if (!isNaN(integer)) {
          // integer
          //console.log('integer');
          var data = util.intToBufferSM(integer);
          buf.put(Script.chunksToBuffer([data]));
        } else if (word[0] === '\'' && word[word.length - 1] === '\'') {
          // string
          //console.log('string');
          word = word.substring(1, word.length - 1);
          buf.put(Script.chunksToBuffer([new Buffer(word)]));
        } else {
          throw new Error('Could not parse word "' + word + '" from script "' + s + '"');
        }
      }
    }
  }
  return buf.buffer();
};

Script.chunksToBuffer = function(chunks) {
  var buf = new Put();

  for (var i = 0, l = chunks.length; i < l; i++) {
    var data = chunks[i];
    if (Buffer.isBuffer(data)) {
      if (data.length < Opcode.map.OP_PUSHDATA1) {
        buf.word8(data.length);
      } else if (data.length <= 0xff) {
        buf.word8(Opcode.map.OP_PUSHDATA1);
        buf.word8(data.length);
      } else if (data.length <= 0xffff) {
        buf.word8(Opcode.map.OP_PUSHDATA2);
        buf.word16le(data.length);
      } else {
        buf.word8(Opcode.map.OP_PUSHDATA4);
        buf.word32le(data.length);
      }
      buf.put(data);
    } else if ("number" === typeof data) {
      buf.word8(data);
    } else {
      throw new Error("Script.chunksToBuffer(): Invalid chunk datatype");
    }
  }
  return buf.buffer();
};



module.exports = (Script);

}).call(this,require("buffer").Buffer)
},{"../config":4,"../util/BinaryParser":58,"../util/log":62,"../util/util":63,"./Opcode":11,"buffer":31,"bufferput":"aXRuS6","buffertools":"fugeBw"}],13:[function(require,module,exports){
(function (Buffer){
/* bignumber.js v1.3.0 https://github.com/MikeMcl/bignumber.js/LICENCE */

/*jslint bitwise: true, eqeq: true, plusplus: true, sub: true, white: true, maxerr: 500 */
/*global module */

/*
  bignumber.js v1.3.0
  A JavaScript library for arbitrary-precision arithmetic.
  https://github.com/MikeMcl/bignumber.js
  Copyright (c) 2012 Michael Mclaughlin <M8ch88l@gmail.com>
  MIT Expat Licence
*/

/*********************************** DEFAULTS ************************************/

/*
 * The default values below must be integers within the stated ranges (inclusive).
 * Most of these values can be changed during run-time using BigNumber.config().
 */

/*
 * The limit on the value of DECIMAL_PLACES, TO_EXP_NEG, TO_EXP_POS, MIN_EXP,
 * MAX_EXP, and the argument to toFixed, toPrecision and toExponential, beyond
 * which an exception is thrown (if ERRORS is true).
 */
var MAX = 1E9, // 0 to 1e+9

  // Limit of magnitude of exponent argument to toPower.
  MAX_POWER = 1E6, // 1 to 1e+6

  // The maximum number of decimal places for operations involving division.
  DECIMAL_PLACES = 20, // 0 to MAX

  /*
   * The rounding mode used when rounding to the above decimal places, and when
   * using toFixed, toPrecision and toExponential, and round (default value).
   * UP         0 Away from zero.
   * DOWN       1 Towards zero.
   * CEIL       2 Towards +Infinity.
   * FLOOR      3 Towards -Infinity.
   * HALF_UP    4 Towards nearest neighbour. If equidistant, up.
   * HALF_DOWN  5 Towards nearest neighbour. If equidistant, down.
   * HALF_EVEN  6 Towards nearest neighbour. If equidistant, towards even neighbour.
   * HALF_CEIL  7 Towards nearest neighbour. If equidistant, towards +Infinity.
   * HALF_FLOOR 8 Towards nearest neighbour. If equidistant, towards -Infinity.
   */
  ROUNDING_MODE = 4, // 0 to 8

  // EXPONENTIAL_AT : [TO_EXP_NEG , TO_EXP_POS]

  // The exponent value at and beneath which toString returns exponential notation.
  // Number type: -7
  TO_EXP_NEG = -7, // 0 to -MAX

  // The exponent value at and above which toString returns exponential notation.
  // Number type: 21
  TO_EXP_POS = 21, // 0 to MAX

  // RANGE : [MIN_EXP, MAX_EXP]

  // The minimum exponent value, beneath which underflow to zero occurs.
  // Number type: -324  (5e-324)
  MIN_EXP = -MAX, // -1 to -MAX

  // The maximum exponent value, above which overflow to Infinity occurs.
  // Number type:  308  (1.7976931348623157e+308)
  MAX_EXP = MAX, // 1 to MAX

  // Whether BigNumber Errors are ever thrown.
  // CHANGE parseInt to parseFloat if changing ERRORS to false.
  ERRORS = true, // true or false
  parse = parseInt, // parseInt or parseFloat

  /***********************************************************************************/

  P = BigNumber.prototype,
  DIGITS = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$_',
  outOfRange,
  id = 0,
  isValid = /^-?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i,
  trim = String.prototype.trim || function() {
    return this.replace(/^\s+|\s+$/g, '')
  },
  ONE = BigNumber(1);


// CONSTRUCTOR


/*
 * The exported function.
 * Create and return a new instance of a BigNumber object.
 *
 * n {number|string|BigNumber} A numeric value.
 * [b] {number} The base of n. Integer, 2 to 64 inclusive.
 */
function BigNumber(n, b) {
  var e, i, isNum, digits, valid, orig,
    x = this;

  // Enable constructor usage without new.
  if (!(x instanceof BigNumber)) {
    return new BigNumber(n, b)
  }

  // Duplicate.
  if (n instanceof BigNumber) {
    id = 0;

    // e is undefined.
    if (b !== e) {
      n += ''
    } else {
      x['s'] = n['s'];
      x['e'] = n['e'];
      x['c'] = (n = n['c']) ? n.slice() : n;
      return;
    }
  }

  // Accept empty string as zero
  if (n === '') n = 0;

  // If number, check if minus zero.
  if (typeof n != 'string') {
    n = (isNum = typeof n == 'number' ||
      Object.prototype.toString.call(n) == '[object Number]') &&
      n === 0 && 1 / n < 0 ? '-0' : n + '';
  }

  orig = n;

  if (b === e && isValid.test(n)) {

    // Determine sign.
    x['s'] = n.charAt(0) == '-' ? (n = n.slice(1), -1) : 1;

    // Either n is not a valid BigNumber or a base has been specified.
  } else {

    // Enable exponential notation to be used with base 10 argument.
    // Ensure return value is rounded to DECIMAL_PLACES as with other bases.
    if (b == 10) {

      return setMode(n, DECIMAL_PLACES, ROUNDING_MODE);
    }

    n = trim.call(n).replace(/^\+(?!-)/, '');

    x['s'] = n.charAt(0) == '-' ? (n = n.replace(/^-(?!-)/, ''), -1) : 1;

    if (b != null) {

      if ((b == (b | 0) || !ERRORS) &&
        !(outOfRange = !(b >= 2 && b < 65))) {

        digits = '[' + DIGITS.slice(0, b = b | 0) + ']+';

        // Before non-decimal number validity test and base conversion
        // remove the `.` from e.g. '1.', and replace e.g. '.1' with '0.1'.
        n = n.replace(/\.$/, '').replace(/^\./, '0.');

        // Any number in exponential form will fail due to the e+/-.
        if (valid = new RegExp(
          '^' + digits + '(?:\\.' + digits + ')?$', b < 37 ? 'i' : '').test(n)) {

          if (isNum) {

            if (n.replace(/^0\.0*|\./, '').length > 15) {

              // 'new BigNumber() number type has more than 15 significant digits: {n}'
              ifExceptionsThrow(orig, 0);
            }

            // Prevent later check for length on converted number.
            isNum = !isNum;
          }
          n = convert(n, 10, b, x['s']);

        } else if (n != 'Infinity' && n != 'NaN') {

          // 'new BigNumber() not a base {b} number: {n}'
          ifExceptionsThrow(orig, 1, b);
          n = 'NaN';
        }
      } else {

        // 'new BigNumber() base not an integer: {b}'
        // 'new BigNumber() base out of range: {b}'
        ifExceptionsThrow(b, 2);

        // Ignore base.
        valid = isValid.test(n);
      }
    } else {
      valid = isValid.test(n);
    }

    if (!valid) {

      // Infinity/NaN
      x['c'] = x['e'] = null;

      // NaN
      if (n != 'Infinity') {

        // No exception on NaN.
        if (n != 'NaN') {

          // 'new BigNumber() not a number: {n}'
          ifExceptionsThrow(orig, 3);
        }
        x['s'] = null;
      }
      id = 0;

      return;
    }
  }

  // Decimal point?
  if ((e = n.indexOf('.')) > -1) {
    n = n.replace('.', '');
  }

  // Exponential form?
  if ((i = n.search(/e/i)) > 0) {

    // Determine exponent.
    if (e < 0) {
      e = i;
    }
    e += +n.slice(i + 1);
    n = n.substring(0, i);

  } else if (e < 0) {

    // Integer.
    e = n.length;
  }

  // Determine leading zeros.
  for (i = 0; n.charAt(i) == '0'; i++) {}

  b = n.length;

  // Disallow numbers with over 15 significant digits if number type.
  if (isNum && b > 15 && n.slice(i).length > 15) {

    // 'new BigNumber() number type has more than 15 significant digits: {n}'
    ifExceptionsThrow(orig, 0);
  }
  id = 0;

  // Overflow?
  if ((e -= i + 1) > MAX_EXP) {

    // Infinity.
    x['c'] = x['e'] = null;

    // Zero or underflow?
  } else if (i == b || e < MIN_EXP) {

    // Zero.
    x['c'] = [x['e'] = 0];
  } else {

    // Determine trailing zeros.
    for (; n.charAt(--b) == '0';) {}

    x['e'] = e;
    x['c'] = [];

    // Convert string to array of digits (without leading and trailing zeros).
    for (e = 0; i <= b; x['c'][e++] = +n.charAt(i++)) {}
  }
}


// CONSTRUCTOR PROPERTIES/METHODS


BigNumber['ROUND_UP'] = 0;
BigNumber['ROUND_DOWN'] = 1;
BigNumber['ROUND_CEIL'] = 2;
BigNumber['ROUND_FLOOR'] = 3;
BigNumber['ROUND_HALF_UP'] = 4;
BigNumber['ROUND_HALF_DOWN'] = 5;
BigNumber['ROUND_HALF_EVEN'] = 6;
BigNumber['ROUND_HALF_CEIL'] = 7;
BigNumber['ROUND_HALF_FLOOR'] = 8;

/*
 * Create an instance from a Buffer
 */
BigNumber['fromBuffer'] = function(buf, opts) {

  if (!opts) opts = {};

  var endian = {
    1: 'big',
    '-1': 'little'
  }[opts.endian] || opts.endian || 'big';

  var size = opts.size === 'auto' ? Math.ceil(buf.length) : (opts.size || 1);

  if (buf.length % size !== 0) {
    throw new RangeError('Buffer length (' + buf.length + ')' + ' must be a multiple of size (' + size + ')');
  }

  var hex = [];
  for (var i = 0; i < buf.length; i += size) {
    var chunk = [];
    for (var j = 0; j < size; j++) {
      chunk.push(buf[
        i + (endian === 'big' ? j : (size - j - 1))
      ]);
    }

    hex.push(chunk
      .map(function(c) {
        return (c < 16 ? '0' : '') + c.toString(16);
      })
      .join('')
    );
  }

  return BigNumber(hex.join(''), 16);

};

/*
 * Configure infrequently-changing library-wide settings.
 *
 * Accept an object or an argument list, with one or many of the following
 * properties or parameters respectively:
 * [ DECIMAL_PLACES [, ROUNDING_MODE [, EXPONENTIAL_AT [, RANGE [, ERRORS ]]]]]
 *
 * E.g.
 * BigNumber.config(20, 4) is equivalent to
 * BigNumber.config({ DECIMAL_PLACES : 20, ROUNDING_MODE : 4 })
 * Ignore properties/parameters set to null or undefined.
 *
 * Return an object with the properties current values.
 */
BigNumber['config'] = function() {
  var v, p,
    i = 0,
    r = {},
    a = arguments,
    o = a[0],
    c = 'config',
    inRange = function(n, lo, hi) {
      return !((outOfRange = n < lo || n > hi) ||
        parse(n) != n && n !== 0);
    },
    has = o && typeof o == 'object' ? function() {
      if (o.hasOwnProperty(p)) return (v = o[p]) != null
    } : function() {
      if (a.length > i) return (v = a[i++]) != null
    };

  // [DECIMAL_PLACES] {number} Integer, 0 to MAX inclusive.
  if (has(p = 'DECIMAL_PLACES')) {

    if (inRange(v, 0, MAX)) {
      DECIMAL_PLACES = v | 0;
    } else {

      // 'config() DECIMAL_PLACES not an integer: {v}'
      // 'config() DECIMAL_PLACES out of range: {v}'
      ifExceptionsThrow(v, p, c);
    }
  }
  r[p] = DECIMAL_PLACES;

  // [ROUNDING_MODE] {number} Integer, 0 to 8 inclusive.
  if (has(p = 'ROUNDING_MODE')) {

    if (inRange(v, 0, 8)) {
      ROUNDING_MODE = v | 0;
    } else {

      // 'config() ROUNDING_MODE not an integer: {v}'
      // 'config() ROUNDING_MODE out of range: {v}'
      ifExceptionsThrow(v, p, c);
    }
  }
  r[p] = ROUNDING_MODE;

  /*
   * [EXPONENTIAL_AT] {number|number[]} Integer, -MAX to MAX inclusive or
   * [ integer -MAX to 0 inclusive, 0 to MAX inclusive ].
   */
  if (has(p = 'EXPONENTIAL_AT')) {

    if (inRange(v, -MAX, MAX)) {
      TO_EXP_NEG = -(TO_EXP_POS = ~~ (v < 0 ? -v : +v));
    } else if (!outOfRange && v && inRange(v[0], -MAX, 0) &&
      inRange(v[1], 0, MAX)) {
      TO_EXP_NEG = ~~v[0];
      TO_EXP_POS = ~~v[1];
    } else {

      // 'config() EXPONENTIAL_AT not an integer or not [integer, integer]: {v}'
      // 'config() EXPONENTIAL_AT out of range or not [negative, positive: {v}'
      ifExceptionsThrow(v, p, c, 1);
    }
  }
  r[p] = [TO_EXP_NEG, TO_EXP_POS];

  /*
   * [RANGE][ {number|number[]} Non-zero integer, -MAX to MAX inclusive or
   * [ integer -MAX to -1 inclusive, integer 1 to MAX inclusive ].
   */
  if (has(p = 'RANGE')) {

    if (inRange(v, -MAX, MAX) && ~~v) {
      MIN_EXP = -(MAX_EXP = ~~ (v < 0 ? -v : +v));
    } else if (!outOfRange && v && inRange(v[0], -MAX, -1) &&
      inRange(v[1], 1, MAX)) {
      MIN_EXP = ~~v[0], MAX_EXP = ~~v[1];
    } else {

      // 'config() RANGE not a non-zero integer or not [integer, integer]: {v}'
      // 'config() RANGE out of range or not [negative, positive: {v}'
      ifExceptionsThrow(v, p, c, 1, 1);
    }
  }
  r[p] = [MIN_EXP, MAX_EXP];

  // [ERRORS] {boolean|number} true, false, 1 or 0.
  if (has(p = 'ERRORS')) {

    if (v === !!v || v === 1 || v === 0) {
      parse = (outOfRange = id = 0, ERRORS = !!v) ? parseInt : parseFloat;
    } else {

      // 'config() ERRORS not a boolean or binary digit: {v}'
      ifExceptionsThrow(v, p, c, 0, 0, 1);
    }
  }
  r[p] = ERRORS;

  return r;
};


// PRIVATE FUNCTIONS


// Assemble error messages. Throw BigNumber Errors.
function ifExceptionsThrow(arg, i, j, isArray, isRange, isErrors) {

  if (ERRORS) {
    var error,
      method = ['new BigNumber', 'cmp', 'div', 'eq', 'gt', 'gte', 'lt',
        'lte', 'minus', 'mod', 'plus', 'times', 'toFr'
      ][id ? id < 0 ? -id : id : 1 / id < 0 ? 1 : 0] + '()',
      message = outOfRange ? ' out of range' : ' not a' +
      (isRange ? ' non-zero' : 'n') + ' integer';

    message = ([
        method + ' number type has more than 15 significant digits',
        method + ' not a base ' + j + ' number',
        method + ' base' + message,
        method + ' not a number'
      ][i] ||
      j + '() ' + i + (isErrors ? ' not a boolean or binary digit' : message + (isArray ? ' or not [' + (outOfRange ? ' negative, positive' : ' integer, integer') + ' ]' : ''))) + ': ' + arg;

    outOfRange = id = 0;
    error = new Error(message);
    error['name'] = 'BigNumber Error';

    throw error;
  }
}


/*
 * Convert a numeric string of baseIn to a numeric string of baseOut.
 */
function convert(nStr, baseOut, baseIn, sign) {
  var e, dvs, dvd, nArr, fracArr, fracBN;

  // Convert string of base bIn to an array of numbers of baseOut.
  // Eg. strToArr('255', 10) where baseOut is 16, returns [15, 15].
  // Eg. strToArr('ff', 16)  where baseOut is 10, returns [2, 5, 5].
  function strToArr(str, bIn) {
    var j,
      i = 0,
      strL = str.length,
      arrL,
      arr = [0];

    for (bIn = bIn || baseIn; i < strL; i++) {

      for (arrL = arr.length, j = 0; j < arrL; arr[j] *= bIn, j++) {}

      for (arr[0] += DIGITS.indexOf(str.charAt(i)), j = 0; j < arr.length; j++) {

        if (arr[j] > baseOut - 1) {

          if (arr[j + 1] == null) {
            arr[j + 1] = 0;
          }
          arr[j + 1] += arr[j] / baseOut ^ 0;
          arr[j] %= baseOut;
        }
      }
    }

    return arr.reverse();
  }

  // Convert array to string.
  // E.g. arrToStr( [9, 10, 11] ) becomes '9ab' (in bases above 11).
  function arrToStr(arr) {
    var i = 0,
      arrL = arr.length,
      str = '';

    for (; i < arrL; str += DIGITS.charAt(arr[i++])) {}

    return str;
  }

  if (baseIn < 37) {
    nStr = nStr.toLowerCase();
  }

  /*
   * If non-integer convert integer part and fraction part separately.
   * Convert the fraction part as if it is an integer than use division to
   * reduce it down again to a value less than one.
   */
  if ((e = nStr.indexOf('.')) > -1) {

    /*
     * Calculate the power to which to raise the base to get the number
     * to divide the fraction part by after it has been converted as an
     * integer to the required base.
     */
    e = nStr.length - e - 1;

    // Use toFixed to avoid possible exponential notation.
    dvs = strToArr(new BigNumber(baseIn)['pow'](e)['toF'](), 10);

    nArr = nStr.split('.');

    // Convert the base of the fraction part (as integer).
    dvd = strToArr(nArr[1]);

    // Convert the base of the integer part.
    nArr = strToArr(nArr[0]);

    // Result will be a BigNumber with a value less than 1.
    fracBN = divide(dvd, dvs, dvd.length - dvs.length, sign, baseOut,
      // Is least significant digit of integer part an odd number?
      nArr[nArr.length - 1] & 1);

    fracArr = fracBN['c'];

    // e can be <= 0  ( if e == 0, fracArr is [0] or [1] ).
    if (e = fracBN['e']) {

      // Append zeros according to the exponent of the result.
      for (; ++e; fracArr.unshift(0)) {}

      // Append the fraction part to the converted integer part.
      nStr = arrToStr(nArr) + '.' + arrToStr(fracArr);

      // fracArr is [1].
      // Fraction digits rounded up, so increment last digit of integer part.
    } else if (fracArr[0]) {

      if (nArr[e = nArr.length - 1] < baseOut - 1) {
        ++nArr[e];
        nStr = arrToStr(nArr);
      } else {
        nStr = new BigNumber(arrToStr(nArr),
          baseOut)['plus'](ONE)['toS'](baseOut);
      }

      // fracArr is [0]. No fraction digits.
    } else {
      nStr = arrToStr(nArr);
    }
  } else {

    // Simple integer. Convert base.
    nStr = arrToStr(strToArr(nStr));
  }

  return nStr;
}


// Perform division in the specified base. Called by div and convert.
function divide(dvd, dvs, exp, s, base, isOdd) {
  var dvsL, dvsT, next, cmp, remI,
    dvsZ = dvs.slice(),
    dvdI = dvsL = dvs.length,
    dvdL = dvd.length,
    rem = dvd.slice(0, dvsL),
    remL = rem.length,
    quo = new BigNumber(ONE),
    qc = quo['c'] = [],
    qi = 0,
    dig = DECIMAL_PLACES + (quo['e'] = exp) + 1;

  quo['s'] = s;
  s = dig < 0 ? 0 : dig;

  // Add zeros to make remainder as long as divisor.
  for (; remL++ < dvsL; rem.push(0)) {}

  // Create version of divisor with leading zero.
  dvsZ.unshift(0);

  do {

    // 'next' is how many times the divisor goes into the current remainder.
    for (next = 0; next < base; next++) {

      // Compare divisor and remainder.
      if (dvsL != (remL = rem.length)) {
        cmp = dvsL > remL ? 1 : -1;
      } else {
        for (remI = -1, cmp = 0; ++remI < dvsL;) {

          if (dvs[remI] != rem[remI]) {
            cmp = dvs[remI] > rem[remI] ? 1 : -1;
            break;
          }
        }
      }

      // Subtract divisor from remainder (if divisor < remainder).
      if (cmp < 0) {

        // Remainder cannot be more than one digit longer than divisor.
        // Equalise lengths using divisor with extra leading zero?
        for (dvsT = remL == dvsL ? dvs : dvsZ; remL;) {

          if (rem[--remL] < dvsT[remL]) {

            for (remI = remL; remI && !rem[--remI]; rem[remI] = base - 1) {}
            --rem[remI];
            rem[remL] += base;
          }
          rem[remL] -= dvsT[remL];
        }
        for (; !rem[0]; rem.shift()) {}
      } else {
        break;
      }
    }

    // Add the 'next' digit to the result array.
    qc[qi++] = cmp ? next : ++next;

    // Update the remainder.
    rem[0] && cmp ? (rem[remL] = dvd[dvdI] || 0) : (rem = [dvd[dvdI]]);

  } while ((dvdI++ < dvdL || rem[0] != null) && s--);

  // Leading zero? Do not remove if result is simply zero (qi == 1).
  if (!qc[0] && qi != 1) {

    // There can't be more than one zero.
    --quo['e'];
    qc.shift();
  }

  // Round?
  if (qi > dig) {
    rnd(quo, DECIMAL_PLACES, base, isOdd, rem[0] != null);
  }

  // Overflow?
  if (quo['e'] > MAX_EXP) {

    // Infinity.
    quo['c'] = quo['e'] = null;

    // Underflow?
  } else if (quo['e'] < MIN_EXP) {

    // Zero.
    quo['c'] = [quo['e'] = 0];
  }

  return quo;
}


/*
 * Return a string representing the value of BigNumber n in normal or
 * exponential notation rounded to the specified decimal places or
 * significant digits.
 * Called by toString, toExponential (exp 1), toFixed, and toPrecision (exp 2).
 * d is the index (with the value in normal notation) of the digit that may be
 * rounded up.
 */
function format(n, d, exp) {

  // Initially, i is the number of decimal places required.
  var i = d - (n = new BigNumber(n))['e'],
    c = n['c'];

  // +-Infinity or NaN?
  if (!c) {
    return n['toS']();
  }

  // Round?
  if (c.length > ++d) {
    rnd(n, i, 10);
  }

  // Recalculate d if toFixed as n['e'] may have changed if value rounded up.
  i = c[0] == 0 ? i + 1 : exp ? d : n['e'] + i + 1;

  // Append zeros?
  for (; c.length < i; c.push(0)) {}
  i = n['e'];

  /*
   * toPrecision returns exponential notation if the number of significant
   * digits specified is less than the number of digits necessary to
   * represent the integer part of the value in normal notation.
   */
  return exp == 1 || exp == 2 && (--d < i || i <= TO_EXP_NEG)

  // Exponential notation.
  ? (n['s'] < 0 && c[0] ? '-' : '') + (c.length > 1 ? (c.splice(1, 0, '.'), c.join('')) : c[0]) + (i < 0 ? 'e' : 'e+') + i

  // Normal notation.
  : n['toS']();
}


// Round if necessary.
// Called by divide, format, setMode and sqrt.
function rnd(x, dp, base, isOdd, r) {
  var xc = x['c'],
    isNeg = x['s'] < 0,
    half = base / 2,
    i = x['e'] + dp + 1,

    // 'next' is the digit after the digit that may be rounded up.
    next = xc[i],

    /*
     * 'more' is whether there are digits after 'next'.
     * E.g.
     * 0.005 (e = -3) to be rounded to 0 decimal places (dp = 0) gives i = -2
     * The 'next' digit is zero, and there ARE 'more' digits after it.
     * 0.5 (e = -1) dp = 0 gives i = 0
     * The 'next' digit is 5 and there are no 'more' digits after it.
     */
    more = r || i < 0 || xc[i + 1] != null;

  r = ROUNDING_MODE < 4 ? (next != null || more) &&
    (ROUNDING_MODE == 0 ||
    ROUNDING_MODE == 2 && !isNeg ||
    ROUNDING_MODE == 3 && isNeg) : next > half || next == half &&
    (ROUNDING_MODE == 4 || more ||

    /*
     * isOdd is used in base conversion and refers to the least significant
     * digit of the integer part of the value to be converted. The fraction
     * part is rounded by this method separately from the integer part.
     */
    ROUNDING_MODE == 6 && (xc[i - 1] & 1 || !dp && isOdd) ||
    ROUNDING_MODE == 7 && !isNeg ||
    ROUNDING_MODE == 8 && isNeg);

  if (i < 1 || !xc[0]) {
    xc.length = 0;
    xc.push(0);

    if (r) {

      // 1, 0.1, 0.01, 0.001, 0.0001 etc.
      xc[0] = 1;
      x['e'] = -dp;
    } else {

      // Zero.
      x['e'] = 0;
    }

    return x;
  }

  // Remove any digits after the required decimal places.
  xc.length = i--;

  // Round up?
  if (r) {

    // Rounding up may mean the previous digit has to be rounded up and so on.
    for (--base; ++xc[i] > base;) {
      xc[i] = 0;

      if (!i--) {
        ++x['e'];
        xc.unshift(1);
      }
    }
  }

  // Remove trailing zeros.
  for (i = xc.length; !xc[--i]; xc.pop()) {}

  return x;
}


// Round after setting the appropriate rounding mode.
// Handles ceil, floor and round.
function setMode(x, dp, rm) {
  var r = ROUNDING_MODE;

  ROUNDING_MODE = rm;
  x = new BigNumber(x);
  x['c'] && rnd(x, dp, 10);
  ROUNDING_MODE = r;

  return x;
}


// PROTOTYPE/INSTANCE METHODS


/*
 * Return a new BigNumber whose value is the absolute value of this BigNumber.
 */
P['abs'] = P['absoluteValue'] = function() {
  var x = new BigNumber(this);

  if (x['s'] < 0) {
    x['s'] = 1;
  }

  return x;
};

/*
 * Return the bit length of the number.
 */
P['bitLength'] = function() {
  return this.toString(2).length;
};


/*
 * Return a new BigNumber whose value is the value of this BigNumber
 * rounded to a whole number in the direction of Infinity.
 */
P['ceil'] = function() {
  return setMode(this, 0, 2);
};


/*
 * Return
 * 1 if the value of this BigNumber is greater than the value of BigNumber(y, b),
 * -1 if the value of this BigNumber is less than the value of BigNumber(y, b),
 * 0 if they have the same value,
 * or null if the value of either is NaN.
 */
P['comparedTo'] = P['cmp'] = function(y, b) {
  var a,
    x = this,
    xc = x['c'],
    yc = (id = -id, y = new BigNumber(y, b))['c'],
    i = x['s'],
    j = y['s'],
    k = x['e'],
    l = y['e'];

  // Either NaN?
  if (!i || !j) {
    return null;
  }

  a = xc && !xc[0], b = yc && !yc[0];

  // Either zero?
  if (a || b) {
    return a ? b ? 0 : -j : i;
  }

  // Signs differ?
  if (i != j) {
    return i;
  }

  // Either Infinity?
  if (a = i < 0, b = k == l, !xc || !yc) {
    return b ? 0 : !xc ^ a ? 1 : -1;
  }

  // Compare exponents.
  if (!b) {
    return k > l ^ a ? 1 : -1;
  }

  // Compare digit by digit.
  for (i = -1,
    j = (k = xc.length) < (l = yc.length) ? k : l;
    ++i < j;) {

    if (xc[i] != yc[i]) {
      return xc[i] > yc[i] ^ a ? 1 : -1;
    }
  }
  // Compare lengths.
  return k == l ? 0 : k > l ^ a ? 1 : -1;
};


/*
 *  n / 0 = I
 *  n / N = N
 *  n / I = 0
 *  0 / n = 0
 *  0 / 0 = N
 *  0 / N = N
 *  0 / I = 0
 *  N / n = N
 *  N / 0 = N
 *  N / N = N
 *  N / I = N
 *  I / n = I
 *  I / 0 = I
 *  I / N = N
 *  I / I = N
 *
 * Return a new BigNumber whose value is the value of this BigNumber
 * divided by the value of BigNumber(y, b), rounded according to
 * DECIMAL_PLACES and ROUNDING_MODE.
 */
P['dividedBy'] = P['div'] = function(y, b) {
  var xc = this['c'],
    xe = this['e'],
    xs = this['s'],
    yc = (id = 2, y = new BigNumber(y, b))['c'],
    ye = y['e'],
    ys = y['s'],
    s = xs == ys ? 1 : -1;

  // Either NaN/Infinity/0?
  return !xe && (!xc || !xc[0]) || !ye && (!yc || !yc[0])

  // Either NaN?
  ? new BigNumber(!xs || !ys ||

    // Both 0 or both Infinity?
    (xc ? yc && xc[0] == yc[0] : !yc)

    // Return NaN.
    ? NaN

    // x is 0 or y is Infinity?
    : xc && xc[0] == 0 || !yc

    // Return +-0.
    ? s * 0

    // y is 0. Return +-Infinity.
    : s / 0)

  : divide(xc, yc, xe - ye, s, 10);
};


/*
 * Return true if the value of this BigNumber is equal to the value of
 * BigNumber(n, b), otherwise returns false.
 */
P['equals'] = P['eq'] = function(n, b) {
  id = 3;
  return this['cmp'](n, b) === 0;
};


/*
 * Return a new BigNumber whose value is the value of this BigNumber
 * rounded to a whole number in the direction of -Infinity.
 */
P['floor'] = function() {
  return setMode(this, 0, 3);
};


/*
 * Return true if the value of this BigNumber is greater than the value of
 * BigNumber(n, b), otherwise returns false.
 */
P['greaterThan'] = P['gt'] = function(n, b) {
  id = 4;
  return this['cmp'](n, b) > 0;
};


/*
 * Return true if the value of this BigNumber is greater than or equal to
 * the value of BigNumber(n, b), otherwise returns false.
 */
P['greaterThanOrEqualTo'] = P['gte'] = function(n, b) {
  id = 5;
  return (b = this['cmp'](n, b)) == 1 || b === 0;
};


/*
 * Return true if the value of this BigNumber is a finite number, otherwise
 * returns false.
 */
P['isFinite'] = P['isF'] = function() {
  return !!this['c'];
};


/*
 * Return true if the value of this BigNumber is NaN, otherwise returns
 * false.
 */
P['isNaN'] = function() {
  return !this['s'];
};


/*
 * Return true if the value of this BigNumber is negative, otherwise
 * returns false.
 */
P['isNegative'] = P['isNeg'] = function() {
  return this['s'] < 0;
};


/*
 * Return true if the value of this BigNumber is 0 or -0, otherwise returns
 * false.
 */
P['isZero'] = P['isZ'] = function() {
  return !!this['c'] && this['c'][0] == 0;
};


/*
 * Return true if the value of this BigNumber is less than the value of
 * BigNumber(n, b), otherwise returns false.
 */
P['lessThan'] = P['lt'] = function(n, b) {
  id = 6;
  return this['cmp'](n, b) < 0;
};


/*
 * Return true if the value of this BigNumber is less than or equal to the
 * value of BigNumber(n, b), otherwise returns false.
 */
P['lessThanOrEqualTo'] = P['lte'] = P['le'] = function(n, b) {
  id = 7;
  return (b = this['cmp'](n, b)) == -1 || b === 0;
};


/*
 *  n - 0 = n
 *  n - N = N
 *  n - I = -I
 *  0 - n = -n
 *  0 - 0 = 0
 *  0 - N = N
 *  0 - I = -I
 *  N - n = N
 *  N - 0 = N
 *  N - N = N
 *  N - I = N
 *  I - n = I
 *  I - 0 = I
 *  I - N = N
 *  I - I = N
 *
 * Return a new BigNumber whose value is the value of this BigNumber minus
 * the value of BigNumber(y, b).
 */
P['minus'] = P['sub'] = function(y, b) {
  var d, i, j, xLTy,
    x = this,
    a = x['s'];

  b = (id = 8, y = new BigNumber(y, b))['s'];

  // Either NaN?
  if (!a || !b) {
    return new BigNumber(NaN);
  }

  // Signs differ?
  if (a != b) {
    return y['s'] = -b, x['plus'](y);
  }

  var xc = x['c'],
    xe = x['e'],
    yc = y['c'],
    ye = y['e'];

  if (!xe || !ye) {

    // Either Infinity?
    if (!xc || !yc) {
      return xc ? (y['s'] = -b, y) : new BigNumber(yc ? x : NaN);
    }

    // Either zero?
    if (!xc[0] || !yc[0]) {

      // y is non-zero?
      return yc[0] ? (y['s'] = -b, y)

      // x is non-zero?
      : new BigNumber(xc[0] ? x

        // Both are zero.
        // IEEE 754 (2008) 6.3: n - n = -0 when rounding to -Infinity
        : ROUNDING_MODE == 3 ? -0 : 0);
    }
  }

  // Determine which is the bigger number.
  // Prepend zeros to equalise exponents.
  if (xc = xc.slice(), a = xe - ye) {
    d = (xLTy = a < 0) ? (a = -a, xc) : (ye = xe, yc);

    for (d.reverse(), b = a; b--; d.push(0)) {}
    d.reverse();
  } else {

    // Exponents equal. Check digit by digit.
    j = ((xLTy = xc.length < yc.length) ? xc : yc).length;

    for (a = b = 0; b < j; b++) {

      if (xc[b] != yc[b]) {
        xLTy = xc[b] < yc[b];
        break;
      }
    }
  }

  // x < y? Point xc to the array of the bigger number.
  if (xLTy) {
    d = xc, xc = yc, yc = d;
    y['s'] = -y['s'];
  }

  /*
   * Append zeros to xc if shorter. No need to add zeros to yc if shorter
   * as subtraction only needs to start at yc.length.
   */
  if ((b = -((j = xc.length) - yc.length)) > 0) {

    for (; b--; xc[j++] = 0) {}
  }

  // Subtract yc from xc.
  for (b = yc.length; b > a;) {

    if (xc[--b] < yc[b]) {

      for (i = b; i && !xc[--i]; xc[i] = 9) {}
      --xc[i];
      xc[b] += 10;
    }
    xc[b] -= yc[b];
  }

  // Remove trailing zeros.
  for (; xc[--j] == 0; xc.pop()) {}

  // Remove leading zeros and adjust exponent accordingly.
  for (; xc[0] == 0; xc.shift(), --ye) {}

  /*
   * No need to check for Infinity as +x - +y != Infinity && -x - -y != Infinity
   * when neither x or y are Infinity.
   */

  // Underflow?
  if (ye < MIN_EXP || !xc[0]) {

    /*
     * Following IEEE 754 (2008) 6.3,
     * n - n = +0  but  n - n = -0 when rounding towards -Infinity.
     */
    if (!xc[0]) {
      y['s'] = ROUNDING_MODE == 3 ? -1 : 1;
    }

    // Result is zero.
    xc = [ye = 0];
  }

  return y['c'] = xc, y['e'] = ye, y;
};


/*
 *   n % 0 =  N
 *   n % N =  N
 *   0 % n =  0
 *  -0 % n = -0
 *   0 % 0 =  N
 *   0 % N =  N
 *   N % n =  N
 *   N % 0 =  N
 *   N % N =  N
 *
 * Return a new BigNumber whose value is the value of this BigNumber modulo
 * the value of BigNumber(y, b).
 */
P['modulo'] = P['mod'] = function(y, b) {
  var x = this,
    xc = x['c'],
    yc = (id = 9, y = new BigNumber(y, b))['c'],
    i = x['s'],
    j = y['s'];

  // Is x or y NaN, or y zero?
  b = !i || !j || yc && !yc[0];

  if (b || xc && !xc[0]) {
    return new BigNumber(b ? NaN : x);
  }

  x['s'] = y['s'] = 1;
  b = y['cmp'](x) == 1;
  x['s'] = i, y['s'] = j;

  return b ? new BigNumber(x) : (i = DECIMAL_PLACES, j = ROUNDING_MODE,
    DECIMAL_PLACES = 0, ROUNDING_MODE = 1,
    x = x['div'](y),
    DECIMAL_PLACES = i, ROUNDING_MODE = j,
    this['minus'](x['times'](y)));
};


/*
 * Return a new BigNumber whose value is the value of this BigNumber
 * negated, i.e. multiplied by -1.
 */
P['negated'] = P['neg'] = function() {
  var x = new BigNumber(this);

  return x['s'] = -x['s'] || null, x;
};


/*
 *  n + 0 = n
 *  n + N = N
 *  n + I = I
 *  0 + n = n
 *  0 + 0 = 0
 *  0 + N = N
 *  0 + I = I
 *  N + n = N
 *  N + 0 = N
 *  N + N = N
 *  N + I = N
 *  I + n = I
 *  I + 0 = I
 *  I + N = N
 *  I + I = I
 *
 * Return a new BigNumber whose value is the value of this BigNumber plus
 * the value of BigNumber(y, b).
 */
P['plus'] = P['add'] = function(y, b) {
  var d,
    x = this,
    a = x['s'];

  b = (id = 10, y = new BigNumber(y, b))['s'];

  // Either NaN?
  if (!a || !b) {
    return new BigNumber(NaN);
  }

  // Signs differ?
  if (a != b) {
    return y['s'] = -b, x['minus'](y);
  }

  var xe = x['e'],
    xc = x['c'],
    ye = y['e'],
    yc = y['c'];

  if (!xe || !ye) {

    // Either Infinity?
    if (!xc || !yc) {

      // Return +-Infinity.
      return new BigNumber(a / 0);
    }

    // Either zero?
    if (!xc[0] || !yc[0]) {

      // y is non-zero?
      return yc[0] ? y

      // x is non-zero?
      : new BigNumber(xc[0] ? x

        // Both are zero. Return zero.
        : a * 0);
    }
  }

  // Prepend zeros to equalise exponents.
  // Note: Faster to use reverse then do unshifts.
  if (xc = xc.slice(), a = xe - ye) {
    d = a > 0 ? (ye = xe, yc) : (a = -a, xc);

    for (d.reverse(); a--; d.push(0)) {}
    d.reverse();
  }

  // Point xc to the longer array.
  if (xc.length - yc.length < 0) {
    d = yc, yc = xc, xc = d;
  }

  /*
   * Only start adding at yc.length - 1 as the
   * further digits of xc can be left as they are.
   */
  for (a = yc.length, b = 0; a; b = (xc[--a] = xc[a] + yc[a] + b) / 10 ^ 0, xc[a] %= 10) {}

  // No need to check for zero, as +x + +y != 0 && -x + -y != 0

  if (b) {
    xc.unshift(b);

    // Overflow? (MAX_EXP + 1 possible)
    if (++ye > MAX_EXP) {

      // Infinity.
      xc = ye = null;
    }
  }

  // Remove trailing zeros.
  for (a = xc.length; xc[--a] == 0; xc.pop()) {}

  return y['c'] = xc, y['e'] = ye, y;
};


/*
 * Return a BigNumber whose value is the value of this BigNumber raised to
 * the power e. If e is negative round according to DECIMAL_PLACES and
 * ROUNDING_MODE.
 *
 * e {number} Integer, -MAX_POWER to MAX_POWER inclusive.
 */
P['toPower'] = P['pow'] = function(e) {

  // e to integer, avoiding NaN or Infinity becoming 0.
  var i = e * 0 == 0 ? e | 0 : e,
    x = new BigNumber(this),
    y = new BigNumber(ONE);

  // Use Math.pow?
  // Pass +-Infinity for out of range exponents.
  if ((((outOfRange = e < -MAX_POWER || e > MAX_POWER) &&
        (i = e * 1 / 0)) ||

      /*
       * Any exponent that fails the parse becomes NaN.
       *
       * Include 'e !== 0' because on Opera -0 == parseFloat(-0) is false,
       * despite -0 === parseFloat(-0) && -0 == parseFloat('-0') is true.
       */
      parse(e) != e && e !== 0 && !(i = NaN)) &&

    // 'pow() exponent not an integer: {e}'
    // 'pow() exponent out of range: {e}'
    !ifExceptionsThrow(e, 'exponent', 'pow') ||

    // Pass zero to Math.pow, as any value to the power zero is 1.
    !i) {

    // i is +-Infinity, NaN or 0.
    return new BigNumber(Math.pow(x['toS'](), i));
  }

  for (i = i < 0 ? -i : i;;) {

    if (i & 1) {
      y = y['times'](x);
    }
    i >>= 1;

    if (!i) {
      break;
    }
    x = x['times'](x);
  }

  return e < 0 ? ONE['div'](y) : y;
};


/*
 * Return a BigNumber whose value is the value of this BigNumber raised to
 * the power m modulo n.
 *
 * m {BigNumber} the value to take the power of
 * n {BigNumber} the value to modulo by
 */
P['powm'] = function(m, n) {
  return this.pow(m).mod(n);
};


/*
 * Return a new BigNumber whose value is the value of this BigNumber
 * rounded to a maximum of dp decimal places using rounding mode rm, or to
 * 0 and ROUNDING_MODE respectively if omitted.
 *
 * [dp] {number} Integer, 0 to MAX inclusive.
 * [rm] {number} Integer, 0 to 8 inclusive.
 */
P['round'] = function(dp, rm) {

  dp = dp == null || (((outOfRange = dp < 0 || dp > MAX) ||
      parse(dp) != dp) &&

    // 'round() decimal places out of range: {dp}'
    // 'round() decimal places not an integer: {dp}'
    !ifExceptionsThrow(dp, 'decimal places', 'round')) ? 0 : dp | 0;

  rm = rm == null || (((outOfRange = rm < 0 || rm > 8) ||

      // Include '&& rm !== 0' because with Opera -0 == parseFloat(-0) is false.
      parse(rm) != rm && rm !== 0) &&

    // 'round() mode not an integer: {rm}'
    // 'round() mode out of range: {rm}'
    !ifExceptionsThrow(rm, 'mode', 'round')) ? ROUNDING_MODE : rm | 0;

  return setMode(this, dp, rm);
};


/*
 *  sqrt(-n) =  N
 *  sqrt( N) =  N
 *  sqrt(-I) =  N
 *  sqrt( I) =  I
 *  sqrt( 0) =  0
 *  sqrt(-0) = -0
 *
 * Return a new BigNumber whose value is the square root of the value of
 * this BigNumber, rounded according to DECIMAL_PLACES and ROUNDING_MODE.
 */
P['squareRoot'] = P['sqrt'] = function() {
  var n, r, re, t,
    x = this,
    c = x['c'],
    s = x['s'],
    e = x['e'],
    dp = DECIMAL_PLACES,
    rm = ROUNDING_MODE,
    half = new BigNumber('0.5');

  // Negative/NaN/Infinity/zero?
  if (s !== 1 || !c || !c[0]) {

    return new BigNumber(!s || s < 0 && (!c || c[0]) ? NaN : c ? x : 1 / 0);
  }

  // Initial estimate.
  s = Math.sqrt(x['toS']());
  ROUNDING_MODE = 1;

  /*
      Math.sqrt underflow/overflow?
      Pass x to Math.sqrt as integer, then adjust the exponent of the result.
     */
  if (s == 0 || s == 1 / 0) {
    n = c.join('');

    if (!(n.length + e & 1)) {
      n += '0';
    }
    r = new BigNumber(Math.sqrt(n) + '');

    // r may still not be finite.
    if (!r['c']) {
      r['c'] = [1];
    }
    r['e'] = (((e + 1) / 2) | 0) - (e < 0 || e & 1);
  } else {
    r = new BigNumber(n = s.toString());
  }
  re = r['e'];
  s = re + (DECIMAL_PLACES += 4);

  if (s < 3) {
    s = 0;
  }
  e = s;

  // Newton-Raphson iteration.
  for (;;) {
    t = r;
    r = half['times'](t['plus'](x['div'](t)));

    if (t['c'].slice(0, s).join('') === r['c'].slice(0, s).join('')) {
      c = r['c'];

      /*
              The exponent of r may here be one less than the final result
              exponent (re), e.g 0.0009999 (e-4) --> 0.001 (e-3), so adjust
              s so the rounding digits are indexed correctly.
             */
      s = s - (n && r['e'] < re);

      /*
              The 4th rounding digit may be in error by -1 so if the 4 rounding
              digits are 9999 or 4999 (i.e. approaching a rounding boundary)
              continue the iteration.
             */
      if (c[s] == 9 && c[s - 1] == 9 && c[s - 2] == 9 &&
        (c[s - 3] == 9 || n && c[s - 3] == 4)) {

        /*
                  If 9999 on first run through, check to see if rounding up
                  gives the exact result as the nines may infinitely repeat.
                 */
        if (n && c[s - 3] == 9) {
          t = r['round'](dp, 0);

          if (t['times'](t)['eq'](x)) {
            ROUNDING_MODE = rm;
            DECIMAL_PLACES = dp;

            return t;
          }
        }
        DECIMAL_PLACES += 4;
        s += 4;
        n = '';
      } else {

        /*
                  If the rounding digits are null, 0000 or 5000, check for an
                  exact result. If not, then there are further digits so
                  increment the 1st rounding digit to ensure correct rounding.
                 */
        if (!c[e] && !c[e - 1] && !c[e - 2] &&
          (!c[e - 3] || c[e - 3] == 5)) {

          // Truncate to the first rounding digit.
          if (c.length > e - 2) {
            c.length = e - 2;
          }

          if (!r['times'](r)['eq'](x)) {

            while (c.length < e - 3) {
              c.push(0);
            }
            c[e - 3]++;
          }
        }
        ROUNDING_MODE = rm;
        rnd(r, DECIMAL_PLACES = dp, 10);

        return r;
      }
    }
  }
};


/*
 *  n * 0 = 0
 *  n * N = N
 *  n * I = I
 *  0 * n = 0
 *  0 * 0 = 0
 *  0 * N = N
 *  0 * I = N
 *  N * n = N
 *  N * 0 = N
 *  N * N = N
 *  N * I = N
 *  I * n = I
 *  I * 0 = N
 *  I * N = N
 *  I * I = I
 *
 * Return a new BigNumber whose value is the value of this BigNumber times
 * the value of BigNumber(y, b).
 */
P['times'] = P['mul'] = function(y, b) {
  var c,
    x = this,
    xc = x['c'],
    yc = (id = 11, y = new BigNumber(y, b))['c'],
    i = x['e'],
    j = y['e'],
    a = x['s'];

  y['s'] = a == (b = y['s']) ? 1 : -1;

  // Either NaN/Infinity/0?
  if (!i && (!xc || !xc[0]) || !j && (!yc || !yc[0])) {

    // Either NaN?
    return new BigNumber(!a || !b ||

      // x is 0 and y is Infinity  or  y is 0 and x is Infinity?
      xc && !xc[0] && !yc || yc && !yc[0] && !xc

      // Return NaN.
      ? NaN

      // Either Infinity?
      : !xc || !yc

      // Return +-Infinity.
      ? y['s'] / 0

      // x or y is 0. Return +-0.
      : y['s'] * 0);
  }
  y['e'] = i + j;

  if ((a = xc.length) < (b = yc.length)) {
    c = xc, xc = yc, yc = c, j = a, a = b, b = j;
  }

  for (j = a + b, c = []; j--; c.push(0)) {}

  // Multiply!
  for (i = b - 1; i > -1; i--) {

    for (b = 0, j = a + i; j > i; b = c[j] + yc[i] * xc[j - i - 1] + b,
      c[j--] = b % 10 | 0,
      b = b / 10 | 0) {}

    if (b) {
      c[j] = (c[j] + b) % 10;
    }
  }

  b && ++y['e'];

  // Remove any leading zero.
  !c[0] && c.shift();

  // Remove trailing zeros.
  for (j = c.length; !c[--j]; c.pop()) {}

  // No zero check needed as only x * 0 == 0 etc.

  // Overflow?
  y['c'] = y['e'] > MAX_EXP

  // Infinity.
  ? (y['e'] = null)

  // Underflow?
  : y['e'] < MIN_EXP

  // Zero.
  ? [y['e'] = 0]

  // Neither.
  : c;

  return y;
};

/*
 * Return a buffer containing the
 */
P['toBuffer'] = function(opts) {

  if (typeof opts === 'string') {
    if (opts !== 'mpint') return 'Unsupported Buffer representation';

    var abs = this.abs();
    var buf = abs.toBuffer({
      size: 1,
      endian: 'big'
    });
    var len = buf.length === 1 && buf[0] === 0 ? 0 : buf.length;
    if (buf[0] & 0x80) len++;

    var ret = new Buffer(4 + len);
    if (len > 0) buf.copy(ret, 4 + (buf[0] & 0x80 ? 1 : 0));
    if (buf[0] & 0x80) ret[4] = 0;

    ret[0] = len & (0xff << 24);
    ret[1] = len & (0xff << 16);
    ret[2] = len & (0xff << 8);
    ret[3] = len & (0xff << 0);

    // two's compliment for negative integers:
    var isNeg = this.lt(0);
    if (isNeg) {
      for (var i = 4; i < ret.length; i++) {
        ret[i] = 0xff - ret[i];
      }
    }
    ret[4] = (ret[4] & 0x7f) | (isNeg ? 0x80 : 0);
    if (isNeg) ret[ret.length - 1]++;

    return ret;
  }

  if (!opts) opts = {};

  var endian = {
    1: 'big',
    '-1': 'little'
  }[opts.endian] || opts.endian || 'big';

  var hex = this.toString(16);
  if (hex.charAt(0) === '-') throw new Error(
    'converting negative numbers to Buffers not supported yet'
  );

  var size = opts.size === 'auto' ? Math.ceil(hex.length / 2) : (opts.size || 1);

  var len = Math.ceil(hex.length / (2 * size)) * size;
  var buf = new Buffer(len);

  // zero-pad the hex string so the chunks are all `size` long
  while (hex.length < 2 * len) hex = '0' + hex;

  var hx = hex
    .split(new RegExp('(.{' + (2 * size) + '})'))
    .filter(function(s) {
      return s.length > 0
    });

  hx.forEach(function(chunk, i) {
    for (var j = 0; j < size; j++) {
      var ix = i * size + (endian === 'big' ? j : size - j - 1);
      buf[ix] = parseInt(chunk.slice(j * 2, j * 2 + 2), 16);
    }
  });

  return buf;
};

/*
 * Return a string representing the value of this BigNumber in exponential
 * notation to dp fixed decimal places and rounded using ROUNDING_MODE if
 * necessary.
 *
 * [dp] {number} Integer, 0 to MAX inclusive.
 */
P['toExponential'] = P['toE'] = function(dp) {

  return format(this, (dp == null || ((outOfRange = dp < 0 || dp > MAX) ||

      /*
       * Include '&& dp !== 0' because with Opera -0 == parseFloat(-0) is
       * false, despite -0 == parseFloat('-0') && 0 == -0 being true.
       */
      parse(dp) != dp && dp !== 0) &&

    // 'toE() decimal places not an integer: {dp}'
    // 'toE() decimal places out of range: {dp}'
    !ifExceptionsThrow(dp, 'decimal places', 'toE')) && this['c'] ? this['c'].length - 1 : dp | 0, 1);
};


/*
 * Return a string representing the value of this BigNumber in normal
 * notation to dp fixed decimal places and rounded using ROUNDING_MODE if
 * necessary.
 *
 * Note: as with JavaScript's number type, (-0).toFixed(0) is '0',
 * but e.g. (-0.00001).toFixed(0) is '-0'.
 *
 * [dp] {number} Integer, 0 to MAX inclusive.
 */
P['toFixed'] = P['toF'] = function(dp) {
  var n, str, d,
    x = this;

  if (!(dp == null || ((outOfRange = dp < 0 || dp > MAX) ||
      parse(dp) != dp && dp !== 0) &&

    // 'toF() decimal places not an integer: {dp}'
    // 'toF() decimal places out of range: {dp}'
    !ifExceptionsThrow(dp, 'decimal places', 'toF'))) {
    d = x['e'] + (dp | 0);
  }

  n = TO_EXP_NEG, dp = TO_EXP_POS;
  TO_EXP_NEG = -(TO_EXP_POS = 1 / 0);

  // Note: str is initially undefined.
  if (d == str) {
    str = x['toS']();
  } else {
    str = format(x, d);

    // (-0).toFixed() is '0', but (-0.1).toFixed() is '-0'.
    // (-0).toFixed(1) is '0.0', but (-0.01).toFixed(1) is '-0.0'.
    if (x['s'] < 0 && x['c']) {

      // As e.g. -0 toFixed(3), will wrongly be returned as -0.000 from toString.
      if (!x['c'][0]) {
        str = str.replace(/^-/, '');

        // As e.g. -0.5 if rounded to -0 will cause toString to omit the minus sign.
      } else if (str.indexOf('-') < 0) {
        str = '-' + str;
      }
    }
  }
  TO_EXP_NEG = n, TO_EXP_POS = dp;

  return str;
};


/*
 * Return a string array representing the value of this BigNumber as a
 * simple fraction with an integer numerator and an integer denominator.
 * The denominator will be a positive non-zero value less than or equal to
 * the specified maximum denominator. If a maximum denominator is not
 * specified, the denominator will be the lowest value necessary to
 * represent the number exactly.
 *
 * [maxD] {number|string|BigNumber} Integer >= 1 and < Infinity.
 */
P['toFraction'] = P['toFr'] = function(maxD) {
  var q, frac, n0, d0, d2, n, e,
    n1 = d0 = new BigNumber(ONE),
    d1 = n0 = new BigNumber('0'),
    x = this,
    xc = x['c'],
    exp = MAX_EXP,
    dp = DECIMAL_PLACES,
    rm = ROUNDING_MODE,
    d = new BigNumber(ONE);

  // NaN, Infinity.
  if (!xc) {
    return x['toS']();
  }

  e = d['e'] = xc.length - x['e'] - 1;

  // If max denominator is undefined or null...
  if (maxD == null ||

    // or NaN...
    (!(id = 12, n = new BigNumber(maxD))['s'] ||

      // or less than 1, or Infinity...
      (outOfRange = n['cmp'](n1) < 0 || !n['c']) ||

      // or not an integer...
      (ERRORS && n['e'] < n['c'].length - 1)) &&

    // 'toFr() max denominator not an integer: {maxD}'
    // 'toFr() max denominator out of range: {maxD}'
    !ifExceptionsThrow(maxD, 'max denominator', 'toFr') ||

    // or greater than the maxD needed to specify the value exactly...
    (maxD = n)['cmp'](d) > 0) {

    // d is e.g. 10, 100, 1000, 10000... , n1 is 1.
    maxD = e > 0 ? d : n1;
  }

  MAX_EXP = 1 / 0;
  n = new BigNumber(xc.join(''));

  for (DECIMAL_PLACES = 0, ROUNDING_MODE = 1;;) {
    q = n['div'](d);
    d2 = d0['plus'](q['times'](d1));

    if (d2['cmp'](maxD) == 1) {
      break;
    }

    d0 = d1, d1 = d2;

    n1 = n0['plus'](q['times'](d2 = n1));
    n0 = d2;

    d = n['minus'](q['times'](d2 = d));
    n = d2;
  }

  d2 = maxD['minus'](d0)['div'](d1);
  n0 = n0['plus'](d2['times'](n1));
  d0 = d0['plus'](d2['times'](d1));

  n0['s'] = n1['s'] = x['s'];

  DECIMAL_PLACES = e * 2;
  ROUNDING_MODE = rm;

  // Determine which fraction is closer to x, n0 / d0 or n1 / d1?
  frac = n1['div'](d1)['minus'](x)['abs']()['cmp'](
    n0['div'](d0)['minus'](x)['abs']()) < 1 ? [n1['toS'](), d1['toS']()] : [n0['toS'](), d0['toS']()];

  return MAX_EXP = exp, DECIMAL_PLACES = dp, frac;
};


/*
 * Return a string representing the value of this BigNumber to sd significant
 * digits and rounded using ROUNDING_MODE if necessary.
 * If sd is less than the number of digits necessary to represent the integer
 * part of the value in normal notation, then use exponential notation.
 *
 * sd {number} Integer, 1 to MAX inclusive.
 */
P['toPrecision'] = P['toP'] = function(sd) {

  /*
   * ERRORS true: Throw if sd not undefined, null or an integer in range.
   * ERRORS false: Ignore sd if not a number or not in range.
   * Truncate non-integers.
   */
  return sd == null || (((outOfRange = sd < 1 || sd > MAX) ||
      parse(sd) != sd) &&

    // 'toP() precision not an integer: {sd}'
    // 'toP() precision out of range: {sd}'
    !ifExceptionsThrow(sd, 'precision', 'toP')) ? this['toS']() : format(this, --sd | 0, 2);
};


/*
 * Return a string representing the value of this BigNumber in base b, or
 * base 10 if b is omitted. If a base is specified, including base 10,
 * round according to DECIMAL_PLACES and ROUNDING_MODE.
 * If a base is not specified, and this BigNumber has a positive exponent
 * that is equal to or greater than TO_EXP_POS, or a negative exponent equal
 * to or less than TO_EXP_NEG, return exponential notation.
 *
 * [b] {number} Integer, 2 to 64 inclusive.
 */
P['toString'] = P['toS'] = function(b) {
  var u, str, strL,
    x = this,
    xe = x['e'];

  // Infinity or NaN?
  if (xe === null) {
    str = x['s'] ? 'Infinity' : 'NaN';

    // Exponential format?
  } else if (b === u && (xe <= TO_EXP_NEG || xe >= TO_EXP_POS)) {
    return format(x, x['c'].length - 1, 1);
  } else {
    str = x['c'].join('');

    // Negative exponent?
    if (xe < 0) {

      // Prepend zeros.
      for (; ++xe; str = '0' + str) {}
      str = '0.' + str;

      // Positive exponent?
    } else if (strL = str.length, xe > 0) {

      if (++xe > strL) {

        // Append zeros.
        for (xe -= strL; xe--; str += '0') {}
      } else if (xe < strL) {
        str = str.slice(0, xe) + '.' + str.slice(xe);
      }

      // Exponent zero.
    } else {
      if (u = str.charAt(0), strL > 1) {
        str = u + '.' + str.slice(1);

        // Avoid '-0'
      } else if (u == '0') {
        return u;
      }
    }

    if (b != null) {

      if (!(outOfRange = !(b >= 2 && b < 65)) &&
        (b == (b | 0) || !ERRORS)) {
        str = convert(str, b | 0, 10, x['s']);

        // Avoid '-0'
        if (str == '0') {
          return str;
        }
      } else {

        // 'toS() base not an integer: {b}'
        // 'toS() base out of range: {b}'
        ifExceptionsThrow(b, 'base', 'toS');
      }
    }

  }

  return x['s'] < 0 ? '-' + str : str;
};

P['toNumber'] = function() {
  return parseInt(this['toString'](), 10);
};


/*
 * Return as toString, but do not accept a base argument.
 */
P['valueOf'] = function() {
  return this['toS']();
};


// Add aliases for BigDecimal methods.
//P['add'] = P['plus'];
//P['subtract'] = P['minus'];
//P['multiply'] = P['times'];
//P['divide'] = P['div'];
//P['remainder'] = P['mod'];
//P['compareTo'] = P['cmp'];
//P['negate'] = P['neg'];


// EXPORT
BigNumber.config({
  EXPONENTIAL_AT: 9999999,
  DECIMAL_PLACES: 0,
  ROUNDING_MODE: 1
});
module.exports = BigNumber;

}).call(this,require("buffer").Buffer)
},{"buffer":31}],14:[function(require,module,exports){
(function (Buffer){
var ECKey = require('../../browser/vendor-bundle.js').ECKey;
var SecureRandom = require('../SecureRandom');
var Curve = require('../Curve');
var bignum = require('bignum');

var Key = function() {
  this._pub = null;
  this._compressed = true; // default
};

var bufferToArray = Key.bufferToArray = function(buffer) {
  var ret = [];

  var l = buffer.length;
  for (var i = 0; i < l; i++) {
    ret.push(buffer.readUInt8(i));
  }

  return ret;
}

Object.defineProperty(Key.prototype, 'public', {
  set: function(p) {
    if (!Buffer.isBuffer(p)) {
      throw new Error('Arg should be a buffer');
    }
    var type = p[0];
    this._compressed = type !== 0x04;
    this._pub = p;
  },
  get: function() {
    return this._pub;
  }
});

Object.defineProperty(Key.prototype, 'compressed', {
  set: function(c) {
    var oldc = this._compressed;
    this._compressed = !!c;
    if (oldc == this._compressed)
      return;
    var oldp = this._pub;
    if (this._pub) {
      var eckey = new ECKey();
      eckey.setPub(bufferToArray(this.public));
      eckey.setCompressed(this._compressed);
      this._pub = new Buffer(eckey.getPub());
    }
    if (!this._compressed) {
      //bug in eckey
      //oldp.slice(1).copy(this._pub, 1);
    }
  },
  get: function() {
    return this._compressed;
  }
});

Key.generateSync = function() {
  var privbuf;

  while (true) {
    privbuf = SecureRandom.getRandomBuffer(32);
    if ((bignum.fromBuffer(privbuf, {
      size: 32
    })).cmp(Curve.getN()) < 0)
      break;
  }

  var privhex = privbuf.toString('hex');
  var eck = new ECKey(privhex);
  eck.setCompressed(true);
  var pub = eck.getPub();

  ret = new Key();
  ret.private = privbuf;
  ret._compressed = true;
  ret.public = new Buffer(eck.getPub());

  return ret;
};

Key.prototype.regenerateSync = function() {
  if (!this.private) {
    throw new Error('Key does not have a private key set');
  }

  var eck = new ECKey(this.private.toString('hex'));
  eck.setCompressed(this._compressed);
  this._pub = new Buffer(eck.getPub());
  return this;
};

Key.prototype.signSync = function(hash) {
  var getSECCurveByName = require('../../browser/vendor-bundle.js').getSECCurveByName;
  var BigInteger = require('../../browser/vendor-bundle.js').BigInteger;
  var rng = new SecureRandom();
  var ecparams = getSECCurveByName('secp256k1');

  var rng = {};
  rng.nextBytes = function(array) {
    var buf = SecureRandom.getRandomBuffer(array.length);
    var a = bufferToArray(SecureRandom.getRandomBuffer(array.length));
    for (var i in a) {
      array[i] = a[i];
    }
  };

  var getBigRandom = function(limit) {
    return new BigInteger(limit.bitLength(), rng)
      .mod(limit.subtract(BigInteger.ONE))
      .add(BigInteger.ONE);
  };

  var sign = function(hash, priv) {
    var d = priv;
    var n = ecparams.getN();
    var e = BigInteger.fromByteArrayUnsigned(hash);

    do {
      var k = getBigRandom(n);
      var G = ecparams.getG();
      var Q = G.multiply(k);
      var r = Q.getX().toBigInteger().mod(n);
      var s = k.modInverse(n).multiply(e.add(d.multiply(r))).mod(n);
    } while (r.compareTo(BigInteger.ZERO) <= 0 || s.compareTo(BigInteger.ZERO) <= 0);

    return serializeSig(r, s);
  };

  var serializeSig = function(r, s) {
    var rBa = r.toByteArraySigned();
    var sBa = s.toByteArraySigned();

    var sequence = [];
    sequence.push(0x02); // INTEGER
    sequence.push(rBa.length);
    sequence = sequence.concat(rBa);

    sequence.push(0x02); // INTEGER
    sequence.push(sBa.length);
    sequence = sequence.concat(sBa);

    sequence.unshift(sequence.length);
    sequence.unshift(0x30); // SEQUENCE

    return sequence;
  };

  if (!this.private) {
    throw new Error('Key does not have a private key set');
  }

  if (!Buffer.isBuffer(hash) || hash.length !== 32) {
    throw new Error('Arg should be a 32 bytes hash buffer');
  }
  var privhex = this.private.toString('hex');
  var privnum = new BigInteger(privhex, 16);
  var signature = sign(bufferToArray(hash), privnum);

  return new Buffer(signature);
};

Key.prototype.verifySignature = function(hash, sig, callback) {
  try {
    var result = this.verifySignatureSync(hash, sig);
    callback(null, result);
  } catch (e) {
    callback(e);
  }
};

Key.prototype.verifySignatureSync = function(hash, sig) {
  var self = this;

  if (!Buffer.isBuffer(hash) || hash.length !== 32) {
    throw new Error('Arg 1 should be a 32 bytes hash buffer');
  }
  if (!Buffer.isBuffer(sig)) {
    throw new Error('Arg 2 should be a buffer');
  }
  if (!self.public) {
    throw new Error('Key does not have a public key set');
  }

  var eck = new ECKey();
  eck.setPub(bufferToArray(self.public));
  eck.setCompressed(self._compressed);
  var sigA = bufferToArray(sig);
  var ret = eck.verify(bufferToArray(hash), sigA);
  return ret;
};

module.exports = Key;

}).call(this,require("buffer").Buffer)
},{"../../browser/vendor-bundle.js":3,"../Curve":8,"../SecureRandom":16,"bignum":13,"buffer":31}],15:[function(require,module,exports){
(function (Buffer){
"use strict";

var Key = require('./Key');
var bignum = require('bignum');
var assert = require('assert');
var ECPointFp = require('../../browser/vendor-bundle.js').ECPointFp;
var ECFieldElementFp = require('../../browser/vendor-bundle.js').ECFieldElementFp;
var getSECCurveByName = require('../../browser/vendor-bundle.js').getSECCurveByName;
var BigInteger = require('../../browser/vendor-bundle.js').BigInteger;

//a point on the secp256k1 curve
//x and y are bignums
var Point = function(x, y) {
  this.x = x;
  this.y = y;
};

Point.add = function(p1, p2) {
  var ecparams = getSECCurveByName('secp256k1');

  var p1xhex = p1.x.toBuffer({
    size: 32
  }).toString('hex');
  var p1x = new BigInteger(p1xhex, 16);
  var p1yhex = p1.y.toBuffer({
    size: 32
  }).toString('hex');
  var p1y = new BigInteger(p1yhex, 16);
  var p1px = new ECFieldElementFp(ecparams.getCurve().getQ(), p1x);
  var p1py = new ECFieldElementFp(ecparams.getCurve().getQ(), p1y);
  var p1p = new ECPointFp(ecparams.getCurve(), p1px, p1py);

  var p2xhex = p2.x.toBuffer({
    size: 32
  }).toString('hex');
  var p2x = new BigInteger(p2xhex, 16);
  var p2yhex = p2.y.toBuffer({
    size: 32
  }).toString('hex');
  var p2y = new BigInteger(p2yhex, 16);
  var p2px = new ECFieldElementFp(ecparams.getCurve().getQ(), p2x);
  var p2py = new ECFieldElementFp(ecparams.getCurve().getQ(), p2y);
  var p2p = new ECPointFp(ecparams.getCurve(), p2px, p2py);

  var p = p1p.add(p2p);

  var point = new Point();
  var pointxbuf = new Buffer(p.getX().toBigInteger().toByteArrayUnsigned());
  point.x = bignum.fromBuffer(pointxbuf, {
    size: pointxbuf.length
  });
  assert(pointxbuf.length <= 32);
  var pointybuf = new Buffer(p.getY().toBigInteger().toByteArrayUnsigned());
  assert(pointybuf.length <= 32);
  point.y = bignum.fromBuffer(pointybuf, {
    size: pointybuf.length
  });

  return point;
};

Point.multiply = function(p1, x) {
  var x = new BigInteger(x.toString('hex'), 16);

  var ecparams = getSECCurveByName('secp256k1');

  var p1xhex = p1.x.toBuffer({
    size: 32
  }).toString('hex');
  var p1x = new BigInteger(p1xhex, 16);
  var p1yhex = p1.y.toBuffer({
    size: 32
  }).toString('hex');
  var p1y = new BigInteger(p1yhex, 16);
  var p1px = new ECFieldElementFp(ecparams.getCurve().getQ(), p1x);
  var p1py = new ECFieldElementFp(ecparams.getCurve().getQ(), p1y);
  var p1p = new ECPointFp(ecparams.getCurve(), p1px, p1py);

  var p = p1p.multiply(x);

  var point = new Point();
  var pointxbuf = new Buffer(p.getX().toBigInteger().toByteArrayUnsigned());
  point.x = bignum.fromBuffer(pointxbuf, {
    size: pointxbuf.length
  });
  assert(pointxbuf.length <= 32);
  var pointybuf = new Buffer(p.getY().toBigInteger().toByteArrayUnsigned());
  assert(pointybuf.length <= 32);
  point.y = bignum.fromBuffer(pointybuf, {
    size: pointybuf.length
  });

  return point;
};

//convert the public key of a Key into a Point
Point.fromUncompressedPubKey = function(pubkey) {
  var point = new Point();
  point.x = bignum.fromBuffer((new Buffer(pubkey)).slice(1, 33), {
    size: 32
  });
  point.y = bignum.fromBuffer((new Buffer(pubkey)).slice(33, 65), {
    size: 32
  });
  return point;
};

//convert the Point into the Key containing a compressed public key
Point.prototype.toUncompressedPubKey = function() {
  var xbuf = this.x.toBuffer({
    size: 32
  });
  var ybuf = this.y.toBuffer({
    size: 32
  });
  var prefix = new Buffer([0x04]);
  var pub = Buffer.concat([prefix, xbuf, ybuf]);
  return pub;
};

module.exports = (Point);

}).call(this,require("buffer").Buffer)
},{"../../browser/vendor-bundle.js":3,"./Key":14,"assert":28,"bignum":13,"buffer":31}],16:[function(require,module,exports){
(function (Buffer){
var SecureRandom = require('../common/SecureRandom');

SecureRandom.getRandomBuffer = function(size) {
  if (!window.crypto && !window.msCrypto)
    throw new Error('window.crypto not available');

  if (window.crypto && window.crypto.getRandomValues)
    var crypto = window.crypto;
  else if (window.msCrypto && window.msCrypto.getRandomValues) //internet explorer
    var crypto = window.msCrypto;
  else
    throw new Error('window.crypto.getRandomValues not available');

  var bbuf = new Uint8Array(size);
  crypto.getRandomValues(bbuf);
  var buf = new Buffer(bbuf);

  return buf;
};

module.exports = (SecureRandom);

}).call(this,require("buffer").Buffer)
},{"../common/SecureRandom":17,"buffer":31}],17:[function(require,module,exports){
(function (Buffer){
var SecureRandom = function() {};

/* secure random bytes that sometimes throws an error due to lack of entropy */
SecureRandom.getRandomBuffer = function() {};

/* insecure random bytes, but it never fails */
SecureRandom.getPseudoRandomBuffer = function(size) {
  var b32 = 0x100000000;
  var b = new Buffer(size);

  for (var i = 0; i <= size; i++) {
    var j = Math.floor(i / 4);
    var k = i - j * 4;
    if (k == 0) {
      r = Math.random() * b32;
      b[i] = r & 0xff;
    } else {
      b[i] = (r = r >>> 8) & 0xff;
    }
  }

  return b;
};

module.exports = (SecureRandom);

}).call(this,require("buffer").Buffer)
},{"buffer":31}],18:[function(require,module,exports){
"use strict";function l(a){throw a;}var s=void 0,v=!1;var sjcl={cipher:{},hash:{},keyexchange:{},mode:{},misc:{},codec:{},exception:{corrupt:function(a){this.toString=function(){return"CORRUPT: "+this.message};this.message=a},invalid:function(a){this.toString=function(){return"INVALID: "+this.message};this.message=a},bug:function(a){this.toString=function(){return"BUG: "+this.message};this.message=a},notReady:function(a){this.toString=function(){return"NOT READY: "+this.message};this.message=a}}};
"undefined"!==typeof module&&module.exports&&(module.exports=sjcl);
sjcl.cipher.aes=function(a){this.m[0][0][0]||this.q();var b,c,d,e,f=this.m[0][4],g=this.m[1];b=a.length;var h=1;4!==b&&(6!==b&&8!==b)&&l(new sjcl.exception.invalid("invalid aes key size"));this.a=[d=a.slice(0),e=[]];for(a=b;a<4*b+28;a++){c=d[a-1];if(0===a%b||8===b&&4===a%b)c=f[c>>>24]<<24^f[c>>16&255]<<16^f[c>>8&255]<<8^f[c&255],0===a%b&&(c=c<<8^c>>>24^h<<24,h=h<<1^283*(h>>7));d[a]=d[a-b]^c}for(b=0;a;b++,a--)c=d[b&3?a:a-4],e[b]=4>=a||4>b?c:g[0][f[c>>>24]]^g[1][f[c>>16&255]]^g[2][f[c>>8&255]]^g[3][f[c&
255]]};
sjcl.cipher.aes.prototype={encrypt:function(a){return aa(this,a,0)},decrypt:function(a){return aa(this,a,1)},m:[[[],[],[],[],[]],[[],[],[],[],[]]],q:function(){var a=this.m[0],b=this.m[1],c=a[4],d=b[4],e,f,g,h=[],k=[],m,p,n,q;for(e=0;0x100>e;e++)k[(h[e]=e<<1^283*(e>>7))^e]=e;for(f=g=0;!c[f];f^=m||1,g=k[g]||1){n=g^g<<1^g<<2^g<<3^g<<4;n=n>>8^n&255^99;c[f]=n;d[n]=f;p=h[e=h[m=h[f]]];q=0x1010101*p^0x10001*e^0x101*m^0x1010100*f;p=0x101*h[n]^0x1010100*n;for(e=0;4>e;e++)a[e][f]=p=p<<24^p>>>8,b[e][n]=q=q<<24^q>>>8}for(e=
0;5>e;e++)a[e]=a[e].slice(0),b[e]=b[e].slice(0)}};
function aa(a,b,c){4!==b.length&&l(new sjcl.exception.invalid("invalid aes block size"));var d=a.a[c],e=b[0]^d[0],f=b[c?3:1]^d[1],g=b[2]^d[2];b=b[c?1:3]^d[3];var h,k,m,p=d.length/4-2,n,q=4,w=[0,0,0,0];h=a.m[c];a=h[0];var D=h[1],B=h[2],E=h[3],C=h[4];for(n=0;n<p;n++)h=a[e>>>24]^D[f>>16&255]^B[g>>8&255]^E[b&255]^d[q],k=a[f>>>24]^D[g>>16&255]^B[b>>8&255]^E[e&255]^d[q+1],m=a[g>>>24]^D[b>>16&255]^B[e>>8&255]^E[f&255]^d[q+2],b=a[b>>>24]^D[e>>16&255]^B[f>>8&255]^E[g&255]^d[q+3],q+=4,e=h,f=k,g=m;for(n=0;4>
n;n++)w[c?3&-n:n]=C[e>>>24]<<24^C[f>>16&255]<<16^C[g>>8&255]<<8^C[b&255]^d[q++],h=e,e=f,f=g,g=b,b=h;return w}
sjcl.bitArray={bitSlice:function(a,b,c){a=sjcl.bitArray.O(a.slice(b/32),32-(b&31)).slice(1);return c===s?a:sjcl.bitArray.clamp(a,c-b)},extract:function(a,b,c){var d=Math.floor(-b-c&31);return((b+c-1^b)&-32?a[b/32|0]<<32-d^a[b/32+1|0]>>>d:a[b/32|0]>>>d)&(1<<c)-1},concat:function(a,b){if(0===a.length||0===b.length)return a.concat(b);var c=a[a.length-1],d=sjcl.bitArray.getPartial(c);return 32===d?a.concat(b):sjcl.bitArray.O(b,d,c|0,a.slice(0,a.length-1))},bitLength:function(a){var b=a.length;return 0===
b?0:32*(b-1)+sjcl.bitArray.getPartial(a[b-1])},clamp:function(a,b){if(32*a.length<b)return a;a=a.slice(0,Math.ceil(b/32));var c=a.length;b&=31;0<c&&b&&(a[c-1]=sjcl.bitArray.partial(b,a[c-1]&2147483648>>b-1,1));return a},partial:function(a,b,c){return 32===a?b:(c?b|0:b<<32-a)+0x10000000000*a},getPartial:function(a){return Math.round(a/0x10000000000)||32},equal:function(a,b){if(sjcl.bitArray.bitLength(a)!==sjcl.bitArray.bitLength(b))return v;var c=0,d;for(d=0;d<a.length;d++)c|=a[d]^b[d];return 0===
c},O:function(a,b,c,d){var e;e=0;for(d===s&&(d=[]);32<=b;b-=32)d.push(c),c=0;if(0===b)return d.concat(a);for(e=0;e<a.length;e++)d.push(c|a[e]>>>b),c=a[e]<<32-b;e=a.length?a[a.length-1]:0;a=sjcl.bitArray.getPartial(e);d.push(sjcl.bitArray.partial(b+a&31,32<b+a?c:d.pop(),1));return d},t:function(a,b){return[a[0]^b[0],a[1]^b[1],a[2]^b[2],a[3]^b[3]]}};
sjcl.codec.utf8String={fromBits:function(a){var b="",c=sjcl.bitArray.bitLength(a),d,e;for(d=0;d<c/8;d++)0===(d&3)&&(e=a[d/4]),b+=String.fromCharCode(e>>>24),e<<=8;return decodeURIComponent(escape(b))},toBits:function(a){a=unescape(encodeURIComponent(a));var b=[],c,d=0;for(c=0;c<a.length;c++)d=d<<8|a.charCodeAt(c),3===(c&3)&&(b.push(d),d=0);c&3&&b.push(sjcl.bitArray.partial(8*(c&3),d));return b}};
sjcl.codec.hex={fromBits:function(a){var b="",c;for(c=0;c<a.length;c++)b+=((a[c]|0)+0xf00000000000).toString(16).substr(4);return b.substr(0,sjcl.bitArray.bitLength(a)/4)},toBits:function(a){var b,c=[],d;a=a.replace(/\s|0x/g,"");d=a.length;a+="00000000";for(b=0;b<a.length;b+=8)c.push(parseInt(a.substr(b,8),16)^0);return sjcl.bitArray.clamp(c,4*d)}};
sjcl.codec.base64={I:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",fromBits:function(a,b,c){var d="",e=0,f=sjcl.codec.base64.I,g=0,h=sjcl.bitArray.bitLength(a);c&&(f=f.substr(0,62)+"-_");for(c=0;6*d.length<h;)d+=f.charAt((g^a[c]>>>e)>>>26),6>e?(g=a[c]<<6-e,e+=26,c++):(g<<=6,e-=6);for(;d.length&3&&!b;)d+="=";return d},toBits:function(a,b){a=a.replace(/\s|=/g,"");var c=[],d,e=0,f=sjcl.codec.base64.I,g=0,h;b&&(f=f.substr(0,62)+"-_");for(d=0;d<a.length;d++)h=f.indexOf(a.charAt(d)),
0>h&&l(new sjcl.exception.invalid("this isn't base64!")),26<e?(e-=26,c.push(g^h>>>e),g=h<<32-e):(e+=6,g^=h<<32-e);e&56&&c.push(sjcl.bitArray.partial(e&56,g,1));return c}};sjcl.codec.base64url={fromBits:function(a){return sjcl.codec.base64.fromBits(a,1,1)},toBits:function(a){return sjcl.codec.base64.toBits(a,1)}};sjcl.hash.sha256=function(a){this.a[0]||this.q();a?(this.e=a.e.slice(0),this.d=a.d.slice(0),this.c=a.c):this.reset()};sjcl.hash.sha256.hash=function(a){return(new sjcl.hash.sha256).update(a).finalize()};
sjcl.hash.sha256.prototype={blockSize:512,reset:function(){this.e=this.j.slice(0);this.d=[];this.c=0;return this},update:function(a){"string"===typeof a&&(a=sjcl.codec.utf8String.toBits(a));var b,c=this.d=sjcl.bitArray.concat(this.d,a);b=this.c;a=this.c=b+sjcl.bitArray.bitLength(a);for(b=512+b&-512;b<=a;b+=512)this.p(c.splice(0,16));return this},finalize:function(){var a,b=this.d,c=this.e,b=sjcl.bitArray.concat(b,[sjcl.bitArray.partial(1,1)]);for(a=b.length+2;a&15;a++)b.push(0);b.push(Math.floor(this.c/
4294967296));for(b.push(this.c|0);b.length;)this.p(b.splice(0,16));this.reset();return c},j:[],a:[],q:function(){function a(a){return 0x100000000*(a-Math.floor(a))|0}var b=0,c=2,d;a:for(;64>b;c++){for(d=2;d*d<=c;d++)if(0===c%d)continue a;8>b&&(this.j[b]=a(Math.pow(c,0.5)));this.a[b]=a(Math.pow(c,1/3));b++}},p:function(a){var b,c,d=a.slice(0),e=this.e,f=this.a,g=e[0],h=e[1],k=e[2],m=e[3],p=e[4],n=e[5],q=e[6],w=e[7];for(a=0;64>a;a++)16>a?b=d[a]:(b=d[a+1&15],c=d[a+14&15],b=d[a&15]=(b>>>7^b>>>18^b>>>3^
b<<25^b<<14)+(c>>>17^c>>>19^c>>>10^c<<15^c<<13)+d[a&15]+d[a+9&15]|0),b=b+w+(p>>>6^p>>>11^p>>>25^p<<26^p<<21^p<<7)+(q^p&(n^q))+f[a],w=q,q=n,n=p,p=m+b|0,m=k,k=h,h=g,g=b+(h&k^m&(h^k))+(h>>>2^h>>>13^h>>>22^h<<30^h<<19^h<<10)|0;e[0]=e[0]+g|0;e[1]=e[1]+h|0;e[2]=e[2]+k|0;e[3]=e[3]+m|0;e[4]=e[4]+p|0;e[5]=e[5]+n|0;e[6]=e[6]+q|0;e[7]=e[7]+w|0}};sjcl.hash.sha512=function(a){this.a[0]||this.q();a?(this.e=a.e.slice(0),this.d=a.d.slice(0),this.c=a.c):this.reset()};sjcl.hash.sha512.hash=function(a){return(new sjcl.hash.sha512).update(a).finalize()};
sjcl.hash.sha512.prototype={blockSize:1024,reset:function(){this.e=this.j.slice(0);this.d=[];this.c=0;return this},update:function(a){"string"===typeof a&&(a=sjcl.codec.utf8String.toBits(a));var b,c=this.d=sjcl.bitArray.concat(this.d,a);b=this.c;a=this.c=b+sjcl.bitArray.bitLength(a);for(b=1024+b&-1024;b<=a;b+=1024)this.p(c.splice(0,32));return this},finalize:function(){var a,b=this.d,c=this.e,b=sjcl.bitArray.concat(b,[sjcl.bitArray.partial(1,1)]);for(a=b.length+4;a&31;a++)b.push(0);b.push(0);b.push(0);
b.push(Math.floor(this.c/0x100000000));for(b.push(this.c|0);b.length;)this.p(b.splice(0,32));this.reset();return c},j:[],Y:[12372232,13281083,9762859,1914609,15106769,4090911,4308331,8266105],a:[],$:[2666018,15689165,5061423,9034684,4764984,380953,1658779,7176472,197186,7368638,14987916,16757986,8096111,1480369,13046325,6891156,15813330,5187043,9229749,11312229,2818677,10937475,4324308,1135541,6741931,11809296,16458047,15666916,11046850,698149,229999,945776,13774844,2541862,12856045,9810911,11494366,
7844520,15576806,8533307,15795044,4337665,16291729,5553712,15684120,6662416,7413802,12308920,13816008,4303699,9366425,10176680,13195875,4295371,6546291,11712675,15708924,1519456,15772530,6568428,6495784,8568297,13007125,7492395,2515356,12632583,14740254,7262584,1535930,13146278,16321966,1853211,294276,13051027,13221564,1051980,4080310,6651434,14088940,4675607],q:function(){function a(a){return 0x100000000*(a-Math.floor(a))|0}function b(a){return 0x10000000000*(a-Math.floor(a))&255}var c=0,d=2,e;a:for(;80>
c;d++){for(e=2;e*e<=d;e++)if(0===d%e)continue a;8>c&&(this.j[2*c]=a(Math.pow(d,0.5)),this.j[2*c+1]=b(Math.pow(d,0.5))<<24|this.Y[c]);this.a[2*c]=a(Math.pow(d,1/3));this.a[2*c+1]=b(Math.pow(d,1/3))<<24|this.$[c];c++}},p:function(a){var b,c,d=a.slice(0),e=this.e,f=this.a,g=e[0],h=e[1],k=e[2],m=e[3],p=e[4],n=e[5],q=e[6],w=e[7],D=e[8],B=e[9],E=e[10],C=e[11],fa=e[12],O=e[13],ga=e[14],P=e[15],x=g,t=h,H=k,F=m,I=p,G=n,W=q,J=w,y=D,u=B,Q=E,K=C,R=fa,L=O,X=ga,M=P;for(a=0;80>a;a++){if(16>a)b=d[2*a],c=d[2*a+1];
else{c=d[2*(a-15)];var r=d[2*(a-15)+1];b=(r<<31|c>>>1)^(r<<24|c>>>8)^c>>>7;var z=(c<<31|r>>>1)^(c<<24|r>>>8)^(c<<25|r>>>7);c=d[2*(a-2)];var A=d[2*(a-2)+1],r=(A<<13|c>>>19)^(c<<3|A>>>29)^c>>>6,A=(c<<13|A>>>19)^(A<<3|c>>>29)^(c<<26|A>>>6),Y=d[2*(a-7)],Z=d[2*(a-16)],N=d[2*(a-16)+1];c=z+d[2*(a-7)+1];b=b+Y+(c>>>0<z>>>0?1:0);c+=A;b+=r+(c>>>0<A>>>0?1:0);c+=N;b+=Z+(c>>>0<N>>>0?1:0)}d[2*a]=b|=0;d[2*a+1]=c|=0;var Y=y&Q^~y&R,ha=u&K^~u&L,A=x&H^x&I^H&I,la=t&F^t&G^F&G,Z=(t<<4|x>>>28)^(x<<30|t>>>2)^(x<<25|t>>>7),
N=(x<<4|t>>>28)^(t<<30|x>>>2)^(t<<25|x>>>7),ma=f[2*a],ia=f[2*a+1],r=M+((y<<18|u>>>14)^(y<<14|u>>>18)^(u<<23|y>>>9)),z=X+((u<<18|y>>>14)^(u<<14|y>>>18)^(y<<23|u>>>9))+(r>>>0<M>>>0?1:0),r=r+ha,z=z+(Y+(r>>>0<ha>>>0?1:0)),r=r+ia,z=z+(ma+(r>>>0<ia>>>0?1:0)),r=r+c,z=z+(b+(r>>>0<c>>>0?1:0));c=N+la;b=Z+A+(c>>>0<N>>>0?1:0);X=R;M=L;R=Q;L=K;Q=y;K=u;u=J+r|0;y=W+z+(u>>>0<J>>>0?1:0)|0;W=I;J=G;I=H;G=F;H=x;F=t;t=r+c|0;x=z+b+(t>>>0<r>>>0?1:0)|0}h=e[1]=h+t|0;e[0]=g+x+(h>>>0<t>>>0?1:0)|0;m=e[3]=m+F|0;e[2]=k+H+(m>>>
0<F>>>0?1:0)|0;n=e[5]=n+G|0;e[4]=p+I+(n>>>0<G>>>0?1:0)|0;w=e[7]=w+J|0;e[6]=q+W+(w>>>0<J>>>0?1:0)|0;B=e[9]=B+u|0;e[8]=D+y+(B>>>0<u>>>0?1:0)|0;C=e[11]=C+K|0;e[10]=E+Q+(C>>>0<K>>>0?1:0)|0;O=e[13]=O+L|0;e[12]=fa+R+(O>>>0<L>>>0?1:0)|0;P=e[15]=P+M|0;e[14]=ga+X+(P>>>0<M>>>0?1:0)|0}};
sjcl.mode.ccm={name:"ccm",encrypt:function(a,b,c,d,e){var f,g=b.slice(0),h=sjcl.bitArray,k=h.bitLength(c)/8,m=h.bitLength(g)/8;e=e||64;d=d||[];7>k&&l(new sjcl.exception.invalid("ccm: iv must be at least 7 bytes"));for(f=2;4>f&&m>>>8*f;f++);f<15-k&&(f=15-k);c=h.clamp(c,8*(15-f));b=sjcl.mode.ccm.K(a,b,c,d,e,f);g=sjcl.mode.ccm.L(a,g,c,b,e,f);return h.concat(g.data,g.tag)},decrypt:function(a,b,c,d,e){e=e||64;d=d||[];var f=sjcl.bitArray,g=f.bitLength(c)/8,h=f.bitLength(b),k=f.clamp(b,h-e),m=f.bitSlice(b,
h-e),h=(h-e)/8;7>g&&l(new sjcl.exception.invalid("ccm: iv must be at least 7 bytes"));for(b=2;4>b&&h>>>8*b;b++);b<15-g&&(b=15-g);c=f.clamp(c,8*(15-b));k=sjcl.mode.ccm.L(a,k,c,m,e,b);a=sjcl.mode.ccm.K(a,k.data,c,d,e,b);f.equal(k.tag,a)||l(new sjcl.exception.corrupt("ccm: tag doesn't match"));return k.data},K:function(a,b,c,d,e,f){var g=[],h=sjcl.bitArray,k=h.t;e/=8;(e%2||4>e||16<e)&&l(new sjcl.exception.invalid("ccm: invalid tag length"));(0xffffffff<d.length||0xffffffff<b.length)&&l(new sjcl.exception.bug("ccm: can't deal with 4GiB or more data"));
f=[h.partial(8,(d.length?64:0)|e-2<<2|f-1)];f=h.concat(f,c);f[3]|=h.bitLength(b)/8;f=a.encrypt(f);if(d.length){c=h.bitLength(d)/8;65279>=c?g=[h.partial(16,c)]:0xffffffff>=c&&(g=h.concat([h.partial(16,65534)],[c]));g=h.concat(g,d);for(d=0;d<g.length;d+=4)f=a.encrypt(k(f,g.slice(d,d+4).concat([0,0,0])))}for(d=0;d<b.length;d+=4)f=a.encrypt(k(f,b.slice(d,d+4).concat([0,0,0])));return h.clamp(f,8*e)},L:function(a,b,c,d,e,f){var g,h=sjcl.bitArray;g=h.t;var k=b.length,m=h.bitLength(b);c=h.concat([h.partial(8,
f-1)],c).concat([0,0,0]).slice(0,4);d=h.bitSlice(g(d,a.encrypt(c)),0,e);if(!k)return{tag:d,data:[]};for(g=0;g<k;g+=4)c[3]++,e=a.encrypt(c),b[g]^=e[0],b[g+1]^=e[1],b[g+2]^=e[2],b[g+3]^=e[3];return{tag:d,data:h.clamp(b,m)}}};sjcl.beware===s&&(sjcl.beware={});
sjcl.beware["CBC mode is dangerous because it doesn't protect message integrity."]=function(){sjcl.mode.cbc={name:"cbc",encrypt:function(a,b,c,d){d&&d.length&&l(new sjcl.exception.invalid("cbc can't authenticate data"));128!==sjcl.bitArray.bitLength(c)&&l(new sjcl.exception.invalid("cbc iv must be 128 bits"));var e=sjcl.bitArray,f=e.t,g=e.bitLength(b),h=0,k=[];g&7&&l(new sjcl.exception.invalid("pkcs#5 padding only works for multiples of a byte"));for(d=0;h+128<=g;d+=4,h+=128)c=a.encrypt(f(c,b.slice(d,
d+4))),k.splice(d,0,c[0],c[1],c[2],c[3]);g=0x1010101*(16-(g>>3&15));c=a.encrypt(f(c,e.concat(b,[g,g,g,g]).slice(d,d+4)));k.splice(d,0,c[0],c[1],c[2],c[3]);return k},decrypt:function(a,b,c,d){d&&d.length&&l(new sjcl.exception.invalid("cbc can't authenticate data"));128!==sjcl.bitArray.bitLength(c)&&l(new sjcl.exception.invalid("cbc iv must be 128 bits"));(sjcl.bitArray.bitLength(b)&127||!b.length)&&l(new sjcl.exception.corrupt("cbc ciphertext must be a positive multiple of the block size"));var e=sjcl.bitArray,
f=e.t,g,h=[];for(d=0;d<b.length;d+=4)g=b.slice(d,d+4),c=f(c,a.decrypt(g)),h.splice(d,0,c[0],c[1],c[2],c[3]),c=g;g=h[d-1]&255;(0===g||16<g)&&l(new sjcl.exception.corrupt("pkcs#5 padding corrupt"));c=0x1010101*g;e.equal(e.bitSlice([c,c,c,c],0,8*g),e.bitSlice(h,32*h.length-8*g,32*h.length))||l(new sjcl.exception.corrupt("pkcs#5 padding corrupt"));return e.bitSlice(h,0,32*h.length-8*g)}}};
sjcl.misc.hmac=function(a,b){this.M=b=b||sjcl.hash.sha256;var c=[[],[]],d,e=b.prototype.blockSize/32;this.o=[new b,new b];a.length>e&&(a=b.hash(a));for(d=0;d<e;d++)c[0][d]=a[d]^909522486,c[1][d]=a[d]^1549556828;this.o[0].update(c[0]);this.o[1].update(c[1]);this.G=new b(this.o[0])};sjcl.misc.hmac.prototype.encrypt=sjcl.misc.hmac.prototype.mac=function(a){this.P&&l(new sjcl.exception.invalid("encrypt on already updated hmac called!"));this.update(a);return this.digest(a)};
sjcl.misc.hmac.prototype.reset=function(){this.G=new this.M(this.o[0]);this.P=v};sjcl.misc.hmac.prototype.update=function(a){this.P=!0;this.G.update(a)};sjcl.misc.hmac.prototype.digest=function(){var a=this.G.finalize(),a=(new this.M(this.o[1])).update(a).finalize();this.reset();return a};
sjcl.misc.pbkdf2=function(a,b,c,d,e){c=c||1E3;(0>d||0>c)&&l(sjcl.exception.invalid("invalid params to pbkdf2"));"string"===typeof a&&(a=sjcl.codec.utf8String.toBits(a));"string"===typeof b&&(b=sjcl.codec.utf8String.toBits(b));e=e||sjcl.misc.hmac;a=new e(a);var f,g,h,k,m=[],p=sjcl.bitArray;for(k=1;32*m.length<(d||1);k++){e=f=a.encrypt(p.concat(b,[k]));for(g=1;g<c;g++){f=a.encrypt(f);for(h=0;h<f.length;h++)e[h]^=f[h]}m=m.concat(e)}d&&(m=p.clamp(m,d));return m};
sjcl.prng=function(a){this.f=[new sjcl.hash.sha256];this.k=[0];this.F=0;this.s={};this.D=0;this.J={};this.N=this.g=this.l=this.V=0;this.a=[0,0,0,0,0,0,0,0];this.i=[0,0,0,0];this.B=s;this.C=a;this.r=v;this.A={progress:{},seeded:{}};this.n=this.U=0;this.u=1;this.w=2;this.R=0x10000;this.H=[0,48,64,96,128,192,0x100,384,512,768,1024];this.S=3E4;this.Q=80};
sjcl.prng.prototype={randomWords:function(a,b){var c=[],d;d=this.isReady(b);var e;d===this.n&&l(new sjcl.exception.notReady("generator isn't seeded"));if(d&this.w){d=!(d&this.u);e=[];var f=0,g;this.N=e[0]=(new Date).valueOf()+this.S;for(g=0;16>g;g++)e.push(0x100000000*Math.random()|0);for(g=0;g<this.f.length&&!(e=e.concat(this.f[g].finalize()),f+=this.k[g],this.k[g]=0,!d&&this.F&1<<g);g++);this.F>=1<<this.f.length&&(this.f.push(new sjcl.hash.sha256),this.k.push(0));this.g-=f;f>this.l&&(this.l=f);this.F++;
this.a=sjcl.hash.sha256.hash(this.a.concat(e));this.B=new sjcl.cipher.aes(this.a);for(d=0;4>d&&!(this.i[d]=this.i[d]+1|0,this.i[d]);d++);}for(d=0;d<a;d+=4)0===(d+1)%this.R&&ba(this),e=S(this),c.push(e[0],e[1],e[2],e[3]);ba(this);return c.slice(0,a)},setDefaultParanoia:function(a,b){0===a&&"Setting paranoia=0 will ruin your security; use it only for testing"!==b&&l("Setting paranoia=0 will ruin your security; use it only for testing");this.C=a},addEntropy:function(a,b,c){c=c||"user";var d,e,f=(new Date).valueOf(),
g=this.s[c],h=this.isReady(),k=0;d=this.J[c];d===s&&(d=this.J[c]=this.V++);g===s&&(g=this.s[c]=0);this.s[c]=(this.s[c]+1)%this.f.length;switch(typeof a){case "number":b===s&&(b=1);this.f[g].update([d,this.D++,1,b,f,1,a|0]);break;case "object":c=Object.prototype.toString.call(a);if("[object Uint32Array]"===c){e=[];for(c=0;c<a.length;c++)e.push(a[c]);a=e}else{"[object Array]"!==c&&(k=1);for(c=0;c<a.length&&!k;c++)"number"!==typeof a[c]&&(k=1)}if(!k){if(b===s)for(c=b=0;c<a.length;c++)for(e=a[c];0<e;)b++,
e>>>=1;this.f[g].update([d,this.D++,2,b,f,a.length].concat(a))}break;case "string":b===s&&(b=a.length);this.f[g].update([d,this.D++,3,b,f,a.length]);this.f[g].update(a);break;default:k=1}k&&l(new sjcl.exception.bug("random: addEntropy only supports number, array of numbers or string"));this.k[g]+=b;this.g+=b;h===this.n&&(this.isReady()!==this.n&&ca("seeded",Math.max(this.l,this.g)),ca("progress",this.getProgress()))},isReady:function(a){a=this.H[a!==s?a:this.C];return this.l&&this.l>=a?this.k[0]>
this.Q&&(new Date).valueOf()>this.N?this.w|this.u:this.u:this.g>=a?this.w|this.n:this.n},getProgress:function(a){a=this.H[a?a:this.C];return this.l>=a?1:this.g>a?1:this.g/a},startCollectors:function(){this.r||(this.b={loadTimeCollector:T(this,this.aa),mouseCollector:T(this,this.ba),keyboardCollector:T(this,this.Z),accelerometerCollector:T(this,this.T)},window.addEventListener?(window.addEventListener("load",this.b.loadTimeCollector,v),window.addEventListener("mousemove",this.b.mouseCollector,v),window.addEventListener("keypress",
this.b.keyboardCollector,v),window.addEventListener("devicemotion",this.b.accelerometerCollector,v)):document.attachEvent?(document.attachEvent("onload",this.b.loadTimeCollector),document.attachEvent("onmousemove",this.b.mouseCollector),document.attachEvent("keypress",this.b.keyboardCollector)):l(new sjcl.exception.bug("can't attach event")),this.r=!0)},stopCollectors:function(){this.r&&(window.removeEventListener?(window.removeEventListener("load",this.b.loadTimeCollector,v),window.removeEventListener("mousemove",
this.b.mouseCollector,v),window.removeEventListener("keypress",this.b.keyboardCollector,v),window.removeEventListener("devicemotion",this.b.accelerometerCollector,v)):document.detachEvent&&(document.detachEvent("onload",this.b.loadTimeCollector),document.detachEvent("onmousemove",this.b.mouseCollector),document.detachEvent("keypress",this.b.keyboardCollector)),this.r=v)},addEventListener:function(a,b){this.A[a][this.U++]=b},removeEventListener:function(a,b){var c,d,e=this.A[a],f=[];for(d in e)e.hasOwnProperty(d)&&
e[d]===b&&f.push(d);for(c=0;c<f.length;c++)d=f[c],delete e[d]},Z:function(){U(1)},ba:function(a){sjcl.random.addEntropy([a.x||a.clientX||a.offsetX||0,a.y||a.clientY||a.offsetY||0],2,"mouse");U(0)},aa:function(){U(2)},T:function(a){a=a.accelerationIncludingGravity.x||a.accelerationIncludingGravity.y||a.accelerationIncludingGravity.z;if(window.orientation){var b=window.orientation;"number"===typeof b&&sjcl.random.addEntropy(b,1,"accelerometer")}a&&sjcl.random.addEntropy(a,2,"accelerometer");U(0)}};
function ca(a,b){var c,d=sjcl.random.A[a],e=[];for(c in d)d.hasOwnProperty(c)&&e.push(d[c]);for(c=0;c<e.length;c++)e[c](b)}function U(a){window&&window.performance&&"function"===typeof window.performance.now?sjcl.random.addEntropy(window.performance.now(),a,"loadtime"):sjcl.random.addEntropy((new Date).valueOf(),a,"loadtime")}function ba(a){a.a=S(a).concat(S(a));a.B=new sjcl.cipher.aes(a.a)}function S(a){for(var b=0;4>b&&!(a.i[b]=a.i[b]+1|0,a.i[b]);b++);return a.B.encrypt(a.i)}
function T(a,b){return function(){b.apply(a,arguments)}}sjcl.random=new sjcl.prng(6);
a:try{var V,da,$,ea;if(ea="undefined"!==typeof module){var ja;if(ja=module.exports){var ka;try{ka=require("crypto")}catch(na){ka=null}ja=(da=ka)&&da.randomBytes}ea=ja}if(ea)V=da.randomBytes(128),V=new Uint32Array((new Uint8Array(V)).buffer),sjcl.random.addEntropy(V,1024,"crypto['randomBytes']");else if(window&&Uint32Array){$=new Uint32Array(32);if(window.crypto&&window.crypto.getRandomValues)window.crypto.getRandomValues($);else if(window.msCrypto&&window.msCrypto.getRandomValues)window.msCrypto.getRandomValues($);
else break a;sjcl.random.addEntropy($,1024,"crypto['getRandomValues']")}}catch(oa){"undefined"!==typeof window&&window.console&&(console.log("There was an error collecting entropy from the browser:"),console.log(oa))}
sjcl.json={defaults:{v:1,iter:1E3,ks:128,ts:64,mode:"ccm",adata:"",cipher:"aes"},X:function(a,b,c,d){c=c||{};d=d||{};var e=sjcl.json,f=e.h({iv:sjcl.random.randomWords(4,0)},e.defaults),g;e.h(f,c);c=f.adata;"string"===typeof f.salt&&(f.salt=sjcl.codec.base64.toBits(f.salt));"string"===typeof f.iv&&(f.iv=sjcl.codec.base64.toBits(f.iv));(!sjcl.mode[f.mode]||!sjcl.cipher[f.cipher]||"string"===typeof a&&100>=f.iter||64!==f.ts&&96!==f.ts&&128!==f.ts||128!==f.ks&&192!==f.ks&&0x100!==f.ks||2>f.iv.length||4<
f.iv.length)&&l(new sjcl.exception.invalid("json encrypt: invalid parameters"));"string"===typeof a?(g=sjcl.misc.cachedPbkdf2(a,f),a=g.key.slice(0,f.ks/32),f.salt=g.salt):sjcl.ecc&&a instanceof sjcl.ecc.elGamal.publicKey&&(g=a.kem(),f.kemtag=g.tag,a=g.key.slice(0,f.ks/32));"string"===typeof b&&(b=sjcl.codec.utf8String.toBits(b));"string"===typeof c&&(c=sjcl.codec.utf8String.toBits(c));g=new sjcl.cipher[f.cipher](a);e.h(d,f);d.key=a;f.ct=sjcl.mode[f.mode].encrypt(g,b,f.iv,c,f.ts);return f},encrypt:function(a,
b,c,d){var e=sjcl.json,f=e.X.apply(e,arguments);return e.encode(f)},W:function(a,b,c,d){c=c||{};d=d||{};var e=sjcl.json;b=e.h(e.h(e.h({},e.defaults),b),c,!0);var f;c=b.adata;"string"===typeof b.salt&&(b.salt=sjcl.codec.base64.toBits(b.salt));"string"===typeof b.iv&&(b.iv=sjcl.codec.base64.toBits(b.iv));(!sjcl.mode[b.mode]||!sjcl.cipher[b.cipher]||"string"===typeof a&&100>=b.iter||64!==b.ts&&96!==b.ts&&128!==b.ts||128!==b.ks&&192!==b.ks&&0x100!==b.ks||!b.iv||2>b.iv.length||4<b.iv.length)&&l(new sjcl.exception.invalid("json decrypt: invalid parameters"));
"string"===typeof a?(f=sjcl.misc.cachedPbkdf2(a,b),a=f.key.slice(0,b.ks/32),b.salt=f.salt):sjcl.ecc&&a instanceof sjcl.ecc.elGamal.secretKey&&(a=a.unkem(sjcl.codec.base64.toBits(b.kemtag)).slice(0,b.ks/32));"string"===typeof c&&(c=sjcl.codec.utf8String.toBits(c));f=new sjcl.cipher[b.cipher](a);c=sjcl.mode[b.mode].decrypt(f,b.ct,b.iv,c,b.ts);e.h(d,b);d.key=a;return sjcl.codec.utf8String.fromBits(c)},decrypt:function(a,b,c,d){var e=sjcl.json;return e.W(a,e.decode(b),c,d)},encode:function(a){var b,c=
"{",d="";for(b in a)if(a.hasOwnProperty(b))switch(b.match(/^[a-z0-9]+$/i)||l(new sjcl.exception.invalid("json encode: invalid property name")),c+=d+'"'+b+'":',d=",",typeof a[b]){case "number":case "boolean":c+=a[b];break;case "string":c+='"'+escape(a[b])+'"';break;case "object":c+='"'+sjcl.codec.base64.fromBits(a[b],0)+'"';break;default:l(new sjcl.exception.bug("json encode: unsupported type"))}return c+"}"},decode:function(a){a=a.replace(/\s/g,"");a.match(/^\{.*\}$/)||l(new sjcl.exception.invalid("json decode: this isn't json!"));
a=a.replace(/^\{|\}$/g,"").split(/,/);var b={},c,d;for(c=0;c<a.length;c++)(d=a[c].match(/^(?:(["']?)([a-z][a-z0-9]*)\1):(?:(\d+)|"([a-z0-9+\/%*_.@=\-]*)")$/i))||l(new sjcl.exception.invalid("json decode: this isn't json!")),b[d[2]]=d[3]?parseInt(d[3],10):d[2].match(/^(ct|salt|iv)$/)?sjcl.codec.base64.toBits(d[4]):unescape(d[4]);return b},h:function(a,b,c){a===s&&(a={});if(b===s)return a;for(var d in b)b.hasOwnProperty(d)&&(c&&(a[d]!==s&&a[d]!==b[d])&&l(new sjcl.exception.invalid("required parameter overridden")),
a[d]=b[d]);return a},ea:function(a,b){var c={},d;for(d in a)a.hasOwnProperty(d)&&a[d]!==b[d]&&(c[d]=a[d]);return c},da:function(a,b){var c={},d;for(d=0;d<b.length;d++)a[b[d]]!==s&&(c[b[d]]=a[b[d]]);return c}};sjcl.encrypt=sjcl.json.encrypt;sjcl.decrypt=sjcl.json.decrypt;sjcl.misc.ca={};
sjcl.misc.cachedPbkdf2=function(a,b){var c=sjcl.misc.ca,d;b=b||{};d=b.iter||1E3;c=c[a]=c[a]||{};d=c[d]=c[d]||{firstSalt:b.salt&&b.salt.length?b.salt.slice(0):sjcl.random.randomWords(2,0)};c=b.salt===s?d.firstSalt:b.salt;d[c]=d[c]||sjcl.misc.pbkdf2(a,c,b.iter);return{key:d[c].slice(0),salt:c.slice(0)}};

},{"crypto":35}],19:[function(require,module,exports){
(function (Buffer){
var Put = require('bufferput');
var buffertools = require('buffertools');
var hex = function(hex) {
  return new Buffer(hex, 'hex');
};

exports.livenet = {
  name: 'livenet',
  magic: hex('f9beb4d9'),
  addressVersion: 0x00,
  privKeyVersion: 128,
  P2SHVersion: 5,
  hkeyPublicVersion: 0x0488b21e,
  hkeyPrivateVersion: 0x0488ade4,
  genesisBlock: {
    hash: hex('6FE28C0AB6F1B372C1A6A246AE63F74F931E8365E15A089C68D6190000000000'),
    merkle_root: hex('3BA3EDFD7A7B12B27AC72C3E67768F617FC81BC3888A51323A9FB8AA4B1E5E4A'),
    height: 0,
    nonce: 2083236893,
    version: 1,
    prev_hash: buffertools.fill(new Buffer(32), 0),
    timestamp: 1231006505,
    bits: 486604799,
  },
  dnsSeeds: [
    'seed.bitcoin.sipa.be',
    'dnsseed.bluematt.me',
    'dnsseed.bitcoin.dashjr.org',
    'seed.bitcoinstats.com',
    'seed.bitnodes.io',
    'bitseed.xf2.org'
  ],
  defaultClientPort: 8333
};

exports.testnet = {
  name: 'testnet',
  magic: hex('0b110907'),
  addressVersion: 0x6f,
  privKeyVersion: 239,
  P2SHVersion: 196,
  hkeyPublicVersion: 0x043587cf,
  hkeyPrivateVersion: 0x04358394,
  genesisBlock: {
    hash: hex('43497FD7F826957108F4A30FD9CEC3AEBA79972084E90EAD01EA330900000000'),
    merkle_root: hex('3BA3EDFD7A7B12B27AC72C3E67768F617FC81BC3888A51323A9FB8AA4B1E5E4A'),
    height: 0,
    nonce: 414098458,
    version: 1,
    prev_hash: buffertools.fill(new Buffer(32), 0),
    timestamp: 1296688602,
    bits: 486604799,
  },
  dnsSeeds: [
    'testnet-seed.bitcoin.petertodd.org',
    'testnet-seed.bluematt.me'
  ],
  defaultClientPort: 18333
};

}).call(this,require("buffer").Buffer)
},{"buffer":31,"bufferput":"aXRuS6","buffertools":"fugeBw"}],20:[function(require,module,exports){
(function (Buffer){
var Chainsaw = require('chainsaw');
var EventEmitter = require('events').EventEmitter;
var Buffers = require('buffers');
var Vars = require('./lib/vars.js');
var Stream = require('stream').Stream;

exports = module.exports = function (bufOrEm, eventName) {
    if (Buffer.isBuffer(bufOrEm)) {
        return exports.parse(bufOrEm);
    }
    
    var s = exports.stream();
    if (bufOrEm && bufOrEm.pipe) {
        bufOrEm.pipe(s);
    }
    else if (bufOrEm) {
        bufOrEm.on(eventName || 'data', function (buf) {
            s.write(buf);
        });
        
        bufOrEm.on('end', function () {
            s.end();
        });
    }
    return s;
};

exports.stream = function (input) {
    if (input) return exports.apply(null, arguments);
    
    var pending = null;
    function getBytes (bytes, cb, skip) {
        pending = {
            bytes : bytes,
            skip : skip,
            cb : function (buf) {
                pending = null;
                cb(buf);
            },
        };
        dispatch();
    }
    
    var offset = null;
    function dispatch () {
        if (!pending) {
            if (caughtEnd) done = true;
            return;
        }
        if (typeof pending === 'function') {
            pending();
        }
        else {
            var bytes = offset + pending.bytes;
            
            if (buffers.length >= bytes) {
                var buf;
                if (offset == null) {
                    buf = buffers.splice(0, bytes);
                    if (!pending.skip) {
                        buf = buf.slice();
                    }
                }
                else {
                    if (!pending.skip) {
                        buf = buffers.slice(offset, bytes);
                    }
                    offset = bytes;
                }
                
                if (pending.skip) {
                    pending.cb();
                }
                else {
                    pending.cb(buf);
                }
            }
        }
    }
    
    function builder (saw) {
        function next () { if (!done) saw.next() }
        
        var self = words(function (bytes, cb) {
            return function (name) {
                getBytes(bytes, function (buf) {
                    vars.set(name, cb(buf));
                    next();
                });
            };
        });
        
        self.tap = function (cb) {
            saw.nest(cb, vars.store);
        };
        
        self.into = function (key, cb) {
            if (!vars.get(key)) vars.set(key, {});
            var parent = vars;
            vars = Vars(parent.get(key));
            
            saw.nest(function () {
                cb.apply(this, arguments);
                this.tap(function () {
                    vars = parent;
                });
            }, vars.store);
        };
        
        self.flush = function () {
            vars.store = {};
            next();
        };
        
        self.loop = function (cb) {
            var end = false;
            
            saw.nest(false, function loop () {
                this.vars = vars.store;
                cb.call(this, function () {
                    end = true;
                    next();
                }, vars.store);
                this.tap(function () {
                    if (end) saw.next()
                    else loop.call(this)
                }.bind(this));
            }, vars.store);
        };
        
        self.buffer = function (name, bytes) {
            if (typeof bytes === 'string') {
                bytes = vars.get(bytes);
            }
            
            getBytes(bytes, function (buf) {
                vars.set(name, buf);
                next();
            });
        };
        
        self.skip = function (bytes) {
            if (typeof bytes === 'string') {
                bytes = vars.get(bytes);
            }
            
            getBytes(bytes, function () {
                next();
            });
        };
        
        self.scan = function find (name, search) {
            if (typeof search === 'string') {
                search = new Buffer(search);
            }
            else if (!Buffer.isBuffer(search)) {
                throw new Error('search must be a Buffer or a string');
            }
            
            var taken = 0;
            pending = function () {
                var pos = buffers.indexOf(search, offset + taken);
                var i = pos-offset-taken;
                if (pos !== -1) {
                    pending = null;
                    if (offset != null) {
                        vars.set(
                            name,
                            buffers.slice(offset, offset + taken + i)
                        );
                        offset += taken + i + search.length;
                    }
                    else {
                        vars.set(
                            name,
                            buffers.slice(0, taken + i)
                        );
                        buffers.splice(0, taken + i + search.length);
                    }
                    next();
                    dispatch();
                } else {
                    i = Math.max(buffers.length - search.length - offset - taken, 0);
				}
                taken += i;
            };
            dispatch();
        };
        
        self.peek = function (cb) {
            offset = 0;
            saw.nest(function () {
                cb.call(this, vars.store);
                this.tap(function () {
                    offset = null;
                });
            });
        };
        
        return self;
    };
    
    var stream = Chainsaw.light(builder);
    stream.writable = true;
    
    var buffers = Buffers();
    
    stream.write = function (buf) {
        buffers.push(buf);
        dispatch();
    };
    
    var vars = Vars();
    
    var done = false, caughtEnd = false;
    stream.end = function () {
        caughtEnd = true;
    };
    
    stream.pipe = Stream.prototype.pipe;
    Object.getOwnPropertyNames(EventEmitter.prototype).forEach(function (name) {
        stream[name] = EventEmitter.prototype[name];
    });
    
    return stream;
};

exports.parse = function parse (buffer) {
    var self = words(function (bytes, cb) {
        return function (name) {
            if (offset + bytes <= buffer.length) {
                var buf = buffer.slice(offset, offset + bytes);
                offset += bytes;
                vars.set(name, cb(buf));
            }
            else {
                vars.set(name, null);
            }
            return self;
        };
    });
    
    var offset = 0;
    var vars = Vars();
    self.vars = vars.store;
    
    self.tap = function (cb) {
        cb.call(self, vars.store);
        return self;
    };
    
    self.into = function (key, cb) {
        if (!vars.get(key)) {
            vars.set(key, {});
        }
        var parent = vars;
        vars = Vars(parent.get(key));
        cb.call(self, vars.store);
        vars = parent;
        return self;
    };
    
    self.loop = function (cb) {
        var end = false;
        var ender = function () { end = true };
        while (end === false) {
            cb.call(self, ender, vars.store);
        }
        return self;
    };
    
    self.buffer = function (name, size) {
        if (typeof size === 'string') {
            size = vars.get(size);
        }
        var buf = buffer.slice(offset, Math.min(buffer.length, offset + size));
        offset += size;
        vars.set(name, buf);
        
        return self;
    };
    
    self.skip = function (bytes) {
        if (typeof bytes === 'string') {
            bytes = vars.get(bytes);
        }
        offset += bytes;
        
        return self;
    };
    
    self.scan = function (name, search) {
        if (typeof search === 'string') {
            search = new Buffer(search);
        }
        else if (!Buffer.isBuffer(search)) {
            throw new Error('search must be a Buffer or a string');
        }
        vars.set(name, null);
        
        // simple but slow string search
        for (var i = 0; i + offset <= buffer.length - search.length + 1; i++) {
            for (
                var j = 0;
                j < search.length && buffer[offset+i+j] === search[j];
                j++
            );
            if (j === search.length) break;
        }
        
        vars.set(name, buffer.slice(offset, offset + i));
        offset += i + search.length;
        return self;
    };
    
    self.peek = function (cb) {
        var was = offset;
        cb.call(self, vars.store);
        offset = was;
        return self;
    };
    
    self.flush = function () {
        vars.store = {};
        return self;
    };
    
    self.eof = function () {
        return offset >= buffer.length;
    };
    
    return self;
};

// convert byte strings to unsigned little endian numbers
function decodeLEu (bytes) {
    var acc = 0;
    for (var i = 0; i < bytes.length; i++) {
        acc += Math.pow(256,i) * bytes[i];
    }
    return acc;
}

// convert byte strings to unsigned big endian numbers
function decodeBEu (bytes) {
    var acc = 0;
    for (var i = 0; i < bytes.length; i++) {
        acc += Math.pow(256, bytes.length - i - 1) * bytes[i];
    }
    return acc;
}

// convert byte strings to signed big endian numbers
function decodeBEs (bytes) {
    var val = decodeBEu(bytes);
    if ((bytes[0] & 0x80) == 0x80) {
        val -= Math.pow(256, bytes.length);
    }
    return val;
}

// convert byte strings to signed little endian numbers
function decodeLEs (bytes) {
    var val = decodeLEu(bytes);
    if ((bytes[bytes.length - 1] & 0x80) == 0x80) {
        val -= Math.pow(256, bytes.length);
    }
    return val;
}

function words (decode) {
    var self = {};
    
    [ 1, 2, 4, 8 ].forEach(function (bytes) {
        var bits = bytes * 8;
        
        self['word' + bits + 'le']
        = self['word' + bits + 'lu']
        = decode(bytes, decodeLEu);
        
        self['word' + bits + 'ls']
        = decode(bytes, decodeLEs);
        
        self['word' + bits + 'be']
        = self['word' + bits + 'bu']
        = decode(bytes, decodeBEu);
        
        self['word' + bits + 'bs']
        = decode(bytes, decodeBEs);
    });
    
    // word8be(n) == word8le(n) for all n
    self.word8 = self.word8u = self.word8be;
    self.word8s = self.word8bs;
    
    return self;
}

}).call(this,require("buffer").Buffer)
},{"./lib/vars.js":21,"buffer":31,"buffers":"OBo3aV","chainsaw":22,"events":40,"stream":45}],21:[function(require,module,exports){
module.exports = function (store) {
    function getset (name, value) {
        var node = vars.store;
        var keys = name.split('.');
        keys.slice(0,-1).forEach(function (k) {
            if (node[k] === undefined) node[k] = {};
            node = node[k]
        });
        var key = keys[keys.length - 1];
        if (arguments.length == 1) {
            return node[key];
        }
        else {
            return node[key] = value;
        }
    }
    
    var vars = {
        get : function (name) {
            return getset(name);
        },
        set : function (name, value) {
            return getset(name, value);
        },
        store : store || {},
    };
    return vars;
};

},{}],22:[function(require,module,exports){
(function (process){
var Traverse = require('traverse');
var EventEmitter = require('events').EventEmitter;

module.exports = Chainsaw;
function Chainsaw (builder) {
    var saw = Chainsaw.saw(builder, {});
    var r = builder.call(saw.handlers, saw);
    if (r !== undefined) saw.handlers = r;
    saw.record();
    return saw.chain();
};

Chainsaw.light = function ChainsawLight (builder) {
    var saw = Chainsaw.saw(builder, {});
    var r = builder.call(saw.handlers, saw);
    if (r !== undefined) saw.handlers = r;
    return saw.chain();
};

Chainsaw.saw = function (builder, handlers) {
    var saw = new EventEmitter;
    saw.handlers = handlers;
    saw.actions = [];

    saw.chain = function () {
        var ch = Traverse(saw.handlers).map(function (node) {
            if (this.isRoot) return node;
            var ps = this.path;

            if (typeof node === 'function') {
                this.update(function () {
                    saw.actions.push({
                        path : ps,
                        args : [].slice.call(arguments)
                    });
                    return ch;
                });
            }
        });

        process.nextTick(function () {
            saw.emit('begin');
            saw.next();
        });

        return ch;
    };

    saw.pop = function () {
        return saw.actions.shift();
    };

    saw.next = function () {
        var action = saw.pop();

        if (!action) {
            saw.emit('end');
        }
        else if (!action.trap) {
            var node = saw.handlers;
            action.path.forEach(function (key) { node = node[key] });
            node.apply(saw.handlers, action.args);
        }
    };

    saw.nest = function (cb) {
        var args = [].slice.call(arguments, 1);
        var autonext = true;

        if (typeof cb === 'boolean') {
            var autonext = cb;
            cb = args.shift();
        }

        var s = Chainsaw.saw(builder, {});
        var r = builder.call(s.handlers, s);

        if (r !== undefined) s.handlers = r;

        // If we are recording...
        if ("undefined" !== typeof saw.step) {
            // ... our children should, too
            s.record();
        }

        cb.apply(s.chain(), args);
        if (autonext !== false) s.on('end', saw.next);
    };

    saw.record = function () {
        upgradeChainsaw(saw);
    };

    ['trap', 'down', 'jump'].forEach(function (method) {
        saw[method] = function () {
            throw new Error("To use the trap, down and jump features, please "+
                            "call record() first to start recording actions.");
        };
    });

    return saw;
};

function upgradeChainsaw(saw) {
    saw.step = 0;

    // override pop
    saw.pop = function () {
        return saw.actions[saw.step++];
    };

    saw.trap = function (name, cb) {
        var ps = Array.isArray(name) ? name : [name];
        saw.actions.push({
            path : ps,
            step : saw.step,
            cb : cb,
            trap : true
        });
    };

    saw.down = function (name) {
        var ps = (Array.isArray(name) ? name : [name]).join('/');
        var i = saw.actions.slice(saw.step).map(function (x) {
            if (x.trap && x.step <= saw.step) return false;
            return x.path.join('/') == ps;
        }).indexOf(true);

        if (i >= 0) saw.step += i;
        else saw.step = saw.actions.length;

        var act = saw.actions[saw.step - 1];
        if (act && act.trap) {
            // It's a trap!
            saw.step = act.step;
            act.cb();
        }
        else saw.next();
    };

    saw.jump = function (step) {
        saw.step = step;
        saw.next();
    };
};

}).call(this,require("/root/node_modules/bitcore/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"))
},{"/root/node_modules/bitcore/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":42,"events":40,"traverse":23}],23:[function(require,module,exports){
module.exports = Traverse;
function Traverse (obj) {
    if (!(this instanceof Traverse)) return new Traverse(obj);
    this.value = obj;
}

Traverse.prototype.get = function (ps) {
    var node = this.value;
    for (var i = 0; i < ps.length; i ++) {
        var key = ps[i];
        if (!Object.hasOwnProperty.call(node, key)) {
            node = undefined;
            break;
        }
        node = node[key];
    }
    return node;
};

Traverse.prototype.set = function (ps, value) {
    var node = this.value;
    for (var i = 0; i < ps.length - 1; i ++) {
        var key = ps[i];
        if (!Object.hasOwnProperty.call(node, key)) node[key] = {};
        node = node[key];
    }
    node[ps[i]] = value;
    return value;
};

Traverse.prototype.map = function (cb) {
    return walk(this.value, cb, true);
};

Traverse.prototype.forEach = function (cb) {
    this.value = walk(this.value, cb, false);
    return this.value;
};

Traverse.prototype.reduce = function (cb, init) {
    var skip = arguments.length === 1;
    var acc = skip ? this.value : init;
    this.forEach(function (x) {
        if (!this.isRoot || !skip) {
            acc = cb.call(this, acc, x);
        }
    });
    return acc;
};

Traverse.prototype.deepEqual = function (obj) {
    if (arguments.length !== 1) {
        throw new Error(
            'deepEqual requires exactly one object to compare against'
        );
    }
    
    var equal = true;
    var node = obj;
    
    this.forEach(function (y) {
        var notEqual = (function () {
            equal = false;
            //this.stop();
            return undefined;
        }).bind(this);
        
        //if (node === undefined || node === null) return notEqual();
        
        if (!this.isRoot) {
        /*
            if (!Object.hasOwnProperty.call(node, this.key)) {
                return notEqual();
            }
        */
            if (typeof node !== 'object') return notEqual();
            node = node[this.key];
        }
        
        var x = node;
        
        this.post(function () {
            node = x;
        });
        
        var toS = function (o) {
            return Object.prototype.toString.call(o);
        };
        
        if (this.circular) {
            if (Traverse(obj).get(this.circular.path) !== x) notEqual();
        }
        else if (typeof x !== typeof y) {
            notEqual();
        }
        else if (x === null || y === null || x === undefined || y === undefined) {
            if (x !== y) notEqual();
        }
        else if (x.__proto__ !== y.__proto__) {
            notEqual();
        }
        else if (x === y) {
            // nop
        }
        else if (typeof x === 'function') {
            if (x instanceof RegExp) {
                // both regexps on account of the __proto__ check
                if (x.toString() != y.toString()) notEqual();
            }
            else if (x !== y) notEqual();
        }
        else if (typeof x === 'object') {
            if (toS(y) === '[object Arguments]'
            || toS(x) === '[object Arguments]') {
                if (toS(x) !== toS(y)) {
                    notEqual();
                }
            }
            else if (x instanceof Date || y instanceof Date) {
                if (!(x instanceof Date) || !(y instanceof Date)
                || x.getTime() !== y.getTime()) {
                    notEqual();
                }
            }
            else {
                var kx = Object.keys(x);
                var ky = Object.keys(y);
                if (kx.length !== ky.length) return notEqual();
                for (var i = 0; i < kx.length; i++) {
                    var k = kx[i];
                    if (!Object.hasOwnProperty.call(y, k)) {
                        notEqual();
                    }
                }
            }
        }
    });
    
    return equal;
};

Traverse.prototype.paths = function () {
    var acc = [];
    this.forEach(function (x) {
        acc.push(this.path); 
    });
    return acc;
};

Traverse.prototype.nodes = function () {
    var acc = [];
    this.forEach(function (x) {
        acc.push(this.node);
    });
    return acc;
};

Traverse.prototype.clone = function () {
    var parents = [], nodes = [];
    
    return (function clone (src) {
        for (var i = 0; i < parents.length; i++) {
            if (parents[i] === src) {
                return nodes[i];
            }
        }
        
        if (typeof src === 'object' && src !== null) {
            var dst = copy(src);
            
            parents.push(src);
            nodes.push(dst);
            
            Object.keys(src).forEach(function (key) {
                dst[key] = clone(src[key]);
            });
            
            parents.pop();
            nodes.pop();
            return dst;
        }
        else {
            return src;
        }
    })(this.value);
};

function walk (root, cb, immutable) {
    var path = [];
    var parents = [];
    var alive = true;
    
    return (function walker (node_) {
        var node = immutable ? copy(node_) : node_;
        var modifiers = {};
        
        var state = {
            node : node,
            node_ : node_,
            path : [].concat(path),
            parent : parents.slice(-1)[0],
            key : path.slice(-1)[0],
            isRoot : path.length === 0,
            level : path.length,
            circular : null,
            update : function (x) {
                if (!state.isRoot) {
                    state.parent.node[state.key] = x;
                }
                state.node = x;
            },
            'delete' : function () {
                delete state.parent.node[state.key];
            },
            remove : function () {
                if (Array.isArray(state.parent.node)) {
                    state.parent.node.splice(state.key, 1);
                }
                else {
                    delete state.parent.node[state.key];
                }
            },
            before : function (f) { modifiers.before = f },
            after : function (f) { modifiers.after = f },
            pre : function (f) { modifiers.pre = f },
            post : function (f) { modifiers.post = f },
            stop : function () { alive = false }
        };
        
        if (!alive) return state;
        
        if (typeof node === 'object' && node !== null) {
            state.isLeaf = Object.keys(node).length == 0;
            
            for (var i = 0; i < parents.length; i++) {
                if (parents[i].node_ === node_) {
                    state.circular = parents[i];
                    break;
                }
            }
        }
        else {
            state.isLeaf = true;
        }
        
        state.notLeaf = !state.isLeaf;
        state.notRoot = !state.isRoot;
        
        // use return values to update if defined
        var ret = cb.call(state, state.node);
        if (ret !== undefined && state.update) state.update(ret);
        if (modifiers.before) modifiers.before.call(state, state.node);
        
        if (typeof state.node == 'object'
        && state.node !== null && !state.circular) {
            parents.push(state);
            
            var keys = Object.keys(state.node);
            keys.forEach(function (key, i) {
                path.push(key);
                
                if (modifiers.pre) modifiers.pre.call(state, state.node[key], key);
                
                var child = walker(state.node[key]);
                if (immutable && Object.hasOwnProperty.call(state.node, key)) {
                    state.node[key] = child.node;
                }
                
                child.isLast = i == keys.length - 1;
                child.isFirst = i == 0;
                
                if (modifiers.post) modifiers.post.call(state, child);
                
                path.pop();
            });
            parents.pop();
        }
        
        if (modifiers.after) modifiers.after.call(state, state.node);
        
        return state;
    })(root).node;
}

Object.keys(Traverse.prototype).forEach(function (key) {
    Traverse[key] = function (obj) {
        var args = [].slice.call(arguments, 1);
        var t = Traverse(obj);
        return t[key].apply(t, args);
    };
});

function copy (src) {
    if (typeof src === 'object' && src !== null) {
        var dst;
        
        if (Array.isArray(src)) {
            dst = [];
        }
        else if (src instanceof Date) {
            dst = new Date(src);
        }
        else if (src instanceof Boolean) {
            dst = new Boolean(src);
        }
        else if (src instanceof Number) {
            dst = new Number(src);
        }
        else if (src instanceof String) {
            dst = new String(src);
        }
        else {
            dst = Object.create(Object.getPrototypeOf(src));
        }
        
        Object.keys(src).forEach(function (key) {
            dst[key] = src[key];
        });
        return dst;
    }
    else return src;
}

},{}],24:[function(require,module,exports){
(function (process,__filename){

/**
 * Module dependencies.
 */

var fs = require('fs')
  , path = require('path')
  , join = path.join
  , dirname = path.dirname
  , exists = fs.existsSync || path.existsSync
  , defaults = {
        arrow: process.env.NODE_BINDINGS_ARROW || ' → '
      , compiled: process.env.NODE_BINDINGS_COMPILED_DIR || 'compiled'
      , platform: process.platform
      , arch: process.arch
      , version: process.versions.node
      , bindings: 'bindings.node'
      , try: [
          // node-gyp's linked version in the "build" dir
          [ 'module_root', 'build', 'bindings' ]
          // node-waf and gyp_addon (a.k.a node-gyp)
        , [ 'module_root', 'build', 'Debug', 'bindings' ]
        , [ 'module_root', 'build', 'Release', 'bindings' ]
          // Debug files, for development (legacy behavior, remove for node v0.9)
        , [ 'module_root', 'out', 'Debug', 'bindings' ]
        , [ 'module_root', 'Debug', 'bindings' ]
          // Release files, but manually compiled (legacy behavior, remove for node v0.9)
        , [ 'module_root', 'out', 'Release', 'bindings' ]
        , [ 'module_root', 'Release', 'bindings' ]
          // Legacy from node-waf, node <= 0.4.x
        , [ 'module_root', 'build', 'default', 'bindings' ]
          // Production "Release" buildtype binary (meh...)
        , [ 'module_root', 'compiled', 'version', 'platform', 'arch', 'bindings' ]
        ]
    }

/**
 * The main `bindings()` function loads the compiled bindings for a given module.
 * It uses V8's Error API to determine the parent filename that this function is
 * being invoked from, which is then used to find the root directory.
 */

function bindings (opts) {

  // Argument surgery
  if (typeof opts == 'string') {
    opts = { bindings: opts }
  } else if (!opts) {
    opts = {}
  }
  opts.__proto__ = defaults

  // Get the module root
  if (!opts.module_root) {
    opts.module_root = exports.getRoot(exports.getFileName())
  }

  // Ensure the given bindings name ends with .node
  if (path.extname(opts.bindings) != '.node') {
    opts.bindings += '.node'
  }

  var tries = []
    , i = 0
    , l = opts.try.length
    , n
    , b
    , err

  for (; i<l; i++) {
    n = join.apply(null, opts.try[i].map(function (p) {
      return opts[p] || p
    }))
    tries.push(n)
    try {
      b = opts.path ? require.resolve(n) : require(n)
      if (!opts.path) {
        b.path = n
      }
      return b
    } catch (e) {
      if (!/not find/i.test(e.message)) {
        throw e
      }
    }
  }

  err = new Error('Could not locate the bindings file. Tried:\n'
    + tries.map(function (a) { return opts.arrow + a }).join('\n'))
  err.tries = tries
  throw err
}
module.exports = exports = bindings


/**
 * Gets the filename of the JavaScript file that invokes this function.
 * Used to help find the root directory of a module.
 */

exports.getFileName = function getFileName () {
  var origPST = Error.prepareStackTrace
    , origSTL = Error.stackTraceLimit
    , dummy = {}
    , fileName

  Error.stackTraceLimit = 10

  Error.prepareStackTrace = function (e, st) {
    for (var i=0, l=st.length; i<l; i++) {
      fileName = st[i].getFileName()
      if (fileName !== __filename) {
        return
      }
    }
  }

  // run the 'prepareStackTrace' function above
  Error.captureStackTrace(dummy)
  dummy.stack

  // cleanup
  Error.prepareStackTrace = origPST
  Error.stackTraceLimit = origSTL

  return fileName
}

/**
 * Gets the root directory of a module, given an arbitrary filename
 * somewhere in the module tree. The "root directory" is the directory
 * containing the `package.json` file.
 *
 *   In:  /home/nate/node-native-module/lib/index.js
 *   Out: /home/nate/node-native-module
 */

exports.getRoot = function getRoot (file) {
  var dir = dirname(file)
    , prev
  while (true) {
    if (dir === '.') {
      // Avoids an infinite loop in rare cases, like the REPL
      dir = process.cwd()
    }
    if (exists(join(dir, 'package.json')) || exists(join(dir, 'node_modules'))) {
      // Found the 'package.json' file or 'node_modules' dir; we're done
      return dir
    }
    if (prev === dir) {
      // Got to the top
      throw new Error('Could not find module root given file: "' + file
                    + '". Do you have a `package.json` file? ')
    }
    // Try the parent dir next
    prev = dir
    dir = join(dir, '..')
  }
}

}).call(this,require("/root/node_modules/bitcore/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"),"/node_modules/bindings/bindings.js")
},{"/root/node_modules/bitcore/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":42,"fs":27,"path":43}],"buffertools":[function(require,module,exports){
module.exports=require('fugeBw');
},{}],"fugeBw":[function(require,module,exports){
(function (Buffer){
'use strict';


// requires node 3.1
var events = require('events');
var util = require('util');

var buffertools = {};
module.exports.Buffer = Buffer;


var is_buffer = function(x) {
  return x instanceof Buffer || x instanceof Uint8Array;
};

var unaryAction = function(f) {
  return function() {
    var target = this;
    if (is_buffer(target)) {} else if (is_buffer(arguments[0])) {
      target = arguments[0];
      Array.prototype.shift.apply(arguments);
    } else {
      throw new Error('Argument should be a buffer object.');
    }
    return f.apply(target, arguments);
  };
};

var binaryAction = function(f) {
  return function() {
    var target = this;

    // first argument
    if (is_buffer(target)) {} else if (is_buffer(arguments[0])) {
      target = arguments[0];
      Array.prototype.shift.apply(arguments);
    } else {
      throw Error('Argument should be a buffer object.');
    }

    // second argument
    var next = arguments[0];
    if (typeof next == 'string' || next instanceof String || is_buffer(next)) {
      return f.apply(target, arguments);
    }
    throw new Error('Second argument must be a string or a buffer.');
  };
};

buffertools.clear = unaryAction(function() {
  for (var i = 0; i < this.length; i++) {
    this[i] = 0;
  }
  return this;
});

buffertools.fill = unaryAction(function(data) {
  var step = typeof data.length === 'undefined' ? 1 : data.length;
  for (var i = 0; i < this.length; i += step) {
    for (var k = 0; k < step; k++) {
      this[i + k] = typeof data.length === 'undefined' ? data :
        (typeof data[k] === 'string' ? data[k].charCodeAt(0) : data[k]);
    }
  }
  return this;
});

buffertools.indexOf = unaryAction(function(data, startFrom) {
  startFrom = startFrom || 0;
  if (data.length === 0) return -1;
  for (var i = startFrom; i < this.length - data.length + 1; i += 1) {
    var found = true;
    for (var j = 0; j < data.length; j++) {
      var a = this[i + j];
      var b = data[j];
      if (typeof b === 'string') b = b.charCodeAt(0);
      if (a !== b) {
        found = false;
        break;
      }
    }
    if (found) return i;
  }
  return -1;
});

buffertools.equals = binaryAction(function(data) {
  return buffertools.compare(this, data) === 0;
});

buffertools.compare = binaryAction(function(data) {
  var buffer = this;
  var l1 = buffer.length;
  var l2 = data.length;
  if (l1 !== l2) {
    return l1 > l2 ? 1 : -1;
  }
  for (var i = 0; i < l1; i++) {
    var a = buffer[i];
    var b = data[i];
    if (typeof b === 'string') b = b.charCodeAt(0);
    if (a === b) continue;
    return a > b ? 1 : -1;
  }
  return 0;
});
buffertools.concat = function() {
  var len = 0;
  for (var i = 0; i < arguments.length; i++) {
    if (arguments[i].length === undefined) throw Error('all arguments must be strings or Buffers');
    len += arguments[i].length;
  }
  var ret = new Buffer(len);
  var k = 0;
  for (var i = 0; i < arguments.length; i++) {
    for (var j = 0; j < arguments[i].length; j++) {
      ret[k++] = typeof arguments[i][j] === 'string' ?
        arguments[i][j].charCodeAt(0) : arguments[i][j];
    }
  }
  return ret;
};
buffertools.reverse = unaryAction(function() {
  var ret = new Buffer(this.length);
  for (var i = 0; i < this.length; i++) {
    ret[i] = this[this.length - i - 1];
  }
  return ret;
});

buffertools.toHex = unaryAction(function() {
  var s = '';
  for (var i = 0; i < this.length; i++) {
    var h = this[i].toString(16);
    if (h.length == 1) h = '0' + h;
    if (h.length > 2) h = h.substring(1,3);
    s += h;
  }
  return s;
});
buffertools.fromHex = unaryAction(function() {
  var l = this.length;
  if (l % 2 !== 0) throw new Error('Invalid hex string length');
  var ret = new Buffer(l / 2);
  for (var i = 0; i < ret.length; i++) {
    var c1 = String.fromCharCode(this[2 * i]);
    var c2 = String.fromCharCode(this[2 * i + 1]);
    ret[i] = parseInt(c1 + c2, 16);
  }
  return ret;
});

exports.extend = function() {
  var receivers;
  if (arguments.length > 0) {
    receivers = Array.prototype.slice.call(arguments);
  } else if (typeof Uint8Array === 'function') {
    receivers = [Buffer.prototype, Uint8Array.prototype];
  } else {
    receivers = [Buffer.prototype];
  }
  for (var i = 0, n = receivers.length; i < n; i += 1) {
    var receiver = receivers[i];
    for (var key in buffertools) {
      receiver[key] = buffertools[key];
    }
    if (receiver !== exports) {
      receiver.concat = function() {
        var args = [this].concat(Array.prototype.slice.call(arguments));
        return buffertools.concat.apply(buffertools, args);
      };
    }
  }
};
exports.extend(exports);

//
// WritableBufferStream
//
// - never emits 'error'
// - never emits 'drain'
//
function WritableBufferStream() {
  this.writable = true;
  this.buffer = null;
}

util.inherits(WritableBufferStream, events.EventEmitter);

WritableBufferStream.prototype._append = function(buffer, encoding) {
  if (!this.writable) {
    throw new Error('Stream is not writable.');
  }

  if (Buffer.isBuffer(buffer)) {
    // no action required
  } else if (typeof buffer == 'string') {
    // TODO optimize
    buffer = new Buffer(buffer, encoding || 'utf8');
  } else {
    throw new Error('Argument should be either a buffer or a string.');
  }

  // FIXME optimize!
  if (this.buffer) {
    this.buffer = buffertools.concat(this.buffer, buffer);
  } else {
    this.buffer = new Buffer(buffer.length);
    buffer.copy(this.buffer);
  }
};

WritableBufferStream.prototype.write = function(buffer, encoding) {
  this._append(buffer, encoding);

  // signal that it's safe to immediately write again
  return true;
};

WritableBufferStream.prototype.end = function(buffer, encoding) {
  if (buffer) {
    this._append(buffer, encoding);
  }

  this.emit('close');

  this.writable = false;
};

WritableBufferStream.prototype.getBuffer = function() {
  if (this.buffer) {
    return this.buffer;
  }
  return new Buffer(0);
};

WritableBufferStream.prototype.toString = function() {
  return this.getBuffer().toString();
};

exports.WritableBufferStream = WritableBufferStream;

}).call(this,require("buffer").Buffer)
},{"buffer":31,"events":40,"util":53}],27:[function(require,module,exports){

},{}],28:[function(require,module,exports){
// http://wiki.commonjs.org/wiki/Unit_Testing/1.0
//
// THIS IS NOT TESTED NOR LIKELY TO WORK OUTSIDE V8!
//
// Originally from narwhal.js (http://narwhaljs.org)
// Copyright (c) 2009 Thomas Robinson <280north.com>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the 'Software'), to
// deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
// ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

// when used in node, this will actually load the util module we depend on
// versus loading the builtin util module as happens otherwise
// this is a bug in node module loading as far as I am concerned
var util = require('util/');

var pSlice = Array.prototype.slice;
var hasOwn = Object.prototype.hasOwnProperty;

// 1. The assert module provides functions that throw
// AssertionError's when particular conditions are not met. The
// assert module must conform to the following interface.

var assert = module.exports = ok;

// 2. The AssertionError is defined in assert.
// new assert.AssertionError({ message: message,
//                             actual: actual,
//                             expected: expected })

assert.AssertionError = function AssertionError(options) {
  this.name = 'AssertionError';
  this.actual = options.actual;
  this.expected = options.expected;
  this.operator = options.operator;
  if (options.message) {
    this.message = options.message;
    this.generatedMessage = false;
  } else {
    this.message = getMessage(this);
    this.generatedMessage = true;
  }
  var stackStartFunction = options.stackStartFunction || fail;

  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, stackStartFunction);
  }
  else {
    // non v8 browsers so we can have a stacktrace
    var err = new Error();
    if (err.stack) {
      var out = err.stack;

      // try to strip useless frames
      var fn_name = stackStartFunction.name;
      var idx = out.indexOf('\n' + fn_name);
      if (idx >= 0) {
        // once we have located the function frame
        // we need to strip out everything before it (and its line)
        var next_line = out.indexOf('\n', idx + 1);
        out = out.substring(next_line + 1);
      }

      this.stack = out;
    }
  }
};

// assert.AssertionError instanceof Error
util.inherits(assert.AssertionError, Error);

function replacer(key, value) {
  if (util.isUndefined(value)) {
    return '' + value;
  }
  if (util.isNumber(value) && (isNaN(value) || !isFinite(value))) {
    return value.toString();
  }
  if (util.isFunction(value) || util.isRegExp(value)) {
    return value.toString();
  }
  return value;
}

function truncate(s, n) {
  if (util.isString(s)) {
    return s.length < n ? s : s.slice(0, n);
  } else {
    return s;
  }
}

function getMessage(self) {
  return truncate(JSON.stringify(self.actual, replacer), 128) + ' ' +
         self.operator + ' ' +
         truncate(JSON.stringify(self.expected, replacer), 128);
}

// At present only the three keys mentioned above are used and
// understood by the spec. Implementations or sub modules can pass
// other keys to the AssertionError's constructor - they will be
// ignored.

// 3. All of the following functions must throw an AssertionError
// when a corresponding condition is not met, with a message that
// may be undefined if not provided.  All assertion methods provide
// both the actual and expected values to the assertion error for
// display purposes.

function fail(actual, expected, message, operator, stackStartFunction) {
  throw new assert.AssertionError({
    message: message,
    actual: actual,
    expected: expected,
    operator: operator,
    stackStartFunction: stackStartFunction
  });
}

// EXTENSION! allows for well behaved errors defined elsewhere.
assert.fail = fail;

// 4. Pure assertion tests whether a value is truthy, as determined
// by !!guard.
// assert.ok(guard, message_opt);
// This statement is equivalent to assert.equal(true, !!guard,
// message_opt);. To test strictly for the value true, use
// assert.strictEqual(true, guard, message_opt);.

function ok(value, message) {
  if (!value) fail(value, true, message, '==', assert.ok);
}
assert.ok = ok;

// 5. The equality assertion tests shallow, coercive equality with
// ==.
// assert.equal(actual, expected, message_opt);

assert.equal = function equal(actual, expected, message) {
  if (actual != expected) fail(actual, expected, message, '==', assert.equal);
};

// 6. The non-equality assertion tests for whether two objects are not equal
// with != assert.notEqual(actual, expected, message_opt);

assert.notEqual = function notEqual(actual, expected, message) {
  if (actual == expected) {
    fail(actual, expected, message, '!=', assert.notEqual);
  }
};

// 7. The equivalence assertion tests a deep equality relation.
// assert.deepEqual(actual, expected, message_opt);

assert.deepEqual = function deepEqual(actual, expected, message) {
  if (!_deepEqual(actual, expected)) {
    fail(actual, expected, message, 'deepEqual', assert.deepEqual);
  }
};

function _deepEqual(actual, expected) {
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;

  } else if (util.isBuffer(actual) && util.isBuffer(expected)) {
    if (actual.length != expected.length) return false;

    for (var i = 0; i < actual.length; i++) {
      if (actual[i] !== expected[i]) return false;
    }

    return true;

  // 7.2. If the expected value is a Date object, the actual value is
  // equivalent if it is also a Date object that refers to the same time.
  } else if (util.isDate(actual) && util.isDate(expected)) {
    return actual.getTime() === expected.getTime();

  // 7.3 If the expected value is a RegExp object, the actual value is
  // equivalent if it is also a RegExp object with the same source and
  // properties (`global`, `multiline`, `lastIndex`, `ignoreCase`).
  } else if (util.isRegExp(actual) && util.isRegExp(expected)) {
    return actual.source === expected.source &&
           actual.global === expected.global &&
           actual.multiline === expected.multiline &&
           actual.lastIndex === expected.lastIndex &&
           actual.ignoreCase === expected.ignoreCase;

  // 7.4. Other pairs that do not both pass typeof value == 'object',
  // equivalence is determined by ==.
  } else if (!util.isObject(actual) && !util.isObject(expected)) {
    return actual == expected;

  // 7.5 For all other Object pairs, including Array objects, equivalence is
  // determined by having the same number of owned properties (as verified
  // with Object.prototype.hasOwnProperty.call), the same set of keys
  // (although not necessarily the same order), equivalent values for every
  // corresponding key, and an identical 'prototype' property. Note: this
  // accounts for both named and indexed properties on Arrays.
  } else {
    return objEquiv(actual, expected);
  }
}

function isArguments(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
}

function objEquiv(a, b) {
  if (util.isNullOrUndefined(a) || util.isNullOrUndefined(b))
    return false;
  // an identical 'prototype' property.
  if (a.prototype !== b.prototype) return false;
  //~~~I've managed to break Object.keys through screwy arguments passing.
  //   Converting to array solves the problem.
  if (isArguments(a)) {
    if (!isArguments(b)) {
      return false;
    }
    a = pSlice.call(a);
    b = pSlice.call(b);
    return _deepEqual(a, b);
  }
  try {
    var ka = objectKeys(a),
        kb = objectKeys(b),
        key, i;
  } catch (e) {//happens when one is a string literal and the other isn't
    return false;
  }
  // having the same number of owned properties (keys incorporates
  // hasOwnProperty)
  if (ka.length != kb.length)
    return false;
  //the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  //~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] != kb[i])
      return false;
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!_deepEqual(a[key], b[key])) return false;
  }
  return true;
}

// 8. The non-equivalence assertion tests for any deep inequality.
// assert.notDeepEqual(actual, expected, message_opt);

assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
  if (_deepEqual(actual, expected)) {
    fail(actual, expected, message, 'notDeepEqual', assert.notDeepEqual);
  }
};

// 9. The strict equality assertion tests strict equality, as determined by ===.
// assert.strictEqual(actual, expected, message_opt);

assert.strictEqual = function strictEqual(actual, expected, message) {
  if (actual !== expected) {
    fail(actual, expected, message, '===', assert.strictEqual);
  }
};

// 10. The strict non-equality assertion tests for strict inequality, as
// determined by !==.  assert.notStrictEqual(actual, expected, message_opt);

assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
  if (actual === expected) {
    fail(actual, expected, message, '!==', assert.notStrictEqual);
  }
};

function expectedException(actual, expected) {
  if (!actual || !expected) {
    return false;
  }

  if (Object.prototype.toString.call(expected) == '[object RegExp]') {
    return expected.test(actual);
  } else if (actual instanceof expected) {
    return true;
  } else if (expected.call({}, actual) === true) {
    return true;
  }

  return false;
}

function _throws(shouldThrow, block, expected, message) {
  var actual;

  if (util.isString(expected)) {
    message = expected;
    expected = null;
  }

  try {
    block();
  } catch (e) {
    actual = e;
  }

  message = (expected && expected.name ? ' (' + expected.name + ').' : '.') +
            (message ? ' ' + message : '.');

  if (shouldThrow && !actual) {
    fail(actual, expected, 'Missing expected exception' + message);
  }

  if (!shouldThrow && expectedException(actual, expected)) {
    fail(actual, expected, 'Got unwanted exception' + message);
  }

  if ((shouldThrow && actual && expected &&
      !expectedException(actual, expected)) || (!shouldThrow && actual)) {
    throw actual;
  }
}

// 11. Expected to throw an error:
// assert.throws(block, Error_opt, message_opt);

assert.throws = function(block, /*optional*/error, /*optional*/message) {
  _throws.apply(this, [true].concat(pSlice.call(arguments)));
};

// EXTENSION! This is annoying to write outside this module.
assert.doesNotThrow = function(block, /*optional*/message) {
  _throws.apply(this, [false].concat(pSlice.call(arguments)));
};

assert.ifError = function(err) { if (err) {throw err;}};

var objectKeys = Object.keys || function (obj) {
  var keys = [];
  for (var key in obj) {
    if (hasOwn.call(obj, key)) keys.push(key);
  }
  return keys;
};

},{"util/":30}],29:[function(require,module,exports){
module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}
},{}],30:[function(require,module,exports){
(function (process,global){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = require('./support/isBuffer');

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = require('inherits');

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

}).call(this,require("/root/node_modules/bitcore/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./support/isBuffer":29,"/root/node_modules/bitcore/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":42,"inherits":41}],31:[function(require,module,exports){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */

var base64 = require('base64-js')
var ieee754 = require('ieee754')

exports.Buffer = Buffer
exports.SlowBuffer = Buffer
exports.INSPECT_MAX_BYTES = 50
Buffer.poolSize = 8192

/**
 * If `Buffer._useTypedArrays`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (compatible down to IE6)
 */
Buffer._useTypedArrays = (function () {
  // Detect if browser supports Typed Arrays. Supported browsers are IE 10+, Firefox 4+,
  // Chrome 7+, Safari 5.1+, Opera 11.6+, iOS 4.2+. If the browser does not support adding
  // properties to `Uint8Array` instances, then that's the same as no `Uint8Array` support
  // because we need to be able to add all the node Buffer API methods. This is an issue
  // in Firefox 4-29. Now fixed: https://bugzilla.mozilla.org/show_bug.cgi?id=695438
  try {
    var buf = new ArrayBuffer(0)
    var arr = new Uint8Array(buf)
    arr.foo = function () { return 42 }
    return 42 === arr.foo() &&
        typeof arr.subarray === 'function' // Chrome 9-10 lack `subarray`
  } catch (e) {
    return false
  }
})()

/**
 * Class: Buffer
 * =============
 *
 * The Buffer constructor returns instances of `Uint8Array` that are augmented
 * with function properties for all the node `Buffer` API functions. We use
 * `Uint8Array` so that square bracket notation works as expected -- it returns
 * a single octet.
 *
 * By augmenting the instances, we can avoid modifying the `Uint8Array`
 * prototype.
 */
function Buffer (subject, encoding, noZero) {
  if (!(this instanceof Buffer))
    return new Buffer(subject, encoding, noZero)

  var type = typeof subject

  // Workaround: node's base64 implementation allows for non-padded strings
  // while base64-js does not.
  if (encoding === 'base64' && type === 'string') {
    subject = stringtrim(subject)
    while (subject.length % 4 !== 0) {
      subject = subject + '='
    }
  }

  // Find the length
  var length
  if (type === 'number')
    length = coerce(subject)
  else if (type === 'string')
    length = Buffer.byteLength(subject, encoding)
  else if (type === 'object')
    length = coerce(subject.length) // assume that object is array-like
  else
    throw new Error('First argument needs to be a number, array or string.')

  var buf
  if (Buffer._useTypedArrays) {
    // Preferred: Return an augmented `Uint8Array` instance for best performance
    buf = Buffer._augment(new Uint8Array(length))
  } else {
    // Fallback: Return THIS instance of Buffer (created by `new`)
    buf = this
    buf.length = length
    buf._isBuffer = true
  }

  var i
  if (Buffer._useTypedArrays && typeof subject.byteLength === 'number') {
    // Speed optimization -- use set if we're copying from a typed array
    buf._set(subject)
  } else if (isArrayish(subject)) {
    // Treat array-ish objects as a byte array
    for (i = 0; i < length; i++) {
      if (Buffer.isBuffer(subject))
        buf[i] = subject.readUInt8(i)
      else
        buf[i] = subject[i]
    }
  } else if (type === 'string') {
    buf.write(subject, 0, encoding)
  } else if (type === 'number' && !Buffer._useTypedArrays && !noZero) {
    for (i = 0; i < length; i++) {
      buf[i] = 0
    }
  }

  return buf
}

// STATIC METHODS
// ==============

Buffer.isEncoding = function (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'binary':
    case 'base64':
    case 'raw':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.isBuffer = function (b) {
  return !!(b !== null && b !== undefined && b._isBuffer)
}

Buffer.byteLength = function (str, encoding) {
  var ret
  str = str + ''
  switch (encoding || 'utf8') {
    case 'hex':
      ret = str.length / 2
      break
    case 'utf8':
    case 'utf-8':
      ret = utf8ToBytes(str).length
      break
    case 'ascii':
    case 'binary':
    case 'raw':
      ret = str.length
      break
    case 'base64':
      ret = base64ToBytes(str).length
      break
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      ret = str.length * 2
      break
    default:
      throw new Error('Unknown encoding')
  }
  return ret
}

Buffer.concat = function (list, totalLength) {
  assert(isArray(list), 'Usage: Buffer.concat(list, [totalLength])\n' +
      'list should be an Array.')

  if (list.length === 0) {
    return new Buffer(0)
  } else if (list.length === 1) {
    return list[0]
  }

  var i
  if (typeof totalLength !== 'number') {
    totalLength = 0
    for (i = 0; i < list.length; i++) {
      totalLength += list[i].length
    }
  }

  var buf = new Buffer(totalLength)
  var pos = 0
  for (i = 0; i < list.length; i++) {
    var item = list[i]
    item.copy(buf, pos)
    pos += item.length
  }
  return buf
}

// BUFFER INSTANCE METHODS
// =======================

function _hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  assert(strLen % 2 === 0, 'Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; i++) {
    var byte = parseInt(string.substr(i * 2, 2), 16)
    assert(!isNaN(byte), 'Invalid hex string')
    buf[offset + i] = byte
  }
  Buffer._charsWritten = i * 2
  return i
}

function _utf8Write (buf, string, offset, length) {
  var charsWritten = Buffer._charsWritten =
    blitBuffer(utf8ToBytes(string), buf, offset, length)
  return charsWritten
}

function _asciiWrite (buf, string, offset, length) {
  var charsWritten = Buffer._charsWritten =
    blitBuffer(asciiToBytes(string), buf, offset, length)
  return charsWritten
}

function _binaryWrite (buf, string, offset, length) {
  return _asciiWrite(buf, string, offset, length)
}

function _base64Write (buf, string, offset, length) {
  var charsWritten = Buffer._charsWritten =
    blitBuffer(base64ToBytes(string), buf, offset, length)
  return charsWritten
}

function _utf16leWrite (buf, string, offset, length) {
  var charsWritten = Buffer._charsWritten =
    blitBuffer(utf16leToBytes(string), buf, offset, length)
  return charsWritten
}

Buffer.prototype.write = function (string, offset, length, encoding) {
  // Support both (string, offset, length, encoding)
  // and the legacy (string, encoding, offset, length)
  if (isFinite(offset)) {
    if (!isFinite(length)) {
      encoding = length
      length = undefined
    }
  } else {  // legacy
    var swap = encoding
    encoding = offset
    offset = length
    length = swap
  }

  offset = Number(offset) || 0
  var remaining = this.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }
  encoding = String(encoding || 'utf8').toLowerCase()

  var ret
  switch (encoding) {
    case 'hex':
      ret = _hexWrite(this, string, offset, length)
      break
    case 'utf8':
    case 'utf-8':
      ret = _utf8Write(this, string, offset, length)
      break
    case 'ascii':
      ret = _asciiWrite(this, string, offset, length)
      break
    case 'binary':
      ret = _binaryWrite(this, string, offset, length)
      break
    case 'base64':
      ret = _base64Write(this, string, offset, length)
      break
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      ret = _utf16leWrite(this, string, offset, length)
      break
    default:
      throw new Error('Unknown encoding')
  }
  return ret
}

Buffer.prototype.toString = function (encoding, start, end) {
  var self = this

  encoding = String(encoding || 'utf8').toLowerCase()
  start = Number(start) || 0
  end = (end !== undefined)
    ? Number(end)
    : end = self.length

  // Fastpath empty strings
  if (end === start)
    return ''

  var ret
  switch (encoding) {
    case 'hex':
      ret = _hexSlice(self, start, end)
      break
    case 'utf8':
    case 'utf-8':
      ret = _utf8Slice(self, start, end)
      break
    case 'ascii':
      ret = _asciiSlice(self, start, end)
      break
    case 'binary':
      ret = _binarySlice(self, start, end)
      break
    case 'base64':
      ret = _base64Slice(self, start, end)
      break
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      ret = _utf16leSlice(self, start, end)
      break
    default:
      throw new Error('Unknown encoding')
  }
  return ret
}

Buffer.prototype.toJSON = function () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function (target, target_start, start, end) {
  var source = this

  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (!target_start) target_start = 0

  // Copy 0 bytes; we're done
  if (end === start) return
  if (target.length === 0 || source.length === 0) return

  // Fatal error conditions
  assert(end >= start, 'sourceEnd < sourceStart')
  assert(target_start >= 0 && target_start < target.length,
      'targetStart out of bounds')
  assert(start >= 0 && start < source.length, 'sourceStart out of bounds')
  assert(end >= 0 && end <= source.length, 'sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length)
    end = this.length
  if (target.length - target_start < end - start)
    end = target.length - target_start + start

  var len = end - start

  if (len < 100 || !Buffer._useTypedArrays) {
    for (var i = 0; i < len; i++)
      target[i + target_start] = this[i + start]
  } else {
    target._set(this.subarray(start, start + len), target_start)
  }
}

function _base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function _utf8Slice (buf, start, end) {
  var res = ''
  var tmp = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; i++) {
    if (buf[i] <= 0x7F) {
      res += decodeUtf8Char(tmp) + String.fromCharCode(buf[i])
      tmp = ''
    } else {
      tmp += '%' + buf[i].toString(16)
    }
  }

  return res + decodeUtf8Char(tmp)
}

function _asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; i++)
    ret += String.fromCharCode(buf[i])
  return ret
}

function _binarySlice (buf, start, end) {
  return _asciiSlice(buf, start, end)
}

function _hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; i++) {
    out += toHex(buf[i])
  }
  return out
}

function _utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i+1] * 256)
  }
  return res
}

Buffer.prototype.slice = function (start, end) {
  var len = this.length
  start = clamp(start, len, 0)
  end = clamp(end, len, len)

  if (Buffer._useTypedArrays) {
    return Buffer._augment(this.subarray(start, end))
  } else {
    var sliceLen = end - start
    var newBuf = new Buffer(sliceLen, undefined, true)
    for (var i = 0; i < sliceLen; i++) {
      newBuf[i] = this[i + start]
    }
    return newBuf
  }
}

// `get` will be removed in Node 0.13+
Buffer.prototype.get = function (offset) {
  console.log('.get() is deprecated. Access using array indexes instead.')
  return this.readUInt8(offset)
}

// `set` will be removed in Node 0.13+
Buffer.prototype.set = function (v, offset) {
  console.log('.set() is deprecated. Access using array indexes instead.')
  return this.writeUInt8(v, offset)
}

Buffer.prototype.readUInt8 = function (offset, noAssert) {
  if (!noAssert) {
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset < this.length, 'Trying to read beyond buffer length')
  }

  if (offset >= this.length)
    return

  return this[offset]
}

function _readUInt16 (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 1 < buf.length, 'Trying to read beyond buffer length')
  }

  var len = buf.length
  if (offset >= len)
    return

  var val
  if (littleEndian) {
    val = buf[offset]
    if (offset + 1 < len)
      val |= buf[offset + 1] << 8
  } else {
    val = buf[offset] << 8
    if (offset + 1 < len)
      val |= buf[offset + 1]
  }
  return val
}

Buffer.prototype.readUInt16LE = function (offset, noAssert) {
  return _readUInt16(this, offset, true, noAssert)
}

Buffer.prototype.readUInt16BE = function (offset, noAssert) {
  return _readUInt16(this, offset, false, noAssert)
}

function _readUInt32 (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'Trying to read beyond buffer length')
  }

  var len = buf.length
  if (offset >= len)
    return

  var val
  if (littleEndian) {
    if (offset + 2 < len)
      val = buf[offset + 2] << 16
    if (offset + 1 < len)
      val |= buf[offset + 1] << 8
    val |= buf[offset]
    if (offset + 3 < len)
      val = val + (buf[offset + 3] << 24 >>> 0)
  } else {
    if (offset + 1 < len)
      val = buf[offset + 1] << 16
    if (offset + 2 < len)
      val |= buf[offset + 2] << 8
    if (offset + 3 < len)
      val |= buf[offset + 3]
    val = val + (buf[offset] << 24 >>> 0)
  }
  return val
}

Buffer.prototype.readUInt32LE = function (offset, noAssert) {
  return _readUInt32(this, offset, true, noAssert)
}

Buffer.prototype.readUInt32BE = function (offset, noAssert) {
  return _readUInt32(this, offset, false, noAssert)
}

Buffer.prototype.readInt8 = function (offset, noAssert) {
  if (!noAssert) {
    assert(offset !== undefined && offset !== null,
        'missing offset')
    assert(offset < this.length, 'Trying to read beyond buffer length')
  }

  if (offset >= this.length)
    return

  var neg = this[offset] & 0x80
  if (neg)
    return (0xff - this[offset] + 1) * -1
  else
    return this[offset]
}

function _readInt16 (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 1 < buf.length, 'Trying to read beyond buffer length')
  }

  var len = buf.length
  if (offset >= len)
    return

  var val = _readUInt16(buf, offset, littleEndian, true)
  var neg = val & 0x8000
  if (neg)
    return (0xffff - val + 1) * -1
  else
    return val
}

Buffer.prototype.readInt16LE = function (offset, noAssert) {
  return _readInt16(this, offset, true, noAssert)
}

Buffer.prototype.readInt16BE = function (offset, noAssert) {
  return _readInt16(this, offset, false, noAssert)
}

function _readInt32 (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'Trying to read beyond buffer length')
  }

  var len = buf.length
  if (offset >= len)
    return

  var val = _readUInt32(buf, offset, littleEndian, true)
  var neg = val & 0x80000000
  if (neg)
    return (0xffffffff - val + 1) * -1
  else
    return val
}

Buffer.prototype.readInt32LE = function (offset, noAssert) {
  return _readInt32(this, offset, true, noAssert)
}

Buffer.prototype.readInt32BE = function (offset, noAssert) {
  return _readInt32(this, offset, false, noAssert)
}

function _readFloat (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset + 3 < buf.length, 'Trying to read beyond buffer length')
  }

  return ieee754.read(buf, offset, littleEndian, 23, 4)
}

Buffer.prototype.readFloatLE = function (offset, noAssert) {
  return _readFloat(this, offset, true, noAssert)
}

Buffer.prototype.readFloatBE = function (offset, noAssert) {
  return _readFloat(this, offset, false, noAssert)
}

function _readDouble (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset + 7 < buf.length, 'Trying to read beyond buffer length')
  }

  return ieee754.read(buf, offset, littleEndian, 52, 8)
}

Buffer.prototype.readDoubleLE = function (offset, noAssert) {
  return _readDouble(this, offset, true, noAssert)
}

Buffer.prototype.readDoubleBE = function (offset, noAssert) {
  return _readDouble(this, offset, false, noAssert)
}

Buffer.prototype.writeUInt8 = function (value, offset, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset < this.length, 'trying to write beyond buffer length')
    verifuint(value, 0xff)
  }

  if (offset >= this.length) return

  this[offset] = value
}

function _writeUInt16 (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 1 < buf.length, 'trying to write beyond buffer length')
    verifuint(value, 0xffff)
  }

  var len = buf.length
  if (offset >= len)
    return

  for (var i = 0, j = Math.min(len - offset, 2); i < j; i++) {
    buf[offset + i] =
        (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
            (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function (value, offset, noAssert) {
  _writeUInt16(this, value, offset, true, noAssert)
}

Buffer.prototype.writeUInt16BE = function (value, offset, noAssert) {
  _writeUInt16(this, value, offset, false, noAssert)
}

function _writeUInt32 (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'trying to write beyond buffer length')
    verifuint(value, 0xffffffff)
  }

  var len = buf.length
  if (offset >= len)
    return

  for (var i = 0, j = Math.min(len - offset, 4); i < j; i++) {
    buf[offset + i] =
        (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function (value, offset, noAssert) {
  _writeUInt32(this, value, offset, true, noAssert)
}

Buffer.prototype.writeUInt32BE = function (value, offset, noAssert) {
  _writeUInt32(this, value, offset, false, noAssert)
}

Buffer.prototype.writeInt8 = function (value, offset, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset < this.length, 'Trying to write beyond buffer length')
    verifsint(value, 0x7f, -0x80)
  }

  if (offset >= this.length)
    return

  if (value >= 0)
    this.writeUInt8(value, offset, noAssert)
  else
    this.writeUInt8(0xff + value + 1, offset, noAssert)
}

function _writeInt16 (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 1 < buf.length, 'Trying to write beyond buffer length')
    verifsint(value, 0x7fff, -0x8000)
  }

  var len = buf.length
  if (offset >= len)
    return

  if (value >= 0)
    _writeUInt16(buf, value, offset, littleEndian, noAssert)
  else
    _writeUInt16(buf, 0xffff + value + 1, offset, littleEndian, noAssert)
}

Buffer.prototype.writeInt16LE = function (value, offset, noAssert) {
  _writeInt16(this, value, offset, true, noAssert)
}

Buffer.prototype.writeInt16BE = function (value, offset, noAssert) {
  _writeInt16(this, value, offset, false, noAssert)
}

function _writeInt32 (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'Trying to write beyond buffer length')
    verifsint(value, 0x7fffffff, -0x80000000)
  }

  var len = buf.length
  if (offset >= len)
    return

  if (value >= 0)
    _writeUInt32(buf, value, offset, littleEndian, noAssert)
  else
    _writeUInt32(buf, 0xffffffff + value + 1, offset, littleEndian, noAssert)
}

Buffer.prototype.writeInt32LE = function (value, offset, noAssert) {
  _writeInt32(this, value, offset, true, noAssert)
}

Buffer.prototype.writeInt32BE = function (value, offset, noAssert) {
  _writeInt32(this, value, offset, false, noAssert)
}

function _writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'Trying to write beyond buffer length')
    verifIEEE754(value, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }

  var len = buf.length
  if (offset >= len)
    return

  ieee754.write(buf, value, offset, littleEndian, 23, 4)
}

Buffer.prototype.writeFloatLE = function (value, offset, noAssert) {
  _writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function (value, offset, noAssert) {
  _writeFloat(this, value, offset, false, noAssert)
}

function _writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 7 < buf.length,
        'Trying to write beyond buffer length')
    verifIEEE754(value, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }

  var len = buf.length
  if (offset >= len)
    return

  ieee754.write(buf, value, offset, littleEndian, 52, 8)
}

Buffer.prototype.writeDoubleLE = function (value, offset, noAssert) {
  _writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function (value, offset, noAssert) {
  _writeDouble(this, value, offset, false, noAssert)
}

// fill(value, start=0, end=buffer.length)
Buffer.prototype.fill = function (value, start, end) {
  if (!value) value = 0
  if (!start) start = 0
  if (!end) end = this.length

  if (typeof value === 'string') {
    value = value.charCodeAt(0)
  }

  assert(typeof value === 'number' && !isNaN(value), 'value is not a number')
  assert(end >= start, 'end < start')

  // Fill 0 bytes; we're done
  if (end === start) return
  if (this.length === 0) return

  assert(start >= 0 && start < this.length, 'start out of bounds')
  assert(end >= 0 && end <= this.length, 'end out of bounds')

  for (var i = start; i < end; i++) {
    this[i] = value
  }
}

Buffer.prototype.inspect = function () {
  var out = []
  var len = this.length
  for (var i = 0; i < len; i++) {
    out[i] = toHex(this[i])
    if (i === exports.INSPECT_MAX_BYTES) {
      out[i + 1] = '...'
      break
    }
  }
  return '<Buffer ' + out.join(' ') + '>'
}

/**
 * Creates a new `ArrayBuffer` with the *copied* memory of the buffer instance.
 * Added in Node 0.12. Only available in browsers that support ArrayBuffer.
 */
Buffer.prototype.toArrayBuffer = function () {
  if (typeof Uint8Array !== 'undefined') {
    if (Buffer._useTypedArrays) {
      return (new Buffer(this)).buffer
    } else {
      var buf = new Uint8Array(this.length)
      for (var i = 0, len = buf.length; i < len; i += 1)
        buf[i] = this[i]
      return buf.buffer
    }
  } else {
    throw new Error('Buffer.toArrayBuffer not supported in this browser')
  }
}

// HELPER FUNCTIONS
// ================

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

var BP = Buffer.prototype

/**
 * Augment a Uint8Array *instance* (not the Uint8Array class!) with Buffer methods
 */
Buffer._augment = function (arr) {
  arr._isBuffer = true

  // save reference to original Uint8Array get/set methods before overwriting
  arr._get = arr.get
  arr._set = arr.set

  // deprecated, will be removed in node 0.13+
  arr.get = BP.get
  arr.set = BP.set

  arr.write = BP.write
  arr.toString = BP.toString
  arr.toLocaleString = BP.toString
  arr.toJSON = BP.toJSON
  arr.copy = BP.copy
  arr.slice = BP.slice
  arr.readUInt8 = BP.readUInt8
  arr.readUInt16LE = BP.readUInt16LE
  arr.readUInt16BE = BP.readUInt16BE
  arr.readUInt32LE = BP.readUInt32LE
  arr.readUInt32BE = BP.readUInt32BE
  arr.readInt8 = BP.readInt8
  arr.readInt16LE = BP.readInt16LE
  arr.readInt16BE = BP.readInt16BE
  arr.readInt32LE = BP.readInt32LE
  arr.readInt32BE = BP.readInt32BE
  arr.readFloatLE = BP.readFloatLE
  arr.readFloatBE = BP.readFloatBE
  arr.readDoubleLE = BP.readDoubleLE
  arr.readDoubleBE = BP.readDoubleBE
  arr.writeUInt8 = BP.writeUInt8
  arr.writeUInt16LE = BP.writeUInt16LE
  arr.writeUInt16BE = BP.writeUInt16BE
  arr.writeUInt32LE = BP.writeUInt32LE
  arr.writeUInt32BE = BP.writeUInt32BE
  arr.writeInt8 = BP.writeInt8
  arr.writeInt16LE = BP.writeInt16LE
  arr.writeInt16BE = BP.writeInt16BE
  arr.writeInt32LE = BP.writeInt32LE
  arr.writeInt32BE = BP.writeInt32BE
  arr.writeFloatLE = BP.writeFloatLE
  arr.writeFloatBE = BP.writeFloatBE
  arr.writeDoubleLE = BP.writeDoubleLE
  arr.writeDoubleBE = BP.writeDoubleBE
  arr.fill = BP.fill
  arr.inspect = BP.inspect
  arr.toArrayBuffer = BP.toArrayBuffer

  return arr
}

// slice(start, end)
function clamp (index, len, defaultValue) {
  if (typeof index !== 'number') return defaultValue
  index = ~~index;  // Coerce to integer.
  if (index >= len) return len
  if (index >= 0) return index
  index += len
  if (index >= 0) return index
  return 0
}

function coerce (length) {
  // Coerce length to a number (possibly NaN), round up
  // in case it's fractional (e.g. 123.456) then do a
  // double negate to coerce a NaN to 0. Easy, right?
  length = ~~Math.ceil(+length)
  return length < 0 ? 0 : length
}

function isArray (subject) {
  return (Array.isArray || function (subject) {
    return Object.prototype.toString.call(subject) === '[object Array]'
  })(subject)
}

function isArrayish (subject) {
  return isArray(subject) || Buffer.isBuffer(subject) ||
      subject && typeof subject === 'object' &&
      typeof subject.length === 'number'
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    var b = str.charCodeAt(i)
    if (b <= 0x7F)
      byteArray.push(str.charCodeAt(i))
    else {
      var start = i
      if (b >= 0xD800 && b <= 0xDFFF) i++
      var h = encodeURIComponent(str.slice(start, i+1)).substr(1).split('%')
      for (var j = 0; j < h.length; j++)
        byteArray.push(parseInt(h[j], 16))
    }
  }
  return byteArray
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(str)
}

function blitBuffer (src, dst, offset, length) {
  var pos
  for (var i = 0; i < length; i++) {
    if ((i + offset >= dst.length) || (i >= src.length))
      break
    dst[i + offset] = src[i]
  }
  return i
}

function decodeUtf8Char (str) {
  try {
    return decodeURIComponent(str)
  } catch (err) {
    return String.fromCharCode(0xFFFD) // UTF 8 invalid char
  }
}

/*
 * We have to make sure that the value is a valid integer. This means that it
 * is non-negative. It has no fractional component and that it does not
 * exceed the maximum allowed value.
 */
function verifuint (value, max) {
  assert(typeof value === 'number', 'cannot write a non-number as a number')
  assert(value >= 0, 'specified a negative value for writing an unsigned value')
  assert(value <= max, 'value is larger than maximum value for type')
  assert(Math.floor(value) === value, 'value has a fractional component')
}

function verifsint (value, max, min) {
  assert(typeof value === 'number', 'cannot write a non-number as a number')
  assert(value <= max, 'value larger than maximum allowed value')
  assert(value >= min, 'value smaller than minimum allowed value')
  assert(Math.floor(value) === value, 'value has a fractional component')
}

function verifIEEE754 (value, max, min) {
  assert(typeof value === 'number', 'cannot write a non-number as a number')
  assert(value <= max, 'value larger than maximum allowed value')
  assert(value >= min, 'value smaller than minimum allowed value')
}

function assert (test, message) {
  if (!test) throw new Error(message || 'Failed assertion')
}

},{"base64-js":32,"ieee754":33}],32:[function(require,module,exports){
var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

;(function (exports) {
	'use strict';

  var Arr = (typeof Uint8Array !== 'undefined')
    ? Uint8Array
    : Array

	var PLUS   = '+'.charCodeAt(0)
	var SLASH  = '/'.charCodeAt(0)
	var NUMBER = '0'.charCodeAt(0)
	var LOWER  = 'a'.charCodeAt(0)
	var UPPER  = 'A'.charCodeAt(0)

	function decode (elt) {
		var code = elt.charCodeAt(0)
		if (code === PLUS)
			return 62 // '+'
		if (code === SLASH)
			return 63 // '/'
		if (code < NUMBER)
			return -1 //no match
		if (code < NUMBER + 10)
			return code - NUMBER + 26 + 26
		if (code < UPPER + 26)
			return code - UPPER
		if (code < LOWER + 26)
			return code - LOWER + 26
	}

	function b64ToByteArray (b64) {
		var i, j, l, tmp, placeHolders, arr

		if (b64.length % 4 > 0) {
			throw new Error('Invalid string. Length must be a multiple of 4')
		}

		// the number of equal signs (place holders)
		// if there are two placeholders, than the two characters before it
		// represent one byte
		// if there is only one, then the three characters before it represent 2 bytes
		// this is just a cheap hack to not do indexOf twice
		var len = b64.length
		placeHolders = '=' === b64.charAt(len - 2) ? 2 : '=' === b64.charAt(len - 1) ? 1 : 0

		// base64 is 4/3 + up to two characters of the original data
		arr = new Arr(b64.length * 3 / 4 - placeHolders)

		// if there are placeholders, only get up to the last complete 4 chars
		l = placeHolders > 0 ? b64.length - 4 : b64.length

		var L = 0

		function push (v) {
			arr[L++] = v
		}

		for (i = 0, j = 0; i < l; i += 4, j += 3) {
			tmp = (decode(b64.charAt(i)) << 18) | (decode(b64.charAt(i + 1)) << 12) | (decode(b64.charAt(i + 2)) << 6) | decode(b64.charAt(i + 3))
			push((tmp & 0xFF0000) >> 16)
			push((tmp & 0xFF00) >> 8)
			push(tmp & 0xFF)
		}

		if (placeHolders === 2) {
			tmp = (decode(b64.charAt(i)) << 2) | (decode(b64.charAt(i + 1)) >> 4)
			push(tmp & 0xFF)
		} else if (placeHolders === 1) {
			tmp = (decode(b64.charAt(i)) << 10) | (decode(b64.charAt(i + 1)) << 4) | (decode(b64.charAt(i + 2)) >> 2)
			push((tmp >> 8) & 0xFF)
			push(tmp & 0xFF)
		}

		return arr
	}

	function uint8ToBase64 (uint8) {
		var i,
			extraBytes = uint8.length % 3, // if we have 1 byte left, pad 2 bytes
			output = "",
			temp, length

		function encode (num) {
			return lookup.charAt(num)
		}

		function tripletToBase64 (num) {
			return encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F)
		}

		// go through the array every three bytes, we'll deal with trailing stuff later
		for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
			temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
			output += tripletToBase64(temp)
		}

		// pad the end with zeros, but make sure to not forget the extra bytes
		switch (extraBytes) {
			case 1:
				temp = uint8[uint8.length - 1]
				output += encode(temp >> 2)
				output += encode((temp << 4) & 0x3F)
				output += '=='
				break
			case 2:
				temp = (uint8[uint8.length - 2] << 8) + (uint8[uint8.length - 1])
				output += encode(temp >> 10)
				output += encode((temp >> 4) & 0x3F)
				output += encode((temp << 2) & 0x3F)
				output += '='
				break
		}

		return output
	}

	exports.toByteArray = b64ToByteArray
	exports.fromByteArray = uint8ToBase64
}(typeof exports === 'undefined' ? (this.base64js = {}) : exports))

},{}],33:[function(require,module,exports){
exports.read = function(buffer, offset, isLE, mLen, nBytes) {
  var e, m,
      eLen = nBytes * 8 - mLen - 1,
      eMax = (1 << eLen) - 1,
      eBias = eMax >> 1,
      nBits = -7,
      i = isLE ? (nBytes - 1) : 0,
      d = isLE ? -1 : 1,
      s = buffer[offset + i];

  i += d;

  e = s & ((1 << (-nBits)) - 1);
  s >>= (-nBits);
  nBits += eLen;
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8);

  m = e & ((1 << (-nBits)) - 1);
  e >>= (-nBits);
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8);

  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity);
  } else {
    m = m + Math.pow(2, mLen);
    e = e - eBias;
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
};

exports.write = function(buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c,
      eLen = nBytes * 8 - mLen - 1,
      eMax = (1 << eLen) - 1,
      eBias = eMax >> 1,
      rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0),
      i = isLE ? 0 : (nBytes - 1),
      d = isLE ? 1 : -1,
      s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0;

  value = Math.abs(value);

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0;
    e = eMax;
  } else {
    e = Math.floor(Math.log(value) / Math.LN2);
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * Math.pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }

    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
      e = 0;
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8);

  e = (e << mLen) | m;
  eLen += mLen;
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8);

  buffer[offset + i - d] |= s * 128;
};

},{}],34:[function(require,module,exports){
var Buffer = require('buffer').Buffer;
var intSize = 4;
var zeroBuffer = new Buffer(intSize); zeroBuffer.fill(0);
var chrsz = 8;

function toArray(buf, bigEndian) {
  if ((buf.length % intSize) !== 0) {
    var len = buf.length + (intSize - (buf.length % intSize));
    buf = Buffer.concat([buf, zeroBuffer], len);
  }

  var arr = [];
  var fn = bigEndian ? buf.readInt32BE : buf.readInt32LE;
  for (var i = 0; i < buf.length; i += intSize) {
    arr.push(fn.call(buf, i));
  }
  return arr;
}

function toBuffer(arr, size, bigEndian) {
  var buf = new Buffer(size);
  var fn = bigEndian ? buf.writeInt32BE : buf.writeInt32LE;
  for (var i = 0; i < arr.length; i++) {
    fn.call(buf, arr[i], i * 4, true);
  }
  return buf;
}

function hash(buf, fn, hashSize, bigEndian) {
  if (!Buffer.isBuffer(buf)) buf = new Buffer(buf);
  var arr = fn(toArray(buf, bigEndian), buf.length * chrsz);
  return toBuffer(arr, hashSize, bigEndian);
}

module.exports = { hash: hash };

},{"buffer":31}],35:[function(require,module,exports){
var Buffer = require('buffer').Buffer
var sha = require('./sha')
var sha256 = require('./sha256')
var rng = require('./rng')
var md5 = require('./md5')

var algorithms = {
  sha1: sha,
  sha256: sha256,
  md5: md5
}

var blocksize = 64
var zeroBuffer = new Buffer(blocksize); zeroBuffer.fill(0)
function hmac(fn, key, data) {
  if(!Buffer.isBuffer(key)) key = new Buffer(key)
  if(!Buffer.isBuffer(data)) data = new Buffer(data)

  if(key.length > blocksize) {
    key = fn(key)
  } else if(key.length < blocksize) {
    key = Buffer.concat([key, zeroBuffer], blocksize)
  }

  var ipad = new Buffer(blocksize), opad = new Buffer(blocksize)
  for(var i = 0; i < blocksize; i++) {
    ipad[i] = key[i] ^ 0x36
    opad[i] = key[i] ^ 0x5C
  }

  var hash = fn(Buffer.concat([ipad, data]))
  return fn(Buffer.concat([opad, hash]))
}

function hash(alg, key) {
  alg = alg || 'sha1'
  var fn = algorithms[alg]
  var bufs = []
  var length = 0
  if(!fn) error('algorithm:', alg, 'is not yet supported')
  return {
    update: function (data) {
      if(!Buffer.isBuffer(data)) data = new Buffer(data)
        
      bufs.push(data)
      length += data.length
      return this
    },
    digest: function (enc) {
      var buf = Buffer.concat(bufs)
      var r = key ? hmac(fn, key, buf) : fn(buf)
      bufs = null
      return enc ? r.toString(enc) : r
    }
  }
}

function error () {
  var m = [].slice.call(arguments).join(' ')
  throw new Error([
    m,
    'we accept pull requests',
    'http://github.com/dominictarr/crypto-browserify'
    ].join('\n'))
}

exports.createHash = function (alg) { return hash(alg) }
exports.createHmac = function (alg, key) { return hash(alg, key) }
exports.randomBytes = function(size, callback) {
  if (callback && callback.call) {
    try {
      callback.call(this, undefined, new Buffer(rng(size)))
    } catch (err) { callback(err) }
  } else {
    return new Buffer(rng(size))
  }
}

function each(a, f) {
  for(var i in a)
    f(a[i], i)
}

// the least I can do is make error messages for the rest of the node.js/crypto api.
each(['createCredentials'
, 'createCipher'
, 'createCipheriv'
, 'createDecipher'
, 'createDecipheriv'
, 'createSign'
, 'createVerify'
, 'createDiffieHellman'
, 'pbkdf2'], function (name) {
  exports[name] = function () {
    error('sorry,', name, 'is not implemented yet')
  }
})

},{"./md5":36,"./rng":37,"./sha":38,"./sha256":39,"buffer":31}],36:[function(require,module,exports){
/*
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.1 Copyright (C) Paul Johnston 1999 - 2002.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */

var helpers = require('./helpers');

/*
 * Perform a simple self-test to see if the VM is working
 */
function md5_vm_test()
{
  return hex_md5("abc") == "900150983cd24fb0d6963f7d28e17f72";
}

/*
 * Calculate the MD5 of an array of little-endian words, and a bit length
 */
function core_md5(x, len)
{
  /* append padding */
  x[len >> 5] |= 0x80 << ((len) % 32);
  x[(((len + 64) >>> 9) << 4) + 14] = len;

  var a =  1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d =  271733878;

  for(var i = 0; i < x.length; i += 16)
  {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;

    a = md5_ff(a, b, c, d, x[i+ 0], 7 , -680876936);
    d = md5_ff(d, a, b, c, x[i+ 1], 12, -389564586);
    c = md5_ff(c, d, a, b, x[i+ 2], 17,  606105819);
    b = md5_ff(b, c, d, a, x[i+ 3], 22, -1044525330);
    a = md5_ff(a, b, c, d, x[i+ 4], 7 , -176418897);
    d = md5_ff(d, a, b, c, x[i+ 5], 12,  1200080426);
    c = md5_ff(c, d, a, b, x[i+ 6], 17, -1473231341);
    b = md5_ff(b, c, d, a, x[i+ 7], 22, -45705983);
    a = md5_ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);
    d = md5_ff(d, a, b, c, x[i+ 9], 12, -1958414417);
    c = md5_ff(c, d, a, b, x[i+10], 17, -42063);
    b = md5_ff(b, c, d, a, x[i+11], 22, -1990404162);
    a = md5_ff(a, b, c, d, x[i+12], 7 ,  1804603682);
    d = md5_ff(d, a, b, c, x[i+13], 12, -40341101);
    c = md5_ff(c, d, a, b, x[i+14], 17, -1502002290);
    b = md5_ff(b, c, d, a, x[i+15], 22,  1236535329);

    a = md5_gg(a, b, c, d, x[i+ 1], 5 , -165796510);
    d = md5_gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
    c = md5_gg(c, d, a, b, x[i+11], 14,  643717713);
    b = md5_gg(b, c, d, a, x[i+ 0], 20, -373897302);
    a = md5_gg(a, b, c, d, x[i+ 5], 5 , -701558691);
    d = md5_gg(d, a, b, c, x[i+10], 9 ,  38016083);
    c = md5_gg(c, d, a, b, x[i+15], 14, -660478335);
    b = md5_gg(b, c, d, a, x[i+ 4], 20, -405537848);
    a = md5_gg(a, b, c, d, x[i+ 9], 5 ,  568446438);
    d = md5_gg(d, a, b, c, x[i+14], 9 , -1019803690);
    c = md5_gg(c, d, a, b, x[i+ 3], 14, -187363961);
    b = md5_gg(b, c, d, a, x[i+ 8], 20,  1163531501);
    a = md5_gg(a, b, c, d, x[i+13], 5 , -1444681467);
    d = md5_gg(d, a, b, c, x[i+ 2], 9 , -51403784);
    c = md5_gg(c, d, a, b, x[i+ 7], 14,  1735328473);
    b = md5_gg(b, c, d, a, x[i+12], 20, -1926607734);

    a = md5_hh(a, b, c, d, x[i+ 5], 4 , -378558);
    d = md5_hh(d, a, b, c, x[i+ 8], 11, -2022574463);
    c = md5_hh(c, d, a, b, x[i+11], 16,  1839030562);
    b = md5_hh(b, c, d, a, x[i+14], 23, -35309556);
    a = md5_hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
    d = md5_hh(d, a, b, c, x[i+ 4], 11,  1272893353);
    c = md5_hh(c, d, a, b, x[i+ 7], 16, -155497632);
    b = md5_hh(b, c, d, a, x[i+10], 23, -1094730640);
    a = md5_hh(a, b, c, d, x[i+13], 4 ,  681279174);
    d = md5_hh(d, a, b, c, x[i+ 0], 11, -358537222);
    c = md5_hh(c, d, a, b, x[i+ 3], 16, -722521979);
    b = md5_hh(b, c, d, a, x[i+ 6], 23,  76029189);
    a = md5_hh(a, b, c, d, x[i+ 9], 4 , -640364487);
    d = md5_hh(d, a, b, c, x[i+12], 11, -421815835);
    c = md5_hh(c, d, a, b, x[i+15], 16,  530742520);
    b = md5_hh(b, c, d, a, x[i+ 2], 23, -995338651);

    a = md5_ii(a, b, c, d, x[i+ 0], 6 , -198630844);
    d = md5_ii(d, a, b, c, x[i+ 7], 10,  1126891415);
    c = md5_ii(c, d, a, b, x[i+14], 15, -1416354905);
    b = md5_ii(b, c, d, a, x[i+ 5], 21, -57434055);
    a = md5_ii(a, b, c, d, x[i+12], 6 ,  1700485571);
    d = md5_ii(d, a, b, c, x[i+ 3], 10, -1894986606);
    c = md5_ii(c, d, a, b, x[i+10], 15, -1051523);
    b = md5_ii(b, c, d, a, x[i+ 1], 21, -2054922799);
    a = md5_ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);
    d = md5_ii(d, a, b, c, x[i+15], 10, -30611744);
    c = md5_ii(c, d, a, b, x[i+ 6], 15, -1560198380);
    b = md5_ii(b, c, d, a, x[i+13], 21,  1309151649);
    a = md5_ii(a, b, c, d, x[i+ 4], 6 , -145523070);
    d = md5_ii(d, a, b, c, x[i+11], 10, -1120210379);
    c = md5_ii(c, d, a, b, x[i+ 2], 15,  718787259);
    b = md5_ii(b, c, d, a, x[i+ 9], 21, -343485551);

    a = safe_add(a, olda);
    b = safe_add(b, oldb);
    c = safe_add(c, oldc);
    d = safe_add(d, oldd);
  }
  return Array(a, b, c, d);

}

/*
 * These functions implement the four basic operations the algorithm uses.
 */
function md5_cmn(q, a, b, x, s, t)
{
  return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s),b);
}
function md5_ff(a, b, c, d, x, s, t)
{
  return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
}
function md5_gg(a, b, c, d, x, s, t)
{
  return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
}
function md5_hh(a, b, c, d, x, s, t)
{
  return md5_cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5_ii(a, b, c, d, x, s, t)
{
  return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
}

/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */
function safe_add(x, y)
{
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF);
}

/*
 * Bitwise rotate a 32-bit number to the left.
 */
function bit_rol(num, cnt)
{
  return (num << cnt) | (num >>> (32 - cnt));
}

module.exports = function md5(buf) {
  return helpers.hash(buf, core_md5, 16);
};

},{"./helpers":34}],37:[function(require,module,exports){
// Original code adapted from Robert Kieffer.
// details at https://github.com/broofa/node-uuid
(function() {
  var _global = this;

  var mathRNG, whatwgRNG;

  // NOTE: Math.random() does not guarantee "cryptographic quality"
  mathRNG = function(size) {
    var bytes = new Array(size);
    var r;

    for (var i = 0, r; i < size; i++) {
      if ((i & 0x03) == 0) r = Math.random() * 0x100000000;
      bytes[i] = r >>> ((i & 0x03) << 3) & 0xff;
    }

    return bytes;
  }

  if (_global.crypto && crypto.getRandomValues) {
    whatwgRNG = function(size) {
      var bytes = new Uint8Array(size);
      crypto.getRandomValues(bytes);
      return bytes;
    }
  }

  module.exports = whatwgRNG || mathRNG;

}())

},{}],38:[function(require,module,exports){
/*
 * A JavaScript implementation of the Secure Hash Algorithm, SHA-1, as defined
 * in FIPS PUB 180-1
 * Version 2.1a Copyright Paul Johnston 2000 - 2002.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for details.
 */

var helpers = require('./helpers');

/*
 * Calculate the SHA-1 of an array of big-endian words, and a bit length
 */
function core_sha1(x, len)
{
  /* append padding */
  x[len >> 5] |= 0x80 << (24 - len % 32);
  x[((len + 64 >> 9) << 4) + 15] = len;

  var w = Array(80);
  var a =  1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d =  271733878;
  var e = -1009589776;

  for(var i = 0; i < x.length; i += 16)
  {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;
    var olde = e;

    for(var j = 0; j < 80; j++)
    {
      if(j < 16) w[j] = x[i + j];
      else w[j] = rol(w[j-3] ^ w[j-8] ^ w[j-14] ^ w[j-16], 1);
      var t = safe_add(safe_add(rol(a, 5), sha1_ft(j, b, c, d)),
                       safe_add(safe_add(e, w[j]), sha1_kt(j)));
      e = d;
      d = c;
      c = rol(b, 30);
      b = a;
      a = t;
    }

    a = safe_add(a, olda);
    b = safe_add(b, oldb);
    c = safe_add(c, oldc);
    d = safe_add(d, oldd);
    e = safe_add(e, olde);
  }
  return Array(a, b, c, d, e);

}

/*
 * Perform the appropriate triplet combination function for the current
 * iteration
 */
function sha1_ft(t, b, c, d)
{
  if(t < 20) return (b & c) | ((~b) & d);
  if(t < 40) return b ^ c ^ d;
  if(t < 60) return (b & c) | (b & d) | (c & d);
  return b ^ c ^ d;
}

/*
 * Determine the appropriate additive constant for the current iteration
 */
function sha1_kt(t)
{
  return (t < 20) ?  1518500249 : (t < 40) ?  1859775393 :
         (t < 60) ? -1894007588 : -899497514;
}

/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */
function safe_add(x, y)
{
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF);
}

/*
 * Bitwise rotate a 32-bit number to the left.
 */
function rol(num, cnt)
{
  return (num << cnt) | (num >>> (32 - cnt));
}

module.exports = function sha1(buf) {
  return helpers.hash(buf, core_sha1, 20, true);
};

},{"./helpers":34}],39:[function(require,module,exports){

/**
 * A JavaScript implementation of the Secure Hash Algorithm, SHA-256, as defined
 * in FIPS 180-2
 * Version 2.2-beta Copyright Angel Marin, Paul Johnston 2000 - 2009.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 *
 */

var helpers = require('./helpers');

var safe_add = function(x, y) {
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF);
};

var S = function(X, n) {
  return (X >>> n) | (X << (32 - n));
};

var R = function(X, n) {
  return (X >>> n);
};

var Ch = function(x, y, z) {
  return ((x & y) ^ ((~x) & z));
};

var Maj = function(x, y, z) {
  return ((x & y) ^ (x & z) ^ (y & z));
};

var Sigma0256 = function(x) {
  return (S(x, 2) ^ S(x, 13) ^ S(x, 22));
};

var Sigma1256 = function(x) {
  return (S(x, 6) ^ S(x, 11) ^ S(x, 25));
};

var Gamma0256 = function(x) {
  return (S(x, 7) ^ S(x, 18) ^ R(x, 3));
};

var Gamma1256 = function(x) {
  return (S(x, 17) ^ S(x, 19) ^ R(x, 10));
};

var core_sha256 = function(m, l) {
  var K = new Array(0x428A2F98,0x71374491,0xB5C0FBCF,0xE9B5DBA5,0x3956C25B,0x59F111F1,0x923F82A4,0xAB1C5ED5,0xD807AA98,0x12835B01,0x243185BE,0x550C7DC3,0x72BE5D74,0x80DEB1FE,0x9BDC06A7,0xC19BF174,0xE49B69C1,0xEFBE4786,0xFC19DC6,0x240CA1CC,0x2DE92C6F,0x4A7484AA,0x5CB0A9DC,0x76F988DA,0x983E5152,0xA831C66D,0xB00327C8,0xBF597FC7,0xC6E00BF3,0xD5A79147,0x6CA6351,0x14292967,0x27B70A85,0x2E1B2138,0x4D2C6DFC,0x53380D13,0x650A7354,0x766A0ABB,0x81C2C92E,0x92722C85,0xA2BFE8A1,0xA81A664B,0xC24B8B70,0xC76C51A3,0xD192E819,0xD6990624,0xF40E3585,0x106AA070,0x19A4C116,0x1E376C08,0x2748774C,0x34B0BCB5,0x391C0CB3,0x4ED8AA4A,0x5B9CCA4F,0x682E6FF3,0x748F82EE,0x78A5636F,0x84C87814,0x8CC70208,0x90BEFFFA,0xA4506CEB,0xBEF9A3F7,0xC67178F2);
  var HASH = new Array(0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A, 0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19);
    var W = new Array(64);
    var a, b, c, d, e, f, g, h, i, j;
    var T1, T2;
  /* append padding */
  m[l >> 5] |= 0x80 << (24 - l % 32);
  m[((l + 64 >> 9) << 4) + 15] = l;
  for (var i = 0; i < m.length; i += 16) {
    a = HASH[0]; b = HASH[1]; c = HASH[2]; d = HASH[3]; e = HASH[4]; f = HASH[5]; g = HASH[6]; h = HASH[7];
    for (var j = 0; j < 64; j++) {
      if (j < 16) {
        W[j] = m[j + i];
      } else {
        W[j] = safe_add(safe_add(safe_add(Gamma1256(W[j - 2]), W[j - 7]), Gamma0256(W[j - 15])), W[j - 16]);
      }
      T1 = safe_add(safe_add(safe_add(safe_add(h, Sigma1256(e)), Ch(e, f, g)), K[j]), W[j]);
      T2 = safe_add(Sigma0256(a), Maj(a, b, c));
      h = g; g = f; f = e; e = safe_add(d, T1); d = c; c = b; b = a; a = safe_add(T1, T2);
    }
    HASH[0] = safe_add(a, HASH[0]); HASH[1] = safe_add(b, HASH[1]); HASH[2] = safe_add(c, HASH[2]); HASH[3] = safe_add(d, HASH[3]);
    HASH[4] = safe_add(e, HASH[4]); HASH[5] = safe_add(f, HASH[5]); HASH[6] = safe_add(g, HASH[6]); HASH[7] = safe_add(h, HASH[7]);
  }
  return HASH;
};

module.exports = function sha256(buf) {
  return helpers.hash(buf, core_sha256, 32, true);
};

},{"./helpers":34}],40:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        throw TypeError('Uncaught, unspecified "error" event.');
      }
      return false;
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        len = arguments.length;
        args = new Array(len - 1);
        for (i = 1; i < len; i++)
          args[i - 1] = arguments[i];
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    len = arguments.length;
    args = new Array(len - 1);
    for (i = 1; i < len; i++)
      args[i - 1] = arguments[i];

    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    var m;
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.listenerCount = function(emitter, type) {
  var ret;
  if (!emitter._events || !emitter._events[type])
    ret = 0;
  else if (isFunction(emitter._events[type]))
    ret = 1;
  else
    ret = emitter._events[type].length;
  return ret;
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

},{}],41:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],42:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

function noop() {}

process.on = noop;
process.once = noop;
process.off = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
}

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}],43:[function(require,module,exports){
(function (process){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function(path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};


exports.basename = function(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPath(path)[3];
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

}).call(this,require("/root/node_modules/bitcore/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"))
},{"/root/node_modules/bitcore/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":42}],44:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// a duplex stream is just a stream that is both readable and writable.
// Since JS doesn't have multiple prototypal inheritance, this class
// prototypally inherits from Readable, and then parasitically from
// Writable.

module.exports = Duplex;
var inherits = require('inherits');
var setImmediate = require('process/browser.js').nextTick;
var Readable = require('./readable.js');
var Writable = require('./writable.js');

inherits(Duplex, Readable);

Duplex.prototype.write = Writable.prototype.write;
Duplex.prototype.end = Writable.prototype.end;
Duplex.prototype._write = Writable.prototype._write;

function Duplex(options) {
  if (!(this instanceof Duplex))
    return new Duplex(options);

  Readable.call(this, options);
  Writable.call(this, options);

  if (options && options.readable === false)
    this.readable = false;

  if (options && options.writable === false)
    this.writable = false;

  this.allowHalfOpen = true;
  if (options && options.allowHalfOpen === false)
    this.allowHalfOpen = false;

  this.once('end', onend);
}

// the no-half-open enforcer
function onend() {
  // if we allow half-open state, or if the writable side ended,
  // then we're ok.
  if (this.allowHalfOpen || this._writableState.ended)
    return;

  // no more data can be written.
  // But allow more writes to happen in this tick.
  var self = this;
  setImmediate(function () {
    self.end();
  });
}

},{"./readable.js":48,"./writable.js":50,"inherits":41,"process/browser.js":46}],45:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

module.exports = Stream;

var EE = require('events').EventEmitter;
var inherits = require('inherits');

inherits(Stream, EE);
Stream.Readable = require('./readable.js');
Stream.Writable = require('./writable.js');
Stream.Duplex = require('./duplex.js');
Stream.Transform = require('./transform.js');
Stream.PassThrough = require('./passthrough.js');

// Backwards-compat with node 0.4.x
Stream.Stream = Stream;



// old-style streams.  Note that the pipe method (the only relevant
// part of this class) is overridden in the Readable class.

function Stream() {
  EE.call(this);
}

Stream.prototype.pipe = function(dest, options) {
  var source = this;

  function ondata(chunk) {
    if (dest.writable) {
      if (false === dest.write(chunk) && source.pause) {
        source.pause();
      }
    }
  }

  source.on('data', ondata);

  function ondrain() {
    if (source.readable && source.resume) {
      source.resume();
    }
  }

  dest.on('drain', ondrain);

  // If the 'end' option is not supplied, dest.end() will be called when
  // source gets the 'end' or 'close' events.  Only dest.end() once.
  if (!dest._isStdio && (!options || options.end !== false)) {
    source.on('end', onend);
    source.on('close', onclose);
  }

  var didOnEnd = false;
  function onend() {
    if (didOnEnd) return;
    didOnEnd = true;

    dest.end();
  }


  function onclose() {
    if (didOnEnd) return;
    didOnEnd = true;

    if (typeof dest.destroy === 'function') dest.destroy();
  }

  // don't leave dangling pipes when there are errors.
  function onerror(er) {
    cleanup();
    if (EE.listenerCount(this, 'error') === 0) {
      throw er; // Unhandled stream error in pipe.
    }
  }

  source.on('error', onerror);
  dest.on('error', onerror);

  // remove all the event listeners that were added.
  function cleanup() {
    source.removeListener('data', ondata);
    dest.removeListener('drain', ondrain);

    source.removeListener('end', onend);
    source.removeListener('close', onclose);

    source.removeListener('error', onerror);
    dest.removeListener('error', onerror);

    source.removeListener('end', cleanup);
    source.removeListener('close', cleanup);

    dest.removeListener('close', cleanup);
  }

  source.on('end', cleanup);
  source.on('close', cleanup);

  dest.on('close', cleanup);

  dest.emit('pipe', source);

  // Allow for unix-like usage: A.pipe(B).pipe(C)
  return dest;
};

},{"./duplex.js":44,"./passthrough.js":47,"./readable.js":48,"./transform.js":49,"./writable.js":50,"events":40,"inherits":41}],46:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

process.binding = function (name) {
    throw new Error('process.binding is not supported');
}

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}],47:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// a passthrough stream.
// basically just the most minimal sort of Transform stream.
// Every written chunk gets output as-is.

module.exports = PassThrough;

var Transform = require('./transform.js');
var inherits = require('inherits');
inherits(PassThrough, Transform);

function PassThrough(options) {
  if (!(this instanceof PassThrough))
    return new PassThrough(options);

  Transform.call(this, options);
}

PassThrough.prototype._transform = function(chunk, encoding, cb) {
  cb(null, chunk);
};

},{"./transform.js":49,"inherits":41}],48:[function(require,module,exports){
(function (process){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

module.exports = Readable;
Readable.ReadableState = ReadableState;

var EE = require('events').EventEmitter;
var Stream = require('./index.js');
var Buffer = require('buffer').Buffer;
var setImmediate = require('process/browser.js').nextTick;
var StringDecoder;

var inherits = require('inherits');
inherits(Readable, Stream);

function ReadableState(options, stream) {
  options = options || {};

  // the point at which it stops calling _read() to fill the buffer
  // Note: 0 is a valid value, means "don't call _read preemptively ever"
  var hwm = options.highWaterMark;
  this.highWaterMark = (hwm || hwm === 0) ? hwm : 16 * 1024;

  // cast to ints.
  this.highWaterMark = ~~this.highWaterMark;

  this.buffer = [];
  this.length = 0;
  this.pipes = null;
  this.pipesCount = 0;
  this.flowing = false;
  this.ended = false;
  this.endEmitted = false;
  this.reading = false;

  // In streams that never have any data, and do push(null) right away,
  // the consumer can miss the 'end' event if they do some I/O before
  // consuming the stream.  So, we don't emit('end') until some reading
  // happens.
  this.calledRead = false;

  // a flag to be able to tell if the onwrite cb is called immediately,
  // or on a later tick.  We set this to true at first, becuase any
  // actions that shouldn't happen until "later" should generally also
  // not happen before the first write call.
  this.sync = true;

  // whenever we return null, then we set a flag to say
  // that we're awaiting a 'readable' event emission.
  this.needReadable = false;
  this.emittedReadable = false;
  this.readableListening = false;


  // object stream flag. Used to make read(n) ignore n and to
  // make all the buffer merging and length checks go away
  this.objectMode = !!options.objectMode;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

  // when piping, we only care about 'readable' events that happen
  // after read()ing all the bytes and not getting any pushback.
  this.ranOut = false;

  // the number of writers that are awaiting a drain event in .pipe()s
  this.awaitDrain = 0;

  // if true, a maybeReadMore has been scheduled
  this.readingMore = false;

  this.decoder = null;
  this.encoding = null;
  if (options.encoding) {
    if (!StringDecoder)
      StringDecoder = require('string_decoder').StringDecoder;
    this.decoder = new StringDecoder(options.encoding);
    this.encoding = options.encoding;
  }
}

function Readable(options) {
  if (!(this instanceof Readable))
    return new Readable(options);

  this._readableState = new ReadableState(options, this);

  // legacy
  this.readable = true;

  Stream.call(this);
}

// Manually shove something into the read() buffer.
// This returns true if the highWaterMark has not been hit yet,
// similar to how Writable.write() returns true if you should
// write() some more.
Readable.prototype.push = function(chunk, encoding) {
  var state = this._readableState;

  if (typeof chunk === 'string' && !state.objectMode) {
    encoding = encoding || state.defaultEncoding;
    if (encoding !== state.encoding) {
      chunk = new Buffer(chunk, encoding);
      encoding = '';
    }
  }

  return readableAddChunk(this, state, chunk, encoding, false);
};

// Unshift should *always* be something directly out of read()
Readable.prototype.unshift = function(chunk) {
  var state = this._readableState;
  return readableAddChunk(this, state, chunk, '', true);
};

function readableAddChunk(stream, state, chunk, encoding, addToFront) {
  var er = chunkInvalid(state, chunk);
  if (er) {
    stream.emit('error', er);
  } else if (chunk === null || chunk === undefined) {
    state.reading = false;
    if (!state.ended)
      onEofChunk(stream, state);
  } else if (state.objectMode || chunk && chunk.length > 0) {
    if (state.ended && !addToFront) {
      var e = new Error('stream.push() after EOF');
      stream.emit('error', e);
    } else if (state.endEmitted && addToFront) {
      var e = new Error('stream.unshift() after end event');
      stream.emit('error', e);
    } else {
      if (state.decoder && !addToFront && !encoding)
        chunk = state.decoder.write(chunk);

      // update the buffer info.
      state.length += state.objectMode ? 1 : chunk.length;
      if (addToFront) {
        state.buffer.unshift(chunk);
      } else {
        state.reading = false;
        state.buffer.push(chunk);
      }

      if (state.needReadable)
        emitReadable(stream);

      maybeReadMore(stream, state);
    }
  } else if (!addToFront) {
    state.reading = false;
  }

  return needMoreData(state);
}



// if it's past the high water mark, we can push in some more.
// Also, if we have no data yet, we can stand some
// more bytes.  This is to work around cases where hwm=0,
// such as the repl.  Also, if the push() triggered a
// readable event, and the user called read(largeNumber) such that
// needReadable was set, then we ought to push more, so that another
// 'readable' event will be triggered.
function needMoreData(state) {
  return !state.ended &&
         (state.needReadable ||
          state.length < state.highWaterMark ||
          state.length === 0);
}

// backwards compatibility.
Readable.prototype.setEncoding = function(enc) {
  if (!StringDecoder)
    StringDecoder = require('string_decoder').StringDecoder;
  this._readableState.decoder = new StringDecoder(enc);
  this._readableState.encoding = enc;
};

// Don't raise the hwm > 128MB
var MAX_HWM = 0x800000;
function roundUpToNextPowerOf2(n) {
  if (n >= MAX_HWM) {
    n = MAX_HWM;
  } else {
    // Get the next highest power of 2
    n--;
    for (var p = 1; p < 32; p <<= 1) n |= n >> p;
    n++;
  }
  return n;
}

function howMuchToRead(n, state) {
  if (state.length === 0 && state.ended)
    return 0;

  if (state.objectMode)
    return n === 0 ? 0 : 1;

  if (isNaN(n) || n === null) {
    // only flow one buffer at a time
    if (state.flowing && state.buffer.length)
      return state.buffer[0].length;
    else
      return state.length;
  }

  if (n <= 0)
    return 0;

  // If we're asking for more than the target buffer level,
  // then raise the water mark.  Bump up to the next highest
  // power of 2, to prevent increasing it excessively in tiny
  // amounts.
  if (n > state.highWaterMark)
    state.highWaterMark = roundUpToNextPowerOf2(n);

  // don't have that much.  return null, unless we've ended.
  if (n > state.length) {
    if (!state.ended) {
      state.needReadable = true;
      return 0;
    } else
      return state.length;
  }

  return n;
}

// you can override either this method, or the async _read(n) below.
Readable.prototype.read = function(n) {
  var state = this._readableState;
  state.calledRead = true;
  var nOrig = n;

  if (typeof n !== 'number' || n > 0)
    state.emittedReadable = false;

  // if we're doing read(0) to trigger a readable event, but we
  // already have a bunch of data in the buffer, then just trigger
  // the 'readable' event and move on.
  if (n === 0 &&
      state.needReadable &&
      (state.length >= state.highWaterMark || state.ended)) {
    emitReadable(this);
    return null;
  }

  n = howMuchToRead(n, state);

  // if we've ended, and we're now clear, then finish it up.
  if (n === 0 && state.ended) {
    if (state.length === 0)
      endReadable(this);
    return null;
  }

  // All the actual chunk generation logic needs to be
  // *below* the call to _read.  The reason is that in certain
  // synthetic stream cases, such as passthrough streams, _read
  // may be a completely synchronous operation which may change
  // the state of the read buffer, providing enough data when
  // before there was *not* enough.
  //
  // So, the steps are:
  // 1. Figure out what the state of things will be after we do
  // a read from the buffer.
  //
  // 2. If that resulting state will trigger a _read, then call _read.
  // Note that this may be asynchronous, or synchronous.  Yes, it is
  // deeply ugly to write APIs this way, but that still doesn't mean
  // that the Readable class should behave improperly, as streams are
  // designed to be sync/async agnostic.
  // Take note if the _read call is sync or async (ie, if the read call
  // has returned yet), so that we know whether or not it's safe to emit
  // 'readable' etc.
  //
  // 3. Actually pull the requested chunks out of the buffer and return.

  // if we need a readable event, then we need to do some reading.
  var doRead = state.needReadable;

  // if we currently have less than the highWaterMark, then also read some
  if (state.length - n <= state.highWaterMark)
    doRead = true;

  // however, if we've ended, then there's no point, and if we're already
  // reading, then it's unnecessary.
  if (state.ended || state.reading)
    doRead = false;

  if (doRead) {
    state.reading = true;
    state.sync = true;
    // if the length is currently zero, then we *need* a readable event.
    if (state.length === 0)
      state.needReadable = true;
    // call internal read method
    this._read(state.highWaterMark);
    state.sync = false;
  }

  // If _read called its callback synchronously, then `reading`
  // will be false, and we need to re-evaluate how much data we
  // can return to the user.
  if (doRead && !state.reading)
    n = howMuchToRead(nOrig, state);

  var ret;
  if (n > 0)
    ret = fromList(n, state);
  else
    ret = null;

  if (ret === null) {
    state.needReadable = true;
    n = 0;
  }

  state.length -= n;

  // If we have nothing in the buffer, then we want to know
  // as soon as we *do* get something into the buffer.
  if (state.length === 0 && !state.ended)
    state.needReadable = true;

  // If we happened to read() exactly the remaining amount in the
  // buffer, and the EOF has been seen at this point, then make sure
  // that we emit 'end' on the very next tick.
  if (state.ended && !state.endEmitted && state.length === 0)
    endReadable(this);

  return ret;
};

function chunkInvalid(state, chunk) {
  var er = null;
  if (!Buffer.isBuffer(chunk) &&
      'string' !== typeof chunk &&
      chunk !== null &&
      chunk !== undefined &&
      !state.objectMode &&
      !er) {
    er = new TypeError('Invalid non-string/buffer chunk');
  }
  return er;
}


function onEofChunk(stream, state) {
  if (state.decoder && !state.ended) {
    var chunk = state.decoder.end();
    if (chunk && chunk.length) {
      state.buffer.push(chunk);
      state.length += state.objectMode ? 1 : chunk.length;
    }
  }
  state.ended = true;

  // if we've ended and we have some data left, then emit
  // 'readable' now to make sure it gets picked up.
  if (state.length > 0)
    emitReadable(stream);
  else
    endReadable(stream);
}

// Don't emit readable right away in sync mode, because this can trigger
// another read() call => stack overflow.  This way, it might trigger
// a nextTick recursion warning, but that's not so bad.
function emitReadable(stream) {
  var state = stream._readableState;
  state.needReadable = false;
  if (state.emittedReadable)
    return;

  state.emittedReadable = true;
  if (state.sync)
    setImmediate(function() {
      emitReadable_(stream);
    });
  else
    emitReadable_(stream);
}

function emitReadable_(stream) {
  stream.emit('readable');
}


// at this point, the user has presumably seen the 'readable' event,
// and called read() to consume some data.  that may have triggered
// in turn another _read(n) call, in which case reading = true if
// it's in progress.
// However, if we're not ended, or reading, and the length < hwm,
// then go ahead and try to read some more preemptively.
function maybeReadMore(stream, state) {
  if (!state.readingMore) {
    state.readingMore = true;
    setImmediate(function() {
      maybeReadMore_(stream, state);
    });
  }
}

function maybeReadMore_(stream, state) {
  var len = state.length;
  while (!state.reading && !state.flowing && !state.ended &&
         state.length < state.highWaterMark) {
    stream.read(0);
    if (len === state.length)
      // didn't get any data, stop spinning.
      break;
    else
      len = state.length;
  }
  state.readingMore = false;
}

// abstract method.  to be overridden in specific implementation classes.
// call cb(er, data) where data is <= n in length.
// for virtual (non-string, non-buffer) streams, "length" is somewhat
// arbitrary, and perhaps not very meaningful.
Readable.prototype._read = function(n) {
  this.emit('error', new Error('not implemented'));
};

Readable.prototype.pipe = function(dest, pipeOpts) {
  var src = this;
  var state = this._readableState;

  switch (state.pipesCount) {
    case 0:
      state.pipes = dest;
      break;
    case 1:
      state.pipes = [state.pipes, dest];
      break;
    default:
      state.pipes.push(dest);
      break;
  }
  state.pipesCount += 1;

  var doEnd = (!pipeOpts || pipeOpts.end !== false) &&
              dest !== process.stdout &&
              dest !== process.stderr;

  var endFn = doEnd ? onend : cleanup;
  if (state.endEmitted)
    setImmediate(endFn);
  else
    src.once('end', endFn);

  dest.on('unpipe', onunpipe);
  function onunpipe(readable) {
    if (readable !== src) return;
    cleanup();
  }

  function onend() {
    dest.end();
  }

  // when the dest drains, it reduces the awaitDrain counter
  // on the source.  This would be more elegant with a .once()
  // handler in flow(), but adding and removing repeatedly is
  // too slow.
  var ondrain = pipeOnDrain(src);
  dest.on('drain', ondrain);

  function cleanup() {
    // cleanup event handlers once the pipe is broken
    dest.removeListener('close', onclose);
    dest.removeListener('finish', onfinish);
    dest.removeListener('drain', ondrain);
    dest.removeListener('error', onerror);
    dest.removeListener('unpipe', onunpipe);
    src.removeListener('end', onend);
    src.removeListener('end', cleanup);

    // if the reader is waiting for a drain event from this
    // specific writer, then it would cause it to never start
    // flowing again.
    // So, if this is awaiting a drain, then we just call it now.
    // If we don't know, then assume that we are waiting for one.
    if (!dest._writableState || dest._writableState.needDrain)
      ondrain();
  }

  // if the dest has an error, then stop piping into it.
  // however, don't suppress the throwing behavior for this.
  // check for listeners before emit removes one-time listeners.
  var errListeners = EE.listenerCount(dest, 'error');
  function onerror(er) {
    unpipe();
    if (errListeners === 0 && EE.listenerCount(dest, 'error') === 0)
      dest.emit('error', er);
  }
  dest.once('error', onerror);

  // Both close and finish should trigger unpipe, but only once.
  function onclose() {
    dest.removeListener('finish', onfinish);
    unpipe();
  }
  dest.once('close', onclose);
  function onfinish() {
    dest.removeListener('close', onclose);
    unpipe();
  }
  dest.once('finish', onfinish);

  function unpipe() {
    src.unpipe(dest);
  }

  // tell the dest that it's being piped to
  dest.emit('pipe', src);

  // start the flow if it hasn't been started already.
  if (!state.flowing) {
    // the handler that waits for readable events after all
    // the data gets sucked out in flow.
    // This would be easier to follow with a .once() handler
    // in flow(), but that is too slow.
    this.on('readable', pipeOnReadable);

    state.flowing = true;
    setImmediate(function() {
      flow(src);
    });
  }

  return dest;
};

function pipeOnDrain(src) {
  return function() {
    var dest = this;
    var state = src._readableState;
    state.awaitDrain--;
    if (state.awaitDrain === 0)
      flow(src);
  };
}

function flow(src) {
  var state = src._readableState;
  var chunk;
  state.awaitDrain = 0;

  function write(dest, i, list) {
    var written = dest.write(chunk);
    if (false === written) {
      state.awaitDrain++;
    }
  }

  while (state.pipesCount && null !== (chunk = src.read())) {

    if (state.pipesCount === 1)
      write(state.pipes, 0, null);
    else
      forEach(state.pipes, write);

    src.emit('data', chunk);

    // if anyone needs a drain, then we have to wait for that.
    if (state.awaitDrain > 0)
      return;
  }

  // if every destination was unpiped, either before entering this
  // function, or in the while loop, then stop flowing.
  //
  // NB: This is a pretty rare edge case.
  if (state.pipesCount === 0) {
    state.flowing = false;

    // if there were data event listeners added, then switch to old mode.
    if (EE.listenerCount(src, 'data') > 0)
      emitDataEvents(src);
    return;
  }

  // at this point, no one needed a drain, so we just ran out of data
  // on the next readable event, start it over again.
  state.ranOut = true;
}

function pipeOnReadable() {
  if (this._readableState.ranOut) {
    this._readableState.ranOut = false;
    flow(this);
  }
}


Readable.prototype.unpipe = function(dest) {
  var state = this._readableState;

  // if we're not piping anywhere, then do nothing.
  if (state.pipesCount === 0)
    return this;

  // just one destination.  most common case.
  if (state.pipesCount === 1) {
    // passed in one, but it's not the right one.
    if (dest && dest !== state.pipes)
      return this;

    if (!dest)
      dest = state.pipes;

    // got a match.
    state.pipes = null;
    state.pipesCount = 0;
    this.removeListener('readable', pipeOnReadable);
    state.flowing = false;
    if (dest)
      dest.emit('unpipe', this);
    return this;
  }

  // slow case. multiple pipe destinations.

  if (!dest) {
    // remove all.
    var dests = state.pipes;
    var len = state.pipesCount;
    state.pipes = null;
    state.pipesCount = 0;
    this.removeListener('readable', pipeOnReadable);
    state.flowing = false;

    for (var i = 0; i < len; i++)
      dests[i].emit('unpipe', this);
    return this;
  }

  // try to find the right one.
  var i = indexOf(state.pipes, dest);
  if (i === -1)
    return this;

  state.pipes.splice(i, 1);
  state.pipesCount -= 1;
  if (state.pipesCount === 1)
    state.pipes = state.pipes[0];

  dest.emit('unpipe', this);

  return this;
};

// set up data events if they are asked for
// Ensure readable listeners eventually get something
Readable.prototype.on = function(ev, fn) {
  var res = Stream.prototype.on.call(this, ev, fn);

  if (ev === 'data' && !this._readableState.flowing)
    emitDataEvents(this);

  if (ev === 'readable' && this.readable) {
    var state = this._readableState;
    if (!state.readableListening) {
      state.readableListening = true;
      state.emittedReadable = false;
      state.needReadable = true;
      if (!state.reading) {
        this.read(0);
      } else if (state.length) {
        emitReadable(this, state);
      }
    }
  }

  return res;
};
Readable.prototype.addListener = Readable.prototype.on;

// pause() and resume() are remnants of the legacy readable stream API
// If the user uses them, then switch into old mode.
Readable.prototype.resume = function() {
  emitDataEvents(this);
  this.read(0);
  this.emit('resume');
};

Readable.prototype.pause = function() {
  emitDataEvents(this, true);
  this.emit('pause');
};

function emitDataEvents(stream, startPaused) {
  var state = stream._readableState;

  if (state.flowing) {
    // https://github.com/isaacs/readable-stream/issues/16
    throw new Error('Cannot switch to old mode now.');
  }

  var paused = startPaused || false;
  var readable = false;

  // convert to an old-style stream.
  stream.readable = true;
  stream.pipe = Stream.prototype.pipe;
  stream.on = stream.addListener = Stream.prototype.on;

  stream.on('readable', function() {
    readable = true;

    var c;
    while (!paused && (null !== (c = stream.read())))
      stream.emit('data', c);

    if (c === null) {
      readable = false;
      stream._readableState.needReadable = true;
    }
  });

  stream.pause = function() {
    paused = true;
    this.emit('pause');
  };

  stream.resume = function() {
    paused = false;
    if (readable)
      setImmediate(function() {
        stream.emit('readable');
      });
    else
      this.read(0);
    this.emit('resume');
  };

  // now make it start, just in case it hadn't already.
  stream.emit('readable');
}

// wrap an old-style stream as the async data source.
// This is *not* part of the readable stream interface.
// It is an ugly unfortunate mess of history.
Readable.prototype.wrap = function(stream) {
  var state = this._readableState;
  var paused = false;

  var self = this;
  stream.on('end', function() {
    if (state.decoder && !state.ended) {
      var chunk = state.decoder.end();
      if (chunk && chunk.length)
        self.push(chunk);
    }

    self.push(null);
  });

  stream.on('data', function(chunk) {
    if (state.decoder)
      chunk = state.decoder.write(chunk);
    if (!chunk || !state.objectMode && !chunk.length)
      return;

    var ret = self.push(chunk);
    if (!ret) {
      paused = true;
      stream.pause();
    }
  });

  // proxy all the other methods.
  // important when wrapping filters and duplexes.
  for (var i in stream) {
    if (typeof stream[i] === 'function' &&
        typeof this[i] === 'undefined') {
      this[i] = function(method) { return function() {
        return stream[method].apply(stream, arguments);
      }}(i);
    }
  }

  // proxy certain important events.
  var events = ['error', 'close', 'destroy', 'pause', 'resume'];
  forEach(events, function(ev) {
    stream.on(ev, function (x) {
      return self.emit.apply(self, ev, x);
    });
  });

  // when we try to consume some more bytes, simply unpause the
  // underlying stream.
  self._read = function(n) {
    if (paused) {
      paused = false;
      stream.resume();
    }
  };

  return self;
};



// exposed for testing purposes only.
Readable._fromList = fromList;

// Pluck off n bytes from an array of buffers.
// Length is the combined lengths of all the buffers in the list.
function fromList(n, state) {
  var list = state.buffer;
  var length = state.length;
  var stringMode = !!state.decoder;
  var objectMode = !!state.objectMode;
  var ret;

  // nothing in the list, definitely empty.
  if (list.length === 0)
    return null;

  if (length === 0)
    ret = null;
  else if (objectMode)
    ret = list.shift();
  else if (!n || n >= length) {
    // read it all, truncate the array.
    if (stringMode)
      ret = list.join('');
    else
      ret = Buffer.concat(list, length);
    list.length = 0;
  } else {
    // read just some of it.
    if (n < list[0].length) {
      // just take a part of the first list item.
      // slice is the same for buffers and strings.
      var buf = list[0];
      ret = buf.slice(0, n);
      list[0] = buf.slice(n);
    } else if (n === list[0].length) {
      // first list is a perfect match
      ret = list.shift();
    } else {
      // complex case.
      // we have enough to cover it, but it spans past the first buffer.
      if (stringMode)
        ret = '';
      else
        ret = new Buffer(n);

      var c = 0;
      for (var i = 0, l = list.length; i < l && c < n; i++) {
        var buf = list[0];
        var cpy = Math.min(n - c, buf.length);

        if (stringMode)
          ret += buf.slice(0, cpy);
        else
          buf.copy(ret, c, 0, cpy);

        if (cpy < buf.length)
          list[0] = buf.slice(cpy);
        else
          list.shift();

        c += cpy;
      }
    }
  }

  return ret;
}

function endReadable(stream) {
  var state = stream._readableState;

  // If we get here before consuming all the bytes, then that is a
  // bug in node.  Should never happen.
  if (state.length > 0)
    throw new Error('endReadable called on non-empty stream');

  if (!state.endEmitted && state.calledRead) {
    state.ended = true;
    setImmediate(function() {
      // Check that we didn't get one last unshift.
      if (!state.endEmitted && state.length === 0) {
        state.endEmitted = true;
        stream.readable = false;
        stream.emit('end');
      }
    });
  }
}

function forEach (xs, f) {
  for (var i = 0, l = xs.length; i < l; i++) {
    f(xs[i], i);
  }
}

function indexOf (xs, x) {
  for (var i = 0, l = xs.length; i < l; i++) {
    if (xs[i] === x) return i;
  }
  return -1;
}

}).call(this,require("/root/node_modules/bitcore/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"))
},{"./index.js":45,"/root/node_modules/bitcore/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":42,"buffer":31,"events":40,"inherits":41,"process/browser.js":46,"string_decoder":51}],49:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// a transform stream is a readable/writable stream where you do
// something with the data.  Sometimes it's called a "filter",
// but that's not a great name for it, since that implies a thing where
// some bits pass through, and others are simply ignored.  (That would
// be a valid example of a transform, of course.)
//
// While the output is causally related to the input, it's not a
// necessarily symmetric or synchronous transformation.  For example,
// a zlib stream might take multiple plain-text writes(), and then
// emit a single compressed chunk some time in the future.
//
// Here's how this works:
//
// The Transform stream has all the aspects of the readable and writable
// stream classes.  When you write(chunk), that calls _write(chunk,cb)
// internally, and returns false if there's a lot of pending writes
// buffered up.  When you call read(), that calls _read(n) until
// there's enough pending readable data buffered up.
//
// In a transform stream, the written data is placed in a buffer.  When
// _read(n) is called, it transforms the queued up data, calling the
// buffered _write cb's as it consumes chunks.  If consuming a single
// written chunk would result in multiple output chunks, then the first
// outputted bit calls the readcb, and subsequent chunks just go into
// the read buffer, and will cause it to emit 'readable' if necessary.
//
// This way, back-pressure is actually determined by the reading side,
// since _read has to be called to start processing a new chunk.  However,
// a pathological inflate type of transform can cause excessive buffering
// here.  For example, imagine a stream where every byte of input is
// interpreted as an integer from 0-255, and then results in that many
// bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
// 1kb of data being output.  In this case, you could write a very small
// amount of input, and end up with a very large amount of output.  In
// such a pathological inflating mechanism, there'd be no way to tell
// the system to stop doing the transform.  A single 4MB write could
// cause the system to run out of memory.
//
// However, even in such a pathological case, only a single written chunk
// would be consumed, and then the rest would wait (un-transformed) until
// the results of the previous transformed chunk were consumed.

module.exports = Transform;

var Duplex = require('./duplex.js');
var inherits = require('inherits');
inherits(Transform, Duplex);


function TransformState(options, stream) {
  this.afterTransform = function(er, data) {
    return afterTransform(stream, er, data);
  };

  this.needTransform = false;
  this.transforming = false;
  this.writecb = null;
  this.writechunk = null;
}

function afterTransform(stream, er, data) {
  var ts = stream._transformState;
  ts.transforming = false;

  var cb = ts.writecb;

  if (!cb)
    return stream.emit('error', new Error('no writecb in Transform class'));

  ts.writechunk = null;
  ts.writecb = null;

  if (data !== null && data !== undefined)
    stream.push(data);

  if (cb)
    cb(er);

  var rs = stream._readableState;
  rs.reading = false;
  if (rs.needReadable || rs.length < rs.highWaterMark) {
    stream._read(rs.highWaterMark);
  }
}


function Transform(options) {
  if (!(this instanceof Transform))
    return new Transform(options);

  Duplex.call(this, options);

  var ts = this._transformState = new TransformState(options, this);

  // when the writable side finishes, then flush out anything remaining.
  var stream = this;

  // start out asking for a readable event once data is transformed.
  this._readableState.needReadable = true;

  // we have implemented the _read method, and done the other things
  // that Readable wants before the first _read call, so unset the
  // sync guard flag.
  this._readableState.sync = false;

  this.once('finish', function() {
    if ('function' === typeof this._flush)
      this._flush(function(er) {
        done(stream, er);
      });
    else
      done(stream);
  });
}

Transform.prototype.push = function(chunk, encoding) {
  this._transformState.needTransform = false;
  return Duplex.prototype.push.call(this, chunk, encoding);
};

// This is the part where you do stuff!
// override this function in implementation classes.
// 'chunk' is an input chunk.
//
// Call `push(newChunk)` to pass along transformed output
// to the readable side.  You may call 'push' zero or more times.
//
// Call `cb(err)` when you are done with this chunk.  If you pass
// an error, then that'll put the hurt on the whole operation.  If you
// never call cb(), then you'll never get another chunk.
Transform.prototype._transform = function(chunk, encoding, cb) {
  throw new Error('not implemented');
};

Transform.prototype._write = function(chunk, encoding, cb) {
  var ts = this._transformState;
  ts.writecb = cb;
  ts.writechunk = chunk;
  ts.writeencoding = encoding;
  if (!ts.transforming) {
    var rs = this._readableState;
    if (ts.needTransform ||
        rs.needReadable ||
        rs.length < rs.highWaterMark)
      this._read(rs.highWaterMark);
  }
};

// Doesn't matter what the args are here.
// _transform does all the work.
// That we got here means that the readable side wants more data.
Transform.prototype._read = function(n) {
  var ts = this._transformState;

  if (ts.writechunk && ts.writecb && !ts.transforming) {
    ts.transforming = true;
    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
  } else {
    // mark that we need a transform, so that any data that comes in
    // will get processed, now that we've asked for it.
    ts.needTransform = true;
  }
};


function done(stream, er) {
  if (er)
    return stream.emit('error', er);

  // if there's nothing in the write buffer, then that means
  // that nothing more will ever be provided
  var ws = stream._writableState;
  var rs = stream._readableState;
  var ts = stream._transformState;

  if (ws.length)
    throw new Error('calling transform done when ws.length != 0');

  if (ts.transforming)
    throw new Error('calling transform done when still transforming');

  return stream.push(null);
}

},{"./duplex.js":44,"inherits":41}],50:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// A bit simpler than readable streams.
// Implement an async ._write(chunk, cb), and it'll handle all
// the drain event emission and buffering.

module.exports = Writable;
Writable.WritableState = WritableState;

var isUint8Array = typeof Uint8Array !== 'undefined'
  ? function (x) { return x instanceof Uint8Array }
  : function (x) {
    return x && x.constructor && x.constructor.name === 'Uint8Array'
  }
;
var isArrayBuffer = typeof ArrayBuffer !== 'undefined'
  ? function (x) { return x instanceof ArrayBuffer }
  : function (x) {
    return x && x.constructor && x.constructor.name === 'ArrayBuffer'
  }
;

var inherits = require('inherits');
var Stream = require('./index.js');
var setImmediate = require('process/browser.js').nextTick;
var Buffer = require('buffer').Buffer;

inherits(Writable, Stream);

function WriteReq(chunk, encoding, cb) {
  this.chunk = chunk;
  this.encoding = encoding;
  this.callback = cb;
}

function WritableState(options, stream) {
  options = options || {};

  // the point at which write() starts returning false
  // Note: 0 is a valid value, means that we always return false if
  // the entire buffer is not flushed immediately on write()
  var hwm = options.highWaterMark;
  this.highWaterMark = (hwm || hwm === 0) ? hwm : 16 * 1024;

  // object stream flag to indicate whether or not this stream
  // contains buffers or objects.
  this.objectMode = !!options.objectMode;

  // cast to ints.
  this.highWaterMark = ~~this.highWaterMark;

  this.needDrain = false;
  // at the start of calling end()
  this.ending = false;
  // when end() has been called, and returned
  this.ended = false;
  // when 'finish' is emitted
  this.finished = false;

  // should we decode strings into buffers before passing to _write?
  // this is here so that some node-core streams can optimize string
  // handling at a lower level.
  var noDecode = options.decodeStrings === false;
  this.decodeStrings = !noDecode;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

  // not an actual buffer we keep track of, but a measurement
  // of how much we're waiting to get pushed to some underlying
  // socket or file.
  this.length = 0;

  // a flag to see when we're in the middle of a write.
  this.writing = false;

  // a flag to be able to tell if the onwrite cb is called immediately,
  // or on a later tick.  We set this to true at first, becuase any
  // actions that shouldn't happen until "later" should generally also
  // not happen before the first write call.
  this.sync = true;

  // a flag to know if we're processing previously buffered items, which
  // may call the _write() callback in the same tick, so that we don't
  // end up in an overlapped onwrite situation.
  this.bufferProcessing = false;

  // the callback that's passed to _write(chunk,cb)
  this.onwrite = function(er) {
    onwrite(stream, er);
  };

  // the callback that the user supplies to write(chunk,encoding,cb)
  this.writecb = null;

  // the amount that is being written when _write is called.
  this.writelen = 0;

  this.buffer = [];
}

function Writable(options) {
  // Writable ctor is applied to Duplexes, though they're not
  // instanceof Writable, they're instanceof Readable.
  if (!(this instanceof Writable) && !(this instanceof Stream.Duplex))
    return new Writable(options);

  this._writableState = new WritableState(options, this);

  // legacy.
  this.writable = true;

  Stream.call(this);
}

// Otherwise people can pipe Writable streams, which is just wrong.
Writable.prototype.pipe = function() {
  this.emit('error', new Error('Cannot pipe. Not readable.'));
};


function writeAfterEnd(stream, state, cb) {
  var er = new Error('write after end');
  // TODO: defer error events consistently everywhere, not just the cb
  stream.emit('error', er);
  setImmediate(function() {
    cb(er);
  });
}

// If we get something that is not a buffer, string, null, or undefined,
// and we're not in objectMode, then that's an error.
// Otherwise stream chunks are all considered to be of length=1, and the
// watermarks determine how many objects to keep in the buffer, rather than
// how many bytes or characters.
function validChunk(stream, state, chunk, cb) {
  var valid = true;
  if (!Buffer.isBuffer(chunk) &&
      'string' !== typeof chunk &&
      chunk !== null &&
      chunk !== undefined &&
      !state.objectMode) {
    var er = new TypeError('Invalid non-string/buffer chunk');
    stream.emit('error', er);
    setImmediate(function() {
      cb(er);
    });
    valid = false;
  }
  return valid;
}

Writable.prototype.write = function(chunk, encoding, cb) {
  var state = this._writableState;
  var ret = false;

  if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (!Buffer.isBuffer(chunk) && isUint8Array(chunk))
    chunk = new Buffer(chunk);
  if (isArrayBuffer(chunk) && typeof Uint8Array !== 'undefined')
    chunk = new Buffer(new Uint8Array(chunk));
  
  if (Buffer.isBuffer(chunk))
    encoding = 'buffer';
  else if (!encoding)
    encoding = state.defaultEncoding;

  if (typeof cb !== 'function')
    cb = function() {};

  if (state.ended)
    writeAfterEnd(this, state, cb);
  else if (validChunk(this, state, chunk, cb))
    ret = writeOrBuffer(this, state, chunk, encoding, cb);

  return ret;
};

function decodeChunk(state, chunk, encoding) {
  if (!state.objectMode &&
      state.decodeStrings !== false &&
      typeof chunk === 'string') {
    chunk = new Buffer(chunk, encoding);
  }
  return chunk;
}

// if we're already writing something, then just put this
// in the queue, and wait our turn.  Otherwise, call _write
// If we return false, then we need a drain event, so set that flag.
function writeOrBuffer(stream, state, chunk, encoding, cb) {
  chunk = decodeChunk(state, chunk, encoding);
  var len = state.objectMode ? 1 : chunk.length;

  state.length += len;

  var ret = state.length < state.highWaterMark;
  state.needDrain = !ret;

  if (state.writing)
    state.buffer.push(new WriteReq(chunk, encoding, cb));
  else
    doWrite(stream, state, len, chunk, encoding, cb);

  return ret;
}

function doWrite(stream, state, len, chunk, encoding, cb) {
  state.writelen = len;
  state.writecb = cb;
  state.writing = true;
  state.sync = true;
  stream._write(chunk, encoding, state.onwrite);
  state.sync = false;
}

function onwriteError(stream, state, sync, er, cb) {
  if (sync)
    setImmediate(function() {
      cb(er);
    });
  else
    cb(er);

  stream.emit('error', er);
}

function onwriteStateUpdate(state) {
  state.writing = false;
  state.writecb = null;
  state.length -= state.writelen;
  state.writelen = 0;
}

function onwrite(stream, er) {
  var state = stream._writableState;
  var sync = state.sync;
  var cb = state.writecb;

  onwriteStateUpdate(state);

  if (er)
    onwriteError(stream, state, sync, er, cb);
  else {
    // Check if we're actually ready to finish, but don't emit yet
    var finished = needFinish(stream, state);

    if (!finished && !state.bufferProcessing && state.buffer.length)
      clearBuffer(stream, state);

    if (sync) {
      setImmediate(function() {
        afterWrite(stream, state, finished, cb);
      });
    } else {
      afterWrite(stream, state, finished, cb);
    }
  }
}

function afterWrite(stream, state, finished, cb) {
  if (!finished)
    onwriteDrain(stream, state);
  cb();
  if (finished)
    finishMaybe(stream, state);
}

// Must force callback to be called on nextTick, so that we don't
// emit 'drain' before the write() consumer gets the 'false' return
// value, and has a chance to attach a 'drain' listener.
function onwriteDrain(stream, state) {
  if (state.length === 0 && state.needDrain) {
    state.needDrain = false;
    stream.emit('drain');
  }
}


// if there's something in the buffer waiting, then process it
function clearBuffer(stream, state) {
  state.bufferProcessing = true;

  for (var c = 0; c < state.buffer.length; c++) {
    var entry = state.buffer[c];
    var chunk = entry.chunk;
    var encoding = entry.encoding;
    var cb = entry.callback;
    var len = state.objectMode ? 1 : chunk.length;

    doWrite(stream, state, len, chunk, encoding, cb);

    // if we didn't call the onwrite immediately, then
    // it means that we need to wait until it does.
    // also, that means that the chunk and cb are currently
    // being processed, so move the buffer counter past them.
    if (state.writing) {
      c++;
      break;
    }
  }

  state.bufferProcessing = false;
  if (c < state.buffer.length)
    state.buffer = state.buffer.slice(c);
  else
    state.buffer.length = 0;
}

Writable.prototype._write = function(chunk, encoding, cb) {
  cb(new Error('not implemented'));
};

Writable.prototype.end = function(chunk, encoding, cb) {
  var state = this._writableState;

  if (typeof chunk === 'function') {
    cb = chunk;
    chunk = null;
    encoding = null;
  } else if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (typeof chunk !== 'undefined' && chunk !== null)
    this.write(chunk, encoding);

  // ignore unnecessary end() calls.
  if (!state.ending && !state.finished)
    endWritable(this, state, cb);
};


function needFinish(stream, state) {
  return (state.ending &&
          state.length === 0 &&
          !state.finished &&
          !state.writing);
}

function finishMaybe(stream, state) {
  var need = needFinish(stream, state);
  if (need) {
    state.finished = true;
    stream.emit('finish');
  }
  return need;
}

function endWritable(stream, state, cb) {
  state.ending = true;
  finishMaybe(stream, state);
  if (cb) {
    if (state.finished)
      setImmediate(cb);
    else
      stream.once('finish', cb);
  }
  state.ended = true;
}

},{"./index.js":45,"buffer":31,"inherits":41,"process/browser.js":46}],51:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var Buffer = require('buffer').Buffer;

function assertEncoding(encoding) {
  if (encoding && !Buffer.isEncoding(encoding)) {
    throw new Error('Unknown encoding: ' + encoding);
  }
}

var StringDecoder = exports.StringDecoder = function(encoding) {
  this.encoding = (encoding || 'utf8').toLowerCase().replace(/[-_]/, '');
  assertEncoding(encoding);
  switch (this.encoding) {
    case 'utf8':
      // CESU-8 represents each of Surrogate Pair by 3-bytes
      this.surrogateSize = 3;
      break;
    case 'ucs2':
    case 'utf16le':
      // UTF-16 represents each of Surrogate Pair by 2-bytes
      this.surrogateSize = 2;
      this.detectIncompleteChar = utf16DetectIncompleteChar;
      break;
    case 'base64':
      // Base-64 stores 3 bytes in 4 chars, and pads the remainder.
      this.surrogateSize = 3;
      this.detectIncompleteChar = base64DetectIncompleteChar;
      break;
    default:
      this.write = passThroughWrite;
      return;
  }

  this.charBuffer = new Buffer(6);
  this.charReceived = 0;
  this.charLength = 0;
};


StringDecoder.prototype.write = function(buffer) {
  var charStr = '';
  var offset = 0;

  // if our last write ended with an incomplete multibyte character
  while (this.charLength) {
    // determine how many remaining bytes this buffer has to offer for this char
    var i = (buffer.length >= this.charLength - this.charReceived) ?
                this.charLength - this.charReceived :
                buffer.length;

    // add the new bytes to the char buffer
    buffer.copy(this.charBuffer, this.charReceived, offset, i);
    this.charReceived += (i - offset);
    offset = i;

    if (this.charReceived < this.charLength) {
      // still not enough chars in this buffer? wait for more ...
      return '';
    }

    // get the character that was split
    charStr = this.charBuffer.slice(0, this.charLength).toString(this.encoding);

    // lead surrogate (D800-DBFF) is also the incomplete character
    var charCode = charStr.charCodeAt(charStr.length - 1);
    if (charCode >= 0xD800 && charCode <= 0xDBFF) {
      this.charLength += this.surrogateSize;
      charStr = '';
      continue;
    }
    this.charReceived = this.charLength = 0;

    // if there are no more bytes in this buffer, just emit our char
    if (i == buffer.length) return charStr;

    // otherwise cut off the characters end from the beginning of this buffer
    buffer = buffer.slice(i, buffer.length);
    break;
  }

  var lenIncomplete = this.detectIncompleteChar(buffer);

  var end = buffer.length;
  if (this.charLength) {
    // buffer the incomplete character bytes we got
    buffer.copy(this.charBuffer, 0, buffer.length - lenIncomplete, end);
    this.charReceived = lenIncomplete;
    end -= lenIncomplete;
  }

  charStr += buffer.toString(this.encoding, 0, end);

  var end = charStr.length - 1;
  var charCode = charStr.charCodeAt(end);
  // lead surrogate (D800-DBFF) is also the incomplete character
  if (charCode >= 0xD800 && charCode <= 0xDBFF) {
    var size = this.surrogateSize;
    this.charLength += size;
    this.charReceived += size;
    this.charBuffer.copy(this.charBuffer, size, 0, size);
    this.charBuffer.write(charStr.charAt(charStr.length - 1), this.encoding);
    return charStr.substring(0, end);
  }

  // or just emit the charStr
  return charStr;
};

StringDecoder.prototype.detectIncompleteChar = function(buffer) {
  // determine how many bytes we have to check at the end of this buffer
  var i = (buffer.length >= 3) ? 3 : buffer.length;

  // Figure out if one of the last i bytes of our buffer announces an
  // incomplete char.
  for (; i > 0; i--) {
    var c = buffer[buffer.length - i];

    // See http://en.wikipedia.org/wiki/UTF-8#Description

    // 110XXXXX
    if (i == 1 && c >> 5 == 0x06) {
      this.charLength = 2;
      break;
    }

    // 1110XXXX
    if (i <= 2 && c >> 4 == 0x0E) {
      this.charLength = 3;
      break;
    }

    // 11110XXX
    if (i <= 3 && c >> 3 == 0x1E) {
      this.charLength = 4;
      break;
    }
  }

  return i;
};

StringDecoder.prototype.end = function(buffer) {
  var res = '';
  if (buffer && buffer.length)
    res = this.write(buffer);

  if (this.charReceived) {
    var cr = this.charReceived;
    var buf = this.charBuffer;
    var enc = this.encoding;
    res += buf.slice(0, cr).toString(enc);
  }

  return res;
};

function passThroughWrite(buffer) {
  return buffer.toString(this.encoding);
}

function utf16DetectIncompleteChar(buffer) {
  var incomplete = this.charReceived = buffer.length % 2;
  this.charLength = incomplete ? 2 : 0;
  return incomplete;
}

function base64DetectIncompleteChar(buffer) {
  var incomplete = this.charReceived = buffer.length % 3;
  this.charLength = incomplete ? 3 : 0;
  return incomplete;
}

},{"buffer":31}],52:[function(require,module,exports){
module.exports=require(29)
},{}],53:[function(require,module,exports){
module.exports=require(30)
},{"./support/isBuffer":52,"/root/node_modules/bitcore/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":42,"inherits":41}],"aXRuS6":[function(require,module,exports){
(function (Buffer){
function BufferPut () {
  this.words = [];
  this.len = 0;
};
module.exports = BufferPut;

BufferPut.prototype.put = function(buf) {
  this.words.push({buffer: buf});
  this.len += buf.length;
  return this;
};

BufferPut.prototype.word8 = function(x) {
  this.words.push({bytes: 1, value: x});
  this.len += 1;
  return this;
};

BufferPut.prototype.floatle = function(x) {
  this.words.push({bytes: 'float', endian: 'little', value: x});
  this.len += 4;
  return this;
};

BufferPut.prototype.varint = function(i) {
  if(i < 0xFD) {
    this.word8(i);
  } else if(i <= 1<<16) {
    this.word8(0xFD);
    this.word16le(i);
  } else if(i <= 1<<32) {
    this.word8(0xFE);
    this.word32le(i);
  } else {
    this.word8(0xFF);
    this.word64le(i);
  }
};

[8, 16, 24, 32, 64].forEach(function(bits) {
  BufferPut.prototype['word'+bits+'be'] = function(x) {
    this.words.push({endian: 'big', bytes: bits / 8, value: x});
    this.len += bits / 8;
    return this;
  };

  BufferPut.prototype['word'+bits+'le'] = function(x) {
    this.words.push({endian: 'little', bytes: bits / 8, value: x});
    this.len += bits / 8;
    return this;
  };
});

BufferPut.prototype.pad = function(bytes) {
  this.words.push({endian: 'big', bytes: bytes, value: 0});
  this.len += bytes;
  return this;
};

BufferPut.prototype.length = function() {
  return this.len;
};

BufferPut.prototype.buffer = function () {
  var buf = new Buffer(this.len);
  var offset = 0;
  this.words.forEach(function(word) {
    if(word.buffer) {
      word.buffer.copy(buf, offset, 0);
      offset += word.buffer.length;
    } else if(word.bytes == 'float') {
      // s * f * 2^e
      var v = Math.abs(word.value);
      var s = (word.value >= 0) * 1;
      var e = Math.ceil(Math.log(v) / Math.LN2);
      var f = v / (1 << e);

      // s:1, e:7, f:23
      // [seeeeeee][efffffff][ffffffff][ffffffff]
      buf[offset++] = (s << 7) & ~~(e / 2);
      buf[offset++] = ((e & 1) << 7) & ~~(f / (1 << 16));
      buf[offset++] = 0;
      buf[offset++] = 0;
      offset += 4;
    } else {
      var big = word.endian === 'big';
      var ix = big ? [ (word.bytes - 1) * 8, -8 ] : [ 0, 8 ];
      for(var i=ix[0]; big ? i >= 0 : i < word.bytes * 8; i += ix[1]) {
        if(i >= 32) {
          buf[offset++] = Math.floor(word.value / Math.pow(2, i)) & 0xff;
        } else {
          buf[offset++] = (word.value >> i) & 0xff;
        }
      }
    }
  });
  return buf;
};

BufferPut.prototype.write = function(stream) {
  stream.write(this.buffer());
};

}).call(this,require("buffer").Buffer)
},{"buffer":31}],"bufferput":[function(require,module,exports){
module.exports=require('aXRuS6');
},{}],"buffers":[function(require,module,exports){
module.exports=require('OBo3aV');
},{}],"OBo3aV":[function(require,module,exports){
(function (Buffer){
module.exports = Buffers;

function Buffers (bufs) {
    if (!(this instanceof Buffers)) return new Buffers(bufs);
    this.buffers = bufs || [];
    this.length = this.buffers.reduce(function (size, buf) {
        return size + buf.length
    }, 0);
}

Buffers.prototype.push = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (!Buffer.isBuffer(arguments[i])) {
            throw new TypeError('Tried to push a non-buffer');
        }
    }
    
    for (var i = 0; i < arguments.length; i++) {
        var buf = arguments[i];
        this.buffers.push(buf);
        this.length += buf.length;
    }
    return this.length;
};

Buffers.prototype.unshift = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (!Buffer.isBuffer(arguments[i])) {
            throw new TypeError('Tried to unshift a non-buffer');
        }
    }
    
    for (var i = 0; i < arguments.length; i++) {
        var buf = arguments[i];
        this.buffers.unshift(buf);
        this.length += buf.length;
    }
    return this.length;
};

Buffers.prototype.copy = function (dst, dStart, start, end) {
    return this.slice(start, end).copy(dst, dStart, 0, end - start);
};

Buffers.prototype.splice = function (i, howMany) {
    var buffers = this.buffers;
    var index = i >= 0 ? i : this.length - i;
    var reps = [].slice.call(arguments, 2);
    
    if (howMany === undefined) {
        howMany = this.length - index;
    }
    else if (howMany > this.length - index) {
        howMany = this.length - index;
    }
    
    for (var i = 0; i < reps.length; i++) {
        this.length += reps[i].length;
    }
    
    var removed = new Buffers();
    var bytes = 0;
    
    var startBytes = 0;
    for (
        var ii = 0;
        ii < buffers.length && startBytes + buffers[ii].length < index;
        ii ++
    ) { startBytes += buffers[ii].length }
    
    if (index - startBytes > 0) {
        var start = index - startBytes;
        
        if (start + howMany < buffers[ii].length) {
            removed.push(buffers[ii].slice(start, start + howMany));
            
            var orig = buffers[ii];
            //var buf = new Buffer(orig.length - howMany);
            var buf0 = new Buffer(start);
            for (var i = 0; i < start; i++) {
                buf0[i] = orig[i];
            }
            
            var buf1 = new Buffer(orig.length - start - howMany);
            for (var i = start + howMany; i < orig.length; i++) {
                buf1[ i - howMany - start ] = orig[i]
            }
            
            if (reps.length > 0) {
                var reps_ = reps.slice();
                reps_.unshift(buf0);
                reps_.push(buf1);
                buffers.splice.apply(buffers, [ ii, 1 ].concat(reps_));
                ii += reps_.length;
                reps = [];
            }
            else {
                buffers.splice(ii, 1, buf0, buf1);
                //buffers[ii] = buf;
                ii += 2;
            }
        }
        else {
            removed.push(buffers[ii].slice(start));
            buffers[ii] = buffers[ii].slice(0, start);
            ii ++;
        }
    }
    
    if (reps.length > 0) {
        buffers.splice.apply(buffers, [ ii, 0 ].concat(reps));
        ii += reps.length;
    }
    
    while (removed.length < howMany) {
        var buf = buffers[ii];
        var len = buf.length;
        var take = Math.min(len, howMany - removed.length);
        
        if (take === len) {
            removed.push(buf);
            buffers.splice(ii, 1);
        }
        else {
            removed.push(buf.slice(0, take));
            buffers[ii] = buffers[ii].slice(take);
        }
    }
    
    this.length -= removed.length;
    
    return removed;
};
 
Buffers.prototype.slice = function (i, j) {
    var buffers = this.buffers;
    if (j === undefined) j = this.length;
    if (i === undefined) i = 0;
    
    if (j > this.length) j = this.length;
    
    var startBytes = 0;
    for (
        var si = 0;
        si < buffers.length && startBytes + buffers[si].length <= i;
        si ++
    ) { startBytes += buffers[si].length }
    
    var target = new Buffer(j - i);
    
    var ti = 0;
    for (var ii = si; ti < j - i && ii < buffers.length; ii++) {
        var len = buffers[ii].length;
        
        var start = ti === 0 ? i - startBytes : 0;
        var end = ti + len >= j - i
            ? Math.min(start + (j - i) - ti, len)
            : len
        ;
        
        buffers[ii].copy(target, ti, start, end);
        ti += end - start;
    }
    
    return target;
};

Buffers.prototype.pos = function (i) {
    if (i < 0 || i >= this.length) throw new Error('oob');
    var l = i, bi = 0, bu = null;
    for (;;) {
        bu = this.buffers[bi];
        if (l < bu.length) {
            return {buf: bi, offset: l};
        } else {
            l -= bu.length;
        }
        bi++;
    }
};

Buffers.prototype.get = function get (i) {
    var pos = this.pos(i);

    return this.buffers[pos.buf].get(pos.offset);
};

Buffers.prototype.set = function set (i, b) {
    var pos = this.pos(i);

    return this.buffers[pos.buf].set(pos.offset, b);
};

Buffers.prototype.indexOf = function (needle, offset) {
    if ("string" === typeof needle) {
        needle = new Buffer(needle);
    } else if (needle instanceof Buffer) {
        // already a buffer
    } else {
        throw new Error('Invalid type for a search string');
    }

    if (!needle.length) {
        return 0;
    }

    if (!this.length) {
        return -1;
    }

    var i = 0, j = 0, match = 0, mstart, pos = 0;

    // start search from a particular point in the virtual buffer
    if (offset) {
        var p = this.pos(offset);
        i = p.buf;
        j = p.offset;
        pos = offset;
    }

    // for each character in virtual buffer
    for (;;) {
        while (j >= this.buffers[i].length) {
            j = 0;
            i++;

            if (i >= this.buffers.length) {
                // search string not found
                return -1;
            }
        }

        var char = this.buffers[i][j];

        if (char == needle[match]) {
            // keep track where match started
            if (match == 0) {
                mstart = {
                    i: i,
                    j: j,
                    pos: pos
                };
            }
            match++;
            if (match == needle.length) {
                // full match
                return mstart.pos;
            }
        } else if (match != 0) {
            // a partial match ended, go back to match starting position
            // this will continue the search at the next character
            i = mstart.i;
            j = mstart.j;
            pos = mstart.pos;
            match = 0;
        }

        j++;
        pos++;
    }
};

Buffers.prototype.toBuffer = function() {
    return this.slice();
}

Buffers.prototype.toString = function(encoding, start, end) {
    return this.slice(start, end).toString(encoding);
}

}).call(this,require("buffer").Buffer)
},{"buffer":31}],58:[function(require,module,exports){
(function (Buffer){
/**
 * Simple synchronous parser based on node-binary.
 */

function Parser(buffer) {
  this.subject = buffer;
  this.pos = 0;
};

Parser.prototype.buffer = function buffer(len) {
  var buf = this.subject.slice(this.pos, this.pos + len);
  this.pos += len;
  return buf;
};

Parser.prototype.search = function search(needle) {
  var len;

  if ("string" === typeof needle || Buffer.isBuffer(needle)) {
    // TODO: Slicing is probably too slow
    len = this.subject.slice(this.pos).indexOf(needle);
    if (len !== -1) {
      this.pos += len + needle.length;
    }
    return len;
  }
  if ("number" === typeof needle) {
    needle = needle & 0xff;
    // Search for single byte
    for (var i = this.pos, l = this.subject.length; i < l; i++) {
      if (this.subject[i] == needle) {
        len = i - this.pos;
        this.pos = i + 1;
        return len;
      }
    }
    return -1;
  }
};

/**
 * Like search(), but returns the skipped bytes
 */
Parser.prototype.scan = function scan(needle) {
  var startPos = this.pos;
  var len = this.search(needle);
  if (len !== -1) {
    return this.subject.slice(startPos, startPos + len);
  } else {
    throw new Error('No match');
  }
};

Parser.prototype.eof = function eof() {
  return this.pos >= this.subject.length;
};

// convert byte strings to unsigned little endian numbers
function decodeLEu(bytes) {
  var acc = 0;
  for (var i = 0; i < bytes.length; i++) {
    acc += Math.pow(256, i) * bytes[i];
  }
  return acc;
}

// convert byte strings to unsigned big endian numbers
function decodeBEu(bytes) {
  var acc = 0;
  for (var i = 0; i < bytes.length; i++) {
    acc += Math.pow(256, bytes.length - i - 1) * bytes[i];
  }
  return acc;
}

// convert byte strings to signed big endian numbers
function decodeBEs(bytes) {
  var val = decodeBEu(bytes);
  if ((bytes[0] & 0x80) == 0x80) {
    val -= Math.pow(256, bytes.length);
  }
  return val;
}

// convert byte strings to signed little endian numbers
function decodeLEs(bytes) {
  var val = decodeLEu(bytes);
  if ((bytes[bytes.length - 1] & 0x80) == 0x80) {
    val -= Math.pow(256, bytes.length);
  }
  return val;
}

function getDecoder(len, fn) {
  return function() {
    var buf = this.buffer(len);
    return fn(buf);
  };
};
[1, 2, 4, 8].forEach(function(bytes) {
  var bits = bytes * 8;

  Parser.prototype['word' + bits + 'le'] = Parser.prototype['word' + bits + 'lu'] = getDecoder(bytes, decodeLEu);

  Parser.prototype['word' + bits + 'ls'] = getDecoder(bytes, decodeLEs);

  Parser.prototype['word' + bits + 'be'] = Parser.prototype['word' + bits + 'bu'] = getDecoder(bytes, decodeBEu);

  Parser.prototype['word' + bits + 'bs'] = getDecoder(bytes, decodeBEs);

  Parser.prototype.word8 = Parser.prototype.word8u = Parser.prototype.word8be;
  Parser.prototype.word8s = Parser.prototype.word8bs;
});

Parser.prototype.varInt = function() {
  var firstByte = this.word8();
  switch (firstByte) {
    case 0xFD:
      return this.word16le();

    case 0xFE:
      return this.word32le();

    case 0xFF:
      return this.word64le();

    default:
      return firstByte;
  }
};

Parser.prototype.varStr = function() {
  var len = this.varInt();
  return this.buffer(len);
};

module.exports = (Parser);

}).call(this,require("buffer").Buffer)
},{"buffer":31}],59:[function(require,module,exports){
(function (Buffer){
var base58 = require('../lib/Base58').base58Check;

// Constructor.  Takes the following forms:
//   new EncodedData(<base58_address_string>)
//   new EncodedData(<binary_buffer>)
//   new EncodedData(<data>, <encoding>)
//   new EncodedData(<version>, <20-byte-hash>)
function EncodedData(data, encoding) {
  this.data = data;
  if (!encoding && (typeof data == 'string')) {
    this.__proto__ = this.encodings['base58'];
  } else {
    this.__proto__ = this.encodings[encoding || 'binary'];
  }
};

// get or set the encoding used (transforms data)
EncodedData.prototype.encoding = function(encoding) {
  if (encoding && (encoding != this._encoding)) {
    this.data = this.as(encoding);
    this.__proto__ = this.encodings[encoding];
  }
  return this._encoding;
};

// answer a new instance having the given encoding
EncodedData.prototype.withEncoding = function(encoding) {
  return new EncodedData(this.as(encoding), encoding);
};

// answer the data in the given encoding
EncodedData.prototype.as = function(encoding) {
  if (!encodings[encoding]) throw new Error('invalid encoding: '+encoding);
  return this.converters[encoding].call(this);
};

// validate that we can convert to binary
EncodedData.prototype._validate = function() {
  this.withEncoding('binary');
};

// Boolean protocol for testing if valid
EncodedData.prototype.isValid = function() {
  try {
    this.validate();
    return true;
  } catch (e) {
    return false;
  }
};

// subclasses can override to do more stuff
EncodedData.prototype.validate = function() {
  this._validate();
};

// convert to a string (in base58 form)
EncodedData.prototype.toString = function() {
  return this.as('base58');
};

// utility
EncodedData.prototype.doAsBinary = function(callback) {
  var oldEncoding = this.encoding();
  this.encoding('binary');
  callback.apply(this);
  this.encoding(oldEncoding);
};

// Setup support for various address encodings.  The object for
// each encoding inherits from the EncodedData prototype.  This
// allows any encoding to override any method...changing the encoding
// for an instance will change the encoding it inherits from.  Note,
// this will present some problems for anyone wanting to inherit from
// EncodedData (we'll deal with that when needed).
var encodings = {
  'binary': {
    converters: {
      'binary': function() {
        var answer = new Buffer(this.data.length);
        this.data.copy(answer);
        return answer;
      },
      'base58': function() {
        return base58.encode(this.data);
      },
      'hex': function() {
        return this.data.toString('hex');
      },
    },

    _validate: function() {
      //nothing to do here...we make no assumptions about the data
    },
  },

  'base58': {
    converters: {
      'binary': function() {
        return base58.decode(this.data);
      },
      'hex': function() {
        return this.withEncoding('binary').as('hex');
      },
    },
  },

  'hex': {
    converters: {
      'binary': function() {
        return new Buffer(this.data, 'hex');
      },
      'base58': function() {
        return this.withEncoding('binary').as('base58');
      },
    },
  },
};

var no_conversion = function() {
  return this.data;
};
for (var k in encodings) {
  if (encodings.hasOwnProperty(k)) {
    if (!encodings[k].converters[k])
      encodings[k].converters[k] = no_conversion;
    encodings[k]._encoding = k;
  }
}

EncodedData.applyEncodingsTo = function(aClass) {
  var tmp = {};
  for (var k in encodings) {
    var enc = encodings[k];
    var obj = {};
    for (var j in enc) {
      obj[j] = enc[j];
    }
    obj.__proto__ = aClass.prototype;
    tmp[k] = obj;
  }
  aClass.prototype.encodings = tmp;
};

EncodedData.applyEncodingsTo(EncodedData);

module.exports = (EncodedData);

}).call(this,require("buffer").Buffer)
},{"../lib/Base58":7,"buffer":31}],60:[function(require,module,exports){
(function (Buffer){
var base58 = require('../lib/Base58').base58Check;
var util = require('util');
var EncodedData = require('./EncodedData');


function VersionedData(version, payload) {
  VersionedData.super_.call(this, version, payload);
  if (typeof version != 'number') {
    return;
  };
  this.data = new Buffer(payload.length + 1);
  this.__proto__ = this.encodings['binary'];
  this.version(version);
  this.payload(payload);
};

util.inherits(VersionedData, EncodedData);
EncodedData.applyEncodingsTo(VersionedData);

// get or set the version data (the first byte of the address)
VersionedData.prototype.version = function(num) {
  if (num || (num === 0)) {
    this.doAsBinary(function() {
      this.data.writeUInt8(num, 0);
    });
    return num;
  }
  return this.as('binary').readUInt8(0);
};

// get or set the payload data (as a Buffer object)
VersionedData.prototype.payload = function(data) {
  if (data) {
    this.doAsBinary(function() {
      data.copy(this.data, 1);
    });
    return data;
  }
  return this.as('binary').slice(1);
};

module.exports = (VersionedData);

}).call(this,require("buffer").Buffer)
},{"../lib/Base58":7,"./EncodedData":59,"buffer":31,"util":53}],61:[function(require,module,exports){
module.exports = require('./util');

},{"./util":63}],62:[function(require,module,exports){
'use strict';

var noop = function() {};
var cl = function() {
  console.log(arguments);
};

var loggers = {
  none: {
    info: noop,
    warn: noop,
    err: noop,
    debug: noop
  },
  normal: {
    info: cl,
    warn: cl,
    err: cl,
    debug: noop
  },
  debug: {
    info: cl,
    warn: cl,
    err: cl,
    debug: cl
  },
};

var config = require('../config');
if (config.log) {
  module.exports = config.log;
} else {
  module.exports = loggers[config.logger || 'normal'];
}

},{"../config":4}],63:[function(require,module,exports){
(function (process,Buffer){
var crypto = require('crypto');
var bignum = require('bignum');
var Binary = require('binary');
var Put = require('bufferput');
var buffertools = require('buffertools');
var sjcl = require('../lib/sjcl');
var browser;
var inBrowser = !process.versions;
if (inBrowser) {
  browser = require('../browser/vendor-bundle.js');
}

var sha256 = exports.sha256 = function(data) {
  return new Buffer(crypto.createHash('sha256').update(data).digest('binary'), 'binary');
};

var sha512 = exports.sha512 = function(data) {
  if (inBrowser) {
    var datahex = data.toString('hex');
    var databits = sjcl.codec.hex.toBits(datahex);
    var hashbits = sjcl.hash.sha512.hash(databits);
    var hashhex = sjcl.codec.hex.fromBits(hashbits);
    var hash = new Buffer(hashhex, 'hex');
    return hash;
  };
  return new Buffer(crypto.createHash('sha512').update(data).digest('binary'), 'binary');
};

var sha512hmac = exports.sha512hmac = function(data, key) {
  if (inBrowser) {
    var skey = sjcl.codec.hex.toBits(key.toString('hex'));
    var sdata = sjcl.codec.hex.toBits(data.toString('hex'));
    var hmac = new sjcl.misc.hmac(skey, sjcl.hash.sha512);
    var encrypted = hmac.encrypt(sdata);
    var enchex = sjcl.codec.hex.fromBits(encrypted);
    var encbuf = new Buffer(enchex, 'hex');
    return encbuf;
  };
  var hmac = crypto.createHmac('sha512', key);
  var hash = hmac.update(data).digest();
  return hash;
};

var ripe160 = exports.ripe160 = function(data) {
  if (!Buffer.isBuffer(data)) {
    throw new Error('arg should be a buffer');
  }
  if (inBrowser) {
    var w = new browser.crypto31.lib.WordArray.init(Crypto.util.bytesToWords(data), data.length);
    var wordArray = browser.crypto31.RIPEMD160(w);
    var words = wordArray.words;
    var answer = [];
    for (var b = 0; b < words.length * 32; b += 8) {
      answer.push((words[b >>> 5] >>> (24 - b % 32)) & 0xFF);
    }
    return new Buffer(answer, 'hex');
  }
  return new Buffer(crypto.createHash('rmd160').update(data).digest('binary'), 'binary');
};

var sha1 = exports.sha1 = function(data) {
  return new Buffer(crypto.createHash('sha1').update(data).digest('binary'), 'binary');
};

var twoSha256 = exports.twoSha256 = function(data) {
  return sha256(sha256(data));
};

var sha256ripe160 = exports.sha256ripe160 = function(data) {
  return ripe160(sha256(data));
};

/**
 * Format a block hash like the official client does.
 */
var formatHash = exports.formatHash = function(hash) {
  var hashEnd = new Buffer(10);
  hash.copy(hashEnd, 0, 22, 32);
  return buffertools.reverse(hashEnd).toString('hex');
};

/**
 * Display the whole hash, as hex, in correct endian order.
 */
var formatHashFull = exports.formatHashFull = function(hash) {
  var copy = new Buffer(hash.length);
  hash.copy(copy);
  var hex = buffertools.toHex(buffertools.reverse(copy));
  return hex;
};

/**
 * Format a block hash like Block Explorer does.
 *
 * Formats a block hash by removing leading zeros and truncating to 10 characters.
 */
var formatHashAlt = exports.formatHashAlt = function(hash) {
  var hex = formatHashFull(hash);
  hex = hex.replace(/^0*/, '');
  return hex.substr(0, 10);
};

var formatBuffer = exports.formatBuffer = function(buffer, maxLen) {
  // Calculate amount of bytes to display
  if (maxLen === null) {
    maxLen = 10;
  }
  if (maxLen > buffer.length || maxLen === 0) {
    maxLen = buffer.length;
  }

  // Copy those bytes into a temporary buffer
  var temp = new Buffer(maxLen);
  buffer.copy(temp, 0, 0, maxLen);

  // Format as string
  var output = buffertools.toHex(temp);
  if (temp.length < buffer.length) {
    output += "...";
  }
  return output;
};

var valueToBigInt = exports.valueToBigInt = function(valueBuffer) {
  if (Buffer.isBuffer(valueBuffer)) {
    return bignum.fromBuffer(valueBuffer, {
      endian: 'little',
      size: 8
    });
  } else {
    return valueBuffer;
  }
};

var bigIntToValue = exports.bigIntToValue = function(valueBigInt) {
  if (Buffer.isBuffer(valueBigInt)) {
    return valueBigInt;
  } else {
    return valueBigInt.toBuffer({
      endian: 'little',
      size: 8
    });
  }
};

var fitsInNBits = function(integer, n) {
  // TODO: make this efficient!!!
  return integer.toString(2).replace('-', '').length < n;
};
exports.bytesNeededToStore = bytesNeededToStore = function(integer) {
  if (integer === 0) return 0;
  return Math.ceil(((integer).toString(2).replace('-', '').length + 1) / 8);
};

exports.negativeBuffer = negativeBuffer = function(b) {
  // implement two-complement negative
  var c = new Buffer(b.length);
  // negate each byte
  for (var i = 0; i < b.length; i++) {
    c[i] = ~b[i];
    if (c[i] < 0) c[i] += 256;
  }
  // add one
  for (var i = b.length - 1; i >= 0; i--) {
    c[i] += 1;
    if (c[i] >= 256) c[i] -= 256;
    if (c[i] !== 0) break;
  }
  return c;
};

/*
 * Transforms an integer into a buffer using two-complement encoding
 * For example, 1 is encoded as 01 and -1 is encoded as ff
 * For more info see:
 * http://en.wikipedia.org/wiki/Signed_number_representations#Two.27s_complement
 */
exports.intToBuffer2C = function(integer) {
  var size = bytesNeededToStore(integer);
  var buf = new Put();
  var s = integer.toString(16);
  var neg = s[0] === '-';
  s = s.replace('-', '');
  for (var i = 0; i < size; i++) {
    var si = s.substring(s.length - 2 * (i + 1), s.length - 2 * (i));
    if (si.lenght === 1) {
      si = '0' + si;
    }
    var pi = parseInt(si, 16);
    buf.word8(pi);
  }
  var ret = buf.buffer();
  if (neg) {
    ret = buffertools.reverse(ret);
    ret = negativeBuffer(ret);
    ret = buffertools.reverse(ret);
  }
  return ret;
};


var padSign = function(b) {
  var c;
  if (b[0] & 0x80) {
    c = new Buffer(b.length + 1);
    b.copy(c, 1);
    c[0] = 0;
  } else {
    c = b;
  }
  return c;
}


/*
 * Transforms an integer into a buffer using sign+magnitude encoding
 * For example, 1 is encoded as 01 and -1 is encoded as 81
 * For more info see:
 * http://en.wikipedia.org/wiki/Signed_number_representations#Signed_magnitude_representation
 */
exports.intToBufferSM = function(v) {
  if ("number" === typeof v) {
    v = bignum(v);
  }
  var b, c;
  var cmp = v.cmp(0);
  if (cmp > 0) {
    b = v.toBuffer();
    c = padSign(b);
    c = buffertools.reverse(c);
  } else if (cmp == 0) {
    c = new Buffer([]);
  } else {
    b = v.neg().toBuffer();
    c = padSign(b);
    c[0] |= 0x80;
    c = buffertools.reverse(c);
  }
  return c;
};

/*
 * Reverse of intToBufferSM
 */
exports.bufferSMToInt = function(v) {
  if (!v.length) {
    return bignum(0);
  }
  // Arithmetic operands must be in range [-2^31...2^31]
  if (v.length > 4) {
    throw new Error('Bigint cast overflow (> 4 bytes)');
  }

  var w = new Buffer(v.length);
  v.copy(w);
  w = buffertools.reverse(w);
  var isNeg = w[0] & 0x80;
  if (isNeg) {
    w[0] &= 0x7f;
    return bignum.fromBuffer(w).neg();
  } else {
    return bignum.fromBuffer(w);
  }
};



var formatValue = exports.formatValue = function(valueBuffer) {
  var value = valueToBigInt(valueBuffer).toString();
  var integerPart = value.length > 8 ? value.substr(0, value.length - 8) : '0';
  var decimalPart = value.length > 8 ? value.substr(value.length - 8) : value;
  while (decimalPart.length < 8) {
    decimalPart = "0" + decimalPart;
  }
  decimalPart = decimalPart.replace(/0*$/, '');
  while (decimalPart.length < 2) {
    decimalPart += "0";
  }
  return integerPart + "." + decimalPart;
};

var reFullVal = /^\s*(\d+)\.(\d+)/;
var reFracVal = /^\s*\.(\d+)/;
var reWholeVal = /^\s*(\d+)/;

function padFrac(frac) {
  frac = frac.substr(0, 8); //truncate to 8 decimal places
  while (frac.length < 8)
    frac = frac + '0';
  return frac;
}

function parseFullValue(res) {
  return bignum(res[1]).mul('100000000').add(padFrac(res[2]));
}

function parseFracValue(res) {
  return bignum(padFrac(res[1]));
}

function parseWholeValue(res) {
  return bignum(res[1]).mul('100000000');
}

exports.parseValue = function parseValue(valueStr) {
  if (typeof valueStr !== 'string')
    valueStr = valueStr.toString();

  var res = valueStr.match(reFullVal);
  if (res)
    return parseFullValue(res);

  res = valueStr.match(reFracVal);
  if (res)
    return parseFracValue(res);

  res = valueStr.match(reWholeVal);
  if (res)
    return parseWholeValue(res);

  return undefined;
};

// Utility that synchronizes function calls based on a key
var createSynchrotron = exports.createSynchrotron = function(fn) {
  var table = {};
  return function(key) {
    var args = Array.prototype.slice.call(arguments);
    var run = function() {
      // Function fn() will call when it finishes
      args[0] = function next() {
        if (table[key]) {
          if (table[key].length) {
            table[key].shift()();
          } else {
            delete table[key];
          }
        }
      };

      fn.apply(null, args);
    };

    if (!table[key]) {
      table[key] = [];
      run();
    } else {
      table[key].push(run);
    }
  };
};

/**
 * Decode difficulty bits.
 *
 * This function calculates the difficulty target given the difficulty bits.
 */
var decodeDiffBits = exports.decodeDiffBits = function(diffBits, asBigInt) {
  diffBits = +diffBits;

  var target = bignum(diffBits & 0xffffff);
  /*
   * shiftLeft is not implemented on the bignum browser
   *
   * target = target.shiftLeft(8*((diffBits >>> 24) - 3));
   */

  var mov = 8 * ((diffBits >>> 24) - 3);
  while (mov-- > 0)
    target = target.mul(2);

  if (asBigInt) {
    return target;
  }

  // Convert to buffer
  var diffBuf = target.toBuffer();
  var targetBuf = new Buffer(32);
  buffertools.fill(targetBuf, 0);
  diffBuf.copy(targetBuf, 32 - diffBuf.length);
  return targetBuf;
};

/**
 * Encode difficulty bits.
 *
 * This function calculates the compact difficulty, given a difficulty target.
 */
var encodeDiffBits = exports.encodeDiffBits = function encodeDiffBits(target) {
  if (Buffer.isBuffer(target)) {
    target = bignum.fromBuffer(target);
  } else if ("function" === typeof target.toBuffer) { // duck-typing bignum
    // Nothing to do
  } else {
    throw new Error("Incorrect variable type for difficulty");
  }

  var mpiBuf = target.toBuffer("mpint");
  var size = mpiBuf.length - 4;

  var compact = size << 24;
  if (size >= 1) compact |= mpiBuf[4] << 16;
  if (size >= 2) compact |= mpiBuf[5] << 8;
  if (size >= 3) compact |= mpiBuf[6];

  return compact;
};

/**
 * Calculate "difficulty".
 *
 * This function calculates the maximum difficulty target divided by the given
 * difficulty target.
 */
var calcDifficulty = exports.calcDifficulty = function(target) {
  if (!Buffer.isBuffer(target)) {
    target = decodeDiffBits(target);
  }
  var targetBigint = bignum.fromBuffer(target, {
    order: 'forward'
  });
  var maxBigint = bignum.fromBuffer(MAX_TARGET, {
    order: 'forward'
  });
  return maxBigint.div(targetBigint).toNumber();
};

var reverseBytes32 = exports.reverseBytes32 = function(data) {
  if (data.length % 4) {
    throw new Error("Util.reverseBytes32(): Data length must be multiple of 4");
  }
  var put = new Put();
  var parser = Binary.parse(data);
  while (!parser.eof()) {
    var word = parser.word32le('word').vars.word;
    put.word32be(word);
  }
  return put.buffer();
};


var getVarIntSize = exports.getVarIntSize = function getVarIntSize(i) {

  if (i < 253) {
    // unsigned char
    return 1;
  } else if (i < 0x10000) {
    // unsigned short (LE)
    return 3;
  } else if (i < 0x100000000) {
    // unsigned int (LE)
    return 5;
  } else {
    // unsigned long long (LE)
    return 9;
  }
};

var varIntBuf = exports.varIntBuf = function varIntBuf(n) {
  var buf = undefined;
  if (n < 253) {
    buf = new Buffer(1);
    buf.writeUInt8(n, 0);
  } else if (n < 0x10000) {
    buf = new Buffer(1 + 2);
    buf.writeUInt8(253, 0);
    buf.writeUInt16LE(n, 1);
  } else if (n < 0x100000000) {
    buf = new Buffer(1 + 4);
    buf.writeUInt8(254, 0);
    buf.writeUInt32LE(n, 1);
  } else {
    buf = new Buffer(1 + 8);
    buf.writeUInt8(255, 0);
    buf.writeInt32LE(n & -1, 1);
    buf.writeUInt32LE(Math.floor(n / 0x100000000), 5);
  }

  return buf;
};

var varStrBuf = exports.varStrBuf = function varStrBuf(s) {
  return Buffer.concat([varIntBuf(s.length), s]);
};

// Initializations
exports.NULL_HASH = buffertools.fill(new Buffer(32), 0);
exports.EMPTY_BUFFER = new Buffer(0);
exports.ZERO_VALUE = buffertools.fill(new Buffer(8), 0);
var INT64_MAX = new Buffer('ffffffffffffffff', 'hex');
exports.INT64_MAX = INT64_MAX;

// How much of Bitcoin's internal integer coin representation
// makes 1 BTC
exports.COIN = 100000000;
exports.BIT = 100;

var MAX_TARGET = exports.MAX_TARGET = new Buffer('00000000FFFF0000000000000000000000000000000000000000000000000000', 'hex');

}).call(this,require("/root/node_modules/bitcore/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"),require("buffer").Buffer)
},{"../browser/vendor-bundle.js":3,"../lib/sjcl":18,"/root/node_modules/bitcore/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":42,"bignum":13,"binary":20,"buffer":31,"bufferput":"aXRuS6","buffertools":"fugeBw","crypto":35}]},{},[])