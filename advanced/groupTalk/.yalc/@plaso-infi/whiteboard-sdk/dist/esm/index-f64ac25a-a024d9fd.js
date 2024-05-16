import{m as t,E as e}from"./index-fac35469.js";import"react";import"react-dom";import"agora-rtc-sdk-ng";var r={exports:{}};r.exports=function(t){var e={};function r(n){if(e[n])return e[n].exports;var i=e[n]={i:n,l:!1,exports:{}};return t[n].call(i.exports,i,i.exports,r),i.l=!0,i.exports}return r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)r.d(n,i,function(e){return t[e]}.bind(null,i));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=86)}({17:function(t,e,r){var n,i;void 0===(i="function"==typeof(n=function(){function e(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}var r=function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t)}return r=t,n=[{key:"getFirstMatch",value:function(t,e){var r=e.match(t);return r&&r.length>0&&r[1]||""}},{key:"getSecondMatch",value:function(t,e){var r=e.match(t);return r&&r.length>1&&r[2]||""}},{key:"matchAndReturnConst",value:function(t,e,r){if(t.test(e))return r}},{key:"getWindowsVersionName",value:function(t){switch(t){case"NT":return"NT";case"XP":case"NT 5.1":return"XP";case"NT 5.0":return"2000";case"NT 5.2":return"2003";case"NT 6.0":return"Vista";case"NT 6.1":return"7";case"NT 6.2":return"8";case"NT 6.3":return"8.1";case"NT 10.0":return"10";default:return}}},{key:"getAndroidVersionName",value:function(t){var e=t.split(".").splice(0,2).map((function(t){return parseInt(t,10)||0}));if(e.push(0),!(1===e[0]&&e[1]<5))return 1===e[0]&&e[1]<6?"Cupcake":1===e[0]&&e[1]>=6?"Donut":2===e[0]&&e[1]<2?"Eclair":2===e[0]&&2===e[1]?"Froyo":2===e[0]&&e[1]>2?"Gingerbread":3===e[0]?"Honeycomb":4===e[0]&&e[1]<1?"Ice Cream Sandwich":4===e[0]&&e[1]<4?"Jelly Bean":4===e[0]&&e[1]>=4?"KitKat":5===e[0]?"Lollipop":6===e[0]?"Marshmallow":7===e[0]?"Nougat":8===e[0]?"Oreo":void 0}},{key:"getVersionPrecision",value:function(t){return t.split(".").length}},{key:"compareVersions",value:function(e,r){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],i=t.getVersionPrecision(e),o=t.getVersionPrecision(r),s=Math.max(i,o),a=0,u=t.map([e,r],(function(e){var r=s-t.getVersionPrecision(e),n=e+new Array(r+1).join(".0");return t.map(n.split("."),(function(t){return new Array(20-t.length).join("0")+t})).reverse()}));for(n&&(a=s-Math.min(i,o)),s-=1;s>=a;){if(u[0][s]>u[1][s])return 1;if(u[0][s]===u[1][s]){if(s===a)return 0;s-=1}else if(u[0][s]<u[1][s])return-1}}},{key:"map",value:function(t,e){var r,n=[];if(Array.prototype.map)return Array.prototype.map.call(t,e);for(r=0;r<t.length;r+=1)n.push(e(t[r]));return n}}],null&&e(r.prototype,null),n&&e(r,n),t;var r,n}();t.exports=r})?n.apply(e,[]):n)||(t.exports=i)},86:function(t,e,r){var n,i,o;i=[e,r(87)],void 0===(o="function"==typeof(n=function(r,n){function i(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}var o;Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0,n=(o=n)&&o.__esModule?o:{default:o};var s=function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t)}return e=t,r=[{key:"getParser",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if("string"!=typeof t)throw new Error("UserAgent should be a string");return new n.default(t,e)}},{key:"parse",value:function(t){return new n.default(t).getResult()}}],null&&i(e.prototype,null),r&&i(e,r),t;var e,r}();r.default=s,t.exports=e.default})?n.apply(e,i):n)||(t.exports=o)},87:function(t,e,r){var n,i,o;i=[e,r(88),r(89),r(90),r(91),r(17)],void 0===(o="function"==typeof(n=function(r,n,i,o,s,a){function u(t){return t&&t.__esModule?t:{default:t}}function d(t){return(d="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function c(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0,n=u(n),i=u(i),o=u(o),s=u(s);var l=function(){function t(e){var r=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if(function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),null==e||""===e)throw new Error("UserAgent parameter can't be empty");this._ua=e,this.parsedResult={},!0!==r&&this.parse()}return e=t,(r=[{key:"getUA",value:function(){return this._ua}},{key:"test",value:function(t){return t.test(this._ua)}},{key:"parseBrowser",value:function(){var t=this;this.parsedResult.browser={};var e=n.default.find((function(e){if("function"==typeof e.test)return e.test(t);if(e.test instanceof Array)return e.test.some((function(e){return t.test(e)}));throw new Error("Browser's test function is not valid")}));return e&&(this.parsedResult.browser=e.describe(this.getUA())),this.parsedResult.browser}},{key:"getBrowser",value:function(){return this.parsedResult.browser?this.parsedResult.browser:this.parseBrowser()}},{key:"getBrowserName",value:function(t){return t?String(this.getBrowser().name).toLowerCase()||"":this.getBrowser().name||""}},{key:"getBrowserVersion",value:function(){return this.getBrowser().version}},{key:"getOS",value:function(){return this.parsedResult.os?this.parsedResult.os:this.parseOS()}},{key:"parseOS",value:function(){var t=this;this.parsedResult.os={};var e=i.default.find((function(e){if("function"==typeof e.test)return e.test(t);if(e.test instanceof Array)return e.test.some((function(e){return t.test(e)}));throw new Error("Browser's test function is not valid")}));return e&&(this.parsedResult.os=e.describe(this.getUA())),this.parsedResult.os}},{key:"getOSName",value:function(t){var e=this.getOS().name;return t?String(e).toLowerCase()||"":e||""}},{key:"getOSVersion",value:function(){return this.getOS().version}},{key:"getPlatform",value:function(){return this.parsedResult.platform?this.parsedResult.platform:this.parsePlatform()}},{key:"getPlatformType",value:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0],e=this.getPlatform().type;return t?String(e).toLowerCase()||"":e||""}},{key:"parsePlatform",value:function(){var t=this;this.parsedResult.platform={};var e=o.default.find((function(e){if("function"==typeof e.test)return e.test(t);if(e.test instanceof Array)return e.test.some((function(e){return t.test(e)}));throw new Error("Browser's test function is not valid")}));return e&&(this.parsedResult.platform=e.describe(this.getUA())),this.parsedResult.platform}},{key:"getEngine",value:function(){return this.parsedResult.engine?this.parsedResult.engine:this.parseEngine()}},{key:"getEngineName",value:function(t){return t?String(this.getEngine().name).toLowerCase()||"":this.getEngine().name||""}},{key:"parseEngine",value:function(){var t=this;this.parsedResult.engine={};var e=s.default.find((function(e){if("function"==typeof e.test)return e.test(t);if(e.test instanceof Array)return e.test.some((function(e){return t.test(e)}));throw new Error("Browser's test function is not valid")}));return e&&(this.parsedResult.engine=e.describe(this.getUA())),this.parsedResult.engine}},{key:"parse",value:function(){return this.parseBrowser(),this.parseOS(),this.parsePlatform(),this.parseEngine(),this}},{key:"getResult",value:function(){return Object.assign({},this.parsedResult)}},{key:"satisfies",value:function(t){var e=this,r={},n=0,i={},o=0;if(Object.keys(t).forEach((function(e){var s=t[e];"string"==typeof s?(i[e]=s,o+=1):"object"===d(s)&&(r[e]=s,n+=1)})),n>0){var s=Object.keys(r),a=s.find((function(t){return e.isOS(t)}));if(a){var u=this.satisfies(r[a]);if(void 0!==u)return u}var c=s.find((function(t){return e.isPlatform(t)}));if(c){var l=this.satisfies(r[c]);if(void 0!==l)return l}}if(o>0){var f=Object.keys(i).find((function(t){return e.isBrowser(t)}));if(void 0!==f)return this.compareVersion(i[f])}}},{key:"isBrowser",value:function(t){return this.getBrowserName(!0)===String(t).toLowerCase()}},{key:"compareVersion",value:function(t){var e=[0],r=t,n=!1,i=this.getBrowserVersion();if("string"==typeof i)return">"===t[0]||"<"===t[0]?(r=t.substr(1),"="===t[1]?(n=!0,r=t.substr(2)):e=[],">"===t[0]?e.push(1):e.push(-1)):"="===t[0]?r=t.substr(1):"~"===t[0]&&(n=!0,r=t.substr(1)),e.indexOf((0,a.compareVersions)(i,r,n))>-1}},{key:"isOS",value:function(t){return this.getOSName(!0)===String(t).toLowerCase()}},{key:"isPlatform",value:function(t){return this.getPlatformType(!0)===String(t).toLowerCase()}},{key:"isEngine",value:function(t){return this.getEngineName(!0)===String(t).toLowerCase()}},{key:"is",value:function(t){return this.isBrowser(t)||this.isOS(t)||this.isPlatform(t)}},{key:"some",value:function(){var t=this;return(arguments.length>0&&void 0!==arguments[0]?arguments[0]:[]).some((function(e){return t.is(e)}))}}])&&c(e.prototype,r),t;var e,r}();r.default=l,t.exports=e.default})?n.apply(e,i):n)||(t.exports=o)},88:function(t,e,r){var n,i,o;i=[e,r(17)],void 0===(o="function"==typeof(n=function(r,n){Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var i=/version\/(\d+(\.?_?\d+)+)/i,o=[{test:[/googlebot/i],describe:function(t){var e={name:"Googlebot"},r=(0,n.getFirstMatch)(/googlebot\/(\d+(\.\d+))/i,t)||(0,n.getFirstMatch)(i,t);return r&&(e.version=r),e}},{test:[/opera/i],describe:function(t){var e={name:"Opera"},r=(0,n.getFirstMatch)(i,t)||(0,n.getFirstMatch)(/(?:opera)[\s\/](\d+(\.?_?\d+)+)/i,t);return r&&(e.version=r),e}},{test:[/opr\/|opios/i],describe:function(t){var e={name:"Opera"},r=(0,n.getFirstMatch)(/(?:opr|opios)[\s\/](\S+)/i,t)||(0,n.getFirstMatch)(i,t);return r&&(e.version=r),e}},{test:[/SamsungBrowser/i],describe:function(t){var e={name:"Samsung Internet for Android"},r=(0,n.getFirstMatch)(i,t)||(0,n.getFirstMatch)(/(?:SamsungBrowser)[\s\/](\d+(\.?_?\d+)+)/i,t);return r&&(e.version=r),e}},{test:[/Whale/i],describe:function(t){var e={name:"NAVER Whale Browser"},r=(0,n.getFirstMatch)(i,t)||(0,n.getFirstMatch)(/(?:whale)[\s\/](\d+(?:\.\d+)+)/i,t);return r&&(e.version=r),e}},{test:[/MZBrowser/i],describe:function(t){var e={name:"MZ Browser"},r=(0,n.getFirstMatch)(/(?:MZBrowser)[\s\/](\d+(?:\.\d+)+)/i,t)||(0,n.getFirstMatch)(i,t);return r&&(e.version=r),e}},{test:[/focus/i],describe:function(t){var e={name:"Focus"},r=(0,n.getFirstMatch)(/(?:focus)[\s\/](\d+(?:\.\d+)+)/i,t)||(0,n.getFirstMatch)(i,t);return r&&(e.version=r),e}},{test:[/swing/i],describe:function(t){var e={name:"Swing"},r=(0,n.getFirstMatch)(/(?:swing)[\s\/](\d+(?:\.\d+)+)/i,t)||(0,n.getFirstMatch)(i,t);return r&&(e.version=r),e}},{test:[/coast/i],describe:function(t){var e={name:"Opera Coast"},r=(0,n.getFirstMatch)(i,t)||(0,n.getFirstMatch)(/(?:coast)[\s\/](\d+(\.?_?\d+)+)/i,t);return r&&(e.version=r),e}},{test:[/yabrowser/i],describe:function(t){var e={name:"Yandex Browser"},r=(0,n.getFirstMatch)(i,t)||(0,n.getFirstMatch)(/(?:yabrowser)[\s\/](\d+(\.?_?\d+)+)/i,t);return r&&(e.version=r),e}},{test:[/ucbrowser/i],describe:function(t){var e={name:"UC Browser"},r=(0,n.getFirstMatch)(i,t)||(0,n.getFirstMatch)(/(?:ucbrowser)[\s\/](\d+(\.?_?\d+)+)/i,t);return r&&(e.version=r),e}},{test:[/Maxthon|mxios/i],describe:function(t){var e={name:"Maxthon"},r=(0,n.getFirstMatch)(i,t)||(0,n.getFirstMatch)(/(?:Maxthon|mxios)[\s\/](\d+(\.?_?\d+)+)/i,t);return r&&(e.version=r),e}},{test:[/epiphany/i],describe:function(t){var e={name:"Epiphany"},r=(0,n.getFirstMatch)(i,t)||(0,n.getFirstMatch)(/(?:epiphany)[\s\/](\d+(\.?_?\d+)+)/i,t);return r&&(e.version=r),e}},{test:[/puffin/i],describe:function(t){var e={name:"Puffin"},r=(0,n.getFirstMatch)(i,t)||(0,n.getFirstMatch)(/(?:puffin)[\s\/](\d+(\.?_?\d+)+)/i,t);return r&&(e.version=r),e}},{test:[/sleipnir/i],describe:function(t){var e={name:"Sleipnir"},r=(0,n.getFirstMatch)(i,t)||(0,n.getFirstMatch)(/(?:sleipnir)[\s\/](\d+(\.?_?\d+)+)/i,t);return r&&(e.version=r),e}},{test:[/k-meleon/i],describe:function(t){var e={name:"K-Meleon"},r=(0,n.getFirstMatch)(i,t)||(0,n.getFirstMatch)(/(?:k-meleon)[\s\/](\d+(\.?_?\d+)+)/i,t);return r&&(e.version=r),e}},{test:[/micromessenger/i],describe:function(t){var e={name:"WeChat"},r=(0,n.getFirstMatch)(/(?:micromessenger)[\s\/](\d+(\.?_?\d+)+)/i,t)||(0,n.getFirstMatch)(i,t);return r&&(e.version=r),e}},{test:[/msie|trident/i],describe:function(t){var e={name:"Internet Explorer"},r=(0,n.getFirstMatch)(/(?:msie |rv:)(\d+(\.?_?\d+)+)/i,t);return r&&(e.version=r),e}},{test:[/edg([ea]|ios)/i],describe:function(t){var e={name:"Microsoft Edge"},r=(0,n.getSecondMatch)(/edg([ea]|ios)\/(\d+(\.?_?\d+)+)/i,t);return r&&(e.version=r),e}},{test:[/vivaldi/i],describe:function(t){var e={name:"Vivaldi"},r=(0,n.getFirstMatch)(/vivaldi\/(\d+(\.?_?\d+)+)/i,t);return r&&(e.version=r),e}},{test:[/seamonkey/i],describe:function(t){var e={name:"SeaMonkey"},r=(0,n.getFirstMatch)(/seamonkey\/(\d+(\.?_?\d+)+)/i,t);return r&&(e.version=r),e}},{test:[/sailfish/i],describe:function(t){var e={name:"Sailfish"},r=(0,n.getFirstMatch)(/sailfish\s?browser\/(\d+(\.\d+)?)/i,t);return r&&(e.version=r),e}},{test:[/silk/i],describe:function(t){var e={name:"Amazon Silk"},r=(0,n.getFirstMatch)(/silk\/(\d+(\.?_?\d+)+)/i,t);return r&&(e.version=r),e}},{test:[/phantom/i],describe:function(t){var e={name:"PhantomJS"},r=(0,n.getFirstMatch)(/phantomjs\/(\d+(\.?_?\d+)+)/i,t);return r&&(e.version=r),e}},{test:[/slimerjs/i],describe:function(t){var e={name:"SlimerJS"},r=(0,n.getFirstMatch)(/slimerjs\/(\d+(\.?_?\d+)+)/i,t);return r&&(e.version=r),e}},{test:[/blackberry|\bbb\d+/i,/rim\stablet/i],describe:function(t){var e={name:"BlackBerry"},r=(0,n.getFirstMatch)(i,t)||(0,n.getFirstMatch)(/blackberry[\d]+\/(\d+(\.?_?\d+)+)/i,t);return r&&(e.version=r),e}},{test:[/(web|hpw)[o0]s/i],describe:function(t){var e={name:"WebOS Browser"},r=(0,n.getFirstMatch)(i,t)||(0,n.getFirstMatch)(/w(?:eb)?[o0]sbrowser\/(\d+(\.?_?\d+)+)/i,t);return r&&(e.version=r),e}},{test:[/bada/i],describe:function(t){var e={name:"Bada"},r=(0,n.getFirstMatch)(/dolfin\/(\d+(\.?_?\d+)+)/i,t);return r&&(e.version=r),e}},{test:[/tizen/i],describe:function(t){var e={name:"Tizen"},r=(0,n.getFirstMatch)(/(?:tizen\s?)?browser\/(\d+(\.?_?\d+)+)/i,t)||(0,n.getFirstMatch)(i,t);return r&&(e.version=r),e}},{test:[/qupzilla/i],describe:function(t){var e={name:"QupZilla"},r=(0,n.getFirstMatch)(/(?:qupzilla)[\s\/](\d+(\.?_?\d+)+)/i,t)||(0,n.getFirstMatch)(i,t);return r&&(e.version=r),e}},{test:[/firefox|iceweasel|fxios/i],describe:function(t){var e={name:"Firefox"},r=(0,n.getFirstMatch)(/(?:firefox|iceweasel|fxios)[\s\/](\d+(\.?_?\d+)+)/i,t);return r&&(e.version=r),e}},{test:[/chromium/i],describe:function(t){var e={name:"Chromium"},r=(0,n.getFirstMatch)(/(?:chromium)[\s\/](\d+(\.?_?\d+)+)/i,t)||(0,n.getFirstMatch)(i,t);return r&&(e.version=r),e}},{test:[/chrome|crios|crmo/i],describe:function(t){var e={name:"Chrome"},r=(0,n.getFirstMatch)(/(?:chrome|crios|crmo)\/(\d+(\.?_?\d+)+)/i,t);return r&&(e.version=r),e}},{test:function(t){var e=!t.test(/like android/i),r=t.test(/android/i);return e&&r},describe:function(t){var e={name:"Android Browser"},r=(0,n.getFirstMatch)(i,t);return r&&(e.version=r),e}},{test:[/safari|applewebkit/i],describe:function(t){var e={name:"Safari"},r=(0,n.getFirstMatch)(i,t);return r&&(e.version=r),e}},{test:[/.*/i],describe:function(t){return{name:(0,n.getFirstMatch)(/^(.*)\/(.*) /,t),version:(0,n.getSecondMatch)(/^(.*)\/(.*) /,t)}}}];r.default=o,t.exports=e.default})?n.apply(e,i):n)||(t.exports=o)},89:function(t,e,r){var n,i,o;i=[e,r(17)],void 0===(o="function"==typeof(n=function(r,n){Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var i=[{test:[/windows phone/i],describe:function(t){return{name:"Windows Phone",version:(0,n.getFirstMatch)(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i,t)}}},{test:[/windows/i],describe:function(t){var e=(0,n.getFirstMatch)(/Windows ((NT|XP)( \d\d?.\d)?)/i,t);return{name:"Windows",version:e,versionName:(0,n.getWindowsVersionName)(e)}}},{test:[/macintosh/i],describe:function(t){return{name:"macOS",version:(0,n.getFirstMatch)(/mac os x (\d+(\.?_?\d+)+)/i,t).replace(/[_\s]/g,".")}}},{test:[/(ipod|iphone|ipad)/i],describe:function(t){return{name:"iOS",version:(0,n.getFirstMatch)(/os (\d+([_\s]\d+)*) like mac os x/i,t).replace(/[_\s]/g,".")}}},{test:function(t){var e=!t.test(/like android/i),r=t.test(/android/i);return e&&r},describe:function(t){var e=(0,n.getFirstMatch)(/android[\s\/-](\d+(\.\d+)*)/i,t),r=(0,n.getAndroidVersionName)(e),i={name:"Android",version:e};return r&&(i.versionName=r),i}},{test:[/(web|hpw)[o0]s/i],describe:function(t){var e=(0,n.getFirstMatch)(/(?:web|hpw)[o0]s\/(\d+(\.\d+)*)/i,t),r={name:"WebOS"};return e&&e.length&&(r.version=e),r}},{test:[/blackberry|\bbb\d+/i,/rim\stablet/i],describe:function(t){return{name:"BlackBerry",version:(0,n.getFirstMatch)(/rim\stablet\sos\s(\d+(\.\d+)*)/i,t)||(0,n.getFirstMatch)(/blackberry\d+\/(\d+([_\s]\d+)*)/i,t)||(0,n.getFirstMatch)(/\bbb(\d+)/i,t)}}},{test:[/bada/i],describe:function(t){return{name:"Bada",version:(0,n.getFirstMatch)(/bada\/(\d+(\.\d+)*)/i,t)}}},{test:[/tizen/i],describe:function(t){return{name:"Tizen",version:(0,n.getFirstMatch)(/tizen[\/\s](\d+(\.\d+)*)/i,t)}}},{test:[/linux/i],describe:function(){return{name:"Linux"}}},{test:[/CrOS/],describe:function(){return{name:"Chrome OS"}}}];r.default=i,t.exports=e.default})?n.apply(e,i):n)||(t.exports=o)},90:function(t,e,r){var n,i,o;i=[e,r(17)],void 0===(o="function"==typeof(n=function(r,n){Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var i="tablet",o="mobile",s="desktop",a=[{test:[/googlebot/i],describe:function(){return{type:"bot",vendor:"Google"}}},{test:[/huawei/i],describe:function(t){var e=(0,n.getFirstMatch)(/(can-l01)/i,t)&&"Nova",r={type:o,vendor:"Huawei"};return e&&(r.model=e),r}},{test:[/nexus\s*(?:7|8|9|10).*/i],describe:function(){return{type:i,vendor:"Nexus"}}},{test:[/ipad/i],describe:function(){return{type:i,vendor:"Apple",model:"iPad"}}},{test:[/kftt build/i],describe:function(){return{type:i,vendor:"Amazon",model:"Kindle Fire HD 7"}}},{test:[/silk/i],describe:function(){return{type:i,vendor:"Amazon"}}},{test:[/tablet/i],describe:function(){return{type:i}}},{test:function(t){var e=t.test(/ipod|iphone/i),r=t.test(/like (ipod|iphone)/i);return e&&!r},describe:function(t){var e=(0,n.getFirstMatch)(/(ipod|iphone)/i,t);return{type:o,vendor:"Apple",model:e}}},{test:[/nexus\s*[0-6].*/i,/galaxy nexus/i],describe:function(){return{type:o,vendor:"Nexus"}}},{test:[/[^-]mobi/i],describe:function(){return{type:o}}},{test:function(t){return"blackberry"===t.getBrowserName(!0)},describe:function(){return{type:o,vendor:"BlackBerry"}}},{test:function(t){return"bada"===t.getBrowserName(!0)},describe:function(){return{type:o}}},{test:function(t){return"windows phone"===t.getBrowserName()},describe:function(){return{type:o,vendor:"Microsoft"}}},{test:function(t){var e=Number(String(t.getOSVersion()).split(".")[0]);return"android"===t.getOSName(!0)&&e>=3},describe:function(){return{type:i}}},{test:function(t){return"android"===t.getOSName(!0)},describe:function(){return{type:o}}},{test:function(t){return"macos"===t.getOSName(!0)},describe:function(){return{type:s,vendor:"Apple"}}},{test:function(t){return"windows"===t.getOSName(!0)},describe:function(){return{type:s}}},{test:function(t){return"linux"===t.getOSName(!0)},describe:function(){return{type:s}}}];r.default=a,t.exports=e.default})?n.apply(e,i):n)||(t.exports=o)},91:function(t,e,r){var n,i,o;i=[e,r(17)],void 0===(o="function"==typeof(n=function(r,n){Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var i=[{test:function(t){return"microsoft edge"===t.getBrowserName(!0)},describe:function(t){return{name:"EdgeHTML",version:(0,n.getFirstMatch)(/edge\/(\d+(\.?_?\d+)+)/i,t)}}},{test:[/trident/i],describe:function(t){var e={name:"Trident"},r=(0,n.getFirstMatch)(/trident\/(\d+(\.?_?\d+)+)/i,t);return r&&(e.version=r),e}},{test:function(t){return t.test(/presto/i)},describe:function(t){var e={name:"Presto"},r=(0,n.getFirstMatch)(/presto\/(\d+(\.?_?\d+)+)/i,t);return r&&(e.version=r),e}},{test:function(t){var e=t.test(/gecko/i),r=t.test(/like gecko/i);return e&&!r},describe:function(t){var e={name:"Gecko"},r=(0,n.getFirstMatch)(/gecko\/(\d+(\.?_?\d+)+)/i,t);return r&&(e.version=r),e}},{test:[/(apple)?webkit\/537\.36/i],describe:function(){return{name:"Blink"}}},{test:[/(apple)?webkit/i],describe:function(t){var e={name:"WebKit"},r=(0,n.getFirstMatch)(/webkit\/(\d+(\.?_?\d+)+)/i,t);return r&&(e.version=r),e}}];r.default=i,t.exports=e.default})?n.apply(e,i):n)||(t.exports=o)}});var n=[{id:"Wireless Controller (STANDARD GAMEPAD Vendor: 054c Product: 05c4)",friendlyName:"PS4",browser:"Chrome",os:"Windows",buttons:{button_1:0,button_2:1,button_3:2,button_4:3,shoulder_top_left:4,shoulder_top_right:5,shoulder_bottom_left:6,shoulder_bottom_right:7,select:8,start:9,stick_button_left:10,stick_button_right:11,d_pad_up:12,d_pad_down:13,d_pad_left:14,d_pad_right:15,vendor:16}},{id:"054c-05c4-Wireless Controller",friendlyName:"PS4",browser:"Firefox",os:"Windows",buttons:{button_1:0,button_2:1,button_3:2,button_4:3,shoulder_top_left:4,shoulder_top_right:5,shoulder_bottom_left:6,shoulder_bottom_right:7,select:8,start:9,stick_button_left:10,stick_button_right:11,d_pad_up:12,d_pad_down:13,d_pad_left:14,d_pad_right:15,vendor:16}},{id:"Wireless Controller (STANDARD GAMEPAD Vendor: 054c Product: 05c4)",friendlyName:"PS4",browser:"Microsoft Edge",os:"Windows",buttons:{button_1:0,button_2:1,button_3:2,button_4:3,shoulder_top_left:4,shoulder_top_right:5,shoulder_bottom_left:6,shoulder_bottom_right:7,select:8,start:9,stick_button_left:10,stick_button_right:11,d_pad_up:12,d_pad_down:13,d_pad_left:14,d_pad_right:15,vendor:16}},{id:"Wireless Controller (STANDARD GAMEPAD Vendor: 054c Product: 05c4)",friendlyName:"PS4",browser:"Opera",os:"macOS",buttons:{button_1:0,button_2:1,button_3:2,button_4:3,shoulder_top_left:4,shoulder_top_right:5,shoulder_bottom_left:6,shoulder_bottom_right:7,select:8,start:9,stick_button_left:10,stick_button_right:11,d_pad_up:12,d_pad_down:13,d_pad_left:14,d_pad_right:15,vendor:16}},{id:"Wireless Controller (STANDARD GAMEPAD Vendor: 054c Product: 05c4)",friendlyName:"PS4",browser:"Opera",os:"Windows",buttons:{button_1:0,button_2:1,button_3:2,button_4:3,shoulder_top_left:4,shoulder_top_right:5,shoulder_bottom_left:6,shoulder_bottom_right:7,select:8,start:9,stick_button_left:10,stick_button_right:11,d_pad_up:12,d_pad_down:13,d_pad_left:14,d_pad_right:15,vendor:16}},{id:"Pro Controller (STANDARD GAMEPAD Vendor: 057e Product: 2009)",friendlyName:"Switch Pro",browser:"Chrome",os:"macOS",buttons:{button_1:0,button_2:1,button_3:2,button_4:3,shoulder_top_left:4,shoulder_top_right:5,shoulder_bottom_left:6,shoulder_bottom_right:7,select:8,start:9,stick_button_left:10,stick_button_right:11,d_pad_up:12,d_pad_down:13,d_pad_left:14,d_pad_right:15,vendor:16}},{id:"Pro Controller (STANDARD GAMEPAD Vendor: 057e Product: 2009)",friendlyName:"Switch Pro",browser:"Chrome",os:"Windows",buttons:{button_1:0,button_2:1,button_3:2,button_4:3,shoulder_top_left:4,shoulder_top_right:5,shoulder_bottom_left:6,shoulder_bottom_right:7,select:8,start:9,stick_button_left:10,stick_button_right:11,d_pad_up:12,d_pad_down:13,d_pad_left:14,d_pad_right:15,vendor:16}},{id:"Pro Controller (STANDARD GAMEPAD Vendor: 057e Product: 2009)",friendlyName:"Switch Pro",browser:"Opera",os:"macOS",buttons:{button_1:0,button_2:1,button_3:2,button_4:3,shoulder_top_left:4,shoulder_top_right:5,shoulder_bottom_left:6,shoulder_bottom_right:7,select:8,start:9,stick_button_left:10,stick_button_right:11,d_pad_up:12,d_pad_down:13,d_pad_left:14,d_pad_right:15,vendor:16}},{id:"Xbox One Wired Controller (STANDARD GAMEPAD Vendor: 045e Product: 02d1)",friendlyName:"Xbox One",browser:"Chrome",os:"macOS",buttons:{button_1:0,button_2:1,button_3:2,button_4:3,shoulder_top_left:4,shoulder_top_right:5,shoulder_bottom_left:6,shoulder_bottom_right:7,select:8,start:9,stick_button_left:10,stick_button_right:11,d_pad_up:12,d_pad_down:13,d_pad_left:14,d_pad_right:15,vendor:16}},{id:"Xbox 360 Controller (XInput STANDARD GAMEPAD)",friendlyName:"Xbox One",browser:"Chrome",os:"Windows",buttons:{button_1:0,button_2:1,button_3:2,button_4:3,shoulder_top_left:4,shoulder_top_right:5,shoulder_bottom_left:6,shoulder_bottom_right:7,select:8,start:9,stick_button_left:10,stick_button_right:11,d_pad_up:12,d_pad_down:13,d_pad_left:14,d_pad_right:15}},{id:"45e-2d1-Xbox One Wired Controller",friendlyName:"Xbox One",browser:"Firefox",os:"macOS",buttons:{button_1:11,button_2:12,button_3:13,button_4:14,shoulder_top_left:8,shoulder_top_right:9,select:5,start:4,stick_button_left:6,stick_button_right:7,d_pad_up:0,d_pad_down:1,d_pad_left:2,d_pad_right:3,vendor:10}},{id:"xinput",friendlyName:"Xbox One",browser:"Firefox",os:"Windows",buttons:{button_1:0,button_2:1,button_3:2,button_4:3,shoulder_top_left:4,shoulder_top_right:5,shoulder_bottom_left:6,shoulder_bottom_right:7,select:8,start:9,stick_button_left:10,stick_button_right:11,d_pad_up:12,d_pad_down:13,d_pad_left:14,d_pad_right:15}},{id:"Xbox 360 Controller (XInput STANDARD GAMEPAD)",friendlyName:"Xbox One",browser:"Microsoft Edge",os:"Windows",buttons:{button_1:0,button_2:1,button_3:2,button_4:3,shoulder_top_left:4,shoulder_top_right:5,shoulder_bottom_left:6,shoulder_bottom_right:7,select:8,start:9,stick_button_left:10,stick_button_right:11,d_pad_up:12,d_pad_down:13,d_pad_left:14,d_pad_right:15}},{id:"Xbox One Wired Controller (STANDARD GAMEPAD Vendor: 045e Product: 02d1)",friendlyName:"Xbox One",browser:"Opera",os:"macOS",buttons:{button_1:0,button_2:1,button_3:2,button_4:3,shoulder_top_left:4,shoulder_top_right:5,shoulder_bottom_left:6,shoulder_bottom_right:7,select:8,start:9,stick_button_left:10,stick_button_right:11,d_pad_up:12,d_pad_down:13,d_pad_left:14,d_pad_right:15,vendor:16}},{id:"Xbox 360 Controller (XInput STANDARD GAMEPAD)",friendlyName:"Xbox One",browser:"Opera",os:"Windows",buttons:{button_1:0,button_2:1,button_3:2,button_4:3,shoulder_top_left:4,shoulder_top_right:5,shoulder_bottom_left:6,shoulder_bottom_right:7,select:8,start:9,stick_button_left:10,stick_button_right:11,d_pad_up:12,d_pad_down:13,d_pad_left:14,d_pad_right:15}},{id:"45e-2d1-Xbox One Wired Controller",friendlyName:"Xbox One",browser:"Safari",os:"macOS",buttons:{button_1:0,button_2:1,button_3:2,button_4:3,shoulder_top_left:4,shoulder_top_right:5,select:9,start:8,stick_button_left:6,stick_button_right:7,d_pad_up:11,d_pad_down:12,d_pad_left:13,d_pad_right:14,vendor:10}}],i=t(r.exports).getParser(window.navigator.userAgent),o=function(){var t=this;this._requestAnimation=0,this._previousGamepadsState=[],this.listeners=[],this.start=function(){t._requestAnimation=window.requestAnimationFrame(t.tick)},this.stop=function(){window.cancelAnimationFrame(t._requestAnimation)},this.on=function(e,r,n){t.listeners[t.listeners.length]={type:e,id:r,callback:n}},this.off=function(e,r){t.listeners[t.listeners.length].splice(t.listeners.findIndex((function(t){return t.type===e&&t.id===r})),1)},this.tick=function(){var r=[].slice.call(window.navigator.getGamepads()).filter((function(t){return t})).map((function(t){var r=t.id,o=t.index,s=t.buttons,a=t.axes,u=n.find((function(t){return t.id===r&&t.browser===i.getBrowserName()&&t.os===i.getOSName()}));if(!u)throw new Error("".concat(r," not supported by gamepad.js"));return{id:r,index:o,buttons:Object.keys(u.buttons).reduce((function(t,r){var n;return e(e({},t),((n={})[r]=s[u.buttons[r]],n))}),{}),axes:a,mapping:u}}));r.map((function(e){var r=t._previousGamepadsState.find((function(t){var r=t.index;return e.index===r}));t.listeners.filter((function(t){var r=t.id;return e.buttons[r]})).filter((function(t){var n=t.type,i=t.id;switch(n){case"pressed":return e.buttons[i].pressed&&(!r||!r.buttons[i].pressed);case"held":return e.buttons[i].pressed;case"released":return!e.buttons[i].pressed&&r&&r.buttons[i].pressed;default:return!1}})).map((function(t){var r=t.callback,n=t.id;return r({id:n,gamepadIndex:e.index,value:e.buttons[n].value})}))})),r.map((function(e){t.listeners.filter((function(t){return"axes"===t.type})).filter((function(t){var r=t.id;return Math.abs(e.axes[r])>.1})).map((function(t){var r=t.callback,n=t.id;return r({id:n,gamepadIndex:e.index,value:e.axes[n]})}))})),t._previousGamepadsState=r,t._requestAnimation=window.requestAnimationFrame(t.tick)}};export{o as Gamepad};
