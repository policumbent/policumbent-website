!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.galite=t():e.galite=t()}(this,function(){return(r={},i.m=n=[function(e,t){Array.from=Array.from||function(){var e;return(e=Array.prototype.slice).call.apply(e,arguments)}},function(e,t,n){"use strict";n.r(t);var i={};function f(e){return i[e]}function r(t){if("undefined"!=typeof navigator&&navigator.sendBeacon&&navigator.sendBeacon(t))return;try{var e=new window.XMLHttpRequest;e.open("GET",t,!1),e.send()}catch(e){(new window.Image).src=t}}var o="uid";function c(e,t){var n=1<arguments.length&&void 0!==t?t:[];return!e||-1<n.indexOf(void 0)?"":"&"+e+"="+n.map(encodeURIComponent).join("")}function u(e){return"boolean"==typeof e?+e:e}function l(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=[],r=!0,i=!1,o=void 0;try{for(var a,c=e[Symbol.iterator]();!(r=(a=c.next()).done)&&(n.push(a.value),!t||n.length!==t);r=!0);}catch(e){i=!0,o=e}finally{try{r||null==c.return||c.return()}finally{if(i)throw o}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var d={anonymizeIp:"aip",dataSource:"ds",queueTime:"qt",userId:"uid",sessionControl:"sc",referrer:"dr",campaignName:"cn",campaignSource:"cs",campaignMedium:"cm",campaignKeyword:"ck",campaignContent:"cc",campaignId:"ci",screenResolution:"sr",viewportSize:"vp",encoding:"de",screenColors:"sd",language:"ul",javaEnabled:"je",flashVersion:"fl",hitType:"t",nonInteraction:"ni",location:"dl",hostname:"dh",page:"dp",title:"dt",screenName:"cd",linkid:"linkid",appName:"an",appId:"aid",appVersion:"av",appInstallerId:"aiid",eventCategory:"ec",eventAction:"ea",eventLabel:"el",eventValue:"ev",currencyCode:"cu",socialNetwork:"sn",socialAction:"sa",socialTarget:"st",timingCategory:"utc",timingVar:"utv",timingValue:"utt",timingLabel:"utl",exDescription:"exd",exFatal:"exf",expId:"xid",expVar:"xvar"},s=/(dimension|metric)(\d+)/,p={dimension:"cd",metric:"cm"};function a(e,t,n,r,i){var o=4<arguments.length&&void 0!==i&&i,a=function(e){var t=0<arguments.length&&void 0!==e?e:{};return Object.keys(t).map(function(e){return[e,t[e]].map(u).map(encodeURIComponent).join("=")}).join("&")}(function(e){var t={};for(var n in e){var r=e[n];if(r){if(n in d)t[d[n]]=r;var i=s.exec(n);if(i){var o=l(i,3),a=o[1],c=o[2];t[p[a]+c]=r}}}return t}(3<arguments.length&&void 0!==r?r:{}));return"https://www.google-analytics.com/collect?v=1&ul=en-us&de=UTF-8"+c("dl",[document.location.href])+c("dt",[document.title])+c("sd",[window.screen.colorDepth,"-bit"])+c("sr",[window.screen.availWidth,"x",window.screen.availHeight])+c("vp",[window.innerWidth,"x",window.innerHeight])+c("dr",[document.referrer])+(a?"&"+a:"")+(o?"&aip=1":"")+"&cid="+n+"&tid="+e+"&z="+t}function h(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=[],r=!0,i=!1,o=void 0;try{for(var a,c=e[Symbol.iterator]();!(r=(a=c.next()).done)&&(n.push(a.value),!t||n.length!==t);r=!0);}catch(e){i=!0,o=e}finally{try{r||null==c.return||c.return()}finally{if(i)throw o}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function v(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),n.push.apply(n,r)}return n}function w(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?v(n,!0).forEach(function(e){y(t,e,n[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):v(n).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))})}return t}function y(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function g(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var m="t0",b=function(){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),this.fields={trackingId:e},this.userId=function(e){var t=0<arguments.length&&void 0!==e?e:window?window.localStorage:null;if(t&&t.getItem(o))return t.getItem(o);var n=Math.random()+"."+Math.random();return t&&t.setItem(o,n),n}(),this._sendTo=r,this._getTime=j}return function(e,t,n){t&&g(e.prototype,t),n&&g(e,n)}(t,[{key:"send",value:function(e){if(!function(e){return!0===window["ga-disable-".concat(e)]}(this.fields.trackingId)){for(var t=arguments.length,n=new Array(1<t?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];var i=w({hitType:e},function(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:[],n=1<=t.length&&t[t.length-1].constructor===Object,r=n?t[t.length-1]:{};switch(t=n?t.slice(0,-1):t,e){case"pageview":return w({page:h(t,1)[0]},r);case"event":var i=h(t,4),o=i[0],a=i[1],c=i[2],u=i[3];return w({eventCategory:o,eventAction:a,eventLabel:c,eventValue:u},r);case"social":var l=h(t,3),f=l[0],d=l[1],s=l[2];return w({socialNetwork:f,socialAction:d,socialTarget:s},r);case"timing":var p=h(t,4),v=p[0],y=p[1],g=p[2],m=p[3];return w({timingCategory:v,timingVar:y,timingValue:g,timingLabel:m},r);default:return r}}(e,n),{},this.fields),o=a(this.fields.trackingId,this._getTime(),this.userId,i);this._sendTo(o)}}},{key:"get",value:function(e){return this.fields[e]}},{key:"set",value:function(e,t){if(e.constructor===Object)for(var n in e)this.fields[n]=e[n];else this.fields[e]=t}}]),t}();function j(){return(new Date).getTime()}var O={create:function(e,t){var n=2<arguments.length&&void 0!==arguments[2]?arguments[2]:m,r=new b(e);return function(e,t){i[e]=t}(n,r),r},getByName:function(e){return f(e)}};n(0);function x(e){return function(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function I(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=[],r=!0,i=!1,o=void 0;try{for(var a,c=e[Symbol.iterator]();!(r=(a=c.next()).done)&&(n.push(a.value),!t||n.length!==t);r=!0);}catch(e){i=!0,o=e}finally{try{r||null==c.return||c.return()}finally{if(i)throw o}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function T(e){if(1!==parseInt(navigator.msDoNotTrack||window.doNotTrack||navigator.doNotTrack,10)){for(var t=I(function(e){return"string"==typeof e&&-1<e.indexOf(".")?e.split("."):[m,e]}(e),2),n=t[0],r=t[1],i=!!O[e],o=!!b.prototype[r]&&"constructor"!==r,a=arguments.length,c=new Array(1<a?a-1:0),u=1;u<a;u++)c[u-1]=arguments[u];if(i)O[e].apply(O,c);else if(o){var l=f(n);l&&l[r].apply(l,c)}else{if("function"!=typeof e)throw new Error("Command ".concat(e," is not available in ga-lite"));e(f(n))}}}n.d(t,"default",function(){return T}),Object.keys(O).forEach(function(e){T[e]=O[e]}),("undefined"==typeof window?[]:window.galite&&window.galite.q||[]).forEach(function(e){return T.apply(void 0,x(e))})}],i.c=r,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)i.d(n,r,function(e){return t[e]}.bind(null,r));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i(i.s=1)).default;function i(e){if(r[e])return r[e].exports;var t=r[e]={i:e,l:!1,exports:{}};return n[e].call(t.exports,t,t.exports,i),t.l=!0,t.exports}var n,r});